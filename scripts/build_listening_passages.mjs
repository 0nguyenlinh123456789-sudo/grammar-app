// File: scripts/build_listening_passages.mjs
// Ghép BẢN CHÉP LỜI (máy lấy từ VOA) với CÂU HỎI SOẠN TAY (người viết) thành
// src/data/listeningPassages.js.
//
// Vì sao tách làm hai nguồn: bản chép lời là dữ liệu có sẵn, máy chép lại được.
// Câu hỏi hiểu ý thì KHÔNG — câu hỏi sinh từ khuôn mẫu là đúng thứ nội dung
// máy-sinh mà cả chuỗi dọn nội dung đã xoá đi. Mỗi câu hỏi trong
// scripts/data/voa_questions.mjs là do người đọc bản chép lời rồi viết ra.
//
// Chạy:  node scripts/build_listening_passages.mjs --in voa_chon.json
import fs from 'fs';
import { CAU_HOI } from './data/voa_questions.mjs';

const arg = (t, m) => { const i = process.argv.indexOf(`--${t}`); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : m; };
const IN = arg('in', 'voa_chon.json');
const OUT = arg('out', 'src/data/listeningPassages.js');

const bai = JSON.parse(fs.readFileSync(IN, 'utf8'));
const ra = [];
const bo = [];

for (const b of bai) {
  const hoi = CAU_HOI[b.id];
  if (!hoi || !hoi.length) { bo.push(`${b.id}: chưa có câu hỏi soạn tay`); continue; }

  // Cắt phần chân bài: dòng chào cuối, dòng ghi tên người viết, và mục
  // "Words in This Story" (giải nghĩa từ) — chúng không nằm trong mạch nghe.
  const than = b.transcript.filter((p) => !/^(And that|Anna Matteo wrote|.{1,20}\s+[-–]\s*(n|v|adj|adv|phrase|phrasal verb)\b)/i.test(p));
  const tuKho = b.transcript
    .filter((p) => /^.{1,25}\s+[-–]\s*(n|v|adj|adv|phrase|phrasal verb)\b/i.test(p))
    .map((p) => {
      const m = p.match(/^(.{1,25}?)\s+[-–]\s*(n|v|adj|adv|phrase|phrasal verb)\b[.:]?\s*(.*)$/i);
      return m ? { word: m[1].trim(), pos: m[2], meaning: m[3].trim() } : null;
    })
    .filter(Boolean);

  ra.push({
    id: b.id,
    title: b.title,
    series: b.series,
    audioUrl: b.audioUrl,
    secondsEstimated: b.secondsEstimated,
    words: than.join(' ').split(/\s+/).length,
    transcript: than,
    glossary: tuKho,
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

const than = ra.map((e) => '  ' + JSON.stringify(e) + ',').join('\n');
fs.writeFileSync(OUT, `// File: src/data/listeningPassages.js
// SINH TỰ ĐỘNG bởi scripts/build_listening_passages.mjs — đừng sửa tay.
//
// BÀI NGHE THEO ĐOẠN (việc 2.2). Ba điều cần biết trước khi sửa gì ở đây:
//
// 1. \`audioUrl\` TRỎ THẲNG tới máy chủ VOA, không sao chép file về kho.
//    Lý do không phải dung lượng (dù 20 bài là ~44 MB). Lý do là điều khoản
//    của VOA: nội dung của họ "may also contain" tư liệu bên thứ ba KHÔNG
//    thuộc phạm vi công cộng. Trỏ tới thì ta không phát hành lại gì cả, nên
//    không phải khẳng định một điều ta không kiểm được. Máy chủ VOA trả
//    Access-Control-Allow-Origin: * nên trình duyệt phát được.
//    Đổi lại: phải BÁO TO khi không tải được — xem onError trong
//    ListeningPassagePanel.jsx. Và chạy scripts/check_voa_links.mjs định kỳ.
//
// 2. \`questions\` là câu hỏi SOẠN TAY, không phải máy sinh. Câu hỏi hiểu ý
//    sinh từ khuôn mẫu chính là loại nội dung máy-sinh đã bị xoá khỏi kho.
//
// 3. \`secondsEstimated\` là ƯỚC TÍNH suy từ dung lượng file ở 64 kbps — bitrate
//    đo được từ khung MPEG của MỘT file. Giao diện phải hiển thị kèm chữ
//    "khoảng", không in ra như con số đo được.
export const listeningPassages = [
${than}
];

export default listeningPassages;
`);

process.stderr.write(`Đã ghi ${ra.length} bài nghe vào ${OUT}.\n`);
if (bo.length) process.stderr.write(`Bỏ ${bo.length}:\n  ${bo.join('\n  ')}\n`);
