// File: tests/writing_revision.test.js
// GHIM VIỆC 5.4 — VÒNG VIẾT – SỬA – VIẾT LẠI.
//
// Tiêu chí nghiệm thu của bảng kế hoạch: "lưu được ≥2 bản/đề". Ba thứ dễ vỡ:
//   1. Số bản phải TÍNH TỪ SỔ, không tự khai — hai bản cùng đề phải ra 1 rồi 2.
//   2. Bản ghi CŨ (trước 5.4, không có banSo) phải được gán số khi ĐỌC — cùng
//      luật đã áp cho trường kyNang: luật thêm sau phải chạy trên dữ liệu cũ.
//   3. Vòng viết lại KHÔNG được biến tự-đánh-giá thành điểm đo — hồ sơ vẫn ghi
//      Viết là "chưa đo được" dù đã viết lại bao nhiêu bản.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// localStorage giả — như các test selfReport khác.
const kho = new Map();
globalThis.localStorage = {
  getItem: (k) => (kho.has(k) ? kho.get(k) : null),
  setItem: (k, v) => kho.set(k, String(v)),
  removeItem: (k) => kho.delete(k),
};

const { luuBaiLam, docSo, baiCuaDe, banMoiNhat, thongKeVietLai, thongKeTuBaoCao, WRITING_LOG_KEY } =
  await import('../src/utils/selfReportLog.js');
const { buildSkillProfile } = await import('../src/utils/skillProfile.js');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

beforeEach(() => kho.clear());

test('lưu được ≥2 bản cho một đề, số bản tính từ sổ: 1 rồi 2 rồi 3', () => {
  const b1 = luuBaiLam({ promptId: 'de-1', text: 'first draft here' });
  const b2 = luuBaiLam({ promptId: 'de-1', text: 'second draft, longer and better' });
  const b3 = luuBaiLam({ promptId: 'de-1', text: 'third draft' });
  assert.equal(b1.banSo, 1);
  assert.equal(b2.banSo, 2);
  assert.equal(b3.banSo, 3);
  // Đề KHÁC không bị dính số của đề này.
  assert.equal(luuBaiLam({ promptId: 'de-2', text: 'other prompt' }).banSo, 1);
  assert.equal(baiCuaDe('writing', 'de-1').length, 3);
  assert.equal(banMoiNhat('writing', 'de-1').banSo, 3);
});

test('bản ghi CŨ không có banSo được gán số khi đọc, theo thứ tự trong từng đề', () => {
  // Sổ để lại từ trước 5.4: không kyNang, không banSo.
  localStorage.setItem(WRITING_LOG_KEY, JSON.stringify([
    { promptId: 'a', text: 'x', at: '2026-08-01T00:00:00Z' },
    { promptId: 'b', text: 'y', at: '2026-08-02T00:00:00Z' },
    { promptId: 'a', text: 'x2', at: '2026-08-03T00:00:00Z' },
  ]));
  const ds = docSo('writing');
  assert.deepEqual(ds.map((b) => [b.promptId, b.banSo]), [['a', 1], ['b', 1], ['a', 2]]);
  // Và bản MỚI lưu tiếp vào đề 'a' phải là bản 3, không phải bản 1.
  assert.equal(luuBaiLam({ promptId: 'a', text: 'x3' }).banSo, 3);
});

test('thống kê viết lại đếm đúng số đề có ≥2 bản', () => {
  luuBaiLam({ promptId: 'p1', text: 'draft' });
  luuBaiLam({ promptId: 'p1', text: 'revised' });
  luuBaiLam({ promptId: 'p2', text: 'only one' });
  assert.deepEqual(thongKeVietLai('writing'), { soDe: 2, deCoVietLai: 1, tuBaoCao: true });
  assert.equal(thongKeTuBaoCao('writing').deCoVietLai, 1);
});

test('viết lại bao nhiêu bản thì kỹ năng Viết vẫn là CHƯA ĐO ĐƯỢC', () => {
  for (let i = 0; i < 5; i += 1) luuBaiLam({ promptId: 'p', text: `draft ${i} with words` });
  const hs = buildSkillProfile(
    { version: 2, cefr: 'B1', skills: { reading: 50, listening: 50, writing: null, speaking: null }, ladder: {} },
    { writing: thongKeTuBaoCao('writing'), speaking: thongKeTuBaoCao('speaking') }
  );
  const viet = hs.cefrSkills.find((s) => s.key === 'writing');
  assert.ok(!viet.measured, 'viết lại 5 bản làm ô Viết thành "đo được" — tự đánh giá vẫn không phải phép đo');
  assert.match(viet.tuBaoCaoLabel, /1 đề đã viết lại bản 2/, 'nhãn không nhắc vòng viết lại');
  assert.match(viet.tuBaoCaoLabel, /chưa phải điểm đo được/);
});

// Nút "Viết bản 2" phải THẬT SỰ tồn tại trong màn hình viết — đường viết lại
// không có lối vào thì sổ có hỗ trợ mấy bản cũng vô nghĩa (bài học 3.5: hai
// panel hứa nút điều hướng mà không ai gọi hàm).
test('WritingPromptPanel có vòng viết lại thật: đổ bản cũ vào ô soạn, giữ nhận xét bản trước', () => {
  const s = readFileSync(path.join(ROOT, 'src/components/writing/WritingPromptPanel.jsx'), 'utf8');
  assert.match(s, /banMoiNhat\('writing', de\.id\)/, 'panel không đọc bản mới nhất của đề');
  assert.match(s, /const vietLai = /, 'panel không có hàm mở vòng viết lại');
  assert.match(s, /setText\(banTruoc \? banTruoc\.text : text\)/, 'viết lại không đổ bài cũ vào ô soạn');
  assert.match(s, /setNhanXetCu\(/, 'viết lại không đóng băng nhận xét của bản trước');
  assert.match(s, /Viết bản \{/, 'không có nút Viết bản N+1');
});
