// File: scripts/va_c1_bai_tap.mjs
//
//   node scripts/va_c1_bai_tap.mjs            # xem sẽ đổi gì, KHÔNG ghi
//   node scripts/va_c1_bai_tap.mjs --ghi      # ghi thật
//
// BÙ LẠI CÁC BÀI TẬP C1+ ĐANG BỊ `locBaiHong()` LỌC BỎ.
//
// Máy sinh nội dung C1/C2 để lại ba loại rác: câu "viết lại" có đáp án trùng
// câu đề, câu "sửa lỗi" có từ sai trùng từ sửa, và câu "điền từ" giữ chỗ
// ("This is a C1/C2 level practice _____."). App lọc sạch chúng trước khi hiện
// — đúng luật ẨN-hoặc-BÁO — nên không ai bị chấm sai. Nhưng lọc xong thì bậc
// C1+ trống hẳn một loại bài: 0/75 câu viết lại sống sót, cả 25 bài mất tab.
//
// Script này thay rác bằng nội dung SOẠN TAY trong scripts/data/c1_bai_tap.json.
//
// ══ NGUYÊN TẮC ══
//  · CHỈ thay câu hỏng. Câu đang dùng được thì giữ nguyên, không đụng vào.
//  · Không tự sinh câu. Thiếu bao nhiêu thì báo bấy nhiêu rồi dừng — đúng thói
//    quen của dự án: không lấp chỗ trống bằng chữ máy đẻ.
//  · Chạy khan mặc định. Muốn ghi phải nói `--ghi`.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { grammarDataC1C2 } from '../src/data/grammarDataC1C2.js';

const DUONG = 'src/data/grammarDataC1C2.js';
const GHI = process.argv.includes('--ghi');

// Gộp mọi tệp soạn `c1_bai_tap*.json` — soạn theo đợt thì mỗi đợt một tệp, dễ
// soát lại từng đợt hơn là một tệp khổng lồ.
const soan = {};
for (const ten of readdirSync('scripts/data').filter((f) => /^c1_bai_tap.*\.json$/.test(f)).sort()) {
  const phan = JSON.parse(readFileSync(`scripts/data/${ten}`, 'utf8'));
  for (const [id, muc] of Object.entries(phan)) {
    if (id.startsWith('_')) continue;
    // Gộp mảng thay vì báo lỗi: một bài có thể được bù qua nhiều đợt.
    soan[id] = soan[id] || {};
    for (const [khoa, ds] of Object.entries(muc)) {
      soan[id][khoa] = [...(soan[id][khoa] || []), ...ds];
    }
  }
}

const chuan = (v) => String(v ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const boDauCau = (v) => chuan(v).replace(/[.,!?;:"'’“”]/g, '');
const hongEcCoBan = (e) => chuan(e.errorWord) === chuan(e.correction)
  || !boDauCau(e.sentence).includes(boDauCau(e.errorWord));
const hongTf = (e) => boDauCau(e.original) === boDauCau(e.a)
  || !chuan(e.keyword)
  || /^viết lại câu giữ nguyên nghĩa\.?$/i.test(String(e.instruction || '').trim());
const hongFb = (f) => /this is a .{0,20}level practice/i.test(String(f.q || ''));

// Câu sửa lỗi DÙNG LẠI ở nhiều bài là câu độn của máy sinh, không phải bài tập
// của bài đó: "Not until he left do I realize the truth." nằm y hệt ở 20 bài,
// trong đó có cả bài về Danh từ, Thành ngữ và Dấu câu — lạc đề hoàn toàn.
const demCau = new Map();
for (const b of grammarDataC1C2) {
  for (const e of b.errorCorrection || []) {
    demCau.set(chuan(e.sentence), (demCau.get(chuan(e.sentence)) || 0) + 1);
  }
}
const laCauDon = (e) => (demCau.get(chuan(e.sentence)) || 0) >= 3;

let doi = 0;
let thieu = 0;
const moi = grammarDataC1C2.map((bai) => {
  const nguon = soan[bai.id];
  const ra = { ...bai };
  for (const [khoa, hong] of [['errorCorrection', (e) => hongEcCoBan(e) || laCauDon(e)], ['transformation', hongTf], ['fillBlanks', hongFb]]) {
    const cu = bai[khoa] || [];
    const giu = cu.filter((x) => !hong(x));
    const canBu = cu.length - giu.length;
    if (canBu === 0) continue;
    const co = (nguon && nguon[khoa]) || [];
    // Bỏ qua câu đã nằm sẵn trong bài: script phải chạy lại được nhiều lần mà
    // không tự nhân đôi nội dung của đợt trước.
    const daCo = new Set(giu.map((x) => chuan(x.sentence ?? x.original ?? x.q)));
    const chua = co.filter((x) => !daCo.has(chuan(x.sentence ?? x.original ?? x.q)));
    if (chua.length < canBu) {
      thieu += canBu - chua.length;
      console.log(`  THIẾU  ${bai.id} · ${khoa}: cần ${canBu}, còn chưa dùng ${chua.length}`);
    }
    ra[khoa] = [...giu, ...chua.slice(0, canBu)];
    doi += Math.min(chua.length, canBu);
  }
  return ra;
});

console.log(`\nthay được ${doi} câu · còn thiếu ${thieu} câu`);

if (!GHI) {
  console.log('(chạy khan — thêm --ghi để ghi vào file)');
  process.exit(0);
}
if (thieu > 0) {
  console.log('DỪNG: chưa soạn đủ. Không ghi nửa vời vào file dữ liệu.');
  process.exit(1);
}

const dau = readFileSync(DUONG, 'utf8').split('export const grammarDataC1C2')[0];
writeFileSync(DUONG, `${dau}export const grammarDataC1C2 = ${JSON.stringify(moi, null, 2)};\n`, 'utf8');
console.log(`đã ghi ${DUONG}`);
