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
const CHU_DE_TOI_THIEU = 269;
const CAU_HOI_TOI_THIEU = 1079;

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
  assert.equal(tong, 125, `số chặng ≥B1 đổi thành ${tong} — đo lại phạm vi N5`);
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
// SIẾT 19/08 sau khi thêm 52 câu A1: đo lại toàn kho 908 câu ra 37,9% (từ mốc
// 39,8%). Bánh cóc thì phải đi theo — để mốc đứng yên trong khi kho lớn lên là
// đúng cái đã xảy ra với `DE_TOI_THIEU` (đứng ở 531 khi kho đã 621). Chừa lại
// một chút biên như bản trước, không siết sát mép.
// SIẾT LẦN HAI 19/08 sau khi thêm 20 câu A2: kho 928 câu ra **37,50%** và
// **2,80%**. Lần này cả hai con số ĐỀU nhích xuống (lần trước con số "thấy
// được" đứng y nguyên ở 2,9% và tôi đã nói thẳng là không cải thiện). Mức
// giảm nhỏ vì 20 câu trên 928 thì chỉ đổi được chừng đó — nói ra để không ai
// đọc con số này thành một bước tiến lớn.
// GIỮ NGUYÊN 0.371 sau đợt A2 thứ nhất: đo lại 996 câu ra 37,05%, tức gần y mốc
// cũ. Nói thẳng là KHÔNG cải thiện chỉ số này, thay vì siết một con số ảo.
// GIỮ NGUYÊN 0.369 ở đợt A2 cuối: đo lại 1064 câu ra 36,94%, tức NHÍCH LÊN một chút
// so với 36,88% của đợt trước. Nói ra chứ không siết: chỉ số "dài nhất duy nhất"
// bắt cả những chỗ lệch 1-2 ký tự, nên nó dao động quanh 37% và không phải chỗ đáng
// bám. Chỉ số đáng lo là "thấy được", và chỉ số đó thì giảm đều.
const THIEN_LECH_TOI_DA = 0.369;
// ⚠️ BÁNH CÓC NÀY ĐÃ BẮT ĐƯỢC TÔI, ghi lại vì đó là lần nó chứng minh mình có
// việc để làm. Soạn xong 28 câu cho 7 chặng A1 viết lại, đo ra 3,09% — TỆ HƠN
// mốc 0.028 đang ghim, nên test đỏ. Bốn câu là nguyên nhân: đáp án đúng dài hơn
// câu nhiễu nhì từ 11% đến 20% (một câu về tỏi cháy, một câu về giờ ông gọi dậy,
// hai câu ở bài vẽ phòng). Cách sửa là VIẾT DÀI CÂU NHIỄU RA, không phải cắt ngắn
// đáp án đúng — đáp án phải giữ đúng nội dung bài. Sửa xong đo lại: 2,67%.
//
// Nếu lúc đó tôi nới mốc lên 0.031 cho test xanh thì kho vừa lớn thêm 28 câu vừa
// tệ đi, và không ai biết. Đó đúng là việc mà bánh cóc tồn tại để chặn.
// Đợt A2 thứ nhất (6 chặng, 24 câu): bánh cóc này bắt tôi LẦN THỨ HAI — đo ra
// 3,41%, và tám câu là nguyên nhân, lệch từ 12% tới 33%. Cùng một thói quen soạn
// đã gây ra 84,3% lúc đầu: viết đáp án đúng thành mệnh đề đầy đủ rồi thêm nhiễu
// ngắn gọn. Sửa bằng cách viết dài câu nhiễu ra: 2,61%. Hai lần liền nó bắt được
// nên chỗ này không phải bánh cóc trang trí.
// Đợt A2 thứ hai (6 chặng, 24 câu): LẦN ĐẦU chỉ số này ĐI XUỐNG sau một đợt soạn
// (2,61% → 2,55%), và lý do đo được là chốt chặn đã dịch lên lúc soạn — nó bắt 3
// câu TRƯỚC KHI ghi và không cho ghi tới khi sửa. Hai đợt trước, cùng số lượng câu,
// chỉ số này đi LÊN cả hai lần.
// Đợt A2 thứ ba: 2,55% → 2,49%. Ba đợt liền chốt chặn lúc soạn bắt được lỗi
// TRƯỚC KHI ghi (3 câu, 3 câu, 4 câu), và ba đợt liền chỉ số này đi xuống thay vì
// đi lên. Trước khi có chốt đó thì hai đợt liền nó đi lên.
// Đợt A2 cuối: 2,49% → 2,44%. Bốn đợt liền có chốt chặn lúc soạn thì bốn lần giảm.
// Từ 84,3% ban đầu của cả kho xuống 2,44% là đường dài nhất của việc 3.1.
const THAY_DUOC_TOI_DA = 0.024;

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
// ĐÃ VỀ 0 (17/08): cả 93 chặng đủ điều kiện đều có câu hỏi. Từ đây con số này
// KHÔNG còn là bánh cóc "chỉ được giảm" mà là ĐÒI HỎI THẬT: thêm một chủ đề A1/A2
// đạt bốn tiêu chí mà không soạn câu hỏi cho nó là test đỏ.
const A1A2_CON_THIEU_TOI_DA = 0;

