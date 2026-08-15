import { Bot } from 'lucide-react';

// NHÃN "GIỌNG MÁY ĐỌC" (việc 2.4).
//
// Nguyên tắc đã dựng suốt chuỗi dọn nội dung: thiếu dữ liệu thì ẨN hoặc BÁO,
// tuyệt đối không thay thế âm thầm. Toàn bộ phần luyện nghe hiện nay chạy bằng
// `speechSynthesis` của trình duyệt — giọng tổng hợp, khác accent thật ở trọng
// âm, nhịp và nối âm, và khác theo từng hệ điều hành. Người học luyện nghe bằng
// nó rồi gặp người nói thật sẽ hụt, mà không hiểu vì sao.
//
// Nhãn này KHÔNG chê giọng máy: nó vẫn hữu ích để nghe lại một từ, và sẽ được
// giữ làm phương án dự phòng kể cả sau khi có audio thật. Nó chỉ nói đúng thứ
// người học đang nghe là gì.
export default function MachineVoiceTag({ className = '' }) {
  return <span
    title="Giọng tổng hợp của trình duyệt, không phải người thật. Chất giọng thay đổi tuỳ máy và hệ điều hành."
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-[10px] font-black uppercase tracking-wide text-slate-500 dark:text-slate-400 align-middle ${className}`}
  >
    <Bot size={11} className="shrink-0" /> Giọng máy đọc
  </span>;
}
