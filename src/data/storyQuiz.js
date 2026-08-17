// File: src/data/storyQuiz.js
// VIỆC 3.1 — CÂU HỎI ĐỌC HIỂU MỨC VĂN BẢN, SOẠN TAY.
//
// ══ VÌ SAO FILE NÀY TỒN TẠI ══
// Phần kiểm tra nằm ngay dưới bài đọc của mỗi chủ đề, nên người học mặc nhiên
// hiểu là nó hỏi về BÀI ĐỌC. Trước file này thì 266/267 chủ đề không có câu nào
// hỏi về bài: các câu hiện ra được sắp xếp từ câu ví dụ của từng mục từ, tức là
// kiểm tra hiểu MỘT CÂU rời không liên quan tới bài vừa đọc.
//
// ⚠️ Dòng "1/267" trong bảng kế hoạch cũng chưa đúng. Chủ đề duy nhất có câu
// soạn tay (`travel-transport`) có 5 câu MỨC CÂU — mỗi câu kèm một câu tiếng
// Anh độc lập, không dính gì tới `storyEn` của chủ đề đó. Tính theo tiêu chí N5
// ("đọc hiểu theo VĂN BẢN") thì điểm xuất phát thật là **0/267**.
//
// ══ CĂN CỨ PHẢI NGUYÊN VĂN ══
// Mỗi câu có trường `dan` = câu tiếng Anh CHÉP NGUYÊN VĂN từ `storyEn` của chính
// chủ đề đó, làm căn cứ cho đáp án đúng. `tests/story_quiz.test.js` kiểm từng
// chuỗi có thật nằm trong bài hay không.
//
// Không có nó thì một đáp án sai nằm lẫn trong 152 câu là vĩnh viễn không ai
// thấy, và về mặt máy móc không có gì phân biệt câu hỏi có căn cứ với câu hỏi
// nghe hợp lý mà bịa. Đây là cách đã dùng cho 120 câu hỏi bài đọc VOA ở việc 5.3
// (trường `why` dẫn nguyên văn), áp lại ở đây.
//
// `dan` cũng hiện ra cho người học SAU KHI chọn, để họ tự kiểm lại chứ không
// phải tin lời chấm.
//
// ══ PHẠM VI ĐỢT NÀY ══
// 38 chặng bậc **B1** — theo đúng tiêu chí N5 đã ghi trong bảng kế hoạch:
// "đọc hiểu theo VĂN BẢN ở mọi chặng ≥B1" = 122 chặng (B1 38 · B2 38 · C1 46).
// Bánh cóc trong test chỉ ghim con số ĐANG CÓ, không ghim 122 khi chưa soạn đủ.
//
// Hình dạng: { q, options, answer, dan }. KHÔNG có trường `en` — bài đọc đã nằm
// ngay phía trên rồi; chép một câu vào ô trích dẫn là quay về hỏi câu lẻ. Không
// có `en` cũng là thứ chặn câu mức văn bản lọt sang phần NGHE (xem
// `src/utils/comprehension.js`).
//
// Thứ tự lựa chọn hiện ra được XÁO trong mã, không phụ thuộc `answer` ở đây.
//
// ══ THIÊN LỆCH ĐỘ DÀI: ĐÃ ĐO, ĐÃ SỬA ══
// Bản soạn đầu có **84,3% câu mà đáp án đúng là lựa chọn DÀI NHẤT** (không thiên
// lệch thì phải quanh 25%). Người học không đọc bài, cứ chọn phương án dài nhất,
// vẫn đúng ~84%. Nguyên nhân là thói quen soạn: viết đáp án đúng thành mệnh đề
// đầy đủ bám sát câu `dan`, rồi thêm ba câu nhiễu ngắn gọn.
//
// Đây CÙNG LOẠI với lỗi "đáp án nằm lì ở ô đầu" — một dấu hiệu bề ngoài cho phép
// đoán đúng mà không cần hiểu bài. Khác ở chỗ lỗi kia sửa được bằng mã (xáo lựa
// chọn), còn lỗi này phải sửa bằng công soạn.
//
// Đã soạn lại toàn bộ câu nhiễu của cả ba bậc: mỗi lựa chọn là một mệnh đề đầy
// đủ, độ dài xấp xỉ nhau, dựng từ chi tiết CÓ THẬT trong bài nhưng ghép sai —
// nên câu nhiễu vừa dài tương đương vừa đáng tin hơn trước.
//
// Kết quả đo: "dài hơn thấy được (≥10%)" **57,2% → 6,0%**; không còn câu nào
// lệch quá 40%. Con số "dài nhất duy nhất" còn 51,0%, nhưng 45% tổng số câu nằm
// trong dải 0–10% với **chênh lệch trung vị 3 ký tự, tối đa 6** trên lựa chọn dài
// khoảng 60 ký tự — dưới một từ, không đọc ra được bằng mắt. Con số đó được ĐO
// chứ không phải khẳng định suông.
// Đo lại: `node scripts/audit_story_quiz.mjs`. Bánh cóc ở
// `tests/story_quiz.test.js` ghim cả hai con số, chỉ được giảm.
//
// ══ MỘT CHẶNG SÁT RANH GIỚI, CÂN NHẮC RỒI GIỮ ══
// `success-mindset-100` (C1) cũng là bài kiểu danh sách như chặng đã loại bên
// dưới, nhưng dài 108 từ với khoảng mười câu, nên tìm được BỐN câu neo khác
// nhau — mỗi câu hỏi bám một mệnh đề riêng, không phải bốn lần hỏi lại cùng một
// danh sách. Vì thế giữ. Ghi ra đây để người đọc sau thấy cả hai phán đoán, chứ
// không chỉ thấy cái đi theo hướng loại bỏ.

