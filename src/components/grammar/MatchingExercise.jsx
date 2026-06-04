// File: src/components/grammar/MatchingExercise.jsx
import React, { useState, useEffect } from 'react';
import { Link2, ChevronRight, Sparkles, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import Btn3D from '../common/Btn3D';

const MatchingExercise = ({ exercises, setGlobalProgress, onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState([]); // [{leftIdx, rightIdx, correct}]
  const [shuffledRight, setShuffledRight] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [setsDone, setSetsDone] = useState(0);

  const exercisesLen = exercises?.length || 0;

  // Each exercise is a set of pairs to match
  const curr = exercises && exercisesLen > 0 ? exercises[qIdx] : null;

  useEffect(() => {
    if (curr && curr.pairs) {
      // Shuffle the right column
      const rightItems = curr.pairs.map((p, i) => ({ text: p.right, originalIdx: i }));
      setShuffledRight(rightItems.sort(() => Math.random() - 0.5));
      setMatches([]);
      setSelectedLeft(null);
      setSelectedRight(null);
      setShowResults(false);
    }
  }, [qIdx, curr?.pairs?.length]);

  useEffect(() => {
    if (exercisesLen > 0 && qIdx === exercisesLen && onComplete) {
      onComplete();
    }
  }, [qIdx, onComplete, exercisesLen]);

  const handleLeftClick = (idx) => {
    if (showResults) return;
    if (matches.some(m => m.leftIdx === idx)) return; // Already matched
    setSelectedLeft(idx);
    
    if (selectedRight !== null) {
      // Make a match
      makeMatch(idx, selectedRight);
    }
  };

  const handleRightClick = (idx) => {
    if (showResults) return;
    if (matches.some(m => m.rightIdx === idx)) return; // Already matched
    setSelectedRight(idx);
    
    if (selectedLeft !== null) {
      // Make a match
      makeMatch(selectedLeft, idx);
    }
  };

  const makeMatch = (leftIdx, rightIdx) => {
    const rightItem = shuffledRight[rightIdx];
    const isCorrect = rightItem.originalIdx === leftIdx;
    
    setMatches(prev => [...prev, { leftIdx, rightIdx, correct: isCorrect }]);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const checkAll = () => {
    setShowResults(true);
    const correctCount = matches.filter(m => m.correct).length;
    setScore(prev => prev + correctCount);
    setGlobalProgress(p => p + correctCount);
    setSetsDone(prev => prev + 1);
  };

  const next = () => {
    setQIdx(prev => prev + 1);
  };

  const allMatched = curr ? matches.length === curr.pairs.length : false;

  const isLeftMatched = (idx) => matches.some(m => m.leftIdx === idx);
  const isRightMatched = (idx) => matches.some(m => m.rightIdx === idx);
  const getMatchForLeft = (idx) => matches.find(m => m.leftIdx === idx);
  const getMatchForRight = (idx) => matches.find(m => m.rightIdx === idx);

  // Colors for matched pairs
  const matchColors = [
    'border-blue-500 bg-blue-50 dark:bg-blue-950/30',
    'border-purple-500 bg-purple-50 dark:bg-purple-950/30',
    'border-teal-500 bg-teal-50 dark:bg-teal-950/30',
    'border-amber-500 bg-amber-50 dark:bg-amber-950/30',
    'border-pink-500 bg-pink-50 dark:bg-pink-950/30',
    'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30',
    'border-lime-500 bg-lime-50 dark:bg-lime-950/30',
    'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30',
  ];

  const getMatchColor = (matchIdx) => {
    return matchColors[matchIdx % matchColors.length];
  };

  if (qIdx >= exercisesLen) {
    const totalPairs = exercises.reduce((acc, ex) => acc + (ex.pairs?.length || 0), 0);
    const percentage = totalPairs > 0 ? Math.round((score / totalPairs) * 100) : 0;
    return (
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-12 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617] text-center">
        <div className="text-6xl mb-4">{percentage >= 80 ? '🔗' : percentage >= 50 ? '🤝' : '🔄'}</div>
        <h3 className="font-black text-3xl text-slate-900 dark:text-slate-100 mb-2">Kết Quả Nối Câu</h3>
        <p className="font-black text-5xl text-emerald-500 mb-2">{score}/{totalPairs}</p>
        <p className="text-slate-500 dark:text-slate-400 font-bold mb-6">({percentage}% chính xác)</p>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-8 border-2 border-slate-300 dark:border-slate-600">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${percentage >= 80 ? 'bg-emerald-400' : percentage >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <Btn3D onClick={() => { setQIdx(0); setScore(0); setSetsDone(0); }} className="text-lg">
          <RotateCcw size={18} className="mr-2" /> Làm Lại
        </Btn3D>
      </div>
    );
  }

  if (!curr || !curr.pairs) return <div className="p-10 font-bold text-slate-500 dark:text-slate-400">Đang tải câu hỏi...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border-[4px] border-slate-800 dark:border-slate-700 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617]">
      {/* Header */}
      <div className="flex justify-between items-center font-black mb-6 text-xl border-b-4 border-slate-100 dark:border-slate-800 pb-4 border-dashed">
        <span className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Link2 className="text-teal-500" /> Nối Câu
        </span>
        <span className="bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-2 border-slate-800 dark:border-slate-700 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]">
          Bộ {qIdx + 1}/{exercisesLen}
        </span>
      </div>

      {/* Instructions */}
      <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mb-6">
        👆 Click lần lượt một mục bên <strong>TRÁI</strong> rồi một mục bên <strong>PHẢI</strong> để tạo cặp nối.
      </p>

      {/* Matching Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-3">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center mb-2">Cột A</p>
          {curr.pairs.map((pair, idx) => {
            const matchInfo = getMatchForLeft(idx);
            const matched = !!matchInfo;
            const matchIndex = matches.findIndex(m => m.leftIdx === idx);
            
            let style = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer';
            
            if (selectedLeft === idx) {
              style = 'bg-indigo-100 dark:bg-indigo-950/40 border-indigo-500 text-indigo-800 dark:text-indigo-300 ring-2 ring-indigo-300 dark:ring-indigo-700 scale-[1.02]';
            } else if (matched && showResults) {
              style = matchInfo.correct 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-800 dark:text-emerald-300' 
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-800 dark:text-rose-300';
            } else if (matched) {
              style = getMatchColor(matchIndex) + ' text-slate-800 dark:text-slate-200';
            }

            return (
              <button
                key={`left-${idx}`}
                onClick={() => handleLeftClick(idx)}
                disabled={matched || showResults}
                className={`w-full p-3 md:p-4 rounded-xl border-3 font-bold text-sm md:text-base transition-all text-left ${style}`}
              >
                {matched && showResults && (
                  matchInfo.correct 
                    ? <CheckCircle2 size={16} className="inline text-emerald-500 mr-1" />
                    : <XCircle size={16} className="inline text-rose-500 mr-1" />
                )}
                {pair.left}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center mb-2">Cột B</p>
          {shuffledRight.map((item, idx) => {
            const matchInfo = getMatchForRight(idx);
            const matched = !!matchInfo;
            const matchIndex = matches.findIndex(m => m.rightIdx === idx);

            let style = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer';
            
            if (selectedRight === idx) {
              style = 'bg-indigo-100 dark:bg-indigo-950/40 border-indigo-500 text-indigo-800 dark:text-indigo-300 ring-2 ring-indigo-300 dark:ring-indigo-700 scale-[1.02]';
            } else if (matched && showResults) {
              style = matchInfo.correct 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-800 dark:text-emerald-300' 
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-800 dark:text-rose-300';
            } else if (matched) {
              style = getMatchColor(matchIndex) + ' text-slate-800 dark:text-slate-200';
            }

            return (
              <button
                key={`right-${idx}`}
                onClick={() => handleRightClick(idx)}
                disabled={matched || showResults}
                className={`w-full p-3 md:p-4 rounded-xl border-3 font-bold text-sm md:text-base transition-all text-left ${style}`}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Undo last match */}
      {matches.length > 0 && !showResults && (
        <button
          onClick={() => {
            setMatches(prev => prev.slice(0, -1));
          }}
          className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 mb-4 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw size={14} /> Hủy nối cuối
        </button>
      )}

      {/* Action Button */}
      <div className="flex gap-4">
        {!showResults ? (
          <Btn3D 
            onClick={checkAll} 
            disabled={!allMatched} 
            color="bg-slate-800 text-white w-full text-xl"
          >
            {allMatched ? 'Kiểm Tra Tất Cả' : `Đã nối ${matches.length}/${curr.pairs.length}`}
          </Btn3D>
        ) : (
          <Btn3D 
            onClick={next} 
            color="bg-emerald-400 text-slate-900 w-full text-xl flex items-center justify-center gap-2"
          >
            {qIdx < exercisesLen - 1 ? 'Bộ Tiếp Theo' : 'Xem Kết Quả'} <ChevronRight size={22} />
          </Btn3D>
        )}
      </div>

      {/* Results summary */}
      {showResults && (
        <div className="mt-6 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4">
          <p className="font-black text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            Kết quả: {matches.filter(m => m.correct).length}/{curr.pairs.length} cặp đúng
            {matches.every(m => m.correct) && <Sparkles size={20} className="text-yellow-500 fill-yellow-500 animate-pulse" />}
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchingExercise;
