# WEB HIỆN TẠI CÓ ĐỦ ĐỂ MỘT NGƯỜI MẤT GỐC HỌC LÊN C2 KHÔNG?

> Rà soát 2026-08-14. **Không tính cụm IELTS Nền Tảng** (chạy local, không đụng tới).
> Mọi số trong phần "ĐO ĐƯỢC" đều lấy từ dữ liệu thật trong repo, sau lớp lọc runtime.

## TRẢ LỜI NGẮN

**Chưa.** Không phải vì nội dung kém — phần đã có là thật và đã được dọn sạch trong chuỗi vừa rồi — mà vì **thiếu khối lượng và thiếu hẳn ba cơ chế** mà mọi lộ trình lên C1/C2 đều bắt buộc phải có: đầu vào nghe thật, sản sinh có người/máy chấm, và bài kiểm tra đủ sức phân biệt B2 với C1.

Ước lượng thẳng thắn: **web hiện tại đưa được một người mất gốc lên khoảng A2, gắng thì chạm B1** ở kỹ năng đọc–từ vựng–ngữ pháp. Nghe/nói/viết thì chưa đủ để tuyên bố mức nào cả.

---

## PHẦN 1 — ĐO ĐƯỢC (số thật từ repo)

### 1.1 Nội dung

| Hạng mục | Số đo | Ghi chú |
|---|---|---|
| Chủ đề từ vựng | 267 | sau khử trùng id |
| Ô từ (cộng dồn) | 22.008 | |
| **Từ duy nhất (dạng chữ)** | **6.620** | 69,9% ô từ là bản trùng giữa các chủ đề |
| Ước lượng họ từ | ~6.400 | gộp đuôi đơn giản, chỉ để tham khảo |
| Chủ đề ngữ pháp | 78 | B1=28 · B2=25 · C1/C2=25 |
| Câu bài tập ngữ pháp | 1.031 | TB 13,2 câu/chủ đề |
| Mục lý thuyết ngữ pháp | 306 | |
| Unit Oxford | 260 | Elementary 60 · Pre-Int 100 · Advanced 100 |
| Bài đọc (`storyEn`) | 267/267 | dài trung vị 193 từ, tối đa 745 |

### 1.2 Độ dày luyện tập Oxford (sau lớp lọc)

| Sách | Unit | quiz | gõ từ | kéo thả | bài tập sách | **TB câu/unit** |
|---|---|---|---|---|---|---|
| Elementary | 60 | 1.176 | 1.200 | 1.800 | 667 | **80,7** |
| Pre-Intermediate | 100 | 1.007 | 811 | 807 | 2.389 | **50,1** |
| **Advanced** | 100 | 200 | 200 | 400 | 1.853 | **26,5** |

Càng lên cao càng mỏng — **ngược hẳn với nhu cầu thật**. Sách Advanced chỉ còn 2 câu quiz/unit sau khi dọn rác máy sinh.

### 1.3 Lộ trình có dẫn người học đi hết kho không? — KHÔNG

| | Tổng có trong kho | Nằm trong 44 chặng | Tỉ lệ |
|---|---|---|---|
| Chủ đề từ vựng | 267 (22.008 ô từ) | 25 (2.351 ô từ) | **9%** |
| Chủ đề ngữ pháp | 78 | 19 | **24%** |
| Unit Oxford | 260 | **0** | **0%** |

**91% kho từ vựng và toàn bộ 260 unit Oxford nằm ngoài đường đi có hướng dẫn** — người học chỉ gặp được nếu tự bấm vào menu tìm. Đây là khoảng cách lớn nhất mà lại **rẻ nhất để vá**: nội dung đã có sẵn, chỉ thiếu việc xếp thứ tự.

Lộ trình tự công bố tổng **~201 giờ** (cộng các dòng "🕐 ~N giờ" trong mô tả chặng), trong đó tầng `advanced` là 15/44 chặng ~80 giờ để phủ toàn bộ khoảng B2→C2.

### 1.4 Bốn kỹ năng — cái gì có thật, cái gì chỉ có tên

| Kỹ năng | Đang có | Có chấm không |
|---|---|---|
| **Đọc** | 267 bài đọc (trung vị 193 từ) + trắc nghiệm nghĩa | ✅ có |
| **Nghe** | `window.speechSynthesis` đọc câu, rồi chọn nghĩa | ✅ có (nhưng xem dưới) |
| **Nói** | Web Speech API nhận diện, so khớp với câu mẫu | ⚠️ so chuỗi, không chấm phát âm |
| **Viết** | Gõ từ theo nghĩa · **1 ô văn bản tự do** có AI chấm (`AiAssistant`) | ⚠️ chỉ ở mục ngữ pháp |

