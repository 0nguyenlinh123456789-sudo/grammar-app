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

// ══ GIÁ: ĐÃ CHUYỂN SANG src/utils/goi.js ══
// Ban đầu giá nằm ở đây dưới dạng CHUỖI đọc từ biến môi trường, và chưa đặt thì
// bảng giá hiện "Giá: liên hệ người bán". Chủ dự án sau đó yêu cầu tự đặt luôn
// ba gói với giá hợp lý, nên giá nay có SẴN trong mã (`giaMacDinh`) và biến môi
// trường chỉ để ghi đè. Nhánh "chưa có giá" vì thế KHÔNG CÒN XẢY RA ĐƯỢC và đã
// bỏ hẳn thay vì để lại một nhánh chết không ai chạy tới.
//
// Giá cũng đổi từ chuỗi sang SỐ, để tính được "mỗi tháng bao nhiêu" và "rẻ hơn
// bao nhiêu %" — hai con số người Việt thật sự dùng để so gói.
// `export ... from` CHỈ tái xuất, KHÔNG đưa tên vào phạm vi file này — nên
// `loiNhanDatMua` bên dưới vẫn phải nhập riêng. Lint bắt được ngay, nhưng ghi
// lại vì đây là chỗ dễ tưởng là xong.
import { giaGoi, tienVN } from './goi.js';

export { GOI, giaGoi, moiThang, tienVN, tietKiem, timGoi, timGoiTheoTen } from './goi.js';

// ══════════════════════════════════════════════════════════════════════════
// CHUYỂN KHOẢN NGÂN HÀNG — quyết định của chủ dự án ngày 19/08.
//
// Yêu cầu ban đầu là "tiền vào thẳng ngân hàng mà KHÔNG lộ thông tin cá nhân".
// Hai vế đó không cùng đúng được: mọi chuyển khoản VietQR ở VN đều hiện TÊN CHỦ
// TÀI KHOẢN cho người trả. Chủ dự án đã chọn dứt khoát: **chấp nhận lộ TÊN,
// không lộ thứ gì khác**. Nên ở đây chỉ có tên ngân hàng, số tài khoản, tên chủ
// tài khoản và một ảnh QR — KHÔNG số điện thoại, KHÔNG địa chỉ, KHÔNG email.
//
// ⚠️ VÌ SAO PHẢI CÓ MÃ ĐƠN, VÀ VÌ SAO NÓ LÀ PHẦN QUAN TRỌNG NHẤT Ở ĐÂY:
// Ảnh QR lấy từ app ngân hàng là QR TĨNH — nó chỉ mang số tài khoản, KHÔNG mang
// số tiền và KHÔNG mang nội dung. Người mua vẫn phải tự gõ hai thứ đó. Nếu nội
// dung chuyển khoản trống hoặc viết linh tinh thì người bán nhìn báo có tiền mà
// KHÔNG biết là của ai — và đó là cách hỏng thường gặp nhất của kiểu bán này.
// Mã đơn là sợi dây duy nhất nối "một khoản tiền vừa vào" với "một người mua",
// và nó thay cho việc phải hỏi khách số điện thoại hay tên tuổi.
//
// KHÔNG dùng dịch vụ sinh QR động ngoài (vietqr.io…): làm thế là gửi số tài
// khoản của chủ dự án sang máy chủ bên thứ ba ở mỗi lượt xem bảng giá.
//
// ══════════════════════════════════════════════════════════════════════════
// 27/08 — BỎ TIỀN TỐ `VITE_`, CHUYỂN HẲN SANG PHÍA MÁY CHỦ.
//
// Bản trước đọc `VITE_BANK_*` từ `import.meta.env`. Vite **nhúng thẳng mọi biến
// `VITE_*` vào file JavaScript công khai lúc dựng** — nên số tài khoản nằm sẵn
// trong bundle, ai mở DevTools cũng đọc được, kể cả người chưa bấm mua. Việc
// `ChuyenKhoan` chỉ hiện sau khi khách chọn gói chỉ giấu ở LỚP GIAO DIỆN, không
// giấu ở LỚP DỮ LIỆU. Chủ dự án chọn phương án C ngày 27/08: **máy chủ giữ,
// client phải hỏi mới có**.
//
// Vì thế bốn khoá dưới đây KHÔNG còn tiền tố `VITE_`. Đặt trên Vercel như biến
// máy chủ bình thường; chúng không bao giờ vào bundle và không bao giờ vào Git.
//
// ⚠️ TRẦN CỦA CÁCH NÀY, nói thẳng để không ai tưởng nhầm là đã bí mật: bất kỳ ai
// đọc mã client đều gọi được một lệnh POST tới `/api/access` để lấy. Cái đạt
// được là: KHÔNG nằm trong bundle, KHÔNG nằm trong Git, KHÔNG bị máy quét gom
// hàng loạt từ tệp tĩnh, và có giới hạn tốc độ. Cái KHÔNG đạt được là bí mật
// thật sự — muốn thế thì chỉ có cách không đưa lên web, gửi tay qua Zalo.
export const KHOA_NGAN_HANG = {
  ten: 'BANK_NAME',
  so: 'BANK_ACCOUNT',
  chu: 'BANK_HOLDER',
  qr: 'BANK_QR',
};

