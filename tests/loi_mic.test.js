// MỌI LỜI BÁO VỀ MICRO ĐỀU PHẢI CHỈ ĐƯỜNG ĐI TIẾP.
//
// ══ LỖ ĐÃ CÓ THẬT ══
// Bản trước viết ba lời báo ngay trong `SpeakingPromptPanel`, và chỉ HAI trong ba
// nói cho người học biết họ vẫn làm tiếp được bằng cách gõ tay. Nhánh còn lại —
// **micro bị từ chối quyền** — chỉ nói đúng "Trình duyệt chưa được cấp quyền dùng
// micro." rồi hết. Mà đó là nhánh gặp NHIỀU NHẤT: ai bấm "Chặn" ở hộp xin quyền,
// hay dùng máy không có micro, đều rơi vào đây. Họ đọc xong rồi tưởng đề này
// không làm được, trong khi ô gõ tay nằm ngay bên dưới.
//
// Tìm ra bằng `npm run hoc:that`, không bằng đọc mã: Chrome headless CÓ khai
// `webkitSpeechRecognition` nên nó đi vào nhánh `onerror` thật, và bộ rà đòi mọi
// lời báo phải chỉ được đường đi tiếp — bước đó đỏ.
//
// Test này canh CẢ NHÁNH KHÔNG AI LƯỜNG TRƯỚC: mã lỗi lạ, mã lỗi rỗng, mã lỗi
// không phải chuỗi. Nhánh "không lường trước" chính là nhánh vừa hỏng — nó rơi
// vào `else` nên không ai nhìn tới.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loiMicThanhChu, DUONG_RA_GO_TAY } from '../src/utils/speakingCheck.js';

// Mọi mã lỗi mà Web Speech API có thể trả về, cộng các trường hợp rác.
const MA = [
  'khong-ho-tro', 'not-allowed', 'service-not-allowed', 'audio-capture',
  'no-speech', 'network', 'aborted', 'language-not-supported', 'bad-grammar',
  'ma-la-chua-tung-thay', '', null, undefined, 0, false, {},
];

test('mọi mã lỗi — kể cả mã lạ và mã rác — đều dẫn tới đường gõ tay', () => {
  for (const ma of MA) {
    const chu = loiMicThanhChu(ma);
    assert.ok(chu.includes(DUONG_RA_GO_TAY),
      `mã "${String(ma)}" ra lời báo KHÔNG chỉ đường đi tiếp: "${chu}"`);
  }
});

test('lời báo nói RÕ chuyện gì xảy ra, không chỉ nói "có lỗi"', () => {
  assert.match(loiMicThanhChu('khong-ho-tro'), /không hỗ trợ nhận dạng giọng nói/);
  assert.match(loiMicThanhChu('not-allowed'), /chưa được cấp quyền dùng micro/);
  // `service-not-allowed` cũng là chuyện quyền, không phải "lỗi không rõ".
  assert.match(loiMicThanhChu('service-not-allowed'), /chưa được cấp quyền dùng micro/);
  assert.match(loiMicThanhChu('network'), /network/);
});

test('mã rỗng thì nói "không rõ" thay vì để trống một khoảng', () => {
  // Để trống thì lời báo thành "Nhận dạng gặp lỗi: ." — đọc như một câu bị cắt
  // giữa, và người học không biết nên làm gì với nó.
  for (const ma of ['', null, undefined]) {
    assert.match(loiMicThanhChu(ma), /Nhận dạng gặp lỗi: không rõ/, `mã "${String(ma)}"`);
  }
});

test('mọi lời báo là một câu hoàn chỉnh, không phải mảnh chuỗi ghép hụt', () => {
  for (const ma of MA) {
    const chu = loiMicThanhChu(ma);
    assert.ok(chu.length > 40, `mã "${String(ma)}": lời báo quá ngắn — "${chu}"`);
    assert.ok(!chu.includes('undefined') && !chu.includes('null'),
      `mã "${String(ma)}": lời báo lọt chữ undefined/null ra mặt người học — "${chu}"`);
    assert.ok(!/\s\s/.test(chu), `mã "${String(ma)}": có khoảng trắng đôi, dấu hiệu ghép chuỗi hụt`);
  }
});

test('SpeakingPromptPanel KHÔNG còn tự viết lời báo micro trong JSX', () => {
  // Lỗ vừa vá sinh ra vì ba lời báo nằm rải trong component: sửa một chỗ thì hai
  // chỗ kia vẫn cũ, và nhánh `else` không ai nhìn tới. Gom về một hàm là điều kiện
  // để test trên phủ được mọi nhánh — nếu ai đó viết chuỗi trực tiếp trở lại thì
  // test ở trên xanh mà app vẫn hỏng.
  const s = fs.readFileSync('src/components/speaking/SpeakingPromptPanel.jsx', 'utf8');
  const soLanGoi = (s.match(/setLoiMic\(/g) || []).length;
  const soLanQuaHam = (s.match(/setLoiMic\(loiMicThanhChu\(/g) || []).length;
  const soLanXoa = (s.match(/setLoiMic\(''\)/g) || []).length;
  assert.equal(soLanGoi, soLanQuaHam + soLanXoa,
    'có chỗ đặt lời báo micro không đi qua loiMicThanhChu — nhánh đó nằm ngoài mọi test ở trên');
});
