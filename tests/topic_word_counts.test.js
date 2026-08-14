// File: tests/topic_word_counts.test.js
// GHIM BẤT BIẾN "SỐ TỪ KHAI RA PHẢI ĐÚNG".
//
// Bối cảnh (BAO_CAO_SO_TU_TIEU_DE.md, đo 2026-08-14): 182/235 tiêu đề chủ đề
// và 182/235 mô tả khai sai số từ — cộng dồn hứa 23.452 từ mà thực có 18.569,
// 73 chủ đề khai 100 trong khi chỉ có 50. Không ai cố tình nói dối: con số
// được chép tay vào tiêu đề rồi kho thay đổi, còn chuỗi thì đứng yên.
//
// Nên bản sửa KHÔNG phải là "chép lại cho đúng" mà là bỏ hẳn con số khỏi tiêu
// đề (giao diện đã hiển thị words.length thật). Test này giữ cho nó không quay
// lại: thêm "(100 Từ)" vào một tiêu đề mới là đỏ ngay.
//
// Phần logic nằm ở scripts/check_topic_word_counts.mjs để vừa chạy được trong
// CI vừa dùng lại được sau mỗi lần sửa dữ liệu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkTopicWordCounts, TITLE_COUNT, DESC_COUNT } from '../scripts/check_topic_word_counts.mjs';

test('không tiêu đề chủ đề/chặng nào khai số từ, và mọi mô tả có số đều khớp words.length', async () => {
  const { topics, loi } = await checkTopicWordCounts();
  assert.ok(topics.length > 200, `kho chỉ còn ${topics.length} chủ đề — nghi dữ liệu không nạp được`);
  assert.deepEqual(loi, [], 'chỗ sau khai số từ sai:\n  ' + loi.join('\n  '));
});

test('bộ dò bắt được đúng thứ nó phải bắt (kẻo test trên xanh vì dò hỏng)', () => {
  // Nếu hai biểu thức này hỏng thì test ở trên sẽ xanh vĩnh viễn mà chẳng kiểm
  // gì cả — đây là bẫy nguy hiểm hơn cả lỗi dữ liệu.
  assert.ok(TITLE_COUNT.test('🏥 Sức Khỏe & Y Tế (100 Từ) (B2-C1)'));
  assert.ok(TITLE_COUNT.test('✈️ Du Lịch (117 từ) (A1-A2)'));
  assert.ok(TITLE_COUNT.test('🏛️ Academic (100 Words) (C1)'));
  assert.ok(!TITLE_COUNT.test('🏥 Sức Khỏe & Y Tế (B2-C1)'), 'cấp độ trong ngoặc không phải số từ');
  assert.ok(!TITLE_COUNT.test('🎬 Giải Trí (A2-B1) – Phần 2'));
  assert.equal(Number('100 từ vựng về nhà ở.'.match(DESC_COUNT)[1]), 100);
  assert.equal('Từ vựng về nhà ở.'.match(DESC_COUNT), null);
});
