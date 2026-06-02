// File: src/components/oxford/TheoryTab.jsx
import React, { useState, useEffect } from 'react';
import { Volume2, Snail, BookOpen, MessageSquare, Lightbulb } from 'lucide-react';

const TheoryTab = ({ unitData }) => {
  const [activeSubTab, setActiveSubTab] = useState('core');

  useEffect(() => {
    setActiveSubTab('core');
  }, [unitData?.id]);

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

  if (!unitData) return null;

  // Retrieve subgroups from data structure
  const coreVocab = unitData.theory?.coreVocab || [];
  const practicalUsage = unitData.theory?.practicalUsage || [];
  const discoveryCorner = unitData.theory?.discoveryCorner || [];

  return (
    <div className="space-y-6 animate-in fade-in pb-10 dark:text-slate-100 transition-colors duration-300">
        {/* Main Unit Study Guide Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border-4 border-slate-800 dark:border-slate-700 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#020617] transition-all">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">{unitData.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-base md:text-lg border-b-4 border-dashed border-slate-200 dark:border-slate-800 pb-4 mb-6">{unitData.description}</p>
            
            {/* Sub-navigation buttons for the 3 visual study tiers */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button
                    onClick={() => setActiveSubTab('core')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm md:text-base border-4 transition-all cursor-pointer ${activeSubTab === 'core' ? 'bg-indigo-500 text-white border-slate-800 dark:border-slate-750 shadow-none translate-y-0.5' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-350 shadow-[3px_3px_0_0_#e2e8f0] dark:shadow-[3px_3px_0_0_#020617]'}`}
                >
                    <BookOpen size={18} /> 📘 Từ vựng cốt lõi
                </button>
                <button
                    onClick={() => setActiveSubTab('usage')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm md:text-base border-4 transition-all cursor-pointer ${activeSubTab === 'usage' ? 'bg-emerald-500 text-white border-slate-800 dark:border-slate-750 shadow-none translate-y-0.5' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-350 shadow-[3px_3px_0_0_#e2e8f0] dark:shadow-[3px_3px_0_0_#020617]'}`}
                >
                    <MessageSquare size={18} /> 💬 Ứng dụng thực tế
                </button>
                <button
                    onClick={() => setActiveSubTab('discovery')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm md:text-base border-4 transition-all cursor-pointer ${activeSubTab === 'discovery' ? 'bg-amber-400 text-slate-900 border-slate-800 dark:border-slate-750 shadow-none translate-y-0.5' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-350 shadow-[3px_3px_0_0_#e2e8f0] dark:shadow-[3px_3px_0_0_#020617]'}`}
                >
                    <Lightbulb size={18} /> 💡 Góc khám phá
                </button>
            </div>

            {/* Sub-tab 1: Core Vocabulary */}
            {activeSubTab === 'core' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-3 duration-250">
                  <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border-2 border-dashed border-indigo-200 dark:border-indigo-900 p-5 rounded-2xl text-slate-700 dark:text-slate-350 font-bold leading-relaxed text-sm md:text-base italic">
                    🚀 Nhấn nút hình loa để nghe phát âm chính xác của từ. Học các từ vựng này thật kỹ trước khi làm các trò chơi gõ từ và ghép từ nhé!
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {coreVocab.map((item, i) => (
                          <div key={i} className="bg-slate-50/50 dark:bg-slate-850/50 p-5 rounded-2xl border-4 border-slate-800 dark:border-slate-700 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:border-slate-800 dark:hover:border-slate-600 transition-all hover:-translate-y-0.5 group">
                              <div className="flex items-center justify-between mb-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight">{item.word}</span>
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
                                        className="text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 p-2 rounded-xl transition-all cursor-pointer"
                                      >
                                          <Volume2 size={20} />
                                      </button>
                                      <button 
                                        onClick={() => playWord(item.word, 0.55)} 
                                        title="Nghe tốc độ chậm"
                                        className="text-amber-500 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/50 p-2 rounded-xl transition-all cursor-pointer"
                                      >
                                          <Snail size={20} />
                                      </button>
                                  </div>
                              </div>
                              {item.phonetic && <p className="text-indigo-500 dark:text-indigo-450 font-bold font-mono text-sm mb-1">{item.phonetic}</p>}
                              <p className="font-extrabold text-slate-700 dark:text-slate-200 mb-2">{item.vi}</p>
                              
                              {/* Rich detailed collocations and synonyms */}
                              {item.collocations && item.collocations.length > 0 && (
                                <div className="mt-2 mb-1 text-xs text-indigo-600 dark:text-indigo-400 font-bold flex flex-wrap gap-1.5">
                                  <span className="bg-indigo-100 dark:bg-indigo-950/60 px-2 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-900 shrink-0 select-none">Cụm từ:</span>
                                  <span className="italic">{item.collocations.join(', ')}</span>
                                </div>
                              )}
                              {item.synonyms && (
                                <div className="mb-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold flex flex-wrap gap-1.5">
                                  <span className="bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-900 shrink-0 select-none">Đồng nghĩa:</span>
                                  <span className="italic">{item.synonyms}</span>
                                </div>
                              )}

                              <p className="text-sm text-slate-500 dark:text-slate-400 italic bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed mt-2">Ex: {item.example}</p>
                          </div>
                      ))}
                      {coreVocab.length === 0 && (
                        <div className="text-center font-bold py-10 text-slate-400">Đang tải từ vựng cốt lõi...</div>
                      )}
                  </div>
              </div>
            )}

            {/* Sub-tab 2: Practical Usage */}
            {activeSubTab === 'usage' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-3 duration-250">
                  {practicalUsage.map((section, idx) => (
                      <div key={idx} className="bg-slate-50/50 dark:bg-slate-850/50 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800">
                          <h3 className="text-lg md:text-xl font-black text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/40 inline-block px-4 py-2 rounded-xl border-2 border-slate-800 dark:border-slate-700 mb-4 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]">{section.heading}</h3>
                          
                          {section.intro && (
                            <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border-2 border-dashed border-emerald-200 dark:border-emerald-900 p-4 rounded-xl mb-4 text-slate-700 dark:text-slate-350 font-bold leading-relaxed text-sm md:text-base italic">
                              💬 {section.intro}
                            </div>
                          )}

                          {section.details && section.details.length > 0 && (
                            <div className="grid grid-cols-1 gap-4">
                              {section.details.map((detail, dIdx) => (
                                <div key={dIdx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border-4 border-slate-800 dark:border-slate-700 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] flex flex-col sm:flex-row gap-3 items-start sm:items-center transition-all hover:-translate-y-0.5">
                                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border-2 border-slate-800 dark:border-slate-700 shrink-0 select-none">
                                    {detail.title}
                                  </span>
                                  <span className="text-sm md:text-base font-bold text-slate-600 dark:text-slate-300 leading-relaxed break-words max-w-full whitespace-pre-line">
                                    {detail.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                  ))}
                  {practicalUsage.length === 0 && (
                    <div className="text-center font-bold py-10 text-slate-400">Ứng dụng thực tế của bài học đang được chuẩn bị...</div>
                  )}
              </div>
            )}

            {/* Sub-tab 3: Discovery Corner */}
            {activeSubTab === 'discovery' && (
              <div className="space-y-6 animate-in slide-in-from-bottom-3 duration-250">
                  {discoveryCorner.map((section, idx) => (
                      <div key={idx} className="bg-slate-50/50 dark:bg-slate-850/50 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800">
                          <h3 className="text-lg md:text-xl font-black text-amber-600 dark:text-amber-550 bg-amber-50 dark:bg-amber-950/40 inline-block px-4 py-2 rounded-xl border-2 border-slate-800 dark:border-slate-700 mb-4 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]">{section.heading}</h3>
                          
                          {section.intro && (
                            <div className="bg-amber-50/30 dark:bg-amber-950/10 border-2 border-dashed border-amber-200 dark:border-amber-900 p-4 rounded-xl mb-4 text-slate-700 dark:text-slate-350 font-bold leading-relaxed text-sm md:text-base italic">
                              💡 {section.intro}
                            </div>
                          )}

                          {section.details && section.details.length > 0 && (
                            <div className="grid grid-cols-1 gap-4">
                              {section.details.map((detail, dIdx) => (
                                <div key={dIdx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border-4 border-slate-800 dark:border-slate-700 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] flex flex-col sm:flex-row gap-3 items-start sm:items-center transition-all hover:-translate-y-0.5">
                                  <span className="text-sm font-black text-amber-600 dark:text-amber-550 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border-2 border-slate-800 dark:border-slate-700 shrink-0 select-none">
                                    {detail.title}
                                  </span>
                                  <span className="text-sm md:text-base font-bold text-slate-600 dark:text-slate-300 leading-relaxed break-words max-w-full whitespace-pre-line">
                                    {detail.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                  ))}
                  {discoveryCorner.length === 0 && (
                    <div className="text-center font-bold py-10 text-slate-400">Góc khám phá cấu tạo từ của bài học đang được chuẩn bị...</div>
                  )}
              </div>
            )}
        </div>
    </div>
  );
};

export default TheoryTab;

