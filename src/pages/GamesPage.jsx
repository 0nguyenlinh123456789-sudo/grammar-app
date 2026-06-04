// File: src/pages/GamesPage.jsx — 6 Interactive English Games (4 Skills: Nghe/Nói/Đọc/Viết)
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, RefreshCw, Volume2, Shuffle, Gamepad2, Zap, Mic, BookOpen, PenLine, Headphones, Timer, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import MascotLuna from '../components/common/MascotLuna';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const cleanVi = (vi = '') => vi.replace(/[🎭🎨🎯🏠🏥💼🌿🌍💻✈️🌦️⚽🍎🛒🧠❤️🔬🐾🏪📊🌐]/gu, '').trim();

// ═══════════════════════════════════════════════════════════
// GAME 1: GHÉP ĐÔI (Word Match) — Từ vựng / Đọc hiểu
// ═══════════════════════════════════════════════════════════
function WordMatchGame({ words, playAudio, onScore }) {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [wrongPair, setWrongPair] = useState([]);
  const [won, setWon] = useState(false);
  const PAIR_COUNT = 6;

  const initGame = useCallback(() => {
    const pool = [...words].sort(() => Math.random() - 0.5).slice(0, PAIR_COUNT);
    const c = [
      ...pool.map((w, i) => ({ id: `en-${i}`, word: w.en, pairId: i, type: 'en' })),
      ...pool.map((w, i) => ({ id: `vi-${i}`, word: cleanVi(w.vi), pairId: i, type: 'vi' })),
    ].sort(() => Math.random() - 0.5);
    setCards(c); setSelected([]); setMatched([]); setAttempts(0); setWrongPair([]); setWon(false);
  }, [words]);

  useEffect(() => { initGame(); }, [initGame]);

  const handleSelect = (card) => {
    if (matched.includes(card.pairId) || selected.some(s => s.id === card.id) || selected.length === 2) return;
    const ns = [...selected, card];
    setSelected(ns);
    if (ns.length === 2) {
      setAttempts(a => a + 1);
      const [a, b] = ns;
      if (a.pairId === b.pairId && a.type !== b.type) {
        playAudio && playAudio(a.type === 'en' ? a.word : b.word);
        setTimeout(() => {
          const nm = [...matched, a.pairId];
          setMatched(nm); setSelected([]);
          if (nm.length >= PAIR_COUNT) { setWon(true); onScore && onScore(PAIR_COUNT * 5); }
        }, 350);
      } else {
        setWrongPair([a.id, b.id]);
        setTimeout(() => { setSelected([]); setWrongPair([]); }, 700);
      }
    }
  };

  const acc = attempts > 0 ? Math.round((matched.length / attempts) * 100) : 100;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="font-black text-xl text-slate-800 dark:text-slate-100">🧩 Ghép Đôi Từ Vựng</h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">Kỹ năng: 📖 Đọc • 💡 Từ vựng</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-emerald-100 dark:bg-emerald-900/40 border-2 border-emerald-400 px-3 py-1 rounded-xl font-black text-emerald-700 dark:text-emerald-300 text-sm">{matched.length}/{PAIR_COUNT} ✓</div>
          <button onClick={initGame} className="bg-white dark:bg-slate-700 border-3 border-slate-800 dark:border-slate-600 p-2 rounded-xl shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] hover:bg-slate-100 cursor-pointer"><RefreshCw size={17} className="text-slate-600 dark:text-slate-300" /></button>
        </div>
      </div>
      {won ? (
        <div className="w-full bg-gradient-to-br from-emerald-400 to-teal-500 border-4 border-black rounded-3xl p-8 text-center shadow-[8px_8px_0_0_rgba(0,0,0,1)] animate-pop-in">
          <div className="text-5xl mb-3">🎉</div>
          <h4 className="text-2xl font-black text-white mb-1">XUẤT SẮC!</h4>
          <p className="text-white/90 font-bold mb-4">Độ chính xác: {acc}% • +{PAIR_COUNT * 5} XP</p>
          <button onClick={initGame} className="bg-white text-emerald-700 font-black px-6 py-2.5 rounded-2xl border-3 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-emerald-50 cursor-pointer flex items-center gap-2 mx-auto"><Shuffle size={18}/> Bộ Mới</button>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 w-full">
          {cards.map(card => {
            const isSel = selected.some(s => s.id === card.id);
            const isMat = matched.includes(card.pairId);
            const isWrg = wrongPair.includes(card.id);
            return (
              <button key={card.id} onClick={() => !isMat && handleSelect(card)}
                className={`min-h-[68px] px-2 py-3 rounded-2xl border-3 font-bold text-sm flex items-center justify-center text-center cursor-pointer transition-all leading-tight ${
                  isMat ? 'bg-emerald-200 dark:bg-emerald-800 border-emerald-500 text-emerald-900 dark:text-emerald-100 scale-95'
                  : isWrg ? 'bg-red-200 dark:bg-red-900 border-red-400 animate-shake text-red-900 dark:text-red-100'
                  : isSel ? 'border-yellow-500 bg-yellow-300 dark:bg-yellow-600 shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-slate-900'
                  : 'bg-white dark:bg-slate-800 border-slate-700 dark:border-slate-600 shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] hover:bg-yellow-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 hover:-translate-y-0.5'
                }`}
              >{isMat && '✓ '}{card.word}</button>
            );
          })}
        </div>
      )}
      {!won && <p className="text-xs font-bold text-slate-400">Lần thử: {attempts} • Chính xác: {acc}%</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// GAME 2: GHÉP CHỮ (Word Scramble) — Viết / Đánh vần
// ═══════════════════════════════════════════════════════════
function scramble(w) {
  const a = w.split('');
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.join('') === w && a.length > 1 ? scramble(w) : a.join('');
}

function WordScrambleGame({ words, playAudio, onScore }) {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hint, setHint] = useState(false);
  const inputRef = useRef(null);

  const init = useCallback(() => {
    const p = [...words].sort(() => Math.random() - 0.5).slice(0, 10);
    setPool(p); setIdx(0); setScrambled(scramble(p[0]?.en || '')); setInput(''); setFeedback(null); setScore(0); setStreak(0); setHint(false);
  }, [words]);
  useEffect(() => { init(); }, [init]);
  const cur = pool[idx];

  const submit = () => {
    if (!input.trim() || !cur) return;
    const ok = input.trim().toLowerCase() === cur.en.toLowerCase();
    setFeedback(ok ? 'correct' : 'wrong');
    if (ok) {
      const ns = score + 10 + (streak >= 2 ? 5 : 0);
      setScore(ns); setStreak(s => s + 1);
      if (idx >= pool.length - 1) onScore && onScore(ns);
      setTimeout(() => {
        if (idx < pool.length - 1) { const ni = idx + 1; setIdx(ni); setScrambled(scramble(pool[ni].en)); setInput(''); setFeedback(null); setHint(false); inputRef.current?.focus(); }
      }, 700);
    } else { setStreak(0); setTimeout(() => { setInput(''); setFeedback(null); inputRef.current?.focus(); }, 700); }
  };

  if (!cur) return null;
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="font-black text-xl text-slate-800 dark:text-slate-100">🔤 Ghép Chữ Cái</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-bold">Kỹ năng: ✍️ Viết • 🔡 Đánh vần</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-yellow-100 dark:bg-yellow-900/40 border-2 border-yellow-400 px-3 py-1 rounded-xl font-black text-yellow-700 dark:text-yellow-300 text-sm flex items-center gap-1"><Zap size={13}/>{score} XP</div>
          {streak >= 2 && <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-400 px-2 py-1 rounded-xl font-black text-orange-600 text-xs animate-bounce">🔥×{streak}</div>}
          <button onClick={init} className="bg-white dark:bg-slate-700 border-3 border-slate-800 dark:border-slate-600 p-2 rounded-xl shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] hover:bg-slate-100 cursor-pointer"><RefreshCw size={17} className="text-slate-600 dark:text-slate-300"/></button>
        </div>
      </div>
      <div className="flex gap-1 w-full">{pool.map((_, i) => <div key={i} className={`flex-1 h-1.5 rounded-full ${i < idx ? 'bg-emerald-400' : i === idx ? 'bg-yellow-400 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`}/>)}</div>

      <div className={`w-full max-w-lg bg-white dark:bg-slate-800 border-4 rounded-3xl p-6 text-center shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all ${feedback === 'correct' ? 'border-emerald-500' : feedback === 'wrong' ? 'border-red-400 animate-shake' : 'border-black dark:border-slate-600'}`}>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2 mb-4 font-bold text-lg text-slate-700 dark:text-slate-200">{cleanVi(cur.vi)}</div>
        <div className="flex justify-center gap-1.5 mb-5 flex-wrap">
          {scrambled.split('').map((l, i) => (
            <div key={i} className="w-10 h-10 bg-violet-100 dark:bg-violet-900/50 border-2 border-violet-400 rounded-xl flex items-center justify-center font-black text-lg text-violet-700 dark:text-violet-300 shadow-[2px_2px_0_0_rgba(109,40,217,0.3)]" style={{ animationDelay: `${i * 40}ms` }}>
              {l.toUpperCase()}
            </div>
          ))}
        </div>
        {hint && <p className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-400">💡 Bắt đầu: <span className="text-violet-600 font-black uppercase">{cur.en[0]}</span> — {cur.en.length} chữ</p>}
        <div className="flex gap-2 justify-center">
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Gõ từ vào đây..."
            className={`flex-1 max-w-xs px-4 py-2.5 border-3 rounded-xl font-black text-lg text-center outline-none ${
              feedback === 'correct' ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
              : feedback === 'wrong' ? 'bg-red-100 border-red-400 text-red-800'
              : 'bg-white dark:bg-slate-700 border-slate-700 dark:border-slate-500 dark:text-slate-100 focus:border-yellow-400'
            }`} autoFocus
          />
          <button onClick={submit} className="px-5 py-2.5 bg-yellow-300 dark:bg-yellow-600 border-3 border-black dark:border-yellow-500 rounded-xl font-black text-lg shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-yellow-400 cursor-pointer active:shadow-none active:translate-y-0.5">✓</button>
        </div>
        {feedback === 'correct' && <p className="mt-3 text-emerald-600 dark:text-emerald-400 font-black text-lg animate-pop-in">🎉 Chính xác!</p>}
        {feedback === 'wrong' && <p className="mt-3 text-red-600 dark:text-red-400 font-black animate-shake">❌ Thử lại!</p>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setHint(true)} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-2 border-slate-400 rounded-xl font-bold text-xs text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">💡 Gợi ý</button>
        <button onClick={() => { if (idx < pool.length - 1) { const ni = idx + 1; setIdx(ni); setScrambled(scramble(pool[ni].en)); setInput(''); setFeedback(null); setHint(false); setStreak(0); }}} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-2 border-slate-400 rounded-xl font-bold text-xs text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">Bỏ qua →</button>
        <button onClick={() => playAudio && playAudio(cur.en)} className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-400 rounded-xl font-bold text-xs text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-200 flex items-center gap-1"><Volume2 size={12}/> Nghe</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// GAME 3: ĐIỀN TỪ (Fill in the Blank) — Đọc / Ngữ pháp
// ═══════════════════════════════════════════════════════════
function FillBlankGame({ words, playAudio, onScore }) {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const makeOpts = useCallback((cur, all) => {
    const wrong = all.filter(w => w.en !== cur.en).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.en);
    return [...wrong, cur.en].sort(() => Math.random() - 0.5);
  }, []);

  const init = useCallback(() => {
    const p = [...words].sort(() => Math.random() - 0.5).slice(0, 10);
    setPool(p); setIdx(0); setOptions(makeOpts(p[0], words)); setSelected(null); setScore(0); setStreak(0);
  }, [words, makeOpts]);
  useEffect(() => { init(); }, [init]);
  const cur = pool[idx];

  const select = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    const ok = opt === cur.en;
    const ns = ok ? score + 10 + (streak >= 2 ? 5 : 0) : score;
    if (ok) { setScore(ns); setStreak(s => s + 1); } else setStreak(0);
    setTimeout(() => {
      if (idx < pool.length - 1) { const ni = idx + 1; setIdx(ni); setOptions(makeOpts(pool[ni], words)); setSelected(null); }
      else onScore && onScore(ns);
    }, 1100);
  };

  if (!cur) return null;
  const blank = (cur.example || `______ = ${cleanVi(cur.vi)}`).replace(new RegExp(`\\b${cur.en}\\b`, 'gi'), '______');
  const isLast = idx >= pool.length - 1 && selected !== null;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="font-black text-xl text-slate-800 dark:text-slate-100">✏️ Điền Vào Chỗ Trống</h3>
          <p className="text-sm text-amber-600 dark:text-amber-400 font-bold">Kỹ năng: 📖 Đọc • 📝 Ngữ pháp ngữ cảnh</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-yellow-100 dark:bg-yellow-900/40 border-2 border-yellow-400 px-3 py-1 rounded-xl font-black text-yellow-700 dark:text-yellow-300 text-sm flex items-center gap-1"><Zap size={13}/>{score} XP</div>
          <button onClick={init} className="bg-white dark:bg-slate-700 border-3 border-slate-800 dark:border-slate-600 p-2 rounded-xl shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] hover:bg-slate-100 cursor-pointer"><RefreshCw size={17} className="text-slate-600 dark:text-slate-300"/></button>
        </div>
      </div>
      <div className="flex gap-1 w-full">{pool.map((_, i) => <div key={i} className={`flex-1 h-1.5 rounded-full ${i < idx ? 'bg-emerald-400' : i === idx ? 'bg-yellow-400 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`}/>)}</div>

      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 rounded-3xl p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Câu {idx+1}/{pool.length}</span>
          <button onClick={() => playAudio && playAudio(cur.example || cur.en)} className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-300 rounded-lg px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"><Volume2 size={12}/> Nghe</button>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl px-4 py-2 mb-4 text-center">
          <span className="text-xs font-black text-amber-600 dark:text-amber-400">Gợi ý: </span>
          <span className="font-bold text-slate-700 dark:text-slate-200">{cleanVi(cur.vi)} ({cur.type})</span>
        </div>
        <p className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-5 text-center">"{blank}"</p>
        <div className="grid grid-cols-2 gap-2.5">
          {options.map((opt, i) => {
            const isOk = opt === cur.en, isSel = selected === opt;
            const show = selected !== null;
            return (
              <button key={i} onClick={() => select(opt)} className={`py-3.5 px-3 rounded-2xl border-3 font-bold text-sm cursor-pointer transition-all ${
                show ? isOk ? 'bg-emerald-200 dark:bg-emerald-800 border-emerald-500 text-emerald-900 dark:text-emerald-100 scale-105'
                  : isSel ? 'bg-red-200 dark:bg-red-900 border-red-400 text-red-900 dark:text-red-100'
                  : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-400 opacity-50'
                : 'bg-white dark:bg-slate-700 border-slate-700 dark:border-slate-500 text-slate-800 dark:text-slate-100 hover:bg-yellow-50 dark:hover:bg-slate-600 hover:border-yellow-400 shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] hover:-translate-y-0.5'
              }`}>
                {show && isOk && '✅ '}{show && isSel && !isOk && '❌ '}{opt}
              </button>
            );
          })}
        </div>
        {selected && (
          <div className={`mt-3 p-2.5 rounded-xl border text-sm font-bold text-center animate-fade-in ${selected === cur.en ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 text-emerald-700 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-300'}`}>
            {selected === cur.en ? `🎉 "${cur.en}" = ${cleanVi(cur.vi)}` : `💡 Đáp án: "${cur.en}" = ${cleanVi(cur.vi)}`}
          </div>
        )}
      </div>
      {isLast && <div className="text-center"><p className="font-black text-2xl text-emerald-600 dark:text-emerald-400 animate-pop-in">🏆 Điểm: {score} XP</p><button onClick={init} className="mt-3 px-6 py-2.5 bg-yellow-300 dark:bg-yellow-600 border-3 border-black rounded-xl font-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-yellow-400 cursor-pointer flex items-center gap-2 mx-auto"><Shuffle size={18}/> Chơi Lại</button></div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// GAME 4: NGHE & VIẾT (Dictation) — Nghe / Viết
// ═══════════════════════════════════════════════════════════
function DictationGame({ words, playAudio, onScore }) {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [played, setPlayed] = useState(false);
  const inputRef = useRef(null);

  const init = useCallback(() => {
    const p = [...words].filter(w => w.en?.length > 2).sort(() => Math.random() - 0.5).slice(0, 10);
    setPool(p); setIdx(0); setInput(''); setFeedback(null); setScore(0); setStreak(0); setPlayed(false);
  }, [words]);
  useEffect(() => { init(); }, [init]);
  const cur = pool[idx];

  const speak = () => {
    if (!cur) return;
    if (playAudio) playAudio(cur.en);
    else if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(cur.en);
      u.lang = 'en-US'; u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
    setPlayed(true);
    inputRef.current?.focus();
  };

  const speakSlow = () => {
    if (!cur) return;
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(cur.en);
      u.lang = 'en-US'; u.rate = 0.55;
      window.speechSynthesis.speak(u);
    } else if (playAudio) playAudio(cur.en);
    setPlayed(true);
    inputRef.current?.focus();
  };

  const submit = () => {
    if (!input.trim() || !cur) return;
    const ok = input.trim().toLowerCase() === cur.en.toLowerCase();
    setFeedback(ok ? 'correct' : 'wrong');
    if (ok) {
      const ns = score + 12 + (streak >= 2 ? 6 : 0);
      setScore(ns); setStreak(s => s + 1);
      if (idx >= pool.length - 1) onScore && onScore(ns);
      setTimeout(() => { if (idx < pool.length - 1) { const ni = idx + 1; setIdx(ni); setInput(''); setFeedback(null); setPlayed(false); inputRef.current?.focus(); } }, 800);
    } else {
      setStreak(0);
      setTimeout(() => { setInput(''); setFeedback(null); inputRef.current?.focus(); }, 900);
    }
  };

  if (!cur) return null;
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="font-black text-xl text-slate-800 dark:text-slate-100">🎧 Nghe & Viết</h3>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">Kỹ năng: 🎧 Nghe • ✍️ Viết</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-yellow-100 dark:bg-yellow-900/40 border-2 border-yellow-400 px-3 py-1 rounded-xl font-black text-yellow-700 dark:text-yellow-300 text-sm flex items-center gap-1"><Zap size={13}/>{score} XP</div>
          {streak >= 2 && <div className="bg-orange-100 border-2 border-orange-400 px-2 py-1 rounded-xl font-black text-orange-600 text-xs animate-bounce">🔥×{streak}</div>}
          <button onClick={init} className="bg-white dark:bg-slate-700 border-3 border-slate-800 dark:border-slate-600 p-2 rounded-xl shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] hover:bg-slate-100 cursor-pointer"><RefreshCw size={17} className="text-slate-600 dark:text-slate-300"/></button>
        </div>
      </div>
      <div className="flex gap-1 w-full">{pool.map((_, i) => <div key={i} className={`flex-1 h-1.5 rounded-full ${i < idx ? 'bg-emerald-400' : i === idx ? 'bg-indigo-400 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`}/>)}</div>

      <div className={`w-full max-w-lg bg-white dark:bg-slate-800 border-4 rounded-3xl p-6 text-center shadow-[6px_6px_0_0_rgba(0,0,0,1)] ${feedback === 'correct' ? 'border-emerald-500' : feedback === 'wrong' ? 'border-red-400 animate-shake' : 'border-black dark:border-slate-600'}`}>
        {/* Speaker buttons */}
        <p className="text-slate-400 dark:text-slate-500 text-xs font-bold mb-4 uppercase tracking-wider">Bước 1: Nghe từ. Bước 2: Gõ vào ô</p>
        <div className="flex justify-center gap-3 mb-6">
          <button onClick={speak} className="flex-1 max-w-[160px] py-4 bg-indigo-500 hover:bg-indigo-600 border-3 border-indigo-800 rounded-2xl font-black text-white shadow-[4px_4px_0_0_rgba(49,46,129,1)] cursor-pointer flex items-center justify-center gap-2 transition-all active:shadow-none active:translate-y-1">
            <Volume2 size={20}/> NGHE TỪ
          </button>
          <button onClick={speakSlow} className="flex-1 max-w-[140px] py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-3 border-slate-700 dark:border-slate-500 rounded-2xl font-black text-slate-700 dark:text-slate-200 shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] cursor-pointer flex items-center justify-center gap-1.5 text-sm transition-all active:shadow-none">
            🐢 Chậm
          </button>
        </div>
        {played && (
          <div className="animate-fade-in">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3">Gợi ý nghĩa: <span className="text-slate-700 dark:text-slate-200">{cleanVi(cur.vi)}</span></p>
            <div className="flex gap-2 justify-center">
              <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()}
                placeholder="Gõ từ bạn nghe được..."
                className={`flex-1 max-w-xs px-4 py-2.5 border-3 rounded-xl font-black text-lg text-center outline-none ${
                  feedback === 'correct' ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                  : feedback === 'wrong' ? 'bg-red-100 border-red-400 text-red-800'
                  : 'bg-white dark:bg-slate-700 border-slate-700 dark:border-slate-500 dark:text-slate-100 focus:border-indigo-400'
                }`} autoFocus
              />
              <button onClick={submit} className="px-5 py-2.5 bg-indigo-400 dark:bg-indigo-600 border-3 border-black dark:border-indigo-500 rounded-xl font-black text-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-indigo-500 cursor-pointer active:shadow-none">✓</button>
            </div>
            {feedback === 'correct' && <p className="mt-3 text-emerald-600 font-black text-lg animate-pop-in">🎧 Chính xác!</p>}
            {feedback === 'wrong' && <p className="mt-3 text-red-600 font-black">❌ Đáp án: <span className="text-indigo-600">{cur.en}</span></p>}
          </div>
        )}
        {!played && <p className="text-slate-300 dark:text-slate-600 font-bold text-sm">Nhấn "NGHE TỪ" để bắt đầu →</p>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// GAME 5: LUYỆN PHÁT ÂM (Pronunciation) — Nói
// ═══════════════════════════════════════════════════════════
function PronunciationGame({ words, playAudio, onScore }) {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [practiced, setPracticed] = useState([]);
  const [score, setScore] = useState(0);
  const [showTip, setShowTip] = useState(false);

  const init = useCallback(() => {
    const p = [...words].filter(w => w.ipa).sort(() => Math.random() - 0.5).slice(0, 10);
    setPool(p.length >= 5 ? p : [...words].sort(() => Math.random() - 0.5).slice(0, 10));
    setIdx(0); setPracticed([]); setScore(0); setShowTip(false);
  }, [words]);
  useEffect(() => { init(); }, [init]);
  const cur = pool[idx];

  const speak = () => {
    if (playAudio) playAudio(cur.en);
    else if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(cur.en);
      u.lang = 'en-US'; u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  };

  const confirm = () => {
    const ns = score + 8;
    setScore(ns);
    setPracticed(p => [...p, idx]);
    if (idx >= pool.length - 1) { onScore && onScore(ns); return; }
    setTimeout(() => { setIdx(i => i + 1); setShowTip(false); }, 400);
  };

  if (!cur) return null;
  const done = practiced.includes(idx);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="font-black text-xl text-slate-800 dark:text-slate-100">🗣️ Luyện Phát Âm</h3>
          <p className="text-sm text-rose-600 dark:text-rose-400 font-bold">Kỹ năng: 🗣️ Nói • 📖 Đọc phiên âm</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-yellow-100 dark:bg-yellow-900/40 border-2 border-yellow-400 px-3 py-1 rounded-xl font-black text-yellow-700 dark:text-yellow-300 text-sm flex items-center gap-1"><Zap size={13}/>{score} XP</div>
          <button onClick={init} className="bg-white dark:bg-slate-700 border-3 border-slate-800 dark:border-slate-600 p-2 rounded-xl shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] hover:bg-slate-100 cursor-pointer"><RefreshCw size={17} className="text-slate-600 dark:text-slate-300"/></button>
        </div>
      </div>
      <div className="flex gap-1 w-full">{pool.map((_, i) => <div key={i} className={`flex-1 h-1.5 rounded-full ${practiced.includes(i) ? 'bg-emerald-400' : i === idx ? 'bg-rose-400 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'}`}/>)}</div>

      <div className="w-full max-w-lg bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 rounded-3xl p-6 text-center shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-300 dark:border-rose-700 rounded-xl px-4 py-2 mb-4">
          <p className="text-xs font-black text-rose-500 dark:text-rose-400 uppercase">Nghĩa</p>
          <p className="font-bold text-slate-700 dark:text-slate-200">{cleanVi(cur.vi)}</p>
        </div>
        
        {/* Big word display */}
        <div className="mb-4">
          <p className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-2">{cur.en}</p>
          {cur.ipa && <p className="text-xl font-bold text-rose-500 dark:text-rose-400 font-mono">{cur.ipa}</p>}
          {cur.type && <span className="inline-block mt-1 text-xs font-black bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">{cur.type}</span>}
        </div>

        {/* Pronunciation guide */}
        {showTip && cur.example && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 rounded-xl p-3 mb-4 text-left animate-fade-in">
            <p className="text-xs font-black text-amber-600 mb-1">📝 Ví dụ:</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 italic">"{cur.example}"</p>
            {cur.viExample && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">→ {cur.viExample}</p>}
          </div>
        )}

        {/* Steps */}
        <div className="flex gap-3 mb-4">
          <button onClick={speak} className="flex-1 py-3 bg-rose-100 dark:bg-rose-900/40 border-2 border-rose-400 rounded-xl font-black text-rose-700 dark:text-rose-300 flex items-center justify-center gap-2 cursor-pointer hover:bg-rose-200 dark:hover:bg-rose-900/60 transition-all">
            <Volume2 size={18}/> Nghe
          </button>
          <button onClick={() => setShowTip(t => !t)} className="flex-1 py-3 bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-400 rounded-xl font-black text-amber-700 dark:text-amber-300 flex items-center justify-center gap-2 cursor-pointer hover:bg-amber-200 transition-all">
            💡 Ví dụ
          </button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 mb-4 text-sm font-bold text-blue-700 dark:text-blue-300">
          🗣️ Đọc to từ <span className="font-black text-blue-900 dark:text-blue-100">"{cur.en}"</span> theo phiên âm IPA rồi bấm xác nhận
        </div>

        <button onClick={confirm} disabled={done}
          className={`w-full py-3.5 rounded-2xl border-3 font-black text-lg transition-all cursor-pointer ${
            done ? 'bg-emerald-300 dark:bg-emerald-700 border-emerald-600 text-white scale-95'
            : 'bg-emerald-400 hover:bg-emerald-500 border-emerald-700 text-white shadow-[4px_4px_0_0_rgba(0,0,0,0.8)] active:shadow-none active:translate-y-1'
          }`}
        >{done ? '✓ Đã luyện!' : '✅ Tôi đã đọc xong!'}</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// GAME 6: QUIZ TỐC ĐỘ (Speed Quiz) — Đọc nhanh / Phản xạ
// ═══════════════════════════════════════════════════════════
function SpeedQuizGame({ words, playAudio, onScore }) {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [mode, setMode] = useState('en-to-vi'); // 'en-to-vi' | 'vi-to-en'
  const timerRef = useRef(null);

  const makeOpts = useCallback((cur, all, m) => {
    const key = m === 'en-to-vi' ? 'vi' : 'en';
    const answer = m === 'en-to-vi' ? cleanVi(cur.vi) : cur.en;
    const wrong = all.filter(w => w.en !== cur.en).sort(() => Math.random() - 0.5).slice(0, 3).map(w => m === 'en-to-vi' ? cleanVi(w.vi) : w.en);
    return [...wrong, answer].sort(() => Math.random() - 0.5);
  }, []);

  const init = useCallback((m = mode) => {
    const p = [...words].sort(() => Math.random() - 0.5).slice(0, 30);
    setPool(p); setIdx(0); setOptions(makeOpts(p[0], words, m)); setSelected(null); setScore(0); setTimer(60); setGameOver(false); setStarted(false); setCorrect(0);
  }, [words, makeOpts, mode]);

  useEffect(() => { init(); return () => clearInterval(timerRef.current); }, [init]);

  const start = () => {
    setStarted(true);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); setGameOver(true); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const select = (opt) => {
    if (selected !== null || !started) return;
    setSelected(opt);
    const m = mode;
    const answer = m === 'en-to-vi' ? cleanVi(pool[idx].vi) : pool[idx].en;
    const ok = opt === answer;
    if (ok) { setScore(s => s + Math.max(1, Math.ceil(timer / 6))); setCorrect(c => c + 1); }
    setTimeout(() => {
      if (idx < pool.length - 1) { const ni = idx + 1; setIdx(ni); setOptions(makeOpts(pool[ni], words, m)); setSelected(null); }
      else { clearInterval(timerRef.current); setGameOver(true); }
    }, 600);
  };

  useEffect(() => { if (gameOver) { clearInterval(timerRef.current); onScore && onScore(score); } }, [gameOver]);

  const cur = pool[idx];
  if (!cur) return null;
  const answer = mode === 'en-to-vi' ? cleanVi(cur.vi) : cur.en;
  const question = mode === 'en-to-vi' ? cur.en : cleanVi(cur.vi);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="font-black text-xl text-slate-800 dark:text-slate-100">⚡ Quiz Tốc Độ</h3>
          <p className="text-sm text-teal-600 dark:text-teal-400 font-bold">Kỹ năng: 📖 Đọc • ⚡ Phản xạ từ vựng</p>
        </div>
        <div className="flex gap-2">
          <div className={`border-3 px-3 py-1 rounded-xl font-black text-lg flex items-center gap-1 ${timer <= 10 ? 'bg-red-100 border-red-400 text-red-700 animate-pulse' : 'bg-slate-100 dark:bg-slate-700 border-slate-400 text-slate-700 dark:text-slate-200'}`}><Timer size={16}/>{timer}s</div>
          <div className="bg-yellow-100 dark:bg-yellow-900/40 border-2 border-yellow-400 px-3 py-1 rounded-xl font-black text-yellow-700 dark:text-yellow-300 text-sm flex items-center gap-1"><Zap size={13}/>{score} XP</div>
          <button onClick={() => { clearInterval(timerRef.current); init(); }} className="bg-white dark:bg-slate-700 border-3 border-slate-800 dark:border-slate-600 p-2 rounded-xl shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] hover:bg-slate-100 cursor-pointer"><RefreshCw size={17} className="text-slate-600 dark:text-slate-300"/></button>
        </div>
      </div>

      {gameOver ? (
        <div className="w-full bg-gradient-to-br from-teal-400 to-cyan-500 border-4 border-black rounded-3xl p-8 text-center shadow-[8px_8px_0_0_rgba(0,0,0,1)] animate-pop-in">
          <div className="text-5xl mb-3">⚡</div>
          <h4 className="text-2xl font-black text-white mb-1">HẾT THỜI GIAN!</h4>
          <p className="text-white/90 font-bold mb-1">{correct} câu đúng • +{score} XP</p>
          <p className="text-white/70 text-sm font-bold mb-4">Điểm thưởng thêm khi trả lời nhanh!</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { clearInterval(timerRef.current); init('en-to-vi'); setMode('en-to-vi'); }} className="bg-white text-teal-700 font-black px-4 py-2 rounded-xl border-3 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-teal-50 cursor-pointer text-sm">Anh→Việt</button>
            <button onClick={() => { clearInterval(timerRef.current); init('vi-to-en'); setMode('vi-to-en'); }} className="bg-white text-teal-700 font-black px-4 py-2 rounded-xl border-3 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-teal-50 cursor-pointer text-sm">Việt→Anh</button>
          </div>
        </div>
      ) : !started ? (
        <div className="w-full max-w-lg text-center">
          <div className="flex justify-center gap-3 mb-6">
            {['en-to-vi', 'vi-to-en'].map(m => (
              <button key={m} onClick={() => { setMode(m); init(m); }} className={`flex-1 py-3 border-3 rounded-2xl font-black text-sm cursor-pointer transition-all ${mode === m ? 'bg-slate-900 dark:bg-slate-700 border-slate-800 text-white shadow-none' : 'bg-white dark:bg-slate-800 border-slate-700 text-slate-700 dark:text-slate-200 shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                {m === 'en-to-vi' ? '🇬🇧→🇻🇳 Anh→Việt' : '🇻🇳→🇬🇧 Việt→Anh'}
              </button>
            ))}
          </div>
          <button onClick={start} className="px-10 py-4 bg-teal-400 hover:bg-teal-500 border-4 border-black rounded-2xl font-black text-xl text-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] cursor-pointer transition-all active:shadow-none active:translate-y-1.5">⚡ BẮT ĐẦU (60 giây)</button>
          <p className="mt-3 text-sm font-bold text-slate-400 dark:text-slate-500">Trả lời nhanh = điểm thưởng cao hơn!</p>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600 rounded-3xl p-5 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black text-slate-400 uppercase">{mode === 'en-to-vi' ? 'Nghĩa tiếng Việt?' : 'Từ tiếng Anh?'}</span>
            <span className="text-xs font-bold text-slate-400">{correct}/{idx} đúng</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-4 mb-4 text-center">
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{question}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt, i) => {
              const isOk = opt === answer, isSel = selected === opt;
              const show = selected !== null;
              return (
                <button key={i} onClick={() => select(opt)} className={`py-3 px-2 rounded-xl border-3 font-bold text-sm cursor-pointer transition-all text-center ${
                  show ? isOk ? 'bg-emerald-200 dark:bg-emerald-800 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                    : isSel ? 'bg-red-200 dark:bg-red-900 border-red-400 text-red-900 dark:text-red-100'
                    : 'bg-slate-100 dark:bg-slate-700 border-slate-300 text-slate-400 opacity-50'
                  : 'bg-white dark:bg-slate-700 border-slate-700 dark:border-slate-500 text-slate-800 dark:text-slate-100 hover:bg-teal-50 dark:hover:bg-slate-600 hover:border-teal-400 shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] hover:-translate-y-0.5'
                }`}>{opt}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN GAMES PAGE
// ═══════════════════════════════════════════════════════════
const GAME_TABS = [
  { id: 'match',       label: 'Ghép Đôi',    icon: '🧩', skill: 'Đọc',     color: 'emerald' },
  { id: 'scramble',   label: 'Ghép Chữ',    icon: '🔤', skill: 'Viết',    color: 'violet' },
  { id: 'blank',      label: 'Điền Từ',     icon: '✏️', skill: 'Đọc/NP',  color: 'amber' },
  { id: 'dictation',  label: 'Nghe & Viết', icon: '🎧', skill: 'Nghe',    color: 'indigo' },
  { id: 'speak',      label: 'Phát Âm',     icon: '🗣️', skill: 'Nói',     color: 'rose' },
  { id: 'speedquiz',  label: 'Quiz Nhanh',  icon: '⚡', skill: 'Phản xạ',  color: 'teal' },
];

const SKILLS_INFO = [
  { icon: '🎧', name: 'Nghe', game: 'Nghe & Viết', tip: 'Nghe từ → gõ lại chính xác. Luyện tai nghe phân biệt âm tiếng Anh.' },
  { icon: '🗣️', name: 'Nói', game: 'Phát Âm', tip: 'Đọc phiên âm IPA, nghe mẫu → tự luyện nói. Chuẩn bị IELTS Speaking.' },
  { icon: '📖', name: 'Đọc', game: 'Ghép Đôi + Điền Từ', tip: 'Đọc hiểu từ vựng trong ngữ cảnh thực, đúng cách dùng trong câu.' },
  { icon: '✍️', name: 'Viết', game: 'Ghép Chữ', tip: 'Đánh vần chính xác, ghi nhớ cấu trúc từ. Nền tảng viết tiếng Anh.' },
];

const FALLBACK_WORDS = [
  { en: 'happy', vi: 'vui vẻ', type: 'adj', ipa: '/ˈhæpi/', example: 'I am very happy today.', viExample: 'Hôm nay tôi rất vui.' },
  { en: 'study', vi: 'học tập', type: 'verb', ipa: '/ˈstʌdi/', example: 'She likes to study English.', viExample: 'Cô ấy thích học tiếng Anh.' },
  { en: 'beautiful', vi: 'đẹp', type: 'adj', ipa: '/ˈbjuːtɪfl/', example: 'The flowers are beautiful.', viExample: 'Những bông hoa rất đẹp.' },
  { en: 'school', vi: 'trường học', type: 'noun', ipa: '/skuːl/', example: 'I go to school every day.', viExample: 'Tôi đi học mỗi ngày.' },
  { en: 'family', vi: 'gia đình', type: 'noun', ipa: '/ˈfæmɪli/', example: 'My family is very close.', viExample: 'Gia đình tôi rất thân thiết.' },
  { en: 'travel', vi: 'du lịch', type: 'verb', ipa: '/ˈtrævl/', example: 'I love to travel the world.', viExample: 'Tôi yêu thích du lịch.' },
  { en: 'friend', vi: 'bạn bè', type: 'noun', ipa: '/frend/', example: 'She is my best friend.', viExample: 'Cô ấy là người bạn thân nhất.' },
  { en: 'music', vi: 'âm nhạc', type: 'noun', ipa: '/ˈmjuːzɪk/', example: 'Music makes me happy.', viExample: 'Âm nhạc làm tôi vui.' },
  { en: 'nature', vi: 'thiên nhiên', type: 'noun', ipa: '/ˈneɪtʃər/', example: 'I enjoy nature walks.', viExample: 'Tôi thích đi dạo trong thiên nhiên.' },
  { en: 'dream', vi: 'ước mơ', type: 'noun', ipa: '/driːm/', example: 'Never give up on your dream.', viExample: 'Đừng bỏ cuộc.' },
  { en: 'strong', vi: 'mạnh mẽ', type: 'adj', ipa: '/strɒŋ/', example: 'Be strong and brave.', viExample: 'Hãy mạnh mẽ và can đảm.' },
  { en: 'water', vi: 'nước', type: 'noun', ipa: '/ˈwɔːtər/', example: 'Drink water every day.', viExample: 'Uống nước mỗi ngày.' },
  { en: 'learn', vi: 'học/tìm hiểu', type: 'verb', ipa: '/lɜːrn/', example: 'I want to learn English well.', viExample: 'Tôi muốn học tiếng Anh tốt.' },
  { en: 'success', vi: 'thành công', type: 'noun', ipa: '/səkˈses/', example: 'Hard work leads to success.', viExample: 'Nỗ lực dẫn đến thành công.' },
  { en: 'patient', vi: 'kiên nhẫn', type: 'adj', ipa: '/ˈpeɪʃnt/', example: 'Be patient with yourself.', viExample: 'Hãy kiên nhẫn với bản thân.' },
];

const GamesPage = ({ activeTopic, playAudio, completeMilestone }) => {
  const [activeGame, setActiveGame] = useState('match');
  const [totalScore, setTotalScore] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [medals, setMedals] = useState({});

  const words = activeTopic?.words?.length >= 8 ? activeTopic.words : FALLBACK_WORDS;

  const handleScore = (pts) => {
    setTotalScore(s => s + pts);
    setMedals(m => ({ ...m, [activeGame]: Math.max(m[activeGame] || 0, pts) }));
    completeMilestone && completeMilestone(`game-${activeGame}-${Date.now()}`, pts);
  };

  const switchGame = (id) => { setActiveGame(id); setGameKey(k => k + 1); };

  const TAB_COLORS = {
    emerald: 'bg-emerald-400 border-emerald-600',
    violet: 'bg-violet-500 border-violet-700',
    amber: 'bg-amber-400 border-amber-600',
    indigo: 'bg-indigo-500 border-indigo-700',
    rose: 'bg-rose-400 border-rose-600',
    teal: 'bg-teal-400 border-teal-600',
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-20 font-sans">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 border-4 border-black rounded-[1.75rem] p-5 md:p-7 shadow-[8px_8px_0_0_rgba(0,0,0,1)] mb-6 mt-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="shrink-0">
            <MascotLuna mood="celebrate" size={72} showBubble={false} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="inline-flex items-center gap-1 bg-white/20 border border-white/30 px-2.5 py-0.5 rounded-lg text-white font-black text-xs uppercase tracking-wider">
                6 Trò Chơi • 4 Kỹ Năng
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">HỌC MÀ CHƠI!</h1>
            <p className="text-white/75 font-bold text-sm mt-0.5 truncate">
              {activeTopic ? activeTopic.title : 'Luyện tất cả 4 kỹ năng qua trò chơi!'}
            </p>
          </div>
          <div className="shrink-0 bg-white/20 border-2 border-white/30 rounded-2xl px-4 py-2.5 text-center hidden sm:block">
            <p className="text-white/60 text-xs font-black uppercase">Tổng XP</p>
            <p className="text-3xl font-black text-yellow-300">{totalScore}</p>
            <p className="text-white/60 text-xs font-bold">{Object.keys(medals).length}/6 game</p>
          </div>
        </div>
      </div>

      {/* GAME TABS — 2×3 grid */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {GAME_TABS.map(tab => (
          <button key={tab.id} onClick={() => switchGame(tab.id)}
            className={`py-3 px-2 border-3 rounded-2xl font-black text-xs transition-all cursor-pointer flex flex-col items-center gap-1 ${
              activeGame === tab.id
                ? `${TAB_COLORS[tab.color]} text-white shadow-none translate-y-[2px]`
                : 'bg-white dark:bg-slate-800 border-slate-700 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] hover:-translate-y-0.5'
            }`}
          >
            <span className="font-black text-sm">{tab.label}</span>
            <span className={`text-xs font-bold ${activeGame === tab.id ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>{tab.skill}</span>
            {medals[tab.id] && <span className="text-xs font-black text-yellow-500">🏅 {medals[tab.id]} XP</span>}
          </button>
        ))}
      </div>

      {/* GAME AREA */}
      <div className="bg-white dark:bg-slate-900 border-4 border-black dark:border-slate-700 rounded-3xl p-5 md:p-7 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] mb-6">
        {activeGame === 'match'      && <WordMatchGame      key={gameKey} words={words} playAudio={playAudio} onScore={handleScore} />}
        {activeGame === 'scramble'   && <WordScrambleGame   key={gameKey} words={words} playAudio={playAudio} onScore={handleScore} />}
        {activeGame === 'blank'      && <FillBlankGame      key={gameKey} words={words} playAudio={playAudio} onScore={handleScore} />}
        {activeGame === 'dictation'  && <DictationGame      key={gameKey} words={words} playAudio={playAudio} onScore={handleScore} />}
        {activeGame === 'speak'      && <PronunciationGame  key={gameKey} words={words} playAudio={playAudio} onScore={handleScore} />}
        {activeGame === 'speedquiz'  && <SpeedQuizGame      key={gameKey} words={words} playAudio={playAudio} onScore={handleScore} />}
      </div>

      {/* 4 SKILLS INFO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {SKILLS_INFO.map(s => (
          <div key={s.icon} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3.5">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="font-black text-slate-800 dark:text-slate-100 text-sm">{s.name}</p>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5">Game: {s.game}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5">{s.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
