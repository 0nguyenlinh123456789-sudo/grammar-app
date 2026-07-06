// File: src/App.jsx
import React, { useState, useEffect, Suspense, lazy } from 'react';

// Data layer
import { parsedGrammarData, grammarLevels } from './data/grammarData';
import { courseData as courseDataPart1 } from './data/oxfordData';
import { courseData as courseDataPart2 } from './data/oxfordDataPart2';
import { courseData as courseDataPart3 } from './data/oxfordDataPart3';
import { courseData as courseDataPreInt } from './data/oxfordPreIntData';
import { courseData51_75 as courseDataPreIntPart3 } from './data/oxfordPreIntData51_75';
import { courseData76_100 as courseDataPreIntPart4 } from './data/oxfordPreIntData76_100';
import { courseData1_25 as courseDataAdvancedPart1 } from './data/oxfordAdvancedData1_25';
import { courseData26_50 as courseDataAdvancedPart2 } from './data/oxfordAdvancedData26_50';
import { courseData51_75 as courseDataAdvancedPart3 } from './data/oxfordAdvancedData51_75';
import { courseData76_100 as courseDataAdvancedPart4 } from './data/oxfordAdvancedData76_100';
import vocabVstepData from './data/vocabVstepData';
import { roadmapData } from './data/roadmapData';

const elementaryUnits = [...courseDataPart1, ...courseDataPart2, ...courseDataPart3];
const preIntUnits = [...courseDataPreInt, ...courseDataPreIntPart3, ...courseDataPreIntPart4];
const advancedUnits = [...courseDataAdvancedPart1, ...courseDataAdvancedPart2, ...courseDataAdvancedPart3, ...courseDataAdvancedPart4];

const oxfordBooks = [
  {
    id: 'elementary',
    title: 'English Vocabulary in Use - Elementary',
    description: 'Giáo trình từ vựng Oxford cấp độ Cơ bản (60 Units)',
    units: elementaryUnits
  },
  {
    id: 'pre_intermediate',
    title: 'English Vocabulary in Use - Pre-Intermediate & Intermediate',
    description: 'Giáo trình từ vựng Oxford cấp độ Trung cấp (100 Units)',
    units: preIntUnits
  },
  {
    id: 'advanced',
    title: 'English Vocabulary in Use - Advanced',
    description: 'Giáo trình từ vựng Oxford cấp độ Cao cấp, dành cho IELTS 7.0+ và C1-C2 (100 Units)',
    units: advancedUnits
  }
];

const courseData = [
  ...elementaryUnits,
  ...preIntUnits,
  ...advancedUnits
];

// Layout layer
import MainLayout from './layouts/MainLayout';

// Page/Route layer — lazy-loaded so each route ships as its own chunk and the
// initial bundle stays small (Games/Scanner/Oxford aren't downloaded until used).
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const GrammarPage = lazy(() => import('./pages/GrammarPage'));
const VocabVstepPage = lazy(() => import('./pages/VocabVstepPage'));
const VocabOxfordPage = lazy(() => import('./pages/VocabOxfordPage'));
const ScannerPage = lazy(() => import('./pages/ScannerPage'));
const GamesPage = lazy(() => import('./pages/GamesPage'));

// Fallback shown briefly while a route chunk loads.
const RouteLoader = () => (
  <div className="flex items-center justify-center py-24 text-slate-400 font-black text-lg gap-3">
    <span className="inline-block w-6 h-6 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></span>
    Đang tải...
  </div>
);

