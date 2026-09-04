// File: tests/kho_chan.test.js
//
// GHIM: TRÌNH DUYỆT CHẶN LƯU THÌ APP VẪN CHẠY, VÀ PHẢI NÓI RA.
//
// ══ ĐO ĐƯỢC TRƯỚC KHI VÁ: `npm run ra:chankho` 2/8 ══
// Giả lập hai kiểu chặn thật rồi mở app trong Chrome:
//   · chặn lúc ĐỌC  (iOS Safari, "Chặn tất cả cookie") → màn crash gốc, còn 3
//     nút trên cả trang thay vì 363;
//   · chặn lúc GHI  (Safari duyệt web riêng tư)        → y hệt.
// Tức là một người học dùng iPhone ở một trong hai chế độ đó KHÔNG MỞ ĐƯỢC APP
// mà họ vừa trả tiền, và tải lại trang cũng không cứu.
//
// ══ BỐN HỌ LỖI ĐÃ TÌM RA, VÀ CẢ BỐN ĐỀU "TRÔNG NHƯ ĐÃ AN TOÀN" ══
//
// 1. `App.jsx` chạm thẳng `localStorage` 30 lần, nhiều lần trong hàm khởi tạo
//    `useState` — tức chạy trong lượt vẽ đầu tiên của GỐC cây component.
//
// 2. THAM SỐ MẶC ĐỊNH: `function load(storage = localStorage)`. Tham số mặc
//    định được tính TRƯỚC khi vào thân hàm, nên nó nằm NGOÀI try/catch bên
//    trong. Sáu chỗ như vậy — kể cả trong chính `utils/kho.js` bản đầu.
//
// 3. `typeof localStorage !== 'undefined'` — cái chốt được viết ra CHÍNH ĐỂ an
//    toàn, mà không an toàn. `typeof` chỉ tránh ReferenceError cho một tên CHƯA
//    KHAI BÁO; `localStorage` là thuộc tính có khai báo của `window` nên
//    `typeof` vẫn GỌI getter, và getter đó ném. Năm chỗ, trong đó `errorBank.js`
//    đặt nó ở CẤP MODULE nên chỉ nhập file đã hỏng cả mảnh mã.
//
// 4. Truyền thẳng đối tượng kho làm tham số (`goMotLan(localStorage, …)`). Hàm
//    nhận có try/catch bên trong, nhưng viết ra cái tên ở CHỖ GỌI đã ném rồi.
//
// ══ VÀ VẾ THỨ HAI, BẮT BUỘC ══
// Bọc rồi im lặng thì app chạy nhưng không ghi được gì: người học làm một tiếng
// rồi mất sạch. Nên phải CÓ BĂNG BÁO. Xem components/common/KhoBiChanBanner.jsx.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  docJson, docKho, ghiJson, ghiKho, khoAnToan, khoDungDuoc, quenKetQuaThu,
  soLuotKhoHong, xoaKho, xoaSoLuotKhoHong,
} from '../src/utils/kho.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = (p) => readFileSync(path.join(ROOT, p), 'utf8');
// ⚠️ PHẢI BÓC CẢ KHỐI `/* … */`, KHÔNG CHỈ LỌC THEO DÒNG.
// Bản đầu chỉ bỏ những dòng BẮT ĐẦU bằng `//`, `*`, `/*`. Một chú thích JSX mở
// bằng `{/*` nên không khớp, và các dòng giữa khối thì bắt đầu bằng chữ thường.
// Hậu quả: phép đo đọc trúng đoạn chú thích TRÍCH LẠI câu cũ để giải thích, rồi
// báo đỏ trên chính bản đã vá. Đây là lần THỨ HAI dính đúng bẫy đó trong phiên
// này (lần đầu ở phép kiểm sw.js trong tests/tai_chunk.test.js), nên lần này
// sửa ở gốc thay vì vá từng chỗ gọi.
const bocChuThich = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split(/\r?\n/)
  .filter((d) => !d.trim().startsWith('//'))
  .join('\n');

/** Kho ném ở MỌI thao tác — iOS "Chặn tất cả cookie". */
const khoNem = () => ({
  getItem() { throw new Error('SecurityError'); },
  setItem() { throw new Error('SecurityError'); },
  removeItem() { throw new Error('SecurityError'); },
});
/** Kho đọc được nhưng ghi thì ném — Safari duyệt web riêng tư. */
const khoChiDocDuoc = (data = {}) => ({
  getItem: (k) => (k in data ? data[k] : null),
  setItem() { throw new Error('QuotaExceededError'); },
  removeItem() { throw new Error('QuotaExceededError'); },
});

