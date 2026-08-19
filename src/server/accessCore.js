import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
// Ba gói bán hàng là MỘT danh sách duy nhất, xem src/utils/goi.js. Máy chủ đọc
// nó để bản ghi cấp ra không bao giờ HỤT so với thứ bảng giá đã hứa.
import { GOI, timGoi } from '../utils/goi.js';

export const ACCESS_COOKIE = 'grammar_access';
export const ADMIN_COOKIE = 'grammar_admin';
export const ACCESS_INDEX_KEY = 'grammar:access:index:v1';
export const ACCESS_AUDIT_KEY = 'grammar:access:audit:v1';

export class AccessConfigError extends Error {
  constructor(message = 'access-not-configured') {
    super(message);
    this.name = 'AccessConfigError';
  }
}

export function normalizeAccessCode(value) {
  return String(value || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function hashValue(value) {
  return createHash('sha256').update(String(value)).digest('hex');
}

export function generateAccessCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(12);
  const body = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
  return `GRAM-${body.slice(0, 4)}-${body.slice(4, 8)}-${body.slice(8, 12)}`;
}

export function accessKey(codeHash) {
  return `grammar:access:code:${codeHash}`;
}

export function getRedisConfig(env = process.env) {
  const url = env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN;
  if (!url || !token) throw new AccessConfigError();
  return { url: url.replace(/\/$/, ''), token };
}

export async function redisCommand(env, ...command) {
  const { url, token } = getRedisConfig(env);
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.error) throw new Error(body.error || 'redis-request-failed');
  return body.result;
}

export async function redisPipeline(env, commands) {
  const { url, token } = getRedisConfig(env);
  const response = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  const body = await response.json().catch(() => []);
  if (!response.ok || !Array.isArray(body) || body.some((item) => item.error)) {
    throw new Error(body.find?.((item) => item.error)?.error || 'redis-pipeline-failed');
  }
  return body.map((item) => item.result);
}

export function parseCookies(header = '') {
  return Object.fromEntries(String(header).split(';').map((part) => {
    const separator = part.indexOf('=');
    if (separator < 0) return ['', ''];
    return [part.slice(0, separator).trim(), decodeURIComponent(part.slice(separator + 1).trim())];
  }).filter(([key]) => key));
}

const encode = (value) => Buffer.from(value).toString('base64url');
const sign = (payload, secret) => createHmac('sha256', secret).update(payload).digest('base64url');

export function signToken(payload, secret) {
  if (!secret || secret.length < 32) throw new AccessConfigError('session-secret-too-short');
  const encoded = encode(JSON.stringify(payload));
  return `${encoded}.${sign(encoded, secret)}`;
}

export function verifyToken(token, secret, now = Date.now()) {
  if (!token || !secret || secret.length < 32) return null;
  const [encoded, signature, extra] = String(token).split('.');
  if (!encoded || !signature || extra) return null;
  const expected = sign(encoded, secret);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    return payload.exp > now ? payload : null;
  } catch {
    return null;
  }
}

export function sessionCookie(name, token, maxAge, secure = true) {
  const flags = [`${name}=${encodeURIComponent(token)}`, 'Path=/', 'HttpOnly', 'SameSite=Strict', `Max-Age=${Math.max(0, Math.floor(maxAge))}`];
  if (secure) flags.push('Secure');
  return flags.join('; ');
}

export function clearCookie(name, secure = true) {
  return sessionCookie(name, '', 0, secure);
}

export function isSecureRequest(request, env = process.env) {
  return env.VERCEL === '1' || request.headers['x-forwarded-proto'] === 'https' || request.headers['x-forwarded-proto']?.startsWith('https');
}

export function publicRecord(record) {
  return {
    id: record.id,
    label: record.label,
    customer: record.customer,
    plan: record.plan,
    status: record.status,
    maxDevices: record.maxDevices,
    deviceCount: Object.keys(record.devices || {}).length,
    expiresAt: record.expiresAt,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    lastUsedAt: record.lastUsedAt || null,
    codePreview: record.codePreview,
  };
}

