// File: src/server/routes/progress.js
// THAN TUYEN DUNG CHUNG cho ca hai noi chay.
//
// Vo boc Vercel (Node):      api/*.js       -> goi voi (request, process.env, response)
// Vo boc Cloudflare (Web):   functions/api/*.js -> goi voi (request, env)  [response = null]
//
// `jsonResponse` nhan null o tham so dau va tra ve mot `Response` kieu Web,
// nen than tuyen nay khong can biet no dang chay o dau. Xem chu thich cua
// jsonResponse trong src/server/accessCore.js.
import {
  AccessConfigError, jsonResponse, layBody, redisCommand, requireLearner,
} from '../accessCore.js';

const PROGRESS_KEY = (codeHash) => `grammar:progress:${codeHash}`;
const MAX_PROGRESS_BYTES = 1_500_000;

export async function xuLyProgress(request, env, response = null) {
  try {
    const session = await requireLearner(request, env);
    if (!session) return jsonResponse(response, 401, { code: 'access-required', message: 'Phiên truy cập đã hết hạn.' });
    const key = PROGRESS_KEY(session.payload.codeHash);
    if (request.method === 'GET') {
      const raw = await redisCommand(env, 'GET', key);
      if (!raw) return jsonResponse(response, 200, { data: null, updatedAt: null });
      try {
        const saved = JSON.parse(raw);
        return jsonResponse(response, 200, { data: saved.data || null, updatedAt: saved.updatedAt || null });
      } catch { return jsonResponse(response, 200, { data: null, updatedAt: null }); }
    }
    if (request.method !== 'PUT') return jsonResponse(response, 405, { code: 'method-not-allowed', message: 'Phương thức không được hỗ trợ.' });
    const body = await layBody(request);
    if (!body.data || typeof body.data !== 'object' || Array.isArray(body.data)) return jsonResponse(response, 400, { code: 'invalid-progress', message: 'Dữ liệu tiến độ không hợp lệ.' });
    const serialized = JSON.stringify(body.data);
    if (serialized.length > MAX_PROGRESS_BYTES) return jsonResponse(response, 413, { code: 'progress-too-large', message: 'Dữ liệu tiến độ vượt quá giới hạn.' });
    const incomingUpdatedAt = Number(body.updatedAt) || Date.now();
    const existingRaw = await redisCommand(env, 'GET', key);
    let existing = null;
    try { existing = existingRaw ? JSON.parse(existingRaw) : null; } catch { existing = null; }
    if (existing?.updatedAt && Number(existing.updatedAt) > incomingUpdatedAt) {
      return jsonResponse(response, 200, { accepted: false, data: existing.data, updatedAt: existing.updatedAt });
    }
    const updatedAt = Date.now();
    await redisCommand(env, 'SET', key, JSON.stringify({ data: body.data, updatedAt, deviceHash: session.payload.deviceHash }));
    return jsonResponse(response, 200, { accepted: true, updatedAt });
  } catch (error) {
    if (error instanceof AccessConfigError) return jsonResponse(response, 503, { code: 'not-configured', message: 'Hệ thống đồng bộ chưa được cấu hình.' });
    if (error instanceof SyntaxError) return jsonResponse(response, 400, { code: 'bad-json', message: 'Dữ liệu gửi lên không hợp lệ.' });
    console.error('Progress API error', error);
    return jsonResponse(response, 500, { code: 'server-error', message: 'Không thể đồng bộ tiến độ.' });
  }
}
