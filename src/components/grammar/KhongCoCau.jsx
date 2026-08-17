// File: src/components/grammar/KhongCoCau.jsx
// Thứ hiện ra khi một dạng bài tập không có câu nào để làm.
//
// Vì sao có: bảy bộ bài tập ngữ pháp đều viết `if (!curr) return <div>Đang tải
// câu hỏi...</div>`. Câu đó **không bao giờ đúng**: `curr` lấy từ một mảng
// truyền vào bằng prop, có mặt ngay từ lần vẽ đầu — không có gì đang tải. Nó rỗng
// nghĩa là dạng bài này KHÔNG CÓ CÂU, một trạng thái vĩnh viễn.
//
// Nói "đang tải" cho một trạng thái vĩnh viễn còn tệ hơn để trắng: để trắng thì
// người học biết là hỏng, còn "đang tải" thì họ ngồi đợi một thứ không bao giờ
// tới. Đây là bảy bản sao của cùng một lời nói sai, nên gom về MỘT chỗ.
//
// Lỗi thấy được nhất do nó gây ra, đo được: **12/12 bài của cụm A0 "Mất gốc
// thật"** không có `sentenceGame`, mà tab "Xếp Câu" lại luôn hiện → cả 12 chặng
// đầu tiên của người mất gốc dẫn tới màn hình "Đang tải thẻ học..." vĩnh viễn.
// Tab đó nay bị ẩn khi không có dữ liệu (xem GrammarPage); component này là lớp
// chặn thứ hai, cho những đường vào mà bộ lọc tab không phủ.
export default function KhongCoCau({ ten = 'câu hỏi' }) {
  return (
    <div className="p-8 rounded-3xl border-4 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 text-center">
      <p className="text-3xl mb-2">📄</p>
      <p className="font-black text-slate-600 dark:text-slate-300">Bài này chưa có {ten}.</p>
      <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
        Chọn một dạng bài khác ở hàng thẻ phía trên — phần lý thuyết vẫn học được bình thường.
      </p>
    </div>
  );
}
