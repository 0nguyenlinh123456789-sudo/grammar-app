// File: tests/muc_tieu_hoc.test.js
// GHIM MỤC TIÊU HỌC — thứ từng được hỏi ở màn hình đầu tiên rồi vứt đi.
//
// Trước bản này, `getLearningGoal()` có ĐÚNG 0 nơi gọi. Người chọn "Thi VSTEP"
// và người chọn "Giao tiếp" nhận y hệt một lộ trình. Test ở đây ghim bốn thứ,
// và mỗi thứ ứng với một cách hỏng đã thấy thật:
//
//   1. mục tiêu phải có NƠI ĐỌC — không thì lại thành hỏi rồi vứt;
//   2. lọc là một CÁCH NHÌN, KHÔNG được xếp lại thứ tự hay bỏ chặng;
//   3. không làn nào được ẩn mất một KỸ NĂNG (đã dính: làn "Lấy lại gốc" bản
//      đầu ẩn sạch 60 bài nghe);
//   4. mục tiêu IELTS chỉ được mời chọn ở nơi cụm IELTS thật sự hiện ra.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  MUC_TIEU, phucVuMucTieu, demTheoMucTieu, mucTieuChonDuoc, laMucTieuHopLe, luuMucTieu, docMucTieu,
} from '../src/utils/mucTieuHoc.js';
import { roadmapData } from '../src/data/roadmapData.js';

const CHANG = roadmapData.flatMap((b) => b.milestones);

test('mục tiêu học CÓ NƠI ĐỌC — không còn là câu hỏi hỏi rồi vứt', () => {
  const wp = readFileSync('src/pages/WelcomePage.jsx', 'utf8');
  assert.ok(/docMucTieu/.test(wp), 'lộ trình không đọc mục tiêu học — đúng lại cái lỗ vừa vá');
  assert.ok(/phucVuMucTieu/.test(wp), 'lộ trình không dùng mục tiêu để lọc gì cả');
  assert.ok(/BangMucTieu/.test(wp), 'không có băng nào nói cho người học biết mục tiêu đang làm gì');
  assert.ok(/luuMucTieu/.test(wp),
    'không có đường ĐỔI mục tiêu — trình hướng dẫn chỉ chạy một lần, không đổi được là khoá người học lại vĩnh viễn');
});

test('mỗi mục tiêu tự khai VÌ SAO nó chọn những loại chặng đó', () => {
  for (const [id, m] of Object.entries(MUC_TIEU)) {
    assert.ok(Array.isArray(m.loai) && m.loai.length >= 3, `${id}: làn quá hẹp hoặc thiếu danh sách loại`);
    assert.ok(m.viSao && m.viSao.length > 60,
      `${id}: bộ lọc không giải thích mình lọc theo gì thì người học không biết mình đang mất gì`);
    assert.ok(m.nhan, `${id}: thiếu nhãn`);
  }
});

// ══ BẤT BIẾN QUAN TRỌNG NHẤT ═══════════════════════════════════════════════
// Thứ tự các chặng là thứ tự SƯ PHẠM. Đảo nó theo mục tiêu là để cái người học
// MUỐN quyết định cái họ CẦN.
test('lọc theo mục tiêu KHÔNG xếp lại thứ tự và KHÔNG đẻ ra chặng nào', () => {
  for (const goal of Object.keys(MUC_TIEU)) {
    const loc = CHANG.filter((m) => phucVuMucTieu(m, goal));
    const viTri = loc.map((m) => CHANG.indexOf(m));
    const daSapXep = viTri.every((v, i) => i === 0 || v > viTri[i - 1]);
    assert.ok(daSapXep, `${goal}: thứ tự chặng bị đảo sau khi lọc`);
    for (const m of loc) assert.ok(CHANG.includes(m), `${goal}: lọc đẻ ra một chặng không có trong lộ trình`);
  }
});

test('không chọn mục tiêu thì thấy TOÀN BỘ lộ trình, không thiếu chặng nào', () => {
  const d = demTheoMucTieu(CHANG, '');
  assert.equal(d.hop, CHANG.length);
  assert.equal(d.bo, 0);
  // Giá trị rác trong localStorage cũng phải rơi về "không lọc", không được ẩn hết.
  assert.equal(demTheoMucTieu(CHANG, 'khong-co-that').hop, CHANG.length);
});

// ĐÃ DÍNH THẬT: làn "Lấy lại gốc" bản đầu là ['grammar','vstep','dictation'] —
// bật lọc lên là người mất gốc mất sạch 60 bài nghe. Nghe là kỹ năng người Việt
// yếu nhất; ẩn nó đi vì "để sau" là chọn theo cảm giác chứ không theo cái người
// học thiếu.
test('không làn nào ẩn mất một KỸ NĂNG khỏi lộ trình', () => {
  const PHAI_CON = {
    grammar: 'ngữ pháp',
    vstep: 'từ vựng',
    listening: 'nghe',
    // DÍNH LẦN THỨ BA (26/08). Hai làn "Thi VSTEP" và "Thi IELTS" bỏ quên
    // `dictation`. Đó KHÔNG phải 9 chặng lẻ: chép chính tả là TOÀN BỘ phần nghe
    // của bậc A1 và A2 — hai bậc đó có `listening: 0`, phần nghe của chúng nằm
    // hết ở đây. Bảng này thiếu nó nên phép kiểm xanh trong khi lỗ vẫn mở.
    dictation: 'chép chính tả (toàn bộ phần nghe của A1/A2)',
  };
  for (const [goal, m] of Object.entries(MUC_TIEU)) {
    for (const [loai, ten] of Object.entries(PHAI_CON)) {
      assert.ok(m.loai.includes(loai),
        `làn "${m.nhan}" (${goal}) ẩn mất toàn bộ phần ${ten} — không mục tiêu học tiếng Anh nào bỏ được phần đó`);
    }
  }
});

