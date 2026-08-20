import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, GraduationCap, Mic, Square, X, XCircle } from 'lucide-react';
import { bandExams } from '../../data/bandExamBank';
import { chamBaiThi, luuKetQua, NGUONG_DAT, phanChamDuoc } from '../../utils/bandExam';
import { kiemTraDeViet } from '../../utils/writingScorer';
import { kiemTraLuotNoi } from '../../utils/speakingCheck';
import { luuBaiLam } from '../../utils/selfReportLog';
import { audioManifest } from '../../data/audioManifest';
import { listeningPassages } from '../../data/listeningPassages';
import { recordError } from '../../utils/errorBank';
import { tronThuTu } from '../../utils/tronPhuongAn';

// BÀI THI CUỐI BẬC (việc 4.2).
//
// Màn hình này là chỗ app nói câu nặng nhất của mình — "bạn đã đạt B2" — nên
// nó phải nói kèm câu thứ hai: **đạt theo cái gì**. Hai phần Nghe/Đọc quyết định
// đạt; hai phần Viết/Nói vẫn phải làm nhưng KHÔNG tính, và điều đó hiện ra ở cả
// ba chỗ: trước khi thi, trong lúc thi, và trên kết quả.
//
// Không có "gộp lại cho gọn": ai lướt nhanh cũng phải đọc thấy nó ít nhất một lần.

const clipUrl = (id) => `/audio/${audioManifest.find((c) => c.id === id)?.file || ''}`;

// `examIdBanDau` để cửa ải cuối bậc trên lộ trình mở THẲNG vào đúng đề của
// bậc đó. Bắt người vừa học xong bậc A1 phải tự tìm lại đề A1 trong danh sách
// năm đề là chỗ dễ bỏ cuộc nhất của cả đường đi.
export default function BandExamPanel({ onClose, examIdBanDau = null }) {
  const [examId, setExamId] = useState(examIdBanDau);
  const exam = examId ? bandExams.find((e) => e.id === examId) : null;
  if (!exam) return <DanhSach onChon={setExamId} onClose={onClose} />;
  return <LamBai key={exam.id} exam={exam} onBack={() => setExamId(null)} onClose={onClose} />;
}

function DanhSach({ onChon, onClose }) {
  return <Khung onClose={onClose} tieuDe="Thi cuối bậc">
    <p className="text-sm font-bold text-slate-500 mt-3">
      Mỗi đề có <b>đủ bốn phần</b> Nghe · Đọc · Viết · Nói. Đạt thì app ghi nhận bạn đã qua bậc đó.
    </p>
    <div className="mt-3 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3 flex gap-2">
      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
      <span>
        Nhưng <b>chỉ Nghe và Đọc là chấm được</b>. Phần Viết và Nói bạn vẫn phải làm, và app đối chiếu được vài thứ trong đó —
        nhưng chúng <b>không tính vào kết quả đạt/chưa đạt</b>, vì app không chấm ngữ pháp và không chấm phát âm.
        Đây <b>không phải chứng chỉ CEFR</b>; muốn có chứng chỉ đối chiếu quốc tế thì phải thi ở tổ chức khảo thí.
      </span>
    </div>
    <p className="mt-3 text-xs font-bold text-slate-500">
      Phần Nghe dùng <b>giọng người thật</b> có giấy phép (Tatoeba CC BY và VOA Learning English), không dùng giọng máy đọc.
    </p>
    <div className="grid gap-3 mt-4">
      {bandExams.map((e) => {
        const cham = phanChamDuoc(e);
        const soCau = cham.reduce((n, s) => n + (s.items?.length || 0), 0);
        return <button key={e.id} onClick={() => onChon(e.id)}
          className="text-left p-4 rounded-2xl border-3 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 transition-all cursor-pointer">
          <p className="text-[10px] font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Bậc {e.cefr}</p>
          <p className="font-black mt-0.5">{e.name}</p>
          <p className="text-xs font-bold text-slate-500 mt-1">{e.moTa}</p>
          <p className="text-xs font-bold text-slate-400 mt-1">
            {soCau} câu chấm được ({cham.map((s) => `${s.nhan} ${s.items.length}`).join(' · ')}) + 1 bài viết + 1 lượt nói · ~{e.phut} phút
          </p>
        </button>;
      })}
    </div>
  </Khung>;
}

