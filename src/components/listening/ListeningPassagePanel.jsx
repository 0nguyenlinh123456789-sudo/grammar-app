import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2, ExternalLink, Headphones, Pause, Play, RotateCcw, Trophy, X, XCircle } from 'lucide-react';
import { listeningPassages } from '../../data/listeningPassages';
import { playCorrect, playWrong, playComplete } from '../../utils/sound';

// BÀI NGHE THEO ĐOẠN (việc 2.2).
//
// Khác bài chép chính tả: ở đây người học nghe một đoạn 3–5 phút rồi trả lời
// câu hỏi HIỂU Ý. B2 đo khả năng theo dõi mạch nói, không đo việc nhận ra một
// từ lẻ — nên bản chép lời bị GIẤU cho tới khi trả lời xong.
//
// File âm thanh TRỎ THẲNG tới máy chủ VOA, không sao chép về kho: điều khoản
// của VOA nói nội dung của họ "may also contain" tư liệu bên thứ ba không thuộc
// phạm vi công cộng, nên trỏ tới thì ta không phát hành lại thứ mình không kiểm
// được. Cái giá phải trả là bài có thể không tải được — và khi đó PHẢI BÁO TO
// kèm đường dẫn tới trang gốc, tuyệt đối không để một nút phát chết lặng.
// Bốn loạt bài của VOA có tính chất khác hẳn nhau (giải đáp cách dùng từ, kể
// nguồn gốc thành ngữ, ngữ pháp, mẹo học), nên khi kho vượt 30 bài thì một
// danh sách phẳng bắt người học cuộn mãi. Lọc theo loạt, KHÔNG lọc theo bậc:
// các bài này không ai gắn bậc CEFR, đặt nhãn bậc lên là bịa — cùng lý do đã
// phân nhóm bản thu theo độ dài câu chứ không theo bậc (listeningPlan.js).
const CAC_LOAT = [...new Set(listeningPassages.map((b) => b.series))];

export default function ListeningPassagePanel({ onClose }) {
  const [baiId, setBaiId] = useState(null);
  const [loat, setLoat] = useState(null);
  const bai = listeningPassages.find((b) => b.id === baiId) || null;
  const danhSach = loat ? listeningPassages.filter((b) => b.series === loat) : listeningPassages;

  if (!bai) return <Khung onClose={onClose} tieuDe="Bài nghe theo đoạn">
    <p className="text-sm font-bold text-slate-500 mt-1 mb-4">
      Nghe một đoạn 3–5 phút rồi trả lời câu hỏi hiểu ý. Bản chép lời hiện ra sau khi bạn trả lời xong.
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {[null, ...CAC_LOAT].map((l) => <button
        key={l || 'tat-ca'}
        onClick={() => setLoat(l)}
        className={`px-3 py-1.5 rounded-xl text-xs font-black border-3 transition-all cursor-pointer ${
          loat === l
            ? 'border-cyan-500 bg-cyan-500 text-white'
            : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'
        }`}
      >
        {l || `Tất cả (${listeningPassages.length})`}
      </button>)}
    </div>
    <div className="grid gap-3">
      {danhSach.map((b) => <button
        key={b.id}
        onClick={() => setBaiId(b.id)}
        className="text-left p-4 rounded-2xl border-3 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:border-cyan-500 transition-all cursor-pointer"
      >
        <p className="text-[10px] font-black uppercase tracking-wide text-cyan-700 dark:text-cyan-400">{b.series}</p>
        <p className="font-black mt-0.5">{b.title}</p>
        <p className="text-xs font-bold text-slate-500 mt-1">
          khoảng {Math.round(b.secondsEstimated / 60)} phút · {b.words} từ · {b.questions.length} câu hỏi
        </p>
      </button>)}
    </div>
    <GhiCong danhSach={listeningPassages} />
  </Khung>;

  return <BaiNghe key={bai.id} bai={bai} onBack={() => setBaiId(null)} onClose={onClose} />;
}

