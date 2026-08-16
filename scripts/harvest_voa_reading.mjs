// File: scripts/harvest_voa_reading.mjs
// THU THẬP VĂN BẢN ĐỌC DÀI 600–1.000 TỪ TỪ VOA LEARNING ENGLISH (việc 5.3)
// — RA BẢNG ĐỂ DUYỆT, không commit gì.
//
// Chạy:  node scripts/harvest_voa_reading.mjs --out voa_doc_ung_vien.json --pages 12
//
// ══ VÌ SAO KHÔNG DÙNG LẠI harvest_voa_passages.mjs ══
// Bộ đó thu bài NGHE: bắt buộc có mp3, CORS mở, 60–300 giây. Bài ĐỌC không cần
// gì trong số đó, và giới hạn 300 giây (~500 từ) loại đúng những bài dài mà
// việc 5.3 cần. Nhưng LUẬT GIẤY PHÉP thì nghiêm hơn ở đây — xem ngay dưới.
//
// ══ LUẬT GIẤY PHÉP — NGHIÊM HƠN BỘ THU BÀI NGHE ══
// Điều khoản VOA (https://learningenglish.voanews.com/p/6021.html): chỉ tư liệu
// "produced exclusively by the Voice of America" thuộc phạm vi công cộng;
// Associated Press bị loại trừ TƯỜNG MINH.
//
// Đo thử 15 bài mới nhất của ba mục báo/khoa học (2026-08-16): 12/15 bài ghi
// công hãng thông tấn — "X reported this story for the Associated Press. Y
// adapted it for VOA Learning English." Bài "adapted" là VOA viết lại từ tường
// thuật của hãng tin; ranh giới phái sinh không rõ, nên KHÔNG XÉT — cùng lối
// hành xử với bài dựa trên lời bài hát ở bộ thu bài nghe.
//
// Bài ĐƯỢC NHẬN phải thoả CẢ HAI:
//   1. CÓ dòng ghi công nói bài do người của VOA viết CHO VOA ("wrote this
//      story for VOA Learning English" / "for VOA Special English");
//   2. KHÔNG NHẮC bất kỳ hãng thông tấn nào ở bất cứ đâu trong bài.
// Thiếu (1) → "không thấy dòng ghi công VOA" — thà bỏ sót còn hơn nhận nhầm.
import fs from 'fs';
import { pathToFileURL } from 'url';
import { locBanChepLoi, tachTuKho } from '../src/utils/transcriptClean.js';
import { timLoThung } from './harvest_voa_passages.mjs';

// Ba mục THỂ LOẠI THẬT (báo / khoa học thường thức) — đúng chữ của việc 5.3.
// KHÔNG lấy American Stories (truyện hư cấu) và các loạt bài dạy học (đã dùng
// cho bài nghe, và không phải "thể loại thật").
const MUC = [
  { id: 'science-technology', z: 1579, ten: 'Science & Technology' },
  { id: 'health-lifestyle', z: 955, ten: 'Health & Lifestyle' },
  { id: 'arts-culture', z: 986, ten: 'Arts & Culture' },
  // Đo đợt đầu (8 trang × 3 mục): chỉ 9/288 bài đạt — 264 bài dính hãng thông
  // tấn. Bài VOA-tự-viết tập trung ở kho CŨ (các bài VOA Special English đăng
  // lại) nên phải đào sâu nhiều trang, và thêm hai mục cũng do VOA tự sản xuất:
  // As It Is (tạp chí thời sự thường thức 2013–2014) và Education Tips (báo
  // tư vấn học tập). Luật giấy phép áp y nguyên cho cả hai.
  { id: 'as-it-is', z: 3521, ten: 'As It Is' },
  { id: 'education-tips', z: 7468, ten: 'Education Tips' },
];

const STATEMENT_URL = 'https://learningenglish.voanews.com/p/6021.html';
const GOC = 'https://learningenglish.voanews.com';

const arg = (t, m) => { const i = process.argv.indexOf(`--${t}`); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : m; };
const OUT = arg('out', 'voa_doc_ung_vien.json');
const TU_MIN = Number(arg('minWords', 600));
const TU_MAX = Number(arg('maxWords', 1000));
const SO_TRANG = Number(arg('pages', 12));
const HOM_NAY = arg('date', new Date().toISOString().slice(0, 10));

// (1) Dòng ghi công VOA-viết-cho-VOA. "VOA Special English" là tên cũ của
// chính Learning English (đổi tên 2014) — bài cũ đăng lại vẫn của VOA.
const GHI_CONG_VOA = /\b(wrote|reported)( on)? this (story|report|lesson) for (VOA Learning English|VOA Special English|Learning English)\b/i;

