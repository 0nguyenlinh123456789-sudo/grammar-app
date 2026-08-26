// File: scripts/build_roadmap.mjs
// SINH PHẦN LỘ TRÌNH CHƯA AI XẾP (KE_HOACH_B2.md việc 1.2 · 1.3 · 1.4 · 1.5).
//
// Bối cảnh đo được 2026-08-14: lộ trình 44 chặng chỉ dẫn qua 9% kho từ vựng
// (25/267 chủ đề), 24% ngữ pháp (19/78) và 0/260 unit Oxford. Tức là ~2/3 khối
// lượng nội dung đã có nằm ngoài mọi đường đi có hướng dẫn.
//
// NGUYÊN TẮC (theo luật GIỮ/XOÁ của dự án):
//   ✅ Bộ sinh này chỉ SẮP XẾP LẠI nội dung đã soạn tay — tiêu đề chặng lấy
//      NGUYÊN tiêu đề của chủ đề/unit, mô tả lấy nguyên mô tả có sẵn.
//   ❌ Không bịa tiêu đề, không bịa mô tả, không bịa cấp độ.
//   ❌ Không đụng 44 chặng soạn tay: gặp targetId đã có trong roadmapCurated
//      là bỏ qua, để bản viết tay thắng.
//
// SỐ GIỜ (việc 1.5) tính từ SỐ MỤC THẬT, không viết tay:
//   - 1 câu bài tập / 1 lượt học từ = 20 giây
//   - mỗi mục từ được học qua 4 chế độ ⇒ 4 lượt
//   - bài đọc: 200 từ = 6 phút
// Đổi giả định thì đổi hằng số ở đây, số giờ toàn lộ trình tự tính lại.
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { mocCuTiepTheo } from './lib/mocLoTrinh.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data');

const SEC_PER_ITEM = 20;
const MODES_PER_WORD = 4;
// Tốc độ đọc của người học, KHÔNG phải của người bản ngữ. Giữ dạng phân số hai
// vế thay vì một số thập phân vì công thức xuất ra cho người học phải đọc được
// ("200 từ trong 6 phút" hiểu ngay, "33,3 từ/phút" thì không).
const READ_WORDS = 200;
const READ_MINUTES = 6;
const READ_WPM = READ_WORDS / READ_MINUTES;
// Đọc một mục lý thuyết. Trước đây số 2 nằm rải ở hai chỗ (bài ngữ pháp và unit
// Oxford) dưới dạng `* 2` — sửa một chỗ quên chỗ kia là tổng giờ sai lặng lẽ.
const PHUT_MOI_MUC_LY_THUYET = 2;
// GIẢ ĐỊNH, không phải số đo: một bài nghe theo đoạn được nghe ít nhất hai lượt
// (một lượt nắm ý, một lượt bắt chi tiết để trả lời câu hỏi). Đổi con số này là
// đổi tổng giờ của toàn bộ chặng nghe — ghi ra đây để sửa được ở một chỗ.
const LAN_NGHE = 2;

