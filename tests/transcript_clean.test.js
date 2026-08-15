// File: tests/transcript_clean.test.js
// Bộ lọc bản chép lời có hai cách hỏng, và cách thứ hai NGUY HIỂM HƠN:
//   1. lọc thiếu → người học đọc thấy câu mà tai không nghe thấy,
//   2. lọc thừa → CẮT MẤT nội dung thật, và không ai biết vì bài vẫn chạy.
// Nên test này kiểm cả hai chiều, chiều thứ hai bằng những câu thật trong bài
// đã suýt bị cắt nhầm.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { laDongNgoaiBanThu, locBanChepLoi, tachTuKho } from '../src/utils/transcriptClean.js';

test('cắt đúng những dòng chỉ có trên trang web', () => {
  const phaiCat = [
    'Andrew Smith wrote this lesson for VOA Learning English.',
    'Adam Brock wrote and produced this story for VOA Learning English. Jill Robbins was the editor.',
    'Anna Matteo and Jill Robbins wrote this lesson for Learning English in collaboration with English teachers from Ukraine in our Go English workshop.',
    'We want to hear from you. Write to us in the Comments Section.',
    'What do you think of this story? We want to hear from you.',
    'Each time you return to comment on the Learning English site, you can use your account.',
    'Editors note: This is the third of a four-part series on verb tenses.',
    'Ex. Yesterday morning, I went to the store.',
    'Tip 2: Make sure to use “has” for the third person in the present perfect.',
    'INCORRECT: She have not read the book yet.',
    'Click here for a list of common irregular verbs.',
    'Common adverbs in the simple past: last night, last year, yesterday.',
    '* Snowball game – write sentences with the new words on sheets of paper.',
    'Words in This Story',
    // Dòng giải nghĩa từ. Dòng thứ hai dài 21 ký tự trước dấu gạch — đúng dòng
    // đã lọt qua bộ lọc cũ vì bộ lọc đó chỉ nhận đầu dòng tối đa 20 ký tự.
    'focus –v. to center one\'s attention on something',
    'present perfect tense – n. A grammatical combination of the present tense',
    'unsolicited – adj. not asked for or requested',
  ];
  for (const d of phaiCat) assert.ok(laDongNgoaiBanThu(d), `đáng lẽ phải cắt: “${d}”`);
});

test('KHÔNG cắt nhầm nội dung thật của bài', () => {
  const phaiGiu = [
    // Có chữ "wrote" nhưng là nội dung bài — dấu hiệu thứ hai ("Learning
    // English") không có nên không dính.
    'Malcolm Gladwell wrote about the subject in his book Tipping Point published in 2002.',
    // Ask a Teacher đọc câu này TRONG BẢN THU, dù nó cũng mời người nghe viết thư.
    'For our readers and listeners, what are your questions about American English? We want to hear from you!',
    'Each separate sound we make when we talk is called a phoneme.',
    'We use the word “species” to categorize living things.',
    'It was apparent to him that no one in the office had the right skills for the job.',
    'A: I really don\'t understand the appeal of Jackson Pollock’s paintings.',
    'Elephants, cats, dogs, and mice are different species of animals.',
  ];
  for (const d of phaiGiu) assert.ok(!laDongNgoaiBanThu(d), `đáng lẽ phải GIỮ: “${d}”`);
});

test('tách được mục giải nghĩa từ thành dữ liệu riêng', () => {
  const tu = tachTuKho([
    'blizzard – n. a very heavy snowstorm with strong winds.',
    'rehearse – v. to say or do (something) several times in order to practice',
    'Đây là một câu bình thường trong bài, không phải dòng giải nghĩa.',
  ]);
  assert.equal(tu.length, 2);
  assert.deepEqual(tu[0], { word: 'blizzard', pos: 'n', meaning: 'a very heavy snowstorm with strong winds.' });
});

test('lọc xong vẫn giữ nguyên thứ tự các đoạn còn lại', () => {
  const vao = ['Câu một.', 'Andrew Smith wrote this lesson for VOA Learning English.', 'Câu hai.', 'Câu ba.'];
  assert.deepEqual(locBanChepLoi(vao), ['Câu một.', 'Câu hai.', 'Câu ba.']);
});
