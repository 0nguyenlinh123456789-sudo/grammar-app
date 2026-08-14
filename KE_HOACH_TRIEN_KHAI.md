# KẾ HOẠCH TRIỂN KHAI (ĐÃ DUYỆT + ĐIỀU CHỈNH 2026-08-12)
Dựa trên: `AUDIT_SU_PHAM.md` (commit `d595572`). Trạng thái từng hạng mục ghi ở đầu mỗi mục.

## ⛔ RÀNG BUỘC TUYỆT ĐỐI (chỉ đạo của chủ dự án)

**Không đụng vào cụm IELTS Nền Tảng dưới mọi hình thức** — đây là khu vực học cá nhân của chủ dự án, chỉ chạy localhost:
- `src/pages/IeltsFoundationPage.jsx`, `src/data/ieltsFoundationData.js`, `src/data/ieltsPrepData.js`, `src/data/ieltsAdvancedData.js`, `src/data/ieltsRoadmap.js`, `src/data/buildIeltsRoadmap.js`
- `src/utils/localOnly.js` (cờ `SHOW_IELTS_FOUNDATION`), các dòng ignore trong `.gitignore`/`.vercelignore`, toàn bộ `public/ielts-foundation/` + `public/ielts-prep/`
- Kể cả các nhãn "Phòng ảo Speaking/Writing AI" bên trong cụm này: **giữ nguyên**, không sửa chữ, không refactor, không "dọn dẹp".
- Hạng mục #12 cũ trong audit (số phận 30GB media): **hủy bỏ, ngoài phạm vi**.
- Ngoại lệ duy nhất được phép: `completeMilestone` gọi từ `IeltsFoundationPage.jsx:354` sẽ nằm trong **allowlist không cần evidence** của hạng mục #1 — tức là code bên ngoài nhận diện và bỏ qua nó, không sửa file của cụm.

## THỨ TỰ THI CÔNG (cập nhật 2026-08-12, đã duyệt)

**(a) báo cáo hỏng theo item → (b) lọc runtime tạm → (c) chặn tái phát ở CI + xóa fallback generator → #0 → #3 → #2 → #1 → #1b**

### TRẠNG THÁI: (a) ✅ · (b) ✅ · (c) ✅ · (d) ✅ · (e) ✅ · (f) ✅ · (g) ✅ (2026-08-12: đo trùng lặp — 271 topic → 172 thực chất, 6.618 từ duy nhất so với 22.900 công bố, 47 topic trùng ID không mở được; ma trận chất lượng — nghe hiểu/đọc hiểu chung 1 ngân hàng câu, ~7 cơ chế học thật; tỉ lệ sản sinh 0,42%; tái gán 2 hội thoại rehomed → shopping/food) · (2026-08-12: xóa toàn bộ fallback engine nhóm A theo nguyên tắc AUDIT §9.5 — PhraseLearning template, scenario siêu thị, FALLBACK_WORDS, đề bịa, chấm sai IPA, giải thích bịa; sửa SpeedQuiz chấm theo option; luật typing-fake-meaning 393 câu; ma trận tính năng × topic → BAO_CAO_MA_TRAN_TINH_NANG.md) — chi tiết bên dưới. Tiếp theo: #0 (danh sách chuỗi đã duyệt, chờ sửa; nhóm B của đợt rà (e2) gộp vào #0).

