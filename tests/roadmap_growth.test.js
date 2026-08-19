// BÁO "LỘ TRÌNH VỪA DÀI RA" — ĐÚNG NGƯỜI, ĐÚNG MỘT LẦN.
//
// Lời báo này tồn tại vì mẫu số tiến độ đổi dưới chân người học: hôm qua
// "120/617", hôm nay "120/710" mà họ không làm gì sai. Luật của dự án là đổi thì
// phải NÓI, không được đổi lặng lẽ.
//
// Nhưng nói với NHẦM NGƯỜI cũng là một kiểu nói sai, và file `roadmapGrowth.js`
// từng phản lại chính dòng đầu của nó ("KHÔNG hiện với người mới cài app"):
// mốc cũ được suy ra từ `tongTruoc` khi máy chưa có cờ, nên người cài app hôm nay
// vẫn mang mốc 617. Chừng nào chưa xong chặng nào thì lời báo bị chặn — nhưng
// **ngay khi học xong chặng đầu tiên** nó bật ra, kể cho họ nghe về một lần lộ
// trình dài ra mà họ chưa từng có mặt.
//
// Tìm ra bằng `npm run hoc:that`, không phải bằng đọc mã: sau khi bộ rà hoàn thành
// chặng đầu tiên, một hộp thoại lạ chen lên giữa lượt và làm bước sau hết giờ.

import test from 'node:test';
import assert from 'node:assert/strict';
import { thongBaoLoTrinhTang, daXemLoTrinhTang, ROADMAP_GROWTH_KEY } from '../src/utils/roadmapGrowth.js';

const khoTam = (banDau = {}) => {
  const m = new Map(Object.entries(banDau));
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    _map: m,
  };
};

test('người dùng CŨ (đã xong chặng, máy chưa có cờ): có báo, lấy mốc từ tổng lần sinh trước', () => {
  const kho = khoTam();
  const r = thongBaoLoTrinhTang({ storage: kho, tongHienTai: 710, tongTruoc: 617, soChangDaXong: 120 });
  assert.deepEqual(r, { cu: 617, moi: 710, them: 93 });
});

test('người MỚI CÀI: chưa xong chặng nào thì không báo — VÀ mốc được đóng lại ngay', () => {
  const kho = khoTam();
  assert.equal(thongBaoLoTrinhTang({ storage: kho, tongHienTai: 710, tongTruoc: 617, soChangDaXong: 0 }), null);
  assert.equal(kho.getItem(ROADMAP_GROWTH_KEY), '710',
    'chưa xong chặng nào thì mẫu số hiện tại chính là con số đầu tiên họ thấy — phải ghi lại');
});

// ĐÂY LÀ PHÉP KIỂM CHÍNH. Không có nó thì hai test trên vẫn xanh trong khi người
// mới vẫn bị báo nhầm.
test('người MỚI CÀI học xong chặng ĐẦU TIÊN: KHÔNG được báo lộ trình dài ra', () => {
  const kho = khoTam();
  // Lần mở app đầu tiên, chưa học gì.
  thongBaoLoTrinhTang({ storage: kho, tongHienTai: 710, tongTruoc: 617, soChangDaXong: 0 });
  // Học xong chặng đầu tiên trong cùng phiên.
  const r = thongBaoLoTrinhTang({ storage: kho, tongHienTai: 710, tongTruoc: 617, soChangDaXong: 1 });
  assert.equal(r, null,
    'người vừa cài app sáng nay bị kể về lần lộ trình tăng 617 → 710 mà họ chưa từng có mặt');
});

test('đã xem rồi thì thôi: có cờ bằng tổng hiện tại là không báo nữa', () => {
  const kho = khoTam({ [ROADMAP_GROWTH_KEY]: '710' });
  assert.equal(thongBaoLoTrinhTang({ storage: kho, tongHienTai: 710, tongTruoc: 617, soChangDaXong: 120 }), null);
});

test('cờ cũ hơn tổng hiện tại: lộ trình dài ra LẦN NỮA thì báo tiếp, mốc lấy từ cờ', () => {
  const kho = khoTam({ [ROADMAP_GROWTH_KEY]: '710' });
  const r = thongBaoLoTrinhTang({ storage: kho, tongHienTai: 800, tongTruoc: 617, soChangDaXong: 120 });
  assert.deepEqual(r, { cu: 710, moi: 800, them: 90 }, 'mốc phải là cờ trong máy, không phải tongTruoc');
});

test('không đóng mốc đè lên cờ đã có', () => {
  const kho = khoTam({ [ROADMAP_GROWTH_KEY]: '617' });
  thongBaoLoTrinhTang({ storage: kho, tongHienTai: 710, tongTruoc: 617, soChangDaXong: 0 });
  assert.equal(kho.getItem(ROADMAP_GROWTH_KEY), '617',
    'ghi đè cờ cũ là xoá mất lời báo mà người dùng cũ đáng được thấy');
});

test('daXemLoTrinhTang ghi đúng tổng, và tổng vô lý thì không báo', () => {
  const kho = khoTam();
  daXemLoTrinhTang(kho, 710);
  assert.equal(kho.getItem(ROADMAP_GROWTH_KEY), '710');
  assert.equal(thongBaoLoTrinhTang({ storage: kho, tongHienTai: 0, tongTruoc: 617, soChangDaXong: 5 }), null);
});

test('không có kho lưu thì không ném lỗi', () => {
  assert.doesNotThrow(() => thongBaoLoTrinhTang({ storage: null, tongHienTai: 710, tongTruoc: 617, soChangDaXong: 0 }));
  assert.doesNotThrow(() => daXemLoTrinhTang(null, 710));
});
