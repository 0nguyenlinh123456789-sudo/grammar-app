// File: src/server/routes/access.js
// THAN TUYEN DUNG CHUNG cho ca hai noi chay.
//
// Vo boc Vercel (Node):      api/*.js       -> goi voi (request, process.env, response)
// Vo boc Cloudflare (Web):   functions/api/*.js -> goi voi (request, env)  [response = null]
//
// `jsonResponse` nhan null o tham so dau va tra ve mot `Response` kieu Web,
// nen than tuyen nay khong can biet no dang chay o dau. Xem chu thich cua
// jsonResponse trong src/server/accessCore.js.
import {
  ACCESS_COOKIE, AccessConfigError, clearCookie, clientIdentifier, enforceRateLimit, hashValue, isSecureRequest, jsonResponse, layBody, normalizeAccessCode, publicRecord, randomToken, readAccessRecord, readOrder, requireLearner, safeSecretEqual, sessionCookie, signToken, validateRecord, writeAccessRecord, writeOrder,
} from '../accessCore.js';
// MỘT nguồn duy nhất cho tên bốn khoá ngân hàng và cho luật "thiếu tên NH hoặc
// thiếu số TK thì trả null chứ không hiện một nửa". Đã có phép kiểm canh rằng
// `KHOA_NGAN_HANG` không mọc thêm khoá xin số điện thoại/email/địa chỉ — chép
// lại tên khoá ở đây là tự cho mình một chỗ để lệch khỏi phép kiểm đó.
import { CHUA_CO_CHUYEN_KHOAN, MAU_MA_DON, thongTinChuyenKhoan } from '../../utils/banHang.js';
// Đơn hàng phải khoá vào GÓI CÓ THẬT — cùng danh sách bảng giá đọc, cùng cách
// tính giá máy chủ (`giaGoi` đọc biến môi trường CỦA MÁY CHỦ, không tin số
// tiền do client gửi lên).
import { giaGoi, timGoi } from '../../utils/goi.js';

const SESSION_SECONDS = 30 * 24 * 60 * 60;

