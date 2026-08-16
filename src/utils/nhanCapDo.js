// File: src/utils/nhanCapDo.js
// NHÃN CẤP ĐỘ HIỆN RA CHO NGƯỜI HỌC (việc 5.2).
//
// Vì sao cần một chỗ riêng: `grammarDataC1C2.js` khai `"level": "C1/C2"` cho cả
// 25 bài, và `GrammarPage` in thẳng chuỗi đó ra màn hình. Tức là NHÃN DỮ LIỆU
// trở thành LỜI HỨA với người học — trong khi cam kết của sản phẩm là "mất gốc
// → B2 vững, có nền C1", KHÔNG hứa C2.
//
// Hai cách xử lý, và vì sao chọn cách này:
//   ✗ Sửa 25 bài thành "C1" — nói dối theo chiều ngược lại. File đó THẬT SỰ
//     trộn nội dung C1 với C2 (đảo ngữ, subjunctive, absolute constructions) và
//     không ai tách ra cả.
//   ✓ Gọi cả cụm là **C1+** và nói thẳng là chưa tách. Người học biết mình đang
//     chạm tới phần trên B2, và biết ứng dụng không hứa đưa họ hết C2.
//
// KHÔNG mở cuộc rà soát GIỮ/XOÁ cho `grammarDataC1C2.js` ở đây: nội dung 25 bài
// là soạn tay, vấn đề duy nhất là cái nhãn.

/** Nhãn cấp độ để HIỆN RA. Trả về chuỗi rỗng nếu không có gì để hiện. */
export function nhanCapDo(raw) {
  const t = String(raw || '').trim();
  if (!t) return '';
  // 'C1/C2', 'C1-C2', 'C2' → gộp thành C1+ (chưa tách C1 với C2).
  if (/C2/i.test(t)) return 'C1+';
  return t;
}

/** Câu giải thích đi kèm, chỉ hiện khi nhãn là cụm gộp. */
export const GHI_CHU_C1_CONG =
  'C1+ nghĩa là phần trên B2 — bộ bài này gộp chung C1 và C2, chưa tách ra. Ứng dụng cam kết đưa bạn tới B2 vững; phần này là nhánh dự bị đi thêm.';

export const LA_NHAN_GOP = (raw) => nhanCapDo(raw) === 'C1+';
