import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, PenLine, ScrollText, X, XCircle } from 'lucide-react';
import { writingPrompts, KIEU_DE } from '../../data/writingPrompts';
import { kiemTraDeViet, scoreWriting } from '../../utils/writingScorer';
import { luuBaiViet } from '../../utils/writingLog';

// LUYỆN VIẾT — ĐƯỜNG KHÔNG CẦN KEY (việc 3.4).
//
// Chủ dự án đã chốt: app không gắn key của mình, khách tự nhập key Gemini. Nghĩa
// là phải giả định NHIỀU NGƯỜI KHÔNG CÓ KEY. Một mục luyện viết chỉ chạy khi có
// AI thì với họ là một nút bấm vào không có gì.
//
// Nên đường mặc định ở đây hoàn toàn không cần mạng, và đi theo đúng thứ tự này:
//   1. Viết đã — chưa cho xem bài mẫu.
//   2. Máy đối chiếu những gì NÓ KIỂM ĐƯỢC: số từ, từ/cụm bắt buộc. Chỉ thế.
//   3. Mở bài mẫu để người học TỰ đối chiếu.
//   4. Người học tự soi bài mình theo checklist — và phần này được ghi rõ là
//      TỰ CHẤM, không phải điểm đo được.
//
// Thứ tự đó quan trọng: đọc bài mẫu trước khi viết thì chỉ còn là chép lại.
export default function WritingPromptPanel({ onClose }) {
  const [deId, setDeId] = useState(null);
  const de = writingPrompts.find((p) => p.id === deId) || null;
  if (!de) return <DanhSach onChon={setDeId} onClose={onClose} />;
  return <LamBai key={de.id} de={de} onBack={() => setDeId(null)} onClose={onClose} />;
}

function DanhSach({ onChon, onClose }) {
  const [kieu, setKieu] = useState(null);
  const ds = kieu ? writingPrompts.filter((p) => p.kieu === kieu) : writingPrompts;
  return <Khung onClose={onClose} tieuDe="Luyện viết">
    <p className="text-sm font-bold text-slate-500 mt-1 mb-3">
      Viết xong sẽ có bài mẫu để đối chiếu và một bảng tiêu chí để bạn tự soi bài mình.
    </p>
    {/* Nói trước, không để người học tưởng bài sẽ được chấm. */}
    <p className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3 mb-4 flex gap-2">
      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
      <span>Phần này <b>không chấm ngữ pháp</b> và không cho điểm. Máy chỉ kiểm được số từ và các cụm bắt buộc; phần còn lại bạn tự đối chiếu với bài mẫu.</span>
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {[null, ...Object.keys(KIEU_DE)].map((k) => <button
        key={k || 'tat-ca'}
        onClick={() => setKieu(k)}
        className={`px-3 py-1.5 rounded-xl text-xs font-black border-3 transition-all cursor-pointer ${
          kieu === k ? 'border-violet-500 bg-violet-500 text-white' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'
        }`}
      >{k ? KIEU_DE[k].label : `Tất cả (${writingPrompts.length})`}</button>)}
    </div>
    <div className="grid gap-3">
      {ds.map((p) => <button key={p.id} onClick={() => onChon(p.id)}
        className="text-left p-4 rounded-2xl border-3 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:border-violet-500 transition-all cursor-pointer">
        <p className="text-[10px] font-black uppercase tracking-wide text-violet-700 dark:text-violet-400">
          {KIEU_DE[p.kieu].label} · {p.bacToiThieu}
        </p>
        <p className="font-black mt-0.5">{p.title}</p>
        <p className="text-xs font-bold text-slate-500 mt-1">{p.yeuCau.soTuToiThieu}–{p.yeuCau.soTuToiDa} từ</p>
      </button>)}
    </div>
  </Khung>;
}

