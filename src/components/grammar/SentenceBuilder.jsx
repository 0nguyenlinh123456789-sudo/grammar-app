// File: src/components/grammar/SentenceBuilder.jsx
import React, { useState, useEffect } from 'react';
import { Target, ChevronRight } from 'lucide-react';
import Btn3D from '../common/Btn3D';

const SentenceBuilder = ({ sentences: rawSentences, setGlobalProgress, onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [avail, setAvail] = useState([]);
  const [sel, setSel] = useState([]);
  const [correct, setCorrect] = useState(null);

  // Normalize sentences to support both formats:
  // Format A: { id, text, trans } (b1_01 to b1_25)
  // Format B: { en, vi, words } (b1_26 to b1_28)
  const sentences = (rawSentences || []).map((s, idx) => {
    if (s.text && s.trans) return s; // Already Format A
    if (s.en) {
      return {
        id: s.id || idx + 1,
        text: s.en.replace(/[?.!,]$/g, '').trim(), // Remove trailing punctuation for word matching
        trans: s.vi || '',
      };
    }
    return s; // fallback
  });

  const sentencesLen = sentences.length;
  const curr = sentencesLen > 0 ? sentences[qIdx] : null;

  useEffect(() => {
    if (sentencesLen > 0 && qIdx === sentencesLen && onComplete) {
      onComplete();
    }
  }, [qIdx, onComplete, sentencesLen]);

  useEffect(() => {
    if (curr && curr.text) { 
      setAvail(curr.text.split(' ').sort(() => Math.random() - 0.5).map((w, i) => ({ id: i, w }))); 
      setSel([]); 
      setCorrect(null); 
    }
  }, [qIdx, curr]);

  const toggle = (w, isSel) => {
    if (isSel) { 
      setSel(sel.filter(x => x.id !== w.id)); 
      setAvail([...avail, w]); 
    } else { 
      setAvail(avail.filter(x => x.id !== w.id)); 
      setSel([...sel, w]); 
    }
  };

  const check = () => {
    if (sel.map(x => x.w).join(' ') === curr.text) { 
      setCorrect(true); 
      setGlobalProgress(p => p + 2); 
      if ('speechSynthesis' in window) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(curr.text)); 
      }
    } else {
      setCorrect(false);
    }
  };

  if (qIdx >= sentencesLen) {
    return (
      <div className="text-center font-black text-3xl mt-10">
        Hoàn thành vòng chơi! <br />
        <Btn3D onClick={() => setQIdx(0)} className="mt-6">Chơi Lại</Btn3D>
      </div>
    );
  }

  if (!curr) return <div className="p-10 font-bold text-slate-500">Đang tải thẻ học...</div>;

  return (
    <div className="bg-white rounded-[3rem] border-[4px] border-slate-800 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b]">
      <div className="flex justify-between items-center font-black mb-6 text-xl border-b-4 border-slate-100 pb-4 border-dashed">
         <span className="flex items-center gap-2"><Target className="text-rose-500"/> Xếp Câu Phản Xạ</span>
         <span className="bg-white border-2 border-slate-800 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b]">{qIdx+1}/{sentencesLen}</span>
      </div>
      <div className="bg-cyan-100 p-8 rounded-3xl border-[4px] border-slate-800 mb-8 font-black text-2xl md:text-3xl text-center shadow-[4px_4px_0px_0px_#1e293b]">"{curr.trans}"</div>
      
      <div className="min-h-[120px] bg-slate-50 border-[4px] border-dashed border-slate-300 rounded-3xl p-6 flex flex-wrap gap-3 mb-8">
        {sel.map(w => <Btn3D key={w.id} onClick={()=>toggle(w,true)} color="bg-white" className="text-xl md:text-2xl px-5 py-3 shadow-[2px_2px_0px_0px_#1e293b]">{w.w}</Btn3D>)}
      </div>
      
      <div className="bg-indigo-50 border-[4px] border-slate-800 rounded-3xl p-8 flex flex-wrap justify-center gap-4 mb-10 shadow-[4px_4px_0px_0px_#1e293b]">
        {avail.map(w => <Btn3D key={w.id} onClick={()=>toggle(w,false)} color="bg-indigo-200" className="text-xl md:text-2xl px-5 py-3 shadow-[2px_2px_0px_0px_#1e293b]">{w.w}</Btn3D>)}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
         <Btn3D onClick={check} disabled={sel.length===0} color="bg-slate-800 text-white w-full text-2xl">Kiểm Tra</Btn3D>
         {correct && <Btn3D onClick={()=>setQIdx(prev=>prev+1)} color="bg-emerald-400 text-slate-900 w-full text-2xl flex items-center justify-center gap-2">Tiếp Tục <ChevronRight size={24} /></Btn3D>}
      </div>
      {correct === false && <p className="text-rose-600 font-black mt-6 text-center text-2xl animate-bounce">Chưa đúng, hãy click vào chữ để gỡ xuống!</p>}
    </div>
  );
};

export default SentenceBuilder;
