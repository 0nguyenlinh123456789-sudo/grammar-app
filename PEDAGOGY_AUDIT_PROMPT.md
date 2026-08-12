# PROMPT AUDIT SƯ PHẠM — Bunny English

> Cách dùng: mở Claude Code tại thư mục gốc của repo, paste toàn bộ nội dung từ dòng `--- BẮT ĐẦU PROMPT ---` trở xuống.

---

--- BẮT ĐẦU PROMPT ---

## VAI TRÒ

Bạn đóng đồng thời hai vai:

1. **Chuyên gia phương pháp giảng dạy tiếng Anh (TESOL/ngôn ngữ học ứng dụng)**, am hiểu khung CEFR, lý thuyết thụ đắc ngôn ngữ thứ hai (input hypothesis, output hypothesis, noticing hypothesis), thiết kế chương trình cho người học Việt Nam mất gốc.
2. **Senior engineer audit codebase**, chỉ kết luận dựa trên bằng chứng đọc được trong mã nguồn và dữ liệu.

## BỐI CẢNH

Đây là repo của **Bunny English** — web học tiếng Anh cho người Việt, định vị "luyện Ngữ pháp & Từ vựng theo phương pháp gamification (Duolingo-style) + Gemini AI".

## CÂU HỎI CẦN TRẢ LỜI

Trả lời dứt khoát 2 câu hỏi sau, mỗi câu bắt đầu bằng **CÓ / CHƯA / MỘT PHẦN**, kèm bằng chứng:

- **Q1.** Một người Việt **mất gốc hoàn toàn (A0)** học hết toàn bộ nội dung hiện có trên web này, có đạt được **thành thạo cả 4 kỹ năng** (Nghe – Nói – Đọc – Viết) ở mức giao tiếp độc lập (CEFR B1) không?
- **Q2.** Web đã có **lộ trình học rõ ràng** chưa? (rõ ràng = có điểm xuất phát xác định, các chặng có mục tiêu đo được, thứ tự phụ thuộc hợp lý, có đánh giá đầu ra)

## NGUYÊN TẮC BẮT BUỘC

1. **Chỉ được kết luận từ bằng chứng trong repo.** Mỗi nhận định phải kèm `đường_dẫn/file.tsx:dòng` hoặc tên biến/hàm/khóa dữ liệu cụ thể.
2. **Không suy đoán từ tên file.** File tên `ListeningLesson.tsx` không chứng minh có kỹ năng Nghe — phải mở ra xem có audio thật, có bài tập thật, có dữ liệu thật hay chỉ là vỏ rỗng / placeholder / TODO.
3. Nếu không tìm thấy bằng chứng, ghi rõ **"KHÔNG TÌM THẤY BẰNG CHỨNG"** — tuyệt đối không đoán và không cho điểm khống.
4. **Phân biệt rõ 3 trạng thái**: `Đã triển khai & có dữ liệu thật` / `Có UI nhưng dữ liệu rỗng hoặc mock` / `Không tồn tại`.
5. **KHÔNG sửa bất kỳ file mã nguồn nào** trong lần chạy này. Đây là audit chỉ-đọc. Sản phẩm duy nhất được ghi ra là một file báo cáo.
6. Ưu tiên đọc **dữ liệu nội dung** (JSON/TS constants/DB seed/CMS) hơn là đọc component UI — nội dung mới là thứ quyết định giá trị sư phạm.

## PHƯƠNG PHÁP — thực hiện tuần tự 5 giai đoạn

### Giai đoạn 1 — Lập bản đồ codebase

- Liệt kê cấu trúc thư mục, stack, cách lưu trữ nội dung (hard-code / JSON / database / generate bằng AI runtime).
- Xác định **mô hình dữ liệu bài học**: một "bài học" gồm những trường gì? Có trường `level`, `skill`, `cefr`, `prerequisite`, `order` không?
- Tìm mọi nơi gọi Gemini API: liệt kê **từng prompt** đang gửi cho AI và mục đích của nó.

### Giai đoạn 2 — Kiểm kê nội dung định lượng

Đếm số thật, không ước lượng. Nếu không đếm được thì ghi rõ lý do.

| Chỉ số | Cần đếm |
|---|---|
| Tổng số bài học | theo từng cấp độ/chủ đề |
| Tổng số mục từ vựng | có bao nhiêu từ có audio? có IPA? có ví dụ trong câu? |
| Tổng số điểm ngữ pháp | trải rộng đến đâu (thì, câu điều kiện, bị động, mệnh đề quan hệ...) |
| Tổng số câu hỏi/bài tập | phân loại theo **dạng** bên dưới |
| Tổng số file/nguồn audio | TTS runtime hay file tĩnh? |
| Tổng số bài đọc dài > 100 từ | |
| Tổng số bài viết tự do có chấm | |

