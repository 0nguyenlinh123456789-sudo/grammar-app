// File: src/components/unitData.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, Gamepad2, PenTool, Edit3, Mic, Key, Volume2, Shuffle, Layers, Keyboard, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function OxfordVocab({ unitData }) {
    const [activeTab, setActiveTab] = useState("theory");

    useEffect(() => {
        setActiveTab("theory");
    }, [unitData]);

    if (!unitData) {
        return <div className="flex items-center justify-center h-full text-slate-400 font-bold text-xl">Vui lòng chọn Unit từ Menu bên trái.</div>;
    }

    // --- TAB 1: LÝ THUYẾT ---
    const TheoryTab = () => (
        <div className="space-y-8 animate-in fade-in pb-10">
            <div className="bg-white rounded-3xl p-8 border-4 border-slate-800 shadow-[8px_8px_0_0_#1e293b]">
                <h2 className="text-3xl font-black text-slate-800 mb-2">{unitData.title}</h2>
                <p className="text-slate-500 font-bold text-lg border-b-4 border-dashed border-slate-200 pb-6">{unitData.description}</p>
                
                {unitData.theory.map((section, idx) => (
                    <div key={idx} className="mt-8">
                        <h3 className="text-xl font-black text-indigo-600 bg-indigo-50 inline-block px-4 py-2 rounded-xl border-2 border-slate-800 mb-6 shadow-[2px_2px_0_0_#1e293b]">{section.heading}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items.map((item, i) => (
                                <div key={i} className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 hover:border-slate-800 transition-colors group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-black text-slate-800">{item.word}</span>
                                            {item.type && <span className="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-md">{item.type}</span>}
                                        </div>
                                        <button onClick={() => {
                                            let u = new SpeechSynthesisUtterance(item.word);
                                            u.lang = 'en-US'; window.speechSynthesis.speak(u);
                                        }} className="text-indigo-400 hover:text-indigo-600 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <Volume2 size={24} />
                                        </button>
                                    </div>
                                    {item.phonetic && <p className="text-indigo-500 font-medium mb-1">{item.phonetic}</p>}
                                    <p className="font-bold text-slate-600 mb-2">{item.vi}</p>
                                    <p className="text-sm text-slate-500 italic bg-white p-3 rounded-xl border border-slate-200 border-dashed">Ex: {item.example}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // --- TAB 2: FLASHCARD (GÕ SỐ ĐỂ NHẢY THẺ) ---
    const FlashcardTab = () => {
        const allWords = unitData.theory.flatMap(section => section.items);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [isFlipped, setIsFlipped] = useState(false);
        const [jumpVal, setJumpVal] = useState(1);

        useEffect(() => {
            setJumpVal(currentIndex + 1);
        }, [currentIndex]);

        const nextCard = () => {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => (prev + 1) % allWords.length), 150);
        };

        const prevCard = () => {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => (prev - 1 + allWords.length) % allWords.length), 150);
        };

        const handleJump = (e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val > 0 && val <= allWords.length) {
                setIsFlipped(false);
                setTimeout(() => setCurrentIndex(val - 1), 150);
            } else {
                setJumpVal(currentIndex + 1);
            }
        };

        if(allWords.length === 0) return null;
        const currentCard = allWords[currentIndex];

        return (
            <div className="flex flex-col items-center py-6 animate-in fade-in h-full">
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-2xl shadow-sm mb-6 w-full max-w-lg">
                    <h3 className="text-xl font-bold text-emerald-900">Thẻ Ghi Nhớ Tự Do</h3>
                    <p className="text-emerald-700 mt-2">Nhấp thẻ để lật. Gõ số vào ô vàng để nhảy tới thẻ bạn muốn tìm.</p>
                </div>

                <div className="flex items-center gap-6 mb-6 w-full max-w-lg justify-center">
                    <button onClick={prevCard} className="p-3 bg-white border-4 border-slate-800 rounded-full shadow-[4px_4px_0_0_#1e293b] active:translate-y-1 active:shadow-none hover:bg-slate-50 transition-all text-slate-800">
                        <ChevronLeft size={28} />
                    </button>
                    
                    {/* Ô GÕ SỐ TÌM THẺ */}
                    <div className="flex items-center gap-2 font-black text-xl text-slate-800 bg-yellow-300 px-4 py-2 rounded-2xl border-4 border-slate-800 shadow-[4px_4px_0_0_#1e293b]">
                        Thẻ
                        <input 
                            type="text" 
                            value={jumpVal}
                            onChange={(e) => setJumpVal(e.target.value)}
                            onBlur={handleJump}
                            onKeyDown={(e) => e.key === 'Enter' && handleJump(e)}
                            className="w-10 text-center bg-transparent border-b-2 border-slate-800 outline-none focus:bg-yellow-100 rounded"
                        />
                        / {allWords.length}
                    </div>

                    <button onClick={nextCard} className="p-3 bg-white border-4 border-slate-800 rounded-full shadow-[4px_4px_0_0_#1e293b] active:translate-y-1 active:shadow-none hover:bg-slate-50 transition-all text-slate-800">
                        <ChevronRight size={28} />
                    </button>
                </div>

                <div className="relative w-80 sm:w-96 h-80 cursor-pointer" style={{perspective: '1000px'}} onClick={() => setIsFlipped(!isFlipped)}>
                    <div className="w-full h-full transition-transform duration-500" style={{transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : ''}}>
                        <div className="absolute w-full h-full bg-white rounded-3xl border-4 border-slate-800 flex flex-col items-center justify-center p-6 shadow-[8px_8px_0_0_#1e293b]" style={{backfaceVisibility: 'hidden'}}>
                            <h2 className="text-5xl font-black text-slate-800 text-center">{currentCard.word}</h2>
                            <p className="text-lg text-slate-400 mt-6 font-bold flex items-center gap-2"><RotateCcw size={16}/> Chạm để lật</p>
                        </div>
                        <div className="absolute w-full h-full bg-slate-800 text-white rounded-3xl p-8 flex flex-col items-center justify-center border-4 border-slate-900 shadow-[8px_8px_0_0_#1e293b]" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                            <h2 className="text-3xl font-bold text-yellow-400 mb-2 text-center">{currentCard.vi}</h2>
                            <p className="text-xl text-slate-300 mb-6">{currentCard.phonetic}</p>
                            <p className="text-center italic opacity-80 text-sm">{currentCard.example}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- TAB 3: GAME GHÉP TỪ ---
    const DragDropTab = () => {
        if (!unitData.dragDrop) return <div className="p-10 text-center font-bold">Chưa có dữ liệu ghép từ.</div>;
        
        const [words, setWords] = useState(unitData.dragDrop.items.map(i => ({...i, placedBucket: null})));
        
        const handleDrop = (e, targetBucket) => {
            e.preventDefault();
            const wordId = e.dataTransfer.getData('text/plain');
            setWords(prev => prev.map(w => w.id === wordId ? { ...w, placedBucket: targetBucket } : w));
        };

        const resetGame = () => {
            setWords(unitData.dragDrop.items.map(i => ({...i, placedBucket: null})));
        };

        const getScore = () => words.filter(w => w.placedBucket === w.target).length;
        const total = words.length;

        return (
            <div className="bg-white rounded-3xl p-8 border-4 border-slate-800 shadow-[8px_8px_0_0_#1e293b] animate-in fade-in mb-10">
                <div className="flex justify-between items-center mb-8 border-b-4 border-dashed border-slate-200 pb-4">
                    <div>
                        <h3 className="text-2xl font-black mb-2 flex items-center gap-2"><Gamepad2 className="text-rose-500"/> Phân loại từ vựng</h3>
                        <p className="font-bold text-slate-500">Kéo các từ bên dưới thả vào đúng nhóm ngữ pháp.</p>
                    </div>
                    <button onClick={resetGame} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl font-bold border-2 border-slate-800 transition-colors">
                        <RotateCcw size={18}/> Làm lại
                    </button>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-10 min-h-[100px] p-6 bg-slate-50 border-4 border-dashed border-slate-300 rounded-3xl" onDragOver={e=>e.preventDefault()} onDrop={e=>handleDrop(e, null)}>
                    {words.filter(w => !w.placedBucket).map(w => (
                        <div key={w.id} draggable onDragStart={e => e.dataTransfer.setData('text/plain', w.id)} className="bg-indigo-600 text-white font-black px-4 py-2 rounded-xl cursor-grab shadow-[2px_2px_0_0_#312e81] hover:-translate-y-1 transition-transform">
                            {w.word}
                        </div>
                    ))}
                    {words.filter(w => !w.placedBucket).length === 0 && <span className="text-slate-400 font-bold m-auto">Bạn đã xếp xong! Hãy kiểm tra điểm số.</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    {unitData.dragDrop.buckets.map(bucket => (
                        <div key={bucket} onDragOver={e=>e.preventDefault()} onDrop={e=>handleDrop(e, bucket)} className="bg-white border-4 border-slate-800 rounded-3xl p-3 shadow-[4px_4px_0_0_#1e293b] min-h-[300px] flex flex-col">
                            <h4 className="text-center font-black text-lg mb-3 bg-yellow-300 py-2 rounded-xl border-2 border-slate-800 truncate">{bucket}</h4>
                            <div className="flex-1 flex flex-col gap-2">
                                {words.filter(w => w.placedBucket === bucket).map(w => (
                                    <div key={w.id} draggable onDragStart={e => e.dataTransfer.setData('text/plain', w.id)} className={`font-bold px-2 py-2 rounded-lg border-2 cursor-grab text-center text-sm ${w.placedBucket === w.target ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800'}`}>
                                        {w.word}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center font-black text-2xl text-slate-800 bg-slate-100 py-4 rounded-2xl border-4 border-slate-800 border-dashed">Điểm: {getScore()}/{total}</div>
            </div>
        );
    };

    // --- TAB 4: GÕ TỪ (TỰ ĐỘNG QUA CÂU SAU 1.5S NẾU ĐÚNG) ---
    const TypingTab = () => {
        if (!unitData.typingGame) return null;

        const [qIdx, setQIdx] = useState(0);
        const [inputText, setInputText] = useState("");
        const [status, setStatus] = useState("idle");

        const curr = unitData.typingGame[qIdx];

        const handleTyping = (e) => {
            const val = e.target.value;
            setInputText(val);
            // Tự động kiểm tra
            if (val.toLowerCase().trim() === curr.a.toLowerCase()) {
                setStatus("correct");
                // Chờ 1 giây rồi tự chuyển câu
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
            // Bấm Enter chỉ khi bế tắc -> Báo sai, hiển thị đáp án, chờ 2.5s rồi tự qua câu
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
            setQIdx(0); setInputText(""); setStatus("idle");
        };

        return (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 border-4 border-slate-800 shadow-[8px_8px_0_0_#1e293b] animate-in zoom-in-95 mt-10 mb-10">
                 <div className="flex justify-between items-center mb-6 border-b-4 border-dashed border-slate-200 pb-4">
                    <span className="font-black text-2xl flex items-center gap-2"><Keyboard className="text-blue-500"/> Gõ Từ Tự Động</span>
                    <div className="flex items-center gap-4">
                        <span className="bg-slate-800 text-white font-bold px-4 py-1 rounded-xl">Câu {qIdx+1}/{unitData.typingGame.length}</span>
                        <button onClick={resetGame} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 border-2 border-slate-800 transition"><RotateCcw size={18}/></button>
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
                {status === 'correct' && <p className="text-emerald-600 font-black mt-2 mb-6 text-xl text-center">Chính xác tuyệt đối! 🎉</p>}
                
                {status !== 'idle' && qIdx === unitData.typingGame.length - 1 && <p className="text-slate-800 font-black mt-6 text-xl text-center bg-yellow-300 py-2 rounded-xl border-2 border-slate-800">Bạn đã hoàn thành trò chơi!</p>}
            </div>
        );
    };

    // --- TAB 5: LÀM TEST TRẮC NGHIỆM (TỰ ĐỘNG CHẤM + CHUYỂN CÂU) ---
    const QuizTab = () => {
        const [qIdx, setQIdx] = useState(0);
        const [sel, setSel] = useState(null);
        const [status, setStatus] = useState('idle');
        const [score, setScore] = useState(0);

        const curr = unitData.quiz[qIdx];

        const resetQuiz = () => {
            setQIdx(0); setSel(null); setStatus('idle'); setScore(0);
        };

        const handleSelect = (option) => {
            if (status !== 'idle') return; // Không cho click đúp
            setSel(option);
            
            if (option === curr.a) {
                setStatus('true');
                setScore(s => s + 1);
            } else {
                setStatus('false');
            }

            // Đợi 1.5 giây để nhìn kết quả rồi tự nhảy câu
            setTimeout(() => {
                if (qIdx < unitData.quiz.length - 1) {
                    setStatus('idle');
                    setSel(null);
                    setQIdx(prev => prev + 1);
                }
            }, 1500);
        };

        if(!curr) return null;

        return (
            <div className="bg-white rounded-3xl border-4 border-slate-800 p-8 shadow-[8px_8px_0_0_#1e293b] animate-in zoom-in-95 mb-10 mt-10">
                <div className="flex justify-between items-center mb-8 border-b-4 border-dashed border-slate-200 pb-4">
                    <span className="font-black text-2xl flex items-center gap-2"><PenTool className="text-yellow-500"/> Trắc nghiệm Nhanh</span>
                    <div className="flex items-center gap-4">
                        <span className="bg-slate-800 text-white font-bold px-4 py-1 rounded-xl">Câu {qIdx+1}/{unitData.quiz.length}</span>
                        <button onClick={resetQuiz} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 border-2 border-slate-800 transition" title="Làm lại từ đầu"><RotateCcw size={18}/></button>
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
                                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-none"; // Hiển thị màu xanh cho đáp án đúng
                            } else if (sel === o) {
                                btnClass += "border-rose-500 bg-rose-50 text-rose-700 shadow-none"; // Nếu chọn sai thì bôi đỏ
                            } else {
                                btnClass += "border-slate-200 bg-slate-50 text-slate-400 opacity-50 shadow-none"; // Làm mờ các đáp án không chọn
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
                {status === 'true' && <p className="text-emerald-600 font-black mt-2 mb-6 text-xl text-center">Chính xác! 🎉</p>}
                
                {/* Màn hình khi hoàn thành bài test */}
                {status !== 'idle' && qIdx === unitData.quiz.length - 1 && (
                    <div className="mt-8 p-6 bg-slate-50 border-4 border-slate-800 border-dashed rounded-3xl text-center animate-in zoom-in">
                        <h4 className="text-3xl font-black mb-2">Hoàn thành bài Test!</h4>
                        <p className="text-xl font-bold text-slate-600 mb-6">Điểm của bạn: {score}/{unitData.quiz.length}</p>
                        <button onClick={resetQuiz} className="px-8 py-3 bg-slate-800 text-white font-black text-lg rounded-xl hover:bg-slate-700 transition">Làm Lại Từ Đầu</button>
                    </div>
                )}
            </div>
        );
    };

    // --- TAB 6: THỰC HÀNH AI (VIẾT & NÓI) ---
    const PracticeTab = () => {
        const [apiKey, setApiKey] = useState("");
        const [userText, setUserText] = useState("");
        const [feedback, setFeedback] = useState("");
        const [loading, setLoading] = useState(false);
        const [speakItem, setSpeakItem] = useState(unitData.speaking[0]);
        const [isRec, setIsRec] = useState(false);
        const [score, setScore] = useState(null);

        const checkWriting = async () => {
            if (!apiKey) return alert("Vui lòng nhập Gemini API Key phía trên để AI chấm bài.");
            setLoading(true);
            const prompt = `Bạn là giáo viên tiếng Anh chấm bài thuộc Unit: ${unitData.title}. Học viên viết câu này để áp dụng bài học: "${userText}". Hãy chấm điểm, sửa lỗi ngữ pháp/từ vựng chi tiết bằng tiếng Việt. Cuối cùng cho 1 câu mẫu tương tự tự nhiên hơn.`;
            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });
                const data = await res.json();
                setFeedback(data?.candidates?.[0]?.content?.parts?.[0]?.text || "Lỗi phản hồi từ AI.");
            } catch (e) { setFeedback("Lỗi kết nối hoặc API Key không hợp lệ."); }
            setLoading(false);
        };

        const handleRecord = () => {
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SR) return alert("Trình duyệt không hỗ trợ thu âm.");
            const rec = new SR(); rec.lang = 'en-US';
            rec.onstart = () => { setIsRec(true); setScore(null); };
            rec.onresult = (e) => {
                const uText = e.results[0][0].transcript.toLowerCase().replace(/[^\w\s]/g, "");
                const tText = speakItem.text.toLowerCase().replace(/[^\w\s]/g, "");
                setScore(uText === tText ? 100 : Math.round((tText.split(' ').filter(w => uText.includes(w)).length / tText.split(' ').length) * 100));
            };
            rec.onend = () => setIsRec(false);
            rec.start();
        };

        return (
            <div className="space-y-8 animate-in fade-in pb-10 mt-6">
                <div className="bg-slate-800 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-4 border-slate-900 shadow-[6px_6px_0_0_#1e293b]">
                    <div className="font-bold flex items-center gap-2"><Key className="text-yellow-400"/> Cài Gemini API Key:</div>
                    <input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="Nhập Key vào đây..." className="bg-slate-700 p-3 rounded-2xl outline-none w-full sm:w-1/2 border-4 border-slate-600 focus:border-cyan-400 text-white"/>
                </div>

                <div className="bg-white rounded-3xl border-4 border-slate-800 p-8 shadow-[8px_8px_0_0_#1e293b]">
                    <h3 className="text-2xl font-black mb-4 flex items-center gap-3"><Edit3 className="text-indigo-600"/> Gia Sư Writing</h3>
                    <p className="font-bold text-slate-500 mb-4">Sử dụng các từ vựng (noun, verb, question...) vừa học để tạo 1 đoạn văn tiếng Anh hoàn chỉnh. AI sẽ chấm cho bạn:</p>
                    <textarea value={userText} onChange={e=>setUserText(e.target.value)} className="w-full h-40 border-4 border-slate-800 rounded-2xl p-4 font-bold text-lg mb-4 bg-slate-50 focus:bg-white outline-none resize-none shadow-inner" placeholder="Ví dụ: This is a short paragraph. I have a book..."></textarea>
                    <button onClick={checkWriting} disabled={loading || !userText} className="w-full py-4 bg-indigo-600 text-white font-black text-xl rounded-2xl shadow-[4px_4px_0_0_#312e81] active:translate-y-1 active:shadow-none disabled:opacity-50">{loading ? 'Đang chấm...' : 'Chấm Bài'}</button>
                    {feedback && <div className="mt-6 bg-indigo-50 p-6 rounded-2xl border-4 border-slate-800 font-bold whitespace-pre-wrap leading-relaxed text-slate-800">{feedback}</div>}
                </div>

                <div className="bg-white rounded-3xl border-4 border-slate-800 p-8 shadow-[8px_8px_0_0_#1e293b] text-center">
                    <h3 className="text-2xl font-black mb-6 flex items-center justify-center gap-3"><Mic className="text-rose-500"/> Luyện Speaking</h3>
                    <div className="bg-cyan-50 p-8 rounded-3xl border-4 border-slate-800 mb-8 shadow-inner">
                        <p className="text-2xl md:text-3xl font-black mb-4 text-slate-900">"{speakItem.text}"</p>
                        <p className="font-bold text-slate-500 text-lg italic">({speakItem.trans})</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button onClick={() => {let u=new SpeechSynthesisUtterance(speakItem.text); u.lang='en-US'; window.speechSynthesis.speak(u);}} className="flex items-center px-6 py-3 bg-white border-4 border-slate-800 font-black rounded-2xl shadow-[4px_4px_0_0_#1e293b] active:translate-y-1 active:shadow-none"><Volume2 className="mr-2"/> Nghe Mẫu</button>
                        <button onClick={handleRecord} className={`flex items-center px-6 py-3 border-4 border-slate-800 font-black rounded-2xl active:translate-y-1 active:shadow-none ${isRec ? 'bg-rose-500 text-white shadow-none translate-y-1' : 'bg-rose-300 text-slate-900 shadow-[4px_4px_0_0_#1e293b]'}`}><Mic className={`mr-2 ${isRec ? 'animate-pulse' : ''}`}/> {isRec ? 'Đang thu...' : 'Bấm Đọc'}</button>
                        <button onClick={() => setSpeakItem(unitData.speaking[Math.floor(Math.random()*unitData.speaking.length)])} className="flex items-center px-6 py-3 bg-white border-4 border-slate-800 font-black rounded-2xl shadow-[4px_4px_0_0_#1e293b] active:translate-y-1 active:shadow-none"><Shuffle className="mr-2"/> Đổi Câu</button>
                    </div>
                    {score !== null && (
                        <div className="mt-8 p-4 bg-slate-50 rounded-2xl font-black text-xl border-4 border-slate-800 border-dashed">
                            Độ chuẩn xác: <span className={score>70?'text-emerald-500':'text-rose-500'}> {score}%</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // --- RENDER GIAO DIỆN CHÍNH ---
    const tabs = [
        { id: "theory", name: "Lý Thuyết", icon: <BookOpen size={20} className="mr-2" /> },
        { id: "flashcard", name: "Thẻ Nhớ", icon: <Layers size={20} className="mr-2" /> },
        { id: "dragdrop", name: "Ghép Từ", icon: <Gamepad2 size={20} className="mr-2" /> },
        { id: "typing", name: "Gõ Từ", icon: <Keyboard size={20} className="mr-2" /> },
        { id: "quiz", name: "Làm Test", icon: <PenTool size={20} className="mr-2" /> },
        { id: "practice", name: "AI", icon: <Edit3 size={20} className="mr-2" /> }
    ];

    // Xóa pb-32 ở Flashcard để hết lỗi hiện thanh cuộn phụ
    const getScrollbarClass = () => activeTab === 'flashcard' ? 'pb-10' : 'pb-32';

    return (
        <div className="w-full h-full max-h-screen flex flex-col bg-transparent">
            <div className="flex gap-3 mb-6 pb-2 overflow-x-auto hide-scrollbar shrink-0">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-row items-center px-5 py-4 rounded-2xl font-black text-base whitespace-nowrap transition-all border-4 ${activeTab === tab.id ? 'bg-yellow-300 border-slate-800 text-slate-900 translate-y-1 shadow-none' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-800 hover:text-slate-800 shadow-[4px_4px_0_0_#e2e8f0]'}`}>
                        {tab.icon} {tab.name}
                    </button>
                ))}
            </div>

            <div className={`flex-1 overflow-y-auto custom-scrollbar pr-2 ${getScrollbarClass()}`}>
                {activeTab === "theory" && <TheoryTab />}
                {activeTab === "flashcard" && <FlashcardTab />}
                {activeTab === "dragdrop" && <DragDropTab />}
                {activeTab === "typing" && <TypingTab />}
                {activeTab === "quiz" && <QuizTab />}
                {activeTab === "practice" && <PracticeTab />}
            </div>
        </div>
    );
}