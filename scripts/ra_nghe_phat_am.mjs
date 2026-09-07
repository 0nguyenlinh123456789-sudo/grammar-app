// File: scripts/ra_nghe_phat_am.mjs
//
// BỘ RÀ TAB "NGHE & ĐỌC" CỦA CỤM NỀN TẢNG A0.
//
// ⚠️ THỨ BỘ RÀ NÀY KHÔNG KIỂM ĐƯỢC, VÀ ĐỪNG TƯỞNG NÓ KIỂM:
// nó nghe được rằng `speak()` ĐƯỢC GỌI với đúng chữ và đúng giọng `en-*`, nhưng
// KHÔNG nghe được TIẾNG PHÁT RA. Việc giọng máy đọc chữ "A" thành TÊN CHỮ /eɪ/
// (chứ không thành âm /ə/ như từ "a") chỉ xác nhận được bằng tai người trên máy
// thật. Cùng loại với `beforeinstallprompt` và icon màn hình chính iOS.
//
// Vì sao vẫn đáng chạy: ba cách hỏng LẶNG LẼ đều bắt được ở đây — tab hiện mà
// panel rỗng, panel quên nhãn "Giọng máy đọc", và máy không có giọng tiếng Anh
// mà vẫn gọi `speak()` (đọc tiếng Anh bằng bộ máy tiếng Việt).

// Tab "Nghe & Đọc" có thật sự mở được và gọi được bộ đọc không?
import { moTrinhDuyet, moTab } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));
const may = await moMayChuXemTruoc({ cong: 4365, dungLai: false });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9383 });
let dat = 0, tong = 0;
const ok = (b, s) => { tong += 1; if (b) dat += 1; console.log((b ? 'OK   ' : 'HONG ') + s); };

// Ghi lại mọi lượt speak() để biết panel có gọi bộ đọc không, và gọi với gì.
const TIEM = [
  "try { localStorage.setItem('onboardingDoneV1', JSON.stringify({ done: true, at: Date.now() })); } catch (e) {}",
  'window.__daDoc = [];',
  'try {',
  '  const goc = speechSynthesis.speak.bind(speechSynthesis);',
  '  speechSynthesis.speak = (u) => { window.__daDoc.push({ chu: u.text, lang: u.lang }); return goc(u); };',
  '} catch (e) {}',
].join('\n');

