// GHIM BA SỐ ĐO ĐƯỢC CỦA GIAO DIỆN ĐIỆN THOẠI (07/09).
//
// Cả ba đều là thứ KHÔNG test nào đang có bắt được, không làm lint đỏ, không
// gây lỗi console, và chỉ thấy khi mở đúng một màn hình ở đúng một bề rộng.
// Số đo lấy ở 390×844 (iPhone 14/15), là khổ phổ biến nhất của người học.
//
//   1. CÀI ĐẶT ĐỨNG TRÊN NÚT HỌC. Đo được, cả hồ sơ mới lẫn hồ sơ đã học:
//          y=297–495  Tiến Độ & XP · Chuỗi Học Tập
//          y=496–696  CHẾ ĐỘ TỐI · RESET LỘ TRÌNH · SAO LƯU   ← 200px cài đặt
//          y=720–815  HỌC 15 PHÚT HÔM NAY  ← thanh tab dưới cắt ở 786
//      Tức màn hình đầu bày CÀI ĐẶT trước thứ người ta mở app ra để làm, và
//      nút chính thì cụt chân. Sau khi gấp: nút lên y=568, HIỆN ĐỦ.
//
//   2. CÂU DÀI NHỒI TRONG Ô LƯỚI. Nút "I WANT to BUY a BOOK for my BROther."
//      ra 97×174px — mảnh dọc cao gấp đôi bề ngang. Sau khi sửa: 310×74.
//
//   3. Ô BẤM DƯỚI ~44px. Sửa đúng bốn chỗ: hai cái đợt trước tôi tạo ra, một
//      nút ĐĂNG XUẤT, và liên kết chính sách hoàn tiền. KHÔNG quét sửa hết:
//      xem chú thích ở bài kiểm cuối.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { foundationData } from '../src/data/foundationData.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

