// CHUYỂN KHOẢN NGÂN HÀNG PHẢI ĐỦ ĐỂ TRẢ TIỀN, VÀ ĐỦ ĐỂ TRA RA AI ĐÃ TRẢ.
//
// ══ QUYẾT ĐỊNH ĐỨNG SAU ══
// Chủ dự án muốn tiền vào thẳng ngân hàng mà không lộ thông tin cá nhân. Hai vế
// đó không cùng đúng được — mọi chuyển khoản ở VN đều hiện TÊN CHỦ TÀI KHOẢN cho
// người trả. Chủ dự án chọn dứt khoát: **chấp nhận lộ TÊN, không lộ thứ khác**.
// File này canh cả hai nửa của câu đó, kể cả nửa thứ hai — vì nửa thứ hai là thứ
// dễ bị nới lỏng dần về sau ("thêm số điện thoại cho tiện hỗ trợ").
//
// ══ THỨ DỄ HỎNG NHẤT KHÔNG PHẢI GIAO DIỆN ══
// Ảnh QR lấy từ app ngân hàng là QR TĨNH: mang số tài khoản, KHÔNG mang số tiền,
// KHÔNG mang nội dung. Người mua vẫn phải gõ tay. Nội dung trống thì người bán
// thấy tiền vào mà không biết của ai — và chuyện đó hỏng SAU KHI khách đã trả
// tiền, tức chỗ tệ nhất để hỏng. Nên mã đơn được canh kỹ hơn cả số tài khoản.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createElement as h } from 'react';
import {
  CHUA_CO_CHUYEN_KHOAN, DANG_LAY_NGAN_HANG, KHOA_NGAN_HANG, MAU_MA_DON, layThongTinNganHang,
  loiNhanDatMua, maDonGiuLai, maDonHang, thongTinChuyenKhoan,
} from '../src/utils/banHang.js';
import { napComponent, veRa, camGlobalTrinhDuyet } from './helpers/render.mjs';

camGlobalTrinhDuyet();

// ⚠️ KHÔNG có tiền tố VITE_: bốn khoá này cố ý là biến MÁY CHỦ (27/08), vì
// VITE_* bị nhúng thẳng vào bundle công khai lúc dựng.
const DU = {
  BANK_NAME: 'Vietcombank',
  BANK_ACCOUNT: '0123456789',
  BANK_HOLDER: 'NGUYEN VAN A',
  BANK_QR: '/qr-nganhang.png',
};
const NH = { ten: 'Vietcombank', so: '0123456789', chu: 'NGUYEN VAN A', qr: '/qr-nganhang.png' };

test('thiếu ngân hàng HOẶC thiếu số tài khoản thì trả null, không hiện một nửa', () => {
  // Một khối chuyển khoản có số mà không có ngân hàng là thứ khách không dùng
  // được, nhưng nhìn thì tưởng đã đủ — đúng loại "lặng lẽ thiếu" dự án đang canh.
  assert.equal(thongTinChuyenKhoan({}), null);
  assert.equal(thongTinChuyenKhoan(), null);
  assert.equal(thongTinChuyenKhoan({ BANK_ACCOUNT: '0123456789' }), null);
  assert.equal(thongTinChuyenKhoan({ BANK_NAME: 'Vietcombank' }), null);
  assert.equal(thongTinChuyenKhoan({ BANK_NAME: '  ', BANK_ACCOUNT: '0123456789' }), null);

  const du = thongTinChuyenKhoan(DU);
  assert.deepEqual(du, { ten: 'Vietcombank', so: '0123456789', chu: 'NGUYEN VAN A', qr: '/qr-nganhang.png' });
  // Tên chủ tài khoản và QR là TÙY CHỌN: thiếu thì bớt phần đó chứ không chặn cả
  // khối, vì chuyển khoản tay bằng số tài khoản vẫn xong.
  const toiThieu = thongTinChuyenKhoan({ BANK_NAME: 'MB', BANK_ACCOUNT: '999' });
  assert.equal(toiThieu.ten, 'MB');
  assert.equal(toiThieu.chu, '');
  assert.equal(toiThieu.qr, '');
});

