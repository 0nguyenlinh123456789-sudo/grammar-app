// File: scripts/kiem_cam_ket.mjs
//
//   npm run kiem:camket
//
// ĐO XEM SẢN PHẨM CÓ ĐỦ ĐỂ GIỮ LỜI HỨA KHÔNG, BẰNG DỮ LIỆU CHỨ KHÔNG BẰNG CHỮ.
//
// Cam kết đang bán: "mất gốc (A0) → B2 vững, thêm nhánh C1 dự bị". Chủ dự án hỏi
// thêm: đã "tốt 4 kỹ năng" chưa.
//
// ⚠️ HAI CÂU HỎI KHÁC NHAU, VÀ TRỘN CHÚNG LÀ CÁCH DỄ NHẤT ĐỂ TỰ LỪA:
//   · "đủ nội dung tới B2 chưa" — đếm được: bao nhiêu chặng ở mỗi bậc.
//   · "tốt 4 kỹ năng chưa" — KHÔNG đếm bằng số chặng được, vì một kỹ năng có
//     nhiều bài mà không có cách chấm thì vẫn không thành kỹ năng.
//
// Nên file này đo riêng từng thứ, và ở phần kỹ năng nó hỏi câu khó hơn: người
// học SẢN XUẤT ra tiếng Anh (nói/viết) hay chỉ NHẬN VÀO (đọc/nghe), và có gì
// chấm phần sản xuất đó không.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve('.');
const nap = (p) => import(pathToFileURL(path.join(ROOT, p)).href);

const in2 = (a, b) => console.log(`  ${String(a).padEnd(46)}${b}`);

// ── 1. LỘ TRÌNH THEO BẬC VÀ THEO KỸ NĂNG ───────────────────────────────────
const { roadmapData, CEFR_OF_BAND, BAC_CAM_KET, BAC_DU_BI } = await nap('src/data/roadmapData.js');
const bac = Array.isArray(roadmapData) ? roadmapData : Object.values(roadmapData);

let tong = 0;
const theoLoai = new Map();
const soChang = new Map();
for (const b of bac) {
  const ms = b.milestones || [];
  tong += ms.length;
  soChang.set(b.level, ms.length);
  for (const c of ms) theoLoai.set(c.type || '?', (theoLoai.get(c.type || '?') || 0) + 1);
}

console.log('\n═══ 1. LỘ TRÌNH ĐI TỚI ĐÂU ═══');
in2('bậc'.padEnd(20) + 'CEFR', 'chặng');
for (const b of bac) {
  const cef = CEFR_OF_BAND[b.level] || '?';
  const dau2 = b.level === BAC_CAM_KET ? '  ← ĐÍCH CAM KẾT' : (b.level === BAC_DU_BI ? '  ← nhánh dự bị' : '');
  in2(`${String(b.level).padEnd(20)}${cef}`, `${soChang.get(b.level)}${dau2}`);
}
in2('TỔNG', `${tong} chặng`);

// ⚠️ PHÉP SO ĐÁNG GIÁ NHẤT PHẦN NÀY: bậc ĐÍCH có mỏng hơn bậc dưới nó không.
// Bán "B2 vững" mà B2 lại là bậc ít chặng nhất trong nhóm trên thì lời hứa nằm
// đúng chỗ nội dung yếu nhất — và không con số tổng nào cho thấy điều đó.
const nB1 = soChang.get('intermediate') || 0;
const nB2 = soChang.get(BAC_CAM_KET) || 0;
const nC1 = soChang.get(BAC_DU_BI) || 0;
console.log('');
if (nB2 < nB1 || nB2 < nC1) {
  console.log(`  ⚠️ BẬC ĐÍCH MỎNG HƠN HÀNG XÓM: B2 có ${nB2} chặng, trong khi B1 có ${nB1}`);
  console.log(`     và C1 (chỉ là nhánh DỰ BỊ) có ${nC1}. Chỗ được bán là "vững" lại là`);
  console.log('     chỗ ít nội dung nhất.');
} else {
  console.log(`  bậc đích B2 (${nB2}) không mỏng hơn B1 (${nB1}) hay C1 (${nC1}).`);
}

