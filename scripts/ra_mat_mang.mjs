// File: scripts/ra_mat_mang.mjs
//
//   npm run ra:matmang
//
// NGẮT MẠNG GIỮA BUỔI HỌC, RỒI XEM NGƯỜI HỌC CÓ BỊ ĐUỔI RA KHÔNG.
//
// ══ LỖ ĐÃ ĐỌC RA TỪ MÃ NGUỒN ══
// `AccessGate.verify()` bắt lỗi rồi làm:
//
//     if (silent && error.status >= 500) return;
//     setState({ status: 'locked', ... });
//
// Mất mạng ⇒ `fetch` ném ⇒ `requestAccess` gán `error.status = 0` ⇒ `0 >= 500`
// SAI ⇒ rơi thẳng xuống `locked`. Vòng tự kiểm chạy mỗi 15 phút và mỗi lần tab
// được nhìn lại, nên chỉ cần xe chui vào hầm là người học về màn NHẬP MÃ.
//
// ══ BỘ RÀ NÀY ĐO HAI CHIỀU, KHÔNG CHỈ MỘT ══
// Nới cổng cho dễ dùng là cách hỏng dễ nhất ở đây, nên bộ rà phải chứng minh cả
// hai chiều:
//   1. đã soát vé xong rồi mất mạng      → VẪN học được, và có NÓI RA;
//   2. chưa từng soát vé mà mất mạng      → VẪN khoá (paywall còn nguyên);
//
// KHÔNG đo ở đây, và nói thẳng ra: nhánh "máy chủ TỪ CHỐI 401 thì phải khoá
// ngay và XOÁ vé". Bản đầu của bộ rà có một khối cho việc đó nhưng khối ấy
// không khẳng định gì cả (hàm trả lời 401 để rỗng) — một bước rà không đo gì mà
// vẫn nằm đó chỉ làm bộ rà TRÔNG bao quát hơn thực tế. Nhánh đó do
// tests/ve_offline.test.js canh: nó đọc mã nguồn và bắt buộc `boVe()` phải nằm
// trong nhánh KHÔNG-phải-lỗi-mạng.
//
// ══ CÁCH GIẢ LẬP, VÀ MỘT PHÉP ĐO ĐÃ TỰ LỪA MÌNH MỘT LẦN ══
// `moTab({ chanApi: true })` — mặc định — chặn `/api/access` và trả lời "đã
// kích hoạt", tức dựng lại trạng thái KHÁCH ĐÃ MUA.
//
// ⚠️ BẢN ĐẦU CỦA BỘ RÀ NÀY NGẮT MẠNG BẰNG `Network.emulateNetworkConditions
// { offline: true }` VÀ ĐO SAI CẢ HAI KHỐI. Lệnh đó ngắt ở TẦNG MẠNG, còn
// `Fetch.enable` chặn ở `requestStage: Request` — TRƯỚC tầng mạng. Nên
// `/api/access` vẫn được bộ giả lập trả lời "đã kích hoạt" bình thường: cổng
// chưa hề thất bại lần nào, không vé nào được dùng, không huy hiệu ngoại tuyến
// nào để thấy. Kết quả là 6/8 với hai bước "hỏng" HOÀN TOÀN GIẢ, mà nếu đọc
// vội thì bước "KHÔNG CÓ VÉ + mất mạng: VẪN KHOÁ" hỏng trông y hệt một lỗ hổng
// paywall thật sự. Dấu vết nhận ra: `dangHoc` đúng mà `noiOffline` sai — chạy
// được nhưng không đang ngoại tuyến, tức cú mất mạng chưa từng xảy ra.
//
// Nên ở đây ngắt bằng công tắc `matMang` của helper (`Fetch.failRequest` +
// `ConnectionFailed`, đúng thứ làm `fetch` NÉM), và mỗi khối đều KHẲNG ĐỊNH số
// lượt bị ngắt đã tăng. Không có phép đếm ấy thì một bước xanh vì "chẳng ai gọi
// API cả" trông y hệt một bước xanh vì bản vá chạy đúng.
//
// Bẫy thứ hai đã tránh: vòng tự kiểm bỏ qua khi `document.visibilityState !==
// 'visible'`, mà tab mở bằng `/json/new` có thể đang ẩn. Nên gọi
// `Page.bringToFront` rồi KHẲNG ĐỊNH tab thật sự hiện, thay vì bắn
// `visibilitychange` vào chỗ không ai nghe.

import { moTrinhDuyet, moTab } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

const may = await moMayChuXemTruoc({ cong: 4351 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9365 });

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

