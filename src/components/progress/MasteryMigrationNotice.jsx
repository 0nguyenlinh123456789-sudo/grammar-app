// File: src/components/progress/MasteryMigrationNotice.jsx
// #1b — THÔNG BÁO MỘT LẦN cho người đã học từ bản cũ.
//
// Bản trước hạng mục #1 đánh dấu "hoàn thành" chỉ vì người học đi hết bài, không
// đo đúng sai. Bản này đo. Hai hệ quả phải nói thẳng chứ không để người dùng tự
// phát hiện:
//   1) Tiến độ cũ KHÔNG bị hạ — % lộ trình, XP, chuỗi ngày, huy hiệu giữ nguyên.
//   2) Chứng nhận thì ĐỔI ĐIỀU KIỆN: nay cần các chặng đã xác minh. Ai đang có
//      chứng nhận mở sẵn sẽ thấy nó khoá lại cho tới khi xác minh xong — nói
//      trước ở đây, không thì đúng là trông y hệt một cái lỗi.
// Cờ "đã báo một lần" nằm ở src/utils/masteryMigration.js.
import { ShieldCheck, X } from 'lucide-react';

const MasteryMigrationNotice = ({ unverifiedCount, completedCount, totalMilestonesCount, onClose, onVerifyNow }) => (
  <div className="fixed inset-0 z-[125] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="mastery-migration-title">
    <section className="w-full max-w-lg bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000]">
      <div className="flex items-start gap-3 mb-4">
        <ShieldCheck className="text-emerald-600 shrink-0" size={28} />
        <h3 id="mastery-migration-title" className="flex-1 text-xl font-black uppercase leading-tight text-slate-900 dark:text-slate-100">
          Có thay đổi về cách đánh dấu hoàn thành
        </h3>
        <button onClick={onClose} aria-label="Đóng" className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"><X size={22} /></button>
      </div>

      <p className="font-bold text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Trước đây một chặng được tính là hoàn thành khi bạn đi hết bài, dù trả lời đúng hay sai.
        Từ nay chặng cần đạt <span className="font-black">≥80%</span> mới được đánh dấu.
      </p>

      <div className="mt-4 px-4 py-3 rounded-2xl border-[3px] border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30">
        <p className="font-black text-sm text-emerald-800 dark:text-emerald-300">Bạn không mất gì cả.</p>
        <p className="mt-1 font-bold text-sm text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed">
          Cả {completedCount}/{totalMilestonesCount} chặng bạn đã hoàn thành vẫn được giữ nguyên. Phần trăm lộ trình,
          XP, chuỗi ngày học và huy hiệu chuyên cần không đổi, không chặng nào bị hạ xuống.
          Trong số đó có {unverifiedCount} chặng học từ bản cũ, nay ghi thêm nhãn “chưa xác minh”.
        </p>
      </div>

      <div className="mt-3 px-4 py-3 rounded-2xl border-[3px] border-amber-500 bg-amber-50 dark:bg-amber-950/30">
        <p className="font-black text-sm text-amber-800 dark:text-amber-300">Riêng chứng nhận thì đổi điều kiện.</p>
        <p className="mt-1 font-bold text-sm text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
          Chứng nhận nay cấp theo số chặng <span className="font-black">đã xác minh</span>, vì đó là chỗ duy nhất
          app nói với người ngoài rằng bạn làm được. Nếu bạn đang mở được chứng nhận, nó sẽ khoá lại
          cho tới khi xác minh xong — đây là thay đổi có chủ ý, không phải lỗi.
        </p>
      </div>

      <p className="mt-4 font-bold text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Mỗi chặng chưa xác minh có nút <span className="font-black">“Xác minh nhanh (5 câu)”</span> ngay trên lộ trình.
        Đúng 4/5 là xong. Sai cũng không mất gì, làm lại bao nhiêu lần cũng được.
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={onVerifyNow}
          className="flex-1 min-w-[160px] px-5 py-3 rounded-2xl bg-yellow-300 text-slate-900 font-black text-sm border-3 border-slate-800 shadow-[3px_3px_0_0_#1e293b] active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          XÁC MINH CHẶNG ĐẦU TIÊN
        </button>
        <button
          onClick={onClose}
          className="flex-1 min-w-[120px] px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-black text-sm border-3 border-slate-800 dark:border-slate-600 cursor-pointer"
        >
          ĐỂ SAU
        </button>
      </div>
    </section>
  </div>
);

export default MasteryMigrationNotice;