function LamBai({ exam, onBack, onClose }) {
  const [traLoi, setTraLoi] = useState({});
  const [ketQua, setKetQua] = useState(null);
  const [baiViet, setBaiViet] = useState('');
  const [banChuNoi, setBanChuNoi] = useState('');
  const [dangNghe, setDangNghe] = useState(false);
  const [tickViet, setTickViet] = useState([]);
  const [daLuuTuCham, setDaLuuTuCham] = useState(false);
  const nhanDangRef = useRef(null);

  const phanNghe = exam.sections.find((s) => s.key === 'listening');
  const phanDoc = exam.sections.find((s) => s.key === 'reading');
  const phanViet = exam.sections.find((s) => s.key === 'writing');
  const phanNoi = exam.sections.find((s) => s.key === 'speaking');
  const bai = phanNghe?.passageId ? listeningPassages.find((b) => b.id === phanNghe.passageId) : null;

  useEffect(() => { setTickViet(phanViet?.de?.checklist?.map(() => false) || []); }, [phanViet]);
  useEffect(() => () => { try { nhanDangRef.current?.stop(); } catch { /* ignore */ } }, []);

  const kqViet = useMemo(() => (ketQua ? kiemTraDeViet(baiViet, phanViet.de) : null), [ketQua, baiViet, phanViet]);
  const kqNoi = useMemo(() => (ketQua ? kiemTraLuotNoi(banChuNoi, phanNoi.de) : null), [ketQua, banChuNoi, phanNoi]);

  const chon = (itemId, i) => setTraLoi((t) => ({ ...t, [itemId]: i }));

  const nop = () => {
    const kq = chamBaiThi(exam, traLoi);
    luuKetQua(kq);
    // Câu sai vào sổ lỗi — đúng đường đã có của đề thi thử. Chỉ câu CHẤM ĐƯỢC
    // mới vào đây; bài viết/lượt nói không đổ vào sổ lỗi (xem speakingCheck.js).
    for (const c of kq.cauSai) {
      recordError({
        skill: c.sectionKey === 'listening' ? 'listening' : 'reading',
        prompt: c.prompt,
        answer: c.options[c.answer],
        chosen: c.daChon !== undefined ? c.options[c.daChon] : 'Chưa trả lời',
      });
    }
    setKetQua(kq);
  };

  const batDauNoi = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = 'en-US'; r.continuous = true; r.interimResults = false;
    r.onstart = () => setDangNghe(true);
    r.onresult = (e) => {
      let them = '';
      for (let i = e.resultIndex; i < e.results.length; i += 1) if (e.results[i].isFinal) them += `${e.results[i][0].transcript} `;
      if (them) setBanChuNoi((cu) => (cu ? `${cu} ${them.trim()}` : them.trim()));
    };
    r.onend = () => setDangNghe(false);
    r.onerror = () => setDangNghe(false);
    nhanDangRef.current = r;
    r.start();
  };

  const luuTuCham = () => {
    if (baiViet.trim()) luuBaiLam({ kyNang: 'writing', promptId: phanViet.de.id, text: baiViet, tuDanhGia: tickViet });
    if (banChuNoi.trim()) luuBaiLam({ kyNang: 'speaking', promptId: phanNoi.de.id, text: banChuNoi });
    setDaLuuTuCham(true);
  };

  const soCauChamDuoc = phanChamDuoc(exam).reduce((n, s) => n + s.items.length, 0);
  const daTraLoi = Object.keys(traLoi).length;

  return <Khung onClose={onClose} onBack={onBack} tieuDe={exam.name} phu={`Bậc ${exam.cefr}`}>
    {!ketQua && <>
      <p className="mt-3 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3">
        {/* Nói ĐÚNG SỐ CÂU phải đúng, không chỉ phần trăm: 70% của 6 câu làm
            tròn lên là 5, nên "70%" một mình là con số dễ hiểu nhầm thành 4. */}
        Đạt/chưa đạt được quyết định <b>chỉ bởi phần Nghe và Đọc</b> — mỗi phần cần đúng ít nhất{' '}
        {phanChamDuoc(exam).map((p) => `${p.nhan} ${Math.ceil(p.items.length * NGUONG_DAT)}/${p.items.length}`).join(' · ')}.
        Phần Viết và Nói bên dưới vẫn phải làm nhưng <b>không tính vào kết quả</b>.
      </p>

      {/* ── NGHE ── */}
      <PhanTieuDe nhan={`1. ${phanNghe.nhan}`} chamDuoc huongDan={phanNghe.huongDan} />
      {bai && <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 mb-3">
        <p className="text-xs font-black">{bai.title}</p>
        <p className="text-[11px] font-bold text-slate-500 mt-0.5">VOA Learning English · {Math.round(bai.secondsEstimated / 60)} phút · giọng người thật</p>
        <audio controls preload="none" src={bai.audioUrl} className="w-full mt-2" />
      </div>}
      {phanNghe.items.map((it, i) => <CauHoi key={it.id} so={i + 1} it={it}
        chon={traLoi[it.id]} onChon={(k) => chon(it.id, k)}
        truoc={it.clipId && <audio controls preload="none" src={clipUrl(it.clipId)} className="w-full mb-2" />} />)}

      {/* ── ĐỌC ── */}
      <PhanTieuDe nhan={`2. ${phanDoc.nhan}`} chamDuoc huongDan={phanDoc.huongDan} />
      {phanDoc.items.map((it, i) => <CauHoi key={it.id} so={i + 1} it={it}
        chon={traLoi[it.id]} onChon={(k) => chon(it.id, k)}
        truoc={<p className="text-sm font-medium bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-3 mb-2 leading-relaxed">{it.doan}</p>} />)}

      {/* ── VIẾT ── */}
      <PhanTieuDe nhan={`3. ${phanViet.nhan}`} lyDo={phanViet.lyDoKhongCham} />
      <p className="text-sm font-bold leading-relaxed">{phanViet.de.deBai}</p>
      <p className="mt-1 text-xs font-bold text-slate-500">{phanViet.de.yeuCau.moTaTuBatBuoc}</p>
      <textarea value={baiViet} onChange={(e) => setBaiViet(e.target.value)} rows={8}
        placeholder="Viết bằng tiếng Anh vào đây…"
        className="mt-2 w-full border-3 border-slate-800 dark:border-slate-600 rounded-2xl p-4 font-medium bg-slate-50 dark:bg-slate-800 outline-none resize-y" />
      <p className="text-xs font-bold text-slate-500 mt-1">
        {baiViet.trim() ? baiViet.trim().split(/\s+/).length : 0} / {phanViet.de.yeuCau.soTuToiThieu}–{phanViet.de.yeuCau.soTuToiDa} từ
      </p>

      {/* ── NÓI ── */}
      <PhanTieuDe nhan={`4. ${phanNoi.nhan}`} lyDo={phanNoi.lyDoKhongCham} />
      <p className="text-sm font-bold leading-relaxed">{phanNoi.de.deBai}</p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {!dangNghe
          ? <button onClick={batDauNoi} className="px-4 py-2.5 rounded-xl bg-purple-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer"><Mic size={16} /> Bắt đầu nói</button>
          : <button onClick={() => { try { nhanDangRef.current?.stop(); } catch { /* ignore */ } setDangNghe(false); }} className="px-4 py-2.5 rounded-xl bg-rose-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer animate-pulse"><Square size={16} /> Dừng</button>}
        <span className="text-xs font-black text-slate-500">~{phanNoi.de.giay} giây</span>
      </div>
      <textarea value={banChuNoi} onChange={(e) => setBanChuNoi(e.target.value)} rows={4}
        placeholder="Trình duyệt nghe được gì sẽ hiện ở đây — bạn sửa lại cho đúng lời mình đã nói…"
        className="mt-2 w-full border-3 border-slate-800 dark:border-slate-600 rounded-2xl p-4 font-medium bg-slate-50 dark:bg-slate-800 outline-none resize-y" />

      <button onClick={nop} disabled={daTraLoi < soCauChamDuoc}
        className="mt-6 w-full px-5 py-3 rounded-xl bg-emerald-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
        Nộp bài <ArrowRight size={17} />
      </button>
      {daTraLoi < soCauChamDuoc && <p className="mt-2 text-center text-xs font-bold text-slate-400">
        Còn {soCauChamDuoc - daTraLoi} câu Nghe/Đọc chưa trả lời.
      </p>}
    </>}

    {ketQua && <>
      <div className={`mt-4 rounded-2xl border-4 p-5 text-center ${ketQua.dat ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' : 'border-slate-400 bg-slate-50 dark:bg-slate-800'}`}>
        <p className="text-3xl font-black">{ketQua.dat ? `Đạt ${ketQua.nhanIn || ketQua.cefr}` : 'Chưa đạt'}</p>
        <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
          {ketQua.moTaCanCu} Phần <b>{ketQua.phanKhongTinh.map((p) => p.nhan).join(' và ')}</b> bạn đã làm nhưng <b>không tính vào kết quả này</b>.
        </p>
        {/* Đề nào có nhãn công bố KHÁC mã bậc (hiện là đề nền C1) thì phải
            nói rõ nhãn đó nghĩa là gì NGAY tại chỗ, không để người học tự suy. */}
        {ketQua.dat && ketQua.ghiChuBac && <p className="mt-2 text-xs font-bold text-amber-700 dark:text-amber-400 max-w-lg mx-auto leading-relaxed">{ketQua.ghiChuBac}</p>}
        <p className="mt-2 text-[11px] font-bold text-slate-500">Đây không phải chứng chỉ CEFR.</p>
      </div>

      <div className="mt-4 space-y-2">
        {ketQua.phan.map((p) => <p key={p.key} className="flex gap-2 items-center text-sm font-bold">
          {p.dat ? <CheckCircle2 size={17} className="text-emerald-600 shrink-0" /> : <XCircle size={17} className="text-rose-500 shrink-0" />}
          <span>{p.nhan}: {p.dung}/{p.tong} — {p.dat ? 'đạt' : `chưa đạt (cần ${Math.ceil(p.tong * NGUONG_DAT)}/${p.tong})`}</span>
        </p>)}
      </div>

      {/* Viết & Nói: máy đối chiếu được gì thì nói đúng chừng đó. */}
      <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-4 bg-slate-50 dark:bg-slate-800">
        <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Viết &amp; Nói — không tính vào kết quả</p>
        <p className="text-sm font-bold">✍️ Bài viết: {kqViet.doDai.soTu} từ {kqViet.doDai.dat ? '(đạt độ dài)' : `(cần ${kqViet.doDai.min}–${kqViet.doDai.max})`}
          {kqViet.tuBatBuoc.canCo.length > 0 && (kqViet.tuBatBuoc.dat ? ' · đã dùng đủ cụm bắt buộc' : ` · còn thiếu: ${kqViet.tuBatBuoc.conThieu.join(', ')}`)}</p>
        <p className="text-sm font-bold mt-1">🗣️ Lượt nói: trình duyệt nghe được {kqNoi.doDai.soTu} từ
          {kqNoi.tuMucTieu ? ` · nghe ra ${kqNoi.tuMucTieu.daNghe.length}/${kqNoi.tuMucTieu.can} từ mục tiêu` : ''}</p>
        <p className="mt-2 text-[11px] font-bold text-slate-500">
          Máy <b>không</b> kiểm được: {kqViet.khongKiemDuoc.join(' · ')} · {kqNoi.khongKiemDuoc.join(' · ')}.
        </p>

        {phanViet.de.modelAnswer && <details className="mt-3">
          <summary className="text-xs font-black cursor-pointer">Xem bài viết mẫu để tự đối chiếu</summary>
          <div className="mt-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900 text-sm font-medium leading-relaxed whitespace-pre-line">{phanViet.de.modelAnswer}</div>
          <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">👉 {phanViet.de.ghiChuBaiMau}</p>
        </details>}

        <div className="mt-3 space-y-2">
          {phanViet.de.checklist.map((c, i) => <label key={i} className="flex gap-2 items-start text-sm font-bold cursor-pointer">
            <input type="checkbox" checked={!!tickViet[i]} onChange={() => setTickViet((t) => t.map((v, j) => (j === i ? !v : v)))} className="mt-1 w-4 h-4 shrink-0" />
            <span>{c}</span>
          </label>)}
        </div>
        {!daLuuTuCham
          ? <button onClick={luuTuCham} className="mt-3 w-full px-4 py-2.5 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black cursor-pointer">Lưu bài viết &amp; lượt nói vào sổ</button>
          : <p className="mt-3 text-center text-sm font-black text-emerald-700 dark:text-emerald-400">Đã lưu vào sổ ✓ (đây là bạn tự chấm, không phải điểm đo được)</p>}
      </div>

      {ketQua.cauSai.length > 0 && <div className="mt-5">
        <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Câu sai ({ketQua.cauSai.length}) — đã vào sổ lỗi</p>
        {ketQua.cauSai.map((c) => <div key={c.id} className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-3 mb-2">
          <p className="text-xs font-black text-slate-400">{c.sectionNhan}</p>
          <p className="text-sm font-bold mt-0.5">{c.prompt}</p>
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-1">✓ {c.options[c.answer]}</p>
          <p className="text-xs font-bold text-slate-500 mt-1">{c.explanation}</p>
        </div>)}
      </div>}

      <button onClick={onBack} className="mt-4 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black cursor-pointer">Chọn đề khác</button>
    </>}
  </Khung>;
}

