// APP PHẢI NHẬN ĐƯỢC KEY GOOGLE ĐANG CẤP, VÀ PHẢI GỌI MỘT MODEL CÒN SỐNG.
//
// ══ HAI LỖI THẬT, ĐỀU ĐANG NẰM TRÊN BẢN BÁN CHO KHÁCH ══
// Ngày 19/08 chủ dự án đưa một key Gemini thật. Cắm vào thì lộ ra hai thứ mà 381
// test trước đó không thể thấy, vì không test nào từng gọi Google:
//
//   1. Key đời mới của Google có dạng `AQ.Ab8RN6…` — CÓ DẤU CHẤM. Bộ mẫu cũ
//      /^[A-Za-z0-9_-]{20,120}$/ không cho dấu chấm, nên app tự tuyên key là sai
//      trước khi kịp gọi Google lấy một lần. Khách trả tiền, dán đúng key Google
//      vừa cấp cho họ, và nhận lại câu "key không hợp lệ".
//   2. `gemini-2.5-flash` đã bị Google khoá với người dùng MỚI (404). Nghĩa là
//      MỌI khách mới đều mất sạch tính năng AI — và 404 rơi vào nhánh mặc định
//      nên app bảo họ "thử lại sau", một lời khuyên không đời nào đúng.
//
// ══ VÌ SAO TEST NÀY KHÔNG THỂ THAY `npm run ai:that` ══
// Ở đây không có mạng: mọi phép so dưới đây dùng con số tôi tự gõ. Nó chặn được
// việc SỬA HỎNG (lệch bộ mẫu, đổi model về loại đã đo là xấu), nhưng KHÔNG thấy
// được ngày Google gỡ tiếp một model nữa. Việc đó là của `npm run ai:that`, nơi
// con số đến từ Google. Ghi rõ để phiên sau đừng đọc màu xanh ở đây thành
// "AI chạy tốt" — nó chỉ có nghĩa "AI chưa bị sửa hỏng thêm".

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve('.');
const nap = (p) => import(pathToFileURL(path.join(ROOT, p)).href);

const MAY_CHU = await nap('functions/api/ai.js');
const TRINH_DUYET = await nap('src/utils/aiKey.js');

// Key giả, đúng HÌNH DẠNG key đời mới nhưng không phải key thật của ai cả.
const KEY_MOI = 'AQ.Ab8ZzTestKey0123456789--abcDEF_ghiJKL';
const KEY_CU = 'AIzaSyTestKey0123456789abcdefghijklmno';

test('hai bộ mẫu key ở hai đầu phải GIỐNG HỆT nhau', () => {
  // Đây là phép canh quan trọng nhất trong file. Sửa mỗi một bên thì hỏng NẶNG
  // HƠN lúc chưa sửa: hộp thoại nhận key, báo lưu thành công, rồi mọi lần chấm
  // bài đều bị máy chủ trả về đúng câu "Bạn chưa thêm API key Gemini của mình"
  // — nói với một người vừa thêm key xong. Không có dòng này thì bản vá nửa vời
  // đi qua toàn bộ bộ test.
  assert.equal(
    MAY_CHU.GEMINI_KEY_PATTERN.source, TRINH_DUYET.GEMINI_KEY_PATTERN.source,
    'bộ mẫu key ở functions/api/ai.js và src/utils/aiKey.js đã lệch nhau',
  );
  assert.equal(MAY_CHU.AI_KEY_HEADER ?? 'x-gemini-key', TRINH_DUYET.AI_KEY_HEADER);
});

test('cả hai đời key của Google đều được nhận, ở CẢ HAI đầu', () => {
  for (const [ten, key] of [['đời mới AQ.…', KEY_MOI], ['đời cũ AIza…', KEY_CU]]) {
    assert.ok(TRINH_DUYET.isValidGeminiKey(key), `trình duyệt từ chối key ${ten}`);
    assert.equal(MAY_CHU.readGeminiKey(key), key, `máy chủ từ chối key ${ten}`);
  }
  // Dấu cách thừa hai đầu là lỗi sao chép thường gặp nhất, phải cắt chứ không loại.
  assert.equal(MAY_CHU.readGeminiKey(`  ${KEY_MOI}  `), KEY_MOI);
});

test('nới charset cho dấu chấm KHÔNG được mở đường tiêm vào query string', () => {
  // Key bị nhét thẳng vào query string gọi Google. Dấu chấm vô hại ở đó; `&`,
  // `?`, `=`, `/` và dấu cách thì không, và phải bị TỪ CHỐI chứ không phải escape.
  for (const xau of [
    `${KEY_MOI}&model=evil`,
    `${KEY_MOI}?x=1`,
    `${KEY_MOI}=x`,
    `${KEY_MOI}/../../v1`,
    `${KEY_MOI} rồi thêm chữ`,
    'AIzaSyValidLooking0123456789&model=evil',
    'quá-ngắn',
    '',
  ]) {
    assert.equal(MAY_CHU.readGeminiKey(xau), '', `máy chủ đã nhận một key đáng lẽ phải loại: ${xau.slice(0, 40)}`);
    assert.equal(TRINH_DUYET.isValidGeminiKey(xau), false, `trình duyệt đã nhận: ${xau.slice(0, 40)}`);
  }
  assert.ok(MAY_CHU.geminiEndpoint(KEY_MOI).endsWith(`?key=${encodeURIComponent(KEY_MOI)}`));
});

