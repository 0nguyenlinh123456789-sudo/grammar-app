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
  const deBai = nhieuTu
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
    goiY: nhieuTu
      ? `Từ mục tiêu: ${task.tuMucTieu.join(', ')}.`
      : 'Không có danh sách từ cho chặng ngữ pháp, nên hãy tự chọn tình huống của mình.',
    soTuToiThieu: task.soTuToiThieu,
    tuMucTieu: task.tuMucTieu || [],
    soTuPhaiDung: task.soTuPhaiDung || 0,
    checklist: CHECKLIST_NOI[task.kieu] || CHECKLIST_NOI.ke,
    checklistLaChung: true,
    // CHƯA CÓ BÀI NÓI MẪU — bài mẫu là nội dung thật, phải người làm ra.
    coBaiMau: false,
    chiKiemDuocDoDai: !!task.chiKiemDuocDoDai,
    theoChang: { type: task.type, targetId: task.targetId, bookId: task.bookId, band: task.band },
  };
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
