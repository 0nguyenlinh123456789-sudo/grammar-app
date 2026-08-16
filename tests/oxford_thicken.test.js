// File: tests/oxford_thicken.test.js
// Ghim việc 5.1 — bù độ dày luyện tập cho giáo trình Oxford.
//
// Bất biến quan trọng nhất KHÔNG phải "có thêm nhiều mục", mà là:
// **MỌI MỤC THÊM VÀO ĐỀU SUY RA ĐƯỢC TỪ Ô TỪ SOẠN TAY CỦA CHÍNH UNIT ĐÓ.**
// Một bộ bù độ dày mà tự nghĩ ra nội dung thì chính là thứ cả chuỗi dọn nội
// dung này đang xoá — và nó sẽ trông y hệt một bộ bù độ dày tử tế trên bảng số.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { buDoDay, demLuyenTap, MUC_TIEU } from '../src/utils/oxfordThicken.js';

const DATA = path.resolve('src/data');
const SACH = [
  ['elementary', [['oxfordData.js', 'courseData'], ['oxfordDataPart2.js', 'courseData'], ['oxfordDataPart3.js', 'courseData']]],
  ['pre_intermediate', [['oxfordPreIntData.js', 'courseData'], ['oxfordPreIntData51_75.js', 'courseData51_75'], ['oxfordPreIntData76_100.js', 'courseData76_100']]],
  ['advanced', [['oxfordAdvancedData1_25.js', 'courseData1_25'], ['oxfordAdvancedData26_50.js', 'courseData26_50'], ['oxfordAdvancedData51_75.js', 'courseData51_75'], ['oxfordAdvancedData76_100.js', 'courseData76_100']]],
];

async function napSach() {
  const ra = [];
  for (const [book, parts] of SACH) {
    for (const [f, k] of parts) {
      const m = await import(pathToFileURL(path.join(DATA, f)).href);
      for (const u of m[k] || []) ra.push({ book, unit: u });
    }
  }
  return ra;
}
const TAT_CA = await napSach();

test('KHÔNG mục nào thêm vào chứa nội dung ngoài ô từ của chính unit đó', () => {
  const lac = [];
  for (const { unit } of TAT_CA) {
    const day = buDoDay(unit);
    const tu = (unit.theory?.coreVocab || []).map((w) => String(w.word || w.en || ''));
    const nghia = new Set((unit.theory?.coreVocab || []).map((w) => String(w.vi || '')));
    const viDu = new Set((unit.theory?.coreVocab || []).map((w) => String(w.example || '')));
    const tuSet = new Set(tu.map((t) => t.toLowerCase()));

    for (const it of (day.typingGame || []).filter((x) => x.tuOTuCuaUnit)) {
      if (!tuSet.has(String(it.a).toLowerCase())) lac.push(`${unit.id} gõ từ: đáp án "${it.a}" không có trong ô từ`);
      if (![...nghia].some((v) => it.q.startsWith(v))) lac.push(`${unit.id} gõ từ: đề không lấy từ nghĩa soạn tay`);
    }
    for (const it of (day.speaking || []).filter((x) => x.tuOTuCuaUnit)) {
      if (!viDu.has(it.text)) lac.push(`${unit.id} đọc to: câu "${it.text.slice(0, 30)}…" không phải câu ví dụ soạn tay`);
    }
    for (const it of (day.quiz || []).filter((x) => x.tuOTuCuaUnit)) {
      if (!tuSet.has(String(it.a).toLowerCase())) lac.push(`${unit.id} điền vào: đáp án "${it.a}" không có trong ô từ`);
      for (const o of it.options) {
        if (!tuSet.has(String(o).toLowerCase())) lac.push(`${unit.id} điền vào: nhiễu "${o}" không phải từ của unit này`);
      }
    }
  }
  assert.deepEqual(lac.slice(0, 10), [], `${lac.length} mục bù vào có nội dung không suy được từ ô từ soạn tay:\n  ${lac.slice(0, 10).join('\n  ')}`);
});

