// File: src/utils/speakingCheck.js
// KIỂM LƯỢT NÓI (việc 3.5) — CHỈ trả về những SỰ THẬT KIỂM ĐƯỢC.
//
// ══ ĐIỀU PHẢI NÓI THẲNG TRƯỚC MỌI THỨ KHÁC ══
// Trình duyệt (Web Speech API) trả về **VĂN BẢN nó nghe được**. Nó KHÔNG trả về
// đánh giá phát âm. Từ một chuỗi văn bản không suy ra được người nói phát âm
// thế nào — nên ở đây **không có, và sẽ không có, điểm phát âm**.
//
// Nhãn cũ của mục đọc to đã nói đúng điều này từ trước ("trình duyệt nghe ra
// đúng từ này", không phải "bạn phát âm đúng"). Panel mới phải giữ đúng mức đó.
// Cái micro làm người ta tưởng đang được đo — đó chính là lý do phải cẩn thận
// gấp đôi ở đây chứ không phải ít hơn.
//
// ══ VÌ SAO KHỚP TỪ CHÍNH XÁC, KHÔNG DÙNG `isSpeechMatch` ══
// `isSpeechMatch` so gần đúng (ngưỡng 0,8 / 0,95 cho từ ngắn) và được viết cho
// bài đọc to MỘT TỪ, nơi cả câu người ta nói CHÍNH LÀ đáp án. Ở đây người học
// nói 60–120 giây; so gần đúng trên một đoạn dài sẽ cho "bargain" ăn điểm nhờ
// "began". Sự thật kiểm được ở đây hẹp hơn và phải phát biểu đúng như nó là:
// **bản chữ trình duyệt nghe được CÓ CHỨA từ này**.
//
// Và ngay cả sự thật đó cũng yếu hơn vẻ ngoài: Web Speech tự nắn kết quả về
// phía từ có trong từ điển, nên nó có thể ghi ra một từ mà người học phát âm
// không ai hiểu nổi. Vì vậy `khongKiemDuoc` phải được hiện ra cùng lúc, không
// phải giấu trong phần trợ giúp.
//
// ══ KHÔNG GHI VÀO SỔ LỖI ══
// `scoreWriting` ghi lỗi chính tả vào ngân hàng lỗi. Bộ này KHÔNG ghi gì cả:
// một từ trình duyệt nghe nhầm KHÔNG PHẢI lỗi chính tả của người học, và cũng
// không phải bằng chứng của lỗi phát âm. Đổ nó vào sổ lỗi là tạo ra thẻ ôn tập
// cho một lỗi có thể chưa từng xảy ra.

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * @param {string} banChu bản chữ TRÌNH DUYỆT nghe được (không phải bản ghi âm)
 * @param {object} de     một đề trong speakingGenerated.js
 */
export function kiemTraLuotNoi(banChu, de) {
  const raw = String(banChu || '').trim();
  const lower = raw.toLowerCase();
  const soTu = raw ? raw.split(/\s+/).filter(Boolean).length : 0;

  const min = Number(de?.soTuToiThieu) || 0;
  const doDai = {
    soTu,
    min,
    dat: soTu >= min,
    thieu: soTu < min ? min - soTu : 0,
  };

  const ds = (de?.tuMucTieu || []).map((t) => String(t).toLowerCase());
  const can = Number(de?.soTuPhaiDung) || 0;
  // Khớp theo BIÊN TỪ ở đầu từ, cùng luật với bộ kiểm bài viết: "warm" tính cả
  // "warmth" (cùng họ từ, ở dạng người học vừa học) nhưng "sun" không ăn điểm
  // nhờ "Sunday".
  const daNghe = ds.filter((t) => new RegExp(`\\b${esc(t)}`, 'i').test(lower));
  const tuMucTieu = ds.length
    ? { danhSach: ds, daNghe, can, con: Math.max(0, can - daNghe.length), dat: daNghe.length >= can }
    : null;

  return {
    doDai,
    tuMucTieu,
    // Cờ để giao diện KHÔNG BAO GIỜ trình bày phần trên như một điểm số.
    laSuThatKiemDuoc: true,
    // Nguồn của mọi con số ở trên. Người học phải biết đây là máy nghe, không
    // phải người nghe.
    nguon: 'Đây là những gì TRÌNH DUYỆT nghe ra được, không phải đánh giá phát âm.',
    khongKiemDuoc: [
      'phát âm từng âm (máy không chấm âm vị)',
      'trọng âm từ và trọng âm câu',
      'ngữ điệu, chỗ ngắt nghỉ',
      'tốc độ nói và độ trôi chảy',
      'người nghe thật có hiểu bạn không',
    ],
  };
}

// Nhận xét bằng key Gemini của chính khách — phần THÊM, không phải phần nền.
// Gửi lên là BẢN CHỮ, không phải âm thanh; lời nhắc ở phía máy chủ nói rõ điều
// đó với mô hình và cấm nó chấm phát âm.
export async function nhanXetLuotNoiBangAI(banChu, { topicTitle = '' } = {}) {
  const { requestAi } = await import('./aiClient.js');
  const data = await requestAi('speaking', { text: banChu, topicTitle });
  return data.text;
}

export const NHAN_KIEU_NOI = {
  ke: 'Kể lại',
  trinh_bay: 'Trình bày',
  lap_luan: 'Lập luận',
};

