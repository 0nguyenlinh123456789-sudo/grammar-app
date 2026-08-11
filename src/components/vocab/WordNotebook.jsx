// File: src/components/vocab/WordNotebook.jsx
// "Sổ tay của tôi" — every word in the SRS deck in one place: search, box
// level (how well it's known), next review date, speak & delete. Data comes
// straight from src/utils/srs.js (localStorage), no server involved.
import { useState } from 'react';
import { BookMarked, Search, Trash2, Volume2 } from 'lucide-react';
import { getAllCards, removeWord } from '../../utils/srs';

const BOX_LABELS = {
  1: { label: 'Mới', cls: 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-400' },
  2: { label: 'Quen mặt', cls: 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-400' },
  3: { label: 'Đang nhớ', cls: 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300 border-yellow-400' },
  4: { label: 'Nhớ tốt', cls: 'bg-lime-100 dark:bg-lime-950/40 text-lime-700 dark:text-lime-300 border-lime-500' },
  5: { label: 'Thuộc lòng', cls: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500' },
};

const dayNumToLabel = (due) => {
  const today = Math.floor(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() / 86400000);
  const diff = (due ?? 0) - today;
  if (diff <= 0) return 'Ôn hôm nay';
  if (diff === 1) return 'Ôn ngày mai';
  return `Ôn sau ${diff} ngày`;
};

const WordNotebook = ({ onClose, playAudio }) => {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState(getAllCards);

  const term = query.trim().toLowerCase();
  const filtered = term
    ? cards.filter((c) => `${c.en} ${c.vi}`.toLowerCase().includes(term))
    : cards;

  const speak = (text) => {
    if (playAudio) { playAudio(text); return; }
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      speechSynthesis.speak(u);
    } catch { /* no speech support */ }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notebook-title"
      className="fixed inset-0 z-[140] bg-slate-900/70 backdrop-blur-sm flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl my-6 bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 border-4 border-slate-900 dark:border-slate-600 flex items-center justify-center shrink-0">
              <BookMarked size={24} className="text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h2 id="notebook-title" className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Sổ tay của tôi</h2>
              <p className="text-xs font-black uppercase tracking-widest text-violet-600 dark:text-violet-400 mt-1">{cards.length} từ đang tích lũy</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 shrink-0 rounded-xl border-3 border-slate-800 dark:border-slate-600 dark:text-white font-black cursor-pointer">×</button>
        </div>

        <div className="relative mt-5">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm từ tiếng Anh hoặc nghĩa tiếng Việt..."
            className="w-full h-12 pl-10 pr-4 rounded-2xl border-3 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-white font-bold text-sm outline-none focus:ring-4 focus:ring-violet-200"
          />
        </div>

        <div className="mt-4 space-y-2.5 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
          {filtered.length === 0 && (
            <p className="text-center py-10 text-sm font-bold text-slate-400 dark:text-slate-500">
              {cards.length === 0
                ? 'Chưa có từ nào. Học từ vựng hoặc dùng Quét AI rồi bấm "Lưu vào ôn tập" nhé! 🐰'
                : 'Không tìm thấy từ phù hợp.'}
            </p>
          )}
          {filtered.map((card) => {
            const box = BOX_LABELS[card.box] || BOX_LABELS[1];
            return (
              <div key={card.en} className="p-3.5 rounded-2xl border-3 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-black text-slate-900 dark:text-white">{card.en}</span>
                    {card.ipa && <span className="text-xs font-bold text-slate-400">{card.ipa}</span>}
                  </div>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 truncate">{card.vi}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border-2 ${box.cls}`}>{box.label}</span>
                    <span className="text-[10px] font-bold text-slate-400">{dayNumToLabel(card.due)}</span>
                  </div>
                </div>
                <button onClick={() => speak(card.en)} aria-label={`Phát âm ${card.en}`} className="w-9 h-9 shrink-0 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer">
                  <Volume2 size={16} />
                </button>
                <button
                  onClick={() => { removeWord(card); setCards(getAllCards()); }}
                  aria-label={`Xóa ${card.en} khỏi sổ tay`}
                  className="w-9 h-9 shrink-0 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700 cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WordNotebook;
