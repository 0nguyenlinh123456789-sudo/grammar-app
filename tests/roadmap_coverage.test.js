// File: tests/roadmap_coverage.test.js
// GHIM TIÊU CHÍ N1 + N2 CỦA CAM KẾT B2 (KE_HOACH_B2.md).
//
// N1 — lộ trình liên tục, không đứt đoạn: MỌI chủ đề từ vựng, MỌI chủ đề ngữ
//      pháp và MỌI unit Oxford đều phải thuộc đúng một chặng.
//      Trước 2026-08-14 lộ trình 44 chặng chỉ phủ 9% kho từ vựng, 24% ngữ pháp
//      và 0/260 unit Oxford — người đi theo lộ trình không bao giờ gặp 2/3 khối
//      lượng nội dung đã soạn.
// N2 — tổng giờ dẫn qua đến hết bậc B2 phải ≥ 450 giờ, tính từ SỐ BÀI THẬT.
//
// Thêm nội dung mới mà quên xếp vào lộ trình → test đỏ. Cách sửa: chạy lại
//      node scripts/build_roadmap.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

const GIO_TOI_THIEU_DEN_B2 = 450;

async function importAggregate(file, pick) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_cov_${file.replace(/\W/g, '_')}.mjs`);
  fs.writeFileSync(tmp, src);
  try { return pick(await import(pathToFileURL(tmp).href)); } finally { fs.rmSync(tmp, { force: true }); }
}

const OXFORD_PARTS = [
  [['oxfordData.js', 'courseData'], ['oxfordDataPart2.js', 'courseData'], ['oxfordDataPart3.js', 'courseData']],
  [['oxfordPreIntData.js', 'courseData'], ['oxfordPreIntData51_75.js', 'courseData51_75'], ['oxfordPreIntData76_100.js', 'courseData76_100']],
  [['oxfordAdvancedData1_25.js', 'courseData1_25'], ['oxfordAdvancedData26_50.js', 'courseData26_50'], ['oxfordAdvancedData51_75.js', 'courseData51_75'], ['oxfordAdvancedData76_100.js', 'courseData76_100']],
];

test('N1 — mọi nội dung đã soạn đều có đúng một chặng trong lộ trình', async () => {
  const { roadmapData, ROADMAP_BANDS } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const { sanitizeVocabTopics, sanitizeBook } = await import(pathToFileURL(path.join(ROOT, 'src', 'utils', 'contentFilter.js')).href);
  const topics = sanitizeVocabTopics(await importAggregate('vocabVstepData.js', (m) => m.default));
  const grammar = await importAggregate('grammarData.js', (m) => m.parsedGrammarData);

  let units = [];
  for (const parts of OXFORD_PARTS) {
    let raw = [];
    for (const [f, k] of parts) raw = raw.concat((await import(pathToFileURL(path.join(DATA, f)).href))[k] || []);
    units = units.concat(sanitizeBook(raw));
  }

  const milestones = roadmapData.flatMap((l) => l.milestones);
  const covered = new Set(milestones.map((m) => String(m.targetId)));

  const thieu = [
    ...topics.filter((t) => !covered.has(String(t.id))).map((t) => `từ vựng: ${t.id}`),
    ...grammar.filter((t) => !covered.has(String(t.id))).map((t) => `ngữ pháp: ${t.id}`),
    ...units.filter((u) => !covered.has(String(u.id))).map((u) => `oxford: ${u.id}`),
  ];
  assert.deepEqual(thieu, [],
    `${thieu.length} nội dung chưa có chặng nào dẫn tới — chạy lại "node scripts/build_roadmap.mjs":\n  ` + thieu.slice(0, 20).join('\n  '));

  // Bậc phải đúng thứ tự đã khai, và bậc A0 phải đứng đầu.
  assert.deepEqual(roadmapData.map((l) => l.level), ROADMAP_BANDS);
  assert.equal(roadmapData[0].level, 'foundation', 'cụm "Mất gốc" phải đứng trước mọi bậc khác');
});

test('mỗi chặng có id duy nhất, targetId duy nhất, và khai đủ cefr/minutes', async () => {
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const milestones = roadmapData.flatMap((l) => l.milestones);

  const ids = milestones.map((m) => m.id);
  const targets = milestones.map((m) => String(m.targetId));
  assert.equal(new Set(ids).size, ids.length, 'có id chặng bị trùng — giao diện dùng id làm khoá React');
  // targetId trùng nghĩa là hai chặng dùng CHUNG một khoá tiến độ: xong chặng
  // này thì chặng kia cũng sáng ✓ (đúng lại "bug 47 topic" cũ).
  assert.equal(new Set(targets).size, targets.length, 'có targetId bị trùng — hai chặng sẽ dùng chung một khoá tiến độ');

  const loi = [];
  for (const m of milestones) {
    if (!['grammar', 'vstep', 'oxford'].includes(m.type)) loi.push(`${m.id}: loại chặng lạ "${m.type}"`);
    if (!m.cefr) loi.push(`${m.id}: thiếu nhãn cefr`);
    if (!Number.isFinite(m.minutes) || m.minutes < 0) loi.push(`${m.id}: số phút không hợp lệ (${m.minutes})`);
    if (!Number.isFinite(m.xp) || m.xp <= 0) loi.push(`${m.id}: xp không hợp lệ (${m.xp})`);
    // Ba quyển Oxford đánh id unit độc lập nhau, nên chặng Oxford BẮT BUỘC phải
    // mang theo bookId — thiếu nó thì trang chủ mở nhầm quyển đang chọn.
    if (m.type === 'oxford' && !m.bookId) loi.push(`${m.id}: chặng Oxford thiếu bookId`);
  }
  assert.deepEqual(loi, [], 'chặng khai thiếu:\n  ' + loi.join('\n  '));
});

test('N2 — lộ trình dẫn qua đủ giờ để nói tới B2', async () => {
  const { minutesThroughBand, roadmapTotalMinutes, bandMinutes } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const gioDenB2 = minutesThroughBand('upper_intermediate') / 60;
  assert.ok(gioDenB2 >= GIO_TOI_THIEU_DEN_B2,
    `từ đầu lộ trình đến hết B2 chỉ có ~${Math.round(gioDenB2)} giờ, dưới mức ${GIO_TOI_THIEU_DEN_B2} giờ đã cam kết`);
  assert.ok(roadmapTotalMinutes() > minutesThroughBand('upper_intermediate'), 'bậc C1 phải có nội dung');
  assert.ok(bandMinutes('foundation') > 0, 'cụm A0 phải có nội dung');
});

test('44 chặng soạn tay còn nguyên, không bị bộ sinh ghi đè', async () => {
  const { roadmapCurated } = await import(pathToFileURL(path.join(DATA, 'roadmapCurated.js')).href);
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const curated = roadmapCurated.flatMap((l) => l.milestones);
  assert.equal(curated.length, 44);

  const byTarget = new Map(roadmapData.flatMap((l) => l.milestones).map((m) => [String(m.targetId), m]));
  for (const c of curated) {
    const live = byTarget.get(String(c.targetId));
    assert.ok(live, `chặng soạn tay ${c.id} biến mất khỏi lộ trình`);
    assert.equal(live.title, c.title, `chặng ${c.id}: tiêu đề soạn tay bị đổi`);
    assert.equal(live.desc, c.desc, `chặng ${c.id}: mô tả soạn tay bị đổi`);
    assert.equal(live.curated, true, `chặng ${c.id}: mất dấu "soạn tay"`);
  }
});
