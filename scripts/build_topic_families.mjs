// File: scripts/build_topic_families.mjs
// Sinh src/data/topicFamilies.json — BẢN ĐỒ HỌ CHỦ ĐỀ của kho từ vựng.
//
// Nguồn gốc: đợt đo (g1)/(h) 2026-08-12 phát hiện 120 cặp topic trùng >70% từ
// vựng. Chủ dự án quyết định KHÔNG gộp (có thể là chủ đề hợp lệ chồng lấn),
// nhưng giữ bản đồ này làm DỮ LIỆU DÙNG ĐƯỢC: đây là phân nhóm chủ đề tự
// nhiên của kho. topicFamilies.json là ĐẦU VÀO BẮT BUỘC của hạng mục #2 (lộ
// trình): người học gặp một họ chủ đề theo trình tự khó dần, không gặp 10
// topic sức khỏe rải rác khắp lộ trình.
//
// Chạy lại khi kho topic thay đổi: node scripts/build_topic_families.mjs
// (Node không nạp được import extensionless của vocabVstepData.js nên script
// viết bản tạm có đuôi .js đầy đủ rồi import.)
import { readFileSync, writeFileSync, mkdtempSync } from 'fs';
import { pathToFileURL, fileURLToPath } from 'url';
import { tmpdir } from 'os';
import path from 'path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

let src = readFileSync(path.join(DATA, 'vocabVstepData.js'), 'utf8');
src = src.replace(/from '\.\/([^']+)'/g, (_, n) => `from '${pathToFileURL(path.join(DATA, n + '.js')).href}'`);
const tmp = path.join(mkdtempSync(path.join(tmpdir(), 'tf-')), 'agg.mjs');
writeFileSync(tmp, src);
const topics = (await import(pathToFileURL(tmp).href)).default;

const wordsOf = (t) => new Set((t.words || []).map(w => (w.en || '').toLowerCase().trim()).filter(Boolean));
const sets = topics.map(wordsOf);

// mọi cặp trùng >70% (tính trên bản nhỏ hơn) — kể cả các bản "– Phần n"
const OVERLAP_THRESHOLD = 70;
const pairs = [];
const parent = topics.map((_, i) => i);
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
for (let i = 0; i < topics.length; i++) {
  for (let j = i + 1; j < topics.length; j++) {
    if (!sets[i].size || !sets[j].size) continue;
    let inter = 0;
    for (const w of sets[i]) if (sets[j].has(w)) inter++;
    const pct = Math.round((inter / Math.min(sets[i].size, sets[j].size)) * 100);
    if (pct > OVERLAP_THRESHOLD) {
      pairs.push({ a: topics[i].id, b: topics[j].id, overlapPct: pct });
      const ra = find(i), rb = find(j);
      if (ra !== rb) parent[ra] = rb;
    }
  }
}

// gom họ + đặt tên theo token phổ biến nhất trong id các thành viên
const groups = new Map();
topics.forEach((t, i) => {
  const r = find(i);
  if (!groups.has(r)) groups.set(r, []);
  groups.get(r).push(i);
});
const families = [];
for (const members of groups.values()) {
  if (members.length < 2) continue; // topic đứng một mình không thành họ
  const idList = members.map(i => topics[i].id);
  const tokenCount = new Map();
  for (const id of idList) {
    for (const tok of id.split('-')) {
      if (['beginner', 'daily', 'ielts', 'vstep', 'basics', 'advanced', 'p2', 'p3', 'p4'].includes(tok)) continue;
      tokenCount.set(tok, (tokenCount.get(tok) || 0) + 1);
    }
  }
  const name = [...tokenCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([t]) => t).join('-');
  const famPairs = pairs.filter(p => idList.includes(p.a) && idList.includes(p.b));
  families.push({
    family: name,
    topics: idList.map(id => ({ id, title: topics.find(t => t.id === id).title, words: (topics.find(t => t.id === id).words || []).length })),
    pairs: famPairs,
  });
}
families.sort((a, b) => b.topics.length - a.topics.length);

const out = {
  _readme: [
    'BẢN ĐỒ HỌ CHỦ ĐỀ — sinh bởi scripts/build_topic_families.mjs (đợt (h) 2026-08-12).',
    'Họ = nhóm topic dính nhau qua các cặp trùng >70% từ vựng (union-find).',
    'ĐẦU VÀO BẮT BUỘC của hạng mục #2: xếp topic cùng họ theo trình tự khó dần trong lộ trình.',
    'KHÔNG gộp các topic trong họ — quyết định chủ dự án 2026-08-12.',
  ],
  generatedFrom: `${topics.length} topics`,
  overlapThresholdPct: OVERLAP_THRESHOLD,
  familyCount: families.length,
  families,
};
writeFileSync(path.join(DATA, 'topicFamilies.json'), JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(`✅ topicFamilies.json: ${families.length} họ, ${families.reduce((s, f) => s + f.topics.length, 0)} topic thành viên, ${pairs.length} cặp trùng >70%.`);
for (const f of families) console.log(`  ${f.family}: ${f.topics.length} topic`);
