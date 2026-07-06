// File: src/components/common/chibiCopy.js
// Copy + game data for the chibi animal buddies. Kept out of ChibiAnimals.jsx so
// that file only exports components (react-refresh rule).

// Bilingual praise — a little English every time you finish a lesson.
const PRAISE = [
  'Well done! Giỏi quá! 🎉', 'Perfect! Tuyệt vời! 🌟', 'Amazing! Cậu đỉnh thật! 💪',
  'Great job! Học quá đỉnh! 🏆', 'Keep going! Cố lên nào! 🥳', "You're a star! Tớ tự hào! 💖",
  'Band 7+ is coming! 🚀', 'Smart cookie! Não lớn thêm rồi! 🧠',
];
const GREET = [
  'Chào cậu! Học một bài để cho tớ ăn nhé? Chỉ 5 phút thôi! 🍎',
  'Quay lại rồi! Tớ nhớ cậu lắm đó 🥰',
  'Mỗi ngày một chút, 7+ IELTS không còn xa đâu! 🌈',
  'Học đều là bí kíp của người giỏi đấy! Let\'s go! ✨',
];
let _p = 0, _g = 0;
export const praiseLine = () => PRAISE[(_p++) % PRAISE.length];
export const greetLine = () => GREET[(_g++) % GREET.length];

export const CHIBI_SPECIES = ['cat', 'hamster', 'bear', 'bunny', 'chick', 'cow', 'bee', 'sheep'];

// ---------- "Vườn thú" collection game ----------
// Each pet unlocks at a study milestone → a reason to come back every day.
export const PETS = [
  { species: 'cat', name: 'Mochi', en: 'Mochi the Cat', unlock: { lessons: 0 } },
  { species: 'chick', name: 'Nắng', en: 'Sunny the Chick', unlock: { lessons: 1 } },
  { species: 'bunny', name: 'Bông', en: 'Cotton the Bunny', unlock: { lessons: 3 } },
  { species: 'hamster', name: 'Kiki', en: 'Kiki the Hamster', unlock: { streak: 3 } },
  { species: 'bear', name: 'Nâu', en: 'Coco the Bear', unlock: { lessons: 10 } },
  { species: 'cow', name: 'Bột', en: 'Milky the Cow', unlock: { lessons: 20 } },
  { species: 'bee', name: 'Zizi', en: 'Buzzy the Bee', unlock: { streak: 7 } },
  { species: 'sheep', name: 'Mây', en: 'Cloud the Sheep', unlock: { lessons: 40 } },
];
export function petUnlocked(p, { lessons = 0, streak = 0 }) {
  if (p.unlock.lessons != null) return lessons >= p.unlock.lessons;
  if (p.unlock.streak != null) return streak >= p.unlock.streak;
  return false;
}
export function petHint(p) {
  if (p.unlock.lessons != null) return p.unlock.lessons === 0 ? 'Bạn đầu tiên của cậu 💛' : `Học ${p.unlock.lessons} bài để mở khoá`;
  if (p.unlock.streak != null) return `Chuỗi ${p.unlock.streak} ngày để mở khoá`;
  return '';
}
// Progress (0..1) toward unlocking a still-locked pet — powers the little bar.
export function petProgress(p, { lessons = 0, streak = 0 }) {
  if (p.unlock.lessons != null) return Math.min(1, lessons / Math.max(1, p.unlock.lessons));
  if (p.unlock.streak != null) return Math.min(1, streak / Math.max(1, p.unlock.streak));
  return 1;
}

// ---------- feeding / evolution ----------
// Every lesson = 1 apple 🍎; a study streak feeds the buddy faster. The buddy
// "levels up" and puts on an accessory as it grows — a reason to keep the streak.
const TIERS = [
  { min: 0, deco: null, label: 'Bé con' },
  { min: 8, deco: 'scarf', label: 'Chăm chỉ' },
  { min: 20, deco: 'cap', label: 'Học giả' },
  { min: 45, deco: 'crown', label: 'Bậc thầy' },
];
export function petTier({ lessons = 0, streak = 0 }) {
  const score = lessons + streak * 2; // apples + streak bonus
  let cur = TIERS[0], next = null;
  for (const t of TIERS) {
    if (score >= t.min) cur = t;
    else { next = t; break; }
  }
  const need = next ? next.min - score : 0;
  const span = next ? next.min - cur.min : 1;
  const progress = next ? Math.min(1, (score - cur.min) / span) : 1;
  return { ...cur, score, apples: lessons, next, need, progress };
}

// ---------- English word of the day (the pet teaches you) ----------
export const WORDS = [
  { w: 'improve', ipa: '/ɪmˈpruːv/', vi: 'cải thiện', ex: 'I want to improve my English.' },
  { w: 'achieve', ipa: '/əˈtʃiːv/', vi: 'đạt được', ex: 'You can achieve band 7!' },
  { w: 'confident', ipa: '/ˈkɒnfɪdənt/', vi: 'tự tin', ex: 'Speak with a confident voice.' },
  { w: 'practice', ipa: '/ˈpræktɪs/', vi: 'luyện tập', ex: 'Practice makes perfect.' },
  { w: 'vocabulary', ipa: '/vəˈkæbjələri/', vi: 'từ vựng', ex: 'Learn new vocabulary daily.' },
  { w: 'fluent', ipa: '/ˈfluːənt/', vi: 'trôi chảy', ex: 'She is fluent in English.' },
  { w: 'progress', ipa: '/ˈprəʊɡres/', vi: 'tiến bộ', ex: 'You make progress every day.' },
  { w: 'brilliant', ipa: '/ˈbrɪljənt/', vi: 'xuất sắc', ex: 'That is a brilliant answer!' },
  { w: 'effort', ipa: '/ˈefət/', vi: 'nỗ lực', ex: 'Great effort brings great results.' },
  { w: 'curious', ipa: '/ˈkjʊəriəs/', vi: 'tò mò, ham học', ex: 'Stay curious and keep learning.' },
  { w: 'reward', ipa: '/rɪˈwɔːd/', vi: 'phần thưởng', ex: 'A new pet is your reward!' },
  { w: 'journey', ipa: '/ˈdʒɜːni/', vi: 'hành trình', ex: 'Enjoy your IELTS journey.' },
];
export const wordOfDay = () => {
  const now = new Date();
  const day = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return WORDS[day % WORDS.length];
};
