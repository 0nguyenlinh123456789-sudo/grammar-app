// File: tests/helpers/render.mjs
// VẼ THẬT MỘT COMPONENT RA HTML, TRONG NODE.
//
// ══ VÌ SAO CẦN ══
// Tới 17/08 bộ kiểm có 301 test mà **không test nào vẽ ra một component nào**.
// Tất cả đều là đọc chuỗi trong mã nguồn hoặc kiểm dữ liệu. Hệ quả đã trả giá
// thật trong ngày: ba lỗi giao diện (trang trắng · "đang tải" vĩnh viễn · tab dẫn
// tới màn hình treo) đều nằm im qua 301 test xanh, vì **không có test nào hỏi
// "vẽ ra thì người học thấy gì"**. Test đọc chuỗi trả lời được "mã có nói câu đó
// không"; nó không trả lời được "câu đó có ra tới mắt người học không".
//
// ══ CÁCH LÀM, VÀ VÌ SAO KHÔNG CẦN THÊM THƯ VIỆN NÀO ══
// `rolldown` đã có sẵn (Vite 8 dùng nó) và nó chuyển JSX ngay. Nên: gói component
// thành một chunk ESM trong bộ nhớ → ghi ra file tạm → import → `renderToStaticMarkup`.
// KHÔNG thêm jsdom, KHÔNG thêm testing-library, KHÔNG thêm babel — mỗi phụ thuộc
// mới là một thứ phải bảo trì, và ở đây không cần thứ nào.
//
// ══ CÁI NÓ KIỂM ĐƯỢC VÀ CÁI NÓ KHÔNG ══
// KIỂM ĐƯỢC: lần vẽ đầu tiên không nổ, và HTML ra có/không có đúng những gì cần.
// KHÔNG KIỂM ĐƯỢC — nói thẳng ra đây để không ai đọc nó rộng hơn sự thật:
//   · `useEffect` KHÔNG chạy (đây là vẽ tĩnh một lần), nên mọi thứ chỉ xảy ra sau
//     khi gắn vào DOM đều không được kiểm.
//   · Không có tương tác: không bấm, không gõ, không chuyển tab.
//   · Không có CSS. `z-index` sai, chữ bị che, màu tương phản kém — không thấy ở
//     đây; đó là việc của `tests/overlay_zindex.test.js` và của mắt người.
//   · Không phải trình duyệt thật: không đo được hiệu năng, cuộn, hay bố cục.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'rolldown';
import { renderToStaticMarkup } from 'react-dom/server';

const NGOAI = ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime', 'react/jsx-dev-runtime'];

// `import.meta.env` là biến của Vite, không có khi gói bằng rolldown trần —
// component nào đọc nó (AccessGate đọc `import.meta.env.DEV`) sẽ nổ NGAY LÚC GÓI
// với thông báo `Cannot read properties of undefined (reading 'DEV')`, nghe như lỗi
// của app trong khi là thiếu môi trường. Định nghĩa thẳng ở đây, và đặt DEV=false
// để đi đúng nhánh bản phát hành (nhánh người học thật gặp).
// `import.meta.env` là biến của Vite; gói bằng rolldown trần thì nó không tồn tại,
// nên component nào đọc nó (AccessGate đọc `import.meta.env.DEV`) nổ với thông báo
// `Cannot read properties of undefined (reading 'DEV')` — nghe như lỗi của app
// trong khi là thiếu môi trường.
//
// Phải làm bằng PLUGIN, không phải bằng tuỳ chọn `define`: bản rolldown ở đây
// không nhận `define` ở cấp ngoài (nó cảnh báo "Invalid key" rồi bỏ qua, và **bó
// gói vẫn thành công** — tức nếu chỉ nhìn "gói được" thì tưởng đã xong).
//
// DEV = false để đi đúng nhánh bản phát hành: nhánh người học thật gặp. Đặt true
// là kiểm một đường mà không ai ngoài máy tôi đi.
const MOI_TRUONG = '({ DEV: false, PROD: true, MODE: "production", BASE_URL: "/", VITE_SALES_URL: "" })';
const pluginMoiTruong = {
  name: 'the-import-meta-env',
  transform(code) {
    if (!code.includes('import.meta.env')) return null;
    return { code: code.replaceAll('import.meta.env', MOI_TRUONG), map: null };
  },
};

/** Đếm số lượt nạp trong CÙNG tiến trình, để tên file tạm không trùng nhau. */
let soLuotNap = 0;

/**
 * Gói một file .jsx thành module rồi import về. Trả về đúng module đó.
 * @param {string} duong  đường dẫn tính từ gốc repo, ví dụ 'src/pages/GrammarPage.jsx'
 */
