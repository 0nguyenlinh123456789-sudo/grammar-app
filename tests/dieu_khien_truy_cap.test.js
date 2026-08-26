// File: tests/dieu_khien_truy_cap.test.js
// ĐIỀU KHIỂN TRUY CẬP — BỐN CỬA CHƯA TỪNG BỊ THỬ.
//
// ══ VÌ SAO CÓ FILE NÀY ══
// `core.test.js` đã có một bài test lifecycle đầy đủ: tạo mã → kích hoạt →
// xác minh → gia hạn KHÔNG đăng xuất → khách vô danh bị từ chối → tạm khoá →
// bị thu hồi. Bài đó chứng minh CON ĐƯỜNG THẲNG hoạt động.
//
// Vòng kiểm "sẵn sàng bán" (26/08) hỏi khác: **kẻ không đi đường thẳng thì
// sao?** Bốn cửa dưới đây có logic viết sẵn trong `accessCore.js` /
// `routes/access.js` nhưng CHƯA TỪNG được một bài test nào bấm thử:
//
//   1. Mã giới hạn 1 thiết bị — thiết bị thứ hai có bị chặn không?
//   2. Kích hoạt sai liên tục — có bị khoá tốc độ không?
//   3. Cookie bị sửa MỘT KÝ TỰ — có còn được coi là hợp lệ không?
//   4. Mã đã hết hạn — kích hoạt có bị từ chối, đúng lời nhắn không?
//
// Đây đúng là lớp rủi ro nặng nhất trong toàn bộ vòng kiểm "sẵn sàng bán":
// nếu một trong bốn cửa này hở, hậu quả không phải là một câu chữ sai — mà là
// khách trả tiền một thiết bị dùng được N thiết bị, hoặc một mã bị brute-force,
// hoặc một phiên giả danh học viên đã trả tiền.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import accessHandler from '../api/access.js';
import accessAdminHandler from '../api/access-admin.js';
import { accessKey, hashValue, writeAccessRecord } from '../src/server/accessCore.js';
import { dungRedisGia, goi } from './helpers/redisGia.mjs';

async function taoMa(adminCookie, tuyChon = {}) {
  const r = await goi(accessAdminHandler, {
    method: 'POST', headers: { cookie: adminCookie },
    body: { action: 'create', customer: 'Khách kiểm', plan: 'premium', durationDays: 30, maxDevices: 1, ...tuyChon },
  });
  assert.equal(r.statusCode, 201, 'tạo mã thất bại — mọi test dưới đây vô nghĩa nếu bước này hỏng');
  return r.payload;
}

async function dangNhapAdmin() {
  const r = await goi(accessAdminHandler, { method: 'POST', body: { action: 'login', secret: process.env.ACCESS_ADMIN_SECRET } });
  assert.equal(r.statusCode, 200, 'đăng nhập quản trị thất bại — mọi test dưới đây vô nghĩa nếu bước này hỏng');
  return r.headers['Set-Cookie'];
}

// ── 1. GIỚI HẠN THIẾT BỊ ────────────────────────────────────────────────────
test('mã giới hạn 1 thiết bị: thiết bị thứ hai bị chặn, thiết bị đã đăng ký thì kích hoạt lại được', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    const adminCookie = await dangNhapAdmin();
    const { code } = await taoMa(adminCookie, { maxDevices: 1 });

    const mayA1 = await goi(accessHandler, { method: 'POST', body: { action: 'activate', code, deviceId: 'may-a-lan-1' } });
    assert.equal(mayA1.statusCode, 200, 'thiết bị đầu tiên phải kích hoạt được');

    const mayB = await goi(accessHandler, { method: 'POST', body: { action: 'activate', code, deviceId: 'may-b-la-thiet-bi-thu-hai' } });
    assert.equal(mayB.statusCode, 403, 'thiết bị thứ hai KHÔNG được kích hoạt trên mã giới hạn 1 thiết bị');
    assert.equal(mayB.payload.code, 'device-limit');
    assert.equal(mayB.payload.authenticated, undefined, 'từ chối vẫn không được kèm cookie/quyền');

    // Thiết bị ĐÃ đăng ký thì kích hoạt lại (đổi trình duyệt, xoá cookie, cài
    // lại app) vẫn phải được — nó không chiếm thêm suất thiết bị nào.
    const mayA2 = await goi(accessHandler, { method: 'POST', body: { action: 'activate', code, deviceId: 'may-a-lan-1' } });
    assert.equal(mayA2.statusCode, 200, 'thiết bị đã đăng ký rồi phải kích hoạt lại được — không tính là thiết bị mới');
  } finally { khoiPhuc(); }
});

// ── 2. GIỚI HẠN TỐC ĐỘ ──────────────────────────────────────────────────────
test('kích hoạt sai liên tục bị khoá tốc độ sau 10 lần trong 10 phút', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    const thu = () => goi(accessHandler, { method: 'POST', body: { action: 'activate', code: 'GRAM-0000-0000-0000', deviceId: 'thiet-bi-do-tim' } });
    const ketQua = [];
    for (let i = 0; i < 12; i += 1) ketQua.push((await thu()).statusCode);
    const boKhoa = ketQua.filter((sc) => sc === 429).length;
    assert.ok(boKhoa >= 2, `12 lần thử sai mà chỉ ${boKhoa} lần bị khoá tốc độ — brute-force một mã 12 ký tự không bị chặn`);
    assert.equal(ketQua.slice(0, 10).every((sc) => sc !== 429), true, '10 lần đầu (trong hạn mức) không được bị khoá nhầm');
  } finally { khoiPhuc(); }
});

