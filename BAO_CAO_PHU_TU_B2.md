# ĐỘ PHỦ VỐN TỪ B2 — đo ngày 27/08/2026, cập nhật sau khi soạn xong ba đợt

Chủ dự án cung cấp *The Oxford 5000™ by CEFR level* (Oxford University Press)
làm bảng đối chiếu. Báo cáo này trả lời đúng một câu hỏi: **người học đi hết
web có được dạy đủ vốn từ dải B2 không?**

## ⚠️ Vì sao trong repo KHÔNG có file danh sách Oxford

Oxford 5000 là **tuyển tập có bản quyền của OUP** — cái được bảo hộ không phải
từng từ tiếng Anh, mà là việc *chọn và xếp bậc* chúng. Chép nguyên dải B2 vào
`src/data/` là tái bản tuyển tập đó, và sinh hàng trăm mục từ vựng từ nó là
đúng loại nội dung sinh theo khuôn mà luật GIỮ/XÓA của dự án bảo phải xóa.

Nên bảng đối chiếu chỉ tồn tại trong thư mục nháp ngoài repo. Thứ đi vào repo
là **con số và nội dung soạn mới** — không phải bản sao. Mọi nghĩa tiếng Việt,
mọi câu ví dụ và cả ba bài đọc đều viết mới, và các từ được xếp theo **chủ đề**
chứ không theo thứ tự bảng chữ cái của OUP.

## Kết quả sau khi soạn

Dải B2 của bảng đối chiếu có **700 từ**. Trạng thái hiện nay:

| | Số từ | Nghĩa là gì |
|---|---:|---|
| **Có mục từ riêng** | 611 | có nghĩa tiếng Việt, IPA, câu ví dụ, có luyện |
| **Dạy trong unit giáo trình Oxford** | 86 | dạy qua `theory` / `quiz` / `typingGame`, không qua mục từ |
| **Bỏ có chủ ý** | 3 | `gay`, `punk`, `sexy` |

**697/700 từ dải B2 đều được dạy.** Ba từ còn lại bị bỏ có chủ đích vì không
hợp với một web dạy tiếng Anh phổ thông cho người Việt — bỏ CÓ CHỦ Ý thì không
phải là thiếu.

⚠️ **Không gộp 86 từ Oxford vào một tỷ lệ chung.** Chúng được dạy bằng một cơ
chế khác (unit giáo trình, không phải mục từ). Gộp lại thành một con số duy
nhất là làm mờ đúng cái khác biệt mà người đọc báo cáo cần biết.

### Vì sao KHÔNG soạn lại 86 từ nhóm Oxford thành mục từ

Chúng nằm trong 260 unit giáo trình đang có trên web. Soạn lại thành mục từ là
**dạy hai lần cùng một từ ở hai chỗ**, và sẽ đẻ ra đúng loại trùng lặp mà
`npm run bam:dup` sinh ra để chặn. *Thiếu khuôn không phải là thiếu nội dung.*

## Ba đợt đã soạn — 233 mục từ, toàn bộ viết tay

| Chặng | Số từ | Đóng nhóm nào |
|---|---:|---|
| 🧭 Nhận Định & Sự Việc (B2) | 66 | 69 từ **vắng hẳn**, trừ 3 từ bỏ có chủ ý |
| 🧩 Đời Sống, Công Việc & Mô Tả (B2) | 89 | phần đầu nhóm **chỉ lướt qua** |
| 🧱 Thời Gian, Mức Độ & Đời Sống Xã Hội (B2) | 78 | nốt nhóm **chỉ lướt qua** |

Mỗi mục có `{en, vi, type, ipa, example, viExample}` soạn riêng. Mỗi chặng kèm
một bài đọc hai phần dùng chính các từ đó, và **5 câu hỏi đọc hiểu mức văn
bản** có căn cứ trích nguyên văn từ bài đọc của chính chặng ấy.

Lộ trình: **724 chặng**, trong đó **41 chặng từ vựng bậc B2**. Kho hiện có 270
chủ đề từ vựng · 6.853 mục từ · 269 bài đọc có câu hỏi mức văn bản.

## Hai con số của tôi đã SAI trước khi ra được con số đúng

Ghi lại vì cả hai đều là lỗi ĐO, và cả hai đều trông rất thuyết phục lúc sai.

**1. "54% dạy hẳn" là đếm thiếu.** Bản đầu cộng từ Oxford bằng
`u.coreVocab || u.vocab || u.words` — **cả ba trường đều không tồn tại**. Unit
Oxford có `theory` / `quiz` / `typingGame` / `speaking` / `textbookExercises`.
Dấu hiệu lẽ ra phải thấy ngay: 352 từ / 260 unit = **1,35 từ mỗi unit**, trong
khi giáo trình dạy 15–30 từ một unit. Con số đúng trước khi soạn là **66,3%**
(464/700), không phải 54%.

**2. "0/322 từ xuất hiện" là do shell nuốt dấu gạch chéo ngược.** Script viết
bằng heredoc nên `\b` (ranh giới từ) thành chữ `b`, mọi phép thử đều trượt —
vô lý với 13,9 triệu ký tự tiếng Anh. Nay mọi script đo đều có **phép thử
mồi**: đo một từ chắc chắn có mặt trước, trượt thì dừng hẳn thay vì in ra một
con số sai.

## Cách đo lại

Script đo nằm ngoài repo (thư mục nháp phiên làm việc): `do_song.mjs` — nó
**nạp `TAT_CA_CHU_DE` như app nạp**, không grep chữ `en:` trong file thô.

Khác biệt này quan trọng: bản grep vẫn xanh kể cả khi module mới **chưa được
nối vào `TAT_CA_CHU_DE`** — tức là từ đã soạn nhưng người học không bao giờ
thấy. `do_song.mjs` có phép thử mồi cho từng đợt, thiếu đợt nào thì dừng.

Kết quả lần chạy cuối:

```
✓ cả ba đợt đều có mặt trong dữ liệu sống · 270 chủ đề · 6853 mục từ
Trong 322 từ B2 từng thiếu mục từ riêng: đã soạn 233 · còn 89
  · vắng hẳn còn  : 3 → gay punk sexy
  · chỉ lướt qua  : 0 → (hết)
  · Oxford có dạy : 86 (dạy trong unit giáo trình, cố ý không soạn lại thành mục từ)
```

## Bảy cửa một chặng mới phải qua

1. `level: 'B2'` **trần** — `bandFromLevelString` kiểm `B1` TRƯỚC `B2`, nên
   `"B1-B2"` rơi xuống bậc intermediate và chặng biến mất khỏi B2, không báo gì.
2. Nối module vào `TAT_CA_CHU_DE` trong `src/data/vocabVstepData.js`.
3. ≥4 câu hỏi mức văn bản, `dan` **nguyên văn** từ `storyEn` của chính chặng đó,
   vị trí đáp án xáo, độ dài phương án không thiên về đáp án đúng.
4. Chạy lại `build_roadmap.mjs`, `build_speaking_tasks.mjs`,
   `build_writing_tasks.mjs`, `audit_story_caps.mjs --snapshot`.
5. Nâng bánh cóc: `roadmap_coverage.test.js`, `story_quiz.test.js`, và số chặng
   trong `index.html`.
6. `npm test` · `npm run lint` · `npm run di:dong` · `npm run bam:dup`.
7. `node scripts/mo_bai_b2.mjs` — **mở thật trên trình duyệt**. Test đếm được
   phần tử trong mảng nhưng không biết component đọc trường tên gì; dự án đã hai
   lần soạn nội dung đúng nghĩa mà sai khuôn với `npm test` xanh.
