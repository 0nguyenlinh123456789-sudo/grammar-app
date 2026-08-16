// File: src/utils/placement.js
// Nhãn trình độ của bài test đầu vào + cách nối bậc CEFR sang id cấp độ.
//
// LEVELS là NGUỒN SỰ THẬT cho danh sách id cấp độ; src/utils/roadmapNav.js đọc
// nó để đối chiếu hai chiều với lộ trình.
//
// Trường `min` (điểm phần trăm tối thiểu) là DI SẢN của bài test cũ: bản cũ suy
// trình độ từ phần trăm đúng. Bài thích ứng (4.1) KHÔNG dùng `min` nữa — trình
// độ lấy từ nấc thang CEFR, vì bài thích ứng luôn hội tụ về quanh 50–60% đúng
// nên phần trăm không phân biệt được B2 với C1. Giữ `min` lại chỉ để đọc được
// kết quả cũ đã lưu trong localStorage.
const LEVELS = [
  { min: 0, id: 'starter', label: 'Starter', next: 'A1–A2' },
  { min: 35, id: 'elementary', label: 'Elementary', next: 'A2–B1' },
  { min: 55, id: 'intermediate', label: 'Intermediate', next: 'B1–B2' },
  { min: 75, id: 'upper-intermediate', label: 'Upper-intermediate', next: 'B2–C1' },
  // (5.2) `next` hiện ra thật: dòng "Tiếp tục chinh phục {next}" ở cuối file.
  // Chữ cũ là 'C1–C2' — hứa vượt cam kết B2 vững + nền C1.
  { min: 90, id: 'advanced', label: 'Advanced', next: 'C1+' },
];

// Bậc CEFR ĐẠT ĐƯỢC → id cấp độ để lộ trình biết đưa người học vào đâu.
// CẠM BẪY đã ghi ở roadmapNav.js: id ở đây dùng gạch NGANG ('upper-intermediate'),
// lộ trình dùng gạch DƯỚI. Đừng "sửa cho đồng bộ" một bên mà quên bên kia.
export const CEFR_TO_PLACEMENT = {
  A1: 'starter',
  A2: 'elementary',
  B1: 'intermediate',
  B2: 'upper-intermediate',
  C1: 'advanced',
};

export const CEFR_LABEL = {
  A1: 'A1 — Sơ cấp',
  A2: 'A2 — Cơ bản',
  B1: 'B1 — Trung cấp',
  B2: 'B2 — Trung cao cấp',
  C1: 'C1 — Cao cấp',
};

export function levelMeta(levelId) {
  return LEVELS.find((item) => item.id === levelId) || LEVELS[0];
}

// Chưa vượt qua nổi vòng A1 (cefr = null) → vẫn đề xuất 'starter' cho lộ trình.
// Cụm A0 KHÔNG nằm trong map này (xem lý do ở roadmapNav.js): bài test chỉ hỏi
// từ A1 trở lên nên nó không có thẩm quyền khẳng định ai đó "dưới A1" — nó chỉ
// biết người đó chưa qua vòng A1. Việc gợi ý cụm A0 do cờ `preA1` đảm nhiệm,
// dạng gợi ý nhìn thấy được, không phải một bậc bị gán âm thầm.
export function placementLevelFor(cefr) {
  return CEFR_TO_PLACEMENT[cefr] || 'starter';
}

const SKILL_LABEL_VI = { grammar: 'ngữ pháp', vocabulary: 'từ vựng', reading: 'đọc hiểu' };

export function recommendationFromPlacement(result) {
  if (!result) return { title: 'Làm bài kiểm tra đầu vào', body: 'Bài thích ứng 12–24 câu, có gắn bậc CEFR cho từng câu, để chọn đúng chặng bắt đầu.', action: 'placement' };
  if (result.preA1) {
    return {
      title: 'Bắt đầu từ cụm “Mất gốc thật” (A0)',
      body: 'Bài test bắt đầu từ bậc A1 và bạn chưa qua vòng đó, nên hãy học bảng chữ cái, cách đọc phiên âm và quy tắc phát âm trước — đó là nền của mọi thứ sau này.',
      action: 'foundation',
    };
  }
  const focus = result.focus?.[0];
  const label = SKILL_LABEL_VI[focus] || focus;
  const levelText = result.cefr ? CEFR_LABEL[result.cefr] || result.cefr : result.levelLabel;
  return focus
    ? { title: `Ưu tiên ${label}`, body: `Bạn đang ở mức ${levelText}. Hãy luyện ${label} trước để tăng điểm nhanh nhất.`, action: focus }
    : { title: `Tiếp tục chinh phục ${result.next}`, body: `Bạn đã đạt mức ${levelText}. Một chặng mới sẽ giúp bạn tiến gần mục tiêu tiếp theo.`, action: 'next' };
}

export { LEVELS };
