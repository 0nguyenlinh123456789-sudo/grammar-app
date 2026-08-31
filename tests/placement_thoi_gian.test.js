// File: tests/placement_thoi_gian.test.js
// GIỚI HẠN THỜI GIAN · VÒNG XÁC NHẬN · TRỘN PHƯƠNG ÁN (28/08)
//
// Ba việc chủ dự án yêu cầu ngày 28/08: "bài kiểm tra thêm giới hạn thời gian"
// và "test đầu vào cần kĩ càng hơn để xét đúng trình độ". Mỗi việc kéo theo một
// cái bẫy riêng, ghim từng cái ở đây thay vì trộn vào file bộ máy cũ.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { placementBank } from '../src/data/placementBank.js';
import {
  CEFR_LADDER, SKILLS, MIN_ROUNDS,
  createSession, currentQuestion, answerCurrent, placementResultFrom,
  bacDaQua, gioiHanGiay, GIAY_MOI_CAU,
} from '../src/utils/placementAdaptive.js';

const fixedRand = (seed = 1) => { let s = seed; return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }; };

function runSession(decide, seed = 7) {
  let s = createSession(placementBank, { rand: fixedRand(seed) });
  const seenIds = [];
  let guard = 0;
  while (!s.done) {
    if (guard++ > 200) throw new Error('bộ máy không dừng');
    const q = currentQuestion(s);
    seenIds.push(q.id);
    const wrong = q.options.findIndex((_, i) => i !== q.answer);
    s = answerCurrent(s, decide(q) ? q.answer : wrong);
  }
  return { session: s, seenIds, result: placementResultFrom(s) };
}

test('HẾT GIỜ (không chọn gì) phải tính là SAI — Number(null) là 0 nên rất dễ thành ĐÚNG', () => {
  // Cái bẫy đắt nhất của tính năng đếm giờ. `answerCurrent` chấm bằng
  // `Number(choiceIndex) === question.answer`; truyền null vào thì `Number(null)`
  // ra **0**, nên mọi câu bỏ trống có đáp án ở ô đầu bị chấm ĐÚNG. Ngân hàng
  // này có 38% số câu đáp án ở ô 0 → người hết giờ cả bài vẫn được xếp bậc.
  assert.ok(placementBank.some((q) => q.answer === 0),
    'ngân hàng không còn câu nào đáp án ở ô 0 — viết lại phép kiểm này cho đúng lý do');

  let s = createSession(placementBank, { rand: fixedRand(3) });
  const q = currentQuestion(s);
  s = answerCurrent(s, null);
  const daHoi = s.asked[0];
  assert.equal(daHoi.id, q.id);
  assert.equal(daHoi.correct, false, 'câu bỏ trống bị chấm ĐÚNG');
  assert.equal(daHoi.hetGio, true, 'không đánh dấu là hết giờ');
  assert.equal(daHoi.chosen, null, 'lưu 0 thay vì null — mất luôn khả năng phân biệt "chọn ô A" với "bỏ trống"');
});

test('hết giờ TOÀN BỘ bài thì không được xếp bậc nào', () => {
  let s = createSession(placementBank, { rand: fixedRand(4) });
  let guard = 0;
  while (!s.done) {
    if (guard++ > 200) throw new Error('bộ máy không dừng');
    s = answerCurrent(s, null);
  }
  const kq = placementResultFrom(s);
  assert.equal(kq.cefr, null, 'bỏ trống hết bài mà vẫn ra một bậc CEFR');
  assert.equal(kq.preA1, true);
  assert.equal(kq.correct, 0);
  assert.equal(kq.hetGio, kq.total, 'số câu hết giờ phải bằng tổng số câu');
});

test('mỗi kỹ năng có giới hạn giây riêng, và đọc hiểu được nhiều thời gian hơn', () => {
  assert.ok(GIAY_MOI_CAU.reading > GIAY_MOI_CAU.grammar,
    'câu đọc hiểu phải được nhiều giây hơn câu ngữ pháp — người học phải đọc cả đoạn');
  for (const skill of SKILLS) {
    const q = placementBank.find((x) => x.skill === skill);
    assert.ok(gioiHanGiay(q) > 0, `kỹ năng ${skill} không có giới hạn thời gian`);
  }
  // Kỹ năng lạ / thiếu dữ liệu vẫn phải ra một con số, không được là undefined
  // rồi thành NaN trên đồng hồ đếm ngược của người học.
  assert.ok(Number.isFinite(gioiHanGiay({ skill: 'khong-co-that' })));
  assert.ok(Number.isFinite(gioiHanGiay(null)));
});

