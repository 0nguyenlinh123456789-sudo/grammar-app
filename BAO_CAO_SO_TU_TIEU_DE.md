# BẢNG ĐỐI CHIẾU — SỐ TỪ KHAI TRONG TIÊU ĐỀ & MÔ TẢ CHỦ ĐỀ

> Đo ngày 2026-08-14 trên dữ liệu **đã qua lớp lọc runtime** (đúng thứ người học thấy).
> Số từ thật = `activeTopic.words.length`, chính là con số giao diện đang hiển thị.
> **Chưa sửa gì cả** — chờ duyệt.

## Tổng quan

| | Số chủ đề |
|---|---|
| Tổng chủ đề trong kho | 267 |
| Tiêu đề CÓ khai số từ | 235 |
| → khai **SAI** | **182** |
| → khai đúng | 53 |
| Tiêu đề không khai số | 32 |
| Mô tả CÓ khai số từ | 235 |
| → khai **SAI** | **182** |
| → khai đúng | 53 |
| **Chủ đề sai ở ít nhất một chỗ** | **184** |

Cộng dồn riêng phần tiêu đề: hứa **23.452** từ, thực có **18.569** từ — **thiếu 4.883 từ**.

Trường hợp nặng nhất: khai 100, thật 50 (73 chủ đề — đúng một nửa).

## Đề xuất

1. **Tiêu đề: bỏ hẳn cụm số từ.** Giao diện đã hiển thị số từ thật rồi, giữ thêm một con số chép tay trong tiêu đề chỉ tạo thêm một chỗ để sai lần nữa mỗi khi kho thay đổi. Áp cho **cả 235** tiêu đề có số, kể cả 53 cái hiện đang đúng — để không còn tiêu đề nào mang số.
2. **Mô tả: thay bằng số thật đo được**, giữ nguyên khuôn câu bạn đã duyệt ở đợt 8 mô tả IELTS.
3. **Thêm test CI ghim bất biến**: tiêu đề không được chứa số từ; mô tả nếu có số thì phải khớp `words.length`. Không có bước này thì vài tháng nữa kho lệch lại là hỏng lại.

---

## Bảng đầy đủ — 184 chủ đề khai sai

