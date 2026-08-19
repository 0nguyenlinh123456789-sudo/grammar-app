import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, KeyRound, Laptop, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import AdminAccessPanel from './AdminAccessPanel';
import PolicyDialog from '../common/PolicyDialog';
import { readAccessResponse } from '../../utils/apiResponse';
import { kenhDatMua, loiNhanDatMua, saoChepLoiNhan, CHUA_CO_KENH, CHUA_CO_GIA, giaGoi, maDonHang } from '../../utils/banHang';
import ChuyenKhoan from './ChuyenKhoan';
// Chỉ một con số — KHÔNG import roadmapData ở màn hình kích hoạt (xem
// scripts/build_roadmap.mjs, phần sinh roadmapCounts.js).
import { TONG_CHANG } from '../../data/roadmapCounts';

const DEVICE_KEY = 'grammarDeviceIdV1';

function getDeviceId() {
  let value = localStorage.getItem(DEVICE_KEY);
  if (!value) {
    value = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(DEVICE_KEY, value);
  }
  return value;
}

async function requestAccess(options = {}, { requireAuth = true } = {}) {
  let response;
  try {
    response = await fetch('/api/access', { credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, ...options });
  } catch {
    const error = new Error('Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.');
    error.status = 0;
    throw error;
  }
  // Fail closed: the app unlocks only on our own JSON saying `authenticated:
  // true` with an access record attached. See src/utils/apiResponse.js.
  return readAccessResponse(response, { requireAuth, requireFields: requireAuth ? ['access'] : [] });
}

// `npm run dev` skips the activation screen so the app is workable without a
// Redis-backed API. Set VITE_FORCE_ACCESS_GATE=1 in .env to exercise the real
// gate locally. Production builds always go through ProtectedApp.
const DEV_BYPASS = import.meta.env.DEV && import.meta.env.VITE_FORCE_ACCESS_GATE !== '1';

export default function AccessGate({ children }) {
  const params = new URLSearchParams(window.location.search);
  if (params.get('admin') === 'access') return <AdminAccessPanel />;
  if (DEV_BYPASS) return <>{children}<DevBypassNotice /></>;
  return <ProtectedApp>{children}</ProtectedApp>;
}

function DevBypassNotice() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return <aside className="fixed bottom-3 left-3 z-[100] max-w-xs flex items-start gap-2 bg-amber-300 text-slate-900 border-2 border-slate-900 rounded-2xl px-3 py-2 shadow-lg">
    <KeyRound size={16} className="shrink-0 mt-0.5" />
    <p className="text-[11px] font-black leading-snug">CHẾ ĐỘ DEV: cổng mã truy cập đang tắt. Bản deploy vẫn yêu cầu mã. Đặt VITE_FORCE_ACCESS_GATE=1 để bật thử.</p>
    <button onClick={() => setHidden(true)} aria-label="Ẩn thông báo" className="shrink-0 font-black leading-none">×</button>
  </aside>;
}

