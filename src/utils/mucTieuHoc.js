// File: src/utils/mucTieuHoc.js
// MỤC TIÊU HỌC — LÀM CHO CÂU TRẢ LỜI Ở MÀN ĐẦU TIÊN CÓ HẬU QUẢ.
//
// ══ LỖ ĐÃ CÓ ══
// Trình hướng dẫn hỏi "cậu học tiếng Anh để làm gì?", lưu câu trả lời vào
// `learningGoalV1`, rồi **không ai đọc nó nữa**. `getLearningGoal()` có 0 nơi
// gọi. Người chọn "Thi VSTEP" và người chọn "Giao tiếp" nhận y hệt một lộ
// trình 710 chặng. Hỏi một câu rồi vứt câu trả lời đi còn tệ hơn không hỏi:
// người học tin rằng họ vừa cá nhân hoá thứ gì đó.
//
// ══ CÁI FILE NÀY LÀM, VÀ CÁI NÓ CỐ Ý KHÔNG LÀM ══
// LÀM: nói được chặng nào PHỤC VỤ mục tiêu nào, để lộ trình lọc ra được "phần
//   quan trọng nhất với riêng bạn" và đếm ra con số thật.
// KHÔNG LÀM: **không xếp lại thứ tự học, không bỏ chặng nào.** Thứ tự các chặng
//   là thứ tự sư phạm — hiện tại đơn phải trước hiện tại hoàn thành dù mục tiêu
//   là gì. Đảo thứ tự theo mục tiêu là để cái người học MUỐN quyết định cái họ
//   CẦN, và đó là cách hỏng nhanh nhất của một lộ trình.
//
// Nên phép lọc ở đây là **một cách NHÌN**, không phải một lộ trình khác. Giao
// diện phải nói đúng như vậy, và có nút tắt.

const GOAL_KEY = 'learningGoalV1';

/**
 * Mỗi mục tiêu khai HAI thứ và không khai gì hơn:
 *   `loai`  — những loại chặng phục vụ trực tiếp mục tiêu đó;
 *   `viSao` — nói cho người học biết vì sao đúng những loại đó, để họ cãi lại
 *             được nếu thấy sai. Một bộ lọc không giải thích mình lọc theo gì
 *             thì người dùng không có cách nào biết nó có đang giấu mất thứ họ
 *             cần hay không.
 *
 * `chiKhiCoIelts` đánh dấu mục tiêu chỉ tồn tại khi cụm IELTS Nền Tảng hiện ra
 * — trên bản khách cụm đó bị ẨN, nên mời người ta chọn nó là hứa một thứ không
 * có ở đó.
 */
export const MUC_TIEU = {
  beginner: {
    nhan: 'Lấy lại gốc',
    // BẢN ĐẦU CỦA DÒNG NÀY BỎ QUÊN 'listening' — tức là người mất gốc bật lọc
    // lên là mất sạch 60 bài nghe. Nghe là kỹ năng người Việt yếu nhất và là
    // thứ cần vào sớm nhất, không phải thứ để sau. Giữ lại đây làm ghi chú vì
    // đó đúng là kiểu sai dễ lặp: chọn loại chặng theo cảm giác "cái gì cơ bản",
    // thay vì theo cái người học thiếu.
    loai: ['grammar', 'vstep', 'dictation', 'listening'],
    viSao: 'Mất gốc thì cần ngữ pháp nền, vốn từ thông dụng, và tai nghe ra tiếng Anh. Làn này TẠM ẨN bộ giáo trình Oxford và các bài đọc 600–1.000 từ — hai thứ nặng tính học thuật, để sau chứ không bỏ.',
  },
  communication: {
    nhan: 'Giao tiếp',
    loai: ['listening', 'dictation', 'vstep', 'grammar'],
    viSao: 'Nói được trước hết cần NGHE ra và có từ để dùng; chép chính tả là cầu nối giữa nghe và viết. Làn này TẠM ẨN bộ Oxford và bài đọc dài — giống làn “Lấy lại gốc”, vì với kho hiện có thì hai mục tiêu này thật sự cần cùng một phần nội dung. Khác nhau nằm ở CHỖ BẮT ĐẦU, và chỗ đó do bài kiểm tra đầu vào quyết định, không phải do làn này.',
  },
  vstep: {
    nhan: 'Thi VSTEP',
    // ĐÃ DÍNH LẦN THỨ BA, cùng một kiểu. Bản trước bỏ quên 'dictation' — và đó
    // KHÔNG phải mất 9 chặng lẻ: chép chính tả là TOÀN BỘ phần nghe của bậc A1
    // và A2 (hai bậc đó có `listening: 0`). Người mất gốc chọn "Thi VSTEP" —
    // một lựa chọn rất hợp lý — là bật lọc lên mất sạch phần nghe của hai bậc
    // đầu, trong khi đề `exam-a1` và `exam-a2` mỗi đề có 6 câu nghe.
    loai: ['grammar', 'vstep', 'reading', 'listening', 'dictation'],
    viSao: 'VSTEP thi đủ bốn kỹ năng với trọng số đều nhau, nên gần như cả lộ trình đều phục vụ mục tiêu này — trừ bộ giáo trình Oxford, vốn nặng về từ vựng học thuật hơn là dạng đề.',
  },
  ielts: {
    nhan: 'Thi IELTS',
    // Bản đầu bỏ quên 'vstep' — tức là ẩn mất 267 chặng từ vựng của người ôn
    // IELTS. Lỗi giống hệt làn "Lấy lại gốc" bỏ quên bài nghe, và cả hai đều
    // đến từ việc chọn loại chặng theo cảm giác "cái gì hợp mục tiêu này" thay
    // vì hỏi "bỏ cái này đi thì người học mất gì".
    // Bỏ quên 'dictation' ở đây cũng là bỏ mất toàn bộ phần nghe của A1/A2 —
    // xem ghi chú ở làn VSTEP ngay trên.
    loai: ['oxford', 'reading', 'listening', 'grammar', 'vstep', 'dictation'],
    viSao: 'IELTS đòi vốn từ học thuật và sức đọc bài dài, nên bộ Oxford và bài đọc 600–1.000 từ là phần nặng ký nhất. Với kho hiện có thì GẦN NHƯ TOÀN BỘ lộ trình phục vụ mục tiêu này, nên bật lọc gần như không ẩn gì — nói thẳng ra thay vì nặn một khác biệt giả.',
    chiKhiCoIelts: true,
  },
};

