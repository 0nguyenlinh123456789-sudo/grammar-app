// File: src/components/oxford/QuizTab.jsx
import React, { useState, useEffect } from 'react';
import { PenTool, RotateCcw, Sparkles } from 'lucide-react';

const QuizTab = ({ unitData }) => {
    const [qIdx, setQIdx] = useState(0);
    const [sel, setSel] = useState(null);
    const [status, setStatus] = useState('idle');
    const [score, setScore] = useState(0);

    useEffect(() => {
        setQIdx(0);
        setSel(null);
        setStatus('idle');
        setScore(0);
    }, [unitData?.id]);

    const curr = unitData.quiz[qIdx];

    const resetQuiz = () => {
        setQIdx(0); 
        setSel(null); 
        setStatus('idle'); 
        setScore(0);
    };

    const handleSelect = (option) => {
        if (status !== 'idle') return; // Prevent double clicks
        setSel(option);
        
        if (option === curr.a) {
            setStatus('true');
            setScore(s => s + 1);
        } else {
            setStatus('false');
        }

        // Wait 1.5s to see results and automatically skip to next question
        setTimeout(() => {
            if (qIdx < unitData.quiz.length - 1) {
                setStatus('idle');
                setSel(null);
                setQIdx(prev => prev + 1);
            }
        }, 1500);
    };

    if (!curr) return <div className="p-10 text-center font-bold">Chưa có bài kiểm tra trắc nghiệm.</div>;

    return (
        <div className="bg-white rounded-3xl border-4 border-slate-800 p-8 shadow-[8px_8px_0_0_#1e293b] animate-in zoom-in-95 mb-10 mt-10">
            <div className="flex justify-between items-center mb-8 border-b-4 border-dashed border-slate-200 pb-4">
                <span className="font-black text-2xl flex items-center gap-2"><PenTool className="text-yellow-500"/> Trắc nghiệm Nhanh</span>
                <div className="flex items-center gap-4">
                    <span className="bg-slate-800 text-white font-bold px-4 py-1 rounded-xl">Câu {qIdx+1}/{unitData.quiz.length}</span>
                    <button 
                      onClick={resetQuiz} 
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 border-2 border-slate-800 transition cursor-pointer" 
                      title="Làm lại từ đầu"
                    >
                        <RotateCcw size={18}/>
                    </button>
                </div>
            </div>
            
            <h3 className="text-2xl font-black mb-8 leading-relaxed text-slate-800">{curr.q}</h3>
            
            <div className="grid grid-cols-1 gap-4 mb-8">
                {curr.options.map((o, i) => {
                    let btnClass = "p-5 rounded-2xl border-4 text-xl font-bold text-left transition-all ";
                    if (status === 'idle') {
                        btnClass += "border-slate-800 bg-white shadow-[4px_4px_0_0_#1e293b] hover:bg-slate-50 hover:-translate-y-1 cursor-pointer";
                    } else {
                        if (o === curr.a) {
                            btnClass += "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-none"; // Highlight correct
                        } else if (sel === o) {
                            btnClass += "border-rose-500 bg-rose-50 text-rose-700 shadow-none"; // Red if incorrect
                        } else {
                            btnClass += "border-slate-200 bg-slate-50 text-slate-400 opacity-50 shadow-none"; // Fade others
                        }
                    }

                    return (
                        <button key={i} disabled={status !== 'idle'} onClick={() => handleSelect(o)} className={btnClass}>
                            {o}
                        </button>
                    );
                })}
            </div>

            {status === 'false' && <p className="text-rose-600 font-black mt-2 mb-6 text-xl text-center animate-shake">Chưa chính xác!</p>}
            {status === 'true' && <p className="text-emerald-600 font-black mt-2 mb-6 text-xl text-center flex items-center justify-center gap-2">Chính xác! <Sparkles size={18} className="text-yellow-500 fill-yellow-500 animate-pulse" /></p>}
            
            {/* Quiz Completion Overlay */}
            {status !== 'idle' && qIdx === unitData.quiz.length - 1 && (
                <div className="mt-8 p-6 bg-slate-50 border-4 border-slate-800 border-dashed rounded-3xl text-center animate-in zoom-in">
                    <h4 className="text-3xl font-black mb-2">Hoàn thành bài Test!</h4>
                    <p className="text-xl font-bold text-slate-600 mb-6">Điểm của bạn: {score}/{unitData.quiz.length}</p>
                    <button onClick={resetQuiz} className="px-8 py-3 bg-slate-800 text-white font-black text-lg rounded-xl hover:bg-slate-700 transition cursor-pointer">Làm Lại Từ Đầu</button>
                </div>
            )}
        </div>
    );
};

export default QuizTab;
