// File: scripts/harvest_voa_passages.mjs
// THU THẬP BÀI NGHE THEO ĐOẠN TỪ VOA LEARNING ENGLISH (việc 2.2)
// — RA BẢNG ĐỂ DUYỆT, không commit gì.
//
// Chạy:  node scripts/harvest_voa_passages.mjs --out voa_ung_vien.json --pages 6
//
// GỘP, KHÔNG GHI ĐÈ: file ứng viên là chỗ lưu nguồn gốc của cả những bài đã bị
// LOẠI (lý do loại được ghim trong tests/listening_passages.test.js). Ghi đè nó
// là xoá mất bằng chứng, nên bộ thu thập đọc file cũ lên rồi chỉ thêm bài mới.
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

const arg = (t, m) => { const i = process.argv.indexOf(`--${t}`); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : m; };
const OUT = arg('out', 'voa_ung_vien.json');
const GIAY_MIN = Number(arg('minSeconds', 60));
const GIAY_MAX = Number(arg('maxSeconds', 300));
const SO_TRANG = Number(arg('pages', 1)); // trang 0 là trang đầu, rồi ?p=1, ?p=2…
// ĐO LẠI THỜI LƯỢNG cho những bài thu thập trước khi có bộ đọc bitrate.
// Không có cờ này thì kho lẫn hai cách tính trong cùng một file: bài cũ tính
// bằng 64 kbps ghi cứng và KHÔNG trừ thẻ ID3, bài mới thì có — hai nửa dữ liệu
// nói hai chuyện khác nhau mà chú thích ở đầu file chỉ kể một chuyện.
const DO_LAI = process.argv.includes('--remeasure');
const HOM_NAY = arg('date', new Date().toISOString().slice(0, 10));

// CHỦ ĐỀ KHÔNG ĐƯA VÀO BÀI HỌC — cùng năm nhóm đã dùng khi lọc câu chép chính
// tả (scripts/harvest_audio_candidates.mjs). Khác một chỗ quan trọng: ở đó mỗi
// câu chỉ ~7 từ nên hễ dính từ nào là loại; ở đây một bài dài 250 từ, gặp từ
// "war" một lần trong câu ví dụ không có nghĩa bài đó nói về chiến tranh. Nên:
//   - TIÊU ĐỀ dính → loại thẳng (tiêu đề nói lên bài viết về cái gì),
//   - THÂN BÀI dính từ 3 từ khác nhau trở lên → ghi cảnh báo để người đọc quyết,
//     không tự loại.
// Bài đã dính luật này lúc soạn tay: voa-7953635 "'Kitchen-Table' Is a Type of
// Politics".
const CHU_DE_NHAY_CAM = [
  'commun', 'fascis', 'nazi', 'soviet', 'president', 'election', 'politic', 'senate', 'congress',
  'god', 'jesus', 'allah', 'islam', 'christian', 'muslim', 'church', 'bible', 'pray',
  'abortion', 'kill', 'murder', 'suicide', 'died', 'dead', 'war', 'weapon', 'gun', 'soldier',
  'prison', 'arrest', 'terroris',
  'alcohol', 'cigarett', 'drunk',
  'racist', 'porn',
];
const dinhChuDe = (s) => CHU_DE_NHAY_CAM.filter((t) => new RegExp(`\\b${t}`, 'i').test(String(s || '')));

// BITRATE ĐỌC TỪ CHÍNH FILE, không phỏng đoán. Bản trước ghi cứng 64 kbps vì
// đo được từ MỘT file; nếu một bài mã hoá khác thì mọi con số thời lượng lệch
// theo tỉ lệ và cái cửa lọc 60–300 giây sẽ nhận/loại nhầm bài mà không ai biết.
// Đọc khung MPEG đầu tiên thì hết phải đoán. (Đã kiểm lại 20 bài đầu: cả 20
// đều là 64 kbps thật, kể cả bài từ năm 2015 — con số cũ đúng, nhưng đúng do
// may chứ không do đo.)
const BANG_BITRATE = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
export function docBitrate(buf) {
  let o = 0;
  if (buf.slice(0, 3).toString('latin1') === 'ID3') {
    o = 10 + (((buf[6] & 127) << 21) | ((buf[7] & 127) << 14) | ((buf[8] & 127) << 7) | (buf[9] & 127));
  }
  for (let i = o; i < buf.length - 4; i += 1) {
    if (buf[i] !== 0xff || (buf[i + 1] & 0xe0) !== 0xe0) continue;
    const ver = (buf[i + 1] >> 3) & 3;
    const lop = (buf[i + 1] >> 1) & 3;
    const bi = (buf[i + 2] >> 4) & 15;
    const si = (buf[i + 2] >> 2) & 3;
    if (ver === 1 || lop === 0 || bi === 0 || bi === 15 || si === 3) continue;
    return { kbps: BANG_BITRATE[bi], tagBytes: o };
  }
  return null;
}

