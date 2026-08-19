// ĐÁP ÁN KHÔNG ĐƯỢC NẰM Ở Ô ĐẦU MỌI CÂU.
//
// ══ LỖI ĐÃ CÓ THẬT, VÀ CÁCH NÓ BỊ TÌM RA ══
// 19/08, bộ `npm run hoc:that` lần đầu LÀM HẾT một bài đọc thay vì chỉ mở ra
// nhìn. Nó bấm bừa ô đầu ở cả bốn câu và được 4/4. Đo lại toàn kho thì ra:
//
//   readingTexts        120/120  đáp án ở ô đầu   (100%)
//   listeningPassages   236/240                    (98,3%)
//   bandExamBank         42/42                     (100%)  ← THI CUỐI BẬC
//   foundationData      144/144                    (100%)  ← bài đầu của A0
//
// 542/546 câu qua sạch bằng cách bấm ô đầu tiên, không đọc, không nghe. Cổng độ
// chính xác 85% dựng lên tháng này vẫn đứng nguyên — nó chỉ gác một cánh cửa mà
// ai cũng đi vòng được.
//
// ══ TEST NÀY CANH Ở ĐÂU, VÀ VÌ SAO KHÔNG CANH DỮ LIỆU ══
// Vá nằm ở chỗ VẼ (utils/tronPhuongAn.js), nên dữ liệu vẫn mãi mãi 100% ở ô
// đầu. Một phép kiểm đọc thẳng dữ liệu sẽ đỏ vĩnh viễn hoặc phải nới thành vô
// nghĩa. Nên canh ở ĐÚNG RANH GIỚI NGƯỜI HỌC NHÌN THẤY:
//   1. bộ trộn có thật sự là phép hoán vị, và ổn định theo khoá;
//   2. cho CHÍNH các kho thật đi qua bộ trộn với ĐÚNG công thức khoá mà từng
//      màn hình dùng → tỉ lệ ô đầu phải về mức ngẫu nhiên;
//   3. thứ tự đã trộn có RA TỚI HTML không (vẽ thật, không đọc mã nguồn);
//   4. màn chấm-theo-chỉ-số phải lấy chữ và lấy chỉ số bấm TỪ CÙNG MỘT BIẾN —
//      đây là lỗi "chấm ngược mà không lỗi nào bắn ra", không sập, không cảnh
//      báo, chỉ là mọi câu đúng thành sai.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createElement as h } from 'react';
import { tronPhuongAn, tronThuTu } from '../src/utils/tronPhuongAn.js';
import { napComponent, veRa, camGlobalTrinhDuyet } from './helpers/render.mjs';

camGlobalTrinhDuyet();

// ── 1. Bộ trộn có đúng là phép hoán vị không ────────────────────────────────
test('tronPhuongAn giữ nguyên tập phương án, chỉ đổi thứ tự', () => {
  const goc = ['một', 'hai', 'ba', 'bốn'];
  const moi = tronPhuongAn('k1', goc);
  assert.equal(moi.length, goc.length);
  assert.deepEqual([...moi].sort(), [...goc].sort());
  assert.deepEqual(goc, ['một', 'hai', 'ba', 'bốn'], 'không được sửa mảng gốc');
});

test('cùng khoá ra cùng thứ tự, khác khoá thì khác — thứ tự không nhảy giữa hai lần vẽ', () => {
  const goc = ['a', 'b', 'c', 'd'];
  assert.deepEqual(tronPhuongAn('voa-doc-1:0', goc), tronPhuongAn('voa-doc-1:0', goc));
  const khac = new Set(Array.from({ length: 24 }, (_, i) => tronPhuongAn(`k${i}`, goc).join('')));
  assert.ok(khac.size >= 4, `24 khoá khác nhau chỉ ra ${khac.size} thứ tự — bộ trộn gần như không trộn`);
});

test('tronThuTu trả về hoán vị của 0..n-1, và giữ nguyên khi có dưới 2 phương án', () => {
  assert.deepEqual([...tronThuTu('x', 4)].sort(), [0, 1, 2, 3]);
  assert.deepEqual(tronThuTu('x', 1), [0]);
  assert.deepEqual(tronThuTu('x', 0), []);
});

