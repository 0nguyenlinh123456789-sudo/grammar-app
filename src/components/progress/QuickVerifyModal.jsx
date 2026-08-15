// File: src/components/progress/QuickVerifyModal.jsx
// #1b — BÀI XÁC MINH NHANH 5 CÂU cho chặng đã hoàn thành từ bản cũ.
//
// Người dùng cũ hoàn thành chặng bằng cách BẤM NÚT (bản trước hạng mục #1 không
// đo độ chính xác). Không ai bị hạ tiến độ vì chuyện đó — nhưng muốn chặng được
// tính vào chứng nhận thì cần một bằng chứng nhỏ. Đây là bằng chứng nhỏ đó:
// 5 câu lấy từ chính nội dung của chặng, đạt ≥4/5 là xong.
//
// Dữ liệu nạp NGAY TẠI ĐÂY (import động) vì màn hình lộ trình không giữ sẵn kho
// ngữ pháp/từ vựng — không kéo cả kho vào trang chủ chỉ để vẽ một cái nút.
import { useState, useEffect, useCallback, useRef } from 'react';
import { X, CheckCircle2, XCircle, ShieldCheck, RotateCcw, BookOpen } from 'lucide-react';
import { buildQuickVerify, hasQuickVerifySupply } from '../../utils/quickVerify';
import { buildQuickVerifyEvidence, QUICK_VERIFY_SIZE, QUICK_VERIFY_PASS } from '../../utils/mastery';
import { sanitizeVocabTopics, sanitizeBook } from '../../utils/contentFilter';
import { playCorrect, playWrong, playComplete } from '../../utils/sound';

async function loadSource(milestone) {
  if (milestone.type === 'grammar') {
    const mod = await import('../../data/grammarData');
    return (mod.parsedGrammarData || []).find((t) => t.id === milestone.targetId) || null;
  }
  if (milestone.type === 'vstep') {
    const mod = await import('../../data/vocabVstepData');
    // Lọc runtime y như lúc học, để bài xác minh không dùng nội dung đã bị chặn.
    // Tìm theo id đầu tiên khớp: lưới chống trùng id trong App giữ NGUYÊN id cho
    // bản đầu tiên, nên bản đầu tiên chính là bản mà lộ trình trỏ tới.
    return sanitizeVocabTopics(mod.default || []).find((t) => t.id === milestone.targetId) || null;
  }
  if (milestone.type === 'oxford') {
    // Nạp ĐÚNG quyển sách của chặng. Ba quyển cộng lại ~9MB nên không nạp cả ba
    // chỉ để lấy một unit. So sánh id lỏng (==) có chủ ý: sách Elementary đánh
    // id bằng SỐ, hai quyển kia bằng CHUỖI.
    const same = (a, b) => String(a) === String(b);
    const units = await loadOxfordUnits(milestone.bookId);
    return units.find((u) => same(u.id, milestone.targetId)) || null;
  }
  return null;
}

async function loadOxfordUnits(bookId) {
  if (bookId === 'elementary') {
    const [a, b, c] = await Promise.all([
      import('../../data/oxfordData'), import('../../data/oxfordDataPart2'), import('../../data/oxfordDataPart3'),
    ]);
    return sanitizeBook([...a.courseData, ...b.courseData, ...c.courseData]);
  }
  if (bookId === 'pre_intermediate') {
    const [a, b, c] = await Promise.all([
      import('../../data/oxfordPreIntData'), import('../../data/oxfordPreIntData51_75'), import('../../data/oxfordPreIntData76_100'),
    ]);
    return sanitizeBook([...a.courseData, ...b.courseData51_75, ...c.courseData76_100]);
  }
  const [a, b, c, d] = await Promise.all([
    import('../../data/oxfordAdvancedData1_25'), import('../../data/oxfordAdvancedData26_50'),
    import('../../data/oxfordAdvancedData51_75'), import('../../data/oxfordAdvancedData76_100'),
  ]);
  return sanitizeBook([...a.courseData1_25, ...b.courseData26_50, ...c.courseData51_75, ...d.courseData76_100]);
}

