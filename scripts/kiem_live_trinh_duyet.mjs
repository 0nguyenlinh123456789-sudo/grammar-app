// File: scripts/kiem_live_trinh_duyet.mjs
//
//   npm run kiem:live                       # kiểm bản đang chạy trên mạng
//   LIVE_BASE=http://... npm run kiem:live  # kiểm một địa chỉ khác
//
// KIỂM BẢN LIVE BẰNG CÁCH MỞ THẬT, không bằng cách đoán qua tên chunk.
//
// Vì sao cần cả bộ này lẫn `check_live_strings.mjs`: bộ kia dò tên chunk bằng
// cách tìm chữ trong mã đã gói, và **nó có điểm mù đo được** — 19/08 nó báo thiếu
// hai chuỗi trên live, mà mở trình duyệt ra thì chunk `VocabVstepPage-*.js` có
// đủ cả hai. Bộ này để chính app tự nạp chunk của nó (bấm vào đúng mục), rồi mới
// đọc — nên không có gì để đoán sai.
//
// Nó cũng trả lời được một câu bộ kia không trả lời được: **khách có vào được app
// không**, hay bị kẹt ở màn kích hoạt. Ở đây KHÔNG chặn `/api/access`: bản live
// có API thật, và việc kiểm được cổng đó còn sống là một phần của phép kiểm.

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';

const BASE = process.env.LIVE_BASE || 'https://grammar-app-gray.vercel.app';
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9338 });
const t = await moTab(cong);
try {
  await t.diToi(BASE);
  await new Promise((r) => setTimeout(r, 2500));
  const daKichHoat = await t.danhGia("document.body.innerText.includes('TÌM TRONG KHÓA HỌC')");
  console.log('vào được app (không kẹt màn kích hoạt):', daKichHoat);

  for (const n of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
    await t.danhGia(BAM_THEO_CHU(n)); await new Promise((r) => setTimeout(r, 500));
  }
  await t.danhGia(BAM_THEO_CHU('CHỦ ĐỀ'));
  await new Promise((r) => setTimeout(r, 4000));

  // Chunk VocabVstepPage ĐÃ được nạp chưa, và bản trên live có phải bản mới không?
  const kq = await t.danhGia(`(() => {
    const src = [...document.querySelectorAll('script[src]')].map(s => s.src);
    return {
      soChuMain: (document.querySelector('main') || document.body).innerText.trim().length,
      coChuoiMoi: [...document.querySelectorAll('script')].length,
      tenChunkDaNap: performance.getEntriesByType('resource').map(r => r.name).filter(n => /assets\\/.*\\.js/.test(n)).map(n => n.split('/').pop()),
    };
  })()`);
  const vocab = kq.tenChunkDaNap.filter((n) => /Vocab/i.test(n));
  console.log('main:', kq.soChuMain, 'ký tự | chunk Vocab đã nạp:', vocab.join(' ') || '(không có)');

  // Tải đúng chunk đó về và tìm chuỗi — đây mới là bằng chứng dứt điểm.
  for (const ten of vocab) {
    const txt = await (await fetch(`${BASE}/assets/${ten}`)).text();
    console.log(`  ${ten}: có "Không tìm thấy chủ đề từ vựng"? `,
      txt.includes('Không tìm thấy chủ đề từ vựng'),
      '| có "Đang tải chủ đề từ vựng"?', txt.includes('Đang tải chủ đề từ vựng'));
  }
} catch (e) {
  console.log('DỪNG:', e.message);
} finally {
  t.dong(); tienTrinh.kill(); setTimeout(() => process.exit(0), 300);
}
