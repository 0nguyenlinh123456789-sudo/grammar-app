// File: src/utils/writingScorer.js
// Offline (no API key) heuristic scorer for short English writing.
// Gives learners instant, useful feedback in Vietnamese. If a Gemini API key
// is available the caller can additionally request AI feedback — this offline
// scorer always works so writing practice is never blocked behind a key.

const COMMON_MISSPELLINGS = {
  recieve: 'receive', teh: 'the', wich: 'which', becuase: 'because',
  definately: 'definitely', seperate: 'separate', occured: 'occurred',
  untill: 'until', alot: 'a lot', thier: 'their', beacuse: 'because',
  wnat: 'want', freind: 'friend', beleive: 'believe', enviroment: 'environment',
};

// Score a single English sentence/short paragraph.
// opts: { targetWords?: string[] } — words the learner is expected to use.
// Returns { score (0-100), level, tips: string[], praises: string[], usedTargets: string[] }
export function scoreWriting(text, opts = {}) {
  const raw = String(text || '').trim();
  const tips = [];
  const praises = [];
  const targetWords = (opts.targetWords || []).map((w) => String(w).toLowerCase());

  if (!raw) {
    return { score: 0, level: 'empty', tips: ['Hãy viết một câu tiếng Anh trước nhé.'], praises: [], usedTargets: [] };
  }

  const words = raw.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = raw.toLowerCase();
  let score = 100;

  // 1. Length — a real sentence needs a few words.
  if (wordCount < 3) {
    score -= 35;
    tips.push('Câu quá ngắn — hãy viết ít nhất một câu hoàn chỉnh (3+ từ, có chủ ngữ + động từ).');
  } else if (wordCount >= 6) {
    praises.push('Độ dài câu tốt 👍');
  }

  // 2. Capitalization of the first letter.
  const firstChar = raw[0];
  if (firstChar && firstChar !== firstChar.toUpperCase()) {
    score -= 12;
    tips.push('Viết hoa chữ cái đầu câu.');
  } else {
    praises.push('Viết hoa đầu câu ✓');
  }

  // 3. Ending punctuation.
  if (!/[.!?]$/.test(raw)) {
    score -= 12;
    tips.push('Kết thúc câu bằng dấu chấm (.), chấm hỏi (?) hoặc chấm than (!).');
  } else {
    praises.push('Có dấu kết câu ✓');
  }

  // 4. Standalone "i" should be capitalized.
  if (/\bi\b/.test(raw)) {
    score -= 8;
    tips.push('Đại từ "I" (tôi) luôn viết hoa.');
  }

  // 5. Common misspellings.
  const misspelled = [];
  for (const w of words) {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (COMMON_MISSPELLINGS[clean]) {
      misspelled.push(`"${clean}" → "${COMMON_MISSPELLINGS[clean]}"`);
    }
  }
  if (misspelled.length) {
    score -= 10 * misspelled.length;
    tips.push('Lỗi chính tả: ' + misspelled.join(', ') + '.');
  }

  // 6. Double spaces / repeated words.
  if (/\b(\w+)\s+\1\b/i.test(raw)) {
    score -= 8;
    tips.push('Có từ bị lặp liền nhau — kiểm tra lại.');
  }

  // 7. Target vocabulary usage (if requested).
  let usedTargets = [];
  if (targetWords.length) {
    usedTargets = targetWords.filter((t) => new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(lower));
    if (usedTargets.length === 0) {
      score -= 20;
      tips.push(`Hãy dùng từ mục tiêu trong câu: ${opts.targetWords.slice(0, 5).join(', ')}.`);
    } else {
      praises.push(`Đã dùng từ mục tiêu: ${usedTargets.join(', ')} ✓`);
    }
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  let level;
  if (score >= 85) level = 'excellent';
  else if (score >= 65) level = 'good';
  else if (score >= 40) level = 'fair';
  else level = 'weak';

  if (tips.length === 0) tips.push('Rất tốt! Câu của bạn viết đúng chuẩn cơ bản. Hãy thử viết câu dài và phức tạp hơn.');

  return { score, level, tips, praises, usedTargets };
}

// Ask the AI proxy for richer feedback using the learner's own Gemini key.
// The offline scorer above stays available when no key has been added.
export async function scoreWritingWithAI(text, { topicTitle = '' } = {}) {
  const { requestAi } = await import('./aiClient.js');
  const data = await requestAi('writing', { text, topicTitle });
  return data.text;
}
