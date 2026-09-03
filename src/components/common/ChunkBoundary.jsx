// File: src/components/common/ChunkBoundary.jsx
//
// LƯỚI ĐỠ RIÊNG CHO LỖI "KHÔNG TẢI ĐƯỢC MẢNH MÃ".
//
// Trước đây app chỉ có MỘT lưới `ErrorBoundary` ở `main.jsx`. Một mảnh mã tải
// hỏng (404 sau khi đẩy bản mới, hoặc mất mạng) rơi thẳng xuống đó, và cả màn
// hình bị thay bằng "Ối! Thỏ vấp phải một lỗi" — mất luôn thanh điều hướng và
// mọi thứ người học đang mở. Lý do đầy đủ ở đầu `src/utils/taiChunk.js`.
//
// Lưới này đứng NGAY TRÊN `<Suspense>` của tuyến, nên khi mảnh mã hỏng thì chỉ
// vùng nội dung đổi thành lời báo, còn khung app vẫn còn.
//
// ══ NÓ CHỈ NHẬN ĐÚNG MỘT LOẠI LỖI ══
// Lỗi KHÁC (một component ném lúc chạy) được NÉM LẠI trong `render` để lưới
// gốc ở `main.jsx` bắt như cũ — kèm báo cáo sao chép được. Một lưới bắt tất tay
// sẽ nuốt mất những lỗi thật và biến chúng thành câu "chắc do mạng", đúng họ
// với bộ lọc từng làm bậc C1 mỏng đi lặng lẽ.
//
// ══ VÌ SAO NÚT LÀ "TẢI LẠI TRANG" CHỨ KHÔNG PHẢI "THỬ LẠI" ══
// `React.lazy` gọi hàm dựng đúng một lần và nhớ luôn kết quả; hỏng rồi thì mọi
// lần vẽ sau đều ném lại đúng lỗi cũ, KHÔNG gọi lại `import()`. Một nút "Thử
// lại" chỉ xoá trạng thái lỗi sẽ là nút chết. Việc thử lại thật đã nằm bên
// trong hàm dựng (`nhapLai`, 2 lượt); tới được màn này nghĩa là đã thử hết.
import { Component, Suspense } from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import { laLoiTaiChunk, tuTaiLaiMotLan } from '../../utils/taiChunk';
import DangMo from './DangMo';

export default class ChunkBoundary extends Component {
  state = { error: null, daThuTuTaiLai: false };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    if (!laLoiTaiChunk(error)) return;   // để `render` ném lại cho lưới gốc
    console.error('Không tải được mảnh mã', error);
    // ⚠️ CHỈ TUYẾN CHÍNH MỚI ĐƯỢC TỰ TẢI LẠI — XEM `tuTaiLai` Ở CUỐI FILE.
    if (!this.props.tuTaiLai) return;
    // Trường hợp thường gặp nhất: vừa đẩy bản mới, tab cũ đi xin tên tệp cũ.
    // Tải lại trang là cách sửa THẬT (index.html mới mang tên băm mới). Chỉ một
    // lần cho mỗi tab — xem chốt chống lặp trong taiChunk.js.
    if (!tuTaiLaiMotLan()) this.setState({ daThuTuTaiLai: true });
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    // Không phải lỗi tải mảnh mã → trả về đúng đường cũ: lưới gốc ở main.jsx.
    if (!laLoiTaiChunk(error)) throw error;

    const mangDut = typeof navigator !== 'undefined' && navigator.onLine === false;
    return (
      <div className="max-w-lg mx-auto mt-16 p-6 text-center bg-white dark:bg-slate-900 border-4 border-amber-500 rounded-3xl shadow-[6px_6px_0_0_#b45309]" role="alert">
        <p className="text-3xl mb-2" aria-hidden="true">{mangDut ? '📡' : '🔄'}</p>
        <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">
          {mangDut ? 'Mất mạng nên chưa tải được phần này' : 'Chưa tải được phần này'}
        </h2>
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">
          {mangDut
            ? 'Hãy bật lại mạng rồi bấm Tải lại trang. Tiến độ đã lưu của bạn vẫn nguyên vẹn.'
            : 'Thường là do web vừa được cập nhật bản mới trong lúc tab này đang mở. Bấm Tải lại trang là xong — tiến độ đã lưu của bạn vẫn nguyên vẹn.'}
        </p>
        {/* Nói ra là ĐÃ tự thử, để người học không tưởng app chưa làm gì. */}
        <p className="text-[11px] font-bold text-slate-400 mb-5">
          {this.state.daThuTuTaiLai
            ? 'Đã tự tải lại trang một lần nhưng vẫn chưa được — lần này cần bạn bấm.'
            : 'Đã tự thử tải lại vài lượt trước khi báo.'}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            onClick={() => window.location.reload()}
            className="py-3 px-4 bg-yellow-300 text-slate-950 border-3 border-slate-800 rounded-xl font-black shadow-[3px_3px_0_0_#1e293b] cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} /> Tải lại trang
          </button>
          <button
            onClick={() => window.location.assign('/')}
            className="py-3 px-4 bg-cyan-300 text-slate-950 border-3 border-slate-800 rounded-xl font-black shadow-[3px_3px_0_0_#1e293b] cursor-pointer flex items-center justify-center gap-2"
          >
            {mangDut ? <WifiOff size={16} /> : null} Về Lộ trình
          </button>
        </div>
      </div>
    );
  }
}

/**
 * Vỏ bọc cho panel mở lên trên trang chủ: lưới đỡ + Suspense trong MỘT thẻ.
 *
 * 15 panel trong WelcomePage đều là `lazy(...)`, nên mỗi cái đều là một đường
 * cho cả app chết khi mạng chập chờn. Bọc riêng từng cái để một panel hỏng chỉ
 * làm hỏng ĐÚNG panel đó, không kéo theo trang chủ.
 *
 * ══ VÌ SAO PANEL KHÔNG ĐƯỢC TỰ TẢI LẠI TRANG ══
 * Ở TUYẾN CHÍNH, người học vừa bấm sang một trang khác — trang cũ dù sao cũng
 * bị gỡ khỏi màn hình, nên tải lại không cướp mất gì, và với trường hợp "vừa
 * đẩy bản mới" thì họ còn chẳng thấy lỗi nào cả.
 *
 * PANEL thì ngược hẳn: nó mở ĐÈ LÊN trang chủ, và bên dưới có thể là một bài
 * đang làm dở, một đoạn văn đang gõ chưa lưu. Tự tải lại trang ở đó là xoá
 * công của người học để sửa một lỗi mạng — đắt hơn hẳn việc mời họ bấm một
 * nút. Nên `tuTaiLai` chỉ bật ở App.jsx.
 */
export function MoPanel({ children }) {
  return (
    <ChunkBoundary>
      <Suspense fallback={<DangMo />}>{children}</Suspense>
    </ChunkBoundary>
  );
}
