// File: tests/curriculum_bac_thang.test.js
// GHIM CÁI MÀ 482 TEST TRƯỚC ĐÓ KHÔNG GHIM: **NỘI DUNG CỦA TỪNG BẬC CÓ ĐỦ ĐỂ
// LÊN BẬC SAU KHÔNG.**
//
// ══ VÌ SAO CẦN MỘT BỘ TEST RIÊNG ══
// Trước đợt audit này, kho có 482 test xanh, lint sạch, build xanh — và bậc A1
// có ĐÚNG 2 chặng ngữ pháp trên tổng 73 chặng. 71 chặng còn lại là danh sách từ
// vựng. Người mất gốc đi hết 134 GIỜ của bậc đầu tiên vẫn không đặt nổi câu
// "I am a student", vì trong toàn bộ 90 chuyên đề ngữ pháp của kho KHÔNG CÓ bài
// nào dạy động từ TO BE.
//
// Không test nào đỏ, vì mọi test đều đo **cấu trúc**: chặng có tồn tại không,
// con số có khớp nhau không, chuỗi có hứa quá không. Không test nào đo **thứ tự
// sư phạm** hay **độ đủ của một bậc**.
//
// Nguyên nhân gốc: bậc của một chuyên đề ngữ pháp quyết định bằng VỊ TRÍ CỦA NÓ
// TRONG MẢNG (`i < 14 ? A2 : B1`). "There is/There are" nằm ở B1 vì nó là mục
// thứ 17 trong file, không vì nó khó.
//
// Bộ test này đo bằng đơn vị NGƯỜI HỌC CHẠM VÀO: bậc này có dạy thứ đó không,
// và có dạy TRƯỚC thứ cần nó không.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { roadmapData, CEFR_OF_BAND } from '../src/data/roadmapData.js';
import { grammarDataA1 } from '../src/data/grammarDataA1.js';

const bac = (l) => roadmapData.find((b) => b.level === l);
const chang = (l) => bac(l).milestones;
const nguPhap = (l) => chang(l).filter((m) => m.type === 'grammar');
const idNguPhap = (l) => nguPhap(l).map((m) => String(m.targetId));

// Vị trí của một chặng trong CẢ lộ trình — đường đi thật của người học.
const duongDi = roadmapData.flatMap((b) => b.milestones).map((m) => String(m.targetId));
const viTri = (id) => duongDi.indexOf(String(id));

// ══ CHỐT TỰ KIỂM ═══════════════════════════════════════════════════════════
test('bộ đo đọc được lộ trình thật', () => {
  assert.ok(duongDi.length > 600, `chỉ đọc được ${duongDi.length} chặng — thước hỏng`);
  assert.ok(viTri('a1_be') >= 0, 'không thấy chặng TO BE — mọi kết luận bên dưới vô nghĩa');
});

// ══ 1. BẬC A1 PHẢI ĐỦ ĐỂ ĐẶT ĐƯỢC MỘT CÂU ══════════════════════════════════
// Danh sách này là mức TỐI THIỂU của A1 theo mô tả CEFR (Cambridge English
// Profile). Thiếu bất kỳ mục nào thì "từ mất gốc" là một lời hứa suông: người
// học có vốn từ nhưng không có cách ghép chúng thành câu.
const A1_BAT_BUOC = [
  ['a1_be', 'động từ TO BE — không có nó thì không có câu nào'],
  ['a1_plural', 'danh từ số nhiều'],
  ['a1_this', 'this / that / these / those'],
  ['b1_20', 'đại từ nhân xưng & sở hữu'],
  ['b1_08', 'mạo từ a/an/the'],
  ['b1_23', 'câu hỏi Wh-'],
  ['b1_17', 'There is / There are'],
  ['b1_01', 'hiện tại đơn'],
  ['b1_12', 'giới từ nơi chốn'],
];

test('bậc A1 dạy đủ ngữ pháp tối thiểu để người mất gốc đặt được câu', () => {
  const co = new Set(idNguPhap('starter'));
  const thieu = A1_BAT_BUOC.filter(([id]) => !co.has(id)).map(([id, ten]) => `${id} — ${ten}`);
  assert.deepEqual(thieu, [],
    'bậc A1 thiếu ngữ pháp nền:\n  ' + thieu.join('\n  ')
    + '\n  (Đây chính là lỗ đã đo được 20/08: A1 có 2 chặng ngữ pháp trên 73 chặng.)');
});

