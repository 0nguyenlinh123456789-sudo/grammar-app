// File: scripts/ra_tu_dong_cap_ma.mjs
//
//   npm run ra:tudongcapma
//
// RÀ KHỐI "CẤP MÃ TỰ ĐỘNG SAU CHUYỂN KHOẢN" TRÊN TRÌNH DUYỆT THẬT — không chỉ
// bằng `node --test`.
//
// ══ VÌ SAO KHÔNG TIN TEST LÀ ĐỦ ══
// `tests/payment_webhook.test.js` và mục 7 của `tests/dieu_khien_truy_cap.test.js`
// đã kiểm kỹ PHẦN MÁY CHỦ: khớp giao dịch, số tiền, idempotent, thanh toán lặp
// lại. Cả hai bộ đó gọi thẳng hàm xử lý, không đi qua một dòng React nào. Dự án
// này đã hai lần soạn nội dung ĐÚNG NGHĨA nhưng SAI KHUÔN mà `npm test` vẫn xanh
// (xem đầu scripts/mo_bai_b2.mjs) — nên phần VẼ RA MÀN HÌNH phải được mở thật
// một lần: có thật sự đăng ký đơn không, có thật sự hỏi lặp lại không, có vẽ
// đúng khi trạng thái đổi không, và bấm "DÙNG MÃ NÀY NGAY" có thật sự điền vào
// ô kích hoạt không.
//
// ══ GIẢ Ở ĐÂU, THẬT Ở ĐÂU ══
// Webhook thanh toán và logic khớp giao dịch GIẢ ĐỊNH đã đúng (đã kiểm ở trên).
// Bộ rà này chỉ giả một "máy chủ" cho `/api/access` (action 'bank'/'order'/
// 'trangThaiDon') ngay trong Node — xem `donHangGia`/`banHangGia` ở
// tests/helpers/trinhduyet.mjs — rồi TỰ TAY lật trạng thái đơn sang đã thanh
// toán, đúng lúc mà webhook thật sẽ làm. Phần còn lại (GET kiểm phiên,
// action:'activate') vẫn đi ra máy chủ thật (không có trên bản dựng tĩnh) nên
// tự nhiên hỏng — đúng trạng thái "khách chưa mua" cần để mở được bảng giá.
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';
import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';

const CONG = 4372;
// Cần MỘT kênh đặt mua để khối chuyển khoản có điều kiện hiện ra
// (`kenh.length > 0` ở AccessGate.jsx) — biến `VITE_*` được NHÚNG LÚC DỰNG,
// nên phải đặt TRƯỚC khi `moMayChuXemTruoc` gọi `vite build`.
process.env.VITE_SALES_ZALO = '0900000000';

const may = await moMayChuXemTruoc({ cong: CONG, dungLai: process.env.BO_DUNG !== '1' });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9372 });

const banHangGia = { ten: 'MB Bank', so: '0000000000', chu: 'NGUYEN VAN A' };
const donHangGia = { don: new Map() };
const t = await moTab(cong, { chanApi: true, banHangGia, donHangGia });

