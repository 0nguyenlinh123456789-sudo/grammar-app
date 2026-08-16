// File: scripts/build_reading_texts.mjs
// Ghép VĂN BẢN ĐỌC DÀI (máy lấy từ VOA) với CÂU HỎI SOẠN TAY (người viết) thành
// src/data/readingTexts.js (việc 5.3).
//
// Cùng khuôn với build_listening_passages.mjs, cùng lý do tách hai nguồn: văn
// bản là dữ liệu có sẵn, máy chép lại được; câu hỏi hiểu ý thì KHÔNG — câu hỏi
// sinh từ khuôn mẫu là đúng loại nội dung máy-sinh mà chuỗi dọn nội dung đã
// xoá. Mỗi câu hỏi trong scripts/data/reading_questions.mjs là do người đọc
// hết bài rồi viết ra.
//
// Chạy:  node scripts/build_reading_texts.mjs --in voa_doc_chon.json
import fs from 'fs';
import { CAU_HOI_DOC } from './data/reading_questions.mjs';
import { locBanChepLoi, tachTuKho } from '../src/utils/transcriptClean.js';

const arg = (t, m) => { const i = process.argv.indexOf(`--${t}`); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : m; };
const IN = arg('in', 'voa_doc_chon.json');
const OUT = arg('out', 'src/data/readingTexts.js');

const bai = JSON.parse(fs.readFileSync(IN, 'utf8'));
const ra = [];
const bo = [];

for (const b of bai) {
  const hoi = CAU_HOI_DOC[b.id];
  if (!hoi || !hoi.length) { bo.push(`${b.id}: chưa có câu hỏi soạn tay`); continue; }
  for (const h of hoi) {
    if (!h.q || !h.a || !Array.isArray(h.opts) || h.opts.length < 3 || !h.why) {
      throw new Error(`${b.id}: câu hỏi thiếu trường (q/opts/a/why): ${JSON.stringify(h).slice(0, 80)}`);
    }
    if (!h.opts.includes(h.a)) throw new Error(`${b.id}: đáp án "${h.a}" không nằm trong các lựa chọn`);
  }
  // LỌC LẠI LÚC DỰNG, không tin bản lọc lúc thu thập: luật làm sạch tiến hoá
  // (dòng giải nghĩa không gạch, khối hướng dẫn Disqus, dòng zero-width) mà
  // ứng viên thì thu từ trước — "luật thêm sau không bao giờ chạy trên dữ liệu
  // cũ" trừ khi chạy lại ở đây. Từ khó gộp cả hai nguồn: trích lúc thu thập +
  // trích được thêm bây giờ.
  const doan = locBanChepLoi(b.transcript);
  const tuKho = [...(b.tuKho || []), ...tachTuKho(b.transcript)];
  const daCo = new Set();
  const glossary = tuKho.filter((t) => {
    const k = t.word.toLowerCase();
    if (daCo.has(k)) return false;
    daCo.add(k);
    return true;
  });
  ra.push({
    id: b.id,
    title: b.title,
    series: b.series,
    words: doan.join(' ').split(/\s+/).filter(Boolean).length,
    // Bài đọc nào có bản thu của VOA thì giữ đường dẫn để người học nghe kèm.
    // Không có cũng nhận — đây là bài ĐỌC.
    audioUrl: b.audioUrl || null,
    paragraphs: doan,
    glossary,
    questions: hoi,
    source: b.source,
    sourceUrl: b.sourceUrl,
    license: b.license,
    author: b.author,
    attributionUrl: b.attributionUrl,
    licenseStatementUrl: b.licenseStatementUrl,
    licenseCheckedAt: b.licenseCheckedAt,
  });
}

const noiDung = `// File: src/data/readingTexts.js
// SINH TỰ ĐỘNG bởi scripts/build_reading_texts.mjs — đừng sửa tay.
//
// VĂN BẢN ĐỌC DÀI 600–1.000 TỪ (việc 5.3) — thể loại thật (báo / khoa học
// thường thức), cho người học đường lên C1 đọc văn bản thật thay vì đoạn
// 100 từ. Ba điều cần biết:
//
// 1. GIẤY PHÉP nghiêm hơn kho bài nghe: chỉ nhận bài có dòng ghi công
//    "wrote this story for VOA Learning English / VOA Special English" và
//    KHÔNG nhắc hãng thông tấn nào (AP/Reuters/AFP bị VOA loại trừ tường
//    minh khỏi phạm vi công cộng). Xem scripts/harvest_voa_reading.mjs.
//
// 2. \`questions\` là câu hỏi SOẠN TAY (scripts/data/reading_questions.mjs),
//    viết sau khi đọc hết bài. Không câu nào sinh từ khuôn.
//
// 3. \`audioUrl\` (nếu có) trỏ thẳng máy chủ VOA, không sao chép về kho —
//    cùng lý do với kho bài nghe.
export const readingTexts = ${JSON.stringify(ra, null, 2)};
`;

fs.writeFileSync(OUT, noiDung);
fs.writeFileSync('src/data/readingCounts.js', `// File: src/data/readingCounts.js
// ⚠️ MÁY SINH — chạy lại: node scripts/build_reading_texts.mjs
// Chỉ chứa SỐ ĐẾM, để trang chủ nói được con số thật mà không kéo cả kho bài
// đọc (~${Math.round(noiDung.length / 1024)} KB) vào gói tải đầu.
export const SO_BAI_DOC = ${ra.length};
`);

console.log(`Đã ghi ${ra.length} bài đọc → ${OUT}`);
if (bo.length) {
  console.log(`Bỏ ${bo.length} bài (chưa có câu hỏi soạn tay):`);
  for (const b of bo) console.log(`  - ${b}`);
}
