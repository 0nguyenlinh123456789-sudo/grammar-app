// File: scripts/ra_cai_dat.mjs
//
//   npm run ra:caidat
//
// APP CÓ ĐỦ ĐIỀU KIỆN CÀI VÀO MÁY KHÔNG, VÀ NÚT TẢI CÓ PHẢI NÚT THẬT KHÔNG.
//
// ══ ĐO GÌ, VÀ KHÔNG ĐO GÌ ══
// ĐO được ở đây:
//   · `Page.getAppManifest` — Chrome THẬT phân tích manifest, báo lỗi cú pháp
//     và trả về danh sách icon nó thật sự chấp nhận;
//   · panel tải hiện ra và NÓI ĐÚNG dung lượng (chứ không phải một khung rỗng);
//   · bấm nút → tải chạy → xong. Đây là phần quan trọng nhất: cả đường ngoại
//     tuyến ở `d54e936` chỉ có nghĩa nếu người học chạm tới được nó.
//
// KHÔNG đo được, và nói thẳng:
//   · `beforeinstallprompt` gần như không bắn trong Chrome headless. Một bước
//     rà đòi "nút cài hiện ra" sẽ đỏ vì lý do của môi trường đo, và cách "sửa"
//     duy nhất là làm yếu sản phẩm đi. Nên không có bước đó ở đây.
//   · Bản cài thật trông thế nào, và safe-area trên iPhone có đúng không — cần
//     một bản đẩy và một chiếc điện thoại thật. `tests/cai_dat_app.test.js`
//     ghim các ĐIỀU KIỆN CẦN; phần còn lại phải thử tay.

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

const may = await moMayChuXemTruoc({ cong: 4357 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9373 });

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

