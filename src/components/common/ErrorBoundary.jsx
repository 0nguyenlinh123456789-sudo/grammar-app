import { Component } from 'react';
import { khoHong } from '../../utils/kho';
import { soLuotTaiLai } from '../../utils/taiChunk';

// Global crash shield: any unhandled render error lands here instead of a
// blank white page. Shows a friendly recovery screen plus a copyable error
// report so bug reports arrive with the exact message and stack.
export default class ErrorBoundary extends Component {
  state = { error: null, info: null, copied: false };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('Unhandled application error', error, info);
  }

  buildReport() {
    const { error, info } = this.state;
    return [
      `Bunny English — báo cáo lỗi (${new Date().toLocaleString('vi-VN')})`,
      `URL: ${window.location.href}`,
      `Trình duyệt: ${navigator.userAgent}`,
      `Lỗi: ${error?.message || String(error)}`,
      `Stack: ${(error?.stack || '').slice(0, 1500)}`,
      `Component stack: ${(info?.componentStack || '').slice(0, 800)}`,
      // Số lượt phải tải lại một mảnh mã. Bình thường là 0/0/0; khác 0 nghĩa là
      // máy người học đang chật vật lấy tệp về, và lỗi bên trên rất có thể là
      // HẬU QUẢ chứ không phải nguyên nhân. Không có dòng này thì cái đếm trong
      // taiChunk.js chỉ là trạng thái chết — đúng họ với chốt "MẤT BƯỚC" từng
      // in ra một dòng ❌ rồi tự xoá chính mình.
      `Tải lại mảnh mã: thử ${soLuotTaiLai().thuLai} · cứu được ${soLuotTaiLai().cuuDuoc} · hỏng hẳn ${soLuotTaiLai().hong}`,
    ].join('\n');
  }

  copyReport = async () => {
    try {
      await navigator.clipboard.writeText(this.buildReport());
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2500);
    } catch { /* clipboard blocked — the details stay visible for manual copy */ }
  };

  render() {
    if (!this.state.error) return this.props.children;
    const { error, copied } = this.state;

    return (
      <main className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-5 text-slate-800 dark:text-slate-100">
        <section role="alert" className="w-full max-w-xl bg-white dark:bg-slate-900 border-4 border-rose-500 rounded-3xl p-7 text-center shadow-[8px_8px_0_0_#be123c]">
          <div className="text-5xl mb-3" aria-hidden="true">🐰💫</div>
          <h1 className="text-2xl md:text-3xl font-black mb-3">Ối! Thỏ vấp phải một lỗi</h1>
          {/* ⚠️ CÂU NÀY TỪNG LÀ MỘT LỜI TRẤN AN SAI, VÀ ĐÃ CHỤP ĐƯỢC BẰNG CHỨNG.
              Bản cũ khẳng định thẳng "Tiến độ đã lưu của bạn vẫn được giữ nguyên".
              Nhưng `npm run ra:chankho` chụp lại đúng màn này trên một trình duyệt
              đang CHẶN LƯU — tức nơi chưa có gì được lưu bao giờ. Nói với người vừa
              mất trắng rằng họ không mất gì là kiểu trấn an mà luật của dự án cấm.
              Nay hỏi `khoHong()` rồi mới nói. */}
          <p className="font-bold text-slate-600 dark:text-slate-300 mb-6">
            {khoHong()
              ? 'Trình duyệt này đang chặn lưu dữ liệu, nên tiến độ học KHÔNG được lưu. Hãy mở web ở cửa sổ thường (không phải chế độ riêng tư) và cho phép trang này lưu dữ liệu.'
              : 'Tiến độ đã lưu của bạn vẫn được giữ nguyên. Hãy tải lại trang hoặc quay về Lộ trình.'}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <button onClick={() => window.location.reload()} className="py-3 px-4 bg-yellow-300 text-slate-950 border-3 border-slate-800 rounded-xl font-black shadow-[3px_3px_0_0_#1e293b] cursor-pointer">
              Tải lại trang
            </button>
            <button onClick={() => window.location.assign('/')} className="py-3 px-4 bg-cyan-300 text-slate-950 border-3 border-slate-800 rounded-xl font-black shadow-[3px_3px_0_0_#1e293b] cursor-pointer">
              Về Lộ trình
            </button>
          </div>

          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              Chi tiết kỹ thuật (gửi cho người sửa lỗi)
            </summary>
            <pre className="mt-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] leading-relaxed font-mono text-rose-700 dark:text-rose-300 overflow-x-auto whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
              {error?.message || String(error)}{'\n'}{(error?.stack || '').slice(0, 1200)}
            </pre>
            <button onClick={this.copyReport} className="mt-3 w-full py-2.5 rounded-xl border-3 border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white font-black text-sm cursor-pointer">
              {copied ? '✓ Đã sao chép!' : '📋 Sao chép báo cáo lỗi'}
            </button>
          </details>
        </section>
      </main>
    );
  }
}
