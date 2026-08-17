// File: scripts/check_live_strings.mjs
// KIỂM BẢN ĐÃ LÊN MẠNG BẰNG NỘI DUNG, KHÔNG BẰNG MÃ BĂM CHUNK.
//
//   node scripts/check_live_strings.mjs "chuỗi 1" "chuỗi 2" ...
//   node scripts/check_live_strings.mjs --file duong/dan/chuoi.txt
//
// Vì sao là script chứ không phải mấy dòng gõ lại mỗi lần: hôm 17/08 tôi gõ lại
// phép quét và đặt regex đòi tiền tố "/assets/", trong khi chunk con được nhắc
// tới dưới dạng './WelcomePage-xxxx.js'. Kết quả: quét ĐÚNG 1 chunk rồi báo
// MISS cả 5 chuỗi — một báo động giả trông y như bản deploy bị lỗi. Đây là đúng
// loại việc phải nằm trong repo: cùng một công cụ, gõ lại lần nào cũng có thể
// sai lần đó.
//
// CHỐT CHẶN: quét được ít hơn SO_CHUNK_TOI_THIEU chunk thì THOÁT LỖI, không báo
// MISS. Một phép quét hỏng và một bản deploy thiếu chuỗi trông giống nhau trên
// màn hình, mà hai chuyện đó khác nhau hoàn toàn.
//
// THỨ TỰ ĐÚNG (đã học hai lần): kiểm bản dựng TẠI MÁY trước. Thấy thiếu trên
// live mà bản local có, thì gần như luôn là deploy chậm một commit — grep
// dist/assets trước khi kết luận có lỗi.

import fs from 'node:fs';

const BASE = process.env.LIVE_BASE || 'https://grammar-app-gray.vercel.app';
const SO_CHUNK_TOI_THIEU = 10;
const RE_CHUNK = /([A-Za-z0-9_-]+-[A-Za-z0-9_]{8}\.js)/g;

const argv = process.argv.slice(2);
let canKiem = [];
const iFile = argv.indexOf('--file');
if (iFile >= 0) {
  canKiem = fs.readFileSync(argv[iFile + 1], 'utf8').split('\n').map((d) => d.trim()).filter(Boolean);
} else {
  canKiem = argv.filter((a) => !a.startsWith('--'));
}
if (!canKiem.length) {
  console.error('Cần ít nhất một chuỗi để tìm. Xem phần đầu file.');
  process.exit(2);
}

const tai = async (u) => {
  const r = await fetch(BASE + u);
  if (!r.ok) throw new Error(`${r.status} ${u}`);
  return r.text();
};

const html = await tai('/');
const vaoCua = [...html.matchAll(/src="(\/assets\/[^"]+\.js)"/g)].map((m) => m[1]);
if (!vaoCua.length) {
  console.error('Không tìm thấy chunk vào cửa trong HTML — trang có thể đang lỗi.');
  process.exit(2);
}

const daThay = new Set(vaoCua);
const chunk = [];
for (const e of vaoCua) {
  const src = await tai(e);
  chunk.push([e, src]);
  // MỘT tầng con là đủ cho cấu trúc hiện tại (entry → chunk lazy của từng
  // trang). Nếu về sau có chunk cháu thì chốt chặn số lượng ở dưới sẽ đỏ trước
  // khi ai đó kịp tin vào một kết quả thiếu.
  for (const m of src.matchAll(RE_CHUNK)) {
    const u = `/assets/${m[1]}`;
    if (daThay.has(u)) continue;
    daThay.add(u);
    try { chunk.push([u, await tai(u)]); } catch { /* chunk không tồn tại riêng lẻ */ }
  }
}

console.log(`Bản live: ${vaoCua.join(' ')} · quét ${chunk.length} chunk`);
if (chunk.length < SO_CHUNK_TOI_THIEU) {
  console.error(`✖ CHỈ QUÉT ĐƯỢC ${chunk.length} CHUNK (cần ≥${SO_CHUNK_TOI_THIEU}). Phép quét hỏng, KHÔNG phải bản deploy thiếu chuỗi — sửa RE_CHUNK trước khi kết luận gì.`);
  process.exit(2);
}

let thieu = 0;
for (const c of canKiem) {
  const hit = chunk.filter(([, s]) => s.includes(c)).map(([n]) => n);
  if (hit.length) console.log(`✅ ${JSON.stringify(c)} → ${hit[0]}`);
  else { thieu++; console.log(`✖ ${JSON.stringify(c)} → KHÔNG THẤY`); }
}
console.log(thieu ? `\n✖ thiếu ${thieu}/${canKiem.length} chuỗi. Kiểm dist/ tại máy trước: deploy có thể đang chậm một commit.`
  : `\n✅ ${canKiem.length}/${canKiem.length} chuỗi có mặt trên bản live.`);
process.exit(thieu ? 1 : 0);
