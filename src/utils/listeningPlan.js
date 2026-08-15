// File: src/utils/listeningPlan.js
// GHÉP KHO BẢN THU VÀO BẬC CỦA NGƯỜI HỌC (việc 2.1, phần còn lại) — có test.
//
// NÓI RÕ TRƯỚC ĐIỀU NÀY, VÌ NÓ QUYẾT ĐỊNH CÁCH GỌI TÊN MỌI THỨ Ở ĐÂY:
// đây là phân nhóm theo ĐỘ DÀI CÂU, KHÔNG phải đo bậc CEFR. Kho bản thu là câu
// rời của Tatoeba, không ai gắn bậc cho chúng, và tôi không có căn cứ nào để
// gắn. Câu dài hơn thì khó nghe hơn — đó là toàn bộ nội dung của phép phân
// nhóm này, không hơn.
//
// Vì thế giao diện gọi là "câu ngắn / câu vừa / câu dài", KHÔNG gọi là
// "bài nghe A2 / B1 / B2". Gắn nhãn bậc cho thứ chưa được đo là đúng loại
// tuyên bố mà cả chuỗi dọn nội dung dựng lên để chặn.
export const NHOM_DO_DAI = [
  { id: 'ngan', label: 'Câu ngắn', moTa: '4–6 từ', min: 0, max: 6 },
  { id: 'vua', label: 'Câu vừa', moTa: '7–9 từ', min: 7, max: 9 },
  { id: 'dai', label: 'Câu dài', moTa: 'từ 10 từ trở lên', min: 10, max: Infinity },
];

// Bậc lộ trình → nhóm độ dài BẮT ĐẦU. Người học vẫn đổi nhóm được bằng tay:
// đây là gợi ý điểm xuất phát, không phải khoá.
const BAC_SANG_NHOM = {
  foundation: 'ngan',
  starter: 'ngan',
  elementary: 'vua',
  intermediate: 'vua',
  upper_intermediate: 'dai',
  advanced: 'dai',
};

const demTu = (e) => Number(e?.words) || String(e?.text || '').trim().split(/\s+/).filter(Boolean).length;

export function nhomCuaCau(entry) {
  const n = demTu(entry);
  return (NHOM_DO_DAI.find((g) => n >= g.min && n <= g.max) || NHOM_DO_DAI[NHOM_DO_DAI.length - 1]).id;
}

export function nhomChoBac(bandId) {
  return BAC_SANG_NHOM[bandId] || 'vua';
}

export function thongKeKho(manifest) {
  const dem = Object.fromEntries(NHOM_DO_DAI.map((g) => [g.id, 0]));
  for (const e of manifest || []) dem[nhomCuaCau(e)] += 1;
  return dem;
}

// Bốc một bộ câu cho buổi luyện. Ưu tiên đúng nhóm; nhóm mỏng thì MƯỢN nhóm
// bên cạnh chứ không trả về bộ thiếu — thà câu hơi dễ/hơi khó còn hơn buổi học
// chỉ có 2 câu. Nhưng có bao nhiêu thì trả bấy nhiêu, KHÔNG lặp lại câu để cho
// đủ số: nghe lại đúng câu vừa chép là bài tập giả.
export function chonBoCau(manifest, nhomId, size = 5, rand = Math.random) {
  const kho = (manifest || []).filter((e) => e && e.file && e.text);
  if (!kho.length) return [];

  const thuTu = NHOM_DO_DAI.map((g) => g.id);
  const goc = Math.max(0, thuTu.indexOf(nhomId));
  // Xếp các nhóm theo khoảng cách tới nhóm mong muốn: đúng nhóm trước, rồi
  // nhóm liền kề, rồi xa dần.
  const uuTien = [...thuTu].sort((a, b) => Math.abs(thuTu.indexOf(a) - goc) - Math.abs(thuTu.indexOf(b) - goc));

  const ra = [];
  for (const g of uuTien) {
    if (ra.length >= size) break;
    const nhom = xaoTron(kho.filter((e) => nhomCuaCau(e) === g), rand);
    ra.push(...nhom.slice(0, size - ra.length));
  }
  return ra;
}

export function xaoTron(list, rand = Math.random) {
  const out = [...(list || [])];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
