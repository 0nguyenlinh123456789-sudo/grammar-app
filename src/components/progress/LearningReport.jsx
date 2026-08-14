import { useState } from 'react';
import { Award, BarChart3, Printer, X } from 'lucide-react';

const SKILL_LABELS = { grammar: 'Ngữ pháp', vocabulary: 'Từ vựng', reading: 'Đọc hiểu' };

export default function LearningReport({ placementResult, weeklyLessons, weeklyXp, completionPercentage = 0, streak = 0, weeklyGoalDays = 0, completedCount = 0, verifiedCount = 0, totalMilestonesCount = 0 }) {
  const [showCertificate, setShowCertificate] = useState(false);
  if (!placementResult) return null;

  // (#1b) Điều kiện cấp chứng nhận là số chặng ĐÃ XÁC MINH — không phải số chặng
  // đã đi qua. Chứng nhận là chỗ DUY NHẤT app nói với người ngoài rằng người học
  // làm được, nên nó phải dựa trên bằng chứng chấm điểm. Các con số còn lại
  // trong báo cáo (% lộ trình, XP, chuỗi ngày) vẫn đếm cả chặng chưa xác minh:
  // đó là phần thưởng cho sự chuyên cần, không phải tuyên bố năng lực.
  const certificateReady = totalMilestonesCount > 0 && verifiedCount >= totalMilestonesCount;
  const awaitingVerification = completedCount >= totalMilestonesCount && totalMilestonesCount > 0 && !certificateReady;

  // Opens a clean printable page (parents can print or save as PDF).
  const printParentReport = () => {
    const skills = Object.entries(placementResult.skillStats || {})
      .map(([skill, stat]) => `<tr><td>${SKILL_LABELS[skill] || skill}</td><td style="text-align:right;font-weight:800">${Math.round((stat.correct / stat.total) * 100)}%</td></tr>`)
      .join('');
    const win = window.open('', '_blank', 'width=720,height=900');
    if (!win) return;
    win.document.write(`<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Báo cáo học tập - Bunny English</title>
      <style>body{font-family:system-ui,sans-serif;max-width:640px;margin:32px auto;color:#0f172a;padding:0 16px}
      h1{font-size:26px;margin:0}.sub{color:#64748b;font-weight:600;margin-top:4px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px}
      .stat{border:2px solid #e2e8f0;border-radius:12px;padding:12px}.stat b{font-size:22px;display:block;margin-top:4px}
      table{width:100%;border-collapse:collapse;margin-top:24px}td{padding:8px 4px;border-bottom:1px solid #e2e8f0;font-weight:600}
      .foot{margin-top:32px;color:#94a3b8;font-size:12px;font-weight:600}</style></head><body>
      <h1>🐰 Bunny English — Báo cáo học tập</h1>
      <p class="sub">Ngày lập: ${new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date())}</p>
      <div class="grid">
        <div class="stat">Trình độ đầu vào<b>${placementResult.levelLabel} (${placementResult.score}%)</b></div>
        <div class="stat">Hoàn thành lộ trình<b>${completionPercentage}%</b></div>
        <div class="stat">Chặng học 7 ngày qua<b>${weeklyLessons} chặng (+${weeklyXp} XP)</b></div>
        <div class="stat">Chuỗi ngày hiện tại<b>${streak} ngày · ${weeklyGoalDays}/7 ngày đạt mục tiêu</b></div>
      </div>
      <table><tr><td style="color:#64748b;text-transform:uppercase;font-size:12px">Kỹ năng (test đầu vào)</td><td></td></tr>${skills}</table>
      <p class="foot">Báo cáo tạo tự động từ dữ liệu học trên Bunny English. In hoặc lưu PDF bằng Ctrl+P.</p>
      <script>window.print()</script></body></html>`);
    win.document.close();
  };
  return <>
    <section className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] mb-10" aria-labelledby="learning-report-title">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 border-3 border-slate-800 flex items-center justify-center"><BarChart3 className="text-emerald-600" size={23} /></div><div><h3 id="learning-report-title" className="text-lg font-black uppercase">Báo cáo tiến bộ</h3><p className="text-xs font-bold text-slate-500">Cập nhật từ bài test đầu vào và nhịp học gần đây</p></div></div><div className="flex gap-2 flex-wrap"><button onClick={printParentReport} className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-500 text-xs font-black flex items-center gap-1 cursor-pointer"><Printer size={14} /> Báo cáo phụ huynh</button><span className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-700 border-2 border-blue-500 text-xs font-black">{placementResult.levelLabel}</span>{certificateReady && <button onClick={() => setShowCertificate(true)} className="px-3 py-1.5 rounded-xl bg-yellow-300 border-2 border-slate-800 text-xs font-black flex items-center gap-1 cursor-pointer"><Award size={15} /> Chứng nhận</button>}</div></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5"><ReportStat label="Đầu vào" value={`${placementResult.score}%`} /><ReportStat label="Chặng tuần này" value={weeklyLessons} /><ReportStat label="XP tuần này" value={`+${weeklyXp}`} /><ReportStat label="Hoàn thành" value={`${completionPercentage}%`} /></div>
      <div className="grid md:grid-cols-3 gap-4 mt-5">{Object.entries(placementResult.skillStats || {}).map(([skill, stat]) => { const percent = Math.round((stat.correct / stat.total) * 100); return <div key={skill}><div className="flex justify-between text-xs font-black mb-1"><span>{SKILL_LABELS[skill] || skill}</span><span>{percent}%</span></div><div className="h-3 rounded-full bg-slate-100 border-2 border-slate-700 overflow-hidden"><div className={`h-full ${percent >= 67 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${percent}%` }} /></div></div>; })}</div>
      {awaitingVerification
        ? <p className="mt-5 text-xs font-bold text-amber-700 dark:text-amber-400">Bạn đã đi hết lộ trình. Chứng nhận cần {totalMilestonesCount - verifiedCount} chặng nữa được xác minh (đã xác minh {verifiedCount}/{totalMilestonesCount}) — dùng nút “Xác minh nhanh (5 câu)” ngay trên từng chặng.</p>
        : !certificateReady && <p className="mt-5 text-xs font-bold text-slate-500">Hoàn thành và xác minh toàn bộ lộ trình để mở chứng nhận kết quả học tập. Đã xác minh {verifiedCount}/{totalMilestonesCount} chặng.</p>}
    </section>
    {showCertificate && <CertificateModal placementResult={placementResult} completedCount={verifiedCount} totalMilestonesCount={totalMilestonesCount} onClose={() => setShowCertificate(false)} />}
  </>;
}

