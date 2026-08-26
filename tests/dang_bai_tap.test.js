// File: tests/dang_bai_tap.test.js
// KHUÔN CỦA TỪNG DẠNG BÀI TẬP PHẢI KHỚP THỨ MÀN HÌNH ĐỌC.
//
// ══ VÌ SAO CÓ FILE NÀY ══
// Vòng kiểm 26/08 soạn hai bài ngữ pháp C1 mới và soạn SAI khuôn ba trong sáu
// dạng bài tập:
//
//   matching        kho dùng [{ pairs: [{left, right}] }] — soạn thành [{left, right}] phẳng
//   trueFalse       kho dùng { sentence, isCorrect, correction, explanation, trans }
//                   — soạn thành { statement, answer, explanation }
//   transformation  kho dùng { original, instruction, keyword, a }
//                   — soạn thành { original, hint, answer, trans }
//
// Không có gì đỏ. 500 test xanh, lint sạch, build xanh, bộ lái trình duyệt
// 22/22 — vì bộ lái mở bài `b1_01` chứ không mở bài mới, và mọi test khác chỉ
// ĐẾM số câu bài tập chứ không hỏi câu đó có vẽ ra được không.
//
// Đây đúng là lớp lỗi mà chính vòng này vừa vá ở chỗ khác: `AiAssistant` lọc
// `s.text` nên ba bài dùng khuôn { en, vi } mất sạch câu mẫu, cũng lặng lẽ y
// hệt. Vá một chỗ rồi tự dẫm lại ngay trong cùng một đợt.
//
// ══ LUẬT CỦA FILE NÀY ══
// Khuôn được LẤY TỪ MÀN HÌNH, không phải từ trí nhớ: mỗi phép kiểm ghi rõ file
// nào đọc trường nào. Sửa màn hình mà quên sửa đây thì đây đỏ, và ngược lại.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { viTriTuSai } from '../src/utils/tuSaiTrongCau.js';
import { foundationData } from '../src/data/foundationData.js';
import { grammarDataA1 } from '../src/data/grammarDataA1.js';
import { grammarDataB1 } from '../src/data/grammarDataB1.js';
import { grammarDataB2 } from '../src/data/grammarDataB2.js';
import { grammarDataC1C2 } from '../src/data/grammarDataC1C2.js';
import { grammarDataC1Nghia } from '../src/data/grammarDataC1Nghia.js';

const KHO = [...foundationData, ...grammarDataA1, ...grammarDataB1, ...grammarDataB2,
  ...grammarDataC1C2, ...grammarDataC1Nghia];

test('đọc được cả kho bài ngữ pháp — nếu không thì mọi kết luận dưới đây vô nghĩa', () => {
  assert.ok(KHO.length >= 95, `chỉ đọc được ${KHO.length} bài`);
});

/** Gom mọi mục của một dạng, kèm tên bài để lời báo chỉ đúng chỗ. */
const gom = (khoa) => KHO.flatMap((t) => (t[khoa] || []).map((x, i) => ({ t, x, i })));

// ── exercises → QuizEngine.jsx đọc `q`, `opts`, `a` ────────────────────────
test('exercises: có câu hỏi, có đủ phương án, và đáp án NẰM TRONG phương án', () => {
  const xau = [];
  for (const { t, x, i } of gom('exercises')) {
    if (!x.q) xau.push(`${t.id}#${i}: thiếu q`);
    else if (!Array.isArray(x.opts) || x.opts.length < 2) xau.push(`${t.id}#${i}: dưới 2 phương án`);
    else if (x.a === undefined) xau.push(`${t.id}#${i}: thiếu a`);
    else if (!x.opts.includes(x.a)) xau.push(`${t.id}#${i}: đáp án "${x.a}" KHÔNG có trong phương án — bấm gì cũng sai`);
  }
  assert.deepEqual(xau.slice(0, 15), [], `${xau.length} mục hỏng:\n  ` + xau.slice(0, 15).join('\n  '));
});

// ── fillBlanks → FillBlanksExercise.jsx đọc `q`, `a`, `trans` ──────────────
test('fillBlanks: có chỗ trống, có đáp án', () => {
  const xau = [];
  for (const { t, x, i } of gom('fillBlanks')) {
    if (!x.q) xau.push(`${t.id}#${i}: thiếu q`);
    else if (!/_/.test(x.q)) xau.push(`${t.id}#${i}: câu không có chỗ trống nào: "${x.q}"`);
    if (!x.a) xau.push(`${t.id}#${i}: thiếu đáp án`);
  }
  assert.deepEqual(xau.slice(0, 15), [], `${xau.length} mục hỏng:\n  ` + xau.slice(0, 15).join('\n  '));
});

