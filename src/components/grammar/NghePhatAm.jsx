// File: src/components/grammar/NghePhatAm.jsx
//
// TAB "NGHE & ĐỌC" CHO CỤM NỀN TẢNG A0.
//
// ══ LỖ HỔNG NÓ VÁ ══
// Bài đầu tiên người mất gốc mở ra là "Bảng Chữ Cái", và nó là một trang CHỮ:
// 26 tên chữ ghi bằng IPA mà người học chưa được dạy đọc. Bài thứ hai dạy IPA,
// cũng bằng chữ. Nói cách khác, hai bài về ÂM THANH lại không phát ra tiếng
// nào, và không có chỗ nào để người học đọc thử rồi biết mình đọc đúng chưa.
//
// ══ HAI PHẦN, HAI RANH GIỚI KHÁC NHAU ══
//  · NGHE  → `speechSynthesis`, chạy offline, không tốn gì. Là GIỌNG MÁY, nên
//            kèm `MachineVoiceTag` và ghi rõ accent vừa đọc.
//  · ĐỌC   → thu bằng micro rồi gửi cho Gemini bằng key của CHÍNH người học
//            (quyết định BYOK). Cần mạng và cần key.
// Trộn hai thứ vào một tab là cố ý: nghe rồi đọc lại ngay là vòng luyện tự
// nhiên. Nhưng phần nghe KHÔNG được chết theo phần chấm — không có key thì vẫn
// phải nghe được.
//
// ⚠️ BA RANH GIỚI CỦA `chamPhatAm.js` GIỮ NGUYÊN CHỮ, KHÔNG DIỄN ĐẠT LẠI:
// nhận xét của mô hình chứ không phải điểm thi; không nghe rõ thì nói là không
// nghe rõ; kết quả không ghi vào Báo cáo tiến bộ.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, Mic, Square, Sparkles, KeyRound, AlertTriangle } from 'lucide-react';
import MachineVoiceTag from '../common/MachineVoiceTag';
import { docTo, docDuoc, chonGiongAnh, theoDoiGiong, ngungDoc, nhanAccent, loiDocThanhChu } from '../../utils/docTiengAnh';
import { batDauGhiAm, ghiAmDuoc, loiGhiAmThanhChu } from '../../utils/ghiAm';
import { chamPhatAm, mucDeNghe } from '../../utils/chamPhatAm';
import { hasGeminiKey, openAiKeySettings } from '../../utils/aiKey';

// Một lượt chấm gói tối đa ngần này mục. Gửi cả 26 chữ trong một bản thu 3 giây
// thì mô hình hoặc trả `ngheDuoc: false`, hoặc bịa ra một nhận xét cho thứ nó
// không nghe thấy — cả hai đều tệ hơn là không có nút.
const TOI_DA_MOI_LUOT = 8;

