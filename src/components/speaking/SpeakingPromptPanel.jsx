import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Mic, Sparkles, Square, X, XCircle } from 'lucide-react';
import { deNoiSinh, deNoiTuChang, deNoiChoChang } from '../../utils/speakingBank';
import { kiemTraLuotNoi, nhanXetLuotNoiBangAI, GHI_CHU_CHECKLIST_NOI, NHAN_KIEU_NOI, loiMicThanhChu } from '../../utils/speakingCheck';
import { batDauGhiAm, loiGhiAmThanhChu } from '../../utils/ghiAm';
import { luuBaiLam } from '../../utils/selfReportLog';
import { hasGeminiKey, openAiKeySettings } from '../../utils/aiKey';
import { chamPhatAm, mucDeNghe } from '../../utils/chamPhatAm';

// NÓI THEO CHỦ ĐỀ (việc 3.5) — mở rộng từ "đọc to một từ" sang "nói thành bài".
//
// ĐIỀU PHẢI GIỮ BẰNG MỌI GIÁ Ở MÀN HÌNH NÀY: cái micro làm người ta tưởng mình
// đang được ĐO. Sự thật là trình duyệt chỉ trả về VĂN BẢN nó nghe được — không
// một dòng nào ở đây được ngụ ý rằng app chấm phát âm. Nhãn cũ của mục đọc to
// đã nói đúng mức đó ("trình duyệt nghe ra đúng từ này"); màn hình này không
// được hứa nhiều hơn.
//
// Thứ tự bước cố ý giống mục luyện viết: nói trước → máy đối chiếu thứ nó kiểm
// được → tự soi theo checklist. Không có bước "xem bài mẫu" vì CHƯA CÓ bài nói
// mẫu, và chỗ đó nói thẳng ra chứ không lặng lẽ bỏ.
// `chang`: mở thẳng đề của MỘT chặng lộ trình. Chặng đó không có đề thì phải
// BÁO RA, không được lặng lẽ rơi về danh sách — rơi về danh sách thì người học
// bấm "NÓI" ở chặng của mình mà lại thấy đề của chặng khác.
export default function SpeakingPromptPanel({ onClose, chang = null }) {
  const [deId, setDeId] = useState(null);
  const [boQuaChang, setBoQuaChang] = useState(false);
  const deChang = chang && !boQuaChang ? deNoiChoChang(chang) : null;
  const de = deId ? deNoiTuChang(deNoiSinh.find((t) => t.id === deId)) : deChang;

  if (!de && chang && !boQuaChang) {
    return <Khung onClose={onClose} tieuDe={chang.title || 'Chặng này'} phu="Luyện nói">
      <div className="mt-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-4 bg-slate-50 dark:bg-slate-800">
        <p className="text-sm font-black text-slate-500 flex items-center gap-1.5"><AlertTriangle size={15} /> Chặng này chưa có đề nói</p>
        <p className="text-xs font-bold text-slate-500 mt-1.5 leading-relaxed">
          Đề nói theo chủ đề chỉ có từ <b>B1 trở lên</b>. Ở mức thấp hơn, hãy dùng mục <b>Luyện Phát Âm</b> đọc to từng từ trước đã.
        </p>
      </div>
      <button onClick={() => setBoQuaChang(true)} className="mt-4 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black cursor-pointer">Xem toàn bộ đề nói</button>
    </Khung>;
  }

  if (!de) return <DanhSach onChon={setDeId} onClose={onClose} />;
  return <LamBai key={de.id} de={de} onBack={() => { setDeId(null); setBoQuaChang(true); }} onClose={onClose} />;
}

