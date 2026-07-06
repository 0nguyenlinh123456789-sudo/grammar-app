// File: src/utils/srs.js
// Lightweight spaced-repetition store (Leitner boxes) persisted in localStorage.
// A "card" holds the full word object plus a box level and a due date, so the
// review screen is fully self-contained — it doesn't need to look words up.
//
// Box → interval (days): 1→1, 2→2, 3→4, 4→7, 5→15. Correct answer promotes a
// box (and pushes the due date out); a wrong answer resets to box 1.

const KEY = 'srsStore_v1';
const INTERVALS = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 15 };

function todayNum() {
  // Days since epoch (local). Kept as an integer so comparisons are simple and
  // it never depends on the exact time of day.
  const d = new Date();
  return Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 86400000);
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch { return {}; }
}

function save(store) {
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* ignore */ }
}

const keyOf = (word) => String(word?.en || '').toLowerCase().trim();

// Record the result of reviewing/learning a word. `correct` promotes the card.
export function recordReview(word, correct) {
  const k = keyOf(word);
  if (!k) return;
  const store = load();
  const existing = store[k];
  let box = existing?.box || 1;
  box = correct ? Math.min(5, box + 1) : 1;
  store[k] = {
    en: word.en,
    vi: word.vi,
    ipa: word.ipa || '',
    example: word.example || '',
    viExample: word.viExample || '',
    box,
    due: todayNum() + INTERVALS[box],
    updated: todayNum(),
  };
  save(store);
}

// Cards that are due today or overdue.
export function getDueCards(limit = 20) {
  const store = load();
  const t = todayNum();
  return Object.values(store)
    .filter((c) => (c.due ?? 0) <= t)
    .sort((a, b) => (a.due ?? 0) - (b.due ?? 0))
    .slice(0, limit);
}

export function getDueCount() {
  const store = load();
  const t = todayNum();
  return Object.values(store).filter((c) => (c.due ?? 0) <= t).length;
}

export function getTotalCount() {
  return Object.keys(load()).length;
}
