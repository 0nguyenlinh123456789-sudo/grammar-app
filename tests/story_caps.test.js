// File: tests/story_caps.test.js
// Ghim việc 3.2: bài đọc `storyEn` không được dạy tiếng Anh sai chính tả.
//
// Hai bất biến, và bất biến thứ hai mới là thứ khiến đợt sửa này KIỂM ĐƯỢC:
//
//   1. KHÔNG LỌT LỖI MỚI — mọi lượt từ-của-chủ-đề viết hoa giữa câu đều phải có
//      tên trong `scripts/data/hoa_hop_le.mjs` kèm lý do.
//
//   2. CHỈ ĐỔI HOA/THƯỜNG — băm của `storyEn` sau khi hạ hết về chữ thường phải
//      khớp ảnh chụp lấy TRƯỚC khi sửa. 888 lượt sửa chuỗi mà không có bất biến
//      này thì chỉ là lời hứa "tôi không đổi nghĩa gì đâu"; có nó thì đó là một
//      phép chuẩn hoá máy chứng minh được.
//
// Bất biến 2 cũng chặn hướng ngược lại: sau này ai sửa nội dung bài đọc (thêm
// câu, đổi từ) sẽ làm test đỏ và phải chụp lại ảnh CÓ CHỦ Ý, thay vì đổi nội dung
// lẫn vào một đợt sửa hình thức.
//
// KHÔNG ghim điều mà máy không đo được: 0 lượt dính dấu hiệu KHÔNG có nghĩa là
// 267 bài đọc đã tự nhiên. Đó là việc phải có người đọc — xem báo cáo việc 3.2.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadTopics } from '../scripts/check_topic_word_counts.mjs';
import { timHoaGiuaCau, bamChuThuong, ANH_CHUP, laDauCau } from '../scripts/audit_story_caps.mjs';
import { HOA_HOP_LE, khoaHoa, LA_LUAT } from '../scripts/data/hoa_hop_le.mjs';
import { demTuTrongTruyen } from '../src/utils/textUtils.js';

const topics = await loadTopics();

test('không bài đọc nào viết hoa từ vựng giữa câu ngoài danh sách hợp lệ', () => {
  const xau = timHoaGiuaCau(topics).filter((h) => !h.hopLe);
  const moTa = xau.slice(0, 12).map((h) => `${h.topicId} «${h.form}» …${h.nguCanh}…`);
  assert.deepEqual(moTa, [],
    `${xau.length} lượt viết hoa giữa câu chưa được giải thích. Sai chính tả thì chạy `
    + `\`node scripts/audit_story_caps.mjs --fix\`; đúng chính tả thì kê vào `
    + `scripts/data/hoa_hop_le.mjs kèm lý do:\n  ${moTa.join('\n  ')}`);
});

test('bài đọc chỉ đổi hoa/thường so với ảnh chụp — không đổi một ký tự nội dung nào', () => {
  const truoc = JSON.parse(fs.readFileSync(ANH_CHUP, 'utf8'));
  const sau = bamChuThuong(topics);

  const bienMat = Object.keys(truoc).filter((id) => !(id in sau));
  assert.deepEqual(bienMat, [], `bài đọc biến mất khỏi kho: ${bienMat.join(', ')}`);

  const lech = Object.keys(truoc).filter((id) => truoc[id] !== sau[id]);
  assert.deepEqual(lech, [],
    `NỘI DUNG bài đọc đã đổi (không chỉ hoa/thường) ở ${lech.length} chủ đề: ${lech.slice(0, 8).join(', ')}. `
    + 'Nếu đây là sửa nội dung CÓ CHỦ Ý, chụp lại: node scripts/audit_story_caps.mjs --snapshot');
});

