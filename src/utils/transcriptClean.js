// File: src/utils/transcriptClean.js
// LỌC BẢN CHÉP LỜI VOA — bản chép lời phải KHỚP VỚI BẢN THU, không phải khớp
// với trang web.
//
// VÌ SAO CÓ FILE NÀY (hai lần dính, cùng một loại lỗi):
//
// Lần 1 — bài "How to Summon Others": bộ trích chỉ lấy thẻ <p> nên MẤT phần
// câu ví dụ. Người học nghe thấy câu đó mà đọc lại không có.
//
// Lần 2 — chính là đây, chiều ngược lại: trang web có những dòng KHÔNG NẰM
// TRONG BẢN THU — dòng ghi tên người viết, lời mời bình luận, bảng ôn tập chỉ
// có trên giấy. Người học đọc thấy một câu mà tai không hề nghe thấy, rồi
// tưởng mình nghe sót. Cả hai lần đều là bản chép lời nói dối về bản thu.
//
// VÌ SAO GOM VÀO MỘT CHỖ: luật này trước đây bị chép làm hai bản — bộ dựng dữ
// liệu dùng `.{1,20}` còn bài kiểm dùng `.{1,25}`. Dòng "present perfect tense
// – n. …" dài 21 ký tự nên lọt qua bộ dựng mà bị bài kiểm bắt. Hai bản chép
// tay của cùng một luật thì sớm muộn cũng lệch nhau; nên chỉ còn một bản.

// Dòng giải nghĩa từ trong mục "Words in This Story" — dạng "từ – n. nghĩa".
//
// (5.3) VOA không viết dòng này theo MỘT khuôn. Đo trên kho bài nghe đã phát
// hành + ứng viên bài đọc, tìm được hai biến thể lọt lưới luật cũ:
//   - "envision v. to picture oneself"        → KHÔNG có dấu gạch;
//   - "consist of -verb phrase. To be formed…" → pos là "verb phrase", thiếu
//     trong danh sách; dòng này đã LỌT LÊN BẢN PHÁT HÀNH của kho bài nghe.
// Nhưng nhận bừa dạng không-gạch thì cắt nhầm câu văn thật — đo được đúng ba
// câu: “"Feel like" is a phrasal verb. We often use…”, “We use them before a
// noun phrase. For example,”, “Food for thought is a set noun phrase. It…”.
// Điểm phân biệt Ở TRONG DỮ LIỆU: câu văn thật đặt mạo từ/danh từ chung ngay
// trước nhãn pos ("a phrasal verb", "set noun phrase"), còn dòng giải nghĩa
// đặt nhãn pos NGAY SAU từ được giải nghĩa. Nên dạng không-gạch chỉ được nhận
// khi phần đứng trước KHÔNG kết thúc bằng những từ đó — xem tachGiaiNghia().
// Pos MỘT CHỮ CÁI (n, v) bắt buộc có dấu chấm ngay sau: không đòi thì câu đánh
// vần "the word spelled l-i-v-e-s, it can be either…" bị nhận nhầm là giải
// nghĩa của từ "l-i" (đo được thật ở voa-7534132). Pos nhiều chữ cái thì dấu
// chấm tuỳ chọn — "call it quits–phrase to agree to stop" là dòng thật không
// có chấm.
export const LA_DONG_GIAI_NGHIA = /^(.{1,30}?)\s*[-–—]\s*(?:(n|v)\.|(adj|adv|prep|conj|phrase|phrasal verb|idiom|verb phrase)\b[.:]?)\s*(.*)$/i;
const GIAI_NGHIA_KHONG_GACH = /^(.{1,30}?)\s+(?:(n|v)|(adj|adv|prep|conj|phrasal verb|idiom|verb phrase))\.\s+(.+)$/i;
const KET_BANG_TU_CHUC_NANG = /\b(a|an|the|is|are|was|were|set|noun|verb)$/i;

/** Tách một dòng giải nghĩa (cả hai biến thể) → {word, pos, meaning} | null.
 *  Kiểm từ-chức-năng CHỈ áp cho nhánh không gạch: ở nhánh có gạch, dấu gạch đã
 *  là bằng chứng đủ mạnh — và những dòng như "verb –n. a word that describes
 *  action" có từ được giải nghĩa CHÍNH LÀ "verb", áp kiểm vào là thả nhầm. */
