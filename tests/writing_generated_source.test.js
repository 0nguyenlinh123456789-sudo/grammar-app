// File: tests/writing_generated_source.test.js
// ĐỐI CHIẾU NGƯỢC: từ mục tiêu trong kho đề sinh phải CÓ THẬT trong bộ từ vựng
// và giáo trình soạn tay.
//
// `writingGenerated.js` CHÉP 8 từ của mỗi chặng thay vì tra cứu lúc hiển thị —
// vì tra cứu sẽ kéo chunk 4,9 MB (vocabVstepData) vào mục luyện viết. Cái giá
// của việc chép là DỮ LIỆU CÓ HAI BẢN, và hai bản thì sớm muộn cũng lệch: sửa
// một chủ đề từ vựng mà quên chạy lại bộ sinh thì người học sẽ được yêu cầu
// dùng một từ không còn nằm trong bài họ vừa học.
//
// Đúng cái bẫy "luật chép làm hai bản" đã làm lọt dòng giải nghĩa trong bản chép
// lời VOA (`.{1,20}` với `.{1,25}`). Ở đó chữa bằng cách gom về một bản; ở đây
// không gom được (vì lý do dung lượng), nên phải có bài kiểm đối chiếu.
//
// Test này CÓ tải bộ dữ liệu lớn nên chậm hơn các test khác — đó là cái giá
// xứng đáng để hai bản không lệch âm thầm.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { writingGenerated } from '../src/data/writingGenerated.js';
import { SO_DE_THEO_CHANG } from '../src/data/writingCounts.js';

const DATA = path.resolve('src/data');

// Vài file dữ liệu import nhau bằng đường dẫn không đuôi (Vite giải được, Node
// thì không) — cùng mẹo đã dùng trong các bộ sinh.
async function loadAgg(file, pick) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_test_${file.replace(/\W/g, '_')}.mjs`);
  fs.writeFileSync(tmp, src);
  try { return pick(await import(pathToFileURL(tmp).href)); } finally { fs.rmSync(tmp, { force: true }); }
}

// Cùng luật tách ô với bộ sinh: Oxford ghi "sun / rain / wind / cloud" trong
// MỘT ô, nên phải tách trước khi so.
const tachO = (o) => String(o || '')
  .replace(/\([^)]*\)/g, ' ')
  .replace(/->|→|,|;|\|/g, '/')
  .split('/')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

test('con số hiển thị ở trang chủ khớp với kho đề thật', () => {
  assert.equal(SO_DE_THEO_CHANG, writingGenerated.length,
    'writingCounts.js lệch với writingGenerated.js — chạy lại scripts/build_writing_tasks.mjs');
});

test('mọi từ mục tiêu của đề vstep đều có thật trong chủ đề từ vựng của chặng đó', async () => {
  const topics = await loadAgg('vocabVstepData.js', (m) => m.default);
  const theoId = new Map(topics.map((t) => [t.id, new Set((t.words || []).flatMap((w) => tachO(w.en)))]));

  const lech = [];
  let kiem = 0;
  for (const t of writingGenerated) {
    if (t.type !== 'vstep') continue;
    const kho = theoId.get(t.targetId);
    if (!kho) { lech.push(`${t.id}: chủ đề "${t.targetId}" không còn tồn tại`); continue; }
    for (const w of t.tuMucTieu) {
      kiem += 1;
      if (!kho.has(w)) lech.push(`${t.id}: từ "${w}" không còn trong chủ đề`);
    }
  }
  assert.ok(kiem > 1000, `chỉ đối chiếu được ${kiem} từ — bộ đọc hỏng, test này đang xanh giả`);
  assert.deepEqual(lech.slice(0, 10), [], `kho đề lệch với bộ từ vựng (${lech.length} chỗ) — chạy lại scripts/build_writing_tasks.mjs:\n  ` + lech.slice(0, 10).join('\n  '));
});

test('mọi từ mục tiêu của đề Oxford đều có thật trong coreVocab của unit đó', async () => {
  const SACH = [
    ['elementary', [['oxfordData.js', 'courseData'], ['oxfordDataPart2.js', 'courseData'], ['oxfordDataPart3.js', 'courseData']]],
    ['pre_intermediate', [['oxfordPreIntData.js', 'courseData'], ['oxfordPreIntData51_75.js', 'courseData51_75'], ['oxfordPreIntData76_100.js', 'courseData76_100']]],
    ['advanced', [['oxfordAdvancedData1_25.js', 'courseData1_25'], ['oxfordAdvancedData26_50.js', 'courseData26_50'], ['oxfordAdvancedData51_75.js', 'courseData51_75'], ['oxfordAdvancedData76_100.js', 'courseData76_100']]],
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
  for (const t of writingGenerated) {
    if (t.type !== 'oxford') continue;
    const cv = kho.get(`${t.bookId}:${t.targetId}`);
    if (!cv) { lech.push(`${t.id}: unit không còn tồn tại`); continue; }
    for (const w of t.tuMucTieu) {
      kiem += 1;
      if (!cv.has(w)) lech.push(`${t.id}: từ "${w}" không còn trong unit`);
    }
  }
  assert.ok(kiem > 1000, `chỉ đối chiếu được ${kiem} từ — bộ đọc hỏng, test này đang xanh giả`);
  assert.deepEqual(lech.slice(0, 10), [], `kho đề lệch với giáo trình Oxford (${lech.length} chỗ):\n  ` + lech.slice(0, 10).join('\n  '));
});
