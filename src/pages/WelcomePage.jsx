import React, { useState } from 'react';
import { roadmapData } from '../data/roadmapData';
import { 
  Trophy, CheckCircle2, Lock, Play, Compass, Award, 
  Zap, BookOpen, Flame, Sparkles, AlertCircle, ArrowRight, RotateCcw, AlertTriangle, Moon, Sun
} from 'lucide-react';
import Btn3D from '../components/common/Btn3D';
import ScholarBunny from '../components/common/ScholarBunny';
import MascotLuna from '../components/common/MascotLuna';

const WelcomePage = ({ 
  xp, 
  completedMilestones = [], 
  setTopicId, 
  setAppMode, 
  setActiveVocabCategory, 
  setOxfordUnitId, 
  setVstepTopicId,
  resetRoadmap,
  streak = 0,
  theme,
  setTheme,
}) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'starter', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [lunaVisible, setLunaVisible] = useState(true);

  // Flatten milestones to calculate progress & next target
  const allMilestones = roadmapData.flatMap(level => 
    level.milestones.map(m => ({ ...m, levelId: level.level }))
  );

  const completedRoadmapMilestones = allMilestones.filter(m => 
    completedMilestones.includes(m.targetId)
  );

  const totalMilestonesCount = allMilestones.length;
  const completedCount = completedRoadmapMilestones.length;
  const completionPercentage = totalMilestonesCount > 0 
    ? Math.round((completedCount / totalMilestonesCount) * 100) 
    : 0;

  // Find the next uncompleted milestone
  const nextMilestoneIndex = allMilestones.findIndex(m => 
    !completedMilestones.includes(m.targetId)
  );
  const nextMilestone = nextMilestoneIndex !== -1 ? allMilestones[nextMilestoneIndex] : null;

  // Handler to launch a milestone
  const launchMilestone = (milestone) => {
    if (milestone.type === 'grammar') {
      setAppMode('grammar');
      setTopicId(milestone.targetId);
    } else if (milestone.type === 'oxford') {
      setAppMode('vocab');
      setActiveVocabCategory('OXFORD');
      setOxfordUnitId(milestone.targetId);
    } else if (milestone.type === 'vstep') {
      setAppMode('vocab');
      setActiveVocabCategory('TOPIC');
      setVstepTopicId(milestone.targetId);
    }
  };

  // Rank name based on completed milestones
  const getRankName = (count) => {
    if (count >= 30) return '🏆 Bậc Thầy (C2 Master)';
    if (count >= 22) return '🌟 Chuyên Gia (C1 Expert)';
    if (count >= 15) return '⭐ Chiến Binh (B2 Warrior)';
    if (count >= 8)  return '🌿 Người Khám Phá (B1 Explorer)';
    if (count >= 3)  return '🌱 Tân Binh (A2 Starter)';
    return '👶 Mới Bắt Đầu (A1 Beginner)';
  };

  const getMilestoneTypeBadge = (type) => {
    switch (type) {
      case 'grammar':
        return <span className="bg-cyan-100 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-400 border-2 border-slate-800 dark:border-slate-700 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]"><BookOpen size={12}/> Ngữ Pháp</span>;
      case 'oxford':
        return <span className="bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-400 border-2 border-slate-800 dark:border-slate-700 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]"><Flame size={12}/> Oxford Vocab</span>;
      case 'vstep':
        return <span className="bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-400 border-2 border-slate-800 dark:border-slate-700 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]"><Compass size={12}/> Từ Vựng</span>;
      default:
        return null;
    }
  };

  // Exam badge tags
  const getExamBadge = (exam = []) => {
    if (!exam || exam.length === 0) return null;
    const colors = {
      'IELTS': 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-400',
      'VSTEP': 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-400',
      'TOEIC': 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-400',
      'Business': 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-400',
    };
    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {exam.slice(0, 3).map((tag, i) => {
          const colorKey = Object.keys(colors).find(k => tag.includes(k));
          const colorClass = colorKey ? colors[colorKey] : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-400';
          return (
            <span key={i} className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border ${colorClass}`}>
              {tag}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 font-sans text-slate-800 dark:text-slate-100 selection:bg-yellow-300 transition-colors duration-300">
      
      {/* --- HERO DASHBOARD CARD --- */}
      <div className="bg-white dark:bg-slate-900 border-[4px] border-slate-800 dark:border-slate-700 rounded-[2.5rem] p-6 md:p-8 shadow-[10px_10px_0_0_#1c293b] dark:shadow-[10px_10px_0_0_#020617] mb-10 mt-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10 relative">
          <div className="flex items-center gap-5">
            {/* Bunny Mascot inside Hero */}
            <div className="hidden sm:flex relative shrink-0 select-none mr-4 lg:mr-6 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 items-center justify-center">
              <ScholarBunny 
                state="happy" 
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-110 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.15)] dark:drop-shadow-[4px_4px_4px_rgba(0,0,0,0.5)]" 
                width="100%"
                height="100%"
              />
            </div>
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-yellow-300 dark:bg-yellow-450 border-2 border-slate-800 dark:border-slate-700 px-3 py-1 rounded-xl shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] font-black text-slate-900 text-xs uppercase tracking-wider">
                <Sparkles size={14} className="animate-spin-slow" /> {getRankName(completedCount)}
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none text-slate-900 dark:text-slate-100 mt-2">LỘ TRÌNH</h2>
              <p className="font-bold text-sm md:text-base text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-750 relative mt-2 bubble-arrow-left leading-relaxed">
                "Cùng tớ học tiếng Anh nhé! 🦦✨"
              </p>
            </div>
          </div>
 
          <div className="flex flex-col xl:flex-row gap-4 w-full md:w-auto items-stretch shrink-0">
            {/* Stats Column */}
            <div className="flex flex-col gap-3 flex-1 sm:flex-initial">
               {/* Progress / XP Card */}
               <div className="bg-amber-50 dark:bg-slate-800 border-4 border-slate-800 dark:border-slate-700 px-5 py-3 rounded-3xl shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] flex items-center gap-4">
                 <Trophy size={36} className="text-yellow-500 fill-yellow-300 shrink-0" />
                 <div>
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tiến Độ & XP</p>
                   <p className="text-2xl font-black text-slate-900 dark:text-slate-100 leading-none mt-1">{completedCount}/{totalMilestonesCount} <span className="text-sm text-yellow-600 dark:text-yellow-500">({xp} XP)</span></p>
                 </div>
               </div>

               {/* Streak Card */}
               <div className="bg-rose-50 dark:bg-slate-800 border-4 border-slate-800 dark:border-slate-700 px-5 py-3 rounded-3xl shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] flex items-center gap-4">
                 <Flame size={36} className="text-rose-500 fill-rose-300 shrink-0 animate-pulse" />
                 <div>
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Chuỗi Học Tập</p>
                   <p className="text-2xl font-black text-slate-900 dark:text-slate-100 leading-none mt-1">{streak} <span className="text-sm text-rose-500">Ngày</span></p>
                 </div>
               </div>
            </div>

            {/* Actions Column */}
           <div className="flex flex-col gap-3 flex-1 sm:flex-initial justify-between">
               <button
                 onClick={() => setTheme && setTheme(theme === 'light' ? 'dark' : 'light')}
                 className="flex-1 min-h-[64px] px-6 font-black border-4 border-slate-800 dark:border-slate-700 rounded-3xl bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-sm flex justify-center items-center gap-2 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] cursor-pointer transition-all"
               >
                 {theme === 'light'
                   ? <><Moon size={18} className="text-indigo-500" /> CHẾ ĐỘ TỐI</>
                   : <><Sun size={18} className="text-yellow-400" /> CHẾ ĐỘ SÁNG</>
                 }
               </button>
               <button
                 onClick={() => setIsResetModalOpen(true)}
                 className="flex-1 min-h-[64px] px-6 font-black border-4 border-slate-800 dark:border-slate-700 rounded-3xl bg-slate-50 dark:bg-slate-850 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 text-sm flex justify-center items-center gap-2 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] cursor-pointer transition-all"
               >
                 <RotateCcw size={18} /> RESET LỘ TRÌNH
               </button>
            </div>
          </div>
        </div>
 
        {/* Progress bar with sliding bouncing bunny */}
        <div className="mt-8 border-4 border-slate-800 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 h-10 rounded-3xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_#020617] relative flex items-center p-1">
          <div 
            className="bg-emerald-400 h-full rounded-2xl transition-all duration-500 flex items-center justify-end relative pr-8 min-w-[3rem]" 
            style={{ width: `${Math.max(completionPercentage, 8)}%` }}
          >
            {/* Cute sliding bunny head at the end */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border-2 border-slate-800 w-8 h-8 rounded-full flex items-center justify-center shadow-sm text-lg animate-bounce-slow">
              🐰
            </div>
            <span className="font-black text-slate-900 text-xs">{completionPercentage}%</span>
          </div>
        </div>
      </div>
 
      {/* --- QUICK RESUME CARD (NEXT GOAL) --- */}
      {nextMilestone && (
        <div className="bg-[#f0f9ff] dark:bg-slate-900 border-[4px] border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[8px_8px_0_0_#1c293b] dark:shadow-[8px_8px_0_0_#020617] mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-300 dark:bg-yellow-450 border-4 border-slate-800 dark:border-slate-700 w-16 h-16 rounded-2xl flex items-center justify-center shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] shrink-0">
              <Zap size={32} className="text-slate-900 fill-slate-900 dark:fill-slate-900 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black text-blue-500 dark:text-blue-400 uppercase tracking-wider">CHẶNG TIẾP THEO CỦA BẠN</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-0.5 flex flex-wrap items-center gap-2">
                {nextMilestoneIndex + 1}. {nextMilestone.title}
                {getMilestoneTypeBadge(nextMilestone.type)}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">{nextMilestone.desc}</p>
            </div>
          </div>
          <button 
            onClick={() => launchMilestone(nextMilestone)}
            className="w-full md:w-auto cursor-pointer font-black text-lg px-8 py-4 bg-slate-900 dark:bg-slate-850 text-white rounded-2xl border-4 border-slate-800 dark:border-slate-700 shadow-[4px_4px_0_0_#febb07] dark:shadow-[4px_4px_0_0_#febb07] hover:bg-slate-800 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 shrink-0 font-sans"
          >
            HỌC TIẾP NGAY <ArrowRight size={20} className="text-yellow-300" />
          </button>
        </div>
      )}
 
      {/* --- LEVEL TABS --- */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide shrink-0">
        {[
          { id: 'all', title: 'TẤT CẢ LỘ TRÌNH', count: totalMilestonesCount },
          { id: 'starter', title: '🌱 A1 Starter', count: roadmapData[0]?.milestones.length || 0 },
          { id: 'elementary', title: '🌿 A2 Sơ Cấp', count: roadmapData[1]?.milestones.length || 0 },
          { id: 'intermediate', title: '⭐ B1 Trung Cấp', count: roadmapData[2]?.milestones.length || 0 },
          { id: 'upper_intermediate', title: '🌟 B2 Trung Cao', count: roadmapData[3]?.milestones.length || 0 },
          { id: 'advanced', title: '🏆 C1/C2 Cao Cấp', count: roadmapData[4]?.milestones.length || 0 },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer font-black px-5 py-3 rounded-2xl border-4 border-slate-800 dark:border-slate-700 transition-all text-sm whitespace-nowrap shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-yellow-300 dark:bg-yellow-450 text-slate-900 translate-y-0.5 shadow-none' 
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab.title} 
            <span className="bg-slate-800 dark:bg-slate-900 text-white dark:text-slate-300 text-xs px-2 py-0.5 rounded-lg border-2 border-slate-800 dark:border-slate-950">
              {tab.count}
            </span>
          </button>
        ))}
      </div>
 
      {/* --- ROADMAP TIMELINE PATH --- */}
      <div className="space-y-12 relative pl-6 md:pl-10">
        {/* Draw timeline vertical line */}
        <div className="absolute left-[34px] md:left-[50px] top-6 bottom-6 w-1 bg-slate-800 dark:bg-slate-700 border-2 border-slate-800 dark:border-slate-700 border-dashed rounded-full pointer-events-none"></div>
 
        {roadmapData
          .filter(level => activeTab === 'all' || activeTab === level.level)
          .map((level, levelIdx) => (
            <div key={level.level} className="space-y-6">
              
              {/* Level Divider Header */}
              {activeTab === 'all' && (
                <div className={`relative z-10 flex items-center gap-3 bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 px-6 py-4 rounded-3xl shadow-[5px_5px_0_0_#1e293b] dark:shadow-[5px_5px_0_0_#020617] -ml-6 md:-ml-10`}>
                  <div className="bg-slate-900 dark:bg-slate-800 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shrink-0">
                    {level.icon || ['I','II','III','IV','V'][levelIdx] || levelIdx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-black uppercase text-slate-900 dark:text-slate-100 leading-tight">{level.levelTitle}</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-xs md:text-sm mt-0.5">{level.levelDesc}</p>
                    {level.targetAudience && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {level.targetAudience.map((aud, i) => (
                          <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 px-2 py-0.5 rounded-full font-bold">{aud}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
 
              {/* Milestones in Level */}
              <div className="space-y-6">
                {level.milestones.map((m, mIdx) => {
                  const absoluteIdx = allMilestones.findIndex(item => item.id === m.id) + 1;
                  const isDone = completedMilestones.includes(m.targetId);
                  const isActive = nextMilestone && nextMilestone.id === m.id;
                  
                  return (
                    <div 
                      key={m.id} 
                      className={`relative flex gap-6 items-center z-10 group ${
                        isActive ? 'scale-[1.01] transition-transform' : ''
                      }`}
                    >
                      {/* Left icon/indicator */}
                      <div className="relative shrink-0">
                        {isDone ? (
                          <div className="bg-emerald-400 border-4 border-slate-800 dark:border-slate-700 w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] text-slate-900">
                            <CheckCircle2 size={24} className="md:size-8" />
                          </div>
                        ) : isActive ? (
                          <button 
                            onClick={() => launchMilestone(m)}
                            className="bg-yellow-300 dark:bg-yellow-450 border-4 border-slate-800 dark:border-slate-700 w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] cursor-pointer hover:bg-yellow-400 animate-bounce-slow text-slate-900"
                          >
                            <Play size={20} className="md:size-6 fill-slate-900 ml-1" />
                          </button>
                        ) : (
                          <div className="bg-white dark:bg-slate-800 border-4 border-slate-800 dark:border-slate-700 w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] text-slate-400 dark:text-slate-500">
                            <span className="font-black text-sm md:text-lg">{absoluteIdx}</span>
                          </div>
                        )}
                      </div>
 
                      {/* Right timeline Card */}
                      <div 
                        onClick={() => launchMilestone(m)}
                        className={`flex-1 text-left bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-5 md:p-6 shadow-[5px_5px_0_0_#1e293b] dark:shadow-[5px_5px_0_0_#020617] cursor-pointer transition-all hover:translate-x-1.5 hover:shadow-[3px_3px_0_0_#1e293b] dark:hover:shadow-[3px_3px_0_0_#020617] select-none ${
                          isActive 
                            ? 'border-yellow-400 dark:border-yellow-500 bg-yellow-50/55 dark:bg-yellow-950/20 shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#020617] ring-4 ring-yellow-300/30 dark:ring-yellow-500/20' 
                            : isDone 
                              ? 'border-emerald-500 dark:border-emerald-600 bg-emerald-50/10 dark:bg-emerald-950/10' 
                              : 'hover:border-slate-900 dark:hover:border-slate-500'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-slate-400 dark:text-slate-500 text-xs md:text-sm font-black">Chặng {absoluteIdx}</span>
                              {getMilestoneTypeBadge(m.type)}
                              {isActive && (
                                <span className="bg-yellow-300 dark:bg-yellow-450 text-slate-900 border-2 border-slate-800 dark:border-slate-700 px-2 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-[1px_1px_0_0_#1e293b] dark:shadow-[1px_1px_0_0_#020617]">
                                  <Sparkles size={10} /> Học Tiếp
                                </span>
                              )}
                            </div>
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 leading-tight">
                              {m.title}
                              {m.kids && <span className="text-base">👶</span>}
                            </h4>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs md:text-sm leading-relaxed">{m.desc}</p>
                            {getExamBadge(m.exam)}
                          </div>
                          
                          <div className="shrink-0 flex sm:flex-col items-end gap-2 justify-between">
                            {isDone ? (
                              <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border-2 border-emerald-800 dark:border-emerald-700 px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1">
                                HOÀN THÀNH
                              </span>
                            ) : (
                              <Btn3D 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  launchMilestone(m);
                                }}
                                color={isActive ? 'bg-yellow-300 text-slate-900' : 'bg-slate-900 text-white'}
                                className="text-xs px-4 py-2 shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                              >
                                {isActive ? 'HỌC NGAY' : 'BẮT ĐẦU'}
                              </Btn3D>
                            )}
                          </div>
                        </div>
                      </div>
 
                    </div>
                  );
                })}
              </div>
 
            </div>
          ))}
      </div>

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
 
export default WelcomePage;
