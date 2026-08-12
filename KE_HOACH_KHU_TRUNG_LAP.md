# KẾ HOẠCH KHỬ TRÙNG LẶP KHO TOPIC TỪ VỰNG — (h2) 2026-08-12

**TRẠNG THÁI: ĐÃ THI HÀNH 2026-08-12 theo duyệt của chủ dự án:**
- **MỨC A — ĐÃ GỘP** 4 cụm (xóa 4 bản tập con khỏi file nguồn, mỗi cụm 1 commit). Thực đo sau gộp: chỉ mất **2 từ duy nhất** trên toàn kho (ước tính 5 là tính trong cụm; 3 từ còn tồn tại ở topic khác).
- **MỨC B — KHÔNG GỘP CỤM NÀO** (quyết định chủ dự án: bug đã hết sau (h1), gộp chỉ để gọn nhưng giá là 820 từ + thao tác không lùi được). Thay vào đó **đổi id `-pN` + tiêu đề "– Phần N"** cho toàn bộ 43 bản trùng còn lại. Lưu ý thi hành: bản giữ tên gốc là bản **ĐẦU TIÊN theo thứ tự danh sách** (bắt buộc — tiến độ người dùng cũ lưu dưới id gốc), có thể khác "bản GIỮ theo kích thước" trong bảng B bên dưới; không bản nào bị xóa nên khác biệt này không mất dữ liệu.
- **MỨC C — KHÔNG GỘP**, chuyển thành dữ liệu dùng được: `src/data/topicFamilies.json` (33 họ, 126 topic, 140 cặp trùng >70%; sinh bởi `scripts/build_topic_families.mjs`) — **đầu vào bắt buộc của #2**.
- Kết quả: aggregate 271 → **267 topic, 267 id duy nhất** (0 trùng); `withUniqueTopicIds` trong App.jsx giữ lại làm lưới an toàn.

Bảng phân tích gốc giữ nguyên bên dưới làm hồ sơ. Hạng mục riêng, làm TRƯỚC #2, KHÔNG gộp vào #3.

Bối cảnh: aggregate có 271 topic; 37 cụm trùng ID (84 topic); 156 cặp trùng >70% từ; thực chất ~172 topic. Bug chọn-nhầm-bản đã sửa tạm bằng id duy nhất `id--n` ((h1) 2026-08-12) — người dùng mở đúng bản, nhưng kho vẫn thừa.

Quy ước: "GIỮ" = bản nhiều từ nhất trong cụm; "BỎ" = bản còn lại; "% trong bản giữ" = tỉ lệ từ của bản bỏ có mặt trong bản giữ; "TỪ RIÊNG mất" = từ chỉ có ở bản bỏ.

## MỨC A — trùng ID, bản bỏ nằm ≥95% trong bản giữ (an toàn, tự động gộp SAU KHI DUYỆT)

| ID | GIỮ | BỎ | % trong bản giữ | Từ riêng mất |
|---|---|---|---|---|
| food-meals-beginner | vocabBeginnerNew5.js (101 từ) | vocabBeginnerNew26.js (50 từ) | 100% | 0 |
| time-dates-beginner | vocabBeginnerNew17.js (93 từ) | vocabBeginnerNew35.js (50 từ) | 98% | 1 |
| animals-pets-beginner | vocabBeginnerNew12.js (89 từ) | vocabBeginnerNew25.js (49 từ) | 96% | 2 |
| colors-shapes-beginner | vocabBeginnerNew11.js (90 từ) | vocabBeginnerNew29.js (49 từ) | 96% | 2 |

→ Bỏ 4 bản, mất tổng cộng **5 từ riêng** trên toàn kho.

## MỨC B — trùng ID, chồng lấn 38–94% (DUYỆT TỪNG CỤM, xếp theo số từ riêng sẽ mất)

