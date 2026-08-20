// File: src/utils/ghiAm.js
// GHI ÂM ĐỂ NGHE LẠI GIỌNG MÌNH — và KHÔNG để chấm gì cả.
//
// ══ LỖ ĐÃ CÓ ══
// Vòng luyện nói hở đúng một nửa. Người học nói, trình duyệt trả về BẢN CHỮ nó
// nghe được, và thế là hết. Họ không bao giờ NGHE LẠI được chính mình — mà tự
// nghe lại là cách luyện phát âm rẻ nhất và hiệu quả nhất khi không có thầy.
// `MediaRecorder`/`getUserMedia` xuất hiện 0 lần trong cả kho mã.
//
// ══ CÁI FILE NÀY LÀM, VÀ CÁI NÓ TUYỆT ĐỐI KHÔNG LÀM ══
// LÀM: thu tiếng, đưa lại một URL để phát.
// KHÔNG LÀM: **không chấm, không cho điểm, không so sánh với bản mẫu.** App
//   không chấm phát âm ở bất kỳ đâu, và một cái nút ghi âm là thứ dễ khiến
//   người ta tưởng ngược lại nhất. Nhãn ở giao diện phải nói thẳng.
//
// ══ VÌ SAO KHÔNG LƯU LẠI ══
// Bản thu nằm trong bộ nhớ phiên, đóng màn hình là mất, và giao diện NÓI RA
// điều đó. Ba lý do, theo thứ tự quan trọng:
//   1. Đó là giọng của người học. Cất giọng người ta xuống đĩa dưới một cái nút
//      họ bấm để "nghe thử" là lấy nhiều hơn thứ họ đồng ý đưa.
//   2. localStorage có hạn mức vài MB; một phút thu đã vượt.
//   3. Không lưu thì không có gì phải dọn, không có gì rò ra bản sao lưu.
//
// ══ MICRO DÙNG CHUNG VỚI NHẬN DẠNG GIỌNG NÓI ══
// `SpeechRecognition` cũng mở micro. Hai thứ cùng lúc chạy được trên Chrome máy
// tính nhưng KHÔNG chắc ở mọi trình duyệt. Nên luật là: **ghi âm hỏng thì nhận
// dạng vẫn phải chạy**. Bộ này không bao giờ ném ra ngoài; nó trả về lý do hỏng
// bằng chữ để nơi gọi báo cho người dùng rồi đi tiếp.

/** Trình duyệt này có ghi âm được không? */
export function ghiAmDuoc() {
  return typeof window !== 'undefined'
    && typeof window.MediaRecorder === 'function'
    && !!navigator?.mediaDevices?.getUserMedia;
}

export const LOI_GHI_AM = {
  'khong-ho-tro': 'Trình duyệt này không ghi âm được. Bạn vẫn nói và vẫn lấy được bản chữ như thường — chỉ là không nghe lại được giọng mình.',
  'tu-choi': 'Bạn chưa cho phép dùng micro để ghi âm. Bạn vẫn nói và vẫn lấy được bản chữ — chỉ là không nghe lại được giọng mình.',
  'khong-thu-duoc': 'Không mở được micro để ghi âm (có thể một ứng dụng khác đang giữ). Phần nhận dạng giọng nói vẫn chạy bình thường.',
  'rong': 'Bản thu rỗng — có thể micro không nhận được tiếng nào.',
};

export const loiGhiAmThanhChu = (ma) => LOI_GHI_AM[ma] || LOI_GHI_AM['khong-thu-duoc'];

/**
 * Bắt đầu thu. KHÔNG BAO GIỜ NÉM.
 *
 * @returns {Promise<{ok: true, dung: () => Promise<{url: string|null, loi: string|null, huy: () => void}>} | {ok: false, loi: string}>}
 */
export async function batDauGhiAm() {
  if (!ghiAmDuoc()) return { ok: false, loi: 'khong-ho-tro' };

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    const ten = String(e?.name || '');
    return { ok: false, loi: /NotAllowed|Security/i.test(ten) ? 'tu-choi' : 'khong-thu-duoc' };
  }

  let may;
  try {
    may = new MediaRecorder(stream);
  } catch {
    // Mở được micro nhưng không dựng được máy thu: phải TRẢ LẠI micro, nếu không
    // đèn micro của người dùng sáng mãi vì một tính năng đã hỏng.
    for (const r of stream.getTracks()) r.stop();
    return { ok: false, loi: 'khong-thu-duoc' };
  }

  const manh = [];
  may.ondataavailable = (e) => { if (e.data && e.data.size) manh.push(e.data); };
  may.start();

  const traLaiMicro = () => { for (const r of stream.getTracks()) r.stop(); };

  return {
    ok: true,
    async dung() {
      const xong = new Promise((res) => { may.onstop = res; });
      try { may.stop(); } catch { /* đã dừng rồi */ }
      await xong;
      traLaiMicro();

      if (!manh.length) return { url: null, loi: 'rong', huy: () => {} };
      const blob = new Blob(manh, { type: may.mimeType || 'audio/webm' });
      const url = URL.createObjectURL(blob);
      // Nơi gọi PHẢI gọi `huy()` khi thay bản thu khác hoặc khi rời màn hình.
      // Blob URL không tự biến mất; quên là rò bộ nhớ cho tới lúc tải lại trang.
      return { url, loi: null, huy: () => { try { URL.revokeObjectURL(url); } catch { /* ignore */ } } };
    },
    // Bỏ giữa chừng (rời màn hình khi đang thu): trả micro, không dựng blob.
    boGiuaChung() {
      try { may.stop(); } catch { /* ignore */ }
      traLaiMicro();
    },
  };
}
