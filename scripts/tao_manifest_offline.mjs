// File: scripts/tao_manifest_offline.mjs
//
//   node scripts/tao_manifest_offline.mjs        (chạy TỰ ĐỘNG sau `vite build`)
//
// LIỆT KÊ ĐÚNG NHỮNG GÌ ĐƯỢC PHÉP TẢI VỀ MÁY ĐỂ HỌC NGOẠI TUYẾN, KÈM SỐ BYTE THẬT.
//
// ══ VÌ SAO PHẢI SINH LÚC DỰNG, KHÔNG GÕ TAY VÀO sw.js ══
// Vite đặt tên mảnh mã theo BĂM NỘI DUNG (`index-CfZ-AFcW.js`). Mỗi lần đẩy bản
// mới là mọi tên đổi. Một danh sách gõ tay sẽ trỏ vào những tên đã biến mất và
// người học bấm "tải về" sẽ nhận 404 hàng loạt — im lặng, vì mỗi tệp hỏng chỉ là
// một lời hứa hỏng lẻ. Nên danh sách phải được đọc ra TỪ `dist/` ngay sau khi
// dựng, và số byte phải là số byte THẬT trên đĩa để giao diện nói đúng dung
// lượng trước khi người học bấm — không ai nên tải 19 MB bằng 4G mà không biết.
//
// ══ DANH SÁCH CHO PHÉP, KHÔNG PHẢI DANH SÁCH LOẠI TRỪ ══
// `dist/ielts-foundation` nặng **30 GB** và `dist/ielts-prep` 224 MB. Một bộ quét
// kiểu "lấy hết rồi bỏ những gì khớp /ielts/i" chỉ cần sai một dấu là đi duyệt
// 30 GB, hoặc tệ hơn, đưa nó vào danh sách tải. Cụm IELTS Nền Tảng còn nằm trong
// luật KHÔNG ĐỘNG TỚI của dự án và đã bị `.vercelignore` loại khỏi bản đẩy.
//
// Nên ở đây CHỈ quét đúng ba nơi đã biết là an toàn (`assets/`, `audio/`,
// `fonts/`) cộng vài tệp gốc gọi tên đích danh. Không có nhánh nào đi vào
// `ielts-*`. Cái lọc `/ielts/i` ở cuối là lớp thứ HAI, và nó ĐẾM số mục bị loại
// để phép kiểm khẳng định được lớp một đã làm đúng việc (số đó phải là 0 với
// `audio/` và `fonts/`; chỉ `assets/` mới có `IeltsFoundationPage-*.js`).

import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_MAC_DINH = path.join(ROOT, 'dist');

/** Chỉ những nơi này được quét. Không có `ielts-*` nào ở đây, và đó là chủ ý. */
const NOI_QUET = ['assets', 'audio', 'fonts'];
const TEP_GOC = ['index.html', 'manifest.webmanifest', 'bunny_logo.png', 'logo.svg'];

const LA_IELTS = /ielts/i;

function doThuMuc(DIST, ten) {
  const duong = path.join(DIST, ten);
  if (!existsSync(duong)) return [];
  return readdirSync(duong)
    .map((t) => ({ d: `/${ten}/${t}`, b: statSync(path.join(duong, t)).size }))
    .filter((m) => statSync(path.join(DIST, m.d.slice(1))).isFile());
}

export function taoManifest(DIST = DIST_MAC_DINH) {
  if (!existsSync(DIST)) {
    console.error('Chưa có dist/ — chạy `vite build` trước.');
    process.exit(1);
  }

  const goc = TEP_GOC
    .filter((t) => existsSync(path.join(DIST, t)))
    .map((t) => ({ d: `/${t}`, b: statSync(path.join(DIST, t)).size }));

  const assets = doThuMuc(DIST, 'assets');
  const audio = doThuMuc(DIST, 'audio');
  const fonts = doThuMuc(DIST, 'fonts');

  // Lớp lọc THỨ HAI, có đếm. Xem phần đầu file.
  let daLoai = 0;
  const bo = (ds) => ds.filter((m) => (LA_IELTS.test(m.d) ? (daLoai += 1, false) : true));

  const css = bo(assets.filter((m) => m.d.endsWith('.css')));
  const js = bo(assets.filter((m) => m.d.endsWith('.js')));
  const voJs = js.filter((m) => /\/assets\/index-/.test(m.d));
  const duLieuJs = js.filter((m) => !/\/assets\/index-/.test(m.d));

  const nhom = (nhan, moTa, tep) => ({
    nhan, moTa, tep, soTep: tep.length, byte: tep.reduce((s, m) => s + m.b, 0),
  });

  const manifest = {
    taoLuc: new Date().toISOString(),
    daLoaiIelts: daLoai,
    nhom: {
      voApp: nhom('Vỏ app', 'Đủ để MỞ được app khi không có mạng.',
        [...goc, ...bo(fonts), ...css, ...voJs]),
      baiHoc: nhom('Toàn bộ bài học', 'Ngữ pháp, từ vựng, bài đọc — học được trọn vẹn khi ngoại tuyến.',
        duLieuJs),
      tiengNoi: nhom('Bản thu người thật', 'Các tệp nghe chép chính tả.',
        bo(audio.filter((m) => /\.(mp3|m4a|ogg|wav)$/i.test(m.d)))),
    },
  };
  manifest.tongByte = Object.values(manifest.nhom).reduce((s, n) => s + n.byte, 0);

  writeFileSync(path.join(DIST, 'offline-manifest.json'), JSON.stringify(manifest), 'utf8');
  return manifest;

}

function main() {
  const manifest = taoManifest();
  const mb = (b) => (b / 1024 / 1024).toFixed(1);
  console.log(`offline-manifest.json: ${manifest.tongByte ? mb(manifest.tongByte) : 0} MB`
    + ` (vỏ ${mb(manifest.nhom.voApp.byte)} · bài học ${mb(manifest.nhom.baiHoc.byte)}`
    + ` · tiếng nói ${mb(manifest.nhom.tiengNoi.byte)}), đã loại ${manifest.daLoaiIelts} mục IELTS`);
}

if (process.argv[1] && process.argv[1].endsWith("tao_manifest_offline.mjs")) main();
