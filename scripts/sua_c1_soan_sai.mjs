// File: scripts/sua_c1_soan_sai.mjs
//
//   node scripts/sua_c1_soan_sai.mjs --ghi
//
// SỬA CÁC CÂU TÔI TỰ SOẠN SAI TRONG ĐỢT BÙ BÀI TẬP C1 (31/08).
//
// ══ VÌ SAO CẦN FILE NÀY ══
// `tests/bai_tap_lam_duoc.test.js` chỉ kiểm CẤU TRÚC: từ sai khác từ sửa, từ
// sai có trong câu, không còn câu giữ chỗ. Nó KHÔNG kiểm được tiếng Anh dạy có
// ĐÚNG không — y hệt `check_dictation_audio` kiểm được tệp có thật, đúng dung
// lượng, đọc được khung MPEG, nhưng không kiểm được giọng có rõ không.
//
// Đọc lại 208 câu vừa soạn thì thấy 7 câu hỏng, chia hai loại:
//
//   A. DẠY MỘT LỖI KHÔNG PHẢI LỖI — câu gốc vốn đã đúng tiếng Anh:
//      · "He can't have been at home…" — `can't have been` là chuẩn, không sai.
//      · "The children asleep, the house was very quiet." — cấu trúc tuyệt đối
//        được phép lược `being`; câu này đúng.
//
//   B. SỬA XONG VẪN SAI hoặc lời giải thích nói sai:
//      · "Whereas … but …" thay `but` bằng `whereas` ra "Whereas… whereas…".
//      · "a interesting old wooden Chinese box" — sửa `a`→`an` là đúng, nhưng
//        lời giải thích khẳng định trật tự tính từ ĐÃ ĐÚNG. Sai: xuất xứ đứng
//        trước chất liệu ("Chinese wooden"), không phải ngược lại.
//      · "The house has been built since last year." — không tự nhiên; việc
//        đang diễn ra thì nói "has been under construction".
//      · "She gave a barrage of criticism" — `barrage` không đi với `give`.
//      · "She was a beautiful old Italian silk dress." — câu vô nghĩa, lỗi là
//        thiếu động từ chứ không phải chuyện tính từ, lạc đề bài.
//
// Ghi thẳng vào src/data/grammarDataC1C2.js VÀ vào tệp soạn tay tương ứng, để
// hai nơi không lệch nhau.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const GHI = process.argv.includes('--ghi');
const DUONG = 'src/data/grammarDataC1C2.js';

