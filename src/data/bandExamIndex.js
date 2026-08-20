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

/** Bậc này có đề thi cuối bậc không? Bậc A0 (foundation) cố ý KHÔNG có. */
export const deThiCuaBac = (band) => BAND_EXAM_INDEX[band] || null;

export default BAND_EXAM_INDEX;
