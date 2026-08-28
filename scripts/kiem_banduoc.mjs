// File: scripts/kiem_banduoc.mjs
//
//   npm run kiem:banduoc
//
// CỔNG "ĐÃ ĐỦ ĐIỀU KIỆN BÁN CHƯA" — trả lời bằng danh sách đo được, không bằng
// ý kiến của người viết mã.
//
// ══ VÌ SAO FILE NÀY TỒN TẠI ══
// Trong cùng phiên làm việc đã có HAI lần tôi tuyên bố sai về tình trạng sản
// phẩm: một lần bảo nút reset hỏng (thật ra bộ rà dò nhầm id), một lần bảo lộ
// trình không có bài nói/bài viết (thật ra phủ 99%). Cả hai đều là do TRẢ LỜI
// TỪ TRÍ NHỚ thay vì từ phép đo. Câu "bán được chưa" quan trọng hơn cả hai câu
// đó, nên nó phải có phép đo riêng, chạy lại được bất cứ lúc nào.
//
// ══ CHIA HAI CỘT, VÀ ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT ══
// Có những việc CHỈ CHỦ DỰ ÁN làm được (số tài khoản, ảnh QR, kênh giao mã,
// chọn nơi đặt web). Máy không được phép báo "xong" thay, cũng không được lẫn
// chúng vào lỗi kỹ thuật. Nên kết quả tách làm hai:
//   · VIỆC CỦA MÃ    — nếu đỏ thì lập trình viên phải sửa.
//   · VIỆC CỦA CHỦ   — nếu đỏ thì chờ chủ dự án cung cấp, không ai sửa hộ được.
//
// ══ ĐIỀU FILE NÀY KHÔNG LÀM ĐƯỢC ══
// Nó đọc biến môi trường Ở MÁY ĐANG CHẠY. Đặt biến trên bảng điều khiển của
// nhà cung cấp mà chưa deploy lại thì bản live vẫn dùng giá trị cũ — biến
// VITE_* bị nhúng LÚC DỰNG. Muốn biết bản LIVE thật sự có gì thì phải dò trong
// gói đã tải về; đó là việc của `npm run kiem:live`, không phải của file này.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { docEnv } from './lib/docEnv.mjs';

const ROOT = path.resolve('.');
const nap = (p) => import(pathToFileURL(path.join(ROOT, p)).href);
const doc = (p) => (fs.existsSync(path.join(ROOT, p)) ? fs.readFileSync(path.join(ROOT, p), 'utf8') : '');

// Luật đọc biến nằm ở MỘT bản duy nhất, dùng chung với `kiem_ban_live.mjs` —
// xem scripts/lib/docEnv.mjs để biết chuyện gì xảy ra khi có hai bản.
const env = docEnv(ROOT);

const MUC = [];
const them = (ai, ten, dat, chiTiet) => MUC.push({ ai, ten, dat, chiTiet });

// ══════════════════════════════════════════════════════════════════════════
// VIỆC CỦA MÃ
// ══════════════════════════════════════════════════════════════════════════

// 1. Ba gói có giá đọc được, và không có gói vĩnh viễn (chủ dự án đã chốt:
//    không duy trì web trọn đời được nên không bán trọn đời).
{
  const { GOI, giaGoi } = await nap('src/utils/goi.js');
  const xau = GOI.filter((g) => !(giaGoi(g.ma, env) >= 1000));
  const vinhVien = GOI.filter((g) => !Number.isFinite(g.ngay) || g.ngay > 3650);
  them('mã', 'Ba gói bán có thời hạn và giá hợp lệ',
    xau.length === 0 && vinhVien.length === 0 && GOI.length === 3,
    xau.length ? `giá không đọc được: ${xau.map((g) => g.ma).join(', ')}`
      : vinhVien.length ? `còn gói không có hạn: ${vinhVien.map((g) => g.ma).join(', ')}`
        : `${GOI.map((g) => `${g.ten} ${(giaGoi(g.ma, env) / 1000).toFixed(0)}k`).join(' · ')}`);
}

// 2. Model AI đang ghim phải là model còn sống. Đây là chỗ đã cháy một lần:
//    bản cũ ghim gemini-2.5-flash, Google khoá với người dùng MỚI, nên mọi
//    khách mang key riêng đều ăn 404 và toàn bộ tính năng AI chết.
{
  const { MODEL } = await nap('functions/api/ai.js');
  const CHET = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
  const laBiDanh = /-latest$/.test(MODEL);
  them('mã', 'Model AI ghim cứng, không phải model đã chết hay bí danh',
    !CHET.includes(MODEL) && !laBiDanh,
    laBiDanh ? `${MODEL} là bí danh — đo được là KÉM tin cậy nhất (503 vì đông)` : MODEL);
}

