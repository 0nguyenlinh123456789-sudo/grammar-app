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

// THIÊN LỆCH ĐỘ DÀI — dấu hiệu bề ngoài thứ hai, cùng loại với chuyện đáp án
// nằm lì ở ô đầu: cho phép đoán đúng mà không cần hiểu bài.
//
// Bản soạn đầu có 84,3% câu mà đáp án đúng là lựa chọn dài nhất (không thiên
// lệch thì phải quanh 25%) — chọn phương án dài nhất mà không đọc bài vẫn đúng
// ~84%. LỖI TÔI TỰ GÂY RA: viết đáp án đúng thành mệnh đề đầy đủ bám sát câu
// căn cứ, rồi thêm ba câu nhiễu ngắn gọn.
//
// ĐÃ SỬA XONG cả ba bậc: soạn lại toàn bộ câu nhiễu thành mệnh đề đầy đủ, độ
// dài xấp xỉ nhau, dựng từ chi tiết có thật trong bài nhưng ghép sai.
//
// Hai con số. "Dài nhất duy nhất" (51,0%) bắt cả những chỗ lệch 1-2 ký tự — mắt
// thường không phân biệt nổi nên đó không phải mẹo dùng được. Con số ĐÁNG LO là
// "dài hơn THẤY ĐƯỢC": đáp án dài hơn lựa chọn nhì từ 10% trở lên, nhìn là thấy
// ngay — con số này còn 6,0%, từ 57,2%. Không còn câu nào lệch quá 40%.
const THIEN_LECH_TOI_DA = 0.510;
const THAY_DUOC_TOI_DA = 0.060;

test(`thiên lệch độ dài chỉ được giảm (dài nhất ${(THIEN_LECH_TOI_DA * 100).toFixed(1)}% · thấy được ${(THAY_DUOC_TOI_DA * 100).toFixed(1)}% · không thiên lệch ≈ 25%)`, async () => {
  const { doThienLech } = await import('../scripts/audit_story_quiz.mjs');
  const r = await doThienLech();
  const ty = r.daiNhatDuyNhat / r.tong;
  const tyThay = r.daiThayDuoc / r.tong;
  assert.ok(ty <= THIEN_LECH_TOI_DA + 0.001,
    `đáp án đúng là lựa chọn dài nhất ở ${(ty * 100).toFixed(1)}% câu — tệ hơn mốc đã ghim. `
    + 'Câu nhiễu phải dài tương đương đáp án, dựng từ nội dung có thật trong bài.');
  assert.ok(tyThay <= THAY_DUOC_TOI_DA + 0.001,
    `đáp án đúng dài hơn thấy được ở ${(tyThay * 100).toFixed(1)}% câu — tệ hơn mốc đã ghim.`);
});

test('phần NGHE không nhận câu mức văn bản, kể cả khi chủ đề có sẵn', () => {
  const s = fs.readFileSync(path.join(ROOT, 'src/components/vocab/ListeningComprehension.jsx'), 'utf8');
  assert.doesNotMatch(s, /storyQuiz/, 'màn hình nghe có nhắc storyQuiz — câu mức văn bản không đọc lên được');
  // Và bản thân hàm dựng: không truyền `story` thì không được tự đi tìm.
  const t = theoId.get(Object.keys(STORY_QUIZ)[0]);
  const nghe = buildComprehension({ words: t.words, authored: t.comprehension, limit: 10 });
  for (const c of nghe) assert.ok(c.playText, 'phần nghe nhận được câu không có gì để đọc lên');
});

