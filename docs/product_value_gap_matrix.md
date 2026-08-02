# Ma trận khoảng trống giá trị sản phẩm

Mục tiêu của ma trận này là chuyển Grammar Pro từ một kho bài học nhiều chức năng thành sản phẩm có kết quả đo được, có lý do mua Premium và có thể vận hành như một business. Mức độ ưu tiên:

**Đã triển khai trong các vòng gần đây:** placement test 12 câu, hồ sơ kỹ năng, đề xuất bài tiếp theo, báo cáo tiến bộ theo kỹ năng, chứng nhận in/lưu PDF khi hoàn thành lộ trình, tìm kiếm toàn khóa học và đồng bộ tiến độ server-side theo mã truy cập.

- **P0**: nên làm trước khi bán giá cao.
- **P1**: tạo khác biệt và tăng tỷ lệ gia hạn.
- **P2**: tối ưu sau khi đã có người dùng trả tiền.

| Ưu tiên | Khoảng trống hiện tại | Bằng chứng trong sản phẩm | Tác động đến giá trị cảm nhận | Nâng cấp nên làm | Độ khó |
| --- | --- | --- | --- | --- | --- |
| P0 | Chưa có bài kiểm tra đầu vào và đầu ra | Người học chọn lộ trình thủ công; tiến độ chủ yếu là XP/chặng | Khó chứng minh “học xong đạt gì”, nên khó bán gói cao | Placement test 15–20 phút, chấm theo CEFR/VSTEP/IELTS; test lại mỗi 30 ngày và hiển thị điểm tăng trưởng | Cao |
| P0 | Lộ trình chưa thực sự cá nhân hóa | `roadmapData` là một lộ trình chung; daily goal chỉ là số chặng | Hai người khác nhau nhận cùng kế hoạch, giảm cảm giác gia sư riêng | Skill profile (grammar/vocab/listening/writing), đề xuất bài tiếp theo theo lỗi và lịch rảnh | Cao |
| P0 | Tiến độ học vẫn phụ thuộc localStorage | XP, streak, SRS và lịch sử hoạt động được lưu cục bộ trong `App.jsx` và các utility | Đổi máy/mất trình duyệt làm mất trải nghiệm; khó hỗ trợ khách hàng | Đồng bộ tiến độ server-side theo mã truy cập, backup tự động, merge xung đột giữa thiết bị | Cao |
| P0 | Chưa có thanh toán và luồng bán hàng | Có cấp mã thủ công nhưng chưa có checkout, hóa đơn, webhook hay gia hạn tự động | Người bán vẫn phải xử lý tay; khó mở rộng và đo doanh thu | Landing page, bảng giá, QR/chuyển khoản hoặc cổng thanh toán, webhook tạo mã và email giao mã | Cao |
| P0 | Nội dung tĩnh có thể bị tải xuống dù đã khóa giao diện | Chính tài liệu access đã ghi bundle/dữ liệu tĩnh vẫn được CDN gửi tới trình duyệt | Mã truy cập kiểm soát quyền dùng nhưng chưa bảo vệ tuyệt đối nội dung độc quyền | Di chuyển nội dung Premium nhạy cảm sang API xác thực hoặc pre-signed lesson payload; giữ phần giới thiệu tĩnh | Rất cao |
| P1 | AI chưa tạo hồ sơ lỗi dài hạn | AI hiện chủ yếu trả nhận xét cho từng bài viết/ảnh; chưa lưu lỗi theo kỹ năng | AI trông giống tiện ích gọi một lần, khó biện minh phí Premium | Error bank: nhóm lỗi theo chủ điểm, nhắc lại sau 3/7/14 ngày, đo tỷ lệ lỗi giảm | Cao |
| P1 | Chưa có dashboard kết quả cho phụ huynh/giáo viên | Dashboard hiện thiên về XP, streak, biểu đồ 7 ngày và mã truy cập | Người mua không thấy bằng chứng ROI hoặc tiến bộ học thuật | Báo cáo tuần: thời gian học, kỹ năng, lỗi phổ biến, điểm trước/sau, xuất PDF/link chia sẻ | Trung bình |
| P1 | Chưa có chứng chỉ hoặc mốc hoàn thành đáng tin | Có huy hiệu, thú cưng và milestone nhưng không có chứng nhận | Gamification vui nhưng giá trị hồ sơ thấp | Certificate có mã xác minh công khai, tiêu chí rõ, ngày cấp và kỹ năng đạt được | Trung bình |
| P1 | Chưa có cơ chế giữ chân ngoài streak | Streak có thể tăng khi hoàn thành chặng; chưa có lịch nhắc, recovery hay cohort | Người dùng dễ bỏ sau tuần đầu | Lịch học tuần, nhắc email/web push, “streak freeze”, nhiệm vụ cuối tuần, chiến dịch 21 ngày | Trung bình |
| P1 | Chưa có cộng đồng hoặc tương tác người thật | Các mode học đều solo; không có lớp, nhóm, thử thách bạn bè | Khó tạo network effect và lý do gia hạn | Study rooms, bảng xếp hạng riêng tư theo nhóm, thử thách lớp/đội, giáo viên nhận xét | Cao |
| P1 | Phân tầng gói mới chỉ chặn AI | Standard/Premium/Lifetime hiện khác biệt chủ yếu ở AI | Khó tạo thang giá rõ ràng; Standard có thể đủ dùng với phần lớn nội dung | Entitlement server-side cho mock test, báo cáo, certificate, AI quota, nội dung nâng cao; hiển thị giá trị từng gói | Trung bình |
| P1 | Quản trị mã chưa có audit và chăm sóc khách hàng | Admin có cấp/khóa/đổi/xóa, nhưng chưa có lịch sử thao tác, ghi chú hỗ trợ hay hoàn tiền | Khi nhiều khách, khó truy vết lỗi và dễ xử lý nhầm | Audit log bất biến, tìm theo email/đơn hàng, ghi chú CSKH, bulk import/export, cảnh báo mã sắp hết hạn | Trung bình |
| P2 | Khám phá nội dung còn thiên về menu | MainLayout có nhiều nhóm Grammar/Vocab/Oxford/IELTS/Games | Người mới dễ bị quá tải, chưa thấy “việc cần làm ngay” | Search toàn khóa học, command palette, bộ lọc theo mục tiêu, nút “Học 15 phút hôm nay” | Trung bình |
| P2 | Chưa có offline/PWA hoàn chỉnh | Dữ liệu học lớn, chưa thấy service worker/cache strategy trong app hiện tại | Học trên điện thoại và mạng yếu chưa đủ tin cậy | Installable PWA, cache lesson shell, queue kết quả offline rồi đồng bộ | Trung bình |
| P2 | Độ tin cậy nội dung chưa được chứng minh | Có nhiều data lớn nhưng chưa có content QA dashboard | Một lỗi đáp án/giải thích làm giảm niềm tin toàn sản phẩm | Schema validation, golden tests cho đáp án, báo lỗi nội dung từ người học, versioning dữ liệu | Trung bình |
| P2 | Chưa có đo lường funnel sản phẩm | Có hoạt động học cục bộ và dashboard mã, chưa có event funnel ẩn danh | Không biết người dùng rơi ở kích hoạt, bài đầu, AI hay gia hạn | Event analytics tối thiểu: landing → activate → first lesson → day 7 → renewal; tôn trọng consent | Trung bình |
| P2 | Thiếu lớp pháp lý và niềm tin khi bán | README mới có lưu ý bản quyền; chưa thấy privacy/terms/refund trong UI | Người mua trả tiền cao cần biết dữ liệu, quyền truy cập và hoàn tiền | Privacy policy, terms, refund, consent AI, trang hỗ trợ và thông tin người bán | Thấp |

