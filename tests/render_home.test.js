// VẼ THẬT TRANG CHỦ SAU KHI XẾP LẠI THÀNH BA NHÓM LƯỚI.
//
// `tests/home_layout.test.js` canh MÃ NGUỒN: danh sách dòng miễn trừ có nằm trong
// WelcomePage.jsx không, có dùng line-clamp không, có dựng từ một mảng không. Nó
// **không** trả lời được câu quan trọng hơn: **những dòng đó có ra tới mắt người
// học không?** Một dòng nằm trong file mà nhánh chứa nó không bao giờ được vẽ thì
// test kia vẫn xanh — đúng loại lỗ hổng đã cho ba lỗi giao diện lọt qua 301 test.
//
// File này vẽ trang chủ ra HTML rồi soi HTML đó. Giới hạn ghi trong
// tests/helpers/render.mjs: useEffect không chạy, không tương tác, không CSS.

import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement as h } from 'react';
import { napComponent, veRa, camGlobalTrinhDuyet } from './helpers/render.mjs';

camGlobalTrinhDuyet();

// Props tối thiểu để trang vẽ được. Cố ý để mọi thứ ở trạng thái NGƯỜI MỚI —
// chưa học gì, chưa có từ nào cần ôn, chưa thi lần nào: đó là trạng thái nhiều
// nhánh "chưa có gì" nhất, tức nhiều chỗ có thể nói sai nhất.
const PROPS_NGUOI_MOI = {
  xp: 0,
  completedMilestones: [],
  milestoneScores: {},
  completeMilestone() {}, verifyMilestone() {},
  setTopicId() {}, setAppMode() {}, setActiveVocabCategory() {},
  setOxfordUnitId() {}, setActiveOxfordBookId() {}, setVstepTopicId() {},
  resetRoadmap() {},
  streak: 0, bestStreak: 0,
  dailyStats: { lessons: 0, xp: 0 },
  activityHistory: [],
  dailyGoal: 1, setDailyGoal() {},
  placementResult: null, setPlacementResult() {},
  playAudio() {},
  theme: 'light', setTheme() {},
};

let html;
test('trang chủ vẽ được, không nổ ở lần vẽ đầu', async () => {
  const { default: WelcomePage } = await napComponent('src/pages/WelcomePage.jsx');
  html = veRa(h(WelcomePage, PROPS_NGUOI_MOI));
  assert.ok(html.length > 5000, `HTML chỉ dài ${html.length} ký tự — trang chủ không thể ngắn thế`);
});

test('cả ba tiêu đề nhóm đều ra tới HTML', async () => {
  for (const ten of ['Bốn kỹ năng', 'Thi và kiểm tra', 'Ôn lại']) {
    assert.ok(html.includes(ten), `thiếu nhóm "${ten}" trong HTML vẽ ra`);
  }
});

test('đủ 10 lối vào luyện tập, mỗi thẻ một nút', async () => {
  const NHAN_NUT = ['CHÉP CHÍNH TẢ', 'NGHE ĐOẠN', 'ĐỌC BÀI DÀI', 'VIẾT', 'NÓI',
    'THI THỬ NGAY', 'THI', 'ÔN NGAY', 'SỬA LỖI', 'MỞ SỔ TAY'];
  const mat = NHAN_NUT.filter((n) => !html.includes(`>${n}</button>`));
  assert.deepEqual(mat, [], 'nhãn nút không ra tới HTML:\n  ' + mat.join('\n  '));
});

test('MỌI dòng nói rõ app không làm được gì đều RA TỚI MẮT người học', async () => {
  // Đây là phép đo mà bản test đọc-chuỗi không làm được. Danh sách trùng với
  // CAU_MIEN_TRU của home_layout.test.js là CÓ Ý: một bên chứng minh nó có trong
  // mã, một bên chứng minh nó ra tới HTML. Cả hai đều cần.
  const CAU_MIEN_TRU = [
    'Giọng người thật',
    'Không cần API key',
    'Không chấm phát âm',
    'văn bản nó nghe được',
    'không phải đánh giá phát âm',
    'Không chấm ngữ pháp, không cho điểm',
    'hai phần app chấm được',
    'dấu câu không tính',
  ];
  const mat = CAU_MIEN_TRU.filter((c) => !html.includes(c));
  assert.deepEqual(mat, [], 'dòng miễn trừ nằm trong mã nhưng KHÔNG ra tới HTML:\n  ' + mat.join('\n  '));
});

test('bảng công thức giờ ra tới HTML, kèm cả vế "giả định" và vế "không tính vào"', async () => {
  assert.ok(html.includes('Con số giờ này tính thế nào?'), 'thiếu chỗ mở bảng công thức');
  assert.ok(html.includes('GIẢ ĐỊNH'), 'không tách "đếm được" khỏi "giả định"');
  assert.ok(html.includes('Không tính vào:'), 'thiếu vế nói rõ công thức KHÔNG tính những gì');
  // Hằng số phải là SỐ THẬT trong HTML, không phải "undefined" — cách duy nhất
  // bắt được chuyện `CONG_THUC_GIO` thiếu một khoá là xem HTML vẽ ra.
  assert.ok(!/undefined/.test(html), 'HTML có chữ "undefined" — một giá trị nào đó không tồn tại');
  assert.match(html, /200 từ trong 6 phút/, 'công thức đọc bài không ra đúng số');
});

test('người mới KHÔNG bị nói dối về tiến độ', async () => {
  // Trạng thái người mới là chỗ dễ nói quá nhất. Ba câu này phải nói đúng sự thật.
  assert.ok(html.includes('Chưa có từ nào cần ôn'), 'thẻ Ôn tập từ không nói thật khi chưa có từ nào');
  assert.ok(!/\d+ từ<\/span> cần ôn hôm nay/.test(html), 'nói có từ cần ôn trong khi chưa có từ nào');
  assert.ok(!/[Đđ]ang tải/.test(html), 'trang chủ có chữ "đang tải" trong khi không có gì đang tải');
});
