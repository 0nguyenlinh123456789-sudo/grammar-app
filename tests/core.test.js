import test from 'node:test';
import assert from 'node:assert/strict';

import { scoreWriting } from '../src/utils/writingScorer.js';
import { buildComprehension } from '../src/utils/comprehension.js';
import { buildVocabRegex, escapeRegExp, isSpeechMatch, levenshtein, similarity } from '../src/utils/textUtils.js';
import { AiServiceError, requestAi } from '../src/utils/aiClient.js';
import { createLearningBackup, restoreLearningBackup } from '../src/utils/backup.js';
import { parseImageVocabulary } from '../src/utils/imageVocabulary.js';
import { buildRequest } from '../functions/api/ai.js';

test('writing scorer handles empty and well-formed answers', () => {
  const empty = scoreWriting('   ');
  assert.equal(empty.score, 0);
  assert.equal(empty.level, 'empty');

  const good = scoreWriting('I enjoy learning English every day.');
  assert.equal(good.score, 100);
  assert.equal(good.level, 'excellent');
});

test('writing scorer detects common mistakes and target vocabulary', () => {
  const weak = scoreWriting('i recieve recieve books', { targetWords: ['travel'] });
  assert.ok(weak.score < 60);
  assert.ok(weak.tips.some((tip) => tip.includes('receive')));
  assert.ok(weak.tips.some((tip) => tip.includes('từ mục tiêu')));

  const targeted = scoreWriting('Travel helps me understand new cultures.', { targetWords: ['travel'] });
  assert.deepEqual(targeted.usedTargets, ['travel']);
});

test('text matching is strict for short words and tolerant for longer words', () => {
  assert.equal(isSpeechMatch('go', 'go'), true);
  assert.equal(isSpeechMatch('good', 'go'), false);
  assert.equal(isSpeechMatch('I said beautiful today', 'beautiful'), true);
  assert.equal(levenshtein('kitten', 'sitting'), 3);
  assert.ok(similarity('learning', 'learnin') > 0.8);
});

test('vocabulary regex safely supports punctuation and prefers phrases', () => {
  assert.equal(escapeRegExp('C++'), 'C\\+\\+');
  const regex = buildVocabRegex(['take off', 'take', 'C++']);
  assert.ok(regex);
  assert.equal('We take off now'.match(regex)?.[0], 'take off');
});

test('authored comprehension questions are normalized correctly', () => {
  const questions = buildComprehension({
    authored: [{ en: 'The train leaves at nine.', q: 'Khi nào tàu chạy?', options: ['8 giờ', '9 giờ'], answer: 1 }],
    words: [],
  });
  assert.equal(questions.length, 1);
  assert.equal(questions[0].playText, 'The train leaves at nine.');
  assert.equal(questions[0].options.filter((option) => option.correct).length, 1);
  assert.equal(questions[0].options[1].correct, true);
});

test('comprehension falls back to vocabulary examples', () => {
  const words = [
    { en: 'apple', example: 'I eat an apple.', viExample: 'Tôi ăn một quả táo.' },
    { en: 'water', example: 'I drink water.', viExample: 'Tôi uống nước.' },
  ];
  const questions = buildComprehension({ words, authored: [], limit: 2 });
  assert.equal(questions.length, 2);
  for (const question of questions) {
    assert.ok(question.playText);
    assert.equal(question.options.filter((option) => option.correct).length, 1);
  }
});

test('AI client returns parsed server data', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ text: 'Nhận xét tốt.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    const result = await requestAi('writing', { text: 'I study English.' });
    assert.equal(result.text, 'Nhận xét tốt.');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('AI client exposes structured API errors', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ code: 'not-configured', message: 'AI chưa cấu hình.' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
  try {
    await assert.rejects(
      requestAi('writing', { text: 'I study English.' }),
      (error) => error instanceof AiServiceError && error.code === 'not-configured',
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('learning progress can be exported and restored safely', () => {
  const source = new Map([['xp', '120'], ['completedMilestones', '["b1_01"]'], ['unrelatedSecret', 'ignore']]);
  const sourceStorage = { getItem: (key) => source.has(key) ? source.get(key) : null };
  const backup = createLearningBackup(sourceStorage);
  assert.equal(backup.data.xp, '120');
  assert.equal('unrelatedSecret' in backup.data, false);

  const target = new Map();
  const targetStorage = { setItem: (key, value) => target.set(key, value) };
  const count = restoreLearningBackup(JSON.stringify(backup), targetStorage);
  assert.equal(count, 2);
  assert.equal(target.get('completedMilestones'), '["b1_01"]');
});

test('invalid backup files are rejected', () => {
  const storage = { setItem: () => assert.fail('invalid backup must not write') };
  assert.throws(() => restoreLearningBackup('{"version":99}', storage), /invalid-backup/);
});

test('image AI request validates encoded data before sending it upstream', () => {
  const parts = buildRequest('image-vocabulary', {
    imageData: 'aGVsbG8=',
    mimeType: 'image/png',
  });
  assert.equal(parts[1].inlineData.data, 'aGVsbG8=');
  assert.throws(
    () => buildRequest('image-vocabulary', { imageData: 'not base64!', mimeType: 'image/png' }),
    /invalid-image/,
  );
  assert.throws(
    () => buildRequest('image-vocabulary', { imageData: 'AAAA'.repeat(1_398_102 + 1), mimeType: 'image/png' }),
    /image-too-large/,
  );
});

test('image vocabulary response is normalized and incomplete data is rejected', () => {
  const result = parseImageVocabulary('```json\n{"word":" cat ","ipa":"/kæt/","meaning":"con mèo","phrases":["pet cat"],"sentences":[{"en":"It is a cat.","vi":"Đó là một con mèo."}]}\n```');
  assert.equal(result.word, 'cat');
  assert.equal(result.sentences.length, 1);
  assert.throws(() => parseImageVocabulary('{"word":"cat"}'), /chưa đầy đủ/);
  assert.throws(() => parseImageVocabulary('not json'), /không đọc được/);
});
