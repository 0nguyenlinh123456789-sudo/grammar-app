// File: scripts/audit_a1a2_story.mjs
// ĐO XEM BÀI ĐỌC A1/A2 CÓ ĐỦ NỘI DUNG ĐỂ SOẠN CÂU HỎI MỨC VĂN BẢN KHÔNG.
//
// Chạy:  node scripts/audit_a1a2_story.mjs [--ke]   (--ke = in danh sách id)
//
// ══ VÌ SAO CÓ FILE NÀY ══
// Tôi đã nói với chủ dự án rằng bài đọc A1/A2 "phần lớn là chuỗi diễu hành từ
// vựng, không có nội dung để hỏi", và dùng câu đó làm ràng buộc cho quyết định
// mở rộng việc 3.1. **Câu đó SAI, và sai vì tôi suy rộng từ MỘT ví dụ** —
// `nature-countryside`, mà bài đó còn không thuộc A1/A2.
//
// Đo thật: 93/145 chặng A1/A2 đạt cả bốn tiêu chí dưới đây. Nên phương án "phủ cả
// 267" KHÔNG bị chặn bởi chất lượng bài đọc như tôi đã nói.
//
// ══ BỐN TIÊU CHÍ, VÀ VÌ SAO LÀ BỐN TIÊU CHÍ NÀY ══
// Câu hỏi mức văn bản cần bài đọc có ít nhất bốn chỗ hỏi được, mỗi chỗ có một câu
// làm căn cứ nguyên văn. Suy ra:
//   ≥6 câu        — bốn câu hỏi cần ít nhất bốn câu căn cứ khác nhau, cộng đệm.
//   ≥80 từ        — dưới mức đó thì bốn câu hỏi sẽ hỏi lại cùng một chỗ.
//   mật độ <0,35  — "mật độ" = tỉ lệ từ trong bài là từ vựng của chính chủ đề đó.
//                   Cao nghĩa là bài chỉ để nhồi từ, không kể chuyện gì.
//   ≥4 dấu hiệu tường thuật — đại từ và liên từ (he/she/they/because/but/then...).
//                   Không có chúng thì bài là một danh sách, không phải văn bản.
//
// Đây là BỘ LỌC THÔ để ra danh sách việc, KHÔNG phải phán quyết chất lượng. Bài
// đạt bốn tiêu chí vẫn có thể không soạn nổi bốn câu tử tế — chỉ người đọc mới
// biết, và chặng nào loại thì phải ghi lý do đích danh (như `digital-society-100`).
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src/data');

export const TIEU_CHI = { cauToiThieu: 6, tuToiThieu: 80, matDoToiDa: 0.35, tuongThuatToiThieu: 4 };
const BAC_A1A2 = ['starter', 'elementary'];
const DAU_HIEU = /\b(he|she|they|his|her|their|because|but|so|then|after|before|when|while|however)\b/gi;

async function loadAgg(file, pick) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_a1a2_${file.replace(/\W/g, '_')}.mjs`);
  fs.writeFileSync(tmp, src);
  try { return pick(await import(pathToFileURL(tmp).href)); } finally { fs.rmSync(tmp, { force: true }); }
}

export async function doA1A2() {
  const cf = await import(pathToFileURL(path.join(ROOT, 'src/utils/contentFilter.js')).href);
  const topics = cf.sanitizeVocabTopics(await loadAgg('vocabVstepData.js', (m) => m.default));
  const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
  const { STORY_QUIZ } = await import(pathToFileURL(path.join(DATA, 'storyQuiz.js')).href);
  const byId = new Map(topics.map((t) => [t.id, t]));

  const ra = { daCo: [], du: [], khong: [] };
  for (const l of roadmapData) {
    if (!BAC_A1A2.includes(l.level)) continue;
    for (const m of l.milestones) {
      if (m.type !== 'vstep') continue;
      const t = byId.get(m.targetId);
      if (!t) continue;
      if (STORY_QUIZ[t.id]) { ra.daCo.push(t.id); continue; }

      const en = String(t.storyEn || '').trim();
      const tu = en.split(/\s+/).filter(Boolean).length;
      const cau = en.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 3).length;
      const kho = new Set((t.words || []).map((w) => String(w.en || '').toLowerCase()));
      let trung = 0;
      for (const w of en.toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/)) if (kho.has(w)) trung += 1;
      const matDo = tu ? trung / tu : 0;
      const tuongThuat = (en.match(DAU_HIEU) || []).length;

      const dat = cau >= TIEU_CHI.cauToiThieu && tu >= TIEU_CHI.tuToiThieu
        && matDo < TIEU_CHI.matDoToiDa && tuongThuat >= TIEU_CHI.tuongThuatToiThieu;
      const ban = { id: t.id, bac: l.level, tu, cau, matDo: +matDo.toFixed(2), tuongThuat };
      (dat ? ra.du : ra.khong).push(ban);
    }
  }
  return ra;
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const { daCo, du, khong } = await doA1A2();
  const theoBac = (ds) => ds.reduce((d, r) => ({ ...d, [r.bac]: (d[r.bac] || 0) + 1 }), {});
  console.log(`Chặng A1/A2 (type vstep): ${daCo.length + du.length + khong.length}`);
  console.log(`  đã có câu hỏi mức văn bản: ${daCo.length}`);
  console.log(`  ĐỦ điều kiện soạn:         ${du.length}  ${JSON.stringify(theoBac(du))}`);
  console.log(`  KHÔNG đủ:                  ${khong.length}  ${JSON.stringify(theoBac(khong))}`);
  console.log(`\nTiêu chí: ≥${TIEU_CHI.cauToiThieu} câu · ≥${TIEU_CHI.tuToiThieu} từ · mật độ từ mục tiêu <${TIEU_CHI.matDoToiDa} · ≥${TIEU_CHI.tuongThuatToiThieu} dấu hiệu tường thuật`);

  const lyDo = (r) => [
    r.cau < TIEU_CHI.cauToiThieu ? `chỉ ${r.cau} câu` : null,
    r.tu < TIEU_CHI.tuToiThieu ? `chỉ ${r.tu} từ` : null,
    r.matDo >= TIEU_CHI.matDoToiDa ? `mật độ từ mục tiêu ${r.matDo}` : null,
    r.tuongThuat < TIEU_CHI.tuongThuatToiThieu ? `${r.tuongThuat} dấu hiệu tường thuật` : null,
  ].filter(Boolean).join(', ');

  console.log('\nVì sao 52 chặng không đủ (đếm theo lý do):');
  const dem = {};
  for (const r of khong) for (const l of lyDo(r).split(', ')) dem[l.replace(/\d+([,.]\d+)?/, 'N')] = (dem[l.replace(/\d+([,.]\d+)?/, 'N')] || 0) + 1;
  for (const [k, n] of Object.entries(dem).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${k}`);

  if (process.argv.includes('--ke')) {
    console.log('\n── DANH SÁCH VIỆC (đủ điều kiện) ──');
    for (const r of du) console.log(`  ${r.bac.padEnd(11)} ${r.id.padEnd(36)} ${r.tu} từ / ${r.cau} câu · mật độ ${r.matDo} · tt ${r.tuongThuat}`);
    console.log('\n── LOẠI, kèm lý do đo được ──');
    for (const r of khong) console.log(`  ${r.bac.padEnd(11)} ${r.id.padEnd(36)} ${lyDo(r)}`);
  }
}