// 3. Cam kết nội dung: giờ cộng dồn A0→B2. Đo lại ở đây thay vì tin bản báo
//    cáo cũ — xem khối "vì sao file này tồn tại" ở đầu.
{
  const { roadmapData, ROADMAP_BANDS, BAC_CAM_KET } = await nap('src/data/roadmapData.js');
  const bac = Array.isArray(roadmapData) ? roadmapData : Object.values(roadmapData);
  const toiDich = ROADMAP_BANDS.slice(0, ROADMAP_BANDS.indexOf(BAC_CAM_KET) + 1);
  const phut = bac.filter((b) => toiDich.includes(b.level))
    .reduce((s, b) => s + (b.milestones || []).reduce((t, m) => t + (m.minutes || 0), 0), 0);
  them('mã', 'Đủ khối lượng nội dung cho cam kết "mất gốc → B2"',
    phut / 60 >= 500, `${(phut / 60).toFixed(0)} giờ cộng dồn A0→B2 (mốc CEFR 500–600)`);
}

// 4. Bốn kỹ năng: đề nói/viết phải phủ các bậc đã mở cửa. Gọi ĐÚNG cửa tra của
//    giao diện — xem khối cảnh báo đầu scripts/kiem_cam_ket.mjs để biết vì sao.
{
  const { roadmapData } = await nap('src/data/roadmapData.js');
  const { deChoChang } = await nap('src/utils/writingBank.js');
  const { deNoiChoChang } = await nap('src/utils/speakingBank.js');
  const { COD_DE_VIET, COD_DE_NOI } = await nap('src/utils/bandCoDe.js');
  const bac = Array.isArray(roadmapData) ? roadmapData : Object.values(roadmapData);
  let hut = 0;
  for (const b of bac) {
    for (const m of b.milestones || []) {
      if (m.type === 'dictation') continue;  // tự nó đã là bài nghe + viết
      if (COD_DE_VIET.has(b.level) && !deChoChang(m)) hut += 1;
      if (COD_DE_NOI.has(b.level) && !deNoiChoChang(m)) hut += 1;
    }
  }
  them('mã', 'Đề nói/đề viết phủ hết chặng ở bậc đã mở cửa',
    hut <= 1, hut <= 1 ? 'phủ 99–100%; 1 ngoại lệ đã biết (Oxford Unit 26 dạy hậu tố)' : `${hut} chặng hụt đề`);
}

// 5. Điều khoản phải nói đúng thứ đang bán. Bán theo hạn mà điều khoản không
//    nhắc gia hạn là chỗ dễ bị khiếu nại nhất.
{
  const dk = doc('src/components/common/PolicyDialog.jsx');
  them('mã', 'Điều khoản nêu rõ gói có hạn và việc gia hạn',
    /gia hạn/i.test(dk) && /1 \/ 6 \/ 12|1\/6\/12/.test(dk),
    dk ? 'PolicyDialog có mục thời hạn + gia hạn' : 'KHÔNG tìm thấy PolicyDialog');
}

// ══════════════════════════════════════════════════════════════════════════
// VIỆC CỦA CHỦ DỰ ÁN
// ══════════════════════════════════════════════════════════════════════════

// 6. Kênh giao mã. Đây là ràng buộc CỨNG: không có kênh thì khối chuyển khoản
//    bị ẩn hẳn, vì mời khách chuyển tiền rồi không có đường giao mã là lấy tiền
//    mà không giao hàng.
{
  const { kenhDatMua } = await nap('src/utils/banHang.js');
  const k = kenhDatMua(env);
  them('chủ', 'Có ít nhất MỘT kênh để khách đặt mua và nhận mã',
    k.length > 0, k.length ? k.map((x) => x.nhan).join(', ') : 'chưa đặt VITE_SALES_URL/ZALO/EMAIL/PHONE');
}

// 7. Thông tin chuyển khoản. Phải có CẢ tên ngân hàng lẫn số tài khoản; một
//    nửa thì app báo chưa có, không hiện nửa dùng không được.
{
  const { thongTinChuyenKhoan } = await nap('src/utils/banHang.js');
  const tt = thongTinChuyenKhoan(env);
  // ⚠️ Hai tên trường ở dòng báo cáo cũ (`tt.nganHang`, `tt.soTaiKhoan`) KHÔNG
  // tồn tại — `thongTinChuyenKhoan` trả `{ten, so, chu, qr}`. Khi đã cấu hình,
  // dòng này in ra "undefined · undefined" mà vẫn chấm ĐẠT, nên không ai thấy.
  // Đúng loại lỗi chỉ lộ ra ở nhánh mà chưa ai chạy tới bao giờ.
  them('chủ', 'Thông tin chuyển khoản đủ để khách trả tiền',
    !!tt, tt ? `${tt.ten} · ${String(tt.so).replace(/.(?=.{3})/g, '•')}` : 'chưa đặt BANK_NAME + BANK_ACCOUNT (biến MÁY CHỦ, không có VITE_)');
}

