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

  // ── 4. BỐ CỤC KHI CHẠY NHƯ MỘT APP ĐÃ CÀI ─────────────────────────────────
  // Bản cài mở ở chế độ standalone: không thanh địa chỉ. Nếu bố cục chỉ đúng khi
  // có thanh địa chỉ thì người cài app vào máy sẽ thấy một giao diện khác.
  await t.goi('Emulation.setEmulatedMedia', {
    features: [{ name: 'display-mode', value: 'standalone' }],
  });
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
  ghi('chế độ standalone: thanh điều hướng dưới vẫn có', dung && dung.coNav === true);
  ghi('thanh điều hướng bám đúng đáy màn', dung && dung.chamDay === true,
    dung ? `cao ${dung.cao}px` : '');
  ghi('không có gì tràn ngang ở bề ngang điện thoại', dung && dung.tranRa === false);

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
