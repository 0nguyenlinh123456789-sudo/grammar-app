// File: scripts/report_preint_rebuild.mjs
// Dựng BAO_CAO_SINH_LAI_PREINT.md — bảng đối chiếu TỪNG UNIT trước/sau khi sinh
// lại dữ liệu Oxford Pre-Int (hạng mục #3).
//
// Lý do tồn tại: lần sinh lại này thay 47.000 dòng dữ liệu, không ai kiểm được
// bằng mắt qua `git diff`. Báo cáo này quy diff đó về các con số kiểm được.
//
// Cách dùng:  node scripts/report_preint_rebuild.mjs [git-ref-làm-mốc]
// Mặc định mốc là 8981882 — commit ngay trước hạng mục #3.
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE_REF = process.argv[2] || '8981882';
const FILES = ['oxfordPreIntData.js', 'oxfordPreIntData51_75.js', 'oxfordPreIntData76_100.js'];

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'preint-base-'));
for (const f of FILES) {
  const old = execSync(`git show ${BASE_REF}:src/data/${f}`, { cwd: ROOT, maxBuffer: 1 << 28 }).toString();
  fs.writeFileSync(path.join(TMP, f), old);
}

const load = async (p) => {
  const m = await import(pathToFileURL(p).href);
  return m.default || Object.values(m).find(Array.isArray);
};

const stats = (u) => {
  const fillEx = (u.textbookExercises || []).filter((e) => e.type === 'fill_in_blanks');
  return {
    quiz: (u.quiz || []).length,
    drag: (u.dragDrop?.items || []).length,
    typing: (u.typingGame || []).length,
    fill: fillEx.reduce((a, e) => a + e.questions.length, 0),
    err: (u.textbookExercises || []).filter((e) => e.type === 'error_correction').reduce((a, e) => a + e.questions.length, 0),
    noHole: fillEx.reduce((a, e) => a + e.questions.filter((q) => !q.text.includes('[blank]')).length, 0),
    trans: (u.speaking || []).filter((s) => s.trans !== undefined).length,
  };
};

let md = '# Báo cáo sinh lại dữ liệu Oxford Pre-Int (hạng mục #3)\n\n';
md += `Sinh tự động bởi \`scripts/report_preint_rebuild.mjs\`, đối chiếu mốc \`${BASE_REF}\` với dữ liệu hiện tại.\n\n`;
md += 'Cột **câu-không-chỗ-trống** là số câu "điền vào chỗ trống" mà bản cũ ship ra KHÔNG có chỗ trống nào — người học không thể trả lời đúng dù biết từ. Cột **trans máy** là số ô "bản dịch" của phần luyện nói chứa công thức máy thay vì nghĩa tiếng Việt.\n';

const tot = { o: {}, n: {} };
const addTo = (acc, s) => { for (const k of Object.keys(s)) acc[k] = (acc[k] || 0) + s[k]; };

for (const f of FILES) {
  const oldU = await load(path.join(TMP, f));
  const newU = await load(path.join(ROOT, 'src', 'data', f));
  md += `\n## ${f}\n\n| unit | quiz | kéo-thả | gõ từ | điền trống | sửa lỗi | câu-không-chỗ-trống | trans máy |\n|---|---|---|---|---|---|---|---|\n`;
  for (let i = 0; i < newU.length; i++) {
    const o = stats(oldU[i]);
    const n = stats(newU[i]);
    addTo(tot.o, o); addTo(tot.n, n);
    const cell = (a, b) => (a === b ? String(a) : `${a} → ${b}`);
    md += `| ${newU[i].id} | ${cell(o.quiz, n.quiz)} | ${cell(o.drag, n.drag)} | ${cell(o.typing, n.typing)} | ${cell(o.fill, n.fill)} | ${cell(o.err, n.err)} | ${cell(o.noHole, n.noHole)} | ${cell(o.trans, n.trans)} |\n`;
  }
}

md += '\n## Tổng cộng (100 unit)\n\n| mục | trước | sau | chênh |\n|---|---|---|---|\n';
const LABEL = {
  quiz: 'câu trắc nghiệm', drag: 'item kéo-thả', typing: 'câu gõ từ',
  fill: 'câu điền trống', err: 'câu sửa lỗi',
  noHole: 'câu điền trống KHÔNG có chỗ trống (lỗi)', trans: 'ô "bản dịch" máy-sinh',
};
for (const k of Object.keys(LABEL)) {
  md += `| ${LABEL[k]} | ${tot.o[k]} | ${tot.n[k]} | ${tot.n[k] - tot.o[k] >= 0 ? '+' : ''}${tot.n[k] - tot.o[k]} |\n`;
}

fs.rmSync(TMP, { recursive: true, force: true });
fs.writeFileSync(path.join(ROOT, 'BAO_CAO_SINH_LAI_PREINT.md'), md);
console.log(md.slice(md.indexOf('## Tổng cộng')));
