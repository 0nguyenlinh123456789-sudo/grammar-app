// File: tests/thoi_gian_hoc.test.js
// GHIM ĐỒNG HỒ HỌC.
//
// Trước bản này app KHÔNG đo thời gian thật một giây nào, nên mọi con số
// "~45 phút", "~587 giờ cộng dồn" là ước lượng tĩnh không ai kiểm được. Một
// con số không có cách nào sai thì cũng không có cách nào đúng.
//
// Nhưng một đồng hồ đo sai còn tệ hơn không có đồng hồ, vì con số của nó ĐI VÀO
// BÁO CÁO PHỤ HUYNH. Nên ở đây ghim đúng những cách nó hỏng:
//   1. tab quên đóng qua đêm → 8 giờ "học";
//   2. máy ngủ dậy / đồng hồ hệ thống nhảy → một nhịp khổng lồ;
//   3. gọi sai tên: đo "mở app có tương tác" rồi in ra là "thời gian học".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function dungKhoGia() {
  const kho = new Map();
  globalThis.localStorage = {
    getItem: (k) => (kho.has(k) ? kho.get(k) : null),
    setItem: (k, v) => kho.set(k, String(v)),
    removeItem: (k) => kho.delete(k),
  };
  return kho;
}

const nap = async () => {
  dungKhoGia();
  return import(`../src/utils/thoiGianHoc.js?t=${Math.random()}`);
};

test('cộng nhịp và đọc lại đúng bằng thứ đã cộng', async () => {
  const m = await nap();
  assert.equal(m.tongGiay(), 0);
  m.themNhip(15);
  m.themNhip(15);
  assert.equal(m.docNgay(), 30);
  assert.equal(m.tongGiay(), 30);
  assert.equal(m.soNgayCoHoc(), 1);
});

test('nhịp âm, nhịp rác, nhịp KHỔNG LỒ đều không vào sổ', async () => {
  const m = await nap();
  m.themNhip(-100);
  m.themNhip(NaN);
  m.themNhip('mười lăm');
  assert.equal(m.tongGiay(), 0, 'nhịp rác vẫn lọt vào sổ');

  // Máy ngủ 3 tiếng rồi dậy: `Date.now()` nhảy một phát 10.800 giây. Nếu chỗ
  // cất số tin con số đó thì một giấc ngủ trưa thành ba giờ học.
  m.themNhip(10800);
  assert.ok(m.tongGiay() <= m.NHIP_GIAY * 4,
    `một nhịp 3 tiếng vào sổ nguyên vẹn (${m.tongGiay()}s) — máy ngủ dậy sẽ đẻ ra giờ học`);
});

test('có TRẦN mỗi ngày — tab quên đóng qua đêm không đẻ ra ngày học 24 tiếng', async () => {
  const m = await nap();
  for (let i = 0; i < 24 * 60 * 4; i++) m.themNhip(m.NHIP_GIAY);
  assert.equal(m.docNgay(), m.TRAN_MOI_NGAY_GIAY);
  assert.ok(m.TRAN_MOI_NGAY_GIAY <= 12 * 3600, 'trần mỗi ngày quá cao thì nó không chặn được gì');
});

test('sổ hỏng / bị sửa tay trong localStorage không làm vỡ phép đọc', async () => {
  const kho = dungKhoGia();
  const m = await import(`../src/utils/thoiGianHoc.js?t=${Math.random()}`);
  for (const rac of ['[1,2,3]', 'khong-phai-json', 'null', '"chuoi"']) {
    kho.set(m.THOI_GIAN_HOC_KEY, rac);
    assert.doesNotThrow(() => m.tongGiay(), `sổ = ${rac} làm vỡ tongGiay()`);
    assert.equal(m.tongGiay(), 0);
  }
});

test('ngày khác nhau vào ô khác nhau, và giayGanDay cộng đúng cửa sổ', async () => {
  const m = await nap();
  const homNay = m.ngayHomNay();
  const homQua = m.ngayHomNay(new Date(Date.now() - 86400000));
  const camLau = m.ngayHomNay(new Date(Date.now() - 40 * 86400000));
  // Giá trị phải nằm trong trần một nhịp (4 × NHỊP), nếu không chính phép kẹp
  // ở test trên sẽ cắt bớt và test này đo nhầm chuyện.
  m.themNhip(60, homNay);
  m.themNhip(45, homQua);
  m.themNhip(30, camLau);
  assert.equal(m.tongGiay(), 60 + 45 + 30);
  assert.equal(m.giayGanDay(7), 105, '7 ngày qua phải bỏ qua bản ghi 40 ngày trước');
  assert.equal(m.soNgayCoHoc(), 3);
});

// ══ PHÉP SO VỚI ƯỚC LƯỢNG — việc chính của cả bộ này ═══════════════════════
test('chưa đủ dữ liệu thì KHÔNG kết luận gì, thay vì kết luận trên 5 phút dùng thử', async () => {
  const m = await nap();
  assert.equal(m.doVoiUocLuong(600, 300), null, '5 phút dùng thử mà đã dám so với ước lượng');
  assert.equal(m.doVoiUocLuong(0, 99999), null, 'không có ước lượng thì không so được với gì');
  assert.equal(m.doVoiUocLuong(-5, 99999), null);
});

