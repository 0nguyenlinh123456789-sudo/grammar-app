// File: tests/vercel_headers.test.js
//
// GHIM LUẬT ĐỆM CỦA MÁY CHỦ — VÀ ĐÂY LÀ NƠI GIỮ LÝ DO, VÌ JSON KHÔNG CHỨA
// ĐƯỢC CHÚ THÍCH.
//
// ══ ĐO ĐƯỢC TRÊN BẢN LIVE 03/09, TRƯỚC KHI CÓ vercel.json ══
//   /assets/index-*.js        Cache-Control: public, max-age=0, must-revalidate
//   /fonts/*.woff2            public, max-age=0, must-revalidate
//   /audio/*.mp3              public, max-age=0, must-revalidate
//   /bunny_logo.png           public, max-age=0, must-revalidate
//
// Tức là MỌI tài sản đều phải hỏi lại máy chủ ở mỗi lượt mở, kể cả những tệp
// mang tên băm nội dung nên KHÔNG BAO GIỜ đổi ruột. Trên mạng di động Việt Nam
// mỗi lượt hỏi lại là một vòng đi-về; nhân với số tệp một buổi học chạm tới
// (mảnh mã của trang, bộ chữ, các tệp thu chép chính tả) thì đó là thời gian
// người học ngồi nhìn màn hình trắng mà không đổi lại được gì.
//
// ══ BA TỆP PHẢI GIỮ NGUYÊN max-age=0, VÀ ĐÂY LÀ LÝ DO ══
//   index.html · sw.js · manifest.webmanifest
// Đây là ba thứ KHÔNG mang tên băm. Nếu chúng bị đệm lâu thì người học đóng
// băng ở một bản cũ và bản mới không bao giờ tới được máy họ — đúng NGƯỢC LẠI
// điều commit fc1b31b vừa đi sửa. Riêng `sw.js` còn là thứ quyết định bản vá
// service worker của fc1b31b có tới được người dùng hay không.
//
// ══ VÌ SAO KHÔNG THÊM `rewrites` VÀO vercel.json ══
// Bản live trả 404 chữ thuần cho đường dẫn lạ (`/khong-co-trang-nay`). Cách sửa
// "hiển nhiên" là thêm một rewrite bắt tất về `/index.html`. ĐỪNG.
//
// App này định tuyến bằng TRẠNG THÁI (`appMode` trong App.jsx), không dùng
// đường dẫn — `manifest.webmanifest` cũng chỉ khai `start_url: "/"` — nên không
// có đường dẫn sâu nào được sinh ra trong lúc dùng bình thường. Đổi lại, một
// rewrite bắt tất sẽ trả HTML cho MỘT MẢNH MÃ .js không còn tồn tại, tức là
// dựng lại Ở TẦNG MÁY CHỦ đúng cái lỗi MIME mà fc1b31b vừa vá ở tầng service
// worker. Đổi một trang 404 hiếm gặp lấy một lỗi khó hiểu ở đường nóng.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cauHinh = JSON.parse(readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));

const KHONG_DUOC_DEM = ['/index.html', '/sw.js', '/manifest.webmanifest'];

// ⚠️ PHÉP ĐO NÀY PHẢI TỰ BIẾT NÓ ĐO ĐƯỢC GÌ.
// Vercel dùng cú pháp path-to-regexp, rộng hơn hẳn thứ dựng lại ở đây. Nên thay
// vì giả vờ hiểu mọi khuôn, hàm này chỉ nhận ĐÚNG tập cú pháp đang dùng, và
// một phép kiểm riêng bên dưới bắt lỗi ngay nếu ai đó viết khuôn lạ hơn. Thà
// đỏ vì "không đọc nổi" còn hơn xanh vì đo nhầm.
const KHUON_DOC_DUOC = /^\/(?:[A-Za-z0-9_./-]|\(\.\*\)|\((?:[a-z]+\|)+[a-z]+\))*$/;

