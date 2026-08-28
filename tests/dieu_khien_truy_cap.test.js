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
import { xuLyPaymentWebhook } from '../src/server/routes/paymentWebhook.js';
import { accessKey, hashValue, writeAccessRecord } from '../src/server/accessCore.js';
import { dungRedisGia, goi } from './helpers/redisGia.mjs';

// Vỏ mỏng cho khớp hình dạng handler 2 tham số mà `goi()` cần —
// `xuLyPaymentWebhook` nhận `(request, env, response)`, không phải
// `(request, response)` như hai tuyến kia.
const webhookHandler = (request, response) => xuLyPaymentWebhook(request, process.env, response);

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

// ── 6. THÔNG TIN CHUYỂN KHOẢN Ở PHÍA MÁY CHỦ (phương án C, 27/08) ───────────
// Đây là cửa MỚI mở ra trên chính tuyến đang giữ quyền truy cập, nên nó phải
// được thử kỹ như bốn cửa trên: một nhánh hớ ở đây không làm lộ bài học, nó làm
// lộ số tài khoản hoặc chặn mất đường trả tiền.
test('xin thông tin chuyển khoản: phải có mã đơn đúng hình, và KHÔNG đòi phiên đã đăng nhập', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.BANK_NAME = 'MB Bank';
    process.env.BANK_ACCOUNT = '0000000000';
    process.env.BANK_HOLDER = 'NGUYEN VAN A';

    // ⚠️ PHÉP KIỂM QUAN TRỌNG NHẤT FILE NÀY.
    // "Chỉ cấp cho phiên đã xác thực" nghe rất chặt, nhưng hiểu theo đúng chữ
    // thì nó khoá đúng người cần: khách SẮP MUA chưa có mã truy cập nào cả —
    // mã là thứ họ đang trả tiền để lấy. Nếu ai đó về sau thêm `requireLearner`
    // vào nhánh này, web sẽ chỉ bán được cho người đã là khách, tức không bán
    // được cho ai. Phép kiểm này gọi mà KHÔNG kèm cookie nào.
    const khachLa = await goi(accessHandler, { method: 'POST', body: { action: 'bank', maDon: 'BE-A7K3MN' } });
    assert.equal(khachLa.statusCode, 200, 'khách chưa có mã truy cập KHÔNG xin được số tài khoản — không ai mua được nữa');
    assert.equal(khachLa.payload.nganHang.ten, 'MB Bank');
    assert.equal(khachLa.payload.nganHang.so, '0000000000');

    // Không có mã đơn / mã đơn sai hình thì từ chối: đó là cửa buộc bên gọi phải
    // đi qua bước chọn gói, và giữ cho máy quét tệp tĩnh không gom được.
    for (const xau of [undefined, '', 'linh tinh', 'BE-000', 'BE-A7K3M']) {
      const r = await goi(accessHandler, { method: 'POST', body: { action: 'bank', maDon: xau } });
      assert.equal(r.statusCode, 400, `mã đơn "${xau}" phải bị từ chối`);
      assert.equal(r.payload.nganHang, undefined, 'từ chối mà vẫn kèm số tài khoản');
    }
  } finally {
    delete process.env.BANK_NAME; delete process.env.BANK_ACCOUNT; delete process.env.BANK_HOLDER;
    khoiPhuc();
  }
});

test('chưa đặt BANK_NAME/BANK_ACCOUNT thì BÁO chưa cấu hình, không trả một nửa', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    delete process.env.BANK_NAME; delete process.env.BANK_ACCOUNT;
    const r = await goi(accessHandler, { method: 'POST', body: { action: 'bank', maDon: 'BE-A7K3MN' } });
    assert.equal(r.statusCode, 404);
    assert.equal(r.payload.code, 'bank-not-configured');
    assert.equal(r.payload.nganHang, undefined);

    // Chỉ có tên ngân hàng mà thiếu số tài khoản cũng là "chưa đủ để trả tiền".
    process.env.BANK_NAME = 'MB Bank';
    const nua = await goi(accessHandler, { method: 'POST', body: { action: 'bank', maDon: 'BE-A7K3MN' } });
    assert.equal(nua.statusCode, 404, 'có tên NH mà không có số TK vẫn trả về như đã cấu hình');
  } finally { delete process.env.BANK_NAME; khoiPhuc(); }
});

