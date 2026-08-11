// File: src/components/common/PolicyDialog.jsx
// Điều khoản / Bảo mật / Hoàn tiền — the trust layer buyers expect to see
// before paying. Content is plain JSX (no server round-trip) so it also works
// offline and inside the access gate.
import { useEffect, useState } from 'react';
import { FileText, ShieldCheck, RotateCcw } from 'lucide-react';

const TABS = [
  {
    id: 'terms',
    label: 'Điều khoản',
    icon: FileText,
    body: (
      <>
        <p><strong>1. Dịch vụ.</strong> Bunny English là ứng dụng tự học tiếng Anh (ngữ pháp, từ vựng, 4 kỹ năng) dành cho người dùng cá nhân. Quyền truy cập được cấp qua mã truy cập theo gói (Standard / Premium / Lifetime) với thời hạn ghi trên mã.</p>
        <p><strong>2. Tài khoản &amp; thiết bị.</strong> Mỗi mã truy cập giới hạn số thiết bị theo gói đã mua. Không chia sẻ, bán lại hoặc công khai mã truy cập; mã bị lạm dụng có thể bị khóa.</p>
        <p><strong>3. Nội dung.</strong> Toàn bộ bài học, dữ liệu và hình ảnh thuộc về Bunny English hoặc các bên cấp phép. Bạn được dùng cho việc học cá nhân, không sao chép hay phân phối lại.</p>
        <p><strong>4. Tính năng AI.</strong> Các tính năng AI (chấm Writing, Quét ảnh) hoạt động bằng API key Google Gemini do chính bạn cung cấp và chịu điều khoản của Google. Ứng dụng không bán API key.</p>
        <p><strong>5. Thay đổi dịch vụ.</strong> Chúng tôi có thể cập nhật, thêm hoặc điều chỉnh tính năng để cải thiện việc học; các quyền lợi cốt lõi của gói đã mua được giữ trong suốt thời hạn mã.</p>
      </>
    ),
  },
  {
    id: 'privacy',
    label: 'Bảo mật',
    icon: ShieldCheck,
    body: (
      <>
        <p><strong>1. Dữ liệu học tập</strong> (XP, chuỗi ngày, bài đã hoàn thành, bộ từ ôn tập) được lưu ngay trên thiết bị của bạn và đồng bộ lên máy chủ gắn với mã truy cập — chỉ để khôi phục khi bạn đổi thiết bị. Không dùng cho quảng cáo.</p>
        <p><strong>2. API key Gemini</strong> chỉ nằm trong trình duyệt của bạn, được gửi thẳng tới Google khi bạn dùng tính năng AI. Máy chủ Bunny English không lưu key.</p>
        <p><strong>3. Ảnh bạn quét</strong> được gửi tới Google Gemini để phân tích bằng key của bạn; ứng dụng không lưu ảnh trên máy chủ.</p>
        <p><strong>4. Thông tin mua hàng</strong> (tên/liên hệ khi đăng ký mã) chỉ dùng để cấp mã, hỗ trợ và thông báo gia hạn.</p>
        <p><strong>5. Xóa dữ liệu.</strong> Bạn có thể yêu cầu xóa dữ liệu đồng bộ và thông tin mua hàng bất kỳ lúc nào qua kênh hỗ trợ đã mua hàng.</p>
      </>
    ),
  },
  {
    id: 'refund',
    label: 'Hoàn tiền',
    icon: RotateCcw,
    body: (
      <>
        <p><strong>1. Trong 7 ngày đầu</strong> kể từ khi kích hoạt mã, nếu ứng dụng lỗi nghiêm trọng trên thiết bị của bạn mà không khắc phục được, bạn được hoàn 100% học phí.</p>
        <p><strong>2. Mã chưa kích hoạt</strong> được hoàn tiền toàn phần trong 30 ngày kể từ ngày mua.</p>
        <p><strong>3. Không áp dụng hoàn tiền</strong> khi mã đã dùng quá 7 ngày, hoặc mã bị khóa do chia sẻ/lạm dụng.</p>
        <p><strong>4. Cách yêu cầu.</strong> Nhắn tin kèm mã truy cập qua đúng kênh bạn đã mua hàng; xử lý trong tối đa 3 ngày làm việc.</p>
      </>
    ),
  },
];

const PolicyDialog = ({ onClose, initialTab = 'terms' }) => {
  const [tab, setTab] = useState(initialTab);
  const active = TABS.find((t) => t.id === tab) || TABS[0];

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-title"
      className="fixed inset-0 z-[140] bg-slate-900/70 backdrop-blur-sm flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl my-6 bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#1e293b] dark:shadow-[8px_8px_0_0_#000]">
        <div className="flex items-start justify-between gap-4 mb-5">
          <h2 id="policy-title" className="text-2xl font-black text-slate-900 dark:text-white">Chính sách Bunny English</h2>
          <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 shrink-0 rounded-xl border-3 border-slate-800 dark:border-slate-600 dark:text-white font-black cursor-pointer">×</button>
        </div>

        <div className="flex gap-2 mb-5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 py-2.5 px-3 rounded-xl border-3 font-black text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                tab === id
                  ? 'bg-yellow-300 border-slate-800 text-slate-900 shadow-none translate-y-0.5'
                  : 'bg-white dark:bg-slate-800 border-slate-800 dark:border-slate-600 text-slate-600 dark:text-slate-300 shadow-[2px_2px_0_0_#1e293b] dark:shadow-[2px_2px_0_0_#020617]'
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        <div className="space-y-3 text-sm font-bold leading-relaxed text-slate-700 dark:text-slate-300 max-h-[55vh] overflow-y-auto pr-1 custom-scrollbar">
          {active.body}
          <p className="text-xs text-slate-400 dark:text-slate-500 pt-2">Cập nhật lần cuối: 11/08/2026.</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyDialog;
