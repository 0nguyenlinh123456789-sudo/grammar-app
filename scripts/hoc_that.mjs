// File: scripts/hoc_that.mjs
//
//   npm run hoc:that
//
// LÀM HẾT MỘT BÀI THẬT, KHÔNG CHỈ MỞ RA NHÌN.
//
// ══ VÌ SAO CẦN BỘ NÀY KHI ĐÃ CÓ `npm run ra:khach` ══
// Bộ kia đi 21 lối vào và báo 21/21 — nhưng nó chỉ BẤM MỞ. Bấm một thẻ rồi thấy
// panel hiện ra là một chuyện; trả lời hết câu hỏi, bấm xem kết quả, rồi kiểm
// xem phần thưởng có được ghi đúng luật hay không là chuyện khác hẳn. Toàn bộ
// đoạn đường `trả lời → buildEvidence → completeMilestone → saveScore →
// localStorage` — đoạn nhiều máy móc nhất của app — chưa từng có bộ nào đi qua.
//
// ══ NÓ CHỨNG MINH ĐIỀU GÌ ══
// Đúng một điều, và là điều đáng giá nhất: **CỔNG ĐỘ CHÍNH XÁC CÓ CHẶN THẬT.**
// Luật (utils/mastery.js) nói: bài toàn trắc nghiệm thì phải đúng ≥85% mới được
// tính hoàn thành; dưới ngưỡng thì KHÔNG được đánh dấu ✓, KHÔNG cộng XP thưởng —
// nhưng VẪN phải tính là một buổi học (chuỗi ngày, mục tiêu ngày). Hai đường ống
// phần thưởng đó là quyết định của chủ dự án, và tới giờ chỉ có test đơn vị kiểm
// phần tính toán thuần. Bộ này kiểm nó **qua giao diện thật, trên bản build
// thật, đọc localStorage thật**.
//
// ══ CÁCH BIẾT ĐÁP ÁN MÀ KHÔNG ĐỌC FILE DỮ LIỆU ══
// Không nhúng đáp án vào script — nhúng thì script chỉ kiểm chính nó. Thay vào
// đó chạy BA LƯỢT trên cùng một bài:
//   Lượt 1 (DÒ)      — chọn bừa phương án đầu, và HỌC đáp án từ chính app: sau
//                      khi chọn, app tô phương án đúng bằng `border-emerald-600`.
//   Lượt 2 (CỐ SAI)  — đã biết đáp án, cố tình chọn sai HẾT → chắc chắn 0%.
//   Lượt 3 (LÀM ĐÚNG)— chọn đúng hết → chắc chắn 100%.
// Lượt 2 và 3 là hai đầu của cái cổng. Lượt 1 chỉ khẳng định "kết quả ghi nhận
// khớp với điểm quan sát được" — nó không thể tự sai thành báo động giả.
//
// ⚠ Lượt DÒ có xác suất ~0,4% trúng cả 4 câu (bài đọc dài đều 4 câu, 4 phương
// án). Trúng hết thì chặng đó ĐÃ hoàn thành và hai lượt sau mất ý nghĩa, nên bộ
// này tự chuyển sang chặng đọc khác thay vì báo bừa.
//
// ══ LẦN CHẠY THÀNH CÔNG ĐẦU TIÊN, "0,4%" ĐÓ LÀ 100% ══
// Lượt DÒ trúng cả 4/4 ngay lần đầu. Đo lại thì ra: 542/546 câu của bốn kho
// (bài đọc dài, bài nghe, THI CUỐI BẬC, bài A0) đều để đáp án đúng ở ô ĐẦU —
// bấm ô đầu tiên là qua sạch, không cần đọc, không cần nghe. Đã vá bằng
// `src/utils/tronPhuongAn.js` và ghim bằng `tests/tron_phuong_an.test.js`.
// Ghi lại ở đây vì nó là lý do bộ này đáng tồn tại: 319 test cũ và một lượt rà
// 21/21 lối vào đều không thấy, chỉ có việc NGỒI LÀM HẾT MỘT BÀI mới thấy.
//
// ══ VẪN CHƯA PHỦ ══
// Chép chính tả (gõ bàn phím), viết, nói (thu âm), và chấm bằng AI. Ghi ra để
// không ai đọc kết quả rộng hơn thứ nó đo.

