// File: src/utils/textUtils.js
// Small shared text helpers.

// Escape a string so it can be safely embedded inside a RegExp.
// Without this, vocab entries containing ( ) . + ? [ ] etc. crash the
// components that build a RegExp from raw vocabulary words.
export function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Levenshtein edit distance between two strings.
export function levenshtein(a = '', b = '') {
  a = String(a); b = String(b);
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let curr = new Array(n + 1);
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

// Similarity ratio in [0,1] where 1 = identical. Based on edit distance.
export function similarity(a = '', b = '') {
  a = String(a).toLowerCase().trim();
  b = String(b).toLowerCase().trim();
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

// Decide whether a spoken transcript acceptably matches a target word/phrase.
// Handles the case where speech recognition returns extra words: any single
// spoken token close enough to the target counts. Short targets need a tighter
// match to avoid false positives (the old bug: "go" matched almost anything).
export function isSpeechMatch(transcript = '', target = '') {
  const t = String(transcript).toLowerCase().replace(/[^\w\s]/g, '').trim();
  const g = String(target).toLowerCase().replace(/[^\w\s]/g, '').trim();
  if (!t || !g) return false;
  if (t === g) return true;
  const threshold = g.length <= 4 ? 0.95 : 0.8; // short words must be near-exact
  if (similarity(t, g) >= threshold) return true;
  // Multi-word target: compare against the whole transcript already done above.
  // Single-word target: check each spoken token individually.
  if (!g.includes(' ')) {
    return t.split(/\s+/).some((tok) => similarity(tok, g) >= threshold);
  }
  return false;
}

// Build a case-insensitive "whole word / phrase" matcher from a list of
// vocabulary strings. Longer phrases are matched first so multi-word entries
// win over their sub-words. Empty/blank entries are ignored. Returns null if
// there is nothing valid to match.
export function buildVocabRegex(words) {
  const cleaned = (words || [])
    .filter((w) => typeof w === 'string' && w.trim().length > 0)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  if (cleaned.length === 0) return null;
  return new RegExp(`\\b(${cleaned.join('|')})\\b`, 'gi');
}

// Đếm xem BAO NHIÊU từ của chủ đề thật sự xuất hiện trong bài đọc.
//
// Có hàm này vì tiêu đề mục Câu Chuyện từng khẳng định "Tất cả N từ xuất hiện
// trong câu chuyện này!" — đo ra thì chỉ ĐÚNG với 6/267 chủ đề, và tính trên
// toàn kho có 11.068/22.008 ô từ KHÔNG hề xuất hiện trong truyện của chính chủ
// đề đó. Nói một con số sai với người học còn tệ hơn không nói.
//
// Đếm bằng MỘT lượt quét của chính `buildVocabRegex`, đúng như lớp bôi vàng
// quét — không phải bằng cách dò từng từ một.
//
// Khác biệt này có thật, không phải chuyện làm cho gọn: bộ khớp ưu tiên cụm
// DÀI trước, nên trong "public transport" thì ô từ `transport` bị cụm dài nuốt
// mất và KHÔNG được bôi vàng riêng. Dò từng từ sẽ tính `transport` là "có" và
// cho ra con số lớn hơn số vệt vàng người học đếm được trên màn hình. Ở một
// tính năng mà lý do tồn tại là "nói con số sai với người học còn tệ hơn không
// nói", con số phải là con số họ đếm lại được.
export function demTuTrongTruyen(storyText, vocabList) {
  const words = (vocabList || []).map((w) => w?.en).filter(Boolean);
  const tong = words.length;
  const text = String(storyText || '');
  if (!text || tong === 0) return { co: 0, tong };
  const re = buildVocabRegex(words);
  if (!re) return { co: 0, tong };
  const thay = new Set();
  let m;
  while ((m = re.exec(text)) !== null) thay.add(m[0].toLowerCase());
  const co = words.filter((w) => thay.has(String(w).toLowerCase())).length;
  return { co, tong };
}
