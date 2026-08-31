// File: src/utils/chamPhatAm.js
//
// GỬI BẢN THU CHO GEMINI NGHE VÀ NHẬN XÉT PHÁT ÂM.
//
// ══ VÌ SAO ĐÂY LÀ VIỆC ĐÁNG LÀM ══
// `npm run kiem:camket` chỉ ra đúng MỘT chỗ khiến lời hứa "giỏi 4 kỹ năng"
// chưa trọn: **phát âm KHÔNG chấm được ở bất kỳ mức nào**. Vòng luyện nói cũ
// dùng nhận dạng giọng nói của trình duyệt để ra BẢN CHỮ, mà từ chữ thì không
// biết người học phát âm thế nào — đọc sai mà máy đoán đúng từ vẫn thành "đúng".
//
// Gemini nhận được âm thanh. Bản thu đi thẳng tới Google bằng API key của CHÍNH
// người học (quyết định BYOK), nên tính năng này không tốn của chủ dự án đồng
// nào và cũng không đi qua máy chủ nào của app ngoài lượt chuyển tiếp.
//
// ══ RANH GIỚI TRUNG THỰC — ĐỌC TRƯỚC KHI SỬA ══
// Đây là NHẬN XÉT CỦA MỘT MÔ HÌNH, không phải điểm thi. Ba thứ không được phép
// trôi đi trong các lần sửa sau:
//   1. `deNghe` là ước lượng "người bản ngữ nghe có dễ hiểu không", KHÔNG phải
//      điểm IELTS/VSTEP và không được hiển thị cạnh chữ "điểm".
//   2. Bản thu không nghe rõ thì mô hình phải TRẢ VỀ `ngheDuoc: false`; giao
//      diện phải nói ra điều đó thay vì hiện một nhận xét bịa.
//   3. Kết quả này KHÔNG được ghi vào tiến độ như một điểm đo được — kỹ năng
//      Nói vẫn là "tự đánh giá" trong Báo cáo tiến bộ.
// Chế độ `speaking` (chỉ có chữ) vẫn giữ nguyên lệnh cấm nhận xét phát âm.

/** Đọc Blob thành base64 thuần (không có tiền tố data:). */
export function blobSangBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const s = String(reader.result || '');
      const dau = s.indexOf(',');
      if (dau < 0) { reject(new Error('khong-doc-duoc-ban-thu')); return; }
      resolve(s.slice(dau + 1));
    };
    reader.onerror = () => reject(new Error('khong-doc-duoc-ban-thu'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Chuẩn hoá kiểu MIME của bản thu.
 * `MediaRecorder` trả về dạng "audio/webm;codecs=opus"; máy chủ chấp nhận cả
 * phần `;codecs=…`, nhưng cắt bỏ cho gọn và để lỡ có nơi khác so khớp chặt.
 */
export function kieuAmThanh(blob) {
  const t = String(blob?.type || '').split(';')[0].trim().toLowerCase();
  return t || 'audio/webm';
}

const soNguyen = (v, min, max, mac) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return mac;
  return Math.min(max, Math.max(min, Math.round(n)));
};
const chu = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/**
 * Đọc phản hồi JSON của mô hình thành hình dạng cố định.
 * Ném lỗi nếu không đọc được — KHÔNG bịa ra một kết quả rỗng trông như đã chấm.
 */
export function docKetQuaPhatAm(text) {
  const s = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  let v;
  try { v = JSON.parse(s); } catch { throw new Error('AI trả về kết quả không đọc được. Hãy thử lại.'); }

  const ngheDuoc = v?.ngheDuoc !== false;
  const can = Array.isArray(v?.can)
    ? v.can.map((x) => ({ tu: chu(x?.tu, 60), van: chu(x?.van, 200), sua: chu(x?.sua, 240) }))
      .filter((x) => x.tu && (x.van || x.sua)).slice(0, 4)
    : [];
  const tot = Array.isArray(v?.tot) ? v.tot.map((x) => chu(x, 200)).filter(Boolean).slice(0, 3) : [];

  return {
    ngheDuoc,
    // Không nghe được thì KHÔNG có điểm — trả null để giao diện không vẽ vòng
    // tròn 0/100 trông như "phát âm rất tệ" trong khi thật ra là micro hỏng.
    deNghe: ngheDuoc ? soNguyen(v?.deNghe, 0, 100, 0) : null,
    nghe: chu(v?.nghe, 600),
    tot,
    can,
    nhac: chu(v?.nhac, 300),
  };
}

/** Nhãn tiếng Việt cho mức dễ nghe. Cố ý KHÔNG dùng chữ "điểm". */
export function mucDeNghe(n) {
  if (n === null || n === undefined) return { nhan: 'chưa đo được', mau: 'text-slate-500 dark:text-slate-400' };
  if (n >= 80) return { nhan: 'người bản ngữ nghe trôi', mau: 'text-emerald-600 dark:text-emerald-400' };
  if (n >= 60) return { nhan: 'nghe hiểu được, còn vài chỗ vấp', mau: 'text-amber-600 dark:text-amber-400' };
  if (n >= 40) return { nhan: 'phải đoán ở nhiều chỗ', mau: 'text-orange-600 dark:text-orange-400' };
  return { nhan: 'khó nghe ra', mau: 'text-rose-600 dark:text-rose-400' };
}

/**
 * Chấm phát âm một bản thu.
 * @param {Blob} blob bản thu lấy từ utils/ghiAm.js
 * @param {{target?: string, topicTitle?: string}} tuyChon `target` là câu người
 *        học được yêu cầu đọc to; bỏ trống nếu là lượt nói tự do.
 */
export async function chamPhatAm(blob, { target = '', topicTitle = '' } = {}) {
  if (!blob || !blob.size) throw new Error('Chưa có bản thu nào để chấm.');
  const { requestAi } = await import('./aiClient.js');
  const audioData = await blobSangBase64(blob);
  const { text } = await requestAi('pronunciation', {
    audioData,
    mimeType: kieuAmThanh(blob),
    target,
    topicTitle,
  });
  return docKetQuaPhatAm(text);
}
