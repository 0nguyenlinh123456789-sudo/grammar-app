// File: scripts/lib/mocLoTrinh.mjs
// MỘT luật duy nhất: khi sinh lại lộ trình thì "mốc cũ" (TONG_CHANG_TRUOC) đi
// đâu. Tách ra khỏi build_roadmap.mjs vì bộ sinh là script chạy thẳng, không có
// cổng gọi-trực-tiếp nên test không import được — mà luật này thì PHẢI test:
// bản đầu của nó sai, và cái sai đó im lặng.
//
// Nó phục vụ đúng một người: người đang học dở ở mốc cũ, CHƯA mở app lại nên
// trong máy họ chưa có `roadmapSeenTotalV1`. Với người đó, chỗ duy nhất còn giữ
// mốc cũ là file máy sinh. Xoá ở đây là mẫu số tiến độ của họ tự nhảy lên mà
// không ai nói gì — xem src/utils/roadmapGrowth.js.

const doc = (s, ten) => Number(s.match(new RegExp(`export const ${ten} = (\\d+)`))?.[1]);

/**
 * @param {string|null} noiDungFileCu  nội dung roadmapCounts.js trước khi ghi đè
 *                                     (null = lần sinh đầu tiên, chưa có file)
 * @param {number} tongMoi             tổng chặng của lần sinh này
 * @returns {number} giá trị cho TONG_CHANG_TRUOC
 */
export function mocCuTiepTheo(noiDungFileCu, tongMoi) {
  if (!noiDungFileCu) return tongMoi;            // lần đầu: "không có gì đổi"
  const cuTong = doc(noiDungFileCu, 'TONG_CHANG');
  const cuTruoc = doc(noiDungFileCu, 'TONG_CHANG_TRUOC');
  // Tổng ĐỔI THẬT → mốc cũ dịch lên tổng vừa rồi.
  if (Number.isFinite(cuTong) && cuTong !== tongMoi) return cuTong;
  // Tổng KHÔNG đổi (chạy lại vì dọn hằng số, sửa chú thích) → giữ nguyên mốc.
  if (Number.isFinite(cuTruoc)) return cuTruoc;
  return tongMoi;
}
