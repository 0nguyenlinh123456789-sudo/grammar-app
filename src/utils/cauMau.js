// File: src/utils/cauMau.js
// MỘT KHUÔN DUY NHẤT CHO CÂU VÍ DỤ CỦA BÀI NGỮ PHÁP.
//
// ══ LỖ ĐÃ ĐO ĐƯỢC ══
// Kho có HAI khuôn cho `sentenceGame`:
//   • 75 bài dùng { id, text, trans }
//   • 3  bài dùng { en, vi, words }  — b1_26, b1_27, b1_28
//
// `SentenceBuilder` tự chuẩn hoá cả hai nên tab "Xếp Câu" chạy được cả 78 bài.
// `AiAssistant` thì KHÔNG: nó lọc `sentences.filter(s => s.text)`, nên với ba
// bài kia danh sách rỗng và mục ĐỌC CÂU MẪU biến mất — không báo gì, không lỗi
// console, không test nào đỏ. Đúng kiểu hỏng tệ nhất: một tính năng tắt lặng lẽ
// ở một góc kho mà chẳng ai đi tới.
//
// Chữa bằng cách để phép chuẩn hoá ở MỘT chỗ, ai cần cũng gọi — thay vì mỗi
// màn hình tự đoán khuôn dữ liệu một kiểu.
//
// KHÔNG đi sửa ba bài kia thành khuôn A: khuôn B là dữ liệu hợp lệ, và lần sau
// có người soạn thêm bài theo khuôn B thì lỗi lại quay lại y hệt. Sửa ở chỗ
// ĐỌC thì mới hết một lớp lỗi; sửa ở dữ liệu chỉ hết đúng ba bài.

/**
 * Đưa danh sách câu ví dụ về đúng một khuôn { id, text, trans }.
 * Bỏ những mục không có câu tiếng Anh — chúng không dùng được ở đâu cả.
 */
export function chuanHoaCauMau(ds) {
  return (Array.isArray(ds) ? ds : []).map((s, i) => {
    if (!s) return null;
    if (s.text) return { ...s, id: s.id ?? i + 1, text: s.text, trans: s.trans || s.vi || '' };
    // Khuôn B bỏ dấu câu cuối để phép tách từ khớp được.
    if (s.en) return { id: s.id ?? i + 1, text: String(s.en).replace(/[?.!,]$/g, '').trim(), trans: s.vi || '' };
    return null;
  }).filter((s) => s && s.text);
}
