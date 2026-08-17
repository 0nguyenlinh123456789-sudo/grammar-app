// File: tests/band_co_de.test.js
// Trang chủ quyết định hiện nút "VIẾT/NÓI VỀ CHẶNG NÀY" bằng `src/utils/bandCoDe.js`
// — HAI TẬP CHUỖI chép ra, không phải hỏi kho đề, vì hỏi kho đề là kéo ~305 KB
// dữ liệu vào chunk ai mở app cũng phải tải.
//
// Chép thì phải có bài kiểm đối chiếu, nếu không sẽ có ngày người học bấm một
// cái nút mở ra màn hình trống. Đối chiếu CẢ HAI CHIỀU với kho đề thật.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { COD_DE_VIET, COD_DE_NOI } from '../src/utils/bandCoDe.js';
import { deChoChang } from '../src/utils/writingBank.js';
import { deNoiChoChang } from '../src/utils/speakingBank.js';

const { roadmapData } = await import(pathToFileURL(path.resolve('src/data/roadmapData.js')).href);

function thongKe(tra) {
  const theoBand = new Map();
  for (const band of roadmapData) {
    let co = 0;
    for (const m of band.milestones) if (tra(m)) co += 1;
    theoBand.set(band.level, { co, tong: band.milestones.length });
  }
  return theoBand;
}

test('bậc nào KHAI là có đề viết thì thật sự có đề — và bậc không khai thì không có', () => {
  const tk = thongKe(deChoChang);
  const loi = [];
  for (const [band, { co, tong }] of tk) {
    const khai = COD_DE_VIET.has(band);
    if (khai && co === 0) loi.push(`${band}: khai CÓ đề viết nhưng 0/${tong} chặng có`);
    if (!khai && co > 0) loi.push(`${band}: khai KHÔNG có đề viết nhưng ${co}/${tong} chặng lại có`);
  }
  assert.deepEqual(loi, [], `bandCoDe.js lệch với kho đề viết:\n  ${loi.join('\n  ')}`);
});

test('bậc nào KHAI là có đề nói thì thật sự có đề — và bậc không khai thì không có', () => {
  const tk = thongKe(deNoiChoChang);
  const loi = [];
  for (const [band, { co, tong }] of tk) {
    const khai = COD_DE_NOI.has(band);
    if (khai && co === 0) loi.push(`${band}: khai CÓ đề nói nhưng 0/${tong} chặng có`);
    if (!khai && co > 0) loi.push(`${band}: khai KHÔNG có đề nói nhưng ${co}/${tong} chặng lại có`);
  }
  assert.deepEqual(loi, [], `bandCoDe.js lệch với kho đề nói:\n  ${loi.join('\n  ')}`);
});

// "Khai theo bậc" KHÔNG chính xác tuyệt đối, và đó là lý do panel phải báo ra
// khi chặng được mở không có đề. Test này ghim đúng chỗ chưa khớp đó, kèm con
// số — để nếu nó phình lên thì phải đọc lại cách làm, chứ không âm thầm to dần.
test('số chặng khai CÓ mà thật ra KHÔNG có đề vẫn nằm trong mức đã biết', () => {
  const hut = { viet: [], noi: [] };
  for (const band of roadmapData) {
    for (const m of band.milestones) {
      // Buổi chép chính tả (N4 b′) cố ý KHÔNG có đề viết/nói: 5 câu rời bốc lúc
      // chạy, không có chủ đề nào để viết hay nói về. Bỏ ra khỏi phép đếm "hụt"
      // theo LOẠI chặng, chứ không nới con số ghim — nới con số là che mất chỗ
      // hụt thật nếu sau này có.
      if (m.type === 'dictation') continue;
      if (COD_DE_VIET.has(band.level) && !deChoChang(m)) hut.viet.push(`${band.level}/${m.targetId}`);
      if (COD_DE_NOI.has(band.level) && !deNoiChoChang(m)) hut.noi.push(`${band.level}/${m.targetId}`);
    }
  }
  // Đã biết: 1 chặng — Oxford Unit 26 dạy hậu tố (-ful/-less/-ness) nên không
  // đặt được đề "dùng từ này trong câu".
  assert.ok(hut.viet.length <= 1, `${hut.viet.length} chặng khai có đề viết mà không có: ${hut.viet.slice(0, 5).join(', ')}`);
  assert.equal(hut.noi.length, 0, `${hut.noi.length} chặng khai có đề nói mà không có: ${hut.noi.slice(0, 5).join(', ')}`);
});

test('trang chủ KHÔNG import kho đề — nếu không thì chunk trang chủ phình trở lại', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync('src/pages/WelcomePage.jsx', 'utf8');
  for (const cam of ['writingBank', 'speakingBank', 'writingGenerated', 'speakingGenerated']) {
    assert.ok(!new RegExp(`from '[^']*${cam}`).test(src),
      `WelcomePage.jsx import "${cam}" — kéo kho đề vào chunk trang chủ, xem chú thích trong bandCoDe.js`);
  }
});
