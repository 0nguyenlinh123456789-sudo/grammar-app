// File: src/utils/roadmapNav.js
// NỐI KẾT QUẢ TEST ĐẦU VÀO VÀO LỘ TRÌNH (hạng mục #2).
//
// Trước đây bài test đầu vào chỉ hiện một dòng gợi ý rồi thôi: người học làm
// xong, biết mình ở mức B1, nhưng nút "học tiếp" vẫn trỏ vào chặng A1 đầu tiên
// chưa xong. Module này là phần tính toán thuần (không React, có test) để
// WelcomePage và OnboardingWizard cùng dùng một logic.
import { LEVELS } from './placement.js';

// Thứ tự cấp độ CỦA LỘ TRÌNH (src/data/roadmapData.js) — dùng gạch DƯỚI.
// 'foundation' (A0, cụm "Mất gốc thật") thêm 2026-08-14, đứng TRƯỚC starter.
// Bài test đầu vào KHÔNG có bậc nào map sang đây — người làm test dù điểm thấp
// nhất cũng được đề xuất bắt đầu ở 'starter'. Cụm A0 dành cho người tự biết
// mình chưa đọc được phiên âm, và luôn mở sẵn để ai cũng quay lại được.
export const ROADMAP_LEVEL_ORDER = ['foundation', 'starter', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'];

// Map TƯỜNG MINH từ id của placement sang id của lộ trình.
// CẠM BẪY: placement dùng 'upper-intermediate' (gạch NGANG), lộ trình dùng
// 'upper_intermediate' (gạch DƯỚI). Viết tay từng dòng để chỗ lệch này nhìn
// thấy được, không giấu sau một phép replace('-','_').
export const PLACEMENT_TO_ROADMAP = {
  starter: 'starter',
  elementary: 'elementary',
  intermediate: 'intermediate',
  'upper-intermediate': 'upper_intermediate',
  advanced: 'advanced',
};

// Danh sách id của placement, lấy thẳng từ nguồn sự thật. Có test đối chiếu
// hai chiều: thêm cấp độ thứ 6 vào placement.js mà quên map là test đỏ ngay.
export const PLACEMENT_LEVEL_IDS = LEVELS.map((level) => level.id);

// Trả về id cấp độ lộ trình tương ứng, hoặc null nếu chưa làm test đầu vào
// (hoặc id lạ) — null nghĩa là "không có đề xuất", KHÔNG phải "bắt đầu từ đầu".
export function roadmapLevelFor(placementLevelId) {
  return PLACEMENT_TO_ROADMAP[placementLevelId] || null;
}

// Chặng học tiếp theo: chặng CHƯA XONG đầu tiên tính TỪ cấp độ được đề xuất
// TRỞ LÊN. Ba trường hợp biên, cả ba đều có test:
//   1. chưa làm test đầu vào → giữ nguyên hành vi cũ (chặng dở đầu tiên).
//   2. đã xong hết từ cấp độ đề xuất trở lên, nhưng còn chặng dở ở cấp thấp
//      hơn → quay về chặng dở đầu tiên. KHÔNG trả null: null sẽ làm biến mất
//      nút "học tiếp" ở trang chủ.
//   3. xong sạch lộ trình → null (không còn gì để học tiếp).
// `completedIds` so theo `targetId` — đúng như cách trang chủ đang đánh dấu.
export function pickNextMilestone(allMilestones, completedIds, recommendedLevelId) {
  const list = Array.isArray(allMilestones) ? allMilestones : [];
  const done = new Set(completedIds || []);
  const firstUndone = list.find((m) => !done.has(m.targetId)) || null;

  const target = roadmapLevelFor(recommendedLevelId);
  if (!target) return firstUndone;

  const from = ROADMAP_LEVEL_ORDER.indexOf(target);
  if (from < 0) return firstUndone;

  const fromLevel = list.find(
    (m) => !done.has(m.targetId) && ROADMAP_LEVEL_ORDER.indexOf(m.levelId) >= from
  );
  return fromLevel || firstUndone;
}

// Cấp độ nằm DƯỚI trình độ đề xuất → hiển thị thu gọn dạng "Ôn lại".
// Vẫn mở được bình thường, không khoá: người học muốn ôn lại nền tảng là
// quyền của họ.
export function isReviewLevel(roadmapLevelId, recommendedLevelId) {
  const target = roadmapLevelFor(recommendedLevelId);
  if (!target) return false;
  const from = ROADMAP_LEVEL_ORDER.indexOf(target);
  const here = ROADMAP_LEVEL_ORDER.indexOf(roadmapLevelId);
  return from >= 0 && here >= 0 && here < from;
}
