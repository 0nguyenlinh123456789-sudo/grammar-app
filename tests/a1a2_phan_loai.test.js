// BẢNG PHÂN LOẠI 52 CHẶNG A1/A2 PHẢI KHỚP VỚI THỰC TẾ, KHÔNG PHẢI MỘT GHI CHÚ.
//
// `scripts/audit_a1a2_story.mjs` xếp 52 chặng A1/A2 là "không đủ điều kiện
// soạn", 48/52 chỉ vì đếm được ít hơn 4 dấu hiệu tường thuật. Đọc thật thì bộ
// đếm đó gộp hai chuyện khác hẳn: truyện kể ngôi thứ nhất trượt vì thiếu đại từ
// (`kids-starter`), và diễu hành từ vựng thật (`nature-animals-beginner`).
// Chính file audit tự dặn: "BỘ LỌC THÔ để ra DANH SÁCH VIỆC, KHÔNG phải phán
// quyết chất lượng."
//
// Nên phán quyết do người đọc ra — và test này bắt phán quyết đó phải TRUNG
// THỰC. Không có nó thì bảng phân loại là một đoạn văn đẹp: khai "đã soạn" mà
// kho không có câu nào cũng chẳng ai biết, và bỏ sót chặng cũng chẳng ai biết.

import test from 'node:test';
import assert from 'node:assert/strict';
import { PHAN_LOAI_A1, PHAN_LOAI_A2 } from '../scripts/data/a1a2_phan_loai.mjs';
import { STORY_QUIZ_A1 } from '../src/data/storyQuizA1.js';
import { STORY_QUIZ } from '../src/data/storyQuiz.js';
import { doA1A2 } from '../scripts/audit_a1a2_story.mjs';

let kq;
test('đo lại danh sách chặng không đủ điều kiện', async () => {
  kq = await doA1A2();
  assert.ok(Array.isArray(kq.khong), 'audit không trả về danh sách chặng thiếu');
  assert.ok(Array.isArray(kq.daCo), 'audit không trả về danh sách chặng đã có câu hỏi');
});

// ⚠️ DANH SÁCH CỦA AUDIT CO LẠI KHI VIỆC ĐƯỢC LÀM XONG: chặng nào đã có câu hỏi
// thì nó nhảy khỏi `khong` sang `daCo` (52 → 43 ngay sau đợt 19/08). Nên phép
// phủ phải hỏi theo HAI CHIỀU, không so thẳng hai danh sách:
//   · chặng A1 CÒN thiếu mà chưa xếp loại  → sót việc;
//   · mục đã xếp mà không thuộc cả hai nhóm → xếp cho một chặng không có thật.
test('phân loại phủ ĐÚNG các chặng A1 bị bộ lọc loại — không sót, không bịa', () => {
  const conThieu = kq.khong.filter((c) => c.bac === 'starter').map((c) => c.id);
  const daCo = new Set(kq.daCo);
  const daXep = Object.keys(PHAN_LOAI_A1);

  const sot = conThieu.filter((id) => !daXep.includes(id));
  assert.deepEqual(sot, [], `chặng A1 bị loại mà chưa xếp: ${sot.join(', ')}`);

  const bia = daXep.filter((id) => !conThieu.includes(id) && !daCo.has(id));
  assert.deepEqual(bia, [], `xếp loại cho chặng không nằm trong danh sách nào: ${bia.join(', ')}`);
});

test('mọi mục đều có nhóm hợp lệ và LÝ DO ĐÍCH DANH, không phải câu khái quát', () => {
  for (const [id, m] of Object.entries(PHAN_LOAI_A1)) {
    assert.ok(['soan', 'viet-lai'].includes(m.nhom), `${id}: nhóm lạ "${m.nhom}"`);
    // Ngưỡng độ dài là để chặn "bài chưa đạt" / "cần xem lại" — loại câu không
    // nói gì. Lý do phải chỉ được vào CHÍNH bài đó, như `digital-society-100`.
    assert.ok(m.vi && m.vi.length >= 60, `${id}: lý do quá ngắn để là lý do đích danh`);
  }
});

test('khai "đã soạn" thì kho phải CÓ THẬT ≥4 câu — không được khai khống', () => {
  for (const [id, m] of Object.entries(PHAN_LOAI_A1)) {
    if (!m.xong) continue;
    const ds = STORY_QUIZ_A1[id];
    assert.ok(Array.isArray(ds) && ds.length >= 4,
      `${id}: khai đã soạn nhưng kho chỉ có ${ds?.length || 0} câu`);
  }
});

