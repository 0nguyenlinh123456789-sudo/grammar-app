// File: src/utils/nenAnh.js
//
// NÉN ẢNH NGAY TRÊN MÁY NGƯỜI HỌC TRƯỚC KHI GỬI ĐI QUÉT.
//
// ══ VÌ SAO CÓ FILE NÀY ══
// Chủ dự án báo 31/08: "không tải hình ảnh lên quét ai được với dung lượng ảnh
// bị hạn chế". Đúng — và chỗ hỏng không phải là trần quá thấp, mà là ỨNG XỬ khi
// chạm trần: `ScannerPage` cũ ĐO tệp rồi TỪ CHỐI thẳng ở 4 MB.
//
// Ảnh chụp bằng điện thoại đời nay thường 4–12 MB. Nghĩa là hành vi tự nhiên
// nhất — mở máy, chụp trang sách, quét — gần như luôn rơi vào nhánh từ chối, và
// câu app đưa ra ("Vui lòng chọn ảnh nhỏ hơn 4 MB") yêu cầu người học tự đi nén
// ảnh bằng một công cụ khác. Không ai làm việc đó. Tính năng coi như không có.
//
// ══ VÌ SAO KHÔNG NỚI TRẦN MÁY CHỦ ══
// Có ba cửa chặn, cố tình chồng nhau:
//   · `ScannerPage`                4 MB  (cửa này là thứ được thay)
//   · `functions/api/ai.js`        MAX_IMAGE_BYTES 4 MB + trần độ dài base64
//   · `src/server/routes/ai.js`    TRAN_BYTE 6 MB theo content-length
// Hai cửa sau là chốt chặn thật của máy chủ: chúng chặn cả yêu cầu KHÔNG đi qua
// giao diện. Nới chúng ra để "cho ảnh to lọt" là bỏ chốt. Nên trần giữ nguyên,
// còn ảnh thì được thu nhỏ xuống dưới trần trước khi rời khỏi máy người học.
//
// ══ HAI BẪY ĐÃ TÍNH TRƯỚC ══
//  1. NỀN ĐEN. Canvas mặc định trong suốt; JPEG không có kênh trong suốt, nên
//     ảnh PNG nền trong (ảnh chụp màn hình, ảnh cắt nền) khi đổi sang JPEG sẽ ra
//     NỀN ĐEN và chữ đen biến mất — AI đọc được đúng một tấm ảnh tối. Phải tô
//     trắng trước khi vẽ.
//  2. ĐOÁN ĐỊNH DẠNG THEO `file.type`. Bản cũ chặn theo danh sách MIME, nên ảnh
//     HEIC của iPhone bị loại TRƯỚC KHI thử giải mã. Ở đây làm ngược lại: cứ thử
//     giải mã, giải được thì dùng. Safari giải được HEIC; Chrome/Android thì
//     không, nhưng máy Android vốn chụp ra JPEG nên không mất gì.
//
// Sau khi vẽ lại, thứ gửi đi LUÔN LUÔN là `image/jpeg` — nằm sẵn trong danh sách
// MIME mà `functions/api/ai.js` chấp nhận, nên máy chủ không phải đổi gì.

/** Cạnh dài nhất sau khi thu nhỏ. 1600px đủ để AI đọc chữ in trong ảnh chụp trang sách. */
export const CANH_DAI_NHAT = 1600;

/** Đích cần xuống dưới: 3 MB, chừa khoảng an toàn so với trần 4 MB của máy chủ. */
export const TRAN_BYTE_GUI = 3 * 1024 * 1024;

/** Thử lần lượt từ nét nhất xuống. Hầu hết ảnh dừng ngay ở nấc đầu. */
export const CAC_MUC_CHAT_LUONG = [0.85, 0.72, 0.6, 0.45];

/** Số lần được phép thu nhỏ thêm nếu đã hạ hết chất lượng mà vẫn quá nặng. */
export const SO_LAN_THU_NHO_THEM = 3;

/**
 * Kích thước sau khi thu nhỏ theo cạnh dài nhất, giữ nguyên tỉ lệ.
 * Ảnh vốn đã nhỏ thì giữ nguyên — phóng to lên không thêm thông tin, chỉ thêm byte.
 */
export function kichThuocMoi(rong, cao, canhDai = CANH_DAI_NHAT) {
  const w = Number(rong);
  const h = Number(cao);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null;
  const lon = Math.max(w, h);
  if (lon <= canhDai) return { rong: Math.round(w), cao: Math.round(h), daThuNho: false };
  const ti = canhDai / lon;
  return {
    rong: Math.max(1, Math.round(w * ti)),
    cao: Math.max(1, Math.round(h * ti)),
    daThuNho: true,
  };
}

