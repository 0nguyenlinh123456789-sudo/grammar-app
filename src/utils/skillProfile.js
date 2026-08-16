// File: src/utils/skillProfile.js
// HỒ SƠ NĂNG LỰC THEO KỸ NĂNG (việc 4.3) — thuần tính toán, có test.
//
// "B2 nghe ≠ B2 viết; gộp lại là giấu điểm yếu." Nhưng tách ra bốn thanh rồi
// điền số vào cả bốn thì còn tệ hơn gộp: hiện app CHƯA ĐO ĐƯỢC nghe, nói, viết.
//   - Nghe: kho không có một file âm thanh giọng người thật nào (việc 2.1, Đợt 3).
//     Đo bằng giọng máy đọc rồi gọi là "điểm nghe" là thay thế âm thầm.
//   - Viết / Nói: chưa có ngân hàng đề, cũng chưa có cách chấm (3.3/3.5, Đợt 4).
// Nên hồ sơ này hiển thị ĐỦ BỐN KỸ NĂNG, và ba kỹ năng chưa đo được thì ghi
// thẳng "CHƯA ĐO ĐƯỢC" kèm lý do — không phải một thanh 0% (0% là một tuyên bố
// sai: nó nói người học làm sai hết).
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

// Lý do CỤ THỂ, kèm mốc — "chưa có" mà không nói bao giờ có thì cũng là một
// dạng im lặng.
export const NOT_MEASURED_REASON = {
  listening: 'Chưa đo được — cần bài nghe giọng người thật, chưa có file âm thanh nào trong kho.',
  speaking: 'Chưa đo được — chưa có đề nói và cách chấm phát âm.',
  writing: 'Chưa đo được — chưa có ngân hàng đề viết và cách chấm.',
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
// Truyền `hoatDong.writing = thongKeTuBaoCao()` từ writingLog.js vào đây.
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
      tuBaoCaoLabel: `Đã tự đánh giá ${tk.soBai} bài viết trên ${tk.soDe} đề — đây là bạn tự chấm, chưa phải điểm đo được.`,
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
