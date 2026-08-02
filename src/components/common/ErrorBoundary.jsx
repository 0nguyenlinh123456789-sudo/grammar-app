import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled application error', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-5 text-slate-800 dark:text-slate-100">
        <section role="alert" className="w-full max-w-xl bg-white dark:bg-slate-900 border-4 border-rose-500 rounded-3xl p-7 text-center shadow-[8px_8px_0_0_#be123c]">
          <div className="text-5xl mb-3" aria-hidden="true">🛠️</div>
          <h1 className="text-2xl md:text-3xl font-black mb-3">Bài học gặp sự cố</h1>
          <p className="font-bold text-slate-600 dark:text-slate-300 mb-6">
            Tiến độ đã lưu của bạn vẫn được giữ nguyên. Hãy tải lại trang hoặc quay về Lộ trình.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <button onClick={() => window.location.reload()} className="py-3 px-4 bg-yellow-300 text-slate-950 border-3 border-slate-800 rounded-xl font-black shadow-[3px_3px_0_0_#1e293b]">
              Tải lại trang
            </button>
            <button onClick={() => window.location.assign('/')} className="py-3 px-4 bg-cyan-300 text-slate-950 border-3 border-slate-800 rounded-xl font-black shadow-[3px_3px_0_0_#1e293b]">
              Về Lộ trình
            </button>
          </div>
        </section>
      </main>
    );
  }
}