import { moTrinhDuyet, moTab, BAM_THEO_CHU, DONG_PANEL } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

// Panel bài đọc, nhận theo `role="dialog"`.
//
// ⚠️ BẢN ĐẦU LẤY "LỚP PHỦ TRÊN CÙNG" (`.fixed.inset-0` cuối cùng) VÀ NÓ SAI —
// theo kiểu khó thấy nhất. Làm đúng hết bài thì app bắn pháo giấy, mà pháo giấy
// cũng là một `.fixed.inset-0`, nằm SAU trong DOM và KHÔNG CÓ CHỮ. Nên đúng vào
// lúc bài làm thành công, `innerText` của "panel" bỗng rỗng, và bộ rà kết luận
// "không thấy màn kết quả" — tức nó BÁO HỎNG ĐÚNG LÚC APP CHẠY ĐÚNG. Chỉ hộp
// thoại thật mới khai `role="dialog"`, pháo giấy thì không.
const PANEL = "document.querySelector('.fixed.inset-0[role=\"dialog\"]')";

// Nút phương án trả lời. Nhận theo `text-left p-3.5` — chỉ nút phương án mới có
// cặp lớp này; nút "Câu tiếp theo", nút Đóng, nút Nghe kèm đều không.
const CAC_PA = `[...(${PANEL} ? ${PANEL}.querySelectorAll('button') : [])].filter((b) => b.className.includes('text-left') && b.className.includes('p-3.5'))`;

const SO_PA = `(${CAC_PA}).length`;
const CHON_PA = (i) => `(() => { const ds = ${CAC_PA}; if (!ds[${i}]) return false; ds[${i}].click(); return true; })()`;
// Sau khi chọn, app tô phương án ĐÚNG bằng `border-emerald-600`. Đây là chỗ
// script học được đáp án mà không phải đọc file dữ liệu.
const PA_DUNG = `(() => { const ds = ${CAC_PA}; return ds.findIndex((b) => b.className.includes('border-emerald-600')); })()`;
const CHU_PANEL = `(${PANEL} ? ${PANEL}.innerText : '')`;

const BAM_TRONG_PANEL = (chu) => `(() => {
  const p = ${PANEL};
  if (!p) return false;
  const el = [...p.querySelectorAll('button')].find((b) => (b.innerText || '').includes(${JSON.stringify(chu)}));
  if (!el) return false;
  el.scrollIntoView({ block: 'center' });
  el.click();
  return true;
})()`;

// Ảnh chụp phần thưởng, đọc thẳng từ localStorage — nơi app thật sự lưu.
const ANH_CHUP = `(() => {
  const soL = (k, md) => { try { return JSON.parse(localStorage.getItem(k) || md); } catch { return JSON.parse(md); } };
  return {
    xp: Number(localStorage.getItem('xp') || 0),
    xong: soL('completedMilestones', '[]'),
    diem: soL('milestoneScoresV1', '{}'),
    buoi: Number(soL('dailyStats', '{}').lessons || 0),
  };
})()`;

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

