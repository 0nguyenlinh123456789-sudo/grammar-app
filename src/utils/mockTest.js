// File: src/utils/mockTest.js
// Chấm điểm đề thi thử + quy đổi sang thang VSTEP (/10) hoặc IELTS band.
// Hàm chấm là hàm thuần (không đụng localStorage) để test được bằng node.

const HISTORY_KEY = 'mockTestHistoryV1';
const MAX_HISTORY = 20;

// Quy đổi % đúng → điểm VSTEP (thang 10) và bậc năng lực.
// Mốc bậc theo quy chế VSTEP: 4.0–5.5 = B1, 6.0–8.0 = B2, 8.5+ = C1.
export function toVstepScore(percent) {
  const score = Math.round((percent / 10) * 2) / 2; // làm tròn tới 0.5
  const level = score >= 8.5 ? 'C1' : score >= 6 ? 'B2' : score >= 4 ? 'B1' : 'A2';
  return { score, level };
}

// Quy đổi % đúng → IELTS band (0.5 steps, giới hạn 4.0–8.0 cho đề mini).
export function toIeltsBand(percent) {
  const raw = 4 + (percent / 100) * 4.5;
  const band = Math.min(8, Math.max(4, Math.round(raw * 2) / 2));
  const level = band >= 7.5 ? 'C1' : band >= 6.5 ? 'B2+' : band >= 5.5 ? 'B2' : 'B1';
  return { band, level };
}

// Chấm một lượt làm bài. `answers` = { [questionId]: optionIndex }.
// Trả về tổng quan + thống kê từng phần + danh sách câu sai (để ôn lại).
export function scoreMockTest(test, answers = {}) {
  const questions = test?.questions || [];
  const sections = {};
  const wrong = [];
  let correct = 0;

  for (const question of questions) {
    const section = question.section || 'general';
    sections[section] ||= { correct: 0, total: 0 };
    sections[section].total += 1;
    const picked = answers[question.id];
    if (picked === question.answer) {
      correct += 1;
      sections[section].correct += 1;
    } else {
      wrong.push({ ...question, picked });
    }
  }

  const total = questions.length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const scale = test?.id?.startsWith('ielts')
    ? { type: 'ielts', ...toIeltsBand(percent) }
    : { type: 'vstep', ...toVstepScore(percent) };

  return {
    testId: test?.id || '',
    testName: test?.name || '',
    correct,
    total,
    percent,
    scale,
    sections,
    wrong,
    completedAt: new Date().toISOString(),
  };
}

// Phần yếu nhất (tỉ lệ đúng thấp nhất) — dùng để gợi ý nên luyện gì tiếp.
export function weakestSection(sections = {}) {
  const entries = Object.entries(sections).filter(([, s]) => s.total > 0);
  if (!entries.length) return '';
  return entries.sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))[0][0];
}

// ---- Lịch sử làm bài (localStorage; key nằm trong LEARNING_STORAGE_KEYS) ----

export function loadMockHistory() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export function saveMockAttempt(result) {
  if (typeof localStorage === 'undefined') return;
  // Lưu bản gọn (không kèm danh sách câu sai) để không phình localStorage.
  const entry = {
    testId: result.testId,
    testName: result.testName,
    percent: result.percent,
    correct: result.correct,
    total: result.total,
    scale: result.scale,
    completedAt: result.completedAt,
  };
  const history = [entry, ...loadMockHistory()].slice(0, MAX_HISTORY);
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch { /* ignore */ }
}

// Lần làm gần nhất của cùng một đề — để hiện "tăng/giảm bao nhiêu".
export function previousAttempt(testId) {
  return loadMockHistory().find((entry) => entry.testId === testId) || null;
}
