// File: scripts/ra_chan_kho.mjs
//
//   npm run ra:chankho
//
// GIẢ LẬP MỘT CHIẾC IPHONE ĐANG CHẶN DỮ LIỆU TRANG, RỒI XEM APP RA SAO.
//
// ══ VÌ SAO ══
// `src/App.jsx` từng gọi thẳng `localStorage` 30 lần không bọc, nhiều lần trong
// hàm khởi tạo của `useState` — tức là chạy trong LƯỢT VẼ ĐẦU TIÊN của gốc cây
// component. App không phải component tải lười; nếu nó ném ở đó thì cả màn hình
// thành lưới lỗi, VÀ TẢI LẠI KHÔNG CỨU ĐƯỢC vì lần sau vẫn ném y hệt.
//
// ══ HAI KIỂU CHẶN, KHÔNG PHẢI MỘT ══
// Đây là chỗ dễ đo thiếu nhất, nên bộ rà làm cả hai:
//   1. NÉM LÚC ĐỌC — iOS Safari bật "Chặn tất cả cookie". Chạm vào
//      `window.localStorage` là ném `SecurityError` ngay, chưa kịp gọi hàm nào.
//   2. NÉM LÚC GHI — Safari chế độ riêng tư. Đối tượng CÓ TỒN TẠI, `getItem`
//      chạy bình thường, chỉ `setItem` ném `QuotaExceededError`. Bọc mỗi lượt
//      đọc mà quên lượt ghi thì app vẫn chết, chỉ chết muộn hơn.
//
// ══ VÀ ĐIỀU QUAN TRỌNG NHẤT KHÔNG PHẢI "APP CÒN SỐNG" ══
// App sống mà im lặng thì người học ngồi học một tiếng rồi mất sạch tiến độ —
// đổi một màn hình hỏng ngay lấy một sự phản bội trễ. Nên bộ rà đòi CẢ HAI:
// app còn chạy, VÀ có một câu nói thẳng rằng tiến độ sẽ không được lưu.

import { moTrinhDuyet, moTab } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

// Kiểu 1: chạm vào là ném (iOS "Chặn tất cả cookie").
const NEM_LUC_DOC = `
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    get() { throw new DOMException('The operation is insecure.', 'SecurityError'); },
  });
`;

// Kiểu 2: đọc được, ghi thì ném (Safari riêng tư).
const NEM_LUC_GHI = `
  (() => {
    const that = {};
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        return {
          getItem: (k) => (k in that ? that[k] : null),
          setItem: () => { throw new DOMException('QuotaExceededError', 'QuotaExceededError'); },
          removeItem: () => { throw new DOMException('QuotaExceededError', 'QuotaExceededError'); },
          clear: () => { throw new DOMException('QuotaExceededError', 'QuotaExceededError'); },
          key: () => null,
          length: 0,
        };
      },
    });
  })();
`;

const DOC_MAN = `(() => {
  const t = document.body.innerText || '';
  return {
    manCrashGoc: t.includes('Thỏ vấp phải một lỗi'),
    coBaoKhoChan: t.includes('không lưu được tiến độ') || t.includes('KHÔNG được lưu'),
    conNut: [...document.querySelectorAll('button, a')].length,
    chu: t.slice(0, 200).replace(/\\s+/g, ' '),
  };
})()`;

const may = await moMayChuXemTruoc({ cong: 4343 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9357 });

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

async function thu(ten, kichBan) {
  // Tab MỚI cho mỗi kiểu chặn: kịch bản gắn vào tài liệu, không gỡ ra được.
  const t = await moTab(cong);
  try {
    await t.goi('Page.addScriptToEvaluateOnNewDocument', { source: kichBan });
    await t.diToi(`${may.BASE}/`);
    await nghi(4000);
    const m = await t.danhGia(DOC_MAN);

    ghi(`[${ten}] app KHÔNG rơi xuống lưới lỗi gốc`, m.manCrashGoc === false,
      m.manCrashGoc ? `màn hình chỉ còn: ${m.chu}` : '');
    ghi(`[${ten}] app vẫn dùng được (còn nút bấm)`, m.conNut > 20, `còn ${m.conNut} nút/liên kết`);
    // Đây là bước dễ bỏ quên nhất, và là bước đắt nhất nếu thiếu.
    ghi(`[${ten}] có NÓI RA rằng tiến độ sẽ không được lưu`, m.coBaoKhoChan === true,
      m.coBaoKhoChan ? '' : 'app chạy nhưng im lặng — người học sẽ mất tiến độ mà không được báo trước');

    const loi = t.nhatKy.filter((x) => x.loai === 'NGOAI_LE');
    ghi(`[${ten}] không có ngoại lệ chưa bắt`, loi.length === 0,
      loi.slice(0, 2).map((x) => String(x.text).slice(0, 120)).join(' | '));
  } finally {
    t.dong();
  }
}

try {
  await thu('chặn lúc ĐỌC', NEM_LUC_DOC);
  await thu('chặn lúc GHI', NEM_LUC_GHI);
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
