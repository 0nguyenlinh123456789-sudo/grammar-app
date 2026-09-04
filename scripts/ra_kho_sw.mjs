// File: scripts/ra_kho_sw.mjs
//
//   npm run ra:khosw
//
// CHỨNG MINH TRONG MỘT TRÌNH DUYỆT THẬT RẰNG LỖI 206 LÀ CÓ THẬT.
//
// ══ VÌ SAO CẦN, TRONG KHI ĐÃ CÓ 9 PHÉP KIỂM ══
// `tests/kho_sw.test.js` nạp `public/sw.js` vào `node:vm` và gọi thẳng hai chốt,
// nên nó chứng minh được CHỐT CHẶN ĐÚNG. Nhưng cả file đó đứng trên một tiền đề
// mà Node không kiểm được: *"`cache.put()` thật sự NÉM khi gặp 206, và máy chủ
// thật sự trả 206 khi có tiêu đề Range"*. Nếu tiền đề đó sai thì 9 phép kiểm kia
// vẫn xanh trong khi chúng đang canh một con ma.
//
// Bộ rà này đo đúng tiền đề đó, bằng Cache API THẬT và máy chủ THẬT:
//   1. xin `/audio/<tệp>.mp3` kèm `Range` → xem mã trả về có phải 206 không;
//   2. đưa chính phản hồi đó cho `cache.put()` → xem nó có ném không;
//   3. rồi đưa một phản hồi 200 bình thường → phải cất được, để chắc rằng
//      bước 2 hỏng vì 206 chứ không phải vì Cache API hỏng sẵn.
//
// ══ ĐIỀU NÓ KHÔNG CHỨNG MINH ══
// Nó KHÔNG chứng minh thẻ `<audio>` của app tự sinh ra yêu cầu Range — đó là
// quyết định bên trong trình duyệt, thay đổi theo kích thước tệp và theo phiên
// bản. Nó chứng minh: HỄ có Range thì có 206, và HỄ có 206 thì `cache.put` ném.
// Đó đã đủ để bắt buộc phải có chốt, nhưng đừng đọc rộng hơn thế.

import { moTrinhDuyet, moTab } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';
import { readdirSync } from 'node:fs';

const TEP_THU = readdirSync('public/audio').find((f) => f.endsWith('.mp3'));

const may = await moMayChuXemTruoc({ cong: 4341 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9355 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

const DO_206 = `(async () => {
  const ra = { };
  const r = await fetch('/audio/${TEP_THU}', { headers: { Range: 'bytes=0-1024' } });
  ra.ma = r.status;
  const kho = await caches.open('bunny-do-thu');
  try {
    await kho.put(new Request('/audio/${TEP_THU}'), r.clone());
    ra.catDuoc206 = true;
  } catch (e) {
    ra.catDuoc206 = false;
    ra.loi = String(e && e.message || e);
  }
  // Đối chứng: một phản hồi 200 bình thường PHẢI cất được. Không có bước này
  // thì "cất hỏng" có thể chỉ vì Cache API không dùng được, và cả bộ rà vô nghĩa.
  const r2 = await fetch('/manifest.webmanifest');
  ra.ma200 = r2.status;
  try {
    await kho.put(new Request('/manifest.webmanifest'), r2.clone());
    ra.catDuoc200 = true;
  } catch (e) {
    ra.catDuoc200 = false;
    ra.loi200 = String(e && e.message || e);
  }
  await caches.delete('bunny-do-thu');
  return ra;
})()`;

const KHO_SW = `(async () => {
  const ten = await caches.keys();
  return { ten, coV2: ten.includes('bunny-english-shell-v2'), coV1: ten.includes('bunny-english-shell-v1') };
})()`;

const DEM_KHO = `(async () => {
  const c = await caches.open('bunny-english-shell-v2');
  const ds = await c.keys();
  return ds.map((r) => new URL(r.url).pathname);
})()`;

try {
  await t.diToi(`${may.BASE}/`);
  await new Promise((r) => setTimeout(r, 3000));

  const d = await t.danhGia(DO_206);
  ghi('máy chủ trả 206 khi yêu cầu có tiêu đề Range', d.ma === 206, `mã nhận được: ${d.ma}`);
  ghi('cache.put() NÉM khi đưa cho nó một phản hồi 206', d.catDuoc206 === false,
    d.catDuoc206 ? 'cất được — tiền đề của cả tests/kho_sw.test.js SAI, phải đọc lại' : `lỗi thật: ${d.loi}`);
  ghi('đối chứng: cùng cái kho đó cất được một phản hồi 200 bình thường', d.catDuoc200 === true,
    d.catDuoc200 ? '' : `Cache API hỏng sẵn (${d.loi200}) — bước trên không kết luận được gì`);

  // ── SERVICE WORKER THẬT: đã đổi sang kho -v2 và KHÔNG nuốt tệp thu ─────────
  const sw = await t.danhGia(KHO_SW);
  ghi('service worker đang dùng kho -v2 (kho -v1 cũ đã bị xoá)', sw.coV2 === true && sw.coV1 === false,
    `kho hiện có: ${sw.ten.join(', ') || '(chưa có)'}`);

  const trong = await t.danhGia(DEM_KHO);
  const mediaLot = trong.filter((p) => /\.(mp3|m4a|ogg|wav|mp4)$/i.test(p));
  ghi('không có tệp media nào lọt vào kho vỏ app', mediaLot.length === 0,
    mediaLot.length ? `lọt: ${mediaLot.slice(0, 3).join(', ')}` : `kho có ${trong.length} mục, không mục nào là media`);
  ghi('kho vỏ app có cất được thứ đáng cất', trong.length > 0, `${trong.length} mục`);

  const loi = t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING')
    // Yêu cầu Range do CHÍNH bộ rà tạo ra, và lời than của Cache API về nó.
    && !/206|Partial|Range|bunny-do-thu/i.test(String(x.text)));
  ghi('không có lỗi console lạ', loi.length === 0,
    loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 130)}`).join(' | '));
} catch (e) {
  ghi('bộ rà chạy hết không vấp', false, String(e?.message || e));
} finally {
  const dat = ket.filter((k) => k.ok).length;
  console.log(`\nbước đạt: ${dat}/${ket.length}`);
  const hong = ket.filter((k) => !k.ok);
  if (hong.length) console.log('CÁC BƯỚC HỎNG:\n' + hong.map((k) => `  · ${k.buoc}${k.chiTiet ? ' :: ' + k.chiTiet : ''}`).join('\n'));
  t.dong();
  tienTrinh.kill();
  may.dong();
  process.exit(dat === ket.length ? 0 : 1);
}