// (2) Hãng thông tấn — gặp Ở BẤT CỨ ĐÂU trong bài là loại. Kê cả các biến thể
// chính tả VOA từng dùng ("Agence-France Presse", "Agence France-Presse").
const HANG_THONG_TAN = /\b(Associated Press|Reuters|Agence[ -]France[ -]Presse?|AFP|Bloomberg|New York Times|Washington Post)\b/i;

// Cùng năm nhóm chủ đề nhạy cảm của bộ thu bài nghe, cùng cách áp: tiêu đề
// dính → loại; thân bài dính ≥3 từ khác nhau → ghi cảnh báo cho người đọc.
const CHU_DE_NHAY_CAM = [
  'commun', 'fascis', 'nazi', 'soviet', 'president', 'election', 'politic', 'senate', 'congress',
  'god', 'jesus', 'allah', 'islam', 'christian', 'muslim', 'church', 'bible', 'pray',
  'abortion', 'kill', 'murder', 'suicide', 'died', 'dead', 'war', 'weapon', 'gun', 'soldier',
  'prison', 'arrest', 'terroris',
  'alcohol', 'cigarett', 'drunk',
  'racist', 'porn',
];
const dinhChuDe = (s) => CHU_DE_NHAY_CAM.filter((t) => new RegExp(`\\b${t}`, 'i').test(String(s || '')));
const CO_LOI_NHAC = /\bin the song\b|\bsang about\b|\blyrics\b|\bthe song\b/i;

