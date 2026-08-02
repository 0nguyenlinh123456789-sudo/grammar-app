const LEVELS = [
  { min: 0, id: 'starter', label: 'Starter', next: 'A1–A2' },
  { min: 35, id: 'elementary', label: 'Elementary', next: 'A2–B1' },
  { min: 55, id: 'intermediate', label: 'Intermediate', next: 'B1–B2' },
  { min: 75, id: 'upper-intermediate', label: 'Upper-intermediate', next: 'B2–C1' },
  { min: 90, id: 'advanced', label: 'Advanced', next: 'C1–C2' },
];

export function scorePlacement(questions, answers) {
  const skillStats = {};
  let correct = 0;
  for (const question of questions || []) {
    const skill = question.skill || 'general';
    skillStats[skill] ||= { correct: 0, total: 0 };
    skillStats[skill].total += 1;
    if (Number(answers?.[question.id]) === question.answer) {
      correct += 1;
      skillStats[skill].correct += 1;
    }
  }
  const score = questions?.length ? Math.round((correct / questions.length) * 100) : 0;
  const level = [...LEVELS].reverse().find((item) => score >= item.min) || LEVELS[0];
  const strengths = Object.entries(skillStats).filter(([, value]) => value.correct / value.total >= 0.67).map(([skill]) => skill);
  const focus = Object.entries(skillStats).filter(([, value]) => value.correct / value.total < 0.67).map(([skill]) => skill);
  return { score, correct, total: questions?.length || 0, level: level.id, levelLabel: level.label, next: level.next, skillStats, strengths, focus, completedAt: new Date().toISOString() };
}

export function recommendationFromPlacement(result) {
  if (!result) return { title: 'Làm bài kiểm tra đầu vào', body: 'Mất khoảng 5 phút để tạo lộ trình phù hợp với bạn.', action: 'placement' };
  const focus = result.focus?.[0];
  const labels = { grammar: 'ngữ pháp', vocabulary: 'từ vựng', reading: 'đọc hiểu' };
  return focus
    ? { title: `Ưu tiên ${labels[focus] || focus}`, body: `Bạn đang ở mức ${result.levelLabel}. Hãy luyện ${labels[focus] || focus} trước để tăng điểm nhanh nhất.`, action: focus }
    : { title: `Tiếp tục chinh phục ${result.next}`, body: `Bạn đã đạt mức ${result.levelLabel}. Một chặng mới sẽ giúp bạn tiến gần mục tiêu tiếp theo.`, action: 'next' };
}

export { LEVELS };