function DanhSach({ onChon, onClose }) {
  const [kieu, setKieu] = useState(null);
  const nguon = kieu ? deNoiSinh.filter((t) => t.kieu === kieu) : deNoiSinh;
  const ds = nguon.slice(0, 60);
  return <Khung onClose={onClose} tieuDe="Luyện nói theo chủ đề">
    <p className="text-sm font-bold text-slate-500 mt-3 mb-3">
      Mỗi chặng từ <b>B1 trở lên</b> có một đề nói gắn với từ vựng của chính chặng đó. Chặng A0–A2 <b>cố ý không có</b> đề nói theo chủ đề — ở mức đó hãy dùng mục <b>Luyện Phát Âm</b> đọc to từng từ.
    </p>
    <p className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3 mb-4 flex gap-2">
      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
      <span>Phần này <b>không cho điểm</b>. Trình duyệt chỉ ghi lại <b>văn bản nó nghe được</b> — từ văn bản thì không biết bạn phát âm thế nào. Muốn có nhận xét phát âm thì thu âm rồi dùng khối <b>“Chấm phát âm”</b> ở cuối trang: ở đó AI nghe bản thu thật, nhưng đó là nhận xét của một mô hình, không phải điểm thi.</span>
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {[null, ...Object.keys(NHAN_KIEU_NOI)].map((k) => <button
        key={k || 'tat-ca'}
        onClick={() => setKieu(k)}
        className={`px-3 py-1.5 rounded-xl text-xs font-black border-3 transition-all cursor-pointer ${
          kieu === k ? 'border-purple-500 bg-purple-500 text-white' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'
        }`}
      >{k ? NHAN_KIEU_NOI[k] : `Tất cả (${deNoiSinh.length})`}</button>)}
    </div>
    <div className="grid gap-3">
      {ds.map((t) => <button key={t.id} onClick={() => onChon(t.id)}
        className="text-left p-4 rounded-2xl border-3 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:border-purple-500 transition-all cursor-pointer">
        <p className="text-[10px] font-black uppercase tracking-wide text-purple-700 dark:text-purple-400">
          {NHAN_KIEU_NOI[t.kieu]} · {t.cefr}
        </p>
        <p className="font-black mt-0.5">{t.title}</p>
        <p className="text-xs font-bold text-slate-500 mt-1">
          ~{t.giay} giây · {t.tuMucTieu.length ? `${t.soTuPhaiDung}/${t.tuMucTieu.length} từ mục tiêu` : 'chặng ngữ pháp'}
        </p>
      </button>)}
    </div>
    {ds.length < nguon.length && <p className="mt-4 text-xs font-bold text-slate-400 text-center">
      Đang hiện {ds.length} đề đầu trong {nguon.length}. Mỗi đề gắn với một chặng — bấm nút <b>NÓI</b> ngay trên thẻ chặng đó trong lộ trình sẽ mở thẳng đúng đề của nó.
    </p>}
  </Khung>;
}

