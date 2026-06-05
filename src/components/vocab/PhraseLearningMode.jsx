// File: src/components/vocab/PhraseLearningMode.jsx
// Teaches vocabulary through collocations, phrases, and exam-ready sentence patterns

import { useState } from 'react';
import { Zap, ChevronLeft, ChevronRight, Shuffle, CheckCircle, XCircle, Volume2 } from 'lucide-react';

const PhraseLearningMode = ({ activeTopic, playAudio, currentWordIndex, onWordChange }) => {
  const [gameMode, setGameMode] = useState('browse'); // 'browse' | 'quiz'
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const words = activeTopic?.words || [];
  const phrases = activeTopic?.phrases || [];
  
  const currentWord = words[currentWordIndex];

  // Generate phrases from word data or fallback patterns
  const getPhrasesForWord = (word) => {
    if (!word) return [];
    
    // Check if topic has phrase data
    if (phrases.length > 0) {
      return phrases.filter(p => p.word === word.en).slice(0, 5);
    }

    // Auto-generate natural collocations based on word type
    const wordType = (word.type || '(n)').toLowerCase();
    
    if (wordType.includes('v')) {
      return [
        { phrase: `${word.en} effectively`, vi: `${word.vi} hiệu quả`, use: 'Trạng từ bổ nghĩa' },
        { phrase: `need to ${word.en}`, vi: `cần ${word.vi}`, use: 'Cấu trúc need + to V' },
        { phrase: `try to ${word.en}`, vi: `cố gắng ${word.vi}`, use: 'Cấu trúc try + to V' },
        { phrase: `be able to ${word.en}`, vi: `có thể ${word.vi}`, use: 'Cấu trúc be able to + V' },
        { phrase: `decide to ${word.en}`, vi: `quyết định ${word.vi}`, use: 'Cấu trúc decide + to V' },
      ];
    }
    
    if (wordType.includes('adj')) {
      return [
        { phrase: `extremely ${word.en}`, vi: `cực kỳ ${word.vi}`, use: 'Nhấn mạnh tính từ (IELTS Band 7+)' },
        { phrase: `become ${word.en}`, vi: `trở nên ${word.vi}`, use: 'Linking verb + adj' },
        { phrase: `remain ${word.en}`, vi: `vẫn ${word.vi}`, use: 'Linking verb + adj' },
        { phrase: `increasingly ${word.en}`, vi: `ngày càng ${word.vi}`, use: 'Trạng từ mức độ (Academic)' },
        { phrase: `relatively ${word.en}`, vi: `tương đối ${word.vi}`, use: 'Hedging language (IELTS Writing)' },
      ];
    }
    
    if (wordType.includes('adv')) {
      return [
        { phrase: `${word.en} speaking`, vi: `nói một cách ${word.vi}`, use: 'Discourse marker' },
        { phrase: `quite ${word.en}`, vi: `khá ${word.vi}`, use: 'Bổ nghĩa trạng từ' },
        { phrase: `more ${word.en}`, vi: `${word.vi} hơn`, use: 'So sánh hơn' },
        { phrase: `act ${word.en}`, vi: `hành động ${word.vi}`, use: 'V + adv' },
        { phrase: `${word.en} enough`, vi: `đủ ${word.vi}`, use: 'Adv + enough' },
      ];
    }

    // Default: noun patterns
    return [
      { phrase: `a significant ${word.en}`, vi: `một ${word.vi} đáng kể`, use: 'Adj + Noun (Academic)' },
      { phrase: `the main ${word.en}`, vi: `${word.vi} chính`, use: 'Xác định danh từ' },
      { phrase: `a lack of ${word.en}`, vi: `sự thiếu ${word.vi}`, use: 'Cụm danh từ (IELTS Writing)' },
      { phrase: `the importance of ${word.en}`, vi: `tầm quan trọng của ${word.vi}`, use: 'Abstract noun phrase' },
      { phrase: `${word.en} and its impact`, vi: `${word.vi} và tác động của nó`, use: 'Noun phrase mở rộng' },
    ];
  };

  // Complete, practical exam sentence patterns
  const getSentencePatterns = (word) => {
    if (!word) return [];
    
    const wordType = (word.type || '(n)').toLowerCase();
    const en = word.en;
    const vi = word.vi;

    // Use existing example if available
    const realExample = word.example && word.viExample ? {
      label: '💬 Câu mẫu thực tế',
      pattern: word.example,
      vi: word.viExample,
      color: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400',
    } : null;

    const patterns = [];

    if (realExample) patterns.push(realExample);

    if (wordType.includes('v')) {
      patterns.push(
        {
          label: '📝 IELTS Writing Task 2',
          pattern: `It is essential to ${en} in order to achieve long-term success.`,
          vi: `Việc ${vi} là rất cần thiết để đạt được thành công lâu dài.`,
          color: 'bg-blue-100 dark:bg-blue-900/40 border-blue-400',
        },
        {
          label: '🗣️ VSTEP Speaking',
          pattern: `In my daily life, I usually ${en} whenever I have the opportunity.`,
          vi: `Trong cuộc sống hàng ngày, tôi thường ${vi} bất cứ khi nào có cơ hội.`,
          color: 'bg-purple-100 dark:bg-purple-900/40 border-purple-400',
        },
        {
          label: '💼 TOEIC Business',
          pattern: `The management team decided to ${en} the new policy immediately.`,
          vi: `Ban lãnh đạo quyết định ${vi} chính sách mới ngay lập tức.`,
          color: 'bg-amber-100 dark:bg-amber-900/40 border-amber-400',
        }
      );
    } else if (wordType.includes('adj')) {
      patterns.push(
        {
          label: '📝 IELTS Writing Task 2',
          pattern: `This issue has become increasingly ${en} in modern society.`,
          vi: `Vấn đề này ngày càng trở nên ${vi} trong xã hội hiện đại.`,
          color: 'bg-blue-100 dark:bg-blue-900/40 border-blue-400',
        },
        {
          label: '🗣️ VSTEP Speaking',
          pattern: `I think being ${en} is one of the most important qualities a person can have.`,
          vi: `Tôi nghĩ ${vi} là một trong những phẩm chất quan trọng nhất mà một người có thể có.`,
          color: 'bg-purple-100 dark:bg-purple-900/40 border-purple-400',
        },
        {
          label: '💼 TOEIC Business',
          pattern: `The results of the survey were quite ${en}, surprising many in the industry.`,
          vi: `Kết quả khảo sát khá ${vi}, khiến nhiều người trong ngành ngạc nhiên.`,
          color: 'bg-amber-100 dark:bg-amber-900/40 border-amber-400',
        }
      );
    } else {
      // Noun patterns
      patterns.push(
        {
          label: '📝 IELTS Writing Task 2',
          pattern: `The role of ${en} in shaping our future cannot be underestimated.`,
          vi: `Vai trò của ${vi} trong việc định hình tương lai của chúng ta không thể bị đánh giá thấp.`,
          color: 'bg-blue-100 dark:bg-blue-900/40 border-blue-400',
        },
        {
          label: '🗣️ VSTEP Speaking',
          pattern: `I believe that ${en} is something everyone should pay more attention to.`,
          vi: `Tôi tin rằng ${vi} là điều mà mọi người nên chú ý hơn.`,
          color: 'bg-purple-100 dark:bg-purple-900/40 border-purple-400',
        },
        {
          label: '💼 TOEIC Business',
          pattern: `Our company places great emphasis on ${en} to ensure customer satisfaction.`,
          vi: `Công ty chúng tôi rất coi trọng ${vi} để đảm bảo sự hài lòng của khách hàng.`,
          color: 'bg-amber-100 dark:bg-amber-900/40 border-amber-400',
        }
      );
    }

    return patterns;
  };

  if (!currentWord) return <div className="p-8 text-center text-slate-400">Đang tải...</div>;

  const wordPhrases = getPhrasesForWord(currentWord);
  const sentencePatterns = getSentencePatterns(currentWord);

  return (
    <div className="w-full max-w-4xl space-y-6 animate-fade-in">
      {/* Word Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-black">{currentWord.en}</div>
            <div className="text-blue-200 font-bold text-lg mt-1">{currentWord.ipa}</div>
            <div className="text-white/90 font-bold text-xl mt-1">{currentWord.vi}</div>
            {currentWord.synonyms && (
              <div className="text-blue-200 text-sm font-medium mt-2">
                <span className="text-white/70">Đồng nghĩa:</span> {currentWord.synonyms}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200 font-bold mb-1">Từ</div>
            <div className="text-4xl font-black text-yellow-300">
              {currentWordIndex + 1}/{words.length}
            </div>
            <button
              onClick={() => playAudio(currentWord.en)}
              className="mt-2 px-3 py-1 bg-white/20 border-2 border-white/50 rounded-xl text-sm font-bold hover:bg-white/30 transition-all"
            >
              🔊 Nghe
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: Common Phrases / Collocations */}
      <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <h3 className="text-xl font-black mb-4 flex items-center gap-2">
          <Zap size={20} className="text-yellow-500" />
          <span className="text-slate-800 dark:text-slate-100">Cụm Từ & Collocation</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {wordPhrases.map((p, i) => (
            <div
              key={i}
              className="phrase-card p-4 cursor-pointer hover:scale-[1.02] transition-all"
              onClick={() => playAudio(p.phrase)}
            >
              <div className="font-black text-blue-800 dark:text-blue-200 text-lg">{p.phrase}</div>
              <div className="text-slate-600 dark:text-slate-300 font-bold text-sm mt-1">{p.vi}</div>
              {p.use && (
                <div className="mt-2 inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded-full">
                  {p.use}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Sentence Patterns for Exams */}
      <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <h3 className="text-xl font-black mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span>📝</span> Mẫu Câu Thi Cử Hoàn Chỉnh
        </h3>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 -mt-2">
          Những mẫu câu hoàn chỉnh bạn có thể dùng ngay trong bài thi IELTS, VSTEP, TOEIC
        </p>
        <div className="space-y-3">
          {sentencePatterns.map((s, i) => (
            <div key={i} className={`border-2 rounded-xl p-4 relative pr-12 ${s.color}`}>
              <button
                onClick={(e) => { e.stopPropagation(); playAudio(s.pattern); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-700/80 p-2 rounded-full border-2 border-black/20 hover:bg-white dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center hover:scale-110 active:scale-95"
                title="Nghe câu mẫu"
              >
                <Volume2 size={16} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black px-2 py-0.5 bg-black text-white rounded-full">{s.label}</span>
              </div>
              <div className="font-bold text-slate-800 dark:text-slate-100 text-base">{s.pattern}</div>
              <div className="text-slate-600 dark:text-slate-300 text-sm font-medium mt-1 italic">{s.vi}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Memory Anchor */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <h3 className="text-xl font-black mb-3 text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span>🧠</span> Mẹo Ghi Nhớ Nhanh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-700 border-2 border-black rounded-xl p-3 text-center">
            <div className="text-3xl mb-2">🔗</div>
            <div className="text-xs font-black text-slate-600 dark:text-slate-300 mb-1">LIÊN KẾT</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">"{currentWord.en}" giống với?</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Nghĩ về từ tiếng Việt gần giống</div>
          </div>
          <div className="bg-white dark:bg-slate-700 border-2 border-black rounded-xl p-3 text-center">
            <div className="text-3xl mb-2">🎬</div>
            <div className="text-xs font-black text-slate-600 dark:text-slate-300 mb-1">HÌNH ẢNH</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Tưởng tượng cảnh "{currentWord.vi}"</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Não ghi nhớ hình ảnh tốt hơn 60000 lần</div>
          </div>
          <div className="bg-white dark:bg-slate-700 border-2 border-black rounded-xl p-3 text-center">
            <div className="text-3xl mb-2">🗣️</div>
            <div className="text-xs font-black text-slate-600 dark:text-slate-300 mb-1">NÓI TO</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Đọc "{currentWord.en}" 3 lần</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Kết hợp âm thanh + chuyển động môi</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => onWordChange?.((currentWordIndex - 1 + words.length) % words.length)}
          className="flex-1 py-4 bg-white dark:bg-slate-700 border-4 border-black dark:border-slate-500 rounded-2xl font-black text-xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
        >
          <ChevronLeft size={24} /> Từ Trước
        </button>
        <button
          onClick={() => onWordChange?.((currentWordIndex + 1) % words.length)}
          className="flex-1 py-4 bg-yellow-400 border-4 border-black rounded-2xl font-black text-xl hover:bg-yellow-500 shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
        >
          Từ Tiếp <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default PhraseLearningMode;
