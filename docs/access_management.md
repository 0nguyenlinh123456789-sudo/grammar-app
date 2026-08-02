# Triển khai hệ thống mã truy cập

## 1. Tạo kho dữ liệu

Dự án production hiện nhắm tới Vercel. Trong Vercel Marketplace, kết nối một cơ sở dữ liệu Upstash Redis với project. Vercel sẽ thêm các biến `UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN`.

Hệ thống cũng nhận tên biến cũ `KV_REST_API_URL` và `KV_REST_API_TOKEN`.

Tài liệu chính thức:

- https://vercel.com/docs/redis
- https://upstash.com/docs/redis/features/restapi

## 2. Tạo bí mật máy chủ

Thêm các biến sau cho cả Production và Preview:

```text
ACCESS_SESSION_SECRET=<chuỗi ngẫu nhiên tối thiểu 32 ký tự>
ACCESS_ADMIN_SECRET=<chuỗi ngẫu nhiên khác, tối thiểu 24 ký tự>
```

Không đặt tên các biến này với tiền tố `VITE_`, không đưa vào Git và không gửi khóa quản trị cho học viên. Có thể tạo chuỗi bằng trình quản lý mật khẩu hoặc công cụ tạo secret đáng tin cậy.

Sau khi đổi `ACCESS_SESSION_SECRET`, mọi học viên và quản trị viên sẽ phải đăng nhập lại. Sau khi đổi `ACCESS_ADMIN_SECRET`, dùng khóa mới ở trang quản trị.

## 3. Deploy và cấp mã đầu tiên

1. Deploy project lên Vercel.
2. Mở `https://ten-mien-cua-ban/?admin=access`.
3. Nhập `ACCESS_ADMIN_SECRET`.
4. Điền khách hàng, gói, thời hạn, số thiết bị rồi chọn **Tạo mã truy cập**.
5. Sao chép mã ngay. Mã gốc không thể khôi phục từ cơ sở dữ liệu; nếu mất, dùng **Đổi mã**.

## 4. Quy tắc vận hành

- **Tạm khóa**: ngắt phiên hiện tại khi hệ thống kiểm tra lại và chặn lần kích hoạt sau.
- **Đổi mã**: xóa mã cũ, đăng xuất mọi thiết bị và tạo mã mới chỉ hiển thị một lần.
- **Xóa máy**: giải phóng toàn bộ lượt kích hoạt thiết bị của mã; học viên cần nhập lại mã.
- **Gia hạn**: cộng 30 ngày từ ngày hết hạn hiện tại, hoặc từ hôm nay nếu đã hết hạn.
- **Xóa**: xóa vĩnh viễn bản ghi mã và vô hiệu hóa mọi phiên liên quan.

Ứng dụng kiểm tra lại phiên khi mở trang, khi quay lại tab và định kỳ 5 phút. API AI kiểm tra quyền ở mọi request.

Tiến độ học đã có đồng bộ nền qua `/api/progress`: khi học viên đổi thiết bị, bản sao mới hơn trên server được khôi phục; nếu bản cục bộ mới hơn, hệ thống ghi lại lên server. Dữ liệu cục bộ vẫn được giữ làm fallback khi offline.

Ứng dụng production cũng đăng ký PWA service worker (`public/sw.js`), cache phần vỏ ứng dụng và các tài nguyên đã truy cập. Các request `/api/*` không bao giờ được cache để tránh dùng phiên hoặc dữ liệu quản trị cũ.

## 5. Mô hình gói đề xuất

| Gói | Thời hạn gợi ý | Thiết bị | AI |
| --- | --- | --- | --- |
| Standard | 30–90 ngày | 1 | Không |
| Premium | 90–365 ngày | 1–3 | Có |
| Trọn đời | Không hết hạn | 2–5 | Có |

Các gói, giá và cam kết hỗ trợ cần được trình bày rõ trong điều khoản bán hàng.

## 6. Phạm vi bảo vệ

Mã truy cập bảo vệ giao diện ứng dụng, phiên người dùng và API AI. Vì đây là SPA, các bundle JavaScript và dữ liệu tĩnh vẫn được CDN gửi tới trình duyệt. Nếu cần chống trích xuất nội dung ở mức cao hơn, cần chuyển nội dung bài học sang API có xác thực hoặc cơ sở dữ liệu server-side; đó là một kiến trúc khác và tốn thêm băng thông/chi phí vận hành.

Không cam kết một website có thể ngăn tuyệt đối việc quay màn hình, sao chép thủ công hoặc chia sẻ tài khoản. Giới hạn thiết bị, thu hồi phiên và điều khoản sử dụng là các lớp kiểm soát thực tế.
