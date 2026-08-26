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

// ══════════════════════════════════════════════════════════════════════════
// VÒNG KIỂM 2026-08-26 — BỐN GHIM MỚI, MỖI CÁI ỨNG VỚI MỘT LỖ ĐÃ ĐO ĐƯỢC.
// ══════════════════════════════════════════════════════════════════════════

// ĐÃ DÍNH THẬT, VÀ DÍNH HAI LẦN. Đợt trước gỡ nhãn IELTS/TOEIC khỏi `m.exam`
// và khỏi mục `skills` của bậc, rồi tuyên bố "0 nhãn còn lại". Đo lại vòng này:
// còn **68 lời hứa** nằm ở `m.title` và `m.desc` — tức là ngay giữa thẻ chặng,
// chỗ người học ĐỌC, trong khi bản khách không có một đề IELTS/TOEIC nào (cụm
// IELTS Nền Tảng bị ẩn, `mockTestData.js` là đề VSTEP).
//
// Bài học không phải "quét sót một trường". Bài học là: phép kiểm cũ đo NƠI
// TÔI ĐÃ SỬA chứ không đo NƠI NGƯỜI HỌC NHÌN. Ghim này quét mọi chuỗi hiện ra
// trên thẻ chặng.
test('không thẻ chặng nào hứa luyện IELTS/TOEIC — bản khách không có đề nào của hai kỳ thi đó', async () => {
  const xau = [];
  for (const b of roadmapData) {
    for (const m of b.milestones) {
      for (const [truong, gt] of [['title', m.title], ['desc', m.desc]]) {
        if (/IELTS|TOEIC/i.test(String(gt || ''))) {
          xau.push(`${CEFR_OF_BAND[b.level]} ${m.targetId}.${truong}: "${String(gt).slice(0, 100)}"`);
        }
      }
    }
  }
  assert.deepEqual(xau, [],
    `${xau.length} thẻ chặng hứa IELTS/TOEIC:\n  ` + xau.slice(0, 12).join('\n  '));
});

// ĐỀ THI KHÔNG ĐƯỢC ĐO THỨ LỘ TRÌNH KHÔNG DẠY — VẾ THỨ BA.
//
// Vế NGHE đã đóng (mở chép chính tả cho A1/A2). Vế NÓI đã đóng (đề khai chỗ
// luyện). Vế thứ ba đo được ở vòng này: phần ĐỌC của `exam-c1` tự khai là hỏi
// "hàm ý, thái độ và cấu trúc lập luận", và 5/8 câu đúng như vậy — nói giảm,
// mỉa mai, hàm ý trong phần chen, "if anything". Đo kho C1 thì `grammarDataC1C2`
// có 0 lần nhắc tới bốn khái niệm đó; 30 bài đọc VOA là tin tức đưa tin thẳng.
//
// Cách chữa KHÔNG phải bỏ câu hỏi: đọc ra hàm ý CHÍNH LÀ thứ phân biệt B2 với
// C1. Cách chữa là dạy nó — `grammarDataC1Nghia.js`.
test('bậc C1 DẠY thứ đề C1 hỏi: hàm ý, nói giảm, mỉa mai, rào đón', async () => {
  const { grammarDataC1Nghia } = await import('../src/data/grammarDataC1Nghia.js');
  const chuC1 = grammarDataC1Nghia
    .flatMap((t) => (t.theory || []).map((x) => `${x.h} ${x.c}`))
    .join(' ')
    .toLowerCase();

  const PHAI_DAY = [
    ['hàm ý', /hàm ý/],
    ['nói giảm', /nói giảm/],
    ['mỉa mai', /mỉa mai/],
    ['rào đón (hedging)', /rào đón/],
    ['mức trang trọng (register)', /trang trọng/],
    ['nhượng bộ trong lập luận', /nhượng bộ/],
  ];
  const thieu = PHAI_DAY.filter(([, mau]) => !mau.test(chuC1)).map(([ten]) => ten);
  assert.deepEqual(thieu, [], `bậc C1 không dạy: ${thieu.join(', ')} — mà đề exam-c1 vẫn hỏi`);

  // Và hai bài đó phải THẬT SỰ NẰM TRÊN lộ trình C1, không chỉ nằm trong kho.
  const c1 = roadmapData.find((b) => b.level === 'advanced');
  const tren = new Set(c1.milestones.map((m) => String(m.targetId)));
  for (const t of grammarDataC1Nghia) {
    assert.ok(tren.has(t.id), `bài "${t.title}" có trong kho nhưng KHÔNG có chặng nào dẫn tới — người học không bao giờ gặp`);
  }

  // Đủ bộ dạy như mọi bài khác, không phải bài rỗng đặt vào cho đủ danh sách.
  for (const t of grammarDataC1Nghia) {
    assert.ok((t.theory || []).length >= 4, `${t.id}: dưới 4 mục lý thuyết`);
    assert.ok((t.sentenceGame || []).length >= 6, `${t.id}: dưới 6 câu ví dụ`);
    const soCau = (t.exercises || []).length + (t.fillBlanks || []).length
      + (t.errorCorrection || []).length + (t.transformation || []).length
      + (t.matching || []).length + (t.trueFalse || []).length;
    assert.ok(soCau >= 25, `${t.id}: chỉ ${soCau} câu bài tập, các bài C1 khác trung bình 29`);
  }
});

