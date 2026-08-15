// File: tests/quick_verify.test.js
// #1b — BÀI XÁC MINH NHANH cho người dùng cũ.
//
// Ba loại lỗi mà test này canh, đều là lỗi ÂM THẦM (không văng, không báo, chỉ
// cho ra kết quả sai):
//   1. Câu hỏi có HAI đáp án cùng đúng. 12/25 chủ đề từ vựng trong lộ trình có
//      từ trùng nghĩa tiếng Việt; lấy nhiễu theo từ là dính ngay.
//   2. Ngưỡng đá nhau: bộ 5 câu toàn trắc nghiệm nên thresholdFor() trả 85%,
//      làm 4/5 (= luật xác minh nhanh đã chốt) bị tính TRƯỢT và không lưu gì.
//   3. Xác minh nhanh 5/5 khoá luôn bản ghi, khiến người sau đó làm hết cả unit
//      đạt 90% vẫn không nâng cấp được — phạt người làm nhiều hơn.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import {
  buildGrammarQuickVerify, buildVocabQuickVerify, buildQuickVerify,
  hasQuickVerifySupply, grammarQuestionPool, vocabWordPool, MIN_VOCAB_WORDS,
} from '../src/utils/quickVerify.js';
import {
  buildQuickVerifyEvidence, buildEvidence, saveScore, loadScores, isVerified,
  splitCompleted, QUICK_VERIFY_SIZE, QUICK_VERIFY_PASS, MASTERY_STORAGE_KEY,
} from '../src/utils/mastery.js';
import { shouldShowMigrationNotice, dismissMigrationNotice, MIGRATION_NOTICE_KEY } from '../src/utils/masteryMigration.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

// Nguồn ngẫu nhiên tất định để kết quả test lặp lại được.
const fixedRand = () => 0;

function fakeStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
  };
}

// ---- Bộ sinh câu hỏi ngữ pháp ------------------------------------------------

test('câu ngữ pháp có đáp án KHÔNG nằm trong danh sách lựa chọn bị loại, không được "sửa cho khớp"', () => {
  const topic = { exercises: [
    { id: 1, q: 'She ___ to school.', opts: ['go', 'goes'], a: 'goes' },
    { id: 2, q: 'Hỏng: đáp án lạc', opts: ['a', 'b'], a: 'c' },
    { id: 3, q: 'Thiếu lựa chọn', opts: ['a'], a: 'a' },
    { id: 4, q: '', opts: ['a', 'b'], a: 'a' },
  ] };
  const pool = grammarQuestionPool(topic);
  assert.equal(pool.length, 1);
  assert.equal(pool[0].id, 1);
});

test('bài ngữ pháp giữ nguyên câu và đáp án của người soạn, chỉ đảo thứ tự lựa chọn', () => {
  const opts = ['go', 'goes', 'going', 'gone'];
  const topic = { exercises: Array.from({ length: 8 }, (_, i) => ({ id: i, q: `Câu ${i}`, opts, a: 'goes' })) };
  const qs = buildGrammarQuickVerify(topic, QUICK_VERIFY_SIZE, fixedRand);
  assert.equal(qs.length, QUICK_VERIFY_SIZE);
  for (const q of qs) {
    assert.ok(q.options.includes(q.answer), 'đáp án phải nằm trong lựa chọn');
    assert.equal(q.options.length, opts.length);
    assert.deepEqual([...q.options].sort(), [...opts].sort(), 'không được thêm/bớt lựa chọn');
  }
  assert.equal(new Set(qs.map((q) => q.id)).size, qs.length, 'không lặp lại câu');
});

// ---- Bộ sinh câu hỏi từ vựng -------------------------------------------------

test('nhiễu phải khác NGHĨA đáp án, không chỉ khác từ (bẫy chủ đề có từ đồng nghĩa)', () => {
  // "car" và "automobile" cùng nghĩa "xe hơi": lấy nhiễu theo TỪ sẽ đẻ ra câu
  // hỏi hai đáp án cùng đúng mà chỉ một cái được chấm.
  const topic = { words: [
    { en: 'car', vi: 'xe hơi' },
    { en: 'automobile', vi: 'xe hơi' },
    { en: 'bike', vi: 'xe đạp' },
    { en: 'bus', vi: 'xe buýt' },
    { en: 'train', vi: 'tàu hoả' },
    { en: 'plane', vi: 'máy bay' },
  ] };
  const qs = buildVocabQuickVerify(topic, 6, fixedRand);
  assert.ok(qs.length > 0);
  for (const q of qs) {
    const same = q.options.filter((o) => o.trim().toLowerCase() === q.answer.trim().toLowerCase());
    assert.equal(same.length, 1, `câu "${q.prompt}" có ${same.length} lựa chọn cùng nghĩa đáp án`);
    assert.equal(q.options.length, 4);
  }
});

