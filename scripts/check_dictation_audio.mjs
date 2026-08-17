// File: scripts/check_dictation_audio.mjs
// KIỂM 239 BẢN THU CHÉP CHÍNH TẢ — phần MÁY kiểm được, và chỉ phần đó.
//
// Chạy:  node scripts/check_dictation_audio.mjs
//
// ══ NÓI TRƯỚC THỨ BỘ NÀY KHÔNG LÀM ══
// Đây **KHÔNG PHẢI** "đã nghe thử". Nó không biết bản thu có rõ tiếng không, có
// đọc đúng câu trong `text` không, có tạp âm không, giọng có dễ nghe không. Những
// việc đó cần TAI NGƯỜI và tôi không làm được — nói thẳng thay vì để một dấu ✓
// xanh ở đây trông như đã kiểm xong.
//
// Bộ này kiểm đúng bốn thứ máy kiểm được, và mỗi thứ đều là một cách bản thu có
// thể hỏng mà không ai biết:
//   1. File có tồn tại trong public/audio (bản kê trỏ tới file đã mất → nút phát
//      im lặng không kêu).
//   2. Dung lượng khớp trường `bytes` đã khai (file bị thay hoặc tải dở).
//   3. Đọc được KHUNG MPEG đầu tiên → đúng là mp3, không phải trang HTML lỗi
//      được lưu với đuôi .mp3 (chuyện rất thường gặp khi tải hàng loạt).
//   4. Thời lượng suy ra HỢP LÝ so với số từ — dưới 0,15 giây/từ thì gần như chắc
//      là file bị cắt cụt. Đây là NGƯỠNG THÔ, không phải phép đo chất lượng.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { audioManifest } from '../src/data/audioManifest.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AUDIO = path.join(ROOT, 'public/audio');

// Bảng bitrate của MPEG-1/2 Layer III — đọc từ chính khung đầu tiên của file,
// không ghi cứng một con số. Ghi cứng 64 kbps đã một lần làm cả kho lẫn bộ kiểm
// nói hai chuyện khác nhau (xem check_voa_links.mjs).
const BITRATE_V1_L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
const BITRATE_V2_L3 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160];
const SAMPLE_V1 = [44100, 48000, 32000];
const SAMPLE_V2 = [22050, 24000, 16000];

/** Tìm khung MPEG audio đầu tiên, bỏ qua thẻ ID3 nếu có. */
export function docKhung(buf) {
  let i = 0;
  if (buf.length > 10 && buf.toString('latin1', 0, 3) === 'ID3') {
    // Kích thước thẻ ID3v2 là 4 byte "synchsafe" (mỗi byte chỉ dùng 7 bit thấp).
    i = 10 + ((buf[6] & 0x7f) << 21 | (buf[7] & 0x7f) << 14 | (buf[8] & 0x7f) << 7 | (buf[9] & 0x7f));
  }
  for (; i + 4 <= buf.length && i < 200000; i += 1) {
    if (buf[i] !== 0xff || (buf[i + 1] & 0xe0) !== 0xe0) continue;
    const v1 = (buf[i + 1] & 0x18) === 0x18;      // MPEG-1
    const layer = (buf[i + 1] >> 1) & 0x03;
    if (layer !== 0x01) continue;                  // 0b01 = Layer III
    const bIdx = (buf[i + 2] >> 4) & 0x0f;
    const sIdx = (buf[i + 2] >> 2) & 0x03;
    if (bIdx === 0 || bIdx === 15 || sIdx === 3) continue;
    const kbps = (v1 ? BITRATE_V1_L3 : BITRATE_V2_L3)[bIdx];
    const hz = (v1 ? SAMPLE_V1 : SAMPLE_V2)[sIdx];
    if (!kbps || !hz) continue;
    return { offset: i, kbps, hz, mpeg: v1 ? 1 : 2 };
  }
  return null;
}

const GIAY_MOI_TU_TOI_THIEU = 0.15;

const loi = [];
const canh = [];
let tongGiay = 0;
const theoKbps = {};

for (const e of audioManifest) {
  const duong = path.join(AUDIO, e.file);
  if (!fs.existsSync(duong)) { loi.push(`${e.id}: KHÔNG CÓ FILE ${e.file}`); continue; }
  const buf = fs.readFileSync(duong);
  if (Number.isFinite(e.bytes) && buf.length !== e.bytes) {
    loi.push(`${e.id}: dung lượng ${buf.length} ≠ ${e.bytes} đã khai`);
  }
  const khung = docKhung(buf);
  if (!khung) { loi.push(`${e.id}: KHÔNG ĐỌC ĐƯỢC khung MPEG — file có thể không phải mp3`); continue; }
  theoKbps[khung.kbps] = (theoKbps[khung.kbps] || 0) + 1;

  const giay = ((buf.length - khung.offset) * 8) / (khung.kbps * 1000);
  tongGiay += giay;
  const tu = Number(e.words) || String(e.text || '').trim().split(/\s+/).filter(Boolean).length;
  if (tu > 0 && giay / tu < GIAY_MOI_TU_TOI_THIEU) {
    canh.push(`${e.id}: ${giay.toFixed(1)}s cho ${tu} từ (${(giay / tu).toFixed(2)}s/từ) — nghi bị cắt cụt`);
  }
}

// File nằm trong public/audio mà không có trong bản kê: không phát được (không ai
// trỏ tới) nhưng vẫn nằm trong gói triển khai, và người sau sẽ tưởng nó đang dùng.
const trongKe = new Set(audioManifest.map((e) => e.file));
const thua = fs.existsSync(AUDIO)
  ? fs.readdirSync(AUDIO).filter((n) => n.endsWith('.mp3') && !trongKe.has(n))
  : [];

console.log(`Bản kê: ${audioManifest.length} · file trong public/audio: ${fs.readdirSync(AUDIO).filter((n) => n.endsWith('.mp3')).length}`);
console.log(`Bitrate đọc từ khung: ${Object.entries(theoKbps).map(([k, n]) => `${k} kbps × ${n}`).join(' · ')}`);
console.log(`Tổng thời lượng suy ra: ${Math.round(tongGiay / 60)} phút (trung bình ${(tongGiay / audioManifest.length).toFixed(1)}s/câu)`);
if (thua.length) console.log(`\n⚠ ${thua.length} file không có trong bản kê: ${thua.slice(0, 8).join(', ')}`);
if (canh.length) { console.log(`\n⚠ ${canh.length} bản thu ngắn đáng ngờ:`); for (const c of canh.slice(0, 10)) console.log(`   ${c}`); }
if (loi.length) { console.log(`\n✖ ${loi.length} lỗi:`); for (const l of loi.slice(0, 20)) console.log(`   ${l}`); }
else console.log('\n✅ 239/239 file: có thật, đúng dung lượng đã khai, đọc được khung MPEG.');

console.log('\n────────────────────────────────────────────────────────────');
console.log('CHƯA KIỂM ĐƯỢC, VÀ MÁY KHÔNG KIỂM ĐƯỢC: bản thu có rõ tiếng không ·');
console.log('có đọc đúng câu trong `text` không · tạp âm · giọng có dễ nghe không.');
console.log('Những thứ đó cần TAI NGƯỜI. Dấu ✓ ở trên KHÔNG có nghĩa là đã nghe thử.');

if (loi.length) process.exit(1);