const may = await moMayChuXemTruoc({ cong: 4321 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9335 });
const t = await moTab(cong);
// LỖI tính vào kết quả; CẢNH BÁO thì đếm và in ra, không tính.
//
// Vì sao tách: lượt nào chạy cũng đẻ ra một loạt "The AudioContext was not
// allowed to start… after a user gesture". Đó là hệ quả của CÁCH LÁI, không phải
// lỗi app — `el.click()` gọi bằng script không phải cử chỉ người thật, nên Chrome
// từ chối cho phát âm thanh. Người dùng thật bấm chuột thì không gặp.
// Tính nó vào lỗi thì bộ này đỏ vĩnh viễn và không ai còn đọc kết quả nữa; giấu
// hẳn thì lần sau app có cảnh báo thật cũng không ai thấy. Nên: đếm riêng, in ra.
const LA_CANH_BAO = (x) => x.loai === 'CONSOLE_WARN' || x.loai.endsWith('_WARNING');
const loiThat = () => t.nhatKy.filter((x) => !LA_CANH_BAO(x));

/** Trả lời hết một bài đọc. `chon(i, key)` quyết định bấm phương án nào. */
async function lamBai(chon) {
  const dapAn = [];
  for (let i = 0; i < 40; i++) {
    await t.doi(`${SO_PA} > 0`, { giay: 15, nhan: `bộ phương án câu ${i + 1}` });
    const soPa = await t.danhGia(SO_PA);
    await t.danhGia(CHON_PA(chon(i, soPa)));
    await t.doi(`${PA_DUNG} >= 0`, { giay: 10, nhan: `app tô đáp án đúng câu ${i + 1}` });
    dapAn.push(await t.danhGia(PA_DUNG));
    if (process.env.HOC_THAT_CHI_TIET) {
      const ct = (await t.danhGia(CHU_PANEL)).replace(/\s+/g, ' ').slice(-200);
      console.log(`   [câu ${i + 1}] ${soPa} phương án · đáp án #${dapAn[i]} · panel: …${ct}`);
    }
    const cuoi = await t.danhGia(`${CHU_PANEL}.includes('Xem kết quả')`);
    await t.danhGia(BAM_TRONG_PANEL(cuoi ? 'Xem kết quả' : 'Câu tiếp theo'));
    if (cuoi) break;
    await nghi(250);
  }
  await t.doi(`/Đúng \\d+\\/\\d+/.test(${CHU_PANEL})`, { giay: 10, nhan: 'màn kết quả' });
  const m = (await t.danhGia(`(${CHU_PANEL}.match(/Đúng (\\d+)\\/(\\d+)/) || []).slice(1).join(',')`)).split(',');
  await nghi(700);   // để React kịp ghi localStorage
  return { dapAn, dung: Number(m[0]), tong: Number(m[1]) };
}

/** Mở chặng đọc thứ `thu` trong danh sách lộ trình đang hiện. */
async function moChangDoc(thu) {
  const mo = await t.danhGia(`(() => {
    const ds = [...document.querySelectorAll('div.cursor-pointer')]
      .filter((e) => (e.innerText || '').includes('Đọc bài dài'));
    if (!ds[${thu}]) return false;
    ds[${thu}].scrollIntoView({ block: 'center' });
    ds[${thu}].click();
    return true;
  })()`);
  if (!mo) return false;
  await t.doi(`${SO_PA} > 0`, { giay: 25, nhan: 'panel bài đọc mở và có câu hỏi' });
  return true;
}

