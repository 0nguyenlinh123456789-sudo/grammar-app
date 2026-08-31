// File: src/layouts/MainLayout.jsx
import { useEffect, useState } from 'react';
import { BookOpen, Flame, ChevronDown, Menu, Book, BookMarked, Camera, Home, Search, GraduationCap, KeyRound } from 'lucide-react';
import AiKeyDialog from '../components/common/AiKeyDialog';
import PolicyDialog from '../components/common/PolicyDialog';
import BottomTabBar from '../components/common/BottomTabBar';
import BunnyChat from '../components/common/BunnyChat';
import { hasGeminiKey, subscribeGeminiKey, subscribeOpenAiKeySettings } from '../utils/aiKey';
import { SHOW_IELTS_FOUNDATION } from '../utils/localOnly';

const MainLayout = ({
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
  vstepTopics = [],
  parsedGrammarData,
  grammarLevels = [],
  courseData,
  oxfordBooks = [],
  oxfordLoaded = true,
  activeOxfordBookId = 'elementary',
  setActiveOxfordBookId,
  children
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVocabMenuOpen, setIsVocabMenuOpen] = useState(true); // Default open to make experience smoother
  const [vstepSearch, setVstepSearch] = useState('');
  const [activeGrammarLevel, setActiveGrammarLevel] = useState('B1');
  const [openVocabGroups, setOpenVocabGroups] = useState({ vstep: true, daily: false, ielts: false, beginner: false });
  const [globalSearch, setGlobalSearch] = useState('');
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isAiKeyOpen, setIsAiKeyOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [hasAiKey, setHasAiKey] = useState(hasGeminiKey);

  // The AI features are bring-your-own-key, so any screen can ask the layout to
  // open this dialog (see openAiKeySettings) and the badge tracks the key state.
  useEffect(() => subscribeGeminiKey(() => setHasAiKey(hasGeminiKey())), []);
  useEffect(() => subscribeOpenAiKeySettings(() => { setIsAiKeyOpen(true); setMenuOpen(false); }), []);

  const vocabCategoryGroups = [
    { id: 'vstep', label: '📚 Chủ đề thi VSTEP', color: 'bg-blue-400 dark:bg-blue-600' },
    { id: 'daily', label: '🗣️ Giao tiếp Hằng ngày', color: 'bg-green-400 dark:bg-green-600' },
    { id: 'ielts', label: '🎯 Chủ đề thi IELTS', color: 'bg-red-400 dark:bg-red-600' },
    { id: 'beginner', label: '🌱 Người mới bắt đầu', color: 'bg-amber-400 dark:bg-amber-600' },
  ];

  const toggleVocabGroup = (groupId) => {
    setOpenVocabGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const selectMode = (mode) => {
    setAppMode(mode);
    setMenuOpen(false);
  };

  // Filter VSTEP topics based on search query
  const filteredVstepTopics = vstepTopics.filter(t => 
    t.title.toLowerCase().includes(vstepSearch.toLowerCase()) || 
    t.description.toLowerCase().includes(vstepSearch.toLowerCase())
  );

  const searchTerm = globalSearch.trim().toLowerCase();
  const globalResults = searchTerm ? [
    ...(parsedGrammarData || []).filter((item) => `${item.title} ${item.description || ''}`.toLowerCase().includes(searchTerm)).slice(0, 8).map((item) => ({ ...item, resultType: 'grammar', resultLabel: 'Ngữ pháp' })),
    ...vstepTopics.filter((item) => `${item.title} ${item.description || ''}`.toLowerCase().includes(searchTerm)).slice(0, 8).map((item) => ({ ...item, resultType: 'vocab', resultLabel: 'Từ vựng' })),
    ...(courseData || []).filter((item) => !item.contentUpdating && `${item.title} ${item.description || ''}`.toLowerCase().includes(searchTerm)).slice(0, 8).map((item) => ({ ...item, resultType: 'oxford', resultLabel: 'Oxford' })),
  ].slice(0, 12) : [];

  const selectSearchResult = (result) => {
    if (result.resultType === 'grammar') { setTopicId(result.id); selectMode('grammar'); }
    if (result.resultType === 'vocab') { setVstepTopicId(result.id); setActiveVocabCategory('TOPIC'); selectMode('vocab'); }
    if (result.resultType === 'oxford') { setOxfordUnitId(result.id); setActiveVocabCategory('OXFORD'); selectMode('vocab'); }
    setGlobalSearch(''); setIsGlobalSearchOpen(false);
  };



  return (
    <div className="min-h-screen bg-[#f4f0ec] dark:bg-slate-950 flex flex-col lg:flex-row font-sans text-slate-800 dark:text-slate-100 selection:bg-yellow-300 transition-colors duration-300">
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[100] -translate-y-24 focus:translate-y-0 bg-yellow-300 text-slate-950 border-3 border-slate-900 rounded-xl px-4 py-2 font-black shadow-[3px_3px_0_0_#1e293b]"
      >
        Bỏ qua điều hướng
      </a>
      
      {/* --- MOBILE / TABLET HEADER --- */}
      <div className="lg:hidden bg-white dark:bg-slate-900 border-b-4 border-slate-800 dark:border-slate-700 p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <img src="/bunny_logo.png" alt="Bunny English" className="w-11 h-11 object-contain drop-shadow-[2px_3px_0_rgba(30,41,59,0.18)] select-none" draggable={false} />
          <div className="leading-tight">
            <p className="font-black text-xl tracking-tight text-slate-900 dark:text-slate-100">Bunny <span className="text-pink-500">English</span></p>
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Học tiếng Anh mỗi ngày</p>
          </div>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          className="shrink-0 w-11 h-11 flex items-center justify-center border-3 border-slate-800 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 dark:text-slate-100 shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* --- MOBILE / TABLET MENU BACKDROP --- */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* --- SIDEBAR (drawer on mobile/tablet, docked from lg up) --- */}
      {/* ⚠️ `h-screen` là `100vh`, và trên trình duyệt điện thoại `100vh` là
          chiều cao KHI ĐÃ ẨN thanh địa chỉ — tức lớn hơn phần thật sự nhìn
          thấy khoảng 56px trên Android Chrome. Ngăn kéo vì thế bị thanh địa
          chỉ che mất phần đáy, mà phần đáy là chỗ đặt "KHÓA AI (API KEY)" và
          "Điều khoản · Bảo mật · Hoàn tiền". Đo trên máy ảo 360×640: mục cuối
          chỉ còn thừa 11px — chưa tính thanh địa chỉ. `100dvh` là chiều cao
          THẬT SỰ ĐANG THẤY. Giữ `h-screen` làm nền cho trình duyệt cũ, và chỉ
          đè bằng dvh khi trình duyệt có hỗ trợ. */}
      <aside id="main-navigation" aria-label="Điều hướng chính" className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen supports-[height:100dvh]:h-[100dvh] w-72 sm:w-80 lg:w-80 xl:w-96 bg-[#fdfbf7] dark:bg-slate-900 border-r-[4px] border-slate-800 dark:border-slate-700 z-40 transition-transform flex flex-col shadow-[4px_0_0_0_#1e293b] dark:shadow-[4px_0_0_0_#090d16]`}>
         
         {/* Brand header: desktop only — on phone/tablet the top bar already
             carries the bunny + name, a second one in the drawer is redundant */}
         <div className="px-6 py-5 border-b-[4px] border-slate-800 dark:border-slate-700 bg-gradient-to-br from-white via-pink-50/70 to-yellow-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 hidden lg:flex items-center gap-4 shrink-0">
           <img src="/bunny_logo.png" alt="Bunny English" className="w-16 h-16 lg:w-20 lg:h-20 object-contain drop-shadow-[3px_4px_0_rgba(30,41,59,0.18)] hover:scale-105 transition-transform select-none" draggable={false} />
           <div className="leading-none">
             <p className="font-black text-2xl lg:text-3xl tracking-tight text-slate-900 dark:text-slate-100">Bunny</p>
             <p className="font-black text-2xl lg:text-3xl tracking-tight text-pink-500">English</p>
             <p className="text-[9px] font-black uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 mt-2">Học tiếng Anh mỗi ngày</p>
           </div>
         </div>
         

         {/* --- NAVIGATION TOGGLES --- */}
          {/* `shrink-0` + KHÔNG cuộn được = mục nào tràn khỏi màn hình là mất
              hẳn, không có cách nào với tới. Đo được: khối này cao 629px và
              KHÔNG đổi theo bề rộng máy; trên màn 640px nó chỉ thừa 11px, và
              chỉ cần thêm MỘT mục (bản localhost có thêm dòng IELTS: 693px) là
              hai mục cuối rơi xuống dưới đáy với `overflow` của cha bằng null —
              không cuộn tới được. Nay: cho phép co lại VÀ tự cuộn, nên màn hình
              thấp bao nhiêu cũng vẫn với tới được mọi mục. */}
          <div className="flex flex-col gap-2 p-4 border-b-[4px] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-0 overflow-y-auto">
            <button onClick={() => setIsGlobalSearchOpen((value) => !value)} aria-expanded={isGlobalSearchOpen} className="p-3 font-black border-3 border-blue-500 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2 cursor-pointer"><Search size={19} /> TÌM TRONG KHÓA HỌC</button>
            {isGlobalSearchOpen && <div className="relative">
              <Search size={17} className="absolute left-3 top-3.5 text-slate-400" />
              <input autoFocus value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setIsGlobalSearchOpen(false); }} placeholder="Ví dụ: thì hiện tại, travel..." className="w-full h-11 pl-9 pr-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-bold text-sm outline-none focus:ring-3 focus:ring-blue-200" />
              {searchTerm && <div className="absolute z-50 left-0 right-0 top-12 bg-white dark:bg-slate-900 border-3 border-slate-800 dark:border-slate-600 rounded-xl shadow-[4px_4px_0_0_#1e293b] max-h-72 overflow-y-auto p-1">
                {globalResults.length ? globalResults.map((result) => <button key={`${result.resultType}-${result.id}`} onClick={() => selectSearchResult(result)} className="w-full text-left p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer"><span className="block text-sm font-black truncate">{result.title}</span><span className="text-[10px] font-black uppercase text-blue-600">{result.resultLabel}</span></button>) : <p className="p-3 text-xs font-bold text-slate-500">Không tìm thấy bài phù hợp.</p>}
              </div>}
            </div>}

            <button
             onClick={() => {
               setTopicId(null);
               selectMode('home');
             }}
             className={`p-3 font-black border-4 border-slate-800 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${appMode === 'home' ? 'bg-cyan-300 dark:bg-cyan-400 dark:text-slate-950 shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'}`}
           >
             <Home size={20} className="text-cyan-600 dark:text-cyan-400" /> LỘ TRÌNH
           </button>

           <button 
             onClick={() => {
               // Open first grammar topic if none selected, or keep selected
                if (!topicId) setTopicId('b1_01');
               selectMode('grammar');
             }}
             className={`p-3 font-black border-4 border-slate-800 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${appMode === 'grammar' && topicId ? 'bg-yellow-300 dark:bg-yellow-400 dark:text-slate-950 shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'}`}
           >
             <BookOpen size={20} /> NGỮ PHÁP
           </button>
           
           {/* VOCAB DROPDOWN */}
           <div className="flex flex-col gap-2">
             <button 
               onClick={() => {
                 // Bấm TỪ VỰNG khi ĐANG Ở CHỖ KHÁC = "cho tôi vào từ vựng", nên
                 // phải MỞ menu con chứ không lật trạng thái. Bản cũ lật vô điều
                 // kiện, mà menu con mặc định đang mở — nên cú bấm tự nhiên nhất
                 // để vào từ vựng lại ĐÓNG mất hai lối con của chính nó, trong đó
                 // có OXFORD (260 unit, một trong những khối nội dung lớn nhất
                 // của app). Người học bấm vào rồi thấy lối đó biến mất thì kết
                 // luận là không có, chứ không nghĩ tới việc bấm lần nữa.
                 //
                 // Đang ở trong từ vựng rồi thì vẫn cho lật, để ai muốn thu gọn
                 // vẫn thu gọn được.
                 setIsVocabMenuOpen(appMode === 'vocab' ? !isVocabMenuOpen : true);
                 setAppMode('vocab');
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
                      setActiveVocabCategory("TOPIC"); 
                      selectMode('vocab');
                    }}
                    className={`p-2 font-black border-[3px] border-slate-800 dark:border-slate-700 rounded-xl transition-all flex justify-center items-center text-center gap-2 cursor-pointer ${activeVocabCategory === 'TOPIC' && appMode === 'vocab' ? 'bg-yellow-300 dark:bg-yellow-400 dark:text-slate-950 shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'}`}
                 >
                    <BookMarked size={18} className="text-blue-500 dark:text-blue-400" /> CHỦ ĐỀ
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
             <Camera size={20} /> QUÉT AI
           </button>

           <button 
             onClick={() => selectMode('games')}
             className={`p-3 font-black border-4 border-slate-800 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${appMode === 'games' ? 'bg-violet-400 dark:bg-violet-500 text-white shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617] hover:bg-violet-50 dark:hover:bg-violet-900/30'}`}
           >
             GAMES
           </button>

           {SHOW_IELTS_FOUNDATION && (
             <button
               onClick={() => selectMode('ielts-foundation')}
               className={`p-3 font-black border-4 border-slate-800 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${appMode === 'ielts-foundation' ? 'bg-pink-400 dark:bg-pink-500 text-white shadow-none translate-y-1' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617] hover:bg-pink-50 dark:hover:bg-pink-900/30'}`}
             >
               <GraduationCap size={20} className="text-pink-500 dark:text-pink-300" /> IELTS NỀN TẢNG
             </button>
           )}

           <button
             onClick={() => { setIsAiKeyOpen(true); setMenuOpen(false); }}
             className="p-3 font-black border-3 border-slate-800 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] hover:bg-yellow-50 dark:hover:bg-slate-750 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
           >
             <KeyRound size={18} className="text-yellow-600 dark:text-yellow-400" /> KHÓA AI (API KEY)
             <span className={`text-[10px] px-2 py-0.5 rounded-full border-2 ${hasAiKey ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-amber-100 border-amber-500 text-amber-700'}`}>
               {hasAiKey ? 'ĐÃ CÓ' : 'CHƯA CÓ'}
             </span>
           </button>

           <button
             onClick={() => { setIsPolicyOpen(true); setMenuOpen(false); }}
             className="text-[11px] font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer text-center pt-1"
           >
             Điều khoản · Bảo mật · Hoàn tiền
           </button>

         </div>

         {/* --- CONTEXT SENSITIVE SIDEBAR ITEMS --- */}
         <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24 custom-scrollbar">
            
            {/* GRAMMAR TOPICS LIST */}
            {appMode === 'grammar' && topicId !== null && (
              <>
                
                {/* Grammar Level Tabs */}
                <div className="flex flex-col gap-2 mb-3 mt-2">
                  {grammarLevels.map(level => (
                    <button
                      key={level.id}
                      onClick={() => setActiveGrammarLevel(level.id)}
                      className={`w-full p-2.5 text-left text-xs font-black border-[3px] border-slate-800 dark:border-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeGrammarLevel === level.id
                          ? `${level.color} text-white shadow-none translate-x-1`
                          : 'bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-200 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'
                      }`}
                    >
                      <span>{level.label}</span>
                      {activeGrammarLevel === level.id && <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded-md font-bold uppercase">Đang chọn</span>}
                    </button>
                  ))}
                </div>
                
                {/* Level Description */}
                {grammarLevels.filter(l => l.id === activeGrammarLevel).map(level => (
                  <div key={level.id} className="text-[10px] font-bold text-slate-400 dark:text-slate-500 pl-2 mb-2">
                    {level.description} — {level.topics.length} chuyên đề
                  </div>
                ))}
                
                {/* Topic List for Selected Level */}
                {(grammarLevels.find(l => l.id === activeGrammarLevel)?.topics || parsedGrammarData).map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => {
                      setTopicId(t.id); 
                      setMenuOpen(false);
                    }} 
                    className={`w-full text-left font-bold p-4 border-[4px] border-slate-800 dark:border-slate-700 rounded-2xl truncate text-lg transition-all mb-2 cursor-pointer ${topicId === t.id ? 'bg-yellow-200 dark:bg-yellow-450 dark:text-slate-950 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617]' : 'bg-white dark:bg-slate-850 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]'}`}
                  >
                    {/* `truncate` nằm ở NÚT (cha) nên nó chỉ đặt `overflow:hidden`
                        cho cha; chữ lại nằm trong span con, mà span con không có
                        `text-overflow` nên bị CẮT GIỮA TỪ, không có dấu "…". Đo
                        được 15/28 mục bị cắt ở ngăn kéo rộng 288px, nặng nhất là
                        "2. Hiện Tại Tiếp Diễn (Present Continuous)" thiếu 65px.
                        Đặt `truncate` lên đúng phần tử mang chữ thì mới có "…". */}
                    <span className="block truncate text-sm">{t.title}</span>
                  </button>
                ))}
              </>
            )}

            {/* VSTEP TOPICS LIST - Grouped by Category */}
            {appMode === 'vocab' && activeVocabCategory === 'TOPIC' && (
              <>
                <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-2 mb-2 mt-4">Từ Vựng Theo Chủ Đề</div>
                
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

                {vstepSearch.trim() ? (
                  /* When searching, show flat filtered list */
                  filteredVstepTopics.length > 0 ? (
                    filteredVstepTopics.map(t => {
                      const levelClass = t.level ? `topic-level-${t.level.split('-')[0].toLowerCase().replace(' ','')}` : '';
                      const isActive = vstepTopicId === t.id;
                      return (
                        <button 
                          key={t.id} 
                          onClick={() => {
                            setVstepTopicId(t.id); 
                            setMenuOpen(false);
                          }} 
                          className={`w-full text-left font-bold p-3.5 border-[4px] border-slate-800 dark:border-slate-700 rounded-2xl transition-all mb-2 flex flex-col gap-1.5 cursor-pointer ${isActive ? 'bg-yellow-200 dark:bg-yellow-600/40 dark:text-yellow-100 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617] border-yellow-500 dark:border-yellow-500' : 'bg-white dark:bg-slate-800 dark:text-slate-100 hover:bg-yellow-50 dark:hover:bg-slate-700 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]'}`}
                        >
                          <span className="text-sm md:text-base leading-tight font-black dark:text-slate-100">{t.title}</span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-black text-slate-600 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md">{t.words.length} từ</span>
                            {t.level && <span className={`topic-level-badge ${levelClass}`}>{t.level}</span>}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-sm font-bold text-slate-400 dark:text-slate-500 text-center py-4">Không tìm thấy chủ đề nào!</p>
                  )
                ) : (
                  /* When NOT searching, show grouped category view */
                  vocabCategoryGroups.map(group => {
                    const groupTopics = vstepTopics.filter(t => (t.category || 'vstep') === group.id);
                    if (groupTopics.length === 0) return null;
                    const isOpen = openVocabGroups[group.id];
                    return (
                      <div key={group.id} className="mb-3">
                        <button
                          onClick={() => toggleVocabGroup(group.id)}
                          className={`w-full p-3 font-black border-[3px] border-slate-800 dark:border-slate-700 rounded-xl transition-all flex items-center justify-between cursor-pointer ${isOpen ? `${group.color} text-white shadow-none` : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617] hover:bg-slate-50 dark:hover:bg-slate-750'}`}
                        >
                          <span className="text-sm">{group.label}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${isOpen ? 'bg-black/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                              {groupTopics.length}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="ml-3 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2">
                            {groupTopics.map(t => {
                              const levelClass = t.level ? `topic-level-${t.level.split('-')[0].toLowerCase().replace(' ','')}` : '';
                              const isActive = vstepTopicId === t.id;
                              return (
                                <button 
                                  key={t.id} 
                                  onClick={() => {
                                    setVstepTopicId(t.id); 
                                    setMenuOpen(false);
                                  }} 
                                  className={`w-full text-left font-bold p-3 border-[3px] border-slate-800 dark:border-slate-700 rounded-xl transition-all flex flex-col gap-1 cursor-pointer ${isActive ? 'bg-yellow-200 dark:bg-yellow-600/40 dark:text-yellow-100 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617] border-yellow-500 dark:border-yellow-500' : 'bg-white dark:bg-slate-800 dark:text-slate-100 hover:bg-yellow-50 dark:hover:bg-slate-700 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]'}`}
                                >
                                  <span className="text-sm leading-tight font-black dark:text-slate-100">{t.title}</span>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] font-black text-slate-600 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md">{t.words.length} từ</span>
                                    {t.level && <span className={`topic-level-badge ${levelClass}`}>{t.level}</span>}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </>
            )}

            {/* OXFORD VOCAB UNITS LIST */}
            {appMode === 'vocab' && activeVocabCategory === 'OXFORD' && !oxfordLoaded && (
              <div className="flex items-center justify-center gap-3 py-10 text-slate-400 font-black">
                <span className="inline-block w-5 h-5 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></span>
                Đang tải giáo trình Oxford...
              </div>
            )}
            {appMode === 'vocab' && activeVocabCategory === 'OXFORD' && oxfordLoaded && (
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
                        const firstPlayable = newBook.units.find(u => !u.contentUpdating) || newBook.units[0];
                        setOxfordUnitId(firstPlayable.id);
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
                    unit.contentUpdating ? (
                      // Unit không còn đủ item hợp lệ sau lớp lọc nội dung
                      // (src/utils/contentFilter.js) — ẩn tạm cho tới khi dữ
                      // liệu được sinh lại sạch.
                      <div
                        key={unit.id}
                        aria-disabled="true"
                        className="w-full text-left font-bold p-4 border-[4px] border-dashed border-slate-300 dark:border-slate-700 rounded-2xl truncate text-lg flex flex-col gap-1 bg-slate-50 dark:bg-slate-900 opacity-70 cursor-not-allowed"
                      >
                        <span className="block truncate text-sm md:text-base leading-tight font-black text-slate-400 dark:text-slate-500">{unit.title}</span>
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">🚧 Đang cập nhật nội dung</span>
                      </div>
                    ) : (
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
                      <span className="block truncate text-sm md:text-base leading-tight font-black">{unit.title}</span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {unit.theory ? `${Array.isArray(unit.theory) ? unit.theory.length : Object.keys(unit.theory).length} phần lý thuyết` : ''}
                      </span>
                    </button>
                    )
                  ))}
                </div>
              </>
            )}

         </div>


       </aside>

      {/* --- MAIN CONTENT PANEL --- */}
      <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 p-4 md:p-8 lg:p-6 xl:p-10 lg:h-screen overflow-x-hidden lg:overflow-y-auto bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] dark:bg-slate-950 transition-colors duration-300 custom-scrollbar">
        {children}
        {/* Keep content clear of the fixed bottom tab bar on phone/tablet */}
        <div className="h-20 lg:hidden" aria-hidden="true" />
      </main>

      {/* --- PHONE/TABLET BOTTOM NAV + BUNNY AI --- */}
      <BottomTabBar
        appMode={appMode}
        onSelect={(mode) => {
          if (mode === 'grammar' && !topicId) setTopicId('b1_01');
          if (mode === 'home') setTopicId(null);
          selectMode(mode);
        }}
        onMenu={() => setMenuOpen(true)}
      />
      {/* Nút thỏ nổi ở `z-[110]`, ngăn kéo ở `z-40` — nên khi ngăn kéo MỞ trên
          màn hẹp, nút thỏ nằm đè lên mục "KHÓA AI (API KEY)" (đo được ở
          360×640: `elementFromPoint` giữa nút trả về chính nút thỏ). Ẩn nút khi
          ngăn kéo đang mở thay vì nâng z-index của ngăn kéo: ngăn kéo không
          phải lớp phủ toàn màn, nâng nó lên ≥120 là phá luật xếp lớp mà dự án
          đã ghim bằng `tests/overlay_zindex.test.js`. Từ `lg` trở lên thanh bên
          luôn hiện và không có `menuOpen`, nên máy tính bàn không đổi gì. */}
      <div className={menuOpen ? 'hidden lg:block' : ''}><BunnyChat /></div>

      {/* --- BRING-YOUR-OWN GEMINI KEY --- */}
      {isAiKeyOpen && <AiKeyDialog onClose={() => setIsAiKeyOpen(false)} />}

      {/* --- TERMS / PRIVACY / REFUND --- */}
      {isPolicyOpen && <PolicyDialog onClose={() => setIsPolicyOpen(false)} />}

      {/* Hộp xác nhận reset ĐÃ BỎ KHỎI ĐÂY (19/08): file này dựng nó nhưng KHÔNG
          có gì gọi `setIsResetModalOpen(true)` — mã chết trông y như một tính năng.
          Nó còn tốn của tôi một chẩn đoán sai: bộ rà tìm hộp theo
          `aria-labelledby="reset-roadmap-title"` (id của hộp CHẾT này) nên báo "nút
          chết" trong khi nút thật ở WelcomePage chạy bình thường. Nút reset thật nằm
          ở WelcomePage, cạnh nút sao lưu. */}

    </div>
  );
};

export default MainLayout;
