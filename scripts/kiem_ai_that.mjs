// GỌI THẬT GOOGLE BẰNG MỘT KEY THẬT, QUA ĐÚNG MÃ MÀ MÁY CHỦ CHẠY.
//
// ══ VÌ SAO PHẢI CÓ FILE NÀY ══
// Trước ngày 19/08, toàn bộ phần AI chỉ được kiểm bằng `fetch` giả trong
// tests/core.test.js: khách không key thì app báo đúng câu, key sai thì app báo
// đúng câu. Tất cả xanh. Nhưng KHÔNG một dòng nào từng gọi Google thật, nên hai
// thứ nằm ngoài mọi phép đo và cả hai đều đang hỏng trên bản bán cho khách:
//
//   1. Bộ mẫu key thiếu dấu chấm → key đời mới `AQ.…` bị CHÍNH APP từ chối.
//   2. `gemini-2.5-flash` đã bị Google khoá với người dùng MỚI → 404, và bản cũ
//      dịch 404 thành "thử lại sau", tức bảo khách đi thử lại một thứ đã chết hẳn.
//
// Cả hai chỉ lộ ra khi có key thật cắm vào. Đó là việc của script này.
//
// ══ CHẠY ══
//   GEMINI_TEST_KEY=<key> npm run ai:that
// Không đặt biến thì script BỎ QUA và thoát 0 — để `npm test` của người khác
// không đỏ chỉ vì họ không có key. Nó không bao giờ in key ra màn hình.
//
// ⚠️ KEY NÀY CHỈ ĐỂ THỬ. Không đặt nó vào .env dưới bất kỳ tên VITE_* nào: mọi
// biến VITE_* bị NHÚNG THẲNG vào bundle và đi tới trình duyệt của từng khách.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve('.');
const nap = (p) => import(pathToFileURL(path.join(ROOT, p)).href);
const {
  MODEL, buildRequest, describeProviderFailure, geminiEndpoint, readGeminiKey,
} = await nap('functions/api/ai.js');
const { isValidGeminiKey } = await nap('src/utils/aiKey.js');

const KEY = (process.env.GEMINI_TEST_KEY || '').trim();
if (!KEY) {
  console.log('⏭️  BỎ QUA: chưa đặt GEMINI_TEST_KEY.');
  console.log('   Chạy:  GEMINI_TEST_KEY=<key Google AI Studio> npm run ai:that');
  process.exit(0);
}

// Timeout thật của api/ai.js. Ghim ở đây để nếu bên kia đổi mà quên bên này thì
// con số trong báo cáo vẫn là con số đang chạy, chứ không phải con số nhớ nhầm.
const TIMEOUT_APP = 25000;

let dat = 0;
let hong = 0;
let treo = 0;   // ca KHÔNG KẾT LUẬN ĐƯỢC, khác hẳn ca hỏng — xem chú thích dưới
const ok = (chu) => { dat += 1; console.log(`  ✅ ${chu}`); };
const xau = (chu) => { hong += 1; console.log(`  ❌ ${chu}`); };
// HẾT HẠN MỨC KHÔNG PHẢI LÀ APP HỎNG, và gộp hai thứ đó là đúng kiểu lỗi dự án
// này đã dính nhiều lần: một thông báo nuốt hai nguyên nhân khác nhau. Lượt chạy
// đầu tiên của chính script này báo "AI đang HỎNG" trong khi sự thật là tôi vừa
// gọi ~30 lượt để đo nên đụng trần THEO PHÚT; chờ 25 giây rồi gọi lại thì chạy.
const chua = (chu) => { treo += 1; console.log(`  ⏸️  ${chu}`); };

/** Gọi Google đúng cách api/ai.js gọi: cùng endpoint, cùng thân, cùng cách đọc. */
async function goiGoogle(model, key, parts) {
  const t0 = process.hrtime.bigint();
  let r;
  let d;
  try {
    r = await fetch(geminiEndpoint(key).replace(`/models/${MODEL}:`, `/models/${model}:`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts }] }),
    });
    d = await r.json();
  } catch (e) {
    return { ms: -1, http: 0, loi: e.message };
  }
  return {
    ms: Number((process.hrtime.bigint() - t0) / 1000000n),
    http: r.status,
    chu: d?.candidates?.[0]?.content?.parts?.[0]?.text,
    loi: d?.error?.message,
  };
}

console.log(`\n═══ KIỂM AI BẰNG KEY THẬT · model đang ghim: ${MODEL} ═══\n`);

// ── 1. App có CHỊU NHẬN key này không ────────────────────────────────────────
// Đặt trước mọi thứ khác vì đây là cửa đầu tiên: hỏng ở đây thì khách không bao
// giờ tới được cửa thứ hai, dù key của họ hoàn hảo.
console.log('[1] Hai đầu app có nhận dạng key này là hợp lệ không');
if (isValidGeminiKey(KEY)) ok('trình duyệt (src/utils/aiKey.js) nhận key');
else xau('trình duyệt TỪ CHỐI key — hộp thoại sẽ báo "key không hợp lệ" dù key đúng');
if (readGeminiKey(KEY) === KEY) ok('máy chủ (functions/api/ai.js) nhận key');
else xau('máy chủ TỪ CHỐI key — app sẽ báo "bạn chưa thêm API key" dù vừa thêm xong');

