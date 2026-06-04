// File: src/components/grammar/ErrorCorrectionExercise.jsx
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ChevronRight, Sparkles, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import Btn3D from '../common/Btn3D';

const ErrorCorrectionExercise = ({ exercises, setGlobalProgress, onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState(null);
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
    if (selectedWordIdx === null) return;
    const words = curr.sentence.split(' ');
    const selectedWord = words[selectedWordIdx];
    
    // Check if the selected word matches the error word
    const isCorrect = selectedWord.toLowerCase().replace(/[.,!?;:]/g, '') === 
                      curr.errorWord.toLowerCase().replace(/[.,!?;:]/g, '');
    
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
    setSelectedWordIdx(null);
    setQIdx(prev => prev + 1);
  };

  if (qIdx >= exercisesLen) {
    const percentage = Math.round((score / exercisesLen) * 100);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-12 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617] text-center">
        <div className="text-6xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '📖'}</div>
        <h3 className="font-black text-3xl text-slate-900 dark:text-slate-100 mb-2">Kết Quả Sửa Lỗi</h3>
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

  const words = curr.sentence.split(' ');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617]">
      {/* Header */}
      <div className="flex justify-between items-center font-black mb-6 text-xl border-b-4 border-slate-100 dark:border-slate-800 pb-4 border-dashed">
        <span className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <AlertTriangle className="text-orange-500" /> Tìm Lỗi Sai
        </span>
        <span className="bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-2 border-slate-800 dark:border-slate-700 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]">
          {qIdx + 1}/{exercisesLen}
        </span>
      </div>

      {/* Instructions */}
      <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mb-6">
        👆 Click vào từ bạn nghĩ là <span className="text-rose-500 font-black">SAI</span> trong câu dưới đây:
      </p>

      {/* Sentence with clickable words */}
      <div className="flex flex-wrap gap-2 mb-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
        {words.map((word, idx) => {
          let wordStyle = 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer';
          
          if (status !== 'idle') {
            // After checking
            const isError = word.toLowerCase().replace(/[.,!?;:]/g, '') === curr.errorWord.toLowerCase().replace(/[.,!?;:]/g, '');
            if (isError) {
              wordStyle = 'bg-rose-100 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300 line-through';
            } else if (selectedWordIdx === idx && status === 'wrong') {
              wordStyle = 'bg-amber-100 dark:bg-amber-950/40 border-amber-500 text-amber-700 dark:text-amber-300';
            }
          } else if (selectedWordIdx === idx) {
            wordStyle = 'bg-indigo-100 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-300 dark:ring-indigo-700 scale-105';
          }

          return (
            <button
              key={idx}
              onClick={() => status === 'idle' && setSelectedWordIdx(idx)}
              disabled={status !== 'idle'}
              className={`px-4 py-2 rounded-xl border-2 font-bold text-lg md:text-xl transition-all ${wordStyle}`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {/* Translation */}
      {curr.trans && (
        <p className="text-slate-400 dark:text-slate-500 font-medium text-sm mb-6 italic">
          🇻🇳 {curr.trans}
        </p>
      )}

      {/* Action Button */}
      <div className="flex gap-4">
        {status === 'idle' ? (
          <Btn3D 
            onClick={check} 
            disabled={selectedWordIdx === null} 
            color="bg-slate-800 text-white w-full text-xl"
          >
            Kiểm Tra
          </Btn3D>
        ) : (
          <Btn3D 
            onClick={next} 
            color="bg-emerald-400 text-slate-900 w-full text-xl flex items-center justify-center gap-2"
          >
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
              <p className="text-rose-600 dark:text-rose-400 font-black text-lg">Chưa đúng!</p>
              <p className="text-rose-500 dark:text-rose-400 font-bold">
                Từ sai là: <span className="font-black underline">{curr.errorWord}</span> → 
                Sửa thành: <span className="font-black text-emerald-600 dark:text-emerald-400">{curr.correction}</span>
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
      {status === 'correct' && (
        <div className="mt-6 bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={24} className="text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-600 dark:text-emerald-400 font-black text-lg flex items-center gap-2">
                Chính xác! <Sparkles size={20} className="text-yellow-500 fill-yellow-500 animate-pulse" />
              </p>
              <p className="text-emerald-500 dark:text-emerald-400 font-bold">
                Sửa: <span className="line-through text-rose-400">{curr.errorWord}</span> → <span className="font-black">{curr.correction}</span>
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

export default ErrorCorrectionExercise;
