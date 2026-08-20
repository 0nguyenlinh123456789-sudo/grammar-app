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

// Bảng tra NHÃN theo mã bậc. `bandExam.js` cần nó để chuẩn hoá bản ghi cũ
// (thiếu `nhanIn`) mà KHÔNG phải nạp cả kho đề.
const dongNhan = Object.values(theoBac)
  .map((v) => `  ${JSON.stringify(v.cefr)}: ${JSON.stringify(v.nhan)},`)
  .join('\n');

// Lời giải nghĩa đi KÈM nhãn, không tách rời. Một tờ giấy in "Nền C1" mà
// không nói "Nền C1" nghĩa là gì thì người đọc vẫn hiểu thành "đạt C1" —
// tức là cái nhãn tự nó không cứu được gì nếu thiếu câu đi sau.
const dongGhiChu = bandExams
  .filter((e) => e.ghiChuBac)
  .map((e) => `  ${JSON.stringify(e.cefr)}: ${JSON.stringify(e.ghiChuBac)},`)
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

/**
 * NHÃN CÔNG BỐ theo mã bậc — thứ được phép in ra giấy.
 *
 * Có bảng này vì chuanHoa() trong bandExam.js phải xử lý bản ghi CŨ, tức là
 * bản ghi thiếu nhanIn. Rơi về k.cefr thì một bản ghi bậc C1 in ra chữ
 * "C1" trần — đúng cái nói quá mà cả đề nền C1 dựng lên để tránh. Ở đây thì
 * nó tra đúng "Nền C1" như mọi bản ghi mới.
 */
export const NHAN_THEO_CEFR = {
${dongNhan}
};

/**
 * LỜI GIẢI NGHĨA đi kèm nhãn, tra theo mã bậc.
 *
 * Đã dính thật: bản ghi cũ (thiếu nhanIn) đi qua chuanHoa() thì tra ra đúng
 * nhãn "Nền C1", nhưng ghiChuBac rơi về null — nên tờ giấy in một cái nhãn
 * lạ mà không nói nó nghĩa là gì. Bộ lái trình duyệt bắt được ở đúng bước
 * mở tờ chứng nhận. Nhãn và lời giải nghĩa phải đi cùng nhau, luôn.
 */
export const GHI_CHU_THEO_CEFR = {
${dongGhiChu}
};

/** Bậc này có đề thi cuối bậc không? Bậc A0 (foundation) cố ý KHÔNG có. */
export const deThiCuaBac = (band) => BAND_EXAM_INDEX[band] || null;

export default BAND_EXAM_INDEX;
`;

fs.writeFileSync('src/data/bandExamIndex.js', noiDung);
console.log(noiDung);