test('cột cài đặt trang chủ gấp lại trên màn hẹp, mở sẵn từ lg', () => {
  const s = doc('src/pages/WelcomePage.jsx');
  assert.match(s, /const \[moCaiDat, setMoCaiDat\] = useState\(/,
    'không còn trạng thái gấp/mở — cài đặt lại đẩy nút học xuống dưới nếp gấp');
  assert.match(s, /matchMedia\('\(min-width: 1024px\)'\)/,
    'phải mở SẴN từ lg: ở khổ đó hai cột nằm cạnh nhau, gấp lại là làm máy tính bàn tệ đi vì một lỗi của điện thoại');
  assert.match(s, /aria-expanded=\{moCaiDat\}/, 'nút gấp/mở không khai trạng thái cho trình đọc màn hình');
  assert.match(s, /id="cai-dat-trang-chu"/, 'thiếu vùng được aria-controls trỏ tới');
  // Nút gấp chỉ hiện dưới lg; thân luôn hiện từ lg.
  assert.match(s, /lg:hidden[^"]*"\s*\n?\s*>\s*\n?\s*<Settings/,
    'nút gấp phải là lg:hidden — máy tính bàn không cần nó');
  assert.match(s, /\$\{moCaiDat \? 'flex' : 'hidden'\} lg:flex/,
    'thân cài đặt phải luôn hiện từ lg trở lên');
});

test('reset lộ trình không còn là nút nổi bật thứ hai trên màn hình đầu', () => {
  // Đây là thao tác XOÁ. Trước đợt này nó đứng ngay dưới CHẾ ĐỘ TỐI ở y=572,
  // trên cả nút học. Nay nó nằm trong cụm gấp — vẫn tới được bằng một chạm.
  const s = doc('src/pages/WelcomePage.jsx');
  const i = s.indexOf('id="cai-dat-trang-chu"');
  const j = s.indexOf('backupMessage &&', i);
  assert.ok(i > 0 && j > i, 'không xác định được phạm vi cụm cài đặt');
  const trong = s.slice(i, j);
  for (const nhan of ['RESET LỘ TRÌNH', 'SAO LƯU', 'KHÔI PHỤC']) {
    assert.ok(trong.includes(nhan), `"${nhan}" nằm ngoài cụm gấp — nó lại chiếm chỗ màn hình đầu`);
  }
});

test('bài nói CẢ CÂU khai `dang: cum` và panel vẽ thành hàng ngang', () => {
  for (const id of ['a0_10', 'a0_11']) {
    const t = foundationData.find((x) => x.id === id);
    assert.equal(t.nghe.dang, 'cum',
      `${id}: mỗi mục là một cụm/câu, thiếu cờ này là quay lại ô lưới 97px`);
  }
  // Bài từ đơn KHÔNG được mang cờ này — hàng ngang cho 26 chữ cái là 26 hàng.
  for (const id of ['a0_01', 'a0_03', 'a0_05']) {
    assert.notEqual(foundationData.find((x) => x.id === id).nghe.dang, 'cum');
  }

  const s = doc('src/components/grammar/NghePhatAm.jsx');
  assert.match(s, /const laCum = nghe\?\.dang === 'cum';/,
    'giao diện phải đọc CỜ KHAI RA, không được đoán theo độ dài chuỗi hay theo việc thiếu ipa — cả hai chỉ là trùng hợp của dữ liệu hiện tại');
  assert.match(s, /laCum\s*\n?\s*\? 'mt-2 flex flex-col gap-2\.5'/,
    'nhánh cụm không đổi sang xếp dọc — câu vẫn bị nhồi vào cột lưới');
});

test('ô bấm đã sửa đều đạt ~44px', () => {
  const mong = [
    ['src/components/grammar/NghePhatAm.jsx', /min-h-11 px-4 py-2 rounded-xl border-\[3px\]/,
      'nút chọn cụm chấm (đo 34px) — chính tôi thêm ở đợt trước'],
    ['src/components/access/AccessGate.jsx', /w-11 h-11 rounded-lg bg-slate-800/,
      'nút đăng xuất (đo 32px) — ô vuông trần, ca khó chạm nhất'],
    ['src/components/common/TaiOffline.jsx', /w-full min-h-11 flex items-center gap-2/,
      'nút gấp/mở panel tải (đo 17px) — chính tôi thêm ở đợt offline'],
    ['src/layouts/MainLayout.jsx', /min-h-11 flex items-center justify-center text-\[11px\] font-bold text-slate-400/,
      'liên kết Điều khoản · Hoàn tiền (đo 21px)'],
  ];
  for (const [tep, re, vi] of mong) {
    assert.match(doc(tep), re, `${vi} — đã tụt lại dưới 44px`);
  }
});

test('KHÔNG quét sửa mọi ô bấm nhỏ — và đây là lý do', () => {
  // Cặp "🗣️ NÓI / ✍️ VIẾT VỀ CHẶNG NÀY" đo được 33px, tức DƯỚI mức khuyến
  // nghị. Cố ý để nguyên: chúng lặp theo TỪNG CHẶNG trên một trang đã dài
  // 71.000px (84 màn ở 390×844). Cộng ~11px mỗi cái là phình thêm hàng nghìn
  // pixel cho một trang vốn đã quá dài, đổi lấy một cái lợi CHƯA ĐO ĐƯỢC —
  // chưa có bằng chứng nào về việc chạm trượt ở đây.
  //
  // Bài kiểm này ghi lại quyết định đó để lần sau không ai "sửa nốt cho đều"
  // mà không biết vì sao nó bị bỏ lại. Muốn đổi thì đo trước: đếm lượt chạm
  // trượt, hoặc đo lại chiều cao trang sau khi nới.
  const s = doc('src/pages/WelcomePage.jsx');
  assert.match(s, /NÓI VỀ CHẶNG NÀY/, 'nhãn đổi rồi thì đọc lại chú thích trên và quyết lại');
  assert.match(s, /px-3 py-1\.5 rounded-xl/,
    'cặp nút theo chặng đã bị nới — nếu là cố ý thì cập nhật bài kiểm này kèm phép đo chiều cao trang mới');
});

test('nới ô bấm KHÔNG được kéo điều khiển vào tầm ngắm của bộ quét nội dung', () => {
  // Lỗi thật, do chính đợt này gây ra và chỉ lộ khi ĐỌC TÊN BƯỚC chứ không đọc
  // con số: sweep vẫn 22/22 nhưng bước "GAMES: mở được và vào một trò" báo
  //     đã vào: "Điều khoản · Bảo mật · Hoàn tiền"
  // `BAM_NOI_DUNG` lọc nút theo `height > 24`. Nút chính sách cao 21px nên xưa
  // nay bị loại NHỜ NÓ QUÁ NHỎ — một lưới an toàn tình cờ. Nới lên 44px cho dễ
  // chạm là gỡ luôn lưới đó.
  //
  // Đúng họ với lỗi nút "Tải 11.9 MB về máy" cướp bước GAMES trước đây, và cách
  // sửa cũng là cách đã chốt khi đó: ranh giới là VAI TRÒ, khai bằng
  // `data-cong-cu`, không phải danh sách cấm viết tay.
  const s = doc('src/layouts/MainLayout.jsx');
  // ⚠️ `lastIndexOf`, KHÔNG phải `indexOf`: chuỗi này còn xuất hiện trong một
  // CHÚ THÍCH ở đầu tệp (giải thích vì sao đáy ngăn kéo bị thanh địa chỉ che).
  // `indexOf` bắt trúng chú thích đó và bài kiểm đỏ trên chính bản đã vá —
  // đúng cái bẫy "phép đo đọc trúng chú thích" đã ghi trong sổ.
  const i = s.lastIndexOf('Điều khoản · Bảo mật · Hoàn tiền');
  assert.ok(i > 0, 'không còn liên kết chính sách');
  const quanh = s.slice(Math.max(0, i - 1600), i);
  assert.match(quanh, /data-cong-cu="chinh-sach"/,
    'nút chính sách cao ≥ 24px mà không khai là công cụ — bộ quét sẽ bấm nó thay vì bấm nội dung, và vẫn báo ĐẠT');

  // Bộ quét phải còn dùng luật khai-vai-trò, không chuyển sang danh sách cấm.
  const q = doc('scripts/khach_dung_het.mjs');
  assert.match(q, /const laCongCu = \(e\) => !!e\.closest\('\[data-cong-cu\]'\);/,
    'bộ quét bỏ luật data-cong-cu — công cụ thêm sau sẽ lại cướp bước đo');
});
