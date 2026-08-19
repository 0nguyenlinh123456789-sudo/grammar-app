// File: scripts/kiem_cam_ket.mjs
//
//   npm run kiem:camket
//
// ĐO XEM SẢN PHẨM CÓ ĐỦ ĐỂ GIỮ LỜI HỨA KHÔNG, BẰNG DỮ LIỆU CHỨ KHÔNG BẰNG CHỮ.
//
// Cam kết đang bán: "mất gốc (A0) → B2 vững, thêm nhánh C1 dự bị". Chủ dự án
// hỏi thêm: đã "tốt 4 kỹ năng" chưa.
//
// ══════════════════════════════════════════════════════════════════════════
// ⚠️ BẢN ĐẦU CỦA FILE NÀY ĐÃ ĐO SAI, VÀ SAI THEO KIỂU TỆ NHẤT: NÓ TỰ TIN.
//
// Nó đếm `milestone.type`, thấy không có type nào tên `speaking`/`writing`, rồi
// kết luận "người học đi hết lộ trình mà KHÔNG được giao lấy một bài nói hay
// bài viết nào". SAI HOÀN TOÀN. Đề nói và đề viết KHÔNG phải là chặng riêng —
// chúng GẮN VÀO TỪNG CHẶNG, tra bằng `deChoChang`/`deNoiChoChang`, và hiện ra
// thành hai nút ngay trên thẻ chặng (WelcomePage, khối "(3.3/3.5) Đề viết/nói
// của CHÍNH chặng này"). Độ phủ thật là 99–100% chặng ở mọi bậc đã mở cửa.
//
// Bài học, ghi lại đây vì nó đã suýt tốn hàng tuần soạn nội dung thừa:
//   **ĐƠN VỊ ĐO PHẢI LÀ THỨ NGƯỜI HỌC CHẠM VÀO, KHÔNG PHẢI THỨ MÔ HÌNH DỮ
//   LIỆU TÌNH CỜ ĐẶT TÊN.** Nên phần đo phủ dưới đây gọi ĐÚNG hai hàm tra mà
//   giao diện gọi, và áp ĐÚNG cửa bậc mà giao diện áp. Nếu giao diện đổi cách
//   mở đề, phép đo này phải đổi theo — chép luật ra đây là quay lại đúng bẫy.
// ══════════════════════════════════════════════════════════════════════════
//
// HAI CÂU HỎI KHÁC NHAU, VÀ TRỘN CHÚNG LÀ CÁCH DỄ NHẤT ĐỂ TỰ LỪA:
//   · "đủ nội dung tới B2 chưa" — đo được, nhưng phải đo bằng GIỜ CỘNG DỒN chứ
//     không bằng SỐ CHẶNG (xem phần 1).
//   · "tốt 4 kỹ năng chưa" — không suy ra được từ số lượng, vì một kỹ năng có
//     nhiều bài mà không có cách chấm thì vẫn không thành kỹ năng (phần 3).

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve('.');
const nap = (p) => import(pathToFileURL(path.join(ROOT, p)).href);

const in2 = (a, b) => console.log(`  ${String(a).padEnd(46)}${b}`);
const gio = (phut) => `${(phut / 60).toFixed(1)} giờ`;

// ── 1. LỘ TRÌNH ĐI TỚI ĐÂU, ĐO BẰNG GIỜ ────────────────────────────────────
const { roadmapData, CEFR_OF_BAND, BAC_CAM_KET, BAC_DU_BI, ROADMAP_BANDS } = await nap('src/data/roadmapData.js');
const bac = Array.isArray(roadmapData) ? roadmapData : Object.values(roadmapData);

const soChang = new Map();
const soPhut = new Map();
for (const b of bac) {
  const ms = b.milestones || [];
  soChang.set(b.level, ms.length);
  soPhut.set(b.level, ms.reduce((s, m) => s + (m.minutes || 0), 0));
}

console.log('\n═══ 1. LỘ TRÌNH ĐI TỚI ĐÂU ═══');
console.log('  (số CHẶNG là đơn vị dễ gây hiểu lầm — một chặng Oxford và một chặng');
console.log('   từ vựng chênh nhau nhiều lần về khối lượng. Cột GIỜ mới so được.)\n');
in2(`${'bậc'.padEnd(20)}CEFR`, `${'chặng'.padStart(6)}${'giờ'.padStart(11)}`);
for (const b of bac) {
  const cef = CEFR_OF_BAND[b.level] || '?';
  const dau = b.level === BAC_CAM_KET ? '  ← ĐÍCH CAM KẾT' : (b.level === BAC_DU_BI ? '  ← nhánh dự bị' : '');
  in2(`${String(b.level).padEnd(20)}${cef}`,
    `${String(soChang.get(b.level)).padStart(6)}${gio(soPhut.get(b.level)).padStart(11)}${dau}`);
}

