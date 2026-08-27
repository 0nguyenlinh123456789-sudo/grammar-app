# ĐỘ PHỦ VỐN TỪ B2 — đo ngày 27/08/2026

Chủ dự án cung cấp *The Oxford 5000™ by CEFR level* (Oxford University Press)
làm bảng đối chiếu. Báo cáo này trả lời đúng một câu hỏi: **người học đi hết
web có gặp đủ vốn từ dải B2 không?**

## ⚠️ Vì sao trong repo KHÔNG có file danh sách Oxford

Oxford 5000 là **tuyển tập có bản quyền của OUP** — cái được bảo hộ không phải
từng từ tiếng Anh, mà là việc *chọn và xếp bậc* chúng. Chép nguyên dải B2 vào
`src/data/` là tái bản tuyển tập đó, và sinh hàng trăm mục từ vựng từ nó là
đúng loại nội dung sinh theo khuôn mà luật GIỮ/XÓA của dự án bảo phải xóa.

Nên bảng đối chiếu chỉ tồn tại trong thư mục nháp ngoài repo. Thứ đi vào repo
là **con số và một mẫu có giới hạn** — đủ để làm việc, không phải bản sao.

## Kết quả

Đối chiếu **700 từ** dải B2 với **6.971 từ** app đang dạy (6.619 từ chủ đề
+ 260 unit Oxford):

| | Số từ | Tỷ lệ | Nghĩa là gì |
|---|---:|---:|---|
| **Dạy hẳn thành từ khoá** | 378 | 54,0% | có mục từ riêng, có nghĩa, có luyện |
| **Có gặp nhưng không dạy** | 262 | 37,4% | nằm trong câu ví dụ / bài đọc, người học đọc lướt qua chứ không được dạy |
| **Vắng hẳn** | 60 | 8,6% | cả web không xuất hiện một lần nào |

**Diễn giải thẳng:** cam kết "mất gốc → B2 vững" hiện đúng ở mức **91,4% dải
B2 có xuất hiện**, nhưng chỉ **54% được dạy tử tế**. Khoảng 262 từ ở nhóm giữa
là chỗ yếu thật: người học *nhìn thấy* chúng trong bài đọc mà không được dạy
nghĩa, không được luyện, nên gặp lại trong đề thi vẫn không nhận ra.

## 60 từ vắng hẳn — đây là danh sách việc

adequate · adequately · altogether · amusing · anticipate · appropriately ·
aside · astonishing · awkward · badge · bound · collector · colourful ·
comprise · conspiracy · consultant · convention · dare · dealer ·
disappointment · dive · equip · evident · extension · fool · fulfil · gay ·
gig · graphics · hilarious · hook · inevitably · ink · inspector · interval ·
nasty · outfit · ownership · punk · questionnaire · reasonably · reckon ·
remarkably · scenario · settler · sexy · short-term · significance · skull ·
somehow · spoil · sporting · stance · suspend · tag · terribly · ton · tonne ·
undertake · unfold

## Việc còn lại là VIỆC SOẠN TAY, không phải việc của máy

Đóng khoảng trống này nghĩa là soạn mục từ mới: nghĩa tiếng Việt, câu ví dụ
thật, bài luyện. Đó là việc người viết, không phải việc sinh tự động — sinh
hàng loạt sẽ ra đúng thứ nội dung khuôn mẫu mà dự án đã mất một đợt để dọn.

Thứ tự nên làm:
1. **60 từ vắng hẳn** — mỗi từ một mục, ưu tiên từ học thuật hay gặp
   (`anticipate`, `comprise`, `evident`, `scenario`, `significance`,
   `undertake`, `stance`, `adequate`).
2. **262 từ đã có mặt trong bài đọc** — rẻ hơn nhiều, vì câu ví dụ đã có sẵn
   trong kho; chỉ cần nâng chúng thành mục từ có nghĩa và có luyện.
3. Vài từ trong danh sách **không hợp với web dạy tiếng Anh phổ thông cho
   người Việt** (`gay`, `sexy`, `punk`, `conspiracy`) — bỏ qua là quyết định
   hợp lý, và bỏ có chủ đích thì không phải là thiếu.

## Cách đo lại

Script đo nằm ngoài repo (thư mục nháp phiên làm việc):
`do_phu_b2.mjs` (đối chiếu từ khoá) và `do_sau2.mjs` (tách "vắng hẳn" khỏi
"có gặp mà không dạy").

⚠️ Bản đầu của `do_sau2.mjs` viết bằng heredoc trong shell và báo *"0/322 từ
xuất hiện ở đâu đó"* — vô lý với 13,9 triệu ký tự tiếng Anh. Nguyên nhân: lớp
escape của shell **nuốt dấu gạch chéo ngược**, nên `\b` (ranh giới từ) thành
chữ `b` và mọi phép thử đều trượt. Script nay có **phép thử mồi**: đo một từ
chắc chắn có mặt trước, trượt thì dừng hẳn thay vì in ra một con số sai trông
rất thuyết phục.
