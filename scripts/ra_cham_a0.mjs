// File: scripts/ra_cham_a0.mjs
//
// BỘ RÀ ĐƯỜNG THU → CHẤM CỦA TAB "NGHE & ĐỌC" (cụm A0).
//
// ══ VÌ SAO CẦN MỘT BỘ RÀ RIÊNG ══
// `ra:nghephatam` chỉ khẳng định khối chấm CÓ MẶT (đúng nhãn, đúng ba dòng ranh
// giới). Nó không bao giờ thu và không bao giờ chấm. `khach:het` có bước GHI ÂM
// nhưng bước đó lái `SpeakingPromptPanel` — một màn hình KHÁC.
//
// `NghePhatAm` dựng lại toàn bộ vòng đó bằng mã của riêng nó: `batDau`,
// `dungLai`, `xinCham`, và vòng đời blob URL của riêng nó. Nghĩa là một lỗi ở
// nhánh chưa-có-key, ở nhánh `ngheDuoc: false`, hay ở chỗ huỷ blob hai lần đều
// đi lọt qua MỌI phép kiểm đang xanh.
//
// ══ THỨ BỘ RÀ NÀY KHÔNG KIỂM ══
// Nó không gửi gì tới Google: `/api/ai` bị bẫy ngay trong trang và trả kết quả
// giả theo kịch bản. Nó kiểm rằng app GỬI ĐÚNG THỨ và VẼ ĐÚNG THỨ NHẬN VỀ —
// không kiểm chất lượng nhận xét của mô hình.
import { moTrinhDuyet, moTab } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';
import { foundationData } from '../src/data/foundationData.js';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));
const BAI = foundationData.find((x) => x.id === 'a0_01');
const TOI_DA_MOI_LUOT = 8; // phải khớp hằng số trong NghePhatAm.jsx

let dat = 0;
let tong = 0;
const ok = (b, s) => { tong += 1; if (b) dat += 1; console.log((b ? 'OK   ' : 'HONG ') + s); };

const GAI_BAY = [
  "window.__batDuoc = null;",
  "window.__soLuot = 0;",
  "window.__kichBan = 'nghe-duoc';",
  "const goc = window.fetch;",
  "window.fetch = async (url, opt) => {",
  "  if (String(url).includes('/api/ai')) {",
  "    const than = (opt && opt.body) ? String(opt.body) : '';",
  "    let body = null;",
  "    try { body = JSON.parse(than); } catch (e) { body = null; }",
  "    const pl = (body && body.payload) || {};",
  "    window.__soLuot += 1;",
  "    window.__batDuoc = {",
  "      mode: body && body.mode,",
  "      target: pl.target,",
  "      topicTitle: pl.topicTitle,",
  "      mimeType: pl.mimeType,",
  "      byteAudio: pl.audioData ? Math.floor(pl.audioData.length * 3 / 4) : 0,",
  "    };",
  "    const gia = window.__kichBan === 'khong-nghe-duoc'",
  "      ? { ngheDuoc: false, deNghe: 0, nhac: 'Ban thu qua nhieu tap am.' }",
  "      : { ngheDuoc: true, deNghe: 72, nghe: 'ay bee see',",
  "          tot: ['Ten chu A doc dung'],",
  "          can: [{ tu: 'H', van: 'thieu am /h/ dau', sua: 'tho hoi ra truoc khi bat am' }],",
  "          nhac: 'Doc lai cham 3 lan.' };",
  "    return new Response(JSON.stringify({ text: JSON.stringify(gia) }), { status: 200, headers: { 'content-type': 'application/json' } });",
  "  }",
  "  return goc(url, opt);",
  "};",
].join('\n');

// ⚠️ MỌI phép đọc và phép bấm KHOANH TRONG PANEL. Bộ rà của dự án đã tự bẫy
// mình nhiều lần vì dò cả `document` rồi bấm trúng một nút cùng chữ ở nơi khác.
const PANEL = "document.querySelector('#grammar-panel-phatam')";
const CHU = `(${PANEL} ? ${PANEL}.innerText : '')`;
const BAM = (chu) => `(() => {
  const p = ${PANEL};
  if (!p) return false;
  const el = [...p.querySelectorAll('button')].find((b) => String(b.innerText || '').includes(${JSON.stringify(chu)}));
  if (!el || el.disabled) return false;
  el.scrollIntoView({ block: 'center' });
  el.click();
  return true;
})()`;

const may = await moMayChuXemTruoc({ cong: 4377, dungLai: false });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9397, microGia: true });

