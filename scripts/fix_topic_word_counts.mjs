// File: scripts/fix_topic_word_counts.mjs
// Sửa số từ khai sai trong TIÊU ĐỀ và MÔ TẢ chủ đề.
// Bảng đối chiếu: BAO_CAO_SO_TU_TIEU_DE.md — chủ dự án duyệt 2026-08-14.
//
// LUẬT ĐÃ DUYỆT:
//   1. Tiêu đề chủ đề: XOÁ HẲN cụm "(N Từ)" — cả 235 cái, kể cả 53 cái đang
//      đúng. Giao diện đã hiển thị `activeTopic.words.length` thật; giữ thêm
//      một con số chép tay chỉ là thêm một chỗ để sai lại mỗi lần kho đổi.
//   2. Mô tả: giữ con số nhưng đặt bằng SỐ THẬT (giữ khuôn câu đã duyệt ở đợt
//      8 mô tả IELTS).
//   3. roadmapData.js: 3 tiêu đề chặng cũng bỏ số cho đồng nhất — cả ba đang
//      khai ĐÚNG, bỏ vì đồng nhất chứ không phải vì sai.
//
// Script CHỈ THAY CHUỖI, không đụng mảng words, và tự chứng minh điều đó bằng
// ảnh chụp số từ trước/sau. Phần kiểm chạy ở TIẾN TRÌNH RIÊNG: Node cache
// module theo đường dẫn nên nạp lại trong cùng tiến trình vừa ghi file sẽ đọc
// bản CŨ và báo nhầm (đã dính đúng bẫy này ở lần chạy đầu).
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { loadTopics } from './check_topic_word_counts.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

const TITLE_COUNT = /\s*\(\s*\d+\s*(?:từ|Từ|TỪ|words|Words|WORDS|word)\s*\)/;
const DESC_COUNT = /(\d{2,3})(\s*)(từ|words|Words)/;

const before = await loadTopics();
const snapshot = Object.fromEntries(before.map((t) => [t.id, (t.words || []).length]));
const snapPath = path.join(os.tmpdir(), `bunny_wordcount_${process.pid}.json`);
fs.writeFileSync(snapPath, JSON.stringify(snapshot));

// ---- Dựng danh sách thay thế ------------------------------------------------
const edits = [];
for (const t of before) {
  const title = t.title || '';
  if (TITLE_COUNT.test(title)) edits.push({ old: title, next: title.replace(TITLE_COUNT, ''), kind: 'title', id: t.id });

  const desc = t.description || '';
  const m = desc.match(DESC_COUNT);
  const real = (t.words || []).length;
  if (m && Number(m[1]) !== real) edits.push({ old: desc, next: desc.replace(DESC_COUNT, `${real}$2$3`), kind: 'desc', id: t.id });
}

// Chuỗi trùng nhau (4 tiêu đề dùng chung) chỉ thay một lần cho mỗi chuỗi.
const unique = new Map();
for (const e of edits) {
  const prev = unique.get(e.old);
  if (prev && prev.next !== e.next) {
    console.log(`❌ Chuỗi "${e.old.slice(0, 60)}..." cần hai kết quả khác nhau (${prev.id} vs ${e.id}) — DỪNG, không đoán.`);
    process.exit(1);
  }
  unique.set(e.old, e);
}
const nTitle = edits.filter((e) => e.kind === 'title').length;
const nDesc = edits.filter((e) => e.kind === 'desc').length;
console.log(`Cần sửa: ${nTitle} tiêu đề + ${nDesc} mô tả = ${edits.length} lượt, trên ${unique.size} chuỗi khác nhau`);

// ---- Áp vào file ------------------------------------------------------------
const targets = fs.readdirSync(DATA).filter((f) => f.endsWith('.js')).map((f) => path.join(DATA, f));
let hits = 0;
const touched = [];

for (const file of targets) {
  let text = fs.readFileSync(file, 'utf8');
  const crlf = text.includes('\r\n');
  if (crlf) text = text.replace(/\r\n/g, '\n');
  const original = text;
  let fileHits = 0;

  for (const { old, next } of unique.values()) {
    // Bọc trong dấu nháy để không lỡ khớp vào giữa một chuỗi khác.
    for (const q of ['"', "'"]) {
      const needle = q + old + q;
      if (!text.includes(needle)) continue;
      fileHits += text.split(needle).length - 1;
      text = text.split(needle).join(q + next + q);
    }
  }

  if (text !== original) {
    fs.writeFileSync(file, crlf ? text.replace(/\n/g, '\r\n') : text);
    touched.push(`${path.basename(file)}:${fileHits}`);
  }
  hits += fileHits;
}
console.log(`Đã thay ${hits} lượt trong ${touched.length} file`);
if (hits < edits.length) console.log(`⚠ ít hơn số lượt cần sửa (${edits.length}) — phần kiểm bên dưới sẽ chỉ ra chỗ sót`);

// ---- 3 tiêu đề chặng lộ trình -----------------------------------------------
{
  const file = path.join(DATA, 'roadmapData.js');
  let text = fs.readFileSync(file, 'utf8');
  const crlf = text.includes('\r\n');
  if (crlf) text = text.replace(/\r\n/g, '\n');
  let n = 0;
  text = text.replace(/(title:\s*')([^']*)(')/g, (full, a, title, c) => {
    if (!TITLE_COUNT.test(title)) return full;
    n++;
    return a + title.replace(TITLE_COUNT, '') + c;
  });
  fs.writeFileSync(file, crlf ? text.replace(/\n/g, '\r\n') : text);
  console.log(`roadmapData.js: bỏ số ở ${n} tiêu đề chặng (kỳ vọng 3)`);
}

// ---- Tự chứng minh, ở tiến trình riêng --------------------------------------
console.log('\n--- kiểm lại bằng tiến trình mới ---');
try {
  const out = execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'check_topic_word_counts.mjs'), snapPath], { encoding: 'utf8' });
  console.log(out.trim());
} catch (err) {
  console.log(err.stdout?.trim() || err.message);
  console.log('\n❌ KHÔNG ĐẠT — hoàn tác bằng: git checkout -- src/data');
  process.exit(1);
} finally {
  fs.rmSync(snapPath, { force: true });
}
