# RELEASE CHECKLIST — sau vòng "FINAL PRODUCTION READINESS AUDIT" (26/08)

Trạng thái mã nguồn: **CODE READY — OPS REQUIRED**. Không có việc code nào còn
treo. Mọi mục dưới đây là việc chỉ chủ dự án tự làm được (tài khoản, quyết
định kinh doanh, tài sản có bản quyền) — không phải lỗi phần mềm.

> ⚠️ **File này nằm trong Git và sẽ lên GitHub.** Không chép số tài khoản, ảnh
> QR, hay bất kỳ giá trị bí mật nào vào đây. File này chỉ ghi TÊN BIẾN và nơi
> đặt giá trị, không ghi giá trị.

---

## 1. Số tài khoản + mã QR chuyển khoản — ĐÃ DỰNG XONG PHƯƠNG ÁN C

Chủ dự án chọn **phương án C ngày 27/08**: máy chủ giữ, client phải hỏi mới có.
Đã dựng xong, **không cần sửa code nữa** — chỉ còn đặt biến.

### Đặt bốn biến này trên Vercel

**Settings → Environment Variables → Production**, rồi **Redeploy**:

| Biến | Bắt buộc? | Nội dung |
|---|---|---|
| `BANK_NAME` | Có | tên ngân hàng |
| `BANK_ACCOUNT` | Có | số tài khoản |
| `BANK_HOLDER` | Không | tên chủ tài khoản |
| `BANK_QR` | Không | chuỗi `data:image/png;base64,…` |

⚠️ **BỐN BIẾN NÀY CỐ Ý KHÔNG CÓ TIỀN TỐ `VITE_` — đừng thêm vào.** Thêm `VITE_`
là hỏng đúng thứ vừa sửa: Vite nhúng thẳng mọi biến `VITE_*` vào JavaScript
công khai. Trên Vercel, **không tick ô "expose to browser"** nếu có.

