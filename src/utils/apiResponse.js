// Shared reader for the access APIs.
//
// It exists because "the request did not fail" is not the same as "the server
// said yes". A host that serves /api/* from static files (Vite dev) or rewrites
// them to index.html (SPA fallback) answers 200 with JavaScript or HTML, which
// the old `if (!response.ok) throw` check happily accepted as a valid session.
// Everything here fails closed: only our own JSON carrying an explicit
// `authenticated: true` unlocks a screen.

export class AccessResponseError extends Error {
  constructor(message, { code, status } = {}) {
    super(message);
    this.name = 'AccessResponseError';
    this.code = code;
    this.status = status;
  }
}

/**
 * @param {Response} response
 * @param {{ requireAuth?: boolean, requireFields?: string[], fallbackMessage?: string }} options
 */
export async function readAccessResponse(response, options = {}) {
  const {
    requireAuth = false,
    requireFields = [],
    fallbackMessage = 'Không thể kết nối hệ thống cấp quyền.',
  } = options;

  const data = await response.json().catch(() => null);
  const isPlainObject = data !== null && typeof data === 'object' && !Array.isArray(data);

  if (!response.ok || !isPlainObject) {
    throw new AccessResponseError(
      (isPlainObject && data.message) || fallbackMessage,
      { code: isPlainObject ? data.code : 'invalid-response', status: response.status },
    );
  }

  if (requireAuth && data.authenticated !== true) {
    throw new AccessResponseError(data.message || 'Phiên truy cập không hợp lệ. Vui lòng nhập lại mã.', {
      code: data.code || 'unauthenticated',
      status: response.status === 200 ? 401 : response.status,
    });
  }

  for (const field of requireFields) {
    if (!data[field]) {
      throw new AccessResponseError(data.message || 'Máy chủ trả về dữ liệu không hợp lệ.', {
        code: 'invalid-response',
        status: response.status === 200 ? 401 : response.status,
      });
    }
  }

  return data;
}