try {
  const t = await moTab(cong);
  const loi = [];
  if (t.khiLoiConsole) t.khiLoiConsole((m) => loi.push(m));
  await t.goi('Page.addScriptToEvaluateOnNewDocument', { source: TIEM });
  await t.diToi(may.BASE + '/');
  await nghi(3500);

  const vao = await t.danhGia("(() => { const n = [...document.querySelectorAll('button')].find(b => /A0/.test(b.textContent) && /Mất Gốc/i.test(b.textContent)); if (n) { n.click(); return 'band'; } return 'khong-thay'; })()");
  await nghi(900);
  await t.danhGia("(() => { const n = [...document.querySelectorAll('button,a')].find(b => /Bảng Chữ Cái/.test(b.textContent)); if (n) n.click(); return !!n; })()");
  await nghi(1600);
  ok(vao === 'band', 'mở được cụm A0 (' + vao + ')');

  const tabs = await t.danhGia("JSON.stringify([...document.querySelectorAll('button')].map(b => b.textContent.trim()).filter(x => /Nghe & Đọc|Lý Thuyết|Gia Sư/.test(x)))");
  ok(/Nghe & Đọc/.test(tabs), 'tab "Nghe & Đọc" có hiện: ' + tabs);

  await t.danhGia("(() => { const n = [...document.querySelectorAll('button')].find(b => /Nghe & Đọc/.test(b.textContent)); if (n) n.click(); return !!n; })()");
  await nghi(1000);

  const so = await t.danhGia("(() => { const p = document.querySelector('#grammar-panel-phatam'); if (!p) return JSON.stringify({ co: false }); const nut = [...p.querySelectorAll('button')].filter(b => { const s = b.querySelector('span'); return s && /^[A-Z]$/.test(s.textContent); }); return JSON.stringify({ co: true, soChu: nut.length, coNhanMay: /Giọng máy đọc/.test(p.textContent), coCham: /AI NGHE bản thu/.test(p.textContent), coRanhGioi: /nhận xét của một mô hình/.test(p.textContent), coCum: /Đọc từng cụm một/.test(p.textContent), coAccent: /Anh-Anh|Anh-Mỹ|Anh-Úc/.test(p.textContent), baoThieuGiong: /chưa cài giọng tiếng Anh/.test(p.textContent) }); })()");
  const d = JSON.parse(so);
  ok(d.co, 'panel phatam dựng được');
  ok(d.soChu === 26, 'đủ 26 nút chữ (' + d.soChu + ')');
  ok(d.coNhanMay, 'có nhãn "Giọng máy đọc"');
  ok(d.coCham, 'có khối chấm phát âm');
  ok(d.coRanhGioi, 'có ranh giới "nhận xét của một mô hình"');
  ok(d.coCum, 'chia cụm để chấm từng phần');
  // Một trong hai PHẢI đúng: hoặc báo có accent, hoặc báo máy thiếu giọng.
  // Im lặng cả hai là đúng cái lỗi tệp docTiengAnh.js sinh ra để chặn.
  ok(d.coAccent || d.baoThieuGiong, 'nói rõ accent hoặc báo thiếu giọng (accent=' + d.coAccent + ', bao=' + d.baoThieuGiong + ')');

  await t.danhGia("(() => { const p = document.querySelector('#grammar-panel-phatam'); const n = [...p.querySelectorAll('button')].find(b => { const s = b.querySelector('span'); return s && s.textContent === 'B'; }); if (n) n.click(); return !!n; })()");
  await nghi(700);
  const daDoc = JSON.parse(await t.danhGia('JSON.stringify(window.__daDoc || [])'));
  if (d.baoThieuGiong) {
    ok(daDoc.length === 0, 'máy không có giọng Anh thì KHÔNG gọi speak() (' + daDoc.length + ' lượt)');
  } else {
    ok(daDoc.length === 1 && daDoc[0].chu === 'B', 'bấm B thì gọi speak("B"): ' + JSON.stringify(daDoc));
    ok(daDoc.length === 1 && /^en/i.test(String(daDoc[0].lang || '')), 'đọc bằng giọng tiếng Anh: ' + (daDoc[0] || {}).lang);
  }

  // ══ BÀI IPA (a0_02) — chỗ dễ hỏng nhất ══
  // `speechSynthesis` KHÔNG phát ra được ký hiệu /θ/. Nếu ai đó "cho đồng bộ
  // với a0_01" bằng cách đặt doc = hien, bấm nút θ sẽ im lặng hoặc đọc dấu câu,
  // mà KHÔNG có lỗi nào nổ ra. Đây là phép đo duy nhất bắt được điều đó.
  // Sang bài 2 QUA THANH BÊN, không tải lại trang: tải lại thì app khôi phục về
  // màn LỘ TRÌNH và nút band A0 ở đó dẫn đi chỗ khác. Ở màn bài học, thanh bên
  // đang chọn band B1, nên phải bấm band A0 trước rồi mới thấy 12 bài A0.
  await t.danhGia('window.__daDoc = [];');
  await t.danhGia("(() => { const n = [...document.querySelectorAll('button')].find(b => /A0 - Mất Gốc/.test(b.textContent)); if (n) n.click(); return !!n; })()");
  await nghi(1000);
  await t.danhGia("(() => { const n = [...document.querySelectorAll('button,a')].find(b => /Đọc Ký Hiệu Phiên Âm IPA/.test(b.textContent)); if (n) n.click(); return !!n; })()");
  await nghi(1600);
  await t.danhGia("(() => { const n = [...document.querySelectorAll('button')].find(b => /Nghe & Đọc/.test(b.textContent)); if (n) n.click(); return !!n; })()");
  await nghi(1000);

  const dangO = await t.danhGia("(document.querySelector('h2') || {}).textContent || '?'");
  ok(/IPA/.test(dangO), 'đã chuyển sang bài IPA (đang ở: ' + dangO + ')');

  const ipa = JSON.parse(await t.danhGia("(() => { const p = document.querySelector('#grammar-panel-phatam'); if (!p) return JSON.stringify({ co: false }); return JSON.stringify({ co: true, soNhom: [...p.querySelectorAll('p')].filter(x => /Ký hiệu không giống chữ cái|năm cách đọc/.test(x.textContent)).length, coNgheTrong: /nghe trong: think/.test(p.textContent) }); })()"));
  ok(ipa.co, 'bài IPA cũng có tab Nghe & Đọc');
  ok(ipa.soNhom === 2, 'hai nhóm vẽ riêng, không trộn (' + ipa.soNhom + ')');
  ok(ipa.coNgheTrong, 'hiện rõ ký hiệu θ được nghe TRONG từ "think"');

  await t.danhGia("(() => { const p = document.querySelector('#grammar-panel-phatam'); const n = [...p.querySelectorAll('button')].find(b => { const s = b.querySelector('span'); return s && s.textContent === '\u03b8'; }); if (n) n.click(); return !!n; })()");
  await nghi(700);
  const docIpa = JSON.parse(await t.danhGia('JSON.stringify(window.__daDoc || [])'));
  if (d.baoThieuGiong) {
    ok(docIpa.length === 0, 'thiếu giọng thì không gọi speak() ở bài IPA');
  } else {
    ok(docIpa.length === 1 && docIpa[0].chu === 'think',
      'bấm θ thì đọc TỪ VÍ DỤ "think", không đưa ký hiệu cho bộ đọc: ' + JSON.stringify(docIpa));
  }

  ok(loi.length === 0, 'không lỗi console (' + loi.length + ') ' + loi.slice(0, 2).join(' | '));
  t.dong();
} finally {
  console.log('\n=== ' + dat + '/' + tong + ' ===');
  tienTrinh.kill();
  may.dong();
  process.exit(dat === tong ? 0 : 1);
}
