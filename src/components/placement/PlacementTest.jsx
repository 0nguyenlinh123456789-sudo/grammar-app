import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Compass, Info, Lock, ShieldCheck, X } from 'lucide-react';
import { placementBank } from '../../data/placementBank';
import {
  createSession, currentQuestion, answerCurrent, placementResultFrom, progressOf, gioiHanGiay,
} from '../../utils/placementAdaptive';
import { CEFR_LABEL } from '../../utils/placement';
import { buildSkillProfile } from '../../utils/skillProfile';
import { tronThuTu } from '../../utils/tronPhuongAn';

const SKILL_VI = { grammar: 'Ngữ pháp', vocabulary: 'Từ vựng', reading: 'Đọc hiểu' };

// BÀI THÍCH ỨNG (việc 4.1) — khác bản cũ ở ba chỗ, cả ba đều có lý do:
//
// 1. KHÔNG có nút "Trước". Câu tiếp theo được chọn DỰA TRÊN câu vừa trả lời;
//    cho phép quay lại sửa thì nhánh đã đi rồi, và bài trở nên vô nghĩa mà
//    không báo gì. Thà khoá và nói rõ vì sao còn hơn để nó sai âm thầm.
// 2. KHÔNG có "Câu 3/50". Tổng số câu CHƯA BIẾT cho tới khi bài kết thúc
//    (12–24 câu tuỳ người trả lời). In một mẫu số bịa ra là nói dối ngay ở
//    màn hình đầu tiên.
// 3. Có màn hình KẾT QUẢ. Bản cũ đóng cái rụp rồi nhảy vào bài học, người làm
//    test không kịp thấy mình được xếp bậc nào và vì sao.
export default function PlacementTest({ onComplete, onClose }) {
  const [session, setSession] = useState(() => createSession(placementBank));
  const [chosen, setChosen] = useState(null);

  const question = currentQuestion(session);
  const progress = progressOf(session);
  const result = useMemo(() => (session.done ? placementResultFrom(session) : null), [session]);

  // TRỘN THỨ TỰ PHƯƠNG ÁN — ngân hàng này để 76% đáp án đúng ở hai ô đầu và
  // KHÔNG câu nào ở ô cuối, nên "cứ bấm hai ô trên" trúng ~50% thay vì 25%.
  // Bản vá 19/08 (`utils/tronPhuongAn.js`) đã dọn bốn kho khác nhưng BỎ SÓT kho
  // này, vì phép đo hồi đó chỉ đếm "đáp án ở ô ĐẦU" (48% — trông bình thường)
  // mà không nhìn phân bố đủ bốn ô. Đây là kho tai hại nhất để lọt: bậc đo sai
  // ở đây đẩy người học vào sai chỗ trong 710 chặng.
  //
  // Trộn CỐ ĐỊNH THEO ID CÂU: cùng một câu luôn ra cùng thứ tự, nên phương án
  // không nhảy chỗ giữa lúc đang đọc, mà mẹo "bấm ô đầu" thì chết hẳn.
  const thuTu = useMemo(
    () => (question ? tronThuTu(`placement:${question.id}`, question.options.length) : []),
    [question],
  );

  const submit = (chiSoGoc) => {
    // `null` = HẾT GIỜ. Bộ máy tính nó là sai (xem `answerCurrent`), và phải
    // truyền null chứ không phải 0 — `Number(null)` là 0 nên nhầm chỗ này là
    // chấm ĐÚNG cho mọi câu bỏ trống có đáp án ở ô đầu.
    const dap = chiSoGoc === undefined ? chosen : chiSoGoc;
    if (dap === undefined) return;
    setSession((s) => answerCurrent(s, dap));
    setChosen(null);
  };

  return <PlacementView
    session={session} question={question} progress={progress} result={result}
    chosen={chosen} setChosen={setChosen} thuTu={thuTu} submit={submit}
    onComplete={onComplete} onClose={onClose}
  />;
}

