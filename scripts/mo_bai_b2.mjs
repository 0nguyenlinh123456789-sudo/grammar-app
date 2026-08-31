// File: scripts/mo_bai_b2.mjs
// MỞ CÁC CHẶNG TỪ VỰNG B2 MỚI SOẠN BẰNG TRÌNH DUYỆT THẬT.
//
// ══ VÌ SAO KHÔNG TIN TEST LÀ ĐỦ ══
// Dự án này đã hai lần soạn nội dung ĐÚNG NGHĨA nhưng SAI KHUÔN, và cả hai lần
// `npm test` đều xanh: ba dạng bài tập của hai bài C1 dựng xong mới lộ ra
// "Cannot read properties of undefined (reading 'length')" khi bấm sang tab.
// Test đếm được số phần tử trong mảng, nhưng không biết component đọc trường
// tên gì. Nên chặng mới phải được MỞ THẬT một lần trước khi coi là xong.
//
// ══ BÀI ĐỌC NẰM SAU MỘT CHẾ ĐỘ RIÊNG ══
// Bản đầu của bộ rà này chỉ đọc chữ trên trang ngay sau khi mở chặng rồi chấm
// HỎNG "không thấy bài đọc" — trong khi dữ liệu hoàn toàn bình thường, chỉ là
// `learningMode` vẫn đang ở chế độ học từ. Hỏng ở THƯỚC ĐO, không ở app; tin nó
// thì tôi đã đi sửa một chỗ không hỏng. Phải bấm sang "Câu Chuyện" (key 'story'
// trong VocabVstepPage) rồi mới đọc.
import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

// Mỗi chặng khai bốn dấu hiệu: tên thẻ, một mục từ, một câu trong bài đọc, và
// một mẩu câu hỏi soạn tay. Bốn thứ nằm ở bốn chỗ khác nhau trong app, nên khai
// đủ cả bốn thì không có đường nào cho một nửa chặng lặng lẽ trống.
//
// ⚠️ `hoi` PHẢI KỂ ĐỦ CẢ NĂM CÂU CỦA CHẶNG ĐÓ, không được khai một câu.
// Không phải vì app bốc tập con — `storyQuestions` lấy cả 5 câu (limit 8). Lý do
// là nó XÁO thứ tự, còn `ReadingComprehension` chỉ vẽ `pool[idx]`, tức MỘT câu
// mỗi lần. Nên `document.body.innerText` chỉ chứa câu đứng đầu sau khi xáo, và
// khai một câu là đúng 1/5 cơ hội. Bản trước khai đúng một câu cho chặng "Đời
// Sống, Công Việc" và nó chấm HỎNG trong khi dữ liệu hoàn toàn bình thường —
// cùng loại lỗi THƯỚC ĐO với vụ "không thấy bài đọc" ở đầu file. Kể đủ năm câu
// thì xáo kiểu gì câu đứng đầu cũng trúng, mà vẫn bắt được chặng trống thật.
const CHANG = [
  {
    ten: 'Nhận Định & Sự Việc',
    tu: /adequate|consultant|questionnaire/i,
    bai: /THE SCHOOL SURVEY|consultant to find out/i,
    hoi: /Trường thuê chuyên gia tư vấn|chỉ riêng số liệu khảo sát|Vấn đề thật sự khiến học sinh|sau khi đọc báo cáo|một giải pháp ngắn hạn dễ thất bại/i,
  },
  {
    ten: 'Đời Sống, Công Việc',
    tu: /distinct|identical|dominant/i,
    bai: /THE NIGHT SHIFT/i,
    hoi: /Công việc chính của Minh|khó đọc các con số|Nguyên nhân thật sự của sự cố|tốc độ sửa chữa có thể gây ra|cỗ máy có đặc điểm gì/i,
  },
  {
    ten: 'Thời Gian, Mức Độ',
    tu: /nowadays|lighthouse|voluntary/i,
    bai: /THE LIGHTHOUSE ON THE SHORE|voluntary trust was formed/i,
    hoi: /Dì của người kể|Cuộc khảo sát toà tháp|Khoản tiền không ai ngờ|kỳ thực tập ở hải đăng|điều kiện gì khi đồng ý cho xuất bản/i,
  },
];

const may = await moMayChuXemTruoc({ cong: 4371 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9371 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, ct = '') => {
  ket.push({ buoc, ok, ct });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${ct ? ' :: ' + ct : ''}`);
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

for (const c of CHANG) {
  // Về lại mục TỪ VỰNG trước mỗi chặng — sau chặng trước app đang ở màn hình
  // học, không phải danh sách.
  await t.diToi(`${may.BASE}/?e2e=1`);
  await t.doi(`${CHU}.length > 200`, { giay: 40, nhan: 'trang chủ hiện chữ' });
  await t.danhGia(BAM_THEO_CHU('TỪ VỰNG'));
  await cho(1500);

  const moDuoc = await t.danhGia(`(() => {
    const can = ${JSON.stringify(c.ten)};
    const el = [...document.querySelectorAll('*')].filter((e) => e.children.length === 0
      && (e.textContent || '').includes(can));
    if (!el.length) return false;
    let n = el[0];
    for (let i = 0; i < 6 && n; i += 1) {
      if (n.onclick || n.tagName === 'BUTTON' || (n.className || '').toString().includes('cursor-pointer')) { n.click(); return true; }
      n = n.parentElement;
    }
    el[0].click();
    return true;
  })()`);
  await cho(1800);
  ghi(`mở được chặng "${c.ten} (B2)"`, moDuoc,
    moDuoc ? 'đã bấm vào thẻ chặng' : 'KHÔNG tìm thấy chặng trên màn hình');

  const chu = await t.danhGia(CHU);
  const coTu = c.tu.test(chu);
  ghi(`  · "${c.ten}" hiện từ vựng mới soạn`, coTu,
    coTu ? 'thấy mục từ' : `không thấy từ nào; 200 ký tự đầu: ${chu.slice(0, 200)}`);

  await t.danhGia(BAM_THEO_CHU('Câu Chuyện'));
  await cho(1500);
  const chuTruyen = await t.danhGia(CHU);

  const coBai = c.bai.test(chuTruyen);
  ghi(`  · "${c.ten}" hiện bài đọc sau khi bấm "Câu Chuyện"`, coBai,
    coBai ? 'thấy đúng bài đọc đã soạn' : `không thấy; 200 ký tự đầu: ${chuTruyen.slice(0, 200)}`);

  // Câu hỏi phải là câu hỏi VỀ BÀI, không phải dòng cảnh báo "chưa có câu hỏi".
  const coHoi = c.hoi.test(chuTruyen) && !/chưa có câu hỏi/i.test(chuTruyen);
  ghi(`  · "${c.ten}" có câu hỏi đọc hiểu mức văn bản`, coHoi,
    coHoi ? 'thấy câu hỏi soạn tay' : 'không thấy câu hỏi, hoặc đang hiện dòng báo thiếu');
}

const LOC = (x) => x.loai !== 'CONSOLE_WARN' && !/AudioContext/i.test(String(x.text));
const loi = t.nhatKy.filter(LOC);
ghi('không có lỗi console trong cả lượt rà', loi.length === 0,
  loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`).join(' ; ') || 'sạch');

await t.dong();
tienTrinh.kill();
may.dong();

const hong = ket.filter((k) => !k.ok);
if (hong.length) {
  console.log('\nBƯỚC HỎNG:');
  for (const h of hong) console.log(`  · ${h.buoc} — ${h.ct}`);
  process.exit(1);
}
console.log(`\nbước đạt: ${ket.length}/${ket.length}`);
