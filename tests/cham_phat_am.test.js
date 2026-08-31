// File: tests/cham_phat_am.test.js
//
// GHIM TUYẾN CHẤM PHÁT ÂM (31/08).
//
// ══ VÌ SAO TUYẾN NÀY CẦN GHIM CHẶT HƠN CÁC TUYẾN AI KHÁC ══
// Đây là chế độ ĐẦU TIÊN mô hình thật sự NGHE được tiếng người học, nên nó là
// chỗ dễ nói quá lời nhất trong cả sản phẩm. `npm run kiem:camket` từ trước tới
// nay báo "phát âm KHÔNG chấm được ở bất kỳ mức nào" — nay câu đó đổi, và điều
// PHẢI không đổi là ba ranh giới trung thực:
//
//   1. Bản thu không nghe rõ thì trả `ngheDuoc: false` và KHÔNG có con số.
//      Vẽ 0/100 cho một cái micro hỏng là vu oan cho người học.
//   2. Con số là "mức DỄ NGHE", không phải điểm thi — không nhãn nào được
//      quy đổi sang IELTS/VSTEP.
//   3. Kết quả KHÔNG được ghi vào tiến độ như một điểm đo được.
//
// Và ghim luôn phần máy chủ: trần dung lượng, danh sách định dạng, và chuyện
// chế độ `speaking` (chỉ có chữ) VẪN phải cấm nhận xét phát âm.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRequest, getRequestError } from '../functions/api/ai.js';
import { docKetQuaPhatAm, kieuAmThanh, mucDeNghe } from '../src/utils/chamPhatAm.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = (p) => readFileSync(path.join(ROOT, p), 'utf8');

/** base64 hợp lệ dài đúng n byte. */
const amThanhGia = (byte) => Buffer.alloc(byte, 7).toString('base64');

test('gửi audio hợp lệ thì dựng được yêu cầu có inlineData', () => {
  const parts = buildRequest('pronunciation', {
    audioData: amThanhGia(1024),
    mimeType: 'audio/webm',
    target: 'She sells seashells.',
  });
  assert.equal(parts.length, 2);
  assert.match(parts[0].text, /ĐANG NGHE/);
  assert.match(parts[0].text, /She sells seashells\./, 'câu mẫu phải được đưa vào lời nhắc để AI đối chiếu');
  assert.equal(parts[1].inlineData.mimeType, 'audio/webm');
});

