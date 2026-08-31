// File: scripts/khach_dung_het.mjs
//
//   npm run khach:het
//
// ĐÓNG VAI HỌC VIÊN VÀ DÙNG HẾT CÁC KHU VỰC CỦA APP, KHÔNG CHỈ MỞ RA NHÌN.
//
// ══ VÌ SAO CẦN BỘ NÀY KHI ĐÃ CÓ `ra:khach` VÀ `hoc:that` ══
//   · `ra:khach` đi 21 lối vào và chỉ BẤM MỞ — panel hiện ra là đạt.
//   · `hoc:that` làm hết một bài THẬT, nhưng chỉ ở hai chỗ: bài đọc dài và
//     chép chính tả.
// Còn lại — ngữ pháp, từ vựng VSTEP, giáo trình Oxford, trò chơi, ô luyện
// viết, ô luyện nói, thi cuối bậc, sổ tay — chưa có bộ nào ngồi dùng. Đó là
// phần lớn thời gian của một người học thật.
//
// ══ NÓ ĐO GÌ ══
//   1. Vào được không.
//   2. LÀM được không — bấm đúng thứ người học bấm, và có phản hồi.
//   3. **Thiếu điều kiện thì có NÓI RA không.** Luật của dự án: "thiếu dữ liệu
//      thì ẨN hoặc BÁO, tuyệt đối không thay thế âm thầm". Khách chưa có key AI
//      mà bấm chấm bài rồi màn hình quay vòng vô hạn là hỏng, kể cả khi console
//      sạch bong.
//
// ══ BỐN LỖI CỦA CHÍNH BỘ NÀY, ĐỀU BẮT ĐƯỢC Ở LẦN CHẠY ĐẦU ══
// Ghi lại vì chúng là cùng một họ với lỗi selector đã làm tôi chẩn sai nút
// reset, và vì bản đầu của bộ này báo "13/16 đạt" trong khi phần lớn số đó
// không đo cái nó nói là đang đo:
//
//   1. **Khổ màn hình.** Chrome mặc định 800px nên app ở bố cục thu gọn, menu
//      nằm sau nút ba gạch. Phải `Emulation.setDeviceMetricsOverride`.
//   2. **Bấm thứ khách không thấy.** `BAM_THEO_CHU` bấm phần tử ĐẦU TIÊN khớp
//      chữ, kể cả khi nó nằm trong menu đang đóng. Nên bộ này báo "đã mở bài
//      ngữ pháp: IELTS NỀN TẢNG" và "đã vào chủ đề: LỘ TRÌNH" — cả hai là NÚT
//      MENU. Nay chỉ bấm thứ thật sự hiện ra.
//   3. **Tự tay đóng lối đi rồi báo không có lối.** Nó bấm TỪ VỰNG (làm menu
//      con sập xuống) rồi kết luận "không thấy nút OXFORD".
//   4. **Chưa chọn đề đã tìm ô soạn.** Ô luyện viết mở ra là một DANH SÁCH ĐỀ;
//      phải chọn một đề thì ô soạn mới hiện. Bản đầu tìm `textarea` ngay và báo
//      "không tìm thấy ô soạn bài".
//
// Nguyên tắc rút ra, áp cho mọi bộ rà sau: **một bước chỉ được tính là ĐẠT khi
// nó nói được nó đã chạm vào CÁI GÌ.** "Đã mở một bài" mà không in ra tên bài
// thì không phân biệt được với "đã bấm nhầm nút menu".
import {
  moTrinhDuyet, moTab, BAM_THEO_CHU, BAM_DUNG_NHAN, DONG_PANEL,
} from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const may = await moMayChuXemTruoc({ cong: 4357 });
const BASE = may.BASE;
// `microGia`: bộ này có một bước lái THẲNG qua ghi âm (getUserMedia +
// MediaRecorder), nên nó cần một micro. Chỉ bộ này xin — xem ghi chú ở
// `moTrinhDuyet`: bật mặc định thì nó âm thầm gỡ mất phép kiểm "báo lỗi micro
// có chỉ đường gõ tay không" của hoc_that.mjs.
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9337, microGia: true });
const t = await moTab(cong);

/** Chỉ bấm phần tử khách THẬT SỰ nhìn thấy — xem lỗi số 2 ở đầu file. */
const BAM_THAY_DUOC = (chu) => `(() => {
  const hien = (e) => {
    const r = e.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const s = getComputedStyle(e);
    if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) < 0.05) return false;
    return r.right > 0 && r.bottom > 0 && r.left < innerWidth;
  };
  const ds = [...document.querySelectorAll('button, a, [role=button]')]
    .filter((e) => hien(e) && (e.innerText || '').toUpperCase().includes(${JSON.stringify(chu)}.toUpperCase()));
  if (!ds.length) return false;
  ds[0].scrollIntoView({ block: 'center' });
  ds[0].click();
  return (ds[0].innerText || '').trim().replace(/\\s+/g, ' ').slice(0, 46) || 'ĐÃ BẤM';
})()`;

/**
 * Bấm một mục NỘI DUNG, loại trừ mọi nhãn điều hướng. Danh sách cấm là viết
 * tay và đó là điểm yếu đã biết của bộ này — nhưng nó CÓ TRẢ VỀ TÊN mục vừa
 * bấm, nên nhìn nhật ký là biết ngay nó có bấm nhầm menu không.
 */
const BAM_NOI_DUNG = (locChu = '') => `(() => {
  const hien = (e) => { const r = e.getBoundingClientRect(); return r.width > 60 && r.height > 24 && r.left < innerWidth; };
  // RANH GIỚI ĐO ĐƯỢC GIỮA "ĐIỀU KHIỂN" VÀ "NỘI DUNG":
  // trong app này mọi nhãn điều hướng và nút công cụ đều VIẾT HOA TOÀN BỘ
  // ("NGỮ PHÁP", "TÌM TRONG KHÓA HỌC", "MỞ SỔ TAY"), còn tiêu đề nội dung thì
  // luôn có chữ thường ("Unit 1: Talking…", "Hiện Tại Hoàn Thành", "🌍 Xã Hội…").
  // Bản trước dùng danh sách cấm viết tay và trượt ngay: nó bấm ô "TÌM TRONG
  // KHÓA HỌC" rồi báo "đã mở bài ngữ pháp". Một luật đo được thì không phải bổ
  // sung mãi như danh sách cấm.
  //
  // ⚠️ KHÔNG dò chữ thường bằng dải [a-zà-ỹ]: dải đó chạy từ U+00E0 tới U+1EF9
  // nên nó BAO CẢ CHỮ HOA tiếng Việt (Ọ = U+1ECC). "TÌM TRONG KHÓA HỌC" vì thế
  // bị coi là "có chữ thường" và lọt lưới — bộ rà lại bấm đúng ô tìm kiếm rồi
  // báo "đã mở bài ngữ pháp". So với bản viết hoa của chính nó thì đúng ở mọi
  // bảng chữ cái, không phải nhớ dải mã nào.
  const laDieuKhien = (s) => s === s.toUpperCase() && s.length < 40;
  const ds = [...document.querySelectorAll('button')].filter((e) => {
    const s = (e.innerText || '').trim();
    if (!s || !hien(e) || laDieuKhien(s)) return false;
    return ${JSON.stringify(locChu)} ? new RegExp(${JSON.stringify(locChu)}).test(s) : s.length > 8;
  });
  if (!ds.length) return false;
  ds[0].scrollIntoView({ block: 'center' });
  ds[0].click();
  return ds[0].innerText.trim().replace(/\\s+/g, ' ').slice(0, 52);
})()`;

