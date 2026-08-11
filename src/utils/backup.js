const BACKUP_VERSION = 1;

export const LEARNING_STORAGE_KEYS = [
  'xp', 'completedMilestones', 'streak', 'lastActiveDate', 'bestStreak',
  'dailyStats', 'activeOxfordBookId', 'oxfordUnitId', 'theme', 'soundMuted',
  'srsStore_v1', 'vocabLearningProgressV1', 'learningActivityV1', 'dailyGoalV1', 'placementResultV1', 'learningSyncUpdatedAtV1',
  'streakFreezeV1', 'errorBankV1', 'onboardingDoneV1', 'learningGoalV1', 'mockTestHistoryV1',
];

export function createLearningBackup(storage = localStorage) {
  const data = {};
  for (const key of LEARNING_STORAGE_KEYS) {
    const value = storage.getItem(key);
    if (value !== null) data[key] = value;
  }
  return { app: 'grammar-pro', version: BACKUP_VERSION, createdAt: new Date().toISOString(), data };
}

export function restoreLearningBackup(input, storage = localStorage) {
  const backup = typeof input === 'string' ? JSON.parse(input) : input;
  if (!backup || backup.app !== 'grammar-pro' || backup.version !== BACKUP_VERSION) {
    throw new Error('invalid-backup');
  }
  if (!backup.data || typeof backup.data !== 'object' || Array.isArray(backup.data)) {
    throw new Error('invalid-backup');
  }

  let restored = 0;
  for (const key of LEARNING_STORAGE_KEYS) {
    const value = backup.data[key];
    if (typeof value !== 'string' || value.length > 2_000_000) continue;
    storage.setItem(key, value);
    restored += 1;
  }
  if (restored === 0) throw new Error('empty-backup');
  return restored;
}
