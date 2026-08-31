// File: scripts/ra_phat_am.mjs
//
//   npm run ra:phatam
//
// LÀM THẬT MỘT LƯỢT CHẤM PHÁT ÂM TRONG TRÌNH DUYỆT.
//
// ══ VÌ SAO BÀI KIỂM ĐƠN VỊ KHÔNG ĐỦ ══
// `tests/cham_phat_am.test.js` chứng minh phần MÁY CHỦ và phần ĐỌC KẾT QUẢ
// đúng. Nó không trả lời được ba câu chỉ trình duyệt mới trả lời được:
//
//   1. Bản thu có THẬT SỰ rời khỏi trang không, hay chỉ nén cho phần nghe lại?
//      Đây đúng cái bẫy đã dính ở màn quét ảnh: nén cho phần xem trước mà vẫn
//      gửi tệp gốc, nhìn màn hình thì mọi thứ đều đúng.
//   2. `MediaRecorder` trả về kiểu MIME gì trên Chrome thật, và kiểu đó có nằm
//      trong danh sách máy chủ chấp nhận không?
//   3. Khi AI báo "không nghe rõ", màn hình có nói ra điều đó không — hay vẫn
//      vẽ một con số trông như đã chấm?
//
// Micro thật thì không có trong máy chạy kiểm, nên bộ rà dùng
// `--use-fake-device-for-media-stream` của Chrome: trình duyệt tự phát một
// luồng âm thanh giả. Thứ được đo KHÔNG phải chất lượng âm thanh — mà là
// ĐƯỜNG ĐI của dữ liệu.

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));
const TRAN_AUDIO = 3 * 1024 * 1024;

const may = await moMayChuXemTruoc({ cong: 4337 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9351, microGia: true });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

// Bẫy `/api/ai` ngay trong trang và ghi lại thân yêu cầu. Trả về kết quả giả
// theo kịch bản — đổi `window.__kichBan` để thử nhánh "không nghe rõ".
const GAI_BAY = `(() => {
  window.__batDuoc = null;
  window.__kichBan = 'nghe-duoc';
  const goc = window.fetch;
  window.fetch = async (url, opt) => {
    if (String(url).includes('/api/ai')) {
      const than = (opt && opt.body) ? String(opt.body) : '';
      let body = null;
      try { body = JSON.parse(than); } catch { /* không phải JSON */ }
      const pl = (body && body.payload) || {};
      window.__batDuoc = {
        mode: body && body.mode,
        mimeType: pl.mimeType,
        byteAudio: pl.audioData ? Math.floor(pl.audioData.length * 3 / 4) : 0,
        byteThan: than.length,
      };
      const gia = window.__kichBan === 'khong-nghe-duoc'
        ? { ngheDuoc: false, deNghe: 0, nhac: 'Bản thu quá nhiễu.' }
        : { ngheDuoc: true, deNghe: 72, nghe: 'I go to school every day',
            tot: ['Nhịp câu đều'],
            can: [{ tu: 'school', van: 'thiếu âm cuối /l/', sua: 'kéo dài lưỡi chạm lợi' }],
            nhac: 'Đọc lại chậm 3 lần.' };
      return new Response(JSON.stringify({ text: JSON.stringify(gia) }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
    return goc(url, opt);
  };
  return true;
})()`;

// ⚠️ MỌI phép bấm và phép đọc phải KHOANH TRONG PANEL.
// Đây là lần thứ ba trong đợt này một bộ rà tự bẫy mình vì dò cả `document`:
// trước là bấm trúng "XÁC NHẬN RESET" của trang chủ, rồi bấm trúng một phương
// án trả lời chứa chữ "xác nhận". Ở đây thẻ đề nói mang nhãn "· B1" trùng với
// thẻ bậc "⭐ B1 Trung Cấp" của trang lộ trình NẰM SAU lớp phủ — bấm trúng nó
// là rời khỏi màn luyện nói, và mọi bước sau đó hỏng vì một lý do bịa.
const PANEL = `document.querySelector('.fixed.inset-0[aria-labelledby="speaking-title"]')`;
const CHU = `(${PANEL} ? ${PANEL}.innerText : '')`;
const BAM_TRONG_PANEL = (chu) => `(() => {
  const p = ${PANEL};
  if (!p) return false;
  const el = [...p.querySelectorAll('button')].find((b) => String(b.innerText || '').includes(${JSON.stringify(chu)}));
  if (!el || el.disabled) return false;
  el.scrollIntoView({ block: 'center' });
  el.click();
  return true;
})()`;
const LOI_THAT = () => t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));

