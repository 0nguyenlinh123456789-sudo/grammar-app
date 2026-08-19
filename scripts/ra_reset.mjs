// File: scripts/ra_reset.mjs
//
//   npm run ra:reset
//
// RÀ CHỨC NĂNG "RESET LỘ TRÌNH" — chủ dự án báo nó không hoạt động.
//
// ══ VÌ SAO PHẢI LÁI THẬT CHỨ KHÔNG ĐỌC MÃ ══
// Đọc `resetRoadmap` trong App.jsx thì thấy nó rất đầy đủ: xoá XP, chặng đã
// xong, chuỗi ngày, thống kê, điểm đã xác minh, tiến độ từ vựng. Nhìn mã thì
// không ai đoán ra nó hỏng. Nhưng giữa "hàm làm đúng việc" và "người dùng bấm
// xong thì tiến độ mất thật" có ba chỗ có thể vỡ, và cả ba đều vô hình với test
// đơn vị:
//   1. NÚT có mở được hộp xác nhận không (mã chết thì không ai bấm tới hàm);
//   2. bấm xong màn hình có thật sự về 0 không;
//   3. TẢI LẠI TRANG thì nó có ở lại 0 không — hay đồng bộ kéo bản cũ về.
//
// Điểm 3 là nghi ngờ chính. `syncLearningProgress` chạy mỗi 60 giây, và khi nó
// quyết định là bản trên máy chủ mới hơn thì nó GHI ĐÈ localStorage rồi
// `window.location.reload()`. Nếu reset không đụng tới dấu thời gian đồng bộ thì
// đúng nghĩa "reset xong một lúc lại thấy tiến độ cũ quay về".
//
// Ở đây `/api/access` bị chặn và trả "đã kích hoạt" — cần thế để vào được app;
// `/api/progress` cũng chặn được để dựng lại đúng ca máy chủ có bản CŨ HƠN hay
// MỚI HƠN. Đó là thứ không dựng lại được bằng tay trên máy thật.

import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';
import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { LEARNING_STORAGE_KEYS as KHOA } from '../src/utils/backup.js';

const CONG = 4347;
const may = await moMayChuXemTruoc({ cong: CONG, dungLai: process.env.BO_DUNG !== '1' });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9367 });
// Kho tiến độ giả — bắt chước đúng api/progress.js. Bắt buộc phải có: bản dựng
// chạy ở máy KHÔNG có Redis nên `/api/progress` trả về index.html, `read.json()`
// ném, App.jsx nuốt lỗi, và đồng bộ IM LẶNG không chạy. Không có kho này thì bộ
// rà đo một app không hề đồng bộ — tức bỏ trắng đúng nửa nguy hiểm nhất.
const kho = { data: null, updatedAt: null };
const t = await moTab(cong, { khoTienDo: kho });

