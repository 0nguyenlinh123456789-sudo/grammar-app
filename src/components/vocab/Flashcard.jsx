// File: src/components/vocab/Flashcard.jsx
import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Quick motivational hints shown above the card (lighter version without a mascot)
const CARD_HINTS = [
  '💭 Nhấn vào thẻ để xem nghĩa!',
  '🌟 Thử đoán trước khi lật nhé!',
  '📚 Tập phát âm rồi mới lật!',
  '✅ Đọc to câu ví dụ một lần!',
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Flashcard = ({ currentWordIndex, totalWords, currentWord, playAudio, onNext, onPrev, onWordChange }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hint, setHint] = useState(getRandom(CARD_HINTS));
  const [marked, setMarked] = useState(false);
  const [tempIndex, setTempIndex] = useState(currentWordIndex + 1);

  // Reset flip + state when word changes
  useEffect(() => {
    setIsFlipped(false);
    setHint(getRandom(CARD_HINTS));
    setMarked(false);
    setTempIndex(currentWordIndex + 1);
  }, [currentWordIndex]);

  const handleIndexChange = (e) => {
    setTempIndex(e.target.value);
  };

  const commitIndex = () => {
    let val = parseInt(tempIndex, 10);
    if (isNaN(val) || val < 1) {
      val = 1;
    } else if (val > totalWords) {
      val = totalWords;
    }
    setTempIndex(val);
    if (onWordChange) {
      onWordChange(val - 1);
    }
  };

  const handleIndexBlur = () => {
    commitIndex();
  };

  const handleIndexKeyDown = (e) => {
    if (e.key === 'Enter') {
      commitIndex();
      e.target.blur();
    }
  };

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const handleKnew = () => {
    setTimeout(() => onNext && onNext(), 400);
  };

  const handleDidntKnow = () => {
    setTimeout(() => onNext && onNext(), 400);
  };

  // Determine background color for back card based on topic (using emoji in vi)
  const wordEmoji = currentWord?.vi?.match(/[\u{1F300}-\u{1FFFF}]/u)?.[0] || '';

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">

      {/* Progress Counter + Hint */}
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 px-5 py-1.5 rounded-full font-black text-lg shadow-[3px_3px_0_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_0_rgba(0,0,0,0.5)] text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
          <span>✨ Từ</span>
          <input
            type="number"
            min={1}
            max={totalWords}
            value={tempIndex}
            onChange={handleIndexChange}
            onBlur={handleIndexBlur}
            onKeyDown={handleIndexKeyDown}
            className="w-16 text-center bg-yellow-50 dark:bg-slate-700 border-2 border-black dark:border-slate-500 rounded-lg font-black text-slate-800 dark:text-white py-0 px-1 focus:outline-none focus:bg-yellow-100 dark:focus:bg-slate-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span>/ {totalWords}</span>
        </div>
        <button
          onClick={() => setMarked(m => !m)}
          className={`p-2 rounded-full border-3 border-black dark:border-slate-600 shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all cursor-pointer ${marked ? 'bg-yellow-300 dark:bg-yellow-500 scale-110' : 'bg-white dark:bg-slate-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'}`}
          title="Đánh dấu từ khó"
        >
          <Star size={18} className={marked ? 'text-yellow-700 fill-yellow-700' : 'text-slate-400 dark:text-slate-500'} />
        </button>
      </div>

      {/* Flashcard Flip Area */}
      <div
        className="relative w-full max-w-3xl h-[22rem] perspective-1000 group cursor-pointer"
        onClick={handleFlip}
      >
        <div className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>

          {/* FRONT — English word */}
          <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-600 rounded-[2rem] shadow-[10px_10px_0_0_rgba(0,0,0,1)] dark:shadow-[10px_10px_0_0_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-8 text-center">
            <span className="absolute top-5 right-7 text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center gap-1">
              Nhấn để lật <RotateCcw size={12} />
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); playAudio(currentWord.en); }}
              className="mb-4 bg-blue-100 dark:bg-blue-900/40 p-4 rounded-full border-4 border-black dark:border-slate-600 hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:scale-110 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_0_rgba(0,0,0,0.5)] flex items-center gap-2 font-bold cursor-pointer text-blue-700 dark:text-blue-300"
              title="Nghe phát âm"
            >
              <Volume2 size={20} /> Nghe & Đọc
            </button>

            <div className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white mb-5 leading-tight">
              {currentWord.en}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-lg font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-xl border-2 border-blue-400 dark:border-blue-600">
                {currentWord.type}
              </span>
              <span className="text-lg font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-xl border-2 border-slate-300 dark:border-slate-600">
                {currentWord.ipa}
              </span>
              {currentWord.level && (
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full border-2 border-emerald-400">
                  {currentWord.level}
                </span>
              )}
            </div>
          </div>

          {/* BACK — Vietnamese + example */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-yellow-200 to-amber-200 dark:from-amber-900/60 dark:to-yellow-900/40 border-4 border-black dark:border-yellow-700 rounded-[2rem] shadow-[10px_10px_0_0_rgba(0,0,0,1)] dark:shadow-[10px_10px_0_0_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-6 md:p-8 text-center overflow-y-auto overflow-x-hidden custom-scrollbar">

            <div className="text-3xl md:text-5xl font-black text-red-700 dark:text-yellow-300 mb-3 border-b-4 border-red-400 dark:border-yellow-600 pb-3 w-full shrink-0">
              {currentWord.vi}
            </div>

            {/* Synonyms and Antonyms */}
            {(currentWord.synonyms || currentWord.antonyms) && (
              <div className="flex flex-wrap justify-center gap-3 w-full mb-3 shrink-0">
                {currentWord.synonyms && (
                  <div className="bg-emerald-100 dark:bg-emerald-900/50 border-2 border-emerald-500 rounded-lg px-3 py-1 flex items-center gap-1.5 shadow-[2px_2px_0_0_rgba(16,185,129,0.5)]">
                    <span className="text-xs font-black text-emerald-800 dark:text-emerald-300">=</span>
                    <span className="text-sm font-bold text-emerald-900 dark:text-emerald-100">{currentWord.synonyms}</span>
                  </div>
                )}
                {currentWord.antonyms && (
                  <div className="bg-rose-100 dark:bg-rose-900/50 border-2 border-rose-500 rounded-lg px-3 py-1 flex items-center gap-1.5 shadow-[2px_2px_0_0_rgba(244,63,94,0.5)]">
                    <span className="text-xs font-black text-rose-800 dark:text-rose-300">≠</span>
                    <span className="text-sm font-bold text-rose-900 dark:text-rose-100">{currentWord.antonyms}</span>
                  </div>
                )}
              </div>
            )}

            <div className="w-full bg-white dark:bg-slate-900/80 border-4 border-black dark:border-slate-600 rounded-2xl p-4 md:p-5 relative shrink-0 flex flex-col items-center">
              <button
                onClick={(e) => { e.stopPropagation(); playAudio(currentWord.example); }}
                className="mb-3 bg-blue-100 dark:bg-blue-900/40 px-4 py-1.5 rounded-full border-2 border-black dark:border-slate-600 hover:bg-blue-200 dark:hover:bg-blue-800/50 font-bold flex items-center gap-1.5 cursor-pointer text-xs text-blue-700 dark:text-blue-350 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all"
              >
                <Volume2 size={14} /> Nghe Câu Ví Dụ
              </button>
              <p className="text-base md:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 leading-snug">
                "{currentWord.example}"
              </p>
              <p className="text-sm md:text-base font-semibold text-slate-600 dark:text-slate-300 italic border-t-2 border-dashed border-slate-300 dark:border-slate-600 pt-2 w-full">
                {currentWord.viExample}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons — Only show after flip */}
      <div className={`mt-6 w-full max-w-3xl transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="flex gap-4 justify-center">
          <button
            onClick={(e) => { e.stopPropagation(); handleDidntKnow(); }}
            className="flex-1 max-w-[200px] py-3 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-4 border-red-400 dark:border-red-600 rounded-2xl font-black text-base shadow-[4px_4px_0_0_#dc2626] dark:shadow-[4px_4px_0_0_rgba(220,38,38,0.4)] hover:bg-red-200 dark:hover:bg-red-800/50 cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            😅 Chưa Nhớ
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleKnew(); }}
            className="flex-1 max-w-[200px] py-3 bg-emerald-300 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 border-4 border-emerald-600 dark:border-emerald-500 rounded-2xl font-black text-base shadow-[4px_4px_0_0_#059669] dark:shadow-[4px_4px_0_0_rgba(5,150,105,0.4)] hover:bg-emerald-400 dark:hover:bg-emerald-700 cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Nhớ Rồi!
          </button>
        </div>
      </div>

      {/* Navigation — larger and more balanced */}
      <div className="flex gap-4 mt-6 w-full max-w-3xl">
        {onPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 rounded-2xl font-black text-lg md:text-xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-slate-800 dark:text-white transition-all active:shadow-none active:translate-y-1"
          >
            <ChevronLeft size={24} /> Từ Trước
          </button>
        )}
        {onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-yellow-400 dark:bg-yellow-500 border-4 border-black dark:border-yellow-600 rounded-2xl font-black text-lg md:text-xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] hover:bg-yellow-500 dark:hover:bg-yellow-400 cursor-pointer text-slate-900 transition-all active:shadow-none active:translate-y-1"
          >
            Từ Tiếp <ChevronRight size={24} />
          </button>
        )}
      </div>

    </div>
  );
};

export default Flashcard;
