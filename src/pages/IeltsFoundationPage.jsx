// File: src/pages/IeltsFoundationPage.jsx
// A self-contained learning path built from the "IELTS Nền Tảng" media library.
// Additive feature: browses modules -> lessons -> a lesson viewer with video,
// audio, PDF exercises, answer images and downloadable docs. All media is served
// statically from public/ielts-foundation (see src/data/ieltsFoundationData.js).
import { useState, useMemo } from 'react';
import {
  PlayCircle, Volume2, FileText, Image as ImageIcon, Download,
  ChevronLeft, ChevronRight, CheckCircle2, GraduationCap, ArrowLeft,
  BookOpen, Map, PenSquare, Trophy,
} from 'lucide-react';
import ieltsFoundationData from '../data/ieltsFoundationData';
import { moduleOverlay, prependLessons, lessonOverlay } from '../data/ieltsFoundationOverlay';

// ---------- Title cleanup + lesson classification (display-only) ----------
// The manifest titles are raw folder names ("Lesson 3 _ ...", stray control
// chars, "Phụ âm( 3)"). We prettify for display WITHOUT touching the stable
// lesson id (which drives progress tracking).
function stripJunk(s) {
  return String(s || '')
    .replace(/[\u2400-\u243F]/g, '')            // control pictures (e.g. U+2420)
    // eslint-disable-next-line no-control-regex -- intentionally stripping control chars
    .replace(/[\u0000-\u001F\u0080-\u009F]/g, '')  // control chars
    .replace(/[\u200B-\u200F\uFEFF]/g, '')      // zero-width / BOM
    .replace(/\s+/g, ' ')
    .trim();
}

function classifyLesson(raw) {
  const t = stripJunk(raw).toLowerCase();
  if (/final\s*test/.test(t)) return 'final';
  if (/mini\s*test|minitest/.test(t)) return 'minitest';
  if (/mind\s*maps?/.test(t)) return 'mindmap';
  return 'lesson';
}

function prettifyTitle(raw) {
  let s = stripJunk(raw);
  if (/^final\s*test/i.test(s)) return 'Bài kiểm tra tổng kết';
  let m = s.match(/^mini\s*test\s*(\d+)/i) || s.match(/^minitest\s*(\d+)/i);
  if (m) return `Mini Test ${m[1]}`;
  m = s.match(/^mind\s*maps?\s*(\d+)/i);
  if (m) return `Sơ đồ tư duy ${m[1]}`;
  m = s.match(/^lesson\s*(\d+)\s*[_\-–:]*\s*(.*)$/i);
  if (m) {
    let rest = m[2]
      .replace(/mind\s*maps?\s*(\d+)/i, 'Sơ đồ tư duy $1')
      .replace(/mind\s*maps?/i, 'Sơ đồ tư duy')
      .replace(/\(\s*/g, ' (').replace(/\s+\)/g, ')')
      .replace(/\s{2,}/g, ' ').trim();
    if (!rest) return `Bài ${m[1]}`;
    rest = rest.charAt(0).toUpperCase() + rest.slice(1);
    return `Bài ${m[1]}: ${rest}`;
  }
  return s;
}

