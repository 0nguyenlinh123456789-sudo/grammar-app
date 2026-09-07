// File: scripts/ra_tim_kiem.mjs
//
//   npm run ra:timkiem
//
// Ô "TÌM TRONG KHÓA HỌC" CÓ TÌM RA BÀI CÓ THẬT KHÔNG.
//
// ══ VÌ SAO CÓ BỘ NÀY ══
// Ô tìm kiếm dựng kết quả từ ba PROP của MainLayout: `parsedGrammarData`,
// `vstepTopics`, `courseData`. Cả ba đều khởi tạo RỖNG trong App.jsx và chỉ
// được đổ đầy khi người học ĐÃ VÀO đúng khu tương ứng (`appMode === 'grammar'`,
// `'vocab'`, `'games'`). Ở màn hình đầu tiên — đúng chỗ người ta gõ tìm kiếm —
// cả ba vẫn rỗng, nên ô tìm kiếm trả lời:
//
//     "Không tìm thấy bài phù hợp."
//
// cho những bài CÓ THẬT trong khoá. Không lỗi, không cảnh báo, không cách nào
// người học biết là mình vừa bị nói dối. Đây đúng họ lỗi "cái chốt tự nó không
// an toàn": thứ trông như đang chạy, và câu trả lời sai lại trông y hệt câu trả
// lời đúng cho một từ khoá không có thật.
//
// ══ ĐO GÌ ══
//   1. Từ màn hình ĐẦU TIÊN (chưa vào khu nào), gõ tên bài CÓ THẬT → phải ra.
//      Năm từ khoá, phủ cả sáu loại chặng: ngữ pháp, từ vựng, Oxford, nghe,
//      đọc, chép chính tả.
//   2. Bấm vào kết quả có MỞ ĐÚNG bài không — tìm ra mà bấm không đi tới đâu
//      thì vẫn là hỏng.
//   3. Từ khoá KHÔNG có thật vẫn phải trả "không tìm thấy" — nếu không, phép
//      đo trên là vô nghĩa (mọi thứ đều ra kết quả).
//   4. ĐỘ PHỦ (số loại nội dung được lập chỉ mục) đo ở tests/tim_kiem.test.js,
//      không đo ở đây: mốc đó phải đọc từ MÃ chứ không từ DOM.
//   5. Trên khổ điện thoại: mấy lần chạm từ lúc mở app tới lúc ô nhập có con
//      trỏ. Ô nằm trong ngăn kéo nên con số này không hiển nhiên.
//
// ══ KHÔNG ĐO ĐƯỢC ══
// Kết quả có XẾP ĐÚNG THỨ TỰ ƯU TIÊN không, và người học có thấy nó "trúng ý"
// không — cần mắt người. Bộ này chỉ trả lời "có ra hay không".

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));

// Năm từ khoá, mỗi cái là một mẩu tiêu đề CÓ THẬT trong lộ trình (đã đối chiếu
// với src/data/roadmapData.js), phủ cả sáu loại chặng. Ghi kèm loại để khi hỏng
// còn biết mất nguồn nào chứ không chỉ biết "hỏng".
const TU_KHOA = [
  { go: 'bảng chữ cái', loai: 'ngữ pháp (A0)', mong: 'Bảng Chữ Cái' },
  { go: 'kinh doanh', loai: 'từ vựng (B2)', mong: 'Kinh Doanh' },
  { go: 'talking about language', loai: 'Oxford (unit 1)', mong: 'Talking about language' },
  { go: 'railway', loai: 'bài đọc VOA', mong: 'Railway' },
  { go: 'chép chính tả', loai: 'nghe chép chính tả', mong: 'chính tả' },
];

// Một chuỗi chắc chắn KHÔNG có trong khoá. Không có bước này thì một bản vá
// "trả về mọi thứ cho mọi từ khoá" cũng làm bộ rà xanh rực.
const KHONG_CO = 'zzqqxxvv khong ton tai';

const may = await moMayChuXemTruoc({ cong: 4331 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9347 });

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

