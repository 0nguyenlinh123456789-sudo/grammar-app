// File: scripts/data/voa_loai_tru.mjs
// DANH SÁCH BÀI BỊ LOẠI — máy đọc được, không phải lời bình trong test.
//
// VÌ SAO PHẢI CÓ FILE NÀY:
// Các luật lọc (chủ đề nhạy cảm, lời bài hát) nằm trong `docBai` của bộ thu
// thập, mà bộ thu thập lại BỎ QUA những bài đã có trong kho ứng viên
// (`if (coId.has(id)) continue`). Nên với các bài đã thu thập từ đợt trước,
// luật mới KHÔNG BAO GIỜ chạy tới. Đúng cái bẫy đã làm 12 bài thủng lỗ lọt lên
// bản chạy thật: luật thêm sau khi dữ liệu đã tồn tại, dữ liệu cũ không ai soi.
//
// Trước file này, thứ duy nhất giữ voa-7575872 khỏi lọt vào đợt sau là một dòng
// CHÚ THÍCH trong test. Ai soạn câu hỏi cho nó là nó lên thẳng bản chạy thật,
// vì bước chọn bài chỉ lọc theo "đã có câu hỏi hay chưa".
//
// Nay bộ dựng dữ liệu BÁO LỖI nếu gặp bài trong danh sách này, và có test ghim.
export const LOAI_TRU = {
  'voa-7953635': 'nội dung chính trị — cùng lý do đã loại câu chính trị khỏi kho chép chính tả',
  'voa-7637459': 'ví dụ trung tâm của bài là một kỳ bầu cử tổng thống Mỹ; bộ lọc chủ đề chỉ đếm được 2 từ nhạy cảm nên KHÔNG chặn — phải đọc mới thấy',
  'voa-7846622': 'bộ thu thập gắn cờ chủ đề tôn giáo',
  'voa-7306802': 'bộ thu thập gắn cờ chủ đề chiến tranh',
  // Ba bài dưới đây dựa trên lời bài hát đang có bản quyền — đúng trường hợp
  // VOA cảnh báo nội dung của họ "may also contain" tư liệu bên thứ ba. Đã đọc
  // xác nhận cả ba, không suy từ luật ra.
  'voa-7504500': 'phân tích lời bài "Flowers" của Miley Cyrus',
  'voa-7641038': 'trích bốn dòng bài "Too Hot" của Kool and the Gang',
  'voa-7575872': 'trích lời bài "The Bug" của Dire Straits ("sometimes you\'re the windshield/sometimes you\'re the bug")',
};

export const LA_BAI_BI_LOAI = (id) => Object.prototype.hasOwnProperty.call(LOAI_TRU, id);

export default LOAI_TRU;
