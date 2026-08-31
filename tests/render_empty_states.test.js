// TEST ĐẦU TIÊN CỦA DỰ ÁN THẬT SỰ VẼ MỘT TRANG RA HTML.
//
// Tới 17/08 bộ kiểm có 301 test mà không test nào vẽ ra một component nào — và
// ba lỗi giao diện tìm ra hôm nay (trang trắng · "đang tải" vĩnh viễn · tab dẫn
// tới màn hình treo) đều **nằm im qua 301 test xanh**. Test đọc chuỗi trả lời
// được "mã có nói câu đó không"; nó không trả lời được "câu đó có ra tới mắt
// người học không". File này hỏi câu thứ hai.
//
// `tests/empty_state_bao.test.js` vẫn giữ, KHÔNG trùng lặp: nó canh *hình dạng
// mã* (cấm `return null` ở cấp trang, cấm chữ "đang tải"), còn file này canh *kết
// quả vẽ ra*. Sửa mã cho lách được test kia thì test này vẫn đỏ, và ngược lại.
//
// Giới hạn của cách vẽ này được ghi thẳng trong tests/helpers/render.mjs —
// useEffect không chạy, không tương tác, không CSS.

import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createElement as h } from 'react';
import { napComponent, veRa, camGlobalTrinhDuyet } from './helpers/render.mjs';

camGlobalTrinhDuyet();

const goc = (p) => pathToFileURL(path.resolve(p)).href;

test('GrammarPage: chặng trỏ tới bài không còn trong kho thì BÁO, không ra trang trắng', async () => {
  const { default: GrammarPage } = await napComponent('src/pages/GrammarPage.jsx');
  const html = veRa(h(GrammarPage, { topic: undefined, setXp() {}, completeMilestone() {} }));

  // Đây là phép đo mà test đọc-chuỗi KHÔNG làm được: nó chứng minh HTML gửi tới
  // người học có chữ, chứ không phải mã nguồn có chữ.
  assert.ok(html.length > 200, `HTML chỉ dài ${html.length} ký tự — gần như là trang trắng`);
  assert.match(html, /không còn trong kho/, 'không nói cho người học biết chuyện gì');
  assert.match(html, /Tiến độ của bạn không mất gì/, 'không trấn an về tiến độ');
});

test('GrammarPage: bài A0 không có sentenceGame thì KHÔNG hiện tab "Xếp Câu"', async () => {
  const { default: GrammarPage } = await napComponent('src/pages/GrammarPage.jsx');
  const { foundationData } = await import(goc('src/data/foundationData.js'));

  // Lấy bài A0 THẬT, không dựng bài giả: bài giả thì test chỉ chứng minh bộ lọc
  // chạy trên dữ liệu tôi tự bịa, còn lỗi thật nằm ở dữ liệu thật.
  const bai = foundationData.find((t) => !(t.sentenceGame || []).length);
  assert.ok(bai, 'không còn bài A0 nào thiếu sentenceGame — cập nhật lại test này');

  const html = veRa(h(GrammarPage, { topic: bai, setXp() {}, completeMilestone() {} }));
  assert.match(html, /Lý Thuyết/, 'phải còn tab Lý Thuyết');
  assert.ok(!/Xếp Câu/.test(html),
    `bài "${bai.id}" không có sentenceGame mà vẫn hiện tab "Xếp Câu" — bấm vào là màn hình không bao giờ tải xong`);
  // Và tuyệt đối không được có lời "đang tải" nào trong HTML gửi đi.
  assert.ok(!/[Đđ]ang tải/.test(html), 'HTML có chữ "đang tải" trong khi không có gì đang tải');
});

test('GrammarPage: bài CÓ đủ dạng bài thì các tab đó phải hiện', async () => {
  // Vế ngược lại của test trên. Thiếu vế này thì "ẩn hết mọi tab" cũng xanh —
  // đúng loại lỗi đã dính khi một bộ đo chỉ kiểm một chiều.
  const { default: GrammarPage } = await napComponent('src/pages/GrammarPage.jsx');
  const { grammarDataB1 } = await import(goc('src/data/grammarDataB1.js'));
  const bai = grammarDataB1.find((t) => (t.sentenceGame || []).length && (t.fillBlanks || []).length && (t.exercises || []).length);
  assert.ok(bai, 'không tìm thấy bài ngữ pháp nào có cả sentenceGame, fillBlanks và exercises');

  const html = veRa(h(GrammarPage, { topic: bai, setXp() {}, completeMilestone() {} }));
  assert.match(html, /Xếp Câu/, `bài "${bai.id}" CÓ sentenceGame mà tab bị ẩn — bộ lọc ẩn quá tay`);
  assert.match(html, /Điền Từ/, `bài "${bai.id}" CÓ fillBlanks mà tab bị ẩn`);
  // Tab 'exercise' (Trắc Nghiệm) từng thiếu hẳn khoá `data` trong định nghĩa
  // tabs[] — bộ lọc availableTabs đọc Array.isArray(undefined) luôn ra false,
  // nên tab này ẩn TRÊN TOÀN BỘ APP dù 81 chủ đề có sẵn topic.exercises. Đúng
  // họ lỗi với "Xếp Câu" ở trên, chỉ khác một dòng không ai soi tới vì test này
  // trước đây chưa từng hỏi về tab "Trắc Nghiệm".
  assert.match(html, /Trắc Nghiệm/, `bài "${bai.id}" CÓ exercises mà tab "Trắc Nghiệm" bị ẩn`);
});

