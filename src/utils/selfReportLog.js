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

import { docJson, ghiJson, xoaKho } from './kho.js';
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

// ⚠️ `typeof localStorage !== 'undefined'` KHÔNG phải một cái chốt an toàn.
// `localStorage` là thuộc tính CÓ KHAI BÁO của `window`, nên `typeof` vẫn GỌI
// getter của nó — và ở iOS Safari bật "Chặn tất cả cookie" getter đó NÉM, ngay
// tại dòng lẽ ra để phòng thân. Cả họ chốt này đã được thay bằng utils/kho.js,
// nơi mọi lượt chạm nằm gọn trong try. Lý do đầy đủ ở đầu src/utils/kho.js.

function load(kyNang) {
  try {
    const parsed = docJson(khoaCua(kyNang), []);
    if (!Array.isArray(parsed)) return [];
    // Bản ghi CŨ (trước khi tách hai kỹ năng) không có trường `kyNang`. Chúng
    // nằm trong `writingLogV1` nên chắc chắn là bài viết — gán nhãn khi đọc chứ
    // KHÔNG bỏ qua. Bỏ qua là xoá trắng sổ của người đã học từ trước.
    const ds = parsed.map((b) => (b && !b.kyNang ? { ...b, kyNang: 'writing' } : b)).filter(Boolean);
    // (5.4) Bản ghi trước vòng viết-lại không có `banSo`. Gán khi ĐỌC, theo thứ
    // tự thời gian trong từng đề — cùng luật "luật thêm sau phải chạy được trên
    // dữ liệu cũ" đã áp cho trường kyNang ngay trên.
    const dem = new Map();
    return ds.map((b) => {
      const soCu = dem.get(b.promptId) || 0;
      const banSo = b.banSo || soCu + 1;
      dem.set(b.promptId, Math.max(soCu, banSo));
      return b.banSo ? b : { ...b, banSo };
    });
  } catch { return []; }
}

function save(kyNang, list) {
  ghiJson(khoaCua(kyNang), list.slice(-TOI_DA));
}

// `tuDanhGia`: mảng boolean khớp thứ tự checklist của đề — người học tự tick.
// `dungBaiMau`: người học đã mở bài mẫu/bài nói mẫu ra đối chiếu chưa. Ghi lại
// vì đọc bài mẫu TRƯỚC và SAU khi làm là hai việc khác hẳn nhau về giá trị.
export function luuBaiLam({ kyNang = 'writing', promptId, text, tuDanhGia = [], dungBaiMau = false, now = new Date() }) {
  khoaCua(kyNang);
  if (!promptId || !String(text || '').trim()) return null;
  const list = load(kyNang);
  const ban = {
    kyNang,
    promptId,
    text: String(text),
    soTu: String(text).trim().split(/\s+/).filter(Boolean).length,
    tuDanhGia: tuDanhGia.map(Boolean),
    soTieuChiTuThay: tuDanhGia.filter(Boolean).length,
    dungBaiMau: !!dungBaiMau,
    // (5.4) Bản thứ mấy của ĐỀ NÀY — nộp lại sau khi nhận nhận xét là bản 2, 3…
    // Tính từ sổ chứ không nhận từ ngoài vào: con số tự khai thì sớm muộn cũng
    // lệch với sổ thật.
    banSo: list.filter((b) => b.promptId === promptId).length + 1,
    // KHÔNG PHẢI ĐIỂM CHẤM. Cờ này đi theo bản ghi tới mọi nơi đọc nó.
    tuBaoCao: true,
    at: now.toISOString(),
  };
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

// (5.4) Bản MỚI NHẤT của một đề — để màn hình viết mời "viết bản N+1" và đổ
// sẵn bài cũ vào ô soạn khi người học muốn sửa tiếp.
export function banMoiNhat(kyNang, promptId) {
  const ds = baiCuaDe(kyNang, promptId);
  return ds.length ? ds[ds.length - 1] : null;
}

// (5.4) Thống kê vòng viết – sửa – viết lại: bao nhiêu đề đã có từ 2 bản trở
// lên. Chỉ là ĐẾM HOẠT ĐỘNG — không phải thước đo bài có hay lên.
export function thongKeVietLai(kyNang = 'writing') {
  const theoDe = new Map();
  for (const b of load(kyNang)) theoDe.set(b.promptId, (theoDe.get(b.promptId) || 0) + 1);
  const deCoVietLai = [...theoDe.values()].filter((n) => n >= 2).length;
  return { soDe: theoDe.size, deCoVietLai, tuBaoCao: true };
}

// Số liệu để hiển thị trong hồ sơ — CHỈ là đếm hoạt động, không suy ra năng lực.
export function thongKeTuBaoCao(kyNang = 'writing') {
  const list = load(kyNang);
  if (!list.length) return { soBai: 0, soDe: 0, lanCuoi: null, tuBaoCao: true, danhTu: DANH_TU[kyNang] };
  const theoDe = new Map();
  for (const b of list) theoDe.set(b.promptId, (theoDe.get(b.promptId) || 0) + 1);
  return {
    soBai: list.length,
    soDe: theoDe.size,
    // (5.4) Số đề đã đi trọn vòng viết – sửa – viết lại (≥2 bản).
    deCoVietLai: [...theoDe.values()].filter((n) => n >= 2).length,
    lanCuoi: list[list.length - 1].at,
    tuBaoCao: true,
    danhTu: DANH_TU[kyNang],
  };
}

export function xoaSo(kyNang = 'writing') {
  xoaKho(khoaCua(kyNang));
}

export const LOG_KEYS = Object.values(KHOA);
export const WRITING_LOG_KEY = KHOA.writing;
export const SPEAKING_LOG_KEY = KHOA.speaking;
