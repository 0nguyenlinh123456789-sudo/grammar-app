// MỌI LỚP PHỦ TOÀN MÀN HÌNH PHẢI CÓ NÚT ĐÓNG GỌI ĐƯỢC TÊN.
//
// Tìm ra bằng cách LÁI TRÌNH DUYỆT THẬT (tests/helpers/trinhduyet.mjs, đóng vai
// khách đi hết 22 bước): panel "Ôn tập từ" là panel DUY NHẤT trong mười panel mà
// nút đóng chỉ có một icon ✕, không có tên. Người dùng chuột thì thấy; người dùng
// trình đọc màn hình chỉ nghe "button" — không biết bấm vào sẽ ra gì. Bộ rà tự
// động cũng không tìm ra nó, đúng như trình đọc màn hình không tìm ra.
//
// Vì sao ghim bằng test TĨNH chứ không bằng chính bộ lái: bộ lái cần Chrome và
// mất ~60 giây, không hợp để chạy trong `npm test` mỗi lần. Test này rẻ, chạy
// cùng 317 test kia, và canh đúng điều kiện đã đo được từ bộ lái.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Lớp phủ KHÔNG cần nút đóng, kèm lý do đích danh.
const KHONG_CAN_NUT_DONG = {
  // Sống đúng một khoảnh khắc rồi bị thay bằng panel thật. Nút đóng ở đây là mời
  // người ta bấm vào thứ sắp biến mất.
  'src/components/common/DangMo.jsx': 'lớp chờ chunk, tự biến mất',
  // Đóng bằng các nút chữ rõ nghĩa ("Để sau, vào học luôn"), không dùng icon.
  'src/components/common/OnboardingWizard.jsx': 'đóng bằng nút chữ, không phải icon',
  // Lớp phủ mờ của thanh điều hướng trên điện thoại: bấm vào nền để đóng, và
  // thanh bên có nút riêng.
  'src/layouts/MainLayout.jsx': 'lớp phủ nền của thanh bên + hộp xác nhận có nút chữ',
  'src/pages/WelcomePage.jsx': 'hộp xác nhận đặt lại lộ trình — hai nút chữ rõ nghĩa',
  // Bộ sưu tập thú: đóng bằng nút chữ.
  'src/components/common/ChibiAnimals.jsx': 'đóng bằng nút chữ',
  'src/components/access/AccessGate.jsx': 'màn kích hoạt — không được phép đóng',
};

function quetJsx(thuMuc, ds = []) {
  for (const t of fs.readdirSync(path.join(ROOT, thuMuc), { withFileTypes: true })) {
    const p = `${thuMuc}/${t.name}`;
    if (t.isDirectory()) quetJsx(p, ds);
    else if (t.name.endsWith('.jsx')) ds.push(p);
  }
  return ds;
}

test('mọi panel toàn màn hình đều có nút đóng gọi được tên', () => {
  const loi = [];
  for (const f of [...quetJsx('src/components'), ...quetJsx('src/pages'), ...quetJsx('src/layouts')]) {
    if (/ielts/i.test(f) || f in KHONG_CAN_NUT_DONG) continue;
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (!src.includes('fixed inset-0')) continue;
    if (!src.includes('onClose')) continue;      // không phải panel đóng được
    if (!/aria-label="Đóng"/.test(src)) {
      loi.push(`${f} — có lớp phủ và onClose nhưng không nút nào mang aria-label="Đóng"`);
    }
  }
  assert.deepEqual(loi, [], 'panel không có nút đóng gọi được tên:\n  ' + loi.join('\n  '));
});

test('danh sách miễn trừ không được phình ra một cách im lặng', () => {
  // Mỗi lần thêm một dòng vào KHONG_CAN_NUT_DONG là một lần bớt đi một panel
  // được canh. Ghim số lượng để việc thêm phải là một quyết định nhìn thấy được.
  assert.equal(Object.keys(KHONG_CAN_NUT_DONG).length, 6,
    'số lớp phủ được miễn trừ đã đổi — thêm thì phải ghi lý do đích danh và sửa con số này');
  for (const [f, lyDo] of Object.entries(KHONG_CAN_NUT_DONG)) {
    assert.ok(fs.existsSync(path.join(ROOT, f)), `miễn trừ trỏ tới file không còn: ${f}`);
    assert.ok(lyDo.length > 12, `lý do miễn trừ quá sơ sài: ${f}`);
  }
});
