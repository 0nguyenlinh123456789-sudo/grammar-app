// File: src/components/vocab/WritingPractice.jsx
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';

const WritingPractice = ({ currentWordIndex, totalWords, currentWord, playAudio, onWordChange }) => {
  const [writingInput, setWritingInput] = useState('');
  const [writingStatus, setWritingStatus] = useState(null); // 'correct', 'wrong', null
  const [showHint, setShowHint] = useState(false);
  const [tempIndex, setTempIndex] = useState(currentWordIndex + 1);

  // Reset inputs and states when word changes
  useEffect(() => {
    setWritingInput('');
    setWritingStatus(null);
    setShowHint(false);
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

  // Clean and generate cloze sentence
  const generateClozeSentence = (sentence, targetWord) => {
    const cleanWord = targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${cleanWord}[a-z]*\\b`, 'gi');
    return sentence.replace(regex, '_________');
  };

  const checkWriting = (e) => {
    e.preventDefault();
    if (writingInput.trim().toLowerCase() === currentWord.en.toLowerCase()) {
      setWritingStatus('correct');
      playAudio(currentWord.en, 'en-US'); 
    } else {
      setWritingStatus('wrong');
    }
  };

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <div className="bg-orange-100 dark:bg-orange-950/30 border-4 border-black dark:border-slate-650 px-6 py-2 rounded-full font-black text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_#000] mb-6 text-orange-850 dark:text-orange-300 flex items-center justify-center gap-1.5">
        <span>Luyện Viết: Từ</span>
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
      
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 rounded-3xl p-6 md:p-10 shadow-[10px_10px_0_0_rgba(0,0,0,1)] dark:shadow-[10px_10px_0_0_#020617] text-center">
        <h3 className="text-2xl font-bold text-slate-500 dark:text-slate-400 mb-2">Gõ từ Tiếng Anh có nghĩa là:</h3>
        <div className="text-4xl md:text-5xl font-black text-red-650 dark:text-red-400 mb-6 border-b-4 border-black dark:border-slate-700 pb-4 inline-block">
          {currentWord.vi}
        </div>
        
        <div className="bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-400 dark:border-slate-650 rounded-xl p-4 mb-8 text-left">
          <p className="text-sm font-bold text-slate-550 dark:text-slate-450 mb-1">DỊCH CÂU NÀY:</p>
          <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
            "{generateClozeSentence(currentWord.example, currentWord.en)}"
          </p>
          <p className="text-sm font-medium text-slate-650 dark:text-slate-400 mt-2 italic">({currentWord.viExample})</p>
        </div>
        
        <form onSubmit={checkWriting} className="flex flex-col gap-4 items-center w-full">
          <input 
            type="text" 
            value={writingInput} 
            onChange={(e) => setWritingInput(e.target.value)} 
            placeholder="Gõ từ tiếng Anh..." 
            autoFocus 
            className={`w-full max-w-md text-center text-3xl font-black p-4 border-4 border-black dark:border-slate-600 rounded-2xl outline-none transition-all shadow-inner 
              ${writingStatus === 'correct' 
                ? 'bg-green-150 text-green-900 border-green-600 dark:bg-green-900/40 dark:text-green-300 dark:border-green-500' 
                : writingStatus === 'wrong' 
                  ? 'bg-red-150 text-red-900 border-red-600 dark:bg-red-900/40 dark:text-red-300 dark:border-red-500 animate-shake' 
                  : 'bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-850'}`} 
          />
          {writingStatus === 'correct' && <div className="text-green-650 dark:text-green-400 font-black text-xl animate-bounce flex items-center justify-center gap-2"><CheckCircle2 size={20} /> Chính xác! Giỏi lắm!</div>}
          {writingStatus === 'wrong' && <div className="text-red-650 dark:text-red-400 font-black text-xl flex items-center justify-center gap-2"><XCircle size={20} /> Chưa đúng, thử lại nhé!</div>}
          
          <div className="flex gap-4 w-full justify-center mt-4">
            <button 
              type="button" 
              onClick={() => setShowHint(true)} 
              className="px-6 py-3 bg-slate-200 dark:bg-slate-800 font-bold border-4 border-black dark:border-slate-600 rounded-xl hover:bg-slate-350 dark:hover:bg-slate-700 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_#020617] text-slate-850 dark:text-slate-250 transition-all cursor-pointer"
            >
              {showHint ? `Đáp án: ${currentWord.en}` : <span className="flex items-center justify-center gap-2"><Eye size={18} /> Xem đáp án</span>}
            </button>
            <button 
              type="submit" 
              className="px-8 py-3 bg-orange-400 dark:bg-orange-600 font-black text-white border-4 border-black dark:border-slate-600 rounded-xl hover:bg-orange-500 dark:hover:bg-orange-550 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_#020617] transition-all cursor-pointer"
            >
              KIỂM TRA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritingPractice;