try {
  const t = await moTab(cong);
  await t.diToi(`${may.BASE}/`);
  await nghi(3500);

  // ── 1. CHROME THẬT ĐỌC ĐƯỢC MANIFEST ──────────────────────────────────────
  const mf = await t.goi('Page.getAppManifest');
  const loiMf = mf.errors || [];
  ghi('Chrome phân tích manifest không lỗi', loiMf.length === 0,
    loiMf.length ? JSON.stringify(loiMf.slice(0, 3)) : '');
  const dl = mf.data ? JSON.parse(mf.data) : null;
  ghi('manifest có icon 192 + 512 + maskable, và KHÔNG có SVG maskable',
    !!dl && ['192x192', '512x512'].every((s) => dl.icons.some((i) => i.sizes === s))
      && dl.icons.some((i) => (i.purpose || '').includes('maskable') && /\.png$/i.test(i.src))
      && !dl.icons.some((i) => (i.purpose || '').includes('maskable') && /\.svg$/i.test(i.src)),
    dl ? dl.icons.map((i) => `${i.src}|${i.sizes}|${i.purpose || 'any'}`).join(' ') : 'không đọc được');

  // ── 2. PANEL TẢI CÓ HIỆN VÀ NÓI ĐÚNG DUNG LƯỢNG ───────────────────────────
  const panel = await t.danhGia(`(() => {
    const el = document.querySelector('section[aria-label="Tải bài về máy"]');
    if (!el) return { co: false };
    const chu = el.innerText || '';
    return { co: true, chu, coSoMB: /\\d+[.,]\\d+ MB/.test(chu), soHop: el.querySelectorAll('input[type=checkbox]').length };
  })()`);
  ghi('panel tải bài về máy có hiện', panel && panel.co === true,
    panel && panel.co ? '' : 'không tìm thấy panel — cả đường ngoại tuyến người học không chạm tới được');
  ghi('panel NÓI ĐÚNG dung lượng trước khi bấm', panel && panel.coSoMB === true,
    panel && panel.chu ? panel.chu.replace(/\n/g, ' · ').slice(0, 120) : '');
  ghi('có đủ ba nhóm để mạng yếu tải riêng phần nhỏ', panel && panel.soHop === 3,
    panel ? `${panel.soHop} ô chọn` : '');

  // ── 3. BẤM NÚT THẬT — ĐÂY LÀ BƯỚC QUAN TRỌNG NHẤT ─────────────────────────
  // "Nút không làm gì cả" là họ lỗi đã vá ở fc1b31b và phải không bao giờ quay
  // lại. Panel hiện ra mà bấm không chạy thì tệ hơn là không có panel.
  const bam = await t.danhGia(BAM_THEO_CHU('Tải'));
  ghi('bấm được nút tải', bam === true);

  let xong = null;
  for (let i = 0; i < 90; i += 1) {
    await nghi(1000);
    xong = await t.danhGia(`(() => {
      const el = document.querySelector('section[aria-label="Tải bài về máy"]');
      const chu = el ? (el.innerText || '') : '';
      return { chu, dangTai: /\\d+\\/\\d+ tệp/.test(chu), xong: chu.includes('Xong.') || chu.includes('Đã có') };
    })()`);
    if (xong && xong.xong) break;
  }
  ghi('tải chạy tới nơi và BÁO XONG', !!xong && xong.xong === true,
    xong ? xong.chu.replace(/\n/g, ' · ').slice(0, 140) : 'hết giờ chờ');

  const trongKho = await t.danhGia(`(async () => {
    const k = await caches.open('bunny-english-offline-v1');
    return (await k.keys()).length;
  })()`);
  ghi('kho tải có tệp thật sau khi bấm', Number(trongKho) > 50, `${trongKho} tệp`);

  // ── 3b. NHÁNH iOS: CÓ CHỈ DẪN, VÀ KHÔNG CÓ NÚT GIẢ ────────────────────────
  // iOS Safari KHÔNG BAO GIỜ bắn `beforeinstallprompt`. Nếu app chỉ có nhánh
  // Chromium thì trên iPhone người học không có cách nào cài — mà iPhone đúng là
  // chiếc máy chủ web sẽ thử đầu tiên. Cái này ĐO ĐƯỢC (giả lập User-Agent),
  // khác hẳn `beforeinstallprompt` vốn không bắn trong Chrome headless.
  await t.goi('Network.setUserAgentOverride', {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    platform: 'iPhone',
  });
  await t.goi('Page.reload');
  await nghi(4000);
  const ios = await t.danhGia(`(() => {
    const el = document.querySelector('section[aria-label="Cài app vào máy"]');
    if (!el) return { co: false };
    return {
      co: true,
      coChiDan: (el.innerText || '').includes('Thêm vào MH chính'),
      soNut: el.querySelectorAll('button').length,
    };
  })()`);
  ghi('iPhone: có panel hướng dẫn cài', ios && ios.co === true,
    ios && ios.co ? '' : 'trên iPhone không có cách nào cài — nhánh Chromium không bao giờ chạy ở đó');
  ghi('iPhone: chỉ dẫn đúng đường Chia sẻ → Thêm vào MH chính', ios && ios.coChiDan === true);
  ghi('iPhone: KHÔNG có nút giả nào trong panel', ios && ios.soNut === 0,
    ios && ios.soNut ? `${ios.soNut} nút — iOS không có prompt(), bấm sẽ không ra gì` : '');

  // ── 4. BỐ CỤC Ở BỀ NGANG ĐIỆN THOẠI ───────────────────────────────────────
  //
  // ⚠️ ĐÃ ĐO VÀ ĐÃ SỬA NHÃN: bản đầu của khối này gọi `Emulation.setEmulatedMedia`
  // với `display-mode: standalone` rồi đặt tên các bước là "chế độ standalone".
  // Đo thẳng ra thì lệnh đó KHÔNG tới được `matchMedia('(display-mode:
  // standalone)')` — nó vẫn trả `false`, và `(display-mode: browser)` vẫn `true`,
  // kể cả sau khi tải lại trang. Nghĩa là ba bước đó đo bố cục ở chế độ TRÌNH
  // DUYỆT, chỉ hẹp 390px, mà lại tự nhận là đo bản đã cài.
  //
  // Phép đo vẫn có giá trị — bề ngang điện thoại là thứ đáng canh — nên giữ lại
  // và GỌI ĐÚNG TÊN nó. Chế độ standalone thật sự thì đo ở bước dưới, bằng
  // `navigator.standalone` (đường iOS), thứ giả lập được thật.
  await t.goi('Emulation.setDeviceMetricsOverride', {
    width: 390, height: 844, deviceScaleFactor: 3, mobile: true,
  });
  await nghi(1200);
  const dung = await t.danhGia(`(() => {
    const nav = document.querySelector('nav[aria-label="Điều hướng nhanh"]');
    if (!nav) return { coNav: false };
    const r = nav.getBoundingClientRect();
    return {
      coNav: true,
      chamDay: Math.abs(r.bottom - innerHeight) < 2,
      cao: Math.round(r.height),
      tranRa: r.right > innerWidth + 1 || r.left < -1,
    };
  })()`);
  ghi('bề ngang 390px: thanh điều hướng dưới vẫn có', dung && dung.coNav === true);
  ghi('thanh điều hướng bám đúng đáy màn', dung && dung.chamDay === true,
    dung ? `cao ${dung.cao}px` : '');
  ghi('không có gì tràn ngang ở bề ngang điện thoại', dung && dung.tranRa === false);

  // ── 5. ĐÃ CÀI RỒI THÌ KHÔNG MỜI CÀI NỮA ───────────────────────────────────
  // Mời cài một app đang chạy dưới dạng app là nói sai với người dùng.
  //
  // Đo bằng `navigator.standalone` chứ KHÔNG bằng `display-mode`: đã đo thẳng và
  // `Emulation.setEmulatedMedia` không tới được `matchMedia` (xem khối 4). Còn
  // `navigator.standalone` thì tiêm được, và nó đúng là cờ iOS thật dùng để báo
  // "đang chạy từ màn hình chính" — User-Agent ở đây vẫn đang là iPhone, nên
  // bước này dựng lại đúng một trạng thái có thật.
  await t.goi('Page.addScriptToEvaluateOnNewDocument', {
    source: 'Object.defineProperty(navigator, "standalone", { get: () => true, configurable: true });',
  });
  await t.goi('Page.reload');
  await nghi(4000);
  const daCai = await t.danhGia(`(() => ({
    coCo: navigator.standalone === true,
    conMoi: !!document.querySelector('section[aria-label="Cài app vào máy"]'),
  }))()`);
  ghi('giả lập được trạng thái ĐÃ CÀI', daCai && daCai.coCo === true,
    daCai && daCai.coCo ? '' : 'không tiêm được navigator.standalone — bước dưới sẽ xanh vì trạng thái chưa hề đổi');
  ghi('đã cài rồi thì KHÔNG mời cài nữa', daCai && daCai.conMoi === false,
    daCai && daCai.conMoi ? 'vẫn mời cài một app đang chạy dưới dạng app' : '');

  t.dong();
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