export async function xuLyAccess(request, env, response = null) {
  const secure = isSecureRequest(request, env);
  try {
    if (request.method === 'GET') {
      const session = await requireLearner(request, env);
      if (!session) return jsonResponse(response, 401, { authenticated: false });
      return jsonResponse(response, 200, { authenticated: true, access: publicRecord(session.record) });
    }

    if (request.method !== 'POST') return jsonResponse(response, 405, { code: 'method-not-allowed', message: 'Phương thức không được hỗ trợ.' });
    const body = await layBody(request);

    if (body.action === 'logout') {
      return jsonResponse(response, 200, { ok: true }, { 'Set-Cookie': clearCookie(ACCESS_COOKIE, secure) });
    }
    // ── THÔNG TIN CHUYỂN KHOẢN ────────────────────────────────────────────
    // ⚠️ NHÁNH NÀY PHẢI ĐỨNG TRƯỚC CỬA CHẶN `!== 'activate'` bên dưới, không thì
    // nó bị trả 400 vĩnh viễn.
    //
    // ══ VÌ SAO KHÔNG ĐÒI PHIÊN ĐÃ XÁC THỰC ══
    // Chủ dự án chọn "phương án C: máy chủ chỉ cấp cho phiên đã xác thực". Hiểu
    // theo đúng chữ thì nó TỰ MÂU THUẪN: người sắp mua CHƯA CÓ mã truy cập —
    // mã chính là thứ họ đang trả tiền để lấy. Gọi `requireLearner` ở đây nghĩa
    // là chỉ khách CŨ xem được số tài khoản, còn khách MỚI thì không bao giờ trả
    // tiền được. Nên cửa đặt đúng chỗ chủ dự án mô tả lúc đầu — *"khách bấm mua
    // gói thì mới thấy"* — tức phải qua bước chọn gói và có mã đơn hợp lệ.
    //
    // ══ GIỚI HẠN TỐC ĐỘ LÀ TỐT-NHẤT-CÓ-THỂ, CỐ Ý ══
    // `enforceRateLimit` cần Redis và ném `AccessConfigError` khi thiếu. Nếu để
    // lỗi đó rơi xuống khối catch thì Redis chết = khách KHÔNG TRẢ TIỀN ĐƯỢC.
    // Số tài khoản ngân hàng không phải bí mật đáng để mất một đơn hàng, nên ở
    // RIÊNG nhánh này giới hạn tốc độ được bỏ qua khi kho đếm không dùng được.
    // Các nhánh khác (`activate`) thì KHÔNG được nới như vậy.
    if (body.action === 'bank') {
      // Thùng đếm RIÊNG, không dùng chung với 'activate': khách mở bảng giá vài
      // lần mà bị khoá luôn đường kích hoạt mã vừa mua thì hỏng đúng chỗ tệ nhất.
      try {
        const con = await enforceRateLimit(env, 'bank', clientIdentifier(request), 30, 600);
        if (!con) return jsonResponse(response, 429, { code: 'rate-limited', message: 'Bạn đã xem quá nhiều lần. Vui lòng chờ ít phút.' });
      } catch { /* kho đếm không dùng được thì vẫn phục vụ — xem lý do ở trên */ }

      // Mã đơn hợp lệ = bằng chứng đã đi qua bước chọn gói trên giao diện. Không
      // phải lớp bảo mật (ai đọc mã client cũng tự sinh được một mã đúng hình),
      // mà là để máy quét tệp tĩnh không gom được, và để nhật ký tra ra đơn.
      if (!MAU_MA_DON.test(String(body.maDon || '').trim())) {
        return jsonResponse(response, 400, { code: 'bad-order', message: 'Thiếu mã đơn hợp lệ.' });
      }
      const nganHang = thongTinChuyenKhoan(env);
      if (!nganHang) return jsonResponse(response, 404, { code: 'bank-not-configured', message: CHUA_CO_CHUYEN_KHOAN });
      return jsonResponse(response, 200, { nganHang });
    }

    // ── ĐĂNG KÝ ĐƠN — bước bắt buộc trước khi webhook có thể tự cấp mã ─────
    //
    // Gọi ngay khi khách bấm "MUA GÓI X" trên giao diện, TRƯỚC khi họ mở app
    // ngân hàng. Máy chủ chốt lại NGAY LÚC NÀY: đơn này ứng với gói nào, giá
    // bao nhiêu (đọc từ `giaGoi` — giá CỦA MÁY CHỦ tại thời điểm đặt, không tin
    // số client gửi lên). Chốt sớm để nếu chủ dự án đổi giá giữa lúc khách đặt
    // và lúc khách trả tiền, đơn vẫn tính đúng giá khách ĐÃ THẤY lúc bấm mua.
    if (body.action === 'order') {
      try {
        const con = await enforceRateLimit(env, 'order', clientIdentifier(request), 20, 600);
        if (!con) return jsonResponse(response, 429, { code: 'rate-limited', message: 'Bạn thao tác quá nhiều lần trong thời gian ngắn. Vui lòng chờ ít phút.' });
      } catch { /* kho đếm không dùng được thì vẫn cho đăng ký đơn — cùng lý do với nhánh 'bank' */ }

      const maDon = String(body.maDon || '').trim();
      if (!MAU_MA_DON.test(maDon)) {
        return jsonResponse(response, 400, { code: 'bad-order', message: 'Thiếu mã đơn hợp lệ.' });
      }
      const goi = timGoi(body.goi);
      if (!goi) return jsonResponse(response, 400, { code: 'bad-plan', message: 'Gói không hợp lệ.' });

      const token = randomToken();
      const now = Date.now();
      const cu = await readOrder(env, maDon);
      // Đơn ĐÃ CẤP MÃ thì KHÔNG BAO GIỜ bị đăng ký lại đè về 'cho' — KỂ CẢ khi
      // lượt đăng ký này mang một gói KHÁC. Bảng giá gọi lại 'order' ở MỌI lần
      // bấm "MUA GÓI X" (PricingModal, AccessGate.jsx); nếu coi gói khác là một
      // đơn MỚI thì khách đã trả tiền, đã thấy mã, rồi bấm xem thử gói khác cho
      // biết sẽ xoá sạch mã đang chờ họ dùng — mà webhook thì KHÔNG BAO GIỜ gọi
      // lại được nữa (giao dịch ngân hàng đó đã đánh dấu xử lý xong, xem
      // `daXuLy` trong paymentWebhook.js). Mã trở nên mồ côi, chỉ tìm lại được
      // qua nhãn `Đơn ${maDon}` trên bảng quản trị.
      //
      // Giữ NGUYÊN toàn bộ bản ghi cũ, không chỉ mấy trường trạng thái — gói/giá
      // trong bản ghi CŨ mới đúng với LẦN TRẢ TIỀN THẬT, còn `goi`/`body.goi` ở
      // yêu cầu này chỉ là gói khách đang XEM, chưa chắc đã trả. Cấp mã MỚI chỉ
      // xảy ra ở paymentWebhook.js khi có TIỀN MỚI thật sự vào tài khoản — bước
      // đăng ký này không bao giờ tự ý đổi hay xoá gì của một đơn đã xong.
      const daTraTien = cu?.trangThai === 'da_thanh_toan';

      const record = daTraTien
        ? { ...cu, tokenHash: hashValue(token), capNhatLuc: new Date(now).toISOString() }
        : {
          maDon,
          goi: goi.ma,
          gia: giaGoi(goi.ma, env),
          tokenHash: hashValue(token),
          trangThai: 'cho',
          maTruyCap: null,
          soTienNhanDuoc: null,
          taoLuc: new Date(now).toISOString(),
          capNhatLuc: new Date(now).toISOString(),
        };
      await writeOrder(env, maDon, record);
      return jsonResponse(response, 200, {
        ok: true, token, trangThai: record.trangThai,
        ...(record.trangThai === 'da_thanh_toan' ? { maTruyCap: record.maTruyCap } : {}),
      });
    }

    // ── HỎI TRẠNG THÁI ĐƠN — client gọi lặp lại trong lúc chờ webhook ──────
    //
    // Đòi ĐÚNG cặp (mã đơn, token) do chính bước 'order' vừa trả — token KHÔNG
    // đi kèm mã đơn ở bất kỳ nơi nào khác (không vào nội dung chuyển khoản,
    // không vào lời nhắn gửi qua Zalo/email). Thiếu vé này thì bất kỳ ai nhìn
    // thấy mã đơn — nó hiện công khai trên màn hình, được sao chép, được gõ
    // vào ô nội dung chuyển khoản, được dán vào lời nhắn gửi người bán — cũng
    // lấy được mã truy cập của người khác trước khi họ kịp thấy.
    if (body.action === 'trangThaiDon') {
      try {
        // Bấm hỏi mỗi vài giây trong lúc chờ nên hạn mức phải RỘNG hơn hẳn
        // 'bank' — không phải vì kém nhạy cảm hơn (được canh bằng token), mà
        // vì tần suất gọi tự nhiên đã cao hơn nhiều lần.
        const con = await enforceRateLimit(env, 'trangthaidon', clientIdentifier(request), 150, 600);
        if (!con) return jsonResponse(response, 429, { code: 'rate-limited', message: 'Bạn hỏi quá nhiều lần trong thời gian ngắn. Vui lòng chờ ít phút.' });
      } catch { /* không phải bí mật đáng để mất một đơn hàng — vẫn phục vụ */ }

      const maDon = String(body.maDon || '').trim();
      const token = String(body.token || '');
      if (!MAU_MA_DON.test(maDon) || !token) {
        return jsonResponse(response, 400, { code: 'bad-request', message: 'Thiếu mã đơn hoặc mã phiên hợp lệ.' });
      }
      const order = await readOrder(env, maDon);
      // KHÔNG phân biệt "không có đơn này" với "token sai" trong câu trả lời —
      // hai lời báo khác nhau là một cách để dò xem một mã đơn có tồn tại hay
      // không mà không cần biết token.
      if (!order || !safeSecretEqual(hashValue(token), order.tokenHash)) {
        return jsonResponse(response, 200, { trangThai: 'khong_thay' });
      }
      if (order.trangThai === 'da_thanh_toan') {
        return jsonResponse(response, 200, { trangThai: 'da_thanh_toan', maTruyCap: order.maTruyCap, goi: order.goi });
      }
      return jsonResponse(response, 200, { trangThai: order.trangThai || 'cho' });
    }

    if (body.action !== 'activate') return jsonResponse(response, 400, { code: 'bad-request', message: 'Yêu cầu không hợp lệ.' });

    const allowed = await enforceRateLimit(env, 'activate', clientIdentifier(request), 10, 600);
    if (!allowed) return jsonResponse(response, 429, { code: 'rate-limited', message: 'Bạn đã thử quá nhiều lần. Vui lòng chờ 10 phút.' });

    const code = normalizeAccessCode(body.code);
    const deviceId = String(body.deviceId || '').trim();
    if (code.length < 12 || deviceId.length < 10 || deviceId.length > 200) {
      return jsonResponse(response, 400, { code: 'invalid-input', message: 'Mã truy cập hoặc thiết bị không hợp lệ.' });
    }

    const codeHash = hashValue(code);
    const deviceHash = hashValue(deviceId);
    const record = await readAccessRecord(env, codeHash);
    const validity = validateRecord(record);
    if (!validity.ok) {
      const message = validity.reason === 'expired' ? 'Mã truy cập đã hết hạn.' : 'Mã truy cập không đúng hoặc đã bị khóa.';
      return jsonResponse(response, 403, { code: validity.reason, message });
    }

    const devices = record.devices || {};
    if (!devices[deviceHash] && Object.keys(devices).length >= record.maxDevices) {
      return jsonResponse(response, 403, { code: 'device-limit', message: `Mã này đã dùng đủ ${record.maxDevices} thiết bị. Hãy liên hệ người bán để được hỗ trợ.` });
    }

    const now = new Date().toISOString();
    record.devices = { ...devices, [deviceHash]: { firstSeenAt: devices[deviceHash]?.firstSeenAt || now, lastSeenAt: now } };
    record.lastUsedAt = now;
    record.updatedAt = now;
    await writeAccessRecord(env, codeHash, record);

    const expiresAt = Math.min(Date.now() + SESSION_SECONDS * 1000, record.expiresAt ? new Date(record.expiresAt).getTime() : Infinity);
    const token = signToken({ role: 'learner', codeHash, deviceHash, version: record.version, exp: expiresAt }, env.ACCESS_SESSION_SECRET);
    const maxAge = Math.max(1, Math.floor((expiresAt - Date.now()) / 1000));
    return jsonResponse(response, 200, { authenticated: true, access: publicRecord(record) }, {
      'Set-Cookie': sessionCookie(ACCESS_COOKIE, token, maxAge, secure),
    });
  } catch (error) {
    if (error instanceof AccessConfigError) return jsonResponse(response, 503, { code: 'not-configured', message: 'Hệ thống mã truy cập chưa được cấu hình.' });
    if (error instanceof SyntaxError) return jsonResponse(response, 400, { code: 'bad-json', message: 'Dữ liệu gửi lên không hợp lệ.' });
    console.error('Access API error', error);
    return jsonResponse(response, 500, { code: 'server-error', message: 'Không thể kiểm tra mã lúc này. Vui lòng thử lại.' });
  }
}
