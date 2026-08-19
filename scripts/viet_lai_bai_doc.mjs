// File: scripts/viet_lai_bai_doc.mjs
//
//   node scripts/viet_lai_bai_doc.mjs            # chỉ IN RA để đối chiếu, không ghi gì
//   node scripts/viet_lai_bai_doc.mjs --ghi      # ghi vào src/data/*
//
// GHI BÀI ĐỌC VIẾT LẠI VÀO KHO, VÀ IN BẢNG ĐỐI CHIẾU TRƯỚC KHI GHI.
//
// Mặc định KHÔNG ghi: nguyên tắc của dự án là duyệt bảng đối chiếu trước khi sửa
// chuỗi hàng loạt. Chạy không cờ thì nó in ra từng câu hỏi cạnh CHÍNH CÂU CĂN CỨ
// mà câu hỏi đó trỏ tới — đó là thứ duy nhất mắt người cần soi, vì mọi chuyện
// còn lại (chép nguyên văn, khớp số câu) đã có máy lo.
//
// ══ VÌ SAO CẦN BẢNG ĐỐI CHIẾU DÙ ĐÃ CÓ MÁY KIỂM ══
// Máy kiểm được `dan` có nằm trong bài không, nhưng KHÔNG kiểm được câu căn cứ có
// thật sự trả lời câu hỏi hay không. Đúng lúc soạn đợt này tôi đã trỏ một câu hỏi
// về nhà máy vào câu nói về trường học (chỉ số 8 thay vì 5) — `dan` vẫn chép
// nguyên văn, mọi test vẫn xanh, và người học sẽ đọc một lời giải thích không
// liên quan gì tới câu hỏi. Chỉ có đọc cạnh nhau mới thấy.

import fs from 'node:fs';
import path from 'node:path';
import { VIET_LAI } from './data/viet_lai_bai_doc.mjs';

const GHI = process.argv.includes('--ghi');
const DATA = path.resolve('src/data');

// ── 1. Kiểm hình dữ liệu trước khi làm gì ──────────────────────────────────
const loi = [];
for (const [id, b] of Object.entries(VIET_LAI)) {
  if (!Array.isArray(b.en) || !Array.isArray(b.vi)) { loi.push(`${id}: en/vi phải là mảng câu`); continue; }
  if (b.en.length !== b.vi.length) {
    loi.push(`${id}: ${b.en.length} câu tiếng Anh nhưng ${b.vi.length} câu tiếng Việt — bản dịch sẽ tả một bài khác`);
  }
  if (b.en.length < 6) loi.push(`${id}: chỉ ${b.en.length} câu, dưới ngưỡng 6 câu của bộ lọc`);
  const tu = b.en.join(' ').split(/\s+/).length;
  if (tu < 80) loi.push(`${id}: chỉ ${tu} từ, dưới ngưỡng 80 từ`);
  if (!Array.isArray(b.hoi) || b.hoi.length < 4) loi.push(`${id}: cần ≥4 câu hỏi, đang có ${b.hoi?.length || 0}`);
  const dungCau = new Set();
  for (const [i, h] of (b.hoi || []).entries()) {
    if (!Number.isInteger(h.cau) || h.cau < 0 || h.cau >= b.en.length) {
      loi.push(`${id} câu ${i + 1}: chỉ số căn cứ ${h.cau} nằm ngoài 0..${b.en.length - 1}`);
      continue;
    }
    // Bốn câu hỏi phải trỏ vào BỐN câu khác nhau — đó chính là phép thử đã dùng
    // để xếp loại. Hai câu hỏi cùng một căn cứ là hỏi lại một chỗ.
    if (dungCau.has(h.cau)) loi.push(`${id} câu ${i + 1}: trùng căn cứ với một câu hỏi khác (câu số ${h.cau})`);
    dungCau.add(h.cau);
    if (!Array.isArray(h.options) || h.options.length < 3) loi.push(`${id} câu ${i + 1}: quá ít lựa chọn`);
    if (new Set(h.options).size !== h.options.length) loi.push(`${id} câu ${i + 1}: có hai lựa chọn trùng nhau`);
  }
}
if (loi.length) {
  console.error(`DỪNG — ${loi.length} chỗ sai hình dữ liệu:\n  ${loi.join('\n  ')}`);
  process.exit(1);
}

