// File: tests/c1_branch.test.js
// GHIM VIỆC 5.2 — NHÁNH C1 DỰ BỊ.
//
// Cam kết của sản phẩm (KE_HOACH_B2.md): "mất gốc → B2 vững, làm nền cho C1".
// **Không hứa C2.** Nhưng chữ hứa vượt cam kết thì rải rác khắp nơi — trang bán
// hàng, tiêu đề bậc, nhãn kỳ thi, tên chủ đề — và mỗi chỗ là một bản chép tay.
// Sửa hết một lượt thì ba tháng nữa lại có chỗ mới mọc lên.
//
// Test này quét MỌI chuỗi hiện ra cho người học trong src/ và bắt lỗi chuỗi nào
// hứa C2 / IELTS Band 8 / TOEIC 900. Nó KHÔNG quét bình luận: bình luận giải
// thích "vì sao đã bỏ chữ C2" mà bị tính là vi phạm thì test tự đỏ vì chính lời
// giải thích của mình (đúng cái bẫy `speaking_bank.test.js` đã dính).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { roadmapData, BAND_TAB_LABEL, CEFR_OF_BAND, ROADMAP_BANDS, BAC_CAM_KET, BAC_DU_BI, LA_DU_BI } from '../src/data/roadmapData.js';
import { TONG_CHANG, CHANG_THEO_BAC } from '../src/data/roadmapCounts.js';
import { nhanCapDo, LA_NHAN_GOP } from '../src/utils/nhanCapDo.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

// Cụm IELTS Nền Tảng là phần chủ dự án tự dựng để học cá nhân, CẤM sửa — miễn
// trừ từ BÊN NGOÀI, nhận theo đường dẫn, y như milestone_gate.test.js làm.
const MIEN_TRU = [
  'src/pages/IeltsFoundationPage.jsx',
  'src/data/ieltsFoundationData.js',
  'src/data/ieltsPrepData.js',
  'src/data/ieltsAdvancedData.js',
  'src/data/ieltsRoadmap.js',
  'src/data/buildIeltsRoadmap.js',
  'src/utils/localOnly.js',
];

// Chuỗi hứa vượt đích cam kết. Mỗi mẫu kèm lý do — để người đọc sau biết vì sao
// mẫu đó nằm đây, và biết cãi lại nếu thấy sai.
const CAM = [
  [/\bC2\b/, 'C2 vượt cam kết: sản phẩm hứa B2 vững + nền C1'],
  [/C1\s*[-–\/]\s*C2/, 'nhãn gộp "C1-C2"/"C1/C2" hiện ra là hứa tới C2 — dùng "C1+"'],
  [/IELTS\s*(Academic\s*)?Band\s*8/i, 'Band 8 ≈ C2'],
  [/\bBand\s*7\s*[-–]\s*8\b/i, 'khoảng 7-8 chạm C2'],
  [/TOEIC\s*9\d\d/i, 'TOEIC 900+ tương ứng C1-C2, và app không có đề TOEIC nào'],
];

