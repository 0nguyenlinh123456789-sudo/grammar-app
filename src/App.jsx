// File: src/App.jsx
import React, { useState } from 'react';

// Data layer
import { parsedGrammarData } from './data/grammarData';
import { courseData } from './data/oxfordData';
import vocabVstepData from './data/vocabVstepData';

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
  const [xp, setXp] = useState(0);

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

  // Render view coordinator (State-based Router)
  const renderContent = () => {
    switch (appMode) {
      case 'grammar':
        return topicId ? (
          <GrammarPage topic={selectedGrammarTopic} setXp={setXp} />
        ) : (
          <WelcomePage />
        );

      case 'vocab':
        if (activeVocabCategory === 'VSTEP') {
          return (
            <VocabVstepPage activeTopic={selectedVstepTopic} playAudio={playAudio} />
          );
        } else {
          return (
            <VocabOxfordPage selectedUnit={selectedOxfordUnit} />
          );
        }

      case 'scanner':
        return <ScannerPage />;

      default:
        return <WelcomePage />;
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
    >
      {renderContent()}
    </MainLayout>
  );
}