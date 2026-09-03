// File: src/utils/taiChunk.js
//
// MỘT MẢNH MÃ TẢI HỎNG KHÔNG ĐƯỢC PHÉP GIẾT CẢ APP.
//
// ══ LỖ ĐÃ ĐO ĐƯỢC TRÊN BẢN LIVE ══
// App có 17 chỗ `lazy(() => import(...))`. Mỗi trang là một tệp riêng mang tên
// băm nội dung, ví dụ `assets/WelcomePage-Bsz3TRaJ.js`. Hỏi bản live một tên
// băm KHÔNG còn tồn tại thì máy chủ trả:
//
//     HTTP/1.1 404 Not Found          (X-Vercel-Error: NOT_FOUND)
//
// tức là 404 THẬT, không phải index.html. Chuyện đó xảy ra đúng vào lúc dự án
// này làm thường xuyên nhất: ĐẨY BẢN MỚI. Người học đang mở sẵn một tab từ
// trước lúc đẩy vẫn giữ `index.html` CŨ trong bộ nhớ; họ bấm sang một trang
// chưa mở lần nào, trình duyệt đi xin tên băm CŨ, và nhận 404.
//
// `React.lazy` khi đó ném lỗi lúc vẽ. Cả app chỉ có MỘT tấm lưới ErrorBoundary
// ở `main.jsx`, nên toàn bộ màn hình bị thay bằng "Ối! Thỏ vấp phải một lỗi" —
// người học đang học dở mất sạch màn hình vì một tệp không tải được.
//
// Đường hỏng thứ hai, cùng đích: MẤT MẠNG. Service worker cũ trả
// `caches.match('/index.html')` cho MỌI yêu cầu hỏng, kể cả yêu cầu xin một
// tệp .js — trình duyệt nhận HTML ở chỗ chờ một module JavaScript và ném lỗi
// MIME. Đã vá riêng trong `public/sw.js` (chỉ trả index.html cho điều hướng).
//
// ══ VÌ SAO PHẢI THỬ LẠI BÊN TRONG HÀM DỰNG, KHÔNG PHẢI Ở NÚT BẤM ══
// `React.lazy` gọi hàm dựng của nó ĐÚNG MỘT LẦN rồi nhớ luôn kết quả. Nếu lời
// hứa đó hỏng, nó CẤT LỖI LẠI và ném ra ở mọi lần vẽ sau — nó KHÔNG gọi lại
// hàm dựng. Nên một cái nút "Thử lại" chỉ xoá trạng thái lỗi rồi vẽ lại đúng
// component `lazy` cũ sẽ ném ngay lập tức và KHÔNG làm gì cả — một cái nút
// chết, đúng họ lỗi mà dự án này đã cấm ("không nhánh nào được khai một việc
// chưa xảy ra").
//
// Vì vậy: việc thử lại nằm TRONG hàm dựng (một lời hứa, tự thử lại bên trong),
// còn nút bấm ngoài giao diện thì TẢI LẠI TRANG — cách phục hồi duy nhất còn
// đúng sau khi module đã bị nhớ là hỏng. Với trường hợp "vừa đẩy bản mới", tải
// lại trang cũng chính là cách sửa thật: index.html mới mang tên băm mới.

/** Số lần gọi lại `import()` sau lần đầu. Hai lần chờ, tổng khoảng 1,1 giây. */
export const SO_LAN_THU_LAI = 2;
const CHO_MS = [300, 800];

// ══ LƯỚI AN TOÀN NÀO CŨNG PHẢI TỰ ĐẾM ĐƯỢC ══
// Một lớp thử-lại âm thầm nuốt lỗi là đúng họ với cái `?.` từng nuốt lệnh dọn
// dẹp của bộ rà. Nên nó ĐẾM: bao nhiêu lượt phải thử lại, bao nhiêu lượt thử
// lại xong thì cứu được, bao nhiêu lượt thử hết vẫn hỏng. 0 là bình thường;
// khác 0 là tín hiệu đáng nhìn.
const dem = { thuLai: 0, cuuDuoc: 0, hong: 0 };

/** Bản sao số đếm — để bộ rà và bảng chẩn đoán đọc, không cho sửa. */
export function soLuotTaiLai() {
  return { ...dem };
}

