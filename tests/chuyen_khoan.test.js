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
  CHUA_CO_CHUYEN_KHOAN, KHOA_NGAN_HANG, loiNhanDatMua, maDonHang, thongTinChuyenKhoan,
} from '../src/utils/banHang.js';
import { napComponent, veRa, camGlobalTrinhDuyet } from './helpers/render.mjs';

camGlobalTrinhDuyet();

const DU = {
  VITE_BANK_NAME: 'Vietcombank',
  VITE_BANK_ACCOUNT: '0123456789',
  VITE_BANK_HOLDER: 'NGUYEN VAN A',
  VITE_BANK_QR: '/qr-nganhang.png',
};

test('thiếu ngân hàng HOẶC thiếu số tài khoản thì trả null, không hiện một nửa', () => {
  // Một khối chuyển khoản có số mà không có ngân hàng là thứ khách không dùng
  // được, nhưng nhìn thì tưởng đã đủ — đúng loại "lặng lẽ thiếu" dự án đang canh.
  assert.equal(thongTinChuyenKhoan({}), null);
  assert.equal(thongTinChuyenKhoan(), null);
  assert.equal(thongTinChuyenKhoan({ VITE_BANK_ACCOUNT: '0123456789' }), null);
  assert.equal(thongTinChuyenKhoan({ VITE_BANK_NAME: 'Vietcombank' }), null);
  assert.equal(thongTinChuyenKhoan({ VITE_BANK_NAME: '  ', VITE_BANK_ACCOUNT: '0123456789' }), null);

  const du = thongTinChuyenKhoan(DU);
  assert.deepEqual(du, { ten: 'Vietcombank', so: '0123456789', chu: 'NGUYEN VAN A', qr: '/qr-nganhang.png' });
  // Tên chủ tài khoản và QR là TÙY CHỌN: thiếu thì bớt phần đó chứ không chặn cả
  // khối, vì chuyển khoản tay bằng số tài khoản vẫn xong.
  const toiThieu = thongTinChuyenKhoan({ VITE_BANK_NAME: 'MB', VITE_BANK_ACCOUNT: '999' });
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

  // Không có crypto thì vẫn phải sinh được, chỉ là kém ngẫu nhiên hơn — mã này
  // không cấp quyền gì nên đánh đổi đó chấp nhận được, nhưng NÉM LỖI thì không.
  const ds2 = Array.from({ length: 50 }, () => maDonHang(undefined));
  assert.equal(new Set(ds2).size >= 49, true, 'nhánh không có crypto sinh ra mã trùng nhau');
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
  const { default: ChuyenKhoan } = await napComponent('src/components/access/ChuyenKhoan.jsx');
  const html = veRa(h(ChuyenKhoan, { maDon: 'BE-A7K3MN', soTien: '499.000đ', env: DU }));

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
  const { default: ChuyenKhoan } = await napComponent('src/components/access/ChuyenKhoan.jsx');
  const html = veRa(h(ChuyenKhoan, { maDon: 'BE-A7K3MN', soTien: '499.000đ', env: {} }));
  assert.ok(html.includes(CHUA_CO_CHUYEN_KHOAN.slice(0, 40)), `phải báo chưa có thông tin chuyển khoản: ${html.slice(0, 200)}`);
  assert.ok(!html.includes('Số tài khoản'), 'vẫn vẽ khung chuyển khoản dù không có số tài khoản');
});

test('vẽ ChuyenKhoan: chưa đặt giá thì nói thẳng ngay tại chỗ sắp gõ số tiền', async () => {
  // Đây là lúc thiếu giá đau nhất: khách đang mở app ngân hàng và cần một con số.
  const { default: ChuyenKhoan } = await napComponent('src/components/access/ChuyenKhoan.jsx');
  const html = veRa(h(ChuyenKhoan, { maDon: 'BE-A7K3MN', soTien: '', env: DU }));
  assert.match(html, /Chưa có giá niêm yết/, 'không có giá mà cũng không nói gì');
});

test('bảng giá thật sự dùng khối này, và .env.example khai đủ khóa', () => {
  const s = fs.readFileSync('src/components/access/AccessGate.jsx', 'utf8');
  assert.ok(s.includes('<ChuyenKhoan'), 'PricingModal không gắn khối chuyển khoản');
  assert.ok(s.includes('maDonHang'), 'PricingModal không sinh mã đơn');
  // Mã đơn phải là TRẠNG THÁI, không phải gọi thẳng trong JSX: gọi trong JSX thì
  // mỗi lần React vẽ lại ra một mã khác, và mã khách vừa chép thành rác.
  assert.ok(!/<ChuyenKhoan[^>]*maDon=\{maDonHang\(\)\}/.test(s),
    'mã đơn sinh ngay trong JSX — mỗi lần vẽ lại sẽ đổi mã');

  const vd = fs.readFileSync('.env.example', 'utf8');
  for (const k of Object.values(KHOA_NGAN_HANG)) assert.ok(vd.includes(k), `${k} thiếu trong .env.example`);
});