/** [câu cũ] -> mục thay thế đầy đủ. */
const THAY = new Map([
  ['He can\'t have been at home, I saw him at the office.', {
    sentence: 'He must have been at home, but I saw him at the office an hour ago.',
    errorWord: 'must have been',
    correction: "can't have been",
    explanation: 'Có bằng chứng ngược lại thì dùng suy đoán PHỦ ĐỊNH chắc chắn "can\'t have + V3", không dùng "must have".',
    trans: 'Anh ấy không thể ở nhà được, tôi vừa thấy anh ấy ở văn phòng một tiếng trước.',
  }],
  ['The children asleep, the house was very quiet.', {
    sentence: 'The children were asleep, the house was very quiet.',
    errorWord: 'were',
    correction: 'being',
    explanation: 'Hai mệnh đề nối bằng dấu phẩy thì mệnh đề đầu phải chuyển thành cấu trúc tuyệt đối: "The children being asleep, …".',
    trans: 'Lũ trẻ đã ngủ, ngôi nhà rất yên tĩnh.',
  }],
  ['Whereas the first plan failed, but the second succeeded.', {
    sentence: 'Although the first plan failed, but the second succeeded.',
    errorWord: 'but',
    correction: 'yet',
    explanation: 'Không dùng "although" cùng "but". Bỏ "although" rồi nối bằng "yet": "The first plan failed, yet the second succeeded."',
    trans: 'Kế hoạch đầu thất bại, nhưng kế hoạch thứ hai thành công.',
  }],
  ['It is a interesting old wooden Chinese box.', {
    sentence: 'It is an interesting old wooden Chinese box.',
    errorWord: 'wooden Chinese',
    correction: 'Chinese wooden',
    explanation: 'Trật tự tính từ: ý kiến → tuổi → XUẤT XỨ → chất liệu. "Chinese" đứng trước "wooden".',
    trans: 'Đó là một chiếc hộp gỗ Trung Quốc cổ thú vị.',
  }],
  ['She was a beautiful old Italian silk dress.', {
    sentence: 'She wore a silk Italian beautiful old dress.',
    errorWord: 'silk Italian beautiful old',
    correction: 'beautiful old Italian silk',
    explanation: 'Trật tự tính từ: ý kiến (beautiful) → tuổi (old) → xuất xứ (Italian) → chất liệu (silk).',
    trans: 'Cô ấy mặc một chiếc váy lụa Ý cũ rất đẹp.',
  }],
  ['The house is being built since last year.', {
    sentence: 'The house is being under construction since last year.',
    errorWord: 'is being',
    correction: 'has been',
    explanation: '"Since last year" đòi thì hoàn thành: "has been under construction".',
    trans: 'Ngôi nhà đang được xây từ năm ngoái.',
  }],
  ['She gave a heavy rain of criticism at the meeting.', {
    sentence: 'She gave a barrage of criticism at the meeting.',
    errorWord: 'gave',
    correction: 'levelled',
    explanation: 'Với "a barrage of criticism", động từ đi kèm là "level" (levelled), không phải "give".',
    trans: 'Cô ấy đưa ra hàng loạt lời phê bình trong cuộc họp.',
  }],
]);

const chuan = (v) => String(v ?? '').trim();

// ── 1. Ghi vào tệp soạn tay ────────────────────────────────────────────────
let doiJson = 0;
for (const ten of readdirSync('scripts/data').filter((f) => /^c1_bai_tap.*\.json$/.test(f))) {
  const duong = `scripts/data/${ten}`;
  const d = JSON.parse(readFileSync(duong, 'utf8'));
  let doi = false;
  for (const [k, v] of Object.entries(d)) {
    if (k.startsWith('_')) continue;
    v.errorCorrection = (v.errorCorrection || []).map((e) => {
      const moi = THAY.get(chuan(e.sentence));
      if (!moi) return e;
      doi = true; doiJson += 1;
      return moi;
    });
  }
  if (doi && GHI) writeFileSync(duong, `${JSON.stringify(d, null, 2)}\n`, 'utf8');
}

// ── 2. Ghi vào dữ liệu chạy thật ───────────────────────────────────────────
const { grammarDataC1C2 } = await import('../src/data/grammarDataC1C2.js');
let doiData = 0;
const moiData = grammarDataC1C2.map((bai) => ({
  ...bai,
  errorCorrection: (bai.errorCorrection || []).map((e) => {
    const m = THAY.get(chuan(e.sentence));
    if (!m) return e;
    doiData += 1;
    return m;
  }),
}));

console.log(`thay ${doiJson} câu trong tệp soạn tay · ${doiData} câu trong dữ liệu chạy`);
const chuaThay = [...THAY.keys()].filter((c) => !grammarDataC1C2.some((b) => (b.errorCorrection || []).some((e) => chuan(e.sentence) === c)));
if (chuaThay.length) {
  console.log('KHÔNG TÌM THẤY trong dữ liệu:'); for (const c of chuaThay) console.log('  · ' + c);
  process.exit(1);
}
if (!GHI) { console.log('(chạy khan — thêm --ghi để ghi)'); process.exit(0); }

const dau = readFileSync(DUONG, 'utf8').split('export const grammarDataC1C2')[0];
writeFileSync(DUONG, `${dau}export const grammarDataC1C2 = ${JSON.stringify(moiData, null, 2)};\n`, 'utf8');
console.log(`đã ghi ${DUONG}`);