Ảnh QR: **đừng để file vào `public/`** (thư mục đó vào Git và ai cũng tải
được). Đổi sang Base64 rồi dán làm giá trị `BANK_QR`:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("duong-dan-qr.png"))
```

Rồi ghép thành `data:image/png;base64,<chuỗi vừa ra>`. Không đặt cũng được —
khối chuyển khoản vẫn chạy đủ bằng số tài khoản gõ tay.

### Phương án C đạt được gì, và KHÔNG đạt được gì

**Đạt:** số tài khoản không còn trong bundle JS công khai, không vào Git,
không bị máy quét gom hàng loạt từ tệp tĩnh, và lệnh hỏi có giới hạn tốc độ
(30 lần / 10 phút mỗi IP, thùng đếm riêng).

**KHÔNG đạt — nói thẳng để không tưởng nhầm:** đây **không phải bí mật thật
sự**. Ai đọc mã client cũng gọi được một lệnh POST tới `/api/access` để lấy.
Muốn kín tuyệt đối thì chỉ có cách không đưa lên web (phương án B: gửi tay qua
Zalo sau khi khách nhắn).

### Một điều chỉnh so với chữ "chỉ cấp cho phiên đã xác thực"

Hiểu theo đúng chữ thì yêu cầu đó **tự mâu thuẫn**: khách sắp mua **chưa có mã
truy cập** — mã chính là thứ họ đang trả tiền để lấy. Đòi phiên đăng nhập ở
đây nghĩa là chỉ khách CŨ xem được số tài khoản, khách MỚI không bao giờ trả
tiền được, tức không bán được cho ai.

Nên cửa đặt đúng chỗ chủ dự án mô tả lúc đầu — *"khách bấm mua gói thì mới
thấy"*: phải qua bước chọn gói và có **mã đơn hợp lệ** (`BE-XXXXXX`) thì máy
chủ mới trả. Có phép kiểm ghim riêng điều này lại, để về sau không ai vô tình
thêm `requireLearner` vào rồi khoá mất đường bán hàng.

## 2. Kênh giao mã truy cập — CÒN THIẾU, và nó đang chặn cả mục 1

Đặt ít nhất MỘT trong bốn biến sau trên Vercel (xem `KENH` trong
`src/utils/banHang.js`):

| Biến | Kênh |
|---|---|
| `VITE_SALES_ZALO` | số điện thoại Zalo hoặc link zalo.me |
| `VITE_SALES_EMAIL` | email nhận yêu cầu mua |
| `VITE_SALES_PHONE` | số điện thoại |
| `VITE_SALES_URL` | link trang đặt mua riêng |

**⚠️ Phát hiện khi rà dây chuyền hiển thị:** khối chuyển khoản chỉ hiện khi
**CẢ HAI** đúng — khách đã bấm chọn gói **VÀ** đã có ít nhất một kênh giao mã
(`kenh.length > 0`, `AccessGate.jsx:310`). Đặt 4 biến ngân hàng mà quên mục 2
thì khách bấm mua vẫn **không thấy** khối chuyển khoản, chỉ thấy dòng "Chưa
có kênh đặt mua nào được cấu hình". Đây là thiết kế có chủ đích (chuyển khoản
mà không có đường nhận lại mã truy cập thì vô nghĩa), không phải lỗi — nhưng
nghĩa là **mục 1 và mục 2 phải làm cùng lúc**.

---

## 3. Xác nhận gói hosting phù hợp mục đích thương mại

Tự xác nhận gói Vercel đang dùng cho phép bán hàng trả phí trước khi thu tiền
thật. Ghi chú từ vòng kiểm trước nói Vercel Hobby hạn chế việc này — **chưa
được xác minh lại trong phiên này**, cần bạn tự kiểm tra điều khoản hiện hành.

---

## 4. Phương án lưu trữ audio — ĐÃ ĐO LẠI, RỦI RO NHỎ HƠN NHIỀU

**Con số cũ "~116,9 MB" trong bản đầu là SAI ở phạm vi đếm.** Đo lại ngày
27/08 trên chính `public/`, loại hai thư mục IELTS (đã gitignore, không đi
theo bản dựng): **239 tệp thu người thật · 6,2 MB tổng cộng**.

6,2 MB không phải là một bài toán vận hành — không cần CDN riêng, không cần
lưu trữ đối tượng. Giữ nguyên trong repo là đúng.

⚠️ Nếu về sau bỏ hai thư mục IELTS khỏi `.gitignore` thì con số này phải đo
lại từ đầu, chứ không phải cộng thêm.

---

## 5. Nội dung Oxford B2 — ĐÃ ĐÓNG, KHÔNG CÒN LÀ VIỆC OPS

Nguồn tham khảo bạn cung cấp:
https://www.oxfordlearnersdictionaries.com/external/pdf/wordlists/oxford-3000-5000/The_Oxford_5000_by_CEFR_level.pdf

Đây là danh sách từ vựng **có bản quyền của Oxford University Press**.

**Mục này ban đầu ghi "nếu tôi mua/xin quyền". Không cần nữa.** Khoảng trống
được đóng bằng nội dung SOẠN MỚI, không phải bằng giấy phép: danh sách OUP chỉ
đóng vai bảng đối chiếu ngoài repo, còn mọi nghĩa tiếng Việt, câu ví dụ và bài
đọc đi vào web đều viết tay.

Trạng thái ngày 27/08 — xem `BAO_CAO_PHU_TU_B2.md`: trong 700 từ dải B2,
**611 từ có mục từ riêng**, **86 từ được dạy trong unit giáo trình Oxford**
(cơ chế khác, cố ý không soạn lại thành mục từ), **3 từ bỏ có chủ ý**
(`gay`, `punk`, `sexy`). Tức **697/700 đều được dạy**.

Đã soạn 233 mục từ qua ba chặng B2 mới, kèm ba bài đọc và 15 câu hỏi đọc hiểu
mức văn bản. Danh sách Oxford **không** được chép vào repo.