// ⚠️ PHÉP SO ĐÚNG CHO CÂU "ĐỦ ĐỂ TỚI B2 CHƯA" LÀ CỘNG DỒN A0→B2, không phải
// nhìn riêng bậc B2. Người mất gốc đi lên thì hưởng cả các bậc dưới đích.
const TOI_DICH = ROADMAP_BANDS.slice(0, ROADMAP_BANDS.indexOf(BAC_CAM_KET) + 1);
const phutToiDich = TOI_DICH.reduce((s, lv) => s + (soPhut.get(lv) || 0), 0);
const gioToiDich = phutToiDich / 60;
// Mốc tham chiếu: giờ học có hướng dẫn TÍCH LUỸ để đạt B2 theo thang
// Cambridge/CEFR thường được ghi khoảng 500–600 giờ tính từ số 0.
const MOC_B2_GIO = 500;
console.log('');
in2('CỘNG DỒN A0 → B2 (đường của người mất gốc)', gio(phutToiDich));
in2('mốc tham chiếu CEFR/Cambridge để đạt B2', `${MOC_B2_GIO}–600 giờ`);
if (gioToiDich >= MOC_B2_GIO) {
  console.log(`  ✅ ĐỦ KHỐI LƯỢNG: ${gioToiDich.toFixed(0)} giờ nội dung trên đường tới đích.`);
} else {
  console.log(`  ⚠️ THIẾU KHỐI LƯỢNG: mới ${gioToiDich.toFixed(0)} giờ, dưới mốc ${MOC_B2_GIO} giờ.`);
}
console.log('     (Đây là giờ NỘI DUNG CÓ SẴN, không phải lời hứa về thời gian học của');
console.log('      một cá nhân — người học nhanh chậm khác nhau.)');

// Bậc đích vẫn đáng soi RIÊNG: nó là chỗ được bán bằng chữ "vững".
const gB1 = (soPhut.get('intermediate') || 0) / 60;
const gB2 = (soPhut.get(BAC_CAM_KET) || 0) / 60;
const gC1 = (soPhut.get(BAC_DU_BI) || 0) / 60;
console.log('');
if (gB2 < gB1 * 0.8 || gB2 < gC1 * 0.8) {
  console.log(`  ⚠️ RIÊNG BẬC ĐÍCH MỎNG HƠN HÀNG XÓM: B2 ${gB2.toFixed(0)} giờ, B1 ${gB1.toFixed(0)} giờ,`);
  console.log(`     C1 (chỉ là nhánh DỰ BỊ) ${gC1.toFixed(0)} giờ.`);
  // Nguyên nhân ĐO ĐƯỢC, không phải phỏng đoán: bộ giáo trình Oxford có tập
  // cho B1 và tập cho C1, không có tập nào rơi vào B2.
  const sachTheoBac = new Map();
  for (const b of bac) {
    const s = new Set((b.milestones || []).filter((m) => m.type === 'oxford').map((m) => m.bookId));
    if (s.size) sachTheoBac.set(b.level, [...s].join(', '));
  }
  console.log('     NGUYÊN NHÂN — giáo trình Oxford xếp theo bậc:');
  for (const lv of ROADMAP_BANDS) {
    in2(`       ${lv} (${CEFR_OF_BAND[lv]})`, sachTheoBac.get(lv) || '— KHÔNG CÓ TẬP NÀO —');
  }
}

// ── 1b. ĐỀ NÓI / ĐỀ VIẾT PHỦ TỚI ĐÂU ───────────────────────────────────────
// Gọi ĐÚNG hàm tra mà giao diện gọi, áp ĐÚNG cửa bậc mà giao diện áp. Xem khối
// cảnh báo đầu file để biết vì sao chỗ này không được đếm bằng cách khác.
const { deChoChang } = await nap('src/utils/writingBank.js');
const { deNoiChoChang } = await nap('src/utils/speakingBank.js');
const { COD_DE_VIET, COD_DE_NOI } = await nap('src/utils/bandCoDe.js');

