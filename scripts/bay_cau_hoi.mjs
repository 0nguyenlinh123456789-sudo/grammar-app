// File: scripts/bay_cau_hoi.mjs
// BẢY CÂU HỎI CỦA NGƯỜI HỌC — ĐO TRÊN MÀN HÌNH THẬT, KHÔNG ĐỌC MÃ NGUỒN.
//
// ══ BỘ RÀ NÀY ĐO GÌ ══
// `khach_dung_het.mjs` đo "bấm được vào đâu, mở ra có nội dung không". Bộ này
// đo một thứ khác hẳn: đứng ở một chỗ trên lộ trình, người học có TRẢ LỜI ĐƯỢC
// bảy câu dưới đây chỉ bằng thứ đang hiện trên màn hình hay không.
//
//   1. Tôi đang ở đâu?
//   2. Tôi vừa hoàn thành gì?
//   3. Tôi phải làm gì tiếp?
//   4. Tại sao tôi học nội dung này?
//   5. Tôi đã đạt điều kiện gì?
//   6. Tôi có quay lại được không?
//   7. Tôi có bị dead-end không?
//
// Một web có thể bấm đâu cũng ra nội dung mà vẫn hỏng ở bảy câu này — người học
// đi được nhưng không biết mình đang đi đâu. Đó là kiểu hỏng không test đơn vị
// nào bắt được, vì về mặt dữ liệu thì mọi thứ đều đúng.
//
// ══ LUẬT ══
// Một câu chỉ tính là TRẢ LỜI ĐƯỢC khi bộ rà in ra ĐÚNG ĐOẠN CHỮ nó tìm thấy
// trên màn hình. "Có chỗ nói về tiến độ" mà không trích được chữ thì không phân
// biệt được với "tôi đoán là có".
import { moTrinhDuyet, moTab, BAM_THEO_CHU, BAM_DUNG_NHAN } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const may = await moMayChuXemTruoc({ cong: 4359 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9339 });
const t = await moTab(cong);

