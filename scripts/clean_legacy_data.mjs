// File: scripts/clean_legacy_data.mjs
// DỌN TẬN GỐC RÁC TRONG DỮ LIỆU KHÔNG CÓ GENERATOR (hạng mục #3, đợt 2).
//
// Bối cảnh: 3 file Oxford Pre-Int đã sinh lại được vì có generator. Bảy file
// còn lại (oxfordData*.js — sách cơ bản, oxfordAdvancedData*.js — sách nâng
// cao) và 3 file kho từ vựng KHÔNG có generator trong repo: rác nằm thẳng
// trong dữ liệu, chỉ có thể mổ trực tiếp. Từ trước tới nay số rác này bị
// contentFilter che ở runtime — script này xoá hẳn để baseline về 0.
//
// NGUYÊN TẮC: chỉ XOÁ, không bao giờ SỬA hay THÊM chữ. Mọi luật dưới đây là
// bản sao đúng nguyên văn của luật trong scripts/validate_content.mjs — nếu
// hai bên lệch nhau thì baseline sẽ không về 0 và nghiệm thu tự động trượt.
//
// Chạy:  node scripts/clean_legacy_data.mjs [--dry]
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');
const DRY = process.argv.includes('--dry');

const TEMPLATE = /use the word |frequently use |study the word |liên quan tới |wrong_word_/i;
const FAKE_FAMILY = /\S+(er|ful|ly) \((Danh từ|Tính từ|Trạng từ)\)/;
const FILLERS = [/^The correct word is \[blank\]\.?$/, /^This \[blank\] is very important\.?$/, /^Cụm từ liên quan đến /];
const isFakeErrorCorrection = (q) => /^I really like .+$/.test(q.original || '') && !/really like/.test(q.correct || '');
const isMachineTrans = (t) => /^\[Tạm dịch\]/.test(t) || /^Hãy phát âm và luyện nói câu:/.test(t) || /^Đọc to câu này\.?$/.test(t);

const OXFORD = ['oxfordData.js', 'oxfordDataPart2.js', 'oxfordDataPart3.js',
  'oxfordAdvancedData1_25.js', 'oxfordAdvancedData26_50.js', 'oxfordAdvancedData51_75.js', 'oxfordAdvancedData76_100.js'];
const VOCAB = ['vocabFinalData.js', 'vocabMoreData.js', 'vocabExtendedData.js'];

// Đếm "nút" của một cấu trúc: mọi object/array/giá trị nguyên thuỷ. Dùng để
// chứng minh script chỉ xoá đúng những gì nó khai báo là đã xoá — xem checkLoss.
function nodes(v) {
  if (Array.isArray(v)) return 1 + v.reduce((a, x) => a + nodes(x), 0);
  if (v && typeof v === 'object') return 1 + Object.values(v).reduce((a, x) => a + nodes(x), 0);
  return 1;
}

