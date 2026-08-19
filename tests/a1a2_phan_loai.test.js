// BẢNG PHÂN LOẠI 52 CHẶNG A1/A2 PHẢI KHỚP VỚI THỰC TẾ, KHÔNG PHẢI MỘT GHI CHÚ.
//
// `scripts/audit_a1a2_story.mjs` xếp 52 chặng A1/A2 là "không đủ điều kiện
// soạn", 48/52 chỉ vì đếm được ít hơn 4 dấu hiệu tường thuật. Đọc thật thì bộ
// đếm đó gộp hai chuyện khác hẳn: truyện kể ngôi thứ nhất trượt vì thiếu đại từ
// (`kids-starter`), và diễu hành từ vựng thật (`nature-animals-beginner`).
// Chính file audit tự dặn: "BỘ LỌC THÔ để ra DANH SÁCH VIỆC, KHÔNG phải phán
// quyết chất lượng."
//
// Nên phán quyết do người đọc ra — và test này bắt phán quyết đó phải TRUNG
// THỰC. Không có nó thì bảng phân loại là một đoạn văn đẹp: khai "đã soạn" mà
// kho không có câu nào cũng chẳng ai biết, và bỏ sót chặng cũng chẳng ai biết.

import test from 'node:test';
import assert from 'node:assert/strict';
import { PHAN_LOAI_A1, PHAN_LOAI_A2 } from '../scripts/data/a1a2_phan_loai.mjs';
import { STORY_QUIZ_A1 } from '../src/data/storyQuizA1.js';
import { doA1A2 } from '../scripts/audit_a1a2_story.mjs';

let kq;
test('đo lại danh sách chặng không đủ điều kiện', async () => {
  kq = await doA1A2();
  assert.ok(Array.isArray(kq.khong), 'audit không trả về danh sách chặng thiếu');
  assert.ok(Array.isArray(kq.daCo), 'audit không trả về danh sách chặng đã có câu hỏi');
});

// ⚠️ DANH SÁCH CỦA AUDIT CO LẠI KHI VIỆC ĐƯỢC LÀM XONG: chặng nào đã có câu hỏi
// thì nó nhảy khỏi `khong` sang `daCo` (52 → 43 ngay sau đợt 19/08). Nên phép
// phủ phải hỏi theo HAI CHIỀU, không so thẳng hai danh sách:
//   · chặng A1 CÒN thiếu mà chưa xếp loại  → sót việc;
//   · mục đã xếp mà không thuộc cả hai nhóm → xếp cho một chặng không có thật.
test('phân loại phủ ĐÚNG các chặng A1 bị bộ lọc loại — không sót, không bịa', () => {
  const conThieu = kq.khong.filter((c) => c.bac === 'starter').map((c) => c.id);
  const daCo = new Set(kq.daCo);
  const daXep = Object.keys(PHAN_LOAI_A1);

  const sot = conThieu.filter((id) => !daXep.includes(id));
  assert.deepEqual(sot, [], `chặng A1 bị loại mà chưa xếp: ${sot.join(', ')}`);

  const bia = daXep.filter((id) => !conThieu.includes(id) && !daCo.has(id));
  assert.deepEqual(bia, [], `xếp loại cho chặng không nằm trong danh sách nào: ${bia.join(', ')}`);
});

test('mọi mục đều có nhóm hợp lệ và LÝ DO ĐÍCH DANH, không phải câu khái quát', () => {
  for (const [id, m] of Object.entries(PHAN_LOAI_A1)) {
    assert.ok(['soan', 'viet-lai'].includes(m.nhom), `${id}: nhóm lạ "${m.nhom}"`);
    // Ngưỡng độ dài là để chặn "bài chưa đạt" / "cần xem lại" — loại câu không
    // nói gì. Lý do phải chỉ được vào CHÍNH bài đó, như `digital-society-100`.
    assert.ok(m.vi && m.vi.length >= 60, `${id}: lý do quá ngắn để là lý do đích danh`);
  }
});

test('khai "đã soạn" thì kho phải CÓ THẬT ≥4 câu — không được khai khống', () => {
  for (const [id, m] of Object.entries(PHAN_LOAI_A1)) {
    if (!m.xong) continue;
    const ds = STORY_QUIZ_A1[id];
    assert.ok(Array.isArray(ds) && ds.length >= 4,
      `${id}: khai đã soạn nhưng kho chỉ có ${ds?.length || 0} câu`);
  }
});

test('chặng xếp "cần viết lại" thì KHÔNG được lặng lẽ có câu hỏi', () => {
  // Nếu một chặng vừa bị xếp là diễu hành từ vựng vừa có câu hỏi trong kho thì
  // một trong hai chỗ đang nói dối, và tấm băng cảnh báo cam sẽ tắt trong khi
  // cái lỗ vẫn còn — đúng kiểu "thay thế âm thầm" mà dự án cấm.
  for (const [id, m] of Object.entries(PHAN_LOAI_A1)) {
    if (m.nhom !== 'viet-lai') continue;
    assert.ok(!STORY_QUIZ_A1[id], `${id}: xếp "cần viết lại" mà lại có câu hỏi trong kho`);
  }
});

test('bậc A2 để TRỐNG có chủ ý, chứ không xếp bừa khi chưa đọc', () => {
  // 28 chặng A2 chưa đọc tới. Xếp loại mà chưa đọc thì đúng là làm lại cái sai
  // của bộ lọc, chỉ khác là bằng tay.
  assert.deepEqual(PHAN_LOAI_A2, {},
    'A2 đã có mục thì phải kèm test phủ giống A1, không để nửa vời');
});