const CHU_TRONG_PANEL = `(() => {
  return [...document.querySelectorAll('.fixed.inset-0')]
    .filter((e) => e.getBoundingClientRect().width > 0)
    .map((e) => e.innerText || '').join('\\n');
})()`;

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};
const cho = (ms) => new Promise((r) => setTimeout(r, ms));
const soLoi = () => t.nhatKy.length;
// Cảnh báo AudioContext là hệ quả của việc chưa có cử chỉ người dùng, không
// phải lỗi app — `hoc:that` cũng loại nó ra.
const LOC = (x) => x.loai !== 'CONSOLE_WARN' && !/AudioContext/i.test(String(x.text));
const loiMoi = (tu) => t.nhatKy.slice(tu).filter(LOC);
const goiLoi = (ds) => ds.map((x) => `${x.loai}: ${String(x.text).slice(0, 120)}`).join(' ; ');

async function khuVuc(ten, viec) {
  const truoc = soLoi();
  let ok = true; let chiTiet = '';
  try { chiTiet = (await viec()) || ''; } catch (e) { ok = false; chiTiet = e.message; }
  const lm = loiMoi(truoc);
  if (lm.length) { ok = false; chiTiet += (chiTiet ? ' | ' : '') + goiLoi(lm); }
  ghi(ten, ok, chiTiet);
  return ok;
}

/** Về trang chủ sạch sẽ, bỏ qua trình hướng dẫn nếu nó hiện lại. */
async function veTrangChu() {
  await t.diToi(BASE); await cho(1500);
  for (const n of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
    await t.danhGia(BAM_THEO_CHU(n)); await cho(350);
  }
}