/**
 * Số byte thật của một chuỗi base64 (không kể tiền tố `data:`).
 * Dùng để tự kiểm trước khi gửi, bằng ĐÚNG phép tính mà máy chủ dùng để chặn.
 */
export function soByteTuBase64(base64) {
  const s = String(base64 || '');
  if (!s) return 0;
  const dem = s.endsWith('==') ? 2 : s.endsWith('=') ? 1 : 0;
  return Math.max(0, (s.length * 3) / 4 - dem);
}

/** Tách phần base64 khỏi chuỗi data URL. Trả về '' nếu không phải data URL. */
export function tachBase64(dataUrl) {
  const s = String(dataUrl || '');
  const dau = s.indexOf(',');
  if (!s.startsWith('data:') || dau < 0) return '';
  return s.slice(dau + 1);
}

/** Tệp có phải thứ đáng thử giải mã không. SVG bị loại: nó là tài liệu chạy được, không phải ảnh điểm ảnh. */
export function dangThuGiaiMa(file) {
  const loai = String(file?.type || '').toLowerCase();
  if (loai === 'image/svg+xml') return false;
  // Không có `type` vẫn thử: một số máy Android trả về chuỗi rỗng cho ảnh chụp.
  return loai === '' || loai.startsWith('image/');
}

/** Đọc kích thước ảnh từ một Blob, ưu tiên `createImageBitmap` rồi lui về thẻ <img>. */
async function giaiMaAnh(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file);
    } catch { /* trình duyệt không giải mã được định dạng này -> thử cách dưới */ }
  }
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('khong-giai-ma-duoc'));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

function veRaDataUrl(anh, rong, cao, chatLuong) {
  const canvas = document.createElement('canvas');
  canvas.width = rong;
  canvas.height = cao;
  const ctx = canvas.getContext('2d');
  // Bẫy số 1: tô trắng trước, nếu không ảnh PNG nền trong sẽ ra nền đen.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, rong, cao);
  ctx.drawImage(anh, 0, 0, rong, cao);
  return canvas.toDataURL('image/jpeg', chatLuong);
}

/**
 * Nén một tệp ảnh xuống dưới `tran` byte.
 *
 * Trả về `{ base64, mimeType, dataUrl, byteTruoc, byteSau, rong, cao, daNen }`.
 * Ném `Error('khong-giai-ma-duoc')` nếu trình duyệt không đọc nổi tệp, và
 * `Error('van-qua-nang')` nếu hạ hết mức mà vẫn không xuống dưới trần.
 */
export async function nenAnh(file, { canhDai = CANH_DAI_NHAT, tran = TRAN_BYTE_GUI } = {}) {
  if (!dangThuGiaiMa(file)) throw new Error('khong-giai-ma-duoc');

  const anh = await giaiMaAnh(file);
  const rongGoc = anh.width || anh.naturalWidth;
  const caoGoc = anh.height || anh.naturalHeight;
  const kt = kichThuocMoi(rongGoc, caoGoc, canhDai);
  if (!kt) throw new Error('khong-giai-ma-duoc');

  let { rong, cao } = kt;
  try {
    for (let lan = 0; lan <= SO_LAN_THU_NHO_THEM; lan += 1) {
      for (const chatLuong of CAC_MUC_CHAT_LUONG) {
        const dataUrl = veRaDataUrl(anh, rong, cao, chatLuong);
        const base64 = tachBase64(dataUrl);
        const byteSau = soByteTuBase64(base64);
        if (byteSau > 0 && byteSau <= tran) {
          return {
            base64,
            mimeType: 'image/jpeg',
            dataUrl,
            byteTruoc: file.size || 0,
            byteSau,
            rong,
            cao,
            daNen: byteSau < (file.size || 0) || kt.daThuNho,
          };
        }
      }
      // Hạ hết chất lượng vẫn nặng: thu nhỏ thêm rồi thử lại.
      rong = Math.max(1, Math.round(rong * 0.75));
      cao = Math.max(1, Math.round(cao * 0.75));
    }
  } finally {
    anh.close?.();
  }
  throw new Error('van-qua-nang');
}

/** Đổi số byte thành chữ đọc được cho người học ("3,2 MB"). */
export function chuDungLuong(byte) {
  const n = Number(byte) || 0;
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
  if (n >= 1024) return `${Math.round(n / 1024)} KB`;
  return `${n} B`;
}