test('bậc A1 không quay lại thành một danh sách từ vựng', () => {
  const ds = chang('starter');
  const soNguPhap = ds.filter((m) => m.type === 'grammar').length;
  assert.ok(soNguPhap >= 10,
    `bậc A1 chỉ còn ${soNguPhap} chặng ngữ pháp trên ${ds.length} chặng — trước đợt audit con số đó là 2`);
});

// ══ 2. THỨ TỰ SƯ PHẠM ══════════════════════════════════════════════════════
// Mọi bài dùng TO BE đều GIẢ ĐỊNH người học đã biết nó. Trước đợt audit, "Hiện
// Tại Tiếp Diễn" (S + am/is/are + V-ing) đứng ở chặng 3 còn TO BE ở chặng 12 —
// người học gặp "I am watching TV" trước khi biết "am" nghĩa là gì.
const PHAI_TRUOC = [
  ['a1_be', 'b1_02', 'TO BE phải trước Hiện Tại Tiếp Diễn (S + am/is/are + V-ing)'],
  ['a1_be', 'b1_17', 'TO BE phải trước There is/There are'],
  ['a1_be', 'b1_01', 'TO BE phải trước Hiện Tại Đơn'],
  ['a1_plural', 'b1_17', 'số nhiều phải trước There ARE'],
  ['a1_plural', 'b1_08', 'số nhiều phải trước mạo từ (a/an dùng với số ít)'],
  ['b1_20', 'b1_21', 'đại từ phải trước Have got (I have / She has)'],
  ['b1_01', 'b1_03', 'hiện tại đơn phải trước bài so sánh đơn vs tiếp diễn'],
  ['b1_04', 'b1_05', 'quá khứ đơn phải trước quá khứ tiếp diễn'],
  ['b1_06', 'b2_02', 'hiện tại hoàn thành phải trước quá khứ hoàn thành'],
];

test('ngữ pháp đi ĐÚNG THỨ TỰ: bài nào cần bài nào thì bài đó phải đứng trước', () => {
  const sai = [];
  for (const [truoc, sau, ly] of PHAI_TRUOC) {
    const a = viTri(truoc); const b = viTri(sau);
    if (a < 0 || b < 0) { sai.push(`${truoc} hoặc ${sau} không có trong lộ trình`); continue; }
    if (a >= b) sai.push(`${truoc} (chặng ${a + 1}) đứng SAU ${sau} (chặng ${b + 1}) — ${ly}`);
  }
  assert.deepEqual(sai, [], 'thứ tự ngữ pháp sai:\n  ' + sai.join('\n  '));
});

// ══ 3. MỖI BẬC ĐỦ SỨC CHUẨN BỊ CHO BẬC SAU ═════════════════════════════════
// Không đo bằng "bậc đó có tồn tại không" mà bằng "bậc đó có đủ MẶT NỘI DUNG
// không". Một bậc chỉ có từ vựng thì không chuẩn bị được cho bậc nào.
test('không bậc nào từ A1 trở lên chỉ có MỘT loại nội dung', () => {
  const mong = [];
  for (const b of roadmapData) {
    if (b.level === 'foundation') continue;   // A0 là cụm phát âm, cố ý một loại
    const loai = new Set(b.milestones.map((m) => m.type));
    if (loai.size < 2) mong.push(`${CEFR_OF_BAND[b.level]}: chỉ có ${[...loai].join(', ')}`);
  }
  assert.deepEqual(mong, [], 'bậc chỉ có một loại nội dung:\n  ' + mong.join('\n  '));
});

// ĐỀ THI PHẢI ĐO THỨ LỘ TRÌNH CÓ DẠY.
// `exam-a1` và `exam-a2` mỗi đề có 6 câu NGHE. Trước đợt audit, hai bậc đó có
// ĐÚNG 0 chặng nghe: 60 bài nghe theo đoạn đều là VOA (nội dung B1+), còn buổi
// chép chính tả thì bị chặn ở bậc B1 chỉ vì dùng chung một biến với bài nghe.
test('bậc nào có đề thi phần NGHE thì bậc đó phải dạy nghe', () => {
  const thieu = [];
  for (const b of roadmapData) {
    if (b.level === 'foundation') continue;
    const coNghe = b.milestones.some((m) => m.type === 'listening' || m.type === 'dictation');
    if (!coNghe) thieu.push(`${CEFR_OF_BAND[b.level]} (${b.level})`);
  }
  assert.deepEqual(thieu, [],
    'bậc sau có bài thi cuối bậc với 6 câu nghe nhưng lộ trình KHÔNG dạy nghe: ' + thieu.join(', '));
});

