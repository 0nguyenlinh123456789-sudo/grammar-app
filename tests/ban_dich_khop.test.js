// BẢN DỊCH TIẾNG VIỆT PHẢI KHỚP ĐÚNG CÂU TIẾNG ANH NÓ DỊCH.
//
// ══ LỖ CHƯA XẢY RA, NHƯNG KHÔNG CÓ GÌ CHẶN ══
// 34 bài đọc A1/A2 được viết lại ngày 19/08 đổi CẢ `storyEn` LẪN `storyVi`.
// `scripts/viet_lai_bai_doc.mjs` kiểm hai mảng câu KHỚP SỐ LƯỢNG trước khi ghi —
// nhưng số lượng khớp không có nghĩa là thứ tự khớp. Một mảng `vi` đúng 15 câu mà
// lệch thứ tự so với `en` sẽ đi qua:
//   · phép kiểm số lượng của bộ ghi,
//   · toàn bộ bộ test (không test nào khác so hai thứ tiếng với nhau),
//   · và cả ảnh chụp `story_caps` (nó băm `storyEn`, không nhìn `storyVi`).
// Người học sẽ đọc một câu tiếng Anh cạnh bản dịch của một câu khác.
//
// ══ ĐO ĐƯỢC BẰNG GÌ, VÀ ĐO ĐƯỢC BAO NHIÊU ══
// Máy không so được NGHĨA. Mốc neo duy nhất đi qua bản dịch nguyên vẹn là **tên
// riêng**: câu tiếng Anh có "Kien" thì câu tiếng Việt cùng chỉ số phải có "Kiên".
// Dấu được gỡ trước khi so (Kiên→Kien, Tuấn→Tuan, Bảy→Bay, Đức→Duc).
//
// ⚠️ NÓI THẲNG ĐỘ PHỦ THẬT, vì bản đầu của chính file này khai sai. Tôi viết rằng
// "các câu có tên nằm rải khắp bài" nên phép kiểm đủ để bắt lệch thứ tự. **ĐO LẠI
// THÌ SAI:** trong 511 câu của 34 bài chỉ có **34 câu chứa tên riêng (7%)**, và
// **24 trong 34 bài KHÔNG có câu nào chứa tên**. Nên:
//
//   · Nó BẮT ĐƯỢC: mảng `vi` bị xê dịch cả khối (thêm/xoá một câu) ở **10 bài** có
//     tên riêng — đó là kiểu hỏng dễ xảy ra nhất khi sửa tay, vì nó làm lệch mọi câu.
//   · Nó KHÔNG BẮT ĐƯỢC: đổi chỗ hai câu không chứa tên, và bất cứ lệch nào trong
//     24 bài còn lại. Đã thử: đổi chỗ hai câu dịch trong `sports-fitness-daily` mà
//     cả hai đều không có tên → test vẫn xanh.
//
// Phần 24 bài kia hiện chỉ có mắt người kiểm: đã đọc đối chiếu 12 cặp câu giữa bài
// ở cả sáu đợt viết lại và chúng khớp. Ghi ra đây để phiên sau biết chỗ nào là máy
// canh và chỗ nào là người đã đọc — chứ không đọc file này rộng hơn sự thật.
//
// ⚠️ TEST NÀY TỰ CANH CHÍNH NÓ: nếu số cặp thật sự được so tụt xuống thì nó ĐỎ.
// Không có dòng đó thì một lỗi trong hàm tách câu hay danh sách tên sẽ làm phép
// kiểm so 0 cặp mà vẫn xanh — đúng loại "test không thể fail" đã dính hai lần
// trong dự án này (phép đếm lớp z, và chốt tự-báo-cáo dùng regex).

import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadTopics } from '../scripts/check_topic_word_counts.mjs';

const ROOT = path.resolve('.');
const { PHAN_LOAI_A1, PHAN_LOAI_A2 } = await import(
  pathToFileURL(path.join(ROOT, 'scripts/data/a1a2_phan_loai.mjs')).href);

const topics = await loadTopics();
const theoId = new Map(topics.map((t) => [t.id, t]));

// Chặng đã viết lại tự khai bằng tiền tố trong lý do — cùng một chỗ khai, không
// phải một danh sách thứ hai có thể lệch với thực tế.
const DA_VIET_LAI = [...Object.entries(PHAN_LOAI_A1), ...Object.entries(PHAN_LOAI_A2)]
  .filter(([, m]) => String(m.vi || '').startsWith('ĐÃ VIẾT LẠI'))
  .map(([id]) => id);

