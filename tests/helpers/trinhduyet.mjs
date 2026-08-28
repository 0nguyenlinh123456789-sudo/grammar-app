// File: tests/helpers/trinhduyet.mjs
// LÁI MỘT TRÌNH DUYỆT THẬT, KHÔNG THÊM PHỤ THUỘC NÀO.
//
// ══ VÌ SAO ══
// Bộ vẽ-thật (render.mjs) trả lời được "vẽ ra thì thấy gì", nhưng KHÔNG bấm được:
// `useEffect` không chạy, không có DOM, không chuyển tab, không gõ đáp án. Chủ dự
// án yêu cầu "đóng vai khách vào web dùng hết chức năng", nên cần thứ bấm được.
//
// ══ CÁCH LÀM ══
// Chrome đã có sẵn trên máy, và Node 24 có `WebSocket` toàn cục. Nên nối thẳng
// vào Chrome DevTools Protocol: KHÔNG cài Playwright, KHÔNG tải browser 100 MB,
// KHÔNG thêm một dòng nào vào package.json. Đổi lại, bộ này mỏng — nó chỉ có
// đúng những lệnh cần cho việc rà, không phải một thư viện tự động hoá.
//
// ══ CÁI NÓ KIỂM ĐƯỢC / KHÔNG KIỂM ĐƯỢC ══
// KIỂM ĐƯỢC: lỗi console, ngoại lệ chưa bắt, request hỏng, phần tử có hiện ra
//   thật không, bấm vào có mở đúng thứ không, có bị lớp khác che không.
// KHÔNG KIỂM ĐƯỢC: giao diện có ĐẸP không, chữ có dễ đọc không, âm thanh nghe
//   có rõ không — và mọi thứ cần tai/mắt người. Ghi ra để không ai đọc rộng hơn.

import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME_CO_THE = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];

export function timChrome() {
  const co = CHROME_CO_THE.find((p) => fs.existsSync(p));
  if (!co) throw new Error('Không tìm thấy Chrome/Edge trên máy này.');
  return co;
}

const doiCong = async (cong, giay = 20) => {
  for (let i = 0; i < giay * 4; i++) {
    try { return await (await fetch(`http://127.0.0.1:${cong}/json/version`)).json(); }
    catch { await new Promise((r) => setTimeout(r, 250)); }
  }
  throw new Error(`Chrome không mở cổng ${cong}`);
};

/**
 * @param {object} [tuyChon]
 * @param {boolean} [tuyChon.microGia] cấp sẵn một micro tổng hợp cho tab.
 *
 * ⚠️ `microGia` PHẢI LÀ TUỲ CHỌN, KHÔNG ĐƯỢC BẬT MẶC ĐỊNH.
 * Bản đầu bật cờ này cho MỌI bộ rà, và nó âm thầm gỡ mất một phép kiểm của
 * `hoc_that.mjs`: bộ đó có một bước chỉ chạy KHI app báo lỗi micro (kiểm rằng
 * lời báo có chỉ đường gõ tay hay không). Micro được cấp sẵn ⇒ không có lỗi ⇒
 * bước đó biến mất, và bộ rà tụt từ 35 xuống 34 bước mà vẫn báo "toàn ĐẠT".
 *
 * Mất phép kiểm mà vẫn xanh là kiểu hỏng tệ nhất của một bộ rà. Nên môi trường
 * chỉ được đổi ở đúng bộ CẦN đổi.
 */