| ID | GIỮ | BỎ? | % trong bản giữ | Từ riêng mất |
|---|---|---|---|---|
| history-culture-ielts | vocabIeltsNew13.js (98) | vocabIeltsNew20.js (97) | 46% | **52** |
| weather-seasons-daily | vocabDailyNew4.js (99) | vocabDailyNew18.js (90) | 59% | 37 |
| days-months-beginner | vocabBeginnerNew13.js (89) | vocabBeginnerNew9.js (86) | 58% | 36 |
| media-advertising-ielts | vocabIeltsNew15.js (99) | vocabIeltsNew5.js (88) | 60% | 35 |
| space-exploration-ielts | vocabIeltsNew17.js (97) | vocabIeltsNew6.js (89) | 61% | 35 |
| family-relationships-daily | vocabDailyNew10.js (100) | vocabDailyNew19.js (100) | 65% | 35 |
| family-people-beginner | vocabBeginnerNew18.js (94) | vocabBeginnerNew15.js (81) | 57% | 35 |
| places-buildings-beginner | vocabBeginnerNew20.js (94) | vocabBeginnerNew12.js (86) | 59% | 35 |
| global-issues-politics-ielts | vocabIeltsNew24.js (50) | vocabIeltsNew34.js (50) | 38% | 31 |
| family-people-beginner | vocabBeginnerNew18.js (94) | vocabBeginnerNew4.js (90) | 69% | 28 |
| colors-shapes-beginner | vocabBeginnerNew11.js (90) | vocabBeginnerNew6.js (89) | 69% | 28 |
| weather-seasons-beginner | vocabBeginnerNew14.js (90) | vocabBeginnerNew7.js (86) | 67% | 28 |
| weather-seasons-beginner | vocabBeginnerNew14.js (90) | vocabBeginnerNew22.js (85) | 67% | 28 |
| technology-internet-daily | vocabDailyNew5.js (99) | vocabDailyNew12.js (89) | 70% | 27 |
| animals-pets-beginner | vocabBeginnerNew12.js (89) | vocabBeginnerNew7.js (88) | 72% | 25 |
| clothes-accessories-beginner | vocabBeginnerNew11.js (89) | vocabBeginnerNew24.js (50) | 56% | 22 |
| technology-gadgets-daily | vocabDailyNew23.js (50) | vocabDailyNew23.js (50, topic thứ 2 cùng file) | 58% | 21 |
| clothes-fashion-daily | vocabDailyNew11.js (99) | vocabDailyNew14.js (85) | 79% | 18 |
| entertainment-media-daily | vocabDailyNew12.js (99) | vocabDailyNew25.js (50) | 66% | 17 |
| weather-seasons-beginner | vocabBeginnerNew14.js (90) | vocabBeginnerNew31.js (50) | 66% | 17 |
| nature-environment-daily | vocabDailyNew26.js (50) | vocabDailyNew26.js (50, topic thứ 2 cùng file) | 66% | 17 |
| body-health-beginner | vocabBeginnerNew5.js (93) | vocabBeginnerNew10.js (91) | 82% | 16 |
| architecture-urban-ielts | vocabIeltsNew25.js (50) | vocabIeltsNew30.js (50) | 68% | 16 |
| psychology-mind-ielts | vocabIeltsNew7.js (91) | vocabIeltsNew26.js (50) | 70% | 15 |
| food-drinks-beginner | vocabBeginnerNew2.js (100) | vocabBeginnerNew13.js (94) | 84% | 15 |
| media-communication-ielts | vocabIeltsNew3.js (97) | vocabIeltsNew23.js (50) | 72% | 14 |
| house-rooms-beginner | vocabBeginnerNew4.js (89) | vocabBeginnerNew24.js (50) | 74% | 13 |
| clothes-fashion-beginner | vocabBeginnerNew6.js (97) | vocabBeginnerNew30.js (50) | 76% | 12 |
| art-design-ielts | vocabIeltsNew10.js (100) | vocabIeltsNew27.js (50) | 78% | 11 |
| food-agriculture-ielts | vocabIeltsNew11.js (100) | vocabIeltsNew32.js (50) | 78% | 11 |
| transport-vehicles-beginner | vocabBeginnerNew8.js (88) | vocabBeginnerNew27.js (50) | 78% | 11 |
| law-crime-ielts | vocabIeltsNew12.js (100) | vocabIeltsNew22.js (50) | 82% | 9 |
| body-health-beginner | vocabBeginnerNew5.js (93) | vocabBeginnerNew15.js (71) | 89% | 8 |
| space-exploration-ielts | vocabIeltsNew17.js (97) | vocabIeltsNew31.js (50) | 86% | 7 |
| literature-poetry-ielts | vocabIeltsNew10.js (90) | vocabIeltsNew35.js (50) | 86% | 7 |
| law-crime-ielts | vocabIeltsNew12.js (100) | vocabIeltsNew28.js (50) | 86% | 7 |
| food-cooking-daily | vocabDailyNew7.js (90) | vocabDailyNew27.js (50) | 86% | 7 |
| education-school-daily | vocabDailyNew8.js (100) | vocabDailyNew22.js (50) | 86% | 7 |
| numbers-time-beginner | vocabBeginnerNew9.js (88) | vocabBeginnerNew29.js (49) | 86% | 7 |
| business-economy-ielts | vocabIeltsNew21.js (75) | vocabIeltsNew29.js (50) | 86% | 7 |
| health-body-daily | vocabDailyNew3.js (100) | vocabDailyNew22.js (60) | 92% | 5 |
| weather-seasons-daily | vocabDailyNew4.js (99) | vocabDailyNew29.js (50) | 90% | 5 |
| colors-shapes-beginner | vocabBeginnerNew11.js (90) | vocabBeginnerNew25.js (49) | 94% | 3 |