export const MO_TA_KIEU_NOI = {
  ke: 'Kể lại một chuyện có thật của bạn, theo trình tự trước – sau.',
  trinh_bay: 'Trình bày một chủ đề: nêu ý chính rồi giải thích bằng ví dụ.',
  lap_luan: 'Nêu lập trường của bạn, đưa lý do, và nói cả mặt ngược lại.',
};

// Bảng tiêu chí dùng CHUNG cho cả một kiểu đề — và phải tự khai là dùng chung.
// Một bảng giống hệt nhau ở 386 đề mà giả vờ viết riêng cho từng đề thì chính là
// nội dung khuôn mẫu, đúng thứ cả chuỗi này đang xoá.
export const CHECKLIST_NOI = {
  ke: [
    'Mình có nói thành câu trọn vẹn, hay chỉ liệt kê từ rời?',
    'Câu chuyện có trình tự trước – sau rõ ràng không?',
    'Mình có dùng từ mục tiêu ĐÚNG NGHĨA, hay chỉ nhét vào cho đủ?',
    'Nghe lại lượt nói của mình, có chỗ nào mình tự thấy vấp không?',
  ],
  trinh_bay: [
    'Mình có nêu được một ý chính rõ ràng ngay từ đầu không?',
    'Mỗi ý có kèm một ví dụ hoặc lý do, chứ không chỉ khẳng định suông?',
    'Mình có dùng từ mục tiêu ĐÚNG NGHĨA, hay chỉ nhét vào cho đủ?',
    'Mình có nói đủ thời lượng mà không phải lặp lại một câu nhiều lần không?',
  ],
  lap_luan: [
    'Mình có nêu rõ lập trường của mình không, hay nói nước đôi?',
    'Mình có đưa ít nhất hai lý do khác nhau không?',
    'Mình có nói tới mặt ngược lại rồi trả lời nó không?',
    'Mình có dùng từ mục tiêu ĐÚNG NGHĨA, hay chỉ nhét vào cho đủ?',
    'Mình có nói liền mạch, hay dừng lại nghĩ quá lâu giữa chừng?',
  ],
};

export const GHI_CHU_CHECKLIST_NOI = 'Bảng tiêu chí này dùng chung cho mọi đề cùng kiểu — nó không được viết riêng cho đề này.';

// ── LỜI BÁO KHI MICRO KHÔNG DÙNG ĐƯỢC ───────────────────────────────────────
//
// ĐÂY TỪNG LÀ MỘT CÁI LỖ THẬT, và nó nằm ở đúng trường hợp hay xảy ra nhất.
// Bản trước viết ba lời báo ngay trong component, và chỉ HAI trong ba nói cho
// người học biết họ vẫn làm tiếp được bằng cách gõ tay. Nhánh còn lại — **micro
// bị từ chối quyền** — chỉ nói đúng một câu "Trình duyệt chưa được cấp quyền
// dùng micro." rồi hết. Mà đó là nhánh gặp nhiều nhất: ai bấm "Chặn" ở hộp xin
// quyền, hay dùng máy không có micro, đều rơi vào đây. Họ đọc xong và tưởng đề
// này không làm được, trong khi ô gõ tay nằm ngay bên dưới.
//
// Tìm ra bằng `npm run hoc:that`: Chrome headless CÓ khai `webkitSpeechRecognition`
// nên nó đi vào nhánh `onerror` thật, và bộ rà đòi mọi lời báo phải chỉ được
// đường đi tiếp.
//
// Nay ba lời báo là DỮ LIỆU, không phải chuỗi rải trong JSX — để test đi hết được
// mọi nhánh, kể cả nhánh mã lỗi lạ mà không ai lường trước.
export const DUONG_RA_GO_TAY = 'Bạn vẫn có thể tự gõ lại lời mình nói vào ô bên dưới.';

export function loiMicThanhChu(ma) {
  if (ma === 'khong-ho-tro') {
    return `Trình duyệt này không hỗ trợ nhận dạng giọng nói (hãy dùng Chrome hoặc Edge). ${DUONG_RA_GO_TAY}`;
  }
  // CHỈ `not-allowed`. Bản đầu tôi gộp cả `service-not-allowed` vào đây vì tên
  // giống — mà bộ rà chỉ quan sát được `not-allowed`, còn cái kia tôi suy ra.
  // Theo Web Speech API hai thứ khác nhau: `not-allowed` là micro bị người dùng
  // hoặc thiết bị từ chối; `service-not-allowed` là DỊCH VỤ nhận giọng bị chặn
  // (chính sách trình duyệt, cấu hình máy công ty). Bảo người thứ hai đi kiểm
  // quyền micro là chỉ họ sang đúng chỗ không có lỗi. Nên nó rơi xuống nhánh
  // chung: gọi đúng tên mã lỗi, không phán nguyên nhân mình không kiểm được —
  // cùng luật với "không thấy ≠ không có".
  if (ma === 'not-allowed') {
    return `Trình duyệt chưa được cấp quyền dùng micro. ${DUONG_RA_GO_TAY}`;
  }
  return `Nhận dạng gặp lỗi: ${ma || 'không rõ'}. ${DUONG_RA_GO_TAY}`;
}
