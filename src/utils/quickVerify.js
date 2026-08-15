// File: src/utils/quickVerify.js
// #1b — SINH BÀI XÁC MINH NHANH (5 câu) cho chặng hoàn thành từ bản cũ.
//
// Lộ trình 44 chặng chỉ có HAI loại: 19 chặng ngữ pháp + 25 chặng từ vựng.
// (Đã đo trên dữ liệu thật: không có chặng Oxford nào trong lộ trình, nên ở đây
// không có nhánh Oxford — thêm chặng Oxford vào lộ trình thì phải thêm nhánh,
// và tests/quick_verify.test.js sẽ báo đỏ vì chặng đó không có nguồn câu hỏi.)
//
// NGUYÊN TẮC: mọi câu hỏi đều LẤY TỪ NỘI DUNG CÓ SẴN của chính chặng đó —
// không sinh câu mới, không dịch máy, không bịa đáp án.
import { QUICK_VERIFY_SIZE } from './mastery.js';

// Số từ tối thiểu để ra được một câu trắc nghiệm nghĩa: 1 đáp án + 3 nhiễu.
export const MIN_VOCAB_WORDS = 4;

const norm = (s) => String(s || '').trim().toLowerCase();

// Trộn bằng thuật toán Fisher-Yates với nguồn ngẫu nhiên tiêm được (test cần
// kết quả tất định). Không sửa mảng gốc.
export function shuffle(list, rand = Math.random) {
  const out = Array.isArray(list) ? [...list] : [];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ---- Ngữ pháp ---------------------------------------------------------------
// Chủ đề ngữ pháp có sẵn `exercises: [{ id, q, opts, a }]` — người soạn viết
// tay, dùng thẳng. Chỉ nhận câu có đáp án NẰM TRONG danh sách lựa chọn: câu nào
// lệch là câu hỏi không thể trả lời đúng, loại thẳng thay vì đoán ý.
export function grammarQuestionPool(topic) {
  return (topic?.exercises || []).filter((e) => (
    e && typeof e.q === 'string' && e.q.trim()
    && Array.isArray(e.opts) && e.opts.length >= 2
    && e.a !== undefined && e.opts.includes(e.a)
  ));
}

export function buildGrammarQuickVerify(topic, size = QUICK_VERIFY_SIZE, rand = Math.random) {
  return shuffle(grammarQuestionPool(topic), rand).slice(0, size).map((e, i) => ({
    id: `g:${e.id ?? i}`,
    prompt: e.q,
    options: shuffle(e.opts, rand),
    answer: e.a,
  }));
}

// ---- Từ vựng ----------------------------------------------------------------
export function vocabWordPool(topic) {
  return (topic?.words || []).filter((w) => (
    w && (w.en || w.word) && typeof w.vi === 'string' && w.vi.trim()
  ));
}

export function buildVocabQuickVerify(topic, size = QUICK_VERIFY_SIZE, rand = Math.random) {
  const words = vocabWordPool(topic);
  if (words.length < MIN_VOCAB_WORDS) return [];

  const out = [];
  for (const w of shuffle(words, rand)) {
    if (out.length >= size) break;
    const answer = w.vi.trim();
    // Nhiễu phải KHÁC NGHĨA đáp án đúng, so theo chuỗi nghĩa chứ không theo từ.
    // Đã đo: 12/25 chủ đề trong lộ trình có từ trùng nghĩa tiếng Việt (ví dụ
    // travel-transport: 117 từ nhưng chỉ 113 nghĩa khác nhau). Lấy nhiễu theo
    // từ sẽ đẻ ra câu hỏi có HAI đáp án cùng đúng mà chỉ một cái được chấm.
    const seen = new Set([norm(answer)]);
    const distractors = [];
    for (const d of shuffle(words, rand)) {
      const vi = (d.vi || '').trim();
      if (!vi || seen.has(norm(vi))) continue;
      seen.add(norm(vi));
      distractors.push(vi);
      if (distractors.length === 3) break;
    }
    if (distractors.length < 3) continue; // cả chủ đề chỉ có ≤3 nghĩa khác nhau
    out.push({
      id: `v:${w.en || w.word}`,
      prompt: `Từ "${w.en || w.word}" nghĩa là gì?`,
      options: shuffle([answer, ...distractors], rand),
      answer,
    });
  }
  return out;
}

// ---- Oxford ------------------------------------------------------------------
// Unit Oxford có sẵn `quiz: [{ q, options, a }]` — dùng thẳng, cùng luật với
// ngữ pháp: đáp án phải nằm trong danh sách lựa chọn.
//
// ⚠️ Sách Advanced chỉ còn 2 câu quiz/unit sau đợt dọn nội dung máy-sinh, nên
// 100 unit Advanced KHÔNG đủ 5 câu để xác minh nhanh. Giao diện phải ẨN nút và
// nói lý do — tuyệt đối không hạ số câu xuống rồi vẫn gọi là "đã xác minh".
// Cách sửa gốc là bù độ dày cho sách đó (KE_HOACH_B2 việc 5.1).
export function oxfordQuestionPool(unit) {
  return (unit?.quiz || []).filter((e) => (
    e && typeof e.q === 'string' && e.q.trim()
    && Array.isArray(e.options) && e.options.length >= 2
    && e.a !== undefined && e.options.includes(e.a)
  ));
}

export function buildOxfordQuickVerify(unit, size = QUICK_VERIFY_SIZE, rand = Math.random) {
  return shuffle(oxfordQuestionPool(unit), rand).slice(0, size).map((e, i) => ({
    id: `o:${i}:${String(e.q).slice(0, 40)}`,
    prompt: e.q,
    options: shuffle(e.options, rand),
    answer: e.a,
  }));
}

// ---- Cửa vào chung -----------------------------------------------------------
export function buildQuickVerify(type, source, size = QUICK_VERIFY_SIZE, rand = Math.random) {
  if (type === 'grammar') return buildGrammarQuickVerify(source, size, rand);
  if (type === 'vstep') return buildVocabQuickVerify(source, size, rand);
  if (type === 'oxford') return buildOxfordQuickVerify(source, size, rand);
  return [];
}

// Đủ nguyên liệu ra `size` câu hay không. Giao diện hỏi cái này TRƯỚC khi vẽ
// nút "Xác minh nhanh": thiếu dữ liệu thì ẨN nút và nói rõ lý do, tuyệt đối
// không hạ số câu xuống rồi vẫn gọi đó là "đã xác minh".
export function hasQuickVerifySupply(type, source, size = QUICK_VERIFY_SIZE) {
  if (type === 'grammar') return grammarQuestionPool(source).length >= size;
  if (type === 'vstep') {
    const words = vocabWordPool(source);
    if (words.length < size) return false;
    const meanings = new Set(words.map((w) => norm(w.vi)));
    return meanings.size >= MIN_VOCAB_WORDS;
  }
  if (type === 'oxford') return oxfordQuestionPool(source).length >= size;
  return false;
}
