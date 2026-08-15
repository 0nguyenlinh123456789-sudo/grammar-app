// File: tests/dictation.test.js
// CHẤM NGHE CHÉP CHÍNH TẢ (việc 2.3).
//
// Điều quan trọng nhất test ở đây: THIẾU MỘT TỪ Ở ĐẦU CÂU KHÔNG ĐƯỢC LÀM HỎNG
// CẢ CÂU. Chấm theo vị trí thì bỏ sót từ đầu tiên sẽ đẩy lệch mọi từ còn lại và
// người nghe đúng 9/10 từ bị chấm 0%. Đó là kiểu sai làm người học bỏ cuộc.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chamChinhTa, chuanTu, tachTu, goiY, NGUONG_DAT } from '../src/utils/dictation.js';

test('gõ đúng hoàn toàn → 100%, không lỗi nào', () => {
  const r = chamChinhTa('My name is Jack.', 'My name is Jack.');
  assert.equal(r.percent, 100);
  assert.equal(r.correct, 4);
  assert.equal(r.total, 4);
  assert.equal(r.passed, true);
  assert.ok(r.items.every((m) => m.type === 'dung'));
});

test('dấu câu và chữ hoa KHÔNG bị tính là lỗi — bài này đo nghe, không đo chép', () => {
  assert.equal(chamChinhTa('"Trust me," he said.', 'trust me he said').percent, 100);
  assert.equal(chamChinhTa('School begins on April 8.', 'school begins on april 8').percent, 100);
  // Nhưng dấu nháy đơn thì GIỮ: nó phân biệt "won't" với "wont".
  assert.equal(chuanTu("won't"), "won't");
  assert.notEqual(chuanTu("won't"), chuanTu('wont'));
});

test('THIẾU TỪ ĐẦU CÂU không được kéo sập cả câu', () => {
  const dung = 'The clouds are getting darker';
  const r = chamChinhTa(dung, 'clouds are getting darker');
  // 4/5 từ đúng — chấm theo vị trí sẽ ra 0/5.
  assert.equal(r.correct, 4);
  assert.equal(r.total, 5);
  assert.equal(r.percent, 80);
  assert.equal(r.items[0].type, 'thieu');
  assert.equal(r.items[0].expected, 'The');
});

test('gõ sai một từ được gộp thành MỘT lỗi, không phải hai', () => {
  const r = chamChinhTa('Teaching demands a lot of patience', 'Teaching demands a lot of patients');
  const sai = r.items.filter((m) => m.type === 'sai');
  assert.equal(sai.length, 1, 'phải gộp thiếu+thừa thành một lỗi gõ sai');
  assert.equal(sai[0].expected, 'patience');
  assert.equal(sai[0].typed, 'patients');
  assert.equal(r.correct, 5);
  assert.equal(r.total, 6);
  // Không được đếm thành 2 lỗi rồi trừ hai lần.
  assert.equal(r.items.filter((m) => m.type === 'thieu' || m.type === 'thua').length, 0);
});

test('gõ thừa từ bị đánh dấu, nhưng không làm âm điểm', () => {
  const r = chamChinhTa('Have you been to Kyoto', 'Have you ever been to Kyoto');
  assert.equal(r.items.filter((m) => m.type === 'thua').length, 1);
  assert.equal(r.correct, 5);
  assert.equal(r.percent, 100, 'nghe đủ 5 từ thì vẫn là 100% — từ thừa được báo nhưng không trừ');
});

test('bỏ trắng → 0%, và không văng', () => {
  const r = chamChinhTa('My name is Jack', '');
  assert.equal(r.correct, 0);
  assert.equal(r.percent, 0);
  assert.equal(r.passed, false);
  assert.equal(r.items.length, 4);
  assert.ok(r.items.every((m) => m.type === 'thieu'));
});

test('ngưỡng đạt là 80% và tính trên số từ THẬT của câu', () => {
  assert.equal(NGUONG_DAT, 0.8);
  // 8/10 = đạt, 7/10 = chưa đạt.
  const cau = 'one two three four five six seven eight nine ten';
  assert.equal(chamChinhTa(cau, 'one two three four five six seven eight').passed, true);
  assert.equal(chamChinhTa(cau, 'one two three four five six seven').passed, false);
});

test('dữ liệu rỗng/hỏng không làm văng bộ chấm', () => {
  for (const [a, b] of [[null, null], ['', ''], [undefined, 'abc'], ['abc', undefined]]) {
    const r = chamChinhTa(a, b);
    assert.ok(Number.isFinite(r.percent), `percent thành NaN với (${a}, ${b})`);
    assert.ok(Array.isArray(r.items));
  }
  assert.equal(chamChinhTa('', '').percent, 0);
  assert.deepEqual(tachTu('  a   b  '), ['a', 'b']);
});

test('gợi ý cho chữ cái đầu, KHÔNG cho cả câu', () => {
  const g = goiY('My name is Jack.');
  assert.equal(g, 'M· n··· i· J···');
  assert.ok(!g.includes('Jack'), 'gợi ý mà lộ cả từ thì bài chép chính tả thành bài chép lại');
});
