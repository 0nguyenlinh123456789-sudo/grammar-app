// File: src/components/grammar/FillBlanksExercise.jsx
import React, { useState, useEffect, useRef } from 'react';
import { PenLine, ChevronRight, Sparkles, Lightbulb, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import Btn3D from '../common/Btn3D';
import MasteryVerdict from '../common/MasteryVerdict';
import { createSession, recordAnswer, sessionEvidence } from '../../utils/mastery';
import { recordError } from '../../utils/errorBank';
import KhongCoCau from './KhongCoCau';

const FillBlanksExercise = ({ exercises, setGlobalProgress, onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'wrong'
  const [score, setScore] = useState(0);
  // Phiên chấm theo LẦN TRẢ LỜI ĐẦU TIÊN (hạng mục #1): bấm lại câu vừa sai
  // không ghi đè. `score` bên dưới chỉ để hiển thị.
  const sessionRef = useRef(createSession());
  const reportedRef = useRef(false);
  // Kết quả phiên đưa vào state để màn kết quả không phải đọc ref lúc render.
  const [verdict, setVerdict] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef(null);

  const exercisesLen = exercises?.length || 0;
  const curr = exercises && exercisesLen > 0 ? exercises[qIdx] : null;

  useEffect(() => {
    if (exercisesLen > 0 && qIdx === exercisesLen && onComplete && !reportedRef.current) {
      // onComplete là arrow tạo mới mỗi render nên effect chạy lại liên tục ở
      // màn kết quả — chốt để chỉ báo một lần cho mỗi lượt làm bài.
      reportedRef.current = true;
      const evidence = sessionEvidence(sessionRef.current);
      setVerdict(evidence);
      onComplete(evidence);
    }
  }, [qIdx, onComplete, exercisesLen]);

  useEffect(() => {
    if (inputRef.current && status === 'idle') {
      inputRef.current.focus();
    }
  }, [qIdx, status]);

  const normalizeAnswer = (str) => {
    return str.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, ' ');
  };

  const check = () => {
    if (!answer.trim()) return;
    const userAns = normalizeAnswer(answer);
    // Support multiple correct answers separated by /
    const correctAnswers = curr.a.split('/').map(a => normalizeAnswer(a.trim()));
    
    if (correctAnswers.some(ca => ca === userAns)) {
      setStatus('correct');
      recordAnswer(sessionRef.current, qIdx, true, 'typing');
      setScore(s => s + 1);
      setGlobalProgress(p => p + 1);
    } else {
      setStatus('wrong');
      recordAnswer(sessionRef.current, qIdx, false, 'typing');
      setAttempts(prev => prev + 1);
      // First miss on this question feeds the error bank (Học từ lỗi sai).
      if (attempts === 0) recordError({ skill: 'grammar', prompt: curr.q, answer: curr.a, chosen: answer });
    }
  };

  const replay = () => {
    sessionRef.current = createSession();
    reportedRef.current = false;
    setVerdict(null);
    setQIdx(0);
    setScore(0);
  };

  const next = () => {
    setStatus('idle');
    setAnswer('');
    setShowHint(false);
    setAttempts(0);
    setQIdx(prev => prev + 1);
  };

  const getHint = () => {
    if (!curr) return '';
    const correctAns = curr.a.split('/')[0].trim();
    const hintLen = Math.ceil(correctAns.length / 2);
    return correctAns.slice(0, hintLen) + '...';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (status === 'idle') check();
      else next();
    }
  };

  // ⚠️ KHÔNG CÓ CÂU NÀO thì phải BÁO Ở ĐÂY, TRƯỚC màn kết quả. Bộ vẽ-thật
  // (tests/helpers/render.mjs) bắt được: với danh sách rỗng thì `qIdx >= exercisesLen`
  // là `0 >= 0` → ĐÚNG, nên nhánh kết quả bên dưới chạy và người học nhận một
  // bảng điểm cho bài chưa từng có: **"0/0 (NaN% chính xác)"**. Chốt
  // `if (!curr)` mà tôi thêm ở đợt trước nằm SAU nhánh đó nên chưa bao giờ chạy
  // cho trường hợp rỗng — sửa nửa vời còn khó thấy hơn không sửa, vì mã đọc vào
  // trông như đã được chặn.
  if (!exercisesLen) return <KhongCoCau ten="câu điền từ" />;

  if (qIdx >= exercisesLen) {
    const percentage = Math.round((score / exercisesLen) * 100);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-12 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617] text-center">
        <div className="text-6xl mb-4">{percentage >= 80 ? '🎉' : percentage >= 50 ? '💪' : '📝'}</div>
        <h3 className="font-black text-3xl text-slate-900 dark:text-slate-100 mb-2">Kết Quả Điền Từ</h3>
        <p className="font-black text-5xl text-emerald-500 mb-2">{score}/{exercisesLen}</p>
        <p className="text-slate-500 dark:text-slate-400 font-bold mb-6">({percentage}%
        <MasteryVerdict evidence={verdict} /> chính xác)</p>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-8 border-2 border-slate-300 dark:border-slate-600">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${percentage >= 80 ? 'bg-emerald-400' : percentage >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <Btn3D onClick={replay} className="text-lg">
          <RotateCcw size={18} className="mr-2" /> Làm Lại
        </Btn3D>
      </div>
    );
  }

  if (!curr) return <KhongCoCau ten="câu điền từ" />;

  // Split question text at _____ to show input inline
  const parts = curr.q.split('_____');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617]">
      {/* Header */}
      <div className="flex justify-between items-center font-black mb-8 text-xl border-b-4 border-slate-100 dark:border-slate-800 pb-4 border-dashed">
        <span className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <PenLine className="text-blue-500" /> Điền Từ
        </span>
        <span className="bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-2 border-slate-800 dark:border-slate-700 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]">
          {qIdx + 1}/{exercisesLen}
        </span>
      </div>

      {/* Question with inline input */}
      <div className="font-bold text-2xl md:text-3xl mb-8 leading-relaxed text-slate-900 dark:text-slate-100 flex flex-wrap items-baseline gap-1">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <span>{part}</span>
            {i < parts.length - 1 && (
              <input
                ref={i === 0 ? inputRef : null}
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={status !== 'idle'}
                placeholder="..."
                className={`inline-block w-40 md:w-56 px-4 py-2 border-4 rounded-xl font-black text-xl md:text-2xl text-center outline-none transition-all ${
                  status === 'correct' 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300' 
                    : status === 'wrong' 
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 animate-shake' 
                      : 'border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:bg-blue-50 dark:focus:bg-blue-950/30'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Translation hint */}
      {curr.trans && (
        <p className="text-slate-400 dark:text-slate-500 font-medium text-sm mb-6 italic">
          💡 {curr.trans}
        </p>
      )}

      {/* Hint button */}
      {status === 'idle' && attempts >= 1 && !showHint && (
        <button
          onClick={() => setShowHint(true)}
          className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-4 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
        >
          <Lightbulb size={16} /> Xem gợi ý
        </button>
      )}

      {showHint && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 rounded-xl px-4 py-2 mb-6 font-bold text-amber-800 dark:text-amber-300 text-sm flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-500" /> Gợi ý: <span className="font-black">{getHint()}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        {status === 'idle' ? (
          <Btn3D 
            onClick={check} 
            disabled={!answer.trim()} 
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
        <div className="mt-6 flex items-start gap-3 bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-700 rounded-2xl p-4">
          <XCircle size={24} className="text-rose-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-rose-600 dark:text-rose-400 font-black text-lg">Chưa đúng!</p>
            <p className="text-rose-500 dark:text-rose-400 font-bold text-base">
              Đáp án: <span className="underline font-black">{curr.a}</span>
            </p>
          </div>
        </div>
      )}
      {status === 'correct' && (
        <div className="mt-6 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-4">
          <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
          <p className="text-emerald-600 dark:text-emerald-400 font-black text-lg flex items-center gap-2">
            Chính xác! <Sparkles size={20} className="text-yellow-500 fill-yellow-500 animate-pulse" />
          </p>
        </div>
      )}
    </div>
  );
};

export default FillBlanksExercise;
