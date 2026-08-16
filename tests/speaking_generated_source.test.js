// File: tests/speaking_generated_source.test.js
// ĐỐI CHIẾU NGƯỢC cho kho đề nói: 8 từ mục tiêu chép vào `speakingGenerated.js`
// phải CÓ THẬT trong bộ từ vựng / giáo trình soạn tay.
//
// Cùng lý do với `writing_generated_source.test.js`: chép để khỏi kéo chunk
// 4,9 MB vào mục luyện nói, nhưng chép thì dữ liệu có hai bản, và hai bản thì
// sớm muộn cũng lệch. Khác một điểm: luật tách ô ở đây KHÔNG chép lại mà
// import từ `scripts/lib/vocab_pick.mjs` — bài kiểm chép lại luật của thứ nó đi
// kiểm thì khi lệch nó lệch cùng chiều.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { speakingGenerated } from '../src/data/speakingGenerated.js';
import { tachO } from '../scripts/lib/vocab_pick.mjs';

const DATA = path.resolve('src/data');

async function loadAgg(file, pick) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_stest_${file.replace(/\W/g, '_')}.mjs`);
  fs.writeFileSync(tmp, src);
  try { return pick(await import(pathToFileURL(tmp).href)); } finally { fs.rmSync(tmp, { force: true }); }
}

test('mọi từ mục tiêu của đề nói vstep đều có thật trong chủ đề từ vựng của chặng đó', async () => {
  const topics = await loadAgg('vocabVstepData.js', (m) => m.default);
  const theoId = new Map(topics.map((t) => [t.id, new Set((t.words || []).flatMap((w) => tachO(w.en)))]));

  const lech = [];
  let kiem = 0;
  for (const t of speakingGenerated) {
    if (t.type !== 'vstep') continue;
    const kho = theoId.get(t.targetId);
    if (!kho) { lech.push(`${t.id}: chủ đề "${t.targetId}" không còn tồn tại`); continue; }
    for (const w of t.tuMucTieu) {
      kiem += 1;
      if (!kho.has(w)) lech.push(`${t.id}: từ "${w}" không còn trong chủ đề`);
    }
  }
  assert.ok(kiem > 400, `chỉ đối chiếu được ${kiem} từ — bộ đọc hỏng, test này đang xanh giả`);
  assert.deepEqual(lech.slice(0, 10), [],
    `kho đề nói lệch với bộ từ vựng (${lech.length} chỗ) — chạy lại scripts/build_speaking_tasks.mjs:\n  ${lech.slice(0, 10).join('\n  ')}`);
});

test('mọi từ mục tiêu của đề nói Oxford đều có thật trong coreVocab của unit đó', async () => {
  const SACH = [
    ['pre_intermediate', [['oxfordPreIntData.js', 'courseData'], ['oxfordPreIntData51_75.js', 'courseData51_75'], ['oxfordPreIntData76_100.js', 'courseData76_100']]],
    ['advanced', [['oxfordAdvancedData1_25.js', 'courseData1_25'], ['oxfordAdvancedData26_50.js', 'courseData26_50'], ['oxfordAdvancedData51_75.js', 'courseData51_75'], ['oxfordAdvancedData76_100.js', 'courseData76_100']]],
    ['elementary', [['oxfordData.js', 'courseData'], ['oxfordDataPart2.js', 'courseData'], ['oxfordDataPart3.js', 'courseData']]],
  ];
  const kho = new Map();
  for (const [book, parts] of SACH) {
    for (const [f, k] of parts) {
      const m = await import(pathToFileURL(path.join(DATA, f)).href);
      for (const u of m[k] || []) kho.set(`${book}:${u.id}`, new Set((u.theory?.coreVocab || []).flatMap((w) => tachO(w.word || w.en))));
    }
  }

  const lech = [];
  let kiem = 0;
  for (const t of speakingGenerated) {
    if (t.type !== 'oxford') continue;
    const cv = kho.get(`${t.bookId}:${t.targetId}`);
    if (!cv) { lech.push(`${t.id}: unit không còn tồn tại`); continue; }
    for (const w of t.tuMucTieu) {
      kiem += 1;
      if (!cv.has(w)) lech.push(`${t.id}: từ "${w}" không còn trong unit`);
    }
  }
  assert.ok(kiem > 400, `chỉ đối chiếu được ${kiem} từ — bộ đọc hỏng, test này đang xanh giả`);
  assert.deepEqual(lech.slice(0, 10), [],
    `kho đề nói lệch với giáo trình Oxford (${lech.length} chỗ):\n  ${lech.slice(0, 10).join('\n  ')}`);
});
