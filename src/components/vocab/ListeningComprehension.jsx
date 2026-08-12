// File: src/components/vocab/ListeningComprehension.jsx
// Real listening-comprehension practice: hear an English sentence, then answer
// a question about it. Uses hand-authored questions (topic.comprehension) when
// present, otherwise auto-generates from vocab example sentences.
import { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, Snail, RefreshCw, CheckCircle2, XCircle, Headphones, Trophy } from 'lucide-react';
import { playCorrect, playWrong, playComplete } from '../../utils/sound';
import { recordReview } from '../../utils/srs';
import { buildComprehension } from '../../utils/comprehension';

const ListeningComprehension = ({ activeTopic, playAudio }) => {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealText, setRevealText] = useState(false);
  const autoPlayedRef = useRef(-1);

  const init = useCallback(() => {
    const qs = buildComprehension({ words: activeTopic?.words, authored: activeTopic?.comprehension, limit: 10 });
    setPool(qs);
    setIdx(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setRevealText(false);
    autoPlayedRef.current = -1;
  }, [activeTopic]);

  useEffect(() => { init(); }, [init]);

  const cur = pool[idx];

  const speak = useCallback((rate = 0.85) => {
    if (!cur) return;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(cur.playText);
      u.lang = 'en-US';
      u.rate = rate;
      window.speechSynthesis.speak(u);
    } else if (playAudio) {
      playAudio(cur.playText);
    }
  }, [cur, playAudio]);

  // Auto-play the sentence once when a new question appears.
  useEffect(() => {
    if (cur && autoPlayedRef.current !== idx) {
      autoPlayedRef.current = idx;
      const t = setTimeout(() => speak(0.85), 350);
      return () => clearTimeout(t);
    }
  }, [cur, idx, speak]);

  const choose = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    const correct = !!opt.correct;
    if (correct) { setScore((s) => s + 10); playCorrect(); } else { playWrong(); }
    if (cur.word) recordReview(cur.word, correct);
    setTimeout(() => {
      if (idx < pool.length - 1) {
        setIdx(idx + 1);
        setSelected(null);
        setRevealText(false);
      } else {
        playComplete();
        setFinished(true);
      }
    }, 1400);
  };

  if (!activeTopic) return null;

  if (pool.length === 0) {
    return (
      <div className="w-full max-w-3xl p-10 font-bold text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 mt-4">
        <p className="text-3xl mb-3">🎧🚧</p>
        <p className="text-xl">Chủ đề này chưa đủ câu ví dụ để luyện nghe hiểu.</p>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / (pool.length * 10)) * 100);
    return (
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 rounded-3xl p-8 md:p-12 shadow-[10px_10px_0_0_rgba(0,0,0,1)] dark:shadow-[10px_10px_0_0_#020617] text-center animate-fade-in">
        <Trophy size={64} className="mx-auto text-yellow-500 fill-yellow-300 mb-4" />
        <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Hoàn thành luyện nghe!</h3>
        <p className="text-xl font-bold text-slate-500 dark:text-slate-400 mb-6">Bạn đúng {score / 10}/{pool.length} câu ({pct}%)</p>
        <button onClick={init} className="px-8 py-3 bg-cyan-400 font-black text-slate-900 border-4 border-black rounded-2xl shadow-[5px_5px_0_0_rgba(0,0,0,1)] hover:bg-cyan-500 active:translate-y-1 active:shadow-none transition-all cursor-pointer inline-flex items-center gap-2">
          <RefreshCw size={20} /> Luyện lại
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl flex flex-col items-center animate-fade-in">
      <div className="bg-cyan-100 dark:bg-cyan-950/40 border-4 border-black dark:border-slate-650 px-6 py-2 rounded-full font-black text-lg shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-5 text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
        <Headphones size={20} /> Nghe – Chọn Nghĩa: Câu {idx + 1}/{pool.length}
      </div>

      {/* progress */}
      <div className="flex gap-1 w-full max-w-xl mb-6">
        {pool.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full ${i < idx ? 'bg-emerald-400' : i === idx ? 'bg-cyan-400 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`} />
        ))}
      </div>

      <div className="w-full bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[10px_10px_0_0_rgba(0,0,0,1)] dark:shadow-[10px_10px_0_0_#020617] text-center">
        <p className="font-black text-slate-500 dark:text-slate-400 mb-4">🔊 Nghe rồi trả lời: <span className="text-slate-800 dark:text-slate-200">{cur.prompt}</span></p>

        <div className="flex justify-center gap-3 mb-4">
          <button onClick={() => speak(0.85)} className="w-16 h-16 rounded-full bg-cyan-300 hover:bg-cyan-400 border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <Volume2 size={28} className="text-slate-800" />
          </button>
          <button onClick={() => speak(0.5)} className="w-16 h-16 rounded-full bg-amber-200 hover:bg-amber-300 border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all cursor-pointer">
            <Snail size={28} className="text-slate-800" />
          </button>
        </div>

        {/* Show text only after answering, or if learner asks */}
        {(selected !== null || revealText) ? (
          <p className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1">"{cur.showText}"</p>
        ) : (
          <button onClick={() => setRevealText(true)} className="text-sm font-bold text-slate-400 underline mb-1 cursor-pointer">Xem chữ (nếu quá khó)</button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {cur.options.map((opt, i) => {
            const isChosen = selected === opt;
            let cls = 'bg-white dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 border-black dark:border-slate-600';
            if (selected !== null) {
              if (opt.correct) cls = 'bg-emerald-200 dark:bg-emerald-900/50 border-emerald-600 text-emerald-900 dark:text-emerald-200';
              else if (isChosen) cls = 'bg-rose-200 dark:bg-rose-900/50 border-rose-600 text-rose-900 dark:text-rose-200';
              else cls = 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-60';
            }
            return (
              <button
                key={i}
                onClick={() => choose(opt)}
                disabled={selected !== null}
                className={`text-left p-4 rounded-2xl border-4 font-bold text-base shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] transition-all flex items-center gap-2 ${cls} ${selected === null ? 'cursor-pointer active:translate-y-0.5' : 'cursor-default'}`}
              >
                {selected !== null && opt.correct && <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />}
                {selected !== null && isChosen && !opt.correct && <XCircle size={18} className="shrink-0 text-rose-600" />}
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListeningComprehension;
