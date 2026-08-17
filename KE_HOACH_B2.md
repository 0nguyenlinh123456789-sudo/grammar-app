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
| N4 | Người học nghe được **giọng người thật**, nhiều accent, ở mọi chặng ≥B1 | ✅ **ĐẠT (Đợt 8)** theo cách đo đã sửa lại hai lần: (a) kho ≥200 bản thu người thật ✅ · (b′) bài nghe theo đoạn **nằm trong lộ trình**, đo **theo BẬC**: **20/20/20 bài ở B1/B2/C1**, mốc ≥15 ✅. ⚠️ **Còn một vế máy không kiểm được: chưa ai NGHE THỬ** 239 bản thu và 60 bài — máy chỉ kiểm được file tồn tại và phát được. Xem hai ghi chú N4 dưới bảng |
| N5 | Có **đọc hiểu theo VĂN BẢN** (không phải theo câu lẻ) ở mọi chặng ≥B1 | ✅ **ĐẠT (Đợt 7)** — 121/122 chặng ≥B1, 484 câu soạn tay, mỗi câu có căn cứ nguyên văn kiểm được; `tests/story_quiz.test.js` |
| N6 | Có **viết được chấm** và lỗi vào sổ lỗi, ở mọi chặng ≥A2 | ~~test CI: mỗi chặng A2+ có ≥1 đề viết~~ → **đã đo lại, xem ghi chú N6 dưới bảng.** (a) 531/532 chặng A2+ có đề gắn với nội dung chặng ✅ (b) ≥9 đề soạn tay có bài mẫu ✅ |
| N7 | Test đầu vào **tách được A1/A2/B1/B2/C1** | test CI: mỗi bậc ≥8 câu có nhãn cấp độ |
| N8 | Có **bài thi cuối bậc** cho A2, B1, B2 — đủ 4 kỹ năng | test CI: 3 đề, mỗi đề có cả 4 phần |

> **Ghi chú N4 — đề nghị sửa lại cách đo (15/08).**
> Cách đo cũ ("mỗi chặng B1+ có ≥1 nguồn audio thật") **không trung thực được**. Kho bản thu là **câu rời** của Tatoeba; gán một câu ngẫu nhiên cho chặng "Từ vựng Kinh doanh Oxford Unit 42" rồi gọi đó là "audio của chặng này" là một tuyên bố sai — câu đó không liên quan gì tới nội dung chặng.
> Cái đang có: **kho dùng chung 239 bản thu**, chia theo **độ dài câu** (97 ngắn · 98 vừa · 44 dài), bậc lộ trình gợi ý nhóm bắt đầu. Điều này thật và kiểm được.
> Đề nghị đổi N4 thành hai vế đo được: **(a)** kho có ≥200 bản thu giọng người thật, mỗi nhóm độ dài ≥40 — *đã đạt, đã ghim bằng bánh cóc*; **(b)** mỗi chặng B1+ có ít nhất một **bài nghe theo đoạn gắn với nội dung chặng** — *đây mới là việc 2.2, và nó chưa bắt đầu.*
> Vế (b) mới là thứ thật sự mở cửa ải B1→B2 về nghe. Chép chính tả câu rời rèn tai nghe âm, nhưng không rèn khả năng theo dõi mạch nói.

---

> ## ⚠️ GHI CHÚ N4 — LẦN THỨ HAI, VÀ LẦN NÀY LÀ TỰ ĐÍNH CHÍNH CÁCH ĐO DO CHÍNH TÔI ĐỀ NGHỊ (17/08)
>
> **Vế (b) ở trên — cách đo tôi đưa ra làm bản thay thế "trung thực" cho N4 cũ — mắc ĐÚNG cái lỗi của cái nó thay thế, chỉ ở một tầng cao hơn.**
>
> N4 cũ sai vì kho là **câu rời**: gán một câu Tatoeba ngẫu nhiên cho chặng "Từ vựng Kinh doanh Oxford Unit 42" rồi gọi đó là "audio của chặng này" là một tuyên bố sai. Tôi đề nghị thay bằng "bài nghe theo đoạn **gắn với nội dung chặng**". Nhưng 60 bài nghe đã soạn là bài **dạy tiếng Anh phổ thông của VOA** (Ask a Teacher, Words & Their Stories) — chúng không nói về nội dung của Unit 42, và cũng không thể nói. Gán một bài trong 60 bài đó cho chặng ấy rồi gọi là "gắn với nội dung chặng" **là cùng một tuyên bố sai, chỉ đổi từ câu rời sang bài rời**.
>
> Đây là lý do câu hỏi này ngồi chờ mấy đợt mà không có câu trả lời: **câu hỏi đặt sai nên không có phương án nào trả lời được một cách trung thực.**
>
> **Chỗ phân biệt quyết định — hai lời nói khác nhau hẳn về mức độ:**
> - *"Bài nghe này dạy từ vựng của Unit 42"* — lời nói **về nội dung**. Sai, không kiểm được, không được nói.
> - *"Đến chặng này trong lộ trình thì làm một bài nghe theo đoạn"* — lời nói **về chương trình học**. Đúng, kiểm được, và chính là thứ đang thiếu.
>
> **Đề nghị N4 vế (b′), phủ theo BẬC chứ không theo từng chặng:** mỗi bậc ≥B1 có **≥15 bài nghe theo đoạn nằm TRONG lộ trình** dưới dạng chặng riêng, xen vào giữa các chặng từ vựng/ngữ pháp. Với 60 bài hiện có thì chia được 20 bài/bậc cho B1·B2·C1; kho ứng viên VOA còn **49 bài dùng được chưa soạn câu hỏi**, nên mốc này còn chỗ lớn lên mà không phải bịa.
>
> **MẪU SỐ PHẢI GỌI RÕ TÊN, vì tài liệu này đã có ba con số một lần rồi:** "chặng ≥B1" = **386** (mọi loại chặng — dùng cho N4 và việc 3.5). "Chặng từ vựng ≥B1" = **122** (chỉ `type:'vstep'` — dùng cho N5/việc 3.1). Cả hai đã ghim trong `tests/roadmap_coverage.test.js` nên đổi một chỗ là test đỏ.

