// File: src/pages/GrammarPage.jsx
import React, { useState, useEffect } from 'react';
import SketchnoteTheory from '../components/grammar/SketchnoteTheory';
import SentenceBuilder from '../components/grammar/SentenceBuilder';
import AiAssistant from '../components/grammar/AiAssistant';
import QuizEngine from '../components/grammar/QuizEngine';

const GrammarPage = ({ topic, setXp, completeMilestone }) => {
  const [tab, setTab] = useState('theory');

  // Reset tab to theory when topic changes
  useEffect(() => {
    setTab('theory');
  }, [topic?.id]);

  if (!topic) return null;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in dark:text-slate-100 transition-colors duration-300">
      <div className={`${topic.color} dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 border-[4px] border-slate-800 rounded-[3rem] p-8 md:p-10 mb-10 shadow-[12px_12px_0_0_#1e293b] dark:shadow-[12px_12px_0_0_#020617]`}>
         <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800 dark:text-slate-100">{topic.title}</h2>
      </div>
      
      <div className="flex overflow-x-auto gap-3 mb-10 pb-2 scrollbar-hide shrink-0">
         <button 
           onClick={() => setTab('theory')} 
           className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 dark:border-slate-700 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617] cursor-pointer ${tab === 'theory' ? 'bg-slate-800 dark:bg-slate-700 text-white translate-y-1 shadow-none' : 'bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'}`}
         >
           Lý Thuyết
         </button>
         <button 
           onClick={() => setTab('sentence')} 
           className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 dark:border-slate-700 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617] cursor-pointer ${tab === 'sentence' ? 'bg-slate-800 dark:bg-slate-700 text-white translate-y-1 shadow-none' : 'bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'}`}
         >
           Xếp Câu
         </button>
         <button 
           onClick={() => setTab('ai')} 
           className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 dark:border-slate-700 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617] cursor-pointer ${tab === 'ai' ? 'bg-yellow-300 dark:bg-yellow-450 dark:text-slate-900 translate-y-1 shadow-none' : 'bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'}`}
         >
           Gia Sư AI
         </button>
         <button 
           onClick={() => setTab('exercise')} 
           className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 dark:border-slate-700 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617] cursor-pointer ${tab === 'exercise' ? 'bg-slate-800 dark:bg-slate-700 text-white translate-y-1 shadow-none' : 'bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'}`}
         >
           Làm Test
         </button>
      </div>

      {tab === 'theory' && topic.theory.map((s, i) => (
        <SketchnoteTheory key={i} section={s} idx={i} />
      ))}
      {tab === 'sentence' && (
        <SentenceBuilder 
          sentences={topic.sentenceGame} 
          setGlobalProgress={setXp} 
          onComplete={() => completeMilestone(topic.id, 25)}
        />
      )}
      {tab === 'ai' && (
        <AiAssistant topic={topic} sentences={topic.sentenceGame} />
      )}
      {tab === 'exercise' && (
        <QuizEngine 
          exercises={topic.exercises} 
          setGlobalProgress={setXp} 
          onComplete={() => completeMilestone(topic.id, 40)}
        />
      )}
    </div>
  );
};

export default GrammarPage;
