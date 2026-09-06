// File: public/sw.js
//
// HAI KHO, HAI LUẬT KHÁC HẲN NHAU — ĐỌC ĐOẠN NÀY TRƯỚC KHI SỬA BẤT CỨ GÌ.
//
//   · KHO VỎ (`CACHE_NAME`) — MẠNG TRƯỚC, KHO SAU. Tự cất lấy, cơ hội chủ nghĩa,
//     chỉ để MỞ ĐƯỢC APP khi mất mạng. Người học không bao giờ bị kẹt ở bản cũ.
//   · KHO TẢI (`KHO_TAI`) — do người học BẤM NÚT mới có, và đọc KHO TRƯỚC.
//     Đây là gói học ngoại tuyến: tải một lần, dùng mãi, không tốn thêm 4G.
//
// Đọc kho trước ở kho tải là AN TOÀN vì tên mảnh mã mang băm nội dung: đẩy bản
// mới là tên đổi, nên một tên cũ không bao giờ che mất nội dung mới. `index.html`
// KHÔNG theo luật đó (tên cố định) nên ĐIỀU HƯỚNG luôn đi mạng trước — xem
// `traLoi()`.

const CACHE_NAME = 'bunny-english-shell-v2';
const TIEN_TO_VO = 'bunny-english-shell-';

// ⚠️ ĐỔI TÊN KHO VỎ LÀ MỘT PHẦN CỦA BẢN VÁ, KHÔNG PHẢI THỦ TỤC.
// Đợt trước đổi CÁI GÌ ĐƯỢC CẤT, nên phải đổi tên để bản vá tới được người đã
// dùng app. Đợt này vỏ app KHÔNG đổi nội dung — chỉ thêm một kho THỨ HAI bên
// cạnh — nên tên vỏ giữ nguyên `-v2` một cách có chủ ý.
const KHO_TAI = 'bunny-english-offline-v1';

const SHELL = ['/', '/index.html', '/bunny_logo.png', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

// ══ NHÁNH NÀY TỪNG SẼ XOÁ SẠCH GÓI TẢI CỦA NGƯỜI HỌC Ở LẦN ĐẨY KẾ TIẾP ══
// Bản cũ: `keys.filter((key) => key !== CACHE_NAME).map(caches.delete)` — xoá
// MỌI kho khác tên. Cộng với `skipWaiting` + `clients.claim`, nhánh này chạy ở
// MỌI lần cập nhật service worker. Nghĩa là lần đầu đổi tên kho vỏ là 17,5 MB
// người học vừa tải bằng 4G biến mất không một lời báo, và app lặng lẽ tải lại
// từ mạng — đúng những người mà tính năng này sinh ra để phục vụ.
//
// Nay chỉ dọn các kho VỎ đời cũ (khớp tiền tố), và KHÔNG bao giờ đụng `KHO_TAI`.
// Phép kiểm "activate không được xoá kho tải" ghim đúng dòng này.
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys
      .filter((key) => key.startsWith(TIEN_TO_VO) && key !== CACHE_NAME)
      .map((key) => caches.delete(key))))
    .then(() => self.clients.claim()));
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
// này vào một ngữ cảnh `node:vm` rồi gọi thẳng các chốt. Khai báo `function`
// trở thành biến toàn cục của ngữ cảnh đó và gọi được; `const` thì không.
// Nói cách khác, dòng này là thứ cho phép đo được cái chốt CHẶN đúng hay không,
// thay vì chỉ dò chuỗi xem có ai đã GÕ một cái chốt. Xem tests/kho_sw.test.js.
function laDieuHuong(request) {
  return request.mode === 'navigate'
    || (request.method === 'GET' && (request.headers.get('accept') || '').includes('text/html'));
}

// ══ VÌ SAO KHO VỎ PHẢI LỌC TRƯỚC KHI CẤT — HAI LỖI THẬT, KHÔNG PHẢI PHÒNG XA ══
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
// ══ MỐC NÀY ĐÃ ĐƯỢC DỊCH, KHÔNG PHẢI GỠ ══
// Mốc CŨ: "tệp media KHÔNG BAO GIỜ vào kho."
// Mốc MỚI: "nhánh tự cất (`nenCat`) VẪN từ chối media và 206 — y như cũ; riêng
// việc cất TƯỜNG MINH một phản hồi 200 đầy đủ vào `KHO_TAI` do người học bấm
// nút thì được phép." Hai chuyện khác hẳn nhau: cái đầu là app tự nuốt 6 MB sau
// lưng người dùng, cái sau là người dùng chủ động xin và biết trước dung lượng.
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

