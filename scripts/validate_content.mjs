// File: scripts/validate_content.mjs
// CHỐT CHẶN CHẤT LƯỢNG NỘI DUNG — chạy trong `npm test` (và vì thế trong CI):
// fail build khi có rác nội dung mới hoặc khi người học có thể nhìn thấy rác.
//
// HAI TẦNG KIỂM TRA:
//
// Tầng 1 — DỮ LIỆU THÔ so với BASELINE đóng băng (chặn tái phát):
//   Đếm vi phạm trên dữ liệu thô từng file, so với baseline kiểm kê ngày
//   2026-08-12 (số rác tồn đọng đã biết, đang được contentFilter che ở runtime).
//   Vi phạm VƯỢT baseline = có rác MỚI chui vào → FAIL. Đây chính là lỗ hổng
//   khiến ~2.600 item rác lọt vào production lần đầu (không ai kiểm dữ liệu
//   sinh ra trước khi commit).
//   Khi dữ liệu được sinh lại sạch (#3): hạ baseline của file đó về 0 — từ đó
//   mọi vi phạm thô đều FAIL ngay.
//
// Tầng 2 — NỘI DUNG HIỆU DỤNG (những gì người học thấy sau contentFilter):
//   Cho dữ liệu qua đúng lớp lọc runtime của app rồi kiểm lại. Bất kỳ vi phạm
//   nào ở tầng này nghĩa là rác đang HIỂN THỊ cho người học → FAIL.
//
// Phạm vi: các file oxford*.js (nơi phát bệnh). KHÔNG đụng tới cụm dữ liệu
// IELTS Nền Tảng (ieltsFoundationData/ieltsPrepData/ieltsAdvancedData...) theo
// chỉ đạo của chủ dự án.
//
// Chữ ký rác cố ý HẸP, đồng bộ với src/utils/contentFilter.js. KHÔNG nới rộng
// kẻo chặn nhầm nội dung người soạn (đáp án tiếng Việt của câu hỏi nghĩa/từ
// loại là hợp lệ; "up (thức dậy)" là item phrasal-verb hợp lệ; "synonym" trần
// là từ vựng curated thật của Unit 2).
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { pathToFileURL, fileURLToPath } from 'url';
import path from 'path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const { sanitizeBook, sanitizeVocabTopics, isMachineExamplePair } = await import(pathToFileURL(path.join(ROOT, 'src', 'utils', 'contentFilter.js')).href);

const TEMPLATE = /use the word |frequently use |study the word |liên quan tới |wrong_word_/i;
const FAKE_SYN = / (synonym|derivative)$/i;
const FAKE_FAMILY = /\S+(er|ful|ly) \((Danh từ|Tính từ|Trạng từ)\)/;
const FILLERS = [/^The correct word is \[blank\]\.?$/, /^This \[blank\] is very important\.?$/, /^Cụm từ liên quan đến /];
const BARE_TU = /^Từ$/;

// BASELINE BÁNH CÓC (ratchet) — nằm ở scripts/content_baseline.json:
// - So sánh THEO TỪNG LUẬT × TỪNG FILE. Bất kỳ ô nào TĂNG so với baseline là
//   FAIL, kể cả khi tổng vi phạm của file vẫn thấp hơn trước (chặn kiểu
//   "bớt rác cũ, thêm rác mới" mà tổng không đổi).
// - Ô nào GIẢM: script tự ghi số mới xuống file (baseline chỉ được đi xuống);
//   commit file baseline cùng thay đổi dữ liệu.
// - Muốn tăng: sửa tay content_baseline.json + ghi lý do vào _increase_log.
const BASELINE_PATH = path.join(ROOT, 'scripts', 'content_baseline.json');
const baselineDoc = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
const RAW_BASELINE = baselineDoc.files || {};

// original bịa "I really like X." trong khi câu đúng là câu khác hẳn — chữ ký
// máy (X có thể là cụm nhiều từ, phát hiện (d1) 2026-08-12).
function isFakeErrorCorrection(q) {
  return /^I really like .+$/.test(q.original || '') && !/really like/.test(q.correct || '');
}

