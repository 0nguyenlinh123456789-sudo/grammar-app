// File: scripts/build_speaking_tasks.mjs
// SINH ĐỀ NÓI GẮN VỚI TỪNG CHẶNG B1+ (việc 3.5) → src/data/speakingGenerated.js
//
// Chạy:  node scripts/build_speaking_tasks.mjs
//
// ══ VÌ SAO MÁY ĐƯỢC SINH ĐỀ NÓI ══
// Cùng lý do đã cho phép sinh đề viết ở việc 3.3: ĐỀ NÓI KHÔNG CÓ ĐÁP ÁN ĐỂ
// BỊA. "Nói 60–90 giây về chủ đề này, dùng ít nhất 4 trong các từ sau" là một
// NHIỆM VỤ. Danh sách từ vẫn là của bộ từ vựng soạn tay; máy chỉ đóng khung
// nhiệm vụ quanh nó. Thứ máy không được sinh vẫn là BÀI MẪU.
//
// ══ VÌ SAO CHỈ TỪ B1 TRỞ LÊN ══
// Tiêu chí nghiệm thu của việc 3.5 là "≥1 đề nói mỗi chặng B1+". Đó không phải
// con số tuỳ tiện: nói THÀNH BÀI về một chủ đề là việc của B1 trở lên. Người ở
// A1–A2 vẫn có mục đọc to từng từ đã có sẵn — đề nói theo chủ đề đặt ở đó là
// dựng một bức tường, không phải một bậc thang.
//
// ══ THỨ BỘ NÀY TUYỆT ĐỐI KHÔNG HỨA ══
// Không có "điểm phát âm" ở bất cứ đâu trong dữ liệu sinh ra. Trình duyệt trả
// về VĂN BẢN nó nghe được, không trả về đánh giá phát âm. Xem
// src/utils/speakingCheck.js.
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src/data');
const OUT = path.join(DATA, 'speakingGenerated.js');

async function loadAgg(file, pick) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_st_${file.replace(/\W/g, '_')}.mjs`);
  fs.writeFileSync(tmp, src);
  try { return pick(await import(pathToFileURL(tmp).href)); } finally { fs.rmSync(tmp, { force: true }); }
}

const cf = await import(pathToFileURL(path.join(ROOT, 'src/utils/contentFilter.js')).href);
const topics = cf.sanitizeVocabTopics(await loadAgg('vocabVstepData.js', (m) => m.default));
const { roadmapData } = await import(pathToFileURL(path.join(DATA, 'roadmapData.js')).href);
// Dùng CHUNG luật tách ô và luật chọn từ với bộ sinh đề viết — không chép lại.
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

// Chỉ B1+ (xem lý do ở đầu file). `intermediate`=B1, `upper_intermediate`=B2,
// `advanced`=C1.
const KIEU_THEO_BAND = {
  intermediate: { kieu: 'ke', giay: 60, soTuToiThieu: 45, phaiDung: 3 },
  upper_intermediate: { kieu: 'trinh_bay', giay: 90, soTuToiThieu: 80, phaiDung: 4 },
  advanced: { kieu: 'lap_luan', giay: 120, soTuToiThieu: 110, phaiDung: 4 },
};

const topicById = new Map(topics.map((t) => [t.id, t]));
const ra = [];
const bo = [];

for (const band of roadmapData) {
  const kt = KIEU_THEO_BAND[band.level];
  if (!kt) continue; // A0–A2: cố ý không sinh
  for (const m of band.milestones) {
    const chung = {
      type: m.type,
      targetId: m.targetId,
      band: band.level,
      cefr: m.cefr,
      title: m.title,
      kieu: kt.kieu,
      giay: kt.giay,
      soTuToiThieu: kt.soTuToiThieu,
    };

    if (m.type === 'vstep') {
      const t = topicById.get(m.targetId);
      const tu = chonTu(t?.words || []);
      if (tu.length < kt.phaiDung) { bo.push(`${m.targetId}: chỉ có ${tu.length} từ dùng được`); continue; }
      ra.push({ ...chung, id: `gs-vstep-${m.targetId}`, tuMucTieu: tu, soTuPhaiDung: kt.phaiDung });
    } else if (m.type === 'oxford') {
      const u = oxfordUnits.get(`${m.bookId}:${m.targetId}`);
      const tu = chonTu(u?.theory?.coreVocab || []);
      if (tu.length < kt.phaiDung) { bo.push(`oxford ${m.bookId}/${m.targetId}: chỉ có ${tu.length} từ dùng được`); continue; }
      ra.push({ ...chung, id: `gs-oxford-${m.bookId}-${m.targetId}`, bookId: m.bookId, tuMucTieu: tu, soTuPhaiDung: kt.phaiDung });
    } else if (m.type === 'grammar') {
      // Chặng ngữ pháp không có danh sách từ → máy chỉ đếm được ĐỘ DÀI lời nói
      // trình duyệt nghe được. Cờ đi theo bản ghi tới tận giao diện.
      ra.push({ ...chung, id: `gs-grammar-${m.targetId}`, tuMucTieu: [], soTuPhaiDung: 0, chiKiemDuocDoDai: true });
    } else {
      bo.push(`${m.targetId}: kiểu chặng "${m.type}" chưa biết sinh đề`);
    }
  }
}

const than = ra.map((e) => '  ' + JSON.stringify(e) + ',').join('\n');
fs.writeFileSync(OUT, `// File: src/data/speakingGenerated.js
// SINH TỰ ĐỘNG bởi scripts/build_speaking_tasks.mjs — đừng sửa tay.
//
// ĐỀ NÓI GẮN VỚI TỪNG CHẶNG B1+ (việc 3.5). Ba điều phải nhớ:
//
// 1. KHÔNG CÓ TRƯỜNG NÀO Ở ĐÂY LÀ ĐIỂM PHÁT ÂM, và sẽ không bao giờ có. Trình
//    duyệt trả về VĂN BẢN nó nghe được; từ văn bản không suy ra được phát âm.
//
// 2. \`tuMucTieu\` là bản CHÉP 8 từ từ bộ từ vựng/giáo trình soạn tay (chép vì
//    tra cứu lúc hiển thị sẽ kéo chunk 4,9 MB vào mục luyện nói). Đổi bộ từ
//    vựng thì PHẢI chạy lại bộ sinh; có test đối chiếu ngược.
//
// 3. Chỉ có chặng B1+ — A0–A2 cố ý không có đề nói theo chủ đề.
export const speakingGenerated = [
${than}
];

export default speakingGenerated;
`);

const demBand = ra.reduce((d, e) => ({ ...d, [e.band]: (d[e.band] || 0) + 1 }), {});
process.stderr.write(`Đã ghi ${ra.length} đề nói vào ${OUT}\n`);
process.stderr.write(`  theo bậc: ${JSON.stringify(demBand)}\n`);
if (bo.length) process.stderr.write(`Bỏ ${bo.length}:\n  ${bo.slice(0, 10).join('\n  ')}\n`);

fs.writeFileSync(path.join(DATA, 'speakingCounts.js'), `// File: src/data/speakingCounts.js
// SINH TỰ ĐỘNG bởi scripts/build_speaking_tasks.mjs — đừng sửa tay.
// Chỉ chứa CON SỐ, để trang chủ khỏi phải nạp cả kho đề chỉ vì một dòng hiển
// thị. Có test đối chiếu con số này với kho đề thật.
export const SO_DE_NOI_THEO_CHANG = ${ra.length};
`);
process.stderr.write(`Đã ghi src/data/speakingCounts.js (SO_DE_NOI_THEO_CHANG = ${ra.length})\n`);