// ── 2. Cho KHO THẬT đi qua bộ trộn, đúng công thức khoá của từng màn hình ───
// % ô đầu tối đa. Ngẫu nhiên đều là 25–33%; ĐO THẬT sau khi vá: đọc dài 27,5%,
// nghe 29,6%, thi cuối bậc 26,2%, A0 27,1%. Đặt 40 chứ không đặt 50: ở 50 thì
// một nửa kho có thể tụt ngược về ô đầu mà test vẫn xanh — đúng kiểu mốc
// `DE_TOI_THIEU` đứng yên ở 531 trong khi kho đã lên 621, canh mà không canh gì.
const NGUONG = 40;

const phanBoODau = (viTri) => {
  const dau = viTri.filter((i) => i === 0).length;
  return { tong: viTri.length, phanTram: Math.round((dau / viTri.length) * 100) };
};

test('bài đọc dài: sau khi trộn, đáp án không còn dồn về ô đầu', async () => {
  const { readingTexts } = await import('../src/data/readingTexts.js');
  const viTri = readingTexts.flatMap((bai) => (bai.questions || []).map((cau, idx) =>
    // ĐÚNG công thức khoá mà ReadingLongPanel dùng: `${bai.id}:${idx}`.
    tronPhuongAn(`${bai.id}:${idx}`, cau.opts).indexOf(cau.a)));
  const r = phanBoODau(viTri);
  assert.ok(r.tong >= 120, `chỉ đọc được ${r.tong} câu`);
  assert.ok(r.phanTram <= NGUONG, `${r.phanTram}% số câu vẫn có đáp án ở ô đầu (tối đa ${NGUONG}%)`);
});

test('bài nghe theo đoạn: sau khi trộn, đáp án không còn dồn về ô đầu', async () => {
  const { listeningPassages } = await import('../src/data/listeningPassages.js');
  const viTri = listeningPassages.flatMap((bai) => (bai.questions || []).map((cau, idx) =>
    tronPhuongAn(`${bai.id}:${idx}`, cau.opts).indexOf(cau.a)));
  const r = phanBoODau(viTri);
  assert.ok(r.tong >= 240, `chỉ đọc được ${r.tong} câu`);
  assert.ok(r.phanTram <= NGUONG, `${r.phanTram}% số câu vẫn có đáp án ở ô đầu (tối đa ${NGUONG}%)`);
});

test('THI CUỐI BẬC: sau khi trộn, đáp án không còn dồn về ô đầu', async () => {
  const { bandExams } = await import('../src/data/bandExamBank.js');
  const items = bandExams.flatMap((e) => e.sections.flatMap((s) => s.items || []))
    .filter((it) => Array.isArray(it.options) && typeof it.answer === 'number');
  // BandExamPanel khoá theo `it.id` và báo về CHỈ SỐ GỐC, nên vị trí hiện ra của
  // đáp án là chỗ đứng của `answer` trong thứ tự đã trộn.
  const viTri = items.map((it) => tronThuTu(it.id, it.options.length).indexOf(it.answer));
  const r = phanBoODau(viTri);
  assert.ok(r.tong >= 42, `chỉ đọc được ${r.tong} câu`);
  assert.ok(r.phanTram <= NGUONG, `${r.phanTram}% số câu vẫn có đáp án ở ô đầu (tối đa ${NGUONG}%)`);
});

test('bài A0 (mất gốc): sau khi trộn, đáp án không còn dồn về ô đầu', async () => {
  const { foundationData } = await import('../src/data/foundationData.js');
  const viTri = foundationData.flatMap((t) => [...(t.exercises || []), ...(t.quiz || [])])
    .filter((c) => Array.isArray(c.opts))
    // ĐÚNG công thức khoá mà QuizEngine dùng: `${curr.q}:${qIdx}`.
    .map((c, i) => tronPhuongAn(`${c.q}:${i}`, c.opts).indexOf(c.a));
  const r = phanBoODau(viTri);
  assert.ok(r.tong >= 144, `chỉ đọc được ${r.tong} câu`);
  assert.ok(r.phanTram <= NGUONG, `${r.phanTram}% số câu vẫn có đáp án ở ô đầu (tối đa ${NGUONG}%)`);
});