// Mở ô tìm kiếm. Nút mang chữ "TÌM TRONG KHÓA HỌC" và là nút bật/tắt, nên chỉ
// bấm khi ô CHƯA mở — bấm hai lần là đóng lại và mọi phép đo sau đó đọc rỗng.
const O_NHAP = `(() => {
  const o = [...document.querySelectorAll('input')].find((e) => /Ví dụ:/.test(e.placeholder || ''));
  if (!o) return null;
  const r = o.getBoundingClientRect();
  return { co: true, hien: r.width > 0 && r.height > 0, dangChon: document.activeElement === o };
})()`;

// Gõ vào ô tìm kiếm. React là input CÓ ĐIỀU KHIỂN: gán thẳng `.value` KHÔNG
// kích hoạt onChange (React ghi đè setter của thuộc tính để dò thay đổi). Phải
// gọi setter GỐC trên prototype rồi mới bắn sự kiện — nếu không, ô hiện chữ mà
// state của React vẫn rỗng, và bộ rà sẽ đọc "không có kết quả" cho MỌI từ khoá,
// kể cả sau khi bản vá đã đúng.
const GO = (chu) => `(() => {
  const o = [...document.querySelectorAll('input')].find((e) => /Ví dụ:/.test(e.placeholder || ''));
  if (!o) return 'KHONG_THAY_O_NHAP';
  const dat = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  dat.call(o, ${JSON.stringify(chu)});
  o.dispatchEvent(new Event('input', { bubbles: true }));
  return 'OK';
})()`;

// Đọc bảng kết quả. Trả về nhãn + tiêu đề từng dòng, KHÔNG trả phần tử DOM:
// CDP không tuần tự hoá được phần tử ("Object reference chain is too long").
//
// Dùng 'textContent' chứ KHÔNG dùng 'innerText': nhãn loại kết quả có class
// 'uppercase', và 'innerText' ÁP text-transform nên trả về chữ đã bị viết hoa.
// Đã dính đúng bẫy này một lần ở bộ ra_nghe_phat_am.
const KET_QUA = `(() => {
  const o = [...document.querySelectorAll('input')].find((e) => /Ví dụ:/.test(e.placeholder || ''));
  if (!o) return null;
  // Bảng kết quả đọc qua MỐC ĐẶT TÊN, không qua class Tailwind. Bản đầu dò
  // 'querySelector('.absolute')' và bắt trúng thẻ <svg> icon kính lúp — cũng
  // 'absolute', và đứng TRƯỚC trong DOM. Phép đo đọc nhầm phần tử thì mọi con
  // số sau đó đều là số của một thứ khác.
  const hop = document.querySelector('[data-cong-cu="ket-qua-tim"]');
  if (!hop) return { dong: [], khongThay: false, trong: true };
  const nut = [...hop.querySelectorAll('button')];
  return {
    dong: nut.map((b) => (b.textContent || '').trim().slice(0, 70)),
    khongThay: /Không tìm thấy/i.test(hop.textContent || ''),
    trong: false,
  };
})()`;

// Đang ở màn nào. Đọc mốc điều hướng chứ không đoán theo chữ trên màn — bộ rà
// trước đã đo nhầm cả một loạt bước vì tưởng mình đã chuyển màn mà thực ra
// chưa đi đâu cả.
const DANG_O = `(() => {
  const t = (document.body.textContent || '');
  if (/LỘ TRÌNH/i.test(t) && /HỌC 15 PHÚT/i.test(t)) return 'home';
  return 'khac';
})()`;


