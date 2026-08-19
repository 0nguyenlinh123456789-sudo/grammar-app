// File: src/utils/tronPhuongAn.js
// TRỘN THỨ TỰ PHƯƠNG ÁN TRẢ LỜI, ỔN ĐỊNH THEO KHOÁ CÂU HỎI.
//
// ══ VÌ SAO CÓ FILE NÀY ══
// 2026-08-19, bộ `npm run hoc:that` làm hết một bài đọc thật lần đầu tiên và
// tình cờ đạt 4/4 khi bấm bừa phương án ĐẦU ở cả bốn câu. Đo lại toàn kho thì
// không phải may:
//
//   readingTexts        120/120  câu đáp án ở vị trí đầu (100%)
//   listeningPassages   236/240  (98,3%)
//   bandExamBank         42/42   (100%)  ← THI CUỐI BẬC
//   foundationData      144/144  (100%)  ← bài đầu tiên của người mất gốc
//                       ─────────
//                       542/546 câu
//
// (Bản đo đầu của tôi khai A0 là 288 câu. Sai: mỗi file trong src/data export cả
// `default` lẫn một tên riêng TRỎ VÀO CÙNG MỘT MẢNG, mà phép đo gom
// `Object.values()` nên đếm đôi. Bắt được vì test đòi "≥288 câu" và chỉ đọc ra
// 144 — chốt chặn số lượng lại một lần nữa bắt lỗi của chính phép đo.)
//
// Nghĩa là: **bấm phương án đầu tiên mỗi câu là qua sạch**, không cần đọc, không
// cần nghe. Cổng độ chính xác 85% dựng lên tháng này để chặn "hoàn thành mà
// không đúng" vẫn đứng nguyên — nhưng nó gác một cánh cửa mà ai cũng đi vòng
// được. Nặng nhất là `bandExamBank`: bài THI CUỐI BẬC, thứ dùng để nói người
// học đã qua một bậc.
//
// Bốn kho còn lại (grammarData*, mockTestData, placementBank, Oxford quiz) đo
// ra 16–48% ở vị trí đầu — bình thường. Oxford (`QuizTab`), đọc hiểu chủ đề
// (`utils/comprehension.js`) và bài xác minh nhanh (`utils/quickVerify.js`) đã
// tự trộn sẵn từ trước; file này chỉ vá bốn chỗ chưa có.
//
// ══ VÌ SAO SỬA Ở CHỖ VẼ, KHÔNG SỬA DỮ LIỆU ══
// `readingTexts.js` ghi rõ "SINH TỰ ĐỘNG — đừng sửa tay", nên sửa dữ liệu là
// phải sửa cả bộ sinh, cả kho câu hỏi soạn tay, và vẫn để hở cho nội dung viết
// sau này. Trộn lúc vẽ thì vá được cả lớp lỗi, kể cả nội dung chưa viết.
//
// ══ VÌ SAO TRỘN CỐ ĐỊNH THEO KHOÁ, KHÔNG NGẪU NHIÊN MỖI LẦN ══
//   · Ngẫu nhiên mỗi lần vẽ lại thì phương án nhảy chỗ NGAY TRONG LÚC người học
//     đang đọc chúng — React vẽ lại vì bất kỳ lý do gì là đổi thứ tự.
//   · Cố định theo khoá thì mở lại đúng bài vẫn thấy đúng thứ tự cũ, tức không
//     tệ hơn hiện trạng ở điểm nào, mà mẹo "cứ bấm ô đầu" thì chết hẳn.

// Băm chuỗi → số 32 bit (FNV-1a). Cùng một khoá luôn ra cùng một hạt giống, kể
// cả sau khi tải lại trang hay đổi máy.
function bamKhoa(khoa) {
  let h = 2166136261;
  const s = String(khoa);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32 — nhỏ, không phụ thuộc, đủ đều cho việc xếp bốn phương án.
function tao(hat) {
  let a = hat || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function xepLai(khoa, danhSach) {
  const ds = [...danhSach];
  const r = tao(bamKhoa(khoa));
  for (let i = ds.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [ds[i], ds[j]] = [ds[j], ds[i]];
  }
  return ds;
}

/**
 * Cho màn hình CHẤM THEO GIÁ TRỊ (so `phuongAnChon === cau.a`).
 * Trả về mảng đã trộn; đáp án vẫn là chính chuỗi đó nên không phải sửa gì thêm.
 */
export function tronPhuongAn(khoa, phuongAn) {
  if (!Array.isArray(phuongAn) || phuongAn.length < 2) return phuongAn || [];
  return xepLai(khoa, phuongAn);
}

/**
 * Cho màn hình CHẤM THEO CHỈ SỐ (so `chiSoChon === cau.answer`).
 *
 * Trả về THỨ TỰ CHỈ SỐ GỐC, không trả mảng chữ đã trộn — cố ý, và đây là điểm
 * quan trọng nhất của cả file. Chỗ gọi vẽ `thuTu.map((goc) => …options[goc])`
 * rồi báo về `onChon(goc)`, tức **chỉ số gốc**. Nhờ vậy toàn bộ phần chấm điểm,
 * phần lưu bài làm và phần hiện đáp án (`options[answer]`) không phải sửa một
 * dòng nào — không có chỗ nào để quên ánh xạ ngược.
 *
 * Nếu thay bằng "trả mảng chữ đã trộn", một chỗ gọi quên ánh xạ lại đáp án sẽ
 * **chấm ngược mà không lỗi nào bắn ra**: không sập, không cảnh báo, chỉ là mọi
 * câu đúng thành sai.
 */
export function tronThuTu(khoa, soLuong) {
  const n = Number(soLuong) || 0;
  const goc = Array.from({ length: n }, (_, i) => i);
  return n < 2 ? goc : xepLai(khoa, goc);
}
