// File: scripts/ra_tai_offline.mjs
//
//   npm run ra:taioffline
//
// TẢI GÓI HỌC VỀ MÁY, RỒI TẮT HẲN MÁY CHỦ, RỒI XEM CÓ HỌC ĐƯỢC THẬT KHÔNG.
//
// ══ BA BẪY ĐO LƯỜNG ĐÃ DÍNH TRONG NGÀY, ĐƯỢC XÂY THẲNG VÀO ĐÂY ══
//
// 1. `Network.emulateNetworkConditions { offline: true }` KHÔNG ngắt được service
//    worker. SW là một TARGET RIÊNG của CDP; lệnh ngắt gắn vào target của TRANG
//    không áp lên nó, nên SW vẫn `fetch` ra mạng thật và mọi bước "ngoại tuyến"
//    xanh vì chưa hề ngoại tuyến. Đã đo và đã dính. Nên ở đây ngắt bằng cách
//    TẮT HẲN MÁY CHỦ — không tầng nào thoát được, không lệ thuộc target.
//
// 2. Chrome chặn `audio.play()` không có thao tác người dùng bằng
//    `NotAllowedError`, và `muted = true` KHÔNG miễn cho phần tử chỉ có tiếng.
//    Thiếu cờ `choPhatTuDong` thì một lệnh chặn của trình duyệt bị đọc thành
//    "kho ngoại tuyến hỏng". Ngoài đời không cần cờ: người học BẤM nút nghe.
//
// 3. Một tệp còn nằm trong kho HTTP của Chrome sẽ phát được BẤT KỂ service
//    worker. Nên phải `Network.clearBrowserCache` trước khi tắt máy chủ, và
//    phải khẳng định một tệp KHÔNG nằm trong gói tải thì xin phải HỎNG — đó là
//    bằng chứng cú mất mạng có thật.

import { moTrinhDuyet, moTab } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

const may = await moMayChuXemTruoc({ cong: 4355 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9369, choPhatTuDong: true });

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

let daTatMayChu = false;
const tatMayChu = () => { if (!daTatMayChu) { daTatMayChu = true; may.dong(); } };

