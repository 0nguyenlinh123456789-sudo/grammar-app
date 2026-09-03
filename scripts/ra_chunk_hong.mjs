// File: scripts/ra_chunk_hong.mjs
//
//   npm run ra:chunkhong
//
// CHẶN ĐÚNG MỘT MẢNH MÃ, RỒI ĐO XEM NGƯỜI HỌC THẬT SỰ NHÌN THẤY GÌ.
//
// ══ VÌ SAO CẦN BỘ RÀ NÀY, TRONG KHI ĐÃ CÓ 12 PHÉP KIỂM ══
// `tests/tai_chunk.test.js` kiểm được logic thử lại và kiểm được rằng mã nguồn
// có bọc `nhapLai`/`MoPanel`. Nó KHÔNG kiểm được thứ duy nhất đáng giá: khi một
// tệp .js thật sự không tải được thì màn hình đổi thành cái gì. Câu trả lời cũ
// là "cả app bị thay bằng lưới lỗi gốc" — và không phép kiểm đơn vị nào bắt
// được điều đó, vì nó chỉ xảy ra khi React thật sự ném lúc vẽ.
//
// ══ CÁCH ĐO ══
// `Network.setBlockedURLs` chặn thẳng ở tầng mạng của Chrome, nên `import()`
// hỏng đúng như khi máy chủ trả 404 — đã đo được 404 THẬT trên bản live cho một
// tên băm cũ (xem đầu src/utils/taiChunk.js).
//
// ══ ĐỌC KẾT QUẢ CHO ĐÚNG: BƯỚC NÀO CHỨNG MINH ĐIỀU GÌ ══
// LƯỢT 1 chứng minh ĐƯỜNG TỰ TẢI LẠI có chạy. Nó KHÔNG chứng minh lưới đỡ vẽ
// ra được gì: sau `location.reload()` màn hình là trang chủ, nên "không có màn
// crash gốc" và "còn 363 nút" đúng một cách hiển nhiên. Gieo lại lỗi cũ (bỏ
// ChunkBoundary) thì bước này ĐỎ — tức nó phân biệt được, nhưng nhờ phép gieo
// chứ không nhờ chính lời khẳng định. Đừng đọc nó rộng hơn thế.
// LƯỢT 2 mới là bước chứng minh LƯỚI ĐỠ VẼ RA LỜI BÁO: lượt tự tải lại đã dùng
// hết, nên thứ còn lại trên màn hình chỉ có thể do ChunkBoundary vẽ.
//
// ══ ĐIỀU BỘ RÀ NÀY KHÔNG CHỨNG MINH ══
// Nó chặn từ phía trình duyệt, không phải từ máy chủ Vercel. Nó chứng minh app
// CHỊU ĐƯỢC một mảnh mã không tải được; nó không chứng minh Vercel giữ lại tệp
// cũ sau khi đẩy bản mới (Vercel KHÔNG giữ — chính vì thế mới cần lớp này).

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

