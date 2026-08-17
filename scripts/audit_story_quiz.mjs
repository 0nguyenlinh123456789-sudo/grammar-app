// File: scripts/audit_story_quiz.mjs
// ĐO THIÊN LỆCH ĐỘ DÀI TRONG BỘ CÂU HỎI ĐỌC HIỂU MỨC VĂN BẢN (việc 3.1).
//
// Một bộ câu trắc nghiệm có thể trả lời đúng mà KHÔNG cần đọc bài, nếu đáp án
// đúng luôn mang dấu hiệu bề ngoài nào đó. Việc 3.1 đã vấp một dấu hiệu như vậy
// và sửa: đáp án đúng nằm lì ở ô đầu (5/5 câu soạn tay cũ có `answer: 0`).
//
// Dấu hiệu thứ hai, cùng loại, tinh vi hơn: **đáp án đúng là lựa chọn DÀI NHẤT**.
// Nó xuất hiện tự nhiên khi người soạn viết đáp án đúng thành một mệnh đề đầy đủ
// (thường là bản dịch sát câu căn cứ) rồi thêm ba câu nhiễu ngắn gọn.
//
// Chạy: node scripts/audit_story_quiz.mjs
import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export async function doThienLech() {
  const { STORY_QUIZ } = await import(pathToFileURL(path.join(ROOT, 'src/data/storyQuiz.js')).href);
  let tong = 0;
  let daiNhatDuyNhat = 0;
  let daiThayDuoc = 0;
  let nganNhat = 0;
  const nang = [];
  for (const [id, ds] of Object.entries(STORY_QUIZ)) {
    for (const q of ds) {
      tong += 1;
      const dai = q.options.map((o) => o.length);
      const cua = dai[q.answer];
      const nhi = Math.max(...dai.filter((_, i) => i !== q.answer));
      if (cua > nhi) daiNhatDuyNhat += 1;
      // Lệch 1–2 ký tự thì nhìn bằng mắt không phân biệt được, nên nó không phải
      // một mẹo dùng được. Con số ĐÁNG LO là số câu mà đáp án dài hơn HẲN — từ
      // 10% trở lên, tức là dài hơn thấy rõ khi bốn ô nằm cạnh nhau.
      if (cua >= nhi * 1.1) {
        daiThayDuoc += 1;
        if (cua >= nhi * 1.4) nang.push({ id, q: q.q, cua, nhi });
      }
      if (cua === Math.min(...dai)) nganNhat += 1;
    }
  }
  return { tong, daiNhatDuyNhat, daiThayDuoc, nganNhat, nang };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const r = await doThienLech();
  const pc = (n) => `${n}/${r.tong} (${((n / r.tong) * 100).toFixed(1)}%)`;
  console.log('Tổng câu:', r.tong);
  console.log('Đáp án đúng là lựa chọn DÀI NHẤT (duy nhất):', pc(r.daiNhatDuyNhat));
  console.log('Đáp án đúng dài hơn THẤY ĐƯỢC (≥10%):', pc(r.daiThayDuoc));
  console.log('Đáp án đúng là lựa chọn NGẮN NHẤT:', pc(r.nganNhat));
  console.log('Kỳ vọng nếu không thiên lệch (4 lựa chọn): ~25%');
  console.log(`\nNặng nhất (dài hơn lựa chọn nhì ≥40%): ${r.nang.length} câu`);
  for (const x of r.nang.slice(0, 30)) console.log(`  ${x.id} · ${x.q.slice(0, 50)}… (${x.cua} vs ${x.nhi})`);
}
