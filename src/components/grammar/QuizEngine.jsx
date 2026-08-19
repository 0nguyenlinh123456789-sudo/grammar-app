// File: src/components/grammar/QuizEngine.jsx
import { useState, useEffect, useMemo, useRef } from 'react';
import { PenTool, ChevronRight, Sparkles } from 'lucide-react';
import Btn3D from '../common/Btn3D';
import MasteryVerdict from '../common/MasteryVerdict';
import { createSession, recordAnswer, sessionEvidence } from '../../utils/mastery';
import KhongCoCau from './KhongCoCau';
import { tronPhuongAn } from '../../utils/tronPhuongAn';

const QuizEngine = ({ exercises, setGlobalProgress, onComplete }) => {
  const [qIdx, setQIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState(0);
  // Remember which questions have already granted global XP so replaying the
  // quiz ("Làm Lại") can't farm unlimited XP. Persists across replays.
  const awardedRef = useRef(new Set());
  // Phiên chấm theo LẦN TRẢ LỜI ĐẦU TIÊN (hạng mục #1) — riêng biệt với `score`
  // hiển thị, để mọi bài tập dùng chung một định nghĩa "đạt".
  const sessionRef = useRef(createSession());
  const reportedRef = useRef(false);
  // Kết quả phiên đưa vào state để màn kết quả không phải đọc ref lúc render.
  const [verdict, setVerdict] = useState(null);

  const exercisesLen = exercises?.length || 0;

  const curr = exercises && exercisesLen > 0 ? exercises[qIdx] : null;

  // Kho ngữ pháp B1/B2/C1 xếp đáp án khá đều (16–40% ở ô đầu), NHƯNG kho A0
  // "mất gốc" thì 144/144 câu để đáp án ở ô ĐẦU — bài đầu tiên đời học của người
  // mất gốc lại là bài bấm bừa cũng qua. Trộn ở đây vá cả hai kho vì cùng đi qua
  // một màn hình. Khoá lấy từ CHÍNH CÂU HỎI nên thứ tự không nhảy giữa hai lần
  // vẽ lại, và mở lại bài cũ vẫn thấy đúng thứ tự cũ.
  const phuongAn = useMemo(() => tronPhuongAn(`${curr?.q || ''}:${qIdx}`, curr?.opts || []), [curr, qIdx]);

  useEffect(() => {
    // reportedRef: onComplete là arrow tạo mới mỗi lần render nên effect này
    // chạy lại liên tục khi đã ở màn kết quả — báo đúng MỘT lần cho mỗi lượt.
    if (exercisesLen > 0 && qIdx === exercisesLen && onComplete && !reportedRef.current) {
      reportedRef.current = true;
      const evidence = sessionEvidence(sessionRef.current);
      setVerdict(evidence);
      onComplete(evidence);
    }
  }, [qIdx, onComplete, exercisesLen]);

  const replay = () => {
    sessionRef.current = createSession();
    reportedRef.current = false;
    setVerdict(null);
    setQIdx(0);
    setScore(0);
  };

  const check = () => {
    recordAnswer(sessionRef.current, qIdx, sel === curr.a, 'mcq');
    if (sel === curr.a) {
      setStatus('true');
      setScore(s => s + 1);
      // Only award global XP the first time each question is answered correctly.
      if (setGlobalProgress && !awardedRef.current.has(qIdx)) {
        awardedRef.current.add(qIdx);
        setGlobalProgress(p => p + 1);
      }
    } else {
      setStatus('false'); 
    }
  };

  const next = () => { 
    setStatus('idle'); 
    setSel(null); 
    setQIdx(prev => prev + 1); 
  };

  // ⚠️ KHÔNG CÓ CÂU NÀO thì phải BÁO Ở ĐÂY, TRƯỚC màn kết quả. Bộ vẽ-thật
  // (tests/helpers/render.mjs) bắt được: với danh sách rỗng thì `qIdx >= exercisesLen`
  // là `0 >= 0` → ĐÚNG, nên nhánh kết quả bên dưới chạy và người học nhận một
  // bảng điểm cho bài chưa từng có: **"0/0 (NaN% chính xác)"**. Chốt
  // `if (!curr)` mà tôi thêm ở đợt trước nằm SAU nhánh đó nên chưa bao giờ chạy
  // cho trường hợp rỗng — sửa nửa vời còn khó thấy hơn không sửa, vì mã đọc vào
  // trông như đã được chặn.
  if (!exercisesLen) return <KhongCoCau ten="câu trắc nghiệm" />;

  if (qIdx >= exercisesLen) {
    return (
      <div className="text-center font-black text-3xl mt-10">
        Điểm của bạn: {score}/{exercisesLen} <br/>
        <MasteryVerdict evidence={verdict} />
        <Btn3D onClick={replay} className="mt-6">Làm Lại</Btn3D>
      </div>
    );
  }

  if (!curr) return <KhongCoCau ten="câu trắc nghiệm" />;

  return (
    <div className="bg-white rounded-[3rem] border-[4px] border-slate-800 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b]">
       <div className="flex justify-between items-center font-black mb-8 text-xl border-b-4 border-slate-100 pb-4 border-dashed">
          <span className="flex items-center gap-2"><PenTool className="text-emerald-500"/> Làm Test</span>
          <span className="bg-yellow-300 border-2 border-slate-800 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b]">{qIdx+1}/{exercisesLen}</span>
       </div>
       <p className="font-black text-3xl mb-8 leading-relaxed">{curr.q}</p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {phuongAn.map((o, i) => (
             <button 
               key={i} 
               disabled={status !== 'idle'} 
               onClick={() => setSel(o)} 
               className={`p-5 rounded-2xl border-[4px] text-2xl font-bold text-left transition-all ${sel === o ? 'border-indigo-600 bg-indigo-100 shadow-[3px_3px_0px_0px_#4f46e5] translate-y-1 border-b-[4px]' : 'border-slate-800 bg-white hover:bg-slate-50 shadow-[4px_4px_0px_0px_#1e293b] border-b-[8px]'}`}
             >
                {o}
             </button>
          ))}
       </div>
       <div className="flex gap-4">
         {status === 'idle' ? <Btn3D onClick={check} disabled={!sel} color="bg-slate-800 text-white w-full text-2xl">Kiểm Tra</Btn3D> 
                            : <Btn3D onClick={next} color="bg-emerald-400 text-slate-900 w-full text-2xl flex items-center justify-center gap-2">Tiếp Theo <ChevronRight size={24} /></Btn3D>}
       </div>
       {status === 'false' && <p className="text-rose-600 font-black mt-6 text-2xl animate-shake">Sai rồi. Đáp án đúng: <span className="underline">{curr.a}</span></p>}
       {status === 'true' && <p className="text-emerald-600 font-black mt-6 text-2xl flex items-center gap-2">Chính xác! <Sparkles size={24} className="text-yellow-500 fill-yellow-500 animate-pulse" /></p>}
    </div>
  );
};

export default QuizEngine;