export default function NghePhatAm({ nghe, topicTitle = '' }) {
  const muc = useMemo(() => (Array.isArray(nghe?.muc) ? nghe.muc.filter((m) => m && m.doc) : []), [nghe]);
  const giongUaThich = nghe?.giong || 'en-GB';

  // Gom theo `nhom`, giữ nguyên thứ tự xuất hiện trong dữ liệu.
  // Bài IPA có hai nhóm dạy hai thứ khác nhau (ký hiệu lạ mặt · năm cách đọc
  // "ough"); trộn chúng vào một lưới thì mất luôn cái đối lập là nội dung chính.
  const theoNhom = useMemo(() => {
    const m = new Map();
    for (const x of muc) {
      const k = x.nhom || '';
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(x);
    }
    return [...m.entries()].map(([ten, ds]) => ({ ten, ds }));
  }, [muc]);

  const [coGiong, setCoGiong] = useState(null); // null = đang dò, chuỗi lang, hoặc false
  const [dangDoc, setDangDoc] = useState('');
  const [loiDoc, setLoiDoc] = useState('');

  // Dò giọng: `getVoices()` rỗng cho tới khi `voiceschanged` nổ, mà sự kiện đó
  // có thể đã nổ trước khi component gắn vào — `theoDoiGiong` xử lý cả hai.
  useEffect(() => {
    if (!docDuoc()) { setCoGiong(false); return undefined; }
    return theoDoiGiong(() => {
      const v = chonGiongAnh(giongUaThich);
      setCoGiong(v ? v.lang : false);
    });
  }, [giongUaThich]);

  useEffect(() => ngungDoc, []);

  const nghi = (m) => {
    const kq = docTo(m.doc, { giong: giongUaThich });
    if (!kq.ok) { setLoiDoc(loiDocThanhChu(kq.loi)); return; }
    setLoiDoc('');
    setDangDoc(m.hien);
    window.setTimeout(() => setDangDoc((x) => (x === m.hien ? '' : x)), 900);
  };

  // ── Phần chấm phát âm ────────────────────────────────────────────────────
  const [nhom, setNhom] = useState(0);
  // Cắt theo NHÓM trước, rồi mới cắt nhỏ trong nhóm. Cắt phẳng theo số lượng
  // thì một lượt chấm có thể vắt qua hai nhóm — bảo người học đọc liền "bird,
  // though, through" là ba thứ chẳng liên quan gì nhau.
  const goi = useMemo(() => {
    const ra = [];
    for (const n of theoNhom) {
      for (let i = 0; i < n.ds.length; i += TOI_DA_MOI_LUOT) ra.push(n.ds.slice(i, i + TOI_DA_MOI_LUOT));
    }
    return ra;
  }, [theoNhom]);
  const goiHienTai = goi[Math.min(nhom, Math.max(goi.length - 1, 0))] || [];

  const [dangThu, setDangThu] = useState(false);
  const [banThu, setBanThu] = useState(null); // {url, blob, huy}
  const [loiThu, setLoiThu] = useState('');
  const [pa, setPa] = useState(null);
  const [paLoi, setPaLoi] = useState('');
  const [paDangChay, setPaDangChay] = useState(false);
  const mayThu = useRef(null);

  // Bản thu là blob URL: không tự biến mất, quên huỷ là rò bộ nhớ tới lúc tải
  // lại trang. Cùng luật đã ghi ở `ghiAm.js`.
  useEffect(() => () => {
    if (mayThu.current) { try { mayThu.current.boGiuaChung(); } catch { /* ignore */ } }
    if (banThu?.huy) banThu.huy();
  }, [banThu]);

  const doiGoi = (i) => {
    setNhom(i);
    if (banThu?.huy) banThu.huy();
    setBanThu(null); setPa(null); setPaLoi(''); setLoiThu('');
  };

  const batDau = async () => {
    setLoiThu(''); setPa(null); setPaLoi('');
    if (banThu?.huy) { banThu.huy(); setBanThu(null); }
    const kq = await batDauGhiAm();
    if (!kq.ok) { setLoiThu(loiGhiAmThanhChu(kq.loi)); return; }
    mayThu.current = kq;
    setDangThu(true);
  };

  const dungLai = async () => {
    const may = mayThu.current;
    if (!may) return;
    mayThu.current = null;
    setDangThu(false);
    const kq = await may.dung();
    if (kq.loi) { setLoiThu(loiGhiAmThanhChu(kq.loi)); return; }
    setBanThu(kq);
  };

  const xinCham = async () => {
    if (!banThu?.blob) return;
    setPaDangChay(true); setPaLoi(''); setPa(null);
    try {
      // `target` là ĐÚNG cụm vừa đọc, không phải cả bảng: mô hình cần biết nó
      // đang nghe cái gì thì mới chỉ ra được chữ nào sai.
      setPa(await chamPhatAm(banThu.blob, {
        target: goiHienTai.map((m) => m.doc).join(', '),
        topicTitle,
      }));
    } catch (e) {
      setPaLoi(e?.message || 'Không chấm được, thử lại sau nhé.');
    } finally {
      setPaDangChay(false);
    }
  };

  if (muc.length === 0) {
    // Không bao giờ nên tới đây: tab chỉ hiện khi `nghe.muc` có mục đọc được.
    // Giữ nhánh này để nếu dữ liệu hụt thì BÁO, chứ không ra một tab trống.
    return <div className="rounded-2xl border-[3px] border-slate-800 dark:border-slate-600 p-5 bg-amber-50 dark:bg-amber-950/30 font-bold text-sm">
      Bài này chưa có dữ liệu nghe.
    </div>;
  }

  const coKey = hasGeminiKey();
  const nhanGiong = coGiong ? nhanAccent(coGiong) : '';

  return <div className="space-y-6">

    {/* ══ NGHE ══ */}
    <section className="rounded-[2rem] border-[4px] border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-900 p-5 md:p-6 shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#000]">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="text-lg font-black flex items-center gap-2"><Volume2 size={19} /> Bấm để nghe</h3>
        <MachineVoiceTag />
        {/* Bài dạy "Z = /zed/ (Anh-Anh) hoặc /ziː/ (Anh-Mỹ)" mà máy chỉ đọc
            được MỘT kiểu. Không ghi accent thì đúng chữ Z, tiếng nghe được mâu
            thuẫn với chữ đọc được và người học không biết bên nào sai. */}
        {nhanGiong && <span className="px-2 py-0.5 rounded-lg bg-sky-100 dark:bg-sky-950/50 border border-sky-300 dark:border-sky-800 text-[10px] font-black uppercase tracking-wide text-sky-700 dark:text-sky-300">
          {nhanGiong}
        </span>}
      </div>

      {coGiong === false && (
        <p className="mt-3 rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/40 p-3 text-sm font-bold text-amber-900 dark:text-amber-200 flex gap-2">
          <AlertTriangle size={17} className="shrink-0 mt-0.5" />
          <span>{loiDocThanhChu(docDuoc() ? 'khong-co-giong' : 'khong-ho-tro')}</span>
        </p>
      )}
      {coGiong === null && <p className="mt-3 text-xs font-bold text-slate-400">Đang tìm giọng tiếng Anh trên máy…</p>}

      {theoNhom.map((n) => (
        <div key={n.ten} className="mt-4">
          {theoNhom.length > 1 && n.ten && (
            <p className="text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">{n.ten}</p>
          )}
          <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {n.ds.map((m) => (
              <button
                key={m.hien}
                onClick={() => nghi(m)}
                disabled={coGiong === false}
                title={m.ghi || undefined}
                className={`rounded-2xl border-[3px] border-slate-800 dark:border-slate-600 px-2 py-3 text-center transition-transform cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  dangDoc === m.hien ? 'bg-yellow-300 dark:bg-yellow-600 scale-105' : 'bg-slate-50 dark:bg-slate-800 hover:-translate-y-0.5'
                }`}
              >
                <span className="block text-xl font-black text-slate-900 dark:text-white leading-none break-words">{m.hien}</span>
                <span className="block mt-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 break-words">{m.ipa}</span>
                {/* Ở bài IPA `doc` khác `hien`: ký hiệu /θ/ không đọc được, chỉ
                    nghe được nó NẰM TRONG một từ. Phải hiện từ đó ra, nếu không
                    người học nghe "think" mà tưởng đó là cách đọc chữ "θ". */}
                {m.doc !== m.hien && <span className="block text-[11px] font-black text-indigo-600 dark:text-indigo-300 break-words">nghe trong: {m.doc}</span>}
              </button>
            ))}
          </div>
          {n.ds.some((m) => m.ghi) && (
            <ul className="mt-3 space-y-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
              {n.ds.filter((m) => m.ghi).map((m) => <li key={m.hien}>📌 <b>{m.hien}</b> — {m.ghi}</li>)}
            </ul>
          )}
        </div>
      ))}

      {loiDoc && <p className="mt-3 text-xs font-bold text-rose-600 dark:text-rose-400">{loiDoc}</p>}
    </section>

    {/* ══ ĐỌC LẠI & NHỜ AI NGHE ══ */}
    <section className="rounded-[2rem] border-[4px] border-slate-800 dark:border-slate-600 bg-indigo-50 dark:bg-indigo-950/30 p-5 md:p-6 shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#000]">
      <h3 className="text-lg font-black flex items-center gap-2 text-indigo-900 dark:text-indigo-200">
        <Mic size={19} /> Đọc thử — AI NGHE bản thu của bạn
      </h3>

      {goi.length > 1 && (
        <>
          <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">Đọc từng cụm một</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {goi.map((g, i) => (
              <button key={i} onClick={() => doiGoi(i)}
                className={`px-3 py-1.5 rounded-xl border-[3px] border-slate-800 dark:border-slate-600 text-xs font-black cursor-pointer ${
                  i === nhom ? 'bg-slate-900 text-white' : 'bg-white dark:bg-slate-800 dark:text-slate-200'
                }`}>
                {g[0].hien}–{g[g.length - 1].hien}
              </button>
            ))}
          </div>
        </>
      )}

      <p className="mt-4 font-bold text-slate-700 dark:text-slate-200">
        Đọc to: <span className="font-black text-slate-900 dark:text-white">{goiHienTai.map((m) => m.doc).join(' · ')}</span>
      </p>

      {!ghiAmDuoc()
        ? <p className="mt-3 text-xs font-bold text-slate-500 dark:text-slate-400">Trình duyệt này không thu được tiếng. Hãy thử Chrome hoặc Safari bản mới.</p>
        : <div className="mt-3 flex flex-wrap gap-2">
            {!dangThu
              ? <button onClick={batDau} className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 dark:text-slate-100 border-[3px] border-slate-800 dark:border-slate-600 font-black inline-flex items-center gap-2 cursor-pointer">
                  <Mic size={17} /> Bắt đầu đọc
                </button>
              : <button onClick={dungLai} className="px-5 py-3 rounded-xl bg-rose-500 text-white border-[3px] border-slate-800 font-black inline-flex items-center gap-2 cursor-pointer">
                  <Square size={15} /> Dừng lại
                </button>}
            {banThu?.url && <audio src={banThu.url} controls className="h-12" />}
          </div>}

      {loiThu && <p className="mt-3 text-xs font-bold text-rose-600 dark:text-rose-400">{loiThu}</p>}

      {/* Chỉ bày nút chấm khi ĐÃ CÓ bản thu — mời người ta bấm vào một chỗ chưa
          dùng được cũng là một kiểu nói dối nhỏ. */}
      {!banThu
        ? <p className="mt-3 text-xs font-bold text-slate-500 dark:text-slate-400">Thu xong sẽ có nút nhờ AI nghe và nhận xét.</p>
        : !coKey
          ? <p className="mt-3 text-xs font-bold text-slate-600 dark:text-slate-300">
              Cần API key Gemini của riêng bạn (miễn phí) — bản thu được gửi thẳng tới Google bằng key đó.
              <button onClick={openAiKeySettings} className="ml-2 underline font-black cursor-pointer inline-flex items-center gap-1"><KeyRound size={12} /> Thêm key</button>
            </p>
          : <button onClick={xinCham} disabled={paDangChay}
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
    </section>
  </div>;
}
