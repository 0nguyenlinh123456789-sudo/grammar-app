// File: tests/story_quiz.test.js
// GHIM VIỆC 3.1 — CÂU HỎI ĐỌC HIỂU MỨC VĂN BẢN.
//
// Bốn thứ dễ vỡ, mỗi thứ một test:
//   1. CĂN CỨ PHẢI NGUYÊN VĂN. Không có phép kiểm này thì một đáp án sai nằm
//      lẫn trong hàng trăm câu là vĩnh viễn không ai thấy, và về mặt máy móc
//      không có gì phân biệt câu hỏi có căn cứ với câu hỏi bịa nghe hợp lý.
//   2. ĐÁP ÁN PHẢI ĐƯỢC XÁO. Bộ câu hỏi soạn tay duy nhất có trước việc này
//      (`travel-transport`) có 5/5 câu `answer: 0` — bấm ô đầu là đúng 100%.
//      Lỗi nằm ở mã chứ không ở người soạn, nên phép kiểm cũng đặt ở mã.
//   3. CÂU MỨC VĂN BẢN KHÔNG ĐƯỢC LỌT SANG PHẦN NGHE. Nó không có gì để đọc
//      lên; đưa vào phần nghe là ra một câu hỏi câm.
//   4. BÁNH CÓC CHỈ GHIM SỐ ĐANG CÓ. N5 đòi 122 chặng ≥B1; ghim 122 khi mới
//      soạn xong một phần là đúng cái lỗi cả chuỗi này đang sửa.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { STORY_QUIZ } from '../src/data/storyQuiz.js';
import { buildComprehension } from '../src/utils/comprehension.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

// Bánh cóc: chỉ được tăng. Số ĐO ĐƯỢC khi soạn xong cả ba bậc B1, B2 và C1 —
// 121/122 chặng ≥B1 (một chặng loại có lý do, xem đầu src/data/storyQuiz.js).
const CHU_DE_TOI_THIEU = 121;
const CAU_HOI_TOI_THIEU = 484;

