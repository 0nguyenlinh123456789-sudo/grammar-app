// File: tests/gop_kho_dong_bo.test.js
// GHIM: ĐỒNG BỘ KHÔNG ĐƯỢC XOÁ NHẬT KÝ.
//
// ══ ĐIỀU ĐÃ ĐO ĐƯỢC, KHÔNG PHẢI PHỎNG ĐOÁN ══
// `src/server/routes/progress.js` lưu **cả khối** dưới một khoá Redis và chỉ so
// đúng MỘT mốc `updatedAt` ở cấp trên cùng. Không có gộp theo từng khoá. Với dữ
// liệu là ẢNH CHỤP trạng thái (XP, chuỗi ngày, chặng đã xong) thì lấy bản mới
// nhất là đúng.
//
// Nhưng hai kho KHÔNG phải ảnh chụp:
//   · `bandExamHistoryV1` — căn cứ DUY NHẤT của tờ chứng nhận;
//   · `thoiGianHocV1` — đồng hồ học, ghi theo NGÀY.
//
// Đường mất thật: thi đạt B2 trên điện thoại lúc mất mạng → mở máy tính (đang
// giữ bản cũ) → máy tính đồng bộ trước → điện thoại lên mạng, thấy mốc máy chủ
// mới hơn nên KHÔI PHỤC → bản ghi thi chưa kịp đẩy lên bị đè mất. Người học
// không có cách nào lấy lại ngoài thi lại.
//
// Đưa `bandExamHistoryV1` vào danh sách đồng bộ (đợt trước) là đúng — mất hẳn
// khi đổi máy còn tệ hơn. Nhưng dừng ở đó thì chỉ đổi một kiểu mất lấy một kiểu
// mất khác. Test này ghim phép gộp.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gopSoThi, gopDongHo, datHoacGop, KHO_GOP_DUOC } from '../src/utils/gopKhoDongBo.js';
import { LEARNING_STORAGE_KEYS } from '../src/utils/backup.js';

const kho = (bd = {}) => {
  const m = new Map(Object.entries(bd));
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    _m: m,
  };
};

const luot = (cefr, ngay) => ({ examId: `exam-${cefr.toLowerCase()}`, cefr, dat: true, lucLam: ngay });

// ══ SỔ THI ═════════════════════════════════════════════════════════════════
test('lượt thi CHỈ CÓ Ở MÁY NÀY không bị bản của máy chủ đè mất', () => {
  const dienThoai = JSON.stringify([luot('A2', '2026-08-20T01:00:00.000Z'), luot('B2', '2026-08-21T09:00:00.000Z')]);
  const mayChu = JSON.stringify([luot('A2', '2026-08-20T01:00:00.000Z')]);

  const ra = JSON.parse(gopSoThi(dienThoai, mayChu));
  assert.equal(ra.length, 2, 'gộp xong mất mất lượt thi B2 — đó là căn cứ duy nhất của tờ chứng nhận');
  assert.ok(ra.some((k) => k.cefr === 'B2'));
});

test('gộp LUỸ ĐẲNG: chạy lại bao nhiêu lần cũng không đẻ thêm bản ghi', () => {
  const a = JSON.stringify([luot('B1', '2026-08-20T01:00:00.000Z')]);
  const b = JSON.stringify([luot('B1', '2026-08-20T01:00:00.000Z'), luot('B2', '2026-08-22T01:00:00.000Z')]);
  const mot = gopSoThi(a, b);
  const hai = gopSoThi(mot, b);
  const ba = gopSoThi(hai, b);
  assert.equal(JSON.parse(mot).length, 2);
  assert.deepEqual(JSON.parse(hai), JSON.parse(mot));
  assert.deepEqual(JSON.parse(ba), JSON.parse(mot));
});

test('gộp KHÔNG PHỤ THUỘC THỨ TỰ hai máy đồng bộ', () => {
  const a = JSON.stringify([luot('A2', '2026-08-20T01:00:00.000Z')]);
  const b = JSON.stringify([luot('B1', '2026-08-21T01:00:00.000Z')]);
  assert.deepEqual(JSON.parse(gopSoThi(a, b)), JSON.parse(gopSoThi(b, a)));
});

test('bản ghi THIẾU NGÀY vẫn được giữ, không bị vứt vì không gộp nổi', () => {
  const a = JSON.stringify([{ examId: 'exam-b1', cefr: 'B1', dat: true }]);
  const b = JSON.stringify([luot('A2', '2026-08-20T01:00:00.000Z')]);
  const ra = JSON.parse(gopSoThi(a, b));
  assert.equal(ra.length, 2, 'bản ghi thiếu ngày bị vứt — nó vẫn là lượt thi người ta đã làm');
});