test('chủ đề có ít hơn 4 từ thì KHÔNG ra câu nào, thay vì ra câu thiếu nhiễu', () => {
  const topic = { words: [{ en: 'a', vi: 'a' }, { en: 'b', vi: 'b' }, { en: 'c', vi: 'c' }] };
  assert.equal(topic.words.length, MIN_VOCAB_WORDS - 1);
  assert.deepEqual(buildVocabQuickVerify(topic, 5, fixedRand), []);
  assert.equal(hasQuickVerifySupply('vstep', topic), false);
});

test('từ thiếu nghĩa tiếng Việt bị loại khỏi bộ đề', () => {
  const topic = { words: [{ en: 'a', vi: 'nghĩa a' }, { en: 'b' }, { en: 'c', vi: '   ' }, { vi: 'không có từ' }] };
  assert.equal(vocabWordPool(topic).length, 1);
});

test('loại chặng lạ (chưa có bộ sinh) trả về rỗng chứ không đoán bừa', () => {
  assert.deepEqual(buildQuickVerify('oxford', { quiz: [{ q: 'x', options: ['a'], a: 'a' }] }, 5, fixedRand), []);
  assert.equal(hasQuickVerifySupply('oxford', {}), false);
});

// ---- Ngưỡng và lưu trữ -------------------------------------------------------

test('xác minh nhanh 4/5 là ĐẠT — không bị ngưỡng 85% của bộ toàn trắc nghiệm đá', () => {
  const mcq5 = Array(5).fill('mcq');
  // Luật chung: 5 câu trắc nghiệm → ngưỡng 85% → 4/5 (80%) là trượt.
  assert.equal(buildEvidence(4, 5, mcq5).threshold, 85);
  assert.equal(buildEvidence(4, 5, mcq5).passed, false);
  // Luật xác minh nhanh: ngưỡng riêng 80%, và ghi đúng vào bằng chứng để dòng
  // "cần ≥{threshold}%" trên màn kết quả nói đúng cái vừa được chấm.
  const quick = buildQuickVerifyEvidence(QUICK_VERIFY_PASS, QUICK_VERIFY_SIZE);
  assert.equal(quick.threshold, 80);
  assert.equal(quick.passed, true);
  assert.equal(quick.via, 'quick');
  assert.equal(buildQuickVerifyEvidence(3, 5).passed, false);
});

test('bản ghi xác minh nhanh lưu được và đánh dấu chặng là đã xác minh', () => {
  const storage = fakeStorage();
  saveScore(storage, 'b1_01', buildQuickVerifyEvidence(4, 5), '2026-08-14T00:00:00.000Z');
  const scores = loadScores(storage);
  assert.equal(isVerified(scores, 'b1_01'), true);
  assert.equal(scores.b1_01.via, 'quick', 'phải giữ dấu "xác minh nhanh" để phân biệt với bài đầy đủ');
  assert.equal(scores.b1_01.percent, 80);
});

test('làm đủ bài đạt 90% NÂNG CẤP được bản ghi xác minh nhanh 5/5 (100%)', () => {
  const storage = fakeStorage();
  saveScore(storage, 'b1_01', buildQuickVerifyEvidence(5, 5), '2026-08-14T00:00:00.000Z');
  assert.equal(loadScores(storage).b1_01.percent, 100);
  saveScore(storage, 'b1_01', buildEvidence(9, 10, Array(10).fill('other')), '2026-08-15T00:00:00.000Z');
  const after = loadScores(storage).b1_01;
  assert.equal(after.percent, 90, 'bài đầy đủ phải thay được bản xác minh nhanh');
  assert.equal(after.via, undefined, 'sau khi nâng cấp thì không còn là bản xác minh nhanh');
  // Nhưng xác minh nhanh KHÔNG được hạ bản đầy đủ xuống.
  saveScore(storage, 'b1_01', buildQuickVerifyEvidence(4, 5), '2026-08-16T00:00:00.000Z');
  assert.equal(loadScores(storage).b1_01.percent, 90);
});