// Mọi dòng kết quả có VỚI TỚI ĐƯỢC không.
//
// Bản đầu của bước này đòi cả 9 dòng cùng NHÌN THẤY một lúc, và báo hỏng
// 6/9. Đo lại bằng cách cuộn rồi đếm: sau khi cuộn là đủ 9. Bảng cao 288px
// chứa 620px nội dung và TỰ CUỘN — đúng thiết kế, không phải lỗi. Đòi 620px
// cùng hiện trên màn 844px là đòi thứ không thể có.
//
// Ràng buộc thật, và là thứ đáng giữ: KHÔNG DÒNG NÀO NGOÀI TẦM VỚI. Mỗi
// dòng phải hoặc đang nhìn thấy, hoặc có tổ tiên cuộn được để đưa nó vào.
// Cùng khuôn với `cuonDuoc()` của scripts/ra_dien_thoai.mjs.
const VOI_TOI = `(() => {
  const hop = document.querySelector('[data-cong-cu="ket-qua-tim"]');
  if (!hop) return null;
  const nut = [...hop.querySelectorAll('button')];
  const cuonDuoc = (e) => {
    for (let p = e.parentElement; p; p = p.parentElement) {
      const st = getComputedStyle(p);
      if (/auto|scroll/.test(st.overflowY) && p.scrollHeight > p.clientHeight + 2) return true;
    }
    return false;
  };
  const ngoai = [];
  for (const e of nut) {
    const r = e.getBoundingClientRect();
    const trongMan = r.top >= -1 && r.bottom <= window.innerHeight + 1;
    if (!trongMan && !cuonDuoc(e)) ngoai.push((e.textContent || '?').trim().slice(0, 30));
  }
  return { tong: nut.length, ngoai };
})()`;

async function chuanBi(t) {
  await t.diToi(may.BASE);
  await nghi(1600);
  for (const nhan of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
    await t.danhGia(BAM_THEO_CHU(nhan));
    await nghi(400);
  }
}

