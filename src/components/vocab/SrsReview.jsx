// File: src/components/vocab/SrsReview.jsx
// Spaced-repetition review session (modal). Shows due cards one at a time as a
// flashcard; the learner self-rates "Nhớ" (remembered) or "Quên" (forgot),
// which reschedules the card via the Leitner store.
import { useState, useMemo } from 'react';
import { Volume2, X, RotateCcw, Brain, PartyPopper } from 'lucide-react';
import { getDueCards, recordReview } from '../../utils/srs';
import { playCorrect, playWrong, playComplete } from '../../utils/sound';

const SrsReview = ({ onClose, playAudio }) => {
  const initialCards = useMemo(() => getDueCards(20), []);
  const [cards] = useState(initialCards);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [remembered, setRemembered] = useState(0);

  const cur = cards[idx];
  const finished = idx >= cards.length;

  const rate = (ok) => {
    recordReview(cur, ok);
    if (ok) { setRemembered((r) => r + 1); playCorrect(); } else { playWrong(); }
    if (idx + 1 >= cards.length) playComplete();
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 dark:bg-black/85 backdrop-blur-sm z-[140] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[10px_10px_0_0_#1e293b] dark:shadow-[10px_10px_0_0_#000] relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-xl border-3 border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-rose-50 cursor-pointer">
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-5">
          <Brain size={26} className="text-violet-600" />
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Ôn Tập Ngắt Quãng</h3>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-5xl mb-4">🎉</p>
            <p className="font-black text-xl text-slate-700 dark:text-slate-200">Tuyệt vời! Không có từ nào cần ôn hôm nay.</p>
            <p className="font-bold text-slate-500 dark:text-slate-400 mt-2">Hãy học thêm chủ đề mới để tích lũy từ vựng nhé!</p>
            <button onClick={onClose} className="mt-6 px-8 py-3 bg-violet-400 font-black text-white border-4 border-slate-800 rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-violet-500 active:translate-y-1 active:shadow-none transition-all cursor-pointer">Đóng</button>
          </div>
        ) : finished ? (
          <div className="text-center py-10">
            <PartyPopper size={56} className="mx-auto text-yellow-500 mb-3" />
            <p className="font-black text-2xl text-slate-800 dark:text-slate-100">Hoàn thành ôn tập!</p>
            <p className="font-bold text-slate-500 dark:text-slate-400 mt-2">Bạn nhớ {remembered}/{cards.length} từ. Những từ chưa nhớ sẽ được ôn lại sớm.</p>
            <button onClick={onClose} className="mt-6 px-8 py-3 bg-emerald-400 font-black text-slate-900 border-4 border-slate-800 rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-emerald-500 active:translate-y-1 active:shadow-none transition-all cursor-pointer">Xong</button>
          </div>
        ) : (
          <>
            <div className="flex gap-1 w-full mb-5">
              {cards.map((_, i) => <div key={i} className={`flex-1 h-2 rounded-full ${i < idx ? 'bg-emerald-400' : i === idx ? 'bg-violet-400 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`} />)}
            </div>
            <p className="text-center text-sm font-bold text-slate-400 mb-3">Từ {idx + 1}/{cards.length}</p>

            <div
              onClick={() => setFlipped((f) => !f)}
              className="min-h-[180px] bg-violet-50 dark:bg-slate-800 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-inner mb-5"
            >
              {!flipped ? (
                <>
                  <p className="text-4xl font-black text-slate-900 dark:text-slate-100">{cur.en}</p>
                  {cur.ipa && <p className="text-lg font-bold text-violet-500 mt-1 font-mono">{cur.ipa}</p>}
                  <p className="text-xs font-bold text-slate-400 mt-3">👆 Bấm để xem nghĩa</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-black text-rose-600 dark:text-rose-400">{cur.vi}</p>
                  {cur.example && <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mt-3 italic">"{cur.example}"</p>}
                  {cur.viExample && <p className="text-xs text-slate-400 mt-1">{cur.viExample}</p>}
                </>
              )}
            </div>

            <div className="flex justify-center mb-4">
              <button
                onClick={(e) => { e.stopPropagation(); (playAudio ? playAudio(cur.en) : null); }}
                className="px-5 py-2 bg-cyan-100 dark:bg-cyan-900/40 font-bold border-3 border-slate-800 dark:border-slate-600 rounded-xl hover:bg-cyan-200 flex items-center gap-2 cursor-pointer"
              >
                <Volume2 size={18} /> Nghe
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => rate(false)} className="py-4 bg-rose-400 font-black text-white border-4 border-slate-800 rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-rose-500 active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2">
                <RotateCcw size={18} /> Quên rồi
              </button>
              <button onClick={() => rate(true)} className="py-4 bg-emerald-400 font-black text-slate-900 border-4 border-slate-800 rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-emerald-500 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
                ✓ Đã nhớ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SrsReview;
