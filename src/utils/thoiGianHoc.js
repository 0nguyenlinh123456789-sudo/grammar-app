// File: src/utils/thoiGianHoc.js
// ĐỒNG HỒ HỌC THẬT — để những con số "~N giờ" thôi là lời khai một chiều.
//
// ══ LỖ ĐÃ CÓ ══
// Khắp lộ trình có "~45 phút", "~587 giờ cộng dồn". Toàn bộ là ƯỚC LƯỢNG TĨNH
// tính từ số bài trong chặng. Không có một dòng nào trong app đo thời gian
// thật, nên không ai — kể cả chủ dự án — kiểm được ước lượng đó sai bao nhiêu.
// Một con số không có cách nào sai thì cũng không có cách nào đúng.
//
// ══ CÁI ĐỒNG HỒ NÀY ĐO, VÀ CÁI NÓ KHÔNG ĐO ══
// ĐO: thời gian tab đang MỞ, đang HIỆN, và người dùng có chạm vào trong vòng
//   `IM_LANG_TOI_DA` gần nhất.
// KHÔNG ĐO: người đó có đang HỌC hay không. Mở app rồi ngồi nhìn cũng được
//   tính; học trên giấy rồi vào gõ đáp án thì không được tính. Nên nhãn hiện ra
//   phải là "thời gian mở app có tương tác", KHÔNG được gọi là "thời gian học".
//   Gọi sai tên là biến một phép đo thật thành một tuyên bố sai — đúng loại đã
//   gỡ ở "AI NGHE THẤY" và "Phát âm chuẩn!".
//
// ══ VÌ SAO PHẢI TỰ DỪNG ══
// Đếm bằng đồng hồ treo tường thì một tab quên đóng qua đêm đẻ ra 8 giờ học.
// Con số đó sẽ đi thẳng vào báo cáo phụ huynh. Nên có hai cửa: tab phải HIỆN,
// và phải có tương tác gần đây.

import { docJson, ghiJson, xoaKho } from './kho.js';
const KEY = 'thoiGianHocV1';

/** Nhịp ghi. Ngắn thì tốn ghi đĩa, dài thì mất mát khi đóng tab đột ngột. */
export const NHIP_GIAY = 15;

/** Không chạm gì quá ngần này thì coi như đã rời đi. */
export const IM_LANG_TOI_DA_GIAY = 90;

/** Trần mỗi ngày. Quá mức này gần như chắc chắn là đồng hồ chạy hoang. */
export const TRAN_MOI_NGAY_GIAY = 10 * 3600;

// ⚠️ `typeof localStorage !== 'undefined'` KHÔNG phải một cái chốt an toàn.
// `localStorage` là thuộc tính CÓ KHAI BÁO của `window`, nên `typeof` vẫn GỌI
// getter của nó — và ở iOS Safari bật "Chặn tất cả cookie" getter đó NÉM, ngay
// tại dòng lẽ ra để phòng thân. Cả họ chốt này đã được thay bằng utils/kho.js,
// nơi mọi lượt chạm nằm gọn trong try. Lý do đầy đủ ở đầu src/utils/kho.js.

export const ngayHomNay = (d = new Date()) => {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

function doc() {
  try {
    const o = docJson(KEY, {});
    return o && typeof o === 'object' && !Array.isArray(o) ? o : {};
  } catch { return {}; }
}

function ghi(o) {
  ghiJson(KEY, o);
}

/**
 * Cộng thêm một nhịp vào hôm nay. Trả về tổng giây của hôm nay sau khi cộng.
 *
 * Nhịp âm, nhịp khổng lồ (máy ngủ dậy, đồng hồ hệ thống nhảy) đều bị chặn ở
 * đây chứ không phải ở nơi gọi: nơi gọi thì có nhiều, luật thì chỉ nên có một.
 */
export function themNhip(giay = NHIP_GIAY, ngay = ngayHomNay()) {
  const n = Number(giay);
  if (!Number.isFinite(n) || n <= 0) return docNgay(ngay);
  // Một nhịp không bao giờ dài hơn 4 lần nhịp đã hẹn. Dài hơn nghĩa là máy vừa
  // ngủ dậy hoặc đồng hồ hệ thống vừa nhảy — không phải người ta vừa học liền.
  const hop = Math.min(n, NHIP_GIAY * 4);
  const o = doc();
  o[ngay] = Math.min(TRAN_MOI_NGAY_GIAY, (Number(o[ngay]) || 0) + hop);
  ghi(o);
  return o[ngay];
}

export function docNgay(ngay = ngayHomNay()) {
  return Number(doc()[ngay]) || 0;
}

/** Tổng giây từ trước tới nay. */
export function tongGiay() {
  return Object.values(doc()).reduce((s, v) => s + (Number(v) || 0), 0);
}

/** Tổng giây trong N ngày gần nhất, tính cả hôm nay. */
export function giayGanDay(soNgay = 7) {
  const o = doc();
  let s = 0;
  const d = new Date();
  for (let i = 0; i < soNgay; i++) {
    s += Number(o[ngayHomNay(d)]) || 0;
    d.setDate(d.getDate() - 1);
  }
  return s;
}

/** Số ngày CÓ HỌC (giây > 0). Dùng để nói "trung bình mỗi ngày học". */
export function soNgayCoHoc() {
  return Object.values(doc()).filter((v) => (Number(v) || 0) > 0).length;
}

/**
 * So thời gian ĐO ĐƯỢC với ước lượng của phần đã đi qua.
 *
 * Đây mới là việc chính của cả file này: biến "~N giờ" từ một lời khai thành
 * một con số kiểm được. Trả về `null` khi chưa đủ dữ liệu để nói gì — thà im
 * còn hơn in ra một tỷ lệ dựng trên 5 phút dùng thử.
 */
export function doVoiUocLuong(phutUocLuong, giayDoDuoc = tongGiay(), toiThieuGiay = 1800) {
  const uoc = Number(phutUocLuong) || 0;
  if (uoc <= 0 || giayDoDuoc < toiThieuGiay) return null;
  const phutThat = giayDoDuoc / 60;
  const tyLe = phutThat / uoc;
  return {
    phutThat: Math.round(phutThat),
    phutUocLuong: Math.round(uoc),
    tyLe,
    // Chỉ ba mức, và mức giữa rộng: một ước lượng lệch 20% vẫn là ước lượng tốt,
    // gắn cờ cho nó là tạo báo động giả rồi không ai đọc nữa.
    nhan: tyLe > 1.35 ? 'cham hon' : tyLe < 0.65 ? 'nhanh hon' : 'sat',
  };
}

export function xoaHet() {
  xoaKho(KEY);
}

export const THOI_GIAN_HOC_KEY = KEY;
