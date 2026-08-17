// File: src/components/vocab/ReadingComprehension.jsx
// Phần kiểm tra đọc hiểu nằm NGAY DƯỚI bài đọc của chủ đề.
//
// Vì nó nằm ngay dưới bài đọc, người học mặc nhiên hiểu là nó hỏi về BÀI ĐỌC.
// Trước việc 3.1 thì 266/267 chủ đề không có câu nào hỏi về bài — các câu ở đây
// sinh ra từ câu ví dụ của từng mục từ, tức là hỏi hiểu MỘT CÂU rời không liên
// quan tới bài vừa đọc. Chỗ đặt nó đã nói một điều mà nội dung không có.
//
// Nay: có `topic.storyQuiz` thì hỏi về bài thật; không có thì NÓI THẲNG rằng
// phần này đang kiểm câu lẻ chứ chưa kiểm bài — luật "thiếu dữ liệu thì ẨN hoặc
// BÁO, không thay thế âm thầm".
import { useState, useEffect, useCallback } from 'react';
import { BookOpen, CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { playCorrect, playWrong, playComplete } from '../../utils/sound';
import { recordReview } from '../../utils/srs';
import { buildComprehension } from '../../utils/comprehension';

const ReadingComprehension = ({ words = [], authored, story }) => {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const init = useCallback(() => {
    setPool(buildComprehension({ words, authored, story, limit: 8 }));
    setIdx(0); setScore(0); setSelected(null); setFinished(false);
  }, [words, authored, story]);

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
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1">Hoàn thành phần đọc!</h3>
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
        <BookOpen size={20} /> {cur.mucVanBan ? '📖 Đọc Hiểu Bài' : '📖 Đọc – Chọn Nghĩa'} — Câu {idx + 1}/{pool.length}
      </h3>
      <div className="flex gap-1 w-full my-4">
        {pool.map((_, i) => <div key={i} className={`flex-1 h-2 rounded-full ${i < idx ? 'bg-emerald-400' : i === idx ? 'bg-sky-400 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`} />)}
      </div>

      {/* Câu lẻ thì phải nói là câu lẻ — nó nằm ngay dưới bài đọc nên không nói
          rõ là mặc nhiên người học hiểu nhầm đây là câu hỏi về bài. */}
      {!cur.mucVanBan && (
        <p className="text-sm font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-500 rounded-xl px-3 py-2 mb-4">
          ⚠️ Chủ đề này <b>chưa có câu hỏi về bài đọc</b>. Các câu dưới đây kiểm tra hiểu <b>từng câu ví dụ rời</b>, không kiểm tra hiểu cả bài.
        </p>
      )}

      <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
        {cur.mucVanBan ? 'Dựa vào bài đọc phía trên, trả lời:' : 'Đọc và trả lời:'} {cur.mucVanBan ? '' : cur.prompt}
      </p>
      {cur.mucVanBan ? (
        <p className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 mb-5 leading-snug">{cur.prompt}</p>
      ) : (
        <p className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 mb-5 leading-snug">"{cur.showText}"</p>
      )}

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

      {/* Căn cứ: câu NGUYÊN VĂN trong bài đọc dẫn tới đáp án. Hiện sau khi chọn,
          để người học tự kiểm lại chứ không phải tin lời chấm. */}
      {selected !== null && cur.dan && (
        <p className="mt-5 text-base font-bold text-slate-700 dark:text-slate-200 bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500 rounded-r-xl px-4 py-3">
          <span className="text-emerald-700 dark:text-emerald-300">Căn cứ trong bài:</span> “{cur.dan}”
        </p>
      )}
    </div>
  );
};

export default ReadingComprehension;
