// File: scripts/kiem_ban_live.mjs
//
//   npm run kiem:banlive
//   LIVE_BASE=https://... npm run kiem:banlive
//
// BẢN ĐANG CHẠY TRÊN MẠNG CÓ THẬT SỰ MANG CẤU HÌNH BÁN HÀNG KHÔNG.
//
// ══ CÁI BẪY FILE NÀY SINH RA ĐỂ BẮT ══
// Mọi biến `VITE_*` được NHÚNG LÚC DỰNG, không phải đọc lúc chạy. Nghĩa là chủ
// dự án hoàn toàn có thể:
//   1. dán số tài khoản và kênh Zalo vào bảng điều khiển của nhà cung cấp,
//   2. thấy nó hiện ra ở đó, tưởng xong,
//   3. và bản live vẫn là bản dựng CŨ — không có số tài khoản nào.
// Khách vào thấy "chưa có kênh đặt mua", còn chủ thì thấy biến đã đặt đầy đủ.
// Không bên nào sai, và không có lời báo lỗi nào ở giữa.
//
// `npm run kiem:banduoc` KHÔNG bắt được chuyện này: nó đọc biến ở MÁY. Phải đi
// tải gói thật về mới biết bản live mang gì.
//
// ══ VÌ SAO ĐI THEO ĐƯỜNG DẪN THẬT, KHÔNG ĐOÁN TÊN CHUNK ══
// `scripts/check_live_strings.mjs` từng dò bằng cách đoán tên chunk và **có
// điểm mù đo được**: 19/08 nó báo thiếu hai chuỗi trên live, mở trình duyệt ra
// thì chunk đó có đủ cả hai. Nên ở đây: đọc index.html, lấy các tệp nó thật sự
// nạp, rồi lấy tiếp mọi đường dẫn `/assets/*.js` xuất hiện bên trong chúng
// (đó là cách Vite ghi các chunk nạp trễ). Không có bước nào phải đoán.

import { docEnv } from './lib/docEnv.mjs';

// ĐỌC BIẾN BẰNG LUẬT DÙNG CHUNG, không đọc thẳng `process.env`.
// Bản đầu của file này đọc thẳng, nên khi chủ dự án để số tài khoản trong
// `.env` thì bộ đo báo "máy chưa đặt biến nào để đối chiếu" — tức công cụ
// dựng lên để bắt lỗi "quên deploy" lại im lặng đúng trường hợp thường gặp
// nhất. Xem scripts/lib/docEnv.mjs.
const env = docEnv();
const GOC = String(env.LIVE_BASE || 'https://grammar-app-gray.vercel.app').replace(/\/$/, '');

const in2 = (a, b) => console.log(`  ${String(a).padEnd(40)}${b}`);
const che = (v) => String(v).replace(/.(?=.{3})/g, '•');

async function tai(duong) {
  const res = await fetch(duong, { headers: { 'User-Agent': 'kiem-ban-live' } });
  if (!res.ok) throw new Error(`${res.status} ${duong}`);
  return res.text();
}

// ── Gom mọi tệp JS mà bản live thật sự có ──────────────────────────────────
console.log(`\n═══ TẢI GÓI TỪ ${GOC} ═══`);
let goc;
try {
  goc = await tai(`${GOC}/`);
} catch (e) {
  console.log(`  ❌ Không tải được trang chủ: ${e.message}`);
  process.exit(1);
}

// Bắt MỌI dạng đường dẫn chunk, không chỉ dạng tuyệt đối trong dấu nháy kép.
// Bản đầu chỉ tìm `"/assets/….js"` và lấy được 3 tệp; đo lại thì chunk chính
// tham chiếu 26 chunk khác dưới dạng `./assets/….js`. Thiếu 23 chunk mà vẫn in
// ra kết luận là đúng kiểu điểm mù đã làm hỏng `check_live_strings.mjs`.
const duongChunk = (t) => [...t.matchAll(/assets\/[A-Za-z0-9_.-]+\.js/g)].map((m) => `/${m[0]}`);

const daTai = new Map();
const hangDoi = duongChunk(goc);
// Lan cho tới khi không còn chunk mới. Chặn trên để một trang lạ không kéo mãi.
for (let vong = 0; vong < 6 && hangDoi.length; vong += 1) {
  const dot = [...new Set(hangDoi.splice(0, hangDoi.length))];
  for (const d of dot) {
    if (daTai.has(d) || daTai.size >= 200) continue;
    try {
      const t = await tai(`${GOC}${d}`);
      daTai.set(d, t);
      for (const c of duongChunk(t)) if (!daTai.has(c)) hangDoi.push(c);
    } catch { daTai.set(d, ''); }
  }
}
const hong = [...daTai].filter(([, t]) => !t).map(([d]) => d);
const tatCa = [...daTai.values()].join('\n');
in2('số tệp JS đã tải', `${daTai.size - hong.length}/${daTai.size}`);
in2('tổng dung lượng đọc được', `${(tatCa.length / 1024).toFixed(0)} KB`);
// Tệp tải hỏng phải BÁO RA. Im lặng bỏ qua rồi kết luận "không tìm thấy cấu
// hình" là kết luận sai trên dữ liệu thiếu.
if (hong.length) {
  in2('⚠️ tệp KHÔNG tải được', `${hong.length} — kết luận bên dưới có thể thiếu`);
  for (const d of hong.slice(0, 5)) console.log(`       ${d}`);
}
if (daTai.size === 0) {
  console.log('  ❌ Không lấy được tệp JS nào — không kết luận được gì. Dừng ở đây');
  console.log('     thay vì báo "không tìm thấy cấu hình", vì hai chuyện đó khác nhau.');
  process.exit(1);
}

