// File: scripts/ra_dien_thoai.mjs
//
//   npm run ra:dienthoai
//
// MỞ APP Ở ĐÚNG KHỔ MÁY ĐIỆN THOẠI VÀ ĐO NHỮNG THỨ LÀM "GIAO DIỆN BỊ LỖI, MẤT".
//
// Chủ dự án báo 28/08: "đồng bộ giao diện web tránh khi mở điện thoại giao diện
// bị lỗi, mất". Bốn thứ đo được, mỗi thứ ứng với một lỗi đã tìm ra hôm đó:
//
//   1. TRÀN NGANG — `scrollWidth > clientWidth` ở cấp tài liệu.
//   2. NÚT CHÍNH CỦA TRANG CHỦ có hiện đủ TÊN CHẶNG không. Bản cũ để một dòng
//      kèm `truncate`: ở 360px cần 511px mà chỉ có 162px, tức 68% bị cắt — và
//      phần bị cắt luôn là tên chặng, thứ duy nhất nói "bấm vào đây học gì".
//   3. MỤC TRONG NGĂN KÉO CÓ VỚI TỚI ĐƯỢC KHÔNG. Khối điều hướng cao 629px cố
//      định; trên màn 640px chỉ thừa 11px và KHÔNG cuộn được, nên chỉ cần thêm
//      một mục là mục cuối rơi khỏi màn vĩnh viễn.
//   4. NÚT NỔI ĐÈ LÊN MỤC NGĂN KÉO — hỏi `elementFromPoint` ngay giữa mỗi mục.
//
// Không đo "đẹp/xấu" — chỉ đo thứ có số.

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));
const MAY = [
  { ten: 'Android nhỏ', w: 360, h: 640 },
  { ten: 'iPhone 14/15', w: 390, h: 844 },
  { ten: 'điện thoại lớn', w: 414, h: 896 },
];

const may = await moMayChuXemTruoc({ cong: 4327 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9341 });

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

const TRAN_NGANG = `document.documentElement.scrollWidth - document.documentElement.clientWidth`;

// Mục điều hướng trong ngăn kéo: nút/thẻ nằm trong <aside id="main-navigation">.
// Đo hai thứ cho mỗi mục: có nằm trong màn hình không, và nếu không thì có tổ
// tiên nào cuộn được để với tới không.
const MUC_NGAN_KEO = `(() => {
  const a = document.getElementById('main-navigation');
  if (!a) return null;
  const cao = window.innerHeight;
  const ds = [...a.querySelectorAll('button, a')].filter((e) => e.offsetParent !== null);
  const cuonDuoc = (e) => {
    for (let p = e.parentElement; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (/auto|scroll/.test(s.overflowY) && p.scrollHeight > p.clientHeight + 2) return true;
    }
    return false;
  };
  const ngoai = [];
  for (const e of ds) {
    const r = e.getBoundingClientRect();
    if (r.bottom > cao + 1 && !cuonDuoc(e)) ngoai.push(((e.innerText || '').trim().split('\\n')[0] || '?').slice(0, 34) + ' (đáy ' + Math.round(r.bottom) + '/' + cao + ')');
  }
  return { tong: ds.length, ngoai };
})()`;

// Nút nổi đè lên mục nào: hỏi phần tử nằm trên cùng ngay giữa từng mục.
const BI_DE = `(() => {
  const a = document.getElementById('main-navigation');
  if (!a) return null;
  const ra = [];
  for (const e of [...a.querySelectorAll('button, a')].filter((x) => x.offsetParent !== null)) {
    const r = e.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) continue;
    const tren = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    if (tren && !a.contains(tren)) ra.push(((e.innerText || '').trim().split('\\n')[0] || '?').slice(0, 30));
  }
  return ra;
})()`;

// Nút "HỌC 15 PHÚT HÔM NAY": có hiện đủ tên chặng không.
const NUT_CHINH = `(() => {
  const b = [...document.querySelectorAll('button')].find((x) => (x.innerText || '').includes('HỌC 15 PHÚT HÔM NAY'));
  if (!b) return null;
  // Phần tử mang TÊN CHẶNG là span cuối trong khối chữ (span đầu là nhãn).
  const spans = [...b.querySelectorAll('span')];
  const ten = spans[spans.length - 1];
  if (!ten) return { thay: false };
  const r = ten.getBoundingClientRect();
  return {
    thay: r.width > 0 && r.height > 0,
    chu: (ten.innerText || '').trim().slice(0, 40),
    // Bị cắt ngang hay không: chữ rộng hơn ô chứa nó.
    biCat: ten.scrollWidth > ten.clientWidth + 1,
  };
})()`;

try {
  for (const m of MAY) {
    const t = await moTab(cong);
    await t.goi('Emulation.setDeviceMetricsOverride', { width: m.w, height: m.h, deviceScaleFactor: 2, mobile: true });
    await t.diToi(may.BASE);
    await nghi(1500);
    for (const nhan of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
      await t.danhGia(BAM_THEO_CHU(nhan));
      await nghi(450);
    }

    const tran = await t.danhGia(TRAN_NGANG);
    ghi(`[${m.ten} ${m.w}×${m.h}] không tràn ngang`, tran <= 0, `thừa ${tran}px`);

    const nut = await t.danhGia(NUT_CHINH);
    ghi(`[${m.ten}] nút "HỌC 15 PHÚT" hiện ĐỦ tên chặng`,
      !!nut && nut.thay && !nut.biCat,
      nut ? `"${nut.chu}"${nut.biCat ? ' — BỊ CẮT' : ''}` : 'không thấy nút');

    // Mở ngăn kéo rồi mới đo được các mục điều hướng.
    await t.danhGia(BAM_THEO_CHU('MENU'));
    await nghi(700);
    const muc = await t.danhGia(MUC_NGAN_KEO);
    ghi(`[${m.ten}] mọi mục trong ngăn kéo đều với tới được`,
      !!muc && muc.ngoai.length === 0,
      muc ? `${muc.tong} mục · ngoài tầm: ${muc.ngoai.length ? muc.ngoai.join(' | ') : 'không'}` : 'không mở được ngăn kéo');

    const de = await t.danhGia(BI_DE);
    ghi(`[${m.ten}] không mục nào bị lớp nổi đè lên`, Array.isArray(de) && de.length === 0,
      Array.isArray(de) && de.length ? de.join(' | ') : '');

    const loi = t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));
    ghi(`[${m.ten}] không lỗi console`, loi.length === 0,
      loi.slice(0, 2).map((x) => `${x.loai}: ${String(x.text).slice(0, 100)}`).join(' | '));
    t.dong();
  }
} finally {
  const dat = ket.filter((k) => k.ok).length;
  console.log(`\nbước đạt: ${dat}/${ket.length}`);
  tienTrinh.kill();
  may.dong();
  process.exit(dat === ket.length ? 0 : 1);
}