const may = await moMayChuXemTruoc({ cong: 4337 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9351 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

/** Chữ đang hiện trên màn hình, gộp lại để dò. */
const CHU_TREN_MAN = '(document.body.innerText || "")';

/** Khung app còn không? Thanh điều hướng biến mất nghĩa là lưới GỐC đã nuốt cả trang. */
const KHUNG_CON_SONG = `(() => {
  const t = document.body.innerText || '';
  return {
    manCrashGoc: t.includes('Thỏ vấp phải một lỗi'),
    manChunk: t.includes('Chưa tải được phần này') || t.includes('Mất mạng nên chưa tải được'),
    conNut: [...document.querySelectorAll('button, a')].length,
    conTaiLai: [...document.querySelectorAll('button')].some((b) => (b.innerText || '').includes('Tải lại trang')),
  };
})()`;

try {
  await t.diToi(`${may.BASE}/`);
  await nghi(2500);
  ghi('mở được trang chủ khi chưa chặn gì', await t.danhGia(`${CHU_TREN_MAN}.length > 200`));

  // ── CHẶN MẢNH MÃ CỦA TRANG TRÒ CHƠI ──────────────────────────────────────
  // Chọn GamesPage vì nó là một tuyến riêng, chưa được tải lúc mở trang chủ —
  // đúng tình huống "người học bấm sang một trang chưa mở lần nào sau khi web
  // vừa đẩy bản mới".
  await t.goi('Network.setBlockedURLs', { urls: ['*GamesPage*'] });
  ghi('đã chặn được mảnh mã GamesPage ở tầng mạng', true);

  const bam1 = await t.danhGia(BAM_THEO_CHU('GAMES'));
  ghi('bấm được vào mục Games', bam1 === true, bam1 ? '' : 'không tìm thấy nút — bộ rà đang tự bẫy, không phải app hỏng');
  // Chờ dư: `nhapLai` thử lại 2 lượt (0,3s + 0,8s) rồi mới chịu hỏng.
  await nghi(6000);

  // ── LƯỢT MỘT: app ĐƯỢC PHÉP tự tải lại trang, và người học không thấy lỗi nào ──
  // Đó là cách xử lý đúng cho trường hợp thường gặp nhất (vừa đẩy bản mới): tải
  // lại là index.html mới mang tên băm mới, xong. Nên ở lượt này ta chỉ đòi MỘT
  // điều: KHÔNG được rơi xuống lưới lỗi gốc.
  const mot = await t.danhGia(KHUNG_CON_SONG);
  ghi('lượt 1: mảnh mã hỏng KHÔNG kéo cả app xuống lưới lỗi gốc', mot.manCrashGoc === false,
    mot.manCrashGoc ? 'màn "Thỏ vấp phải một lỗi" đã chiếm cả trang — đúng lỗi đợt này đi sửa' : '');
  ghi('lượt 1: khung app vẫn còn, không trắng trang', mot.conNut > 3, `còn ${mot.conNut} nút/liên kết`);
  const daTuTai = await t.danhGia("sessionStorage.getItem('bunnyChunkReloadV1') === '1'");
  ghi('lượt 1: đã dùng đúng MỘT lượt tự tải lại và ghi cờ lại', daTuTai === true,
    daTuTai ? '' : 'không thấy cờ — hoặc chưa tự tải lại, hoặc chốt chống lặp không ghi được');

  // ── LƯỢT HAI: hết lượt tự tải lại, giờ BẮT BUỘC phải BÁO cho người học ──────
  // Đây là nhánh dễ bị bỏ quên nhất: tải lại một lần không xong thì phải có
  // người nói cho người học biết, không được im lặng quay về trang chủ mãi.
  await t.danhGia(BAM_THEO_CHU('GAMES'));
  await nghi(6000);
  const sau = await t.danhGia(KHUNG_CON_SONG);
  ghi('lượt 2: có lời báo riêng cho việc không tải được mảnh mã', sau.manChunk === true,
    sau.manChunk ? '' : `chữ trên màn: ${String(await t.danhGia(CHU_TREN_MAN)).slice(0, 160).replace(/\s+/g, ' ')}`);
  ghi('lượt 2: lời báo có nút TẢI LẠI TRANG (cách phục hồi duy nhất còn đúng)', sau.conTaiLai === true);
  ghi('lượt 2: vẫn KHÔNG rơi xuống lưới lỗi gốc', sau.manCrashGoc === false);

  // ── BỎ CHẶN RỒI TẢI LẠI: PHẢI TRỞ LẠI BÌNH THƯỜNG ────────────────────────
  // Đây chính là đường thoát mà lời báo mời người học đi. Nếu đi theo lời mời
  // đó mà vẫn hỏng thì lời báo là một lời hứa suông.
  await t.goi('Network.setBlockedURLs', { urls: [] });
  await t.diToi(`${may.BASE}/`);
  await nghi(2500);
  await t.danhGia(BAM_THEO_CHU('GAMES'));
  await nghi(4000);
  const lai = await t.danhGia(KHUNG_CON_SONG);
  ghi('bỏ chặn + tải lại thì vào được trang, đúng như lời báo hứa',
    lai.manChunk === false && lai.manCrashGoc === false);

  // ── LỖI KHÔNG PHẢI DO MẠNG PHẢI ĐI TIẾP XUỐNG LƯỚI GỐC ───────────────────
  // Một lưới bắt tất tay sẽ biến mọi lỗi thật thành câu "chắc do mạng" và giấu
  // mất báo cáo sao chép được của lưới gốc. Ném thẳng một lỗi vào React để xem.
  const nemVaoReact = `(() => {
    const e = new Error('loi that khong phai mang');
    window.dispatchEvent(new ErrorEvent('error', { error: e, message: e.message }));
    return true;
  })()`;
  await t.danhGia(nemVaoReact);
  await nghi(500);
  ghi('lỗi thường KHÔNG bị lưới chunk nuốt thành "lỗi mạng"',
    (await t.danhGia(CHU_TREN_MAN)).includes('Chưa tải được phần này') === false);

  // Lỗi mạng của chính mảnh mã bị chặn là thứ bộ rà CỐ Ý tạo ra — và Chrome báo
  // nó bằng một dòng RỖNG kèm `· Script` (`Network.loadingFailed` do
  // setBlockedURLs không kèm errorText), nên phải loại cả dạng đó.
  const loi = t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING')
    && !(x.loai === 'REQUEST_HONG' && /Script/.test(String(x.text)))
    && !/GamesPage|BLOCKED_BY_CLIENT|dynamically imported|Không tải được mảnh mã|loi that khong phai mang/i.test(String(x.text)));
  ghi('không có lỗi console lạ ngoài đúng cái đã cố ý chặn', loi.length === 0,
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
