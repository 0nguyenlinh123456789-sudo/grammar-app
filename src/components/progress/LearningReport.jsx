import { useState } from 'react';
import { Award, BarChart3, Printer, X } from 'lucide-react';
import SkillProfile from './SkillProfile';
import { buildSkillProfile, SKILL_LABEL } from '../../utils/skillProfile';
import { luotDatGanNhat, bacDaDat } from '../../utils/bandExam';

export default function LearningReport({ placementResult, weeklyLessons, weeklyXp, completionPercentage = 0, streak = 0, weeklyGoalDays = 0, completedCount = 0, verifiedCount = 0, totalMilestonesCount = 0, onRetakePlacement }) {
  const [showCertificate, setShowCertificate] = useState(false);
  if (!placementResult) return null;

  // (#1b) Điều kiện cấp chứng nhận là số chặng ĐÃ XÁC MINH — không phải số chặng
  // đã đi qua. Chứng nhận là chỗ DUY NHẤT app nói với người ngoài rằng người học
  // làm được, nên nó phải dựa trên bằng chứng chấm điểm. Các con số còn lại
  // trong báo cáo (% lộ trình, XP, chuỗi ngày) vẫn đếm cả chặng chưa xác minh:
  // đó là phần thưởng cho sự chuyên cần, không phải tuyên bố năng lực.
  // (4.4) TỜ GIẤY NÀY GIỜ CÓ HAI CĂN CỨ KHÁC NHAU, VÀ IN RA CẢ HAI.
  //
  // Việc 4.4 yêu cầu đổi điều kiện cấp sang "đã đạt bài thi cuối bậc". Nhưng
  // ghi chú (#0-D1) đã cố ý biến tờ này thành CHỨNG NHẬN CHUYÊN CẦN chứ không
  // phải chứng nhận trình độ — bỏ điều kiện cũ đi là xoá mất thứ đó. Nên:
  //
  //   • đi hết + xác minh toàn bộ lộ trình  → in số chặng (chuyên cần, như cũ);
  //   • ĐẠT bài thi cuối bậc                → in thêm BẬC và NGÀY THI.
  //
  // NHÃN BẬC CHỈ ĐẾN TỪ BÀI THI. Đi hết lộ trình không đẻ ra một bậc nào, vì đi
  // hết lộ trình không phải một phép đo năng lực.
  const bacThi = bacDaDat();
  const luotThi = bacThi ? luotDatGanNhat(bacThi) : null;
  const certificateReady = (totalMilestonesCount > 0 && verifiedCount >= totalMilestonesCount) || !!luotThi;
  const awaitingVerification = completedCount >= totalMilestonesCount && totalMilestonesCount > 0 && !certificateReady;

  // Opens a clean printable page (parents can print or save as PDF).
  // (#1b) Tờ giấy này cũng đi ra ngoài như chứng nhận, nên phải in KÈM số chặng
  // đã xác minh: "hoàn thành 100%" đứng một mình trên giấy đưa phụ huynh là
  // đúng loại tuyên bố mà cổng chứng nhận sinh ra để chặn.
  // (4.3) Tờ giấy này đi ra ngoài, nên nó phải nói cả những gì app CHƯA đo được.
  // Bảng cũ chỉ in các kỹ năng có số; phụ huynh đọc xong tưởng đã đo đủ.
  // Và `stat.correct / stat.total` với total = 0 in ra "NaN%" — đúng loại lỗi
  // âm thầm đã dính ở chỗ đếm .length của unit Oxford.
  const printParentReport = () => {
    const profile = buildSkillProfile(placementResult);
    const skills = [...(profile?.foundation || []), ...(profile?.cefrSkills || [])]
      .map((s) => `<tr><td>${SKILL_LABEL[s.key] || s.key}</td><td style="text-align:right;font-weight:800${s.measured ? '' : ';color:#94a3b8'}">${s.measured ? `${s.percent}% (${s.correct}/${s.total})` : 'chưa đo được'}</td></tr>`)
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
        <div class="stat">Đã xác minh bằng bài kiểm tra<b>${verifiedCount}/${totalMilestonesCount} chặng</b></div>
        <div class="stat">Chặng học 7 ngày qua<b>${weeklyLessons} chặng (+${weeklyXp} XP)</b></div>
        <div class="stat">Chuỗi ngày hiện tại<b>${streak} ngày · ${weeklyGoalDays}/7 ngày đạt mục tiêu</b></div>
      </div>
      <table><tr><td style="color:#64748b;text-transform:uppercase;font-size:12px">Kỹ năng (test đầu vào)</td><td></td></tr>${skills}</table>
      <p class="foot">Nghe, nói và viết chưa được đo: ứng dụng chưa có bài nghe giọng người thật, chưa có đề viết và đề nói được chấm.</p>
      <p class="foot">Báo cáo tạo tự động từ dữ liệu học trên Bunny English. In hoặc lưu PDF bằng Ctrl+P.</p>
      <script>window.print()</script></body></html>`);
    win.document.close();
  };
  return <>
    <section className="bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-3xl p-6 shadow-[6px_6px_0_0_#1c293b] dark:shadow-[6px_6px_0_0_#020617] mb-10" aria-labelledby="learning-report-title">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 border-3 border-slate-800 flex items-center justify-center"><BarChart3 className="text-emerald-600" size={23} /></div><div><h3 id="learning-report-title" className="text-lg font-black uppercase">Báo cáo tiến bộ</h3><p className="text-xs font-bold text-slate-500">Cập nhật từ bài test đầu vào và nhịp học gần đây</p></div></div><div className="flex gap-2 flex-wrap"><button onClick={printParentReport} className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-500 text-xs font-black flex items-center gap-1 cursor-pointer"><Printer size={14} /> Báo cáo phụ huynh</button><span className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-700 border-2 border-blue-500 text-xs font-black">{placementResult.levelLabel}</span>{certificateReady && <button onClick={() => setShowCertificate(true)} className="px-3 py-1.5 rounded-xl bg-yellow-300 border-2 border-slate-800 text-xs font-black flex items-center gap-1 cursor-pointer"><Award size={15} /> Chứng nhận</button>}</div></div>
      {/* (4.1) Ô "Đầu vào" trước đây in phần trăm đúng. Với bài thích ứng, phần
          trăm KHÔNG còn nói lên trình độ — bài leo đến khi sai nên ai cũng hội
          tụ về quanh 50–60%. Ô này nay in BẬC; phần trăm lùi xuống dòng phụ. */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5"><ReportStat label="Bậc đầu vào" value={placementResult.cefr || placementResult.levelLabel} hint={placementResult.total ? `${placementResult.correct}/${placementResult.total} câu đúng` : null} /><ReportStat label="Chặng tuần này" value={weeklyLessons} /><ReportStat label="XP tuần này" value={`+${weeklyXp}`} /><ReportStat label="Hoàn thành" value={`${completionPercentage}%`} /></div>
      <SkillProfile placementResult={placementResult} onRetake={onRetakePlacement} />
      {luotThi && <p className="mt-5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
        Đã đạt <b>bài thi cuối bậc {luotThi.cefr}</b> ngày {new Intl.DateTimeFormat('vi-VN').format(new Date(luotThi.lucLam))}. {luotThi.moTaCanCu}
      </p>}
      {awaitingVerification
        ? <p className="mt-5 text-xs font-bold text-amber-700 dark:text-amber-400">Bạn đã đi hết lộ trình. Chứng nhận cần {totalMilestonesCount - verifiedCount} chặng nữa được xác minh (đã xác minh {verifiedCount}/{totalMilestonesCount}) — dùng nút “Xác minh nhanh (5 câu)” ngay trên từng chặng.</p>
        : !certificateReady && <p className="mt-5 text-xs font-bold text-slate-500">Chứng nhận mở ra khi bạn <b>đạt một bài thi cuối bậc</b>, hoặc hoàn thành và xác minh toàn bộ lộ trình (đã xác minh {verifiedCount}/{totalMilestonesCount} chặng).</p>}
    </section>
    {showCertificate && <CertificateModal placementResult={placementResult} completedCount={verifiedCount} totalMilestonesCount={totalMilestonesCount} luotThi={luotThi} onClose={() => setShowCertificate(false)} />}
  </>;
}

function ReportStat({ label, value, hint = null }) { return <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-3"><p className="text-[10px] font-black uppercase text-slate-500">{label}</p><p className="text-xl font-black mt-1">{value}</p>{hint && <p className="text-[10px] font-bold text-slate-400 mt-0.5">{hint}</p>}</div>; }

// (#0-D1) Chứng nhận CHUYÊN CẦN, không phải chứng nhận trình độ: điều kiện cấp
// là học hết các chặng, nên thành tích in ra phải là số chặng. Trước đây in
// nhãn trình độ ĐẦU VÀO (levelLabel) cỡ chữ 5xl như thể đó là kết quả đạt
// được sau khoá học. Trình độ đầu vào nay chỉ còn dòng nhỏ ghi rõ "tham khảo".
// (#1b) Điều kiện cấp nay LÀ số chặng ĐÃ XÁC MINH — con số in ra là số chặng
// có bản ghi đạt ngưỡng chính xác, không phải số chặng đã đi qua.
function CertificateModal({ placementResult, completedCount, totalMilestonesCount, luotThi = null, onClose }) {
  const ngay = (iso) => new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(iso));
  return <div className="fixed inset-0 z-[120] bg-slate-950/70 p-4 flex items-center justify-center" role="dialog" aria-modal="true">
    <section className="max-w-2xl w-full max-h-[92vh] overflow-y-auto bg-[#fffdf4] text-slate-900 border-[10px] border-double border-yellow-600 rounded-xl p-8 md:p-12 text-center shadow-2xl">
      <button onClick={onClose} aria-label="Đóng" className="float-right"><X /></button>
      <Award size={58} className="mx-auto text-yellow-500" />
      <p className="text-xs tracking-[0.3em] font-black text-yellow-700 mt-4">BUNNY ENGLISH · CERTIFICATE</p>

      {/* (4.4) BẬC CHỈ ĐẾN TỪ BÀI THI. Đi hết lộ trình KHÔNG đẻ ra một bậc nào —
          đi hết lộ trình là chuyên cần, không phải một phép đo năng lực. */}
      {luotThi ? <>
        <h2 className="text-3xl md:text-4xl font-black mt-3">Ghi nhận kết quả thi cuối bậc</h2>
        <p className="mt-5 font-bold text-slate-600">Đã đạt bài thi cuối bậc</p>
        <p className="text-5xl font-black text-emerald-700 mt-3">{luotThi.cefr}</p>
        <p className="mt-3 text-sm font-bold">Ngày thi: {ngay(luotThi.lucLam)}</p>
        <div className="mt-5 text-left text-xs font-bold text-slate-600 bg-white/70 border-2 border-yellow-600/40 rounded-lg p-4 leading-relaxed">
          <p><b>Kết quả này dựa trên phần nào:</b> {luotThi.phan.map((p) => `${p.nhan} ${p.dung}/${p.tong}`).join(' · ')}.</p>
          <p className="mt-1.5"><b>Phần đã làm nhưng KHÔNG tính vào kết quả:</b> {luotThi.phanKhongTinh.map((p) => p.nhan).join(', ')} — app không chấm ngữ pháp bài viết và không chấm phát âm.</p>
          <p className="mt-1.5">Phần Nghe dùng bản thu giọng người thật có giấy phép (Tatoeba CC BY, VOA Learning English).</p>
          <p className="mt-1.5 text-rose-800"><b>Đây KHÔNG phải chứng chỉ CEFR</b> và không có giá trị đối chiếu với chứng chỉ của các tổ chức khảo thí. Đây là ghi nhận kết quả của một bài thi trong ứng dụng này.</p>
        </div>
        {totalMilestonesCount > 0 && <p className="mt-4 text-xs font-bold text-slate-500">Đã hoàn thành và xác minh {completedCount}/{totalMilestonesCount} chặng học.</p>}
      </> : <>
        <h2 className="text-3xl md:text-4xl font-black mt-3">Chứng nhận hoàn thành lộ trình</h2>
        <p className="mt-5 font-bold text-slate-600">Đã hoàn thành và xác minh</p>
        <p className="text-5xl font-black text-blue-700 mt-3">{completedCount}/{totalMilestonesCount} chặng học</p>
        <p className="mt-4 text-sm font-bold">Ngày cấp: {ngay(new Date().toISOString())}</p>
        <div className="mt-5 text-left text-xs font-bold text-slate-600 bg-white/70 border-2 border-yellow-600/40 rounded-lg p-4 leading-relaxed">
          <p>Đây là <b>chứng nhận chuyên cần</b>: nó ghi nhận số chặng đã học và đã xác minh, <b>không phải một bậc năng lực</b>.</p>
          <p className="mt-1.5">Muốn có ghi nhận bậc, hãy làm và đạt <b>bài thi cuối bậc</b> (A2 · B1 · B2) trong mục Thi cuối bậc.</p>
        </div>
      </>}

      <p className="mt-4 text-xs font-bold text-slate-500">Trình độ đầu vào (tham khảo): {placementResult.levelLabel} · {placementResult.score}%</p>
      <button onClick={() => window.print()} className="mt-8 px-5 py-3 rounded-xl bg-slate-900 text-white font-black inline-flex items-center gap-2"><Printer size={17} /> In / Lưu PDF</button>
    </section>
  </div>;
}
