// File: src/components/common/ChibiAnimals.jsx
// A cast of cute chibi animal mascots drawn as inline SVG (no image assets — always
// crisp, tiny, theme-proof). Same neubrutalist "sticker" language as MascotLuna:
// pastel disc + bold dark outline, big sparkly eyes, rosy blush. Used across the
// IELTS Nền Tảng cluster to make daily learning feel warm and rewarding.
//
// Exports:
//   <ChibiSvg species mood size />      – just the animal
//   <ChibiBadge species mood size ... /> – animal with an idle/celebrate animation
//   <ChibiCoach species message ... />  – buddy with a speech bubble (daily nudges)
//   <ChibiCelebration species .../>     – full-screen cheer shown on lesson complete
//   SPECIES, praiseLine(), greetLine()
import { useEffect, useState } from 'react';

// ---------- shared face parts ----------
const INK = '#1f2937';
function Eyes({ happy, y = 49, dx = 11 }) {
  if (happy) {
    return (
      <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round">
        <path d={`M ${50 - dx - 5} ${y + 1} Q ${50 - dx} ${y - 6} ${50 - dx + 5} ${y + 1}`} />
        <path d={`M ${50 + dx - 5} ${y + 1} Q ${50 + dx} ${y - 6} ${50 + dx + 5} ${y + 1}`} />
      </g>
    );
  }
  return (
    <g>
      <ellipse cx={50 - dx} cy={y} rx="5" ry="6.4" fill={INK} />
      <ellipse cx={50 + dx} cy={y} rx="5" ry="6.4" fill={INK} />
      <circle cx={50 - dx + 1.7} cy={y - 2.6} r="1.9" fill="#fff" />
      <circle cx={50 + dx + 1.7} cy={y - 2.6} r="1.9" fill="#fff" />
      <circle cx={50 - dx - 1.4} cy={y + 2.4} r="0.9" fill="#fff" opacity="0.8" />
      <circle cx={50 + dx - 1.4} cy={y + 2.4} r="0.9" fill="#fff" opacity="0.8" />
    </g>
  );
}
function Blush({ y = 55, dx = 20, color = '#fb7185' }) {
  return (
    <g fill={color} opacity="0.55">
      <ellipse cx={50 - dx} cy={y} rx="5.5" ry="3.3" />
      <ellipse cx={50 + dx} cy={y} rx="5.5" ry="3.3" />
    </g>
  );
}
function Smile({ y = 58, w = 5 }) {
  return <path d={`M ${50 - w} ${y} Q 50 ${y + 5} ${50 + w} ${y}`} fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />;
}
const OUT = { stroke: '#0f172a', strokeWidth: 3, strokeLinejoin: 'round' };

// ---------- the animals (each returns the creature over the disc) ----------
const ANIMALS = {
  fox: {
    label: 'Cáo', disc: '#ffedd5',
    body: (happy) => (
      <g>
        <path d="M22 20 L34 40 L14 38 Z" fill="#f97316" {...OUT} />
        <path d="M78 20 L66 40 L86 38 Z" fill="#f97316" {...OUT} />
        <path d="M26 24 L33 38 L20 36 Z" fill="#ffe4c4" />
        <path d="M74 24 L67 38 L80 36 Z" fill="#ffe4c4" />
        <circle cx="50" cy="50" r="30" fill="#f97316" {...OUT} />
        <path d="M50 40 Q34 46 40 62 Q50 72 60 62 Q66 46 50 40 Z" fill="#fff7ed" />
        <Blush color="#f43f5e" />
        <Eyes happy={happy} />
        <ellipse cx="50" cy="57" rx="3" ry="2.2" fill={INK} />
        <Smile />
      </g>
    ),
  },
  cat: {
    label: 'Mèo', disc: '#f1f5f9',
    body: (happy) => (
      <g>
        <path d="M24 18 L36 40 L16 36 Z" fill="#a3b3c9" {...OUT} />
        <path d="M76 18 L64 40 L84 36 Z" fill="#a3b3c9" {...OUT} />
        <path d="M27 22 L34 37 L22 34 Z" fill="#fbcfe8" />
        <path d="M73 22 L66 37 L78 34 Z" fill="#fbcfe8" />
        <circle cx="50" cy="50" r="30" fill="#b9c6d8" {...OUT} />
        <Blush color="#f472b6" />
        <Eyes happy={happy} />
        <path d="M50 55 l-3 3 h6 Z" fill="#f472b6" />
        <Smile y={60} />
        <g stroke={INK} strokeWidth="1.6" strokeLinecap="round">
          <path d="M30 56 h-12" /><path d="M30 60 h-11" />
          <path d="M70 56 h12" /><path d="M70 60 h11" />
        </g>
      </g>
    ),
  },
  panda: {
    label: 'Gấu trúc', disc: '#e0f2fe',
    body: (happy) => (
      <g>
        <circle cx="28" cy="26" r="10" fill={INK} {...OUT} />
        <circle cx="72" cy="26" r="10" fill={INK} {...OUT} />
        <circle cx="50" cy="52" r="30" fill="#ffffff" {...OUT} />
        <ellipse cx="38" cy="50" rx="8" ry="10" fill={INK} />
        <ellipse cx="62" cy="50" rx="8" ry="10" fill={INK} />
        {happy ? (
          <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
            <path d="M33 50 Q38 45 43 50" /><path d="M57 50 Q62 45 67 50" />
          </g>
        ) : (
          <g>
            <circle cx="39" cy="50" r="3.2" fill="#fff" /><circle cx="63" cy="50" r="3.2" fill="#fff" />
          </g>
        )}
        <Blush y={60} dx="21" color="#fb7185" />
        <ellipse cx="50" cy="59" rx="3" ry="2.2" fill={INK} />
        <Smile y={63} />
      </g>
    ),
  },
  bunny: {
    label: 'Thỏ', disc: '#fce7f3',
    body: (happy) => (
      <g>
        <ellipse cx="40" cy="20" rx="7" ry="18" fill="#ffffff" {...OUT} />
        <ellipse cx="60" cy="20" rx="7" ry="18" fill="#ffffff" {...OUT} />
        <ellipse cx="40" cy="20" rx="3.4" ry="12" fill="#fbcfe8" />
        <ellipse cx="60" cy="20" rx="3.4" ry="12" fill="#fbcfe8" />
        <circle cx="50" cy="52" r="29" fill="#ffffff" {...OUT} />
        <Blush color="#fb7185" />
        <Eyes happy={happy} />
        <path d="M50 55 l-2.6 2.6 h5.2 Z" fill="#fb7185" />
        <Smile y={61} />
      </g>
    ),
  },
  penguin: {
    label: 'Chim cánh cụt', disc: '#cffafe',
    body: (happy) => (
      <g>
        <ellipse cx="50" cy="52" rx="30" ry="32" fill="#1f2937" {...OUT} />
        <ellipse cx="50" cy="56" rx="20" ry="24" fill="#ffffff" />
        <Eyes happy={happy} y={46} dx={9} />
        <path d="M44 54 L56 54 L50 62 Z" fill="#f59e0b" {...{ stroke: '#b45309', strokeWidth: 1.5 }} />
        <Blush y={54} dx="24" color="#fb7185" />
        <ellipse cx="40" cy="84" rx="7" ry="4" fill="#f59e0b" {...OUT} />
        <ellipse cx="60" cy="84" rx="7" ry="4" fill="#f59e0b" {...OUT} />
      </g>
    ),
  },
  chick: {
    label: 'Gà con', disc: '#fef9c3',
    body: (happy) => (
      <g>
        <path d="M50 16 l-3 6 h6 Z" fill="#fb923c" />
        <circle cx="50" cy="52" r="31" fill="#fde047" {...OUT} />
        <Blush color="#fb7185" />
        <Eyes happy={happy} />
        <path d="M44 56 L56 56 L50 63 Z" fill="#fb923c" {...{ stroke: '#c2410c', strokeWidth: 1.4 }} />
        <path d="M22 74 q6 6 12 2" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        <path d="M78 74 q-6 6 -12 2" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      </g>
    ),
  },
};

