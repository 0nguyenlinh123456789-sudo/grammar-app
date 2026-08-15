// File: scripts/fetch_audio.mjs
// TẢI ÂM THANH ĐÃ ĐƯỢC DUYỆT — và từ chối mọi thứ không chứng minh được.
//
// Chạy:  node scripts/fetch_audio.mjs --in ung_vien_audio.tsv
//
// Bốn lớp kiểm, thứ tự có chủ ý — giấy phép trước, nội dung sau:
//   1. GIẤY PHÉP. Không nằm trong danh sách cho phép thì không tải, không hỏi
//      lại. Đây là lớp duy nhất chạy TRƯỚC khi có một byte nào rời máy chủ.
//   2. FILE THẬT. Phải là audio/mpeg và bắt đầu bằng "ID3" hoặc khung MPEG.
//      Máy chủ trả trang lỗi HTML 200 là chuyện thường gặp.
//   3. GHÉP CẶP. Thẻ ID3 của chính file phải chứa ĐÚNG câu mà bản kê nói. Đây
//      là lớp quan trọng nhất: tôi KHÔNG NGHE ĐƯỢC file, nên bằng chứng duy
//      nhất rằng file nói đúng câu đó là siêu dữ liệu do người thu nhúng vào.
//      Lệch một câu là người học chép chính tả sai mà không hiểu vì sao.
//   4. KÍCH THƯỚC HỢP LÝ. Quá nhỏ là file hỏng, quá lớn là nhầm nội dung.
//
// Bản ghi nào trượt bất kỳ lớp nào cũng bị BỎ và được liệt kê ra, không bị
// nuốt lặng.
import fs from 'fs';
import path from 'path';
import { coTheDung, lyDoTuChoi, kiemTraBanGhi } from '../src/utils/audioLicense.js';

