// File: tests/roadmap_nav.test.js
// Hạng mục #2 — nối kết quả test đầu vào vào lộ trình.
//
// Bẫy chính: placement dùng id 'upper-intermediate' (gạch NGANG) còn lộ trình
// dùng 'upper_intermediate' (gạch DƯỚI). Lệch một ký tự là cả một band người
// học bị đưa nhầm chặng, và giao diện thì không kêu gì cả.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  PLACEMENT_TO_ROADMAP, PLACEMENT_LEVEL_IDS, ROADMAP_LEVEL_ORDER,
  pickNextMilestone, roadmapLevelFor, isReviewLevel,
  isSkippingAhead, currentBandOf, bandDistance,
} from '../src/utils/roadmapNav.js';
import { roadmapData } from '../src/data/roadmapData.js';

const ALL = roadmapData.flatMap((l) => l.milestones.map((m) => ({ ...m, levelId: l.level })));

test('map placement → lộ trình phủ hết cấp độ và trỏ vào cấp độ có thật', () => {
  // Mọi id của placement phải có trong map (thêm cấp độ thứ 6 mà quên map → đỏ)
  for (const id of PLACEMENT_LEVEL_IDS) {
    assert.ok(id in PLACEMENT_TO_ROADMAP, `placement level "${id}" chưa có trong PLACEMENT_TO_ROADMAP`);
  }
  // Mọi giá trị của map phải là cấp độ CÓ THẬT trong roadmapData
  const real = new Set(roadmapData.map((l) => l.level));
  for (const [from, to] of Object.entries(PLACEMENT_TO_ROADMAP)) {
    assert.ok(real.has(to), `"${from}" trỏ tới cấp độ "${to}" không có trong roadmapData`);
    assert.ok(ROADMAP_LEVEL_ORDER.includes(to), `"${to}" thiếu trong ROADMAP_LEVEL_ORDER`);
  }
  // Chính cái bẫy: gạch ngang → gạch dưới
  assert.equal(roadmapLevelFor('upper-intermediate'), 'upper_intermediate');
  assert.equal(roadmapLevelFor('upper_intermediate'), null, 'id kiểu lộ trình không được coi là id placement');
});

test('mọi chặng trong lộ trình đều thuộc một cấp độ đã biết thứ tự', () => {
  for (const m of ALL) {
    assert.ok(ROADMAP_LEVEL_ORDER.includes(m.levelId), `chặng ${m.id} ở cấp độ lạ "${m.levelId}"`);
  }
  // targetId là khoá đánh dấu hoàn thành → phải duy nhất, nếu không xong một
  // chặng sẽ vô tình đánh dấu xong một chặng khác.
  const ids = ALL.map((m) => m.targetId);
  assert.equal(new Set(ids).size, ids.length, 'có 2 chặng dùng chung targetId');
});

test('band advanced → chặng Advanced đầu tiên, không phải chặng A1 còn dở', () => {
  const next = pickNextMilestone(ALL, [], 'advanced');
  assert.equal(next.levelId, 'advanced');
  assert.equal(next.id, roadmapData.find((l) => l.level === 'advanced').milestones[0].id);
});

test('band upper-intermediate map đúng sang upper_intermediate (test chống lỗi gạch nối)', () => {
  const next = pickNextMilestone(ALL, [], 'upper-intermediate');
  assert.equal(next.levelId, 'upper_intermediate');
  assert.equal(next.id, roadmapData.find((l) => l.level === 'upper_intermediate').milestones[0].id);
});

test('chưa làm test đầu vào → giữ nguyên hành vi cũ (chặng dở đầu tiên)', () => {
  assert.equal(pickNextMilestone(ALL, [], null).id, ALL[0].id);
  assert.equal(pickNextMilestone(ALL, [], undefined).id, ALL[0].id);
  assert.equal(pickNextMilestone(ALL, [ALL[0].targetId], null).id, ALL[1].id);
  // id lạ (dữ liệu cũ/hỏng) cũng phải rơi về hành vi cũ, không được văng
  assert.equal(pickNextMilestone(ALL, [], 'khong-ton-tai').id, ALL[0].id);
});

test('bỏ qua chặng đã xong Ở TRONG cấp độ được đề xuất', () => {
  const adv = roadmapData.find((l) => l.level === 'advanced').milestones;
  const next = pickNextMilestone(ALL, [adv[0].targetId, adv[1].targetId], 'advanced');
  assert.equal(next.id, adv[2].id);
});

