// File: src/utils/skillProfile.js
// HỒ SƠ NĂNG LỰC THEO KỸ NĂNG (việc 4.3) — thuần tính toán, có test.
//
// "B2 nghe ≠ B2 viết; gộp lại là giấu điểm yếu." Nhưng tách ra bốn thanh rồi
// điền số vào cả bốn thì còn tệ hơn gộp: hồ sơ này dựng từ BÀI TEST ĐẦU VÀO,
// mà bài đó chỉ hỏi phần Đọc và Ngữ pháp. Nghe, Nói, Viết không có số ở đây.
// Nên hồ sơ hiển thị ĐỦ BỐN KỸ NĂNG, và ba kỹ năng không có số thì ghi thẳng
// "CHƯA ĐO ĐƯỢC" kèm lý do — không phải một thanh 0% (0% là một tuyên bố sai:
// nó nói người học làm sai hết).
//
// ⚠️ LÝ DO Ở ĐÂY ĐÃ TỪNG SAI, VÀ SAI THEO KIỂU KHÓ THẤY NHẤT.
// Ba dòng lý do cũ nói: "kho không có một file âm thanh giọng người thật nào",
// "chưa có đề nói", "chưa có ngân hàng đề viết". Cả ba đều ĐÚNG lúc viết ra và
// đều đã HẾT đúng: nay có 239 bản thu Tatoeba ship kèm, 60 bài nghe VOA, 621
// đề viết và 620 đề nói gắn theo chặng. Câu "chưa đo được" thì vẫn đúng —
// nhưng LÝ DO đi kèm đã thành lời nói xấu chính kho nội dung của mình, in ra
// tận tờ báo cáo phụ huynh.
//
// Bài học: **lý do phải nói về CÁI ĐO, không nói về CÁI CÓ.** Cái đo (test đầu
// vào hỏi gì) là thứ ổn định; cái có (kho nội dung) thì lớn lên mỗi đợt, và
// mỗi lần nó lớn lên là một dòng lý do ở đây âm thầm thành sai.
export const CEFR_SKILL_ORDER = ['listening', 'speaking', 'reading', 'writing'];

export const SKILL_LABEL = {
  listening: 'Nghe',
  speaking: 'Nói',
  reading: 'Đọc',
  writing: 'Viết',
  grammar: 'Ngữ pháp',
  vocabulary: 'Từ vựng',
};

export const SKILL_ICON = {
  listening: '🎧', speaking: '🗣️', reading: '📖', writing: '✍️',
  grammar: '🧱', vocabulary: '📚',
};

// Lý do phải nói về CÁI ĐO, không về CÁI CÓ — xem ghi chú ở đầu file. Và phải
// chỉ ra đường đi tiếp: "chưa đo được" mà không nói đo ở đâu cũng là một dạng
// im lặng.
export const NOT_MEASURED_REASON = {
  listening: 'Chưa đo được — bài kiểm tra đầu vào không có phần Nghe. Muốn có số, làm bài thi cuối bậc (phần Nghe dùng giọng người thật).',
  speaking: 'Chưa đo được — bài kiểm tra đầu vào không có phần Nói, và ứng dụng KHÔNG chấm phát âm ở bất kỳ đâu. Đề nói thì có sẵn theo từng chặng.',
  writing: 'Chưa đo được — bài kiểm tra đầu vào không có phần Viết, và ứng dụng KHÔNG chấm ngữ pháp bài viết. Đề viết kèm bài mẫu thì có sẵn theo từng chặng.',
};

// Hai kỹ năng nền: không nằm trong bốn kỹ năng CEFR, nhưng bài test đầu vào đo
// được và chúng đỡ cho cả bốn kỹ năng kia.
export const FOUNDATION_ORDER = ['grammar', 'vocabulary'];

const percentOf = (stat) => (stat && stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : null);

