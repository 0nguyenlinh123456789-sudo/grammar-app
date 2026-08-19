// File: scripts/data/hoa_hop_le.mjs
// Những chỗ từ vựng của chủ đề VIẾT HOA GIỮA CÂU mà VẪN ĐÚNG tiếng Anh.
//
// Vì sao phải có file này: `scripts/audit_story_caps.mjs` đo được 987 lượt viết
// hoa giữa câu, nhưng KHÔNG PHẢI LƯỢT NÀO CŨNG SAI. `Monday`, `T-shirt`,
// `Renaissance`, `X-ray`, `Earth`... viết hoa là đúng chính tả tiếng Anh.
//
// Bài học đã trả giá hai lần trong chuỗi này (bộ lọc `>40 ký tự` vứt mất câu ví
// dụ; danh sách loại trừ VOA nằm trong một dòng chú thích nên chẳng chặn được
// gì): LỌC THEO MẪU LÀ ĐOÁN, KÊ ĐÍCH DANH LÀ BIẾT — và phải kê ở nơi máy đọc
// được, không phải trong chú thích.
//
// KHOÁ THEO CẶP (chủ đề, dạng chữ), KHÔNG theo từ trần: `May` là tháng Năm ở
// `time-calendar-beginner` nhưng là động từ khuyết thiếu ở nơi khác; `Board` là
// cái bảng trong lớp học nhưng là "lên máy bay" ở sân bay. Một danh sách từ trần
// sẽ che mất lỗi thật ở chủ đề khác.
//
// HAI LOẠI MỤC, VÀ CHÚNG MỤC RUỖNG THEO HAI CÁCH KHÁC NHAU:
//
//   LUẬT — một quy tắc chính tả ĐÓNG của tiếng Anh, áp cho những chủ đề được
//     GỌI TÊN. Ở đây chỉ có một: 7 thứ + 12 tháng luôn viết hoa, áp cho 5 chủ đề
//     dạy lịch. Danh sách 19 từ là đóng, 5 chủ đề là kê đích danh — nên đây vẫn
//     là "biết", không phải "đoán theo mẫu". Luật không mục ruỗng khi người soạn
//     sửa câu chữ, nên KHÔNG bị test đòi phải khớp chỗ có thật.
//
//   NGOẠI LỆ — từng chỗ một, đã ĐỌC tận ngữ cảnh rồi mới ghi. Loại này mục ruỗng
//     ngay khi bài đọc đổi, nên test BẮT BUỘC mỗi mục phải khớp một chỗ có thật.
//
// `tests/story_caps.test.js` chốt hai chiều:
//   - không lượt nào ngoài danh sách này (không lọt lỗi mới);
//   - không NGOẠI LỆ nào trong danh sách này vô dụng (không để danh sách mục ruỗng).
export const khoaHoa = (topicId, form) => `${topicId}::${form}`;

const THU = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const THANG = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

// Chủ đề dạy chính THỨ và THÁNG — trong tiếng Anh, thứ và tháng LUÔN viết hoa.
const LICH = ['days-months-beginner', 'days-months-beginner-p2', 'time-dates-beginner',
  'time-calendar-beginner', 'numbers-time-beginner-p2'];

const muc = [];
const LUAT = new Set();
for (const id of LICH) {
  for (const w of THU) { muc.push([id, w, 'thứ trong tuần — tiếng Anh luôn viết hoa']); LUAT.add(khoaHoa(id, w)); }
  for (const w of THANG) { muc.push([id, w, 'tháng — tiếng Anh luôn viết hoa']); LUAT.add(khoaHoa(id, w)); }
}

// "T-shirt" viết hoa chữ T vì chữ T là HÌNH DÁNG áo, không phải chữ đầu câu.
// 'clothes-fashion-daily' gỡ 19/08: bài viết lại (tìm đồ dự cưới) không còn chữ
// "T-shirt" nào.
for (const id of ['clothes-fashion-daily-p2', 'clothes-colors-beginner',
  'clothes-fashion-beginner', 'clothes-accessories-beginner', 'clothes-accessories-beginner-p2',
  'clothes-fashion-beginner-p2']) {
  muc.push([id, 'T-shirt', 'chữ T là hình dáng áo, không phải chữ đầu câu']);
}

