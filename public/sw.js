// File: public/sw.js
//
// MẠNG TRƯỚC, KHO SAU. Luôn đi hỏi máy chủ; kho chỉ là lưới đỡ khi mất mạng.
// Nhờ thế người học không bao giờ bị kẹt ở một bản cũ, và `index.html` (máy chủ
// trả `max-age=0, must-revalidate`) luôn là bản mới nhất ngay lần mở sau.

const CACHE_NAME = 'bunny-english-shell-v1';
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
const laDieuHuong = (request) => request.mode === 'navigate'
  || (request.method === 'GET' && (request.headers.get('accept') || '').includes('text/html'));

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin || new URL(request.url).pathname.startsWith('/api/')) return;
  event.respondWith(fetch(request).then((response) => {
    if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
    return response;
  }).catch(() => caches.match(request).then((cached) => {
    if (cached) return cached;
    if (laDieuHuong(request)) return caches.match('/index.html').then((vo) => vo || Response.error());
    return Response.error();
  })));
});
