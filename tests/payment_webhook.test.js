// File: tests/payment_webhook.test.js
// WEBHOOK THANH TOÁN TỰ ĐỘNG — CỔNG CẤP PHÁT, KHÔNG CHỈ CỔNG TIẾT LỘ.
//
// ══ VÌ SAO FILE NÀY TÁCH RIÊNG khỏi dieu_khien_truy_cap.test.js ══
// Mọi tuyến khác của `access.js` chỉ TIẾT LỘ (số tài khoản, trạng thái đơn)
// cho người đã qua đúng bước. Tuyến này CẤP PHÁT: gọi đúng, máy chủ tự tạo
// một mã truy cập trả phí mà không ai bấm "Cấp mã" trên bảng quản trị. Rủi ro
// nếu hở là mất tiền/mất mã miễn phí, không phải lộ thông tin — nên nó cần bộ
// kiểm riêng, không lẫn vào bộ kiểm "bốn cửa chưa từng bị thử" của route kia.
//
// ══ NĂM ĐIỀU PHẢI ĐÚNG, MỖI ĐIỀU MỘT NHÓM TEST ══
//   1. Thất bại ĐÓNG: thiếu khoá / sai khoá thì từ chối, KHÔNG âm thầm phục vụ.
//   2. Khớp ĐÚNG một đơn, qua mã đơn tìm được TRONG nội dung chuyển khoản.
//   3. Số tiền: đủ/dư thì cấp, THIẾU thì báo chứ không cấp.
//   4. Idempotent theo MÃ GIAO DỊCH: webhook gọi lại vẫn chỉ cấp một mã.
//   5. Thanh toán LẶP LẠI trên một đơn ĐÃ cấp mã: không được NUỐT khoản tiền
//      mới — phải cấp mã BỔ SUNG và ghi to vào sổ, không phải im lặng bỏ qua.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import accessHandler from '../api/access.js';
import { xuLyPaymentWebhook } from '../src/server/routes/paymentWebhook.js';
import { ACCESS_INDEX_KEY, PAYMENT_AUDIT_KEY, accessKey, redisCommand } from '../src/server/accessCore.js';
import { dungRedisGia, goi } from './helpers/redisGia.mjs';

const KHOA = 'khoa-webhook-du-16-ky-tu-tro-len';
const webhookHandler = (request, response) => xuLyPaymentWebhook(request, process.env, response);

async function dangKyDon(maDon, goiMa = 'thang1') {
  const r = await goi(accessHandler, { method: 'POST', body: { action: 'order', maDon, goi: goiMa } });
  assert.equal(r.statusCode, 200, `đăng ký đơn ${maDon} thất bại — mọi test dưới đây vô nghĩa nếu bước này hỏng`);
  return r.payload.token;
}

async function traTrangThai(maDon, token) {
  const r = await goi(accessHandler, { method: 'POST', body: { action: 'trangThaiDon', maDon, token } });
  return r.payload;
}

async function goiWebhook(giaoDich, khoa = KHOA) {
  return goi(webhookHandler, {
    method: 'POST',
    headers: { authorization: `Apikey ${khoa}` },
    body: { data: Array.isArray(giaoDich) ? giaoDich : [giaoDich] },
  });
}

async function soMaDaCap() {
  return (await redisCommand(process.env, 'SMEMBERS', ACCESS_INDEX_KEY)).length;
}

async function soAudit() {
  return (await redisCommand(process.env, 'LRANGE', PAYMENT_AUDIT_KEY, 0, 199)).map((d) => JSON.parse(d));
}

/** Gói của TỪNG mã đã cấp, theo thứ tự trong kho — để kiểm nhánh mua thêm cấp đúng gói theo số tiền, không theo order.goi cũ. */
async function goiCacMaDaCap() {
  const hashes = await redisCommand(process.env, 'SMEMBERS', ACCESS_INDEX_KEY);
  const recs = await Promise.all(hashes.map((h) => redisCommand(process.env, 'GET', accessKey(h))));
  return recs.map((r) => JSON.parse(r).plan);
}

