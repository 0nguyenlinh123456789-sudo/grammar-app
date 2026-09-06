// File: src/utils/veOffline.js
//
// GIỮ LẠI "VÉ ĐÃ SOÁT" ĐỂ MẤT MẠNG KHÔNG BỊ ĐUỔI RA KHỎI APP.
//
// ══ LỖ ĐÃ ĐỌC RA TỪ MÃ NGUỒN, VÀ NÓ CHẶN TOÀN BỘ VIỆC HỌC NGOẠI TUYẾN ══
// `AccessGate.jsx` gọi `/api/access` để soát vé. Nhánh hỏng của nó là:
//
//     } catch (error) {
//       if (silent && error.status >= 500) return;
//       setState({ status: ..., 'locked' ... });
//     }
//
// Mất mạng thì `fetch` NÉM, `requestAccess` gán `error.status = 0`, và `0 >= 500`
// là SAI — nên cái chốt "im lặng bỏ qua" không che được đúng trường hợp thường
// gặp nhất. Kết quả: người học đang làm bài dở, xe chui vào hầm, vòng tự kiểm
// 15 phút chạy, và họ bị ném thẳng về màn NHẬP MÃ TRUY CẬP. Họ đã trả 99k–599k.
//
// ══ VÉ NÀY LÀ TIỆN NGHI, KHÔNG PHẢI CHỐT BẢO MẬT — NÓI THẲNG RA ══
// Ai cũng sửa được localStorage, y như ai cũng sửa được JavaScript trong tab của
// mình. Chốt thật nằm ở MÁY CHỦ, tại bước kích hoạt mã (`api/access.js` đọc
// Redis). Vé này chỉ trả lời đúng một câu: *"máy này đã từng soát vé THÀNH CÔNG
// gần đây chưa?"* — và nếu chưa từng, nó không có gì để trả về, nên người chưa
// mua vẫn không vào được.
//
// Cái nó thật sự nới ra: vòng tự kiểm 15 phút sinh ra để đếm SỐ THIẾT BỊ dùng
// chung một mã. Trong khoảng ân hạn dưới đây, một máy mất mạng không bị đếm lại.
// Đó là đánh đổi có thật, và nó rẻ hơn hẳn việc đuổi người đang học ra ngoài.
//
// ══ BA RÀNG BUỘC, VÀ CẢ BA ĐỀU LÀ RÀNG BUỘC AN TOÀN ══
//   1. CHỈ cất khi máy chủ thật sự trả `authenticated: true` kèm bản ghi quyền.
//      Không bao giờ cất một lượt soát HỎNG.
//   2. Hạn của vé = SỚM HƠN trong hai mốc: hạn thật của gói (`expiresAt`) và
//      `lúc soát gần nhất + ân hạn`. Vé KHÔNG BAO GIỜ sống lâu hơn gói.
//   3. CHỈ dùng khi lỗi là LỖI MẠNG (`status === 0`). Máy chủ trả 401/403 —
//      tức mã bị thu hồi, hết hạn, hay vượt số thiết bị — thì KHOÁ NGAY, và
//      xoá luôn vé. Không có đường nào để một lượt từ chối thật bị vé che đi.

const KHOA_VE = 'bunnyVeOfflineV1';

/**
 * Ân hạn: bao lâu sau lượt soát vé thành công gần nhất thì vé còn dùng được khi
 * mất mạng. 7 ngày — đủ cho một chuyến đi hoặc một tuần mạng chập chờn, và vẫn
 * bắt máy phải online lại ít nhất mỗi tuần một lần để bị đếm thiết bị.
 */
export const AN_HAN_MS = 7 * 24 * 60 * 60 * 1000;

/** Lỗi này có phải LỖI MẠNG không (chứ không phải máy chủ từ chối)? */
export function laLoiMang(loi) {
  // `requestAccess` gán `status = 0` cho đúng nhánh `fetch` ném. Không có
  // `status` thì cũng coi là lỗi mạng — một ngoại lệ chưa kịp gắn mã còn giống
  // "không gọi được máy chủ" hơn là giống "máy chủ nói không".
  const s = loi?.status;
  return s === 0 || s === undefined || s === null;
}

/**
 * Cất vé sau một lượt soát THÀNH CÔNG.
 * @param {object} access bản ghi quyền do máy chủ trả (`publicRecord`)
 * @returns {boolean} có cất được không
 */
export function catVe(access, { bayGio = Date.now(), ghi = null } = {}) {
  if (!access || typeof access !== 'object') return false;
  const ghiKhoThat = ghi || (( k, v) => {
    try { globalThis.localStorage.setItem(k, v); return true; } catch { return false; }
  });
  try {
    return ghiKhoThat(KHOA_VE, JSON.stringify({ access, soatLuc: bayGio }));
  } catch {
    return false;
  }
}

/**
 * Bỏ vé đi. Gọi khi máy chủ TỪ CHỐI, và khi người học tự đăng xuất.
 *
 * ⚠️ Bản đầu viết `return xoaThat(KHOA_VE);` KHÔNG bọc try — cùng đúng cái họ
 * lỗi mà cả đợt trước đi sửa: `catVe` và `docVe` đều bọc, riêng hàm này quên.
 * Phép kiểm "kho ném thì không hàm nào được ném ra ngoài" bắt được ngay. Và nó
 * là hàm nguy hiểm nhất để quên, vì nó chạy ở nhánh MÁY CHỦ TỪ CHỐI: ném ở đó
 * thì lượt khoá thật biến thành một ngoại lệ chưa ai bắt.
 */
export function boVe({ xoa = null } = {}) {
  try {
    const xoaThat = xoa || ((k) => { globalThis.localStorage.removeItem(k); return true; });
    return xoaThat(KHOA_VE);
  } catch {
    return false;
  }
}

/**
 * Đọc vé còn hiệu lực, hoặc `null`.
 *
 * Trả `null` — chứ không phải một vé hết hạn — trong mọi nhánh: không có vé, vé
 * hỏng, quá ân hạn, hoặc gói đã hết hạn thật. Bên gọi vì thế chỉ cần kiểm một
 * điều duy nhất.
 */
export function docVe({ bayGio = Date.now(), doc = null } = {}) {
  const docThat = doc || ((k) => {
    try { return globalThis.localStorage.getItem(k); } catch { return null; }
  });
  let v;
  try {
    const s = docThat(KHOA_VE);
    if (!s) return null;
    v = JSON.parse(s);
  } catch { return null; }

  const access = v?.access;
  const soatLuc = Number(v?.soatLuc);
  if (!access || typeof access !== 'object' || !Number.isFinite(soatLuc)) return null;

  // Ràng buộc 2: hạn của vé là SỚM HƠN trong hai mốc.
  if (bayGio - soatLuc > AN_HAN_MS) return null;
  const hanGoi = access.expiresAt ? Date.parse(access.expiresAt) : NaN;
  if (Number.isFinite(hanGoi) && bayGio >= hanGoi) return null;

  return { access, soatLuc, conLaiMs: Math.max(0, AN_HAN_MS - (bayGio - soatLuc)) };
}

/** Còn bao nhiêu ngày ân hạn — để giao diện nói ra, không để người học đoán. */
export function ngayConLai(conLaiMs) {
  return Math.max(0, Math.ceil(conLaiMs / (24 * 60 * 60 * 1000)));
}