/** Đặt lại số đếm. Chỉ dùng trong phép kiểm. */
export function xoaSoLuot() {
  dem.thuLai = 0; dem.cuuDuoc = 0; dem.hong = 0;
}

/**
 * Lỗi này có phải "tệp mã không tải được" không?
 *
 * Không có mã lỗi chuẩn nào cho việc này — mỗi trình duyệt một câu khác nhau
 * (Chrome: "Failed to fetch dynamically imported module", Firefox: "error
 * loading dynamically imported module", Safari: "Importing a module script
 * failed"). Nên dò theo chuỗi, và dò RỘNG: đoán nhầm một lỗi khác thành lỗi
 * tải chunk chỉ làm ta thử lại thừa một lần, còn bỏ sót thì người học mất cả
 * màn hình.
 */
export function laLoiTaiChunk(loi) {
  const s = `${loi?.message || loi || ''}`;
  return /dynamically imported module|importing a module script failed|failed to fetch|expected a javascript module|error loading|load failed|networkerror/i.test(s);
}

const nghi = (ms) => new Promise((r) => { setTimeout(r, ms); });

/**
 * Bọc một hàm `() => import('...')` để nó tự thử lại khi mạng chập chờn.
 *
 * @param {() => Promise<any>} nhap hàm dựng gốc, ví dụ `() => import('./pages/GamesPage')`
 * @param {{lan?: number, cho?: number[]}} tuyChon
 * @returns {() => Promise<any>} hàm dựng mới, đưa thẳng vào `lazy()`
 */
export function nhapLai(nhap, { lan = SO_LAN_THU_LAI, cho = CHO_MS } = {}) {
  return async () => {
    let loiCuoi;
    for (let i = 0; i <= lan; i += 1) {
      try {
        // Thử lại phải TUẦN TỰ: chờ xong lượt này mới tới lượt sau.
        const kq = await nhap();
        if (i > 0) dem.cuuDuoc += 1;   // hỏng lần đầu nhưng lần sau vào được
        return kq;
      } catch (e) {
        loiCuoi = e;
        // Lỗi KHÔNG phải do tải tệp (ví dụ chính module đó ném lúc chạy) thì
        // thử lại là vô nghĩa và chỉ làm chậm lời báo — ném ra ngay.
        if (!laLoiTaiChunk(e)) throw e;
        if (i === lan) break;
        dem.thuLai += 1;
        await nghi(cho[Math.min(i, cho.length - 1)]);
      }
    }
    dem.hong += 1;
    throw loiCuoi;
  };
}

// ── TỰ TẢI LẠI MỘT LẦN KHI ĐÚNG LÀ "VỪA ĐẨY BẢN MỚI" ─────────────────────
// Chỉ làm khi CÒN MẠNG: mất mạng thì tải lại trang không cứu được gì, mà còn
// cướp mất trang đang mở của người học.
//
// ⚠️ Chốt chống lặp vô hạn: nếu tên băm đó thật sự biến mất vĩnh viễn thì tải
// lại vẫn hỏng, và không có chốt thì trang tự nạp lại mãi mãi. Cờ nằm trong
// `sessionStorage` nên chỉ đúng MỘT lần cho mỗi tab.
const KHOA_DA_TAI_LAI = 'bunnyChunkReloadV1';

/** Đã dùng lượt tự tải lại của tab này chưa? */
export function daTuTaiLai(kho = globalThis.sessionStorage) {
  try { return kho?.getItem(KHOA_DA_TAI_LAI) === '1'; } catch { return true; }
}

/**
 * Thử tự tải lại trang một lần. Trả `true` nếu đã ra lệnh tải lại.
 *
 * Trả `false` — và khi đó giao diện PHẢI tự báo — trong ba trường hợp: đang mất
 * mạng, đã dùng hết lượt, hoặc không ghi được cờ (Safari riêng tư NÉM khi chạm
 * kho chứ không trả null). Không nhánh nào được im lặng.
 */
export function tuTaiLaiMotLan({
  kho = globalThis.sessionStorage,
  online = globalThis.navigator?.onLine !== false,
  taiLai = () => globalThis.location?.reload(),
} = {}) {
  if (!online || daTuTaiLai(kho)) return false;
  try { kho.setItem(KHOA_DA_TAI_LAI, '1'); } catch { return false; }
  taiLai();
  return true;
}
