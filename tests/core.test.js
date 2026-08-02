import test from 'node:test';
import assert from 'node:assert/strict';

import { scoreWriting } from '../src/utils/writingScorer.js';
import { buildComprehension } from '../src/utils/comprehension.js';
import { buildVocabRegex, escapeRegExp, isSpeechMatch, levenshtein, similarity } from '../src/utils/textUtils.js';
import { AiServiceError, requestAi } from '../src/utils/aiClient.js';
import { createLearningBackup, restoreLearningBackup } from '../src/utils/backup.js';
import { parseImageVocabulary } from '../src/utils/imageVocabulary.js';
import { buildRequest } from '../functions/api/ai.js';
import { addLearningActivity, buildActivityWindow, normalizeActivityHistory } from '../src/utils/activityHistory.js';
import { countGoalDays, normalizeDailyGoal } from '../src/utils/dailyGoal.js';
import {
  createAccessRecord, generateAccessCode, hashValue, normalizeAccessCode,
  signToken, validateRecord, verifyToken,
} from '../src/server/accessCore.js';
import { placementQuestions } from '../src/data/placementQuestions.js';
import { recommendationFromPlacement, scorePlacement } from '../src/utils/placement.js';
import { createProgressSnapshot } from '../src/utils/progressSync.js';
import accessHandler from '../api/access.js';
import accessAdminHandler from '../api/access-admin.js';

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
  const source = new Map([['xp', '120'], ['completedMilestones', '["b1_01"]'], ['dailyGoalV1', '3'], ['unrelatedSecret', 'ignore']]);
  const sourceStorage = { getItem: (key) => source.has(key) ? source.get(key) : null };
  const backup = createLearningBackup(sourceStorage);
  assert.equal(backup.data.xp, '120');
  assert.equal('unrelatedSecret' in backup.data, false);

  const target = new Map();
  const targetStorage = { setItem: (key, value) => target.set(key, value) };
  const count = restoreLearningBackup(JSON.stringify(backup), targetStorage);
  assert.equal(count, 3);
  assert.equal(target.get('completedMilestones'), '["b1_01"]');
  assert.equal(target.get('dailyGoalV1'), '3');
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

test('learning activity accumulates by day and builds a continuous seven-day window', () => {
  let history = addLearningActivity([], { date: '2026-08-01', lessons: 1, xp: 20 });
  history = addLearningActivity(history, { date: '2026-08-01', lessons: 2, xp: 30 });
  assert.deepEqual(history, [{ date: '2026-08-01', lessons: 3, xp: 50 }]);

  const window = buildActivityWindow(history, 7, new Date(2026, 7, 2, 12));
  assert.equal(window.length, 7);
  assert.equal(window.at(-2).date, '2026-08-01');
  assert.equal(window.at(-2).xp, 50);
  assert.equal(window.at(-1).date, '2026-08-02');
  assert.equal(window.at(-1).xp, 0);
});

test('learning activity normalization rejects malformed and negative values', () => {
  assert.deepEqual(normalizeActivityHistory(null), []);
  assert.deepEqual(normalizeActivityHistory([
    { date: 'bad-date', lessons: 4, xp: 10 },
    { date: '2026-08-02', lessons: -2, xp: '15' },
  ]), [{ date: '2026-08-02', lessons: 0, xp: 15 }]);
});

test('daily learning goals only accept supported values and count completed days', () => {
  assert.equal(normalizeDailyGoal('3'), 3);
  assert.equal(normalizeDailyGoal('4'), 1);
  assert.equal(normalizeDailyGoal(null, 2), 2);
  assert.equal(countGoalDays([
    { lessons: 0 },
    { lessons: 2 },
    { lessons: 3 },
    { lessons: 8 },
  ], 3), 2);
});

