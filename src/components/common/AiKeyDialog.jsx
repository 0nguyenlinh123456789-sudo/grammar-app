// File: src/components/common/AiKeyDialog.jsx
import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, ExternalLink, Eye, EyeOff, KeyRound, Loader2, ShieldCheck, Trash2 } from 'lucide-react';
import {
  clearGeminiKey, getGeminiKey, isValidGeminiKey, maskGeminiKey, saveGeminiKey,
} from '../../utils/aiKey';

const AI_STUDIO_URL = 'https://aistudio.google.com/app/apikey';

// Failures raised by the access layer before the key is ever used.
const ACCESS_ERROR_CODES = new Set(['access-required', 'access-unavailable', 'access-not-configured']);

const STEPS = [
  <>Mở <strong>Google AI Studio</strong> bằng nút bên dưới rồi đăng nhập tài khoản Google của bạn.</>,
  <>Bấm <strong>“Create API key”</strong> (Tạo khóa API). Gói miễn phí đủ dùng cho việc học hằng ngày.</>,
  <>Sao chép <strong>toàn bộ</strong> chuỗi key rồi dán vào ô bên dưới. Google cấp key ở hai dạng — mở đầu bằng <code className="font-mono">AIza…</code> hoặc <code className="font-mono">AQ.…</code> — app nhận cả hai.</>,
];

/**
 * Lets each learner store their own Gemini API key in this browser.
 * The app ships without a shared key, so this dialog is the only way to turn on
 * the AI features (chấm writing, quét ảnh).
 */
