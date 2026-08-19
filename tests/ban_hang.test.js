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
  KHOA_GIA, giaGoi, CHUA_CO_GIA,
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

// ══════════════════════════════════════════════════════════════════════════════
// LỖ THỨ HAI, TÌM RA 19/08: BẢNG GIÁ KHÔNG CÓ GIÁ.
//
// Modal tên "Chọn gói phù hợp", ba thẻ Standard / Premium / Trọn đời, mỗi thẻ
// một nút "MUA …" — và không một con số nào trong cả AccessGate.jsx lẫn
// banHang.js. Khách phải nhắn tin hỏi giá rồi CHỜ trả lời mới quyết được, tức
// mất người mua đúng ở bước dễ mất nhất.
//
// Cùng họ với lỗ "không có kênh đặt mua": cả hai đều là chỗ lặng lẽ thiếu chứ
// không phải chỗ báo là thiếu. Nên luật ở đây giống hệt bên đó — chưa đặt giá
// thì màn hình phải NÓI RA.
// ══════════════════════════════════════════════════════════════════════════════

test('chưa đặt giá thì giaGoi trả rỗng, và màn hình phải BÁO chứ không để trống', () => {
  for (const goi of Object.keys(KHOA_GIA)) {
    assert.equal(giaGoi(goi, {}), '', `${goi}: env rỗng mà vẫn ra giá`);
  }
  assert.equal(giaGoi('Premium', { VITE_PRICE_PREMIUM: '   ' }), '',
    'giá toàn dấu cách phải bị coi là chưa đặt, không thì thẻ hiện một ô trắng');
  assert.equal(giaGoi('Gói không tồn tại', { VITE_PRICE_PREMIUM: '499.000đ' }), '');
  assert.ok(CHUA_CO_GIA.length > 6, 'câu báo thiếu giá phải nói được thành lời');
});

test('đặt giá thì hiện đúng chuỗi đã đặt, không tự định dạng lại', () => {
  // Không tự thêm "đ", không tự chấm phẩy: chủ dự án gõ sao hiện vậy. Tự định
  // dạng là một kiểu thay thế âm thầm, và đơn vị tiền thì không được đoán.
  assert.equal(giaGoi('Premium', { VITE_PRICE_PREMIUM: '499.000đ' }), '499.000đ');
  assert.equal(giaGoi('Trọn đời', { VITE_PRICE_LIFETIME: '1.990.000 VNĐ' }), '1.990.000 VNĐ');
  assert.equal(giaGoi('Standard', { VITE_PRICE_STANDARD: ' 299k ' }), '299k');
});

test('lời nhắn đặt mua mang theo giá khi đã có giá', () => {
  // Người mua và người bán cùng nhìn một con số, khỏi cãi nhau sau khi đã
  // chuyển khoản. Chưa có giá thì lời nhắn KHÔNG được bịa ra dấu ngoặc rỗng.
  const co = loiNhanDatMua('Premium', { VITE_PRICE_PREMIUM: '499.000đ' });
  assert.ok(co.includes('Premium') && co.includes('499.000đ'), co);
  const khong = loiNhanDatMua('Premium', {});
  assert.ok(khong.includes('Premium'), khong);
  assert.ok(!/\(\s*\)/.test(khong), `lời nhắn có cặp ngoặc rỗng: ${khong}`);
  // Gọi thiếu tham số env vẫn phải chạy, vì còn chỗ gọi cũ trong bộ test khác.
  assert.ok(loiNhanDatMua('Standard').includes('Standard'));
});