export default function App() {
  // Navigation & Mode states
  const [appMode, setAppMode] = useState('grammar'); // 'grammar', 'vocab', 'scanner'
  const [activeVocabCategory, setActiveVocabCategory] = useState('TOPIC'); // 'TOPIC', 'OXFORD'
  
  // Topic/Unit states
  const [topicId, setTopicId] = useState(null); // Active grammar topic ID
  const [oxfordUnitId, setOxfordUnitId] = useState(() => {
    const savedUnitId = localStorage.getItem('oxfordUnitId');
    if (savedUnitId && savedUnitId !== 'null') {
      return isNaN(savedUnitId) ? savedUnitId : parseInt(savedUnitId, 10);
    }
    const savedBook = localStorage.getItem('activeOxfordBookId') || 'elementary';
    const book = oxfordBooks.find(b => b.id === savedBook) || oxfordBooks[0];
    return book.units[0]?.id || 1;
  }); // Active Oxford unit ID
  const [vstepTopicId, setVstepTopicId] = useState('travel-transport'); // Active VSTEP topic ID
  
  // Oxford Book State
  const [activeOxfordBookId, setActiveOxfordBookId] = useState(() => {
    const savedBook = localStorage.getItem('activeOxfordBookId');
    return savedBook ? savedBook : 'elementary';
  });

  // Theme mode state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  // Global user progress state
  const [xp, setXp] = useState(() => {
    const savedXp = localStorage.getItem('xp');
    return savedXp ? parseInt(savedXp, 10) : 0;
  });

  const [completedMilestones, setCompletedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('completedMilestones');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  // Daily Streak States
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastActiveDate, setLastActiveDate] = useState(() => {
    return localStorage.getItem('lastActiveDate') || '';
  });

  // Best (longest) streak ever achieved
  const [bestStreak, setBestStreak] = useState(() => {
    const saved = localStorage.getItem('bestStreak');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Daily goal tracking: how many lessons + XP earned today
  const [dailyStats, setDailyStats] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('dailyStats') || 'null');
      const todayStr = new Date().toDateString();
      if (saved && saved.date === todayStr) return saved;
    } catch (e) { /* ignore */ }
    return { date: new Date().toDateString(), lessons: 0, xp: 0 };
  });
  const DAILY_GOAL = 1; // hoàn thành ít nhất 1 chặng mỗi ngày

  // Persist XP and completed milestones to localStorage
  useEffect(() => {
    localStorage.setItem('xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('completedMilestones', JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  // Persist streak and last active date to localStorage
  useEffect(() => {
    localStorage.setItem('streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('lastActiveDate', lastActiveDate);
  }, [lastActiveDate]);

  useEffect(() => {
    localStorage.setItem('bestStreak', bestStreak.toString());
  }, [bestStreak]);

  useEffect(() => {
    localStorage.setItem('dailyStats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  // Keep bestStreak in sync whenever the current streak sets a new record
  useEffect(() => {
    if (streak > bestStreak) setBestStreak(streak);
  }, [streak, bestStreak]);

  // Check if streak is broken on mount
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toDateString();
    
    if (lastActiveDate) {
      const lastDate = new Date(lastActiveDate);
      const d1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const d2 = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
      const diffDays = Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        setStreak(0);
      }
    }
  }, [lastActiveDate]);

  // Persist Oxford Book choice
  useEffect(() => {
    localStorage.setItem('activeOxfordBookId', activeOxfordBookId);
  }, [activeOxfordBookId]);

  // Persist Oxford Unit ID choice
  useEffect(() => {
    localStorage.setItem('oxfordUnitId', oxfordUnitId);
  }, [oxfordUnitId]);

  // Persist and Apply Theme
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Oxford unit selector helper
  const selectOxfordUnit = (unitId) => {
    const book = oxfordBooks.find(b => b.units.some(u => u.id === unitId));
    if (book) {
      setActiveOxfordBookId(book.id);
    }
    setOxfordUnitId(unitId);
  };

  // Confetti Particle Trigger
  const triggerConfetti = () => {
    const colors = ['#febb07', '#38bdf8', '#4ade80', '#f43f5e', '#a855f7', '#fb923c'];
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.transform = `scale(${Math.random() * 0.8 + 0.4})`;
      p.style.animationDelay = Math.random() * 0.5 + 's';
      p.style.animationDuration = Math.random() * 1.5 + 2 + 's';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  };

  // Reset roadmap state
  const resetRoadmap = () => {
    setXp(0);
    setCompletedMilestones([]);
    setStreak(0);
    setLastActiveDate('');
    const freshDaily = { date: new Date().toDateString(), lessons: 0, xp: 0 };
    setDailyStats(freshDaily);
    localStorage.setItem('xp', '0');
    localStorage.setItem('completedMilestones', JSON.stringify([]));
    localStorage.setItem('streak', '0');
    localStorage.setItem('lastActiveDate', '');
    localStorage.setItem('dailyStats', JSON.stringify(freshDaily));
    // Note: bestStreak is a lifetime record — intentionally not reset.
  };

  // Computed selections
  const selectedGrammarTopic = parsedGrammarData.find(t => t.id === topicId);
  const selectedBook = oxfordBooks.find(b => b.id === activeOxfordBookId) || oxfordBooks[0];
  const selectedOxfordUnit = selectedBook.units.find(u => u.id === oxfordUnitId) || selectedBook.units[0];
  const selectedVstepTopic = vocabVstepData.find(t => t.id === vstepTopicId);

  // Global Speech Synthesis Helper
  const playAudio = (text, lang = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Clear any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt của bạn không hỗ trợ phát âm.");
    }
  };

  const completeMilestone = (id, xpBonus = 20) => {
    if (!completedMilestones.includes(id)) {
      setCompletedMilestones(prev => [...prev, id]);
      setXp(prev => prev + xpBonus);

      // Update Daily Streak
      const today = new Date();
      const todayStr = today.toDateString();

      // Update today's goal stats (reset if it's a new day)
      setDailyStats(prev => {
        const base = prev.date === todayStr ? prev : { date: todayStr, lessons: 0, xp: 0 };
        return { ...base, lessons: base.lessons + 1, xp: base.xp + xpBonus };
      });
      
      if (lastActiveDate !== todayStr) {
        if (lastActiveDate) {
          const lastDate = new Date(lastActiveDate);
          const d1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const d2 = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
          const diffDays = Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            setStreak(prev => prev + 1);
          } else {
            setStreak(1);
          }
        } else {
          setStreak(1);
        }
        setLastActiveDate(todayStr);
      }
      
      triggerConfetti();
    }
  };

  // Render view coordinator (State-based Router)
  const renderContent = () => {
    switch (appMode) {
      case 'grammar':
        return topicId ? (
          <GrammarPage 
            topic={selectedGrammarTopic} 
            setXp={setXp} 
            completeMilestone={completeMilestone} 
          />
        ) : (
          <WelcomePage 
            xp={xp}
            completedMilestones={completedMilestones}
            completeMilestone={completeMilestone}
            setTopicId={setTopicId}
            setAppMode={setAppMode}
            setActiveVocabCategory={setActiveVocabCategory}
            setOxfordUnitId={selectOxfordUnit}
            setVstepTopicId={setVstepTopicId}
            resetRoadmap={resetRoadmap}
            streak={streak}
            bestStreak={bestStreak}
            dailyStats={dailyStats}
            dailyGoal={DAILY_GOAL}
            playAudio={playAudio}
            theme={theme}
            setTheme={setTheme}
          />
        );

      case 'vocab':
        if (activeVocabCategory === 'TOPIC') {
          return (
            <VocabVstepPage 
              activeTopic={selectedVstepTopic} 
              playAudio={playAudio} 
              completedMilestones={completedMilestones}
              completeMilestone={completeMilestone}
            />
          );
        } else {
          return (
            <VocabOxfordPage 
              selectedUnit={selectedOxfordUnit} 
              completedMilestones={completedMilestones}
              completeMilestone={completeMilestone}
            />
          );
        }

      case 'scanner':
        return <ScannerPage />;

      case 'games':
        return (
          <GamesPage
            activeTopic={selectedVstepTopic}
            playAudio={playAudio}
            completeMilestone={completeMilestone}
          />
        );

      default:
        return (
          <WelcomePage 
            xp={xp}
            completedMilestones={completedMilestones}
            completeMilestone={completeMilestone}
            setTopicId={setTopicId}
            setAppMode={setAppMode}
            setActiveVocabCategory={setActiveVocabCategory}
            setOxfordUnitId={selectOxfordUnit}
            setVstepTopicId={setVstepTopicId}
            resetRoadmap={resetRoadmap}
            streak={streak}
            bestStreak={bestStreak}
            dailyStats={dailyStats}
            dailyGoal={DAILY_GOAL}
            playAudio={playAudio}
            theme={theme}
            setTheme={setTheme}
          />
        );
    }
  };

  return (
    <MainLayout
      xp={xp}
      appMode={appMode}
      setAppMode={setAppMode}
      topicId={topicId}
      setTopicId={setTopicId}
      activeVocabCategory={activeVocabCategory}
      setActiveVocabCategory={setActiveVocabCategory}
      oxfordUnitId={oxfordUnitId}
      setOxfordUnitId={selectOxfordUnit}
      vstepTopicId={vstepTopicId}
      setVstepTopicId={setVstepTopicId}
      vstepTopics={vocabVstepData}
      parsedGrammarData={parsedGrammarData}
      grammarLevels={grammarLevels}
      courseData={selectedBook.units}
      oxfordBooks={oxfordBooks}
      activeOxfordBookId={activeOxfordBookId}
      setActiveOxfordBookId={setActiveOxfordBookId}
      completedMilestones={completedMilestones}
      theme={theme}
      setTheme={setTheme}
      resetRoadmap={resetRoadmap}
      streak={streak}
    >
      <Suspense fallback={<RouteLoader />}>
        {renderContent()}
      </Suspense>
    </MainLayout>
  );
}