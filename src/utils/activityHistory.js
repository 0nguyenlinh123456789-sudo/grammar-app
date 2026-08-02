const MAX_HISTORY_DAYS = 90;

export function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function normalizeActivityHistory(value, limit = MAX_HISTORY_DAYS) {
  if (!Array.isArray(value)) return [];
  const byDate = new Map();
  for (const entry of value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry?.date || '')) continue;
    byDate.set(entry.date, {
      date: entry.date,
      lessons: Math.max(0, Math.floor(Number(entry.lessons) || 0)),
      xp: Math.max(0, Math.floor(Number(entry.xp) || 0)),
    });
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date)).slice(-limit);
}

export function addLearningActivity(history, { date = new Date(), lessons = 0, xp = 0 } = {}) {
  const dateKey = typeof date === 'string' ? date : localDateKey(date);
  const normalized = normalizeActivityHistory(history);
  const existing = normalized.find((entry) => entry.date === dateKey);
  const next = normalized.filter((entry) => entry.date !== dateKey);
  next.push({
    date: dateKey,
    lessons: (existing?.lessons || 0) + Math.max(0, Math.floor(Number(lessons) || 0)),
    xp: (existing?.xp || 0) + Math.max(0, Math.floor(Number(xp) || 0)),
  });
  return normalizeActivityHistory(next);
}

export function buildActivityWindow(history, days = 7, today = new Date()) {
  const normalized = normalizeActivityHistory(history);
  const byDate = new Map(normalized.map((entry) => [entry.date, entry]));
  return Array.from({ length: Math.max(1, days) }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (days - index - 1));
    const key = localDateKey(date);
    return byDate.get(key) || { date: key, lessons: 0, xp: 0 };
  });
}
