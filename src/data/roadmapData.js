// File: src/data/roadmapData.js
// LỘ TRÌNH = 44 CHẶNG SOẠN TAY + PHẦN MÁY XẾP CHO NỘI DUNG CHƯA AI XẾP.
//
// Trước 2026-08-14 file này là 44 chặng viết tay, và đo được nó chỉ dẫn người
// học qua 9% kho từ vựng, 24% ngữ pháp và 0/260 unit Oxford — tức là 2/3 khối
// lượng nội dung đã có nằm ngoài mọi đường đi có hướng dẫn.
//
// Cách ghép (KE_HOACH_B2.md việc 1.2 · 1.3 · 1.4 · 1.5):
//   - `roadmapCurated.js` — 44 chặng viết tay, KHÔNG BAO GIỜ bị máy ghi đè.
//   - `roadmapGenerated.js` — do `scripts/build_roadmap.mjs` sinh, chỉ chứa
//     phần chưa ai xếp; gặp targetId đã có bản viết tay là nhường.
//   - File này ghép hai nguồn, bản viết tay luôn đứng TRƯỚC trong mỗi bậc.
//
// Thêm bậc `foundation` (A0) đứng đầu cho cụm "Mất gốc thật". Năm id bậc cũ
// GIỮ NGUYÊN để không ai mất tiến độ và để roadmapNav/placement không phải
// viết lại.
import { roadmapCurated, additionalVocabTopics } from './roadmapCurated.js';
import { roadmapGenerated, curatedMinutes } from './roadmapGenerated.js';

export { additionalVocabTopics };

