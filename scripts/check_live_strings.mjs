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
//
// ══ ĐIỂM MÙ ĐÃ ĐO ĐƯỢC — ĐỌC TRƯỚC KHI TIN MỘT KẾT QUẢ "KHÔNG THẤY" ══
// Bộ này tìm tên chunk bằng cách DÒ CHỮ trong mã đã gói. Có chunk mà tên nó
// không xuất hiện nguyên vẹn ở đâu cả (bộ gói dựng tên từ nhiều mảnh), nên bộ
// này KHÔNG với tới được. Đã dính thật 19/08: nó báo thiếu hai chuỗi trên bản
// live, mà mở trình duyệt ra thì chunk `VocabVstepPage-*.js` có đủ cả hai.
//
// Nên: **"KHÔNG THẤY" ở đây KHÔNG chứng minh bản live thiếu chuỗi.** Nó chỉ nói
// "tôi không với tới". Muốn dứt điểm thì `npm run kiem:live` — bộ đó mở trình
// duyệt thật, để chính app tự nạp chunk của nó rồi mới đọc.
// Bộ này giữ lại vì nó nhanh (vài giây, không cần Chrome) và đủ dùng cho `--dist`,
// nơi mọi tệp đều nằm sẵn trên đĩa và không có điểm mù nào.

import fs from 'node:fs';

const BASE = process.env.LIVE_BASE || 'https://grammar-app-gray.vercel.app';
const SO_CHUNK_TOI_THIEU = 10;
const RE_CHUNK = /([A-Za-z0-9_-]+-[A-Za-z0-9_]{8}\.js)/g;

const argv = process.argv.slice(2);
const laDist = argv.includes('--dist');
const iChunk = argv.indexOf('--chunk');
const chunkBatBuoc = iChunk >= 0 ? argv[iChunk + 1] : null;
const iFile = argv.indexOf('--file');

// Chỉ loại vị trí ĐỨNG SAU một cờ CÓ THẬT. Bản đầu viết `k !== iChunk + 1` mà
// khi không truyền `--chunk` thì `iChunk` là -1, nên nó loại luôn phần tử thứ 0
// — tức **âm thầm bỏ chuỗi đầu tiên**. Bắt được vì đưa 3 chuỗi mà nó báo
// "2/2 chuỗi có mặt": mẫu số cũng tụt theo nên nhìn qua vẫn thấy hợp lệ. Một bộ
// kiểm bỏ bớt đầu vào mà vẫn báo xanh còn nguy hiểm hơn một bộ kiểm hỏng hẳn.
const viTriGiaTriCo = new Set([iChunk, iFile].filter((k) => k >= 0).map((k) => k + 1));
let canKiem = iFile >= 0
  ? fs.readFileSync(argv[iFile + 1], 'utf8').split('\n').map((d) => d.trim()).filter(Boolean)
  : argv.filter((a, k) => !a.startsWith('--') && !viTriGiaTriCo.has(k));

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
  // ĐI HẾT MỌI TẦNG, không dừng ở tầng con. Bản trước chỉ đi entry → con, và nó
  // báo thiếu hai chuỗi đang có thật: chunk chứa chúng được nhắc từ một chunk
  // CHÁU, ngoài tầm với. Chốt chặn "≥10 chunk" không cứu được, vì 32 chunk vẫn
  // vượt mốc trong khi thiếu đúng nhánh cần. Duyệt theo hàng đợi thì không có
  // "tầng" nào để đoán sai nữa.
  const daThay = new Set(vao);
  const hangDoi = [...vao];
  const ds = [];
  while (hangDoi.length) {
    const e = hangDoi.shift();
    let src;
    try { src = await tai(e); } catch { continue; }   // chunk không tồn tại riêng lẻ
    ds.push([e, src]);
    for (const m of src.matchAll(RE_CHUNK)) {
      const u = `/assets/${m[1]}`;
      if (daThay.has(u)) continue;
      daThay.add(u);
      hangDoi.push(u);
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
  ? `\n✖ thiếu ${thieu}/${canKiem.length} chuỗi.${laDist
    ? ''
    : ' ⚠ Trên bản live, "không thấy" KHÔNG đồng nghĩa "không có": bộ này có điểm mù với chunk mà tên không xuất hiện nguyên vẹn trong mã. Chạy `npm run kiem:live` để dứt điểm.'}`
  : `\n✅ ${canKiem.length}/${canKiem.length} chuỗi có mặt.`);
process.exit(thieu ? 1 : 0);