// SỐ CHẶNG "KHÔNG ĐỦ ĐIỀU KIỆN" cũng phải là bánh cóc, chứ trước nay chỉ có phép
// kiểm "mỗi chặng bị loại đều đạt một lý do đo được" — phép đó vẫn qua khi con số
// TĂNG. Nó đã đi 52 → 39 → 34 (A1 11 · A2 23) mà không chỗ nào ghim lại, đúng
// kiểu mốc `DE_TOI_THIEU` đứng ở 531 khi kho đã 621.
//
// Nó chỉ giảm được bằng hai đường, và cả hai đều là việc thật:
//   · soạn câu cho một chặng bị loại (nó nhảy sang `daCo`);
//   · viết lại bài đọc cho đạt bốn tiêu chí — nhưng lúc đó nó nhảy sang `du`, và
//     `A1A2_CON_THIEU_TOI_DA = 0` bắt phải soạn câu ngay trong cùng đợt. Không có
//     đường nào làm con số đẹp lên mà không thêm nội dung.
// 19/08 lần hai: 34 → 30 sau khi VIẾT LẠI bài đọc cho 4 chặng A1. Đây là lần đầu
// con số này giảm bằng đường "viết lại bài" chứ không phải đường "soạn thêm câu",
// và nó chứng minh cả hai đường đều thông như chú thích ở trên nói.
// 19/08 lần ba: 30 → 23. BẬC A1 ĐÓNG HẲN — cả 24 chặng đều có câu hỏi mức văn
// bản, không chặng nào còn băng cảnh báo cam. 23 chặng còn lại đều là bậc A2.
// 19/08 lần bốn: 23 → 17 (viết lại 6 bài đọc A2 đầu tiên).
// 19/08 lần năm: 17 → 11 (viết lại 6 bài đọc A2 nữa).
// 19/08 lần sáu: 11 → 5.
// ══ VỀ 0 (19/08) — DANH SÁCH A1/A2 "KHÔNG ĐỦ ĐIỀU KIỆN" ĐÃ ĐÓNG HẾT ══
// Đi từ 52 → 39 → 34 → 30 → 23 → 17 → 11 → 5 → 0 trong một ngày. Cả 145 chặng
// A1/A2 đều có câu hỏi mức văn bản; không chặng nào còn băng cảnh báo cam.
//
// ⚠️ TỪ ĐÂY MỐC NÀY KHÔNG CÒN LÀ BÁNH CÓC MÀ LÀ ĐÒI HỎI THẬT, giống như
// `A1A2_CON_THIEU_TOI_DA` đã về 0 từ 17/08. Hai mốc cùng bằng 0 nghĩa là: thêm một
// chủ đề A1/A2 nào mà không soạn câu hỏi cho nó thì test ĐỎ, dù bài đọc của nó đạt
// bốn tiêu chí hay không. Không còn đường nào để một chặng A1/A2 lặng lẽ thiếu câu.
const A1A2_KHONG_DU_TOI_DA = 0;

test('bánh cóc A1/A2: số chặng đủ điều kiện mà CHƯA có câu hỏi chỉ được giảm', async () => {
  const { doA1A2 } = await import(pathToFileURL(path.join(ROOT, 'scripts/audit_a1a2_story.mjs')).href);
  const { daCo, du, khong } = await doA1A2();

  // Tổng phải giữ nguyên 145 chặng A1/A2 — đổi nghĩa là có chủ đề bị thêm/xoá,
  // và lúc đó mọi con số dưới đây phải đo lại chứ không sửa cho vừa.
  assert.equal(daCo.length + du.length + khong.length, 145,
    'số chặng A1/A2 (type vstep) đổi — đo lại bằng node scripts/audit_a1a2_story.mjs');

  assert.ok(khong.length <= A1A2_KHONG_DU_TOI_DA,
    `còn ${khong.length} chặng A1/A2 không đủ điều kiện, nhiều hơn mức ghim `
    + `${A1A2_KHONG_DU_TOI_DA} — bài đọc bị sửa cho kém đi, hoặc có chủ đề mới chưa soạn.`);

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
