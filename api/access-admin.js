import {
  ACCESS_AUDIT_KEY, ACCESS_INDEX_KEY, ADMIN_COOKIE, AccessConfigError, accessKey, clientIdentifier,
  clearCookie, createAccessRecord, enforceRateLimit, generateAccessCode, hashValue,
  isSecureRequest, jsonResponse, normalizeAccessCode, publicRecord, readAccessRecord,
  redisCommand, redisPipeline, requireAdmin, safeSecretEqual, sessionCookie, signToken,
  writeAccessRecord,
} from '../src/server/accessCore.js';

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

export default async function handler(request, response) {
  const env = process.env;
  const secure = isSecureRequest(request, env);
  try {
    if (!env.ACCESS_ADMIN_SECRET || env.ACCESS_ADMIN_SECRET.length < 24) {
      throw new AccessConfigError('admin-secret-too-short');
    }
    if (request.method === 'POST') {
      const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
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

    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
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
      if (body.status && ['active', 'paused'].includes(body.status)) record.status = body.status;
      if (body.extendDays) {
        const days = Math.max(1, Math.min(3650, Number.parseInt(body.extendDays, 10) || 0));
        const base = record.expiresAt && new Date(record.expiresAt).getTime() > Date.now() ? new Date(record.expiresAt).getTime() : Date.now();
        record.expiresAt = new Date(base + days * 86_400_000).toISOString();
      }
      if (body.resetDevices === true) record.devices = {};
      if (body.maxDevices) record.maxDevices = Math.max(1, Math.min(10, Number.parseInt(body.maxDevices, 10) || record.maxDevices));
      record.updatedAt = new Date().toISOString();
      record.version += 1;
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