test('KHÔNG có khóa nào xin thông tin cá nhân ngoài TÊN chủ tài khoản', () => {
  // Ràng buộc của chủ dự án, viết thành phép kiểm để nó không bị nới dần về sau.
  const khoa = Object.values(KHOA_NGAN_HANG).join(' ').toLowerCase();
  for (const cam of ['phone', 'dienthoai', 'zalo', 'email', 'mail', 'address', 'diachi', 'cccd', 'cmnd']) {
    assert.ok(!khoa.includes(cam), `KHOA_NGAN_HANG có khóa xin "${cam}" — vượt quá thứ chủ dự án đồng ý lộ`);
  }
  assert.deepEqual(Object.keys(KHOA_NGAN_HANG).sort(), ['chu', 'qr', 'so', 'ten']);
});

test('mã đơn gõ lại được: không có ký tự dễ nhìn nhầm, và không trùng nhau hàng loạt', () => {
  // Khách phải GÕ TAY mã này vào ô nội dung trên app ngân hàng. Một cặp ký tự
  // nhìn giống nhau (0/O, 1/I/L, 5/S, 2/Z) là đủ để người bán tra không ra đơn.
  const ds = Array.from({ length: 500 }, () => maDonHang());
  for (const m of ds) {
    assert.match(m, /^BE-[ABCDEFGHJKMNPQRTUVWXY346789]{6}$/, `mã sai hình: ${m}`);
    assert.ok(!/[OILSZ0125]/.test(m.slice(3)), `mã chứa ký tự dễ nhìn nhầm: ${m}`);
  }
  // 27^6 ≈ 387 triệu tổ hợp; 500 mã mà trùng quá 1 lần là dấu hiệu bộ sinh hỏng
  // (ví dụ quên gọi getRandomValues và trả về cùng một mảng 0).
  assert.ok(new Set(ds).size >= 499, `500 mã chỉ ra ${new Set(ds).size} giá trị khác nhau — bộ sinh hỏng`);

  // Không có crypto thì vẫn phải sinh được, chỉ kém ngẫu nhiên hơn — mã này
  // không cấp quyền gì nên đánh đổi đó chấp nhận được, nhưng NÉM LỖI thì không.
  //
  // ⚠️ Bản đầu viết `maDonHang(undefined)` và chú thích rằng nó chạy nhánh dự
  // phòng. SAI: tham số có giá trị mặc định `globalThis.crypto`, nên truyền
  // `undefined` là KÍCH HOẠT mặc định — nó chạy lại đúng nhánh crypto, và
  // nhánh Math.random không hề được đụng tới trong khi test khai là có.
  const ds2 = Array.from({ length: 50 }, () => maDonHang(null));
  assert.equal(new Set(ds2).size >= 49, true, 'nhánh không có crypto sinh ra mã trùng nhau');
  for (const m of ds2) assert.match(m, /^BE-[ABCDEFGHJKMNPQRTUVWXY346789]{6}$/, m);
});

test('lời nhắn đặt mua nêu mã đơn TRƯỚC, vì đó là thứ người bán cần đầu tiên', () => {
  const chu = loiNhanDatMua('Premium', { VITE_PRICE_PREMIUM: '499.000đ' }, 'BE-A7K3MN');
  assert.ok(chu.includes('BE-A7K3MN'), chu);
  assert.ok(chu.indexOf('BE-A7K3MN') < chu.indexOf('mã truy cập'), 'mã đơn phải đứng trước câu xin mã truy cập');
  // Chưa có mã đơn thì KHÔNG được để lại một câu cụt "Mã đơn của tôi: ."
  const khong = loiNhanDatMua('Premium', {}, '');
  assert.ok(!/Mã đơn/.test(khong), khong);
});

