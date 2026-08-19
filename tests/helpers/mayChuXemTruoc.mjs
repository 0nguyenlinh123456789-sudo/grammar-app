// File: tests/helpers/mayChuXemTruoc.mjs
// DỰNG BẢN BUILD THẬT RỒI PHỤC VỤ NÓ, cho mọi bộ rà bằng trình duyệt dùng chung.
//
// ══ HAI CÁI BẪY ĐÃ DÍNH, VÀ VÌ SAO CHÚNG Ở ĐÂY CHỨ KHÔNG Ở TỪNG SCRIPT ══
//   1. `vite preview` KHÔNG tự dựng lại. Lần đầu chạy bộ rà, nó báo lại đúng
//      cái lỗi tôi vừa sửa xong — vì `dist/` còn là bản cũ. Cùng họ với "bản
//      live chậm một commit", nhưng khó thấy hơn nhiều vì mọi thứ ở ngay trên
//      máy. Nên: LUÔN `vite build` trước, không có cờ nào bỏ qua.
//   2. `vite preview` mặc định gắn vào tên "localhost", mà trên Windows tên đó
//      có thể chỉ phân giải ra ::1 (IPv6) → fetch tới 127.0.0.1 nhận
//      ERR_CONNECTION_REFUSED trong khi máy chủ vẫn đang chạy ngon lành. Phải
//      truyền `--host 127.0.0.1`.
//
// `spawn('npm.cmd', …)` ném EINVAL trên Node 24/Windows, nên gọi thẳng
// `node node_modules/vite/bin/vite.js`.

import { spawn } from 'node:child_process';

export async function moMayChuXemTruoc({ cong = 4319, dungLai = true } = {}) {
  if (dungLai) {
    const dung = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'build'], { stdio: 'ignore' });
    const ma = await new Promise((r) => dung.on('exit', r));
    if (ma !== 0) throw new Error(`vite build thoát mã ${ma} — không rà tiếp trên bản dựng hỏng.`);
  }

  const sv = spawn(process.execPath, [
    'node_modules/vite/bin/vite.js', 'preview',
    '--port', String(cong), '--strictPort', '--host', '127.0.0.1',
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  let log = '';
  sv.stdout.on('data', (d) => { log += d; });
  sv.stderr.on('data', (d) => { log += d; });

  const BASE = `http://127.0.0.1:${cong}`;
  let len = false;
  for (let i = 0; i < 120; i++) {
    try { const r = await fetch(BASE); if (r.ok) { len = true; break; } } catch { /* chưa lên */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  if (!len) {
    sv.kill();
    throw new Error(`máy chủ xem trước không lên sau 30s. Log: ${log.slice(0, 400)}`);
  }

  return { BASE, log: () => log, dong: () => sv.kill() };
}