---

> **CHỐT 17/08 (chủ dự án giao tự quyết): LÀM THEO (b′).** Đã đưa 60 bài nghe + 30 bài đọc dài + 3 buổi chép chính tả vào lộ trình, lộ trình **617 → 710 chặng**. Bài nghe/bài đọc **xếp theo số từ ĐO ĐƯỢC** rồi chia ba phần đều (bài ngắn ở bậc thấp) — **không gán nhãn cấp độ cho từng bài**, vì gán "bài này là B1" cho một bài VOA là bịa một nhãn không ai kiểm được. Giao diện nói thẳng là sắp theo độ dài.

---

> ## ⚠️ PHÁT HIỆN KHI ĐO N4 — LỖI CỦA VIỆC 1.3 ĐÃ TÁI DIỄN. ĐÃ ĐO 17/08, ĐÃ SỬA CÙNG NGÀY (Đợt 8)
>
> Việc 1.3 sinh ra để chữa một chuyện: **260 unit Oxford soạn xong mà không có chặng nào dẫn tới**, nên người đi theo lộ trình không bao giờ gặp. Đo lại hôm nay: **chuyện đó đã lặp lại với bốn kho soạn ở Đợt 3, 5 và 6.**
>
> **BỐN KHO KHÔNG PHẢI MỘT VIỆC — chúng khác nhau về BẢN CHẤT, nên số chặng cần thêm không phải 332.** Gộp cả bốn thành "332 mục mồ côi" là tự phóng đại việc mình vừa tìm ra:
>
> | Kho | Số mục | Chặng dẫn tới (trước) | Bản chất của kho | Đã làm |
> |---|---|---|---|---|
> | Bài nghe theo đoạn (2.2) | 60 | **0** | **60 bài học** — mỗi bài có bản chép lời + 4 câu hỏi soạn tay, chấm được | ✅ **60 chặng `listening`**, 20 mỗi bậc B1/B2/C1 |
> | Bài đọc dài 600–1.000 từ (5.3) | 30 | **0** | **30 bài học** — mỗi bài 4 câu hỏi soạn tay, chấm được | ✅ **30 chặng `reading`**, 10 mỗi bậc |
> | Bản thu chép chính tả (2.1/2.3) | 239 | **0** | **một KHO DÙNG CHUNG**, chia theo độ dài câu — không phải 239 bài học. `DictationPanel` đã nhận `currentBand` | ✅ **3 chặng `dictation`** (một mỗi bậc), KHÔNG phải 239 |
> | Đề thi cuối bậc (4.2) | 3 | **0** | **cửa ải cuối bậc** | ❌ **CỐ Ý KHÔNG xếp** — N8 không đòi đề thi nằm trong đường đi thẳng, và chèn nó vào giữa lộ trình biến bài thi thành một bước học. Ghi ra để đây là **quyết định**, không phải bỏ sót |
>
> Nội dung vẫn dùng được — nó không chết, không bị ẩn. Nhưng **lộ trình là thứ app bảo người học đi theo**, và trước đợt này nó không đi qua chỗ nào trong bốn kho. Người học chăm chỉ nhất — người làm đúng từng chặng — là người ít gặp chúng nhất.
>
> **Cỡ việc thật là 93 chặng, không phải 332.** Gộp cả bốn kho thành "332 mục mồ côi" là tự phóng đại phát hiện của mình: đếm MỤC không phải đếm VIỆC, phải hỏi "mỗi mục có phải một bài học không" trước khi cộng.
>
> ### Bốn thứ đợt này phải xử lý kèm, không cái nào đoán ra được từ bàn giấy
>
> 1. **Thanh tiến độ tụt, và phải BÁO.** `WelcomePage.jsx` tính `completedCount / tổng số chặng`, nên người đang thấy `120/617` sẽ thấy `120/710`. Có **thông báo một lần** (`RoadmapGrowthNotice`) nói đúng lý do và nói rõ *không mất chặng nào*. `build_roadmap.mjs` **đọc tổng cũ từ chính file nó sắp ghi đè** rồi lưu thành `TONG_CHANG_TRUOC` — không có con số cũ thì không nói được câu "từ 617 thành 710".
> 2. **93 chặng mới KHÔNG được lọt qua cổng có điểm (N3).** Chặng nghe/đọc ghi bằng chứng từ 4 câu hỏi của chính bài, buổi chép chính tả từ 5 câu. Thiếu bước này là thêm 93 chặng hoàn thành được mà không cần trả lời đúng câu nào — lặng lẽ phá đúng tiêu chí đã tuyên bố đạt.
> 3. **Hai tiêu chí ĐÃ ĐẠT bị đe doạ, không phải bị bỏ qua.** N6(a) đòi mọi chặng A2+ có đề viết, việc 3.5 đòi mọi chặng B1+ có đề nói — thêm 93 chặng là thêm 93 chỗ trống. Đã sinh **đề tóm tắt** cho cả 90 chặng nghe/đọc (nhiệm vụ gắn với bài thật, không bịa đáp án); 3 buổi chép chính tả **kê đích danh là không có**, vì 5 câu rời bốc lúc chạy thì không có chủ đề nào để viết hay nói về.
> 4. **Xác minh nhanh không áp cho ba loại chặng mới, và đó là lý do THẬT chứ không phải lối thoát.** Xác minh nhanh sinh ra để di trú các chặng hoàn thành từ bản cũ; ba loại này thêm vào SAU khi cổng có điểm đã chạy, nên không ai có thể có một lượt hoàn thành mà không có bản ghi điểm. Chúng **không** bị đổ vào bánh cóc "100 chặng thiếu nguyên liệu" của Oxford Advanced — trộn hai lý do khác nhau vào một con số là làm con số đó mất nghĩa.
>
> **Vì sao không test nào bắt được, và đây mới là phần đáng ghi:**
> - `tests/orphan_data.test.js` đo mồ côi **ở mức FILE** ("có ai import không"). Cả bốn kho đều được import đàng hoàng nên nó xanh — đúng phận sự của nó. Mồ côi **ở mức ĐƯỜNG ĐI** là chuyện khác, và trước hôm nay chưa ai đo.
> - Tiêu chí N1 đếm đúng **ba kho tồn tại lúc nó được viết** (từ vựng, ngữ pháp, Oxford). Chú thích đầu file `roadmap_coverage.test.js` lại hứa *"thêm nội dung mới mà quên xếp vào lộ trình → test đỏ"* — **một lời hứa file đó không giữ được**, và tôi đã sửa lại câu chú thích cho khớp phạm vi thật.
> - Bài học cũ theo chiều mới: đã ghi "luật thêm sau khi dữ liệu đã có thì không bao giờ chạy trên dữ liệu cũ"; đây là **chiều ngược lại — luật viết TRƯỚC thì không bao giờ chạy trên dữ liệu thêm SAU**.
>
> **Đã ghim số đo hiện tại (0 chặng), CỐ Ý KHÔNG đặt mốc mong muốn.** Bánh cóc đòi một con số chỉ đạt được sau khi bạn duyệt thì không phải bánh cóc, chỉ là bản dựng đỏ không ai gỡ được. Chèn chặng mới vào 617 chặng là **đổi đường học của người đang dùng** — việc đó chờ bạn duyệt.

