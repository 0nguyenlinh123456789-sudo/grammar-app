// File: src/components/progress/RoadmapGrowthNotice.jsx
// THÔNG BÁO MỘT LẦN: lộ trình vừa dài ra, nên tỉ lệ phần trăm của bạn tụt.
//
// Vì sao phải nói: thanh tiến độ là `số chặng xong / tổng số chặng`. Đợt này
// thêm chặng nghe theo đoạn, chặng đọc bài dài và buổi chép chính tả vào lộ
// trình, nên mẫu số tăng và tỉ lệ của mọi người đang học tụt xuống — trong khi
// họ không làm gì sai và cũng không mất chặng nào.
//
// Đổi con số dưới chân người học rồi im lặng là một kiểu thay thế âm thầm, đúng
// thứ luật của dự án cấm. Cờ "đã báo một lần" nằm ở src/utils/roadmapGrowth.js.
import { Route, X } from 'lucide-react';

const RoadmapGrowthNotice = ({ cu, moi, them, completedCount, onClose }) => (
  <div className="fixed inset-0 z-[126] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="roadmap-growth-title">
    <section className="w-full max-w-lg bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000]">
      <div className="flex items-start gap-3 mb-4">
        <Route className="text-cyan-600 shrink-0" size={28} />
        <h3 id="roadmap-growth-title" className="flex-1 text-xl font-black uppercase leading-tight text-slate-900 dark:text-slate-100">
          Lộ trình vừa dài ra {them} chặng
        </h3>
        <button onClick={onClose} aria-label="Đóng" className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"><X size={22} /></button>
      </div>

      <p className="font-bold text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Các bài <span className="font-black">nghe theo đoạn</span>, <span className="font-black">đọc bài dài</span> và
        <span className="font-black"> nghe chép chính tả</span> trước đây chỉ mở được từ nút ở trang chủ, nên đi theo
        lộ trình thì không bao giờ gặp. Nay chúng đã nằm trong lộ trình, ở các bậc B1 trở lên.
      </p>

      <div className="mt-4 px-4 py-3 rounded-2xl border-[3px] border-amber-500 bg-amber-50 dark:bg-amber-950/30">
        <p className="font-black text-sm text-amber-800 dark:text-amber-300">Vì thế phần trăm của bạn tụt — và đây là lý do.</p>
        <p className="mt-1 font-bold text-sm text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
          Tổng số chặng đổi từ <span className="font-black">{cu}</span> thành <span className="font-black">{moi}</span>,
          nên cùng {completedCount} chặng đã xong thì tỉ lệ nhỏ đi. Bạn <span className="font-black">không mất chặng nào</span>,
          không mất XP, không mất chuỗi ngày học. Chỉ có mẫu số dài ra.
        </p>
      </div>

      <p className="mt-4 font-bold text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Các bài nghe và đọc được sắp theo <span className="font-black">số từ đo được</span> — bài ngắn ở bậc thấp hơn.
        Đó không phải nhãn cấp độ của từng bài: những bài này không ai gắn bậc, nên app không gắn thay.
      </p>

      <button
        onClick={onClose}
        className="mt-6 w-full px-5 py-3 rounded-2xl bg-yellow-300 text-slate-900 font-black text-sm border-3 border-slate-800 shadow-[3px_3px_0_0_#1e293b] active:translate-y-0.5 active:shadow-none cursor-pointer"
      >
        ĐÃ HIỂU
      </button>
    </section>
  </div>
);

export default RoadmapGrowthNotice;