// 8. Bí mật máy chủ. Không có thì hệ mã truy cập không chạy — khách trả tiền
//    xong không kích hoạt được mã.
{
  const thieu = ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'ACCESS_SESSION_SECRET', 'ACCESS_ADMIN_SECRET']
    .filter((k) => !String(env[k] || '').trim());
  them('chủ', 'Máy chủ có Redis và hai khoá bí mật',
    thieu.length === 0, thieu.length ? `thiếu: ${thieu.join(', ')}` : 'đủ bốn biến');
}

// 9. NƠI ĐẶT WEB — mục dễ bị bỏ quên nhất, và là mục có thể làm hỏng tất cả.
//    Gói Vercel Hobby CẤM dùng cho mục đích thương mại. Mã tốt tới đâu cũng
//    không cứu được việc thu tiền trên một gói cấm thu tiền.
{
  const dat = String(env.NOI_DAT_WEB || '').trim().toLowerCase();
  const HOP_LE = ['vercel-pro', 'cloudflare', 'khac'];
  them('chủ', 'Nơi đặt web CHO PHÉP dùng thương mại',
    HOP_LE.includes(dat),
    dat ? (HOP_LE.includes(dat) ? `đã chọn: ${dat}` : `giá trị lạ: "${dat}"`)
      : 'chưa chọn — đặt NOI_DAT_WEB=vercel-pro | cloudflare | khac sau khi đã chuyển');
}

// ── In kết quả ──────────────────────────────────────────────────────────────
const nhom = (ai) => MUC.filter((m) => m.ai === ai);
const inNhom = (ai, tieu) => {
  console.log(`\n═══ ${tieu} ═══`);
  for (const m of nhom(ai)) {
    console.log(`  ${m.dat ? '✅' : '❌'} ${m.ten}`);
    console.log(`       ${m.chiTiet}`);
  }
};
inNhom('mã', 'VIỆC CỦA MÃ — đỏ thì lập trình viên phải sửa');
inNhom('chủ', 'VIỆC CỦA CHỦ DỰ ÁN — đỏ thì chờ cung cấp, không ai làm hộ được');

const hongMa = nhom('mã').filter((m) => !m.dat);
const hongChu = nhom('chủ').filter((m) => !m.dat);

console.log('\n═══ KẾT LUẬN ═══');
if (!hongMa.length && !hongChu.length) {
  console.log('  ✅ ĐỦ ĐIỀU KIỆN BÁN.');
} else {
  console.log(`  ❌ CHƯA BÁN ĐƯỢC — còn ${hongMa.length + hongChu.length} mục.`);
  if (hongMa.length) console.log(`     · mã:  ${hongMa.map((m) => m.ten).join(' | ')}`);
  if (hongChu.length) console.log(`     · chủ: ${hongChu.map((m) => m.ten).join(' | ')}`);
}
console.log('\n  Lưu ý: file này đọc biến ở MÁY ĐANG CHẠY. Biến VITE_* nhúng LÚC DỰNG,');
console.log('  nên đặt trên bảng điều khiển mà chưa deploy lại thì bản live vẫn cũ.');
console.log('  Muốn biết bản LIVE có gì thật: npm run kiem:banlive — nó tải gói về và');
console.log('  đối chiếu, nên bắt được đúng lỗi "đã đặt biến mà quên deploy lại".');

// ── Cấp mã tự động sau chuyển khoản — TÙY CHỌN, KHÔNG tính vào kết luận trên ──
// Kênh thủ công (mục "Có ít nhất MỘT kênh…") vẫn là điều kiện bắt buộc để bán;
// cái này chỉ là lớp CỘNG THÊM lên trên, xem đầu src/utils/banHang.js. Thiếu
// biến này KHÔNG chặn bán hàng, nên không đưa vào `MUC`/mã thoát — chỉ báo tin.
{
  const dat = !!String(env.PAYMENT_WEBHOOK_SECRET || '').trim();
  console.log(`\n  ${dat ? 'ℹ️' : '·'} Cấp mã tự động sau chuyển khoản (tùy chọn): ${dat ? 'đã đặt PAYMENT_WEBHOOK_SECRET' : 'CHƯA đặt — bán vẫn chạy bình thường qua kênh thủ công ở mục 6'}.`);
}

// Mã thoát để dùng được trong quy trình tự động: 0 = bán được, 1 = mã còn lỗi,
// 2 = mã xong nhưng còn chờ chủ dự án. Ba trạng thái, không gộp — gộp là mất
// đúng thông tin người đọc cần.
process.exit(hongMa.length ? 1 : (hongChu.length ? 2 : 0));
