// File: scripts/audit_oxford_templates.mjs
// ĐO NỘI DUNG NHÂN TỪ KHUÔN trong giáo trình Oxford (mở việc 5.1).
//
// Luật đã chốt: GIỮ nội dung máy làm ra bằng cách SẮP XẾP LẠI tài liệu soạn
// tay; XOÁ nội dung máy NHÂN RA TỪ KHUÔN MẪU. Chuỗi dọn nội dung trước đây áp
// luật này cho KHO TỪ VỰNG. Giáo trình Oxford chưa từng bị soi bằng nó.
//
// Bộ đo phân loại bằng HAI câu hỏi, không bằng cảm giác "trông có vẻ máy sinh":
//   1. Bỏ chính từ đó ra thì còn lại có phải một KHUÔN lặp đi lặp lại không?
//   2. Đáp án nhiễu lấy từ đâu — trong cùng unit, một tập nhãn đóng, hay chỗ khác?
//
// Câu 2 mới là câu phân loại được. Một câu hỏi trắc nghiệm có thể sinh từ khuôn
// mà VẪN dùng được, nếu đáp án và nhiễu đều đọc ra từ tài liệu soạn tay.
//
// Chạy: node scripts/audit_oxford_templates.mjs
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src/data');

export const SACH = [
  ['elementary', [['oxfordData.js', 'courseData'], ['oxfordDataPart2.js', 'courseData'], ['oxfordDataPart3.js', 'courseData']]],
  ['pre_intermediate', [['oxfordPreIntData.js', 'courseData'], ['oxfordPreIntData51_75.js', 'courseData51_75'], ['oxfordPreIntData76_100.js', 'courseData76_100']]],
  ['advanced', [['oxfordAdvancedData1_25.js', 'courseData1_25'], ['oxfordAdvancedData26_50.js', 'courseData26_50'], ['oxfordAdvancedData51_75.js', 'courseData51_75'], ['oxfordAdvancedData76_100.js', 'courseData76_100']]],
];

export async function napUnits() {
  const ra = [];
  for (const [book, parts] of SACH) {
    for (const [f, k] of parts) {
      const m = await import(pathToFileURL(path.join(DATA, f)).href);
      for (const u of m[k] || []) ra.push({ book, file: f, unit: u });
    }
  }
  return ra;
}

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Thay chính từ đó bằng {X} để lộ ra khuôn. */
export function loKhuon(chuoi, word) {
  if (!word) return String(chuoi);
  return String(chuoi).replace(new RegExp(esc(word), 'gi'), '{X}');
}

/** Đo cụm collocation: bao nhiêu cụm sinh ra từ một khuôn lặp ≥ `nguong` lần. */
export function doCollocation(units, nguong = 5) {
  const dem = new Map();
  const viDu = new Map();
  let tong = 0;
  const theoSach = {};
  for (const { book, unit } of units) {
    theoSach[book] ||= 0;
    for (const w of unit.theory?.coreVocab || []) {
      const word = String(w.word || w.en || '').trim();
      for (const c of w.collocations || []) {
        tong += 1; theoSach[book] += 1;
        const k = loKhuon(c, word);
        dem.set(k, (dem.get(k) || 0) + 1);
        if (!viDu.has(k)) viDu.set(k, []);
        if (viDu.get(k).length < 4) viDu.get(k).push(`${unit.id}: “${c}”`);
      }
    }
  }
  const khuon = [...dem.entries()].filter(([, n]) => n >= nguong).sort((a, b) => b[1] - a[1]);
  return { tong, theoSach, khuon, viDu, tuKhuon: khuon.reduce((s, [, n]) => s + n, 0) };
}

/** Phân loại câu quiz theo NGUỒN của đáp án nhiễu. */
export function doQuiz(units) {
  const ho = new Map();
  for (const { book, unit } of units) {
    const tu = new Set((unit.theory?.coreVocab || []).map((w) => String(w.word || w.en || '').toLowerCase()));
    const nghia = new Set((unit.theory?.coreVocab || []).map((w) => String(w.vi || '').toLowerCase()));
    for (const q of unit.quiz || []) {
      const cauHoi = String(q.q || q.question || '');
      const opts = (q.options || q.opts || []).map((o) => String(o).toLowerCase());
      // Khuôn = câu hỏi đã ẩn mọi từ của unit đi.
      let k = cauHoi;
      for (const t of tu) k = k.replace(new RegExp(esc(t), 'gi'), '{X}');
      const khoa = `${book} :: ${k}`;
      if (!ho.has(khoa)) ho.set(khoa, { book, khuon: k, n: 0, trongUnit: 0, nhan: new Set(), viDu: cauHoi });
      const h = ho.get(khoa);
      h.n += 1;
      const kho = opts.every((o) => nghia.has(o)) ? nghia : tu;
      if (opts.length && opts.every((o) => kho.has(o))) h.trongUnit += 1;
      for (const o of opts) h.nhan.add(o);
    }
  }
  return [...ho.values()].filter((h) => h.n >= 5).sort((a, b) => b.n - a.n);
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const units = await napUnits();
  console.log(`Đã đọc ${units.length} unit.\n`);

  const c = doCollocation(units);
  console.log('═══ CỤM COLLOCATION ═══');
  console.log(`Tổng ${c.tong} cụm · theo sách ${JSON.stringify(c.theoSach)}`);
  console.log(`Sinh từ khuôn lặp ≥5 lần: ${c.tuKhuon}/${c.tong} (${(c.tuKhuon / c.tong * 100).toFixed(1)}%)\n`);
  for (const [k, n] of c.khuon) {
    console.log(`${String(n).padStart(5)}  ${k}`);
    console.log(`        vd: ${c.viDu.get(k).join(' · ')}`);
  }

  console.log('\n═══ CÂU QUIZ SINH TỪ KHUÔN (≥5 lần) ═══');
  for (const h of doQuiz(units)) {
    console.log(`\n${h.book} · ${h.n} câu`);
    console.log(`  khuôn : ${h.khuon.slice(0, 90)}`);
    console.log(`  ví dụ : ${h.viDu.slice(0, 90)}`);
    console.log(`  nhiễu nằm trong cùng unit: ${h.trongUnit}/${h.n} · tổng lựa chọn riêng biệt: ${h.nhan.size}`);
  }
}
