// File: scripts/bam_dup.mjs
// BẤM ĐÚP KHI NỘP BÀI THI — TRÊN TRÌNH DUYỆT THẬT, KHÔNG PHẢI ĐỌC MÃ.
//
// ══ LỖ ĐÃ ĐO ĐƯỢC (26/08) ══
// `nop()` trong `BandExamPanel.jsx` và `finish()` trong `MockTest.jsx` chấm
// điểm ĐỒNG BỘ và không tự khoá lại — nút chỉ biến mất ở LẦN VẼ SAU (khi state
// `ketQua`/`result` khác null). Bấm đúp thật (phổ biến trên cảm ứng) rơi vào
// cùng một tick JS, TRƯỚC khi React vẽ lại, nên lần bấm thứ hai vẫn chạy hàm
// nộp bài — không sai điểm (cùng câu trả lời chấm ra cùng điểm) nhưng LƯU HAI
// LẦN vào lịch sử thi, và mỗi câu sai bị ghi trùng vào sổ lỗi.
//
// Đã vá bằng một cờ `useRef` chặn lần gọi thứ hai trong cùng tick. Bộ rà này
// CHỨNG MINH bằng cách bấm đúp thật trên trình duyệt thật, không chỉ đọc mã.
import { moTrinhDuyet, moTab, BAM_THEO_CHU, BAM_DUNG_NHAN } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const may = await moMayChuXemTruoc({ cong: 4365 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9345 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};
const cho = (ms) => new Promise((r) => setTimeout(r, ms));
const CHU = '(document.body.innerText || "")';

await t.diToi(`${may.BASE}/?e2e=1`);
await t.doi(`${CHU}.length > 200`, { giay: 40, nhan: 'trang chủ hiện chữ' });
for (let i = 0; i < 8; i += 1) {
  if (await t.danhGia(`${CHU}.includes('LỘ TRÌNH')`)) break;
  const bam = await t.danhGia(BAM_THEO_CHU('Tiếp')) || await t.danhGia(BAM_THEO_CHU('Bắt đầu'))
    || await t.danhGia(BAM_THEO_CHU('Bỏ qua')) || await t.danhGia(BAM_THEO_CHU('Vào học'));
  if (!bam) break;
  await cho(400);
}

await t.danhGia(BAM_THEO_CHU('TẤT CẢ LỘ TRÌNH'));
await cho(1200);
const vaoDuocDe = await t.danhGia(BAM_DUNG_NHAN('VÀO THI'));
await cho(1200);
ghi('mở được đề thi cuối bậc A1', vaoDuocDe, vaoDuocDe ? 'đã vào' : 'không vào được');

// Trả lời ĐẠI đủ số câu chấm được để nút Nộp bài không còn bị khoá bởi
// "chưa trả lời hết" — chọn phương án ĐẦU TIÊN cho mọi câu trắc nghiệm.
// Bấm option đầu tiên (index 0) của MỌI câu hỏi trắc nghiệm hiện có trên
// trang — cấu trúc câu hỏi ở BandExamPanel là các nhóm nút phương án theo sau
// một khối câu hỏi; đơn giản và chắc ăn nhất là bấm nút đầu tiên trong mỗi
// khối `<div>` chứa đúng 4 nút liền kề (đặc trưng trắc nghiệm 4 phương án).
// Khối phương án của một câu là ĐÚNG `<div className="grid gap-1.5">` chứa
// TOÀN nút — khớp với JSX thật của `CauHoi` trong BandExamPanel.jsx, không
// đoán bằng số lượng nút chung chung (cách đó khớp nhầm cả những cụm nút khác
// trên trang, như bản đầu của bộ rà này đã dính — 89 "khối" là con số sai).
const soCauDaChon = await t.danhGia(`(() => {
  let n = 0;
  const khoi = [...document.querySelectorAll('div.grid.gap-1\\\\.5')].filter((d) => {
    const nut = [...d.children].filter((c) => c.tagName === 'BUTTON');
    return nut.length >= 2 && nut.length === d.children.length;
  });
  for (const d of khoi) {
    const nut = [...d.children];
    if (nut[0] && nut[0].getBoundingClientRect().width > 0) { nut[0].click(); n += 1; }
  }
  return n;
})()`);
await cho(600);
ghi('đã chọn phương án cho các câu trắc nghiệm', soCauDaChon > 0, `${soCauDaChon} khối câu hỏi được bấm`);

// Đếm lịch sử thi TRƯỚC khi nộp.
const truoc = await t.danhGia(`(() => { try { return (JSON.parse(localStorage.getItem('bandExamHistoryV1') || '[]')).length; } catch { return -1; } })()`);

// BẤM ĐÚP THẬT — hai lệnh click() trong CÙNG một lần đánh giá, tức cùng một
// tick JS, đúng kiểu bấm đúp ngón tay trên cảm ứng gây ra.
const daBamDup = await t.danhGia(`(() => {
  const el = [...document.querySelectorAll('button')].find((b) => /Nộp bài/i.test((b.innerText||'').trim()) && !b.disabled);
  if (!el) return false;
  el.click(); el.click();
  return true;
})()`);
await cho(800);

const sau = await t.danhGia(`(() => { try { return (JSON.parse(localStorage.getItem('bandExamHistoryV1') || '[]')).length; } catch { return -1; } })()`);
ghi('bấm được nút Nộp bài (đã tìm thấy, không bị khoá)', daBamDup, daBamDup ? 'đã bấm đúp' : 'không tìm thấy nút Nộp bài khả dụng — có thể còn thiếu câu trả lời');

if (daBamDup) {
  ghi('bấm đúp CHỈ lưu MỘT bản ghi vào lịch sử thi, không lưu hai', sau === truoc + 1,
    `trước: ${truoc} · sau: ${sau} (tăng ${sau - truoc}, phải đúng bằng 1)`);
}

const LOC = (x) => x.loai !== 'CONSOLE_WARN' && !/AudioContext/i.test(String(x.text));
const loi = t.nhatKy.filter(LOC);
ghi('không có lỗi console', loi.length === 0, loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 90)}`).join(' ; ') || 'sạch');

const SO_BUOC = daBamDup ? 5 : 4;
await t.dong();
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
process.exit(0);