- **(b) đã ship**: `src/utils/contentFilter.js` chặn 5 nhóm rác bài tập + rác textbook + rác lý thuyết ở runtime, log dev từng item, unit <12 item hợp lệ tự ẩn (hiện 0/260 unit bị ẩn). Nối tại `loadOxfordBook` (`App.jsx`), UI ẩn unit ở `MainLayout`. Lint + 26 test + validator xanh.
- **Phát hiện mở rộng trong lúc làm (b)/(c)** — ngoài kiểm kê (a): (1) **1.000/1.000 câu quiz unit 51–100 có distractor literal `wrong_word_1/2/3`**; (2) **~660 mục lý thuyết ngụy tạo trên CẢ 3 SÁCH** — "họ từ" ghép hậu tố dạy từ không tồn tại ("reviseer", "washbasinful", "nounful") + collocation sai văn phạm ("have a asthma"); (3) 381 câu textbook filler ("The correct word is [blank]"); (4) `crossRefNotes` curated trong generator là code chết chưa từng vào output. Tất cả đã bị filter chặn.
- **(c) đã ship**: 3 generator xóa sạch 11 nhánh fallback, `validateRawUnit` + `blankExample` + `assertCleanOutput` — gặp dữ liệu bất thường là THROW, không ghi file dở dang; `scripts/validate_content.mjs` 2 tầng (thô-vs-baseline + hiệu-dụng-sạch-100%) chạy trong `npm test`, đã negative-test (chèn rác → exit 1). `oxfordPreIntDataPart2.js` + generator của nó đã xóa (QĐ4).
- **Lưu ý cho #3**: KHÔNG chạy lại generator trước khi (i) thêm shuffle đáp án runtime vào `QuizTab`, (ii) sửa các câu ví dụ gốc không chứa từ của chính nó (generator giờ sẽ throw đúng chỗ); sau khi sinh lại file nào, hạ `RAW_BASELINE` của file đó về 0 trong `scripts/validate_content.mjs`.
- **#3 ĐỢT 1 ĐÃ SHIP (2026-08-13) — sinh lại toàn bộ Oxford Pre-Int**: cả hai điều kiện (i)/(ii) đã xong; 3 file `oxfordPreIntData*.js` sinh lại từ generator sạch, baseline bánh cóc của cả 3 về **0** (xoá 3.041 vi phạm thô tồn đọng). Chi tiết từng unit: `BAO_CAO_SINH_LAI_PREINT.md`. Điều kiện (ii) giải quyết bằng **hợp đồng đục lỗ curated** thay vì sửa câu của người soạn: mục từ nào xuất hiện trong câu ở dạng chia khác (`spill` → `spilled`) hoặc là mẫu câu có chỗ trống (`tell someone to` → `told him to`) thì khai báo `blank: "<đoạn có thật trong câu>"`; không có đoạn liền mạch nào đại diện được thì `noBlank: true` → BỎ item. Generator tuyệt đối không suy đoán dạng chia. Kèm theo: bỏ trường `trans` máy-sinh của phần luyện nói (150 ô), xoá hẳn trường chết `wordFamily` khỏi 3 file này (2.313 → 1.520 giá trị còn lại, nằm ở `oxfordData*.js` + `oxfordAdvancedData*.js`).
- **#3 ĐỢT 2 ĐÃ SHIP (2026-08-13) — mổ trực tiếp 10 file không có generator**: `scripts/clean_legacy_data.mjs` xoá 1.520 `wordFamily` + 553 cặp `example`/`viExample` máy + 406 câu bài tập bịa + 187 mục lý thuyết ngụy tạo + 100 ô `speaking.trans` máy + 57 bài/49 mục trở thành rỗng; xoá `oxfordAdvancedData.js` (3 unit chết, QĐ4). **`scripts/content_baseline.json` nay là `{}`** — không còn vi phạm tồn đọng nào trong toàn bộ dữ liệu thô.
- **#3 ĐỢT 3 ĐÃ SHIP (2026-08-13) — dứt điểm phần chuỗi**: 250 chuỗi hướng dẫn bài tập tiếng Anh của unit 1–50 → tiếng Việt (theo bảng đã duyệt); 8 mô tả chủ đề tiếng Anh trong `vocabIeltsNew15-18.js` → tiếng Việt theo khuôn "N từ vựng trình độ cao về … — dùng cho ôn thi IELTS", **dùng số từ THỰC ĐO**; xoá `vocabDailyNew24.js` (2 topic chết, đo được 0 và 3 từ mới, id trùng khít 2 topic đang dùng → nối vào là tái tạo bug 47 topic).
- **BACKLOG từ đợt 3**: 3 từ của `sports-fitness-daily` chưa có trong kho — `draw / tie` (hoà tỉ số), `medal` (huy chương), `racket` (chiếc vợt). Cân nhắc bổ sung thủ công vào một topic thể thao đang dùng; không gấp.
- **PHÁT HIỆN MỚI đợt 3 — 190/244 chủ đề khai SAI số từ trong tiêu đề**: mẫu "(100 Từ)" viết tay trong khi số từ thực là 50–99 (tệ nhất: khai 100 / thực 50). Đã sửa đúng con số cho 3 tiêu đề IELTS chạm tới trong đợt này; 187 tiêu đề còn lại **chờ chủ dự án duyệt**. Đề xuất: BỎ HẲN con số khỏi tiêu đề (UI đã tự hiển thị `activeTopic.words.length` ở chỗ khác — con số viết tay chỉ có đường trôi khỏi dữ liệu).

Lý do đảo #3 lên trước #1 (chỉ đạo): bật gate độ chính xác khi dữ liệu Oxford còn hàng trăm item không thể trả lời đúng sẽ chặn cứng người học. Dọn dữ liệu xong mới siết gate.

### Quyết định bổ sung đã chốt
- **QĐ4 chốt: XÓA `oxfordPreIntDataPart2.js`.**
- **#0 nhóm E**: sửa E1 (`AccessGate.jsx:135` → mô tả trung tính ngay, kèm TODO khôi phục sau khi #2 có test chứng minh); sửa E2 (badge kỹ năng trên thẻ milestone → tên thật của các mode đang có); giữ E3 ("Siêu Cấp"); E4 ghi đầy đủ "ước lượng dựa trên từ vựng & ngữ pháp".
- **Danh hiệu/thành tích tách theo loại tuyên bố**: huy hiệu *chuyên cần* (đã bỏ nhãn CEFR) đếm cả milestone chưa xác minh — thưởng nỗ lực; mọi thứ *tuyên bố năng lực* (chứng nhận, lên bậc, mở khóa chặng, quy đổi band) chỉ đếm milestone đã xác minh.

