// File: src/pages/VocabVstepPage.jsx
import { useState, useEffect, useRef } from 'react';
import { Rocket, BookOpen, Volume2, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import StoryWithHighlights from '../components/vocab/StoryWithHighlights';
import Flashcard from '../components/vocab/Flashcard';
import WritingPractice from '../components/vocab/WritingPractice';
import SpeakingPractice from '../components/vocab/SpeakingPractice';
import PhraseLearningMode from '../components/vocab/PhraseLearningMode';
import ActionScenarioMode from '../components/vocab/ActionScenarioMode';
import ListeningComprehension from '../components/vocab/ListeningComprehension';
import ReadingComprehension from '../components/vocab/ReadingComprehension';
import MascotLuna from '../components/common/MascotLuna';
import { ChibiBadge } from '../components/common/ChibiAnimals';
import { loadVocabProgress, saveVocabProgress } from '../utils/learningProgress';
import MasteryVerdict from '../components/common/MasteryVerdict';
import { createSession, recordAnswer, sessionEvidence, isPassing } from '../utils/mastery';

// Bài gõ từ cần tối thiểu bấy nhiêu từ mới đủ căn cứ để kết luận đạt/chưa đạt.
const MIN_TYPING_ANSWERS = 5;

const MODES = [
  { key: 'flashcard', label: 'Nhận Diện', step: 1, icon: () => <span className="text-xl leading-none">🐰</span>, color: 'bg-blue-400', hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/30', activeText: 'text-white', inactiveIcon: '' },
  { key: 'phrases',   label: 'Cụm Câu',  step: 2, icon: () => <span className="text-xl leading-none">⚡</span>, color: 'bg-yellow-400', hoverColor: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/30', activeText: 'text-slate-900', inactiveIcon: '' },
  // (#0-F2) "Nghe Hiểu"/"Đọc Hiểu" cũ hứa nhiều hơn thực tế: cùng MỘT ngân hàng
  // câu, người học chỉ chọn 1/4 bản dịch — khác nhau ở kênh trình bày (TTS hay
  // chữ). Tên mới nói đúng thao tác.
  { key: 'listening', label: 'Nghe – Chọn Nghĩa',step: 3, icon: () => <span className="text-xl leading-none">🎧</span>, color: 'bg-cyan-400', hoverColor: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/30', activeText: 'text-white', inactiveIcon: '' },
  { key: 'scenario',  label: 'Hành Động',step: 4, icon: () => <span className="text-xl leading-none">🎬</span>, color: 'bg-purple-400', hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/30', activeText: 'text-white', inactiveIcon: '' },
  { key: 'story',     label: 'Câu Chuyện',step:5, icon: () => <span className="text-xl leading-none">⛺</span>, color: 'bg-green-400', hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/30', activeText: 'text-white', inactiveIcon: '' },
  // (#0-F1) Bước này là gõ ĐÚNG MỘT TỪ theo nghĩa, không phải luyện viết.
  // Tên "Luyện Viết" chỉ dành cho Gia Sư Writing (viết đoạn, AI chấm).
  { key: 'writing',   label: 'Gõ Từ Theo Nghĩa',step: 6, icon: () => <span className="text-xl leading-none">✍️</span>, color: 'bg-orange-400', hoverColor: 'hover:bg-orange-50 dark:hover:bg-orange-900/30', activeText: 'text-white', inactiveIcon: '' },
  { key: 'speaking',  label: 'Luyện Nói', step: 7, icon: () => <span className="text-xl leading-none">🎤</span>, color: 'bg-pink-400', hoverColor: 'hover:bg-pink-50 dark:hover:bg-pink-900/30', activeText: 'text-white', inactiveIcon: '' },
];

const VocabVstepPage = ({ activeTopic, playAudio, completedMilestones = [], completeMilestone }) => {
  const [initialProgress] = useState(() => loadVocabProgress(activeTopic?.id));
  const [currentWordIndex, setCurrentWordIndex] = useState(initialProgress.currentWordIndex);
  const [learningMode, setLearningMode] = useState('flashcard');
  const [mascotMood, setMascotMood] = useState('idle');
  const [mascotContext, setMascotContext] = useState('vocab');
  const [visitedModes, setVisitedModes] = useState(() => new Set(initialProgress.visitedModes));
  // Bằng chứng độ chính xác của lượt học này (hạng mục #1).
  const [listeningEvidence, setListeningEvidence] = useState(null);
  const [typingEvidence, setTypingEvidence] = useState(null);
  const typingSessionRef = useRef(createSession());
  const [studiedWordIndexes, setStudiedWordIndexes] = useState(() => new Set(initialProgress.studiedWordIndexes));
  const [progressTopicId, setProgressTopicId] = useState(activeTopic?.id || null);

  useEffect(() => {
    if (!activeTopic?.id) return;
    const saved = loadVocabProgress(activeTopic.id);
    const wordCount = activeTopic.words?.length || 1;
    setCurrentWordIndex(Math.min(Math.max(saved.currentWordIndex, 0), wordCount - 1));
    setLearningMode('flashcard');
    setVisitedModes(new Set(saved.visitedModes));
    setStudiedWordIndexes(new Set(saved.studiedWordIndexes.filter((index) => index < wordCount)));
    setProgressTopicId(activeTopic.id);
    // Bằng chứng độ chính xác thuộc về CHỦ ĐỀ đang học, đổi chủ đề là làm lại
    // từ đầu — không mang điểm của chủ đề này sang mở khoá chủ đề khác.
    setListeningEvidence(null);
    setTypingEvidence(null);
    typingSessionRef.current = createSession();
  }, [activeTopic]);

  useEffect(() => {
    if (!activeTopic?.id || progressTopicId !== activeTopic.id) return;
    saveVocabProgress(activeTopic.id, { currentWordIndex, visitedModes, studiedWordIndexes });
  }, [activeTopic?.id, currentWordIndex, progressTopicId, studiedWordIndexes, visitedModes]);

  if (!activeTopic) {
    return (
      <div className="p-10 font-bold text-center text-slate-400 flex flex-col items-center gap-4">
        <MascotLuna mood="thinking" context="loading" size={80} />
        <p>Đang tải chủ đề từ vựng...</p>
      </div>
    );
  }

  const currentWord = activeTopic.words[currentWordIndex];
  const isCompleted = completedMilestones.includes(activeTopic.id);
  const totalWords = activeTopic.words.length;

  // CHÍNH SÁCH NỘI DUNG (đợt (f) 2026-08-12): thiếu dữ liệu thì ẨN hoặc BÁO,
  // không thay thế âm thầm. Mode "Cụm Câu" trước đây tự sinh collocation/"mẫu
  // câu thi" bằng template cho topic không có dữ liệu — nay chỉ hiện với topic
  // có `phrases` soạn tay; các topic còn lại không thấy bước này.
  const hasRealPhrases = Array.isArray(activeTopic.phrases) && activeTopic.phrases.length > 0;
  const availableModes = MODES.filter((mode) => mode.key !== 'phrases' || hasRealPhrases);
  const modeGridCols = availableModes.length >= 7 ? 'md:grid-cols-7' : 'md:grid-cols-6';

  const handleWordChange = (nextIndex) => {
    const normalizedIndex = ((nextIndex % totalWords) + totalWords) % totalWords;
    setCurrentWordIndex(normalizedIndex);
    setStudiedWordIndexes((previous) => new Set(previous).add(normalizedIndex));
  };

  const handleNextWord = () => handleWordChange(currentWordIndex + 1);
  const handlePrevWord = () => handleWordChange(currentWordIndex - 1);

  const handleComplete = () => {
    if (!canComplete) return;
    completeMilestone(activeTopic.id, 20, accuracyEvidence);
    setMascotMood('celebrate');
    setMascotContext('correct');
    setTimeout(() => { setMascotMood('happy'); }, 2500);
    setTimeout(() => { setMascotMood('idle'); }, 5000);
  };

  // Ghi nhận từng lần gõ từ ở chế độ "Gõ Từ Theo Nghĩa" — chỉ tính lần đầu của
  // mỗi từ, để gõ lại đến khi đúng không đẩy được tỉ lệ lên.
  const handleTypingAnswer = (word, correct) => {
    recordAnswer(typingSessionRef.current, word?.en || word, correct, 'typing');
    setTypingEvidence(sessionEvidence(typingSessionRef.current));
  };

  const handleModeChange = (modeKey) => {
    setLearningMode(modeKey);
    setVisitedModes((previous) => new Set(previous).add(modeKey));
    if (modeKey === 'phrases') { setMascotContext('vocab'); setMascotMood('happy'); }
    else if (modeKey === 'scenario') { setMascotContext('grammar'); setMascotMood('thinking'); }
    else if (modeKey === 'story') { setMascotContext('vocab'); setMascotMood('idle'); }
    else { setMascotContext('vocab'); setMascotMood('idle'); }
  };

  const requiredWordCount = Math.min(totalWords, Math.max(5, Math.ceil(totalWords * 0.3)));
  const requiredModeCount = Math.min(4, availableModes.length);
  const wordRequirementMet = studiedWordIndexes.size >= requiredWordCount;
  const modeRequirementMet = visitedModes.size >= requiredModeCount;

  // ĐỘ CHÍNH XÁC (hạng mục #1). Trong 7 chế độ chỉ có 2 chế độ thật sự có
  // đáp án đúng/sai: "Nghe – Chọn Nghĩa" và "Gõ Từ Theo Nghĩa". Năm chế độ còn
  // lại (thẻ từ, cụm câu, hành động, câu chuyện, luyện nói) không chấm được, nên
  // KHÔNG dùng làm bằng chứng — trước đây hoàn thành chủ đề chỉ cần "xem đủ
  // chế độ + học đủ từ", tức là hoàn toàn không đo gì.
  // Quy tắc: đạt ngưỡng ở MỘT TRONG HAI chế độ có chấm là đủ. Bài gõ từ tính
  // theo các từ đã gõ trong lượt học này, cần ít nhất 5 từ mới đủ căn cứ.
  const typingQualifies = typingEvidence && typingEvidence.total >= MIN_TYPING_ANSWERS;
  const accuracyEvidence = (listeningEvidence?.passed && listeningEvidence)
    || (typingQualifies && typingEvidence.passed && typingEvidence)
    || listeningEvidence
    || (typingQualifies ? typingEvidence : null)
    || undefined;
  const accuracyMet = isPassing(accuracyEvidence);
  const canComplete = wordRequirementMet && modeRequirementMet && accuracyMet;
  const learningProgress = Math.round((
    Math.min(studiedWordIndexes.size / requiredWordCount, 1) * 0.6
    + Math.min(visitedModes.size / requiredModeCount, 1) * 0.4
  ) * 100);

  const needsWordNav = ['writing', 'speaking'].includes(learningMode);

  return (
    <div className="w-full h-full max-w-5xl mx-auto flex flex-col items-center justify-start pb-20">

      {/* HEADER SECTION */}
      <div className="mb-6 text-center w-full max-w-3xl flex flex-col items-center gap-3">
        {/* Topic title with Luna */}
        <div className="flex items-center gap-4 w-full justify-center">
          {/* Mascots live in wrappers because their own root classes hardcode
              inline-flex, which defeats a `hidden` put directly on them.
              Hidden on phones: Luna's bubble overlaps the topic title there. */}
          <div className="hidden sm:block shrink-0">
            <MascotLuna
              mood={mascotMood}
              context={mascotContext}
              size={64}
              direction="right"
            />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tight
            border-b-8 border-black dark:border-slate-500 inline-flex items-center justify-center gap-3 pb-2 mb-2
            bg-white dark:bg-slate-800 px-6 rounded-2xl shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <Rocket size={32} className="text-indigo-600 dark:text-indigo-400" />
            {activeTopic.title.replace(/^[^\s]+\s/, '')}
          </h1>
          <div className="hidden sm:block shrink-0">
            <ChibiBadge species="bunny" mood="idle" size={60} />
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 font-bold mt-1 text-sm md:text-base 
          bg-yellow-100 dark:bg-slate-700 border-2 border-black dark:border-slate-500 
          inline-block px-4 py-2 rounded-2xl">
          {activeTopic.description}
        </p>



        {/* Complete button */}
        <div className="mt-2">
          {isCompleted ? (
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-100 dark:bg-emerald-900/50 
              text-emerald-800 dark:text-emerald-300 font-black border-[3px] border-emerald-800 
              dark:border-emerald-600 rounded-xl shadow-[3px_3px_0_0_#065f46] text-sm">
              ✓ ĐÃ HOÀN THÀNH CHẶNG NÀY (+20 XP)
            </div>
          ) : (
            <div className="w-full max-w-xl space-y-2">
            <div className="text-left rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-3">
              <div className="flex items-center justify-between text-xs font-black mb-2">
                <span>Tiến độ đủ điều kiện hoàn thành</span>
                <span>{learningProgress}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-2">
                <div className="h-full bg-emerald-400 transition-all" style={{ width: `${learningProgress}%` }} />
              </div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {wordRequirementMet ? '✓' : '○'} Đã học {studiedWordIndexes.size}/{requiredWordCount} từ cần thiết
                <span className="mx-2">·</span>
                {modeRequirementMet ? '✓' : '○'} Đã trải nghiệm {visitedModes.size}/{requiredModeCount} chế độ
              </p>
              {/* Điều kiện thứ ba (hạng mục #1): phải ĐO được độ chính xác.
                  Hai chế độ có chấm là "Nghe – Chọn Nghĩa" và "Gõ Từ Theo
                  Nghĩa"; đạt ngưỡng ở một trong hai là đủ. */}
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">
                {accuracyMet ? '✓' : '○'} Đạt ≥80% ở bài <strong>Nghe – Chọn Nghĩa</strong> hoặc <strong>Gõ Từ Theo Nghĩa</strong>
                {listeningEvidence && <span className="ml-1 opacity-80">· nghe: {listeningEvidence.percent}%</span>}
                {typingEvidence?.total > 0 && (
                  <span className="ml-1 opacity-80">
                    · gõ từ: {typingEvidence.percent}% ({typingEvidence.total}/{MIN_TYPING_ANSWERS} từ tối thiểu)
                  </span>
                )}
              </p>
              {!accuracyMet && (listeningEvidence || typingQualifies) && (
                <MasteryVerdict evidence={accuracyEvidence} />
              )}
            </div>
            <button
              onClick={handleComplete}
              disabled={!canComplete}
              aria-describedby="vocab-completion-requirements"
              className={`inline-flex items-center justify-center gap-2 px-6 py-2 w-full
                text-slate-900 font-black border-[3px] border-slate-800 dark:border-slate-600 rounded-xl 
                transition-all text-sm ${canComplete
                  ? 'animate-pulse-glow bg-yellow-300 dark:bg-yellow-500 shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-yellow-400 active:translate-y-0.5 active:shadow-none cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed opacity-80'
                }`}
            >
              {canComplete ? '🌟 HOÀN THÀNH CHỦ ĐỀ (+20 XP)' : '🔒 HỌC THÊM ĐỂ MỞ KHÓA HOÀN THÀNH'}
            </button>
            <span id="vocab-completion-requirements" className="sr-only">
              Cần học ít nhất {requiredWordCount} từ, trải nghiệm {requiredModeCount} chế độ,
              và đạt ít nhất 80% ở bài Nghe – Chọn Nghĩa hoặc bài Gõ Từ Theo Nghĩa
              (bài gõ từ cần tối thiểu {MIN_TYPING_ANSWERS} từ).
            </span>
            </div>
          )}
        </div>
      </div>

      {/* MODE CONTROLS — các bước học của một chủ đề từ vựng;
          bước "Cụm Câu" chỉ hiện khi topic có phrases soạn tay */}
      <div className={`w-full max-w-3xl grid grid-cols-4 ${modeGridCols} gap-2 mb-6`}>
        {availableModes.map((mode, modeIndex) => {
          const Icon = mode.icon;
          const isActive = learningMode === mode.key;
          return (
            <button
              key={mode.key}
              onClick={() => handleModeChange(mode.key)}
              className={`
                py-2 px-1 border-4 border-black dark:border-slate-600 rounded-xl font-black text-xs
                transition-all flex flex-col items-center justify-center gap-0.5
                ${isActive
                  ? `${mode.color} shadow-none translate-y-[2px] ${mode.activeText}`
                  : `bg-white dark:bg-slate-800 ${mode.hoverColor} text-slate-700 dark:text-slate-200 shadow-[3px_3px_0_0_rgba(0,0,0,1)]`
                }
              `}
            >
              <span className={`text-[10px] ${isActive ? 'opacity-80' : 'text-slate-400 dark:text-slate-500'}`}>
                Bước {modeIndex + 1}
              </span>
              <div className={isActive ? mode.activeText : mode.inactiveIcon}>
                <Icon />
              </div>
              <span className="leading-tight text-center">{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* RENDER MODES */}
      {learningMode === 'flashcard' && (
        <Flashcard
          currentWordIndex={currentWordIndex}
          totalWords={totalWords}
          currentWord={currentWord}
          playAudio={playAudio}
          onNext={handleNextWord}
          onPrev={handlePrevWord}
          onWordChange={handleWordChange}
        />
      )}

      {learningMode === 'phrases' && hasRealPhrases && (
        <PhraseLearningMode
          activeTopic={activeTopic}
          playAudio={playAudio}
          currentWordIndex={currentWordIndex}
          onWordChange={handleWordChange}
        />
      )}

      {learningMode === 'listening' && (
        <ListeningComprehension
          activeTopic={activeTopic}
          playAudio={playAudio}
          onFinish={setListeningEvidence}
        />
      )}

      {learningMode === 'scenario' && (
        <ActionScenarioMode
          activeTopic={activeTopic}
          playAudio={playAudio}
        />
      )}

      {learningMode === 'story' && (
        !activeTopic.storyEn ? (
          <div className="w-full max-w-4xl p-10 font-bold text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 animate-fade-in mt-4">
            <p className="text-3xl mb-4">📖🚧</p>
            <p className="text-xl">Dữ liệu Câu Chuyện cho chủ đề này đang được biên soạn!</p>
            <p className="text-sm mt-2 font-normal opacity-70">Hãy thử lại sau nhé.</p>
          </div>
        ) : (
          <div className="w-full max-w-4xl animate-fade-in space-y-6">
            {/* Story image panel header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-4 text-white border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex items-center gap-4">
              <div className="text-4xl">{activeTopic.title.match(/^[^\s]+/)?.[0] || '📖'}</div>
              <div>
                <h2 className="font-black text-xl">Câu Chuyện Nhớ Từ</h2>
                <p className="text-white/80 text-sm font-bold">Tất cả {totalWords} từ xuất hiện trong câu chuyện này!</p>
              </div>
              <button
                onClick={() => playAudio(activeTopic.storyEn)}
                className="ml-auto bg-white/20 border-2 border-white/50 rounded-xl px-4 py-2 font-bold text-sm flex items-center gap-2 hover:bg-white/30 transition-all"
              >
                <Volume2 size={16} /> Nghe
              </button>
            </div>

            {/* English story */}
            <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black mb-6 bg-green-300 dark:bg-green-800 dark:text-white inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg transform -rotate-1">
                <BookOpen size={20} /> 📖 Story (English)
              </h3>
              <div className="text-lg md:text-xl leading-loose font-medium text-slate-800 dark:text-slate-100 story-text">
                <StoryWithHighlights
                  storyText={activeTopic.storyEn}
                  vocabList={activeTopic.words}
                />
              </div>
            </div>

            {/* Vietnamese translation */}
            <div className="bg-slate-800 dark:bg-slate-900 border-4 border-black rounded-2xl p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-white">
              <h3 className="text-xl font-black mb-6 bg-red-400 text-black inline-flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg transform rotate-1">
                <Globe size={20} /> 🇻🇳 Bản Dịch
              </h3>
              <div className="text-lg md:text-xl leading-relaxed font-medium story-text-vi">
                <StoryWithHighlights
                  storyText={activeTopic.storyVi}
                  vocabList={activeTopic.words}
                />
              </div>
            </div>

            {/* Reading comprehension check after the story */}
            <ReadingComprehension words={activeTopic.words} authored={activeTopic.comprehension} />
          </div>
        )
      )}

      {learningMode === 'writing' && (
        <WritingPractice
          onAnswer={handleTypingAnswer}
          currentWordIndex={currentWordIndex}
          totalWords={totalWords}
          currentWord={currentWord}
          playAudio={playAudio}
          onWordChange={handleWordChange}
        />
      )}

      {learningMode === 'speaking' && (
        <SpeakingPractice
          currentWordIndex={currentWordIndex}
          totalWords={totalWords}
          currentWord={currentWord}
          playAudio={playAudio}
          onWordChange={handleWordChange}
        />
      )}

      {/* NAVIGATION — only for word-by-word modes */}
      {needsWordNav && (
        <div className="flex gap-4 md:gap-6 mt-10 w-full max-w-3xl justify-between">
          <button
            onClick={handlePrevWord}
            className="flex-1 py-4 bg-white dark:bg-slate-700 border-4 border-black dark:border-slate-500 
              rounded-2xl font-black text-xl text-slate-800 dark:text-white
              hover:bg-slate-100 dark:hover:bg-slate-600 
              shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] 
              transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ChevronLeft size={24} /> Từ Trước
          </button>
          <button
            onClick={handleNextWord}
            className="flex-1 py-4 bg-yellow-400 border-4 border-black rounded-2xl font-black text-xl 
              hover:bg-yellow-500 shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] 
              transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Từ Tiếp <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VocabVstepPage;
