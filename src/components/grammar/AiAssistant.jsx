// File: src/components/grammar/AiAssistant.jsx
import React, { useState } from 'react';
import { Key, Edit3, Mic, Volume2, Shuffle } from 'lucide-react';
import Btn3D from '../common/Btn3D';

const AiAssistant = ({ topic, sentences }) => {
  const [apiKey, setApiKey] = useState("");
  const [userText, setUserText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [speakingSent, setSpeakingSent] = useState(sentences[0]);
  const [isRec, setIsRec] = useState(false);
  const [score, setScore] = useState(null);

  const checkWriting = async () => {
    if (!apiKey) return alert("Vui lòng nhập Gemini API Key phía trên để AI hoạt động.");
    setLoading(true);
    const prompt = `Giáo viên chấm bài ngữ pháp "${topic.title}". Bài làm: "${userText}". Hãy chấm điểm, sửa lỗi, và cho 2 câu mẫu (Cơ bản + IELTS) bằng tiếng Việt.`;
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      setFeedback(data?.candidates?.[0]?.content?.parts?.[0]?.text || "Lỗi phản hồi từ AI.");
    } catch (e) { 
      setFeedback("Lỗi kết nối hoặc API Key không hợp lệ."); 
    }
    setLoading(false);
  };

  const handleRecord = () => {
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
      <div className="bg-slate-800 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-[4px] border-slate-900 shadow-[6px_6px_0px_0px_#1e293b]">
        <div className="font-bold flex items-center gap-2"><Key className="text-yellow-400"/> Cài Gemini API Key (Bắt buộc cho phần Viết):</div>
        <input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="Nhập Key vào đây..." className="bg-slate-700 p-3 rounded-2xl outline-none w-full sm:w-1/2 border-[4px] border-slate-600 focus:border-cyan-400 text-white"/>
      </div>

      <div className="bg-white rounded-3xl border-[4px] border-slate-800 p-8 shadow-[8px_8px_0px_0px_#1e293b]">
        <h3 className="text-3xl font-black mb-4 flex items-center gap-3"><Edit3 className="text-indigo-600 bg-indigo-100 p-2 rounded-xl border-[4px] border-slate-800"/> Gia Sư Writing</h3>
        <p className="font-bold text-slate-600 mb-4">Gõ 1 câu tiếng Anh, AI sẽ chấm điểm và sửa lỗi cho bạn:</p>
        <textarea value={userText} onChange={e=>setUserText(e.target.value)} className="w-full h-40 border-[4px] border-slate-800 rounded-2xl p-4 font-bold text-xl mb-4 bg-slate-50 focus:bg-white transition-colors outline-none resize-none shadow-inner" placeholder="Cứ mạnh dạn gõ tiếng Anh vào đây..."></textarea>
        <Btn3D onClick={checkWriting} disabled={loading || !userText} color="bg-indigo-500 text-white w-full text-xl">{loading ? 'Đang chấm...' : 'Gửi AI Chấm Bài'}</Btn3D>
        {feedback && <div className="mt-6 bg-indigo-50 p-8 rounded-3xl border-[4px] border-slate-800 font-bold whitespace-pre-wrap leading-relaxed text-lg shadow-[4px_4px_0px_0px_#1e293b]">{feedback}</div>}
      </div>

      <div className="bg-white rounded-3xl border-[4px] border-slate-800 p-8 shadow-[8px_8px_0px_0px_#1e293b] text-center">
        <h3 className="text-3xl font-black mb-6 flex items-center justify-center gap-3"><Mic className="text-rose-500 bg-rose-100 p-2 rounded-xl border-[4px] border-slate-800"/> Luyện Speaking</h3>
        <div className="bg-cyan-50 p-8 rounded-3xl border-[4px] border-slate-800 mb-8 shadow-inner">
          <p className="text-3xl md:text-4xl font-black mb-4 text-slate-900">"{speakingSent.text}"</p>
          <p className="font-bold text-slate-500 text-xl italic">({speakingSent.trans})</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Btn3D onClick={() => {
            if ('speechSynthesis' in window) {
              window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakingSent.text));
            }
          }} color="bg-cyan-300 text-slate-900"><Volume2 className="mr-2"/> Nghe Mẫu</Btn3D>
          <Btn3D onClick={handleRecord} color={isRec ? 'bg-rose-500 text-white' : 'bg-rose-300 text-slate-900'}><Mic className={`mr-2 ${isRec ? 'animate-pulse' : ''}`}/> {isRec ? 'Đang thu...' : 'Bấm Đọc'}</Btn3D>
          <Btn3D onClick={() => setSpeakingSent(sentences[Math.floor(Math.random()*sentences.length)])} color="bg-slate-200 text-slate-900"><Shuffle className="mr-2"/> Đổi Câu</Btn3D>
        </div>
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
