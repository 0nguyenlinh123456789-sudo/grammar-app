// File: src/pages/VocabVstepPage.jsx
import { useState, useEffect } from 'react';
import { Rocket, Layers, BookOpen, PenTool, Mic, Volume2, Globe, ChevronLeft, ChevronRight, Zap, Drama } from 'lucide-react';
import StoryWithHighlights from '../components/vocab/StoryWithHighlights';
import Flashcard from '../components/vocab/Flashcard';
import WritingPractice from '../components/vocab/WritingPractice';
import SpeakingPractice from '../components/vocab/SpeakingPractice';
import PhraseLearningMode from '../components/vocab/PhraseLearningMode';
import ActionScenarioMode from '../components/vocab/ActionScenarioMode';
import MascotLuna from '../components/common/MascotLuna';

const MODES = [
  { key: 'flashcard', label: 'Nhận Diện', step: 1, icon: () => <span className="text-xl leading-none">🐰</span>, color: 'bg-blue-400', hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/30', activeText: 'text-white', inactiveIcon: '' },
  { key: 'phrases',   label: 'Cụm Câu',  step: 2, icon: () => <span className="text-xl leading-none">⚡</span>, color: 'bg-yellow-400', hoverColor: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/30', activeText: 'text-slate-900', inactiveIcon: '' },
  { key: 'scenario',  label: 'Hành Động',step: 3, icon: () => <span className="text-xl leading-none">🎬</span>, color: 'bg-purple-400', hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/30', activeText: 'text-white', inactiveIcon: '' },
  { key: 'story',     label: 'Câu Chuyện',step:4, icon: () => <span className="text-xl leading-none">⛺</span>, color: 'bg-green-400', hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/30', activeText: 'text-white', inactiveIcon: '' },
  { key: 'writing',   label: 'Luyện Viết',step: 5, icon: () => <span className="text-xl leading-none">✍️</span>, color: 'bg-orange-400', hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/30', activeText: 'text-white', inactiveIcon: '' },
  { key: 'speaking',  label: 'Luyện Nói', step: 6, icon: () => <span className="text-xl leading-none">🎤</span>, color: 'bg-pink-400', hoverColor: 'hover:bg-pink-50 dark:hover:bg-pink-900/30', activeText: 'text-white', inactiveIcon: '' },
];

const VocabVstepPage = ({ activeTopic, playAudio, completedMilestones = [], completeMilestone }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [learningMode, setLearningMode] = useState('flashcard');
  const [mascotMood, setMascotMood] = useState('idle');
  const [mascotContext, setMascotContext] = useState('vocab');

  useEffect(() => {
    setCurrentWordIndex(0);
    setLearningMode('flashcard');
  }, [activeTopic?.id]);

  if (!activeTopic) {
    return (
      <div className="p-10 font-bold text-center text-slate-400 flex flex-col items-center gap-4">
        <MascotLuna mood="thinking" context="loading" size={80} />
        <p>Đang tải chủ đề từ vựng...</p>
      </div>
    );
  }

  const currentWord = activeTopic.words[currentWordIndex];
  const isCompleted = completedMilestones.includes(activeTopic.id);
  const totalWords = activeTopic.words.length;

  const handleNextWord = () => setCurrentWordIndex((prev) => (prev + 1) % totalWords);
  const handlePrevWord = () => setCurrentWordIndex((prev) => (prev === 0 ? totalWords - 1 : prev - 1));

  const handleComplete = () => {
    completeMilestone(activeTopic.id, 20);
    setMascotMood('celebrate');
    setMascotContext('correct');
    setTimeout(() => { setMascotMood('happy'); }, 2500);
    setTimeout(() => { setMascotMood('idle'); }, 5000);
  };

  const handleModeChange = (modeKey) => {
    setLearningMode(modeKey);
    if (modeKey === 'phrases') { setMascotContext('vocab'); setMascotMood('happy'); }
    else if (modeKey === 'scenario') { setMascotContext('grammar'); setMascotMood('thinking'); }
    else if (modeKey === 'story') { setMascotContext('vocab'); setMascotMood('idle'); }
    else { setMascotContext('vocab'); setMascotMood('idle'); }
  };

  // Progress bar
  const progress = Math.round(((currentWordIndex + 1) / totalWords) * 100);

  const needsWordNav = ['writing', 'speaking'].includes(learningMode);

  return (
    <div className="w-full h-full max-w-5xl mx-auto flex flex-col items-center justify-start pb-20">

      {/* HEADER SECTION */}
      <div className="mb-6 text-center w-full max-w-3xl flex flex-col items-center gap-3">
        {/* Topic title with Luna */}
        <div className="flex items-center gap-4 w-full justify-center">
          <MascotLuna
            mood={mascotMood}
            context={mascotContext}
            size={64}
            direction="right"
            className="flex-shrink-0"
          />
          <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight 
            border-b-8 border-black dark:border-slate-500 inline-flex items-center justify-center gap-3 pb-2 mb-2 
            bg-white dark:bg-slate-800 px-6 rounded-2xl shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <Rocket size={32} className="text-indigo-600 dark:text-indigo-400" />
            {activeTopic.title.replace(/^[^\s]+\s/, '')}
          </h1>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 font-bold mt-1 text-sm md:text-base 
          bg-yellow-100 dark:bg-slate-700 border-2 border-black dark:border-slate-500 
          inline-block px-4 py-2 rounded-2xl">
          {activeTopic.description}
        </p>



        {/* Complete button */}
        <div className="mt-2">
          {isCompleted ? (
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-100 dark:bg-emerald-900/50 
              text-emerald-800 dark:text-emerald-300 font-black border-[3px] border-emerald-800 
              dark:border-emerald-600 rounded-xl shadow-[3px_3px_0_0_#065f46] text-sm">
              ✓ ĐÃ HOÀN THÀNH CHẶNG NÀY (+20 XP)
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="animate-pulse-glow inline-flex items-center gap-2 px-6 py-2 bg-yellow-300 dark:bg-yellow-500 
                text-slate-900 font-black border-[3px] border-slate-800 dark:border-slate-600 rounded-xl 
                shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-yellow-400 active:translate-y-0.5 
                active:shadow-none transition-all cursor-pointer text-sm"
            >
              🌟 ĐÁNH DẤU HOÀN THÀNH (+20 XP)
            </button>
          )}
        </div>
      </div>

      {/* MODE CONTROLS — 6 Tabs */}
      <div className="w-full max-w-3xl grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          const isActive = learningMode === mode.key;
          return (
            <button
              key={mode.key}
              onClick={() => handleModeChange(mode.key)}
              className={`
                py-2 px-1 border-4 border-black dark:border-slate-600 rounded-xl font-black text-xs 
                transition-all flex flex-col items-center justify-center gap-0.5
                ${isActive
                  ? `${mode.color} shadow-none translate-y-[2px] ${mode.activeText}`
                  : `bg-white dark:bg-slate-800 ${mode.hoverColor} text-slate-700 dark:text-slate-200 shadow-[3px_3px_0_0_rgba(0,0,0,1)]`
                }
              `}
            >
              <span className={`text-[10px] ${isActive ? 'opacity-80' : 'text-slate-400 dark:text-slate-500'}`}>
                Bước {mode.step}
              </span>
              <div className={isActive ? mode.activeText : mode.inactiveIcon}>
                <Icon />
              </div>
              <span className="leading-tight text-center">{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* RENDER MODES */}
      {learningMode === 'flashcard' && (
        <Flashcard
          currentWordIndex={currentWordIndex}
          totalWords={totalWords}
          currentWord={currentWord}
          playAudio={playAudio}
          onNext={handleNextWord}
          onPrev={handlePrevWord}
          onWordChange={setCurrentWordIndex}
        />
      )}

      {learningMode === 'phrases' && (
        <PhraseLearningMode
          activeTopic={activeTopic}
          playAudio={playAudio}
          currentWordIndex={currentWordIndex}
          onWordChange={setCurrentWordIndex}
        />
      )}

      {learningMode === 'scenario' && (
        <ActionScenarioMode
          activeTopic={activeTopic}
          playAudio={playAudio}
        />
      )}

      {learningMode === 'story' && (
        !activeTopic.storyEn ? (
          <div className="w-full max-w-4xl p-10 font-bold text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 animate-fade-in mt-4">
            <p className="text-3xl mb-4">📖🚧</p>
            <p className="text-xl">Dữ liệu Câu Chuyện cho chủ đề này đang được biên soạn!</p>
            <p className="text-sm mt-2 font-normal opacity-70">Hãy thử lại sau nhé.</p>
          </div>
        ) : (
          <div className="w-full max-w-4xl animate-fade-in space-y-6">
            {/* Story image panel header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-4 text-white border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex items-center gap-4">
              <div className="text-4xl">{activeTopic.title.match(/^[^\s]+/)?.[0] || '📖'}</div>
              <div>
                <h2 className="font-black text-xl">Câu Chuyện Nhớ Từ</h2>
                <p className="text-white/80 text-sm font-bold">Tất cả {totalWords} từ xuất hiện trong câu chuyện này!</p>
              </div>
              <button
                onClick={() => playAudio(activeTopic.storyEn)}
                className="ml-auto bg-white/20 border-2 border-white/50 rounded-xl px-4 py-2 font-bold text-sm flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                <Volume2 size={16} /> Nghe
              </button>
            </div>

            {/* English story */}
            <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black mb-6 bg-green-300 dark:bg-green-800 dark:text-white inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg transform -rotate-1">
                <BookOpen size={20} /> 📖 Story (English)
              </h3>
              <div className="text-lg md:text-xl leading-loose font-medium text-slate-800 dark:text-slate-100 story-text">
                <StoryWithHighlights
                  storyText={activeTopic.storyEn}
                  vocabList={activeTopic.words}
                />
              </div>
            </div>

            {/* Vietnamese translation */}
            <div className="bg-slate-800 dark:bg-slate-900 border-4 border-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-white">
              <h3 className="text-xl font-black mb-6 bg-red-400 text-black inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg transform rotate-1">
                <Globe size={20} /> 🇻🇳 Bản Dịch
              </h3>
              <div className="text-lg md:text-xl leading-relaxed font-medium story-text-vi">
                <StoryWithHighlights
                  storyText={activeTopic.storyVi}
                  vocabList={activeTopic.words}
                />
              </div>
            </div>
          </div>
        )
      )}

      {learningMode === 'writing' && (
        <WritingPractice
          currentWordIndex={currentWordIndex}
          totalWords={totalWords}
          currentWord={currentWord}
          playAudio={playAudio}
          onWordChange={setCurrentWordIndex}
        />
      )}

      {learningMode === 'speaking' && (
        <SpeakingPractice
          currentWordIndex={currentWordIndex}
          totalWords={totalWords}
          currentWord={currentWord}
          playAudio={playAudio}
          onWordChange={setCurrentWordIndex}
        />
      )}

      {/* NAVIGATION — only for word-by-word modes */}
      {needsWordNav && (
        <div className="flex gap-4 md:gap-6 mt-10 w-full max-w-3xl justify-between">
          <button
            onClick={handlePrevWord}
            className="flex-1 py-4 bg-white dark:bg-slate-700 border-4 border-black dark:border-slate-500 
              rounded-2xl font-black text-xl text-slate-800 dark:text-white
              hover:bg-slate-100 dark:hover:bg-slate-600 
              shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] 
              transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ChevronLeft size={24} /> Từ Trước
          </button>
          <button
            onClick={handleNextWord}
            className="flex-1 py-4 bg-yellow-400 border-4 border-black rounded-2xl font-black text-xl 
              hover:bg-yellow-500 shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] 
              transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Từ Tiếp <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VocabVstepPage;
