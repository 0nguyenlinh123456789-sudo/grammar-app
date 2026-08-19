// File: scripts/ra_khach.mjs
//
//   npm run ra:khach
//
// ĐÓNG VAI KHÁCH: dựng bản build THẬT (không phải `npm run dev`), mở Chrome
// headless, đi qua trình hướng dẫn ban đầu đúng như khách mới, rồi bấm vào từng
// lối vào — 10 thẻ luyện tập của trang chủ và 6 mục ở thanh bên — ghi lại mọi lỗi
// console, ngoại lệ chưa bắt và request hỏng.
//
// KHÔNG nằm trong `npm test`: nó cần Chrome trên máy và mất khoảng một phút.
// Chạy khi sửa giao diện, hoặc trước khi đẩy một đợt lớn.
//
// ⚠️ NÓ CHỈ MỞ, CHƯA HỌC. Bấm một thẻ và thấy panel mở ra là một chuyện; làm hết
// một buổi chép chính tả, gõ đáp án, bấm chấm điểm là chuyện khác — phần đó chưa
// được phủ, đừng đọc kết quả rộng hơn thế.
//
// ══ BỐN CÁI BẪY ĐÃ DÍNH KHI VIẾT BỘ NÀY ══
//   1. Dấu hiệu nhận panel phải là chuỗi CHỈ CÓ TRONG LỚP PHỦ. Ba bản đầu tôi so
//      chữ với cả trang, mà mọi dấu hiệu chọn ("Bài nghe theo đoạn", "Đọc bài
//      dài"…) đều LÀ TIÊU ĐỀ THẺ ngay trên trang chủ → phép chờ đạt trước cả khi
//      panel kịp mở, rồi báo lỗi oan ở bước sau. Panel luôn nằm trong một
//      `.fixed.inset-0`, thẻ trang chủ thì không: đó là ranh giới đúng.
//   2. Bấm phải khớp ĐÚNG nhãn: `includes('THI')` khớp luôn "THI THỬ NGAY".
//   3. Đo "bị che" phải hỏi về LỚP PHỦ KHÁC, không hỏi phần tử chữ — hai phần tử
//      cùng nằm trong một panel chồng nhau là bố cục bình thường, không phải lỗi.
//      Bản đầu báo "bị che" ở 9/10 panel, tức là chỉ ra được đúng con số không.
//   4. `vite preview` gắn vào "localhost"; trên Windows tên đó có thể chỉ phân
//      giải ra ::1, nên fetch tới 127.0.0.1 bị ERR_CONNECTION_REFUSED. Phải
//      truyền `--host 127.0.0.1`.
//
// Ba lần đầu chạy, bộ này báo 13 rồi 7 rồi 3 "lỗi" — gần như tất cả là lỗi CỦA
// CHÍNH NÓ. Bài học: bộ rà mới thì nghi ngờ bộ rà trước, đừng nghi ngờ app trước.

import { moTrinhDuyet, moTab, BAM_THEO_CHU, BAM_DUNG_NHAN, DONG_PANEL, CHE_BOI_LOP_PHU_KHAC } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

// Dựng bản build THẬT rồi phục vụ nó. Hai cái bẫy của bước này (phải tự chạy
// `vite build` trước, và phải `--host 127.0.0.1`) nay nằm trong chính helper —
// một chỗ cho cả hai bộ rà, để sửa một lần là cả hai cùng đúng.
const may = await moMayChuXemTruoc({ cong: 4319 });
const BASE = may.BASE;

const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9334 });
const t = await moTab(cong);
const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'OK  ' : 'LOI '} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

const soLoi = () => t.nhatKy.length;
const loiMoi = (tu) => t.nhatKy.slice(tu);

