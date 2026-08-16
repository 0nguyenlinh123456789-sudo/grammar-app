// File: tests/listening_passages.test.js
// BÀI NGHE THEO ĐOẠN (việc 2.2) — ghim chất lượng câu hỏi SOẠN TAY.
//
// Câu hỏi hiểu ý là chỗ dễ trượt nhất về phía nội dung máy-sinh: nhân một khuôn
// mẫu ("Từ X nghĩa là gì?") lên cho mọi từ thì có ngay hàng trăm câu hỏi trông
// như thật. Cả chuỗi dọn nội dung đã xoá đúng loại đó đi. Nên test này kiểm hai
// thứ mà nội dung khuôn mẫu không qua nổi:
//   - đáp án phải CÓ THẬT trong bản chép lời (không hỏi thứ ngoài bài),
//   - phần giải thích phải dẫn được về bài, và các câu hỏi không được lặp khuôn.
//
// Và bài học từ lần trước: SO SÁNH PHÂN BIỆT HOA THƯỜNG. Bộ kiểm cũ của tôi hạ
// hết về chữ thường rồi so, làm các câu hỏi VỀ VIỆC VIẾT HOA bị báo đỏ oan.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listeningPassages } from '../src/data/listeningPassages.js';
import { coTheDung, kiemTraBanGhi } from '../src/utils/audioLicense.js';
import { laDongNgoaiBanThu } from '../src/utils/transcriptClean.js';
import { LOAI_TRU } from '../scripts/data/voa_loai_tru.mjs';
import { CAU_HOI } from '../scripts/data/voa_questions.mjs';

// BÁNH CÓC — số bài nghe chỉ được tăng.
// 6 → 16 → 32 → 48 → 60. ĐẠT MỐC của việc 2.2. Kho ứng viên còn 49 bài dùng
// được chưa soạn câu hỏi (56 bài chưa dùng, trừ 7 bài trong danh sách loại trừ).
//
// LÝ DO LOẠI TỪNG BÀI nay nằm ở scripts/data/voa_loai_tru.mjs — MÁY ĐỌC ĐƯỢC,
// không phải chú thích như trước. Chú thích không chặn được gì: bước chọn bài
// chỉ lọc theo "đã có câu hỏi hay chưa", nên ai soạn câu hỏi cho một bài đã bị
// loại là nó lên thẳng bản chạy thật.
// (voa-7920108 "How to Summon Others" TỪNG bị loại vì "bản chép lời thủng lỗ".
//  Chẩn đoán đó SAI: ví dụ vẫn nằm trong thẻ <p>, chỉ là bộ lọc độ dài của
//  chính tôi vứt đi. Bỏ bộ lọc độ dài thì bài nguyên vẹn — nay chỉ còn thiếu
//  câu hỏi soạn tay.)
const BAI_TOI_THIEU = 60;
const CAU_HOI_MOI_BAI = 4;

test('bánh cóc: số bài nghe theo đoạn chỉ được tăng', () => {
  assert.ok(listeningPassages.length >= BAI_TOI_THIEU,
    `còn ${listeningPassages.length} bài, dưới mốc ${BAI_TOI_THIEU} đã đạt được`);
});

// DANH SÁCH LOẠI TRỪ PHẢI CÓ HIỆU LỰC THẬT.
// Trước đây lý do loại chỉ là chú thích trong file này — không chặn được gì.
// Test này chặn ở hai chỗ: bài bị loại không được có mặt trong kho ĐÃ PHÁT
// HÀNH, và cũng không được có câu hỏi soạn tay (soạn rồi thì công mất mà bộ
// dựng vẫn báo lỗi — thà báo ngay ở đây).
test('không bài nào trong danh sách loại trừ lọt vào kho', () => {
  const loi = [];
  for (const id of Object.keys(LOAI_TRU)) {
    if (listeningPassages.some((b) => b.id === id)) loi.push(`${id} ĐÃ PHÁT HÀNH dù bị loại: ${LOAI_TRU[id]}`);
    if (CAU_HOI[id]) loi.push(`${id} có câu hỏi soạn tay dù bị loại: ${LOAI_TRU[id]}`);
  }
  assert.deepEqual(loi, [], 'bài bị loại vẫn lọt vào:\n  ' + loi.join('\n  '));
});

