// File: tests/tai_chunk.test.js
//
// GHIM: MỘT MẢNH MÃ TẢI HỎNG KHÔNG ĐƯỢC GIẾT CẢ APP.
//
// ══ LỖ CÓ THẬT, ĐO TRÊN BẢN LIVE 02/09 ══
//   $ curl -I https://grammar-app-gray.vercel.app/assets/WelcomePage-OLDHASH1.js
//   HTTP/1.1 404 Not Found        X-Vercel-Error: NOT_FOUND
//
// Tên tệp mang băm nội dung, nên MỖI LẦN ĐẨY BẢN MỚI là mọi tên cũ biến mất.
// Người học mở sẵn một tab từ trước lúc đẩy vẫn giữ index.html CŨ; bấm sang một
// trang chưa mở lần nào là đi xin đúng cái tên vừa biến mất. Trước đợt này app
// chỉ có MỘT lưới ErrorBoundary ở main.jsx, nên cả màn hình bị thay bằng "Ối!
// Thỏ vấp phải một lỗi".
//
// Ba thứ được ghim ở đây, và cả ba đều là chỗ dễ làm hỏng lại:
//   1. thử lại nằm TRONG hàm dựng (React.lazy không gọi lại hàm dựng bao giờ);
//   2. lưới đỡ CHỈ nhận lỗi tải mảnh mã, lỗi khác phải ném lại cho lưới gốc;
//   3. lượt tự tải lại chỉ MỘT lần mỗi tab, và không bao giờ khi đang mất mạng.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SO_LAN_THU_LAI, daTuTaiLai, laLoiTaiChunk, nhapLai, soLuotTaiLai, tuTaiLaiMotLan, xoaSoLuot,
} from '../src/utils/taiChunk.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = (p) => readFileSync(path.join(ROOT, p), 'utf8');

/** Kho giả kiểu sessionStorage. */
const khoGia = (batDau = {}) => {
  const m = new Map(Object.entries(batDau));
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) };
};

test('mạng chập chờn: hỏng hai lần đầu thì lần thứ ba vẫn vào được', async () => {
  xoaSoLuot();
  let lan = 0;
  const f = nhapLai(() => {
    lan += 1;
    if (lan < 3) return Promise.reject(new TypeError('Failed to fetch dynamically imported module: /assets/x.js'));
    return Promise.resolve({ default: 'trang' });
  }, { cho: [1, 1] });
  assert.deepEqual(await f(), { default: 'trang' });
  assert.equal(lan, 3);
  assert.deepEqual(soLuotTaiLai(), { thuLai: 2, cuuDuoc: 1, hong: 0 });
});

test('thử hết lượt vẫn hỏng thì NÉM RA, không nuốt im', async () => {
  xoaSoLuot();
  let lan = 0;
  const f = nhapLai(() => { lan += 1; return Promise.reject(new TypeError('Failed to fetch dynamically imported module')); }, { cho: [1, 1] });
  await assert.rejects(f(), /dynamically imported module/);
  assert.equal(lan, SO_LAN_THU_LAI + 1, 'phải thử đúng 1 lần đầu + SO_LAN_THU_LAI lượt nữa');
  assert.equal(soLuotTaiLai().hong, 1, 'lượt hỏng hẳn phải được đếm — lưới nào cũng phải tự đếm được');
});

test('lỗi KHÔNG phải do tải tệp thì ném ngay, không thử lại', async () => {
  xoaSoLuot();
  let lan = 0;
  const f = nhapLai(() => { lan += 1; return Promise.reject(new TypeError('x is not a function')); }, { cho: [1, 1] });
  await assert.rejects(f(), /not a function/);
  assert.equal(lan, 1, 'thử lại một lỗi lúc chạy chỉ làm chậm lời báo, không sửa được gì');
  assert.equal(soLuotTaiLai().thuLai, 0);
});

