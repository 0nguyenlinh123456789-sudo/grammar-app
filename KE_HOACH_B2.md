# KẾ HOẠCH: ĐƯA NGƯỜI MẤT GỐC LÊN B2 VỮNG, LÀM NỀN CHO C1

> Lập 2026-08-14. Cam kết chốt: **B2 vững + nền C1**. Không hứa C2.
> Không tính cụm IELTS Nền Tảng (chạy local, không đụng).
> **Chưa sửa gì — đây là bảng để duyệt.**

## TIN TỐT ĐO ĐƯỢC TRƯỚC: phần khó nhất đã có sẵn

Khi đổi mốc từ C2 xuống B2, bài toán khác hẳn. Đo lại:

| | Đang có (đo từ repo) | Mốc B2 (tham chiếu¹) | Kết luận |
|---|---|---|---|
| Vốn từ | 5.422 đơn từ (~5.200 họ từ) **+ 1.198 cụm từ** | ~4.000–6.000 họ từ | ✅ **đủ** |
| Ô từ bậc A1→B2 | 15.498 | — | ✅ đủ dày |
| Ngữ pháp B1+B2 | 53 chủ đề · 776 câu bài tập | — | ✅ đủ |
| Khối lượng nội dung | **~591 giờ**² | ~500–600 giờ | ✅ **đủ** |
| Lộ trình dẫn qua | **~201 giờ / 44 chặng** | — | ❌ chỉ dùng 1/3 kho |

¹ *Mốc CEFR/Cambridge là kiến thức chung, không đo được từ mã nguồn, các nguồn cho số khác nhau. Dùng định hướng, không dùng làm cam kết.*
² *Quy đổi thô của tôi, không phải số đo: 12.510 câu Oxford + 88.032 lượt học từ + 1.031 câu ngữ pháp, tính 20 giây/lượt, cộng 267 bài đọc tính 6 phút/200 từ. Đổi giả định là đổi con số.*

**Nghĩa là: bạn không thiếu nội dung để lên B2. Bạn thiếu ĐƯỜNG ĐI, thiếu ĐẦU VÀO NGHE, và thiếu VÒNG SẢN SINH.** Đây là tin tốt — phần đắt nhất (soạn từ vựng, ngữ pháp, bài tập) đã xong rồi.

---

## PHẦN 1 — "B2 VỮNG" NGHĨA LÀ GÌ, ĐO BẰNG GÌ

Cam kết phải kiểm được, không thì lại thành lời hứa suông. Đề xuất định nghĩa nghiệm thu:

