// File: src/utils/audioLicense.js
// CỔNG GIẤY PHÉP CHO MỌI FILE ÂM THANH (việc 2.1) — thuần tính toán, có test CI.
//
// Vì sao đây là thứ được viết TRƯỚC cả một file âm thanh nào:
// Bunny English là sản phẩm CÓ THU PHÍ (xem màn hình chọn gói trong
// AccessGate.jsx). Nghĩa là mọi giấy phép "phi thương mại" (NC) đều KHÔNG dùng
// được, dù kho đó miễn phí tải về. Đo thật trên kho Tatoeba ngày 2026-08-15:
//   66–82% số bản thu là CC BY-NC-ND 3.0  → NC (cấm thương mại) + ND (cấm sửa)
//   12–16%                CC BY-NC 4.0    → NC
//    4–12%                BỎ TRỐNG        → chính Tatoeba nói: "If the license
//                                            field is empty, you may not reuse
//                                            the audio outside the Tatoeba
//                                            project."
//   1–2,6%                CC BY 4.0 / CC0 → DÙNG ĐƯỢC
// Tức là hơn 95% kho lớn nhất mà người ta hay giới thiệu là "audio miễn phí"
// KHÔNG dùng được cho ứng dụng này. Một cái nhìn lướt qua sẽ kết luận ngược lại.
//
// Cổng này phải là TEST CI chứ không phải một lệnh kiểm trong script tải: script
// chạy một lần rồi thôi, test chạy mãi mãi.

// ---- DANH SÁCH CHO PHÉP -----------------------------------------------------
// Chỉ hai giấy phép. Thêm bất cứ dòng nào vào đây là một quyết định pháp lý,
// nên nó phải nằm ở một chỗ duy nhất, có tên, và có lý do viết ngay bên cạnh.
export const GIAY_PHEP_CHO_PHEP = Object.freeze({
  'CC0 1.0': { canAttribute: false, note: 'Hiến tặng công cộng, không ràng buộc.' },
  'CC BY 4.0': { canAttribute: true, note: 'Dùng thương mại được, BẮT BUỘC ghi công tác giả.' },
  'Public Domain': { canAttribute: false, note: 'Thuộc phạm vi công cộng (vd LibriVox — chính họ nói được bán, được cắt ghép).' },
});

// Loại bỏ TƯỜNG MINH, kèm lý do — để người sau không phải đoán vì sao thiếu.
export const GIAY_PHEP_TU_CHOI = Object.freeze({
  'CC BY-NC-ND 3.0': 'NC cấm dùng cho sản phẩm thu phí, ND cấm cắt/sửa.',
  'CC BY-NC 4.0': 'NC cấm dùng cho sản phẩm thu phí.',
  'CC BY-SA 4.0': 'ShareAlike buộc bản phái sinh mang cùng giấy phép — tránh cho chắc, đổi lại chỉ mất ~2,5% kho.',
  '': 'Bỏ trống KHÔNG có nghĩa là tự do. Tatoeba nói rõ: bỏ trống thì không được dùng ngoài Tatoeba.',
  '\\N': 'Giá trị rỗng của bản xuất dữ liệu — coi như không có giấy phép.',
});

const chuan = (s) => String(s ?? '').trim();

// Bắt cả những biến thể chưa từng gặp: bất cứ chuỗi nào chứa NC hoặc ND đều bị
// chặn, kể cả khi nó không có trong danh sách từ chối ở trên. Thà chặn nhầm một
// giấy phép hợp lệ (sẽ có người thêm vào danh sách cho phép) còn hơn để lọt.
export function coTheDung(license) {
  const L = chuan(license);
  if (!L) return false;
  if (/\b(NC|ND)\b/i.test(L) || /NonCommercial|NoDeriv/i.test(L)) return false;
  return Object.prototype.hasOwnProperty.call(GIAY_PHEP_CHO_PHEP, L);
}

export function lyDoTuChoi(license) {
  const L = chuan(license);
  if (coTheDung(L)) return null;
  if (Object.prototype.hasOwnProperty.call(GIAY_PHEP_TU_CHOI, L)) return GIAY_PHEP_TU_CHOI[L];
  if (!L) return GIAY_PHEP_TU_CHOI[''];
  if (/\b(NC|ND)\b/i.test(L) || /NonCommercial|NoDeriv/i.test(L)) return 'Chứa điều khoản NC (phi thương mại) hoặc ND (cấm sửa).';
  return 'Không nằm trong danh sách giấy phép đã được duyệt.';
}

// ---- HỒ SƠ BẮT BUỘC CỦA MỖI FILE -------------------------------------------
// Không chỉ "có giấy phép" mà còn phải trả lời được: lấy ở đâu, ai đọc, và
// CÂU KHẲNG ĐỊNH GIẤY PHÉP nằm ở trang nào, đọc ngày nào. Trường cuối là thứ
// duy nhất giúp phiên sau kiểm lại được mà không phải tin lời phiên này.
export const TRUONG_BAT_BUOC = ['id', 'file', 'text', 'license', 'source', 'sourceUrl', 'licenseStatementUrl', 'licenseCheckedAt'];

export function kiemTraBanGhi(entry) {
  const loi = [];
  for (const truong of TRUONG_BAT_BUOC) {
    if (!chuan(entry?.[truong])) loi.push(`thiếu trường "${truong}"`);
  }
  const L = chuan(entry?.license);
  if (L && !coTheDung(L)) loi.push(`giấy phép "${L}" không dùng được: ${lyDoTuChoi(L)}`);
  // CC BY bắt buộc ghi công → phải có tên tác giả để mà ghi.
  if (coTheDung(L) && GIAY_PHEP_CHO_PHEP[L]?.canAttribute && !chuan(entry?.author)) {
    loi.push(`giấy phép "${L}" bắt buộc ghi công nhưng bản ghi không có tên tác giả`);
  }
  if (entry?.file && !/^[a-z0-9][a-z0-9._-]*\.(mp3|ogg|m4a|wav)$/i.test(entry.file)) {
    loi.push(`tên file "${entry.file}" không hợp lệ`);
  }
  return loi;
}

// Dòng ghi công hiển thị cho người học. CC BY mà không hiện dòng này là vi phạm
// giấy phép, nên nó là một hàm có test, không phải một chuỗi ghép tạm trong JSX.
export function dongGhiCong(entry) {
  if (!entry) return '';
  const L = chuan(entry.license);
  const ten = chuan(entry.author);
  const nguon = chuan(entry.source);
  if (!GIAY_PHEP_CHO_PHEP[L]?.canAttribute) return nguon ? `Nguồn: ${nguon} · ${L}` : L;
  return `${ten} (${nguon}) · ${L}`;
}
