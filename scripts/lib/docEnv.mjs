// File: scripts/lib/docEnv.mjs
// ĐỌC BIẾN MÔI TRƯỜNG THEO ĐÚNG MỘT LUẬT, DÙNG CHUNG CHO MỌI BỘ ĐO.
//
// ══ VÌ SAO PHẢI LÀ MỘT BẢN DUY NHẤT ══
// Bản đầu, `kiem_banduoc.mjs` có hàm này còn `kiem_ban_live.mjs` thì đọc thẳng
// `process.env`. Hậu quả đi ngược hẳn với ý định: chủ dự án dán số tài khoản
// vào `.env`, chạy `kiem:banlive` — bộ đo SINH RA ĐỂ canh chặng cuối — và nhận
// được "máy chưa đặt biến nào để đối chiếu". Đọc câu đó thành "không có gì
// phải kiểm" là chuyện hiển nhiên, và thế là cái bẫy "quên deploy" đi lọt qua
// đúng công cụ dựng lên để bắt nó.
//
// Luật ưu tiên: biến thật của tiến trình đứng trước, rồi tới `.env`, rồi
// `.env.local`. KHÔNG đọc `.env.example` — nó là bản mẫu với ô trống, và coi
// bản mẫu là cấu hình thật là đúng kiểu "thay thế âm thầm" mà dự án cấm.
import fs from 'node:fs';
import path from 'node:path';

export function docEnv(goc = process.cwd()) {
  const ra = { ...process.env };
  for (const ten of ['.env', '.env.local']) {
    const duong = path.join(goc, ten);
    if (!fs.existsSync(duong)) continue;
    for (const dong of fs.readFileSync(duong, 'utf8').split(/\r?\n/)) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(dong);
      if (!m) continue;
      const v = m[2].trim().replace(/^["']|["']$/g, '');
      if (v) ra[m[1]] = v;
    }
  }
  return ra;
}
