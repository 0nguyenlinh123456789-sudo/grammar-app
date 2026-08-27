// File: tests/orphan_data.test.js
// CHỐT CHẶN FILE DỮ LIỆU MỒ CÔI.
//
// Đã dính hai lần, cùng một kiểu:
//   - `vocabDailyNew24.js` — không ai import, chứa bản sao của topic đang chạy.
//   - `vocabGenerated.js`  — không ai import, chứa bản sao chết của
//     `sustainable-tourism-vstep` kèm 3 từ không có ở đâu khác.
// Cả hai đều lộ ra một cách tình cờ (một lần khi đối chiếu nội dung, một lần
// vì script sửa chuỗi thay 418 lượt trong khi chỉ cần 417), chứ không phải nhờ
// có ai đi tìm.
//
// Tác hại không phải dung lượng — file chết không vào bundle. Tác hại là NGƯỜI
// SAU mở file ra, thấy dữ liệu trông dùng được, rồi sửa nhầm vào đó; hoặc tệ
// hơn, import nó vào và làm topic bị trùng id.
//
// Test này FAIL nếu có file trong src/data/ mà không file nào trong dự án nhắc
// tới. Muốn giữ một file chưa nối vào kho thì thêm vào EXEMPT kèm LÝ DO.
//
// ⚠️ PHẠM VI: đây là mồ côi Ở MỨC FILE ("có ai import không"), KHÔNG phải mồ
// côi ở mức ĐƯỜNG ĐI ("người đi theo lộ trình có bao giờ gặp không"). Bốn kho —
// bài nghe theo đoạn, bài đọc dài, bản thu chép chính tả, đề thi cuối bậc — đều
// được import đàng hoàng nên test này xanh, trong khi KHÔNG chặng nào trong 617
// chặng dẫn tới chúng. Đừng đọc màu xanh ở đây thành "mọi nội dung đều tới
// được". Phép đo kia nằm ở cuối tests/roadmap_coverage.test.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

// Miễn trừ CÓ LÝ DO — hiện không có file nào.
const EXEMPT = {};

function walk(dir, out = []) {
// Đọc kèm loại mục thay vì statSync từng tên: node --test chạy song song, và
// vài test khác dựng rồi xoá file `__tmp_*.mjs` trong src/data — giữa readdir và
// stat, một tên có thể đã biến mất → ENOENT làm test đỏ vì lý do không liên quan.
  for (const muc of readdirSync(dir, { withFileTypes: true })) {
    const name = muc.name;
    const p = path.join(dir, name);
    if (muc.isDirectory()) {
      if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
      walk(p, out);
    } else if (/\.(js|jsx|mjs|cjs|ts|tsx|json)$/.test(name)) {
      // ⚠️ BỎ HẲN file tạm `__tmp_*`, đừng chỉ né lúc stat.
      // Lần vá trước chỉ đóng khoảng `readdir → stat`; còn khoảng `readdir →
      // readFileSync` vẫn hở, vì tên được gom ở đây rồi mãi sau mới đọc. Giữa
      // hai lúc đó tiến trình test khác đã xoá xong file tạm của nó → ENOENT,
      // và test đỏ vì lý do không liên quan gì tới nội dung nó đang canh
      // (gặp thật 27/08: `__tmp_render_ChuyenKhoan.jsx_19296_3.mjs`).
      //
      // Bỏ hẳn còn ĐÚNG HƠN về mặt nội dung: file tạm là bản gói của một
      // component, nhét nó vào đống chữ đi dò có thể làm một file dữ liệu mồ
      // côi trông như đang được dùng.
      if (name.startsWith('__tmp_')) continue;
      out.push(p);
    }
  }
  return out;
}

test('mọi file trong src/data đều có người dùng — không để lại bản sao chết', () => {
  const sources = [
    ...walk(path.join(ROOT, 'src')),
    ...walk(path.join(ROOT, 'scripts')),
    ...walk(path.join(ROOT, 'tests')),
  ];

  const dataNames = readdirSync(DATA).filter((n) => /\.(js|json)$/.test(n));

  // Gộp mọi nguồn thành MỘT chuỗi rồi mới dò: đọc lại toàn bộ nguồn cho từng
  // file dữ liệu là 240 × 400 lượt đọc đĩa, mất hơn 10 giây.
  //
  // PHẢI giữ cả src/data trong tập dò: file tổng hợp `vocabVstepData.js` —
  // nơi chứa toàn bộ lệnh import của kho — cũng nằm trong src/data. Loại nó ra
  // thì mọi file dữ liệu đều thành mồ côi.
  // Đai an toàn thứ hai: một file có thể biến mất giữa lúc gom tên và lúc đọc
  // (test chạy song song). Bỏ qua file đã mất thì kết quả chỉ thiếu đi một
  // nguồn dò — còn để nó ném thì cả phép kiểm đỏ vì chuyện không liên quan.
  const texts = new Map(sources.map((f) => {
    try { return [f, readFileSync(f, 'utf8')]; } catch { return [f, '']; }
  }));
  const haystack = [...texts.values()].join('\n');

  // Bắt mọi kiểu tham chiếu: import './x', '../data/x', './x.js', và cả dạng
  // đọc bằng đường dẫn — path.join(DATA, 'topicFamilies.json').
  const patterns = (s) => [`/${s}'`, `/${s}"`, `'${s}'`, `"${s}"`];

  const orphans = [];
  for (const name of dataNames) {
    if (EXEMPT[name]) continue;
    const base = name.replace(/\.(js|json)$/, '');
    const own = texts.get(path.join(DATA, name)) || '';
    const keys = [...patterns(base), ...patterns(name)];

    // "Có người dùng" phải là NGƯỜI KHÁC dùng: một file chết tự nhắc tên mình
    // không cứu được nó.
    const used = keys.some((k) => {
      if (!haystack.includes(k)) return false;
      const inOwn = own.split(k).length - 1;
      const inAll = haystack.split(k).length - 1;
      return inAll > inOwn;
    });
    if (!used) orphans.push(name);
  }

  assert.deepEqual(orphans, [],
    'file dữ liệu sau không được import từ đâu cả — nối vào kho, xoá đi, hoặc thêm vào EXEMPT kèm lý do:\n  ' + orphans.join('\n  '));

  // Danh sách miễn trừ phải còn đúng: file đã xoá thì phải gỡ khỏi danh sách.
  for (const name of Object.keys(EXEMPT)) {
    assert.ok(readdirSync(DATA).includes(name), `${name} nằm trong EXEMPT nhưng không còn tồn tại — hãy gỡ khỏi danh sách`);
  }
});
