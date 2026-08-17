// File: src/components/home/PracticeCard.jsx
// MỘT hình dạng thẻ luyện tập cho trang chủ, và MỘT chỗ duy nhất định nghĩa nó.
//
// Vì sao đổi: trước đây trang chủ là 9 thẻ NGANG HẾT CHIỀU RỘNG xếp chồng, mỗi
// thẻ y hệt thẻ trên nó (viền 4px, bóng 6px, icon 56px, nút bên phải). Chín lần
// cùng một hình khối thì mắt không còn phân biệt được thẻ nào là thẻ nào —
// người dùng phải ĐỌC hết mới biết mình đang ở đâu, và chủ dự án gọi đúng tên
// nó: "chằn chịt". Nay xếp thành lưới theo NHÓM, mỗi nhóm có tiêu đề, nên đọc
// một lần là thấy được cấu trúc: bốn kỹ năng · thi cử · ôn lại.
//
// ⚠️ RÀNG BUỘC KHÔNG ĐƯỢC PHÁ KHI THẺ NHỎ LẠI: **mọi dòng nói rõ app KHÔNG làm
// được gì đều phải còn nguyên và thấy được mà không cần hover.** Cụ thể là
// "Không chấm phát âm", "Không cần API key", "Giọng người thật", và câu dài
// nhất — "trình duyệt chỉ ghi lại VĂN BẢN nó nghe được, không phải đánh giá
// phát âm". Thẻ hẹp hơn thì rất dễ cắt mấy câu đó cho gọn; cắt là phá đúng phần
// trung thực mà việc 3.5 dựng nên (và `tests/speaking_bank.test.js` quét).
// Nên thẻ này KHÔNG cắt chữ, không `line-clamp` phần mô tả — nó cao thấp không
// đều thì để nó không đều.
//
// Thuần trình bày: không giữ trạng thái, không tự gọi gì. Mọi `onClick` và mọi
// con số vẫn nằm ở WelcomePage — vừa để phần nối lộ trình (`launchMilestone`,
// `buildEvidence`, `completeMilestone`) ở nguyên chỗ các test đang canh, vừa để
// thẻ này không bao giờ là nơi một lời hứa mới lọt vào.

export default function PracticeCard({
  icon, nhan, tieuDe, moTa, nhanNut, onClick,
  mauChip = 'bg-slate-100 dark:bg-slate-800',
  mauChu = 'text-slate-600 dark:text-slate-300',
  mauNut = 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100',
  noiBat = false,
  tatNut = false,
}) {
  return (
    <div
      className={`h-full flex flex-col rounded-3xl border-4 p-5 transition-all shadow-[4px_4px_0_0_#1c293b] dark:shadow-[4px_4px_0_0_#020617] ${
        noiBat
          ? 'bg-white dark:bg-slate-900 border-slate-900 dark:border-slate-500 -translate-y-0.5 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617]'
          : 'bg-white dark:bg-slate-900 border-slate-800 dark:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className={`w-12 h-12 shrink-0 rounded-2xl border-3 border-slate-800 dark:border-slate-700 flex items-center justify-center ${mauChip}`}>
          {icon}
        </div>
        {/* Nhãn nằm trên CÙNG MỘT hàng với icon chứ không nhét cạnh tiêu đề:
            ở thẻ hẹp, nhãn cạnh tiêu đề đẩy tiêu đề xuống dòng giữa từ. */}
        {nhan && (
          <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase leading-tight text-right">
            {nhan}
          </span>
        )}
      </div>

      <h3 className={`mt-3 text-base font-black uppercase leading-tight ${mauChu}`}>{tieuDe}</h3>
      <p className="mt-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{moTa}</p>

      {/* `mt-auto` ghim nút xuống đáy: mô tả dài ngắn khác nhau mà hàng nút vẫn
          thẳng nhau, tức là lưới đọc được mà không phải cắt chữ cho bằng nhau. */}
      <button
        type="button"
        onClick={onClick}
        disabled={tatNut}
        className={`mt-4 w-full font-black text-sm px-4 py-2.5 rounded-2xl border-3 border-slate-800 dark:border-slate-700 transition-all ${
          tatNut
            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            : `${mauNut} shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] hover:translate-y-0.5 hover:shadow-none cursor-pointer`
        }`}
      >
        {nhanNut}
      </button>
    </div>
  );
}

// Tiêu đề nhóm — thứ làm nên khác biệt thật so với bản cũ. Chín thẻ giống nhau
// xếp dọc không có cấu trúc nào; ba nhóm có tên thì có.
export function PracticeGroup({ tieuDe, phuDe, children }) {
  return (
    <section className="mb-10">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-slate-100">{tieuDe}</h2>
        <span className="h-1 grow min-w-6 rounded-full bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
        {phuDe && <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{phuDe}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
        {children}
      </div>
    </section>
  );
}
