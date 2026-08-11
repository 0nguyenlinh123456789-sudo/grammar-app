// File: src/components/common/BunnyChat.jsx
// Floating Bunny tutor: a small chat panel over every screen that answers
// English-learning questions via the learner's own Gemini key (mode: 'chat'
// in api/ai — see functions/api/ai.js buildRequest).
import { useEffect, useRef, useState } from 'react';
import { KeyRound, Loader2, Send, X } from 'lucide-react';
import { requestAi } from '../../utils/aiClient';
import { hasGeminiKey, openAiKeySettings, subscribeGeminiKey } from '../../utils/aiKey';

const KEY_ERROR_CODES = new Set(['missing-key', 'invalid-key']);

const SUGGESTIONS = [
  'Khi nào dùng "a" và "the"?',
  'Phân biệt "make" và "do"?',
  'Cách học từ vựng nhớ lâu?',
];

const BunnyChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // {role: 'user'|'bunny', text}
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [keyReady, setKeyReady] = useState(hasGeminiKey);
  const listRef = useRef(null);

  useEffect(() => subscribeGeminiKey(() => setKeyReady(hasGeminiKey())), []);
  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages, open]);

  const ask = async (question) => {
    const q = question.trim();
    if (!q || busy) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setBusy(true);
    try {
      // Give the model the last few turns as plain-text context.
      const history = messages.slice(-4).map((m) => `${m.role === 'user' ? 'Học viên' : 'Bunny'}: ${m.text}`).join('\n');
      const { text } = await requestAi('chat', { question: q, history });
      setMessages((m) => [...m, { role: 'bunny', text }]);
    } catch (error) {
      const needKey = KEY_ERROR_CODES.has(error?.code);
      setMessages((m) => [...m, {
        role: 'bunny',
        text: needKey
          ? 'Tớ cần API key Gemini (miễn phí) để trả lời. Bấm nút "Thêm API key" bên dưới nhé! 🔑'
          : (error?.message || 'Tớ chưa trả lời được, thử lại sau nhé!'),
        needKey,
      }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Floating bunny button (left side; access badge owns bottom-right) */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Đóng Bunny AI' : 'Hỏi Bunny AI'}
        className="fixed left-3 bottom-20 lg:bottom-4 z-[110] w-14 h-14 rounded-full bg-white dark:bg-slate-800 border-3 border-slate-800 dark:border-slate-600 shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#000] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        {open
          ? <X size={22} className="text-slate-700 dark:text-slate-200" />
          : <img src="/bunny_logo.png" alt="" className="w-10 h-10 object-contain" draggable={false} />}
      </button>

      {open && (
        <div className="fixed left-3 right-3 sm:right-auto sm:w-[360px] bottom-36 lg:bottom-20 z-[110] bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#000] flex flex-col overflow-hidden" role="dialog" aria-label="Bunny AI chat">
          <div className="px-4 py-3 bg-gradient-to-r from-pink-100 to-yellow-100 dark:from-slate-800 dark:to-slate-800 border-b-3 border-slate-800 dark:border-slate-700 flex items-center gap-2.5">
            <img src="/bunny_logo.png" alt="" className="w-8 h-8 object-contain" draggable={false} />
            <div>
              <p className="font-black text-slate-900 dark:text-white leading-none">Bunny AI</p>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">Hỏi tớ mọi thứ về tiếng Anh nhé!</p>
            </div>
          </div>

          <div ref={listRef} className="flex-1 max-h-[45vh] min-h-40 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 text-center pt-2">Ví dụ, cậu có thể hỏi:</p>
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => ask(s)} className="block w-full text-left px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-pink-300 cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl border-2 text-sm font-bold whitespace-pre-wrap leading-relaxed ${
                m.role === 'user'
                  ? 'ml-auto bg-blue-100 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800 text-slate-800 dark:text-blue-100'
                  : 'bg-pink-50 dark:bg-slate-800 border-pink-200 dark:border-slate-600 text-slate-700 dark:text-slate-200'
              }`}>
                {m.text}
                {m.needKey && (
                  <button onClick={openAiKeySettings} className="mt-2 w-full py-2 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer">
                    <KeyRound size={13} /> THÊM API KEY
                  </button>
                )}
              </div>
            ))}
            {busy && <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5"><Loader2 size={13} className="animate-spin" /> Bunny đang nghĩ...</p>}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); ask(input); }}
            className="p-3 border-t-3 border-slate-800 dark:border-slate-700 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={keyReady ? 'Hỏi về ngữ pháp, từ vựng...' : 'Cần API key (bấm gửi để biết cách lấy)'}
              className="flex-1 h-11 px-3.5 rounded-xl border-3 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 dark:text-white font-bold text-sm outline-none focus:ring-3 focus:ring-pink-200"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Gửi" className="w-11 h-11 shrink-0 rounded-xl bg-pink-400 text-white border-3 border-slate-800 flex items-center justify-center disabled:opacity-40 cursor-pointer">
              <Send size={17} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default BunnyChat;