function sangRegex(source) {
  let ra = '';
  let i = 0;
  while (i < source.length) {
    if (source.startsWith('(.*)', i)) { ra += '.*'; i += 4; continue; }
    if (source[i] === '(') {
      const dong = source.indexOf(')', i);
      ra += `(?:${source.slice(i + 1, dong)})`;
      i = dong + 1;
      continue;
    }
    ra += source[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    i += 1;
  }
  return new RegExp(`^${ra}$`);
}

/** Số giây trong `max-age=` của một giá trị Cache-Control. */
const soGiay = (v) => Number((/max-age=(\d+)/.exec(v) || [])[1] ?? 0);

const luat = cauHinh.headers || [];

test('mọi khuôn trong vercel.json đều nằm trong tập cú pháp phép đo này đọc được', () => {
  for (const l of luat) {
    assert.match(l.source, KHUON_DOC_DUOC,
      `khuôn "${l.source}" dùng cú pháp path-to-regexp mà phép đo dưới đây KHÔNG dựng lại được — hãy mở rộng sangRegex() trước khi thêm khuôn kiểu này, đừng để bài kiểm xanh trong khi nó không còn đo đúng`);
  }
});

test('BA TỆP KHÔNG MANG TÊN BĂM không được dính bất kỳ luật đệm lâu nào', () => {
  for (const duong of KHONG_DUOC_DEM) {
    for (const l of luat) {
      const cc = (l.headers || []).find((h) => h.key.toLowerCase() === 'cache-control');
      if (!cc || soGiay(cc.value) === 0) continue;
      assert.ok(!sangRegex(l.source).test(duong),
        `khuôn "${l.source}" (max-age=${soGiay(cc.value)}) khớp ${duong} — người học sẽ đóng băng ở bản cũ và bản mới không bao giờ tới được máy họ`);
    }
  }
});

test('BA TỆP đó phải được khai RÕ là không đệm, không dựa vào mặc định', () => {
  for (const duong of KHONG_DUOC_DEM) {
    const khop = luat.filter((l) => sangRegex(l.source).test(duong));
    assert.ok(khop.length > 0, `${duong} không có luật nào — đang dựa vào mặc định của nhà cung cấp, thứ có thể đổi mà không báo`);
    for (const l of khop) {
      const cc = (l.headers || []).find((h) => h.key.toLowerCase() === 'cache-control');
      assert.match(cc.value, /max-age=0/, `${duong} phải là max-age=0`);
      assert.match(cc.value, /must-revalidate/, `${duong} thiếu must-revalidate`);
    }
  }
});

test('chỉ /assets/* — thứ Vite tự băm tên — mới được đóng đinh immutable', () => {
  for (const l of luat) {
    const cc = (l.headers || []).find((h) => h.key.toLowerCase() === 'cache-control');
    if (!cc || !/immutable/.test(cc.value)) continue;
    assert.equal(l.source, '/assets/(.*)',
      `"${l.source}" đang khai immutable. Chỉ thư mục /assets mới được, vì CHỈ ở đó Vite bảo đảm tên tệp đổi khi ruột đổi. Ghim immutable lên một tên tệp có thể bị ghi đè là khoá người học vào bản cũ suốt một năm.`);
    assert.ok(soGiay(cc.value) >= 31536000, 'immutable mà max-age ngắn thì mất hết ý nghĩa');
  }
});

test('tài sản KHÔNG băm tên (chữ, bản thu, ảnh) phải có hạn ngắn và có đường tự làm mới', () => {
  for (const nguon of ['/fonts/(.*)', '/audio/(.*)']) {
    const l = luat.find((x) => x.source === nguon);
    assert.ok(l, `thiếu luật cho ${nguon}`);
    const cc = l.headers.find((h) => h.key.toLowerCase() === 'cache-control');
    assert.ok(soGiay(cc.value) > 0 && soGiay(cc.value) <= 604800,
      `${nguon}: hạn phải trong khoảng 0–7 ngày; tên tệp ở đây KHÔNG băm theo nội dung nên thu lại một câu mà giữ nguyên tên là người học nghe bản cũ`);
    assert.match(cc.value, /stale-while-revalidate/,
      `${nguon}: thiếu stale-while-revalidate — hết hạn là người học phải NGỒI CHỜ tải lại thay vì dùng bản cũ trong lúc nền lấy bản mới`);
    assert.doesNotMatch(cc.value, /immutable/);
  }
});

// Đây là bẫy đã suýt dính: thêm một rewrite bắt tất về index.html để chữa trang
// 404 chữ thuần. Làm thế là trả HTML cho một mảnh mã .js không còn tồn tại —
// dựng lại ở tầng máy chủ đúng lỗi MIME mà fc1b31b vừa vá ở tầng service worker.
test('KHÔNG được thêm rewrite/route bắt tất — nó dựng lại lỗi MIME vừa vá xong', () => {
  for (const khoa of ['rewrites', 'routes', 'redirects']) {
    for (const r of cauHinh[khoa] || []) {
      assert.ok(!/index\.html/.test(JSON.stringify(r)),
        `${khoa} đang trỏ về index.html: một yêu cầu xin .js không tồn tại sẽ nhận HTML, và người học lại gặp "Expected a JavaScript module script". Lý do đầy đủ ở đầu file này.`);
    }
  }
});

// vercel.json chỉ được mang ĐÚNG phần header. Thêm `builds`/`buildCommand` vào
// đây là cướp quyền của cấu hình trên bảng điều khiển Vercel — một bản đang BÁN
// không nên đổi cách dựng chỉ vì muốn sửa mấy dòng Cache-Control.
test('vercel.json không được lén đổi cách dựng dự án', () => {
  for (const khoa of ['builds', 'buildCommand', 'outputDirectory', 'framework', 'installCommand']) {
    assert.equal(khoa in cauHinh, false,
      `vercel.json khai "${khoa}" — nó sẽ ĐÈ cấu hình đang chạy trên Vercel. Đợt này chỉ đụng tới luật đệm.`);
  }
});