// ── VẼ RA THẬT: chuỗi nằm trong mã không có nghĩa là khách đọc được ─────────
test('vẽ ChuyenKhoan: đủ thông tin thì hiện số tài khoản, số tiền VÀ mã đơn', async () => {
  const { KhoiChuyenKhoan } = await napComponent('src/components/access/ChuyenKhoan.jsx');
  const html = veRa(h(KhoiChuyenKhoan, { maDon: 'BE-A7K3MN', soTien: '499.000đ', nh: NH }));

  for (const can of ['Vietcombank', '0123456789', 'NGUYEN VAN A', '499.000đ', 'BE-A7K3MN']) {
    assert.ok(html.includes(can), `màn hình không hiện "${can}"`);
  }
  assert.ok(html.includes('/qr-nganhang.png'), 'không vẽ ảnh QR đã cấu hình');

  // MÃ ĐƠN PHẢI XUẤT HIỆN NHIỀU LẦN, và đây là phép kiểm đáng giá nhất file này:
  // một lần ở khối mã đơn, một lần ở đúng dòng "Nội dung", một lần dưới ảnh QR.
  // Chỉ hiện một lần thì khách rất dễ chuyển khoản với nội dung trống — cách
  // hỏng thường gặp nhất, và nó hỏng sau khi tiền đã đi.
  const soLan = html.split('BE-A7K3MN').length - 1;
  assert.ok(soLan >= 3, `mã đơn chỉ hiện ${soLan} lần; phải có ở cả khối mã, dòng Nội dung và chú thích QR`);
  assert.match(html, /Nội dung chuyển khoản|Nội dung/, 'không chỉ chỗ gõ mã đơn vào');
});

test('vẽ ChuyenKhoan: chưa cấu hình ngân hàng thì BÁO, không vẽ khối rỗng', async () => {
  const { KhoiChuyenKhoan } = await napComponent('src/components/access/ChuyenKhoan.jsx');
  const html = veRa(h(KhoiChuyenKhoan, { maDon: 'BE-A7K3MN', soTien: '499.000đ', nh: null }));
  assert.ok(html.includes(CHUA_CO_CHUYEN_KHOAN.slice(0, 40)), `phải báo chưa có thông tin chuyển khoản: ${html.slice(0, 200)}`);
  assert.ok(!html.includes('Số tài khoản'), 'vẫn vẽ khung chuyển khoản dù không có số tài khoản');
});

test('vẽ ChuyenKhoan: chưa đặt giá thì nói thẳng ngay tại chỗ sắp gõ số tiền', async () => {
  // Đây là lúc thiếu giá đau nhất: khách đang mở app ngân hàng và cần một con số.
  const { KhoiChuyenKhoan } = await napComponent('src/components/access/ChuyenKhoan.jsx');
  const html = veRa(h(KhoiChuyenKhoan, { maDon: 'BE-A7K3MN', soTien: '', nh: NH }));
  assert.match(html, /Chưa có giá niêm yết/, 'không có giá mà cũng không nói gì');
});

