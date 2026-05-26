// File: src/pages/GrammarPage.jsx
import React, { useState, useEffect } from 'react';
import SketchnoteTheory from '../components/grammar/SketchnoteTheory';
import SentenceBuilder from '../components/grammar/SentenceBuilder';
import AiAssistant from '../components/grammar/AiAssistant';
import QuizEngine from '../components/grammar/QuizEngine';

const GrammarPage = ({ topic, setXp }) => {
  const [tab, setTab] = useState('theory');

  // Reset tab to theory when topic changes
  useEffect(() => {
    setTab('theory');
  }, [topic?.id]);

  if (!topic) return null;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in">
      <div className={`${topic.color} border-[4px] border-slate-800 rounded-[3rem] p-8 md:p-10 mb-10 shadow-[12px_12px_0_0_#1e293b]`}>
         <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{topic.title}</h2>
      </div>
      
      <div className="flex overflow-x-auto gap-3 mb-10 pb-2 scrollbar-hide">
         <button 
           onClick={() => setTab('theory')} 
           className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] ${tab === 'theory' ? 'bg-slate-800 text-white translate-y-1 shadow-none' : 'bg-white hover:bg-slate-50'}`}
         >
           Lý Thuyết
         </button>
         <button 
           onClick={() => setTab('sentence')} 
           className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] ${tab === 'sentence' ? 'bg-slate-800 text-white translate-y-1 shadow-none' : 'bg-white hover:bg-slate-50'}`}
         >
           Xếp Câu
         </button>
         <button 
           onClick={() => setTab('ai')} 
           className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] ${tab === 'ai' ? 'bg-yellow-300 text-slate-900 translate-y-1 shadow-none' : 'bg-white hover:bg-slate-50'}`}
         >
           Gia Sư AI
         </button>
         <button 
           onClick={() => setTab('exercise')} 
           className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] ${tab === 'exercise' ? 'bg-slate-800 text-white translate-y-1 shadow-none' : 'bg-white hover:bg-slate-50'}`}
         >
           Làm Test
         </button>
      </div>

      {tab === 'theory' && topic.theory.map((s, i) => (
        <SketchnoteTheory key={i} section={s} idx={i} />
      ))}
      {tab === 'sentence' && (
        <SentenceBuilder sentences={topic.sentenceGame} setGlobalProgress={setXp} />
      )}
      {tab === 'ai' && (
        <AiAssistant topic={topic} sentences={topic.sentenceGame} />
      )}
      {tab === 'exercise' && (
        <QuizEngine exercises={topic.exercises} setGlobalProgress={setXp} />
      )}
    </div>
  );
};

export default GrammarPage;
