// File: src/components/oxford/PracticeTab.jsx
import { useState, useEffect } from 'react';
import { Edit3, Mic, Volume2, Shuffle, Snail } from 'lucide-react';
import AiKeyBanner from '../common/AiKeyBanner';
import { requestAi } from '../../utils/aiClient';

const PracticeTab = ({ unitData }) => {
    const [userText, setUserText] = useState("");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [aiErrorCode, setAiErrorCode] = useState("");
    const [speakItem, setSpeakItem] = useState(null);
    const [isRec, setIsRec] = useState(false);
    const [score, setScore] = useState(null);

    useEffect(() => {
        setSpeakItem(unitData?.speaking?.[0] || null);
        setUserText("");
        setFeedback("");
        setScore(null);
    }, [unitData]);

    const checkWriting = async () => {
        if (!userText.trim()) return;
        setLoading(true);
        setAiErrorCode("");
        try {
            const { text } = await requestAi('writing', {
                text: userText,
                topicTitle: unitData.title,
            });
            setFeedback(text);
        } catch (error) {
            setFeedback(error?.message || "Dịch vụ chấm bài hiện chưa sẵn sàng. Vui lòng thử lại sau.");
            setAiErrorCode(error?.code || "");
        } finally {
            setLoading(false);
        }
    };

    const handleRecord = () => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return alert("Trình duyệt không hỗ trợ thu âm.");
        const rec = new SR(); 
        rec.lang = 'en-US';
        rec.onstart = () => { 
            setIsRec(true); 
            setScore(null); 
        };
        rec.onresult = (e) => {
            const uText = e.results[0][0].transcript.toLowerCase().replace(/[^\w\s]/g, "");
            const tText = speakItem.text.toLowerCase().replace(/[^\w\s]/g, "");
            setScore(uText === tText ? 100 : Math.round((tText.split(' ').filter(w => uText.includes(w)).length / tText.split(' ').length) * 100));
        };
        rec.onend = () => setIsRec(false);
        rec.start();
    };

    const speakWord = (word, rate = 0.9) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(word);
            u.lang = 'en-US';
            u.rate = rate;
            window.speechSynthesis.speak(u);
        }
    };

    if (!speakItem) return <div className="p-10 text-center font-bold">Chưa có dữ liệu luyện nói.</div>;

    return (
        <div className="space-y-8 animate-in fade-in pb-10 mt-6">
            <AiKeyBanner feature="Chấm bài viết" errorCode={aiErrorCode} />

            <div className="bg-white rounded-3xl border-4 border-slate-800 p-8 shadow-[8px_8px_0_0_#1e293b]">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-3"><Edit3 className="text-indigo-600"/> Gia Sư Writing</h3>
                <p className="font-bold text-slate-500 mb-4">Sử dụng các từ vựng (noun, verb, question...) vừa học để tạo 1 đoạn văn tiếng Anh hoàn chỉnh. AI sẽ chấm cho bạn:</p>
                <textarea 
                  value={userText} 
                  onChange={e=>setUserText(e.target.value)} 
                  className="w-full h-40 border-4 border-slate-800 rounded-2xl p-4 font-bold text-lg mb-4 bg-slate-50 focus:bg-white outline-none resize-none shadow-inner" 
                  placeholder="Ví dụ: This is a short paragraph. I have a book..."
                ></textarea>
                <button 
                  onClick={checkWriting} 
                  disabled={loading || !userText} 
                  className="w-full py-4 bg-indigo-600 text-white font-black text-xl rounded-2xl shadow-[4px_4px_0_0_#312e81] active:translate-y-1 active:shadow-none disabled:opacity-50 cursor-pointer"
                >
                    {loading ? 'Đang chấm...' : 'Chấm Bài'}
                </button>
                {feedback && <div className="mt-6 bg-indigo-50 p-6 rounded-2xl border-4 border-slate-800 font-bold whitespace-pre-wrap leading-relaxed text-slate-800">{feedback}</div>}
            </div>

            <div className="bg-white rounded-3xl border-4 border-slate-800 p-8 shadow-[8px_8px_0_0_#1e293b] text-center">
                <h3 className="text-2xl font-black mb-6 flex items-center justify-center gap-3"><Mic className="text-rose-500"/> Luyện Speaking</h3>
                <div className="bg-cyan-50 p-8 rounded-3xl border-4 border-slate-800 mb-8 shadow-inner">
                    <p className="text-2xl md:text-3xl font-black mb-4 text-slate-900">"{speakItem.text}"</p>
                    {/* trans có thể vắng: contentFilter ẩn các bản "dịch" máy-sinh (placeholder [Tạm dịch]/công thức) */}
                    {speakItem.trans && <p className="font-bold text-slate-500 text-lg italic">({speakItem.trans})</p>}
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <button 
                      onClick={() => speakWord(speakItem.text, 0.9)} 
                      title="Nghe tốc độ thường"
                      className="flex items-center px-6 py-3 bg-white border-4 border-slate-800 font-black rounded-2xl shadow-[4px_4px_0_0_#1e293b] active:translate-y-1 active:shadow-none hover:bg-slate-50 transition-all cursor-pointer"
                    >
                        <Volume2 className="mr-2"/> Nghe Mẫu
                    </button>
                    <button 
                      onClick={() => speakWord(speakItem.text, 0.55)} 
                      title="Nghe tốc độ chậm"
                      className="flex items-center px-6 py-3 bg-amber-100 border-4 border-slate-800 text-amber-700 font-black rounded-2xl shadow-[4px_4px_0_0_#1e293b] active:translate-y-1 active:shadow-none hover:bg-amber-200 transition-all cursor-pointer"
                    >
                        <Snail className="mr-2"/> Nghe Chậm
                    </button>
                    <button 
                      onClick={handleRecord} 
                      className={`flex items-center px-6 py-3 border-4 border-slate-800 font-black rounded-2xl active:translate-y-1 active:shadow-none cursor-pointer ${isRec ? 'bg-rose-500 text-white shadow-none translate-y-1' : 'bg-rose-300 text-slate-900 shadow-[4px_4px_0_0_#1e293b]'}`}
                    >
                        <Mic className={`mr-2 ${isRec ? 'animate-pulse' : ''}`}/> {isRec ? 'Đang thu...' : 'Bấm Đọc'}
                    </button>
                    <button 
                      onClick={() => setSpeakItem(unitData.speaking[Math.floor(Math.random()*unitData.speaking.length)])} 
                      className="flex items-center px-6 py-3 bg-white border-4 border-slate-800 font-black rounded-2xl shadow-[4px_4px_0_0_#1e293b] active:translate-y-1 active:shadow-none cursor-pointer"
                    >
                        <Shuffle className="mr-2"/> Đổi Câu
                    </button>
                </div>
                {score !== null && (
                    <div className="mt-8 p-4 bg-slate-50 rounded-2xl font-black text-xl border-4 border-slate-800 border-dashed">
                        {/* (#0-C8) tỉ lệ từ khớp giữa transcript và câu mẫu — không phải điểm phát âm */}
                        Trùng khớp với câu mẫu: <span className={score>70?'text-emerald-500':'text-rose-500'}> {score}%</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticeTab;
