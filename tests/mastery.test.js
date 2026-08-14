// File: tests/mastery.test.js
// Hạng mục #1 — gate hoàn thành bằng độ chính xác.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  PASS_THRESHOLD, PASS_THRESHOLD_MCQ_HEAVY, thresholdFor,
  createSession, recordAnswer, sessionEvidence, buildEvidence, isPassing,
  loadScores, saveScore, isVerified, splitCompleted,
  pickQuickVerifyQuestions, quickVerifyPassed, MASTERY_STORAGE_KEY,
} from '../src/utils/mastery.js';

const memStorage = () => {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    _map: map,
  };
};

test('đạt ở đúng 80%, trượt ở 79%', () => {
  const types = Array(10).fill('typing');
  assert.equal(buildEvidence(8, 10, types).passed, true);
  assert.equal(buildEvidence(79, 100, types).passed, false);
  assert.equal(buildEvidence(80, 100, types).passed, true);
  assert.equal(Math.round(PASS_THRESHOLD * 100), 80);
});

test('bộ đề >70% trắc nghiệm nâng ngưỡng lên 85%: đạt ở 85, trượt ở 84', () => {
  const heavy = [...Array(8).fill('mcq'), ...Array(2).fill('typing')]; // 80% mcq
  assert.equal(thresholdFor(heavy), PASS_THRESHOLD_MCQ_HEAVY);
  const many = (n) => [...Array(Math.round(n * 0.8)).fill('mcq'), ...Array(n - Math.round(n * 0.8)).fill('typing')];
  assert.equal(buildEvidence(84, 100, many(100)).passed, false);
  assert.equal(buildEvidence(85, 100, many(100)).passed, true);
  // đúng 70% trắc nghiệm thì CHƯA phải "mcq-heavy" (phải LỚN HƠN 70%)
  const exactly70 = [...Array(7).fill('mcq'), ...Array(3).fill('typing')];
  assert.equal(thresholdFor(exactly70), PASS_THRESHOLD);
  assert.equal(thresholdFor([]), PASS_THRESHOLD);
});

test('trả lời sai rồi sửa thành đúng trong cùng phiên vẫn tính SAI', () => {
  const s = createSession();
  recordAnswer(s, 'q1', false, 'mcq');
  recordAnswer(s, 'q1', true, 'mcq');  // bấm lại — không được ghi đè
  recordAnswer(s, 'q2', true, 'mcq');
  const ev = sessionEvidence(s);
  assert.equal(ev.correct, 1);
  assert.equal(ev.total, 2);
  assert.equal(ev.percent, 50);
  assert.equal(ev.passed, false);
});

test('phiên rỗng không bao giờ đạt', () => {
  assert.equal(sessionEvidence(createSession()).passed, false);
  assert.equal(buildEvidence(0, 0, []).passed, false);
  assert.equal(isPassing(null), false);
  assert.equal(isPassing(undefined), false);
});

test('số câu đúng không thể vượt tổng số câu', () => {
  const ev = buildEvidence(99, 10, Array(10).fill('typing'));
  assert.equal(ev.correct, 10);
  assert.equal(ev.percent, 100);
});

test('chỉ lưu bản ĐẠT, và chỉ ghi đè khi điểm cao hơn', () => {
  const st = memStorage();
  saveScore(st, 'm1', buildEvidence(5, 10, Array(10).fill('typing')), '2026-01-01'); // trượt
  assert.equal(isVerified(loadScores(st), 'm1'), false, 'bản trượt không được lưu');

  saveScore(st, 'm1', buildEvidence(8, 10, Array(10).fill('typing')), '2026-01-02');
  assert.equal(loadScores(st).m1.percent, 80);

  saveScore(st, 'm1', buildEvidence(9, 10, Array(10).fill('typing')), '2026-01-03');
  assert.equal(loadScores(st).m1.percent, 90, 'điểm cao hơn thì cập nhật');

  saveScore(st, 'm1', buildEvidence(8, 10, Array(10).fill('typing')), '2026-01-04');
  assert.equal(loadScores(st).m1.percent, 90, 'điểm thấp hơn KHÔNG hạ bản đã đạt');
  assert.equal(loadScores(st).m1.passedAt, '2026-01-03');
});

test('dữ liệu lưu hỏng không làm văng app', () => {
  const st = memStorage();
  st.setItem(MASTERY_STORAGE_KEY, 'không-phải-json');
  assert.deepEqual(loadScores(st), {});
  st.setItem(MASTERY_STORAGE_KEY, '[1,2,3]');
  assert.deepEqual(loadScores(st), {});
  assert.deepEqual(loadScores(null), {});
});

test('người dùng cũ: milestone không có bản ghi điểm là CHƯA XÁC MINH, không bị hạ', () => {
  const st = memStorage();
  saveScore(st, 'm2', buildEvidence(10, 10, Array(10).fill('typing')), '2026-01-01');
  const scores = loadScores(st);
  const split = splitCompleted(['m1', 'm2', 'm3'], scores);
  assert.deepEqual(split.all, ['m1', 'm2', 'm3'], '% lộ trình vẫn đếm đủ — không ai mất tiến độ');
  assert.deepEqual(split.verified, ['m2']);
  assert.deepEqual(split.unverified, ['m1', 'm3']);
});

test('xác minh nhanh: 4/5 đạt, 3/5 không đạt', () => {
  assert.equal(quickVerifyPassed(4, 5), true);
  assert.equal(quickVerifyPassed(5, 5), true);
  assert.equal(quickVerifyPassed(3, 5), false);
  // unit ít câu: quy về cùng tỉ lệ
  assert.equal(quickVerifyPassed(3, 3), true);
  assert.equal(quickVerifyPassed(2, 3), false);
  assert.equal(quickVerifyPassed(0, 0), false);
});

test('bộ 5 câu xác minh lấy từ chính quiz của unit, không trùng câu', () => {
  const quiz = Array.from({ length: 12 }, (_, i) => ({ q: `câu ${i}` }));
  let seed = 0;
  const picked = pickQuickVerifyQuestions(quiz, 5, () => ((seed = (seed * 9301 + 49297) % 233280) / 233280));
  assert.equal(picked.length, 5);
  assert.equal(new Set(picked.map((q) => q.q)).size, 5);
  for (const q of picked) assert.ok(quiz.includes(q));
  // quiz ngắn hơn 5 câu thì lấy hết, không văng
  assert.equal(pickQuickVerifyQuestions([{ q: 'a' }], 5).length, 1);
  assert.equal(pickQuickVerifyQuestions(null, 5).length, 0);
});
