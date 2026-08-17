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
  // Dải 0-10%: đáp án dài nhất nhưng hơn rất ít. Không đo dải này thì câu "mắt
  // thường không phân biệt nổi" chỉ là lời khẳng định, không phải con số.
  const khoangHep = [];
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
      if (cua > nhi && cua < nhi * 1.1) khoangHep.push(cua - nhi);
      if (cua === Math.min(...dai)) nganNhat += 1;
    }
  }
  khoangHep.sort((a, b) => a - b);
  return {
    tong, daiNhatDuyNhat, daiThayDuoc, nganNhat, nang,
    khoangHep: {
      so: khoangHep.length,
      trungBinh: khoangHep.length ? khoangHep.reduce((a, b) => a + b, 0) / khoangHep.length : 0,
      trungVi: khoangHep.length ? khoangHep[Math.floor(khoangHep.length / 2)] : 0,
      max: khoangHep.length ? khoangHep[khoangHep.length - 1] : 0,
    },
  };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const r = await doThienLech();
  const pc = (n) => `${n}/${r.tong} (${((n / r.tong) * 100).toFixed(1)}%)`;
  console.log('Tổng câu:', r.tong);
  console.log('Đáp án đúng là lựa chọn DÀI NHẤT (duy nhất):', pc(r.daiNhatDuyNhat));
  console.log('Đáp án đúng dài hơn THẤY ĐƯỢC (≥10%):', pc(r.daiThayDuoc));
  console.log('Đáp án đúng là lựa chọn NGẮN NHẤT:', pc(r.nganNhat));
  console.log('Kỳ vọng nếu không thiên lệch (4 lựa chọn): ~25%');
  const k = r.khoangHep;
  console.log(`
Dải 0–10% (dài nhất nhưng hơn rất ít): ${pc(k.so)}`);
  console.log(`  chênh lệch ký tự: trung bình ${k.trungBinh.toFixed(1)} · trung vị ${k.trungVi} · tối đa ${k.max}`);
  console.log('  (lựa chọn dài ~60 ký tự, nên vài ký tự là dưới một từ — không đọc ra được bằng mắt)');
  console.log(`\nNặng nhất (dài hơn lựa chọn nhì ≥40%): ${r.nang.length} câu`);
  for (const x of r.nang.slice(0, 30)) console.log(`  ${x.id} · ${x.q.slice(0, 50)}… (${x.cua} vs ${x.nhi})`);
}

// ── DANH SÁCH TỪNG CÂU LỆCH ≥10% (cờ --cau) ──────────────────────────────────
//
// Vì sao phải có trong repo chứ không nằm ở một script tạm: con số TỔNG ở trên chỉ
// nói "kho có lệch bao nhiêu phần trăm", nó KHÔNG nói câu nào. Danh sách từng câu
// mới là thứ đổi được cách soạn: đợt A1 phải sửa 9 câu SAU khi bánh cóc bắn, đợt
// A2 chỉ phải sửa 3 câu vì soạn xong là soi danh sách này ngay. Để nó ở scratchpad
// thì đợt sau lại phải dựng lại, hoặc bỏ luôn.
if (process.argv.includes('--cau')) {
  const { STORY_QUIZ } = await import(pathToFileURL(path.join(ROOT, 'src/data/storyQuiz.js')).href);
  const ra = [];
  for (const [id, qs] of Object.entries(STORY_QUIZ)) {
    (qs || []).forEach((q, i) => {
      const L = q.options.map((o) => String(o).length);
      const dung = L[q.answer];
      const nhi = Math.max(...L.filter((_, j) => j !== q.answer));
      if (dung > nhi * 1.10) ra.push({ id, i, dung, nhi, pct: (dung / nhi - 1) * 100, chenh: dung - nhi, dapAn: q.options[q.answer] });
    });
  }
  // SẮP THEO CHÊNH LỆCH TUYỆT ĐỐI, không theo phần trăm — và đây là một khuyết
  // điểm của chính phép đo ≥10% mà danh sách này lộ ra:
  // `history-civilizations-vstep[0]` lệch 13% nhưng chỉ hơn **1 ký tự** (9 vs 8),
  // vì lựa chọn ở đó rất ngắn. Một ký tự thì không mắt nào đọc ra được. Đây là
  // mặt ngược của chuyện đã ghi ở trên (vài ký tự trên lựa chọn 60 ký tự): phần
  // trăm nói sai ở CẢ HAI đầu — trên lựa chọn dài thì nó bỏ sót, trên lựa chọn
  // ngắn thì nó báo động giả.
  //
  // KHÔNG đổi phép đo của bánh cóc theo phát hiện này. Nới định nghĩa "thấy được"
  // để con số đẹp hơn là dịch cột gôn. Chỉ IN THÊM chênh lệch tuyệt đối để người
  // soạn biết câu nào đáng sửa thật.
  ra.sort((a, b) => b.chenh - a.chenh);
  console.log(`
── TỪNG CÂU LỆCH THẤY ĐƯỢC (≥10%): ${ra.length} câu ──`);
  console.log('   (sắp theo CHÊNH LỆCH KÝ TỰ, không theo %: trên lựa chọn ngắn thì % báo động giả)');
  for (const r of ra) console.log(`  ${String(r.chenh).padStart(3)} ký tự (+${r.pct.toFixed(0)}%)  ${r.id}[${r.i}]  ${r.dung}/${r.nhi}
         "${r.dapAn}"`);
  if (ra.length === 0) console.log('  (không câu nào — sửa câu NHIỄU cho dài tương đương, đừng cắt ngắn đáp án đúng)');
  else {
    const c = ra.map((r) => r.chenh).sort((a, b) => a - b);
    console.log(`
  Chênh lệch tuyệt đối của phần còn lại: nhỏ nhất ${c[0]} · trung vị ${c[Math.floor(c.length / 2)]} · lớn nhất ${c[c.length - 1]} ký tự.`);
    console.log('  ĐO, KHÔNG KHẲNG ĐỊNH: trên lựa chọn dài 60–75 ký tự thì mức đó là dưới một từ.');
    console.log('  Sửa tiếp thì phải KÉO DÀI câu nhiễu dài nhất, đừng cắt ngắn đáp án đúng —');
    console.log('  cắt đáp án là làm nó rời khỏi câu căn cứ trong bài.');
  }
}
