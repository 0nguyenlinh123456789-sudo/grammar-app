// File: scripts/ra_nghe_phat_am.mjs
//
// BỘ RÀ TAB "NGHE & ĐỌC" CỦA CỤM NỀN TẢNG A0.
//
// ⚠️ THỨ BỘ RÀ NÀY KHÔNG KIỂM ĐƯỢC, VÀ ĐỪNG TƯỞNG NÓ KIỂM:
// nó thấy được rằng `speak()` ĐƯỢC GỌI với đúng chữ và đúng giọng `en-*`, nhưng
// KHÔNG nghe được TIẾNG PHÁT RA. Việc giọng máy đọc chữ "A" thành TÊN CHỮ /eɪ/
// (chứ không thành âm /ə/ như từ "a") chỉ xác nhận được bằng tai người trên máy
// thật. Cùng loại với `beforeinstallprompt` và icon màn hình chính iOS.
//
// Vì sao vẫn đáng chạy: bốn cách hỏng LẶNG LẼ đều bắt được ở đây —
//   · tab hiện mà panel rỗng;
//   · panel quên nhãn "Giọng máy đọc";
//   · máy không có giọng tiếng Anh mà vẫn gọi `speak()` (đọc tiếng Anh bằng bộ
//     máy tiếng Việt);
//   · đưa thẳng KÝ HIỆU IPA cho bộ đọc — nó im hoặc đọc dấu câu, và KHÔNG có
//     lỗi nào nổ ra.
//
// Danh sách bài cần kiểm DẪN XUẤT TỪ DỮ LIỆU, không viết cứng: cụm A0 là 12 bài
// dạy phát âm và số bài có phần nghe còn tăng. Viết cứng thì bài thêm sau không
// ai kiểm, mà bộ rà vẫn báo ĐẠT.
import { moTrinhDuyet, moTab } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';
import { foundationData } from '../src/data/foundationData.js';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));
const CAN_KIEM = foundationData.filter((t) => t.nghe && Array.isArray(t.nghe.muc) && t.nghe.muc.length);

let dat = 0;
let tong = 0;
const ok = (b, s) => { tong += 1; if (b) dat += 1; console.log((b ? 'OK   ' : 'HONG ') + s); };

// Ghi lại mọi lượt speak() để biết panel gọi bộ đọc với cái gì.
const TIEM = [
  "try { localStorage.setItem('onboardingDoneV1', JSON.stringify({ done: true, at: Date.now() })); } catch (e) {}",
  'window.__daDoc = [];',
  'try {',
  '  const goc = speechSynthesis.speak.bind(speechSynthesis);',
  '  speechSynthesis.speak = (u) => { window.__daDoc.push({ chu: u.text, lang: u.lang }); return goc(u); };',
  '} catch (e) {}',
].join('\n');

const DOC_PANEL = `(() => {
  const p = document.querySelector('#grammar-panel-phatam');
  if (!p) return JSON.stringify({ co: false });
  const nut = [...p.querySelectorAll('button')].filter((b) => b.querySelector('span'));
  return JSON.stringify({
    co: true,
    nhan: nut.map((b) => b.querySelector('span').textContent),
    coNhanMay: /Giọng máy đọc/.test(p.textContent),
    coCham: /AI NGHE bản thu/.test(p.textContent),
    coRanhGioi: /nhận xét của một mô hình/.test(p.textContent),
    coAccent: /Anh-Anh|Anh-Mỹ|Anh-Úc|Anh-Ấn/.test(p.textContent),
    baoThieuGiong: /chưa cài giọng tiếng Anh/.test(p.textContent),
  });
})()`;

const bam = (chu) => `(() => {
  const p = document.querySelector('#grammar-panel-phatam');
  if (!p) return false;
  const n = [...p.querySelectorAll('button')].find((b) => {
    const s = b.querySelector('span');
    return s && s.textContent === ${JSON.stringify(chu)};
  });
  if (n) n.click();
  return !!n;
})()`;

const may = await moMayChuXemTruoc({ cong: 4365, dungLai: false });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9383 });