function PhanTieuDe({ nhan, chamDuoc = false, huongDan, lyDo }) {
  return <div className="mt-7 mb-3">
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="text-lg font-black">{nhan}</h3>
      {chamDuoc
        ? <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 border-2 border-emerald-700 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase">Tính vào kết quả</span>
        : <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase">Không tính vào kết quả</span>}
    </div>
    {huongDan && <p className="text-xs font-bold text-slate-500 mt-1">{huongDan}</p>}
    {lyDo && <p className="text-xs font-bold text-slate-500 mt-1">{lyDo}</p>}
  </div>;
}

function CauHoi({ so, it, chon, onChon, truoc }) {
  // ĐO ĐƯỢC 19/08: cả 42/42 câu của ba đề thi cuối bậc đều để đáp án đúng ở ô
  // ĐẦU. Tức là bấm ô đầu tiên mọi câu thì qua sạch bài thi dùng để nói người
  // học đã xong một bậc. Trộn thứ tự HIỆN RA, nhưng báo về CHỈ SỐ GỐC — nhờ vậy
  // `chamBaiThi`, phần lưu bài làm và mọi chỗ hiện `options[answer]` không phải
  // sửa gì, và không có chỗ nào để quên ánh xạ ngược.
  const thuTu = useMemo(() => tronThuTu(it.id, it.options.length), [it.id, it.options.length]);
  return <div className="mb-4">
    {truoc}
    <p className="text-sm font-black mb-1.5">{so}. {it.prompt}</p>
    <div className="grid gap-1.5">
      {thuTu.map((goc) => <button key={goc} onClick={() => onChon(goc)}
        className={`text-left px-3 py-2 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${
          chon === goc ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
        }`}>{it.options[goc]}</button>)}
    </div>
  </div>;
}

function Khung({ children, onClose, onBack, tieuDe, phu }) {
  return <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="exam-title">
    <section className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-emerald-200 border-3 border-slate-900 flex items-center justify-center shrink-0"><GraduationCap className="text-emerald-800" /></div>
          <div className="min-w-0">
            <p className="text-xs font-black text-emerald-700 uppercase tracking-widest truncate">{phu || 'Thi cuối bậc'}</p>
            <h2 id="exam-title" className="text-xl md:text-2xl font-black leading-tight">{tieuDe}</h2>
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