### Kết quả (a) — hỏng theo ITEM, 3 file production (đã chạy 2026-08-12, đã loại 200 false-positive câu hỏi từ loại)

| File | Tổng item | Item hỏng | % | Phân bố |
|---|---|---|---|---|
| `oxfordPreIntData.js` (unit 1–50) | 5.000 | **1.008** | **20,2%** | dragDrop 807/1.600 (50,4%) · typing 198/1.000 (19,8%) · quiz 2/1.000 (0,2%) · textbook 1/1.300 (0,1%) · speaking 0/100 |
| `oxfordPreIntData51_75.js` | 2.375 | **600** | **25,3%** | dragDrop 600/800 (75%) — toàn bộ "liên quan tới X"; quiz/typing/textbook/speaking **0%** |
| `oxfordPreIntData76_100.js` | 2.375 | **600** | **25,3%** | y hệt file trên |
| **Tổng** | **9.750** | **2.208** | **22,6%** | |

Theo unit: file 1 — tốt nhất `pre_1` 5/100 hỏng, trung vị ~20/100, tệ nhất `pre_2` 28/100; file 2–3 — **đúng 24/95 hỏng ở mọi unit** (3 nhóm dragDrop template). 0 unit sạch hoàn toàn, nhưng hỏng **tập trung đúng vào các nhóm sinh máy**, không rải ngẫu nhiên → phương án **cắt bỏ** (không dựng lại): sau khi cắt, mỗi unit còn 16–20 quiz sạch + 16 typing sạch + 8–16 dragDrop sạch + textbook nguyên vẹn (~2.400 câu, 99,9% sạch).

## CÁC QUYẾT ĐỊNH ĐÃ CHỐT

| # | Quyết định |
|---|---|
| QĐ1 | Ngưỡng đạt = **80%**, tính trên **lần trả lời đầu tiên của mỗi câu trong phiên** (làm lại câu vừa sai không tính vào tỉ lệ). Unit có **>70% câu là trắc nghiệm** → ngưỡng riêng **85%** (bù xác suất đoán mò 25%). Làm lại không giới hạn, không phạt. Mục tiêu: chặn chứng nhận sai, không làm khó người học |
| QĐ2 | **Tách streak khỏi thành tích.** Streak + daily goal = hoàn thành *một phiên học thực sự* (làm hết bài, bất kể đạt hay không) — đo sự đều đặn, không phạt người đang chật vật. XP thưởng + milestone + danh hiệu = **chỉ khi đạt ngưỡng**. Hai loại phần thưởng, hai đường ống riêng |
| QĐ3 | **Không AI-enrich ship thẳng.** 100% curated, chấp nhận ít bài tập hơn. Nếu sau này dùng AI: chỉ xuất **file đề xuất riêng** (không phải dữ liệu ship), chủ dự án duyệt từng lô 100 từ rồi mới nạp |
| QĐ4 | `oxfordPreIntDataPart2.js`: đã chạy validator (kết quả bên dưới) → **đề xuất XÓA** — chờ chủ dự án xác nhận |

### Kết quả validator cho QĐ4 (đã chạy 2026-08-12, prototype `validate_content.mjs`)

| File | Unit PASS | Vi phạm chính |
|---|---|---|
| `oxfordPreIntDataPart2.js` (chết) | **0/50 (0%)** | 667 dragDrop word rác ("Từ", "frequently use X"), 170 đáp án "X synonym" |
| `oxfordPreIntData.js` (đang dùng) | 0/50 (0%) | 824 dragDrop rác + 200 đáp án rác |
| `oxfordPreIntData51_75.js` (đang dùng) | 0/25 (0%) | 601 dragDrop rác — **biến thể mới: "liên quan tới washbasin"** (cụm tiếng Việt làm item kéo-thả) |
| `oxfordPreIntData76_100.js` (đang dùng) | 0/25 (0%) | 601 dragDrop rác, cùng biến thể "liên quan tới X" |

Hai dữ kiện quyết định cho QĐ4:
1. **Part2 cùng bệnh** với dữ liệu đang dùng: 0% pass.
2. **Part2 trùng dải id `pre_51`…`pre_100`** với 2 file 51–100 đang dùng — về mặt kỹ thuật *không thể* nối vào app song song (đụng id); nó là bản build cũ của cùng 50 unit. → Xóa không mất nội dung gì (git history vẫn giữ).

**Phát hiện mới ngoài audit:** tổng rác dragDrop thực tế là **~2.700 item** trên cả 4 file (audit trước chỉ grep bắt được mẫu `"Từ"` = 726). Biến thể "liên quan tới X" của 2 file 51–100 do bản compile khác sinh ra — phạm vi hạng mục #3 mở rộng tương ứng, validator đã bắt được cả hai biến thể.