const ket = [];
const ghi = (nhan, ok, ct = '') => {
  ket.push(ok);
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${nhan}${ct ? ` :: ${ct}` : ''}`);
};
const cho = (ms) => new Promise((r) => setTimeout(r, ms));
const CHU = '(document.body.innerText || "")';
const HOP = 'document.querySelector(\'.fixed.inset-0[aria-labelledby="pricing-title"]\')';
const CHU_HOP = `(${HOP} ? ${HOP}.innerText : '')`;
const loiThat = () => t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));

try {
  await t.diToi(`http://127.0.0.1:${CONG}/`);
  await cho(1200);

  // 1. Mở bảng giá, bấm mua gói 1 tháng.
  const moBang = await t.danhGia(BAM_THEO_CHU('XEM BẢNG GIÁ'));
  await cho(700);
  ghi('mở được bảng giá', moBang && (await t.danhGia(`!!${HOP}`)));

  const bam = await t.danhGia(BAM_THEO_CHU('MUA GÓI 1 THÁNG'));
  ghi('bấm được nút "MUA GÓI 1 THÁNG"', bam);

  // 2. Khối ngân hàng GIẢ phải hiện ra (chứng minh action 'bank' đã được đáp).
  let thayNganHang = false;
  for (let i = 0; i < 40; i += 1) {
    if (await t.danhGia(`${CHU_HOP}.includes('MB Bank')`)) { thayNganHang = true; break; }
    await cho(150);
  }
  ghi('khối chuyển khoản hiện đúng thông tin ngân hàng giả', thayNganHang);

  // 3. Đơn phải được ĐĂNG KÝ ở "máy chủ" giả — donHangGia.don phải có đúng 1 mục.
  ghi('đơn được đăng ký ở máy chủ (donHangGia.don có đúng 1 mục)', donHangGia.don.size === 1,
    `hiện có ${donHangGia.don.size} mục`);

  // 4. Khối "đang tự động đối chiếu" phải hiện ra khi đơn còn 'cho'.
  const dangCho = await t.danhGia(`${CHU_HOP}.includes('Đang tự động đối chiếu')`);
  ghi('hiện đúng trạng thái "đang tự động đối chiếu" khi đơn còn chờ', dangCho);

  // 5. Lấy mã đơn THẬT đang hiện trên màn hình, rồi TỰ TAY lật sang đã thanh
  // toán — đúng việc webhook thật sẽ làm, nhưng gọi trực tiếp trong Node thay
  // vì dựng cả một giao dịch ngân hàng giả.
  const maDonTrenManHinh = await t.danhGia(`(${CHU}.match(/BE-[A-Z0-9]{6}/) || [])[0] || ''`);
  const coTrongKho = donHangGia.don.has(maDonTrenManHinh);
  ghi('mã đơn trên màn hình khớp với mã đơn đã đăng ký ở máy chủ giả', coTrongKho,
    `màn hình: "${maDonTrenManHinh}" · kho có: ${[...donHangGia.don.keys()].join(', ')}`);

  const MA_GIA = 'GRAM-TEST-TEST-0001';
  if (coTrongKho) {
    const rec = donHangGia.don.get(maDonTrenManHinh);
    rec.trangThai = 'da_thanh_toan';
    rec.maTruyCap = MA_GIA;
  }

  // 6. Lượt hỏi tiếp theo (mỗi 6 giây) phải thấy trạng thái mới và vẽ khối
  // thành công kèm đúng mã.
  let thayThanhCong = false;
  for (let i = 0; i < 90; i += 1) { // tới 9s > chu kỳ hỏi 6s
    if (await t.danhGia(`${CHU_HOP}.includes('${MA_GIA}')`)) { thayThanhCong = true; break; }
    await cho(150);
  }
  ghi('sau khi "webhook" báo có tiền, màn hình tự vẽ mã truy cập MỚI trong lượt hỏi tiếp theo', thayThanhCong);

  // 7. Bấm "DÙNG MÃ NÀY NGAY" phải điền mã vào ô kích hoạt VÀ đóng bảng giá.
  if (thayThanhCong) {
    await t.danhGia(BAM_THEO_CHU('DÙNG MÃ NÀY NGAY'));
    await cho(300);
    const dongBangGia = !(await t.danhGia(`!!${HOP}`));
    const oMa = await t.danhGia("document.querySelector('#access-code')?.value || ''");
    ghi('bấm "DÙNG MÃ NÀY NGAY" đóng bảng giá và điền đúng mã vào ô kích hoạt', dongBangGia && oMa === MA_GIA,
      `đóng bảng giá: ${dongBangGia} · giá trị ô mã: "${oMa}"`);
  } else {
    ghi('bấm "DÙNG MÃ NÀY NGAY" đóng bảng giá và điền đúng mã vào ô kích hoạt', false, 'bỏ qua vì bước trước đã hỏng');
  }

  ghi('không có lỗi console / ngoại lệ trên toàn bộ đường cấp mã tự động', loiThat().length === 0,
    loiThat().slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`).join(' ; '));
} finally {
  await t.dong();
  await tienTrinh.dong?.();
  await may.dong?.();
}

const soHong = ket.filter((k) => !k).length;
console.log(`\nbước đạt: ${ket.length - soHong}/${ket.length}`);
if (soHong > 0) process.exit(1);
