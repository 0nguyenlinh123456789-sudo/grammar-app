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
    // Ba loại đầu có từ Đợt 1; ba loại sau thêm ở N4 (b′) khi đưa bài nghe theo
    // đoạn, bài đọc dài và buổi chép chính tả vào lộ trình. Danh sách này là
    // CỔNG: thêm loại chặng mà không khai ở đây thì test đỏ, và `launchMilestone`
    // trong WelcomePage cũng phải có nhánh tương ứng (xem test dưới).
    if (!['grammar', 'vstep', 'oxford', 'listening', 'reading', 'dictation'].includes(m.type)) loi.push(`${m.id}: loại chặng lạ "${m.type}"`);
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
// KHO NỘI DUNG VÀ ĐƯỜNG ĐI TỚI NÓ — nay đòi hỏi thật, không còn ghim số 0.
//
// Việc 1.3 của KE_HOACH_B2.md sinh ra để chữa đúng một chuyện: 260 unit Oxford
// đã soạn xong mà không có chặng nào dẫn tới, nên người đi theo lộ trình không
// bao giờ gặp. Chuyện đó ĐÃ LẶP LẠI với bốn kho soạn ở Đợt 3, 5 và 6 — chỉ với
// tới được bằng NÚT trên trang chủ. Đo ra 0/60, 0/30, 0/239, 0/3.
//
// Vì sao không test nào bắt được:
//   - `orphan_data.test.js` đo MỒ CÔI Ở MỨC FILE ("có ai import file này
//     không"). Cả bốn kho đều được import đàng hoàng nên nó xanh — đúng phận
//     sự của nó. Mồ côi ở mức ĐƯỜNG ĐI là chuyện khác.
//   - N1 ở đầu file này đếm đúng ba kho tồn tại lúc nó được viết.
// Bài học cũ, chiều mới: "luật thêm sau khi dữ liệu đã có thì không bao giờ
// chạy trên dữ liệu cũ" — đây là chiều ngược lại, luật viết TRƯỚC thì không
// bao giờ chạy trên dữ liệu THÊM SAU.
//
// ĐÃ SỬA: 60 bài nghe + 30 bài đọc dài nay MỖI BÀI MỘT CHẶNG, cộng 3 buổi chép
// chính tả (một mỗi bậc ≥B1). Lộ trình 617 → 710 chặng.
//
// HAI KHO CÒN LẠI KHÔNG ĐƯỢC XẾP, VÀ ĐÓ LÀ QUYẾT ĐỊNH CÓ LÝ DO, KHÔNG PHẢI BỎ
// SÓT — nên chúng vẫn ở trong bảng này với mốc 0, để mai sau ai đọc cũng thấy:
//   - 239 bản thu chép chính tả là một KHO DÙNG CHUNG chia theo độ dài câu, KHÔNG
//     phải 239 bài học; mỗi phiên bốc 5 câu. Đường đi tới nó là 3 chặng
//     `dictation`, không phải 239 chặng.
//   - 3 đề thi cuối bậc là CỬA ẢI cuối bậc. N8 không đòi đề thi nằm trong đường
//     đi thẳng, và chèn nó vào giữa lộ trình sẽ biến bài thi thành một bước học.
const KHO_NGOAI_LO_TRINH = [
  { file: 'listeningPassages.js', xuat: 'listeningPassages', ten: 'bài nghe theo đoạn (2.2)', soMuc: 60, denDuocToiThieu: 60 },
  { file: 'readingTexts.js', xuat: 'readingTexts', ten: 'bài đọc dài 600–1.000 từ (5.3)', soMuc: 30, denDuocToiThieu: 30 },
  { file: 'audioManifest.js', xuat: 'audioManifest', ten: 'bản thu chép chính tả (2.1/2.3)', soMuc: 239, denDuocToiThieu: 0, lyDo: 'kho dùng chung, tới bằng 3 chặng dictation' },
  { file: 'bandExamBank.js', xuat: 'bandExams', ten: 'đề thi cuối bậc (4.2)', soMuc: 3, denDuocToiThieu: 0, lyDo: 'cửa ải cuối bậc, N8 không đòi nằm trong đường đi' },
];