// ── 1. THẤT BẠI ĐÓNG ─────────────────────────────────────────────────────
test('thiếu PAYMENT_WEBHOOK_SECRET thì từ chối MỌI yêu cầu, không âm thầm phục vụ', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    delete process.env.PAYMENT_WEBHOOK_SECRET;
    await dangKyDon('BE-A7K3MN');
    const r = await goiWebhook({ tid: 'tx-1', amount: 99000, description: 'BE-A7K3MN' }, 'bat-ky-khoa-nao');
    assert.equal(r.statusCode, 503, 'chưa cấu hình khoá webhook mà vẫn xử lý — ai gọi đúng địa chỉ này cũng tự cấp được mã miễn phí');
    assert.equal(r.payload.code, 'not-configured');
  } finally { khoiPhuc(); }
});

test('sai khoá webhook thì từ chối, đúng khoá thì mới xử lý', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    await dangKyDon('BE-A7K3MN');
    const sai = await goiWebhook({ tid: 'tx-1', amount: 99000, description: 'BE-A7K3MN' }, 'khoa-sai-hoan-toan-16-ky');
    assert.equal(sai.statusCode, 401);
    assert.equal(await soMaDaCap(), 0, 'khoá sai mà vẫn cấp mã');

    const dung = await goiWebhook({ tid: 'tx-1', amount: 99000, description: 'BE-A7K3MN' });
    assert.equal(dung.statusCode, 200);
    assert.equal(await soMaDaCap(), 1);
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

test('chấp cả hai kiểu header: "Authorization: Apikey …" và "X-Webhook-Secret"', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    await dangKyDon('BE-A7K3MN');
    const r = await goi(webhookHandler, {
      method: 'POST',
      headers: { 'x-webhook-secret': KHOA },
      body: { data: [{ tid: 'tx-1', amount: 99000, description: 'BE-A7K3MN' }] },
    });
    assert.equal(r.statusCode, 200);
    assert.equal(await soMaDaCap(), 1);
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

// ── 2. KHỚP ĐÚNG MỘT ĐƠN QUA MÃ ĐƠN TRONG NỘI DUNG ──────────────────────
test('mã đơn nằm giữa chữ khác trong nội dung (app ngân hàng tự thêm tiền tố) vẫn khớp được', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    const token = await dangKyDon('BE-A7K3MN');
    await goiWebhook({ tid: 'tx-1', amount: 99000, description: 'CT tu NGUYEN VAN A ND BE-A7K3MN chuyen tien hoc phi' });
    const kq = await traTrangThai('BE-A7K3MN', token);
    assert.equal(kq.trangThai, 'da_thanh_toan');
    assert.ok(kq.maTruyCap);
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

test('nội dung không mang mã đơn nào: không cấp mã, không lỗi, ghi vào sổ audit', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    const r = await goiWebhook({ tid: 'tx-la', amount: 500000, description: 'chuyen tien sinh nhat' });
    assert.equal(r.statusCode, 200, 'giao dịch lạ làm hỏng cả lượt gọi webhook — một giao dịch không khớp không được kéo sập cả lô');
    assert.equal(await soMaDaCap(), 0);
    const audit = await soAudit();
    assert.ok(audit.some((a) => a.ket === 'khong-co-ma-don-trong-noi-dung'), 'không thấy dòng audit cho giao dịch không mang mã đơn');
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

test('mã đơn đúng hình nhưng chưa từng đăng ký: không cấp mã, ghi audit, chủ dự án tự đối chiếu tay', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    const r = await goiWebhook({ tid: 'tx-la', amount: 99000, description: 'ND BE-MNPQRT' });
    assert.equal(r.statusCode, 200);
    assert.equal(await soMaDaCap(), 0);
    const audit = await soAudit();
    assert.ok(audit.some((a) => a.ket === 'tien-vao-nhung-khong-thay-don'));
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

// ── 3. SỐ TIỀN: rộng tay là quyết định, hụt là tai nạn ──────────────────
test('chuyển DƯ tiền vẫn được cấp mã (rộng tay là quyết định)', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    const token = await dangKyDon('BE-A7K3MN', 'thang1'); // giá mặc định 99.000đ
    await goiWebhook({ tid: 'tx-1', amount: 150000, description: 'BE-A7K3MN' });
    const kq = await traTrangThai('BE-A7K3MN', token);
    assert.equal(kq.trangThai, 'da_thanh_toan', 'chuyển dư tiền mà không được cấp mã');
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

test('chuyển THIẾU tiền: KHÔNG cấp mã, đơn chuyển sang "thiếu_tien" chứ không im lặng ở "cho"', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    const token = await dangKyDon('BE-A7K3MN', 'thang1'); // giá mặc định 99.000đ
    await goiWebhook({ tid: 'tx-1', amount: 50000, description: 'BE-A7K3MN' });
    const kq = await traTrangThai('BE-A7K3MN', token);
    assert.equal(kq.trangThai, 'thieu_tien', 'thiếu tiền mà đơn không nói rõ — khách sẽ tưởng vẫn đang chờ vô thời hạn');
    assert.equal(kq.maTruyCap, undefined, 'thiếu tiền mà vẫn có mã truy cập');
    assert.equal(await soMaDaCap(), 0, 'thiếu tiền mà vẫn cấp mã (hụt là tai nạn, không được xảy ra)');
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

// ── 4. IDEMPOTENT THEO MÃ GIAO DỊCH ──────────────────────────────────────
test('webhook gọi lại đúng một mã giao dịch (retry của dịch vụ) chỉ cấp mã MỘT lần', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    const token = await dangKyDon('BE-A7K3MN');
    const giaoDich = { tid: 'tx-lap-lai-tu-nha-cung-cap', amount: 99000, description: 'BE-A7K3MN' };
    await goiWebhook(giaoDich);
    await goiWebhook(giaoDich);
    await goiWebhook(giaoDich);
    assert.equal(await soMaDaCap(), 1, 'ba lượt gọi cùng một mã giao dịch lại cấp nhiều hơn một mã');
    const kq = await traTrangThai('BE-A7K3MN', token);
    assert.equal(kq.trangThai, 'da_thanh_toan');
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

// ── 5. THANH TOÁN LẶP LẠI TRÊN ĐƠN ĐÃ CẤP MÃ ─────────────────────────────
test('đơn ĐÃ cấp mã mà có thêm một giao dịch KHÁC: cấp mã BỔ SUNG, không nuốt tiền, không đổi mã cũ', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    const token = await dangKyDon('BE-A7K3MN');
    await goiWebhook({ tid: 'tx-thu-nhat', amount: 99000, description: 'BE-A7K3MN' });
    const kq1 = await traTrangThai('BE-A7K3MN', token);
    assert.equal(kq1.trangThai, 'da_thanh_toan');

    // Khách mua lại / chuyển thêm — MÃ GIAO DỊCH KHÁC, cùng mã đơn cũ (khách
    // vẫn cầm maDon cũ vì maDonGiuLai() giữ nguyên một mã đơn cho cả trình
    // duyệt, xem src/utils/banHang.js).
    await goiWebhook({ tid: 'tx-thu-hai-khac-han', amount: 99000, description: 'BE-A7K3MN' });

    assert.equal(await soMaDaCap(), 2, 'giao dịch thứ hai trên đơn đã cấp mã không được im lặng bỏ qua — tiền đã vào');
    const kq2 = await traTrangThai('BE-A7K3MN', token);
    assert.equal(kq2.maTruyCap, kq1.maTruyCap, 'mã đầu tiên bị đổi — khách đang cầm/đang chờ đúng mã đó');

    const audit = await soAudit();
    assert.ok(audit.some((a) => a.ket === 'thanh-toan-lap-lai-da-cap-ma-bo-sung'), 'không có dòng audit báo đã cấp mã bổ sung — chủ dự án sẽ không biết để gửi mã đó cho khách');
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

test('đơn ĐÃ cấp mã mà giao dịch thêm KHÔNG đủ một gói: không cấp mã bổ sung, vẫn ghi audit', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    await dangKyDon('BE-A7K3MN');
    await goiWebhook({ tid: 'tx-thu-nhat', amount: 99000, description: 'BE-A7K3MN' });
    assert.equal(await soMaDaCap(), 1);

    await goiWebhook({ tid: 'tx-them-it', amount: 10000, description: 'BE-A7K3MN gui them' });
    assert.equal(await soMaDaCap(), 1, 'chuyển thêm một khoản nhỏ không đủ một gói mà vẫn được cấp mã bổ sung');
    const audit = await soAudit();
    assert.ok(audit.some((a) => a.ket === 'don-da-cap-ma-tien-them-khong-du-mot-goi'));
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

// ── ADVISOR: cộng dồn tiền thiếu, không ghi đè ───────────────────────────
test('chuyển THIẾU tiền hai lần cộng dồn ĐỦ: lần thứ hai phải cấp mã, không báo thiếu mãi', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    const token = await dangKyDon('BE-A7K3MN', 'thang1'); // giá mặc định 99.000đ
    // Màn hình khách nói: "hãy chuyển thêm phần còn thiếu". Bài test này kiểm
    // ĐÚNG lời khuyên đó — không phải chỉ kiểm rằng một lần thiếu thì bị báo.
    await goiWebhook({ tid: 'tx-thieu-1', amount: 50000, description: 'BE-A7K3MN' });
    const kq1 = await traTrangThai('BE-A7K3MN', token);
    assert.equal(kq1.trangThai, 'thieu_tien');

    await goiWebhook({ tid: 'tx-thieu-2', amount: 49000, description: 'BE-A7K3MN chuyen tiep' });
    const kq2 = await traTrangThai('BE-A7K3MN', token);
    assert.equal(kq2.trangThai, 'da_thanh_toan', '50.000 + 49.000 = 99.000, đủ giá gói, mà đơn vẫn báo thiếu — tiền cộng dồn bị GHI ĐÈ thay vì CỘNG, khách làm đúng lời khuyên trên màn hình mà vẫn không có mã');
    assert.ok(kq2.maTruyCap);
    assert.equal(await soMaDaCap(), 1, 'chỉ được cấp đúng một mã cho một đơn, dù trả làm hai lần');
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});

// ── ADVISOR: mua thêm phải cấp ĐÚNG gói theo số tiền, không theo order.goi cũ ──
test('thanh toán lặp lại bằng SỐ TIỀN của một gói khác: mã bổ sung phải đúng gói đó, không phải gói của đơn cũ', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    process.env.PAYMENT_WEBHOOK_SECRET = KHOA;
    // Đơn gốc đăng ký/ trả tiền cho gói 1 THÁNG (99.000đ).
    await dangKyDon('BE-A7K3MN', 'thang1');
    await goiWebhook({ tid: 'tx-goc', amount: 99000, description: 'BE-A7K3MN' });
    assert.deepEqual(await goiCacMaDaCap(), ['thang1']);

    // Khách quay lại MUA GÓI KHÁC (12 tháng, 599.000đ) — vẫn dùng đúng mã đơn cũ
    // (maDonGiuLai() giữ nguyên một mã đơn cho cả trình duyệt). Mã BỔ SUNG cấp
    // ra phải là gói 12 THÁNG — đúng số tiền vừa chuyển — không phải "thang1"
    // chép lại từ đơn cũ.
    await goiWebhook({ tid: 'tx-mua-them', amount: 599000, description: 'BE-A7K3MN mua goi nam' });
    const goiSauCung = await goiCacMaDaCap();
    assert.equal(goiSauCung.length, 2, 'không cấp mã bổ sung cho khoản tiền của gói 12 tháng');
    assert.ok(goiSauCung.includes('thang12'), `mã bổ sung phải mang gói 'thang12' (599.000đ), thực tế: ${goiSauCung.join(', ')}`);

    const audit = await soAudit();
    const dong = audit.find((a) => a.ket === 'thanh-toan-lap-lai-da-cap-ma-bo-sung');
    assert.equal(dong?.goiCap, 'thang12', 'sổ audit không ghi đúng gói đã cấp cho khoản mua thêm');
  } finally { delete process.env.PAYMENT_WEBHOOK_SECRET; khoiPhuc(); }
});
