// File: src/components/reading/ReadingLongPanel.jsx
// VĂN BẢN ĐỌC DÀI 600–1.000 TỪ (việc 5.3) — đường lên C1 đọc bài báo thật.
//
// Khác bài nghe theo đoạn ở một điểm cốt lõi: đây là bài ĐỌC, nên văn bản hiện
// ra NGAY — không có gì để giấu. Câu hỏi hiểu ý nằm SAU bài; người học đọc
// xong, cuộn xuống trả lời, và được phép cuộn ngược lên đọc lại (thi đọc thật
// cũng cho lật lại bài).
//
// `audioUrl` (nếu bài có bản thu) chỉ là tuỳ chọn nghe kèm, trỏ thẳng máy chủ
// VOA — hỏng thì im lặng giấu nút, KHÔNG chặn bài đọc: nội dung chính (văn
// bản) đã nằm trong ứng dụng rồi, không có gì phải "báo to" như bài nghe.
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpenText, CheckCircle2, ExternalLink, Pause, Play, Trophy, X, XCircle } from 'lucide-react';
import { readingTexts } from '../../data/readingTexts';
import { playCorrect, playWrong, playComplete } from '../../utils/sound';
import { tronPhuongAn } from '../../utils/tronPhuongAn';

const CAC_MUC = [...new Set(readingTexts.map((b) => b.series))];

// ~200 từ/phút là tốc độ đọc hiểu (không phải đọc lướt) — cùng hằng số mà
// build_roadmap.mjs dùng để tính giờ bài đọc. Hai nơi cùng một giả định.
const phutDoc = (words) => Math.max(1, Math.round(words / 200));

// `moBaiId` + `onXong` là đường vào TỪ LỘ TRÌNH (chặng đọc dài): mở thẳng đúng
// bài của chặng và báo điểm về để ghi bằng chứng. Mở từ nút trang chủ thì hai
// prop này để trống và panel hoạt động y như trước.
export default function ReadingLongPanel({ onClose, moBaiId = null, onXong }) {
  const [baiId, setBaiId] = useState(moBaiId);
  const [muc, setMuc] = useState(null);
  const bai = readingTexts.find((b) => b.id === baiId) || null;
  const danhSach = muc ? readingTexts.filter((b) => b.series === muc) : readingTexts;

  // Chặng trỏ tới bài không còn trong kho: BÁO, không lặng lẽ mở danh sách.
  const baiChangMat = moBaiId && !readingTexts.some((b) => b.id === moBaiId);

  if (!bai) return <Khung onClose={onClose} tieuDe="Đọc bài dài">
    {baiChangMat && <p className="text-sm font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-3 border-amber-300 dark:border-amber-800 rounded-2xl p-3 mb-4">
      ⚠️ Bài đọc của chặng này (<code>{moBaiId}</code>) <b>không còn trong kho</b>. Đây là lỗi dữ liệu, không phải bạn bấm sai. Chọn một bài khác bên dưới trong lúc chờ sửa.
    </p>}
    <p className="text-sm font-bold text-slate-500 mt-1 mb-4">
      Bài báo thật của VOA, 600–1.000 từ — độ dài của bài đọc trong đề thi B2–C1. Đọc hết rồi trả lời câu hỏi hiểu ý; được phép đọc lại bài trong lúc trả lời.
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {[null, ...CAC_MUC].map((m) => <button
        key={m || 'tat-ca'}
        onClick={() => setMuc(m)}
        className={`px-3 py-1.5 rounded-xl text-xs font-black border-3 transition-all cursor-pointer ${
          muc === m
            ? 'border-teal-500 bg-teal-500 text-white'
            : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'
        }`}
      >
        {m || `Tất cả (${readingTexts.length})`}
      </button>)}
    </div>
    <div className="grid gap-3">
      {danhSach.map((b) => <button
        key={b.id}
        onClick={() => setBaiId(b.id)}
        className="text-left p-4 rounded-2xl border-3 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:border-teal-500 transition-all cursor-pointer"
      >
        <p className="text-[10px] font-black uppercase tracking-wide text-teal-700 dark:text-teal-400">{b.series}</p>
        <p className="font-black mt-0.5">{b.title}</p>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {b.words} từ · đọc khoảng {phutDoc(b.words)} phút · {b.questions.length} câu hỏi
        </p>
      </button>)}
    </div>
    <GhiCong danhSach={readingTexts} />
  </Khung>;

  return <BaiDoc key={bai.id} bai={bai} onBack={() => setBaiId(null)} onClose={onClose} onXong={onXong} />;
}

