// File: src/components/grammar/QuizEngine.jsx
import React, { useState, useEffect } from 'react';
import { PenTool, ChevronRight, Sparkles } from 'lucide-react';
import Btn3D from '../common/Btn3D';

const QuizEngine = ({ exercises, setGlobalProgress, onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState(0);
  
  const curr = exercises && exercises.length > 0 ? exercises[qIdx] : null;

  useEffect(() => {
    if (qIdx === 30 && onComplete) {
      onComplete();
    }
  }, [qIdx, onComplete]);

  const check = () => { 
    if (sel === curr.a) { 
      setStatus('true'); 
      setScore(s => s + 1); 
      setGlobalProgress(p => p + 1); 
    } else {
      setStatus('false'); 
    }
  };

  const next = () => { 
    setStatus('idle'); 
    setSel(null); 
    setQIdx(prev => prev + 1); 
  };

  if (!curr) return <div className="p-10 font-bold text-slate-500">Đang tải câu hỏi...</div>;
  if (qIdx >= 30) {
    return (
      <div className="text-center font-black text-3xl mt-10">
        Điểm của bạn: {score}/30 <br/>
        <Btn3D onClick={() => { setQIdx(0); setScore(0); }} className="mt-6">Làm Lại</Btn3D>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] border-[4px] border-slate-800 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b]">
       <div className="flex justify-between items-center font-black mb-8 text-xl border-b-4 border-slate-100 pb-4 border-dashed">
          <span className="flex items-center gap-2"><PenTool className="text-emerald-500"/> Làm Test</span>
          <span className="bg-yellow-300 border-2 border-slate-800 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b]">{qIdx+1}/30</span>
       </div>
       <p className="font-black text-3xl mb-8 leading-relaxed">{curr.q}</p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {curr.opts.map((o, i) => (
             <button 
               key={i} 
               disabled={status !== 'idle'} 
               onClick={() => setSel(o)} 
               className={`p-5 rounded-2xl border-[4px] text-2xl font-bold text-left transition-all ${sel === o ? 'border-indigo-600 bg-indigo-100 shadow-[3px_3px_0px_0px_#4f46e5] translate-y-1 border-b-[4px]' : 'border-slate-800 bg-white hover:bg-slate-50 shadow-[4px_4px_0px_0px_#1e293b] border-b-[8px]'}`}
             >
                {o}
             </button>
          ))}
       </div>
       <div className="flex gap-4">
         {status === 'idle' ? <Btn3D onClick={check} disabled={!sel} color="bg-slate-800 text-white w-full text-2xl">Kiểm Tra</Btn3D> 
                            : <Btn3D onClick={next} color="bg-emerald-400 text-slate-900 w-full text-2xl flex items-center justify-center gap-2">Tiếp Theo <ChevronRight size={24} /></Btn3D>}
       </div>
       {status === 'false' && <p className="text-rose-600 font-black mt-6 text-2xl animate-shake">Sai rồi. Đáp án đúng: <span className="underline">{curr.a}</span></p>}
       {status === 'true' && <p className="text-emerald-600 font-black mt-6 text-2xl flex items-center gap-2">Chính xác! <Sparkles size={24} className="text-yellow-500 fill-yellow-500 animate-pulse" /></p>}
    </div>
  );
};

export default QuizEngine;
