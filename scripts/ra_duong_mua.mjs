// File: scripts/ra_duong_mua.mjs
//
//   npm run ra:mua
//
// RÀ ĐƯỜNG ĐẶT MUA — đường duy nhất mang lại tiền, và cho tới nay là đường
// KHÔNG bộ nào đi qua.
//
// ══ VÌ SAO CÓ FILE NÀY ══
// Ba bộ rà đã có đều đi vào app với `/api/access` bị chặn và trả lời "đã kích
// hoạt" — tức chúng dựng lại trạng thái KHÁCH ĐÃ MUA. Hợp lý cho việc kiểm bài
// học, nhưng nó bỏ trắng đúng cái màn hình mà khách CHƯA mua nhìn thấy đầu tiên,
// và bỏ trắng cả ba cái nút "MUA …".
//
// Cái nằm im trong khoảng trắng đó, đo được trên bản live: bấm "MUA PREMIUM"
// thì app sao chép một lời nhắn "vui lòng gửi thông tin thanh toán" — mà cả app
// không có một số điện thoại, Zalo hay email nào để gửi. Và nó khai "Đã sao
// chép" ngay cả khi `navigator.clipboard` không tồn tại. Chi tiết ở
// `src/utils/banHang.js`.
//
// ══ ĐI QUA CỔNG THẬT ══
// `moTab(cong, { chanApi: false })`. Bản dựng ở máy không có API, nên `/api/access`
// trả về index.html và app **fail-closed** — đúng trạng thái khách chưa mua.
// Đó là điều kiện để màn hình bảng giá hiện ra.
//
// ══ PHÉP KIỂM THẬT SỰ ĐÁNG HỎI ══
// Giống bước micro ở `hoc_that.mjs`: **bấm một cái nút thì phải có gì đó xảy
// ra, và thứ xảy ra không được nói dối.** Cụ thể:
//   · phải hiện ra một khối nói rõ khách vừa chọn gói nào;
//   · chưa cấu hình kênh nào thì phải BÁO đúng chuyện đó, không im lặng;
//   · lời nhắn phải nằm trong một ô khách chọn và tự sao chép được — đường đi
//     tiếp cho cả trường hợp clipboard bị chặn;
//   · và tuyệt đối không được khai "đã sao chép" khi chưa sao chép được.

import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';
import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { CHUA_CO_KENH } from '../src/utils/banHang.js';
import { GOI as DS_GOI, giaGoi, tienVN } from '../src/utils/goi.js';

const CONG = 4341;
// Tên nút dựng TỪ danh sách gói thật, không gõ tay: gõ tay thì đổi gói xong bộ
// rà vẫn tìm nút cũ và báo hỏng ở chỗ không hỏng — hoặc tệ hơn, tìm đúng nút cũ
// còn sót và chấm ĐẠT cho một bảng giá đã lỗi thời.
const NUT = DS_GOI.map((g) => `MUA GÓI ${g.ten.toUpperCase()}`);

const may = await moMayChuXemTruoc({ cong: CONG, dungLai: process.env.BO_DUNG !== '1' });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9361 });
const t = await moTab(cong, { chanApi: false });

