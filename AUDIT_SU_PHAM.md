# BÁO CÁO AUDIT SƯ PHẠM — Bunny English
Ngày: 2026-08-12   |   Commit: `d595572`

> ## ⛔ MỤC 0–8 LÀ ẢNH CHỤP NGÀY 12/08 VÀ PHẦN LỚN ĐÃ HẾT HIỆU LỰC
>
> Đừng trích dẫn mục 0–8 như tình trạng hiện tại. Chúng mô tả commit `d595572`.
> **[Mục 10](#10-audit-lại-2026-08-20--đo-lại-từng-khẳng-định-của-mục-08) đo lại từng khẳng định trên mã hiện tại** và đảo ngược nhiều kết luận lớn — riêng ba câu dưới đây nay đều SAI:
>
> - ~~"trần CEFR của web là A2"~~ → đo lại: **587 giờ cộng dồn A0→B2**, đủ so với mốc CEFR 500–600 giờ.
> - ~~"không có một file audio người thật nào"~~ → **239 tệp thu ship kèm bản dựng**, cộng **60 bài nghe đoạn dài của VOA** (bản ghi lời + giấy phép đầy đủ) — nhưng 60 bài đó **phát từ máy chủ VOA**, xem rủi ro ở 10.2 #9.
> - ~~"không có module phát âm/phonics nào"~~ → **bậc A0 = 12 chặng phonics**, có cả cặp tối thiểu và lỗi đặc thù người Việt.
>
> Giữ nguyên mục 0–8 làm hồ sơ lịch sử: chúng cho thấy sản phẩm đã đi từ đâu, và mục 9 (nguyên tắc GIỮ/XÓA nội dung máy sinh) vẫn còn hiệu lực nguyên vẹn.

> Audit chỉ-đọc. Mọi con số dưới đây được đếm bằng script từ dữ liệu thật trong `src/data/`, mọi nhận định đều kèm `file:dòng`. Những gì không kiểm chứng được nằm ở mục 8.

---

## 0. TÓM TẮT ĐIỀU HÀNH

**Q1 — Người mất gốc (A0) học hết web này có đạt B1 cả 4 kỹ năng không?**

**CHƯA.** Web có kho Đọc + Từ vựng + Ngữ pháp thật sự lớn (≈22.900 từ vựng có IPA, 280 bài đọc song ngữ, 78 chuyên đề ngữ pháp), đủ đưa người học tới **A2, tối đa B1 ở dạng nhận diện (đọc–hiểu, làm trắc nghiệm)**. Nhưng kỹ năng Nói về bản chất không tồn tại (chỉ so khớp chuỗi ký tự trên transcript của trình duyệt, từng từ đơn — `src/utils/textUtils.js:48-49`), Nghe không có một file audio người thật nào trong bản ship (100% TTS trình duyệt, 0 kết quả cho `new Audio(`/`MediaRecorder` trong `src/`), và không có module phát âm/phonics nào cho người mất gốc. B1 nghĩa là *giao tiếp độc lập* — sản phẩm hiện không có con đường nào dẫn tới đó cho hai kỹ năng Nghe–Nói.

**Q2 — Web đã có lộ trình học rõ ràng chưa?**

**MỘT PHẦN — phần "vẽ" có, phần "chạy" không.** Có bản đồ 44 chặng A1→C2 kèm ước lượng giờ (`src/data/roadmapData.js`, 44/44 chặng có `~N giờ`), có placement test 12 câu, có nút "HỌC 15 PHÚT HÔM NAY". Nhưng: kết quả placement **không điều hướng bất cứ thứ gì** (bảng `LEVELS` export ra không nơi nào import — `src/utils/placement.js:37`; chặng gợi ý tiếp theo chỉ là "mục chưa xong đầu tiên trong mảng" — `src/pages/WelcomePage.jsx:95-98`, nên người test ra Advanced vẫn bị chỉ vào bài "Màu & Số (A1)"); **không có prerequisite nào** (unlock duy nhất trong codebase là mở khóa... thú cưng hoạt hình — `src/components/common/chibiCopy.js:26-33`); **không có đánh giá đầu ra** quyết định lên cấp; tiến độ đo bằng "% chặng đã bấm nút", không phải năng lực.

**Cấp độ CEFR trần web hiện đưa người học tới:** **A2** cho năng lực tổng hợp; riêng Đọc + kiến thức ngữ pháp/từ vựng thụ động có thể chạm **B1**; Nghe–Nói dừng ở **~A1**.

**3 lỗ hổng nghiêm trọng nhất:**

1. **Nói = 1/5, Nghe = 1,5/5.** Không ghi âm, không chấm âm vị, không hội thoại, không shadowing; không có file audio nào — bộ 30GB video/audio IELTS thật thì bị `gitignore` + `vercelignore` và cờ `SHOW_IELTS_FOUNDATION` chỉ bật trên localhost (`src/utils/localOnly.js:12`) — **bản production không ship một giây audio người thật nào.**
2. **Gamification thưởng cho hành vi bấm nút, không thưởng cho học đúng.** Nút hoàn thành Oxford là `onClick={() => completeMilestone(unitData.id, 20)}` vô điều kiện (`src/components/unitData.jsx:55`); QuizEngine tính điểm rồi... vứt đi, làm sai 100% vẫn nhận đủ XP/streak (`src/components/grammar/QuizEngine.jsx:20-21`). 30 cú click (không cần trả lời câu tiếng Anh nào) = danh hiệu "🏆 C2 Master" (`src/pages/WelcomePage.jsx:117-124`).
3. **Hàng nghìn bài tập Oxford sinh bằng template chứa rác đã kiểm chứng:** 726 item kéo-thả có "từ tiếng Anh" là chữ **"Từ"** (tiếng Việt) (`grep '"word": "Từ'` → 393 hit trong `oxfordPreIntData.js`, 333 trong `oxfordPreIntDataPart2.js`), 216 đáp án gõ-từ dạng vô nghĩa `"context synonym"`, `"use a synonym"`, 593 cụm template `"use the word X"` — hệ quả trực tiếp của nhánh fallback trong `generate_preint_data.js:1430-1450`.

---

## 1. BẢN ĐỒ CODEBASE

**Stack:** Vite 8 + React 19 SPA (`package.json`), Tailwind 4, không router library — điều hướng bằng `useState('home')` + switch (`src/App.jsx:101, 505-633`) → không có URL/deep-link. Backend chỉ có 4 serverless function: `api/access.js`, `api/access-admin.js`, `api/progress.js`, `api/ai.js` (+ bản Cloudflare `functions/api/ai.js`). Lưu trữ tiến độ: **localStorage** là chính, có sync snapshot theo mã truy cập qua `api/progress.js` (Upstash Redis).

**Nội dung lưu ở đâu:** 100% hard-code trong `src/data/` (151 file JS, ES modules) — không database, không CMS. Một phần lớn được **sinh bằng script template offline** (`generate_preint_data*.js`, `generateVocab.cjs` ở gốc repo — xem mục 2.4). Không có nội dung sinh runtime bằng AI (AI chỉ chấm/trả lời, không sinh bài học).

**Mô hình dữ liệu bài học:**
- Chuyên đề ngữ pháp: `{id, title, level ('B1'|'B2'|'C1/C2'), category, theory[], sentenceGame[], exercises[], fillBlanks[], trueFalse[], errorCorrection[], transformation[], matching[]}` (`src/data/grammarDataB1.js:6-12`).
- Chủ đề từ vựng: `{id, category, title, level ('A1'…'C1-C2'), examTags, words[{en, vi, type, ipa, example, viExample}], storyEn, storyVi}` (`src/data/vocabVstepNew1.js:6-13`). **Từng từ KHÔNG có trường level/difficulty riêng.**
- Unit Oxford: `{id, title, description, theory{coreVocab[]}, dragDrop, quiz, typingGame, speaking, textbookExercises}` — **không có trường level/cefr** (`src/data/oxfordData.js:4-7`), cấp độ chỉ suy ra từ tên sách.
- **Không tồn tại trường `prerequisite` hay `order` ở bất kỳ dataset nào.**

**Mọi lời gọi Gemini — đúng 3 prompt, 1 model (`gemini-2.5-flash`), build tập trung tại `functions/api/ai.js:64-95`:**

| Mode | Prompt (tóm tắt nguyên văn) | Mục đích | Nơi gọi |
|---|---|---|---|
| `writing` | *"Bạn là giáo viên tiếng Anh. Hãy chấm bài viết… Phản hồi ngắn gọn bằng tiếng Việt gồm: (1) điểm /10, (2) lỗi ngữ pháp/chính tả và cách sửa, (3) một câu mẫu tự nhiên hơn."* (`functions/api/ai.js:71-73`) | Chấm **1 câu** người học gõ | `AiAssistant.jsx:28`, `oxford/PracticeTab.jsx:30`, test key `AiKeyDialog.jsx:66` |
| `chat` | *"Bạn là Bunny — thỏ gia sư… Trả lời NGẮN GỌN bằng tiếng Việt (tối đa 120 từ)… Chỉ trả lời các chủ đề học tiếng Anh."* (`functions/api/ai.js:80`) | Hỏi–đáp gõ phím về việc học (bằng tiếng Việt — **không phải hội thoại tiếng Anh**) | `BunnyChat.jsx:40` |
| `image-vocabulary` | *"Nhận diện đối tượng… Chỉ trả về JSON… {word, ipa, meaning, phrases, sentences}. Tạo 2 cụm từ và 2 câu ví dụ."* (`functions/api/ai.js:92`) | Quét ảnh → 1 từ vựng | `ScannerPage.jsx:67` |

**100% BYOK:** không có API key server (`.env.example:16-19` ghi rõ chủ đích); key người học nằm ở localStorage, gửi qua header `x-gemini-key`. Không có key → Gia sư Writing, Chat, Scanner ngừng; mọi phần còn lại chạy bình thường. Không có mode chấm Nói, không có role-play, không có chấm đoạn/bài luận.

---

## 2. KIỂM KÊ NỘI DUNG (đếm bằng script, không ước lượng)

### 2.1 Bảng tổng

| Chỉ số | Số thật | Ghi chú |
|---|---|---|
| Chuyên đề ngữ pháp | **78** (B1: 28, B2: 25, C1/C2: 25) | 306 mục lý thuyết. Phủ rộng thật: 11 chuyên đề thì, điều kiện (3), bị động, mệnh đề quan hệ, câu tường thuật, đảo ngữ… (`src/data/grammarDataB1/B2/C1C2.js`) |
| Chủ đề từ vựng | **280** biên soạn (**278 đang dùng**) | 266 trong các file `vocab*` + 14 inline trong `vocabVstepData.js`; 2 topic của `vocabDailyNew24.js` là **dữ liệu chết** (không có trong aggregate `vocabVstepData.js:14227`) |
| Tổng mục từ vựng | **≈22.960** (≈22.860 đang dùng) | **100% có IPA thật (kèm trọng âm), 100% có câu ví dụ + dịch tiếng Việt. 0% có audio file** — trường `audio/mp3/sound`: 0 kết quả |
| Từ vựng Oxford | **3.120** mục đang dùng (2.320 coreVocab + 800 words) | 100% có `phonetic` (IPA) + example. Lưu ý schema lệch: vocab dùng `ipa`, Oxford dùng `phonetic` |
| Unit Oxford | **260 đang dùng** / 313 biên soạn | Elementary 60 + Pre-Int 100 + Advanced 100 (`src/App.jsx:20-36`). **53 unit chết**: `oxfordPreIntDataPart2.js` (50), `oxfordAdvancedData.js` (3) không được import |
| Tổng câu hỏi/bài tập tĩnh | **≈22.300** (phân loại ở 2.2) | Chưa kể câu hỏi Nghe/Đọc sinh runtime từ từ vựng |
| File audio/media | **0 trong bản ship.** Trên đĩa local: 216 mp3 + 354 mp4 + 710 pdf + 452 docx = 30GB | Toàn bộ nằm trong `public/ielts-foundation|ielts-prep` bị `gitignore:30` + `.vercelignore` loại; UI chỉ hiện trên localhost (`src/utils/localOnly.js:12`). Âm thanh trong app = `speechSynthesis` (TTS trình duyệt), rate 0.85 (`src/App.jsx:449-459`) |
| Bài đọc > 100 từ | **≈276/280** bài storyEn song ngữ | 100% chủ đề từ vựng có truyện chêm; median ≈192 từ, dài nhất 253 từ (file) và 500–740 từ (14 bài inline VSTEP) |
| Bài viết tự do có chấm | **1 màn hình duy nhất** (Gia sư Writing, 1 câu/lần) | `AiAssistant.jsx` — heuristic offline /100 (`writingScorer.js:19`) + Gemini /10 (BYOK). Không có bài đoạn văn/luận nào |

### 2.2 Phân loại bài tập theo dạng (chỉ đếm dữ liệu tĩnh đang dùng)

| Dạng | Số lượng | Tỉ lệ |
|---|---|---|
| Kéo thả / phân loại / nối cặp | 6.059 + 1.640 + 1.160 + 78 = **8.937** | 40,0% |
| Trắc nghiệm (MCQ + True/False + mock + placement) | 3.376 + 1.031 + 418 + 40 + 12 = **4.877** | 21,8% |
| Gõ từ đơn theo nghĩa (typing recall) | **3.400** | 15,2% |
| Điền vào chỗ trống | 2.046 + 520 = **2.566** | 11,5% |
| Sửa lỗi dạng *click chọn từ sai* (không gõ sửa — `ErrorCorrectionExercise.jsx:107`) | 415 + 480 = **895** | 4,0% |
| Sắp xếp từ thành câu | **763** | 3,4% |
| Đọc to câu tham chiếu (speaking TTS) | **550** | 2,5% |
| Viết lại câu có gõ (transformation) | **269** | 1,2% |
| Viết tự do có feedback | **78** prompt (1/chuyên đề ngữ pháp) | 0,3% |
| Nghe chép chính tả | chỉ **từ đơn**, sinh runtime (`GamesPage.jsx:286-410`) | — |
| Flashcard | toàn bộ 22,9k từ dùng được ở chế độ thẻ | — |

> **⚠️ Cảnh báo recognition-only learning — điều kiện cảnh báo trong đề bài ĐÃ kích hoạt.** Nhóm nhận diện (trắc nghiệm + điền chỗ trống + kéo thả/nối + sắp xếp) = **77%**. Nếu tính cả gõ-từ-đơn (sản sinh ở mức chữ cái, không phải câu) là **92%**. Sản sinh ngôn ngữ ở cấp độ câu trở lên (transformation + viết tự do) chỉ **≈1,5%**. Người học sẽ nhận ra đáp án đúng khi nhìn thấy, nhưng gần như không bao giờ phải tự tạo ra một câu tiếng Anh của riêng mình.

### 2.3 Câu hỏi Nghe/Đọc hiểu sinh runtime

`buildComprehension` (`src/utils/comprehension.js:53`) ưu tiên câu hỏi biên soạn tay — nhưng **cả kho dữ liệu chỉ có đúng 1/280 chủ đề có câu hỏi biên soạn** (5 câu, topic "✈️ Du Lịch & Giao Thông", `vocabVstepData.js:134-139`). 279 chủ đề còn lại rơi vào `autoQuestions` (`comprehension.js:19-37`): lấy câu ví dụ của từ, hỏi "Câu này có nghĩa là gì?" với 3 đáp án nhiễu là nghĩa của từ khác. Và `comprehension.js:52` thừa nhận: **bài Nghe và bài Đọc dùng chung đúng một bộ câu hỏi** — khác nhau duy nhất ở chỗ đọc to hay in ra.

### 2.4 Các file generate ở thư mục gốc (yêu cầu kiểm tra riêng)

- **`generate_preint_data.js` (+ `_51_75`, `_76_100`, `_part2`)**: chứa danh sách từ thô viết tay (8 từ/unit — 100 unit Pre-Intermediate, mỗi từ có `phonetic` IPA + `vi` + `example` thật), rồi hàm `compileUnit` (`generate_preint_data.js:1102`) **sinh toàn bộ bài tập bằng template**: 32 item kéo-thả, đúng 20 câu quiz, đúng 20 câu gõ-từ, 2 câu speaking mỗi unit. Vấn đề: các nhánh fallback tạo rác — item kéo-thả lấy `wordFamily.split(' ')[0]` (ra chữ tiếng Việt "Từ"), đáp án gõ-từ mặc định `"${w.word} synonym"` (`:1430-1450`), collocation mặc định `"use the word X"`. Rác này **đã nằm trong dữ liệu ship** (kiểm chứng ở mục 0, lỗ hổng #3). Ngoài ra `Math.random()` trộn đáp án lúc generate nên thứ tự cố định vĩnh viễn trong file.
- **`generateVocab.cjs`**: sinh `vocabExtraData2.js` — 3 chủ đề × 100 từ **viết tay hoàn chỉnh** (IPA, đồng nghĩa/trái nghĩa, ví dụ song ngữ, truyện chêm). Đây là dữ liệu chất lượng tốt, script chỉ là công cụ đóng gói.
- Điểm chung: **không script nào gọi AI**, không sinh audio; output là dữ liệu tĩnh có IPA/ví dụ nhưng **không có audio**.

---

## 3. ĐIỂM 4 KỸ NĂNG

| Kỹ năng | Điểm /5 | Trạng thái | Bằng chứng (file:dòng) | Thiếu gì |
|---|---|---|---|---|
| **NGHE** | **1,5** | Cơ chế thật, dữ liệu nghe không phải để nghe | TTS 2 tốc độ cố định 0.85/0.5 (`ListeningComprehension.jsx:117,120`); dictation từ đơn (`GamesPage.jsx:286-410`, chấm bằng so chuỗi `:333`); mock test có 10 câu nghe 1-câu TTS (`mockTestData.js`); `new Audio(`/`playbackRate`: **0 hit toàn repo** | Audio người thật; bài nghe đa câu/hội thoại; dictation cấp câu; luyện nối âm/nuốt âm (0 hit); câu hỏi nghe biên soạn (1/280 chủ đề) |
| **NÓI** | **1** | Có UI, không có chấm phát âm thực | `SpeechRecognition` từ đơn (`SpeakingPractice.jsx:49`), "chấm" = Levenshtein trên transcript, ngưỡng 0.8–0.95 (`textUtils.js:43-56`) — **không phải chấm âm vị, thậm chí không phải chấm âm thanh**; nhãn "AI NGHE THẤY"/"Phát âm chuẩn!" (`:134,143`) nói quá; 1 màn câu-mức duy nhất chấm bằng % từ trùng (`AiAssistant.jsx:38-55`); `MediaRecorder`/`getUserMedia`: **0 hit**; không có mode AI hội thoại (`functions/api/ai.js:66-95` chỉ có 3 mode); `PronunciationGame` phát XP danh dự khi trình duyệt không hỗ trợ STT (`GamesPage.jsx:440`) | **Đây là lỗ hổng nghiêm trọng nhất.** Không ghi âm, không nghe lại giọng mình, không role-play, không shadowing, không phản hồi âm vị — người học không có bất kỳ vòng lặp sản sinh lời nói nào |
| **ĐỌC** | **3** | Mạnh nhất — dữ liệu thật, câu hỏi yếu | ≈280 bài đọc song ngữ có highlight từ vựng + tooltip IPA (`StoryWithHighlights.jsx`, `textUtils.js:62-69`); phân cấp theo dataset (A1→C1-C2) | Câu hỏi đọc-hiểu **không hỏi về bài đọc** — `buildComprehension` nhận `words`, không bao giờ nhận `storyEn` (`comprehension.js:53`); không có câu hỏi suy luận/ý chính; <4 câu là lặng lẽ biến mất (`ReadingComprehension.jsx:39`) |
| **VIẾT** | **1,5** | Một màn hình thật, còn lại là gõ-từ đội lốt | "Luyện Viết" từ vựng = gõ 1 từ, so chuỗi tuyệt đối (`WritingPractice.jsx:58`); viết tự do thật chỉ có Gia sư Writing: 1 câu, heuristic offline /100 (`writingScorer.js:19` — đếm viết hoa, dấu câu, 15 từ sai chính tả định sẵn) + Gemini /10 BYOK; 269 câu transformation là dạng gõ thật duy nhất có số lượng | Tiến trình câu → đoạn → bài: **không tồn tại**; "Phòng ảo Writing AI" trong lộ trình IELTS chỉ là nhãn chữ (`IeltsFoundationPage.jsx:74`); lệch thang điểm /100 vs /10 hiển thị cạnh nhau (`AiAssistant.jsx:72,89`) |

### Mục riêng: PHÁT ÂM & PHONICS — 1/5

- **Dữ liệu IPA là điểm mạnh thật**: ≈26.000 phiên âm chuẩn có trọng âm chính/phụ trên toàn bộ từ vựng + Oxford, hiển thị ở flashcard, speaking, tooltip, sổ tay từ.
- **Nhưng không có một module dạy phát âm nào.** Grep `phonics|phoneme|minimal pair|nguyên âm|phụ âm|trọng âm|schwa` trong mã app (ngoài data): **0 kết quả sư phạm**. Không dạy 44 âm, không minimal pairs, không trọng âm từ/ngữ điệu, không xử lý lỗi đặc thù người Việt (âm cuối, /θ ð/, cụm phụ âm).
- **Không có cơ chế "nghe trước khi thấy mặt chữ"** — mọi mode đều hiện chữ trước, nút loa là tùy chọn.
- Khóa video "Phát âm cơ bản" (có bài "Tổng quan bảng phiên âm IPA" — `ieltsFoundationData.js:8-24`) là nơi duy nhất *dạy* phát âm — và nó **không ship** (xem mục 0).
- **Hệ quả cho người mất gốc:** học 22.900 từ qua mặt chữ + TTS máy, người học sẽ mã hóa từ bằng âm Việt hóa → nghe không nhận ra từ đã thuộc, nói ra người bản xứ không hiểu. Với định vị "cho người mất gốc", đây là lỗi cấu trúc, không phải thiếu tính năng.

---

## 4. ĐIỂM LỘ TRÌNH HỌC

| Hạng mục | Có/Không | Bằng chứng | Ghi chú |
|---|---|---|---|
| Test xếp lớp đầu vào | **Một phần** | 12 câu (5 grammar, 4 vocab, 3 reading — **0 nghe, 0 viết**) `placementQuestions.js:2-13`; 5 band theo % đúng `placement.js:1-7` | Kết quả chỉ đổi 1 đoạn text gợi ý + mở báo cáo. `LEVELS` không ai import (`placement.js:37`); không gate/lọc/điều hướng bài nào |
| Ánh xạ CEFR | **Một phần** | Nhãn cấp topic: grammar `level: "B1"` (`grammarDataB1.js:9`), vocab `level: "A1-A2"…` (239 khai báo) | Chỉ là badge màu + tab filter (`MainLayout.jsx:335`); từng từ/câu hỏi không có level; Oxford unit không có trường level; **nhãn không đáng tin**: "Hiện Tại Đơn" gắn B1 trong khi CEFR thực là A1 |
| Mục tiêu can-do | **Một phần** | `roadmapData.js` skills: "Nói những câu đơn giản", "Giới thiệu bản thân"… | Có ngôn ngữ can-do ở mô tả cấp level, nhưng hoàn thành chặng không đo can-do nào — đo cú bấm nút |
| Thứ tự phụ thuộc | **KHÔNG** | Grep `locked|unlock|prerequisite` toàn `src/`: unlock duy nhất là thú cưng (`chibiCopy.js:26-33`); mọi milestone đều click được (`WelcomePage.jsx:659`) | Người mới có thể mở chặng C1-C2 làm bài đầu tiên. Mở tự do hoàn toàn |
| Spaced repetition | **CÓ (thật)** | Leitner 5 hộp, interval 1/2/4/7/15 ngày, sai reset hộp 1 (`srs.js:10,39-49`); due-date thật, không random. Kèm error bank riêng 3/7/14 ngày (`errorBank.js:9,89-107`) | **Không phải SM-2** (`easeFactor|nextReview`: 0 hit — tài liệu nội bộ nói đúng "Leitner"). Chỉ nhận **từ vựng** (key = `word.en`, `srs.js:31`) — ngữ pháp không bao giờ vào SRS. Hai scheduler không nói chuyện với nhau và không ảnh hưởng lộ trình |
| Đánh giá định kỳ | **Một phần** | 2 mock test × 20 câu, có timer + quy đổi band (`mockTestData.js`, `mockTest.js:11-19`) | Quy đổi là phép chia % tuyến tính, **IELTS floor 4.0 kể cả 0% đúng** (`mockTest.js:18`); không gate lên cấp, không lịch retest (`30 ngày|retest`: 0 hit); chỉ đổ lỗi sai vào error bank |
| Ước lượng thời lượng | **CÓ (không kiểm chứng được)** | 44/44 milestone có "~N giờ" trong desc (`roadmapData.js:23,33`…), tổng 201 giờ | App **không đo thời gian** ở bất kỳ đâu (`activityHistory.js:17-19` chỉ có `{date, lessons, xp}`) — con số tĩnh, không thể xác thực hay cá nhân hóa |
| Chỉ báo tiến độ | **Đo khối lượng, không đo năng lực** | `completionPercentage = completedCount/44` (`WelcomePage.jsx:90-92`); "studied" = đã lướt tới thẻ, "visited" = đã mở tab (`learningProgress.js:13`) | Biểu đồ kỹ năng trong LearningReport là **ảnh chụp đông cứng của bài test đầu vào**, không bao giờ cập nhật (`LearningReport.jsx:41`); chứng nhận phát khi bấm đủ 44 nút và in... trình độ *đầu vào* (`LearningReport.jsx:39,50`) |

**Kết luận Q2 chi tiết:** có điểm xuất phát (onboarding + placement) nhưng goal chọn xong **không ai đọc** (`getLearningGoal()` 0 caller — `onboarding.js:19-21`); các chặng có mục tiêu mô tả nhưng không đo được; thứ tự chỉ là gợi ý thị giác; đánh giá đầu ra không tồn tại.

---

## 5. PHÂN TÍCH GAMIFICATION

**Hệ thống thưởng cho hành vi vào app, không thưởng cho học có chất lượng.** Toàn bộ tiến trình đi qua đúng một hàm `completeMilestone(id, xpBonus=20)` (`App.jsx:461-502`) với điều kiện duy nhất là id chưa dùng (`:462`).

- **Giữ streak bằng 2 phút bài siêu dễ? Còn tệ hơn: ~2 giây, 0 câu tiếng Anh.** Chuỗi: 1 click nút hoàn thành Oxford vô điều kiện (`unitData.jsx:55`) → +1 lesson (`App.jsx:474`) → streak +1 (`App.jsx:489-490`) → daily goal mặc định 1 chặng/ngày đạt luôn (`dailyGoal.js:4,11`). Nguồn id mới: 260 unit Oxford + 278 topic từ vựng + 78 chuyên đề = **hơn 1,5 năm streak không cần trả lời câu hỏi nào**. Cộng thêm 2 streak-freeze tự động/tháng (`streakFreeze.js:8`).
- **Điểm số bị vứt bỏ:** QuizEngine bắn `onComplete()` khi `qIdx === exercisesLen`, biến `score` được tính, hiển thị, rồi không dùng (`QuizEngine.jsx:20-21`). Làm sai toàn bộ = +40 XP, y hệt làm đúng toàn bộ. Cùng pattern ở 6 dạng bài ngữ pháp (`GrammarPage.jsx:89-163`). Gate duy nhất là VSTEP vocab — nhưng gate theo *phơi nhiễm* (lướt 30% thẻ + mở 4 tab), không theo đúng/sai (`VocabVstepPage.jsx:92-96`).
- **Huy hiệu/pet/danh hiệu đều theo khối lượng:** badge = số chặng/streak/XP (`WelcomePage.jsx:181-192`); pet = số lesson (`chibiCopy.js`); nguy hiểm nhất là danh hiệu in nhãn CEFR theo số click — 30 click = "C2 Master" xuất cả lên ảnh chia sẻ (`WelcomePage.jsx:117-124`, `shareCard.js:56`).
- Không có leaderboard (đã grep — chỉ có PNG khoe thành tích).
- **Rủi ro tối ưu hóa sai mục tiêu: hiện hữu, không phải giả thuyết.** Mọi chỉ số (streak, XP, %, danh hiệu, chứng nhận, freeze) đều tối đa hóa được bằng click. Một điểm cộng: chống farm lặp id đã có (`App.jsx:462`, ghi chú tại `GamesPage.jsx:721-722`) — nhưng nó chỉ chặn re-click, không chặn click-suông.

---

## 6. DANH SÁCH VIỆC CẦN LÀM (xếp theo tác động/công sức giảm dần)

| # | Hạng mục | Tác động sư phạm | Công sức | File cần đụng tới |
|---|---|---|---|---|
| 1 | Gate `completeMilestone` bằng độ chính xác (ví dụ ≥70% mới tính hoàn thành; truyền `score` vào `onComplete`) | **Cao** | **S** | `unitData.jsx:55`, `QuizEngine.jsx:20`, `GrammarPage.jsx:89-163`, `App.jsx:461` |
| 2 | Nối placement → lộ trình: `nextMilestone` chọn theo band; ẩn/mờ chặng dưới trình độ | **Cao** | **S** | `WelcomePage.jsx:95-98`, `placement.js:37`, `roadmapData.js` (thêm trường `level` máy-đọc-được) |
| 3 | Lọc/sửa rác template Oxford Pre-Int (item "Từ", "X synonym", "use the word X") — sửa generator rồi chạy lại, hoặc lọc runtime | **Cao** | **M** | `generate_preint_data.js:1283-1456`, `oxfordPreIntData*.js` |
| 4 | Câu hỏi đọc-hiểu hỏi về chính bài đọc (biên soạn cho ~50 bài hàng đầu, hoặc thêm mode Gemini sinh câu hỏi suy luận từ `storyEn`) | **Cao** | **M** | `comprehension.js:53`, `ReadingComprehension.jsx`, `functions/api/ai.js` |
| 5 | Module Phonics: 44 âm IPA + minimal pairs + trọng âm, tận dụng 26k phiên âm sẵn có + TTS; bổ sung chế độ "nghe trước, chữ sau" cho flashcard | **Cao** | **M** | component mới, `Flashcard.jsx`, data mới ~44 âm |
| 6 | Nghe đa câu: TTS đọc từng đoạn `storyEn` + câu hỏi; dictation nâng từ từ đơn lên câu | **Cao** | **M** | `ListeningComprehension.jsx`, `GamesPage.jsx:286-410` |
| 7 | Viết theo tiến trình câu→đoạn: prompt Gemini chấm theo tiêu chí (nội dung/liên kết/ngữ pháp/từ vựng), thống nhất thang điểm | **Cao** | **M** | `functions/api/ai.js:67-74`, `AiAssistant.jsx`, `WritingPractice.jsx` |
| 8 | Đánh giá cuối chặng: dùng engine mock test làm bài kiểm tra cuối mỗi level, đạt mới cấp huy hiệu/danh hiệu CEFR | **Cao** | **M** | `mockTest.js`, `MockTest.jsx`, `WelcomePage.jsx:117-124` |
| 9 | Nói theo câu: chấm word-overlap có highlight từ sai + shadowing với câu trong `storyEn`; sửa nhãn "Phát âm chuẩn!" thành mô tả trung thực | TB | **M** | `SpeakingPractice.jsx`, `textUtils.js:43-56`, `AiAssistant.jsx:38-55` |
| 10 | Tiến độ đo năng lực: trend từ phân bố hộp SRS + tỉ lệ lỗi error-bank giảm, thay cho %-chặng; cập nhật biểu đồ kỹ năng sau mỗi mock test | TB | **M** | `LearningReport.jsx:41`, `WelcomePage.jsx:90`, `srs.js`, `errorBank.js` |
| 11 | Đọc `learningGoal` đã thu ở onboarding để lọc lộ trình (ielts/vstep/giao tiếp/mất gốc) | TB | **S** | `onboarding.js:19`, `WelcomePage.jsx` |
| 12 | Quyết định số phận 30GB media: host CDN/streaming riêng, hoặc gỡ manifest + mục IELTS khỏi bản ship để tránh khung player hỏng | TB | S–L | `.vercelignore`, `ieltsFoundationData.js`, `localOnly.js:12` |

---

## 7. HAI HƯỚNG ĐI

**Hướng A — Mở rộng thành nền tảng 4 kỹ năng thật.**
Cần: (1) nguồn audio người thật hoặc TTS neural chất lượng cao có kiểm soát (ưu tiên giải quyết 30GB đang có: host streaming + gắn vào lộ trình thay vì localhost-only); (2) module phonics + listening đa câu + dictation câu (mục 6.5–6.6); (3) vòng lặp Nói: shadowing → ghi âm (`MediaRecorder`) → tự nghe lại → chấm ASR câu-mức, về sau cân nhắc API chấm phát âm chuyên dụng; (4) trục Viết câu→đoạn với Gemini chấm tiêu chí; (5) hệ đánh giá vào–ra mỗi chặng. Khối lượng: ~mục 6 #3–#9 + hạ tầng media — **nhiều tháng làm việc**, nhưng nền dữ liệu (IPA, bài đọc, SRS, error bank) đã có sẵn và tốt; cái thiếu là "drivetrain" nối chúng lại.

**Hướng B — Giữ phạm vi, định vị lại thành "nền tảng Ngữ pháp & Từ vựng cho người mất gốc".**
Trung thực hơn với năng lực hiện tại và rẻ hơn nhiều. Câu chữ cần sửa:
- `AccessGate.jsx:134`: bỏ/bớt *"Đủ 4 kỹ năng — Nghe – Nói – Đọc – Viết luyện xen kẽ trong từng chủ đề, không học lệch"* → ví dụ "Ngữ pháp – Từ vựng – Đọc hiểu chuyên sâu, kèm luyện phản xạ nghe-nói cơ bản".
- `AccessGate.jsx:104`: "luyện phát âm" → "phiên âm IPA trên toàn bộ từ vựng" (chừng nào chưa có module phonics).
- `index.html:17-18` đã định vị đúng "Ngữ pháp & Từ vựng" — giữ nguyên, đồng bộ các nơi khác theo nó.
- `WelcomePage.jsx:117-124` + `shareCard.js:56`: bỏ nhãn CEFR khỏi danh hiệu theo-số-click ("C2 Master" → "Bậc Thầy Chuyên Cần").
- `SpeakingPractice.jsx:134,143`: "AI NGHE THẤY"/"Phát âm chuẩn!" → "Trình duyệt nhận ra"/"Khớp từ!".
- `LearningReport.jsx:50`: chứng nhận không in trình độ đầu vào như thành tựu.
- Vẫn nên làm tối thiểu #1–#4 mục 6 (gate điểm, nối placement, dọn rác dữ liệu, câu hỏi đọc thật) — vì kể cả định vị hẹp, "lộ trình rõ ràng" hiện vẫn chưa đạt.

---

## 8. NHỮNG GÌ KHÔNG KIỂM TRA ĐƯỢC

1. **Chất lượng TTS thực tế** — phụ thuộc giọng OS/trình duyệt của từng người học; không đánh giá được từ mã nguồn.
2. **Độ chính xác đáp án của ≈22.300 bài tập** — chỉ kiểm mẫu (phát hiện lớp rác template ở Oxford Pre-Int); chưa rà từng đáp án ngữ pháp/từ vựng.
3. **Nội dung 30GB video/audio IELTS** — có thật trên đĩa, manifest 80+60+226 bài (`ieltsFoundationData/PrepData/AdvancedData.js`) nhưng không xem/nghe từng file để thẩm định chất lượng sư phạm; bản quyền bộ này cũng ngoài phạm vi audit mã.
4. **Dữ liệu người dùng thật** — toàn bộ tiến độ nằm localStorage + snapshot Upstash Redis (`api/progress.js`); không truy cập được để biết hành vi học thực tế.
5. **Chất lượng phản hồi Gemini runtime** — prompt đã đọc nguyên văn, nhưng output thật phụ thuộc model + key người học; response không có schema ràng buộc (không `responseSchema` — `functions/api/ai.js:128`).
6. **Hành vi Web Speech API theo trình duyệt** — Safari/Firefox có thể không hỗ trợ STT; code có nhánh phát XP danh dự khi thiếu STT (`GamesPage.jsx:440`) nên trải nghiệm thật khác nhau theo máy.
7. **Mâu thuẫn tài liệu đã phát hiện (docs nói có — code nói khác):** `docs/architecture.md` mô tả 3 mode/5 trang/21 chuyên đề/hàm `expandData` — thực tế 7 mode, 7 trang, **78** chuyên đề, `expandData`/`CORE_GRAMMAR_DATA` **không tồn tại** (grep 0 hit); `docs/data_structures.md` mô tả schema ngữ pháp `{i,t,c,th,s,e}` đã lỗi thời hoàn toàn; `docs/product_value_gap_matrix.md:5` khai "đề xuất bài tiếp theo" và "báo cáo tiến bộ theo kỹ năng" đã triển khai — thực tế đề xuất là chuỗi text không điều hướng (`placement.js:32-34`) và biểu đồ kỹ năng là snapshot đầu vào đông cứng (`LearningReport.jsx:41`). Ngược lại doc cũng *chưa cập nhật* những thứ đã làm xong: error bank 3/7/14, streak freeze, certificate, placement test.

---

## 9. PHỤ LỤC (2026-08-12, sau audit gốc) — NỘI DUNG NGƯỜI SOẠN vs NỘI DUNG MÁY SINH

> Mục này được bổ sung sau đợt kiểm kê theo item và **thay đổi chiến lược nội dung dài hạn**. Mọi đề xuất dùng AI/máy sinh nội dung về sau phải đối chiếu với các con số dưới đây.

### 9.1 Con số quyết định

Kiểm kê theo **item** trên 3 file Oxford Pre-Int production (9.750 item), sau đó mở rộng ra cả 3 sách:

| Nguồn gốc nội dung | Tỉ lệ hỏng thực đo |
|---|---|
| **Người soạn (curated)**: câu ví dụ, IPA, bài textbook có đáp án viết tay, DB sửa lỗi 50 unit | **≈0,04%** (1/2.400 câu textbook Pre-Int; các khối curated khác 0 lỗi) |
| **Máy sinh bằng template**: dragDrop nhân bản, quiz distractor tự chế, "họ từ" ghép hậu tố | **50–100%** tùy khối: dragDrop 50,4–75% hỏng; 1.000/1.000 câu quiz unit 51–100 có distractor literal `wrong_word_1/2/3`; 287 mục "họ từ" ngụy tạo từ tiếng Anh **không tồn tại** ("reviseer", "washbasinful", "nounful") ship thẳng trong tab lý thuyết |

Tổng rác đã kiểm kê và bị chặn: **~4.030 mục** = 2.575 item bài tập (Pre-Int) + 1.000 câu quiz wrong_word + 381 câu textbook filler + ~660 mục lý thuyết ngụy tạo (trên cả Elementary/Advanced) — trừ trùng lặp giữa các nhóm, xem log `[contentFilter]` ở dev.

### 9.2 Nguồn bệnh: 11 nhánh fallback trong generator

Toàn bộ rác truy về được các nhánh fallback trong `generate_preint_data*.js`: khi thiếu dữ liệu curated, generator **tự ghép chuỗi thay thế** ("frequently use X", "X synonym", `wordFamily.split(' ')[0]` → "Từ", "liên quan tới X", `wrong_word_N`, hậu tố `-er/-ful/-ly` đoán mò, câu filler "The correct word is [blank]"). Trớ trêu: phần nội dung curated tốt (`crossRefNotes` soạn tay cho từng unit) lại là **code chết** không bao giờ vào output.

### 9.3 Biện pháp đã triển khai (cùng ngày)

1. **Lọc runtime** ([src/utils/contentFilter.js](src/utils/contentFilter.js)): chặn toàn bộ mẫu rác đã biết trước khi tới người học (bài tập + lý thuyết + textbook), luật khớp-đúng-chữ-ký-máy để không đụng nội dung người soạn; log dev từng item bị loại; unit còn <12 item hợp lệ tự ẩn kèm "đang cập nhật nội dung" (hiện 0/260 unit bị ẩn).
2. **Generator hết quyền bịa**: cả 3 generator bị xóa sạch nhánh fallback; thiếu dữ liệu làm giàu → bỏ qua item; dữ liệu cốt lõi bất thường → `throw` dừng toàn bộ, không ghi file dở dang; output tự kiểm (`assertCleanOutput`) trước khi ghi.
3. **Chốt chặn CI** ([scripts/validate_content.mjs](scripts/validate_content.mjs), chạy trong `npm test`): tầng 1 so dữ liệu thô với baseline đóng băng (rác mới → fail build), tầng 2 xác nhận nội dung hiệu dụng sau lọc sạch 100%.
4. `oxfordPreIntDataPart2.js` (50 unit chết, 0% đạt, trùng id với dữ liệu đang dùng) và generator của nó đã bị xóa (khôi phục được qua git).

### 9.3b Bổ sung đợt (e) cùng ngày — rác NGOÀI generator Pre-Int

Đợt rà (e) tìm thấy hai ổ rác không truy về 11 fallback ở mục 9.2, chứng minh phải kiểm theo **trường dữ liệu**, không chỉ theo nguồn sinh:

1. **250 câu `speaking.trans` máy** trên cả 3 sách Oxford ("[Tạm dịch] Câu ví dụ cho X", "Hãy phát âm và luyện nói câu…", "Đọc to câu này.") — hiển thị ở PracticeTab như bản dịch. Đã ẩn trường trans ở runtime, giữ nguyên câu tiếng Anh.
2. **553 cặp `example`/`viExample` máy trong kho từ vựng** (`vocabFinalData.js` 356, `vocabMoreData.js` 184, `vocabExtendedData.js` 13): viExample là **cụm tiếng Anh trái nghĩa/liên quan**, không phải bản dịch ("hysteria" → "Orderly rational peace"; "parrot" → "Black crow bird"); example là chuỗi keyword không thành câu ("Bouncing white carrot bunny"). Rác này hiển thị ở Flashcard/SRS/Writing/Games và làm **sai đáp án** bài nghe–đọc hiểu tự sinh (buildComprehension lấy viExample làm đáp án đúng). 3 file này không có generator trong repo — rác có sẵn từ lúc nhập liệu. **Điều chỉnh kết luận (d2)**: kiểm kê "kho 22.900 từ sạch" trước đó chỉ đúng với các trường đã soi placeholder; chữ ký "viExample không phải tiếng Việt" bị bỏ sót. Đã lọc runtime (`sanitizeVocabTopics`) bằng luật hẹp đã kiểm chứng: không dấu tiếng Việt VÀ không dấu câu cuối — đúng 553 khớp, 3 câu tiếng Việt không dấu hợp lệ thoát.
3. **Trường nằm im có rác** (chưa render nhưng là bom hẹn giờ): `wordFamily` (2.313 giá trị máy) — có test `tests/dormant_fields.test.js` fail nếu code nào đọc nó; `unit.words[].collocations` template — đã lọc phòng thủ ở runtime.

### 9.4 Nguyên tắc rút ra (ràng buộc cho tương lai)

- **Không ship nội dung máy sinh chưa qua kiểm.** Mọi pipeline sinh nội dung (kể cả AI) phải: (1) xuất ra file đề xuất riêng để duyệt tay theo lô, (2) qua validator trước khi vào `src/data/`, (3) không có nhánh fallback — thiếu dữ liệu thì dừng, không bịa.
- Template chỉ được **đóng gói** dữ liệu người soạn, không được **thay thế** dữ liệu người soạn.

### 9.4b Kết luận về quy mô kho từ vựng (chỉ đạo chủ dự án 2026-08-12, sau đợt đo (g1))

Đo thực tế: kho có **22.204 mục luyện tập** trên **6.618 từ duy nhất** (không phải "22.900 từ"); 271 topic trong aggregate thực chất là ~172 sau khi gộp trùng lặp >70%.

**6.618 từ duy nhất KHÔNG phải tin xấu**: B2 cần ~4.000 từ, C1 cần ~8.000 — kho này phủ tốt tới B2 và thừa cho mục tiêu người mất gốc. Vấn đề chưa bao giờ là thiếu từ, mà là 22.204 mục luyện tập rải trên 6.618 từ **không có thứ tự** ("clean" xuất hiện 28 lần ở 28 chỗ ngẫu nhiên, không theo tiến trình nào). Chiến lược giữ nguyên: **GẮN NHÃN + SẮP THỨ TỰ, không tạo thêm nội dung** — và việc này giờ rẻ hơn ước tính cũ vì chỉ cần xếp 6.618 từ, không phải 22.900. Khử trùng lặp kho topic là hạng mục riêng, làm TRƯỚC #2 (lộ trình), KHÔNG gộp vào #3 (dọn chất lượng) — sửa cấu trúc kho và dọn nội dung là hai việc khác bản chất.

### 9.5 NGUYÊN TẮC PHÂN ĐỊNH GIỮ/XÓA (chỉ đạo chủ dự án 2026-08-12 — áp dụng cho MỌI quyết định về nội dung máy sinh)

- **GIỮ** — nội dung máy sinh bằng cách **SẮP XẾP LẠI nguyên liệu curated** (ví dụ: câu hỏi đọc hiểu tự sinh ở `buildComprehension` — đề bài và mọi đáp án đều là dữ liệu soạn tay, máy chỉ chọn và xáo).
- **XÓA** — nội dung máy sinh từ **TEMPLATE**, tức bịa ra chữ chưa từng có người soạn (ví dụ: "mẫu câu thi" `It is essential to ${từ}...` của PhraseLearningMode).
- Vì sao template-trông-hợp-lý nguy hiểm hơn cả rác lộ liễu: rác Oxford ("wrong_word_1", "Từ") trông rõ là lỗi nên không ai học theo; câu template trông hợp lý và dán nhãn "IELTS Band 7+" sẽ được người học **mang vào phòng thi thật** — kể cả khi sai ngữ pháp ("It is essential to quickly...").
- Chính sách runtime đi kèm (đợt (f)): **thiếu dữ liệu thì ẨN hoặc BÁO, tuyệt đối không thay thế âm thầm; mọi nội dung thay thế phải tự khai báo là nội dung thay thế.**

*Hết báo cáo. Người viết: audit tự động (Claude Code); audit gốc trên commit `d595572`, phụ lục mục 9 bổ sung cùng ngày sau kiểm kê theo item.*

---

## 10. AUDIT LẠI 2026-08-20 — ĐO LẠI TỪNG KHẲNG ĐỊNH CỦA MỤC 0–8

> Audit gốc lập ngày **2026-08-12** trên commit `d595572`. Tám ngày sau, phần lớn kết luận của nó **đã hết hiệu lực**. Mục này đo lại **từng khẳng định** trên mã hiện tại (`2c7aa4b`) — không tin trí nhớ, không tin báo cáo cũ.
>
> ⚠️ **Bản đầu của chính phép đo này đã hỏng và suýt cho kết quả sai.** Nó gọi `rg`, mà shell ở máy này không có `rg`, nên một nửa số phép đếm trả về **0 giả** — đọc thành "tính năng không tồn tại". Nay bộ đo có **chốt tự kiểm**: nếu grep không tìm nổi một chuỗi chắc chắn có thật (`completeMilestone`) thì nó dừng và báo THƯỚC HỎNG thay vì in ra số.
>
> Bài học thứ hai, cùng loại: tra `"minimal pair"` ra 0 kết quả và suýt kết luận "không có luyện cặp tối thiểu" — trong khi dữ liệu A0 có sẵn `ship/sheep`, `bit/beat`. **Tra bằng THUẬT NGỮ thì đo được cách người ta đặt tên, không đo được thứ có thật.**

### 10.1 Những gì audit 12/08 nói ĐÚNG lúc đó, nay ĐÃ SỬA

| # | Kết luận cũ (12/08) | Đo lại 20/08 | Bằng chứng |
|---|---|---|---|
| 1 | Câu hỏi đọc hiểu **không hỏi về bài đọc**; chỉ **1/280** chủ đề có câu soạn tay | **532 chủ đề · 2.128 câu**, và **100% kèm câu DẪN CHỨNG trích nguyên văn từ bài** (trường `dan`) | `storyQuiz*.js` ×6 |
| 2 | **0 file audio người thật** trong bản ship; 100% TTS | Nay có bản thu người thật, nhưng ở **HAI kho tách biệt**: **239 tệp `tat-*.mp3` (Tatoeba) ship kèm bản dựng** trong `public/audio`, phục vụ mục từ/chép chính tả; và **60 bài nghe đoạn dài của VOA** — 100% có bản ghi lời, câu hỏi kèm căn cứ, khai giấy phép, nhưng **phát trực tiếp từ máy chủ VOA**, không có tệp nội bộ. Xem rủi ro ở [10.2 #9](#102-những-gì-vẫn-còn-thiếu-đo-được-2008) | `public/audio/` (239, git theo dõi đủ), `listeningPassages.js` |
| 3 | **Không có module phát âm/phonics nào** — "0 kết quả sư phạm" | **Bậc A0 = 12 chặng phonics**: bảng chữ cái, IPA, nguyên âm ngắn/dài/đôi, **/θ/–/ð/**, **âm cuối (đúng lỗi người Việt)**, đuôi -s/-ed, trọng âm, ngữ điệu, nối âm. Có cặp tối thiểu (ship/sheep, bit/beat) | `foundationData.js` 43 KB |
| 4 | Gamification **thưởng cho cú bấm**; QuizEngine tính điểm rồi vứt | **Cổng độ chính xác**: `PASS_THRESHOLD = 0.8`, `PASS_THRESHOLD_MCQ_HEAVY = 0.85`. `milestone_gate.test.js` bắt mọi chỗ gọi `completeMilestone` phải có **bằng chứng**, hoặc miễn trừ có lý do ghi rõ | `src/utils/mastery.js` |
| 5 | 30 cú click = danh hiệu **"C2 Master"**, in cả lên ảnh chia sẻ | Đã bỏ — chỉ còn **chú thích ghi lại rằng đã bỏ**. `c1_branch.test.js` chặn **mọi chuỗi** hứa vượt "B2 + nền C1" | `WelcomePage.jsx:268` |
| 6 | Chứng nhận in **trình độ ĐẦU VÀO** như thành tựu | Bậc trên giấy **chỉ lấy từ lượt THI ĐẠT**; tờ giấy **tự phủ nhận** nó là chứng chỉ CEFR | `tests/certificate.test.js` |
| 7 | Biểu đồ kỹ năng là **ảnh chụp đông cứng** của bài test đầu vào | Hồ sơ kỹ năng: kỹ năng **chưa đo được thì ghi rõ lý do**, không dựng khung rỗng, không suy bậc từ kết quả cũ | `tests/skill_profile.test.js` |
| 8 | Kết quả placement **không điều hướng bất cứ thứ gì** | `recommendationFromPlacement` được `WelcomePage.jsx` dùng thật. Sai hết → bậc `starter` + cờ **`preA1`** → băng vàng chỉ thẳng *"bắt đầu ở cụm A0 — Mất Gốc"*. Đã lái thử tận nơi | `khach:het` bước "KIỂM TRA ĐẦU VÀO" |
| 9 | Rác template Oxford: `wrong_word_`, `"word": "Từ"`, `"use the word X"` | `wrong_word_` = **0**, `"word": "Từ"` = **0**. Có `contentFilter.js` lọc runtime + `validate_content.mjs` chạy trong `npm test` | đếm trên `src/data` |
| 10 | Viết: **1 màn hình, 1 câu/lần**; tiến trình câu→đoạn→bài **không tồn tại** | **9 đề soạn tay có bài mẫu** chia đúng ba mức (**2 câu · 4 đoạn · 3 bài**) + **621 đề gắn theo chặng** | `writingPrompts.js`, `writingCounts.js` |
| 11 | Nhãn nói quá: "AI NGHE THẤY", "Phát âm chuẩn!" | Cả hai **đã bỏ**; chỉ còn chú thích lịch sử. Panel nói thẳng máy **không chấm được phát âm** | `GamesPage.jsx:428` |
| 12 | Lộ trình **44 chặng**, phủ 9% từ vựng / 24% ngữ pháp / **0/260** unit Oxford | **710 chặng**; tiêu chí **N1 xanh** — *mọi* nội dung đã soạn đều có đúng một chặng dẫn tới | `roadmap_coverage.test.js` |

### 10.2 Những gì VẪN CÒN THIẾU (đo được, 20/08)

| # | Thiếu sót | Đo được | Ảnh hưởng tới cam kết | Việc cần làm |
|---|---|---|---|---|
| **1** | **Không có bài thi cuối bậc cho A1 và C1** | Chỉ có **3** bài: A2, B1, B2 (14 câu · 4 phần · ngưỡng 0,7) | Cam kết nói "lên từng bậc **A1**, A2, B1, B2 và **nền C1**" — hai đầu của thang **không có cửa đo** | Soạn `exam-a1` và `exam-c1` theo đúng khuôn 4 phần đã có |
| **2** | **Mục tiêu học hỏi xong rồi bỏ đó** | `getLearningGoal()` — **0 nơi gọi** | Người chọn "thi VSTEP" và người chọn "giao tiếp" nhận **cùng một lộ trình** | Lọc/xếp lại thứ tự chặng theo `learningGoalV1` |
| **3** | **App không đo thời gian học** | 0 dòng `timeSpent`/`minutesSpent` | Mọi con số "~N giờ" là **ước lượng tĩnh**, không cá nhân hoá và không tự kiểm được | Ghi thời lượng mỗi buổi, đối chiếu với ước lượng |
| **4** | **Không ghi âm được giọng mình** | `MediaRecorder`/`getUserMedia` = **0** | Không nghe lại, không shadowing — vòng luyện nói còn hở một nửa | Thêm ghi âm + nghe lại (không hứa chấm phát âm) |
| **5** | **Không chấm phát âm ở bất kỳ mức nào** | Trình duyệt chỉ trả **bản chữ** | "Tốt 4 kỹ năng" đúng phần nội dung, **không đúng phần phát âm** | Cần API chấm phát âm chuyên dụng — có phí |
| **6** | **Chấm nói/viết cần key Gemini của người học** | 100% BYOK, không key server | Người không lấy key **mất phần chấm** của hai kỹ năng sản sinh | Đã nói thẳng trong app; cân nhắc chấm ngoại tuyến theo tiêu chí |
| **7** | **Bậc B2 mỏng hơn hàng xóm** | B2 **93 giờ** vs B1 151, C1 149 — chênh lệch **đúng bằng** một bộ giáo trình Oxford mà kho không có tập cho B2 | Bậc ĐÍCH là bậc ít giờ nhất | **Mua/xin phép** tài liệu B2 — không phải việc soạn thêm |
| **8** | **Không khoá chặng** (chỉ khoá mềm) | Chỉ có băng cảnh báo **"⚠ Vượt cấp"**; không chặn | **CỐ Ý** (ghi rõ "(1.6) Khoá MỀM: cảnh báo, không chặn"). Ghi ở đây để không ai đọc nhầm là bỏ sót | Giữ nguyên, trừ khi đổi chủ trương |
| **9** | **Toàn bộ 60 bài nghe đoạn dài phụ thuộc máy chủ VOA lúc chạy** | **60/60** `audioUrl` trỏ ra `voa-audio.voanews.eu`; **0** tệp nội bộ. `public/audio` có 239 tệp nhưng là bản thu **câu Tatoeba** (`tat-*.mp3`) cho mục khác — **hai tập rời nhau**. `npm run kiem:voa`: **60/60 còn sống** (20/08) | Kỹ năng NGHE của một sản phẩm **có thu phí** treo vào bên thứ ba. VOA đổi hoặc gỡ đường dẫn thì mục nghe **tắt hẳn**, không có bản dự phòng. VOA là tài sản công (public domain) nên **được phép** tải về — đây là rủi ro vận hành, không phải rủi ro bản quyền | Tải 60 tệp về `public/audio` như đã làm với Tatoeba, giữ `audioUrl` gốc làm đường lùi; chạy `kiem:voa` định kỳ cho tới khi tải xong |

### 10.3 Trả lời lại hai câu hỏi gốc

**Q1 — Người mất gốc học hết web này có đạt B2 + nền C1 không?**

Audit 12/08 trả lời **"CHƯA, trần là A2"**. Đo lại 20/08: **ĐẠT về khối lượng và đường đi**, với hai giới hạn đã công bố.

- **587 giờ** nội dung cộng dồn A0→B2, so với mốc tham chiếu CEFR/Cambridge **500–600 giờ**.
- Người mất gốc thật **không bị thả nhầm chỗ**: sai hết → `starter` + cờ `preA1` → chỉ thẳng vào cụm A0.
- Bốn kỹ năng đều có đường: đọc **2.128 câu có dẫn chứng**, nghe **60 bài thu thật** (phát từ máy chủ VOA — xem 10.2 #9), viết phủ **99–100%** chặng A2+, nói phủ **99–100%** chặng B1+.
- **Ba giới hạn thật**: phát âm **không chấm được**; chấm nói/viết **cần key AI của chính người học**; và mục nghe **phụ thuộc máy chủ VOA lúc chạy**.

**Q2 — Đã có lộ trình rõ ràng chưa?**

**RÕ hơn hẳn, còn thiếu ba mắt xích.** Có 710 chặng phủ trọn kho, có đo đầu vào dẫn đúng bậc, có cổng độ chính xác 0,8/0,85, có thi cuối bậc làm căn cứ cấp chứng nhận. **Thiếu**: bài thi cuối bậc cho **A1** và **C1** (mục 10.2 #1), lộ trình **không đổi theo mục tiêu** người học đã chọn (#2), và app **không đo thời gian thật** (#3).

*Phụ lục mục 10 lập 2026-08-20 trên commit `2c7aa4b`. Mọi con số đo bằng script có chốt tự kiểm; chỗ nào không đo được đã ghi rõ là không đo được.*
