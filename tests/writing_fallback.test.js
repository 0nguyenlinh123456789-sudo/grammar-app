// File: tests/writing_fallback.test.js
// ĐƯỜNG VIẾT KHÔNG CẦN KEY (việc 3.4).
//
// Tiêu chí nghiệm thu của việc này là "mọi đề viết dùng được khi không có key".
// Câu đó lượng hoá trên TẬP ĐỀ VIẾT — mà nếu tập rỗng thì bài kiểm luôn xanh và
// chẳng nói lên gì (đúng kiểu MAX_ROUNDS = 5 trong khi đường dài nhất chỉ 4
// vòng, và lần nghiệm thu bản chạy thật thoát ngay vì chuỗi cần tìm vốn đã có
// sẵn). Nên ở đây có BÁNH CÓC: số đề chỉ được tăng, và test tự khẳng định tập
// không rỗng trước khi kiểm mọi thứ khác.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writingPrompts, KIEU_DE } from '../src/data/writingPrompts.js';
import { kiemTraDeViet, scoreWriting } from '../src/utils/writingScorer.js';

const DE_TOI_THIEU = 9; // 3.4 gieo 9 đề; việc 3.3 sẽ làm con số này lớn lên.
const TIEU_CHI_TOI_THIEU = 4;

test('bánh cóc: số đề viết chỉ được tăng, và tập đề KHÔNG rỗng', () => {
  assert.ok(writingPrompts.length > 0, 'tập đề rỗng — mọi bài kiểm dưới đây sẽ xanh giả');
  assert.ok(writingPrompts.length >= DE_TOI_THIEU,
    `còn ${writingPrompts.length} đề, dưới mốc ${DE_TOI_THIEU} đã đạt được`);
});

test('MỌI đề đều dùng được khi KHÔNG có key: đủ bài mẫu, checklist, yêu cầu máy kiểm được', () => {
  const loi = [];
  const ids = new Set();
  for (const p of writingPrompts) {
    if (ids.has(p.id)) loi.push(`${p.id}: id trùng`);
    ids.add(p.id);
    if (!KIEU_DE[p.kieu]) loi.push(`${p.id}: kiểu "${p.kieu}" không có trong KIEU_DE`);
    if (!p.deBai || p.deBai.length < 25) loi.push(`${p.id}: đề bài quá ngắn`);

    // 1. Bài mẫu — thứ thay cho lời nhận xét của AI.
    if (!p.modelAnswer || p.modelAnswer.split(/\s+/).length < 15) loi.push(`${p.id}: thiếu bài mẫu (hoặc quá ngắn)`);
    if (!p.ghiChuBaiMau || p.ghiChuBaiMau.length < 30) loi.push(`${p.id}: bài mẫu không kèm ghi chú CHỈ RA vì sao nó ổn`);

    // 2. Checklist tự soi — phải là câu hỏi trả lời được có/không.
    if (!Array.isArray(p.checklist) || p.checklist.length < TIEU_CHI_TOI_THIEU) {
      loi.push(`${p.id}: cần ít nhất ${TIEU_CHI_TOI_THIEU} tiêu chí tự soi`);
    } else {
      for (const [i, c] of p.checklist.entries()) {
        if (!/\?$/.test(c)) loi.push(`${p.id} tiêu chí ${i + 1}: phải là câu hỏi có/không, kết bằng dấu ?`);
        if (c.length < 25) loi.push(`${p.id} tiêu chí ${i + 1}: quá chung chung`);
      }
    }

    // 3. Yêu cầu MÁY KIỂM ĐƯỢC — phần duy nhất máy được phép khẳng định.
    const yc = p.yeuCau || {};
    if (!yc.soTuToiThieu || !yc.soTuToiDa) loi.push(`${p.id}: thiếu khoảng số từ`);
    else if (yc.soTuToiThieu >= yc.soTuToiDa) loi.push(`${p.id}: khoảng số từ ngược`);
    if (!Array.isArray(yc.tuBatBuoc) || yc.tuBatBuoc.length < 2) loi.push(`${p.id}: cần ít nhất 2 từ/cụm bắt buộc để máy kiểm`);
    if (!yc.moTaTuBatBuoc) loi.push(`${p.id}: yêu cầu máy kiểm phải có lời giải thích cho người học đọc`);
  }
  assert.deepEqual(loi, [], 'đề viết chưa dùng được khi không có key:\n  ' + loi.join('\n  '));
});

