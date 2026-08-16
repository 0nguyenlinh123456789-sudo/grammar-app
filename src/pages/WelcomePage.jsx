import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { roadmapData, BAND_TAB_LABEL, bandMinutes, minutesThroughBand, roadmapTotalMinutes } from '../data/roadmapData';
import {
  Trophy, CheckCircle2, Play, Compass, Award,
  Zap, BookOpen, Flame, Sparkles, ArrowRight, RotateCcw, AlertTriangle, Moon, Sun,
  Brain, Target, Volume2, VolumeX, Download, Upload, BarChart3, SlidersHorizontal, GraduationCap, Headphones, PenLine
} from 'lucide-react';
import Btn3D from '../components/common/Btn3D';
import ScholarBunny from '../components/common/ScholarBunny';
import PetZoo from '../components/common/PetZoo';
import SrsReview from '../components/vocab/SrsReview';
import WordNotebook from '../components/vocab/WordNotebook';
import ErrorReview from '../components/progress/ErrorReview';
import MockTest from '../components/progress/MockTest';
import DictationPanel from '../components/listening/DictationPanel';
import ListeningPassagePanel from '../components/listening/ListeningPassagePanel';
import { writingPrompts } from '../data/writingPrompts';
import { SO_DE_THEO_CHANG } from '../data/writingCounts';

// Kho đề theo chặng nặng ~170 KB (531 đề × 8 từ mục tiêu). Nạp thẳng vào trang
// chủ thì ai mở app cũng phải tải, kể cả người không bao giờ vào mục viết —
// đo được: chunk trang chủ phình từ 743 KB lên 911 KB. Nên panel viết tách
// chunk riêng, và trang chủ chỉ cần MỘT CON SỐ để hiển thị.
const WritingPromptPanel = lazy(() => import('../components/writing/WritingPromptPanel'));
import { listeningPassages } from '../data/listeningPassages';
import { audioManifest } from '../data/audioManifest';
import { loadMockHistory } from '../utils/mockTest';
import { getDueCount, getTotalCount } from '../utils/srs';
import { getDueErrorCount, getErrorCount } from '../utils/errorBank';
import { isMuted, setMuted } from '../utils/sound';
import { freezesLeft, frozeToday } from '../utils/streakFreeze';
import { downloadAchievementCard } from '../utils/shareCard';
import { createLearningBackup, restoreLearningBackup } from '../utils/backup';
import { buildActivityWindow } from '../utils/activityHistory';
import { countGoalDays, DAILY_GOAL_OPTIONS } from '../utils/dailyGoal';
import PlacementTest from '../components/placement/PlacementTest';
import { recommendationFromPlacement } from '../utils/placement';
import { pickNextInBand, recommendedBandFor, isReviewBand, isSkippingAhead, currentBandOf } from '../utils/roadmapNav';
import LearningReport from '../components/progress/LearningReport';
import QuickVerifyModal from '../components/progress/QuickVerifyModal';
import MasteryMigrationNotice from '../components/progress/MasteryMigrationNotice';
import { shouldShowMigrationNotice, dismissMigrationNotice } from '../utils/masteryMigration';
import { splitCompleted, isVerified } from '../utils/mastery';

