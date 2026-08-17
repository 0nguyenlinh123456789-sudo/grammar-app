// GHIM TRANG CHỦ SAU KHI XẾP LẠI THÀNH LƯỚI (17/08).
//
// Chủ dự án nhận xét trang chủ "chằn chịt": chín thẻ ngang hết chiều rộng xếp
// chồng, thẻ nào cũng cùng một hình khối. Đã xếp lại thành ba nhóm có tên, mỗi
// nhóm một lưới. File này canh đúng RỦI RO của việc nén thẻ nhỏ lại, không canh
// chuyện thẩm mỹ (thẩm mỹ thì test không đo được, và không nên giả vờ là đo được):
//
//   Thẻ hẹp hơn → rất muốn cắt bớt chữ cho gọn → dòng bị cắt đầu tiên luôn là
//   dòng DÀI NHẤT, mà ở đây dòng dài nhất chính là mấy dòng nói rõ APP KHÔNG
//   LÀM ĐƯỢC GÌ. Cắt chúng là phá đúng phần trung thực mà việc 3.4/3.5 dựng nên.
//
// Cũng canh một chuyện đã suýt xảy ra khi xếp lại: thẻ "Ôn tập từ" dời sang nhóm
// "Ôn lại" làm lưới 2 cột cũ chỉ còn MỘT thẻ — trên máy tính là nửa hàng trống.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// Mỗi dòng dưới đây là một lời NÓI THẲNG app không làm được gì. Thêm thẻ mới thì
// thêm dòng vào đây; xoá dòng nào thì phải giải thích được vì sao nó không còn
// đúng, chứ không phải vì thẻ chật.
const CAU_MIEN_TRU = [
  'Giọng người thật',                       // kho bản thu là người thật, không phải giọng máy
  'Không cần API key',                       // luyện viết chạy được khi khách chưa nhập key
  'Không chấm phát âm',                      // nhãn của thẻ Luyện nói
  'văn bản nó nghe được',                    // 3.5: trình duyệt trả về CHỮ, không đánh giá phát âm
  'không phải đánh giá phát âm',
  'Không chấm ngữ pháp, không cho điểm',     // 3.4: không có điểm phần trăm cho bài viết
  'hai phần app chấm được',                  // 4.2: bậc chỉ suy từ Nghe + Đọc
  'dấu câu không tính',                      // cách chấm chép chính tả
];

test('mọi dòng nói rõ app KHÔNG làm được gì vẫn còn nguyên trên trang chủ', () => {
  const src = doc('src/pages/WelcomePage.jsx');
  const mat = CAU_MIEN_TRU.filter((c) => !src.includes(c));
  assert.deepEqual(mat, [], 'nén thẻ đã cắt mất dòng miễn trừ:\n  ' + mat.join('\n  '));
});

// Bỏ dòng chú thích trước khi dò lớp CSS. Test này đỏ ngay lần chạy đầu vì bắt
// đúng chú thích đang GIẢI THÍCH rằng không được dùng line-clamp — lần thứ hai
// trong ngày tôi viết một test đọc lời kể về mã thay vì đọc mã.
const boChuThich = (src) => src.split('\n').filter((d) => !/^\s*(\/\/|\*|\/\*)/.test(d)).join('\n');

test('thẻ trình bày KHÔNG cắt chữ mô tả', () => {
  // `line-clamp`/`truncate` làm dòng miễn trừ dài biến thành "..." — vẫn có
  // trong mã nguồn nên test chuỗi ở trên vẫn xanh, mà người học thì không đọc
  // được. Đây là chỗ duy nhất phải chặn bằng cách khác.
  const ma = boChuThich(doc('src/components/home/PracticeCard.jsx'));
  for (const xau of ['line-clamp', 'truncate', 'text-ellipsis', 'max-h-']) {
    assert.ok(!ma.includes(xau), `PracticeCard dùng "${xau}" — dòng miễn trừ dài sẽ bị cắt khỏi mắt người học`);
  }
});

