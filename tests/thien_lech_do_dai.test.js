// File: tests/thien_lech_do_dai.test.js
//
// GHIM: ĐÁP ÁN ĐÚNG KHÔNG ĐƯỢC DÀI HƠN HẲN CÁC LỰA CHỌN KHÁC.
//
// ══ VÌ SAO ══
// "Chọn phương án dài nhất" là mẹo làm bài trắc nghiệm cổ nhất. Nếu đáp án
// đúng hay là phương án dài nhất, người học ăn điểm mà không hiểu bài — và
// điểm đó chảy thẳng vào cổng 85% của app, tức là bằng chứng SAI.
//
// ══ SỐ ĐO 31/08 (node scripts/audit_story_quiz.mjs) ══
//   tổng câu đọc hiểu                              1079
//   đáp án là lựa chọn dài nhất (duy nhất)   396  36,7%   (kỳ vọng ~25%)
//   trong đó DÀI HƠN THẤY ĐƯỢC (≥10%)         26   2,4%
//   nặng (dài hơn lựa chọn nhì ≥40%)            0      0%
//   dải 0–10%: chênh trung vị 3 ký tự, tối đa 6
//
// Đọc đúng con số này: 36,7% nghe to nhưng 34,3 điểm phần trăm trong đó là
// chênh DƯỚI MỘT TỪ trên lựa chọn dài ~60 ký tự — mắt không phân biệt được,
// nên không phải mẹo dùng được. Thứ đáng lo là hai dòng dưới, và cả hai đang
// ở mức thấp.
//
// Phép đo này KHÔNG bắt phải sửa 1079 câu. Nó chốt hai mốc để tình trạng không
// xấu đi, và để đợt soạn nội dung sau bị chặn ngay nếu bắt đầu nhồi đáp án dài:
//   · số câu dài hơn THẤY ĐƯỢC (≥10%) không được vượt 40 (nay 26);
//   · KHÔNG được có câu nào dài hơn lựa chọn nhì từ 40% trở lên (nay 0).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { doThienLech } from '../scripts/audit_story_quiz.mjs';

const TRAN_THAY_DUOC = 40;

test('không có câu nào đáp án dài hơn hẳn (≥40%) lựa chọn nhì', async () => {
  const r = await doThienLech();
  assert.deepEqual(r.nang.slice(0, 5).map((x) => `${x.id}: ${x.cua} vs ${x.nhi} ký tự`), [],
    `${r.nang.length} câu có đáp án dài vượt trội — đoán theo độ dài là trúng`);
});

test('số câu đáp án dài hơn THẤY ĐƯỢC không được phình lên', async () => {
  const r = await doThienLech();
  assert.ok(r.daiThayDuoc <= TRAN_THAY_DUOC,
    `${r.daiThayDuoc}/${r.tong} câu có đáp án dài hơn ≥10% — mốc là ${TRAN_THAY_DUOC} (đo được 26 lúc lập mốc). Đợt soạn nội dung nào vừa đẩy con số này lên thì phải kéo dài phương án nhiễu cho ngang đáp án, đừng nới mốc.`);
});

test('mốc trong phép đo này phải LỎNG HƠN thực tế, nếu không nó vô nghĩa', async () => {
  // Một cái mốc đặt đúng bằng số đo hiện tại thì đỏ ngay khi thêm một câu bất
  // kỳ, và người ta sẽ nới nó thay vì sửa nội dung — đúng thói quen dự án này
  // đã cấm. Mốc phải có khoảng thở, và khoảng đó phải đo được.
  const r = await doThienLech();
  assert.ok(r.daiThayDuoc < TRAN_THAY_DUOC,
    'mốc đang bằng hoặc thấp hơn thực tế — hãy sửa nội dung, đừng nới mốc');
});
