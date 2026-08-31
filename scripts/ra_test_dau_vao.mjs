// File: scripts/ra_test_dau_vao.mjs
//
//   npm run ra:testdauvao
//
// LÀM THẬT BÀI TEST ĐẦU VÀO, TRÊN BẢN BUILD THẬT.
//
// ══ VÌ SAO CẦN ══
// Ba thứ vừa thêm ngày 28/08 đều là thứ bài kiểm đơn vị KHÔNG nhìn thấy:
//   1. ĐỒNG HỒ ĐẾM NGƯỢC mỗi câu — chỉ chạy trong trình duyệt thật, và nó có
//      một cái bẫy đã dính ở chỗ khác: `onHetGio` là hàm mới mỗi lần vẽ, để nó
//      trong mảng phụ thuộc của effect thì mỗi cú bấm reset đồng hồ về đầu và
//      nó KHÔNG BAO GIỜ chạy hết — không lỗi nào bắn ra.
//   2. TRỘN PHƯƠNG ÁN — kho để 76% đáp án ở hai ô đầu; test đọc mã chỉ chứng
//      minh "có gọi hàm trộn", không chứng minh thứ tự tới được màn hình.
//   3. VÒNG XÁC NHẬN — phải hiện ra và nói rõ nó là vòng xác nhận.
//
// ══ NÓ ĐO GÌ ══
//   · Đồng hồ có ĐẾM XUỐNG thật (chụp hai lần cách nhau 2,5 giây).
//   · Bấm đổi phương án nhiều lần KHÔNG làm đồng hồ nhảy về đầu.
//   · Thứ tự phương án trên màn hình KHÁC thứ tự trong dữ liệu (ít nhất một câu).
//   · Đi hết bài thì ra màn kết quả có bậc.
//   · Không lỗi console.

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';
import { placementBank } from '../src/data/placementBank.js';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

const may = await moMayChuXemTruoc({ cong: 4325 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9339 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

const PANEL = `document.querySelector('.fixed.inset-0[aria-labelledby="placement-title"]')`;
const CHU_PANEL = `(${PANEL} ? ${PANEL}.innerText : '')`;
// Nút phương án: nút có nhãn chữ cái A/B/C/D trong một <span> ở đầu.
const CAC_PA = `[...(${PANEL} ? ${PANEL}.querySelectorAll('button') : [])].filter((b) => /^[A-D]$/.test((b.querySelector('span')||{}).innerText || ''))`;
const CHU_PA = `(${CAC_PA}).map((b) => b.innerText.replace(/^[A-D]\\s*/, '').trim())`;
const BAM_PA = (i) => `(() => { const ds = ${CAC_PA}; if (!ds[${i}]) return false; ds[${i}].click(); return true; })()`;
// Bấm TRONG panel và khớp NGUYÊN VĂN nhãn nút. Hai lần tự bẫy mình ở đúng chỗ
// này, ghi lại cả hai:
//   1. `BAM_THEO_CHU` dò cả document nên bấm trúng nút "XÁC NHẬN RESET" của hộp
//      đặt lại lộ trình nằm sẵn trên trang chủ.
//   2. Khớp kiểu `includes('Xác nhận')` thì trúng luôn PHƯƠNG ÁN TRẢ LỜI: câu
//      C1 về "if borne out by further study" có hai phương án chứa đúng chữ
//      "xác nhận". Bộ rà bấm phương án rồi tưởng đã nộp, bài đứng im ở câu 30
//      suốt 50 vòng lặp — trông y hệt một lỗi treo của app.
// Cả hai lần app đều đúng. Khớp nguyên văn thì không còn chỗ nhầm.
const BAM_TRONG_PANEL = (chu) => `(() => {
  const p = ${PANEL};
  if (!p) return false;
  const el = [...p.querySelectorAll('button')].find((b) => (b.innerText || '').trim() === ${JSON.stringify(chu)});
  if (!el || el.disabled) return false;
  el.click();
  return true;
})()`;
// Đồng hồ: phần tử có chữ dạng "45s".
const DONG_HO = `(() => {
  const p = ${PANEL};
  if (!p) return null;
  const el = [...p.querySelectorAll('span')].find((s) => /^\\d+s$/.test((s.innerText||'').trim()));
  return el ? Number(el.innerText.trim().replace('s','')) : null;
})()`;

const LOI_THAT = () => t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));

