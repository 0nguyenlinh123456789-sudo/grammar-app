// File: tests/cloudflare_tuyen.test.js
//
// CHẠY TRỌN HÀNH TRÌNH BÁN HÀNG THEO HÌNH DẠNG WEB (Cloudflare), không phải
// hình dạng Node (Vercel).
//
// ══ VÌ SAO BÀI KIỂM NÀY PHẢI TỒN TẠI RIÊNG ══
// `tests/core.test.js` đã chạy trọn hành trình đăng nhập → cấp mã → kích hoạt
// → xác minh, nhưng nó dựng yêu cầu kiểu Node: `headers` là object thường và
// `body` là object ĐÃ phân tích sẵn. Trên Cloudflare cả hai đều khác:
//
//   · `request.headers` là `Headers` → `headers.cookie` ra `undefined`;
//   · `request.body` là `ReadableStream` → biểu thức phân tích cũ trả về CHÍNH
//     cái stream, nên `body.action` thành `undefined`.
//
// Cả hai đều KHÔNG NÉM LỖI. Nghĩa là một bản Cloudflare hỏng hoàn toàn vẫn có
// thể qua sạch bộ kiểm cũ, và người đầu tiên phát hiện sẽ là khách đã trả tiền
// mà không kích hoạt được mã. Nên bài kiểm này dùng `Request`/`Response` THẬT
// của nền tảng Web (Node 24 có sẵn), không giả lập.
//
// ══ THỨ BÀI KIỂM NÀY KHÔNG CHỨNG MINH ĐƯỢC ══
// Nó chứng minh THÂN TUYẾN chạy đúng dưới hình dạng Web. Nó KHÔNG chứng minh
// việc triển khai thật chạy được: định tuyến của Pages, biến môi trường gắn
// vào, giới hạn CPU — những thứ đó chỉ một bản deploy thật mới trả lời được.
// Đừng đọc màu xanh ở đây thành "đã chuyển nhà xong".
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { onRequest as tuyenAccess } from '../functions/api/access.js';
import { onRequest as tuyenAdmin } from '../functions/api/access-admin.js';
import { onRequest as tuyenProgress } from '../functions/api/progress.js';

const ENV = {
  UPSTASH_REDIS_REST_URL: 'https://redis.test',
  UPSTASH_REDIS_REST_TOKEN: 'redis-token',
  ACCESS_SESSION_SECRET: 'session-secret-with-at-least-thirty-two-characters',
  ACCESS_ADMIN_SECRET: 'admin-secret-with-24-characters',
};