async function vaoTabNghe(t) {
  await t.danhGia("(() => { const n = [...document.querySelectorAll('button')].find(b => /A0/.test(b.textContent) && /Mất Gốc/i.test(b.textContent)); if (n) n.click(); return !!n; })()");
  await nghi(1200);
  await t.danhGia("(() => { const n = [...document.querySelectorAll('button,a')].find(b => b.textContent.includes('Bảng Chữ Cái')); if (n) n.click(); return !!n; })()");
  await nghi(1500);
  await t.danhGia("(() => { const n = [...document.querySelectorAll('button')].find(b => /Nghe & Đọc/.test(b.textContent)); if (n) n.click(); return !!n; })()");
  await nghi(900);
}

async function thuMotDoan(t) {
  await t.danhGia(BAM('Bắt đầu đọc'));
  await nghi(1600); // để micro giả kịp sinh dữ liệu
  await t.danhGia(BAM('Dừng lại'));
  await nghi(1200);
}

try {
  const t = await moTab(cong);
  const loi = [];
  if (t.khiLoiConsole) t.khiLoiConsole((m) => loi.push(m));
  await t.goi('Page.addScriptToEvaluateOnNewDocument', {
    source: "try { localStorage.setItem('onboardingDoneV1', JSON.stringify({ done: true, at: Date.now() })); } catch (e) {}",
  });

  // ── 1. CHƯA CÓ KEY: phải MỜI thêm key, KHÔNG được im và KHÔNG được tự gọi ──
  await t.diToi(may.BASE + '/');
  await nghi(3500);
  await t.danhGia(GAI_BAY);
  await vaoTabNghe(t);
  // KHÔNG trả thẳng phần tử DOM về: CDP không tuần tự hoá được và ném
  // "Object reference chain is too long" — lỗi trông chẳng liên quan gì.
  ok(await t.danhGia('!!' + PANEL) === true, 'panel dựng được');

  const truocThu = await t.danhGia(CHU);
  ok(/Thu xong sẽ có nút nhờ AI/.test(truocThu),
    'chưa có bản thu thì KHÔNG bày nút chấm — mời bấm vào chỗ chưa dùng được cũng là một kiểu nói dối');

  await thuMotDoan(t);
  const sauThu = await t.danhGia(CHU);
  ok(/Cần API key Gemini/.test(sauThu),
    'chưa có key mà không mời thêm key — người học bấm rồi không hiểu vì sao im');
  ok(!/Nghe và nhận xét phát âm/.test(sauThu),
    'vẫn bày nút chấm khi chưa có key');
  ok(Number(await t.danhGia('window.__soLuot || 0')) === 0,
    'đã gọi /api/ai khi chưa có key — BYOK nghĩa là không bao giờ tự gọi thay người học');

  // ── 2. CÓ KEY: thu rồi chấm, và gửi ĐÚNG CỤM chứ không gửi cả bảng ──
  await t.danhGia("localStorage.setItem('grammarGeminiKeyV1', 'AIza_bo_ra_khoa_gia_khong_that_0123'), true");
  await t.diToi(may.BASE + '/');
  await nghi(3500);
  await t.danhGia(GAI_BAY);
  await vaoTabNghe(t);
  await thuMotDoan(t);

  ok(/Nghe và nhận xét phát âm/.test(await t.danhGia(CHU)), 'có key + có bản thu thì phải bày nút chấm');
  ok(!!await t.danhGia(BAM('Nghe và nhận xét phát âm')), 'bấm được nút chấm');
  await t.doi(`${CHU}.includes('AI nghe thành')`, { giay: 15, nhan: 'kết quả chấm' });

  const bat = JSON.parse(await t.danhGia('JSON.stringify(window.__batDuoc)'));
  ok(bat && bat.mode === 'pronunciation', 'gửi đúng chế độ pronunciation :: ' + (bat && bat.mode));
  ok(bat && bat.byteAudio > 0, 'gửi bản thu THẬT, không gửi thân rỗng :: ' + (bat && bat.byteAudio) + ' byte');
  ok(bat && /^audio\//.test(String(bat.mimeType)), 'khai đúng kiểu âm thanh :: ' + (bat && bat.mimeType));

  // Đây là ràng buộc đắt nhất: gửi cả 26 chữ trong một bản thu vài giây thì mô
  // hình hoặc trả ngheDuoc:false, hoặc bịa nhận xét cho thứ nó không nghe thấy.
  const cumDau = BAI.nghe.muc.slice(0, TOI_DA_MOI_LUOT).map((m) => m.doc).join(', ');
  ok(bat && bat.target === cumDau,
    'gửi ĐÚNG cụm vừa đọc (' + TOI_DA_MOI_LUOT + ' mục), không gửi cả bảng :: ' + (bat && bat.target));
  ok(bat && String(bat.topicTitle || '').includes('Bảng Chữ Cái'), 'gửi kèm tên bài :: ' + (bat && bat.topicTitle));

  const kq = await t.danhGia(CHU);
  ok(/72/.test(kq) && /100/.test(kq), 'vẽ mức dễ nghe nhận về');
  ok(/ay bee see/.test(kq), 'hiện AI nghe thành gì — người học đối chiếu được');
  ok(/thiếu âm \/h\/ đầu|thieu am/.test(kq) || /H/.test(kq), 'hiện chỗ cần sửa');

  // Ba ranh giới trung thực phải có mặt CÙNG LÚC với kết quả, không phải chỉ
  // lúc panel còn trống.
  ok(/nhận xét của một mô hình/.test(kq), 'mất dòng "không phải điểm thi" khi đã có kết quả');
  ok(/không được ghi vào Báo cáo tiến bộ/.test(kq.replace(/\s+/g, ' ')), 'mất dòng "không vào Báo cáo tiến bộ"');
  // ⚠️ /i, và đây là LỖI CỦA PHÉP ĐO chứ không phải của app.
  // `CHU` đọc bằng `innerText`, mà `innerText` trả về chữ ĐÃ RENDER — nhãn này
  // mang `uppercase` nên ra "GIỌNG MÁY ĐỌC". Đo được: textContent có, innerText
  // không, innerText bản hoa thì có. Cùng họ với bẫy "phép đo đọc trúng chú
  // thích": chuỗi đúng, nguồn đọc sai.
  ok(/Giọng máy đọc/i.test(kq), 'mất nhãn giọng máy');

  // ── 3. NHÁNH KHÔNG NGHE RÕ: phải NÓI RA, và KHÔNG được vẽ điểm ──
  await t.danhGia("window.__kichBan = 'khong-nghe-duoc', true");
  await thuMotDoan(t);
  ok(!!await t.danhGia(BAM('Nghe và nhận xét phát âm')), 'chấm được lần hai');
  await t.doi(`${CHU}.includes('không nghe rõ')`, { giay: 15, nhan: 'lời báo không nghe rõ' });
  const kq2 = await t.danhGia(CHU);
  ok(/Ban thu qua nhieu tap am/.test(kq2), 'không chuyển lời nhắc của mô hình cho người học');
  ok(!/\/100/.test(kq2),
    'vẫn vẽ vòng điểm khi mô hình báo KHÔNG nghe được — 0/100 trông như "phát âm rất tệ" trong khi thật ra là micro hỏng');

  // ── 4. ĐỔI CỤM thì phải XOÁ bản thu và kết quả cũ ──
  // Giữ lại kết quả của cụm A–H rồi hiện nó dưới cụm I–P là gán nhận xét của
  // một lượt đọc cho một lượt đọc khác.
  const doiCum = await t.danhGia(`(() => {
    const p = ${PANEL};
    if (!p) return false;
    const n = [...p.querySelectorAll('button')].find((b) => /^[A-Z]–[A-Z]$/.test(String(b.innerText || '').trim()) && !/^A–/.test(String(b.innerText || '').trim()));
    if (!n) return false;
    n.click();
    return n.innerText.trim();
  })()`);
  ok(!!doiCum, 'bấm được sang cụm khác :: ' + doiCum);
  await nghi(700);
  const kq3 = await t.danhGia(CHU);
  ok(!/không nghe rõ/.test(kq3) && !/AI nghe thành/.test(kq3),
    'đổi cụm mà GIỮ kết quả cũ — nhận xét của lượt đọc trước bị gán cho cụm mới');
  ok(/Thu xong sẽ có nút nhờ AI/.test(kq3), 'đổi cụm mà giữ bản thu cũ — chấm tiếp là chấm nhầm bản thu');

  ok(loi.length === 0, 'không lỗi console (' + loi.length + ') ' + loi.slice(0, 2).map((x) => String(x.text || x).slice(0, 90)).join(' | '));
  t.dong();
} catch (e) {
  // Không có nhánh này thì mọi ngoại lệ bị `finally` + `process.exit` nuốt
  // sạch và bộ rà in ra "0/0" — trông như không có gì để kiểm.
  console.error('NGOAI LE:', e && e.stack ? e.stack : e);
  ok(false, 'bộ rà chạy hết không ngoại lệ');
} finally {
  console.log('\n=== ' + dat + '/' + tong + ' ===');
  tienTrinh.kill();
  may.dong();
  process.exit(dat === tong ? 0 : 1);
}
