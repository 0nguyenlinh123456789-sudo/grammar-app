// File: tests/certificate.test.js
// Ghim việc 4.4 — tờ chứng nhận là **chỗ DUY NHẤT app nói với người ngoài**,
// nên nó bị soi chặt hơn mọi màn hình khác.
//
// Việc 4.4 đòi đổi điều kiện cấp sang "đã đạt bài thi cuối bậc". Nhưng ghi chú
// (#0-D1) đã cố ý biến tờ này thành CHỨNG NHẬN CHUYÊN CẦN chứ không phải chứng
// nhận trình độ — bỏ hẳn điều kiện cũ là xoá mất thứ đó. Nên tờ giấy có HAI căn
// cứ và IN RA CHÍNH XÁC căn cứ nào đang áp dụng, với một luật cứng:
//
//   **NHÃN BẬC CHỈ ĐẾN TỪ BÀI THI.** Đi hết lộ trình không đẻ ra một bậc nào.
//
// Và vì `BAO_CAO_DU_DE_LEN_C2.md` đã xếp "chứng chỉ có giá trị đối chiếu CEFR"
// vào mục việc KHÔNG làm (cần tổ chức khảo thí), tờ giấy phải tự phủ nhận điều
// đó bằng chữ, không phải bằng ý.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const SRC = fs.readFileSync('src/components/progress/LearningReport.jsx', 'utf8');

test('tờ chứng nhận tự phủ nhận là chứng chỉ CEFR, bằng chữ', () => {
  assert.ok(/KHÔNG phải chứng chỉ CEFR/.test(SRC),
    'phải nói thẳng đây không phải chứng chỉ CEFR — xem BAO_CAO_DU_DE_LEN_C2.md, mục việc KHÔNG đề xuất làm');
  assert.ok(/tổ chức khảo thí/.test(SRC), 'phải nói rõ chứng chỉ đối chiếu quốc tế phải thi ở tổ chức khảo thí');
});

test('bậc in trên giấy chỉ lấy từ lượt THI ĐẠT, không lấy từ tiến độ lộ trình', () => {
  // Nhánh in bậc phải nằm trong nhánh `luotThi`; nhánh chuyên cần in số CHẶNG.
  const iThi = SRC.indexOf('luotThi ? <>');
  const iChuyenCan = SRC.indexOf('Chứng nhận hoàn thành lộ trình');
  assert.ok(iThi > 0 && iChuyenCan > iThi, 'không tìm thấy hai nhánh chứng nhận');
  const khoiThi = SRC.slice(iThi, iChuyenCan);
  const khoiChuyenCan = SRC.slice(iChuyenCan, SRC.indexOf('Trình độ đầu vào (tham khảo)', iChuyenCan));

  assert.ok(/luotThi\.cefr/.test(khoiThi), 'nhánh thi phải in bậc lấy từ kết quả thi');
  assert.ok(!/cefr/.test(khoiChuyenCan),
    'nhánh chuyên cần KHÔNG được in bậc — đi hết lộ trình không phải một phép đo năng lực');
  assert.ok(/chứng nhận chuyên cần/i.test(khoiChuyenCan),
    'nhánh chuyên cần phải tự gọi đúng tên mình');
});

test('giấy ghi nhận thi in đủ BẬC, NGÀY THI, và căn cứ chấm', () => {
  assert.ok(/Ngày thi:/.test(SRC), 'nghiệm thu 4.4 đòi ghi rõ ngày thi');
  assert.ok(/luotThi\.lucLam/.test(SRC), 'ngày thi phải lấy từ bản ghi lượt thi, không phải ngày in giấy');
  assert.ok(/luotThi\.phan\.map/.test(SRC), 'phải in từng phần chấm được kèm số câu đúng');
  assert.ok(/phanKhongTinh/.test(SRC), 'phải in cả những phần KHÔNG tính vào kết quả');
  assert.ok(/không chấm ngữ pháp/.test(SRC) && /không chấm phát âm/.test(SRC),
    'phải nói rõ vì sao hai phần đó không tính');
});

test('điều kiện mở chứng nhận nhận CẢ HAI đường, không âm thầm bỏ đường cũ', () => {
  assert.ok(/verifiedCount >= totalMilestonesCount\) \|\| !!luotThi/.test(SRC),
    'điều kiện cấp phải là "xong lộ trình HOẶC đạt bài thi" — bỏ vế đầu là xoá mất chứng nhận chuyên cần của (#0-D1)');
});

test('báo cáo tiến bộ nói rõ đường mở chứng nhận cho người CHƯA có gì', () => {
  assert.ok(/đạt một bài thi cuối bậc<\/b>, hoặc hoàn thành và xác minh toàn bộ lộ trình/.test(SRC),
    'người chưa đủ điều kiện phải được nói cho biết CẢ HAI đường');
});
