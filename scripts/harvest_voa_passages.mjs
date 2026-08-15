// File: scripts/harvest_voa_passages.mjs
// THU THẬP BÀI NGHE THEO ĐOẠN TỪ VOA LEARNING ENGLISH (việc 2.2)
// — RA BẢNG ĐỂ DUYỆT, không commit gì.
//
// Chạy:  node scripts/harvest_voa_passages.mjs --out voa_ung_vien.json
//
// VÌ SAO CHỈ LẤY CÁC LOẠT BÀI DẠY HỌC, KHÔNG LẤY BẢN TIN:
// Điều khoản của VOA (https://learningenglish.voanews.com/p/6021.html) nói:
// "All text, audio and video material produced exclusively by the Voice of
//  America is in the public domain… HOWEVER, voanews.com content may also
//  contain text, video, audio… licensed for use in VOA programming only. This
//  material is not in the public domain…" và loại trừ Associated Press tường
// minh.
// Nghĩa là KHÔNG có câu "VOA là public domain" áp dụng cho mọi bài. Bản tin
// thời sự là chỗ dễ có tiếng động/tư liệu của hãng thông tấn nhất. Các loạt
// bài DẠY HỌC dưới đây do chính biên tập viên VOA viết và dựng trong phòng
// thu — đó là trường hợp rõ ràng nhất thuộc phạm vi công cộng.
import fs from 'fs';

const LOAT_BAI = [
  { id: 'ask-a-teacher', z: 5535, ten: 'Ask a Teacher' },
  { id: 'words-and-their-stories', z: 987, ten: 'Words & Their Stories' },
  { id: 'everyday-grammar', z: 4456, ten: 'Everyday Grammar' },
  { id: 'education-tips', z: 7468, ten: 'Education Tips' },
];

const STATEMENT_URL = 'https://learningenglish.voanews.com/p/6021.html';
const GOC = 'https://learningenglish.voanews.com';
const BITRATE = 64_000; // đo được từ khung MPEG của file VOA

const arg = (t, m) => { const i = process.argv.indexOf(`--${t}`); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : m; };
const OUT = arg('out', 'voa_ung_vien.json');
const GIAY_MIN = Number(arg('minSeconds', 60));
const GIAY_MAX = Number(arg('maxSeconds', 300));
const HOM_NAY = arg('date', new Date().toISOString().slice(0, 10));

const goHtml = (s) => String(s || '')
  .replace(/<[^>]*>/g, '')
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ').replace(/&[a-z#0-9]+;/g, ' ')
  .replace(/\s+/g, ' ').trim();

async function tai(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

async function docBai(duongDan, loat) {
  const html = await tai(GOC + duongDan);
  const mp3 = (html.match(/https?:\/\/[^"'\s]+\.mp3/) || [])[0];
  if (!mp3) return { bo: 'không có file âm thanh trên trang' };

  const doan = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => goHtml(m[1])).filter((x) => x.length > 40);
  if (doan.length < 3) return { bo: 'không tìm thấy bản chép lời' };

  // Dòng đầu thường là tiêu đề lặp lại; các dòng cuối là chân trang/bình luận.
  const than = doan.filter((p) => !/^(Words in This Story|_+$)/i.test(p));
  const soTu = than.join(' ').split(/\s+/).length;

  // Thời lượng suy từ dung lượng file: VOA phát ở 64 kbps CBR (đã đo từ khung
  // MPEG). Không tải cả file về chỉ để biết nó dài bao nhiêu.
  const head = await fetch(mp3, { method: 'HEAD' });
  const bytes = Number(head.headers.get('content-length') || 0);
  const cors = head.headers.get('access-control-allow-origin') || '';
  if (!bytes) return { bo: 'máy chủ không cho biết dung lượng file' };
  // Ta TRỎ THẲNG tới máy chủ VOA chứ không sao chép file về, nên CORS là điều
  // kiện sống còn: đóng CORS thì trình duyệt của người học không phát được.
  // Loại ngay ở đây, không để lọt rồi cảnh báo suông.
  if (cors !== '*') return { bo: `CORS không mở ("${cors}") — trình duyệt sẽ không phát được` };
  const giay = Math.round((bytes * 8) / BITRATE);
  if (giay < GIAY_MIN || giay > GIAY_MAX) return { bo: `dài khoảng ${giay} giây, ngoài khoảng ${GIAY_MIN}–${GIAY_MAX}` };

  const tieuDe = goHtml((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/\s*-\s*VOA.*$/, '');

  return {
    bai: {
      id: `voa-${duongDan.match(/(\d+)\.html$/)?.[1] || duongDan.replace(/\W+/g, '')}`,
      title: tieuDe,
      series: loat.ten,
      seriesId: loat.id,
      audioUrl: mp3,
      bytes,
      // Suy từ dung lượng file với 64 kbps — bitrate đo được từ khung MPEG của
      // MỘT file. Bài nào mã hoá khác thì con số này lệch, nên tên trường nói rõ
      // đây là ƯỚC TÍNH và giao diện phải hiển thị kèm chữ "khoảng".
      secondsEstimated: giay,
      words: soTu,
      cors,
      transcript: than,
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
  const ra = [];
  const bo = [];
  for (const loat of LOAT_BAI) {
    const trang = await tai(`${GOC}/z/${loat.z}`);
    const links = [...new Set([...trang.matchAll(/href="(\/a\/[^"]+\.html)"/g)].map((m) => m[1]))];
    process.stderr.write(`\n== ${loat.ten}: ${links.length} bài\n`);
    for (const l of links) {
      try {
        const kq = await docBai(l, loat);
        if (kq.bo) { bo.push(`${l}: ${kq.bo}`); continue; }
        ra.push(kq.bai);
        process.stderr.write(`  ✓ ${String(kq.bai.secondsEstimated).padStart(3)}s · ${String(kq.bai.words).padStart(4)} từ · ${kq.bai.title.slice(0, 60)}\n`);
      } catch (e) { bo.push(`${l}: ${e.message}`); }
    }
  }

  fs.writeFileSync(OUT, JSON.stringify(ra, null, 2));
  process.stderr.write(`\nĐã ghi ${ra.length} bài vào ${OUT}. Bỏ ${bo.length} bài.\n`);
  if (bo.length) process.stderr.write('  ' + bo.slice(0, 12).join('\n  ') + '\n');
}

main().catch((e) => { process.stderr.write(`LỖI: ${e.message}\n`); process.exit(1); });
