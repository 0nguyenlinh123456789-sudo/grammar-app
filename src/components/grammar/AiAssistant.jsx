// File: src/components/grammar/AiAssistant.jsx
import { useState } from 'react';
import { ShieldCheck, Edit3, Mic, Volume2, Shuffle } from 'lucide-react';
import Btn3D from '../common/Btn3D';
import { scoreWriting, scoreWritingWithAI } from '../../utils/writingScorer';

const AiAssistant = ({ topic, sentences }) => {
  const safeSentences = Array.isArray(sentences) ? sentences.filter(s => s && s.text) : [];
  const [userText, setUserText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [offlineResult, setOfflineResult] = useState(null);
  const [loading, setLoading] = useState(false);
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
    try {
      const aiText = await scoreWritingWithAI(userText, { topicTitle: topic?.title });
      setFeedback(aiText);
    } catch (error) {
      setFeedback(error?.message || "Không lấy được nhận xét AI. Bạn vẫn có kết quả chấm nhanh phía trên.");
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
      <div className="bg-emerald-100 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 rounded-3xl p-5 border-[4px] border-emerald-700 dark:border-emerald-600 shadow-[5px_5px_0_0_#047857]">
        <div className="font-bold flex items-center gap-2"><ShieldCheck className="text-emerald-700 dark:text-emerald-400"/> AI được gọi qua máy chủ bảo mật; bạn không cần nhập API key.</div>
      </div>

      <div className="bg-white rounded-3xl border-[4px] border-slate-800 p-8 shadow-[8px_8px_0px_0px_#1e293b]">
        <h3 className="text-3xl font-black mb-4 flex items-center gap-3"><Edit3 className="text-indigo-600 bg-indigo-100 p-2 rounded-xl border-[4px] border-slate-800"/> Gia Sư Writing</h3>
        <p className="font-bold text-slate-600 mb-4">Gõ 1 câu tiếng Anh — bạn sẽ được chấm điểm và gợi ý sửa ngay lập tức:</p>
        <textarea value={userText} onChange={e=>setUserText(e.target.value)} className="w-full h-40 border-[4px] border-slate-800 rounded-2xl p-4 font-bold text-xl mb-4 bg-slate-50 focus:bg-white transition-colors outline-none resize-none shadow-inner" placeholder="Cứ mạnh dạn gõ tiếng Anh vào đây..."></textarea>
        <Btn3D onClick={checkWriting} disabled={loading || !userText} color="bg-indigo-500 text-white w-full text-xl">{loading ? 'Đang chấm...' : 'Chấm Bài'}</Btn3D>

        {/* Instant offline feedback */}
        {offlineResult && (
          <div className="mt-6 bg-slate-50 p-6 rounded-3xl border-[4px] border-slate-800 shadow-[4px_4px_0px_0px_#1e293b]">
            <div className="flex items-center gap-3 mb-3">
              <div className={`text-3xl font-black px-4 py-2 rounded-2xl border-4 border-slate-800 ${offlineResult.score >= 85 ? 'bg-emerald-200 text-emerald-800' : offlineResult.score >= 65 ? 'bg-yellow-200 text-yellow-800' : 'bg-rose-200 text-rose-800'}`}>
                {offlineResult.score}<span className="text-lg">/100</span>
              </div>
              <span className="font-black text-lg text-slate-700">Chấm nhanh (không cần AI)</span>
            </div>
            {offlineResult.praises.length > 0 && (
              <ul className="mb-2 text-emerald-700 font-bold text-base space-y-0.5">
                {offlineResult.praises.map((p, i) => <li key={i}>✅ {p}</li>)}
              </ul>
            )}
            {offlineResult.tips.length > 0 && (
              <ul className="text-rose-600 font-bold text-base space-y-0.5">
                {offlineResult.tips.map((t, i) => <li key={i}>💡 {t}</li>)}
              </ul>
            )}
          </div>
        )}
        {/* Richer feedback from the server-side AI proxy. */}
        {feedback && <div className="mt-4 bg-indigo-50 p-8 rounded-3xl border-[4px] border-slate-800 font-bold whitespace-pre-wrap leading-relaxed text-lg shadow-[4px_4px_0px_0px_#1e293b]"><div className="text-sm text-indigo-500 mb-2 uppercase font-black">🤖 Nhận xét từ AI Gemini</div>{feedback}</div>}
      </div>

      <div className="bg-white rounded-3xl border-[4px] border-slate-800 p-8 shadow-[8px_8px_0px_0px_#1e293b] text-center">
        <h3 className="text-3xl font-black mb-6 flex items-center justify-center gap-3"><Mic className="text-rose-500 bg-rose-100 p-2 rounded-xl border-[4px] border-slate-800"/> Luyện Speaking</h3>
        {!speakingSent ? (
          <p className="font-bold text-slate-500 py-8">Chủ đề này chưa có câu mẫu để luyện nói.</p>
        ) : (
        <>
        <div className="bg-cyan-50 p-8 rounded-3xl border-[4px] border-slate-800 mb-8 shadow-inner">
          <p className="text-3xl md:text-4xl font-black mb-4 text-slate-900">"{speakingSent.text}"</p>
          <p className="font-bold text-slate-500 text-xl italic">({speakingSent.trans})</p>
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
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl font-black text-2xl border-[4px] border-slate-800 shadow-inner">
             Độ chuẩn xác: <span className={score>70?'text-emerald-500 text-4xl':'text-rose-500 text-4xl'}> {score}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;
