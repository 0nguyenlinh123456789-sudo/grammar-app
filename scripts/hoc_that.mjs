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
// ⚠ **Kể từ khi có `src/utils/tronPhuongAn.js`**, lượt DÒ có xác suất ~0,4%
// trúng cả 4 câu (bài đọc dài đều 4 câu, 4 phương án). Con số đó là HỆ QUẢ CỦA
// BẢN VÁ, không phải tính chất sẵn có: gỡ bản vá ra thì nó thành 100%. Trúng hết
// thì chặng đó ĐÃ hoàn thành và hai lượt sau mất ý nghĩa, nên bộ này tự chuyển
// sang chặng đọc khác thay vì báo bừa.
//
// ══ LẦN CHẠY THÀNH CÔNG ĐẦU TIÊN, "0,4%" ĐÓ LÀ 100% ══
// Lượt DÒ trúng cả 4/4 ngay lần đầu. Đo lại thì ra: 542/546 câu của bốn kho
// (bài đọc dài, bài nghe, THI CUỐI BẬC, bài A0) đều để đáp án đúng ở ô ĐẦU —
// bấm ô đầu tiên là qua sạch, không cần đọc, không cần nghe. Đã vá bằng
// `src/utils/tronPhuongAn.js` và ghim bằng `tests/tron_phuong_an.test.js`.
// Ghi lại ở đây vì nó là lý do bộ này đáng tồn tại: 319 test cũ và một lượt rà
// 21/21 lối vào đều không thấy, chỉ có việc NGỒI LÀM HẾT MỘT BÀI mới thấy.
//
// ══ PHẦN HAI: CHÉP CHÍNH TẢ ══
// Thêm 19/08 sau khi phần bài đọc chạy xanh. Đây là bài duy nhất người học phải
// GÕ BÀN PHÍM, và nó đi qua một đường chấm khác hẳn (`chamChinhTa`, so từng từ,
// bỏ dấu câu và chữ hoa) với một NGƯỠNG KHÁC: chặng này gửi `loaiCau` rỗng nên
// ngưỡng là 80%, không phải 85% như bài toàn trắc nghiệm. Bộ này bắt màn hình
// nói ra con số đó.
//
// ══ PHẦN BA VÀ BỐN: VIẾT VÀ NÓI ══
// Thêm 19/08. Hai phần này KHÁC HẲN hai phần trên ở một điểm mà bộ rà phải hiểu
// đúng, không thì nó báo lỗi oan: **chúng cố ý KHÔNG đánh dấu chặng hoàn thành.**
// Bài viết và lượt nói ở đây là TỰ BÁO CÁO — máy không chấm được nội dung, nên
// mọi bản ghi mang cờ `tuBaoCao: true` và không có trường điểm. Bộ này khoá đúng
// tính chất đó lại: một ngày nào đó tự báo cáo biến thành "đã xác minh" thì đó là
// một tuyên bố không có gì đỡ.
//
// ══ VẪN CHƯA PHỦ ══
// Chấm bằng AI (cần key Gemini của người học). Bộ này chỉ kiểm được rằng KHÔNG có
// key thì app BÁO đúng chứ không im lặng — phần chấm thật thì chưa.

import { moTrinhDuyet, moTab, BAM_THEO_CHU, DONG_PANEL } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';
import { audioManifest } from '../src/data/audioManifest.js';

// Chép chính tả không học được đáp án từ lượt trước như bài trắc nghiệm: mỗi lượt
// `chonBoCau` BỐC NGẪU NHIÊN 5 câu khác nhau. Nên thay vì học, tra: đọc xem
// `<audio>` đang trỏ vào tệp nào rồi lấy lời thoại từ CHÍNH kho dữ liệu app dùng.
//
// Đây không phải "nhúng đáp án cho script tự qua bài". Thứ đang được kiểm là
// `chamChinhTa` + cả đường ống phần thưởng, và phép kiểm còn mạnh hơn thế: nếu
// lời thoại trong kho KHÁC thứ app chấm, gõ đúng theo kho sẽ không ra 100% —
// tức nó bắt luôn được trường hợp dữ liệu và màn chấm lệch nhau.
const CHU_THEO_TEP = new Map(audioManifest.map((e) => [e.file, e.text]));

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

