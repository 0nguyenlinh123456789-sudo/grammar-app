// File: src/utils/gopKhoDongBo.js
// GỘP THAY VÌ ĐÈ — cho những kho là NHẬT KÝ CHỈ THÊM.
//
// ══ VÌ SAO CẦN ══
// `progressSync.js` + `routes/progress.js` đồng bộ theo lối **đè nguyên khối,
// ai ghi sau thắng**, chặn bằng đúng MỘT mốc `updatedAt` ở cấp trên cùng. Không
// có gộp theo từng khoá. Với phần lớn dữ liệu thì chấp nhận được: XP, chuỗi
// ngày, chặng đã xong đều là ẢNH CHỤP trạng thái hiện tại, lấy bản mới nhất là
// đúng.
//
// Nhưng có hai kho KHÔNG phải ảnh chụp — chúng là **nhật ký chỉ thêm**:
//
//   · `bandExamHistoryV1` — sổ thi cuối bậc. Đây là căn cứ DUY NHẤT để app gắn
//     nhãn bậc và in tờ chứng nhận. Thi đạt B2 trên điện thoại lúc không có
//     mạng, rồi mở máy tính (đang giữ bản cũ) và máy tính đồng bộ trước — bản
//     ghi đó bị đè mất, và người học không có cách nào lấy lại ngoài thi lại.
//   · `thoiGianHocV1` — đồng hồ học, ghi theo NGÀY. Đè là mất luôn những ngày
//     chỉ máy kia biết.
//
// ══ VÌ SAO GỘP Ở ĐÂY LÀ AN TOÀN ══
// Cả hai phép gộp đều **luỹ đẳng**: gộp hai lần ra đúng kết quả gộp một lần, và
// gộp A vào B bằng gộp B vào A. Nên chạy lại bao nhiêu lần cũng không sinh thêm
// bản ghi, và không phụ thuộc thứ tự hai máy đồng bộ.
//
// ══ CÁI FILE NÀY KHÔNG CHỮA ══
// Nó KHÔNG biến đồng bộ thành gộp-theo-khoá cho mọi thứ. Chặng đã xong, XP, sổ
// lỗi vẫn theo lối ai-ghi-sau-thắng như cũ. Ở đây chỉ cứu đúng hai kho mà mất
// là mất hẳn, không dựng lại được từ dữ liệu khác.

/** Đọc một chuỗi JSON, trả về `mac` nếu hỏng. Kho trong localStorage ai cũng sửa được. */
function docJson(chuoi, mac) {
  if (typeof chuoi !== 'string') return mac;
  try {
    const v = JSON.parse(chuoi);
    return v === null || v === undefined ? mac : v;
  } catch { return mac; }
}

/** Sổ thi: hợp hai danh sách theo (mã đề + thời điểm), giữ thứ tự thời gian. */
export function gopSoThi(chuoiA, chuoiB, toiDa = 30) {
  const a = docJson(chuoiA, []);
  const b = docJson(chuoiB, []);
  if (!Array.isArray(a) || !Array.isArray(b)) return Array.isArray(a) ? chuoiA : chuoiB;

  const theo = new Map();
  for (const k of [...a, ...b]) {
    if (!k || typeof k !== 'object') continue;
    // Bản ghi thiếu thời điểm không gộp được (không phân biệt nổi với bản khác),
    // nhưng cũng KHÔNG được vứt: nó vẫn là lượt thi người ta đã làm. Giữ nguyên
    // dưới một khoá riêng theo vị trí.
    const khoa = `${k.examId || '?'}|${k.lucLam || `khong-ngay-${theo.size}`}`;
    if (!theo.has(khoa)) theo.set(khoa, k);
  }
  const ds = [...theo.values()].sort((x, y) => String(x.lucLam || '').localeCompare(String(y.lucLam || '')));
  return JSON.stringify(ds.slice(-toiDa));
}

/** Đồng hồ học: mỗi ngày lấy con số LỚN HƠN của hai máy. */
export function gopDongHo(chuoiA, chuoiB) {
  const a = docJson(chuoiA, {});
  const b = docJson(chuoiB, {});
  const hopLe = (o) => o && typeof o === 'object' && !Array.isArray(o);
  if (!hopLe(a) || !hopLe(b)) return hopLe(a) ? chuoiA : chuoiB;

  const ra = { ...a };
  for (const [ngay, giay] of Object.entries(b)) {
    const x = Number(giay) || 0;
    const y = Number(ra[ngay]) || 0;
    // LẤY LỚN HƠN, không cộng. Cộng thì hai máy cùng mở app một buổi sẽ đẻ ra
    // gấp đôi thời gian — một con số sai theo chiều có lợi cho mình.
    ra[ngay] = Math.max(x, y);
  }
  return JSON.stringify(ra);
}

/**
 * Khoá nào phải GỘP thay vì ĐÈ. Khoá không có tên ở đây thì giữ nguyên lối cũ
 * (ai ghi sau thắng) — kể tên ra thì biết, lọc theo mẫu thì chỉ là đoán.
 */
export const KHO_GOP_DUOC = {
  bandExamHistoryV1: gopSoThi,
  thoiGianHocV1: gopDongHo,
};

/**
 * Đặt một giá trị từ máy chủ vào kho, GỘP nếu khoá đó là nhật ký chỉ thêm.
 * @returns {boolean} có gộp không (để nơi gọi báo lại được)
 */
export function datHoacGop(storage, khoa, giaTriMoi) {
  const gop = KHO_GOP_DUOC[khoa];
  if (!gop) { storage.setItem(khoa, giaTriMoi); return false; }
  const cu = storage.getItem(khoa);
  if (cu === null) { storage.setItem(khoa, giaTriMoi); return false; }
  storage.setItem(khoa, gop(cu, giaTriMoi));
  return true;
}
