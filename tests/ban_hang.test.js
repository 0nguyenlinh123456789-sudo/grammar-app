// NÚT "MUA" PHẢI DẪN TỚI MỘT CHỖ CÓ THẬT, VÀ KHÔNG ĐƯỢC KHAI VIỆC CHƯA XẢY RA.
//
// ══ LỖ ĐÃ CÓ THẬT, ĐO ĐƯỢC TRÊN BẢN LIVE ══
// Tải chunk `index-*.js` của https://grammar-app-gray.vercel.app về dò chuỗi:
// có "MUA PREMIUM", có "Đã sao chép yêu cầu mua", và KHÔNG có một url bán hàng
// nào được nhúng. Tức là trên bản đang chạy, khách bấm "MUA PREMIUM" thì app
// sao chép một lời nhắn "vui lòng gửi thông tin thanh toán" — mà không chỗ nào
// trong cả app cho biết gửi cho ai.
//
// Đây là lỗi chặn việc BÁN, không phải lỗi làm phiền: sản phẩm không nhận được
// đơn nào. Nên test này canh ba thứ, và cả ba đều từng sai:
//   1. chưa cấu hình kênh thì phải BÁO, không im lặng;
//   2. không sao chép được thì phải nói KHÔNG, không khai là xong;
//   3. mọi nhánh đều chỉ được đường đi tiếp.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  KENH, kenhDatMua, loiNhanDatMua, saoChepLoiNhan, CHUA_CO_KENH,
} from '../src/utils/banHang.js';

test('chưa cấu hình kênh nào thì trả về mảng RỖNG, không bịa một kênh mặc định', () => {
  assert.deepEqual(kenhDatMua({}), []);
  assert.deepEqual(kenhDatMua(), []);
  // Chuỗi rỗng và chuỗi chỉ có khoảng trắng cũng là CHƯA cấu hình. Trên Vercel,
  // một biến môi trường "đã tạo nhưng để trống" là chuyện rất thường.
  assert.deepEqual(kenhDatMua({ VITE_SALES_URL: '', VITE_SALES_ZALO: '   ' }), []);
});

test('mỗi kênh cấu hình xong đều ra một href BẤM ĐƯỢC, đúng giao thức của nó', () => {
  const ds = kenhDatMua({
    VITE_SALES_URL: 'https://ban.example/mua',
    VITE_SALES_ZALO: '0901234567',
    VITE_SALES_EMAIL: 'ban@example.com',
    VITE_SALES_PHONE: '0901 234 567',
  });
  assert.equal(ds.length, 4);
  const theo = Object.fromEntries(ds.map((k) => [k.loai, k.href]));
  assert.equal(theo.trang, 'https://ban.example/mua');
  assert.equal(theo.zalo, 'https://zalo.me/0901234567');
  assert.equal(theo.email, 'mailto:ban@example.com');
  // Khoảng trắng trong số điện thoại phải bị bỏ, không thì `tel:` hỏng im lặng.
  assert.equal(theo.dienthoai, 'tel:0901234567');
});

test('Zalo nhận cả link sẵn lẫn số điện thoại', () => {
  // Chủ dự án có thể dán link nhóm Zalo thay vì số. Ép thành zalo.me/<số> lúc đó
  // sẽ tạo ra một link rác mà không ai báo.
  assert.equal(kenhDatMua({ VITE_SALES_ZALO: 'https://zalo.me/g/abcxyz' })[0].href, 'https://zalo.me/g/abcxyz');
});

test('lời nhắn đặt mua luôn nêu tên gói, và không lọt undefined ra mặt khách', () => {
  assert.match(loiNhanDatMua('Premium'), /gói Premium/);
  for (const x of [undefined, null, '', 0, false, {}]) {
    const chu = loiNhanDatMua(x);
    assert.ok(!chu.includes('undefined') && !chu.includes('null'), `gói "${String(x)}" → "${chu}"`);
    assert.match(chu, /gói /);
  }
});

// ── SAO CHÉP: PHẢI NÓI THẬT ────────────────────────────────────────────────
test('không có clipboard thì trả về ok=false và CHỈ ĐƯỜNG tự sao chép', async () => {
  // Đây chính là nhánh bản cũ khai thành công: `navigator.clipboard?.writeText`
  // ra `undefined`, không ném lỗi, rồi chạy tiếp tới setCopied(true).
  for (const dh of [undefined, {}, { clipboard: {} }, { clipboard: { writeText: 'không phải hàm' } }]) {
    const r = await saoChepLoiNhan('x', dh);
    assert.equal(r.ok, false, `${JSON.stringify(dh)} phải ra ok=false`);
    assert.match(r.chu, /tự chọn/, 'lời báo không chỉ đường đi tiếp');
  }
});

