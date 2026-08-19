// File: src/components/progress/XacMinhGoNotice.jsx
// BÁO MỘT LẦN: vì sao một số chặng vừa quay về "chưa xác minh".
//
// Cùng họ với MasteryMigrationNotice, nhưng KHÔNG dùng lại nó: nội dung bên đó
// nói về một thay đổi khác ("trước đây đi hết bài là xong"). Dùng lại chữ của
// một lần thay đổi khác để giải thích lần này là nói sai — mà nói sai với người
// học chính là thứ cả đợt này sinh ra để dẹp. Cờ "đã báo" thì dùng chung một
// chỗ với các cờ khác (utils/tinCayXacMinh.js).
import { ShieldAlert, X } from 'lucide-react';

const XacMinhGoNotice = ({ soChang, onClose, onVerifyNow }) => (
  <div className="fixed inset-0 z-[126] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="xacminh-go-title">
    <section className="w-full max-w-lg bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000]">
      <div className="flex items-start gap-3 mb-4">
        <ShieldAlert className="text-amber-600 shrink-0" size={28} />
        <h3 id="xacminh-go-title" className="flex-1 text-xl font-black uppercase leading-tight text-slate-900 dark:text-slate-100">
          {soChang} chặng quay về “chưa xác minh”
        </h3>
        <button onClick={onClose} aria-label="Đóng" className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"><X size={22} /></button>
      </div>

      <p className="font-bold text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Chúng tôi phát hiện một lỗi trong bộ đề: ở bài đọc dài, bài nghe, bài thi cuối bậc và bài A0,
        đáp án đúng gần như luôn nằm ở <span className="font-black">ô đầu tiên</span>. Nghĩa là bấm ô đầu mỗi câu
        cũng qua được, không cần đọc hay nghe. Lỗi đã được sửa — thứ tự phương án nay được trộn.
      </p>

      <div className="mt-4 px-4 py-3 rounded-2xl border-[3px] border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30">
        <p className="font-black text-sm text-emerald-800 dark:text-emerald-300">Tiến độ của bạn giữ nguyên.</p>
        <p className="mt-1 font-bold text-sm text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed">
          Không chặng nào bị bỏ đánh dấu hoàn thành. Phần trăm lộ trình, XP, chuỗi ngày học và huy hiệu
          chuyên cần không đổi — bạn đã bỏ thời gian ngồi làm, và điều đó không phụ thuộc vào lỗi của chúng tôi.
        </p>
      </div>

      <div className="mt-3 px-4 py-3 rounded-2xl border-[3px] border-amber-500 bg-amber-50 dark:bg-amber-950/30">
        <p className="font-black text-sm text-amber-800 dark:text-amber-300">Riêng nhãn “đã xác minh” thì gỡ.</p>
        <p className="mt-1 font-bold text-sm text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
          Nhãn đó là chỗ app nói với người ngoài rằng bạn <span className="font-black">làm đúng</span>, và nó dùng để
          cấp chứng nhận. Điểm cũ của {soChang} chặng thuộc bốn phần trên kiếm được trên bộ đề còn lỗi,
          nên chúng tôi gỡ thay vì giữ một con số không chứng minh được. Lượt thi cuối bậc cũ vẫn nằm
          trong sổ, chỉ thôi được dùng để gắn nhãn bậc.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {onVerifyNow && (
          <button onClick={onVerifyNow} className="px-5 py-3 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] cursor-pointer">
            Xác minh lại ngay
          </button>
        )}
        <button onClick={onClose} className="px-5 py-3 rounded-xl border-3 border-slate-400 font-black text-slate-600 dark:text-slate-300 cursor-pointer">
          Để sau
        </button>
      </div>
    </section>
  </div>
);

export default XacMinhGoNotice;
