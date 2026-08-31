// File: src/utils/grammarClean.js
// ẨN BÀI TẬP NGỮ PHÁP KHÔNG LÀM ĐƯỢC (phát hiện khi làm việc 5.2).
//
// ══ ĐÃ VÁ 31/08 — HÀM NÀY NAY LÀ CHỐT DỰ PHÒNG, KHÔNG CÒN LỌC GÌ ══
// Số đo lúc phát hiện (việc 5.2) và số đo sau khi vá:
//
//   bộ bài      | sửa lỗi "lỗi"≡"sửa" | viết lại đáp án ≡ đề | câu giữ chỗ
//   B1 (28 bài) |        0/165        |        0/119         |     0
//   B2 (25 bài) |        0/125        |        0/75          |     0
//   C1+ TRƯỚC   |       73/125        |       75/75          |    60
//   C1+ SAU     |        0/125        |        0/75          |     0
//
// Hỏng nằm gọn trong nhánh C1 — không người học nào trên đường B2, tức đích cam
// kết của sản phẩm, chạm phải. Nhưng nó làm bậc C1+ mỏng đi một cách lặng lẽ:
// lọc xong thì cả 25/25 bài MẤT HẲN tab "Viết Lại", và bài sửa lỗi chỉ còn 42%.
// 168 câu thay thế đã được SOẠN TAY (scripts/data/c1_bai_tap*.json, áp bằng
// scripts/va_c1_bai_tap.mjs), nên nay C1+ đủ 125/75/150 như B1 và B2.
//
// Hỏng thế nào (giữ lại để nhận mặt nếu đợt sinh nội dung sau tái phạm):
//   • Viết lại  : `original` và `a` GIỐNG HỆT nhau từng ký tự. Đề bảo "viết lại
//                 câu giữ nguyên nghĩa", đáp án là chính câu đó.
//   • Sửa lỗi   : `errorWord` và `correction` GIỐNG HỆT nhau — không có lỗi nào
//                 để sửa. Lời giải thích thì rỗng: "Trong ngữ cảnh này phải
//                 dùng 'should'."
//   • Câu giữ chỗ: "This is a C1/C2 level practice sentence." lọt ra bản chạy.
//
// GIỮ HÀM NÀY dù nay nó không lọc gì: nó là lưới an toàn nếu dữ liệu lại hỏng.
// Thứ CANH cho việc đó không tái diễn là tests/bai_tap_lam_duoc.test.js — chạy
// trong `npm test`, đỏ ngay khi có câu không làm được ở bất kỳ bậc nào.
//
// ══ ẨN, KHÔNG XOÁ ══
// Luật của dự án: "Thiếu dữ liệu thì ẨN hoặc BÁO, tuyệt đối không thay thế âm
// thầm." Lọc lúc ĐỌC nên:
//   • 52 câu sửa lỗi LÀM ĐƯỢC nằm cùng mảng vẫn còn nguyên (ví dụ "Not until he
//     left do I realize the truth." → `did`) — một bộ xoá phải đoán đúng câu nào
//     là câu nào, vĩnh viễn;
//   • không đụng một byte nào của dữ liệu soạn tay, bật lại chỉ là bỏ một hàm.
// Mảng rỗng thì `GrammarPage` tự giấu tab (availableTabs lọc `data.length > 0`).

/** Câu giữ chỗ lọt ra bản chạy — kể tên nguyên văn, không đoán theo mẫu. */
const CAU_GIU_CHO = [
  'This is a C1/C2 level practice sentence.',
  'This is a C1/C2 level practice _____.',
];
const laGiuCho = (s) => CAU_GIU_CHO.includes(String(s || '').trim());

const bang = (a, b) => String(a ?? '').trim() === String(b ?? '').trim();

/** Câu sửa lỗi mà "từ sai" trùng "từ sửa" thì không có gì để sửa. */
export function suaLoiLamDuoc(e) {
  if (!e || laGiuCho(e.sentence)) return false;
  return !bang(e.errorWord, e.correction);
}

/** Câu viết lại mà đáp án trùng đề thì không có gì để viết lại. */
export function vietLaiLamDuoc(e) {
  if (!e || laGiuCho(e.original)) return false;
  return !bang(e.original, e.a);
}

export function dienVaoLamDuoc(e) {
  return !!e && !laGiuCho(e.q);
}

/**
 * Trả về bài ngữ pháp đã bỏ các câu không làm được. Hàm THUẦN — gọi lúc render,
 * không sinh ra bản thứ hai của dữ liệu (bài học đã trả giá ba lần trong chuỗi
 * dọn nội dung này).
 */
export function locBaiHong(topic) {
  if (!topic) return topic;
  const ec = (topic.errorCorrection || []).filter(suaLoiLamDuoc);
  const tf = (topic.transformation || []).filter(vietLaiLamDuoc);
  const fb = (topic.fillBlanks || []).filter(dienVaoLamDuoc);
  const doi = ec.length !== (topic.errorCorrection || []).length
    || tf.length !== (topic.transformation || []).length
    || fb.length !== (topic.fillBlanks || []).length;
  if (!doi) return topic;
  return { ...topic, errorCorrection: ec, transformation: tf, fillBlanks: fb };
}

/** Đếm câu bị ẩn — dùng cho báo cáo và cho test, không phải con số viết tay. */
export function demBiAn(topic) {
  const truoc = (k) => (topic?.[k] || []).length;
  const sau = locBaiHong(topic);
  return {
    suaLoi: truoc('errorCorrection') - (sau?.errorCorrection || []).length,
    vietLai: truoc('transformation') - (sau?.transformation || []).length,
    dienVao: truoc('fillBlanks') - (sau?.fillBlanks || []).length,
  };
}
