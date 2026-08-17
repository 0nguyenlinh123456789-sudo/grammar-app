// GHIM THỨ TỰ XẾP LỚP CỦA MỌI HỘP THOẠI TOÀN MÀN HÌNH (17/08).
//
// Rà soát toàn app theo yêu cầu của chủ dự án, tìm ra một lỗi THẤY ĐƯỢC:
// `SrsReview` (màn "Ôn tập từ") mở ra ở `z-50`, trong khi **nút chat con thỏ
// `BunnyChat` là `fixed ... z-[110]`** — nên con thỏ nổi ĐÈ LÊN hộp thoại ôn tập,
// và cái nút bỏ-qua-điều-hướng `z-[100]` cũng vậy. Mọi hộp thoại cùng loại khác
// đã ở `z-[120]`–`z-[140]` từ trước; ba chỗ bị bỏ sót ở `z-50` là:
//   · SrsReview
//   · hộp xác nhận "đặt lại lộ trình" — có HAI bản gần như y hệt, một ở
//     WelcomePage:1165 và một ở MainLayout:505, cả hai ở `z-50`
// Cộng thêm `DangMo` mà chính tôi vừa thêm ở `z-50` — thấp hơn cả panel nó đứng
// thế chỗ.
//
// Vì sao ghim bằng test chứ không sửa xong là thôi: lỗi này KHÔNG hiện ra ở bất
// kỳ test nào đang có, không làm lint đỏ, và chỉ thấy khi mở đúng hộp thoại đó
// trên đúng cỡ màn hình. Màn hình thứ mười thêm vào sẽ lại quên.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Nút chat con thỏ trôi ở z-[110]. Hộp thoại toàn màn hình phải nằm TRÊN nó, nếu
// không thì có một cái nút bấm được nổi trên lớp phủ.
const Z_TOI_THIEU = 120;
const Z_CUA_BUNNY = 110;

function quetJsx(thuMuc, ds = []) {
  for (const t of fs.readdirSync(path.join(ROOT, thuMuc), { withFileTypes: true })) {
    const p = `${thuMuc}/${t.name}`;
    if (t.isDirectory()) quetJsx(p, ds);
    else if (t.name.endsWith('.jsx')) ds.push(p);
  }
  return ds;
}

// Cụm IELTS Nền Tảng là của riêng chủ dự án, tuyệt đối không sửa — nên cũng
// không ghim: ghim nó là buộc người khác phải sửa nó.
const MIEN_TRU_IELTS = /ielts/i;

// MOT dinh nghia duy nhat cho "the nao la mot lop z". Viet regex nay hai lan la
// hai co hoi go sai — va lan go sai o day KHONG lam test do, no lam test KHONG THE do.
const RE_LOP_Z = /\bz-(?:\[\d+\]|\d+)/g;

const doZ = (dong) => {
  const m = dong.match(/z-\[(\d+)\]/) || dong.match(/z-(\d+)\b/);
  return m ? Number(m[1]) : null;
};

test('mọi lớp phủ toàn màn hình đều nằm trên nút chat trôi', () => {
  const loi = [];
  for (const f of [...quetJsx('src/components'), ...quetJsx('src/pages'), ...quetJsx('src/layouts')]) {
    if (MIEN_TRU_IELTS.test(f)) continue;
    const dong = fs.readFileSync(path.join(ROOT, f), 'utf8').split('\n');
    dong.forEach((d, i) => {
      if (!d.includes('fixed inset-0')) return;
      // Lớp phủ mờ của thanh điều hướng trên điện thoại CỐ Ý nằm dưới: nó là
      // phần của thanh bên (z-40), không phải hộp thoại.
      if (/lg:hidden/.test(d)) return;
      const z = doZ(d);
      if (z === null) loi.push(`${f}:${i + 1} — không khai z, nhận z mặc định nên nút chat trôi đè lên`);
      else if (z < Z_TOI_THIEU) loi.push(`${f}:${i + 1} — z-${z}, dưới mốc ${Z_TOI_THIEU} (nút chat ở z-${Z_CUA_BUNNY})`);
    });
  }
  assert.deepEqual(loi, [], 'lớp phủ nằm sai lớp:\n  ' + loi.join('\n  '));
});

