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
// Thêm nội dung mới VÀO BA KHO ĐÓ mà quên xếp vào lộ trình → test đỏ. Cách sửa:
//      node scripts/build_roadmap.mjs
//
// ⚠️ CÂU TRÊN TRƯỚC ĐÂY VIẾT LÀ "thêm nội dung mới mà quên xếp → test đỏ",
// KHÔNG CÓ MỆNH ĐỀ "vào ba kho đó" — và đó là một lời hứa file này không giữ
// được. N1 đếm đúng ba kho có từ Đợt 1. Mọi kho soạn SAU đó (bài nghe theo
// đoạn, bài đọc dài, bản thu chép chính tả, đề thi cuối bậc) nằm ngoài phép
// đếm, nên thêm chúng vào mà không có chặng nào dẫn tới thì test vẫn xanh.
// Test cuối file đo đúng khoảng trống đó và ghim SỐ ĐO HIỆN TẠI.
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

// ---------------------------------------------------------------------------
// KHO NỘI DUNG NẰM NGOÀI LỘ TRÌNH — đo, chưa sửa.
//
// Việc 1.3 của KE_HOACH_B2.md sinh ra để chữa đúng một chuyện: 260 unit Oxford
// đã soạn xong mà không có chặng nào dẫn tới, nên người đi theo lộ trình không
// bao giờ gặp. Chuyện đó đã lặp lại. Bốn kho soạn ở Đợt 3, 5 và 6 chỉ với tới
// được bằng NÚT trên trang chủ (`WelcomePage.jsx`), không có chặng nào trong
// 617 chặng trỏ tới chúng.
//
// Vì sao không test nào bắt được:
//   - `orphan_data.test.js` đo MỒ CÔI Ở MỨC FILE ("có ai import file này
//     không"). Cả bốn kho đều được import đàng hoàng nên nó xanh — đúng phận
//     sự của nó. Mồ côi ở mức ĐƯỜNG ĐI là chuyện khác, và chưa ai đo.
//   - N1 ở đầu file này đếm đúng ba kho tồn tại lúc nó được viết.
// Bài học cũ, chiều mới: "luật thêm sau khi dữ liệu đã có thì không bao giờ
// chạy trên dữ liệu cũ" — đây là chiều ngược lại, luật viết TRƯỚC thì không
// bao giờ chạy trên dữ liệu THÊM SAU.
//
// TEST NÀY GHIM CON SỐ ĐANG CÓ (0 chặng), KHÔNG ĐẶT MỐC MONG MUỐN. Chèn chặng
// mới vào 617 chặng là đổi đường học của người đang dùng — phải được duyệt,
// không phải việc test tự đòi. Khi nào duyệt xong thì con số dưới đây đi xuống
// và mệnh đề mô tả phải sửa theo.
const KHO_NGOAI_LO_TRINH = [
  { file: 'listeningPassages.js', xuat: 'listeningPassages', ten: 'bài nghe theo đoạn (2.2)', soMuc: 60 },
  { file: 'readingTexts.js', xuat: 'readingTexts', ten: 'bài đọc dài 600–1.000 từ (5.3)', soMuc: 30 },
  { file: 'audioManifest.js', xuat: 'audioManifest', ten: 'bản thu chép chính tả (2.1/2.3)', soMuc: 239 },
  { file: 'bandExamBank.js', xuat: 'bandExams', ten: 'đề thi cuối bậc (4.2)', soMuc: 3 },
];

test('đo được: bốn kho nội dung không có chặng nào dẫn tới (đúng lỗi 1.3, tái diễn)', async () => {
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const milestones = roadmapData.flatMap((l) => l.milestones);
  const targets = new Set(milestones.map((m) => String(m.targetId)));

  const bang = [];
  for (const kho of KHO_NGOAI_LO_TRINH) {
    const mod = await import(pathToFileURL(path.join(DATA, kho.file)).href);
    const muc = mod[kho.xuat];
    assert.ok(Array.isArray(muc), `${kho.file}: không xuất mảng "${kho.xuat}" nữa`);
    // Số mục ghim luôn: kho lớn lên mà dòng mô tả ở KE_HOACH_B2.md không đổi
    // theo thì lại thành một con số nữa không ai kiểm.
    assert.equal(muc.length, kho.soMuc,
      `${kho.ten}: kho có ${muc.length} mục, con số ghim là ${kho.soMuc} — sửa cả đây lẫn ghi chú N4 trong KE_HOACH_B2.md`);
    bang.push({ ten: kho.ten, denDuoc: muc.filter((m) => targets.has(String(m.id))).length, tong: muc.length });
  }

  const coDuong = bang.filter((b) => b.denDuoc > 0);
  assert.deepEqual(coDuong, [],
    'MỘT KHO ĐÃ CÓ CHẶNG DẪN TỚI — tin tốt, nhưng phải sửa con số ghim ở đây và sửa ghi chú N4:\n  '
    + coDuong.map((b) => `${b.ten}: ${b.denDuoc}/${b.tong}`).join('\n  '));
});

test('N4 vế (b) đo được: 0/386 chặng ≥B1 có bài nghe theo đoạn gắn kèm', async () => {
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const milestones = roadmapData.flatMap((l) => l.milestones);

  // MẪU SỐ PHẢI GỌI RÕ LÀ MẪU SỐ NÀO. Việc 3.1/N5 dùng 122 (chỉ chặng `vstep`
  // bậc ≥B1); việc 3.5 và chỗ này dùng 386 (MỌI loại chặng bậc ≥B1). Hai con số
  // đều đúng, nhưng để trần cạnh nhau trong cùng một tài liệu thì thành ba cách
  // đọc — đã phải sửa chuyện đó hai lần rồi.
  const tuB1 = milestones.filter((m) => ['B1', 'B2', 'C1'].includes(m.cefr));
  assert.equal(tuB1.length, 386, 'số chặng ≥B1 đổi — mọi mẫu số N4/3.5 phải sửa theo');
  assert.equal(tuB1.filter((m) => m.type === 'vstep').length, 122,
    'mẫu số của N5 (chặng từ vựng ≥B1) đổi — sửa cả dòng 3.1 trong KE_HOACH_B2.md');

  // Không chặng nào khai một bài nghe theo đoạn. Không có trường nào để khai:
  // hình dạng chặng chỉ có type/targetId, và type bị khoá ở ba giá trị.
  const coNghe = tuB1.filter((m) => m.listeningId || m.passageId || m.type === 'listening');
  assert.equal(coNghe.length, 0,
    `${coNghe.length} chặng đã khai bài nghe — cập nhật ghi chú N4 và con số ở đây`);
});
