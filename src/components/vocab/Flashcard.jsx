// File: src/components/vocab/Flashcard.jsx
import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2 } from 'lucide-react';

const Flashcard = ({ currentWordIndex, totalWords, currentWord, playAudio }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip status when word changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentWordIndex]);

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <div className="bg-white border-4 border-black px-6 py-2 rounded-full font-black text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-6">
        Từ {currentWordIndex + 1} / {totalWords}
      </div>
      
      <div 
        className="relative w-full max-w-3xl h-[26rem] perspective-1000 group cursor-pointer" 
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* MẶT TRƯỚC */}
          <div className="absolute w-full h-full backface-hidden bg-white border-4 border-black rounded-[2rem] shadow-[10px_10px_0_0_rgba(0,0,0,1)] flex flex-col items-center justify-center p-8 text-center">
            <span className="absolute top-6 right-8 text-sm font-black text-slate-500 bg-slate-200 px-3 py-1 rounded-full border-2 border-black flex items-center gap-1">Chạm thẻ lật <RotateCcw size={14} /></span>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                playAudio(currentWord.en); 
              }} 
              className="mb-4 bg-blue-100 p-4 rounded-full border-4 border-black hover:bg-blue-300 hover:scale-110 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center gap-2 font-bold cursor-pointer" 
              title="Nghe phát âm"
            >
              <Volume2 size={20} /> Nghe & Đọc
            </button>
            <div className="text-5xl md:text-7xl font-black text-slate-800 mb-6">{currentWord.en}</div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border-2 border-blue-600">{currentWord.type}</span>
              <span className="text-xl font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl border-2 border-slate-400">{currentWord.ipa}</span>
            </div>
          </div>

          {/* MẶT SAU */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-yellow-200 border-4 border-black rounded-[2rem] shadow-[10px_10px_0_0_rgba(0,0,0,1)] flex flex-col items-center justify-center p-8 text-center">
            <div className="text-4xl md:text-5xl font-black text-red-600 mb-6 border-b-4 border-red-400 pb-4">{currentWord.vi}</div>
            <div className="w-full bg-white border-4 border-black rounded-2xl p-6 relative">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  playAudio(currentWord.example); 
                }} 
                className="absolute -top-5 right-4 bg-blue-300 p-2 rounded-full border-2 border-black hover:bg-blue-400 font-bold flex items-center gap-1 cursor-pointer text-sm"
              >
                <Volume2 size={16} /> Nghe Câu
              </button>
              <p className="text-xl md:text-2xl font-bold text-slate-800 mb-3 mt-2">"{currentWord.example}"</p>
              <p className="text-lg font-bold text-slate-600 italic border-t-2 border-dashed border-slate-300 pt-3">{currentWord.viExample}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Flashcard;
