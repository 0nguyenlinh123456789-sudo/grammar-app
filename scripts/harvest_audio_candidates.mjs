// File: scripts/harvest_audio_candidates.mjs
// LỌC ỨNG VIÊN ÂM THANH — CHỈ RA BẢNG ĐỂ DUYỆT, KHÔNG TẢI, KHÔNG COMMIT GÌ.
//
// Quy trình đã thống nhất: nội dung phải qua bảng đối chiếu trước khi vào kho.
// Script này dừng đúng ở bước lập bảng.
//
// Chạy:  node scripts/harvest_audio_candidates.mjs --limit 60 --out bang.tsv
//
// Nó làm ba việc, theo đúng thứ tự đó:
//   1. Tải BẢN KÊ GIẤY PHÉP của Tatoeba (sentences_with_audio.csv) và loại bỏ
//      mọi bản thu không nằm trong danh sách cho phép. Đây là bước đầu tiên,
//      không phải bước cuối: không tải một byte âm thanh nào trước khi biết
//      giấy phép.
//   2. Hỏi API từng câu để lấy NGÔN NGỮ và VĂN BẢN. Bản kê không có cột ngôn
//      ngữ — đã kiểm: trong nhóm CC BY 4.0 có cả câu tiếng Nga (câu 243, người
//      đọc Inego, ghi rõ "language: rus" trong ID3). Đoán theo tên người đọc là
//      sai.
//   3. Lọc theo độ dài và loại bỏ chủ đề nhạy cảm, rồi in bảng.
import fs from 'fs';
import path from 'path';
import { coTheDung, lyDoTuChoi } from '../src/utils/audioLicense.js';

const INDEX_URL = 'https://downloads.tatoeba.org/exports/sentences_with_audio.csv';
const SOURCE = 'Tatoeba';
const STATEMENT_URL = 'https://tatoeba.org/en/downloads';

