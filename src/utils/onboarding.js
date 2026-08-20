// File: src/utils/onboarding.js
// First-run state for the onboarding wizard, kept outside the component so
// App can check it without importing component code (react-refresh rule).
//
// MỤC TIÊU HỌC KHÔNG CÒN Ở ĐÂY NỮA. Nó chuyển sang `utils/mucTieuHoc.js` vì
// nó thôi là "một ô trong trình hướng dẫn" và trở thành thứ lộ trình đọc thật:
// có kiểm giá trị hợp lệ, có đường đổi lại, có phép đếm. `getLearningGoal` giữ
// nguyên tên và uỷ quyền xuống đó — hai chỗ tự đọc localStorage theo hai luật
// khác nhau là cách chắc chắn nhất để một chỗ tin và một chỗ không.
import { docMucTieu, luuMucTieu } from './mucTieuHoc';

const DONE_KEY = 'onboardingDoneV1';

export function needsOnboarding() {
  try { return !localStorage.getItem(DONE_KEY); } catch { return false; }
}

export function markOnboardingDone(goal) {
  try {
    localStorage.setItem(DONE_KEY, new Date().toISOString());
  } catch { /* private mode — wizard simply shows again next time */ }
  if (goal) luuMucTieu(goal);
}

export function getLearningGoal() {
  return docMucTieu();
}
