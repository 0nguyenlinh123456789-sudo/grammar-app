// File: tests/placement_bank.test.js
// GHIM TIÊU CHÍ N7 (KE_HOACH_B2.md): test đầu vào phải TÁCH ĐƯỢC A1/A2/B1/B2/C1,
// đo bằng "mỗi bậc ≥8 câu có nhãn cấp độ".
//
// Trước 2026-08-15: 12 câu, 0 câu có nhãn bậc, trình độ suy từ phần trăm đúng.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placementBank } from '../src/data/placementBank.js';
import { CEFR_LADDER, SKILLS, PER_SKILL_PER_ROUND } from '../src/utils/placementAdaptive.js';
import { CEFR_TO_PLACEMENT } from '../src/utils/placement.js';
import { LEVELS } from '../src/utils/placement.js';

const CAU_TOI_THIEU_MOI_BAC = 8;

test('N7 — mỗi bậc CEFR có đủ câu có nhãn để tách được trình độ', () => {
  for (const level of CEFR_LADDER) {
    const items = placementBank.filter((q) => q.cefr === level);
    assert.ok(items.length >= CAU_TOI_THIEU_MOI_BAC,
      `bậc ${level} chỉ có ${items.length} câu, dưới mức ${CAU_TOI_THIEU_MOI_BAC} đã cam kết ở N7`);
  }
  // Không được có câu nào lạc bậc: một câu thiếu nhãn là một câu không đo được gì.
  const lac = placementBank.filter((q) => !CEFR_LADDER.includes(q.cefr));
  assert.deepEqual(lac.map((q) => q.id), [], 'có câu mang nhãn bậc lạ hoặc thiếu nhãn');
});

test('mỗi bậc đủ câu cho một vòng thích ứng (2 câu × 3 kỹ năng)', () => {
  const thieu = [];
  for (const level of CEFR_LADDER) {
    for (const skill of SKILLS) {
      const n = placementBank.filter((q) => q.cefr === level && q.skill === skill).length;
      if (n < PER_SKILL_PER_ROUND) thieu.push(`${level}/${skill}: ${n}/${PER_SKILL_PER_ROUND}`);
    }
  }
  // Thiếu thì vòng đó ngắn hơn dự tính — bài vẫn chạy (ngưỡng qua vòng co theo
  // số câu thật), nhưng độ tin cậy tụt mà không ai thấy. Nên chặn ở đây.
  assert.deepEqual(thieu, [], 'ô bậc×kỹ năng không đủ câu cho một vòng:\n  ' + thieu.join('\n  '));
});

test('mọi câu hỏi đều dùng được: id duy nhất, đáp án tồn tại, lựa chọn không trùng', () => {
  const ids = placementBank.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length, 'có id câu hỏi bị trùng — React dùng id làm khoá và bộ máy dùng id để chống hỏi lại');

  const loi = [];
  for (const q of placementBank) {
    if (!q.prompt || typeof q.prompt !== 'string') loi.push(`${q.id}: thiếu đề bài`);
    if (!SKILLS.includes(q.skill)) loi.push(`${q.id}: kỹ năng lạ "${q.skill}"`);
    if (!Array.isArray(q.options) || q.options.length < 2) loi.push(`${q.id}: cần ít nhất 2 lựa chọn`);
    else {
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
        loi.push(`${q.id}: chỉ số đáp án ${q.answer} nằm ngoài danh sách lựa chọn`);
      }
      // So SÁNH PHÂN BIỆT HOA THƯỜNG. Lần trước bộ kiểm của tôi hạ hết về chữ
      // thường rồi so, nên các câu HỎI VỀ VIỆC VIẾT HOA bị báo đỏ oan. Ở đây
      // cũng vậy: hai lựa chọn khác nhau ở chữ hoa là hai lựa chọn khác nhau.
      const seen = new Set(q.options);
      if (seen.size !== q.options.length) loi.push(`${q.id}: có hai lựa chọn trùng nhau — câu này sẽ có hai đáp án đúng`);
    }
    if (!q.explanation) loi.push(`${q.id}: thiếu giải thích`);
  }
  assert.deepEqual(loi, [], 'câu hỏi hỏng:\n  ' + loi.join('\n  '));
});

test('bậc CEFR nối được sang id cấp độ CÓ THẬT', () => {
  const real = new Set(LEVELS.map((l) => l.id));
  for (const level of CEFR_LADDER) {
    assert.ok(level in CEFR_TO_PLACEMENT, `bậc ${level} chưa có trong CEFR_TO_PLACEMENT`);
    assert.ok(real.has(CEFR_TO_PLACEMENT[level]), `${level} trỏ tới cấp độ "${CEFR_TO_PLACEMENT[level]}" không có trong LEVELS`);
  }
  // Cạm bẫy gạch ngang / gạch dưới, ghim luôn ở đây cho khỏi lệch về sau.
  assert.equal(CEFR_TO_PLACEMENT.B2, 'upper-intermediate');
});
