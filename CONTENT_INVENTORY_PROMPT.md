# PROMPT KIỂM KÊ NỘI DUNG — để lập bản đồ khoảng trống

> Mục đích: tạo ra một file duy nhất mô tả đầy đủ web đang có gì, đủ nhỏ để chia sẻ, đủ chi tiết để phân tích.
> Chế độ: **Plan** hoặc **Manual**. Chỉ tạo đúng một file, không sửa code.

---

--- BẮT ĐẦU PROMPT ---

## NHIỆM VỤ

Lập bản kiểm kê đầy đủ mọi thứ dự án này đang có, ghi ra file `NOI_DUNG_HIEN_CO.md` ở thư mục gốc. File này sẽ được gửi cho một chuyên gia sư phạm bên ngoài — người đó **không có quyền truy cập repo**, chỉ đọc được đúng file này. Vì vậy file phải tự đứng vững một mình.

## RÀNG BUỘC VỀ KÍCH THƯỚC (quan trọng nhất)

- File tổng cộng **không quá 1.500 dòng**.
- **Tuyệt đối không dump toàn bộ dữ liệu.** Không copy 22.204 mục luyện tập (6.618 từ duy nhất), không copy 267 bài đọc.
- Nguyên tắc: **cấu trúc + số liệu tổng hợp + mẫu đại diện**. Với mỗi loại nội dung, lấy tối đa 10 mẫu (3 mẫu dễ nhất, 4 mẫu giữa, 3 mẫu khó nhất) để người đọc đánh giá được chất lượng thật.
- Nếu một phần quá dài, tóm tắt và ghi rõ đã tóm tắt, đừng cắt cụt giữa chừng.

## NGUYÊN TẮC

- Chỉ ghi những gì kiểm chứng được trong code và dữ liệu. Không suy đoán từ tên file.
- Mỗi số liệu phải là **số đếm thật**, không ước lượng. Nếu không đếm được, ghi rõ lý do.
- Phân biệt rõ: **đang chạy trên production** / **có code nhưng bị ẩn hoặc chỉ chạy localhost** / **dữ liệu rỗng hoặc mock**.
- Không sửa bất kỳ file mã nguồn nào.

## NỘI DUNG FILE — theo đúng 9 mục sau

### MỤC 1 — BẢN ĐỒ TÍNH NĂNG

Bảng mọi route/màn hình người dùng có thể vào:

| Route | Tên hiển thị | Mục đích | Trạng thái | File chính |
|---|---|---|---|---|

Trạng thái ghi một trong: `Live` / `Ẩn trên production` / `Chỉ localhost` / `Code chết, không ai gọi`.

Sau bảng, mô tả **3 luồng người dùng chính** bằng lời: một người mới vào web lần đầu sẽ thấy gì, bấm gì, đi đâu.

### MỤC 2 — MÔ HÌNH DỮ LIỆU

Với **mỗi loại nội dung** (từ vựng, bài đọc, chuyên đề ngữ pháp, bài tập, unit Oxford, v.v.):

- Nguồn lưu ở đâu (file nào, hay database, hay sinh runtime)
- **Schema đầy đủ**: liệt kê mọi trường, kiểu dữ liệu, và trường nào bắt buộc/tùy chọn
- **1 bản ghi mẫu hoàn chỉnh** dạng JSON
- Tỉ lệ điền đầy: mỗi trường có bao nhiêu % bản ghi thực sự có giá trị (ví dụ: `ipa` có ở 92% từ, `exampleSentence` có ở 40%)

Trường hợp cuối này rất quan trọng — một trường tồn tại trong schema nhưng rỗng ở 70% bản ghi thì coi như không có.

### MỤC 3 — SỐ LƯỢNG THẬT

Bảng đếm chính xác:

| Loại nội dung | Tổng số | Chia theo cấp độ | Ghi chú chất lượng |
|---|---|---|---|

Bắt buộc phải có: số từ vựng, số từ có IPA, số từ có câu ví dụ, số từ có audio; số bài đọc và tổng số từ trung bình mỗi bài; số chuyên đề ngữ pháp; tổng số câu hỏi/bài tập.

**Ghi rõ số item bị hỏng** đã phát hiện trước đây (726 item kéo-thả lỗi, 216 đáp án `context synonym`) — đã sửa chưa hay vẫn còn.

### MỤC 4 — MA TRẬN ĐỘ PHỦ (phần giá trị nhất)

Bảng chéo: **cấp độ CEFR × loại nội dung**. Mỗi ô ghi số item thật.