try {
  await t.diToi(may.BASE);
  await nghi(1200);
  await t.danhGia(`localStorage.setItem('grammarGeminiKeyV1', 'AIza_bo_ra_khoa_gia_khong_that_0123'), true`);
  await t.diToi(may.BASE);
  await nghi(1200);
  for (const nhan of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
    await t.danhGia(BAM_THEO_CHU(nhan));
    await nghi(400);
  }

  await t.danhGia(BAM_THEO_CHU('MENU'));
  await nghi(500);
  await t.danhGia(BAM_THEO_CHU('NÓI'));
  await t.doi(`${CHU}.includes('Luyện nói theo chủ đề')`, { giay: 15, nhan: 'màn luyện nói' });
  // Chọn đề đầu tiên: mỗi đề là một thẻ nút mang nhãn kiểu "KỂ LẠI · B1".
  // ⚠️ Bản đầu dò theo chữ "Luyện đề này/Chọn đề/Bắt đầu" — không nhãn nào như
  // vậy tồn tại, nên nó rơi xuống nhánh dự phòng "nút dài hơn 25 ký tự" và bấm
  // trúng một mục điều hướng. Dò theo nhãn CÓ THẬT thì không có chỗ nhầm.
  // Không dùng regex trong chuỗi này: nó đi qua thêm một lượt template literal
  // nữa, `\s` và `\b` bị nuốt và biểu thức vỡ giữa chừng — đúng bẫy đã dính ở
  // ra_nen_toi.mjs. So chuỗi thẳng thì không có chỗ hỏng.
  const moDe = await t.danhGia(`(() => {
    const p = ${PANEL};
    if (!p) return false;
    const bac = ['· A2', '· B1', '· B2', '· C1'];
    const b = [...p.querySelectorAll('button')]
      .filter((x) => x.offsetParent)
      .find((x) => bac.some((m) => String(x.innerText || '').includes(m)));
    if (!b) return false;
    b.scrollIntoView({ block: 'center' });
    b.click();
    return true;
  })()`);
  if (!moDe) ghi('tìm thấy thẻ đề nói trong danh sách', false, 'không thẻ nào mang nhãn bậc');
  await nghi(1500);
  const coNut = await t.danhGia(`${CHU}.includes('Bắt đầu nói')`);
  ghi('mở được một đề nói', coNut);

  await t.danhGia(GAI_BAY);

  // ── THU ÂM THẬT (micro giả của Chrome) ─────────────────────────────────
  await t.danhGia(BAM_TRONG_PANEL('Bắt đầu nói'));
  await nghi(2500);
  await t.danhGia(BAM_TRONG_PANEL('Dừng lại'));
  await t.doi(`${CHU}.includes('Nghe và nhận xét phát âm')`, { giay: 20, nhan: 'nút chấm phát âm' });
  ghi('có bản thu thì nút "Nghe và nhận xét phát âm" hiện ra', true);

  // ── THỨ THẬT SỰ RỜI KHỎI TRANG ─────────────────────────────────────────
  await t.danhGia(BAM_TRONG_PANEL('Nghe và nhận xét phát âm'));
  await t.doi(`!!window.__batDuoc`, { giay: 25, nhan: 'yêu cầu POST /api/ai' });
  const bat = await t.danhGia(`window.__batDuoc`);
  ghi('gửi đúng chế độ pronunciation', !!bat && bat.mode === 'pronunciation', bat ? String(bat.mode) : 'không bắt được');
  ghi('CÓ gửi âm thanh thật, không phải thân rỗng', !!bat && bat.byteAudio > 0,
    bat ? `${(bat.byteAudio / 1024).toFixed(1)} KB` : '');
  ghi('kiểu MIME của Chrome nằm trong danh sách máy chủ nhận',
    !!bat && /^audio\/(webm|ogg|mp4|mpeg|wav)$/.test(String(bat.mimeType || '')),
    bat ? String(bat.mimeType) : '');
  ghi('bản thu nhỏ hơn trần 3 MB của máy chủ', !!bat && bat.byteAudio < TRAN_AUDIO,
    bat ? `${(bat.byteAudio / 1048576).toFixed(3)} MB / trần 3 MB` : '');

  // ── VẼ ĐÚNG KẾT QUẢ ────────────────────────────────────────────────────
  await t.doi(`${CHU}.includes('72')`, { giay: 15, nhan: 'kết quả chấm' });
  const chu = await t.danhGia(CHU);
  ghi('hiện mức dễ nghe kèm nhãn chữ, không chỉ con số trần', /72\s*\/\s*100/.test(chu) && /nghe hiểu được|nghe trôi|phải đoán|khó nghe/.test(chu));
  ghi('hiện được lỗi cụ thể AI nghe thấy', /school/.test(chu) && /âm cuối/.test(chu));
  ghi('nói rõ ĐÂY KHÔNG PHẢI ĐIỂM THI', /không phải điểm thi/i.test(chu));
  ghi('nói rõ KHÔNG vào Báo cáo tiến bộ', /Báo cáo tiến bộ/.test(chu));

  // ── NHÁNH "KHÔNG NGHE RÕ" ──────────────────────────────────────────────
  // Đây là nhánh dễ bị bỏ quên nhất, và là nhánh mà vẽ sai thì vu oan cho
  // người học: micro hỏng mà hiện 0/100 thì đọc thành "phát âm rất tệ".
  await t.danhGia(`window.__kichBan = 'khong-nghe-duoc', window.__batDuoc = null, true`);
  await t.danhGia(BAM_TRONG_PANEL('Nghe và nhận xét phát âm'));
  await t.doi(`${CHU}.includes('không nghe rõ')`, { giay: 20, nhan: 'thông báo không nghe rõ' });
  const chu2 = await t.danhGia(CHU);
  ghi('AI không nghe rõ thì NÓI RA, và KHÔNG vẽ 0/100',
    /không nghe rõ/i.test(chu2) && !/\b0\s*\/\s*100/.test(chu2));

  const loi = LOI_THAT();
  ghi('không có lỗi console / ngoại lệ', loi.length === 0,
    loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 130)}`).join(' | '));
} catch (e) {
  ghi('bộ rà chạy hết không vấp', false, String(e?.message || e));
} finally {
  const dat = ket.filter((k) => k.ok).length;
  console.log(`\nbước đạt: ${dat}/${ket.length}`);
  t.dong();
  tienTrinh.kill();
  may.dong();
  process.exit(dat === ket.length ? 0 : 1);
}