try {
  // ── PHẦN A: từ màn hình đầu tiên, tìm bài có thật ─────────────────────────
  {
    const t = await moTab(cong);
    await t.goi('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await chuanBi(t);

    const o = await t.danhGia(DANG_O);
    ghi('[chuẩn bị] đang đứng ở màn hình đầu tiên', o === 'home', `màn: ${o}`);

    await t.danhGia(BAM_THEO_CHU('TÌM TRONG KHÓA HỌC'));
    await nghi(500);
    const on = await t.danhGia(O_NHAP);
    ghi('[chuẩn bị] mở được ô tìm kiếm', !!on && on.hien, on ? JSON.stringify(on) : 'không thấy ô');

    for (const tk of TU_KHOA) {
      await t.danhGia(GO(tk.go));
      await nghi(400);
      const kq = await t.danhGia(KET_QUA);
      const trung = !!kq && kq.dong.some((d) => d.toLowerCase().includes(tk.mong.toLowerCase()));
      ghi(`gõ "${tk.go}" → ra bài ${tk.loai}`, trung,
        kq ? `${kq.dong.length} kết quả${kq.khongThay ? ' · app nói KHÔNG TÌM THẤY' : ''}${kq.dong.length ? ' · ' + kq.dong.slice(0, 2).join(' | ') : ''}` : 'không đọc được bảng');
    }

    // Từ khoá không có thật: phải KHÔNG ra gì. Thiếu bước này thì một bản vá
    // trả về cả khoá học cho mọi từ khoá cũng qua được năm bước trên.
    await t.danhGia(GO(KHONG_CO));
    await nghi(400);
    const rong = await t.danhGia(KET_QUA);
    ghi('từ khoá không có thật vẫn báo "không tìm thấy"',
      !!rong && rong.dong.length === 0 && rong.khongThay,
      rong ? `${rong.dong.length} kết quả` : 'không đọc được bảng');

    const loi = t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));
    ghi('[1440px] không lỗi console khi tìm kiếm', loi.length === 0,
      loi.slice(0, 2).map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`).join(' | '));
    t.dong();
  }

  // ── PHẦN B: bấm vào kết quả có mở đúng bài không ──────────────────────────
  {
    const t = await moTab(cong);
    await t.goi('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await chuanBi(t);
    await t.danhGia(BAM_THEO_CHU('TÌM TRONG KHÓA HỌC'));
    await nghi(500);
    await t.danhGia(GO('bảng chữ cái'));
    await nghi(500);

    const bam = await t.danhGia(`(() => {
      const o = [...document.querySelectorAll('input')].find((e) => /Ví dụ:/.test(e.placeholder || ''));
      const hop = o && document.querySelector('[data-cong-cu="ket-qua-tim"]');
      if (!hop) return 'KHONG_CO_BANG';
      const n = [...hop.querySelectorAll('button')].find((b) => /Bảng Chữ Cái/i.test(b.textContent || ''));
      if (!n) return 'KHONG_CO_DONG';
      n.click();
      return 'DA_BAM';
    })()`);
    await nghi(1400);

    // KHÔNG đo bằng /Bảng Chữ Cái/ trong body: chuỗi đó VỐN có trên trang chủ
    // (nó là tên một chặng trong lộ trình), nên phép kiểm ấy ĐÚNG ở mọi lần
    // chạy — kể cả khi cú bấm không đi tới đâu. Đo bằng dàn tab của màn bài
    // học, thứ CHỈ tồn tại sau khi đã rời trang chủ.
    const den = await t.danhGia(`(() => {
      const t = document.body.textContent || '';
      return {
        roiTrangChu: !/HỌC 15 PHÚT/i.test(t),
        coTabBaiHoc: /Nghe & Đọc/i.test(t) && /Lý thuyết|Lý Thuyết/i.test(t),
        dungBai: /Bảng Chữ Cái/i.test(t),
      };
    })()`);
    ghi('bấm kết quả tìm kiếm MỞ ĐÚNG bài học',
      bam === 'DA_BAM' && !!den && den.roiTrangChu && den.coTabBaiHoc && den.dungBai,
      `bấm: ${bam}${den ? ` · rời trang chủ: ${den.roiTrangChu} · có dàn tab bài học: ${den.coTabBaiHoc} · đúng bài: ${den.dungBai}` : ''}`);

    const loi = t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));
    ghi('không lỗi console khi mở bài từ kết quả', loi.length === 0,
      loi.slice(0, 2).map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`).join(' | '));
    t.dong();
  }

  // ── PHẦN B2: bấm kết quả khi ĐANG Ở MÀN KHÁC ─────────────────────────────
  // Trang chủ là chunk lazy. Bấm từ màn khác nghĩa là WelcomePage phải TẢI RỒI
  // MỚI mở được chặng. Cách làm bằng `setTimeout` sẽ hỏng đúng ở đây, và hỏng
  // theo kiểu tệ nhất: bấm không có gì xảy ra, thử lại lần hai thì được (chunk
  // đã nằm trong bộ đệm). Nên trường hợp này phải có phép đo riêng.
  {
    const t = await moTab(cong);
    await t.goi('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await chuanBi(t);

    // Rời trang chủ trước đã.
    await t.danhGia(BAM_THEO_CHU('GAMES'));
    await nghi(1800);
    const roi = await t.danhGia(DANG_O);
    ghi('[chuẩn bị] đã rời khỏi trang chủ trước khi tìm', roi !== 'home', `màn: ${roi}`);

    await t.danhGia(BAM_THEO_CHU('TÌM TRONG KHÓA HỌC'));
    await nghi(500);
    await t.danhGia(GO('bảng chữ cái'));
    await nghi(500);
    const bam2 = await t.danhGia(`(() => {
      const hop = document.querySelector('[data-cong-cu="ket-qua-tim"]');
      if (!hop) return 'KHONG_CO_BANG';
      const n = [...hop.querySelectorAll('button')].find((b) => /Bảng Chữ Cái/i.test(b.textContent || ''));
      if (!n) return 'KHONG_CO_DONG';
      n.click();
      return 'DA_BAM';
    })()`);
    await nghi(2200);

    const den2 = await t.danhGia(`(() => {
      const t = document.body.textContent || '';
      return {
        coTabBaiHoc: /Nghe & Đọc/i.test(t) && /Lý thuyết|Lý Thuyết/i.test(t),
        dungBai: /Bảng Chữ Cái/i.test(t),
      };
    })()`);
    ghi('bấm kết quả TỪ MÀN KHÁC vẫn mở đúng bài (trang chủ là chunk lazy)',
      bam2 === 'DA_BAM' && !!den2 && den2.coTabBaiHoc && den2.dungBai,
      `bấm: ${bam2}${den2 ? ` · có dàn tab bài học: ${den2.coTabBaiHoc} · đúng bài: ${den2.dungBai}` : ''}`);

    const loi = t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));
    ghi('không lỗi console khi mở bài từ màn khác', loi.length === 0,
      loi.slice(0, 2).map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`).join(' | '));
    t.dong();
  }
  // ── PHẦN C: khổ điện thoại — với tới ô tìm kiếm mất mấy chạm ──────────────
  {
    const t = await moTab(cong);
    await t.goi('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await chuanBi(t);

    let cham = 0;
    await t.danhGia(BAM_THEO_CHU('MENU')); cham++;
    await nghi(700);
    await t.danhGia(BAM_THEO_CHU('TÌM TRONG KHÓA HỌC')); cham++;
    await nghi(600);

    const on = await t.danhGia(O_NHAP);
    ghi(`[390px] với tới ô tìm kiếm trong ${cham} chạm`, !!on && on.hien && cham <= 2,
      on ? `hiện: ${on.hien} · đang chọn sẵn: ${on.dangChon}` : 'không thấy ô');

    await t.danhGia(GO('kinh doanh'));
    await nghi(500);
    const kq = await t.danhGia(KET_QUA);
    ghi('[390px] tìm ra bài trên khổ điện thoại',
      !!kq && kq.dong.some((d) => /Kinh Doanh/i.test(d)),
      kq ? `${kq.dong.length} kết quả` : 'không đọc được bảng');

    // "chép chính tả" ra 9 kết quả — đủ nhiều để bảng chạm đáy khối cuộn.
    await t.danhGia(GO('chép chính tả'));
    await nghi(450);
    const voi = await t.danhGia(VOI_TOI);
    ghi('[390px] không dòng kết quả nào ngoài tầm với',
      !!voi && voi.ngoai.length === 0,
      voi ? `${voi.tong} dòng · ngoài tầm: ${voi.ngoai.length ? voi.ngoai.join(' | ') : 'không'}` : 'không đọc được bảng');

    await t.danhGia(GO('kinh doanh'));
    await nghi(400);
    // Bảng kết quả có bị lớp khác đè không — ở khổ hẹp nó là hộp tuyệt đối nằm
    // trong ngăn kéo, đúng chỗ dễ bị nút nổi và thanh dưới che.
    const che = await t.danhGia(`(() => {
      const o = [...document.querySelectorAll('input')].find((e) => /Ví dụ:/.test(e.placeholder || ''));
      const hop = o && document.querySelector('[data-cong-cu="ket-qua-tim"]');
      if (!hop) return 'KHONG_CO_BANG';
      const n = hop.querySelector('button');
      if (!n) return 'KHONG_CO_DONG';
      const r = n.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) return 'NGOAI_MAN';
      const tren = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      // Trả BOOLEAN, không trả phần tử: CDP không tuần tự hoá được phần tử DOM.
      return tren && (tren === n || n.contains(tren)) ? 'KHONG_BI_CHE' : 'BI_CHE';
    })()`);
    ghi('[390px] dòng kết quả bấm được, không bị lớp khác đè', che === 'KHONG_BI_CHE', String(che));

    const loi = t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));
    ghi('[390px] không lỗi console', loi.length === 0,
      loi.slice(0, 2).map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`).join(' | '));
    t.dong();
  }
} catch (e) {
  // KHÔNG để `finally` + `process.exit` nuốt ngoại lệ: bản đầu của một bộ rà
  // khác đã in "0/0 — toàn ĐẠT" trong khi nó ném ngay ở bước hai.
  console.error('\n!!! BỘ RÀ NÉM NGOẠI LỆ:\n', e && e.stack ? e.stack : e);
  ghi('bộ rà chạy hết không ném', false, String(e && e.message));
} finally {
  const dat = ket.filter((k) => k.ok).length;
  console.log(`\nbước đạt: ${dat}/${ket.length}`);
  tienTrinh.kill();
  may.dong();
  process.exit(dat === ket.length ? 0 : 1);
}