export async function moTrinhDuyet({ cong = 9333, microGia = false } = {}) {
  const tienTrinh = spawn(timChrome(), [
    '--headless=new', `--remote-debugging-port=${cong}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    // Cửa sổ đủ rộng để KHÔNG rơi vào bố cục điện thoại — thanh bên và lưới thẻ
    // của trang chủ chỉ hiện đầy đủ ở bề ngang lớn.
    '--window-size=1440,900',
    // MICRO GIẢ — chỉ khi bộ rà XIN. Không có hai cờ này thì `getUserMedia`
    // trong Chrome headless trả về NotAllowedError, nên đường ghi âm không bao
    // giờ đi qua được và bộ rà báo xanh vì nó không chạm tới.
    // Micro giả phát một tiếng bíp tổng hợp: đủ để MediaRecorder có dữ liệu.
    //
    // KHÔNG kiểm được: chất lượng thu, và Web Speech có nghe ra chữ không —
    // nhận dạng giọng nói cần dịch vụ đám mây của Google, headless không có.
    ...(microGia ? ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'] : []),
    'about:blank',
  ], { stdio: 'ignore' });
  const ver = await doiCong(cong);
  return { tienTrinh, cong, wsBrowser: ver.webSocketDebuggerUrl };
}

/** Nối vào một tab mới và bật sẵn MỌI kênh báo lỗi TRƯỚC khi điều hướng. */
/**
 * Mở một tab mới và nối vào nó.
 *
 * `chanApi` (mặc định true) chặn `/api/access` và trả lời "đã kích hoạt", tức
 * dựng lại trạng thái KHÁCH ĐÃ MUA. Đặt false khi muốn đi qua **cổng thật** —
 * ví dụ kiểm bản live, nơi API có thật và việc cổng đó chặn đúng là một phần
 * của phép kiểm.
 *
 * ⚠️ VÌ SAO CÓ THAM SỐ NÀY: `scripts/kiem_live_trinh_duyet.mjs` ghi ở đầu file
 * rằng "Ở đây KHÔNG chặn /api/access", nhưng nó gọi `moTab(cong)` và bản cũ của
 * hàm này chặn VÔ ĐIỀU KIỆN. Nên dòng nó in ra — "vào được app (không kẹt màn
 * kích hoạt): true" — là đo trên một phiên ĐÃ ĐƯỢC GIẢ LÀ premium, không phải
 * đo cổng thật. Đo lại bằng curl: live trả về 401 {"authenticated":false}, tức
 * khách thật GẶP cổng. Bộ đo nói ngược với sự thật nó định đo.
 */
/**
 * @param {object} [tuyChon]
 * @param {boolean} [tuyChon.chanApi]
 * @param {{data: object|null, updatedAt: number|null}} [tuyChon.khoTienDo]
 *   Kho tiến độ giả cho `/api/progress`. Truyền vào thì tab này có một "máy
 *   chủ đồng bộ" cư xử ĐÚNG như api/progress.js thật: GET trả bản đang giữ,
 *   PUT từ chối khi bản đang giữ MỚI HƠN và trả về bản cũ kèm accepted:false.
 *
 *   Cần thiết vì bản dựng chạy ở máy KHÔNG có Redis: `/api/progress` trả về
 *   index.html, `read.json()` ném, App.jsx nuốt lỗi, và đồng bộ IM LẶNG không
 *   chạy. Nghĩa là mọi bộ rà trước nay đều đo một app KHÔNG hề đồng bộ — đúng
 *   nửa nguy hiểm nhất của chức năng reset lại nằm ngoài tầm với.
 * @param {{ten:string, so:string, chu?:string, qr?:string}} [tuyChon.banHangGia]
 *   Thông tin chuyển khoản giả cho action `'bank'`. KHÔNG truyền thì `/api/access`
 *   rơi xuống nhánh mặc định phía dưới (coi như đã kích hoạt) — với action
 *   `'bank'` thì hình dạng trả về không khớp, `ChuyenKhoan` sẽ hiện "chưa có
 *   thông tin chuyển khoản". Truyền vào khi bộ rà cần THẤY khối ngân hàng thật.
 * @param {{don: Map<string, {token:string, trangThai:string, maTruyCap:string|null}>}} [tuyChon.donHangGia]
 *   Kho đơn hàng giả cho action `'order'`/`'trangThaiDon'` — cùng triết lý với
 *   `khoTienDo`: script gọi truyền một `{don: new Map()}` rồi TỰ SỬA trạng thái
 *   một đơn (`donHangGia.don.get(maDon).trangThai = 'da_thanh_toan'`) để mô
 *   phỏng đúng lúc webhook thanh toán báo có tiền — logic khớp giao dịch/số
 *   tiền/idempotent đã có bộ kiểm riêng ở tests/payment_webhook.test.js, bộ rà
 *   này chỉ cần xác nhận REACT có thật sự đăng ký đơn, hỏi lặp lại, và vẽ đúng
 *   khi trạng thái đổi — đúng lớp mà `node --test` không nhìn thấy được.
 */
export async function moTab(cong, { chanApi = true, khoTienDo = null, banHangGia = null, donHangGia = null } = {}) {
  const tab = await (await fetch(`http://127.0.0.1:${cong}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = () => j(new Error('không nối được tab')); });

  let id = 0;
  const cho = new Map();
  const nhatKy = [];   // mọi thứ đáng ngờ, theo thứ tự thời gian

  const goi = (method, params = {}) => new Promise((res, rej) => {
    const i = ++id;
    cho.set(i, (m) => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result)));
    ws.send(JSON.stringify({ id: i, method, params }));
  });

  // CHẶN /api/access và trả lời "đã kích hoạt". App thật gọi API trên Vercel;
  // chạy bản dựng ở máy thì API đó không có, và màn kích hoạt sẽ chặn mọi thứ.
  // Đây là dựng lại đúng trạng thái KHÁCH ĐÃ MUA, không phải vô hiệu hoá cổng.
  const traLoiChan = async (p) => {
    const traJson = (requestId, obj) => goi('Fetch.fulfillRequest', {
      requestId,
      responseCode: 200,
      responseHeaders: [{ name: 'Content-Type', value: 'application/json' }],
      body: Buffer.from(JSON.stringify(obj)).toString('base64'),
    });
    try {
      if (khoTienDo && String(p.request.url).includes('/api/progress')) {
        if (p.request.method === 'GET') {
          await traJson(p.requestId, { data: khoTienDo.data, updatedAt: khoTienDo.updatedAt });
          return;
        }
        // Bắt chước ĐÚNG api/progress.js: bản đang giữ mới hơn thì TỪ CHỐI và
        // trả bản cũ về — đó chính là nhánh làm tiến độ vừa xoá quay trở lại.
        const than = JSON.parse(p.request.postData || '{}');
        const den = Number(than.updatedAt) || Date.now();
        if (khoTienDo.updatedAt && Number(khoTienDo.updatedAt) > den) {
          khoTienDo.soLanTuChoi = (khoTienDo.soLanTuChoi || 0) + 1;
          await traJson(p.requestId, { accepted: false, data: khoTienDo.data, updatedAt: khoTienDo.updatedAt });
          return;
        }
        khoTienDo.data = than.data;
        khoTienDo.updatedAt = Date.now();
        khoTienDo.soLanNhan = (khoTienDo.soLanNhan || 0) + 1;
        await traJson(p.requestId, { accepted: true, updatedAt: khoTienDo.updatedAt });
        return;
      }
      if (String(p.request.url).includes('/api/access')) {
        const than = (() => { try { return JSON.parse(p.request.postData || '{}'); } catch { return {}; } })();

        if (than.action === 'bank' && banHangGia) {
          await traJson(p.requestId, { nganHang: banHangGia });
          return;
        }
        if (than.action === 'order' && donHangGia) {
          let rec = donHangGia.don.get(than.maDon);
          if (!rec) { rec = { token: `token-gia-${than.maDon}`, trangThai: 'cho', maTruyCap: null }; donHangGia.don.set(than.maDon, rec); }
          await traJson(p.requestId, {
            ok: true, token: rec.token, trangThai: rec.trangThai,
            ...(rec.trangThai === 'da_thanh_toan' ? { maTruyCap: rec.maTruyCap } : {}),
          });
          return;
        }
        if (than.action === 'trangThaiDon' && donHangGia) {
          const rec = donHangGia.don.get(than.maDon);
          if (!rec || rec.token !== than.token) { await traJson(p.requestId, { trangThai: 'khong_thay' }); return; }
          await traJson(p.requestId, rec.trangThai === 'da_thanh_toan'
            ? { trangThai: 'da_thanh_toan', maTruyCap: rec.maTruyCap }
            : { trangThai: rec.trangThai });
          return;
        }

        // Bộ rà xin `banHangGia`/`donHangGia` gần như chắc chắn CẦN thấy cổng
        // kích hoạt thật (khách CHƯA mua) để mở được bảng giá — không phải cần
        // "đã đăng nhập sẵn". Nên chỉ áp lối tắt "coi như đã kích hoạt" khi
        // KHÔNG có cả hai; có một trong hai mà request không khớp action nào đã
        // biết (GET kiểm phiên, action:'activate'…) thì để nó ĐI TIẾP tới máy
        // chủ thật — bản dựng tĩnh không có route đó nên sẽ hỏng ĐÚNG như một
        // khách chưa mua thật sự gặp, và cổng kích hoạt hiện ra bình thường.
        if (!banHangGia && !donHangGia) {
          const body = JSON.stringify({
            authenticated: true,
            access: { plan: 'premium', expiresAt: '2099-01-01T00:00:00.000Z', deviceCount: 1, maxDevices: 3 },
          });
          await goi('Fetch.fulfillRequest', {
            requestId: p.requestId, responseCode: 200,
            responseHeaders: [{ name: 'Content-Type', value: 'application/json' }],
            body: Buffer.from(body).toString('base64'),
          });
          return;
        }
        await goi('Fetch.continueRequest', { requestId: p.requestId });
        return;
      }
      await goi('Fetch.continueRequest', { requestId: p.requestId });
    } catch { /* request đã đóng */ }
  };

  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && cho.has(m.id)) { cho.get(m.id)(m); cho.delete(m.id); return; }
    const p = m.params || {};
    if (m.method === 'Runtime.exceptionThrown') {
      const d = p.exceptionDetails || {};
      nhatKy.push({ loai: 'NGOAI_LE', text: d.exception?.description || d.text, url: d.url });
    } else if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(p.type)) {
      nhatKy.push({ loai: p.type === 'error' ? 'CONSOLE_ERROR' : 'CONSOLE_WARN', text: (p.args || []).map((a) => a.value ?? a.description ?? a.type).join(' ') });
    } else if (m.method === 'Log.entryAdded' && ['error', 'warning'].includes(p.entry?.level)) {
      nhatKy.push({ loai: `LOG_${p.entry.level.toUpperCase()}`, text: p.entry.text, url: p.entry.url });
    } else if (m.method === 'Network.loadingFailed' && !p.canceled) {
      nhatKy.push({ loai: 'REQUEST_HONG', text: `${p.errorText} · ${p.type}` });
    } else if (m.method === 'Fetch.requestPaused') {
      traLoiChan(p);
    }
  };

  // BẬT TRƯỚC khi điều hướng: lỗi lúc gắn cây component chỉ bắn MỘT lần, nối sau
  // khi tải xong là mất luôn.
  await goi('Runtime.enable');
  await goi('Log.enable');
  await goi('Network.enable');
  await goi('Page.enable');
  // Chỉ bật khi thật sự cần chặn: bật rồi không chặn thì mọi request /api/* bị
  // treo chờ `continueRequest`, chậm mà không rõ vì sao.
  // `requestStage: Request` + Fetch.enable cho ta đọc được `postData` của PUT —
  // không có nó thì thân request về rỗng và kho tiến độ giả không biết app gửi gì.
  if (chanApi) await goi('Fetch.enable', { patterns: [{ urlPattern: '*/api/*', requestStage: 'Request' }] });

  const danhGia = async (bieuThuc) => {
    const r = await goi('Runtime.evaluate', { expression: bieuThuc, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(`đánh giá lỗi: ${r.exceptionDetails.text} ${r.exceptionDetails.exception?.description || ''}`);
    return r.result.value;
  };

  const doi = async (bieuThuc, { giay = 10, nhan = bieuThuc } = {}) => {
    for (let i = 0; i < giay * 10; i++) {
      if (await danhGia(`!!(${bieuThuc})`)) return true;
      await new Promise((r) => setTimeout(r, 100));
    }
    throw new Error(`hết ${giay}s mà chưa thấy: ${nhan}`);
  };

  const diToi = async (url) => {
    await goi('Page.navigate', { url });
    await doi("document.querySelector('#root') && document.querySelector('#root').children.length > 0",
      { giay: 30, nhan: 'app gắn xong' });
  };

  return { goi, danhGia, doi, diToi, nhatKy, dong: () => ws.close() };
}

/** Bấm vào phần tử ĐẦU TIÊN có chữ khớp. Trả về false nếu không tìm thấy. */
export const BAM_THEO_CHU = (chu, the = 'button') => `(() => {
  const ds = [...document.querySelectorAll(${JSON.stringify(the)})];
  const el = ds.find((e) => (e.innerText || '').trim().toUpperCase().includes(${JSON.stringify(chu)}.toUpperCase()));
  if (!el) return false;
  el.scrollIntoView({ block: 'center' });
  el.click();
  return true;
})()`;

/** Phần tử có chữ này có ĐANG HIỆN và KHÔNG bị lớp khác che không? */
export const CO_HIEN_VA_KHONG_BI_CHE = (chu) => `(() => {
  const ds = [...document.querySelectorAll('body *')].filter((e) => (e.textContent || '').includes(${JSON.stringify(chu)}));
  const el = ds[ds.length - 1];
  if (!el) return { thay: false };
  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return { thay: false, lyDo: 'kích thước 0' };
  const x = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1);
  const y = Math.min(Math.max(r.top + r.height / 2, 1), innerHeight - 1);
  const tren = document.elementFromPoint(x, y);
  const biChe = tren && !el.contains(tren) && !tren.contains(el);
  return { thay: true, biChe: !!biChe, deTren: biChe ? String(tren.className || tren.tagName).slice(0, 60) : null };
})()`;

/**
 * Panel chứa chữ này có bị một LỚP PHỦ KHÁC đè lên không?
 *
 * Bản đầu của phép đo này lấy phần tử sâu nhất chứa chữ rồi hỏi `elementFromPoint`
 * — và nó báo "bị che" ở gần như mọi panel, vì hai phần tử **cùng nằm trong một
 * panel** chồng nhau là chuyện bình thường của bố cục. Một phép đo báo động ở
 * mọi chỗ thì không chỉ ra được chỗ nào. Nay chỉ hỏi đúng câu đáng hỏi: **có lớp
 * phủ nào z cao hơn đang nằm đè lên panel không.**
 */
export const CHE_BOI_LOP_PHU_KHAC = (chu) => `(() => {
  const trongPanel = [...document.querySelectorAll('.fixed.inset-0')]
    .filter((e) => (e.textContent || '').includes(${JSON.stringify(chu)}));
  const panel = trongPanel[0];
  if (!panel) return { biChe: false, lyDo: 'chữ không nằm trong lớp phủ nào' };
  const zPanel = Number(getComputedStyle(panel).zIndex) || 0;
  const tren = [...document.querySelectorAll('.fixed')]
    .filter((e) => e !== panel && !panel.contains(e) && !e.contains(panel))
    .map((e) => [e, Number(getComputedStyle(e).zIndex) || 0, e.getBoundingClientRect()])
    .filter(([, z, r]) => z > zPanel && r.width > 0 && r.height > 0);
  if (!tren.length) return { biChe: false, zPanel };
  const [el, z] = tren.sort((a, b) => b[1] - a[1])[0];
  return { biChe: true, zPanel, zTren: z, deTren: String(el.className).slice(0, 60) };
})()`;

/** Bấm nút có nhãn ĐÚNG BẰNG chuỗi này (không phải "chứa"). */
export const BAM_DUNG_NHAN = (chu) => `(() => {
  const el = [...document.querySelectorAll('button')]
    .find((e) => (e.innerText || '').trim().toUpperCase() === ${JSON.stringify(chu)}.toUpperCase());
  if (!el) return false;
  el.scrollIntoView({ block: 'center' });
  el.click();
  return true;
})()`;

/** Đóng panel đang mở. Mọi panel của app khai nút đóng bằng aria-label="Đóng". */
export const DONG_PANEL = `(() => {
  const ds = [...document.querySelectorAll('[aria-label="Đóng"]')].filter((e) => e.getBoundingClientRect().width > 0);
  if (!ds.length) return false;
  ds[ds.length - 1].click();
  return true;
})()`;
