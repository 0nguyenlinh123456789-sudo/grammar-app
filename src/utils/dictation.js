// File: src/utils/dictation.js
// CHẤM NGHE CHÉP CHÍNH TẢ (việc 2.3) — thuần tính toán, có test.
//
// Vì sao chép chính tả đáng làm sớm: nó là cơ chế rẻ nhất mà bắt người học phải
// nghe ĐẾN TỪNG TỪ. Trắc nghiệm nghe-chọn-nghĩa có thể đoán trúng bằng cách bắt
// được một từ khoá; chép chính tả thì không.
//
// Chấm bằng SO KHỚP DÃY CON DÀI NHẤT chứ không so từng vị trí. Thiếu một từ ở
// đầu câu mà so theo vị trí thì mọi từ sau đó đều lệch và người học bị chấm 0%
// dù nghe đúng gần hết — sai kiểu đó còn tệ hơn không chấm.
export const NGUONG_DAT = 0.8;

// Bỏ dấu câu và chữ hoa khi SO SÁNH, nhưng vẫn hiện nguyên văn khi trả bài:
// mục tiêu là nghe ra từ, không phải nhớ dấu phẩy. Giữ dấu nháy đơn vì nó phân
// biệt "wont" với "won't".
export function chuanTu(s) {
  return String(s || '').toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
}

export function tachTu(s) {
  return String(s || '').trim().split(/\s+/).filter(Boolean);
}

// Dãy con chung dài nhất giữa hai danh sách từ đã chuẩn hoá.
function bangLCS(a, b) {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      d[i][j] = a[i] === b[j] ? d[i + 1][j + 1] + 1 : Math.max(d[i + 1][j], d[i][j + 1]);
    }
  }
  return d;
}

// Trả về danh sách mục để hiện lại cho người học:
//   dung   — nghe đúng
//   sai    — có từ ở đó nhưng gõ khác (hiện cả từ đúng lẫn từ đã gõ)
//   thieu  — bỏ sót
//   thua   — gõ thêm từ không có trong câu
export function chamChinhTa(cauDung, cauGo) {
  const gocDung = tachTu(cauDung);
  const gocGo = tachTu(cauGo);
  const a = gocDung.map(chuanTu);
  const b = gocGo.map(chuanTu);
  const d = bangLCS(a, b);

  const muc = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { muc.push({ type: 'dung', expected: gocDung[i], typed: gocGo[j] }); i += 1; j += 1; }
    else if (d[i + 1][j] >= d[i][j + 1]) { muc.push({ type: 'thieu', expected: gocDung[i], typed: '' }); i += 1; }
    else { muc.push({ type: 'thua', expected: '', typed: gocGo[j] }); j += 1; }
  }
  while (i < a.length) { muc.push({ type: 'thieu', expected: gocDung[i], typed: '' }); i += 1; }
  while (j < b.length) { muc.push({ type: 'thua', expected: '', typed: gocGo[j] }); j += 1; }

  // Một cặp "thiếu" đi liền "thừa" thực ra là GÕ SAI một từ, không phải hai lỗi
  // riêng. Gộp lại để người học thấy đúng thứ họ làm và không bị trừ hai lần.
  const gop = [];
  for (let k = 0; k < muc.length; k += 1) {
    const nay = muc[k];
    const sau = muc[k + 1];
    if (nay.type === 'thieu' && sau?.type === 'thua') { gop.push({ type: 'sai', expected: nay.expected, typed: sau.typed }); k += 1; }
    else if (nay.type === 'thua' && sau?.type === 'thieu') { gop.push({ type: 'sai', expected: sau.expected, typed: nay.typed }); k += 1; }
    else gop.push(nay);
  }

  const dung = gop.filter((m) => m.type === 'dung').length;
  const tong = gocDung.length;
  const percent = tong > 0 ? Math.round((dung / tong) * 100) : 0;
  return { items: gop, correct: dung, total: tong, percent, passed: tong > 0 && dung / tong >= NGUONG_DAT };
}

// Gợi ý một chữ cái đầu của các từ — dùng cho nút "gợi ý" khi người học tắc.
// Không đưa cả câu: đưa cả câu thì bài chép chính tả biến thành bài chép lại.
export function goiY(cauDung) {
  return tachTu(cauDung).map((t) => {
    const chu = t.replace(/[^A-Za-z0-9]/g, '');
    if (!chu) return t;
    return chu[0] + '·'.repeat(Math.max(0, chu.length - 1));
  }).join(' ');
}