**File âm thanh thật trong `public/` (trừ cụm IELTS Nền Tảng): 0.** Toàn bộ phần nghe dựa vào giọng máy đọc của trình duyệt — giọng đều, không ngắt nghỉ tự nhiên, không giọng vùng miền, không tiếng ồn nền, không hội thoại chồng lời. Đây là đủ cho A1–A2, và **không thể dùng để lên B2 trở lên**.

**Câu hỏi đọc/nghe hiểu soạn tay: 1/267 chủ đề.** 266 chủ đề còn lại sinh câu hỏi tự động từ câu ví dụ lẻ (`buildComprehension`) — tức là kiểm tra hiểu MỘT CÂU, không phải hiểu một văn bản.

Về chất lượng bài đọc: tôi đo được **một** dấu hiệu nhồi từ khoá (từ của chính chủ đề bị viết hoa giữa câu, kiểu *"He made a Booking for a direct flight"*). **27/267 văn bản dính dấu hiệu này**, trong đó 11 văn bản dính trên 10 lần. 240 văn bản còn lại không dính dấu hiệu đó — nhưng **không dính một dấu hiệu không có nghĩa là văn bản tự nhiên**; máy không đo được điều đó, cần người đọc.

> **Cập nhật khi làm việc 3.2 (2026-08-16): con số 27 ở trên SAI, và sai theo cả hai chiều.** Bộ đo viết lại (`scripts/audit_story_caps.mjs`) ra **38 bài / 986 lượt**. Đọc từng chỗ thì **30 bài trong đó viết hoa ĐÚNG** — `Monday`, `January`, `T-shirt`, `Renaissance`, `MRI scan`, `Earth`, `Confucianism`… — nên bản kiểm đầu đã **đếm thừa** những chỗ không phải lỗi, đồng thời **đếm thiếu** vì bỏ sót vài bài. Số thật: **8 bài sai, 888 lượt**, tất cả đã hạ chữ thường. Danh sách 30 bài viết hoa đúng nay kê đích danh theo cặp (chủ đề, dạng chữ) kèm lý do ở `scripts/data/hoa_hop_le.mjs`. Câu cảnh báo cuối đoạn trên **vẫn nguyên giá trị**: 0 lượt dính dấu hiệu không có nghĩa là 267 bài đọc đã tự nhiên.

### 1.5 Đánh giá năng lực

| | Số đo | Vấn đề |
|---|---|---|
| Test đầu vào | **12 câu** (ngữ pháp 5 · từ vựng 4 · đọc 3) | không câu nào gắn nhãn cấp độ → **không phân biệt được B2 với C1** |
| Đề thi thử | **2 đề × 20 câu** | mỗi đề: nghe 5 · ngữ pháp 5 · từ vựng 5 · đọc 5 |

