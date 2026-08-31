// File: scripts/di_dong_kiem.mjs
// ĐO NHIỀU BỀ RỘNG THẬT — 320 / 375 / 390 / 414 / tablet 768 — TRÊN MÀN HÌNH
// CÓ THẬT SỰ ẤN CHUYỂN, KHÔNG PHẢI TRÊN HTML TĨNH.
//
// `khach_dung_het.mjs` đã đo 390px cho bốn lối đi (NGỮ PHÁP/CHỦ ĐỀ/OXFORD/
// GAMES). Bộ này đo RIÊNG hai thứ chưa ai đo: **tràn ngang** (horizontal
// overflow — dấu hiệu số một của "vỡ trên điện thoại") ở NĂM bề rộng, và nút
// NỘP BÀI của đề thi có nhìn thấy được ở 320px hay không — màn hẹp nhất, và
// đúng màn hình mà một sticky header/footer dễ che mất nút quan trọng nhất
// của cả bài thi.
import { moTrinhDuyet, moTab, BAM_THEO_CHU, BAM_DUNG_NHAN, DONG_PANEL } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const may = await moMayChuXemTruoc({ cong: 4363 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9343 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};
const cho = (ms) => new Promise((r) => setTimeout(r, ms));
const CHU = '(document.body.innerText || "")';

const setBeRong = (w, h = 800) => t.goi('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: w < 768 });

await t.diToi(`${may.BASE}/?e2e=1`);
await t.doi(`${CHU}.length > 200`, { giay: 40, nhan: 'trang chủ hiện chữ' });
for (let i = 0; i < 8; i += 1) {
  if (await t.danhGia(`${CHU}.includes('LỘ TRÌNH')`)) break;
  const bam = await t.danhGia(BAM_THEO_CHU('Tiếp')) || await t.danhGia(BAM_THEO_CHU('Bắt đầu'))
    || await t.danhGia(BAM_THEO_CHU('Bỏ qua')) || await t.danhGia(BAM_THEO_CHU('Vào học'));
  if (!bam) break;
  await cho(400);
}

const BE_RONG = [320, 375, 390, 414, 768];

// ── 1. TRÀN NGANG Ở TRANG CHỦ / LỘ TRÌNH ────────────────────────────────────
for (const w of BE_RONG) {
  await setBeRong(w);
  await cho(500);
  const tran = await t.danhGia(`document.documentElement.scrollWidth - ${w}`);
  ghi(`${w}px: trang lộ trình không tràn ngang`, tran <= 4, `scrollWidth vượt ${tran}px`);
}

// ── 2. MỞ ĐỀ THI CUỐI BẬC A1, KIỂM NÚT NỘP BÀI Ở 320px ─────────────────────
// Đúng đường đã chứng minh chạy được ở `khach_dung_het.mjs`: sang tab "TẤT CẢ
// LỘ TRÌNH" rồi bấm "VÀO THI" trên cửa ải ĐẦU TIÊN (A1) — cửa ải là thẻ
// `<div onClick>`, không phải `<button>` gắn nhãn "CỬA ẢI CUỐI BẬC".
await setBeRong(1280, 900);
await cho(400);
await t.danhGia(BAM_THEO_CHU('TẤT CẢ LỘ TRÌNH'));
await cho(1200);
const moDuocDe = await t.danhGia(BAM_DUNG_NHAN('VÀO THI'));
await cho(1200);
const dangODe = await t.danhGia(`${CHU}.includes('Nghe') || ${CHU}.includes('Đọc')`);
ghi('mở được đề thi cuối bậc A1', moDuocDe && dangODe, dangODe ? 'đã vào màn thi' : `bấm VÀO THI: ${moDuocDe} · vào màn thi: ${dangODe}`);

if (dangODe) {
  for (const w of [320, 375, 414]) {
    await setBeRong(w, 700);
    await cho(600);
    const nut = await t.danhGia(`(() => {
      const ds = [...document.querySelectorAll('button')]
        .filter((e) => /nộp bài|nộp|xem kết quả/i.test((e.innerText||'').trim()));
      const el = ds[ds.length - 1];
      if (!el) return { thay: false };
      const r = el.getBoundingClientRect();
      return { thay: r.width > 0 && r.height > 0, trongManHinh: r.top >= 0 && r.bottom <= ${800} && r.left >= 0 && r.right <= ${w}, w: r.width, h: r.height };
    })()`);
    ghi(`đề thi ở ${w}px: nút NỘP/kết quả tồn tại và có kích thước bấm được`,
      nut.thay && nut.w >= 32 && nut.h >= 28,
      nut.thay ? `${nut.w.toFixed(0)}×${nut.h.toFixed(0)}px, trong khung: ${nut.trongManHinh}` : 'KHÔNG tìm thấy nút');
  }
}

const LOC = (x) => x.loai !== 'CONSOLE_WARN' && !/AudioContext/i.test(String(x.text));
const loi = t.nhatKy.filter(LOC);
ghi('không có lỗi console trong toàn bộ đợt đổi bề rộng', loi.length === 0,
  loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 90)}`).join(' ; ') || 'sạch');

const SO_BUOC = BE_RONG.length + 1 + (dangODe ? 3 : 0) + 1;
// Bản cũ gọi `tienTrinh.dong?.()` — hàm đó KHÔNG TỒN TẠI, `?.` nuốt lỗi nên Chrome và
// máy chủ xem trước sống tiếp, và vì lối thoát duy nhất nằm trong nhánh HỎNG,
// bộ rà treo vĩnh viễn đúng lúc mọi bước đều ĐẠT.
t.dong();
tienTrinh.kill();
may.dong();

if (ket.length !== SO_BUOC) { console.log(`\n❌ MẤT BƯỚC: ${ket.length}/${SO_BUOC}.`); process.exit(1); }
const hong = ket.filter((k) => !k.ok);
if (hong.length) {
  console.log('\nBƯỚC HỎNG:');
  for (const h of hong) console.log(`  · ${h.buoc} — ${h.chiTiet}`);
  process.exit(1);
}
console.log(`\nbước đạt: ${SO_BUOC}/${SO_BUOC}`);
// Thoát tường minh: nhánh HỎNG có `process.exit(1)`, nhánh ĐẠT thì trước đây
// không có gì cả — nên bộ rà chỉ treo khi mọi thứ đều ổn.
process.exit(0);
