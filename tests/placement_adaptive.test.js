// File: tests/placement_adaptive.test.js
// BỘ MÁY THÍCH ỨNG: phải LUÔN DỪNG, KHÔNG HỎI LẠI, và trình độ phải lấy từ
// NẤC THANG chứ không từ phần trăm đúng.
//
// Vì sao test cái cuối cùng cẩn thận đến vậy: bài thích ứng được thiết kế để
// leo đến khi sai, nên ai cũng hội tụ về quanh 50–60% đúng. Nếu trình độ vẫn
// suy từ phần trăm (như bản cũ) thì người C1 leo tới C1 rồi sai vài câu sẽ ra
// ~55% → bị xếp "intermediate" → bị đưa nhầm chặng trong 617 chặng.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placementBank } from '../src/data/placementBank.js';
import {
  CEFR_LADDER, SKILLS, ROUND_SIZE, MAX_ROUNDS, START_CEFR, PASS_RATIO,
  createSession, currentQuestion, answerCurrent, placementResultFrom,
  passMark, pickRound, highestCleared, progressOf,
} from '../src/utils/placementAdaptive.js';

// Random cố định để kết quả lặp lại được (Math.random làm test chập chờn).
const fixedRand = (seed = 1) => { let s = seed; return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }; };

const byId = new Map(placementBank.map((q) => [q.id, q]));

// Chạy hết một bài, trả lời theo luật `decide(question) → boolean (đúng/sai)`.
function runSession(decide, seed = 7) {
  let s = createSession(placementBank, { rand: fixedRand(seed) });
  const seenIds = [];
  let guard = 0;
  while (!s.done) {
    if (guard++ > 200) throw new Error('bộ máy không dừng');
    const q = currentQuestion(s);
    assert.ok(q, 'chưa done mà không còn câu hỏi nào');
    seenIds.push(q.id);
    const wantCorrect = decide(q);
    const wrong = q.options.findIndex((_, i) => i !== q.answer);
    s = answerCurrent(s, wantCorrect ? q.answer : wrong);
  }
  return { session: s, seenIds, result: placementResultFrom(s, new Date('2026-08-15T00:00:00Z')) };
}

test('ngưỡng qua vòng co theo số câu THẬT được hỏi, không cứng theo ROUND_SIZE', () => {
  assert.equal(passMark(6), 4);
  assert.equal(passMark(3), 2);
  // Bậc mỏng câu thì vòng ngắn — không được vì thế mà đánh trượt người học.
  assert.equal(passMark(1), 1);
  assert.equal(passMark(0), 1);
  assert.ok(passMark(ROUND_SIZE) / ROUND_SIZE >= PASS_RATIO - 1e-9);
});

test('mỗi vòng bốc đủ câu, đúng bậc, đủ cả ba kỹ năng', () => {
  for (const level of CEFR_LADDER) {
    const round = pickRound(placementBank, level, fixedRand(3));
    assert.equal(round.length, ROUND_SIZE, `vòng bậc ${level} không đủ ${ROUND_SIZE} câu`);
    assert.ok(round.every((q) => q.cefr === level), `vòng bậc ${level} lẫn câu bậc khác`);
    for (const skill of SKILLS) {
      assert.ok(round.some((q) => q.skill === skill), `vòng bậc ${level} thiếu kỹ năng ${skill}`);
    }
    assert.equal(new Set(round.map((q) => q.id)).size, ROUND_SIZE, `vòng bậc ${level} có câu lặp`);
  }
});

test('luôn dừng và KHÔNG BAO GIỜ hỏi lại một câu — với mọi kiểu trả lời', () => {
  const patterns = [
    ['đúng hết', () => true],
    ['sai hết', () => false],
    ['xen kẽ', (() => { let n = 0; return () => (n++ % 2 === 0); })()],
    ['chỉ đúng ngữ pháp', (q) => q.skill === 'grammar'],
    ['chỉ sai ngữ pháp', (q) => q.skill !== 'grammar'],
  ];
  for (const [ten, decide] of patterns) {
    for (const seed of [1, 2, 3, 11, 99]) {
      const { session, seenIds, result } = runSession(decide, seed);
      assert.equal(new Set(seenIds).size, seenIds.length, `[${ten}/seed ${seed}] có câu bị hỏi lại`);
      assert.ok(session.rounds.length <= MAX_ROUNDS, `[${ten}] quá ${MAX_ROUNDS} vòng`);
      assert.equal(new Set(session.visited).size, session.visited.length, `[${ten}] hỏi lại một bậc đã hỏi`);
      // Số câu nằm trong khoảng đã công bố với người học (12–24).
      assert.ok(seenIds.length >= ROUND_SIZE, `[${ten}] bài ngắn bất thường: ${seenIds.length} câu`);
      assert.ok(seenIds.length <= ROUND_SIZE * MAX_ROUNDS, `[${ten}] bài dài bất thường: ${seenIds.length} câu`);
      // Kết quả luôn dùng được: hoặc có bậc hợp lệ, hoặc là cờ preA1.
      assert.ok(result.cefr === null || CEFR_LADDER.includes(result.cefr), `[${ten}] bậc lạ: ${result.cefr}`);
      assert.equal(result.preA1, result.cefr === null);
      assert.ok(result.level, `[${ten}] thiếu id cấp độ — trang chủ sẽ không biết đưa người học đi đâu`);
    }
  }
});