try {
  await t.diToi(may.BASE);
  await nghi(1500);
  for (const nhan of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
    await t.danhGia(BAM_THEO_CHU(nhan));
    await nghi(500);
  }

  // Mở bằng đúng sự kiện app dùng (WelcomePage nghe 'bunny:open-placement').
  await t.danhGia(`window.dispatchEvent(new Event('bunny:open-placement')), true`);
  await t.doi(`!!${PANEL}`, { giay: 10, nhan: 'hộp thoại test đầu vào' });
  ghi('mở được bài test đầu vào', true);

  const chu = await t.danhGia(CHU_PANEL);
  ghi('màn hình nói rõ độ dài bài và có giới hạn thời gian',
    /18–45 câu/.test(chu) && /giới hạn thời gian/.test(chu),
    (chu.match(/Tổng cộng[^.]*\./) || [''])[0].slice(0, 120));

  // ── ĐỒNG HỒ CÓ ĐẾM XUỐNG THẬT ──────────────────────────────────────────
  const d1 = await t.danhGia(DONG_HO);
  await nghi(2500);
  const d2 = await t.danhGia(DONG_HO);
  ghi('đồng hồ đếm ngược thật sự chạy', d1 !== null && d2 !== null && d2 < d1, `${d1}s → ${d2}s`);

  // ── BẤM ĐỔI PHƯƠNG ÁN KHÔNG ĐƯỢC LÀM ĐỒNG HỒ NHẢY VỀ ĐẦU ───────────────
  // Đây là cái bẫy `onHetGio` trong mảng phụ thuộc. Bấm 4 lần rồi đo lại.
  const soPa = (await t.danhGia(CHU_PA)).length;
  for (let i = 0; i < 4; i++) { await t.danhGia(BAM_PA(i % soPa)); await nghi(120); }
  const d3 = await t.danhGia(DONG_HO);
  ghi('bấm đổi phương án KHÔNG reset đồng hồ về đầu', d3 !== null && d3 <= d2,
    `sau 4 lần bấm: ${d3}s (trước đó ${d2}s)`);

  // ── THỨ TỰ PHƯƠNG ÁN PHẢI KHÁC DỮ LIỆU GỐC (ít nhất một câu trong bài) ──
  const theoDuLieu = new Map(placementBank.map((q) => [q.prompt.trim(), q.options.map((o) => String(o).trim())]));
  let daTron = false;
  let soCauDoiChieu = 0;

  // ── ĐI HẾT BÀI, TRẢ LỜI ĐÚNG ───────────────────────────────────────────
  // Trả lời đúng để leo hết thang — đó là đường DUY NHẤT chạm tới vòng xác
  // nhận. Đáp án tra từ chính kho dữ liệu rồi khớp THEO CHỮ (không theo chỉ
  // số), nên nếu lớp trộn ánh xạ ngược sai thì bộ này bắt được ngay: chữ đúng
  // mà app chấm sai thì bài sẽ không leo nổi lên C1.
  const dapAnDung = new Map(placementBank.map((q) => [q.prompt.trim(), String(q.options[q.answer]).trim()]));
  let thayVongXacNhan = false;
  let guard = 0;
  while (guard++ < 80) {
    const conCauHoi = await t.danhGia(`${CHU_PANEL}.includes('Xác nhận')`);
    if (!conCauHoi) break;

    const de = (await t.danhGia(`(() => { const p = ${PANEL}; const h = p && p.querySelector('h3'); return h ? h.innerText.trim() : ''; })()`));
    const tren = await t.danhGia(CHU_PA);
    const goc = theoDuLieu.get(de);
    if (goc && goc.length === tren.length) {
      soCauDoiChieu += 1;
      if (goc.join('|') !== tren.join('|')) daTron = true;
    }
    if (/Vòng xác nhận/i.test(await t.danhGia(CHU_PANEL))) thayVongXacNhan = true;

    const dung = dapAnDung.get(de);
    const viTri = dung ? tren.findIndex((x) => x === dung) : -1;
    await t.danhGia(BAM_PA(viTri >= 0 ? viTri : 0));
    await nghi(120);
    await t.danhGia(BAM_TRONG_PANEL('Xác nhận'));
    await nghi(320);
  }

  ghi('thứ tự phương án trên màn hình ĐÃ ĐƯỢC TRỘN so với dữ liệu', daTron,
    `đối chiếu được ${soCauDoiChieu} câu`);
  ghi('có chạy VÒNG XÁC NHẬN và nói rõ đó là vòng xác nhận', thayVongXacNhan);

  // `innerText` trả về chữ ĐÃ QUA text-transform, mà tiêu đề dùng lớp
  // `uppercase` — so chữ thường/hoa nguyên văn là bộ rà tự báo hỏng oan.
  const chuCuoi = String(await t.danhGia(CHU_PANEL)).toLowerCase();
  ghi('đi hết bài thì ra màn KẾT QUẢ có bậc',
    chuCuoi.includes('bậc đạt được') && chuCuoi.includes('vào chặng phù hợp'));
  ghi('trả lời đúng hết thì phải leo tới C1', /c1/.test(chuCuoi),
    (chuCuoi.match(/bậc đạt được\s*\n?([^\n]*)/) || [])[1] || '');
  ghi('kết quả có nói số câu đã làm', /đúng \d+\/\d+ câu/.test(chuCuoi),
    (chuCuoi.match(/đúng \d+\/\d+ câu/) || [''])[0]);

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
