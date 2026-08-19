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
import { GOI, giaGoi, moiThang, tienVN, tietKiem } from '../src/utils/goi.js';
import { createAccessRecord } from '../src/server/accessCore.js';

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

// ══════════════════════════════════════════════════════════════════════════════
// BA GÓI: QUẢNG CÁO PHẢI KHỚP THỨ MÁY CHỦ CƯỠNG CHẾ ĐƯỢC.
//
// Nhóm này thay hẳn nhóm cũ (Standard / Premium / Trọn đời, giá dạng chuỗi đọc
// từ biến môi trường). Ba chuyện đổi ngày 19/08 theo yêu cầu của chủ dự án:
//   1. BỎ gói vĩnh viễn — không cam kết duy trì web trọn đời được;
//   2. giá ĐẶT SẴN trong mã (số, không phải chuỗi), biến chỉ để ghi đè;
//   3. gói + thời hạn + số thiết bị gom vào MỘT danh sách `GOI`, ba nơi cùng đọc.
//
// Điểm 3 đóng một lỗ có thật: bảng giá quảng cáo "3 thiết bị" trong khi form cấp
// mã mặc định `maxDevices = 1` bất kể gói nào, và máy chủ chỉ cưỡng chế đúng con
// số form gửi lên. Khách trả tiền cho một lời hứa mà bản ghi không mang, và
// KHÔNG có gì báo — người bán phải tự nhớ.
// ══════════════════════════════════════════════════════════════════════════════

test('ba gói khác nhau ĐÚNG hai trục máy chủ cưỡng chế được', () => {
  // Chỉ `maxDevices` (api/access.js) và `expiresAt` (accessCore) là thật. Mọi
  // trục thứ ba nghĩ ra đều là quảng cáo suông — đúng lỗi đã sửa hôm nay khi
  // bảng giá bán AI như đặc quyền Premium trong lúc máy chủ không chặn AI.
  assert.equal(GOI.length, 3);
  const ngay = GOI.map((g) => g.ngay);
  const may = GOI.map((g) => g.thietBi);
  assert.deepEqual(ngay, [...ngay].sort((a, b) => a - b), 'gói phải xếp từ ngắn tới dài');
  assert.deepEqual(may, [...may].sort((a, b) => a - b), 'số thiết bị phải tăng dần theo gói');
  assert.equal(new Set(ngay).size, 3, 'hai gói cùng thời hạn thì không có gì phân biệt');

  // KHÔNG gói nào vĩnh viễn.
  for (const g of GOI) {
    assert.ok(g.ngay > 0 && g.ngay <= 366, `${g.ma}: thời hạn ${g.ngay} ngày`);
    assert.ok(!/vĩnh viễn|trọn đời|lifetime/i.test(`${g.ma} ${g.ten} ${g.caption}`),
      `${g.ma} còn hơi hướng vĩnh viễn`);
  }
});

test('giá LUÔN có, và biến gõ sai KHÔNG được làm bảng giá ra 0đ', () => {
  for (const g of GOI) {
    assert.ok(giaGoi(g.ma, {}) > 0, `${g.ma} không có giá mặc định`);
    assert.ok(moiThang(g.ma, {}) > 0);
  }
  // Ghi đè được, kể cả khi gõ kèm dấu chấm và chữ "đ".
  assert.equal(giaGoi('thang6', { VITE_PRICE_6M: '350000' }), 350000);
  assert.equal(giaGoi('thang6', { VITE_PRICE_6M: '350.000đ' }), 350000);
  // Gõ hẳn chữ thì BỎ QUA và giữ giá mặc định. Bảng giá ghi "0đ" hay "NaNđ" tệ
  // hơn hẳn giá cũ, nên đây không phải chuyện cho chắc ăn.
  for (const rac of ['ba trăm nghìn', '', '   ', '-5', '0', 'abc']) {
    assert.equal(giaGoi('thang6', { VITE_PRICE_6M: rac }), giaGoi('thang6', {}),
      `rác "${rac}" làm đổi giá`);
  }
});

test('gói dài hơn phải RẺ HƠN tính theo tháng — không thì không ai mua', () => {
  const mt = GOI.map((g) => moiThang(g.ma, {}));
  for (let i2 = 1; i2 < mt.length; i2 += 1) {
    assert.ok(mt[i2] < mt[i2 - 1],
      `${GOI[i2].ten} (${tienVN(mt[i2])}/tháng) không rẻ hơn ${GOI[i2 - 1].ten} (${tienVN(mt[i2 - 1])}/tháng)`);
  }
  assert.equal(tietKiem(GOI[0].ma, {}), 0, 'gói ngắn nhất không thể tự rẻ hơn chính nó');
  assert.ok(tietKiem(GOI[2].ma, {}) >= 30,
    'gói dài nhất phải rẻ hơn rõ rệt thì mới làm được mỏ neo giá');
});

test('tienVN định dạng theo lối Việt Nam, không lẫn dấu phẩy kiểu Mỹ', () => {
  assert.equal(tienVN(399000), '399.000đ');
  assert.equal(tienVN(99000), '99.000đ');
  assert.equal(tienVN(0), '0đ');
  for (const g of GOI) assert.ok(!tienVN(giaGoi(g.ma, {})).includes(','), `${g.ma} lẫn dấu phẩy`);
});