→ 43 bản chờ duyệt; tổng từ riêng có nguy cơ mất: **820**. Phương án thay thế cho các cụm mất nhiều từ (52/37/36…): thay vì BỎ bản trùng, **đổi id + đặt lại tên** thành chủ đề "phần 2" — giữ từ, hết trùng ID (quyết định của chủ dự án theo từng cụm).

## MỨC C — KHÁC ID, trùng >70% từ (KHÔNG tự gộp — có thể là 2 chủ đề hợp lệ chồng lấn)

120 cặp, quy về các **họ chủ đề** lớn (các cặp chi tiết trong log (g1)/(h2)):

| Họ chủ đề | Các topic dính nhau (mức trùng cao nhất trong họ) | Ghi chú |
|---|---|---|
| Sức khỏe/Cơ thể | health-basics, health-body-daily, body-health-daily, body-health-beginner ×3, health-fitness-daily, health-medicine-daily, body-parts-beginner, human-body-beginner, medicine-healthcare-vstep | tới 95% (body-health-daily ~ health-body-daily) |
| Luật/Tội phạm | crime-law-vstep, crime-punishment-vstep, crime-law-ielts, crime-law-advanced-ielts, law-crime-ielts ×3 | tới 88% |
| Quần áo/Thời trang | clothes-fashion-daily ×2, clothes-colors/fashion/accessories-beginner, clothes-beginner, shopping-clothes-daily | tới 90% |
| Thời tiết | weather-seasons-beginner ×4, weather-seasons-daily ×3, weather-climate-daily | tới 96% (weather-seasons-daily ~ weather-climate-daily) |
| Đồ ăn | food-drinks/meals-beginner, food-cooking/dining-daily | tới 100% (food-drinks-beginner ⊃ food-meals-beginner-50) |
| Thời gian/Ngày tháng | days-months-beginner, time-dates-beginner, time-calendar-beginner, time-dates-beginner-50 | tới 100% (time-calendar ⊂ days-months & time-dates) |
| Công nghệ | technology-internet-daily ×2, technology-gadgets-daily ×2, technology-daily-life | tới 84% |
| Không gian | space-exploration-vstep, space-astronomy-vstep, space-exploration-ielts | 76–79% |
| Nhà cửa | house-rooms-beginner ×2, rooms-furniture-beginner, house-furniture-daily, housing-home-daily | 71–79% |
| Nghề nghiệp | jobs-occupations/professions/work-beginner, jobs-careers-daily, work-career/jobs-daily | 75–80% |
| Giáo dục | school-learning-beginner, school-classroom-beginner, education-school-daily ×2, education-learning-daily | 72–82% |
| Động vật/Thiên nhiên | animals-nature-beginner/daily, animals-pets-beginner, nature-animals-beginner | tới 92% |
| Chính trị/Lịch sử/Văn học/Kinh doanh (IELTS/VSTEP) | politics↔government, history-civilizations/past/culture/heritage, literature-poetry/writing, business-finance/economy, languages↔language-communication, energy-resources vstep↔ielts | 71–88% — nhiều cặp là cùng chủ đề đặt 2 tên |

## KẾ HOẠCH DI TRÚ TIẾN ĐỘ (khi gộp, sau duyệt)

1. Gộp = xóa topic bản-bỏ khỏi file nguồn (mỗi cụm 1 commit riêng, ghi id + file vào message).
2. Tiến độ: store `vocabProgress` theo id. Bản bỏ có id `id--n` (chỉ tồn tại từ (h1), lượng tiến độ tích lũy rất nhỏ). Di trú **chỉ cộng thêm, không bao giờ xóa**: nếu `id--n` nằm trong `completedMilestones` → thêm id bản giữ (nếu chưa có); XP đã cộng là toàn cục, giữ nguyên; `visitedModes` hợp nhất; `studiedWordIndexes` KHÔNG chuyển (chỉ số từ giữa hai bản không tương thích — chấp nhận học lại tiến độ trong-topic, không mất milestone/XP).
3. Entry localStorage của `id--n` GIỮ NGUYÊN không xóa (để lùi được).

## PHƯƠNG ÁN LÙI

- Data: revert commit của cụm đó (mỗi cụm 1 commit).
- Runtime: di trú chỉ-cộng-thêm + không xóa key cũ → revert code là hành vi cũ trở lại nguyên vẹn.
- Trước khi chạy đợt gộp đầu tiên: nhắc người dùng backup (đã có tính năng backup/restore, test "learning progress can be exported and restored safely" đang xanh).

**Chưa chạy bất kỳ bước nào cho tới khi chủ dự án duyệt từng mức.**
