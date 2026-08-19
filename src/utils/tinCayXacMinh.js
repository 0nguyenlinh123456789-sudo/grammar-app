// File: src/utils/tinCayXacMinh.js
// GỠ CÁC TUYÊN BỐ "ĐÃ XÁC MINH" KIẾM ĐƯỢC KHI ĐÁP ÁN CÒN NẰM Ở Ô ĐẦU.
//
// ══ VÌ SAO ══
// Tới 19/08/2026, bốn kho câu hỏi để đáp án đúng ở ô ĐẦU gần như mọi câu: bài
// đọc dài 120/120, bài nghe 236/240, THI CUỐI BẬC 42/42, bài A0 144/144. Bấm ô
// đầu tiên là qua sạch. Bản vá `utils/tronPhuongAn.js` chặn từ nay trở đi, nhưng
// **những tuyên bố đã lưu trước đó vẫn đứng nguyên** — và chúng là loại tuyên bố
// nói với người ngoài rằng người học làm được: chặng "đã xác minh" là điều kiện
// cấp chứng nhận, `bacDaDat` là câu "bạn đã đạt bậc B1".
//
// ══ BA LỰA CHỌN, VÀ VÌ SAO CHỌN CÁI NÀY ══
//   (a) Để nguyên — nhanh nhất, nhưng giữ lại đúng thứ cả tháng nay đang dọn:
//       phần thưởng rỗng. Loại.
//   (b) Xoá sạch `milestoneScoresV1` — phá cả những bản ghi THẬT. Ngữ pháp B1/B2,
//       Oxford, đọc hiểu chủ đề và bài xác minh nhanh đều đã trộn phương án từ
//       trước; bản ghi của chúng kiếm được đàng hoàng. Xoá là phạt người vô can.
//   (c) Chỉ gỡ đúng phần dính lỗi. Chọn cái này.
//
// ══ HAI KHO LƯU, HAI CÁCH XỬ LÝ KHÁC NHAU ══
// Bài thi cuối bậc KHÔNG ghi vào `milestoneScoresV1` — nó có sổ riêng
// (`bandExamHistoryV1`, qua `utils/bandExam.js`). Nếu chỉ dọn một kho thì kho
// nặng nhất lọt qua khe giữa hai kho.
//
//   · `milestoneScoresV1` → GỠ BẢN GHI. Chặng trở về "⏳ chưa xác minh", đúng cái
//     trạng thái app đã có sẵn, và đã có sẵn đường quay lại: bài xác minh nhanh.
//     Chỉ mất phần trăm cũ — thứ vốn không đáng tin.
//   · `bandExamHistoryV1` → GIỮ NGUYÊN BẢN GHI, chỉ thôi dùng nó làm CĂN CỨ
//     TUYÊN BỐ. Sổ thi là nhật ký của người học, xoá đi là xoá lịch sử họ đã làm.
//     Chỉ có hai hàm đọc nó để tuyên bố (`luotDatGanNhat`, `bacDaDat`), chặn ở đó
//     là đủ mà không phá gì.
//
// KHÔNG ĐỘNG VÀO `completedMilestones`: chặng vẫn hoàn thành, % lộ trình, XP,
// chuỗi ngày, huy hiệu chuyên cần giữ nguyên. Người học đã bỏ thời gian ngồi làm;
// thứ không đáng tin là LỜI TUYÊN BỐ về độ chính xác, không phải công sức.

import { MASTERY_STORAGE_KEY, loadScores } from './mastery.js';

// Lúc `tronPhuongAn` lên bản. Mọi bản ghi có trước mốc này đều kiếm được trên bộ
// đề còn xếp đáp án ở ô đầu.
export const MOC_TRON_PHUONG_AN = '2026-08-19T00:00:00.000Z';
export const CO_DA_GO_KEY = 'xacMinhGoTheoTronPhuongAnV1';
export const SO_DA_GO_KEY = 'xacMinhGoSoLuongV1';
export const DA_BAO_KEY = 'xacMinhGoDaBaoV1';