export async function napComponent(duong) {
  const kq = await build({
    input: duong,
    external: NGOAI,
    plugins: [pluginMoiTruong],
    // `codeSplitting: false` là BẮT BUỘC, không phải tuỳ chọn cho gọn: trang nào có
    // `import()` động (GrammarPage nạp `aiKey` kiểu đó) sẽ bị tách thành nhiều chunk,
    // và chunk chính đi tìm chunk phụ **cạnh file tạm** — nơi không có gì. Lần chạy
    // đầu của bộ này đỏ đúng vì vậy: `Cannot find module .../aiKey-*.js`.
    //
    // ⚠️ Cờ này phải nằm TRONG `output`. Đặt ở cấp ngoài thì rolldown lặng lẽ bỏ
    // qua — và cái bắt được chuyện đó là chốt chặn "gói ra >1 chunk" ngay dưới,
    // không phải test đỏ ở đâu đó xa. Chốt chặn cạnh chỗ hỏng thì đọc được lý do.
    output: { format: 'esm', codeSplitting: false },
    write: false,
    logLevel: 'silent',
  });
  const chunk = kq.output.find((o) => o.type === 'chunk');
  if (!chunk) throw new Error(`không gói được ${duong}`);
  const phu = kq.output.filter((o) => o.type === 'chunk').length;
  if (phu > 1) throw new Error(`${duong}: gói ra ${phu} chunk, file tạm sẽ không tìm được chunk phụ`);
  // Ghi vào thư mục tạm CẠNH repo (không phải /tmp) để đường dẫn tương đối trong
  // chunk vẫn giải được, và xoá ngay sau khi import.
  //
  // ⚠️ TÊN PHẢI DUY NHẤT THEO TỪNG LƯỢT GỌI, không được đặt theo ĐỘ DÀI MÃ.
  // Bản trước dùng `chunk.code.length` làm phần phân biệt, mà `node --test` chạy
  // mỗi FILE test trong một tiến trình RIÊNG và song song. Hai file cùng gói một
  // component (ví dụ `render_sweep` quét cả thư mục, gặp đúng component mà
  // `chuyen_khoan` cũng đang vẽ) thì ra CÙNG độ dài → CÙNG tên file: tiến trình
  // A ghi, B ghi đè, A import xong xoá, rồi B import vào chỗ trống và ngã
  // `ENOENT ... __tmp_render_ChuyenKhoan.jsx_15965.mjs`.
  //
  // Đúng loại lỗi tệ nhất để bỏ qua: nó hỏng theo NHỊP MÁY chứ không theo mã,
  // nên chạy lại là xanh, và rất dễ bị coi là "máy dở" rồi cho qua. Đã gặp thật
  // 27/08. `pid` tách hai tiến trình, bộ đếm tách hai lượt trong cùng tiến trình.
  const tam = path.resolve('tests/helpers', `__tmp_render_${path.basename(duong)}_${process.pid}_${soLuotNap += 1}.mjs`);
  fs.writeFileSync(tam, chunk.code, 'utf8');
  try {
    return await import(pathToFileURL(tam).href);
  } finally {
    fs.rmSync(tam, { force: true });
  }
}

/**
 * Vẽ một element ra HTML tĩnh. Ném lỗi NGUYÊN VĂN nếu lần vẽ đầu nổ — đó chính
 * là thứ đáng giá nhất ở đây, nên không bọc lại cho đẹp.
 */
export function veRa(element) {
  return renderToStaticMarkup(element);
}

/**
 * Cắm các API của trình duyệt mà component đọc NGAY lúc vẽ (không phải trong
 * useEffect). Cắm TỐI THIỂU và cắm THẬT: `localStorage` ở đây là một Map thật,
 * không phải hàm rỗng trả về null — hàm rỗng làm mọi nhánh "đã lưu gì đó" không
 * bao giờ được chạy, tức test xanh mà chưa đi qua đường thật.
 */
export function camGlobalTrinhDuyet() {
  const kho = new Map();
  const storage = {
    getItem: (k) => (kho.has(String(k)) ? kho.get(String(k)) : null),
    setItem: (k, v) => kho.set(String(k), String(v)),
    removeItem: (k) => kho.delete(String(k)),
    clear: () => kho.clear(),
    key: (i) => [...kho.keys()][i] ?? null,
    get length() { return kho.size; },
  };
  globalThis.localStorage = storage;
  globalThis.sessionStorage = storage;
  // `window` — app này chạy 100% ở trình duyệt (không có SSR), nên `window` LUÔN
  // tồn tại lúc chạy thật. Cắm nó ở đây không phải che lỗi, mà là dựng lại đúng
  // môi trường thật; nếu không cắm thì `AccessGate` (đọc `window.location.search`
  // để nhận mã kích hoạt từ URL) báo "window is not defined" — một lỗi CỦA PHÉP
  // ĐO, không phải của app. Để `search` rỗng = người vào bằng đường thường.
  if (!globalThis.window) globalThis.window = globalThis;
  if (!globalThis.location) globalThis.location = { search: '', href: 'http://localhost/', pathname: '/' };
  globalThis.window.location = globalThis.location;
  globalThis.window.open = () => null;
  if (!globalThis.matchMedia) {
    globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  }
  return { kho, storage };
}
