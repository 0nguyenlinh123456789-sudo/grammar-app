// BÀI KIỂM ĐƠN VỊ CHO src/utils/docTiengAnh.js.
//
// Tệp này ra đời tuần này và tới giờ CHƯA CÓ phép kiểm nào chạy thật nó — mấy
// bài kiểm hiện có chỉ dò CHUỖI trong mã nguồn ("có nhánh KHONG_CO_GIONG
// không"), tức là kiểm rằng dòng chữ còn đó, không kiểm rằng nó chạy đúng.
//
// Chỗ nó quyết định là chỗ đắt nhất: chọn sai giọng thì app đọc tiếng Anh bằng
// bộ máy tiếng Việt và người học học đúng cái phát âm sai đó — không lỗi, không
// cảnh báo, không ai biết.

import test from 'node:test';
import assert from 'node:assert/strict';

// Bộ đọc giả. `getVoices` trả về đúng thứ ta đặt, `speak` ghi lại lượt gọi.
function datBoDoc(dsGiong, { nemKhiLayGiong = false } = {}) {
  const daDoc = [];
  const nghe = {};
  // Trong trình duyệt `window === globalThis`, nên `SpeechSynthesisUtterance`
  // phải nằm trên CẢ HAI. Bản giả đầu chỉ đặt ở `globalThis`, và vì Node tách
  // hai thứ đó nên nó dựng ra một trình duyệt không tồn tại.
  const Loi = function (t) { this.text = t; };
  globalThis.SpeechSynthesisUtterance = Loi;
  globalThis.window = {
    SpeechSynthesisUtterance: Loi,
    speechSynthesis: {
      getVoices: () => { if (nemKhiLayGiong) throw new Error('bị chặn'); return dsGiong; },
      speak: (u) => daDoc.push({ chu: u.text, lang: u.lang, giong: u.voice, nhipDo: u.rate }),
      cancel: () => daDoc.push({ huy: true }),
      addEventListener: (t, f) => { nghe[t] = f; },
      removeEventListener: (t) => { delete nghe[t]; },
    },
  };
  return { daDoc, nghe };
}
function donDep() {
  delete globalThis.window;
  // `delete` gỡ được cả getter đã định nghĩa vì chúng đều `configurable: true`.
  delete globalThis.SpeechSynthesisUtterance;
}

const g = (lang, name = lang) => ({ lang, name });
const nap = () => import('../src/utils/docTiengAnh.js');

test('chọn ĐÚNG mã vùng khi máy có nó', async () => {
  datBoDoc([g('vi-VN'), g('en-US'), g('en-GB')]);
  const { chonGiongAnh } = await nap();
  assert.equal(chonGiongAnh('en-GB').lang, 'en-GB');
  donDep();
});

test('không có đúng mã vùng thì lấy giọng en-* khác, KHÔNG lấy giọng khác ngôn ngữ', async () => {
  // Sai accent còn hơn đọc bằng bộ máy tiếng Việt: /zed/ với /ziː/ chỉ khác
  // accent, còn "book" đọc bằng vi-VN thì ra "bốc".
  datBoDoc([g('vi-VN'), g('en-AU')]);
  const { chonGiongAnh } = await nap();
  assert.equal(chonGiongAnh('en-GB').lang, 'en-AU');
  donDep();
});

test('MÁY CHỈ CÓ GIỌNG VIỆT → trả null, KHÔNG rơi về giọng mặc định', async () => {
  // Đây là ca thật trên máy Android bán ở Việt Nam, và là lý do tệp tồn tại.
  datBoDoc([g('vi-VN'), g('vi-VN-x-low')]);
  const { chonGiongAnh, docTo } = await nap();
  assert.equal(chonGiongAnh('en-GB'), null);
  const kq = docTo('book', { giong: 'en-GB' });
  assert.equal(kq.ok, false, 'vẫn đọc dù không có giọng tiếng Anh — người học nghe "bốc"');
  assert.equal(kq.loi, 'khong-co-giong');
  donDep();
});

test('không đọc thì cũng KHÔNG gọi speak() — nửa vời còn tệ hơn', async () => {
  const { daDoc } = datBoDoc([g('vi-VN')]);
  const { docTo } = await nap();
  docTo('book', { giong: 'en-GB' });
  assert.deepEqual(daDoc, [], 'đã gọi speak() dù báo không đọc được');
  donDep();
});