// BÀI MẪU PHẢI TỰ QUA ĐƯỢC YÊU CẦU CỦA CHÍNH ĐỀ ĐÓ.
// Không có kiểm tra này thì rất dễ viết một đề đòi 150 từ kèm bài mẫu 90 từ, hay
// đòi cụm "however" mà bài mẫu không có — người học đối chiếu xong sẽ tưởng mình
// sai. Đây cũng là cách rẻ nhất để bắt lỗi gõ trong danh sách từ bắt buộc.
test('bài mẫu của mỗi đề tự thoả yêu cầu của chính đề đó', () => {
  const loi = [];
  for (const p of writingPrompts) {
    const kq = kiemTraDeViet(p.modelAnswer, p);
    if (!kq.doDai.dat) {
      loi.push(`${p.id}: bài mẫu ${kq.doDai.soTu} từ, ngoài khoảng ${kq.doDai.min}–${kq.doDai.max}`);
    }
    if (!kq.tuBatBuoc.dat) {
      loi.push(`${p.id}: bài mẫu THIẾU chính từ bắt buộc của đề: ${kq.tuBatBuoc.conThieu.join(', ')}`);
    }
  }
  assert.deepEqual(loi, [], 'bài mẫu mâu thuẫn với đề:\n  ' + loi.join('\n  '));
});

test('bộ đối chiếu chỉ trả về sự thật kiểm được — KHÔNG có điểm, KHÔNG so với bài mẫu', () => {
  const p = writingPrompts[0];
  const kq = kiemTraDeViet('My name is Nam. I am from Hue. I like reading books every night.', p);

  // Không được có bất cứ trường nào mang dáng dấp điểm số.
  for (const cam of ['score', 'diem', 'percent', 'phanTram', 'similarity', 'giongBaiMau', 'level']) {
    assert.equal(kq[cam], undefined, `kiemTraDeViet không được trả về "${cam}" — bài viết tự do không chấm bằng một con số`);
  }
  assert.equal(kq.laSuThatKiemDuoc, true);
  assert.ok(kq.khongKiemDuoc.includes('ngữ pháp'), 'phải nói thẳng là không kiểm ngữ pháp');

  // Và nó KHÔNG được nhận bài mẫu làm đầu vào để so.
  assert.equal(kiemTraDeViet.length, 2, 'kiemTraDeViet chỉ nhận (text, prompt) — không nhận bài mẫu để so');
});

test('đối chiếu độ dài nói rõ thiếu/thừa bao nhiêu từ, không chỉ "chưa đạt"', () => {
  const p = writingPrompts.find((x) => x.kieu === 'bai');
  const ngan = kiemTraDeViet('Too short.', p);
  assert.equal(ngan.doDai.dat, false);
  assert.equal(ngan.doDai.thieu, p.yeuCau.soTuToiThieu - 2);
  assert.equal(ngan.doDai.thua, 0);

  const dai = kiemTraDeViet(Array(p.yeuCau.soTuToiDa + 10).fill('word').join(' '), p);
  assert.equal(dai.doDai.thua, 10);
  assert.equal(dai.doDai.thieu, 0);
});

test('từ bắt buộc: báo đúng cái nào đã dùng, cái nào còn thiếu', () => {
  const p = writingPrompts.find((x) => x.id === 'w-a2-mo-ta-anh');
  const kq = kiemTraDeViet('I love the park. There is a big tree in the middle of it.', p);
  assert.deepEqual(kq.tuBatBuoc.daDung, ['there is']);
  assert.deepEqual(kq.tuBatBuoc.conThieu, ['because']);
  assert.equal(kq.tuBatBuoc.dat, false);
});

// MỘT LỖI CHỈ ĐƯỢC VÀO NGÂN HÀNG LỖI MỘT LẦN.
// scoreWriting đã ghi lỗi chính tả vào ngân hàng lỗi (thang ôn 3/7/14 ngày).
// Nếu bộ đối chiếu mới ghi thêm lần nữa thì một lỗi bị đếm hai lần và thẻ ôn
// quay lại dày gấp đôi thực tế.
test('kiemTraDeViet KHÔNG ghi vào ngân hàng lỗi (tránh đếm hai lần)', () => {
  const nguon = kiemTraDeViet.toString();
  assert.ok(!/recordError/.test(nguon), 'kiemTraDeViet không được gọi recordError — scoreWriting đã ghi rồi');
  assert.ok(/recordError/.test(scoreWriting.toString()), 'scoreWriting vẫn phải là chỗ ghi lỗi chính tả');
});

test('checklist không phải nhân bản từ một khuôn', () => {
  const tatCa = writingPrompts.flatMap((p) => p.checklist);
  const rieng = new Set(tatCa);
  // Vài tiêu chí trùng nhau giữa các đề là hợp lý; quá nửa trùng thì là khuôn mẫu.
  assert.ok(rieng.size > tatCa.length / 2,
    `${tatCa.length - rieng.size}/${tatCa.length} tiêu chí bị lặp — nghi là nhân từ một khuôn`);
});

test('có đủ cả ba kiểu đề: viết câu, viết đoạn, viết bài', () => {
  const kieu = new Set(writingPrompts.map((p) => p.kieu));
  for (const k of ['cau', 'doan', 'bai']) {
    assert.ok(kieu.has(k), `chưa có đề kiểu "${k}" — lộ trình câu → đoạn → bài bị đứt`);
  }
});