test('xong hết từ cấp độ đề xuất trở lên → quay về chặng dở đầu tiên, KHÔNG trả null', () => {
  // Nếu trả null thì nút "học tiếp" ở trang chủ biến mất — người học mở app
  // lên thấy không còn gì để bấm.
  const doneFromAdvanced = ALL.filter((m) => m.levelId === 'advanced').map((m) => m.targetId);
  const next = pickNextMilestone(ALL, doneFromAdvanced, 'advanced');
  assert.ok(next, 'không được trả null khi vẫn còn chặng dở ở cấp thấp hơn');
  assert.equal(next.id, ALL[0].id);
});

test('xong sạch lộ trình → null', () => {
  assert.equal(pickNextMilestone(ALL, ALL.map((m) => m.targetId), 'starter'), null);
  assert.equal(pickNextMilestone(ALL, ALL.map((m) => m.targetId), null), null);
});

test('cấp độ dưới trình độ đề xuất được gắn nhãn Ôn lại, cấp độ đề xuất thì không', () => {
  assert.equal(isReviewLevel('starter', 'intermediate'), true);
  assert.equal(isReviewLevel('elementary', 'intermediate'), true);
  assert.equal(isReviewLevel('intermediate', 'intermediate'), false);
  assert.equal(isReviewLevel('advanced', 'intermediate'), false);
  // chưa làm test → không cấp nào bị gắn "Ôn lại"
  assert.equal(isReviewLevel('starter', null), false);
  // vẫn phải đúng với band có gạch nối
  assert.equal(isReviewLevel('intermediate', 'upper-intermediate'), true);
  assert.equal(isReviewLevel('advanced', 'upper-intermediate'), false);
});

test('dữ liệu vào rỗng/hỏng không làm văng hàm', () => {
  assert.equal(pickNextMilestone(null, null, 'advanced'), null);
  assert.equal(pickNextMilestone([], [], 'advanced'), null);
});

// ---- (1.6) Khoá mềm: cảnh báo nhảy cóc, KHÔNG chặn --------------------------

test('cảnh báo nhảy cóc: đi trước quá 1 bậc mới cảnh báo, và không bao giờ chặn', () => {
  // Đang ở A2 (elementary): B1 là bước kế tiếp hợp lý → không cảnh báo.
  assert.equal(isSkippingAhead('intermediate', 'elementary'), false);
  // Nhảy thẳng lên B2 hoặc C1 → cảnh báo.
  assert.equal(isSkippingAhead('upper_intermediate', 'elementary'), true);
  assert.equal(isSkippingAhead('advanced', 'elementary'), true);
  // Học lại bậc thấp hơn: KHÔNG phải nhảy cóc.
  assert.equal(isSkippingAhead('foundation', 'elementary'), false);
  assert.equal(isSkippingAhead('starter', 'advanced'), false);
  // Cùng bậc.
  assert.equal(isSkippingAhead('elementary', 'elementary'), false);
});

test('không rõ người học đang ở đâu thì KHÔNG cảnh báo ai cả', () => {
  assert.equal(currentBandOf(null), null);
  assert.equal(currentBandOf({}), null);
  assert.equal(currentBandOf({ levelId: 'intermediate' }), 'intermediate');
  // currentBand null → mọi chặng đều không bị gắn nhãn vượt cấp.
  assert.equal(isSkippingAhead('advanced', null), false);
  assert.equal(isSkippingAhead(null, 'starter'), false);
  // Bậc lạ không có trong thứ tự → coi như khoảng cách 0, không cảnh báo bừa.
  assert.equal(bandDistance('khong_co_that', 'advanced'), 0);
  assert.equal(isSkippingAhead('advanced', 'khong_co_that'), false);
});

test('cụm A0 đứng trước starter trong thứ tự bậc', () => {
  assert.equal(ROADMAP_LEVEL_ORDER[0], 'foundation');
  assert.equal(bandDistance('foundation', 'starter'), 1);
  // Bài test đầu vào không map sang A0: điểm thấp nhất vẫn ra 'starter'.
  assert.ok(!Object.values(PLACEMENT_TO_ROADMAP).includes('foundation'));
});
