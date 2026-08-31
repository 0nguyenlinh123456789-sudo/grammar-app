// File: tests/quiz_oxford_da_dang.test.js
//
// GHIM: CÂU QUIZ OXFORD PHẢI BẮT NGƯỜI HỌC PHÂN BIỆT CÁC TỪ VỪA HỌC.
//
// ══ ĐO ĐƯỢC 31/08 ══ (node scripts/audit_oxford_templates.mjs)
// Bộ pre_intermediate (B1) có 200/1007 câu quiz đúc từ MỘT khuôn:
//     "Đâu là loại từ (Part of Speech) chính xác của từ \"{X}\"?"
// 4 câu mỗi unit × 50 unit. Toàn bộ 200 câu chỉ dùng 19 PHƯƠNG ÁN khác nhau —
// cả 19 đều là nhãn ngữ pháp ("Danh từ", "Động từ", "Cụm giới từ"…).
//
// Đó không phải "câu dễ", mà là câu KHÔNG DẠY GÌ: đáp án nằm nguyên trong
// trường `type` của chính từ đó, còn nhiễu lấy từ một tập nhãn đóng nên sau vài
// câu người học đoán theo hình dạng từ. Học xong 200 câu vẫn không biết từ đó
// nghĩa gì hay dùng thế nào.
//
// ══ DÙNG THẲNG PHÉP ĐO CỦA BỘ AUDIT ══
// Bài kiểm này gọi `doQuiz()` của scripts/audit_oxford_templates.mjs thay vì tự
// dựng phép đo riêng. Bản đầu tôi tự đếm bằng `unit.words` trong khi bộ audit
// đếm bằng `unit.theory.coreVocab` — hai con số lệch nhau, và bài kiểm báo đỏ
// cả nội dung ĐANG TỐT (bộ advanced). Một phép đo thứ hai, lệch với phép đo
// gốc, tệ hơn là không có phép đo nào.
//
// ══ MỐC LẤY TỪ SỐ ĐO THẬT, KHÔNG BỊA ══
//   khuôn hỏng (cũ)      : 19 phương án / 200 câu = 0,10 mỗi câu
//   pre_int "Từ nào…"    : 392 / 400            = 0,98
//   advanced "Nghĩa nào…": 399 / 100            = 3,99
// Mốc 0,5 nằm giữa, cách cả hai phía rất xa.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { napUnits, doQuiz } from '../scripts/audit_oxford_templates.mjs';

const MOC_PHUONG_AN = 0.5;
const DUNG_NHIEU = 20;   // dưới ngưỡng này thì không phải vấn đề hệ thống

test('không còn câu quiz hỏi loại từ — đáp án nằm sẵn trong dữ liệu của chính từ đó', async () => {
  const units = await napUnits();
  const dinh = [];
  for (const { book, unit } of units) {
    for (const q of unit.quiz || []) {
      if (/loại từ \(Part of Speech\)/i.test(String(q.q || q.question || ''))) dinh.push(`${book}:${unit.id}`);
    }
  }
  assert.deepEqual([...new Set(dinh)].slice(0, 8), [],
    `${dinh.length} câu còn hỏi loại từ — xem scripts/dung_lai_quiz_preint.mjs`);
});

test('khuôn câu dùng nhiều lần phải có đủ phương án riêng biệt', async () => {
  const ho = doQuiz(await napUnits());
  const hong = [];
  for (const h of ho) {
    if (h.n < DUNG_NHIEU) continue;
    const tiLe = h.nhan.size / h.n;
    if (tiLe < MOC_PHUONG_AN) {
      hong.push(`${h.book} · ${h.khuon.slice(0, 50)} — ${h.nhan.size} phương án cho ${h.n} câu (${tiLe.toFixed(2)}/câu)`);
    }
  }
  assert.deepEqual(hong.slice(0, 5), [],
    `${hong.length} khuôn quá nghèo phương án — người học thuộc bộ đáp án thay vì học từ`);
});