test('nhận ra câu báo lỗi của CẢ BA trình duyệt, không chỉ Chrome', () => {
  for (const s of [
    'Failed to fetch dynamically imported module: https://x/assets/a.js',   // Chrome
    'error loading dynamically imported module: https://x/assets/a.js',     // Firefox
    'Importing a module script failed.',                                    // Safari
    'Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html".',
    'Load failed',                                                          // Safari, mất mạng
    'NetworkError when attempting to fetch resource.',
  ]) assert.ok(laLoiTaiChunk(new Error(s)), `bỏ sót: ${s}`);
  for (const s of ['Cannot read properties of undefined', 'x is not a function', '']) {
    assert.equal(laLoiTaiChunk(new Error(s)), false, `nhận nhầm: ${s}`);
  }
});

test('tự tải lại ĐÚNG MỘT LẦN cho mỗi tab — không có chốt thì trang nạp lại vô hạn', () => {
  const kho = khoGia();
  let dem = 0;
  const chung = { kho, online: true, taiLai: () => { dem += 1; } };
  assert.equal(tuTaiLaiMotLan(chung), true);
  assert.equal(dem, 1);
  assert.equal(tuTaiLaiMotLan(chung), false, 'lượt thứ hai phải bị chặn');
  assert.equal(dem, 1);
  assert.equal(daTuTaiLai(kho), true);
});

test('mất mạng thì KHÔNG tự tải lại — tải lại không cứu được gì mà còn cướp trang đang mở', () => {
  let dem = 0;
  assert.equal(tuTaiLaiMotLan({ kho: khoGia(), online: false, taiLai: () => { dem += 1; } }), false);
  assert.equal(dem, 0);
});

test('kho ném lỗi (Safari riêng tư) thì trả false để giao diện tự báo, không im lặng', () => {
  const khoNem = { getItem: () => { throw new Error('SecurityError'); }, setItem: () => { throw new Error('SecurityError'); } };
  let dem = 0;
  assert.equal(tuTaiLaiMotLan({ kho: khoNem, online: true, taiLai: () => { dem += 1; } }), false);
  assert.equal(dem, 0, 'không đọc được cờ thì phải coi như ĐÃ dùng lượt, thà báo còn hơn nạp lại vô hạn');
});

// ── GHIM PHẦN NỐI DÂY: bọc rồi mà quên gắn thì cả lớp trên vô dụng ──────────

