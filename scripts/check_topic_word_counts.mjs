// File: scripts/check_topic_word_counts.mjs
// Kiểm bất biến "số từ khai ra phải đúng" trên dữ liệu THẬT.
//
// PHẢI chạy bằng TIẾN TRÌNH RIÊNG sau khi sửa file: Node cache module theo
// đường dẫn, nên nạp lại trong cùng tiến trình vừa ghi file sẽ đọc bản CŨ —
// đúng cái bẫy đã làm lần chạy đầu báo nhầm 417 lỗi.
//
// Dùng được cả trong CI. Tham số tuỳ chọn: đường dẫn file JSON chụp số từ
// TRƯỚC khi sửa, để chứng minh không có mảng words nào bị đụng.
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

export const TITLE_COUNT = /\(\s*\d+\s*(?:từ|Từ|TỪ|words|Words|WORDS|word)\s*\)/;
export const DESC_COUNT = /(\d{2,3})\s*(?:từ|words|Words)/;

export async function loadTopics() {
  const src = fs.readFileSync(path.join(DATA, 'vocabVstepData.js'), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_check_${process.pid}.mjs`);
  fs.writeFileSync(tmp, src);
  try {
    const raw = (await import(pathToFileURL(tmp).href)).default;
    const { sanitizeVocabTopics } = await import(pathToFileURL(path.join(ROOT, 'src/utils/contentFilter.js')).href);
    // Đo trên dữ liệu ĐÃ QUA lớp lọc — đúng thứ người học thấy.
    return sanitizeVocabTopics(raw);
  } finally { fs.rmSync(tmp, { force: true }); }
}

export async function checkTopicWordCounts(beforeSnapshot) {
  const topics = await loadTopics();
  const loi = [];

  for (const t of topics) {
    const real = (t.words || []).length;
    if (TITLE_COUNT.test(t.title || '')) loi.push(`${t.id}: tiêu đề còn khai số từ — "${t.title}"`);
    const m = (t.description || '').match(DESC_COUNT);
    if (m && Number(m[1]) !== real) loi.push(`${t.id}: mô tả khai ${m[1]} từ, thật ${real}`);
    if (beforeSnapshot) {
      const n0 = beforeSnapshot[t.id];
      if (n0 !== undefined && n0 !== real) loi.push(`${t.id}: SỐ TỪ ĐỔI ${n0} → ${real} — chỉ được sửa chuỗi`);
    }
  }
  if (beforeSnapshot) {
    const missing = Object.keys(beforeSnapshot).filter((id) => !topics.some((t) => t.id === id));
    for (const id of missing) loi.push(`${id}: chủ đề biến mất khỏi kho`);
  }

  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  for (const m of roadmapData.flatMap((l) => l.milestones)) {
    if (TITLE_COUNT.test(m.title || '')) loi.push(`chặng ${m.id}: tiêu đề còn khai số từ — "${m.title}"`);
  }
  return { topics, loi };
}

// Chạy trực tiếp: node scripts/check_topic_word_counts.mjs [before.json]
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const snapPath = process.argv[2];
  const snap = snapPath && fs.existsSync(snapPath) ? JSON.parse(fs.readFileSync(snapPath, 'utf8')) : null;
  const { topics, loi } = await checkTopicWordCounts(snap);
  for (const l of loi) console.log(`❌ ${l}`);
  console.log(loi.length === 0
    ? `✅ ${topics.length} chủ đề: 0 tiêu đề còn khai số, 0 mô tả sai số${snap ? ', 0 chủ đề đổi số từ' : ''}.`
    : `❌ ${loi.length} lỗi`);
  process.exit(loi.length === 0 ? 0 : 1);
}
