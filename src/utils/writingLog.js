// File: src/utils/writingLog.js
// SỔ BÀI VIẾT — lưu bài người học nộp và phần TỰ ĐÁNH GIÁ của chính họ.
//
// LUẬT QUAN TRỌNG NHẤT CỦA FILE NÀY: tự đánh giá KHÔNG PHẢI là điểm chấm.
//
// Hồ sơ năng lực (skillProfile.js) đang ghi kỹ năng Viết là "chưa đo được — chưa
// có ngân hàng đề viết và cách chấm". Việc 3.4 đưa ra "cách chấm dự phòng", nên
// từ đây có một đường rất dễ đi: lấy điểm người học tự chấm cho mình rồi đổ vào
// hồ sơ, thế là ô Viết sáng lên. ĐỪNG. Người học tự chấm bài mình không phải
// một phép đo — nó là dữ liệu về sự tự tin, không phải về năng lực. Biến nó
// thành phần trăm năng lực là đúng cái sai đã tránh khi từ chối ghi 0%.
//
// Nên mọi bản ghi ở đây mang cờ `tuBaoCao: true`, và skillProfile có một trạng
// thái RIÊNG cho nó, không phải `measured`. Có test ghim điều đó.

const KEY = 'writingLogV1';
const TOI_DA = 200;

const coStorage = () => typeof localStorage !== 'undefined';

function load() {
  if (!coStorage()) return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

function save(list) {
  if (!coStorage()) return;
  try { localStorage.setItem(KEY, JSON.stringify(list.slice(-TOI_DA))); } catch { /* ignore */ }
}

// `tuDanhGia`: mảng boolean khớp thứ tự checklist của đề — người học tự tick.
// `dungBaiMau`: người học đã mở bài mẫu ra đối chiếu chưa. Ghi lại vì đọc bài
// mẫu TRƯỚC khi viết và SAU khi viết là hai việc khác hẳn nhau về giá trị.
export function luuBaiViet({ promptId, text, tuDanhGia = [], dungBaiMau = false, now = new Date() }) {
  if (!promptId || !String(text || '').trim()) return null;
  const ban = {
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
  const list = load();
  list.push(ban);
  save(list);
  return ban;
}

export function docSoBaiViet() {
  return load();
}

export function baiVietCuaDe(promptId) {
  return load().filter((b) => b.promptId === promptId);
}

// Số liệu để hiển thị trong hồ sơ — CHỈ là đếm hoạt động, không suy ra năng lực.
export function thongKeTuBaoCao() {
  const list = load();
  if (!list.length) return { soBai: 0, soDe: 0, lanCuoi: null, tuBaoCao: true };
  return {
    soBai: list.length,
    soDe: new Set(list.map((b) => b.promptId)).size,
    lanCuoi: list[list.length - 1].at,
    tuBaoCao: true,
  };
}

export function xoaSoBaiViet() {
  if (coStorage()) { try { localStorage.removeItem(KEY); } catch { /* ignore */ } }
}

export const WRITING_LOG_KEY = KEY;
