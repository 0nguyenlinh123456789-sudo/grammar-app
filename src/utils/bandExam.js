// File: src/utils/bandExam.js
// CHẤM BÀI THI CUỐI BẬC (việc 4.2).
//
// ══ LUẬT SỐ MỘT: NHÃN BẬC CHỈ ĐƯỢC SUY RA TỪ PHẦN CHẤM ĐƯỢC ══
// Bài thi có đủ 4 phần, nhưng chỉ Nghe và Đọc mang cờ `chamDuoc: true`. Viết và
// Nói vẫn phải LÀM (đó là lý do bài thi có 4 phần), nhưng chúng KHÔNG được góp
// một phần trăm nào vào quyết định đạt/chưa đạt — vì app không chấm được chúng.
// Gộp phần tự chấm vào quyết định đạt là biến "người học tự tin" thành "người
// học đạt B2", đúng cái đã từ chối ở việc 3.4/3.5.
//
// ══ LUẬT SỐ HAI: KHÔNG SUY BẬC TỪ PHẦN TRĂM ══
// `mockTest.js` cũ quy đổi % đúng → điểm VSTEP → nhãn C1/B2/B1/A2 bằng một công
// thức tuyến tính trên 20 câu. Việc 4.1 đã bỏ đúng cách làm đó cho test đầu vào
// ("trình độ lấy từ NẤC THANG, không từ % đúng") và ở đây cũng vậy: mỗi đề gắn
// CỨNG với MỘT bậc. Làm đề B1 thì chỉ có hai kết quả — đạt B1, hoặc chưa đạt.
// KHÔNG có chuyện làm đề B1 rồi được gắn nhãn B2 vì đúng nhiều.
//
// ══ LUẬT SỐ BA: ĐẠT TỪNG PHẦN, KHÔNG ĐẠT TỔNG ══
// Ngưỡng áp cho TỪNG phần chấm được. Lấy tổng thì một người nghe 0/6 mà đọc
// 8/8 vẫn "đạt" — trong khi cái đang cần chứng nhận là cả hai.

import { MOC_TRON_PHUONG_AN } from './tinCayXacMinh.js';

const KEY = 'bandExamHistoryV1';
const TOI_DA = 30;

/** Ngưỡng đạt của MỖI phần chấm được. */
export const NGUONG_DAT = 0.7;

const coStorage = () => typeof localStorage !== 'undefined';

/** Các phần chấm được của một đề. */
export function phanChamDuoc(exam) {
  return (exam?.sections || []).filter((s) => s.chamDuoc === true);
}

/** Các phần KHÔNG chấm được — vẫn phải làm, nhưng không quyết định đạt/chưa. */
export function phanKhongChamDuoc(exam) {
  return (exam?.sections || []).filter((s) => s.chamDuoc !== true);
}

/**
 * Chấm một lượt thi.
 * @param {object} exam  một đề trong bandExamBank.js
 * @param {object} traLoi { [itemId]: optionIndex }
 */
export function chamBaiThi(exam, traLoi = {}) {
  const phan = [];
  const cauSai = [];

  for (const s of phanChamDuoc(exam)) {
    let dung = 0;
    for (const it of s.items || []) {
      const chon = traLoi[it.id];
      if (chon === it.answer) dung += 1;
      else cauSai.push({ ...it, sectionKey: s.key, sectionNhan: s.nhan, daChon: chon });
    }
    const tong = (s.items || []).length;
    const tyLe = tong ? dung / tong : 0;
    phan.push({ key: s.key, nhan: s.nhan, dung, tong, tyLe, dat: tong > 0 && tyLe >= NGUONG_DAT });
  }

  // ĐẠT = mọi phần chấm được đều đạt ngưỡng. Không có phần chấm được nào thì
  // KHÔNG đạt — chứ không phải "đạt vì chẳng có gì để trượt".
  const dat = phan.length > 0 && phan.every((p) => p.dat);

  return {
    examId: exam?.id || '',
    cefr: exam?.cefr || '',
    phan,
    cauSai,
    dat,
    // Những phần đã LÀM nhưng KHÔNG tính vào kết quả — đi kèm bản ghi tới tận
    // giao diện và tờ chứng nhận, để không ai đọc "đạt B2" mà tưởng đã đo cả
    // bốn kỹ năng.
    phanKhongTinh: phanKhongChamDuoc(exam).map((s) => ({ key: s.key, nhan: s.nhan, lyDo: s.lyDoKhongCham })),
    nhanBac: dat ? exam?.cefr || '' : null,
    moTaCanCu: `Kết quả này chỉ dựa trên phần ${phanChamDuoc(exam).map((s) => s.nhan).join(' và ')} — hai phần app chấm được.`,
    lucLam: new Date().toISOString(),
  };
}

