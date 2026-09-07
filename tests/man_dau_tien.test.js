// MÀN HÌNH ĐẦU TIÊN CỦA NGƯỜI HỌC MỚI.
//
// ══ VẤN ĐỀ ĐÃ ĐO ══
// Người mở app lần đầu thấy đúng ba con số 0 — "0/724 (0 XP)" và "0 Ngày" —
// cộng một dòng phụ nói về "🧊 Đóng băng: 2/2", khái niệm chỉ có nghĩa với
// người ĐANG có chuỗi ngày học. Đây là lúc người ta muốn học nhất, và màn hình
// chỉ nói được một điều: bạn chưa có gì.
//
// ══ RÀNG BUỘC QUAN TRỌNG NHẤT Ở ĐÂY ══
// Cách sửa dễ và SAI là cho sẵn XP hoặc chuỗi 1 ngày cho người mới. Luật của
// dự án là "thiếu dữ liệu thì ẨN hoặc BÁO, không im lặng" — không có vế "bịa
// ra". Bài kiểm này neo cả hai vế: dòng phụ mới CÓ, và con số thật KHÔNG bị
// thay bằng số bịa.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const NGUON = fs.readFileSync(new URL('../src/pages/WelcomePage.jsx', import.meta.url), 'utf8');

test('người CHƯA xong chặng nào được nói cho biết bước kế tiếp dài bao lâu', () => {
  assert.ok(/completedCount === 0 && nextMilestone &&/.test(NGUON),
    'mất nhánh dòng phụ cho người học mới ở thẻ Tiến Độ & XP');
  assert.ok(/Chưa xong chặng nào · chặng đầu ~\{nextMilestone\.minutes \|\| 15\} phút/.test(NGUON),
    'mất câu nói bước kế tiếp dài bao lâu');
});

test('người CHƯA có chuỗi không bị đọc dòng nói về "đóng băng chuỗi"', () => {
  // Dòng "🧊 Đóng băng: 2/2" chỉ có nghĩa với người đang giữ một chuỗi. Với
  // người chưa học ngày nào, nó là chữ thừa ở đúng chỗ quý nhất của app.
  assert.ok(/streak === 0 && bestStreak === 0/.test(NGUON),
    'mất nhánh phân biệt người mới ở thẻ Chuỗi Học Tập');
  assert.ok(/Học một chặng hôm nay là bắt đầu ngày 1/.test(NGUON),
    'mất câu mời học của người chưa có chuỗi');
});

test('người ĐÃ có chuỗi vẫn thấy kỷ lục và số lần đóng băng như cũ', () => {
  // Nhánh cũ phải còn nguyên. Sửa màn hình người mới mà làm mất thông tin của
  // người đang học là đổi một lỗi lấy một lỗi khác.
  assert.ok(/🏆 Kỷ lục: \{bestStreak\} ngày/.test(NGUON),
    'mất dòng kỷ lục của người đã có chuỗi');
  assert.ok(/🧊 Đóng băng: \{freezesLeft\(\)\}\/2/.test(NGUON),
    'mất dòng đóng băng của người đã có chuỗi');
});

test('KHÔNG bịa số cho người mới — con số hiện ra vẫn là con số thật', () => {
  // Đây là vế dễ vi phạm nhất khi ai đó "làm cho màn hình đầu đỡ trống".
  assert.ok(/\{completedCount\}\/\{totalMilestonesCount\}/.test(NGUON),
    'tiến độ không còn đọc từ completedCount/totalMilestonesCount thật');
  assert.ok(/\(\{xp\} XP\)/.test(NGUON), 'XP không còn đọc từ giá trị thật');
  assert.ok(/leading-none mt-1">\{streak\} <span/.test(NGUON),
    'chuỗi ngày không còn đọc từ giá trị thật');

  // Và KHÔNG ai mồi một giá trị khác 0 vào prop. Viết ở dạng PHỦ ĐỊNH mới
  // đúng ý: `xp` vốn không có giá trị mặc định nào, nên khẳng định "mặc định
  // bằng 0" là khẳng định một chuyện không tồn tại — nó xanh hay đỏ đều không
  // nói lên điều gì về thứ ta lo.
  assert.ok(!/\bxp = [1-9]/.test(NGUON),
    'có ai đó mồi sẵn XP khác 0 cho người học mới');
  assert.ok(!/\bstreak = [1-9]/.test(NGUON),
    'có ai đó mồi sẵn chuỗi ngày khác 0 cho người học mới');
  assert.ok(!/\bbestStreak = [1-9]/.test(NGUON),
    'có ai đó mồi sẵn kỷ lục chuỗi khác 0 cho người học mới');
});
