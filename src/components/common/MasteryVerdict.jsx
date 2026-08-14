// File: src/components/common/MasteryVerdict.jsx
// Dòng kết luận ở màn kết quả: ĐẠT hay CHƯA ĐẠT, và vì sao (hạng mục #1).
//
// Không có dòng này thì người học làm xong 6/10 sẽ thấy điểm, không thấy chặng
// được đánh dấu hoàn thành, và không hiểu vì sao — đúng kiểu "âm thầm" mà cả
// đợt dọn nội dung này sinh ra để xoá bỏ.
const MasteryVerdict = ({ evidence }) => {
  if (!evidence || !evidence.total) return null;

  if (evidence.passed) {
    return (
      <p className="mt-4 font-black text-emerald-600 dark:text-emerald-400 text-base md:text-lg">
        ✅ Đạt {evidence.percent}% — chặng này đã được ghi nhận hoàn thành.
      </p>
    );
  }

  return (
    <div className="mt-4 px-5 py-4 rounded-2xl border-[3px] border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 font-bold text-sm md:text-base max-w-md mx-auto">
      <p className="font-black">
        Chưa đạt ({evidence.percent}%) — cần ≥{evidence.threshold}%. Làm lại nhé, không mất gì cả!
      </p>
      <p className="mt-1 font-bold opacity-90">
        Chuỗi ngày học và mục tiêu hôm nay vẫn được tính. Chỉ phần đánh dấu hoàn thành là cần đạt ngưỡng.
      </p>
    </div>
  );
};

export default MasteryVerdict;