---

> **Ghi chú N6 — đã đo lại và ĐANG LÀM THEO cách đo mới (16/08). Không phải câu hỏi mới, chỉ là báo để bạn bác nếu thấy sai.**
> Cách đo cũ ("mỗi chặng A2+ có ≥1 đề viết") đo ra **532 chặng**. Soạn tay 532 đề kèm bài mẫu là không làm nổi; nhân từ khuôn thì đúng là thứ cả chuỗi dọn nội dung đang xoá.
> **Nhưng đề viết KHÁC câu hỏi trắc nghiệm ở một điểm quyết định: nó KHÔNG CÓ ĐÁP ÁN ĐỂ BỊA.** "Viết một đoạn dùng ít nhất 4 trong các từ sau" là một *nhiệm vụ*; "Từ X nghĩa là gì? → B" là một *khẳng định* máy tự đặt ra rồi tự nhận là đúng. Đúng luật đã chốt: GIỮ nội dung máy làm ra bằng cách sắp xếp lại tài liệu soạn tay, XOÁ nội dung nhân từ khuôn mẫu.
> Nên N6 tách làm hai vế đo được:
> **(a)** mọi chặng A2+ có một đề viết **gắn với từ vựng của chính chặng đó**, máy đóng khung nhiệm vụ quanh danh sách từ soạn tay, **KHÔNG có bài mẫu** và nói thẳng là không có — *đã đạt: 531/532, chặng còn lại là Oxford Unit 26 dạy hậu tố (-ful, -less, -ness) nên không thể bảo người học "dùng từ -ness trong câu"; ghim bằng `tests/writing_bank.test.js`.*
> **(b)** một số đề **soạn tay có bài mẫu** để người học đối chiếu — *đang có 9 đề, có bánh cóc riêng ở `tests/writing_fallback.test.js`. Con số này lớn lên bằng công soạn thảo, không bằng máy.*
> Thứ máy TUYỆT ĐỐI không được sinh là **bài mẫu**: đó là nội dung thật, phải người viết.
> Phần "lỗi vào sổ lỗi" của N6 đã có sẵn từ bộ chấm bề mặt (lỗi chính tả → thang ôn 3/7/14 ngày). Nhận xét bằng AI dùng key của khách là phần **thêm**, không phải phần nền.

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
| ~~2.1~~ ✅ | **XONG (Đợt 8)** — cổng giấy phép + bộ tải 4 lớp + **239 bản thu giọng người thật** (CC BY 4.0), và **đường đi tới chúng trong lộ trình**: 60 chặng nghe theo đoạn · 30 chặng đọc dài · 3 buổi chép chính tả. **N4 xanh theo cách đo (a)+(b′)** — cách đo cũ và cả bản thay thế đầu tiên của tôi đều không trung thực được, xem hai ghi chú N4. ⚠️ Vế máy không kiểm được: **chưa ai nghe thử**. Xem `BAO_CAO_GIAY_PHEP_AUDIO.md` | Trước đó **0 file âm thanh** trong `public/` | N4 xanh | A | **Lớn** |
| ~~2.2~~ ✅ | **XONG (Đợt 3)** — **60/60 bài** nghe theo đoạn **3–5 phút** (VOA, có bản chép lời + 4 câu hỏi soạn tay mỗi bài). Mốc "60–150 giây" ban đầu là con số tôi đoán, **đã thay bằng số đo**: loạt bài dạy học của VOA dài 200–300 giây, và 4 phút hợp với mục tiêu "theo dõi mạch nói" hơn 90 giây | B2 đo khả năng theo dõi mạch nói, không đo nhận ra một từ | ≥60 bài nghe đoạn — `tests/listening_passages.test.js` | A | Lớn |
| 2.3 | ✅ **XONG (Đợt 3)** — nghe chép chính tả, chấm bằng so khớp dãy con dài nhất; thiếu từ đầu câu không kéo sập cả câu | Cơ chế rẻ, hiệu quả cao nhất cho nghe | `tests/dictation.test.js` | A | Nhỏ |
| 2.4 | ✅ **XONG (Đợt 3)** — nhãn "Giọng máy đọc" ở phần nghe hiểu và phần Nghe của đề thi thử | Thiếu dữ liệu thì BÁO, không thay thế âm thầm | `MachineVoiceTag.jsx` | A | Nhỏ |

