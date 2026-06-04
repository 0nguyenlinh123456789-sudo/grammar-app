// File: src/components/grammar/TrueFalseExercise.jsx
import React, { useState, useEffect } from 'react';
import { CircleCheck, CircleX, ChevronRight, Sparkles, RotateCcw, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import Btn3D from '../common/Btn3D';

const TrueFalseExercise = ({ exercises, setGlobalProgress, onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null); // true or false
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState(0);

  const exercisesLen = exercises?.length || 0;
  const curr = exercises && exercisesLen > 0 ? exercises[qIdx] : null;

  useEffect(() => {
    if (exercisesLen > 0 && qIdx === exercisesLen && onComplete) {
      onComplete();
    }
  }, [qIdx, onComplete, exercisesLen]);

  const check = () => {
    if (selected === null) return;
    if (selected === curr.isCorrect) {
      setStatus('correct');
      setScore(s => s + 1);
      setGlobalProgress(p => p + 1);
    } else {
      setStatus('wrong');
    }
  };

  const next = () => {
    setStatus('idle');
    setSelected(null);
    setQIdx(prev => prev + 1);
  };

  if (qIdx >= exercisesLen) {
    const percentage = Math.round((score / exercisesLen) * 100);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-12 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617] text-center">
        <div className="text-6xl mb-4">{percentage >= 80 ? '✅' : percentage >= 50 ? '🤔' : '❌'}</div>
        <h3 className="font-black text-3xl text-slate-900 dark:text-slate-100 mb-2">Kết Quả Đúng/Sai</h3>
        <p className="font-black text-5xl text-emerald-500 mb-2">{score}/{exercisesLen}</p>
        <p className="text-slate-500 dark:text-slate-400 font-bold mb-6">({percentage}% chính xác)</p>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-8 border-2 border-slate-300 dark:border-slate-600">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${percentage >= 80 ? 'bg-emerald-400' : percentage >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <Btn3D onClick={() => { setQIdx(0); setScore(0); }} className="text-lg">
          <RotateCcw size={18} className="mr-2" /> Làm Lại
        </Btn3D>
      </div>
    );
  }

  if (!curr) return <div className="p-10 font-bold text-slate-500 dark:text-slate-400">Đang tải câu hỏi...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617]">
      {/* Header */}
      <div className="flex justify-between items-center font-black mb-6 text-xl border-b-4 border-slate-100 dark:border-slate-800 pb-4 border-dashed">
        <span className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <HelpCircle className="text-cyan-500" /> Đúng hay Sai?
        </span>
        <span className="bg-cyan-100 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border-2 border-slate-800 dark:border-slate-700 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]">
          {qIdx + 1}/{exercisesLen}
        </span>
      </div>

      {/* Instruction */}
      <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mb-4">
        📝 Câu dưới đây đúng hay sai ngữ pháp?
      </p>

      {/* Sentence */}
      <div className="bg-slate-50 dark:bg-slate-800 border-3 border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 mb-8">
        <p className="font-black text-2xl md:text-3xl text-slate-900 dark:text-slate-100 leading-relaxed text-center">
          "{curr.sentence}"
        </p>
        {curr.trans && (
          <p className="text-slate-400 dark:text-slate-500 font-medium text-sm mt-3 text-center italic">
            🇻🇳 {curr.trans}
          </p>
        )}
      </div>

      {/* True/False Buttons */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
        <button
          onClick={() => status === 'idle' && setSelected(true)}
          disabled={status !== 'idle'}
          className={`p-6 md:p-8 rounded-2xl border-4 font-black text-xl md:text-2xl transition-all flex flex-col items-center gap-3 ${
            selected === true
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 shadow-[3px_3px_0px_0px_#059669] translate-y-1 text-emerald-700 dark:text-emerald-300'
              : status !== 'idle'
                ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                : 'border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617] border-b-[8px] text-slate-800 dark:text-slate-200 cursor-pointer hover:border-emerald-500'
          }`}
        >
          <CircleCheck size={36} className={selected === true ? 'text-emerald-500' : 'text-emerald-400'} />
          <span>ĐÚNG</span>
          <span className="text-sm font-bold text-slate-400 dark:text-slate-500">(Correct)</span>
        </button>

        <button
          onClick={() => status === 'idle' && setSelected(false)}
          disabled={status !== 'idle'}
          className={`p-6 md:p-8 rounded-2xl border-4 font-black text-xl md:text-2xl transition-all flex flex-col items-center gap-3 ${
            selected === false
              ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 shadow-[3px_3px_0px_0px_#dc2626] translate-y-1 text-rose-700 dark:text-rose-300'
              : status !== 'idle'
                ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                : 'border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/20 shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617] border-b-[8px] text-slate-800 dark:text-slate-200 cursor-pointer hover:border-rose-500'
          }`}
        >
          <CircleX size={36} className={selected === false ? 'text-rose-500' : 'text-rose-400'} />
          <span>SAI</span>
          <span className="text-sm font-bold text-slate-400 dark:text-slate-500">(Incorrect)</span>
        </button>
      </div>

      {/* Action Button */}
      <div className="flex gap-4">
        {status === 'idle' ? (
          <Btn3D onClick={check} disabled={selected === null} color="bg-slate-800 text-white w-full text-xl">
            Kiểm Tra
          </Btn3D>
        ) : (
          <Btn3D onClick={next} color="bg-emerald-400 text-slate-900 w-full text-xl flex items-center justify-center gap-2">
            Tiếp Theo <ChevronRight size={22} />
          </Btn3D>
        )}
      </div>

      {/* Feedback */}
      {status === 'wrong' && (
        <div className="mt-6 bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-700 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <XCircle size={24} className="text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-rose-600 dark:text-rose-400 font-black text-lg">
                Câu này {curr.isCorrect ? 'ĐÚNG' : 'SAI'} ngữ pháp!
              </p>
              {!curr.isCorrect && curr.correction && (
                <p className="text-slate-700 dark:text-slate-300 font-bold mt-1">
                  ✅ Câu đúng: <span className="text-emerald-600 dark:text-emerald-400 font-black">{curr.correction}</span>
                </p>
              )}
              {curr.explanation && (
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mt-2">
                  💡 {curr.explanation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {status === 'correct' && (
        <div className="mt-6 bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={24} className="text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-600 dark:text-emerald-400 font-black text-lg flex items-center gap-2">
                Chính xác! <Sparkles size={20} className="text-yellow-500 fill-yellow-500 animate-pulse" />
              </p>
              {curr.explanation && (
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mt-2">
                  💡 {curr.explanation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrueFalseExercise;
