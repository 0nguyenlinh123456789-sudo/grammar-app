// File: src/App.jsx
import React, { useState, useEffect } from 'react';

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

// Page/Route layer
import WelcomePage from './pages/WelcomePage';
import GrammarPage from './pages/GrammarPage';
import VocabVstepPage from './pages/VocabVstepPage';
import VocabOxfordPage from './pages/VocabOxfordPage';
import ScannerPage from './pages/ScannerPage';

export default function App() {
  // Navigation & Mode states
  const [appMode, setAppMode] = useState('grammar'); // 'grammar', 'vocab', 'scanner'
  const [activeVocabCategory, setActiveVocabCategory] = useState('VSTEP'); // 'VSTEP', 'OXFORD'
  
  // Topic/Unit states
  const [topicId, setTopicId] = useState(null); // Active grammar topic ID
  const [oxfordUnitId, setOxfordUnitId] = useState(() => {
    const savedUnitId = localStorage.getItem('oxfordUnitId');
    if (savedUnitId) {
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
    const saved = localStorage.getItem('completedMilestones');
    return saved ? JSON.parse(saved) : [];
  });

  // Daily Streak States
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastActiveDate, setLastActiveDate] = useState(() => {
    return localStorage.getItem('lastActiveDate') || '';
  });

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
    localStorage.setItem('xp', '0');
    localStorage.setItem('completedMilestones', JSON.stringify([]));
    localStorage.setItem('streak', '0');
    localStorage.setItem('lastActiveDate', '');
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
          />
        );

      case 'vocab':
        if (activeVocabCategory === 'VSTEP') {
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
      {renderContent()}
    </MainLayout>
  );
}