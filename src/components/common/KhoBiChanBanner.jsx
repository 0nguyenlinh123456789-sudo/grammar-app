// File: src/components/common/KhoBiChanBanner.jsx
//
// BĂNG BÁO: TRÌNH DUYỆT ĐANG CHẶN LƯU, NÊN TIẾN ĐỘ SẼ KHÔNG ĐƯỢC GIỮ.
//
// ══ VÌ SAO BỌC try/catch THÔI LÀ CHƯA ĐỦ ══
// Đợt này bọc 30 chỗ chạm `localStorage` trong `App.jsx` để app không còn trắng
// màn hình (đo được: `npm run ra:chankho` 2/8 trước khi vá). Nhưng nếu chỉ bọc
// rồi im, kết quả là app CHẠY BÌNH THƯỜNG trong khi không ghi được gì: người
// học ngồi làm một tiếng, đóng máy, mở lại — mất sạch. Đổi một màn hình hỏng
// ngay lấy một sự phản bội trễ, và cái sau tệ hơn.
//
// Nên đây là vế thứ hai bắt buộc của bản vá, không phải phần trang trí. Đúng
// luật của dự án: "thiếu dữ liệu thì ẨN hoặc BÁO, không im lặng".
//
// ══ NÓI GÌ, VÀ KHÔNG NÓI GÌ ══
// Nói ĐÚNG hai điều người học cần: chuyện gì đang xảy ra, và làm gì để hết. Chỉ
// hướng dẫn ở mức "tắt chế độ riêng tư / cho phép lưu dữ liệu trang" — máy
// KHÔNG biết chắc trình duyệt nào đang chặn vì lý do gì, nên không bịa ra một
// đường dẫn cài đặt cụ thể có thể sai.
import { AlertTriangle } from 'lucide-react';
import { khoHong } from '../../utils/kho';

export default function KhoBiChanBanner() {
  if (!khoHong()) return null;
  return (
    <div
      role="alert"
      className="mx-auto max-w-5xl mt-3 mb-1 px-4 py-3 rounded-2xl border-3 border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 flex items-start gap-3"
    >
      <AlertTriangle size={20} className="shrink-0 mt-0.5" />
      <div>
        <p className="font-black text-sm">Trình duyệt đang chặn lưu dữ liệu — tiến độ học sẽ KHÔNG được lưu.</p>
        <p className="text-xs font-bold mt-1 leading-snug">
          Bạn vẫn học và làm bài bình thường được, nhưng khi đóng trang là mất hết: điểm, chuỗi ngày,
          sổ tay từ và mọi bài đã xong. Thường là do <strong>chế độ duyệt web riêng tư</strong> hoặc
          cài đặt <strong>chặn cookie / dữ liệu trang</strong>. Hãy mở web ở cửa sổ thường và cho phép
          trang này lưu dữ liệu, rồi tải lại.
        </p>
      </div>
    </div>
  );
}
