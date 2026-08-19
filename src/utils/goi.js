// File: src/utils/goi.js
// BA GÓI BÁN HÀNG — MỘT DANH SÁCH DUY NHẤT, BA NƠI ĐỌC.
//
// ══ VÌ SAO GOM VÀO ĐÂY ══
// Trước 19/08 thông tin gói nằm rải ba chỗ và cả ba đều lệch nhau được:
//   · bảng giá (AccessGate) quảng cáo "Tối đa 3 thiết bị";
//   · form cấp mã (AdminAccessPanel) mặc định `maxDevices = 1` bất kể gói nào;
//   · máy chủ (accessCore) chỉ cưỡng chế đúng con số form gửi lên.
// Nghĩa là khách mua gói 3 thiết bị hoàn toàn có thể nhận một mã 1 thiết bị, và
// KHÔNG có gì báo — người bán phải tự nhớ. Đó là lỗi hứa-một-đằng-làm-một-nẻo,
// cùng họ với chuyện bảng giá bán AI như đặc quyền Premium trong khi máy chủ
// không chặn AI theo gói. Nay ba nơi cùng đọc `GOI`, nên lệch được nữa thì phải
// sửa file này — và test sẽ đỏ.
//
// ══ CHỈ CÓ HAI TRỤC ĐƯỢC PHÉP KHÁC NHAU ══
// Đã dò hết src/ api/ functions/: máy chủ chỉ cưỡng chế được ĐÚNG hai thứ —
// `maxDevices` (api/access.js chặn thiết bị thứ n+1) và `expiresAt`
// (accessCore). Mọi trục thứ ba nghĩ ra đều là quảng cáo suông. Nên ba gói ở
// đây khác nhau ĐÚNG hai thứ đó: thời hạn và số thiết bị.
//
// ══ VÌ SAO KHÔNG CÓ GÓI VĨNH VIỄN ══
// Chủ dự án nói thẳng: không cam kết duy trì web trọn đời được. Bán "trọn đời"
// rồi đóng web là một lời hứa không giữ nổi. Thay vào đó, `api/access-admin.js`
// đã có sẵn `extendDays` — nó cộng hạn lên CHÍNH MÃ CŨ và cố ý KHÔNG tăng
// `version`, nên người học không bị đăng xuất và giữ nguyên tiến độ. Gia hạn là
// đường thay cho trọn đời, và nó có thật chứ không phải lời hứa.

/**
 * @typedef {object} Goi
 * @property {string} ma        id lưu trong bản ghi Redis. Đổi id = mọi mã cũ
 *                              hiện sai tên trong bảng quản trị, nên đừng đổi.
 * @property {string} ten       tên hiện cho khách.
 * @property {number} ngay      thời hạn, ngày. Máy chủ cưỡng chế qua `expiresAt`.
 * @property {number} thietBi   số thiết bị. Máy chủ cưỡng chế qua `maxDevices`.
 * @property {number} giaMacDinh  đồng. Đặt sẵn để web bán được ngay, không phải
 *                              chờ cấu hình — nhưng vẫn ghi đè được bằng biến.
 * @property {string} khoaGia   biến môi trường ghi đè giá.
 */

/** @type {Goi[]} */
export const GOI = [
  {
    ma: 'thang1',
    ten: '1 tháng',
    caption: 'Học thử một khoá',
    ngay: 30,
    thietBi: 1,
    // 99.000đ — dưới ngưỡng tâm lý 100k, đủ rẻ để quyết ngay mà không phải hỏi
    // ý ai. Quan trọng vì đường thanh toán là CHUYỂN KHOẢN TAY: khách phải mở
    // app ngân hàng, gõ nội dung, rồi chờ người bán gửi mã. Ma sát đó chỉ đáng
    // với một số tiền nhỏ. Đây là gói để người lạ dám thử, không phải gói kiếm lời.
    giaMacDinh: 99000,
    khoaGia: 'VITE_PRICE_1M',
    mau: 'bg-slate-100',
  },
  {
    ma: 'thang6',
    ten: '6 tháng',
    caption: 'Đủ dài để lên trình',
    ngay: 180,
    thietBi: 2,
    // 399.000đ = 66.500đ/tháng, rẻ hơn gói tháng 33%. Đây là gói NHẮM BÁN NHIỀU
    // NHẤT: sáu tháng là khoảng thời gian thật sự đủ để đi từ mất gốc lên A2–B1,
    // nên nó vừa hợp lý về giá vừa hợp lý về việc học. Hai thiết bị vì người học
    // thật hay dùng điện thoại lúc rảnh và máy tính lúc ngồi vào bàn.
    giaMacDinh: 399000,
    khoaGia: 'VITE_PRICE_6M',
    mau: 'bg-yellow-200',
    noiBat: true,
  },
  {
    ma: 'thang12',
    ten: '12 tháng',
    caption: 'Đi hết lộ trình B2',
    ngay: 365,
    thietBi: 3,
    // 599.000đ = 49.900đ/tháng, rẻ hơn gói tháng 50%. Là mỏ neo giá: đặt cạnh
    // 399.000đ thì gói 6 tháng trông vừa phải chứ không trông đắt. Cũng là gói
    // DÀI NHẤT — không có gì dài hơn, vì chủ dự án không cam kết duy trì web
    // trọn đời, và bán một lời hứa không giữ nổi thì tệ hơn là không bán.
    giaMacDinh: 599000,
    khoaGia: 'VITE_PRICE_12M',
    mau: 'bg-indigo-200',
  },
];