/**
 * Các chặng thuộc bốn kho dính lỗi, SUY RA TỪ LỘ TRÌNH chứ không dò tiền tố id.
 *
 * Tiền tố (`voa-doc-`…) là thứ đổi được trong một đợt dọn nội dung, mà đoạn mã này
 * chạy ĐÚNG MỘT LẦN trên máy mỗi người — dò sai thì không có lần thứ hai để sửa.
 */
export function changAnhHuong(roadmapData) {
  const ds = new Set();
  for (const bac of roadmapData || []) {
    for (const m of bac.milestones || []) {
      const laNgheDoc = m.type === 'reading' || m.type === 'listening';
      const laA0 = bac.level === 'foundation' && m.type === 'grammar';
      if (laNgheDoc || laA0) ds.add(m.targetId);
    }
  }
  return ds;
}

/**
 * Gỡ bản ghi điểm của các chặng dính lỗi, chỉ những bản ghi CÓ TRƯỚC mốc.
 * Thuần: nhận vào, trả ra, không đụng kho lưu.
 */
export function goBanGhiCu(scores, idsAnhHuong, moc = MOC_TRON_PHUONG_AN) {
  const moi = {};
  const daGo = [];
  for (const [id, ban] of Object.entries(scores || {})) {
    // Bản ghi KHÔNG có ngày thì coi như cũ. Đây là chỗ dễ nương tay nhất và cũng
    // là chỗ không được nương: bản ghi không ghi ngày thì không chứng minh được
    // nó có sau bản vá, mà tuyên bố không chứng minh được thì không phải tuyên bố.
    const truocMoc = !ban?.passedAt || String(ban.passedAt) < moc;
    if (idsAnhHuong?.has?.(id) && truocMoc) { daGo.push(id); continue; }
    moi[id] = ban;
  }
  return { scores: moi, daGo };
}

/** Đã dọn chưa. Chạy đúng một lần cho mỗi máy. */
export function daGoRoi(storage) {
  try { return !!storage?.getItem(CO_DA_GO_KEY); } catch { return false; }
}

/**
 * Chạy một lần: gỡ, ghi lại, cắm cờ. Trả về số chặng đã gỡ để màn hình biết có
 * cần báo cho người học hay không.
 */
export function goMotLan(storage, roadmapData, moc = MOC_TRON_PHUONG_AN) {
  if (daGoRoi(storage)) return { daGo: [], daChay: false };
  const { scores, daGo } = goBanGhiCu(loadScores(storage), changAnhHuong(roadmapData), moc);
  try {
    if (daGo.length) storage?.setItem(MASTERY_STORAGE_KEY, JSON.stringify(scores));
    // GHI LẠI SỐ LƯỢNG, không chỉ cắm cờ. Nếu chỉ giữ con số trong bộ nhớ phiên
    // này thì người học tải lại trang trước khi kịp đọc sẽ MẤT LUÔN lời báo — và
    // im lặng gỡ bản ghi của người ta đúng là thứ luật "không thay thế âm thầm"
    // cấm.
    storage?.setItem(SO_DA_GO_KEY, String(daGo.length));
    storage?.setItem(CO_DA_GO_KEY, new Date().toISOString());
  } catch { /* hết chỗ lưu thì lần sau chạy lại, không sao */ }
  return { daGo, daChay: true, scores };
}

/** Số chặng đã gỡ mà người học CHƯA được báo. 0 nghĩa là không cần hiện gì. */
export function canBao(storage) {
  try {
    if (storage?.getItem(DA_BAO_KEY)) return 0;
    return Number(storage?.getItem(SO_DA_GO_KEY)) || 0;
  } catch { return 0; }
}

export function daBaoRoi(storage, nowIso) {
  try { storage?.setItem(DA_BAO_KEY, nowIso || new Date().toISOString()); } catch { /* thôi */ }
}