const dat = (kho) => { globalThis.localStorage = kho; quenKetQuaThu(); xoaSoLuotKhoHong(); };

test('kho ném mọi thao tác: không hàm nào được ném ra ngoài', () => {
  dat(khoNem());
  assert.equal(docKho('x', 'MAC'), 'MAC');
  assert.deepEqual(docJson('x', { a: 1 }), { a: 1 });
  assert.equal(ghiKho('x', '1'), false);
  assert.equal(ghiJson('x', { a: 1 }), false);
  assert.equal(xoaKho('x'), false);
  assert.equal(khoDungDuoc(), false);
});

test('kho chỉ đọc được (Safari riêng tư): đọc ra giá trị thật, ghi trả false', () => {
  dat(khoChiDocDuoc({ theme: 'dark' }));
  assert.equal(docKho('theme'), 'dark');
  assert.equal(ghiKho('theme', 'light'), false);
  assert.equal(khoDungDuoc(), false, 'ghi không được thì kho KHÔNG dùng được, dù đọc vẫn chạy');
});

test('mọi lượt hỏng đều được ĐẾM — lưới an toàn phải tự kêu', () => {
  dat(khoNem());
  docKho('a'); ghiKho('b', '1'); xoaKho('c');
  assert.deepEqual(soLuotKhoHong(), { doc: 1, ghi: 1, xoa: 1 });
});

test('JSON hỏng nửa chừng (bị cắt vì hết chỗ) trả mặc định, không ném lúc vẽ', () => {
  dat({ getItem: () => '{"a":1,', setItem() {}, removeItem() {} });
  assert.deepEqual(docJson('x', { mac: true }), { mac: true });
  assert.equal(soLuotKhoHong().doc, 1, 'dữ liệu hỏng cũng phải được đếm như một lượt đọc hỏng');
});

test('vỏ bọc `khoAnToan()` nuốt lỗi thay cho những hàm nhận cả đối tượng kho', () => {
  dat(khoNem());
  const k = khoAnToan();
  assert.equal(k.getItem('x'), null);
  assert.doesNotThrow(() => k.setItem('x', '1'));
  assert.doesNotThrow(() => k.removeItem('x'));
});

test('kho dùng được thì mọi thứ chạy bình thường — chốt không được siết tới mức vô dụng', () => {
  const data = {};
  dat({ getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = String(v); }, removeItem: (k) => { delete data[k]; } });
  assert.equal(khoDungDuoc(), true);
  assert.equal(ghiJson('x', { a: 1 }), true);
  assert.deepEqual(docJson('x'), { a: 1 });
  assert.equal(xoaKho('x'), true);
  assert.deepEqual(soLuotKhoHong(), { doc: 0, ghi: 0, xoa: 0 });
});

// ── GHIM BỐN HỌ LỖI KHÔNG ĐƯỢC QUAY LẠI ────────────────────────────────────

test('App.jsx và WelcomePage.jsx không còn chạm thẳng vào localStorage', () => {
  for (const f of ['src/App.jsx', 'src/pages/WelcomePage.jsx']) {
    const s = bocChuThich(doc(f));
    assert.doesNotMatch(s, /(?<![.\w])localStorage(?![\w])/,
      `${f} còn chạm thẳng localStorage — ở iOS "Chặn tất cả cookie" chỉ riêng việc viết ra cái tên đó đã ném, và đây là gốc cây component nên cả app trắng màn`);
  }
});