| # | id | Số từ thật | Tiêu đề khai | Mô tả khai | Tiêu đề sau khi sửa |
|---|---|---|---|---|---|
| 1 | `health-medicine-ielts` | 50 | **100** ❌ | **100** ❌ | 🏥 Sức Khỏe & Y Tế (B2-C1) |
| 2 | `law-crime-ielts-p2` | 50 | **100** ❌ | **100** ❌ | ⚖️ Luật Pháp & Tội Phạm (B2-C1) – Phần 2 |
| 3 | `arts-culture-ielts` | 50 | **100** ❌ | **100** ❌ | 🎨 Nghệ Thuật & Văn Hóa (B2-C1) |
| 4 | `media-communication-ielts-p2` | 50 | **100** ❌ | **100** ❌ | 📱 Truyền Thông & Giao Tiếp (B2-C1) – Phần 2 |
| 5 | `education-school-daily-p2` | 50 | **100** ❌ | **100** ❌ | 🏫 Giáo Dục & Trường Học (A2-B1) – Phần 2 |
| 6 | `family-relatives-beginner` | 50 | **100** ❌ | **100** ❌ | 👨‍👩‍👧 Gia Đình & Họ Hàng (A1) |
| 7 | `history-past-ielts` | 50 | **100** ❌ | **100** ❌ | 🏛️ Lịch Sử & Quá Khứ (B2-C1) |
| 8 | `global-issues-politics-ielts` | 50 | **100** ❌ | **100** ❌ | 🌍 Vấn Đề Toàn Cầu & Chính Trị (B2-C1) |
| 9 | `technology-gadgets-daily` | 50 | **100** ❌ | **100** ❌ | 💻 Công Nghệ & Thiết Bị (A2-B1) |
| 10 | `house-rooms-beginner-p2` | 50 | **100** ❌ | **100** ❌ | 🏠 Ngôi Nhà & Căn Phòng (A1) – Phần 2 |
| 11 | `clothes-accessories-beginner-p2` | 50 | **100** ❌ | **100** ❌ | 👕 Quần Áo & Phụ Kiện (A1) – Phần 2 |
| 12 | `science-space-ielts` | 50 | **100** ❌ | **100** ❌ | 🔬 Khoa Học & Không Gian (B2-C1) |
| 13 | `architecture-urban-ielts` | 50 | **100** ❌ | **100** ❌ | 🏙️ Kiến Trúc & Quy Hoạch (B2-C1) |
| 14 | `entertainment-media-daily-p2` | 50 | **100** ❌ | **100** ❌ | 🎬 Giải Trí & Truyền Thông (A2-B1) – Phần 2 |
| 15 | `culture-traditions-daily` | 50 | **100** ❌ | **100** ❌ | 🏮 Văn Hóa & Truyền Thống (A2-B1) |
| 16 | `colors-shapes-beginner-p3` | 50 | **100** ❌ | **100** ❌ | 🎨 Màu Sắc & Hình Khối (A1) – Phần 3 |
| 17 | `philosophy-ethics-ielts` | 50 | **100** ❌ | **100** ❌ | 🤔 Triết Học & Đạo Đức (C1-C2) |
| 18 | `psychology-mind-ielts-p2` | 50 | **100** ❌ | **100** ❌ | 🧠 Tâm Lý & Tâm Trí (C1-C2) – Phần 2 |
| 19 | `weather-climate-daily` | 50 | **100** ❌ | **100** ❌ | 🌦️ Thời Tiết & Khí Hậu (A2-B1) |
| 20 | `nature-environment-daily` | 50 | **100** ❌ | **100** ❌ | 🌲 Thiên Nhiên & Môi Trường (A2-B1) |
| 21 | `human-body-beginner` | 50 | **100** ❌ | **100** ❌ | 🧍 Cơ Thể Người (A1) |
| 22 | `literature-writing-ielts` | 50 | **100** ❌ | **100** ❌ | 📖 Văn Học & Viết Lách (C1-C2) |
| 23 | `art-design-ielts-p2` | 50 | **100** ❌ | **100** ❌ | 🎨 Nghệ Thuật & Thiết Kế (C1-C2) – Phần 2 |
| 24 | `health-medicine-daily` | 50 | **100** ❌ | **100** ❌ | 🏥 Sức Khỏe & Y Tế (A2-B1) |
| 25 | `food-cooking-daily-p2` | 50 | **100** ❌ | **100** ❌ | 🍳 Ẩm Thực & Nấu Ăn (A2-B1) – Phần 2 |
| 26 | `hobbies-games-beginner` | 50 | **100** ❌ | **100** ❌ | 🎨 Sở Thích & Trò Chơi (A1) |
| 27 | `transport-vehicles-beginner-p2` | 50 | **100** ❌ | **100** ❌ | 🚗 Giao Thông & Xe Cộ (A1) – Phần 2 |
| 28 | `society-demographics-ielts` | 50 | **100** ❌ | **100** ❌ | 👥 Xã Hội & Nhân Khẩu Học (C1-C2) |
| 29 | `law-crime-ielts-p3` | 50 | **100** ❌ | **100** ❌ | ⚖️ Luật Pháp & Tội Phạm (C1-C2) – Phần 3 |
| 30 | `technology-gadgets-daily-p2` | 50 | **100** ❌ | **100** ❌ | 💻 Công Nghệ & Thiết Bị (A2-B1) – Phần 2 |
| 31 | `communication-internet-daily` | 50 | **100** ❌ | **100** ❌ | 🌐 Giao Tiếp & Internet (A2-B1) |
| 32 | `school-classroom-beginner` | 50 | **100** ❌ | **100** ❌ | 🏫 Trường Học & Lớp Học (A1) |
| 33 | `jobs-professions-beginner` | 50 | **100** ❌ | **100** ❌ | 👨‍🍳 Nghề Nghiệp & Công Việc (A1) |
| 34 | `business-economy-ielts-p2` | 50 | **100** ❌ | **100** ❌ | 💼 Kinh Doanh & Kinh Tế (C1-C2) – Phần 2 |
| 35 | `globalization-trade-ielts` | 50 | **100** ❌ | **100** ❌ | 🌍 Toàn Cầu Hóa & Thương Mại (C1-C2) |
| 36 | `weather-seasons-daily-p3` | 50 | **100** ❌ | **100** ❌ | 🌦️ Thời Tiết & Mùa (A2-B1) – Phần 3 |
| 37 | `nature-environment-daily-p2` | 50 | **100** ❌ | **100** ❌ | 🌲 Thiên Nhiên & Môi Trường (A2-B1) – Phần 2 |
| 38 | `numbers-time-beginner-p2` | 50 | **100** ❌ | **100** ❌ | 🔢 Chữ Số & Thời Gian (A1) – Phần 2 |
| 39 | `history-heritage-ielts` | 50 | **100** ❌ | **100** ❌ | 🏛️ Lịch Sử & Di Sản (C1-C2) |
| 40 | `architecture-urban-ielts-p2` | 50 | **100** ❌ | **100** ❌ | 🏙️ Kiến Trúc & Quy Hoạch Đô Thị (C1-C2) – Phần 2 |
| 41 | `sports-fitness-daily` | 50 | **100** ❌ | **100** ❌ | ⚽ Thể Thao & Thể Hình (A2-B1) |
| 42 | `music-entertainment-daily` | 50 | **100** ❌ | **100** ❌ | 🎸 Âm Nhạc & Giải Trí (A2-B1) |
| 43 | `money-shopping-beginner` | 50 | **100** ❌ | **100** ❌ | 💰 Tiền Bạc & Mua Sắm (A1) |
| 44 | `clothes-fashion-beginner-p2` | 50 | **100** ❌ | **100** ❌ | 👗 Quần Áo & Thời Trang (A1) – Phần 2 |
| 45 | `science-innovation-ielts` | 50 | **100** ❌ | **100** ❌ | 🔬 Khoa Học & Đổi Mới (C1-C2) |
| 46 | `space-exploration-ielts-p3` | 50 | **100** ❌ | **100** ❌ | 🚀 Không Gian & Khám Phá (C1-C2) – Phần 3 |
| 47 | `transport-vehicles-daily` | 50 | **100** ❌ | **100** ❌ | 🚗 Giao Thông & Phương Tiện (A2-B1) |
| 48 | `hotel-accommodation-daily` | 50 | **100** ❌ | **100** ❌ | 🏨 Khách Sạn & Chỗ Ở (A2-B1) |
| 49 | `nature-animals-beginner` | 50 | **100** ❌ | **100** ❌ | 🌳 Thiên Nhiên & Động Vật (A1) |
| 50 | `weather-seasons-beginner-p4` | 50 | **100** ❌ | **100** ❌ | 🌦️ Thời Tiết & Mùa (A1) – Phần 4 |
| 51 | `food-agriculture-ielts-p2` | 50 | **100** ❌ | **100** ❌ | 🌾 Thực Phẩm & Nông Nghiệp (C1-C2) – Phần 2 |
| 52 | `energy-resources-ielts` | 50 | **100** ❌ | **100** ❌ | ⚡ Năng Lượng & Tài Nguyên (C1-C2) |
| 53 | `crime-law-daily` | 50 | **100** ❌ | **100** ❌ | ⚖️ Tội Phạm & Pháp Luật (A2-B1) |
| 54 | `emergency-safety-daily` | 50 | **100** ❌ | **100** ❌ | 🚑 Khẩn Cấp & An Toàn (A2-B1) |
| 55 | `technology-devices-beginner` | 50 | **100** ❌ | **100** ❌ | 💻 Công Nghệ & Thiết Bị (A1) |
| 56 | `communication-internet-beginner` | 50 | **100** ❌ | **100** ❌ | 🌐 Giao Tiếp & Internet (A1) |
| 57 | `media-journalism-ielts` | 50 | **100** ❌ | **100** ❌ | 📰 Truyền Thông & Báo Chí (C1-C2) |
| 58 | `sports-competition-ielts` | 50 | **100** ❌ | **100** ❌ | 🏆 Thể Thao & Thi Đấu (C1-C2) |
| 59 | `environment-ecology-daily` | 50 | **100** ❌ | **100** ❌ | 🌍 Môi Trường & Sinh Thái (A2-B1) |
| 60 | `arts-culture-daily` | 50 | **100** ❌ | **100** ❌ | 🎨 Nghệ Thuật & Văn Hóa (A2-B1) |
| 61 | `shopping-stores-beginner` | 50 | **100** ❌ | **100** ❌ | 🛒 Mua Sắm & Cửa Hàng (A1) |
| 62 | `money-banking-beginner` | 50 | **100** ❌ | **100** ❌ | 💰 Tiền Bạc & Ngân Hàng (A1) |
| 63 | `global-issues-politics-ielts-p2` | 50 | **100** ❌ | **100** ❌ | 🌍 Vấn Đề Toàn Cầu & Chính Trị (C1-C2) – Phần 2 |
| 64 | `language-communication-ielts` | 50 | **100** ❌ | **100** ❌ | 🗣️ Ngôn Ngữ & Giao Tiếp (C1-C2) |
| 65 | `science-technology-daily` | 50 | **100** ❌ | **100** ❌ | 🔬 Khoa Học & Công Nghệ (A2-B1) |
| 66 | `media-news-daily` | 50 | **100** ❌ | **100** ❌ | 📰 Truyền Thông & Tin Tức (A2-B1) |
| 67 | `travel-transport-beginner` | 50 | **100** ❌ | **100** ❌ | ✈️ Du Lịch & Giao Thông (A1) |
| 68 | `places-directions-beginner` | 50 | **100** ❌ | **100** ❌ | 📍 Nơi Chốn & Phương Hướng (A1) |
| 69 | `music-performing-arts-ielts` | 50 | **100** ❌ | **100** ❌ | 🎭 Âm Nhạc & Nghệ Thuật Biểu Diễn (C1-C2) |
| 70 | `literature-poetry-ielts-p2` | 50 | **100** ❌ | **100** ❌ | 📚 Văn Học & Thi Ca (C1-C2) – Phần 2 |
| 71 | `social-issues-daily` | 50 | **100** ❌ | **100** ❌ | 🤝 Vấn Đề Xã Hội & Cộng Đồng (A2-B1) |
| 72 | `beliefs-values-daily` | 50 | **100** ❌ | **100** ❌ | 🕊️ Niềm Tin & Giá Trị (A2-B1) |
| 73 | `numbers-quantity-beginner` | 50 | **100** ❌ | **100** ❌ | 🔢 Số Đếm & Số Lượng (A1) |
| 74 | `time-calendar-beginner` | 53 | **100** ❌ | **100** ❌ | ⏳ Thời Gian & Lịch (A1) |
| 75 | `transport-tourism-ielts` | 55 | **100** ❌ | **100** ❌ | ✈️ Giao Thông & Du Lịch (B2-C1) |
| 76 | `work-jobs-daily` | 56 | **100** ❌ | **100** ❌ | 💼 Công Việc & Nghề Nghiệp (A2-B1) |
| 77 | `health-body-daily-p2` | 60 | **100** ❌ | **100** ❌ | 💪 Sức Khỏe & Cơ Thể (A2-B1) – Phần 2 |
| 78 | `transport-travel-daily` | 63 | **100** ❌ | **100** ❌ | 🚗 Giao Thông & Đi Lại (A2-B1) |
| 79 | `agriculture-food-security-vstep` | 69 | **100** ❌ | **100** ❌ | 🌾 Nông Nghiệp & An Ninh Lương Thực (B1-B2) |
| 80 | `housing-home-daily` | 69 | **100** ❌ | **100** ❌ | 🏡 Nhà Ở & Mái Ấm (A2-B1) |
| 81 | `body-health-beginner-p3` | 71 | **100** ❌ | **100** ❌ | 💪 Cơ Thể & Sức Khỏe (A1-A2) – Phần 3 |
| 82 | `business-economy-ielts` | 75 | **100** ❌ | **100** ❌ | 📈 Kinh Doanh & Kinh Tế (B2-C1) |
| 83 | `shopping-money-daily` | 76 | **100** ❌ | **100** ❌ | 🛒 Mua Sắm & Tiền Bạc (A2-B1) |
| 84 | `free-time-hobbies-daily` | 76 | **100** ❌ | **100** ❌ | 🎨 Thời Gian Rảnh & Sở Thích (A2-B1) |
| 85 | `e-learning-vstep` | 77 | **100** ❌ | **100** ❌ | 💻 Giáo Dục Trực Tuyến (B1-B2) |
| 86 | `crime-punishment-vstep` | 77 | **100** ❌ | **100** ❌ | ⚖️ Tội Phạm & Hình Phạt (B1-B2) |
| 87 | `house-furniture-daily` | 77 | **100** ❌ | **100** ❌ | 🏠 Ngôi Nhà & Đồ Nội Thất (A2-B1) |
| 88 | `transportation-beginner` | 79 | **100** ❌ | **100** ❌ | 🚗 Phương Tiện Giao Thông (A1) |
| 89 | `space-astronomy-vstep` | 80 | **100** ❌ | **100** ❌ | 🚀 Vũ Trụ & Thiên Văn Học (B1-B2) |
| 90 | `energy-resources-vstep` | 80 | **100** ❌ | **100** ❌ | ⚡ Năng Lượng & Tài Nguyên (B1-B2) |
| 91 | `languages-communication-ielts` | 80 | **100** ❌ | **100** ❌ | 🗣️ Ngôn Ngữ & Giao Tiếp (C1-C2) |
| 92 | `city-transport-beginner` | 80 | **100** ❌ | **100** ❌ | 🏙️ Thành Phố & Giao Thông (A1-A2) |
| 93 | `housing-architecture-ielts` | 81 | **100** ❌ | **100** ❌ | 🏠 Housing & Architecture (B2-C1) |
| 94 | `law-justice-ielts` | 81 | **100** ❌ | **100** ❌ | ⚖️ Luật Pháp & Công Lý (C1-C2) |
| 95 | `family-people-beginner-p2` | 81 | **100** ❌ | **100** ❌ | 👨‍👩‍👧 Gia Đình & Con Người (A1-A2) – Phần 2 |
| 96 | `jobs-work-beginner` | 81 | **100** ❌ | **100** ❌ | 💼 Nghề Nghiệp & Làm Việc (A1) |
| 97 | `geography-earth-ielts` | 84 | **100** ❌ | **100** ❌ | 🌍 Địa Lý & Trái Đất (C1-C2) |
| 98 | `family-society-ielts` | 84 | **100** ❌ | **100** ❌ | 👨‍👩‍👧‍👦 Gia Đình & Xã Hội (C1-C2) |
| 99 | `history-civilizations-ielts` | 85 | **100** ❌ | **100** ❌ | 🏺 Lịch Sử & Nền Văn Minh (C1-C2) |
| 100 | `weather-seasons-beginner-p3` | 85 | **100** ❌ | **100** ❌ | 🌤️ Thời Tiết & Mùa (A1) – Phần 3 |
| 101 | `media-journalism-vstep` | 86 | **100** ❌ | **100** ❌ | 📰 Truyền Thông & Báo Chí (B1-B2) |
| 102 | `clothes-fashion-daily-p2` | 86 | **100** ❌ | **100** ❌ | 👗 Quần Áo & Thời Trang (A2-B1) – Phần 2 |
| 103 | `days-months-beginner` | 86 | **100** ❌ | **100** ❌ | 📅 Ngày & Tháng (A1-A2) |
| 104 | `places-buildings-beginner` | 86 | **100** ❌ | **100** ❌ | 🏙️ Địa Điểm & Tòa Nhà (A1-A2) |
| 105 | `weather-seasons-beginner` | 87 | **100** ❌ | **100** ❌ | 🌤 Thời Tiết & Mùa (A1-A2) |
| 106 | `transport-vehicles-beginner` | 88 | **100** ❌ | **100** ❌ | 🚗 Phương Tiện Giao Thông (A1-A2) |
| 107 | `urbanization-city-vstep` | 89 | **100** ❌ | **100** ❌ | 🏙 Đô Thị Hóa & Cuộc Sống Thành Phố (B1-B2) |
| 108 | `media-advertising-ielts` | 89 | **100** ❌ | **100** ❌ | 📺 Truyền Thông & Quảng Cáo (B2-C1) |
| 109 | `health-fitness-daily` | 89 | **100** ❌ | **100** ❌ | 💪 Sức Khỏe & Thể Hình (A2-B1) |
| 110 | `technology-internet-daily-p2` | 89 | **100** ❌ | **100** ❌ | 💻 Công Nghệ & Mạng Internet (A2-B1) – Phần 2 |
| 111 | `house-rooms-beginner` | 89 | **100** ❌ | **100** ❌ | 🏠 Ngôi Nhà & Các Phòng (A1-A2) |
| 112 | `animals-pets-beginner` | 89 | **100** ❌ | **100** ❌ | 🐶 Động Vật & Thú Cưng (A1-A2) |
| 113 | `numbers-time-beginner` | 89 | **100** ❌ | **100** ❌ | 🔢 Con Số & Thời Gian (A1-A2) |
| 114 | `crime-law-vstep` | 90 | **100** ❌ | **100** ❌ | ⚖️ Tội Phạm & Luật Pháp (B1-B2) |
| 115 | `society-culture-vstep` | 90 | **100** ❌ | **100** ❌ | 🌍 Xã Hội & Văn Hóa (B1-B2) |
| 116 | `environment-climate-vstep` | 90 | **100** ❌ | **100** ❌ | 🌍 Môi Trường & Khí Hậu (B1-B2) |
| 117 | `science-technology-vstep` | 90 | **100** ❌ | **100** ❌ | 🔬 Khoa Học & Công Nghệ (B1-B2) |
| 118 | `transport-logistics-vstep` | 90 | **100** ❌ | **100** ❌ | 🚚 Giao Thông & Kho Vận (B1-B2) |
| 119 | `cities-urbanization-ielts` | 90 | **100** ❌ | **100** ❌ | 🏙️ Thành Phố & Đô Thị Hóa (B2-C1) |
| 120 | `health-medicine-advanced-ielts` | 90 | **100** ❌ | **100** ❌ | 🏥 Y Tế & Sức Khỏe Nâng Cao (C1-C2) |
| 121 | `space-exploration-ielts` | 90 | **100** ❌ | **100** ❌ | 🚀 Không Gian & Khám Phá (B2-C1) |
| 122 | `politics-government-ielts` | 90 | **100** ❌ | **100** ❌ | 🏛 Chính Trị & Chính Phủ (C1-C2) |
| 123 | `literature-poetry-ielts` | 90 | **100** ❌ | **100** ❌ | 📚 Văn Học & Thi Ca (C1-C2) |
| 124 | `food-cooking-daily` | 90 | **100** ❌ | **100** ❌ | 🍔 Đồ Ăn & Nấu Nướng (A2-B1) |
| 125 | `countryside-nature-daily` | 90 | **100** ❌ | **100** ❌ | 🌳 Nông Thôn & Thiên Nhiên (A2-B1) |
| 126 | `family-people-beginner` | 90 | **100** ❌ | **100** ❌ | 👨‍👩‍👧‍👦 Gia Đình & Con Người (A1-A2) |
| 127 | `colors-shapes-beginner` | 90 | **100** ❌ | **100** ❌ | 🔴 Màu Sắc & Hình Khối (A1-A2) |
| 128 | `rooms-furniture-beginner` | 90 | **100** ❌ | **100** ❌ | 🛋 Các Phòng & Đồ Nội Thất (A1-A2) |
| 129 | `clothes-accessories-beginner` | 90 | **100** ❌ | **100** ❌ | 👗 Trang Phục & Phụ Kiện (A1-A2) |
| 130 | `days-months-beginner-p2` | 90 | **100** ❌ | **100** ❌ | 📅 Ngày Tháng & Thời Gian (A1-A2) – Phần 2 |
| 131 | `weather-seasons-daily-p2` | 90 | **100** ❌ | **100** ❌ | ☀️ Thời Tiết & Bốn Mùa (A2-B1) – Phần 2 |
| 132 | `shopping-clothes-daily` | 90 | **100** ❌ | **100** ❌ | 🛍️ Mua Sắm & Quần Áo (A2-B1) |
| 133 | `water-pollution-vstep` | 91 | **100** ❌ | **100** ❌ | 💧 Ô Nhiễm Nước & Biển (B1-B2) |
| 134 | `psychology-mind-ielts` | 91 | **100** ❌ | **100** ❌ | 🧠 Tâm Lý Học & Tâm Trí (C1-C2) |
| 135 | `city-life-daily` | 91 | **100** ❌ | **100** ❌ | 🏙️ Cuộc Sống Thành Phố (A2-B1) |
| 136 | `clothes-colors-beginner` | 91 | **100** ❌ | **100** ❌ | 👗 Quần Áo & Màu Sắc (A1-A2) |
| 137 | `hobbies-free-time-beginner` | 91 | **100** ❌ | **100** ❌ | 🎨 Sở Thích & Thời Gian Rảnh (A1-A2) |
| 138 | `body-health-beginner-p2` | 91 | **100** ❌ | **100** ❌ | 💪 Cơ Thể & Sức Khỏe (A1-A2) – Phần 2 |
| 139 | `colors-shapes-beginner-p2` | 91 | **100** ❌ | **100** ❌ | 🎨 Màu Sắc & Hình Khối (A1-A2) – Phần 2 |
| 140 | `animals-pets-beginner-p2` | 91 | **100** ❌ | **100** ❌ | 🐾 Động Vật & Thú Cưng (A1-A2) – Phần 2 |
| 141 | `weather-seasons-beginner-p2` | 91 | **100** ❌ | **100** ❌ | ☀️ Thời Tiết & Các Mùa (A1-A2) – Phần 2 |
| 142 | `sustainable-tourism-vstep` | 92 | **100** ❌ | **100** ❌ | 🌍 Du Lịch Bền Vững (B1-B2) |
| 143 | `education-learning-daily` | 92 | **100** ❌ | **100** ❌ | 📚 Giáo Dục & Học Tập (A2-B1) |
| 144 | `numbers-shapes-beginner` | 92 | **100** ❌ | **100** ❌ | 🔢 Số Đếm & Hình Khối (A1) |
| 145 | `feelings-emotions-beginner` | 92 | **100** ❌ | **100** ❌ | 😊 Cảm Xúc & Cảm Giác (A1) |
| 146 | `population-migration-vstep` | 93 | **100** ❌ | — | 👥 Dân Số & Di Cư (B2) |
| 147 | `body-health-beginner` | 93 | **100** ❌ | **100** ❌ | 💪 Cơ Thể & Sức Khỏe (A1-A2) |
| 148 | `time-dates-beginner` | 93 | **100** ❌ | **100** ❌ | ⏰ Thời Gian & Ngày Tháng (A1) |
| 149 | `food-drinks-beginner-p2` | 94 | **100** ❌ | **100** ❌ | 🍔 Đồ Ăn & Thức Uống (A1-A2) – Phần 2 |
| 150 | `politics-society-ielts` | 94 | **100** ❌ | **100** ❌ | 🏛️ Chính Trị & Xã Hội (B2-C1) |
| 151 | `places-buildings-beginner-p2` | 94 | **100** ❌ | **100** ❌ | 🏢 Nơi Chốn & Tòa Nhà (A1) – Phần 2 |
| 152 | `animals-nature-daily` | 95 | **100** ❌ | **100** ❌ | 🐾 Động Vật & Thiên Nhiên (A2-B1) |
| 153 | `hobbies-interests-daily` | 95 | **100** ❌ | **100** ❌ | 🎨 Sở Thích & Đam Mê (A2-B1) |
| 154 | `feelings-senses-beginner` | 96 | **100** ❌ | **100** ❌ | 😊 Cảm Xúc & Giác Quan (A1) |
| 155 | `family-people-beginner-p3` | 96 | **100** ❌ | **100** ❌ | 👨‍👩‍👧‍👦 Gia Đình & Mọi Người (A1) – Phần 3 |
| 156 | `traditions-festivals-vstep` | 97 | **100** ❌ | **100** ❌ | 🎊 Truyền Thống & Lễ Hội VN (B1-B2) |
| 157 | `shopping-market-daily` | 97 | **100** ❌ | **100** ❌ | 🛒 Đi Chợ & Mua Sắm (A2-B1) |
| 158 | `feelings-emotions-daily` | 97 | **100** ❌ | **100** ❌ | 😊 Cảm Xúc & Tâm Trạng (A2-B1) |
| 159 | `history-culture-ielts-p2` | 97 | **100** ❌ | **100** ❌ | 🏺 Lịch Sử & Văn Hóa (B2-C1) – Phần 2 |
| 160 | `crime-punishment-ielts` | 98 | **100** ❌ | **100** ❌ | ⚖️ Crime & Punishment (B2-C1) |
| 161 | `family-relationships-beginner` | 98 | **100** ❌ | **100** ❌ | 👨‍👩‍👧‍👦 Gia Đình & Các Mối Quan Hệ (A1-A2) |
| 162 | `clothes-fashion-beginner` | 98 | **100** ❌ | **100** ❌ | 👗 Quần Áo & Thời Trang (A1-A2) |
| 163 | `medicine-healthcare-vstep` | 99 | **100** ❌ | **100** ❌ | 🏥 Y Tế & Chăm Sóc Sức Khỏe (B1-B2) |
| 164 | `language-linguistics-ielts` | 99 | **100** ❌ | **100** ❌ | 🗣️ Ngôn Ngữ & Ngôn Ngữ Học (B2-C1) |
| 165 | `art-literature-ielts` | 99 | **100** ❌ | **100** ❌ | 🎨 Nghệ Thuật & Văn Học (C1-C2) |
| 166 | `travel-tourism-ielts` | 99 | **100** ❌ | **100** ❌ | ✈️ Du Lịch & Khám Phá (C1-C2) |
| 167 | `history-culture-ielts` | 99 | **100** ❌ | **100** ❌ | 🏛️ Lịch Sử & Văn Hóa (C1-C2) |
| 168 | `transportation-traffic-ielts` | 99 | **100** ❌ | **100** ❌ | 🚆 Giao Thông & Vận Tải (C1-C2) |
| 169 | `money-banking-daily` | 99 | **100** ❌ | **100** ❌ | 💰 Tiền Bạc & Ngân Hàng (A2-B1) |
| 170 | `technology-internet-daily` | 99 | **100** ❌ | **100** ❌ | 💻 Công Nghệ & Internet (A2-B1) |
| 171 | `emotions-feelings-daily` | 99 | **100** ❌ | **100** ❌ | 😊 Cảm Xúc & Cảm Giác (A2-B1) |
| 172 | `money-shopping-daily` | 99 | **100** ❌ | **100** ❌ | 💵 Tiền Bạc & Mua Sắm (A2-B1) |
| 173 | `places-directions-daily` | 99 | **100** ❌ | **100** ❌ | 📍 Địa Điểm & Chỉ Đường (A2-B1) |
| 174 | `school-learning-beginner` | 99 | **100** ❌ | **100** ❌ | 🎒 Trường Học & Học Tập (A1-A2) |
| 175 | `body-health-daily` | 99 | **100** ❌ | **100** ❌ | 💪 Cơ Thể & Sức Khỏe (A2-B1) |
| 176 | `animals-nature-beginner` | 99 | **100** ❌ | **100** ❌ | 🐶 Động Vật & Thiên Nhiên (A1) |
| 177 | `daily-routine-beginner` | 99 | **100** ❌ | **100** ❌ | ⏰ Thói Quen Hằng Ngày (A1) |
| 178 | `action-verbs-beginner` | 99 | **100** ❌ | — | 🏃 Động Từ Chỉ Hành Động (A1) |
| 179 | `success-mindset-100` | 101 | **100** ❌ | **100** ❌ | 🌟 Thành Công & Phát Triển Bản Thân (B1-C1) |
| 180 | `school-life-100` | 101 | **100** ❌ | **100** ❌ | 🏫 Đời Sống Học Đường & Vật Dụng (A1-A2) |
| 181 | `jobs-careers-daily` | 101 | **100** ❌ | **100** ❌ | 💼 Công Việc & Nghề Nghiệp (A2-B1) |
| 182 | `food-meals-beginner` | 101 | **100** ❌ | **100** ❌ | 🍔 Đồ Ăn & Bữa Ăn (A1-A2) |
| 183 | `ielts-academic-vocab` | 101 | — | **100** ❌ | 🏛️ Từ Vựng Học Thuật IELTS 7.0+ |
| 184 | `health-medical` | 109 | — | **120** ❌ | 🏥 Sức Khỏe & Y Tế |