test('clipboard từ chối quyền thì cũng ok=false, không khai là xong', async () => {
  const dh = { clipboard: { writeText: async () => { throw new Error('NotAllowedError'); } } };
  const r = await saoChepLoiNhan('x', dh);
  assert.equal(r.ok, false);
  assert.match(r.chu, /tự chọn/);
});

test('sao chép được thì ok=true và nội dung đúng là lời nhắn', async () => {
  let daNhan = null;
  const dh = { clipboard: { writeText: async (v) => { daNhan = v; } } };
  const loi = loiNhanDatMua('Trọn đời');
  const r = await saoChepLoiNhan(loi, dh);
  assert.equal(r.ok, true);
  assert.equal(daNhan, loi);
  assert.match(r.chu, /kênh bên dưới/, 'sao chép xong mà không nói gửi đi đâu');
});

test('mọi lời báo là câu hoàn chỉnh, không phải mảnh ghép hụt', async () => {
  const ds = [CHUA_CO_KENH];
  for (const dh of [undefined, { clipboard: { writeText: async () => {} } }]) {
    ds.push((await saoChepLoiNhan('x', dh)).chu);
  }
  for (const chu of ds) {
    assert.ok(chu.length > 40, `lời báo quá ngắn: "${chu}"`);
    assert.ok(!/\s\s/.test(chu), `có khoảng trắng đôi, dấu hiệu ghép chuỗi hụt: "${chu}"`);
    assert.ok(/[.!]$/.test(chu.trim()), `không kết thúc bằng dấu câu: "${chu}"`);
  }
});

// ── CHỐT TĨNH: MÀN HÌNH PHẢI ĐI QUA CÁC HÀM NÀY ───────────────────────────
test('PricingModal KHÔNG còn tự gọi clipboard hay tự dựng lời nhắn trong JSX', () => {
  // Không có chốt này thì mọi test trên vẫn xanh trong khi màn hình đi đường
  // riêng — đúng loại điểm mù đã dính ở lời báo micro (ba chuỗi rải trong JSX,
  // sửa một chỗ thì hai chỗ kia vẫn cũ).
  const s = fs.readFileSync('src/components/access/AccessGate.jsx', 'utf8');
  const i = s.indexOf('function PricingModal');
  assert.ok(i >= 0, 'không thấy PricingModal — phép kiểm đang soi nhầm file');
  const khoi = s.slice(i, s.indexOf('function AccessBadge', i) >= 0 ? s.indexOf('function AccessBadge', i) : s.length);

  assert.ok(!/navigator\s*\.\s*clipboard/.test(khoi),
    'PricingModal gọi thẳng navigator.clipboard — nhánh không-sao-chép-được sẽ nằm ngoài mọi test ở trên');
  assert.ok(khoi.includes('saoChepLoiNhan'), 'PricingModal không đi qua saoChepLoiNhan');
  assert.ok(khoi.includes('kenhDatMua'), 'PricingModal không đọc danh sách kênh đặt mua');
  assert.ok(khoi.includes('CHUA_CO_KENH'), 'PricingModal không có nhánh BÁO khi chưa cấu hình kênh');
});

test('danh sách KENH khai đúng hình, để .env.example và màn hình không lệch nhau', () => {
  for (const k of KENH) {
    assert.match(k.khoa, /^VITE_SALES_[A-Z]+$/, `khóa lạ: ${k.khoa}`);
    assert.equal(typeof k.duaVao, 'function', `${k.khoa} thiếu hàm dựng href`);
    assert.ok(k.nhan && k.nhan.length >= 6, `${k.khoa}: nhãn quá ngắn để hiện lên nút`);
  }
  // Mọi khóa phải có mặt trong .env.example, không thì chủ dự án không biết là
  // có thể đặt — đúng cái đã xảy ra: VITE_SALES_URL có trong ví dụ nhưng để
  // trống, và không ai thấy hậu quả.
  const vd = fs.readFileSync('.env.example', 'utf8');
  for (const k of KENH) assert.ok(vd.includes(k.khoa), `${k.khoa} thiếu trong .env.example`);
});
