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
  return pickNextInBand(allMilestones, completedIds, roadmapLevelFor(recommendedLevelId));
}

// Cùng logic nhưng nhận thẳng id BẬC CỦA LỘ TRÌNH (gạch dưới), không đi qua map
// placement. Cần bản này vì 'foundation' (A0) cố tình KHÔNG có trong
// PLACEMENT_TO_ROADMAP — xem giải thích ở recommendedBandFor bên dưới.
export function pickNextInBand(allMilestones, completedIds, bandId) {
  const list = Array.isArray(allMilestones) ? allMilestones : [];
  const done = new Set(completedIds || []);
  const firstUndone = list.find((m) => !done.has(m.targetId)) || null;

  if (!bandId) return firstUndone;
  const from = ROADMAP_LEVEL_ORDER.indexOf(bandId);
  if (from < 0) return firstUndone;

  const fromLevel = list.find(
    (m) => !done.has(m.targetId) && ROADMAP_LEVEL_ORDER.indexOf(m.levelId) >= from
  );
  return fromLevel || firstUndone;
}

// (4.1) BẬC ĐƯỢC ĐỀ XUẤT, có tính tới người CHƯA QUA VÒNG A1.
//
// Lỗi đã dính: cờ `preA1` chỉ được dùng đúng MỘT LẦN, lúc bấm xong bài test,
// để mở bài A0 đầu tiên. Còn mọi thứ lưu lại vẫn ghi level = 'starter', nên:
//   - "chặng tiếp theo" bỏ qua sạch 12 chặng A0 (foundation ở chỉ số 0, còn
//     starter ở chỉ số 1 → điều kiện `>= from` loại hết),
//   - cụm A0 bị gắn nhãn "Ôn lại" và thu gọn — đúng với người mà nó là đường
//     chính,
//   - tab đang chọn nhảy sang A1.
// Nghĩa là học xong bài A0 đầu tiên là app đẩy người mất gốc sang A1.
//
// Sửa ở đây chứ KHÔNG thêm 'foundation' vào PLACEMENT_TO_ROADMAP: bài test chỉ
// hỏi từ A1 trở lên nên nó không có thẩm quyền khẳng định ai đó "ở bậc A0" —
// nó chỉ biết người đó chưa qua vòng A1. Và khi cụm A0 đã học xong thì hàm này
// tự trả về bậc bình thường, không giam ai lại đó.
export function recommendedBandFor(placementResult, allMilestones, completedIds) {
  const done = new Set(completedIds || []);
  const conA0 = (allMilestones || []).some((m) => m.levelId === 'foundation' && !done.has(m.targetId));
  if (placementResult?.preA1 && conA0) return 'foundation';
  return roadmapLevelFor(placementResult?.level);
}

// (KE_HOACH_B2 việc 1.6) KHOÁ MỀM — CẢNH BÁO, KHÔNG CHẶN.
//
// Lộ trình nay 617 chặng trải 6 bậc. Bấm nhầm vào một chặng C1 khi đang học A2
// thì người học gặp bài không làm nổi, trượt cổng 80%, rồi tưởng mình dốt.
// Nhưng CHẶN CỨNG cũng sai: có người học lại, có người chỉ muốn xem trước, và
// cả chuỗi dọn nội dung vừa rồi dựng trên nguyên tắc "báo, đừng âm thầm".
// Nên: đi trước quá `allowed` bậc thì gắn nhãn cảnh báo, vẫn bấm vào học được.
export function bandDistance(fromLevelId, toLevelId) {
  const a = ROADMAP_LEVEL_ORDER.indexOf(fromLevelId);
  const b = ROADMAP_LEVEL_ORDER.indexOf(toLevelId);
  if (a < 0 || b < 0) return 0;
  return b - a;
}

export function isSkippingAhead(milestoneLevelId, currentLevelId, allowed = 1) {
  if (!milestoneLevelId || !currentLevelId) return false;
  return bandDistance(currentLevelId, milestoneLevelId) > allowed;
}

// Bậc người học ĐANG ở: bậc của chặng "học tiếp". Chưa có chặng nào (xong sạch
// lộ trình, hoặc dữ liệu rỗng) thì trả null — nghĩa là "không rõ", và khi không
// rõ thì KHÔNG cảnh báo ai cả.
export function currentBandOf(nextMilestone) {
  return nextMilestone?.levelId || null;
}

// Cấp độ nằm DƯỚI trình độ đề xuất → hiển thị thu gọn dạng "Ôn lại".
// Vẫn mở được bình thường, không khoá: người học muốn ôn lại nền tảng là
// quyền của họ.
export function isReviewLevel(roadmapLevelId, recommendedLevelId) {
  return isReviewBand(roadmapLevelId, roadmapLevelFor(recommendedLevelId));
}

// Nhận thẳng id bậc lộ trình — dùng cho trường hợp bậc đề xuất là 'foundation',
// bậc không có trong map placement.
export function isReviewBand(roadmapLevelId, bandId) {
  if (!bandId) return false;
  const from = ROADMAP_LEVEL_ORDER.indexOf(bandId);
  const here = ROADMAP_LEVEL_ORDER.indexOf(roadmapLevelId);
  return from >= 0 && here >= 0 && here < from;
}
