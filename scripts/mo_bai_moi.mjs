// File: scripts/mo_bai_moi.mjs
// MỞ HAI BÀI C1 MỚI VÀ BẤM QUA TỪNG DẠNG BÀI TẬP — TRÊN TRÌNH DUYỆT THẬT.
//
// ══ VÌ SAO CẦN BỘ RÀ RIÊNG CHO VIỆC NÀY ══
// Vòng kiểm 26/08 soạn hai bài C1 mới và soạn SAI khuôn ba trong sáu dạng bài
// tập. 500 test xanh, lint sạch, build xanh, `khach:het` 22/22 — vì bộ lái đó
// mở bài `b1_01` chứ không mở bài MỚI, còn mọi test khác chỉ ĐẾM số câu.
//
// Rút ra: **nội dung mới soạn phải được MỞ RA nhìn ít nhất một lần.** Đếm được
// không có nghĩa là vẽ được.
//
// Bộ rà này mở đúng hai bài đó và bấm qua từng tab, đòi mỗi tab in ra chữ
// THẬT — không phải chỉ "không lỗi".
import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const may = await moMayChuXemTruoc({ cong: 4361 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9341 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};
const cho = (ms) => new Promise((r) => setTimeout(r, ms));
const CHU = '(document.body.innerText || "")';

// Hai bài mới, và các tab phải mở được ở mỗi bài.
const BAI = [
  { ten: 'Hàm Ý & Thái Độ', mo: 'Hàm Ý' },
  { ten: 'Rào Đón', mo: 'Rào Đón' },
];
const TAB = ['Xếp Câu', 'Trắc Nghiệm', 'Điền Từ', 'Sửa Lỗi', 'Viết Lại', 'Nối Câu', 'Đúng/Sai'];

await t.diToi(`${may.BASE}/?e2e=1`);
await t.doi(`${CHU}.length > 200`, { giay: 40, nhan: 'trang chủ hiện chữ' });
for (let i = 0; i < 8; i += 1) {
  if (await t.danhGia(`${CHU}.includes('LỘ TRÌNH')`)) break;
  const bam = await t.danhGia(BAM_THEO_CHU('Tiếp')) || await t.danhGia(BAM_THEO_CHU('Bắt đầu'))
    || await t.danhGia(BAM_THEO_CHU('Bỏ qua')) || await t.danhGia(BAM_THEO_CHU('Vào học'));
  if (!bam) break;
  await cho(400);
}

// Vào khu NGỮ PHÁP, chọn cụm C1+.
await t.danhGia(BAM_THEO_CHU('NGỮ PHÁP'));
await cho(1500);
await t.danhGia(BAM_THEO_CHU('C1+'));
await cho(1200);

for (const bai of BAI) {
  const moDuoc = await t.danhGia(`(() => {
    const ds = [...document.querySelectorAll('button, div[class*=rounded], li')]
      .filter((e) => e.getBoundingClientRect().width > 0)
      .filter((e) => (e.innerText || '').includes(${JSON.stringify(bai.mo)}));
    const el = ds[ds.length - 1];
    if (!el) return false;
    el.scrollIntoView({ block: 'center' });
    el.click();
    return true;
  })()`);
  await cho(1500);
  const chuBai = await t.danhGia(`${CHU}.length`);
  ghi(`mở bài "${bai.ten}"`, moDuoc && chuBai > 600, moDuoc ? `${chuBai} ký tự trên màn hình` : 'không tìm thấy bài trên màn hình');
  if (!moDuoc) continue;

  // Bấm từng tab dạng bài tập, đòi mỗi tab in ra chữ thật.
  const rong = [];
  const mo = [];
  for (const tab of TAB) {
    const bam = await t.danhGia(BAM_THEO_CHU(tab));
    if (!bam) continue;              // bài không có dạng này thì tab không hiện
    await cho(900);
    // Đo phần THÂN dạng bài tập, không đo cả trang: cả trang luôn có chữ.
    const than = await t.danhGia(`(() => {
      const chu = ${CHU};
      const i = chu.indexOf(${JSON.stringify(tab)});
      return chu.slice(i).replace(/\\s+/g, ' ').trim().length;
    })()`);
    mo.push(`${tab}:${than}`);
    if (than < 120) rong.push(tab);
  }
  ghi(`bài "${bai.ten}": mọi dạng bài tập mở ra đều CÓ nội dung`, mo.length >= 5 && rong.length === 0,
    rong.length ? `TAB RỖNG: ${rong.join(', ')}` : `${mo.length} dạng: ${mo.join(' · ')}`);

  // Quay lại danh sách bài để mở bài tiếp theo.
  await t.danhGia(BAM_THEO_CHU('Quay lại')) || await t.danhGia(BAM_THEO_CHU('NGỮ PHÁP'));
  await cho(1200);
  await t.danhGia(BAM_THEO_CHU('C1+'));
  await cho(900);
}

// Lỗi console trên toàn đường đi.
const LOC = (x) => x.loai !== 'CONSOLE_WARN' && !/AudioContext/i.test(String(x.text));
const loi = t.nhatKy.filter(LOC);
ghi('không có lỗi console trên đường mở hai bài mới', loi.length === 0,
  loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 100)}`).join(' ; ') || 'sạch');

// ══ CHỐT TỰ KIỂM ══════════════════════════════════════════════════════════
const SO_BUOC = BAI.length * 2 + 1;
await t.dong();
await tienTrinh.dong?.();
await may.dong?.();

if (ket.length !== SO_BUOC) {
  console.log(`\n❌ MẤT BƯỚC: chỉ chạy ${ket.length}/${SO_BUOC}.`);
  process.exit(1);
}
const hong = ket.filter((k) => !k.ok);
if (hong.length) {
  console.log('\nBƯỚC HỎNG:');
  for (const h of hong) console.log(`  · ${h.buoc} — ${h.chiTiet}`);
  process.exit(1);
}
console.log(`\nbước đạt: ${SO_BUOC}/${SO_BUOC}`);
