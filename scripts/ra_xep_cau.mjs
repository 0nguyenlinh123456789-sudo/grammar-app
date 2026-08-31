// File: scripts/ra_xep_cau.mjs
//
//   npm run ra:xepcau
//
// CHƠI THẬT MỘT VÁN "XẾP CÂU", KHÔNG CHỈ MỞ TAB RA NHÌN.
//
// ══ VÌ SAO CÓ BỘ NÀY ══
// Chủ dự án gửi ảnh chụp tab "Xếp Câu" của bài b1_01: thẻ từ hiện đủ, mà Ô THẢ
// TỪ TRỐNG RỖNG. Bấm chữ không thấy gì rơi xuống.
//
// Nguyên nhân đo được (commit bdb161c, 26/08): `chuanHoaCauMau` LUÔN dựng object
// mới cho mọi câu, kể cả khuôn A vốn chỉ cần trả lại chính nó. `SentenceBuilder`
// gọi hàm đó THẲNG TRONG THÂN COMPONENT rồi đưa `curr` vào mảng phụ thuộc của
// `useEffect` — nên mỗi lần vẽ lại là một `curr` MỚI, effect chạy lại, và effect
// đó `setSel([])` + xáo lại `avail`. Người học bấm một chữ → state đổi → vẽ lại →
// effect xoá đúng chữ vừa bấm. Trò chơi không thể chơi được, ở CẢ 78 bài.
//
// Bản CŨ không dính vì nó `return s` (chính object của props) cho khuôn A — tham
// chiếu ổn định. Việc gom phép chuẩn hoá về một chỗ là đúng; chỗ hỏng là quên
// `useMemo`. Đây là lý do bộ này tồn tại: **không test nào của dự án từng CHƠI
// một ván** — `render_empty_states` chỉ vẽ tĩnh (effect không chạy), `ra:khach`
// chỉ bấm mở tab, `hoc:that` không đi qua trang ngữ pháp.
//
// ══ NÓ ĐO GÌ ══
//   1. Bấm một thẻ từ thì chữ đó PHẢI rời hàng chờ và nằm trong ô thả.
//   2. Xếp đúng cả câu rồi bấm "Kiểm Tra" thì phải được báo đúng.
//   3. Hàng thẻ từ KHÔNG được tự xáo lại khi người học không đụng vào — dấu hiệu
//      của vòng lặp vẽ. Đo bằng cách chụp thứ tự chữ hai lần cách nhau 1,2 giây.
//   4. Không có lỗi console / ngoại lệ.

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

const may = await moMayChuXemTruoc({ cong: 4323 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9337 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

// Hàng thẻ từ CHƯA dùng nằm trong khối có `justify-center`; ô thả nằm trong khối
// `border-dashed`. Nhắm theo lớp của chính hai khối đó, không nhắm "nút thứ N
// trên trang" — trang này có cả nút tab lẫn nút Kiểm Tra.
const KHOI_CHO = `[...document.querySelectorAll('div')].find((d) => d.className.includes('justify-center') && d.className.includes('flex-wrap') && d.className.includes('rounded-3xl'))`;
const KHOI_THA = `[...document.querySelectorAll('div')].find((d) => d.className.includes('border-dashed') && d.className.includes('flex-wrap'))`;

const CHU_CHO = `(() => { const k = ${KHOI_CHO}; return k ? [...k.querySelectorAll('button')].map((b) => b.innerText.trim()) : null; })()`;
const CHU_THA = `(() => { const k = ${KHOI_THA}; return k ? [...k.querySelectorAll('button')].map((b) => b.innerText.trim()) : null; })()`;
const BAM_CHU_CHO = (i) => `(() => { const k = ${KHOI_CHO}; if (!k) return false; const ds = [...k.querySelectorAll('button')]; if (!ds[${i}]) return false; ds[${i}].click(); return true; })()`;

const LOI_THAT = () => t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));