function BaiDoc({ bai, onBack, onClose, onXong }) {
  const audioRef = useRef(null);
  const [dangPhat, setDangPhat] = useState(false);
  const [loiAudio, setLoiAudio] = useState(false);
  const [idx, setIdx] = useState(0);
  const [chon, setChon] = useState(null);
  const [dung, setDung] = useState(0);
  const [xong, setXong] = useState(false);

  const cau = bai.questions[idx];

  // Kho câu hỏi xếp đáp án đúng ở ô ĐẦU gần như mọi câu (đo được: bài đọc dài
  // 120/120, bài nghe 236/240), nên "cứ bấm ô đầu" là qua sạch mà không cần đọc
  // hay nghe. Trộn lúc vẽ, cố định theo khoá bài+câu để thứ tự không nhảy giữa
  // hai lần vẽ lại. Chấm ở đây so THEO GIÁ TRỊ (`opt === cau.a`) nên trộn xong
  // là xong, không phải ánh xạ lại đáp án.
  const phuongAn = useMemo(() => tronPhuongAn(`${bai.id}:${idx}`, cau.opts), [bai.id, idx, cau.opts]);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el || loiAudio) return;
    if (el.paused) { el.play().then(() => setDangPhat(true)).catch(() => setLoiAudio(true)); }
    else { el.pause(); setDangPhat(false); }
  };

  const traLoi = (opt) => {
    if (chon !== null) return;
    setChon(opt);
    if (opt === cau.a) { setDung((n) => n + 1); playCorrect(); } else playWrong();
  };

  const tiep = () => {
    if (idx < bai.questions.length - 1) { setIdx(idx + 1); setChon(null); }
    else {
      playComplete(); setXong(true);
      // `dung` đã tính cả câu cuối: nút "Xem kết quả" chỉ hiện sau khi người học
      // chọn đáp án, tức đã có một lượt vẽ lại giữa traLoi và tiep.
      onXong?.({ correct: dung, total: bai.questions.length, loaiCau: bai.questions.map(() => 'mcq') });
    }
  };

  return <Khung onClose={onClose} tieuDe={bai.title} phu={bai.series} onBack={onBack}>
    {bai.audioUrl && <audio ref={audioRef} src={bai.audioUrl} preload="none" onError={() => { setLoiAudio(true); setDangPhat(false); }} onEnded={() => setDangPhat(false)} />}

    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400">
      <span>{bai.words} từ · đọc khoảng {phutDoc(bai.words)} phút</span>
      {bai.audioUrl && !loiAudio && (
        <button onClick={toggle} className="px-3 py-1.5 rounded-xl border-3 border-slate-400 font-black inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 cursor-pointer">
          {dangPhat ? <><Pause size={14} /> Dừng bản thu</> : <><Play size={14} /> Nghe kèm (VOA)</>}
        </button>
      )}
    </div>

    <div className="mt-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4 md:p-5 space-y-3 bg-slate-50 dark:bg-slate-800">
      {bai.paragraphs.map((p, i) => <p key={i} className="text-[15px] font-medium leading-relaxed">{p}</p>)}
    </div>

    {bai.glossary.length > 0 && <details className="mt-3">
      <summary className="text-xs font-black uppercase tracking-wide text-slate-400 cursor-pointer">Từ khó (theo VOA) — {bai.glossary.length} từ</summary>
      <ul className="space-y-1 mt-2">
        {bai.glossary.map((g) => <li key={g.word} className="text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="font-black">{g.word}</span> <span className="text-slate-400">({g.pos})</span> — {g.meaning}
        </li>)}
      </ul>
    </details>}

    {!xong && <div className="mt-7">
      <div className="flex justify-between text-xs font-black text-slate-500">
        <span>Câu {idx + 1}/{bai.questions.length}</span>
        <span>Đúng {dung}</span>
      </div>
      <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-700 mt-2 overflow-hidden">
        <div className="h-full bg-teal-500 transition-all" style={{ width: `${((idx + (chon !== null ? 1 : 0)) / bai.questions.length) * 100}%` }} />
      </div>
      <h3 className="text-lg md:text-xl font-black mt-5 leading-snug">{cau.q}</h3>
      <div className="grid gap-2.5 mt-4">
        {phuongAn.map((o) => {
          let cls = 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-teal-400 cursor-pointer';
          if (chon !== null) {
            if (o === cau.a) cls = 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-600 text-emerald-900 dark:text-emerald-200';
            else if (o === chon) cls = 'bg-rose-100 dark:bg-rose-950/40 border-rose-600 text-rose-900 dark:text-rose-200';
            else cls = 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-60';
          }
          return <button key={o} onClick={() => traLoi(o)} disabled={chon !== null} className={`text-left p-3.5 rounded-2xl border-3 font-bold transition-all flex items-start gap-2 ${cls}`}>
            {chon !== null && o === cau.a && <CheckCircle2 size={17} className="shrink-0 mt-0.5 text-emerald-600" />}
            {chon !== null && o === chon && o !== cau.a && <XCircle size={17} className="shrink-0 mt-0.5 text-rose-600" />}
            {o}
          </button>;
        })}
      </div>
      {chon !== null && <>
        {/* Giải thích DẪN THẲNG câu trong bài, để người học kiểm lại được chứ
            không phải tin lời máy. */}
        <p className="mt-4 text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3">{cau.why}</p>
        <button onClick={tiep} className="mt-4 px-5 py-3 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer">
          {idx < bai.questions.length - 1 ? <>Câu tiếp theo <ArrowRight size={17} /></> : <>Xem kết quả <CheckCircle2 size={17} /></>}
        </button>
      </>}
    </div>}

    {xong && <div className="mt-7">
      <div className="text-center py-4">
        <Trophy size={50} className="mx-auto text-yellow-500 fill-yellow-300 mb-2" />
        <p className="text-2xl font-black">Đúng {dung}/{bai.questions.length}</p>
        <p className="text-sm font-bold text-slate-500 mt-1">Đọc lại những đoạn chứa câu bạn trả lời sai — phần giải thích dẫn đúng câu văn cần tìm.</p>
      </div>
      <button onClick={onBack} className="mt-5 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black cursor-pointer">Chọn bài khác</button>
    </div>}

    <GhiCong danhSach={[bai]} />
  </Khung>;
}

