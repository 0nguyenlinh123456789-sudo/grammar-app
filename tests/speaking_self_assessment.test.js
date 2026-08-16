// File: tests/speaking_self_assessment.test.js
// Kỹ năng NÓI đi qua ĐÚNG cái cửa hẹp mà kỹ năng Viết đã đi (việc 3.4/3.5):
// tự đánh giá KHÔNG được biến thành điểm năng lực.
//
// Thêm một bất biến mà mục Viết không cần: SỔ CŨ KHÔNG ĐƯỢC MẤT. Trước khi
// tách hai kỹ năng, bản ghi trong `writingLogV1` không có trường `kyNang`. Nếu
// bộ đọc mới lọc "chỉ nhận bản ghi có kyNang" thì mọi người đã viết từ trước sẽ
// mở app lên thấy sổ trắng — đúng loại lỗi "luật thêm sau không chạy trên dữ
// liệu cũ" đã dính ở bộ thu VOA.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSkillProfile } from '../src/utils/skillProfile.js';
import {
  luuBaiLam, thongKeTuBaoCao, docSo, xoaSo, SPEAKING_LOG_KEY, WRITING_LOG_KEY, DANH_TU,
} from '../src/utils/selfReportLog.js';
import { LEARNING_STORAGE_KEYS } from '../src/utils/backup.js';

function gaStorage() {
  const kho = new Map();
  globalThis.localStorage = {
    getItem: (k) => (kho.has(k) ? kho.get(k) : null),
    setItem: (k, v) => kho.set(k, String(v)),
    removeItem: (k) => kho.delete(k),
  };
  return kho;
}

const KET_QUA = {
  version: 2, cefr: 'B1', correct: 20, total: 40,
  skillStats: { reading: { correct: 8, total: 10 } },
  skillCefr: { reading: 'B1' },
};

test('sổ lượt nói nằm trong danh sách sao lưu/đồng bộ', () => {
  assert.ok(LEARNING_STORAGE_KEYS.includes(SPEAKING_LOG_KEY),
    `"${SPEAKING_LOG_KEY}" chưa có trong LEARNING_STORAGE_KEYS — đổi máy là mất hết lượt nói đã lưu`);
});

test('nói vẫn là "chưa đo được" dù đã tự đánh giá rất nhiều lượt', () => {
  gaStorage();
  for (let i = 0; i < 30; i += 1) {
    luuBaiLam({ kyNang: 'speaking', promptId: `gs-vstep-x${i % 4}`, text: 'I talk about my daily routine.', tuDanhGia: [true, true, true, true] });
  }
  const hs = buildSkillProfile(KET_QUA, { speaking: thongKeTuBaoCao('speaking') });
  const noi = hs.cefrSkills.find((s) => s.key === 'speaking');
  assert.equal(noi.measured, false, 'tự đánh giá KHÔNG được làm ô Nói thành "đo được"');
  assert.equal(noi.percent, null, 'không được sinh ra phần trăm từ việc tự chấm');
  assert.ok(noi.reason, 'vẫn phải giữ lý do "chưa đo được"');
  assert.equal(noi.tuBaoCao.soBai, 30);
  assert.equal(noi.tuBaoCao.soDe, 4);
});

test('nhãn tự báo cáo của ô Nói KHÔNG được gọi là "bài viết"', () => {
  gaStorage();
  luuBaiLam({ kyNang: 'speaking', promptId: 'gs-vstep-a', text: 'Hello there my friend.' });
  luuBaiLam({ kyNang: 'writing', promptId: 'w-a1', text: 'I am from Hue.' });
  const hs = buildSkillProfile(KET_QUA, {
    speaking: thongKeTuBaoCao('speaking'),
    writing: thongKeTuBaoCao('writing'),
  });
  const noi = hs.cefrSkills.find((s) => s.key === 'speaking');
  const viet = hs.cefrSkills.find((s) => s.key === 'writing');
  assert.ok(!noi.tuBaoCaoLabel.includes('bài viết'),
    `ô Nói đang hiện "${noi.tuBaoCaoLabel}" — danh từ phải theo kỹ năng`);
  assert.ok(noi.tuBaoCaoLabel.includes(DANH_TU.speaking));
  assert.ok(viet.tuBaoCaoLabel.includes(DANH_TU.writing));
});

test('hai kỹ năng lưu vào hai khoá riêng, không lẫn nhau', () => {
  gaStorage();
  luuBaiLam({ kyNang: 'writing', promptId: 'w-1', text: 'One two three.' });
  luuBaiLam({ kyNang: 'speaking', promptId: 'gs-1', text: 'Four five six.' });
  luuBaiLam({ kyNang: 'speaking', promptId: 'gs-2', text: 'Seven eight nine.' });
  assert.equal(docSo('writing').length, 1);
  assert.equal(docSo('speaking').length, 2);
  xoaSo('speaking');
  assert.equal(docSo('speaking').length, 0);
  assert.equal(docSo('writing').length, 1, 'xoá sổ nói không được đụng sổ viết');
});

test('BẢN GHI CŨ không có cờ kyNang vẫn được nhận là bài viết, không bị xoá trắng', () => {
  const kho = gaStorage();
  // Đúng hình dạng đã lưu trước khi tách hai kỹ năng.
  kho.set(WRITING_LOG_KEY, JSON.stringify([
    { promptId: 'w-cu-1', text: 'Old entry.', soTu: 2, tuDanhGia: [true], soTieuChiTuThay: 1, dungBaiMau: false, tuBaoCao: true, at: '2026-08-01T00:00:00.000Z' },
  ]));
  const ds = docSo('writing');
  assert.equal(ds.length, 1, 'bản ghi cũ bị mất — người đã viết từ trước sẽ thấy sổ trắng');
  assert.equal(ds[0].kyNang, 'writing', 'bản ghi cũ phải được gán nhãn khi đọc');
  assert.equal(thongKeTuBaoCao('writing').soBai, 1);
  assert.equal(thongKeTuBaoCao('speaking').soBai, 0, 'bản ghi cũ KHÔNG được chảy sang sổ nói');
});

test('mọi bản ghi lượt nói mang cờ tuBaoCao và KHÔNG có trường điểm', () => {
  gaStorage();
  const ban = luuBaiLam({ kyNang: 'speaking', promptId: 'gs-vstep-a', text: 'I go to work by bus.', tuDanhGia: [true, false, true, true] });
  assert.equal(ban.tuBaoCao, true);
  assert.equal(ban.kyNang, 'speaking');
  assert.equal(ban.soTieuChiTuThay, 3);
  const chuoi = JSON.stringify(ban).toLowerCase();
  for (const xau of ['score', 'percent', 'diem', 'điểm', 'accuracy']) {
    assert.ok(!chuoi.includes(xau), `bản ghi chứa trường giống điểm số: ${xau}`);
  }
});

test('kỹ năng không rõ thì ném lỗi, không lặng lẽ ghi vào sổ viết', () => {
  gaStorage();
  assert.throws(() => luuBaiLam({ kyNang: 'nghe', promptId: 'x', text: 'abc' }), /kỹ năng không rõ/);
});