test('chặng xếp "cần viết lại" thì KHÔNG được lặng lẽ có câu hỏi', () => {
  // Nếu một chặng vừa bị xếp là diễu hành từ vựng vừa có câu hỏi trong kho thì
  // một trong hai chỗ đang nói dối, và tấm băng cảnh báo cam sẽ tắt trong khi
  // cái lỗ vẫn còn — đúng kiểu "thay thế âm thầm" mà dự án cấm.
  for (const [id, m] of Object.entries(PHAN_LOAI_A1)) {
    if (m.nhom !== 'viet-lai') continue;
    // Hỏi KHO GỘP, không hỏi riêng kho A1. Bản đầu của test này hỏi
    // `STORY_QUIZ_A1` — mà tấm băng cảnh báo cam tắt theo `STORY_QUIZ` (gộp cả
    // A1/A2/B1/B2). Một chặng có câu hỏi nằm ở file khác thì test vẫn xanh trong
    // khi băng đã tắt và cái lỗ vẫn còn. Cùng họ điểm mù với chuyện hỏi nhầm đối
    // tượng hẹp hơn thứ mình đang canh.
    assert.ok(!STORY_QUIZ[id], `${id}: xếp "cần viết lại" mà lại có câu hỏi trong kho gộp`);
  }
});

// ── BẬC A2: cùng bộ phép phủ, chỉ đổi đúng một chữ trong bộ lọc bậc ────────
// ĐÃ THỬ ĐỎ BA CÁCH, và một trong ba cho kết quả khác tôi đoán — ghi lại cả
// chỗ đoán sai vì nó mới là chỗ dạy được điều gì:
//   1. Xóa một mục A2 khỏi bảng → đỏ, báo đích danh 'hotel-accommodation-daily'.
//   2. Sao chép khối A1 xuống mà quên đổi 'starter' → 'elementary'. Tôi tưởng nó
//      XANH giả; thử thì ĐỎ, vì `conThieu` thành danh sách A1 còn `daXep` là
//      khóa A2, nên 11 id A1 rơi hết vào `sot`. Lời báo đọc lẫn (gọi id A1 là
//      "chặng A2") nhưng nó có bắn.
//   3. Gõ sai tên bậc — `'elementry'` — thì `conThieu` RỖNG. Đây MỚI là chỗ im
//      lặng thật: `sot` và `bia` đều rỗng nên hai phép so đều qua, test xanh mà
//      không phủ một chặng nào. Chính vì vậy có dòng `conThieu.length > 0`; thử
//      thì đúng dòng đó bắt được.
test('phân loại phủ ĐÚNG các chặng A2 bị bộ lọc loại — không sót, không bịa', () => {
  const conThieu = kq.khong.filter((c) => c.bac === 'elementary').map((c) => c.id);
  const daCo = new Set(kq.daCo);
  const daXep = Object.keys(PHAN_LOAI_A2);

  assert.ok(conThieu.length > 0,
    'không đo được chặng A2 nào bị loại — bộ lọc bậc đang sai, test này không phủ gì');

  const sot = conThieu.filter((id) => !daXep.includes(id));
  assert.deepEqual(sot, [], `chặng A2 bị loại mà chưa xếp: ${sot.join(', ')}`);

  const bia = daXep.filter((id) => !conThieu.includes(id) && !daCo.has(id));
  assert.deepEqual(bia, [], `xếp loại cho chặng không nằm trong danh sách nào: ${bia.join(', ')}`);
});

test('mục A2 nào cũng có nhóm hợp lệ và LÝ DO ĐÍCH DANH', () => {
  for (const [id, m] of Object.entries(PHAN_LOAI_A2)) {
    assert.ok(['soan', 'viet-lai'].includes(m.nhom), `${id}: nhóm lạ "${m.nhom}"`);
    assert.ok(m.vi && m.vi.length >= 60, `${id}: lý do quá ngắn để là lý do đích danh`);
  }
});

test('A2 khai "đã soạn" thì kho phải CÓ THẬT ≥4 câu', () => {
  // Bậc A2 hiện chưa có mục nào mang `xong: true` — 'soan' ở đây nghĩa là ĐỦ
  // ĐIỀU KIỆN, CHƯA soạn câu, nên tấm băng cảnh báo cam còn bật là đúng. Phép
  // kiểm này để dành cho lúc soạn: khai xong mà kho trống thì nó bắt.
  for (const [id, m] of Object.entries(PHAN_LOAI_A2)) {
    if (!m.xong) continue;
    const ds = STORY_QUIZ[id];
    assert.ok(Array.isArray(ds) && ds.length >= 4,
      `${id}: khai đã soạn nhưng kho chỉ có ${ds?.length || 0} câu`);
  }
});

test('chặng A2 xếp "cần viết lại" thì KHÔNG được lặng lẽ có câu hỏi', () => {
  // ⚠️ HÔM NAY PHÉP KIỂM NÀY QUA MỘT CÁCH HIỂN NHIÊN, và nói ra để phiên sau
  // đừng nhầm nó là bằng chứng: audit chỉ xếp vào `khong` những chặng CHƯA có
  // câu hỏi, nên cả 28 chặng A2 đương nhiên vắng mặt trong kho. Việc của nó là
  // bắn về SAU — lúc ai đó soạn câu cho một chặng còn bị xếp là diễu hành từ
  // vựng, làm tắt băng cảnh báo trong khi cái lỗ vẫn còn.
  for (const [id, m] of Object.entries(PHAN_LOAI_A2)) {
    if (m.nhom !== 'viet-lai') continue;
    assert.ok(!STORY_QUIZ[id], `${id}: xếp "cần viết lại" mà lại có câu hỏi trong kho gộp`);
  }
});