const goHtml = (s) => String(s || '')
  .replace(/<[^>]*>/g, '')
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ')
  .replace(/&#x[0-9a-f]+;|&#\d+;|&[a-z]+;/gi, ' ')
  .replace(/\s+/g, ' ').trim();

const RAC = new Set([
  'share', 'see comments', 'follow us', 'print', 'embed', 'direct link',
  'no media source currently available', 'question', 'question`', 'answer',
]);
const LA_RAC = (s) => RAC.has(String(s).toLowerCase().trim().replace(/[.:]$/, ''));

async function tai(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

export async function docBaiDoc(duongDan, muc) {
  const html = await tai(GOC + duongDan);
  const doanTho = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => goHtml(m[1])).filter((x) => x && !LA_RAC(x));
  if (doanTho.length < 3) return { bo: 'không tìm thấy thân bài' };

  const thung = timLoThung(doanTho);
  if (thung.length) return { bo: `thân bài thủng ${thung.length} chỗ: ${thung[0]}` };

  const caBai = doanTho.join(' ');
  // Luật giấy phép — cả hai vế, vế cấm soi TOÀN BỘ trang kể cả dòng ghi công.
  const hang = caBai.match(HANG_THONG_TAN);
  if (hang) return { bo: `nhắc hãng thông tấn ("${hang[0]}") — không thuộc phạm vi công cộng, không xét` };
  // LƯU NGUYÊN VĂN dòng ghi công vào hồ sơ: bộ làm sạch sẽ cắt nó khỏi thân
  // bài (nó không phải nội dung đọc), nên nếu chỉ kiểm ở đây mà không lưu thì
  // bằng chứng giấy phép biến mất cùng dòng bị cắt — không test nào kiểm lại
  // được nữa.
  const dongGhiCong = doanTho.find((d) => GHI_CONG_VOA.test(d));
  if (!dongGhiCong) return { bo: 'không thấy dòng ghi công "wrote this story for VOA Learning English" — không chứng minh được là bài VOA tự sản xuất' };
  if (CO_LOI_NHAC.test(caBai)) return { bo: 'bài dựa trên lời một bài hát — tư liệu bên thứ ba, không xét' };

  const tieuDe = goHtml((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/\s*-\s*VOA.*$/, '');
  const dinhTieuDe = dinhChuDe(tieuDe);
  if (dinhTieuDe.length) return { bo: `tiêu đề dính chủ đề nhạy cảm (${dinhTieuDe.join(', ')})` };

  // ĐẾM TỪ TRÊN THÂN BÀI ĐÃ LỌC — bỏ dòng ghi công, mục Words in This Story,
  // lời mời bình luận. Đếm trên bài thô là đếm cả những dòng người học không
  // đọc, và chính cái cửa 600–1.000 sẽ nhận/loại nhầm.
  const than = locBanChepLoi(doanTho);
  const soTu = than.join(' ').split(/\s+/).filter(Boolean).length;
  if (soTu < TU_MIN || soTu > TU_MAX) return { bo: `${soTu} từ, ngoài khoảng ${TU_MIN}–${TU_MAX}` };

  const dinhThan = [...new Set(dinhChuDe(than.join(' ')))];

  // mp3 là TUỲ CHỌN với bài đọc — có thì người học nghe kèm, không có cũng nhận.
  const mp3 = (html.match(/https?:\/\/[^"'\s]+\.mp3/) || [])[0];

  return {
    bai: {
      id: `voa-doc-${duongDan.match(/(\d+)\.html$/)?.[1] || duongDan.replace(/\W+/g, '')}`,
      title: tieuDe,
      series: muc.ten,
      seriesId: muc.id,
      audioUrl: mp3,
      words: soTu,
      canhBaoChuDe: dinhThan.length >= 3 ? dinhThan : undefined,
      transcript: than,
      tuKho: tachTuKho(doanTho),
      dongGhiCong,
      source: 'VOA Learning English',
      sourceUrl: GOC + duongDan,
      license: 'Public Domain',
      author: 'Voice of America',
      attributionUrl: GOC,
      licenseStatementUrl: STATEMENT_URL,
      licenseCheckedAt: HOM_NAY,
    },
  };
}

async function main() {
  // GỘP, KHÔNG GHI ĐÈ — file ứng viên lưu nguồn gốc của cả bài đã bị loại.
  // SỔ ĐÃ XÉT (`OUT + '.daxet.json'`): tỉ lệ đạt đo được chỉ ~3% (9/288 —
  // 264 bài dính hãng thông tấn), nên phải quét hàng nghìn trang bài. Không
  // ghi lại bài ĐÃ LOẠI thì mỗi lần chạy lại tải lại toàn bộ từ đầu; ghi lại
  // thì lần sau chỉ tải bài chưa xét — chạy đứt giữa chừng cũng không mất gì,
  // vì file được ghi SAU MỖI BÀI ĐẠT và sau mỗi mục.
  const daCo = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];
  const SO_DA_XET = OUT + '.daxet.json';
  const daXet = new Set(fs.existsSync(SO_DA_XET) ? JSON.parse(fs.readFileSync(SO_DA_XET, 'utf8')) : []);
  const ra = [...daCo];
  const coId = new Set(daCo.map((b) => b.id));
  const daXem = new Set();
  const bo = new Map();
  let them = 0;

  const luu = () => {
    fs.writeFileSync(OUT, JSON.stringify(ra, null, 2));
    fs.writeFileSync(SO_DA_XET, JSON.stringify([...daXet], null, 0));
  };

  for (const muc of MUC) {
    const links = [];
    for (let p = 0; p < SO_TRANG; p += 1) {
      const trang = await tai(p === 0 ? `${GOC}/z/${muc.z}` : `${GOC}/z/${muc.z}?p=${p}`);
      const truoc = links.length;
      for (const m of trang.matchAll(/href="(\/a\/[^"]+\.html)"/g)) {
        if (!daXem.has(m[1])) { daXem.add(m[1]); links.push(m[1]); }
      }
      if (links.length === truoc && p > 0) break; // hết kho lưu trữ
    }
    const chuaXet = links.filter((l) => {
      const id = `voa-doc-${l.match(/(\d+)\.html$/)?.[1] || l.replace(/\W+/g, '')}`;
      return !coId.has(id) && !daXet.has(id);
    });
    process.stderr.write(`\n== ${muc.ten}: ${links.length} bài trên ${SO_TRANG} trang, ${chuaXet.length} chưa xét\n`);

    // Tải 6 bài một lượt — tuần tự thì 2.000 bài mất ~25 phút, đứt là mất hết.
    for (let i = 0; i < chuaXet.length; i += 6) {
      await Promise.all(chuaXet.slice(i, i + 6).map(async (l) => {
        const id = `voa-doc-${l.match(/(\d+)\.html$/)?.[1] || l.replace(/\W+/g, '')}`;
        try {
          const kq = await docBaiDoc(l, muc);
          daXet.add(id);
          if (kq.bo) {
            const ly = kq.bo.replace(/\(".*?"\)|\d+/g, '…');
            bo.set(ly, (bo.get(ly) || 0) + 1);
          } else {
            ra.push(kq.bai); coId.add(id); them += 1;
            process.stderr.write(`  + ${kq.bai.id} · ${kq.bai.words} từ · ${kq.bai.title.slice(0, 60)}\n`);
          }
        } catch (e) {
          // KHÔNG ghi vào sổ đã xét: lỗi mạng thì lần sau phải thử lại.
          bo.set('lỗi tải trang', (bo.get('lỗi tải trang') || 0) + 1);
          process.stderr.write(`  ! ${l}: ${e.message}\n`);
        }
      }));
      if (them > 0 && them % 5 === 0) luu();
    }
    luu();
  }

  luu();
  process.stderr.write(`\nThêm ${them} bài mới → ${OUT} (tổng ${ra.length}; đã xét ${daXet.size} bài).\nLý do loại (gộp):\n`);
  for (const [ly, n] of [...bo.entries()].sort((a, b) => b[1] - a[1])) {
    process.stderr.write(`  ${String(n).padStart(4)}  ${ly}\n`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) await main();