---

## HẠNG MỤC #0 — Gỡ mọi lời hứa sai khỏi giao diện (LÀM NGAY, TRƯỚC TẤT CẢ)

**Trạng thái: danh sách chuỗi text bên dưới CHỜ DUYỆT — chưa sửa gì.**

### Danh sách chuỗi cần sửa (đề xuất từng dòng)

**Nhóm A — Danh hiệu CEFR theo số click (nghiêm trọng nhất, lan ra ảnh chia sẻ):**

| # | Vị trí | Hiện tại | Đề xuất |
|---|---|---|---|
| A1 | `src/pages/WelcomePage.jsx:117-124` (`getRankName`) | 6 danh hiệu gắn nhãn CEFR theo số milestone: "🏆 Bậc Thầy (C2 Master)", "🌟 Chuyên Gia (C1 Expert)", "⭐ Chiến Binh (B2 Warrior)", "🌿 Người Khám Phá (B1 Explorer)", "🌱 Tân Binh (A2 Starter)", "👶 Mới Bắt Đầu (A1 Beginner)" | Bỏ toàn bộ nhãn CEFR, giữ danh hiệu chuyên cần: "🏆 Bậc Thầy Chuyên Cần", "🌟 Chuyên Gia Bền Bỉ", "⭐ Chiến Binh Chăm Chỉ", "🌿 Người Khám Phá", "🌱 Tân Binh", "👶 Mới Bắt Đầu" |
| A2 | `src/utils/shareCard.js:56` | Vẽ nguyên chuỗi rank lên ảnh PNG chia sẻ | Tự khỏi sau A1 (cùng nguồn chuỗi); kiểm tra lại ảnh không còn chữ CEFR nào khác |

**Nhóm B — Lời hứa "4 kỹ năng" / "phát âm" ở trang bán hàng & onboarding:**

| # | Vị trí | Hiện tại | Đề xuất |
|---|---|---|---|
| B1 | `src/components/access/AccessGate.jsx:134` | "Đủ 4 kỹ năng — Nghe – Nói – Đọc – Viết luyện xen kẽ trong từng chủ đề, không học lệch." | "🎧 Học đủ chiều — Ngữ pháp & Từ vựng chuyên sâu, kèm đọc hiểu song ngữ, luyện nghe cơ bản và trò chơi ôn tập." |
| B2 | `AccessGate.jsx:104` | "…mở toàn bộ kho ngữ pháp, từ vựng, IELTS, **luyện phát âm**, trò chơi và trợ lý AI." | "…mở toàn bộ kho ngữ pháp, từ vựng luyện thi (VSTEP/IELTS), phiên âm IPA toàn bộ từ vựng, trò chơi và trợ lý AI." (từ "IELTS" trần dễ hiểu nhầm là khóa IELTS — thực tế production chỉ có *từ vựng* gắn tag IELTS) |
| B3 | `AccessGate.jsx:188` (gói Premium) | "Trợ lý AI viết/**nói**/ảnh" | "Trợ lý AI viết/ảnh/hỏi-đáp" — không tồn tại AI chấm nói |
| B4 | `src/components/common/OnboardingWizard.jsx:42` | "Tớ sẽ cùng cậu luyện đủ 4 kỹ năng Nghe – Nói – Đọc – Viết theo lộ trình từ A1 đến C2, mỗi ngày chỉ cần 15 phút." | "Tớ sẽ cùng cậu học Ngữ pháp – Từ vựng – Đọc hiểu theo lộ trình rõ ràng, kèm luyện nghe nói cơ bản — mỗi ngày chỉ cần 15 phút." |

**Nhóm C — Nhãn "AI chấm phát âm" sai bản chất (thực tế: so khớp transcript trình duyệt):**

| # | Vị trí | Hiện tại | Đề xuất |
|---|---|---|---|
| C1 | `src/components/vocab/SpeakingPractice.jsx:134` | "AI NGHE THẤY:" | "TRÌNH DUYỆT NGHE ĐƯỢC:" |
| C2 | `SpeakingPractice.jsx:143` | "Tuyệt vời! Phát âm chuẩn!" | "Khớp từ! Trình duyệt nhận ra đúng từ này." |
| C3 | `SpeakingPractice.jsx:112` | "Hãy phát âm chuẩn từ sau:" | "Hãy đọc to từ sau:" |
| C4 | `src/pages/GamesPage.jsx:510` | "AI sẽ chấm phát âm của bạn" | "trình duyệt sẽ kiểm tra có nhận ra từ bạn đọc không" |
| C5 | `GamesPage.jsx:518` | "✅ Phát âm chuẩn! +12 XP" | "✅ Nhận diện đúng từ! +12 XP" |