// ── SỔ KẾT QUẢ ───────────────────────────────────────────────────────────────

function load() {
  if (!coStorage()) return [];
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(p) ? p : [];
  } catch { return []; }
}

export function luuKetQua(kq) {
  if (!kq?.examId) return null;
  const ds = load();
  ds.push(kq);
  if (coStorage()) {
    try { localStorage.setItem(KEY, JSON.stringify(ds.slice(-TOI_DA))); } catch { /* ignore */ }
  }
  return kq;
}

export function docLichSuThi() {
  return load();
}

// Bản ghi ĐỌC RA phải luôn có đủ hình dạng tờ chứng nhận cần in. Bản ghi cũ,
// bản ghi bị cắt cụt, hay bản ghi ai đó sửa tay trong localStorage đều có thể
// thiếu `phan`/`phanKhongTinh` — và `.map` trên `undefined` sẽ NÉM LỖI ngay
// giữa tờ giấy đi ra ngoài. Chuẩn hoá lúc đọc, đúng như đã làm với bản ghi
// thiếu `kyNang` ở selfReportLog.js.
function chuanHoa(k) {
  if (!k || typeof k !== 'object') return null;
  return {
    ...k,
    phan: Array.isArray(k.phan) ? k.phan : [],
    phanKhongTinh: Array.isArray(k.phanKhongTinh) ? k.phanKhongTinh : [],
    moTaCanCu: k.moTaCanCu || 'Bản ghi cũ không lưu lại căn cứ chấm của lượt thi này.',
    lucLam: k.lucLam || null,
  };
}

// LƯỢT THI TRƯỚC 19/08/2026 KHÔNG DÙNG LÀM CĂN CỨ TUYÊN BỐ NỮA.
//
// Tới hôm đó, cả 42/42 câu của ba đề thi cuối bậc đều để đáp án đúng ở ô ĐẦU —
// bấm ô đầu mọi câu là qua sạch. `utils/tronPhuongAn.js` vá từ đó trở đi, nhưng
// lượt thi ĐÃ LƯU thì vẫn nằm trong sổ.
//
// Bản ghi KHÔNG bị xoá: sổ thi là nhật ký của người học, xoá là xoá lịch sử họ
// thật sự đã làm. Chỉ thôi dùng chúng để TUYÊN BỐ — mà tuyên bố chỉ đi qua đúng
// hai hàm dưới đây, nên chặn ở đây là đủ, không phá gì.
//
// Bản ghi không ghi ngày cũng bị loại: không chứng minh được nó có sau bản vá thì
// không dùng để nói người học đã đạt bậc nào.
const laLuotTinDuoc = (k) => !!k?.lucLam && String(k.lucLam) >= MOC_TRON_PHUONG_AN;

/** Lượt ĐẠT gần nhất của một bậc — căn cứ duy nhất để gắn nhãn bậc. */
export function luotDatGanNhat(cefr) {
  const ds = load().filter((k) => k?.cefr === cefr && k?.dat && laLuotTinDuoc(k)).map(chuanHoa).filter(Boolean);
  // Bản ghi không có ngày thi thì KHÔNG dùng làm căn cứ in giấy: nghiệm thu của
  // việc 4.4 đòi ghi rõ bậc VÀ ngày thi, in một tờ giấy thiếu ngày thì thà không in.
  const co = ds.filter((k) => k.lucLam);
  return co.length ? co[co.length - 1] : null;
}

/** Bậc cao nhất người học đã ĐẠT bằng bài thi cuối bậc, hoặc null. */
export function bacDaDat() {
  const THU_TU = ['A2', 'B1', 'B2'];
  let cao = null;
  for (const k of load()) {
    if (!k.dat || !laLuotTinDuoc(k)) continue;
    if (cao === null || THU_TU.indexOf(k.cefr) > THU_TU.indexOf(cao)) cao = k.cefr;
  }
  return cao;
}

export const BAND_EXAM_KEY = KEY;