/** Đồng hồ đếm ngược của MỘT câu. Hết giờ thì tự nộp câu bỏ trống. */
function DongHo({ khoa, giay, onHetGio }) {
  const [conLai, setConLai] = useState(giay);

  // Đặt lại khi sang câu khác. `khoa` là id câu — đổi câu thì đồng hồ về đầu.
  useEffect(() => { setConLai(giay); }, [khoa, giay]);

  // ⚠️ `onHetGio` là hàm mới ở MỖI lần vẽ. Để nó trong mảng phụ thuộc thì mỗi
  // lần người học bấm chọn một phương án, effect chạy lại và `clearTimeout` cái
  // đang đếm dở → ai đổi ý vài lần trong một câu là đồng hồ đứng im mãi, không
  // lỗi nào bắn ra. Cùng họ lỗi với vòng lặp vẽ đã giết tab "Xếp Câu".
  const hetGioRef = useRef(onHetGio);
  useEffect(() => { hetGioRef.current = onHetGio; }, [onHetGio]);

  useEffect(() => {
    if (conLai <= 0) { hetGioRef.current?.(); return undefined; }
    const t = setTimeout(() => setConLai((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [conLai]);

  const gap = conLai <= 10;
  return <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 font-black tabular-nums ${gap ? 'bg-rose-100 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300' : 'bg-slate-100 dark:bg-slate-800 border-slate-400 text-slate-600 dark:text-slate-300'}`}>
    <Clock size={13} /> {conLai}s
  </span>;
}

function PlacementView({ session, question, progress, result, chosen, setChosen, thuTu, submit, onComplete, onClose }) {

  return <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="placement-title">
    <section className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-200 border-3 border-slate-900 flex items-center justify-center"><Compass className="text-blue-700" /></div>
          <div>
            <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Bản đồ năng lực</p>
            <h2 id="placement-title" className="text-2xl font-black">{session.done ? 'Kết quả đầu vào' : 'Kiểm tra đầu vào'}</h2>
          </div>
        </div>
        <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 rounded-xl border-3 border-slate-800 flex items-center justify-center shrink-0"><X size={18} /></button>
      </header>

      {session.done && result
        ? <ResultView result={result} onComplete={onComplete} />
        : question && <>
          <div className="mt-6 flex items-center justify-between gap-3 text-xs font-black text-slate-500">
            <span>Vòng {progress.round}/{progress.maxRounds} · đang thử bậc {progress.cefr}</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline">Đã trả lời {progress.answered} câu</span>
              <DongHo khoa={question.id} giay={gioiHanGiay(question)} onHetGio={() => submit(null)} />
            </div>
          </div>
          {progress.dangXacNhan && <p className="mt-2 text-[11px] font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck size={13} className="shrink-0" /> Vòng xác nhận — hỏi thêm ở bậc {progress.cefr} bằng những câu chưa dùng, để bậc chốt không phụ thuộc vào một câu may rủi.
          </p>}
          <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-700 mt-2 overflow-hidden">
            <div className="h-full bg-blue-500 transition-all" style={{ width: `${Math.round((progress.inRound / Math.max(1, progress.roundSize)) * 100)}%` }} />
          </div>
          {/* Nói trước độ dài để không ai tưởng bài này dài vô tận. */}
          <p className="mt-2 text-[11px] font-bold text-slate-400">
            Bài tự điều chỉnh độ khó: trả lời đúng thì lên bậc cao hơn, sai thì xuống bậc thấp hơn. Tổng cộng {progress.minQuestions}–{progress.maxQuestions} câu.
            Mỗi câu có giới hạn thời gian ({gioiHanGiay(question)} giây cho câu này) — hết giờ tính là chưa trả lời, để bậc đo ra là bậc của bạn chứ không phải của cuốn từ điển.
          </p>

          <p className="text-xs font-black uppercase text-slate-400 mt-8">{SKILL_VI[question.skill] || question.skill} · bậc {question.cefr}</p>
          <h3 className="text-xl md:text-2xl font-black mt-2 leading-snug">{question.prompt}</h3>

          {/* `thuTu` là THỨ TỰ CHỈ SỐ GỐC đã trộn. Nhãn A/B/C/D đi theo vị trí
              trên màn hình (`viTri`), còn thứ báo về bộ máy là chỉ số GỐC
              (`goc`) — nhờ vậy phần chấm điểm không phải biết gì về việc trộn. */}
          <div className="grid gap-3 mt-6">
            {thuTu.map((goc, viTri) => <button
              key={question.options[goc]}
              onClick={() => setChosen(goc)}
              className={`text-left p-4 rounded-2xl border-3 font-bold transition-all ${chosen === goc ? 'bg-blue-100 dark:bg-blue-950/50 border-blue-600 shadow-[3px_3px_0_0_#2563eb]' : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-400'}`}
            >
              <span className="inline-flex w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border-2 border-slate-400 items-center justify-center mr-2 text-xs font-black">{String.fromCharCode(65 + viTri)}</span>{question.options[goc]}
            </button>)}
          </div>

          <footer className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-8">
            <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5"><Lock size={13} className="shrink-0" /> Đã trả lời thì không quay lại được — câu sau chọn theo câu trước.</p>
            {/* `onClick={submit}` sẽ truyền SỰ KIỆN CLICK vào tham số đầu — mà
                tham số đó nay là "chỉ số phương án". Phải bọc lại. */}
            <button disabled={chosen === null} onClick={() => submit()} className="px-5 py-3 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] disabled:opacity-40 flex items-center justify-center gap-2 shrink-0">
              Xác nhận <ArrowRight size={17} />
            </button>
          </footer>
        </>}
    </section>
  </div>;
}

function ResultView({ result, onComplete }) {
  const profile = buildSkillProfile(result);
  return <>
    <div className="mt-6 rounded-2xl border-3 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-5 text-center">
      <p className="text-xs font-black uppercase tracking-widest text-slate-500">Bậc đạt được</p>
      <p className="text-4xl font-black mt-1">{result.cefr ? CEFR_LABEL[result.cefr] || result.cefr : 'Chưa qua vòng A1'}</p>
      {/* Phần trăm KHÔNG phải căn cứ xếp bậc — bài thích ứng luôn kéo mọi người
          về quanh 50–60% đúng. Nên nó đứng ở đây với đúng cái tên của nó. */}
      <p className="text-xs font-bold text-slate-500 mt-2">Đúng {result.correct}/{result.total} câu ({result.score}% — chỉ là tỉ lệ đúng, không phải căn cứ xếp bậc)</p>
      {result.hetGio > 0 && <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-1">
        Trong đó {result.hetGio} câu hết giờ trước khi bạn chọn — những câu đó tính là chưa trả lời. Nếu bậc thấp hơn bạn nghĩ, đây có thể là lý do.
      </p>}
    </div>

    {result.preA1 && <p className="mt-4 text-sm font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-400 rounded-2xl p-4">
      Bài test bắt đầu từ bậc A1 và bạn chưa qua vòng đó. Hãy bắt đầu ở cụm <b>A0 — Mất Gốc</b>: bảng chữ cái, cách đọc phiên âm, quy tắc phát âm. Đó là nền của mọi thứ phía sau.
    </p>}

    <div className="mt-5">
      <p className="text-xs font-black uppercase text-slate-500 mb-2">Từng vòng</p>
      <div className="flex flex-wrap gap-2">
        {result.rounds.map((r) => <span key={r.cefr} className={`px-3 py-1.5 rounded-xl border-2 text-xs font-black ${r.cleared ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 border-slate-400 text-slate-500'}`}>
          {r.cefr}: {r.correct}/{r.asked} {r.cleared ? '✓ qua' : '✗ chưa qua'}
        </span>)}
      </div>
    </div>

    <div className="mt-5 grid sm:grid-cols-3 gap-3">
      {profile.foundation.concat(profile.cefrSkills.filter((s) => s.measured)).map((s) => <div key={s.key} className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-3">
        <p className="text-[11px] font-black uppercase text-slate-500">{s.icon} {s.label}</p>
        <p className="text-lg font-black">{s.percent}% <span className="text-xs font-bold text-slate-400">({s.correct}/{s.total})</span></p>
        <p className="text-[11px] font-bold text-slate-400">{s.cefr ? `đúng hết ở bậc ${s.cefr}` : 'chưa đúng hết ở bậc nào'}</p>
      </div>)}
    </div>

    <p className="mt-4 text-[11px] font-bold text-slate-500 flex gap-1.5"><Info size={14} className="shrink-0 mt-px" />
      Bài này chỉ đo ngữ pháp, từ vựng và đọc hiểu. Nghe, nói và viết chưa đo được — xem lý do ở mục “Hồ sơ năng lực” trong Báo cáo tiến bộ.
    </p>

    <button onClick={() => onComplete?.(result)} className="mt-6 w-full px-5 py-3.5 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] flex items-center justify-center gap-2">
      Vào chặng phù hợp <CheckCircle2 size={18} />
    </button>
  </>;
}
