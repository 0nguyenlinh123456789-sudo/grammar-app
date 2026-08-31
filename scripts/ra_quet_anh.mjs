// File: scripts/ra_quet_anh.mjs
//
//   npm run ra:quetanh
//
// CHỌN MỘT TẤM ẢNH NẶNG HƠN TRẦN MÁY CHỦ RỒI XEM APP CÓ QUÉT ĐƯỢC KHÔNG.
//
// ══ VÌ SAO PHẢI ĐO TRONG TRÌNH DUYỆT ══
// Bản vá 31/08 nén ảnh bằng canvas — thứ chỉ tồn tại trong trình duyệt. Và nó có
// một chỗ hỏng mà bài kiểm đơn vị KHÔNG THỂ thấy: nén ảnh cho phần XEM TRƯỚC
// nhưng vẫn gửi TỆP GỐC lên máy chủ. Nhìn màn hình thì mọi thứ đúng — ảnh hiện
// ra, dòng "đã nén" hiện ra — mà yêu cầu gửi đi vẫn bị máy chủ chặn y như cũ.
// Cách duy nhất phân biệt là ĐỌC THÂN YÊU CẦU thật sự rời khỏi trang.
//
// ══ NÓ ĐO GÌ ══
//   · Tự dựng một ảnh PNG nhiễu ~3000×2200 (nhiễu thì không nén được, nên tệp
//     chắc chắn vượt 4 MB) — và tự kiểm lại rằng nó THẬT SỰ vượt trần, nếu không
//     thì cả bộ rà này vô nghĩa.
//   · Chọn ảnh đó: KHÔNG được hiện lỗi, phải hiện ảnh xem trước.
//   · Thân yêu cầu POST /api/ai phải nhỏ hơn trần 4 MB của máy chủ, và
//     `mimeType` gửi lên phải là `image/jpeg`.
//   · Ảnh PNG NỀN TRONG SUỐT sau khi nén không được ra nền đen (bẫy JPEG không
//     có kênh alpha — chữ đen trên nền đen thì AI đọc ra một tấm ảnh tối thui).
//   · Không lỗi console.

import { moTrinhDuyet, moTab, BAM_THEO_CHU } from '../tests/helpers/trinhduyet.mjs';
import { moMayChuXemTruoc } from '../tests/helpers/mayChuXemTruoc.mjs';

const nghi = (ms) => new Promise((r) => setTimeout(r, ms));
const TRAN_MAY_CHU = 4 * 1024 * 1024;

const may = await moMayChuXemTruoc({ cong: 4329 });
const { tienTrinh, cong } = await moTrinhDuyet({ cong: 9343 });
const t = await moTab(cong);

const ket = [];
const ghi = (buoc, ok, chiTiet = '') => {
  ket.push({ buoc, ok, chiTiet });
  console.log(`${ok ? 'ĐẠT ' : 'HỎNG'} ${buoc}${chiTiet ? ' :: ' + chiTiet : ''}`);
};

// Chặn `/api/ai` NGAY TRONG TRANG rồi ghi lại thân yêu cầu. Đây là chỗ đo chính.
const GAI_BAY_FETCH = `(() => {
  window.__batDuoc = null;
  const goc = window.fetch;
  window.fetch = async (url, opt) => {
    if (String(url).includes('/api/ai')) {
      const than = (opt && opt.body) ? String(opt.body) : '';
      let payload = null;
      try { payload = JSON.parse(than).payload; } catch { /* thân không phải JSON */ }
      window.__batDuoc = { byteThan: than.length, mimeType: payload && payload.mimeType, byteAnh: payload && payload.imageData ? payload.imageData.length : 0 };
      // Phải đúng khuôn \`parseImageVocabulary\` chờ đợi, nếu không app báo lỗi
      // thật và bộ rà tự làm mình đỏ vì một thứ không liên quan tới ảnh.
      const gia = JSON.stringify({
        word: 'notebook', ipa: '/ˈnəʊtbʊk/', meaning: 'quyển vở',
        phrases: ['a spiral notebook'],
        sentences: [{ en: 'I write in my notebook.', vi: 'Tôi viết vào quyển vở.' }],
      });
      return new Response(JSON.stringify({ text: gia }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
    return goc(url, opt);
  };
  return true;
})()`;

// Dựng ảnh nhiễu thật nặng rồi nhét vào ô chọn tệp đúng cách React nghe được.
const TAO_VA_CHON_ANH = (rong, cao, trongSuot) => `(async () => {
  const c = document.createElement('canvas');
  c.width = ${rong}; c.height = ${cao};
  const ctx = c.getContext('2d');
  const d = ctx.createImageData(${rong}, ${cao});
  for (let i = 0; i < d.data.length; i += 4) {
    ${trongSuot
      ? `d.data[i] = 0; d.data[i+1] = 0; d.data[i+2] = 0; d.data[i+3] = (i % 40 === 0) ? 255 : 0;`
      : `d.data[i] = Math.random()*255; d.data[i+1] = Math.random()*255; d.data[i+2] = Math.random()*255; d.data[i+3] = 255;`}
  }
  ctx.putImageData(d, 0, 0);
  const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
  const file = new File([blob], 'anh-thu.png', { type: 'image/png' });
  const dt = new DataTransfer();
  dt.items.add(file);
  const input = document.querySelector('input[type=file]');
  if (!input) return { loi: 'khong-thay-o-chon-tep' };
  input.files = dt.files;
  input.dispatchEvent(new Event('change', { bubbles: true }));
  return { byteGoc: blob.size };
})()`;