// TIẾT LỘ ≠ HỨA HẸN. Vài chuỗi PHẢI chứa chữ "C2" vì việc của chúng là nói cho
// người học biết ứng dụng KHÔNG đưa họ tới đó, hoặc bộ bài này chưa tách C1 với
// C2. Ghi TỪNG CHUỖI MỘT, khớp nguyên văn — không lọc theo mẫu. Lọc theo mẫu là
// đoán; kể tên ra là biết. Chuỗi ở đây đổi một chữ là test đỏ, đúng ý muốn.
const TIET_LO = new Map([
  ['"level": "C1/C2",',
    'src/data/grammarDataC1C2.js — TRƯỜNG DỮ LIỆU, không in ra: GrammarPage đi qua nhanCapDo() và hiện "C1+". Sửa 25 dòng này thành "C1" là nói dối theo chiều ngược lại — bộ bài đó thật sự có nội dung C2.'],
  ["description: 'Ngữ pháp chuyên sâu bậc trên B2 — bộ bài gộp chung C1 và C2, chưa tách'",
    'câu này TIẾT LỘ cho người học biết bộ bài chưa tách C1 với C2 — bỏ chữ C2 đi thì mất luôn điều cần nói.'],
  ["if (/C2/i.test(t)) return 'C1+';",
    'src/utils/nhanCapDo.js — CHÍNH bộ máy đổi nhãn. Không có dòng này thì không có "C1+".'],
  ["  'C1+ nghĩa là phần trên B2 — bộ bài này gộp chung C1 và C2, chưa tách ra. Ứng dụng cam kết đưa bạn tới B2 vững; phần này là nhánh dự bị đi thêm.';",
    'src/utils/nhanCapDo.js — chính là câu nói "chúng tôi không hứa C2".'],
  ["  levelDesc: 'Đi thêm sau khi đã vững B2. Ngữ pháp học thuật, đảo ngữ, idioms và collocations. Đây là phần NỀN cho C1 — không phải một khoá C1 đầy đủ, và ứng dụng không hứa đưa bạn tới C2.',",
    'mô tả bậc C1 — nói thẳng là không hứa C2.'],
]);

// ĐÃ ẨN LÚC ĐỌC ≠ HIỆN RA. Câu giữ chỗ lọt vào grammarDataC1C2.js vẫn nằm trong
// file, nhưng `locBaiHong()` lọc bỏ trước khi tới màn hình — `tests/
// grammar_exercises.test.js` ghim đúng chuyện đó. Không xoá khỏi dữ liệu vì
// luật của dự án là ẨN hoặc BÁO, không sửa nội dung soạn tay lặng lẽ.
const DA_AN = [
  'This is a C1/C2 level practice sentence.',
  'This is a C1/C2 level practice _____.',
  'Đây là câu luyện tập cấp C1/C2.',
];

