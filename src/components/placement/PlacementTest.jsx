import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Compass, X } from 'lucide-react';
import { placementQuestions } from '../../data/placementQuestions';
import { scorePlacement } from '../../utils/placement';

export default function PlacementTest({ onComplete, onClose }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const question = placementQuestions[index];
  const result = useMemo(() => scorePlacement(placementQuestions, answers), [answers]);
  const answered = answers[question.id] !== undefined;

  const next = () => {
    if (!answered) return;
    if (index === placementQuestions.length - 1) onComplete(result);
    else setIndex((value) => value + 1);
  };

  return <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="placement-title">
    <section className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
      <header className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-2xl bg-blue-200 border-3 border-slate-900 flex items-center justify-center"><Compass className="text-blue-700" /></div><div><p className="text-xs font-black text-blue-600 uppercase tracking-widest">Bản đồ năng lực</p><h2 id="placement-title" className="text-2xl font-black">Kiểm tra đầu vào</h2></div></div><button onClick={onClose} aria-label="Đóng" className="w-10 h-10 rounded-xl border-3 border-slate-800 flex items-center justify-center"><X size={18} /></button></header>
      <div className="mt-6 flex items-center justify-between text-xs font-black text-slate-500"><span>Câu {index + 1}/{placementQuestions.length}</span><span>{Math.round(((index + 1) / placementQuestions.length) * 100)}%</span></div>
      <div className="h-3 rounded-full bg-slate-100 border-2 border-slate-700 mt-2 overflow-hidden"><div className="h-full bg-blue-500 transition-all" style={{ width: `${((index + 1) / placementQuestions.length) * 100}%` }} /></div>
      <p className="text-xs font-black uppercase text-slate-400 mt-8">{question.skill}</p><h3 className="text-xl md:text-2xl font-black mt-2 leading-snug">{question.prompt}</h3>
      <div className="grid gap-3 mt-6">{question.options.map((option, optionIndex) => <button key={option} onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))} className={`text-left p-4 rounded-2xl border-3 font-bold transition-all ${answers[question.id] === optionIndex ? 'bg-blue-100 border-blue-600 shadow-[3px_3px_0_0_#2563eb]' : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-400'}`}><span className="inline-flex w-7 h-7 rounded-lg bg-white border-2 border-slate-400 items-center justify-center mr-2 text-xs font-black">{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>
      <footer className="flex justify-between gap-3 mt-8"><button disabled={index === 0} onClick={() => setIndex((value) => value - 1)} className="px-4 py-3 rounded-xl border-3 border-slate-800 font-black disabled:opacity-30 flex items-center gap-2"><ArrowLeft size={17} /> Trước</button><button disabled={!answered} onClick={next} className="px-5 py-3 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] disabled:opacity-40 flex items-center gap-2">{index === placementQuestions.length - 1 ? <>Xem kết quả <CheckCircle2 size={17} /></> : <>Tiếp theo <ArrowRight size={17} /></>}</button></footer>
    </section>
  </div>;
}