// TÊN TRÊN THẺ CHẶNG KHÔNG ĐƯỢC NÓI SAI VỀ BÀI PHÍA SAU.
//
// Hai kiểu đã dính:
//   1. `b2_03` — thẻ ghi "Câu Bị Động NÂNG CAO" và nằm ở B1, trong khi bài
//      phía sau là bài bị động CƠ BẢN. Người học gặp bài bị động đầu tiên của
//      đời mình dưới nhãn "nâng cao" thì hoặc là sợ, hoặc là bỏ qua.
//   2. Ba bài có PHẦN 2 ở bậc sau (Cụm động từ · Collocations · Thành ngữ)
//      nhưng thẻ bỏ mất chữ "Phần 1" — nhìn vào lộ trình tưởng dạy trùng.
test('thẻ chặng không gắn nhãn "nâng cao" cho bài cơ bản, và không giấu mất phần', async () => {
  const chang = new Map();
  for (const b of roadmapData) for (const m of b.milestones) if (m.type === 'grammar') chang.set(String(m.targetId), m);

  const m03 = chang.get('b2_03');
  assert.ok(m03, 'không còn chặng b2_03');
  assert.ok(!/nâng cao/i.test(m03.title),
    `chặng bị động đầu tiên của lộ trình vẫn mang nhãn "nâng cao": "${m03.title}"`);

  // Bài nào có bản "Part 2"/"Phần 2" ở bậc sau thì thẻ của bản đầu phải nói ra.
  const CO_PHAN_SAU = { b1_26: 'Cụm động từ', c1c2_20: 'Collocations', c1c2_22: 'Thành ngữ' };
  for (const [id, ten] of Object.entries(CO_PHAN_SAU)) {
    const m = chang.get(id);
    assert.ok(m, `không còn chặng ${id}`);
    assert.ok(/phần 1|cơ bản/i.test(m.title),
      `"${ten}" còn có phần sau ở bậc trên, nhưng thẻ "${m.title}" không nói đây là phần đầu — nhìn vào lộ trình sẽ tưởng dạy trùng`);
  }
});