test('mỗi bài có đủ hồ sơ giấy phép, và giấy phép phải dùng được', () => {
  const loi = [];
  const ids = new Set();
  for (const b of listeningPassages) {
    if (ids.has(b.id)) loi.push(`${b.id}: id trùng`);
    ids.add(b.id);
    if (!coTheDung(b.license)) loi.push(`${b.id}: giấy phép "${b.license}" không dùng được`);
    // Dùng chung bộ kiểm hồ sơ với kho bản thu, chỉ khác là bài nghe không có
    // file trong kho mà trỏ tới máy chủ VOA.
    const gia = { ...b, file: 'x.mp3', text: b.title };
    for (const l of kiemTraBanGhi(gia)) loi.push(`${b.id}: ${l}`);
    if (!/^https:\/\//.test(b.audioUrl || '')) loi.push(`${b.id}: audioUrl phải là https`);
    if (!/^https:\/\/learningenglish\.voanews\.com\//.test(b.sourceUrl || '')) loi.push(`${b.id}: sourceUrl không trỏ về trang gốc`);
  }
  assert.deepEqual(loi, [], 'hồ sơ bài nghe hỏng:\n  ' + loi.join('\n  '));
});

test('mỗi bài đủ số câu hỏi, đáp án nằm trong lựa chọn, lựa chọn không trùng', () => {
  const loi = [];
  for (const b of listeningPassages) {
    if (b.questions.length < CAU_HOI_MOI_BAI) loi.push(`${b.id}: chỉ có ${b.questions.length} câu hỏi`);
    for (const [i, q] of b.questions.entries()) {
      const nhan = `${b.id} câu ${i + 1}`;
      if (!q.q || q.q.length < 10) loi.push(`${nhan}: đề bài quá ngắn`);
      if (!Array.isArray(q.opts) || q.opts.length < 3) loi.push(`${nhan}: cần ít nhất 3 lựa chọn`);
      else {
        // So sánh PHÂN BIỆT hoa thường — hai lựa chọn khác nhau ở chữ hoa là
        // hai lựa chọn khác nhau.
        if (new Set(q.opts).size !== q.opts.length) loi.push(`${nhan}: có hai lựa chọn trùng nhau → hai đáp án đúng`);
        if (!q.opts.includes(q.a)) loi.push(`${nhan}: đáp án không nằm trong danh sách lựa chọn`);
      }
      if (!q.why || q.why.length < 20) loi.push(`${nhan}: thiếu phần dẫn lại nội dung bài`);
    }
  }
  assert.deepEqual(loi, [], 'câu hỏi hỏng:\n  ' + loi.join('\n  '));
});

test('câu hỏi phải HỎI VỀ BÀI: phần giải thích dẫn được về bản chép lời', () => {
  const chuan = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const loi = [];
  for (const b of listeningPassages) {
    const than = chuan(b.transcript.join(' '));
    for (const [i, q] of b.questions.entries()) {
      // Phần "why" trích dẫn bài; lấy cụm tiếng Anh dài nhất trong đó rồi tìm
      // trong bản chép lời. Không tìm thấy nghĩa là đang giải thích một thứ
      // không có trong bài.
      const trich = (q.why.match(/[A-Za-z][A-Za-z' ,]{25,}/g) || [])
        .map(chuan).filter((x) => x.split(' ').length >= 5)
        .sort((a, c) => c.length - a.length)[0];
      if (!trich) { loi.push(`${b.id} câu ${i + 1}: phần giải thích không trích được câu nào từ bài`); continue; }
      if (!than.includes(trich)) loi.push(`${b.id} câu ${i + 1}: trích dẫn "${trich.slice(0, 40)}…" KHÔNG có trong bản chép lời`);
    }
  }
  assert.deepEqual(loi, [], 'câu hỏi không bám vào bài:\n  ' + loi.join('\n  '));
});

test('câu hỏi KHÔNG lặp khuôn mẫu — dấu hiệu của nội dung máy sinh', () => {
  const tatCa = listeningPassages.flatMap((b) => b.questions.map((q) => q.q));
  assert.equal(new Set(tatCa).size, tatCa.length, 'có hai câu hỏi giống hệt nhau');

  // Nếu quá nửa số câu hỏi mở đầu bằng cùng một cụm 3 từ thì gần như chắc chắn
  // chúng được nhân ra từ một khuôn.
  const dem = {};
  for (const q of tatCa) {
    const dau = q.split(/\s+/).slice(0, 3).join(' ').toLowerCase();
    dem[dau] = (dem[dau] || 0) + 1;
  }
  const nhieuNhat = Math.max(...Object.values(dem));
  assert.ok(nhieuNhat <= tatCa.length / 2,
    `${nhieuNhat}/${tatCa.length} câu hỏi mở đầu giống hệt nhau — nghi là sinh từ khuôn mẫu`);
});

// BẢN CHÉP LỜI PHẢI KHỚP VỚI BẢN THU, KHÔNG PHẢI KHỚP VỚI TRANG WEB.
// Luật dùng chung với bộ dựng dữ liệu — trước đây mỗi bên giữ một bản chép
// tay và chúng đã lệch nhau (`.{1,20}` với `.{1,25}`), làm lọt dòng giải nghĩa
// "present perfect tense – n. …" dài 21 ký tự.
test('bản chép lời không lẫn dòng chỉ có trên trang web', () => {
  const loi = [];
  for (const b of listeningPassages) {
    for (const p of b.transcript) {
      if (laDongNgoaiBanThu(p)) loi.push(`${b.id}: còn dòng ngoài bản thu — “${p.slice(0, 60)}…”`);
    }
    assert.ok(b.transcript.length >= 5, `${b.id}: bản chép lời quá ngắn (${b.transcript.length} đoạn)`);
    assert.ok(b.words >= 200, `${b.id}: chỉ ${b.words} từ — quá ngắn cho một bài nghe theo đoạn`);
  }
  assert.deepEqual(loi, [], loi.join('\n  '));
});

// LỖ THỦNG, KIỂM TRÊN DỮ LIỆU ĐÃ PHÁT HÀNH — không cần mạng.
// Lý do 12 bài thủng lọt lên tận bản chạy thật: bộ dò lỗ chỉ chạy LÚC THU THẬP,
// nên dữ liệu đã nằm trong kho thì không ai soi lại. scripts/audit_transcript_
// holes.mjs soi lại được nhưng phải nhớ mà chạy tay. Bài kiểm này bắt cùng loại
// lỗi ngay trong npm test: một câu dẫn kết thúc bằng dấu hai chấm mà sau nó
// không còn gì, hoặc đoạn sau cũng là một câu dẫn, nghĩa là ví dụ ở giữa đã mất.
test('không bài nào có câu dẫn bỏ lửng — ví dụ phải còn nguyên', () => {
  const loi = [];
  for (const b of listeningPassages) {
    b.transcript.forEach((p, i) => {
      if (!/:\s*$/.test(p)) return;
      const sau = b.transcript[i + 1];
      if (!sau) loi.push(`${b.id}: “${p.slice(-45)}” là đoạn CUỐI — ví dụ đi sau đã mất`);
      else if (/:\s*$/.test(sau)) loi.push(`${b.id}: “${p.slice(-45)}” rồi lại một câu dẫn nữa — ví dụ ở giữa đã mất`);
    });
  }
  assert.deepEqual(loi, [], 'bản chép lời thủng lỗ:\n  ' + loi.join('\n  '));
});
