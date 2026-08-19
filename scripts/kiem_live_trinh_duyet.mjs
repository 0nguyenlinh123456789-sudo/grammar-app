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
// Nó cũng trả lời được một câu bộ kia không trả lời được: **cổng mã truy cập trên
// bản live xử sự thế nào**.
//
// ⚠️ TỰ ĐÍNH CHÍNH 19/08 — BẢN CŨ CỦA FILE NÀY NÓI NGƯỢC VỚI VIỆC NÓ LÀM.
// Chú thích cũ ghi: "Ở đây KHÔNG chặn /api/access". Sai. Nó gọi `moTab(cong)`,
// và `moTab` bản cũ chặn `/api/access` VÔ ĐIỀU KIỆN rồi trả lời
// `{ authenticated: true, plan: "premium" }`. Nên dòng nó in ra —
// "vào được app (không kẹt màn kích hoạt): true" — là đo trên một phiên ĐÃ ĐƯỢC
// GIẢ LÀ đã mua. Nó không kiểm cổng; nó bỏ qua cổng rồi báo là qua được.
//
// Đo lại bằng curl thì cổng chạy ĐÚNG: `GET /api/access` trả về
// `401 {"authenticated":false}`, và `DEV_BYPASS` tắt ở bản phát hành, nên khách
// chưa có mã GẶP cổng — đúng như một sản phẩm bán theo mã phải làm. Tức con số
// cũ vừa đo sai đối tượng, vừa in ra một kết luận trái với sự thật.
//
// Nay chia làm hai phiên, mỗi phiên nói rõ nó là phiên nào:
//   · phiên KHÁCH LẠ (`chanApi: false`) — đi qua cổng thật;
//   · phiên ĐÃ MUA (`chanApi: true`) — mới vào được bài học để kiểm chunk.

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';

const BASE = process.env.LIVE_BASE || 'https://grammar-app-gray.vercel.app';
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9338 });
// ── PHIÊN 1: KHÁCH LẠ, đi qua cổng thật ───────────────────────────────────
const khach = await moTab(cong, { chanApi: false });
try {
  await khach.diToi(BASE);
  await new Promise((r) => setTimeout(r, 2500));
  const vaoThang = await khach.danhGia("document.body.innerText.includes('TÌM TRONG KHÓA HỌC')");
  const thayCong = await khach.danhGia("document.body.innerText.includes('MÃ TRUY CẬP') || document.body.innerText.includes('XEM BẢNG GIÁ')");
  // Kỳ vọng ĐÚNG của một sản phẩm bán theo mã: khách lạ KHÔNG vào thẳng được,
  // và thấy được đường mua. Vào thẳng được mới là chuyện đáng báo động.
  console.log('khách lạ vào thẳng bài học được?', vaoThang, vaoThang ? '← CỔNG BỊ HỞ' : '(đúng: bị chặn)');
  console.log('khách lạ thấy được đường mua?     ', thayCong, thayCong ? '' : '← không thấy cổng lẫn bảng giá');
} catch (e) {
  console.log('DỪNG (phiên khách lạ):', e.message);
} finally {
  khach.dong();
}

// ── PHIÊN 2: ĐÃ MUA, để vào được bài học mà kiểm chunk ────────────────────
const t = await moTab(cong);
try {
  await t.diToi(BASE);
  await new Promise((r) => setTimeout(r, 2500));
  const daKichHoat = await t.danhGia("document.body.innerText.includes('TÌM TRONG KHÓA HỌC')");
  console.log('\nphiên GIẢ LÀ ĐÃ MUA — vào được app:', daKichHoat, '(phiên này chặn /api/access, không dùng để kết luận về cổng)');

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