console.log('\n═══ 1b. CHẶNG NÀO CÓ ĐỀ VIẾT / ĐỀ NÓI ═══');
console.log('  (đề gắn vào TỪNG CHẶNG, hiện thành nút "✍️ VIẾT VỀ CHẶNG NÀY" và');
console.log('   "🗣️ NÓI VỀ CHẶNG NÀY" ngay trên thẻ chặng — không phải chặng riêng)\n');
in2(`${'bậc'.padEnd(20)}CEFR`, `${'chặng'.padStart(6)}${'có đề viết'.padStart(16)}${'có đề nói'.padStart(16)}`);
const thieu = [];
for (const b of bac) {
  const ms = b.milestones || [];
  const moViet = COD_DE_VIET.has(b.level);
  const moNoi = COD_DE_NOI.has(b.level);
  const v = moViet ? ms.filter((m) => deChoChang(m)).length : 0;
  const n = moNoi ? ms.filter((m) => deNoiChoChang(m)).length : 0;
  const oV = moViet ? `${v} (${Math.round((v * 100) / (ms.length || 1))}%)` : 'cố ý không mở';
  const oN = moNoi ? `${n} (${Math.round((n * 100) / (ms.length || 1))}%)` : 'cố ý không mở';
  in2(`${String(b.level).padEnd(20)}${CEFR_OF_BAND[b.level] || '?'}`,
    `${String(ms.length).padStart(6)}${oV.padStart(16)}${oN.padStart(16)}`);
  // Bậc đã mở cửa mà tra không ra đề thì phải GỌI TÊN chặng đó ra, không được
  // chỉ in phần trăm rồi thôi — 99% che được đúng cái 1% đang hỏng.
  for (const m of ms) {
    const kv = moViet && !deChoChang(m);
    const kn = moNoi && !deNoiChoChang(m);
    if (kv || kn) thieu.push(`${b.level} · ${m.type} · ${(m.title || m.targetId)} — thiếu ${[kv && 'viết', kn && 'nói'].filter(Boolean).join(' + ')}`);
  }
}
console.log('');
console.log('  A0/A1 không có đề viết và A0–A2 không có đề nói theo chủ đề là CỐ Ý: ở');
console.log('  mức đó người học dùng mục ĐỌC TO TỪNG TỪ (Luyện Phát Âm, và bước');
console.log('  "🗣️ Đọc To Từ" có trong mỗi chặng từ vựng). Panel nói thẳng lý do đó');
console.log('  chứ không im lặng thiếu.');
if (thieu.length) {
  console.log('');
  console.log('  CHẶNG LẺ KHÔNG CÓ ĐỀ — gọi tên ra, không giấu sau con số 99%:');
  for (const d of thieu) console.log(`     · ${d}`);
  console.log('');
  console.log('  Hai lý do đã biết, và cả hai đều chính đáng:');
  console.log('    · Oxford Unit 26 dạy HẬU TỐ (-ful/-less/-ness) nên không đặt được đề');
  console.log('      "dùng từ" — trường hợp này đã ghi sẵn trong src/utils/bandCoDe.js.');
  console.log('    · Buổi CHÉP CHÍNH TẢ tự nó đã là bài nghe + viết, gắn thêm một đề');
  console.log('      viết/nói nữa lên trên là thừa.');
  console.log('  Panel BÁO RA khi mở trúng chặng này, không đưa đề của chặng khác.');
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
const { SO_DE_THEO_CHANG } = await nap('src/data/writingCounts.js');
const { SO_DE_NOI_THEO_CHANG } = await nap('src/data/speakingCounts.js');

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
in2('  đề nói gắn theo chặng', `${SO_DE_NOI_THEO_CHANG}`);
in2('  có màn luyện nói', noi ? 'CÓ' : 'KHÔNG');
in2('  cách nhận đầu vào', /SpeechRecognition|webkitSpeech/.test(noi)
  ? 'nhận dạng giọng nói của TRÌNH DUYỆT → ra BẢN CHỮ' : 'không rõ');
in2('  chấm PHÁT ÂM', /pronunciation|phát âm/i.test(aiCore) && !/KHÔNG.*phát âm/i.test(aiCore)
  ? 'có' : 'KHÔNG — mô hình chỉ đọc chữ, không nghe được âm thanh');
in2('  chấm nội dung/ngữ pháp lượt nói', /mode === 'speaking'/.test(aiCore) ? 'CÓ (qua AI, key của người học)' : 'không');

console.log('\n  VIẾT');
in2('  đề viết gắn theo chặng', `${SO_DE_THEO_CHANG}`);
in2('  có màn luyện viết', viet ? 'CÓ' : 'KHÔNG');
in2('  chấm bài', /mode === 'writing'/.test(aiCore) ? 'CÓ (qua AI, key của người học)' : 'không');

// ── 3. ĐIỀU KIỆN NGẦM CỦA HAI KỸ NĂNG SẢN XUẤT ──────────────────────────────
console.log('\n═══ 3. ĐIỀU KIỆN NGẦM — chỗ lời hứa dễ vỡ nhất ═══');
in2('nói & viết CHẤM được bằng gì', 'API key Gemini của CHÍNH người học');
in2('không có key thì sao', 'vẫn có ĐỀ và checklist, nhưng KHÔNG có phản hồi chấm');
in2('=> "chấm 4 kỹ năng" đúng với ai', 'chỉ đúng với người học ĐÃ tự lấy key Google');
in2('phát âm', 'KHÔNG chấm được ở mức nào — đã nói thẳng trong giao diện');

console.log('\n═══ ĐỌC KẾT QUẢ NÀY THẾ NÀO ═══');
console.log('  Số chặng KHÔNG trả lời được câu "tốt 4 kỹ năng chưa", và số chặng cũng');
console.log('  KHÔNG trả lời được câu "đủ tới B2 chưa" — cả hai phải đo bằng thứ khác:');
console.log('  câu trên đo bằng ĐỘ PHỦ ĐỀ cộng với CÓ CHẤM ĐƯỢC KHÔNG, câu dưới đo');
console.log('  bằng GIỜ CỘNG DỒN. Đọc và nghe là NHẬN VÀO — chấm bằng trắc nghiệm là');
console.log('  đủ. Nói và viết là SẢN XUẤT — đề phủ gần trọn, nhưng phần CHẤM dựa vào');
console.log('  key AI của chính người học, và phát âm thì không chấm được.');