// ── 3. COOKIE BỊ SỬA ────────────────────────────────────────────────────────
test('cookie phiên bị sửa một ký tự thì bị từ chối — chữ ký HMAC phải thật sự được kiểm', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    const adminCookie = await dangNhapAdmin();
    const { code } = await taoMa(adminCookie);
    const activated = await goi(accessHandler, { method: 'POST', body: { action: 'activate', code, deviceId: 'thiet-bi-that' } });
    const cookieThat = activated.headers['Set-Cookie'];
    assert.ok(cookieThat, 'kích hoạt hợp lệ phải trả về cookie');

    // Sửa MỘT ký tự trong phần chữ ký (nằm sau dấu chấm, trước dấu ';' đầu tiên).
    const [capGiaTri, ...con] = cookieThat.split(';');
    const [tenCookie, giaTri] = capGiaTri.split('=');
    const gia = decodeURIComponent(giaTri);
    const viTriSua = gia.length - 3;
    const kyGia = `${gia.slice(0, viTriSua)}${gia[viTriSua] === 'a' ? 'b' : 'a'}${gia.slice(viTriSua + 1)}`;
    assert.notEqual(kyGia, gia, 'phép sửa không thật sự đổi gì — test sẽ dương tính giả');
    const cookieGia = [`${tenCookie}=${encodeURIComponent(kyGia)}`, ...con].join(';');

    const bangCookieThat = await goi(accessHandler, { method: 'GET', headers: { cookie: cookieThat } });
    assert.equal(bangCookieThat.statusCode, 200, 'cookie THẬT phải còn dùng được — nếu không thì phép sửa bên dưới không chứng minh được gì');

    const bangCookieGia = await goi(accessHandler, { method: 'GET', headers: { cookie: cookieGia } });
    assert.equal(bangCookieGia.statusCode, 401, 'cookie bị sửa một ký tự vẫn được chấp nhận — chữ ký HMAC không có tác dụng thật');
    assert.equal(bangCookieGia.payload.authenticated, false);
  } finally { khoiPhuc(); }
});

// ── 4. MÃ ĐÃ HẾT HẠN ────────────────────────────────────────────────────────
test('mã đã hết hạn: kích hoạt bị từ chối đúng lý do, và phiên cũ (nếu có) cũng không còn dùng được', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    const adminCookie = await dangNhapAdmin();
    const { code, record } = await taoMa(adminCookie, { durationDays: 30 });

    // Kích hoạt khi CÒN hạn, lấy một phiên hợp lệ để đối chứng.
    const activated = await goi(accessHandler, { method: 'POST', body: { action: 'activate', code, deviceId: 'thiet-bi-sap-het-han' } });
    assert.equal(activated.statusCode, 200);
    const cookieCu = activated.headers['Set-Cookie'];

    // Đẩy hạn về QUÁ KHỨ thẳng trong kho — mô phỏng "mã đã hết hạn", không cần
    // chờ thời gian thật trôi qua.
    const env = { UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN };
    const codeHash = hashValue(code.trim().toUpperCase().replace(/[^A-Z0-9]/g, ''));
    const hetHan = { ...record, expiresAt: new Date(Date.now() - 86_400_000).toISOString() };
    await writeAccessRecord(env, codeHash, hetHan);

    const kichHoatLai = await goi(accessHandler, { method: 'POST', body: { action: 'activate', code, deviceId: 'thiet-bi-moi-sau-khi-het-han' } });
    assert.equal(kichHoatLai.statusCode, 403);
    assert.equal(kichHoatLai.payload.code, 'expired');
    assert.match(kichHoatLai.payload.message, /hết hạn/);

    // Phiên đã cấp TRƯỚC khi hết hạn cũng không còn được dùng — hết hạn phải
    // khoá NGAY, không đợi cookie 30 ngày của phiên cũ tự hết.
    const dungPhienCu = await goi(accessHandler, { method: 'GET', headers: { cookie: cookieCu } });
    assert.equal(dungPhienCu.statusCode, 401, 'mã đã hết hạn nhưng phiên cấp từ trước vẫn còn dùng được — khách hết hạn vẫn học tiếp được');
  } finally { khoiPhuc(); }
});

// ── 5. ĐĂNG XUẤT ─────────────────────────────────────────────────────────────
// Đăng xuất chỉ xoá cookie ở TRÌNH DUYỆT — token đã ký vẫn còn hợp lệ tới khi
// hết hạn tự nhiên nếu ai đó GIỮ được giá trị cookie từ trước (đây là đặc tính
// của phiên ký kiểu HMAC không trạng thái, không phải lỗi). App tự vệ đúng lớp
// cần vệ: cookie đặt `HttpOnly` (JS trên trang không đọc được) + `Secure` +
// `SameSite=Strict` (không gửi kèm yêu cầu xuyên site) — ba cờ đó chặn đúng
// hai cách phổ biến nhất để lấy trộm cookie (XSS đọc trực tiếp, CSRF gửi kèm).
// Thu hồi TRIỆT ĐỂ (kẻ trộm token vẫn bị chặn) là việc của admin qua
// `resetDevices`/`maxDevices`/`status`, đã kiểm ở `core.test.js`. Test này chỉ
// ghim đúng một điều: nút "Đăng xuất" trên máy của khách phải xoá cookie CỦA
// CHÍNH máy đó thật, để một máy dùng chung (tiệm net, máy mượn) không giữ lại
// phiên của người trước.
test('đăng xuất trả về cờ xoá cookie đúng tên, đúng Max-Age=0', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    const out = await goi(accessHandler, { method: 'POST', body: { action: 'logout' } });
    assert.equal(out.statusCode, 200);
    assert.match(out.headers['Set-Cookie'], /grammar_access=;/);
    assert.match(out.headers['Set-Cookie'], /Max-Age=0/);
  } finally { khoiPhuc(); }
});