test('thùng đếm tốc độ của "bank" TÁCH RIÊNG khỏi "activate"', async () => {
  // Nếu dùng chung thùng: khách mở bảng giá vài lần rồi mua xong, tới lúc nhập
  // mã truy cập thì bị 429 — hỏng đúng ở bước sau khi đã trả tiền, tức chỗ tệ
  // nhất để hỏng. Phép kiểm này xin thông tin ngân hàng cho tới quá hạn mức của
  // 'activate' (10) rồi vẫn phải kích hoạt được mã.
  const khoiPhuc = dungRedisGia();
  try {
    process.env.BANK_NAME = 'MB Bank';
    process.env.BANK_ACCOUNT = '0000000000';
    const adminCookie = await dangNhapAdmin();
    const { code } = await taoMa(adminCookie);

    for (let i = 0; i < 12; i += 1) {
      await goi(accessHandler, { method: 'POST', body: { action: 'bank', maDon: 'BE-A7K3MN' } });
    }
    const kichHoat = await goi(accessHandler, { method: 'POST', body: { action: 'activate', code, deviceId: 'thiet-bi-sau-khi-xem-gia' } });
    assert.equal(kichHoat.statusCode, 200, 'xem bảng giá nhiều lần làm khách không kích hoạt được mã vừa mua');
  } finally {
    delete process.env.BANK_NAME; delete process.env.BANK_ACCOUNT;
    khoiPhuc();
  }
});

// ── 7. ĐĂNG KÝ ĐƠN + TRA TRẠNG THÁI (cấp mã tự động, 28/08) ─────────────────
// Đây là bước máy chủ NHỚ TRƯỚC "đơn này ứng với gói nào" — trước khi có bước
// này, `webhook thanh toán` (tests/payment_webhook.test.js) không có gì để
// đối chiếu khi tiền vào. Rủi ro riêng của HAI action này: mã đơn hiện CÔNG
// KHAI trên màn hình (được chép, được gõ vào nội dung chuyển khoản, được dán
// vào lời nhắn gửi Zalo/email) — nên `token` phải là thứ DUY NHẤT không đi
// theo những đường đó, và tra trạng thái phải đòi đúng cặp (mã đơn, token).
test('đăng ký đơn: chốt đúng giá của gói, và mã đơn/gói sai hình đều bị từ chối', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    const dk = await goi(accessHandler, { method: 'POST', body: { action: 'order', maDon: 'BE-A7K3MN', goi: 'thang6' } });
    assert.equal(dk.statusCode, 200);
    assert.equal(dk.payload.trangThai, 'cho');
    assert.ok(dk.payload.token, 'không nhận được token để tra trạng thái sau này');
    assert.equal(dk.payload.maTruyCap, undefined, 'đơn vừa đăng ký chưa trả tiền mà đã có mã truy cập');

    for (const xau of [undefined, '', 'BE-000', 'khong-dung-hinh']) {
      const r = await goi(accessHandler, { method: 'POST', body: { action: 'order', maDon: xau, goi: 'thang6' } });
      assert.equal(r.statusCode, 400, `mã đơn "${xau}" phải bị từ chối`);
    }
    const saiGoi = await goi(accessHandler, { method: 'POST', body: { action: 'order', maDon: 'BE-A7K3MN', goi: 'goi-khong-co-that' } });
    assert.equal(saiGoi.statusCode, 400);
    assert.equal(saiGoi.payload.code, 'bad-plan');
  } finally { khoiPhuc(); }
});