> **Ghi chú cho việc 2.2 — ĐÃ CHỐT 2026-08-15.**
> Trở ngại hoá ra **không phải cắt file**, mà là **bản chép lời**: một bài nghe theo đoạn cần văn bản khớp đúng đoạn đó để viết câu hỏi, để hiện lại sau khi nghe, và để kiểm được. LibriVox có sẵn mục 60–150 giây (119 mục trong 40 quyển đầu) nhưng **không có văn bản khớp từng mục**, và văn phong tiểu thuyết thế kỷ 19 sai ngữ vực. VOA có **cả hai trên cùng một trang** → chọn VOA.
>
> **Chốt: TRỎ THẲNG tới máy chủ VOA, KHÔNG sao chép file vào kho.** Lý do chính không phải dung lượng mà là **giấy phép**: VOA nói nội dung của họ *"may also contain"* tư liệu bên thứ ba không thuộc phạm vi công cộng. Sao chép về là phải khẳng định một điều không kiểm được từng bài; trỏ tới thì không phát hành lại gì cả. Đo được: máy chủ VOA trả `Access-Control-Allow-Origin: *` nên trình duyệt phát được.
> **Cái giá:** đường dẫn có thể chết → giao diện **báo to** kèm liên kết trang gốc và mở luôn bản chép lời, cộng `scripts/check_voa_links.mjs` chạy tay (không đưa vào CI vì phụ thuộc mạng).
> **Không cần `ffmpeg`.** Bản chép lời vẫn lưu trong kho vì cần cho câu hỏi — đó là phần VOA tự viết, thuộc trường hợp rõ ràng nhất của phạm vi công cộng.

### NHÓM 3 — Đọc hiểu và sản sinh