test('404 phải nói THẬT, không được gộp vào "thử lại sau"', () => {
  const [ma, chu, http] = MAY_CHU.describeProviderFailure(404);
  assert.equal(ma, 'model-retired');
  assert.notEqual(ma, 'provider-error');
  // Câu chữ phải chỉ đúng thủ phạm. Bản cũ đẩy lỗi của ứng dụng sang key của
  // người học, nên họ đi đổi key — việc không bao giờ sửa được gì.
  assert.match(chu, /KHÔNG phải key của bạn/);
  assert.ok(!/thử lại sau/i.test(chu), 'câu 404 vẫn khuyên thử lại — 404 kiểu này là hỏng vĩnh viễn');
  assert.equal(typeof http, 'number');

  // Các nhánh cũ không được vỡ khi chèn nhánh mới vào trước.
  assert.equal(MAY_CHU.describeProviderFailure(403)[0], 'invalid-key');
  assert.equal(MAY_CHU.describeProviderFailure(400)[0], 'invalid-key');
  assert.equal(MAY_CHU.describeProviderFailure(429)[0], 'quota-exceeded');
  assert.equal(MAY_CHU.describeProviderFailure(500)[2], 502);
});

test('model đang ghim không phải loại đã ĐO ĐƯỢC là hỏng', () => {
  const m = MAY_CHU.MODEL;
  assert.ok(typeof m === 'string' && m.length > 0);

  // Đo ngày 19/08 bằng key thật: hai model này Google trả 404 "no longer
  // available to new users". Ghim lại thì khách mới mất sạch tính năng AI.
  for (const chet of ['gemini-2.5-flash', 'gemini-2.5-flash-lite']) {
    assert.notEqual(m, chet, `${chet} đã bị Google khoá với người dùng mới`);
  }

  // Bí danh -latest nghe như thuốc chống hỏng-vì-cũ. Đo thì nó là thứ KÉM tin cậy
  // nhất: nó trỏ vào model MỚI NHẤT, tức model đang đông nhất (503 "high demand"
  // cả hai lượt), và model mới nhất cũng là model "nghĩ" lâu nhất — gemini-3.6
  // vượt timeout 25 s ở 1/3 lượt với prompt tầm thường. Một bí danh có thể tự
  // trượt sang model như thế mà không ai đổi một dòng mã nào.
  assert.ok(!/latest/.test(m), `MODEL đang là bí danh "${m}" — đo được là kém tin cậy nhất, hãy ghim tên đầy đủ`);
});

test('chữ hướng dẫn không được nói với khách rằng key đúng của họ là sai', () => {
  // Phép canh này tồn tại vì bản vá NỬA VỜI vẫn xanh ở mọi test trên: sửa bộ mẫu
  // cho nhận `AQ.…` nhưng để nguyên câu "kiểm tra đã sao chép đủ chuỗi bắt đầu
  // bằng AIza". Khách có key `AQ.` đọc câu đó rồi đi tìm một key không tồn tại.
  const s = fs.readFileSync(path.join(ROOT, 'src/components/common/AiKeyDialog.jsx'), 'utf8');
  assert.ok(s.includes('AQ.'), 'hộp thoại key chưa hề nhắc tới dạng key AQ.… mà Google đang cấp');
  assert.ok(
    !/chuỗi key \(bắt đầu bằng <code className="font-mono">AIza…<\/code>\)/.test(s),
    'bước hướng dẫn vẫn khẳng định key CHỈ bắt đầu bằng AIza',
  );
  assert.ok(
    !/sao chép đủ chuỗi bắt đầu bằng <code className="font-mono">AIza<\/code>/.test(s),
    'mục gỡ rối vẫn khẳng định key CHỈ bắt đầu bằng AIza',
  );
});

test('có bộ dò gọi thật, và nó BỎ QUA sạch khi không có key', () => {
  // Test trong file này không chạm mạng, nên nó không bao giờ thấy được ngày
  // Google gỡ tiếp một model. Việc đó thuộc về scripts/kiem_ai_that.mjs; nếu file
  // đó biến mất thì cả dự án quay lại tình trạng "AI chưa từng được gọi thật".
  const s = fs.readFileSync(path.join(ROOT, 'scripts/kiem_ai_that.mjs'), 'utf8');
  assert.ok(s.includes('GEMINI_TEST_KEY'));
  assert.ok(s.includes('process.exit(0)'), 'bộ dò phải thoát 0 khi không có key, để máy người khác không đỏ oan');
  assert.ok(s.includes("MODEL, buildRequest") || s.includes('MODEL,'),
    'bộ dò phải NHẬP model từ mã thật, không được gõ lại tên model — gõ lại thì nó đo một thứ khác với thứ đang chạy');

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert.equal(pkg.scripts['ai:that'], 'node scripts/kiem_ai_that.mjs');
});