const arg = (ten, macDinh) => {
  const i = process.argv.indexOf(`--${ten}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : macDinh;
};

const LIMIT = Number(arg('limit', 60));
const CACHE = arg('cache', '.audio-cache');
const OUT = arg('out', 'ung_vien_audio.tsv');
const MIN_TU = Number(arg('minWords', 4));
const MAX_TU = Number(arg('maxWords', 12));
// Danh sách id đã lấy rồi — để đợt sau không tải trùng đợt trước.
const DA_CO = new Set(
  arg('exclude', '') ? fs.readFileSync(arg('exclude'), 'utf8').split('\n').slice(1).map((l) => l.split('\t')[0]).filter(Boolean) : []
);

// Lộ trình có bậc trẻ em, và câu mẫu của Tatoeba là câu người dùng tự nhập —
// trong nhóm dùng được đã thấy "Communism will never be reached in my lifetime",
// "Creationism is a pseudo-science". Lọc máy không thay được người đọc duyệt,
// nên nó chỉ là lưới thứ nhất; bảng in ra vẫn phải có người xem.
const TU_LOAI = /\b(commun|fascis|nazi|creationis|abortion|kill|killed|murder|suicide|war|weapon|gun|drunk|hell|damn|stupid|idiot|racist|sex|porn|god|jesus|allah|islam|christian|jew|muslim|poorest|terroris)/i;
const CHU_HOP_LE = /^[A-Za-z0-9 ,.'"?!:;()-]+$/;

async function taiBanKe() {
  fs.mkdirSync(CACHE, { recursive: true });
  const dich = path.join(CACHE, 'sentences_with_audio.csv');
  if (fs.existsSync(dich) && fs.statSync(dich).size > 1e6) return dich;
  process.stderr.write('Đang tải bản kê giấy phép (~72 MB, chỉ tải một lần)…\n');
  const res = await fetch(INDEX_URL);
  if (!res.ok) throw new Error(`không tải được bản kê: HTTP ${res.status}`);
  fs.writeFileSync(dich, Buffer.from(await res.arrayBuffer()));
  return dich;
}

function locTheoGiayPhep(duongDan) {
  const dong = fs.readFileSync(duongDan, 'utf8').split('\n');
  const dungDuoc = [];
  const thongKe = {};
  for (const l of dong) {
    const f = l.split('\t');
    if (f.length < 4) continue;
    const license = (f[3] || '').trim();
    const khoa = license || '(bỏ trống)';
    thongKe[khoa] = (thongKe[khoa] || 0) + 1;
    if (!coTheDung(license)) continue;
    dungDuoc.push({ sentenceId: f[0], audioId: f[1], author: (f[2] || '').trim(), license, attributionUrl: (f[4] || '').trim() });
  }
  return { dungDuoc, thongKe };
}

async function layCau(sentenceId) {
  const res = await fetch(`https://tatoeba.org/en/api_v0/sentence/${sentenceId}`);
  if (!res.ok) return null;
  return res.json().catch(() => null);
}

const soTu = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;

async function main() {
  const { dungDuoc, thongKe } = locTheoGiayPhep(await taiBanKe());

  process.stderr.write('\nTHỐNG KÊ GIẤY PHÉP TRÊN TOÀN BẢN KÊ:\n');
  const tong = Object.values(thongKe).reduce((a, b) => a + b, 0);
  for (const [k, v] of Object.entries(thongKe).sort((a, b) => b[1] - a[1])) {
    const dau = coTheDung(k === '(bỏ trống)' ? '' : k) ? 'DÙNG ĐƯỢC' : 'loại';
    process.stderr.write(`  ${String(v).padStart(7)}  ${(v / tong * 100).toFixed(1).padStart(5)}%  ${dau.padEnd(10)} ${k}${dau === 'loại' ? ` — ${lyDoTuChoi(k === '(bỏ trống)' ? '' : k)}` : ''}\n`);
  }
  process.stderr.write(`\nDùng được: ${dungDuoc.length}/${tong} (${(dungDuoc.length / tong * 100).toFixed(1)}%)\n\n`);

  // Hỏi API cho tới khi đủ số ứng viên — KHÔNG hỏi hết vài nghìn câu.
  const ungVien = [];
  const loai = { daCo: 0, khacTiengAnh: 0, doDai: 0, kyTu: 0, chuDe: 0 };
  // Hỏi API theo lô song song. Hỏi tuần tự thì phần lớn thời gian là ngồi chờ
  // mạng — lọc 160 ứng viên mất hơn 10 phút và không kịp chạy hết.
  const SONG_SONG = 8;
  const conLai = dungDuoc.filter((bt) => {
    if (DA_CO.has(bt.sentenceId)) { loai.daCo += 1; return false; }
    return true;
  });

  for (let i = 0; i < conLai.length && ungVien.length < LIMIT; i += SONG_SONG) {
    const lo = conLai.slice(i, i + SONG_SONG);
    const cau = await Promise.all(lo.map((bt) => layCau(bt.sentenceId).catch(() => null)));
    for (let k = 0; k < lo.length; k += 1) {
      if (ungVien.length >= LIMIT) break;
      if (!cau[k]) continue;
      if (cau[k].lang !== 'eng') { loai.khacTiengAnh += 1; continue; }
      const text = String(cau[k].text || '').trim();
      const n = soTu(text);
      if (n < MIN_TU || n > MAX_TU) { loai.doDai += 1; continue; }
      if (!CHU_HOP_LE.test(text)) { loai.kyTu += 1; continue; }
      if (TU_LOAI.test(text)) { loai.chuDe += 1; continue; }
      ungVien.push({ ...lo[k], text, words: n });
      process.stderr.write(`  ${String(ungVien.length).padStart(3)}. ${text}\n`);
    }
  }

  process.stderr.write(`\nĐã loại: ${loai.daCo} câu đã lấy từ đợt trước, ${loai.khacTiengAnh} câu không phải tiếng Anh, ${loai.doDai} câu ngoài khoảng ${MIN_TU}–${MAX_TU} từ, ${loai.kyTu} câu có ký tự lạ, ${loai.chuDe} câu dính chủ đề nhạy cảm.\n`);

  const dongTsv = ungVien.map((u) => [u.sentenceId, u.audioId, u.text, u.words, u.license, u.author, u.attributionUrl || `https://tatoeba.org/en/user/profile/${u.author}`, SOURCE, `https://tatoeba.org/en/sentences/show/${u.sentenceId}`, STATEMENT_URL].join('\t'));
  fs.writeFileSync(OUT, ['sentenceId\taudioId\ttext\twords\tlicense\tauthor\tattributionUrl\tsource\tsourceUrl\tlicenseStatementUrl', ...dongTsv].join('\n') + '\n');
  process.stderr.write(`\nĐã ghi ${ungVien.length} ứng viên vào ${OUT}. CHƯA tải file âm thanh nào — chờ duyệt.\n`);
}

main().catch((e) => { process.stderr.write(`LỖI: ${e.message}\n`); process.exit(1); });
