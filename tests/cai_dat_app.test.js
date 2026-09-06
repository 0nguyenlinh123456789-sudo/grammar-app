// File: tests/cai_dat_app.test.js
//
// GHIM ĐIỀU KIỆN ĐỂ APP CÀI ĐƯỢC VÀO ĐIỆN THOẠI / MÁY TÍNH BẢNG.
//
// ══ HAI LỖI THẬT ĐÃ CÓ TRONG MÃ, KHÔNG PHẢI PHÒNG XA ══
//
// 1. `manifest.webmanifest` từng khai `{"src": "/logo.svg", "purpose": "maskable"}`.
//    **Chrome trên Android không dùng SVG cho icon manifest.** Nên trên thực tế
//    app KHÔNG có icon maskable nào: Android lấy tạm icon "any" rồi tự cắt, ra
//    cái icon xén mất viền hoặc lọt thỏm giữa ô trắng. Manifest trông đầy đủ,
//    máy tính bàn không thấy gì — chỉ điện thoại mới lộ.
//
// 2. `index.html` thiếu `viewport-fit=cover`. Thiếu nó thì MỌI
//    `env(safe-area-inset-*)` trả về 0 trên iPhone, nên
//    `pb-[env(safe-area-inset-bottom)]` của BottomTabBar và phần đệm của huy
//    hiệu quyền truy cập đều là mơ — thanh điều hướng nằm dưới vạch Home, bấm
//    không trúng. Cũng im lặng tuyệt đối trên máy tính bàn.
//
// ══ VÌ SAO ĐỌC KÍCH THƯỚC THẬT, KHÔNG TIN `sizes` ══
// `sizes` trong manifest chỉ là một chuỗi người viết gõ vào. Khai "512x512" cho
// một tệp 256px thì trình duyệt lấy về rồi tự thu phóng, và không ai báo gì. Nên
// phép kiểm dưới đọc thẳng IHDR của PNG (byte 16–24) và so với con số đã khai.
//
// ⚠️ KHÔNG ĐO ĐƯỢC Ở ĐÂY, VÀ NÓI THẲNG RA: bản cài THẬT trông thế nào trên máy,
// `beforeinstallprompt` có bắn không, và safe-area có đúng không — cả ba cần một
// bản đẩy và một chiếc điện thoại thật. Ở đây chỉ ghim được các ĐIỀU KIỆN CẦN.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HTML = readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const MANIFEST = JSON.parse(readFileSync(path.join(ROOT, 'public/manifest.webmanifest'), 'utf8'));

/** Kích thước THẬT của một PNG, đọc từ IHDR. */
function coPng(duong) {
  const b = readFileSync(duong);
  assert.equal(b.slice(1, 4).toString(), 'PNG', `${duong} không phải PNG`);
  return { rong: b.readUInt32BE(16), cao: b.readUInt32BE(20) };
}

test('index.html có viewport-fit=cover, nếu không mọi safe-area-inset là số 0', () => {
  const m = /<meta\s+name="viewport"\s+content="([^"]+)"/.exec(HTML);
  assert.ok(m, 'không thấy thẻ viewport');
  assert.match(m[1], /viewport-fit\s*=\s*cover/,
    'thiếu viewport-fit=cover: mọi env(safe-area-inset-*) đã viết trong CSS đều trả về 0 trên iPhone, thanh điều hướng nằm dưới vạch Home');
});

test('phần CSS safe-area vẫn còn ở chỗ nó cần — không thì thẻ viewport là vô nghĩa', () => {
  const tab = readFileSync(path.join(ROOT, 'src/components/common/BottomTabBar.jsx'), 'utf8');
  assert.match(tab, /env\(safe-area-inset-bottom\)/,
    'BottomTabBar mất phần đệm safe-area — trên iPhone nó nằm đè lên vạch Home');
});

test('manifest có đủ id / scope / start_url / display để cài được', () => {
  for (const k of ['id', 'scope', 'start_url', 'display', 'name', 'short_name']) {
    assert.ok(MANIFEST[k], `manifest thiếu "${k}"`);
  }
  assert.equal(MANIFEST.display, 'standalone', 'không standalone thì mở ra vẫn là một tab trình duyệt, không giống app');
  // App KHÔNG có định tuyến theo URL (`appMode` trong App.jsx), nên start_url
  // phải là gốc. Trỏ đi đâu khác là bản cài mở ra một trang trống.
  assert.equal(MANIFEST.start_url, '/', 'app không có định tuyến theo URL, start_url buộc phải là "/"');
});

test('KHÔNG được khai SVG là icon maskable — Chrome Android không dùng', () => {
  for (const ic of MANIFEST.icons) {
    if ((ic.purpose || '').includes('maskable')) {
      assert.doesNotMatch(ic.src, /\.svg$/i,
        `${ic.src} khai maskable nhưng là SVG — Chrome Android bỏ qua, tức app KHÔNG có icon maskable nào và Android sẽ tự cắt icon "any"`);
    }
  }
});

test('có đủ icon 192, 512 và MỘT bản maskable PNG', () => {
  const co = (canh, purpose) => MANIFEST.icons.some((ic) => ic.sizes === `${canh}x${canh}`
    && /\.png$/i.test(ic.src) && (ic.purpose || 'any').includes(purpose));
  assert.ok(co(192, 'any'), 'thiếu icon PNG 192 — Chrome coi là chưa đủ điều kiện cài');
  assert.ok(co(512, 'any'), 'thiếu icon PNG 512');
  assert.ok(MANIFEST.icons.some((ic) => (ic.purpose || '').includes('maskable') && /\.png$/i.test(ic.src)),
    'thiếu icon maskable PNG — Android sẽ tự cắt icon thường, ra viền bị xén hoặc hình lọt thỏm');
});

test('mọi icon CÓ THẬT trên đĩa và đúng kích thước ĐÃ KHAI', () => {
  for (const ic of MANIFEST.icons) {
    const duong = path.join(ROOT, 'public', ic.src.replace(/^\//, ''));
    assert.ok(existsSync(duong), `${ic.src} khai trong manifest nhưng không có tệp — bản cài sẽ không có icon`);
    if (!/\.png$/i.test(ic.src)) continue;
    const { rong, cao } = coPng(duong);
    assert.equal(`${rong}x${cao}`, ic.sizes,
      `${ic.src} thật ra là ${rong}x${cao} nhưng manifest khai ${ic.sizes} — trình duyệt sẽ tự thu phóng và không ai báo gì`);
  }
});

test('bản maskable phải KÍN nền, không trong suốt ở góc', () => {
  const ic = MANIFEST.icons.find((x) => (x.purpose || '').includes('maskable'));
  assert.ok(ic, 'không có icon maskable để kiểm');
  const b = readFileSync(path.join(ROOT, 'public', ic.src.replace(/^\//, '')));
  // Byte thứ 25 của IHDR là colour type: 6 = RGBA, 2 = RGB. Ảnh maskable nên là
  // ảnh đã tô nền; nếu nó còn kênh alpha thì phải chắc nền đã phủ kín — ở đây
  // ghim bằng chính bộ sinh: nó `fillRect` toàn ô trước khi vẽ.
  const nguon = readFileSync(path.join(ROOT, 'scripts/tao_icon_pwa.mjs'), 'utf8');
  assert.match(nguon, /g\.fillRect\(0, 0,/,
    'bộ sinh icon không tô nền trước khi vẽ — cắt tròn một ảnh góc trong suốt sẽ ra bốn khoảng khuyết');
  assert.ok(b.length > 1000, 'tệp maskable quá nhỏ, khả năng sinh hỏng');
});
