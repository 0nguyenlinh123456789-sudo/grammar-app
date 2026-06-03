// File: src/components/grammar/SketchnoteTheory.jsx
import React, { useState } from 'react';
import { BookMarked, ChevronDown, ArrowRight, Sparkles, Key, AlertTriangle } from 'lucide-react';

const SketchnoteTheory = ({ section, idx }) => {
  const [open, setOpen] = useState(idx === 0);
  
  return (
    <div 
      onClick={() => setOpen(!open)} 
      className="relative bg-white dark:bg-slate-800 border-[4px] border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#1e293b] dark:shadow-[6px_6px_0px_0px_#020617] mb-12 cursor-pointer hover:-translate-y-1 transition-transform group"
    >
      {/* Fancy Title Badge */}
      <div className="absolute -top-6 left-4 md:left-8 bg-yellow-300 dark:bg-yellow-400 border-[4px] border-slate-800 dark:border-slate-700 px-5 py-2 -rotate-2 font-black shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617] text-lg text-slate-900 group-hover:rotate-0 transition-transform flex items-center z-10">
        <BookMarked className="w-5 h-5 mr-2" />
        {section.h}
      </div>

      <div className="flex justify-between items-center mt-2 border-b-2 border-slate-200 dark:border-slate-700 border-dashed pb-3 mb-4">
        <span className="font-bold text-slate-400 dark:text-slate-500 text-xs md:text-sm uppercase tracking-widest">
          {open ? 'Chạm để thu gọn' : 'Chạm để mở rộng'}
        </span>
        <div className={`p-2 rounded-xl border-[3px] border-slate-800 dark:border-slate-700 transition-all ${open ? 'bg-rose-300 dark:bg-rose-400 rotate-180 translate-y-1 shadow-none text-slate-900' : 'bg-cyan-300 dark:bg-cyan-400 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_#020617] text-slate-900'}`}>
          <ChevronDown />
        </div>
      </div>
      
      {open && (
        <div className="text-slate-800 dark:text-slate-200 font-bold leading-relaxed whitespace-pre-wrap text-[16px] md:text-[18px] animate-in slide-in-from-top-2 fade-in duration-300 pt-2 pb-2">
          {(section.c || "").split('\n').map((line, i) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return <div key={i} className="h-3"></div>;
            
            // Handle arrow bullets
            if (trimmedLine.startsWith('→') || trimmedLine.startsWith('👉')) {
              return (
                <div key={i} className="flex items-start gap-3 mb-3 ml-4 bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border-2 border-slate-100 dark:border-slate-700">
                  <ArrowRight size={20} className="text-rose-500 dark:text-rose-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 italic">{trimmedLine.replace(/^[→👉]\s*/u, '')}</span>
                </div>
              );
            }
            
            // Handle pins/keys
            if (trimmedLine.startsWith('📌')) {
              return (
                <div key={i} className="flex items-start gap-3 mb-3 mt-4 text-slate-900 dark:text-white text-lg">
                  <div className="bg-amber-100 dark:bg-amber-900/40 p-1.5 rounded-lg border-2 border-amber-300 dark:border-amber-700 flex-shrink-0">
                    <Key size={18} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="mt-0.5">{trimmedLine.replace(/^📌\s*/, '')}</span>
                </div>
              );
            }

            // Handle alerts/warnings
            if (trimmedLine.startsWith('⚠️')) {
              return (
                <div key={i} className="flex items-start gap-3 mb-4 mt-2 bg-rose-50 dark:bg-rose-950/30 p-4 rounded-2xl border-[3px] border-rose-300 dark:border-rose-800">
                  <AlertTriangle size={24} className="text-rose-600 dark:text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-rose-800 dark:text-rose-300">{trimmedLine.replace(/^⚠️\s*/, '')}</span>
                </div>
              );
            }
            
            // Handle traditional block highlights
            if (trimmedLine.match(/^[✅❌❓]/)) {
              return (
                <div key={i} className="bg-indigo-50 dark:bg-indigo-950/30 border-[3px] border-indigo-300 dark:border-indigo-800 border-dashed px-5 py-4 rounded-2xl my-4 text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
                  <span className="text-indigo-900 dark:text-indigo-200 mt-0.5">{trimmedLine}</span>
                </div>
              );
            }
            
            return <p key={i} className="mb-3 leading-loose">{trimmedLine}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default SketchnoteTheory;
