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

// ── TIỆN ÍCH NỔI KHÔNG ĐƯỢC ĐÈ LÊN THANH BÊN (07/09) ────────────────────────
// Đợt thêm panel "Tải bài về máy" / "Cài app vào máy" vào CHÂN thanh bên đã
// tạo ra một lỗi thấy bằng mắt: nút thỏ `fixed left-3 ... z-[110]` nằm gọn
// trong panel tải. Đo ở 1424×805 trước khi sửa:
//     nút thỏ  [12, 733, 56, 56]
//     panel tải [0, 643, 380, 163]
// → 1/15 điểm rải trên panel trả về con thỏ, đúng ô chọn "Bản thu người thật".
// Mốc z-index ở trên KHÔNG bắt được lỗi này: cả hai đều hợp luật, chúng chỉ
// nằm chồng chỗ. Nên phải ghim riêng bằng phép đo vị trí.
const RONG_THANH_BEN = { lg: 20, xl: 24 }; // lg:w-80 = 20rem, xl:w-96 = 24rem

test('nút thỏ trôi lùi qua khỏi thanh bên từ lg trở lên', () => {
  const s = fs.readFileSync(path.join(ROOT, 'src/components/common/BunnyChat.jsx'), 'utf8');
  for (const [khoi, rem] of Object.entries(RONG_THANH_BEN)) {
    const re = new RegExp(String.raw`${khoi}:left-\[(\d+(?:\.\d+)?)rem\]`, 'g');
    const moc = [...s.matchAll(re)];
    assert.ok(moc.length >= 2,
      `BunnyChat thiếu ${khoi}:left — cả NÚT lẫn KHUNG CHAT đều phải lùi, tìm được ${moc.length}/2`);
    for (const m of moc) {
      assert.ok(Number(m[1]) >= rem,
        `${khoi}:left-[${m[1]}rem] còn nằm trong thanh bên rộng ${rem}rem — con thỏ đè lên panel ở chân thanh bên`);
    }
  }
});

test('thanh bên vẫn đúng bề rộng đã dùng để đặt mốc lùi', () => {
  // Cùng loại bánh cóc với "nút chat trôi vẫn ở đúng z": số lùi 21/25rem chỉ
  // đúng khi thanh bên còn là w-80/w-96. Đổi bề rộng mà quên số lùi thì con thỏ
  // lại chui vào trong, và không test nào kêu.
  const s = fs.readFileSync(path.join(ROOT, 'src/layouts/MainLayout.jsx'), 'utf8');
  const d = s.split('\n').find((x) => x.includes('id="main-navigation"'));
  assert.match(d, /lg:w-80/, 'thanh bên không còn lg:w-80 — sửa RONG_THANH_BEN và số lg:left trong BunnyChat');
  assert.match(d, /xl:w-96/, 'thanh bên không còn xl:w-96 — sửa RONG_THANH_BEN và số xl:left trong BunnyChat');
});

test('mọi tiện ích nổi đều nhường chỗ khi ngăn kéo mở', () => {
  // Bản cũ chỉ bọc riêng BunnyChat trong MainLayout, nên huy hiệu gói do
  // AccessGate dựng ở TẦNG TRÊN vẫn đè lên ngăn kéo: đo ở 390×844 thấy huy
  // hiệu chiếm x 228–378 còn ngăn kéo chiếm 0–288.
  const css = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
  assert.match(css, /html\[data-ngan-keo='mo'\] \[data-nhuong-ngan-keo\]/,
    'thiếu luật nhường chỗ — mỗi tiện ích nổi lại phải tự bọc tay và sẽ có cái bị quên');
  assert.match(css, /max-width: 1023px/,
    'luật nhường chỗ không giới hạn dưới lg — máy tính bàn không có ngăn kéo, ẩn đi là mất luôn tiện ích');

  const layout = fs.readFileSync(path.join(ROOT, 'src/layouts/MainLayout.jsx'), 'utf8');
  assert.match(layout, /setAttribute\('data-ngan-keo', 'mo'\)/,
    'không ai bật cờ trên <html> thì luật CSS kia không bao giờ chạy');

  for (const f of ['src/components/common/BunnyChat.jsx', 'src/components/access/AccessGate.jsx']) {
    assert.match(fs.readFileSync(path.join(ROOT, f), 'utf8'), /data-nhuong-ngan-keo/,
      `${f} có phần tử fixed nổi trên ngăn kéo nhưng không gắn data-nhuong-ngan-keo`);
  }
});
