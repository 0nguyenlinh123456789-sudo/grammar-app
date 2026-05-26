// File: src/components/vocab/WritingPractice.jsx
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';

const WritingPractice = ({ currentWordIndex, totalWords, currentWord, playAudio }) => {
  const [writingInput, setWritingInput] = useState('');
  const [writingStatus, setWritingStatus] = useState(null); // 'correct', 'wrong', null
  const [showHint, setShowHint] = useState(false);

  // Reset inputs and states when word changes
  useEffect(() => {
    setWritingInput('');
    setWritingStatus(null);
    setShowHint(false);
  }, [currentWordIndex]);

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
      <div className="bg-orange-100 border-4 border-black px-6 py-2 rounded-full font-black text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-6 text-orange-800">
        Luyện Viết: Từ {currentWordIndex + 1} / {totalWords}
      </div>
      
      <div className="w-full max-w-3xl bg-white border-4 border-black rounded-3xl p-6 md:p-10 shadow-[10px_10px_0_0_rgba(0,0,0,1)] text-center">
        <h3 className="text-2xl font-bold text-slate-500 mb-2">Gõ từ Tiếng Anh có nghĩa là:</h3>
        <div className="text-4xl md:text-5xl font-black text-red-600 mb-6 border-b-4 border-black pb-4 inline-block">
          {currentWord.vi}
        </div>
        
        <div className="bg-slate-100 border-2 border-dashed border-slate-400 rounded-xl p-4 mb-8 text-left">
          <p className="text-sm font-bold text-slate-500 mb-1">DỊCH CÂU NÀY:</p>
          <p className="text-lg font-bold text-slate-800">
            "{generateClozeSentence(currentWord.example, currentWord.en)}"
          </p>
          <p className="text-sm font-medium text-slate-600 mt-2 italic">({currentWord.viExample})</p>
        </div>
        
        <form onSubmit={checkWriting} className="flex flex-col gap-4 items-center w-full">
          <input 
            type="text" 
            value={writingInput} 
            onChange={(e) => setWritingInput(e.target.value)} 
            placeholder="Gõ từ tiếng Anh..." 
            autoFocus 
            className={`w-full max-w-md text-center text-3xl font-black p-4 border-4 border-black rounded-2xl outline-none transition-all shadow-inner ${writingStatus === 'correct' ? 'bg-green-200 text-green-900 border-green-600' : writingStatus === 'wrong' ? 'bg-red-200 text-red-900 border-red-600 animate-shake' : 'bg-white focus:ring-4 focus:ring-orange-300'}`} 
          />
          {writingStatus === 'correct' && <div className="text-green-600 font-black text-xl animate-bounce flex items-center justify-center gap-2"><CheckCircle2 size={20} /> Chính xác! Giỏi lắm!</div>}
          {writingStatus === 'wrong' && <div className="text-red-600 font-black text-xl flex items-center justify-center gap-2"><XCircle size={20} /> Chưa đúng, thử lại nhé!</div>}
          
          <div className="flex gap-4 w-full justify-center mt-4">
            <button 
              type="button" 
              onClick={() => setShowHint(true)} 
              className="px-6 py-3 bg-slate-200 font-bold border-4 border-black rounded-xl hover:bg-slate-300 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
            >
              {showHint ? `Đáp án: ${currentWord.en}` : <span className="flex items-center justify-center gap-2"><Eye size={18} /> Xem đáp án</span>}
            </button>
            <button 
              type="submit" 
              className="px-8 py-3 bg-orange-400 font-black text-white border-4 border-black rounded-xl hover:bg-orange-500 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
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
