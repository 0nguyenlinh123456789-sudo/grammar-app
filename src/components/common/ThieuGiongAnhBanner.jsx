// File: src/components/common/ThieuGiongAnhBanner.jsx
//
// BĂNG BÁO: MÁY NÀY KHÔNG CÓ GIỌNG TIẾNG ANH NÀO, NÊN NÚT NGHE SẼ IM.
//
// ══ VÌ SAO CHUYỂN SANG `docTo` THÔI LÀ CHƯA ĐỦ ══
// Trước đợt này, 11 tệp tự gọi `speechSynthesis` theo cùng một khuôn:
//     const u = new SpeechSynthesisUtterance(word);
//     u.lang = 'en-US';                 // ← đặt lang, KHÔNG chọn giọng
//     window.speechSynthesis.speak(u);
// `lang` chỉ là LỜI ĐỀ NGHỊ. Máy Android bán ở Việt Nam có thể chỉ cài giọng
// `vi-VN`; khi đó bộ máy tiếng Việt vẫn đọc từ tiếng Anh — "book" ra "bốc" —
// và không có lỗi nào nổ ra. Người học luyện nghe bằng đúng cái phát âm sai đó.
//
// `docTo` chặn được vế thứ nhất: không có giọng `en-*` thì KHÔNG đọc. Nhưng nếu
// dừng ở đó thì nút nghe chỉ im lặng, và im lặng là một kiểu hỏng khác — người
// học tưởng app lỗi, hoặc tệ hơn, tưởng mình bấm sai.
//
// Nên đây là vế thứ hai bắt buộc của bản vá, cùng luật với `KhoBiChanBanner`:
// "thiếu dữ liệu thì ẨN hoặc BÁO, không im lặng". Một băng duy nhất ở tầng gốc
// thay vì 11 lời báo rải rác — và nơi gọi thứ mười hai không phải làm gì thêm.
//
// ══ NÓI GÌ, VÀ KHÔNG NÓI GÌ ══
// Nói đúng hai điều: chuyện gì đang xảy ra, và làm gì để hết. Đường dẫn cài đặt
// ghi ở mức chi tiết vừa đủ cho Android (nơi hay thiếu giọng nhất) và để ngỏ
// cho hệ khác — máy KHÔNG biết chắc người học đang dùng gì, nên không bịa ra
// một đường dẫn cụ thể có thể sai.
import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { docDuoc, chonGiongAnh, theoDoiGiong } from '../../utils/docTiengAnh';

export default function ThieuGiongAnhBanner() {
  // `null` = chưa dò xong. KHÔNG hiện băng ở trạng thái đó: `getVoices()` trả
  // mảng rỗng cho tới khi `voiceschanged` nổ, nên báo ngay lúc mới mở trang là
  // báo nhầm cho gần như mọi máy.
  const [coGiong, setCoGiong] = useState(null);

  useEffect(() => theoDoiGiong(() => {
    if (!docDuoc()) { setCoGiong(false); return; }
    setCoGiong(!!chonGiongAnh('en-US'));
  }), []);

  if (coGiong !== false) return null;

  return (
    <div
      role="alert"
      className="mx-auto max-w-5xl mt-3 mb-1 px-4 py-3 rounded-2xl border-3 border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 flex items-start gap-3"
    >
      <Volume2 size={20} className="shrink-0 mt-0.5" />
      <p className="text-sm font-bold leading-relaxed">
        <b>Máy này chưa có giọng tiếng Anh</b>, nên các nút nghe sẽ không phát ra tiếng.
        App <b>cố ý không đọc</b> thay bằng giọng tiếng Việt — nghe “book” thành “bốc” là học sai ngay từ đầu.
        <br />
        Cách khắc phục: vào <b>Cài đặt → Ngôn ngữ</b> (Android: <b>Cài đặt → Chuyển văn bản thành lời nói</b>) tải một giọng <b>English</b>, rồi mở lại trang.
        Các bài có <b>bản thu người thật</b> vẫn nghe được bình thường.
      </p>
    </div>
  );
}
