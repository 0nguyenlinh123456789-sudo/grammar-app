// File: src/components/oxford/TheoryTab.jsx
import React from 'react';
import { Volume2 } from 'lucide-react';

const TheoryTab = ({ unitData }) => {
  const playWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
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
                            <div key={i} className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 hover:border-slate-800 transition-colors group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-black text-slate-800">{item.word}</span>
                                        {item.type && <span className="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-md">{item.type}</span>}
                                    </div>
                                    <button 
                                      onClick={() => playWord(item.word)} 
                                      className="text-indigo-400 hover:text-indigo-600 opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Volume2 size={24} />
                                    </button>
                                </div>
                                {item.phonetic && <p className="text-indigo-500 font-medium mb-1">{item.phonetic}</p>}
                                <p className="font-bold text-slate-600 mb-2">{item.vi}</p>
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
