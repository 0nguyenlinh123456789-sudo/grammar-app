// GHIM TAB "NGHE & ĐỌC" CỦA CỤM NỀN TẢNG A0 (07/09).
//
// Lỗ hổng nó vá, chủ dự án báo bằng đúng câu này: "bảng chữ cái hay ipa chưa
// nghe đọc từ cái đó và chưa có chỗ gemini chấm điểm phát âm". Hai bài A0 đầu
// tiên dạy về ÂM THANH mà không phát ra tiếng nào.
//
// Ba thứ được ghim ở đây, mỗi thứ ứng với một cách hỏng đã biết:
//   1. Không có giọng tiếng Anh thì phải BÁO, không được đọc bằng giọng khác.
//   2. Tab chỉ được hiện khi thật sự có mục đọc được — đúng lỗi 12/12 bài A0
//      hiện tab "Xếp Câu" rỗng mà chú thích ở GrammarPage.jsx ghi lại.
//   3. Ba ranh giới trung thực của `chamPhatAm.js` phải có mặt nguyên chữ.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { foundationData } from '../src/data/foundationData.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const coNghe = foundationData.filter((t) => t.nghe);

test('cụm A0 có ít nhất bài Bảng Chữ Cái nghe được', () => {
  assert.ok(coNghe.some((t) => t.id === 'a0_01'),
    'bài đầu tiên của người mất gốc vẫn là một trang chữ câm');
});

test('mọi bài có `nghe` đều có mục đọc được — không bài nào ra tab rỗng', () => {
  // Bộ lọc tab ở GrammarPage chỉ biết ĐẾM mảng. Một bài `nghe: { muc: [] }`
  // hoặc mục thiếu `doc` sẽ lọt qua bộ lọc rồi dẫn tới panel không đọc được gì
  // — đúng cái bẫy 12/12 bài A0 hiện tab "Xếp Câu" trống.
  for (const t of coNghe) {
    const muc = t.nghe.muc;
    assert.ok(Array.isArray(muc) && muc.length > 0, `${t.id}: nghe.muc rỗng nhưng tab vẫn sẽ hiện`);
    const docDuoc = muc.filter((m) => m && typeof m.doc === 'string' && m.doc.trim());
    assert.equal(docDuoc.length, muc.length, `${t.id}: có mục thiếu \`doc\` — bấm vào là im lặng`);
    for (const m of muc) {
      assert.ok(m.hien && String(m.hien).trim(), `${t.id}: có mục thiếu \`hien\` — không vẽ được nút`);
    }
    const trung = muc.map((m) => m.hien);
    assert.equal(new Set(trung).size, trung.length, `${t.id}: \`hien\` trùng nhau — React key đụng độ`);
  }
});

