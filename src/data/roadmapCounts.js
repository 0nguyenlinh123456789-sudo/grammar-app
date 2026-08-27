// File: src/data/roadmapCounts.js
// ⚠️ MÁY SINH — chạy lại: node scripts/build_roadmap.mjs
// Chỉ chứa SỐ ĐẾM, để màn hình kích hoạt nói được con số thật mà không phải
// kéo cả lộ trình vào gói tải đầu.
export const TONG_CHANG = 724;
// Tổng của lần sinh TRƯỚC, đọc từ file cũ trước khi ghi đè. Dùng để báo cho
// người học đang dùng biết mẫu số tiến độ vừa tăng — xem roadmapGrowth.js.
export const TONG_CHANG_TRUOC = 723;
export const CHANG_THEO_BAC = {
  foundation: 12,
  starter: 86,
  elementary: 153,
  intermediate: 180,
  upper_intermediate: 89,
  advanced: 204,
};
// (1.5) CÔNG THỨC sinh ra chính con số giờ ở trên — sinh RA ĐÂY thay vì để màn
// hình chép lại. Việc 1.5 hứa "ghi giờ ước lượng thật KÈM CÔNG THỨC", mà trước
// đây màn hình chỉ nói "ước lượng từ số bài thật": người học thấy 587 giờ và
// không có đường nào tự kiểm. Chép mấy hằng số này sang JSX là mở đường cho
// chúng lệch nhau — đúng lỗi hai bản sao "máy chỉ đếm được số từ" đã dính.
export const CONG_THUC_GIO = {
  giayMoiMuc: 20,
  cheDoMoiTu: 4,
  docTu: 200, docPhut: 6,
  phutMoiMucLyThuyet: 2,
  lanNgheMoiBai: 2,
  cauMoiBuoiChinhTa: 5, luotMoiCauChinhTa: 3,
};
