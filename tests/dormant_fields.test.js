// File: tests/dormant_fields.test.js
// CHỐT CHẶN "BOM HẸN GIỜ" TRƯỜNG DỮ LIỆU RÁC ĐANG NẰM IM — phát hiện (e3) 2026-08-12.
//
// Bối cảnh: trường `wordFamily` trong src/data (unit.words[] và theory.coreVocab[])
// chứa giá trị máy-sinh: hậu tố ghép mù quáng ("reviseer (Danh từ)",
// "washbasinful (Tính từ)") và filler "Từ loại: [X]. Hãy tra cứu thêm các biến
// thể từ loại của...". Hiện KHÔNG component nào render trường này nên rác chưa
// tới mắt người học — nhưng chỉ cần một người viết component đọc nó là rác
// hiển thị ngay, không qua bất kỳ lớp lọc nào.
//
// Cập nhật 2026-08-13 (#3): sinh lại 3 file Oxford Pre-Int đã XÓA HẲN trường
// này khỏi chúng — kiểm kê từ 2.313 xuống còn 1.520 giá trị, tất cả nằm ở
// oxfordData*.js và oxfordAdvancedData*.js (chưa có generator trong repo).
// Test vẫn phải giữ cho tới khi hai cụm file đó cũng được dọn.
//
// Test này FAIL nếu bất kỳ file nào ngoài src/data/ tham chiếu `wordFamily`.
// Nếu bạn CỐ Ý muốn render wordFamily: trước tiên phải dọn/sinh lại dữ liệu
// (KE_HOACH_TRIEN_KHAI.md hạng mục #3) hoặc thêm luật lọc vào
// src/utils/contentFilter.js, rồi mới cập nhật test này.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

function walk(dir, out = []) {
// Đọc kèm loại mục thay vì statSync từng tên: node --test chạy song song, và
// vài test khác dựng rồi xoá file `__tmp_*.mjs` trong src/data — giữa readdir và
// stat, một tên có thể đã biến mất → ENOENT làm test đỏ vì lý do không liên quan.
  for (const muc of readdirSync(dir, { withFileTypes: true })) {
    const name = muc.name;
    const p = path.join(dir, name);
    if (muc.isDirectory()) {
      // src/data là nơi trường rác đang nằm — dữ liệu được phép chứa nó,
      // chỉ CODE đọc nó mới nguy hiểm.
      if (p === path.join(SRC, 'data')) continue;
      walk(p, out);
    } else if (/\.(js|jsx|ts|tsx)$/.test(name)) {
      out.push(p);
    }
  }
  return out;
}

test('trường wordFamily (1.520 giá trị máy-sinh còn lại) không được code nào đọc/render', () => {
  const offenders = [];
  for (const file of walk(SRC)) {
    const text = readFileSync(file, 'utf8');
    if (/\bwordFamily\b/.test(text)) offenders.push(path.relative(ROOT, file));
  }
  assert.deepEqual(
    offenders,
    [],
    `wordFamily đang bị tham chiếu ngoài src/data — trường này chứa giá trị máy-sinh chưa dọn, ` +
    `không được render khi chưa dọn dữ liệu (#3) hoặc chưa có luật lọc trong contentFilter.js. File vi phạm: ${offenders.join(', ')}`
  );
});
