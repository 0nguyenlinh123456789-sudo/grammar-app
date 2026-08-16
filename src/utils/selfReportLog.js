// File: src/utils/selfReportLog.js
// SỔ TỰ ĐÁNH GIÁ — dùng chung cho kỹ năng VIẾT (việc 3.4) và NÓI (việc 3.5).
//
// LUẬT QUAN TRỌNG NHẤT CỦA FILE NÀY: tự đánh giá KHÔNG PHẢI là điểm chấm.
//
// Hồ sơ năng lực (skillProfile.js) ghi Viết và Nói là "chưa đo được". Việc
// 3.4/3.5 đưa ra "cách chấm dự phòng", nên từ đây có một đường rất dễ đi: lấy
// điểm người học tự chấm cho mình rồi đổ vào hồ sơ, thế là hai ô đó sáng lên.
// ĐỪNG. Người học tự chấm bài mình không phải một phép đo — nó là dữ liệu về sự
// TỰ TIN, không phải về NĂNG LỰC. Biến nó thành phần trăm năng lực là đúng cái
// sai đã tránh khi từ chối ghi 0%.
//
// Nên mọi bản ghi ở đây mang cờ `tuBaoCao: true`, và skillProfile có một trạng
// thái RIÊNG cho nó, không phải `measured`. Có test ghim điều đó.
//
// ══ VÌ SAO MỘT FILE CHO CẢ HAI KỸ NĂNG ══
// Sổ nói và sổ viết có cùng hình dạng và cùng lời hứa. Chép thành hai file là
// đúng cái bẫy đã trả giá ba lần trong chuỗi này: `.{1,20}` với `.{1,25}` ở
// bản chép lời VOA, hai hằng `BITRATE = 64_000`, và danh sách loại trừ VOA nằm
// trong một dòng chú thích. MỘT LUẬT CHÉP VÀO HAI CHỖ THÌ SỚM MUỘN CŨNG LỆCH.
// Nên: một module, kỹ năng là THAM SỐ, và mỗi kỹ năng một khoá lưu riêng.

export const KY_NANG = { viet: 'writing', noi: 'speaking' };

const KHOA = {
  writing: 'writingLogV1',
  speaking: 'speakingLogV1',
};

// Danh từ riêng cho từng kỹ năng — dùng ở nhãn hiển thị. Không có nó thì ô "Nói"
// hiện ra "Đã tự đánh giá 5 bài viết", tức là nói sai với người học.
export const DANH_TU = { writing: 'bài viết', speaking: 'lượt nói' };

const TOI_DA = 200;

function khoaCua(kyNang) {
  const k = KHOA[kyNang];
  if (!k) throw new Error(`kỹ năng không rõ: ${kyNang}`);
  return k;
}

const coStorage = () => typeof localStorage !== 'undefined';

function load(kyNang) {
  if (!coStorage()) return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(khoaCua(kyNang)) || '[]');
    if (!Array.isArray(parsed)) return [];
    // Bản ghi CŨ (trước khi tách hai kỹ năng) không có trường `kyNang`. Chúng
    // nằm trong `writingLogV1` nên chắc chắn là bài viết — gán nhãn khi đọc chứ
    // KHÔNG bỏ qua. Bỏ qua là xoá trắng sổ của người đã học từ trước.
    return parsed.map((b) => (b && !b.kyNang ? { ...b, kyNang: 'writing' } : b)).filter(Boolean);
  } catch { return []; }
}

function save(kyNang, list) {
  if (!coStorage()) return;
  try { localStorage.setItem(khoaCua(kyNang), JSON.stringify(list.slice(-TOI_DA))); } catch { /* ignore */ }
}

// `tuDanhGia`: mảng boolean khớp thứ tự checklist của đề — người học tự tick.
// `dungBaiMau`: người học đã mở bài mẫu/bài nói mẫu ra đối chiếu chưa. Ghi lại
// vì đọc bài mẫu TRƯỚC và SAU khi làm là hai việc khác hẳn nhau về giá trị.
export function luuBaiLam({ kyNang = 'writing', promptId, text, tuDanhGia = [], dungBaiMau = false, now = new Date() }) {
  khoaCua(kyNang);
  if (!promptId || !String(text || '').trim()) return null;
  const ban = {
    kyNang,
    promptId,
    text: String(text),
    soTu: String(text).trim().split(/\s+/).filter(Boolean).length,
    tuDanhGia: tuDanhGia.map(Boolean),
    soTieuChiTuThay: tuDanhGia.filter(Boolean).length,
    dungBaiMau: !!dungBaiMau,
    // KHÔNG PHẢI ĐIỂM CHẤM. Cờ này đi theo bản ghi tới mọi nơi đọc nó.
    tuBaoCao: true,
    at: now.toISOString(),
  };
  const list = load(kyNang);
  list.push(ban);
  save(kyNang, list);
  return ban;
}

export function docSo(kyNang = 'writing') {
  return load(kyNang);
}

export function baiCuaDe(kyNang, promptId) {
  return load(kyNang).filter((b) => b.promptId === promptId);
}

// Số liệu để hiển thị trong hồ sơ — CHỈ là đếm hoạt động, không suy ra năng lực.
export function thongKeTuBaoCao(kyNang = 'writing') {
  const list = load(kyNang);
  if (!list.length) return { soBai: 0, soDe: 0, lanCuoi: null, tuBaoCao: true, danhTu: DANH_TU[kyNang] };
  return {
    soBai: list.length,
    soDe: new Set(list.map((b) => b.promptId)).size,
    lanCuoi: list[list.length - 1].at,
    tuBaoCao: true,
    danhTu: DANH_TU[kyNang],
  };
}

export function xoaSo(kyNang = 'writing') {
  if (coStorage()) { try { localStorage.removeItem(khoaCua(kyNang)); } catch { /* ignore */ } }
}

export const LOG_KEYS = Object.values(KHOA);
export const WRITING_LOG_KEY = KHOA.writing;
export const SPEAKING_LOG_KEY = KHOA.speaking;
