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

// ⚠️ PHẢI BÓC CHÚ THÍCH TRƯỚC KHI DÒ CHUỖI. Đợt trước đã dính HAI LẦN: phép kiểm
// khớp trúng đoạn chú thích đang TRÍCH DẪN mã cũ, nên nó báo xanh/đỏ về một dòng
// không hề tồn tại trong mã đang chạy. File này chú thích rất dày nên bẫy đó gần
// như chắc chắn tái diễn nếu dò thẳng vào `NGUON`.
const bocChuThich = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split(/\r?\n/)
  .filter((d) => !d.trim().startsWith('//'))
  .join('\n');

/**
 * Nạp sw.js vào một ngữ cảnh giả và trả về chính ngữ cảnh đó.
 * `khoGia` thay chỗ `caches` để đo được nhánh `activate` và đường tải gói.
 */
function napSw(khoGia = null) {
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
    // ⚠️ Response/Headers THAT cua Node, khong phai ban gia: `traTungPhan`
    // dung `new Response(...)` va `new Headers(...)`, nen ban gia se do mot thu
    // khac han thu trinh duyet se thay. `Response.error()` co san o ban that.
    Response,
    Headers,
    Uint8Array,
    ArrayBuffer,
    URL,
    fetch: async () => ({}),
    Promise,
    setTimeout,
    Array,
    Number,
    Error,
  };
  if (khoGia) ctx.caches = khoGia;
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

// MỐC ĐƯỢC DỊCH 06/09: ba → bốn trình nghe. `message` là đường DUY NHẤT để trang
// bảo service worker tải gói học ngoại tuyến. Thiếu nó thì nút "tải về" là nút giả —
// đúng họ lỗi "nút không làm gì cả" đã vá ở fc1b31b. Đếm chặt như cũ để thêm một
// trình nghe là phải nói ra đang thêm gì.
test('sw.js nạp được và gắn đủ bốn trình nghe', () => {
  const ctx = napSw();
  assert.deepEqual(Object.keys(ctx.__nghe).sort(), ['activate', 'fetch', 'install', 'message']);
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

// ══ MỐC NÀY ĐÃ ĐƯỢC DỊCH 06/09, KHÔNG PHẢI GỠ ══
// Mốc CŨ: "tệp media KHÔNG BAO GIỜ vào kho."
// Mốc MỚI: "nhánh TỰ CẤT (`nenCat`) vẫn từ chối media và 206 — y hệt cũ; riêng
// việc cất TƯỜNG MINH một bản 200 đầy đủ vào `KHO_TAI` do người học BẤM NÚT thì
// được phép." Hai chuyện khác hẳn: cái đầu là app tự nuốt 6 MB sau lưng người
// dùng trên 4G, cái sau là người dùng chủ động xin và biết trước dung lượng.
//
// Nửa dưới của phép kiểm là nửa quan trọng: nó ghim rằng mốc chỉ DỊCH đúng một
// bước, chứ không mở toang.
test('nhánh TỰ CẤT vẫn từ chối media — mốc dịch đúng một bước, không mở toang', () => {
  const { nenCat } = napSw();
  for (const p of ['/audio/tat-1512.mp3', '/x.m4a', '/x.ogg', '/x.wav', '/clip.mp4', '/a.zip', '/tai-lieu.pdf']) {
    assert.equal(nenCat(yeuCau(G + p), phanHoi(200)), false,
      `${p} lẽ ra không được nhánh tự cất nuốt — đó vẫn là 6 MB tải sau lưng người dùng`);
  }
});

test('đường TẢI GÓI cất được media, và KHÔNG đi qua chốt của nhánh tự cất', () => {
  const s = bocChuThich(NGUON);
  assert.match(s, /function taiMotTep/, 'không có đường cất tường minh thì nút "tải về" là nút giả');
  const i = s.indexOf('function taiMotTep');
  const than = s.slice(i, i + 400);
  assert.doesNotMatch(than, /nenCat|KIEU_KHONG_CAT/,
    'đường tải gói đang hỏi lại chốt của nhánh tự cất — hỏi thế thì mp3 không bao giờ tải được, và nút tải là nút giả');
  assert.match(than, /r\.status !== 200/,
    'đường tải gói phải CHỈ nhận 200 đầy đủ: cất một 206 vào kho là đúng lỗi cache.put ném đã vá ở a0960ad');
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

// ══ PHÉP GHIM ĐẮT NHẤT ĐỢT NÀY ══
// Bản trước của `activate` là `keys.filter((key) => key !== CACHE_NAME)` — xoá
// MỌI kho khác tên. Cộng `skipWaiting` + `clients.claim`, nhánh đó chạy ở MỌI
// lần cập nhật service worker. Nghĩa là lần đầu ai đó bump tên kho vỏ là 17,5 MB
// người học vừa tải bằng 4G biến mất không một lời báo, rồi app lặng lẽ tải lại
// từ mạng — đúng những người mà tính năng này sinh ra để phục vụ.
//
// Không phép kiểm nào cũ bắt được: chúng dò chuỗi và gọi hàm chốt, không mô
// phỏng vòng đời của kho. Nên phép kiểm này CHẠY THẬT nhánh activate.
test('activate KHÔNG được xoá gói tải ngoại tuyến của người học', async () => {
  const daXoa = [];
  const khoGia = {
    open: async () => ({ put: async () => {}, addAll: async () => {}, keys: async () => [] }),
    keys: async () => ['bunny-english-shell-v1', 'bunny-english-shell-v2', 'bunny-english-offline-v1', 'kho-cua-ai-do'],
    match: async () => undefined,
    delete: async (k) => { daXoa.push(k); return true; },
  };
  const ctx = napSw(khoGia);
  let choXong;
  ctx.__nghe.activate({ waitUntil: (p) => { choXong = p; } });
  await choXong;

  assert.ok(!daXoa.includes('bunny-english-offline-v1'),
    'activate vừa xoá kho tải — mỗi lần đẩy bản mới là người học mất 17,5 MB đã tải, im lặng');
  assert.ok(daXoa.includes('bunny-english-shell-v1'),
    'kho vỏ đời cũ vẫn phải bị dọn, nếu không bản vá không tới được người đang dùng');
  assert.ok(!daXoa.includes('bunny-english-shell-v2'), 'không được xoá chính kho vỏ đang dùng');
  assert.ok(!daXoa.includes('kho-cua-ai-do'), 'chỉ dọn kho VỎ của app, không quét sạch mọi kho của gốc này');
});

test('kho tải và kho vỏ phải là HAI kho khác tên', () => {
  const vo = /CACHE_NAME\s*=\s*'([^']+)'/.exec(NGUON);
  const tai = /KHO_TAI\s*=\s*'([^']+)'/.exec(NGUON);
  assert.ok(vo && tai, 'không đọc được tên hai kho');
  assert.notEqual(vo[1], tai[1],
    'chung một kho thì luật dọn của kho vỏ sẽ cuốn theo gói tải của người học');
});

