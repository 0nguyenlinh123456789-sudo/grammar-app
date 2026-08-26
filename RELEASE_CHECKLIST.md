# RELEASE CHECKLIST — sau vòng "FINAL PRODUCTION READINESS AUDIT" (26/08)

Trạng thái mã nguồn: **CODE READY — OPS REQUIRED**. Không có việc code nào còn
treo. Mọi mục dưới đây là việc chỉ chủ dự án tự làm được (tài khoản, quyết
định kinh doanh, tài sản có bản quyền) — không phải lỗi phần mềm.

> ⚠️ **File này nằm trong Git và sẽ lên GitHub.** Không chép số tài khoản, ảnh
> QR, hay bất kỳ giá trị bí mật nào vào đây. File này chỉ ghi TÊN BIẾN và nơi
> đặt giá trị, không ghi giá trị.

---

## 1. Số tài khoản + mã QR chuyển khoản

Cơ chế đã có sẵn trong mã (`src/utils/banHang.js`,
`src/components/access/ChuyenKhoan.jsx`), đọc từ 4 biến môi trường —
**KHÔNG cần sửa code**:

| Biến | Bắt buộc? | Nội dung |
|---|---|---|
| `VITE_BANK_NAME` | Có | tên ngân hàng |
| `VITE_BANK_ACCOUNT` | Có | số tài khoản |
| `VITE_BANK_HOLDER` | Không | tên chủ tài khoản |
| `VITE_BANK_QR` | Không | đường dẫn ảnh QR, hoặc chuỗi `data:image/png;base64,…` |

Đặt ở: **Vercel Dashboard → Project → Settings → Environment Variables →
Production**, rồi redeploy. `.env` và `.env.*` đã nằm trong `.gitignore` (trừ
`.env.example`), nên các giá trị này không bao giờ vào Git.

### ⛔ ĐỌC KỸ TRƯỚC KHI ĐẶT — yêu cầu bảo mật của bạn CHƯA đạt được bằng cấu hình

Bạn yêu cầu: *"chỉ khi khách hàng mua gói mở web mới thấy QR"* và *"tuyệt đối
không chia sẻ lên GitHub, Vercel"*. Cần nói thẳng một sự thật kỹ thuật:

**Mọi biến có tiền tố `VITE_` đều được NHÚNG THẲNG vào file JavaScript công
khai lúc build.** Đây là quy tắc của Vite, không phải lỗ hổng mới của dự án.
Nghĩa là sau khi đặt `VITE_BANK_ACCOUNT`, bất kỳ ai mở trang web rồi bấm
DevTools đều đọc được số tài khoản — **kể cả người chưa mua gói, chưa bấm
chọn gói, chưa trả một đồng nào**.

Việc `ChuyenKhoan` chỉ hiện sau khi khách bấm chọn gói (`daChon`) chỉ giấu
được ở lớp GIAO DIỆN, không giấu được ở lớp DỮ LIỆU.

Ba lựa chọn, bạn phải chọn một:

| | Cách làm | Ai đọc được số TK | Có vào Git? | Cần sửa code? |
|---|---|---|---|---|
| **A** | Đặt `VITE_BANK_*` trên Vercel | bất kỳ ai xem trang | Không | Không |
| **B** | Bỏ hẳn khối chuyển khoản, chỉ gửi số TK qua kênh riêng (Zalo/email) sau khi khách nhắn | chỉ người đã liên hệ | Không | Không |
| **C** | Máy chủ chỉ trả thông tin ngân hàng cho phiên đã xác thực | chỉ khách đã có mã | Không | **Có** — thêm tính năng mới |

- **A** là cách nhanh nhất và là cách dự án đang dựng sẵn. Đánh đổi: số tài
  khoản ngân hàng bị lộ công khai. Cần cân nhắc rằng số tài khoản vốn dĩ phải
  đưa cho bất kỳ ai muốn trả tiền bạn — nó không cùng hạng bí mật với API
  key, nhưng lộ công khai vẫn mở đường cho lừa đảo mạo danh.
- **B** đạt đúng yêu cầu bảo mật của bạn mà không cần sửa một dòng code nào:
  chỉ cần **không** đặt `VITE_BANK_*`, và đặt kênh liên hệ ở mục 2. Khách bấm
  mua → thấy lời nhắn + kênh Zalo/email → bạn tự gửi số TK và QR riêng cho
  từng người. Chậm hơn nhưng kín.
- **C** đạt yêu cầu bảo mật ở mức cao nhất nhưng **nằm ngoài phạm vi đợt đóng
  băng này** (bạn đã yêu cầu không thêm feature). Nếu muốn làm, đây là việc
  của một đợt riêng sau khi phát hành.

**Chưa chọn xong mục này thì chưa mở bán được.** Đây là quyết định kinh
doanh, không phải lỗi kỹ thuật.

### Ảnh QR

Nếu chọn phương án **A** và muốn hiện QR:
- **Không** lưu ảnh vào `public/` — thư mục đó vào Git và lên GitHub.
- Đổi ảnh sang chuỗi Base64 rồi dán làm giá trị `VITE_BANK_QR` trên Vercel
  Dashboard (`[Convert]::ToBase64String([IO.File]::ReadAllBytes("duong-dan-anh.png"))`
  trong PowerShell). Ảnh vẫn nằm trong bundle công khai — cùng đánh đổi như
  số tài khoản ở trên.

Nếu chọn phương án **B**: bỏ qua hoàn toàn, gửi ảnh QR trực tiếp cho khách
qua Zalo.

Không đặt `VITE_BANK_QR` thì khối chuyển khoản vẫn chạy đủ bằng số tài khoản
gõ tay — QR chỉ là tiện lợi thêm.

---

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

## 4. Phương án lưu trữ audio VOA (~116.9 MB)

Con số đo ở vòng kiểm trước, **không đo lại trong phiên này**. Cần chọn: giữ
nguyên trong repo, hay chuyển sang lưu trữ đối tượng/CDN riêng để giảm rủi ro
vận hành và băng thông khi số học viên tăng.

---

## 5. Nội dung Oxford B2 — CẦN THU THẬP, KHÔNG ĐƯỢC BỊA

Nguồn tham khảo bạn cung cấp:
https://www.oxfordlearnersdictionaries.com/external/pdf/wordlists/oxford-3000-5000/The_Oxford_5000_by_CEFR_level.pdf

Đây là danh sách từ vựng **có bản quyền của Oxford University Press**. Dùng
để bạn tự đối chiếu/biên soạn thủ công, hoặc xin phép sử dụng. Không dùng làm
căn cứ để tự sinh nội dung bài học B2 mới — đúng luật "thiếu dữ liệu thì ẨN
hoặc BÁO, tuyệt đối không thay thế âm thầm" đã áp dụng xuyên suốt các vòng
kiểm trước.
