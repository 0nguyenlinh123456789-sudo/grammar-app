import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Ear, Headphones, Lightbulb, RefreshCw, Trophy, X } from 'lucide-react';
import { audioManifest } from '../../data/audioManifest';
import { chamChinhTa, goiY, NGUONG_DAT } from '../../utils/dictation';
import { dongGhiCong } from '../../utils/audioLicense';
import { playCorrect, playWrong, playComplete } from '../../utils/sound';

const SO_CAU = 5;

// NGHE CHÉP CHÍNH TẢ (việc 2.3) — bài đầu tiên trong app dùng GIỌNG NGƯỜI THẬT.
//
// Khác mọi phần luyện nghe hiện có ở một điểm: nguồn âm thanh là file MP3 do
// người thật thu, không phải speechSynthesis. Vì thế nó KHÔNG mang nhãn
// "giọng máy đọc" — và cũng vì thế nó phải ghi công tác giả: các bản thu ở đây
// là CC BY 4.0, thiếu dòng ghi công là vi phạm giấy phép.
export default function DictationPanel({ onClose, onFinish }) {
  // Bốc bộ câu trong useEffect chứ không trong thân hàm render: Math.random gọi
  // lúc render là hàm không thuần, mỗi lần React vẽ lại có thể ra một bộ khác.
  const [bo, setBo] = useState([]);
  useEffect(() => {
    const list = [...audioManifest];
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    setBo(list.slice(0, SO_CAU));
  }, []);

  const [idx, setIdx] = useState(0);
  const [go, setGo] = useState('');
  const [ketQua, setKetQua] = useState(null);
  const [hienGoiY, setHienGoiY] = useState(false);
  const [diem, setDiem] = useState([]);
  const [xong, setXong] = useState(false);
  const audioRef = useRef(null);

  const cur = bo[idx];

  const phat = useCallback((rate = 1) => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = rate;
    el.currentTime = 0;
    el.play().catch(() => { /* trình duyệt chặn tự phát — người học bấm lại */ });
  }, []);

  useEffect(() => { setGo(''); setKetQua(null); setHienGoiY(false); }, [idx]);

  if (!cur) {
    return <Khung onClose={onClose}>
      <p className="text-center font-bold text-slate-500 py-10">Chưa có bản thu giọng người thật nào trong kho.</p>
    </Khung>;
  }

  const nop = () => {
    if (ketQua) return;
    const r = chamChinhTa(cur.text, go);
    setKetQua(r);
    if (r.passed) playCorrect(); else playWrong();
  };

  const tiep = () => {
    const moi = [...diem, ketQua];
    setDiem(moi);
    if (idx < bo.length - 1) setIdx(idx + 1);
    else {
      playComplete();
      setXong(true);
      const dat = moi.filter((r) => r?.passed).length;
      onFinish?.({ correct: dat, total: moi.length, percent: Math.round((dat / moi.length) * 100) });
    }
  };

  if (xong) {
    const dat = diem.filter((r) => r?.passed).length;
    return <Khung onClose={onClose}>
      <div className="text-center py-6">
        <Trophy size={56} className="mx-auto text-yellow-500 fill-yellow-300 mb-3" />
        <h3 className="text-2xl font-black">Xong buổi chép chính tả</h3>
        <p className="text-lg font-bold text-slate-500 mt-1">Đạt {dat}/{diem.length} câu (ngưỡng {Math.round(NGUONG_DAT * 100)}% số từ mỗi câu)</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-3 rounded-2xl bg-cyan-400 border-4 border-black font-black inline-flex items-center gap-2"><RefreshCw size={18} /> Làm bộ khác</button>
      </div>
      <GhiCong danhSach={bo} />
    </Khung>;
  }

  return <Khung onClose={onClose}>
    <div className="flex items-center justify-between text-xs font-black text-slate-500">
      <span>Câu {idx + 1}/{bo.length}</span>
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-700 dark:text-emerald-300"><Ear size={12} /> Giọng người thật</span>
    </div>
    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-700 mt-2 overflow-hidden">
      <div className="h-full bg-cyan-500 transition-all" style={{ width: `${((idx + (ketQua ? 1 : 0)) / bo.length) * 100}%` }} />
    </div>

    <audio ref={audioRef} src={`/audio/${cur.file}`} preload="auto" />
    <div className="flex justify-center gap-3 mt-7">
      <button onClick={() => phat(1)} className="px-6 h-16 rounded-2xl bg-cyan-300 hover:bg-cyan-400 border-4 border-black font-black flex items-center gap-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] cursor-pointer"><Headphones size={24} /> Nghe</button>
      <button onClick={() => phat(0.6)} className="px-5 h-16 rounded-2xl bg-amber-200 hover:bg-amber-300 border-4 border-black font-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] cursor-pointer">Chậm 0,6×</button>
    </div>
    <p className="text-center text-[11px] font-bold text-slate-400 mt-2">Nghe lại bao nhiêu lần cũng được. Gõ lại đúng những gì bạn nghe.</p>

    <textarea
      value={go}
      onChange={(e) => setGo(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ketQua ? tiep() : nop(); } }}
      disabled={!!ketQua}
      rows={2}
      placeholder="Gõ câu bạn vừa nghe…"
      className="w-full mt-5 p-4 rounded-2xl border-3 border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 font-bold text-lg disabled:opacity-70"
    />

    {!ketQua && <div className="flex flex-wrap gap-2 mt-3">
      <button onClick={nop} disabled={!go.trim()} className="px-5 py-3 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] disabled:opacity-40 cursor-pointer">Nộp bài</button>
      <button onClick={() => setHienGoiY(true)} className="px-4 py-3 rounded-xl border-3 border-slate-400 font-black text-slate-600 dark:text-slate-300 inline-flex items-center gap-1.5 cursor-pointer"><Lightbulb size={16} /> Gợi ý</button>
    </div>}

    {hienGoiY && !ketQua && <p className="mt-3 font-mono font-black tracking-wider text-slate-500">{goiY(cur.text)}</p>}

    {ketQua && <div className="mt-5">
      <p className={`font-black text-lg ${ketQua.passed ? 'text-emerald-600' : 'text-amber-600'}`}>
        {ketQua.passed ? '✓ Đạt' : '△ Chưa đạt'} — đúng {ketQua.correct}/{ketQua.total} từ ({ketQua.percent}%)
      </p>
      <p className="flex flex-wrap gap-x-2 gap-y-1 mt-3 text-lg font-bold">
        {ketQua.items.map((m, i) => {
          if (m.type === 'dung') return <span key={i} className="text-emerald-700 dark:text-emerald-400">{m.expected}</span>;
          if (m.type === 'thieu') return <span key={i} className="text-rose-600 underline decoration-dashed">{m.expected}</span>;
          if (m.type === 'thua') return <span key={i} className="text-slate-400 line-through">{m.typed}</span>;
          return <span key={i} className="text-rose-600">{m.expected}<span className="text-slate-400 text-sm"> (bạn gõ: {m.typed})</span></span>;
        })}
      </p>
      <p className="text-[11px] font-bold text-slate-400 mt-2">Gạch chân nét đứt = bỏ sót · gạch ngang = gõ thừa · đỏ = nghe nhầm. Dấu câu và chữ hoa không tính.</p>
      <button onClick={tiep} className="mt-5 px-5 py-3 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer">
        {idx < bo.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'} <CheckCircle2 size={17} />
      </button>
    </div>}

    <GhiCong danhSach={[cur]} />
  </Khung>;
}

// CC BY 4.0 BẮT BUỘC ghi công. Dòng này không phải phần trang trí — thiếu nó là
// đang dùng bản thu trái giấy phép.
function GhiCong({ danhSach }) {
  return <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-700">
    <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Nguồn bản thu</p>
    <ul className="mt-1 space-y-0.5">
      {danhSach.map((e) => <li key={e.id} className="text-[11px] font-bold text-slate-500">
        <a href={e.attributionUrl || e.sourceUrl} target="_blank" rel="noreferrer noopener" className="underline">{dongGhiCong(e)}</a>
      </li>)}
    </ul>
  </div>;
}

function Khung({ children, onClose }) {
  return <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="dictation-title">
    <section className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
      <header className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-200 border-3 border-slate-900 flex items-center justify-center"><Headphones className="text-cyan-800" /></div>
          <div>
            <p className="text-xs font-black text-cyan-700 uppercase tracking-widest">Luyện nghe</p>
            <h2 id="dictation-title" className="text-2xl font-black">Nghe chép chính tả</h2>
          </div>
        </div>
        <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 rounded-xl border-3 border-slate-800 flex items-center justify-center shrink-0"><X size={18} /></button>
      </header>
      {children}
    </section>
  </div>;
}
