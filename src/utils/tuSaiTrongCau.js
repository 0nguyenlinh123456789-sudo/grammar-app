// File: src/utils/tuSaiTrongCau.js
// TÌM CHỖ SAI TRONG CÂU — DÙNG CHUNG CHO MÀN HÌNH VÀ CHO PHÉP KIỂM.
//
// ══ LỖ ĐÃ ĐO ĐƯỢC (26/08) ══
// `ErrorCorrectionExercise` so MỘT TỪ với `errorWord`:
//     word.toLowerCase().replace(...) === curr.errorWord.toLowerCase().replace(...)
// Nhưng **51/57 mục trong kho khai `errorWord` là một CỤM**: "more taller",
// "enough old", "too much", "am going", "will going to". Với những mục đó,
// người học bấm từ nào cũng bị báo SAI, và sau khi chấm cũng KHÔNG có từ nào
// được tô đỏ — tức là bài tập không giải được, ở 51 chỗ.
//
// Không test nào đỏ vì mọi phép kiểm trước đây chỉ ĐẾM số câu bài tập.
//
// ══ CHỮA Ở ĐÂU ══
// Sửa ở chỗ ĐỌC, không sửa 51 mục dữ liệu: "more taller" là một cụm sai THẬT,
// ép nó thành một từ là làm hỏng bài tập để vừa với mã. Người soạn sau vẫn sẽ
// viết cụm, và họ đúng.

/** Bỏ dấu câu và hạ chữ thường — cùng cách chuẩn hoá màn hình vẫn dùng. */
const chuan = (s) => String(s || '').toLowerCase().replace(/[.,!?;:]/g, '');

/**
 * Trả về tập CHỈ SỐ TỪ tạo nên chỗ sai trong câu.
 * Khớp cả một từ lẻ lẫn một cụm từ liên tiếp. Không tìm thấy thì trả về tập
 * rỗng — chỗ gọi phải xử lý được trường hợp đó chứ không được coi là "sai".
 */
export function viTriTuSai(cau, tuSai) {
  const tu = String(cau || '').split(' ').map(chuan);
  const can = chuan(tuSai).split(/\s+/).filter(Boolean);
  if (!can.length) return new Set();
  for (let i = 0; i + can.length <= tu.length; i += 1) {
    if (can.every((w, j) => tu[i + j] === w)) {
      return new Set(Array.from({ length: can.length }, (_, j) => i + j));
    }
  }
  return new Set();
}
