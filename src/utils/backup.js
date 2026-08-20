const BACKUP_VERSION = 1;

export const LEARNING_STORAGE_KEYS = [
  'xp', 'completedMilestones', 'streak', 'lastActiveDate', 'bestStreak',
  'dailyStats', 'activeOxfordBookId', 'oxfordUnitId', 'theme', 'soundMuted',
  'srsStore_v1', 'vocabLearningProgressV1', 'learningActivityV1', 'dailyGoalV1', 'placementResultV1', 'learningSyncUpdatedAtV1',
  'streakFreezeV1', 'errorBankV1', 'onboardingDoneV1', 'learningGoalV1', 'mockTestHistoryV1',
  // Điểm đạt của từng milestone (hạng mục #1). Phải nằm trong sao lưu/đồng bộ,
  // nếu không thì đổi máy là mọi bài đã xác minh tụt về "⏳ chưa xác minh".
  'milestoneScoresV1',
  // Cờ "đã báo một lần về việc đổi cách đánh dấu hoàn thành" (#1b) — đi kèm để
  // đổi máy không bị đọc lại thông báo di trú đã đọc rồi.
  'masteryMigrationNoticeV1',
  // Sổ bài viết (3.4) và sổ lượt nói (3.5) + phần tự đánh giá. Đây là thứ người
  // học TỰ LÀM RA, mất là mất hẳn — nên phải nằm trong sao lưu và đồng bộ.
  'writingLogV1',
  'speakingLogV1',
  // SỔ THI CUỐI BẬC. Đây là CĂN CỨ DUY NHẤT để app gắn nhãn bậc và in tờ
  // chứng nhận — `luotDatGanNhat`/`bacDaDat` không đọc ở đâu khác. Nó nằm
  // ngoài danh sách này từ lúc dựng bộ thi, nghĩa là đổi máy hay khôi phục
  // sao lưu là mất sạch mọi lượt thi đã đạt, và tờ chứng nhận tụt về bản
  // "chuyên cần". Người học không mất bài học nào nhưng mất đúng thứ chứng
  // minh họ đã qua bậc.
  'bandExamHistoryV1',
  // Đồng hồ học. Là NHẬT KÝ ĐỜI NGƯỜI như bestStreak, không phải tiến độ:
  // đổi máy mà mất thì con số "đã mở app 40 giờ" về 0 trong khi 40 giờ đó
  // có thật.
  'thoiGianHocV1',
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
