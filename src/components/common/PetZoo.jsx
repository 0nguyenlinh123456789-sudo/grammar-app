// File: src/components/common/PetZoo.jsx
// "Vườn thú" — a collectible pet game shared across the whole app. Every lesson you
// finish anywhere (Ngữ pháp / Từ vựng / Games / IELTS) is an apple 🍎 that grows
// your buddies and unlocks new ones. Locked pets show grey + a progress bar, so
// there's always a next cute animal to study toward — the daily-return hook.
import { ChibiBadge } from './ChibiAnimals';
import { PETS, petUnlocked, petHint, petProgress } from './chibiCopy';

const CARD = 'border-4 border-slate-800 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#020617]';

export default function PetZoo({ done = [], streak = 0, className = '' }) {
  const lessons = done.length; // an apple for every completed lesson, anywhere
  const stat = { lessons, streak };
  const owned = PETS.filter((p) => petUnlocked(p, stat)).length;
  const next = PETS.find((p) => !petUnlocked(p, stat));
  return (
    <div className={`${CARD} p-5 ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <h2 className="flex items-center gap-2 font-black text-slate-800 dark:text-white"><span className="text-xl">🏡</span> Vườn thú của cậu</h2>
        <span className="text-xs font-black text-slate-400">{owned}/{PETS.length} bạn · 🍎 {lessons}</span>
      </div>
      <p className="text-xs font-bold text-slate-400 mb-4">
        {next ? `Học thêm để mở khoá 🐾 ${next.name} — ${petHint(next)}!` : 'Cậu đã sưu tầm hết tất cả các bạn thú! 🏆'}
      </p>
      <div className="grid grid-cols-4 gap-3">
        {PETS.map((p) => {
          const got = petUnlocked(p, stat);
          const prog = Math.round(petProgress(p, stat) * 100);
          return (
            <div key={p.species} className={`flex flex-col items-center text-center p-2 rounded-2xl border-[3px] ${got ? 'border-slate-800 dark:border-slate-600 bg-yellow-50 dark:bg-slate-900/40' : 'border-dashed border-slate-300 dark:border-slate-700'}`}>
              <ChibiBadge species={p.species} mood={got ? 'happy' : 'idle'} size={56} locked={!got} />
              <span className={`mt-1 text-xs font-black leading-tight ${got ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`}>{got ? p.name : '???'}</span>
              {got ? (
                <span className="text-[9px] font-bold text-slate-400 leading-tight">{p.en}</span>
              ) : (
                <div className="w-full mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className="h-full bg-pink-400" style={{ width: `${prog}%` }} /></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