// ⚠️ ĐỌC MÀN HÌNH BẰNG MỐC CẤU TRÚC, KHÔNG BẰNG CHỮ CHUNG CHUNG.
// Bản đầu đặt `dangHoc: t.includes('Lộ trình')`. Nhưng CHÍNH MÀN KHOÁ in ra
// "Lộ trình từ mất gốc (A0) đến B2" trong danh sách quyền lợi
// (AccessGate.jsx:169), nên `dangHoc` LUÔN đúng — kể cả khi cổng đã khoá hoàn
// hảo. Bước "KHÔNG CÓ VÉ + mất mạng: VẪN KHOÁ" vì thế báo hỏng và đọc y hệt một
// lỗ hổng paywall thật sự, trong khi mã nguồn hoàn toàn đúng.
//
// Hai mốc dưới đây duy nhất và LOẠI TRỪ NHAU:
//   · `nav[aria-label="Điều hướng nhanh"]` chỉ do MainLayout vẽ, tức app thật;
//   · chữ "Nhập mã truy cập" chỉ có trong AccessGate.
// Chúng loại trừ nhau nên bộ rà tự kiểm được điều đó — xem `ghi('hai mốc...')`.
const DOC_MAN = `(() => {
  const t = document.body.innerText || '';
  return {
    conKhoa: t.includes('Nhập mã truy cập'),
    dangHoc: !!document.querySelector('nav[aria-label="Điều hướng nhanh"]'),
    noiOffline: t.includes('Ngoại tuyến') || t.includes('rồi cần vào mạng'),
    coVe: (() => { try { return !!localStorage.getItem('bunnyVeOfflineV1'); } catch { return false; } })(),
  };
})()`;

/** Hai mốc phải loại trừ nhau; cùng đúng hoặc cùng sai là phép đo hỏng. */
const mocLanhManh = (m) => m.conKhoa !== m.dangHoc;

// Ngắt CẢ HAI tầng: công tắc `matMang` lo `/api/*` (thứ duy nhất quyết định
// cổng), còn lệnh dưới lo mọi request còn lại cho giống ngoài đời.
const ngat = async (t, cong_tac, tat) => {
  cong_tac.bat = tat;
  await t.goi('Network.emulateNetworkConditions', {
    offline: tat, latency: 0, downloadThroughput: -1, uploadThroughput: -1,
  });
};

/** Ép tab hiện lên rồi bắn đúng sự kiện AccessGate lắng nghe. Trả về có hiện không. */
const danhThuc = async (t) => {
  try { await t.goi('Page.bringToFront'); } catch { /* một số bản không có */ }
  await t.danhGia("document.dispatchEvent(new Event('visibilitychange')); true");
  return t.danhGia("document.visibilityState === 'visible'");
};