|  | Từ vựng | Bài đọc | Ngữ pháp | Bài nghe | Bài nói | Bài viết |
|---|---|---|---|---|---|---|
| Pre-A1 |  |  |  |  |  |  |
| A1 |  |  |  |  |  |  |
| A2 |  |  |  |  |  |  |
| B1 |  |  |  |  |  |  |
| B2 |  |  |  |  |  |  |
| C1 |  |  |  |  |  |  |
| C2 |  |  |  |  |  |  |

Nếu dữ liệu **không có trường cấp độ** để phân loại, đừng bịa — ghi `KHÔNG PHÂN LOẠI ĐƯỢC` vào ô đó và giải thích ở dưới bảng. Bản thân việc không phân loại được đã là một phát hiện quan trọng.

### MỤC 5 — CƠ CHẾ HỌC ĐANG CÓ

Với mỗi cơ chế (SRS Leitner, error bank, placement test, QuizEngine, streak/XP, thú cưng, danh hiệu...):

- Mô tả ngắn nó làm gì
- **Nó đọc dữ liệu từ đâu và ghi kết quả đi đâu**
- **Có module nào khác dùng kết quả của nó không?** Nếu không ai dùng, ghi `KẾT QUẢ BỊ BỎ RƠI`
- File và dòng cụ thể

Mục này để lộ ra chỗ "có máy nhưng không nối hộp số".

### MỤC 6 — SƠ ĐỒ PHỤ THUỘC

Vẽ bằng text: module nào đọc file dữ liệu nào. Định dạng đơn giản:

```
roadmapData.js  →  được import bởi: RoadmapPage.jsx, HomeWidget.jsx
LEVELS (const)  →  KHÔNG AI IMPORT
vocab.json      →  VocabPage.jsx, SRSEngine.js, QuizEngine.jsx
```

Liệt kê riêng danh sách **dữ liệu mồ côi**: file dữ liệu tồn tại nhưng không module nào đọc.

### MỤC 7 — ĐIỂM CHẠM AI

Mọi nơi gọi Gemini hoặc AI khác:

- Vị trí file
- **Trích nguyên văn prompt** đang gửi
- Đầu ra dùng để làm gì
- Có xử lý lỗi và giới hạn hạn mức không

### MỤC 8 — TÀI SẢN ÂM THANH / HÌNH ẢNH

- Có bao nhiêu file audio/video, tổng dung lượng
- File nào **thực sự được ship lên production**, file nào bị gitignore/vercelignore
- Audio đang là TTS runtime hay file tĩnh
- Có manifest nào tham chiếu tới file không tồn tại trên production không

### MỤC 9 — 4 KỸ NĂNG: TRẠNG THÁI THẲNG THẮN

Với mỗi kỹ năng Nghe / Nói / Đọc / Viết, trả lời đúng 3 câu:

1. Người học có được luyện kỹ năng này không, ở màn hình nào?
2. Cơ chế đánh giá là gì (mô tả kỹ thuật cụ thể, không nói chung chung)?
3. Có bao nhiêu item nội dung phục vụ kỹ năng này?

Nếu câu trả lời là không có, ghi `KHÔNG TỒN TẠI` — đừng cố tìm cái gì đó gần giống để lấp chỗ trống.

Thêm mục con **PHÁT ÂM**: có module dạy âm vị/phonics không, và IPA hiện có được dùng vào việc gì ngoài hiển thị.

## KẾT THÚC FILE

Thêm mục **"NHỮNG GÌ TÔI KHÔNG KIỂM TRA ĐƯỢC"**: liệt kê trung thực phần nào nằm ngoài repo (database, nội dung sinh runtime, file bị ignore) nên không kiểm kê được.

--- KẾT THÚC PROMPT ---

---

## SAU KHI CÓ FILE

Gửi `NOI_DUNG_HIEN_CO.md` cho chuyên gia. Nếu file vượt quá dung lượng cho phép, ưu tiên giữ **Mục 3, 4, 5, 9** — đó là bốn mục quyết định.

## PHƯƠNG ÁN NHẸ (nếu không muốn chạy Claude Code)

Gửi thay bằng:
1. Ảnh chụp menu chính / trang chủ
2. Ảnh chụp trang lộ trình
3. Ảnh chụp **một bài học của mỗi loại** (từ vựng, ngữ pháp, đọc, quiz)
4. Nội dung file schema dữ liệu (chỉ phần định nghĩa trường, không cần dữ liệu)
5. Cây thư mục `src/` (chạy `tree src -L 3` hoặc chụp màn hình Explorer)

Cách này kém chính xác hơn nhưng vẫn đủ để phác thảo bản đồ khoảng trống.
