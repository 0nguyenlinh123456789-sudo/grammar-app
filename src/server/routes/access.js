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
  ACCESS_COOKIE, AccessConfigError, clearCookie, clientIdentifier, enforceRateLimit, hashValue, isSecureRequest, jsonResponse, layBody, normalizeAccessCode, publicRecord, readAccessRecord, requireLearner, sessionCookie, signToken, validateRecord, writeAccessRecord,
} from '../accessCore.js';

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