try {
  // ── 1. ĐÃ SOÁT VÉ RỒI MẤT MẠNG ─────────────────────────────────────────────
  {
    const matMang = { bat: false, dem: 0 };
    const t = await moTab(cong, { matMang });
    await t.diToi(`${may.BASE}/`);
    await nghi(3000);
    const truoc = await t.danhGia(DOC_MAN);
    ghi('vào được app khi còn mạng', truoc.dangHoc === true && truoc.conKhoa === false);
    ghi('soát vé xong thì CÓ cất vé lại', truoc.coVe === true,
      truoc.coVe ? '' : 'không thấy vé — nhánh cất vé chưa chạy, mọi bước sau vô nghĩa');

    await ngat(t, matMang, true);
    // Ép vòng tự kiểm chạy ngay thay vì chờ 15 phút: gửi đúng sự kiện mà
    // AccessGate lắng nghe khi người học quay lại tab.
    const hien = await danhThuc(t);
    ghi('tab thật sự HIỆN để vòng tự kiểm chịu chạy', hien === true,
      hien ? '' : 'tab đang ẩn — AccessGate bỏ qua visibilitychange, mọi bước dưới vô nghĩa');
    await nghi(2500);
    const ngatAccess = (matMang.duong || []).filter((u) => u.includes('/api/access'));
    ghi('cú mất mạng CÓ THẬT xảy ra (/api/access bị ngắt)', ngatAccess.length > 0,
      ngatAccess.length > 0 ? `${ngatAccess.length} lượt /api/access bị ngắt` :'không lượt /api nào bị ngắt — cổng chưa hề thất bại, bước dưới sẽ xanh vì không có gì xảy ra');
    const sau = await t.danhGia(DOC_MAN);
    ghi('hai mốc đọc màn hình loại trừ nhau', mocLanhManh(sau),
      mocLanhManh(sau) ? '' : `conKhoa=${sau.conKhoa} dangHoc=${sau.dangHoc} — mốc không phân biệt được hai màn, mọi kết luận dưới vô giá trị`);
    ghi('MẤT MẠNG: không bị ném về màn nhập mã', sau.conKhoa === false,
      sau.conKhoa ? 'đã bị đuổi ra — đúng lỗi đợt này đi sửa' : '');
    ghi('MẤT MẠNG: vẫn học tiếp được', sau.dangHoc === true);
    ghi('MẤT MẠNG: có NÓI RA là đang chạy ngoại tuyến', sau.noiOffline === true,
      sau.noiOffline ? '' : 'chạy được nhưng im lặng — người học sẽ bị khoá ở ngày thứ 8 mà không hiểu vì sao');
    await ngat(t, matMang, false);
    t.dong();
  }

  // ── 2. KHÔNG CÓ VÉ MÀ MẤT MẠNG → PHẢI VẪN KHOÁ ────────────────────────────
  // Phép canh CHIỀU NGƯỢC. Không có nó thì bản vá này chỉ là "gỡ cổng đi".
  //
  // ⚠️ BẪY ĐÃ TRÁNH: bản đầu của bước này điều hướng tới trang KHI ĐANG NGẮT
  // MẠNG. Nếu service worker chưa kịp cất vỏ app thì trang không nạp nổi, màn
  // hình rỗng, và "không thấy chữ Lộ trình" thành ĐẠT vì một lý do hoàn toàn
  // khác — một bước rà xanh nhờ chính nó hỏng. Nên ở đây nạp trang KHI CÒN
  // MẠNG, xoá vé, rồi mới ngắt, và bắt buộc khẳng định trang có thật sự nạp.
  {
    const matMang = { bat: false, dem: 0 };
    const t = await moTab(cong, { matMang });
    await t.diToi(`${may.BASE}/`);
    await nghi(3000);
    const coChu = await t.danhGia('(document.body.innerText || "").length > 100');
    ghi('trang vẫn nạp được để bước này có nghĩa', coChu === true,
      coChu ? '' : 'màn hình rỗng — bước dưới sẽ ĐẠT vì trang không nạp, không phải vì cổng khoá');
    await t.danhGia("try { localStorage.removeItem('bunnyVeOfflineV1'); } catch {} ; true");
    await ngat(t, matMang, true);
    await danhThuc(t);
    await nghi(2500);
    const ngatAccess = (matMang.duong || []).filter((u) => u.includes('/api/access'));
    ghi('cú mất mạng CÓ THẬT xảy ra (/api/access bị ngắt)', ngatAccess.length > 0,
      ngatAccess.length > 0 ? `${ngatAccess.length} lượt /api/access bị ngắt` :'không lượt /api nào bị ngắt — cổng chưa hề thất bại, nên "vẫn vào được" KHÔNG phải là lỗ hổng, chỉ là phép đo hỏng');
    const m = await t.danhGia(DOC_MAN);
    ghi('hai mốc đọc màn hình loại trừ nhau', mocLanhManh(m),
      mocLanhManh(m) ? '' : `conKhoa=${m.conKhoa} dangHoc=${m.dangHoc} — mốc không phân biệt được hai màn, mọi kết luận dưới vô giá trị`);
    ghi('KHÔNG CÓ VÉ + mất mạng: VẪN KHOÁ', m.conKhoa === true && m.dangHoc === false,
      m.dangHoc ? 'vẫn vào được app dù không có vé — bản vá đang là một lỗ hổng' : '');
    ghi('không có vé thì KHÔNG được khai là "Ngoại tuyến"', m.noiOffline === false,
      m.noiOffline ? 'đang khai chạy bằng vé trong khi không có vé nào' : '');
    await ngat(t, matMang, false);
    t.dong();
  }

} catch (e) {
  ghi('bộ rà chạy hết không vấp', false, String(e?.message || e));
} finally {
  const dat = ket.filter((k) => k.ok).length;
  console.log(`\nbước đạt: ${dat}/${ket.length}`);
  const hong = ket.filter((k) => !k.ok);
  if (hong.length) console.log('CÁC BƯỚC HỎNG:\n' + hong.map((k) => `  · ${k.buoc}${k.chiTiet ? ' :: ' + k.chiTiet : ''}`).join('\n'));
  tienTrinh.kill();
  may.dong();
  process.exit(dat === ket.length ? 0 : 1);
}
