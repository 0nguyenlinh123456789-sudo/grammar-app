// File: src/utils/oxfordThicken.js
// BÙ ĐỘ DÀY LUYỆN TẬP CHO GIÁO TRÌNH OXFORD (việc 5.1).
//
// ══ ĐO ĐƯỢC TRƯỚC ══
// Số mục luyện tập trên mỗi unit (quiz + gõ từ + đọc to + bài tập sách):
//   elementary        60 unit · 2.843 mục · **47,4/unit**
//   pre_intermediate 100 unit · 2.467 mục · **24,7/unit**
//   advanced         100 unit ·   996 mục · **10,0/unit**
// Càng lên cao càng mỏng — ngược nhu cầu. Sách Advanced chỉ có 2 câu quiz,
// 2 mục gõ từ và 1 câu đọc to cho mỗi unit.
//
// ══ THỨ FILE NÀY LÀM, VÀ THỨ NÓ TỪ CHỐI LÀM ══
// Nó **suy ra bài luyện tập từ chính ô từ đã soạn tay của unit** — không thêm
// một chữ nội dung mới nào:
//
//   • Gõ từ    ← `vi` (nghĩa soạn tay) → đáp án là `word` soạn tay.
//   • Đọc to   ← `example` (câu ví dụ soạn tay), đọc nguyên văn.
//   • Điền vào ← `example` soạn tay, khoét đúng từ đó ra; đáp án nhiễu là các
//                từ KHÁC CỦA CHÍNH UNIT ĐÓ.
//
// Ba loại trên đều là **sắp xếp lại tài liệu soạn tay** — đúng vế GIỮ của luật
// đã chốt. Không có loại thứ tư. Cụ thể, file này **KHÔNG**:
//   • nghĩ ra collocation (xem phần dưới — kho đang có 1.868 cụm nhân từ khuôn);
//   • nghĩ ra câu ví dụ mới;
//   • nghĩ ra câu hỏi mà đáp án phải do máy phán đoán.
//
// ══ VÌ SAO TÍNH LÚC CHẠY, KHÔNG SINH RA FILE ══
// Mọi mục ở đây là HÀM THUẦN của `theory.coreVocab`. Sinh ra file dữ liệu là
// tạo BẢN THỨ HAI của cùng một nội dung, và hai bản thì sớm muộn cũng lệch —
// bài học đã trả giá ba lần trong chuỗi này. Tính lúc chạy thì không thể lệch,
// và tốn 0 byte tải về.
//
// ══ CHỈ BÙ VÀO CHỖ THIẾU ══
// Bù tới mức `MUC_TIEU` rồi dừng. Sách Elementary đang 47,4/unit nên gần như
// không nhận thêm gì; sách Advanced nhận nhiều nhất. Một luật, áp cho cả ba
// sách, chỉ lấp chỗ trống — không đụng vào mục soạn tay đã có.

/** Mỗi loại bài luyện tập cố gắng đạt tới mức này trong một unit. */
export const MUC_TIEU = { typingGame: 8, speaking: 8, quiz: 8 };

const chuan = (s) => String(s || '').trim();
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Gợi ý chữ cái đầu, cùng kiểu với mục gõ từ soạn tay đã có. */
function goiY(word) {
  return word.split('').join(' ');
}

/** Câu ví dụ có chứa đúng từ đó ở dạng một TỪ ĐỨNG RIÊNG hay không. */
function coTuTrongViDu(example, word) {
  if (!example || !word) return false;
  return new RegExp(`(^|[^\\p{L}])${esc(word)}([^\\p{L}]|$)`, 'iu').test(example);
}

function khoetTu(example, word) {
  return example.replace(new RegExp(`(^|[^\\p{L}])${esc(word)}([^\\p{L}]|$)`, 'iu'), '$1___$2');
}

/**
 * Trả về unit đã được bù thêm bài luyện tập suy từ ô từ của chính nó.
 * Mục soạn tay luôn đứng TRƯỚC và không bao giờ bị thay.
 */
export function buDoDay(unit) {
  const tu = (unit?.theory?.coreVocab || [])
    .map((w) => ({ word: chuan(w.word || w.en), vi: chuan(w.vi), example: chuan(w.example) }))
    .filter((w) => w.word && w.vi);
  if (!tu.length) return unit;

  // ── GÕ TỪ ──
  const goCu = unit.typingGame || [];
  const daGo = new Set(goCu.map((it) => chuan(it.a).toLowerCase()));
  const goMoi = [];
  for (const w of tu) {
    if (goMoi.length + goCu.length >= MUC_TIEU.typingGame) break;
    if (daGo.has(w.word.toLowerCase())) continue;
    goMoi.push({ q: `${w.vi}: ${w.word[0]}...`, hint: goiY(w.word), a: w.word, tuOTuCuaUnit: true });
  }

  // ── ĐỌC TO ──
  const noiCu = unit.speaking || [];
  const daNoi = new Set(noiCu.map((it) => chuan(it.text).toLowerCase()));
  const noiMoi = [];
  for (const w of tu) {
    if (noiMoi.length + noiCu.length >= MUC_TIEU.speaking) break;
    if (!w.example || daNoi.has(w.example.toLowerCase())) continue;
    noiMoi.push({ text: w.example, tuOTuCuaUnit: true });
  }

  // ── ĐIỀN VÀO CHỖ TRỐNG ──
  // Chỉ dựng được khi câu ví dụ THẬT SỰ chứa từ đó. Không chứa thì BỎ QUA, chứ
  // không chế ra một câu khác — đó mới là bịa.
  const quizCu = unit.quiz || [];
  const daHoi = new Set(quizCu.map((it) => chuan(it.q).toLowerCase()));
  const quizMoi = [];
  for (const w of tu) {
    if (quizMoi.length + quizCu.length >= MUC_TIEU.quiz) break;
    if (!coTuTrongViDu(w.example, w.word)) continue;
    const q = `Từ nào điền đúng vào chỗ trống: “${khoetTu(w.example, w.word)}”`;
    if (daHoi.has(q.toLowerCase())) continue;
    // Nhiễu lấy từ CHÍNH unit này — người học phải phân biệt các từ vừa học với
    // nhau, không phải loại trừ những từ chưa gặp bao giờ.
    const nhieu = tu.filter((x) => x.word.toLowerCase() !== w.word.toLowerCase()).slice(0, 3).map((x) => x.word);
    if (nhieu.length < 3) continue;
    quizMoi.push({
      q,
      options: [w.word, ...nhieu].sort((a, b) => a.localeCompare(b)),
      a: w.word,
      tuOTuCuaUnit: true,
    });
  }

  if (!goMoi.length && !noiMoi.length && !quizMoi.length) return unit;
  return {
    ...unit,
    typingGame: [...goCu, ...goMoi],
    speaking: [...noiCu, ...noiMoi],
    quiz: [...quizCu, ...quizMoi],
  };
}

/** Đếm mục luyện tập của một unit — dùng cho báo cáo và cho test. */
export function demLuyenTap(unit) {
  return ['quiz', 'typingGame', 'speaking', 'textbookExercises']
    .reduce((n, k) => n + (unit?.[k]?.length || 0), 0);
}
