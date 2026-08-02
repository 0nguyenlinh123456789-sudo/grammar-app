export const DAILY_GOAL_OPTIONS = [1, 2, 3, 5];

export function normalizeDailyGoal(value, fallback = 1) {
  const parsed = Number.parseInt(value, 10);
  return DAILY_GOAL_OPTIONS.includes(parsed) ? parsed : fallback;
}

export function countGoalDays(activityWindow, dailyGoal) {
  const goal = normalizeDailyGoal(dailyGoal);
  if (!Array.isArray(activityWindow)) return 0;
  return activityWindow.filter((entry) => (Number(entry?.lessons) || 0) >= goal).length;
}
