# Chuyển nhà sang Cloudflare Pages — đường đã dọn, chưa đi

## Vì sao phải chuyển

Gói **Vercel Hobby cấm dùng cho mục đích thương mại**. Ngay khi web bắt đầu thu tiền
bán mã truy cập, việc chạy trên Hobby là vi phạm điều khoản — mã tốt tới đâu cũng
không cứu được, vì đây không phải lỗi kỹ thuật.

Hai đường ra, và đây là quyết định của **chủ dự án**, không phải của người viết mã:

| | Vercel Pro | Cloudflare Pages |
|---|---|---|
| Chi phí | ~20 USD/tháng | 0đ ở mức miễn phí |
| Cho phép thương mại | có | có |
| Việc phải làm | không có — chỉ nâng gói | chuyển nhà, xem dưới |
| Rủi ro | gần như không | phải kiểm lại toàn bộ lớp xác thực trên nền mới |

Nếu 20 USD/tháng chấp nhận được thì **nâng gói Vercel là đường an toàn hơn nhiều**:
không đụng vào mã, không có gì để hỏng. Cloudflare chỉ đáng chọn khi ràng buộc
"không tốn phí" là ràng buộc cứng.

## Trạng thái hiện tại

Đường đã dọn xong về mặt mã:

- Thân của cả bốn tuyến API nằm ở `src/server/routes/` và **dùng chung** cho cả hai
  nơi chạy. Không có bản thứ hai để lệch.
- `api/*.js` là vỏ bọc Vercel (Node), `functions/api/*.js` là vỏ bọc Cloudflare (Web).
  Mỗi vỏ bọc dài đúng vài dòng.
- `src/server/accessCore.js` đọc header và thân yêu cầu qua `layHeader`/`layBody`,
  chạy được ở cả hai hình dạng.
- `tests/cloudflare_tuyen.test.js` chạy trọn hành trình đăng nhập → cấp mã → kích
  hoạt → đồng bộ tiến độ bằng `Request`/`Response` **thật** của nền Web.

**Bản live vẫn ở Vercel.** Chưa có gì bị chuyển.

## Thứ bộ kiểm ĐÃ chứng minh và thứ nó KHÔNG chứng minh

Đã chứng minh: thân tuyến chạy đúng dưới hình dạng Web — đọc được cookie qua
`Headers`, đọc được thân kiểu `ReadableStream`, đặt được `Set-Cookie`, và báo đúng
"chưa cấu hình" khi thiếu khoá ký thay vì giả dạng "hết phiên".

**Chưa chứng minh, và chỉ một bản deploy thật mới trả lời được:**

- định tuyến của Pages có đưa `/api/*` vào `functions/` đúng như mong đợi không;
- `nodejs_compat` có phủ đủ phần `node:crypto` mà lõi dùng không;
- biến môi trường có tới được hàm không;
- giới hạn CPU của Workers có đủ cho một lượt gọi Gemini 25 giây không.

Đừng đọc màu xanh của bộ kiểm thành "đã chuyển nhà xong".

## Các bước nếu quyết định chuyển

1. Tạo project Cloudflare Pages, nối vào kho GitHub này.
   - Build command: `npm run build` · Output directory: `dist`
2. Đặt **bí mật** ở Settings → Environment variables (dạng Secret, không phải Plain):
   `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ACCESS_SESSION_SECRET`,
   `ACCESS_ADMIN_SECRET`.
   Upstash dùng REST qua `fetch` nên chạy nguyên vẹn, không phải đổi gì.
3. Đặt các biến `VITE_*` (kênh bán, ngân hàng, giá). Chúng **nhúng lúc dựng** —
   đổi xong phải deploy lại mới ăn.
4. Deploy lên URL xem thử, rồi chạy bộ rà **trỏ vào URL đó**, không phải vào bản
   dựng ở máy: bộ rà chạy trên máy sẽ xanh kể cả khi bản Cloudflare hỏng hoàn toàn.
5. Đi lại bằng tay đúng hành trình của khách: nhập mã → kích hoạt → học một chặng →
   mở app trên máy thứ hai → kiểm tiến độ có đồng bộ.
6. Chỉ khi cả 5 bước trên xanh mới trỏ tên miền sang, và **giữ Vercel thêm ít ngày**
   để còn đường lùi.
7. Đặt `NOI_DAT_WEB=cloudflare` để `npm run kiem:banduoc` biết mục này đã xong.

## Nếu chọn Vercel Pro thay vì chuyển

Không cần làm gì với mã. Nâng gói, rồi đặt `NOI_DAT_WEB=vercel-pro`.
Toàn bộ phần Cloudflare ở trên vẫn nằm đó và không gây hại — nó chỉ là đường lùi.
