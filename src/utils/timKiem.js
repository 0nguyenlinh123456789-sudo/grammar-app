// File: src/utils/timKiem.js
// TÌM BÀI TRONG KHOÁ HỌC — CHỈ MỤC KHÔNG PHỤ THUỘC VÀO VIỆC ĐÃ VÀO KHU NÀO.
//
// ══ LỖI ĐÃ CÓ, VÀ VÌ SAO NÓ SỐNG LÂU ══
// Bản cũ dựng kết quả từ ba prop của MainLayout: `parsedGrammarData`,
// `vstepTopics`, `courseData`. Cả ba khởi tạo RỖNG trong App.jsx và chỉ được đổ
// đầy khi `appMode` đã bằng 'grammar' / 'vocab' / 'games'. Nhưng người học gõ
// tìm kiếm ở MÀN HÌNH ĐẦU TIÊN — đúng lúc cả ba còn rỗng. App trả lời:
//
//     "Không tìm thấy bài phù hợp."
//
// cho bài CÓ THẬT. Không lỗi, không cảnh báo. Đây là họ lỗi đã gặp nhiều lần
// trong dự án: câu trả lời SAI trông y hệt câu trả lời ĐÚNG cho một từ khoá vô
// nghĩa, nên không ai — kể cả bộ kiểm — phân biệt được.
//
// ══ VÌ SAO LẤY LỘ TRÌNH LÀM CHỈ MỤC ══
// Đã đối chiếu bằng số: lộ trình chứa 95/95 chủ đề ngữ pháp, 270/270 chủ đề từ
// vựng, 260/260 unit Oxford, cộng bài nghe/đọc/chép chính tả — tức là chỉ mục
// ĐẦY ĐỦ, không sót nguồn nào. Và `roadmapData` đã được App.jsx nhập SẴN
// (không lazy), nên tìm kiếm không kéo thêm một byte nào về máy người học.
//
// Đường khác đã cân nhắc và loại: nạp ba kho kia ngay khi mở ô tìm kiếm. Ba
// kho đó nặng 875 KB + 545 KB + 344 KB. Bắt người học ở Việt Nam tải gần 2 MB
// dữ liệu di động chỉ để GÕ MỘT TỪ là đổi một lỗi lấy một lỗi khác.
//
// ══ GÕ KHÔNG DẤU ══
// Người Việt gõ trên điện thoại phần lớn không bỏ dấu. "bang chu cai" phải ra
// "Bảng Chữ Cái". Nên cả từ khoá lẫn kho đều được bỏ dấu trước khi so.
import { roadmapData, CEFR_OF_BAND } from '../data/roadmapData.js';

// Nhãn hiện cho người học, theo loại chặng. Viết tay từng dòng chứ không sinh
// từ id: id là chuyện của mã, nhãn là chuyện của người đọc, và hai thứ đó phải
// được phép khác nhau.
export const NHAN_LOAI = {
  grammar: 'Ngữ pháp',
  vstep: 'Từ vựng',
  oxford: 'Oxford',
  listening: 'Bài nghe',
  reading: 'Bài đọc',
  dictation: 'Chép chính tả',
};

// Số LOẠI nội dung được lập chỉ mục. `tests/tim_kiem.test.js` neo con số này:
// nó chỉ được TĂNG. Thêm một loại chặng mới vào lộ trình mà quên thêm nhãn ở
// đây thì kết quả hiện ra không có nhãn — bài kiểm bắt được.
export const SO_LOAI_TIM_DUOC = Object.keys(NHAN_LOAI).length;

/**
 * Bỏ dấu tiếng Việt và hạ chữ thường.
 *
 * `normalize('NFD')` tách dấu thành ký tự tổ hợp riêng (U+0300–U+036F) rồi xoá
 * đi. Riêng "đ/Đ" KHÔNG phải chữ có dấu tổ hợp — nó là một ký tự độc lập trong
 * Unicode, nên NFD không đụng tới và phải thay tay. Bỏ sót dòng đó thì "dong"
 * không bao giờ tìm ra "Động".
 */
export function boDau(chu) {
  return String(chu || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

let _chiMuc = null;

/**
 * Dựng chỉ mục một lần rồi giữ lại. Mỗi mục GIỮ NGUYÊN đối tượng chặng gốc ở
 * `chang`, vì `WelcomePage.launchMilestone` cần cả `bookId` (Oxford) lẫn nguyên
 * chặng (bài nghe/đọc/chép chính tả mở panel ngay tại trang chủ). Chép ra một
 * bản rút gọn rồi truyền đi sẽ làm ba loại đó mở ra panel trống.
 */
export function chiMucKhoaHoc() {
  if (_chiMuc) return _chiMuc;
  const ra = [];
  for (const bac of roadmapData || []) {
    for (const chang of bac.milestones || []) {
      const tieuDe = String(chang.title || '');
      const moTa = String(chang.desc || '');
      ra.push({
        khoa: `${bac.level}::${chang.type}::${chang.targetId}`,
        tieuDe,
        moTa,
        loai: chang.type,
        nhan: NHAN_LOAI[chang.type] || chang.type,
        bac: bac.level,
        cefr: chang.cefr || CEFR_OF_BAND[bac.level] || '',
        // Bản đã bỏ dấu, tính SẴN lúc dựng chỉ mục. Bỏ dấu 724 chuỗi trên mỗi
        // phím gõ là việc thừa, và trên máy yếu nó thành giật.
        tieuDeKhong: boDau(tieuDe),
        moTaKhong: boDau(moTa),
        chang,
      });
    }
  }
  _chiMuc = ra;
  return ra;
}

/**
 * Tìm bài. Xếp hạng ba mức, vì "đúng đầu tiêu đề" gần như luôn là thứ người ta
 * đang tìm, còn "có trong phần mô tả" thì thường chỉ là trùng chữ:
 *
 *   0 — tiêu đề BẮT ĐẦU bằng từ khoá
 *   1 — tiêu đề CÓ CHỨA từ khoá
 *   2 — chỉ phần mô tả có chứa
 *
 * Trong cùng một mức thì giữ nguyên thứ tự lộ trình (dễ trước, khó sau) — đó
 * cũng là thứ tự người mất gốc cần.
 *
 * Từ khoá dưới 2 ký tự trả về rỗng: gõ một chữ "a" khớp gần như mọi bài, và
 * một danh sách 12 dòng ngẫu nhiên thì vô dụng hơn là không có gì.
 */
export function timTrongKhoaHoc(tuKhoa, { toiDa = 12 } = {}) {
  const q = boDau(tuKhoa);
  if (q.length < 2) return [];
  const hang = [[], [], []];
  for (const m of chiMucKhoaHoc()) {
    if (m.tieuDeKhong.startsWith(q)) hang[0].push(m);
    else if (m.tieuDeKhong.includes(q)) hang[1].push(m);
    else if (m.moTaKhong.includes(q)) hang[2].push(m);
    // Đủ hàng đầu rồi vẫn phải quét hết: cắt sớm sẽ bỏ mất bài khớp tiêu đề
    // nằm ở cuối lộ trình, và người học không có cách nào biết mình bị cắt.
  }
  return [...hang[0], ...hang[1], ...hang[2]].slice(0, toiDa);
}

// Dùng cho bài kiểm: xoá bộ nhớ đệm để dựng lại chỉ mục.
export function xoaDemChiMuc() {
  _chiMuc = null;
}