test('MỌI lazy() trong App.jsx và WelcomePage.jsx đều đi qua nhapLai', () => {
  for (const f of ['src/App.jsx', 'src/pages/WelcomePage.jsx']) {
    const s = doc(f);
    const tong = (s.match(/lazy\(/g) || []).length;
    const boc = (s.match(/lazy\(nhapLai\(/g) || []).length;
    assert.equal(boc, tong, `${f}: ${tong - boc} chỗ lazy() còn trần, mạng chập chờn là chết cả app`);
    assert.ok(tong > 0, `${f}: không tìm thấy lazy() nào — phép đo này đang đo nhầm chỗ`);
  }
});

test('tuyến chính và mọi panel đều nằm dưới một lưới đỡ riêng', () => {
  const app = doc('src/App.jsx');
  assert.match(app, /<ChunkBoundary tuTaiLai>[\s\S]{0,120}<Suspense/, 'Suspense của tuyến chính chưa được bọc lưới');
  const wp = doc('src/pages/WelcomePage.jsx');
  assert.equal((wp.match(/<Suspense/g) || []).length, 0,
    'còn <Suspense> trần trong WelcomePage — panel đó hỏng là giết cả trang chủ');
  assert.ok((wp.match(/<MoPanel>/g) || []).length >= 15, 'thiếu panel được bọc');
});

// ĐẮT NHẤT ĐỂ SAI Ở ĐÂY: tự tải lại trang khi người học đang gõ dở một đoạn văn.
// Panel mở ĐÈ LÊN trang chủ, nên tải lại là xoá công của họ để sửa một lỗi mạng.
// Tuyến chính thì khác — trang cũ dù sao cũng bị gỡ khi chuyển trang.
test('CHỈ tuyến chính được tự tải lại; panel thì KHÔNG BAO GIỜ', () => {
  const s = doc('src/components/common/ChunkBoundary.jsx');
  assert.match(s, /if \(!this\.props\.tuTaiLai\) return;/,
    'thiếu cửa chặn — mọi lưới đỡ sẽ tự tải lại trang, kể cả lúc panel đè lên bài đang làm dở');
  const viTriChan = s.indexOf('this.props.tuTaiLai');
  const viTriGoi = s.indexOf('tuTaiLaiMotLan()');
  assert.ok(viTriChan >= 0 && viTriGoi > viTriChan, 'cửa chặn phải đứng TRƯỚC lệnh tải lại');
  assert.doesNotMatch(doc('src/components/common/ChunkBoundary.jsx').split('export function MoPanel')[1] || '',
    /tuTaiLai(?!\s*chỉ|\s*ở)/, 'MoPanel đang bật tự tải lại');
});

test('lưới đỡ chỉ nhận lỗi tải mảnh mã, lỗi khác phải NÉM LẠI cho lưới gốc', () => {
  const s = doc('src/components/common/ChunkBoundary.jsx');
  assert.match(s, /if \(!laLoiTaiChunk\(error\)\) throw error;/,
    'thiếu dòng ném lại — một lưới bắt tất tay sẽ biến lỗi thật thành câu "chắc do mạng"');
  // Nút phải là TẢI LẠI TRANG. Một nút "Thử lại" chỉ xoá state là nút chết:
  // React.lazy nhớ luôn lời hứa hỏng và không gọi lại hàm dựng bao giờ.
  assert.match(s, /window\.location\.reload\(\)/);
  assert.doesNotMatch(s, /setState\(\{\s*error:\s*null/, 'đang định "thử lại" bằng cách xoá state — cách đó không chạy');
});

test('service worker KHÔNG được trả index.html cho yêu cầu xin tệp .js', () => {
  // ⚠️ PHẢI BÓC CHÚ THÍCH TRƯỚC. Lần đầu viết phép kiểm này nó báo đỏ trên
  // chính bản ĐÃ VÁ, vì đoạn chú thích có TRÍCH NGUYÊN dòng cũ để giải thích.
  // Một phép đo đọc trúng lời kể về cái lỗi thay vì đọc cái lỗi.
  const sw = doc('public/sw.js').split(/\r?\n/).filter((d) => !d.trim().startsWith('//')).join('\n');
  assert.match(sw, /laDieuHuong/, 'thiếu cửa phân biệt điều hướng với các yêu cầu khác');
  assert.match(sw, /request\.mode === 'navigate'/);
  assert.match(sw, /Response\.error\(\)/,
    'mất mạng mà không có gì trong kho thì phải trả LỖI MẠNG THẬT, để lớp thử lại nhận ra');
  // Dòng cũ trả index.html cho mọi thứ — nếu nó quay lại thì lỗi MIME quay lại.
  assert.doesNotMatch(sw, /cached \|\| caches\.match\('\/index\.html'\)/,
    'dòng cũ đã quay lại: yêu cầu .js sẽ nhận HTML và chết bằng lỗi MIME khó hiểu');
});

// Một cái đếm mà KHÔNG AI ĐỌC thì không phải tín hiệu, chỉ là trạng thái chết —
// đúng họ với chốt "MẤT BƯỚC" từng in ra một dòng ❌ rồi tự xoá chính mình.
// Nên ghim luôn chỗ đọc nó: báo cáo lỗi sao chép được của lưới gốc.
test('số lượt tải lại phải ĐI VÀO báo cáo lỗi, không nằm đó cho vui', () => {
  const s = doc('src/components/common/ErrorBoundary.jsx');
  assert.match(s, /soLuotTaiLai/, 'báo cáo lỗi chưa mang theo số lượt tải lại mảnh mã');
  assert.match(s, /Tải lại mảnh mã/, 'thiếu nhãn tiếng Việt cho dòng đó trong báo cáo');
});
