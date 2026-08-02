const MODEL = 'gemini-2.5-flash';
const MAX_TEXT_LENGTH = 6000;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_IMAGE_BASE64_LENGTH = 4 * Math.ceil(MAX_IMAGE_BYTES / 3);

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  },
});

const requestErrors = {
  'empty-input': ['empty-input', 'Hãy nhập nội dung trước khi chấm.'],
  'invalid-image': ['invalid-image', 'Ảnh không hợp lệ hoặc không được hỗ trợ.'],
  'image-too-large': ['image-too-large', 'Ảnh phải nhỏ hơn 4 MB.'],
  'unsupported-mode': ['unsupported-mode', 'Yêu cầu AI không được hỗ trợ.'],
};

export function getRequestError(error) {
  return requestErrors[error?.message] || ['bad-request', 'Yêu cầu không hợp lệ.'];
}

const cleanText = (value, max = MAX_TEXT_LENGTH) => String(value || '').trim().slice(0, max);

export function buildRequest(mode, payload = {}) {
  if (mode === 'writing') {
    const text = cleanText(payload.text);
    if (!text) throw new Error('empty-input');
    const topic = cleanText(payload.topicTitle, 200);
    return [{ text: `Bạn là giáo viên tiếng Anh. Hãy chấm bài viết${topic ? ` thuộc chủ đề "${topic}"` : ''}.
Bài làm của học viên: "${text}"
Phản hồi ngắn gọn bằng tiếng Việt gồm: (1) điểm /10, (2) lỗi ngữ pháp/chính tả và cách sửa, (3) một câu mẫu tự nhiên hơn. Không dùng markdown.` }];
  }

  if (mode === 'image-vocabulary') {
    const imageData = String(payload.imageData || '').trim();
    const mimeType = cleanText(payload.mimeType, 80);
    if (!imageData || !/^image\/(jpeg|png|webp|gif)$/i.test(mimeType)) throw new Error('invalid-image');
    if (imageData.length > MAX_IMAGE_BASE64_LENGTH) throw new Error('image-too-large');
    if (imageData.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(imageData)) throw new Error('invalid-image');
    const padding = imageData.endsWith('==') ? 2 : imageData.endsWith('=') ? 1 : 0;
    if ((imageData.length * 3) / 4 - padding > MAX_IMAGE_BYTES) throw new Error('image-too-large');
    return [
      { text: `Bạn là giáo viên tiếng Anh. Nhận diện đối tượng hoặc hành động chính trong ảnh. Chỉ trả về JSON hợp lệ, không dùng markdown, theo cấu trúc: {"word":"English word","ipa":"/IPA/","meaning":"Nghĩa tiếng Việt","phrases":["Cụm từ — nghĩa"],"sentences":[{"en":"Example","vi":"Bản dịch"}]}. Tạo 2 cụm từ và 2 câu ví dụ.` },
      { inlineData: { data: imageData, mimeType } },
    ];
  }

  throw new Error('unsupported-mode');
}

export async function onRequestPost({ request, env }) {
  if (!env.GEMINI_API_KEY) {
    return json({ code: 'not-configured', message: 'Tính năng AI nâng cao chưa được cấu hình.' }, 503);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 6 * 1024 * 1024) {
    return json({ code: 'request-too-large', message: 'Dữ liệu gửi lên quá lớn.' }, 413);
  }

  let parts;
  try {
    const { mode, payload } = await request.json();
    parts = buildRequest(mode, payload);
  } catch (error) {
    const [code, message] = getRequestError(error);
    return json({ code, message }, 400);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);
    let upstream;
    try {
      upstream = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
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
      return json({ code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' }, 502);
    }
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!upstream.ok || !text) {
      return json({ code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' }, 502);
    }

    return json({ text });
  } catch (error) {
    if (error?.name === 'AbortError') {
      return json({ code: 'provider-timeout', message: 'AI phản hồi quá chậm. Hãy thử lại sau.' }, 504);
    }
    return json({ code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' }, 502);
  }
}

export function onRequest() {
  return json({ code: 'method-not-allowed', message: 'Phương thức không được hỗ trợ.' }, 405);
}