**Nhóm D — Chứng nhận in trình độ đầu vào như thành tựu:**

| # | Vị trí | Hiện tại | Đề xuất |
|---|---|---|---|
| D1 | `src/components/progress/LearningReport.jsx:50` (CertificateModal) | "Đã hoàn thành lộ trình với kết quả đánh giá đầu vào" + `{levelLabel}` cỡ chữ 5xl như thành tích | Đổi thành chứng nhận chuyên cần: tiêu đề "Chứng nhận hoàn thành lộ trình", dòng chính "Đã hoàn thành 44/44 chặng học", trình độ đầu vào chỉ ghi dòng nhỏ "Trình độ đầu vào (tham khảo): X". Sau #1, điều kiện cấp = 44 chặng **đã xác minh** |

**Nhóm E — Xét nhưng đề xuất GIỮ (chờ ý kiến):**

| # | Vị trí | Hiện tại | Nhận định |
|---|---|---|---|
| E1 | `AccessGate.jsx:135` | "kèm test đầu vào xếp đúng trình độ" | Hiện sai (placement không điều hướng) nhưng **thành đúng ngay sau #2** — vì #2 làm ngay sau #0, đề xuất giữ nguyên |
| E2 | `WelcomePage.jsx:140-144` (`getSkillBadges`) | Badge 🎧🗣️📖✍️ trên thẻ milestone từ vựng | Các mode Nghe/Nói/Đọc/Viết *có tồn tại* trong topic từ vựng (dù nông) — ranh giới chấp nhận được, đề xuất giữ; nếu muốn chặt hơn thì bỏ 🗣️ Nói |
| E3 | `index.html:17` | "…Tiếng Anh **Siêu Cấp**" | Cường điệu kiểu thương hiệu, không phải cam kết năng lực — đề xuất giữ |
| E4 | `WelcomePage.jsx:466` | "quy đổi band và phân tích từng kỹ năng" | Mock test có làm cả hai (dù band là ước lượng tuyến tính) — đề xuất thêm 1 chữ: "quy đổi band **ước lượng**" |

*Ngoài phạm vi #0 theo ràng buộc tuyệt đối: mọi chuỗi trong cụm IELTS Nền Tảng ("Phòng ảo Speaking AI"… ) — không đụng.*

**Nhóm F — bổ sung (h3) 2026-08-12, sau đợt đo (g):**

| # | Vị trí | Hiện tại | Sửa thành |
|---|---|---|---|
| F1 | `VocabVstepPage.jsx:22` (MODES) + `WritingPractice.jsx:73` | Bước 6 "Luyện Viết" — thực chất gõ 1 từ theo nghĩa | **"Gõ Từ Theo Nghĩa"** (đã duyệt); header trong WritingPractice → "Gõ Từ: Từ x/y". GIỮ tên "Gia Sư Writing" ở Oxford PracticeTab — đúng bản chất |
| F2 | `VocabVstepPage.jsx:19` (MODES "Nghe Hiểu") + `ListeningComprehension.jsx:103` + `ReadingComprehension.jsx:58,46` | "Nghe Hiểu"/"Kiểm Tra Đọc Hiểu" — hai tên cho MỘT ngân hàng câu (chọn 1/4 bản dịch), khác kênh trình bày | **ĐÃ DUYỆT PA1**: "Nghe – Chọn Nghĩa" / "Đọc – Chọn Nghĩa" (chủ dự án 2026-08-12: chữ "hiểu" quen thuộc chính là thứ tạo kỳ vọng sai). (mockTestData "Nghe hiểu/Đọc hiểu" là nhãn phần thi mock — giữ; cụm IELTS — không đụng) |
| F3 | Con số "22.900 từ" | **Không tồn tại trong UI người học** (đã quét toàn src + index.html + README: 0 chỗ). Chỉ nằm ở tài liệu nội bộ: `AUDIT_SU_PHAM.md` (3 chỗ — GIỮ làm số liệu lịch sử, đã có đính chính §9.4b), `KE_HOACH_TRIEN_KHAI.md:17`, `CONTENT_INVENTORY_PROMPT.md:17`, comment `contentFilter.js:283` | Sửa comment contentFilter + CONTENT_INVENTORY_PROMPT → "22.204 mục luyện tập / 6.618 từ duy nhất". Câu chuẩn khi cần quảng bá: **"hơn 6.600 từ vựng, hơn 22.000 lượt luyện tập"** — cấm mọi chuỗi "22.900 từ"/"hơn 20.000 từ" trong UI tương lai |

