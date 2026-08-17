// File: tests/writing_bank.test.js
// ĐỀ VIẾT GẮN VỚI TỪNG CHẶNG (việc 3.3) — và ranh giới với đề soạn tay.
//
// Tiêu chí N6 viết là "mỗi chặng A2+ có ≥1 đề viết". Đo ra: 532 chặng từ A2 trở
// lên. Soạn tay 532 đề kèm bài mẫu là không làm nổi; nhân từ khuôn thì đúng là
// thứ cả chuỗi dọn nội dung đang xoá.
//
// Chỗ thoát KHÔNG phải là nới tiêu chí, mà là tách hai lời hứa:
//   - đề SINH theo chặng: máy đóng khung nhiệm vụ quanh danh sách từ SOẠN TAY,
//     KHÔNG có bài mẫu, và nói thẳng là không có;
//   - đề SOẠN TAY: ít, có bài mẫu, có checklist riêng — bánh cóc riêng ở
//     tests/writing_fallback.test.js.
// Vì sao đề viết máy sinh được mà câu hỏi trắc nghiệm thì không: đề viết KHÔNG
// CÓ ĐÁP ÁN ĐỂ BỊA. "Viết một đoạn dùng ít nhất 4 từ sau" là một nhiệm vụ, còn
// "Từ X nghĩa là gì? → B" là một khẳng định máy tự đặt ra rồi tự nhận là đúng.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writingGenerated } from '../src/data/writingGenerated.js';
import { writingPrompts } from '../src/data/writingPrompts.js';
import { deChoChang, deTuChang, CHECKLIST_CHUNG } from '../src/utils/writingBank.js';
import { kiemTraDeViet } from '../src/utils/writingScorer.js';
import { roadmapData } from '../src/data/roadmapData.js';

const BAND_A2_TRO_LEN = ['elementary', 'intermediate', 'upper_intermediate', 'advanced'];
const DE_TOI_THIEU = 531;

test('bánh cóc: số đề theo chặng chỉ được tăng', () => {
  assert.ok(writingGenerated.length >= DE_TOI_THIEU,
    `còn ${writingGenerated.length} đề, dưới mốc ${DE_TOI_THIEU} đã đạt được`);
});

// N6 ĐO LẠI: mọi chặng A2+ có một đề viết GẮN VỚI NỘI DUNG CHẶNG ĐÓ.
// Chỗ nào không có thì phải kê đích danh và có lý do — không được im lặng.
const KHONG_CO_DE = {
  'oxford:elementary:26': 'Unit 26 dạy HẬU TỐ (-ful, -less, -ness…), không phải từ. Không thể bảo người học "dùng từ -ness trong câu".',
  // Ba buổi chép chính tả (N4 b′): mỗi phiên bốc 5 câu RỜI từ kho dùng chung, và
  // câu nào rơi vào phiên nào chỉ biết lúc chạy. Không có chủ đề nào để bảo người
  // học viết về. Độn một đề trống cho đủ số là đúng cái kho khuôn mẫu đã bị xoá.
  'dictation:-:dictation-intermediate': 'buổi chép chính tả không có chủ đề — 5 câu rời bốc lúc chạy',
  'dictation:-:dictation-upper_intermediate': 'buổi chép chính tả không có chủ đề — 5 câu rời bốc lúc chạy',
  'dictation:-:dictation-advanced': 'buổi chép chính tả không có chủ đề — 5 câu rời bốc lúc chạy',
};

test('mọi chặng A2+ đều có đề viết gắn với nội dung chặng — trừ những chặng kê đích danh', () => {
  const thieu = [];
  let tong = 0;
  for (const band of roadmapData) {
    if (!BAND_A2_TRO_LEN.includes(band.level)) continue;
    for (const m of band.milestones) {
      tong += 1;
      const de = deChoChang(m);
      const khoa = `${m.type}:${m.bookId || '-'}:${m.targetId}`;
      const khoaNgan = `${m.type}:${m.bookId || 'elementary'}:${m.targetId}`;
      if (!de && !KHONG_CO_DE[khoa] && !KHONG_CO_DE[khoaNgan]) thieu.push(`${khoa} — ${m.title}`);
    }
  }
  assert.ok(tong > 500, `chỉ đếm được ${tong} chặng A2+ — bộ đọc lộ trình hỏng, mọi kiểm tra dưới đây vô nghĩa`);
  assert.deepEqual(thieu, [], `${thieu.length}/${tong} chặng A2+ chưa có đề viết:\n  ` + thieu.slice(0, 15).join('\n  '));
});

test('đề sinh KHÔNG có bài mẫu, và nói thẳng là không có', () => {
  const de = deTuChang(writingGenerated[0]);
  assert.equal(de.coBaiMau, false, 'đề sinh phải mang cờ coBaiMau: false');
  assert.equal(de.modelAnswer, undefined, 'máy KHÔNG được sinh bài mẫu — đó là nội dung thật, phải người viết');
  assert.equal(de.checklistLaChung, true, 'checklist dùng chung phải tự khai là dùng chung');
});