test('bảng chữ cái đủ 26 chữ và khớp IPA đã dạy ở phần lý thuyết', () => {
  const t = foundationData.find((x) => x.id === 'a0_01');
  assert.equal(t.nghe.muc.length, 26);
  assert.deepEqual(t.nghe.muc.map((m) => m.hien), [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']);

  // Mốc dịch chống trôi: mục II của phần lý thuyết liệt kê ĐÚNG những IPA này.
  // Sửa một bên mà quên bên kia thì người học nghe một đằng, đọc một nẻo.
  const lyThuyet = t.theory.map((s) => s.c).join('\n');
  for (const m of t.nghe.muc) {
    assert.ok(lyThuyet.includes(`${m.hien} ${m.ipa}`),
      `chữ ${m.hien}: IPA "${m.ipa}" ở phần nghe không có trong bảng ở phần lý thuyết`);
  }
});

test('giọng ưa thích khớp accent mà bài đang dạy', () => {
  const t = foundationData.find((x) => x.id === 'a0_01');
  // Bài ghi Z = /zed/ trong danh sách chính, tức là bảng viết theo Anh-Anh.
  // Chọn en-US thì máy đọc "zee" trong khi chữ ghi /zed/.
  assert.equal(t.nghe.giong, 'en-GB');
  assert.equal(t.nghe.muc.find((m) => m.hien === 'Z').ipa, '/zed/');
});

test('không có giọng tiếng Anh thì BÁO, không đọc bằng giọng khác', () => {
  const s = doc('src/utils/docTiengAnh.js');
  // Nhánh này là toàn bộ lý do tệp tồn tại: máy Android bán ở Việt Nam có thể
  // chỉ có giọng vi-VN, và `speak()` vẫn chạy — đọc "book" thành "bốc".
  assert.match(s, /if \(!v\) return \{ ok: false, loi: KHONG_CO_GIONG \};/,
    'bỏ nhánh này là app đọc tiếng Anh bằng bộ máy tiếng Việt mà không ai biết');
  assert.doesNotMatch(s, /u\.voice = null/, 'gán giọng null là rơi về giọng mặc định của hệ thống');
  assert.match(s, /voiceschanged/, 'không chờ voiceschanged thì lần bấm đầu tiên luôn không có giọng');
});

test('panel nghe kèm nhãn giọng máy và nhãn accent', () => {
  const s = doc('src/components/grammar/NghePhatAm.jsx');
  assert.match(s, /MachineVoiceTag/,
    'giọng tổng hợp mà không dán nhãn là thay thế âm thầm — luật đã ghi trong MachineVoiceTag.jsx');
  assert.match(s, /nhanAccent/,
    'không ghi accent thì đúng chữ Z tiếng nghe được mâu thuẫn với chữ đọc được');
});

test('khối chấm phát âm giữ nguyên ba ranh giới trung thực', () => {
  const s = doc('src/components/grammar/NghePhatAm.jsx');
  // Ba ranh giới này được `chamPhatAm.js` nêu đích danh là "không được trôi đi
  // trong các lần sửa sau". Chép nguyên chữ từ SpeakingPromptPanel, không diễn
  // đạt lại — diễn đạt lại là cách chúng trôi.
  assert.match(s, /nhận xét của một mô hình/, 'thiếu câu phân biệt với điểm thi');
  assert.match(s, /không<\/b> được ghi vào Báo cáo tiến bộ/, 'thiếu câu nói rõ không vào tiến độ');
  assert.match(s, /không nghe rõ/, 'thiếu nhánh báo khi mô hình không nghe được bản thu');
  assert.match(s, /!pa\.ngheDuoc/, 'không đọc cờ ngheDuoc thì sẽ vẽ nhận xét bịa');
  // BYOK: không có key thì mời thêm key, không im lặng và không tự gọi.
  assert.match(s, /hasGeminiKey/);
  assert.match(s, /openAiKeySettings/);
});

test('mỗi lượt chấm chỉ gửi một cụm ngắn, không gửi cả bảng', () => {
  const s = doc('src/components/grammar/NghePhatAm.jsx');
  const m = s.match(/TOI_DA_MOI_LUOT = (\d+)/);
  assert.ok(m, 'không còn giới hạn số mục mỗi lượt chấm');
  assert.ok(Number(m[1]) <= 10,
    `gửi ${m[1]} mục trong một bản thu vài giây: mô hình hoặc trả ngheDuoc:false, hoặc bịa nhận xét cho thứ nó không nghe thấy`);
  assert.match(s, /target: goiHienTai\.map/, 'target phải là cụm vừa đọc, không phải cả chủ đề');
});

test('tab Nghe & Đọc chỉ hiện khi có mục đọc được', () => {
  const s = doc('src/pages/GrammarPage.jsx');
  assert.match(s, /id: 'phatam'[^\n]*data: topic\.nghe\?\.muc/,
    'trỏ data vào topic.nghe (cái bọc) thì `nghe: { muc: [] }` vẫn hiện tab rồi dẫn tới panel rỗng');
  assert.match(s, /tab === 'phatam'/, 'khai tab mà không vẽ panel là một tab bấm vào không ra gì');

  // Bộ lọc phải vẫn là phép đếm mảng — nếu ai đó thêm 'phatam' vào danh sách
  // luôn-khả-dụng thì 11 bài A0 không có `nghe` sẽ hiện tab trống.
  const loc = s.slice(s.indexOf('const availableTabs'), s.indexOf('const availableTabs') + 260);
  assert.doesNotMatch(loc, /phatam/, "'phatam' bị đưa vào danh sách luôn-khả-dụng — 11 bài A0 khác sẽ hiện tab rỗng");
});