/**
 * Thông tin chuyển khoản, hoặc `null` khi chưa đủ để chuyển tiền.
 *
 * ĐỦ nghĩa là có CẢ tên ngân hàng LẪN số tài khoản. Thiếu một trong hai thì trả
 * `null` chứ không hiện một nửa: một khối chuyển khoản có số mà không có ngân
 * hàng là thứ khách không dùng được, mà nhìn thì lại tưởng là đã đủ.
 * Ảnh QR và tên chủ tài khoản là tùy chọn — thiếu thì bớt phần đó, vẫn chuyển
 * khoản tay được bằng số tài khoản.
 */
export function thongTinChuyenKhoan(env = {}) {
  const lay = (k) => String(env[KHOA_NGAN_HANG[k]] ?? '').trim();
  const ten = lay('ten');
  const so = lay('so');
  if (!ten || !so) return null;
  return { ten, so, chu: lay('chu'), qr: lay('qr') };
}

export const CHUA_CO_CHUYEN_KHOAN = 'Chưa có thông tin chuyển khoản. Hãy liên hệ người bán để lấy số tài khoản trước khi trả tiền.';

/** Đang hỏi máy chủ. Phải nói ra, vì ô trống ở bước trả tiền trông như hỏng. */
export const DANG_LAY_NGAN_HANG = 'Đang lấy thông tin chuyển khoản…';

/**
 * Hỏi máy chủ xin thông tin chuyển khoản.
 *
 * Trả `{ ok: true, nganHang }` hoặc `{ ok: false, chu }` — **không bao giờ trả
 * một nửa**. Mọi nhánh hỏng đều kèm câu chỉ đường đi tiếp, đúng luật đã áp cho
 * `saoChepLoiNhan` và lời báo micro: không nhánh nào được bỏ người dùng đứng đó,
 * và không nhánh nào được khai một việc chưa xảy ra.
 *
 * `maDon` gửi kèm để máy chủ buộc bên gọi phải đi qua đúng bước "đã bấm mua",
 * và để nhật ký của người bán tra được ai đã hỏi. Không phải lớp bảo mật —
 * xem chú thích trần của phương án C ở `KHOA_NGAN_HANG`.
 */
export async function layThongTinNganHang(maDon, fetchFn = globalThis.fetch) {
  if (typeof fetchFn !== 'function') {
    return { ok: false, chu: 'Trình duyệt này không gọi được máy chủ. Hãy liên hệ người bán để lấy số tài khoản.' };
  }
  try {
    const r = await fetchFn('/api/access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'bank', maDon: String(maDon || '') }),
    });
    const du = await r.json().catch(() => ({}));
    if (r.ok && du?.nganHang?.ten && du?.nganHang?.so) return { ok: true, nganHang: du.nganHang };
    if (r.status === 429) return { ok: false, chu: 'Bạn hỏi hơi nhiều lần trong thời gian ngắn. Chờ ít phút rồi mở lại, hoặc nhắn thẳng cho người bán.' };
    // Máy chủ nói rõ chưa cấu hình → đó KHÔNG phải lỗi mạng, và khách cần biết
    // là người bán còn thiếu chứ không phải máy họ hỏng.
    return { ok: false, chu: CHUA_CO_CHUYEN_KHOAN };
  } catch {
    return { ok: false, chu: 'Không lấy được thông tin chuyển khoản (mất mạng?). Hãy thử lại hoặc nhắn cho người bán.' };
  }
}