Phân loại toàn bộ bài tập theo dạng và đếm tỉ lệ %:
`trắc nghiệm` · `điền vào chỗ trống` · `sắp xếp từ thành câu` · `nối cặp` · `flashcard` · `nghe chép chính tả` · `ghi âm nói` · `viết tự do có feedback` · `khác`

> Cảnh báo cần nêu nếu 3 dạng đầu chiếm > 80%: đây là dấu hiệu của **recognition-only learning** — người học nhận diện được đáp án đúng khi nhìn thấy nó, nhưng không tự sản sinh được ngôn ngữ.

### Giai đoạn 3 — Chấm điểm 4 kỹ năng

Với **mỗi** kỹ năng, chấm theo thang 0–5 và **phải trích dẫn file làm bằng chứng**:

**NGHE**
- Có audio gắn với từ vựng/câu không? Nguồn từ đâu (Web Speech API, file mp3, TTS server)?
- Có bài nghe hiểu dài hơn một câu không?
- Có bài tập nghe-chép (dictation) không?
- Có luyện nối âm / nuốt âm / dạng rút gọn (connected speech) không?
- Có điều chỉnh tốc độ, nghe lại từng đoạn không?
- *Gợi ý tìm kiếm:* `Audio`, `speechSynthesis`, `.mp3`, `tts`, `playback`, `dictation`, `transcript`

**NÓI**
- Có chức năng ghi âm giọng người học không? (`MediaRecorder`, `getUserMedia`, `SpeechRecognition`, `webkitSpeechRecognition`)
- Có chấm/phản hồi phát âm không? Chấm ở mức âm vị, từ, hay chỉ so khớp chuỗi văn bản?
- Có hội thoại nhập vai (role-play) với AI không?
- Có luyện shadowing không?
- **Nếu không tìm thấy: kỹ năng Nói = 0/5. Ghi rõ đây là lỗ hổng nghiêm trọng nhất.**

**ĐỌC**
- Có văn bản đọc hiểu hoàn chỉnh không, hay chỉ có câu rời rạc?
- Bài đọc có phân cấp độ khó không (độ dài, tỉ lệ từ ngoài danh sách 1000 từ phổ biến)?
- Có câu hỏi đọc hiểu suy luận, hay chỉ hỏi chi tiết bề mặt?

**VIẾT**
- Người học có bao giờ phải tự gõ ra một câu/đoạn do mình nghĩ ra không? (khác với điền từ vào chỗ trống)
- Có chấm bài viết bằng Gemini không? Nếu có, đọc prompt: nó chấm theo tiêu chí gì, hay chỉ trả lời "đúng/sai"?
- Có tiến trình câu → đoạn → bài không?

**Kiểm tra bắt buộc riêng — PHÁT ÂM & PHONICS (nền tảng cho người mất gốc):**
- Có module dạy 44 âm IPA / nguyên âm - phụ âm / trọng âm từ / ngữ điệu không?
- Từ vựng có hiển thị phiên âm IPA không?
- Người học có **bắt buộc nghe trước khi thấy mặt chữ** không?
- *Nếu không có phần này, nêu rõ hệ quả:* người học sẽ mã hóa từ vựng bằng âm Việt hóa, dẫn tới nghe không nhận ra từ đã thuộc và nói ra người bản xứ không hiểu — lỗi cấu trúc rất tốn công sửa về sau.

### Giai đoạn 4 — Chấm điểm lộ trình học

Kiểm tra sự tồn tại thật của từng hạng mục (có / không / một phần + bằng chứng):

1. **Bài test xếp lớp đầu vào** — hay mọi người dùng đều bắt đầu từ bài 1?
2. **Ánh xạ CEFR** — nội dung có gắn nhãn A1/A2/B1 ở đâu trong dữ liệu không? Tìm `cefr`, `level`, `difficulty`.
3. **Mục tiêu dạng can-do** — mô tả mục tiêu theo năng lực ("tự giới thiệu bản thân trong 2 phút") hay theo khối lượng ("hoàn thành 50 bài")?
4. **Thứ tự phụ thuộc (prerequisite)** — có ràng buộc phải xong A mới mở B không, hay unlock tuyến tính cứng / mở tự do hết?
5. **Ôn tập giãn cách (spaced repetition)** — tìm `SM-2`, `interval`, `easeFactor`, `nextReview`, `reviewQueue`. Có thuật toán thật hay chỉ là random lại câu cũ?
6. **Đánh giá định kỳ** — có bài kiểm tra cuối chặng quyết định lên cấp không?
7. **Ước lượng thời lượng** — có nói cho người học biết cần bao nhiêu giờ để lên trình không?
8. **Chỉ báo tiến độ theo năng lực** — thanh tiến độ đang đo "% bài đã làm" hay "năng lực đã đạt"?

