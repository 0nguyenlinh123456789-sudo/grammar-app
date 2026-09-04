// File: public/sw.js
//
// MẠNG TRƯỚC, KHO SAU. Luôn đi hỏi máy chủ; kho chỉ là lưới đỡ khi mất mạng.
// Nhờ thế người học không bao giờ bị kẹt ở một bản cũ, và `index.html` (máy chủ
// trả `max-age=0, must-revalidate`) luôn là bản mới nhất ngay lần mở sau.

// ⚠️ ĐỔI TÊN KHO LÀ MỘT PHẦN CỦA BẢN VÁ, KHÔNG PHẢI THỦ TỤC.
// Đợt này đổi CÁI GÌ ĐƯỢC CẤT, chứ không chỉ đổi cách cất. Giữ nguyên tên `-v1`
// thì những gì kho cũ đã nuốt — kể cả các tệp thu nhiều MB mà bản cũ cất vào —
// vẫn nằm nguyên đó. Nhánh `activate` bên dưới xoá mọi kho khác tên, nên đổi
// sang `-v2` là cách DUY NHẤT để bản vá này tới được người đã dùng app.
const CACHE_NAME = 'bunny-english-shell-v2';
const SHELL = ['/', '/index.html', '/bunny_logo.png', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

// ⚠️ BẢN CŨ TRẢ `/index.html` CHO MỌI YÊU CẦU HỎNG — KỂ CẢ YÊU CẦU XIN MỘT TỆP .js
//
// Dòng cũ là `cached || caches.match('/index.html')`, không phân biệt loại yêu
// cầu. Mất mạng lúc app đang đi lấy một mảnh mã (17 chỗ `lazy(() => import())`
// trong src) thì trình duyệt nhận về HTML ở chỗ nó đang chờ một module
// JavaScript, và ném:
//
//     Failed to load module script: Expected a JavaScript module script but the
//     server responded with a MIME type of "text/html".
//
// Lỗi đó vô nghĩa với người đọc, và tệ hơn: nó KHÔNG trông giống lỗi mạng, nên
// lớp thử-lại ở `src/utils/taiChunk.js` không nhận ra để thử lại. Một tấm lưới
// đỡ tự biến lỗi mạng tạm thời thành lỗi lạ vĩnh viễn.
//
// Nay chỉ ĐIỀU HƯỚNG (mở trang) mới được đỡ bằng index.html — đó đúng là việc
// của vỏ app ngoại tuyến. Mọi thứ khác mất mạng thì trả về LỖI MẠNG THẬT
// (`Response.error()`), để bên gọi nhìn thấy đúng thứ đã xảy ra.
// Khai bằng `function` chứ không phải `const` là CÓ CHỦ Ý: phép kiểm nạp file
// này vào một ngữ cảnh `node:vm` rồi gọi thẳng hai chốt. Khai báo `function`
// trở thành biến toàn cục của ngữ cảnh đó và gọi được; `const` thì không.
// Nói cách khác, dòng này là thứ cho phép đo được cái chốt CHẶN đúng hay không,
// thay vì chỉ dò chuỗi xem có ai đã GÕ một cái chốt. Xem tests/kho_sw.test.js.
function laDieuHuong(request) {
  return request.mode === 'navigate'
    || (request.method === 'GET' && (request.headers.get('accept') || '').includes('text/html'));
}

// ══ VÌ SAO PHẢI LỌC TRƯỚC KHI CẤT — HAI LỖI THẬT, KHÔNG PHẢI PHÒNG XA ══
//
// 1. `cache.put()` NÉM khi phản hồi mang mã 206 (Partial Content). Đây không
//    phải trường hợp hiếm: app có 7 thẻ `<audio>`, trong đó DictationPanel trỏ
//    thẳng vào `/audio/<tệp>.mp3` (239 tệp). Trình duyệt lấy media bằng yêu cầu
//    Range, và máy chủ trả 206. Bản cũ gọi `caches.open(...).then(...)` KHÔNG
//    kèm `.catch`, nên mỗi lượt nghe là một lời hứa hỏng không ai bắt.
//
// 2. Kho không có trần. Bản cũ cất MỌI phản hồi thành công cùng gốc: 13 MB mảnh
//    mã cộng 6,2 MB tệp thu. Kho đầy thì `cache.put` cũng ném — và cũng không
//    ai bắt. Một tấm lưới đỡ ngừng hoạt động mà không kêu một tiếng.
//
// Sửa theo đúng việc kho này sinh ra để làm: cho phép MỞ ĐƯỢC APP khi mất mạng.
// Một tệp mp3 6 MB chưa bao giờ phục vụ việc đó, nên nó không được vào kho.
const KIEU_KHONG_CAT = /\.(mp3|m4a|ogg|wav|mp4|webm|zip|pdf)$/i;

function nenCat(request, response) {
  // 200 và CHỈ 200. Chặn luôn 206 (Range) — thứ khiến `cache.put` ném.
  if (response.status !== 200 || response.type !== 'basic') return false;
  if (request.headers.has('range')) return false;
  return !KIEU_KHONG_CAT.test(new URL(request.url).pathname);
}

// ══ LƯỚI AN TOÀN NÀO CŨNG PHẢI TỰ KÊU KHI NÓ HỎNG ══
// Một `.catch` nuốt im là đúng họ với cái `?.` từng nuốt lệnh dọn dẹp của bộ rà
// (xem src/utils/taiChunk.js). Nên nhánh hỏng kêu MỘT lần, kèm lý do — kho
// ngừng hoạt động không được phép trông giống hệt kho đang chạy tốt.
let daKeu = false;
function catVaoKho(request, response) {
  caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, response))
    .catch((e) => {
      if (daKeu) return;
      daKeu = true;
      console.warn('[sw] không cất được vào kho, từ đây app chạy không có lưới đỡ ngoại tuyến:', e && e.message);
    });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin || new URL(request.url).pathname.startsWith('/api/')) return;
  event.respondWith(fetch(request).then((response) => {
    // `clone()` phải gọi TRƯỚC khi trả response đi, và chỉ khi thật sự cất —
    // nhân đôi thân của một tệp mp3 6 MB rồi vứt đi là phí bộ nhớ thuần tuý.
    if (nenCat(request, response)) catVaoKho(request, response.clone());
    return response;
  }).catch(() => caches.match(request).then((cached) => {
    if (cached) return cached;
    if (laDieuHuong(request)) return caches.match('/index.html').then((vo) => vo || Response.error());
    return Response.error();
  })));
});
