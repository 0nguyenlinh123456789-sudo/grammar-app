// File: src/utils/sound.js
// Lightweight sound feedback using the Web Audio API — no audio files needed.
// Respects a persisted mute preference (localStorage 'soundMuted').

let ctx = null;
function getCtx() {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
}

export function isMuted() {
  try { return localStorage.getItem('soundMuted') === '1'; } catch { return false; }
}

export function setMuted(muted) {
  try { localStorage.setItem('soundMuted', muted ? '1' : '0'); } catch { /* ignore */ }
}

// Play a short sequence of notes. notes: [{ freq, start, dur }]
function playNotes(notes, type = 'sine', gainLevel = 0.12) {
  if (isMuted()) return;
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === 'suspended') audio.resume();
  const now = audio.currentTime;
  notes.forEach(({ freq, start, dur }) => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now + start);
    gain.gain.linearRampToValueAtTime(gainLevel, now + start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(now + start);
    osc.stop(now + start + dur + 0.02);
  });
}

// Rising two-note "ding" for a correct answer.
export const playCorrect = () =>
  playNotes([{ freq: 660, start: 0, dur: 0.12 }, { freq: 880, start: 0.1, dur: 0.16 }], 'sine');

// Low "buzz" for a wrong answer.
export const playWrong = () =>
  playNotes([{ freq: 200, start: 0, dur: 0.18 }, { freq: 160, start: 0.12, dur: 0.2 }], 'square', 0.08);

// Cheerful arpeggio for finishing / leveling up.
export const playComplete = () =>
  playNotes([
    { freq: 523, start: 0, dur: 0.14 },
    { freq: 659, start: 0.12, dur: 0.14 },
    { freq: 784, start: 0.24, dur: 0.14 },
    { freq: 1047, start: 0.36, dur: 0.26 },
  ], 'triangle');

// Soft tick for a click / streak increment.
export const playTick = () =>
  playNotes([{ freq: 520, start: 0, dur: 0.06 }], 'sine', 0.06);