test('mọi NGOẠI LỆ trong danh sách hợp lệ đều còn khớp một chỗ có thật', () => {
  const dungThat = new Set(timHoaGiuaCau(topics).filter((h) => h.hopLe).map((h) => khoaHoa(h.topicId, h.form)));
  // Mục LUẬT (thứ/tháng ở chủ đề dạy lịch) là quy tắc chính tả, không phải ngoại
  // lệ từng chỗ — sửa câu chữ không làm nó mục ruỗng, nên không đòi phải khớp.
  const ruong = [...HOA_HOP_LE.keys()].filter((k) => !LA_LUAT(k) && !dungThat.has(k));
  assert.deepEqual(ruong, [],
    `${ruong.length} ngoại lệ trong hoa_hop_le.mjs không còn khớp chỗ nào — dữ liệu đã đổi, xoá mục thừa đi:\n  `
    + ruong.slice(0, 10).join('\n  '));
});

// Tiêu đề mục Câu Chuyện từng khẳng định "Tất cả N từ xuất hiện trong câu chuyện
// này!". Đo ra: chỉ đúng với 6/267 chủ đề. Test này chốt việc giao diện KHÔNG
// được nói quá — và chốt luôn rằng nhánh "cả N từ" không phải nhánh duy nhất.
test('con số từ-trong-truyện là số đếm được, không phải lời hứa', () => {
  const co = [];
  for (const t of topics) {
    if (!t.storyEn) continue;
    const d = demTuTrongTruyen(t.storyEn, t.words);
    assert.equal(d.tong, (t.words || []).length, `${t.id}: tổng số từ sai`);
    assert.ok(d.co <= d.tong, `${t.id}: đếm ra ${d.co} > tổng ${d.tong} — phép đếm hỏng`);
    co.push(d.co < d.tong);
  }
  assert.ok(co.some(Boolean),
    'không chủ đề nào thiếu từ — phép đếm đang xanh giả, vì đo tay ra 261/267 chủ đề có thiếu');
});

test('phép đếm dùng đúng luật khớp của lớp bôi vàng', () => {
  const words = [{ en: 'booking' }, { en: 'lost property' }, { en: 'suitcase' }];
  const d = demTuTrongTruyen('He made a BOOKING and lost property was gone.', words);
  assert.equal(d.tong, 3);
  assert.equal(d.co, 2, 'phải khớp không phân biệt hoa thường, và không đếm từ vắng mặt');
  assert.deepEqual(demTuTrongTruyen('', words), { co: 0, tong: 3 });
  assert.deepEqual(demTuTrongTruyen('bất kỳ', []), { co: 0, tong: 0 });
  // "bookings" KHÔNG tính là "booking" — vì lớp bôi vàng cũng không bôi nó.
  assert.equal(demTuTrongTruyen('He made bookings.', [{ en: 'booking' }]).co, 0);
});

test('cụm dài nuốt từ ngắn — con số phải bằng SỐ VỆT VÀNG, không phải số từ có mặt', () => {
  // Lớp bôi vàng ưu tiên cụm dài, nên "public transport" chỉ cho MỘT vệt vàng.
  // Nếu đếm từng từ một thì ra 2, và người học đếm lại sẽ thấy lệch.
  const d = demTuTrongTruyen('I use public transport daily.',
    [{ en: 'transport' }, { en: 'public transport' }]);
  assert.deepEqual(d, { co: 1, tong: 2 });
});

// Bốn trường hợp "đầu câu" được gọi tên trong bộ đo. Nếu có ai nới bộ đo, ở đây đỏ.
test('bộ đo nhận đúng bốn kiểu đầu câu', () => {
  assert.equal(laDauCau('Booking is fine', 0), true, 'đầu chuỗi');
  assert.equal(laDauCau('He left.\nBooking again', 9), true, 'đầu dòng');
  assert.equal(laDauCau('He left. Booking again', 9), true, 'sau dấu chấm');
  assert.equal(laDauCau("She said, 'Booking is hard'", 11), true, 'lời thoại sau dấu phẩy + nháy');
  assert.equal(laDauCau('chi phí:\n- Booking: 10$', 11), true, 'gạch đầu dòng');
  assert.equal(laDauCau('He made a Booking now', 10), false, 'GIỮA CÂU — đây mới là lỗi');
  assert.equal(laDauCau('He paused, Booking later', 11), false, 'dấu phẩy trần không phải hết câu');
});
