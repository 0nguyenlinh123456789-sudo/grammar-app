// KHÔNG ĐƯỢC CÓ KÝ TỰ ĐIỀU KHIỂN TRONG MÃ NGUỒN.
//
// ══ BẪY ĐÃ DÍNH BA LẦN ══
// Viết một ký tự thoát dấu-b vào tệp bằng `sed`, heredoc, hay `node -e` qua
// shell thì tầng shell/ngôn ngữ ở giữa diễn giải nó và ghi vào tệp một BYTE
// 0x08 THẬT. Hậu quả:
//
//   - regex `/<0x08>docTo\(/` không bao giờ khớp,
//   - `sed`, `grep`, và mọi trình xem thông thường KHÔNG hiện ký tự điều khiển,
//     nên đọc mã vẫn thấy đúng y như định viết,
//   - một phép kiểm dựa trên regex đó XANH VĨNH VIỄN mà chẳng kiểm gì cả.
//
// Đó là kiểu hỏng tệ nhất của một lưới an toàn: nó còn đó, nó xanh, và nó rỗng.
// Cả ba lần đều mất thời gian dò, và chỉ `cat -A` mới lộ ra.
//
// ══ VÌ SAO ĐẶT LƯỚI Ở ĐÂY ══
// Luật "viết script ra tệp rồi chạy, đừng gõ chuỗi có escape qua shell" đã ghi
// trong sổ sau lần thứ hai — và lần thứ ba vẫn dính. Luật mà con người phải nhớ
// thì sẽ có lúc quên; một phép đếm thì không.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = path.dirname(fileURLToPath(new URL('.', import.meta.url)));

// Chỉ quét mã nguồn do người viết. Bỏ qua tệp nhị phân và thư mục sinh ra.
const BO_QUA = new Set(['node_modules', 'dist', '.git', 'temp_docx', 'public', 'audio']);
const DUOI = /\.(js|mjs|jsx|json|css|md)$/;

function quet(thuMuc, ra = []) {
  for (const muc of fs.readdirSync(path.join(GOC, thuMuc), { withFileTypes: true })) {
    if (BO_QUA.has(muc.name)) continue;
    const duong = `${thuMuc}/${muc.name}`;
    if (muc.isDirectory()) quet(duong, ra);
    else if (DUOI.test(muc.name)) ra.push(duong);
  }
  return ra;
}

// Ký tự điều khiển C0 trừ tab (0x09), xuống dòng (0x0A) và về đầu dòng (0x0D).
// Ba cái đó là khoảng trắng hợp lệ; mọi cái còn lại lọt vào mã nguồn đều là tai
// nạn của một tầng shell nào đó.
const XAU = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;

test('không tệp mã nguồn nào chứa ký tự điều khiển lọt vào từ shell', () => {
  const dinh = [];
  for (const tep of [...quet('src'), ...quet('tests'), ...quet('scripts')]) {
    const noiDung = fs.readFileSync(path.join(GOC, tep), 'utf8');
    if (!XAU.test(noiDung)) continue;
    // Chỉ ra ĐÚNG dòng và ĐÚNG mã byte — thông báo "có ký tự lạ ở đâu đó trong
    // tệp" thì người đọc vẫn phải đi dò lại từ đầu, tức là lưới này chỉ chuyển
    // công việc chứ không làm giúp.
    noiDung.split('\n').forEach((d, i) => {
      const m = XAU.exec(d);
      if (m) dinh.push(`${tep}:${i + 1} — byte 0x${m[0].charCodeAt(0).toString(16).padStart(2, '0')}`);
    });
  }
  assert.deepEqual(dinh, [],
    'có ký tự điều khiển trong mã nguồn (gần như chắc chắn là một ký tự thoát bị '
    + 'shell diễn giải khi ghi tệp — viết script ra tệp rồi chạy thay vì gõ qua '
    + `shell):\n  ${dinh.join('\n  ')}`);
});
