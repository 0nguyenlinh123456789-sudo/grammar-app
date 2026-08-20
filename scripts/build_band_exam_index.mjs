// Sinh src/data/bandExamIndex.js — bảng tra NHẸ để trang chủ biết bậc nào có đề
// nào mà KHÔNG phải nạp cả kho đề (~50 KB) vào chunk ai mở app cũng tải.
// Cùng lối đã dùng cho listeningCounts.js / writingCounts.js / audioCounts.js.
import fs from 'node:fs';
process.chdir('D:/HocCode/grammar-app');
const { bandExams } = await import('../src/data/bandExamBank.js');
const { CEFR_OF_BAND, ROADMAP_BANDS } = await import('../src/data/roadmapData.js');

const theoBac = {};
for (const band of ROADMAP_BANDS) {
  const cefr = CEFR_OF_BAND[band];
  const e = bandExams.find((x) => x.cefr === cefr);
  if (!e) continue;
  const cham = e.sections.filter((s) => s.chamDuoc === true);
  theoBac[band] = {
    id: e.id,
    cefr: e.cefr,
    nhan: e.nhanCongBo || e.cefr,
    ten: e.name,
    phut: e.phut,
    soCauChamDuoc: cham.reduce((s, x) => s + x.items.length, 0),
  };
}

const dong = Object.entries(theoBac)
  .map(([b, v]) => `  ${b}: ${JSON.stringify(v)},`)
  .join('\n');

const noiDung = `// File: src/data/bandExamIndex.js
// SINH TỰ ĐỘNG bởi scripts/build_band_exam_index.mjs — đừng sửa tay.
//
// VÌ SAO CÓ FILE NÀY: lộ trình ở trang chủ cần biết "hết bậc này thì thi đề
// nào" để dựng cửa ải cuối bậc. Import thẳng \`bandExamBank.js\` để lấy đúng cái
// tên đề là kéo ~50 KB đề thi vào chunk mà AI MỞ APP CŨNG PHẢI TẢI — đúng cái
// đã đo và đã tách ra ở kho bài nghe (~398 KB) và kho đề viết (~170 KB).
//
// \`tests/band_exam.test.js\` đối chiếu bảng này với kho thật; lệch một chữ là đỏ.
export const BAND_EXAM_INDEX = {
${dong}
};

/** Bậc này có đề thi cuối bậc không? Bậc A0 (foundation) cố ý KHÔNG có. */
export const deThiCuaBac = (band) => BAND_EXAM_INDEX[band] || null;

export default BAND_EXAM_INDEX;
`;

fs.writeFileSync('src/data/bandExamIndex.js', noiDung);
console.log(noiDung);
