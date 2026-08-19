// GỠ TUYÊN BỐ "ĐÃ XÁC MINH" KIẾM ĐƯỢC KHI ĐÁP ÁN CÒN Ở Ô ĐẦU.
//
// Nền: tới 19/08/2026, bốn kho để đáp án đúng ở ô đầu gần như mọi câu (bài đọc
// dài 120/120, bài nghe 236/240, thi cuối bậc 42/42, bài A0 144/144). Bản vá
// `tronPhuongAn` chặn từ đó, nhưng tuyên bố ĐÃ LƯU thì vẫn đứng — và đó là loại
// tuyên bố nói với người ngoài (điều kiện cấp chứng nhận, nhãn "đã đạt bậc B1").
//
// Việc này chạy ĐÚNG MỘT LẦN trên máy mỗi người và KHÔNG CÓ LẦN THỨ HAI để sửa,
// nên mỗi ranh giới ở đây đều phải có phép kiểm riêng.

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  changAnhHuong, goBanGhiCu, goMotLan, canBao, daBaoRoi,
  MOC_TRON_PHUONG_AN, CO_DA_GO_KEY, SO_DA_GO_KEY,
} from '../src/utils/tinCayXacMinh.js';
import { MASTERY_STORAGE_KEY } from '../src/utils/mastery.js';

const khoTam = (banDau = {}) => {
  const m = new Map(Object.entries(banDau));
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
  };
};

const LO_TRINH_GIA = [
  { level: 'foundation', milestones: [
    { type: 'grammar', targetId: 'a0-alphabet' },
    { type: 'vstep', targetId: 'a0-tu-vung' },
  ] },
  { level: 'intermediate', milestones: [
    { type: 'reading', targetId: 'voa-doc-1' },
    { type: 'listening', targetId: 'voa-nghe-1' },
    { type: 'grammar', targetId: 'b1-thi-hien-tai' },
    { type: 'oxford', targetId: 'unit-12' },
    { type: 'dictation', targetId: 'dictation-intermediate' },
  ] },
];

test('chặng dính lỗi suy ra TỪ LỘ TRÌNH: nghe, đọc, và ngữ pháp bậc A0', () => {
  const ds = changAnhHuong(LO_TRINH_GIA);
  assert.deepEqual([...ds].sort(), ['a0-alphabet', 'voa-doc-1', 'voa-nghe-1']);
});

test('KHÔNG đụng ngữ pháp B1, Oxford, từ vựng, chép chính tả — bốn kho đó đã trộn sẵn từ trước', () => {
  const ds = changAnhHuong(LO_TRINH_GIA);
  for (const id of ['b1-thi-hien-tai', 'unit-12', 'a0-tu-vung', 'dictation-intermediate']) {
    assert.equal(ds.has(id), false, `${id} không dính lỗi mà bị gỡ là phạt người vô can`);
  }
});

test('chỉ gỡ bản ghi CÓ TRƯỚC mốc; bản ghi làm sau bản vá thì giữ', () => {
  const scores = {
    'voa-doc-1': { percent: 100, passedAt: '2026-08-10T00:00:00.000Z' },
    'voa-nghe-1': { percent: 100, passedAt: '2026-08-20T00:00:00.000Z' },
    'b1-thi-hien-tai': { percent: 90, passedAt: '2026-08-01T00:00:00.000Z' },
  };
  const { scores: moi, daGo } = goBanGhiCu(scores, changAnhHuong(LO_TRINH_GIA));
  assert.deepEqual(daGo, ['voa-doc-1']);
  assert.deepEqual(Object.keys(moi).sort(), ['b1-thi-hien-tai', 'voa-nghe-1']);
});

test('bản ghi KHÔNG có ngày thì coi như cũ và bị gỡ', () => {
  // Không ghi ngày thì không chứng minh được nó có sau bản vá — mà một tuyên bố
  // không chứng minh được thì không phải tuyên bố.
  const { daGo } = goBanGhiCu({ 'voa-doc-1': { percent: 100 } }, changAnhHuong(LO_TRINH_GIA));
  assert.deepEqual(daGo, ['voa-doc-1']);
});

test('chạy ĐÚNG MỘT LẦN: lần hai không gỡ gì thêm', () => {
  const kho = khoTam({
    [MASTERY_STORAGE_KEY]: JSON.stringify({ 'voa-doc-1': { percent: 100, passedAt: '2026-08-10T00:00:00.000Z' } }),
  });
  const l1 = goMotLan(kho, LO_TRINH_GIA);
  assert.deepEqual(l1.daGo, ['voa-doc-1']);
  assert.ok(kho.getItem(CO_DA_GO_KEY));
  const l2 = goMotLan(kho, LO_TRINH_GIA);
  assert.equal(l2.daChay, false);
  assert.deepEqual(l2.daGo, []);
});

test('số chặng đã gỡ được GHI XUỐNG MÁY, không chỉ giữ trong phiên', () => {
  // Giữ trong bộ nhớ phiên thì người tải lại trang trước khi kịp đọc sẽ mất luôn
  // lời báo — tức là gỡ bản ghi của họ trong im lặng.
  const kho = khoTam({
    [MASTERY_STORAGE_KEY]: JSON.stringify({
      'voa-doc-1': { percent: 100, passedAt: '2026-08-10T00:00:00.000Z' },
      'voa-nghe-1': { percent: 100, passedAt: '2026-08-11T00:00:00.000Z' },
    }),
  });
  goMotLan(kho, LO_TRINH_GIA);
  assert.equal(kho.getItem(SO_DA_GO_KEY), '2');
  assert.equal(canBao(kho), 2, 'tải lại trang vẫn phải còn lời báo');
  daBaoRoi(kho);
  assert.equal(canBao(kho), 0, 'đã đọc rồi thì thôi');
});

test('không gỡ gì thì không báo gì', () => {
  const kho = khoTam({ [MASTERY_STORAGE_KEY]: JSON.stringify({ 'b1-thi-hien-tai': { percent: 90 } }) });
  goMotLan(kho, LO_TRINH_GIA);
  assert.equal(canBao(kho), 0);
  assert.equal(kho.getItem(MASTERY_STORAGE_KEY), JSON.stringify({ 'b1-thi-hien-tai': { percent: 90 } }),
    'không có gì để gỡ thì không được ghi đè kho điểm');
});

test('mốc là ngày bản vá lên, không phải một ngày viết bừa', () => {
  assert.equal(MOC_TRON_PHUONG_AN, '2026-08-19T00:00:00.000Z');
});

test('chạy trên LỘ TRÌNH THẬT thì bắt được cả ba loại chặng', async () => {
  const { roadmapData } = await import('../src/data/roadmapData.js');
  const ds = changAnhHuong(roadmapData);
  const dem = { reading: 0, listening: 0, a0: 0 };
  for (const bac of roadmapData) {
    for (const m of bac.milestones) {
      if (!ds.has(m.targetId)) continue;
      if (m.type === 'reading') dem.reading++;
      else if (m.type === 'listening') dem.listening++;
      else if (bac.level === 'foundation') dem.a0++;
    }
  }
  assert.ok(dem.reading >= 30, `chỉ thấy ${dem.reading} chặng đọc dài`);
  assert.ok(dem.listening >= 30, `chỉ thấy ${dem.listening} chặng nghe`);
  assert.ok(dem.a0 >= 10, `chỉ thấy ${dem.a0} chặng ngữ pháp A0`);
});
