// File: tests/loi_khai_het_dung.test.js
// GHIM MỘT LỨA LỖI ĐÃ DÍNH BA LẦN: **LỜI KHAI ĐÚNG LÚC VIẾT, HẾT ĐÚNG VỀ SAU.**
//
// Ba chỗ, cùng một hình dạng, phát hiện ở ba thời điểm khác nhau:
//
//   1. `skillProfile.js` — "kho không có một file âm thanh giọng người thật nào";
//   2. `LearningReport.jsx` — in ra TỜ GIẤY ĐƯA PHỤ HUYNH: "ứng dụng chưa có bài
//      nghe giọng người thật, chưa có đề viết và đề nói được chấm";
//   3. `AccessGate.jsx` — trang bán hàng chỉ dám hứa "nghe phát âm chuẩn từng từ".
//
// Cả ba đều ĐÚNG lúc viết ra. Nay kho có 239 bản thu, 60 bài nghe, 621 đề viết
// và 620 đề nói. Không có test nào đỏ, vì không có gì sai về mặt mã — chỉ có
// những câu tiếng Việt lặng lẽ trở thành lời nói xấu chính kho nội dung của
// mình, và một trong số đó in ra giấy cho người ngoài đọc.
//
// ══ THƯỚC ĐO Ở ĐÂY ══
// Không quét theo từ khoá cảm tính. Với mỗi lời khai "KHÔNG CÓ X", đối chiếu
// thẳng với KHO THẬT: kho có X thì câu đó là sai, hết. Kho lớn lên là test này
// đỏ, đúng lúc cần đỏ.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { audioManifest } from '../src/data/audioManifest.js';
import { listeningPassages } from '../src/data/listeningPassages.js';
import { SO_DE_THEO_CHANG } from '../src/data/writingCounts.js';
import { SO_DE_NOI_THEO_CHANG } from '../src/data/speakingCounts.js';

const SRC = 'src';
function moiFile(dir, ra = []) {
  for (const t of readdirSync(dir)) {
    const p = path.join(dir, t);
    if (statSync(p).isDirectory()) moiFile(p, ra);
    else if (/\.(js|jsx)$/.test(t)) ra.push(p);
  }
  return ra;
}

// Chỉ soi chuỗi HIỆN RA cho người đọc. Bình luận giải thích "vì sao đã bỏ câu
// đó" mà bị tính là vi phạm thì test tự đỏ vì chính lời giải thích của mình —
// đúng bẫy `speaking_bank.test.js` và `c1_branch.test.js` đã dính.
const boBinhLuan = (src) => src
  .split('\n')
  .filter((d) => !/^\s*(\/\/|\*|\/\*)/.test(d))
  .join('\n');

/**
 * Mỗi mục: một lời khai "không có X" + phép đếm kho thật cho X.
 * Kho có > 0 mà chuỗi vẫn còn trong mã ⇒ đỏ, kèm đúng con số phản chứng.
 */
const LOI_KHAI = [
  {
    mau: /không có (một )?file âm thanh giọng người thật nào|chưa có file âm thanh nào trong kho/,
    kho: () => audioManifest.length,
    ten: 'bản thu giọng người thật',
  },
  {
    mau: /chưa có bài nghe giọng người thật|chưa có bài nghe đoạn dài/,
    kho: () => listeningPassages.length,
    ten: 'bài nghe',
  },
  {
    mau: /chưa có ngân hàng đề viết|chưa có đề viết và/,
    kho: () => SO_DE_THEO_CHANG,
    ten: 'đề viết gắn theo chặng',
  },
  {
    mau: /chưa có đề nói và cách chấm|chưa có ngân hàng đề nói/,
    kho: () => SO_DE_NOI_THEO_CHANG,
    ten: 'đề nói gắn theo chặng',
  },
];

// Tự kiểm thước TRƯỚC khi kết luận: bộ quét đọc trượt hết file thì test xanh
// rực trong khi nó chưa soi được gì.
test('bộ quét đọc được mã nguồn thật — không kết luận trên một cái thước hỏng', () => {
  const ds = moiFile(SRC);
  assert.ok(ds.length >= 50, `chỉ đọc được ${ds.length} file trong src/ — thước hỏng`);
  const gop = ds.map((f) => readFileSync(f, 'utf8')).join('\n');
  assert.ok(/Chưa đo được/.test(gop), 'bộ quét không thấy nổi một chuỗi chắc chắn có thật');
});

test('không chuỗi nào HIỆN RA nói kho thiếu thứ mà kho đang có', () => {
  const viPham = [];
  for (const f of moiFile(SRC)) {
    const src = boBinhLuan(readFileSync(f, 'utf8'));
    for (const lk of LOI_KHAI) {
      const m = src.match(lk.mau);
      if (!m) continue;
      const co = lk.kho();
      if (co > 0) viPham.push(`${f}: “${m[0]}” — nhưng kho đang có ${co} ${lk.ten}`);
    }
  }
  assert.deepEqual(viPham, [],
    'lời khai sau đã HẾT ĐÚNG (kho lớn lên nhưng câu chữ đứng yên):\n  ' + viPham.join('\n  '));
});

// Câu ĐÚNG cần nói vẫn phải còn: gỡ lời khai sai đi mà không thay bằng lý do
// thật thì người đọc mất luôn thông tin, và đó là cách "sửa" tệ thứ hai.
test('lý do “chưa đo được” nói về CÁI ĐO, không về CÁI CÓ', async () => {
  const { NOT_MEASURED_REASON } = await import('../src/utils/skillProfile.js');
  for (const [key, ly] of Object.entries(NOT_MEASURED_REASON)) {
    assert.ok(/kiểm tra đầu vào/.test(ly),
      `lý do của "${key}" không nói ra rằng đây là giới hạn của BÀI TEST ĐẦU VÀO — mà đó mới là lý do thật`);
    assert.ok(ly.length > 60, `lý do của "${key}" quá ngắn để người đọc biết phải làm gì tiếp`);
  }
});

// Tờ giấy này đi ra ngoài cho người khác đọc, nên nó bị soi riêng.
test('báo cáo phụ huynh nói đúng vì sao ba kỹ năng không có số, và chỉ đường đi tiếp', () => {
  const rp = readFileSync('src/components/progress/LearningReport.jsx', 'utf8');
  assert.ok(/bài kiểm tra đầu vào<\/b>, và bài đó chỉ hỏi/.test(rp),
    'báo cáo không nói ra rằng bảng kỹ năng chỉ lấy từ test đầu vào');
  assert.ok(/KHÔNG có nghĩa ứng dụng thiếu nội dung/.test(rp),
    'phải chặn thẳng cách hiểu "không có số nghĩa là không có nội dung"');
  assert.ok(/bài thi cuối bậc/.test(rp), 'phải chỉ ra chỗ lấy được con số cho bốn kỹ năng');
  assert.ok(/không chấm phát âm/.test(rp), 'và vẫn phải nói rõ cái app KHÔNG làm được');
});
