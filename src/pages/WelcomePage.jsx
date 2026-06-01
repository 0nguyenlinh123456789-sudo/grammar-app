// File: src/pages/WelcomePage.jsx
import React, { useState } from 'react';
import { roadmapData } from '../data/roadmapData';
import { 
  Trophy, CheckCircle2, Lock, Play, Compass, Award, 
  Zap, BookOpen, Flame, Sparkles, AlertCircle, ArrowRight
} from 'lucide-react';
import Btn3D from '../components/common/Btn3D';

const WelcomePage = ({ 
  xp, 
  completedMilestones = [], 
  setTopicId, 
  setAppMode, 
  setActiveVocabCategory, 
  setOxfordUnitId, 
  setVstepTopicId 
}) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'beginner', 'intermediate', 'advanced'

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
        return <span className="bg-cyan-100 text-cyan-800 border-2 border-slate-800 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_#1e293b]"><BookOpen size={12}/> Ngữ Pháp</span>;
      case 'oxford':
        return <span className="bg-red-100 text-red-800 border-2 border-slate-800 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_#1e293b]"><Flame size={12}/> Oxford Vocab</span>;
      case 'vstep':
        return <span className="bg-indigo-100 text-indigo-800 border-2 border-slate-800 px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_0_#1e293b]"><Compass size={12}/> VSTEP Vocab</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 font-sans text-slate-800 selection:bg-yellow-300">
      
      {/* --- HERO DASHBOARD CARD --- */}
      <div className="bg-white border-[4px] border-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-[10px_10px_0_0_#1c293b] mb-10 mt-4 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 bg-yellow-100 w-40 h-40 rounded-full opacity-50 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 bg-cyan-100 w-40 h-40 rounded-full opacity-50 blur-2xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10 relative">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-yellow-300 border-2 border-slate-800 px-3 py-1 rounded-xl shadow-[3px_3px_0_0_#1e293b] font-black text-xs uppercase tracking-wider">
              <Sparkles size={14} className="animate-spin-slow" /> {getRankName(completedCount)}
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none text-slate-900 mt-2">LỘ TRÌNH CHINH PHỤC</h2>
            <p className="font-bold text-lg text-slate-500">Học Tiếng Anh bài bản từ Cơ bản đến Nâng cao</p>
          </div>

          <div className="bg-amber-50 border-4 border-slate-800 p-4 rounded-3xl shadow-[4px_4px_0_0_#1e293b] flex items-center gap-4 w-full md:w-auto">
            <Trophy size={48} className="text-yellow-500 fill-yellow-300 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tiến Độ Lộ Trình</p>
              <p className="text-3xl font-black text-slate-900">{completedCount} / {totalMilestonesCount}</p>
              <p className="text-xs font-black text-slate-500">Chặng đã hoàn thành ({completionPercentage}%)</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 border-4 border-slate-800 bg-slate-100 h-8 rounded-2xl overflow-hidden shadow-[3px_3px_0_0_rgba(0,0,0,1)] relative flex items-center">
          <div 
            className="bg-emerald-400 h-full border-r-4 border-slate-800 transition-all duration-500 flex items-center justify-end pr-2 font-black text-xs" 
            style={{ width: `${Math.max(completionPercentage, 5)}%` }}
          >
            {completionPercentage > 8 && `${completionPercentage}%`}
          </div>
          {completionPercentage <= 8 && (
            <div className="absolute left-4 font-black text-xs text-slate-400">
              {completionPercentage}%
            </div>
          )}
        </div>
      </div>

      {/* --- QUICK RESUME CARD (NEXT GOAL) --- */}
      {nextMilestone && (
        <div className="bg-[#f0f9ff] border-[4px] border-slate-800 rounded-3xl p-6 shadow-[8px_8px_0_0_#1c293b] mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-300 border-4 border-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-[3px_3px_0_0_#1e293b] shrink-0">
              <Zap size={32} className="text-slate-900 fill-slate-900 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black text-blue-500 uppercase tracking-wider">CHẶNG TIẾP THEO CỦA BẠN</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
                {nextMilestoneIndex + 1}. {nextMilestone.title}
                {getMilestoneTypeBadge(nextMilestone.type)}
              </h3>
              <p className="text-slate-500 font-bold text-sm mt-1">{nextMilestone.desc}</p>
            </div>
          </div>
          <button 
            onClick={() => launchMilestone(nextMilestone)}
            className="w-full md:w-auto cursor-pointer font-black text-lg px-8 py-4 bg-slate-900 text-white rounded-2xl border-4 border-slate-800 shadow-[4px_4px_0_0_#febb07] hover:bg-slate-800 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 shrink-0 font-sans"
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
            className={`cursor-pointer font-black px-5 py-3 rounded-2xl border-4 border-slate-800 transition-all text-sm whitespace-nowrap shadow-[3px_3px_0_0_#1e293b] flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-yellow-300 text-slate-900 translate-y-0.5 shadow-none' 
                : 'bg-white text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.title} 
            <span className="bg-slate-800 text-white text-xs px-2 py-0.5 rounded-lg border-2 border-slate-800">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* --- ROADMAP TIMELINE PATH --- */}
      <div className="space-y-12 relative pl-6 md:pl-10">
        {/* Draw timeline vertical line */}
        <div className="absolute left-[34px] md:left-[50px] top-6 bottom-6 w-1 bg-slate-800 border-2 border-slate-800 border-dashed rounded-full pointer-events-none"></div>

        {roadmapData
          .filter(level => activeTab === 'all' || activeTab === level.level)
          .map((level, levelIdx) => (
            <div key={level.level} className="space-y-6">
              
              {/* Level Divider Header */}
              {activeTab === 'all' && (
                <div className="relative z-10 flex items-center gap-3 bg-white border-4 border-slate-800 px-6 py-4 rounded-3xl shadow-[5px_5px_0_0_#1e293b] -ml-6 md:-ml-10">
                  <div className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shrink-0 shadow-[2px_2px_0_0_#1e293b]">
                    {level.level === 'beginner' ? 'I' : level.level === 'intermediate' ? 'II' : 'III'}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-slate-900 leading-tight">{level.levelTitle}</h3>
                    <p className="text-slate-400 font-bold text-xs md:text-sm mt-0.5">{level.levelDesc}</p>
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
                          <div className="bg-emerald-400 border-4 border-slate-800 w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-[3px_3px_0_0_#1e293b] text-slate-900">
                            <CheckCircle2 size={24} className="md:size-8" />
                          </div>
                        ) : isActive ? (
                          <button 
                            onClick={() => launchMilestone(m)}
                            className="bg-yellow-300 border-4 border-slate-800 w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-[3px_3px_0_0_#1e293b] cursor-pointer hover:bg-yellow-400 animate-bounce-slow text-slate-900"
                          >
                            <Play size={20} className="md:size-6 fill-slate-900 ml-1" />
                          </button>
                        ) : (
                          <div className="bg-white border-4 border-slate-800 w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-[3px_3px_0_0_#1e293b] text-slate-400">
                            <span className="font-black text-sm md:text-lg">{absoluteIdx}</span>
                          </div>
                        )}
                      </div>

                      {/* Right timeline Card */}
                      <div 
                        onClick={() => launchMilestone(m)}
                        className={`flex-1 text-left bg-white border-4 border-slate-800 rounded-3xl p-5 md:p-6 shadow-[5px_5px_0_0_#1e293b] cursor-pointer transition-all hover:translate-x-1.5 hover:shadow-[3px_3px_0_0_#1e293b] select-none ${
                          isActive 
                            ? 'border-yellow-400 bg-yellow-50/50 shadow-[6px_6px_0_0_#1e293b] ring-4 ring-yellow-300/30' 
                            : isDone 
                              ? 'border-emerald-500 bg-emerald-50/10' 
                              : 'hover:border-slate-900'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-slate-400 text-xs md:text-sm font-black">Chặng {absoluteIdx}</span>
                              {getMilestoneTypeBadge(m.type)}
                              {isActive && (
                                <span className="bg-yellow-300 text-slate-900 border-2 border-slate-800 px-2 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-[1px_1px_0_0_#1e293b]">
                                  <Sparkles size={10} /> Học Tiếp
                                </span>
                              )}
                            </div>
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2 leading-tight">
                              {m.title}
                            </h4>
                            <p className="text-slate-500 font-bold text-xs md:text-sm leading-relaxed">{m.desc}</p>
                          </div>
                          
                          <div className="shrink-0 flex sm:flex-col items-end gap-2 justify-between">
                            {isDone ? (
                              <span className="bg-emerald-100 text-emerald-800 border-2 border-emerald-800 px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1">
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

    </div>
  );
};

export default WelcomePage;
