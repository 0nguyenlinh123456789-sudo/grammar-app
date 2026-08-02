const VOCAB_PROGRESS_KEY = 'vocabLearningProgressV1';

function readStore() {
  try {
    const parsed = JSON.parse(localStorage.getItem(VOCAB_PROGRESS_KEY) || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function loadVocabProgress(topicId) {
  const empty = { currentWordIndex: 0, visitedModes: ['flashcard'], studiedWordIndexes: [0] };
  if (!topicId) return empty;

  const saved = readStore()[topicId];
  if (!saved || typeof saved !== 'object') return empty;

  return {
    currentWordIndex: Number.isInteger(saved.currentWordIndex) ? saved.currentWordIndex : 0,
    visitedModes: Array.isArray(saved.visitedModes) && saved.visitedModes.length
      ? [...new Set(saved.visitedModes.filter((mode) => typeof mode === 'string'))]
      : ['flashcard'],
    studiedWordIndexes: Array.isArray(saved.studiedWordIndexes) && saved.studiedWordIndexes.length
      ? [...new Set(saved.studiedWordIndexes.filter(Number.isInteger))]
      : [0],
  };
}

export function saveVocabProgress(topicId, progress) {
  if (!topicId) return;
  try {
    const store = readStore();
    store[topicId] = {
      currentWordIndex: progress.currentWordIndex,
      visitedModes: [...progress.visitedModes],
      studiedWordIndexes: [...progress.studiedWordIndexes],
    };
    localStorage.setItem(VOCAB_PROGRESS_KEY, JSON.stringify(store));
  } catch {
    // Learning still works when storage is unavailable or full.
  }
}

export function clearVocabProgress() {
  try {
    localStorage.removeItem(VOCAB_PROGRESS_KEY);
  } catch {
    // Ignore unavailable storage during reset.
  }
}
