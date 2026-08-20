// File: src/data/bandExamIndex.js
// SINH TỰ ĐỘNG bởi scripts/build_band_exam_index.mjs — đừng sửa tay.
//
// VÌ SAO CÓ FILE NÀY: lộ trình ở trang chủ cần biết "hết bậc này thì thi đề
// nào" để dựng cửa ải cuối bậc. Import thẳng `bandExamBank.js` để lấy đúng cái
// tên đề là kéo ~50 KB đề thi vào chunk mà AI MỞ APP CŨNG PHẢI TẢI — đúng cái
// đã đo và đã tách ra ở kho bài nghe (~398 KB) và kho đề viết (~170 KB).
//
// `tests/band_exam.test.js` đối chiếu bảng này với kho thật; lệch một chữ là đỏ.
export const BAND_EXAM_INDEX = {
  starter: {"id":"exam-a1","cefr":"A1","nhan":"A1","ten":"Thi cuối bậc A1","phut":20,"soCauChamDuoc":14},
  elementary: {"id":"exam-a2","cefr":"A2","nhan":"A2","ten":"Thi cuối bậc A2","phut":25,"soCauChamDuoc":14},
  intermediate: {"id":"exam-b1","cefr":"B1","nhan":"B1","ten":"Thi cuối bậc B1","phut":30,"soCauChamDuoc":14},
  upper_intermediate: {"id":"exam-b2","cefr":"B2","nhan":"B2","ten":"Thi cuối bậc B2","phut":40,"soCauChamDuoc":14},
  advanced: {"id":"exam-c1","cefr":"C1","nhan":"Nền C1","ten":"Kiểm tra nền C1","phut":45,"soCauChamDuoc":14},
};

/**
 * NHÃN CÔNG BỐ theo mã bậc — thứ được phép in ra giấy.
 *
 * Có bảng này vì chuanHoa() trong bandExam.js phải xử lý bản ghi CŨ, tức là
 * bản ghi thiếu nhanIn. Rơi về k.cefr thì một bản ghi bậc C1 in ra chữ
 * "C1" trần — đúng cái nói quá mà cả đề nền C1 dựng lên để tránh. Ở đây thì
 * nó tra đúng "Nền C1" như mọi bản ghi mới.
 */
export const NHAN_THEO_CEFR = {
  "A1": "A1",
  "A2": "A2",
  "B1": "B1",
  "B2": "B2",
  "C1": "Nền C1",
};

/**
 * LỜI GIẢI NGHĨA đi kèm nhãn, tra theo mã bậc.
 *
 * Đã dính thật: bản ghi cũ (thiếu nhanIn) đi qua chuanHoa() thì tra ra đúng
 * nhãn "Nền C1", nhưng ghiChuBac rơi về null — nên tờ giấy in một cái nhãn
 * lạ mà không nói nó nghĩa là gì. Bộ lái trình duyệt bắt được ở đúng bước
 * mở tờ chứng nhận. Nhãn và lời giải nghĩa phải đi cùng nhau, luôn.
 */
export const GHI_CHU_THEO_CEFR = {
  "C1": "Đạt đề này nghĩa là phần NGHE và ĐỌC của bạn đã làm được ở mức trên B2 — đủ nền để đi tiếp lên C1. Nó KHÔNG có nghĩa bạn đã đạt C1: một bậc C1 đầy đủ còn cần cả phần nói và viết được người có chuyên môn chấm, mà ứng dụng này không làm được.",
};

/** Bậc này có đề thi cuối bậc không? Bậc A0 (foundation) cố ý KHÔNG có. */
export const deThiCuaBac = (band) => BAND_EXAM_INDEX[band] || null;

export default BAND_EXAM_INDEX;