// Bậc C1+ từng MẤT HẲN tab "Viết Lại" ở cả 25/25 bài: máy sinh nội dung để đáp
// án trùng câu đề, `locBaiHong()` lọc sạch, mảng rỗng nên `availableTabs` giấu
// tab — không lỗi, không cảnh báo, chỉ là bậc cao nhất thiếu một loại bài tập.
// Dữ liệu đã được soạn tay bù lại 31/08; đây là phép ghim ở MÀN HÌNH, bổ sung
// cho tests/bai_tap_lam_duoc.test.js vốn chỉ ghim ở tầng dữ liệu.
test('GrammarPage: bài C1+ phải hiện tab "Viết Lại" — từng mất ở cả 25 bài', async () => {
  const { default: GrammarPage } = await napComponent('src/pages/GrammarPage.jsx');
  const { grammarDataC1C2 } = await import(goc('src/data/grammarDataC1C2.js'));
  for (const bai of grammarDataC1C2) {
    const html = veRa(h(GrammarPage, { topic: bai, setXp() {}, completeMilestone() {} }));
    assert.match(html, /Viết Lại/, `bài C1 "${bai.id}" không hiện tab "Viết Lại"`);
    assert.match(html, /Sửa Lỗi/, `bài C1 "${bai.id}" không hiện tab "Sửa Lỗi"`);
  }
});

test('VocabVstepPage: không tìm thấy chủ đề thì nói KHÔNG TÌM THẤY, không nói "đang tải"', async () => {
  const { default: VocabVstepPage } = await napComponent('src/pages/VocabVstepPage.jsx');
  const html = veRa(h(VocabVstepPage, {
    activeTopic: undefined, playAudio() {}, completedMilestones: [], completeMilestone() {},
  }));
  assert.match(html, /Không tìm thấy chủ đề từ vựng/, 'phải nói rõ là không tìm thấy');
  assert.ok(!/[Đđ]ang tải/.test(html),
    'vẫn nói "đang tải" — mà App.jsx đã chặn bằng vstepLoaded nên trạng thái này KHÔNG BAO GIỜ là đang tải');
});

test('KhongCoCau: nói đúng tên dạng bài đang thiếu', async () => {
  const { default: KhongCoCau } = await napComponent('src/components/grammar/KhongCoCau.jsx');
  const html = veRa(h(KhongCoCau, { ten: 'câu điền từ' }));
  assert.match(html, /chưa có câu điền từ/, 'không nói rõ dạng bài nào thiếu');
  assert.match(html, /lý thuyết vẫn học được/, 'không chỉ ra việc người học vẫn làm được');
  assert.ok(!/[Đđ]ang tải/.test(html), 'còn sót lời "đang tải"');
});

// Chốt cả HỌ lỗi thay vì từng tab một. Tab "Trắc Nghiệm" từng chết trên toàn app
// chỉ vì định nghĩa của nó thiếu khoá `data` — `availableTabs` lọc theo
// `Array.isArray(t.data) && t.data.length > 0`, nên thiếu khoá là tab biến mất
// vĩnh viễn, không lỗi, không cảnh báo. Sáu tab còn lại cùng một dòng cấu trúc:
// bài kiểm này hỏi CẢ BẢY cùng lúc, trên một bài CÓ ĐỦ bảy loại dữ liệu.
test('GrammarPage: bài có ĐỦ 7 dạng bài thì phải hiện ĐỦ 7 tab', async () => {
  const { default: GrammarPage } = await napComponent('src/pages/GrammarPage.jsx');
  const { grammarDataB1 } = await import(goc('src/data/grammarDataB1.js'));
  const KHOA = ['sentenceGame', 'exercises', 'fillBlanks', 'errorCorrection', 'transformation', 'matching', 'trueFalse'];
  const NHAN = ['Xếp Câu', 'Trắc Nghiệm', 'Điền Từ', 'Sửa Lỗi', 'Viết Lại', 'Nối Câu', 'Đúng/Sai'];
  const bai = grammarDataB1.find((t) => KHOA.every((k) => (t[k] || []).length > 0));
  assert.ok(bai, 'không tìm được bài nào có đủ 7 dạng bài để kiểm');
  const html = veRa(h(GrammarPage, { topic: bai, setXp() {}, completeMilestone() {} }));
  for (const nhan of NHAN) {
    assert.ok(html.includes(nhan), `bài "${bai.id}" có đủ dữ liệu mà tab "${nhan}" không hiện`);
  }
});