// ---- Bậc: giữ NGUYÊN 5 id cũ + thêm 'foundation' ở đầu -----------------------
// Giữ id cũ để không ai mất tiến độ và để roadmapNav/placement không phải viết
// lại. Nhãn CEFR (việc 1.4) là trường `cefr` mới, ghi rõ trên từng chặng.
const BANDS = ['foundation', 'starter', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'];
const CEFR_OF = { foundation: 'A0', starter: 'A1', elementary: 'A2', intermediate: 'B1', upper_intermediate: 'B2', advanced: 'C1' };

// Cấp độ chủ đề từ vựng là chuỗi kiểu "A2-B1", "B2-C1". Lấy bậc THẤP NHẤT được
// nhắc tới — chủ đề "B2-C1" thì người B2 đã học được, xếp vào B2.
// ══ CHỦ ĐỀ TỪ VỰNG → BẬC: LUẬT "CẬN DƯỚI CỦA KHOẢNG" ══════════════════════
//
// Chủ đề từ vựng tự khai bậc bằng một chuỗi, và phần lớn là một KHOẢNG:
// "A1-A2", "A2-B1", "B1-B2", "B2-C1", "C1-C2". Thứ tự if bên dưới khớp cái
// thấp nhất trước, nên "A1-A2" vào A1 — tức là xếp vào CẬN DƯỚI.
//
// Đó là một quyết định, không phải một tai nạn: chủ đề trải hai bậc thì cho
// người học gặp NGAY KHI HỌ ĐỦ SỨC BẮT ĐẦU, còn phần khó hơn của chính chủ đề
// đó họ gặp lại lúc ôn. Ghi ra đây vì đọc trần dãy if thì không thấy luật.
//
// Đo được 20/08: bậc A1 có 37 chủ đề khai "A1" và 33 chủ đề khai "A1-A2".
// Nghĩa là A1 phủ rộng hơn A1 thuần, và số giờ của bậc (~138h) lớn hơn mốc
// tham chiếu CEFR cho riêng A1 (~90–100h). Đó là hệ quả THẲNG của luật cận
// dưới, không phải một lỗi xếp nhầm.
//
// ⚠️ BỎ GIÁ TRỊ MẶC ĐỊNH `return "intermediate"`.
// Chuỗi bậc không đọc được sẽ lặng lẽ rơi vào B1 — đúng cơ chế đã đẩy "There
// is/There are" xuống B1 và không ai biết suốt nhiều đợt. Nay nó NÉM.
function bandFromLevelString(s, tenChuDe = "?") {
  const t = String(s || '').toUpperCase();
  if (/A1/.test(t)) return 'starter';
  if (/A2/.test(t)) return 'elementary';
  if (/B1/.test(t)) return 'intermediate';
  if (/B2/.test(t)) return 'upper_intermediate';
  if (/C1|C2/.test(t)) return 'advanced';
  throw new Error(
    `Chủ đề "${tenChuDe}" khai bậc là "${s}" — không đọc ra bậc nào.\n`
    + 'Sửa trường `level` của chủ đề đó, đừng để nó rơi vào một bậc mặc định: '
    + 'rơi lặng lẽ vào một bậc chính là cách lỗi “A1 chỉ có 2 chặng ngữ pháp” đã sinh ra.',
  );
}

// ══ BẬC CỦA TỪNG CHUYÊN ĐỀ NGỮ PHÁP — SOẠN TAY THEO CEFR ══════════════════
//
// ĐÂY LÀ CHỖ ĐÃ HỎNG NẶNG NHẤT, VÀ NÓ HỎNG THEO KIỂU KHÔNG TEST NÀO BẮT ĐƯỢC.
//
// Luật cũ: `i < 14 ? A2 : B1` — bậc của một chuyên đề quyết định bằng VỊ TRÍ
// CỦA NÓ TRONG MẢNG, không phải bằng trình độ của chính nó. Hậu quả đo được:
//
//   · bậc A1 có ĐÚNG 2 chặng ngữ pháp (hiện tại đơn, hiện tại tiếp diễn) trên
//     tổng 73 chặng — 71 chặng còn lại đều là danh sách từ vựng;
//   · "There is/There are", "Đại từ & Sở hữu", "Câu Hỏi", "Have got", "Mệnh
//     lệnh" — toàn bộ là ngữ pháp A1 — bị đẩy xuống bậc B1, chỉ vì chúng đứng
//     ở vị trí 17, 20, 23, 21, 19 trong file;
//   · người mất gốc đi hết 134 GIỜ của bậc A1 vẫn không đặt nổi câu
//     "I am a student." — vì họ chưa được học đại từ, mạo từ, hay câu hỏi.
//
// Đó là lỗi trúng thẳng cam kết "từ mất gốc". Nên bậc nay lấy từ BẢNG DƯỚI:
// mỗi chuyên đề một dòng, xếp theo mô tả CEFR (Cambridge English Profile),
// không theo vị trí trong file. Ai không đồng ý thì sửa đúng dòng của nó và
// chạy lại — đó là lý do bảng này viết tay chứ không sinh ra.
//
// Chuyên đề KHÔNG có tên trong bảng sẽ ném lỗi chứ không rơi vào một bậc mặc
// định: một chuyên đề mới lặng lẽ rơi vào B1 chính là cách lỗi trên sinh ra.
const BAC_CUA_CHUYEN_DE = {
  // ── A1: đủ để ĐẶT ĐƯỢC CÂU ĐẦU TIÊN ─────────────────────────────────────
  a1_be: 'starter',        // TO BE — không có cái này thì không có câu nào
  a1_plural: 'starter',    // danh từ số nhiều
  a1_this: 'starter',      // this / that / these / those
  b1_01: 'starter',        // Hiện Tại Đơn
  b1_02: 'starter',        // Hiện Tại Tiếp Diễn
  b1_08: 'starter',        // Mạo Từ a/an/the — A1 theo English Profile
  b1_12: 'starter',        // Giới từ Nơi chốn in/on/at
  b1_17: 'starter',        // There is / There are
  b1_19: 'starter',        // Câu Mệnh Lệnh & Cảm Thán
  b1_20: 'starter',        // Đại từ & Sở hữu
  b1_21: 'starter',        // Have got / Have
  b1_23: 'starter',        // Câu Hỏi & Từ để hỏi

  // ── A2 ──────────────────────────────────────────────────────────────────
  b1_03: 'elementary',     // Hiện Tại Đơn vs Tiếp Diễn
  b1_04: 'elementary',     // Quá Khứ Đơn
  b1_05: 'elementary',     // Quá Khứ Tiếp Diễn
  b1_07: 'elementary',     // Will vs Going to
  b1_09: 'elementary',     // Đếm được & Không đếm được
  b1_10: 'elementary',     // Some/Any/Much/Many
  b1_11: 'elementary',     // Giới từ Thời gian
  b1_13: 'elementary',     // Tính từ & Trạng từ
  b1_14: 'elementary',     // So sánh Hơn & Nhất
  b1_15: 'elementary',     // Can/Could/Be able to
  b1_16: 'elementary',     // Must/Have to/Should
  b1_18: 'elementary',     // Liên từ Cơ bản
  b1_22: 'elementary',     // Too & Enough
  b1_24: 'elementary',     // Used to
  b1_25: 'elementary',     // Trật tự Từ trong Câu
  b1_26: 'elementary',     // Phrasal Verbs Cơ Bản

  // ── B1 ──────────────────────────────────────────────────────────────────
  // Bị động, tường thuật, mệnh đề quan hệ, điều kiện 0/1/2, gerund-infinitive
  // đều là NGỮ PHÁP B1 theo mô tả CEFR, dù chúng nằm trong file tên "B2".
  // Tên file là chuyện của bộ giáo trình gốc, không phải của thang CEFR.
  b1_06: 'intermediate',   // Hiện Tại Hoàn Thành
  b1_27: 'intermediate',   // Câu Hỏi Gián Tiếp
  b1_28: 'intermediate',   // Both/Either/Neither
  b2_01: 'intermediate',   // Hiện Tại Hoàn Thành Tiếp Diễn
  b2_02: 'intermediate',   // Quá Khứ Hoàn Thành
  b2_03: 'intermediate',   // Câu Bị Động
  b2_04: 'intermediate',   // Câu Tường Thuật
  b2_05: 'intermediate',   // Mệnh Đề Quan Hệ
  b2_06: 'intermediate',   // Câu Điều Kiện 0/1/2/3
  b2_08: 'intermediate',   // Gerund vs Infinitive
  b2_09: 'intermediate',   // Phrasal Verbs Thông Dụng

  // ── B2 ──────────────────────────────────────────────────────────────────
  b2_07: 'upper_intermediate',   // Wish / If only
  b2_10: 'upper_intermediate',   // Modal Verbs Nâng Cao
  b2_11: 'upper_intermediate',   // Mạo từ (ôn nâng cao)
  b2_12: 'upper_intermediate',   // Giới từ Nâng cao
  b2_13: 'upper_intermediate',   // Liên từ Nâng cao
  b2_14: 'upper_intermediate',   // Câu Hỏi Đuôi
  b2_15: 'upper_intermediate',   // Đảo Ngữ
  b2_16: 'upper_intermediate',   // Causative
  b2_17: 'upper_intermediate',   // Câu Chẻ
  b2_18: 'upper_intermediate',   // Phân từ
  b2_19: 'upper_intermediate',   // Hoà hợp Chủ-Vị
  b2_20: 'upper_intermediate',   // Câu Giả Định
  b2_21: 'upper_intermediate',   // Từ Tạo Từ
  b2_22: 'upper_intermediate',   // Collocations Quan Trọng
  b2_23: 'upper_intermediate',   // Đại từ Quan hệ Nâng cao
  b2_24: 'upper_intermediate',   // So sánh Nâng cao
  b2_25: 'upper_intermediate',   // Tổng ôn Thì & Chia Động từ
};

// 25 chuyên đề C1+ giữ nguyên ở nhánh dự bị — không cần liệt kê từng dòng vì
// cả bộ đi cùng một chỗ, và đó là một quyết định chứ không phải một giá trị
// mặc định lặng lẽ.
// Mô tả riêng cho từng chặng A0 — xem ghi chú ở chỗ dùng.
const MO_TA_A0 = {
  a0_01: '26 chữ cái, và vì sao TÊN chữ khác ÂM chữ. Học xong: đánh vần được tên mình và đọc được một từ lạ theo từng chữ.',
  a0_02: 'Ký hiệu phiên âm IPA — thứ nằm cạnh MỌI mục từ trong app này. Không đọc được nó thì 22.000 mục từ phía trước chỉ còn là chữ viết.',
  a0_03: 'Năm nguyên âm ngắn /ɪ e æ ʌ ʊ/. Học xong: phân biệt được ship với sheep, cat với cut.',
  a0_04: 'Nguyên âm dài và nguyên âm đôi. Đây là chỗ người Việt hay đọc cụt: "go" thành "gô", "day" thành "đê".',
  a0_05: 'Hai âm TH — /θ/ trong think và /ð/ trong this. Tiếng Việt không có hai âm này, nên phải tập riêng.',
  a0_06: 'Âm cuối. Người Việt quen nuốt âm cuối, và đó là lý do số một khiến người nghe không hiểu: "like" thành "lai", "cats" thành "cát".',
  a0_07: 'Đuôi -s/-es đọc thành ba kiểu khác nhau (/s/ /z/ /ɪz/). Cần trước khi học danh từ số nhiều và hiện tại đơn.',
  a0_08: 'Đuôi -ed đọc thành ba kiểu (/t/ /d/ /ɪd/). Cần trước khi học thì quá khứ.',
  a0_09: 'Trọng âm từ. Đặt sai trọng âm thì người nghe hiểu ra một từ khác, dù đọc đúng từng âm.',
  a0_10: 'Nhịp câu và ngữ điệu — vì sao tiếng Anh nghe "trôi" chứ không rời từng chữ như tiếng Việt.',
  a0_11: 'Nối âm. Đây là lý do một câu bạn đọc hiểu dễ dàng lại nghe không ra: "an apple" phát ra thành "a-napple".',
  a0_12: 'Số đếm, ngày tháng, giờ giấc và cách đọc chúng — dùng ngay từ chặng từ vựng đầu tiên.',
};

/** Mô tả một chặng ngữ pháp bằng chính đầu đề mục lý thuyết đầu tiên. */
function moTaNguPhap(t) {
  const dau = ((t.theory || [])[0] || {}).h || '';
  const y = String(dau).replace(/^[IVX]+\.\s*/, '').trim();
  const soCau = (t.exercises || []).length + (t.fillBlanks || []).length
    + (t.errorCorrection || []).length + (t.transformation || []).length
    + (t.matching || []).length + (t.trueFalse || []).length;
  return y ? `${y} — và ${(t.theory || []).length} mục lý thuyết, ${soCau} câu bài tập.`
           : `Ngữ pháp · ${soCau} câu bài tập.`;
}

const BAC_C1 = 'advanced';

async function loadAgg(file, pick) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8')
    .replace(/from '\.\/([A-Za-z0-9_]+)'/g, "from './$1.js'");
  const tmp = path.join(DATA, `__tmp_rm_${file.replace(/\W/g, '_')}.mjs`);
  fs.writeFileSync(tmp, src);
  try { return pick(await import(pathToFileURL(tmp).href)); } finally { fs.rmSync(tmp, { force: true }); }
}

