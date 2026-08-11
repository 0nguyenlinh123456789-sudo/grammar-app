import { AI_KEY_HEADER, getGeminiKey, isValidGeminiKey } from './aiKey.js';

const AI_ENDPOINT = '/api/ai';

export const MISSING_KEY_MESSAGE = 'Bạn chưa thêm API key Gemini của mình. Mở "KHÓA AI (API KEY)" ở menu bên trái để dán key miễn phí từ Google AI Studio.';

export class AiServiceError extends Error {
  constructor(message, code = 'ai-error') {
    super(message);
    this.name = 'AiServiceError';
    this.code = code;
  }
}

/**
 * Call the AI proxy with the learner's own Gemini key.
 *
 * `apiKey` is only passed explicitly by tests and callers that already hold a
 * key; normal UI code relies on the key saved in this browser.
 */
export async function requestAi(mode, payload, { signal, apiKey } = {}) {
  const key = apiKey ?? getGeminiKey();
  if (!isValidGeminiKey(key)) throw new AiServiceError(MISSING_KEY_MESSAGE, 'missing-key');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort('timeout'), 30000);
  const abortFromCaller = () => controller.abort(signal?.reason);
  if (signal?.aborted) abortFromCaller();
  else signal?.addEventListener('abort', abortFromCaller, { once: true });

  let response;
  try {
    response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', [AI_KEY_HEADER]: key },
      body: JSON.stringify({ mode, payload }),
      signal: controller.signal,
    });
  } catch (error) {
    if (controller.signal.aborted) {
      throw new AiServiceError('Yêu cầu AI mất quá nhiều thời gian. Vui lòng thử lại.', 'timeout');
    }
    throw new AiServiceError(error?.message || 'Không thể kết nối dịch vụ AI.', 'network-error');
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', abortFromCaller);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new AiServiceError('Dịch vụ AI trả về dữ liệu không hợp lệ.', 'invalid-response');
  }

  if (!response.ok) {
    throw new AiServiceError(
      data?.message || 'Dịch vụ AI hiện chưa sẵn sàng.',
      data?.code || `http-${response.status}`,
    );
  }

  return data;
}
