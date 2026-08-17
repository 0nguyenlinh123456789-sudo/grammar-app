// File: src/utils/roadmapGrowth.js
// BÁO CHO NGƯỜI HỌC BIẾT MẪU SỐ TIẾN ĐỘ VỪA TĂNG (N4 b′).
//
// Vì sao cần cả một file cho việc này: thanh tiến độ trên trang chủ là
// `completedCount / allMilestones.length` (WelcomePage). Đợt này thêm 93 chặng
// nghe/đọc/chép chính tả vào lộ trình, nên người hôm qua thấy "120/617" hôm nay
// mở app sẽ thấy "120/710". **Họ không làm gì sai mà con số xấu đi.**
//
// Luật của dự án là thiếu dữ liệu thì ẨN hoặc BÁO, tuyệt đối không thay thế âm
// thầm. Đổi mẫu số dưới chân người học mà không nói cũng là một kiểu thay thế
// âm thầm — nên có dòng báo này, hiện ĐÚNG MỘT LẦN rồi tự tắt.
//
// KHÔNG hiện với người mới cài app: mẫu số của họ chưa từng khác, nói ra chỉ gây
// hoang mang về một chuyện không xảy ra với họ.
export const ROADMAP_GROWTH_KEY = 'roadmapSeenTotalV1';

function docSoDaXem(storage) {
  try {
    const raw = storage?.getItem(ROADMAP_GROWTH_KEY);
    const n = Number(raw);
    return raw !== null && raw !== undefined && Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

// `tongTruoc` là tổng của lần sinh trước, do build_roadmap.mjs đọc từ file cũ và
// ghi vào roadmapCounts.js. Dùng nó làm mốc cho người CHƯA có cờ trong máy: đó
// đúng là con số họ đã nhìn thấy ở bản trước.
export function thongBaoLoTrinhTang({ storage, tongHienTai, tongTruoc, soChangDaXong }) {
  if (!soChangDaXong) return null;
  if (!Number.isFinite(tongHienTai) || tongHienTai <= 0) return null;
  const mocCu = docSoDaXem(storage) ?? (Number.isFinite(tongTruoc) ? tongTruoc : null);
  if (mocCu === null || mocCu >= tongHienTai) return null;
  return { cu: mocCu, moi: tongHienTai, them: tongHienTai - mocCu };
}

export function daXemLoTrinhTang(storage, tongHienTai) {
  try { storage?.setItem(ROADMAP_GROWTH_KEY, String(tongHienTai)); } catch { /* hết chỗ lưu thì thôi */ }
}