test('trang chủ dựng thẻ từ MỘT mảng dữ liệu, không chép tay từng thẻ', () => {
  const src = doc('src/pages/WelcomePage.jsx');
  assert.match(src, /<PracticeGroup/, 'trang chủ phải xếp thẻ theo nhóm có tên');
  assert.equal((src.match(/<PracticeCard\b/g) || []).length, 1,
    'có nhiều hơn một chỗ viết <PracticeCard> — quay lại kiểu chép tay từng thẻ, tức mở đường cho nhãn/miễn trừ lệch nhau');
  // Ba nhóm: bốn kỹ năng · thi và kiểm tra · ôn lại.
  for (const ten of ['Bốn kỹ năng', 'Thi và kiểm tra', 'Ôn lại']) {
    assert.ok(src.includes(`tieuDe: '${ten}'`), `thiếu nhóm "${ten}"`);
  }
});

test('mỗi thẻ đều có nút mở được — không thẻ nào bấm vào không ra gì', () => {
  const src = doc('src/pages/WelcomePage.jsx');
  // Lấy đúng phần mảng thẻ, rồi đếm: mỗi thẻ phải có `nhanNut` và `onClick`.
  const i = src.indexOf("tieuDe: 'Bốn kỹ năng'");
  const j = src.indexOf('<PracticeGroup');
  assert.ok(i > 0 && j > i, 'không tìm thấy khối dữ liệu thẻ');
  const khoi = src.slice(i, j);
  const soId = (khoi.match(/^\s+id: '/gm) || []).length;
  assert.equal((khoi.match(/nhanNut:/g) || []).length, soId, 'có thẻ thiếu nhãn nút');
  assert.equal((khoi.match(/onClick: \(\) => set/g) || []).length, soId, 'có thẻ thiếu hành động mở');
  assert.ok(soId >= 9, `chỉ còn ${soId} thẻ — trước khi xếp lại đã có 9 lối vào, không được mất lối nào`);
});

test('không còn lưới 2 cột nào chỉ chứa một thẻ', () => {
  const src = doc('src/pages/WelcomePage.jsx');
  // Thẻ "Mục tiêu hôm nay" từng ghép đôi với "Ôn tập từ"; sau khi dời thẻ kia
  // đi, để nguyên `md:grid-cols-2` là bỏ trống nửa hàng trên máy tính.
  assert.ok(!/md:grid-cols-2 gap-5 mb-10">\s*\n\s*\{\/\* Daily goal card/.test(src),
    'thẻ Mục tiêu hôm nay vẫn nằm trong lưới 2 cột nhưng chỉ còn một mình');
});

test('không hộp thoại nào của trang chủ còn nhập TĨNH, và không cái nào mở ra màn hình trắng', () => {
  const src = doc('src/pages/WelcomePage.jsx');
  // Nhập tĩnh một hộp thoại chỉ mở khi bấm nút = kéo mã của nó vào thứ ai mở
  // app cũng phải tải. Bốn cái sót lại (SrsReview, WordNotebook, ErrorReview,
  // MockTest) không kéo theo kho dữ liệu lớn nên không ai để ý — tách ra đo
  // được: chunk trang chủ 328,1 KB -> 290,4 KB.
  for (const ten of ['SrsReview', 'WordNotebook', 'ErrorReview', 'MockTest']) {
    assert.ok(!new RegExp(`^import ${ten} from`, 'm').test(src), `${ten} còn nhập tĩnh vào trang chủ`);
    assert.ok(src.includes(`const ${ten} = lazy(`), `${ten} phải nạp bằng lazy`);
  }
  // `fallback={null}` nghĩa là bấm nút xong KHÔNG có gì hiện ra cho tới khi
  // chunk tải xong — mạng chậm thì đọc thành nút hỏng, nên người ta bấm lại.
  // Cùng nguyên tắc với nội dung: thiếu thì BÁO, không im lặng.
  assert.ok(!src.includes('fallback={null}'), 'còn Suspense fallback={null} — bấm nút ra màn hình trắng khi mạng chậm');
  assert.equal((src.match(/fallback=\{<DangMo \/>\}/g) || []).length, (src.match(/<Suspense /g) || []).length,
    'có Suspense không dùng DangMo — hoặc thiếu, hoặc lại quay về fallback im lặng');
});