const cf = await import(pathToFileURL(path.join(ROOT, 'src/utils/contentFilter.js')).href);
const { locBaiHong } = await import(pathToFileURL(path.join(ROOT, 'src/utils/grammarClean.js')).href);
const topics = cf.sanitizeVocabTopics(await loadAgg('vocabVstepData.js', (m) => m.default));
const { foundationData } = await import(pathToFileURL(path.join(DATA, 'foundationData.js')).href);
const { grammarDataA1 } = await import(pathToFileURL(path.join(DATA, 'grammarDataA1.js')).href);
const { grammarDataB1 } = await import(pathToFileURL(path.join(DATA, 'grammarDataB1.js')).href);
const { grammarDataB2 } = await import(pathToFileURL(path.join(DATA, 'grammarDataB2.js')).href);
const { grammarDataC1C2 } = await import(pathToFileURL(path.join(DATA, 'grammarDataC1C2.js')).href);
const { grammarDataC1Nghia } = await import(pathToFileURL(path.join(DATA, 'grammarDataC1Nghia.js')).href);
const { roadmapCurated } = await import(pathToFileURL(path.join(DATA, 'roadmapCurated.js')).href);

const OXFORD = [
  { book: 'elementary', band: 'elementary', label: 'Oxford Elementary', parts: [['oxfordData.js', 'courseData'], ['oxfordDataPart2.js', 'courseData'], ['oxfordDataPart3.js', 'courseData']] },
  { book: 'pre_intermediate', band: 'intermediate', label: 'Oxford Pre-Intermediate', parts: [['oxfordPreIntData.js', 'courseData'], ['oxfordPreIntData51_75.js', 'courseData51_75'], ['oxfordPreIntData76_100.js', 'courseData76_100']] },
  { book: 'advanced', band: 'advanced', label: 'Oxford Advanced', parts: [['oxfordAdvancedData1_25.js', 'courseData1_25'], ['oxfordAdvancedData26_50.js', 'courseData26_50'], ['oxfordAdvancedData51_75.js', 'courseData51_75'], ['oxfordAdvancedData76_100.js', 'courseData76_100']] },
];

