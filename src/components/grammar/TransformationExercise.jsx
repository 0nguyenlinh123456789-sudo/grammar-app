// File: src/components/grammar/TransformationExercise.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Repeat, ChevronRight, Sparkles, RotateCcw, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import Btn3D from '../common/Btn3D';

const TransformationExercise = ({ exercises, setGlobalProgress, onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);

  const exercisesLen = exercises?.length || 0;
  const curr = exercises && exercisesLen > 0 ? exercises[qIdx] : null;

  useEffect(() => {
    if (exercisesLen > 0 && qIdx === exercisesLen && onComplete) {
      onComplete();
    }
  }, [qIdx, onComplete, exercisesLen]);

  useEffect(() => {
    if (inputRef.current && status === 'idle') {
      inputRef.current.focus();
    }
  }, [qIdx, status]);

  const normalizeForComparison = (str) => {
    return str.trim().toLowerCase()
      .replace(/['']/g, "'")
      .replace(/\s+/g, ' ')
      .replace(/[.,!?;:]/g, '');
  };

  const check = () => {
    if (!answer.trim()) return;
    const userAns = normalizeForComparison(answer);
    // Support multiple correct answers
    const correctAnswers = Array.isArray(curr.a) ? curr.a : [curr.a];
    const isCorrect = correctAnswers.some(ca => normalizeForComparison(ca) === userAns);
    
    if (isCorrect) {
      setStatus('correct');
      setScore(s => s + 1);
      setGlobalProgress(p => p + 1);
    } else {
      setStatus('wrong');
    }
  };

  const next = () => {
    setStatus('idle');
    setAnswer('');
    setShowHint(false);
    setQIdx(prev => prev + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (status === 'idle') check();
      else next();
    }
  };

  if (qIdx >= exercisesLen) {
    const percentage = Math.round((score / exercisesLen) * 100);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-12 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617] text-center">
        <div className="text-6xl mb-4">{percentage >= 80 ? '🌟' : percentage >= 50 ? '✏️' : '📝'}</div>
        <h3 className="font-black text-3xl text-slate-900 dark:text-slate-100 mb-2">Kết Quả Viết Lại Câu</h3>
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

  const displayAnswer = Array.isArray(curr.a) ? curr.a[0] : curr.a;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617]">
      {/* Header */}
      <div className="flex justify-between items-center font-black mb-6 text-xl border-b-4 border-slate-100 dark:border-slate-800 pb-4 border-dashed">
        <span className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Repeat className="text-purple-500" /> Viết Lại Câu
        </span>
        <span className="bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-2 border-slate-800 dark:border-slate-700 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]">
          {qIdx + 1}/{exercisesLen}
        </span>
      </div>

      {/* Original sentence */}
      <div className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-4">
        <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Câu gốc:</p>
        <p className="font-black text-xl md:text-2xl text-slate-900 dark:text-slate-100 leading-relaxed">{curr.original}</p>
      </div>

      {/* Instruction */}
      <div className="bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-4 mb-6">
        <p className="text-sm font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider mb-1">Yêu cầu:</p>
        <p className="font-bold text-lg text-purple-800 dark:text-purple-300">{curr.instruction}</p>
        {curr.keyword && (
          <p className="mt-2 font-black text-purple-600 dark:text-purple-400">
            Từ khóa: <span className="bg-purple-200 dark:bg-purple-900 px-3 py-1 rounded-lg text-purple-900 dark:text-purple-200">{curr.keyword}</span>
          </p>
        )}
      </div>

      {/* Answer input */}
      <div className="mb-6">
        <textarea
          ref={inputRef}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={status !== 'idle'}
          placeholder="Viết lại câu ở đây..."
          rows={2}
          className={`w-full px-5 py-4 border-4 rounded-2xl font-bold text-lg outline-none transition-all resize-none ${
            status === 'correct'
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
              : status === 'wrong'
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300'
                : 'border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-purple-500 focus:bg-purple-50 dark:focus:bg-purple-950/20'
          }`}
        />
      </div>

      {/* Hint */}
      {status === 'idle' && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-4 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
        >
          <Lightbulb size={16} /> {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
        </button>
      )}
      {showHint && status === 'idle' && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 rounded-xl px-4 py-2 mb-6 font-bold text-amber-800 dark:text-amber-300 text-sm">
          <Lightbulb size={14} className="inline text-amber-500 mr-1" />
          Gợi ý: {displayAnswer.split(' ').slice(0, 3).join(' ')}...
        </div>
      )}

      {/* Action Button */}
      <div className="flex gap-4">
        {status === 'idle' ? (
          <Btn3D onClick={check} disabled={!answer.trim()} color="bg-slate-800 text-white w-full text-xl">
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
              <p className="text-rose-600 dark:text-rose-400 font-black text-lg">Chưa chính xác!</p>
              <p className="text-slate-700 dark:text-slate-300 font-bold mt-1">
                Đáp án: <span className="text-emerald-600 dark:text-emerald-400 font-black">{displayAnswer}</span>
              </p>
            </div>
          </div>
        </div>
      )}
      {status === 'correct' && (
        <div className="mt-6 bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
            <p className="text-emerald-600 dark:text-emerald-400 font-black text-lg flex items-center gap-2">
              Xuất sắc! <Sparkles size={20} className="text-yellow-500 fill-yellow-500 animate-pulse" />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransformationExercise;