const ket = [];
const ghi = (nhan, ok, ct = '') => {
  ket.push(ok);
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${nhan}${ct ? ` :: ${ct}` : ''}`);
};

// Tiến độ giả, đủ để nhìn thấy trên màn hình và trong localStorage.
const CHANG = ['grammar-tobe', 'grammar-present-simple', 'grammar-articles'];
const GIEO = `(() => {
  localStorage.setItem('xp', '2450');
  localStorage.setItem('completedMilestones', ${JSON.stringify(JSON.stringify(CHANG))});
  localStorage.setItem('streak', '7');
  localStorage.setItem('lastActiveDate', new Date().toDateString());
  localStorage.setItem('dailyStats', JSON.stringify({ date: new Date().toDateString(), lessons: 4, xp: 300 }));
  localStorage.setItem('learningActivityV1', JSON.stringify([{ date: new Date().toISOString().slice(0,10), xp: 300, lessons: 4 }]));
  localStorage.setItem('milestoneScoresV1', JSON.stringify({ 'grammar-tobe': 90 }));
  localStorage.setItem('onboardingDoneV1', '1');
  // Những khoá reset TỪNG ĐỂ SÓT. placementResultV1 là khoá quan trọng nhất:
  // nó quyết định lộ trình mở ở CẤP NÀO, nên còn nó thì bấm reset xong lộ trình
  // vẫn ở chỗ cũ — đúng thứ người dùng đọc là "nút reset hỏng".
  localStorage.setItem('placementResultV1', JSON.stringify({ level: 'intermediate' }));
  localStorage.setItem('srsStore_v1', JSON.stringify({ w1: { due: 0 } }));
  localStorage.setItem('errorBankV1', JSON.stringify([{ q: 'cau sai cu' }]));
  localStorage.setItem('streakFreezeV1', JSON.stringify({ ve: 2 }));
  // Bản gieo đầu là [{ score: 7 }] - THIEU truong scale, va WelcomePage doc
  // lastMock.scale.type nen no nem va SAP CA TRANG. Nut reset vi the khong bam
  // duoc nua, va bon phep kiem phia sau do theo. Mot ban ghi hong du giet ca bo
  // ra - va do cung la thu no se lam voi nguoi hoc that, nen WelcomePage da duoc
  // va bang optional chaining. O day gieo DUNG hinh de do dung cai dang muon do.
  // (Chu thich nay khong dau va khong backtick vi no nam TRONG template literal.)
  localStorage.setItem('mockTestHistoryV1', JSON.stringify([
    { percent: 70, testName: 'VSTEP mini', scale: { type: 'vstep', score: 7 } },
  ]));
  localStorage.setItem('learningGoalV1', 'thi-vstep');
  // Hai sổ này là thứ người học TỰ LÀM RA — reset phải GIỮ, và bộ rà canh cả
  // chiều đó: xoá nhầm chúng cũng là hỏng, không kém gì để sót tiến độ.
  localStorage.setItem('writingLogV1', JSON.stringify([{ text: 'bai viet cua toi' }]));
  localStorage.setItem('speakingLogV1', JSON.stringify([{ text: 'luot noi cua toi' }]));
  return 'ok';
})()`;

const DOC = `(() => ({
  xp: localStorage.getItem('xp'),
  chang: JSON.parse(localStorage.getItem('completedMilestones') || '[]').length,
  chuoi: localStorage.getItem('streak'),
  diem: Object.keys(JSON.parse(localStorage.getItem('milestoneScoresV1') || '{}')).length,
  dauTG: localStorage.getItem('learningSyncUpdatedAtV1'),
  sot: ['placementResultV1', 'srsStore_v1', 'errorBankV1', 'streakFreezeV1',
    'mockTestHistoryV1', 'onboardingDoneV1', 'learningGoalV1']
    .filter((k) => localStorage.getItem(k) !== null),
  giu: ['writingLogV1', 'speakingLogV1'].filter((k) => localStorage.getItem(k) !== null),
}))()`;

// Ảnh chụp localStorage theo ĐÚNG bộ khoá mà progressSync gửi lên — dựng bằng
// tay thì kho giả chứa thứ khác với thứ app thật gửi, và phép đo mất nghĩa.
const CHUP = `(() => {
  const K = ${JSON.stringify(KHOA)};
  const d = {};
  for (const k of K) { const v = localStorage.getItem(k); if (v !== null) d[k] = v; }
  return d;
})()`;

const conSot = (o) => {
  const s = [];
  if (Number(o.xp) > 0) s.push(`xp=${o.xp}`);
  if (o.chang > 0) s.push(`${o.chang} chặng`);
  if (Number(o.chuoi) > 0) s.push(`chuỗi=${o.chuoi}`);
  if (o.diem > 0) s.push(`${o.diem} điểm đã xác minh`);
  if (o.sot && o.sot.length) s.push(`còn ${o.sot.join(', ')}`);
  return s;
};

try {
  await t.diToi(`http://127.0.0.1:${CONG}/`);
  await new Promise((r) => setTimeout(r, 1500));

  // 1. Gieo tiến độ rồi tải lại để app đọc lên.
  await t.danhGia(GIEO);
  await t.diToi(`http://127.0.0.1:${CONG}/`);
  await new Promise((r) => setTimeout(r, 2000));
  const truoc = await t.danhGia(DOC);
  ghi('gieo được tiến độ giả để có thứ mà xoá', Number(truoc.xp) > 0 && truoc.chang > 0,
    conSot(truoc).join(' · '));

  // 2. NÚT có tồn tại và mở được hộp xác nhận không.
  const thayNut = await t.danhGia(`document.body.innerText.includes('RESET LỘ TRÌNH')`);
  ghi('tìm thấy nút "RESET LỘ TRÌNH" trên màn hình', thayNut,
    thayNut ? '' : 'không có nút nào — hàm reset dù đúng cũng không ai gọi tới được');

  const moHop = await t.danhGia(BAM_THEO_CHU('RESET LỘ TRÌNH'));
  await new Promise((r) => setTimeout(r, 600));
  // ⚠️ HAI HỘP, HAI ID KHÁC NHAU — và bản đầu của chính bộ rà này chỉ tìm một.
  // WelcomePage dùng `welcome-reset-title`, MainLayout dùng `reset-roadmap-title`.
  // Tôi ghim đúng id của MainLayout, tức ghim vào cái hộp KHÔNG AI MỞ ĐƯỢC, rồi
  // báo "nút chết" trong khi nút chạy bình thường. Hỏng ở thước đo, không ở app —
  // và nếu tin nó thì tôi đã đi sửa một hàm không hỏng.
  const coHop = await t.danhGia(
    '!!document.querySelector(\'[aria-labelledby="welcome-reset-title"],'
    + '[aria-labelledby="reset-roadmap-title"]\')',
  );
  ghi('bấm nút thì hộp xác nhận hiện ra', moHop && coHop,
    coHop ? '' : 'bấm xong không có hộp nào — nút chết');

  // 3. Xác nhận, rồi đo NGAY.
  if (coHop) {
    await t.danhGia(BAM_THEO_CHU('XÁC NHẬN RESET'));
    await new Promise((r) => setTimeout(r, 1200));
    const ngay = await t.danhGia(DOC);
    const sot = conSot(ngay);
    ghi('bấm XÁC NHẬN thì tiến độ về 0 ngay lập tức', sot.length === 0,
      sot.length ? `còn sót: ${sot.join(' · ')}` : 'xp, chặng, chuỗi, điểm đều sạch');
  }

  // 4. TẢI LẠI TRANG — chỗ nghi ngờ chính. Đồng bộ có kéo bản cũ về không.
  await t.diToi(`http://127.0.0.1:${CONG}/`);
  await new Promise((r) => setTimeout(r, 2500));
  const sauTai = await t.danhGia(DOC);
  const sotSau = conSot(sauTai);
  ghi('tải lại trang thì tiến độ VẪN ở 0', sotSau.length === 0,
    sotSau.length ? `tiến độ cũ QUAY VỀ: ${sotSau.join(' · ')}` : 'vẫn sạch sau khi tải lại');

  // ══════════════════════════════════════════════════════════════════════════
  // 5. ĐỒNG BỘ — nửa mà bốn bước trên KHÔNG chạm tới.
  //
  // Bốn bước trên chỉ chứng minh reset xoá sạch localStorage của MỘT máy. Nhưng
  // gói 6 và 12 tháng bán 2–3 THIẾT BỊ, và `syncLearningProgress` chạy mỗi 60
  // giây: nếu bản trên máy chủ được coi là mới hơn thì nó GHI ĐÈ localStorage rồi
  // `window.location.reload()`. Đó đúng là hình dạng của lời than "reset xong một
  // lúc lại thấy tiến độ cũ quay về".
  // ══════════════════════════════════════════════════════════════════════════

  // 5a. MỘT MÁY: máy chủ giữ bản CÙNG TUỔI. Đây là ca thường gặp nhất.
  await t.danhGia(GIEO);
  const anh = await t.danhGia(CHUP);
  kho.data = anh;
  kho.updatedAt = Date.now();
  await t.danhGia(`localStorage.setItem('learningSyncUpdatedAtV1', '${kho.updatedAt}')`);
  await t.diToi(`http://127.0.0.1:${CONG}/`);
  await new Promise((r) => setTimeout(r, 2500));
  await t.danhGia(BAM_THEO_CHU('RESET LỘ TRÌNH'));
  await new Promise((r) => setTimeout(r, 600));
  await t.danhGia(BAM_THEO_CHU('XÁC NHẬN RESET'));
  await new Promise((r) => setTimeout(r, 1000));
  await t.diToi(`http://127.0.0.1:${CONG}/`);
  await new Promise((r) => setTimeout(r, 3000));
  const s5a = conSot(await t.danhGia(DOC));
  ghi('MỘT MÁY: reset xong, đồng bộ KHÔNG kéo tiến độ cũ về', s5a.length === 0,
    s5a.length ? `tiến độ quay về: ${s5a.join(' · ')}` : 'sạch, và máy chủ cũng đã nhận bản rỗng');

  // 5b. HAI MÁY: máy chủ giữ bản MỚI HƠN — người học vừa học trên điện thoại rồi
  //     ngồi vào máy tính bấm reset. Gói 6/12 tháng bán đúng tình huống này.
  //
  // ⚠️ MÁY CHỦ PHẢI GIỮ MỘT CON SỐ KHÁC HẲN (xp=9999). Bản đầu tôi cho cả hai bên
  // cùng dữ liệu, nên "khôi phục có nổ hay không" là thứ KHÔNG phân biệt được:
  // ghi đè bằng chính nó thì nhìn y như không ghi đè. Một phép đo không phân
  // biệt được hai khả năng thì nó không đo gì cả.
  await t.danhGia(GIEO);
  const anhKhac = await t.danhGia(CHUP);
  anhKhac.xp = '9999';
  anhKhac.completedMilestones = JSON.stringify(['may-kia-1', 'may-kia-2', 'may-kia-3', 'may-kia-4', 'may-kia-5']);
  kho.data = anhKhac;
  kho.updatedAt = Date.now();          // máy kia vừa đồng bộ xong
  const cu = Date.now() - 3600_000;    // máy này đồng bộ lần cuối một tiếng trước
  await t.danhGia(`localStorage.setItem('learningSyncUpdatedAtV1', '${cu}')`);
  await t.diToi(`http://127.0.0.1:${CONG}/`);
  await new Promise((r) => setTimeout(r, 4000));

  // Trước hết PHẢI thấy bản của máy kia tràn sang. Không thấy thì nhánh khôi
  // phục chưa hề chạy, và phép kiểm reset bên dưới vô nghĩa.
  const daKhoiPhuc = await t.danhGia(DOC);
  ghi('dựng được ca máy kia mới hơn: bản của nó tràn sang máy này',
    String(daKhoiPhuc.xp) === '9999' && daKhoiPhuc.chang === 5,
    `xp=${daKhoiPhuc.xp}, ${daKhoiPhuc.chang} chặng`
    + (String(daKhoiPhuc.xp) === '9999' ? '' : ' — nhánh khôi phục KHÔNG chạy, bước sau vô nghĩa'));

  await t.danhGia(BAM_THEO_CHU('RESET LỘ TRÌNH'));
  await new Promise((r) => setTimeout(r, 600));
  const bam5b = await t.danhGia(BAM_THEO_CHU('XÁC NHẬN RESET'));
  await new Promise((r) => setTimeout(r, 1000));
  const ngay5b = conSot(await t.danhGia(DOC));
  await t.diToi(`http://127.0.0.1:${CONG}/`);
  await new Promise((r) => setTimeout(r, 4000));
  const sau5b = conSot(await t.danhGia(DOC));
  ghi('HAI MÁY: reset trên máy này KHÔNG bị máy kia ghi đè ngược',
    bam5b && ngay5b.length === 0 && sau5b.length === 0,
    !bam5b ? 'không bấm được xác nhận'
      : (ngay5b.length ? `chưa xoá được ngay: ${ngay5b.join(' · ')}`
        : (sau5b.length ? `XOÁ RỒI NHƯNG QUAY VỀ sau khi đồng bộ: ${sau5b.join(' · ')}`
          : 'sạch cả sau đồng bộ')));
  // Hai chiều, và chiều thứ hai quan trọng ngang chiều thứ nhất.
  const cuoi = await t.danhGia(DOC);
  ghi('reset xoá CẢ kết quả test đầu vào, SRS, sổ lỗi, lịch sử thi thử',
    cuoi.sot.length === 0,
    cuoi.sot.length
      ? `còn sót: ${cuoi.sot.join(', ')} — lộ trình sẽ vẫn mở ở cấp cũ`
      : 'không còn khoá tiến độ nào');
  ghi('reset GIỮ sổ bài viết và sổ lượt nói — thứ người học tự làm ra',
    cuoi.giu.length === 2,
    cuoi.giu.length === 2
      ? 'cả hai sổ còn nguyên'
      : `đã xoá mất: ${['writingLogV1', 'speakingLogV1'].filter((k) => !cuoi.giu.includes(k)).join(', ')}`);

  // ⚠️ TỰ CANH CHÍNH NÓ. Hai kịch bản trên chỉ có nghĩa nếu app THẬT SỰ gọi
  // /api/progress. Nếu kho giả không hề bị chạm thì chúng chạy rỗng và vẫn xanh —
  // đúng loại test không-thể-fail mà dự án này đã dính nhiều lần.
  ghi('kho tiến độ giả THẬT SỰ được gọi, không thì hai bước trên chạy rỗng',
    (kho.soLanNhan || 0) > 0,
    `máy chủ giả nhận ${kho.soLanNhan || 0} lượt ghi, từ chối ${kho.soLanTuChoi || 0} lượt`);

  const loi = t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));
  ghi('không có lỗi console / ngoại lệ trên đường reset', loi.length === 0,
    loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 110)}`).join(' | '));
} finally {
  t.dong();
  tienTrinh.kill();
  may.dong();
}

const dat = ket.filter(Boolean).length;
console.log(`\nbước đạt: ${dat}/${ket.length}`);
process.exit(dat === ket.length ? 0 : 1);
