export const config = {
  // Dòng này báo cho Vercel biết: Bật khóa cho tất cả các trang trên web
  matcher: '/(.*)', 
};

export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  // Never commit credentials to source control. Configure these values in the
  // hosting environment instead. Failing closed prevents an accidentally
  // unprotected deployment when the secret has not been configured.
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD;
  const expectedUser = process.env.BASIC_AUTH_USERNAME || '';

  if (!expectedPassword) {
    return new Response('Ứng dụng chưa được cấu hình bảo mật.', { status: 503 });
  }

  if (basicAuth?.startsWith('Basic ')) {
    // Giải mã thông tin người dùng nhập vào
    const authValue = basicAuth.slice(6);
    let user = '';
    let password = '';
    try {
      const decoded = atob(authValue);
      const separator = decoded.indexOf(':');
      user = separator >= 0 ? decoded.slice(0, separator) : '';
      password = separator >= 0 ? decoded.slice(separator + 1) : '';
    } catch {
      // Treat malformed credentials as unauthorized instead of throwing.
    }

    if (password === expectedPassword && (!expectedUser || user === expectedUser)) {
      return; // Đúng mật khẩu -> Mở cửa cho phép tải web
    }
  }

  // Nếu chưa nhập mật khẩu hoặc nhập sai -> Chặn lại và bật bảng thông báo
  return new Response('Truy cap bi tu choi. Vui long nhap dung mat khau!', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Khu vuc bao mat"',
    },
  });
}