// ── errorCorrection → ErrorCorrectionExercise.jsx đọc `sentence`, `errorWord`,
//    `correction`, `explanation`. Người học BẤM VÀO TỪ trong câu, và màn hình
//    so `word === errorWord` sau khi bỏ dấu câu — nên `errorWord` phải THẬT SỰ
//    là một từ có trong câu, nếu không thì bấm cả câu đều sai.
test('errorCorrection: chỗ sai phải BẤM ĐƯỢC — dùng đúng phép tìm mà màn hình dùng', () => {
  const xau = [];
  for (const { t, x, i } of gom('errorCorrection')) {
    if (!x.sentence || !x.errorWord) { xau.push(`${t.id}#${i}: thiếu sentence hoặc errorWord`); continue; }
    // Gọi ĐÚNG hàm màn hình gọi. Nếu ở đây tự viết lại phép so thì hai bên lệch
    // nhau lúc nào không biết — và lỗ này sinh ra chính vì hai bên lệch.
    if (viTriTuSai(x.sentence, x.errorWord).size === 0) {
      xau.push(`${t.id}#${i}: chỗ sai "${x.errorWord}" không khớp từ/cụm nào trong câu "${x.sentence}" — bấm gì cũng sai, và sau khi chấm không có chữ nào được tô đỏ`);
    }
    if (!x.correction) xau.push(`${t.id}#${i}: thiếu correction`);
  }
  assert.deepEqual(xau.slice(0, 15), [], `${xau.length} mục hỏng:\n  ` + xau.slice(0, 15).join('\n  '));
});

// ── transformation → TransformationExercise.jsx đọc `original`, `instruction`,
//    `keyword`, `a`. Soạn nhầm thành hint/answer thì màn hình ra ô trống.
test('transformation: đúng khuôn original / instruction / a', () => {
  const xau = [];
  for (const { t, x, i } of gom('transformation')) {
    for (const k of ['original', 'instruction', 'a']) {
      if (!x[k]) xau.push(`${t.id}#${i}: thiếu "${k}" (có: ${Object.keys(x).join(', ')})`);
    }
  }
  assert.deepEqual(xau.slice(0, 15), [], `${xau.length} mục hỏng:\n  ` + xau.slice(0, 15).join('\n  '));
});

// ── trueFalse → TrueFalseExercise.jsx đọc `sentence`, `isCorrect`,
//    `correction`, `explanation`, `trans`. Câu SAI thì phải kèm bản sửa —
//    không thì người học biết mình sai mà không biết đúng là thế nào.
test('trueFalse: đúng khuôn sentence / isCorrect, và câu SAI phải có bản sửa', () => {
  const xau = [];
  for (const { t, x, i } of gom('trueFalse')) {
    if (!x.sentence) xau.push(`${t.id}#${i}: thiếu "sentence" (có: ${Object.keys(x).join(', ')})`);
    if (typeof x.isCorrect !== 'boolean') xau.push(`${t.id}#${i}: "isCorrect" không phải true/false`);
    else if (x.isCorrect === false && !x.correction) xau.push(`${t.id}#${i}: câu sai mà không có bản sửa`);
  }
  assert.deepEqual(xau.slice(0, 15), [], `${xau.length} mục hỏng:\n  ` + xau.slice(0, 15).join('\n  '));
});

// ── matching → MatchingExercise.jsx đọc `pairs` rồi `text` bên trong.
//    Soạn phẳng [{left,right}] thì `pairs` là undefined và tab ra màn trắng.
test('matching: mỗi bộ phải có `pairs`, và mỗi cặp có đủ hai vế', () => {
  const xau = [];
  for (const { t, x, i } of gom('matching')) {
    if (!Array.isArray(x.pairs)) {
      xau.push(`${t.id}#${i}: không có "pairs" (có: ${Object.keys(x).join(', ')}) — màn hình sẽ ra trắng`);
      continue;
    }
    if (x.pairs.length < 2) xau.push(`${t.id}#${i}: dưới 2 cặp thì không ghép được`);
    x.pairs.forEach((p, j) => {
      if (!p || !p.left || !p.right) xau.push(`${t.id}#${i}.${j}: cặp thiếu vế`);
    });
  }
  assert.deepEqual(xau.slice(0, 15), [], `${xau.length} mục hỏng:\n  ` + xau.slice(0, 15).join('\n  '));
});

// ── CHỐT: bảng khuôn ở trên phải KHỚP với thứ màn hình thật sự đọc ─────────
// Không có phép kiểm này thì file này chỉ ghim trí nhớ của người viết nó. Ai
// đổi tên trường trong một màn hình mà quên sửa đây thì đây vẫn xanh, và lỗ
// lại mở đúng như cũ.
test('tên trường trong file này khớp với tên trường màn hình thật sự đọc', () => {
  const DOC = {
    'src/components/grammar/MatchingExercise.jsx': ['pairs'],
    'src/components/grammar/ErrorCorrectionExercise.jsx': ['sentence', 'errorWord', 'correction'],
    'src/components/grammar/TransformationExercise.jsx': ['original', 'instruction', 'a'],
    'src/components/grammar/TrueFalseExercise.jsx': ['sentence', 'isCorrect', 'correction'],
    'src/components/grammar/FillBlanksExercise.jsx': ['q', 'a'],
    'src/components/grammar/QuizEngine.jsx': ['q', 'a'],
  };
  const thieu = [];
  for (const [f, truong] of Object.entries(DOC)) {
    const src = readFileSync(f, 'utf8');
    for (const k of truong) {
      if (!new RegExp(`\\.${k}\\b`).test(src)) thieu.push(`${f} không còn đọc trường "${k}" — bảng khuôn ở đây đã lạc hậu`);
    }
  }
  assert.deepEqual(thieu, [], thieu.join('\n  '));
});
