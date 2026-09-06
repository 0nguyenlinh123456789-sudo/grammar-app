// File: scripts/tao_icon_pwa.mjs
//
//   npm run tao:icon        (chạy TAY, khi logo đổi — không nằm trong `build`)
//
// SINH BỘ ICON CHO BẢN CÀI VÀO MÁY, TỪ `public/logo.svg`.
//
// ══ LỖI THẬT ĐANG CÓ TRONG manifest, KHÔNG PHẢI "THIẾU SÓT NHỎ" ══
// `manifest.webmanifest` khai `{"src": "/logo.svg", "purpose": "maskable"}`.
// **Chrome trên Android không dùng SVG cho icon manifest.** Nên trên thực tế app
// KHÔNG hề có icon maskable nào; Android lấy tạm icon "any" 256px rồi tự cắt —
// ra cái icon bị xén mất viền hoặc bị thu nhỏ lọt thỏm giữa một ô trắng. Đây
// đúng là kiểu hỏng im lặng: manifest trông đầy đủ, máy tính bàn không thấy gì,
// chỉ điện thoại mới lộ.
//
// ══ VÌ SAO BẢN MASKABLE PHẢI VẼ KHÁC, KHÔNG PHẢI ĐỔI ĐUÔI TỆP ══
// Android cắt icon maskable theo hình tròn/squircle. `logo.svg` là một khung
// bo góc `rx=60` nằm trong ô 512 — GÓC CỦA NÓ TRONG SUỐT. Cắt tròn một ảnh có
// góc trong suốt thì ra bốn khoảng khuyết. Nên bản maskable phải: (1) nền phủ
// KÍN cả ô vuông, (2) hình vẽ thu vào vừa VÒNG TRÒN an toàn — xem `AN_TOAN`
// bên dưới, chỗ đó có phép tính và một cái bẫy đã dính.
//
// ══ CÁCH LÀM: KHÔNG THÊM THƯ VIỆN ẢNH ══
// Dự án đã có Chrome headless cho bộ rà. Vẽ SVG vào `<canvas>` rồi `toDataURL`
// cho ra PNG thật, không cần `sharp`/`canvas` (hai gói đó kéo theo bản dựng gốc,
// nặng và hay hỏng trên Windows).

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { moTrinhDuyet, moTab } from '../tests/helpers/trinhduyet.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SVG = readFileSync(path.join(ROOT, 'public/logo.svg'), 'utf8');

/** Nền của bản maskable — trùng nền giấy của chính logo, để không lộ đường ghép. */
const NEN = '#fdfbf7';
// ══ VÙNG AN TOÀN LÀ HÌNH TRÒN, KHÔNG PHẢI HÌNH VUÔNG — VÀ ĐÓ LÀ CHỖ DỄ SAI ══
// Chuẩn maskable nói: mọi thứ đáng nhìn phải nằm trong HÌNH TRÒN đường kính 80%
// ô icon, tức bán kính 0,4. Bản đầu ở đây vẽ logo thành một hình VUÔNG rộng 80%
// — nghe thì khớp, nhưng bốn góc của hình vuông cách tâm 0,8/2·√2 ≈ 0,566, thò
// hẳn ra ngoài vòng tròn. Android cắt tròn là mất bốn góc khung.
//
// Tính đúng cho `logo.svg` (khung bo góc, không phải vuông sắc):
//   · khung ngoài x=20…492 kèm nét 12 ⇒ cạnh thật ≈ 484/512 = 0,945 ảnh
//   · bo góc rx=60 cộng nửa nét ⇒ r ≈ 66/484 = 0,136 cạnh
//   · điểm xa tâm nhất của một góc bo = √2·(a − r) + r, với a là nửa cạnh
//   ⇒ ở hệ số vẽ k: khoảng cách xa nhất ≈ 0,615·k
//   ⇒ cần 0,615·k ≤ 0,4  ⇒  k ≤ 0,65
//
// Nên 0,65, không phải 0,8. Icon trông nhỏ hơn bản "any" là ĐÚNG — icon maskable
// vốn phải chừa chỗ cho máy cắt.
const AN_TOAN = 0.65;

const CAN_TAO = [
  { ten: 'icon-192.png', canh: 192, maskable: false },
  { ten: 'icon-512.png', canh: 512, maskable: false },
  { ten: 'icon-maskable-512.png', canh: 512, maskable: true },
];

const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9371 });

try {
  const t = await moTab(cong, { chanApi: false });
  // Trang trắng dạng data: — không cần máy chủ.
  await t.goi('Page.navigate', { url: 'data:text/html,<body></body>' });
  await new Promise((r) => setTimeout(r, 500));

  const svgB64 = Buffer.from(SVG, 'utf8').toString('base64');

  for (const m of CAN_TAO) {
    const duLieu = await t.danhGia(`(async () => {
      const img = new Image();
      img.src = 'data:image/svg+xml;base64,${svgB64}';
      await img.decode();
      const c = document.createElement('canvas');
      c.width = ${m.canh}; c.height = ${m.canh};
      const g = c.getContext('2d');
      if (${m.maskable}) {
        g.fillStyle = ${JSON.stringify(NEN)};
        g.fillRect(0, 0, ${m.canh}, ${m.canh});
        const v = Math.round(${m.canh} * ${AN_TOAN});
        const le = Math.round((${m.canh} - v) / 2);
        g.drawImage(img, le, le, v, v);
      } else {
        g.drawImage(img, 0, 0, ${m.canh}, ${m.canh});
      }
      return c.toDataURL('image/png');
    })()`);

    if (typeof duLieu !== 'string' || !duLieu.startsWith('data:image/png;base64,')) {
      throw new Error(`${m.ten}: canvas không trả về PNG (${String(duLieu).slice(0, 60)})`);
    }
    const than = Buffer.from(duLieu.split(',')[1], 'base64');
    // Khẳng định luôn kích thước thật đọc từ IHDR, không tin lời canvas.
    const rong = than.readUInt32BE(16);
    const cao = than.readUInt32BE(20);
    if (rong !== m.canh || cao !== m.canh) {
      throw new Error(`${m.ten}: sinh ra ${rong}x${cao}, mong đợi ${m.canh}x${m.canh}`);
    }
    writeFileSync(path.join(ROOT, 'public', m.ten), than);
    console.log(`${m.ten}: ${rong}x${cao}, ${(than.length / 1024).toFixed(0)} KB${m.maskable ? ` (maskable, hình vẽ ở ${Math.round(AN_TOAN * 100)}% — vừa vòng an toàn)` : ''}`);
  }
  t.dong();
} finally {
  tienTrinh.kill();
}
