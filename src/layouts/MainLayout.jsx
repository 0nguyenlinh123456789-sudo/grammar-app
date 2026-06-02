// File: src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { BookOpen, Flame, ChevronDown, Menu, Book, BookMarked, Camera, Home, Search, Sun, Moon, RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';

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
  oxfordBooks = [],
  activeOxfordBookId = 'elementary',
  setActiveOxfordBookId,
  completedMilestones = [],
  theme = 'light',
  setTheme,
  resetRoadmap,
  streak = 0,
  children
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVocabMenuOpen, setIsVocabMenuOpen] = useState(true); // Default open to make experience smoother
  const [vstepSearch, setVstepSearch] = useState('');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Mascot Scholar Bunny quotes (universal - no "bé yêu")
  const mascotQuotes = [
    "Chào mừng bạn! Hôm nay chúng mình cùng học tiếng Anh thật vui nhé! 🐰✨",
    "Cố lên nào! Mỗi chặng học sẽ giúp bạn nâng tầm trình độ tiếng Anh đấy! 🌟",
    "Bạn có biết: Duy trì chuỗi học tập mỗi ngày giúp ghi nhớ từ vựng lâu hơn 300% không? 📖🔥",
    "Tớ là Bunny 🐰, rất vui được làm bạn đồng hành cùng bạn học tập mỗi ngày!",
    "Bảo vệ đôi mắt bằng cách bật Chế độ tối khi học bài ban đêm nhé! 🌙🕶️",
    "Bạn làm tốt lắm! Sẽ có pháo hoa Confetti chúc mừng khi hoàn thành bài học nha! 🎉"
  ];
  
  const [mascotQuoteIndex, setMascotQuoteIndex] = useState(0);
  
  const handleMascotClick = () => {
    // Play a cute welcoming bunny voice speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance("Welcome back! Let's learn English together! 🐰");
      u.lang = 'en-US';
      u.pitch = 1.5; // Cute high pitch voice
      u.rate = 1.0;
      window.speechSynthesis.speak(u);
    }
    setMascotQuoteIndex((prev) => (prev + 1) % mascotQuotes.length);
  };
  
  // Context-aware mascot bubble text (universal - no "bé")
  let mascotBubbleText = mascotQuotes[mascotQuoteIndex];
  if (appMode === 'grammar') {
    mascotBubbleText = "Ngữ pháp tiếng Anh giống như những khối gạch xây nên ngôi nhà ngôn ngữ, cực kỳ thú vị đúng không? 🧱✨";
  } else if (appMode === 'vocab') {
    mascotBubbleText = activeVocabCategory === 'OXFORD' 
      ? "Trọn bộ giáo trình từ vựng Oxford từ cơ bản đến nâng cao đang chờ bạn khám phá đấy! 📘📙📕"
      : "Từ vựng VSTEP sẽ giúp bạn chinh phục các đỉnh núi tiếng Anh thật giỏi giang! ⛰️⚡";
  } else if (appMode === 'scanner') {
    mascotBubbleText = "Quét ảnh AI thông thái sẽ giúp phân tích và sửa lỗi viết siêu tốc luôn! 📸✨";
  }

  const selectMode = (mode) => {
    setAppMode(mode);
    setMenuOpen(false);
  };

  // Filter VSTEP topics based on search query
  const filteredVstepTopics = vstepTopics.filter(t => 
    t.title.toLowerCase().includes(vstepSearch.toLowerCase()) || 
    t.description.toLowerCase().includes(vstepSearch.toLowerCase())
  );

  // Calculate Rank Badge
  const completedCount = completedMilestones ? completedMilestones.length : 0;
  
  const getRankBadge = (count) => {
    if (count >= 24) return { text: 'Bậc Thầy 🏆', bg: 'bg-rose-500 text-white border-rose-800' };
    if (count >= 16) return { text: 'Chiến Binh ⚡', bg: 'bg-emerald-500 text-white border-emerald-800' };
    if (count >= 8) return { text: 'Chinh Phục 🌲', bg: 'bg-cyan-500 text-white border-cyan-800' };
    return { text: 'Tân Binh 🌱', bg: 'bg-slate-400 text-white border-slate-600' };
  };

  const rank = getRankBadge(completedCount);

  return (
    <div className="min-h-screen bg-[#f4f0ec] dark:bg-slate-950 flex flex-col md:flex-row font-sans text-slate-800 dark:text-slate-100 selection:bg-yellow-300 transition-colors duration-300">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden bg-white dark:bg-slate-900 border-b-4 border-slate-800 dark:border-slate-700 p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
        <div className="font-black text-xl flex items-center gap-2 dark:text-slate-100">
          <img src="/logo.svg" alt="Grammar Pro Logo" className="w-8 h-8 rounded-lg border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1e293b] p-0.5 bg-[#fdfbf7] dark:bg-slate-800" /> Grammar Pro
        </div>
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="border-2 border-slate-800 dark:border-slate-700 p-1 rounded-lg shadow-sm bg-white dark:bg-slate-800 dark:text-slate-100 animate-bounce-slow"
        >
          <Menu/>
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky top-0 left-0 h-screen w-80 md:w-96 bg-[#fdfbf7] dark:bg-slate-900 border-r-[4px] border-slate-800 dark:border-slate-700 z-40 transition-transform flex flex-col shadow-[4px_0_0_0_#1e293b] dark:shadow-[4px_0_0_0_#090d16]`}>
         
         <div className="p-6 border-b-[4px] border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 font-black text-2xl hidden md:flex items-center gap-3 dark:text-slate-100">
           <img src="/logo.svg" alt="Grammar Pro Logo" className="w-12 h-12 rounded-xl border-[3px] border-slate-800 shadow-[3px_3px_0px_0px_#1e293b] p-1 bg-[#fdfbf7] dark:bg-slate-800" /> 
           Grammar Pro
         </div>
         
         {/* Gamified stats widget */}
         <div className="p-4 border-b-[4px] border-slate-800 dark:border-slate-700 bg-[#fdfbf7] dark:bg-slate-900 flex flex-col gap-2 shrink-0">
           <div className="font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 flex justify-between items-center text-base p-2.5 border-[3px] border-slate-800 dark:border-slate-700 rounded-xl shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]">
             <span className="flex items-center gap-1.5"><Sparkles className="text-yellow-500 animate-pulse" size={18}/> Năng lượng:</span> 
             <span>{xp} XP</span>
           </div>
           <div className="font-black text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 flex justify-between items-center text-base p-2.5 border-[3px] border-slate-800 dark:border-slate-700 rounded-xl shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]">
             <span className="flex items-center gap-1.5"><Flame className="text-rose-500 animate-pulse" size={18}/> Chuỗi học tập:</span> 
             <span>{streak} ngày 🔥</span>
           </div>
           <div className="flex justify-between items-center p-2.5 border-[3px] border-slate-800 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-850 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617] font-black text-xs dark:text-slate-300">
             <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider">Cấp Độ Học:</span>
             <span className={`px-2 py-0.5 rounded-lg border-2 text-[10px] font-black uppercase tracking-wider ${rank.bg}`}>
               {rank.text}
             </span>
           </div>
           
           {/* Light/Dark Toggle and Reset Button */}
           <div className="flex gap-2 mt-2">
             <button
               onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
               className="flex-1 p-2.5 font-black border-[3px] border-slate-800 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs flex justify-center items-center gap-1.5 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617] cursor-pointer"
             >
               {theme === 'light' ? (
                 <>
                   <Moon size={14} className="text-indigo-600 dark:text-indigo-400" />
                   <span>WEB TỐI</span>
                 </>
               ) : (
                 <>
                   <Sun size={14} className="text-yellow-400 animate-spin-slow" />
                   <span>WEB SÁNG</span>
                 </>
               )}
             </button>
             <button
               onClick={() => setIsResetModalOpen(true)}
               className="p-2.5 font-black border-[3px] border-slate-800 dark:border-slate-700 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-xs flex justify-center items-center gap-1.5 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617] cursor-pointer"
               title="Làm mới lại lộ trình học tập"
             >
               <RotateCcw size={14} />
               <span>RESET</span>
             </button>
           </div>
         </div>
         
         {/* --- NAVIGATION TOGGLES --- */}
         <div className="flex flex-col gap-2 p-4 border-b-[4px] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
           
           <button 
             onClick={() => {
               setTopicId(null);
               selectMode('grammar');
             }}
             className={`p-3 font-black border-4 border-slate-800 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${appMode === 'grammar' && !topicId ? 'bg-cyan-300 dark:bg-cyan-400 dark:text-slate-950 shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'}`}
           >
             <Home size={20} className="text-cyan-600 dark:text-cyan-400" /> BẢN ĐỒ LỘ TRÌNH
           </button>

           <button 
             onClick={() => {
               // Open first grammar topic if none selected, or keep selected
               if (!topicId) setTopicId('t1');
               selectMode('grammar');
             }}
             className={`p-3 font-black border-4 border-slate-800 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${appMode === 'grammar' && topicId ? 'bg-yellow-300 dark:bg-yellow-400 dark:text-slate-950 shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'}`}
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
               className={`relative p-3 font-black border-4 border-slate-800 dark:border-slate-700 rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer ${appMode === 'vocab' ? 'bg-green-400 dark:bg-green-500 text-white shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617]'}`}
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
                   className={`p-2 font-black border-[3px] border-slate-800 dark:border-slate-700 rounded-xl transition-all flex justify-center items-center text-center gap-2 cursor-pointer ${activeVocabCategory === 'VSTEP' && appMode === 'vocab' ? 'bg-yellow-300 dark:bg-yellow-400 dark:text-slate-950 shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'}`}
                 >
                   <BookMarked size={18} className="text-blue-500 dark:text-blue-400" /> VSTEP
                 </button>
                 <button
                   onClick={() => { 
                     setActiveVocabCategory("OXFORD"); 
                     selectMode('vocab');
                   }}
                   className={`p-2 font-black border-[3px] border-slate-800 dark:border-slate-700 rounded-xl transition-all flex justify-center items-center text-center gap-2 cursor-pointer ${activeVocabCategory === 'OXFORD' && appMode === 'vocab' ? 'bg-yellow-300 dark:bg-yellow-400 dark:text-slate-950 shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'}`}
                 >
                   <Book size={18} className="text-red-500 dark:text-red-400" /> OXFORD
                 </button>
               </div>
             )}
           </div>

           <button 
             onClick={() => selectMode('scanner')}
             className={`p-3 font-black border-4 border-slate-800 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${appMode === 'scanner' ? 'bg-blue-400 dark:bg-blue-500 text-white shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'}`}
           >
             <Camera size={20} /> QUÉT ẢNH AI
           </button>
         
         </div>

         {/* --- CONTEXT SENSITIVE SIDEBAR ITEMS --- */}
         <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24 custom-scrollbar">
            
            {/* GRAMMAR TOPICS LIST */}
            {appMode === 'grammar' && topicId !== null && (
              <>
                <button 
                  onClick={() => {
                    setTopicId(null); 
                    setMenuOpen(false);
                  }} 
                  className={`w-full text-left font-black p-4 border-[4px] border-slate-800 dark:border-slate-700 rounded-2xl mb-2 text-lg transition-all flex items-center gap-2 cursor-pointer ${!topicId ? 'bg-cyan-200 dark:bg-cyan-400 dark:text-slate-950 shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617] translate-x-2' : 'bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]'}`}
                >
                  <Home size={20} className="text-cyan-600 dark:text-cyan-400" /> Trang Chủ
                </button>
                <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-2 mb-2 mt-4">21 Chuyên Đề Ngữ Pháp</div>
                {parsedGrammarData.map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => {
                      setTopicId(t.id); 
                      setMenuOpen(false);
                    }} 
                    className={`w-full text-left font-bold p-4 border-[4px] border-slate-800 dark:border-slate-700 rounded-2xl truncate text-lg transition-all mb-2 cursor-pointer ${topicId === t.id ? 'bg-yellow-200 dark:bg-yellow-450 dark:text-slate-950 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]' : 'bg-white dark:bg-slate-850 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]'}`}
                  >
                    {t.title}
                  </button>
                ))}
              </>
            )}

            {/* VSTEP TOPICS LIST */}
            {appMode === 'vocab' && activeVocabCategory === 'VSTEP' && (
              <>
                <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-2 mb-2 mt-4">Từ Vựng VSTEP</div>
                
                <div className="relative mb-4">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none" />
                  <input 
                    type="text" 
                    placeholder="Tìm nhanh chủ đề từ..." 
                    value={vstepSearch}
                    onChange={(e) => setVstepSearch(e.target.value)}
                    className="w-full p-3 pl-11 border-4 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 rounded-xl font-bold outline-none focus:bg-yellow-100 dark:focus:bg-slate-700 transition-colors text-sm shadow-inner"
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
                      className={`w-full text-left font-bold p-4 border-[4px] border-slate-800 dark:border-slate-700 rounded-2xl transition-all mb-2 flex flex-col gap-1 cursor-pointer ${vstepTopicId === t.id ? 'bg-yellow-200 dark:bg-yellow-450 dark:text-slate-950 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]' : 'bg-white dark:bg-slate-850 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]'}`}
                    >
                      <span className="text-sm md:text-base leading-tight font-black">{t.title}</span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.words.length} từ vựng</span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm font-bold text-slate-400 dark:text-slate-500 text-center py-4">Không tìm thấy chủ đề nào!</p>
                )}
              </>
            )}

            {/* OXFORD VOCAB UNITS LIST */}
            {appMode === 'vocab' && activeVocabCategory === 'OXFORD' && (
              <>
                <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-2 mb-2 mt-4">
                  Chọn Giáo Trình
                </div>
                
                {/* Book Dropdown / Selector */}
                <div className="px-2 mb-4">
                  <select
                    value={activeOxfordBookId}
                    onChange={(e) => {
                      const newBookId = e.target.value;
                      setActiveOxfordBookId(newBookId);
                      // Automatically load the first unit of the new book
                      const newBook = oxfordBooks.find(b => b.id === newBookId);
                      if (newBook && newBook.units.length > 0) {
                        setOxfordUnitId(newBook.units[0].id);
                      }
                    }}
                    className="w-full p-3 font-black border-4 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 rounded-xl outline-none shadow-[2px_2px_0_0_#1c293b] dark:shadow-[2px_2px_0_0_#020617] focus:bg-yellow-100 dark:focus:bg-slate-700 cursor-pointer text-sm"
                  >
                    {oxfordBooks.map(book => (
                      <option key={book.id} value={book.id} className="font-bold dark:bg-slate-800 dark:text-slate-100">
                        {book.id === 'elementary' ? '📘 Elementary (Cơ bản)' : book.id === 'pre_intermediate' ? '📙 Pre-Int & Int (Trung cấp)' : '📕 Advanced (Nâng cao)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-2 mb-2 mt-2">
                  {courseData.length} Bài Học ({oxfordBooks.find(b => b.id === activeOxfordBookId)?.units.length || 0} Units)
                </div>

                <div className="space-y-2">
                  {courseData.map(unit => (
                    <button 
                      key={unit.id} 
                      onClick={() => { 
                        setOxfordUnitId(unit.id); 
                        setMenuOpen(false); 
                      }} 
                      className={`w-full text-left font-bold p-4 border-[4px] border-slate-800 dark:border-slate-700 rounded-2xl truncate text-lg transition-all flex flex-col gap-1 cursor-pointer ${
                        oxfordUnitId === unit.id 
                          ? 'bg-yellow-200 dark:bg-yellow-450 dark:text-slate-950 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]' 
                          : 'bg-white dark:bg-slate-850 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]'
                      }`}
                    >
                      <span className="text-sm md:text-base leading-tight font-black">{unit.title}</span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {unit.theory ? `${Array.isArray(unit.theory) ? unit.theory.length : Object.keys(unit.theory).length} phần lý thuyết` : ''}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

         </div>

         {/* --- CUTE MASCOT SCHOLAR BUNNY --- */}
         <div className="p-4 border-t-[4px] border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center gap-3 shrink-0 relative mt-auto">
           <div className="relative cursor-pointer group" onClick={handleMascotClick}>
             <img 
               src="/mascot_bunny.png" 
               alt="Bunny Mascot" 
               className="w-16 h-16 animate-float object-contain group-hover:scale-110 transition-transform duration-200" 
             />
             <div className="absolute -top-1 -right-1 bg-pink-300 dark:bg-pink-400 border-2 border-slate-800 text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-[1px_1px_0_0_#000] text-slate-900">
               Bunny
             </div>
           </div>
           
           <div className="flex-1 bg-slate-100 dark:bg-slate-800 border-[3px] border-slate-800 dark:border-slate-700 p-3 rounded-2xl relative text-xs font-bold leading-relaxed dark:text-slate-200 shadow-inner">
             <div className="absolute left-[-8px] top-6 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-slate-800 dark:border-r-slate-700"></div>
             <div className="absolute left-[-5px] top-6 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-slate-100 dark:border-r-slate-800"></div>
             
             <p>{mascotBubbleText}</p>
           </div>
         </div>

      </aside>

      {/* --- MAIN CONTENT PANEL --- */}
      <main className="flex-1 p-4 md:p-10 h-screen overflow-y-auto bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] dark:bg-slate-950 transition-colors duration-300 custom-scrollbar">
        {children}
      </main>

      {/* --- CONFIRM RESET ROADMAP MODAL --- */}
      {isResetModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000] animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-500 mb-4">
              <AlertTriangle size={32} className="animate-bounce text-rose-500" />
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800 dark:text-slate-100">Xác nhận làm mới</h3>
            </div>
            
            <p className="font-bold text-slate-600 dark:text-slate-350 leading-relaxed mb-6 text-sm">
              Hành động này sẽ <span className="text-rose-500 dark:text-rose-400 font-black">XÓA TOÀN BỘ</span> điểm năng lượng (XP) và tất cả bài học đã hoàn thành của bạn trên bản đồ lộ trình. Bạn có thực sự muốn học lại từ đầu không?
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="flex-1 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-3 border-slate-800 dark:border-slate-700 rounded-2xl font-black shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer text-sm"
              >
                HỦY BỎ
              </button>
              <button
                onClick={() => {
                  resetRoadmap();
                  setIsResetModalOpen(false);
                }}
                className="flex-1 py-3 bg-rose-500 text-white border-3 border-slate-800 rounded-2xl font-black shadow-[3px_3px_0_0_#000] hover:bg-rose-600 transition-all cursor-pointer text-sm"
              >
                XÁC NHẬN RESET
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MainLayout;
