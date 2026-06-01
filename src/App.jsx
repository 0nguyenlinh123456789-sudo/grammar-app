// File: src/App.jsx
import React, { useState, useEffect } from 'react';

// Data layer
import { parsedGrammarData } from './data/grammarData';
import { courseData } from './data/oxfordData';
import vocabVstepData from './data/vocabVstepData';
import { roadmapData } from './data/roadmapData';

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
  const [oxfordUnitId, setOxfordUnitId] = useState(1); // Active Oxford unit ID
  const [vstepTopicId, setVstepTopicId] = useState('travel-transport'); // Active VSTEP topic ID

  // Global user progress state
  const [xp, setXp] = useState(() => {
    const savedXp = localStorage.getItem('xp');
    return savedXp ? parseInt(savedXp, 10) : 0;
  });

  const [completedMilestones, setCompletedMilestones] = useState(() => {
    const saved = localStorage.getItem('completedMilestones');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist XP and completed milestones to localStorage
  useEffect(() => {
    localStorage.setItem('xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('completedMilestones', JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  // Computed selections
  const selectedGrammarTopic = parsedGrammarData.find(t => t.id === topicId);
  const selectedOxfordUnit = courseData.find(u => u.id === oxfordUnitId);
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
            setOxfordUnitId={setOxfordUnitId}
            setVstepTopicId={setVstepTopicId}
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
            setOxfordUnitId={setOxfordUnitId}
            setVstepTopicId={setVstepTopicId}
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
      setOxfordUnitId={setOxfordUnitId}
      vstepTopicId={vstepTopicId}
      setVstepTopicId={setVstepTopicId}
      vstepTopics={vocabVstepData}
      parsedGrammarData={parsedGrammarData}
      courseData={courseData}
      completedMilestones={completedMilestones}
    >
      {renderContent()}
    </MainLayout>
  );
}