test('gạch dưới và chữ hoa trong mã ngôn ngữ vẫn khớp (Android trả en_GB)', async () => {
  datBoDoc([g('en_GB')]);
  const { chonGiongAnh } = await nap();
  assert.equal(chonGiongAnh('en-GB').lang, 'en_GB', 'en_GB của Android bị coi là ngôn ngữ khác');
  donDep();
});

test('danh sách giọng RỖNG (chưa nạp xong) thì báo, không đoán', async () => {
  datBoDoc([]);
  const { chonGiongAnh, docTo } = await nap();
  assert.equal(chonGiongAnh('en-GB'), null);
  assert.equal(docTo('book').ok, false);
  donDep();
});

test('trình duyệt CHẶN getVoices (ném) thì không làm sập trang', async () => {
  // Cùng họ với lỗi "trình duyệt chặn lưu" đã làm trắng cả app: cái chốt tự nó
  // phải an toàn, không được để một getter ném xuyên qua.
  datBoDoc([g('en-GB')], { nemKhiLayGiong: true });
  const { chonGiongAnh, docTo } = await nap();
  assert.equal(chonGiongAnh('en-GB'), null);
  assert.equal(docTo('book').ok, false);
  donDep();
});

test('đọc được thì gán ĐÚNG giọng và ĐÚNG lang, có huỷ lượt đang đọc trước', async () => {
  const { daDoc } = datBoDoc([g('en-GB')]);
  const { docTo } = await nap();
  const kq = docTo('think', { giong: 'en-GB' });
  assert.equal(kq.ok, true);
  assert.equal(kq.giong, 'en-GB');
  assert.deepEqual(daDoc[0], { huy: true }, 'không huỷ lượt trước — hai từ chồng tiếng lên nhau');
  assert.equal(daDoc[1].chu, 'think');
  assert.equal(daDoc[1].lang, 'en-GB');
  assert.equal(daDoc[1].giong.lang, 'en-GB', 'chỉ đặt lang mà không đặt voice là để hệ thống tự chọn lại');
  donDep();
});

test('chuỗi rỗng hoặc toàn khoảng trắng thì không đọc', async () => {
  const { daDoc } = datBoDoc([g('en-GB')]);
  const { docTo } = await nap();
  assert.equal(docTo('').ok, false);
  assert.equal(docTo('   ').ok, false);
  assert.deepEqual(daDoc, []);
  donDep();
});

test('theoDoiGiong gọi NGAY một lần rồi mới chờ sự kiện', async () => {
  // `voiceschanged` có thể đã nổ TRƯỚC khi component gắn vào. Chỉ ngồi chờ thì
  // trên máy nạp giọng nhanh, panel đứng mãi ở "đang tìm giọng".
  const { nghe } = datBoDoc([g('en-GB')]);
  const { theoDoiGiong } = await nap();
  let dem = 0;
  const go = theoDoiGiong(() => { dem += 1; });
  assert.equal(dem, 1, 'không gọi ngay lần đầu — panel treo ở trạng thái đang dò');
  nghe.voiceschanged();
  assert.equal(dem, 2, 'không phản ứng khi trình duyệt nạp xong danh sách giọng');
  go();
  assert.equal(nghe.voiceschanged, undefined, 'không gỡ trình nghe — rò bộ nhớ mỗi lần mở panel');
  donDep();
});

test('nhãn accent nói đúng thứ vừa đọc', async () => {
  datBoDoc([g('en-GB')]);
  const { nhanAccent } = await nap();
  assert.equal(nhanAccent('en-GB'), 'Anh-Anh');
  assert.equal(nhanAccent('en_US'), 'Anh-Mỹ');
  assert.equal(nhanAccent('en-AU'), 'Anh-Úc');
  assert.equal(nhanAccent('vi-VN'), '', 'gắn nhãn accent tiếng Anh cho một giọng không phải tiếng Anh');
  assert.equal(nhanAccent(null), '');
  donDep();
});

test('không có bộ đọc thì mọi lối đều trả về êm, không ném', async () => {
  delete globalThis.window;
  delete globalThis.SpeechSynthesisUtterance;
  const { docDuoc, docTo, chonGiongAnh, ngungDoc, theoDoiGiong } = await nap();
  assert.equal(docDuoc(), false);
  assert.equal(chonGiongAnh('en-GB'), null);
  assert.equal(docTo('book').loi, 'khong-ho-tro');
  ngungDoc();
  let goi = 0;
  const go = theoDoiGiong(() => { goi += 1; });
  assert.equal(goi, 1, 'không báo lần nào thì giao diện đứng ở "đang tìm giọng" vĩnh viễn');
  go();
});

