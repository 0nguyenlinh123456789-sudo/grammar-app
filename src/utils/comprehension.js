// File: src/utils/comprehension.js
// Builds a normalized list of comprehension questions for the Listening and
// Reading practice components.
//
// ══ BA MỨC CÂU HỎI, VÀ VÌ SAO PHẢI TÁCH RIÊNG ══
//
// 1. `topic.storyQuiz` — MỨC VĂN BẢN (việc 3.1). Hỏi về CẢ BÀI ĐỌC đang hiện
//    trên màn hình. KHÔNG có trường `en`: bài đọc đã nằm ngay phía trên rồi,
//    chép lại một câu vào ô trích dẫn là hỏi về câu đó chứ không phải về bài.
//    Đây là điều tiêu chí N5 đòi: "đọc hiểu theo VĂN BẢN, không phải theo câu lẻ".
//
// 2. `topic.comprehension` — MỨC CÂU, soạn tay. Có `en` là một câu tiếng Anh
//    độc lập; dùng được cho cả nghe lẫn đọc.
//
// 3. Sinh từ câu ví dụ của mục từ — MỨC CÂU, máy sắp xếp. Đây là nội dung
//    GIỮ theo luật đã chốt: nó SẮP XẾP LẠI câu ví dụ + bản dịch soạn tay, không
//    nhân từ khuôn mẫu. Nhưng nó KHÔNG kiểm được việc hiểu bài đọc.
//
// Câu mức văn bản chỉ đi vào phần ĐỌC. Phần NGHE không nhận `storyQuiz` — không
// phải bằng quy ước đặt tên mà bằng cấu trúc: câu mức văn bản không có gì để
// đọc lên, nên đưa vào phần nghe là ra một câu hỏi câm.
//
// Hình dạng dữ liệu soạn tay:
//   storyQuiz:     { q, options: [...], answer, dan }   // `dan` = câu NGUYÊN VĂN
//                                                       // trong storyEn làm căn cứ
//   comprehension: { en, q, options: [...], answer }
//
// Hình dạng đã chuẩn hoá (thứ các component vẽ ra):
//   { playText, showText, prompt, options: [{ text, correct }], word, dan, mucVanBan }

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ĐÁP ÁN PHẢI ĐƯỢC XÁO — và xáo Ở ĐÂY, không phải ở người soạn.
//
// Bộ câu hỏi soạn tay duy nhất đang có (travel-transport) có 5/5 câu `answer: 0`:
// người học cứ bấm ô đầu là đúng 100%. Lỗi không nằm ở người soạn — viết đáp án
// đúng trước rồi thêm câu nhiễu là cách soạn tự nhiên nhất. Lỗi nằm ở chỗ trước
// đây hàm này gán `correct: i === q.answer` rồi giữ nguyên thứ tự. Xáo trong mã
// thì không cần ai nhớ luật, và 488 câu soạn về sau không thể tái phạm.
function xaoLuaChon(options, answer) {
  return shuffle(options.map((text, i) => ({ text, correct: i === answer })));
}

const hopLe = (q) => q && Array.isArray(q.options) && q.options.length >= 2
  && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length;

// Auto-generate: "what does this sentence mean?" from example/viExample.
function autoQuestions(words, limit) {
  const usable = (words || []).filter((w) => w.example && w.viExample);
  return shuffle(usable).slice(0, limit).map((w) => {
    const distractors = shuffle(
      usable.filter((o) => o.viExample && o.viExample !== w.viExample)
    ).slice(0, 3);
    const options = shuffle([
      { text: w.viExample, correct: true },
      ...distractors.map((d) => ({ text: d.viExample, correct: false })),
    ]);
    return {
      playText: w.example,
      showText: w.example,
      prompt: 'Câu này có nghĩa là gì?',
      options,
      word: w,
      mucVanBan: false,
    };
  });
}

// Map hand-authored sentence-level questions into the normalized shape.
function authoredQuestions(list, limit) {
  return shuffle(list.filter((q) => hopLe(q) && q.en))
    .slice(0, limit)
    .map((q) => ({
      playText: q.en,
      showText: q.en,
      prompt: q.q || 'Chọn đáp án đúng:',
      options: xaoLuaChon(q.options, q.answer),
      word: null,
      mucVanBan: false,
    }));
}

// (3.1) Câu hỏi mức VĂN BẢN. `playText`/`showText` để null có chủ đích — không
// có câu nào để trích, vì câu hỏi là về cả bài.
function storyQuestions(list, limit) {
  return shuffle(list.filter(hopLe))
    .slice(0, limit)
    .map((q) => ({
      playText: null,
      showText: null,
      prompt: q.q,
      options: xaoLuaChon(q.options, q.answer),
      word: null,
      dan: q.dan || null,
      mucVanBan: true,
    }));
}

// `story` chỉ được truyền vào từ phần ĐỌC. Phần NGHE gọi hàm này không kèm
// `story`, nên câu mức văn bản không có đường nào lọt sang đó.
export function buildComprehension({ words, authored, story, limit = 10 }) {
  if (Array.isArray(story) && story.length > 0) {
    const qs = storyQuestions(story, limit);
    if (qs.length >= 1) return qs;
  }
  // ⚠️ NHÁNH NÀY HIỆN KHÔNG CÓ ĐƯỜNG TỚI, VÀ ĐÓ LÀ CÓ CHỦ Ý — ghi ra để không ai
  // đọc nó thành mã đang chạy.
  //
  // Chỉ đúng MỘT chủ đề từng có `comprehension` (`travel-transport`), và từ đợt
  // A1 (17/08) chủ đề đó cũng có `storyQuiz` — nhánh `story` ở trên bắt trước nên
  // nhánh này không bao giờ được gọi lúc chạy thật.
  //
  // VẪN GIỮ, vì hai lý do: (1) bộ câu mức CÂU là một loại nội dung hợp lệ, có thể
  // soạn thêm sau — và khi soạn thì lỗi "đáp án nằm lì ở ô đầu" phải đã được sửa
  // sẵn ở đây, không phải sửa lại lần nữa; (2) `tests/core.test.js` và test bằng
  // chứng lịch sử trong `story_quiz.test.js` đều đi qua nhánh này, và bằng chứng
  // "điểm xuất phát thật của N5 là 0/267" nằm ở đó.
  if (Array.isArray(authored) && authored.length > 0) {
    const qs = authoredQuestions(authored, limit);
    if (qs.length >= 1) return qs;
  }
  return autoQuestions(words, limit);
}
