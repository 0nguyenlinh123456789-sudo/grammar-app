// File: src/components/common/ChibiAnimals.jsx
// A cast of chubby, fluffy chibi animal buddies drawn as inline SVG (no image
// assets — always crisp, tiny, theme-proof). Kawaii style: round body, warm brown
// outline, big glossy eyes, rosy blush; an `idle` pose and a joyful `happy` pose
// (closed ^^ eyes). Used across the IELTS Nền Tảng cluster + the "Vườn thú" game.
//
// Exports: ChibiSvg, ChibiBadge, ChibiCoach, ChibiCelebration.
import { useEffect, useId, useState } from 'react';

const OUT = 'stroke="#8a6650" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"';
const EYE = '#4a3228';
const BODY = 'M20 60 Q18 30 50 27 Q82 30 80 60 Q80 87 50 88 Q20 87 20 60 Z';

// ---------- shared face parts (return SVG markup strings) ----------
function eyes(happy, cy = 53, dx = 13) {
  if (happy) {
    return `<g fill="none" stroke="${EYE}" stroke-width="3" stroke-linecap="round">`
      + `<path d="M ${50 - dx - 5} ${cy} Q ${50 - dx} ${cy - 7} ${50 - dx + 5} ${cy}"/>`
      + `<path d="M ${50 + dx - 5} ${cy} Q ${50 + dx} ${cy - 7} ${50 + dx + 5} ${cy}"/></g>`;
  }
  let s = '';
  for (const ex of [50 - dx, 50 + dx]) {
    s += `<ellipse cx="${ex}" cy="${cy}" rx="6.6" ry="8.2" fill="${EYE}"/>`
      + `<circle cx="${ex - 2}" cy="${cy - 3.2}" r="2.7" fill="#fff"/>`
      + `<circle cx="${ex + 2.2}" cy="${cy + 2.6}" r="1.3" fill="#fff"/>`;
  }
  return s;
}
const blush = (cy = 62, dx = 27) => `<g fill="#ffb3c1" opacity="0.75"><ellipse cx="${50 - dx}" cy="${cy}" rx="6" ry="3.8"/><ellipse cx="${50 + dx}" cy="${cy}" rx="6" ry="3.8"/></g>`;
const smile = (y = 62, w = 4) => `<path d="M ${50 - w} ${y} Q 50 ${y + 4} ${50 + w} ${y}" fill="none" stroke="${EYE}" stroke-width="2" stroke-linecap="round"/>`;
const catmouth = (y = 61) => `<path d="M50 ${y} l-2.6 2.4 h5.2 Z" fill="#c98b7a"/>`
  + `<path d="M50 ${y + 2.4} q-3 3 -6 1" fill="none" stroke="${EYE}" stroke-width="1.8" stroke-linecap="round"/>`
  + `<path d="M50 ${y + 2.4} q3 3 6 1" fill="none" stroke="${EYE}" stroke-width="1.8" stroke-linecap="round"/>`;
const clip = (id) => `<clipPath id="${id}"><path d="${BODY}"/></clipPath>`;