// MỖI THẺ PHẢI TỰ NÓI NÓ DẠY GÌ. Cả 12 chặng A0 từng dùng CHUNG một dòng mô
// tả, và ba chặng ngữ pháp A1 dùng chung dòng "Ngữ pháp · 8 câu bài tập."
// Người mất gốc mở bậc đầu tiên, thấy các thẻ giống hệt nhau, và không trả lời
// được câu "vì sao tôi học cái này" ở bất kỳ thẻ nào.
//
// PHẠM VI: chỉ chặng NGỮ PHÁP và TỪ VỰNG. Với chặng nghe/đọc/chép chính tả,
// tên chặng CHÍNH LÀ tên bài, còn mô tả chỉ báo các con số đo được (loạt bài ·
// số phút · số câu hỏi) — hai bài cùng loạt, cùng độ dài, cùng số câu thì trùng
// mô tả là đúng, và người học vẫn phân biệt được bằng tên. Ép chúng khác nhau
// là ép bịa ra một khác biệt không có thật.
test('không bậc nào có nhiều chặng NGỮ PHÁP / TỪ VỰNG dùng chung một mô tả', async () => {
  const xau = [];
  for (const b of roadmapData) {
    const dem = new Map();
    for (const m of b.milestones) {
      if (m.type !== 'grammar' && m.type !== 'vstep' && m.type !== 'oxford') continue;
      const d = String(m.desc || '').trim();
      if (!d) { xau.push(`${CEFR_OF_BAND[b.level]} ${m.targetId}: không có mô tả`); continue; }
      if (!dem.has(d)) dem.set(d, []);
      dem.get(d).push(String(m.targetId));
    }
    for (const [d, ds] of dem) {
      if (ds.length > 1) xau.push(`${CEFR_OF_BAND[b.level]}: ${ds.length} chặng (${ds.join(', ')}) dùng chung mô tả "${d.slice(0, 70)}…"`);
    }
  }
  assert.deepEqual(xau, [], xau.join('\n  '));
});

// MỘT KHUÔN CÂU VÍ DỤ, ĐỌC Ở MỘT CHỖ.
//
// Kho có hai khuôn `sentenceGame`: 75 bài dùng { text, trans }, 3 bài dùng
// { en, vi }. `SentenceBuilder` chuẩn hoá được cả hai; `AiAssistant` thì lọc
// `s => s.text` nên với ba bài kia mục đọc câu mẫu TẮT LẶNG LẼ — không lỗi,
// không cảnh báo, không test nào đỏ. Nay cả hai màn hình gọi cùng một hàm.
test('mọi bài ngữ pháp đều đưa được câu ví dụ vào cả hai màn hình, dù khuôn nào', async () => {
  const fs = await import('node:fs');
  const { chuanHoaCauMau } = await import('../src/utils/cauMau.js');
  // KHÔNG nạp `grammarData.js`: nó import không đuôi (`./foundationData`), Vite
  // giải được còn node thì không. Nạp thẳng bốn kho bài.
  const kho = [];
  for (const f of ['grammarDataA1.js', 'grammarDataB1.js', 'grammarDataB2.js', 'grammarDataC1C2.js', 'grammarDataC1Nghia.js']) {
    const m = await import(`../src/data/${f}`);
    kho.push(...Object.values(m).filter(Array.isArray).flat());
  }

  // Bản đầu của phép kiểm này chỉ tìm chuỗi `chuanHoaCauMau` trong file — và
  // dòng `import` đã đủ làm nó xanh, kể cả khi thân hàm quay về lọc `s.text`.
  // Nên phải soi ĐÚNG chỗ gán, và soi cả cái khuôn cũ đã gây lỗi.
  for (const f of ['src/components/grammar/AiAssistant.jsx', 'src/components/grammar/SentenceBuilder.jsx']) {
    const src = fs.readFileSync(f, 'utf8');
    assert.ok(/=\s*chuanHoaCauMau\(/.test(src),
      `${f} tự đoán khuôn câu ví dụ thay vì gọi phép chuẩn hoá chung`);
    assert.ok(!/filter\(\s*\(?\s*s\s*\)?\s*=>[^)]*s\.text/.test(src),
      `${f} lọc thẳng theo \`s.text\` — đúng dòng đã làm ba bài khuôn { en, vi } biến mất`);
  }

  const rong = [];
  for (const t of kho) {
    if (!(t.sentenceGame || []).length) continue;   // A0 cố ý không có câu xếp
    if (!chuanHoaCauMau(t.sentenceGame).length) rong.push(`${t.id} (${t.title})`);
  }
  assert.deepEqual(rong, [],
    `${rong.length} bài CÓ câu ví dụ trong kho nhưng phép chuẩn hoá trả về rỗng:\n  ` + rong.join('\n  '));
});
