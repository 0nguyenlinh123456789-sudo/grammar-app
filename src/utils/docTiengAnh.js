// File: src/utils/docTiengAnh.js
//
// ĐỌC TO MỘT MẨU TIẾNG ANH BẰNG GIỌNG MÁY CỦA TRÌNH DUYỆT.
//
// ══ VÌ SAO GOM VỀ MỘT CHỖ ══
// Trước đây 13 tệp tự gọi `speechSynthesis` theo kiểu:
//     if ('speechSynthesis' in window) { ...speak(new SpeechSynthesisUtterance(t)) }
// Cách đó hỏng LẶNG LẼ ở hai chỗ, và hỏng đúng trên máy của người học Việt Nam:
//
//   1. `getVoices()` trả về MẢNG RỖNG cho tới khi sự kiện `voiceschanged` nổ.
//      Bấm nghe ngay khi trang vừa mở thì không có giọng nào để chọn.
//   2. Máy Android bán ở Việt Nam có thể CHỈ cài giọng `vi-VN`. Khi đó
//      `speak()` vẫn chạy, vẫn không ném lỗi, nhưng đọc "book" bằng bộ máy
//      tiếng Việt — ra tiếng "bốc". Người học tưởng đó là phát âm tiếng Anh.
//
// Lỗi thứ 2 là lý do chính của tệp này. Luật dự án: THIẾU DỮ LIỆU THÌ ẨN HOẶC
// BÁO, KHÔNG IM. Ở đây "thiếu" nghĩa là máy không có giọng tiếng Anh, và cách
// duy nhất trung thực là nói ra, chứ không phải phát một thứ tiếng khác đè lên.
//
// ══ RANH GIỚI ══
// Đây vẫn là GIỌNG TỔNG HỢP. Mọi nơi dùng tệp này phải kèm `MachineVoiceTag`.
// Nó không thay được bản thu người thật, chỉ để nghe lại một mẩu ngắn.

const KHONG_HO_TRO = 'khong-ho-tro';
const KHONG_CO_GIONG = 'khong-co-giong';

export const LOI_DOC = {
  [KHONG_HO_TRO]: 'Trình duyệt này không đọc được thành tiếng. Hãy thử Chrome hoặc Safari bản mới.',
  [KHONG_CO_GIONG]: 'Máy chưa cài giọng tiếng Anh nào nên không đọc được. Vào Cài đặt → Ngôn ngữ (Android: Cài đặt → Chuyển văn bản thành lời nói) để tải giọng English, rồi mở lại trang.',
};

export const loiDocThanhChu = (ma) => LOI_DOC[ma] || LOI_DOC[KHONG_HO_TRO];

/** Trình duyệt có bộ đọc không. Tách riêng để test và giao diện cùng hỏi một câu. */
export function docDuoc() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function';
}

/**
 * Chọn giọng tiếng Anh hợp nhất cho `uaThich` (ví dụ 'en-GB').
 *
 * Thứ tự ưu tiên — có lý do, đừng đảo:
 *   1. Đúng mã vùng ('en-GB') → accent khớp với IPA ghi trong bài.
 *   2. Bất kỳ giọng `en-*` nào → sai accent còn hơn đọc bằng bộ máy tiếng Việt.
 *   3. Không có gì → trả `null` để nơi gọi BÁO, tuyệt đối không rơi về giọng mặc
 *      định của hệ thống.
 *
 * @returns {SpeechSynthesisVoice|null}
 */
export function chonGiongAnh(uaThich = 'en-GB') {
  if (!docDuoc()) return null;
  let ds;
  try { ds = window.speechSynthesis.getVoices() || []; } catch { return null; }
  const chuan = (v) => String(v?.lang || '').replace('_', '-').toLowerCase();
  const dich = String(uaThich).replace('_', '-').toLowerCase();
  return ds.find((v) => chuan(v) === dich)
    || ds.find((v) => chuan(v).startsWith('en-'))
    || ds.find((v) => chuan(v) === 'en')
    || null;
}

/**
 * Theo dõi danh sách giọng cho tới khi trình duyệt nạp xong.
 *
 * `voiceschanged` có thể đã nổ TRƯỚC khi component gắn vào, nên phải gọi `bao`
 * một lần ngay lập tức chứ không chỉ ngồi chờ sự kiện — nếu chỉ chờ thì trên
 * máy nạp giọng nhanh, panel đứng mãi ở trạng thái "đang tìm giọng".
 *
 * @returns {() => void} hàm gỡ theo dõi
 */
export function theoDoiGiong(bao) {
  if (!docDuoc()) { bao(); return () => {}; }
  const s = window.speechSynthesis;
  bao();
  const g = () => bao();
  try { s.addEventListener('voiceschanged', g); } catch { s.onvoiceschanged = g; }
  return () => {
    try { s.removeEventListener('voiceschanged', g); } catch { s.onvoiceschanged = null; }
  };
}

/**
 * Đọc to một mẩu chữ. KHÔNG BAO GIỜ NÉM — trả mã lỗi giống `ghiAm.js`.
 *
 * @param {string} chu mẩu chữ tiếng Anh cần đọc
 * @param {{giong?: string, nhipDo?: number}} [tuyChon]
 * @returns {{ok: true, giong: string} | {ok: false, loi: string}}
 */
export function docTo(chu, { giong = 'en-GB', nhipDo = 0.85 } = {}) {
  const t = String(chu || '').trim();
  if (!t) return { ok: false, loi: KHONG_HO_TRO };
  if (!docDuoc()) return { ok: false, loi: KHONG_HO_TRO };

  const v = chonGiongAnh(giong);
  // ⚠️ KHÔNG ĐƯỢC BỎ NHÁNH NÀY để "cứ đọc đại cho có tiếng". Không có giọng
  // tiếng Anh mà vẫn `speak()` thì bộ máy tiếng Việt đọc từ tiếng Anh, và người
  // học học đúng cái phát âm sai đó.
  if (!v) return { ok: false, loi: KHONG_CO_GIONG };

  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.voice = v;
    u.lang = v.lang;
    u.rate = nhipDo;
    window.speechSynthesis.speak(u);
    return { ok: true, giong: v.lang };
  } catch {
    return { ok: false, loi: KHONG_HO_TRO };
  }
}

/** Dừng mọi thứ đang đọc — gọi khi rời màn hình, nếu không tiếng còn chạy tiếp. */
export function ngungDoc() {
  if (!docDuoc()) return;
  try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
}

/**
 * Nhãn accent để giao diện nói RÕ vừa đọc bằng giọng nào.
 *
 * Cần vì bài Bảng Chữ Cái dạy "Z = /zed/ (Anh-Anh) hoặc /ziː/ (Anh-Mỹ)". Máy chỉ
 * đọc được MỘT trong hai. Không ghi accent thì với đúng chữ Z, tiếng nghe được
 * mâu thuẫn với chữ đọc được, và người học không biết bên nào sai.
 */
export function nhanAccent(lang) {
  const l = String(lang || '').replace('_', '-').toLowerCase();
  if (l.startsWith('en-gb')) return 'Anh-Anh';
  if (l.startsWith('en-us')) return 'Anh-Mỹ';
  if (l.startsWith('en-au')) return 'Anh-Úc';
  if (l.startsWith('en-in')) return 'Anh-Ấn';
  if (l.startsWith('en')) return `giọng ${lang}`;
  return '';
}
