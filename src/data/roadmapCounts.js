// File: src/data/roadmapCounts.js
// ⚠️ MÁY SINH — chạy lại: node scripts/build_roadmap.mjs
// Chỉ chứa SỐ ĐẾM, để màn hình kích hoạt nói được con số thật mà không phải
// kéo cả lộ trình vào gói tải đầu.
export const TONG_CHANG = 710;
// Tổng của lần sinh TRƯỚC, đọc từ file cũ trước khi ghi đè. Dùng để báo cho
// người học đang dùng biết mẫu số tiến độ vừa tăng — xem roadmapGrowth.js.
export const TONG_CHANG_TRUOC = 617;
export const CHANG_THEO_BAC = {
  foundation: 12,
  starter: 73,
  elementary: 146,
  intermediate: 183,
  upper_intermediate: 94,
  advanced: 202,
};
