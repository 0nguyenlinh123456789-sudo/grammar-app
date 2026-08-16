// File: scripts/audit_story_caps.mjs
// Đo và sửa dấu hiệu "TỪ CỦA CHÍNH CHỦ ĐỀ BỊ VIẾT HOA GIỮA CÂU" trong bài đọc
// (`storyEn`) — ví dụ *"He made a Booking for a direct flight"*.
//
// VÌ SAO ĐÂY LÀ LỖI, KHÔNG PHẢI KIỂU TRÌNH BÀY:
// Bài đọc là ĐẦU VÀO chính của kỹ năng đọc. Viết hoa giữa câu là tiếng Anh SAI,
// và người học mất gốc không có cách nào biết đó là quy ước của app chứ không
// phải quy tắc của ngôn ngữ.
//
// VÌ SAO XOÁ ĐƯỢC MÀ KHÔNG MẤT GÌ: từ vựng đã được bôi vàng bằng
// `buildVocabRegex` (`src/utils/textUtils.js`) — cờ `gi`, tức KHÔNG PHÂN BIỆT
// HOA THƯỜNG. Viết hoa là lớp đánh dấu THỨ HAI, thừa với lớp thứ nhất và sai về
// mặt ngôn ngữ. Hạ chữ thường vẫn bôi vàng y nguyên.
//
// PHẠM VI SỬA: CHỈ ĐỔI HOA/THƯỜNG. Không thêm, xoá hay đổi một ký tự nào khác —
// `tests/story_caps.test.js` chốt điều đó bằng ảnh chụp
// `scripts/data/story_lowercase_snapshot.json` (băm của `storyEn` đã hạ hết về
// chữ thường). Đó là thứ biến "988 lượt sửa chuỗi" thành một phép chuẩn hoá
// máy kiểm được, chứ không phải một đợt biên tập nội dung.
//
// KHÔNG PHẢI DÍNH DẤU HIỆU LÀ SAI: `Monday`, `T-shirt`, `Renaissance`,
// `MRI scan`, `Earth`... viết hoa là ĐÚNG. Danh sách hợp lệ nằm ở
// `scripts/data/hoa_hop_le.mjs`, kê ĐÍCH DANH theo cặp (chủ đề, dạng chữ) kèm lý
// do — không lọc theo mẫu.
//
// VÌ SAO KHOÁ THEO CẶP (CHỦ ĐỀ, DẠNG CHỮ) CHỨ KHÔNG THEO TỪ TRẦN:
// `May` là tháng Năm ở `time-calendar-beginner` nhưng là động từ khuyết thiếu ở
// chỗ khác; `Board` là bảng ở lớp học nhưng là "lên máy bay" ở sân bay. Một danh
// sách từ trần sẽ che mất lỗi thật.
//
// Chạy:
//   node scripts/audit_story_caps.mjs            # báo cáo
//   node scripts/audit_story_caps.mjs --snapshot # chụp ảnh chữ thường (chạy TRƯỚC khi sửa)
//   node scripts/audit_story_caps.mjs --fix      # hạ chữ thường các lượt không hợp lệ
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pathToFileURL, fileURLToPath } from 'url';
import { loadTopics } from './check_topic_word_counts.mjs';
import { HOA_HOP_LE, khoaHoa } from './data/hoa_hop_le.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const ANH_CHUP = path.join(ROOT, 'scripts', 'data', 'story_lowercase_snapshot.json');
const NGUON = path.join(ROOT, 'src', 'data', 'vocabVstepData.js');

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Vị trí ĐẦU CÂU. Ba trường hợp được gọi tên, không đoán theo mẫu:
//   1. đầu chuỗi hoặc đầu dòng — xuống dòng là hết câu, kể cả không có dấu chấm
//      (bài đọc dùng "\n" để tách các PHẦN, tiêu đề phần không kết thúc bằng dấu chấm);
//   2. sau . ! ? : ; hoặc dấu chấm lửng;
//   3. LỜI THOẠI: sau dấu phẩy NẾU có dấu nháy xen giữa — `say, 'Go straight` là
//      đầu câu thoại. Không có nháy thì dấu phẩy KHÔNG phải hết câu;
//   4. GẠCH ĐẦU DÒNG: `\n- Savings: ...` — đầu mục trong danh sách, viết hoa đúng.
// Dấu gạch nối dính liền (`Non-renewable`) không phải đầu câu mà là TỪ GHÉP:
// xử lý riêng ở `laPhanTuGhep`.
export function laDauCau(text, i) {
  let j = i - 1;
  let coNhay = false;
  for (;;) {
    if (j < 0) return true;
    const c = text[j];
    if (c === '\n') return true;
    if (/["'“”‘’(\[]/.test(c)) { coNhay = true; j -= 1; continue; }
    if (/[ \t]/.test(c)) { j -= 1; continue; }
    break;
  }
  if (/[.!?:;…•]/.test(text[j])) return true;
  if (coNhay && text[j] === ',') return true;
  // Gạch đầu dòng: dấu -/*/• đứng ngay đầu dòng.
  if (/[-*•]/.test(text[j])) {
    let k = j - 1;
    while (k >= 0 && /[ \t]/.test(text[k])) k -= 1;
    if (k < 0 || text[k] === '\n') return true;
  }
  return false;
}

// `renewable` trong `Non-renewable` không phải một từ đứng riêng bị viết hoa.
export function laPhanTuGhep(text, i) {
  return i > 0 && /[-’']/.test(text[i - 1]);
}

function tuCuaChuDe(t) {
  return [...new Set((t.words || [])
    .map((w) => String(w.en || '').trim())
    .filter((w) => /^[a-zA-Z][a-zA-Z '’-]*$/.test(w)))]
    .sort((a, b) => b.length - a.length);
}

/** Mọi lượt từ-của-chủ-đề viết hoa giữa câu trong `storyEn`. */
export function timHoaGiuaCau(topics) {
  const hits = [];
  for (const t of topics) {
    const tu = tuCuaChuDe(t);
    if (!tu.length) continue;
    const re = new RegExp(`\\b(${tu.map(esc).join('|')})\\b`, 'gi');
    const text = String(t.storyEn || '');
    let m;
    while ((m = re.exec(text))) {
      const raw = m[0];
      if (!/^[A-Z]/.test(raw)) continue;            // đã thường rồi
      if (raw.length === 1) continue;               // "I", "A" đứng lẻ
      if (!/[a-z]/.test(raw.slice(1))) continue;    // TOÀN HOA = tiêu đề phần
      if (laPhanTuGhep(text, m.index)) continue;
      if (laDauCau(text, m.index)) continue;
      hits.push({
        topicId: t.id,
        form: raw,
        index: m.index,
        hopLe: HOA_HOP_LE.has(khoaHoa(t.id, raw)),
        nguCanh: text.slice(Math.max(0, m.index - 45), m.index + raw.length + 35).replace(/\n/g, '⏎'),
      });
    }
  }
  return hits;
}

/** Băm của `storyEn` đã hạ hết về chữ thường — bất biến "chỉ đổi hoa/thường". */
export function bamChuThuong(topics) {
  const out = {};
  for (const t of topics) {
    if (t.storyEn == null) continue;
    out[t.id] = crypto.createHash('sha256').update(String(t.storyEn).toLowerCase(), 'utf8').digest('hex');
  }
  return out;
}

// ---------- SỬA ----------
// Sửa thẳng trên file nguồn, và chỉ đổi hoa/thường của đúng dạng chữ đó bên
// trong chuỗi `storyEn` của đúng chủ đề đó. Nếu không tìm được đủ số lượt cần
// sửa thì DỪNG chứ không sửa một phần — sửa một phần là để lại dữ liệu nửa vời.
function sua(topics, hits) {
  const canSua = hits.filter((h) => !h.hopLe);
  const theoChuDe = new Map();
  for (const h of canSua) {
    if (!theoChuDe.has(h.topicId)) theoChuDe.set(h.topicId, []);
    theoChuDe.get(h.topicId).push(h);
  }

  let src = fs.readFileSync(NGUON, 'utf8');
  let tongSua = 0;
  for (const [topicId, ds] of theoChuDe) {
    const t = topics.find((x) => x.id === topicId);
    const viTriId = src.indexOf(`"id": "${topicId}"`);
    if (viTriId < 0) throw new Error(`không tìm thấy chủ đề ${topicId} trong ${path.basename(NGUON)}`);
    const dau = src.indexOf('"storyEn": "', viTriId);
    if (dau < 0) throw new Error(`không tìm thấy storyEn của ${topicId}`);
    const batDau = dau + '"storyEn": '.length;
    // Chuỗi JSON: chạy tới dấu " không bị thoát.
    let k = batDau + 1;
    while (k < src.length) {
      if (src[k] === '\\') { k += 2; continue; }
      if (src[k] === '"') break;
      k += 1;
    }
    const literal = src.slice(batDau, k + 1);
    const van = JSON.parse(literal);
    if (van !== t.storyEn) throw new Error(`${topicId}: chuỗi trong file khác chuỗi đã nạp — không sửa mù`);

    // Áp theo VỊ TRÍ đã đo, từ cuối về đầu, để chỉ số không xê dịch.
    let moi = van;
    for (const h of [...ds].sort((a, b) => b.index - a.index)) {
      const doan = moi.slice(h.index, h.index + h.form.length);
      if (doan !== h.form) throw new Error(`${topicId}@${h.index}: mong "${h.form}", gặp "${doan}"`);
      moi = moi.slice(0, h.index) + h.form[0].toLowerCase() + h.form.slice(1) + moi.slice(h.index + h.form.length);
      tongSua += 1;
    }
    if (moi.toLowerCase() !== van.toLowerCase()) throw new Error(`${topicId}: đổi nhiều hơn hoa/thường`);
    src = src.slice(0, batDau) + JSON.stringify(moi) + src.slice(k + 1);
  }
  fs.writeFileSync(NGUON, src);
  return { tongSua, soChuDe: theoChuDe.size };
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const topics = await loadTopics();
  const cd = process.argv[2];

  if (cd === '--snapshot') {
    fs.writeFileSync(ANH_CHUP, `${JSON.stringify(bamChuThuong(topics), null, 1)}\n`);
    console.log(`✅ Đã chụp ${Object.keys(bamChuThuong(topics)).length} bài đọc vào ${path.relative(ROOT, ANH_CHUP)}`);
    process.exit(0);
  }

  const hits = timHoaGiuaCau(topics);
  const xau = hits.filter((h) => !h.hopLe);
  const tot = hits.filter((h) => h.hopLe);
  const theoChuDe = new Map();
  for (const h of xau) theoChuDe.set(h.topicId, (theoChuDe.get(h.topicId) || 0) + 1);

  if (cd === '--fix') {
    if (!xau.length) { console.log('✅ Không còn lượt nào để sửa.'); process.exit(0); }
    const r = sua(topics, hits);
    console.log(`✅ Đã hạ chữ thường ${r.tongSua} lượt trong ${r.soChuDe} bài đọc. Chạy lại không tham số để kiểm.`);
    process.exit(0);
  }

  console.log(`Bài đọc: ${topics.filter((t) => t.storyEn).length}`);
  console.log(`Tổng lượt viết hoa giữa câu: ${hits.length}  (hợp lệ ${tot.length} · SAI ${xau.length})`);
  console.log(`Bài dính lỗi: ${theoChuDe.size}${theoChuDe.size ? ` — ${[...theoChuDe.entries()].sort((a, b) => b[1] - a[1]).map(([id, n]) => `${id}:${n}`).join(', ')}` : ''}`);
  for (const h of xau.slice(0, 15)) console.log(`  ❌ ${h.topicId} «${h.form}» …${h.nguCanh}…`);
  if (xau.length > 15) console.log(`  … và ${xau.length - 15} lượt nữa`);
  process.exit(xau.length ? 1 : 0);
}
