import { LEARNING_STORAGE_KEYS } from './backup.js';
import { datHoacGop } from './gopKhoDongBo.js';
import { khoAnToan } from './kho.js';

// ĐỒNG BỘ Ở ĐÂY LÀ **ĐÈ NGUYÊN KHỐI, AI GHI SAU THẮNG**, chặn bằng đúng MỘT
// mốc `updatedAt` ở cấp trên cùng (xem `src/server/routes/progress.js`). Với
// dữ liệu là ẢNH CHỤP trạng thái — XP, chuỗi ngày, chặng đã xong — thì đúng.
//
// Nhưng có hai kho là NHẬT KÝ CHỈ THÊM, đè lên là xoá lịch sử: sổ thi cuối bậc
// (căn cứ duy nhất của tờ chứng nhận) và đồng hồ học. Hai kho đó đi qua
// `datHoacGop` để GỘP thay vì đè — xem `utils/gopKhoDongBo.js` để biết vì sao
// hai phép gộp đó an toàn và vì sao KHÔNG gộp cho mọi khoá.

const SYNC_TIMESTAMP_KEY = 'learningSyncUpdatedAtV1';

export function createProgressSnapshot(storage = khoAnToan()) {
  const data = {};
  for (const key of LEARNING_STORAGE_KEYS) {
    const value = storage.getItem(key);
    if (value !== null) data[key] = value;
  }
  return data;
}

export async function syncLearningProgress(storage = khoAnToan()) {
  const localUpdatedAt = Number(storage.getItem(SYNC_TIMESTAMP_KEY)) || 0;
  const read = await fetch('/api/progress', { credentials: 'same-origin' });
  if (!read.ok) return { status: 'unavailable' };
  const remote = await read.json();
  if (remote.data && Number(remote.updatedAt) > localUpdatedAt) {
    for (const [key, value] of Object.entries(remote.data)) {
      if (LEARNING_STORAGE_KEYS.includes(key) && typeof value === 'string') datHoacGop(storage, key, value);
    }
    storage.setItem(SYNC_TIMESTAMP_KEY, String(remote.updatedAt));
    return { status: 'restored', updatedAt: remote.updatedAt };
  }
  const updatedAt = Math.max(Date.now(), localUpdatedAt);
  const saved = await fetch('/api/progress', {
    method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: createProgressSnapshot(storage), updatedAt }),
  });
  if (!saved.ok) return { status: 'unavailable' };
  const result = await saved.json();
  if (result.data && result.accepted === false) {
    for (const [key, value] of Object.entries(result.data)) {
      if (LEARNING_STORAGE_KEYS.includes(key) && typeof value === 'string') datHoacGop(storage, key, value);
    }
  }
  storage.setItem(SYNC_TIMESTAMP_KEY, String(result.updatedAt || updatedAt));
  return { status: result.accepted === false ? 'restored' : 'saved', updatedAt: result.updatedAt || updatedAt };
}
