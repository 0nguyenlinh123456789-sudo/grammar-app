// File: src/components/common/OnboardingWizard.jsx
// First-run wizard: welcome → pick a goal & daily pace → offer the placement
// test. Shows once (onboardingDoneV1 in localStorage); every choice is
// optional so a learner can skip straight into the app.
import { useState } from 'react';
import { ArrowRight, Sparkles, Target, Rocket } from 'lucide-react';
import { DAILY_GOAL_OPTIONS } from '../../utils/dailyGoal';
import { markOnboardingDone } from '../../utils/onboarding';

const GOALS = [
  { id: 'beginner', label: '🌱 Lấy lại gốc', desc: 'Bắt đầu từ điều cơ bản nhất' },
  { id: 'communication', label: '🗣️ Giao tiếp', desc: 'Nói chuyện tự tin hằng ngày' },
  { id: 'vstep', label: '📚 Thi VSTEP', desc: 'Chuẩn bị cho kỳ thi B1–B2' },
  { id: 'ielts', label: '🎯 Thi IELTS', desc: 'Chinh phục band điểm mơ ước' },
];

const OnboardingWizard = ({ dailyGoal = 1, setDailyGoal, onFinish }) => {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('');

  const finish = (openPlacement) => {
    markOnboardingDone(goal);
    onFinish(openPlacement);
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="onboarding-title" className="fixed inset-0 z-[150] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border-4 border-slate-800 dark:border-slate-700 rounded-[2rem] p-6 md:p-8 shadow-[10px_10px_0_0_#1e293b] dark:shadow-[10px_10px_0_0_#000] animate-in zoom-in-95">

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-2.5 rounded-full transition-all ${i === step ? 'w-8 bg-yellow-400' : 'w-2.5 bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="text-center">
            <img src="/bunny_logo.png" alt="" className="w-28 h-28 mx-auto object-contain drop-shadow-[4px_5px_0_rgba(30,41,59,0.15)]" draggable={false} />
            <h2 id="onboarding-title" className="text-3xl font-black mt-4 text-slate-900 dark:text-white">Chào mừng đến<br />Bunny <span className="text-pink-500">English</span>! 🎉</h2>
            <p className="mt-3 font-bold text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
              Tớ là Bunny! Tớ sẽ cùng cậu học Ngữ pháp – Từ vựng – Đọc hiểu theo lộ trình rõ ràng, kèm nghe phát âm và luyện đọc to từng từ — mỗi ngày chỉ cần 15 phút.
            </p>
            <button onClick={() => setStep(1)} className="mt-7 w-full py-4 rounded-2xl bg-yellow-300 text-slate-900 border-4 border-slate-900 font-black text-lg shadow-[5px_5px_0_0_#1e293b] hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_#1e293b] transition-all cursor-pointer flex items-center justify-center gap-2">
              BẮT ĐẦU NÀO <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 justify-center text-slate-900 dark:text-white">
              <Target size={24} className="text-blue-500" />
              <h2 className="text-2xl font-black text-center">Cậu học tiếng Anh để làm gì?</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
                    goal === g.id
                      ? 'bg-yellow-200 dark:bg-yellow-500/20 border-yellow-500 -translate-y-0.5 shadow-[3px_3px_0_0_#1e293b]'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-yellow-400'
                  }`}
                >
                  <p className="font-black text-slate-900 dark:text-white text-sm">{g.label}</p>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">{g.desc}</p>
                </button>
              ))}
            </div>

            <p className="text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-400 mt-6 mb-2">Mỗi ngày cậu muốn học mấy chặng?</p>
            <div className="grid grid-cols-4 gap-2">
              {DAILY_GOAL_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setDailyGoal?.(option)}
                  aria-pressed={dailyGoal === option}
                  className={`py-2.5 rounded-xl border-3 font-black cursor-pointer transition-all ${
                    dailyGoal === option
                      ? 'bg-blue-400 border-slate-800 text-white -translate-y-0.5 shadow-[2px_2px_0_0_#1e293b]'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button onClick={() => setStep(2)} className="mt-7 w-full py-4 rounded-2xl bg-yellow-300 text-slate-900 border-4 border-slate-900 font-black text-lg shadow-[5px_5px_0_0_#1e293b] hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2">
              TIẾP TỤC <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 border-4 border-slate-800 dark:border-slate-600 flex items-center justify-center">
              <Rocket size={30} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-black mt-4 text-slate-900 dark:text-white">Đo trình độ trong 5 phút?</h2>
            <p className="mt-3 font-bold text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              12 câu hỏi nhanh giúp tớ biết cậu đang ở đâu và gợi ý đúng bài nên học đầu tiên. Cậu cũng có thể làm sau, trên trang Lộ Trình.
            </p>
            <button onClick={() => finish(true)} className="mt-7 w-full py-4 rounded-2xl bg-indigo-500 text-white border-4 border-slate-900 font-black text-lg shadow-[5px_5px_0_0_#1e293b] hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2">
              <Sparkles size={20} /> LÀM TEST NGAY
            </button>
            <button onClick={() => finish(false)} className="mt-3 w-full py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-3 border-slate-300 dark:border-slate-600 font-black text-sm cursor-pointer">
              Để sau, vào học luôn
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingWizard;