function ReportStat({ label, value }) { return <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3"><p className="text-[10px] font-black uppercase text-slate-500">{label}</p><p className="text-xl font-black mt-1">{value}</p></div>; }

// (#0-D1) Chứng nhận CHUYÊN CẦN, không phải chứng nhận trình độ: điều kiện cấp
// là học hết các chặng, nên thành tích in ra phải là số chặng. Trước đây in
// nhãn trình độ ĐẦU VÀO (levelLabel) cỡ chữ 5xl như thể đó là kết quả đạt
// được sau khoá học. Trình độ đầu vào nay chỉ còn dòng nhỏ ghi rõ "tham khảo".
// (#1b) Điều kiện cấp nay LÀ số chặng ĐÃ XÁC MINH — con số in ra là số chặng
// có bản ghi đạt ngưỡng chính xác, không phải số chặng đã đi qua.
function CertificateModal({ placementResult, completedCount, totalMilestonesCount, onClose }) { return <div className="fixed inset-0 z-[120] bg-slate-950/70 p-4 flex items-center justify-center" role="dialog" aria-modal="true"><section className="max-w-2xl w-full bg-[#fffdf4] text-slate-900 border-[10px] border-double border-yellow-600 rounded-xl p-8 md:p-12 text-center shadow-2xl"><button onClick={onClose} aria-label="Đóng" className="float-right"><X /></button><Award size={58} className="mx-auto text-yellow-500" /><p className="text-xs tracking-[0.3em] font-black text-yellow-700 mt-4">BUNNY ENGLISH · CERTIFICATE</p><h2 className="text-3xl md:text-4xl font-black mt-3">Chứng nhận hoàn thành lộ trình</h2><p className="mt-5 font-bold text-slate-600">Đã hoàn thành và xác minh</p><p className="text-5xl font-black text-blue-700 mt-3">{completedCount}/{totalMilestonesCount} chặng học</p><p className="mt-4 text-sm font-bold">Ngày cấp: {new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date())}</p><p className="mt-1 text-xs font-bold text-slate-500">Trình độ đầu vào (tham khảo): {placementResult.levelLabel} · {placementResult.score}%</p><button onClick={() => window.print()} className="mt-8 px-5 py-3 rounded-xl bg-slate-900 text-white font-black inline-flex items-center gap-2"><Printer size={17} /> In / Lưu PDF</button></section></div>; }