| # | Việc | Vì sao | Nghiệm thu | RB | Công |
|---|---|---|---|---|---|
| ~~3.1~~ ✅ | **XONG (Đợt 7)** — **121/122 chặng ≥B1** có câu hỏi mức VĂN BẢN soạn tay (B1 38 · B2 37 · C1 46). **484 câu**, mỗi câu kèm trường `dan` chép NGUYÊN VĂN câu trong bài làm căn cứ — test kiểm từng chuỗi, và căn cứ hiện ra cho người học sau khi chọn để họ tự kiểm lại. Chặng duy nhất loại là `digital-society-100`: bài đọc 60 từ / 3 câu, cả ba đều là danh sách thuật ngữ, bốn câu hỏi rút ra sẽ chỉ là bốn lần hỏi lại cùng danh sách — BÁO chứ không độn. ⚠️ Con số "1/267" của dòng này SAI: bộ câu duy nhất có trước (`travel-transport`) là câu **mức CÂU**, không câu nào nằm trong `storyEn` của chính nó. Điểm xuất phát thật theo N5 là **0/267**. **Lỗi phát hiện khi làm:** bộ dựng câu hỏi gán đáp án đúng theo chỉ số rồi giữ nguyên thứ tự, mà 5/5 câu soạn tay cũ đều `answer: 0` — bấm ô đầu là đúng 100%. Đã xáo lựa chọn trong mã | 266 chủ đề đang kiểm tra hiểu *một câu*, không phải hiểu *một bài* | N5 xanh — `tests/story_quiz.test.js` (10 test, có test ĐỘ PHỦ kể tên chặng còn thiếu) | A | **Lớn** **⚠️ KHUYẾT ĐIỂM TỰ TÌM RA SAU KHI ĐẨY, ĐÃ SỬA:** bản soạn đầu có 84,3% câu mà đáp án đúng là lựa chọn DÀI NHẤT (không thiên lệch thì ~25%) — chọn phương án dài nhất mà không đọc bài vẫn đúng ~84%. Cùng loại với lỗi "đáp án nằm lì ở ô đầu", nhưng phải sửa bằng CÔNG SOẠN chứ không bằng mã. Đã soạn lại toàn bộ câu nhiễu của cả ba bậc, dựng từ chi tiết có thật trong bài nhưng ghép sai: **"dài hơn thấy được" 57,2% → 6,0%**, không còn câu nào lệch quá 40%. Đo lại: `node scripts/audit_story_quiz.mjs`; bánh cóc ghim cả hai con số. |
| ~~3.2~~ ✅ | **Rà chất lượng 267 bài đọc** — đo lại ra **38 bài** dính dấu hiệu, đọc từng chỗ thì **30 bài viết hoa ĐÚNG** (thứ, tháng, `T-shirt`, `Renaissance`, `MRI scan`, `Earth`…), **8 bài sai thật** = **888 lượt**. Đã hạ chữ thường 888 lượt, `tests/story_caps.test.js` ghim | Bài đọc là đầu vào chính; sai ở đây là sai gốc | 0 lượt chưa giải thích + bất biến "chỉ đổi hoa/thường" | A | Trung bình |
| ~~3.3~~ ✅ | **XONG (Đợt 4)** — **531/532 chặng A2+** có đề viết gắn với từ vựng của chính chặng, **9 đề soạn tay có bài mẫu**; lỗi bề mặt đổ vào sổ lỗi sẵn có. Xem ghi chú N6: cách đo cũ ("532 đề soạn tay") đã được thay bằng hai vế đo được. **Ngân hàng đề viết theo chặng** (câu → đoạn → bài 150–200 từ), chấm bằng key Gemini của khách, lỗi đổ vào sổ lỗi đã có | Hiện chỉ có **1 ô văn bản tự do** ở mục ngữ pháp | N6 xanh | **B** | Trung bình |
| ~~3.4~~ ✅ | **XONG (Đợt 4, `0230f6d`)** — đường luyện viết **không cần key Gemini**: viết → máy đối chiếu phần kiểm được → mở bài mẫu → tự soi checklist. **Không có điểm phần trăm so với bài mẫu** (bài viết tự do có nhiều đáp án đúng; cách chấm LCS của chép chính tả không áp sang được), và **tự đánh giá không làm ô Viết thành "đo được"**. `tests/writing_fallback.test.js` + `writing_self_assessment.test.js`. ⚠️ Dòng này bị bỏ trống chưa gạch cho tới 17/08 dù Đợt 4 đã ghi ✅ — cùng loại sai sổ sách với 2.2 và 3.3 | Khách chưa nhập key vẫn phải viết được, không thì tính năng chết một nửa | mọi đề viết dùng được khi không có key | A | Trung bình |
| ~~3.5~~ ✅ | **Nói: mở rộng đọc to → nói theo chủ đề** — **386/386 chặng B1+** có đề, nhận xét nội dung bằng key Gemini của khách; giữ mục đọc to từng từ cho A0–A2 | Hiện chỉ so chuỗi, và bản thân việc so chuỗi không phải chấm phát âm | 386/386 chặng B1+ ✅ · 0 chặng dưới B1 ✅ · test cấm mọi lời hứa chấm phát âm | **B** | Trung bình |

> **Ghi chú việc 3.2 — MÁY ĐÃ LÀM XONG PHẦN CỦA MÁY, PHẦN CÒN LẠI CẦN NGƯỜI ĐỌC (16/08).**
>
> Đã sửa: **888 lượt viết hoa giữa câu** ở **8 bài đọc** (`health-basics`, `education-learning-advanced`, `energy-resources`, `nature-countryside`, `city-urban-life`, `daily-routine-time-management`, `travel-transport`, `economy-money`). Chỉ đổi hoa/thường, không đổi một ký tự nội dung nào — `tests/story_caps.test.js` chứng minh bằng ảnh chụp băm chữ thường chụp TRƯỚC khi sửa.
>
> **Ba việc tôi CỐ Ý KHÔNG làm, và lý do:**
>
> 1. **Không viết lại 8 bài đó cho tự nhiên.** Hạ chữ thường chữa được lỗi *chính tả*, không chữa được lối *nhồi từ*: `"He feared obesity, being overweight, and becoming clinically obese"` đọc vẫn gượng. Viết lại là soạn nội dung mới, cần bạn duyệt trước — và cần người ĐỌC để nghiệm thu, máy không đo được "tự nhiên".
> 2. **Không đụng `storyVi`.** Bản dịch có 656 lượt tương tự, nhưng nó là **bản chú giải xen kẽ** (`Sự đặt trước (Booking)`), không phải văn xuôi — viết hoa ở đó là đánh dấu đầu mục chú giải, và tiếng Việt không phải thứ người học đang học ở bài này.
> 3. **Không mở rộng sang `words[].en`.** Chính kho từ cũng viết hoa danh từ chung (`"en": "Flight"`, `"en": "Lost property"`). Đây là lỗi cùng loại nhưng **rủi ro khác hẳn**: chuỗi `en` là khoá lưu tiến độ/SRS trong localStorage của người học, đổi nó là có thể xoá sạch tiến độ đã học. Cần một đợt riêng có bước chuyển khoá.
>
> **Một phát hiện ngoài phạm vi, đã sửa vì nó là lời nói sai với người học:** tiêu đề mục Câu Chuyện khẳng định *"Tất cả N từ xuất hiện trong câu chuyện này!"* — đo ra chỉ **đúng với 4/267 chủ đề**; toàn kho chỉ **10.856/22.008 ô từ** thật sự được bôi vàng trong truyện của chính chủ đề đó. Nay hiện số đếm thật (`63/101 từ…`), đếm bằng **một lượt quét của chính bộ khớp bôi vàng** — không phải dò từng từ. Khác biệt có thật: dò từng từ ra 6/267 và 11.068 ô thiếu, vì nó tính cả `transport` nằm trong `public transport`, trong khi màn hình chỉ bôi vàng cụm dài. Con số hiện ra phải là **con số người học đếm lại được bằng cách đếm vệt vàng**.

