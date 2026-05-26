// File: src/components/oxford/FlashcardTab.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

const FlashcardTab = ({ unitData }) => {
    const allWords = unitData.theory.flatMap(section => section.items);
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

            <div className="relative w-80 sm:w-96 h-80 cursor-pointer" style={{perspective: '1000px'}} onClick={() => setIsFlipped(!isFlipped)}>
                <div className="w-full h-full transition-transform duration-500" style={{transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : ''}}>
                    <div className="absolute w-full h-full bg-white rounded-3xl border-4 border-slate-800 flex flex-col items-center justify-center p-6 shadow-[8px_8px_0_0_#1e293b]" style={{backfaceVisibility: 'hidden'}}>
                        <h2 className="text-5xl font-black text-slate-800 text-center">{currentCard.word}</h2>
                        <p className="text-lg text-slate-400 mt-6 font-bold flex items-center gap-2"><RotateCcw size={16}/> Chạm để lật</p>
                    </div>
                    <div className="absolute w-full h-full bg-slate-800 text-white rounded-3xl p-8 flex flex-col items-center justify-center border-4 border-slate-900 shadow-[8px_8px_0_0_#1e293b]" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                        <h2 className="text-3xl font-bold text-yellow-400 mb-2 text-center">{currentCard.vi}</h2>
                        <p className="text-xl text-slate-300 mb-6">{currentCard.phonetic}</p>
                        <p className="text-center italic opacity-80 text-sm">{currentCard.example}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardTab;