const arg = (ten, macDinh) => {
  const i = process.argv.indexOf(`--${ten}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : macDinh;
};

const IN = arg('in', 'ung_vien_audio.tsv');
const OUT_DIR = arg('outDir', path.join('public', 'audio'));
const MANIFEST = arg('manifest', path.join('src', 'data', 'audioManifest.js'));
const HOM_NAY = arg('date', new Date().toISOString().slice(0, 10));

const KICH_THUOC_MIN = 2_000;
const KICH_THUOC_MAX = 400_000;

// ---- Đọc thẻ ID3v2 ---------------------------------------------------------
// Tự viết vì chỉ cần một trường, và thêm một phụ thuộc npm cho việc này thì
// đắt hơn 40 dòng code.
const syncsafe = (b, o) => ((b[o] & 0x7f) << 21) | ((b[o + 1] & 0x7f) << 14) | ((b[o + 2] & 0x7f) << 7) | (b[o + 3] & 0x7f);

function docChuoiID3(data) {
  const ma = data[0];
  const than = data.slice(1);
  if (ma === 1 || ma === 2) return than.toString('utf16le').replace(/﻿/g, '');
  if (ma === 3) return than.toString('utf8');
  return than.toString('latin1');
}

// ID3v2.2 dùng mã khung 3 KÝ TỰ ("TT2") và cỡ 3 byte; v2.3/v2.4 dùng 4 ký tự
// ("TIT2") và cỡ 4 byte. Đã dính: bản đầu của hàm này chỉ đọc v2.3/v2.4 vì tôi
// dựng nó từ một file CK — file thuộc nhóm CC BY-NC-ND KHÔNG DÙNG ĐƯỢC. Toàn bộ
// 40 file CC BY 4.0 thật lại là v2.2, nên cổng chặn sạch 40/40 và báo "file
// không có thẻ tiêu đề" trong khi thẻ vẫn ở đó.
// Bài học: đừng thử nghiệm quy trình trên mẫu mà mình sẽ không dùng.
const DOI_TEN_V22 = { TT2: 'TIT2', TP1: 'TPE1', TAL: 'TALB', TRK: 'TRCK', TYE: 'TDRC', TCO: 'TCON', COM: 'COMM' };

export function docTheID3(buf) {
  if (buf.slice(0, 3).toString('latin1') !== 'ID3') return {};
  const v = buf[3];
  const tong = syncsafe(buf, 6);
  const khung = {};
  const dai = v <= 2 ? 3 : 4;      // độ dài mã khung
  const dauKhung = v <= 2 ? 6 : 10; // mã + cỡ (+ cờ ở v2.3+)
  let o = 10;
  while (o + dauKhung <= Math.min(buf.length, tong + 10)) {
    const idThô = buf.slice(o, o + dai).toString('latin1');
    if (!/^[A-Z0-9]+$/.test(idThô)) break;
    const co = v <= 2
      ? (buf[o + 3] << 16) | (buf[o + 4] << 8) | buf[o + 5]
      : (v >= 4 ? syncsafe(buf, o + 4) : buf.readUInt32BE(o + 4));
    if (co <= 0 || o + dauKhung + co > buf.length) break;
    const id = v <= 2 ? (DOI_TEN_V22[idThô] || idThô) : idThô;
    khung[id] = docChuoiID3(buf.slice(o + dauKhung, o + dauKhung + co)).replace(/\0+$/, '').trim();
    o += dauKhung + co;
  }
  return khung;
}

// So khớp câu: bỏ hết dấu câu và chữ hoa. Bắt buộc phải nới thế này — bản thu
// 1158624 có thẻ TIT2 là ". What is your greatest source of inspiration?", dư
// một dấu chấm ở đầu so với câu trong cơ sở dữ liệu.
const chuanHoa = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');

async function taiMot(bt) {
  const url = `https://tatoeba.org/en/audio/download/${bt.audioId}`;
  const res = await fetch(url);
  if (!res.ok) return { loi: `HTTP ${res.status}` };
  const kieu = res.headers.get('content-type') || '';
  if (!/audio\//i.test(kieu)) return { loi: `không phải audio (content-type: ${kieu})` };
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < KICH_THUOC_MIN) return { loi: `file quá nhỏ (${buf.length} byte) — nhiều khả năng hỏng` };
  if (buf.length > KICH_THUOC_MAX) return { loi: `file quá lớn (${buf.length} byte) — có thể không phải câu lẻ` };
  const magic = buf.slice(0, 3).toString('latin1');
  if (magic !== 'ID3' && !(buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0)) return { loi: `không phải MP3 (bắt đầu bằng ${JSON.stringify(magic)})` };

  const the = docTheID3(buf);
  const tieuDe = the.TIT2 || '';
  if (!tieuDe) return { loi: 'file không có thẻ tiêu đề — không kiểm được nó nói câu nào' };
  if (chuanHoa(tieuDe) !== chuanHoa(bt.text)) {
    return { loi: `thẻ trong file là ${JSON.stringify(tieuDe)} nhưng bản kê nói ${JSON.stringify(bt.text)}` };
  }
  return { buf };
}

async function main() {
  if (!fs.existsSync(IN)) throw new Error(`không thấy ${IN} — chạy harvest_audio_candidates.mjs trước`);
  const dong = fs.readFileSync(IN, 'utf8').trim().split('\n');
  const cot = dong.shift().split('\t');
  const banGhi = dong.map((l) => Object.fromEntries(l.split('\t').map((v, i) => [cot[i], v])));

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const xong = [];
  const bo = [];

  for (const bt of banGhi) {
    // LỚP 1 — giấy phép, trước khi tải.
    if (!coTheDung(bt.license)) { bo.push(`${bt.sentenceId}: giấy phép "${bt.license}" — ${lyDoTuChoi(bt.license)}`); continue; }

    const id = `tat-${bt.sentenceId}`;
    const file = `${id}.mp3`;
    const kq = await taiMot(bt);
    if (kq.loi) { bo.push(`${bt.sentenceId}: ${kq.loi}`); continue; }

    const ban = {
      id, file, text: bt.text,
      words: Number(bt.words) || bt.text.trim().split(/\s+/).length,
      license: bt.license, author: bt.author, attributionUrl: bt.attributionUrl,
      source: bt.source, sourceUrl: bt.sourceUrl,
      licenseStatementUrl: bt.licenseStatementUrl, licenseCheckedAt: HOM_NAY,
      bytes: kq.buf.length,
    };
    const loiHoSo = kiemTraBanGhi(ban);
    if (loiHoSo.length) { bo.push(`${bt.sentenceId}: ${loiHoSo.join('; ')}`); continue; }

    fs.writeFileSync(path.join(OUT_DIR, file), kq.buf);
    xong.push(ban);
    process.stderr.write(`  ✓ ${file}  ${String(kq.buf.length).padStart(6)}B  ${bt.text}\n`);
  }

  const than = xong.map((e) => '  ' + JSON.stringify(e) + ',').join('\n');
  fs.writeFileSync(MANIFEST, `// File: src/data/audioManifest.js
// SINH TỰ ĐỘNG bởi scripts/fetch_audio.mjs — đừng sửa tay.
//
// Mỗi bản ghi là một file âm thanh GIỌNG NGƯỜI THẬT kèm hồ sơ giấy phép đầy
// đủ. \`tests/audio_license.test.js\` đối chiếu hai chiều: có file mà không có
// bản ghi là đỏ, có bản ghi mà không có file cũng đỏ.
//
// Mọi bản ghi ở đây đã qua bốn lớp kiểm của bộ tải, trong đó có lớp so thẻ ID3
// trong chính file với câu mà bản kê khai — vì không ai NGHE được file lúc tải.
// Bốn lớp đó KHÔNG kiểm được chất lượng thu, tạp âm hay accent.
export const audioManifest = [
${than}
];

export default audioManifest;
`);

  process.stderr.write(`\nĐã tải ${xong.length}/${banGhi.length} file vào ${OUT_DIR} (${(xong.reduce((a, e) => a + e.bytes, 0) / 1024).toFixed(0)} KB).\n`);
  if (bo.length) process.stderr.write(`\nBỎ ${bo.length} bản ghi:\n  ${bo.join('\n  ')}\n`);
}

main().catch((e) => { process.stderr.write(`LỖI: ${e.message}\n`); process.exit(1); });
