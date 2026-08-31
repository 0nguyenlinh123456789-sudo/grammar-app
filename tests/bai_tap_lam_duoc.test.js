// File: tests/bai_tap_lam_duoc.test.js
//
// GHIM: MỌI BÀI TẬP NGỮ PHÁP PHẢI THẬT SỰ LÀM ĐƯỢC, Ở MỌI BẬC.
//
// ══ VÌ SAO CÓ PHÉP ĐO NÀY ══
// 31/08 rà ra một lỗi mà không bộ kiểm nào bắt được, ở đúng bậc cao nhất:
//
//   · 75/75 bài "Viết lại câu" của C1+ có `a` GIỐNG HỆT `original`;
//   · 73/125 bài "Sửa lỗi" của C1+ có `errorWord` GIỐNG HỆT `correction`;
//   · 23 bài "Điền từ" còn nguyên câu giữ chỗ của máy sinh:
//     "This is a C1/C2 level practice _____." → "sentence".
//
// ══ HẬU QUẢ THẬT SỰ LÀ GÌ ══
// KHÔNG phải "chấm điểm giả". `locBaiHong()` trong src/utils/grammarClean.js
// lọc sạch ba loại câu này TRƯỚC KHI tới màn hình, đúng luật của dự án là
// "thiếu dữ liệu thì ẨN hoặc BÁO, không im lặng". Không người học nào chép lại
// câu đề rồi được chấm đúng.
//
// Hậu quả là bậc C1+ MỎNG HƠN HẲN các bậc dưới, và mỏng một cách lặng lẽ:
//
//        bậc   sửa lỗi   viết lại   điền từ   số bài mất hẳn tab "Viết Lại"
//        B1    165/165   119/119    220/220   0/28
//        B2    125/125    75/75     150/150   0/25
//        C1+    52/125     0/75     130/150   25/25   ← cả 25 bài
//
// Tức là ở đúng bậc mà sản phẩm gọi là "nền C1", một LOẠI BÀI TẬP biến mất
// hoàn toàn, còn bài sửa lỗi chỉ còn 42%. Bộ lọc che được cái sai, nhưng không
// bù được cái thiếu — và vì nó che êm nên không có gì báo động.
//
// Ba dữ liệu này do máy sinh ra ("Auto-generated C1/C2 Grammar Data"), nên phép
// đo phải nằm trong `npm test`: không có nó thì đợt sinh nội dung sau lại đẻ ra
// đúng loại câu giữ chỗ này, bộ lọc lại lặng lẽ nuốt, và lại không ai biết.
//
// Phép đo áp cho TẤT CẢ các bậc, không riêng C1+ — bậc dưới đang sạch, và phải
// giữ nguyên như vậy.

import { test } from 'node:test';
import assert from 'node:assert/strict';
// Nạp thẳng từng file bậc, KHÔNG qua `grammarData.js`: file gộp đó dùng import
// không đuôi (Vite giải được, `node --test` thì không).
import { grammarDataA1 } from '../src/data/grammarDataA1.js';
import { grammarDataB1 } from '../src/data/grammarDataB1.js';
import { grammarDataB2 } from '../src/data/grammarDataB2.js';
import { grammarDataC1C2 } from '../src/data/grammarDataC1C2.js';
import { grammarDataC1Nghia } from '../src/data/grammarDataC1Nghia.js';

const parsedGrammarData = [
  ...grammarDataA1, ...grammarDataB1, ...grammarDataB2,
  ...grammarDataC1C2, ...grammarDataC1Nghia,
];

const chuan = (v) => String(v ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const boDauCau = (v) => chuan(v).replace(/[.,!?;:"'’“”]/g, '');

/** Câu giữ chỗ mà máy sinh nội dung hay để lại. */
const MAU_GIU_CHO = /this is a .{0,20}level practice/i;

test('Sửa lỗi: từ sai và từ sửa KHÔNG được giống nhau', () => {
  const hong = [];
  for (const bai of parsedGrammarData) {
    for (const e of bai.errorCorrection || []) {
      if (chuan(e.errorWord) === chuan(e.correction)) {
        hong.push(`${bai.id} · "${e.errorWord}" → "${e.correction}"`);
      }
    }
  }
  assert.deepEqual(hong.slice(0, 8), [],
    `${hong.length} bài sửa lỗi có từ sai TRÙNG từ sửa — không có gì để sửa, nên bị lọc bỏ khỏi màn hình`);
});

test('Sửa lỗi: từ sai phải THỰC SỰ nằm trong câu', () => {
  const hong = [];
  for (const bai of parsedGrammarData) {
    for (const e of bai.errorCorrection || []) {
      if (!boDauCau(e.sentence).includes(boDauCau(e.errorWord))) {
        hong.push(`${bai.id} · không tìm thấy "${e.errorWord}" trong "${e.sentence}"`);
      }
    }
  }
  assert.deepEqual(hong.slice(0, 8), [],
    `${hong.length} bài sửa lỗi chỉ vào một từ không có trong câu — không thể bấm trúng`);
});

test('Viết lại câu: câu đích KHÔNG được trùng câu gốc', () => {
  const hong = [];
  for (const bai of parsedGrammarData) {
    for (const e of bai.transformation || []) {
      if (chuan(e.original) === chuan(e.a)) {
        hong.push(`${bai.id} · "${String(e.original).slice(0, 60)}"`);
      }
    }
  }
  assert.deepEqual(hong.slice(0, 8), [],
    `${hong.length} bài viết lại có đáp án TRÙNG câu đề — không có gì để viết lại, nên bị lọc bỏ khỏi màn hình`);
});

// KHÔNG ghim `keyword`: `grammarClean.js` không đòi, và 6 câu B1 soạn tay không
// có `keyword` vẫn dùng được — nó chỉ là gợi ý. Ghim chặt hơn app là ghim sai chỗ.
test('Viết lại câu: đề bài phải nói rõ phải đổi sang cấu trúc nào', () => {
  const hong = [];
  for (const bai of parsedGrammarData) {
    for (const e of bai.transformation || []) {
      // "Viết lại câu giữ nguyên nghĩa." là đề bài rỗng nghĩa: giữ nguyên nghĩa
      // BẰNG CÁCH NÀO mới là bài tập. Máy sinh dùng đúng câu này cho cả 75 bài.
      if (/^viết lại câu giữ nguyên nghĩa\.?$/i.test(String(e.instruction || '').trim())) {
        hong.push(`${bai.id} · đề bài không nói phải đổi sang cấu trúc nào`);
      }
    }
  }
  assert.deepEqual(hong.slice(0, 8), [],
    `${hong.length} bài viết lại có đề bài rỗng nghĩa`);
});

test('Không còn câu giữ chỗ của máy sinh trong bài tập', () => {
  const hong = [];
  for (const bai of parsedGrammarData) {
    for (const [ten, ds] of [['điền từ', bai.fillBlanks], ['trắc nghiệm', bai.exercises], ['viết lại', bai.transformation], ['sửa lỗi', bai.errorCorrection]]) {
      for (const e of ds || []) {
        const text = [e.q, e.sentence, e.original, e.trans].filter(Boolean).join(' ');
        if (MAU_GIU_CHO.test(text)) hong.push(`${bai.id} · ${ten}: "${String(e.q || e.sentence || e.original).slice(0, 60)}"`);
      }
    }
  }
  assert.deepEqual(hong.slice(0, 8), [],
    `${hong.length} câu còn nguyên chỗ giữ của máy sinh nội dung`);
});