// ---- Đã có chặng soạn tay cho targetId nào? ----------------------------------
const curatedTargets = new Set(roadmapCurated.flatMap((l) => l.milestones.map((m) => m.targetId)));

// ---- Ước lượng phút cho từng loại -------------------------------------------
const minutesFromItems = (n) => Math.round((n * SEC_PER_ITEM) / 60);

function grammarMinutes(topicGoc) {
  // (5.2) Qua locBaiHong TRƯỚC khi đếm: 168 câu bài tập của nhánh C1 không làm
  // được và đã bị ẩn khỏi màn hình. Đếm cả chúng là khai khống số giờ học của
  // đúng cái nhánh vừa dọn.
  const t = locBaiHong(topicGoc);
  const items = (t.exercises || []).length + (t.fillBlanks || []).length + (t.errorCorrection || []).length
    + (t.transformation || []).length + (t.matching || []).length + (t.trueFalse || []).length
    + (t.sentenceGame || []).length;
  // Đọc lý thuyết: mỗi mục ~2 phút
  return minutesFromItems(items) + (t.theory || []).length * PHUT_MOI_MUC_LY_THUYET;
}
function vocabMinutes(t) {
  const words = (t.words || []).length;
  const readWords = String(t.storyEn || '').trim().split(/\s+/).filter(Boolean).length;
  return minutesFromItems(words * MODES_PER_WORD) + Math.round(readWords / READ_WPM);
}
// Unit Oxford không đồng hình: `dragDrop` và `theory` khi là mảng, khi là đối
// tượng (Elementary dùng object {coreVocab, practicalUsage, discoveryCorner}).
// Đếm mù quáng bằng .length trên object cho `undefined` → toàn bộ số giờ thành
// NaN mà không báo lỗi gì. Đếm có kiểm kiểu.
const countAny = (v) => {
  if (Array.isArray(v)) return v.reduce((s, e) => s + (Array.isArray(e) ? e.length : 1), 0);
  if (v && typeof v === 'object') return Object.values(v).reduce((s, x) => s + (Array.isArray(x) ? x.length : 1), 0);
  return 0;
};
function unitMinutes(u) {
  const d = u.dragDrop;
  const dd = Array.isArray(d) ? d.reduce((s, e) => s + ((e && (e.words || e.items)) || []).length, 0)
    : (d && typeof d === 'object' ? (d.words || d.items || []).length : 0);
  const items = (u.quiz || []).length + (u.typingGame || []).length + dd
    + (u.textbookExercises || []).reduce((s, e) => s + ((e && (e.questions || e.items || e.pairs)) || []).length, 0);
  const mins = minutesFromItems(items) + countAny(u.theory) * PHUT_MOI_MUC_LY_THUYET;
  if (!Number.isFinite(mins)) throw new Error(`unit ${u.id}: số phút không phải số — kiểm lại hình dạng dữ liệu`);
  return mins;
}

// ---- Dựng chặng --------------------------------------------------------------
const out = Object.fromEntries(BANDS.map((b) => [b, []]));
let bỏQua = 0;

// (1.1) Nền tảng A0 — mọi bài đều vào lộ trình, đứng trước tất cả
for (const t of foundationData) {
  if (curatedTargets.has(t.id)) { bỏQua++; continue; }
  // MỖI CHẶNG A0 PHẢI TỰ NÓI NÓ DẠY GÌ. Trước vòng kiểm 26/08 cả 12 chặng dùng
  // CHUNG một dòng "Bài nền tảng — học trước khi gặp bất kỳ mục từ nào." Người
  // mất gốc mở bậc đầu tiên và thấy 12 thẻ mô tả y hệt nhau thì không trả lời
  // được câu "vì sao tôi học cái này" ở bất kỳ thẻ nào.
  out.foundation.push({ type: 'grammar', targetId: t.id, title: t.title, desc: MO_TA_A0[t.id] || 'Bài nền tảng — học trước khi gặp bất kỳ mục từ nào.', minutes: grammarMinutes(t), cefr: 'A0' });
}

