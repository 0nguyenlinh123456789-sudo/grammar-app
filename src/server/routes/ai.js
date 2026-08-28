// File: src/server/routes/ai.js
// THÂN TUYẾN AI DÙNG CHUNG cho cả hai nơi chạy.
//
// Vỏ bọc Vercel (Node):     api/ai.js           -> (request, process.env, response)
// Vỏ bọc Cloudflare (Web):  functions/api/ai.js -> (request, env)  [response = null]
//
// ══ VÌ SAO TUYẾN NÀY PHẢI GỘP, VÀ GỘP MUỘN ══
// Ba tuyến kia đã dùng chung một thân từ trước; riêng tuyến AI còn hai bản
// riêng, và hai bản đó ĐÃ LỆCH NHAU Ở ĐÚNG CHỖ NGUY HIỂM NHẤT:
//
//   · `api/ai.js` (Vercel) gọi `requireLearner` — có cổng, phải có mã truy cập.
//   · `functions/api/ai.js` (Cloudflare) KHÔNG gọi gì cả — cổng mở toang.
//
// Nghĩa là nếu chuyển nhà sang Cloudflare, `/api/ai` thành một cổng chuyển
// tiếp CÔNG KHAI tới Google: bất kỳ ai trên Internet cũng POST được, không cần
// mã truy cập, và máy chủ của chủ dự án đứng ra gọi hộ. Không lộ key của chủ
// (mỗi người mang key riêng), nhưng nó là hạ tầng bị dùng chùa, và là đúng
// kiểu lệch mà cách làm "một thân dùng chung" sinh ra để chặn.
//
// Chốt chống lệch trong tests/cloudflare_tuyen.test.js ban đầu bỏ sót đúng
// tuyến này — nó chỉ canh ba tuyến kia. Tuyến duy nhất còn hai bản lại là
// tuyến duy nhất không ai canh.
//
// ══ THỨ Ở LẠI CHỖ CŨ ══
// Phần hiểu biết về nhà cung cấp (MODEL, buildRequest, geminiEndpoint,
// describeProviderFailure…) vẫn nằm trong functions/api/ai.js. Đó không phải
// mã theo nền chạy, và `tests/ai_key_model.test.js` nhập thẳng từ đó.
import {
  AI_KEY_HEADER, MISSING_KEY_RESPONSE, buildRequest, describeProviderFailure,
  geminiEndpoint, getRequestError, readGeminiKey,
} from '../../../functions/api/ai.js';
import { AccessConfigError, enforceRateLimit, jsonResponse, layBody, layHeader, requireLearner } from '../accessCore.js';

/** Trần thân yêu cầu, khớp với giới hạn ảnh 4 MB đã đo ở functions/api/ai.js. */
const TRAN_BYTE = 6 * 1024 * 1024;
const TRAN_GIAY = 25000;

export async function xuLyAi(request, env, response = null) {
  if (request.method !== 'POST') {
    return jsonResponse(response, 405, { code: 'method-not-allowed', message: 'Phương thức không được hỗ trợ.' });
  }

  // ══ CỔNG ══ Đây là dòng mà bản Cloudflare cũ không có.
  try {
    const session = await requireLearner(request, env);
    if (!session) {
      return jsonResponse(response, 401, { code: 'access-required', message: 'Phiên truy cập đã hết hạn. Hãy nhập lại mã truy cập.' });
    }
    // Không kiểm gói: mọi lượt gọi AI đều tính vào key Gemini của CHÍNH người
    // học, nên khách gói thấp mang key riêng vẫn dùng được.

    // Khoá theo MÃ TRUY CẬP, không theo IP, cùng lý do với progress.js. Mỗi
    // lượt giữ một kết nối tới Google tới 25 giây (TRAN_GIAY) — giới hạn tốc
    // độ ở đây bảo vệ TÀI NGUYÊN MÁY CHỦ (số kết nối treo cùng lúc), không
    // phải quota Google của người học (đó là việc của chính họ).
    try {
      const con = await enforceRateLimit(env, 'ai', session.payload.codeHash, 30, 600);
      if (!con) return jsonResponse(response, 429, { code: 'rate-limited', message: 'Bạn gọi AI quá nhiều lần trong thời gian ngắn. Vui lòng chờ ít phút.' });
    } catch { /* kho đếm không dùng được thì vẫn cho gọi AI — không phải bí mật đáng để chặn */ }
  } catch (error) {
    if (error instanceof AccessConfigError) {
      return jsonResponse(response, 503, { code: 'access-not-configured', message: 'Hệ thống mã truy cập chưa được cấu hình.' });
    }
    return jsonResponse(response, 503, { code: 'access-unavailable', message: 'Chưa thể kiểm tra quyền truy cập lúc này.' });
  }

  const apiKey = readGeminiKey(layHeader(request, AI_KEY_HEADER));
  if (!apiKey) return jsonResponse(response, 400, MISSING_KEY_RESPONSE);

  if (Number(layHeader(request, 'content-length') || 0) > TRAN_BYTE) {
    return jsonResponse(response, 413, { code: 'request-too-large', message: 'Dữ liệu gửi lên quá lớn.' });
  }

  let parts;
  try {
    const body = await layBody(request);
    parts = buildRequest(body.mode, body.payload);
  } catch (error) {
    const [code, message] = getRequestError(error);
    return jsonResponse(response, 400, { code, message });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TRAN_GIAY);
    let upstream;
    try {
      upstream = await fetch(geminiEndpoint(apiKey), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts }] }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    let result;
    try {
      result = await upstream.json();
    } catch {
      return jsonResponse(response, 502, { code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' });
    }
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!upstream.ok || !text) {
      // Nhánh 404 ở đây nói THẬT rằng lỗi thuộc về ứng dụng chứ không phải key
      // của người học — xem chú thích ghim model trong functions/api/ai.js.
      const [code, message, status] = describeProviderFailure(upstream.status);
      return jsonResponse(response, status, { code, message });
    }
    return jsonResponse(response, 200, { text });
  } catch (error) {
    if (error?.name === 'AbortError') {
      return jsonResponse(response, 504, { code: 'provider-timeout', message: 'AI phản hồi quá chậm. Hãy thử lại sau.' });
    }
    return jsonResponse(response, 502, { code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' });
  }
}
