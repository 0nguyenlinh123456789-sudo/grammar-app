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
export const LA_DONG_GIAI_NGHIA = /^(.{1,30}?)\s+[-–]\s*(n|v|adj|adv|prep|conj|phrase|phrasal verb|idiom)\b[.:]?\s*(.*)$/i;

// Dòng ghi công người viết/biên tập. Nhận diện bằng HAI dấu hiệu cùng lúc để
// khỏi cắt nhầm câu trong bài: mở đầu bằng tên người + động từ "wrote/…", VÀ
// có cụm "Learning English". Câu "Malcolm Gladwell wrote about the subject in
// his book…" nằm giữa bài không dính, vì thiếu dấu hiệu thứ hai.
export const LA_DONG_GHI_CONG = /^[A-Z][A-Za-z.'’ -]{1,45}\s(wrote|reported|produced|adapted|contributed)\b.*Learning English/;

// Lời mời bình luận ở chân trang, và phần hướng dẫn dùng hệ thống bình luận.
export const LA_DONG_MOI_BINH_LUAN = /^(We want to hear from you|What do you think of this story|Each time you return to comment|Now it.s your turn|Our comment policy)/i;

// Bảng ôn tập / ghi chú CHỈ CÓ TRÊN GIẤY, phát thanh viên không đọc. Danh sách
// này mở rộng dần theo bài gặp phải — thà kê đích danh còn hơn viết một luật
// chung rồi cắt nhầm nội dung thật.
export const LA_DONG_CHI_CO_TREN_GIAY = /^(Ex\.|Tip \d|INCORRECT\b|CORRECT\b|Click here|Editors? note|Common adverbs|\*\s|_+$)/i;

export function laDongNgoaiBanThu(dong) {
  const s = String(dong || '');
  return LA_DONG_GIAI_NGHIA.test(s)
    || LA_DONG_GHI_CONG.test(s)
    || LA_DONG_MOI_BINH_LUAN.test(s)
    || LA_DONG_CHI_CO_TREN_GIAY.test(s)
    || /^(Words in This Story)/i.test(s);
}

// Tách mục giải nghĩa từ ra thành dữ liệu riêng — nó vẫn hữu ích cho người
// học, chỉ là không thuộc về bản chép lời.
export function tachTuKho(cacDong) {
  return (cacDong || [])
    .map((p) => String(p).match(LA_DONG_GIAI_NGHIA))
    .filter(Boolean)
    .map((m) => ({ word: m[1].trim(), pos: m[2], meaning: m[3].trim() }))
    .filter((t) => t.word && t.meaning);
}

export function locBanChepLoi(cacDong) {
  return (cacDong || []).filter((p) => !laDongNgoaiBanThu(p));
}
