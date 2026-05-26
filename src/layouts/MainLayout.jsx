// File: src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { BookOpen, Flame, ChevronDown, Menu, Book, BookMarked, Camera, Home, Search } from 'lucide-react';

const MainLayout = ({
  xp,
  appMode,
  setAppMode,
  topicId,
  setTopicId,
  activeVocabCategory,
  setActiveVocabCategory,
  oxfordUnitId,
  setOxfordUnitId,
  vstepTopicId,
  setVstepTopicId,
  vstepTopics,
  parsedGrammarData,
  courseData,
  children
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVocabMenuOpen, setIsVocabMenuOpen] = useState(true); // Default open to make experience smoother
  const [vstepSearch, setVstepSearch] = useState('');

  const selectMode = (mode) => {
    setAppMode(mode);
    setMenuOpen(false);
  };

  // Filter VSTEP topics based on search query
  const filteredVstepTopics = vstepTopics.filter(t => 
    t.title.toLowerCase().includes(vstepSearch.toLowerCase()) || 
    t.description.toLowerCase().includes(vstepSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f0ec] flex flex-col md:flex-row font-sans text-slate-800 selection:bg-yellow-300">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden bg-white border-b-4 border-slate-800 p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
        <div className="font-black text-xl flex items-center gap-2">
          <img src="/logo.svg" alt="Grammar Pro Logo" className="w-8 h-8 rounded-lg border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] p-0.5 bg-[#fdfbf7]" /> Grammar Pro
        </div>
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="border-2 border-slate-800 p-1 rounded-lg shadow-sm bg-white animate-bounce-slow"
        >
          <Menu/>
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky top-0 left-0 h-screen w-80 md:w-96 bg-[#fdfbf7] border-r-[4px] border-slate-800 z-40 transition-transform flex flex-col shadow-[4px_0_0_0_#1e293b]`}>
         
         <div className="p-6 border-b-[4px] border-slate-800 bg-white font-black text-2xl hidden md:flex items-center gap-3">
           <img src="/logo.svg" alt="Grammar Pro Logo" className="w-12 h-12 rounded-xl border-[3px] border-slate-800 shadow-[3px_3px_0px_0px_#1e293b] p-1 bg-[#fdfbf7]" /> 
           Grammar Pro
         </div>
         
         <div className="p-6 border-b-2 border-slate-100 font-black text-emerald-700 bg-emerald-50 flex justify-between items-center text-lg">
           <span className="flex items-center gap-2"><Flame className="text-rose-500"/> Năng lượng:</span> 
           <span>{xp} XP</span>
         </div>
         
         {/* --- NAVIGATION TOGGLES --- */}
         <div className="flex flex-col gap-2 p-4 border-b-[4px] border-slate-200 bg-white">
           
           <button 
             onClick={() => selectMode('grammar')}
             className={`p-3 font-black border-4 border-slate-800 rounded-xl transition-all flex items-center justify-center gap-2 ${appMode === 'grammar' ? 'bg-yellow-300 shadow-none translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#1e293b]'}`}
           >
             <BookOpen size={20} /> HỌC NGỮ PHÁP
           </button>
           
           {/* VOCAB DROPDOWN */}
           <div className="flex flex-col gap-2">
             <button 
               onClick={() => {
                 setAppMode('vocab'); 
                 setIsVocabMenuOpen(!isVocabMenuOpen);
               }}
               className={`relative p-3 font-black border-4 border-slate-800 rounded-xl transition-all flex justify-center items-center gap-2 ${appMode === 'vocab' ? 'bg-green-400 text-white shadow-none translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#1e293b]'}`}
             >
               <Flame size={20} />
               <span>TỪ VỰNG</span>
               <ChevronDown className={`absolute right-4 transition-transform ${isVocabMenuOpen ? 'rotate-180' : ''}`} />
             </button>

             {isVocabMenuOpen && (
               <div className="flex flex-col gap-2 ml-6 mt-1 animate-in fade-in slide-in-from-top-2">
                 <button
                   onClick={() => { 
                     setActiveVocabCategory("VSTEP"); 
                     selectMode('vocab');
                   }}
                   className={`p-2 font-black border-[3px] border-slate-800 rounded-xl transition-all flex justify-center items-center text-center gap-2 ${activeVocabCategory === 'VSTEP' && appMode === 'vocab' ? 'bg-yellow-300 shadow-none translate-y-1' : 'bg-white shadow-[2px_2px_0_0_#1e293b] hover:bg-slate-50'}`}
                 >
                   <BookMarked size={18} className="text-blue-500" /> VSTEP
                 </button>
                 <button
                   onClick={() => { 
                     setActiveVocabCategory("OXFORD"); 
                     selectMode('vocab');
                   }}
                   className={`p-2 font-black border-[3px] border-slate-800 rounded-xl transition-all flex justify-center items-center text-center gap-2 ${activeVocabCategory === 'OXFORD' && appMode === 'vocab' ? 'bg-yellow-300 shadow-none translate-y-1' : 'bg-white shadow-[2px_2px_0_0_#1e293b] hover:bg-slate-50'}`}
                 >
                   <Book size={18} className="text-red-500" /> OXFORD
                 </button>
               </div>
             )}
           </div>

           <button 
             onClick={() => selectMode('scanner')}
             className={`p-3 font-black border-4 border-slate-800 rounded-xl transition-all flex items-center justify-center gap-2 ${appMode === 'scanner' ? 'bg-blue-400 text-white shadow-none translate-y-1' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50'}`}
           >
             <Camera size={20} /> QUÉT ẢNH AI
           </button>
         
         </div>

         {/* --- CONTEXT SENSITIVE SIDEBAR ITEMS --- */}
         <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24 custom-scrollbar">
            
            {/* GRAMMAR TOPICS LIST */}
            {appMode === 'grammar' && (
              <>
                <button 
                  onClick={() => {
                    setTopicId(null); 
                    setMenuOpen(false);
                  }} 
                  className={`w-full text-left font-black p-4 border-[4px] border-slate-800 rounded-2xl mb-2 text-lg transition-all flex items-center gap-2 ${!topicId ? 'bg-cyan-200 shadow-[4px_4px_0px_0px_#1e293b] translate-x-2' : 'bg-white hover:bg-slate-50'}`}
                >
                  <Home size={20} className="text-cyan-600" /> Trang Chủ
                </button>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2 mb-2 mt-4">21 Chuyên Đề Ngữ Pháp</div>
                {parsedGrammarData.map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => {
                      setTopicId(t.id); 
                      setMenuOpen(false);
                    }} 
                    className={`w-full text-left font-bold p-4 border-[4px] border-slate-800 rounded-2xl truncate text-lg transition-all mb-2 ${topicId === t.id ? 'bg-yellow-200 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b]' : 'bg-white hover:bg-slate-50'}`}
                  >
                    {t.title}
                  </button>
                ))}
              </>
            )}

            {/* VSTEP TOPICS LIST */}
            {appMode === 'vocab' && activeVocabCategory === 'VSTEP' && (
              <>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2 mb-2 mt-4">Từ Vựng VSTEP</div>
                
                <div className="relative mb-4">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input 
                    type="text" 
                    placeholder="Tìm nhanh chủ đề từ..." 
                    value={vstepSearch}
                    onChange={(e) => setVstepSearch(e.target.value)}
                    className="w-full p-3 pl-11 border-4 border-slate-800 rounded-xl font-bold outline-none focus:bg-yellow-100 transition-colors text-sm shadow-inner"
                  />
                </div>

                {filteredVstepTopics.length > 0 ? (
                  filteredVstepTopics.map(t => (
                    <button 
                      key={t.id} 
                      onClick={() => {
                        setVstepTopicId(t.id); 
                        setMenuOpen(false);
                      }} 
                      className={`w-full text-left font-bold p-4 border-[4px] border-slate-800 rounded-2xl transition-all mb-2 flex flex-col gap-1 ${vstepTopicId === t.id ? 'bg-yellow-200 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b]' : 'bg-white hover:bg-slate-50'}`}
                    >
                      <span className="text-sm md:text-base leading-tight">{t.title}</span>
                      <span className="text-xs font-medium text-slate-500">{t.words.length} từ vựng</span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm font-bold text-slate-400 text-center py-4">Không tìm thấy chủ đề nào!</p>
                )}
              </>
            )}

            {/* OXFORD VOCAB UNITS LIST */}
            {appMode === 'vocab' && activeVocabCategory === 'OXFORD' && (
              <>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2 mb-2 mt-4">60 Units Oxford</div>
                {courseData.map(unit => (
                  <button 
                    key={unit.id} 
                    onClick={() => { 
                      setOxfordUnitId(unit.id); 
                      setMenuOpen(false); 
                    }} 
                    className={`w-full text-left font-bold p-4 border-[4px] border-slate-800 rounded-2xl truncate text-lg transition-all mb-2 ${oxfordUnitId === unit.id ? 'bg-yellow-200 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b]' : 'bg-white hover:bg-slate-50'}`}
                  >
                    {unit.title}
                  </button>
                ))}
              </>
            )}

         </div>
      </aside>

      {/* --- MAIN CONTENT PANEL --- */}
      <main className="flex-1 p-4 md:p-10 h-screen overflow-y-auto bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] custom-scrollbar">
        {children}
      </main>

    </div>
  );
};

export default MainLayout;