// Panel đang làm bài — nhắm ĐÍCH DANH theo tên của nó, không nhắm theo "hộp
// thoại trên cùng" hay "hộp thoại đầu tiên".
//
// ⚠️ ĐÃ SAI HAI LẦN VÌ CHỌN PANEL KIỂU TƯƠNG ĐỐI:
//   · Bản đầu lấy `.fixed.inset-0` CUỐI CÙNG → đúng lúc làm đúng hết bài thì nó
//     bắt phải một lớp phủ không có chữ, `innerText` rỗng, và bộ rà kết luận
//     "không thấy màn kết quả" — tức BÁO HỎNG ĐÚNG LÚC APP CHẠY ĐÚNG.
//   · Bản sau lấy hộp thoại ĐẦU TIÊN → mở chặng chép chính tả trong khi panel bài
//     đọc còn đó thì nó đọc `<audio>` của bài đọc (tệp VOA tên GUID) và kêu kho
//     dữ liệu thiếu bản thu.
// Cả hai lần đều là bộ rà sai, app đúng. Hai panel mà bộ này lái đều tự khai tên
// qua `aria-labelledby`, nên hỏi đích danh thì không còn gì để đoán. Mỗi lúc chỉ
// một trong hai mở (có `dongHan` canh giữa các chặng).
const TEN_HOP = ['reading-title', 'dictation-title', 'writing-title', 'speaking-title'];
const PANEL = `document.querySelector('${TEN_HOP.map((t) => `.fixed.inset-0[aria-labelledby="${t}"]`).join(', ')}')`;
const SO_PANEL = "document.querySelectorAll('.fixed.inset-0[role=\"dialog\"]').length";

// Hộp thoại nào đang mở — chỉ dùng khi có bước hỏng, để lần sau không phải đoán.
const TEN_PANEL_DANG_MO = "[...document.querySelectorAll('.fixed.inset-0[role=\"dialog\"]')].map((e) => e.getAttribute('aria-labelledby') || e.getAttribute('aria-label') || '(không tên)').join(', ')";

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

/**
 * Đóng panel đang mở RỒI CHỜ CHO NÓ BIẾN MẤT HẲN.
 *
 * Bấm đóng xong đi tiếp ngay là không đủ, và đã sai thật: bộ này mở chặng chép
 * chính tả trong khi panel bài đọc còn đó, rồi đọc `<audio>` của bài đọc (một
 * tệp VOA tên GUID) và tưởng kho dữ liệu thiếu bản thu. Chờ tới khi đếm được 0
 * hộp thoại thì không còn chỗ để nhầm — và nếu panel KHÔNG chịu đóng thì đó là
 * lỗi thật, đáng dừng lại chứ không đáng bỏ qua.
 */
async function dongHan(nhan) {
  // Bấm nút Đóng CỦA CHÍNH PANEL NÀY, không dò khắp trang. `DONG_PANEL` dùng
  // chung bấm nút `aria-label="Đóng"` cuối cùng thấy được trên toàn trang — và
  // sau khi hoàn thành một chặng, trang chủ vẽ thêm thứ khác cũng có nút Đóng,
  // nên nó bấm nhầm chỗ rồi báo "panel không chịu đóng".
  const bam = await t.danhGia(`(() => {
    const p = ${PANEL};
    const el = p && p.querySelector('[aria-label="Đóng"]');
    if (!el) return false;
    el.click();
    return true;
  })()`);
  if (!bam) await t.danhGia(DONG_PANEL);
  await t.doi(`!${PANEL}`, { giay: 10, nhan: `${nhan} đóng hẳn` });

  // Còn hộp thoại KHÁC đứng lại thì dẹp nó đi — nhưng NÓI RA. Chính chỗ này lộ
  // ra lỗi "báo lộ trình dài ra cho người mới cài app": sau khi chặng đầu tiên
  // hoàn thành, `roadmap-growth-title` chen lên. Bỏ qua lặng lẽ thì lần sau có
  // hộp thoại lạ nào chen vào cũng không ai biết.
  const conLai = await t.danhGia(TEN_PANEL_DANG_MO);
  if (conLai) {
    console.log(`   (còn hộp thoại khác sau khi đóng ${nhan}: ${conLai} — dẹp để đi tiếp)`);
    await t.danhGia(DONG_PANEL);
    await nghi(400);
  }
  await nghi(400);
}

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

