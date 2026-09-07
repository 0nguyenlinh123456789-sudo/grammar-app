// BÀI KIỂM CHO Ô "TÌM TRONG KHÓA HỌC" (src/utils/timKiem.js).
//
// ══ LỖI ĐÃ CÓ ══
// Bản cũ dựng kết quả từ ba prop của MainLayout (`parsedGrammarData`,
// `vstepTopics`, `courseData`). Cả ba khởi tạo RỖNG và chỉ đầy sau khi người
// học ĐÃ VÀO đúng khu. Mà chỗ người ta gõ tìm kiếm là MÀN HÌNH ĐẦU TIÊN — đúng
// lúc cả ba còn rỗng. Đo bằng trình duyệt thật (scripts/ra_tim_kiem.mjs) ra
// 0/5 từ khoá: mọi bài CÓ THẬT đều bị trả lời "Không tìm thấy bài phù hợp."
//
// ══ VÌ SAO PHẢI CÓ CẢ BÀI KIỂM NÀY, KHI ĐÃ CÓ BỘ RÀ ══
// Bộ rà trả lời "hôm nay có chạy không". Bài kiểm này neo những thứ mà bộ rà
// KHÔNG thấy: độ phủ (mốc chỉ được tăng), gõ không dấu, và luật xếp hạng.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import {
  boDau, chiMucKhoaHoc, timTrongKhoaHoc, NHAN_LOAI, SO_LOAI_TIM_DUOC,
} from '../src/utils/timKiem.js';
import { roadmapData } from '../src/data/roadmapData.js';

// ══════════════════════ BỎ DẤU ══════════════════════

test('bỏ dấu: người Việt gõ trên điện thoại phần lớn không bỏ dấu', () => {
  assert.equal(boDau('Bảng Chữ Cái'), 'bang chu cai');
  assert.equal(boDau('NGUYÊN ÂM DÀI'), 'nguyen am dai');
  assert.equal(boDau('  Kinh Doanh  '), 'kinh doanh');
});

test('bỏ dấu: "đ" KHÔNG phải chữ có dấu tổ hợp, phải thay tay', () => {
  // `normalize('NFD')` tách dấu thành ký tự tổ hợp rồi xoá. Nhưng "đ" là một ký
  // tự ĐỘC LẬP trong Unicode, không phải "d + dấu", nên NFD không đụng tới nó.
  // Bỏ sót dòng thay tay đó thì gõ "dong" không bao giờ ra "Động" — và lỗi ấy
  // im lặng: nó chỉ làm một phần kết quả biến mất.
  // PHẢI thử CẢ HAI kiểu chữ. Bản đầu của bài kiểm này chỉ thử "Đ" HOA, và
  // gieo lại lỗi cho thấy nó vẫn XANH khi đã xoá dòng xử lý "đ" thường: chữ
  // hoa được cứu nhờ `Đ → D` rồi `.toLowerCase()` hạ xuống 'd'. Nhánh chữ
  // thường — nhánh người học thật sự gõ — thì không ai kiểm.
  assert.equal(boDau('động từ'), 'dong tu', 'nhánh "đ" THƯỜNG chưa được xử lý');
  assert.equal(boDau('Động Từ'), 'dong tu');
  assert.equal(boDau('đủ'), 'du');
  assert.ok(!boDau('đông Đủ').includes('đ'), 'còn sót chữ đ sau khi bỏ dấu');
});

test('bỏ dấu chịu được đầu vào rác mà không ném', () => {
  // Chỉ mục dựng từ dữ liệu thật, và dữ liệu thật có chặng thiếu `desc`.
  for (const rac of [null, undefined, 0, false, {}]) {
    assert.doesNotThrow(() => boDau(rac));
  }
});

// ══════════════════════ ĐỘ PHỦ — MỐC CHỈ ĐƯỢC TĂNG ══════════════════════

