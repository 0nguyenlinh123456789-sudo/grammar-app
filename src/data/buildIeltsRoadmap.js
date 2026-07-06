// File: src/data/buildIeltsRoadmap.js
// Pure data layer for the IELTS Nền Tảng page. Takes the curriculum
// (ieltsRoadmap) + the three media sources and produces the final ROADMAP the UI
// renders. Kept framework-free so scratch/verify_roadmap.mjs can import & audit it.
//
// Design (see commit history):
//  - Chặng 1: real media is matched 1:1 onto roadmap lessons (verified 100%).
//  - Chặng 2/3/4: archive lessons are the ordered SPINE (lossless append — never
//    matched 1:1, which would hide/mis-attach flat-file modules). The roadmap's
//    own lecture/test/mindmap placeholders are redundant with the real videos, so
//    in a "media course" we keep only the value-add items (Speaking/Writing AI
//    rooms, topics, bonus). Pure intros with no media are dropped everywhere.
//  - Chặng 5 "Tài liệu Band 7+" is DISSOLVED: its vocab/grammar reference PDFs &
//    flashcard galleries fold up into the matching Chặng 4 course; the internal
//    junk (roadmap .xlsx/.url/.txt) is dropped. Nothing else disappears.
//
// Lesson ids are content-slugs (ir-{chang}-{course}-{slug}) so reordering/removing
// filler keeps surviving lessons' ids stable (progress is keyed on them).
import ieltsFoundationData from './ieltsFoundationData.js';
import ieltsRoadmap from './ieltsRoadmap.js';
import ieltsPrepData from './ieltsPrepData.js';
import ieltsAdvancedData from './ieltsAdvancedData.js';

