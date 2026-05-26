// File: src/components/oxford/TypingTab.jsx
import React, { useState, useEffect } from 'react';
import { Keyboard, RotateCcw, Sparkles } from 'lucide-react';

const TypingTab = ({ unitData }) => {
    if (!unitData.typingGame) return <div className="p-10 text-center font-bold">Chưa có dữ liệu gõ từ.</div>;

    const [qIdx, setQIdx] = useState(0);
    const [inputText, setInputText] = useState("");
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        setQIdx(0);
        setInputText("");
        setStatus("idle");
    }, [unitData?.id]);

    const curr = unitData.typingGame[qIdx];

    const handleTyping = (e) => {
        const val = e.target.value;
        setInputText(val);
        // Auto check
        if (val.toLowerCase().trim() === curr.a.toLowerCase()) {
            setStatus("correct");
            // Wait 1 second then advance automatically
            setTimeout(() => {
                if (qIdx < unitData.typingGame.length - 1) {
                    setQIdx(prev => prev + 1);
                    setInputText("");
                    setStatus("idle");
                }
            }, 1000);
        }
    };

    const handleKeyDown = (e) => {
        // Press Enter only when stuck -> Show wrong status, reveal answer, wait 2.5s and skip
        if (e.key === 'Enter' && status === 'idle') {
            if (inputText.toLowerCase().trim() !== curr.a.toLowerCase()) {
                setStatus("wrong");
                setTimeout(() => {
                    if (qIdx < unitData.typingGame.length - 1) {
                        setQIdx(prev => prev + 1);
                        setInputText("");
                        setStatus("idle");
                    }
                }, 2500);
            }
        }
    };

    const resetGame = () => {
        setQIdx(0); 
        setInputText(""); 
        setStatus("idle");
    };

    if (!curr) return <div className="p-10 text-center font-bold">Không tìm thấy câu hỏi!</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 border-4 border-slate-800 shadow-[8px_8px_0_0_#1e293b] animate-in zoom-in-95 mt-10 mb-10">
             <div className="flex justify-between items-center mb-6 border-b-4 border-dashed border-slate-200 pb-4">
                <span className="font-black text-2xl flex items-center gap-2"><Keyboard className="text-blue-500"/> Gõ Từ Tự Động</span>
                <div className="flex items-center gap-4">
                    <span className="bg-slate-800 text-white font-bold px-4 py-1 rounded-xl">Câu {qIdx+1}/{unitData.typingGame.length}</span>
                    <button 
                      onClick={resetGame} 
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 border-2 border-slate-800 transition cursor-pointer"
                    >
                        <RotateCcw size={18}/>
                    </button>
                </div>
            </div>

            <div className="bg-blue-50 border-4 border-blue-200 p-8 rounded-2xl mb-6 text-center">
                <p className="text-2xl font-black text-slate-800 leading-relaxed mb-4">{curr.q}</p>
                <p className="font-bold text-blue-500 tracking-widest text-xl">Gợi ý: {curr.hint}</p>
            </div>

            <p className="text-center text-sm font-bold text-slate-400 mb-2">Gõ đúng hệ thống tự qua câu. Ấn Enter nếu chịu thua để xem đáp án.</p>

            <input 
                type="text" 
                value={inputText} 
                onChange={handleTyping} 
                onKeyDown={handleKeyDown}
                disabled={status !== 'idle'}
                placeholder="Gõ từ tiếng Anh vào đây..." 
                autoFocus
                className="w-full text-center px-6 py-4 bg-slate-50 border-4 border-slate-800 rounded-2xl mb-6 text-2xl font-black focus:border-blue-500 outline-none transition-colors disabled:opacity-50" 
            />

            {status === 'wrong' && <p className="text-rose-600 font-black mt-2 mb-6 text-xl text-center animate-shake">Sai rồi. Đáp án là: <span className="underline">{curr.a}</span></p>}
            {status === 'correct' && <p className="text-emerald-600 font-black mt-2 mb-6 text-xl text-center flex items-center justify-center gap-2">Chính xác tuyệt đối! <Sparkles size={18} className="text-yellow-500 fill-yellow-500 animate-pulse" /></p>}
            
            {status !== 'idle' && qIdx === unitData.typingGame.length - 1 && <p className="text-slate-800 font-black mt-6 text-xl text-center bg-yellow-300 py-2 rounded-xl border-2 border-slate-800">Bạn đã hoàn thành trò chơi!</p>}
        </div>
    );
};

export default TypingTab;