// Bỏ hẳn 0/O, 1/I/L, 5/S, 2/Z: mã này người mua phải GÕ TAY vào ô nội dung
// chuyển khoản trên app ngân hàng, nên một cặp ký tự nhìn giống nhau là đủ để
// người bán không tra ra đơn. Thà mã dài hơn một chút.
const CHU_MA = 'ABCDEFGHJKMNPQRTUVWXY346789';
export const MAU_MA_DON = /^BE-[ABCDEFGHJKMNPQRTUVWXY346789]{6}$/;
const KHOA_MA_DON = 'grammarMaDonV1';

/**
 * Mã đơn ngắn, đọc và gõ lại được. Dạng `BE-XXXXXX`.
 *
 * Sinh ở TRÌNH DUYỆT chứ không xin máy chủ: nó chỉ là nhãn để người bán tra
 * khớp khoản tiền, không phải thứ cấp quyền gì. Trùng mã không mở được gì của
 * ai — quyền vẫn nằm ở mã truy cập do `api/access-admin.js` sinh.
 */
export function maDonHang(nguon = globalThis.crypto) {
  const n = 6;
  const so = new Uint32Array(n);
  if (typeof nguon?.getRandomValues === 'function') nguon.getRandomValues(so);
  else for (let i = 0; i < n; i += 1) so[i] = Math.floor(Math.random() * 0xffffffff);
  let ra = '';
  for (let i = 0; i < n; i += 1) ra += CHU_MA[so[i] % CHU_MA.length];
  return `BE-${ra}`;
}

/**
 * Mã đơn của trình duyệt này, GIỮ LẠI giữa các lượt mở.
 *
 * ⚠️ Bản đầu để mã trong `useState` và chỉ thế thôi. Hỏng theo đúng cách mà
 * chính mã đơn sinh ra để chặn: khách chép BE-3GNRYP, chuyển khoản, đóng tab,
 * mở lại xem — ra một mã KHÁC. Giờ họ có một khoản tiền mang mã mà app đã
 * quên, và nếu không ghi lại thì họ sẽ đọc cho người bán cái mã mới. Một
 * khoản tiền không tra được, đến bằng cửa khác.
 *
 * Cùng cách `getDeviceId()` trong AccessGate giữ mã thiết bị. Bọc try/catch vì
 * Safari chế độ riêng tư NÉM khi chạm localStorage chứ không trả null.
 */
export function maDonGiuLai(kho = globalThis.localStorage) {
  try {
    const cu = String(kho?.getItem(KHOA_MA_DON) ?? '').trim();
    if (MAU_MA_DON.test(cu)) return cu;
  } catch { /* không đọc được thì sinh mới, vẫn dùng được trong lượt này */ }
  const moi = maDonHang();
  try { kho?.setItem(KHOA_MA_DON, moi); } catch { /* không ghi được cũng không sao */ }
  return moi;
}

/** Lời nhắn đặt mua, để khách gửi qua kênh nào cũng được. */
export function loiNhanDatMua(goi, env = {}, maDon = '') {
  const ten = String(goi || '').trim() || 'chưa rõ';
  // `giaGoi` nay trả SỐ (đồng) chứ không phải chuỗi, nên phải định dạng —
  // không thì lời nhắn gửi cho người bán ghi "(399000)".
  const gia = giaGoi(ten, env);
  const ma = String(maDon || '').trim();
  // Có giá thì NHẮC LẠI trong lời nhắn: người mua và người bán cùng nhìn một
  // con số, khỏi cãi nhau về số tiền sau khi đã chuyển khoản.
  // Có mã đơn thì nêu ngay đầu câu: đó là thứ người bán cần đầu tiên để tra ra
  // khoản tiền, chứ không phải tên gói.
  return `Tôi muốn đăng ký Bunny English - gói ${ten}${gia ? ` (${tienVN(gia)})` : ''}. `
    + (ma ? `Mã đơn của tôi: ${ma}. ` : '')
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
