// GHIM VIỆC 1.5 — "ghi giờ học ước lượng THẬT cho từng chặng, KÈM CÔNG THỨC".
//
// Vế "giờ thật" đã có test từ trước (`roadmap_coverage.test.js`, tiêu chí N2:
// ≥450 giờ đến hết B2, cộng từ số bài thật). File này ghim vế CÔNG THỨC, là vế
// bị bỏ quên: rà lại 17/08 thì màn hình chỉ nói "Con số ước lượng từ số bài
// thật của từng chặng" — đúng, nhưng người học thấy 587 giờ và không có đường
// nào tự kiểm. Một con số không kiểm được đúng là thứ cả chuỗi này đang dọn.
//
// Hai điều được ghim, và cả hai đều là LỖI ĐÃ DÍNH THẬT trong lúc làm việc này:
//
// 1. Hằng số công thức phải đọc từ file MÁY SINH, không chép tay vào JSX. Bản
//    nháp đầu chép thẳng 20 / 4 / 200 vào WelcomePage — đúng lỗi hai bản sao
//    câu "máy chỉ đếm được số từ" từng dính ở WritingPromptPanel và
//    SpeakingPromptPanel: sửa một bên, bên kia lặng lẽ nói sai.
//
// 2. Chạy lại bộ sinh mà tổng KHÔNG đổi thì mốc cũ (TONG_CHANG_TRUOC) phải
//    GIỮ NGUYÊN. Bản đầu chỉ đọc TONG_CHANG cũ, nên lần chạy lại thứ hai (chỉ
//    để dọn hằng số) đã đặt 617 → 710 và **xoá sạch lời báo "lộ trình vừa
//    tăng"** cho đúng những người nó sinh ra để phục vụ: ai đang học ở mốc 617
//    và chưa mở app lại nên chưa có `roadmapSeenTotalV1` trong máy. Bắt được vì
//    tình cờ in ra file sau khi chạy — nên luật đã tách sang một mô-đun thuần
//    để test gọi vào được, chứ không dựa vào lần tới ai đó cũng tình cờ nhìn.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mocCuTiepTheo } from '../scripts/lib/mocLoTrinh.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const KHOA_CONG_THUC = [
  'giayMoiMuc', 'cheDoMoiTu', 'docTu', 'docPhut',
  'phutMoiMucLyThuyet', 'lanNgheMoiBai', 'cauMoiBuoiChinhTa', 'luotMoiCauChinhTa',
];

test('file máy sinh xuất đủ mọi hằng số của công thức giờ', () => {
  const src = doc('src/data/roadmapCounts.js');
  assert.match(src, /export const CONG_THUC_GIO = \{/, 'roadmapCounts.js phải xuất CONG_THUC_GIO');
  for (const k of KHOA_CONG_THUC) {
    assert.match(src, new RegExp(`${k}:\\s*\\d+`), `công thức thiếu khoá "${k}" — màn hình sẽ hiện undefined`);
  }
});

// Bỏ dòng chú thích TRƯỚC khi dò số trần. Lần đầu viết test này nó đỏ vì bắt
// đúng cái chú thích đang GIẢI THÍCH rằng số trần đã bị gỡ — test đọc lời kể về
// mã chứ không đọc mã. `assert.ok(!re.test(...))` chứ không `doesNotMatch`: khi
// đỏ, doesNotMatch in ra cả file 12 nghìn ký tự.
const boChuThich = (src) => src.split('\n').filter((d) => !/^\s*\/\//.test(d)).join('\n');

test('bộ sinh không còn số trần cho các hằng số đã có tên', () => {
  const ma = boChuThich(doc('scripts/build_roadmap.mjs'));
  // `* 2` cho mục lý thuyết từng nằm ở HAI chỗ (ngữ pháp và unit Oxford).
  assert.equal((ma.match(/\) \* 2\b/g) || []).length, 0,
    'còn số trần 2 cho phút lý thuyết — dùng PHUT_MOI_MUC_LY_THUYET');
  assert.ok(!/SO_CAU_MOI_BUOI \* 3\b/.test(ma), 'còn số trần 3 lượt/câu — dùng LUOT_MOI_CAU_CHINH_TA');
  assert.ok(/const READ_WPM = READ_WORDS \/ READ_MINUTES;/.test(ma),
    'READ_WPM phải suy từ cặp từ/phút, để công thức xuất ra khớp với số dùng để tính');
});

test('màn hình ĐỌC công thức từ file máy sinh, không chép tay hằng số', () => {
  const src = doc('src/pages/WelcomePage.jsx');
  assert.match(src, /CONG_THUC_GIO/, 'WelcomePage phải nhập CONG_THUC_GIO');
  for (const k of KHOA_CONG_THUC) {
    assert.ok(src.includes(`CONG_THUC_GIO.${k}`), `WelcomePage không dùng CONG_THUC_GIO.${k} — hoặc bỏ sót, hoặc đã chép tay`);
  }
  // Vế "không tính vào" phải đứng cạnh: thiếu nó thì bảng công thức đọc thành
  // lời hứa "học xong trong 587 giờ".
  assert.match(src, /Không tính vào:/, 'thiếu phần nói rõ công thức KHÔNG tính những gì');
  // Mã nguồn bộ sinh cẩn thận ghi "GIẢ ĐỊNH, không phải số đo" trên LAN_NGHE.
  // Bảng cho người học thì bày cả sáu hằng số thành một danh sách phẳng dưới một
  // câu nói con số "từ số bài thật" — đọc thành sáu con số đo được. Cái ĐẾM ĐƯỢC
  // là số bài/số từ/số câu; sáu hằng số quy chúng ra thời gian đều là giả định.
  assert.match(src, /GIẢ ĐỊNH/, 'bảng công thức phải tách "đếm được" khỏi "giả định"');
});

test('mốc cũ chỉ dịch khi tổng chặng THẬT SỰ đổi', () => {
  const fileCu = 'export const TONG_CHANG = 710;\nexport const TONG_CHANG_TRUOC = 617;\n';
  assert.equal(mocCuTiepTheo(fileCu, 710), 617, 'chạy lại mà tổng không đổi → phải GIỮ mốc 617');
  assert.equal(mocCuTiepTheo(fileCu, 800), 710, 'tổng tăng thật → mốc cũ dịch lên tổng vừa rồi');
  assert.equal(mocCuTiepTheo(fileCu, 700), 710, 'tổng GIẢM cũng là đổi thật — vẫn phải dịch mốc');
  assert.equal(mocCuTiepTheo(null, 710), 710, 'lần sinh đầu (chưa có file) → không có gì đổi');
  assert.equal(mocCuTiepTheo('export const TONG_CHANG = 710;\n', 710), 710,
    'file cũ thiếu TONG_CHANG_TRUOC → không được trả NaN');
});

test('mốc cũ trong file hiện tại vẫn còn chuyện để báo', () => {
  const src = doc('src/data/roadmapCounts.js');
  const tong = Number(src.match(/export const TONG_CHANG = (\d+)/)[1]);
  const truoc = Number(src.match(/export const TONG_CHANG_TRUOC = (\d+)/)[1]);
  assert.ok(Number.isFinite(tong) && Number.isFinite(truoc));
  // KHÔNG ghim 617 hay 710 thành con số cố định: đợt sau lộ trình tăng nữa thì
  // cả hai phải đổi được. Chỉ ghim quan hệ — mốc cũ không bao giờ vượt tổng.
  assert.ok(truoc <= tong, `TONG_CHANG_TRUOC (${truoc}) > TONG_CHANG (${tong}) — lời báo sẽ nói lộ trình teo lại`);
});
