// File: scripts/ra_nen_toi.mjs
//
//   npm run ra:nentoi
//
// BẬT CHẾ ĐỘ TỐI RỒI ĐI QUA CÁC MÀN LUYỆN TẬP, TÌM MẢNG TRẮNG CÒN SÓT.
//
// ══ VÌ SAO CẦN ══
// Chế độ tối trong dự án này làm bằng tay: mỗi lớp màu sáng phải có một lớp
// `dark:` đi kèm. Thiếu cặp nào thì màn đó vẫn TRẮNG giữa nền tối — chói mắt,
// và ở vài chỗ là chữ trắng trên nền trắng, tức MẤT CHỮ.
//
// Kiểu hỏng này không có lỗi console, không làm hỏng bài kiểm nào, và mắt người
// soát mã cũng khó thấy vì lớp `dark:` thiếu trông y hệt lớp `dark:` không cần.
// Nó chỉ hiện ra khi có người thật mở app ban đêm. Nên phải đo bằng máy.
//
// ══ NÓ ĐO GÌ ══
// Ở mỗi màn: quét mọi phần tử đang hiện, tính ĐỘ SÁNG của màu nền thật sự
// (`getComputedStyle`), rồi báo phần tử nào vừa SÁNG (>0.82) vừa TO
// (>40.000 px², cỡ một tấm thẻ bài tập trở lên). Nền tối thì con số này phải là 0.
//
// Ngưỡng cố tình để rộng: huy hiệu trắng nhỏ, ô đánh dấu, con trỏ… đều lọt qua.
// Thứ bị bắt là mảng lớn — thân thẻ bài, khung câu hỏi, nền bảng.

import { moTrinhDuyet, moTab, BAM_THEO_CHU, BAM_DUNG_NHAN } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

const may = await moMayChuXemTruoc({ cong: 4331 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9345 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

const DIEN_TICH_TOI_THIEU = 40000;
const SANG_TOI_DA = 0.82;

const MANG_TRANG = `(() => {
  const doSang = (mau) => {
    const m = String(mau).match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map((x) => parseFloat(x));
    if (p.length > 3 && p[3] < 0.5) return null;       // gần trong suốt: không tính là nền
    return (0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2]) / 255;
  };
  const ra = [];
  for (const e of document.querySelectorAll('body *')) {
    const r = e.getBoundingClientRect();
    if (r.width < 120 || r.height < 60) continue;
    const dt = r.width * r.height;
    if (dt < ${DIEN_TICH_TOI_THIEU}) continue;
    const s = getComputedStyle(e);
    if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) < 0.1) continue;
    const sang = doSang(s.backgroundColor);
    if (sang === null || sang <= ${SANG_TOI_DA}) continue;
    ra.push({
      the: e.tagName.toLowerCase(),
      lop: (e.className && e.className.baseVal !== undefined ? e.className.baseVal : String(e.className || '')).slice(0, 70),
      dt: Math.round(dt),
    });
  }
  // Gộp: chỉ giữ mảng lớn nhất của mỗi kiểu lớp, để báo cáo đọc được.
  const gop = new Map();
  for (const x of ra) if (!gop.has(x.lop) || gop.get(x.lop).dt < x.dt) gop.set(x.lop, x);
  return [...gop.values()].sort((a, b) => b.dt - a.dt);
})()`;

const bao = (man, ds) => ghi(`[${man}] không còn mảng trắng lớn ở chế độ tối`,
  Array.isArray(ds) && ds.length === 0,
  Array.isArray(ds) && ds.length
    ? ds.slice(0, 3).map((x) => `<${x.the} class="${x.lop}"> ${x.dt}px²`).join(' | ')
    : '');

try {
  await t.diToi(may.BASE);
  await nghi(1000);
  await t.danhGia(`localStorage.setItem('theme','dark'), true`);
  await t.diToi(may.BASE);
  await nghi(1400);
  await t.doi(`document.documentElement.classList.contains('dark')`, { giay: 10, nhan: 'chế độ tối bật' });
  for (const nhan of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
    await t.danhGia(BAM_THEO_CHU(nhan));
    await nghi(400);
  }
  ghi('bật được chế độ tối', true);

  // ── NGỮ PHÁP → CHỌN BÀI → TRẮC NGHIỆM (QuizEngine) ────────────────────
  // ⚠️ Bản đầu của bộ rà này bấm "NGỮ PHÁP" rồi đo LUÔN — mà chỗ đó mới chỉ là
  // DANH SÁCH BÀI, chưa có tab nào. Nó báo ĐẠT trong khi chưa hề nhìn thấy màn
  // cần đo. Nên từ đây mỗi màn phải TỰ CHỨNG MINH mình đúng chỗ trước khi đo.
  await t.danhGia(BAM_THEO_CHU('NGỮ PHÁP'));
  await nghi(1500);
  await t.danhGia(BAM_THEO_CHU('1. Hiện Tại Đơn'));
  await nghi(1500);
  const moTracNghiem = await t.danhGia(BAM_THEO_CHU('Trắc Nghiệm'));
  await nghi(1500);
  // Không dùng regex ở đây: chuỗi này đi qua một lượt template literal nữa, dấu
  // thoát bị nuốt và biểu thức vỡ ngay giữa. So chuỗi thẳng thì không có bẫy.
  const dungChoQuiz = await t.danhGia(`(() => {
    const s = document.body.innerText;
    return s.includes('Kiểm Tra') || s.includes('Câu 1/') || s.includes('Chọn đáp án');
  })()`);
  ghi('[Ngữ pháp · Trắc Nghiệm] mở đúng màn trắc nghiệm', !!moTracNghiem && !!dungChoQuiz);
  if (moTracNghiem && dungChoQuiz) bao('Ngữ pháp · Trắc Nghiệm', await t.danhGia(MANG_TRANG));

  // ── OXFORD → TỪNG TAB LUYỆN TẬP ────────────────────────────────────────
  // Nhãn phải khớp NGUYÊN VĂN: `BAM_THEO_CHU` dò kiểu "chứa", nên tab tên "AI"
  // trúng ngay nút "KHÓA AI (API KEY)" ở ngăn kéo — bộ rà tưởng đã mở tab AI
  // trong khi nó vừa mở hộp nhập khoá. Đúng loại tự bẫy đã dính hai lần trước.
  await t.danhGia(BAM_THEO_CHU('OXFORD'));
  await nghi(3000);
  for (const tab of ['Thẻ Nhớ', 'Ghép Từ', 'Gõ Từ', 'Làm Test', 'AI']) {
    const bam = await t.danhGia(BAM_DUNG_NHAN(tab));
    if (!bam) { ghi(`[Oxford · ${tab}] mở được tab`, false, 'không thấy tab tên đúng như vậy'); continue; }
    await nghi(1600);
    ghi(`[Oxford · ${tab}] mở được tab`, true);
    bao(`Oxford · ${tab}`, await t.danhGia(MANG_TRANG));
  }

  const loi = t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));
  ghi('không có lỗi console / ngoại lệ', loi.length === 0,
    loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 130)}`).join(' | '));
} catch (e) {
  ghi('bộ rà chạy hết không vấp', false, String(e?.message || e));
} finally {
  const dat = ket.filter((k) => k.ok).length;
  console.log(`\nbước đạt: ${dat}/${ket.length}`);
  t.dong();
  tienTrinh.kill();
  may.dung?.();
  process.exit(dat === ket.length ? 0 : 1);
}