// ══ 4. BA BÀI A1 SOẠN TAY PHẢI CÒN NGUYÊN HÌNH DẠNG ════════════════════════
test('ba bài A1 soạn tay đủ lý thuyết và đủ bài tập, không phải vỏ rỗng', () => {
  assert.equal(grammarDataA1.length, 3);
  for (const t of grammarDataA1) {
    assert.equal(t.level, 'A1', `${t.id}: bậc phải khai đúng A1`);
    assert.ok(t.theory?.length >= 4, `${t.id}: dưới 4 mục lý thuyết`);
    assert.ok(t.exercises?.length >= 6, `${t.id}: dưới 6 câu trắc nghiệm`);
    assert.ok(t.fillBlanks?.length >= 4, `${t.id}: dưới 4 câu điền chỗ trống`);
    assert.ok(t.errorCorrection?.length >= 4, `${t.id}: dưới 4 câu sửa lỗi`);
    assert.ok(t.sentenceGame?.length >= 5, `${t.id}: dưới 5 câu ghép`);
    for (const e of t.exercises) {
      assert.ok(e.opts?.length >= 4, `${t.id}/${e.id}: dưới 4 lựa chọn`);
      assert.ok(e.opts.includes(e.a), `${t.id}/${e.id}: đáp án không nằm trong lựa chọn`);
      assert.equal(new Set(e.opts).size, e.opts.length, `${t.id}/${e.id}: lựa chọn trùng nhau`);
    }
    for (const c of t.errorCorrection) {
      assert.ok(c.sentence.includes(c.errorWord), `${t.id}: câu sai không chứa chính từ bị đánh dấu sai`);
      assert.ok(c.explanation?.length > 10, `${t.id}: thiếu lời giải thích`);
    }
  }
});

// ══ 5. BẬC KHÔNG ĐƯỢC QUYẾT ĐỊNH BẰNG VỊ TRÍ TRONG MẢNG NỮA ════════════════
test('bộ sinh lộ trình xếp bậc bằng BẢNG SOẠN TAY, không bằng chỉ số mảng', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync('scripts/build_roadmap.mjs', 'utf8');
  assert.ok(/BAC_CUA_CHUYEN_DE/.test(src), 'mất bảng xếp bậc soạn tay');
  assert.ok(!/B1_A2_CUTOFF/.test(src),
    'luật cắt theo chỉ số mảng quay lại — đó chính là thứ đã đẩy "There is/are" xuống B1');
  assert.ok(/thieuBac/.test(src),
    'chuyên đề mới không có tên trong bảng phải làm bộ sinh DỪNG, không được rơi vào một bậc mặc định');
});

// Vế thứ hai của "đề thi phải đo thứ lộ trình có dạy". Vế NGHE đã đóng bằng
// cách mở buổi chép chính tả cho A1/A2. Vế NÓI thì KHÔNG đóng bằng cách bịa đề
// nói cho A1: `COD_DE_NOI` cố ý mở từ B1 vì nói THÀNH BÀI là việc của B1+.
// Nên bậc nào có phần Nói trong đề mà lộ trình không có đề nói theo chủ đề thì
// đề PHẢI chỉ ra người học luyện phần đó ở đâu.
test('đề thi bậc nào không có đề nói theo chủ đề thì phải chỉ ra chỗ luyện', async () => {
  const { bandExams } = await import('../src/data/bandExamBank.js');
  const { COD_DE_NOI } = await import('../src/utils/bandCoDe.js');
  const thieu = [];
  for (const e of bandExams) {
    const b = roadmapData.find((x) => CEFR_OF_BAND[x.level] === e.cefr);
    if (!b || COD_DE_NOI.has(b.level)) continue;   // bậc có đề nói rồi thì không cần
    const de = e.sections.find((s) => s.key === 'speaking')?.de;
    if (!de?.chuanBiODau || de.chuanBiODau.length < 60) {
      thieu.push(`${e.cefr}: đề có phần Nói nhưng lộ trình bậc đó không có đề nói, và đề không nói luyện ở đâu`);
    }
  }
  assert.deepEqual(thieu, [], thieu.join('\n  '));
});

test('màn hình thi HIỆN lời chỉ chỗ luyện, không chỉ cất trong dữ liệu', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync('src/components/exam/BandExamPanel.jsx', 'utf8');
  assert.ok(/chuanBiODau/.test(src),
    'màn hình thi không hiện lời chỉ chỗ luyện — nó sẽ nằm im trong dữ liệu như `level.skills` đã từng');
});
