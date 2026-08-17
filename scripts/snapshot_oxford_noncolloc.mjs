// File: scripts/snapshot_oxford_noncolloc.mjs
// CHỤP BĂM CỦA GIÁO TRÌNH OXFORD SAU KHI GỠ HẾT `collocations`.
//
// Mục đích: biến "1.868 lượt xoá chuỗi" thành một PHÉP CHUẨN HOÁ MÁY KIỂM ĐƯỢC.
// Chụp TRƯỚC khi xoá; test đòi băm sau khi xoá phải khớp y nguyên ⇒ chứng minh
// đợt xoá **chỉ đụng vào mảng collocations**, không thêm bớt một ký tự nào ở
// quiz, typingGame, textbookExercises, theory hay bất cứ chỗ nào khác.
//
// Cùng mẹo đã dùng cho 888 lượt hạ chữ thường ở việc 3.2
// (scripts/data/story_lowercase_snapshot.json). Ở đó chụp bản đã hạ chữ thường;
// ở đây chụp bản đã gỡ collocation — cùng một ý: chuẩn hoá thứ SẼ đổi rồi băm
// phần CÒN LẠI.
//
// Chạy MỘT LẦN, trước khi xoá:  node scripts/snapshot_oxford_noncolloc.mjs
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath, pathToFileURL } from 'url';
import { napUnits } from './audit_oxford_templates.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'scripts/data/oxford_noncolloc_snapshot.json');

/** Gỡ MỌI trường `collocations` ở mọi độ sâu, giữ nguyên tất cả phần còn lại. */
export function goColloc(v) {
  if (Array.isArray(v)) return v.map(goColloc);
  if (v && typeof v === 'object') {
    const ra = {};
    for (const k of Object.keys(v)) {
      if (k === 'collocations') continue;
      ra[k] = goColloc(v[k]);
    }
    return ra;
  }
  return v;
}

export function bam(unit) {
  return crypto.createHash('sha256').update(JSON.stringify(goColloc(unit))).digest('hex');
}

// CHỈ CHẠY KHI ĐƯỢC GỌI TRỰC TIẾP.
//
// Không có dòng này thì bài kiểm `tests/oxford_colloc.test.js` — nó phải import
// `bam` từ đây — sẽ làm bộ chụp CHẠY THEO và **ghi đè bảng băm bằng chính trạng
// thái sau khi xoá**. Bất biến khi đó tự so với chính nó: luôn xanh, và xanh vô
// nghĩa. Đã dính đúng lỗi này một lần ở bộ thu thập VOA, và lần này nó fired
// ngay lần chạy test đầu tiên.
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  await chup();
}

export async function chup() {
const units = await napUnits();
const ra = {};
for (const { book, unit } of units) ra[`${book}:${unit.id}`] = bam(unit);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({
  ghiChu: 'Băm sha256 của từng unit Oxford SAU KHI gỡ mọi trường collocations. Chụp trước đợt xoá 1.868 cụm nhân từ khuôn (quyết định A, BAO_CAO_KHUON_OXFORD.md). Test tests/oxford_colloc.test.js đòi băm hiện tại khớp bảng này.',
  soUnit: Object.keys(ra).length,
  bam: ra,
}, null, 2) + '\n', 'utf8');

console.log(`✅ chụp băm ${Object.keys(ra).length} unit → ${path.relative(ROOT, OUT)}`);
}
