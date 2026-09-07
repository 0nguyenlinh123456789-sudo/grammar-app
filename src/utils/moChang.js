// File: src/utils/moChang.js
// BẮC CẦU "MỞ MỘT CHẶNG" TỪ CHỖ KHÁC VỀ TRANG CHỦ.
//
// ══ VẤN ĐỀ ══
// Ô tìm kiếm nằm ở `MainLayout`, nhưng hàm biết cách mở chặng —
// `WelcomePage.launchMilestone` — nằm ở trang chủ, và nó là nơi DUY NHẤT mở
// được cả sáu loại: ba loại đầu đổi `appMode`, còn nghe/đọc/chép chính tả mở
// panel NGAY TRONG trang chủ (`setChangNghe`, `setChangDoc`, `setChangChinhTa`).
// Chép logic đó sang MainLayout thì ba loại sau không có chỗ để mở.
//
// ══ VÌ SAO KHÔNG DÙNG setTimeout ══
// Tiền lệ sẵn có trong App.jsx là `setTimeout(... dispatchEvent ..., 350)`. Ở
// đây cách đó KHÔNG an toàn: trang chủ là chunk lazy nằm sau `Suspense`. Người
// học đang ở màn Oxford bấm một kết quả tìm kiếm thì WelcomePage có thể CHƯA
// TẢI XONG sau 350ms — mạng chậm là hỏng, và hỏng theo kiểu tệ nhất: bấm xong
// không có gì xảy ra, không lỗi, thử lại lần hai thì lại được (vì lần đó chunk
// đã nằm trong bộ đệm). Một lỗi chỉ xảy ra với người mạng yếu và không tái hiện
// được trên máy người viết mã.
//
// ══ CÁCH LÀM ══
// Một Ô CHỜ. Bên gửi đặt chặng vào ô rồi báo. Trang chủ lấy ra ở HAI thời điểm:
// khi được báo (đang mở sẵn), và khi vừa gắn vào cây (vừa tải xong). Ô chờ luôn
// được LẤY RA rồi xoá, nên không có chuyện mở lại chặng cũ ở lần gắn sau.
// Không có mốc thời gian nào phải đoán.

let choMo = null;
const nguoiNghe = new Set();

/** Xin mở một chặng. `chang` là đối tượng chặng GỐC của roadmapData. */
export function yeuCauMoChang(chang) {
  if (!chang) return;
  choMo = chang;
  // Chép ra mảng trước khi duyệt: người nghe có thể tự gỡ đăng ký ngay trong
  // lúc xử lý, và sửa Set đang duyệt là hành vi không xác định.
  [...nguoiNghe].forEach((bao) => {
    try { bao(); } catch { /* một người nghe hỏng không được chặn người còn lại */ }
  });
}

/** Lấy chặng đang chờ ra (và xoá khỏi ô chờ). Trả null nếu không có gì. */
export function nhanChangChoMo() {
  const c = choMo;
  choMo = null;
  return c;
}

/** Đăng ký nhận báo. Trả về hàm gỡ đăng ký. */
export function dangKyMoChang(bao) {
  nguoiNghe.add(bao);
  return () => nguoiNghe.delete(bao);
}

/** Dùng cho bài kiểm: dọn sạch trạng thái giữa hai bài. */
export function donMoChang() {
  choMo = null;
  nguoiNghe.clear();
}
