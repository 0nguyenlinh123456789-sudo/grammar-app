import { buildRequest, getRequestError } from '../functions/api/ai.js';
import { AccessConfigError, requireLearner } from '../src/server/accessCore.js';

const MODEL = 'gemini-2.5-flash';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'POST') {
    return response.status(405).json({ code: 'method-not-allowed', message: 'Phương thức không được hỗ trợ.' });
  }
  try {
    const session = await requireLearner(request);
    if (!session) {
      return response.status(401).json({ code: 'access-required', message: 'Phiên truy cập đã hết hạn. Hãy nhập lại mã truy cập.' });
    }
    if (session.record.plan === 'standard') {
      return response.status(403).json({ code: 'premium-required', message: 'Tính năng AI dành cho gói Premium. Hãy liên hệ người bán để nâng cấp.' });
    }
  } catch (error) {
    if (error instanceof AccessConfigError) {
      return response.status(503).json({ code: 'access-not-configured', message: 'Hệ thống mã truy cập chưa được cấu hình.' });
    }
    return response.status(503).json({ code: 'access-unavailable', message: 'Chưa thể kiểm tra quyền truy cập lúc này.' });
  }
  if (!process.env.GEMINI_API_KEY) {
    return response.status(503).json({ code: 'not-configured', message: 'Tính năng AI nâng cao chưa được cấu hình.' });
  }
  if (Number(request.headers['content-length'] || 0) > 6 * 1024 * 1024) {
    return response.status(413).json({ code: 'request-too-large', message: 'Dữ liệu gửi lên quá lớn.' });
  }

  let parts;
  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
    parts = buildRequest(body.mode, body.payload);
  } catch (error) {
    const [code, message] = getRequestError(error);
    return response.status(400).json({ code, message });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    let upstream;
    try {
      upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts }] }),
          signal: controller.signal,
        },
      );
    } finally {
      clearTimeout(timeoutId);
    }

    let result;
    try {
      result = await upstream.json();
    } catch {
      return response.status(502).json({ code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' });
    }
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!upstream.ok || !text) {
      return response.status(502).json({ code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' });
    }
    return response.status(200).json({ text });
  } catch (error) {
    if (error?.name === 'AbortError') {
      return response.status(504).json({ code: 'provider-timeout', message: 'AI phản hồi quá chậm. Hãy thử lại sau.' });
    }
    return response.status(502).json({ code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' });
  }
}