test('chỉ mục phủ TOÀN BỘ lộ trình, không sót chặng nào', () => {
  const tongChang = roadmapData.reduce((n, b) => n + (b.milestones || []).length, 0);
  const chiMuc = chiMucKhoaHoc();
  assert.equal(chiMuc.length, tongChang,
    `chỉ mục có ${chiMuc.length} mục nhưng lộ trình có ${tongChang} chặng — có chặng không tìm ra được`);
  // Mốc tuyệt đối: lộ trình co lại cũng phải báo, không chỉ báo khi lệch nhau.
  assert.ok(chiMuc.length >= 724,
    `chỉ mục tụt còn ${chiMuc.length} mục (mốc 724) — nội dung tìm được vừa ít đi`);
});

test('đủ SÁU loại nội dung đều tìm được, và loại nào cũng có nhãn tiếng Việt', () => {
  const loaiTrongLoTrinh = new Set();
  for (const b of roadmapData) for (const m of b.milestones || []) loaiTrongLoTrinh.add(m.type);

  // Thêm một loại chặng mới vào lộ trình mà quên thêm nhãn ở NHAN_LOAI thì kết
  // quả hiện ra cho người học mang nhãn là id nội bộ ('dictation'), không phải
  // tiếng Việt. Bắt ngay tại đây chứ không để người học nhìn thấy.
  const thieuNhan = [...loaiTrongLoTrinh].filter((l) => !NHAN_LOAI[l]);
  assert.deepEqual(thieuNhan, [],
    `loại chặng chưa có nhãn tiếng Việt: ${thieuNhan.join(', ')}`);

  assert.ok(SO_LOAI_TIM_DUOC >= 6,
    `chỉ còn ${SO_LOAI_TIM_DUOC} loại nội dung tìm được (mốc 6) — vừa mất một nguồn`);
});

// ══════════════════════ TÌM RA THẬT ══════════════════════

test('tìm ra bài của CẢ SÁU loại — đây là thứ bản cũ trả về rỗng', () => {
  const canTim = [
    ['bảng chữ cái', 'grammar'],
    ['kinh doanh', 'vstep'],
    ['talking about language', 'oxford'],
    ['railway', 'reading'],
    ['chép chính tả', 'dictation'],
  ];
  for (const [tu, loai] of canTim) {
    const kq = timTrongKhoaHoc(tu);
    assert.ok(kq.length > 0, `gõ "${tu}" không ra kết quả nào`);
    assert.ok(kq.some((m) => m.loai === loai),
      `gõ "${tu}" không ra chặng loại ${loai} (ra: ${[...new Set(kq.map((m) => m.loai))].join(',')})`);
  }
  // Loại thứ sáu (bài nghe) tìm bằng một tiêu đề có thật trong lộ trình.
  const coNghe = chiMucKhoaHoc().find((m) => m.loai === 'listening');
  assert.ok(coNghe, 'lộ trình không còn chặng nghe nào');
  assert.ok(timTrongKhoaHoc(coNghe.tieuDe.slice(0, 12)).some((m) => m.loai === 'listening'),
    'không tìm ra chặng nghe bằng chính tiêu đề của nó');
});

test('gõ KHÔNG DẤU ra đúng kết quả như gõ có dấu', () => {
  const co = timTrongKhoaHoc('bảng chữ cái').map((m) => m.khoa);
  const khong = timTrongKhoaHoc('bang chu cai').map((m) => m.khoa);
  assert.ok(co.length > 0, 'gõ có dấu đã không ra gì');
  assert.deepEqual(khong, co, 'gõ không dấu ra kết quả khác gõ có dấu');
});

test('từ khoá không có thật vẫn trả về rỗng', () => {
  // Không có phép kiểm này thì một bản vá "trả về mọi thứ cho mọi từ khoá"
  // cũng làm tất cả các bài trên xanh rực.
  assert.deepEqual(timTrongKhoaHoc('zzqqxxvv khong ton tai'), []);
});