test('TÊN GÓI trong bảng giá phải khớp KHOÁ GIÁ — lệch một chữ là giá biến mất', () => {
  // Phép canh đáng giá nhất của nhóm này. `giaGoi` tra bảng theo TÊN GÓI, nên
  // đổi 'Trọn đời' thành 'Trọn Đời' ở AccessGate.jsx là đủ để thẻ đó im lặng
  // rơi về "liên hệ người bán" mãi mãi — không lỗi, không cảnh báo, và mọi test
  // khác vẫn xanh. Đây đúng kiểu hỏng đã dính nhiều lần: thiếu dữ liệu mà không
  // ai báo. Nên tên gói phải lấy TỪ CHÍNH MÀN HÌNH chứ không chép tay sang đây.
  const src = fs.readFileSync('src/components/access/AccessGate.jsx', 'utf8');
  const khoi = src.slice(src.indexOf('const plans = ['), src.indexOf('const plans = [') + 1500);
  const ten = [...khoi.matchAll(/\{ name: '([^']+)'/g)].map((m) => m[1]);

  assert.equal(ten.length, 3, `đọc được ${ten.length} gói từ AccessGate thay vì 3 — bộ đọc hỏng thì phép so dưới đây vô nghĩa`);
  assert.deepEqual([...ten].sort(), Object.keys(KHOA_GIA).sort(),
    'tên gói trên màn hình và khoá giá trong banHang.js đã lệch nhau');

  // Và màn hình phải thật sự có nhánh BÁO, không chỉ có hàm tra giá.
  assert.ok(src.includes('giaGoi('), 'PricingModal không tra giá');
  assert.ok(src.includes('CHUA_CO_GIA'), 'PricingModal thiếu nhánh BÁO khi chưa có giá');

  const vd = fs.readFileSync('.env.example', 'utf8');
  for (const k of Object.values(KHOA_GIA)) assert.ok(vd.includes(k), `${k} thiếu trong .env.example`);
});

// ══════════════════════════════════════════════════════════════════════════════
// LỜI QUẢNG CÁO PHẢI KHỚP THỨ MÁY CHỦ THẬT SỰ CƯỠNG CHẾ.
//
// Nhóm test này ra đời vì 392 test xanh vẫn để lọt một chuyện: bảng giá bán
// Premium bằng dòng "Trợ lý AI viết/ảnh/hỏi-đáp", trong khi api/ai.js ghi thẳng
// trong mã rằng nó KHÔNG kiểm gói — khách Standard mang key thì dùng AI y hệt.
// Và "Placement test & chứng nhận" cũng thế: không màn hình nào đọc access.plan.
//
// Không test nào so QUẢNG CÁO với CƯỠNG CHẾ, nên cả hai dòng sai sống yên. Đây
// đúng họ với các lỗi khác của dự án: một phía nói, không phía nào kiểm.
// ══════════════════════════════════════════════════════════════════════════════

const nguonGoi = () => {
  const src = fs.readFileSync('src/components/access/AccessGate.jsx', 'utf8');
  const dau = src.indexOf('  const plans = [');
  return src.slice(dau, src.indexOf('];', src.indexOf("action: 'MUA TRỌN ĐỜI' },", dau)));
};

test('AI vẫn là BYOK không chặn theo gói — nên bảng giá không được bán AI như đặc quyền', () => {
  // Chiều 1: máy chủ đúng là không chặn. Nếu ngày nào đó có người thêm chặn thì
  // dòng này đỏ, và người đó buộc phải quay lại sửa cả chữ trên bảng giá.
  const mayChu = fs.readFileSync('api/ai.js', 'utf8') + fs.readFileSync('functions/api/ai.js', 'utf8');
  const coChan = /\bplan\b\s*(===|!==|\.includes)|requirePlan|premiumOnly/.test(mayChu);
  assert.equal(coChan, false,
    'api/ai.js nay CÓ chặn AI theo gói — phải sửa lại chữ trên bảng giá cho khớp, '
    + 'và cân nhắc lại: quyết định BYOK là khách tự trả tiền key của họ');

  // Chiều 2: vì không chặn, gói rẻ nhất PHẢI được nêu là có AI. Bản cũ chỉ nêu
  // AI ở Premium như một bậc nâng cấp, tức bán một thứ Standard vốn đã có.
  const goi = nguonGoi();
  const standard = goi.slice(goi.indexOf("name: 'Standard'"), goi.indexOf("name: 'Premium'"));
  assert.match(standard, /AI/,
    'gói Standard không nêu AI, trong khi máy chủ cho Standard dùng AI đầy đủ');

  // Chiều 3: không được để lại đúng hai dòng đã đo được là sai.
  assert.ok(!goi.includes('Trợ lý AI viết/ảnh/hỏi-đáp'),
    'vẫn bán AI như đặc quyền Premium, trong khi Standard dùng AI y hệt');
  assert.ok(!goi.includes('Placement test & chứng nhận'),
    'vẫn bán placement test/chứng nhận như đặc quyền, trong khi không màn hình nào chặn theo gói');
});

test('thứ CÓ khác nhau thật giữa các gói phải được nêu, vì đó là lý do trả thêm tiền', () => {
  // `maxDevices` chặn thật trong api/access.js, `expiresAt` chặn thật trong
  // accessCore. Đó là hai thứ duy nhất phân biệt được, nên phải nói ra — không
  // nói thì khách không có lý do nào để chọn gói đắt hơn.
  const goi = nguonGoi();
  for (const [ten, mong] of [['Standard', /1 thiết bị/], ['Premium', /3 thiết bị/], ['Trọn đời', /5 thiết bị/]]) {
    const i = goi.indexOf(`name: '${ten}'`);
    const khoi = goi.slice(i, goi.indexOf("action: 'MUA", i));
    assert.match(khoi, mong, `gói ${ten} không nêu số thiết bị — thứ duy nhất được cưỡng chế thật`);
  }
  const tronDoi = goi.slice(goi.indexOf("name: 'Trọn đời'"));
  assert.match(tronDoi, /KHÔNG HẾT HẠN|không hết hạn/,
    'gói Trọn đời không nêu việc không hết hạn, trong khi đó là điều plan THẬT SỰ điều khiển');

  // Và máy chủ đúng là cưỡng chế hai thứ đó.
  const loi = fs.readFileSync('src/server/accessCore.js', 'utf8');
  assert.match(loi, /plan === 'lifetime' \? null/, 'accessCore không còn cho lifetime khỏi hết hạn');
  assert.match(fs.readFileSync('api/access.js', 'utf8'), /maxDevices/, 'api/access.js không còn chặn số thiết bị');
});