test('splitCompleted chỉ nên được nuôi bằng id CỦA LỘ TRÌNH', () => {
  const scores = { b1_01: { percent: 100 } };
  // Giao diện lọc trước theo lộ trình; nếu ai đó nuôi thẳng completedMilestones
  // thì id trò chơi sẽ bị đếm là "chặng chưa xác minh" — test này ghim hành vi
  // để chỗ gọi phải lọc, chứ hàm không tự đoán id nào thuộc lộ trình.
  const raw = splitCompleted(['b1_01', 'game-hangman', 'travel-transport'], scores);
  assert.deepEqual(raw.verified, ['b1_01']);
  assert.equal(raw.unverified.length, 2);
  const filtered = splitCompleted(['b1_01', 'travel-transport'], scores);
  assert.deepEqual(filtered.unverified, ['travel-transport']);
});

// ---- Thông báo di trú --------------------------------------------------------

test('thông báo di trú chỉ hiện một lần, và không hiện với người không có chặng cũ', () => {
  const storage = fakeStorage();
  assert.equal(shouldShowMigrationNotice(storage, 0), false, 'người mới không có gì để báo');
  assert.equal(shouldShowMigrationNotice(storage, 7), true);
  dismissMigrationNotice(storage, '2026-08-14T00:00:00.000Z');
  assert.equal(shouldShowMigrationNotice(storage, 7), false, 'đã báo rồi thì không báo lại');
  assert.equal(storage.getItem(MIGRATION_NOTICE_KEY), '2026-08-14T00:00:00.000Z');
});

test('khoá lưu trữ giữ nguyên tên — đổi tên là mất hết bản ghi đã xác minh', () => {
  assert.equal(MASTERY_STORAGE_KEY, 'milestoneScoresV1');
  assert.equal(MIGRATION_NOTICE_KEY, 'masteryMigrationNoticeV1');
  const keys = fs.readFileSync(path.join(ROOT, 'src', 'utils', 'backup.js'), 'utf8');
  assert.ok(keys.includes(MASTERY_STORAGE_KEY), 'điểm đã xác minh phải nằm trong bản sao lưu/đồng bộ');
});

// ---- Dữ liệu thật: 44 chặng có đủ nguyên liệu không? -------------------------

