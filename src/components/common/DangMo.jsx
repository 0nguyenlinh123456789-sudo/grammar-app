// File: src/components/common/DangMo.jsx
// Thứ hiện ra trong lúc chunk của một hộp thoại đang tải.
//
// Vì sao có: mọi `Suspense` ở trang chủ trước đây dùng `fallback={null}`. Trên
// máy nhanh thì không ai thấy gì cả — nhưng mạng chậm thì bấm "NGHE ĐOẠN" xong
// **không có gì xảy ra** trong một hai giây, và người học đọc nó thành nút hỏng
// nên bấm lại. Đây là cùng một nguyên tắc đã áp cho nội dung: **thiếu thì BÁO,
// không im lặng** — chỉ là ở đây "thiếu" nghĩa là "chưa tải xong".
//
// Cố ý KHÔNG có nút đóng: nó sống đúng một khoảnh khắc rồi bị thay bằng hộp
// thoại thật (hộp thoại thật mới có nút đóng). Thêm nút đóng ở đây là mời người
// ta bấm vào thứ sắp biến mất.
export default function DangMo() {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
      role="status"
      aria-live="polite"
    >
      <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl px-6 py-5 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] flex items-center gap-3">
        <span className="w-5 h-5 rounded-full border-3 border-slate-800 dark:border-slate-500 border-t-transparent animate-spin" aria-hidden="true" />
        <p className="font-black text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wide">Đang mở…</p>
      </div>
    </div>
  );
}
