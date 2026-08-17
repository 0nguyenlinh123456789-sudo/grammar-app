// File: src/utils/speakingBank.js
// CỬA TRA ĐỀ NÓI THEO CHẶNG (việc 3.5).
//
// Khác kho đề viết ở một điểm: đề nói CHỈ CÓ MỘT LOẠI (sinh theo chặng, B1+),
// chưa có đề soạn tay kèm bài nói mẫu. Nên ở đây không có việc "ghép hai kho" —
// và **không được** giả vờ là có: mọi đề đều `coBaiMau: false`, giao diện nói
// thẳng điều đó.
import { speakingGenerated } from '../data/speakingGenerated.js';
import { CHECKLIST_NOI, NHAN_KIEU_NOI, MO_TA_KIEU_NOI } from './speakingCheck.js';

/** Đưa một bản ghi sinh về hình dạng đề hiển thị được. */
export function deNoiTuChang(task) {
  if (!task) return null;
  const nhieuTu = task.tuMucTieu?.length > 0;
  const batBuocDungTu = nhieuTu && task.soTuPhaiDung > 0;
  const laTomTat = task.nguon === 'nghe' || task.nguon === 'doc';
  const deBai = laTomTat
    ? `Nghe/đọc xong bài “${task.title}”, nói khoảng ${task.giay} giây kể lại nội dung bằng lời của bạn. Đừng đọc lại câu trong bài.`
    : batBuocDungTu
      ? `Nói khoảng ${task.giay} giây về nội dung chặng “${task.title}”, dùng ít nhất ${task.soTuPhaiDung} trong các từ đã học ở chặng này.`
      : `Nói khoảng ${task.giay} giây, dùng điểm ngữ pháp của chặng “${task.title}”. Hãy nói về chuyện thật của bạn, đừng đọc lại câu ví dụ.`;
  return {
    id: task.id,
    kieu: task.kieu,
    nhanKieu: NHAN_KIEU_NOI[task.kieu] || task.kieu,
    moTaKieu: MO_TA_KIEU_NOI[task.kieu] || '',
    bacToiThieu: task.cefr,
    title: task.title,
    deBai,
    giay: task.giay,
    // `tuGoiY` = từ GỢI Ý (mục giải nghĩa của bài); `tuMucTieu` = từ BẮT BUỘC.
    goiY: laTomTat
      ? (task.tuGoiY?.length ? `Có thể dùng các từ đã giải nghĩa trong bài: ${task.tuGoiY.join(', ')}.` : 'Bài này không có mục giải nghĩa, nên hãy tự chọn từ của bạn.')
      : (batBuocDungTu ? `Từ mục tiêu: ${task.tuMucTieu.join(', ')}.` : 'Không có danh sách từ cho chặng ngữ pháp, nên hãy tự chọn tình huống của mình.'),
    soTuToiThieu: task.soTuToiThieu,
    tuMucTieu: task.tuMucTieu || [],
    soTuPhaiDung: task.soTuPhaiDung || 0,
    checklist: CHECKLIST_NOI[task.kieu] || CHECKLIST_NOI.ke,
    checklistLaChung: true,
    // CHƯA CÓ BÀI NÓI MẪU — bài mẫu là nội dung thật, phải người làm ra.
    coBaiMau: false,
    chiKiemDuocDoDai: !!task.chiKiemDuocDoDai,
    // Lý do đi theo dữ liệu, không viết cứng trong giao diện — xem
    // lyDoChiDoDoDai trong writingBank.js để biết vì sao (câu này từng bị chép
    // hai bản với hai cách viết khác nhau, và cả hai đều nói "chặng ngữ pháp").
    lyDoChiDoDoDai: task.chiKiemDuocDoDai ? lyDoChiDoDoDaiNoi(task.nguon) : null,
    theoChang: { type: task.type, targetId: task.targetId, bookId: task.bookId, band: task.band },
  };
}

export function lyDoChiDoDoDaiNoi(nguon) {
  if (nguon === 'nghe' || nguon === 'doc') {
    return `Đây là đề kể lại bài ${nguon === 'nghe' ? 'nghe' : 'đọc'}, nên máy chỉ đếm được số từ nghe được — nó KHÔNG kiểm được bạn kể có đúng nội dung bài hay không.`;
  }
  return 'Đề của chặng ngữ pháp không có danh sách từ, nên máy chỉ đếm được số từ nghe được — nó KHÔNG kiểm được bạn có dùng đúng điểm ngữ pháp hay không.';
}

export function khoaChang(type, targetId, bookId) {
  return `${type}:${bookId || '-'}:${targetId}`;
}

const theoChang = new Map(speakingGenerated.map((t) => [khoaChang(t.type, t.targetId, t.bookId), t]));

// Trả null nếu chặng đó không có đề nói — KHÔNG trả về đề của chặng khác cho
// có. Chặng A0–A2 cố ý không có, và giao diện phải nói đúng lý do đó.
export function deNoiChoChang(milestone) {
  if (!milestone) return null;
  const t = theoChang.get(khoaChang(milestone.type, milestone.targetId, milestone.bookId));
  return t ? deNoiTuChang(t) : null;
}

export const deNoiSinh = speakingGenerated;

export function demDeNoi() {
  return { theoChang: speakingGenerated.length };
}