test('mỗi đề sinh có đủ dữ liệu để chấm khi KHÔNG có key', () => {
  const loi = [];
  const ids = new Set();
  for (const t of writingGenerated) {
    if (ids.has(t.id)) loi.push(`${t.id}: id trùng`);
    ids.add(t.id);
    if (!CHECKLIST_CHUNG[t.kieu]) loi.push(`${t.id}: kiểu "${t.kieu}" không có checklist chung`);
    if (!(t.soTuToiThieu > 0) || !(t.soTuToiDa > t.soTuToiThieu)) loi.push(`${t.id}: khoảng số từ hỏng`);
    if (!t.title) loi.push(`${t.id}: thiếu tên chặng`);
    // Chặng ngữ pháp không có từ mục tiêu — nhưng PHẢI mang cờ nói rõ là máy
    // chỉ đếm được số từ, chứ không lặng lẽ không kiểm gì.
    if (!t.tuMucTieu?.length && !t.chiKiemDuocDoDai) {
      loi.push(`${t.id}: không có từ mục tiêu mà cũng không khai chiKiemDuocDoDai`);
    }
    if (t.tuMucTieu?.length && !(t.soTuPhaiDung >= 1 && t.soTuPhaiDung <= t.tuMucTieu.length)) {
      loi.push(`${t.id}: đòi dùng ${t.soTuPhaiDung} từ trong danh sách chỉ có ${t.tuMucTieu.length}`);
    }
  }
  assert.deepEqual(loi, [], 'đề sinh chưa dùng được khi không có key:\n  ' + loi.slice(0, 20).join('\n  '));
});

// Từ mục tiêu phải là TỪ, không phải mẩu ký hiệu. Bản đầu của bộ sinh lọc bằng
// một biểu thức khớp cả ô nên 24 unit Oxford bị bỏ oan vì ô ghi kiểu
// "sun / rain / wind / cloud"; sửa xong thì phải chắc là tách ra đúng từ chứ
// không phải rác.
test('từ mục tiêu là từ tiếng Anh sạch, không lẫn ký hiệu hay chú thích', () => {
  const ban = [];
  for (const t of writingGenerated) {
    for (const w of t.tuMucTieu || []) {
      if (!/^[a-z][a-z' -]{1,24}$/.test(w)) ban.push(`${t.id}: "${w}"`);
    }
  }
  assert.deepEqual(ban.slice(0, 10), [], 'từ mục tiêu lẫn rác:\n  ' + ban.slice(0, 10).join('\n  '));
});

test('yêu cầu "N trong M từ" chấm đúng: đủ N là đạt, thiếu thì báo còn mấy từ', () => {
  const t = writingGenerated.find((x) => x.tuMucTieu?.length >= 5 && x.soTuPhaiDung >= 3);
  const de = deTuChang(t);
  const [a, b, c] = t.tuMucTieu;

  const thieu = kiemTraDeViet(`I wrote about ${a} today.`, de);
  assert.equal(thieu.tuTuChon.dat, false);
  assert.equal(thieu.tuTuChon.daDung.length, 1);
  assert.equal(thieu.tuTuChon.con, t.soTuPhaiDung - 1);

  const du = kiemTraDeViet(`I wrote about ${a}, ${b} and ${c} today.`, de);
  assert.equal(du.tuTuChon.dat, true, 'dùng đủ số từ yêu cầu thì phải đạt');
  assert.equal(du.tuTuChon.con, 0);
});

test('đề ngữ pháp không có từ mục tiêu thì tuTuChon là null, không phải "đạt" giả', () => {
  const t = writingGenerated.find((x) => x.chiKiemDuocDoDai);
  const kq = kiemTraDeViet('I went to the market yesterday and bought some fruit.', deTuChang(t));
  assert.equal(kq.tuTuChon, null, 'không có yêu cầu từ thì phải là null, không được báo "đạt" như đã kiểm');
  assert.equal(deTuChang(t).chiKiemDuocDoDai, true);
});

// Chặng nào không có đề thì trả null — KHÔNG đưa đề của chặng khác cho có.
// Gán bừa nội dung cho một chặng rồi gọi là "nội dung của chặng này" chính là
// lý do cách đo N4 cũ bị bỏ.
test('chặng không có đề thì trả null, không lấy đề chặng khác thế vào', () => {
  assert.equal(deChoChang({ type: 'oxford', targetId: 26, bookId: 'elementary' }), null);
  assert.equal(deChoChang({ type: 'vstep', targetId: 'khong-ton-tai' }), null);
  assert.equal(deChoChang(null), null);
});

// HAI KHO KHÔNG ĐƯỢC TRỘN. Đề soạn tay hứa có bài mẫu; đề sinh không hứa.
// Trộn chung một mảng là buộc phải nới bài kiểm của kho soạn tay.
test('kho soạn tay và kho sinh tách bạch, không id nào trùng nhau', () => {
  const tay = new Set(writingPrompts.map((p) => p.id));
  const trung = writingGenerated.filter((t) => tay.has(t.id));
  assert.deepEqual(trung, []);
  for (const p of writingPrompts) {
    assert.ok(p.modelAnswer, `${p.id}: đề soạn tay PHẢI có bài mẫu`);
  }
  for (const t of writingGenerated) {
    assert.equal(t.modelAnswer, undefined, `${t.id}: đề sinh KHÔNG được có bài mẫu`);
  }
});