// ══ TỰ DỰNG PHẢN HỒI 206 TỪ MỘT BẢN 200 ĐÃ CẤT ══
// ĐÃ ĐO ĐƯỢC (thí nghiệm 06/09, Chrome headless, máy chủ đã TẮT và kho HTTP đã
// dọn): một mp3 cất dạng 200 đầy đủ PHÁT TRỌN VẸN khi mất mạng —
// `currentTime` chạy tới đúng `duration`. Nên trên Chromium, hàm này KHÔNG cần
// thiết.
//
// Nó vẫn ở đây vì một lý do nói thẳng ra: **tôi không đo được iOS Safari.**
// Người học của app này dùng điện thoại, và Safari là bản nghiêm khắc nhất với
// việc trả 200 cho một yêu cầu Range. 20 dòng ở đây đổi lấy việc bỏ hẳn một
// lớp rủi ro mà tôi không có cách nào kiểm chứng. Nếu sau này có máy iPhone
// thật để đo, hãy đo rồi ghi kết quả vào đây thay vì đoán tiếp.
function traTungPhan(request, response) {
  const range = (request.headers.get('range') || '').trim();
  if (!range) return Promise.resolve(response);
  const khop = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!khop) return Promise.resolve(response);

  return response.arrayBuffer().then((buf) => {
    const tong = buf.byteLength;
    let dau = khop[1] === '' ? NaN : Number(khop[1]);
    let cuoi = khop[2] === '' ? NaN : Number(khop[2]);

    if (Number.isNaN(dau)) {
      // `bytes=-500` nghĩa là 500 byte CUỐI, không phải "từ 0 đến 500".
      if (Number.isNaN(cuoi)) return new Response(buf, response);
      dau = Math.max(0, tong - cuoi);
      cuoi = tong - 1;
    } else if (Number.isNaN(cuoi)) {
      cuoi = tong - 1;
    }
    cuoi = Math.min(cuoi, tong - 1);

    if (dau > cuoi || dau >= tong) {
      return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${tong}` } });
    }

    const phan = buf.slice(dau, cuoi + 1);
    const dau_de = new Headers(response.headers);
    dau_de.set('Content-Range', `bytes ${dau}-${cuoi}/${tong}`);
    dau_de.set('Content-Length', String(phan.byteLength));
    dau_de.set('Accept-Ranges', 'bytes');
    return new Response(phan, { status: 206, statusText: 'Partial Content', headers: dau_de });
  });
}

function traLoi(request) {
  // ĐIỀU HƯỚNG luôn đi mạng trước: `index.html` mang tên cố định nên đọc kho
  // trước sẽ ghim người học vào bản cũ vĩnh viễn.
  const uuTienKho = !laDieuHuong(request);

  const buocKhoTai = uuTienKho
    ? caches.open(KHO_TAI).then((kho) => kho.match(request, { ignoreVary: true }))
    : Promise.resolve(null);

  return buocKhoTai.catch(() => null).then((daTai) => {
    if (daTai) return traTungPhan(request, daTai);
    return fetch(request).then((response) => {
      // `clone()` phải gọi TRƯỚC khi trả response đi, và chỉ khi thật sự cất —
      // nhân đôi thân của một tệp mp3 6 MB rồi vứt đi là phí bộ nhớ thuần tuý.
      if (nenCat(request, response)) catVaoKho(request, response.clone());
      return response;
    }).catch(() => caches.match(request).then((cached) => {
      if (cached) return cached;
      if (laDieuHuong(request)) return caches.match('/index.html').then((vo) => vo || Response.error());
      return Response.error();
    }));
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin || new URL(request.url).pathname.startsWith('/api/')) return;
  event.respondWith(traLoi(request));
});

// ══ TẢI GÓI HỌC NGOẠI TUYẾN — DO NGƯỜI HỌC BẤM, KHÔNG BAO GIỜ TỰ ĐỘNG ══
// 17,5 MB tự tải sau lưng người dùng trên mạng 4G Việt Nam là hành vi thù địch.
// Nên đường này chỉ chạy khi trang gửi tin, và nó BÁO TIẾN ĐỘ liên tục để người
// học biết còn bao lâu thay vì nhìn một vòng xoay câm.
//
// Không dùng `cache.addAll`: nó được ăn cả ngã về không (một tệp 404 là hỏng
// toàn bộ) và không báo được tiến độ. Ở đây tải từng tệp, đếm riêng số HỎNG, và
// NÓI RA số đó — tải thiếu mà báo "xong" là đúng kiểu im lặng dự án này cấm.
const SONG_SONG = 4;

function baoTien(client, tin) {
  if (client && client.postMessage) client.postMessage(tin);
}

function taiMotTep(kho, duong) {
  return fetch(duong, { cache: 'no-store' }).then((r) => {
    if (!r.ok || r.status !== 200) throw new Error(`${duong} → ${r.status}`);
    return kho.put(duong, r);
  });
}

// ══ NHỚ GÓI ĐÃ TẢI LÀ BẢN NÀO — KHÔNG CÓ CÁI NÀY THÌ BẢN VÁ TRÊN LÀ IM LẶNG ══
// Tên mảnh mã mang băm nội dung, nên MỖI lần đẩy bản mới là mọi tên đổi và gói
// người học đã tải thành vô dụng: không đường dẫn nào còn khớp. Họ vẫn học
// ngoại tuyến được bằng vỏ app cũ đã cache, nhưng gói 17,5 MB tải bằng 4G thì
// chết lặng, và KHÔNG CÓ GÌ BÁO. Nên kho tải giữ thêm một mẩu ghi chú về chính
// nó, và trang đọc mẩu đó để so với bản đang chạy.
//
// Khoá bắt đầu bằng `__` nên không đụng đường dẫn thật nào của app.
const KHOA_GHI_CHU = '/__goi-offline';

function ghiChuGoi(kho, banDung, nhom) {
  return kho.put(KHOA_GHI_CHU, new Response(
    JSON.stringify({ banDung: banDung || null, nhom: nhom || [], luc: Date.now() }),
    { headers: { 'Content-Type': 'application/json' } },
  ));
}

function docGhiChu(kho) {
  return kho.match(KHOA_GHI_CHU)
    .then((r) => (r ? r.json() : null))
    .catch(() => null);
}

function taiGoi(danhSach, client, banDung, nhom) {
  const ds = (danhSach || []).filter((d) => typeof d === 'string' && !/ielts/i.test(d));
  let xong = 0;
  let hong = 0;
  const hongDau = [];

  return caches.open(KHO_TAI).then((kho) => {
    let i = 0;
    const chay = () => {
      if (i >= ds.length) return Promise.resolve();
      const duong = ds[i++];
      return taiMotTep(kho, duong)
        .catch((e) => { hong += 1; if (hongDau.length < 5) hongDau.push(String(e && e.message)); })
        .then(() => {
          xong += 1;
          baoTien(client, { loai: 'TIEN_DO_OFFLINE', xong, tong: ds.length, hong });
          return chay();
        });
    };
    return Promise.all(Array.from({ length: Math.min(SONG_SONG, ds.length) }, chay))
      // Chỉ ghi chú khi tải KHÔNG hỏng tệp nào. Ghi một mã bản dựng lên một gói
      // tải thiếu là nói dối chính mình ở lần so sau: người học sẽ được bảo
      // "đang dùng bản mới nhất" trong khi gói của họ khuyết.
      .then(() => (hong === 0 ? ghiChuGoi(kho, banDung, nhom) : null));
  }).then(() => {
    baoTien(client, { loai: 'XONG_OFFLINE', xong, tong: ds.length, hong, hongDau });
  }).catch((e) => {
    baoTien(client, { loai: 'LOI_OFFLINE', loi: String(e && e.message) });
  });
}

function demDaTai(client) {
  return caches.open(KHO_TAI)
    .then((kho) => Promise.all([kho.keys(), docGhiChu(kho)]))
    .then(([ds, ghiChu]) => baoTien(client, {
      loai: 'TINH_TRANG_OFFLINE',
      // Mẩu ghi chú KHÔNG phải một tệp bài học, nên không được đếm vào số tệp
      // khoe với người học.
      soTep: ds.filter((r) => !r.url.endsWith(KHOA_GHI_CHU)).length,
      banDung: ghiChu ? ghiChu.banDung : null,
      nhom: ghiChu ? ghiChu.nhom : [],
    }))
    .catch(() => baoTien(client, { loai: 'TINH_TRANG_OFFLINE', soTep: 0, banDung: null, nhom: [] }));
}

self.addEventListener('message', (event) => {
  const tin = event.data || {};
  const client = event.source;
  if (tin.loai === 'TAI_OFFLINE') {
    // `xoaCu` khi bản dựng đã đổi: giữ lại gói cũ là giữ 17,5 MB không đường dẫn
    // nào còn khớp — chiếm chỗ trên máy người học mà không phục vụ gì.
    const batDau = tin.xoaCu ? caches.delete(KHO_TAI) : Promise.resolve();
    event.waitUntil(batDau.then(() => taiGoi(tin.danhSach, client, tin.banDung, tin.nhom)));
  } else if (tin.loai === 'XOA_OFFLINE') {
    event.waitUntil(caches.delete(KHO_TAI)
      .then(() => baoTien(client, { loai: 'DA_XOA_OFFLINE' })));
  } else if (tin.loai === 'HOI_OFFLINE') {
    event.waitUntil(demDaTai(client));
  }
});