// ── GETTER NÉM: CÁI CHỐT TỰ NÓ PHẢI AN TOÀN ────────────────────────────────
// Cùng họ với lỗi đã làm TRẮNG CẢ APP hồi 09/2026: `typeof localStorage` được
// viết ra CHÍNH ĐỂ an toàn mà vẫn gọi getter, và getter ném.
//
// Ở đây `docDuoc()` dùng toán tử `in` — KHÔNG gọi getter, nên nó trả về true
// trên một trình duyệt chặn bộ đọc bằng cách cho getter ném. Mọi lối sau đó
// truy cập `window.speechSynthesis` phải nằm TRONG try, nếu không ngoại lệ nổ
// ra giữa một useEffect và React gỡ cả nhánh — panel thành khoảng trắng.
function datGetterNem() {
  globalThis.window = {};
  // ⚠️ CẢ HAI tên đều là getter ném, không chỉ `speechSynthesis`.
  // Bản đầu của bản giả này chỉ cho `speechSynthesis` ném và đặt
  // `SpeechSynthesisUtterance` làm giá trị thường — nên nó KHÔNG bắt được rằng
  // `typeof SpeechSynthesisUtterance` trong `docDuoc()` cũng đứng ngoài try.
  // `typeof` chỉ an toàn với tên CHƯA TỪNG khai; tên có trên `window` thì
  // `typeof` vẫn phân giải thuộc tính và vẫn CHẠY getter. Đúng bài học
  // `typeof localStorage` hồi 09/2026 — và tôi vừa dính lại nó.
  for (const ten of ['speechSynthesis', 'SpeechSynthesisUtterance']) {
    const dinhNghia = { get() { throw new Error('trình duyệt chặn bộ đọc'); }, configurable: true };
    Object.defineProperty(globalThis.window, ten, dinhNghia);
    Object.defineProperty(globalThis, ten, dinhNghia);
  }
}

test('getter speechSynthesis NÉM thì mọi lối vẫn trả về êm', async () => {
  datGetterNem();
  const { docDuoc, chonGiongAnh, docTo, ngungDoc, theoDoiGiong } = await nap();
  // Bản đầu của bài kiểm này khẳng định `docDuoc()` trả về TRUE ở đây, và ghi
  // đó là "chỗ cái chốt lọt lưới". Nay chốt đã được vá nên kỳ vọng đổi theo:
  // nói rõ là ĐỔI KỲ VỌNG VÌ HÀNH VI ĐÚNG LÊN, không phải nới cho qua.
  assert.equal(docDuoc(), false, 'chốt vẫn dừng ở toán tử `in` nên báo có bộ đọc trong khi không dùng được');
  assert.equal(chonGiongAnh('en-GB'), null);
  // Và vì chốt nói thật, thông báo cũng đúng nguyên nhân: KHÔNG được khuyên
  // người học đi cài giọng khi thật ra trình duyệt chặn bộ đọc.
  assert.equal(docTo('book').loi, 'khong-ho-tro',
    'báo "chưa cài giọng tiếng Anh" cho một máy bị CHẶN bộ đọc — người học đi làm việc không liên quan');
  ngungDoc();

  // Đây là lối chưa được bọc: nó chạy trong useEffect của NghePhatAm.
  let goi = 0;
  let go;
  assert.doesNotThrow(() => { go = theoDoiGiong(() => { goi += 1; }); },
    'theoDoiGiong ném xuyên qua — ngoại lệ trong useEffect làm React gỡ cả panel');
  assert.equal(goi, 1, 'không báo lần nào thì giao diện đứng mãi ở "đang tìm giọng"');
  assert.doesNotThrow(() => go(), 'hàm gỡ theo dõi cũng ném');
  donDep();
});