function BaiNghe({ bai, onBack, onClose }) {
  const audioRef = useRef(null);
  const [dangPhat, setDangPhat] = useState(false);
  const [loiTai, setLoiTai] = useState(false);
  const [idx, setIdx] = useState(0);
  const [chon, setChon] = useState(null);
  const [dung, setDung] = useState(0);
  const [xong, setXong] = useState(false);

  const cau = bai.questions[idx];

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el || loiTai) return;
    if (el.paused) { el.play().then(() => setDangPhat(true)).catch(() => setLoiTai(true)); }
    else { el.pause(); setDangPhat(false); }
  };

  const traLoi = (opt) => {
    if (chon !== null) return;
    setChon(opt);
    const ok = opt === cau.a;
    if (ok) { setDung((n) => n + 1); playCorrect(); } else playWrong();
  };

  const tiep = () => {
    if (idx < bai.questions.length - 1) { setIdx(idx + 1); setChon(null); }
    else { playComplete(); setXong(true); audioRef.current?.pause(); setDangPhat(false); }
  };

  return <Khung onClose={onClose} tieuDe={bai.title} phu={bai.series} onBack={onBack}>
    <audio
      ref={audioRef}
      src={bai.audioUrl}
      preload="none"
      onError={() => { setLoiTai(true); setDangPhat(false); }}
      onEnded={() => setDangPhat(false)}
    />

    {loiTai
      ? <div className="mt-4 rounded-2xl border-3 border-amber-500 bg-amber-50 dark:bg-amber-950/30 p-4">
          <p className="font-black text-amber-800 dark:text-amber-300 flex items-center gap-2"><AlertTriangle size={18} /> Không tải được bản thu từ VOA</p>
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-1">
            Bản thu nằm trên máy chủ của VOA, không nằm trong ứng dụng. Có thể mạng đang chặn hoặc VOA đã đổi đường dẫn.
            Bạn vẫn làm được câu hỏi bằng bản chép lời bên dưới.
          </p>
          <a href={bai.sourceUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 mt-2 text-xs font-black underline text-amber-800 dark:text-amber-300">
            Mở trang gốc trên VOA <ExternalLink size={13} />
          </a>
        </div>
      : <div className="mt-4 flex flex-wrap items-center gap-3">
          <button onClick={toggle} className="px-6 h-16 rounded-2xl bg-cyan-300 hover:bg-cyan-400 border-4 border-black font-black flex items-center gap-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] cursor-pointer">
            {dangPhat ? <><Pause size={22} /> Tạm dừng</> : <><Play size={22} /> Nghe</>}
          </button>
          <button onClick={() => { if (audioRef.current) { audioRef.current.currentTime = 0; } }} className="px-4 h-16 rounded-2xl border-3 border-slate-400 font-black inline-flex items-center gap-1.5 cursor-pointer"><RotateCcw size={17} /> Nghe lại từ đầu</button>
          <p className="text-xs font-bold text-slate-400">khoảng {Math.round(bai.secondsEstimated / 60)} phút · nghe lại bao nhiêu lần cũng được</p>
        </div>}

    {loiTai && <BanChepLoi bai={bai} />}

    {!xong && <div className="mt-7">
      <div className="flex justify-between text-xs font-black text-slate-500">
        <span>Câu {idx + 1}/{bai.questions.length}</span>
        <span>Đúng {dung}</span>
      </div>
      <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-700 mt-2 overflow-hidden">
        <div className="h-full bg-cyan-500 transition-all" style={{ width: `${((idx + (chon !== null ? 1 : 0)) / bai.questions.length) * 100}%` }} />
      </div>
      <h3 className="text-lg md:text-xl font-black mt-5 leading-snug">{cau.q}</h3>
      <div className="grid gap-2.5 mt-4">
        {cau.opts.map((o) => {
          let cls = 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-cyan-400 cursor-pointer';
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
        {/* Giải thích DẪN THẲNG câu trong bản chép lời, để người học kiểm lại
            được chứ không phải tin lời máy. */}
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
        <p className="text-sm font-bold text-slate-500 mt-1">Giờ đọc lại bản chép lời và nghe thêm một lần nữa — đó là lúc vào tai nhiều nhất.</p>
      </div>
      {!loiTai && <BanChepLoi bai={bai} />}
      <button onClick={onBack} className="mt-5 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black cursor-pointer">Chọn bài khác</button>
    </div>}

    <GhiCong danhSach={[bai]} />
  </Khung>;
}

function BanChepLoi({ bai }) {
  return <div className="mt-6">
    <p className="text-xs font-black uppercase tracking-wide text-slate-400 flex items-center gap-1.5 mb-2"><BookOpen size={14} /> Bản chép lời</p>
    <div className="max-h-72 overflow-y-auto rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4 space-y-2 bg-slate-50 dark:bg-slate-800">
      {bai.transcript.map((p, i) => <p key={i} className="text-sm font-medium leading-relaxed">{p}</p>)}
    </div>
    {bai.glossary.length > 0 && <>
      <p className="text-xs font-black uppercase tracking-wide text-slate-400 mt-4 mb-1">Từ khó (theo VOA)</p>
      <ul className="space-y-1">
        {bai.glossary.map((g) => <li key={g.word} className="text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="font-black">{g.word}</span> <span className="text-slate-400">({g.pos})</span> — {g.meaning}
        </li>)}
      </ul>
    </>}
  </div>;
}

// VOA yêu cầu ghi công: "Credit for any use of VOA material should be given to
// voanews.com, Voice of America, or VOA."
function GhiCong({ danhSach }) {
  const nguon = [...new Set(danhSach.map((b) => b.source))];
  return <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-700">
    <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Nguồn</p>
    <p className="text-[11px] font-bold text-slate-500 mt-1">
      {nguon.join(', ')} · thuộc phạm vi công cộng. Bản thu phát trực tiếp từ máy chủ VOA, không sao chép vào ứng dụng.
    </p>
    {danhSach.length === 1 && <a href={danhSach[0].sourceUrl} target="_blank" rel="noreferrer noopener" className="text-[11px] font-bold text-slate-500 underline inline-flex items-center gap-1 mt-0.5">
      Trang gốc <ExternalLink size={11} />
    </a>}
  </div>;
}

function Khung({ children, onClose, onBack, tieuDe, phu }) {
  return <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="passage-title">
    <section className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-cyan-200 border-3 border-slate-900 flex items-center justify-center shrink-0"><Headphones className="text-cyan-800" /></div>
          <div className="min-w-0">
            <p className="text-xs font-black text-cyan-700 uppercase tracking-widest truncate">{phu || 'Luyện nghe'}</p>
            <h2 id="passage-title" className="text-xl md:text-2xl font-black leading-tight">{tieuDe}</h2>
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