const goHtml = (s) => String(s || '')
  .replace(/<[^>]*>/g, '')
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ')
  // KHÔNG PHÂN BIỆT HOA THƯỜNG. Bản trước chỉ khớp chữ thường nên "&#xA;"
  // (xuống dòng, chữ A hoa) lọt nguyên vào tiêu đề bài "'Happy Thanksgiving'".
  .replace(/&#x[0-9a-f]+;|&#\d+;|&[a-z]+;/gi, ' ')
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

  // BẢN CHÉP LỜI THỦNG LỖ — đã dính một lần với bài "How to Summon Others".
  // Bộ trích chỉ lấy thẻ <p>, mà nhiều bài VOA đặt CÂU VÍ DỤ trong blockquote
  // hoặc danh sách. Kết quả: bản chép lời còn nguyên câu dẫn "…we can summon
  // them with the following:" nhưng mất hẳn phần ví dụ đi sau. Người học nghe
  // thấy câu đó mà đọc lại thì không có — tệ hơn là không có bản chép lời, vì
  // họ sẽ tưởng mình nghe nhầm.
  // Dấu hiệu: một đoạn kết thúc bằng dấu hai chấm mà đoạn NGAY SAU cũng kết
  // thúc bằng dấu hai chấm (phần ví dụ ở giữa đã bị mất), hoặc không còn đoạn nào.
  const thung = doan.filter((p, i) => /:\s*$/.test(p) && (!doan[i + 1] || /:\s*$/.test(doan[i + 1])));
  if (thung.length) return { bo: `bản chép lời thủng ${thung.length} chỗ — câu ví dụ nằm ngoài thẻ <p>` };

  // Dòng đầu thường là tiêu đề lặp lại; các dòng cuối là chân trang/bình luận.
  const than = doan.filter((p) => !/^(Words in This Story|_+$)/i.test(p));
  const soTu = than.join(' ').split(/\s+/).length;

  const tieuDe = goHtml((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/\s*-\s*VOA.*$/, '');
  const dinhTieuDe = dinhChuDe(tieuDe);
  if (dinhTieuDe.length) return { bo: `tiêu đề dính chủ đề nhạy cảm (${dinhTieuDe.join(', ')})` };
  const dinhThan = [...new Set(dinhChuDe(than.join(' ')))];

  // Thời lượng suy từ dung lượng file và bitrate ĐỌC TỪ CHÍNH FILE. Không tải
  // cả file về chỉ để biết nó dài bao nhiêu — xin 64 KB đầu là đủ thấy khung
  // MPEG đầu tiên.
  const head = await fetch(mp3, { method: 'HEAD' });
  const bytes = Number(head.headers.get('content-length') || 0);
  const cors = head.headers.get('access-control-allow-origin') || '';
  if (!bytes) return { bo: 'máy chủ không cho biết dung lượng file' };
  // Ta TRỎ THẲNG tới máy chủ VOA chứ không sao chép file về, nên CORS là điều
  // kiện sống còn: đóng CORS thì trình duyệt của người học không phát được.
  // Loại ngay ở đây, không để lọt rồi cảnh báo suông.
  if (cors !== '*') return { bo: `CORS không mở ("${cors}") — trình duyệt sẽ không phát được` };

  const dau = await fetch(mp3, { headers: { Range: 'bytes=0-65535' } });
  const khung = docBitrate(Buffer.from(await dau.arrayBuffer()));
  if (!khung) return { bo: 'không đọc được khung MPEG — không biết file dài bao nhiêu' };
  const giay = Math.round(((bytes - khung.tagBytes) * 8) / (khung.kbps * 1000));
  if (giay < GIAY_MIN || giay > GIAY_MAX) return { bo: `dài khoảng ${giay} giây, ngoài khoảng ${GIAY_MIN}–${GIAY_MAX}` };

  return {
    bai: {
      id: `voa-${duongDan.match(/(\d+)\.html$/)?.[1] || duongDan.replace(/\W+/g, '')}`,
      title: tieuDe,
      series: loat.ten,
      seriesId: loat.id,
      audioUrl: mp3,
      bytes,
      kbps: khung.kbps,
      // Suy từ dung lượng file với bitrate đọc được từ khung MPEG của CHÍNH
      // file này. File CBR nên con số khá sát, nhưng vẫn là SUY RA chứ không
      // phải đọc thời lượng, nên tên trường giữ chữ "Estimated" và giao diện
      // vẫn hiển thị kèm chữ "khoảng".
      secondsEstimated: giay,
      words: soTu,
      cors,
      // Danh sách từ nhạy cảm gặp trong thân bài, để người soạn câu hỏi liếc
      // qua trước khi đọc cả bài. Không tự loại — xem chú thích CHU_DE_NHAY_CAM.
      canhBaoChuDe: dinhThan.length >= 3 ? dinhThan : undefined,
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
  // Đọc file cũ lên trước: nó là nguồn gốc của cả các bài ĐÃ BỊ LOẠI.
  const daCo = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];
  const ra = [...daCo];
  const coId = new Set(daCo.map((b) => b.id));
  const daXem = new Set();
  const bo = [];
  let them = 0;

  if (DO_LAI) {
    for (const b of ra) {
      const head = await fetch(b.audioUrl, { method: 'HEAD' });
      const bytes = Number(head.headers.get('content-length') || 0);
      const dau = await fetch(b.audioUrl, { headers: { Range: 'bytes=0-65535' } });
      const khung = docBitrate(Buffer.from(await dau.arrayBuffer()));
      if (!bytes || !khung) { process.stderr.write(`  ! ${b.id}: không đo lại được\n`); continue; }
      const giay = Math.round(((bytes - khung.tagBytes) * 8) / (khung.kbps * 1000));
      if (giay !== b.secondsEstimated || b.kbps !== khung.kbps) {
        process.stderr.write(`  ~ ${b.id}: ${b.secondsEstimated}s → ${giay}s (${khung.kbps} kbps, thẻ ID3 ${khung.tagBytes} byte)\n`);
      }
      b.bytes = bytes;
      b.kbps = khung.kbps;
      b.secondsEstimated = giay;
    }
    fs.writeFileSync(OUT, JSON.stringify(ra, null, 2));
    process.stderr.write(`Đã đo lại ${ra.length} bài bằng bitrate đọc từ chính file.\n`);
    return;
  }

  for (const loat of LOAT_BAI) {
    // ?p=N là danh sách theo THỜI GIAN, 12 bài mỗi trang, các trang không lặp
    // nhau (đã đo: 7 trang → 84 mã bài khác nhau). Đừng dùng /p-N.html: đó là
    // danh sách xếp theo VẦN CHỮ CÁI, lấy về toàn bài đã có.
    const links = [];
    for (let p = 0; p < SO_TRANG; p += 1) {
      const trang = await tai(p === 0 ? `${GOC}/z/${loat.z}` : `${GOC}/z/${loat.z}?p=${p}`);
      for (const m of trang.matchAll(/href="(\/a\/[^"]+\.html)"/g)) {
        if (!daXem.has(m[1])) { daXem.add(m[1]); links.push(m[1]); }
      }
    }
    process.stderr.write(`\n== ${loat.ten}: ${links.length} bài trên ${SO_TRANG} trang\n`);
    for (const l of links) {
      const id = `voa-${l.match(/(\d+)\.html$/)?.[1] || l.replace(/\W+/g, '')}`;
      if (coId.has(id)) continue; // đã có từ đợt trước, kể cả bài đã bị loại
      try {
        const kq = await docBai(l, loat);
        if (kq.bo) { bo.push(`${l}: ${kq.bo}`); continue; }
        ra.push(kq.bai);
        coId.add(kq.bai.id);
        them += 1;
        const canh = kq.bai.canhBaoChuDe ? ` ⚠ ${kq.bai.canhBaoChuDe.join(',')}` : '';
        process.stderr.write(`  ✓ ${String(kq.bai.secondsEstimated).padStart(3)}s · ${String(kq.bai.words).padStart(4)} từ · ${kq.bai.title.slice(0, 55)}${canh}\n`);
      } catch (e) { bo.push(`${l}: ${e.message}`); }
    }
  }

  fs.writeFileSync(OUT, JSON.stringify(ra, null, 2));
  process.stderr.write(`\nThêm ${them} bài mới (tổng ${ra.length}) vào ${OUT}. Bỏ ${bo.length} bài.\n`);
  if (bo.length) process.stderr.write('  ' + bo.join('\n  ') + '\n');
}

main().catch((e) => { process.stderr.write(`LỖI: ${e.message}\n`); process.exit(1); });