| # | Tiêu chí | Đo bằng |
|---|---|---|
| N1 | Lộ trình liên tục từ **chữ cái → B2**, không đứt đoạn, không đòi người học tự đi tìm | test CI: mọi chủ đề/unit/chủ đề ngữ pháp bậc ≤B2 đều thuộc đúng 1 chặng |
| N2 | Tổng giờ lộ trình dẫn qua **≥ 450 giờ** (ước lượng thật, ghi công thức) | test CI cộng giờ khai báo, đối chiếu số câu thật |
| N3 | Mỗi chặng đều **đo độ chính xác** trước khi đánh dấu xong | ✅ **đã có** (hạng mục #1/#1b, `tests/milestone_gate.test.js`) |
| N4 | Người học nghe được **giọng người thật**, nhiều accent, ở mọi chặng ≥B1 | test CI: mỗi chặng B1+ có ≥1 nguồn audio thật — ⚠️ **CHƯA ĐẠT, và cần sửa lại cách đo**: xem ghi chú dưới bảng |
| N5 | Có **đọc hiểu theo VĂN BẢN** (không phải theo câu lẻ) ở mọi chặng ≥B1 | test CI: câu hỏi soạn tay gắn với `storyEn`, ≥4 câu/bài |
| N6 | Có **viết được chấm** và lỗi vào sổ lỗi, ở mọi chặng ≥A2 | test CI: mỗi chặng A2+ có ≥1 đề viết |
| N7 | Test đầu vào **tách được A1/A2/B1/B2/C1** | test CI: mỗi bậc ≥8 câu có nhãn cấp độ |
| N8 | Có **bài thi cuối bậc** cho A2, B1, B2 — đủ 4 kỹ năng | test CI: 3 đề, mỗi đề có cả 4 phần |

> **Ghi chú N4 — đề nghị sửa lại cách đo (15/08).**
> Cách đo cũ ("mỗi chặng B1+ có ≥1 nguồn audio thật") **không trung thực được**. Kho bản thu là **câu rời** của Tatoeba; gán một câu ngẫu nhiên cho chặng "Từ vựng Kinh doanh Oxford Unit 42" rồi gọi đó là "audio của chặng này" là một tuyên bố sai — câu đó không liên quan gì tới nội dung chặng.
> Cái đang có: **kho dùng chung 239 bản thu**, chia theo **độ dài câu** (97 ngắn · 98 vừa · 44 dài), bậc lộ trình gợi ý nhóm bắt đầu. Điều này thật và kiểm được.
> Đề nghị đổi N4 thành hai vế đo được: **(a)** kho có ≥200 bản thu giọng người thật, mỗi nhóm độ dài ≥40 — *đã đạt, đã ghim bằng bánh cóc*; **(b)** mỗi chặng B1+ có ít nhất một **bài nghe theo đoạn gắn với nội dung chặng** — *đây mới là việc 2.2, và nó chưa bắt đầu.*
> Vế (b) mới là thứ thật sự mở cửa ải B1→B2 về nghe. Chép chính tả câu rời rèn tai nghe âm, nhưng không rèn khả năng theo dõi mạch nói.

---

## PHẦN 2 — BẢNG VIỆC CẦN LÀM

Cột **Ràng buộc**: **A** = nội dung tĩnh, không cần API, chạy cho mọi khách · **B** = cần key Gemini của khách (chưa nhập thì ẨN/BÁO, không im lặng) · **C** = cần hạ tầng trả phí → **không làm**.

### NHÓM 1 — Đường đi (nội dung đã có, chỉ thiếu tổ chức) · *ưu tiên cao nhất*

| # | Việc | Vì sao | Nghiệm thu | RB | Công |
|---|---|---|---|---|---|
| 1.1 | **Cụm "Mất gốc thật"**: bảng chữ cái, 44 âm, quy tắc đọc, cách đọc IPA, trọng âm | Hiện **không có gì**; người mất gốc mở app là gặp ngay IPA chưa từng được dạy | ≥12 bài, đứng trước mọi chặng khác | A | Nhỏ |
| 1.2 | **Mở lộ trình 44 → ~180 chặng**, xếp nốt **242 chủ đề từ vựng** và **59 chủ đề ngữ pháp** chưa được xếp | 91% kho từ vựng và 76% ngữ pháp đang vô hình với người đi theo lộ trình | N1 xanh | A | Trung bình |
| 1.3 | **Đưa 260 unit Oxford vào lộ trình** (hiện **0/260**) | Ba giáo trình đầy đủ, 12.510 câu luyện tập, không nằm trong đường đi nào | N1 xanh | A | Trung bình |
| 1.4 | **Gắn nhãn bậc CEFR thật cho từng chặng** và chia lộ trình theo bậc A1→B2 (+C1 dự bị) | Hiện 5 tầng nhưng nhãn không khớp nội dung (file "B1" chứa cả ngữ pháp A1) | mỗi chặng có `cefr` kiểm được | A | Nhỏ |
| 1.5 | **Ghi giờ học ước lượng THẬT** cho từng chặng, kèm công thức | Con số ~201 giờ hiện nay là cộng các dòng mô tả viết tay | N2 xanh | A | Nhỏ |
| 1.6 | **Khoá mềm theo thứ tự**: gợi ý chặng kế tiếp, cảnh báo khi nhảy cóc quá xa — **không chặn cứng** | 180 chặng mà không có thứ tự thì người học lạc | có gợi ý + nhãn "vượt cấp" | A | Nhỏ |

### NHÓM 2 — Nghe: lỗ hổng lớn nhất chặn đường B1→B2

| # | Việc | Vì sao | Nghiệm thu | RB | Công |
|---|---|---|---|---|---|
| 2.1 | 🟡 **ĐANG DỞ (Đợt 3)** — đã dựng cổng giấy phép + bộ tải 4 lớp + kho bản thu đầu tiên. **N4 chưa đạt.** Xem `BAO_CAO_GIAY_PHEP_AUDIO.md` | Trước đó **0 file âm thanh** trong `public/` | N4 xanh | A | **Lớn** |
| 2.2 | ⛔ **CHƯA BẮT ĐẦU — vướng bản chép lời, không phải vướng ffmpeg** (xem ghi chú dưới bảng) | B2 đo khả năng theo dõi mạch nói, không đo nhận ra một từ | ≥60 bài nghe đoạn | A | Lớn |
| 2.3 | ✅ **XONG (Đợt 3)** — nghe chép chính tả, chấm bằng so khớp dãy con dài nhất; thiếu từ đầu câu không kéo sập cả câu | Cơ chế rẻ, hiệu quả cao nhất cho nghe | `tests/dictation.test.js` | A | Nhỏ |
| 2.4 | ✅ **XONG (Đợt 3)** — nhãn "Giọng máy đọc" ở phần nghe hiểu và phần Nghe của đề thi thử | Thiếu dữ liệu thì BÁO, không thay thế âm thầm | `MachineVoiceTag.jsx` | A | Nhỏ |

> **Ghi chú cho việc 2.2 — đo thật ngày 2026-08-15, chưa quyết.**
> Trở ngại KHÔNG phải là cắt file. Một bài nghe theo đoạn cần **bản chép lời khớp với đúng đoạn đó** để viết câu hỏi hiểu ý, để hiện lại sau khi nghe, và để kiểm được.
> - **LibriVox**: có sẵn mục dài 60–150 giây (đếm được 119 mục trong 40 quyển đầu qua trường `playtime` của API, không cần cắt). Nhưng **không có văn bản khớp từng mục** — chỉ có liên kết tới cả quyển sách trên Gutenberg. Và văn phong là tiểu thuyết thế kỷ 19, sai hẳn ngữ vực cho người học B1/B2.
> - **VOA Learning English**: có **cả bản chép lời và MP3 trên cùng một trang** (đã thử một bài: 1.592 từ + 1 file MP3) — đúng thứ 2.2 cần. Nhưng file dài ~13 phút nên **vẫn phải cắt**, và giấy phép phải xét từng bài.
>
> Ba hướng: (a) cài `ffmpeg-static` làm dev dependency rồi cắt bài VOA theo đoạn; (b) chỉ lấy loạt bài VOA vốn đã ngắn (News Words ~1 phút); (c) ghi mốc bắt đầu/kết thúc trong manifest rồi cho trình phát tua — không đụng vào file, nhưng phải tải cả file dài về.

### NHÓM 3 — Đọc hiểu và sản sinh

| # | Việc | Vì sao | Nghiệm thu | RB | Công |
|---|---|---|---|---|---|
| 3.1 | **Câu hỏi đọc hiểu soạn tay gắn với `storyEn`** — hiện **1/267 chủ đề** có | 266 chủ đề đang kiểm tra hiểu *một câu*, không phải hiểu *một bài* | N5 xanh | A | **Lớn** |
| 3.2 | **Rà chất lượng 267 bài đọc**; sửa/thay 27 bài dính dấu hiệu nhồi từ khoá (11 bài dính >10 lần) | Bài đọc là đầu vào chính; sai ở đây là sai gốc | 0 bài dính dấu hiệu, test CI ghim | A | Trung bình |
| 3.3 | **Ngân hàng đề viết theo chặng** (câu → đoạn → bài 150–200 từ), chấm bằng key Gemini của khách, lỗi đổ vào sổ lỗi đã có | Hiện chỉ có **1 ô văn bản tự do** ở mục ngữ pháp | N6 xanh | **B** | Trung bình |
| 3.4 | **Chấm viết dự phòng không cần AI**: đối chiếu câu mẫu, checklist tiêu chí, tự đánh giá có hướng dẫn | Khách chưa nhập key vẫn phải viết được, không thì tính năng chết một nửa | mọi đề viết dùng được khi không có key | A | Trung bình |
| 3.5 | **Nói: mở rộng đọc to → nói theo chủ đề**, chấm bằng key Gemini; giữ so khớp văn bản làm dự phòng | Hiện chỉ so chuỗi, và bản thân việc so chuỗi không phải chấm phát âm | ≥1 đề nói/chặng B1+ | **B** | Trung bình |

### NHÓM 4 — Đo lường (không có thì không biết ai đang ở đâu)

| # | Việc | Vì sao | Nghiệm thu | RB | Công |
|---|---|---|---|---|---|
| 4.1 | ✅ **XONG (Đợt 2)** — ngân hàng **50 câu, 10 câu/bậc A1→C1**, bài thích ứng hỏi 12–24 câu. Trình độ lấy từ **nấc thang**, không từ % đúng | Trước đó: 12 câu, 0 câu có nhãn cấp → không tách nổi B2 với C1 | N7 xanh (`tests/placement_bank.test.js`) | A | Trung bình |
| 4.2 | **Bài thi cuối bậc A2 / B1 / B2** — đủ 4 kỹ năng, đạt mới được gắn nhãn bậc | Hiện chỉ có 2 đề thi thử × 20 câu, không gắn với bậc nào | N8 xanh | A (+**B** cho phần viết/nói) | Trung bình |
| 4.3 | ✅ **XONG (Đợt 2)** — 4 kỹ năng CEFR tách riêng + 2 kỹ năng nền. Nghe/nói/viết hiện **“chưa đo được” kèm lý do**, không phải thanh 0% | B2 nghe ≠ B2 viết; gộp lại là giấu điểm yếu | 4 ô riêng trong Báo cáo tiến bộ (`tests/skill_profile.test.js`) | A | Nhỏ |
| 4.4 | **Đổi điều kiện chứng nhận** sang "đã đạt bài thi cuối bậc B2" thay vì "đi hết lộ trình" | Chứng nhận là chỗ duy nhất app nói với người ngoài | chứng nhận ghi rõ bậc + ngày thi | A | Nhỏ |

### NHÓM 5 — Nền cho C1 (làm sau khi B2 xong)

| # | Việc | Vì sao | Nghiệm thu | RB | Công |
|---|---|---|---|---|---|
| 5.1 | **Bù độ dày sách Oxford Advanced**: 26,5 câu/unit so với 80,7 của Elementary | Càng lên cao càng mỏng — ngược nhu cầu | ≥50 câu/unit | A | Lớn |
| 5.2 | **Xếp 6.510 ô từ bậc C1+ đã có** thành nhánh C1 dự bị | Từ vựng C1 đã nằm sẵn trong kho, chưa có đường đi | nhánh C1 có lộ trình riêng | A | Trung bình |
| 5.3 | **Văn bản đọc dài 600–1.000 từ**, thể loại thật (báo/khoa học thường thức) | C1 đo đọc văn bản thật | ≥30 bài | A | Lớn |
| 5.4 | **Vòng viết – sửa – viết lại** (nộp bản 2 sau khi nhận nhận xét) | Không có vòng này thì không lên C1 viết được | lưu được ≥2 bản/đề | **B** | Trung bình |

---

## PHẦN 3 — KHÔNG LÀM (loại C, trái ràng buộc đã chốt)

| Việc | Vì sao bỏ | Thay bằng |
|---|---|---|
| Chấm phát âm theo âm vị đạt chuẩn thi cử | Cần dịch vụ nhận diện giọng nói trả phí; Web Speech API chỉ trả về văn bản | Nhận xét bằng key Gemini của khách (3.5) + tự nghe lại |
| Chấm viết/nói bằng key của chủ dự án cho mọi khách | Trái ràng buộc "mỗi khách tự nhập key Gemini" | Key của khách (3.3/3.5) + phương án không-AI (3.4) |
| Chứng chỉ đối chiếu CEFR có giá trị pháp lý | Cần tổ chức khảo thí | Chứng nhận nội bộ ghi rõ "đánh giá trong ứng dụng" (4.4) |
| Gia sư người thật / lớp hội thoại | Ngoài phạm vi phần mềm | Hội thoại AI bằng key khách (đã có `BunnyChat`) |

---

## PHẦN 4 — THỨ TỰ THI CÔNG ĐỀ XUẤT

| Đợt | Gồm | Được gì sau đợt |
|---|---|---|
| ~~**1**~~ ✅ | 1.1 → 1.4 → 1.2 → 1.3 → 1.5 → 1.6 | Lộ trình liền mạch chữ cái→B2 dẫn qua ~450–590 giờ nội dung **đã có**. Đây là đợt đổi nhiều nhất trên mỗi giờ công. |
| ~~**2**~~ ✅ | 4.1 → 4.3 | Biết người học đang ở đâu theo từng kỹ năng — mọi thứ sau đó dựa vào đây. |
| **3** | 2.1 → 2.3 → 2.2 → 2.4 | Mở được cửa ải B1→B2 về nghe. |
| **4** | 3.4 → 3.3 → 3.1 → 3.2 → 3.5 | Mở kỹ năng sản sinh và đọc hiểu ở mức văn bản. |
| **5** | 4.2 → 4.4 | Chốt được cam kết: có bài thi cuối bậc B2 và chứng nhận gắn với nó. |
| **6** | 5.1 → 5.2 → 5.3 → 5.4 | Nền C1. |

**Sau đợt 5 là lúc câu "đưa người mất gốc lên B2 vững" trở thành phát biểu kiểm được**, không phải lời quảng cáo.

---

## PHẦN 5 — HAI ĐIỀU CẦN THỐNG NHẤT TRƯỚC

1. **Nguồn audio (việc 2.1) là việc lớn nhất và là việc duy nhất cần nội dung từ bên ngoài.** Ba hướng: (a) dùng kho mở có giấy phép phù hợp — rẻ, nhưng phải tự lọc và tự cắt; (b) tự thu — kiểm soát hoàn toàn, tốn thời gian; (c) giọng máy chất lượng cao qua key của khách — nhưng vẫn là giọng máy. Cần bạn chọn trước khi tôi bắt tay.
2. **Việc 3.1 (câu hỏi đọc hiểu cho 267 bài) là khối lượng soạn thảo lớn nhất trong bảng.** Nếu muốn giảm, có thể thu hẹp còn các chặng nằm trong lộ trình chính thay vì cả 267 chủ đề — nói rõ để tôi tính lại phạm vi.

---

*Bảng này chỉ ĐỀ XUẤT. Chưa sửa gì. Duyệt đợt nào tôi làm đợt đó, mỗi nhóm một commit, xong báo cáo rồi dừng.*
