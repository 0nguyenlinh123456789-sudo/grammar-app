// File: src/utils/streakFreeze.js
// "Đóng băng chuỗi" — a small mercy budget so one missed day doesn't wipe a
// long streak. Each calendar month grants FREEZES_PER_MONTH freezes; every
// missed day consumes one. Persisted in localStorage and included in the
// learning backup/sync key list (see backup.js).

import { khoAnToan } from './kho.js';
const KEY = 'streakFreezeV1';
export const FREEZES_PER_MONTH = 2;

function monthStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function load(storage = khoAnToan()) {
  try {
    const parsed = JSON.parse(storage.getItem(KEY) || 'null');
    if (parsed && typeof parsed === 'object' && parsed.month === monthStamp()) return parsed;
  } catch { /* corrupted state falls through to a fresh month */ }
  return { month: monthStamp(), used: 0, lastSavedAt: '' };
}

function save(state, storage = khoAnToan()) {
  try { storage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore quota errors */ }
}

export function freezesLeft(storage = khoAnToan()) {
  return Math.max(0, FREEZES_PER_MONTH - load(storage).used);
}

// Called when the app detects `missedDays` days without learning. Returns
// whether the streak was rescued. Consumes one freeze per missed day; if the
// gap is bigger than the remaining budget, nothing is consumed (the streak is
// lost anyway, so keep the freezes for the new streak).
export function tryConsumeFreezes(missedDays, storage = khoAnToan()) {
  const state = load(storage);
  const left = FREEZES_PER_MONTH - state.used;
  if (missedDays <= 0 || missedDays > left) return { saved: false, left };
  state.used += missedDays;
  state.lastSavedAt = new Date().toDateString();
  save(state, storage);
  return { saved: true, left: FREEZES_PER_MONTH - state.used };
}

// True when a freeze rescued the streak today — lets the UI show a one-day
// "🧊 chuỗi đã được cứu" notice without a separate event bus.
export function frozeToday(storage = khoAnToan()) {
  return load(storage).lastSavedAt === new Date().toDateString();
}
