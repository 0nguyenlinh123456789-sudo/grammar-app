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
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9337 });
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
  await may.dong?.();
}

const dat = ket.filter((k) => k.ok).length;
console.log(`\nbước đạt: ${dat}/${ket.length}`);
if (dat < ket.length) {
  console.log('\nCÁC BƯỚC HỎNG:');
  for (const k of ket.filter((x) => !x.ok)) console.log(`  · ${k.buoc} :: ${k.chiTiet}`);
}
process.exit(dat === ket.length ? 0 : 1);
