// File: tests/ve_offline.test.js
//
// GHIM: MẤT MẠNG KHÔNG ĐƯỢC ĐUỔI NGƯỜI ĐANG HỌC RA KHỎI APP —
//       VÀ CŨNG KHÔNG ĐƯỢC MỞ CỬA CHO NGƯỜI CHƯA MUA.
//
// ══ LỖ ĐỌC RA TỪ MÃ NGUỒN 06/09 ══
// `AccessGate.jsx` soát vé bằng `/api/access`. Nhánh hỏng của nó là:
//
//     if (silent && error.status >= 500) return;
//     setState({ status: 'locked', ... });
//
// Mất mạng thì `fetch` NÉM và `requestAccess` gán `error.status = 0`. `0 >= 500`
// là SAI, nên cái chốt "im lặng bỏ qua" KHÔNG che đúng trường hợp thường gặp
// nhất. Vòng tự kiểm 15 phút chạy đúng lúc xe chui vào hầm ⇒ người học bị ném
// về màn NHẬP MÃ TRUY CẬP, giữa bài đang làm dở, sau khi đã trả 99k–599k.
//
// ══ VÌ SAO FILE NÀY CÂN BẰNG HAI PHÍA, KHÔNG CHỈ MỘT ══
// Nới cổng cho dễ dùng là cách hỏng dễ nhất ở đây. Nên mỗi phép kiểm "vẫn học
// được" đều có một phép kiểm đối xứng "vẫn khoá được":
//   · mất mạng + ĐÃ từng soát thành công  → vào được (tiện nghi)
//   · mất mạng + CHƯA từng soát            → vẫn khoá (paywall còn nguyên)
//   · máy chủ TỪ CHỐI (401/403)            → khoá NGAY và XOÁ vé
//   · quá ân hạn, hoặc gói hết hạn thật    → vé chết
//
// Vé này KHÔNG phải chốt bảo mật — ai cũng sửa được localStorage. Chốt thật nằm
// ở máy chủ lúc kích hoạt mã. Điều nó thật sự nới: vòng 15 phút vốn để đếm SỐ
// THIẾT BỊ dùng chung một mã; trong ân hạn, một máy mất mạng không bị đếm lại.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AN_HAN_MS, boVe, catVe, docVe, laLoiMang, ngayConLai } from '../src/utils/veOffline.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = (p) => readFileSync(path.join(ROOT, p), 'utf8');
const bocChuThich = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split(/\r?\n/)
  .filter((d) => !d.trim().startsWith('//'))
  .join('\n');

const NGAY = 24 * 60 * 60 * 1000;
const T0 = Date.parse('2026-09-06T00:00:00.000Z');
const GOI = { plan: 'premium', expiresAt: '2026-12-01T00:00:00.000Z', deviceCount: 1, maxDevices: 3 };

/** Kho giả, trả về bộ ba hàm để nhét vào các tham số tiêm. */
function khoGia(batDau = {}) {
  const m = { ...batDau };
  return {
    ghi: (k, v) => { m[k] = v; return true; },
    doc: (k) => (k in m ? m[k] : null),
    xoa: (k) => { delete m[k]; return true; },
    xem: () => m,
  };
}

test('mất mạng mà ĐÃ từng soát vé thành công thì vẫn học được', () => {
  const k = khoGia();
  assert.equal(catVe(GOI, { bayGio: T0, ghi: k.ghi }), true);
  const ve = docVe({ bayGio: T0 + 3 * NGAY, doc: k.doc });
  assert.ok(ve, 'vé còn trong ân hạn mà đọc không ra');
  assert.equal(ve.access.plan, 'premium');
});

test('mất mạng mà CHƯA từng soát vé thì KHÔNG có gì để vào — paywall còn nguyên', () => {
  const k = khoGia();
  assert.equal(docVe({ bayGio: T0, doc: k.doc }), null);
});

test('quá ân hạn thì vé chết, buộc phải vào mạng lại', () => {
  const k = khoGia();
  catVe(GOI, { bayGio: T0, ghi: k.ghi });
  assert.ok(docVe({ bayGio: T0 + AN_HAN_MS - 1000, doc: k.doc }), 'ngay trước hạn phải còn sống');
  assert.equal(docVe({ bayGio: T0 + AN_HAN_MS + 1000, doc: k.doc }), null, 'quá hạn mà vẫn sống');
});

// Đây là ràng buộc dễ quên nhất và cũng đắt nhất nếu quên: vé KHÔNG BAO GIỜ
// được sống lâu hơn chính cái gói mà người học đã mua.
test('vé không bao giờ sống lâu hơn HẠN THẬT của gói', () => {
  const k = khoGia();
  const hetSom = { ...GOI, expiresAt: new Date(T0 + 2 * NGAY).toISOString() };
  catVe(hetSom, { bayGio: T0, ghi: k.ghi });
  assert.ok(docVe({ bayGio: T0 + NGAY, doc: k.doc }), 'trước hạn gói thì còn dùng được');
  assert.equal(docVe({ bayGio: T0 + 3 * NGAY, doc: k.doc }), null,
    'gói đã hết hạn mà vé vẫn mở app — ân hạn 7 ngày đang qua mặt hạn thật của gói');
});