try {
  // Khách thật dùng màn hình máy tính hoặc điện thoại, không ai dùng 800×600.
  await t.goi('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await t.diToi(BASE);
  await cho(1500);

  await khuVuc('khách mới đi qua trình hướng dẫn', async () => {
    for (const nhan of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
      await t.danhGia(BAM_THEO_CHU(nhan)); await cho(500);
    }
    const conPhu = await t.danhGia("!![...document.querySelectorAll('.fixed.inset-0')].find(e => getComputedStyle(e).zIndex === '150')");
    if (conPhu) throw new Error('lớp phủ hướng dẫn không đóng');
    return 'đã vào được màn chính';
  });

  // ── BÀI KIỂM TRA ĐẦU VÀO ─────────────────────────────────────────────────
  // ⚠️ LỖ DO CHÍNH BỘ NÀY TẠO RA. `veTrangChu()` bấm "Để sau, vào học luôn"
  // ở mỗi lần về trang chủ — tức khoảng hai chục lần một lượt chạy. Nghĩa là
  // đúng tính năng quyết định câu "từ mất gốc" có thật hay không thì chưa bao
  // giờ được đi qua. Nó cũng chính là `placementResultV1`, khoá đã gây ra vụ
  // "reset lộ trình không hoạt động".
  await khuVuc('KIỂM TRA ĐẦU VÀO: làm hết bài và lộ trình mở đúng bậc đo được', async () => {
    // Trình hướng dẫn chỉ hiện MỘT lần; bước đầu của bộ này đã đi qua nó nên
    // nó không hiện lại. Phải dựng lại đúng trạng thái khách mới.
    await t.diToi(BASE); await cho(800);
    await t.danhGia('localStorage.clear(); true'); await cho(200);
    await t.diToi(BASE); await cho(1800);
    await t.danhGia(BAM_THEO_CHU('BẮT ĐẦU NÀO')); await cho(500);
    await t.danhGia(BAM_THEO_CHU('TIẾP TỤC')); await cho(500);
    if (!await t.danhGia(BAM_THEO_CHU('LÀM TEST NGAY'))) throw new Error('không thấy nút LÀM TEST NGAY');
    await cho(1500);
    // Trả lời như người mất gốc: luôn chọn phương án A. Bài tự điều chỉnh độ
    // khó nên chọn bừa sẽ tụt xuống bậc thấp — đó chính là điều cần kiểm.
    let soCau = 0;
    for (let i = 0; i < 30; i += 1) {
      const conCau = await t.danhGia(`/Xác nhận/.test(${CHU_TRONG_PANEL})`);
      if (!conCau) break;
      const chon = await t.danhGia(`(() => {
        const p = [...document.querySelectorAll('.fixed.inset-0')].filter((e) => e.getBoundingClientRect().width > 0)[0];
        if (!p) return false;
        const o = [...p.querySelectorAll('button')].find((e) => /^A[^-]/.test((e.innerText || '').trim()));
        if (!o) return false; o.click(); return true;
      })()`);
      if (!chon) break;
      await cho(250);
      await t.danhGia(BAM_THAY_DUOC('Xác nhận'));
      soCau += 1;
      await cho(700);
    }
    if (soCau < 8) throw new Error(`chỉ trả lời được ${soCau} câu rồi bài dừng — bài khai 12 câu`);
    if (!await t.danhGia(BAM_THAY_DUOC('Vào chặng phù hợp'))) throw new Error('làm hết bài mà không có nút vào chặng phù hợp');
    await cho(2000);
    const kq = await t.danhGia("localStorage.getItem('placementResultV1')");
    if (!kq) throw new Error('làm xong bài mà KHÔNG lưu kết quả đo — lộ trình sẽ không biết mở ở đâu');
    const muc = JSON.parse(kq);
    const bac = muc.level || muc.band || '';
    const HOP_LE = ['foundation', 'starter', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'];
    if (!HOP_LE.includes(bac)) throw new Error(`kết quả đo ghi bậc lạ: ${JSON.stringify(muc).slice(0, 90)}`);
    // Người trả lời bừa mà bị xếp thẳng vào bậc trên thì toàn bộ 340 giờ nội
    // dung A1+A2 nằm sau lưng họ, và lời hứa "từ mất gốc" hỏng ngay màn đầu.
    if (['upper_intermediate', 'advanced'].includes(bac)) {
      throw new Error(`trả lời bừa mà bị xếp vào ${bac} — người mất gốc sẽ bị thả vào bậc quá cao`);
    }
    return `${soCau} câu · xếp vào bậc "${bac}"`;
  });

  // ── NGỮ PHÁP ─────────────────────────────────────────────────────────────
  await khuVuc('NGỮ PHÁP: vào một bài THẬT và thấy nội dung', async () => {
    if (!await t.danhGia(BAM_THAY_DUOC('NGỮ PHÁP'))) throw new Error('không thấy nút NGỮ PHÁP');
    await cho(2000);
    // Bài ngữ pháp đánh số "N. Tên bài"; thẻ lọc cấp độ thì không. Đây là dấu
    // hiệu phân biệt được, thay cho việc bấm bừa nút dài nhất.
    const mo = await t.danhGia(BAM_NOI_DUNG('^[0-9]+[.]'));
    if (!mo) throw new Error('không thấy bài ngữ pháp nào để mở');
    await cho(2000);
    const chu = await t.danhGia('document.body.innerText.length');
    if (chu < 400) throw new Error(`vào bài xong màn hình gần như trống (${chu} ký tự)`);
    return `đã mở: "${mo}" · ${chu} ký tự`;
  });

  await khuVuc('NGỮ PHÁP: mở một dạng bài tập và màn hình CÓ đổi', async () => {
    // Mở bài ra thì có dải thẻ: Lý Thuyết · Xếp Câu · Điền Từ · Sửa Lỗi ·
    // Viết Lại · Nối Câu · Đúng/Sai · Gia Sư AI. Đó mới là chỗ luyện tập.
    const chu = await t.danhGia('document.body.innerText');
    const dang = ['Điền Từ', 'Xếp Câu', 'Sửa Lỗi', 'Đúng/Sai'].filter((d) => chu.includes(d));
    if (!dang.length) throw new Error('bài mở ra mà không có dạng bài tập nào');
    const truoc = chu.length;
    const bam = await t.danhGia(BAM_THAY_DUOC(dang[0]));
    if (!bam) throw new Error(`thấy chữ "${dang[0]}" mà không bấm được`);
    await cho(2000);
    const sau = await t.danhGia('document.body.innerText');
    if (sau.length === truoc) throw new Error(`bấm "${dang[0]}" mà màn hình không đổi gì`);
    return `có ${dang.length} dạng bài tập; mở "${dang[0]}" → ${truoc} → ${sau.length} ký tự`;
  });

  // ── TỪ VỰNG (CHỦ ĐỀ) ─────────────────────────────────────────────────────
  await veTrangChu();
  await khuVuc('TỪ VỰNG: vào một chủ đề THẬT và thấy đủ các bước học', async () => {
    // Bấm CHỦ ĐỀ là ĐÃ ra thẳng danh sách chủ đề. Bản trước còn bấm thêm nút
    // nhóm "Chủ đề thi VSTEP", và cú bấm thừa đó đưa thẳng vào trong một chủ
    // đề — nên bước sau tìm thẻ chủ đề thì không còn thấy, và báo "không mở
    // được chủ đề nào" trong khi thật ra đã vào rồi.
    if (!await t.danhGia(BAM_THAY_DUOC('CHỦ ĐỀ'))) throw new Error('không thấy lối CHỦ ĐỀ');
    await cho(2500);
    // Thẻ chủ đề luôn kèm số từ ("117 từ A2-B1"); nút nhóm chỉ có số trơn.
    const mo = await t.danhGia(BAM_NOI_DUNG('[0-9]+ ?từ'));
    if (!mo) throw new Error('không thấy thẻ chủ đề nào (thẻ phải kèm số từ)');
    await cho(3000);
    const chu = await t.danhGia('document.body.innerText');
    if (chu.length < 300) throw new Error(`vào chủ đề xong màn hình trống (${chu.length} ký tự)`);
    // Màn học một chủ đề có SÁU bước, không phải bốn.
    const buoc = ['Nhận Diện', 'Nghe', 'Hành Động', 'Câu Chuyện', 'Gõ Từ', 'Luyện Nói']
      .filter((b) => chu.includes(b));
    if (buoc.length < 4) throw new Error(`chỉ thấy ${buoc.length}/6 bước học: ${buoc.join(', ')}`);
    return `chủ đề "${mo}" · ${buoc.length}/6 bước: ${buoc.join(' · ')}`;
  });

  // ── OXFORD ───────────────────────────────────────────────────────────────
  // KHÔNG bấm TỪ VỰNG trước: menu con mặc định ĐANG MỞ, bấm vào là đóng nó lại
  // (xem lỗi số 3 ở đầu file).
  await veTrangChu();
  await khuVuc('OXFORD: vào được và mở một unit', async () => {
    if (!await t.danhGia(BAM_THAY_DUOC('OXFORD'))) throw new Error('không thấy lối OXFORD');
    await t.doi("!/Đang tải/.test(document.body.innerText)", { giay: 40, nhan: 'Oxford tải xong' });
    await cho(2000);
    if (!await t.danhGia("/Unit /i.test(document.body.innerText)")) throw new Error('tải xong mà không có unit nào');
    const mo = await t.danhGia(BAM_NOI_DUNG('Unit '));
    if (!mo) throw new Error('không bấm được unit nào');
    await cho(2500);
    const chu = await t.danhGia('document.body.innerText.length');
    if (chu < 400) throw new Error(`unit mở ra gần như trống (${chu} ký tự)`);
    return `đã mở: "${mo}" · ${chu} ký tự`;
  });

  // ── GAMES ────────────────────────────────────────────────────────────────
  await veTrangChu();
  await khuVuc('GAMES: mở được và vào một trò', async () => {
    if (!await t.danhGia(BAM_THAY_DUOC('GAMES'))) throw new Error('không thấy nút GAMES');
    await cho(2500);
    const choi = await t.danhGia(BAM_NOI_DUNG());
    if (!choi) throw new Error('không có trò nào bấm được');
    await cho(2500);
    const chu = await t.danhGia('document.body.innerText.length');
    return `đã vào: "${choi}" · ${chu} ký tự`;
  });

  // ── LUYỆN VIẾT ───────────────────────────────────────────────────────────
  await veTrangChu();
  await khuVuc('LUYỆN VIẾT: chọn đề rồi gõ bài được', async () => {
    if (!await t.danhGia(BAM_DUNG_NHAN('VIẾT'))) throw new Error('không thấy nút VIẾT');
    await t.doi(`${CHU_TRONG_PANEL}.includes('Luyện viết')`, { giay: 30, nhan: 'panel luyện viết' });
    await cho(1200);
    // Panel mở ra là DANH SÁCH ĐỀ — phải chọn một đề thì ô soạn mới hiện.
    // Phải là THẺ ĐỀ, không phải nút LỌC. Nút lọc ghi "Viết câu"; thẻ đề ghi
    // "VIẾT CÂU · A1" rồi xuống dòng tới tên đề. Bản trước khớp trúng nút lọc
    // rồi báo "không có ô soạn bài nào" — lỗi của bộ rà, không phải của app.
    const de = await t.danhGia(BAM_NOI_DUNG('·\\s*(A1|A2|B1|B2|C1)'));
    if (!de) throw new Error('không chọn được đề nào trong danh sách');
    await cho(1800);
    const goDuoc = await t.danhGia(`(() => {
      const ta = [...document.querySelectorAll('textarea')].find((e) => e.getBoundingClientRect().height > 30);
      if (!ta) return false;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      setter.call(ta, 'My family lives in a small town near the river. We often go to the market together on Sunday morning and buy fresh vegetables for lunch. I like cooking with my mother.');
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    })()`);
    if (!goDuoc) throw new Error(`chọn đề "${de}" rồi mà không có ô soạn bài nào`);
    return `đề "${de}" · đã gõ được bài`;
  });

  await khuVuc('LUYỆN VIẾT: bấm chấm khi CHƯA CÓ key AI thì phải BÁO RA', async () => {
    await cho(700);
    const bam = await t.danhGia(`(() => {
      const el = [...document.querySelectorAll('button')]
        .find((e) => /chấm|nộp bài|gửi bài/i.test(e.innerText || '') && !e.disabled && e.getBoundingClientRect().width > 0);
      if (!el) return false;
      el.click(); return (el.innerText || '').trim().replace(/\\s+/g, ' ').slice(0, 30);
    })()`);
    if (!bam) return 'không có nút chấm nào bấm được — hợp lệ nếu app khoá nút khi chưa có key';
    await cho(4000);
    const chu = await t.danhGia(CHU_TRONG_PANEL);
    // ĐÂY LÀ PHÉP ĐO ĐÁNG GIÁ NHẤT CỦA CẢ BỘ.
    const coBao = /key|khóa ai|khoá ai|API|chưa cấu hình|chưa có|cần.*AI/i.test(chu);
    const dangQuay = /đang chấm|đang xử lý|vui lòng chờ/i.test(chu);
    if (dangQuay && !coBao) throw new Error('bấm chấm xong màn hình quay mãi mà không nói vì sao — khách chưa có key sẽ ngồi đợi vô hạn');
    if (!coBao) throw new Error('bấm chấm mà không có lời báo nào về việc thiếu key AI');
    return `đã báo ra (nút "${bam}")`;
  });

  // ── LUYỆN NÓI ────────────────────────────────────────────────────────────
  await veTrangChu();
  await khuVuc('LUYỆN NÓI: mở được và nói rõ giới hạn phát âm', async () => {
    if (!await t.danhGia(BAM_DUNG_NHAN('NÓI'))) throw new Error('không thấy nút NÓI');
    await t.doi(`${CHU_TRONG_PANEL}.includes('Luyện nói')`, { giay: 30, nhan: 'panel luyện nói' });
    await cho(1000);
    const chu = await t.danhGia(CHU_TRONG_PANEL);
    const thanhThat = /không.*(chấm|đánh giá).*phát âm|phát âm.*không.*(chấm|đánh giá)|nghe được|bản chữ/i.test(chu);
    if (!thanhThat) throw new Error('panel nói KHÔNG nói rõ là máy không chấm được phát âm');
    return 'có nói rõ giới hạn';
  });

  // ── THI THỬ ──────────────────────────────────────────────────────────────
  await veTrangChu();
  await khuVuc('THI THỬ: mở được và có nội dung đề', async () => {
    if (!await t.danhGia(BAM_DUNG_NHAN('THI THỬ NGAY'))) throw new Error('không thấy nút THI THỬ NGAY');
    await t.doi(`${CHU_TRONG_PANEL}.length > 150`, { giay: 30, nhan: 'panel thi thử' });
    await cho(1500);
    const chu = await t.danhGia(CHU_TRONG_PANEL);
    if (chu.length < 150) throw new Error('panel thi thử trống');
    return `${chu.length} ký tự`;
  });

  // ── SỔ TAY ───────────────────────────────────────────────────────────────
  await veTrangChu();
  await khuVuc('SỔ TAY: rỗng thì phải NÓI là rỗng, không để màn trắng', async () => {
    if (!await t.danhGia(BAM_DUNG_NHAN('MỞ SỔ TAY'))) throw new Error('không thấy nút MỞ SỔ TAY');
    await t.doi(`${CHU_TRONG_PANEL}.length > 60`, { giay: 30, nhan: 'panel sổ tay' });
    await cho(1000);
    const chu = await t.danhGia(CHU_TRONG_PANEL);
    const noiRong = /chưa có|trống|chưa lưu|hãy thêm|chưa ghi/i.test(chu);
    if (!noiRong && chu.length < 200) throw new Error('sổ tay rỗng nhưng không có lời giải thích nào');
    return noiRong ? 'có lời báo sổ rỗng' : `${chu.length} ký tự nội dung`;
  });

  // ── ĐIỆN THOẠI: mọi lối vào lớn phải tới được ────────────────────────────
  // Phần lớn người học Việt Nam dùng điện thoại. Một lối chỉ hiện ở màn rộng
  // thì với họ là không tồn tại.
  await khuVuc('ĐIỆN THOẠI (390px): tới được NGỮ PHÁP, CHỦ ĐỀ, OXFORD, GAMES', async () => {
    await t.goi('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await veTrangChu();
    const thieu = [];
    for (const loi of ['NGỮ PHÁP', 'CHỦ ĐỀ', 'OXFORD', 'GAMES']) {
      // Mở menu ba gạch nếu có (bố cục thu gọn giấu điều hướng sau nó).
      await t.danhGia(`(() => {
        const b = [...document.querySelectorAll('button')].find((e) => (e.getAttribute('aria-label')||'') === 'Mở menu điều hướng');
        if (b && b.getBoundingClientRect().width > 2) b.click();
        return true;
      })()`);
      await cho(700);
      if (!await t.danhGia(BAM_THAY_DUOC(loi))) thieu.push(loi);
      await cho(900);
      await veTrangChu();
    }
    // TRẢ LẠI khung máy tính trước khi thoát bước. Bản đầu để nguyên 390px,
    // nên ba bước sau đó đều chạy trên bố cục thu gọn và cùng báo "không thấy
    // nút" — ba lỗi giả liên tiếp từ một dòng thiếu.
    await t.goi('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await cho(600);
    if (thieu.length) throw new Error(`trên điện thoại KHÔNG tới được: ${thieu.join(', ')}`);
    return 'cả bốn lối đều tới được';
  });

  // ── BẬC A0 "MẤT GỐC" ─────────────────────────────────────────────────────
  // Bậc mặc định của màn ngữ pháp là B1, nên bước ngữ pháp bên trên chưa hề
  // chạm tới A0 — đúng chỗ mà lời hứa "từ mất gốc" bắt đầu.
  await veTrangChu();
  await khuVuc('BẬC A0 (mất gốc): mở được và có nội dung học', async () => {
    if (!await t.danhGia(BAM_THAY_DUOC('NGỮ PHÁP'))) throw new Error('không thấy nút NGỮ PHÁP');
    await cho(2000);
    if (!await t.danhGia(BAM_THAY_DUOC('A0 - Mất Gốc'))) throw new Error('không thấy thẻ bậc A0 - Mất Gốc');
    await cho(1800);
    const mo = await t.danhGia(BAM_NOI_DUNG('^[0-9]+[.]'));
    if (!mo) throw new Error('bậc A0 không có bài nào mở được');
    await cho(2000);
    const chu = await t.danhGia('document.body.innerText.length');
    if (chu < 400) throw new Error(`bài A0 mở ra gần như trống (${chu} ký tự)`);
    return `đã mở bài A0: "${mo}" · ${chu} ký tự`;
  });

  // ── QUÉT AI ──────────────────────────────────────────────────────────────
  await veTrangChu();
  await khuVuc('QUÉT AI: chưa có key thì phải NÓI RA, không để màn câm', async () => {
    if (!await t.danhGia(BAM_THAY_DUOC('QUÉT AI'))) throw new Error('không thấy nút QUÉT AI');
    await cho(2500);
    const chu = await t.danhGia('document.body.innerText');
    if (chu.length < 120) throw new Error('màn quét AI gần như trống');
    // Không lái được máy ảnh trong bộ rà, nên chỉ đo đúng thứ đo được: màn này
    // cần key AI, và khách chưa có key thì phải thấy lời báo chứ không phải một
    // nút bấm vào không ra gì.
    const coBao = /key|khóa ai|khoá ai|API|chưa có|cần.*AI/i.test(chu);
    if (!coBao) throw new Error('màn quét AI không nói gì về việc cần key AI');
    return 'có lời báo về key (không lái được máy ảnh nên chỉ đo được phần này)';
  });

  // ── GHI ÂM NGHE LẠI ──────────────────────────────────────────────────────
  // Test đơn vị của ghi âm chạy trên một trình duyệt GIẢ do chính test dựng ra.
  // Nó chứng minh logic đúng; nó không chứng minh `getUserMedia` +
  // `MediaRecorder` thật ghép được với nút bấm thật. Chỗ này lái trên Chrome
  // thật với micro giả — đúng cái ranh giới giữa hai loại kiểm.
  await khuVuc('GHI ÂM: nói xong phải NGHE LẠI được, và nói rõ máy KHÔNG chấm', async () => {
    await veTrangChu(); await cho(800);
    if (!await t.danhGia(BAM_DUNG_NHAN('NÓI'))) throw new Error('không thấy nút NÓI trên trang chủ');
    await cho(1000);

    // Thẻ đề nói là <button> chứa dòng "~N giây". `BAM_NOI_DUNG` lọc theo luật
    // "có chữ thường" và trượt ở đây vì mấy nút lọc kiểu đề cũng có chữ thường.
    // Nhận diện bằng dấu hiệu RIÊNG của thẻ đề thay vì một luật chung.
    const daChonDe = await t.danhGia(`(() => {
      const ds = [...document.querySelectorAll('button')]
        .filter((e) => /~\\d+ giây/.test(e.innerText || '') && e.getBoundingClientRect().width > 100);
      if (!ds.length) return false;
      ds[0].scrollIntoView({ block: 'center' }); ds[0].click(); return true;
    })()`);
    if (!daChonDe) throw new Error('không chọn được đề nói nào trong danh sách');
    await cho(1200);

    if (!await t.danhGia(BAM_THEO_CHU('Bắt đầu nói'))) throw new Error('không thấy nút Bắt đầu nói');
    await cho(2500);   // để máy thu kịp gom vài mẩu dữ liệu

    if (!await t.danhGia(BAM_THEO_CHU('Dừng lại'))) throw new Error('bấm nói xong không có nút Dừng lại — micro sẽ còn bật');
    await cho(1800);

    const coTrinhPhat = await t.danhGia("!![...document.querySelectorAll('audio')].find((e) => e.controls && (e.src || '').startsWith('blob:'))");
    const chu = await t.danhGia('document.body.innerText');
    if (!coTrinhPhat) {
      // Micro giả vẫn có thể không đẻ ra dữ liệu trên vài bản Chrome. Nếu vậy thì
      // app PHẢI báo, không được im — đó mới là điều bắt buộc ở đây.
      if (!/không ghi âm được|Không mở được micro|Bản thu rỗng|chưa cho phép dùng micro/i.test(chu)) {
        throw new Error('không có trình phát để nghe lại VÀ cũng không có lời báo nào — màn hình im lặng');
      }
      await t.danhGia(DONG_PANEL); await cho(400);
      return 'micro giả không đẻ ra bản thu, nhưng app CÓ báo ra (không im lặng)';
    }

    // Có bản thu thì phải kèm đủ hai lời: không chấm, và không lưu.
    if (!/không chấm/.test(chu)) throw new Error('có bản ghi âm mà không nói rõ máy KHÔNG chấm nó');
    if (!/không được lưu vào máy/.test(chu)) throw new Error('không nói rõ bản thu không được lưu lại');

    await t.danhGia(DONG_PANEL); await cho(400);
    return 'thu được, nghe lại được, và có đủ hai lời: máy không chấm + bản thu không lưu';
  });
  // ── NGƯỜI MẤT GỐC: BẬC ĐẦU TIÊN CÓ DẠY ĐẶT CÂU KHÔNG ─────────────────────
  // Đây là bước đo đúng cam kết của sản phẩm. Trước đợt audit sư phạm, bậc A1
  // có ĐÚNG 2 chặng ngữ pháp trên 73 chặng — 71 chặng còn lại là danh sách từ
  // vựng, và trong cả kho KHÔNG có bài nào dạy động từ TO BE. Người mất gốc đi
  // hết 134 giờ của bậc đầu vẫn không đặt nổi câu "I am a student".
  //
  // Test tĩnh ghim dữ liệu. Bước này ghim thứ dữ liệu không nói được: bài đó có
  // MỞ RA ĐƯỢC trên màn hình và có NỘI DUNG THẬT hay không.
  await khuVuc('MẤT GỐC: bậc A1 dạy TO BE, và bài đó mở ra có nội dung thật', async () => {
    await veTrangChu(); await cho(900);
    if (!await t.danhGia(BAM_THEO_CHU('A1 Khởi Đầu'))) throw new Error('không thấy tab bậc A1');
    await cho(900);
    await t.danhGia(BAM_THEO_CHU('BẤM ĐỂ XEM HẾT'));
    await cho(1200);

    // Đọc TÊN các chặng ngữ pháp của bậc A1 theo đúng thứ tự trên màn hình.
    const tenChang = await t.danhGia(`(() => {
      return [...document.querySelectorAll('h4')].map((e) => (e.innerText || '').trim()).filter(Boolean);
    })()`);
    const co = (chu) => tenChang.some((x) => x.toLowerCase().includes(chu.toLowerCase()));

    const PHAI_CO = ['TO BE', 'Số Nhiều', 'This / That', 'Đại từ', 'Mạo Từ', 'Câu Hỏi', 'There is'];
    const thieu = PHAI_CO.filter((x) => !co(x));
    if (thieu.length) throw new Error(`bậc A1 trên màn hình thiếu: ${thieu.join(", ")} (thấy ${tenChang.length} chặng)`);

    // TO BE phải đứng TRƯỚC Hiện Tại Tiếp Diễn — thứ tự trên màn hình, không
    // phải thứ tự trong dữ liệu.
    const iBe = tenChang.findIndex((x) => /TO BE/i.test(x));
    const iCont = tenChang.findIndex((x) => /Tiếp Diễn/i.test(x));
    if (iBe < 0) throw new Error('không thấy chặng TO BE');
    if (iCont >= 0 && iBe > iCont) {
      throw new Error(`TO BE đứng ở vị trí ${iBe + 1} còn Hiện Tại Tiếp Diễn ở ${iCont + 1} — người học gặp "I am watching TV" trước khi biết "am" là gì`);
    }

    // Mở bài TO BE và soi nội dung thật.
    // Thẻ chặng là một <div onClick>, KHÔNG phải <button> — BAM_THEO_CHU chỉ dò
    // <button> nên nó trượt. Bấm thẳng vào thẻ chứa tiêu đề.
    const daMo = await t.danhGia(`(() => {
      const h = [...document.querySelectorAll('h4')].find((e) => /TO BE/i.test(e.innerText || ''));
      if (!h) return false;
      const the = h.closest('div[class*=rounded-3xl]') || h.parentElement;
      the.scrollIntoView({ block: 'center' }); the.click(); return true;
    })()`);
    if (!daMo) throw new Error('không bấm được vào chặng TO BE');
    await cho(1800);
    const chu = await t.danhGia('document.body.innerText');
    if (!/am\b/.test(chu) || !/is\b/.test(chu) || !/are\b/.test(chu)) {
      throw new Error('mở bài TO BE mà không thấy am/is/are trên màn hình');
    }
    if (chu.length < 800) throw new Error(`bài TO BE mở ra chỉ có ${chu.length} ký tự — gần như rỗng`);

    // Bậc A1 cũng phải có buổi nghe: đề thi A1 có 6 câu nghe.
    await veTrangChu(); await cho(700);
    if (!await t.danhGia(BAM_THEO_CHU('A1 Khởi Đầu'))) throw new Error('không quay lại được tab A1');
    await cho(700);
    await t.danhGia(BAM_THEO_CHU('BẤM ĐỂ XEM HẾT'));
    await cho(1200);
    const coNghe = await t.danhGia("/chép chính tả/i.test(document.body.innerText)");
    if (!coNghe) throw new Error('bậc A1 không có chặng nghe nào, trong khi đề thi A1 có 6 câu nghe');

    return `A1 có ${tenChang.length} chặng · TO BE ở vị trí ${iBe + 1}${iCont >= 0 ? `, trước Tiếp Diễn (${iCont + 1})` : ''} · có buổi chép chính tả`;
  });
  // ── MỤC TIÊU HỌC ─────────────────────────────────────────────────────────
  // `getLearningGoal()` từng có ĐÚNG 0 nơi gọi: hỏi ở màn hình đầu tiên rồi vứt.
  // Test tĩnh chứng minh được hàm có người gọi; nó KHÔNG chứng minh bấm vào
  // thì số chặng trên màn hình đổi thật. Đây là chỗ đo cái đó.
  await khuVuc('MỤC TIÊU HỌC: chọn mục tiêu rồi bật lọc thì SỐ CHẶNG trên màn hình đổi thật', async () => {
    await veTrangChu(); await cho(900);

    // Vào MỘT bậc và MỞ HẾT chặng của nó. Trên tab "tất cả", lộ trình chỉ vẽ
    // một cửa sổ nhỏ quanh chặng đang học ở mỗi bậc, và cửa sổ đó rơi đúng vào
    // đoạn đầu bậc — nơi chưa có chặng Oxford nào. Đo ở đó thì không có gì để
    // đo. Bậc A2 có 60 chặng Oxford, mở hết ra là thấy.
    if (!await t.danhGia(BAM_THEO_CHU('A2 Sơ Cấp'))) throw new Error('không thấy tab bậc A2');
    await cho(800);
    await t.danhGia(BAM_THEO_CHU('BẤM ĐỂ XEM HẾT'));
    await cho(1200);

    // ĐẾM THẺ LÀ THƯỚC SAI. Lộ trình vẽ theo CỬA SỔ cố định quanh chặng đang
    // học, nên lọc bớt danh sách không làm số thẻ trên màn hình giảm đi — cửa
    // sổ chỉ kéo thêm chặng từ phía dưới lên cho đủ. Bản đầu của bước này đo
    // đúng như vậy và báo "132 → 132, mục tiêu vẫn bị vứt đi" trong khi bộ lọc
    // chạy hoàn toàn bình thường. Cùng họ với vụ đếm <div> ở bước cửa ải.
    //
    // Thước đúng: đếm nhãn LOẠI CHẶNG. Làn "Lấy lại gốc" tạm ẩn bộ Oxford, nên
    // sau khi bật lọc trên màn hình phải KHÔNG CÒN nhãn "Oxford Vocab" nào,
    // trong khi nhãn "Ngữ Pháp"/"Từ Vựng" vẫn còn.
    const demNhan = (chu) => `[...document.querySelectorAll('span')]
      .filter((e) => (e.innerText || '').trim().toUpperCase() === ${JSON.stringify(chu)}.toUpperCase()).length`;

    const oxfordTruoc = await t.danhGia(demNhan('Oxford Vocab'));
    if (!oxfordTruoc) throw new Error('trước khi lọc đã không thấy nhãn "Oxford Vocab" nào — không đo được gì');

    // Chọn một mục tiêu qua chính băng mục tiêu (không thọc localStorage).
    if (!await t.danhGia(BAM_THEO_CHU('CHỌN MỤC TIÊU')) && !await t.danhGia(BAM_THEO_CHU('ĐỔI MỤC TIÊU'))) {
      throw new Error('không thấy nút chọn/đổi mục tiêu trên lộ trình');
    }
    await cho(500);
    if (!await t.danhGia(BAM_DUNG_NHAN('Lấy lại gốc'))) throw new Error('không chọn được mục tiêu “Lấy lại gốc”');
    await cho(700);

    // Băng phải NÓI RA con số, không chỉ đổi thầm.
    const bang = await t.danhGia("document.body.innerText");
    if (!/chặng phục vụ trực tiếp mục tiêu này/.test(bang)) {
      throw new Error('băng mục tiêu không nói ra bao nhiêu chặng phục vụ mục tiêu');
    }

    if (!await t.danhGia(BAM_THEO_CHU('CHỈ HIỆN CHẶNG PHỤC VỤ MỤC TIÊU'))) {
      throw new Error('không thấy nút bật lọc theo mục tiêu');
    }
    await cho(900);
    await t.danhGia(BAM_THEO_CHU('BẤM ĐỂ XEM HẾT'));
    await cho(900);
    const oxfordSau = await t.danhGia(demNhan('Oxford Vocab'));
    const nguPhapSau = await t.danhGia(demNhan('Ngữ Pháp'));
    const tuVungSau = await t.danhGia(demNhan('Từ Vựng'));
    if (oxfordSau !== 0) {
      throw new Error(`bật lọc "Lấy lại gốc" mà vẫn còn ${oxfordSau} chặng Oxford trên màn hình — bộ lọc không chạy`);
    }
    if (nguPhapSau + tuVungSau === 0) {
      throw new Error('bật lọc xong màn hình không còn chặng nào — bộ lọc đang cắt cả thứ nó phải giữ');
    }

    // MẮC NỐI: bộ lọc chỉ đổi CÁCH NHÌN, nên chặng "Học Tiếp" vẫn có thể nằm
    // ngoài làn và không hiện trong danh sách bên dưới. Hai vế đều đúng riêng
    // lẻ; ghép lại thì người học đọc tên một chặng rồi tìm mãi không thấy.
    // Cách chữa không phải đổi chặng học tiếp — mà là NÓI RA. Đo đúng chỗ đó.
    const chuSauLoc = await t.danhGia('document.body.innerText');
    const loaiOxford = /Oxford Vocab/i.test(chuSauLoc);
    if (loaiOxford) {
      throw new Error('bật lọc “Lấy lại gốc” xong vẫn còn nhãn Oxford trên trang — bộ lọc không chạy');
    }
    // Làn "Lấy lại gốc" ẩn bộ Oxford. Nếu chặng học tiếp là một chặng Oxford thì
    // băng mục tiêu BẮT BUỘC phải có dòng cảnh báo; nếu không thì không cần.
    const changTiepLaOxford = await t.danhGia(`(() => {
      const the = [...document.querySelectorAll('div')]
        .filter((e) => /HỌC TIẾP|Học Tiếp/.test(e.innerText || ''));
      if (!the.length) return false;
      return /Oxford/i.test(the[the.length - 1].innerText || '');
    })()`);
    const coCanhBao = /nằm .{0,12}ngoài làn này/.test(chuSauLoc);
    if (changTiepLaOxford && !coCanhBao) {
      throw new Error('chặng Học Tiếp bị bộ lọc ẩn khỏi danh sách mà màn hình không nói gì — người học sẽ tìm mãi không thấy');
    }

    // Tắt lọc phải trả lại đúng như cũ: lọc là CÁCH NHÌN, không phải cắt bớt.
    if (!await t.danhGia(BAM_THEO_CHU('ĐANG LỌC THEO MỤC TIÊU'))) throw new Error('không tắt lại được bộ lọc');
    await cho(900);
    await t.danhGia(BAM_THEO_CHU('BẤM ĐỂ XEM HẾT'));
    await cho(900);
    const oxfordTraLai = await t.danhGia(demNhan('Oxford Vocab'));
    if (oxfordTraLai !== oxfordTruoc) {
      throw new Error(`tắt lọc không trả lại đủ chặng Oxford (${oxfordTruoc} → 0 → ${oxfordTraLai})`);
    }

    return `Oxford ${oxfordTruoc} → bật lọc còn 0 (Ngữ Pháp ${nguPhapSau} + Từ Vựng ${tuVungSau} vẫn còn) → tắt lọc về lại ${oxfordTraLai}`;
  });
  // ── CỬA ẢI CUỐI BẬC ──────────────────────────────────────────────────────
  // Test tĩnh chỉ chứng minh chuỗi `<CuaAiCuoiBac` NẰM TRONG mã nguồn. Nó
  // không chứng minh thẻ đó vẽ ra được, không bị lớp nào che, và bấm vào có
  // mở đúng đề của bậc hay không — đúng ba thứ chỉ trình duyệt trả lời được.
  await khuVuc('CỬA ẢI CUỐI BẬC: đủ 5 bậc có cửa, và bấm mở THẲNG đúng đề của bậc', async () => {
    await veTrangChu(); await cho(900);

    // Mặc định lộ trình chỉ vẽ BẬC ĐỀ XUẤT, nên phải sang tab "TẤT CẢ LỘ TRÌNH"
    // mới đếm được đủ. Bản đầu của bước này bỏ qua chuyện đó và đếm số <div>
    // khớp chữ — ra 6 trong khi chỉ có ĐÚNG MỘT cửa ải trên màn hình. Con số 6
    // là số div lồng nhau của cùng một thẻ. Nay đếm bằng TÊN ĐỀ trên thẻ: mỗi
    // cửa ải có đúng một tên, nên đếm tên là đếm cửa.
    if (!await t.danhGia(BAM_THEO_CHU('TẤT CẢ LỘ TRÌNH'))) throw new Error('không thấy tab TẤT CẢ LỘ TRÌNH');
    await cho(1200);

    const tenTrenThe = await t.danhGia(`(() => {
      const ds = [...document.querySelectorAll('h4')].map((e) => (e.innerText || '').trim());
      return ds.filter((x) => /^(Thi cuối bậc|Kiểm tra nền)/.test(x));
    })()`);
    const soCua = tenTrenThe.length;
    if (soCua !== 5) {
      throw new Error(`lộ trình vẽ ra ${soCua} cửa ải, phải là 5 (A1·A2·B1·B2·nền C1). Thấy: ${tenTrenThe.join(' / ') || 'không thấy tên nào'}`);
    }
    // Bậc A0 cố ý KHÔNG có cửa: CEFR không có bậc nào dưới A1.
    if (tenTrenThe.some((x) => /A0/.test(x))) throw new Error(`mọc ra một cửa ải bậc A0 không tồn tại: ${tenTrenThe.join(' / ')}`);

    // Bấm VÀO THI ở cửa ải ĐẦU TIÊN, rồi soi màn hình mở ra là đề nào.
    const daBam = await t.danhGia(BAM_DUNG_NHAN('VÀO THI'));
    if (!daBam) throw new Error('không bấm được nút VÀO THI trên cửa ải');
    await cho(1200);

    // Mở THẲNG vào đề, KHÔNG đổ vào danh sách 5 đề rồi bắt tự tìm lại.
    const man = await t.danhGia("document.body.innerText.slice(0, 3000)");
    const laDanhSach = /Mỗi đề có/.test(man) && /Thi cuối bậc A1/.test(man) && /Thi cuối bậc B2/.test(man);
    if (laDanhSach) throw new Error('bấm VÀO THI lại đổ vào DANH SÁCH đề — examIdBanDau không tới nơi');
    const khopDe = tenTrenThe.some((ten) => man.includes(ten));
    if (!khopDe) throw new Error(`màn mở ra không phải đề của cửa ải vừa bấm. Trên thẻ: ${tenTrenThe.join(' / ')}`);

    await t.danhGia(DONG_PANEL); await cho(400);
    return `${soCua} cửa ải · đề trên thẻ: ${tenTrenThe.join(' · ')} · bấm mở thẳng đúng đề`;
  });
  // ── BÀI NGHE KHI MÁY CHỦ VOA CHẾT ────────────────────────────────────────
  // Cả 60 bài nghe đoạn dài PHÁT TỪ MÁY CHỦ VOA, không có một tệp nội bộ nào
  // (tải hết về là 116,9 MB — đã đo bằng content-length, không ước lượng).
  // Câu hỏi đáng hỏi không phải "VOA có rủi ro không" — có. Mà là: **hôm nay,
  // link chết thì người học thấy gì?** Luật của dự án là "thiếu dữ liệu thì ẨN
  // hoặc BÁO, tuyệt đối không thay thế âm thầm", nên một thẻ <audio> chết câm
  // mới là lỗi thật, và nó không tốn một MB nào để sửa.
  //
  // Chặn thẳng tên miền VOA ở tầng mạng — đúng thứ xảy ra khi VOA đổi đường dẫn
  // hoặc mạng nhà người học chặn. Không giả lập bằng cách sửa src.
  await khuVuc('BÀI NGHE: máy chủ VOA chết thì phải BÁO và vẫn học được, không câm', async () => {
    await t.goi('Network.setBlockedURLs', { urls: ['*voa-audio.voanews.eu*'] });
    try {
      await veTrangChu(); await cho(700);
      if (!await t.danhGia(BAM_DUNG_NHAN('NGHE ĐOẠN'))) throw new Error('không thấy nút NGHE ĐOẠN trên trang chủ');
      await cho(900);

      // Vào một bài bất kỳ trong danh sách.
      const daVao = await t.danhGia(`(() => {
        const ds = [...document.querySelectorAll('button')]
          .filter((e) => /phút/.test(e.innerText || '') && e.getBoundingClientRect().width > 0);
        if (!ds.length) return false;
        ds[0].scrollIntoView({ block: 'center' }); ds[0].click(); return true;
      })()`);
      if (!daVao) throw new Error('không vào được bài nghe nào từ danh sách');
      await cho(1200);

      // Trình duyệt chỉ nạp audio khi bấm phát (preload="none").
      await t.danhGia(BAM_THEO_CHU('Nghe'));
      await cho(2000);

      const chu = await t.danhGia('document.body.innerText');
      if (!/Không tải được bản thu/.test(chu)) {
        throw new Error('máy chủ âm thanh chết mà màn hình KHÔNG báo gì — thẻ audio chết câm');
      }
      // Báo thôi chưa đủ: phải còn đường học tiếp, nếu không thì chỉ là một lời
      // xin lỗi lịch sự trước một màn hình vô dụng.
      if (!/VOA/.test(chu)) throw new Error('lời báo không nói ra bản thu nằm ở đâu');
      const coChepLoi = await t.danhGia(`/Bản chép lời|bản chép lời/.test(document.body.innerText)`);
      if (!coChepLoi) throw new Error('báo lỗi xong không đưa bản chép lời — người học hết đường làm câu hỏi');

      await t.danhGia(DONG_PANEL); await cho(400);
      return 'chặn tên miền VOA → có băng báo, có nói rõ nguồn, và vẫn còn bản chép lời để làm bài';
    } finally {
      await t.goi('Network.setBlockedURLs', { urls: [] });
    }
  });
  // ── TỜ CHỨNG NHẬN ────────────────────────────────────────────────────────
  // Đây là bề mặt NẶNG NHẤT của cả app: tờ giấy duy nhất đi ra ngoài cho người
  // khác đọc. Test tĩnh chỉ chứng minh `chamBaiThi` TRẢ VỀ nhãn "Nền C1", và
  // chứng minh chuỗi `luotThi.nhanIn` có trong mã nguồn. Không cái nào chứng
  // minh dòng chữ cỡ 5xl trên tờ giấy in ra đúng chữ đó.
  //
  // KHÔNG đi thi thật ở đây: `tronPhuongAn` trộn đáp án mỗi lượt, nên lái cho
  // đạt là chống lại chính bản vá chống bấm bừa. Gieo thẳng sổ thi rồi mở tờ
  // giấy — đúng thứ cần đo.
  await khuVuc('TỜ CHỨNG NHẬN: bậc C1 in ra “Nền C1”, KHÔNG in “C1” trần', async () => {
    await veTrangChu(); await cho(600);

    // Hai bản ghi, hai đường đi khác nhau tới cùng một chỗ:
    //   · bản MỚI  — có sẵn nhanIn/ghiChuBac;
    //   · bản CŨ   — THIẾU cả hai, đi qua chuanHoa(). Đây mới là bản ghi thật
    //     của một người thi trước khi có nhãn công bố, và là đường dễ để lọt
    //     chữ "C1" trần ra giấy nhất.
    // Ngày thi phải SAU mốc trộn phương án, nếu không bản ghi bị loại vì lý do
    // khác và bước này đo nhầm chuyện.
    const gieo = (coNhan) => `(() => {
      localStorage.setItem("bandExamHistoryV1", JSON.stringify([{
        examId: "exam-c1", cefr: "C1", dat: true,
        lucLam: "2026-08-20T02:00:00.000Z",
        phan: [{ key: "listening", nhan: "Nghe", dung: 6, tong: 6 }, { key: "reading", nhan: "Đọc", dung: 8, tong: 8 }],
        phanKhongTinh: [{ key: "writing", nhan: "Viết" }, { key: "speaking", nhan: "Nói" }],
        moTaCanCu: "Chỉ dựa trên phần Nghe và Đọc.",
        ...(${coNhan} ? { nhanIn: "Nền C1", ghiChuBac: "Đạt đề này nghĩa là phần NGHE và ĐỌC của bạn đã làm được ở mức trên B2." } : {})
      }]));
      return true;
    })()`;

    const doMotLuot = async (coNhan, ten) => {
      await t.danhGia(gieo(coNhan));
      await t.diToi(BASE); await cho(1600);
      for (const n of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) { await t.danhGia(BAM_THEO_CHU(n)); await cho(300); }

      if (!await t.danhGia(BAM_THEO_CHU('CHỨNG NHẬN'))) throw new Error(`${ten}: không mở được tờ chứng nhận`);
      await cho(900);

      // Đọc ĐÚNG dòng chữ to nhất trên tờ giấy, không đọc cả trang.
      const nhanTo = await t.danhGia(`(() => {
        const el = [...document.querySelectorAll('p')].find((e) => /text-5xl/.test(e.className || ''));
        return el ? (el.innerText || '').trim() : null;
      })()`);
      if (nhanTo === null) throw new Error(`${ten}: không thấy dòng nhãn bậc trên tờ giấy`);
      if (nhanTo === 'C1') throw new Error(`${ten}: tờ giấy in “C1” trần — nói quá đúng một bậc so với cam kết`);
      if (nhanTo !== 'Nền C1') throw new Error(`${ten}: nhãn trên giấy là “${nhanTo}”, phải là “Nền C1”`);

      const chu = await t.danhGia('document.body.innerText');
      if (!/Nhãn này nghĩa là gì/.test(chu)) throw new Error(`${ten}: tờ giấy in nhãn mà không giải nghĩa nhãn`);
      if (!/KHÔNG phải chứng chỉ CEFR/.test(chu)) throw new Error(`${ten}: mất câu tự phủ nhận chứng chỉ CEFR`);

      await t.danhGia(DONG_PANEL); await cho(400);
      return nhanTo;
    };

    const a = await doMotLuot(true, 'bản ghi MỚI');
    const b = await doMotLuot(false, 'bản ghi CŨ (thiếu nhanIn)');

    await t.danhGia('localStorage.removeItem("bandExamHistoryV1")');
    await t.diToi(BASE); await cho(800);
    return `bản mới in “${a}” · bản cũ thiếu nhanIn cũng in “${b}”`;
  });
  // ── Toàn cảnh ────────────────────────────────────────────────────────────
  const tatCaLoi = t.nhatKy.filter(LOC);
  ghi('không có lỗi console / ngoại lệ / request hỏng trên toàn hành trình',
    tatCaLoi.length === 0,
    tatCaLoi.length ? `${tatCaLoi.length} lỗi: ${goiLoi(tatCaLoi.slice(0, 4))}` : '');
} finally {
  const canh = t.nhatKy.filter((x) => !LOC(x));
  if (canh.length) console.log(`\ncảnh báo (KHÔNG tính vào kết quả): ${canh.length}`);
  t.dong();
  tienTrinh.kill();
  may.dong();
}

// ══ BÁNH CÓC SỐ BƯỚC ═══════════════════════════════════════════════════════
// Một bộ rà MẤT BƯỚC mà vẫn báo "toàn ĐẠT" là kiểu hỏng tệ nhất của một bộ rà:
// nó không đỏ, nó chỉ soi ít đi. Đã dính thật — thêm hai cờ micro giả cho Chrome
// làm một bước có điều kiện của một bộ rà khác biến mất, và nó tụt từ 35 xuống 34 bước
// trong khi vẫn in "bước đạt: 34/34".
//
// Con số dưới là công thật, chỉ được đi LÊN. Bớt bước có chủ ý thì sửa nó và
// ghi vì sao — nhưng phải là một quyết định có chữ, không phải một dòng lọt qua.
const SO_BUOC_TOI_THIEU = 22;
const dat = ket.filter((k) => k.ok).length;
console.log(`\nbước đạt: ${dat}/${ket.length}`);
if (ket.length < SO_BUOC_TOI_THIEU) {
  console.log(`\n❌ MẤT BƯỚC: chỉ chạy ${ket.length}/${SO_BUOC_TOI_THIEU} bước. Bộ rà đang soi ít hơn trước mà không ai bảo nó bớt.`);
  process.exit(1);
}
if (dat < ket.length) {
  console.log('\nCÁC BƯỚC HỎNG:');
  for (const k of ket.filter((x) => !x.ok)) console.log(`  · ${k.buoc} :: ${k.chiTiet}`);
}
process.exit(dat === ket.length ? 0 : 1);