// ĐỢT A1 (17/08) — 47 chặng · 188 câu. Xem đầu storyQuizA1.js để biết bậc A1
// khác ba bậc kia ở chỗ nào: bài A1 phần lớn là VĂN MIÊU TẢ chứ không phải truyện
// kể, nên ở đó "dấu hiệu bề ngoài cho phép đoán đúng" xuất hiện dưới dạng thứ ba
// và khó thấy nhất — CÂU HỎI TRẢ LỜI ĐƯỢC BẰNG KIẾN THỨC CHUNG. Mọi câu ở bậc đó
// phải neo vào một chi tiết riêng của chính bài.
//
// ĐỢT A2 (17/08) — thêm 46 chặng · 184 câu. Hết: 93/93 chặng A1/A2 đủ điều kiện
// đều có câu hỏi, nên bánh cóc A1/A2 nay là 0 và thành ĐÒI HỎI THẬT.
//
// Thiên lệch độ dài qua hai đợt: dài-nhất 51,0% → 43,5% → 39,8%; thấy-được
// 6,0% → 4,3% → 3,5%; ngắn-nhất 16,5% → 26,8% (kỳ vọng không thiên lệch ~25%).
// Đợt A1 bánh cóc thấy-được ĐÃ BẮN một lần (6,0% → 6,3% khi soạn xong 30 chặng
// đầu) — sửa 9 câu nhiễu cho dài tương đương rồi đo lại, KHÔNG nới mốc. Đợt A2
// khớp độ dài ngay từ lúc soạn nên chỉ phải sửa 3 câu.
import { STORY_QUIZ_A1 } from './storyQuizA1.js';
import { STORY_QUIZ_A2 } from './storyQuizA2.js';
import { STORY_QUIZ_B1 } from './storyQuizB1.js';
import { STORY_QUIZ_B2 } from './storyQuizB2.js';
import { STORY_QUIZ_C1 } from './storyQuizC1.js';

export const STORY_QUIZ = {
  ...STORY_QUIZ_A1,
  ...STORY_QUIZ_A2,
  ...STORY_QUIZ_B1,
  ...STORY_QUIZ_B2,
  ...STORY_QUIZ_C1,

  // ════════════════════════════════════════════════════════════════════════
  // BẬC B2 — 37/38 chặng.
  //
  // ⚠️ CHẶNG BỊ LOẠI CÓ LÝ DO: `digital-society-100` (🌐 Xã Hội Số & Quyền
  // Riêng Tư). Bài đọc của nó chỉ **60 từ / 3 câu**, và cả ba câu đều là danh
  // sách thuật ngữ nối nhau ("Users should control their password settings,
  // enable firewalls, backup data…"). Bốn câu hỏi mức VĂN BẢN rút từ đó sẽ
  // chỉ là bốn lần hỏi lại cùng một danh sách — tức là hỏi từ vựng, đúng thứ
  // việc này đang thay thế. Soạn 3 câu cũng không được: dưới 4 câu thì panel
  // TỰ BIẾN MẤT chứ không báo gì.
  //
  // Nên: BÁO chứ không độn. Chặng này sẽ hiện đúng dòng cảnh báo "chưa có câu
  // hỏi về bài đọc" như 192 chặng còn lại. Muốn nó có câu hỏi mức văn bản thì
  // phải viết lại bài đọc cho dài ra — đó là soạn nội dung mới, cần bạn duyệt.
  // ════════════════════════════════════════════════════════════════════════

  // ════════════════════════════════════════════════════════════════════════
  // BẬC C1 — 46/46 chặng. Đủ tiêu chí N5: 121/122 chặng ≥B1.
  // ════════════════════════════════════════════════════════════════════════

};

export default STORY_QUIZ;
