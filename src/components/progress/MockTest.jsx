// File: src/components/progress/MockTest.jsx
// Thi thử VSTEP / IELTS (đề mini 20 câu): chọn đề → làm bài có đếm giờ →
// kết quả quy đổi band + phân tích từng phần + xem lại câu sai.
// Câu sai tự vào "Học từ lỗi sai" (utils/errorBank).
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, GraduationCap, Volume2, X } from 'lucide-react';
import { MOCK_TESTS, SECTION_LABELS } from '../../data/mockTestData';
import { scoreMockTest, saveMockAttempt, previousAttempt, weakestSection } from '../../utils/mockTest';
import { recordError } from '../../utils/errorBank';
import MachineVoiceTag from '../common/MachineVoiceTag';

const fmtTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export default function MockTest({ onClose }) {
  const [test, setTest] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [prevAttempt, setPrevAttempt] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const question = test?.questions[index];
  const answered = question && answers[question.id] !== undefined;

  const finish = useCallback(() => {
    const scored = scoreMockTest(test, answers);
    setPrevAttempt(previousAttempt(test.id)); // đọc TRƯỚC khi lưu lượt mới
    saveMockAttempt(scored);
    for (const item of scored.wrong) {
      recordError({
        skill: item.section === 'listening' ? 'listening' : item.section === 'vocabulary' ? 'vocab' : item.section,
        prompt: item.prompt,
        answer: item.options[item.answer],
        chosen: item.picked !== undefined ? item.options[item.picked] : 'Chưa trả lời',
      });
    }
    setResult(scored);
  }, [test, answers]);

  // Đồng hồ đếm ngược; hết giờ thì tự nộp bài.
  useEffect(() => {
    if (!test || result) return;
    if (secondsLeft <= 0) { finish(); return; }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [test, result, secondsLeft, finish]);

  const speak = (text) => {
    try {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.92;
      speechSynthesis.speak(utterance);
    } catch { /* trình duyệt không hỗ trợ đọc */ }
  };

  const startTest = (item) => {
    setTest(item);
    setIndex(0);
    setAnswers({});
    setResult(null);
    setSecondsLeft(item.minutes * 60);
  };

  const shell = (children) => (
    <div className="fixed inset-0 z-[130] bg-slate-950/75 backdrop-blur-sm p-4 flex items-start md:items-center justify-center overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="mock-title">
      <section className="w-full max-w-2xl my-4 bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
        {children}
      </section>
    </div>
  );

  // ---------- 1. Chọn đề ----------
  if (!test) {
    return shell(<>
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-200 border-3 border-slate-900 flex items-center justify-center shrink-0"><GraduationCap className="text-emerald-700" /></div>
          <div>
            <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Đo trình độ thật</p>
            <h2 id="mock-title" className="text-2xl font-black dark:text-white">Thi thử</h2>
          </div>
        </div>
        <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 rounded-xl border-3 border-slate-800 dark:border-slate-600 dark:text-white flex items-center justify-center cursor-pointer"><X size={18} /></button>
      </header>

      <p className="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
        Mỗi đề gồm 20 câu (Nghe · Ngữ pháp · Từ vựng · Đọc) và có đếm giờ như thi thật. Kết quả quy đổi sang thang điểm tương ứng, kèm phân tích từng phần.
      </p>

      <div className="grid gap-3 mt-6">
        {MOCK_TESTS.map((item) => {
          const last = previousAttempt(item.id);
          return (
            <button key={item.id} onClick={() => startTest(item)} className="text-left p-5 rounded-2xl border-3 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 shadow-[3px_3px_0_0_#1e293b] transition-all cursor-pointer">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-black text-lg dark:text-white">{item.name}</p>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">{item.subtitle}</p>
                </div>
                <span className={`${item.color} text-slate-900 text-xs font-black px-3 py-1.5 rounded-xl border-2 border-slate-900 shrink-0`}>BẮT ĐẦU</span>
              </div>
              {last && (
                <p className="mt-2.5 text-[11px] font-black text-slate-400">
                  Lần trước: {last.percent}% · {last.scale.type === 'ielts' ? `Band ${last.scale.band}` : `${last.scale.score}/10`} ({new Intl.DateTimeFormat('vi-VN').format(new Date(last.completedAt))})
                </p>
              )}
            </button>
          );
        })}
      </div>
    </>);
  }

  // ---------- 3. Kết quả ----------
  if (result) {
    const delta = prevAttempt ? result.percent - prevAttempt.percent : null;
    const weak = weakestSection(result.sections);
    return shell(<>
      <header className="flex items-start justify-between gap-4">
        <h2 id="mock-title" className="text-2xl font-black dark:text-white">Kết quả {result.testName}</h2>
        <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 rounded-xl border-3 border-slate-800 dark:border-slate-600 dark:text-white flex items-center justify-center cursor-pointer"><X size={18} /></button>
      </header>

      <div className="mt-6 p-6 rounded-3xl border-4 border-slate-900 dark:border-slate-600 bg-gradient-to-br from-yellow-100 to-emerald-100 dark:from-slate-800 dark:to-slate-800 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">{result.scale.type === 'ielts' ? 'IELTS BAND ƯỚC TÍNH' : 'ĐIỂM VSTEP ƯỚC TÍNH'}</p>
        <p className="text-6xl font-black text-slate-900 dark:text-white mt-1">{result.scale.type === 'ielts' ? result.scale.band.toFixed(1) : result.scale.score.toFixed(1)}</p>
        <p className="font-black text-emerald-700 dark:text-emerald-400 mt-1">Tương đương {result.scale.level}</p>
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mt-3">
          Đúng {result.correct}/{result.total} câu ({result.percent}%)
          {delta !== null && <span className={`ml-2 font-black ${delta >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>{delta >= 0 ? `▲ +${delta}%` : `▼ ${delta}%`} so với lần trước</span>}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        {Object.entries(result.sections).map(([section, stat]) => {
          const percent = Math.round((stat.correct / stat.total) * 100);
          return (
            <div key={section} className="p-3.5 rounded-2xl border-3 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <div className="flex justify-between text-xs font-black dark:text-white"><span>{SECTION_LABELS[section] || section}</span><span>{stat.correct}/{stat.total}</span></div>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 mt-2 overflow-hidden">
                <div className={`h-full ${percent >= 70 ? 'bg-emerald-400' : percent >= 40 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {weak && (
        <p className="mt-5 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border-3 border-blue-400 text-sm font-bold text-blue-800 dark:text-blue-200">
          💡 Phần cần luyện thêm: <strong>{SECTION_LABELS[weak] || weak}</strong>. {result.wrong.length > 0 && `${result.wrong.length} câu sai đã được lưu vào "Học từ lỗi sai" để ôn lại sau 3 ngày.`}
        </p>
      )}

      {result.wrong.length > 0 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-black text-slate-500 dark:text-slate-400">Xem lại {result.wrong.length} câu sai</summary>
          <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {result.wrong.map((item) => (
              <div key={item.id} className="p-3.5 rounded-2xl border-2 border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/20">
                <p className="font-bold text-sm dark:text-white">{item.prompt}</p>
                {item.audioText && <p className="text-xs font-bold text-slate-500 italic mt-1">🎧 “{item.audioText}”</p>}
                <p className="text-xs font-black text-emerald-700 dark:text-emerald-400 mt-1.5">✓ {item.options[item.answer]}</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">{item.explanation}</p>
              </div>
            ))}
          </div>
        </details>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={() => setTest(null)} className="flex-1 py-3 rounded-2xl border-3 border-slate-800 dark:border-slate-600 dark:text-white font-black cursor-pointer">ĐỀ KHÁC</button>
        <button onClick={onClose} className="flex-1 py-3 rounded-2xl bg-yellow-300 text-slate-900 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] cursor-pointer">XONG</button>
      </div>
    </>);
  }

  // ---------- 2. Làm bài ----------
  const progress = ((index + 1) / test.questions.length) * 100;
  const lowTime = secondsLeft <= 60;
  return shell(<>
    <header className="flex items-center justify-between gap-4">
      <h2 id="mock-title" className="text-lg font-black dark:text-white">{test.name}</h2>
      <div className="flex items-center gap-3">
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-3 font-black text-sm ${lowTime ? 'border-rose-500 bg-rose-100 text-rose-700 animate-pulse' : 'border-slate-800 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-white'}`}>
          <Clock size={15} /> {fmtTime(secondsLeft)}
        </span>
        <button onClick={onClose} aria-label="Thoát" className="w-10 h-10 rounded-xl border-3 border-slate-800 dark:border-slate-600 dark:text-white flex items-center justify-center cursor-pointer"><X size={18} /></button>
      </div>
    </header>

    <div className="mt-4 flex items-center justify-between text-xs font-black text-slate-500"><span>Câu {index + 1}/{test.questions.length}</span><span>{SECTION_LABELS[question.section]}</span></div>
    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-700 dark:border-slate-600 mt-2 overflow-hidden"><div className="h-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} /></div>

    {question.audioText && (<>
      <button onClick={() => speak(question.audioText)} className="mt-6 w-full py-4 rounded-2xl bg-indigo-100 dark:bg-indigo-950/40 border-3 border-indigo-500 text-indigo-800 dark:text-indigo-200 font-black flex items-center justify-center gap-2 cursor-pointer">
        <Volume2 size={20} /> NGHE ĐOẠN HỘI THOẠI (bấm lại để nghe thêm)
      </button>
      {/* (2.4) Phần "Nghe" của đề thi thử chạy bằng giọng tổng hợp. Đề thi là
          chỗ dễ khiến người học tưởng mình đã luyện nghe như thi thật nhất,
          nên nhãn ở đây quan trọng hơn mọi chỗ khác. */}
      <div className="mt-2 text-center"><MachineVoiceTag /></div>
    </>)}

    <h3 className="text-xl md:text-2xl font-black mt-6 leading-snug dark:text-white">{question.prompt}</h3>

    <div className="grid gap-3 mt-5">
      {question.options.map((option, optionIndex) => (
        <button
          key={option}
          onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
          className={`text-left p-4 rounded-2xl border-3 font-bold transition-all cursor-pointer ${answers[question.id] === optionIndex ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-600 shadow-[3px_3px_0_0_#059669] dark:text-white' : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 dark:text-slate-200 hover:border-emerald-400'}`}
        >
          <span className="inline-flex w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border-2 border-slate-400 items-center justify-center mr-2 text-xs font-black">{String.fromCharCode(65 + optionIndex)}</span>
          {option}
        </button>
      ))}
    </div>

    <footer className="flex justify-between gap-3 mt-8">
      <button disabled={index === 0} onClick={() => setIndex((v) => v - 1)} className="px-4 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 dark:text-white font-black disabled:opacity-30 flex items-center gap-2 cursor-pointer"><ArrowLeft size={17} /> Trước</button>
      <button
        disabled={!answered}
        onClick={() => { if (index === test.questions.length - 1) finish(); else setIndex((v) => v + 1); }}
        className="px-5 py-3 rounded-xl bg-yellow-300 text-slate-900 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] disabled:opacity-40 flex items-center gap-2 cursor-pointer"
      >
        {index === test.questions.length - 1 ? <>Nộp bài <CheckCircle2 size={17} /></> : <>Tiếp theo <ArrowRight size={17} /></>}
      </button>
    </footer>
  </>);
}