function countViolations(units, collector) {
  const counts = { dragDrop: 0, 'drag-vi': 0, quiz: 0, 'quiz-option': 0, 'quiz-answer-missing': 0, 'quiz-dup-options': 0, typing: 0, 'typing-fake-meaning': 0, textbook: 0, 'textbook-original': 0, theory: 0, 'speaking-trans': 0 };
  const note = (unitId, kind, detail) => {
    counts[kind]++;
    if (collector) collector.push(`${unitId} · ${kind} · "${String(detail).slice(0, 80)}"`);
  };
  for (const u of units) {
    for (const it of (u.dragDrop?.items || [])) {
      const w = it.word || '';
      if (BARE_TU.test(w) || TEMPLATE.test(w) || FAKE_SYN.test(w)) note(u.id, 'dragDrop', w);
      // hint vi máy-sinh "biến thể từ loại của X" — không phải bản dịch (kiểm kê (e))
      if (/^biến thể từ loại của /i.test(it.vi || '')) note(u.id, 'drag-vi', it.vi);
    }
    // trans máy-sinh trong luyện nói: placeholder "[Tạm dịch]..." hoặc công thức
    // thay vì bản dịch thật (kiểm kê (e) 2026-08-12: 250 câu, 7 file).
    for (const s of (u.speaking || [])) {
      const tr = s.trans || '';
      if (/^\[Tạm dịch\]/.test(tr) || /^Hãy phát âm và luyện nói câu:/.test(tr) || /^Đọc to câu này\.?$/.test(tr)) note(u.id, 'speaking-trans', tr);
    }
    for (const q of (u.quiz || [])) {
      if (TEMPLATE.test(q.q || '') || TEMPLATE.test(q.a || '') || FAKE_SYN.test(q.a || '')) note(u.id, 'quiz', q.q);
      const opts = q.options || [];
      if (opts.some((o) => TEMPLATE.test(o))) note(u.id, 'quiz-option', q.q);
      if (!opts.includes(q.a)) note(u.id, 'quiz-answer-missing', q.q);
      if (new Set(opts).size !== opts.length) note(u.id, 'quiz-dup-options', q.q);
    }
    for (const t of (u.typingGame || [])) {
      if (TEMPLATE.test(t.a || '') || FAKE_SYN.test(t.a || '')) note(u.id, 'typing', t.a);
      // (f2): "nghĩa tiếng Việt" template + từ Anh chưa dịch ("cảm thấy rất
      // once in a blue moon") — phần sau template không dấu = máy; câu dịch
      // tay thật luôn có dấu tiếng Việt.
      const m = /có nghĩa là: "(?:cảm thấy rất|sử dụng một|nỗ lực thực hiện) ([^"]+)"/.exec(t.q || '');
      if (m && !/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(m[1])) note(u.id, 'typing-fake-meaning', t.q);
    }
    for (const ex of (u.textbookExercises || [])) {
      for (const q of (ex.questions || [])) {
        if (FILLERS.some((re) => re.test(q.text || ''))) note(u.id, 'textbook', q.text);
        if (ex.type === 'error_correction' && isFakeErrorCorrection(q)) note(u.id, 'textbook-original', q.original);
      }
    }
    for (const key of ['discoveryCorner', 'practicalUsage']) {
      for (const section of (u.theory?.[key] || [])) {
        for (const d of (section.details || [])) {
          const v = d.value || '';
          if (FAKE_FAMILY.test(v) || FILLERS.some((re) => re.test(v)) || TEMPLATE.test(v)) note(u.id, 'theory', v);
        }
      }
    }
  }
  return counts;
}

const files = readdirSync(DATA_DIR).filter((f) => f.startsWith('oxford') && f.endsWith('.js'));
const failures = [];
let unitCount = 0;
let baselineShrunk = false;

for (const f of files) {
  const mod = await import(pathToFileURL(path.join(DATA_DIR, f)).href);
  for (const val of Object.values(mod)) {
    if (!Array.isArray(val) || !val[0]?.theory) continue;
    unitCount += val.length;

    // Tầng 1: dữ liệu thô vs baseline bánh cóc (theo từng luật)
    const raw = countViolations(val, null);
    const baseline = RAW_BASELINE[f] || (RAW_BASELINE[f] = {});
    for (const [kind, n] of Object.entries(raw)) {
      const allowed = baseline[kind] || 0;
      if (n > allowed) {
        failures.push(`RÁC MỚI (thô) · ${f} · ${kind}: ${n} vi phạm > baseline ${allowed}`);
      } else if (n < allowed) {
        // Bánh cóc: baseline chỉ được đi xuống — ghi nhận mức mới thấp hơn.
        if (n === 0) delete baseline[kind]; else baseline[kind] = n;
        baselineShrunk = true;
      }
    }
    if (Object.keys(baseline).length === 0) delete RAW_BASELINE[f];

    // Tầng 2: nội dung hiệu dụng phải sạch tuyệt đối
    const effDetails = [];
    const eff = countViolations(sanitizeBook(val), effDetails);
    const effTotal = Object.values(eff).reduce((a, b) => a + b, 0);
    if (effTotal > 0) {
      failures.push(`HIỂN THỊ CHO NGƯỜI HỌC · ${f}: ${effTotal} vi phạm sau contentFilter`);
      for (const d of effDetails.slice(0, 10)) failures.push(`    ${d}`);
    }
  }
}