// (1.2a) Ngữ pháp
const thieuBac = [];
const bacCua = (t) => {
  const b = BAC_CUA_CHUYEN_DE[t.id];
  if (!b) { thieuBac.push(`${t.id} (${t.title})`); return null; }
  return b;
};
const grammarGroups = [
  ...grammarDataA1.map((t) => ({ t, band: bacCua(t) })),
  ...grammarDataB1.map((t) => ({ t, band: bacCua(t) })),
  ...grammarDataB2.map((t) => ({ t, band: bacCua(t) })),
  ...grammarDataC1C2.map((t) => ({ t, band: BAC_C1 })),
  // Hai bài "nghĩa không nằm trong chữ" — đề C1 hỏi, kho chưa dạy. Bậc C1
  // KHÔNG lấy từ bảng: cả file này chỉ có bài C1, xếp thẳng như grammarDataC1C2.
  ...grammarDataC1Nghia.map((t) => ({ t, band: BAC_C1 })),
];
if (thieuBac.length) {
  console.error(`\n❌ ${thieuBac.length} chuyên đề ngữ pháp KHÔNG có tên trong BAC_CUA_CHUYEN_DE:`);
  for (const x of thieuBac) console.error(`   · ${x}`);
  console.error('\nXếp bậc cho chúng rồi chạy lại. KHÔNG có bậc mặc định: rơi lặng lẽ vào');
  console.error('một bậc là đúng cách lỗi “A1 chỉ có 2 chặng ngữ pháp” đã sinh ra.');
  process.exit(1);
}
for (const { t, band } of grammarGroups) {
  if (curatedTargets.has(t.id)) { bỏQua++; continue; }
  // Mô tả cũ là `Ngữ pháp · N câu bài tập.` — đếm bài tập chứ không nói bài
  // DẠY GÌ, và ba chặng A1 có cùng 8 câu thì ra ba thẻ y hệt nhau. Lấy đầu đề
  // mục lý thuyết I làm câu mô tả: đó là chính người soạn nói bài này về gì.
  out[band].push({ type: 'grammar', targetId: t.id, title: t.title, desc: moTaNguPhap(t), minutes: grammarMinutes(t), cefr: CEFR_OF[band] });
}

// (1.2b) Từ vựng
for (const t of topics) {
  if (curatedTargets.has(t.id)) { bỏQua++; continue; }
  const band = bandFromLevelString(t.level, t.title || t.id);
  out[band].push({ type: 'vstep', targetId: t.id, title: t.title, desc: t.description || `${(t.words || []).length} từ vựng.`, minutes: vocabMinutes(t), cefr: CEFR_OF[band] });
}

// (1.3) Oxford — mỗi unit MỘT chặng (mô hình chặng chỉ mang được một targetId,
// gộp nhiều unit vào một chặng sẽ làm mất dấu tiến độ của các unit còn lại).
let oxfordCount = 0;
for (const { book, band, label, parts } of OXFORD) {
  let units = [];
  for (const [f, k] of parts) units = units.concat((await import(pathToFileURL(path.join(DATA, f)).href))[k] || []);
  for (const u of cf.sanitizeBook(units)) {
    if (curatedTargets.has(u.id)) { bỏQua++; continue; }
    // targetId GIỮ NGUYÊN KIỂU của dữ liệu gốc: sách Elementary đánh id bằng
    // SỐ (1–60), hai sách kia bằng chuỗi ('pre_1', 'adv_1'). Ép hết thành chuỗi
    // thì tra cứu unit hỏng và `oxfordUnitId` lưu trong localStorage lệch kiểu.
    // (Đã kiểm: 260 id là duy nhất trên cả ba sách, không có va chạm.)
    out[band].push({ type: 'oxford', targetId: u.id, bookId: book, title: u.title, desc: `${label} · ${u.description || 'Unit giáo trình'}`, minutes: unitMinutes(u), cefr: CEFR_OF[band] });
    oxfordCount++;
  }
}

// ---- (N4 b′) BÀI NGHE THEO ĐOẠN, BÀI ĐỌC DÀI, BUỔI CHÉP CHÍNH TẢ -------------
// Ba kho này soạn xong ở Đợt 3 và Đợt 6 nhưng KHÔNG có chặng nào dẫn tới: chỉ
// với tới được bằng nút trên trang chủ. Đó đúng là lỗi việc 1.3 sinh ra để chữa
// (260 unit Oxford nằm ngoài mọi đường đi), tái diễn ở kho thứ tư.
//
// CHỈ XẾP VÀO BA BẬC ≥B1. Bài của VOA Learning English là bài dạy tiếng Anh cho
// người đã đọc được câu; đưa vào A1/A2 là bắt người mất gốc nghe 4 phút liền.
// Người học A1/A2 vẫn có đường luyện nghe riêng (chép chính tả câu ngắn).
const BAC_TU_B1 = ['intermediate', 'upper_intermediate', 'advanced'];

// XẾP THEO SỐ TỪ ĐO ĐƯỢC, KHÔNG GÁN NHÃN CẤP ĐỘ CHO TỪNG BÀI.
// Gán "bài này là B1" cho một bài VOA là bịa một nhãn không ai kiểm được — đúng
// loại tuyên bố mà cả chuỗi này đang dọn. Số từ thì đo được: sắp tăng dần rồi
// chia ba phần đều, bài ngắn vào bậc thấp. Giao diện nói rõ là sắp theo độ dài.
function chiaBaBac(ds) {
  const sap = [...ds].sort((a, b) => (a.words || 0) - (b.words || 0) || String(a.id).localeCompare(String(b.id)));
  const moiPhan = Math.ceil(sap.length / BAC_TU_B1.length);
  return BAC_TU_B1.map((bac, i) => [bac, sap.slice(i * moiPhan, (i + 1) * moiPhan)]);
}

