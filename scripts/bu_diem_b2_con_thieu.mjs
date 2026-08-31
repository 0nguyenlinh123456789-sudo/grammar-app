// File: scripts/bu_diem_b2_con_thieu.mjs
//
//   node scripts/bu_diem_b2_con_thieu.mjs --ghi
//
// BÙ BA ĐIỂM NGỮ PHÁP B2 CÒN THIẾU, ĐO BẰNG MỤC LỤC SÁCH B2.
//
// ══ NGUỒN CỦA DANH SÁCH — VÀ RANH GIỚI PHÁP LÝ ══
// Chủ dự án gửi "Grammar & Vocabulary Practice Upper-Intermediate B2"
// (MM Publications, © 2012). Trang bản quyền ghi rõ "All rights reserved. No
// part of this publication may be reproduced… without permission in writing".
// App này ĐƯỢC BÁN, nên chép bài tập hay từ vựng của sách vào là vi phạm.
//
// Thứ được dùng là MỤC LỤC — tức DANH SÁCH CHỦ ĐỀ, một dữ kiện chứ không phải
// nội dung được bảo hộ. Đúng cách đã chốt hồi làm Oxford 5000: lấy phạm vi làm
// bảng đối chiếu, còn câu chữ thì tự soạn. Không một câu nào dưới đây lấy từ
// sách.
//
// ══ ĐO ĐƯỢC ══
// Đối chiếu 24 unit của sách với 83 bài ngữ pháp trong app: CẢ 24 chủ đề đều
// đã có. Soi tiếp vào thân bài theo 39 cấu trúc B2 cụ thể thì chỉ còn 3 điểm
// không xuất hiện ở bất kỳ bài nào:
//
//   · `need doing`   — "The car needs washing" (V-ing mang nghĩa bị động)
//   · `whereas`      — liên từ đối lập, khác `while` ở sắc thái so sánh
//   · `all I want is` — biến thể câu chẻ với `all`, app mới dạy `what I need is`
//
// Ba điểm, không phải hai mươi bốn. Nói ra con số đó quan trọng hơn là soạn
// thêm cho nhiều: khoảng trống B2 mà `kiem:camket` báo KHÔNG phải ngữ pháp, mà
// là THIẾU TẬP TỪ VỰNG Oxford ở bậc B2 — và đó đúng là phần không được chép.

import { readFileSync, writeFileSync } from 'node:fs';
import { grammarDataB2 } from '../src/data/grammarDataB2.js';

const GHI = process.argv.includes('--ghi');
const DUONG = 'src/data/grammarDataB2.js';

const THEM = {
  b2_08: {
    fillBlanks: [
      { q: 'The car is filthy — it needs _____ before the trip.', a: 'washing', trans: 'Xe bẩn quá — cần được rửa trước chuyến đi.' },
    ],
    errorCorrection: [
      { sentence: 'This shirt needs to iron before the interview.', errorWord: 'to iron', correction: 'ironing', explanation: '"Need + V-ing" mang nghĩa BỊ ĐỘNG: chiếc áo cần ĐƯỢC là, không phải nó tự là.', trans: 'Chiếc áo này cần được là trước buổi phỏng vấn.' },
    ],
  },
  b2_13: {
    fillBlanks: [
      { q: 'My brother is very talkative, _____ my sister hardly says a word.', a: 'whereas', trans: 'Anh tôi rất nói nhiều, trong khi chị tôi hầu như không nói câu nào.' },
    ],
    errorCorrection: [
      { sentence: 'He prefers the city, whereas as his wife prefers the countryside.', errorWord: 'whereas as', correction: 'whereas', explanation: '"Whereas" đã là liên từ đầy đủ, không đi kèm "as". Nó dùng để ĐỐI CHIẾU hai vế, khác "while" vốn còn nghĩa thời gian.', trans: 'Anh ấy thích thành phố, còn vợ anh ấy thích nông thôn.' },
    ],
  },
  b2_17: {
    fillBlanks: [
      { q: '_____ I want is a quiet weekend at home.', a: 'All', trans: 'Tất cả những gì tôi muốn là một cuối tuần yên tĩnh ở nhà.' },
    ],
    errorCorrection: [
      { sentence: 'All what I need is a good night of sleep.', errorWord: 'All what', correction: 'All', explanation: 'Câu chẻ với "all" KHÔNG dùng thêm "what": "All I need is…". Chỉ dùng "What I need is…" khi mở đầu bằng "what".', trans: 'Tất cả những gì tôi cần là một giấc ngủ ngon.' },
    ],
  },
};

const chuan = (v) => String(v ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
let them = 0;
const loi = [];

const moi = grammarDataB2.map((bai) => {
  const n = THEM[bai.id];
  if (!n) return bai;
  const ra = { ...bai };
  for (const [khoa, ds] of Object.entries(n)) {
    const cu = bai[khoa] || [];
    // Chạy lại nhiều lần phải an toàn: đã có rồi thì không chèn nữa.
    const daCo = new Set(cu.map((x) => chuan(x.sentence ?? x.q)));
    const chua = ds.filter((x) => !daCo.has(chuan(x.sentence ?? x.q)));
    // Tự kiểm trước khi chèn — đúng phép đo mà tests/bai_tap_lam_duoc.test.js dùng.
    for (const x of chua) {
      if (x.errorWord && chuan(x.errorWord) === chuan(x.correction)) loi.push(`${bai.id}: từ sai trùng từ sửa`);
      if (x.errorWord && !chuan(x.sentence).includes(chuan(x.errorWord))) loi.push(`${bai.id}: "${x.errorWord}" không có trong câu`);
      if (x.q && !x.q.includes('_____')) loi.push(`${bai.id}: câu điền từ thiếu chỗ trống`);
    }
    ra[khoa] = [...cu, ...chua];
    them += chua.length;
  }
  return ra;
});

console.log(`thêm ${them} câu vào ${Object.keys(THEM).length} bài B2`);
if (loi.length) { console.log('LỖI:'); for (const x of loi) console.log('  · ' + x); process.exit(1); }
if (!GHI) { console.log('(chạy khan — thêm --ghi để ghi)'); process.exit(0); }

const dau = readFileSync(DUONG, 'utf8').split('export const grammarDataB2')[0];
writeFileSync(DUONG, `${dau}export const grammarDataB2 = ${JSON.stringify(moi, null, 2)};\n`, 'utf8');
console.log(`đã ghi ${DUONG}`);