export function createAccessRecord(input = {}, now = Date.now()) {
  const requestedDays = Number.parseInt(input.durationDays, 10);
  const xinNgay = Number.isFinite(requestedDays) && requestedDays > 0
    ? Math.min(3650, requestedDays)
    : 0;
  // GÓI LÀM SÀN, không phải làm gợi ý.
  //
  // Bản cũ lấy `plan`, `durationDays`, `maxDevices` từ ba ô độc lập của form,
  // nên người bán hoàn toàn có thể cấp một mã 1 THIẾT BỊ cho khách vừa mua gói
  // 3 thiết bị — form mặc định maxDevices = 1 bất kể gói nào — và KHÔNG có gì
  // báo. Khách trả tiền cho một lời hứa mà bản ghi không mang.
  //
  // Nay lấy `Math.max(gói, yêu cầu)`: người bán vẫn rộng tay thêm được (tặng
  // thêm thiết bị, cộng thêm ngày) nhưng KHÔNG THỂ cấp ít hơn thứ đã bán.
  // Hướng bất đối xứng đó là cố ý — rộng tay là quyết định, hụt là tai nạn.
  const goi = timGoi(input.plan) || GOI[0];
  const plan = goi.ma;
  const createdAt = new Date(now).toISOString();
  return {
    id: randomUUID(),
    label: String(input.label || 'Mã học viên').trim().slice(0, 100),
    customer: String(input.customer || '').trim().slice(0, 120),
    plan,
    status: 'active',
    maxDevices: Math.min(10, Math.max(goi.thietBi, Number.parseInt(input.maxDevices, 10) || 1)),
    // KHÔNG còn nhánh vĩnh viễn: chủ dự án nói thẳng là không cam kết duy trì
    // web trọn đời được, và bán một lời hứa không giữ nổi thì tệ hơn không bán.
    // Mã cũ dạng vĩnh viễn (expiresAt = null) vẫn chạy bình thường —
    // `validateRecord` bỏ qua null — nên không ai bị cắt giữa chừng.
    expiresAt: new Date(now + Math.max(goi.ngay, xinNgay) * 86_400_000).toISOString(),
    devices: {},
    version: 1,
    createdAt,
    updatedAt: createdAt,
    lastUsedAt: null,
    codePreview: input.codePreview || '',
  };
}

export function validateRecord(record, now = Date.now()) {
  if (!record || record.status !== 'active') return { ok: false, reason: 'inactive' };
  if (record.expiresAt && new Date(record.expiresAt).getTime() <= now) return { ok: false, reason: 'expired' };
  return { ok: true };
}

export async function readAccessRecord(env, codeHash) {
  const raw = await redisCommand(env, 'GET', accessKey(codeHash));
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export async function writeAccessRecord(env, codeHash, record) {
  await redisCommand(env, 'SET', accessKey(codeHash), JSON.stringify(record));
}

export function clientIdentifier(request) {
  const forwarded = request.headers['x-forwarded-for'];
  return hashValue(Array.isArray(forwarded) ? forwarded[0] : String(forwarded || request.headers['x-real-ip'] || 'unknown').split(',')[0].trim());
}

export async function enforceRateLimit(env, scope, identifier, limit, windowSeconds) {
  const key = `grammar:rate:${scope}:${identifier}`;
  const [count] = await redisPipeline(env, [['INCR', key], ['EXPIRE', key, windowSeconds]]);
  return Number(count) <= limit;
}

export function jsonResponse(response, status, data, extraHeaders = {}) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  for (const [key, value] of Object.entries(extraHeaders)) response.setHeader(key, value);
  return response.status(status).json(data);
}

export async function requireLearner(request, env = process.env) {
  const token = parseCookies(request.headers.cookie)[ACCESS_COOKIE];
  const payload = verifyToken(token, env.ACCESS_SESSION_SECRET);
  if (!payload || payload.role !== 'learner') return null;
  const record = await readAccessRecord(env, payload.codeHash);
  if (!validateRecord(record).ok || record.version !== payload.version || !record.devices?.[payload.deviceHash]) return null;
  return { payload, record };
}

export function requireAdmin(request, env = process.env) {
  const token = parseCookies(request.headers.cookie)[ADMIN_COOKIE];
  const payload = verifyToken(token, env.ACCESS_SESSION_SECRET);
  return payload?.role === 'admin' && payload.adminKeyHash === hashValue(env.ACCESS_ADMIN_SECRET)
    ? payload
    : null;
}

export function safeSecretEqual(received, expected) {
  if (!received || !expected) return false;
  const a = Buffer.from(String(received));
  const b = Buffer.from(String(expected));
  return a.length === b.length && timingSafeEqual(a, b);
}
