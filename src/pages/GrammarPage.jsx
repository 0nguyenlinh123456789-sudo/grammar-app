// File: src/pages/GrammarPage.jsx
import React, { useState, useEffect } from 'react';
import SketchnoteTheory from '../components/grammar/SketchnoteTheory';
import SentenceBuilder from '../components/grammar/SentenceBuilder';
import AiAssistant from '../components/grammar/AiAssistant';
import QuizEngine from '../components/grammar/QuizEngine';
import FillBlanksExercise from '../components/grammar/FillBlanksExercise';
import ErrorCorrectionExercise from '../components/grammar/ErrorCorrectionExercise';
import TransformationExercise from '../components/grammar/TransformationExercise';
import MatchingExercise from '../components/grammar/MatchingExercise';
import TrueFalseExercise from '../components/grammar/TrueFalseExercise';
import { BookOpen, Puzzle, Bot, PenTool, PenLine, AlertTriangle, Repeat, Link2, HelpCircle } from 'lucide-react';

const GrammarPage = ({ topic, setXp, completeMilestone }) => {
  const [tab, setTab] = useState('theory');

  // Reset tab to theory when topic changes
  useEffect(() => {
    setTab('theory');
  }, [topic?.id]);

  if (!topic) return null;

  const tabs = [
    { id: 'theory', label: 'Lý Thuyết', icon: BookOpen, color: 'bg-cyan-500' },
    { id: 'sentence', label: 'Xếp Câu', icon: Puzzle, color: 'bg-amber-500' },
    { id: 'exercise', label: 'Trắc Nghiệm', icon: PenTool, color: 'bg-emerald-500' },
    { id: 'fillblanks', label: 'Điền Từ', icon: PenLine, color: 'bg-blue-500', data: topic.fillBlanks },
    { id: 'errorcorrection', label: 'Sửa Lỗi', icon: AlertTriangle, color: 'bg-orange-500', data: topic.errorCorrection },
    { id: 'transformation', label: 'Viết Lại', icon: Repeat, color: 'bg-purple-500', data: topic.transformation },
    { id: 'matching', label: 'Nối Câu', icon: Link2, color: 'bg-teal-500', data: topic.matching },
    { id: 'truefalse', label: 'Đúng/Sai', icon: HelpCircle, color: 'bg-rose-500', data: topic.trueFalse },
    { id: 'ai', label: 'Gia Sư AI', icon: Bot, color: 'bg-yellow-500' },
  ];

  // Hiển thị TẤT CẢ các tab (kể cả khi chưa có dữ liệu) để fix lỗi người dùng tưởng button không hiển thị
  const availableTabs = tabs;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in dark:text-slate-100 transition-colors duration-300">
      <div className={`${topic.color} dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 border-[4px] border-slate-800 rounded-[3rem] p-8 md:p-10 mb-8 shadow-[12px_12px_0_0_#1e293b] dark:shadow-[12px_12px_0_0_#020617]`}>
         <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-800 dark:text-slate-100">{topic.title}</h2>
         {topic.category && (
           <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mt-2 opacity-75">
             📂 {topic.category} · Cấp độ {topic.level}
           </p>
         )}
      </div>
      
      {/* Scrollable tabs */}
      <div className="flex overflow-x-auto gap-2 md:gap-3 mb-8 pb-2 scrollbar-hide shrink-0 -mx-2 px-2">
        {availableTabs.map(t => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button 
              key={t.id}
              onClick={() => setTab(t.id)} 
              className={`font-black px-4 py-3 text-sm md:text-base rounded-2xl border-[3px] md:border-[4px] border-slate-800 dark:border-slate-700 whitespace-nowrap transition-all shadow-[3px_3px_0px_0px_#1e293b] dark:shadow-[3px_3px_0px_0px_#020617] cursor-pointer flex items-center gap-1.5 md:gap-2 ${
                isActive 
                  ? `${t.id === 'ai' ? 'bg-yellow-300 dark:bg-yellow-450 dark:text-slate-900' : 'bg-slate-800 dark:bg-slate-700 text-white'} translate-y-1 shadow-none` 
                  : 'bg-white dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              <Icon size={16} className={isActive ? '' : 'opacity-60'} />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {tab === 'theory' && topic.theory.map((s, i) => (
        <SketchnoteTheory key={i} section={s} idx={i} />
      ))}
      {tab === 'sentence' && (
        <SentenceBuilder 
          sentences={topic.sentenceGame} 
          setGlobalProgress={setXp} 
          onComplete={() => completeMilestone(topic.id, 25)}
        />
      )}
      {tab === 'ai' && (
        <AiAssistant topic={topic} sentences={topic.sentenceGame} />
      )}
      {tab === 'exercise' && (
        <QuizEngine 
          exercises={topic.exercises} 
          setGlobalProgress={setXp} 
          onComplete={() => completeMilestone(topic.id, 40)}
        />
      )}
      {tab === 'fillblanks' && (
        topic.fillBlanks && topic.fillBlanks.length > 0 ? (
          <FillBlanksExercise
            exercises={topic.fillBlanks}
            setGlobalProgress={setXp}
            onComplete={() => completeMilestone(topic.id, 30)}
          />
        ) : (
          <div className="p-10 font-bold text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 animate-fade-in mt-4">
            <p className="text-2xl mb-2">🚧</p>
            Dữ liệu dạng bài này đang được cập nhật...
          </div>
        )
      )}
      {tab === 'errorcorrection' && (
        topic.errorCorrection && topic.errorCorrection.length > 0 ? (
          <ErrorCorrectionExercise
            exercises={topic.errorCorrection}
            setGlobalProgress={setXp}
            onComplete={() => completeMilestone(topic.id, 30)}
          />
        ) : (
          <div className="p-10 font-bold text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 animate-fade-in mt-4">
            <p className="text-2xl mb-2">🚧</p>
            Dữ liệu dạng bài này đang được cập nhật...
          </div>
        )
      )}
      {tab === 'transformation' && (
        topic.transformation && topic.transformation.length > 0 ? (
          <TransformationExercise
            exercises={topic.transformation}
            setGlobalProgress={setXp}
            onComplete={() => completeMilestone(topic.id, 35)}
          />
        ) : (
          <div className="p-10 font-bold text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 animate-fade-in mt-4">
            <p className="text-2xl mb-2">🚧</p>
            Dữ liệu dạng bài này đang được cập nhật...
          </div>
        )
      )}
      {tab === 'matching' && (
        topic.matching && topic.matching.length > 0 ? (
          <MatchingExercise
            exercises={topic.matching}
            setGlobalProgress={setXp}
            onComplete={() => completeMilestone(topic.id, 25)}
          />
        ) : (
          <div className="p-10 font-bold text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 animate-fade-in mt-4">
            <p className="text-2xl mb-2">🚧</p>
            Dữ liệu dạng bài này đang được cập nhật...
          </div>
        )
      )}
      {tab === 'truefalse' && (
        topic.trueFalse && topic.trueFalse.length > 0 ? (
          <TrueFalseExercise
            exercises={topic.trueFalse}
            setGlobalProgress={setXp}
            onComplete={() => completeMilestone(topic.id, 25)}
          />
        ) : (
          <div className="p-10 font-bold text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 animate-fade-in mt-4">
            <p className="text-2xl mb-2">🚧</p>
            Dữ liệu dạng bài này đang được cập nhật...
          </div>
        )
      )}
    </div>
  );
};

export default GrammarPage;
