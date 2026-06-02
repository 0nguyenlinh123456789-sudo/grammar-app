// File: src/components/oxford/FlashcardTab.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Snail } from 'lucide-react';

const FlashcardTab = ({ unitData }) => {
    const allWords = unitData.words || (unitData.theory ? unitData.theory.flatMap(section => section.items || []).filter(Boolean) : []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [jumpVal, setJumpVal] = useState(1);

    useEffect(() => {
        setIsFlipped(false);
        setCurrentIndex(0);
    }, [unitData?.id]);

    useEffect(() => {
        setJumpVal(currentIndex + 1);
    }, [currentIndex]);

    const playWord = (word, rate = 0.9) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(word);
            u.lang = 'en-US';
            u.rate = rate;
            window.speechSynthesis.speak(u);
        }
    };

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex(prev => (prev + 1) % allWords.length), 150);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex(prev => (prev - 1 + allWords.length) % allWords.length), 150);
    };

    const handleJump = (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val > 0 && val <= allWords.length) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(val - 1), 150);
        } else {
            setJumpVal(currentIndex + 1);
        }
    };

    if (allWords.length === 0) return <div className="text-center font-bold p-10">Chưa có từ vựng nào!</div>;
    const currentCard = allWords[currentIndex];

    return (
        <div className="flex flex-col items-center py-6 animate-in fade-in h-full">
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-2xl shadow-sm mb-6 w-full max-w-lg">
                <h3 className="text-xl font-bold text-emerald-900">Thẻ Ghi Nhớ Tự Do</h3>
                <p className="text-emerald-700 mt-2">Nhấp thẻ để lật. Gõ số vào ô vàng để nhảy tới thẻ bạn muốn tìm.</p>
            </div>

            <div className="flex items-center gap-6 mb-6 w-full max-w-lg justify-center">
                <button 
                  onClick={prevCard} 
                  className="p-3 bg-white border-4 border-slate-800 rounded-full shadow-[4px_4px_0_0_#1e293b] active:translate-y-1 active:shadow-none hover:bg-slate-50 transition-all text-slate-800 cursor-pointer"
                >
                    <ChevronLeft size={28} />
                </button>
                
                {/* CARD JUMP NUMBER INPUT */}
                <div className="flex items-center gap-2 font-black text-xl text-slate-800 bg-yellow-300 px-4 py-2 rounded-2xl border-4 border-slate-800 shadow-[4px_4px_0_0_#1e293b]">
                    Thẻ
                    <input 
                        type="text" 
                        value={jumpVal}
                        onChange={(e) => setJumpVal(e.target.value)}
                        onBlur={handleJump}
                        onKeyDown={(e) => e.key === 'Enter' && handleJump(e)}
                        className="w-10 text-center bg-transparent border-b-2 border-slate-800 outline-none focus:bg-yellow-100 rounded"
                    />
                    / {allWords.length}
                </div>

                <button 
                  onClick={nextCard} 
                  className="p-3 bg-white border-4 border-slate-800 rounded-full shadow-[4px_4px_0_0_#1e293b] active:translate-y-1 active:shadow-none hover:bg-slate-50 transition-all text-slate-800 cursor-pointer"
                >
                    <ChevronRight size={28} />
                </button>
            </div>

            <div className="relative w-80 sm:w-96 h-96 cursor-pointer select-none" style={{perspective: '1000px'}} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="w-full h-full transition-transform duration-500" style={{transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : ''}}>
                    <div className="absolute w-full h-full bg-white rounded-3xl border-4 border-slate-800 flex flex-col items-center justify-center p-6 shadow-[8px_8px_0_0_#1e293b]" style={{backfaceVisibility: 'hidden'}}>
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-800 text-center break-words max-w-full px-2">{currentCard.word}</h2>
                        
                        <div className="flex items-center gap-4 mt-8">
                            <button 
                              onClick={(e) => { e.stopPropagation(); playWord(currentCard.word, 0.9); }} 
                              title="Nghe tốc độ thường"
                              className="p-3 bg-indigo-100 hover:bg-indigo-200 border-[3px] border-slate-800 text-indigo-700 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
                            >
                                <Volume2 size={22} />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); playWord(currentCard.word, 0.55); }} 
                              title="Nghe tốc độ chậm"
                              className="p-3 bg-amber-100 hover:bg-amber-200 border-[3px] border-slate-800 text-amber-700 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
                            >
                                <Snail size={22} />
                            </button>
                        </div>
                        
                        <p className="text-sm text-slate-400 mt-8 font-bold flex items-center gap-2"><RotateCcw size={16}/> Chạm để lật xem nghĩa</p>
                    </div>
                    
                    <div className="absolute w-full h-full bg-slate-800 text-white rounded-3xl p-8 flex flex-col items-center justify-center border-4 border-slate-900 shadow-[8px_8px_0_0_#1e293b]" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-2 text-center">{currentCard.vi}</h2>
                        {currentCard.phonetic && <p className="text-lg md:text-xl text-indigo-300 font-mono font-bold mb-4 text-center">{currentCard.phonetic}</p>}
                        
                        <div className="flex items-center gap-4 mb-6">
                            <button 
                              onClick={(e) => { e.stopPropagation(); playWord(currentCard.word, 0.9); }} 
                              title="Nghe tốc độ thường"
                              className="p-3 bg-white/10 hover:bg-white/20 border-[3px] border-white/50 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-[2px_2px_0_0_rgba(255,255,255,0.2)] active:translate-y-0.5 active:shadow-none"
                            >
                                <Volume2 size={22} />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); playWord(currentCard.word, 0.55); }} 
                              title="Nghe tốc độ chậm"
                              className="p-3 bg-amber-400/20 hover:bg-amber-400/30 border-[3px] border-amber-400/50 text-amber-300 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-[2px_2px_0_0_rgba(251,191,36,0.2)] active:translate-y-0.5 active:shadow-none"
                            >
                                <Snail size={22} />
                            </button>
                        </div>
                        
                        <p className="text-center italic opacity-85 text-sm bg-slate-700/50 p-3 rounded-xl border border-dashed border-slate-600 max-w-full">{currentCard.example}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardTab;