console.log('\n═══ 1b. CHẶNG THEO KỸ NĂNG — câu hỏi thật sự ═══');
for (const [t, n] of [...theoLoai].sort((a, b2) => b2[1] - a[1])) {
  in2(`  ${t}`, `${n} chặng (${((n * 100) / tong).toFixed(0)}%)`);
}
const KY_NANG_THIEU = ['speaking', 'writing'].filter((k) => !theoLoai.has(k));
console.log('');
if (KY_NANG_THIEU.length) {
  console.log(`  ⚠️ KHÔNG CÓ CHẶNG NÀO thuộc loại: ${KY_NANG_THIEU.join(', ')}.`);
  console.log('     Nghĩa là người học đi hết lộ trình mà KHÔNG được giao lấy một');
  console.log('     bài nói hay bài viết nào. Hai màn luyện đó có tồn tại, nhưng nằm');
  console.log('     NGOÀI đường đi — muốn dùng thì phải tự tìm tới.');
}
// ── 2. NỘI DUNG THEO KỸ NĂNG ────────────────────────────────────────────────
console.log('\n═══ 2. BỐN KỸ NĂNG — CÓ BAO NHIÊU, VÀ CHẤM ĐƯỢC KHÔNG ═══');

const dem = async (duong, ten) => {
  try {
    const m = await nap(duong);
    const v = m[ten] || m.default;
    if (Array.isArray(v)) return v.length;
    if (v && typeof v === 'object') return Object.keys(v).length;
    return 0;
  } catch { return -1; }
};

const soDoc = await dem('src/data/storyQuiz.js', 'STORY_QUIZ');
const soNghe = await dem('src/data/listeningPassages.js', 'LISTENING_PASSAGES');

const coFile = (p) => fs.existsSync(path.join(ROOT, p));
const nguon = (p) => (coFile(p) ? fs.readFileSync(path.join(ROOT, p), 'utf8') : '');

const noi = nguon('src/components/vocab/SpeakingPractice.jsx');
const viet = nguon('src/components/vocab/WritingPractice.jsx');
const aiCore = nguon('functions/api/ai.js');

console.log('\n  ĐỌC');
in2('  chủ đề có câu hỏi đọc hiểu', soDoc >= 0 ? `${soDoc}` : 'không đọc được');
in2('  chấm tự động', 'CÓ — trắc nghiệm, có câu căn cứ theo chỉ số');

console.log('\n  NGHE');
in2('  bài nghe đoạn dài', soNghe >= 0 ? `${soNghe}` : 'KHÔNG CÓ FILE');
in2('  nguồn âm thanh', /audio|\.mp3/i.test(nguon('src/data/listeningPassages.js'))
  ? 'có tệp thu' : 'TTS trình duyệt (máy đọc), không phải giọng thật');

console.log('\n  NÓI');
in2('  có màn luyện nói', noi ? 'CÓ' : 'KHÔNG');
in2('  cách nhận đầu vào', /SpeechRecognition|webkitSpeech/.test(noi)
  ? 'nhận dạng giọng nói của TRÌNH DUYỆT → ra BẢN CHỮ' : 'không rõ');
in2('  chấm PHÁT ÂM', /pronunciation|phát âm/i.test(aiCore) && !/KHÔNG.*phát âm/i.test(aiCore)
  ? 'có' : 'KHÔNG — mô hình chỉ đọc chữ, không nghe được âm thanh');
in2('  chấm nội dung/ngữ pháp lượt nói', /mode === 'speaking'/.test(aiCore) ? 'CÓ (qua AI, key của người học)' : 'không');

console.log('\n  VIẾT');
in2('  có màn luyện viết', viet ? 'CÓ' : 'KHÔNG');
in2('  chấm bài', /mode === 'writing'/.test(aiCore) ? 'CÓ (qua AI, key của người học)' : 'không');

// ── 3. ĐIỀU KIỆN NGẦM CỦA HAI KỸ NĂNG SẢN XUẤT ──────────────────────────────
console.log('\n═══ 3. ĐIỀU KIỆN NGẦM — chỗ lời hứa dễ vỡ nhất ═══');
in2('nói & viết chấm được bằng gì', 'API key Gemini của CHÍNH người học');
in2('không có key thì sao', 'hai kỹ năng sản xuất còn lại phần luyện, KHÔNG có phản hồi');
in2('=> "tốt 4 kỹ năng" đúng với ai', 'chỉ đúng với người học ĐÃ tự lấy key Google');

console.log('\n═══ ĐỌC KẾT QUẢ NÀY THẾ NÀO ═══');
console.log('  Số chặng KHÔNG trả lời được câu "tốt 4 kỹ năng chưa". Một kỹ năng chỉ');
console.log('  thành kỹ năng khi người học SẢN XUẤT ra tiếng Anh và có thứ gì đó chấm');
console.log('  lại. Đọc và nghe là NHẬN VÀO — chấm bằng trắc nghiệm là đủ. Nói và viết');
console.log('  là SẢN XUẤT — và cả hai đang dựa vào key AI của chính người học.');