const ket = [];
const ghi = (nhan, ok, ct = '') => {
  ket.push(ok);
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${nhan}${ct ? ` :: ${ct}` : ''}`);
};
const loiThat = () => t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));

// Hộp bảng giá, tìm theo `aria-labelledby` chứ không theo thứ tự: lấy panel
// "cuối cùng" hay "đầu tiên" đã báo oan hai lần ở `hoc_that.mjs`.
const HOP = 'document.querySelector(\'.fixed.inset-0[aria-labelledby="pricing-title"]\')';
const CHU_HOP = `(${HOP} ? ${HOP}.innerText : '')`;

try {
  await t.diToi(`http://127.0.0.1:${CONG}/`);
  await new Promise((r) => setTimeout(r, 1500));

  // 1. Khách CHƯA mua phải gặp cổng, không được vào thẳng bài học.
  const trongApp = await t.danhGia("document.body.innerText.includes('TÌM TRONG KHÓA HỌC')");
  ghi('khách chưa có mã thì GẶP cổng kích hoạt, không vào thẳng được', !trongApp,
    trongApp ? 'vào thẳng được app mà không cần mã — cổng bán hàng bị hở' : '');

  // 2. Từ cổng đó phải mở được bảng giá — không mở được thì khách không biết mua kiểu gì.
  const moBang = await t.danhGia(BAM_THEO_CHU('XEM BẢNG GIÁ'));
  await new Promise((r) => setTimeout(r, 700));
  const coHop = await t.danhGia(`!!${HOP}`);
  ghi('mở được bảng giá từ màn hình kích hoạt', moBang && coHop,
    [moBang ? '' : 'không tìm thấy nút mở bảng giá', coHop ? '' : 'bấm rồi mà hộp bảng giá không hiện'].filter(Boolean).join(' | '));

  if (coHop) {
    // 3. Ba nút mua phải có mặt đủ.
    for (const nhan of NUT) {
      const co = await t.danhGia(`${CHU_HOP}.includes(${JSON.stringify(nhan)})`);
      ghi(`bảng giá có nút "${nhan}"`, co);
    }

    // 4. Bấm từng gói: phải có gì đó xảy ra, và không được nói dối.
    for (const nhan of NUT) {
      const truoc = loiThat().length;
      const bam = await t.danhGia(BAM_THEO_CHU(nhan));
      if (!bam) { ghi(`bấm "${nhan}"`, false, 'không bấm được'); continue; }
      // Chờ tới lúc khối xác nhận hiện ra, chứ không chờ một khoảng cố định.
      let hien = false;
      for (let i = 0; i < 40; i += 1) {
        if (await t.danhGia(`${CHU_HOP}.includes('Đơn của bạn')`)) { hien = true; break; }
        await new Promise((r) => setTimeout(r, 100));
      }
      const chu = await t.danhGia(CHU_HOP);
      const noLoi = loiThat().length > truoc;
      const ten = nhan.replace('MUA GÓI ', '');

      ghi(`"${nhan}" → hiện khối xác nhận, không im lặng`, hien && !noLoi,
        [hien ? '' : 'bấm xong không có gì hiện ra', noLoi ? 'và có lỗi bắn ra' : ''].filter(Boolean).join(' '));
      // Dòng xác nhận phải nêu CẢ tên gói LẪN giá. Giá ở đây đi qua
      // `timGoiTheoTen` (khách bấm nút thì chỉ có TÊN gói, không có id), một
      // đường tra chỉ có test đơn vị đi qua chứ chưa từng vẽ ra trong trình
      // duyệt. Thiếu giá ở đây thì khách mở app ngân hàng mà không biết gõ bao
      // nhiêu — đúng lúc thiếu giá đau nhất.
      // So KHÔNG PHÂN BIỆT HOA THƯỜNG: nhãn nút đã viết hoa (`MUA GÓI 1 THÁNG`)
      // nên `ten` ra "1 THÁNG" trong khi gói tên "1 tháng". Bản đầu so thẳng và
      // ra null cho cả ba gói — hỏng ở thước đo, app không sai. Phép canh cũ dùng
      // cờ `i` nên nó che mất chuyện này.
      const g = DS_GOI.find((x) => x.ten.toLowerCase() === ten.toLowerCase());
      const giaMong = g ? tienVN(giaGoi(g.ma, {})) : null;
      ghi(`"${nhan}" → nói rõ khách vừa chọn gói nào, KÈM giá`,
        new RegExp(`Đơn của bạn: gói ${ten}`, 'i').test(chu) && !!giaMong && chu.includes(giaMong),
        giaMong && !chu.includes(giaMong)
          ? `không thấy giá ${giaMong} trong dòng xác nhận`
          : `gói ${ten} · ${giaMong}`);
    }

    // 4b. GIÁ. Thêm 19/08 sau khi phát hiện "bảng giá" không có một con số nào.
    // Kiểm bằng TRÌNH DUYỆT THẬT chứ không chỉ dò chuỗi trong mã: dự án này đã
    // dính chuyện chuỗi nằm đúng trong nguồn mà màn hình không hiện ra (đếm lớp
    // z-index, và băng cảnh báo bị lớp phủ che). Ở đây phải đọc được bằng mắt.
    const chuThe = await t.danhGia(CHU_HOP);
    // Giá nay LUÔN có (đặt sẵn trong goi.js), nên không còn nhánh "chưa có giá"
    // để chấp nhận. Hỏi thẳng: ĐỦ ba con số đúng bằng ba giá thật hay không.
    const thieuGia = DS_GOI.filter((g) => !chuThe.includes(tienVN(giaGoi(g.ma, {}))));
    ghi('mỗi gói hiện ĐÚNG giá của nó', thieuGia.length === 0,
      thieuGia.length
        ? `không thấy giá của: ${thieuGia.map((g) => `${g.ten} (${tienVN(giaGoi(g.ma, {}))})`).join(', ')}`
        : `đủ ba giá: ${DS_GOI.map((g) => tienVN(giaGoi(g.ma, {}))).join(' · ')}`);

    // 4c. CHUYỂN KHOẢN. Chủ dự án chọn nhận tiền thẳng vào ngân hàng và chấp
    // nhận lộ TÊN chủ tài khoản (không lộ thứ khác). Bước này chấp nhận cả hai
    // trạng thái đúng, nhưng KHÔNG chấp nhận trạng thái thứ ba: im lặng.
    //
    // Đặt VITE_BANK_NAME + VITE_BANK_ACCOUNT rồi chạy lại để rà nhánh ĐÃ cấu hình.
    // ⚠️ CỜ `i` KHÔNG PHẢI CHO CHẮC ĂN — không có nó thì phép so này SAI HẲN.
    // `innerText` trả về chữ ĐÃ bị `text-transform: uppercase` biến đổi, mà tiêu
    // đề khối chuyển khoản có class `uppercase`, nên chuỗi thật là "CHUYỂN KHOẢN
    // NGÂN HÀNG". Lượt chạy đầu báo "không có khối, cũng không báo" trong khi khối
    // hiện ra đầy đủ — hỏng ở thước đo chứ không ở sản phẩm. Nhánh "Chưa có thông
    // tin chuyển khoản" lọt lưới chỉ vì câu đó tình cờ không viết hoa.
    const coKenh = /Nhắn Zalo|Gửi email|Gọi điện|Mở trang đặt mua/.test(chuThe);
    const coCK = /chuyển khoản ngân hàng/i.test(chuThe);
    const baoCK = /chưa có thông tin chuyển khoản/i.test(chuThe);
    // ⚠️ CHỈ HỎI KHI CÓ KÊNH GIAO MÃ. Bản đầu hỏi vô điều kiện và nó ĐỎ ngay lúc
    // bản vá đúng vừa vào: khi chưa có kênh, khối chuyển khoản bị giấu HẲN nên
    // không có khối mà cũng không có lời báo — và phép canh cũ đọc đó là hỏng.
    // Tức nó đòi app phải mời khách trả tiền. Cùng họ với `conThieu.length > 0`
    // hồi trước: một phép canh hoá SAI đúng lúc việc được làm cho đúng.
    if (coKenh) {
      ghi('có khối chuyển khoản, hoặc BÁO là chưa có thông tin chuyển khoản',
        coCK || baoCK,
        coCK ? 'đã cấu hình ngân hàng nên hiện khối chuyển khoản'
          : (baoCK ? 'chưa cấu hình ngân hàng nên BÁO (đúng)'
            : 'không có khối, cũng không báo — khách không biết trả tiền kiểu gì'));
    } else {
      ghi('chưa có kênh giao mã thì KHÔNG mời trả tiền', !coCK && !baoCK,
        coCK || baoCK
          ? 'vẫn nói chuyện chuyển khoản dù không có cách nào gửi mã truy cập'
          : 'giấu hẳn phần trả tiền (đúng) — chưa có đường giao thì chưa mở bán');
    }

    // ⚠️ PHÉP CANH VỀ CẶP, KHÔNG PHẢI VỀ TỪNG MẢNH. Bộ rà này từng chấm 18/18
    // ĐẠT cho đúng trạng thái tệ nhất: ngân hàng đã cấu hình, kênh liên hệ thì
    // chưa — khách đọc số tài khoản thật, chuyển tiền thật, rồi đọc câu "Chưa có
    // kênh đặt mua nào được cấu hình". Nó lọt vì mỗi phép chỉ hỏi một mảnh:
    // `coCK || baoCK` đạt, `coBao || coKenh` đạt, và không phép nào hỏi về CẶP.
    // Cùng hình dạng hai cái bẫy đã sửa trước đó trong phiên này.
    ghi('KHÔNG hiện số tài khoản khi chưa có đường giao mã truy cập',
      !(coCK && !coKenh),
      coCK && !coKenh ? 'ĐANG mời khách chuyển tiền trong khi không có cách nào gửi mã truy cập cho họ'
        : (coCK ? 'có cả chuyển khoản lẫn kênh giao mã (đúng)' : 'chưa mở chuyển khoản'));

    // Mã đơn là sợi dây DUY NHẤT nối một khoản tiền với một người mua. Có khối
    // chuyển khoản thì mã đơn phải hiện, phải hiện ở NHIỀU chỗ (khối mã + dòng
    // Nội dung), và tất cả phải là CÙNG MỘT mã — hai mã khác nhau trên cùng một
    // màn hình thì khách chép nhầm, và khoản tiền mất dấu sau khi đã trả.
    if (coCK) {
      const ma = chuThe.match(/BE-[A-Z0-9]{6}/g) || [];
      const rieng = new Set(ma);
      ghi('mã đơn hiện ra, cùng một mã, ở nhiều chỗ',
        ma.length >= 2 && rieng.size === 1,
        rieng.size > 1
          ? `hiện ${rieng.size} mã KHÁC NHAU: ${[...rieng].join(', ')}`
          : `${ma.length} lần, mã ${[...rieng][0] || '(không có)'}`);
    }

    // 5. Chưa cấu hình kênh nào (đúng trạng thái hiện tại) thì phải BÁO.
    const chu = await t.danhGia(CHU_HOP);
    const coBao = chu.includes(CHUA_CO_KENH.slice(0, 40));
    ghi('chưa cấu hình kênh đặt mua thì BÁO thẳng, không để khách chờ vô ích',
      coBao || coKenh,
      coKenh ? 'đã có kênh cấu hình nên hiện kênh (cũng đúng)' : (coBao ? '' : 'không báo, cũng không có kênh nào — khách bấm MUA rồi không biết làm gì'));

    // 6. Ô lời nhắn phải có mặt để tự sao chép được — đường đi tiếp khi clipboard bị chặn.
    const oLoiNhan = await t.danhGia(`(() => {
      const o = ${HOP} && ${HOP}.querySelector('textarea[aria-label="Lời nhắn đặt mua"]');
      return o ? o.value.length : 0;
    })()`);
    ghi('có ô lời nhắn để khách tự chọn và sao chép', oLoiNhan > 40, `${oLoiNhan} ký tự`);

    // 7. KHÔNG được khai đã sao chép khi trình duyệt không cho.
    //
    // ⚠️ NÓI RÕ GIỚI HẠN: bước này ĐẠT cả trên bản cũ, nên nó KHÔNG phải bằng
    // chứng cho bản vá. Lý do: ở Chrome headless, `writeText` **từ chối** chứ
    // không phải vắng mặt, nên bản cũ ném ngoại lệ và không kịp khai gì cả —
    // cái bắt được bản cũ là bước 4 (không có gì hiện ra) và bước cuối (có
    // ngoại lệ). Nhánh "clipboard vắng mặt" thì chỉ `tests/ban_hang.test.js`
    // với hàng giả mới đi tới được.
    const khaiSai = chu.includes('Đã sao chép') && !chu.includes('Đã sao chép lời nhắn');
    ghi('không khai "đã sao chép" một cách vô căn cứ', !khaiSai,
      khaiSai ? 'hộp nói đã sao chép trong khi không có gì bảo đảm việc đó xảy ra' : '');
  }

  const loi = loiThat();
  ghi('không có lỗi console / ngoại lệ / request hỏng trên đường mua', loi.length === 0,
    loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 120)}`).join(' | '));
} finally {
  t.dong();
  tienTrinh.kill();
  may.dong();
}

const dat = ket.filter(Boolean).length;
console.log(`\nbước đạt: ${dat}/${ket.length}`);
process.exit(dat === ket.length ? 0 : 1);