// ── Đối chiếu với cấu hình ở máy ───────────────────────────────────────────
const CAN = [
  { khoa: 'VITE_SALES_URL', ten: 'kênh: trang đặt mua' },
  { khoa: 'VITE_SALES_ZALO', ten: 'kênh: Zalo' },
  { khoa: 'VITE_SALES_EMAIL', ten: 'kênh: email' },
  { khoa: 'VITE_SALES_PHONE', ten: 'kênh: điện thoại' },
  { khoa: 'VITE_BANK_NAME', ten: 'ngân hàng: tên' },
  { khoa: 'VITE_BANK_ACCOUNT', ten: 'ngân hàng: số tài khoản' },
  { khoa: 'VITE_BANK_QR', ten: 'ngân hàng: ảnh QR' },
];

console.log('\n═══ CẤU HÌNH Ở MÁY vs BẢN LIVE ═══');
const datOMay = CAN.filter((c) => String(env[c.khoa] || '').trim());
const lech = [];
if (!datOMay.length) {
  console.log('  Máy này chưa đặt biến bán hàng nào, nên không có gì để đối chiếu.');
  console.log('  (Chạy lại trên máy đã đặt biến thì mới bắt được lỗi "quên deploy".)');
} else {
  for (const c of datOMay) {
    const v = String(env[c.khoa]).trim();
    const co = tatCa.includes(v);
    in2(`${c.ten}`, co ? `✅ có trên live (${che(v)})` : `❌ ĐẶT Ở MÁY MÀ LIVE KHÔNG CÓ (${che(v)})`);
    if (!co) lech.push(c.khoa);
  }
}

// ── Bản live có mang lấy MỘT kênh nào không ────────────────────────────────
// Bản đầu in ra hai dòng "gói có khối chuyển khoản không / có lời báo chưa có
// kênh không". Cả hai chuỗi LUÔN có mặt, vì cả hai nhánh đều được dịch vào
// gói — nên hai dòng đó không phân biệt được gì, và chính chú thích của chúng
// đã thừa nhận thế. Một phép đo mà lời chú thích phải nói "cái này không chứng
// minh gì" thì thứ cần bỏ là phép đo, không phải lời chú thích: chú thích rụng
// mất khi người ta trích dẫn con số.
//
// Thứ QUYẾT ĐỊNH được từ gói tải về: có giá trị cấu hình nào trong đó không.
// Thử lần hai cũng hỏng, nên ghi lại kết luận thay vì thử lần ba: TỪ GÓI TẢI
// VỀ, KHÔNG BIẾT TRƯỚC GIÁ TRỊ THÌ KHÔNG QUYẾT ĐỊNH ĐƯỢC là kênh đã cấu hình
// hay chưa. Dấu hiệu `zalo.me/` và `mailto:` đều nằm sẵn trong mã dựng chuỗi
// của banHang.js (`https://zalo.me/${…}`), nên chúng có mặt kể cả khi chưa đặt
// kênh nào — đúng cái khuyết điểm vừa gỡ bỏ ở đoạn trước.
//
// Nên bộ đo này chỉ khẳng định MỘT điều, và khẳng định chắc: giá trị bạn đã
// đặt ở máy có nằm trong bản live hay không. Muốn biết KHÁCH thấy gì thì phải
// mở thật — `npm run kiem:live`.

console.log('\n═══ KẾT LUẬN ═══');
if (lech.length) {
  console.log(`  ❌ ${lech.length} biến đã đặt ở máy nhưng KHÔNG có trong bản live:`);
  for (const k of lech) console.log(`     · ${k}`);
  console.log('  Gần như chắc chắn là đã đặt biến mà CHƯA DEPLOY LẠI. Biến VITE_*');
  console.log('  nhúng lúc dựng, nên phải dựng lại thì bản live mới mang giá trị mới.');
  process.exit(1);
}
if (datOMay.length) {
  console.log('  ✅ Mọi biến bán hàng đặt ở máy đều có mặt trong bản live.');
} else {
  console.log('  ⚠️ Chưa kết luận được: máy chưa đặt biến nào để đối chiếu.');
}