// ── Chép chính tả ───────────────────────────────────────────────────────────
const TEP_DANG_PHAT = `(() => {
  const p = ${PANEL};
  const a = p && p.querySelector('audio');
  return a ? String(a.getAttribute('src') || '').split('/').pop() : '';
})()`;

// Gõ vào ô nhập của React KHÔNG gõ được bằng `ta.value = '…'`: React theo dõi giá
// trị qua bộ đặt của lớp gốc, gán thẳng thì state không đổi và nút "Nộp bài" vẫn
// mờ. Phải gọi đúng bộ đặt đó rồi bắn sự kiện `input`.
const GO_CHU = (chu) => `(() => {
  const p = ${PANEL};
  const ta = p && p.querySelector('textarea');
  if (!ta) return false;
  const dat = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
  dat.call(ta, ${JSON.stringify(chu)});
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  return true;
})()`;

const KET_QUA_CAU = `(() => {
  const m = ${CHU_PANEL}.match(/(Đạt|Chưa đạt) — đúng (\\d+)\\/(\\d+) từ \\((\\d+)%\\)/);
  return m ? { dat: m[1] === 'Đạt', dung: Number(m[2]), tong: Number(m[3]), phanTram: Number(m[4]) } : null;
})()`;

/** Làm hết một buổi chép chính tả. `soanChu(chuDung)` quyết định gõ gì. */
async function lamChinhTa(soanChu) {
  const cau = [];
  for (let i = 0; i < 12; i++) {
    await t.doi(`${TEP_DANG_PHAT}.length > 0`, { giay: 15, nhan: `bản thu câu ${i + 1}` });
    const tep = await t.danhGia(TEP_DANG_PHAT);
    const chuDung = CHU_THEO_TEP.get(tep);
    if (!chuDung) throw new Error(`kho dữ liệu không có lời thoại cho bản thu "${tep}"`);

    await t.danhGia(GO_CHU(soanChu(chuDung)));
    // Nút "Nộp bài" luôn có mặt nhưng BỊ KHOÁ cho tới khi ô nhập có chữ. Chờ nó
    // mở khoá chứ không chỉ chờ nó xuất hiện: bấm vào nút khoá thì không có gì
    // xảy ra, và bước sau sẽ hết giờ ở một chỗ chẳng liên quan.
    await t.doi(`[...${PANEL}.querySelectorAll('button')].some((b) => (b.innerText || '').includes('Nộp bài') && !b.disabled)`,
      { giay: 10, nhan: `nút Nộp bài mở khoá (câu ${i + 1})` });
    await t.danhGia(BAM_TRONG_PANEL('Nộp bài'));
    await t.doi(`${KET_QUA_CAU} !== null`, { giay: 10, nhan: `bảng chấm câu ${i + 1}` });
    cau.push({ tep, ...(await t.danhGia(KET_QUA_CAU)) });

    const cuoi = await t.danhGia(`${CHU_PANEL}.includes('Xem kết quả')`);
    await t.danhGia(BAM_TRONG_PANEL(cuoi ? 'Xem kết quả' : 'Câu tiếp theo'));
    if (cuoi) break;
    await nghi(250);
  }
  await t.doi(`${CHU_PANEL}.includes('Xong buổi chép chính tả')`, { giay: 10, nhan: 'màn kết quả chép chính tả' });
  const m = (await t.danhGia(`(${CHU_PANEL}.match(/Đạt (\\d+)\\/(\\d+) câu/) || []).slice(1).join(',')`)).split(',');
  await nghi(700);
  return { cau, dat: Number(m[0]), tong: Number(m[1]) };
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

    await dongHan('panel bài đọc (lượt dò)');
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

  await dongHan('panel bài đọc (lượt cố sai)');

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

  await dongHan('panel bài đọc (lượt làm đúng)');

  // ══ PHẦN HAI: CHÉP CHÍNH TẢ — bài duy nhất phải GÕ BÀN PHÍM ═══════════════
  // Khác bài đọc ở hai điểm đáng kể: người học GÕ chứ không chọn, và chấm bằng
  // `chamChinhTa` (so từng từ, bỏ dấu câu và chữ hoa) chứ không so cả chuỗi.
  // Ngưỡng cũng khác: chặng này gửi `loaiCau` rỗng nên `thresholdFor` trả 80%,
  // không phải 85% như bài toàn trắc nghiệm — con số đó cần được thấy tận mắt.
  const moCt = await t.danhGia(`(() => {
    const ds = [...document.querySelectorAll('div.cursor-pointer')]
      .filter((e) => (e.innerText || '').includes('chép chính tả'));
    if (!ds[0]) return false;
    ds[0].scrollIntoView({ block: 'center' });
    ds[0].click();
    return true;
  })()`);
  ghi('mở chặng chép chính tả từ lộ trình', moCt, moCt ? '' : 'không thấy chặng nào');

  if (moCt) {
    await t.doi(`${TEP_DANG_PHAT}.length > 0`, { giay: 25, nhan: 'panel chép chính tả có bản thu' });

    // ── Lượt CỐ SAI ─────────────────────────────────────────────────────────
    const truocCt = await t.danhGia(ANH_CHUP);
    const s1 = await lamChinhTa(() => 'zzz qqq xxx');
    const sauCt = await t.danhGia(ANH_CHUP);

    ghi('chép chính tả CỐ SAI: không câu nào được tính đạt', s1.dat === 0, `app chấm ${s1.dat}/${s1.tong} câu`);
    ghi('chép chính tả CỐ SAI: KHÔNG đánh dấu hoàn thành',
      sauCt.xong.length === truocCt.xong.length, `chặng xong ${truocCt.xong.length} → ${sauCt.xong.length}`);
    ghi('chép chính tả CỐ SAI: KHÔNG cộng XP thưởng', sauCt.xp === truocCt.xp, `XP ${truocCt.xp} → ${sauCt.xp}`);
    ghi('chép chính tả CỐ SAI: VẪN tính là một buổi học', sauCt.buoi > truocCt.buoi, `buổi ${truocCt.buoi} → ${sauCt.buoi}`);

    // ── Lượt LÀM ĐÚNG ───────────────────────────────────────────────────────
    // "Làm bộ khác" bốc bộ câu mới ngay trong panel — không phải đóng mở lại.
    await t.danhGia(BAM_TRONG_PANEL('Làm bộ khác'));
    await nghi(900);
    const truocCt2 = await t.danhGia(ANH_CHUP);
    const s2 = await lamChinhTa((chuDung) => chuDung);
    const sauCt2 = await t.danhGia(ANH_CHUP);

    // Gõ đúng nguyên văn mà không đạt 100% thì hoặc `chamChinhTa` sai, hoặc lời
    // thoại trong kho khác thứ màn hình đang chấm — cả hai đều đáng dừng lại.
    ghi('chép chính tả LÀM ĐÚNG: mọi câu đều đạt', s2.dat === s2.tong,
      `app chấm ${s2.dat}/${s2.tong} câu · từng câu: ${s2.cau.map((c) => `${c.phanTram}%`).join(' ')}`);
    const idMoiCt = sauCt2.xong.filter((x) => !truocCt2.xong.includes(x));
    ghi('chép chính tả LÀM ĐÚNG: có đánh dấu hoàn thành', idMoiCt.length === 1,
      idMoiCt.join(', ') || 'không chặng nào được đánh dấu');
    ghi('chép chính tả LÀM ĐÚNG: có cộng XP thưởng', sauCt2.xp > truocCt2.xp, `XP ${truocCt2.xp} → ${sauCt2.xp}`);
    const banCt = idMoiCt.length === 1 ? sauCt2.diem[idMoiCt[0]] : null;
    ghi('chép chính tả LÀM ĐÚNG: ngưỡng ghi đúng 80% (KHÔNG phải 85%)',
      !!banCt && banCt.threshold === 80,
      banCt ? `${banCt.correct}/${banCt.total} = ${banCt.percent}% · ngưỡng ${banCt.threshold}%` : 'không có bản điểm');

    await dongHan('panel chép chính tả');
  }

  // ══ PHẦN BA: VIẾT — bài TỰ BÁO CÁO, không phải bài được chấm ═══════════════
  const moViet = await t.danhGia(BAM_THEO_CHU('VIẾT VỀ CHẶNG NÀY'));
  ghi('mở đề viết của một chặng', moViet, moViet ? '' : 'không thấy nút');

  if (moViet) {
    await t.doi(`!!${PANEL} && ${CHU_PANEL}.length > 100`, { giay: 25, nhan: 'panel viết mở' });
    const truocV = await t.danhGia(ANH_CHUP);

    // Nộp một bài CỐ TÌNH QUÁ NGẮN. Cái đáng kiểm không phải "có báo chưa đạt"
    // mà là **có nói THIẾU BAO NHIÊU TỪ** — "chưa đạt" suông thì người học phải
    // tự đếm, và đó đúng là loại phản hồi rỗng cả tháng nay đang dẹp.
    await t.danhGia(GO_CHU('I like it.'));
    await t.doi(`[...${PANEL}.querySelectorAll('button')].some((b) => (b.innerText || '').includes('Nộp bài') && !b.disabled)`,
      { giay: 10, nhan: 'nút Nộp bài mở khoá' });
    await t.danhGia(BAM_TRONG_PANEL('Nộp bài'));
    await t.doi(`/Còn thiếu \\d+ từ/.test(${CHU_PANEL}) || /Độ dài đạt/.test(${CHU_PANEL})`,
      { giay: 10, nhan: 'bảng chấm độ dài' });
    const chuV = await t.danhGia(CHU_PANEL);
    const mThieu = chuV.match(/Còn thiếu (\d+) từ \(đang (\d+), cần ít nhất (\d+)\)/);
    ghi('viết: bài quá ngắn thì nói rõ THIẾU BAO NHIÊU TỪ, không chỉ "chưa đạt"',
      !!mThieu, mThieu ? `thiếu ${mThieu[1]} từ (đang ${mThieu[2]}, cần ${mThieu[3]})` : 'không thấy con số thiếu');

    // Không có key Gemini thì phải BÁO, không được im lặng bày một nút chết.
    const coNutAi = await t.danhGia(`[...${PANEL}.querySelectorAll('button')].some((b) => (b.innerText || '').includes('bằng AI'))`);
    const coLoiBao = await t.danhGia(`${CHU_PANEL}.includes('cần key Gemini của bạn')`);
    ghi('viết: chưa có key AI thì ẨN nút và NÓI vì sao', !coNutAi && coLoiBao,
      `nút AI ${coNutAi ? 'vẫn hiện' : 'đã ẩn'} · lời báo ${coLoiBao ? 'có' : 'KHÔNG có'}`);

    // Lưu vào sổ rồi soi bản ghi: phải mang cờ tự báo cáo và KHÔNG có trường điểm.
    const daLuu = await t.danhGia(BAM_TRONG_PANEL('Lưu bài này vào sổ'));
    await nghi(700);
    const ban = await t.danhGia(`(() => {
      try {
        const ds = JSON.parse(localStorage.getItem('writingLogV1') || '[]');
        return ds.length ? ds[ds.length - 1] : null;
      } catch { return null; }
    })()`);
    ghi('viết: bản ghi mang cờ tuBaoCao và KHÔNG có trường điểm',
      !!ban && ban.tuBaoCao === true && !('percent' in ban) && !('diem' in ban) && !('score' in ban),
      ban ? `banSo ${ban.banSo} · ${ban.soTu} từ · tuBaoCao=${ban.tuBaoCao}` : (daLuu ? 'không đọc được bản ghi' : 'không thấy nút Lưu vào sổ'));

    const sauV = await t.danhGia(ANH_CHUP);
    // KHOÁ TÍNH CHẤT CỐ Ý: tự báo cáo KHÔNG được thành chặng hoàn thành.
    ghi('viết: tự báo cáo KHÔNG biến thành chặng hoàn thành hay bản điểm',
      sauV.xong.length === truocV.xong.length && Object.keys(sauV.diem).length === Object.keys(truocV.diem).length,
      `chặng xong ${truocV.xong.length} → ${sauV.xong.length} · bản điểm ${Object.keys(truocV.diem).length} → ${Object.keys(sauV.diem).length}`);

    await dongHan('panel viết');
  }

  // ══ PHẦN BỐN: NÓI — và phép kiểm "thiếu thì BÁO" ═══════════════════════════
  const moNoi = await t.danhGia(BAM_THEO_CHU('NÓI VỀ CHẶNG NÀY'));
  ghi('mở đề nói của một chặng', moNoi, moNoi ? '' : 'không thấy nút');

  if (moNoi) {
    await t.doi(`!!${PANEL} && ${CHU_PANEL}.length > 100`, { giay: 25, nhan: 'panel nói mở' });
    const truocN = await t.danhGia(ANH_CHUP);

    // ĐO, KHÔNG ĐOÁN. Bản đầu tôi viết "Chrome headless KHÔNG có
    // SpeechRecognition" rồi đòi đúng câu báo "không hỗ trợ" — và nó báo oan:
    // headless CÓ khai `webkitSpeechRecognition`, chỉ là dịch vụ nhận giọng không
    // với tới được. Nên hỏi trình duyệt trước, rồi mới xét theo nhánh đúng.
    const coApiNoi = await t.danhGia('!!(window.SpeechRecognition || window.webkitSpeechRecognition)');
    const truocLoi = loiThat().length;
    await t.danhGia(BAM_TRONG_PANEL('Bắt đầu nói'));

    // Phép kiểm THẬT SỰ đáng hỏi, dùng được cho cả hai nhánh: **bấm một cái nút
    // thì phải có gì đó xảy ra.** Hoặc app báo không dùng được (kèm đường đi
    // tiếp), hoặc nó thật sự bắt đầu nghe (nút đổi thành "Dừng lại"). Im lặng
    // tuyệt đối là câu trả lời duy nhất không được phép.
    let ketNoi = 'im lặng';
    for (let i = 0; i < 80; i += 1) {
      const chu = await t.danhGia(CHU_PANEL);
      if (chu.includes('Dừng lại')) { ketNoi = 'đã bắt đầu nghe'; break; }
      if (/không hỗ trợ nhận dạng giọng nói|Nhận dạng gặp lỗi|chưa được cấp quyền dùng micro/.test(chu)) {
        ketNoi = 'báo rõ lý do'; break;
      }
      await nghi(100);
    }
    const noLoi = loiThat().length > truocLoi;
    ghi('nói: bấm "Bắt đầu nói" thì PHẢI có gì đó xảy ra, không được im lặng',
      ketNoi !== 'im lặng' && !noLoi,
      `API nhận giọng: ${coApiNoi ? 'có' : 'không'} · kết quả: ${ketNoi}${noLoi ? ' · và có lỗi bắn ra' : ''}`);

    // Nếu app báo lỗi thì lời báo phải chỉ luôn đường đi tiếp, không bỏ người học
    // ở đó. (Nhánh nghe được thì không cần lời báo nào.)
    if (ketNoi === 'báo rõ lý do') {
      const coDuongRa = await t.danhGia(`${CHU_PANEL}.includes('tự gõ lại lời mình nói')`);
      ghi('nói: lời báo chỉ luôn đường làm tiếp (gõ tay), không bỏ người học ở đó', coDuongRa);
    }

    // Ô gõ tay phải LUÔN có mặt, kể cả khi nhận giọng chạy được: đó là đường
    // thoát duy nhất cho người không cấp quyền micro hoặc máy không có micro.
    const coOGoTay = await t.danhGia(`!!${PANEL}.querySelector('textarea')`);
    ghi('nói: luôn có ô gõ tay để làm tiếp không cần micro', coOGoTay);

    await t.danhGia(GO_CHU('I usually get up at six and then I walk to school with my friend because the bus is often late.'));
    await t.doi(`[...${PANEL}.querySelectorAll('button')].some((b) => (b.innerText || '').includes('Nộp lượt nói') && !b.disabled)`,
      { giay: 10, nhan: 'nút Nộp lượt nói mở khoá' });
    await t.danhGia(BAM_TRONG_PANEL('Nộp lượt nói'));
    await nghi(900);
    const chuN = await t.danhGia(CHU_PANEL);
    ghi('nói: gõ tay rồi nộp thì có bảng đối chiếu', /\d+ từ|Độ dài|tiêu chí/i.test(chuN),
      chuN.replace(/\s+/g, ' ').slice(-120));

    const sauN = await t.danhGia(ANH_CHUP);
    ghi('nói: tự báo cáo KHÔNG biến thành chặng hoàn thành hay bản điểm',
      sauN.xong.length === truocN.xong.length && Object.keys(sauN.diem).length === Object.keys(truocN.diem).length,
      `chặng xong ${truocN.xong.length} → ${sauN.xong.length} · bản điểm ${Object.keys(truocN.diem).length} → ${Object.keys(sauN.diem).length}`);

    await dongHan('panel nói');
  }

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

// ══ BÁNH CÓC SỐ BƯỚC ═══════════════════════════════════════════════════════
// Một bộ rà MẤT BƯỚC mà vẫn báo "toàn ĐẠT" là kiểu hỏng tệ nhất của một bộ rà:
// nó không đỏ, nó chỉ soi ít đi. Đã dính thật — thêm hai cờ micro giả cho Chrome
// làm một bước có điều kiện của bộ này biến mất, và nó tụt từ 35 xuống 34 bước
// trong khi vẫn in "bước đạt: 34/34".
//
// Con số dưới là công thật, chỉ được đi LÊN. Bớt bước có chủ ý thì sửa nó và
// ghi vì sao — nhưng phải là một quyết định có chữ, không phải một dòng lọt qua.
  // ⚠️ CON SỐ NÀY ĐẾM CẢ MỘT BƯỚC CÓ ĐIỀU KIỆN.
  // Bước "nói: lời báo chỉ luôn đường làm tiếp" CHỈ chạy khi app báo lỗi micro,
  // tức là khi Chrome TỪ CHỐI micro — mặc định của headless trên máy này. Trên
  // máy có sẵn thiết bị âm thanh, hoặc máy cấp quyền sẵn, bước đó không chạy và
  // chốt này sẽ đỏ vì lý do MÔI TRƯỜNG chứ không phải vì mã hỏng.
  // Gặp đỏ ở đây thì soi môi trường trước, đừng sửa mã. Đỏ oan vẫn tốt hơn mất
  // phép kiểm trong im lặng.
  const SO_BUOC_TOI_THIEU = 35;
  console.log(`\nbước đạt: ${ket.filter((x) => x.ok).length}/${ket.length}`);
  // ⚠️ CHỐT NÀY TỪNG KHÔNG LÀM GÌ CẢ.
  // Bản cũ đặt `process.exitCode = 1` trong nhánh mất bước, rồi NGAY DÒNG SAU
  // gán đè `process.exitCode = ket.every(...)`. Mọi bước chạy đều xanh thì mã
  // thoát về 0 — chốt in ra một dòng ❌ rồi bị chính nó xoá. Đúng họ lỗi mà cả
  // đợt rà này đang gỡ: một lưới an toàn im lặng không bắt gì.
  const matBuoc = ket.length < SO_BUOC_TOI_THIEU;
  if (matBuoc) {
    console.log(`\n❌ MẤT BƯỚC: chỉ chạy ${ket.length}/${SO_BUOC_TOI_THIEU} bước. Bộ rà đang soi ít hơn trước mà không ai bảo nó bớt.`);
    console.log('   Nhớ: bước "nói: lời báo chỉ luôn đường làm tiếp" CHỈ chạy khi Chrome TỪ CHỐI micro.');
    console.log('   Máy có sẵn thiết bị âm thanh thì bước đó không chạy — soi môi trường trước, đừng sửa mã.');
  }
  process.exitCode = (!matBuoc && ket.every((x) => x.ok)) ? 0 : 1;
} catch (e) {
  console.log('\nRÀ DỪNG GIỮA CHỪNG:', e.message);
  try { console.log('hộp thoại đang mở lúc đó:', await t.danhGia(TEN_PANEL_DANG_MO) || '(không có)'); } catch { /* tab đã chết */ }
  console.log('nhật ký tới lúc đó:', JSON.stringify(loiThat().slice(0, 6), null, 1));
  process.exitCode = 1;
} finally {
  t.dong();
  tienTrinh.kill();
  may.dong();
  setTimeout(() => process.exit(process.exitCode ?? 0), 300);
}
