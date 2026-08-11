// File: src/App.jsx
import { useState, useEffect, useRef, Suspense, lazy } from 'react';

// Data layer
import { clearVocabProgress } from './utils/learningProgress';
import { addLearningActivity, normalizeActivityHistory, localDateKey } from './utils/activityHistory';
import { normalizeDailyGoal } from './utils/dailyGoal';
import { syncLearningProgress } from './utils/progressSync';
// NOTE: Oxford data (~9MB, the biggest data set) is NOT imported eagerly. It is
// dynamically loaded only when the learner opens the Oxford vocab section, so it
// no longer bloats the initial page load. See loadOxfordBooks() below.

const OXFORD_BOOKS = [
  { id: 'elementary', title: 'English Vocabulary in Use - Elementary', description: 'Giáo trình từ vựng Oxford cấp độ Cơ bản (60 Units)', units: [] },
  { id: 'pre_intermediate', title: 'English Vocabulary in Use - Pre-Intermediate & Intermediate', description: 'Giáo trình từ vựng Oxford cấp độ Trung cấp (100 Units)', units: [] },
  { id: 'advanced', title: 'English Vocabulary in Use - Advanced', description: 'Giáo trình từ vựng Oxford cấp độ Cao cấp, dành cho IELTS 7.0+ và C1-C2 (100 Units)', units: [] },
];

async function loadOxfordBook(bookId) {
  if (bookId === 'elementary') {
    const [p1, p2, p3] = await Promise.all([
      import('./data/oxfordData'), import('./data/oxfordDataPart2'), import('./data/oxfordDataPart3'),
    ]);
    return [...p1.courseData, ...p2.courseData, ...p3.courseData];
  }
  if (bookId === 'pre_intermediate') {
    const [p1, p2, p3] = await Promise.all([
      import('./data/oxfordPreIntData'), import('./data/oxfordPreIntData51_75'), import('./data/oxfordPreIntData76_100'),
    ]);
    return [...p1.courseData, ...p2.courseData51_75, ...p3.courseData76_100];
  }
  const [p1, p2, p3, p4] = await Promise.all([
    import('./data/oxfordAdvancedData1_25'), import('./data/oxfordAdvancedData26_50'),
    import('./data/oxfordAdvancedData51_75'), import('./data/oxfordAdvancedData76_100'),
  ]);
  return [...p1.courseData1_25, ...p2.courseData26_50, ...p3.courseData51_75, ...p4.courseData76_100];
}

async function loadVstepTopics() {
  const module = await import('./data/vocabVstepData');
  return module.default;
}

async function loadGrammarCatalog() {
  const module = await import('./data/grammarData');
  return { topics: module.parsedGrammarData, levels: module.grammarLevels };
}

// Layout layer
import MainLayout from './layouts/MainLayout';
import { SHOW_IELTS_FOUNDATION } from './utils/localOnly';
import { tryConsumeFreezes } from './utils/streakFreeze';

// Page/Route layer — lazy-loaded so each route ships as its own chunk and the
// initial bundle stays small (Games/Scanner/Oxford aren't downloaded until used).
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const GrammarPage = lazy(() => import('./pages/GrammarPage'));
const VocabVstepPage = lazy(() => import('./pages/VocabVstepPage'));
const VocabOxfordPage = lazy(() => import('./pages/VocabOxfordPage'));
const ScannerPage = lazy(() => import('./pages/ScannerPage'));
const GamesPage = lazy(() => import('./pages/GamesPage'));
const IeltsFoundationPage = lazy(() => import('./pages/IeltsFoundationPage'));

// Fallback shown briefly while a route chunk loads.
const RouteLoader = () => (
  <div className="flex items-center justify-center py-24 text-slate-400 font-black text-lg gap-3">
    <span className="inline-block w-6 h-6 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></span>
    Đang tải...
  </div>
);

const DataLoadError = ({ message, onRetry }) => (
  <div className="max-w-lg mx-auto mt-16 p-6 text-center bg-white dark:bg-slate-900 border-4 border-rose-500 rounded-3xl shadow-[6px_6px_0_0_#be123c]">
    <p className="text-3xl mb-2" aria-hidden="true">⚠️</p>
    <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">Không thể tải dữ liệu</h2>
    <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-5">{message}</p>
    <button onClick={onRetry} className="px-5 py-2.5 bg-yellow-300 text-slate-900 border-3 border-slate-800 rounded-xl font-black shadow-[3px_3px_0_0_#1e293b] active:translate-y-0.5 active:shadow-none">
      Thử lại
    </button>
  </div>
);