const { listeningPassages } = await import(pathToFileURL(path.join(DATA, 'listeningPassages.js')).href);
const { readingTexts } = await import(pathToFileURL(path.join(DATA, 'readingTexts.js')).href);

let ngheCount = 0;
for (const [band, dsBai] of chiaBaBac(listeningPassages)) {
  for (const b of dsBai) {
    if (curatedTargets.has(b.id)) { bỏQua++; continue; }
    const phutNghe = Math.round((b.secondsEstimated / 60) * LAN_NGHE);
    out[band].push({
      type: 'listening', targetId: b.id, title: b.title,
      desc: `Nghe theo đoạn · ${b.series} · khoảng ${Math.round(b.secondsEstimated / 60)} phút · ${b.questions.length} câu hỏi soạn tay.`,
      minutes: phutNghe + minutesFromItems(b.questions.length), cefr: CEFR_OF[band],
    });
    ngheCount++;
  }
}

let docCount = 0;
for (const [band, dsBai] of chiaBaBac(readingTexts)) {
  for (const b of dsBai) {
    if (curatedTargets.has(b.id)) { bỏQua++; continue; }
    out[band].push({
      type: 'reading', targetId: b.id, title: b.title,
      desc: `Đọc bài dài · ${b.words} từ · ${b.questions.length} câu hỏi soạn tay.`,
      minutes: Math.round(b.words / READ_WPM) + minutesFromItems(b.questions.length), cefr: CEFR_OF[band],
    });
    docCount++;
  }
}

// Chép chính tả: MỘT chặng mỗi bậc, không phải 239 chặng. Kho 239 bản thu là
// một KHO DÙNG CHUNG chia theo độ dài câu, không phải 239 bài học — mỗi phiên
// bốc 5 câu (SO_CAU trong DictationPanel). `targetId` là id của BUỔI HỌC, không
// phải id của bản thu nào; DictationPanel tự chọn nhóm độ dài theo bậc.
const SO_CAU_MOI_BUOI = 5;
// Chép chính tả tốn hơn một lượt/câu: nghe, chép, nghe lại soát. Số 3 này trước
// đây là một số trần trong `SO_CAU_MOI_BUOI * 3` không có tên — đặt tên vì công
// thức giờ đã hiện ra cho người học, và một số không tên thì không giải thích được.
const LUOT_MOI_CAU_CHINH_TA = 3;
// ══ BẬC NÀO CÓ MẤY BUỔI CHÉP CHÍNH TẢ ═════════════════════════════════════
//
// LỖ ĐÃ ĐO ĐƯỢC: bậc A1 và A2 có ĐÚNG 0 chặng nghe. Cả 60 bài nghe theo đoạn
// là VOA Learning English — nội dung B1 trở lên, xếp cho ba bậc trên là đúng.
// Nhưng buổi chép chính tả thì dùng câu Tatoeba 4–6 TỪ, và `listeningPlan.js`
// đã có sẵn ánh xạ starter/elementary → nhóm 'ngan'/'vua'. Nó bị chặn ở bậc B1
// chỉ vì dùng chung đúng một biến `BAC_TU_B1` với bài nghe theo đoạn.
//
// Hậu quả: `exam-a1` và `exam-a2` mỗi đề có 6 CÂU NGHE, trong khi lộ trình hai
// bậc đó không dạy nghe một phút nào. Đó là thi thứ không dạy.
//
// A1/A2 nhận NHIỀU buổi hơn ba bậc trên, và đó không phải bất đối xứng tuỳ
// tiện: ba bậc trên đã có thêm 20 chặng nghe theo đoạn mỗi bậc, còn ở A1/A2
// thì chép chính tả là TOÀN BỘ phần nghe. Kho có 97 câu ngắn và 98 câu vừa,
// nên 3 buổi × 5 câu mỗi bậc vẫn lấy từ kho thật, không lặp lại câu.
//
// A0 cố ý KHÔNG có: bậc đó đang học đọc bảng chữ cái và phiên âm, chưa viết
// nổi một câu để mà chép.
const SO_BUOI_CHINH_TA = { starter: 3, elementary: 3, intermediate: 1, upper_intermediate: 1, advanced: 1 };
for (const [band, soBuoi] of Object.entries(SO_BUOI_CHINH_TA)) {
  for (let i = 1; i <= soBuoi; i += 1) {
    // Khai `bandId` TƯỜNG MINH thay vì để màn hình suy từ `cefr`. `nhomChoBac()`
    // nhận id bậc lộ trình ('intermediate'), không nhận nhãn CEFR ('B1') — truyền
    // sai kiểu thì nó KHÔNG báo lỗi, nó trả về 'vua' mặc định và buổi học lặng lẽ
    // chạy sai nhóm độ dài. Khai thẳng ra là biết, suy ra là đoán.
    //
    // `targetId` của buổi ĐẦU giữ nguyên dạng cũ `dictation-<band>` để không ai
    // mất tiến độ đã có; buổi thứ hai trở đi mới thêm số.
    out[band].push({
      type: 'dictation',
      targetId: i === 1 ? `dictation-${band}` : `dictation-${band}-${i}`,
      bandId: band,
      title: soBuoi > 1 ? `Buổi nghe chép chính tả ${i}/${soBuoi}` : 'Buổi nghe chép chính tả',
      desc: `Nghe giọng người thật, chép lại ${SO_CAU_MOI_BUOI} câu. Kho dùng chung, chia theo độ dài câu.`,
      minutes: minutesFromItems(SO_CAU_MOI_BUOI * LUOT_MOI_CAU_CHINH_TA), cefr: CEFR_OF[band],
    });
  }
}

