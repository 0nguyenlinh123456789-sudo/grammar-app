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

const curatedByBand = new Map(roadmapCurated.map((l) => [l.level, l]));

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

  return { ...meta, milestones: [...curatedMs, ...generatedMs] };
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
