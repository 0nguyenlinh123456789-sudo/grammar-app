import { AlertTriangle, Gauge } from 'lucide-react';
import { buildSkillProfile } from '../../utils/skillProfile';
import { CEFR_LABEL } from '../../utils/placement';
import { thongKeTuBaoCao } from '../../utils/selfReportLog';

// HỒ SƠ NĂNG LỰC THEO KỸ NĂNG (việc 4.3) — "B2 nghe ≠ B2 viết".
//
// Bốn kỹ năng CEFR luôn hiện ĐỦ BỐN, kể cả ba kỹ năng chưa đo được. Chúng hiện
// dưới dạng ô xám ghi "CHƯA ĐO ĐƯỢC" kèm lý do, KHÔNG phải thanh 0%: 0% là một
// tuyên bố sai (nói người học làm sai hết) trong khi sự thật là app chưa có gì
// để đo. Bỏ hẳn ba ô đó đi cũng sai — người học sẽ tưởng bốn kỹ năng đã được
// nhìn tới trong khi mới có một.
// (3.4) Hoạt động TỰ ĐÁNH GIÁ bài viết hiện ở đây như một dòng RIÊNG, không
// làm ô Viết đổi sang "đo được". Người tự chấm bài mình đang báo mức tự tin,
// không phải mức năng lực — xem chú thích trong skillProfile.js và selfReportLog.js.
// (3.5) Kỹ năng Nói đi qua ĐÚNG đường đó — cùng một sổ, cùng một lời hứa.
export default function SkillProfile({ placementResult, onRetake }) {
  const profile = buildSkillProfile(placementResult, {
    writing: thongKeTuBaoCao('writing'),
    speaking: thongKeTuBaoCao('speaking'),
  });
  if (!profile) return null;

  return <section className="mt-6 pt-5 border-t-3 border-dashed border-slate-200 dark:border-slate-700">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Gauge size={18} className="text-indigo-600" />
        <h4 className="text-sm font-black uppercase tracking-wide">Hồ sơ năng lực theo kỹ năng</h4>
      </div>
      {profile.cefr && <span className="px-3 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-2 border-indigo-500 text-xs font-black">{CEFR_LABEL[profile.cefr] || profile.cefr}</span>}
    </div>

    {profile.legacy && <p className="mt-3 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-400 rounded-2xl p-3">
      Kết quả này đến từ bài test đầu vào cũ (12 câu, chưa gắn bậc CEFR) nên không suy ra được bậc theo từng kỹ năng.
      {onRetake && <> <button onClick={onRetake} className="underline font-black">Làm lại bài mới</button> để có hồ sơ đầy đủ.</>}
    </p>}

    {profile.preA1 && <p className="mt-3 text-xs font-bold text-amber-700 dark:text-amber-400">
      Bài test bắt đầu từ bậc A1 và bạn chưa qua vòng đó — hãy học cụm A0 “Mất Gốc” trước.
    </p>}

    <p className="mt-3 text-[11px] font-black uppercase tracking-wide text-slate-400">Bốn kỹ năng</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
      {profile.cefrSkills.map((skill) => <SkillCard key={skill.key} skill={skill} />)}
    </div>

    <p className="mt-5 text-[11px] font-black uppercase tracking-wide text-slate-400">Nền tảng (đỡ cho cả bốn kỹ năng)</p>
    <div className="grid sm:grid-cols-2 gap-3 mt-2">
      {profile.foundation.map((skill) => <SkillCard key={skill.key} skill={skill} />)}
    </div>

    <p className="mt-4 text-[11px] font-bold text-slate-400">
      Bậc theo từng kỹ năng là ước lượng SƠ BỘ — bài đầu vào chỉ hỏi 2 câu mỗi bậc cho mỗi kỹ năng.
    </p>
  </section>;
}

function SkillCard({ skill }) {
  if (!skill.measured) {
    return <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-3">
      <p className="text-xs font-black text-slate-500">{skill.icon} {skill.label}</p>
      <p className="text-sm font-black text-slate-400 mt-1 flex items-center gap-1"><AlertTriangle size={13} /> Chưa đo được</p>
      <p className="text-[11px] font-bold text-slate-400 mt-1 leading-snug">{skill.reason}</p>
      {skill.tuBaoCao && <p className="text-[11px] font-bold text-violet-600 dark:text-violet-400 mt-1.5 pt-1.5 border-t border-dashed border-slate-300 dark:border-slate-600 leading-snug">{skill.tuBaoCaoLabel}</p>}
    </div>;
  }
  return <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-3">
    <div className="flex justify-between items-baseline">
      <p className="text-xs font-black">{skill.icon} {skill.label}</p>
      <p className="text-xs font-black">{skill.percent}%</p>
    </div>
    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-700 overflow-hidden mt-1.5">
      <div className={`h-full ${skill.percent >= 67 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${skill.percent}%` }} />
    </div>
    <p className="text-[11px] font-bold text-slate-400 mt-1">
      Đúng {skill.correct}/{skill.total}{skill.cefr ? ` · sơ bộ ${skill.cefr}` : ''}
    </p>
  </div>;
}