/** Tra gói theo id. `null` nếu không có — KHÔNG đoán bừa một gói mặc định. */
export function timGoi(ma) {
  return GOI.find((g) => g.ma === String(ma ?? '').trim()) || null;
}

/** Tra gói theo TÊN hiện trên bảng giá (khách bấm nút thì chỉ có tên). */
export function timGoiTheoTen(ten) {
  return GOI.find((g) => g.ten === String(ten ?? '').trim()) || null;
}

/**
 * Giá một gói, tính bằng đồng.
 *
 * Biến môi trường ghi đè, nhưng chỉ khi nó là một số nguyên dương đọc được.
 * Gõ nhầm "499.000đ" vào biến thì bỏ qua và dùng giá mặc định — KHÔNG để rơi
 * về 0 hay NaN, vì một bảng giá ghi "0đ" hoặc "NaN" thì tệ hơn hẳn giá cũ.
 */
export function giaGoi(ma, env = {}) {
  const g = timGoi(ma) || timGoiTheoTen(ma);
  if (!g) return 0;
  const tho = String(env?.[g.khoaGia] ?? '').trim();

  // ⚠️ BẢN ĐẦU CHỈ LỌC BỎ KÝ TỰ KHÔNG PHẢI SỐ, và test bắt ngay: "-5" biến thành
  // "5" nên bảng giá hiện **5đ**. Lọc mù như thế đọc mọi thứ thành một con số nào
  // đó thay vì nhận ra là không đọc được.
  //
  // Nay phải khớp cả HÌNH: bắt đầu bằng chữ số, giữa là số/dấu ngăn nghìn, cuối
  // có thể có "đ"/"VNĐ". Dấu trừ ở đầu làm hỏng khớp và bị loại.
  if (!/^[0-9][0-9., ]*\s*(đ|vnd|vnđ)?$/i.test(tho)) return g.giaMacDinh;

  const so = Number.parseInt(tho.replace(/[^0-9]/g, ''), 10);
  // Sàn 1.000đ chặn lỗi gõ thiếu số 0 — ai đó gõ "99" định nói 99.000 thì bảng
  // giá sẽ rao 99đ, và bán hàng ở giá đó tệ hơn nhiều so với giữ giá mặc định.
  return Number.isInteger(so) && so >= 1000 ? so : g.giaMacDinh;
}

/** 399000 → "399.000đ". Dấu chấm ngăn nghìn theo lối Việt Nam. */
export function tienVN(dong) {
  const n = Math.round(Number(dong) || 0);
  return `${n.toLocaleString('vi-VN').replace(/,/g, '.')}đ`;
}

/** Giá quy về mỗi tháng — con số người mua thật sự dùng để so sánh. */
export function moiThang(ma, env = {}) {
  const g = timGoi(ma) || timGoiTheoTen(ma);
  if (!g) return 0;
  return Math.round(giaGoi(g.ma, env) / (g.ngay / 30));
}

/**
 * Rẻ hơn gói ngắn nhất bao nhiêu phần trăm, làm tròn xuống.
 *
 * Làm tròn XUỐNG chứ không lên: một con số quảng cáo thì thà thấp hơn sự thật.
 * Trả 0 cho chính gói ngắn nhất và cho mọi trường hợp không tính được.
 */
export function tietKiem(ma, env = {}) {
  const goc = moiThang(GOI[0].ma, env);
  const nay = moiThang(ma, env);
  if (!goc || !nay || nay >= goc) return 0;
  return Math.floor(((goc - nay) / goc) * 100);
}
