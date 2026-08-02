const cleanString = (value, maxLength) => (
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
);

export function parseImageVocabulary(text) {
  const jsonText = String(text || '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let value;
  try {
    value = JSON.parse(jsonText);
  } catch {
    throw new Error('AI trả về kết quả không đọc được. Vui lòng thử lại.');
  }

  const word = cleanString(value?.word, 100);
  const ipa = cleanString(value?.ipa, 100);
  const meaning = cleanString(value?.meaning, 300);
  const phrases = Array.isArray(value?.phrases)
    ? value.phrases.map((item) => cleanString(item, 300)).filter(Boolean).slice(0, 6)
    : [];
  const sentences = Array.isArray(value?.sentences)
    ? value.sentences.map((item) => ({
      en: cleanString(item?.en, 500),
      vi: cleanString(item?.vi, 500),
    })).filter((item) => item.en && item.vi).slice(0, 6)
    : [];

  if (!word || !meaning || phrases.length === 0 || sentences.length === 0) {
    throw new Error('AI trả về kết quả chưa đầy đủ. Vui lòng thử lại.');
  }

  return { word, ipa, meaning, phrases, sentences };
}