try {
  const t = await moTab(cong);
  await t.diToi(`${may.BASE}/`);
  await nghi(3500);

  const dieuKhien = await t.danhGia('!!navigator.serviceWorker.controller');
  ghi('service worker ĐANG điều khiển trang', dieuKhien === true,
    dieuKhien ? '' : 'SW chưa nắm trang — mọi bước dưới đo nhầm thứ khác');

  // ── 1. DANH SÁCH TẢI PHẢI CÓ THẬT VÀ NÓI ĐÚNG DUNG LƯỢNG ──────────────────
  const mf = await t.danhGia(`(async () => {
    const r = await fetch('/offline-manifest.json');
    if (!r.ok) return { ok: false, ma: r.status };
    const m = await r.json();
    return {
      ok: true,
      tongMB: +(m.tongByte / 1024 / 1024).toFixed(1),
      nhom: Object.keys(m.nhom),
      soTep: Object.values(m.nhom).reduce((s, n) => s + n.soTep, 0),
      coIelts: JSON.stringify(m.nhom).toLowerCase().includes('ielts'),
    };
  })()`);
  ghi('có danh sách tải kèm dung lượng thật', mf && mf.ok === true && mf.tongMB > 1,
    JSON.stringify(mf));
  ghi('danh sách tải KHÔNG chứa mục IELTS', mf && mf.coIelts === false,
    mf && mf.coIelts ? 'dist/ielts-foundation nặng 30 GB và nằm trong luật KHÔNG ĐỘNG TỚI' : '');

  // ── 2. TẢI GÓI, VÀ PHẢI BÁO TIẾN ĐỘ CHỨ KHÔNG IM ──────────────────────────
  const tai = await t.danhGia(`(async () => {
    const m = await (await fetch('/offline-manifest.json')).json();
    const ds = Object.values(m.nhom).flatMap((n) => n.tep.map((t) => t.d));
    const moc = [];
    return await new Promise((xong) => {
      const nghe = (ev) => {
        const d = ev.data || {};
        if (d.loai === 'TIEN_DO_OFFLINE') moc.push(d.xong);
        if (d.loai === 'XONG_OFFLINE') {
          navigator.serviceWorker.removeEventListener('message', nghe);
          xong({ xong: d.xong, tong: d.tong, hong: d.hong, hongDau: d.hongDau, soMoc: moc.length });
        }
        if (d.loai === 'LOI_OFFLINE') { xong({ loi: d.loi }); }
      };
      navigator.serviceWorker.addEventListener('message', nghe);
      navigator.serviceWorker.controller.postMessage({ loai: 'TAI_OFFLINE', danhSach: ds });
      setTimeout(() => xong({ hetGio: true, soMoc: moc.length }), 120000);
    });
  })()`);
  ghi('tải xong cả gói, không tệp nào hỏng', tai && tai.hong === 0 && tai.xong === tai.tong,
    JSON.stringify(tai));
  ghi('có BÁO TIẾN ĐỘ chứ không im lặng quay vòng', tai && tai.soMoc > 10,
    tai && tai.soMoc > 10 ? `${tai.soMoc} lần báo` : 'người học sẽ nhìn một vòng xoay câm trong 17,5 MB');

  // ── 3. NGẮT THẬT: DỌN KHO HTTP RỒI TẮT HẲN MÁY CHỦ ────────────────────────
  await t.goi('Network.clearBrowserCache');
  tatMayChu();
  await nghi(800);

  const dutThat = await t.danhGia(`(async () => {
    try { await fetch('/robots.txt', { cache: 'no-store' }); return false; }
    catch { return true; }
  })()`);
  ghi('mạng thật sự đứt (tệp NGOÀI gói tải thì xin hỏng)', dutThat === true,
    dutThat ? '' : 'vẫn lấy được tệp ngoài gói — chưa hề ngoại tuyến, mọi bước dưới vô nghĩa');

  // ── 4. MỞ LẠI APP KHI ĐÃ MẤT MẠNG ─────────────────────────────────────────
  await t.goi('Page.reload', { ignoreCache: false });
  await nghi(5000);
  const man = await t.danhGia(`(() => ({
    coApp: !!document.querySelector('nav[aria-label="Điều hướng nhanh"]'),
    daiChu: (document.body.innerText || '').length,
  }))()`);
  ghi('MẤT MẠNG: mở lại app vẫn vào được', man && man.coApp === true,
    man ? `dài chữ ${man.daiChu}` : '');

  // ── 5. NGHE ĐƯỢC BẢN THU KHI MẤT MẠNG ─────────────────────────────────────
  const nghe = await t.danhGia(`(async () => {
    const m = await caches.open('bunny-english-offline-v1').then((k) => k.keys());
    const mp3 = m.map((r) => new URL(r.url).pathname).filter((p) => p.endsWith('.mp3'))[0];
    if (!mp3) return { khongCoMp3: true };
    const a = new Audio(mp3);
    a.preload = 'auto';
    const loi = [];
    a.addEventListener('error', () => loi.push('error:' + (a.error && a.error.code)));
    try { await a.play(); } catch (e) { loi.push('play-nem:' + e.name); }
    await new Promise((r) => setTimeout(r, 2500));
    return { mp3, thoiLuong: a.duration, viTri: a.currentTime, sanSang: a.readyState, loi };
  })()`);
  ghi('MẤT MẠNG: nghe được bản thu đã tải', nghe && Number(nghe.viTri) > 0.05,
    JSON.stringify(nghe));

  // ── 6. CHIỀU NGƯỢC: XOÁ GÓI THÌ PHẢI MẤT THẬT ─────────────────────────────
  // Không có bước này thì "tải về" và "không tải gì cả" trông giống hệt nhau —
  // kho vỏ tự cất cũng đủ mở app, nên bước 4 một mình KHÔNG chứng minh gói tải
  // có tác dụng.
  const xoa = await t.danhGia(`(async () => {
    await new Promise((xong) => {
      const nghe = (ev) => {
        if ((ev.data || {}).loai === 'DA_XOA_OFFLINE') {
          navigator.serviceWorker.removeEventListener('message', nghe); xong();
        }
      };
      navigator.serviceWorker.addEventListener('message', nghe);
      navigator.serviceWorker.controller.postMessage({ loai: 'XOA_OFFLINE' });
      setTimeout(xong, 15000);
    });
    return (await caches.keys()).includes('bunny-english-offline-v1');
  })()`);
  ghi('xoá gói thì kho tải BIẾN MẤT thật', xoa === false,
    xoa ? 'bấm xoá mà kho vẫn còn — nút xoá là nút giả' : '');

  // ⚠️ PHẢI DỌN KHO HTTP LẦN NỮA Ở ĐÂY. Bước 5 vừa PHÁT chính tệp này, nên
  // Chrome còn giữ nó trong kho bộ nhớ/HTTP; không dọn thì bước dưới báo "vẫn
  // nghe được" và trông y hệt một lỗ hổng của kho tải. Lần chạy đầu đã dính
  // đúng thế: 9/10 với một bước hỏng hoàn toàn giả.
  await t.goi('Network.clearBrowserCache');
  await nghi(500);

  // Và khẳng định bằng chứng, không suy luận: KHÔNG kho nào còn giữ tệp này.
  const conKhoNao = await t.danhGia(`(async () => {
    const r = await caches.match('/audio/tat-1512.mp3');
    return { conTrongKho: !!r, cacKho: await caches.keys() };
  })()`);
  ghi('sau khi xoá, KHÔNG kho nào còn giữ bản thu', conKhoNao && conKhoNao.conTrongKho === false,
    JSON.stringify(conKhoNao));

  const ngheSauXoa = await t.danhGia(`(async () => {
    const a = new Audio('/audio/tat-1512.mp3');
    a.preload = 'auto';
    try { await a.play(); } catch { /* mong đợi hỏng */ }
    await new Promise((r) => setTimeout(r, 2000));
    return a.currentTime;
  })()`);
  ghi('xoá gói rồi thì KHÔNG nghe được nữa — chứng minh bước 5 nhờ gói tải', Number(ngheSauXoa) < 0.05,
    Number(ngheSauXoa) >= 0.05 ? 'vẫn nghe được sau khi xoá gói — bước 5 đang xanh nhờ một kho khác, không phải nhờ gói tải' : '');

  t.dong();
} catch (e) {
  ghi('bộ rà chạy hết không vấp', false, String(e?.message || e));
} finally {
  const dat = ket.filter((k) => k.ok).length;
  console.log(`\nbước đạt: ${dat}/${ket.length}`);
  const hong = ket.filter((k) => !k.ok);
  if (hong.length) console.log('CÁC BƯỚC HỎNG:\n' + hong.map((k) => `  · ${k.buoc}${k.chiTiet ? ' :: ' + k.chiTiet : ''}`).join('\n'));
  tienTrinh.kill();
  tatMayChu();
  process.exit(dat === ket.length ? 0 : 1);
}
