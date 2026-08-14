// File: src/utils/masteryMigration.js
// #1b — cờ "đã báo cho người dùng cũ biết về việc đổi cách đánh dấu hoàn thành".
// Tách khỏi component để có thể kiểm bằng test và để hot-reload không kêu.
export const MIGRATION_NOTICE_KEY = 'masteryMigrationNoticeV1';

// Chỉ hiện khi THẬT SỰ có chặng cũ chưa xác minh, và chỉ đúng một lần. Người
// mới cài app (mọi chặng đều có điểm ngay từ đầu) không bao giờ thấy nó.
export function shouldShowMigrationNotice(storage, unverifiedCount) {
  if (!unverifiedCount) return false;
  try { return !storage?.getItem(MIGRATION_NOTICE_KEY); } catch { return false; }
}

export function dismissMigrationNotice(storage, nowIso) {
  try { storage?.setItem(MIGRATION_NOTICE_KEY, nowIso || new Date().toISOString()); } catch { /* hết chỗ lưu thì thôi */ }
}