test('mọi bài nghe và bài đọc dài đều có chặng dẫn tới (chữa lỗi 1.3 tái diễn)', async () => {
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const milestones = roadmapData.flatMap((l) => l.milestones);
  const targets = new Set(milestones.map((m) => String(m.targetId)));

  const thieu = [];
  for (const kho of KHO_NGOAI_LO_TRINH) {
    const mod = await import(pathToFileURL(path.join(DATA, kho.file)).href);
    const muc = mod[kho.xuat];
    assert.ok(Array.isArray(muc), `${kho.file}: không xuất mảng "${kho.xuat}" nữa`);
    // Số mục ghim luôn: kho lớn lên mà không ai xếp phần thêm vào lộ trình thì
    // lỗi 1.3 tái diễn lần thứ ba — lần này test bắt được.
    assert.equal(muc.length, kho.soMuc,
      `${kho.ten}: kho có ${muc.length} mục, con số ghim là ${kho.soMuc} — nếu vừa thêm bài thì chạy lại "node scripts/build_roadmap.mjs" rồi sửa con số ở đây`);
    const denDuoc = muc.filter((m) => targets.has(String(m.id))).length;
    if (denDuoc < kho.denDuocToiThieu) thieu.push(`${kho.ten}: chỉ ${denDuoc}/${muc.length} có chặng dẫn tới`);
  }

  assert.deepEqual(thieu, [],
    'nội dung sau không có đủ chặng dẫn tới — chạy lại "node scripts/build_roadmap.mjs":\n  ' + thieu.join('\n  '));
});

test('mỗi loại chặng đều có nhánh mở trong launchMilestone — không có chặng bấm vào không ra gì', async () => {
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const loai = [...new Set(roadmapData.flatMap((l) => l.milestones).map((m) => m.type))];
  const src = fs.readFileSync(path.join(ROOT, 'src', 'pages', 'WelcomePage.jsx'), 'utf8');

  // Bộ sinh lộ trình và giao diện là HAI file, nên thêm một loại chặng ở bộ sinh
  // mà quên nhánh ở giao diện sẽ ra một chặng bấm vào KHÔNG XẢY RA GÌ — không
  // lỗi, không báo, chỉ im lặng. Đúng loại hỏng khó thấy nhất.
  const thieuNhanh = loai.filter((t) => !src.includes(`milestone.type === '${t}'`));
  assert.deepEqual(thieuNhanh, [],
    `loại chặng sau có trong lộ trình nhưng launchMilestone không có nhánh mở: ${thieuNhanh.join(', ')}`);
});

// N4 VẾ (b′) — ĐO THEO BẬC, KHÔNG THEO TỪNG CHẶNG.
//
// Đây là chỗ dễ tự bẫy nhất của cả đợt: phép đo cũ ("mỗi chặng ≥B1 có một bài
// nghe gắn với nội dung chặng") CHÍNH LÀ thứ ghi chú N4 vừa chứng minh là không
// trung thực được — 60 bài dạy tiếng Anh phổ thông của VOA không nói về nội dung
// của "Oxford Unit 42" và không thể nói. Ghim 0/386 ở đây là ghim đúng cái phép
// đo vừa bị bỏ, tức là dựng một bánh cóc bảo vệ một câu hỏi sai.
//
// Nên đơn vị đo là BẬC: mỗi bậc ≥B1 có ≥15 bài nghe theo đoạn NẰM TRONG lộ
// trình. "Đến chặng này thì làm một bài nghe" là lời nói về chương trình học —
// đúng và kiểm được; "bài nghe này dạy từ vựng Unit 42" là lời nói về nội dung —
// sai. Hiện đo được 0/3 bậc.
const BAC_TU_B1 = ['intermediate', 'upper_intermediate', 'advanced'];
const BAI_NGHE_MOI_BAC_TOI_THIEU = 15;