12 câu trắc nghiệm không đủ để xếp lớp cho khoảng A1→C2. Hệ quả trực tiếp: tính năng "làm test đầu vào, app mở thẳng chặng đúng trình độ" (hạng mục #2) chạy tốt ở đáy và **mất tác dụng ở đỉnh**.

### 1.6 Chưa có gì cho người MẤT GỐC thật sự

Tìm khắp kho: **không có chủ đề nào về bảng chữ cái, phát âm, nguyên âm/phụ âm, hay cách đọc IPA.** Người Việt mất gốc mở app lên là gặp ngay danh sách từ kèm phiên âm IPA mà chưa từng được dạy IPA là gì.

---

## PHẦN 2 — MỐC THAM CHIẾU (KHÔNG phải số đo từ repo)

> ⚠️ Phần này lấy từ hiểu biết chung về khung CEFR/Cambridge, **không đo được từ mã nguồn**, và **các nguồn khác nhau cho con số khác nhau**. Dùng làm mốc định hướng, đừng dùng làm cam kết.

| Mốc | Con số tham chiếu (khoảng) |
|---|---|
| Giờ học có hướng dẫn, cộng dồn để đạt **C2** | **~1.000–1.200+ giờ** |
| — trong đó tới B1 | ~350–400 giờ |
| — tới B2 | ~500–600 giờ |
| — tới C1 | ~700–800 giờ |
| Vốn từ (họ từ) cần ở **C1** | ~8.000 |
| Vốn từ (họ từ) cần ở **C2** | ~12.000–16.000 |

### Đặt cạnh nhau

| | Web đang có (đo được) | Mốc C2 (tham chiếu) | Khoảng cách |
|---|---|---|---|
| Giờ học có hướng dẫn | ~201 giờ tự công bố | ~1.000–1.200 giờ | **thiếu ~800–1.000 giờ** |
| Vốn từ | 6.620 từ duy nhất | ~12.000–16.000 họ từ | **thiếu khoảng 2–2,5 lần** |
| Nghe đầu vào thật | 0 file âm thanh | bắt buộc từ B1 trở lên | **thiếu hoàn toàn** |
| Viết có chấm | 1 ô văn bản tự do | bắt buộc từ B1 trở lên | **gần như thiếu** |
| Test phân loại | 12 câu, không nhãn cấp | phải tách được B2/C1/C2 | **thiếu hoàn toàn** |

---

## PHẦN 3 — BẢNG ĐỀ XUẤT

Cột **Làm được không** theo đúng ràng buộc bạn đã đặt (không API trả phí, mỗi khách tự nhập key Gemini):

- **(A) Nội dung tĩnh** — soạn một lần, không cần API, chạy cho mọi khách kể cả không có key.
- **(B) Key Gemini của khách** — chạy khi khách đã nhập key; khách chưa nhập thì phải ẨN hoặc BÁO, không im lặng.
- **(C) Cần hạ tầng trả phí** — **vi phạm ràng buộc, tôi không đề xuất làm**, chỉ ghi ra để bạn biết cái gì buộc phải bỏ.

### Nhóm 1 — Rẻ nhất, hiệu quả ngay (nội dung đã có, chỉ thiếu tổ chức)

| # | Việc | Vì sao | Loại | Công |
|---|---|---|---|---|
| 1.1 | **Mở rộng lộ trình từ 44 lên ~150–200 chặng**, xếp nốt 242 chủ đề từ vựng và 59 chủ đề ngữ pháp còn nằm ngoài | 91% kho từ vựng đang vô hình với người học đi theo lộ trình | A | Trung bình |
| 1.2 | **Đưa 260 unit Oxford vào lộ trình** (hiện 0 unit được xếp) | Ba giáo trình đầy đủ đang không nằm trong đường đi nào | A | Trung bình |
| 1.3 | **Bù độ dày cho sách Advanced** (26,5 câu/unit so với 80,7 của Elementary) | Càng lên cao càng mỏng, ngược nhu cầu | A | Lớn |
| 1.4 | **Bổ sung cụm "Mất gốc thật"**: bảng chữ cái, phát âm, nguyên âm/phụ âm, đọc IPA | Hiện không có gì; người mất gốc gặp ngay IPA chưa từng được dạy | A | Nhỏ |
| 1.5 | Ghi **giờ học ước lượng thật** cho từng chặng và tổng lộ trình | Con số ~201 giờ hiện nay là cộng các dòng mô tả viết tay | A | Nhỏ |

### Nhóm 2 — Ba lỗ hổng chặn đường lên B2+

| # | Việc | Vì sao | Loại | Công |
|---|---|---|---|---|
| 2.1 | **Nghe bằng âm thanh thật** — thu/mua/dùng nguồn mở có giọng người, nhiều accent, tốc độ thật, có hội thoại | 0 file âm thanh; giọng máy đọc không đưa ai lên B2 nghe được | **A** (cần nguồn audio) | **Lớn** |
| 2.2 | **Câu hỏi đọc–nghe hiểu soạn tay theo VĂN BẢN** (hiện 1/267 chủ đề) | 266 chủ đề đang kiểm tra hiểu một câu, không phải hiểu một bài | A | Lớn |
| 2.3 | **Viết có chấm, mở rộng ra toàn app**: đề viết theo chủ đề, chấm bằng key Gemini của khách, lưu vào sổ lỗi | Hiện chỉ có 1 ô văn bản ở mục ngữ pháp | **B** | Trung bình |
| 2.4 | **Nói có phản hồi thật**: chấm phát âm theo âm vị, nhận xét bằng key Gemini | Hiện chỉ so chuỗi văn bản, không chấm phát âm | **B** (một phần) / **C** (chấm âm vị chuẩn) | Lớn |
| 2.5 | **Test đầu vào 40–60 câu, mỗi câu gắn nhãn cấp độ, có nhánh thích ứng** | 12 câu không nhãn không tách nổi B2/C1/C2 | A | Trung bình |

### Nhóm 3 — Cần cho việc thật sự chạm C1/C2

| # | Việc | Vì sao | Loại | Công |
|---|---|---|---|---|
| 3.1 | **Nâng vốn từ lên ~12.000+ họ từ**, ưu tiên từ học thuật và cụm từ (collocation), không nhân bản chủ đề | Đang 6.620 từ duy nhất, và 69,9% ô từ là bản trùng | A | Rất lớn |
| 3.2 | **Văn bản đọc dài, thật** (báo, học thuật, văn học) 800–1.500 từ kèm câu hỏi suy luận | C1/C2 đo khả năng đọc văn bản thật, không đo đọc đoạn ôn từ | A | Rất lớn |
| 3.3 | **Vòng sản sinh có sửa**: viết bài dài, được chấm, sửa, viết lại | Không có vòng này thì không ai lên C1 viết được | B | Lớn |
| 3.4 | **Luyện tương tác**: hội thoại có người/AI phản hồi tự do | C1/C2 là kỹ năng tương tác, không phải kỹ năng chọn đáp án | B | Lớn |
| 3.5 | Rà soát **chất lượng văn bản** — ~~27/267~~ **8/267** bài đọc dính dấu hiệu nhồi từ khoá (xem ô cập nhật ở §1.4; đã sửa xong 2026-08-16); phần còn lại máy không đo được, cần người đọc | Bài đọc là đầu vào chính, sai ở đây là sai gốc | A | Trung bình |

### Việc KHÔNG đề xuất làm (loại C — vi phạm ràng buộc)

| Việc | Vì sao bỏ |
|---|---|
| Chấm phát âm theo âm vị đạt chuẩn thi cử | Cần dịch vụ nhận diện giọng nói trả phí có mô hình chấm; Web Speech API chỉ trả về văn bản |
| Chấm viết/nói bằng key của chủ dự án cho mọi khách | Trái ràng buộc "mỗi khách tự nhập key Gemini" |
| Chứng chỉ có giá trị đối chiếu CEFR | Cần tổ chức khảo thí, không phải việc của phần mềm |

---

## PHẦN 4 — NÊN LÀM THEO THỨ TỰ NÀO

Nếu mục tiêu là **đưa một người mất gốc đi xa nhất với công sức ít nhất**, thứ tự đề xuất:

1. **Nhóm 1 trước** (1.4 → 1.1 → 1.2 → 1.5 → 1.3). Nội dung đã nằm sẵn trong repo; đây thuần là việc xếp thứ tự và bù chỗ mỏng. Làm xong nhóm này, lộ trình đi được **hết A2 và phần lớn B1** một cách tử tế — tức là đúng thứ web đang thật sự có.
2. **2.5 (test phân loại)** ngay sau đó, vì mọi thứ về sau đều dựa vào việc biết người học đang ở đâu.
3. **2.1 (nghe thật) và 2.2 (đọc–nghe hiểu theo văn bản)** — hai cái này là cửa ải B1→B2. Không qua được thì mọi thứ ở nhóm 3 đều vô nghĩa.
4. **2.3 (viết có chấm)** — rẻ hơn 2.4 nhiều và mở được kỹ năng sản sinh đầu tiên.
5. **Nhóm 3** chỉ nên bắt đầu khi 1 và 2 đã xong. Đây là phần tốn kém nhất và cũng là phần dễ làm dối nhất.

### Nói thẳng về mốc C2

Kể cả làm hết bảng trên, **C2 không phải thứ một ứng dụng tự học đưa người ta tới được**. C2 đòi hỏi tương tác kéo dài với người bản ngữ, sản sinh có người chấm, và tiếp xúc lượng lớn nội dung thật. Cái mà web này **có thể** làm rất tốt nếu đi hết bảng trên là **đưa người mất gốc lên B2 vững, và làm nền cho C1**. Đó là lời hứa nên đặt ra — và cũng đúng tinh thần của cả chuỗi dọn nội dung vừa rồi: **không hứa thứ mình không có.**

---

*Báo cáo này chỉ ĐO và ĐỀ XUẤT. Chưa sửa gì cả, chờ duyệt.*
