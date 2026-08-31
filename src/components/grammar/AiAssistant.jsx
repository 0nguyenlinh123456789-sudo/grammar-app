// File: src/components/grammar/AiAssistant.jsx
import { useState, useMemo } from 'react';
import { Edit3, Mic, Volume2, Shuffle } from 'lucide-react';
import AiKeyBanner from '../common/AiKeyBanner';
import Btn3D from '../common/Btn3D';
import { scoreWriting, scoreWritingWithAI } from '../../utils/writingScorer';
import { chuanHoaCauMau } from '../../utils/cauMau';

const AiAssistant = ({ topic, sentences }) => {
  // Trước đây dòng này tự lọc theo trường `text`, nên ba bài dùng khuôn
  // { en, vi } rơi hết và mục đọc câu mẫu tắt lặng lẽ. Xem `utils/cauMau.js`.
  // Neo lại vì `chuanHoaCauMau` dựng object mới mỗi lần gọi — ở đây chưa nổ (màn
  // này không có effect nào phụ thuộc vào nó) nhưng cùng một mầm đã giết tab
  // "Xếp Câu"; xem chú thích trong SentenceBuilder.jsx.
  const safeSentences = useMemo(() => chuanHoaCauMau(sentences), [sentences]);
  const [userText, setUserText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [offlineResult, setOfflineResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiErrorCode, setAiErrorCode] = useState('');
  const [speakingSent, setSpeakingSent] = useState(safeSentences[0] || null);
  const [isRec, setIsRec] = useState(false);
  const [score, setScore] = useState(null);

  const checkWriting = async () => {
    if (!userText.trim()) return;
    // 1. Always give instant offline feedback (works without any API key).
    setOfflineResult(scoreWriting(userText));
    setFeedback("");
    // 2. Enrich with server-side AI feedback; credentials stay on the server.
    setLoading(true);
    setAiErrorCode("");
    try {
      const aiText = await scoreWritingWithAI(userText, { topicTitle: topic?.title });
      setFeedback(aiText);
    } catch (error) {
      setFeedback(error?.message || "Không lấy được nhận xét AI. Bạn vẫn có kết quả chấm nhanh phía trên.");
      setAiErrorCode(error?.code || "");
    } finally {
      setLoading(false);
    }
  };

  const handleRecord = () => {
    if (!speakingSent) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Trình duyệt không hỗ trợ thu âm. Vui lòng dùng Google Chrome.");
    const rec = new SR(); 
    rec.lang = 'en-US';
    rec.onstart = () => { 
      setIsRec(true); 
      setScore(null); 
    };
    rec.onresult = (e) => {
      const uText = e.results[0][0].transcript.toLowerCase().replace(/[^\w\s]/g, "");
      const tText = speakingSent.text.toLowerCase().replace(/[^\w\s]/g, "");
      setScore(uText === tText ? 100 : Math.round((tText.split(' ').filter(w => uText.includes(w)).length / tText.split(' ').length) * 100));
    };
    rec.onend = () => setIsRec(false);
    rec.start();
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      <AiKeyBanner feature="Gia sư Writing" errorCode={aiErrorCode} />

      <div className="bg-white dark:bg-slate-900 rounded-3xl border-[4px] border-slate-800 dark:border-slate-700 p-8 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617]">
        <h3 className="text-3xl font-black mb-4 flex items-center gap-3 text-slate-900 dark:text-slate-100"><Edit3 className="text-indigo-600 bg-indigo-100 dark:bg-indigo-950/40 p-2 rounded-xl border-[4px] border-slate-800 dark:border-slate-700"/> Gia Sư Writing</h3>
        <p className="font-bold text-slate-600 dark:text-slate-400 mb-4">Gõ 1 câu tiếng Anh — bạn sẽ được chấm điểm và gợi ý sửa ngay lập tức:</p>
        <textarea value={userText} onChange={e=>setUserText(e.target.value)} className="w-full h-40 border-[4px] border-slate-800 dark:border-slate-700 rounded-2xl p-4 font-bold text-xl mb-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-700 transition-colors outline-none resize-none shadow-inner" placeholder="Cứ mạnh dạn gõ tiếng Anh vào đây..."></textarea>
        <Btn3D onClick={checkWriting} disabled={loading || !userText} color="bg-indigo-500 text-white w-full text-xl">{loading ? 'Đang chấm...' : 'Chấm Bài'}</Btn3D>

        {/* Instant offline feedback */}
        {offlineResult && (
          <div className="mt-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border-[4px] border-slate-800 dark:border-slate-700 shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617]">
            <div className="flex items-center gap-3 mb-3">
              <div className={`text-3xl font-black px-4 py-2 rounded-2xl border-4 border-slate-800 dark:border-slate-700 ${offlineResult.score >= 85 ? 'bg-emerald-200 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' : offlineResult.score >= 65 ? 'bg-yellow-200 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300' : 'bg-rose-200 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'}`}>
                {offlineResult.score}<span className="text-lg">/100</span>
              </div>
              <span className="font-black text-lg text-slate-700 dark:text-slate-300">Chấm nhanh (không cần AI)</span>
            </div>
            {offlineResult.praises.length > 0 && (
              <ul className="mb-2 text-emerald-700 dark:text-emerald-400 font-bold text-base space-y-0.5">
                {offlineResult.praises.map((p, i) => <li key={i}>✅ {p}</li>)}
              </ul>
            )}
            {offlineResult.tips.length > 0 && (
              <ul className="text-rose-600 dark:text-rose-400 font-bold text-base space-y-0.5">
                {offlineResult.tips.map((t, i) => <li key={i}>💡 {t}</li>)}
              </ul>
            )}
          </div>
        )}
        {/* Richer feedback from the server-side AI proxy. */}
        {feedback && <div className="mt-4 bg-indigo-50 dark:bg-indigo-950/30 p-8 rounded-3xl border-[4px] border-slate-800 dark:border-slate-700 font-bold whitespace-pre-wrap leading-relaxed text-lg shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_#020617] text-slate-900 dark:text-slate-100"><div className="text-sm text-indigo-500 dark:text-indigo-400 mb-2 uppercase font-black">🤖 Nhận xét từ AI Gemini</div>{feedback}</div>}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border-[4px] border-slate-800 dark:border-slate-700 p-8 shadow-[8px_8px_0px_0px_#1e293b] dark:shadow-[8px_8px_0px_0px_#020617] text-center">
        <h3 className="text-3xl font-black mb-6 flex items-center justify-center gap-3 text-slate-900 dark:text-slate-100"><Mic className="text-rose-500 bg-rose-100 dark:bg-rose-950/40 p-2 rounded-xl border-[4px] border-slate-800 dark:border-slate-700"/> Luyện Speaking</h3>
        {!speakingSent ? (
          <p className="font-bold text-slate-500 dark:text-slate-400 py-8">Chủ đề này chưa có câu mẫu để luyện nói.</p>
        ) : (
        <>
        <div className="bg-cyan-50 dark:bg-cyan-950/30 p-8 rounded-3xl border-[4px] border-slate-800 dark:border-slate-700 mb-8 shadow-inner">
          <p className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-slate-100">"{speakingSent.text}"</p>
          <p className="font-bold text-slate-500 dark:text-slate-400 text-xl italic">({speakingSent.trans})</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Btn3D onClick={() => {
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakingSent.text));
            }
          }} color="bg-cyan-300 text-slate-900"><Volume2 className="mr-2"/> Nghe Mẫu</Btn3D>
          <Btn3D onClick={handleRecord} color={isRec ? 'bg-rose-500 text-white' : 'bg-rose-300 text-slate-900'}><Mic className={`mr-2 ${isRec ? 'animate-pulse' : ''}`}/> {isRec ? 'Đang thu...' : 'Bấm Đọc'}</Btn3D>
          <Btn3D onClick={() => setSpeakingSent(safeSentences[Math.floor(Math.random()*safeSentences.length)])} color="bg-slate-200 text-slate-900"><Shuffle className="mr-2"/> Đổi Câu</Btn3D>
        </div>
        </>
        )}
        {score !== null && (
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl font-black text-2xl border-[4px] border-slate-800 dark:border-slate-700 shadow-inner text-slate-900 dark:text-slate-100">
             {/* (#0-C8) tỉ lệ từ khớp giữa transcript và câu mẫu — không phải điểm phát âm */}
             Trùng khớp với câu mẫu: <span className={score>70?'text-emerald-500 text-4xl':'text-rose-500 text-4xl'}> {score}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;
