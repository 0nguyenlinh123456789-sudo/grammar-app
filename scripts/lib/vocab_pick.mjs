// File: scripts/lib/vocab_pick.mjs
// LUẬT CHỌN TỪ MỤC TIÊU — MỘT BẢN DUY NHẤT cho bộ sinh đề viết (3.3), bộ sinh
// đề nói (3.5) và các bài kiểm đối chiếu ngược.
//
// Trước khi có file này, luật tách ô nằm ở ba chỗ: bộ sinh đề viết và bài kiểm
// `writing_generated_source.test.js` mỗi nơi một bản chép. Bài kiểm mà chép lại
// luật của thứ nó đi kiểm thì nó chỉ kiểm được rằng hai bản chép còn giống
// nhau — và khi lệch, nó lệch cùng chiều. Đúng cái bẫy `.{1,20}` với `.{1,25}`
// đã làm lọt dòng giải nghĩa trong bản chép lời VOA.

// GOM NHIỀU TỪ TRONG MỘT Ô — giáo trình Oxford viết `coreVocab` kiểu
// "sun / rain / wind / cloud", "good -> better -> the best", "nice (+)".
// Bản đầu của bộ sinh lọc bằng một biểu thức khớp CẢ Ô, nên 24 unit bị bỏ vì
// "chỉ có 1 từ dùng được" — trong khi từ vẫn nằm nguyên đó, chỉ là dính nhau.
// Bỏ chặng vì bộ lọc của mình quá chặt là đúng cái đã dính ở bản chép lời VOA
// (lọc theo độ dài vứt mất câu ví dụ). Tách ô ra trước rồi mới lọc.
export function tachO(o) {
  return String(o || '')
    .replace(/\([^)]*\)/g, ' ')       // bỏ chú thích trong ngoặc: "nice (+)"
    .replace(/->|→|,|;|\|/g, '/')     // mọi dấu ngăn đều quy về "/"
    .split('/')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export const SO_TU_MUC_TIEU = 8;

// Chọn từ theo BƯỚC ĐỀU trên danh sách, không lấy 8 từ đầu và không random.
// Lấy 8 từ đầu thì chủ đề 101 từ chỉ dùng tới 8% đầu bảng; random thì mỗi lần
// sinh lại ra một đề khác, không so sánh được giữa hai lần chạy.
export function chonTu(ds, n = SO_TU_MUC_TIEU) {
  const sach = (ds || []).flatMap((w) => tachO(w?.en || w?.word))
    .filter((w) => /^[a-z][a-z' -]{1,24}$/.test(w));
  const rieng = [...new Set(sach)];
  if (rieng.length <= n) return rieng;
  const buoc = rieng.length / n;
  return Array.from({ length: n }, (_, i) => rieng[Math.floor(i * buoc)]);
}