test('lời nhắc BẮT BUỘC chứa ba ranh giới trung thực', () => {
  const [{ text }] = buildRequest('pronunciation', { audioData: amThanhGia(512), mimeType: 'audio/webm' });
  assert.match(text, /ngheDuoc"?:\s*false/i, 'phải dạy mô hình cách báo "không nghe rõ"');
  assert.match(text, /KHÔNG phải điểm thi/i, 'phải nói rõ đây không phải điểm thi');
  assert.match(text, /không được đoán|TUYỆT ĐỐI không đoán/i, 'phải cấm đoán nội dung khi không nghe rõ');
});

test('không có câu mẫu thì lời nhắc phải nói rõ là nói tự do', () => {
  const [{ text }] = buildRequest('pronunciation', { audioData: amThanhGia(512), mimeType: 'audio/webm', topicTitle: 'Du lịch' });
  assert.match(text, /nói tự do/i);
  assert.doesNotMatch(text, /đọc to đúng câu này/i);
});

test('định dạng lạ hoặc thiếu dữ liệu thì từ chối, không gửi đi', () => {
  for (const [mime, vi] of [['image/png', 'ảnh'], ['text/plain', 'chữ'], ['', 'rỗng']]) {
    assert.throws(
      () => buildRequest('pronunciation', { audioData: amThanhGia(256), mimeType: mime }),
      /invalid-audio/,
      `kiểu "${mime}" (${vi}) lẽ ra phải bị chặn`,
    );
  }
  assert.throws(() => buildRequest('pronunciation', { audioData: '', mimeType: 'audio/webm' }), /invalid-audio/);
  // base64 sai khuôn cũng phải chặn — không đẩy rác lên Google bằng key người học.
  assert.throws(() => buildRequest('pronunciation', { audioData: 'khong-phai-base64!!', mimeType: 'audio/webm' }), /invalid-audio/);
});

test('bản thu quá dài bị chặn Ở MÁY CHỦ, không chỉ ở giao diện', () => {
  assert.throws(
    () => buildRequest('pronunciation', { audioData: amThanhGia(3 * 1024 * 1024 + 1), mimeType: 'audio/webm' }),
    /audio-too-large/,
  );
  const [ma, loi] = getRequestError(new Error('audio-too-large'));
  assert.equal(ma, 'audio-too-large');
  assert.match(loi, /2 phút|quá dài/i, 'lời báo phải nói người học cần làm gì, không chỉ "lỗi"');
});

// HAI TRẦN, HAI TẦNG — VÀ THỨ TỰ GIỮA CHÚNG MỚI LÀ ĐIỀU QUAN TRỌNG.
// `buildRequest` chặn theo dung lượng ÂM THANH (3 MB) và trả lời bằng tiếng
// Việt nói rõ phải làm gì. `src/server/routes/ai.js` chặn theo `content-length`
// (TRAN_BYTE 6 MB) và chỉ trả 413 "Dữ liệu gửi lên quá lớn". Nếu base64 của
// trần âm thanh mà VƯỢT TRAN_BYTE thì người học thu đủ hai phút sẽ đụng cái
// trần thứ hai trước — nhận một câu báo cụt lủn thay vì lời hướng dẫn.
test('trần âm thanh phải nằm GỌN trong trần thân yêu cầu của tuyến /api/ai', () => {
  const nguon = doc('functions/api/ai.js');
  const route = doc('src/server/routes/ai.js');
  const mAudio = nguon.match(/MAX_AUDIO_BYTES\s*=\s*(\d+)\s*\*\s*1024\s*\*\s*1024/);
  const mTran = route.match(/TRAN_BYTE\s*=\s*(\d+)\s*\*\s*1024\s*\*\s*1024/);
  assert.ok(mAudio && mTran, 'không đọc được hai trần từ mã nguồn');
  const audio = Number(mAudio[1]) * 1024 * 1024;
  const tran = Number(mTran[1]) * 1024 * 1024;
  const base64 = 4 * Math.ceil(audio / 3);
  assert.ok(base64 < tran,
    `base64 của ${audio / 1048576} MB âm thanh là ${(base64 / 1048576).toFixed(2)} MB, vượt TRAN_BYTE ${tran / 1048576} MB — người học sẽ nhận 413 cụt thay vì lời báo "bản thu quá dài"`);
  // Và phải còn chỗ cho vỏ JSON (mode, mimeType, target, topicTitle).
  assert.ok(tran - base64 >= 1024 * 1024, 'chưa chừa nổi 1 MB cho phần còn lại của thân yêu cầu');
});

test('mọi định dạng trình duyệt thật sự tạo ra đều được nhận', () => {
  for (const mime of ['audio/webm', 'audio/webm;codecs=opus', 'audio/ogg', 'audio/mp4', 'audio/mpeg', 'audio/wav']) {
    assert.doesNotThrow(() => buildRequest('pronunciation', { audioData: amThanhGia(256), mimeType: mime }), `${mime} bị chặn oan`);
  }
});

test('chế độ speaking (chỉ có chữ) VẪN phải cấm nhận xét phát âm', () => {
  const [{ text }] = buildRequest('speaking', { text: 'I go to school every day.' });
  assert.match(text, /KHÔNG nhận xét về phát âm|TUYỆT ĐỐI KHÔNG nhận xét về phát âm/i,
    'thêm chế độ nghe được KHÔNG có nghĩa là nới lệnh cấm ở chế độ chỉ đọc chữ');
});

test('không nghe rõ thì KHÔNG có con số — không vẽ 0/100 cho micro hỏng', () => {
  const r = docKetQuaPhatAm(JSON.stringify({ ngheDuoc: false, deNghe: 0, nhac: 'Micro quá nhiễu.' }));
  assert.equal(r.ngheDuoc, false);
  assert.equal(r.deNghe, null);
  assert.deepEqual(r.can, []);
  assert.equal(mucDeNghe(null).nhan, 'chưa đo được');
});

test('đọc được kết quả bọc trong markdown, và cắt bớt phần thừa', () => {
  const r = docKetQuaPhatAm('```json\n' + JSON.stringify({
    ngheDuoc: true, deNghe: 250, nghe: 'hello world',
    tot: ['a', 'b', 'c', 'd', 'e'],
    can: [1, 2, 3, 4, 5, 6].map((i) => ({ tu: `w${i}`, van: 'v', sua: 's' })),
  }) + '\n```');
  assert.equal(r.deNghe, 100, 'số ngoài thang phải bị kẹp về 0–100');
  assert.equal(r.tot.length, 3);
  assert.equal(r.can.length, 4);
});

test('phản hồi không đọc được thì BÁO LỖI, không trả kết quả rỗng trông như đã chấm', () => {
  assert.throws(() => docKetQuaPhatAm('xin chào, tôi không phải JSON'), /không đọc được/i);
});

test('nhãn mức dễ nghe không được quy đổi sang thang thi cử', () => {
  for (const n of [0, 30, 55, 75, 95]) {
    const { nhan } = mucDeNghe(n);
    assert.doesNotMatch(nhan, /IELTS|VSTEP|TOEIC|band|điểm/i, `nhãn "${nhan}" đang gợi ý một thang thi`);
  }
});

test('kiểu MIME của MediaRecorder được cắt phần codecs', () => {
  assert.equal(kieuAmThanh({ type: 'audio/webm;codecs=opus' }), 'audio/webm');
  assert.equal(kieuAmThanh({ type: '' }), 'audio/webm');
  assert.equal(kieuAmThanh(null), 'audio/webm');
});

test('ghiAm phải trả về CẢ blob — từ blob URL không lấy lại được byte', () => {
  const s = doc('src/utils/ghiAm.js');
  assert.match(s, /return \{ url, blob,/, 'thiếu `blob` thì màn hình chấm phát âm không có gì để gửi');
});

test('giao diện KHÔNG được nói kết quả này là điểm thi hay ghi vào tiến độ', () => {
  const s = doc('src/components/speaking/SpeakingPromptPanel.jsx');
  assert.match(s, /không phải điểm thi/i, 'thiếu câu nói rõ đây không phải điểm thi');
  assert.match(s, /không.{0,40}vào Báo cáo tiến bộ|không.{0,20}được ghi vào Báo cáo tiến bộ/i,
    'thiếu câu nói rõ kết quả không vào Báo cáo tiến bộ');
  // Câu cũ "app này cố ý không dùng [chấm phát âm]" nay đã SAI SỰ THẬT.
  assert.doesNotMatch(s, /không chấm phát âm/i,
    'còn sót câu nói app không chấm phát âm — nay đã có chấm, để lại là nói sai về chính mình');
});
