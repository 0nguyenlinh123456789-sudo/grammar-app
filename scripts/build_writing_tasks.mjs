// File: scripts/build_writing_tasks.mjs
// SINH ĐỀ VIẾT GẮN VỚI TỪNG CHẶNG (việc 3.3) → src/data/writingGenerated.js
//
// Chạy:  node scripts/build_writing_tasks.mjs
//
// ══ VÌ SAO MÁY ĐƯỢC SINH ĐỀ VIẾT, TRONG KHI CẢ CHUỖI NÀY ĐANG XOÁ NỘI DUNG
//    MÁY SINH ══
//
// Luật đã chốt: GIỮ nội dung máy làm ra bằng cách SẮP XẾP LẠI tài liệu soạn
// tay; XOÁ nội dung máy nhân ra từ KHUÔN MẪU. Câu hỏi "Từ X nghĩa là gì?" nhân
// cho 5.000 từ đã bị xoá vì nó BỊA RA ĐÁP ÁN — máy tự đặt câu hỏi rồi tự nhận
// mình biết đáp án đúng.
//
// Đề viết khác ở đúng chỗ đó: **KHÔNG CÓ ĐÁP ÁN ĐỂ BỊA**. "Viết một đoạn dùng
// ít nhất 4 trong các từ sau" là một nhiệm vụ, không phải một khẳng định. Danh
// sách từ là của bộ từ vựng soạn tay; máy chỉ đóng khung nhiệm vụ quanh nó.
//
// NHƯNG CÓ MỘT THỨ MÁY TUYỆT ĐỐI KHÔNG ĐƯỢC SINH: BÀI MẪU. Bài mẫu là nội dung
// thật, phải người viết. Nên đề sinh ra ở đây KHÔNG có `modelAnswer`, và giao
// diện phải nói thẳng điều đó thay vì lặng lẽ thiếu. Đề có bài mẫu nằm ở
// src/data/writingPrompts.js — soạn tay, ít, và có bánh cóc riêng.
//
// ══ VÌ SAO CHÉP 8 TỪ VÀO ĐÂY THAY VÌ TRA CỨU LÚC HIỂN THỊ ══
// Đo thật: `vocabVstepData` là một chunk 4,9 MB, `oxfordPreIntData` 1,1 MB. Cho
// mục luyện viết import chúng để tra vài từ là kéo cả tảng đó vào. Chép 8 từ
// mỗi đề tốn khoảng 50 KB cho toàn bộ 500+ đề. Chênh nhau gần trăm lần, nên
// chép là đúng — nhưng chép thì phải SINH LẠI khi bộ từ vựng đổi, và có test
// đối chiếu ngược để không lệch âm thầm.
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src/data');
const OUT = path.join(DATA, 'writingGenerated.js');