// ── ĐẾM ĐƯỢC VIỆC CÒN LẠI: 11 TỆP VẪN TỰ GỌI BỘ ĐỌC ───────────────────────
// Chú thích đầu `docTiengAnh.js` viết "VÌ SAO GOM VỀ MỘT CHỖ", nhưng đợt tạo ra
// nó chỉ nối MỘT nơi gọi — panel A0. Mười một tệp còn lại vẫn dựng thẳng
// `SpeechSynthesisUtterance`, và **không tệp nào gán `u.voice`** (đếm được:
// 0/11). Chúng chỉ đặt `u.lang = 'en-US'`, mà `lang` là LỜI ĐỀ NGHỊ chứ không
// phải lựa chọn: máy không có giọng `en-*` thì bộ máy tiếng Việt vẫn đọc, không
// lỗi, không cảnh báo. Đó chính là ca mà tệp này sinh ra để chặn — và nó đang
// xảy ra ở đúng những màn hình được dùng nhiều nhất (từ vựng, luyện nghe,
// trò chơi), chứ không phải ở panel A0 mới.
//
// DANH SÁCH NÀY CHỈ ĐƯỢC PHÉP NGẮN ĐI. Nó là phép đếm việc còn lại, đúng luật
// "lưới an toàn phải có phép đếm" — bản đầu chỉ ghi bằng chú thích, và chú
// thích thì không bao giờ đỏ.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const GOC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// ĐÃ DỌN HẾT 21/09. Danh sách rỗng KHÔNG phải là chỗ trống chờ điền — nó là
// phép đếm việc còn lại, và con số đó nay bằng 0. Thêm một nơi gọi mới ngoài
// `docTiengAnh.js` là bài kiểm dưới ĐỎ ngay, kèm tên tệp.
const CHUA_DON = [];

// Bóc chú thích trước khi dò. `ThieuGiongAnhBanner.jsx` TRÍCH LẠI dòng mã cũ
// trong phần giải thích của nó, và bản đầu của bài kiểm này kết luận nó là "nơi
// gọi bộ đọc mới". Cùng bẫy đã ghi trong sổ: phép đo đọc trúng chú thích, và
// bài kiểm đỏ trên chính bản đã vá.
const bocChuThich = (s) => String(s)
  .replace(/\/\*[\s\S]*?\*\//g, ' ')
  .replace(/^[ 	]*\/\/.*$/gm, ' ');

function quet(thuMuc, ds = []) {
  for (const t of fs.readdirSync(path.join(GOC, thuMuc), { withFileTypes: true })) {
    const p = `${thuMuc}/${t.name}`;
    if (t.isDirectory()) quet(p, ds);
    else if (/\.(jsx?|mjs)$/.test(t.name)) ds.push(p);
  }
  return ds;
}

test('chỉ docTiengAnh.js được dựng SpeechSynthesisUtterance — số còn lại chỉ được GIẢM', () => {
  const con = quet('src').filter((f) => {
    if (f === 'src/utils/docTiengAnh.js') return false;
    return /new (?:window\.)?SpeechSynthesisUtterance/.test(bocChuThich(fs.readFileSync(path.join(GOC, f), 'utf8')));
  });

  const moi = con.filter((f) => !CHUA_DON.includes(f));
  assert.deepEqual(moi, [],
    'nơi gọi bộ đọc MỚI nằm ngoài docTiengAnh.js: nó sẽ đọc tiếng Anh bằng bộ máy tiếng Việt trên máy chỉ có giọng vi-VN:\n  ' + moi.join('\n  '));

  assert.ok(con.length <= CHUA_DON.length,
    `số nơi chưa dọn tăng từ ${CHUA_DON.length} lên ${con.length}`);
  if (con.length < CHUA_DON.length) {
    const daDon = CHUA_DON.filter((f) => !con.includes(f));
    assert.fail(`ĐÃ DỌN ${daDon.length} tệp — hãy bỏ chúng khỏi CHUA_DON để phép đếm nói đúng việc còn lại:\n  ${daDon.join('\n  ')}`);
  }
});

test('mọi nơi đọc tiếng Anh đều đi qua docTo — phép đếm còn lại bằng 0', () => {
  // Bản đầu của bài kiểm này duyệt CHUA_DON để chắc rằng mỗi tệp trong đó
  // THẬT SỰ dính lỗi (không tự gán `u.voice`). Danh sách nay rỗng nên nó không
  // còn kiểm gì — thay bằng phép đếm ở chiều ngược lại: đếm số nơi gọi `docTo`.
  //
  // Vì sao cần: nếu ai đó gỡ `docTo` ở một màn hình và quay về đọc thẳng bằng
  // API trình duyệt, bài kiểm trên bắt được. Nhưng nếu họ chỉ XOÁ lời gọi đi
  // (nút nghe thành nút chết) thì không phép kiểm nào kêu.
  const dung = quet('src').filter((f) => f !== 'src/utils/docTiengAnh.js'
    && /docTo\(/.test(fs.readFileSync(path.join(GOC, f), 'utf8')));
  assert.ok(dung.length >= 11,
    `chỉ còn ${dung.length} màn hình gọi docTo (mốc 11) — có nút nghe vừa thành nút chết:\n  ` + dung.join('\n  '));
});