// ---- (5.2) XEN KẼ LOẠI CHẶNG TRONG MỖI BẬC -----------------------------------
// Vòng lặp ở trên đẩy chặng theo KHỐI: hết ngữ pháp mới tới từ vựng, hết từ
// vựng mới tới Oxford. Giao diện vẽ mỗi bậc thành MỘT danh sách thẳng và nút
// "Học Tiếp" lấy chặng chưa xong ĐẦU TIÊN — nên thứ tự này CHÍNH LÀ đường đi.
// Kết quả: nhánh C1 bắt người học làm 19 bài ngữ pháp liền, rồi 37 chủ đề từ
// vựng liền, rồi 100 unit Oxford liền. Đó là ba cái xô xếp chồng, không phải
// một lộ trình.
//
// Xen kẽ ĐỀU theo tỉ lệ: loại nào nhiều thì xuất hiện dày hơn, nhưng không loại
// nào bị dồn thành một khối. Đây thuần tuý SẮP XẾP LẠI — không thêm, không bớt,
// không sửa chặng nào. Tiến độ khoá theo `targetId` (xem App.jsx
// `completeMilestone`) nên đổi thứ tự KHÔNG làm ai mất tiến độ.
function xenKe(ds) {
  const nhom = new Map();
  for (const m of ds) {
    if (!nhom.has(m.type)) nhom.set(m.type, []);
    nhom.get(m.type).push(m);
  }
  if (nhom.size < 2) return ds;
  const tong = ds.length;
  const xep = [];
  for (const [, muc] of nhom) {
    const buoc = tong / muc.length;
    muc.forEach((m, i) => xep.push({ m, viTri: (i + 0.5) * buoc }));
  }
  return xep.sort((a, b) => a.viTri - b.viTri).map((x) => x.m);
}
for (const band of BANDS) out[band] = xenKe(out[band]);

// ---- Số phút cho 44 chặng SOẠN TAY ------------------------------------------
// Bản soạn tay ghi giờ bằng chữ trong mô tả ("🕐 ~4 giờ") — con số viết tay,
// không ai kiểm. Đo lại từ chính nội dung để tổng giờ lộ trình là số thật
// (việc 1.5), nhưng KHÔNG sửa chữ trong mô tả của người soạn.
const topicById = new Map(topics.map((t) => [t.id, t]));
const grammarById = new Map([...foundationData, ...grammarDataA1, ...grammarDataB1, ...grammarDataB2, ...grammarDataC1C2, ...grammarDataC1Nghia].map((t) => [t.id, t]));
const unitById = new Map();
for (const { parts } of OXFORD) {
  let units = [];
  for (const [f, k] of parts) units = units.concat((await import(pathToFileURL(path.join(DATA, f)).href))[k] || []);
  for (const u of cf.sanitizeBook(units)) unitById.set(u.id, u);
}
const curatedMinutes = {};
for (const l of roadmapCurated) {
  for (const m of l.milestones) {
    const g = grammarById.get(m.targetId);
    const v = topicById.get(m.targetId);
    const u = unitById.get(m.targetId);
    curatedMinutes[m.targetId] = g ? grammarMinutes(g) : v ? vocabMinutes(v) : u ? unitMinutes(u) : 0;
  }
}
const thiếuNộiDung = Object.entries(curatedMinutes).filter(([, v]) => v === 0).map(([k]) => k);

// ---- Ghi file ----------------------------------------------------------------
const esc = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').trim();
let body = '';
for (const band of BANDS) {
  body += `  ${band}: [\n`;
  for (const m of out[band]) {
    // Số thì ghi ra số, chuỗi thì ghi ra chuỗi — không ép kiểu.
    const tid = typeof m.targetId === 'number' ? String(m.targetId) : `'${esc(m.targetId)}'`;
    const book = m.bookId ? `, bookId: '${esc(m.bookId)}'` : '';
    const bandId = m.bandId ? `, bandId: '${esc(m.bandId)}'` : '';
    body += `    { type: '${m.type}', targetId: ${tid}${book}${bandId}, title: '${esc(m.title)}', desc: '${esc(m.desc)}', minutes: ${m.minutes}, cefr: '${m.cefr}' },\n`;
  }
  body += '  ],\n';
}

const total = BANDS.reduce((s, b) => s + out[b].length, 0);
const totalMin = BANDS.reduce((s, b) => s + out[b].reduce((x, m) => x + m.minutes, 0), 0);

const header = `// File: src/data/roadmapGenerated.js
// ⚠️ FILE NÀY DO MÁY SINH — đừng sửa tay, chạy lại:
//      node scripts/build_roadmap.mjs
//
// Chỉ chứa phần lộ trình CHƯA AI XẾP. 44 chặng soạn tay nằm ở roadmapCurated.js
// và luôn thắng: gặp targetId đã có ở đó, bộ sinh bỏ qua.
//
// Tiêu đề và mô tả lấy NGUYÊN từ chủ đề/unit gốc — bộ sinh chỉ sắp xếp, không
// viết nội dung mới. Số phút tính từ số mục thật (20 giây/mục, mỗi từ học qua
// 4 chế độ, bài đọc 200 từ/6 phút), không phải con số viết tay.
//
// Sinh lúc: ${total} chặng · ${Math.round(totalMin / 60)} giờ · bỏ qua ${bỏQua} targetId đã có bản soạn tay.

export const roadmapGenerated = {
`;

let curatedBody = '\n// Số phút ĐO ĐƯỢC của 44 chặng soạn tay (đo từ nội dung, không phải chữ viết\n// tay trong mô tả). Khoá theo targetId.\nexport const curatedMinutes = {\n';
for (const [k, v] of Object.entries(curatedMinutes)) curatedBody += `  '${esc(k)}': ${v},\n`;
curatedBody += '};\n';