async function importAggregate(file, pick) {
  // Các file gộp trong src/data import không kèm đuôi .js (Vite chấp nhận,
  // node --test thì không). Ghi bản tạm có đuôi rồi nạp, xoá ngay sau đó.
  const src = fs.readFileSync(path.join(DATA, file), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_qvtest_${file.replace(/\W/g, '_')}.mjs`);
  fs.writeFileSync(tmp, src);
  try { return pick(await import(pathToFileURL(tmp).href)); } finally { fs.rmSync(tmp, { force: true }); }
}

// Test này KHÔNG tất định: mỗi lần chạy bốc một bộ 5 câu khác nhau trên cả 44
// chặng — cố ý, vì như vậy mới quét được nhiều nguyên liệu hơn một lần chạy
// gieo hạt cố định. Hệ quả cần biết trước: nếu hôm nay đỏ mà hôm qua xanh thì
// đó là DỮ LIỆU ĐÃ ĐỔI, không phải test chập chờn — đọc thông báo lỗi để biết
// chặng nào và câu nào hỏng.
// Bao nhiêu chặng KHÔNG đủ 5 câu để xác minh nhanh — bánh cóc, chỉ được giảm.
// Hiện tại đúng 100: toàn bộ unit sách Oxford Advanced, mỗi unit chỉ còn 2 câu
// quiz sau đợt dọn nội dung máy-sinh. Giao diện ẨN nút và nói lý do cho đúng
// 100 chặng này. Cách sửa gốc là bù độ dày cho sách đó (KE_HOACH_B2 việc 5.1);
// làm xong thì hạ con số này xuống.
const KHONG_DU_CAU_TOI_DA = 100;

test('MỌI chặng trong lộ trình đều đủ nguyên liệu ra 5 câu xác minh', async () => {
  const rawTopics = await importAggregate('vocabVstepData.js', (m) => m.default);
  const grammar = await importAggregate('grammarData.js', (m) => m.parsedGrammarData);
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const { sanitizeVocabTopics, sanitizeBook } = await import(pathToFileURL(path.join(ROOT, 'src', 'utils', 'contentFilter.js')).href);

  // Đo trên dữ liệu ĐÃ QUA LỚP LỌC RUNTIME — đúng cái QuickVerifyModal đọc.
  // Hôm nay lớp lọc chỉ gỡ cặp example/viExample chứ không xoá từ nào, nên con
  // số không đổi; ghim lại để nếu sau này lọc bắt đầu xoá từ thì test đo được
  // ngay chứ không đo một kho khác với kho chạy thật.
  const topics = sanitizeVocabTopics(rawTopics);
  assert.equal(topics.length, rawTopics.length);

  const OXFORD = [
    [['oxfordData.js', 'courseData'], ['oxfordDataPart2.js', 'courseData'], ['oxfordDataPart3.js', 'courseData']],
    [['oxfordPreIntData.js', 'courseData'], ['oxfordPreIntData51_75.js', 'courseData51_75'], ['oxfordPreIntData76_100.js', 'courseData76_100']],
    [['oxfordAdvancedData1_25.js', 'courseData1_25'], ['oxfordAdvancedData26_50.js', 'courseData26_50'], ['oxfordAdvancedData51_75.js', 'courseData51_75'], ['oxfordAdvancedData76_100.js', 'courseData76_100']],
  ];
  const unitById = new Map();
  for (const parts of OXFORD) {
    let units = [];
    for (const [f, k] of parts) units = units.concat((await import(pathToFileURL(path.join(DATA, f)).href))[k] || []);
    for (const u of sanitizeBook(units)) unitById.set(u.id, u);
  }

  const topicById = new Map(topics.map((t) => [t.id, t]));
  const grammarById = new Map(grammar.map((t) => [t.id, t]));
  const milestones = roadmapData.flatMap((l) => l.milestones);
  assert.ok(milestones.length > 500, `lộ trình chỉ còn ${milestones.length} chặng — nghi bộ sinh lộ trình hỏng`);

  const hong = [];     // sai thật — không được có cái nào
  const khongDu = [];  // thiếu nguyên liệu — có bánh cóc, chỉ được giảm
  for (const m of milestones) {
    const source = m.type === 'grammar' ? grammarById.get(m.targetId)
      : m.type === 'oxford' ? unitById.get(m.targetId)
        : topicById.get(m.targetId);
    if (!source) { hong.push(`${m.id} (${m.type}) → ${m.targetId}: KHÔNG TÌM THẤY nội dung`); continue; }
    if (!hasQuickVerifySupply(m.type, source)) { khongDu.push(`${m.id} (${m.type}) → ${m.targetId}`); continue; }
    const qs = buildQuickVerify(m.type, source, QUICK_VERIFY_SIZE);
    if (qs.length < QUICK_VERIFY_SIZE) { hong.push(`${m.id}: khai đủ nguyên liệu nhưng chỉ ra được ${qs.length}/${QUICK_VERIFY_SIZE} câu`); continue; }
    for (const q of qs) {
      // So SÁNH PHÂN BIỆT HOA THƯỜNG, đúng như lúc chấm ở QuickVerifyModal
      // (`opt === cur.answer`). Trước đây chỗ này hạ hết về chữ thường rồi so,
      // và nó báo đỏ nhầm hai câu hỏi VỀ CHÍNH VIỆC VIẾT HOA — nơi bốn lựa chọn
      // chỉ khác nhau ở chữ hoa/thường thì đó chính là đề bài, không phải lỗi.
      const dung = q.options.filter((o) => String(o).trim() === String(q.answer).trim());
      if (dung.length !== 1) hong.push(`${m.id}: câu "${q.prompt}" có ${dung.length} lựa chọn đúng`);
      if (new Set(q.options).size !== q.options.length) hong.push(`${m.id}: câu "${q.prompt}" có lựa chọn trùng nhau`);
    }
  }

  // Chặng trỏ vào nội dung không tồn tại, hoặc sinh ra câu hỏi hỏng: KHÔNG BAO
  // GIỜ được phép, dù chỉ một chặng.
  assert.deepEqual(hong, [], 'chặng sau sinh ra bài xác minh HỎNG:\n  ' + hong.join('\n  '));

  // Chặng thiếu nguyên liệu: được phép tồn tại (giao diện ẩn nút và nói lý do),
  // nhưng số lượng chỉ được GIẢM.
  assert.ok(khongDu.length <= KHONG_DU_CAU_TOI_DA,
    `${khongDu.length} chặng không đủ ${QUICK_VERIFY_SIZE} câu, vượt mức đã ghi nhận (${KHONG_DU_CAU_TOI_DA}). Vài chặng đầu:\n  ` + khongDu.slice(0, 10).join('\n  '));
});
