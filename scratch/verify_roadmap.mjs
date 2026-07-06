// Audit the assembled IELTS roadmap: id collisions, media reachability (no real
// video/pdf/png silently dropped), sane slugs, and a spine spot-check.
import ROADMAP from '../src/data/buildIeltsRoadmap.js';
import ieltsAdvancedData from '../src/data/ieltsAdvancedData.js';
import ieltsPrepData from '../src/data/ieltsPrepData.js';

const allLessons = ROADMAP.flatMap((ch) => ch.courses.flatMap((c) => c.lessons));
const srcsOf = (l) => [...l.videos, ...l.audios, ...l.pdfs, ...l.images, ...l.docs].map((x) => x.src);

// 1) id collisions
const ids = allLessons.map((l) => l.id);
const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log('lessons:', ids.length, '| unique ids:', new Set(ids).size, '| collisions:', [...new Set(dup)].length);
if (dup.length) { console.error('ID COLLISIONS:', [...new Set(dup)].slice(0, 20)); process.exit(1); }

// 2) slug sanity — spaces must become dashes, not vanish (guards mangled regex)
const badSlug = allLessons.find((l) => / /.test(l.id) || l.id.includes('--') || !/^ir-/.test(l.id));
if (badSlug) { console.error('BAD SLUG:', JSON.stringify(badSlug.id)); process.exit(1); }
console.log('sample ids:', ids.slice(0, 3), '…', ids.slice(-3));

// 3) media reachability: every archive src + every prep src (except the dropped
//    junk course prep-roadmap-files) must appear somewhere in the roadmap.
const reachable = new Set(allLessons.flatMap(srcsOf));
const archiveSrcs = ieltsAdvancedData.flatMap((m) => m.lessons.flatMap((l) => [...(l.videos || []), ...(l.audios || []), ...(l.pdfs || []), ...(l.images || []), ...(l.docs || [])].map((x) => x.src)));
const prepKept = ieltsPrepData.filter((c) => c.id !== 'prep-roadmap-files');
const prepSrcs = prepKept.flatMap((c) => c.lessons.flatMap((l) => [...(l.pdfs || []), ...(l.images || []), ...(l.docs || [])].map((x) => x.src)));

const missArchive = archiveSrcs.filter((s) => !reachable.has(s));
const missPrep = prepSrcs.filter((s) => !reachable.has(s));
console.log('archive media:', archiveSrcs.length, '| reachable:', archiveSrcs.length - missArchive.length);
console.log('prep media (excl. junk):', prepSrcs.length, '| reachable:', prepSrcs.length - missPrep.length);
if (missArchive.length) { console.error('ARCHIVE DROPPED:', missArchive.slice(0, 10)); process.exit(1); }
if (missPrep.length) { console.error('PREP DROPPED:', missPrep.slice(0, 10)); process.exit(1); }

// 4) confirm the junk course is gone and Chặng 5 dissolved
const changCount = ROADMAP.length;
const junkReach = [...reachable].some((s) => s.includes('roadmap-files'));
console.log('chặng count:', changCount, '(expect 4) | junk roadmap-files reachable:', junkReach);
if (changCount !== 4 || junkReach) { console.error('STRUCTURE WRONG'); process.exit(1); }

// 5) spine spot-check
for (const cid of ['c2-listening', 'c4-speaking', 'c4-ngu-phap']) {
  const course = ROADMAP.flatMap((ch) => ch.courses).find((c) => c.id === cid);
  const vids = course.lessons.filter((l) => l.videos.length).length;
  const docs = course.lessons.filter((l) => !l.videos.length && (l.pdfs.length || l.images.length)).length;
  console.log(`  ${cid}: ${course.lessons.length} bài (${vids} video, ${docs} tài liệu) — "${course.tag}"`);
}
console.log('\nALL CHECKS PASSED');