// Bảng PHAI_CON ở trên chỉ chặn việc ẩn mất một kỹ năng ĐÃ KÊ TÊN. Nó không
// bắt được loại chặng mới thêm sau này. Phép kiểm này chặn cả lớp: làn nào ẩn
// HẲN một loại chặng thì lời giải thích phải GỌI TÊN loại đó ra, để người học
// biết mình đang không thấy gì. Ẩn có nói ra là một cách nhìn; ẩn im lặng là
// một lộ trình khác được tráo vào.
test('làn nào ẩn hẳn một loại chặng thì phải nói ra loại đó', () => {
  const TU_CUA_LOAI = {
    oxford: /oxford/i,
    reading: /đọc/i,
    listening: /nghe/i,
    dictation: /chính tả/i,
    vstep: /từ vựng/i,
    grammar: /ngữ pháp/i,
  };
  const xau = [];
  for (const [goal, m] of Object.entries(MUC_TIEU)) {
    const con = new Set(CHANG.filter((x) => phucVuMucTieu(x, goal)).map((x) => x.type));
    const moiLoai = new Set(CHANG.map((x) => x.type));
    for (const loai of moiLoai) {
      if (con.has(loai)) continue;
      const tu = TU_CUA_LOAI[loai];
      assert.ok(tu, `loại chặng "${loai}" chưa có trong bảng từ khoá — thêm vào rồi chạy lại`);
      if (!tu.test(m.viSao)) xau.push(`làn "${m.nhan}" ẩn hẳn loại "${loai}" mà lời giải thích không nhắc tới`);
    }
  }
  assert.deepEqual(xau, [], xau.join(' | '));
});

test('mỗi làn giữ lại ít nhất một nửa lộ trình — lọc không được biến thành cắt', () => {
  for (const [goal, m] of Object.entries(MUC_TIEU)) {
    const d = demTheoMucTieu(CHANG, goal);
    assert.ok(d.hop >= CHANG.length / 2,
      `làn "${m.nhan}" chỉ còn ${d.hop}/${d.tong} chặng — đó không còn là một cách nhìn, đó là một lộ trình khác`);
  }
});

// ══ MỤC TIÊU IELTS ═════════════════════════════════════════════════════════
// Cụm IELTS Nền Tảng bị ẩn trên bản khách (kho media ~8 GB chỉ có trên máy chủ
// dự án). Mời khách chọn "Thi IELTS" ở màn hình đầu tiên rồi không có cụm nào
// để vào là hứa một thứ không có ở đó.
test('mục tiêu IELTS chỉ được mời chọn ở nơi cụm IELTS thật sự hiện ra', () => {
  const coIelts = mucTieuChonDuoc(true).map((m) => m.id);
  const khongIelts = mucTieuChonDuoc(false).map((m) => m.id);
  assert.ok(coIelts.includes('ielts'), 'máy có cụm IELTS mà vẫn không mời chọn mục tiêu đó');
  assert.ok(!khongIelts.includes('ielts'),
    'bản khách KHÔNG có cụm IELTS mà vẫn mời chọn mục tiêu IELTS — chọn xong không có gì để vào');
  assert.ok(khongIelts.length >= 3, 'bản khách còn quá ít mục tiêu để chọn');
});

test('trình hướng dẫn KHÔNG viết cứng danh sách mục tiêu nữa', () => {
  const src = readFileSync('src/components/common/OnboardingWizard.jsx', 'utf8');
  assert.ok(/mucTieuChonDuoc/.test(src),
    'OnboardingWizard viết cứng danh sách mục tiêu — đó là cách nó mời chọn IELTS trên bản không có IELTS');
  assert.ok(/SHOW_IELTS_FOUNDATION/.test(src), 'trình hướng dẫn không hỏi cờ ẩn/hiện cụm IELTS');
});

test('mục tiêu lạ trong localStorage bị bỏ qua, không làm hỏng gì', () => {
  const kho = new Map();
  globalThis.localStorage = {
    getItem: (k) => (kho.has(k) ? kho.get(k) : null),
    setItem: (k, v) => kho.set(k, String(v)),
    removeItem: (k) => kho.delete(k),
  };
  kho.set('learningGoalV1', 'toeic-990');
  assert.equal(docMucTieu(), '', 'giá trị lạ phải rơi về "chưa chọn"');
  assert.equal(luuMucTieu('toeic-990'), false, 'không được lưu một mục tiêu không có thật');
  assert.equal(luuMucTieu('vstep'), true);
  assert.equal(docMucTieu(), 'vstep');
  assert.equal(luuMucTieu(''), true, 'phải bỏ được mục tiêu');
  assert.equal(docMucTieu(), '');
  assert.ok(laMucTieuHopLe('communication'));
});
