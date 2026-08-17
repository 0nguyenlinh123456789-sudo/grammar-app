// File: tests/oxford_best_translation.test.js
// GHIM ĐỢT SỬA CÂU CHỮ 100 CÂU `What is the best translation for "X"?`
// Quyết định B của BAO_CAO_KHUON_OXFORD.md — chốt 2026-08-17.
//
// TÁCH KHỎI tests/oxford_colloc.test.js CÓ LÝ DO, và lý do đó là bài học của
// chính đợt này: bất biến của quyết định A băm MỌI THỨ ngoài `collocations`, nên
// khi B sửa chuỗi `q` thì A lập tức đỏ. Đó là bất biến làm đúng việc của nó —
// hai đợt sửa khác nhau phải là hai commit khác nhau, mỗi commit có bảng băm
// riêng chụp ngay trước nó. Gộp lại thì một lệnh `git revert` không tách nổi.
//
// Vì sao họ câu này được GIỮ, không xoá: đáp án là nghĩa soạn tay của chính từ
// đó, và 100/100 câu có nhiễu là nghĩa soạn tay của các từ khác TRONG CÙNG UNIT
// — máy sắp xếp lại tài liệu soạn tay, không phán đoán gì. Chỉ câu chữ là nói
// quá: "best translation" ngụ ý phán đoán về chất lượng bản dịch, việc thật là
// "trong bốn nghĩa này, nghĩa nào là của từ đó".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { napUnits } from '../scripts/audit_oxford_templates.mjs';
import { CU, MOI, timCau, bamDapAn } from '../scripts/reword_best_translation.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SNAP = path.join(ROOT, 'scripts/data/best_translation_snapshot.json');

test('không còn câu nào hứa "best translation"', async () => {
  const units = await napUnits();
  const con = [];
  for (const { book, unit } of units) {
    for (const c of unit.quiz || []) {
      if (CU.test(String(c.q || ''))) con.push(`${book}/${unit.id}: ${c.q}`);
    }
  }
  assert.deepEqual(con.slice(0, 5), [], `còn ${con.length} câu dùng câu chữ cũ: ${con.slice(0, 5).join(' · ')}`);
});

test('BẤT BIẾN: sửa câu chữ KHÔNG đụng vào lựa chọn hay đáp án', async () => {
  const snap = JSON.parse(fs.readFileSync(SNAP, 'utf8'));
  const found = timCau(await napUnits());
  assert.equal(found.length, snap.soCau, `số câu đổi (${found.length} vs ${snap.soCau}) — bảng băm không còn dùng được`);

  const lech = [];
  for (const { khoa, cau } of found) {
    const cu = snap.bam[khoa];
    if (!cu) { lech.push(`${khoa}: câu MỚI, không có trong bảng băm`); continue; }
    if (bamDapAn(cau) !== cu) lech.push(`${khoa}: lựa chọn hoặc đáp án đã đổi`);
  }
  assert.deepEqual(lech, [],
    `đợt sửa câu chữ đã đụng vào lựa chọn/đáp án — điều nó tuyệt đối không được làm: ${lech.slice(0, 10).join(' · ')}`);
});

test('đề bài mới nói đúng việc nó làm, và nhiễu vẫn là nghĩa trong cùng unit', async () => {
  const units = await napUnits();
  let dem = 0;
  for (const { unit } of units) {
    // Mọi nghĩa soạn tay trong unit này. ĐÂY là căn cứ để GIỮ họ câu này: nhiễu
    // phải đọc ra từ tài liệu soạn tay của chính unit, không lấy từ chỗ khác và
    // không do máy nghĩ ra. Mất căn cứ đó thì quyết định phải là XOÁ, không phải
    // sửa chữ.
    const nghiaTrongUnit = new Set((unit.theory?.coreVocab || [])
      .map((w) => String(w.vi || w.meaning || '').trim()).filter(Boolean));
    for (const c of unit.quiz || []) {
      const mo = String(c.q || '').match(MOI);
      if (!mo) continue;
      dem += 1;
      assert.ok(c.options.includes(c.a), `${unit.id}/${mo[1]}: đáp án không nằm trong lựa chọn`);
      assert.equal(new Set(c.options).size, c.options.length, `${unit.id}/${mo[1]}: lựa chọn trùng nhau`);
      const ngoai = c.options.filter((o) => !nghiaTrongUnit.has(String(o).trim()));
      assert.deepEqual(ngoai, [], `${unit.id}/${mo[1]}: nhiễu lấy từ NGOÀI unit — mất căn cứ GIỮ họ câu này: ${ngoai.join(' · ')}`);
    }
  }
  assert.equal(dem, 100, `chỉ soi được ${dem} câu, phải là 100`);
});

test('bộ sửa chỉ chạy khi gọi trực tiếp — không ghi đè bảng băm lúc bị import', () => {
  const src = fs.readFileSync(path.join(ROOT, 'scripts/reword_best_translation.mjs'), 'utf8');
  assert.match(src, /import\.meta\.url === pathToFileURL\(process\.argv\[1\]/,
    'thiếu cổng chạy-trực-tiếp: bài kiểm import bộ này, nếu nó tự chụp lại thì bất biến tự so với chính nó');
});