// ── 2. Bảng đối chiếu: câu hỏi cạnh câu căn cứ ─────────────────────────────
for (const [id, b] of Object.entries(VIET_LAI)) {
  const tu = b.en.join(' ').split(/\s+/).length;
  console.log(`\n═══ ${id}  (${b.en.length} câu · ${tu} từ · ${b.hoi.length} câu hỏi) ═══`);
  for (const h of b.hoi) {
    console.log(`\n  HỎI  ${h.q}`);
    console.log(`  ĐÁP  ${h.options[h.answer]}`);
    console.log(`  CĂN CỨ [câu ${h.cau}]  ${b.en[h.cau]}`);
  }
}

if (!GHI) {
  console.log('\n\n(chỉ in ra để đối chiếu — thêm --ghi để ghi vào src/data)');
  process.exit(0);
}

// ── 3. Ghi vào kho ─────────────────────────────────────────────────────────
// Thay ĐÚNG chuỗi của đúng chủ đề: tìm khối chủ đề theo `id: '<id>'` rồi chỉ đổi
// hai chuỗi storyEn/storyVi TRONG khối đó. Thay theo toàn file sẽ đụng chủ đề
// khác dùng chung một câu.
const tep = fs.readdirSync(DATA).filter((f) => f.endsWith('.js'));
const bo = (s) => JSON.stringify(s);
let daGhi = 0;

for (const [id, b] of Object.entries(VIET_LAI)) {
  // Kho khai id bằng CẢ HAI kiểu nháy — `id: "animals-pets-beginner"` ở file này,
  // `id: 'x'` ở file khác. Bản đầu chỉ dò nháy đơn nên không tìm thấy gì; may là
  // nó dừng TRƯỚC khi ghi, nên không file nào bị sửa nửa vời. Nếu nó ghi theo thứ
  // tự rồi mới gặp lỗi thì kho đã ở trạng thái nửa cũ nửa mới.
  const moc = (x) => [`id: '${x}'`, `id: "${x}"`];
  const f = tep.find((x) => {
    const noi = fs.readFileSync(path.join(DATA, x), 'utf8');
    return moc(id).some((m) => noi.includes(m));
  });
  if (!f) { console.error(`KHÔNG TÌM THẤY chủ đề ${id} trong src/data`); process.exit(1); }
  const duong = path.join(DATA, f);
  let s = fs.readFileSync(duong, 'utf8');

  const dau = Math.max(...moc(id).map((m) => s.indexOf(m)));
  // Biên phải: id của chủ đề TIẾP THEO, hoặc hết file. Phải xét cả hai kiểu nháy
  // rồi lấy cái GẦN NHẤT — lấy sai biên là ghi tràn sang chủ đề bên cạnh.
  const ke = ["id: '", 'id: "'].map((m) => s.indexOf(m, dau + 6)).filter((i) => i >= 0);
  const het = ke.length ? Math.min(...ke) : s.length;
  const khoi = s.slice(dau, het);

  let moi = khoi;
  for (const [truong, gt] of [['storyEn', b.en.join(' ')], ['storyVi', b.vi.join(' ')]]) {
    const re = new RegExp(`${truong}:\\s*"(?:[^"\\\\]|\\\\.)*"`);
    if (!re.test(moi)) { console.error(`${id}: không thấy trường ${truong} trong khối chủ đề`); process.exit(1); }
    moi = moi.replace(re, `${truong}: ${bo(gt)}`);
  }
  s = s.slice(0, dau) + moi + s.slice(het);
  fs.writeFileSync(duong, s);
  console.log(`ghi ${id} → src/data/${f}`);
  daGhi += 1;
}
console.log(`\nđã ghi ${daGhi} bài đọc. Việc còn lại, làm bằng tay có chủ ý:`);
console.log('  1. node scripts/audit_story_caps.mjs --snapshot   (chụp lại ảnh nội dung)');
console.log('  2. soạn câu hỏi vào src/data/storyQuizA1.js / storyQuizA2.js');
console.log('  3. đổi nhóm trong scripts/data/a1a2_phan_loai.mjs sang soan + xong');
