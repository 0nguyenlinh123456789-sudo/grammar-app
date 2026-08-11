// File: src/utils/errorBank.js
// Ngân hàng lỗi — every wrong answer becomes a review card that comes back on
// a 3 → 7 → 14 day ladder. Self-graded on review: "tôi đúng" climbs the
// ladder (and finally retires the card), "tôi sai" resets it to 3 days.
// Persisted in localStorage; the key is listed in backup.js so it also rides
// the server sync.

const KEY = 'errorBankV1';
const STAGES = [3, 7, 14];
const MAX_ENTRIES = 300;

function todayNum() {
  const d = new Date();
  return Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 86400000);
}

// localStorage may not exist (node tests import writingScorer → errorBank);
// in that case the bank silently no-ops.
const storageAvailable = typeof localStorage !== 'undefined';

function load() {
  if (!storageAvailable) return {};
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch { return {}; }
}

function save(store) {
  if (!storageAvailable) return;
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* ignore */ }
}

// Stable id from the prompt text so the same mistake maps to the same card.
function idOf(prompt) {
  let h = 0;
  const s = String(prompt);
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return 'e' + Math.abs(h).toString(36);
}

// Called from exercises when the learner answers wrong.
// { skill: 'grammar'|'vocab'|'listening'|'writing', prompt, answer, chosen? }
export function recordError({ skill = 'grammar', prompt, answer, chosen = '' }) {
  if (!prompt || !answer) return;
  const store = load();
  const id = idOf(prompt);
  const existing = store[id];
  store[id] = {
    id,
    skill,
    prompt: String(prompt).slice(0, 300),
    answer: String(answer).slice(0, 200),
    chosen: String(chosen).slice(0, 200),
    times: (existing?.times || 0) + 1,
    stage: 0,
    due: todayNum() + STAGES[0],
    updated: todayNum(),
  };
  // Cap the bank so localStorage never bloats: drop the oldest retired-ish
  // entries first (highest stage, oldest update).
  const all = Object.values(store);
  if (all.length > MAX_ENTRIES) {
    all.sort((a, b) => (b.stage - a.stage) || (a.updated - b.updated));
    for (const drop of all.slice(0, all.length - MAX_ENTRIES)) delete store[drop.id];
  }
  save(store);
}

export function getDueErrors(limit = 20) {
  const t = todayNum();
  return Object.values(load())
    .filter((e) => (e.due ?? 0) <= t)
    .sort((a, b) => (a.due ?? 0) - (b.due ?? 0))
    .slice(0, limit);
}

export function getDueErrorCount() {
  const t = todayNum();
  return Object.values(load()).filter((e) => (e.due ?? 0) <= t).length;
}

export function getErrorCount() {
  return Object.keys(load()).length;
}

// Review outcome: correct climbs the ladder; past the last stage the card is
// considered learned and removed. Wrong resets to the first stage.
export function resolveError(id, correct) {
  const store = load();
  const entry = store[id];
  if (!entry) return;
  if (correct) {
    const nextStage = (entry.stage ?? 0) + 1;
    if (nextStage >= STAGES.length) {
      delete store[id];
    } else {
      entry.stage = nextStage;
      entry.due = todayNum() + STAGES[nextStage];
      entry.updated = todayNum();
    }
  } else {
    entry.stage = 0;
    entry.times = (entry.times || 0) + 1;
    entry.due = todayNum() + STAGES[0];
    entry.updated = todayNum();
  }
  save(store);
}