const CHU_TRANG = `document.body.innerText`;
const ANH_XEM_TRUOC = `(() => { const i = document.querySelector('img[alt="Preview"]'); return i ? i.src.slice(0, 30) : ''; })()`;

// Giải mã lại ảnh xem trước rồi đo độ sáng góc trên trái — bẫy nền đen.
const DO_SANG_GOC = `(async () => {
  const i = document.querySelector('img[alt="Preview"]');
  if (!i) return null;
  const im = new Image();
  await new Promise((r, j) => { im.onload = r; im.onerror = j; im.src = i.src; });
  const c = document.createElement('canvas');
  c.width = 8; c.height = 8;
  const ctx = c.getContext('2d');
  ctx.drawImage(im, 0, 0, 8, 8);
  const p = ctx.getImageData(0, 0, 8, 8).data;
  let tong = 0;
  for (let k = 0; k < p.length; k += 4) tong += (p[k] + p[k+1] + p[k+2]) / 3;
  return Math.round(tong / (p.length / 4));
})()`;

const LOI_THAT = () => t.nhatKy.filter((x) => x.loai !== 'CONSOLE_WARN' && !x.loai.endsWith('_WARNING'));

try {
  await t.diToi(may.BASE);
  await nghi(1200);
  // Cắm sẵn khoá AI hợp lệ về HÌNH THỨC để giao diện mở đường quét (yêu cầu bị
  // chặn ngay trong trang nên khoá không hề rời khỏi máy).
  await t.danhGia(`localStorage.setItem('grammarGeminiKeyV1', 'AIza_bo_ra_khoa_gia_khong_that_0123'), true`);
  await t.diToi(may.BASE);
  await nghi(1200);
  for (const nhan of ['BẮT ĐẦU NÀO', 'TIẾP TỤC', 'Để sau, vào học luôn']) {
    await t.danhGia(BAM_THEO_CHU(nhan));
    await nghi(400);
  }

  await t.danhGia(BAM_THEO_CHU('MENU'));
  await nghi(500);
  await t.danhGia(BAM_THEO_CHU('QUÉT AI'));
  await t.doi(`!!document.querySelector('input[type=file]')`, { giay: 15, nhan: 'trang Quét Ảnh' });
  ghi('mở được trang Quét Ảnh Bằng AI', true);

  await t.danhGia(GAI_BAY_FETCH);

  // ── ẢNH NẶNG HƠN TRẦN MÁY CHỦ ──────────────────────────────────────────
  const tao = await t.danhGia(TAO_VA_CHON_ANH(3000, 2200, false));
  ghi('dựng được ảnh thử NẶNG HƠN trần 4 MB của máy chủ',
    !!tao && tao.byteGoc > TRAN_MAY_CHU,
    tao ? `${(tao.byteGoc / 1048576).toFixed(1)} MB` : String(tao));

  await t.doi(`!!document.querySelector('img[alt="Preview"]')`, { giay: 25, nhan: 'ảnh xem trước' });
  const chu = await t.danhGia(CHU_TRANG);
  ghi('KHÔNG hiện lỗi "ảnh quá lớn" nữa', !/quá lớn|nhỏ hơn 4 MB/i.test(chu));
  ghi('hiện ảnh xem trước sau khi nén', String(await t.danhGia(ANH_XEM_TRUOC)).startsWith('data:image/jpeg'));
  ghi('nói cho người học biết đã nén bao nhiêu', /Đã nén .* → .*\(\d+×\d+\)/.test(chu),
    (chu.match(/Đã nén [^\n]*/) || [''])[0]);

  // ── THỨ THẬT SỰ RỜI KHỎI TRANG ─────────────────────────────────────────
  await t.danhGia(BAM_THEO_CHU('Tạo Từ Vựng Ngay'));
  await t.doi(`!!window.__batDuoc`, { giay: 25, nhan: 'yêu cầu POST /api/ai' });
  const bat = await t.danhGia(`window.__batDuoc`);
  ghi('thân yêu cầu gửi lên NHỎ HƠN trần máy chủ', !!bat && bat.byteThan < TRAN_MAY_CHU,
    bat ? `${(bat.byteThan / 1048576).toFixed(2)} MB / trần ${(TRAN_MAY_CHU / 1048576).toFixed(0)} MB` : 'không bắt được');
  ghi('gửi đúng định dạng máy chủ chấp nhận', !!bat && bat.mimeType === 'image/jpeg',
    bat ? String(bat.mimeType) : '');
  ghi('ảnh gửi đi ĐÃ được nén thật (không phải tệp gốc)',
    !!bat && !!tao && bat.byteAnh < tao.byteGoc,
    bat && tao ? `${(bat.byteAnh / 1048576).toFixed(2)} MB gửi / ${(tao.byteGoc / 1048576).toFixed(1)} MB gốc` : '');

  // ── BẪY NỀN ĐEN VỚI PNG TRONG SUỐT ─────────────────────────────────────
  await t.danhGia(TAO_VA_CHON_ANH(900, 700, true));
  await nghi(2500);
  const sang = await t.danhGia(DO_SANG_GOC);
  ghi('PNG nền trong suốt không bị đổi thành nền ĐEN', sang !== null && sang > 150,
    sang === null ? 'không đo được' : `độ sáng trung bình ${sang}/255`);

  const loi = LOI_THAT();
  ghi('không có lỗi console / ngoại lệ', loi.length === 0,
    loi.slice(0, 3).map((x) => `${x.loai}: ${String(x.text).slice(0, 140)}`).join(' | '));
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