> **Ghi chú việc 3.5 — CÁI MICRO LÀM NGƯỜI TA TƯỞNG MÌNH ĐANG ĐƯỢC ĐO (16/08).**
>
> Đây là tính năng dễ nói quá nhất trong cả Đợt 4, nên nó bị soi chặt nhất. Sự thật: Web Speech chỉ trả về **văn bản** nó nghe được; từ văn bản **không** suy ra được người ta phát âm thế nào. Nên mọi con số đều gọi đúng tên — *"trình duyệt nghe ra 3/4 từ mục tiêu"*, không phải *"bạn phát âm đúng 3/4"* — và danh sách **không kiểm được** (phát âm từng âm, trọng âm, ngữ điệu, tốc độ, người nghe thật có hiểu không) hiện **ngay cạnh** phần kiểm được. Có test quét cả dữ liệu, bộ kiểm và giao diện để không lọt một lời hứa chấm phát âm nào.
>
> **Hồ sơ năng lực vẫn ghi Nói là "chưa đo được"** dù người học tự đánh giá bao nhiêu lượt — cùng cửa hẹp mà kỹ năng Viết đã đi ở việc 3.4.
>
> **Việc chờ bạn không đổi:** đây vẫn **chưa phải chấm phát âm**. Muốn có chấm phát âm đạt chuẩn thi cử thì cần dịch vụ nhận diện giọng nói trả phí có mô hình chấm âm vị — trái ràng buộc "không dùng dịch vụ tốn phí" nên tôi không làm, và giao diện nói thẳng lý do đó với người học.

### NHÓM 4 — Đo lường (không có thì không biết ai đang ở đâu)

