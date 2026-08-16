// File: src/utils/writingBank.js
// GHÉP HAI LOẠI ĐỀ VIẾT LÀM MỘT CỬA (việc 3.3) — nhưng KHÔNG trộn lẫn chúng.
//
// Kho đề có hai loại, và chúng KHÁC NHAU Ở MỘT ĐIỀU QUAN TRỌNG:
//
//   A. Đề SOẠN TAY (src/data/writingPrompts.js) — ít, có BÀI MẪU, có checklist
//      viết riêng cho từng đề, có ghi chú chỉ ra vì sao bài mẫu ổn.
//   B. Đề SINH THEO CHẶNG (src/data/writingGenerated.js) — nhiều, gắn với từng
//      chặng lộ trình, KHÔNG CÓ BÀI MẪU. Máy đóng khung nhiệm vụ quanh danh
//      sách từ soạn tay; nó không được bịa ra bài mẫu.
//
// Vì sao không gộp làm một mảng: bài kiểm của loại A đòi mọi đề phải có bài mẫu
// và checklist riêng. Đổ 531 đề loại B vào đó thì buộc phải nới bài kiểm — đúng
// cái nước cờ đã từ chối hai lần (lần trước sửa DỮ LIỆU cho hợp bài kiểm, không
// sửa bài kiểm cho hợp dữ liệu). Hai mảng, hai lời hứa khác nhau, hai bài kiểm.
import { writingPrompts } from '../data/writingPrompts.js';
import { writingGenerated } from '../data/writingGenerated.js';

export const CHECKLIST_CHUNG = {
  cau: [
    'Câu nào của mình cũng có chủ ngữ và động từ chứ?',
    'Mỗi câu đã bắt đầu bằng chữ hoa và kết thúc bằng dấu chấm chưa?',
    'Mình có dùng từ mục tiêu ĐÚNG NGHĨA, hay chỉ nhét vào cho đủ?',
    'Đọc to lên nghe có vấp chỗ nào không?',
  ],
  doan: [
    'Đoạn của mình có một ý chính rõ ràng, hay đang là mấy câu rời?',
    'Các câu có nối được với nhau không, hay câu nào cũng bắt đầu lại từ đầu?',
    'Mình có dùng từ mục tiêu ĐÚNG NGHĨA, hay chỉ nhét vào cho đủ?',
    'Có câu nào mình viết chỉ để cho đủ số từ không?',
  ],
  bai: [
    'Bài của mình có mở – thân – kết, mỗi phần một nhiệm vụ không?',
    'Mỗi ý có kèm một lý do hoặc ví dụ, chứ không chỉ là câu khẳng định suông?',
    'Mình có dùng từ mục tiêu ĐÚNG NGHĨA, hay chỉ nhét vào cho đủ?',
    'Đoạn kết có nói lại lập trường mà không chép nguyên đoạn mở không?',
    'Có câu nào mình viết chỉ để cho đủ số từ không?',
  ],
};

// Checklist của đề sinh là CHUNG cho cả một kiểu đề, và phải nói rõ như vậy.
// Một bảng tiêu chí giống hệt nhau ở 531 đề mà giả vờ là viết riêng cho từng đề
// thì chính là nội dung khuôn mẫu.
export const GHI_CHU_CHECKLIST_CHUNG = 'Bảng tiêu chí này dùng chung cho mọi đề cùng kiểu — nó không được viết riêng cho đề này.';

const KIEU_LABEL = { cau: 'câu', doan: 'đoạn', bai: 'bài' };

// Đưa đề sinh về CÙNG HÌNH DẠNG với đề soạn tay, để một bộ kiểm duy nhất
// (kiemTraDeViet) chạy được cho cả hai. Điểm khác duy nhất được giữ nguyên và
// nói thẳng: `coBaiMau: false`.
export function deTuChang(task) {
  if (!task) return null;
  const nhieuTu = task.tuMucTieu?.length > 0;
  const deBai = nhieuTu
    ? `Viết một ${KIEU_LABEL[task.kieu]} dài ${task.soTuToiThieu}–${task.soTuToiDa} từ về nội dung chặng “${task.title}”, dùng ít nhất ${task.soTuPhaiDung} trong các từ đã học ở chặng này.`
    : `Viết ${task.soTuToiThieu}–${task.soTuToiDa} từ, dùng điểm ngữ pháp của chặng “${task.title}”. Hãy viết về chuyện thật của bạn, đừng chép câu ví dụ.`;
  return {
    id: task.id,
    kieu: task.kieu,
    bacToiThieu: task.cefr,
    title: task.title,
    deBai,
    goiY: nhieuTu
      ? `Từ mục tiêu: ${task.tuMucTieu.join(', ')}.`
      : 'Không có danh sách từ cho chặng ngữ pháp, nên hãy tự chọn tình huống của mình.',
    yeuCau: {
      soTuToiThieu: task.soTuToiThieu,
      soTuToiDa: task.soTuToiDa,
      tuBatBuoc: [],
      tuTuChon: nhieuTu ? { danhSach: task.tuMucTieu, soLuong: task.soTuPhaiDung } : null,
      moTaTuBatBuoc: nhieuTu
        ? `Dùng ít nhất ${task.soTuPhaiDung} trong ${task.tuMucTieu.length} từ: ${task.tuMucTieu.join(', ')}.`
        : 'Đề này máy chỉ kiểm được số từ.',
    },
    checklist: CHECKLIST_CHUNG[task.kieu] || CHECKLIST_CHUNG.doan,
    checklistLaChung: true,
    // KHÔNG CÓ BÀI MẪU — và giao diện phải nói ra, không lặng lẽ thiếu.
    coBaiMau: false,
    chiKiemDuocDoDai: !!task.chiKiemDuocDoDai,
    theoChang: { type: task.type, targetId: task.targetId, bookId: task.bookId, band: task.band },
  };
}

const theoChang = new Map(writingGenerated.map((t) => [khoaChang(t.type, t.targetId, t.bookId), t]));

export function khoaChang(type, targetId, bookId) {
  return `${type}:${bookId || '-'}:${targetId}`;
}

// Tra đề viết của một chặng lộ trình. Trả null nếu chặng đó không có đề —
// KHÔNG trả về một đề của chặng khác cho có. (Gán bừa nội dung cho một chặng
// rồi gọi là "nội dung của chặng này" đúng là lý do cách đo N4 cũ bị bỏ.)
export function deChoChang(milestone) {
  if (!milestone) return null;
  const t = theoChang.get(khoaChang(milestone.type, milestone.targetId, milestone.bookId));
  return t ? deTuChang(t) : null;
}

export const deSoanTay = writingPrompts;
export const deSinh = writingGenerated;

export function demDe() {
  return { soanTay: writingPrompts.length, theoChang: writingGenerated.length };
}