try {
  await t.diToi(may.BASE);
  await nghi(1500);

  for (const nhan of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
    await t.danhGia(BAM_THEO_CHU(nhan));
    await nghi(500);
  }

  const vaoNguPhap = await t.danhGia(BAM_THEO_CHU('NGỮ PHÁP'));
  await nghi(1200);
  ghi('mở bài ngữ pháp đầu tiên', vaoNguPhap && (await t.danhGia("document.body.innerText.includes('Hiện Tại Đơn')")));

  const moTab_ = await t.danhGia(BAM_THEO_CHU('Xếp Câu'));
  await nghi(1200);
  ghi('mở tab "Xếp Câu"', moTab_ && (await t.danhGia("document.body.innerText.includes('Xếp Câu Phản Xạ')")));

  // ── (3) VÒNG LẶP VẼ: không đụng vào mà thứ tự chữ tự đổi là hỏng ──────────
  const lan1 = await t.danhGia(CHU_CHO);
  await nghi(1200);
  const lan2 = await t.danhGia(CHU_CHO);
  const onDinh = JSON.stringify(lan1) === JSON.stringify(lan2);
  ghi('hàng thẻ từ ĐỨNG YÊN khi không ai đụng vào', onDinh,
    onDinh ? `${(lan1 || []).length} thẻ` : `tự xáo lại: [${lan1}] → [${lan2}]`);

  // ── (1) BẤM MỘT CHỮ THÌ NÓ PHẢI RƠI XUỐNG Ô THẢ ──────────────────────────
  const choTruoc = await t.danhGia(CHU_CHO);
  const thaTruoc = await t.danhGia(CHU_THA);
  await t.danhGia(BAM_CHU_CHO(0));
  await nghi(600);
  const thaSau = await t.danhGia(CHU_THA);
  const choSau = await t.danhGia(CHU_CHO);
  const roiXuong = (thaSau || []).length === (thaTruoc || []).length + 1;
  ghi('bấm một thẻ từ thì chữ đó rơi xuống ô thả', roiXuong,
    `ô thả ${(thaTruoc || []).length} → ${(thaSau || []).length} · hàng chờ ${(choTruoc || []).length} → ${(choSau || []).length}`);

  // ── (2) XẾP ĐÚNG CẢ CÂU RỒI KIỂM TRA ─────────────────────────────────────
  // Không nhúng đáp án: đọc câu tiếng Việt thì không suy ra được câu tiếng Anh.
  // Cách chơi đúng của người học là thử — nên ở đây chỉ cần chứng minh MÁY MÓC
  // chạy: nhặt hết chữ xuống ô thả rồi bấm Kiểm Tra, và đòi app trả lời một
  // trong hai câu (đúng / chưa đúng), chứ không im lặng.
  for (let i = 0; i < 20; i++) {
    const con = (await t.danhGia(CHU_CHO) || []).length;
    if (!con) break;
    await t.danhGia(BAM_CHU_CHO(0));
    await nghi(180);
  }
  const daNhatHet = (await t.danhGia(CHU_CHO) || []).length === 0;
  const trongOTha = (await t.danhGia(CHU_THA) || []).length;
  ghi('nhặt hết chữ xuống ô thả', daNhatHet && trongOTha > 1, `ô thả có ${trongOTha} chữ`);

  const bamKiemTra = await t.danhGia(BAM_THEO_CHU('Kiểm Tra'));
  await nghi(800);
  const traLoi = await t.danhGia("document.body.innerText.includes('Chưa đúng') || document.body.innerText.includes('Tiếp Tục')");
  ghi('bấm "Kiểm Tra" thì app TRẢ LỜI (đúng hoặc chưa đúng)', bamKiemTra && traLoi);

  const loi = LOI_THAT();
  ghi('không có lỗi console / ngoại lệ', loi.length === 0,
    loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 140)}`).join(' | '));
} finally {
  const dat = ket.filter((k) => k.ok).length;
  console.log(`\nbước đạt: ${dat}/${ket.length}`);
  t.dong();
  tienTrinh.kill();
  may.dong();
  process.exit(dat === ket.length ? 0 : 1);
}