try {
  const t = await moTab(cong);
  const loi = [];
  if (t.khiLoiConsole) t.khiLoiConsole((m) => loi.push(m));
  await t.goi('Page.addScriptToEvaluateOnNewDocument', { source: TIEM });
  await t.diToi(may.BASE + '/');
  await nghi(3500);

  // Vào cụm A0 từ màn LỘ TRÌNH một lần duy nhất. Từ lượt sau chuyển bài QUA
  // THANH BÊN, KHÔNG tải lại trang: tải lại thì app khôi phục về màn LỘ TRÌNH
  // và nút band A0 ở đó dẫn đi chỗ khác.
  const vao = await t.danhGia("(() => { const n = [...document.querySelectorAll('button')].find(b => /A0/.test(b.textContent) && /Mất Gốc/i.test(b.textContent)); if (n) { n.click(); return 'band'; } return 'khong-thay'; })()");
  await nghi(1200);
  ok(vao === 'band', 'mở được cụm A0 (' + vao + ')');

  let thieuGiong = null;

  for (const bai of CAN_KIEM) {
    // Nhan đề bài trong danh sách bỏ số thứ tự ở đầu để khớp cả hai chỗ.
    const ten = bai.title.replace(/^\d+\.\s*/, '');
    console.log('\n── ' + bai.id + ' · ' + ten + ' ──');

    await t.danhGia("(() => { const n = [...document.querySelectorAll('button')].find(b => /A0 - Mất Gốc/.test(b.textContent)); if (n) n.click(); return !!n; })()");
    await nghi(800);
    await t.danhGia(`(() => { const n = [...document.querySelectorAll('button,a')].find(b => b.textContent.includes(${JSON.stringify(ten)})); if (n) n.click(); return !!n; })()`);
    await nghi(1500);

    // ⚠️ KHẲNG ĐỊNH VỊ TRÍ TRƯỚC KHI ĐO. Lần trước cú click chuyển bài im lặng
    // không tìm thấy nút, nên mọi phép đo vẫn chạy trên bài cũ — và kết quả
    // trùng khít với một tính năng hỏng thật.
    const dangO = await t.danhGia("(document.querySelector('h2') || {}).textContent || '?'");
    ok(dangO.includes(ten), 'đang ở đúng bài (' + dangO.slice(0, 40) + ')');

    await t.danhGia("(() => { const n = [...document.querySelectorAll('button')].find(b => /Nghe & Đọc/.test(b.textContent)); if (n) n.click(); return !!n; })()");
    await nghi(900);
    await t.danhGia('window.__daDoc = [];');

    const d = JSON.parse(await t.danhGia(DOC_PANEL));
    ok(d.co, 'panel dựng được');
    if (!d.co) continue;

    const mongDoi = bai.nghe.muc.map((m) => m.hien);
    ok(JSON.stringify(d.nhan) === JSON.stringify(mongDoi),
      'vẽ đủ và đúng thứ tự ' + mongDoi.length + ' nút' + (JSON.stringify(d.nhan) === JSON.stringify(mongDoi) ? '' : ' — thấy ' + JSON.stringify(d.nhan)));
    ok(d.coNhanMay && d.coCham && d.coRanhGioi,
      'đủ nhãn giọng máy · khối chấm · ranh giới trung thực');
    ok(d.coAccent || d.baoThieuGiong,
      'nói rõ accent hoặc báo thiếu giọng (accent=' + d.coAccent + ', báo=' + d.baoThieuGiong + ')');
    if (thieuGiong === null) thieuGiong = d.baoThieuGiong;

    // Bấm mục có `doc` KHÁC `hien` nếu bài có — đó là chỗ dễ hỏng nhất: đưa
    // thẳng ký hiệu cho bộ đọc thì im lặng, không lỗi. Không có thì bấm mục đầu.
    const thu = bai.nghe.muc.find((m) => m.doc !== m.hien) || bai.nghe.muc[0];
    await t.danhGia(bam(thu.hien));
    await nghi(600);
    const daDoc = JSON.parse(await t.danhGia('JSON.stringify(window.__daDoc || [])'));
    if (d.baoThieuGiong) {
      ok(daDoc.length === 0, 'máy thiếu giọng Anh thì KHÔNG gọi speak() (' + daDoc.length + ' lượt)');
    } else {
      ok(daDoc.length === 1 && daDoc[0].chu === thu.doc,
        'bấm "' + thu.hien + '" thì đọc "' + thu.doc + '": ' + JSON.stringify(daDoc));
      ok(daDoc.length === 1 && /^en/i.test(String(daDoc[0].lang || '')),
        'đọc bằng giọng tiếng Anh: ' + (daDoc[0] || {}).lang);
    }
  }

  // ── CẶP -TEEN / -TY PHẢI ĐỌC RA HAI TỪ KHÁC NHAU ──
  // Bài a0_12 nói người bản ngữ phân biệt 13 với 30 CHÍNH BẰNG TRỌNG ÂM. Ở
  // a0_09 tôi đã LOẠI bốn cặp đổi-trọng-âm vì bộ đọc không chắc đọc đúng; cặp
  // này giữ lại vì "thirteen" và "thirty" là hai TỪ khác nhau. Khẳng định điều
  // đó thay vì tin — nếu một trong hai im lặng thì cả nhóm mất nghĩa.
  // (Bộ rà vẫn không NGHE được: nó chứng minh hai lượt đọc khác chuỗi, không
  //  chứng minh trọng âm đặt đúng chỗ. Phần đó cần tai người.)
  console.log('\n── cặp 13 ≠ 30 ──');
  await t.danhGia('window.__daDoc = [];');
  await t.danhGia(bam('thirteen'));
  await nghi(500);
  await t.danhGia(bam('thirty'));
  await nghi(500);
  const cap = JSON.parse(await t.danhGia('JSON.stringify(window.__daDoc || [])'));
  if (thieuGiong) {
    ok(cap.length === 0, 'máy thiếu giọng Anh thì không đọc cặp này');
  } else {
    ok(cap.length === 2 && cap[0].chu === 'thirteen' && cap[1].chu === 'thirty',
      'cả hai đều thật sự được đọc, không cái nào im: ' + JSON.stringify(cap.map((x) => x.chu)));
  }

  console.log('');
  ok(loi.length === 0, 'không lỗi console (' + loi.length + ') ' + loi.slice(0, 2).join(' | '));
  t.dong();
} finally {
  console.log('\n=== ' + dat + '/' + tong + ' · ' + CAN_KIEM.length + ' bài có phần nghe ===');
  tienTrinh.kill();
  may.dong();
  process.exit(dat === tong ? 0 : 1);
}