test('N4 vế (b′) ĐẠT: mỗi bậc ≥B1 có ≥15 bài nghe theo đoạn nằm trong lộ trình', async () => {
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const { listeningPassages } = await import(pathToFileURL(path.join(DATA, 'listeningPassages.js')).href);
  const idBaiNghe = new Set(listeningPassages.map((p) => String(p.id)));

  const thieu = [];
  for (const bac of BAC_TU_B1) {
    const level = roadmapData.find((l) => l.level === bac);
    assert.ok(level, `lộ trình không còn bậc "${bac}"`);
    const soBai = level.milestones.filter((m) => idBaiNghe.has(String(m.targetId))).length;
    if (soBai < BAI_NGHE_MOI_BAC_TOI_THIEU) thieu.push(`${bac}: chỉ ${soBai} bài nghe`);
  }
  assert.deepEqual(thieu, [],
    `N4 vế (b′) tụt: mỗi bậc ≥B1 phải có ≥${BAI_NGHE_MOI_BAC_TOI_THIEU} bài nghe theo đoạn trong lộ trình:\n  ` + thieu.join('\n  '));

  // KHÔNG bậc nào DƯỚI B1 được xếp bài nghe theo đoạn. Bài VOA là bài dạy cho
  // người đã đọc được câu; bắt người mất gốc nghe 4 phút liền là một lời hứa sai
  // về việc họ làm được gì.
  const duoiB1 = roadmapData
    .filter((l) => !BAC_TU_B1.includes(l.level))
    .flatMap((l) => l.milestones.filter((m) => idBaiNghe.has(String(m.targetId))).map((m) => `${l.level}/${m.targetId}`));
  assert.deepEqual(duoiB1, [], `bài nghe theo đoạn bị xếp vào bậc dưới B1: ${duoiB1.join(', ')}`);
});

test('chặng nghe/đọc/chép chính tả đi qua cổng có điểm (N3), không mở lại cửa đã đóng', async () => {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'pages', 'WelcomePage.jsx'), 'utf8');

  // N3 đã được tuyên bố ĐẠT: "mỗi chặng đều đo độ chính xác trước khi đánh dấu
  // xong". Thêm 93 chặng mà quên đường ghi điểm là lặng lẽ phá đúng tiêu chí đó
  // — 93 chặng hoàn thành được mà không cần trả lời đúng câu nào.
  assert.match(src, /buildEvidence\(/, 'WelcomePage phải dựng bằng chứng qua buildEvidence');
  assert.match(src, /completeMilestone\?\.\([^)]*evidence\)/,
    'chặng nghe/đọc phải gọi completeMilestone KÈM bằng chứng — thiếu tham số thứ ba là mở lại cửa của hạng mục #1');

  for (const [ten, duong] of [
    ['nghe theo đoạn', 'src/components/listening/ListeningPassagePanel.jsx'],
    ['đọc bài dài', 'src/components/reading/ReadingLongPanel.jsx'],
  ]) {
    const panel = fs.readFileSync(path.join(ROOT, duong), 'utf8');
    assert.match(panel, /onXong\?\.\(\{\s*correct:/, `${ten}: panel phải báo số câu đúng về cho lộ trình`);
    // Và phải BÁO khi chặng trỏ tới bài không còn trong kho — luật ẩn-hoặc-báo.
    assert.match(panel, /không còn trong kho/, `${ten}: thiếu dòng báo khi chặng trỏ tới bài đã mất`);
  }
});

test('ba mẫu số 710 / 479 / 122 không được lệch nhau ở đâu nữa', async () => {
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const milestones = roadmapData.flatMap((l) => l.milestones);

  // MẪU SỐ PHẢI GỌI RÕ LÀ MẪU SỐ NÀO — tài liệu này đã hai lần dính chuyện "ba
  // con số trong một tài liệu". Ba mẫu số đang dùng:
  //   710 — toàn bộ lộ trình (mẫu số của thanh tiến độ trên trang chủ)
  //   479 — mọi loại chặng bậc ≥B1 (N4 và việc 3.5). Trước N4 (b′) là 386.
  //   122 — chỉ chặng `vstep` bậc ≥B1 (N5 / việc 3.1). KHÔNG đổi, vì đợt này
  //         không thêm chủ đề từ vựng nào.
  assert.equal(milestones.length, 710, 'tổng số chặng đổi — mọi con số trong KE_HOACH_B2.md phải sửa theo');
  const tuB1 = milestones.filter((m) => ['B1', 'B2', 'C1'].includes(m.cefr));
  assert.equal(tuB1.length, 479, 'số chặng ≥B1 đổi — mọi mẫu số N4/3.5 phải sửa theo');
  assert.equal(tuB1.filter((m) => m.type === 'vstep').length, 122,
    'mẫu số của N5 (chặng từ vựng ≥B1) đổi — sửa cả dòng 3.1 trong KE_HOACH_B2.md');
});
