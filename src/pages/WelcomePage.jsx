// File: src/pages/WelcomePage.jsx
import React, { useState } from 'react';
import { roadmapData } from '../data/roadmapData';
import { 
  Trophy, CheckCircle2, Lock, Play, Compass, Award, 
  Zap, BookOpen, Flame, Sparkles, AlertCircle, ArrowRight, RotateCcw, AlertTriangle
} from 'lucide-react';
import Btn3D from '../components/common/Btn3D';

const WelcomePage = ({ 
  xp, 
  completedMilestones = [], 
  setTopicId, 
  setAppMode, 
  setActiveVocabCategory, 
  setOxfordUnitId, 
  setVstepTopicId,
  resetRoadmap,
  streak = 0
}) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'beginner', 'intermediate', 'advanced'
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

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
      setActiveVocabCategory('VSTEP');
      setVstepTopicId(milestone.targetId);
    }
  };

  // Rank name based on completed milestones
  const getRankName = (count) => {
    if (count >= 24) return 'Bậc Thầy Ngữ Pháp (Grandmaster)';
    if (count >= 16) return 'Chiến Binh Tiếng Anh (Expert)';
    if (count >= 8) return 'Kẻ Chinh Phục (Explorer)';
    return 'Tân Binh Ngữ Pháp (Beginner)';
  };

  const getMilestoneTypeBadge = (type) => {
    switch (type) {
      case 'grammar':
        return <span className="bg-cyan-100 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-400 border-2 border-slate-800 dark:border-slate-700 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]"><BookOpen size={12}/> Ngữ Pháp</span>;
      case 'oxford':
        return <span className="bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-400 border-2 border-slate-800 dark:border-slate-700 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]"><Flame size={12}/> Oxford Vocab</span>;
      case 'vstep':
        return <span className="bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-400 border-2 border-slate-800 dark:border-slate-700 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]"><Compass size={12}/> VSTEP Vocab</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 font-sans text-slate-800 dark:text-slate-100 selection:bg-yellow-300 transition-colors duration-300">
      
      {/* --- HERO DASHBOARD CARD --- */}
      <div className="bg-white dark:bg-slate-900 border-[4px] border-slate-800 dark:border-slate-700 rounded-[2.5rem] p-6 md:p-8 shadow-[10px_10px_0_0_#1c293b] dark:shadow-[10px_10px_0_0_#020617] mb-10 mt-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10 relative">
          <div className="flex items-center gap-5">
            {/* Bunny Mascot inside Hero */}
            <div className="hidden lg:block relative shrink-0">
              <img 
                src="/mascot_bunny.png" 
                alt="Bunny Scholar" 
                className="w-24 h-24 animate-float object-contain" 
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-full border-2 border-slate-700">
                🐰 Bunny
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-yellow-300 dark:bg-yellow-450 border-2 border-slate-800 dark:border-slate-700 px-3 py-1 rounded-xl shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] font-black text-slate-900 text-xs uppercase tracking-wider">
                <Sparkles size={14} className="animate-spin-slow" /> {getRankName(completedCount)}
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none text-slate-900 dark:text-slate-100 mt-2">LỘ TRÌNH CHINH PHỤC</h2>
              <p className="font-bold text-sm md:text-base text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-750 relative mt-2 bubble-arrow-left leading-relaxed">
                "Chào mừng bạn! Tớ là Bunny 🐰. Hãy cùng tớ khám phá bản đồ học tập tiếng Anh, tích lũy thật nhiều XP và duy trì chuỗi học hằng ngày nhé! 🌟"
              </p>
            </div>
          </div>
 
          <div className="flex flex-col xl:flex-row gap-4 w-full md:w-auto items-stretch shrink-0">
            {/* Progress Card */}
            <div className="bg-amber-50 dark:bg-slate-800 border-4 border-slate-800 dark:border-slate-700 p-4 rounded-3xl shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] flex items-center gap-4 flex-1 sm:flex-initial">
              <Trophy size={48} className="text-yellow-500 fill-yellow-300 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tiến Độ Lộ Trình</p>
                <p className="text-3xl font-black text-slate-900 dark:text-slate-100">{completedCount} / {totalMilestonesCount}</p>
                <p className="text-xs font-black text-slate-500 dark:text-slate-400">Chặng đã hoàn thành ({completionPercentage}%)</p>
              </div>
            </div>

            {/* Streak Card */}
            <div className="bg-rose-50 dark:bg-slate-800 border-4 border-slate-800 dark:border-slate-700 p-4 rounded-3xl shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] flex items-center gap-4 flex-1 sm:flex-initial">
              <Flame size={48} className="text-rose-500 fill-rose-300 shrink-0 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest">Chuỗi Học Tập</p>
                <p className="text-3xl font-black text-slate-900 dark:text-slate-100">{streak} Ngày</p>
                <p className="text-xs font-black text-slate-500 dark:text-slate-400">🔥 Học tập mỗi ngày!</p>
              </div>
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
          { id: 'beginner', title: 'SƠ CẤP (A1-A2)', count: roadmapData[0].milestones.length },
          { id: 'intermediate', title: 'TRUNG CẤP (B1-B2)', count: roadmapData[1].milestones.length },
          { id: 'advanced', title: 'CAO CẤP (C1-C2)', count: roadmapData[2].milestones.length }
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
                <div className="relative z-10 flex items-center gap-3 bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 px-6 py-4 rounded-3xl shadow-[5px_5px_0_0_#1e293b] dark:shadow-[5px_5px_0_0_#020617] -ml-6 md:-ml-10">
                  <div className="bg-slate-900 dark:bg-slate-800 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shrink-0 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]">
                    {level.level === 'beginner' ? 'I' : level.level === 'intermediate' ? 'II' : 'III'}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-slate-900 dark:text-slate-100 leading-tight">{level.levelTitle}</h3>
                    <p className="text-slate-400 dark:text-slate-500 font-bold text-xs md:text-sm mt-0.5">{level.levelDesc}</p>
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
                      className={`relative flex gap-6 items-start z-10 group ${
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
                            </h4>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs md:text-sm leading-relaxed">{m.desc}</p>
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