test('so đúng chiều, và mức giữa đủ RỘNG để không báo động giả', async () => {
  const m = await nap();
  // Ước lượng 100 phút, đo được 100 phút → sát.
  assert.equal(m.doVoiUocLuong(100, 100 * 60).nhan, 'sat');
  // Lệch 20% vẫn là ước lượng tốt. Gắn cờ cho nó là tạo báo động giả.
  assert.equal(m.doVoiUocLuong(100, 120 * 60).nhan, 'sat');
  assert.equal(m.doVoiUocLuong(100, 80 * 60).nhan, 'sat');
  // Gấp đôi / một nửa thì đáng nói.
  assert.equal(m.doVoiUocLuong(100, 200 * 60).nhan, 'cham hon');
  assert.equal(m.doVoiUocLuong(100, 40 * 60).nhan, 'nhanh hon');
});

// ══ BỘ CHẠY ════════════════════════════════════════════════════════════════
// BẢN ĐẦU CỦA TEST NÀY CHẠY LẠI MỘT BẢN SAO CỦA CHÍNH LOGIC ĐANG ĐO.
// Nó viết lại vòng `if visible / if chạm gần đây` ngay trong test rồi gọi bản
// sao đó — nên nó xanh kể cả khi `dongHoHoc.js` bị xoá sạch điều kiện. Đo bản
// sao của mình thì đo được mình chép đúng, không đo được mã có đúng.
//
// Nay dùng đồng hồ giả của node:test để lái ĐÚNG `setInterval` thật bên trong
// `batDongHoHoc`, và bắt đúng cái hàm đó quyết định cộng hay không cộng.
test('đồng hồ KHÔNG chạy khi tab bị ẩn, và KHÔNG chạy khi người dùng đã rời đi', async (t) => {
  dungKhoGia();
  const tg = await import(`../src/utils/thoiGianHoc.js?t=${Math.random()}`);

  // Trình duyệt giả tối thiểu: đủ để bộ chạy gắn vào.
  let trangThai = 'visible';
  globalThis.document = {
    get visibilityState() { return trangThai; },
    addEventListener: () => {},
    removeEventListener: () => {},
  };
  globalThis.window = { addEventListener: () => {}, removeEventListener: () => {} };

  let gio = 1_000_000;
  t.mock.timers.enable({ apis: ['setInterval'] });
  const { batDongHoHoc } = await import(`../src/utils/dongHoHoc.js?t=${Math.random()}`);
  const tat = batDongHoHoc({ bayGio: () => gio });

  const mot = tg.NHIP_GIAY * 1000;

  // Tab hiện, vừa chạm (mốc chạm đặt lúc bật) → phải cộng.
  t.mock.timers.tick(mot);
  assert.equal(tg.tongGiay(), tg.NHIP_GIAY, 'tab hiện + vừa chạm mà không đếm');

  // Tab bị ẩn → không cộng, dù nhịp vẫn nổ.
  trangThai = 'hidden';
  t.mock.timers.tick(mot * 2);
  assert.equal(tg.tongGiay(), tg.NHIP_GIAY, 'tab bị ẩn mà đồng hồ vẫn chạy');

  // Hiện lại nhưng không chạm gì suốt 2 phút → không cộng.
  trangThai = 'visible';
  gio += (tg.IM_LANG_TOI_DA_GIAY + 30) * 1000;
  t.mock.timers.tick(mot * 2);
  assert.equal(tg.tongGiay(), tg.NHIP_GIAY,
    'không chạm gì suốt 2 phút mà vẫn tính là đang học — tab quên đóng sẽ đẻ ra giờ');

  // Tắt rồi thì nhịp phải im hẳn.
  tat();
  gio += 1000;
  t.mock.timers.tick(mot * 4);
  assert.equal(tg.tongGiay(), tg.NHIP_GIAY, 'gọi hàm tắt rồi mà đồng hồ vẫn chạy');

  t.mock.timers.reset();
  delete globalThis.document;
  delete globalThis.window;
});

test('đồng hồ được BẬT THẬT trong App, không phải chỉ tồn tại trong utils', () => {
  const app = readFileSync('src/App.jsx', 'utf8');
  assert.ok(/batDongHoHoc/.test(app),
    'App không bật đồng hồ — cả bộ đo này sẽ không bao giờ ghi được một giây nào');
});

// ══ GỌI ĐÚNG TÊN ═══════════════════════════════════════════════════════════
// App đo được "tab đang hiện và có người chạm vào". Nó KHÔNG biết người đó có
// đang học hay không: mở app rồi ngồi nhìn cũng được tính, học trên giấy rồi vào
// gõ đáp án thì không. In con số đó ra dưới nhãn "thời gian học" là biến một
// phép đo thật thành một tuyên bố sai.
test('báo cáo gọi ĐÚNG TÊN thứ đo được, và nói ra cái nó KHÔNG biết', () => {
  const rp = readFileSync('src/components/progress/LearningReport.jsx', 'utf8');
  assert.ok(/Đã mở app có tương tác/.test(rp), 'báo cáo không hiện con số thời gian nào');
  assert.ok(/không biết/.test(rp),
    'báo cáo phải nói thẳng rằng app KHÔNG biết người dùng có đang học hay không');
  assert.ok(/học trên giấy/.test(rp),
    'phải nói rõ thời gian học ngoài app không được tính, nếu không người học tưởng con số này là toàn bộ công sức của họ');

  // Nhãn hiện ra cho người đọc không được là "thời gian học" trần.
  const nhanSai = rp.match(/(label|>)\s*["'>]?\s*Thời gian học\s*[<"']/);
  assert.equal(nhanSai, null, 'có nhãn "Thời gian học" — app không đo được thứ đó');
});