export function tachGiaiNghia(dong) {
  const s = String(dong || '');
  let m = s.match(LA_DONG_GIAI_NGHIA);
  if (!m) {
    m = s.match(GIAI_NGHIA_KHONG_GACH);
    if (m && KET_BANG_TU_CHUC_NANG.test(m[1].trim())) m = null;
  }
  if (!m) return null;
  const word = m[1].replace(/[-–—\s]+$/, '').trim();
  if (!word) return null;
  return { word, pos: m[2] || m[3], meaning: m[4].trim() };
}

// Dòng ghi công người viết/biên tập. Nhận diện bằng HAI dấu hiệu cùng lúc để
// khỏi cắt nhầm câu trong bài: mở đầu bằng tên người + động từ "wrote/…", VÀ
// có cụm "Learning English". Câu "Malcolm Gladwell wrote about the subject in
// his book…" nằm giữa bài không dính, vì thiếu dấu hiệu thứ hai.
export const LA_DONG_GHI_CONG = /^[A-Z][A-Za-z.'’ -]{1,45}\s(wrote|reported|produced|adapted|contributed)\b.*Learning English/;

// Lời mời bình luận ở chân trang, và phần hướng dẫn dùng hệ thống bình luận.
// (5.3) Mở rộng theo đo đạc trên kho ứng viên bài đọc: VOA chèn cả một khối
// hướng dẫn Disqus ("We have a new comment system. Here is how it works…"),
// và câu hỏi giao lưu cuối bài xuất hiện ở đủ dạng — "Let us know in the
// Comments section", "Write to us in the Comments", "Write us a comment and
// leave a post on our Facebook page". Điểm chung đo được: chữ "comment" trong
// vai lời mời — nên vế sau khớp Ở BẤT KỲ ĐÂU trong dòng, các vế đầu neo đầu
// dòng như cũ.
export const LA_DONG_MOI_BINH_LUAN = /^(We want to hear from you|What do you think of this story|Each time you return to comment|Now,? it.s your turn\.?$|Our comment policy|We have a new comment system|Write your comment in the box|Under the box|Click on one image|Let us know how it goes\.?$)|\bin the Comments\b|Write to us in the Comments|Write us a comment/i;

// Bảng ôn tập / ghi chú CHỈ CÓ TRÊN GIẤY, phát thanh viên không đọc. Danh sách
// này mở rộng dần theo bài gặp phải — thà kê đích danh còn hơn viết một luật
// chung rồi cắt nhầm nội dung thật.
export const LA_DONG_CHI_CO_TREN_GIAY = /^(Ex\.|Tip \d|INCORRECT\b|CORRECT\b|Click here|Editors? note|Common adverbs|\*\s|_+$)/i;

// Hàng nút chia sẻ mạng xã hội dính vào chân bài (đo được ở bài "Successful
// Debate Is Like Building a House": "… Share Copy link Facebook Twitter
// Telegram WhatsApp Email Share"). Chuỗi "Share Copy link Facebook" không xuất
// hiện trong văn xuôi thật — khớp ở bất kỳ đâu trong dòng.
export const LA_DONG_NUT_CHIA_SE = /Share Copy link Facebook/i;

export function laDongNgoaiBanThu(dong) {
  const s = String(dong || '');
  return !!tachGiaiNghia(s)
    || LA_DONG_GHI_CONG.test(s)
    || LA_DONG_MOI_BINH_LUAN.test(s)
    || LA_DONG_CHI_CO_TREN_GIAY.test(s)
    || LA_DONG_NUT_CHIA_SE.test(s)
    || /^(Words in This Story)/i.test(s);
}

// Tách mục giải nghĩa từ ra thành dữ liệu riêng — nó vẫn hữu ích cho người
// học, chỉ là không thuộc về bản chép lời.
export function tachTuKho(cacDong) {
  return (cacDong || [])
    .map((p) => tachGiaiNghia(p))
    .filter(Boolean)
    .filter((t) => t.word && t.meaning);
}

export function locBanChepLoi(cacDong) {
  return (cacDong || []).filter((p) => {
    // Dòng chỉ gồm khoảng trắng / ký tự vô hình (zero-width space ở chân bài
    // voa-doc-3196872) — vẽ ra là một đoạn văn rỗng.
    if (!String(p).replace(/[\s\u200B\u200C\uFEFF]/g, '')) return false;
    return !laDongNgoaiBanThu(p);
  });
}