test('tra trạng thái đơn: đúng token thì thấy, sai/thiếu token thì KHÔNG lộ đơn có tồn tại hay không', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    const dk = await goi(accessHandler, { method: 'POST', body: { action: 'order', maDon: 'BE-A7K3MN', goi: 'thang1' } });
    const { token } = dk.payload;

    const dung = await goi(accessHandler, { method: 'POST', body: { action: 'trangThaiDon', maDon: 'BE-A7K3MN', token } });
    assert.equal(dung.statusCode, 200);
    assert.equal(dung.payload.trangThai, 'cho');

    // Token sai và "không có đơn nào cả" phải trả VỀ MỘT CÂU GIỐNG NHAU — khác
    // nhau là một cách để dò xem một mã đơn có tồn tại hay không mà không cần
    // biết token của nó.
    const saiToken = await goi(accessHandler, { method: 'POST', body: { action: 'trangThaiDon', maDon: 'BE-A7K3MN', token: 'token-bay-dat' } });
    // 'BE-MNPQRT' đúng HÌNH mã đơn (chỉ dùng ký tự trong CHU_MA của banHang.js)
    // nhưng chưa từng được đăng ký — khác 'BE-A7K3MN' đã đăng ký ở trên.
    const khongCoDon = await goi(accessHandler, { method: 'POST', body: { action: 'trangThaiDon', maDon: 'BE-MNPQRT', token: 'token-bay-dat' } });
    assert.equal(saiToken.payload.trangThai, 'khong_thay');
    assert.equal(khongCoDon.payload.trangThai, 'khong_thay');
    assert.deepEqual(saiToken.payload, khongCoDon.payload, 'hai trường hợp khác nhau lại trả về hai câu khác nhau — dò được đơn có tồn tại');

    const thieuToken = await goi(accessHandler, { method: 'POST', body: { action: 'trangThaiDon', maDon: 'BE-A7K3MN' } });
    assert.equal(thieuToken.statusCode, 400, 'thiếu token mà vẫn được xử lý như một câu hỏi hợp lệ');
  } finally { khoiPhuc(); }
});

test('đăng ký lại đơn ĐÃ trả tiền, kể cả với gói KHÁC: giữ nguyên mã đã cấp, không phát sinh mã mới', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = 'khoa-webhook-du-dai-de-qua-cua-16-ky-tu';

    await goi(accessHandler, { method: 'POST', body: { action: 'order', maDon: 'BE-A7K3MN', goi: 'thang1' } });
    await goi(webhookHandler, {
      method: 'POST',
      headers: { authorization: `Apikey ${process.env.PAYMENT_WEBHOOK_SECRET}` },
      body: { data: [{ tid: 'tx-goc', amount: 99000, description: 'noi dung BE-A7K3MN' }] },
    });

    // Khách tải lại trang, bấm lại đúng gói đó — KHÔNG được đăng ký thành một
    // đơn 'cho' mới, vì mã đã cấp rồi và khách có thể đang định vào lấy lại nó.
    const dk2 = await goi(accessHandler, { method: 'POST', body: { action: 'order', maDon: 'BE-A7K3MN', goi: 'thang1' } });
    assert.equal(dk2.statusCode, 200);
    assert.equal(dk2.payload.trangThai, 'da_thanh_toan', 'đăng ký lại đã xoá mất kết quả đã trả tiền');
    assert.ok(dk2.payload.maTruyCap, 'đăng ký lại không còn trả về mã truy cập đã cấp');

    // Đăng ký thêm một lần nữa — mã phải NGUYÊN VẸN, không phát sinh mã mới.
    const dk3 = await goi(accessHandler, { method: 'POST', body: { action: 'order', maDon: 'BE-A7K3MN', goi: 'thang1' } });
    assert.equal(dk3.payload.maTruyCap, dk2.payload.maTruyCap, 'đăng ký lại đơn đã trả tiền lại phát sinh MÃ KHÁC — khách sẽ thấy hai mã khác nhau cho cùng một lần trả tiền');

    // ⚠️ ĐÂY LÀ ĐƯỜNG PHÁ HOẠI ADVISOR TÌM RA: khách vừa được cấp mã, tò mò bấm
    // xem thử một gói KHÁC trên cùng bảng giá (PricingModal gọi 'order' ở MỌI
    // lần bấm nút, xem AccessGate.jsx). Nếu đăng ký đơn đè trạng thái theo gói
    // mới thì mã vừa cấp — khách đang cầm/đang chờ dùng — biến mất, còn webhook
    // thì KHÔNG BAO GIỜ gọi lại được nữa (giao dịch ngân hàng đã đánh dấu xử lý
    // xong). Mã trở thành mồ côi trong kho, chỉ tìm lại được bằng tay.
    const bamGoiKhac = await goi(accessHandler, { method: 'POST', body: { action: 'order', maDon: 'BE-A7K3MN', goi: 'thang12' } });
    assert.equal(bamGoiKhac.payload.trangThai, 'da_thanh_toan', 'bấm xem một gói KHÁC sau khi đã trả tiền lại xoá mất mã đã cấp — mã trở thành mồ côi');
    assert.equal(bamGoiKhac.payload.maTruyCap, dk2.payload.maTruyCap, 'bấm xem gói khác làm đổi mã đã cấp cho lần trả tiền thật');
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});
