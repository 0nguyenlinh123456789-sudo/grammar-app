// Generate src/data/ieltsFoundationData.js by walking the extracted media tree.
// Runs over whatever currently exists under public/ielts-foundation, so it works
// for both the pilot (one lesson) and the full extract.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public', 'ielts-foundation', '1. IELTS NỀN TẢNG');
const OUT = path.join(__dirname, '..', 'src', 'data', 'ieltsFoundationData.js');
const PUBLIC_PREFIX = 'ielts-foundation/1. IELTS NỀN TẢNG';

// Pedagogical order of the 5 modules + friendly metadata. Keyed by the real
// folder name in the archive.
const MODULES = [
  { dir: 'Phát âm cơ bản',        title: 'Phát âm cơ bản',            subtitle: 'Pronunciation', icon: '🗣️', color: 'pink' },
  { dir: 'Từ vựng cơ bản',        title: 'Từ vựng cơ bản',            subtitle: 'Vocabulary',    icon: '📚', color: 'green' },
  { dir: 'Ngữ pháp cơ bản',       title: 'Ngữ pháp cơ bản',           subtitle: 'Grammar',       icon: '✏️', color: 'cyan' },
  { dir: 'Ngữ pháp cơ bản plus',  title: 'Ngữ pháp cơ bản Plus',      subtitle: 'Grammar+',      icon: '🧩', color: 'yellow' },
  { dir: 'Bộ Bài Tập Bổ Trợ Listening Gap-Filling Cơ Bản', title: 'Luyện nghe Gap-Filling', subtitle: 'Listening', icon: '🎧', color: 'blue' },
];

// Encode a repo-relative path into a URL the dev server can serve (per-segment
// so slashes stay literal but spaces / diacritics / special chars get encoded).
function toUrl(relFromPublic) {
  return relFromPublic.split('/').map(encodeURIComponent).join('/');
}

const EXT = {
  video: ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
  audio: ['.mp3', '.wav', '.m4a'],
  pdf:   ['.pdf'],
  image: ['.png', '.jpg', '.jpeg', '.gif'],
  doc:   ['.docx', '.doc'],
};
function classify(name) {
  const e = path.extname(name).toLowerCase();
  for (const [kind, list] of Object.entries(EXT)) if (list.includes(e)) return kind;
  return null; // .url, .txt etc. -> skipped
}

// Natural sort: pull the first integer out of a string and compare numerically,
// falling back to locale compare. Fixes "Lesson 1, Lesson 10, Lesson 2".
function numKey(s) {
  const m = s.match(/\d+/);
  return m ? parseInt(m[0], 10) : Number.MAX_SAFE_INTEGER;
}
function natCmp(a, b) {
  const na = numKey(a), nb = numKey(b);
  if (na !== nb) return na - nb;
  return a.localeCompare(b, 'vi');
}

function titleFromFile(name) {
  return name.replace(/\.[^.]+$/, '');
}

// Recursively collect every media file under a lesson folder, classified.
function collectMedia(absDir, relDir) {
  const out = { videos: [], audios: [], pdfs: [], images: [], docs: [] };
  const bucket = { video: out.videos, audio: out.audios, pdf: out.pdfs, image: out.images, doc: out.docs };
  (function walk(abs, rel) {
    const entries = fs.readdirSync(abs, { withFileTypes: true })
      .sort((a, b) => natCmp(a.name, b.name));
    for (const e of entries) {
      const childAbs = path.join(abs, e.name);
      const childRel = rel + '/' + e.name;
      if (e.isDirectory()) { walk(childAbs, childRel); continue; }
      const kind = classify(e.name);
      if (!kind) continue;
      bucket[kind].push({ title: titleFromFile(e.name), src: toUrl(PUBLIC_PREFIX + childRel) });
    }
  })(absDir, relDir);
  return out;
}

// Resolve a module's real on-disk folder name — some names carry trailing
// oddities (e.g. U+2420) so we match on a trimmed/normalized prefix.
const norm = (s) => s.replace(/[^\p{L}\p{N}]+$/u, '').trim().toLowerCase();
const topDirs = fs.existsSync(ROOT)
  ? fs.readdirSync(ROOT, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name)
  : [];

function buildModule(mod) {
  const realDir = topDirs.find(d => norm(d) === norm(mod.dir)) || mod.dir;
  const absMod = path.join(ROOT, realDir);
  if (!fs.existsSync(absMod)) return null;
  mod = { ...mod, dir: realDir };
  // Order within a module: Lessons (numeric) first, then MiniTests, then Final.
  const category = (name) => {
    const n = name.toLowerCase();
    if (/final/.test(n)) return 2;
    if (/mini\s*test/.test(n)) return 1;
    return 0;
  };
  const lessonDirs = fs.readdirSync(absMod, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort((a, b) => (category(a) - category(b)) || natCmp(a, b));
  const lessons = [];
  for (const ld of lessonDirs) {
    const media = collectMedia(path.join(absMod, ld), '/' + mod.dir + '/' + ld);
    const count = media.videos.length + media.audios.length + media.pdfs.length + media.images.length + media.docs.length;
    if (count === 0) continue;
    lessons.push({
      id: `ielts-${mod.dir}-${ld}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: ld,
      ...media,
    });
  }
  return {
    id: mod.dir.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: mod.title,
    subtitle: mod.subtitle,
    icon: mod.icon,
    color: mod.color,
    lessons,
  };
}

const modules = MODULES.map(buildModule).filter(Boolean).filter(m => m.lessons.length);

const banner = `// AUTO-GENERATED by scratch/gen_manifest.cjs — do not edit by hand.
// Catalog of the "IELTS Nền Tảng" media library (videos/audio/PDF/images), read
// from public/ielts-foundation and served as static assets by Vite. Regenerate
// after re-extracting the archive.
`;
fs.writeFileSync(OUT, banner + '\nconst ieltsFoundationData = ' + JSON.stringify(modules, null, 2) + ';\n\nexport default ieltsFoundationData;\n');

const totals = modules.map(m => `${m.title}: ${m.lessons.length} lessons`);
console.log('WROTE', OUT);
console.log(totals.join('\n'));