export default function App() {
  // Navigation & Mode states
  const [appMode, setAppMode] = useState('home');
  const [activeVocabCategory, setActiveVocabCategory] = useState('TOPIC'); // 'TOPIC', 'OXFORD'
  const [parsedGrammarData, setParsedGrammarData] = useState([]);
  const [grammarLevels, setGrammarLevels] = useState([]);
  const [grammarLoaded, setGrammarLoaded] = useState(false);
  const [grammarLoadError, setGrammarLoadError] = useState('');
  
  // Topic/Unit states
  const [topicId, setTopicId] = useState(null); // Active grammar topic ID
  const [oxfordUnitId, setOxfordUnitId] = useState(() => {
    const savedUnitId = localStorage.getItem('oxfordUnitId');
    if (savedUnitId && savedUnitId !== 'null') {
      return isNaN(savedUnitId) ? savedUnitId : parseInt(savedUnitId, 10);
    }
    return null; // resolved to the first unit once Oxford data loads
  }); // Active Oxford unit ID

  // Oxford books are lazy-loaded (large data set). Empty until the learner opens
  // the Oxford section for the first time.
  const [oxfordBooks, setOxfordBooks] = useState(OXFORD_BOOKS);
  const [loadedOxfordBookIds, setLoadedOxfordBookIds] = useState([]);
  const [oxfordLoadError, setOxfordLoadError] = useState('');
  const [vstepTopicId, setVstepTopicId] = useState('travel-transport'); // Active VSTEP topic ID
  const [vstepTopics, setVstepTopics] = useState([]);
  const [vstepLoaded, setVstepLoaded] = useState(false);
  const [vstepLoadError, setVstepLoadError] = useState('');
  
  // Oxford Book State
  const [activeOxfordBookId, setActiveOxfordBookId] = useState(() => {
    const savedBook = localStorage.getItem('activeOxfordBookId');
    return OXFORD_BOOKS.some((book) => book.id === savedBook) ? savedBook : 'elementary';
  });
  const oxfordLoaded = loadedOxfordBookIds.includes(activeOxfordBookId);

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
    } catch {
      return [];
    }
  });
  // Keep milestone awarding atomic across rapid clicks and child callbacks.
  // A state closure can lag behind when several exercises finish in one tick.
  const completedMilestonesRef = useRef(completedMilestones);
  useEffect(() => {
    completedMilestonesRef.current = completedMilestones;
  }, [completedMilestones]);

  // Daily Streak States
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastActiveDate, setLastActiveDate] = useState(() => {
    return localStorage.getItem('lastActiveDate') || '';
  });
  const lastActiveDateRef = useRef(lastActiveDate);
  useEffect(() => {
    lastActiveDateRef.current = lastActiveDate;
  }, [lastActiveDate]);

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
    } catch { /* ignore */ }
    return { date: new Date().toDateString(), lessons: 0, xp: 0 };
  });
  const [dailyGoal, setDailyGoal] = useState(() => (
    normalizeDailyGoal(localStorage.getItem('dailyGoalV1'))
  ));
  const [placementResult, setPlacementResult] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('placementResultV1') || 'null');
      return saved && typeof saved === 'object' ? saved : null;
    } catch { return null; }
  });

  useEffect(() => {
    let syncing = false;
    const runSync = async () => {
      if (syncing || navigator.onLine === false) return;
      syncing = true;
      try {
        const result = await syncLearningProgress();
        if (result.status === 'restored') window.location.reload();
      } catch {
        // Offline/local-only learning remains fully usable when sync is unavailable.
      } finally { syncing = false; }
    };
    const onVisible = () => { if (document.visibilityState === 'hidden') runSync(); };
    const onOnline = () => runSync();
    runSync();
    const timer = window.setInterval(runSync, 60_000);
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('online', onOnline);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('online', onOnline);
    };
  }, []);
  const [activityHistory, setActivityHistory] = useState(() => {
    try {
      return normalizeActivityHistory(JSON.parse(localStorage.getItem('learningActivityV1') || '[]'));
    } catch {
      return [];
    }
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

  useEffect(() => {
    localStorage.setItem('bestStreak', bestStreak.toString());
  }, [bestStreak]);

  useEffect(() => {
    localStorage.setItem('dailyStats', JSON.stringify(dailyStats));
  }, [dailyStats]);

  useEffect(() => {
    localStorage.setItem('learningActivityV1', JSON.stringify(activityHistory));
  }, [activityHistory]);

  useEffect(() => {
    localStorage.setItem('dailyGoalV1', dailyGoal.toString());
  }, [dailyGoal]);

  useEffect(() => {
    if (placementResult) localStorage.setItem('placementResultV1', JSON.stringify(placementResult));
    else localStorage.removeItem('placementResultV1');
  }, [placementResult]);

  useEffect(() => {
    localStorage.setItem('learningSyncUpdatedAtV1', String(Date.now()));
  }, [xp, completedMilestones, streak, lastActiveDate, bestStreak, dailyStats, activityHistory, dailyGoal, placementResult]);

  // Keep bestStreak in sync whenever the current streak sets a new record
  useEffect(() => {
    if (streak > bestStreak) setBestStreak(streak);
  }, [streak, bestStreak]);

  // Check if streak is broken on mount. Before resetting, try to spend the
  // monthly "streak freeze" budget (one freeze per missed day) so a short slip
  // doesn't wipe a long streak — see src/utils/streakFreeze.js.
  useEffect(() => {
    const today = new Date();
    if (lastActiveDate) {
      const lastDate = new Date(lastActiveDate);
      const d1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const d2 = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
      const diffDays = Math.round((d1 - d2) / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        const missedDays = diffDays - 1;
        const rescue = streak > 0 ? tryConsumeFreezes(missedDays) : { saved: false };
        if (rescue.saved) {
          // Move the anchor to today so the same gap isn't re-judged tomorrow.
          setLastActiveDate(today.toDateString());
        } else {
          setStreak(0);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastActiveDate]);

  // Persist Oxford Book choice
  useEffect(() => {
    localStorage.setItem('activeOxfordBookId', activeOxfordBookId);
  }, [activeOxfordBookId]);

  useEffect(() => {
    setOxfordLoadError('');
  }, [activeOxfordBookId]);

  // Persist Oxford Unit ID choice
  useEffect(() => {
    localStorage.setItem('oxfordUnitId', oxfordUnitId);
  }, [oxfordUnitId]);

  // Load only the selected Oxford book. Other books stay out of the network
  // request until the learner explicitly switches to them.
  useEffect(() => {
    if (appMode === 'vocab' && activeVocabCategory === 'OXFORD' && !oxfordLoaded && !oxfordLoadError) {
      let cancelled = false;
      loadOxfordBook(activeOxfordBookId).then(units => {
        if (cancelled) return;
        setOxfordBooks((books) => books.map((book) => (
          book.id === activeOxfordBookId ? { ...book, units } : book
        )));
        setLoadedOxfordBookIds((ids) => ids.includes(activeOxfordBookId) ? ids : [...ids, activeOxfordBookId]);
      }).catch(() => {
        if (!cancelled) setOxfordLoadError('Không tải được bộ sách Oxford đã chọn. Hãy kiểm tra kết nối rồi thử lại.');
      });
      return () => { cancelled = true; };
    }
  }, [appMode, activeVocabCategory, activeOxfordBookId, oxfordLoaded, oxfordLoadError]);

  // Load the large VSTEP catalog only when a feature needs topic words.
  useEffect(() => {
    const needsVstepData = (appMode === 'vocab' && activeVocabCategory === 'TOPIC') || appMode === 'games';
    if (!needsVstepData || vstepLoaded || vstepLoadError) return;

    let cancelled = false;
    loadVstepTopics().then((topics) => {
      if (cancelled) return;
      setVstepTopics(topics);
      setVstepLoaded(true);
    }).catch(() => {
      if (!cancelled) setVstepLoadError('Không tải được kho từ vựng VSTEP. Hãy kiểm tra kết nối rồi thử lại.');
    });
    return () => { cancelled = true; };
  }, [appMode, activeVocabCategory, vstepLoaded, vstepLoadError]);

  useEffect(() => {
    if (appMode !== 'grammar' || grammarLoaded || grammarLoadError) return;

    let cancelled = false;
    loadGrammarCatalog().then(({ topics, levels }) => {
      if (cancelled) return;
      setParsedGrammarData(topics);
      setGrammarLevels(levels);
      setGrammarLoaded(true);
    }).catch(() => {
      if (!cancelled) setGrammarLoadError('Không tải được dữ liệu ngữ pháp. Hãy kiểm tra kết nối rồi thử lại.');
    });
    return () => { cancelled = true; };
  }, [appMode, grammarLoaded, grammarLoadError]);

  // Once Oxford data is loaded, make sure the selected unit actually exists.
  useEffect(() => {
    if (oxfordLoaded && oxfordBooks.length) {
      const book = oxfordBooks.find(b => b.id === activeOxfordBookId) || oxfordBooks[0];
      const exists = book.units.some(u => u.id === oxfordUnitId);
      if (!exists) setOxfordUnitId(book.units[0]?.id ?? null);
    }
  }, [oxfordLoaded, activeOxfordBookId, oxfordBooks, oxfordUnitId]);

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
    completedMilestonesRef.current = [];
    setStreak(0);
    setLastActiveDate('');
    lastActiveDateRef.current = '';
    const freshDaily = { date: new Date().toDateString(), lessons: 0, xp: 0 };
    setDailyStats(freshDaily);
    setActivityHistory([]);
    localStorage.setItem('xp', '0');
    localStorage.setItem('completedMilestones', JSON.stringify([]));
    localStorage.setItem('streak', '0');
    localStorage.setItem('lastActiveDate', '');
    localStorage.setItem('dailyStats', JSON.stringify(freshDaily));
    localStorage.setItem('learningActivityV1', JSON.stringify([]));
    clearVocabProgress();
    // Note: bestStreak is a lifetime record — intentionally not reset.
  };

  // Computed selections
  const selectedGrammarTopic = parsedGrammarData.find(t => t.id === topicId);
  const selectedBook = oxfordBooks.find(b => b.id === activeOxfordBookId) || oxfordBooks[0] || null;
  const selectedOxfordUnit = selectedBook
    ? (selectedBook.units.find(u => u.id === oxfordUnitId) || selectedBook.units[0])
    : null;
  const selectedVstepTopic = vstepTopics.find(t => t.id === vstepTopicId);

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
    if (!id || completedMilestonesRef.current.includes(id)) return;
    completedMilestonesRef.current = [...completedMilestonesRef.current, id];
    setCompletedMilestones(prev => prev.includes(id) ? prev : [...prev, id]);
    setXp(prev => prev + xpBonus);

    // Update Daily Streak
    const today = new Date();
    const todayStr = today.toDateString();

    // Update today's goal stats (reset if it's a new day)
    setDailyStats(prev => {
      const base = prev.date === todayStr ? prev : { date: todayStr, lessons: 0, xp: 0 };
      return { ...base, lessons: base.lessons + 1, xp: base.xp + xpBonus };
    });
    setActivityHistory(prev => addLearningActivity(prev, {
      date: localDateKey(today),
      lessons: 1,
      xp: xpBonus,
    }));

    if (lastActiveDateRef.current !== todayStr) {
      if (lastActiveDateRef.current) {
        const lastDate = new Date(lastActiveDateRef.current);
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
      lastActiveDateRef.current = todayStr;
      setLastActiveDate(todayStr);
    }

    triggerConfetti();
  };

  // Render view coordinator (State-based Router)
  const renderContent = () => {
    switch (appMode) {
      case 'grammar':
        if (grammarLoadError) {
          return <DataLoadError message={grammarLoadError} onRetry={() => setGrammarLoadError('')} />;
        }
        if (!grammarLoaded) return <RouteLoader />;
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
            activityHistory={activityHistory}
            dailyGoal={dailyGoal}
            setDailyGoal={setDailyGoal}
            placementResult={placementResult}
            setPlacementResult={setPlacementResult}
            playAudio={playAudio}
            theme={theme}
            setTheme={setTheme}
          />
        );

      case 'vocab':
        if (activeVocabCategory === 'TOPIC') {
          if (vstepLoadError) {
            return <DataLoadError message={vstepLoadError} onRetry={() => setVstepLoadError('')} />;
          }
          if (!vstepLoaded) return <RouteLoader />;
          return (
            <VocabVstepPage 
              activeTopic={selectedVstepTopic} 
              playAudio={playAudio} 
              completedMilestones={completedMilestones}
              completeMilestone={completeMilestone}
            />
          );
        } else {
          if (oxfordLoadError) {
            return <DataLoadError message={oxfordLoadError} onRetry={() => setOxfordLoadError('')} />;
          }
          if (!oxfordLoaded || !selectedOxfordUnit) return <RouteLoader />;
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

      case 'ielts-foundation':
        // Local-only section (owner's private course) — never reachable on the
        // deployed site, even if the mode is set some other way.
        if (!SHOW_IELTS_FOUNDATION) {
          setAppMode('home');
          return <RouteLoader />;
        }
        return (
          <IeltsFoundationPage
            completedMilestones={completedMilestones}
            completeMilestone={completeMilestone}
            streak={streak}
            dailyStats={dailyStats}
            activityHistory={activityHistory}
            dailyGoal={dailyGoal}
            placementResult={placementResult}
            setPlacementResult={setPlacementResult}
          />
        );

      case 'games':
        if (vstepLoadError) {
          return <DataLoadError message={vstepLoadError} onRetry={() => setVstepLoadError('')} />;
        }
        if (!vstepLoaded) return <RouteLoader />;
        return (
          <GamesPage
            activeTopic={selectedVstepTopic}
            playAudio={playAudio}
            completeMilestone={completeMilestone}
          />
        );

      case 'home':
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
            activityHistory={activityHistory}
            dailyGoal={dailyGoal}
            setDailyGoal={setDailyGoal}
            placementResult={placementResult}
            setPlacementResult={setPlacementResult}
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
      vstepTopics={vstepTopics}
      parsedGrammarData={parsedGrammarData}
      grammarLevels={grammarLevels}
      courseData={selectedBook?.units || []}
      oxfordBooks={oxfordBooks}
      oxfordLoaded={oxfordLoaded}
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
