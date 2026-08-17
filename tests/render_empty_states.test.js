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
  const bai = grammarDataB1.find((t) => (t.sentenceGame || []).length && (t.fillBlanks || []).length);
  assert.ok(bai, 'không tìm thấy bài ngữ pháp nào có cả sentenceGame và fillBlanks');

  const html = veRa(h(GrammarPage, { topic: bai, setXp() {}, completeMilestone() {} }));
  assert.match(html, /Xếp Câu/, `bài "${bai.id}" CÓ sentenceGame mà tab bị ẩn — bộ lọc ẩn quá tay`);
  assert.match(html, /Điền Từ/, `bài "${bai.id}" CÓ fillBlanks mà tab bị ẩn`);
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
