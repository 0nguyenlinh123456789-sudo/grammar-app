// SỨC CHỨA CỦA WEB BỊ QUYẾT ĐỊNH BỞI MỘT CON SỐ, VÀ NÓ KHÔNG PHẢI KÍCH THƯỚC BUNDLE.
//
// ══ ĐO ĐƯỢC NGÀY 19/08 ══
// Tải trang lần đầu chỉ **169 KB nén / 5 file** — khoảng 0,9 giây ở 3G. Không có
// vấn đề "giật lag" ở phía trình duyệt, và tối ưu thêm ở đó gần như vô ích.
//
// Thứ thật sự hết trước là **hạn mức Redis**. Mỗi lượt tự kiểm quyền gọi
// `/api/access`, và `requireLearner` ĐỌC REDIS mỗi lần (src/server/accessCore.js
// — nó phải đọc, vì chữ ký phiên không biết mã có bị khoá hay đổi `version` hay
// chưa). Gói Upstash miễn phí cho 500.000 lệnh/THÁNG.
//
// ══ VÌ SAO HAI PHÉP CANH DƯỚI ĐÂY ĐÁNG CÓ ══
// Bản cũ: nhịp 5 phút, và vòng lặp chạy CẢ KHI TAB BỊ ẨN. Một tab để quên 8
// tiếng đốt ~96 lệnh/ngày cho một người KHÔNG hề đang học — gần 2.900 lệnh/tháng,
// tức chỉ ~170 người như vậy là hết sạch hạn mức của cả web.
//
// Sau khi bỏ qua lúc tab ẩn và giãn lên 15 phút (tính cho một người học):
//
//   kịch bản                              CŨ        MỚI
//   học 30 phút rồi ĐÓNG tab            1851 ng   3333 ng    ×1,8
//   học 1 tiếng, để tab nền 8 tiếng      168 ng   2380 ng   ×14,2
//   mở tab nhìn liên tục 8 tiếng         168 ng    476 ng    ×2,8
//
// Hai dòng mã này đáng giá gấp 14 lần sức chứa ở đúng kịch bản thường gặp nhất
// (người ta mở tab rồi đi làm việc khác). Nên chúng cần được canh, không thì một
// lần "dọn dẹp" vô tình sẽ trả web về 170 người mà chẳng ai thấy — cho tới lúc
// Upstash ngắt giữa tháng.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const NGUON = fs.readFileSync('src/components/access/AccessGate.jsx', 'utf8');

test('nhịp tự kiểm quyền không được rút ngắn mà không tính lại sức chứa', () => {
  // ĐỌC NGUỒN chứ không `import`: AccessGate.jsx có JSX nên `node --test` không
  // nhập thẳng được. Nói thẳng ra thay vì bọc import trong try/catch rồi bỏ qua
  // âm thầm — một phép kiểm không chạy vẫn hiện màu xanh, và đó là loại test tệ
  // nhất. Đổi lại, hằng số phải giữ đúng hình `N * 60 * 1000` để dò được, và
  // dòng assert đầu tiên đỏ ngay nếu ai viết khác đi.
  const soTuNguon = /export const KIEM_LAI_MS = (\d+) \* 60 \* 1000;/.exec(NGUON);
  assert.ok(soTuNguon, 'không tìm thấy hằng KIEM_LAI_MS — nhịp tự kiểm đã bị viết lại kiểu khác');
  const phut = Number(soTuNguon[1]);
  assert.ok(phut >= 15,
    `nhịp tự kiểm rút xuống ${phut} phút. Mỗi lượt là 1 lệnh Redis; ở 5 phút thì `
    + 'một tab mở 8 tiếng đốt ~2.900 lệnh/tháng và web chỉ nuôi nổi ~170 người. '
    + 'Muốn giảm thì phải tính lại sức chứa trước, và sửa cả bảng ở đầu file này.');
  assert.match(NGUON, /}, KIEM_LAI_MS\)/, 'hằng số có đó nhưng vòng lặp không dùng nó');
});

test('vòng tự kiểm BỎ QUA khi tab đang ẩn', () => {
  // Đây là nửa quan trọng hơn của bản vá (×14,2 so với ×2,8), và nó dễ bị xoá
  // nhất vì nhìn như một dòng thừa: `onVisible` ngay bên dưới đã kiểm khi quay
  // lại tab, nên thứ duy nhất bị bỏ là những lượt kiểm cho màn hình không ai nhìn.
  const i = NGUON.indexOf('const timer = setInterval(');
  assert.ok(i > 0, 'không thấy vòng setInterval tự kiểm');
  const than = NGUON.slice(i, NGUON.indexOf('}, KIEM_LAI_MS)', i));
  assert.match(than, /visibilityState !== 'visible'/,
    'vòng tự kiểm không còn bỏ qua lúc tab ẩn — một tab để quên sẽ lại đốt hạn mức Redis '
    + 'cho một người không hề đang học');
  assert.match(than, /return;/, 'có kiểm visibilityState nhưng không thoát sớm');

  // Và phải VẪN kiểm lại khi người ta quay về tab — bỏ qua lúc ẩn chỉ an toàn
  // khi có nhánh này bù vào, không thì mã bị khoá sống mãi trên tab đang mở.
  assert.match(NGUON, /visibilitychange/, 'bỏ kiểm lúc ẩn mà cũng không kiểm lúc quay lại tab');
});

test('mỗi lượt kiểm quyền vẫn là ĐÚNG một lệnh Redis — đừng để nó thành hai', () => {
  // Con số sức chứa ở đầu file giả định 1 lệnh/lượt. Nếu requireLearner sau này
  // đọc thêm một khoá nữa thì mọi con số trên kia giảm một nửa mà không ai biết.
  const core = fs.readFileSync('src/server/accessCore.js', 'utf8');
  const i = core.indexOf('export async function requireLearner');
  assert.ok(i > 0);
  const than = core.slice(i, core.indexOf('export function requireAdmin', i));
  const soLenh = (than.match(/redisCommand|readAccessRecord|redisPipeline/g) || []).length;
  assert.equal(soLenh, 1,
    `requireLearner nay chạm Redis ${soLenh} lần thay vì 1 — sức chứa ghi ở đầu `
    + 'tests/tai_trong.test.js không còn đúng, phải tính lại rồi sửa bảng đó');
});
