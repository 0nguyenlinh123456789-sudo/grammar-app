// File: src/utils/onboarding.js
// First-run state for the onboarding wizard, kept outside the component so
// App can check it without importing component code (react-refresh rule).

const DONE_KEY = 'onboardingDoneV1';
const GOAL_KEY = 'learningGoalV1';

export function needsOnboarding() {
  try { return !localStorage.getItem(DONE_KEY); } catch { return false; }
}

export function markOnboardingDone(goal) {
  try {
    localStorage.setItem(DONE_KEY, new Date().toISOString());
    if (goal) localStorage.setItem(GOAL_KEY, goal);
  } catch { /* private mode — wizard simply shows again next time */ }
}

export function getLearningGoal() {
  try { return localStorage.getItem(GOAL_KEY) || ''; } catch { return ''; }
}