test('KHÔNG hiện số tài khoản khi chưa có đường GIAO mã truy cập', () => {
  // ⚠️ LỖ TÔI TỰ TẠO RA Ở COMMIT TRƯỚC, và bộ rà của tôi CHẤM ĐẠT cho nó.
  // Đặt VITE_BANK_* mà để trống cả bốn VITE_SALES_* thì màn hình hiện số tài
  // khoản thật, mã đơn thật — rồi ngay bên dưới nói "Chưa có kênh đặt mua nào
  // được cấu hình". Khách chuyển tiền thật xong đọc câu đó. Trước commit đó
  // KHÔNG AI trả được tiền nên không ai kẹt; sau nó thì có.
  //
  // Bộ rà lọt vì nó kiểm TỪNG MẢNH riêng: `coCK || baoCK` đạt, `coBao || coKenh`
  // đạt, và không phép nào hỏi về CẶP. Đúng hình dạng hai cái bẫy đã sửa trước
  // đó trong phiên này: mỗi nửa đúng, cặp thì sai.
  //
  // Luật của dự án quyết định chỗ này: hướng dẫn trả tiền mà không có đường
  // nhận hàng thì không phải ẨN, cũng không phải BÁO — nên không được hiện.
  const s = fs.readFileSync('src/components/access/AccessGate.jsx', 'utf8');
  assert.match(s, /{kenh.length > 0 && <ChuyenKhoan/,
    'khối chuyển khoản KHÔNG bị chặn theo việc có kênh giao mã — khách trả tiền xong sẽ không nhận được gì');
});

test('mã đơn GIỮ LẠI qua các lượt mở, không sinh mới mỗi lần', () => {
  // Đóng tab rồi mở lại mà ra mã khác thì khoản tiền vừa chuyển mang một mã app
  // đã quên — đúng thứ mã đơn sinh ra để chặn, đến bằng cửa khác.
  const kho = new Map();
  const gia = { getItem: (k) => kho.get(k) ?? null, setItem: (k, v) => kho.set(k, v) };
  const lan1 = maDonGiuLai(gia);
  assert.match(lan1, MAU_MA_DON);
  assert.equal(maDonGiuLai(gia), lan1, 'lượt sau ra mã khác — khách chép mã cũ thành rác');

  // Giá trị rác trong localStorage (người dùng tự sửa, phiên bản cũ) phải bị bỏ
  // và sinh lại, chứ không đem một chuỗi vô nghĩa đi bảo khách gõ vào ngân hàng.
  kho.set('grammarMaDonV1', 'rác không đúng hình');
  assert.match(maDonGiuLai(gia), MAU_MA_DON);

  // Safari chế độ riêng tư NÉM khi chạm localStorage. Vẫn phải ra mã dùng được.
  const nem = { getItem() { throw new Error("SecurityError"); }, setItem() { throw new Error("SecurityError"); } };
  assert.match(maDonGiuLai(nem), MAU_MA_DON);
  assert.match(maDonGiuLai(undefined), MAU_MA_DON);
});

test('bảng giá thật sự dùng khối này, và .env.example khai đủ khóa', () => {
  const s = fs.readFileSync('src/components/access/AccessGate.jsx', 'utf8');
  assert.ok(s.includes('<ChuyenKhoan'), 'PricingModal không gắn khối chuyển khoản');
  assert.ok(s.includes('maDonGiuLai'), 'PricingModal không lấy mã đơn giữ lại');
  // Mã đơn phải là TRẠNG THÁI, không gọi thẳng trong JSX: gọi trong JSX thì mỗi
  // lần React vẽ lại ra một mã khác, và mã khách vừa chép thành rác.
  assert.ok(!/<ChuyenKhoan[^>]*maDon={maDon(GiuLai|Hang)()}/.test(s),
    'mã đơn sinh ngay trong JSX — mỗi lần vẽ lại sẽ đổi mã');

  const vd = fs.readFileSync('.env.example', 'utf8');
  for (const k of Object.values(KHOA_NGAN_HANG)) assert.ok(vd.includes(k), `${k} thiếu trong .env.example`);
});

// ══════════════════════════════════════════════════════════════════════════
// 27/08 — PHƯƠNG ÁN C: SỐ TÀI KHOẢN RỜI KHỎI BUNDLE, VỀ PHÍA MÁY CHỦ.
//
// Bốn phép kiểm dưới đây canh đúng thứ mà đợt sửa này hứa. Phép quan trọng nhất
// là phép ĐẦU TIÊN: nó đọc bundle đã dựng và đòi rằng bốn khoá `VITE_BANK_*`
// không còn được nhắc tới ở đâu trong mã nguồn — vì chỉ cần một chỗ sót lại là
// cả đợt sửa này thành vô nghĩa, mà không phép kiểm hành vi nào phát hiện ra.
test('KHÔNG còn chỗ nào đọc VITE_BANK_* — nếu còn, số tài khoản vẫn nằm trong bundle công khai', () => {
  const dsFile = [];
  const quet = (thuMuc) => {
    for (const e of fs.readdirSync(thuMuc, { withFileTypes: true })) {
      const duong = `${thuMuc}/${e.name}`;
      if (e.isDirectory()) quet(duong);
      else if (/\.(js|jsx)$/.test(e.name)) dsFile.push(duong);
    }
  };
  quet('src');

  const pham = [];
  for (const f of dsFile) {
    const noiDung = fs.readFileSync(f, 'utf8');
    // Bỏ qua phần chú thích giải thích LỊCH SỬ (dòng bắt đầu bằng // hoặc *):
    // chú thích nhắc tên khoá cũ là thứ nên giữ, không phải thứ phải xoá.
    for (const [i, dong] of noiDung.split('\n').entries()) {
      const sach = dong.trim();
      if (sach.startsWith('//') || sach.startsWith('*') || sach.startsWith('/*')) continue;
      if (/VITE_BANK_/.test(dong)) pham.push(`${f}:${i + 1}`);
    }
  }
  assert.deepEqual(pham, [], `còn mã ĐANG CHẠY đọc VITE_BANK_* (${pham.join(', ')}) — Vite sẽ nhúng số tài khoản vào bundle công khai`);
});

test('bốn khoá ngân hàng KHÔNG mang tiền tố VITE_ — đó là toàn bộ điểm của phương án C', () => {
  for (const [vaiTro, khoa] of Object.entries(KHOA_NGAN_HANG)) {
    assert.ok(!khoa.startsWith('VITE_'), `khoá "${vaiTro}" = ${khoa} có tiền tố VITE_ → bị nhúng vào bundle công khai`);
  }
});

test('layThongTinNganHang: mọi nhánh hỏng đều CHỈ ĐƯỜNG ĐI TIẾP, không nhánh nào im lặng', async () => {
  // Luật của dự án: không nhánh nào được bỏ người dùng đứng đó, và không nhánh
  // nào được khai một việc chưa xảy ra. Ở đúng bước trả tiền thì luật đó đắt
  // nhất — khách đang cầm điện thoại mở app ngân hàng.
  const dat = await layThongTinNganHang('BE-A7K3MN', async () => ({
    ok: true, status: 200, json: async () => ({ nganHang: NH }),
  }));
  assert.deepEqual(dat, { ok: true, nganHang: NH });

  // Máy chủ trả một NỬA (có tên NH, thiếu số TK) thì phải coi như KHÔNG có —
  // cùng luật với `thongTinChuyenKhoan`, để một nửa không lọt ra màn hình.
  const nua = await layThongTinNganHang('BE-A7K3MN', async () => ({
    ok: true, status: 200, json: async () => ({ nganHang: { ten: 'MB', so: '' } }),
  }));
  assert.equal(nua.ok, false);
  assert.ok(nua.chu.length > 20, 'nhánh nửa vời không nói gì');

  const khoa = await layThongTinNganHang('BE-A7K3MN', async () => ({ ok: false, status: 429, json: async () => ({}) }));
  assert.equal(khoa.ok, false);
  assert.match(khoa.chu, /chờ ít phút|người bán/i);

  const chuaDat = await layThongTinNganHang('BE-A7K3MN', async () => ({ ok: false, status: 404, json: async () => ({}) }));
  assert.equal(chuaDat.ok, false);
  assert.equal(chuaDat.chu, CHUA_CO_CHUYEN_KHOAN);

  const mangDut = await layThongTinNganHang('BE-A7K3MN', async () => { throw new Error('offline'); });
  assert.equal(mangDut.ok, false);
  assert.match(mangDut.chu, /mất mạng|thử lại/i);

  // Trình duyệt không có fetch: vẫn phải chỉ đường, không được ném lên màn hình.
  const khongFetch = await layThongTinNganHang('BE-A7K3MN', undefined);
  assert.equal(khongFetch.ok, false);
  assert.ok(khongFetch.chu.includes('người bán'), khongFetch.chu);
});

test('đang hỏi máy chủ thì NÓI ĐANG HỎI, không vẽ khung rỗng cũng không báo "chưa cấu hình"', async () => {
  // Nhánh này dễ làm sai theo hướng tệ: lúc chờ mạng mà hiện luôn "Chưa có
  // thông tin chuyển khoản" thì khách đọc thành "người bán chưa sẵn sàng" rồi
  // bỏ đi, trong khi thật ra chỉ là còn 300ms nữa là có.
  const { KhoiChuyenKhoan } = await napComponent('src/components/access/ChuyenKhoan.jsx');
  const html = veRa(h(KhoiChuyenKhoan, { maDon: 'BE-A7K3MN', soTien: '499.000đ', nh: null, loi: DANG_LAY_NGAN_HANG }));
  assert.ok(html.includes(DANG_LAY_NGAN_HANG.slice(0, 20)), `phải báo đang lấy: ${html.slice(0, 200)}`);
  assert.ok(!html.includes(CHUA_CO_CHUYEN_KHOAN.slice(0, 30)), 'đang chờ mạng mà đã kết luận "chưa cấu hình"');
  assert.ok(!html.includes('Số tài khoản'), 'vẽ khung chuyển khoản khi chưa có dữ liệu');
});