test('MÁY CHỦ lấy gói làm SÀN: không cấp được mã hụt so với thứ đã bán', () => {
  // Phép canh đáng giá nhất nhóm này. Form cũ để ba ô độc lập nên người bán hoàn
  // toàn có thể cấp mã 1 thiết bị cho khách vừa mua gói 3 thiết bị, và không có
  // gì báo. Nay `Math.max(gói, yêu cầu)`: rộng tay thêm thì được, hụt thì không.
  // Bất đối xứng là cố ý — rộng tay là quyết định, hụt là tai nạn.
  const dai = GOI[GOI.length - 1];
  const hut = createAccessRecord({ plan: dai.ma, maxDevices: '1', durationDays: '1' });
  assert.equal(hut.plan, dai.ma);
  assert.equal(hut.maxDevices, dai.thietBi,
    `cấp ${hut.maxDevices} thiết bị cho gói đã bán ${dai.thietBi}`);
  const ngayThat = Math.round((new Date(hut.expiresAt).getTime() - Date.now()) / 86400000);
  assert.ok(ngayThat >= dai.ngay - 1, `cấp ${ngayThat} ngày cho gói đã bán ${dai.ngay} ngày`);

  // Rộng tay hơn gói thì VẪN giữ nguyên.
  const rong = createAccessRecord({ plan: GOI[0].ma, maxDevices: '5', durationDays: '400' });
  assert.equal(rong.maxDevices, 5);
  assert.ok(Math.round((new Date(rong.expiresAt).getTime() - Date.now()) / 86400000) >= 399);

  // KHÔNG còn đường tạo mã vĩnh viễn, kể cả khi gọi thẳng bằng id cũ.
  for (const cu of ['lifetime', 'premium', 'standard', 'không-có-thật', undefined]) {
    const r = createAccessRecord({ plan: cu });
    assert.ok(r.expiresAt, `plan="${cu}" vẫn tạo ra mã không hết hạn`);
    assert.ok(GOI.some((g) => g.ma === r.plan), `plan="${cu}" ra gói lạ: ${r.plan}`);
  }
});

test('bảng giá và form cấp mã cùng đọc GOI, không gõ tay lại', () => {
  // Không có phép canh này thì hai màn hình lại trôi khỏi nhau như trước.
  const gia = fs.readFileSync('src/components/access/AccessGate.jsx', 'utf8');
  const admin = fs.readFileSync('src/components/access/AdminAccessPanel.jsx', 'utf8');
  assert.match(gia, /GOI\.map\(/, 'bảng giá vẫn gõ tay danh sách gói');
  assert.match(admin, /GOI\.map\(/, 'form cấp mã vẫn gõ tay danh sách gói');
  for (const g of GOI) {
    assert.ok(!new RegExp(`name: '${g.ten}'`).test(gia), `${g.ten} bị gõ cứng trong bảng giá`);
  }

  // Bảng tra tên PHẢI giữ ba id cũ: mã cấp trước 19/08 vẫn nằm trong Redis với
  // plan: 'premium', và xóa khỏi bảng thì bảng quản trị vẽ ra `undefined` cho
  // đúng những khách đang học.
  for (const cu of ['standard', 'premium', 'lifetime']) {
    assert.ok(admin.includes(`${cu}:`),
      `bảng tra tên đã bỏ id cũ "${cu}" — mã cũ sẽ hiện undefined`);
  }
});

test('AI vẫn là BYOK không chặn theo gói — nên bảng giá không được bán AI như đặc quyền', () => {
  // Chiều 1: máy chủ đúng là không chặn. Thêm chặn thì dòng này đỏ, buộc người
  // thêm quay lại sửa cả chữ trên bảng giá.
  const mayChu = fs.readFileSync('api/ai.js', 'utf8') + fs.readFileSync('functions/api/ai.js', 'utf8');
  assert.equal(/\bplan\b\s*(===|!==|\.includes)|requirePlan|premiumOnly/.test(mayChu), false,
    'api/ai.js nay CÓ chặn AI theo gói — phải sửa lại chữ trên bảng giá cho khớp');

  // Chiều 2: vì không chặn, gói RẺ NHẤT phải được nêu là có AI. Bản cũ chỉ nêu AI
  // ở gói đắt như một bậc nâng cấp, tức bán một thứ gói rẻ vốn đã có.
  const gia = fs.readFileSync('src/components/access/AccessGate.jsx', 'utf8');
  const khoi = gia.slice(gia.indexOf('const plans = GOI.map'), gia.indexOf('return <div className="fixed inset-0 z-[140]'));
  assert.ok(khoi.length > 100, 'không cắt được khối dựng gói — phép so dưới đây vô nghĩa');
  assert.match(khoi, /AI/, 'không thẻ gói nào nêu AI');
  assert.ok(!khoi.includes('Trợ lý AI viết/ảnh/hỏi-đáp'), 'vẫn bán AI như đặc quyền gói đắt');
  assert.ok(!khoi.includes('Placement test & chứng nhận'), 'vẫn bán placement test như đặc quyền');

  // Và nói THẲNG rằng gói đắt không mở thêm tính năng nào — giấu chuyện đó chính
  // là cách bản cũ bán được hai dòng không có thật.
  assert.match(khoi, /GIỐNG HỆT/, 'không nói rõ nội dung các gói là như nhau');
});

test('điều khoản không được nhắc tới gói không còn bán', () => {
  // Văn bản pháp lý hứa một gói không tồn tại là cùng loại lỗi quảng-cáo-vs-
  // cưỡng-chế, chỉ nằm ở file không ai nghĩ tới khi đổi bảng giá.
  const dk = fs.readFileSync('src/components/common/PolicyDialog.jsx', 'utf8');
  assert.ok(!/Standard \/ Premium \/ Lifetime/.test(dk), 'điều khoản vẫn kê ba gói cũ');
  assert.match(dk, /không bán gói vĩnh viễn/, 'điều khoản không nói rõ là không có gói vĩnh viễn');
  assert.match(dk, /gia hạn ngay trên mã cũ/,
    'điều khoản không nêu đường gia hạn — thứ thay cho gói vĩnh viễn');
});
