// File: scripts/dung_lai_quiz_preint.mjs
//
//   node scripts/dung_lai_quiz_preint.mjs         # chạy khan
//   node scripts/dung_lai_quiz_preint.mjs --ghi   # ghi thật
//
// DỰNG LẠI 200 CÂU QUIZ "LOẠI TỪ" CỦA BỘ OXFORD PRE-INTERMEDIATE (B1).
//
// ══ ĐO ĐƯỢC TRƯỚC KHI SỬA ══ (node scripts/audit_oxford_templates.mjs)
//   · 200/1007 câu quiz của bộ B1 đúc từ MỘT khuôn duy nhất:
//     "Đâu là loại từ (Part of Speech) chính xác của từ \"{X}\"?"
//   · 4 câu mỗi unit, trải đều 50 unit.
//   · Toàn bộ 200 câu chỉ có 19 PHƯƠNG ÁN khác nhau — và cả 19 đều là nhãn ngữ
//     pháp ("Danh từ", "Động từ", "Cụm giới từ"…).
//   · 0/200 câu lấy nhiễu từ cùng unit.
//
// ══ VÌ SAO ĐÓ LÀ HỎNG, KHÔNG PHẢI "ĐƠN GIẢN" ══
// Đáp án nằm nguyên trong trường `words[].type` của chính từ đó, và sau vài câu
// người học thuộc lòng bộ 19 nhãn rồi đoán theo hình dạng từ — "có -ly là Trạng
// từ". Học xong 200 câu vẫn KHÔNG biết từ đó NGHĨA GÌ hay DÙNG THẾ NÀO. Ở bộ
// advanced thì ngược lại: 100/100 câu lấy nhiễu cùng unit, 399 phương án riêng.
//
// ══ THAY BẰNG GÌ ══
// HAI khuôn xen kẽ (2+2 mỗi unit), cả hai đều đứng trên dữ liệu ĐÃ SOẠN TAY
// trong `words[]` — không bịa thêm chữ nào:
//   1. DÙNG   — khoét chính câu ví dụ của từ đó (`words[].example`), 4 lựa chọn
//               là 4 TỪ trong cùng unit.
//   2. NGHĨA  — hỏi nghĩa tiếng Việt (`words[].vi`), 4 lựa chọn là 4 NGHĨA
//               trong cùng unit.
// Nhiễu cùng unit nghĩa là người học phải phân biệt các từ VỪA HỌC với nhau,
// chứ không loại trừ được bằng cảm giác.
//
// ══ TỰ CHẶN ══
// Script từ chối ghi nếu bất kỳ câu nào không đủ 4 lựa chọn riêng biệt, đáp án
// không nằm trong lựa chọn, câu khoét không thật sự có chỗ trống, hoặc trùng
// một câu đã có sẵn trong unit.

import { readFileSync, writeFileSync } from 'node:fs';

