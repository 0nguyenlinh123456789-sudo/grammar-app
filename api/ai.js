import {
  AI_KEY_HEADER, MISSING_KEY_RESPONSE, buildRequest, describeProviderFailure,
  geminiEndpoint, getRequestError, readGeminiKey,
} from '../functions/api/ai.js';
import { AccessConfigError, requireLearner } from '../src/server/accessCore.js';

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
    // No plan check: every AI call is billed to the learner's own Gemini key,
    // so Standard customers who bring a key may use the AI features too.
  } catch (error) {
    if (error instanceof AccessConfigError) {
      return response.status(503).json({ code: 'access-not-configured', message: 'Hệ thống mã truy cập chưa được cấu hình.' });
    }
    return response.status(503).json({ code: 'access-unavailable', message: 'Chưa thể kiểm tra quyền truy cập lúc này.' });
  }
  const apiKey = readGeminiKey(request.headers[AI_KEY_HEADER]);
  if (!apiKey) {
    return response.status(400).json(MISSING_KEY_RESPONSE);
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
        geminiEndpoint(apiKey),
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
      const [code, message, status] = describeProviderFailure(upstream.status);
      return response.status(status).json({ code, message });
    }
    return response.status(200).json({ text });
  } catch (error) {
    if (error?.name === 'AbortError') {
      return response.status(504).json({ code: 'provider-timeout', message: 'AI phản hồi quá chậm. Hãy thử lại sau.' });
    }
    return response.status(502).json({ code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' });
  }
}