const TYPE_META = {
  lesson:   { label: 'Bài giảng',   icon: BookOpen,   cls: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-400' },
  mindmap:  { label: 'Sơ đồ tư duy', icon: Map,        cls: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-400' },
  minitest: { label: 'Mini Test',   icon: PenSquare,  cls: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-400' },
  final:    { label: 'Tổng kết',    icon: Trophy,     cls: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-400' },
};

function TypeBadge({ type }) {
  const meta = TYPE_META[type] || TYPE_META.lesson;
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-black px-1.5 py-0.5 rounded-md border ${meta.cls}`}>
      <Icon size={11} /> {meta.label}
    </span>
  );
}

// Merge the auto-generated manifest with the curated overlay (once).
const EMPTY_MEDIA = { videos: [], audios: [], pdfs: [], images: [], docs: [] };
const MODULES = ieltsFoundationData.map((m) => {
  const pre = (prependLessons[m.id] || []).map((l) => ({ ...EMPTY_MEDIA, ...l }));
  const lessons = [...pre, ...m.lessons].map((l) => ({
    ...l,
    displayTitle: prettifyTitle(l.title),
    type: l.type || classifyLesson(l.title),
    desc: l.desc || lessonOverlay[l.id]?.desc || '',
    notes: l.notes || '',
  }));
  return { ...m, description: moduleOverlay[m.id]?.description || '', lessons };
});

// Per-module accent colors (kept as full class strings so Tailwind keeps them).
const COLORS = {
  pink:   { chip: 'bg-pink-400',   ring: 'border-pink-500',   soft: 'bg-pink-50 dark:bg-pink-900/20',   text: 'text-pink-600 dark:text-pink-300' },
  green:  { chip: 'bg-green-400',  ring: 'border-green-500',  soft: 'bg-green-50 dark:bg-green-900/20',  text: 'text-green-600 dark:text-green-300' },
  cyan:   { chip: 'bg-cyan-400',   ring: 'border-cyan-500',   soft: 'bg-cyan-50 dark:bg-cyan-900/20',    text: 'text-cyan-600 dark:text-cyan-300' },
  yellow: { chip: 'bg-yellow-400', ring: 'border-yellow-500', soft: 'bg-yellow-50 dark:bg-yellow-900/20',text: 'text-yellow-700 dark:text-yellow-300' },
  blue:   { chip: 'bg-blue-400',   ring: 'border-blue-500',   soft: 'bg-blue-50 dark:bg-blue-900/20',    text: 'text-blue-600 dark:text-blue-300' },
};
const accent = (c) => COLORS[c] || COLORS.cyan;

const card = 'border-4 border-slate-800 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#020617]';

function MediaCount({ lesson }) {
  const bits = [
    lesson.videos.length && `${lesson.videos.length} video`,
    lesson.audios.length && `${lesson.audios.length} audio`,
    lesson.pdfs.length && `${lesson.pdfs.length} bài tập`,
    lesson.images.length && `${lesson.images.length} ảnh`,
    lesson.docs.length && `${lesson.docs.length} đáp án`,
  ].filter(Boolean);
  return <span className="text-xs font-bold text-slate-400">{bits.join(' · ')}</span>;
}

// ---------- Lesson viewer ----------
function LessonViewer({ module, lesson, onBack, onPrev, onNext, hasPrev, hasNext, isDone, onComplete }) {
  const [vIdx, setVIdx] = useState(0);
  const a = accent(module.color);
  const video = lesson.videos[vIdx];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 font-black text-slate-500 hover:text-slate-800 dark:hover:text-white">
        <ArrowLeft size={18} /> {module.title}
      </button>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap"><TypeBadge type={lesson.type} /><MediaCount lesson={lesson} /></div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">{lesson.displayTitle}</h1>
          {lesson.desc && <p className="font-bold text-slate-500 dark:text-slate-400 text-sm max-w-2xl">{lesson.desc}</p>}
        </div>
      </div>

      {/* NOTES (text-based supplemental lessons with no media) */}
      {lesson.notes && (
        <div className={`${card} p-6 md:p-8`}>
          <div
            className="ielts-notes max-w-none font-medium text-slate-700 dark:text-slate-200 leading-relaxed [&_h3]:text-xl [&_h3]:font-black [&_h3]:mb-2 [&_h4]:font-black [&_h4]:mt-4 [&_h4]:mb-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_p]:mb-3 [&_strong]:text-slate-900 dark:[&_strong]:text-white"
            dangerouslySetInnerHTML={{ __html: lesson.notes }}
          />
        </div>
      )}

      {/* VIDEO */}
      {lesson.videos.length > 0 && (
        <div className="space-y-3">
          <div className={`${card} overflow-hidden p-0`}>
            <video key={video.src} src={video.src} controls playsInline className="w-full aspect-video bg-black">
              Trình duyệt không hỗ trợ video.
            </video>
          </div>
          {lesson.videos.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {lesson.videos.map((v, i) => (
                <button key={v.src} onClick={() => setVIdx(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border-[3px] border-slate-800 dark:border-slate-600 font-bold text-sm text-left transition-all ${i === vIdx ? `${a.chip} text-slate-900 shadow-none translate-y-0.5` : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617]'}`}>
                  <PlayCircle size={16} /> {v.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EXERCISES (PDF) */}
      {lesson.pdfs.length > 0 && (
        <Section title="Bài tập" icon={<FileText size={18} />} a={a}>
          {lesson.pdfs.map((f) => <PdfItem key={f.src} file={f} a={a} />)}
        </Section>
      )}

      {/* AUDIO */}
      {lesson.audios.length > 0 && (
        <Section title="Audio luyện tập" icon={<Volume2 size={18} />} a={a}>
          {lesson.audios.map((f) => (
            <div key={f.src} className={`p-3 rounded-xl border-[3px] border-slate-200 dark:border-slate-700 ${a.soft}`}>
              <p className="font-bold text-sm mb-2 text-slate-700 dark:text-slate-200 truncate">{f.title}</p>
              <audio src={f.src} controls preload="none" className="w-full h-9" />
            </div>
          ))}
        </Section>
      )}

      {/* ANSWER IMAGES */}
      {lesson.images.length > 0 && (
        <Section title="Đáp án minh hoạ" icon={<ImageIcon size={18} />} a={a}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 col-span-full">
            {lesson.images.map((f) => (
              <a key={f.src} href={f.src} target="_blank" rel="noreferrer"
                className="block border-[3px] border-slate-800 dark:border-slate-600 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 hover:opacity-90">
                <img src={f.src} alt={f.title} loading="lazy" className="w-full h-full object-cover" />
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* DOWNLOADABLE DOCS */}
      {lesson.docs.length > 0 && (
        <Section title="File đáp án (tải về)" icon={<Download size={18} />} a={a}>
          {lesson.docs.map((f) => (
            <a key={f.src} href={f.src} download
              className="flex items-center gap-2 p-3 rounded-xl border-[3px] border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40">
              <Download size={16} className={a.text} /> <span className="truncate">{f.title}.docx</span>
            </a>
          ))}
        </Section>
      )}

      {/* COMPLETE + NAV */}
      <div className="flex items-center justify-between gap-3 pt-4 flex-wrap">
        <button onClick={onPrev} disabled={!hasPrev}
          className="flex items-center gap-1 px-4 py-3 font-black rounded-xl border-4 border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-slate-200 disabled:opacity-30 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] disabled:shadow-none">
          <ChevronLeft size={18} /> Trước
        </button>

        <button onClick={() => onComplete(lesson.id)}
          className={`flex items-center gap-2 px-5 py-3 font-black rounded-xl border-4 border-slate-800 transition-all ${isDone ? 'bg-green-400 text-slate-900 shadow-none translate-y-1' : 'bg-yellow-300 text-slate-900 shadow-[4px_4px_0_0_#1e293b]'}`}>
          <CheckCircle2 size={18} /> {isDone ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
        </button>

        <button onClick={onNext} disabled={!hasNext}
          className="flex items-center gap-1 px-4 py-3 font-black rounded-xl border-4 border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-slate-200 disabled:opacity-30 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] disabled:shadow-none">
          Sau <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function Section({ title, icon, a, children }) {
  return (
    <div className={`${card} p-5`}>
      <h3 className={`flex items-center gap-2 font-black mb-3 ${a.text}`}>{icon} {title}</h3>
      <div className="grid sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function PdfItem({ file, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border-[3px] border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center gap-2 p-3">
        <FileText size={16} className={a.text} />
        <span className="flex-1 font-bold text-sm text-slate-700 dark:text-slate-200 truncate">{file.title}</span>
        <button onClick={() => setOpen(o => !o)} className="text-xs font-black px-2 py-1 rounded-lg border-2 border-slate-300 dark:border-slate-600">
          {open ? 'Ẩn' : 'Xem'}
        </button>
        <a href={file.src} target="_blank" rel="noreferrer" className="text-xs font-black px-2 py-1 rounded-lg border-2 border-slate-300 dark:border-slate-600">↗</a>
      </div>
      {open && <iframe title={file.title} src={file.src} className="w-full h-96 bg-white border-t-[3px] border-slate-200 dark:border-slate-700" />}
    </div>
  );
}

// ---------- Module lesson list ----------
function ModuleView({ module, onBack, onOpenLesson, completedMilestones }) {
  const a = accent(module.color);
  const done = module.lessons.filter(l => completedMilestones.includes(l.id)).length;
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 font-black text-slate-500 hover:text-slate-800 dark:hover:text-white">
        <ArrowLeft size={18} /> Tất cả lộ trình
      </button>
      <div className={`${card} p-5 flex items-center gap-4`}>
        <span className={`w-14 h-14 flex items-center justify-center text-3xl rounded-2xl ${a.chip} border-4 border-slate-800`}>{module.icon}</span>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">{module.title}</h1>
          <p className="text-sm font-bold text-slate-400">{module.subtitle} · {done}/{module.lessons.length} bài đã học</p>
          {module.description && <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">{module.description}</p>}
        </div>
      </div>
      <div className="space-y-3">
        {module.lessons.map((l, i) => {
          const isDone = completedMilestones.includes(l.id);
          return (
            <button key={l.id} onClick={() => onOpenLesson(i)}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border-4 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[5px_5px_0_0_#1e293b] dark:shadow-[5px_5px_0_0_#020617] hover:translate-x-0.5 transition-transform`}>
              <span className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full border-[3px] border-slate-800 font-black ${isDone ? 'bg-green-400 text-slate-900' : `${a.chip} text-slate-900`}`}>
                {isDone ? <CheckCircle2 size={18} /> : i + 1}
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2 flex-wrap mb-0.5"><TypeBadge type={l.type} /></span>
                <span className="block font-black text-slate-800 dark:text-white">{l.displayTitle}</span>
                <MediaCount lesson={l} />
              </span>
              <ChevronRight className="text-slate-400 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Top-level module grid ----------
function ModuleGrid({ onOpenModule, completedMilestones }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white flex items-center justify-center gap-3">
          <GraduationCap className="text-pink-500" size={34} /> IELTS Nền Tảng
        </h1>
        <p className="font-bold text-slate-400">Lộ trình 5 chặng: Phát âm → Từ vựng → Ngữ pháp → Ngữ pháp Plus → Luyện nghe</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {MODULES.map((m, idx) => {
          const a = accent(m.color);
          const done = m.lessons.filter(l => completedMilestones.includes(l.id)).length;
          const pct = m.lessons.length ? Math.round((done / m.lessons.length) * 100) : 0;
          return (
            <button key={m.id} onClick={() => onOpenModule(m.id)}
              className={`text-left p-5 rounded-2xl border-4 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#020617] hover:-translate-y-0.5 transition-transform`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-12 h-12 flex items-center justify-center text-2xl rounded-2xl ${a.chip} border-4 border-slate-800`}>{m.icon}</span>
                <div>
                  <span className="text-xs font-black text-slate-400">CHẶNG {idx + 1}</span>
                  <h2 className="font-black text-lg leading-tight text-slate-800 dark:text-white">{m.title}</h2>
                </div>
              </div>
              {m.description && <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 leading-snug">{m.description}</p>}
              <div className="flex items-center justify-between text-sm font-bold text-slate-400 mb-2">
                <span>{m.lessons.length} bài học</span>
                <span>{done}/{m.lessons.length}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-800 overflow-hidden">
                <div className={`h-full ${a.chip}`} style={{ width: `${pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function IeltsFoundationPage({ completedMilestones = [], completeMilestone }) {
  const [moduleId, setModuleId] = useState(null);
  const [lessonIdx, setLessonIdx] = useState(null);

  const module = useMemo(() => MODULES.find(m => m.id === moduleId) || null, [moduleId]);
  const lesson = module && lessonIdx != null ? module.lessons[lessonIdx] : null;

  if (!MODULES.length) {
    return <div className="p-10 text-center font-black text-slate-400">Chưa có dữ liệu bài học. Hãy giải nén thư viện IELTS vào public/ielts-foundation.</div>;
  }

  if (lesson) {
    return (
      <div className="p-4 md:p-8">
        <LessonViewer
          module={module} lesson={lesson}
          onBack={() => setLessonIdx(null)}
          onPrev={() => setLessonIdx(i => Math.max(0, i - 1))}
          onNext={() => setLessonIdx(i => Math.min(module.lessons.length - 1, i + 1))}
          hasPrev={lessonIdx > 0} hasNext={lessonIdx < module.lessons.length - 1}
          isDone={completedMilestones.includes(lesson.id)}
          onComplete={(id) => completeMilestone && completeMilestone(id, 25)}
        />
      </div>
    );
  }
  if (module) {
    return (
      <div className="p-4 md:p-8">
        <ModuleView module={module} onBack={() => setModuleId(null)}
          onOpenLesson={(i) => setLessonIdx(i)} completedMilestones={completedMilestones} />
      </div>
    );
  }
  return (
    <div className="p-4 md:p-8">
      <ModuleGrid onOpenModule={(id) => { setModuleId(id); setLessonIdx(null); }} completedMilestones={completedMilestones} />
    </div>
  );
}
