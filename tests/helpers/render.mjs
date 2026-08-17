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

/**
 * Gói một file .jsx thành module rồi import về. Trả về đúng module đó.
 * @param {string} duong  đường dẫn tính từ gốc repo, ví dụ 'src/pages/GrammarPage.jsx'
 */
export async function napComponent(duong) {
  const kq = await build({
    input: duong,
    external: NGOAI,
    // `inlineDynamicImports` là BẮT BUỘC, không phải tuỳ chọn cho gọn: trang nào
    // có `import()` động (GrammarPage nạp `aiKey` kiểu đó) sẽ bị tách thành nhiều
    // chunk, và chunk chính đi tìm chunk phụ **cạnh file tạm** — nơi không có gì.
    // Lần chạy đầu của bộ này đỏ đúng vì vậy: `Cannot find module .../aiKey-*.js`.
    output: { format: 'esm', inlineDynamicImports: true },
    write: false,
    logLevel: 'silent',
  });
  const chunk = kq.output.find((o) => o.type === 'chunk');
  if (!chunk) throw new Error(`không gói được ${duong}`);
  const phu = kq.output.filter((o) => o.type === 'chunk').length;
  if (phu > 1) throw new Error(`${duong}: gói ra ${phu} chunk, file tạm sẽ không tìm được chunk phụ`);
  // Ghi vào thư mục tạm CẠNH repo (không phải /tmp) để đường dẫn tương đối trong
  // chunk vẫn giải được, và xoá ngay sau khi import.
  const tam = path.resolve('tests/helpers', `__tmp_render_${path.basename(duong)}_${chunk.code.length}.mjs`);
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
  if (!globalThis.matchMedia) {
    globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  }
  return { kho, storage };
}
