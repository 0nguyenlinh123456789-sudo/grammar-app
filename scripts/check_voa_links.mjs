// File: scripts/check_voa_links.mjs
// KIỂM LẠI ĐƯỜNG DẪN ÂM THANH VOA — chạy TAY, cố tình KHÔNG đưa vào CI.
//
// Bài nghe theo đoạn trỏ thẳng tới máy chủ VOA thay vì sao chép file vào kho
// (lý do ở đầu src/data/listeningPassages.js). Cái giá phải trả là đường dẫn
// có thể chết mà không ai biết. Bộ kiểm này là cách phát hiện.
//
// KHÔNG đưa vào `npm test` vì nó phụ thuộc mạng: một lần Wi-Fi chập là cả bộ
// test đỏ, và một bộ test hay đỏ vì lý do không liên quan sẽ nhanh chóng bị
// người ta bỏ qua — lúc đó nó không còn bảo vệ được gì nữa.
//
// Chạy:  node scripts/check_voa_links.mjs
import { listeningPassages } from '../src/data/listeningPassages.js';

const BITRATE = 64_000;

async function kiem(b) {
  try {
    const res = await fetch(b.audioUrl, { method: 'HEAD' });
    if (!res.ok) return `HTTP ${res.status}`;
    const bytes = Number(res.headers.get('content-length') || 0);
    const cors = res.headers.get('access-control-allow-origin') || '';
    if (cors !== '*') return `CORS đóng ("${cors}") — trình duyệt sẽ không phát được`;
    if (!bytes) return 'máy chủ không cho biết dung lượng';
    const giay = Math.round((bytes * 8) / BITRATE);
    // Lệch quá 20% so với con số đã lưu nghĩa là file đã bị thay bằng bản khác.
    const lech = Math.abs(giay - b.secondsEstimated) / b.secondsEstimated;
    if (lech > 0.2) return `độ dài đổi từ ~${b.secondsEstimated}s thành ~${giay}s — file có thể đã bị thay`;
    return null;
  } catch (e) { return `không kết nối được: ${e.message}`; }
}

const loi = [];
for (const b of listeningPassages) {
  const v = await kiem(b);
  process.stdout.write(`${v ? '✖' : '✓'} ${b.id.padEnd(14)} ${b.title.slice(0, 45)}${v ? `\n    ${v}\n    trang gốc: ${b.sourceUrl}` : ''}\n`);
  if (v) loi.push(`${b.id}: ${v}`);
}

process.stdout.write(`\n${listeningPassages.length - loi.length}/${listeningPassages.length} đường dẫn còn sống.\n`);
if (loi.length) {
  process.stdout.write('\nCần xử lý: mở trang gốc, lấy đường dẫn mới, chạy lại harvest_voa_passages.mjs\n');
  process.exit(1);
}
