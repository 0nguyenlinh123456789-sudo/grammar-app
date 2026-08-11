# Cẩm nang tìm lỗi Bunny English (cho chủ web)

Web chia 3 tầng rõ ràng. Khi hỏng, xác định lỗi thuộc tầng nào trước, rồi mở đúng chỗ.

## Bản đồ 3 tầng

| Tầng | Nằm ở đâu | Chạy ở đâu | Hỏng thì thấy gì |
| --- | --- | --- | --- |
| **Frontend** (giao diện, bài học, games) | `src/` — trang trong `src/pages/`, khung sườn `src/layouts/MainLayout.jsx`, logic chung `src/utils/` | Trình duyệt của người học | Trang trắng, nút không bấm được, giao diện vỡ |
| **Backend** (API) | `api/` — `access.js` (mã truy cập), `access-admin.js` (quản trị), `ai.js` (chuyển tiếp Gemini), `progress.js` (đồng bộ tiến độ). Logic dùng chung: `src/server/accessCore.js` | Vercel Functions (máy chủ) | Không kích hoạt được mã, không đồng bộ, AI báo lỗi truy cập |
| **Database** | Upstash Redis (kết nối qua biến môi trường `UPSTASH_REDIS_REST_URL/TOKEN` trên Vercel) | Đám mây Upstash | Mã truy cập "không tồn tại", tiến độ không lưu giữa các máy |

Dữ liệu học hằng ngày (XP, chuỗi, từ ôn tập) lưu **ngay trên trình duyệt** (localStorage) — mất mạng vẫn học được; backend chỉ sao lưu định kỳ theo mã truy cập.

## Khi web hỏng — làm theo thứ tự

1. **Trang trắng / báo "Ối! Thỏ vấp phải một lỗi"** → đó là màn hình ErrorBoundary (`src/components/common/ErrorBoundary.jsx`). Mở "Chi tiết kỹ thuật" → bấm **Sao chép báo cáo lỗi** → gửi nguyên văn cho người sửa (hoặc dán cho Claude). Báo cáo có sẵn URL, trình duyệt, message và stack.
2. **Giao diện vỡ/lệch** → chụp màn hình kèm cỡ thiết bị. Lỗi loại này nằm trong `src/pages/*` hoặc `src/layouts/MainLayout.jsx`.
3. **Không kích hoạt được mã / không đồng bộ** → mở Vercel Dashboard → project → **Logs** → lọc theo `/api/access` hoặc `/api/progress`. Response lỗi của API luôn có dạng `{ error: { code, message } }` — đọc `code` là biết nguyên nhân.
4. **Mã truy cập lạ (khách kêu mất quyền)** → vào `https://<domain>/?admin=access` (Owner Console) kiểm tra trạng thái mã, thiết bị, hạn dùng.
5. **AI không chạy** → 90% là API key: mở "KHÓA AI (API KEY)" trong sidebar → bấm **KIỂM TRA KEY**. Key là của từng người học, lưu trong trình duyệt họ, máy chủ không giữ.

## Lệnh kiểm tra tại chỗ (chạy trong thư mục dự án)

```bash
npm run dev       # chạy thử local (mục IELTS Nền Tảng chỉ hiện ở đây)
npm run lint      # bắt lỗi cú pháp/quy tắc code
npm test          # 24 bài test cho access, placement, progress, daily goal
npm run build     # dựng bản production — lỗi build là lỗi chặn deploy
```

## Deploy

- Push lên nhánh `main` của GitHub → **Vercel tự build và deploy** (không cần thao tác thêm).
- Kiểm tra deploy thành công: Vercel Dashboard → Deployments, hoặc
  `curl -s https://api.github.com/repos/0nguyenlinh123456789-sudo/grammar-app/commits/<sha>/status`.
- Sau khi deploy, người dùng cần tải lại trang 1 lần (service worker `public/sw.js` đổi tên cache mỗi khi shell thay đổi lớn — nếu sửa `index.html`/logo, tăng số version trong `CACHE_NAME`).

## Các file "một tính năng — một chỗ" đáng nhớ

- Chuỗi ngày + đóng băng chuỗi: `src/App.jsx` (hiệu ứng kiểm tra chuỗi) + `src/utils/streakFreeze.js`
- Ôn tập SRS: `src/utils/srs.js` (thêm từ mới: `addWord`)
- Sao lưu/đồng bộ: `src/utils/backup.js` (danh sách key được lưu: `LEARNING_STORAGE_KEYS` — thêm tính năng mới có lưu localStorage thì **phải thêm key vào đây**)
- Mục chỉ chạy local (IELTS Nền Tảng): `src/utils/localOnly.js`
- Chính sách hiển thị cho khách: `src/components/common/PolicyDialog.jsx`
- Font chữ tự host: `public/fonts/` + `src/fonts.css`
