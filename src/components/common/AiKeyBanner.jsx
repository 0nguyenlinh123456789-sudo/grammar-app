// File: src/components/common/AiKeyBanner.jsx
import { useEffect, useState } from 'react';
import { KeyRound, ShieldCheck } from 'lucide-react';
import { hasGeminiKey, openAiKeySettings, subscribeGeminiKey } from '../../utils/aiKey';

/**
 * Status strip for the bring-your-own-key AI features: confirms the learner's
 * own key is in place, or offers the shortcut to add one.
 */
// A saved key can still be rejected upstream, so a failed call outranks the
// "key is present" state — otherwise the learner reads a green banner while the
// feature keeps refusing them.
const KEY_ERROR_CODES = new Set(['missing-key', 'invalid-key', 'quota-exceeded']);

const AiKeyBanner = ({ feature = 'Tính năng AI', errorCode = '' }) => {
  const [ready, setReady] = useState(hasGeminiKey);
  useEffect(() => subscribeGeminiKey(() => setReady(hasGeminiKey())), []);

  if (ready && !KEY_ERROR_CODES.has(errorCode)) {
    return (
      <div className="bg-emerald-100 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 rounded-3xl p-5 border-[4px] border-emerald-700 dark:border-emerald-600 shadow-[5px_5px_0_0_#047857]">
        <div className="font-bold flex items-center gap-2">
          <ShieldCheck className="shrink-0 text-emerald-700 dark:text-emerald-400" /> {feature} đang chạy bằng API key Gemini của chính bạn.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-100 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 rounded-3xl p-5 border-[4px] border-amber-600 shadow-[5px_5px_0_0_#b45309] flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="font-bold flex items-center gap-2 flex-1">
        <KeyRound className="shrink-0 text-amber-700 dark:text-amber-400" />
        {errorCode === 'invalid-key' ? `${feature} chưa chạy được: API key Gemini của bạn bị Google từ chối.`
          : errorCode === 'quota-exceeded' ? `${feature} tạm dừng: key của bạn đã hết hạn mức miễn phí hôm nay.`
          : `${feature} cần API key Gemini của riêng bạn (đăng ký miễn phí, 2 phút).`}
      </div>
      <button onClick={openAiKeySettings} className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 text-white border-2 border-slate-900 font-black text-sm">
        {errorCode && errorCode !== 'missing-key' ? 'KIỂM TRA KEY' : 'THÊM API KEY'}
      </button>
    </div>
  );
};

export default AiKeyBanner;