export const ROADMAP_BANDS = ['foundation', 'starter', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'];
export const CEFR_OF_BAND = {
  foundation: 'A0', starter: 'A1', elementary: 'A2',
  intermediate: 'B1', upper_intermediate: 'B2', advanced: 'C1',
};

// (5.2) ĐÍCH CAM KẾT. Ghi ở đây vì đây là nơi định nghĩa các bậc — cam kết của
// sản phẩm là **B2 vững, có nhánh C1 dự bị**, KHÔNG hứa C2 (KE_HOACH_B2.md).
// `tests/c1_branch.test.js` đọc hằng số này và bắt lỗi mọi chuỗi hiện ra cho
// người học mà hứa vượt quá nó.
export const BAC_CAM_KET = 'upper_intermediate';
export const BAC_DU_BI = 'advanced';
export const LA_DU_BI = (band) => band === BAC_DU_BI;

// Nhãn ngắn cho dàn tab lộ trình. Trước đây viết cứng trong WelcomePage nên
// thêm bậc là phải sửa hai chỗ và số đếm thì lệch.
//
// (5.2) Nhãn CEFR trong tab và trong `levelTitle` của roadmapCurated từng là
// HAI bản chép tay: tab ghi 'C1 Cao Cấp', levelTitle ghi 'Advanced - C1/C2'.
// Hai bản thì lệch — nên phần chữ CEFR giờ tính từ `CEFR_OF_BAND`, chỉ còn
// phần tên gọi là viết tay.
const BAND_TEN = {
  foundation: '⬜ %s Mất Gốc',
  starter: '🌱 %s Khởi Đầu',
  elementary: '🌿 %s Sơ Cấp',
  intermediate: '⭐ %s Trung Cấp',
  upper_intermediate: '🌟 %s Trung Cao — đích cam kết',
  advanced: '🏆 %s Dự Bị',
};
export const BAND_TAB_LABEL = Object.fromEntries(
  ROADMAP_BANDS.map((b) => [b, BAND_TEN[b].replace('%s', CEFR_OF_BAND[b])])
);

// Bậc A0 chưa từng tồn tại nên phải tự khai. Năm bậc còn lại lấy nguyên phần
// mô tả người soạn đã viết trong roadmapCurated.
const FOUNDATION_META = {
  level: 'foundation',
  levelTitle: '⬜ Mất Gốc (A0)',
  levelDesc: 'Bảng chữ cái, cách phát âm, và cách đọc ký hiệu phiên âm IPA. Học xong cụm này mới dùng được phần còn lại của ứng dụng — vì mọi mục từ đều kèm IPA.',
  icon: '⬜',
  color: 'border-lime-400 bg-lime-50 dark:bg-lime-900/20 text-lime-900 dark:text-lime-100',
  badgeColor: 'bg-lime-500 text-white',
  shadowColor: 'shadow-lime-300',
  targetAudience: ['🌱 Chưa biết gì về tiếng Anh', '🔤 Chưa đọc được phiên âm'],
  skills: ['Đọc được bảng chữ cái', 'Đọc được phiên âm IPA', 'Phát âm đúng âm cuối', 'Đặt đúng trọng âm'],
};

// XP theo KHỐI LƯỢNG THẬT của chặng, không phải con số bốc: ~5 XP cho mỗi 6
// phút học, chặn trong khoảng 10–60 để không có chặng nào thưởng quá đà.
const xpFromMinutes = (minutes) => Math.max(10, Math.min(60, Math.round((minutes || 0) / 6) * 5));

// ══ TRÌNH TỰ SƯ PHẠM CỦA CÁC CHẶNG NGỮ PHÁP ═══════════════════════════════
//
// Chặng soạn tay LUÔN đứng trước chặng máy sinh (`[...curatedMs, ...generatedMs]`)
// — đúng cho mọi loại chặng khác, nhưng SAI cho ngữ pháp, vì ngữ pháp có thứ
// tự bắt buộc. Hậu quả đo được ở bậc A1: "Hiện Tại Đơn" và "Hiện Tại Tiếp
// Diễn" (soạn tay) đứng ở chặng 2–3, còn "Động Từ TO BE" đứng ở chặng 12 —
// tức là người học gặp "I am watching TV" trước khi biết "am" là gì.
//
// Bảng dưới xếp lại ĐÚNG NHỮNG CHẶNG NGỮ PHÁP với nhau. Nó KHÔNG đụng vào
// vị trí của chúng trong danh sách: bộ xen kẽ (`build_roadmap.mjs`) đã rải
// ngữ pháp đều giữa các chặng từ vựng, và phép này chỉ đổi CÁI GÌ đứng ở mỗi
// chỗ đã rải, không đổi CHỖ. Chặng không có tên trong bảng giữ nguyên thứ tự
// tương đối như cũ.
const THU_TU_NGU_PHAP = [
  // ── A1: đi từ chỗ đặt được câu đầu tiên ─────────────────────────────────
  'a1_be',    // TO BE — trước tất cả, vì mọi bài sau đều dùng nó
  'b1_20',    // Đại từ & Sở hữu — có chủ ngữ mới có câu
  'a1_this',  // this / that
  'a1_plural',// số nhiều — cần trước mạo từ và There are
  'b1_08',    // Mạo từ a/an/the
  'b1_01',    // Hiện Tại Đơn
  'b1_17',    // There is / There are
  'b1_12',    // Giới từ nơi chốn
  'b1_23',    // Câu hỏi Wh-
  'b1_21',    // Have got
  'b1_02',    // Hiện Tại Tiếp Diễn
  'b1_19',    // Mệnh lệnh & cảm thán
  // ── A2 ──────────────────────────────────────────────────────────────────
  'b1_03', 'b1_04', 'b1_05', 'b1_07', 'b1_09', 'b1_10', 'b1_11',
  'b1_13', 'b1_14', 'b1_15', 'b1_16', 'b1_18', 'b1_22', 'b1_24', 'b1_25', 'b1_26',
  // ── B1 ──────────────────────────────────────────────────────────────────
  'b1_06', 'b2_01', 'b2_02', 'b1_27', 'b1_28',
  'b2_03', 'b2_04', 'b2_05', 'b2_06', 'b2_08', 'b2_09',
];
const HANG_NGU_PHAP = new Map(THU_TU_NGU_PHAP.map((id, i) => [id, i]));

/**
 * Xếp lại các chặng NGỮ PHÁP theo trình tự sư phạm, giữ nguyên vị trí của
 * chúng trong danh sách. Mọi loại chặng khác không bị đụng tới.
 */
function xepLaiNguPhap(ds) {
  const viTri = [];
  const chang = [];
  ds.forEach((m, i) => { if (m.type === "grammar") { viTri.push(i); chang.push(m); } });
  if (chang.length < 2) return ds;
  const hang = (m) => (HANG_NGU_PHAP.has(String(m.targetId)) ? HANG_NGU_PHAP.get(String(m.targetId)) : Number.MAX_SAFE_INTEGER);
  // Sắp xếp ỔN ĐỊNH: chặng không có tên trong bảng giữ nguyên thứ tự cũ với nhau.
  const daXep = chang
    .map((m, i) => ({ m, i }))
    .sort((a, b) => hang(a.m) - hang(b.m) || a.i - b.i)
    .map((x) => x.m);
  const ra = [...ds];
  viTri.forEach((v, i) => { ra[v] = daXep[i]; });
  return ra;
}

const curatedByBand = new Map(roadmapCurated.map((l) => [l.level, l]));

// ══ SỐ CHẶNG CỦA MỘT BẬC, TÁCH THEO LOẠI ══════════════════════════════════
//
// Một lộ trình in ra "~138 giờ" mà không nói ra phần lớn trong đó là học từ
// thì người đọc hiểu thành "138 giờ học tiếng Anh toàn diện". Ứng dụng này đã
// gỡ chữ "4 kỹ năng" ở khắp nơi vì đúng lý do đó; đây là bước tiếp.
//
// ⚠️ VÌ SAO ĐẾM CHẶNG CHỨ KHÔNG CHIA GIỜ.
// Bản đầu của phép này chia SỐ GIỜ theo kỹ năng và ra "A1: nghe 0h". Sai, và
// sai theo hướng nói xấu chính kho của mình: mỗi chủ đề từ vựng có BẢY chế độ
// học, trong đó có "Nghe – Chọn Nghĩa" và "Luyện Nói". Chia giờ theo LOẠI
// CHẶNG thì toàn bộ phần nghe và nói nằm trong 71 chủ đề từ vựng của bậc A1 bị
// đếm thành 0.
//
// Mà chia cho đúng thì cũng không làm được: ước lượng giờ giả định người học đi
// 4 trong 7 chế độ (`MODES_PER_WORD = 4`), và KHÔNG AI BIẾT là 4 chế độ nào.
// Một tỉ lệ bịa ra còn tệ hơn không có tỉ lệ.
//
// Nên ở đây đếm thứ ĐẾM ĐƯỢC — số chặng theo loại — và giao diện nói thêm một
// câu về bảy chế độ. Cả hai đều kiểm lại được.
const NHOM_KY_NANG = {
  grammar: 'nguPhap',
  vstep: 'tuVung',
  oxford: 'tuVung',
  listening: 'nghe',
  dictation: 'nghe',
  reading: 'doc',
};

export function bandChangTheoLoai(band) {
  const ds = [
    ...(roadmapCurated.find((l) => l.level === band)?.milestones || []),
    ...(roadmapGenerated[band] || []),
  ];
  const ra = { nguPhap: 0, tuVung: 0, nghe: 0, doc: 0, khac: 0 };
  for (const m of ds) ra[NHOM_KY_NANG[m.type] || 'khac'] += 1;
  return ra;
}

export const roadmapData = ROADMAP_BANDS.map((band) => {
  const curated = curatedByBand.get(band);
  const meta = curated
    ? { ...curated, milestones: undefined }
    : FOUNDATION_META;

  const curatedMs = (curated?.milestones || []).map((m) => ({
    ...m,
    cefr: m.cefr || CEFR_OF_BAND[band],
    minutes: curatedMinutes[m.targetId] ?? 0,
    curated: true,
  }));

  const generatedMs = (roadmapGenerated[band] || []).map((m) => ({
    ...m,
    // id phải duy nhất trên toàn lộ trình: giao diện dùng nó làm khoá React và
    // để biết chặng nào đang là "Học Tiếp". Tiến độ thì khoá theo targetId nên
    // đổi id không làm ai mất gì.
    id: `gen-${m.type}-${m.targetId}`,
    xp: xpFromMinutes(m.minutes),
    exam: [],
    kids: false,
    curated: false,
  }));

  return { ...meta, milestones: xepLaiNguPhap([...curatedMs, ...generatedMs]) };
});

// ---- Số giờ: tính từ dữ liệu, không phải chữ viết tay ------------------------
export function bandMinutes(band) {
  const lv = roadmapData.find((l) => l.level === band);
  return (lv?.milestones || []).reduce((s, m) => s + (m.minutes || 0), 0);
}

export function roadmapTotalMinutes() {
  return roadmapData.reduce((s, l) => s + l.milestones.reduce((x, m) => x + (m.minutes || 0), 0), 0);
}

// Tổng giờ từ đầu lộ trình đến HẾT một bậc — dùng để nói với người học "để đạt
// B2 bạn cần khoảng N giờ", bằng số đo chứ không bằng ước đoán.
export function minutesThroughBand(band) {
  const stop = ROADMAP_BANDS.indexOf(band);
  if (stop < 0) return 0;
  return ROADMAP_BANDS.slice(0, stop + 1).reduce((s, b) => s + bandMinutes(b), 0);
}
