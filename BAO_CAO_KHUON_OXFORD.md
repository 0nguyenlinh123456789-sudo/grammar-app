# BẢNG ĐỐI CHIẾU — NỘI DUNG NHÂN TỪ KHUÔN TRONG GIÁO TRÌNH OXFORD

> Lập 2026-08-16 khi mở việc 5.1 (bù độ dày sách Oxford Advanced).
> ~~**Chưa xoá gì.** Đây là bảng để bạn duyệt.~~
> ✅ **ĐÃ CHỐT 2026-08-17 — chủ dự án giao tự quyết. Làm CẢ A VÀ B, không chọn một.**
> **A đã xong**: xoá 1.868 cụm nhân từ khuôn (elementary 592 · advanced 1.276), giữ 19 cụm thật.
> `scripts/strip_oxford_templates.mjs` · bất biến băm ở `tests/oxford_colloc.test.js` chứng minh
> đợt xoá **chỉ đụng vào mảng `collocations`**, không đụng một ký tự nào ở quiz/theory/bài tập.
> **B đã xong ở commit riêng**: 100 câu đổi thành `Nghĩa nào dưới đây là nghĩa của "X"?`.
> Phải là commit riêng vì bất biến của A băm mọi thứ ngoài `collocations`, nên sửa chuỗi `q` của B
> lập tức làm A đỏ — bất biến làm đúng việc của nó: hai đợt sửa, hai commit, hai bảng băm.
> `scripts/reword_best_translation.mjs` · `tests/oxford_best_translation.test.js` chứng minh **chỉ `q` đổi**,
> `options` và `a` băm khớp y nguyên; kèm một test đòi nhiễu vẫn phải là nghĩa soạn tay TRONG CÙNG UNIT —
> mất căn cứ đó thì quyết định phải là XOÁ, không phải sửa chữ.
> **C bị loại**: giữ nguyên nghĩa là tiếp tục dạy `use noun`, `very adjective` cho người học B2–C1.
> Đo lại bất cứ lúc nào: `node scripts/audit_oxford_templates.mjs`

## Vì sao có bảng này

Việc 5.1 là "bù độ dày cho sách Advanced". Nhưng trước khi làm dày thêm, tôi đo thử **thứ đang có**. Kết quả: một phần nội dung trong giáo trình Oxford là **nhân ra từ khuôn mẫu**, và một phần trong số đó **sai tiếng Anh**.

Luật đã chốt từ chuỗi dọn nội dung: **GIỮ** nội dung máy làm ra bằng cách *sắp xếp lại* tài liệu soạn tay; **XOÁ** nội dung máy *nhân ra từ khuôn mẫu*. Luật đó trước nay chỉ áp cho **kho từ vựng**. **Giáo trình Oxford chưa từng bị soi bằng nó** — nên tôi đưa bảng này ra thay vì tự xoá.

## Cách phân loại — hai câu hỏi, không phải cảm giác

1. Bỏ chính từ đó ra thì phần còn lại có phải một **khuôn lặp đi lặp lại** không?
2. **Đáp án nhiễu lấy từ đâu** — trong cùng unit, một tập nhãn đóng, hay chỗ khác?

Câu 2 mới là câu phân loại được. Một câu hỏi *có thể* sinh từ khuôn mà **vẫn dùng được**, nếu đáp án và nhiễu đều đọc ra từ tài liệu soạn tay. Nếu chỉ sắp theo "trông có vẻ máy sinh" thì tôi đã xoá nhầm 292 câu quiz hợp lệ.

---

## ĐỀ NGHỊ XOÁ — cụm collocation nhân từ khuôn

**1.868 / 1.887 cụm (99,0%)** sinh ra từ **11 khuôn**. Chỉ **19 cụm** là thật.