// Vài file dữ liệu import nhau bằng đường dẫn không đuôi (Vite giải được, Node
// thì không). Cùng mẹo đã dùng trong build_roadmap.mjs.
async function loadAgg(file, pick) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_wt_${file.replace(/\W/g, '_')}.mjs`);
  fs.writeFileSync(tmp, src);
  try { return pick(await import(pathToFileURL(tmp).href)); } finally { fs.rmSync(tmp, { force: true }); }
}

const cf = await import(pathToFileURL(path.join(ROOT, 'src/utils/contentFilter.js')).href);
const topics = cf.sanitizeVocabTopics(await loadAgg('vocabVstepData.js', (m) => m.default));
const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
// Luật tách ô + chọn từ nằm ở MỘT bản duy nhất, dùng chung với bộ sinh đề nói
// (3.5) và bài kiểm đối chiếu ngược. Xem scripts/lib/vocab_pick.mjs.
const { tachO, chonTu } = await import(pathToFileURL(path.join(ROOT, 'scripts/lib/vocab_pick.mjs')).href);

const SACH_OXFORD = [
  { book: 'elementary', parts: [['oxfordData.js', 'courseData'], ['oxfordDataPart2.js', 'courseData'], ['oxfordDataPart3.js', 'courseData']] },
  { book: 'pre_intermediate', parts: [['oxfordPreIntData.js', 'courseData'], ['oxfordPreIntData51_75.js', 'courseData51_75'], ['oxfordPreIntData76_100.js', 'courseData76_100']] },
  { book: 'advanced', parts: [['oxfordAdvancedData1_25.js', 'courseData1_25'], ['oxfordAdvancedData26_50.js', 'courseData26_50'], ['oxfordAdvancedData51_75.js', 'courseData51_75'], ['oxfordAdvancedData76_100.js', 'courseData76_100']] },
];

const oxfordUnits = new Map();
for (const s of SACH_OXFORD) {
  for (const [f, k] of s.parts) {
    const m = await import(pathToFileURL(path.join(DATA, f)).href);
    for (const u of m[k] || []) oxfordUnits.set(`${s.book}:${u.id}`, u);
  }
}

// KHÔNG SINH ĐỀ CHO A0/A1. Tiêu chí N6 nói "từ A2 trở lên", và có lý do thật:
// người ở A0/A1 chưa viết nổi một đoạn, bắt họ viết là dựng lên một bức tường.
const BAND_BO_QUA = new Set(['foundation', 'starter']);

// Kiểu đề theo bậc — đi đúng lộ trình câu → đoạn → bài của việc 3.3.
const KIEU_THEO_BAND = {
  elementary: { kieu: 'cau', min: 20, max: 60, phaiDung: 3 },
  intermediate: { kieu: 'doan', min: 50, max: 100, phaiDung: 4 },
  upper_intermediate: { kieu: 'bai', min: 120, max: 200, phaiDung: 5 },
  advanced: { kieu: 'bai', min: 150, max: 250, phaiDung: 5 },
};

const topicById = new Map(topics.map((t) => [t.id, t]));
const ra = [];
const bo = [];

for (const band of roadmapData) {
  if (BAND_BO_QUA.has(band.level)) continue;
  const kt = KIEU_THEO_BAND[band.level];
  if (!kt) { bo.push(`${band.level}: chưa khai kiểu đề`); continue; }

  for (const m of band.milestones) {
    const chung = {
      type: m.type,
      targetId: m.targetId,
      band: band.level,
      cefr: m.cefr,
      title: m.title,
      kieu: kt.kieu,
      soTuToiThieu: kt.min,
      soTuToiDa: kt.max,
    };

    if (m.type === 'vstep') {
      const t = topicById.get(m.targetId);
      const tu = chonTu(t?.words || []);
      if (tu.length < kt.phaiDung) { bo.push(`${m.targetId}: chỉ có ${tu.length} từ dùng được`); continue; }
      ra.push({ ...chung, id: `gw-vstep-${m.targetId}`, tuMucTieu: tu, soTuPhaiDung: kt.phaiDung });
    } else if (m.type === 'oxford') {
      const u = oxfordUnits.get(`${m.bookId}:${m.targetId}`);
      const tu = chonTu(u?.theory?.coreVocab || []);
      if (tu.length < kt.phaiDung) { bo.push(`oxford ${m.bookId}/${m.targetId}: chỉ có ${tu.length} từ dùng được`); continue; }
      ra.push({ ...chung, id: `gw-oxford-${m.bookId}-${m.targetId}`, bookId: m.bookId, tuMucTieu: tu, soTuPhaiDung: kt.phaiDung });
    } else if (m.type === 'grammar') {
      // Chặng ngữ pháp KHÔNG có danh sách từ. Nên đề này máy chỉ kiểm được ĐỘ
      // DÀI — và phải nói thẳng ra, không giả vờ kiểm được điểm ngữ pháp. Cờ
      // `chiKiemDuocDoDai` đi theo bản ghi tới tận giao diện.
      ra.push({ ...chung, id: `gw-grammar-${m.targetId}`, tuMucTieu: [], soTuPhaiDung: 0, chiKiemDuocDoDai: true });
    } else {
      bo.push(`${m.targetId}: kiểu chặng "${m.type}" chưa biết sinh đề`);
    }
  }
}

const than = ra.map((e) => '  ' + JSON.stringify(e) + ',').join('\n');
fs.writeFileSync(OUT, `// File: src/data/writingGenerated.js
// SINH TỰ ĐỘNG bởi scripts/build_writing_tasks.mjs — đừng sửa tay.
//
// ĐỀ VIẾT GẮN VỚI TỪNG CHẶNG (việc 3.3). Ba điều phải nhớ trước khi đụng vào:
//
// 1. ĐỀ Ở ĐÂY KHÔNG CÓ BÀI MẪU, và đó là cố ý. Bài mẫu là nội dung thật, phải
//    người viết; máy sinh bài mẫu là đúng loại nội dung đã bị xoá khỏi kho.
//    Giao diện phải NÓI THẲNG "đề này chưa có bài mẫu" chứ không lặng lẽ thiếu.
//    Đề có bài mẫu nằm ở src/data/writingPrompts.js — soạn tay.
//
// 2. \`tuMucTieu\` là bản CHÉP của 8 từ lấy từ bộ từ vựng/giáo trình soạn tay.
//    Chép vì tra cứu lúc hiển thị sẽ kéo chunk 4,9 MB (vocabVstepData) vào mục
//    luyện viết. Đổi bộ từ vựng thì PHẢI chạy lại bộ sinh này; có test đối
//    chiếu ngược để không lệch âm thầm.
//
// 3. Chặng NGỮ PHÁP mang cờ \`chiKiemDuocDoDai\`: không có danh sách từ nên máy
//    chỉ đếm được số từ, không kiểm được điểm ngữ pháp. Cờ đó phải hiện ra tới
//    người học.
export const writingGenerated = [
${than}
];

export default writingGenerated;
`);

const demBand = ra.reduce((d, e) => ({ ...d, [e.band]: (d[e.band] || 0) + 1 }), {});
const demKieu = ra.reduce((d, e) => ({ ...d, [e.type]: (d[e.type] || 0) + 1 }), {});
process.stderr.write(`Đã ghi ${ra.length} đề vào ${OUT}\n`);
process.stderr.write(`  theo bậc: ${JSON.stringify(demBand)}\n`);
process.stderr.write(`  theo kiểu chặng: ${JSON.stringify(demKieu)}\n`);
if (bo.length) process.stderr.write(`Bỏ ${bo.length}:\n  ${bo.slice(0, 10).join('\n  ')}\n`);

// Con số cho trang chủ, tách khỏi kho đề: trang chủ chỉ cần biết CÓ BAO NHIÊU
// đề, không cần cả 170 KB dữ liệu. Không có file này thì import kho đề vào
// trang chủ chỉ để lấy `.length` — đo được là chunk trang chủ phình 168 KB.
fs.writeFileSync(path.join(DATA, 'writingCounts.js'), `// File: src/data/writingCounts.js
// SINH TỰ ĐỘNG bởi scripts/build_writing_tasks.mjs — đừng sửa tay.
// Chỉ chứa CON SỐ, để trang chủ khỏi phải nạp cả kho đề (~170 KB) chỉ vì một
// dòng hiển thị. Có test đối chiếu con số này với kho đề thật.
export const SO_DE_THEO_CHANG = ${ra.length};
`);
process.stderr.write(`Đã ghi src/data/writingCounts.js (SO_DE_THEO_CHANG = ${ra.length})\n`);