// ── 2. Bốn chế độ AI, gọi Google thật ────────────────────────────────────────
console.log('\n[2] Bốn chế độ AI gọi Google thật (đây là chỗ 404 nằm im suốt)');
const ANH = fs.readFileSync(path.join(ROOT, 'public/bunny_studying.png')).toString('base64');
const CHE_DO = [
  ['writing  (chấm bài viết)', 'writing', { text: 'Last year I go to Da Nang with my family and we was very happy.', topicTitle: 'Kỳ nghỉ' }],
  ['speaking (chấm bản chữ nói)', 'speaking', { text: 'I like play football with my friend in the weekend.', topicTitle: 'Sở thích' }],
  ['chat     (gia sư Bunny)', 'chat', { question: 'Khi nào dùng "a" và khi nào dùng "an"?' }],
  ['ảnh      (quét từ vựng)', 'image-vocabulary', { imageData: ANH, mimeType: 'image/png' }],
];
for (const [nhan, mode, payload] of CHE_DO) {
  const parts = buildRequest(mode, payload);
  let r = await goiGoogle(MODEL, KEY, parts);
  if (r.http === 429) {
    // Trần THEO PHÚT của gói miễn phí. Chờ rồi gọi lại một lần: nếu qua được thì
    // đó là do gọi dồn chứ không phải hết hạn mức ngày.
    console.log(`  ⏳ ${nhan}: đụng hạn mức theo phút, chờ 25s gọi lại...`);
    await new Promise((x) => { setTimeout(x, 25000); });
    r = await goiGoogle(MODEL, KEY, parts);
  }
  if (r.http === 429) {
    chua(`${nhan}: key này đã hết hạn mức Google trong hôm nay → KHÔNG kết luận được`);
    console.log(`       (app nói với khách: "${describeProviderFailure(429)[1]}" — câu này ĐÚNG)`);
    continue;
  }
  if (r.http !== 200 || !r.chu) {
    const [ma, loi] = describeProviderFailure(r.http);
    xau(`${nhan}: HTTP ${r.http} → app trả mã "${ma}"\n       Google nói: ${String(r.loi || '').slice(0, 110)}\n       Câu app hiện cho khách: ${loi}`);
    continue;
  }
  const canh = r.ms > TIMEOUT_APP ? `⚠️ VƯỢT timeout ${TIMEOUT_APP}ms` : `dưới timeout ${TIMEOUT_APP}ms`;
  ok(`${nhan}: ${String(r.ms).padStart(5)}ms (${canh}), trả ${String(r.chu).length} ký tự`);
  if (r.ms > TIMEOUT_APP) hong += 1;
  // Chế độ ảnh hứa trả JSON đúng cấu trúc. Nếu nó trả văn xuôi thì màn quét ảnh
  // vỡ khi phân tích, mà bước gọi vẫn "thành công" — nên phải soi tận đây.
  if (mode === 'image-vocabulary') {
    try {
      const j = JSON.parse(String(r.chu).replace(/^```json\s*|\s*```$/g, '').trim());
      if (j.word && j.meaning && Array.isArray(j.sentences)) ok(`         └ JSON đúng cấu trúc: "${j.word}" = ${j.meaning}`);
      else xau('         └ JSON thiếu trường word/meaning/sentences');
    } catch { xau('         └ chế độ ảnh KHÔNG trả JSON hợp lệ, màn quét ảnh sẽ vỡ'); }
  }
}

// ── 3. Nhánh lỗi, đối chiếu với phản hồi THẬT chứ không phải số tự bịa ───────
// Test đơn vị gọi describeProviderFailure(404) là gọi bằng con số tôi tự gõ. Ở
// đây con số đến TỪ GOOGLE, nên nó chứng minh nhánh khớp với thực tế bên ngoài.
console.log('\n[3] Nhánh lỗi khớp với phản hồi thật của Google');
const RUT = 'gemini-2.5-flash';
const rRut = await goiGoogle(RUT, KEY, buildRequest('writing', { text: 'Hello teacher.' }));
if (rRut.http === 404 && describeProviderFailure(404)[0] === 'model-retired') {
  ok(`model đã bị gỡ (${RUT}) → Google trả 404 → app nói ĐÚNG: "model-retired"`);
} else if (rRut.http === 404) {
  xau(`Google trả 404 mà app dịch thành "${describeProviderFailure(404)[0]}" — khách sẽ bị bảo đi thử lại một thứ đã chết`);
} else {
  console.log(`  ⏭️  bỏ qua: ${RUT} nay trả HTTP ${rRut.http}, không còn dựng được ca 404 thật`);
}

const rSai = await goiGoogle(MODEL, `${'A'.repeat(30)}zz`, buildRequest('chat', { question: 'Hi' }));
if ([400, 401, 403].includes(rSai.http) && describeProviderFailure(rSai.http)[0] === 'invalid-key') {
  ok(`key sai → Google trả ${rSai.http} → app nói ĐÚNG: "invalid-key"`);
} else {
  xau(`key sai → Google trả ${rSai.http}, app nói "${describeProviderFailure(rSai.http)[0]}"`);
}

console.log(`\n═══ ${dat} đạt · ${hong} hỏng · ${treo} chưa kết luận ═══`);
if (hong) {
  console.log('\n⚠️ Tính năng AI đang HỎNG với key thật. Đây là thứ khách trả tiền sẽ gặp.');
  process.exit(1);
}
if (treo) {
  console.log('\n⏸️  Chưa kết luận được: key dùng để thử đã hết hạn mức Google hôm nay.');
  console.log('   KHÔNG có nghĩa là app hỏng, và cũng KHÔNG có nghĩa là app chạy.');
  console.log('   Chạy lại vào ngày mai, hoặc dùng key khác. Thoát mã 2 để phân biệt với mã 1 (hỏng thật).');
  process.exit(2);
}
console.log('\nAI chạy thật với key thật, cả bốn chế độ, dưới ngưỡng timeout.');