test('đúng hết → C1 (leo hết thang), và KHÔNG bị phần trăm kéo xuống', () => {
  const { result, session } = runSession(() => true);
  assert.equal(result.cefr, 'C1');
  assert.equal(result.level, 'advanced');
  assert.equal(result.preA1, false);
  assert.deepEqual(session.visited, ['A2', 'B1', 'B2', 'C1']);
  assert.equal(result.score, 100);
});

test('sai hết → chưa qua vòng A1, gắn cờ preA1 chứ không gán bừa một bậc', () => {
  const { result, session } = runSession(() => false);
  assert.equal(result.cefr, null);
  assert.equal(result.preA1, true);
  // Vẫn phải có id cấp độ để lộ trình chạy được — 'starter', không phải null.
  assert.equal(result.level, 'starter');
  assert.deepEqual(session.visited, ['A2', 'A1']);
  assert.equal(result.score, 0);
});

test('ĐÂY LÀ CÁI BẪY CŨ: điểm phần trăm thấp vẫn có thể là bậc cao', () => {
  // Người học qua A2, qua B1, qua B2, rồi trượt C1 — hồ sơ thật của một người B2.
  const failFrom = 'C1';
  const { result } = runSession((q) => q.cefr !== failFrom);
  assert.equal(result.cefr, 'B2');
  assert.equal(result.level, 'upper-intermediate');
  // Phần trăm đúng tụt xuống vì 6 câu C1 sai hết. Bản cũ (score >= 75 mới là
  // upper-intermediate) sẽ xếp người này thấp hơn hẳn.
  assert.ok(result.score < 80, `mong đợi phần trăm bị kéo xuống, đang là ${result.score}%`);
  assert.equal(result.total, 24);
});

test('qua bậc dưới rồi trượt bậc trên thì dừng ngay, không đi lòng vòng', () => {
  // Trượt A2 → xuống A1 → qua A1 → bậc kế tiếp là A2 (đã hỏi) → dừng.
  const { result, session } = runSession((q) => q.cefr === 'A1');
  assert.equal(result.cefr, 'A1');
  assert.equal(result.level, 'starter');
  assert.equal(result.preA1, false);
  assert.deepEqual(session.visited, ['A2', 'A1']);
  assert.equal(result.total, ROUND_SIZE * 2);
});

test('hồ sơ kỹ năng: không có phép chia cho 0, không có NaN lọt ra ngoài', () => {
  const { result } = runSession((q) => q.skill === 'grammar');
  for (const skill of SKILLS) {
    const stat = result.skillStats[skill];
    assert.ok(stat, `thiếu thống kê kỹ năng ${skill}`);
    assert.ok(Number.isFinite(stat.correct) && Number.isFinite(stat.total));
    assert.ok(stat.correct <= stat.total);
  }
  assert.ok(Number.isFinite(result.score), 'score thành NaN');
  // Kỹ năng làm đúng hết ở một bậc thì có bậc sơ bộ; kỹ năng sai hết thì null,
  // KHÔNG phải 'A1' cho có.
  assert.ok(CEFR_LADDER.includes(result.skillCefr.grammar));
  assert.equal(result.skillCefr.reading, null);
  assert.deepEqual(result.focus.sort(), ['reading', 'vocabulary']);
  assert.deepEqual(result.strengths, ['grammar']);
});

test('câu hỏi trả về luôn là câu có thật trong ngân hàng', () => {
  const { seenIds } = runSession((q) => q.cefr !== 'B2');
  for (const id of seenIds) assert.ok(byId.has(id), `câu "${id}" không có trong ngân hàng`);
});

test('thanh tiến độ không bịa ra mẫu số: chỉ đếm trong vòng hiện tại', () => {
  const s = createSession(placementBank, { rand: fixedRand(5) });
  const p = progressOf(s);
  assert.equal(p.answered, 0);
  assert.equal(p.round, 1);
  assert.equal(p.roundSize, ROUND_SIZE);
  assert.equal(p.cefr, START_CEFR);

  const s2 = answerCurrent(s, currentQuestion(s).answer);
  assert.equal(progressOf(s2).inRound, 1);
  assert.equal(progressOf(s2).roundSize, ROUND_SIZE);
});

test('dữ liệu vào rỗng/hỏng không làm văng bộ máy', () => {
  assert.equal(currentQuestion(null), null);
  assert.equal(highestCleared(null), null);
  assert.equal(highestCleared([]), null);
  assert.equal(highestCleared(['B1', 'A2']), 'B1');
  const empty = placementResultFrom(null);
  assert.equal(empty.total, 0);
  assert.equal(empty.score, 0);
  assert.equal(empty.preA1, true);
  assert.equal(empty.level, 'starter');
  // Trả lời khi đã xong thì không đổi gì, không văng.
  const done = { ...createSession(placementBank, { rand: fixedRand(1) }), done: true };
  assert.equal(answerCurrent(done, 0), done);
});
