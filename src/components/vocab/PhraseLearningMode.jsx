// File: src/components/vocab/PhraseLearningMode.jsx
// Teaches vocabulary through collocations, phrases, and a sentence-builder mini-game

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

    // Auto-generate common collocations based on word type
    const collocationPatterns = {
      '(v)': [
        { phrase: `${word.en} quickly`, vi: `${word.vi} nhanh chóng`, use: 'Adverb modifier' },
        { phrase: `${word.en} carefully`, vi: `${word.vi} cẩn thận`, use: 'Adverb modifier' },
        { phrase: `can ${word.en}`, vi: `có thể ${word.vi}`, use: 'Modal verb' },
        { phrase: `${word.en} together`, vi: `cùng nhau ${word.vi}`, use: 'Collaborative action' },
        { phrase: `begin to ${word.en}`, vi: `bắt đầu ${word.vi}`, use: 'Verb + infinitive' },
      ],
      '(n)': [
        { phrase: `a large ${word.en}`, vi: `một ${word.vi} lớn`, use: 'Size adjective' },
        { phrase: `the main ${word.en}`, vi: `${word.vi} chính`, use: 'Main noun' },
        { phrase: `several ${word.en}s`, vi: `nhiều ${word.vi}`, use: 'Plural' },
        { phrase: `${word.en} problem`, vi: `vấn đề ${word.vi}`, use: 'Noun compound' },
        { phrase: `modern ${word.en}`, vi: `${word.vi} hiện đại`, use: 'Adjective + noun' },
      ],
      '(adj)': [
        { phrase: `very ${word.en}`, vi: `rất ${word.vi}`, use: 'Intensifier' },
        { phrase: `quite ${word.en}`, vi: `khá ${word.vi}`, use: 'Degree adverb' },
        { phrase: `${word.en} enough`, vi: `đủ ${word.vi}`, use: 'Sufficiency' },
        { phrase: `not ${word.en} at all`, vi: `không ${word.vi} chút nào`, use: 'Negation emphasis' },
        { phrase: `extremely ${word.en}`, vi: `cực kỳ ${word.vi}`, use: 'Strong emphasis' },
      ],
      '(adv)': [
        { phrase: `${word.en} speaking`, vi: `nói thẳng/rõ`, use: 'Discourse marker' },
        { phrase: `${word.en} possible`, vi: `nếu có thể`, use: 'With adjective' },
        { phrase: `as ${word.en} as possible`, vi: `càng...càng tốt`, use: 'Comparison max' },
        { phrase: `${word.en} after`, vi: `ngay sau đó`, use: 'Time sequence' },
        { phrase: `not ${word.en}`, vi: `không...`, use: 'Negation' },
      ],
    };

    const wordType = word.type || '(n)';
    const matchKey = Object.keys(collocationPatterns).find(k => wordType.includes(k.replace('(','').replace(')',''))) ? wordType : '(n)';
    return collocationPatterns[matchKey] || collocationPatterns['(n)'];
  };

  // IELTS/TOEIC sentence patterns
  const getSentencePatterns = (word) => {
    if (!word) return [];
    return [
      {
        label: 'IELTS Academic',
        pattern: `The ${word.en} plays a crucial role in...`,
        vi: `${word.vi} đóng vai trò quan trọng trong...`,
        color: 'bg-blue-100 dark:bg-blue-900/40 border-blue-400',
      },
      {
        label: 'TOEIC Business',
        pattern: `Please ensure the ${word.en} is...`,
        vi: `Vui lòng đảm bảo ${word.vi} là...`,
        color: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400',
      },
      {
        label: 'VSTEP Speaking',
        pattern: `In my opinion, ${word.en} is very...`,
        vi: `Theo tôi, ${word.vi} rất...`,
        color: 'bg-purple-100 dark:bg-purple-900/40 border-purple-400',
      },
      {
        label: 'Giao tiếp hàng ngày',
        pattern: word.example || `I often use ${word.en} when...`,
        vi: word.viExample || `Tôi thường dùng ${word.vi} khi...`,
        color: 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-400',
      },
    ];
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
          <span>📝</span> Mẫu Câu Thi Cử
        </h3>
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