// ── 3. Thứ tự đã trộn có RA TỚI HTML không ──────────────────────────────────
// Bước 2 chứng minh bộ TRỘN đúng; nó KHÔNG chứng minh MÀN HÌNH có gọi bộ trộn.
// Một component quên gọi vẫn để cả bốn test trên xanh. Nên phải soi HTML, và
// phải soi ĐỦ BA màn hình đã vá — bản đầu của file này chỉ soi bài đọc dài, tức
// ba chỗ còn lại chỉ được bảo đảm gián tiếp qua bộ trộn.
// (Chỗ thứ tư — thi cuối bậc — chấm theo chỉ số nên canh riêng ở mục 4.)
const soiThuTuTrongHtml = (nhan, html, phuongAn) => {
  const viTri = phuongAn.map((o) => html.indexOf(o));
  assert.ok(viTri.every((v) => v >= 0), `${nhan}: không thấy đủ phương án trong HTML — test đo nhầm chỗ`);
  const theoHtml = [...phuongAn].sort((a, b) => html.indexOf(a) - html.indexOf(b));
  assert.notDeepEqual(theoHtml, phuongAn,
    `${nhan}: HTML vẫn xếp phương án y thứ tự dữ liệu → màn hình chưa gọi bộ trộn`);
};

test('bài đọc dài: thứ tự phương án trong HTML khác thứ tự trong dữ liệu', async () => {
  const { readingTexts } = await import('../src/data/readingTexts.js');
  const { default: Panel } = await napComponent('src/components/reading/ReadingLongPanel.jsx');
  // Mở thẳng một bài để panel vẽ luôn phần câu hỏi.
  const bai = readingTexts[0];
  const html = veRa(h(Panel, { moBaiId: bai.id, onClose() {} }));
  soiThuTuTrongHtml('bài đọc dài', html, bai.questions[0].opts);
});

test('bài nghe theo đoạn: thứ tự phương án trong HTML khác thứ tự trong dữ liệu', async () => {
  const { listeningPassages } = await import('../src/data/listeningPassages.js');
  const { default: Panel } = await napComponent('src/components/listening/ListeningPassagePanel.jsx');
  const bai = listeningPassages[0];
  const html = veRa(h(Panel, { moBaiId: bai.id, onClose() {} }));
  soiThuTuTrongHtml('bài nghe', html, bai.questions[0].opts);
});

test('bài A0 (mất gốc): thứ tự phương án trong HTML khác thứ tự trong dữ liệu', async () => {
  const { foundationData } = await import('../src/data/foundationData.js');
  const { default: QuizEngine } = await napComponent('src/components/grammar/QuizEngine.jsx');
  // Bài A0 là kho dính lỗi nặng nhất về số câu (144/144) và cũng là bài ĐẦU TIÊN
  // người mất gốc làm — chỗ đáng soi bằng mắt nhất trong cả bốn.
  const bai = foundationData.find((t) => (t.exercises || []).some((c) => Array.isArray(c.opts)));
  const cau = bai.exercises.find((c) => Array.isArray(c.opts));
  const html = veRa(h(QuizEngine, { exercises: bai.exercises }));
  soiThuTuTrongHtml('bài A0', html, cau.opts);
});

// ── 4. Màn chấm-THEO-CHỈ-SỐ: chữ và chỉ số bấm phải từ CÙNG MỘT BIẾN ────────
// Đây là lỗi im lặng nhất trong cả đợt này: trộn chữ mà quên ánh xạ chỉ số thì
// không sập, không cảnh báo, chỉ là mọi câu đúng bị chấm thành sai. Không có
// cách nào soi ra từ HTML tĩnh (onClick không nằm trong HTML), nên canh ở mã.
test('BandExamPanel: chỉ số gửi đi khi bấm lấy từ đúng biến dùng để lấy chữ', () => {
  const s = fs.readFileSync('src/components/exam/BandExamPanel.jsx', 'utf8');
  const m = s.match(/\{thuTu\.map\(\((\w+)\)[\s\S]{0,400}?<\/button>\)\}/);
  assert.ok(m, 'không còn vẽ phương án qua `thuTu.map` — thi cuối bậc đã bỏ trộn?');
  const bien = m[1];
  const khoi = m[0];
  assert.ok(khoi.includes(`onChon(${bien})`),
    `bấm phương án phải gửi đi \`${bien}\` (chỉ số GỐC), nếu không bài thi chấm ngược`);
  assert.ok(khoi.includes(`it.options[${bien}]`),
    `chữ hiện ra phải lấy bằng \`it.options[${bien}]\` — cùng biến với chỉ số gửi đi`);
});