// Đường dữ liệu THẬT của ứng dụng, không phải bản xuất thô. App.jsx nạp
// `vocabVstepData` rồi cho qua `sanitizeVocabTopics` và `withUniqueTopicIds`.
// Hai hàm đó dựng lại object; nếu chúng liệt kê trường thay vì spread thì
// `storyQuiz` biến mất trong trình duyệt, 121 chủ đề rơi hết xuống dòng cảnh báo
// "chưa có câu hỏi về bài đọc" — mà mọi test khác vẫn xanh, vì chúng đọc bản
// xuất thô. Kiểm ở đúng hình dạng màn hình nhận được.
test('storyQuiz sống sót qua đường nạp thật của app (sanitize + đánh id duy nhất)', async () => {
  const { sanitizeVocabTopics } = await import(pathToFileURL(path.join(ROOT, 'src/utils/contentFilter.js')).href);
  const app = fs.readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');
  assert.match(app, /withUniqueTopicIds\(sanitizeVocabTopics\(module\.default\)\)/,
    'App.jsx đổi đường nạp chủ đề — cập nhật lại phép kiểm này cho khớp');

  // Dựng lại đúng chuỗi biến đổi App.jsx dùng.
  const seen = new Map();
  const nhuApp = sanitizeVocabTopics(chuDe).map((t) => {
    const n = (seen.get(t.id) || 0) + 1;
    seen.set(t.id, n);
    return n === 1 ? t : { ...t, id: `${t.id}--${n}` };
  });
  const theoIdApp = new Map(nhuApp.map((t) => [t.id, t]));

  const mat = [];
  for (const id of Object.keys(STORY_QUIZ)) {
    const t = theoIdApp.get(id);
    if (!t) { mat.push(`${id}: không còn chủ đề nào mang id này sau khi đánh id duy nhất`); continue; }
    if (!Array.isArray(t.storyQuiz) || t.storyQuiz.length < 4) mat.push(`${id}: storyQuiz mất hoặc còn dưới 4 câu`);
  }
  assert.deepEqual(mat.slice(0, 8), [], `${mat.length} chủ đề mất câu hỏi trên đường tới màn hình:\n  ${mat.slice(0, 8).join('\n  ')}`);
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

// ── PHẠM VI MỞ RỘNG A1/A2 (quyết định 5, chốt 17/08) ─────────────────────────
//
// Vì sao có bánh cóc này thay vì một dòng "sẽ làm" trong KE_HOACH_B2.md: mọi
// dòng khác trong tài liệu đó là một SỐ ĐO, còn "chốt làm 93 chặng" là một LỜI
// HỨA. Lời hứa nằm giữa các số đo thì sớm muộn cũng trôi. Nên con số nằm ở đây,
// và test KỂ TÊN chặng còn thiếu — giống test độ phủ N5 đã làm cho 122 chặng ≥B1.
//
// Ràng buộc tôi từng nêu ("bài đọc A1/A2 phần lớn là chuỗi diễu hành từ vựng")
// ĐÃ ĐO LẠI VÀ SAI: 93/145 chặng đủ điều kiện. Xem scripts/audit_a1a2_story.mjs.
const A1A2_CON_THIEU_TOI_DA = 93;

test('bánh cóc A1/A2: số chặng đủ điều kiện mà CHƯA có câu hỏi chỉ được giảm', async () => {
  const { doA1A2 } = await import(pathToFileURL(path.join(ROOT, 'scripts/audit_a1a2_story.mjs')).href);
  const { daCo, du, khong } = await doA1A2();

  // Tổng phải giữ nguyên 145 chặng A1/A2 — đổi nghĩa là có chủ đề bị thêm/xoá,
  // và lúc đó mọi con số dưới đây phải đo lại chứ không sửa cho vừa.
  assert.equal(daCo.length + du.length + khong.length, 145,
    'số chặng A1/A2 (type vstep) đổi — đo lại bằng node scripts/audit_a1a2_story.mjs');

  assert.ok(du.length <= A1A2_CON_THIEU_TOI_DA,
    `còn ${du.length} chặng đủ điều kiện chưa có câu hỏi, nhiều hơn mức ghim ${A1A2_CON_THIEU_TOI_DA}:\n  `
    + du.slice(0, 10).map((r) => `${r.bac}/${r.id} (${r.tu} từ, ${r.cau} câu)`).join('\n  '));

  // 52 chặng KHÔNG đủ điều kiện phải có lý do ĐO ĐƯỢC cho từng chặng, không phải
  // một câu khái quát — chính câu khái quát của tôi đã sai một lần rồi.
  for (const r of khong) {
    const coLyDo = r.cau < 6 || r.tu < 80 || r.matDo >= 0.35 || r.tuongThuat < 4;
    assert.ok(coLyDo, `${r.id} bị xếp là "không đủ" mà không đạt lý do nào — bộ đo hỏng`);
  }
});