**Kiểm tra riêng về gamification:** đọc logic streak/XP/điểm. Trả lời: hệ thống này thưởng cho *hành vi vào app hằng ngày* hay thưởng cho *học có chất lượng*? Người dùng có thể giữ streak bằng cách làm 2 phút bài siêu dễ không? Nếu có, nêu rõ đây là rủi ro tối ưu hóa sai mục tiêu.

### Giai đoạn 5 — Kết luận & khuyến nghị

- Trả lời Q1 và Q2 dứt khoát.
- Ước lượng: nội dung hiện có tương đương bao nhiêu **giờ học thực chất**, và đưa người mất gốc lên tới **mốc CEFR nào**. Đối chiếu tham chiếu: mỗi bậc CEFR cần khoảng 180–200 giờ; A0 → B1 cần khoảng 400–600 giờ.
- Chỉ rõ **khoảng cách giữa lời hứa marketing và năng lực thực tế** của sản phẩm.

## ĐỊNH DẠNG BÁO CÁO ĐẦU RA

Ghi ra file `AUDIT_SU_PHAM.md` ở thư mục gốc, theo đúng bố cục sau:

```
# BÁO CÁO AUDIT SƯ PHẠM — Bunny English
Ngày: <ngày>   |   Commit: <hash>

## 0. TÓM TẮT ĐIỀU HÀNH
- Trả lời Q1: <CÓ/CHƯA/MỘT PHẦN> — 3 câu giải thích
- Trả lời Q2: <CÓ/CHƯA/MỘT PHẦN> — 3 câu giải thích
- Cấp độ CEFR trần mà web hiện đưa người học tới: <A1/A2/B1...>
- 3 lỗ hổng nghiêm trọng nhất

## 1. BẢN ĐỒ CODEBASE
## 2. KIỂM KÊ NỘI DUNG (bảng số liệu)
## 3. ĐIỂM 4 KỸ NĂNG
| Kỹ năng | Điểm /5 | Trạng thái | Bằng chứng (file:dòng) | Thiếu gì |
(+ mục riêng: Phát âm & Phonics)

## 4. ĐIỂM LỘ TRÌNH HỌC
| Hạng mục | Có/Không | Bằng chứng | Ghi chú |

## 5. PHÂN TÍCH GAMIFICATION

## 6. DANH SÁCH VIỆC CẦN LÀM (ưu tiên)
Bảng: | # | Hạng mục | Tác động sư phạm (Cao/TB/Thấp) | Công sức (S/M/L) | File cần đụng tới |
Sắp xếp theo tỉ lệ tác động/công sức giảm dần. Tối đa 12 mục.

## 7. HAI HƯỚNG ĐI
- Hướng A — Mở rộng thành nền tảng 4 kỹ năng: cần thêm những gì, ước lượng khối lượng.
- Hướng B — Giữ nguyên phạm vi, chỉnh lại định vị thành "nền tảng ngữ pháp & từ vựng cho người mất gốc": cần sửa những câu chữ nào ở đâu.

## 8. NHỮNG GÌ KHÔNG KIỂM TRA ĐƯỢC
(liệt kê trung thực các phần không truy cập được: dữ liệu nằm trên server, nội dung sinh runtime bằng AI, v.v.)
```

## YÊU CẦU VỀ GIỌNG ĐIỆU

Thẳng thắn, không xã giao. Nếu sản phẩm còn thiếu nhiều, nói rõ là thiếu nhiều. Đừng làm nhẹ vấn đề bằng cách khen phần dễ khen trước. Mục tiêu của tôi là biết sự thật để sửa, không phải để được động viên.

--- KẾT THÚC PROMPT ---

---

## PROMPT NỐI TIẾP (chạy sau khi đã có báo cáo)

Chỉ dùng khi bạn đã đọc `AUDIT_SU_PHAM.md` và đồng ý với kết luận:

> Dựa trên `AUDIT_SU_PHAM.md`, hãy thiết kế **kế hoạch triển khai chi tiết cho 3 hạng mục có tỉ lệ tác động/công sức cao nhất** ở mục 6. Với mỗi hạng mục: mô tả thay đổi mô hình dữ liệu, danh sách file cần tạo/sửa, prompt Gemini cụ thể nếu có dùng AI, và tiêu chí nghiệm thu đo được. Chưa viết code — chỉ lập kế hoạch để tôi duyệt trước.

## MẸO KHI CHẠY

- Chạy prompt này ở **chế độ plan mode** (`Shift+Tab` trong Claude Code) để chắc chắn nó không sửa code.
- Nếu repo lớn, thêm câu: *"Nếu context sắp đầy, hãy hoàn tất Giai đoạn 1–3 trước, ghi ra file, rồi báo tôi để chạy tiếp Giai đoạn 4–5."*
- Nội dung bài học nếu nằm ở database/CMS ngoài repo thì Claude Code không thấy được — hãy export ra JSON đặt vào repo trước khi audit, hoặc chấp nhận phần đó nằm ở mục 8.
