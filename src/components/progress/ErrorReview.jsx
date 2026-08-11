// File: src/components/progress/ErrorReview.jsx
// "Học từ lỗi sai" — flips through due cards from utils/errorBank.js.
// Flow per card: think → reveal the answer → self-grade (đúng/sai).
import { useState } from 'react';
import { Brain, Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import { getDueErrors, resolveError } from '../../utils/errorBank';

const SKILL_LABELS = { grammar: '📖 Ngữ pháp', vocab: '🔤 Từ vựng', listening: '🎧 Nghe', writing: '✍️ Viết' };

const ErrorReview = ({ onClose }) => {
  const [cards] = useState(() => getDueErrors(20));
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [fixedCount, setFixedCount] = useState(0);

  const card = cards[idx];
  const done = !card;

  const grade = (correct) => {
    resolveError(card.id, correct);
    if (correct) setFixedCount((n) => n + 1);
    setRevealed(false);
    setIdx((n) => n + 1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-review-title"
      className="fixed inset-0 z-[140] bg-slate-900/70 backdrop-blur-sm flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-xl my-6 bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000]">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/40 border-4 border-slate-900 dark:border-slate-600 flex items-center justify-center shrink-0">
              <Brain size={24} className="text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h2 id="error-review-title" className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Học từ lỗi sai</h2>
              {!done && <p className="text-xs font-black uppercase tracking-widest text-rose-500 mt-1">Câu {idx + 1}/{cards.length}</p>}
            </div>
          </div>
          <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 shrink-0 rounded-xl border-3 border-slate-800 dark:border-slate-600 dark:text-white font-black cursor-pointer">×</button>
        </div>

        {done ? (
          <div className="text-center py-8">
            <p className="text-5xl mb-4">{cards.length === 0 ? '🌟' : '🎉'}</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {cards.length === 0 ? 'Không có lỗi nào cần ôn hôm nay!' : `Đã ôn xong ${cards.length} lỗi — sửa được ${fixedCount}!`}
            </h3>
            <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">
              {cards.length === 0 ? 'Lỗi mới khi làm bài sẽ tự xuất hiện ở đây sau 3 ngày.' : 'Các câu trả lời đúng sẽ quay lại sau 7 rồi 14 ngày để chốt trí nhớ.'}
            </p>
            <button onClick={onClose} className="mt-6 px-8 py-3 rounded-2xl bg-yellow-300 text-slate-900 border-3 border-slate-900 font-black shadow-[4px_4px_0_0_#1e293b] cursor-pointer">ĐÓNG</button>
          </div>
        ) : (
          <>
            <span className="text-[11px] font-black px-2.5 py-1 rounded-full border-2 border-slate-800 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {SKILL_LABELS[card.skill] || card.skill} · sai {card.times} lần
            </span>
            <div className="mt-4 p-5 rounded-2xl border-3 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
              <p className="font-black text-lg text-slate-900 dark:text-white leading-relaxed">{card.prompt}</p>
              {card.chosen && <p className="mt-3 text-sm font-bold text-rose-500">✗ Lần trước bạn trả lời: {card.chosen}</p>}
            </div>

            {revealed ? (
              <>
                <div className="mt-4 p-5 rounded-2xl border-3 border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30">
                  <p className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-400">Đáp án đúng</p>
                  <p className="mt-1 font-black text-xl text-emerald-800 dark:text-emerald-200">{card.answer}</p>
                </div>
                <p className="mt-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">Bạn đã nhớ đúng chưa?</p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button onClick={() => grade(false)} className="py-3.5 rounded-2xl bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-3 border-rose-400 font-black flex items-center justify-center gap-2 cursor-pointer">
                    <ThumbsDown size={18} /> CHƯA NHỚ
                  </button>
                  <button onClick={() => grade(true)} className="py-3.5 rounded-2xl bg-emerald-300 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 border-3 border-emerald-600 font-black flex items-center justify-center gap-2 cursor-pointer">
                    <ThumbsUp size={18} /> NHỚ RỒI
                  </button>
                </div>
              </>
            ) : (
              <button onClick={() => setRevealed(true)} className="mt-5 w-full py-4 rounded-2xl bg-yellow-300 text-slate-900 border-4 border-slate-900 font-black text-lg shadow-[5px_5px_0_0_#1e293b] hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2">
                <Eye size={20} /> XEM ĐÁP ÁN
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ErrorReview;