test('VÒNG XÁC NHẬN: bậc chốt hỏi thêm bằng câu CHƯA DÙNG, và chấm gộp cả hai vòng', () => {
  // Người chỉ làm đúng câu A1: trượt A2 → qua A1 → kẹp xong → xác nhận ở A1.
  const { session, seenIds } = runSession((q) => q.cefr === 'A1');

  const vongA1 = session.rounds.filter((r) => r.cefr === 'A1');
  assert.equal(vongA1.length, 2, 'bậc chốt phải được hỏi HAI vòng');
  assert.equal(vongA1.filter((r) => r.xacNhan).length, 1, 'đúng một vòng được đánh dấu là vòng xác nhận');
  assert.equal(new Set(seenIds).size, seenIds.length,
    'vòng xác nhận hỏi lại câu đã hỏi — hỏi lại thì chỉ đo trí nhớ ngắn hạn, không xác nhận thêm gì');
  assert.equal(session.daXacNhan, true);
});

test('chấm GỘP theo bậc: qua vòng đầu rồi trượt sạch vòng xác nhận thì KHÔNG tính là đã qua', () => {
  assert.deepEqual(bacDaQua([
    { cefr: 'B1', asked: 9, correct: 9 },
    { cefr: 'B1', asked: 9, correct: 0 },
  ]), [], 'chấm theo từng vòng thay vì gộp — vòng xác nhận thành ra vô nghĩa');
  // Và chiều ngược lại: gộp lại vẫn đủ ngưỡng thì vẫn là đã qua.
  assert.deepEqual(bacDaQua([
    { cefr: 'B1', asked: 9, correct: 7 },
    { cefr: 'B1', asked: 9, correct: 6 },
  ]), ['B1']);
  assert.deepEqual(bacDaQua([]), []);
  assert.deepEqual(bacDaQua(null), []);
});

test('không qua nổi bậc nào thì KHÔNG có vòng xác nhận — không có bậc nào để xác nhận', () => {
  const { session } = runSession(() => false);
  assert.equal(session.rounds.filter((r) => r.xacNhan).length, 0);
  assert.equal(session.rounds.length, MIN_ROUNDS);
});

test('giao diện PHẢI trộn thứ tự phương án — ngân hàng để phần lớn đáp án ở hai ô đầu', () => {
  const src = fs.readFileSync('src/components/placement/PlacementTest.jsx', 'utf8');
  const than = src.split('\n').filter((d) => !/^\s*import\b/.test(d)).join('\n');
  assert.ok(/tronThuTu\(/.test(than),
    'PlacementTest không gọi tronThuTu — "cứ bấm hai ô trên" lại trúng ~50% thay vì 25%');
  assert.ok(!/question\.options\.map\(/.test(than),
    'vẫn vẽ thẳng question.options.map — thứ tự đã trộn không tới được màn hình');

  // Giữ nguyên LÝ DO phép kiểm này tồn tại: kho vẫn lệch, nên lớp trộn là thứ
  // duy nhất đang chặn. Bản vá 19/08 bỏ sót kho này vì hồi đó chỉ đếm "đáp án ở
  // ô ĐẦU" (48% — trông bình thường) mà không nhìn phân bố đủ bốn ô.
  const dem = [0, 0, 0, 0];
  for (const q of placementBank) dem[q.answer] += 1;
  const haiODau = (dem[0] + dem[1]) / placementBank.length;
  assert.ok(haiODau > 0.5,
    `kho đã hết lệch (${Math.round(haiODau * 100)}% ở hai ô đầu) — nếu thật thì viết lại chú thích, đừng bỏ phép kiểm`);
});

test('ngân hàng đủ dày cho 3 câu/kỹ năng/vòng VÀ một vòng xác nhận không trùng câu', () => {
  const mong = [];
  for (const cefr of CEFR_LADDER) {
    for (const skill of SKILLS) {
      const n = placementBank.filter((q) => q.cefr === cefr && q.skill === skill).length;
      if (n < 6) mong.push(`${cefr}/${skill}: ${n} câu`);
    }
  }
  assert.deepEqual(mong, [], `cần ≥6 câu mỗi ô (3 vòng thường + 3 vòng xác nhận):\n  ${mong.join('\n  ')}`);
});