const GHI = process.argv.includes('--ghi');
const NGUON = [
  ['src/data/oxfordPreIntData.js', 'courseData'],
  ['src/data/oxfordPreIntData51_75.js', 'courseData51_75'],
  ['src/data/oxfordPreIntData76_100.js', 'courseData76_100'],
];
const KHUON_CU = /loại từ \(Part of Speech\)/;
const chuan = (v) => String(v ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

/** Khoét từ khỏi câu ví dụ. Trả về '' nếu không khoét được (từ không có trong câu). */
function khoet(cau, tu) {
  const c = String(cau || '');
  const t = String(tu || '').trim();
  if (!c || !t) return '';
  const i = c.toLowerCase().indexOf(t.toLowerCase());
  if (i < 0) return '';
  return `${c.slice(0, i)}_____${c.slice(i + t.length)}`;
}

/** Chọn n phần tử khác `tru` từ `kho`, ưu tiên gần nhau về độ dài để không lộ đáp án. */
function nhieu(kho, tru, n, dai) {
  const con = kho.filter((x) => chuan(x) !== chuan(tru));
  const rieng = [...new Map(con.map((x) => [chuan(x), x])).values()];
  rieng.sort((a, b) => Math.abs(a.length - dai) - Math.abs(b.length - dai));
  return rieng.slice(0, n);
}

const loi = [];
let doi = 0;
const ketQua = [];

for (const [duong, ten] of NGUON) {
  const src = readFileSync(duong, 'utf8');
  const mod = await import(`../${duong}`);
  const goc = mod[ten];
  const units = Array.isArray(goc) ? goc : Object.values(goc).flat();

  for (const u of units) {
    const cu = (u.quiz || []).filter((q) => KHUON_CU.test(q.q));
    if (cu.length === 0) continue;

    const tu = (u.words || []).filter((w) => w.word && w.vi);
    const khoTu = tu.map((w) => w.word);
    const khoNghia = tu.map((w) => w.vi);
    const daCo = new Set((u.quiz || []).map((q) => chuan(q.q)));

    // Ưu tiên những từ CHƯA từng là đáp án của câu nào trong unit.
    const daLaDapAn = new Set((u.quiz || []).map((q) => chuan(q.a)));
    const uuTien = [...tu].sort((a, b) => Number(daLaDapAn.has(chuan(a.word))) - Number(daLaDapAn.has(chuan(b.word))));

    // Dựng ỨNG VIÊN cho CẢ HAI khuôn, trên MỌI từ, rồi mới chọn — bản đầu chọn
    // khuôn trước rồi mới xét từ, nên một câu bị trùng là bỏ luôn cả từ đó và
    // phần lớn unit dựng được 0 câu.
    const ungVienDung = [];
    const ungVienNghia = [];
    for (const w of uuTien) {
      const cauKhoet = khoet(w.example, w.word);
      if (cauKhoet && cauKhoet.includes('_____')) {
        const q = `Điền từ thích hợp vào chỗ trống: "${cauKhoet}"`;
        const opt = [w.word, ...nhieu(khoTu, w.word, 3, w.word.length)];
        if (!daCo.has(chuan(q)) && opt.length === 4) ungVienDung.push({ q, options: opt, a: w.word });
      }
      const q2 = `Nghĩa của "${w.word}" trong bài này là gì?`;
      const opt2 = [w.vi, ...nhieu(khoNghia, w.vi, 3, w.vi.length)];
      if (!daCo.has(chuan(q2)) && opt2.length === 4) ungVienNghia.push({ q: q2, options: opt2, a: w.vi });
    }

    // Xen kẽ hai khuôn; hết khuôn nào thì lấy bù từ khuôn kia.
    const moi = [];
    const canDung = Math.ceil(cu.length / 2);
    while (moi.length < cu.length) {
      const lay = (moi.filter((x) => x.q.startsWith('Điền từ')).length < canDung && ungVienDung.length)
        ? ungVienDung.shift()
        : (ungVienNghia.shift() || ungVienDung.shift());
      if (!lay) break;
      if (daCo.has(chuan(lay.q))) continue;
      daCo.add(chuan(lay.q));
      moi.push(lay);
    }

    if (moi.length < cu.length) {
      loi.push(`${u.id}: cần ${cu.length} câu thay thế, chỉ dựng được ${moi.length}`);
      continue;
    }
    for (const m of moi) {
      if (new Set(m.options.map(chuan)).size !== 4) loi.push(`${u.id}: "${m.q.slice(0, 40)}" có lựa chọn trùng nhau`);
      if (!m.options.some((o) => chuan(o) === chuan(m.a))) loi.push(`${u.id}: đáp án không nằm trong lựa chọn`);
    }
    ketQua.push({ duong, src, unitId: u.id, cu, moi });
    doi += moi.length;
  }
}

console.log(`dựng được ${doi} câu thay thế cho ${ketQua.length} unit`);
if (loi.length) {
  console.log(`\n${loi.length} vấn đề:`);
  for (const x of loi.slice(0, 12)) console.log('  · ' + x);
}
if (ketQua.length) {
  console.log('\nví dụ (unit đầu tiên):');
  for (const m of ketQua[0].moi) console.log(`  Q: ${m.q}\n     ${m.options.join(' / ')}  →  ${m.a}`);
}

if (!GHI) { console.log('\n(chạy khan — thêm --ghi để ghi vào file)'); process.exit(loi.length ? 1 : 0); }
if (loi.length) { console.log('\nDỪNG: còn vấn đề, không ghi nửa vời.'); process.exit(1); }

// Ghi: thay từng câu cũ bằng câu mới, khớp theo NGUYÊN VĂN chuỗi JSON của câu cũ
// trong file nguồn — không dựng lại cả file, để giữ nguyên định dạng thủ công.
const theoFile = new Map();
for (const k of ketQua) {
  if (!theoFile.has(k.duong)) theoFile.set(k.duong, k.src);
}
for (const [duong] of theoFile) {
  let s = theoFile.get(duong);
  for (const k of ketQua.filter((x) => x.duong === duong)) {
    k.cu.forEach((cauCu, i) => {
      const cu = JSON.stringify(cauCu.q);
      const viTri = s.indexOf(cu);
      if (viTri < 0) { loi.push(`${k.unitId}: không tìm thấy câu cũ trong file`); return; }
      // Thay cả khối object của câu đó: tìm dấu { gần nhất trước và } cân bằng sau.
      let dau = s.lastIndexOf('{', viTri);
      let sau = dau;
      let sau2 = 0;
      for (let j = dau; j < s.length; j += 1) {
        if (s[j] === '{') sau2 += 1;
        else if (s[j] === '}') { sau2 -= 1; if (sau2 === 0) { sau = j; break; } }
      }
      s = s.slice(0, dau) + JSON.stringify(k.moi[i]) + s.slice(sau + 1);
    });
  }
  writeFileSync(duong, s, 'utf8');
  console.log(`đã ghi ${duong}`);
}
if (loi.length) { console.log('CÓ LỖI KHI GHI:'); for (const x of loi) console.log('  · ' + x); process.exit(1); }
