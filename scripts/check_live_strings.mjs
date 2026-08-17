// File: scripts/check_live_strings.mjs
// KIỂM BẢN DỰNG BẰNG NỘI DUNG, KHÔNG BẰNG MÃ BĂM CHUNK.
//
//   node scripts/check_live_strings.mjs --dist "chuỗi 1" "chuỗi 2"     # bản tại máy
//   node scripts/check_live_strings.mjs "chuỗi 1" "chuỗi 2"            # bản đã lên mạng
//   node scripts/check_live_strings.mjs --file danh/sach.txt
//   node scripts/check_live_strings.mjs --chunk WelcomePage --dist "…"  # đòi ĐÚNG chunk
//
// THỨ TỰ ĐÚNG (đã học hai lần): `--dist` trước, rồi mới không có `--dist`. Thấy
// thiếu trên mạng mà bản tại máy có thì gần như luôn là deploy chậm một commit.
//
// ══ VÌ SAO ĐÂY LÀ SCRIPT CHỨ KHÔNG PHẢI MẤY DÒNG GÕ LẠI MỖI LẦN ══
// Trong CÙNG MỘT NGÀY (17/08), phép kiểm gõ tay báo sai HAI lần về một bản dựng
// hoàn toàn đúng:
//   1. Gõ lại phép quét chunk và đặt regex đòi tiền tố "/assets/", trong khi
//      chunk con được nhắc dưới dạng './WelcomePage-xxxx.js' → quét đúng 1 chunk
//      rồi báo MISS cả 5 chuỗi.
//   2. Viết phép kiểm bằng Python với chuỗi escape Unicode và gõ sai một escape
//      (`ngự` = "ngự" thay vì `ngữ` = "ngữ") → báo MISS một chuỗi đang
//      có thật.
// Cả hai lần đều trông y như bản dựng bị lỗi. Nên: **một bộ kiểm, dùng cho cả
// hai chặng, đọc UTF-8 trực tiếp bằng Node, không qua vòng escape nào.**
//
// ══ HAI CHỐT CHẶN, VÀ ĐÂY MỚI LÀ PHẦN QUAN TRỌNG ══
//   · Quét được ít hơn SO_CHUNK_TOI_THIEU chunk → THOÁT LỖI, không báo MISS.
//     Một phép quét hỏng và một bản dựng thiếu chuỗi trông giống nhau trên màn
//     hình, mà một cái là lỗi của tôi, một cái là lỗi của bản dựng.
//   · `--chunk <tên>` đòi chuỗi nằm đúng trong chunk mang tên đó. Cần có vì
//     "Ôn lại" trùng với một chuỗi trong chunk khác — kiểu kiểm "có mặt ở chunk
//     nào đó" xanh trong khi ở chỗ cần thì không có.

import fs from 'node:fs';

const BASE = process.env.LIVE_BASE || 'https://grammar-app-gray.vercel.app';
const SO_CHUNK_TOI_THIEU = 10;
const RE_CHUNK = /([A-Za-z0-9_-]+-[A-Za-z0-9_]{8}\.js)/g;

const argv = process.argv.slice(2);
const laDist = argv.includes('--dist');
const iChunk = argv.indexOf('--chunk');
const chunkBatBuoc = iChunk >= 0 ? argv[iChunk + 1] : null;
const iFile = argv.indexOf('--file');

let canKiem = iFile >= 0
  ? fs.readFileSync(argv[iFile + 1], 'utf8').split('\n').map((d) => d.trim()).filter(Boolean)
  : argv.filter((a, k) => !a.startsWith('--') && k !== iChunk + 1 && k !== iFile + 1);

if (!canKiem.length) {
  console.error('Cần ít nhất một chuỗi để tìm. Xem phần đầu file.');
  process.exit(2);
}

const tai = async (u) => {
  const r = await fetch(BASE + u);
  if (!r.ok) throw new Error(`${r.status} ${u}`);
  return r.text();
};

async function doanChunk() {
  if (laDist) {
    const thu = 'dist/assets';
    if (!fs.existsSync(thu)) {
      console.error(`Không có ${thu} — chạy "npm run build" trước.`);
      process.exit(2);
    }
    return fs.readdirSync(thu).filter((f) => f.endsWith('.js'))
      .map((f) => [`/assets/${f}`, fs.readFileSync(`${thu}/${f}`, 'utf8')]);
  }
  const trang = await tai('/');
  const vao = [...trang.matchAll(/src="(\/assets\/[^"]+\.js)"/g)].map((m) => m[1]);
  if (!vao.length) {
    console.error('Không tìm thấy chunk vào cửa trong HTML — trang có thể đang lỗi.');
    process.exit(2);
  }
  const daThay = new Set(vao);
  const ds = [];
  for (const e of vao) {
    const src = await tai(e);
    ds.push([e, src]);
    // MỘT tầng con là đủ cho cấu trúc hiện tại (entry → chunk lazy của từng
    // trang). Có chunk cháu thì chốt chặn số lượng đỏ trước khi ai kịp tin.
    for (const m of src.matchAll(RE_CHUNK)) {
      const u = `/assets/${m[1]}`;
      if (daThay.has(u)) continue;
      daThay.add(u);
      try { ds.push([u, await tai(u)]); } catch { /* chunk không tồn tại riêng lẻ */ }
    }
  }
  return ds;
}

const chunk = await doanChunk();
console.log(`${laDist ? 'Bản dựng tại máy' : 'Bản đã lên mạng'} · quét ${chunk.length} chunk${chunkBatBuoc ? ` · đòi chunk "${chunkBatBuoc}"` : ''}`);

if (chunk.length < SO_CHUNK_TOI_THIEU) {
  console.error(`✖ CHỈ QUÉT ĐƯỢC ${chunk.length} CHUNK (cần ≥${SO_CHUNK_TOI_THIEU}). Phép quét hỏng, KHÔNG phải bản dựng thiếu chuỗi — sửa RE_CHUNK trước khi kết luận gì.`);
  process.exit(2);
}

let thieu = 0;
for (const c of canKiem) {
  const hit = chunk.filter(([ten, s]) => s.includes(c) && (!chunkBatBuoc || ten.includes(chunkBatBuoc)));
  if (hit.length) {
    console.log(`✅ ${JSON.stringify(c)} → ${hit[0][0]}`);
  } else {
    thieu++;
    const oCho = chunkBatBuoc ? chunk.filter(([, s]) => s.includes(c)).map(([t]) => t) : [];
    console.log(`✖ ${JSON.stringify(c)} → KHÔNG THẤY${oCho.length ? ` (có ở ${oCho[0]}, nhưng không ở chunk "${chunkBatBuoc}")` : ''}`);
  }
}

console.log(thieu
  ? `\n✖ thiếu ${thieu}/${canKiem.length} chuỗi.${laDist ? '' : ' Chạy lại với --dist trước: deploy có thể đang chậm một commit.'}`
  : `\n✅ ${canKiem.length}/${canKiem.length} chuỗi có mặt.`);
process.exit(thieu ? 1 : 0);