test('LỖI MẠNG và MÁY CHỦ TỪ CHỐI phải phân biệt được', () => {
  assert.equal(laLoiMang({ status: 0 }), true, 'fetch ném thì requestAccess gán status 0');
  assert.equal(laLoiMang({}), true, 'ngoại lệ chưa kịp gắn mã cũng coi là lỗi mạng');
  for (const s of [401, 403, 404, 429, 500]) {
    assert.equal(laLoiMang({ status: s }), false, `${s} là máy chủ trả lời, KHÔNG phải mất mạng`);
  }
});

test('vé hỏng / rác trong kho thì trả null, không ném lúc vẽ', () => {
  for (const rac of ['', 'khong-phai-json', '{}', '{"access":null,"soatLuc":1}', '{"access":{},"soatLuc":"x"}']) {
    const k = khoGia({ bunnyVeOfflineV1: rac });
    assert.doesNotThrow(() => docVe({ bayGio: T0, doc: k.doc }));
    assert.equal(docVe({ bayGio: T0, doc: k.doc }), null, `rác "${rac}" lẽ ra phải bị bỏ`);
  }
});

test('kho ném (iOS chặn lưu) thì cất/đọc/bỏ vé đều không ném ra ngoài', () => {
  const nem = () => { throw new Error('SecurityError'); };
  assert.doesNotThrow(() => catVe(GOI, { bayGio: T0, ghi: nem }));
  assert.doesNotThrow(() => docVe({ bayGio: T0, doc: nem }));
  assert.doesNotThrow(() => boVe({ xoa: nem }));
});

test('số ngày còn lại làm tròn LÊN — không nói "còn 0 ngày" khi vẫn còn vài giờ', () => {
  assert.equal(ngayConLai(AN_HAN_MS), 7);
  assert.equal(ngayConLai(1000), 1, 'còn 1 giây mà báo 0 ngày là nói sai với người học');
  assert.equal(ngayConLai(0), 0);
});

// ── GHIM PHẦN NỐI DÂY: viết đúng logic mà quên gắn thì vô dụng ──────────────

test('AccessGate dùng vé ĐÚNG ở nhánh lỗi mạng, và BỎ vé khi máy chủ từ chối', () => {
  const s = bocChuThich(doc('src/components/access/AccessGate.jsx'));
  assert.match(s, /if \(laLoiMang\(error\)\) \{/, 'thiếu nhánh phân biệt lỗi mạng');
  const iMang = s.indexOf('laLoiMang(error)');
  const iDoc = s.indexOf('docVe()');
  assert.ok(iMang >= 0 && iDoc > iMang, 'docVe() phải nằm TRONG nhánh lỗi mạng, không đứng ngoài');
  assert.match(s, /boVe\(\)/, 'máy chủ từ chối mà không bỏ vé thì vé cũ che được một lượt từ chối thật');
  // Bỏ vé phải nằm ở nhánh KHÔNG-phải-lỗi-mạng, tức sau `} else {`.
  const iElse = s.indexOf('} else {', iMang);
  const iBo = s.indexOf('boVe();', iElse);
  assert.ok(iElse > 0 && iBo > iElse, 'boVe() không nằm ở nhánh "máy chủ từ chối"');
});

test('cất vé CHỈ ở hai chỗ soát thành công, không cất bừa', () => {
  const s = bocChuThich(doc('src/components/access/AccessGate.jsx'));
  const soLan = (s.match(/catVe\(/g) || []).length;
  assert.equal(soLan, 2, `catVe() xuất hiện ${soLan} lần — phải đúng 2: sau verify() thành công và sau activate() thành công`);
  assert.doesNotMatch(s, /catch[\s\S]{0,200}catVe\(/,
    'đang cất vé trong một nhánh catch — chỉ lượt soát THÀNH CÔNG mới được cất');
});

test('đăng xuất phải BỎ vé, nếu không nút đăng xuất là nút giả', () => {
  const s = bocChuThich(doc('src/components/access/AccessGate.jsx'));
  const iOut = s.indexOf('const logout');
  assert.ok(iOut > 0);
  const than = s.slice(iOut, iOut + 500);
  assert.match(than, /boVe\(\)/, 'logout() không bỏ vé — đăng xuất xong vé cũ vẫn mở được app');
});

test('huy hiệu phải NÓI RA là đang chạy bằng vé offline', () => {
  const s = bocChuThich(doc('src/components/access/AccessGate.jsx'));
  assert.match(s, /offline=\{state\.offline\}/, 'AccessBadge không nhận cờ offline');
  assert.match(s, /Ngoại tuyến/, 'huy hiệu không nói gì về việc đang chạy offline');
  assert.match(s, /rồi cần vào mạng/, 'không nói còn bao nhiêu ngày ân hạn — người học sẽ bị khoá mà không hiểu vì sao');
});
