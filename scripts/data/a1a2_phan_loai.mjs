// File: scripts/data/a1a2_phan_loai.mjs
// PHÂN LOẠI 52 CHẶNG A1/A2 BỊ BỘ LỌC XẾP LÀ "KHÔNG ĐỦ ĐIỀU KIỆN SOẠN".
//
// ══ VÌ SAO CÓ FILE NÀY, VÀ VÌ SAO NÓ LÀ MỘT FILE CHỨ KHÔNG PHẢI MỘT ĐOẠN VĂN ══
// `scripts/audit_a1a2_story.mjs` xếp 52 chặng là không đủ điều kiện, và 48/52
// trượt vì ĐẾM ĐƯỢC ÍT HƠN 4 DẤU HIỆU TƯỜNG THUẬT (đại từ, liên từ). Đọc thật
// thì bộ đếm đó gộp hai chuyện khác hẳn nhau:
//
//   · `kids-starter` là truyện kể ngôi thứ nhất — Luna chào mặt trời, chạy tới
//     trường cùng con mèo, cô giáo khen. Trượt vì đúng 1 chữ "After".
//   · `nature-animals-beginner` thì đúng là diễu hành từ vựng: "you can see a
//     tall tree with a green leaf and a beautiful flower". Không mệnh đề nào để
//     hỏi; hỏi gì cũng thành hỏi kiến thức chung.
//
// Chính `audit_a1a2_story.mjs` đã tự dặn ở đầu: "BỘ LỌC THÔ để ra DANH SÁCH
// VIỆC, KHÔNG phải phán quyết chất lượng." Nên phán quyết phải do người đọc ra,
// và **phải ghi thành chữ** — giữ trong đầu thì phiên sau không kiểm lại được và
// chủ dự án không soi được. Đúng cách đã làm với `digital-society-100`: loại thì
// ghi lý do đích danh.
//
// ══ PHÉP THỬ THẬT SỰ ══
// Không phải đếm đại từ, mà là: **chỉ ra được BỐN CÂU KHÁC NHAU trong bài, mỗi
// câu trả lời một câu hỏi khác nhau, và không đoán ra được bằng kiến thức
// chung.** Bài tả chung chung ("a dog is a friendly animal") không qua được —
// hỏi về nó là hỏi về THẾ GIỚI, người học ghi điểm mà chưa đọc bài.

