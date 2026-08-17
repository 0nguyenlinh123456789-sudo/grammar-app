// File: tests/oxford_colloc.test.js
// GHIM ĐỢT XOÁ 1.868 CỤM COLLOCATION NHÂN TỪ KHUÔN (quyết định A của
// BAO_CAO_KHUON_OXFORD.md, chốt 2026-08-17).
//
// Hai lý do độc lập đứng sau đợt xoá — chỉ cần một là đủ:
//   1. NGUỒN GỐC: 1.868/1.887 cụm (99,0%) sinh từ 11 khuôn → đúng vế XOÁ của luật
//      GIỮ/XOÁ đã chốt.
//   2. ĐÚNG/SAI: `have a noun`, `use noun`, `very adjective`, `verb something`,
//      `extremely get dark`, `have a get a stamp` KHÔNG PHẢI TIẾNG ANH — khuôn bị
//      áp lên cả nhãn từ loại và cả cụm động từ. Đây là dạy sai, và lý do này
//      đứng vững kể cả khi bỏ qua lý do (1).
//
// Test quan trọng nhất ở đây là test BẤT BIẾN: xoá 1.868 chuỗi trong 7 file
// giáo trình soạn tay là một đợt sửa lớn, và cách duy nhất để chứng minh nó
// KHÔNG đụng vào thứ khác là băm phần còn lại — chụp TRƯỚC khi xoá. Cùng mẹo đã
// dùng cho 888 lượt hạ chữ thường ở việc 3.2.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { napUnits, doCollocation, loKhuon } from '../scripts/audit_oxford_templates.mjs';
import { bam } from '../scripts/snapshot_oxford_noncolloc.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SNAP = path.join(ROOT, 'scripts/data/oxford_noncolloc_snapshot.json');

// 19 lượt / 16 cụm riêng — con số của báo cáo, ghim lại để không ai xoá thêm.
const CUM_THAT_TOI_THIEU = 19;

test('BẤT BIẾN: đợt xoá CHỈ đụng vào mảng collocations, không đụng gì khác', async () => {
  const snap = JSON.parse(fs.readFileSync(SNAP, 'utf8'));
  const units = await napUnits();

  assert.equal(units.length, snap.soUnit, `số unit đổi (${units.length} vs ${snap.soUnit}) — bảng băm không còn dùng được`);

  const lech = [];
  for (const { book, unit } of units) {
    const khoa = `${book}:${unit.id}`;
    const cu = snap.bam[khoa];
    if (!cu) { lech.push(`${khoa}: unit MỚI, không có trong bảng băm`); continue; }
    if (bam(unit) !== cu) lech.push(`${khoa}: nội dung NGOÀI collocations đã đổi`);
  }
  assert.deepEqual(lech, [],
    'đợt xoá collocation đã đụng vào nội dung khác — đây là điều nó tuyệt đối không được làm:\n  ' + lech.slice(0, 10).join('\n  '));

  // Và bảng băm phải còn khớp danh sách unit thật: unit bị xoá thì phải gỡ khỏi bảng.
  const thuc = new Set(units.map(({ book, unit }) => `${book}:${unit.id}`));
  const chet = Object.keys(snap.bam).filter((k) => !thuc.has(k));
  assert.deepEqual(chet, [], `bảng băm còn ${chet.length} unit không còn tồn tại — gỡ khỏi bảng: ${chet.slice(0, 5).join(', ')}`);
});

test('không còn cụm collocation nào sinh từ khuôn lặp', async () => {
  const units = await napUnits();
  const { tong, khuon, tuKhuon } = doCollocation(units);
  assert.equal(tuKhuon, 0, `còn ${tuKhuon} cụm sinh từ khuôn: ${khuon.slice(0, 5).map(([k, n]) => `${k} (${n})`).join(' · ')}`);
  assert.ok(tong >= CUM_THAT_TOI_THIEU, `chỉ còn ${tong} cụm, dưới mức ${CUM_THAT_TOI_THIEU} cụm thật đã đo — xoá quá tay`);
});

test('không cụm nào còn dính nhãn từ loại hay cụm động từ ghép sai', async () => {
  const units = await napUnits();
  // Đây là vế "ĐÚNG/SAI" của quyết định A, kiểm riêng: kể cả khi một cụm không
  // lặp đủ 5 lần để bị bắt là khuôn, nó vẫn không được là tiếng Anh sai.
  const NHAN_TU_LOAI = /\b(noun|verb|adjective|adverb|pronoun|preposition)\b/i;
  const ban = [];
  for (const { book, unit } of units) {
    for (const w of unit.theory?.coreVocab || []) {
      for (const c of w.collocations || []) {
        if (NHAN_TU_LOAI.test(c) && !/word class/i.test(c)) ban.push(`${book}/${unit.id}: "${c}" — dính nhãn từ loại`);
        // "have a get a stamp", "use get a job": khuôn áp lên một cụm đã có động từ.
        if (/\b(have a|use|very|extremely)\s+(get|go|walk|do|make)\b/i.test(c)) ban.push(`${book}/${unit.id}: "${c}" — khuôn áp lên cụm động từ`);
      }
    }
  }
  assert.deepEqual(ban.slice(0, 10), [], 'còn cụm sai tiếng Anh:\n  ' + ban.slice(0, 10).join('\n  '));
});

test('bộ xoá và bộ đo dùng CHUNG một luật nhận diện khuôn', () => {
  // Nếu strip_oxford_templates.mjs tự chép lại luật thì bộ xoá và bộ đo sẽ lệch,
  // và khi lệch chúng lệch cùng chiều — đúng bẫy `.{1,20}` vs `.{1,25}` đã làm
  // lọt dòng giải nghĩa trong bản chép lời VOA.
  const src = fs.readFileSync(path.join(ROOT, 'scripts/strip_oxford_templates.mjs'), 'utf8');
  assert.match(src, /from '\.\/audit_oxford_templates\.mjs'/, 'bộ xoá phải nhập luật từ bộ đo, không chép lại');
  assert.doesNotMatch(src, /function\s+loKhuon/, 'bộ xoá không được tự định nghĩa lại loKhuon');
  assert.equal(loKhuon('important FAQ', 'FAQ'), 'important {X}', 'luật lộ khuôn đổi hành vi — kiểm lại cả hai bộ');
});