try {
  await t.diToi(BASE);
  await new Promise((r) => setTimeout(r, 1500));
  ghi('mở trang chủ', true, `${(await t.danhGia('document.body.innerText.length'))} ký tự`);

  // KHÁCH MỚI GẶP TRÌNH HƯỚNG DẪN TRƯỚC. Nó là lớp phủ z-[150] che toàn màn —
  // đúng như thiết kế. Đi qua nó bằng đúng ba cú bấm mà khách thật bấm, chứ
  // KHÔNG xoá cờ trong localStorage: xoá cờ là bỏ qua một đường mà khách phải đi,
  // và nếu đường đó hỏng thì không ai biết.
  for (const [nhan, nhanBuoc] of [['BẮT ĐẦU NÀO', 'bước 1'], ['TIẾP TỤC', 'bước 2'], ['Để sau, vào học luôn', 'bước 3']]) {
    const truoc = soLoi();
    const bam = await t.danhGia(BAM_THEO_CHU(nhan));
    const lm = loiMoi(truoc).filter((x) => x.loai !== 'CONSOLE_WARN');
    ghi(`hướng dẫn ${nhanBuoc}: "${nhan}"`, bam && !lm.length,
      [bam ? '' : 'không thấy nút', ...lm.map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`)].filter(Boolean).join(' | '));
    await new Promise((r) => setTimeout(r, 600));
  }
  // Xác nhận lớp phủ đã biến mất — nếu còn thì mọi bước sau đều đo nhầm.
  const conPhu = await t.danhGia("!![...document.querySelectorAll('.fixed.inset-0')].find(e => getComputedStyle(e).zIndex === '150')");
  ghi('trình hướng dẫn đã đóng', !conPhu, conPhu ? 'lớp phủ z-150 vẫn còn' : '');

  // --- 10 thẻ luyện tập của trang chủ ---------------------------------------
  // ⚠️ Dấu hiệu phải là chuỗi CHỈ CÓ TRONG PANEL. Bản đầu tôi lấy luôn tiêu đề
  // thẻ ("Đọc bài dài") — mà tiêu đề đó nằm sẵn trên trang chủ, nên phép chờ
  // đạt NGAY LẬP TỨC trong khi panel còn chưa mở, và bước sau đo nhầm cái lớp
  // "Đang mở…". Một phép chờ khớp trước cả khi việc xảy ra thì không phải phép chờ.
  const THE = [
    ['CHÉP CHÍNH TẢ', 'Chậm 0,6×'],
    ['NGHE ĐOẠN', 'Nghe một đoạn'],
    ['ĐỌC BÀI DÀI', 'Đọc bài dài'],
    ['VIẾT', 'Luyện viết'],
    ['NÓI', 'Luyện nói'],
    ['THI THỬ NGAY', 'Thi thử'],
    ['THI', 'Thi cuối bậc'],
    ['ÔN NGAY', 'Ôn Tập Ngắt Quãng'],
    ['SỬA LỖI', 'Học từ lỗi sai'],
    ['MỞ SỔ TAY', 'Sổ tay của tôi'],
  ];
  for (const [nhanNut, dauHieu] of THE) {
    const truoc = soLoi();
    // Bấm ĐÚNG nhãn, không dùng `includes`: nhãn "THI" khớp luôn nút
    // "THI THỬ NGAY" nên bản đầu mở nhầm panel rồi báo lỗi oan.
    const bam = await t.danhGia(BAM_DUNG_NHAN(nhanNut));
    if (!bam) { ghi(`thẻ "${nhanNut}"`, false, 'không tìm thấy nút'); continue; }
    let moDuoc = true; let chiTiet = '';
    try {
      // ⚠️ TÌM TRONG LỚP PHỦ, KHÔNG TÌM TRONG CẢ TRANG. Hai bản trước tôi so chữ
      // với `document.body.innerText`, mà mọi dấu hiệu tôi chọn ("Bài nghe theo
      // đoạn", "Đọc bài dài"…) đều LÀ TIÊU ĐỀ THẺ NGAY TRÊN TRANG CHỦ — nên phép
      // chờ đạt ngay lập tức, trước cả khi panel kịp mở. Panel thì luôn nằm trong
      // một `.fixed.inset-0`, còn thẻ trang chủ thì không: đó là ranh giới đúng.
      await t.doi(`[...document.querySelectorAll('.fixed.inset-0')].some((e) => e.getBoundingClientRect().width > 0 && (e.innerText || '').includes(${JSON.stringify(dauHieu)}))`,
        { giay: 20, nhan: `lớp phủ chứa "${dauHieu}"` });
      // Lớp "Đang mở…" phải biến mất: còn nó nghĩa là chunk chưa tải xong.
      await t.doi("!document.body.innerText.includes('Đang mở')", { giay: 20, nhan: 'lớp Đang mở tắt' });
    } catch (e) { moDuoc = false; chiTiet = e.message; }
    if (moDuoc) {
      // Đo che bằng LỚP PHỦ, không bằng phần tử chữ: hai phần tử cùng nằm trong
      // một panel chồng lên nhau là chuyện bình thường của bố cục, không phải lỗi.
      // Cái đáng lo là một lớp phủ KHÁC nằm đè lên panel.
      const che = await t.danhGia(CHE_BOI_LOP_PHU_KHAC(dauHieu));
      if (che.biChe) { moDuoc = false; chiTiet = `panel z-${che.zPanel} bị lớp z-${che.zTren} đè lên`; }
    }
    const lm = loiMoi(truoc).filter((x) => x.loai !== 'CONSOLE_WARN');
    if (lm.length) { moDuoc = false; chiTiet += ` | ${lm.map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`).join(' ; ')}`; }
    ghi(`thẻ "${nhanNut}"`, moDuoc, chiTiet);
    // đóng panel
    // Đóng bằng `aria-label="Đóng"` — đó là cách MỌI panel khai nút đóng. Bản
    // đầu tôi dò theo chữ ×/X/ĐÓNG, không khớp cái nào, nên panel chồng lên nhau
    // suốt lượt rà và mọi bước sau đo nhầm panel cũ.
    const daDong = await t.danhGia(DONG_PANEL);
    if (!daDong) ghi(`đóng panel sau "${nhanNut}"`, false, 'không tìm thấy nút Đóng');
    await new Promise((r) => setTimeout(r, 900));
  }

  // --- các mục ở thanh bên ---------------------------------------------------
  const MUC = [
    ['NGỮ PHÁP', 'Lý Thuyết'],
    ['CHỦ ĐỀ', 'Nghe – Chọn Nghĩa'],
    ['OXFORD', 'Unit'],
    // `innerText` trả về chữ ĐÃ viết hoa theo CSS `uppercase`, nên dấu hiệu phải
    // viết đúng như mắt thấy chứ không như trong mã nguồn.
    ['QUÉT AI', 'QUÉT ẢNH BẰNG AI'],
    ['GAMES', 'Ghép Đôi'],
    ['LỘ TRÌNH', 'chặng'],
  ];
  for (const [nhan, dauHieu] of MUC) {
    const truoc = soLoi();
    const bam = await t.danhGia(BAM_THEO_CHU(nhan));
    if (!bam) { ghi(`menu "${nhan}"`, false, 'không tìm thấy mục'); continue; }
    await new Promise((r) => setTimeout(r, 1800));
    const co = await t.danhGia(`document.body.innerText.includes(${JSON.stringify(dauHieu)})`);
    const lm = loiMoi(truoc).filter((x) => x.loai !== 'CONSOLE_WARN');
    const soChu = await t.danhGia('document.body.innerText.trim().length');
    let ok = co && soChu > 200 && !lm.length;
    const ct = [
      co ? '' : `không thấy "${dauHieu}"`,
      soChu > 200 ? '' : `chỉ ${soChu} ký tự — gần như trang trắng`,
      ...lm.map((x) => `${x.loai}: ${String(x.text).slice(0, 130)}`),
    ].filter(Boolean).join(' | ');
    ghi(`menu "${nhan}"`, ok, ct);
  }

  // --- tổng kết nhật ký ------------------------------------------------------
  console.log('\n===== TOÀN BỘ NHẬT KÝ =====');
  const gom = new Map();
  for (const x of t.nhatKy) {
    const k = `${x.loai} :: ${String(x.text).slice(0, 150)}`;
    gom.set(k, (gom.get(k) || 0) + 1);
  }
  for (const [k, n] of gom) console.log(`  ${n}× ${k}`);
  console.log(`\nbước đạt: ${ket.filter((x) => x.ok).length}/${ket.length}`);
} catch (e) {
  console.log('RÀ DỪNG GIỮA CHỪNG:', e.message);
  console.log('nhật ký tới lúc đó:', JSON.stringify(t.nhatKy.slice(0, 10), null, 1));
} finally {
  t.dong();
  tienTrinh.kill();
  may.dong();
  setTimeout(() => process.exit(0), 300);
}
