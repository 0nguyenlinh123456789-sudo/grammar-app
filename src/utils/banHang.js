// File: src/utils/banHang.js
// ĐƯỜNG ĐẶT MUA PHẢI DẪN TỚI MỘT CHỖ CÓ THẬT.
//
// ══ LỖ ĐÃ CÓ THẬT TRÊN BẢN LIVE ══
// Bảng giá có ba nút "MUA STANDARD / MUA PREMIUM / MUA TRỌN ĐỜI". Khi
// `VITE_SALES_URL` chưa đặt — và trên bản live nó CHƯA đặt, đã kiểm bằng cách
// tải chunk về dò chuỗi — thì bấm nút chỉ chạy:
//
//     await navigator.clipboard?.writeText(message); setCopied(true);
//
// Ba chuyện sai cùng lúc:
//   1. **Không có chỗ nào để gửi.** Lời nhắn được sao chép nói "Vui lòng gửi
//      thông tin thanh toán" — gửi cho AI? Cả app không có một số điện thoại,
//      Zalo hay email nào. Khách muốn trả tiền mà không có đường trả.
//   2. **Hai kiểu hỏng, và tôi mô tả thiếu một kiểu cho tới khi lái thật.**
//      Ban đầu tôi chỉ nói "khai sao chép xong dù chưa xong". Chạy
//      `npm run ra:mua` trên chính bản cũ thì thấy đủ hai nhánh:
//        · clipboard KHÔNG TỒN TẠI (ngữ cảnh không bảo mật, trình duyệt cũ):
//          `navigator.clipboard?.writeText` ra `undefined`, không ném gì, rồi
//          chạy tiếp tới `setCopied(true)` — khai một việc chưa xảy ra;
//        · clipboard TỪ CHỐI: lỗi đo được nguyên văn là
//          `NotAllowedError: Failed to execute 'writeText' on 'Clipboard':
//          Document is not focused.` — `await` ném, nên `setCopied(true)`
//          KHÔNG BAO GIỜ chạy. Nút chết hoàn toàn: không sao chép, không lời
//          báo, chỉ có một ngoại lệ không ai bắt trong console.
//      Nhánh thứ hai tệ hơn nhánh thứ nhất, và nó là nhánh tôi đã bỏ sót khi
//      chỉ đọc mã. Cả hai đều là "thay thế âm thầm" mà dự án cấm.
//   3. **Lời xác nhận nằm sai chỗ.** Nó là dòng chữ xám nhỏ thứ ba dưới đáy
//      hộp, trong khi mắt khách đang ở cái nút vừa bấm.
//
// Cùng họ với lỗi lời báo micro: nhánh hay gặp nhất lại là nhánh bỏ người dùng
// ở đó. Nên luật ở đây giống luật bên đó — **mọi nhánh phải chỉ được đường đi
// tiếp**, và không nhánh nào được khai một việc chưa xảy ra.

/** Các kênh đặt mua, đọc từ biến môi trường lúc dựng. */
export const KENH = [
  { khoa: 'VITE_SALES_URL', loai: 'trang', nhan: 'Mở trang đặt mua', duaVao: (v) => v },
  { khoa: 'VITE_SALES_ZALO', loai: 'zalo', nhan: 'Nhắn Zalo', duaVao: (v) => (/^https?:/i.test(v) ? v : `https://zalo.me/${v.replace(/[^0-9]/g, '')}`) },
  { khoa: 'VITE_SALES_EMAIL', loai: 'email', nhan: 'Gửi email', duaVao: (v) => `mailto:${v}` },
  { khoa: 'VITE_SALES_PHONE', loai: 'dienthoai', nhan: 'Gọi điện', duaVao: (v) => `tel:${v.replace(/[^0-9+]/g, '')}` },
];

/**
 * Danh sách kênh ĐÃ CẤU HÌNH, theo đúng thứ tự ưu tiên ở trên.
 * Trả về mảng rỗng nếu chủ dự án chưa đặt kênh nào — và mảng rỗng đó là thứ màn
 * hình phải BÁO, chứ không phải thứ để lặng lẽ bỏ qua.
 */
export function kenhDatMua(env = {}) {
  const ra = [];
  for (const k of KENH) {
    const v = String(env[k.khoa] ?? '').trim();
    if (!v) continue;
    ra.push({ loai: k.loai, nhan: k.nhan, hien: v, href: k.duaVao(v) });
  }
  return ra;
}