export const laMucTieuHopLe = (g) => Object.prototype.hasOwnProperty.call(MUC_TIEU, g);

/** Đọc mục tiêu đã lưu. Trả về '' nếu chưa chọn hoặc đã lưu một giá trị lạ. */
export function docMucTieu() {
  try {
    const g = localStorage.getItem(GOAL_KEY) || '';
    return laMucTieuHopLe(g) ? g : '';
  } catch { return ''; }
}

/**
 * Đổi mục tiêu. Trình hướng dẫn chỉ chạy MỘT LẦN, nên nếu không có đường đổi
 * thì câu trả lời ở phút đầu tiên khoá người học lại vĩnh viễn — trong khi mục
 * tiêu học là thứ đổi thường xuyên nhất.
 */
export function luuMucTieu(g) {
  if (!laMucTieuHopLe(g) && g !== '') return false;
  try {
    if (g === '') localStorage.removeItem(GOAL_KEY);
    else localStorage.setItem(GOAL_KEY, g);
    return true;
  } catch { return false; }
}

/** Chặng này có phục vụ mục tiêu đang chọn không? Chưa chọn mục tiêu ⇒ TẤT CẢ đều phục vụ. */
export function phucVuMucTieu(milestone, goal) {
  const m = MUC_TIEU[goal];
  if (!m) return true;
  return m.loai.includes(milestone?.type);
}

/**
 * Đếm thật: mục tiêu này phủ bao nhiêu chặng trong tổng số.
 *
 * Con số này ĐI RA GIAO DIỆN, nên nó phải đếm trên đúng dữ liệu lộ trình chứ
 * không phải một ước lượng. Bộ lọc khoe "phục vụ mục tiêu của bạn" mà không nói
 * được nó bỏ đi bao nhiêu chặng thì người học không biết mình đang mất gì.
 */
export function demTheoMucTieu(milestones, goal) {
  const tong = milestones.length;
  if (!MUC_TIEU[goal]) return { tong, hop: tong, bo: 0 };
  const hop = milestones.filter((m) => phucVuMucTieu(m, goal)).length;
  return { tong, hop, bo: tong - hop };
}

/**
 * Danh sách mục tiêu ĐƯỢC PHÉP mời chọn.
 *
 * Cụm IELTS Nền Tảng bị ẩn trên bản khách (`utils/localOnly.js`), nhưng trình
 * hướng dẫn vẫn mời chọn "🎯 Thi IELTS — Chinh phục band điểm mơ ước" ở màn
 * hình ĐẦU TIÊN người mua nhìn thấy. Chọn xong thì không có cụm IELTS nào để
 * vào. Đó là hứa một thứ không có ở đó, đúng loại đã gỡ ở khắp nơi khác.
 */
export function mucTieuChonDuoc(coIelts) {
  return Object.entries(MUC_TIEU)
    .filter(([, v]) => !v.chiKhiCoIelts || coIelts)
    .map(([id, v]) => ({ id, ...v }));
}

export const MUC_TIEU_KEY = GOAL_KEY;