function LamBai({ de, onBack, onClose }) {
  const [text, setText] = useState('');
  const [daNop, setDaNop] = useState(false);
  const [moBaiMau, setMoBaiMau] = useState(false);
  const [tick, setTick] = useState(() => de.checklist.map(() => false));
  const [daLuu, setDaLuu] = useState(false);

  // Đổi đề thì xoá sạch, kể cả khi component được dùng lại. (Đã dính một lần ở
  // mục chép chính tả: hiệu ứng chỉ phụ thuộc chỉ số nên kết quả cũ còn lại
  // trên màn hình với một câu khác.)
  useEffect(() => { setText(''); setDaNop(false); setMoBaiMau(false); setTick(de.checklist.map(() => false)); setDaLuu(false); }, [de.id, de.checklist]);

  const kq = daNop ? kiemTraDeViet(text, de) : null;
  const beMat = daNop ? scoreWriting(text) : null;

  const luu = () => {
    luuBaiViet({ promptId: de.id, text, tuDanhGia: tick, dungBaiMau: moBaiMau });
    setDaLuu(true);
  };

  return <Khung onClose={onClose} onBack={onBack} tieuDe={de.title} phu={`${KIEU_DE[de.kieu].label} · ${de.bacToiThieu}`}>
    <p className="mt-3 text-sm font-bold leading-relaxed">{de.deBai}</p>
    <p className="mt-1.5 text-xs font-bold text-slate-500">💡 {de.goiY}</p>
    <p className="mt-1.5 text-xs font-bold text-slate-500">{de.yeuCau.moTaTuBatBuoc}</p>

    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      disabled={daNop}
      rows={de.kieu === 'bai' ? 12 : 6}
      placeholder="Viết bằng tiếng Anh vào đây…"
      className="mt-4 w-full border-3 border-slate-800 dark:border-slate-600 rounded-2xl p-4 font-medium bg-slate-50 dark:bg-slate-800 outline-none resize-y disabled:opacity-70"
    />
    <p className="text-xs font-bold text-slate-500 mt-1">
      {text.trim() ? text.trim().split(/\s+/).length : 0} / {de.yeuCau.soTuToiThieu}–{de.yeuCau.soTuToiDa} từ
    </p>

    {!daNop && <button
      onClick={() => setDaNop(true)}
      disabled={!text.trim()}
      className="mt-4 px-5 py-3 rounded-xl bg-violet-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
    >Nộp bài <ArrowRight size={17} /></button>}

    {daNop && <>
      {/* BƯỚC 2 — chỉ những gì máy thật sự kiểm được. */}
      <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Máy đối chiếu được</p>
        <Dong dat={kq.doDai.dat}
          text={kq.doDai.dat
            ? `Độ dài đạt: ${kq.doDai.soTu} từ.`
            : kq.doDai.thieu
              ? `Còn thiếu ${kq.doDai.thieu} từ (đang ${kq.doDai.soTu}, cần ít nhất ${kq.doDai.min}).`
              : `Dài hơn ${kq.doDai.thua} từ so với mức tối đa ${kq.doDai.max}.`} />
        <Dong dat={kq.tuBatBuoc.dat}
          text={kq.tuBatBuoc.dat
            ? `Đã dùng đủ cụm bắt buộc: ${kq.tuBatBuoc.daDung.join(', ')}.`
            : `Còn thiếu: ${kq.tuBatBuoc.conThieu.join(', ')}.`} />
        {beMat.tips.map((t, i) => <Dong key={i} dat={false} text={t} nhe />)}

        {/* Nói thẳng cái mình KHÔNG kiểm được, ngay cạnh cái mình kiểm được. */}
        <p className="mt-3 text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3">
          Máy <b>không</b> kiểm được: {kq.khongKiemDuoc.join(' · ')}. Những thứ đó nằm ở bước đối chiếu bài mẫu bên dưới.
        </p>
      </div>

      {/* BƯỚC 3 — bài mẫu, chỉ mở sau khi đã viết. */}
      {!moBaiMau
        ? <button onClick={() => setMoBaiMau(true)} className="mt-5 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black inline-flex items-center justify-center gap-2 cursor-pointer">
            <ScrollText size={17} /> Xem bài mẫu để đối chiếu
          </button>
        : <div className="mt-5">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Bài mẫu — một cách viết, không phải cách duy nhất</p>
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800 whitespace-pre-line text-sm font-medium leading-relaxed">{de.modelAnswer}</div>
            <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">👉 {de.ghiChuBaiMau}</p>
          </div>}

      {/* BƯỚC 4 — TỰ đánh giá, và gọi đúng tên nó. */}
      {moBaiMau && <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Bạn tự soi bài mình</p>
        <div className="space-y-2">
          {de.checklist.map((c, i) => <label key={i} className="flex gap-3 items-start p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 cursor-pointer">
            <input type="checkbox" checked={tick[i]} onChange={() => setTick((t) => t.map((v, j) => (j === i ? !v : v)))} className="mt-1 w-4 h-4 shrink-0" />
            <span className="text-sm font-bold">{c}</span>
          </label>)}
        </div>
        <p className="mt-3 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3">
          Đây là <b>bạn tự chấm</b>, không phải điểm đo được — nên Báo cáo tiến bộ vẫn ghi kỹ năng Viết là “chưa đo được”. Tự đánh giá vẫn có ích: nó buộc bạn đọc lại bài mình bằng con mắt người chấm.
        </p>
        {!daLuu
          ? <button onClick={luu} className="mt-4 w-full px-5 py-3 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center justify-center gap-2 cursor-pointer">
              <CheckCircle2 size={17} /> Lưu bài này vào sổ
            </button>
          : <p className="mt-4 text-center text-sm font-black text-emerald-700 dark:text-emerald-400">Đã lưu vào sổ bài viết ✓</p>}
        <button onClick={onBack} className="mt-3 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black cursor-pointer">Chọn đề khác</button>
      </div>}
    </>}
  </Khung>;
}

function Dong({ dat, text, nhe }) {
  return <p className={`flex gap-2 items-start text-sm font-bold py-1 ${nhe ? 'text-slate-500' : ''}`}>
    {dat ? <CheckCircle2 size={17} className="shrink-0 mt-0.5 text-emerald-600" /> : <XCircle size={17} className="shrink-0 mt-0.5 text-rose-500" />}
    <span>{text}</span>
  </p>;
}

function Khung({ children, onClose, onBack, tieuDe, phu }) {
  return <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="writing-title">
    <section className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-violet-200 border-3 border-slate-900 flex items-center justify-center shrink-0"><PenLine className="text-violet-800" /></div>
          <div className="min-w-0">
            <p className="text-xs font-black text-violet-700 uppercase tracking-widest truncate">{phu || 'Luyện viết'}</p>
            <h2 id="writing-title" className="text-xl md:text-2xl font-black leading-tight">{tieuDe}</h2>
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