function row(key, result) {
  const stat = result?.skillStats?.[key];
  const percent = percentOf(stat);
  if (percent === null) {
    return {
      key,
      label: SKILL_LABEL[key] || key,
      icon: SKILL_ICON[key] || '•',
      measured: false,
      percent: null,
      cefr: null,
      correct: 0,
      total: 0,
      reason: NOT_MEASURED_REASON[key] || 'Chưa đo được trong bài test đầu vào.',
    };
  }
  return {
    key,
    label: SKILL_LABEL[key] || key,
    icon: SKILL_ICON[key] || '•',
    measured: true,
    percent,
    // Bậc sơ bộ: chỉ 2 câu/bậc/kỹ năng nên đây là ước lượng, giao diện phải ghi
    // rõ. Kết quả cũ (v1) không có skillCefr → null, và cũng không bịa ra.
    cefr: result?.skillCefr?.[key] || null,
    correct: stat.correct,
    total: stat.total,
    reason: null,
  };
}

// `legacy`: kết quả lưu từ bài test cũ (12 câu, không nhãn bậc). Vẫn đọc được
// phần đúng/sai của nó, nhưng KHÔNG suy ra bậc CEFR từ đó, và giao diện phải mời
// làm lại bài mới.
// TRẠNG THÁI THỨ BA: "TỰ BÁO CÁO" — không phải đo được, cũng không phải trống.
//
// Việc 3.4 mở đường viết không cần key: người học viết, tự soi bài theo checklist
// rồi tự tick. Từ đó có một đường rất cám dỗ: lấy số tiêu chí họ tự tick, chia
// cho tổng, ra phần trăm, đổ vào ô Viết. ĐỪNG. Người tự chấm bài mình đang báo
// cáo mức TỰ TIN, không phải mức NĂNG LỰC — hai thứ đó lệch nhau nhiều nhất
// đúng ở người mới học.
//
// Nên `measured` vẫn là false, `percent` vẫn là null, lý do "chưa đo được" vẫn
// hiện. Hoạt động tự đánh giá chỉ thêm một dòng RIÊNG, nói rõ đó là tự báo cáo.
// Truyền `hoatDong.writing`/`hoatDong.speaking = thongKeTuBaoCao(kỹ năng)` từ
// selfReportLog.js vào đây. Cùng một luật cho cả hai: THÊM một dòng, không đổi
// `measured`, không đổi `percent`.
export function buildSkillProfile(result, hoatDong = null) {
  if (!result) return null;
  const legacy = !result.version || result.version < 2;
  const gan = (r) => {
    const tk = hoatDong?.[r.key];
    if (!tk || !tk.soBai) return r;
    if (!tk.tuBaoCao) {
      // Chỉ nhận dữ liệu có cờ tự báo cáo. Nếu chỗ gọi quên gắn cờ, thà bỏ qua
      // còn hơn im lặng nhận một con số không rõ nguồn gốc.
      return r;
    }
    return {
      ...r,
      // KHÔNG đổi `measured`, KHÔNG đổi `percent`. Chỉ thêm thông tin.
      tuBaoCao: { soBai: tk.soBai, soDe: tk.soDe, lanCuoi: tk.lanCuoi || null },
      // Danh từ phải theo KỸ NĂNG. Viết cứng "bài viết" thì ô Nói hiện ra
      // "Đã tự đánh giá 5 bài viết" — nói sai với người học ngay ở dòng có
      // nhiệm vụ nói thật.
      // (5.4) Nhắc vòng viết lại khi có — vẫn chỉ là ĐẾM HOẠT ĐỘNG.
      tuBaoCaoLabel: `Đã tự đánh giá ${tk.soBai} ${tk.danhTu || 'lượt làm'} trên ${tk.soDe} đề${tk.deCoVietLai ? `, trong đó ${tk.deCoVietLai} đề đã viết lại bản 2` : ''} — đây là bạn tự chấm, chưa phải điểm đo được.`,
    };
  };
  return {
    legacy,
    cefr: legacy ? null : result.cefr || null,
    preA1: !legacy && !!result.preA1,
    correct: result.correct ?? 0,
    total: result.total ?? 0,
    cefrSkills: CEFR_SKILL_ORDER.map((key) => gan(row(key, result))),
    foundation: FOUNDATION_ORDER.map((key) => gan(row(key, result))),
    measuredCount: [...CEFR_SKILL_ORDER, ...FOUNDATION_ORDER].filter((k) => percentOf(result?.skillStats?.[k]) !== null).length,
  };
}
