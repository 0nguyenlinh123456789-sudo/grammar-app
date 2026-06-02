// File: src/components/oxford/ExercisesTab.jsx
import React, { useState, useEffect } from 'react';
import { Volume2, Award, RotateCcw, HelpCircle, Check, X, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import ScholarBunny from '../common/ScholarBunny';

export default function ExercisesTab({ unitData }) {
    const [activeExIdx, setActiveExIdx] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [checked, setChecked] = useState(false);
    const [showExpl, setShowExpl] = useState({});
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);

    // Reset everything when unit or active exercise changes
    useEffect(() => {
        setUserAnswers({});
        setChecked(false);
        setShowExpl({});
        setScore(0);
        setTotal(0);
    }, [unitData?.id, activeExIdx]);

    if (!unitData || !unitData.textbookExercises || unitData.textbookExercises.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-750 p-8 rounded-3xl text-center shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617]">
                <HelpCircle size={48} className="mx-auto text-amber-500 mb-4 animate-bounce" />
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase">Chưa có bài tập</h3>
                <p className="text-slate-500 dark:text-slate-400 font-bold mt-2">Bài tập của Unit này đang được cập nhật, vui lòng quay lại sau nha!</p>
            </div>
        );
    }

    const exList = unitData.textbookExercises;
    const currentEx = exList[activeExIdx];

    // Read index format (e.g. Unit 1 exercise 1 => "1.1")
    const exNumStr = currentEx.exNum || `${unitData.unitNum}.${activeExIdx + 1}`;

    const playWord = (word, rate = 0.9) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(word);
            u.lang = 'en-US';
            u.rate = rate;
            window.speechSynthesis.speak(u);
        }
    };

    const handleAnswerChange = (qId, value) => {
        if (checked) return;
        setUserAnswers(prev => ({
            ...prev,
            [qId]: value
        }));
    };

    const cleanStr = (str) => {
        return str ? str.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ") : "";
    };

    const handleCheckAnswers = () => {
        if (checked) return;

        let currentScore = 0;
        let currentTotal = 0;

        if (currentEx.type === 'fill_in_blanks') {
            currentEx.questions.forEach(q => {
                currentTotal++;
                const isCorrect = q.answers.some(ans => cleanStr(ans) === cleanStr(userAnswers[q.id]));
                if (isCorrect) currentScore++;
            });
        } else if (currentEx.type === 'error_correction') {
            currentEx.questions.forEach(q => {
                currentTotal++;
                const isCorrect = cleanStr(userAnswers[q.id]) === cleanStr(q.correct);
                if (isCorrect) currentScore++;
            });
        } else if (currentEx.type === 'matching') {
            currentEx.questions.forEach(q => {
                currentTotal++;
                const isCorrect = userAnswers[q.id] === q.answer;
                if (isCorrect) currentScore++;
            });
        } else if (currentEx.type === 'categorization') {
            currentEx.questions.forEach(q => {
                currentTotal++;
                const isCorrect = userAnswers[q.word] === q.category;
                if (isCorrect) currentScore++;
            });
        }

        setScore(currentScore);
        setTotal(currentTotal);
        setChecked(true);
    };

    const handleReset = () => {
        setUserAnswers({});
        setChecked(false);
        setShowExpl({});
        setScore(0);
        setTotal(0);
    };

    const toggleExplanation = (id) => {
        setShowExpl(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const toggleAllExplanations = () => {
        const anyOpen = Object.values(showExpl).some(v => v);
        const nextState = !anyOpen;
        const updated = {};
        
        if (currentEx.questions) {
            currentEx.questions.forEach(q => {
                const key = currentEx.type === 'categorization' ? q.word : q.id;
                updated[key] = nextState;
            });
        }
        setShowExpl(updated);
    };

    const getDynamicExplanation = (q, type) => {
        if (q.explanation) return q.explanation;
        
        if (type === 'fill_in_blanks') {
            const cleanAnswer = q.answers?.[0] || '';
            const cleanHint = q.hint ? q.hint.replace('Nghĩa: ', '') : '';
            return `Scholar Bunny mách bé nè: Ở câu này chúng mình điền "${cleanAnswer}" nha! Từ này mang ý nghĩa là "${cleanHint}". Khi điền vào ô trống, câu của chúng mình sẽ hoàn chỉnh và đúng ngữ pháp 100% rồi đó. Bé hãy luyện đọc to cả câu lên để nhớ phát âm nhé! 🐰✨`;
        }
        
        if (type === 'matching') {
            const englishWord = q.text || '';
            const vietnameseMeaning = q.answer || '';
            return `Scholar Bunny bật mí nè: Từ tiếng Anh "${englishWord}" sẽ ghép đôi cực kỳ chính xác với nghĩa tiếng Việt là "${vietnameseMeaning}" đó! Bé nhớ ghi lại cặp từ này vào sổ tay của mình nha. Chăm chỉ tích lũy cặp từ sẽ giúp bé giao tiếp tự tin hơn nhiều đó! 🐰🎉`;
        }
        
        if (type === 'categorization') {
            const word = q.word || '';
            const category = q.category || '';
            return `Scholar Bunny mách nhỏ bé: Từ "${word}" thuộc nhóm từ vựng "${category}" là hoàn toàn chuẩn xác rồi nhé! Việc phân loại từ theo nhóm thế này là một phương pháp siêu thông minh giúp bộ não ghi nhớ từ vựng có hệ thống và lâu quên hơn đấy. Cố lên bé yêu nhé! 🐰💪`;
        }
        
        return "Scholar Bunny rất vui vì bé đã hoàn thành câu hỏi này! Hãy tiếp tục rèn luyện chăm chỉ để ngày càng giỏi giang nhé! 🐰❤️";
    };

    const getMascotFeedback = () => {
        if (score === total) {
            return "Tuyệt vời ông mặt trời! Bạn học bài siêu kĩ và hoàn thành chính xác 100% rồi đó. Hãy tiếp tục giữ vững phong độ ở các bài tiếp theo nhé! 🐰🎉";
        } else if (score === 0) {
            return "Ôi, có vẻ phần này hơi khó với chúng mình một chút rồi. Không sao cả đâu bạn ơi! Hãy bấm nút 'Scholar Bunny giải thích' dưới các câu hoặc xem lại phần 'Lý Thuyết' rồi làm lại nhé. Tớ tin lần sau bạn sẽ tiến bộ vượt bậc mà! 🐰💪";
        } else if (score < total / 2) {
            return "Cố lên bạn ơi! Chúng mình đã làm đúng được một số câu rồi đó. Bạn hãy mở nút 'Scholar Bunny giải thích' ở những câu làm sai để hiểu cặn kẽ hơn rồi thử làm lại bài này nha! 🐰✨";
        } else {
            return "Làm bài khá tốt rồi đó! Chỉ còn một vài lỗi nhỏ nữa thôi là đạt điểm tuyệt đối rồi. Bạn hãy bấm nút 'Scholar Bunny giải thích' ở câu sai để xem mẹo học bài rồi tiếp tục cố gắng nha! 🐰❤️";
        }
    };

    return (
        <div className="space-y-6 pb-12 animate-in fade-in transition-colors duration-300 dark:text-slate-100">
            {/* Top Selector for the 5 Exercises */}
            <div className="flex flex-wrap gap-2.5 bg-slate-50 dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 p-3 rounded-2xl shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617]">
                {exList.map((ex, idx) => {
                    const isSelected = activeExIdx === idx;
                    return (
                        <button
                            key={idx}
                            onClick={() => setActiveExIdx(idx)}
                            className={`px-4 py-2.5 rounded-xl border-3 font-black text-xs md:text-sm transition-all cursor-pointer ${
                                isSelected
                                    ? 'bg-yellow-300 dark:bg-yellow-450 border-slate-800 dark:border-slate-600 text-slate-900 translate-y-0.5 shadow-none'
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-800 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-slate-200 shadow-[2px_2px_0_0_#e2e8f0] dark:shadow-[2px_2px_0_0_#020617]'
                            }`}
                        >
                            📝 Bài {ex.exNum || `${unitData.unitNum}.${idx + 1}`}
                        </button>
                    );
                })}
            </div>

            {/* Exercise Content Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border-4 border-slate-800 dark:border-slate-700 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#020617]">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-dashed border-slate-200 dark:border-slate-800 pb-4 mb-6">
                    <div>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border-2 border-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-xs font-black uppercase mb-1.5 select-none">
                            <Sparkles size={12} /> BÀI TẬP SÁCH GIÁO KHOA
                        </span>
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100">
                            Bài {exNumStr}: {currentEx.type === 'fill_in_blanks' ? 'Điền vào chỗ trống' : currentEx.type === 'error_correction' ? 'Sửa câu lỗi sai' : currentEx.type === 'matching' ? 'Ghép cặp từ vựng' : 'Phân loại từ vựng'}
                        </h2>
                    </div>
                    {checked && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white font-black border-3 border-slate-800 dark:border-slate-700 rounded-xl shadow-[3px_3px_0_0_#1e293b] text-sm select-none">
                            <Award size={18} /> Điểm: {score}/{total}
                        </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-850 border-3 border-slate-200 dark:border-slate-700 p-4 rounded-2xl mb-6 select-none shadow-sm transition-all duration-300">
                    <ScholarBunny
                        state={checked ? (score === total ? 'success' : score < total / 2 ? 'failed' : 'happy') : 'studying'}
                        className="w-12 h-12 shrink-0"
                        width={48}
                        height={48}
                    />
                    <div className="flex-1 relative">
                        <strong className="text-slate-800 dark:text-white text-xs uppercase tracking-wider block mb-1 text-indigo-500 font-black">Bunny:</strong>
                        <p className="text-slate-600 dark:text-slate-300 font-bold text-sm md:text-base leading-relaxed">
                            {currentEx.instruction}
                        </p>
                    </div>
                </div>

                {/* 1. FILL IN THE BLANKS */}
                {currentEx.type === 'fill_in_blanks' && (
                    <div className="space-y-6">
                        {currentEx.questions.map((q, qIdx) => {
                            const parts = q.text.split('[blank]');
                            const isCorrect = q.answers.some(ans => cleanStr(ans) === cleanStr(userAnswers[q.id]));

                            return (
                                <div key={q.id} className="p-5 bg-slate-50 dark:bg-slate-850/50 border-3 border-slate-200 dark:border-slate-800 rounded-2xl shadow-[4px_4px_0_0_#f1f5f9] dark:shadow-[4px_4px_0_0_#020617] relative">
                                    <div className="absolute top-4 left-4 flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 font-extrabold text-xs text-slate-700 dark:text-slate-300 border-2 border-slate-400 select-none">
                                        {qIdx + 1}
                                    </div>
                                    <div className="pl-9 pr-2">
                                        <div className="flex flex-wrap items-center gap-y-3 gap-x-1.5 py-1 text-base md:text-lg font-black text-slate-800 dark:text-slate-100">
                                            <span>{parts[0]}</span>
                                            <div className="inline-flex items-center gap-1 relative">
                                                <input
                                                    type="text"
                                                    disabled={checked}
                                                    value={userAnswers[q.id] || ''}
                                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                    className={`px-3 py-1 font-mono text-sm md:text-base border-3 rounded-lg outline-none transition-all ${
                                                        checked
                                                            ? isCorrect
                                                                ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border-emerald-500 shadow-none'
                                                                : 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border-rose-500 shadow-none'
                                                            : 'bg-white dark:bg-slate-850 border-slate-350 dark:border-slate-650 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-150'
                                                    }`}
                                                    placeholder="Gõ từ..."
                                                    style={{ width: `${Math.max(100, (q.answers[0]?.length || 8) * 11 + 30)}px` }}
                                                />
                                                {checked && (
                                                    <span className="shrink-0">
                                                        {isCorrect ? <Check size={18} className="text-emerald-500 font-bold" /> : <X size={18} className="text-rose-500 font-bold" />}
                                                    </span>
                                                )}
                                            </div>
                                            <span>{parts[1]}</span>
                                        </div>

                                        {/* Hint & correct answer info */}
                                        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs font-bold">
                                            <span className="text-slate-400 dark:text-slate-500">💡 Gợi ý: {q.hint}</span>
                                            {checked && !isCorrect && (
                                                <span className="text-emerald-600 dark:text-emerald-400">
                                                    👉 Đúng là: <span className="underline font-mono font-black">{q.answers[0]}</span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Scholar Bunny explanation button */}
                                        {checked && (
                                            <div className="mt-3 border-t border-dashed border-slate-200 dark:border-slate-800 pt-3">
                                                    <button
                                                        onClick={() => toggleExplanation(q.word || q.id)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-extrabold text-xs border-2 border-slate-300 dark:border-slate-700 rounded-lg shadow-[2px_2px_0_0_rgba(0,0,0,0.05)] transition-all cursor-pointer"
                                                    >
                                                        Giải thích 🐰 {showExpl[q.word || q.id] ? '▲' : '▼'}
                                                    </button>

                                                {/* Scholar Bunny dialog bubble */}
                                                {showExpl[q.id] && (
                                                    <div className="mt-3 p-4 bg-indigo-50/70 dark:bg-indigo-950/20 border-2 border-indigo-250 dark:border-indigo-900 rounded-xl flex gap-3 items-start animate-in slide-in-from-top-1 duration-200">
                                                        <ScholarBunny
                                                            state="studying"
                                                            className="w-10 h-10 shrink-0 select-none"
                                                            width={40}
                                                            height={40}
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-extrabold text-xs text-indigo-500 dark:text-indigo-400 select-none uppercase mb-0.5">Bunny:</p>
                                                            <p className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{getDynamicExplanation(q, currentEx.type)}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 2. ERROR CORRECTION */}
                {currentEx.type === 'error_correction' && (
                    <div className="space-y-6">
                        {currentEx.questions.map((q, qIdx) => {
                            const isCorrect = cleanStr(userAnswers[q.id]) === cleanStr(q.correct);

                            return (
                                <div key={q.id} className="p-5 bg-slate-50 dark:bg-slate-850/50 border-3 border-slate-200 dark:border-slate-800 rounded-2xl shadow-[4px_4px_0_0_#f1f5f9] dark:shadow-[4px_4px_0_0_#020617] relative">
                                    <div className="absolute top-4 left-4 flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 font-extrabold text-xs text-slate-700 dark:text-slate-300 border-2 border-slate-400 select-none">
                                        {qIdx + 1}
                                    </div>
                                    <div className="pl-9">
                                        <div className="p-3 bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-750 rounded-xl mb-3 flex items-center justify-between gap-3">
                                            <div className="flex-1">
                                                <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-455 border border-rose-300 dark:border-rose-900 mr-2 select-none">Câu có lỗi sai:</span>
                                                <span className="text-sm md:text-base font-bold text-slate-600 dark:text-slate-350 line-through decoration-rose-500/80 decoration-2">{q.original}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase select-none">Viết lại câu đúng của bạn:</label>
                                                {checked && (
                                                    <span className="inline-flex items-center gap-1 text-xs font-black">
                                                        {isCorrect ? (
                                                            <span className="text-emerald-600 dark:text-emerald-400">✓ CHÍNH XÁC</span>
                                                        ) : (
                                                            <span className="text-rose-600 dark:text-rose-400">✗ CHƯA ĐÚNG</span>
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                disabled={checked}
                                                value={userAnswers[q.id] || ''}
                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                className={`px-4 py-2.5 border-3 rounded-xl outline-none font-bold text-sm md:text-base transition-all ${
                                                    checked
                                                        ? isCorrect
                                                            ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border-emerald-500 shadow-none'
                                                            : 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border-rose-500 shadow-none'
                                                        : 'bg-white dark:bg-slate-855 border-slate-350 dark:border-slate-650 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-150'
                                                }`}
                                                placeholder="Gõ lại câu hoàn chỉnh đã sửa lỗi sai..."
                                            />
                                        </div>

                                        {checked && !isCorrect && (
                                            <div className="mt-2.5 p-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/60 rounded-xl text-xs md:text-sm font-bold text-emerald-700 dark:text-emerald-400">
                                                👉 Đáp án đúng chuẩn: <span className="font-sans italic">"{q.correct}"</span>
                                            </div>
                                        )}

                                        {/* Scholar Bunny explanation button */}
                                        {checked && (
                                            <div className="mt-3.5 border-t border-dashed border-slate-200 dark:border-slate-800 pt-3">
                                                    <button
                                                        onClick={() => toggleExplanation(q.word || q.id)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-extrabold text-xs border-2 border-slate-300 dark:border-slate-700 rounded-lg shadow-[2px_2px_0_0_rgba(0,0,0,0.05)] transition-all cursor-pointer"
                                                    >
                                                        Giải thích 🐰 {showExpl[q.word || q.id] ? '▲' : '▼'}
                                                    </button>

                                                {/* Scholar Bunny dialog bubble */}
                                                {showExpl[q.id] && (
                                                    <div className="mt-3 p-4 bg-indigo-50/70 dark:bg-indigo-950/20 border-2 border-indigo-250 dark:border-indigo-900 rounded-xl flex gap-3 items-start animate-in slide-in-from-top-1 duration-200">
                                                        <ScholarBunny
                                                            state="studying"
                                                            className="w-10 h-10 shrink-0 select-none"
                                                            width={40}
                                                            height={40}
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-extrabold text-xs text-indigo-500 dark:text-indigo-400 select-none uppercase mb-0.5">Scholar Bunny giải thích:</p>
                                                            <p className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{getDynamicExplanation(q, currentEx.type)}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 3. MATCHING */}
                {currentEx.type === 'matching' && (
                    <div className="space-y-4">
                        {currentEx.questions.map((q, qIdx) => {
                            const isCorrect = userAnswers[q.id] === q.answer;

                            return (
                                <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-850/50 border-3 border-slate-200 dark:border-slate-800 rounded-2xl shadow-[4px_4px_0_0_#f1f5f9] dark:shadow-[4px_4px_0_0_#020617] flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 font-extrabold text-xs text-slate-700 dark:text-slate-300 border-2 border-slate-400 select-none">
                                            {qIdx + 1}
                                        </div>
                                        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-750 px-3.5 py-2 rounded-xl">
                                            <span className="font-black text-slate-800 dark:text-slate-100 text-sm md:text-base mr-1">{q.text}</span>
                                            <button
                                                type="button"
                                                onClick={() => playWord(q.text)}
                                                title="Nghe phát âm"
                                                className="text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 p-1.5 rounded-lg transition-all cursor-pointer shrink-0"
                                            >
                                                <Volume2 size={16} />
                                            </button>
                                        </div>
                                        {checked && (
                                            <span className="shrink-0">
                                                {isCorrect ? <Check size={20} className="text-emerald-500 font-bold" /> : <X size={20} className="text-rose-500 font-bold" />}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 max-w-lg md:text-right flex flex-col items-start md:items-end gap-1.5">
                                        <select
                                            disabled={checked}
                                            value={userAnswers[q.id] || ''}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                            className={`w-full md:w-80 px-3 py-2 border-3 rounded-xl font-bold text-xs md:text-sm outline-none transition-all cursor-pointer ${
                                                checked
                                                    ? isCorrect
                                                        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border-emerald-500 shadow-none'
                                                        : 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border-rose-500 shadow-none'
                                                    : 'bg-white dark:bg-slate-850 border-slate-350 dark:border-slate-650 focus:border-indigo-500'
                                            }`}
                                        >
                                            <option value="">-- Chọn nghĩa đúng --</option>
                                            {q.options.map((opt, oIdx) => (
                                                <option key={oIdx} value={opt}>{opt}</option>
                                            ))}
                                        </select>

                                        {checked && !isCorrect && (
                                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 md:text-right mt-1">
                                                👉 Đúng là: <span className="underline font-sans">{q.answer}</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Scholar Bunny explanation panel at full width below each matched item */}
                                    {checked && (
                                        <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-850 pt-3 md:mt-0">
                                            <button
                                                onClick={() => toggleExplanation(q.id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-extrabold text-xs border-2 border-slate-300 dark:border-slate-700 rounded-lg shadow-[2px_2px_0_0_rgba(0,0,0,0.05)] transition-all cursor-pointer"
                                            >
                                                🐰 Scholar Bunny giải thích {showExpl[q.id] ? '▲' : '▼'}
                                            </button>

                                            {showExpl[q.id] && (
                                                <div className="mt-3 p-4 bg-indigo-50/70 dark:bg-indigo-950/20 border-2 border-indigo-250 dark:border-indigo-900 rounded-xl flex gap-3 items-start animate-in slide-in-from-top-1 duration-200">
                                                    <ScholarBunny
                                                        state="studying"
                                                        className="w-10 h-10 shrink-0 select-none"
                                                        width={40}
                                                        height={40}
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-extrabold text-xs text-indigo-500 dark:text-indigo-400 select-none uppercase mb-0.5">Bunny:</p>
                                                        <p className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{getDynamicExplanation(q, currentEx.type)}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 4. CATEGORIZATION */}
                {currentEx.type === 'categorization' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentEx.questions.map((q, qIdx) => {
                                const isCorrect = userAnswers[q.word] === q.category;

                                return (
                                    <div key={q.word} className={`p-5 rounded-2xl border-4 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] transition-all relative ${
                                        checked
                                            ? isCorrect
                                                ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-500'
                                                : 'bg-rose-50/50 dark:bg-rose-950/10 border-rose-500'
                                            : 'bg-slate-50 dark:bg-slate-850 border-slate-800 dark:border-slate-700'
                                    }`}>
                                        <div className="absolute top-4 left-4 flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-400 font-extrabold text-xs text-slate-700 dark:text-slate-300 select-none">
                                            {qIdx + 1}
                                        </div>
                                        
                                        <div className="pl-9 pr-1">
                                            <div className="flex items-center justify-between gap-2 border-b-2 border-dashed border-slate-200 dark:border-slate-800 pb-2 mb-3">
                                                <span className="text-base md:text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                                                    {q.word}
                                                    <button
                                                        type="button"
                                                        onClick={() => playWord(q.word)}
                                                        title="Nghe phát âm"
                                                        className="text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 p-1 rounded transition-all cursor-pointer shrink-0"
                                                    >
                                                        <Volume2 size={15} />
                                                    </button>
                                                </span>
                                                {checked && (
                                                    <span>
                                                        {isCorrect ? (
                                                            <span className="text-xs uppercase font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-900">Đúng</span>
                                                        ) : (
                                                            <span className="text-xs uppercase font-black text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/30 px-2 py-0.5 rounded border border-rose-300 dark:border-rose-900">Sai</span>
                                                        )}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Column choices */}
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase select-none">Chọn nhóm từ vựng phù hợp:</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {currentEx.categories.map((cat, cIdx) => {
                                                        const isBtnSelected = userAnswers[q.word] === cat;
                                                        return (
                                                            <button
                                                                key={cIdx}
                                                                type="button"
                                                                disabled={checked}
                                                                onClick={() => handleAnswerChange(q.word, cat)}
                                                                className={`px-3 py-1.5 rounded-xl border-2 text-xs font-black transition-all cursor-pointer ${
                                                                    isBtnSelected
                                                                        ? 'bg-indigo-500 text-white border-slate-800 dark:border-slate-700 shadow-none scale-95 translate-y-0.5'
                                                                        : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-355 border-slate-250 dark:border-slate-750'
                                                                }`}
                                                            >
                                                                📂 {cat}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {checked && !isCorrect && (
                                                <div className="mt-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                    👉 Nhóm chuẩn: <span className="font-extrabold uppercase bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/60 px-2 py-0.5 rounded">{q.category}</span>
                                                </div>
                                            )}

                                            {/* Scholar Bunny explanation button */}
                                            {checked && (
                                                <div className="mt-4 border-t border-dashed border-slate-200 dark:border-slate-800 pt-3">
                                                    <button
                                                        onClick={() => toggleExplanation(q.word)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs border-2 border-slate-300 dark:border-slate-700 rounded-lg shadow-[2px_2px_0_0_rgba(0,0,0,0.05)] transition-all cursor-pointer"
                                                    >
                                                        🐰 Scholar Bunny giải thích {showExpl[q.word] ? '▲' : '▼'}
                                                    </button>

                                                    {showExpl[q.word] && (
                                                        <div className="mt-3 p-4 bg-indigo-50/70 dark:bg-indigo-950/20 border-2 border-indigo-250 dark:border-indigo-900 rounded-xl flex gap-2.5 items-start animate-in slide-in-from-top-1 duration-200">
                                                            <ScholarBunny
                                                                state="studying"
                                                                className="w-10 h-10 shrink-0 select-none"
                                                                width={40}
                                                                height={40}
                                                            />
                                                            <div className="flex-1">
                                                                <p className="font-extrabold text-xs text-indigo-500 dark:text-indigo-400 select-none uppercase mb-0.5">Scholar Bunny giải thích:</p>
                                                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{getDynamicExplanation(q, currentEx.type)}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Score panel & Bunny Mascot feedback bubble */}
                {checked && (
                    <div className="mt-8 border-t-4 border-dashed border-slate-200 dark:border-slate-850 pt-8 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-slate-50 dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 p-6 md:p-8 rounded-3xl shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#020617] flex flex-col md:flex-row items-center gap-6">
                            
                            {/* Score badge card */}
                            <div className="shrink-0 flex flex-col items-center bg-indigo-500 text-white border-4 border-slate-800 dark:border-slate-700 p-5 rounded-2xl shadow-[4px_4px_0_0_#1e293b] w-full md:w-44 select-none">
                                <span className="text-xs font-black uppercase tracking-wider text-indigo-100 mb-1">Kết quả bài làm</span>
                                <span className="text-4xl md:text-5xl font-black font-sans">{score}/{total}</span>
                                <span className="text-[10px] font-bold text-indigo-200 mt-2 bg-indigo-650 px-2 py-0.5 rounded-full border border-indigo-400">
                                    {Math.round((score / total) * 100)}% Chính Xác
                                </span>
                            </div>

                            {/* Bunny dialogue speech bubble */}
                            <div className="flex-1 flex gap-4 items-start bg-white dark:bg-slate-850 border-4 border-slate-800 dark:border-slate-700 p-5 rounded-2xl shadow-[4px_4px_0_0_#1e293b] relative">
                                <ScholarBunny
                                    state={score === total ? 'success' : score < total / 2 ? 'failed' : 'happy'}
                                    className="w-14 h-14 shrink-0 select-none"
                                    width={56}
                                    height={56}
                                />
                                <div className="flex-1">
                                    <p className="font-extrabold text-xs text-indigo-500 dark:text-indigo-400 select-none uppercase mb-1">Bunny:</p>
                                    <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
                                        {getMascotFeedback()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Extra control buttons inside checked mode */}
                        <div className="mt-4 flex flex-wrap gap-3">
                            <button
                                onClick={toggleAllExplanations}
                                className="px-5 py-3 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 text-indigo-650 dark:text-indigo-400 border-3 border-indigo-200 dark:border-indigo-900 rounded-2xl font-black text-sm transition-all cursor-pointer shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] active:translate-y-0.5 active:shadow-none"
                            >
                                💬 {Object.values(showExpl).some(v => v) ? 'Ẩn giải thích' : 'Hiện giải thích'} Bunny 🐰
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Action Control Buttons */}
                <div className="mt-8 border-t-4 border-slate-200 dark:border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-black border-3 border-slate-800 dark:border-slate-700 rounded-2xl shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-sm"
                    >
                        <RotateCcw size={18} /> Làm Lại (Reset)
                    </button>

                    {!checked ? (
                        <button
                            onClick={handleCheckAnswers}
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-400 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-600 text-slate-900 dark:text-white font-black border-3 border-slate-800 dark:border-slate-700 rounded-2xl shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-sm hover:scale-[1.02] transform"
                        >
                            ✓ Kiểm Tra Đáp Án
                        </button>
                    ) : (
                        activeExIdx < exList.length - 1 && (
                            <button
                                onClick={() => setActiveExIdx(prev => prev + 1)}
                                className="inline-flex items-center gap-2 px-6 py-3.5 bg-yellow-300 dark:bg-yellow-450 hover:bg-yellow-400 dark:hover:bg-yellow-500 text-slate-900 font-black border-3 border-slate-800 dark:border-slate-750 rounded-2xl shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-sm hover:scale-[1.02] transform"
                            >
                                Bài Tiếp Theo <ArrowRight size={18} />
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
