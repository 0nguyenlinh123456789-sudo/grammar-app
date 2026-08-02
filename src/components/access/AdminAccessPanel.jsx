import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle, Check, Clock3, Copy, Download, KeyRound, Laptop,
  LockKeyhole, LogOut, Pause, Play, Plus, RefreshCw, Search, ShieldCheck, Trash2,
} from 'lucide-react';

const apiRequest = async (options = {}) => {
  const response = await fetch('/api/access-admin', {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Không thể kết nối máy chủ.');
    error.status = response.status;
    throw error;
  }
  return data;
};

const formatDate = (value) => value
  ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(value))
  : 'Trọn đời';

const planName = { standard: 'Standard', premium: 'Premium', lifetime: 'Trọn đời' };

export default function AdminAccessPanel() {
  const [authenticated, setAuthenticated] = useState(null);
  const [secret, setSecret] = useState('');
  const [codes, setCodes] = useState([]);
  const [audit, setAudit] = useState([]);
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [revealedCode, setRevealedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ customer: '', label: 'Tài khoản học tiếng Anh', plan: 'premium', durationDays: '90', maxDevices: '1' });

  const loadCodes = async () => {
    try {
      const data = await apiRequest();
      setCodes(data.codes || []);
      setAudit(data.audit || []);
      setAuthenticated(true);
    } catch (error) {
      if (error.status === 401) setAuthenticated(false);
      else setMessage(error.message);
    }
  };

  useEffect(() => { loadCodes(); }, []);

  const login = async (event) => {
    event.preventDefault();
    setBusy('login'); setMessage('');
    try {
      await apiRequest({ method: 'POST', body: JSON.stringify({ action: 'login', secret }) });
      setSecret('');
      await loadCodes();
    } catch (error) { setMessage(error.message); }
    finally { setBusy(''); }
  };

  const createCode = async (event) => {
    event.preventDefault();
    setBusy('create'); setMessage(''); setRevealedCode('');
    try {
      const data = await apiRequest({ method: 'POST', body: JSON.stringify({ action: 'create', ...form }) });
      setRevealedCode(data.code);
      setCodes((current) => [data.record, ...current]);
      setForm((current) => ({ ...current, customer: '' }));
    } catch (error) { setMessage(error.message); }
    finally { setBusy(''); }
  };

  const runAction = async (code, action, extras = {}) => {
    if (action === 'delete' && !window.confirm(`Xóa vĩnh viễn mã của ${code.customer || code.label}?`)) return;
    if (action === 'rotate' && !window.confirm('Đổi mã sẽ đăng xuất toàn bộ thiết bị đang dùng mã cũ. Tiếp tục?')) return;
    setBusy(`${action}:${code.codeHash}`); setMessage(''); setRevealedCode('');
    try {
      const data = await apiRequest({ method: 'POST', body: JSON.stringify({ action, codeHash: code.codeHash, ...extras }) });
      if (action === 'delete') setCodes((current) => current.filter((item) => item.codeHash !== code.codeHash));
      else if (action === 'rotate') {
        setRevealedCode(data.code);
        setCodes((current) => current.map((item) => item.codeHash === code.codeHash ? data.record : item));
      } else {
        setCodes((current) => current.map((item) => item.codeHash === code.codeHash ? data.record : item));
      }
      await loadCodes();
    } catch (error) { setMessage(error.message); }
    finally { setBusy(''); }
  };

  const logout = async () => {
    await apiRequest({ method: 'POST', body: JSON.stringify({ action: 'logout' }) }).catch(() => {});
    setAuthenticated(false); setCodes([]);
  };

  const visibleCodes = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi');
    return keyword ? codes.filter((code) => `${code.customer} ${code.label} ${code.codePreview}`.toLocaleLowerCase('vi').includes(keyword)) : codes;
  }, [codes, query]);

  const stats = useMemo(() => ({
    active: codes.filter((code) => code.status === 'active' && (!code.expiresAt || new Date(code.expiresAt) > new Date())).length,
    paused: codes.filter((code) => code.status === 'paused').length,
    devices: codes.reduce((sum, code) => sum + code.deviceCount, 0),
  }), [codes]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(revealedCode);
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };

  const exportCsv = () => {
    const rows = [['Khách hàng', 'Nhãn', 'Gói', 'Trạng thái', 'Mã', 'Thiết bị', 'Hết hạn'], ...codes.map((code) => [
      code.customer, code.label, planName[code.plan], code.status, code.codePreview, `${code.deviceCount}/${code.maxDevices}`, code.expiresAt || 'Trọn đời',
    ])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell || '').replaceAll('"', '""')}"`).join(',')).join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
    link.download = `access-codes-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click(); URL.revokeObjectURL(link.href);
  };

  if (authenticated === null) return <FullPageLoader />;

  if (!authenticated) return (
    <main className="min-h-screen bg-[#f7f3e8] dark:bg-slate-950 flex items-center justify-center p-5">
      <form onSubmit={login} className="w-full max-w-md bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] p-7 shadow-[9px_9px_0_0_#1e293b]">
        <div className="w-16 h-16 rounded-2xl bg-amber-300 border-4 border-slate-900 flex items-center justify-center mb-5"><LockKeyhole size={30} /></div>
        <p className="text-xs font-black tracking-[0.2em] text-amber-600 uppercase">Khu vực chủ sở hữu</p>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">Quản lý mã truy cập</h1>
        <p className="text-sm font-bold text-slate-500 mt-2">Nhập khóa quản trị được cấu hình trên máy chủ. Khóa này không được lưu trong trình duyệt.</p>
        <label className="block mt-6 text-xs font-black uppercase text-slate-500" htmlFor="admin-secret">Khóa quản trị</label>
        <input id="admin-secret" type="password" autoComplete="current-password" value={secret} onChange={(event) => setSecret(event.target.value)} className="mt-2 w-full h-14 px-4 rounded-2xl border-3 border-slate-800 bg-slate-50 dark:bg-slate-800 dark:text-white font-bold outline-none focus:ring-4 focus:ring-amber-200" required />
        {message && <p role="alert" className="mt-3 text-sm font-bold text-rose-600">{message}</p>}
        <button disabled={busy === 'login'} className="mt-5 w-full h-14 rounded-2xl bg-slate-900 text-white border-3 border-slate-900 font-black shadow-[4px_4px_0_0_#fbbf24] disabled:opacity-60">{busy === 'login' ? 'ĐANG KIỂM TRA...' : 'MỞ BẢNG QUẢN TRỊ'}</button>
        <a href="/" className="block text-center mt-5 text-sm font-black text-slate-500 hover:text-blue-600">← Về trang học</a>
      </form>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#f7f3e8] dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7">
          <div><p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Grammar Pro · Owner Console</p><h1 className="text-3xl md:text-5xl font-black mt-1">Quản lý quyền truy cập</h1><p className="font-bold text-slate-500 mt-2">Cấp mã, kiểm soát thiết bị và vô hiệu hóa quyền theo thời gian thực.</p></div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportCsv} className="px-4 py-3 rounded-xl border-3 border-slate-800 bg-white dark:bg-slate-800 font-black flex items-center gap-2"><Download size={17} /> Xuất CSV</button>
            <button onClick={loadCodes} className="px-4 py-3 rounded-xl border-3 border-slate-800 bg-white dark:bg-slate-800 font-black flex items-center gap-2"><RefreshCw size={17} /> Làm mới</button>
            <button onClick={logout} className="px-4 py-3 rounded-xl border-3 border-slate-800 bg-rose-100 dark:bg-rose-950 font-black flex items-center gap-2"><LogOut size={17} /> Đăng xuất</button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
          <Metric icon={<ShieldCheck />} label="Mã đang hoạt động" value={stats.active} color="bg-emerald-300" />
          <Metric icon={<Pause />} label="Mã đang tạm khóa" value={stats.paused} color="bg-amber-300" />
          <Metric icon={<Laptop />} label="Thiết bị đã kích hoạt" value={stats.devices} color="bg-blue-300" />
        </section>

        {revealedCode && <section className="mb-7 p-5 bg-emerald-100 dark:bg-emerald-950/40 border-4 border-emerald-600 rounded-3xl shadow-[5px_5px_0_0_#047857]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><p className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300">Lưu mã này ngay · chỉ hiển thị một lần</p><p className="font-mono text-xl sm:text-2xl font-black tracking-wider mt-1">{revealedCode}</p></div><button onClick={copyCode} className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border-3 border-slate-800 font-black flex items-center justify-center gap-2">{copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Đã sao chép' : 'Sao chép mã'}</button></div>
        </section>}
        {message && <p role="alert" className="mb-5 p-4 rounded-2xl bg-rose-100 border-3 border-rose-500 text-rose-700 font-black flex items-center gap-2"><AlertTriangle /> {message}</p>}

        <section className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6 items-start">
          <form onSubmit={createCode} className="bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-3xl p-5 shadow-[6px_6px_0_0_#1e293b] xl:sticky xl:top-5">
            <h2 className="text-xl font-black flex items-center gap-2"><Plus className="text-blue-600" /> Cấp mã mới</h2>
            <Field label="Tên khách hàng"><input value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} placeholder="Nguyễn Văn A" required /></Field>
            <Field label="Ghi chú / đơn hàng"><input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required /></Field>
            <Field label="Gói sản phẩm"><select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value, durationDays: e.target.value === 'lifetime' ? '0' : (form.durationDays === '0' ? '90' : form.durationDays) })}><option value="standard">Standard</option><option value="premium">Premium</option><option value="lifetime">Trọn đời</option></select></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Thời hạn"><select disabled={form.plan === 'lifetime'} value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: e.target.value })}>{form.plan === 'lifetime' && <option value="0">Trọn đời</option>}<option value="30">30 ngày</option><option value="90">90 ngày</option><option value="180">180 ngày</option><option value="365">1 năm</option></select></Field>
              <Field label="Số thiết bị"><select value={form.maxDevices} onChange={(e) => setForm({ ...form, maxDevices: e.target.value })}>{[1, 2, 3, 5, 10].map((n) => <option key={n} value={n}>{n} máy</option>)}</select></Field>
            </div>
            <button disabled={busy === 'create'} className="w-full mt-5 h-13 rounded-2xl bg-blue-500 text-white border-3 border-slate-900 font-black shadow-[4px_4px_0_0_#1e293b] disabled:opacity-50">{busy === 'create' ? 'ĐANG TẠO...' : 'TẠO MÃ TRUY CẬP'}</button>
          </form>

          <div>
            <div className="relative mb-4"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm khách hàng, ghi chú hoặc 4 ký tự cuối..." className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white dark:bg-slate-900 border-3 border-slate-800 font-bold outline-none focus:ring-4 focus:ring-blue-200" /></div>
            <div className="space-y-3">
              {visibleCodes.map((code) => <AccessCodeCard key={code.codeHash} code={code} busy={busy.includes(code.codeHash)} onAction={runAction} />)}
              {visibleCodes.length === 0 && <div className="p-10 text-center bg-white dark:bg-slate-900 border-3 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl"><KeyRound size={40} className="mx-auto text-slate-300" /><p className="font-black text-slate-500 mt-3">Chưa có mã truy cập phù hợp.</p></div>}
            </div>
            {audit.length > 0 && <section className="mt-7 bg-white dark:bg-slate-900 border-3 border-slate-800 dark:border-slate-700 rounded-3xl p-5"><h2 className="font-black flex items-center gap-2"><Clock3 size={18} className="text-blue-600" /> Nhật ký thao tác gần đây</h2><div className="mt-3 divide-y divide-slate-200 dark:divide-slate-700">{audit.slice(0, 8).map((entry, index) => <div key={`${entry.at}-${index}`} className="py-2.5 flex items-center justify-between gap-3 text-xs"><div><span className="font-black uppercase text-blue-600">{auditLabel(entry.action)}</span><span className="font-bold text-slate-600 dark:text-slate-300"> · {entry.customer || 'Không tên'}</span></div><time className="font-bold text-slate-400 shrink-0">{new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(entry.at))}</time></div>)}</div></section>}
          </div>
        </section>
      </div>
    </main>
  );
}

function FullPageLoader() { return <div className="min-h-screen bg-[#f7f3e8] flex items-center justify-center"><RefreshCw className="animate-spin text-blue-600" size={34} /></div>; }
function Metric({ icon, label, value, color }) { return <div className="bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-3xl p-5 flex items-center gap-4 shadow-[5px_5px_0_0_#1e293b]"><div className={`w-12 h-12 rounded-2xl border-3 border-slate-900 flex items-center justify-center ${color}`}>{icon}</div><div><p className="text-3xl font-black">{value}</p><p className="text-xs font-black text-slate-500 uppercase">{label}</p></div></div>; }
function Field({ label, children }) { return <label className="block mt-4 text-xs font-black uppercase text-slate-500">{label}{<span className="block mt-1 [&>input]:w-full [&>input]:h-12 [&>input]:px-3 [&>input]:rounded-xl [&>input]:border-3 [&>input]:border-slate-700 [&>input]:bg-slate-50 dark:[&>input]:bg-slate-800 [&>input]:font-bold [&>select]:w-full [&>select]:h-12 [&>select]:px-3 [&>select]:rounded-xl [&>select]:border-3 [&>select]:border-slate-700 [&>select]:bg-slate-50 dark:[&>select]:bg-slate-800 [&>select]:font-bold">{children}</span>}</label>; }

function AccessCodeCard({ code, busy, onAction }) {
  const expired = code.expiresAt && new Date(code.expiresAt) <= new Date();
  const active = code.status === 'active' && !expired;
  return <article className="bg-white dark:bg-slate-900 border-3 border-slate-800 dark:border-slate-700 rounded-2xl p-4 shadow-[3px_3px_0_0_#cbd5e1] dark:shadow-[3px_3px_0_0_#020617]">
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-black text-lg truncate">{code.customer || 'Chưa đặt tên'}</h3><span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-full border-2 ${active ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-rose-100 border-rose-400 text-rose-700'}`}>{expired ? 'Hết hạn' : code.status === 'paused' ? 'Tạm khóa' : 'Hoạt động'}</span><span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-full bg-blue-100 text-blue-700">{planName[code.plan]}</span></div><p className="text-sm font-bold text-slate-500 mt-1">{code.label}</p><div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs font-black text-slate-500"><span className="font-mono text-slate-800 dark:text-slate-200">{code.codePreview}</span><span className="flex items-center gap-1"><Laptop size={14} /> {code.deviceCount}/{code.maxDevices} thiết bị</span><span className="flex items-center gap-1"><Clock3 size={14} /> {formatDate(code.expiresAt)}</span></div></div>
      <div className="flex flex-wrap gap-2 md:justify-end shrink-0">
        <SmallButton onClick={() => onAction(code, 'update', { status: code.status === 'paused' ? 'active' : 'paused' })} disabled={busy} icon={code.status === 'paused' ? <Play /> : <Pause />} label={code.status === 'paused' ? 'Mở' : 'Khóa'} />
        <SmallButton onClick={() => onAction(code, 'update', { extendDays: 30 })} disabled={busy} icon={<Clock3 />} label="+30 ngày" />
        {code.deviceCount > 0 && <SmallButton onClick={() => onAction(code, 'update', { resetDevices: true })} disabled={busy} icon={<Laptop />} label="Xóa máy" />}
        <SmallButton onClick={() => onAction(code, 'rotate')} disabled={busy} icon={<RefreshCw />} label="Đổi mã" />
        <SmallButton onClick={() => onAction(code, 'delete')} disabled={busy} icon={<Trash2 />} label="Xóa" danger />
      </div>
    </div>
  </article>;
}
function SmallButton({ icon, label, danger, ...props }) { return <button type="button" {...props} className={`px-3 py-2 rounded-xl border-2 border-slate-700 text-xs font-black flex items-center gap-1.5 disabled:opacity-40 ${danger ? 'bg-rose-100 text-rose-700' : 'bg-slate-50 dark:bg-slate-800'}`}>{icon && <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{icon}</span>}{label}</button>; }
function auditLabel(action) { return ({ create: 'Cấp mã', pause: 'Cập nhật trạng thái', update: 'Cập nhật', rotate: 'Đổi mã', delete: 'Xóa mã' }[action] || action); }