---

## 53 tiêu đề hiện KHAI ĐÚNG (đề xuất vẫn bỏ số, để đồng nhất)

| id | Số từ | Tiêu đề hiện tại | Sau khi sửa |
|---|---|---|---|
| `digital-society-100` | 100 | 🌐 Xã Hội Số & Quyền Riêng Tư (100 Từ) (B2-C1) | 🌐 Xã Hội Số & Quyền Riêng Tư (B2-C1) |
| `urban-traffic-vstep` | 100 | 🚦 Giao Thông Đô Thị (100 Từ) (B1-B2) | 🚦 Giao Thông Đô Thị (B1-B2) |
| `health-medicine-vstep` | 100 | 🏥 Y Tế & Sức Khỏe (100 Từ) (B1-B2) | 🏥 Y Tế & Sức Khỏe (B1-B2) |
| `technology-internet-vstep` | 100 | 💻 Công Nghệ & Internet (100 Từ) (B1-B2) | 💻 Công Nghệ & Internet (B1-B2) |
| `environment-conservation-vstep` | 100 | 🌍 Môi Trường & Bảo Tồn (100 Từ) (B1-B2) | 🌍 Môi Trường & Bảo Tồn (B1-B2) |
| `work-career-vstep` | 100 | 💼 Công Việc & Nghề Nghiệp (100 Từ) (B1-B2) | 💼 Công Việc & Nghề Nghiệp (B1-B2) |
| `space-exploration-vstep` | 100 | 🚀 Vũ Trụ & Khám Phá (100 Từ) (B1-B2) | 🚀 Vũ Trụ & Khám Phá (B1-B2) |
| `history-archaeology-vstep` | 100 | 🏛️ Lịch Sử & Khảo Cổ Học (100 Từ) (B1-B2) | 🏛️ Lịch Sử & Khảo Cổ Học (B1-B2) |
| `art-entertainment-vstep` | 100 | 🎭 Nghệ Thuật & Giải Trí (100 Từ) (B1-B2) | 🎭 Nghệ Thuật & Giải Trí (B1-B2) |
| `politics-government-vstep` | 100 | 🏛️ Chính Trị & Chính Phủ (100 Từ) (B2-C1) | 🏛️ Chính Trị & Chính Phủ (B2-C1) |
| `media-press-vstep` | 100 | 📰 Truyền Thông & Báo Chí (100 Từ) (B1-B2) | 📰 Truyền Thông & Báo Chí (B1-B2) |
| `business-finance-vstep` | 100 | 🏢 Kinh Doanh & Tài Chính (100 Từ) (B1-B2) | 🏢 Kinh Doanh & Tài Chính (B1-B2) |
| `economy-trade-vstep` | 100 | 🌍 Kinh Tế & Giao Thương (100 Từ) (B1-B2) | 🌍 Kinh Tế & Giao Thương (B1-B2) |
| `history-civilizations-vstep` | 100 | 🏛️ Lịch Sử & Nền Văn Minh (100 Từ) (B1-B2) | 🏛️ Lịch Sử & Nền Văn Minh (B1-B2) |
| `arts-literature-vstep` | 100 | 🎭 Nghệ Thuật & Văn Học (100 Từ) (B1-B2) | 🎭 Nghệ Thuật & Văn Học (B1-B2) |
| `globalisation-ielts` | 100 | 🌍 Toàn Cầu Hóa (100 Từ) (B2-C1) | 🌍 Toàn Cầu Hóa (B2-C1) |
| `education-advanced-ielts` | 100 | 🎓 Giáo Dục Nâng Cao (100 Từ) (B2-C1) | 🎓 Giáo Dục Nâng Cao (B2-C1) |
| `crime-law-advanced-ielts` | 100 | ⚖️ Tội Phạm & Pháp Luật Nâng Cao (100 Từ) (B2-C1) | ⚖️ Tội Phạm & Pháp Luật Nâng Cao (B2-C1) |
| `media-communication-ielts` | 100 | 📰 Truyền Thông & Giao Tiếp (100 Từ) (B2-C1) | 📰 Truyền Thông & Giao Tiếp (B2-C1) |
| `science-tech-advanced-ielts` | 100 | 🔬 Khoa Học & Công Nghệ Nâng Cao (100 Từ) (C1-C2) | 🔬 Khoa Học & Công Nghệ Nâng Cao (C1-C2) |
| `art-design-ielts` | 100 | 🎨 Nghệ Thuật & Thiết Kế (100 Từ) (C1-C2) | 🎨 Nghệ Thuật & Thiết Kế (C1-C2) |
| `food-agriculture-ielts` | 100 | 🌾 Thực Phẩm & Nông Nghiệp (100 Từ) (C1-C2) | 🌾 Thực Phẩm & Nông Nghiệp (C1-C2) |
| `business-finance-ielts` | 100 | 💼 Kinh Doanh & Tài Chính (100 Từ) (C1-C2) | 💼 Kinh Doanh & Tài Chính (C1-C2) |
| `law-crime-ielts` | 100 | ⚖️ Luật Pháp & Tội Phạm (100 Từ) (C1-C2) | ⚖️ Luật Pháp & Tội Phạm (C1-C2) |
| `media-advertising-ielts-p2` | 100 | 📺 Media & Advertising (100 Words) (B2-C1) – Phần 2 | 📺 Media & Advertising (B2-C1) – Phần 2 |
| `technology-internet-ielts` | 90 | 💻 Technology & Internet (90 Words) (B2-C1) | 💻 Technology & Internet (B2-C1) |
| `environment-energy-ielts` | 82 | 🌍 Environment & Energy (82 Words) (B2-C1) | 🌍 Environment & Energy (B2-C1) |
| `government-politics-ielts` | 80 | 🏛️ Government & Politics (80 Words) (B2-C1) | 🏛️ Government & Politics (B2-C1) |
| `crime-law-ielts` | 100 | ⚖️ Crime & Law (100 Words) (B2-C1) | ⚖️ Crime & Law (B2-C1) |
| `space-exploration-ielts-p2` | 100 | 🚀 Space & Exploration (100 Words) (B2-C1) – Phần 2 | 🚀 Space & Exploration (B2-C1) – Phần 2 |
| `ethics-philosophy-ielts` | 100 | 🤔 Ethics & Philosophy (100 Words) (B2-C1) | 🤔 Ethics & Philosophy (B2-C1) |
| `art-architecture-ielts` | 100 | 🏛️ Art & Architecture (100 Words) (B2-C1) | 🏛️ Art & Architecture (B2-C1) |
| `transportation-driving-daily` | 100 | 🚗 Giao Thông & Lái Xe (100 Từ) (A2-B1) | 🚗 Giao Thông & Lái Xe (A2-B1) |
| `public-facilities-daily` | 100 | 🏢 Tiện Ích Công Cộng (100 Từ) (A2-B1) | 🏢 Tiện Ích Công Cộng (A2-B1) |
| `health-body-daily` | 100 | 🩺 Sức Khỏe & Cơ Thể (100 Từ) (A2-B1) | 🩺 Sức Khỏe & Cơ Thể (A2-B1) |
| `weather-seasons-daily` | 100 | 🌦️ Thời Tiết & Các Mùa (100 Từ) (A2-B1) | 🌦️ Thời Tiết & Các Mùa (A2-B1) |
| `shopping-stores-daily` | 100 | 🛍️ Mua Sắm & Cửa Hàng (100 Từ) (A2-B1) | 🛍️ Mua Sắm & Cửa Hàng (A2-B1) |
| `hobbies-entertainment-daily` | 100 | 🎨 Sở Thích & Giải Trí (100 Từ) (A2-B1) | 🎨 Sở Thích & Giải Trí (A2-B1) |
| `education-school-daily` | 100 | 🎒 Giáo Dục & Trường Học (100 Từ) (A2-B1) | 🎒 Giáo Dục & Trường Học (A2-B1) |
| `work-career-daily` | 100 | 💼 Công Việc & Sự Nghiệp (100 Từ) (A2-B1) | 💼 Công Việc & Sự Nghiệp (A2-B1) |
| `family-relationships-daily` | 100 | 👨‍👩‍👧 Gia Đình & Các Mối Quan Hệ (100 Từ) (A2-B1) | 👨‍👩‍👧 Gia Đình & Các Mối Quan Hệ (A2-B1) |
| `hobbies-free-time-daily` | 100 | 🎨 Sở Thích & Thời Gian Rảnh (100 Từ) (A2-B1) | 🎨 Sở Thích & Thời Gian Rảnh (A2-B1) |
| `transport-driving-daily` | 100 | 🚗 Giao Thông & Lái Xe (100 Từ) (A2-B1) | 🚗 Giao Thông & Lái Xe (A2-B1) |
| `clothes-fashion-daily` | 100 | 👗 Quần Áo & Thời Trang (100 Từ) (A2-B1) | 👗 Quần Áo & Thời Trang (A2-B1) |
| `entertainment-media-daily` | 100 | 🍿 Giải Trí & Truyền Thông (100 Từ) (A2-B1) | 🍿 Giải Trí & Truyền Thông (A2-B1) |
| `technology-daily-life` | 100 | 📱 Công Nghệ Trong Đời Sống (100 Từ) (A2-B1) | 📱 Công Nghệ Trong Đời Sống (A2-B1) |
| `food-drinks-beginner` | 100 | 🍔 Đồ Ăn & Thức Uống (100 Từ) (A1-A2) | 🍔 Đồ Ăn & Thức Uống (A1-A2) |
| `jobs-occupations-beginner` | 100 | 💼 Nghề Nghiệp & Công Việc (100 Từ) (A1-A2) | 💼 Nghề Nghiệp & Công Việc (A1-A2) |
| `clothes-beginner` | 100 | 👕 Quần Áo (100 Từ) (A1) | 👕 Quần Áo (A1) |
| `family-relationships-daily-p2` | 100 | 👨‍👩‍👧‍👦 Gia Đình & Mối Quan Hệ (100 Từ) (A2-B1) – Phần 2 | 👨‍👩‍👧‍👦 Gia Đình & Mối Quan Hệ (A2-B1) – Phần 2 |
| `body-parts-beginner` | 100 | 💪 Bộ Phận Cơ Thể (100 Từ) (A1) | 💪 Bộ Phận Cơ Thể (A1) |
| `energy-environment-ielts` | 100 | ⚡ Năng Lượng & Môi Trường (100 Từ) (B2-C1) | ⚡ Năng Lượng & Môi Trường (B2-C1) |
| `food-dining-daily` | 100 | 🍔 Đồ Ăn & Ăn Uống (100 Từ) (A2-B1) | 🍔 Đồ Ăn & Ăn Uống (A2-B1) |