// Trái Đất khi nói về HÀNH TINH thì viết hoa.
// 'nature-animals-beginner' đã bị gỡ khỏi danh sách này 19/08: bài đọc của chặng
// đó được VIẾT LẠI và bản mới không còn chữ "Earth" nào. Giữ lại là để một ngoại lệ
// mục ruỗng — và chính phép kiểm "mọi ngoại lệ đều còn khớp một chỗ có thật" đã bắt.
// 'animals-nature-daily' gỡ 19/08 cùng lý do: bài viết lại (trại cứu hộ của cô Chi)
// không còn chữ "Earth" nào.
for (const id of ['weather-seasons-daily-p2',
  'environment-ecology-daily']) {
  muc.push([id, 'Earth', 'tên hành tinh']);
}

muc.push(
  // Viết tắt / ký hiệu
  ['health-medical', 'MRI scan', 'MRI là từ viết tắt'],
  ['medicine-healthcare-vstep', 'X-ray', 'tia X — chữ X là tên tia'],
  ['shopping-market-daily', 'QR code', 'QR là từ viết tắt'],
  ['weather-seasons-daily', 'Celsius', 'thang đo mang tên nhà khoa học Celsius'],

  // Tên riêng: người, nhân vật, địa danh
  ['psychology-emotions', "Maslow's hierarchy", 'tháp nhu cầu mang tên Maslow'],
  ['kids-nature-animals', 'Bunny', 'tên nhân vật "Benny the Bunny"'],
  ['water-pollution-vstep', 'Delta', 'trong địa danh "Mekong Delta"'],
  ['space-astronomy-vstep', 'Space Station', 'trong tên riêng "International Space Station"'],

  // Lễ hội, tôn giáo, thời kỳ lịch sử — danh từ riêng trong tiếng Anh
  ['traditions-festivals-vstep', 'Lunar New Year', 'tên lễ tết'],
  ['traditions-festivals-vstep', 'Festival', 'trong tên riêng "Mid-Autumn Festival"'],
  ['traditions-festivals-vstep', 'Pagoda festival', 'trong tên riêng "Huong Pagoda festival"'],
  ['traditions-festivals-vstep', 'Confucianism', 'tên học thuyết/tôn giáo'],
  ['traditions-festivals-vstep', 'Buddhism', 'tên tôn giáo'],
  ['traditions-festivals-vstep', 'Taoism', 'tên tôn giáo'],
  ['history-archaeology-vstep', 'Stone Age', 'tên thời kỳ lịch sử'],
  ['history-archaeology-vstep', 'Bronze Age', 'tên thời kỳ lịch sử'],
  ['history-archaeology-vstep', 'Iron Age', 'tên thời kỳ lịch sử'],
  ['history-archaeology-vstep', 'Middle Ages', 'tên thời kỳ lịch sử'],
  ['history-civilizations-vstep', 'Renaissance', 'tên thời kỳ Phục Hưng'],
  ['history-civilizations-ielts', 'Renaissance', 'tên thời kỳ Phục Hưng'],
  ['history-civilizations-ielts', 'Enlightenment', 'tên thời kỳ Khai Sáng'],
  ['history-civilizations-ielts', 'Empire', 'trong tên riêng "Roman Empire"'],
  ['globalisation-ielts', 'Westernisation', 'phái sinh từ danh từ riêng "Western/West"'],

  // Chữ hoa NẰM GIỮA cụm (bộ đo bắt được từ khi biết nhìn cả bên trong cụm):
  ['business-office', 'Corporate Social Responsibility',
    'tên khái niệm chuẩn (CSR) — tiếng Anh viết hoa cả ba chữ'],
);

export const HOA_HOP_LE = new Map(muc.map(([id, form, lyDo]) => [khoaHoa(id, form), lyDo]));

/** Khoá thuộc loại LUẬT (không bị đòi phải khớp chỗ có thật). */
export const LA_LUAT = (khoa) => LUAT.has(khoa);
