// File: src/utils/comprehension.js
// Builds a normalized list of comprehension questions for the Listening and
// Reading practice components.
//
// A topic MAY provide hand-authored questions in `topic.comprehension` for
// richer, passage-level checks. If it doesn't, we auto-generate sentence-level
// questions from the vocab example sentences so every topic still has practice.
//
// Authored question shape (in the data files):
//   { en: "English sentence or passage", q: "Câu hỏi (tiếng Việt)",
//     options: ["A", "B", "C", "D"], answer: 0 }   // answer = correct index
//
// Normalized output shape (what the components render):
//   { playText, showText, prompt, options: [{ text, correct }], word }

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Auto-generate: "what does this sentence mean?" from example/viExample.
function autoQuestions(words, limit) {
  const usable = (words || []).filter((w) => w.example && w.viExample);
  return shuffle(usable).slice(0, limit).map((w) => {
    const distractors = shuffle(
      usable.filter((o) => o.viExample && o.viExample !== w.viExample)
    ).slice(0, 3);
    const options = shuffle([
      { text: w.viExample, correct: true },
      ...distractors.map((d) => ({ text: d.viExample, correct: false })),
    ]);
    return {
      playText: w.example,
      showText: w.example,
      prompt: 'Câu này có nghĩa là gì?',
      options,
      word: w,
    };
  });
}

// Map hand-authored questions into the normalized shape.
function authoredQuestions(list, limit) {
  return shuffle(list.filter((q) => q && q.en && Array.isArray(q.options) && q.options.length >= 2))
    .slice(0, limit)
    .map((q) => ({
      playText: q.en,
      showText: q.en,
      prompt: q.q || 'Chọn đáp án đúng:',
      options: q.options.map((opt, i) => ({ text: opt, correct: i === q.answer })),
      word: null,
    }));
}

// mode is currently informational; both skills use the same question set.
export function buildComprehension({ words, authored, limit = 10 }) {
  if (Array.isArray(authored) && authored.length > 0) {
    const qs = authoredQuestions(authored, limit);
    if (qs.length >= 1) return qs;
  }
  return autoQuestions(words, limit);
}