test('commercial access codes are normalized and stored as irreversible hashes', () => {
  const code = generateAccessCode();
  assert.match(code, /^GRAM-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
  assert.equal(normalizeAccessCode(' gram-abcd-2345-efgh '), 'GRAMABCD2345EFGH');
  assert.equal(hashValue('secret-code').length, 64);
  assert.equal(hashValue('secret-code').includes('secret-code'), false);
});

test('signed access sessions reject tampering and expiry', () => {
  const secret = 'a-secure-session-secret-with-more-than-32-characters';
  const token = signToken({ role: 'learner', exp: 2_000 }, secret);
  assert.equal(verifyToken(token, secret, 1_000).role, 'learner');
  assert.equal(verifyToken(`${token}x`, secret, 1_000), null);
  assert.equal(verifyToken(token, secret, 3_000), null);
});

test('access records enforce plan duration, device limits and status', () => {
  const now = Date.UTC(2026, 7, 2);
  const record = createAccessRecord({ customer: 'Học viên A', plan: 'premium', durationDays: 30, maxDevices: 99 }, now);
  assert.equal(record.customer, 'Học viên A');
  assert.equal(record.maxDevices, 10);
  assert.equal(record.expiresAt, new Date(now + 30 * 86_400_000).toISOString());
  assert.equal(validateRecord(record, now).ok, true);
  assert.equal(validateRecord(record, now + 31 * 86_400_000).reason, 'expired');
  record.status = 'paused';
  assert.equal(validateRecord(record, now).reason, 'inactive');
});

test('access lifecycle creates, activates and remotely revokes a customer code', async () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    session: process.env.ACCESS_SESSION_SECRET,
    admin: process.env.ACCESS_ADMIN_SECRET,
  };
  const store = new Map();
  const sets = new Map();
  const lists = new Map();
  const execute = (command) => {
    const [name, key, ...args] = command;
    switch (String(name).toUpperCase()) {
      case 'GET': return store.get(key) ?? null;
      case 'SET': store.set(key, args[0]); return 'OK';
      case 'DEL': return store.delete(key) ? 1 : 0;
      case 'INCR': { const next = Number(store.get(key) || 0) + 1; store.set(key, String(next)); return next; }
      case 'EXPIRE': return 1;
      case 'SADD': { const set = sets.get(key) || new Set(); const before = set.size; set.add(args[0]); sets.set(key, set); return set.size - before; }
      case 'SREM': return sets.get(key)?.delete(args[0]) ? 1 : 0;
      case 'SMEMBERS': return [...(sets.get(key) || [])];
      case 'LPUSH': { const list = lists.get(key) || []; list.unshift(args[0]); lists.set(key, list); return list.length; }
      case 'LTRIM': { const list = lists.get(key) || []; lists.set(key, list.slice(Number(args[0]), Number(args[1]) + 1)); return 'OK'; }
      case 'LRANGE': return (lists.get(key) || []).slice(Number(args[0]), Number(args[1]) + 1);
      default: throw new Error(`Unsupported fake Redis command: ${name}`);
    }
  };
  const responseMock = () => ({
    headers: {}, statusCode: 200, payload: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(value) { this.statusCode = value; return this; },
    json(value) { this.payload = value; return this; },
  });
  const call = async (handler, request) => {
    const response = responseMock();
    await handler({ headers: {}, ...request }, response);
    return response;
  };

  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.test';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'redis-token';
  process.env.ACCESS_SESSION_SECRET = 'session-secret-with-at-least-thirty-two-characters';
  process.env.ACCESS_ADMIN_SECRET = 'admin-secret-with-24-characters';
  globalThis.fetch = async (url, options) => {
    const commands = JSON.parse(options.body);
    const result = String(url).endsWith('/pipeline')
      ? commands.map((command) => ({ result: execute(command) }))
      : { result: execute(commands) };
    return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };

  try {
    const login = await call(accessAdminHandler, { method: 'POST', body: { action: 'login', secret: process.env.ACCESS_ADMIN_SECRET } });
    assert.equal(login.statusCode, 200);
    const adminCookie = login.headers['Set-Cookie'];

    const created = await call(accessAdminHandler, { method: 'POST', headers: { cookie: adminCookie }, body: { action: 'create', customer: 'Khách A', plan: 'premium', durationDays: 30, maxDevices: 1 } });
    assert.equal(created.statusCode, 201);
    assert.match(created.payload.code, /^GRAM-/);

    const activated = await call(accessHandler, { method: 'POST', body: { action: 'activate', code: created.payload.code, deviceId: 'device-customer-a' } });
    assert.equal(activated.statusCode, 200);
    const learnerCookie = activated.headers['Set-Cookie'];

    const verified = await call(accessHandler, { method: 'GET', headers: { cookie: learnerCookie } });
    assert.equal(verified.statusCode, 200);
    assert.equal(verified.payload.access.customer, 'Khách A');

    const paused = await call(accessAdminHandler, { method: 'POST', headers: { cookie: adminCookie }, body: { action: 'update', codeHash: created.payload.record.codeHash, status: 'paused' } });
    assert.equal(paused.statusCode, 200);
    const revoked = await call(accessHandler, { method: 'GET', headers: { cookie: learnerCookie } });
    assert.equal(revoked.statusCode, 401);
  } finally {
    globalThis.fetch = originalFetch;
    const restore = (name, value) => value === undefined ? delete process.env[name] : process.env[name] = value;
    restore('UPSTASH_REDIS_REST_URL', originalEnv.url);
    restore('UPSTASH_REDIS_REST_TOKEN', originalEnv.token);
    restore('ACCESS_SESSION_SECRET', originalEnv.session);
    restore('ACCESS_ADMIN_SECRET', originalEnv.admin);
  }
});

test('placement scoring builds a level, skill profile and next recommendation', () => {
  const answers = Object.fromEntries(placementQuestions.map((question) => [question.id, question.answer]));
  const result = scorePlacement(placementQuestions, answers);
  assert.equal(result.score, 100);
  assert.equal(result.level, 'advanced');
  assert.deepEqual(result.focus, []);
  assert.match(recommendationFromPlacement(result).title, /C1/);
});

test('progress snapshots only include approved learning keys', () => {
  const values = new Map([['xp', '40'], ['placementResultV1', '{"score":80}'], ['password', 'secret']]);
  const snapshot = createProgressSnapshot({ getItem: (key) => values.get(key) ?? null });
  assert.equal(snapshot.xp, '40');
  assert.equal(snapshot.placementResultV1, '{"score":80}');
  assert.equal('password' in snapshot, false);
});