function ProtectedApp({ children }) {
  const [state, setState] = useState({ status: 'checking', access: null, message: '' });
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const verify = useCallback(async (silent = false) => {
    try {
      const data = await requestAccess();
      setState({ status: 'active', access: data.access, message: '' });
    } catch (error) {
      if (silent && error.status >= 500) return;
      setState({ status: error.code === 'not-configured' ? 'config' : 'locked', access: null, message: error.message });
    }
  }, []);

  useEffect(() => { verify(); }, [verify]);
  useEffect(() => {
    if (state.status !== 'active') return undefined;
    const timer = setInterval(() => verify(true), 5 * 60 * 1000);
    const onVisible = () => { if (document.visibilityState === 'visible') verify(true); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', onVisible); };
  }, [state.status, verify]);

  const activate = async (event) => {
    event.preventDefault(); setBusy(true);
    try {
      const data = await requestAccess({ method: 'POST', body: JSON.stringify({ action: 'activate', code, deviceId: getDeviceId() }) });
      setState({ status: 'active', access: data.access, message: '' });
      setCode('');
    } catch (error) { setState({ status: error.code === 'not-configured' ? 'config' : 'locked', access: null, message: error.message }); }
    finally { setBusy(false); }
  };

  const logout = async () => {
    await requestAccess({ method: 'POST', body: JSON.stringify({ action: 'logout' }) }, { requireAuth: false }).catch(() => {});
    setState({ status: 'locked', access: null, message: '' });
  };

  if (state.status === 'checking') return <div className="min-h-screen bg-[#fff9e8] dark:bg-slate-950 flex items-center justify-center"><div className="w-12 h-12 rounded-full border-4 border-slate-300 border-t-blue-500 animate-spin" aria-label="Đang kiểm tra quyền truy cập" /></div>;
  if (state.status === 'active') return <>{children}<AccessBadge access={state.access} onLogout={logout} /></>;

  return <main className="min-h-screen bg-[#fff9e8] dark:bg-slate-950 text-slate-900 dark:text-white p-5 flex flex-col items-center justify-center gap-10 relative overflow-hidden">
    <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-yellow-300/40 blur-3xl" /><div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-300/30 blur-3xl" />
    <section className="relative w-full max-w-5xl grid lg:grid-cols-[1.05fr_0.95fr] bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2.25rem] overflow-hidden shadow-[12px_12px_0_0_#1e293b]">
      <div className="p-7 md:p-10 bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-white/60 bg-white/15 text-xs font-black uppercase tracking-widest"><Sparkles size={15} /> Bunny English Premium</div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mt-6">Học tiếng Anh<br />có lộ trình rõ ràng.</h1>
        <p className="mt-4 text-blue-100 font-bold leading-relaxed">Một tài khoản mở toàn bộ kho ngữ pháp, từ vựng luyện thi (VSTEP/IELTS), phiên âm IPA toàn bộ từ vựng, trò chơi và trợ lý AI.</p>
        <ul className="mt-7 space-y-3">{['Lộ trình từ mất gốc (A0) đến B2, thêm nhánh C1 dự bị', 'Theo dõi XP, chuỗi học và tiến độ 7 ngày', 'Ôn từ thông minh theo lịch SRS', 'Dữ liệu học đồng bộ theo mã truy cập'].map((item) => <li key={item} className="flex items-center gap-3 font-black text-sm"><CheckCircle2 className="text-yellow-300 shrink-0" size={20} />{item}</li>)}</ul>
        <button type="button" onClick={() => setShowPricing(true)} className="mt-8 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border-2 border-white/70 font-black text-sm">XEM BẢNG GIÁ & QUYỀN LỢI →</button>
      </div>
      <form onSubmit={activate} className="p-7 md:p-10 flex flex-col justify-center">
        <div className="w-16 h-16 rounded-2xl bg-yellow-300 border-4 border-slate-900 flex items-center justify-center shadow-[4px_4px_0_0_#1e293b]"><KeyRound size={30} /></div>
        <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mt-6">Kích hoạt bản quyền</p>
        <h2 className="text-3xl font-black mt-1">Nhập mã truy cập</h2>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-2">Mã được gửi sau khi hoàn tất đăng ký. Mỗi mã chỉ dùng trên số thiết bị đã mua.</p>
        <label htmlFor="access-code" className="text-xs font-black uppercase text-slate-500 mt-6">Mã của bạn</label>
        <input id="access-code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} autoComplete="one-time-code" spellCheck="false" placeholder="GRAM-XXXX-XXXX-XXXX" className="mt-2 h-16 px-5 rounded-2xl border-4 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-mono font-black tracking-widest text-lg outline-none focus:ring-4 focus:ring-blue-200" required />
        {state.message && <p role="alert" className={`mt-3 text-sm font-bold ${state.status === 'config' ? 'text-amber-600' : 'text-rose-600'}`}>{state.message}</p>}
        <button disabled={busy || state.status === 'config'} className="mt-5 h-15 rounded-2xl bg-yellow-300 text-slate-950 border-4 border-slate-900 font-black shadow-[5px_5px_0_0_#1e293b] flex items-center justify-center gap-2 disabled:opacity-50">{busy ? 'ĐANG KÍCH HOẠT...' : <>MỞ KHÓA KHÓA HỌC <ArrowRight size={20} /></>}</button>
        <div className="grid grid-cols-2 gap-3 mt-6 text-xs font-black text-slate-500"><span className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-500" /> Kết nối bảo mật</span><span className="flex items-center gap-2"><Laptop size={17} className="text-blue-500" /> Kiểm soát thiết bị</span></div>
        <a href="/?admin=access" className="mt-7 text-center text-xs font-black text-slate-400 hover:text-blue-600">Dành cho quản trị viên</a>
        <button type="button" onClick={() => setShowPolicy(true)} className="mt-2 text-center text-[11px] font-bold text-slate-400 hover:text-blue-600 cursor-pointer">
          Điều khoản · Bảo mật · Hoàn tiền
        </button>
      </form>
    </section>
    <LandingSections onPricing={() => setShowPricing(true)} />
    {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    {showPolicy && <PolicyDialog onClose={() => setShowPolicy(false)} />}
  </main>;
}

// Public landing content shown under the activation card for visitors
// without a code — the sales pitch lives here, not behind the gate.
function LandingSections({ onPricing }) {
  const features = [
    // (#0-B1) Không hứa "4 kỹ năng"/"luyện nghe": app chưa có bài nghe đoạn dài
    // hay chấm nói thật — chỉ nghe TTS từng từ/câu và đọc to so khớp văn bản.
    { icon: '🎧', title: 'Học đủ chiều', desc: 'Ngữ pháp & Từ vựng chuyên sâu, đọc hiểu song ngữ, nghe phát âm chuẩn từng từ và trò chơi ôn tập.' },
    // (#0-E1 → #2 2026-08-13) Chữ này giờ đúng với cơ chế thật: làm xong test
    // đầu vào, pickNextMilestone chọn chặng chưa xong đầu tiên TỪ cấp độ đo
    // được trở lên và app mở thẳng chặng đó. Không hứa gì hơn thế — các cấp
    // dưới chỉ được gắn nhãn "Ôn lại", vẫn mở học bình thường.
    // (5.2) Chữ cũ: "Lộ trình A1 → C2 · 44 chặng". Sai hai chỗ: cam kết của sản
    // phẩm là B2 vững + nhánh C1 dự bị, KHÔNG hứa C2; và lộ trình đã là 617
    // chặng từ đợt 1 chứ không còn 44. Số chặng lấy từ dữ liệu, không viết tay.
    { icon: '🗺️', title: 'Lộ trình A0 → B2, thêm nhánh C1', desc: `${TONG_CHANG} chặng từ mất gốc đến B2 vững, cộng một nhánh C1 dự bị đi thêm. Làm test đầu vào, app mở thẳng chặng đúng trình độ của bạn.` },
    { icon: '🤖', title: 'Gia sư AI', desc: 'Chấm bài viết, quét từ vựng từ ảnh và hỏi đáp ngữ pháp bằng AI Gemini.' },
    { icon: '🧠', title: 'Ôn đúng lúc sắp quên', desc: 'Từ vựng và câu làm sai tự quay lại theo lịch khoa học 3–7–14 ngày.' },
    { icon: '🎮', title: 'Học mà chơi', desc: '6 trò chơi từ vựng, vườn thú thỏ Bunny, huy hiệu và chuỗi ngày học.' },
    { icon: '📊', title: 'Báo cáo rõ ràng', desc: 'Biểu đồ 7 ngày, báo cáo phụ huynh in được và chứng nhận hoàn thành.' },
  ];
  const faqs = [
    ['Tôi mất gốc có học được không?', 'Được! Bài test đầu vào 5 phút sẽ xếp bạn vào đúng chặng A1, học từ điều cơ bản nhất với hướng dẫn tiếng Việt.'],
    ['Học trên điện thoại được không?', 'Được — Bunny English chạy mượt trên điện thoại, máy tính bảng và máy tính; tiến độ đồng bộ theo mã truy cập.'],
    ['Tính năng AI có tốn thêm phí không?', 'Bạn dùng API key Gemini miễn phí của Google (hướng dẫn lấy trong 1 phút), nên AI không phát sinh phí hằng tháng.'],
  ];
  return <>
    <section className="relative w-full max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-black text-center">Vì sao chọn Bunny English?</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {features.map((f) => (
          <article key={f.title} className="bg-white dark:bg-slate-900 border-3 border-slate-900 dark:border-slate-700 rounded-3xl p-5 shadow-[5px_5px_0_0_#1e293b]">
            <p className="text-3xl" aria-hidden="true">{f.icon}</p>
            <h3 className="font-black text-lg mt-2">{f.title}</h3>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
    <section className="relative w-full max-w-3xl">
      <h2 className="text-2xl font-black text-center">Câu hỏi thường gặp</h2>
      <div className="mt-5 space-y-3">
        {faqs.map(([q, a]) => (
          <details key={q} className="bg-white dark:bg-slate-900 border-3 border-slate-900 dark:border-slate-700 rounded-2xl p-4 shadow-[4px_4px_0_0_#1e293b]">
            <summary className="font-black cursor-pointer">{q}</summary>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
      <div className="text-center mt-8 pb-6">
        <button onClick={onPricing} className="px-8 py-4 rounded-2xl bg-yellow-300 text-slate-950 border-4 border-slate-900 font-black text-lg shadow-[5px_5px_0_0_#1e293b] hover:translate-y-0.5 transition-all cursor-pointer">
          XEM BẢNG GIÁ & ĐĂNG KÝ HỌC 🐰
        </button>
      </div>
    </section>
  </>;
}

function PricingModal({ onClose }) {
  // ⚠️ ĐÃ ĐO TRÊN BẢN LIVE: không kênh nào được cấu hình, nên nhánh "chưa có
  // kênh" KHÔNG phải trường hợp hiếm — nó là trường hợp đang chạy. Xem
  // src/utils/banHang.js để biết ba chuyện từng sai cùng lúc ở đây.
  const kenh = kenhDatMua(import.meta.env);
  const [daChon, setDaChon] = useState(null);      // gói khách vừa bấm
  const [baoSaoChep, setBaoSaoChep] = useState('');
  // MỘT mã đơn cho cả lượt mở bảng giá, KHÔNG sinh lại mỗi lần bấm gói: khách
  // bấm Premium, chép mã, rồi bấm nhầm Standard là đủ để mã đổi và thứ họ vừa
  // chép thành rác. Một lần mở bảng giá là một đơn.
  const [maDon, setMaDon] = useState('');
  const loiNhan = daChon ? loiNhanDatMua(daChon, import.meta.env, maDon) : '';

  const requestPlan = async (plan) => {
    setDaChon(plan);
    const ma = maDon || maDonHang();
    if (!maDon) setMaDon(ma);
    // Có trang đặt mua thì mở luôn — đó là đường ngắn nhất. Nhưng VẪN hiện ô
    // lời nhắn bên dưới: cửa sổ bật lên có thể bị trình duyệt chặn, và lúc đó
    // khách không được rơi vào im lặng.
    const trang = kenh.find((k) => k.loai === 'trang');
    if (trang) window.open(trang.href, '_blank', 'noopener,noreferrer');
    const kq = await saoChepLoiNhan(loiNhanDatMua(plan, import.meta.env, ma));
    setBaoSaoChep(kq.chu);
  };
  // ══ ĐO 19/08: `plan` KHÔNG CHẶN TÍNH NĂNG NÀO CẢ ══
  // Đã dò hết src/ api/ functions/. `record.plan` chỉ dùng cho ĐÚNG hai việc:
  // hiện nhãn trong bảng quản trị, và `plan === 'lifetime'` thì `expiresAt`
  // bằng null (src/server/accessCore.js). Hết. Không màn hình nào đọc
  // `access.plan` để bật/tắt thứ gì.
  //
  // Nên bản chữ cũ BÁN PREMIUM BẰNG HAI DÒNG KHÔNG CÓ THẬT:
  //   · "Trợ lý AI viết/ảnh/hỏi-đáp" — api/ai.js ghi thẳng trong mã rằng nó
  //     KHÔNG kiểm gói, vì mọi lượt AI tính vào key Gemini của chính người học.
  //     Khách Standard mang key thì dùng AI y hệt.
  //   · "Placement test & chứng nhận" — PlacementTest.jsx và LearningReport.jsx
  //     không có một dòng nào nhắc tới plan.
  //
  // Cách chữa là SỬA CHỮ cho khớp thứ đang chạy, KHÔNG phải đi thêm chặn theo
  // gói: chặn AI theo gói thì trái hẳn quyết định BYOK — khách tự trả tiền cho
  // key của họ, mình không có cớ gì bắt trả thêm để được dùng key của chính họ.
  //
  // Hai thứ KHÁC NHAU THẬT giữa các gói, và cả hai đều cưỡng chế được:
  //   · SỐ THIẾT BỊ — `maxDevices` chặn thật trong api/access.js;
  //   · THỜI HẠN — `expiresAt`, và lifetime thì bằng null.
  // Đó là toàn bộ thứ được phép ghi lên bảng giá.
  const plans = [
    { name: 'Standard', caption: 'Học một mình, một máy', color: 'bg-slate-100', features: ['Toàn bộ lộ trình A0 → B2 và nhánh C1 dự bị', 'Đủ mọi tính năng học: SRS, trò chơi, báo cáo, placement test, chứng nhận', 'Trợ lý AI đầy đủ bằng API key miễn phí của bạn', '1 thiết bị · theo thời hạn đã mua'], action: 'MUA STANDARD' },
    { name: 'Premium', caption: 'Học trên nhiều máy', color: 'bg-yellow-200', features: ['Nội dung và AI GIỐNG HỆT Standard — không tính năng nào bị khóa bớt', 'Tối đa 3 thiết bị: điện thoại, máy tính, máy tính bảng cùng một mã', 'Tiến độ đồng bộ giữa các thiết bị', 'Thời hạn dài hơn theo gói bạn chọn'], action: 'MUA PREMIUM', popular: true },
    { name: 'Trọn đời', caption: 'Mua một lần', color: 'bg-indigo-200', features: ['Mọi thứ của Premium', 'KHÔNG HẾT HẠN — mã dùng mãi mãi, không phải gia hạn', 'Tối đa 5 thiết bị', 'Nhận mọi bản cập nhật nội dung về sau'], action: 'MUA TRỌN ĐỜI' },
  ];
  return <div className="fixed inset-0 z-[140] bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="pricing-title"><div className="max-w-5xl mx-auto my-5 bg-[#fffdf4] dark:bg-slate-900 text-slate-900 dark:text-white border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] p-5 md:p-8 shadow-[10px_10px_0_0_#020617]"><div className="flex justify-between items-start gap-4"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Đầu tư cho kết quả học</p><h2 id="pricing-title" className="text-3xl md:text-4xl font-black mt-1">Chọn gói phù hợp</h2><p className="text-sm font-bold text-slate-500 mt-2">Mã truy cập được cấp sau khi xác nhận thanh toán.</p></div><button onClick={onClose} className="w-10 h-10 rounded-xl border-3 border-slate-800 font-black">×</button></div><div className="grid md:grid-cols-3 gap-4 mt-7">{plans.map((plan) => <article key={plan.name} className={`relative ${plan.color} text-slate-900 border-3 border-slate-900 rounded-3xl p-5 shadow-[4px_4px_0_0_#1e293b]`}>{plan.popular && <span className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-rose-500 text-white border-2 border-slate-900 text-[10px] font-black">ĐƯỢC CHỌN NHIỀU</span>}<h3 className="text-2xl font-black">{plan.name}</h3><p className="text-xs font-black uppercase mt-1 opacity-70">{plan.caption}</p>{(() => { const g = giaGoi(plan.name, import.meta.env); return g ? <p className="text-2xl font-black mt-3">{g}</p> : <p className="text-sm font-black mt-3 text-rose-700">{CHUA_CO_GIA}</p>; })()}<ul className="mt-5 space-y-2.5">{plan.features.map((feature) => <li key={feature} className="text-sm font-bold flex gap-2"><CheckCircle2 size={17} className="shrink-0 text-emerald-700" />{feature}</li>)}</ul><button onClick={() => requestPlan(plan.name)} className="w-full mt-6 px-3 py-3 rounded-xl bg-slate-900 text-white border-2 border-slate-900 font-black text-sm">{plan.action}</button></article>)}</div>{daChon && <section className="mt-7 border-3 border-slate-900 dark:border-slate-600 rounded-2xl p-4 bg-amber-50 dark:bg-slate-800"><p className="text-sm font-black">Đơn của bạn: gói {daChon}</p><ChuyenKhoan maDon={maDon} soTien={giaGoi(daChon, import.meta.env)} env={import.meta.env} />{kenh.length > 0 ? <><p className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">Bước 2 — sau khi đã chuyển khoản, gửi mã đơn cho người bán qua một trong các kênh sau để nhận mã truy cập:</p><div className="flex flex-wrap gap-2 mt-3">{kenh.map((k) => <a key={k.loai} href={k.href} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl bg-slate-900 text-white border-2 border-slate-900 font-black text-xs">{k.nhan} · {k.hien}</a>)}</div></> : <p className="text-xs font-bold text-rose-700 dark:text-rose-300 mt-1">{CHUA_CO_KENH}</p>}<textarea readOnly value={loiNhan} onFocus={(e) => e.target.select()} rows={2} aria-label="Lời nhắn đặt mua" className="w-full mt-3 p-2.5 rounded-xl border-2 border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-bold" />{baoSaoChep && <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-2">{baoSaoChep}</p>}</section>}<div className="mt-7 grid md:grid-cols-3 gap-3 text-xs font-bold text-slate-600 dark:text-slate-300"><p>🧪 Có thể bắt đầu bằng placement test.</p><p>🔒 Mã không lưu dạng plaintext.</p><p>💬 Mã truy cập được cấp sau khi xác nhận thanh toán.</p></div></div></div>;
}

function AccessBadge({ access, onLogout }) {
  const expires = access?.expiresAt ? new Intl.DateTimeFormat('vi-VN').format(new Date(access.expiresAt)) : 'Trọn đời';
  return <aside className="fixed bottom-20 lg:bottom-3 right-3 z-[100] group"><div className="flex items-center gap-2 bg-slate-900 text-white border-2 border-slate-700 rounded-2xl px-3 py-2 shadow-lg"><ShieldCheck size={17} className="text-emerald-400" /><div><p className="text-[10px] font-black uppercase text-emerald-300">{access?.plan || 'premium'}</p><p className="text-[10px] font-bold text-slate-300 flex items-center gap-1"><Clock3 size={10} /> {expires}</p></div><button onClick={onLogout} title="Đăng xuất mã truy cập" className="ml-1 w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-600 flex items-center justify-center"><LogOut size={14} /></button></div></aside>;
}