/** Redis giả, đủ các lệnh mà ba tuyến dùng. */
function dungRedisGia() {
  const values = new Map();
  const sets = new Map();
  const lists = new Map();
  const chay = ([name, key, ...args]) => {
    switch (name) {
      case 'GET': return values.has(key) ? values.get(key) : null;
      case 'SET': values.set(key, args[0]); return 'OK';
      case 'DEL': return values.delete(key) ? 1 : 0;
      case 'INCR': { const n = Number(values.get(key) || 0) + 1; values.set(key, String(n)); return n; }
      case 'EXPIRE': return 1;
      case 'SADD': { const s = sets.get(key) || new Set(); const t = s.size; s.add(args[0]); sets.set(key, s); return s.size - t; }
      case 'SREM': return sets.get(key)?.delete(args[0]) ? 1 : 0;
      case 'SMEMBERS': return [...(sets.get(key) || [])];
      case 'LPUSH': { const l = lists.get(key) || []; l.unshift(args[0]); lists.set(key, l); return l.length; }
      case 'LTRIM': { const l = lists.get(key) || []; lists.set(key, l.slice(Number(args[0]), Number(args[1]) + 1)); return 'OK'; }
      case 'LRANGE': return (lists.get(key) || []).slice(Number(args[0]), Number(args[1]) + 1);
      default: throw new Error(`lệnh Redis chưa hỗ trợ trong bản giả: ${name}`);
    }
  };
  const that = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    const lenh = JSON.parse(options.body);
    const ra = String(url).endsWith('/pipeline')
      ? lenh.map((c) => ({ result: chay(c) }))
      : { result: chay(lenh) };
    return new Response(JSON.stringify(ra), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  return () => { globalThis.fetch = that; };
}

/**
 * Dựng yêu cầu ĐÚNG như Cloudflare đưa vào: `Headers` thật và thân là
 * `ReadableStream` thật. Không được thay bằng object cho tiện — chính chỗ đó
 * là chỗ hỏng cần bắt.
 */
function yeuCau(duong, { method = 'GET', body, cookie } = {}) {
  const headers = new Headers();
  if (cookie) headers.set('cookie', cookie);
  if (body !== undefined) headers.set('content-type', 'application/json');
  return new Request(`https://bunny.test${duong}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

const banh = (res) => res.headers.getSetCookie?.()[0] || res.headers.get('set-cookie');

test('hình dạng Web: thân yêu cầu là ReadableStream vẫn đọc ra được', async () => {
  const req = yeuCau('/api/access', { method: 'POST', body: { action: 'logout' } });
  // Khẳng định tiền đề của bài kiểm — nếu Node đổi cách dựng Request thì bài
  // kiểm này sẽ âm thầm mất tác dụng, nên phải kiểm cả tiền đề.
  assert.equal(typeof req.body?.getReader, 'function', 'Request.body không còn là ReadableStream — bài kiểm mất tiền đề');
  assert.equal(typeof req.headers.get, 'function', 'Request.headers không còn là Headers — bài kiểm mất tiền đề');

  const khoiPhuc = dungRedisGia();
  try {
    const res = await tuyenAccess({ request: req, env: ENV });
    assert.equal(res.status, 200, 'đọc thân kiểu stream thất bại → không nhận ra action logout');
    assert.equal((await res.json()).ok, true);
  } finally { khoiPhuc(); }
});

test('trọn hành trình bán hàng chạy được trên hình dạng Cloudflare', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    // 1. Người bán đăng nhập.
    const dangNhap = await tuyenAdmin({
      request: yeuCau('/api/access-admin', { method: 'POST', body: { action: 'login', secret: ENV.ACCESS_ADMIN_SECRET } }),
      env: ENV,
    });
    assert.equal(dangNhap.status, 200);
    const banhAdmin = banh(dangNhap);
    assert.ok(banhAdmin, 'không nhận được cookie quản trị — Set-Cookie chưa ra tới Response');

    // 2. Cấp một mã gói 6 tháng.
    const capMa = await tuyenAdmin({
      request: yeuCau('/api/access-admin', {
        method: 'POST', cookie: banhAdmin,
        body: { action: 'create', customer: 'Khách thử', plan: 'thang6' },
      }),
      env: ENV,
    });
    assert.equal(capMa.status, 201, 'cấp mã thất bại — cookie quản trị không đọc được qua Headers');
    const daCap = await capMa.json();
    assert.match(daCap.code, /^GRAM-/);

    // 3. Khách kích hoạt mã trên máy của họ.
    const kichHoat = await tuyenAccess({
      request: yeuCau('/api/access', {
        method: 'POST',
        body: { action: 'activate', code: daCap.code, deviceId: 'thiet-bi-cua-khach-thu' },
      }),
      env: ENV,
    });
    assert.equal(kichHoat.status, 200, 'kích hoạt thất bại trên hình dạng Web');
    const banhKhach = banh(kichHoat);
    assert.ok(banhKhach, 'không có cookie phiên cho người học');

    // 4. Phiên đó phải dùng được ở lần gọi sau.
    const xacMinh = await tuyenAccess({ request: yeuCau('/api/access', { cookie: banhKhach }), env: ENV });
    assert.equal(xacMinh.status, 200);
    const tt = await xacMinh.json();
    assert.equal(tt.authenticated, true);
    assert.equal(tt.access.customer, 'Khách thử');
    // Gói làm SÀN: mua 6 tháng thì bản ghi phải mang đúng 2 thiết bị của gói.
    assert.equal(tt.access.maxDevices, 2);

    // 5. Đồng bộ tiến độ bằng chính phiên đó.
    const ghi = await tuyenProgress({
      request: yeuCau('/api/progress', { method: 'PUT', cookie: banhKhach, body: { data: { xp: 120 }, updatedAt: new Date().toISOString() } }),
      env: ENV,
    });
    assert.equal(ghi.status, 200, 'ghi tiến độ thất bại trên hình dạng Web');

    const doc = await tuyenProgress({ request: yeuCau('/api/progress', { cookie: banhKhach }), env: ENV });
    assert.equal(doc.status, 200);
    assert.equal((await doc.json()).data.xp, 120, 'đọc lại tiến độ không ra thứ vừa ghi');
  } finally { khoiPhuc(); }
});

test('không có cookie thì bị từ chối, và từ chối KHÔNG kèm dữ liệu học viên', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    const res = await tuyenAccess({ request: yeuCau('/api/access'), env: ENV });
    assert.equal(res.status, 401);
    const t = await res.json();
    assert.equal(t.authenticated, false);
    assert.equal(t.access, undefined);
  } finally { khoiPhuc(); }
});

// ══ CHỐT CHỐNG LỆCH ══
// Cả giá trị lẫn rủi ro của cách làm này nằm ở chỗ HAI VỎ BỌC DÙNG CHUNG MỘT
// THÂN. Ngày nào có người vá gấp một lỗi vào riêng `api/access.js` mà quên
// `functions/api/access.js` là ngày hai nền chạy hai kiểu — và lệch ở lớp xác
// thực thì lệch thành lỗ bảo mật, không phải thành lỗi hiển thị.
//
// Nên vỏ bọc phải MỎNG, và "mỏng" ở đây đo được: vài dòng, và không chứa lấy
// một quyết định nào.
test('hai vỏ bọc Vercel/Cloudflare đều chỉ gọi thân dùng chung, không tự xử lý', async () => {
  const fs = await import('node:fs');
  // ⚠️ BẢN ĐẦU CỦA MẢNG NÀY THIẾU TUYẾN `ai`, VÀ ĐÓ LÀ TUYẾN DUY NHẤT KHI ẤY
  // CÒN HAI BẢN RIÊNG — tức tuyến duy nhất cần canh lại là tuyến không ai canh.
  // Hai bản đó đã lệch ở đúng chỗ nguy hiểm nhất: bản Vercel có cổng mã truy
  // cập, bản Cloudflare thì không có dòng nào.
  const CAP = [
    ['api/access.js', 'functions/api/access.js', 'routes/access.js'],
    ['api/access-admin.js', 'functions/api/access-admin.js', 'routes/accessAdmin.js'],
    ['api/progress.js', 'functions/api/progress.js', 'routes/progress.js'],
  ];
  for (const [vercel, cloudflare, than] of CAP) {
    for (const vo of [vercel, cloudflare]) {
      const src = fs.readFileSync(vo, 'utf8');
      assert.ok(src.includes(than), `${vo} không gọi thân dùng chung ${than}`);
      // Soi phần MÃ, không soi chú thích. Bản đầu của chốt này quét cả file nên
      // nó đỏ vì chữ "jsonResponse" nằm trong một câu giải thích — bắt nhầm chú
      // thích là đúng kiểu thước đo đo sai đơn vị.
      const chiMa = src.split('\n').filter((d) => d.trim() && !d.trim().startsWith('//'));
      const ma = chiMa.join('\n');
      for (const cam of ['jsonResponse', 'layBody', 'redisCommand', 'requireLearner', 'requireAdmin']) {
        assert.ok(!ma.includes(cam),
          `${vo} có "${cam}" — logic đã rò ra vỏ bọc, hai nền sẽ lệch nhau. Sửa ở src/server/${than} thay vì ở đây.`);
      }
      const soDong = chiMa.length;
      assert.ok(soDong <= 8, `${vo} dài ${soDong} dòng mã — vỏ bọc phải mỏng, logic thuộc về thân dùng chung`);
    }
  }
});

// Tuyến `ai` không kiểm bằng luật "vỏ mỏng" như ba tuyến kia được: file
// `functions/api/ai.js` còn giữ toàn bộ hiểu biết về nhà cung cấp (MODEL,
// buildRequest, mô tả lỗi 404…) và nhiều nơi nhập thẳng từ đó. Nên ghim bằng
// một bất biến khác, sắc hơn: **phần gọi Google chỉ được nằm ở MỘT chỗ.**
test('tuyến AI: cả hai vỏ bọc đều gọi thân dùng chung, và không tự gọi Google', async () => {
  const fs = await import('node:fs');
  for (const vo of ['api/ai.js', 'functions/api/ai.js']) {
    const src = fs.readFileSync(vo, 'utf8');
    const ma = src.split('\n').filter((d) => d.trim() && !d.trim().startsWith('//')).join('\n');
    assert.ok(/xuLyAi\s*\(/.test(ma), `${vo} không gọi xuLyAi() — tuyến AI lại có hai bản`);
    // Phân biệt LỜI GỌI với KHAI BÁO: `functions/api/ai.js` vẫn là nơi ĐỊNH
    // NGHĨA `geminiEndpoint`, và đó là đúng chỗ của nó. Thứ bị cấm là vỏ bọc
    // tự GỌI nó. Bản đầu của chốt này quét cả hai nên đỏ vì chính khai báo.
    for (const ham of ['geminiEndpoint', 'readGeminiKey']) {
      assert.ok(!new RegExp(`(?<!function\\s)\\b${ham}\\s*\\(`).test(ma),
        `${vo} tự gọi ${ham}() — phần nói chuyện với Google đã rò ra vỏ bọc, hai nền sẽ lệch nhau`);
    }
  }
});

// Bản Cloudflare cũ đi thẳng tới Google mà không hỏi mã truy cập lấy một câu.
// Phép kiểm này không cần key Gemini thật: thứ cần chứng minh là yêu cầu bị
// CHẶN TRƯỚC KHI tới chỗ cần key.
test('tuyến AI trên hình dạng Cloudflare CÓ cổng — không có mã thì không đi tiếp', async () => {
  const { onRequestPost } = await import('../functions/api/ai.js');
  const khoiPhuc = dungRedisGia();
  try {
    const req = new Request('https://bunny.test/api/ai', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json', 'x-gemini-key': 'AIzaSyDUMMYKEYDUMMYKEYDUMMYKEY12345' }),
      body: JSON.stringify({ mode: 'writing', payload: { text: 'hello world' } }),
    });
    const res = await onRequestPost({ request: req, env: ENV });
    assert.equal(res.status, 401, 'gọi AI không có mã truy cập mà KHÔNG bị chặn — cổng chuyển tiếp đang mở cho cả Internet');
    assert.equal((await res.json()).code, 'access-required');
  } finally { khoiPhuc(); }
});

// Đây là cái bẫy nguy hiểm nhất trong cả cuộc chuyển nhà: trên Workers
// `process.env` RỖNG. Bản cũ sẽ đọc ra khoá ký rỗng → `verifyToken` trả null →
// tuyến báo "phiên đã hết hạn, hãy nhập lại mã". Khách có mã hợp lệ ngồi nhập
// đi nhập lại, log thì sạch bong. Nay nó phải kêu ĐÚNG TÊN: chưa cấu hình.
test('thiếu khoá ký phiên thì báo CHƯA CẤU HÌNH, không giả dạng hết hạn', async () => {
  const khoiPhuc = dungRedisGia();
  try {
    const thieu = { ...ENV, ACCESS_SESSION_SECRET: '' };
    const res = await tuyenAccess({ request: yeuCau('/api/access'), env: thieu });
    assert.equal(res.status, 503, 'máy chủ chưa cấu hình mà lại trả mã khác 503');
    const t = await res.json();
    assert.match(t.message, /chưa được cấu hình/i,
      'lời báo không nói là máy chủ chưa cấu hình — khách sẽ tưởng mã của mình hỏng');
  } finally { khoiPhuc(); }
});