function LamBai({ de, onBack, onClose }) {
  const [banChu, setBanChu] = useState('');
  const [dangNghe, setDangNghe] = useState(false);
  const [loiMic, setLoiMic] = useState('');
  const [daNop, setDaNop] = useState(false);
  const [tick, setTick] = useState(() => de.checklist.map(() => false));
  const [daLuu, setDaLuu] = useState(false);
  const [aiText, setAiText] = useState('');
  const [aiLoi, setAiLoi] = useState('');
  const [aiDangChay, setAiDangChay] = useState(false);
  // GHI ÂM ĐỂ NGHE LẠI. Vòng luyện nói trước đây hở đúng một nửa: người học
  // nói, nhận về bản chữ, và không bao giờ nghe lại được chính mình — trong khi
  // tự nghe lại là cách luyện phát âm rẻ nhất khi không có thầy.
  // Bản thu nằm trong bộ nhớ phiên, KHÔNG lưu xuống đĩa. Xem utils/ghiAm.js.
  const [urlThu, setUrlThu] = useState('');
  const [loiThu, setLoiThu] = useState('');
  // Bản thu dạng Blob phải giữ RIÊNG: từ blob URL không lấy lại được byte để
  // gửi đi chấm, nhất là sau khi URL đã bị `huy()`.
  const [blobThu, setBlobThu] = useState(null);
  const [pa, setPa] = useState(null);
  const [paLoi, setPaLoi] = useState('');
  const [paDangChay, setPaDangChay] = useState(false);
  const mayThuRef = useRef(null);
  const huyThuRef = useRef(null);
  const dangMoMicRef = useRef(false);
  const nhanDangRef = useRef(null);
  const coKey = hasGeminiKey();

  useEffect(() => {
    setBanChu(''); setDangNghe(false); setLoiMic(''); setDaNop(false);
    // Đổi đề thì bỏ bản thu cũ: nghe lại giọng mình của đề khác là một kiểu
    // thay thế âm thầm nhỏ nhưng vẫn là thay thế âm thầm.
    huyThuRef.current?.(); huyThuRef.current = null; setUrlThu(''); setLoiThu(''); setBlobThu(null);
    setPa(null); setPaLoi(''); 
    setTick(de.checklist.map(() => false)); setDaLuu(false); setAiText(''); setAiLoi('');
  }, [de.id, de.checklist]);

  // Dừng nhận dạng khi rời màn hình — không thì micro còn bật sau khi đóng.
  useEffect(() => () => {
    try { nhanDangRef.current?.stop(); } catch { /* ignore */ }
    // Rời màn hình giữa lúc đang thu: phải TRẢ LẠI micro, nếu không đèn micro
    // của người dùng sáng mãi sau khi họ đã đóng panel.
    try { mayThuRef.current?.boGiuaChung(); } catch { /* ignore */ }
    huyThuRef.current?.();
  }, []);

  // LUẬT: **ghi âm hỏng thì nhận dạng vẫn phải chạy.** Hai thứ dùng chung một
  // micro; Chrome máy tính cho chạy song song nhưng không trình duyệt nào hứa
  // điều đó. Nên ghi âm được bọc riêng, hỏng thì báo một dòng rồi đi tiếp.
  const batDau = async () => {
    // ⚠️ CỬA SỔ BẤM HAI LẦN.
    // `setDangNghe(true)` chỉ chạy trong `r.onstart`, tức là SAU khi await
    // `batDauGhiAm()` xong. Trong khoảng đó nút vẫn đọc "Bắt đầu nói" và vẫn
    // bấm được — mà khoảng đó rộng bằng cả lúc trình duyệt hiện hộp xin quyền
    // micro, tức là vài giây chứ không phải vài mili giây.
    //
    // Bấm lần hai: `mayThuRef` bị ghi đè bằng máy thu mới, luồng micro của lần
    // một KHÔNG AI TẮT, và đèn micro sáng tới lúc tải lại trang. Đúng loại lỗi
    // vừa vá ở bốn đường hỏng của `ghiAm.js`, chỉ khác là nó nằm ở đây.
    if (dangMoMicRef.current) return;
    dangMoMicRef.current = true;
    try {
      huyThuRef.current?.(); huyThuRef.current = null; setUrlThu(''); setLoiThu('');
      // Còn máy thu cũ đang chạy (bấm lại mà chưa qua nút Dừng) thì trả micro
      // của nó trước, đừng chồng thêm một luồng nữa.
      try { mayThuRef.current?.boGiuaChung(); } catch { /* ignore */ }
      mayThuRef.current = null;
      const thu = await batDauGhiAm();
      if (thu.ok) mayThuRef.current = thu;
      else setLoiThu(loiGhiAmThanhChu(thu.loi));
    } finally {
      dangMoMicRef.current = false;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      // THIẾU THÌ BÁO, KHÔNG THAY THẾ ÂM THẦM: vẫn còn ô gõ tay bên dưới để
      // người dùng trình duyệt không hỗ trợ vẫn làm được đề này. Lời báo lấy từ
      // utils/speakingCheck.js — xem ở đó vì sao chúng là dữ liệu chứ không phải
      // chuỗi rải trong JSX.
      setLoiMic(loiMicThanhChu('khong-ho-tro'));
      // ⚠️ THOÁT SỚM Ở ĐÂY TỪNG BỎ QUÊN MICRO ĐANG BẬT.
      // Máy thu đã chạy ở mấy dòng trên. Trả về thẳng thì `dangNghe` không bao
      // giờ thành true → nút "Dừng lại" không hiện ra → không có đường nào gọi
      // `dung()` → đèn micro của người dùng sáng cho tới lúc họ đóng panel.
      //
      // Và ghi âm KHÔNG cần nhận dạng mới chạy được: trình duyệt không hỗ trợ
      // Web Speech thì người học vẫn thu và nghe lại giọng mình được, chỉ là gõ
      // bản chữ bằng tay. Nên bật cờ để có nút dừng, thay vì bỏ luôn cả hai.
      if (mayThuRef.current) setDangNghe(true);
      return;
    }
    const r = new SR();
    r.lang = 'en-US';
    r.continuous = true;      // nói thành bài, không phải một từ
    r.interimResults = false;
    r.onstart = () => { setDangNghe(true); setLoiMic(''); };
    r.onresult = (e) => {
      let them = '';
      for (let i = e.resultIndex; i < e.results.length; i += 1) {
        if (e.results[i].isFinal) them += `${e.results[i][0].transcript} `;
      }
      if (them) setBanChu((cu) => (cu ? `${cu} ${them.trim()}` : them.trim()));
    };
    r.onerror = (e) => {
      setDangNghe(false);
      setLoiMic(loiMicThanhChu(e?.error));
    };
    r.onend = () => setDangNghe(false);
    nhanDangRef.current = r;
    r.start();
  };

  const dung = async () => {
    try { nhanDangRef.current?.stop(); } catch { /* ignore */ }
    setDangNghe(false);
    const may = mayThuRef.current;
    mayThuRef.current = null;
    if (!may) return;
    const kq = await may.dung();
    if (kq.url) { setUrlThu(kq.url); setBlobThu(kq.blob); huyThuRef.current = kq.huy; }
    else setLoiThu(loiGhiAmThanhChu(kq.loi));
  };

  const xinAi = async () => {
    setAiDangChay(true); setAiLoi(''); setAiText('');
    try {
      setAiText(await nhanXetLuotNoiBangAI(banChu, { topicTitle: de.title }));
    } catch (e) {
      setAiLoi(e?.message || 'không rõ lý do');
    } finally {
      setAiDangChay(false);
    }
  };

  const xinChamPhatAm = async () => {
    setPaDangChay(true); setPaLoi(''); setPa(null);
    try {
      setPa(await chamPhatAm(blobThu, { topicTitle: de.title }));
    } catch (e) {
      setPaLoi(e?.message || 'không rõ lý do');
    } finally {
      setPaDangChay(false);
    }
  };

  const kq = daNop ? kiemTraLuotNoi(banChu, de) : null;

  const luu = () => {
    luuBaiLam({ kyNang: 'speaking', promptId: de.id, text: banChu, tuDanhGia: tick, dungBaiMau: false });
    setDaLuu(true);
  };

  const soTu = banChu.trim() ? banChu.trim().split(/\s+/).length : 0;

  return <Khung onClose={onClose} onBack={onBack} tieuDe={de.title} phu={`${de.nhanKieu} · ${de.bacToiThieu}`}>
    <p className="mt-3 text-sm font-bold leading-relaxed">{de.deBai}</p>
    <p className="mt-1.5 text-xs font-bold text-slate-500">🎯 {de.moTaKieu}</p>
    <p className="mt-1.5 text-xs font-bold text-slate-500">💡 {de.goiY}</p>

    <div className="mt-4 flex flex-wrap items-center gap-3">
      {!dangNghe
        ? <button onClick={batDau} disabled={daNop}
            className="px-5 py-3 rounded-xl bg-purple-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer disabled:opacity-40">
            <Mic size={17} /> Bắt đầu nói
          </button>
        : <button onClick={dung}
            className="px-5 py-3 rounded-xl bg-rose-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer animate-pulse">
            <Square size={17} /> Dừng lại
          </button>}
      <span className="text-xs font-black text-slate-500">{soTu} từ · cần ít nhất {de.soTuToiThieu}</span>
    </div>

    {loiMic && <p className="mt-3 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3">{loiMic}</p>}
    {loiThu && <p className="mt-3 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3">{loiThu}</p>}

    {/* NGHE LẠI GIỌNG MÌNH — không phải chấm điểm.
        Một cái nút micro là thứ dễ khiến người ta tưởng đang được đo nhất, nên
        chỗ này phải nói thẳng cả hai điều: máy KHÔNG chấm bản thu, và bản thu
        KHÔNG được lưu lại. */}
    {urlThu && (
      <div className="mt-4 rounded-2xl border-3 border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-purple-800 dark:text-purple-300">Nghe lại giọng mình</p>
        <audio controls src={urlThu} className="mt-2 w-full" />
        <p className="mt-2 text-[11px] font-bold text-purple-800/80 dark:text-purple-300/80 leading-relaxed">
          Bản thu này để bạn <b>tự nghe lại</b>. So với bản chữ ở dưới: chỗ nào trình duyệt nghe ra khác điều bạn định nói thì đó là chỗ đáng luyện lại.
        </p>
        <p className="mt-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
          Bản thu chỉ nằm trong phiên này — đóng màn hình là mất, và nó <b>không được lưu vào máy</b>. Nó chỉ rời khỏi máy bạn khi chính bạn bấm <b>“Nghe và nhận xét phát âm”</b> ngay bên dưới: lúc đó nó được gửi tới Google bằng API key của bạn.
        </p>
      </div>
    )}

    {/* ══ CHẤM PHÁT ÂM ══ Khối DUY NHẤT trong app mà mô hình thật sự NGHE
        được tiếng người học. Chỉ bày nút khi ĐÃ CÓ bản thu — mời người ta bấm
        vào một chỗ chưa dùng được cũng là một kiểu nói dối nhỏ. */}
    <div className="mt-5 rounded-2xl border-[3px] border-slate-800 dark:border-slate-600 p-4 bg-indigo-50 dark:bg-indigo-950/30">
      <p className="text-sm font-black flex items-center gap-1.5 text-indigo-900 dark:text-indigo-200">
        <Mic size={16} /> Chấm phát âm — AI NGHE bản thu của bạn
      </p>
      {!blobThu
        ? <p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">Hãy bấm “Bắt đầu nói” rồi “Dừng lại” để có bản thu trước đã.</p>
        : !coKey
          ? <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
              Cần API key Gemini của riêng bạn (miễn phí) — bản thu được gửi thẳng tới Google bằng key đó.
              <button onClick={openAiKeySettings} className="ml-2 underline font-black cursor-pointer">Thêm key</button>
            </p>
          : <button onClick={xinChamPhatAm} disabled={paDangChay}
              className="mt-3 w-full px-5 py-3 rounded-xl bg-indigo-500 text-white border-[3px] border-slate-800 dark:border-slate-600 font-black inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
              <Sparkles size={17} /> {paDangChay ? 'AI đang nghe…' : 'Nghe và nhận xét phát âm'}
            </button>}

      {paLoi && <p className="mt-3 text-xs font-bold text-rose-600 dark:text-rose-400">Không chấm được: {paLoi}</p>}

      {pa && !pa.ngheDuoc && <p className="mt-3 text-sm font-bold text-amber-800 dark:text-amber-300">
        AI <b>không nghe rõ</b> bản thu này nên không nhận xét. {pa.nhac}
      </p>}

      {pa && pa.ngheDuoc && <div className="mt-3 space-y-3">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-3xl font-black">{pa.deNghe}<span className="text-base">/100</span></span>
          <span className={`text-sm font-black ${mucDeNghe(pa.deNghe).mau}`}>{mucDeNghe(pa.deNghe).nhan}</span>
        </div>
        {pa.nghe && <p className="text-xs font-bold text-slate-500 dark:text-slate-400">AI nghe thành: “{pa.nghe}”</p>}
        {pa.tot.length > 0 && <ul className="text-sm font-bold text-emerald-700 dark:text-emerald-400 space-y-1">
          {pa.tot.map((x, i) => <li key={i}>✓ {x}</li>)}
        </ul>}
        {pa.can.length > 0 && <div className="space-y-2">
          {pa.can.map((x, i) => <div key={i} className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
            <p className="font-black text-sm">{x.tu}</p>
            {x.van && <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">{x.van}</p>}
            {x.sua && <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mt-1">→ {x.sua}</p>}
          </div>)}
        </div>}
        {pa.nhac && <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{pa.nhac}</p>}
      </div>}

      <p className="mt-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
        Đây là <b>nhận xét của một mô hình</b>, không phải điểm thi: con số trên đo “người bản ngữ nghe có trôi không”, không quy đổi sang IELTS hay VSTEP, và <b>không</b> được ghi vào Báo cáo tiến bộ.
      </p>
    </div>

    <p className="mt-4 text-xs font-black uppercase tracking-wide text-slate-400">Trình duyệt nghe được</p>
    <textarea
      value={banChu}
      onChange={(e) => setBanChu(e.target.value)}
      disabled={daNop}
      rows={5}
      placeholder="Bấm “Bắt đầu nói”, hoặc tự gõ lại lời bạn vừa nói vào đây…"
      className="mt-1 w-full border-3 border-slate-800 dark:border-slate-600 rounded-2xl p-4 font-medium bg-slate-50 dark:bg-slate-800 outline-none resize-y disabled:opacity-70"
    />
    <p className="text-[11px] font-bold text-slate-400 mt-1">
      Đây là chữ máy nghe ra, không phải bản ghi âm — máy có thể nghe sai, và bạn được sửa lại cho đúng lời mình đã nói.
    </p>

    {!daNop && <button
      onClick={() => { dung(); setDaNop(true); }}
      disabled={!banChu.trim()}
      className="mt-4 px-5 py-3 rounded-xl bg-purple-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
    >Nộp lượt nói</button>}

    {daNop && <>
      <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Máy đối chiếu được</p>
        <Dong dat={kq.doDai.dat}
          text={kq.doDai.dat
            ? `Độ dài đạt: trình duyệt nghe được ${kq.doDai.soTu} từ.`
            : `Còn thiếu ${kq.doDai.thieu} từ (nghe được ${kq.doDai.soTu}, cần ít nhất ${kq.doDai.min}).`} />
        {kq.tuMucTieu && <Dong dat={kq.tuMucTieu.dat}
          text={kq.tuMucTieu.dat
            ? `Trình duyệt nghe ra ${kq.tuMucTieu.daNghe.length}/${kq.tuMucTieu.can} từ mục tiêu: ${kq.tuMucTieu.daNghe.join(', ')}.`
            : `Trình duyệt mới nghe ra ${kq.tuMucTieu.daNghe.length}/${kq.tuMucTieu.can} từ mục tiêu — còn thiếu ${kq.tuMucTieu.con} từ nữa.`} />}

        <p className="mt-3 text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3">
          {kq.nguon} Máy <b>không</b> kiểm được: {kq.khongKiemDuoc.join(' · ')}.
          {/* Lý do đi theo DỮ LIỆU (xem speakingBank.js): cùng một cờ nay dùng cho
              cả chặng ngữ pháp và chặng nghe/đọc, hai chỗ không kiểm được hai thứ
              khác nhau. */}
          {de.chiKiemDuocDoDai && ` ${de.lyDoChiDoDoDai || ''}`}
        </p>
      </div>

      {/* CHƯA CÓ BÀI NÓI MẪU — nói thẳng, không lặng lẽ bỏ bước. */}
      <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-4 bg-slate-50 dark:bg-slate-800">
        <p className="text-sm font-black text-slate-500 flex items-center gap-1.5"><AlertTriangle size={15} /> Đề này chưa có bài nói mẫu</p>
        <p className="text-xs font-bold text-slate-500 mt-1.5 leading-relaxed">
          Đề gắn với chặng được máy đóng khung quanh danh sách từ của chặng đó. Bài mẫu thì <b>phải người làm ra</b> — máy sinh bài mẫu là bịa nội dung, đúng thứ đã bị xoá khỏi kho.
        </p>
      </div>

      <div className="mt-5">
        {coKey
          ? <button onClick={xinAi} disabled={aiDangChay}
              className="w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
              <Sparkles size={17} /> {aiDangChay ? 'Đang xin nhận xét…' : 'Xin nhận xét về NỘI DUNG bằng AI (key của bạn)'}
            </button>
          : <p className="text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-3">
              Muốn nhận xét chi tiết về <b>nội dung và ngữ pháp</b> thì cần key Gemini của bạn (mục Cài đặt). Không có key thì mọi bước ở trên vẫn dùng được đầy đủ.
            </p>}
        <p className="mt-2 text-[11px] font-bold text-slate-400">
          Nút trên chỉ gửi <b>bản chữ</b> — nó nhận xét nội dung và ngữ pháp, không nghe tiếng bạn. Muốn nhận xét <b>phát âm</b> thì dùng khối bên dưới.
        </p>
        {aiLoi && <p className="mt-2 text-xs font-bold text-rose-600">Không lấy được nhận xét: {aiLoi}</p>}
        {aiText && <div className="mt-3">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-1">Nhận xét của AI — hãy đọc bằng con mắt nghi ngờ</p>
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800 whitespace-pre-line text-sm font-medium leading-relaxed">{aiText}</div>
        </div>}
      </div>


      <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Bạn tự soi lượt nói của mình</p>
        {de.checklistLaChung && <p className="text-[11px] font-bold text-slate-400 mb-2">{GHI_CHU_CHECKLIST_NOI}</p>}
        <div className="space-y-2">
          {de.checklist.map((c, i) => <label key={i} className="flex gap-3 items-start p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 cursor-pointer">
            <input type="checkbox" checked={tick[i]} onChange={() => setTick((t) => t.map((v, j) => (j === i ? !v : v)))} className="mt-1 w-4 h-4 shrink-0" />
            <span className="text-sm font-bold">{c}</span>
          </label>)}
        </div>
        <p className="mt-3 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3">
          Đây là <b>bạn tự chấm</b>, không phải điểm đo được — nên Báo cáo tiến bộ vẫn ghi kỹ năng Nói là “chưa đo được”. Khối “Chấm phát âm” ở trên có AI <b>nghe thật</b>, nhưng đó vẫn là nhận xét của một mô hình chứ không phải điểm chuẩn thi cử — nên nó cũng không vào Báo cáo tiến bộ.
        </p>
        {!daLuu
          ? <button onClick={luu} className="mt-4 w-full px-5 py-3 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center justify-center gap-2 cursor-pointer">
              <CheckCircle2 size={17} /> Lưu lượt nói này vào sổ
            </button>
          : <p className="mt-4 text-center text-sm font-black text-emerald-700 dark:text-emerald-400">Đã lưu vào sổ lượt nói ✓</p>}
        <button onClick={onBack} className="mt-3 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black cursor-pointer">Chọn đề khác</button>
      </div>
    </>}
  </Khung>;
}

function Dong({ dat, text }) {
  return <p className="flex gap-2 items-start text-sm font-bold py-1">
    {dat ? <CheckCircle2 size={17} className="shrink-0 mt-0.5 text-emerald-600" /> : <XCircle size={17} className="shrink-0 mt-0.5 text-rose-500" />}
    <span>{text}</span>
  </p>;
}

function Khung({ children, onClose, onBack, tieuDe, phu }) {
  return <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="speaking-title">
    <section className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-purple-200 border-3 border-slate-900 flex items-center justify-center shrink-0"><Mic className="text-purple-800" /></div>
          <div className="min-w-0">
            <p className="text-xs font-black text-purple-700 uppercase tracking-widest truncate">{phu || 'Luyện nói'}</p>
            <h2 id="speaking-title" className="text-xl md:text-2xl font-black leading-tight">{tieuDe}</h2>
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