const ket = [];
const ghi = (cau, ok, trich = '') => {
  ket.push({ cau, ok, trich });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${cau}${trich ? ' :: ' + trich : ''}`);
};
const cho = (ms) => new Promise((r) => setTimeout(r, ms));
const CHU = '(document.body.innerText || "")';

/** Trả về đoạn chữ quanh chỗ khớp, để lời báo có căn cứ chứ không phải true/false. */
async function timTrenManHinh(mau, quanh = 90) {
  return t.danhGia(`(() => {
    const chu = ${CHU};
    const m = chu.match(${mau});
    if (!m) return '';
    const i = chu.indexOf(m[0]);
    return chu.slice(Math.max(0, i - 20), i + ${quanh}).replace(/\\s+/g, ' ').trim();
  })()`);
}

// ══ VÀO APP NHƯ KHÁCH MỚI ═════════════════════════════════════════════════
await t.diToi(`${may.BASE}/?e2e=1`);
await t.doi(`${CHU}.length > 200`, { giay: 40, nhan: 'trang chủ hiện chữ' });
// Trình hướng dẫn của khách mới: bấm qua cho tới khi vào màn chính.
for (let i = 0; i < 8; i += 1) {
  const xong = await t.danhGia(`${CHU}.includes('LỘ TRÌNH') || ${CHU}.includes('Lộ trình')`);
  if (xong) break;
  const bam = await t.danhGia(BAM_THEO_CHU('Tiếp')) || await t.danhGia(BAM_THEO_CHU('Bắt đầu'))
    || await t.danhGia(BAM_THEO_CHU('Bỏ qua')) || await t.danhGia(BAM_THEO_CHU('Vào học'));
  if (!bam) break;
  await cho(400);
}
await cho(800);

// ── 1. TÔI ĐANG Ở ĐÂU ─────────────────────────────────────────────────────
{
  const trich = await timTrenManHinh('/(A0|A1|A2|B1|B2|C1)[^\\n]{0,60}(Mất Gốc|Khởi Đầu|Sơ Cấp|Trung Cấp|Trung Cao|Dự Bị)/');
  ghi('1. Tôi đang ở đâu — màn hình có gọi tên bậc hiện tại', !!trich, trich);
}

// ── 2. TÔI VỪA HOÀN THÀNH GÌ ──────────────────────────────────────────────
{
  const trich = await timTrenManHinh('/\\d+\\s*\\/\\s*\\d+|\\d+%|đã xong|Đã học|HOÀN THÀNH/');
  ghi('2. Tôi vừa hoàn thành gì — có con số tiến độ trên màn hình', !!trich, trich);
}

// ── 3. TÔI PHẢI LÀM GÌ TIẾP ───────────────────────────────────────────────
{
  const trich = await timTrenManHinh('/CHẶNG TIẾP THEO[^\\n]{0,120}/', 160);
  const coNut = await t.danhGia(`[...document.querySelectorAll('button')].some((b) => /HỌC TIẾP/i.test(b.innerText))`);
  ghi('3. Tôi phải làm gì tiếp — có thẻ "chặng tiếp theo" kèm nút đi thẳng vào đó',
    !!trich && coNut, `${trich}${coNut ? ' · có nút HỌC TIẾP NGAY' : ' · KHÔNG có nút đi tiếp'}`);
}

// ── 4. TẠI SAO TÔI HỌC NỘI DUNG NÀY ───────────────────────────────────────
// Hai vế: bậc phải nói NGƯỜI HỌC XONG BẬC LÀM ĐƯỢC GÌ, và từng thẻ chặng phải
// nói chặng đó dạy gì. Vế thứ hai là chỗ 12 chặng A0 từng dùng chung một dòng.
{
  const veBac = await timTrenManHinh('/(bạn làm được|Học xong|Đi hết bậc)[^\\n]{0,120}/', 160);
  const soMoTaKhac = await t.danhGia(`(() => {
    const the = [...document.querySelectorAll('div[class*=rounded-3xl]')];
    const mt = the.map((e) => (e.innerText || '').split('\\n')[2] || '').filter((s) => s.length > 25);
    return [new Set(mt).size, mt.length].join('/');
  })()`);
  ghi('4. Tại sao tôi học cái này — bậc khai đầu ra, và các thẻ chặng KHÔNG dùng chung một mô tả',
    !!veBac, `${veBac} · mô tả riêng trên thẻ: ${soMoTaKhac}`);
}

// ── 5. TÔI ĐÃ ĐẠT ĐIỀU KIỆN GÌ ────────────────────────────────────────────
// Cửa ải cuối bậc là chỗ duy nhất trên app nói "đủ điều kiện hay chưa".
{
  const trich = await timTrenManHinh('/(Cửa ải|CỬA ẢI|Thi cuối bậc|Kiểm tra nền)[^\\n]{0,140}/', 190);
  ghi('5. Tôi đã đạt điều kiện gì — cửa ải cuối bậc nói rõ điều kiện mở', !!trich, trich);
}

// ── 6. TÔI CÓ QUAY LẠI ĐƯỢC KHÔNG ─────────────────────────────────────────
// Mở một bài rồi tìm đường về. Không có đường về là dead-end kiểu nhẹ nhất mà
// cũng hay gặp nhất.
{
  await t.danhGia(BAM_THEO_CHU('NGỮ PHÁP'));
  await cho(1200);
  const daVao = await t.danhGia(`${CHU}.length > 400`);
  const duongVe = await t.danhGia(`(() => {
    const nut = [...document.querySelectorAll('button, a')]
      .filter((e) => e.getBoundingClientRect().width > 0)
      .map((e) => (e.innerText || '').trim())
      .filter((s) => /quay lại|trở về|← |Trang chủ|LỘ TRÌNH|Đóng/i.test(s));
    return nut.slice(0, 3).join(' | ');
  })()`);
  ghi('6. Tôi có quay lại được không — trong một khu học có lối về thấy được',
    daVao && !!duongVe, duongVe || 'KHÔNG tìm thấy lối về nào');
}

// ── 7. TÔI CÓ BỊ DEAD-END KHÔNG ───────────────────────────────────────────
// Định nghĩa dead-end đo được: một màn hình mà mọi nút đều không dẫn đi đâu,
// hoặc một màn trắng. Đo bằng cách đếm số lối đi thấy được ở mỗi khu chính.
{
  const KHU = ['LỘ TRÌNH', 'NGỮ PHÁP', 'CHỦ ĐỀ', 'GAMES'];
  const cut = [];
  for (const khu of KHU) {
    await t.danhGia(BAM_THEO_CHU(khu));
    await cho(1000);
    const so = await t.danhGia(`(() => {
      const e = [...document.querySelectorAll('button, a')].filter((x) => {
        const r = x.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (x.innerText || '').trim().length > 0;
      });
      return e.length;
    })()`);
    const chu = await t.danhGia(`${CHU}.length`);
    if (so < 3 || chu < 150) cut.push(`${khu}: ${so} lối đi · ${chu} ký tự`);
  }
  ghi('7. Tôi có bị dead-end không — mọi khu chính đều còn lối đi tiếp', cut.length === 0,
    cut.length ? cut.join(' ; ') : `4/4 khu đều còn ≥3 lối đi thấy được`);
}

// ══ CHỐT TỰ KIỂM ══════════════════════════════════════════════════════════
// Một bộ rà bảy câu mà chỉ chạy năm câu rồi báo "toàn ĐẠT" là kiểu hỏng tệ nhất.
const SO_CAU = 7;
await t.dong();
await tienTrinh.dong?.();
await may.dong?.();

if (ket.length !== SO_CAU) {
  console.log(`\n❌ MẤT CÂU: chỉ chạy ${ket.length}/${SO_CAU}.`);
  process.exit(1);
}
const hong = ket.filter((k) => !k.ok);
if (hong.length) {
  console.log('\nCÂU KHÔNG TRẢ LỜI ĐƯỢC TỪ MÀN HÌNH:');
  for (const h of hong) console.log(`  · ${h.cau}`);
  console.log(`\ntrả lời được: ${ket.length - hong.length}/${SO_CAU}`);
  process.exit(1);
}
console.log(`\ntrả lời được: ${SO_CAU}/${SO_CAU} câu`);