// ---- Kho từ vựng (vocab*.js): cặp example/viExample máy-sinh (phát hiện (e1)) ----
// Bỏ qua file tổng hợp vocabVstepData.js (import extensionless, Node không nạp
// được — và nội dung của nó chính là các file lẻ bên dưới cộng lại).
const vocabFiles = readdirSync(DATA_DIR).filter((f) => f.startsWith('vocab') && f.endsWith('.js') && f !== 'vocabVstepData.js');
let vocabTopicCount = 0;
for (const f of vocabFiles) {
  let mod;
  try { mod = await import(pathToFileURL(path.join(DATA_DIR, f)).href); } catch { continue; }
  for (const val of Object.values(mod)) {
    if (!Array.isArray(val) || !val[0]?.words) continue;
    vocabTopicCount += val.length;

    // Tầng 1: thô vs baseline — 3 luật:
    // - vocab-example-pair: cặp example/viExample máy (viExample là tiếng Anh)
    // - vocab-ipa-format:  ipa phải có dạng /.../ (cho phép IPA kép "mom/mum");
    //   hiện 0 vi phạm trên toàn kho — luật gác tương lai ((f2) 2026-08-12)
    // - vocab-vi-in-en:    trường en (từ tiếng Anh) chứa ký tự tiếng Việt đặc
    //   thù (ă â đ ơ ư + dấu thanh — KHÔNG tính é/è của loanword café/résumé);
    //   hiện 0 vi phạm — luật gác tương lai
    const IPA_RE = /^\/[^/]+\/( \/[^/]+\/)*$/;
    const VIET_STRICT = /[ăằắẳẵặâầấẩẫậđểễệỉĩịọỏốồổỗộơờớởỡợụủứừửữựỳỵỷỹảạẻẽẹề]/i;
    const raw = { 'vocab-example-pair': 0, 'vocab-ipa-format': 0, 'vocab-vi-in-en': 0 };
    for (const t of val) {
      for (const w of (t.words || [])) {
        if (isMachineExamplePair(w)) raw['vocab-example-pair']++;
        if (w.ipa && !IPA_RE.test(w.ipa)) raw['vocab-ipa-format']++;
        if (VIET_STRICT.test(w.en || '')) raw['vocab-vi-in-en']++;
      }
    }
    const baseline = RAW_BASELINE[f] || (RAW_BASELINE[f] = {});
    for (const [kind, n] of Object.entries(raw)) {
      const allowed = baseline[kind] || 0;
      if (n > allowed) {
        failures.push(`RÁC MỚI (thô) · ${f} · ${kind}: ${n} vi phạm > baseline ${allowed}`);
      } else if (n < allowed) {
        if (n === 0) delete baseline[kind]; else baseline[kind] = n;
        baselineShrunk = true;
      }
    }
    if (Object.keys(baseline).length === 0) delete RAW_BASELINE[f];

    // Tầng 2: sau sanitizeVocabTopics phải sạch tuyệt đối
    let eff = 0;
    for (const t of sanitizeVocabTopics(val)) for (const w of (t.words || [])) if (isMachineExamplePair(w)) eff++;
    if (eff > 0) failures.push(`HIỂN THỊ CHO NGƯỜI HỌC · ${f}: ${eff} cặp example/viExample máy sau sanitizeVocabTopics`);
  }
}

if (failures.length > 0) {
  console.error(`\n❌ validate_content: FAIL\n`);
  for (const v of failures.slice(0, 60)) console.error('  - ' + v);
  if (failures.length > 60) console.error(`  ... và ${failures.length - 60} dòng nữa`);
  console.error('\nNguyên tắc: KHÔNG ship nội dung máy-sinh chưa qua kiểm — sửa dữ liệu/generator, đừng nới baseline.');
  process.exit(1);
}

// Bánh cóc đi xuống: ghi baseline mới thấp hơn để mức cũ không bao giờ quay lại.
if (baselineShrunk) {
  baselineDoc.files = RAW_BASELINE;
  writeFileSync(BASELINE_PATH, JSON.stringify(baselineDoc, null, 2) + '\n', 'utf8');
  console.log('🔽 validate_content: rác thô GIẢM — đã hạ baseline trong scripts/content_baseline.json, hãy commit file này.');
}
console.log(`✅ validate_content: ${unitCount} unit Oxford (${files.length} file) + ${vocabTopicCount} topic từ vựng (${vocabFiles.length} file) đạt — dữ liệu thô không vượt baseline bánh cóc, nội dung hiệu dụng sạch 100%.`);