### Nghiệm thu #0
1. `grep -rn "C2 Master\|C1 Expert\|B2 Warrior\|B1 Explorer\|A2 Starter\|A1 Beginner" src/` → 0 kết quả.
2. `grep -rn "Đủ 4 kỹ năng\|4 kỹ năng Nghe" src/` → 0 kết quả.
3. `grep -rn "AI NGHE THẤY\|Phát âm chuẩn\|chấm phát âm" src/` → 0 kết quả (trừ cụm IELTS nếu có — được miễn).
4. Ảnh chia sẻ tải xuống không chứa nhãn CEFR (kiểm tay).
5. Không file nào thuộc cụm IELTS Nền Tảng xuất hiện trong `git diff --stat`.

---

## HẠNG MỤC #2 — Nối placement test vào lộ trình (làm sau #0) — **ĐÃ SHIP 2026-08-13**

**Đã thi hành:** `src/utils/roadmapNav.js` (mới, thuần, 10 test ở `tests/roadmap_nav.test.js`) + `WelcomePage.jsx` + `AccessGate.jsx`. Tab lộ trình mặc định = cấp độ đề xuất (dẫn xuất `manualTab || recommendedLevel || 'all'`, không phải state khởi tạo một lần → đổi band là tab nhảy ngay, không cần tải lại trang); cấp độ dưới trình độ gắn nhãn "Ôn lại — dưới trình độ của bạn" nhưng KHÔNG khoá; làm xong test đầu vào là app mở thẳng chặng phù hợp. Chuỗi E1 ở `AccessGate` đã khôi phục theo đúng cơ chế thật.

**Đầu vào `topicFamilies.json` — kết quả RỖNG, không phải bị bỏ qua:** đo được chỉ 1/25 chặng vstep nằm trong họ chủ đề trùng lặp, và **0 họ bị lộ trình dạy quá một lần** → không có gì để xếp lại. Đồng thời xác nhận 44/44 chặng vẫn trỏ đúng đích sau đợt đổi id `-pN` (25 vstep + 19 grammar, 0 hỏng), và 44 `targetId` đều duy nhất (khoá đánh dấu hoàn thành không đụng nhau).


**ĐẦU VÀO BẮT BUỘC (bổ sung 2026-08-12):** `src/data/topicFamilies.json` (33 họ chủ đề, sinh bởi `scripts/build_topic_families.mjs`) — lộ trình phải xếp topic cùng họ theo trình tự khó dần, không để 10 topic sức khỏe rải rác khắp lộ trình. Kho topic đã khử trùng id (267 topic duy nhất, xem KE_HOACH_KHU_TRUNG_LAP.md).

Thiết kế giữ nguyên như bản kế hoạch đã duyệt, tóm tắt:
- Map tường minh `PLACEMENT_TO_ROADMAP` (chú ý `'upper-intermediate'` → `'upper_intermediate'` — hyphen vs underscore, có test regression riêng).
- Hàm thuần `pickNextMilestone(allMilestones, completedIds, recommendedLevelId)`: milestone chưa xong đầu tiên **từ level đề xuất trở lên**; fallback hành vi cũ khi chưa có placement.
- `WelcomePage.jsx:95-98` dùng hàm mới; tab mặc định = level đề xuất; card gợi ý gắn hành động thật; level dưới trình độ thu gọn "Ôn lại" (vẫn mở được — không khóa).
- `OnboardingWizard.jsx:106`: làm xong placement → vào thẳng `nextMilestone`.
- File: `src/utils/placement.js`, `src/utils/roadmapNav.js` (mới), `src/pages/WelcomePage.jsx`, `src/components/common/OnboardingWizard.jsx`, `tests/core.test.js`.

Nghiệm thu (giữ nguyên): band advanced → CTA trỏ milestone Advanced đầu tiên; band upper-intermediate map đúng (test tự động); chưa làm test → hành vi cũ; đổi band → đề xuất đổi ngay không reload; `LEVELS` có ≥1 importer.

---

## HẠNG MỤC #3 — Dọn rác dữ liệu Oxford Pre-Int (làm sau #2, TRƯỚC #1)

**Điều chỉnh theo QĐ3 + phát hiện mới của validator:**