// LỖI TÔI TỰ GÂY RA KHI SỬA BỐN CHỖ z-50 Ở TRÊN: chèn `z-[140]` vào đầu chuỗi
// class mà KHÔNG gỡ `z-50` đã có ở cuối cùng chuỗi đó — hai lớp z xung đột trong
// cùng một className, và cái nào thắng phụ thuộc thứ tự trong file CSS sinh ra,
// không phải thứ tự trong mã. Tức là "đã sửa" mà có thể vẫn ở z-50.
//
// Bộ dò ở test trên KHÔNG bắt được: nó lấy con số z ĐẦU TIÊN gặp trên dòng, thấy
// 140 là xanh. Đây là chỗ một phép đo hợp lệ vẫn nói sai vì nó chỉ đọc phần đầu.
test('không className nào khai hai lớp z cùng lúc', () => {
  const loi = [];
  for (const f of [...quetJsx('src/components'), ...quetJsx('src/pages'), ...quetJsx('src/layouts')]) {
    if (MIEN_TRU_IELTS.test(f)) continue;
    fs.readFileSync(path.join(ROOT, f), 'utf8').split('\n').forEach((d, i) => {
      // Đếm trong TỪNG chuỗi class, không đếm cả dòng: một dòng có thể chứa hai
      // className khác nhau (lớp phủ và hộp bên trong) và mỗi cái một lớp z là đúng.
      for (const m of d.matchAll(/className=(?:\{`|"|`)([^"`]*)/g)) {
        const z = m[1].match(RE_LOP_Z) || [];
        // `dark:z-…` hay `lg:z-…` là hai điều kiện khác nhau, không xung đột.
        const khongDieuKien = z.filter((x) => !m[1].includes(`:${x}`));
        if (khongDieuKien.length > 1) loi.push(`${f}:${i + 1} — ${khongDieuKien.join(' + ')}`);
      }
    });
  }
  assert.deepEqual(loi, [], 'className khai nhiều lớp z, cái nào thắng do thứ tự CSS quyết định:\n  ' + loi.join('\n  '));
});

test('nút chat trôi vẫn ở đúng z đã dùng để đặt mốc', () => {
  // Mốc 120 ở trên chỉ đúng khi con số 110 này đúng. Đổi z của BunnyChat mà quên
  // mốc là mốc lặng lẽ hết tác dụng — cùng loại lỗi bánh cóc 531 đứng yên khi
  // lộ trình lên 710.
  const s = fs.readFileSync(path.join(ROOT, 'src/components/common/BunnyChat.jsx'), 'utf8');
  assert.match(s, new RegExp(`z-\\[${Z_CUA_BUNNY}\\]`),
    `BunnyChat không còn ở z-[${Z_CUA_BUNNY}] — sửa Z_TOI_THIEU trong test này theo`);
});

test('DangMo nằm trên mọi panel nó đứng thế chỗ', () => {
  const zDangMo = doZ(fs.readFileSync(path.join(ROOT, 'src/components/common/DangMo.jsx'), 'utf8'));
  // Nó là lớp "đang tải" của panel: thấp hơn panel thì lúc chuyển tiếp người
  // dùng thấy panel thật mọc lên từ phía sau lớp phủ.
  const zPanel = ['listening/DictationPanel', 'listening/ListeningPassagePanel', 'reading/ReadingLongPanel',
    'writing/WritingPromptPanel', 'speaking/SpeakingPromptPanel', 'exam/BandExamPanel',
    'progress/MockTest', 'progress/ErrorReview', 'vocab/SrsReview', 'vocab/WordNotebook']
    .map((n) => {
      const s = fs.readFileSync(path.join(ROOT, `src/components/${n}.jsx`), 'utf8');
      const d = s.split('\n').find((x) => x.includes('fixed inset-0'));
      return [n, doZ(d || '')];
    });
  const thap = zPanel.filter(([, z]) => z === null || z > zDangMo);
  assert.deepEqual(thap.map(([n, z]) => `${n} z-${z}`), [],
    `DangMo ở z-${zDangMo} nhưng có panel cao hơn nó`);
});