// JSON.stringify nuốt undefined và biến NaN/Infinity thành null — nếu dữ liệu
// gốc có những giá trị đó thì chúng biến mất mà không bị tính vào số đã xoá.
function assertJsonSafe(v, where, out) {
  if (v === undefined) out.push(`${where} = undefined`);
  else if (typeof v === 'number' && !Number.isFinite(v)) out.push(`${where} = ${v}`);
  else if (Array.isArray(v)) v.forEach((x, i) => assertJsonSafe(x, `${where}[${i}]`, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) assertJsonSafe(x, `${where}.${k}`, out);
  return out;
}

function pruneOxfordUnits(units) {
  const c = { wordFamily: 0, trans: 0, tbQuestion: 0, tbExercise: 0, theoryDetail: 0, theorySection: 0 };
  let removed = 0;
  const dropField = (obj, key) => { if (key in obj) { removed += nodes(obj[key]) + 0; delete obj[key]; return true; } return false; };

  for (const u of units) {
    for (const list of [u.words, u.theory?.coreVocab]) {
      for (const w of (list || [])) if (dropField(w, 'wordFamily')) c.wordFamily++;
    }
    for (const s of (u.speaking || [])) {
      if (isMachineTrans(s.trans || '') && dropField(s, 'trans')) c.trans++;
    }
    if (Array.isArray(u.textbookExercises)) {
      const kept = [];
      for (const ex of u.textbookExercises) {
        const keepQ = (ex.questions || []).filter((q) => {
          const bad = FILLERS.some((re) => re.test(q.text || '')) || (ex.type === 'error_correction' && isFakeErrorCorrection(q));
          if (bad) { removed += nodes(q); c.tbQuestion++; }
          return !bad;
        });
        // Bài không còn câu nào thì BỎ HẲN — không ship cái vỏ rỗng (bài học
        // từ unit 95 đợt trước: đầu bài hiển thị, bên dưới trống trơn).
        if (keepQ.length === 0) { removed += nodes(ex) - nodes(ex.questions) + 1; c.tbExercise++; continue; }
        ex.questions = keepQ;
        kept.push(ex);
      }
      u.textbookExercises = kept;
    }
    for (const key of ['discoveryCorner', 'practicalUsage']) {
      if (!Array.isArray(u.theory?.[key])) continue;
      const kept = [];
      for (const sec of u.theory[key]) {
        const keepD = (sec.details || []).filter((d) => {
          const v = d.value || '';
          const bad = FAKE_FAMILY.test(v) || FILLERS.some((re) => re.test(v)) || TEMPLATE.test(v);
          if (bad) { removed += nodes(d); c.theoryDetail++; }
          return !bad;
        });
        if (keepD.length === 0) { removed += nodes(sec) - nodes(sec.details) + 1; c.theorySection++; continue; }
        sec.details = keepD;
        kept.push(sec);
      }
      u.theory[key] = kept;
    }
  }
  return { counts: c, removed };
}

function pruneVocabTopics(topics, isMachineExamplePair) {
  const c = { examplePair: 0 };
  let removed = 0;
  for (const t of topics) {
    for (const w of (t.words || [])) {
      if (!isMachineExamplePair(w)) continue;
      // viExample là cụm tiếng Anh trái nghĩa chứ không phải bản dịch
      // ("hysteria" → "Orderly rational peace"); example là chuỗi từ khoá
      // không thành câu. Không có bản curated thay thế → xoá cả cặp, giữ từ.
      for (const k of ['example', 'viExample']) if (k in w) { removed += nodes(w[k]) + 0; delete w[k]; }
      c.examplePair++;
    }
  }
  return { counts: c, removed };
}

function rewrite(file, header, decl, data, trailer) {
  const body = `${header}${decl} = ${JSON.stringify(data, null, 2)};\n${trailer}`;
  if (!DRY) writeFileSync(file, body, 'utf8');
  return body;
}

const { isMachineExamplePair } = await import(pathToFileURL(path.join(ROOT, 'src', 'utils', 'contentFilter.js')).href);
const grand = {};
const bump = (o) => { for (const [k, v] of Object.entries(o)) grand[k] = (grand[k] || 0) + v; };
let failures = 0;

for (const f of [...OXFORD, ...VOCAB]) {
  const file = path.join(DATA, f);
  const src = readFileSync(file, 'utf8');
  const mod = await import(pathToFileURL(file).href);
  const isVocab = VOCAB.includes(f);
  const [name, data] = Object.entries(mod).find(([, v]) => Array.isArray(v) && (v[0]?.theory || v[0]?.words));
  const varName = isVocab ? f.replace('.js', '') : name;

  // Giữ nguyên khối chú thích đầu file; dựng lại đúng kiểu export của từng file.
  const m = new RegExp(`^([\\s\\S]*?)((?:export )?const ${varName})\\s*=\\s*\\[`).exec(src);
  if (!m) { console.log(`❌ ${f}: không nhận ra khai báo "${varName}"`); failures++; continue; }
  const header = m[1];
  const decl = m[2];
  const trailer = isVocab ? `\nexport default ${varName};\n` : '';

  const before = nodes(data);
  const unsafe = assertJsonSafe(data, varName, []);
  if (unsafe.length) { console.log(`❌ ${f}: ${unsafe.length} giá trị không an toàn với JSON: ${unsafe.slice(0, 3).join(', ')}`); failures++; continue; }

  const { counts, removed } = isVocab ? pruneVocabTopics(data, isMachineExamplePair) : pruneOxfordUnits(data);
  const after = nodes(data);

  // CHỨNG MINH KHÔNG MẤT GÌ NGOÀI Ý MUỐN: số nút mất đi phải bằng đúng số nút
  // của những thứ script tự khai là đã xoá.
  if (before - after !== removed) {
    console.log(`❌ ${f}: mất ${before - after} nút nhưng chỉ khai xoá ${removed} — DỪNG, không ghi file`);
    failures++;
    continue;
  }
  bump(counts);
  const body = rewrite(file, header, decl, data, trailer);

  // Đọc lại từ đĩa: nội dung sau khi tuần tự hoá phải trùng khít bản trong bộ nhớ.
  if (!DRY) {
    const back = await import(`${pathToFileURL(file).href}?v=${before}`);
    const reloaded = Object.values(back).find((v) => Array.isArray(v) && (v[0]?.theory || v[0]?.words));
    if (JSON.stringify(reloaded) !== JSON.stringify(data)) { console.log(`❌ ${f}: đọc lại KHÁC bản trong bộ nhớ`); failures++; }
  }
  console.log(`${DRY ? '(thử) ' : ''}${f.padEnd(30)} ${before} → ${after} nút | ${JSON.stringify(counts)} | ${body.length} byte`);
}

console.log(`\nTỔNG đã xoá: ${JSON.stringify(grand, null, 1)}`);
if (failures) { console.error(`\n❌ ${failures} file có vấn đề — xem bên trên.`); process.exit(1); }
console.log(DRY ? '\n(chạy thử — chưa ghi file nào)' : '\n✅ Đã ghi. Chạy tiếp: npm run validate:content && npm test && npm run build');
