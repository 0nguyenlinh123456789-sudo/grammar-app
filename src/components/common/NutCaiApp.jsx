import { useEffect, useState } from 'react';
import { Smartphone, Share } from 'lucide-react';

// File: src/components/common/NutCaiApp.jsx
//
// MỜI CÀI APP VÀO MÁY — HAI NHÁNH TÁCH HẲN, VÌ HAI HỆ ĐIỀU HÀNH KHÔNG GIỐNG NHAU.
//
// ══ VÌ SAO KHÔNG THỂ DÙNG MỘT NÚT CHO CẢ HAI ══
// Chromium (Android, máy tính) bắn `beforeinstallprompt`; bắt được sự kiện đó
// thì mới có `prompt()` để bật hộp thoại cài thật.
//
// **iOS Safari KHÔNG BAO GIỜ bắn sự kiện đó.** Trên iPhone/iPad, thêm app vào
// màn hình chính chỉ làm được bằng tay: nút Chia sẻ → "Thêm vào MH chính". Nghĩa
// là một nút kiểu Chromium sẽ hoặc không hiện, hoặc hiện mà bấm không ra gì —
// đúng trên chiếc máy mà chủ web sẽ thử đầu tiên. "Nút không làm gì cả" là họ
// lỗi đã vá ở fc1b31b và không được quay lại dưới dạng khác.
//
// Nên: Chromium ⇒ NÚT THẬT. iOS ⇒ CHỈ DẪN bằng chữ, không có nút giả nào.
//
// ══ CÀI RỒI THÌ BIẾN MẤT ══
// `display-mode: standalone` khớp nghĩa là đang chạy trong bản đã cài. Mời cài
// một app đang chạy dưới dạng app là nói sai với người dùng.
//
// ⚠️ KHÔNG ĐO ĐƯỢC BẰNG BỘ RÀ Ở ĐÂY: `beforeinstallprompt` gần như không bắn
// trong Chrome headless, nên không có bước rà nào đòi "nút cài hiện ra" — một
// bước như thế sẽ đỏ vì môi trường đo, và cách "sửa" duy nhất là làm yếu sản
// phẩm. Cái ĐO ĐƯỢC là nhánh iOS và nhánh đã-cài; xem scripts/ra_cai_dat.mjs.

/** Máy iOS (kể cả iPad đời mới khai là Macintosh nhưng có cảm ứng). */
function laIOS() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  return /Macintosh/.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document;
}

function daCaiRoi() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;
}

export default function NutCaiApp() {
  const [loiMoi, setLoiMoi] = useState(null);   // sự kiện beforeinstallprompt
  const [daCai, setDaCai] = useState(false);
  const [dangHoi, setDangHoi] = useState(false);

  useEffect(() => {
    setDaCai(daCaiRoi());
    const bat = (e) => { e.preventDefault(); setLoiMoi(e); };
    const xong = () => { setDaCai(true); setLoiMoi(null); };
    window.addEventListener('beforeinstallprompt', bat);
    window.addEventListener('appinstalled', xong);

    // ⚠️ PHẢI NGHE `display-mode` ĐỔI, KHÔNG CHỈ ĐỌC MỘT LẦN LÚC GẮN.
    // Bản đầu chỉ gọi `daCaiRoi()` trong lần chạy đầu của effect. Cửa sổ chuyển
    // sang chế độ app GIỮA CHỪNG — người dùng cài từ menu trình duyệt, hoặc mở
    // sang cửa sổ app trên máy tính — thì `appinstalled` không phải lúc nào cũng
    // bắn trong chính tài liệu này, và panel cứ thế mời cài một app đang chạy
    // dưới dạng app. Bộ rà bắt được đúng chỗ đó (`ra:caidat` 14/15).
    const mq = window.matchMedia ? window.matchMedia('(display-mode: standalone)') : null;
    const doiCheDo = () => setDaCai(daCaiRoi());
    if (mq && mq.addEventListener) mq.addEventListener('change', doiCheDo);

    return () => {
      window.removeEventListener('beforeinstallprompt', bat);
      window.removeEventListener('appinstalled', xong);
      if (mq && mq.removeEventListener) mq.removeEventListener('change', doiCheDo);
    };
  }, []);

  if (daCai) return null;

  // ── NHÁNH iOS: CHỈ DẪN, KHÔNG NÚT ─────────────────────────────────────────
  if (laIOS()) {
    return (
      <section aria-label="Cài app vào máy" data-cong-cu="cai-app" className="px-4 py-3 border-t-[4px] border-slate-800 dark:border-slate-700 shrink-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Smartphone size={15} className="text-slate-700 dark:text-slate-300 shrink-0" />
          <p className="font-black text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-300">Cài vào máy cho tiện</p>
        </div>
        <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-snug">
          Bấm nút <Share size={12} className="inline align-[-2px]" /> Chia sẻ ở thanh dưới Safari, rồi chọn
          {' '}<span className="font-black text-slate-800 dark:text-slate-200">Thêm vào MH chính</span>.
        </p>
      </section>
    );
  }

  // ── NHÁNH CHROMIUM: NÚT THẬT, VÀ CHỈ KHI THẬT SỰ CÀI ĐƯỢC ─────────────────
  // Chưa bắt được `beforeinstallprompt` thì KHÔNG vẽ gì. Vẽ một nút lúc này là
  // vẽ một nút bấm không ra gì.
  if (!loiMoi) return null;

  const bamCai = async () => {
    setDangHoi(true);
    try {
      loiMoi.prompt();
      const { outcome } = await loiMoi.userChoice;
      if (outcome === 'accepted') setDaCai(true);
      // Sự kiện chỉ dùng được MỘT lần; giữ lại là giữ một nút đã hỏng.
      setLoiMoi(null);
    } finally {
      setDangHoi(false);
    }
  };

  return (
    <section aria-label="Cài app vào máy" data-cong-cu="cai-app" className="px-4 py-3 border-t-[4px] border-slate-800 dark:border-slate-700 shrink-0">
      <button
        type="button"
        onClick={bamCai}
        disabled={dangHoi}
        className="w-full h-10 rounded-xl bg-slate-900 text-white border-[3px] border-slate-900 font-black text-[11px] shadow-[3px_3px_0_0_#94a3b8] flex items-center justify-center gap-1.5 disabled:opacity-50"
      >
        <Smartphone size={14} />Cài Bunny English vào máy
      </button>
      <p className="mt-1.5 text-[10px] font-bold text-slate-400 leading-snug">
        Mở thẳng từ màn hình chính, không cần vào trình duyệt.
      </p>
    </section>
  );
}
