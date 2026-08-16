const MODEL = 'gemini-2.5-flash';
const MAX_TEXT_LENGTH = 6000;

// Learners bring their own Google AI Studio key. It arrives on this header,
// is used for exactly one upstream call and is never stored or logged.
export const AI_KEY_HEADER = 'x-gemini-key';
export const GEMINI_KEY_PATTERN = /^[A-Za-z0-9_-]{20,120}$/;

export const MISSING_KEY_RESPONSE = {
  code: 'missing-key',
  message: 'Bạn chưa thêm API key Gemini của mình. Mở "KHÓA AI (API KEY)" ở menu bên trái để dán key miễn phí từ Google AI Studio.',
};

/** Returns the caller's key, or '' when it is absent or malformed. */
export function readGeminiKey(value) {
  const key = String(value ?? '').trim();
  return GEMINI_KEY_PATTERN.test(key) ? key : '';
}

export function geminiEndpoint(key) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`;
}

/**
 * Turn an upstream Gemini status into advice the learner can act on. With
 * bring-your-own-key, a rejected key or an exhausted quota is the learner's to
 * fix, so it must not be flattened into a generic "try again later".
 *
 * @returns {[code: string, message: string, status: number]}
 */
export function describeProviderFailure(upstreamStatus) {
  if (upstreamStatus === 400 || upstreamStatus === 401 || upstreamStatus === 403) {
    return ['invalid-key', 'API key Gemini không hợp lệ hoặc chưa được cấp quyền. Hãy kiểm tra lại key trong mục "KHÓA AI (API KEY)".', 400];
  }
  if (upstreamStatus === 429) {
    return ['quota-exceeded', 'Key Gemini của bạn đã hết hạn mức miễn phí trong hôm nay. Hãy chờ ít phút hoặc dùng key khác.', 429];
  }
  return ['provider-error', 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.', 502];
}

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

  // NÓI (việc 3.5). Khác `writing` ở một điểm KHÔNG được nhầm: thứ gửi lên đây
  // là BẢN CHỮ do trình duyệt nhận dạng, KHÔNG phải file âm thanh. Mô hình
  // không nghe được gì cả, nên nó tuyệt đối không được cho điểm phát âm — và
  // phải nói ra cả những chỗ bản nhận dạng có thể sai chứ không phải người nói
  // sai. Cũng KHÔNG xin "điểm /10": một con số cho lượt nói mà chỉ nhìn chữ là
  // con số bịa.
  if (mode === 'speaking') {
    const text = cleanText(payload.text);
    if (!text) throw new Error('empty-input');
    const topic = cleanText(payload.topicTitle, 200);
    return [{ text: `Bạn là giáo viên tiếng Anh. Dưới đây là BẢN CHỮ do phần mềm nhận dạng giọng nói ghi lại từ một lượt nói${topic ? ` về chủ đề "${topic}"` : ''}. Bạn KHÔNG nghe được âm thanh.
Bản chữ: "${text}"
Vì chỉ có chữ, TUYỆT ĐỐI KHÔNG nhận xét về phát âm, trọng âm, ngữ điệu hay tốc độ, và KHÔNG cho điểm số.
Phản hồi ngắn gọn bằng tiếng Việt gồm: (1) nội dung đã trả lời đúng trọng tâm đề chưa, (2) lỗi ngữ pháp hoặc cách dùng từ thấy được trong bản chữ và cách sửa, (3) một cách diễn đạt tự nhiên hơn cho một ý bất kỳ, (4) một câu nhắc rằng phần mềm nhận dạng có thể nghe sai nên vài chỗ lạ có thể không phải lỗi của người nói. Không dùng markdown.` }];
  }

  if (mode === 'chat') {
    const question = cleanText(payload.question, 800);
    if (!question) throw new Error('empty-input');
    const history = cleanText(payload.history, 1500);
    return [{ text: `Bạn là Bunny — thỏ gia sư tiếng Anh thân thiện của ứng dụng Bunny English. Trả lời NGẮN GỌN bằng tiếng Việt (tối đa 120 từ), kèm ví dụ tiếng Anh có nghĩa tiếng Việt khi phù hợp. Chỉ trả lời các chủ đề học tiếng Anh (ngữ pháp, từ vựng, phát âm, cách học); nếu bị hỏi ngoài lề, nhẹ nhàng lái về việc học. Không dùng markdown.${history ? `\nHội thoại trước:\n${history}` : ''}\nHọc viên hỏi: "${question}"` }];
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

export async function onRequestPost({ request }) {
  const apiKey = readGeminiKey(request.headers.get(AI_KEY_HEADER));
  if (!apiKey) return json(MISSING_KEY_RESPONSE, 400);

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
      return json({ code: 'provider-error', message: 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.' }, 502);
    }
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!upstream.ok || !text) {
      const [code, message, status] = describeProviderFailure(upstream.status);
      return json({ code, message }, status);
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