const TEN = ['Mai', 'Bo', 'Mun', 'Chi', 'Long', 'Hoa', 'Kien', 'Lan', 'Hung',
  'Duc', 'Tuan', 'Bay', 'Ngan', 'Nam', 'Tet'];

/** Gỡ dấu tiếng Việt: Kiên→Kien, Đức→Duc. */
const boDau = (s) => String(s)
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd').replace(/Đ/g, 'D');

const tachCau = (s) => String(s || '').split(/(?<=[.!?])\s+/).filter((c) => c.trim().length > 3);

test('có đúng 34 chặng khai "ĐÃ VIẾT LẠI" — không sót, không tự nhân lên', () => {
  assert.equal(DA_VIET_LAI.length, 34,
    `đang có ${DA_VIET_LAI.length} chặng khai đã viết lại, chờ 34`);
});

test('mỗi bài viết lại có số câu Việt BẰNG số câu Anh', () => {
  const lech = [];
  for (const id of DA_VIET_LAI) {
    const t = theoId.get(id);
    assert.ok(t, `${id}: không tìm thấy chủ đề`);
    const en = tachCau(t.storyEn);
    const vi = tachCau(t.storyVi);
    if (en.length !== vi.length) lech.push(`${id}: ${en.length} câu Anh / ${vi.length} câu Việt`);
  }
  assert.deepEqual(lech, [], `bản dịch lệch số câu:\n  ${lech.join('\n  ')}`);
});

test('TÊN RIÊNG trong câu tiếng Anh phải có mặt trong ĐÚNG câu tiếng Việt tương ứng', () => {
  let soCapDaSo = 0;
  const baiCoTen = new Set();
  const hong = [];

  for (const id of DA_VIET_LAI) {
    const t = theoId.get(id);
    const en = tachCau(t.storyEn);
    const vi = tachCau(t.storyVi);
    if (en.length !== vi.length) continue;   // đã báo ở test trên

    for (let i = 0; i < en.length; i += 1) {
      const trongCau = TEN.filter((n) => new RegExp(`\\b${n}\\b`).test(en[i]));
      if (!trongCau.length) continue;
      soCapDaSo += 1;
      baiCoTen.add(id);
      const viKhongDau = boDau(vi[i]);
      for (const n of trongCau) {
        if (!new RegExp(`\\b${n}\\b`).test(viKhongDau)) {
          hong.push(`${id} câu ${i}: tiếng Anh có "${n}" mà bản dịch cùng chỉ số thì không`
            + `\n      EN: ${en[i]}\n      VI: ${vi[i]}`);
        }
      }
    }
  }

  // Tự canh chính nó, ghim ĐÚNG con số đo được (34 cặp / 10 bài) chứ không ghim
  // một con số tròn cho dễ nhìn: ghim thấp hơn thực tế là để mất phần đang có.
  assert.equal(soCapDaSo, 34,
    `so được ${soCapDaSo} cặp câu có tên riêng thay vì 34 — hàm tách câu hoặc danh sách tên `
    + 'đã đổi, và độ phủ thật của phép kiểm này không còn như phần chú thích ở đầu file nói');
  assert.equal(baiCoTen.size, 10,
    `phép kiểm chỉ với tới ${baiCoTen.size} bài thay vì 10 — cập nhật lại chú thích độ phủ`);

  assert.deepEqual(hong, [], `${hong.length} chỗ bản dịch lệch câu:\n  ${hong.join('\n  ')}`);
});

test('không câu dịch nào rỗng hoặc chỉ là bản chép lại nguyên văn tiếng Anh', () => {
  const hong = [];
  for (const id of DA_VIET_LAI) {
    const t = theoId.get(id);
    const en = tachCau(t.storyEn);
    const vi = tachCau(t.storyVi);
    for (let i = 0; i < Math.min(en.length, vi.length); i += 1) {
      if (vi[i].trim().length < 8) hong.push(`${id} câu ${i}: câu dịch quá ngắn — "${vi[i]}"`);
      if (vi[i].trim() === en[i].trim()) hong.push(`${id} câu ${i}: câu dịch trùng nguyên văn tiếng Anh`);
    }
  }
  assert.deepEqual(hong, [], hong.join('\n  '));
});