const AiKeyDialog = ({ onClose }) => {
  const [savedKey, setSavedKey] = useState(getGeminiKey);
  const [draft, setDraft] = useState('');
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const save = (event) => {
    event.preventDefault();
    try {
      const key = saveGeminiKey(draft);
      setSavedKey(key);
      setDraft('');
      setStatus({ type: 'ok', message: 'Đã lưu key vào trình duyệt này. Các tính năng AI đã sẵn sàng.' });
    } catch {
      setStatus({ type: 'error', message: 'Key không đúng định dạng. Key của Google AI Studio dài khoảng 39 ký tự và chỉ gồm chữ, số, dấu - hoặc _.' });
    }
  };

  const remove = () => {
    clearGeminiKey();
    setSavedKey('');
    setDraft('');
    setStatus({ type: 'ok', message: 'Đã xóa key khỏi trình duyệt này.' });
  };

  // A real round-trip through /api/ai is the only honest way to prove the key
  // works: format alone says nothing about quota or permissions.
  const testKey = async () => {
    const key = isValidGeminiKey(draft) ? draft.trim() : savedKey;
    if (!key) {
      setStatus({ type: 'error', message: 'Hãy dán key vào ô bên trên trước khi kiểm tra.' });
      return;
    }
    setTesting(true);
    setStatus({ type: '', message: '' });
    try {
      const { requestAi } = await import('../../utils/aiClient');
      await requestAi('writing', { text: 'I am testing my API key.' }, { apiKey: key });
      setStatus({ type: 'ok', message: 'Key hoạt động tốt! Bạn đã có thể dùng chấm writing và quét ảnh bằng AI.' });
    } catch (error) {
      // A lapsed access session is not a bad key — saying so would send the
      // learner off hunting for a new key that they do not need.
      const message = ACCESS_ERROR_CODES.has(error?.code)
        ? `Chưa kiểm tra được key vì phiên truy cập của bạn có vấn đề: ${error.message} Key vẫn được lưu, hãy đăng nhập lại mã truy cập rồi thử lại.`
        : error?.message || 'Chưa kiểm tra được key. Hãy thử lại sau.';
      setStatus({ type: 'error', message });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-key-title"
      className="fixed inset-0 z-[130] bg-slate-900/70 dark:bg-black/80 backdrop-blur-sm flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-xl my-6 bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-yellow-300 border-4 border-slate-900 flex items-center justify-center shrink-0">
              <KeyRound size={24} className="text-slate-900" />
            </div>
            <div>
              <h2 id="ai-key-title" className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Khóa AI (API key)</h2>
              <p className="text-xs font-black uppercase tracking-widest text-blue-600 mt-1">Mỗi người dùng key riêng của mình</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 shrink-0 rounded-xl border-3 border-slate-800 dark:border-slate-600 dark:text-white font-black">×</button>
        </div>

        <div className="mt-5 flex items-start gap-3 p-4 rounded-2xl border-3 border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30">
          <ShieldCheck size={20} className="shrink-0 text-emerald-700 dark:text-emerald-400 mt-0.5" />
          <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
            Key chỉ được lưu trong trình duyệt này và chỉ dùng để gọi thẳng tới Google Gemini cho các bài của bạn. Ứng dụng không lưu key trên máy chủ và không dùng chung key với người khác.
          </p>
        </div>

        {savedKey ? (
          <div className="mt-5 p-4 rounded-2xl border-3 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
            <p className="text-xs font-black uppercase text-slate-500">Key đang dùng</p>
            <div className="flex items-center justify-between gap-3 mt-1.5">
              <code className="font-mono font-black text-lg text-slate-800 dark:text-slate-100 truncate">
                {visible ? savedKey : maskGeminiKey(savedKey)}
              </code>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setVisible((value) => !value)} aria-label={visible ? 'Ẩn key' : 'Hiện key'} className="w-10 h-10 rounded-xl border-2 border-slate-700 dark:border-slate-500 bg-white dark:bg-slate-900 dark:text-white flex items-center justify-center">
                  {visible ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
                <button onClick={remove} className="px-3 h-10 rounded-xl border-2 border-rose-500 bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-black text-xs flex items-center gap-1.5">
                  <Trash2 size={15} /> XÓA
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ol className="mt-5 space-y-2.5">
            {STEPS.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                <span className="w-6 h-6 shrink-0 rounded-lg bg-blue-500 text-white font-black text-xs flex items-center justify-center">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}

        <a
          href={AI_STUDIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full h-12 rounded-2xl bg-blue-500 text-white border-3 border-slate-900 font-black shadow-[4px_4px_0_0_#1e293b] flex items-center justify-center gap-2"
        >
          LẤY KEY MIỄN PHÍ TẠI GOOGLE AI STUDIO <ExternalLink size={17} />
        </a>

        <form onSubmit={save} className="mt-5">
          <label htmlFor="gemini-key" className="text-xs font-black uppercase text-slate-500">
            {savedKey ? 'Dán key mới để thay thế' : 'Dán key của bạn vào đây'}
          </label>
          <input
            id="gemini-key"
            type="password"
            autoComplete="off"
            spellCheck="false"
            value={draft}
            onChange={(event) => { setDraft(event.target.value); setStatus({ type: '', message: '' }); }}
            placeholder="AIzaSy... hoặc AQ...."
            className="mt-2 w-full h-14 px-4 rounded-2xl border-3 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-white font-mono font-bold outline-none focus:ring-4 focus:ring-blue-200"
          />

          {status.message && (
            <p
              role="status"
              className={`mt-3 text-sm font-bold flex items-start gap-2 ${status.type === 'ok' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}
            >
              {status.type === 'ok' ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : <AlertTriangle size={18} className="shrink-0 mt-0.5" />}
              {status.message}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              type="submit"
              disabled={!draft.trim()}
              className="flex-1 h-13 py-3 rounded-2xl bg-yellow-300 text-slate-900 border-3 border-slate-900 font-black shadow-[4px_4px_0_0_#1e293b] disabled:opacity-50"
            >
              LƯU KEY
            </button>
            <button
              type="button"
              onClick={testKey}
              disabled={testing || (!draft.trim() && !savedKey)}
              className="flex-1 h-13 py-3 rounded-2xl bg-white dark:bg-slate-800 dark:text-white border-3 border-slate-800 dark:border-slate-600 font-black shadow-[4px_4px_0_0_#1e293b] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {testing ? <><Loader2 size={17} className="animate-spin" /> ĐANG KIỂM TRA...</> : 'KIỂM TRA KEY'}
            </button>
          </div>
        </form>

        <details className="mt-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-3">
          <summary className="cursor-pointer text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">
            ❓ Gặp khó? 3 tình huống thường gặp
          </summary>
          <ul className="mt-3 space-y-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
            <li><strong>Không thấy nút "Create API key":</strong> hãy đăng nhập Google trước, sau đó vào lại đường link. Nếu trang hỏi đồng ý điều khoản, bấm chấp nhận rồi nút tạo key sẽ hiện ra.</li>
            <li><strong>Sợ mất phí:</strong> gói miễn phí của Google không cần thẻ ngân hàng. Hết lượt miễn phí trong ngày thì AI tạm nghỉ, không bao giờ tự trừ tiền.</li>
            <li><strong>Key báo không hợp lệ:</strong> kiểm tra đã sao chép <strong>đủ cả chuỗi</strong> và không dính dấu cách ở đầu/cuối. Key của Google mở đầu bằng <code className="font-mono">AIza</code> hoặc <code className="font-mono">AQ.</code>, cả hai đều dùng được. Bấm <strong>KIỂM TRA KEY</strong> để xác nhận hoạt động.</li>
          </ul>
        </details>

        <p className="mt-4 text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
          Không có key thì mọi phần học vẫn dùng bình thường; chỉ hai tính năng cần AI là <strong>Gia sư Writing</strong> và <strong>Quét ảnh</strong> sẽ tạm nghỉ. Nếu dùng máy chung, hãy bấm <strong>XÓA</strong> khi học xong.
        </p>
      </div>
    </div>
  );
};

export default AiKeyDialog;