---

## 32 tiêu đề vốn KHÔNG có số — giữ nguyên, không đụng

- `travel-transport` — ✈️ Du Lịch & Giao Thông
- `health-basics` — 🩺 Sức Khỏe Cơ Bản
- `energy-resources` — 🌍 Năng Lượng & Tài Nguyên
- `education-learning-advanced` — 🎓 Giáo Dục & Học Tập
- `economy-money` — 💰 Kinh Tế & Tiền Tệ (economy-money)
- `daily-routine-time-management` — ⏰ Thói Quen & Quản Lý Thời Gian
- `nature-countryside` — 🌳 Nông Thôn & Thiên Nhiên
- `city-urban-life` — 🏙️ Thành Phố & Đô Thị
- `family-relationships` — 👨‍👩‍👧‍👦 Gia Đình & Các Mối Quan Hệ
- `food-cooking` — 🍔 Thức Ăn & Nấu Nướng
- `emotions-personality` — 😊 Cảm Xúc & Tính Cách
- `animals-pets` — 🐾 Động Vật & Thú Cưng
- `weather-seasons` — 🌦️ Thời Tiết & Mùa
- `technology-internet` — 💻 Công Nghệ & Internet
- `health-medical` — 🏥 Sức Khỏe & Y Tế
- `business-office` — 💼 Kinh Doanh & Văn Phòng
- `kids-starter` — 👶 Tiếng Anh Cho Trẻ Em
- `environment-nature` — 🌿 Môi Trường & Thiên Nhiên
- `education-academic` — 🎓 Giáo Dục & Học Thuật
- `home-daily-life` — 🏠 Nhà Ở & Cuộc Sống Hàng Ngày
- `arts-entertainment` — 🎨 Nghệ Thuật & Giải Trí
- `food-nutrition` — 🍎 Thực Phẩm & Dinh Dưỡng
- `society-law-rights` — ⚖️ Xã Hội, Pháp Luật & Quyền Con Người
- `globalization-culture` — 🌍 Toàn Cầu Hóa & Văn Hóa
- `sports-fitness` — ⚽ Thể Thao & Sức Khỏe Thể Chất
- `career-workplace` — 💼 Nghề Nghiệp & Sự Nghiệp
- `science-tech-advanced` — 🧪 Khoa Học & Công Nghệ 2.0
- `shopping-finance` — 🛒 Mua Sắm & Tài Chính Cá Nhân
- `psychology-emotions` — 🧠 Tâm Lý & Cảm Xúc
- `kids-nature-animals` — 🌈 Động Vật & Thiên Nhiên (Trẻ Em)
- `media-journalism` — 📰 Truyền Thông & Báo Chí
- `ielts-academic-vocab` — 🏛️ Từ Vựng Học Thuật IELTS 7.0+

---

## Ngoài phạm vi đợt này

- **3 chặng lộ trình** có số từ trong tiêu đề (`m_s4` 117, `m_s5` 101, `m_s6` 101) — đã kiểm, **cả ba đều đúng**. Nếu bỏ số khỏi tiêu đề chủ đề thì nên bỏ luôn cho đồng nhất, nhưng đó là file `roadmapData.js`, xin ý kiến riêng.
- Đơn vị đang dùng lung tung: 8 tiêu đề ghi "Words" (tiếng Anh), còn lại ghi "Từ". Bỏ số là hết luôn chuyện này.
