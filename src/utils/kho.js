// File: src/utils/kho.js
//
// CHẠM VÀO localStorage MÀ KHÔNG BỌC LÀ MỘT ĐƯỜNG LÀM TRẮNG CẢ APP.
//
// ══ LỖ ĐÃ ĐẾM ĐƯỢC ══
// `src/App.jsx` gọi thẳng `localStorage` **30 lần** không bọc try/catch, và
// nhiều lần trong số đó nằm trong hàm khởi tạo của `useState`:
//
//     const [theme, setTheme] = useState(() => {
//       const savedTheme = localStorage.getItem('theme');   // ← ném là chết
//       ...
//     });
//
// Hàm đó chạy trong LƯỢT VẼ ĐẦU TIÊN của App. App không phải component tải lười
// — nó là gốc. Nên nếu `localStorage` ném ở đây thì React ném lúc vẽ, rơi thẳng
// xuống `ErrorBoundary` ở `main.jsx`, và người học nhận màn "Ối! Thỏ vấp phải
// một lỗi" ở MỌI lần mở. Tải lại trang không cứu được: lần sau vẫn ném y hệt.
//
// ══ KHI NÀO NÓ NÉM ══
// Không hiếm, và đúng vào nhóm người học của app này:
//   · Safari trên iPhone ở chế độ Duyệt web riêng tư — hạn ngạch bằng 0, nên
//     `setItem` ném `QuotaExceededError`;
//   · iOS Safari bật "Chặn tất cả cookie" — chạm vào `localStorage` ném
//     `SecurityError` NGAY LÚC ĐỌC, chứ không trả null;
//   · Chrome/Edge khi người dùng chặn dữ liệu trang cho miền này;
//   · kho đầy (ảnh, bản thu, tiến độ tích lâu ngày).
//
// Chính dự án này đã ghi luật đó ra giấy ở ba chỗ khác — `utils/aiKey.js`
// ("Safari in private mode throws on access rather than returning null"),
// `utils/banHang.js`, `utils/taiChunk.js`. App.jsx là tệp quan trọng nhất và là
// tệp duy nhất phá luật.
//
// ══ VÀ ĐÂY MỚI LÀ PHẦN QUAN TRỌNG: BỌC KHÔNG ĐỦ ══
// Bọc try/catch rồi im lặng thì app chạy được, nhưng người học sẽ ngồi học một
// tiếng rồi mất sạch tiến độ mà không ai báo trước — đổi một màn hình hỏng ngay
// lấy một sự phản bội trễ. Đúng thứ luật "thiếu dữ liệu thì ẨN hoặc BÁO, không
// im lặng" của dự án cấm.
//
// Nên mọi nhánh hỏng ở đây đều ĐẾM, và `khoHong()` cho giao diện một câu trả
// lời thẳng để dựng băng cảnh báo.

const KHOA_THU = '__bunny_thu_kho__';

// ĐẾM, KHÔNG NUỐT IM. Cùng luật với lớp thử lại ở `taiChunk.js`: một tấm lưới
// an toàn ngừng hoạt động không được phép trông giống hệt lúc nó đang chạy tốt.
const dem = { doc: 0, ghi: 0, xoa: 0 };

/** Bản sao số lượt chạm kho bị ném. 0 là bình thường. */
export function soLuotKhoHong() {
  return { ...dem };
}

/** Đặt lại số đếm. Chỉ dùng trong phép kiểm. */
export function xoaSoLuotKhoHong() {
  dem.doc = 0; dem.ghi = 0; dem.xoa = 0;
}

/**
 * Kho này có DÙNG ĐƯỢC không — thử ghi thật rồi xoá đi.
 *
 * Không thể chỉ kiểm `typeof localStorage !== 'undefined'`: ở chế độ riêng tư
 * của Safari đối tượng đó CÓ TỒN TẠI, đọc cũng được, chỉ `setItem` mới ném. Nên
 * phép thử phải là một lượt ghi thật.
 */
export function khoDungDuoc(kho = null) {
  try {
    // ⚠️ PHẢI LẤY `localStorage` BÊN TRONG `try`, KHÔNG ĐƯỢC ĐỂ Ở THAM SỐ MẶC ĐỊNH.
    // Bản đầu của chính file này viết `khoDungDuoc(kho = globalThis.localStorage)`.
    // Tham số mặc định được tính TRƯỚC khi vào thân hàm, tức NGOÀI try — nên ở
    // iOS "Chặn tất cả cookie" (chạm vào là ném) chính cái hàm dựng ra để phát
    // hiện kho hỏng lại là chỗ làm trắng màn hình. Bộ rà `ra:chankho` bắt được:
    // nhánh "chặn lúc GHI" đã xanh trong khi nhánh "chặn lúc ĐỌC" vẫn 0/3.
    const k = kho || globalThis.localStorage;
    k.setItem(KHOA_THU, '1');
    k.removeItem(KHOA_THU);
    return true;
  } catch {
    return false;
  }
}