// ══ 206 TỔNG HỢP ══
// ĐÃ ĐO: trên Chromium, một mp3 cất dạng 200 đầy đủ phát TRỌN VẸN khi mất mạng
// (thí nghiệm 06/09: máy chủ đã tắt, kho HTTP đã dọn, currentTime chạy tới đúng
// duration). Nên hàm này KHÔNG cần cho Chromium.
//
// Nó tồn tại vì một giới hạn nói thẳng: **iOS Safari không đo được ở đây**, mà
// người học của app này dùng điện thoại, và Safari là bản nghiêm khắc nhất với
// việc trả 200 cho một yêu cầu Range.
test('206 tổng hợp cắt đúng khúc, kể cả khúc CUỐI và khúc tràn', async () => {
  const ctx = napSw();
  const { traTungPhan } = ctx;
  const than = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).buffer;
  const phanHoiGoc = () => ({ headers: new Headers(), arrayBuffer: async () => than });
  const xin = (range) => ({ headers: { get: (k) => (k.toLowerCase() === 'range' ? range : null) } });

  const r1 = await traTungPhan(xin('bytes=2-5'), phanHoiGoc());
  assert.equal(r1.status, 206);
  assert.equal(r1.headers.get('content-range'), 'bytes 2-5/10');
  assert.deepEqual([...new Uint8Array(await r1.arrayBuffer())], [2, 3, 4, 5]);

  const r2 = await traTungPhan(xin('bytes=7-'), phanHoiGoc());
  assert.equal(r2.headers.get('content-range'), 'bytes 7-9/10', 'thiếu vế sau nghĩa là "tới hết tệp"');

  // `bytes=-3` nghĩa là BA BYTE CUỐI, không phải "từ 0 tới 3". Đây là chỗ dễ
  // viết sai nhất của cả hàm, và viết sai thì tiếng phát ra sai đoạn.
  const r3 = await traTungPhan(xin('bytes=-3'), phanHoiGoc());
  assert.equal(r3.headers.get('content-range'), 'bytes 7-9/10');
  assert.deepEqual([...new Uint8Array(await r3.arrayBuffer())], [7, 8, 9]);

  const r4 = await traTungPhan(xin('bytes=99-200'), phanHoiGoc());
  assert.equal(r4.status, 416, 'xin quá cỡ tệp phải trả 416, không trả bừa một khúc rỗng');
});

test('không có Range thì trả nguyên bản 200, không tự biến thành 206', async () => {
  const { traTungPhan } = napSw();
  const goc = { status: 200, headers: new Headers(), arrayBuffer: async () => new ArrayBuffer(4) };
  const r = await traTungPhan({ headers: { get: () => null } }, goc);
  assert.equal(r, goc, 'trả về một đối tượng khác nghĩa là thân đã bị đọc mất một lần');
});

test('đường tải gói LOẠI mọi mục IELTS, kể cả khi trang gửi nhầm', () => {
  const s = bocChuThich(NGUON);
  const i = s.indexOf('function taiGoi');
  assert.ok(i > 0, 'không thấy hàm tải gói');
  assert.match(s.slice(i, i + 300), /ielts/i,
    'cụm IELTS Nền Tảng nằm trong luật KHÔNG ĐỘNG TỚI và dist/ielts-foundation nặng 30 GB — đường tải phải tự loại, không tin danh sách trang gửi xuống');
});