async function napGop(file, pick) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_sq_${file.replace(/\W/g, '_')}.mjs`);
  fs.writeFileSync(tmp, src);
  try { return pick(await import(pathToFileURL(tmp).href)); } finally { fs.rmSync(tmp, { force: true }); }
}

const chuDe = await napGop('vocabVstepData.js', (m) => m.default);
const theoId = new Map(chuDe.map((t) => [t.id, t]));

// Dấu nháy cong và nháy thẳng là hai ký tự khác nhau — người soạn gõ kiểu này,
// dữ liệu gốc dùng kiểu kia, và phép so nguyên văn sẽ báo sai ở chỗ thật ra
// đúng. Chuẩn hoá nháy + khoảng trắng TRƯỚC khi so, chứ không nới lỏng phép so.
const chuan = (s) => String(s || '')
  .replace(/[‘’ʼ]/g, "'")
  .replace(/[“”]/g, '"')
  .replace(/\s+/g, ' ')
  .trim();

test(`bánh cóc: ≥ ${CHU_DE_TOI_THIEU} chủ đề có câu hỏi mức văn bản, ≥ ${CAU_HOI_TOI_THIEU} câu`, () => {
  const ids = Object.keys(STORY_QUIZ);
  const tong = ids.reduce((n, id) => n + STORY_QUIZ[id].length, 0);
  assert.ok(ids.length >= CHU_DE_TOI_THIEU, `mới ${ids.length} chủ đề`);
  assert.ok(tong >= CAU_HOI_TOI_THIEU, `mới ${tong} câu`);
});

// N5 nói "đọc hiểu theo VĂN BẢN ở mọi chặng ≥B1". Đếm số câu là chưa đủ: soạn
// 484 câu cho 20 chặng cũng qua được bánh cóc trên. Phép kiểm thật là ĐỘ PHỦ —
// và nó phải kể tên chặng nào chưa có, không im lặng.
test('N5 — độ phủ: mọi chặng ≥B1 đều có câu hỏi mức văn bản, trừ đúng một chặng đã BÁO', async () => {
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const B1CONG = new Set(['B1', 'B2', 'C1']);
  // Chặng loại có lý do — bài đọc 60 từ / 3 câu, không đủ cho 4 câu mức văn bản.
  // Ghi tên ra đây chứ không lọc theo mẫu: một chặng rơi ra vì lý do khác sẽ đỏ.
  const LOAI_CO_LY_DO = new Set(['digital-society-100']);

  const thieu = [];
  let tong = 0;
  for (const bac of roadmapData) {
    for (const m of bac.milestones || []) {
      if (m.type !== 'vstep' || !B1CONG.has(m.cefr)) continue;
      tong += 1;
      if (STORY_QUIZ[m.targetId] || LOAI_CO_LY_DO.has(m.targetId)) continue;
      thieu.push(`${m.cefr} · ${m.targetId}`);
    }
  }
  assert.equal(tong, 122, `số chặng ≥B1 đổi thành ${tong} — đo lại phạm vi N5`);
  assert.deepEqual(thieu, [], `${thieu.length} chặng ≥B1 chưa có câu hỏi mức văn bản:\n  ${thieu.join('\n  ')}`);

  // Và mục loại trừ phải còn sống: chặng biến mất thì gỡ khỏi danh sách.
  for (const id of LOAI_CO_LY_DO) {
    assert.ok(theoId.has(id), `${id} nằm trong danh sách loại có lý do nhưng không còn tồn tại — gỡ đi`);
    assert.ok(!STORY_QUIZ[id], `${id} đã có câu hỏi rồi — gỡ khỏi danh sách loại`);
  }
});

test('mỗi chủ đề có ≥4 câu — dưới 4 thì panel TỰ BIẾN MẤT chứ không báo lỗi', () => {
  // ReadingComprehension: `if (pool.length < 4) return null`. Soạn 3 câu cho một
  // chủ đề là làm phần kiểm tra lặng lẽ không hiện ra.
  for (const [id, ds] of Object.entries(STORY_QUIZ)) {
    assert.ok(ds.length >= 4, `${id}: chỉ ${ds.length} câu, panel sẽ không hiện`);
  }
});

test('CĂN CỨ NGUYÊN VĂN: mỗi `dan` phải có thật trong storyEn của chính chủ đề đó', () => {
  const hong = [];
  for (const [id, ds] of Object.entries(STORY_QUIZ)) {
    const t = theoId.get(id);
    if (!t) { hong.push(`${id}: không có chủ đề nào mang id này`); continue; }
    const bai = chuan(t.storyEn);
    for (const q of ds) {
      if (!q.dan) { hong.push(`${id}: câu "${q.q.slice(0, 40)}…" thiếu căn cứ`); continue; }
      if (!bai.includes(chuan(q.dan))) hong.push(`${id}: căn cứ KHÔNG có trong bài — "${q.dan.slice(0, 60)}…"`);
    }
  }
  assert.deepEqual(hong.slice(0, 10), [], `${hong.length} chỗ hỏng:\n  ${hong.slice(0, 10).join('\n  ')}`);
});

test('câu hỏi lành lặn: đáp án nằm trong lựa chọn, không lựa chọn nào trùng nhau', () => {
  for (const [id, ds] of Object.entries(STORY_QUIZ)) {
    for (const q of ds) {
      assert.ok(Array.isArray(q.options) && q.options.length >= 3, `${id}: quá ít lựa chọn`);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length,
        `${id}: chỉ số đáp án ${q.answer} nằm ngoài danh sách lựa chọn`);
      assert.equal(new Set(q.options).size, q.options.length, `${id}: lựa chọn trùng nhau ở "${q.q.slice(0, 40)}…"`);
      assert.ok(!/^\s*$/.test(q.q), `${id}: câu hỏi rỗng`);
    }
  }
});

test('KHÔNG có trường `en`: đó là thứ chặn câu mức văn bản lọt sang phần nghe', () => {
  for (const [id, ds] of Object.entries(STORY_QUIZ)) {
    for (const q of ds) {
      assert.equal(q.en, undefined, `${id}: có trường "en" — câu mức văn bản không được kèm câu trích`);
    }
  }
});

test('vị trí đáp án đúng được XÁO, không nằm lì ở ô đầu', () => {
  // Chạy nhiều lượt trên cùng một bộ câu: nếu thứ tự lựa chọn không được xáo thì
  // đáp án đúng luôn ở ô 0 và phép đếm dưới đây sẽ ra đúng một giá trị.
  const dsGoc = STORY_QUIZ[Object.keys(STORY_QUIZ)[0]];
  const viTri = new Set();
  for (let i = 0; i < 60; i += 1) {
    for (const c of buildComprehension({ words: [], story: dsGoc, limit: 8 })) {
      viTri.add(c.options.findIndex((o) => o.correct));
    }
  }
  assert.ok(viTri.size >= 3, `đáp án đúng chỉ rơi vào ${viTri.size} vị trí — lựa chọn không được xáo`);
});

test('phần NGHE không nhận câu mức văn bản, kể cả khi chủ đề có sẵn', () => {
  const s = fs.readFileSync(path.join(ROOT, 'src/components/vocab/ListeningComprehension.jsx'), 'utf8');
  assert.doesNotMatch(s, /storyQuiz/, 'màn hình nghe có nhắc storyQuiz — câu mức văn bản không đọc lên được');
  // Và bản thân hàm dựng: không truyền `story` thì không được tự đi tìm.
  const t = theoId.get(Object.keys(STORY_QUIZ)[0]);
  const nghe = buildComprehension({ words: t.words, authored: t.comprehension, limit: 10 });
  for (const c of nghe) assert.ok(c.playText, 'phần nghe nhận được câu không có gì để đọc lên');
});

test('màn hình ĐỌC nhận câu mức văn bản và BÁO khi chủ đề chưa có', () => {
  const s = fs.readFileSync(path.join(ROOT, 'src/components/vocab/ReadingComprehension.jsx'), 'utf8');
  assert.match(s, /buildComprehension\(\{ words, authored, story, limit: 8 \}\)/, 'màn hình đọc không truyền story');
  assert.match(s, /chưa có câu hỏi về bài đọc/, 'không báo khi chủ đề chỉ có câu hỏi mức câu');
  assert.match(s, /Căn cứ trong bài/, 'không hiện căn cứ nguyên văn sau khi người học chọn');
  const p = fs.readFileSync(path.join(ROOT, 'src/pages/VocabVstepPage.jsx'), 'utf8');
  assert.match(p, /story=\{activeTopic\.storyQuiz\}/, 'trang từ vựng không truyền storyQuiz xuống');
});

// Điểm xuất phát thật của việc 3.1 là 0/267, không phải 1/267: chủ đề duy nhất
// có câu soạn tay trước đó là câu MỨC CÂU, không dính gì tới bài đọc. Test này
// giữ lại bằng chứng cho con số đó.
test('bộ câu soạn tay cũ là mức CÂU, không phải mức văn bản', async () => {
  const cu = theoId.get('travel-transport');
  assert.ok(Array.isArray(cu.comprehension) && cu.comprehension.length, 'mất bộ câu cũ');
  const bai = chuan(cu.storyEn);
  const trongBai = cu.comprehension.filter((q) => bai.includes(chuan(q.en))).length;
  assert.equal(trongBai, 0, 'bộ câu cũ hoá ra có gắn với bài đọc — sửa lại ghi chú 0/267');
});
