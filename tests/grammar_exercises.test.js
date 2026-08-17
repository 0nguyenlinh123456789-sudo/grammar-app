// File: tests/grammar_exercises.test.js
// GHIM PHÁT HIỆN CỦA VIỆC 5.2 — BÀI TẬP NGỮ PHÁP KHÔNG LÀM ĐƯỢC.
//
// Nhánh C1 có 75/75 câu "viết lại" mà đáp án GIỐNG HỆT đề, 73/125 câu "sửa lỗi"
// mà từ sai GIỐNG HỆT từ sửa, và 20 câu giữ chỗ "This is a C1/C2 level practice
// sentence." B1 và B2 đo được 0% — hỏng nằm gọn trong nhánh C1.
//
// Ẩn lúc ĐỌC, không xoá dữ liệu (luật: "thiếu dữ liệu thì ẨN hoặc BÁO, tuyệt
// đối không thay thế âm thầm"). Test này giữ hai đầu:
//   - đầu ra: không câu hỏng nào lọt tới người học;
//   - đầu vào: bộ lọc không được ăn nhầm câu LÀM ĐƯỢC.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { locBaiHong, demBiAn, suaLoiLamDuoc, vietLaiLamDuoc, dienVaoLamDuoc } from '../src/utils/grammarClean.js';
import { napBoBai, doBo } from '../scripts/audit_grammar_exercises.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BO = await napBoBai();

test('sau khi lọc, KHÔNG câu bài tập nào còn không làm được', () => {
  const con = [];
  for (const [ten, ds] of BO) {
    for (const t of ds) {
      const s = locBaiHong(t);
      for (const e of s.errorCorrection || []) if (!suaLoiLamDuoc(e)) con.push(`${ten}/${t.id} sửa lỗi`);
      for (const e of s.transformation || []) if (!vietLaiLamDuoc(e)) con.push(`${ten}/${t.id} viết lại`);
      for (const e of s.fillBlanks || []) if (!dienVaoLamDuoc(e)) con.push(`${ten}/${t.id} điền vào`);
    }
  }
  assert.deepEqual(con.slice(0, 10), [], `${con.length} câu hỏng vẫn lọt qua bộ lọc`);
});

// Đây là chỗ dễ sai nhất: một bộ lọc quá tay sẽ dọn sạch bài tập và test trên
// vẫn xanh. B1/B2 đo được 0% hỏng, nên chúng phải đi qua bộ lọc mà KHÔNG mất gì.
test('bộ lọc KHÔNG đụng B1 và B2 — hai bộ này đo được 0% hỏng', () => {
  for (const [ten, ds] of BO) {
    if (ten === 'C1+') continue;
    for (const t of ds) {
      assert.equal(locBaiHong(t), t, `${ten}/${t.id} bị bộ lọc đụng vào — lẽ ra phải trả về nguyên trạng`);
    }
  }
});

test('câu sửa lỗi THẬT trong nhánh C1 vẫn được giữ lại', () => {
  const c1 = BO.find(([t]) => t === 'C1+')[1];
  const con = c1.flatMap((t) => (locBaiHong(t).errorCorrection || []));
  assert.equal(con.length, 52, `còn ${con.length} câu sửa lỗi làm được (đo được 52 lúc làm việc 5.2)`);
  // Một câu cụ thể ĐÃ ĐỌC, phải còn: có lỗi thật, sửa thật.
  const mau = con.find((e) => e.errorWord === 'do' && e.correction === 'did');
  assert.ok(mau, 'mất câu "Not until he left do I realize the truth." → did');
});

test('số câu bị ẩn đúng bằng số đo được, không phải con số hứa suông', () => {
  const c1 = BO.find(([t]) => t === 'C1+')[1];
  const r = doBo(c1);
  assert.deepEqual(
    { suaLoi: r.suaLoiHong, vietLai: r.vietLaiHong, dienVao: r.dienVaoHong },
    { suaLoi: 73, vietLai: 75, dienVao: 20 }
  );
  const tong = c1.reduce((s, t) => {
    const d = demBiAn(t);
    return { suaLoi: s.suaLoi + d.suaLoi, vietLai: s.vietLai + d.vietLai, dienVao: s.dienVao + d.dienVao };
  }, { suaLoi: 0, vietLai: 0, dienVao: 0 });
  assert.deepEqual(tong, { suaLoi: 73, vietLai: 75, dienVao: 20 }, 'demBiAn() lệch với bộ đo');
});

// Bộ lọc chỉ có tác dụng nếu màn hình THẬT SỰ đi qua nó. Chặn kiểu hồi quy đã
// xảy ra ở việc 3.5: một call site mới đọc thẳng dữ liệu gốc và không ai biết.
test('GrammarPage đọc bài tập qua locBaiHong, không đọc thẳng dữ liệu gốc', () => {
  const s = readFileSync(path.join(ROOT, 'src/pages/GrammarPage.jsx'), 'utf8');
  assert.match(s, /locBaiHong\(topicGoc\)/, 'GrammarPage không còn lọc bài hỏng');
  assert.doesNotMatch(s, /topicGoc\.(errorCorrection|transformation|fillBlanks)/,
    'GrammarPage đọc thẳng dữ liệu chưa lọc — bộ lọc bị đi vòng');
});

// Ghim thứ đã suýt lọt: bộ lọc chỉ cắm ở MỘT chỗ, nên chỗ đọc thứ hai sẽ lặng
// lẽ thấy đủ 168 câu hỏng. `grammarMinutes()` trong build_roadmap là đúng một
// chỗ như thế — nó đếm cả bài hỏng để ước lượng số giờ của nhánh C1. Test này
// liệt kê MỌI nơi đọc ba trường đó và bắt buộc phải đi qua locBaiHong.
test('mọi nơi đọc errorCorrection/transformation/fillBlanks đều qua locBaiHong', () => {
  const DUOC_DOC_THANG = [
    'src/utils/grammarClean.js',       // chính bộ lọc
    'scripts/audit_grammar_exercises.mjs', // bộ đo, phải thấy cả câu hỏng
    'tests/grammar_exercises.test.js',
  ];
  const thieu = [];
  const quet = (dir) => {
// Đọc kèm loại mục thay vì statSync từng tên: node --test chạy song song, và
// vài test khác dựng rồi xoá file `__tmp_*.mjs` trong src/data — giữa readdir và
// stat, một tên có thể đã biến mất → ENOENT làm test đỏ vì lý do không liên quan.
    for (const muc of readdirSync(dir, { withFileTypes: true })) {
      const ten = muc.name;
      const full = path.join(dir, ten);
      if (muc.isDirectory()) { quet(full); continue; }
      if (!/\.(js|jsx|mjs)$/.test(ten)) continue;
      const rel = path.relative(ROOT, full).replace(/\\/g, '/');
      if (rel.startsWith('src/data/') || DUOC_DOC_THANG.includes(rel)) continue;
      const s = readFileSync(full, 'utf8');
      if (!/\b(errorCorrection|transformation|fillBlanks)\b/.test(s)) continue;
      if (!/locBaiHong/.test(s)) thieu.push(rel);
    }
  };
  for (const d of ['src', 'scripts']) quet(path.join(ROOT, d));
  assert.deepEqual(thieu, [], `${thieu.length} nơi đọc bài tập mà KHÔNG qua locBaiHong:\n  ${thieu.join('\n  ')}`);
});
