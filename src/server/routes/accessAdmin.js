// File: src/server/routes/accessAdmin.js
// THAN TUYEN DUNG CHUNG cho ca hai noi chay.
//
// Vo boc Vercel (Node):      api/*.js       -> goi voi (request, process.env, response)
// Vo boc Cloudflare (Web):   functions/api/*.js -> goi voi (request, env)  [response = null]
//
// `jsonResponse` nhan null o tham so dau va tra ve mot `Response` kieu Web,
// nen than tuyen nay khong can biet no dang chay o dau. Xem chu thich cua
// jsonResponse trong src/server/accessCore.js.
import {
  ACCESS_AUDIT_KEY, ACCESS_INDEX_KEY, AccessConfigError, accessKey, ADMIN_COOKIE, clearCookie, clientIdentifier, createAccessRecord, enforceRateLimit, generateAccessCode, hashValue, isSecureRequest, jsonResponse, layBody, normalizeAccessCode, publicRecord, readAccessRecord, redisCommand, redisPipeline, requireAdmin, safeSecretEqual, sessionCookie, signToken, writeAccessRecord,
} from '../accessCore.js';

const ADMIN_SESSION_SECONDS = 8 * 60 * 60;

async function listRecords(env) {
  const hashes = await redisCommand(env, 'SMEMBERS', ACCESS_INDEX_KEY);
  if (!Array.isArray(hashes) || hashes.length === 0) return [];
  const values = await redisPipeline(env, hashes.map((hash) => ['GET', accessKey(hash)]));
  return values.map((value, index) => {
    try {
      const record = JSON.parse(value);
      return { ...publicRecord(record), codeHash: hashes[index] };
    } catch { return null; }
  }).filter(Boolean).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function writeAudit(env, action, record, extra = {}) {
  const entry = JSON.stringify({
    action, codeId: record?.id || extra.codeId || null, customer: record?.customer || extra.customer || '',
    at: new Date().toISOString(), ...extra,
  });
  await redisPipeline(env, [['LPUSH', ACCESS_AUDIT_KEY, entry], ['LTRIM', ACCESS_AUDIT_KEY, 0, 99]]);
}

async function listAudit(env) {
  const entries = await redisCommand(env, 'LRANGE', ACCESS_AUDIT_KEY, 0, 29);
  if (!Array.isArray(entries)) return [];
  return entries.map((entry) => { try { return JSON.parse(entry); } catch { return null; } }).filter(Boolean);
}

async function createCode(env, body) {
  let code;
  let codeHash;
  do {
    code = generateAccessCode();
    codeHash = hashValue(normalizeAccessCode(code));
  } while (await readAccessRecord(env, codeHash));
  const record = createAccessRecord({ ...body, codePreview: `••••-${code.slice(-4)}` });
  await redisPipeline(env, [
    ['SET', accessKey(codeHash), JSON.stringify(record)],
    ['SADD', ACCESS_INDEX_KEY, codeHash],
  ]);
  await writeAudit(env, 'create', record, { codePreview: record.codePreview });
  return { code, record: { ...publicRecord(record), codeHash } };
}

export async function xuLyAccessAdmin(request, env, response = null) {
  const secure = isSecureRequest(request, env);
  try {
    if (!env.ACCESS_ADMIN_SECRET || env.ACCESS_ADMIN_SECRET.length < 24) {
      throw new AccessConfigError('admin-secret-too-short');
    }
    // ĐỌC THÂN YÊU CẦU ĐÚNG MỘT LẦN.
    //
    // Bản đầu gọi `layBody()` ở HAI chỗ trong cùng tuyến này. Trên Node điều đó
    // vô hại: `request.body` là object đã phân tích sẵn, đọc bao nhiêu lần cũng
    // ra kết quả cũ. Trên nền Web thì thân là STREAM DÙNG MỘT LẦN — lần đọc thứ
    // hai trả về rỗng, `body.action` thành `undefined`, tuyến rơi xuống nhánh
    // cuối và trả 400 "mã cần quản lý không hợp lệ" cho một yêu cầu CẤP MÃ hoàn
    // toàn hợp lệ. Người bán sẽ thấy nút cấp mã hỏng mà không hiểu vì sao.
    //
    // `tests/cloudflare_tuyen.test.js` bắt được đúng chỗ này; bộ kiểm cũ chạy
    // hình dạng Node nên xanh sạch.
    const body = request.method === 'POST' ? await layBody(request) : {};

    if (request.method === 'POST') {
      if (body.action === 'login') {
        const allowed = await enforceRateLimit(env, 'admin-login', clientIdentifier(request), 8, 900);
        if (!allowed) return jsonResponse(response, 429, { code: 'rate-limited', message: 'Đăng nhập sai quá nhiều lần. Vui lòng chờ 15 phút.' });
        if (!safeSecretEqual(body.secret, env.ACCESS_ADMIN_SECRET)) {
          return jsonResponse(response, 401, { code: 'invalid-admin-secret', message: 'Khóa quản trị không đúng.' });
        }
        const token = signToken({ role: 'admin', adminKeyHash: hashValue(env.ACCESS_ADMIN_SECRET), exp: Date.now() + ADMIN_SESSION_SECONDS * 1000 }, env.ACCESS_SESSION_SECRET);
        return jsonResponse(response, 200, { authenticated: true }, {
          'Set-Cookie': sessionCookie(ADMIN_COOKIE, token, ADMIN_SESSION_SECONDS, secure),
        });
      }
      if (body.action === 'logout') {
        return jsonResponse(response, 200, { ok: true }, { 'Set-Cookie': clearCookie(ADMIN_COOKIE, secure) });
      }
    }

    if (!requireAdmin(request, env)) return jsonResponse(response, 401, { authenticated: false, message: 'Phiên quản trị không hợp lệ.' });

    if (request.method === 'GET') {
      return jsonResponse(response, 200, { authenticated: true, codes: await listRecords(env), audit: await listAudit(env) });
    }
    if (request.method !== 'POST') return jsonResponse(response, 405, { code: 'method-not-allowed', message: 'Phương thức không được hỗ trợ.' });

    if (body.action === 'create') {
      const created = await createCode(env, body);
      return jsonResponse(response, 201, created);
    }

    const codeHash = String(body.codeHash || '');
    if (!/^[a-f0-9]{64}$/.test(codeHash)) return jsonResponse(response, 400, { code: 'invalid-code-id', message: 'Mã cần quản lý không hợp lệ.' });
    const record = await readAccessRecord(env, codeHash);
    if (!record) return jsonResponse(response, 404, { code: 'not-found', message: 'Không tìm thấy mã truy cập.' });

    if (body.action === 'delete') {
      await redisPipeline(env, [['DEL', accessKey(codeHash)], ['SREM', ACCESS_INDEX_KEY, codeHash]]);
      await writeAudit(env, 'delete', record, { codeHash });
      return jsonResponse(response, 200, { ok: true });
    }

    if (body.action === 'rotate') {
      const generated = await createCode(env, {
        label: record.label, customer: record.customer, plan: record.plan,
        durationDays: 0, maxDevices: record.maxDevices,
      });
      const newRecord = await readAccessRecord(env, generated.record.codeHash);
      newRecord.expiresAt = record.expiresAt;
      newRecord.id = record.id;
      newRecord.version = record.version + 1;
      await writeAccessRecord(env, generated.record.codeHash, newRecord);
      await redisPipeline(env, [['DEL', accessKey(codeHash)], ['SREM', ACCESS_INDEX_KEY, codeHash]]);
      await writeAudit(env, 'rotate', newRecord, { codeHash, oldCodeHash: codeHash });
      return jsonResponse(response, 200, { code: generated.code, record: { ...publicRecord(newRecord), codeHash: generated.record.codeHash } });
    }

    if (body.action === 'update') {
      // Bumping `version` invalidates every signed session for this code, so it
      // is reserved for changes meant to kick devices off. Extending a paid
      // subscription is the opposite of that and must keep learners signed in.
      let revokeSessions = false;
      if (body.status && ['active', 'paused'].includes(body.status)) {
        revokeSessions = revokeSessions || record.status !== body.status;
        record.status = body.status;
      }
      if (body.extendDays) {
        const days = Math.max(1, Math.min(3650, Number.parseInt(body.extendDays, 10) || 0));
        const base = record.expiresAt && new Date(record.expiresAt).getTime() > Date.now() ? new Date(record.expiresAt).getTime() : Date.now();
        record.expiresAt = new Date(base + days * 86_400_000).toISOString();
      }
      if (body.resetDevices === true) { record.devices = {}; revokeSessions = true; }
      if (body.maxDevices) {
        const maxDevices = Math.max(1, Math.min(10, Number.parseInt(body.maxDevices, 10) || record.maxDevices));
        revokeSessions = revokeSessions || maxDevices < record.maxDevices;
        record.maxDevices = maxDevices;
      }
      record.updatedAt = new Date().toISOString();
      if (revokeSessions) record.version += 1;
      await writeAccessRecord(env, codeHash, record);
      await writeAudit(env, record.status === 'paused' ? 'pause' : 'update', record, { codeHash, extendDays: body.extendDays || null, resetDevices: body.resetDevices === true });
      return jsonResponse(response, 200, { record: { ...publicRecord(record), codeHash } });
    }

    return jsonResponse(response, 400, { code: 'bad-request', message: 'Thao tác không được hỗ trợ.' });
  } catch (error) {
    if (error instanceof AccessConfigError) return jsonResponse(response, 503, { code: 'not-configured', message: 'Hãy cấu hình Redis và khóa bí mật trước khi quản lý mã.' });
    if (error instanceof SyntaxError) return jsonResponse(response, 400, { code: 'bad-json', message: 'Dữ liệu gửi lên không hợp lệ.' });
    console.error('Access admin API error', error);
    return jsonResponse(response, 500, { code: 'server-error', message: 'Không thể thực hiện thao tác quản trị lúc này.' });
  }
}
