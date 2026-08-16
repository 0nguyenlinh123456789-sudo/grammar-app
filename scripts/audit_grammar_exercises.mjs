// File: scripts/audit_grammar_exercises.mjs
// ĐO BÀI TẬP NGỮ PHÁP KHÔNG LÀM ĐƯỢC (phát hiện khi làm việc 5.2).
//
// Hai câu hỏi, cả hai đều trả lời được bằng chính dữ liệu — không cần ai đọc:
//   1. Câu "sửa lỗi" mà `errorWord` TRÙNG `correction` → không có lỗi nào để sửa.
//   2. Câu "viết lại" mà `original` TRÙNG `a` → không có gì để viết lại.
// Cộng thêm câu giữ chỗ "This is a C1/C2 level practice sentence." lọt bản chạy.
//
// Chạy: node scripts/audit_grammar_exercises.mjs
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nap = (f) => import(pathToFileURL(path.join(ROOT, 'src/data', f)).href);
const { suaLoiLamDuoc, vietLaiLamDuoc, dienVaoLamDuoc } =
  await import(pathToFileURL(path.join(ROOT, 'src/utils/grammarClean.js')).href);

export async function napBoBai() {
  return [
    ['foundation', (await nap('foundationData.js')).foundationData],
    ['B1', (await nap('grammarDataB1.js')).grammarDataB1],
    ['B2', (await nap('grammarDataB2.js')).grammarDataB2],
    ['C1+', (await nap('grammarDataC1C2.js')).grammarDataC1C2],
  ];
}

export function doBo(ds) {
  const r = { bai: ds.length, suaLoi: 0, suaLoiHong: 0, vietLai: 0, vietLaiHong: 0, dienVao: 0, dienVaoHong: 0, viDu: [] };
  for (const t of ds) {
    for (const e of t.errorCorrection || []) {
      r.suaLoi += 1;
      if (!suaLoiLamDuoc(e)) { r.suaLoiHong += 1; if (r.viDu.length < 3) r.viDu.push(`${t.id} · sửa lỗi: “${e.sentence}” — từ sai “${e.errorWord}”, sửa thành “${e.correction}”`); }
    }
    for (const e of t.transformation || []) {
      r.vietLai += 1;
      if (!vietLaiLamDuoc(e)) { r.vietLaiHong += 1; if (r.viDu.length < 6) r.viDu.push(`${t.id} · viết lại: “${e.original}” → “${e.a}”`); }
    }
    for (const e of t.fillBlanks || []) { r.dienVao += 1; if (!dienVaoLamDuoc(e)) r.dienVaoHong += 1; }
  }
  return r;
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const pc = (a, b) => (b ? `${((a / b) * 100).toFixed(0)}%` : '—');
  for (const [ten, ds] of await napBoBai()) {
    const r = doBo(ds);
    console.log(`\n══ ${ten} · ${r.bai} bài ══`);
    console.log(`  sửa lỗi  : ${String(r.suaLoiHong).padStart(4)}/${String(r.suaLoi).padEnd(4)} không làm được  (${pc(r.suaLoiHong, r.suaLoi)})`);
    console.log(`  viết lại : ${String(r.vietLaiHong).padStart(4)}/${String(r.vietLai).padEnd(4)} không làm được  (${pc(r.vietLaiHong, r.vietLai)})`);
    console.log(`  điền vào : ${String(r.dienVaoHong).padStart(4)}/${String(r.dienVao).padEnd(4)} là câu giữ chỗ  (${pc(r.dienVaoHong, r.dienVao)})`);
    for (const v of r.viDu) console.log(`    · ${v}`);
  }
}
