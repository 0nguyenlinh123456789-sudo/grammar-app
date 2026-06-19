export const config = {
  // Dòng này báo cho Vercel biết: Bật khóa cho tất cả các trang trên web
  matcher: '/(.*)', 
};

export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  // ==========================================
  // THIẾT LẬP MẬT KHẨU CỦA BẠN TẠI ĐÂY
  // ==========================================
  const myCurrentPassword = "englishlearning2026"; 

  if (basicAuth) {
    // Giải mã thông tin người dùng nhập vào
    const authValue = basicAuth.split(' ')[1];
    const [user, password] = atob(authValue).split(':');

    // Kiểm tra mật khẩu (Phần tên người dùng - user - họ nhập gì cũng được)
    if (password === myCurrentPassword) {
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