// File: tests/helpers/redisGia.mjs
// REDIS GIẢ DÙNG CHUNG CHO MỌI TEST LIÊN QUAN CỔNG MÃ TRUY CẬP.
//
// Rút từ `core.test.js` ("access lifecycle creates, activates and remotely
// revokes a customer code") — bản gốc định nghĩa lại y hệt khối này inline.
// Tách ra vì vòng kiểm production-readiness cần MỞ RỘNG lifecycle đó (giới
// hạn thiết bị, giới hạn tốc độ, cookie giả mạo) và không nên chép lần ba.
export function dungRedisGia() {
  const originalFetch = globalThis.fetch;
  const originalEnv = {
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    session: process.env.ACCESS_SESSION_SECRET,
    admin: process.env.ACCESS_ADMIN_SECRET,
  };
  const store = new Map();
  const sets = new Map();
  const lists = new Map();
  const execute = (command) => {
    const [name, key, ...args] = command;
    switch (String(name).toUpperCase()) {
      case 'GET': return store.get(key) ?? null;
      case 'SET': store.set(key, args[0]); return 'OK';
      case 'DEL': return store.delete(key) ? 1 : 0;
      case 'INCR': { const next = Number(store.get(key) || 0) + 1; store.set(key, String(next)); return next; }
      case 'EXPIRE': return 1;
      case 'SADD': { const set = sets.get(key) || new Set(); const before = set.size; set.add(args[0]); sets.set(key, set); return set.size - before; }
      case 'SREM': return sets.get(key)?.delete(args[0]) ? 1 : 0;
      case 'SMEMBERS': return [...(sets.get(key) || [])];
      case 'LPUSH': { const list = lists.get(key) || []; list.unshift(args[0]); lists.set(key, list); return list.length; }
      case 'LTRIM': { const list = lists.get(key) || []; lists.set(key, list.slice(Number(args[0]), Number(args[1]) + 1)); return 'OK'; }
      case 'LRANGE': return (lists.get(key) || []).slice(Number(args[0]), Number(args[1]) + 1);
      default: throw new Error(`Unsupported fake Redis command: ${name}`);
    }
  };
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.test';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'redis-token';
  process.env.ACCESS_SESSION_SECRET = 'session-secret-with-at-least-thirty-two-characters';
  process.env.ACCESS_ADMIN_SECRET = 'admin-secret-with-24-characters';
  globalThis.fetch = async (url, options) => {
    const commands = JSON.parse(options.body);
    const result = String(url).endsWith('/pipeline')
      ? commands.map((command) => ({ result: execute(command) }))
      : { result: execute(commands) };
    return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  return () => {
    globalThis.fetch = originalFetch;
    const restore = (name, value) => (value === undefined ? delete process.env[name] : (process.env[name] = value));
    restore('UPSTASH_REDIS_REST_URL', originalEnv.url);
    restore('UPSTASH_REDIS_REST_TOKEN', originalEnv.token);
    restore('ACCESS_SESSION_SECRET', originalEnv.session);
    restore('ACCESS_ADMIN_SECRET', originalEnv.admin);
  };
}

export function responseMock() {
  return {
    headers: {}, statusCode: 200, payload: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(value) { this.statusCode = value; return this; },
    json(value) { this.payload = value; return this; },
  };
}

export async function goi(handler, request) {
  const response = responseMock();
  await handler({ headers: {}, ...request }, response);
  return response;
}