const WelcomePage = ({
  xp,
  completedMilestones = [],
  milestoneScores = {},
  verifyMilestone,
  setTopicId,
  setAppMode,
  setActiveVocabCategory,
  setOxfordUnitId,
  setActiveOxfordBookId,
  setVstepTopicId,
  resetRoadmap,
  streak = 0,
  bestStreak = 0,
  dailyStats = { lessons: 0, xp: 0 },
  activityHistory = [],
  dailyGoal = 1,
  setDailyGoal,
  placementResult = null,
  setPlacementResult,
  playAudio,
  theme,
  setTheme,
}) => {
  // Tab đang xem = tab người dùng TỰ BẤM, nếu chưa bấm thì lấy cấp độ mà bài
  // test đầu vào đề xuất. Viết theo kiểu dẫn xuất (không phải useState khởi
  // tạo một lần) để khi placementResult nạp xong từ localStorage, hoặc khi
  // người học làm lại bài test ra band khác, tab tự nhảy mà KHÔNG cần tải lại
  // trang — đây là một mục nghiệm thu của hạng mục #2.
  const [manualTab, setManualTab] = useState(null); // 'all' | id cấp độ lộ trình
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showPlacement, setShowPlacement] = useState(false);
  const [muted, setMutedState] = useState(isMuted());
  const [backupMessage, setBackupMessage] = useState('');
  const [showNotebook, setShowNotebook] = useState(false);
  const [showErrorReview, setShowErrorReview] = useState(false);
  const [showMockTest, setShowMockTest] = useState(false);
  const [showDictation, setShowDictation] = useState(false);
  const [showPassage, setShowPassage] = useState(false);
  const [showWriting, setShowWriting] = useState(false);
  const lastMock = loadMockHistory()[0] || null;
  const dueErrors = getDueErrorCount();
  const totalErrors = getErrorCount();

  // The onboarding wizard fires this event when the learner picks
  // "LÀM TEST NGAY" — the placement modal lives here, not in App.
  useEffect(() => {
    const open = () => setShowPlacement(true);
    window.addEventListener('bunny:open-placement', open);
    return () => window.removeEventListener('bunny:open-placement', open);
  }, []);
  const backupInputRef = useRef(null);
  const dueCount = getDueCount();
  const dailyDone = (dailyStats?.lessons || 0) >= dailyGoal;
  const recentActivity = buildActivityWindow(activityHistory, 7);
  const maxDailyXp = Math.max(1, ...recentActivity.map((entry) => entry.xp));
  const weeklyLessons = recentActivity.reduce((sum, entry) => sum + entry.lessons, 0);
  const weeklyXp = recentActivity.reduce((sum, entry) => sum + entry.xp, 0);
  const weeklyGoalDays = countGoalDays(recentActivity, dailyGoal);
  const recommendation = recommendationFromPlacement(placementResult);

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

  // (#1b) Tách "đã hoàn thành" thành ĐÃ XÁC MINH / CHƯA XÁC MINH.
  //
  // Chỉ đếm trên các chặng CÓ TRONG LỘ TRÌNH: completedMilestones còn chứa id
  // của trò chơi ("game-*") và của cụm IELTS Nền Tảng — những thứ không nằm
  // trong 44 chặng. Đếm cả chúng thì số "chưa xác minh" sẽ sai, và chứng nhận
  // (cần 44/44 đã xác minh) sẽ vĩnh viễn không bao giờ mở được.
  const { verified: verifiedIds, unverified: unverifiedIds } =
    splitCompleted(completedRoadmapMilestones.map((m) => m.targetId), milestoneScores);
  const verifiedCount = verifiedIds.length;
  const unverifiedMilestones = completedRoadmapMilestones.filter((m) => unverifiedIds.includes(m.targetId));

  const [verifyTarget, setVerifyTarget] = useState(null);
  const [showMigration, setShowMigration] = useState(false);
  // Thông báo di trú chỉ hiện KHI THẬT SỰ có chặng cũ chưa xác minh, và chỉ một
  // lần. Người mới cài app không bao giờ thấy nó.
  useEffect(() => {
    if (shouldShowMigrationNotice(localStorage, unverifiedMilestones.length)) setShowMigration(true);
  }, [unverifiedMilestones.length]);
  const closeMigration = () => { dismissMigrationNotice(localStorage); setShowMigration(false); };

  // Chặng tiếp theo: chặng chưa xong đầu tiên TỪ cấp độ mà bài test đầu vào
  // đề xuất trở lên (chưa làm test → hành vi cũ). Xem src/utils/roadmapNav.js.
  // (4.1) Người chưa qua vòng A1 được giữ Ở TRONG cụm A0 cho tới khi học xong
  // cụm đó — không phải chỉ được đẩy vào đúng một lần lúc làm xong bài test.
  const recommendedLevel = recommendedBandFor(placementResult, allMilestones, completedMilestones);
  const nextMilestone = pickNextInBand(allMilestones, completedMilestones, recommendedLevel);
  const nextMilestoneIndex = nextMilestone ? allMilestones.indexOf(nextMilestone) : -1;
  // Bậc người học đang đứng — dùng để cảnh báo nhảy cóc (việc 1.6).
  const currentBand = currentBandOf(nextMilestone);
  const activeTab = manualTab || recommendedLevel || 'all';

  // (1.5) 44 chặng soạn tay ghi giờ bằng chữ ngay trong mô tả ("🕐 ~4 giờ |").
  // Đo lại từ nội dung thật thì tổng của 44 chặng đó là ~62 giờ chứ không phải
  // ~201 giờ như đã ghi. Gỡ con số viết tay khỏi phần HIỂN THỊ và thay bằng số
  // đo được — không sửa file của người soạn, và không để hai con số mâu thuẫn
  // đứng cạnh nhau trên cùng một thẻ.
  const stripClaimedHours = (desc) => String(desc || '').replace(/^🕐\s*~?\s*\d+\s*giờ\s*\|\s*/u, '');

  const formatDuration = (minutes) => {
    const m = Math.max(0, Math.round(minutes || 0));
    if (m < 60) return `${m} phút`;
    const h = Math.floor(m / 60);
    const rest = m % 60;
    return rest ? `${h} giờ ${rest} phút` : `${h} giờ`;
  };

  // Handler to launch a milestone
  const launchMilestone = (milestone) => {
    if (milestone.type === 'grammar') {
      setAppMode('grammar');
      setTopicId(milestone.targetId);
    } else if (milestone.type === 'oxford') {
      setAppMode('vocab');
      setActiveVocabCategory('OXFORD');
      // Phải đặt SÁCH trước rồi mới đặt unit. Trang chủ chưa nạp dữ liệu Oxford
      // (9MB, chỉ tải khi vào mục đó), nên hàm dò-sách-theo-unit trong App
      // không tìm ra gì và sẽ mở nhầm unit đầu của quyển đang chọn.
      if (milestone.bookId) setActiveOxfordBookId?.(milestone.bookId);
      setOxfordUnitId(milestone.targetId);
    } else if (milestone.type === 'vstep') {
      setAppMode('vocab');
      setActiveVocabCategory('TOPIC');
      setVstepTopicId(milestone.targetId);
    }
  };

  // Lộ trình nay có 617 chặng. Đổ hết ra một trang thì cuộn mãi không tới và
  // trình duyệt yếu thì đứng hình. Mặc định chỉ vẽ một CỬA SỔ quanh chặng đang
  // học, có nút mở rộng — không giấu chặng nào, chỉ không vẽ hết cùng lúc.
  const WINDOW_SIZE = 24;
  const [expandedLevels, setExpandedLevels] = useState({});

  // Danh hiệu theo SỐ CHẶNG ĐÃ HỌC — đo sự chuyên cần, KHÔNG phải trình độ.
  // (#0-A1) Trước đây gắn nhãn CEFR ("C2 Master", "B1 Explorer"…) theo số
  // milestone: học đủ 30 chặng là được gọi C2 dù chưa có bài kiểm tra năng lực
  // nào. Nhãn CEFR đã bỏ hẳn; chuỗi này còn được vẽ lên ảnh chia sẻ
  // (utils/shareCard.js) nên sai ở đây là sai ra ngoài mạng xã hội.
  const getRankName = (count) => {
    if (count >= 30) return '🏆 Bậc Thầy Chuyên Cần';
    if (count >= 22) return '🌟 Chuyên Gia Bền Bỉ';
    if (count >= 15) return '⭐ Chiến Binh Chăm Chỉ';
    if (count >= 8)  return '🌿 Người Khám Phá Kiên Trì';
    if (count >= 3)  return '🌱 Tân Binh Siêng Năng';
    return '👶 Mới Bắt Đầu';
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

  // (#0-E2) Badge ghi ĐÚNG TÊN BƯỚC HỌC có trong chặng, không ghi "4 kỹ năng"
  // Nghe/Nói/Đọc/Viết — các bước này là chọn nghĩa, gõ từ và đọc to so khớp
  // văn bản, không phải bốn kỹ năng ngôn ngữ. Tên khớp với nhãn thật trong
  // VocabVstepPage (xem #0-F1/F2).
  const getSkillBadges = (type) => {
    const skills = type === 'vstep'
      ? [['🎧', 'Nghe–Chọn Nghĩa'], ['📖', 'Đọc–Chọn Nghĩa'], ['✍️', 'Gõ Từ'], ['🗣️', 'Đọc To Từ']]
      : [['📖', 'Đọc'], ['✍️', 'Viết']];
    return (
      <div className="flex flex-wrap gap-1 mt-1.5">
        {skills.map(([icon, label]) => (
          <span key={label} className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600">
            {icon} {label}
          </span>
        ))}
      </div>
    );
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

  // Achievement badges — derived purely from existing progress stats.
  const achievements = [
    { id: 'first', icon: '🎯', label: 'Chặng đầu tiên', unlocked: completedCount >= 1 },
    { id: 'five', icon: '🖐️', label: '5 chặng', unlocked: completedCount >= 5 },
    { id: 'ten', icon: '💪', label: '10 chặng', unlocked: completedCount >= 10 },
    { id: 'twenty', icon: '🚀', label: '20 chặng', unlocked: completedCount >= 20 },
    { id: 'all', icon: '👑', label: 'Hoàn tất lộ trình', unlocked: completedCount >= totalMilestonesCount && totalMilestonesCount > 0 },
    { id: 'streak3', icon: '🔥', label: 'Chuỗi 3 ngày', unlocked: bestStreak >= 3 },
    { id: 'streak7', icon: '⚡', label: 'Chuỗi 7 ngày', unlocked: bestStreak >= 7 },
    { id: 'streak30', icon: '🏅', label: 'Chuỗi 30 ngày', unlocked: bestStreak >= 30 },
    { id: 'xp500', icon: '💎', label: '500 XP', unlocked: xp >= 500 },
    { id: 'xp1000', icon: '🌟', label: '1000 XP', unlocked: xp >= 1000 },
  ];
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
  };

  const downloadBackup = () => {
    const backup = createLearningBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bunny-english-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setBackupMessage('Đã tải bản sao lưu tiến độ.');
  };

  const importBackup = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setBackupMessage('Tệp sao lưu quá lớn.');
      return;
    }
    try {
      restoreLearningBackup(await file.text());
      window.location.reload();
    } catch {
      setBackupMessage('Tệp sao lưu không hợp lệ hoặc không có dữ liệu học tập.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 font-sans text-slate-800 dark:text-slate-100 selection:bg-yellow-300 transition-colors duration-300">

      {showReview && <SrsReview onClose={() => setShowReview(false)} playAudio={playAudio} />}
      {showNotebook && <WordNotebook onClose={() => setShowNotebook(false)} playAudio={playAudio} />}
      {showErrorReview && <ErrorReview onClose={() => setShowErrorReview(false)} />}
      {showMockTest && <MockTest onClose={() => setShowMockTest(false)} />}
      {showDictation && <DictationPanel onClose={() => setShowDictation(false)} currentBand={currentBand} />}
      {showPassage && <ListeningPassagePanel onClose={() => setShowPassage(false)} />}
      {showWriting && <Suspense fallback={null}><WritingPromptPanel onClose={() => setShowWriting(false)} /></Suspense>}
      {showMigration && (
        <MasteryMigrationNotice
          unverifiedCount={unverifiedMilestones.length}
          completedCount={completedCount}
          totalMilestonesCount={totalMilestonesCount}
          onClose={closeMigration}
          onVerifyNow={() => { closeMigration(); setVerifyTarget(unverifiedMilestones[0] || null); }}
        />
      )}
      {verifyTarget && (
        <QuickVerifyModal
          milestone={verifyTarget}
          onClose={() => setVerifyTarget(null)}
          onFinish={(evidence) => verifyMilestone?.(verifyTarget.targetId, evidence)}
          onStudyAgain={(m) => launchMilestone(m)}
        />
      )}
      {showPlacement && (
        <PlacementTest
          onClose={() => setShowPlacement(false)}
          onComplete={(result) => {
            setPlacementResult?.(result);
            setShowPlacement(false);
            // Làm xong test đầu vào thì VÀO THẲNG chặng phù hợp, không bắt
            // người học tự đi tìm (hạng mục #2). Bỏ tab đang chọn tay để
            // lộ trình nhảy về đúng cấp độ vừa đo được.
            setManualTab(null);
            // (4.1) Chưa qua nổi vòng A1 → vào cụm A0 "Mất gốc thật", không vào
            // A1. Cùng một hàm với phần hiển thị bên trên, nên bậc được đề xuất
            // ở đây và bậc mà trang chủ mở ra sau đó luôn là một.
            const band = recommendedBandFor(result, allMilestones, completedMilestones);
            const target = pickNextInBand(allMilestones, completedMilestones, band);
            if (target) launchMilestone(target);
          }}
        />
      )}

      {/* --- HERO DASHBOARD CARD --- */}
      <div className="bg-white dark:bg-slate-900 border-[4px] border-slate-800 dark:border-slate-700 rounded-[2.5rem] p-6 md:p-8 shadow-[10px_10px_0_0_#1c293b] dark:shadow-[10px_10px_0_0_#020617] mb-10 mt-4 relative overflow-hidden">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 z-10 relative">
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
                "Cùng tớ học tiếng Anh nhé! 🐰✨"
              </p>
            </div>
          </div>
 
          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-stretch">
            {/* Stats Column */}
            <div className="flex flex-col gap-3 flex-1 min-w-0">
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
                   <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">
                     {bestStreak > 0 && <>🏆 Kỷ lục: {bestStreak} ngày · </>}
                     <span title="Nghỉ lỡ 1 ngày sẽ tự dùng 1 lần đóng băng để giữ chuỗi. Mỗi tháng có 2 lần.">🧊 Đóng băng: {freezesLeft()}/2</span>
                   </p>
                   {frozeToday() && <p className="text-[10px] font-black text-sky-600 dark:text-sky-400 mt-0.5">🧊 Chuỗi của bạn vừa được cứu hôm nay!</p>}
                 </div>
               </div>
            </div>

            {/* Actions Column */}
           <div className="flex flex-col gap-3 flex-1 min-w-0 justify-between">
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
               <div className="grid grid-cols-2 gap-2">
                 <button onClick={downloadBackup} className="min-h-12 px-3 font-black border-3 border-slate-800 dark:border-slate-700 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 flex justify-center items-center gap-1.5 shadow-[3px_3px_0_0_#1e293b] text-xs">
                   <Download size={16} /> SAO LƯU
                 </button>
                 <button onClick={() => backupInputRef.current?.click()} className="min-h-12 px-3 font-black border-3 border-slate-800 dark:border-slate-700 rounded-2xl bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 flex justify-center items-center gap-1.5 shadow-[3px_3px_0_0_#1e293b] text-xs">
                   <Upload size={16} /> KHÔI PHỤC
                 </button>
                 <input ref={backupInputRef} type="file" accept="application/json,.json" onChange={importBackup} className="hidden" />
               </div>
               {backupMessage && <p role="status" className="text-xs font-bold text-center text-slate-600 dark:text-slate-300">{backupMessage}</p>}
            </div>
          </div>
        </div>
 
        {/* One-tap resume: jump straight into the next milestone */}
        {nextMilestone && (
          <button
            onClick={() => launchMilestone(nextMilestone)}
            className="mt-6 w-full py-4 px-5 bg-yellow-300 dark:bg-yellow-450 text-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl font-black text-base md:text-lg shadow-[5px_5px_0_0_#1e293b] dark:shadow-[5px_5px_0_0_#020617] hover:bg-yellow-400 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_#1e293b] transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Zap size={22} className="fill-slate-900 shrink-0" />
            <span className="truncate">HỌC 15 PHÚT HÔM NAY — {nextMilestone.title}</span>
            <ArrowRight size={20} className="shrink-0" />
          </button>
        )}

        {/* Progress bar with sliding bouncing bunny */}
        <div className="mt-6 border-4 border-slate-800 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 h-10 rounded-3xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_#020617] relative flex items-center p-1">
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
        {/* (1.5) Số giờ ĐO TỪ SỐ BÀI THẬT, không phải con số viết tay. Nói
            thẳng mốc B2 vì đó là cam kết của ứng dụng. */}
        <p className="mt-3 text-xs font-bold text-slate-500 dark:text-slate-400">
          Lộ trình có <span className="font-black text-slate-700 dark:text-slate-200">{totalMilestonesCount} chặng · ~{Math.round(roadmapTotalMinutes() / 60)} giờ học</span>.
          Đi hết đến bậc B2 là khoảng <span className="font-black text-slate-700 dark:text-slate-200">{Math.round(minutesThroughBand('upper_intermediate') / 60)} giờ</span>.
          Con số ước lượng từ số bài thật của từng chặng.
        </p>
      </div>

       {/* --- PERSONALIZED PLACEMENT CARD --- */}
       <section className="mb-10 bg-indigo-50 dark:bg-indigo-950/30 border-4 border-indigo-700 dark:border-indigo-500 rounded-3xl p-5 shadow-[6px_6px_0_0_#312e81] dark:shadow-[6px_6px_0_0_#020617] flex flex-col md:flex-row md:items-center justify-between gap-4">
         {/* (4.1) Nói thẳng độ dài THẬT của bài. Nhãn cũ là "LÀM TEST 5 PHÚT"
             cho một bài 12 câu cố định; bài thích ứng dài 12–24 câu tuỳ người
             trả lời, nên không có một con số phút nào đúng cho mọi người. */}
         <div><p className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-300">Lộ trình thông minh</p><h3 className="text-xl font-black mt-1">{recommendation.title}</h3><p className="text-sm font-bold text-slate-600 dark:text-slate-300 mt-1">{recommendation.body}</p><p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1.5">Bài thích ứng 12–24 câu, mỗi câu gắn bậc A1→C1. Đo ngữ pháp, từ vựng, đọc hiểu.</p></div>
         <button onClick={() => setShowPlacement(true)} className="shrink-0 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#312e81]">{placementResult ? 'LÀM LẠI TEST' : 'LÀM TEST XẾP BẬC'} <ArrowRight className="inline ml-1" size={17} /></button>
       </section>

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
 
      {/* --- DAILY GOAL + SPACED REPETITION REVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {/* Daily goal card */}
        <div className={`border-4 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] transition-all ${dailyDone ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500' : 'bg-white dark:bg-slate-900 border-slate-800 dark:border-slate-700'}`}>
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Target size={26} className={dailyDone ? 'text-emerald-500' : 'text-blue-500'} />
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase">Mục tiêu hôm nay</h3>
            </div>
            <button onClick={toggleMute} title={muted ? 'Bật âm thanh' : 'Tắt âm thanh'} className="w-9 h-9 rounded-xl border-3 border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
              {muted ? <VolumeX size={18} className="text-slate-400" /> : <Volume2 size={18} className="text-blue-500" />}
            </button>
          </div>
          {dailyDone ? (
            <p className="font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2"><CheckCircle2 size={20} /> Đã đạt mục tiêu! Hôm nay bạn học {dailyStats.lessons} chặng (+{dailyStats.xp} XP). Tuyệt vời! 🎉</p>
          ) : (
            <>
              <p className="font-bold text-slate-500 dark:text-slate-400 text-sm mb-2">Hoàn thành {dailyGoal} chặng hôm nay để xây nhịp học đều đặn 🔥</p>
              <div className="border-3 border-slate-800 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 h-6 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full rounded-full transition-all flex items-center justify-end pr-2" style={{ width: `${Math.min(100, ((dailyStats.lessons || 0) / dailyGoal) * 100)}%` }}>
                  <span className="text-[10px] font-black text-slate-900">{dailyStats.lessons || 0}/{dailyGoal}</span>
                </div>
              </div>
            </>
          )}
          <div className="mt-5 pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2.5">
              <SlidersHorizontal size={16} className="text-slate-500 dark:text-slate-400" />
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">Chọn nhịp mỗi ngày</p>
            </div>
            <div className="grid grid-cols-4 gap-2" aria-label="Chọn số chặng mục tiêu mỗi ngày">
              {DAILY_GOAL_OPTIONS.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setDailyGoal?.(goal)}
                  aria-pressed={dailyGoal === goal}
                  aria-label={`${goal} chặng mỗi ngày`}
                  className={`min-h-10 rounded-xl border-3 font-black text-sm cursor-pointer transition-all ${dailyGoal === goal
                    ? 'bg-blue-400 border-slate-800 dark:border-blue-300 text-slate-950 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#93c5fd] -translate-y-0.5'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-blue-400'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] font-bold text-slate-400 dark:text-slate-500">Mục tiêu được lưu trên thiết bị và không ảnh hưởng chuỗi đã đạt.</p>
          </div>
        </div>

        {/* Spaced repetition review card */}
        <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-violet-100 dark:bg-violet-900/40 border-4 border-slate-800 dark:border-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
              <Brain size={28} className="text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase">Ôn Tập Từ</h3>
              <p className="font-bold text-slate-500 dark:text-slate-400 text-sm">
                {dueCount > 0 ? <><span className="text-violet-600 dark:text-violet-400 font-black">{dueCount} từ</span> cần ôn hôm nay</> : 'Chưa có từ nào cần ôn'}
              </p>
              <button onClick={() => setShowNotebook(true)} className="mt-1 text-xs font-black text-violet-600 dark:text-violet-400 hover:underline cursor-pointer">
                📔 Sổ tay của tôi ({getTotalCount()} từ)
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowReview(true)}
            className={`shrink-0 font-black px-5 py-3 rounded-2xl border-4 border-slate-800 dark:border-slate-700 transition-all cursor-pointer ${dueCount > 0 ? 'bg-violet-400 text-white shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-violet-500 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
          >
            ÔN NGAY
          </button>
        </div>
      </div>

      {/* --- MOCK TEST: thi thử VSTEP / IELTS --- */}
      <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 dark:bg-emerald-900/40 border-4 border-slate-800 dark:border-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
            <GraduationCap size={28} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase">Thi Thử VSTEP / IELTS</h3>
            <p className="font-bold text-slate-500 dark:text-slate-400 text-sm">
              {lastMock
                ? <>Gần nhất: <span className="text-emerald-600 dark:text-emerald-400 font-black">{lastMock.scale.type === 'ielts' ? `Band ${lastMock.scale.band}` : `${lastMock.scale.score}/10`}</span> ({lastMock.percent}% · {lastMock.testName})</>
                : 'Đề mini 20 câu có đếm giờ, quy đổi band ước lượng dựa trên từ vựng & ngữ pháp, phân tích từng phần'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowMockTest(true)}
          className="shrink-0 font-black px-5 py-3 rounded-2xl border-4 border-slate-800 dark:border-slate-700 bg-emerald-400 text-white shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-emerald-500 transition-all cursor-pointer"
        >
          {lastMock ? 'THI LẠI' : 'THI THỬ NGAY'}
        </button>
      </div>

      {/* --- (2.3) NGHE CHÉP CHÍNH TẢ — bài đầu tiên dùng giọng người thật --- */}
      <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] mb-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-100 dark:bg-cyan-900/40 border-4 border-slate-800 dark:border-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
            <Headphones size={26} className="text-cyan-600" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase flex flex-wrap items-center gap-2">
              Nghe chép chính tả
              <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase">Giọng người thật</span>
            </h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
              {audioManifest.length} bản thu giọng người thật · nghe rồi gõ lại từng từ. Chấm theo từ, dấu câu không tính.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowDictation(true)}
          className="shrink-0 font-black px-5 py-3 rounded-2xl border-4 border-slate-800 dark:border-slate-700 bg-cyan-400 text-slate-900 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-cyan-500 transition-all cursor-pointer"
        >
          CHÉP CHÍNH TẢ
        </button>
      </div>

      {/* --- (2.2) BÀI NGHE THEO ĐOẠN — nghe mạch nói, không nghe câu lẻ --- */}
      <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] mb-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/40 border-4 border-slate-800 dark:border-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
            <BookOpen size={26} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase flex flex-wrap items-center gap-2">
              Bài nghe theo đoạn
              <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase">VOA</span>
            </h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
              {listeningPassages.length} bài 3–5 phút · nghe rồi trả lời câu hỏi hiểu ý, bản chép lời hiện ra sau khi trả lời xong.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPassage(true)}
          className="shrink-0 font-black px-5 py-3 rounded-2xl border-4 border-slate-800 dark:border-slate-700 bg-indigo-400 text-white shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-indigo-500 transition-all cursor-pointer"
        >
          NGHE ĐOẠN
        </button>
      </div>

      {/* --- (3.4) LUYỆN VIẾT — đường KHÔNG CẦN key Gemini --- */}
      <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] mb-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-violet-100 dark:bg-violet-900/40 border-4 border-slate-800 dark:border-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
            <PenLine size={26} className="text-violet-600" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase flex flex-wrap items-center gap-2">
              Luyện viết
              <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase">Không cần API key</span>
            </h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
              {writingPrompts.length} đề có bài mẫu + {SO_DE_THEO_CHANG} đề gắn với từng chặng A2 trở lên. Không chấm ngữ pháp, không cho điểm.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowWriting(true)}
          className="shrink-0 font-black px-5 py-3 rounded-2xl border-4 border-slate-800 dark:border-slate-700 bg-violet-400 text-white shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-violet-500 transition-all cursor-pointer"
        >
          VIẾT
        </button>
      </div>

      {/* --- ERROR BANK: học từ lỗi sai --- */}
      <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] mb-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 dark:bg-rose-900/40 border-4 border-slate-800 dark:border-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
            <span className="text-2xl" aria-hidden="true">🩹</span>
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase">Học Từ Lỗi Sai</h3>
            <p className="font-bold text-slate-500 dark:text-slate-400 text-sm">
              {dueErrors > 0
                ? <><span className="text-rose-600 dark:text-rose-400 font-black">{dueErrors} câu sai</span> đến hạn ôn lại hôm nay</>
                : totalErrors > 0
                  ? `${totalErrors} câu đang chờ tới lịch ôn (3 → 7 → 14 ngày)`
                  : 'Câu làm sai trong bài tập sẽ tự quay lại đây để bạn sửa tận gốc'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowErrorReview(true)}
          className={`shrink-0 font-black px-5 py-3 rounded-2xl border-4 border-slate-800 dark:border-slate-700 transition-all cursor-pointer ${dueErrors > 0 ? 'bg-rose-400 text-white shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] hover:bg-rose-500 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
        >
          SỬA LỖI
        </button>
      </div>

      {/* --- 7-DAY LEARNING INSIGHTS --- */}
      <section className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] mb-10" aria-labelledby="weekly-insights-title">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-violet-100 dark:bg-violet-950/40 border-3 border-slate-800 dark:border-slate-700 flex items-center justify-center">
              <BarChart3 size={24} className="text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 id="weekly-insights-title" className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase">Nhịp học 7 ngày</h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{weeklyLessons} chặng · +{weeklyXp} XP · {weeklyGoalDays}/7 ngày đạt mục tiêu</p>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Cột xanh: đạt ít nhất {dailyGoal} chặng</p>
        </div>
        <div className="grid grid-cols-7 gap-2 h-40 items-end" role="img" aria-label={`Biểu đồ 7 ngày: ${weeklyLessons} chặng, ${weeklyXp} XP, ${weeklyGoalDays} ngày đạt mục tiêu`}>
          {recentActivity.map((entry) => {
            const height = entry.xp > 0 ? Math.max(12, Math.round((entry.xp / maxDailyXp) * 100)) : 4;
            const dayLabel = new Intl.DateTimeFormat('vi-VN', { weekday: 'short' }).format(new Date(`${entry.date}T12:00:00`));
            return (
              <div key={entry.date} className="h-full flex flex-col justify-end items-center gap-1.5 min-w-0" title={`${entry.date}: ${entry.lessons} chặng, ${entry.xp} XP`}>
                <span className="text-[10px] font-black text-violet-600 dark:text-violet-400">{entry.xp || ''}</span>
                <div className={`w-full max-w-12 rounded-t-xl border-2 border-b-0 border-slate-800 dark:border-slate-600 transition-all ${entry.lessons >= dailyGoal ? 'bg-emerald-400 dark:bg-emerald-600' : entry.xp > 0 ? 'bg-violet-400 dark:bg-violet-600' : 'bg-slate-100 dark:bg-slate-800'}`} style={{ height: `${height}%` }} />
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 capitalize">{dayLabel}</span>
              </div>
            );
          })}
        </div>
        {weeklyLessons === 0 && <p className="mt-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">Hoàn thành một chặng để bắt đầu tạo nhịp học của bạn.</p>}
      </section>

      <LearningReport placementResult={placementResult} weeklyLessons={weeklyLessons} weeklyXp={weeklyXp} completionPercentage={completionPercentage} streak={streak} weeklyGoalDays={weeklyGoalDays} completedCount={completedCount} verifiedCount={verifiedCount} totalMilestonesCount={totalMilestonesCount} onRetakePlacement={() => setShowPlacement(true)} />

      {/* --- VƯỜN THÚ (bộ sưu tập thú cưng, mở khoá bằng việc học) --- */}
      <PetZoo done={completedMilestones} streak={streak} className="mb-10" />

      {/* --- ACHIEVEMENTS / BADGES --- */}
      <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] mb-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Award size={24} className="text-yellow-500" />
          <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase">Huy Hiệu Thành Tích</h3>
          <span className="ml-auto text-sm font-black bg-yellow-300 dark:bg-yellow-500 text-slate-900 px-3 py-1 rounded-full border-2 border-slate-800">{unlockedCount}/{achievements.length}</span>
          <button
            onClick={() => downloadAchievementCard({
              rank: getRankName(completedCount), xp, streak,
              completed: completedCount, total: totalMilestonesCount, badges: unlockedCount,
            })}
            title="Tải ảnh thành tích để chia sẻ Facebook/Zalo"
            className="text-xs font-black px-3 py-1.5 rounded-xl border-2 border-slate-800 dark:border-slate-600 bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 shadow-[2px_2px_0_0_#1e293b] hover:bg-sky-200 cursor-pointer"
          >
            📸 CHIA SẺ
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {achievements.map(a => (
            <div key={a.id} title={a.label} className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-3 transition-all ${a.unlocked ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-400' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50 grayscale'}`}>
              <span className="text-3xl">{a.unlocked ? a.icon : '🔒'}</span>
              <span className="text-[10px] font-black text-center text-slate-600 dark:text-slate-300 leading-tight">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- LEVEL TABS --- */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide shrink-0">
        {/* Dàn tab DẪN XUẤT từ dữ liệu, không viết cứng: thêm bậc mới vào
            roadmapData là tab tự mọc ra, và số đếm không bao giờ lệch. */}
        {[
          { id: 'all', title: 'TẤT CẢ LỘ TRÌNH', count: totalMilestonesCount },
          ...roadmapData.map((lv) => ({ id: lv.level, title: BAND_TAB_LABEL[lv.level] || lv.levelTitle, count: lv.milestones.length })),
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setManualTab(tab.id)}
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
            {/* Đánh dấu tab ứng với kết quả test đầu vào — không khoá tab nào */}
            {recommendedLevel === tab.id && (
              <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-lg border-2 border-slate-800 uppercase">
                Đề xuất
              </span>
            )}
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
                    <h3 className="text-xl md:text-2xl font-black uppercase text-slate-900 dark:text-slate-100 leading-tight flex flex-wrap items-center gap-2">
                      {level.levelTitle}
                      {/* Dưới trình độ đề xuất: gắn nhãn "Ôn lại" cho biết
                          không cần học lại từ đây — nhưng KHÔNG khoá, bấm vào
                          vẫn học được bình thường. */}
                      {isReviewBand(level.level, recommendedLevel) && (
                        <span className="text-[11px] font-black bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-2 border-slate-400 dark:border-slate-600 px-2 py-0.5 rounded-full normal-case">
                          Ôn lại — dưới trình độ của bạn
                        </span>
                      )}
                      {recommendedLevel === level.level && (
                        <span className="text-[11px] font-black bg-emerald-500 text-white border-2 border-slate-800 px-2 py-0.5 rounded-full normal-case">
                          Bắt đầu từ đây
                        </span>
                      )}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-xs md:text-sm mt-0.5">{level.levelDesc}</p>
                    <p className="text-[11px] font-black text-slate-400 mt-1">
                      {level.milestones.length} chặng · ~{formatDuration(bandMinutes(level.level))} · cộng dồn từ đầu lộ trình: ~{Math.round(minutesThroughBand(level.level) / 60)} giờ
                    </p>
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
 
              {/* Milestones in Level — chỉ vẽ một CỬA SỔ quanh chặng đang học.
                  Không chặng nào bị giấu: có nút mở hết ngay dưới. */}
              {(() => {
                const list = level.milestones;
                const expanded = !!expandedLevels[level.level];
                const activeIdx = list.findIndex((x) => nextMilestone && x.id === nextMilestone.id);
                const anchor = activeIdx >= 0 ? activeIdx : list.findIndex((x) => !completedMilestones.includes(x.targetId));
                const from = expanded ? 0 : Math.max(0, Math.min((anchor < 0 ? 0 : anchor) - 4, Math.max(0, list.length - WINDOW_SIZE)));
                const to = expanded ? list.length : Math.min(list.length, from + WINDOW_SIZE);
                const hidden = list.length - (to - from);
                const shown = list.slice(from, to);
                return (
              <div className="space-y-6">
                {!expanded && from > 0 && (
                  <p className="text-xs font-black text-slate-400 -mt-2">↑ {from} chặng phía trên (đã cuộn qua)</p>
                )}
                {shown.map((m) => {
                  const absoluteIdx = allMilestones.findIndex(item => item.id === m.id) + 1;
                  const isDone = completedMilestones.includes(m.targetId);
                  // (#1b) Chặng hoàn thành từ bản cũ không có bản ghi điểm →
                  // "chưa xác minh". Vẫn là HOÀN THÀNH, vẫn đếm vào % lộ trình.
                  const isMilestoneVerified = isDone && isVerified(milestoneScores, m.targetId);
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
                              {/* (1.6) Khoá MỀM: cảnh báo, không chặn. */}
                              {!isDone && isSkippingAhead(level.level, currentBand) && (
                                <span
                                  title="Chặng này cao hơn chỗ bạn đang học khá nhiều. Vẫn mở được, chỉ là sẽ khó."
                                  className="bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-2 border-orange-600 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase"
                                >
                                  ⚠ Vượt cấp
                                </span>
                              )}
                            </div>
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 leading-tight">
                              {m.title}
                            </h4>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs md:text-sm leading-relaxed">{stripClaimedHours(m.desc)}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {m.cefr && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-800 text-white dark:bg-slate-700">{m.cefr}</span>
                              )}
                              {m.minutes > 0 && (
                                <span title="Ước lượng ĐO TỪ SỐ BÀI THẬT của chặng, không phải con số viết tay" className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600">
                                  🕐 ~{formatDuration(m.minutes)}
                                </span>
                              )}
                            </div>
                            {getSkillBadges(m.type)}
                            {getExamBadge(m.exam)}
                          </div>
                          
                          <div className="shrink-0 flex sm:flex-col items-end gap-2 justify-between">
                            {isDone && isMilestoneVerified ? (
                              <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border-2 border-emerald-800 dark:border-emerald-700 px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1">
                                ✓ HOÀN THÀNH
                              </span>
                            ) : isDone ? (
                              <div className="flex flex-col items-end gap-1.5">
                                <span
                                  title="Chặng này hoàn thành từ bản trước, khi app chưa chấm độ chính xác. Vẫn tính vào lộ trình và XP."
                                  className="bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border-2 border-amber-700 dark:border-amber-600 px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1 whitespace-nowrap"
                                >
                                  ⏳ HOÀN THÀNH — CHƯA XÁC MINH
                                </span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setVerifyTarget(m); }}
                                  className="text-[11px] font-black px-3 py-1.5 rounded-xl border-2 border-slate-800 dark:border-slate-600 bg-yellow-300 text-slate-900 shadow-[2px_2px_0_0_#1e293b] hover:bg-yellow-400 active:translate-y-0.5 active:shadow-none cursor-pointer whitespace-nowrap"
                                >
                                  XÁC MINH NHANH (5 CÂU)
                                </button>
                              </div>
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
                {hidden > 0 && (
                  <button
                    onClick={() => setExpandedLevels((prev) => ({ ...prev, [level.level]: !expanded }))}
                    className="w-full py-3 rounded-2xl border-4 border-dashed border-slate-300 dark:border-slate-600 font-black text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    ↓ CÒN {hidden} CHẶNG NỮA Ở BẬC NÀY — BẤM ĐỂ XEM HẾT
                  </button>
                )}
                {expanded && (
                  <button
                    onClick={() => setExpandedLevels((prev) => ({ ...prev, [level.level]: false }))}
                    className="w-full py-3 rounded-2xl border-4 border-dashed border-slate-300 dark:border-slate-600 font-black text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    ↑ THU GỌN, CHỈ HIỆN QUANH CHẶNG ĐANG HỌC
                  </button>
                )}
              </div>
                );
              })()}

            </div>
          ))}
      </div>

      {/* --- CONFIRM RESET ROADMAP MODAL --- */}
      {isResetModalOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="welcome-reset-title" className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000] animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-500 mb-4">
              <AlertTriangle size={32} className="animate-bounce text-rose-500" />
              <h3 id="welcome-reset-title" className="text-2xl font-black uppercase tracking-tight text-slate-800 dark:text-slate-100">Xác nhận làm mới</h3>
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
