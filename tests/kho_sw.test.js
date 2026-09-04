// File: tests/kho_sw.test.js
//
// GHIM KHO ĐỆM CỦA SERVICE WORKER.
//
// ══ HAI LỖI THẬT, KHÔNG PHẢI PHÒNG XA ══
//
// 1. `cache.put()` NÉM khi phản hồi mang mã 206 (Partial Content) — đây là quy
//    định của chuẩn Cache API, không phải hành vi riêng của trình duyệt nào.
//    App có 7 thẻ `<audio>`; riêng `DictationPanel` trỏ thẳng vào
//    `/audio/<tệp>.mp3` và bản kê có 239 tệp. Trình duyệt lấy media bằng yêu
//    cầu Range, máy chủ trả 206. Bản cũ viết:
//
//        if (response.ok) caches.open(CACHE_NAME).then((c) => c.put(...));
//
//    `response.ok` ĐÚNG với 206 (200–299), và cả câu KHÔNG có `.catch`. Nên mỗi
//    lượt người học bấm nghe là một lời hứa hỏng không ai bắt.
//
// 2. Kho không có trần và không lọc gì. Bản cũ cất MỌI phản hồi thành công cùng
//    gốc: 13 MB mảnh mã cộng 6,2 MB tệp thu. Kho đầy thì `cache.put` cũng ném,
//    và cũng không ai bắt — lưới đỡ ngoại tuyến ngừng hoạt động mà không kêu.
//
// ══ PHÉP ĐO NÀY CHẠY THẬT MÃ NGUỒN, KHÔNG DÒ CHUỖI ══
// `public/sw.js` là script thường (không phải module), nên nạp nó vào một ngữ
// cảnh `node:vm` với `self`/`caches`/`Response` giả thì `nenCat` và `laDieuHuong`
// trở thành biến toàn cục của ngữ cảnh đó — gọi thẳng được. Dò chuỗi chỉ chứng
// minh có ai đó GÕ một cái chốt; gọi thẳng mới chứng minh cái chốt CHẶN đúng.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NGUON = readFileSync(path.join(ROOT, 'public/sw.js'), 'utf8');

/** Nạp sw.js vào một ngữ cảnh giả và trả về chính ngữ cảnh đó. */
function napSw() {
  const nghe = {};
  const ctx = {
    self: {
      addEventListener: (ten, fn) => { nghe[ten] = fn; },
      location: { origin: 'https://x.test' },
      skipWaiting: () => {},
      clients: { claim: () => {} },
    },
    caches: { open: async () => ({ put: async () => {}, addAll: async () => {} }), keys: async () => [], match: async () => undefined, delete: async () => true },
    console: { warn: () => {}, error: () => {} },
    Response: { error: () => ({ type: 'error' }) },
    URL,
    fetch: async () => ({}),
    Promise,
    setTimeout,
  };
  vm.createContext(ctx);
  vm.runInContext(NGUON, ctx);
  ctx.__nghe = nghe;
  return ctx;
}

/** Yêu cầu giả, đủ dùng cho `nenCat` và `laDieuHuong`. */
const yeuCau = (url, { range = false, mode = 'no-cors', accept = '' } = {}) => ({
  url, method: 'GET', mode,
  headers: { has: (k) => (k.toLowerCase() === 'range' ? range : false), get: (k) => (k.toLowerCase() === 'accept' ? accept : null) },
});
const phanHoi = (status, type = 'basic') => ({ status, type, ok: status >= 200 && status < 300 });

const G = 'https://x.test';

test('sw.js nạp được và gắn đủ ba trình nghe', () => {
  const ctx = napSw();
  assert.deepEqual(Object.keys(ctx.__nghe).sort(), ['activate', 'fetch', 'install']);
});

// ĐÂY LÀ PHÉP ĐO TRUNG TÂM CỦA CẢ FILE.
test('206 (Partial Content) KHÔNG được đưa vào kho — đó là thứ làm cache.put ném', () => {
  const { nenCat } = napSw();
  assert.equal(nenCat(yeuCau(`${G}/audio/tat-1512.mp3`), phanHoi(206)), false);
  assert.equal(nenCat(yeuCau(`${G}/assets/app-abc.js`), phanHoi(206)), false,
    'kể cả một tệp .js trả về 206 cũng phải bị chặn — cache.put ném theo MÃ, không theo đuôi tệp');
  // Và chốt lại chính cái bẫy của bản cũ: `response.ok` là ĐÚNG với 206.
  assert.equal(phanHoi(206).ok, true, 'nếu câu này sai thì cả lời giải thích ở trên sai');
});