| Số cụm | Khuôn | Ví dụ thật trong kho |
|---:|---|---|
| 306 | `important {X}` | important FAQ · important ID · **important DOB** |
| 306 | `{X} system` | FAQ system · **DOB system** · PR system |
| 257 | `extremely {X}` | **extremely get dark** · **extremely get better** · **extremely adjective** |
| 188 | `highly {X}` | **highly AWOL** · highly overrated · highly overworked |
| 174 | `have a {X}` | **have a noun** · **have a get a stamp** · **have a get a doctor** |
| 174 | `use {X}` | **use noun** · **use get a stamp** · **use get a job** |
| 144 | `{X} effectively` | **RSVP effectively** · overestimate effectively |
| 144 | `must {X}` | must RSVP · must overestimate · must outnumber |
| 69 | `very {X}` | **very adjective** · **very get dark** |
| 53 | `{X} something` | **verb something** · **go something** · **walk something** |
| 53 | `always {X}` | **always verb** · always go · always walk |

**In đậm = sai tiếng Anh, không chỉ là nhân bản.** Đây là hai lý do độc lập:

1. **Nguồn gốc:** nhân từ khuôn — đúng vế XOÁ của luật đã chốt.
2. **Đúng/sai:** `have a noun`, `use noun`, `very adjective`, `verb something`, `extremely get dark`, `have a get a stamp` **không phải tiếng Anh**. Khuôn đã bị áp lên cả *nhãn từ loại* ("noun", "verb", "adjective") và cả *cụm động từ* ("get a stamp"). Lý do này đứng vững **kể cả khi bạn không đồng ý với vế nguồn gốc** — đây là dạy sai.

Còn `important DOB`, `DOB system`, `highly AWOL`, `extremely AWOL`: đúng ngữ pháp nhưng **không ai nói thế**, và người học B2–C1 học collocation chính là để biết cái gì người ta *có* nói.

**Theo sách:** elementary 592 · pre-intermediate 19 · advanced 1.276.

**19 cụm THẬT sẽ giữ lại:** `make great progress`, `rapid progress`, `academic progress`, `revision habits`, `make a spelling mistake`, `avoid making mistakes`, `silly mistake`, `have a friendly chat`, `chat online`, `chat with teacher`, và một số cụm lẻ khác.

---

## ĐỀ NGHỊ GIỮ — hai họ câu quiz sinh từ khuôn nhưng vẫn dùng được

| Số câu | Sách | Khuôn | Vì sao GIỮ |
|---:|---|---|---|
| 192 | pre-intermediate | `Đâu là loại từ (Part of Speech) chính xác của từ "{X}"?` | Đáp án đọc thẳng từ trường `type` **soạn tay**; nhiễu là **tập nhãn đóng** (danh từ / động từ / tính từ / trạng từ — 19 nhãn trên toàn bộ 192 câu). Máy không phán đoán gì cả. |
| 100 | advanced | `What is the best translation for "{X}"?` | Đáp án là nghĩa **soạn tay** của từ đó; **100/100 câu** có nhiễu là nghĩa soạn tay của **các từ khác trong chính unit đó**. |

**Nhưng họ thứ hai có một vấn đề nhỏ hơn, không phải bịa mà là NÓI QUÁ:** chữ *"best translation"* ngụ ý một phán đoán về chất lượng bản dịch, trong khi việc thật sự đang làm là *"nghĩa nào trong bốn nghĩa này là của từ đó"*. Nó cũng **trùng nội dung** với bài Thẻ Nhớ và bài Gõ Từ. Đề nghị: **sửa câu chữ**, không xoá.

---

## Bạn cần quyết

| | Việc | Số mục |
|---|---|---|
| **A** | Xoá 1.868 cụm collocation nhân từ khuôn, giữ 19 cụm thật | 1.868 xoá |
| **B** | Sửa câu chữ `What is the best translation for "X"?` → `Nghĩa nào là của từ "X"?` | 100 sửa chuỗi |
| **C** | Không làm gì cả — giữ nguyên | 0 |

Tôi **chưa động vào gì**. Việc bù độ dày (5.1) đã làm xong và **không phụ thuộc vào quyết định này** — nó chỉ thêm bài luyện tập suy từ ô từ soạn tay, không đụng tới collocation.
