const AI_ENDPOINT = '/api/ai';

export class AiServiceError extends Error {
  constructor(message, code = 'ai-error') {
    super(message);
    this.name = 'AiServiceError';
    this.code = code;
  }
}

export async function requestAi(mode, payload, { signal } = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort('timeout'), 30000);
  const abortFromCaller = () => controller.abort(signal?.reason);
  if (signal?.aborted) abortFromCaller();
  else signal?.addEventListener('abort', abortFromCaller, { once: true });

  let response;
  try {
    response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