// ---------- the animals: (happy, id) => markup ----------
const ANIMALS = {
  cat: (h, id) => clip(id)
    + `<path d="M25 34 L30 12 L45 28 Z" fill="#fffaf4" ${OUT}/><path d="M75 34 L70 12 L55 28 Z" fill="#f4c88a" ${OUT}/>`
    + `<path d="M29 30 L32 19 L39 27 Z" fill="#f7b3c2"/><path d="M71 30 L68 19 L61 27 Z" fill="#f7b3c2"/>`
    + `<path d="M80 70 Q95 66 92 50 Q90 44 86 48 Q89 60 78 62 Z" fill="#f4c88a" ${OUT}/>`
    + `<path d="${BODY}" fill="#fffaf4" ${OUT}/>`
    + `<g clip-path="url(#${id})"><path d="M55 24 Q84 26 84 52 Q72 40 55 42 Z" fill="#f4c88a"/><ellipse cx="72" cy="76" rx="15" ry="12" fill="#f4c88a"/></g>`
    + `<ellipse cx="38" cy="86" rx="9" ry="6" fill="#fffaf4" ${OUT}/><ellipse cx="62" cy="86" rx="9" ry="6" fill="#fffaf4" ${OUT}/>`
    + eyes(h) + blush() + catmouth()
    + `<g stroke="${EYE}" stroke-width="1.4" stroke-linecap="round" opacity="0.8"><path d="M22 60 h-9"/><path d="M22 64 h-8"/><path d="M78 60 h9"/><path d="M78 64 h8"/></g>`,
  hamster: (h, id) => clip(id)
    + `<ellipse cx="30" cy="30" rx="9" ry="9" fill="#e59a5e" ${OUT}/><ellipse cx="70" cy="30" rx="9" ry="9" fill="#e59a5e" ${OUT}/>`
    + `<ellipse cx="30" cy="30" rx="4.5" ry="4.5" fill="#f7b3c2"/><ellipse cx="70" cy="30" rx="4.5" ry="4.5" fill="#f7b3c2"/>`
    + `<path d="${BODY}" fill="#e59a5e" ${OUT}/>`
    + `<g clip-path="url(#${id})"><path d="M50 44 Q26 46 24 72 Q24 90 50 90 Q76 90 76 72 Q74 46 50 44 Z" fill="#fdf3e7"/></g>`
    + `<ellipse cx="41" cy="82" rx="7" ry="8" fill="#f7b3c2" ${OUT}/><ellipse cx="59" cy="82" rx="7" ry="8" fill="#f7b3c2" ${OUT}/>`
    + eyes(h) + blush() + `<path d="M50 60 l-2.4 2.2 h4.8 Z" fill="#7a5240"/>` + smile(64, 3),
  bear: (h) => `<ellipse cx="27" cy="30" rx="11" ry="11" fill="#b07b4f" ${OUT}/><ellipse cx="73" cy="30" rx="11" ry="11" fill="#b07b4f" ${OUT}/>`
    + `<ellipse cx="27" cy="30" rx="5.5" ry="5.5" fill="#e7b98f"/><ellipse cx="73" cy="30" rx="5.5" ry="5.5" fill="#e7b98f"/>`
    + `<path d="${BODY}" fill="#b07b4f" ${OUT}/><ellipse cx="50" cy="64" rx="17" ry="14" fill="#e7b98f"/>`
    + `<ellipse cx="38" cy="86" rx="9" ry="6" fill="#b07b4f" ${OUT}/><ellipse cx="62" cy="86" rx="9" ry="6" fill="#b07b4f" ${OUT}/>`
    + eyes(h) + blush() + `<ellipse cx="50" cy="60" rx="3.4" ry="2.6" fill="#5b3a26"/>` + smile(65, 4),
  bunny: (h) => `<ellipse cx="40" cy="20" rx="7.5" ry="19" fill="#fffdfb" ${OUT}/><ellipse cx="60" cy="20" rx="7.5" ry="19" fill="#fffdfb" ${OUT}/>`
    + `<ellipse cx="40" cy="21" rx="3.6" ry="13" fill="#f7b3c2"/><ellipse cx="60" cy="21" rx="3.6" ry="13" fill="#f7b3c2"/>`
    + `<path d="${BODY}" fill="#fffdfb" ${OUT}/>`
    + `<ellipse cx="38" cy="86" rx="9" ry="6" fill="#fffdfb" ${OUT}/><ellipse cx="62" cy="86" rx="9" ry="6" fill="#fffdfb" ${OUT}/>`
    + eyes(h) + blush() + `<path d="M50 59 l-2.2 2 h4.4 Z" fill="#f39bb0"/>` + smile(63, 3)
    + `<path d="M50 40 L40 34 L40 46 Z" fill="#f7a8bd" ${OUT}/><path d="M50 40 L60 34 L60 46 Z" fill="#f7a8bd" ${OUT}/><circle cx="50" cy="40" r="3.2" fill="#ec8aa6" ${OUT}/>`,
  chick: (h) => `<path d="${BODY}" fill="#ffe06b" ${OUT}/>`
    + `<path d="M50 22 q-4 -7 -8 -2 q0 5 8 5 Z" fill="#f6a13c"/>`
    + `<ellipse cx="34" cy="88" rx="7" ry="4.5" fill="#f6a13c" ${OUT}/><ellipse cx="66" cy="88" rx="7" ry="4.5" fill="#f6a13c" ${OUT}/>`
    + `<path d="M14 58 q-5 4 -2 9 q6 0 8 -5 Z" fill="#ffd84d" ${OUT}/><path d="M86 58 q5 4 2 9 q-6 0 -8 -5 Z" fill="#ffd84d" ${OUT}/>`
    + eyes(h) + blush() + `<path d="M44 59 L56 59 L50 66 Z" fill="#f6a13c" stroke="#c2410c" stroke-width="1.2"/>`,
  cow: (h, id) => clip(id)
    + `<path d="M24 32 L20 14 L40 26 Z" fill="#fff" ${OUT}/><path d="M76 32 L80 14 L60 26 Z" fill="#fff" ${OUT}/>`
    + `<path d="M36 20 q-4 -8 2 -9 q3 4 1 9 Z" fill="#f4d9a6" ${OUT}/><path d="M64 20 q4 -8 -2 -9 q-3 4 -1 9 Z" fill="#f4d9a6" ${OUT}/>`
    + `<path d="${BODY}" fill="#ffffff" ${OUT}/>`
    + `<g clip-path="url(#${id})"><ellipse cx="30" cy="42" rx="10" ry="9" fill="#3a3a3a"/><ellipse cx="72" cy="70" rx="13" ry="11" fill="#3a3a3a"/></g>`
    + `<ellipse cx="50" cy="66" rx="15" ry="11" fill="#f7b8c4"/>`
    + `<ellipse cx="38" cy="86" rx="9" ry="6" fill="#fff" ${OUT}/><ellipse cx="62" cy="86" rx="9" ry="6" fill="#fff" ${OUT}/>`
    + eyes(h) + `<ellipse cx="44" cy="66" rx="2" ry="2.4" fill="#b06b7a"/><ellipse cx="56" cy="66" rx="2" ry="2.4" fill="#b06b7a"/>`,
  bee: (h, id) => clip(id)
    + `<path d="M40 20 q-8 -10 -12 -2 q4 4 10 4" fill="none" stroke="${EYE}" stroke-width="2"/><circle cx="27" cy="16" r="3" fill="#3a3a3a"/>`
    + `<path d="M60 20 q8 -10 12 -2 q-4 4 -10 4" fill="none" stroke="${EYE}" stroke-width="2"/><circle cx="73" cy="16" r="3" fill="#3a3a3a"/>`
    + `<ellipse cx="24" cy="46" rx="12" ry="16" fill="#dff1fb" ${OUT} opacity="0.9"/><ellipse cx="76" cy="46" rx="12" ry="16" fill="#dff1fb" ${OUT} opacity="0.9"/>`
    + `<path d="${BODY}" fill="#ffd54a" ${OUT}/>`
    + `<g clip-path="url(#${id})"><path d="M20 50 h60 v9 h-60 Z" fill="#3a3a3a"/><path d="M20 68 h60 v9 h-60 Z" fill="#3a3a3a"/></g>`
    + eyes(h) + blush() + smile(60, 4),
  sheep: (h) => {
    let fluff = '';
    for (let i = 0; i < 10; i++) {
      const a = Math.PI * (0.08 + 0.84 * i / 9);
      const cx = 50 - Math.cos(a) * 33, cy = 55 - Math.sin(a) * 33;
      fluff += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="9" fill="#f5f5f7" ${OUT}/>`;
    }
    return fluff
      + `<circle cx="50" cy="58" r="26" fill="#fbeee6" ${OUT}/>`
      + `<ellipse cx="34" cy="46" rx="6" ry="8" fill="#e8d7cc" ${OUT}/><ellipse cx="66" cy="46" rx="6" ry="8" fill="#e8d7cc" ${OUT}/>`
      + `<ellipse cx="38" cy="86" rx="7" ry="6" fill="#8a6650"/><ellipse cx="62" cy="86" rx="7" ry="6" fill="#8a6650"/>`
      + eyes(h, 56, 11) + blush(64, 22) + `<path d="M50 62 l-2 1.8 h4 Z" fill="#8a6650"/>` + smile(66, 3);
  },
};

// ---------- base svg ----------
export function ChibiSvg({ species = 'cat', mood = 'idle', size = 80, cap = false, locked = false }) {
  const id = 'c' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const happy = mood === 'happy' || mood === 'celebrate';
  const draw = (ANIMALS[species] || ANIMALS.cat)(happy && !locked, id);
  const shadow = '<ellipse cx="50" cy="93" rx="28" ry="4.5" fill="#000" opacity="0.10"/>';
  const capMk = cap ? '<text x="50" y="18" font-size="20" text-anchor="middle">🎓</text>' : '';
  const sparkle = mood === 'celebrate' ? '<text x="10" y="26" font-size="15">✨</text><text x="78" y="24" font-size="15">⭐</text>' : '';
  const lockMk = locked ? '<circle cx="72" cy="30" r="12" fill="#fff" stroke="#94a3b8" stroke-width="2"/><text x="72" y="35" font-size="13" text-anchor="middle">🔒</text>' : '';
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={`${species} chibi`}
      className={`select-none pointer-events-none overflow-visible ${locked ? 'grayscale opacity-45' : ''}`}
      dangerouslySetInnerHTML={{ __html: shadow + draw + capMk + sparkle + lockMk }} />
  );
}

// ---------- animated badge ----------
const MOOD_ANIM = { idle: 'animate-mascot-float', happy: 'animate-mascot-bounce', celebrate: 'animate-mascot-celebrate', wiggle: 'animate-mascot-wiggle' };
export function ChibiBadge({ species, mood = 'idle', size = 80, cap = false, locked = false, className = '', onClick }) {
  return (
    <span className={`inline-flex ${locked ? '' : (MOOD_ANIM[mood] || MOOD_ANIM.idle)} ${onClick ? 'cursor-pointer hover:scale-110 transition-transform' : ''} ${className}`} onClick={onClick} style={{ willChange: 'transform' }}>
      <ChibiSvg species={species} mood={mood} size={size} cap={cap} locked={locked} />
    </span>
  );
}

// ---------- speech-bubble coach ----------
export function ChibiCoach({ species = 'cat', message, mood = 'idle', size = 74, direction = 'right', className = '' }) {
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
export function ChibiCelebration({ species = 'cat', title, subtitle, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2600); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-6" onClick={onClose}>
      <div className="animate-pop-in text-center bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-600 rounded-3xl px-8 py-7 shadow-[8px_8px_0_0_#0f172a] dark:shadow-[8px_8px_0_0_#000] max-w-xs">
        <div className="flex justify-center mb-2"><ChibiBadge species={species} mood="celebrate" size={118} cap /></div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-1 font-bold text-slate-500 dark:text-slate-300 text-sm">{subtitle}</p>}
        <p className="mt-3 text-xs font-bold text-slate-400">Chạm để tiếp tục</p>
      </div>
    </div>
  );
}

export default ChibiBadge;
