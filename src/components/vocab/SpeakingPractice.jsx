// File: src/components/vocab/SpeakingPractice.jsx
import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, XCircle, Volume2 } from 'lucide-react';

const SpeakingPractice = ({ currentWordIndex, totalWords, currentWord, playAudio, onWordChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [speakStatus, setSpeakStatus] = useState(null); // 'correct', 'wrong', null
  const [tempIndex, setTempIndex] = useState(currentWordIndex + 1);

  // Reset states when word changes
  useEffect(() => {
    setIsListening(false);
    setSpokenText('');
    setSpeakStatus(null);
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

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt không hỗ trợ thu âm (Hãy dùng Chrome hoặc Edge trên máy tính).");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setSpokenText('');
      setSpeakStatus(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().replace(/[.,!?]/g, '').trim();
      setSpokenText(transcript);
      
      const targetWord = currentWord.en.toLowerCase().trim();
      
      // Flexibly check accuracy
      if (transcript.includes(targetWord) || targetWord.includes(transcript)) {
        setSpeakStatus('correct');
        playAudio("Excellent!", 'en-US');
      } else {
        setSpeakStatus('wrong');
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      console.error(event.error);
    };

    recognition.start();
  };

  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <div className="bg-purple-100 border-4 border-black px-6 py-2 rounded-full font-black text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-6 text-purple-800 flex items-center justify-center gap-1.5">
        <span>Luyện Phát Âm: Từ</span>
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
      
      <div className="w-full max-w-3xl bg-white border-4 border-black rounded-3xl p-6 md:p-10 shadow-[10px_10px_0_0_rgba(0,0,0,1)] text-center flex flex-col items-center">
        <h3 className="text-2xl font-bold text-slate-500 mb-2">Hãy phát âm chuẩn từ sau:</h3>
        <div className="text-5xl md:text-7xl font-black text-slate-800 mb-2">{currentWord.en}</div>
        <div className="text-2xl font-bold text-slate-400 mb-8">
          {currentWord.ipa} <span className="text-lg text-red-400">({currentWord.vi})</span>
        </div>

        <div className="mb-8 flex flex-col items-center">
          <button 
            onClick={startListening}
            disabled={isListening}
            className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-black flex items-center justify-center text-4xl md:text-5xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all
              ${isListening ? 'bg-red-400 animate-pulse translate-y-[2px] shadow-[4px_4px_0_0_rgba(0,0,0,1)]' : 'bg-purple-300 hover:bg-purple-400 hover:translate-y-[-4px] active:translate-y-[4px] active:shadow-none'}`}
          >
            <Mic size={40} className="text-slate-800" />
          </button>
          <p className="mt-4 font-bold text-lg text-slate-700">
            {isListening ? "Đang thu âm... Hãy đọc từ này lên!" : "Bấm vào Micro để nói"}
          </p>
        </div>

        {/* Voice Recognition result */}
        <div className="w-full max-w-md min-h-[100px] bg-slate-50 border-4 border-black border-dashed rounded-2xl p-4 flex flex-col justify-center items-center">
          <p className="text-sm font-bold text-slate-400 mb-2">AI NGHE THẤY:</p>
          {spokenText ? (
            <p className={`text-2xl font-black ${speakStatus === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
              "{spokenText}"
            </p>
          ) : (
            <p className="text-xl font-medium text-slate-300 italic">Chưa có dữ liệu giọng nói</p>
          )}

          {speakStatus === 'correct' && <div className="mt-2 bg-green-200 px-4 py-2 rounded-full border-2 border-green-600 font-bold text-green-800 animate-bounce flex items-center gap-2"><Sparkles size={18} className="text-yellow-600 fill-yellow-600" /> Tuyệt vời! Phát âm chuẩn!</div>}
          {speakStatus === 'wrong' && <div className="mt-2 bg-red-200 px-4 py-2 rounded-full border-2 border-red-600 font-bold text-red-800 flex items-center gap-2"><XCircle size={18} className="text-red-600" /> Chưa đúng, thử nói lại nhé!</div>}
        </div>

        <button 
          onClick={() => playAudio(currentWord.en)} 
          className="mt-6 px-6 py-2 bg-blue-100 font-bold border-2 border-black rounded-xl hover:bg-blue-200"
        >
          <span className="flex items-center justify-center gap-2"><Volume2 size={18} /> Nghe lại âm chuẩn</span>
        </button>
      </div>
    </div>
  );
};

export default SpeakingPractice;