// ══ LỖ THỨ HAI, TÌM RA 19/08: BẢNG GIÁ KHÔNG CÓ GIÁ ══
// Modal tên là "Chọn gói phù hợp", có ba thẻ Standard / Premium / Trọn đời,
// mỗi thẻ liệt kê tính năng và một nút "MUA …" — và KHÔNG MỘT CON SỐ NÀO.
// Đã dò cả AccessGate.jsx lẫn file này: không có chuỗi giá ở đâu hết.
//
// Đây không phải chuyện thẩm mỹ. Khách phải nhắn tin hỏi giá rồi chờ trả lời
// mới quyết được có mua hay không, tức mất người mua ngay tại bước dễ mất
// nhất. Và nó phạm đúng luật của dự án: thiếu dữ liệu thì ẨN hoặc BÁO. Bảng
// giá không giá thì không ẩn, cũng không báo — nó lặng lẽ thiếu.
//
// Giá đọc từ biến môi trường cho cùng một cơ chế với VITE_SALES_*, nên chủ dự
// án chỉ phải học một chỗ. ⚠️ KÈM ĐÚNG MỘT CÁI BẪY: biến VITE_* được NHÚNG LÚC
// DỰNG, nên đặt biến trên Vercel mà không deploy lại thì bảng điều khiển trông
// như đã xong trong khi bản live vẫn hiện "Giá: liên hệ người bán".
export const KHOA_GIA = {
  Standard: 'VITE_PRICE_STANDARD',
  Premium: 'VITE_PRICE_PREMIUM',
  'Trọn đời': 'VITE_PRICE_LIFETIME',
};

/**
 * Giá của một gói, hoặc chuỗi rỗng khi chủ dự án chưa đặt.
 * Chuỗi rỗng là thứ màn hình phải NÓI RA, không phải thứ để bỏ trống.
 */
export function giaGoi(goi, env = {}) {
  const khoa = KHOA_GIA[String(goi ?? '').trim()];
  return khoa ? String(env[khoa] ?? '').trim() : '';
}

export const CHUA_CO_GIA = 'Giá: liên hệ người bán';

/** Lời nhắn đặt mua, để khách gửi qua kênh nào cũng được. */
export function loiNhanDatMua(goi, env = {}) {
  const ten = String(goi || '').trim() || 'chưa rõ';
  const gia = giaGoi(ten, env);
  // Có giá thì NHẮC LẠI trong lời nhắn: người mua và người bán cùng nhìn một
  // con số, khỏi cãi nhau về số tiền sau khi đã chuyển khoản.
  return `Tôi muốn đăng ký Bunny English - gói ${ten}${gia ? ` (${gia})` : ''}. `
    + 'Vui lòng gửi thông tin thanh toán và mã truy cập.';
}

/**
 * Sao chép lời nhắn, và NÓI THẬT kết quả.
 *
 * Trả về `{ ok, chu }`. Khi không sao chép được thì `chu` chỉ đường đi tiếp
 * (tự chọn chữ trong ô bên dưới) chứ không chỉ nói "lỗi" — ô đó luôn có mặt,
 * cùng luật với ô gõ tay ở màn luyện nói.
 */
export async function saoChepLoiNhan(loiNhan, dieuHuong = globalThis.navigator) {
  const viet = dieuHuong?.clipboard?.writeText;
  if (typeof viet !== 'function') {
    return { ok: false, chu: 'Trình duyệt này không cho sao chép tự động. Hãy tự chọn và sao chép lời nhắn trong ô bên dưới.' };
  }
  try {
    await viet.call(dieuHuong.clipboard, loiNhan);
    return { ok: true, chu: 'Đã sao chép lời nhắn. Hãy gửi cho người bán qua một trong các kênh bên dưới.' };
  } catch {
    return { ok: false, chu: 'Trình duyệt chưa cho phép sao chép. Hãy tự chọn và sao chép lời nhắn trong ô bên dưới.' };
  }
}

/**
 * Câu phải hiện ra khi CHƯA cấu hình kênh nào.
 *
 * Nói thẳng với khách rằng đây là chỗ thiếu của người bán, và cho họ một việc
 * làm được ngay (giữ lại lời nhắn). Im lặng ở đây nghĩa là khách bấm "MUA" rồi
 * ngồi chờ một chuyện không bao giờ xảy ra.
 */
export const CHUA_CO_KENH = 'Chưa có kênh đặt mua nào được cấu hình. '
  + 'Hãy sao chép lời nhắn bên dưới và liên hệ người bán qua kênh bạn đã biết.';
