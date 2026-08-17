// File: scripts/reword_best_translation.mjs
// SỬA CÂU CHỮ 100 CÂU `What is the best translation for "X"?`
// Quyết định B của BAO_CAO_KHUON_OXFORD.md — chốt 2026-08-17.
//
// Chạy:  node scripts/reword_best_translation.mjs --kho     (chỉ đo)
//        node scripts/reword_best_translation.mjs --chup    (chụp băm, TRƯỚC khi sửa)
//        node scripts/reword_best_translation.mjs           (sửa)
//
// ══ VÌ SAO SỬA CHỮ MÀ KHÔNG XOÁ ══
// Họ câu này SINH TỪ KHUÔN nhưng vẫn dùng được, và đó không phải nhân nhượng:
// đáp án là nghĩa SOẠN TAY của chính từ đó, và 100/100 câu có nhiễu là nghĩa
// soạn tay của các từ khác TRONG CÙNG UNIT. Máy không phán đoán gì — nó sắp xếp
// lại tài liệu soạn tay. Đúng vế GIỮ của luật GIỮ/XOÁ.
//
// ══ NHƯNG CÂU CHỮ THÌ NÓI QUÁ ══
// "best translation" ngụ ý một phán đoán về CHẤT LƯỢNG BẢN DỊCH — như thể có một
// thang đo bản dịch và câu hỏi này biết vị trí trên thang đó. Việc thật nhỏ hơn
// nhiều: "trong bốn nghĩa này, nghĩa nào là của từ đó". Câu hỏi phải nói đúng
// việc nó làm — cùng luật đã buộc sửa tiêu đề "Tất cả N từ xuất hiện trong câu
// chuyện này!" ở việc 3.2.
//
// ══ CHỈ ĐỔI `q`, KHÔNG ĐỔI `options` VÀ `a` ══
// Có bảng băm chụp TRƯỚC (options + a của từng câu) và test đòi băm sau khi sửa
// phải khớp y nguyên — để "chỉ sửa câu chữ" là điều MÁY CHỨNG MINH được, không
// phải điều tôi khẳng định.
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath, pathToFileURL } from 'url';
import { napUnits } from './audit_oxford_templates.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src/data');
const SNAP = path.join(ROOT, 'scripts/data/best_translation_snapshot.json');

export const CU = /^What is the best translation for "(.+)"\?$/;
export const MOI = /^Nghĩa nào dưới đây là nghĩa của "(.+)"\?$/;
export const moi = (tu) => `Nghĩa nào dưới đây là nghĩa của "${tu}"?`;

/** Băm phần KHÔNG được đổi của một câu: lựa chọn + đáp án. */
export function bamDapAn(cau) {
  return crypto.createHash('sha256')
    .update(JSON.stringify({ options: cau.options, a: cau.a }))
    .digest('hex');
}

/** Mọi câu quiz mang đề bài kiểu CŨ hoặc kiểu MỚI, khoá theo unit + từ. */
export function timCau(units) {
  const ra = [];
  for (const { book, unit } of units) {
    for (const c of unit.quiz || []) {
      const q = String(c.q || '');
      const m = q.match(CU) || q.match(MOI);
      if (m) ra.push({ khoa: `${book}:${unit.id}:${m[1]}`, cau: c, kieuCu: CU.test(q) });
    }
  }
  return ra;
}

async function chup() {
  const found = timCau(await napUnits());
  const bam = {};
  for (const { khoa, cau } of found) bam[khoa] = bamDapAn(cau);
  fs.mkdirSync(path.dirname(SNAP), { recursive: true });
  fs.writeFileSync(SNAP, JSON.stringify({
    ghiChu: 'Băm sha256 của {options, a} từng câu "best translation", chụp TRƯỚC khi sửa câu chữ (quyết định B). tests/oxford_best_translation.test.js đòi băm hiện tại khớp bảng này — chứng minh CHỈ đề bài đổi.',
    soCau: found.length,
    bam,
  }, null, 2) + '\n', 'utf8');
  console.log(`✅ chụp băm ${found.length} câu → ${path.relative(ROOT, SNAP)}`);
}

async function sua() {
  const CAC_FILE = ['oxfordAdvancedData1_25.js', 'oxfordAdvancedData26_50.js', 'oxfordAdvancedData51_75.js', 'oxfordAdvancedData76_100.js'];
  let tong = 0;
  for (const ten of CAC_FILE) {
    const duong = path.join(DATA, ten);
    let src = fs.readFileSync(duong, 'utf8');
    let dem = 0;
    // Dữ liệu ở dạng JSON thuần nên dấu ngoặc kép quanh từ đã escape thành \".
    src = src.replace(/"q":\s*"What is the best translation for \\"((?:[^"\\]|\\.)+?)\\"\?"/g, (all, tu) => {
      dem += 1;
      return `"q": ${JSON.stringify(moi(tu))}`;
    });
    if (dem) { fs.writeFileSync(duong, src, 'utf8'); console.log(`  ${ten}: sửa ${dem} câu`); }
    tong += dem;
  }
  console.log(`\n✅ sửa ${tong} câu`);
  if (tong !== 100) { console.log(`⚠ đo 100 câu nhưng sửa ${tong} — dừng lại kiểm tra`); process.exit(1); }
}

// Chỉ chạy khi được gọi trực tiếp — bài kiểm import `timCau`/`bamDapAn` từ đây,
// và nếu bộ chụp chạy theo thì nó ghi đè bảng băm bằng trạng thái SAU khi sửa,
// làm bất biến tự so với chính nó. Đã dính đúng bẫy này ở bộ chụp collocation.
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  if (process.argv.includes('--chup')) await chup();
  else if (process.argv.includes('--kho')) {
    const found = timCau(await napUnits());
    console.log(`Tìm thấy ${found.length} câu (${found.filter((f) => f.kieuCu).length} còn câu chữ cũ)`);
    for (const f of found.slice(0, 3)) console.log(`  ${f.khoa}: "${f.cau.q}"`);
  } else await sua();
}
