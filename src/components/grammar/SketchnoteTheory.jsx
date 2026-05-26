// File: src/components/grammar/SketchnoteTheory.jsx
import React, { useState } from 'react';
import { BookMarked, ChevronDown, ArrowRight } from 'lucide-react';

const SketchnoteTheory = ({ section, idx }) => {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div onClick={() => setOpen(!open)} className="relative bg-white border-[4px] border-slate-800 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#1e293b] mb-10 cursor-pointer hover:-translate-y-1 transition-transform">
      <div className="absolute -top-5 left-6 bg-yellow-300 border-[4px] border-slate-800 px-4 py-1.5 -rotate-2 font-black shadow-[4px_4px_0px_0px_#1e293b] text-lg">
        <BookMarked className="inline w-5 h-5 mr-2"/>{section.h}
      </div>
      <div className="flex justify-between items-center mt-4 border-b-2 border-slate-200 border-dashed pb-3 mb-4">
        <span className="font-bold text-slate-400 text-sm uppercase tracking-widest">{open ? 'Chạm để thu gọn' : 'Chạm để mở rộng'}</span>
        <div className={`p-2 rounded-xl border-[4px] border-slate-800 transition-all ${open ? 'bg-rose-300 rotate-180 translate-y-1 shadow-none' : 'bg-cyan-300 shadow-[2px_2px_0px_0px_#1e293b]'}`}>
          <ChevronDown />
        </div>
      </div>
      {open && (
        <div className="text-slate-800 font-bold leading-relaxed whitespace-pre-wrap text-[16px] md:text-[18px] animate-in slide-in-from-top-4 fade-in duration-300">
          {(section.c || "").split('\n').map((line, i) => {
            if (line.startsWith('👉')) return <div key={i} className="flex items-start gap-2 mb-2"><ArrowRight size={18} className="text-rose-500 mt-1 flex-shrink-0" /> <span>{line.substring(2)}</span></div>;
            if (line.startsWith('✅') || line.startsWith('❌') || line.startsWith('❓') || line.startsWith('⚠️')) return <div key={i} className="bg-indigo-50 border-[4px] border-slate-800 border-dashed px-4 py-3 rounded-2xl my-3">{line}</div>;
            if (line.trim() === '') return <div key={i} className="h-2"></div>;
            return <p key={i} className="mb-2">{line}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default SketchnoteTheory;