/** 'soan' = hỏi được ngay, không phải viết lại. 'viet-lai' = diễu hành từ vựng. */
export const PHAN_LOAI_A1 = {
  // ── ĐỢT MỘT 19/08 (9 chặng · 36 câu) ──────────────────────────────────────
  'kids-starter': { nhom: 'soan', xong: true, vi: 'Truyện ngôi thứ nhất của Luna: chào mặt trời, chạy tới trường cùng con mèo, cô giáo khen, thấy cầu vồng. Bốn mốc kể chuyện rõ ràng.' },
  'food-cooking': { nhom: 'soan', xong: true, vi: 'Hai cảnh có trình tự: lớp nấu ăn (thái/gọt/cắt → đun nước → rán hành) và bữa tối Chủ nhật (mẹ quay gà, bố nướng bánh kẹp).' },
  'time-dates-beginner': { nhom: 'soan', xong: true, vi: 'Thói quen CỦA MỘT NGƯỜI CỤ THỂ: dậy 6h30, học thứ Hai–thứ Sáu, ngủ trước nửa đêm, sinh nhật tháng Năm.' },
  'house-rooms-beginner': { nhom: 'soan', xong: true, vi: 'Ngôi nhà cụ thể: thảm đỏ phòng khách, bàn gỗ lớn phòng ăn, thịt và sữa trong tủ lạnh, ba phòng ngủ trên tầng.' },
  'weather-seasons-beginner-p2': { nhom: 'soan', xong: true, vi: 'Mỗi mùa có phát biểu riêng kiểm được: lá NÂU VÀ VÀNG rụng vào thu, nước TRONG HỒ đóng băng vào đông.' },
  'places-buildings-beginner-p2': { nhom: 'soan', xong: true, vi: 'Bản đồ thị trấn cụ thể: quảng trường ở trung tâm, ngân hàng và bưu điện ĐỐI DIỆN quán cà phê, trường BÊN PHẢI, phòng khách sạn TẦNG 10.' },
  'daily-routine-beginner': { nhom: 'soan', xong: true, vi: 'Một ngày kể theo trình tự, mốc giờ rõ: đồng hồ chỉ 6 AM, ăn trưa 12 PM, sau bữa tối quét nhà, trước khi ngủ đọc sách.' },
  'house-rooms-beginner-p2': { nhom: 'soan', xong: true, vi: 'Nhà bốn phòng, có số đếm và vị trí kiểm được: mở cửa vào là phòng khách, tranh và đồng hồ trên tường.' },
  'school-classroom-beginner': { nhom: 'soan', xong: true, vi: 'Lớp học cụ thể: cô đứng gần bảng trắng dùng phấn hoặc bút, trong cặp có vở/bút chì/tẩy/thước, thích toán nhưng khoa học và lịch sử cũng hay.' },

  // ── ĐỢT HAI 19/08 (4 chặng · 16 câu) — khó hơn vì nửa bài là kiến thức chung ─
  'numbers-time-beginner': { nhom: 'soan', xong: true, vi: 'Có mốc cá nhân neo được (dậy 7h, ngủ trước nửa đêm để ngủ đủ 8 tiếng), nhưng nửa bài là kiến thức chung (60 giây một phút) nên phải chọn câu cẩn thận.' },
  'body-parts-beginner': { nhom: 'soan', xong: true, vi: 'Ngôi thứ nhất và có thói quen riêng (rửa tay bằng xà phòng TRƯỚC KHI ăn, chải tóc), nhưng phần tả bộ phận cơ thể là kiến thức chung.' },
  'numbers-shapes-beginner': { nhom: 'soan', xong: true, vi: 'Có phát biểu kiểm được từ chính bài: 10 quả táo thêm 5 thành 15, bớt 2 còn 8; cô bảo vẽ TIM ĐỎ và SAO VÀNG; cửa lớp là hình chữ nhật.' },
  'travel-transport-beginner': { nhom: 'soan', xong: true, vi: 'Có trình tự chuyến đi (soạn hành lý → hộ chiếu và thị thực nếu ra nước ngoài → đặt phòng khách sạn), tuy phần lớn viết theo lối "bạn có thể…".' },

  // ── DIỄU HÀNH TỪ VỰNG — CẦN VIẾT LẠI ──────────────────────────────────────
  'animals-pets-beginner': { nhom: 'viet-lai', vi: 'Danh mục định nghĩa: "A dog is a very friendly animal", "A cat is also a popular pet". Hỏi gì cũng thành hỏi kiến thức chung về con vật.' },
  'transport-vehicles-beginner': { nhom: 'viet-lai', vi: 'Danh mục phương tiện viết theo lối "bạn có thể…". Không nhân vật, không việc gì xảy ra.' },
  'body-health-beginner-p2': { nhom: 'viet-lai', vi: 'Liệt kê bộ phận cơ thể rồi liệt kê bệnh. Mọi câu hỏi rút ra được đều trả lời được mà không đọc bài.' },
  'body-health-beginner-p3': { nhom: 'viet-lai', vi: 'Cùng dạng với bản p2, viết lại bằng lời khác. Thêm phần vệ sinh nhưng vẫn là lời khuyên chung.' },
  'places-buildings-beginner': { nhom: 'viet-lai', vi: 'Danh mục địa điểm và công dụng ("go to the bank if you need money"). Không có thị trấn cụ thể như bản p2.' },
  'food-drinks-beginner-p2': { nhom: 'viet-lai', vi: 'Danh mục món ăn theo bữa. Có chữ "First… Then…" nhưng chủ ngữ là "families" chung chung, không phải một bữa ăn có thật.' },
  'animals-nature-beginner': { nhom: 'viet-lai', vi: 'Diễu hành thiên nhiên và con vật. Các câu là định nghĩa rời ("A dog runs fast, and a cat sleeps all day").' },
  'nature-animals-beginner': { nhom: 'viet-lai', vi: '0 dấu hiệu tường thuật, và đo bằng mắt cũng đúng: một chuỗi "you can see…" từ đầu tới cuối.' },
  'human-body-beginner': { nhom: 'viet-lai', vi: 'Bài giải phẫu đi từ đầu xuống chân, câu nào cũng là định nghĩa chung ai cũng biết: mắt để nhìn, tai để nghe, tim bơm máu. Không một chi tiết nào riêng của bài để neo câu hỏi.' },
  'colors-shapes-beginner-p3': { nhom: 'viet-lai', vi: 'Danh mục màu và hình, nối bằng "when you look around". Không có sự việc nào.' },
  'school-life-100': { nhom: 'viet-lai', vi: 'Chỉ 5 câu / 77 từ — dưới CẢ hai ngưỡng độ dài, không phải chỉ trượt phần đếm đại từ. Ngắn tới mức bốn câu hỏi sẽ hỏi lại cùng một chỗ.' },
};

// 28 chặng bậc A2 (elementary) CHƯA ĐỌC tới. Cố ý để trống thay vì đoán: xếp
// loại mà chưa đọc thì đúng là làm lại cái sai của bộ lọc, chỉ khác là bằng tay.
export const PHAN_LOAI_A2 = {};