// TRƯỜNG DỮ LIỆU KHÔNG IN RA — mỗi trường kèm bằng chứng vì sao dám bỏ qua.
// Cắt phần gán của các trường này khỏi dòng TRƯỚC khi dò, thay vì bỏ qua cả
// dòng: `level: "C1-C2", examTags: [...]` và một tiêu đề hiện ra có thể nằm
// chung một dòng, bỏ cả dòng là mở cửa cho lời hứa lọt qua.
const TRUONG_KHONG_IN = [
  // `level` đi qua nhanCapDo() ở GrammarPage và Flashcard — có test riêng dưới
  // ghim rằng không màn hình nào in thẳng nó.
  /(["']?level["']?\s*:\s*)(["'])[^"']*\2/g,
  // `examTags` không nơi nào đọc (trường ngủ — xem dormant_fields.test.js).
  /(["']?examTags["']?\s*:\s*)\[[^\]]*\]/g,
];
const catTruongNgu = (dong) => TRUONG_KHONG_IN.reduce((s, re) => s.replace(re, '$1…'), dong);

function boQua(dong) {
  for (const khoa of TIET_LO.keys()) if (dong.includes(khoa.trim())) return true;
  for (const k of DA_AN) if (dong.includes(k)) return true;
  return false;
}

// Đọc kèm loại mục (`withFileTypes`) thay vì readdir rồi statSync từng tên.
//
// Vài test khác dựng file `__tmp_*.mjs` tạm trong src/data để nạp được các file
// dữ liệu dùng import không đuôi, rồi xoá ngay. `node --test` chạy các file test
// SONG SONG, nên giữa lúc liệt kê và lúc statSync, một tên có thể đã biến mất →
// ENOENT, và test đỏ vì lý do không liên quan gì tới thứ nó đang kiểm. Không
// stat thì không có khe hở đó.
function liet(dir, ra = []) {
  for (const muc of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, muc.name);
    if (muc.isDirectory()) liet(full, ra);
    else if (/\.(js|jsx)$/.test(muc.name)) ra.push(full);
  }
  return ra;
}

// Bỏ bình luận trước khi quét — xem đầu file.
function boBinhLuan(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');
}

test('KHÔNG chuỗi nào hiện ra cho người học hứa vượt cam kết B2 + nền C1', () => {
  const pham = [];
  for (const full of liet(SRC)) {
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (MIEN_TRU.includes(rel)) continue;
    const noi = boBinhLuan(readFileSync(full, 'utf8'));
    noi.split('\n').forEach((raw, i) => {
      if (boQua(raw)) return;
      const dong = catTruongNgu(raw);
      for (const [mau, ly] of CAM) {
        if (mau.test(dong)) pham.push(`${rel}:${i + 1} — ${ly}\n      ${dong.trim().slice(0, 130)}`);
      }
    });
  }
  assert.deepEqual(pham.slice(0, 12), [], `${pham.length} chỗ hứa vượt cam kết:\n  ${pham.slice(0, 12).join('\n  ')}`);
});

// Danh sách miễn trừ mà có mục CHẾT thì nó là lời hứa suông: người sau đọc vào
// tưởng đã cân nhắc kỹ, thật ra chuỗi đó không còn tồn tại. (Đúng cái bẫy 61 mục
// allow-list rỗng ở việc 3.2.)
test('mọi mục TIẾT LỘ đều còn khớp một chỗ có thật trong src/', () => {
  const noi = liet(SRC).map((f) => readFileSync(f, 'utf8')).join('\n');
  const chet = [...TIET_LO.keys(), ...DA_AN].filter((k) => !noi.includes(k));
  assert.deepEqual(chet, [], `${chet.length} mục miễn trừ không còn khớp chuỗi nào — xoá đi:\n  ${chet.join('\n  ')}`);
});

// Miễn trừ `"level": "C1/C2"` chỉ an toàn CHỪNG NÀO không ai in thẳng nó ra.
test('KHÔNG màn hình nào in thẳng topic.level — phải đi qua nhanCapDo()', () => {
  const thoi = [];
  for (const full of liet(SRC)) {
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (MIEN_TRU.includes(rel) || !/\.jsx$/.test(rel)) continue;
    boBinhLuan(readFileSync(full, 'utf8')).split('\n').forEach((dong, i) => {
      if (/\{\s*\w*(topic|Topic|Word|word)\.level\s*\}/.test(dong)) thoi.push(`${rel}:${i + 1}`);
    });
  }
  assert.deepEqual(thoi, [], `${thoi.length} chỗ in thẳng nhãn cấp độ thô:\n  ${thoi.join('\n  ')}`);
});

// Nhãn bậc từng nằm ở HAI nơi: BAND_TAB_LABEL ghi 'C1 Cao Cấp', levelTitle của
// roadmapCurated ghi 'Advanced - C1/C2'. Hai bản thì lệch — và đã lệch thật.
test('nhãn CEFR của tab lộ trình tính từ CEFR_OF_BAND, không chép tay', () => {
  for (const b of ROADMAP_BANDS) {
    assert.ok(
      BAND_TAB_LABEL[b].includes(CEFR_OF_BAND[b]),
      `tab bậc "${b}" ghi "${BAND_TAB_LABEL[b]}" mà CEFR thật là "${CEFR_OF_BAND[b]}"`
    );
  }
});

test('bậc C1 được đánh dấu là NHÁNH DỰ BỊ, bậc B2 là đích cam kết', () => {
  assert.equal(CEFR_OF_BAND[BAC_CAM_KET], 'B2');
  assert.equal(CEFR_OF_BAND[BAC_DU_BI], 'C1');
  assert.ok(LA_DU_BI(BAC_DU_BI) && !LA_DU_BI(BAC_CAM_KET));
  const c1 = roadmapData.find((l) => l.level === BAC_DU_BI);
  assert.match(c1.levelTitle, /Dự Bị/i, 'tiêu đề bậc C1 không nói rõ đây là nhánh dự bị');
  assert.match(c1.levelDesc, /B2/, 'mô tả bậc C1 không nhắc người học phải vững B2 trước');
});

// Nếu ai đó xoá lời hứa C2 bằng cách xoá luôn nội dung thì test trên vẫn xanh mà
// người học mất bài. Ghim số chặng để chuyện đó không lặng lẽ trôi qua.
test('sửa nhãn KHÔNG làm mất chặng nào, và số đếm khớp lộ trình thật', () => {
  const that = roadmapData.reduce((s, l) => s + l.milestones.length, 0);
  assert.equal(TONG_CHANG, that, 'roadmapCounts.js lệch với lộ trình thật — chạy lại build_roadmap.mjs');
  assert.equal(that, 617, `lộ trình còn ${that} chặng (đo được 617 lúc làm việc 5.2)`);
  for (const l of roadmapData) assert.equal(CHANG_THEO_BAC[l.level], l.milestones.length, `số chặng bậc ${l.level} lệch`);
});

// Nhánh C1 phải là ĐƯỜNG ĐI, không phải ba cái xô xếp chồng. Trước 5.2 bộ sinh
// đẩy hết ngữ pháp rồi hết từ vựng rồi hết Oxford: 100 unit Oxford nằm liền một
// mạch cuối nhánh.
// Chỉ đo phần MÁY XẾP. 15 chặng soạn tay của bậc này do chủ dự án tự sắp (có 7
// chặng từ vựng liền nhau) — bản soạn tay luôn thắng, bộ sinh không được đụng.
test('nhánh C1 xen kẽ loại chặng, không dồn thành khối', () => {
  const c1 = roadmapData.find((l) => l.level === BAC_DU_BI).milestones;
  assert.ok(c1.filter((m) => m.curated).length > 0, 'mất phần soạn tay của bậc C1');
  const sinh = c1.filter((m) => !m.curated);
  assert.ok([...new Set(sinh.map((m) => m.type))].length >= 3, 'nhánh C1 thiếu loại chặng');
  let daiNhat = 1, dang = 1;
  for (let i = 1; i < sinh.length; i += 1) {
    dang = sinh[i].type === sinh[i - 1].type ? dang + 1 : 1;
    if (dang > daiNhat) daiNhat = dang;
  }
  assert.ok(daiNhat <= 4, `phần máy xếp của nhánh C1 có ${daiNhat} chặng cùng loại liền nhau — vẫn là khối, chưa phải lộ trình`);
});

// Xen kẽ là SẮP XẾP LẠI, nên tập chặng phải y nguyên. Test này bắt lỗi bộ xen kẽ
// làm rơi hoặc nhân bản chặng — thứ mà đếm tổng không phải lúc nào cũng thấy.
test('xen kẽ không làm rơi hay nhân bản chặng nào', () => {
  for (const l of roadmapData) {
    const ids = l.milestones.map((m) => `${m.type}:${m.targetId}`);
    assert.equal(new Set(ids).size, ids.length, `bậc ${l.level} có chặng trùng sau khi xen kẽ`);
  }
});

test('nhãn cấp độ gộp hiện ra là "C1+", và nói rõ là chưa tách C1 với C2', () => {
  assert.equal(nhanCapDo('C1/C2'), 'C1+');
  assert.equal(nhanCapDo('C1-C2'), 'C1+');
  assert.equal(nhanCapDo('C2'), 'C1+');
  assert.equal(nhanCapDo('B2'), 'B2', 'nhãn không gộp thì phải giữ nguyên');
  assert.equal(nhanCapDo(''), '');
  assert.equal(nhanCapDo(null), '');
  assert.ok(LA_NHAN_GOP('C1/C2') && !LA_NHAN_GOP('B1'));
});