fs.writeFileSync(path.join(DATA, 'roadmapGenerated.js'), header + body + '};\n' + curatedBody, 'utf8');

// ---- (5.2) File CHỈ CHỨA SỐ ĐẾM ----------------------------------------------
// Trang kích hoạt (AccessGate) cần nói "lộ trình N chặng" nhưng nó là màn hình
// ĐẦU TIÊN, trước khi vào app. Import roadmapData ở đó là kéo cả 617 chặng vào
// gói tải đầu — đúng cái lỗi đã đo được hai lần trước (trang chủ kéo
// listeningPassages 398 KB để hiện một con số). Một file, một con số.
const curatedTotal = roadmapCurated.reduce((s, l) => s + l.milestones.length, 0);
const soChang = BANDS.map((b) => [b, out[b].length + (roadmapCurated.find((l) => l.level === b)?.milestones.length || 0)]);

// TỔNG CỦA LẦN SINH TRƯỚC — đọc từ chính file đang sắp bị ghi đè.
// Lý do phải giữ con số này: mẫu số của thanh tiến độ là tổng số chặng
// (WelcomePage tính completedCount / allMilestones.length). Thêm chặng là làm
// tỉ lệ của MỌI người học đang dùng tụt xuống — họ không làm gì sai mà con số
// xấu đi. Muốn báo cho họ biết thì phải biết con số CŨ, và chỗ duy nhất còn giữ
// nó là file cũ. Không có file cũ (lần sinh đầu) thì để bằng tổng mới, tức
// "không có gì đổi".
const duongCounts = path.join(DATA, 'roadmapCounts.js');
const tongMoi = total + curatedTotal;
// ⚠️ LỖI ĐÃ DÍNH KHI SỬA VIỆC 1.5, ĐÃ SỬA NGAY: bản đầu chỉ đọc TONG_CHANG cũ,
// nên mỗi lần chạy lại bộ sinh mà tổng KHÔNG đổi (dọn hằng số, sửa chú thích)
// đều đặt tongTruoc = tongMoi và **xoá sạch lời báo lộ trình vừa tăng**. Luật
// đã tách sang scripts/lib/mocLoTrinh.mjs để test gọi được vào đúng nó.
let noiDungCu = null;
try { noiDungCu = fs.readFileSync(duongCounts, 'utf8'); } catch { /* lần sinh đầu */ }
const tongTruoc = mocCuTiepTheo(noiDungCu, tongMoi);

fs.writeFileSync(duongCounts, `// File: src/data/roadmapCounts.js
// ⚠️ MÁY SINH — chạy lại: node scripts/build_roadmap.mjs
// Chỉ chứa SỐ ĐẾM, để màn hình kích hoạt nói được con số thật mà không phải
// kéo cả lộ trình vào gói tải đầu.
export const TONG_CHANG = ${tongMoi};
// Tổng của lần sinh TRƯỚC, đọc từ file cũ trước khi ghi đè. Dùng để báo cho
// người học đang dùng biết mẫu số tiến độ vừa tăng — xem roadmapGrowth.js.
export const TONG_CHANG_TRUOC = ${tongTruoc};
export const CHANG_THEO_BAC = {
${soChang.map(([b, n]) => `  ${b}: ${n},`).join('\n')}
};
// (1.5) CÔNG THỨC sinh ra chính con số giờ ở trên — sinh RA ĐÂY thay vì để màn
// hình chép lại. Việc 1.5 hứa "ghi giờ ước lượng thật KÈM CÔNG THỨC", mà trước
// đây màn hình chỉ nói "ước lượng từ số bài thật": người học thấy 587 giờ và
// không có đường nào tự kiểm. Chép mấy hằng số này sang JSX là mở đường cho
// chúng lệch nhau — đúng lỗi hai bản sao "máy chỉ đếm được số từ" đã dính.
export const CONG_THUC_GIO = {
  giayMoiMuc: ${SEC_PER_ITEM},
  cheDoMoiTu: ${MODES_PER_WORD},
  docTu: ${READ_WORDS}, docPhut: ${READ_MINUTES},
  phutMoiMucLyThuyet: ${PHUT_MOI_MUC_LY_THUYET},
  lanNgheMoiBai: ${LAN_NGHE},
  cauMoiBuoiChinhTa: ${SO_CAU_MOI_BUOI}, luotMoiCauChinhTa: ${LUOT_MOI_CAU_CHINH_TA},
};
`, 'utf8');

console.log(`✅ roadmapGenerated.js: ${total} chặng, ~${Math.round(totalMin / 60)} giờ`);
if (thiếuNộiDung.length) console.log(`⚠ ${thiếuNộiDung.length} chặng soạn tay không tìm thấy nội dung: ${thiếuNộiDung.join(', ')}`);
for (const b of BANDS) {
  const mins = out[b].reduce((s, m) => s + m.minutes, 0);
  const kinds = out[b].reduce((a, m) => { a[m.type] = (a[m.type] || 0) + 1; return a; }, {});
  console.log(`   ${b.padEnd(20)} ${String(out[b].length).padStart(3)} chặng · ${String(Math.round(mins / 60)).padStart(3)} giờ · ${JSON.stringify(kinds)}`);
}
console.log(`   (bỏ qua ${bỏQua} targetId vì đã có chặng soạn tay; Oxford thêm mới ${oxfordCount})`);
console.log(`   (N4 b′: ${ngheCount} chặng nghe theo đoạn · ${docCount} chặng đọc dài · ${Object.values(SO_BUOI_CHINH_TA).reduce((s, n) => s + n, 0)} buổi chép chính tả (A1/A2 nhiều hơn vì đó là toàn bộ phần nghe của hai bậc đó))`);