test('từ khoá dưới 2 ký tự trả rỗng, không trả 12 dòng ngẫu nhiên', () => {
  assert.deepEqual(timTrongKhoaHoc('a'), []);
  assert.deepEqual(timTrongKhoaHoc(' '), []);
  assert.deepEqual(timTrongKhoaHoc(''), []);
});

// ══════════════════════ XẾP HẠNG ══════════════════════

test('bài khớp ĐẦU tiêu đề đứng trước bài chỉ khớp phần mô tả', () => {
  const kq = timTrongKhoaHoc('unit 1');
  assert.ok(kq.length >= 2, 'cần ít nhất 2 kết quả mới so được thứ tự');
  const dauTien = kq[0];
  assert.ok(dauTien.tieuDeKhong.startsWith('unit 1'),
    `kết quả đầu là "${dauTien.tieuDe}" — không khớp từ đầu tiêu đề`);
});

test('không trả quá số dòng đã đặt', () => {
  // "a" bị chặn bởi luật 2 ký tự, nên dùng một chuỗi khớp rộng nhưng đủ dài.
  const kq = timTrongKhoaHoc('tu vung', { toiDa: 5 });
  assert.ok(kq.length <= 5, `trả ${kq.length} dòng dù đã đặt tối đa 5`);
});

// ══════════════════════ MỞ ĐƯỢC BÀI ══════════════════════

test('mỗi kết quả mang theo NGUYÊN chặng gốc — thiếu là bấm vào không mở được', () => {
  // `WelcomePage.launchMilestone` cần `type` + `targetId` cho mọi loại, cần
  // thêm `bookId` cho Oxford, và cần NGUYÊN chặng cho nghe/đọc/chép chính tả
  // (ba loại đó mở panel ngay tại trang chủ bằng chính đối tượng chặng). Chép
  // ra bản rút gọn rồi truyền đi thì ba loại sau mở ra panel trống.
  for (const m of chiMucKhoaHoc()) {
    assert.ok(m.chang, `mục "${m.tieuDe}" không mang chặng gốc`);
    assert.equal(m.chang.type, m.loai);
    assert.ok(m.chang.targetId !== undefined, `chặng "${m.tieuDe}" thiếu targetId`);
  }
  const oxford = chiMucKhoaHoc().filter((m) => m.loai === 'oxford');
  assert.ok(oxford.length > 0);
  const thieuSach = oxford.filter((m) => !m.chang.bookId);
  assert.deepEqual(thieuSach.map((m) => m.tieuDe).slice(0, 3), [],
    `${thieuSach.length} chặng Oxford thiếu bookId — sẽ mở nhầm unit của quyển đang chọn`);
});

test('khoá của mỗi kết quả là duy nhất — trùng khoá là React vẽ sai dòng', () => {
  const khoa = chiMucKhoaHoc().map((m) => m.khoa);
  const trung = khoa.filter((k, i) => khoa.indexOf(k) !== i);
  assert.deepEqual([...new Set(trung)], [], 'có khoá trùng trong chỉ mục');
});

// ══════════════════════ LƯỚI CHỐNG TÁI PHÁT ══════════════════════

test('MainLayout KHÔNG còn dựng kết quả từ ba prop nạp trễ', () => {
  // Đây là mốc chống tái phát. Ai đó "dọn dẹp" bằng cách quay lại đọc prop sẽ
  // dựng lại đúng lỗi cũ, và lỗi cũ thì im lặng — không test nào khác thấy.
  // (fs nhập ở đầu tệp — tệp này là ES module, không có `require`.)
  const src = fs.readFileSync(new URL('../src/layouts/MainLayout.jsx', import.meta.url), 'utf8');
  assert.ok(src.includes('timTrongKhoaHoc('),
    'MainLayout không còn gọi timTrongKhoaHoc — ô tìm kiếm vừa quay về đường cũ');
  assert.ok(!/globalResults\s*=\s*searchTerm\s*\?\s*\[/.test(src),
    'MainLayout đang dựng lại globalResults từ prop — chính là lỗi đã sửa');
});