## Thứ tự nâng cấp đề xuất

### Gói 1 — Bán được và chứng minh giá trị

1. Placement test + hồ sơ năng lực.
2. Đồng bộ tiến độ server-side.
3. Landing/pricing/checkout tạo mã tự động.
4. Entitlement Premium và quota AI.
5. Báo cáo tiến bộ tuần.

### Gói 2 — Tăng giá bán và gia hạn

1. Error bank + lộ trình thích ứng.
2. Certificate xác minh được.
3. Nhắc lịch, recovery và chiến dịch 21 ngày.
4. Audit log và chăm sóc khách hàng.

### Gói 3 — Tạo lợi thế dài hạn

1. Nội dung Premium qua API xác thực.
2. Cộng đồng/lớp học.
3. Offline/PWA và đồng bộ xung đột.
4. QA nội dung và analytics funnel.

## Tiêu chí “đủ giá trị để tăng giá”

Không nên chỉ tăng số lượng mode học. Một bản nâng cấp đủ mạnh để tăng giá nên trả lời được bốn câu hỏi:

1. Người học đang ở đâu và mục tiêu cụ thể là gì?
2. Hôm nay cần học bài nào, vì sao bài đó phù hợp?
3. Sau 30 ngày kỹ năng nào đã tiến bộ bằng số liệu nào?
4. Người mua có thể tự thanh toán, nhận quyền, gia hạn và được hỗ trợ ra sao?
