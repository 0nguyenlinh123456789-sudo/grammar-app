// File: src/components/oxford/TheoryTab.jsx
import React from 'react';
import { Volume2, Snail } from 'lucide-react';

const TheoryTab = ({ unitData }) => {
  const playWord = (word, rate = 0.9) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      u.rate = rate;
      window.speechSynthesis.speak(u);
    }
  };

  const getTypeBadgeClass = (type) => {
    const t = type ? type.trim().toLowerCase() : '';
    if (t.includes('danh từ') || t.includes('noun')) return 'bg-cyan-100 text-cyan-800 border-cyan-300';
    if (t.includes('động từ') || t.includes('verb')) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (t.includes('tính từ') || t.includes('adjective')) return 'bg-amber-100 text-amber-800 border-amber-300';
    if (t.includes('trạng từ') || t.includes('adverb')) return 'bg-rose-100 text-rose-800 border-rose-300';
    if (t.includes('giới từ') || t.includes('preposition')) return 'bg-purple-100 text-purple-800 border-purple-300';
    if (t.includes('cụm từ') || t.includes('phrase')) return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    return 'bg-slate-100 text-slate-700 border-slate-300';
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-10">
        <div className="bg-white rounded-3xl p-8 border-4 border-slate-800 shadow-[8px_8px_0_0_#1e293b]">
            <h2 className="text-3xl font-black text-slate-800 mb-2">{unitData.title}</h2>
            <p className="text-slate-500 font-bold text-lg border-b-4 border-dashed border-slate-200 pb-6">{unitData.description}</p>
            
            {unitData.theory.map((section, idx) => (
                <div key={idx} className="mt-8">
                    <h3 className="text-xl font-black text-indigo-600 bg-indigo-50 inline-block px-4 py-2 rounded-xl border-2 border-slate-800 mb-6 shadow-[2px_2px_0_0_#1e293b]">{section.heading}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.items.map((item, i) => (
                            <div key={i} className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 hover:border-slate-800 transition-all hover:-translate-y-0.5 group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xl md:text-2xl font-black text-slate-800 leading-tight">{item.word}</span>
                                        {item.type && (
                                          <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-lg border-2 ${getTypeBadgeClass(item.type)}`}>
                                            {item.type}
                                          </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button 
                                          onClick={() => playWord(item.word, 0.9)} 
                                          title="Nghe tốc độ thường"
                                          className="text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-xl transition-all cursor-pointer"
                                        >
                                            <Volume2 size={20} />
                                        </button>
                                        <button 
                                          onClick={() => playWord(item.word, 0.55)} 
                                          title="Nghe tốc độ chậm"
                                          className="text-amber-500 hover:text-amber-700 hover:bg-amber-50 p-2 rounded-xl transition-all cursor-pointer"
                                        >
                                            <Snail size={20} />
                                        </button>
                                    </div>
                                </div>
                                {item.phonetic && <p className="text-indigo-500 font-bold font-mono text-sm mb-1">{item.phonetic}</p>}
                                <p className="font-extrabold text-slate-600 mb-2">{item.vi}</p>
                                <p className="text-sm text-slate-500 italic bg-white p-3 rounded-xl border border-slate-200 border-dashed">Ex: {item.example}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default TheoryTab;

