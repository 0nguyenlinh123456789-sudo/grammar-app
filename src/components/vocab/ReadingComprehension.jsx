// File: src/components/vocab/ReadingComprehension.jsx
// Reading-comprehension check: read an English sentence/passage, then answer a
// question. Uses hand-authored questions (topic.comprehension) when present,
// otherwise auto-generates from vocab example sentences. Text-only (no audio).
import { useState, useEffect, useCallback } from 'react';
import { BookOpen, CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { playCorrect, playWrong, playComplete } from '../../utils/sound';
import { recordReview } from '../../utils/srs';
import { buildComprehension } from '../../utils/comprehension';

const ReadingComprehension = ({ words = [], authored }) => {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const init = useCallback(() => {
    setPool(buildComprehension({ words, authored, limit: 8 }));
    setIdx(0); setScore(0); setSelected(null); setFinished(false);
  }, [words, authored]);

  useEffect(() => { init(); }, [init]);

  const cur = pool[idx];

  const choose = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    const correct = !!opt.correct;
    if (correct) { setScore((s) => s + 10); playCorrect(); } else { playWrong(); }
    if (cur.word) recordReview(cur.word, correct);
    setTimeout(() => {
      if (idx < pool.length - 1) { setIdx(idx + 1); setSelected(null); }
      else { playComplete(); setFinished(true); }
    }, 1300);
  };

  if (pool.length < 4) return null; // need enough questions for a fair quiz

  if (finished) {
    const pct = Math.round((score / (pool.length * 10)) * 100);
    return (
      <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-center">
        <Trophy size={52} className="mx-auto text-yellow-500 fill-yellow-300 mb-3" />
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1">Đọc hiểu xong!</h3>
        <p className="font-bold text-slate-500 dark:text-slate-400 mb-5">Đúng {score / 10}/{pool.length} câu ({pct}%)</p>
        <button onClick={init} className="px-6 py-2.5 bg-green-400 font-black text-slate-900 border-4 border-black rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-green-500 active:translate-y-1 active:shadow-none transition-all cursor-pointer inline-flex items-center gap-2">
          <RefreshCw size={18} /> Làm lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      <h3 className="text-xl font-black mb-4 bg-sky-300 dark:bg-sky-800 dark:text-white inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg transform -rotate-1">
        <BookOpen size={20} /> 📖 Kiểm Tra Đọc Hiểu — Câu {idx + 1}/{pool.length}
      </h3>
      <div className="flex gap-1 w-full my-4">
        {pool.map((_, i) => <div key={i} className={`flex-1 h-2 rounded-full ${i < idx ? 'bg-emerald-400' : i === idx ? 'bg-sky-400 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`} />)}
      </div>
      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">Đọc và trả lời: {cur.prompt}</p>
      <p className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 mb-5 leading-snug">"{cur.showText}"</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cur.options.map((opt, i) => {
          const isChosen = selected === opt;
          let cls = 'bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 border-black dark:border-slate-600';
          if (selected !== null) {
            if (opt.correct) cls = 'bg-emerald-200 dark:bg-emerald-900/50 border-emerald-600 text-emerald-900 dark:text-emerald-200';
            else if (isChosen) cls = 'bg-rose-200 dark:bg-rose-900/50 border-rose-600 text-rose-900 dark:text-rose-200';
            else cls = 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-60';
          }
          return (
            <button key={i} onClick={() => choose(opt)} disabled={selected !== null}
              className={`text-left p-4 rounded-2xl border-4 font-bold text-base shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] transition-all flex items-center gap-2 ${cls} ${selected === null ? 'cursor-pointer active:translate-y-0.5' : 'cursor-default'}`}>
              {selected !== null && opt.correct && <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />}
              {selected !== null && isChosen && !opt.correct && <XCircle size={18} className="shrink-0 text-rose-600" />}
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingComprehension;