// ---------- text helpers ----------
function stripJunk(s) {
  return String(s || '')
    .replace(/[\u2400-\u243F]/g, '')
    // eslint-disable-next-line no-control-regex -- intentionally stripping control chars
    .replace(/[\u0000-\u001F\u0080-\u009F]/g, '')
    .replace(/[\u200B-\u200F\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
function normVi(s) {
  return stripJunk(s).toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036F]/g, '')
    .replace(/\u0111/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
const firstNum = (s) => { const m = String(s).match(/\d+/); return m ? m[0] : null; };
function slugId(s) { return normVi(s).replace(/\s+/g, '-').replace(/(^-|-$)/g, '') || 'x'; }

// ---------- Chặng 1 media matching (real video onto roadmap lessons) ----------
const STOP = new Set(['bai', 'lesson', 'phan', 'mini', 'minitest', 'test', 'kiem', 'tra', 'khoa', 'cuoi', 'final', 'mind', 'map', 'maps', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']);
function coreWords(s) { return normVi(s).split(' ').filter((w) => w && !STOP.has(w)); }
function mapNum(s) { const t = normVi(s); const m = t.match(/maps?\s*(\d+)/) || t.match(/tu duy\s*(\d+)/); return m ? m[1] : firstNum(s); }
export function classifyMedia(raw) {
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
const isIntro = (s) => /gioi thieu|mo dau|tong quan/.test(normVi(s));
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

// ---------- media fields ----------
const mediaFields = (m) => ({
  videos: m?.videos || [], audios: m?.audios || [], pdfs: m?.pdfs || [],
  images: m?.images || [], docs: m?.docs || [],
});
const mediaCount = (l) => l.videos.length + l.audios.length + l.pdfs.length + l.images.length + l.docs.length;
const mediaType = (title) => { const c = classifyMedia(title); return c === 'final' ? 'test' : c; };

// ---------- real archive lessons (Chặng 2/3/4 spine) ----------
const advById = Object.fromEntries(ieltsAdvancedData.map((m) => [m.id, m]));
// course id → archive module id (its lessons become the course's spine)
const APPEND_TO_COURSE = {
  'c2-listening': 'ielts-listening-co-ban', 'c2-reading': 'ielts-reading-co-ban',
  'c2-speaking': 'ielts-speaking-co-ban-plus', 'c2-writing': 'ielts-writing-co-ban-plus-2',
  'c3-speaking': 'ielts-speaking-trung-cap', 'c3-writing': 'ielts-writing-trung-cap',
  'c4-listening': 'ielts-listening-chuyen-sau', 'c4-reading': 'ielts-reading-chuyen-sau',
  'c4-speaking': 'ielts-speaking-chuyen-sau', 'c4-writing': 'ielts-writing-chuyen-sau',
  'c4-ngu-phap': 'ngu-phap-nang-cao', 'c4-phat-am': 'phat-am-nang-cao', 'c4-tu-vung': 'tu-vung-nang-cao',
};
// Skills missing from the roadmap screenshots → whole new courses built from media.
const NEW_COURSES = {
  'chang-3': [
    { id: 'c3-ngu-phap', title: 'IELTS Ngữ pháp Trung cấp', module: 'ngu-phap-trung-cap' },
    { id: 'c3-phat-am', title: 'IELTS Phát âm Trung cấp', module: 'phat-am-trung-cap' },
    { id: 'c3-tu-vung', title: 'IELTS Từ vựng Trung cấp', module: 'tu-vung-trung-cap' },
  ],
};
function archiveRaw(moduleId) {
  const m = advById[moduleId];
  if (!m) return [];
  return m.lessons.map((raw) => ({ title: raw.title, type: mediaType(raw.title), ...mediaFields(raw) }));
}

// ---------- Chặng 5 fold-up (vocab/grammar reference → Chặng 4) ----------
const prepById = Object.fromEntries(ieltsPrepData.map((c) => [c.id, c]));
// course id → prep course ids to fold in as reference material. prep-roadmap-files
// (internal .xlsx/.url/.txt) is intentionally absent → dropped.
const PREP_FOLD = {
  'c4-ngu-phap': ['prep-grammar'],
  'c4-speaking': ['prep-speaking'],
  'c4-writing': ['prep-writing'],
  'c4-listening': ['prep-listening'],
  'c4-tu-vung': ['prep-pairs', 'prep-topics200'],
};
const PREP_PREFIX = {
  'prep-grammar': 'Tài liệu ngữ pháp: ',
  'prep-speaking': 'Từ vựng Speaking – ',
};
function prepRaw(courseId) {
  const out = [];
  for (const pid of PREP_FOLD[courseId] || []) {
    const pc = prepById[pid];
    if (!pc) continue;
    const prefix = PREP_PREFIX[pid] || '';
    for (const l of pc.lessons) {
      const type = (l.images && l.images.length) ? 'gallery' : 'doc';
      out.push({ title: prefix + l.title, type, videos: [], audios: [], pdfs: l.pdfs || [], images: l.images || [], docs: l.docs || [] });
    }
  }
  return out;
}

// ---------- assemble ----------
const VALUE_ADD = new Set(['sp', 'wr', 'tp', 'bn']); // kept even when redundant-looking
function assignIds(changId, courseId, rawLessons) {
  const seen = {};
  return rawLessons.map((l) => {
    const base = `ir-${changId}-${courseId}-${slugId(l.title)}`;
    const n = (seen[base] = (seen[base] || 0) + 1);
    return { ...l, id: n > 1 ? `${base}-${n}` : base };
  });
}
function makeTag(lessons) {
  const v = lessons.filter((l) => l.videos.length).length;
  const d = lessons.filter((l) => !l.videos.length && (l.pdfs.length || l.images.length || l.docs.length)).length;
  const p = lessons.filter((l) => VALUE_ADD.has(l.type)).length;
  const t = lessons.filter((l) => l.type === 'test').length;
  const parts = [];
  if (v) parts.push(`${v} video`);
  if (d) parts.push(`${d} tài liệu`);
  if (p) parts.push(`${p} luyện tập`);
  if (t) parts.push(`${t} kiểm tra`);
  return parts.join(' · ') || `${lessons.length} bài`;
}
function buildCourse(chang, course) {
  const index = course.mediaModuleId ? buildMediaIndex(course.mediaModuleId) : null;
  const archiveModuleId = APPEND_TO_COURSE[course.id];
  const isMediaCourse = !!archiveModuleId;

  // roadmap lessons (Chặng 1 gets matched media; others are placeholders)
  const road = course.lessons.map(([title, code]) => {
    const type = code || 'lesson';
    const fields = mediaFields(matchMedia(index, title, type));
    return { title, type, ...fields };
  });
  const roadKept = road.filter((l) => {
    if (isIntro(l.title) && mediaCount(l) === 0) return false;          // drop empty intros everywhere
    if (isMediaCourse && !VALUE_ADD.has(l.type) && mediaCount(l) === 0) return false; // archive covers it
    return true;
  });

  const spine = isMediaCourse ? archiveRaw(archiveModuleId) : [];
  const preps = prepRaw(course.id);
  const raw = isMediaCourse ? [...spine, ...roadKept, ...preps] : [...roadKept, ...preps];
  const lessons = assignIds(chang.id, course.id, raw);
  return { id: course.id, title: course.title, tag: makeTag(lessons), lessons };
}

export const ROADMAP = ieltsRoadmap.map((chang) => {
  const courses = chang.courses.map((course) => buildCourse(chang, course));
  const added = (NEW_COURSES[chang.id] || []).map((nc) => {
    const raw = [...archiveRaw(nc.module), ...prepRaw(nc.id)];
    const lessons = assignIds(chang.id, nc.id, raw);
    return { id: nc.id, title: nc.title, tag: makeTag(lessons), lessons };
  });
  return { ...chang, courses: [...courses, ...added].filter((c) => c.lessons.length) };
});

export default ROADMAP;