const QuickVerifyModal = ({ milestone, onClose, onFinish, onStudyAgain }) => {
  const [state, setState] = useState('loading'); // loading | ready | nodata | error | done
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [evidence, setEvidence] = useState(null);
  const sourceRef = useRef(null);
  const reportedRef = useRef(false);

  const start = useCallback((source) => {
    const qs = buildQuickVerify(milestone.type, source, QUICK_VERIFY_SIZE);
    if (qs.length === 0) { setState('nodata'); return; }
    setQuestions(qs);
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setEvidence(null);
    reportedRef.current = false;
    setState('ready');
  }, [milestone.type]);

  useEffect(() => {
    let cancelled = false;
    loadSource(milestone).then((source) => {
      if (cancelled) return;
      sourceRef.current = source;
      if (!source || !hasQuickVerifySupply(milestone.type, source)) { setState('nodata'); return; }
      start(source);
    }).catch(() => { if (!cancelled) setState('error'); });
    return () => { cancelled = true; };
  }, [milestone, start]);

  const cur = questions[idx];

  const choose = (opt) => {
    if (picked !== null) return;
    setPicked(opt);
    const ok = opt === cur.answer;
    const nextCorrect = correctCount + (ok ? 1 : 0);
    if (ok) { setCorrectCount(nextCorrect); playCorrect(); } else { playWrong(); }
    setTimeout(() => {
      if (idx < questions.length - 1) {
        setIdx(idx + 1);
        setPicked(null);
      } else {
        const result = buildQuickVerifyEvidence(nextCorrect, questions.length);
        setEvidence(result);
        setState('done');
        playComplete();
        if (!reportedRef.current) { reportedRef.current = true; onFinish?.(result); }
      }
    }, 900);
  };

  const shell = (children) => (
    <div className="fixed inset-0 z-[130] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Xác minh nhanh">
      <section className="w-full max-w-lg bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000]">
        <div className="flex items-start gap-3 mb-5">
          <ShieldCheck className="text-emerald-600 shrink-0" size={26} />
          <div className="flex-1">
            <h3 className="text-lg font-black uppercase leading-tight text-slate-900 dark:text-slate-100">Xác minh nhanh</h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">{milestone.title}</p>
          </div>
          <button onClick={onClose} aria-label="Đóng" className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"><X size={22} /></button>
        </div>
        {children}
      </section>
    </div>
  );

  if (state === 'loading') {
    return shell(
      <p className="py-10 text-center font-black text-slate-400 flex items-center justify-center gap-3">
        <span className="inline-block w-5 h-5 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></span>
        Đang tải câu hỏi...
      </p>
    );
  }

  if (state === 'error') {
    return shell(
      <p className="py-8 text-center font-bold text-rose-600 dark:text-rose-400">
        Không tải được nội dung của chặng này. Kiểm tra kết nối rồi mở lại nhé.
      </p>
    );
  }

  // Thiếu nguyên liệu thì BÁO, không hạ số câu rồi vẫn gọi là đã xác minh.
  if (state === 'nodata') {
    return shell(
      <div className="py-4 text-center">
        <p className="font-black text-slate-700 dark:text-slate-200">Chặng này chưa đủ {QUICK_VERIFY_SIZE} câu hỏi để xác minh nhanh.</p>
        <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">
          Bạn vẫn giữ nguyên trạng thái hoàn thành. Học lại chặng và làm hết bài tập cũng chuyển sang đã xác minh.
        </p>
        <button onClick={() => { onStudyAgain?.(milestone); onClose?.(); }} className="mt-5 px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-black text-sm border-3 border-slate-800 inline-flex items-center gap-2 cursor-pointer">
          <BookOpen size={16} /> Mở chặng này
        </button>
      </div>
    );
  }

  if (state === 'done' && evidence) {
    const passed = evidence.passed;
    return shell(
      <div className="py-2 text-center">
        <p className="text-5xl mb-3">{passed ? '🎉' : '💪'}</p>
        <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Đúng {evidence.correct}/{evidence.total} câu
        </p>
        {passed ? (
          <div className="mt-4 px-5 py-4 rounded-2xl border-[3px] border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <p className="font-black">✅ Đã xác minh! Chặng này nay được tính vào chứng nhận.</p>
          </div>
        ) : (
          <div className="mt-4 px-5 py-4 rounded-2xl border-[3px] border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 font-bold text-sm text-left">
            <p className="font-black">Cần đúng ít nhất {QUICK_VERIFY_PASS}/{QUICK_VERIFY_SIZE} câu.</p>
            <p className="mt-1 font-bold opacity-90">
              Chặng vẫn được giữ là đã hoàn thành, không mất tiến độ nào. Làm lại bao nhiêu lần cũng được.
            </p>
          </div>
        )}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          {!passed && (
            <button onClick={() => start(sourceRef.current)} className="px-5 py-2.5 rounded-2xl bg-yellow-300 text-slate-900 font-black text-sm border-3 border-slate-800 shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer">
              <RotateCcw size={16} /> Thử lại 5 câu khác
            </button>
          )}
          {!passed && (
            <button onClick={() => { onStudyAgain?.(milestone); onClose?.(); }} className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-black text-sm border-3 border-slate-800 inline-flex items-center gap-2 cursor-pointer">
              <BookOpen size={16} /> Học lại chặng
            </button>
          )}
          <button onClick={onClose} className="px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-black text-sm border-3 border-slate-800 dark:border-slate-600 cursor-pointer">
            Đóng
          </button>
        </div>
      </div>
    );
  }

  return shell(
    <div>
      <div className="flex gap-1 mb-5">
        {questions.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full ${i < idx ? 'bg-emerald-400' : i === idx ? 'bg-yellow-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
        ))}
      </div>
      <p className="text-xs font-black uppercase text-slate-400 mb-2">Câu {idx + 1}/{questions.length}</p>
      <p className="text-lg font-black text-slate-900 dark:text-slate-100 leading-snug mb-5">{cur.prompt}</p>
      <div className="grid gap-2.5">
        {cur.options.map((opt, i) => {
          const isPicked = picked === opt;
          let cls = 'bg-white dark:bg-slate-800 border-slate-800 dark:border-slate-600 hover:bg-yellow-50 dark:hover:bg-slate-700';
          if (picked !== null) {
            if (opt === cur.answer) cls = 'bg-emerald-200 dark:bg-emerald-900/50 border-emerald-600 text-emerald-900 dark:text-emerald-200';
            else if (isPicked) cls = 'bg-rose-200 dark:bg-rose-900/50 border-rose-600 text-rose-900 dark:text-rose-200';
            else cls = 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-60';
          }
          return (
            <button
              key={i}
              onClick={() => choose(opt)}
              disabled={picked !== null}
              className={`text-left p-3.5 rounded-2xl border-[3px] font-bold text-base transition-all flex items-center gap-2 ${cls} ${picked === null ? 'cursor-pointer active:translate-y-0.5' : 'cursor-default'}`}
            >
              {picked !== null && opt === cur.answer && <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />}
              {picked !== null && isPicked && opt !== cur.answer && <XCircle size={18} className="shrink-0 text-rose-600" />}
              {opt}
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-xs font-bold text-slate-400 text-center">
        Đúng ≥{QUICK_VERIFY_PASS}/{QUICK_VERIFY_SIZE} là chặng được đánh dấu đã xác minh. Không đạt cũng không mất gì.
      </p>
    </div>
  );
};

export default QuickVerifyModal;