1. **Phạm vi rác mở rộng**: ngoài 3 mẫu trong audit, validator phát hiện biến thể **"liên quan tới X"** trong `oxfordPreIntData51_75.js` và `76_100.js` (601 item/file — bản compile của 2 file này khác bản gốc). Sửa **cả ba** generator: `generate_preint_data.js`, `_51_75.js`, `_76_100.js`.
2. **Sửa generator theo nguyên tắc 100% curated**: xóa toàn bộ nhánh fallback tự sinh (synonym máy, collocation "use the word X", wordFamily cắt chuỗi, dragDrop nhóm "liên quan tới", dragDrop nhóm từ-ngẫu-nhiên-trong-ví-dụ). Item không có dữ liệu curated → **không sinh**. Bỏ ràng buộc "đúng 20 câu/unit".
3. **Không có nhánh AI-enrich trong luồng ship.** (Tùy chọn tương lai theo QĐ3: script xuất `preint_enrichment_PROPOSAL.json` — file đề xuất thuần, không được generator đọc; chủ dự án duyệt từng lô 100 từ; chỉ sau khi duyệt mới copy tay vào rawUnits. Không làm trong đợt này trừ khi được yêu cầu.)
4. **Shuffle đáp án chuyển sang runtime** (`src/components/oxford/QuizTab.jsx`) — bỏ `Math.random()` lúc generate.
5. **Validator thành chốt chặn chính thức**: `scripts/validate_content.mjs` (nâng cấp từ prototype đã chạy — bắt cả 2 biến thể rác + tiếng Việt trong `word`), thêm `npm run validate:content`, gọi trong `npm test`. **Quy trình mới: mọi dữ liệu sinh lại phải qua validator TRƯỚC khi commit** — đây chính là lỗ hổng khiến 726+ item rác lọt vào lần đầu.
6. **Dữ liệu chết**:
   - `oxfordPreIntDataPart2.js`: **đề xuất xóa** (0% pass + trùng id `pre_51`–`pre_100` với dữ liệu đang dùng — không thể nối). *Chờ xác nhận của chủ dự án theo QĐ4.*
   - `oxfordAdvancedData.js` (3 unit chết): xóa.
   - `vocabDailyNew24.js` (2 topic bị bỏ quên): nối vào aggregate `vocabVstepData.js` **sau khi qua validator**.
