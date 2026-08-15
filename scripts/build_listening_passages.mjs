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
import { locBanChepLoi, tachTuKho } from '../src/utils/transcriptClean.js';

const arg = (t, m) => { const i = process.argv.indexOf(`--${t}`); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : m; };
const IN = arg('in', 'voa_chon.json');
const OUT = arg('out', 'src/data/listeningPassages.js');

const bai = JSON.parse(fs.readFileSync(IN, 'utf8'));
const ra = [];
const bo = [];

for (const b of bai) {
  const hoi = CAU_HOI[b.id];
  if (!hoi || !hoi.length) { bo.push(`${b.id}: chưa có câu hỏi soạn tay`); continue; }

  // Cắt những dòng CÓ TRÊN TRANG WEB NHƯNG KHÔNG CÓ TRONG BẢN THU: dòng ghi
  // tên người viết, lời mời bình luận, bảng ôn tập chỉ in trên giấy, và mục
  // "Words in This Story". Luật nằm ở src/utils/transcriptClean.js — một bản
  // duy nhất, dùng chung với bài kiểm.
  const than = locBanChepLoi(b.transcript);
  const tuKho = tachTuKho(b.transcript);

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
// 3. \`secondsEstimated\` SUY TỪ dung lượng file và bitrate đọc được ở khung
//    MPEG của CHÍNH file đó (bản trước ghi cứng 64 kbps vì đo từ một file duy
//    nhất — đo lại cả kho thì đúng thật, nhưng đúng do may). Vẫn là suy ra
//    chứ không phải đọc thời lượng, nên giao diện hiển thị kèm chữ "khoảng".
//
// 4. \`transcript\` chỉ giữ những dòng CÓ TRONG BẢN THU. Dòng ghi tên người
//    viết, lời mời bình luận, bảng ôn tập chỉ in trên giấy đều bị cắt — xem
//    src/utils/transcriptClean.js. Người học đọc thấy một câu mà tai không
//    nghe thấy sẽ tưởng mình nghe sót.
export const listeningPassages = [
${than}
];

export default listeningPassages;
`);

process.stderr.write(`Đã ghi ${ra.length} bài nghe vào ${OUT}.\n`);
if (bo.length) process.stderr.write(`Bỏ ${bo.length}:\n  ${bo.join('\n  ')}\n`);
