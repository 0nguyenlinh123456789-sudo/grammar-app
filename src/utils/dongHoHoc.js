// File: src/utils/dongHoHoc.js
// BỘ CHẠY của đồng hồ học (`utils/thoiGianHoc.js` là chỗ CẤT SỐ).
//
// Tách đôi vì hai việc hỏng theo hai kiểu khác nhau: chỗ cất số hỏng thì con số
// sai, bộ chạy hỏng thì đồng hồ chạy hoang. Bộ cất số kiểm được bằng test thuần;
// bộ chạy thì phải gắn vào trình duyệt, nên nó phải MỎNG.
//
// LUẬT: chỉ đếm khi tab đang HIỆN **và** có tương tác trong `IM_LANG_TOI_DA_GIAY`
// gần nhất. Thiếu một trong hai là một tab quên đóng qua đêm đẻ ra 8 giờ "học",
// và con số đó đi thẳng vào báo cáo phụ huynh.
import { themNhip, NHIP_GIAY, IM_LANG_TOI_DA_GIAY } from './thoiGianHoc.js';

const SU_KIEN = ['pointerdown', 'keydown', 'wheel', 'touchstart'];

/**
 * Bật đồng hồ. Trả về hàm tắt.
 * @param {object} [tuyChon]
 * @param {() => number} [tuyChon.bayGio] nguồn thời gian, để test lái được
 */
export function batDongHoHoc({ bayGio = () => Date.now() } = {}) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return () => {};

  let chamCuoi = bayGio();
  const danhDau = () => { chamCuoi = bayGio(); };
  for (const s of SU_KIEN) window.addEventListener(s, danhDau, { passive: true });

  // Rời tab rồi quay lại KHÔNG được tính là vừa chạm: quay lại mà không làm gì
  // thì vẫn là đang không học. Nhưng phải đặt lại mốc, nếu không thì khoảng thời
  // gian vắng mặt bị tính ngược thành "vừa chạm rất lâu rồi" và nhịp đầu tiên
  // sau khi quay lại bị bỏ oan.
  const doiHien = () => { if (document.visibilityState === 'visible') chamCuoi = bayGio(); };
  document.addEventListener('visibilitychange', doiHien);

  const nhip = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    if (bayGio() - chamCuoi > IM_LANG_TOI_DA_GIAY * 1000) return;
    themNhip(NHIP_GIAY);
  }, NHIP_GIAY * 1000);

  return () => {
    clearInterval(nhip);
    document.removeEventListener('visibilitychange', doiHien);
    for (const s of SU_KIEN) window.removeEventListener(s, danhDau);
  };
}