// VOA yêu cầu ghi công: "Credit for any use of VOA material should be given to
// voanews.com, Voice of America, or VOA."
function GhiCong({ danhSach }) {
  const nguon = [...new Set(danhSach.map((b) => b.source))];
  return <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-700">
    <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Nguồn</p>
    <p className="text-[11px] font-bold text-slate-500 mt-1">
      {nguon.join(', ')} · bài do VOA tự sản xuất, thuộc phạm vi công cộng. Bản thu (nếu có) phát trực tiếp từ máy chủ VOA.
    </p>
    {danhSach.length === 1 && <a href={danhSach[0].sourceUrl} target="_blank" rel="noreferrer noopener" className="text-[11px] font-bold text-slate-500 underline inline-flex items-center gap-1 mt-0.5">
      Trang gốc <ExternalLink size={11} />
    </a>}
  </div>;
}

function Khung({ children, onClose, onBack, tieuDe, phu }) {
  return <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="reading-title">
    <section className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-teal-200 border-3 border-slate-900 flex items-center justify-center shrink-0"><BookOpenText className="text-teal-800" /></div>
          <div className="min-w-0">
            <p className="text-xs font-black text-teal-700 uppercase tracking-widest truncate">{phu || 'Luyện đọc'}</p>
            <h2 id="reading-title" className="text-xl md:text-2xl font-black leading-tight">{tieuDe}</h2>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {onBack && <button onClick={onBack} aria-label="Quay lại" className="h-10 px-3 rounded-xl border-3 border-slate-800 font-black text-xs">← Danh sách</button>}
          <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 rounded-xl border-3 border-slate-800 flex items-center justify-center"><X size={18} /></button>
        </div>
      </header>
      {children}
    </section>
  </div>;
}