// Tham số mặc định được tính TRƯỚC khi vào thân hàm, nên try/catch bên trong
// KHÔNG che nó. Chính utils/kho.js bản đầu đã dính đúng lỗi này.
test('không tệp nào lấy localStorage làm THAM SỐ MẶC ĐỊNH', () => {
  const xau = [];
  for (const f of ['src/utils/kho.js', 'src/utils/streakFreeze.js', 'src/utils/banHang.js',
    'src/utils/bandExam.js', 'src/utils/backup.js', 'src/utils/progressSync.js']) {
    // Chỉ bắt THAM SỐ MẶC ĐỊNH: một tham số mặc định luôn kết thúc bằng `,` hoặc
    // `)`. Bản đầu của phép kiểm này bắt cả `const v = globalThis.localStorage
    // .getItem(...)` nằm GỌN TRONG try ở kho.js — tức nó báo đỏ đúng cái nơi duy
    // nhất được phép chạm kho. Một phép đo bắt nhầm chỗ đúng thì vô dụng.
    if (/[\w$]+\s*=\s*(globalThis\.|window\.)?localStorage\s*[,)]/.test(bocChuThich(doc(f)))) xau.push(f);
  }
  assert.deepEqual(xau, [],
    'tham số mặc định nằm NGOÀI try/catch của chính hàm đó — dùng `khoAnToan()` thay vì `localStorage`');
});

// `typeof` chỉ tránh ReferenceError cho tên CHƯA KHAI BÁO. `localStorage` có
// khai báo trên `window`, nên `typeof` vẫn gọi getter — và getter đó ném.
test('không tệp nào còn dùng `typeof localStorage` làm chốt an toàn', () => {
  const xau = [];
  for (const f of ['src/utils/errorBank.js', 'src/utils/bandExam.js', 'src/utils/mockTest.js',
    'src/utils/selfReportLog.js', 'src/utils/thoiGianHoc.js']) {
    if (/typeof\s+localStorage/.test(bocChuThich(doc(f)))) xau.push(f);
  }
  assert.deepEqual(xau, [], 'cái chốt này KHÔNG chặn được getter ném — dùng utils/kho.js');
});

test('errorBank không được chạm kho ở CẤP MODULE — nhập file là hỏng cả mảnh mã', () => {
  const s = bocChuThich(doc('src/utils/errorBank.js'));
  // Mọi lượt chạm phải nằm trong một hàm; cấp module thì không có thụt lề.
  for (const d of s.split('\n')) {
    if (/(?<![.\w])localStorage(?![\w])/.test(d)) {
      assert.match(d, /^\s+/, `dòng cấp module chạm kho: ${d.trim()}`);
    }
  }
});

test('có BĂNG BÁO khi kho bị chặn — bọc mà im lặng là phản bội trễ', () => {
  const b = doc('src/components/common/KhoBiChanBanner.jsx');
  assert.match(b, /khoHong\(\)/, 'băng báo phải hỏi đúng phép đo, không tự dựng phép đo thứ hai');
  assert.match(b, /KHÔNG được lưu/, 'phải nói thẳng là tiến độ không được lưu');
  assert.match(b, /role="alert"/, 'trình đọc màn hình phải đọc được lời báo này');
  const app = doc('src/App.jsx');
  assert.match(app, /<KhoBiChanBanner \/>/, 'App.jsx chưa gắn băng báo — phép đo trên chỉ đo một tệp không ai dùng');
});

// Chụp được bằng chứng trong `ra:chankho`: màn lỗi gốc hiện câu "Tiến độ đã lưu
// của bạn vẫn được giữ nguyên" trên một trình duyệt đang CHẶN LƯU — tức nơi
// chưa có gì được lưu bao giờ. Nói với người vừa mất trắng rằng họ không mất gì
// là kiểu trấn an mà luật của dự án cấm.
test('màn lỗi gốc không được trấn an một điều nó không biết chắc', () => {
  // ⚠️ PHẢI BÓC CHÚ THÍCH — LẦN THỨ HAI DÍNH ĐÚNG CÁI BẪY NÀY TRONG PHIÊN NÀY.
  // Chú thích cạnh chỗ sửa có TRÍCH NGUYÊN câu cũ để giải thích, nên phép đo
  // đọc trúng lời kể về cái lỗi thay vì đọc cái lỗi. (Lần đầu: phép kiểm sw.js
  // trong tests/tai_chunk.test.js.)
  const s = bocChuThich(doc('src/components/common/ErrorBoundary.jsx'));
  assert.match(s, /khoHong\(\)/,
    'ErrorBoundary đang khẳng định tiến độ còn nguyên mà không hỏi xem kho có ghi được không');
  const i = s.indexOf('khoHong()');
  const j = s.indexOf('Tiến độ đã lưu của bạn vẫn được giữ nguyên');
  assert.ok(i >= 0 && j > i, 'câu trấn an phải nằm ở NHÁNH SAI của phép hỏi, không đứng một mình');
});