test('yêu cầu có tiêu đề Range bị chặn ngay cả khi máy chủ lỡ trả 200', () => {
  const { nenCat } = napSw();
  assert.equal(nenCat(yeuCau(`${G}/audio/tat-1512.mp3`, { range: true }), phanHoi(200)), false);
});

test('tệp media không vào kho vỏ app — kho này sinh ra để MỞ ĐƯỢC APP khi mất mạng', () => {
  const { nenCat } = napSw();
  for (const p of ['/audio/tat-1512.mp3', '/x.m4a', '/x.ogg', '/x.wav', '/clip.mp4', '/a.zip', '/tai-lieu.pdf']) {
    assert.equal(nenCat(yeuCau(G + p), phanHoi(200)), false, `${p} lẽ ra không được cất`);
  }
});

test('thứ ĐÁNG cất thì vẫn phải được cất — chốt không được siết tới mức vô dụng', () => {
  const { nenCat } = napSw();
  for (const p of ['/index.html', '/assets/index-abc.js', '/assets/style-abc.css', '/fonts/a.woff2', '/bunny_logo.png', '/manifest.webmanifest']) {
    assert.equal(nenCat(yeuCau(G + p), phanHoi(200)), true, `${p} lẽ ra phải được cất`);
  }
});

test('phản hồi từ gốc khác (opaque) không vào kho', () => {
  const { nenCat } = napSw();
  assert.equal(nenCat(yeuCau(`${G}/assets/a.js`), phanHoi(200, 'opaque')), false);
  assert.equal(nenCat(yeuCau(`${G}/assets/a.js`), phanHoi(404)), false);
});

test('chỉ ĐIỀU HƯỚNG mới được đỡ bằng index.html', () => {
  const { laDieuHuong } = napSw();
  assert.equal(laDieuHuong(yeuCau(`${G}/`, { mode: 'navigate' })), true);
  assert.equal(laDieuHuong(yeuCau(`${G}/x`, { accept: 'text/html,*/*' })), true);
  assert.equal(laDieuHuong(yeuCau(`${G}/assets/a.js`)), false,
    'trả HTML cho một yêu cầu xin .js là dựng lại đúng lỗi MIME đã vá ở fc1b31b');
});

test('nhánh cất vào kho PHẢI có .catch, và phải KÊU chứ không nuốt im', () => {
  const s = NGUON.split(/\r?\n/).filter((d) => !d.trim().startsWith('//')).join('\n');
  assert.match(s, /\.catch\(/, 'thiếu .catch — kho đầy hoặc 206 lọt lưới sẽ thành lời hứa hỏng không ai bắt');
  assert.match(s, /console\.warn\(/,
    'nhánh hỏng đang nuốt im: một kho ngừng hoạt động phải phân biệt được với một kho đang chạy tốt');
  // Bản cũ dùng `response.ok` (đúng với cả 206). Nếu nó quay lại thì lỗi quay lại.
  assert.doesNotMatch(s, /if \(response\.ok\) caches\.open/,
    'dòng cũ đã quay lại: response.ok ĐÚNG với 206, nên cache.put sẽ ném ở mỗi lượt nghe');
});

test('đổi thứ được cất thì PHẢI đổi tên kho, nếu không bản vá không tới được người đang dùng', () => {
  const m = /CACHE_NAME\s*=\s*'([^']+)'/.exec(NGUON);
  assert.ok(m, 'không đọc được CACHE_NAME');
  const v = Number((/-v(\d+)$/.exec(m[1]) || [])[1]);
  assert.ok(v >= 2,
    `CACHE_NAME đang là "${m[1]}". Nhánh activate chỉ xoá kho KHÁC TÊN, nên giữ nguyên -v1 thì mọi thứ kho cũ đã nuốt (kể cả các tệp thu nhiều MB) vẫn nằm nguyên đó ở máy người học.`);
});