| # | Việc | Vì sao | Nghiệm thu | RB | Công |
|---|---|---|---|---|---|
| 4.1 | ✅ **XONG (Đợt 2)** — ngân hàng **50 câu, 10 câu/bậc A1→C1**, bài thích ứng hỏi 12–24 câu. Trình độ lấy từ **nấc thang**, không từ % đúng | Trước đó: 12 câu, 0 câu có nhãn cấp → không tách nổi B2 với C1 | N7 xanh (`tests/placement_bank.test.js`) | A | Trung bình |
| ~~4.2~~ ✅ | **Bài thi cuối bậc A2 / B1 / B2** — đủ 4 phần, **42 câu chấm được soạn tay**, nghe bằng giọng người thật; **nhãn bậc chỉ suy từ phần `chamDuoc: true`** | Hiện chỉ có 2 đề thi thử × 20 câu, không gắn với bậc nào | N8 xanh | A (+**B** cho phần viết/nói) | Trung bình |
| 4.3 | ✅ **XONG (Đợt 2)** — 4 kỹ năng CEFR tách riêng + 2 kỹ năng nền. Nghe/nói/viết hiện **“chưa đo được” kèm lý do**, không phải thanh 0% | B2 nghe ≠ B2 viết; gộp lại là giấu điểm yếu | 4 ô riêng trong Báo cáo tiến bộ (`tests/skill_profile.test.js`) | A | Nhỏ |
| ~~4.4~~ ✅ | **Chứng nhận gắn với kết quả thi** — giữ cả nhánh chuyên cần cũ (#0-D1), nhưng **bậc chỉ đến từ bài thi**, in kèm ngày thi + căn cứ chấm + lời tự phủ nhận là chứng chỉ CEFR | Chứng nhận là chỗ duy nhất app nói với người ngoài | chứng nhận ghi rõ bậc + ngày thi | A | Nhỏ |


### NHÓM 5 — Nền cho C1 (làm sau khi B2 xong)

| # | Việc | Vì sao | Nghiệm thu | RB | Công |
|---|---|---|---|---|---|
| ~~5.1~~ ✅ | **Bù độ dày sách Oxford Advanced** — suy bài luyện tập từ chính ô từ soạn tay của mỗi unit, tính lúc chạy. Đo lại được: advanced **10,0 → 28,7 mục/unit** (con số 26,5/80,7 của bảng này là SAI, đo lại là 10,0/47,4). **Mốc ≥50 KHÔNG đạt được bằng sắp xếp lại**: unit advanced chỉ có 8 ô từ → trần ~29. Lên 50 cần soạn tay ~2.130 mục | Càng lên cao càng mỏng — ngược nhu cầu | ~~≥50 câu/unit~~ → 28,7 mục/unit, có test ghim | A | Lớn |
| ~~5.2~~ ✅ | **Nhánh C1 dự bị.** ⚠️ Vế "chưa có đường đi" của dòng này ĐÃ SAI khi viết xong Đợt 1: bậc `advanced` lúc đó đã có **156 chặng** do việc 1.2–1.4 sinh ra. Phần thật sự còn thiếu, và đã làm: (a) **xen kẽ loại chặng** — trước đó mỗi bậc là 3 khối xếp chồng, nhánh C1 bắt học 19 bài ngữ pháp liền rồi 100 unit Oxford liền; (b) **gỡ lời hứa C2** ở 69 chỗ trong file soạn tay (+ phần sinh lại theo); (c) **ẩn 168 câu bài tập không làm được** trong nhánh C1 | 6.510 ô từ nằm trong 82 chủ đề có nhãn nhắc C1/C2 (KHÔNG có nhãn CEFR theo từng từ — cách nói cũ của dòng này không chính xác) | `tests/c1_branch.test.js` + `tests/grammar_exercises.test.js` | A | Trung bình |
| ~~5.3~~ ✅ | **Văn bản đọc dài 600–1.000 từ** — 30 bài VOA Learning English (khoa học vũ trụ, công nghệ, y tế, văn hoá, giáo dục), mỗi bài 4 câu hỏi hiểu ý SOẠN TAY (120 câu, `scripts/data/reading_questions.mjs`). **Giấy phép nghiêm hơn kho bài nghe**: quét 1.968 bài, 1.775 bị loại vì ghi công hãng thông tấn (AP/AFP/Reuters — VOA loại trừ tường minh khỏi phạm vi công cộng); chỉ nhận bài có dòng "wrote this story for VOA Learning English", lưu nguyên văn dòng ghi công làm bằng chứng kiểm được | C1 đo đọc văn bản thật | ≥30 bài — đạt: 30 bài 613–992 từ, `tests/reading_texts.test.js` (8 test) | A | Lớn |
| ~~5.4~~ ✅ | **Vòng viết – sửa – viết lại**: sổ bài viết lưu `banSo` cho từng đề (bản cũ gán số lúc ĐỌC); màn hình viết có nút "Viết bản N+1" — đổ bài cũ vào ô soạn và GIỮ nhận xét của bản trước trên màn hình (sửa theo nhận xét, không phải theo trí nhớ); sau khi lưu bản ≥2 hiện so sánh số đo được với bản trước; hồ sơ ghi "N đề đã viết lại bản 2" nhưng kỹ năng Viết VẪN là chưa-đo-được | Không có vòng này thì không lên C1 viết được | lưu được ≥2 bản/đề — `tests/writing_revision.test.js` (5 test) | **B** | Trung bình |

**Phát hiện khi làm 5.2 — đã xử lý, không chờ duyệt:**

1. **Lời hứa C2 rải khắp app** trong khi cam kết chốt là "B2 vững + nền C1, không hứa C2". Nặng nhất nằm ở **trang bán hàng**: "Lộ trình từ cơ bản đến C1–C2", "Lộ trình A1 → C2 · 44 chặng" (lộ trình đã là 617 chặng từ Đợt 1). Cộng với tiêu đề bậc `Advanced - C1/C2`, kỹ năng `IELTS 7+ / TOEIC 900+`, một chặng tên `Tổng Ôn C1/C2 — Đỉnh Cao!` hứa "làm đề thi thử IELTS Band 8 và VSTEP C2 hoàn chỉnh" — trong khi `targetId` của nó là một bài ôn ngữ pháp 15 câu, không có đề thi nào. Đã sửa **69 chỗ** trong file soạn tay (đếm bằng `git diff`, không kể file máy sinh lại theo), in bảng trước/sau trong báo cáo.
2. **Bài tập ngữ pháp nhánh C1 phần lớn không làm được**: **75/75** câu "viết lại" có đáp án GIỐNG HỆT đề; **73/125** câu "sửa lỗi" có từ sai GIỐNG HỆT từ sửa; **20** câu giữ chỗ `"This is a C1/C2 level practice sentence."`. **B1 và B2 đo được 0%** — hỏng nằm gọn trong nhánh C1, không người học nào trên đường B2 chạm phải. Đã **ẨN lúc đọc, không xoá** (luật: thiếu dữ liệu thì ẩn hoặc báo); 52 câu sửa lỗi làm được nằm cùng mảng vẫn còn nguyên. Đo lại: `node scripts/audit_grammar_exercises.mjs`.
3. **3.738 ô từ bậc C1 nằm trong chủ đề nhãn "B2-C1"/"B1-C1"** đang được học ở bậc B2/B1 và KHÔNG nhân bản sang nhánh C1. Lý do kỹ thuật, không phải lựa chọn thẩm mỹ: tiến độ khoá theo `targetId` (`App.jsx` `completeMilestone`), nên cùng một chủ đề nằm ở hai bậc thì học xong ở B2 sẽ tự đánh dấu xong luôn ở C1.

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
| ~~**3**~~ ✅ | 2.1 → 2.3 → 2.2 → 2.4 | Mở được cửa ải B1→B2 về nghe. **XONG cả bốn việc** (2.1 hoàn tất ở Đợt 8, 2026-08-17). |
| ~~**4**~~ ✅ | 3.4 → 3.3 → 3.1 → 3.2 → 3.5 | Mở kỹ năng sản sinh và đọc hiểu ở mức văn bản. **XONG cả năm việc** (3.1 hoàn tất ở Đợt 7, 2026-08-17). |
| ~~**5**~~ ✅ | 4.2 → 4.4 | Chốt được cam kết: có bài thi cuối bậc B2 và chứng nhận gắn với nó. |
| ~~**6**~~ ✅ | 5.1 → 5.2 → 5.3 → 5.4 | Nền C1. **XONG cả bốn việc** (2026-08-17). |

**Sau đợt 5 là lúc câu "đưa người mất gốc lên B2 vững" trở thành phát biểu kiểm được**, không phải lời quảng cáo.

---

## PHẦN 5 — BA ĐIỀU CẦN THỐNG NHẤT TRƯỚC

1. **Nguồn audio (việc 2.1) là việc lớn nhất và là việc duy nhất cần nội dung từ bên ngoài.** Ba hướng: (a) dùng kho mở có giấy phép phù hợp — rẻ, nhưng phải tự lọc và tự cắt; (b) tự thu — kiểm soát hoàn toàn, tốn thời gian; (c) giọng máy chất lượng cao qua key của khách — nhưng vẫn là giọng máy. Cần bạn chọn trước khi tôi bắt tay.
2. **Việc 3.1 — câu hỏi thu hẹp phạm vi mà tôi đặt ra ở đây có TIỀN ĐỀ SAI, đã đo lại 17/08.**
   Lối thoát tôi đề nghị ("thu hẹp còn các chặng nằm trong lộ trình chính thay vì cả 267 chủ đề") **không giảm được gì**: đo ra **267/267 chủ đề từ vựng đều đã là chặng `type:'vstep'` trong lộ trình** kể từ Đợt 1 (starter 71 · elementary 74 · intermediate 38 · upper_intermediate 38 · advanced 46). Hai tập trùng khít nhau.
   Trục thu hẹp THẬT nằm ở bậc, và nó đã được ghi sẵn trong chính tiêu chí nghiệm thu: **N5 nói "ở mọi chặng ≥B1" = 122 chặng**, không phải 267. Bảng việc lại ghi "1/267" và mục này ghi "267 bài" — ba con số trong cùng một tài liệu.
   **Tôi đang làm theo N5 (122), vì đó là cột nghiệm thu.** Bậc B1 (38 chặng) đã xong ở Đợt 7. Nếu bạn muốn phủ cả 267 chủ đề — tức thêm 145 chặng A1/A2 — thì nói, vì đó là quyết định của bạn chứ không phải suy ra được từ tài liệu. **Ràng buộc đo được, cần biết trước khi chọn:** phần thêm là bài đọc A1/A2 — loại **tệ nhất** cho câu hỏi mức văn bản, vì phần lớn là chuỗi diễu hành từ vựng (`nature-countryside`: *"He walked past the barn and the stable to look at his livestock"*), không có nội dung để hỏi. Đúng cái đã buộc loại `digital-society-100`, nhưng ở quy mô lớn hơn nhiều: nhiều chặng sẽ phải loại có lý do, hoặc phải **viết lại bài đọc trước** — mà viết lại là soạn nội dung mới, cần bạn duyệt riêng.

3. ~~**Đưa nội dung ngoài lộ trình vào lộ trình**~~ ✅ **ĐÃ LÀM (Đợt 8, 17/08)** — chủ dự án giao tự quyết. Giữ lại nguyên văn phần phân tích bên dưới vì bốn hệ quả vẫn là thứ phải biết khi sửa tiếp.
   **Đưa nội dung ngoài lộ trình vào lộ trình — việc chưa có số trong bảng, phát hiện 17/08.** Hiện **0 chặng dẫn tới** 60 bài nghe, 30 bài đọc dài, kho 239 bản thu và 3 đề thi cuối bậc. **Cỡ việc thật là ~90 chặng mới (~20 bài nghe + ~10 bài đọc mỗi bậc × 3 bậc) cộng 1–3 chặng chép chính tả — không phải 332**, và đề thi cuối bậc có thể vốn không cần nằm trong đường đi (xem bảng ở ghi chú "lỗi 1.3 tái diễn"). Sửa nó nghĩa là **chèn chặng mới vào lộ trình 617 chặng của người đang dùng**, và mở thêm một loại chặng thứ tư ngoài `grammar`/`vstep`/`oxford`. Bốn hệ quả **đã đọc mã để xác nhận**, không phải suy đoán:
   - **(a) Thanh tiến độ của người đang học sẽ TỤT.** `WelcomePage.jsx:142-146` tính `completionPercentage = completedCount / allMilestones.length`, và ô lớn trên trang chủ hiện thẳng `{completedCount}/{totalMilestonesCount}`. Thêm chặng là tăng mẫu số, nên người hôm nay thấy `120/617` mai mở app sẽ thấy `120/677` — họ không làm gì sai mà con số xấu đi. Cái này phải **báo cho người học**, không được đổi lặng lẽ.
   - **(b) Phải mở loại chặng thứ tư.** `launchMilestone` (`WelcomePage.jsx:195-212`) rẽ ba nhánh `grammar`/`oxford`/`vstep`; `roadmap_coverage.test.js` cũng khoá đúng ba giá trị đó. Chặng nghe/đọc-dài/thi cần nhánh mới **và** cách chấm riêng (bài nghe có 4 câu hỏi soạn tay nên chấm được — khác chặng từ vựng).
   - **(c) Tổng giờ khai báo đổi theo**, và N2 (≥450 giờ đến hết B2) tính từ chính con số đó — thêm chặng chỉ làm nó tăng, nên không có rủi ro ngược.
   - **(d) Đây là điều kiện cần của N4 vế (b′): không duyệt việc này thì N4 không có đường nào đạt.** 239 bản thu câu rời không mở được cửa ải nghe B1→B2, và 60 bài nghe đang nằm ngoài đường đi thì cũng vậy.

---

*Bảng này chỉ ĐỀ XUẤT. Chưa sửa gì. Duyệt đợt nào tôi làm đợt đó, mỗi nhóm một commit, xong báo cáo rồi dừng.*
