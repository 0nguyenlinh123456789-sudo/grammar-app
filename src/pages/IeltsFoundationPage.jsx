// File: src/pages/IeltsFoundationPage.jsx
// Renders the full PrepEdu-style IELTS roadmap (Chặng → Khoá → Bài) from
// src/data/ieltsRoadmap.js. Lessons that exist in the extracted media library
// (Chặng 1, from ieltsFoundationData.js) play their real video/exercises; every
// other lesson shows a one-click "find resources" (YouTube/Google) helper so the
// learner can pull a matching video/exercise for that exact topic.
import { useState, useMemo } from 'react';
import {
  PlayCircle, Volume2, FileText, Image as ImageIcon, Download,
  ChevronLeft, ChevronRight, CheckCircle2, GraduationCap, ArrowLeft,
  BookOpen, Map, PenSquare, Mic, Edit3, Video, Search, MessageCircle, Sparkles,
} from 'lucide-react';
import ieltsFoundationData from '../data/ieltsFoundationData';
import ieltsRoadmap from '../data/ieltsRoadmap';

// ---------- helpers ----------
function stripJunk(s) {
  return String(s || '')
    .replace(/[\u2400-\u243F]/g, '')
    // eslint-disable-next-line no-control-regex -- intentionally stripping control chars
    .replace(/[\u0000-\u001F\u0080-\u009F]/g, '')
    .replace(/[\u200B-\u200F\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
// Normalize Vietnamese text for fuzzy matching (strip diacritics + punctuation).
function normVi(s) {
  return stripJunk(s).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036F]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
const firstNum = (s) => { const m = String(s).match(/\d+/); return m ? m[0] : null; };

const TYPE = {
  lesson:   { label: 'Bài giảng',    icon: BookOpen,      cls: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-400' },
  mm:       { label: 'Sơ đồ tư duy', icon: Map,           cls: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-400' },
  test:     { label: 'Bài kiểm tra', icon: PenSquare,     cls: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-400' },
  sp:       { label: 'Phòng ảo Speaking AI', icon: Mic,   cls: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-400' },
  wr:       { label: 'Phòng ảo Writing AI',  icon: Edit3, cls: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-400' },
  tp:       { label: 'Chủ đề',       icon: MessageCircle, cls: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border-teal-400' },
  di:       { label: 'Nghe chép',    icon: Volume2,       cls: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border-cyan-400' },
  bn:       { label: 'Bonus',        icon: Sparkles,      cls: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-400' },
};
function TypeBadge({ type }) {
  const m = TYPE[type] || TYPE.lesson; const Icon = m.icon;
  return <span className={`inline-flex items-center gap-1 text-[10px] font-black px-1.5 py-0.5 rounded-md border ${m.cls}`}><Icon size={11} /> {m.label}</span>;
}

const COLORS = { green: 'bg-green-400', cyan: 'bg-cyan-400', yellow: 'bg-yellow-400', pink: 'bg-pink-400', blue: 'bg-blue-400', violet: 'bg-violet-400' };
const card = 'border-4 border-slate-800 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#020617]';

// ---------- media matching (Chặng 1 → extracted zip) ----------
// Only truly generic words are stopped, so content words (giới từ, phát âm...) survive.
const STOP = new Set(['bai','lesson','phan','mini','minitest','test','kiem','tra','khoa','cuoi','final','mind','map','maps','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']);
function coreWords(s) { return normVi(s).split(' ').filter((w) => w && !STOP.has(w)); }
// Mind-map number = the number after "map" (folder names like "Lesson 3_ Mind map 1"
// have two numbers — the lesson number and the map number; we want the latter).
function mapNum(s) { const t = normVi(s); const m = t.match(/maps?\s*(\d+)/) || t.match(/tu duy\s*(\d+)/); return m ? m[1] : firstNum(s); }
function classifyMedia(raw) {
  const t = normVi(raw);
  if (/final/.test(t) || /cuoi khoa/.test(t)) return 'final';
  if (/mini ?test|minitest|kiem tra/.test(t)) return 'test';
  if (/mind ?map|so do tu duy/.test(t)) return 'mm';
  return 'lesson';
}
function buildMediaIndex(moduleId) {
  const mod = ieltsFoundationData.find((m) => m.id === moduleId);
  if (!mod) return null;
  return mod.lessons.map((l) => ({ ...l, cls: classifyMedia(l.title), num: firstNum(l.title), mmNum: mapNum(l.title), core: coreWords(l.title) }));
}
function matchMedia(index, roadmapTitle, roadmapType) {
  if (!index) return null;
  const num = firstNum(roadmapTitle);
  const isFinal = /cuối khoá|cuối khóa|final/i.test(roadmapTitle);
  if (roadmapType === 'test') {
    if (isFinal) return index.find((x) => x.cls === 'final') || null;
    return index.find((x) => x.cls === 'test' && x.num === num) || null;
  }
  if (roadmapType === 'mm') { const mn = mapNum(roadmapTitle); return index.find((x) => x.cls === 'mm' && x.mmNum === mn) || null; }
  if (roadmapType === 'di') return index.find((x) => x.num === num) || null;
  // Intro lessons ("giới thiệu / mở đầu / tổng quan") must match another intro,
  // not just any lesson sharing a stray word.
  const isIntro = (s) => /gioi thieu|mo dau|tong quan/.test(normVi(s));
  const roadIntro = isIntro(roadmapTitle);
  const words = coreWords(roadmapTitle);
  if (!words.length) return null;
  let best = null, bestScore = 0;
  for (const x of index) {
    if (x.cls !== 'lesson') continue;
    if (roadIntro !== isIntro(x.title)) continue;
    const overlap = x.core.filter((w) => words.includes(w)).length;
    if (overlap > bestScore) { bestScore = overlap; best = x; }
  }
  return bestScore >= 1 ? best : null;
}

// Expand the roadmap once, attaching stable ids + matched media.
const ROADMAP = ieltsRoadmap.map((chang) => ({
  ...chang,
  courses: chang.courses.map((course) => {
    const index = course.mediaModuleId ? buildMediaIndex(course.mediaModuleId) : null;
    return {
      ...course,
      lessons: course.lessons.map(([title, code], li) => {
        const type = code || 'lesson';
        const media = matchMedia(index, title, type);
        return {
          id: `ir-${chang.id}-${course.id}-${li}`,
          title, type,
          videos: media?.videos || [], audios: media?.audios || [], pdfs: media?.pdfs || [],
          images: media?.images || [], docs: media?.docs || [],
        };
      }),
    };
  }),
}));

const allLessons = (chang) => chang.courses.flatMap((c) => c.lessons);
const doneCount = (lessons, done) => lessons.filter((l) => done.includes(l.id)).length;

// ---------- resource finder ----------
function ResourceLinks({ lesson, courseTitle }) {
  const base = `IELTS ${courseTitle.replace(/\[.*?\]/g, '').trim()} ${lesson.title}`.replace(/\s+/g, ' ').trim();
  const yt = `https://www.youtube.com/results?search_query=${encodeURIComponent(base + ' bài giảng')}`;
  const gg = `https://www.google.com/search?q=${encodeURIComponent(base + ' bài tập pdf')}`;
  return (
    <div className={`${card} p-5`}>
      <h3 className="flex items-center gap-2 font-black mb-1 text-slate-700 dark:text-slate-200"><Search size={18} /> Tài nguyên bổ sung</h3>
      <p className="text-sm font-bold text-slate-400 mb-3">Bài này chưa có video trong thư viện — tìm nhanh video &amp; bài tập đúng chủ đề:</p>
      <div className="flex flex-wrap gap-3">
        <a href={yt} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-[3px] border-slate-800 dark:border-slate-600 font-black text-sm bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] hover:translate-y-0.5 transition-transform">
          <Video size={18} /> Tìm video trên YouTube
        </a>
        <a href={gg} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-[3px] border-slate-800 dark:border-slate-600 font-black text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617] hover:translate-y-0.5 transition-transform">
          <Search size={18} /> Tìm bài tập trên Google
        </a>
      </div>
    </div>
  );
}

// Guidance shown for non-video lesson types (AI rooms, tests, topics).
function TypeGuide({ type }) {
  const guides = {
    sp: { icon: Mic, title: 'Phòng ảo Speaking Prep AI', text: 'Đây là bài luyện nói theo đề. Hãy đọc to câu trả lời của bạn — có thể dùng mục "Luyện Nói" trong phần Từ Vựng của app để thu âm và tự đánh giá, hoặc luyện với đề mẫu tìm được bên dưới.' },
    wr: { icon: Edit3, title: 'Phòng ảo Writing Prep AI', text: 'Đây là bài luyện viết theo đề. Viết bài rồi dùng "Gia Sư Writing" (trong phần Ngữ Pháp) để được chấm nhanh miễn phí, hoặc tham khảo bài mẫu bên dưới.' },
    test: { icon: PenSquare, title: 'Bài kiểm tra', text: 'Tự kiểm tra kiến thức của phần vừa học. Tìm đề luyện tương ứng bên dưới để làm thử.' },
    tp: { icon: MessageCircle, title: 'Chủ đề luyện tập', text: 'Nhóm chủ đề Speaking. Học từ vựng & ý tưởng cho chủ đề này rồi luyện nói theo các đề phía sau.' },
    bn: { icon: Sparkles, title: 'Bài bonus', text: 'Mẹo/tài nguyên bổ sung giúp bạn tăng điểm.' },
  };
  const g = guides[type]; if (!g) return null; const Icon = g.icon;
  return (
    <div className={`${card} p-5`}>
      <h3 className="flex items-center gap-2 font-black mb-1 text-slate-700 dark:text-slate-200"><Icon size={18} /> {g.title}</h3>
      <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{g.text}</p>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className={`${card} p-5`}>
      <h3 className="flex items-center gap-2 font-black mb-3 text-slate-700 dark:text-slate-200">{icon} {title}</h3>
      <div className="grid sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}
function PdfItem({ file }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border-[3px] border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center gap-2 p-3">
        <FileText size={16} className="text-slate-500" />
        <span className="flex-1 font-bold text-sm text-slate-700 dark:text-slate-200 truncate">{file.title}</span>
        <button onClick={() => setOpen((o) => !o)} className="text-xs font-black px-2 py-1 rounded-lg border-2 border-slate-300 dark:border-slate-600">{open ? 'Ẩn' : 'Xem'}</button>
        <a href={file.src} target="_blank" rel="noreferrer" className="text-xs font-black px-2 py-1 rounded-lg border-2 border-slate-300 dark:border-slate-600">↗</a>
      </div>
      {open && <iframe title={file.title} src={file.src} className="w-full h-96 bg-white border-t-[3px] border-slate-200 dark:border-slate-700" />}
    </div>
  );
}

// ---------- lesson viewer ----------
function LessonViewer({ course, lesson, onBack, onPrev, onNext, hasPrev, hasNext, isDone, onComplete }) {
  const [vIdx, setVIdx] = useState(0);
  const video = lesson.videos[vIdx];
  const hasVideo = lesson.videos.length > 0;
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 font-black text-slate-500 hover:text-slate-800 dark:hover:text-white"><ArrowLeft size={18} /> {course.title}</button>
      <div className="space-y-2">
        <TypeBadge type={lesson.type} />
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">{lesson.title}</h1>
      </div>

      {hasVideo && (
        <div className="space-y-3">
          <div className={`${card} overflow-hidden p-0`}>
            <video key={video.src} src={video.src} controls playsInline className="w-full aspect-video bg-black">Trình duyệt không hỗ trợ video.</video>
          </div>
          {lesson.videos.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {lesson.videos.map((v, i) => (
                <button key={v.src} onClick={() => setVIdx(i)} className={`flex items-center gap-2 px-3 py-2 rounded-xl border-[3px] border-slate-800 dark:border-slate-600 font-bold text-sm text-left transition-all ${i === vIdx ? 'bg-yellow-400 text-slate-900 shadow-none translate-y-0.5' : 'bg-white dark:bg-slate-800 dark:text-slate-200 shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#020617]'}`}>
                  <PlayCircle size={16} /> {v.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {lesson.pdfs.length > 0 && <Section title="Bài tập" icon={<FileText size={18} />}>{lesson.pdfs.map((f) => <PdfItem key={f.src} file={f} />)}</Section>}
      {lesson.audios.length > 0 && (
        <Section title="Audio luyện tập" icon={<Volume2 size={18} />}>
          {lesson.audios.map((f) => (
            <div key={f.src} className="p-3 rounded-xl border-[3px] border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
              <p className="font-bold text-sm mb-2 text-slate-700 dark:text-slate-200 truncate">{f.title}</p>
              <audio src={f.src} controls preload="none" className="w-full h-9" />
            </div>
          ))}
        </Section>
      )}
      {lesson.images.length > 0 && (
        <Section title="Đáp án minh hoạ" icon={<ImageIcon size={18} />}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 col-span-full">
            {lesson.images.map((f) => (
              <a key={f.src} href={f.src} target="_blank" rel="noreferrer" className="block border-[3px] border-slate-800 dark:border-slate-600 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 hover:opacity-90">
                <img src={f.src} alt={f.title} loading="lazy" className="w-full h-full object-cover" />
              </a>
            ))}
          </div>
        </Section>
      )}
      {lesson.docs.length > 0 && (
        <Section title="File đáp án (tải về)" icon={<Download size={18} />}>
          {lesson.docs.map((f) => (
            <a key={f.src} href={f.src} download className="flex items-center gap-2 p-3 rounded-xl border-[3px] border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40">
              <Download size={16} /> <span className="truncate">{f.title}.docx</span>
            </a>
          ))}
        </Section>
      )}

      <TypeGuide type={lesson.type} />
      {!hasVideo && <ResourceLinks lesson={lesson} courseTitle={course.title} />}

      <div className="flex items-center justify-between gap-3 pt-4 flex-wrap">
        <button onClick={onPrev} disabled={!hasPrev} className="flex items-center gap-1 px-4 py-3 font-black rounded-xl border-4 border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-slate-200 disabled:opacity-30 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] disabled:shadow-none"><ChevronLeft size={18} /> Trước</button>
        <button onClick={() => onComplete(lesson.id)} className={`flex items-center gap-2 px-5 py-3 font-black rounded-xl border-4 border-slate-800 transition-all ${isDone ? 'bg-green-400 text-slate-900 shadow-none translate-y-1' : 'bg-yellow-300 text-slate-900 shadow-[4px_4px_0_0_#1e293b]'}`}><CheckCircle2 size={18} /> {isDone ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</button>
        <button onClick={onNext} disabled={!hasNext} className="flex items-center gap-1 px-4 py-3 font-black rounded-xl border-4 border-slate-800 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-slate-200 disabled:opacity-30 shadow-[4px_4px_0_0_#1e293b] dark:shadow-[4px_4px_0_0_#020617] disabled:shadow-none">Sau <ChevronRight size={18} /></button>
      </div>
    </div>
  );
}

// ---------- course (lesson list) ----------
function CourseView({ chang, course, onBack, onOpenLesson, done }) {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 font-black text-slate-500 hover:text-slate-800 dark:hover:text-white"><ArrowLeft size={18} /> {chang.title}</button>
      <div className={`${card} p-5`}>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">{course.title}</h1>
        <p className="text-sm font-bold text-slate-400">{course.tag} · {doneCount(course.lessons, done)}/{course.lessons.length} đã học</p>
      </div>
      <div className="space-y-3">
        {course.lessons.map((l, i) => {
          const isDone = done.includes(l.id);
          const hasVideo = l.videos.length > 0;
          return (
            <button key={l.id} onClick={() => onOpenLesson(i)} className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border-4 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[5px_5px_0_0_#1e293b] dark:shadow-[5px_5px_0_0_#020617] hover:translate-x-0.5 transition-transform`}>
              <span className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full border-[3px] border-slate-800 font-black ${isDone ? 'bg-green-400 text-slate-900' : `${COLORS[chang.color] || 'bg-cyan-400'} text-slate-900`}`}>{isDone ? <CheckCircle2 size={18} /> : i + 1}</span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2 flex-wrap mb-0.5">
                  <TypeBadge type={l.type} />
                  {hasVideo && <span className="text-[10px] font-black text-green-600 dark:text-green-400 inline-flex items-center gap-0.5"><PlayCircle size={11} /> Có video</span>}
                </span>
                <span className="block font-black text-slate-800 dark:text-white">{l.title}</span>
              </span>
              <ChevronRight className="text-slate-400 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- chặng (course list) ----------
function ChangView({ chang, onBack, onOpenCourse, done }) {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 font-black text-slate-500 hover:text-slate-800 dark:hover:text-white"><ArrowLeft size={18} /> Tất cả lộ trình</button>
      <div className={`${card} p-5 flex items-start gap-4`}>
        <span className={`w-14 h-14 shrink-0 flex items-center justify-center text-3xl rounded-2xl ${COLORS[chang.color] || 'bg-cyan-400'} border-4 border-slate-800`}>{chang.icon}</span>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">{chang.title}</h1>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">{chang.desc}</p>
        </div>
      </div>
      <div className="space-y-3">
        {chang.courses.map((c) => {
          const d = doneCount(c.lessons, done); const pct = c.lessons.length ? Math.round((d / c.lessons.length) * 100) : 0;
          return (
            <button key={c.id} onClick={() => onOpenCourse(c.id)} className={`w-full text-left p-4 rounded-2xl border-4 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[5px_5px_0_0_#1e293b] dark:shadow-[5px_5px_0_0_#020617] hover:translate-x-0.5 transition-transform`}>
              <div className="flex items-center justify-between gap-3 mb-2">
                <h2 className="font-black text-slate-800 dark:text-white">{c.title}</h2>
                <span className="text-xs font-black text-slate-400 shrink-0">{d}/{c.lessons.length}</span>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-2">{c.tag}</p>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-800 overflow-hidden"><div className={`h-full ${COLORS[chang.color] || 'bg-cyan-400'}`} style={{ width: `${pct}%` }} /></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- home (chặng grid) ----------
function Home({ onOpenChang, done }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white flex items-center justify-center gap-3"><GraduationCap className="text-pink-500" size={34} /> IELTS Nền Tảng</h1>
        <p className="font-bold text-slate-400">Lộ trình 4 chặng: Nền Tảng → Cơ Bản → Trung Cấp → Chuyên Sâu</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {ROADMAP.map((chang, idx) => {
          const ls = allLessons(chang); const d = doneCount(ls, done); const pct = ls.length ? Math.round((d / ls.length) * 100) : 0;
          return (
            <button key={chang.id} onClick={() => onOpenChang(chang.id)} className={`text-left p-5 rounded-2xl border-4 border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[6px_6px_0_0_#1e293b] dark:shadow-[6px_6px_0_0_#020617] hover:-translate-y-0.5 transition-transform`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-12 h-12 flex items-center justify-center text-2xl rounded-2xl ${COLORS[chang.color] || 'bg-cyan-400'} border-4 border-slate-800`}>{chang.icon}</span>
                <div>
                  <span className="text-xs font-black text-slate-400">CHẶNG {idx + 1}</span>
                  <h2 className="font-black text-lg leading-tight text-slate-800 dark:text-white">{chang.title.replace(/^Chặng \d+: /, '')}</h2>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 leading-snug line-clamp-2">{chang.desc}</p>
              <div className="flex items-center justify-between text-sm font-bold text-slate-400 mb-2"><span>{chang.courses.length} khoá · {ls.length} bài</span><span>{d}/{ls.length}</span></div>
              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-800 overflow-hidden"><div className={`h-full ${COLORS[chang.color] || 'bg-cyan-400'}`} style={{ width: `${pct}%` }} /></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function IeltsFoundationPage({ completedMilestones = [], completeMilestone }) {
  const [changId, setChangId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [lessonIdx, setLessonIdx] = useState(null);

  const chang = useMemo(() => ROADMAP.find((c) => c.id === changId) || null, [changId]);
  const course = useMemo(() => chang?.courses.find((c) => c.id === courseId) || null, [chang, courseId]);
  const lesson = course && lessonIdx != null ? course.lessons[lessonIdx] : null;

  if (lesson) {
    return (
      <div className="p-4 md:p-8">
        <LessonViewer
          course={course} lesson={lesson}
          onBack={() => setLessonIdx(null)}
          onPrev={() => setLessonIdx((i) => Math.max(0, i - 1))}
          onNext={() => setLessonIdx((i) => Math.min(course.lessons.length - 1, i + 1))}
          hasPrev={lessonIdx > 0} hasNext={lessonIdx < course.lessons.length - 1}
          isDone={completedMilestones.includes(lesson.id)}
          onComplete={(id) => completeMilestone && completeMilestone(id, 25)}
        />
      </div>
    );
  }
  if (course) return <div className="p-4 md:p-8"><CourseView chang={chang} course={course} onBack={() => setCourseId(null)} onOpenLesson={(i) => setLessonIdx(i)} done={completedMilestones} /></div>;
  if (chang) return <div className="p-4 md:p-8"><ChangView chang={chang} onBack={() => setChangId(null)} onOpenCourse={(id) => { setCourseId(id); setLessonIdx(null); }} done={completedMilestones} /></div>;
  return <div className="p-4 md:p-8"><Home onOpenChang={(id) => { setChangId(id); setCourseId(null); setLessonIdx(null); }} done={completedMilestones} /></div>;
}