7. **Bổ sung từ đợt (e) 2026-08-12** (hiện đã bị chặn ở runtime, #3 dọn tận gốc trong data):
   - `speaking.trans` máy-sinh (250 câu: "[Tạm dịch]…" Advanced, công thức Pre-Int): sinh lại **bản dịch thật do người soạn/duyệt**, hoặc bỏ hẳn trường trans ở các câu đó. Baseline `speaking-trans` về 0 sau khi dọn.
   - Trường `wordFamily` (2.313 giá trị máy, KHÔNG được render — có test `tests/dormant_fields.test.js` chặn mọi code đọc nó): **xóa hẳn trường này** khỏi dữ liệu + generator, hoặc thay bằng dữ liệu curated. Chỉ được gỡ test khi một trong hai việc đó xong.
   - `unit.words[].collocations` template máy ("frequently use X"): xóa khỏi dữ liệu (runtime đã lọc phòng thủ).
   - `dragDrop.items.vi` = "biến thể từ loại của X" (400 hint): biến mất khi bỏ nhóm dragDrop tự sinh.
   - **553 cặp `example`/`viExample` máy trong `vocabFinalData.js` (356), `vocabMoreData.js` (184), `vocabExtendedData.js` (13)** — viExample là cụm tiếng Anh trái nghĩa, KHÔNG phải bản dịch ("hysteria" → "Orderly rational peace"); example là chuỗi keyword không thành câu. Nguồn rác này KHÔNG đến từ generator Pre-Int (3 file vocab này không có generator trong repo — rác có sẵn từ lúc nhập liệu). Dọn: viết lại cặp ví dụ curated cho ~553 từ, hoặc xóa cặp trường đó vĩnh viễn. Baseline `vocab-example-pair` về 0 sau khi dọn.

Ngưỡng tối thiểu mỗi unit sau khi dọn (điều chỉnh vì bỏ fallback sẽ giảm số item): ≥8 quiz hợp lệ, ≥8 dragDrop hợp lệ (hạ từ 16 vì bỏ 2 nhóm tự sinh), ≥8 typing hợp lệ. Unit dưới ngưỡng → báo cáo danh sách để bổ sung curated thủ công, không tự bịa.

Nghiệm thu:
1. `node scripts/validate_content.mjs src/data/oxford*.js` → 100% unit PASS trên các file đang dùng.
2. Ba lệnh grep của audit (`"word": "Từ"`, `" synonym"`, `use the word|frequently use`) + lệnh mới `grep -c 'liên quan tới' src/data/oxfordPreIntData*.js` → tất cả về **0**.
3. Cố tình chèn 1 item rác → `npm test` đỏ.
4. Mở tay unit 1, 25, 51, 75, 100: ba tab bài tập sạch; thứ tự đáp án đổi giữa 2 lần mở.
5. Không file nào thuộc cụm IELTS bị đổi.

---

## HẠNG MỤC #1 — Gate hoàn thành bằng độ chính xác (làm CUỐI, sau khi dữ liệu sạch)

**Điều chỉnh theo QĐ1 + QĐ2:**

### Cơ chế chấm (QĐ1)
- `src/utils/mastery.js` (mới): phiên làm bài ghi nhận **first-attempt** từng câu — `{questionId, firstAnswerCorrect}`; làm lại câu sai không ghi đè.
- `PASS_THRESHOLD = 0.80`; nếu tỉ lệ câu trắc nghiệm trong bộ đề của unit > 70% → `PASS_THRESHOLD_MCQ_HEAVY = 0.85` (tính tự động từ cấu trúc dữ liệu unit, không hard-code danh sách).
- Làm lại không giới hạn, không phạt, không cooldown. Màn kết quả chưa đạt: "Chưa đạt (x%) — cần ≥80%. Làm lại nhé, không mất gì cả!"

### Hai đường ống phần thưởng (QĐ2)
- **Đường 1 — Đều đặn (streak + daily goal):** kích hoạt khi *hoàn thành phiên* (trả lời hết số câu của một bài, bất kể đúng sai). Sự kiện mới `recordSession(topicId)` trong `App.jsx` — tách khỏi `completeMilestone`. Một phiên/ngày là đủ giữ streak. Click-suông không còn là phiên (phải trả lời hết câu hỏi).
- **Đường 2 — Thành tích (XP thưởng + milestone + danh hiệu + chứng nhận):** chỉ qua `completeMilestone(id, xp, evidence)` với evidence đạt ngưỡng first-attempt.
- Nút hoàn thành vô điều kiện ở `unitData.jsx:55`: xóa; unit hoàn thành qua QuizTab đạt ngưỡng.
- Allowlist không-evidence: **duy nhất** call site của cụm IELTS (`IeltsFoundationPage.jsx:354`) — nhận diện theo id, không sửa file cụm đó.

### #1b — Di trú người dùng cũ (làm cùng #1, đã duyệt)
- **Không xóa gì**: XP, streak, `completedMilestones` giữ nguyên trong storage.
- Milestone cũ không có bản ghi `milestoneScoresV1` → gắn trạng thái **"⏳ Đã hoàn thành — chưa xác minh"** (vẫn đếm vào % lộ trình, không ai mất tiến độ nhìn thấy được).
- Mỗi unit chưa xác minh có nút **"Xác minh nhanh (5 câu)"**: lấy 5 câu ngẫu nhiên từ bộ quiz của unit, đạt ≥4/5 → chuyển ✓ xác minh; không đạt → giữ "chưa xác minh" + gợi ý học lại. Không bao giờ hạ về chưa-hoàn-thành.
- **Danh hiệu + chứng nhận đếm theo milestone đã xác minh** (hệ quả QĐ2: thành tích = chất lượng). % lộ trình và XP thì đếm cả hai loại. *(Đây là sub-quyết định duy nhất còn mở — nếu muốn danh hiệu đếm cả chưa-xác-minh thì nói, mặc định tôi làm verified-only.)*
- Modal một lần khi mở bản mới: "Bunny English nâng cấp cách ghi nhận hoàn thành: từ nay cần đạt ≥80% để tính thành tích. Mọi XP, chuỗi ngày học và tiến độ cũ của bạn được giữ nguyên. Các bài hoàn thành trước đây chỉ cần xác minh nhanh 5 câu."

### File (gộp #1 + #1b)
`src/utils/mastery.js` (mới), `src/App.jsx`, 7 component ngữ pháp, `src/pages/GrammarPage.jsx`, `src/components/oxford/QuizTab.jsx`, `src/components/unitData.jsx`, `src/pages/GamesPage.jsx`, `src/pages/VocabVstepPage.jsx`, `src/utils/backup.js`, `src/utils/progressSync.js`, `src/pages/WelcomePage.jsx` (badge chưa-xác-minh + modal di trú), `tests/core.test.js`.

### Nghiệm thu #1 + #1b
1. Test thuần: pass tại 80% first-attempt, fail tại 79%; unit >70% MCQ pass tại 85%, fail tại 84%.
2. Trả lời sai rồi sửa thành đúng trong cùng phiên → câu đó tính **sai** vào tỉ lệ (test riêng).
3. Làm hết bài nhưng 0% đúng → streak/daily goal **có** tăng (phiên hợp lệ), XP thưởng/milestone **không**.
4. Click header unit không còn tạo milestone; `grep "onClick={() => completeMilestone" src/components/unitData.jsx` → 0.
5. localStorage bản cũ: mở app không crash, % lộ trình không giảm, XP/streak nguyên vẹn, unit cũ hiện "⏳ chưa xác minh"; xác minh 4/5 → ✓; 3/5 → giữ ⏳.
6. Danh hiệu/chứng nhận chỉ đếm verified (hoặc theo sub-quyết định ở trên).
7. Cụm IELTS: hoàn thành bài video vẫn hoạt động như cũ qua allowlist, file cụm không đổi.

---

## VIỆC CHỜ CHỦ DỰ ÁN

1. **Duyệt danh sách chuỗi #0** (nhóm A–D sửa theo đề xuất? nhóm E giữ hay sửa?) → tôi sửa ngay sau khi chốt.
2. **Xác nhận QĐ4**: xóa `oxfordPreIntDataPart2.js` (0% pass, trùng id với dữ liệu đang dùng)?
3. Sub-quyết định #1b: danh hiệu đếm verified-only (mặc định) hay đếm cả chưa-xác-minh?
