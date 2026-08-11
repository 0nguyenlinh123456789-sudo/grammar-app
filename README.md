# Grammar Pro

Nền tảng tự học tiếng Anh gồm ngữ pháp B1–C2, từ vựng theo chủ đề và giáo trình Oxford, IELTS, SRS, luyện nghe–nói–viết, trò chơi, theo dõi tiến độ và trợ lý AI.

## Chạy dự án

```bash
npm install
npm run dev
```

Ở chế độ phát triển Vite, lớp mã truy cập được bỏ qua để lập trình thuận tiện — đây là lý do `localhost:5173` vào thẳng không cần mã, và màn hình dev có một huy hiệu vàng nhắc điều đó. Bản production luôn đóng nếu máy chủ chưa được cấu hình.

Muốn thử đúng màn hình nhập mã ngay khi chạy dev, đặt `VITE_FORCE_ACCESS_GATE=1` trong `.env` rồi khởi động lại `npm run dev`.

## Khóa AI (API key Gemini)

Ứng dụng **không** kèm sẵn API key. Mỗi học viên tự lấy key miễn phí ở [Google AI Studio](https://aistudio.google.com/app/apikey) và dán vào mục **KHÓA AI (API KEY)** ở menu bên trái.

- Key chỉ nằm trong `localStorage` của trình duyệt người đó và được gửi kèm từng request tới `/api/ai` qua header `x-gemini-key`.
- Máy chủ dùng key đúng một lần cho lệnh gọi Gemini, không lưu, không ghi log, không dùng chung.
- Không có key thì mọi phần học vẫn chạy; chỉ **Gia sư Writing** và **Quét ảnh** tạm nghỉ.
- Vì học viên tự trả phí AI, mọi gói (kể cả Standard) đều được dùng AI khi đã có key riêng.

## Hệ thống mã truy cập

- Học viên nhập mã tại trang kích hoạt trước khi vào ứng dụng.
- Mỗi mã có khách hàng, gói, hạn dùng, trạng thái và giới hạn 1–10 thiết bị.
- Quản trị tại `https://ten-mien-cua-ban/?admin=access`.
- Có thể cấp, khóa/mở, gia hạn 30 ngày, giải phóng thiết bị, đổi mã, xóa mã, tìm kiếm và xuất CSV.
- Mã gốc chỉ hiện một lần. Máy chủ chỉ lưu SHA-256; phiên dùng cookie HttpOnly được ký HMAC.
- Mọi gói đều dùng được AI sau khi học viên tự thêm API key Gemini của mình (xem mục Khóa AI phía trên).
- Màn hình kích hoạt có bảng giá; đặt `VITE_SALES_URL` để nút mua mở checkout/Zalo/form bán hàng của bạn.

Xem hướng dẫn triển khai chi tiết tại [docs/access_management.md](docs/access_management.md).

## Kiểm tra chất lượng

```bash
npm test
npm run lint
npm run build
```

## Lưu ý bản quyền nội dung

Trước khi bán công khai, chủ sở hữu cần bảo đảm có quyền thương mại đối với toàn bộ dữ liệu, hình ảnh và nội dung giáo trình được phân phối trong ứng dụng.
