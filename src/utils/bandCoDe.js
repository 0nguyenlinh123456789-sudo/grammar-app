// File: src/utils/bandCoDe.js
// BẬC NÀO CÓ ĐỀ VIẾT / ĐỀ NÓI — chỉ hai tập chuỗi, không kèm dữ liệu.
//
// VÌ SAO KHÔNG HỎI THẲNG KHO ĐỀ: trang chủ cần biết "chặng này có nút VIẾT/NÓI
// không" cho từng thẻ chặng. Import `writingBank`/`speakingBank` vào đó là kéo
// ~305 KB dữ liệu đề vào chunk mà AI MỞ APP CŨNG PHẢI TẢI — đúng cái đã đo
// được ở việc 3.3 (chunk trang chủ 743 → 911 KB) và đã phải tách ra.
//
// CÁI GIÁ CỦA VIỆC CHÉP LUẬT RA ĐÂY: nó có thể lệch với bộ sinh. Nên
// `tests/band_co_de.test.js` đối chiếu hai tập này với KHO ĐỀ THẬT theo cả hai
// chiều — bậc nào khai là có thì phải thật sự có đề, và ngược lại.
//
// Và vì "khai theo bậc" không chính xác tuyệt đối (vài chặng lẻ không có đề,
// ví dụ Oxford Unit 26 dạy hậu tố `-ful/-less/-ness` nên không đặt được đề
// dùng-từ), panel phải BÁO RA khi chặng được mở không có đề — không được lặng
// lẽ rơi về danh sách và đưa đề của chặng khác.

/** A2 trở lên (việc 3.3). A0/A1 cố ý không có đề viết. */
export const COD_DE_VIET = new Set(['elementary', 'intermediate', 'upper_intermediate', 'advanced']);

/** B1 trở lên (việc 3.5). A0–A2 dùng mục đọc to từng từ. */
export const COD_DE_NOI = new Set(['intermediate', 'upper_intermediate', 'advanced']);