try {
  await t.diToi(may.BASE);
  await nghi(1500);

  // Khách mới gặp trình hướng dẫn trước — đi qua bằng đúng ba cú bấm khách thật
  // bấm, KHÔNG xoá cờ trong localStorage.
  for (const nhan of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
    await t.danhGia(BAM_THEO_CHU(nhan));
    await nghi(600);
  }

  await t.danhGia(BAM_THEO_CHU('LỘ TRÌNH'));
  await nghi(1500);

  // Chặng đọc nằm ở bậc B1. Bấm đúng tab bậc đó: nhận theo `whitespace-nowrap`
  // — lớp chỉ dàn tab mới có, nên không bắt nhầm huy hiệu "B1" trên thẻ chặng.
  const vaoTab = await t.danhGia(`(() => {
    const el = [...document.querySelectorAll('button')]
      .find((b) => b.className.includes('whitespace-nowrap') && (b.innerText || '').includes('B1'));
    if (!el) return false;
    el.click();
    return true;
  })()`);
  ghi('mở tab lộ trình bậc B1', vaoTab, vaoTab ? '' : 'không thấy tab B1');
  await nghi(1200);

  // Mỗi bậc chỉ vẽ một CỬA SỔ 24 chặng quanh chỗ đang học; chặng đọc nằm ngoài
  // cửa sổ đó với khách mới, nên phải bấm mở hết.
  for (let i = 0; i < 6; i++) {
    const co = await t.danhGia(BAM_THEO_CHU('BẤM ĐỂ XEM HẾT'));
    if (!co) break;
    await nghi(1200);
  }
  const soChangDoc = await t.danhGia(`[...document.querySelectorAll('div.cursor-pointer')].filter((e) => (e.innerText || '').includes('Đọc bài dài')).length`);
  ghi('thấy chặng đọc trong lộ trình', soChangDoc > 0, `${soChangDoc} chặng`);
  if (!soChangDoc) throw new Error('không có chặng đọc nào để làm — dừng, không kết luận gì thêm.');

  // ── LƯỢT 1: DÒ ĐÁP ÁN ─────────────────────────────────────────────────────
  let thu = 0;
  let khoa = null;
  let truoc = null;
  while (thu < Math.min(soChangDoc, 4)) {
    truoc = await t.danhGia(ANH_CHUP);
    if (!await moChangDoc(thu)) break;
    const r = await lamBai(() => 0);
    const sau = await t.danhGia(ANH_CHUP);
    const phanTram = Math.round((r.dung / r.tong) * 100);

    // Lượt dò không đòi kết quả cụ thể — chỉ đòi PHẦN THƯỞNG KHỚP VỚI ĐIỂM.
    // Một phép kiểm đòi "phải trượt" sẽ báo động giả 0,4% số lần chạy.
    const nenXong = phanTram >= 85;
    const daXong = sau.xong.length > truoc.xong.length;
    ghi(`lượt DÒ (chặng đọc #${thu + 1}): ${r.dung}/${r.tong} = ${phanTram}%`,
      nenXong === daXong,
      nenXong === daXong ? (nenXong ? 'đạt ngưỡng → có đánh dấu ✓ (đúng luật)' : 'dưới ngưỡng → không đánh dấu ✓ (đúng luật)')
        : `SAI LUẬT: ${phanTram}% mà ${daXong ? 'vẫn được' : 'không được'} đánh dấu hoàn thành`);

    await t.danhGia(DONG_PANEL);
    await nghi(800);
    if (!nenXong) { khoa = r.dapAn; break; }
    console.log(`   (lượt dò trúng cả ${r.tong} câu — hiếm; đổi sang chặng đọc khác để hai lượt sau còn ý nghĩa)`);
    thu++;
  }
  if (!khoa) throw new Error('không dò được đáp án của chặng đọc nào — dừng.');

  // ── LƯỢT 2: CỐ TÌNH SAI HẾT ───────────────────────────────────────────────
  const truoc2 = await t.danhGia(ANH_CHUP);
  await moChangDoc(thu);
  const r2 = await lamBai((i, soPa) => (khoa[i] + 1) % soPa);   // luôn khác đáp án
  const sau2 = await t.danhGia(ANH_CHUP);

  ghi('lượt CỐ SAI: chấm đúng 0 điểm', r2.dung === 0, `app chấm ${r2.dung}/${r2.tong}`);
  ghi('lượt CỐ SAI: KHÔNG đánh dấu hoàn thành',
    sau2.xong.length === truoc2.xong.length,
    `chặng xong ${truoc2.xong.length} → ${sau2.xong.length}`);
  ghi('lượt CỐ SAI: KHÔNG cộng XP thưởng', sau2.xp === truoc2.xp, `XP ${truoc2.xp} → ${sau2.xp}`);
  ghi('lượt CỐ SAI: KHÔNG ghi bản điểm',
    Object.keys(sau2.diem).length === Object.keys(truoc2.diem).length,
    `bản điểm ${Object.keys(truoc2.diem).length} → ${Object.keys(sau2.diem).length}`);
  // Đây mới là nửa kia của luật, và là nửa dễ làm hỏng nhất: sai hết vẫn phải
  // được tính là ĐÃ ĐI HỌC (chuỗi ngày, mục tiêu ngày). Bỏ nửa này thì cổng độ
  // chính xác biến thành hình phạt.
  ghi('lượt CỐ SAI: VẪN tính là một buổi học', sau2.buoi > truoc2.buoi, `buổi ${truoc2.buoi} → ${sau2.buoi}`);

  await t.danhGia(DONG_PANEL);
  await nghi(800);

  // ── LƯỢT 3: LÀM ĐÚNG HẾT ──────────────────────────────────────────────────
  const truoc3 = await t.danhGia(ANH_CHUP);
  await moChangDoc(thu);
  const r3 = await lamBai((i) => khoa[i]);
  const sau3 = await t.danhGia(ANH_CHUP);

  ghi('lượt LÀM ĐÚNG: chấm đủ điểm', r3.dung === r3.tong, `app chấm ${r3.dung}/${r3.tong}`);
  const idMoi = sau3.xong.filter((x) => !truoc3.xong.includes(x));
  ghi('lượt LÀM ĐÚNG: có đánh dấu hoàn thành', idMoi.length === 1, idMoi.join(', ') || 'không chặng nào được đánh dấu');
  ghi('lượt LÀM ĐÚNG: có cộng XP thưởng', sau3.xp > truoc3.xp, `XP ${truoc3.xp} → ${sau3.xp}`);
  const ban = idMoi.length === 1 ? sau3.diem[idMoi[0]] : null;
  ghi('lượt LÀM ĐÚNG: có ghi bản điểm (chặng "đã xác minh")', !!ban,
    ban ? `${ban.correct}/${ban.total} = ${ban.percent}% · ngưỡng ${ban.threshold}%` : 'không có bản điểm → chặng sẽ hiện "⏳ chưa xác minh"');
  ghi('lượt LÀM ĐÚNG: ngưỡng ghi đúng 85% (bài toàn trắc nghiệm)',
    !!ban && ban.threshold === 85, ban ? `ghi ${ban.threshold}%` : '—');
  ghi('lượt LÀM ĐÚNG: VẪN tính là một buổi học', sau3.buoi > truoc3.buoi, `buổi ${truoc3.buoi} → ${sau3.buoi}`);

  // ── nhật ký lỗi trong suốt lượt ────────────────────────────────────────────
  const lm = loiThat();
  ghi('không có lỗi console / ngoại lệ / request hỏng', lm.length === 0,
    lm.slice(0, 5).map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`).join(' | '));

  const cb = t.nhatKy.filter(LA_CANH_BAO);
  const gomCb = new Map();
  for (const x of cb) {
    const k = String(x.text).slice(0, 90);
    gomCb.set(k, (gomCb.get(k) || 0) + 1);
  }
  console.log(`\ncảnh báo (KHÔNG tính vào kết quả): ${cb.length}`);
  for (const [k, n] of gomCb) console.log(`  ${n}× ${k}`);

  console.log(`\nbước đạt: ${ket.filter((x) => x.ok).length}/${ket.length}`);
  process.exitCode = ket.every((x) => x.ok) ? 0 : 1;
} catch (e) {
  console.log('\nRÀ DỪNG GIỮA CHỪNG:', e.message);
  console.log('nhật ký tới lúc đó:', JSON.stringify(loiThat().slice(0, 6), null, 1));
  process.exitCode = 1;
} finally {
  t.dong();
  tienTrinh.kill();
  may.dong();
  setTimeout(() => process.exit(process.exitCode ?? 0), 300);
}
