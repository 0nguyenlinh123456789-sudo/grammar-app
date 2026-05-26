// File: src/pages/VocabVstepPage.jsx
import React, { useState, useEffect } from 'react';
import { Rocket, Layers, BookOpen, PenTool, Mic, Volume2, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import StoryWithHighlights from '../components/vocab/StoryWithHighlights';
import Flashcard from '../components/vocab/Flashcard';
import WritingPractice from '../components/vocab/WritingPractice';
import SpeakingPractice from '../components/vocab/SpeakingPractice';

const VocabVstepPage = ({ activeTopic, playAudio }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [learningMode, setLearningMode] = useState('flashcard'); // 'flashcard', 'story', 'writing', 'speaking'

  // Reset index when topic changes
  useEffect(() => {
    setCurrentWordIndex(0);
  }, [activeTopic?.id]);

  if (!activeTopic) {
    return <div className="p-10 font-bold text-center text-slate-400">Đang tải chủ đề từ vựng...</div>;
  }

  const currentWord = activeTopic.words[currentWordIndex];

  const handleNextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % activeTopic.words.length);
  };

  const handlePrevWord = () => {
    setCurrentWordIndex((prev) => (prev === 0 ? activeTopic.words.length - 1 : prev - 1));
  };

  return (
    <div className="w-full h-full max-w-6xl mx-auto flex flex-col items-center justify-start pb-20">
      
      {/* HEADER SECTION */}
      <div className="mb-8 text-center w-full max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 uppercase tracking-tight border-b-8 border-black inline-flex items-center justify-center gap-3 pb-2 mb-2 bg-white px-6 rounded-2xl shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <Rocket size={40} className="text-indigo-600" /> {activeTopic.title.replace(/^[^\s]+\s/, '')}
        </h1>
        <p className="text-slate-600 font-bold mt-4 text-base md:text-lg bg-yellow-100 border-2 border-black inline-block px-4 py-2 rounded-2xl">
          {activeTopic.description}
        </p>
      </div>

      {/* MODE CONTROLS */}
      <div className="w-full max-w-3xl flex flex-wrap md:flex-nowrap gap-2 md:gap-4 mb-8">
         <button 
           onClick={() => setLearningMode('flashcard')} 
           className={`flex-1 py-3 px-2 border-4 border-black rounded-xl font-black text-xs md:text-sm transition-all flex flex-col items-center justify-center gap-1 ${learningMode === 'flashcard' ? 'bg-blue-400 shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-y-[-4px]' : 'bg-white hover:bg-blue-100'}`}
         >
            <span>Bước 1</span>
            <span className="text-white text-shadow-black flex items-center gap-1"><Layers size={16}/> Nhận Diện</span>
         </button>
         <button 
           onClick={() => setLearningMode('story')} 
           className={`flex-1 py-3 px-2 border-4 border-black rounded-xl font-black text-xs md:text-sm transition-all flex flex-col items-center justify-center gap-1 ${learningMode === 'story' ? 'bg-green-400 shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-y-[-4px]' : 'bg-white hover:bg-green-100'}`}
         >
            <span>Bước 2</span>
            <span className="text-white text-shadow-black flex items-center gap-1"><BookOpen size={16}/> Ngữ Cảnh</span>
         </button>
         <button 
           onClick={() => setLearningMode('writing')} 
           className={`flex-1 py-3 px-2 border-4 border-black rounded-xl font-black text-xs md:text-sm transition-all flex flex-col items-center justify-center gap-1 ${learningMode === 'writing' ? 'bg-orange-400 shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-y-[-4px]' : 'bg-white hover:bg-orange-100'}`}
         >
            <span>Bước 3</span>
            <span className="text-white text-shadow-black flex items-center gap-1"><PenTool size={16}/> Luyện Viết</span>
         </button>
         <button 
           onClick={() => setLearningMode('speaking')} 
           className={`flex-1 py-3 px-2 border-4 border-black rounded-xl font-black text-xs md:text-sm transition-all flex flex-col items-center justify-center gap-1 ${learningMode === 'speaking' ? 'bg-purple-400 shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-y-[-4px]' : 'bg-white hover:bg-purple-100'}`}
         >
            <span>Bước 4</span>
            <span className="text-white text-shadow-black flex items-center gap-1"><Mic size={16}/> Luyện Nói</span>
         </button>
      </div>

      {/* RENDER MODES */}
      {learningMode === 'flashcard' && (
        <Flashcard 
          currentWordIndex={currentWordIndex}
          totalWords={activeTopic.words.length}
          currentWord={currentWord}
          playAudio={playAudio}
        />
      )}

      {learningMode === 'story' && (
        <div className="w-full max-w-4xl animate-fade-in space-y-6">
           <div className="bg-white border-4 border-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">
             <button 
               onClick={() => playAudio(activeTopic.storyEn)} 
               className="absolute top-4 right-4 bg-blue-400 text-white font-bold border-4 border-black px-4 py-2 rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-blue-500 hover:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
             >
               <Volume2 size={18} /> Đọc Truyện
             </button>
             <h3 className="text-2xl font-black mb-8 mt-4 bg-green-300 inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg transform -rotate-2">
               <BookOpen size={22} /> Truyện Thấm Ngữ Cảnh
             </h3>
             
             <div className="text-xl md:text-2xl leading-loose md:leading-loose font-medium text-slate-800">
                <StoryWithHighlights 
                   storyText={activeTopic.storyEn} 
                   vocabList={activeTopic.words} 
                />
             </div>
           </div>

           <div className="bg-slate-800 border-4 border-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-white">
             <h3 className="text-2xl font-black mb-6 bg-red-400 text-black inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg transform rotate-1">
               <Globe size={22} /> Bản dịch
             </h3>
             
             <div className="text-lg md:text-xl leading-relaxed font-medium">
                <StoryWithHighlights 
                   storyText={activeTopic.storyVi} 
                   vocabList={activeTopic.words} 
                />
             </div>
           </div>
        </div>
      )}

      {learningMode === 'writing' && (
        <WritingPractice
          currentWordIndex={currentWordIndex}
          totalWords={activeTopic.words.length}
          currentWord={currentWord}
          playAudio={playAudio}
        />
      )}

      {learningMode === 'speaking' && (
        <SpeakingPractice
          currentWordIndex={currentWordIndex}
          totalWords={activeTopic.words.length}
          currentWord={currentWord}
          playAudio={playAudio}
        />
      )}

      {/* STEP NAVIGATION CONTROLS */}
      {learningMode !== 'story' && (
        <div className="flex gap-4 md:gap-6 mt-10 w-full max-w-3xl justify-between">
          <button 
            onClick={handlePrevWord} 
            className="flex-1 py-4 bg-white border-4 border-black rounded-2xl font-black text-xl hover:bg-slate-100 shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ChevronLeft size={24} /> Từ Trước
          </button>
          <button 
            onClick={handleNextWord} 
            className="flex-1 py-4 bg-yellow-400 border-4 border-black rounded-2xl font-black text-xl hover:bg-yellow-500 shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Từ Tiếp <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VocabVstepPage;