// ---------- base svg ----------
export function ChibiSvg({ species = 'fox', mood = 'idle', size = 80, cap = false }) {
  const A = ANIMALS[species] || ANIMALS.fox;
  const happy = mood === 'happy' || mood === 'celebrate';
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className="select-none pointer-events-none overflow-visible" role="img" aria-label={`${A.label} chibi`}>
      <ellipse cx="50" cy="93" rx="26" ry="4" fill="#0f172a" opacity="0.12" />
      <circle cx="50" cy="54" r="45" fill={A.disc} stroke="#0f172a" strokeWidth="3.5" />
      {A.body(happy)}
      {cap && <text x="50" y="20" fontSize="20" textAnchor="middle">🎓</text>}
      {mood === 'celebrate' && (
        <g>
          <text x="12" y="24" fontSize="14">✨</text>
          <text x="80" y="22" fontSize="14">⭐</text>
        </g>
      )}
    </svg>
  );
}

// ---------- animated badge ----------
const MOOD_ANIM = { idle: 'animate-mascot-float', happy: 'animate-mascot-bounce', celebrate: 'animate-mascot-celebrate', wiggle: 'animate-mascot-wiggle' };
export function ChibiBadge({ species, mood = 'idle', size = 80, cap = false, className = '', onClick }) {
  return (
    <span className={`inline-flex ${MOOD_ANIM[mood] || MOOD_ANIM.idle} ${onClick ? 'cursor-pointer hover:scale-110 transition-transform' : ''} ${className}`} onClick={onClick} style={{ willChange: 'transform' }}>
      <ChibiSvg species={species} mood={mood} size={size} cap={cap} />
    </span>
  );
}

// ---------- speech-bubble coach ----------
export function ChibiCoach({ species = 'fox', message, mood = 'idle', size = 74, direction = 'right', className = '' }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 400); return () => clearTimeout(t); }, [message]);
  const bubble = message && show && (
    <div className={`animate-pop-in relative max-w-[240px] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-600 rounded-2xl px-3.5 py-2.5 shadow-[4px_4px_0_0_#0f172a] dark:shadow-[4px_4px_0_0_#000] ${direction === 'right' ? 'ml-2' : 'mr-2'}`}>
      <p className="text-slate-800 dark:text-slate-100 font-bold text-xs md:text-sm leading-snug">{message}</p>
    </div>
  );
  return (
    <div className={`inline-flex items-center ${className}`}>
      {direction === 'left' && bubble}
      <ChibiBadge species={species} mood={mood} size={size} />
      {direction === 'right' && bubble}
    </div>
  );
}

// ---------- celebration overlay (lesson complete) ----------
export function ChibiCelebration({ species = 'fox', title, subtitle, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-6" onClick={onClose}>
      <div className="animate-pop-in text-center bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-600 rounded-3xl px-8 py-7 shadow-[8px_8px_0_0_#0f172a] dark:shadow-[8px_8px_0_0_#000] max-w-xs">
        <div className="flex justify-center mb-2"><ChibiBadge species={species} mood="celebrate" size={112} cap /></div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-1 font-bold text-slate-500 dark:text-slate-300 text-sm">{subtitle}</p>}
        <p className="mt-3 text-xs font-bold text-slate-400">Chạm để tiếp tục</p>
      </div>
    </div>
  );
}

export default ChibiBadge;
