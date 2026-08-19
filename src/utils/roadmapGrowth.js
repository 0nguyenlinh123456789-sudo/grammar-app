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

// Máy này đã từng học gì chưa. Xét GIÁ TRỊ, không xét sự tồn tại của khoá: App
// ghi `xp` = "0" và `completedMilestones` = "[]" xuống máy ngay ở lần vẽ đầu
// tiên, nên "khoá có mặt" đúng với cả người vừa cài app.
export function chuaHocGi(storage) {
  const so = (k) => { try { return Number(storage?.getItem(k)) || 0; } catch { return 0; } };
  const mang = (k) => { try { return JSON.parse(storage?.getItem(k) || '[]'); } catch { return []; } };
  return so('xp') === 0
    && (mang('completedMilestones') || []).length === 0
    && (mang('learningActivityV1') || []).length === 0;
}

// `tongTruoc` là tổng của lần sinh trước, do build_roadmap.mjs đọc từ file cũ và
// ghi vào roadmapCounts.js. Dùng nó làm mốc cho người CHƯA có cờ trong máy: đó
// đúng là con số họ đã nhìn thấy ở bản trước.
export function thongBaoLoTrinhTang({ storage, tongHienTai, tongTruoc, soChangDaXong }) {
  if (!Number.isFinite(tongHienTai) || tongHienTai <= 0) return null;
  if (!soChangDaXong) {
    // CHƯA XONG CHẶNG NÀO THÌ KHÔNG BÁO — nhưng chỉ trả về null là chưa đủ, và
    // đây là chỗ file này từng phản lại chính dòng đầu của nó ("KHÔNG hiện với
    // người mới cài app").
    //
    // Vì mốc cũ được SUY RA từ `tongTruoc` khi máy chưa có cờ, người mới cài
    // hôm nay vẫn mang mốc 617 trong khi họ chưa bao giờ nhìn thấy con số đó.
    // Chừng nào họ chưa xong chặng nào thì lời báo bị chặn — nhưng **ngay khi
    // học xong chặng ĐẦU TIÊN**, `soChangDaXong` thành 1 và lời báo bật ra:
    // "lộ trình vừa tăng từ 617 lên 710, bạn không mất chặng nào". Với người
    // vừa cài app sáng nay thì cả câu đó không có gì đúng.
    //
    // Nên đóng mốc lại ngay: chưa học gì thì mẫu số hiện tại CHÍNH LÀ con số đầu
    // tiên họ nhìn thấy.
    // (Bộ `npm run hoc:that` tìm ra: sau khi chặng đầu tiên hoàn thành, một hộp
    // thoại lạ chen lên giữa lượt rà.)
    //
    // ⚠️ NHƯNG KHÔNG ĐƯỢC LẤY `soChangDaXong === 0` LÀM DẤU HIỆU "MÁY CÒN
    // TRẮNG" — đó là cái bẫy nguy hiểm hơn chính lỗi đang vá.
    // `soChangDaXong` là `completedCount` của WelcomePage, tức số chặng đã xong
    // **CÒN KHỚP VỚI LỘ TRÌNH HIỆN TẠI** (`allMilestones.filter(m =>
    // completedMilestones.includes(m.targetId))`). Một người học cũ có 120 chặng
    // xong nhưng id đã đổi trong một đợt dọn nội dung sẽ ra ĐÚNG 0 — và nếu lấy
    // số đó làm dấu hiệu thì mốc bị đóng lại ngay, **xoá mất lời báo dành cho
    // đúng người mà cả file này sinh ra để phục vụ**. Hỏng theo hướng tệ hơn.
    //
    // Dấu hiệu đúng là: MÁY NÀY CHƯA CÓ DẤU VẾT HỌC NÀO. Xét theo GIÁ TRỊ chứ
    // không theo sự tồn tại của khoá — App ghi `xp` và `completedMilestones`
    // xuống máy ngay từ lần vẽ đầu, nên "khoá có mặt" không nói lên điều gì.
    if (chuaHocGi(storage) && docSoDaXem(storage) === null) daXemLoTrinhTang(storage, tongHienTai);
    return null;
  }
  const mocCu = docSoDaXem(storage) ?? (Number.isFinite(tongTruoc) ? tongTruoc : null);
  if (mocCu === null || mocCu >= tongHienTai) return null;
  return { cu: mocCu, moi: tongHienTai, them: tongHienTai - mocCu };
}

export function daXemLoTrinhTang(storage, tongHienTai) {
  try { storage?.setItem(ROADMAP_GROWTH_KEY, String(tongHienTai)); } catch { /* hết chỗ lưu thì thôi */ }
}