test('câu điền vào chỗ trống thật sự CÓ chỗ trống, và câu gốc thật sự chứa từ đó', () => {
  const hong = [];
  for (const { unit } of TAT_CA) {
    const viDu = new Map((unit.theory?.coreVocab || []).map((w) => [String(w.word || w.en || '').toLowerCase(), String(w.example || '')]));
    for (const it of (buDoDay(unit).quiz || []).filter((x) => x.tuOTuCuaUnit)) {
      if (!it.q.includes('___')) hong.push(`${unit.id}: câu điền vào không có chỗ trống`);
      const goc = viDu.get(String(it.a).toLowerCase());
      if (!goc || !goc.toLowerCase().includes(String(it.a).toLowerCase())) {
        hong.push(`${unit.id}: câu ví dụ gốc không chứa từ "${it.a}" — khoét ra từ đâu?`);
      }
    }
  }
  assert.deepEqual(hong.slice(0, 10), [], `${hong.length} câu điền vào hỏng:\n  ${hong.slice(0, 10).join('\n  ')}`);
});

test('mục soạn tay KHÔNG bị thay, chỉ được nối thêm vào sau', () => {
  for (const { unit } of TAT_CA.slice(0, 40)) {
    const day = buDoDay(unit);
    for (const k of ['quiz', 'typingGame', 'speaking']) {
      const cu = unit[k] || [];
      assert.deepEqual((day[k] || []).slice(0, cu.length), cu, `${unit.id}: mục soạn tay ở "${k}" bị đụng`);
    }
    // textbookExercises và dragDrop KHÔNG được đụng tới.
    assert.equal(day.textbookExercises, unit.textbookExercises);
    assert.equal(day.dragDrop, unit.dragDrop);
  }
});

test('chỉ bù tới mức mục tiêu rồi dừng — sách dày sẵn gần như không nhận thêm', () => {
  for (const { unit } of TAT_CA) {
    const day = buDoDay(unit);
    for (const k of Object.keys(MUC_TIEU)) {
      const cu = (unit[k] || []).length;
      const moi = (day[k] || []).length;
      assert.ok(moi >= cu, `${unit.id}/${k}: số mục giảm đi`);
      // Chỉ vượt mức mục tiêu nếu BẢN THÂN mục soạn tay đã vượt.
      if (cu < MUC_TIEU[k]) assert.ok(moi <= MUC_TIEU[k], `${unit.id}/${k}: bù quá mức mục tiêu (${moi} > ${MUC_TIEU[k]})`);
      else assert.equal(moi, cu, `${unit.id}/${k}: đã đủ dày mà vẫn bị bù thêm`);
    }
  }
});

// Con số đo được, ghim để nếu ai đó làm hỏng bộ bù thì thấy ngay. KHÔNG ghim
// mốc ≥50/unit của bảng kế hoạch: mức đó KHÔNG đạt được bằng cách sắp xếp lại
// tài liệu soạn tay — xem báo cáo việc 5.1.
test('độ dày sau khi bù đúng mức đã đo và báo cáo', () => {
  const theoSach = {};
  for (const { book, unit } of TAT_CA) {
    theoSach[book] ||= { n: 0, truoc: 0, sau: 0 };
    theoSach[book].n += 1;
    theoSach[book].truoc += demLuyenTap(unit);
    theoSach[book].sau += demLuyenTap(buDoDay(unit));
  }
  const tb = (b) => theoSach[b].sau / theoSach[b].n;
  assert.ok(tb('advanced') > 25, `advanced chỉ còn ${tb('advanced').toFixed(1)} mục/unit — bộ bù hỏng`);
  assert.ok(tb('pre_intermediate') > 29, `pre_intermediate chỉ còn ${tb('pre_intermediate').toFixed(1)} mục/unit`);
  assert.ok(tb('elementary') > 49, `elementary chỉ còn ${tb('elementary').toFixed(1)} mục/unit`);
  // Và bù phải THẬT SỰ thêm được nhiều ở chỗ mỏng nhất.
  assert.ok(theoSach.advanced.sau > theoSach.advanced.truoc * 2.5,
    'advanced là sách mỏng nhất mà không dày lên đáng kể — kiểm lại ô từ có example không');
});

test('unit không có ô từ thì trả về nguyên trạng, không ném lỗi', () => {
  const u = { id: 'x', quiz: [{ q: 'a', options: ['a'], a: 'a' }] };
  assert.equal(buDoDay(u), u);
  assert.equal(buDoDay({ id: 'y' }).id, 'y');
  assert.equal(buDoDay(null), null);
});