test('sổ hỏng / bị sửa tay không làm mất sổ lành', () => {
  const lanh = JSON.stringify([luot('B2', '2026-08-22T01:00:00.000Z')]);
  assert.doesNotThrow(() => gopSoThi('khong-phai-json', lanh));
  assert.doesNotThrow(() => gopSoThi(lanh, '{"khong":"phai-mang"}'));
  // Bên nào còn đọc được thì giữ bên đó, không trả về rỗng.
  assert.ok(gopSoThi('khong-phai-json', lanh).includes('B2'));
  assert.ok(gopSoThi(lanh, 'null').includes('B2'));
});

test('có TRẦN số bản ghi, và trần đó cắt bản CŨ chứ không cắt bản mới', () => {
  const nhieu = (n, tu) => JSON.stringify(
    Array.from({ length: n }, (_, i) => luot('A2', `2026-0${tu}-${String(i + 10).padStart(2, '0')}T01:00:00.000Z`)),
  );
  const ra = JSON.parse(gopSoThi(nhieu(20, 7), nhieu(20, 8), 30));
  assert.equal(ra.length, 30);
  assert.ok(ra[ra.length - 1].lucLam > ra[0].lucLam, 'giữ nhầm đầu — phải cắt bản cũ, giữ bản mới');
  assert.ok(ra[ra.length - 1].lucLam.startsWith('2026-08'), 'bản mới nhất bị cắt mất');
});

// ══ ĐỒNG HỒ HỌC ════════════════════════════════════════════════════════════
test('đồng hồ: ngày chỉ máy kia có thì phải giữ lại', () => {
  const ra = JSON.parse(gopDongHo(
    JSON.stringify({ '2026-08-20': 1800 }),
    JSON.stringify({ '2026-08-21': 900 }),
  ));
  assert.deepEqual(ra, { '2026-08-20': 1800, '2026-08-21': 900 });
});

test('đồng hồ: cùng một ngày thì LẤY LỚN HƠN, không CỘNG', () => {
  const ra = JSON.parse(gopDongHo(
    JSON.stringify({ '2026-08-20': 1800 }),
    JSON.stringify({ '2026-08-20': 1200 }),
  ));
  assert.equal(ra['2026-08-20'], 1800,
    'cộng thì hai máy cùng mở app một buổi sẽ đẻ ra gấp đôi thời gian — một con số sai theo chiều có lợi cho mình');
});

// ══ NƠI GỌI ════════════════════════════════════════════════════════════════
test('datHoacGop: khoá nhật ký thì GỘP, khoá ảnh chụp thì ĐÈ như cũ', () => {
  const s = kho({
    bandExamHistoryV1: JSON.stringify([luot('B2', '2026-08-22T01:00:00.000Z')]),
    xp: '500',
  });

  const daGop = datHoacGop(s, 'bandExamHistoryV1', JSON.stringify([luot('A2', '2026-08-20T01:00:00.000Z')]));
  assert.equal(daGop, true);
  assert.equal(JSON.parse(s.getItem('bandExamHistoryV1')).length, 2, 'sổ thi bị đè thay vì gộp');

  const daGop2 = datHoacGop(s, 'xp', '120');
  assert.equal(daGop2, false);
  assert.equal(s.getItem('xp'), '120', 'XP là ảnh chụp trạng thái — phải đè, không gộp');
});

test('máy chưa có gì thì nhận thẳng bản của máy chủ, không gộp với rỗng', () => {
  const s = kho({});
  const moi = JSON.stringify([luot('B1', '2026-08-20T01:00:00.000Z')]);
  assert.equal(datHoacGop(s, 'bandExamHistoryV1', moi), false);
  assert.equal(s.getItem('bandExamHistoryV1'), moi);
});

test('mọi khoá khai là GỘP ĐƯỢC đều thật sự nằm trong danh sách đồng bộ', () => {
  for (const k of Object.keys(KHO_GOP_DUOC)) {
    assert.ok(LEARNING_STORAGE_KEYS.includes(k),
      `khai gộp cho "${k}" nhưng khoá đó không hề được đồng bộ — phép gộp sẽ không bao giờ chạy`);
  }
});

test('đồng bộ THẬT SỰ đi qua phép gộp, không chỉ khai suông', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync('src/utils/progressSync.js', 'utf8');
  assert.ok(/datHoacGop/.test(src), 'progressSync vẫn setItem thẳng — phép gộp không có đường nào chạy');
  // Cả HAI đường khôi phục: máy chủ mới hơn, và lượt đẩy bị từ chối.
  assert.equal((src.match(/datHoacGop\(storage/g) || []).length, 2,
    'chỉ một trong hai đường khôi phục đi qua phép gộp — đường còn lại vẫn xoá nhật ký');
});