// Đo MỘT lần cho mỗi lượt mở trang. Gọi `khoDungDuoc` ở mỗi lượt vẽ là ghi/xoá
// một khoá hàng trăm lần một phút, không cần thiết.
let ketQuaThu = null;

/**
 * `true` khi trình duyệt đang CHẶN việc lưu — tức tiến độ sẽ không được giữ.
 * Giao diện phải nói câu đó ra, xem `KhoBiChanBanner`.
 */
export function khoHong() {
  if (ketQuaThu === null) ketQuaThu = !khoDungDuoc();
  return ketQuaThu;
}

/** Chỉ dùng trong phép kiểm: quên kết quả đo để đo lại. */
export function quenKetQuaThu() {
  ketQuaThu = null;
}

/**
 * Đọc một khoá. Trả `mac` khi không có, hoặc khi kho ném.
 * @param {string} khoa
 * @param {string|null} mac giá trị dùng khi không đọc được
 */
export function docKho(khoa, mac = null) {
  try {
    const v = globalThis.localStorage.getItem(khoa);
    return v === null ? mac : v;
  } catch {
    dem.doc += 1;
    return mac;
  }
}

/** Đọc rồi `JSON.parse`. Trả `mac` khi thiếu, khi kho ném, HOẶC khi JSON hỏng. */
export function docJson(khoa, mac = null) {
  const s = docKho(khoa, null);
  if (s === null) return mac;
  try {
    const v = JSON.parse(s);
    return v === null || v === undefined ? mac : v;
  } catch {
    // Dữ liệu hỏng (bị cắt giữa chừng vì hết chỗ, hoặc bản cũ khác định dạng)
    // KHÔNG được làm ném lúc vẽ — trả mặc định và đếm như một lượt đọc hỏng.
    dem.doc += 1;
    return mac;
  }
}

/** Ghi một chuỗi. Trả `false` nếu không ghi được. */
export function ghiKho(khoa, giaTri) {
  try {
    globalThis.localStorage.setItem(khoa, String(giaTri));
    return true;
  } catch {
    dem.ghi += 1;
    return false;
  }
}

/** `JSON.stringify` rồi ghi. Trả `false` nếu không ghi được. */
export function ghiJson(khoa, giaTri) {
  try {
    return ghiKho(khoa, JSON.stringify(giaTri));
  } catch {
    // Vòng lặp trong đối tượng, BigInt… — hiếm, nhưng ném ở đây cũng làm trắng
    // màn hình y như kho ném, nên chặn luôn tại chỗ.
    dem.ghi += 1;
    return false;
  }
}

/** Xoá một khoá. Trả `false` nếu không xoá được. */
export function xoaKho(khoa) {
  try {
    globalThis.localStorage.removeItem(khoa);
    return true;
  } catch {
    dem.xoa += 1;
    return false;
  }
}

// ── VỎ BỌC AN TOÀN CHO NHỮNG HÀM ĐANG NHẬN `localStorage` LÀM THAM SỐ ──────
//
// `mastery.js`, `tinCayXacMinh.js`… nhận cả đối tượng kho rồi tự bọc try/catch
// bên trong. Nhưng ở iOS bật "Chặn tất cả cookie", chỉ riêng việc VIẾT RA cái
// tên `localStorage` tại chỗ gọi đã ném — chưa kịp vào trong hàm. Nên chỗ gọi
// phải đưa cho chúng một vỏ bọc, chứ không phải đối tượng thật.
//
// Giữ nguyên hình dáng (`getItem`/`setItem`/`removeItem`) để không phải sửa
// chữ ký của bất kỳ hàm nào đang dùng.
const VO_BOC = {
  getItem: (k) => docKho(k, null),
  setItem: (k, v) => { ghiKho(k, v); },
  removeItem: (k) => { xoaKho(k); },
};

/** Kho luôn dùng được: mọi thao tác đều nuốt lỗi và ĐẾM, không bao giờ ném. */
export function khoAnToan() {
  return VO_BOC;
}
