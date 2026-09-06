// File: tests/manifest_offline.test.js
//
// GHIM DANH SÁCH TẢI VỀ HỌC NGOẠI TUYẾN.
//
// ══ VÌ SAO PHÉP KIỂM NÀY DỰNG MỘT `dist` GIẢ ══
// Cách dễ nhất là đọc `dist/offline-manifest.json` thật rồi kiểm. Nhưng `dist/`
// chỉ có sau khi dựng, nên phép kiểm đó sẽ phải "có thì kiểm, không có thì bỏ
// qua" — tức là một phép kiểm IM LẶNG BIẾN MẤT, đúng thứ dự án này cấm: nó xanh
// y hệt nhau dù bộ sinh còn chạy hay đã hỏng hẳn.
//
// Nên ở đây gọi thẳng `taoManifest(thuMucGia)` trên một cây thư mục tự dựng, có
// cài sẵn đúng những cái bẫy cần bắt. Không cần dựng app, và không bao giờ vô
// nghĩa.
//
// ══ ĐIỀU ĐẮT NHẤT PHẢI GHIM ══
// `dist/ielts-foundation` nặng **30 GB** và nằm trong luật KHÔNG ĐỘNG TỚI của
// dự án. Một mục IELTS lọt vào danh sách tải là người học bấm "tải về" rồi ngồi
// nhìn máy nuốt hết dung lượng 4G của họ.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs, { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { taoManifest } from '../scripts/tao_manifest_offline.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Dựng một `dist` giả có đủ bẫy: mảnh IELTS, thư mục 30 GB, tệp lạ. */
function distGia() {
  const goc = mkdtempSync(path.join(os.tmpdir(), 'bunny-dist-'));
  const dat = (p, noiDung) => {
    mkdirSync(path.join(goc, path.dirname(p)), { recursive: true });
    writeFileSync(path.join(goc, p), noiDung);
  };
  dat('index.html', '<!doctype html>');
  dat('manifest.webmanifest', '{}');
  dat('bunny_logo.png', 'x'.repeat(100));
  dat('assets/index-abc123.js', 'a'.repeat(1000));
  dat('assets/style-abc.css', 'b'.repeat(200));
  dat('assets/grammarData-xyz.js', 'c'.repeat(5000));
  dat('assets/IeltsFoundationPage-CW9UQtJ8.js', 'd'.repeat(804000));
  dat('audio/tat-1512.mp3', 'e'.repeat(15917));
  dat('audio/doc-huong-dan.txt', 'không phải tệp thu');
  dat('fonts/a.woff2', 'f'.repeat(300));
  // Đúng cái thư mục 30 GB ngoài đời. Bộ quét không được đi vào đây.
  dat('ielts-foundation/bai-giang.mp4', 'g'.repeat(50));
  dat('ielts-prep/listening/L2-S1-E4.mp3', 'h'.repeat(50));
  return goc;
}

function chay() {
  const goc = distGia();
  try {
    const m = taoManifest(goc);
    const tuDia = JSON.parse(readFileSync(path.join(goc, 'offline-manifest.json'), 'utf8'));
    return { m, tuDia };
  } finally {
    rmSync(goc, { recursive: true, force: true });
  }
}

const moiDuong = (m) => Object.values(m.nhom).flatMap((n) => n.tep.map((t) => t.d));

test('KHÔNG một mục IELTS nào lọt vào danh sách tải', () => {
  const { m } = chay();
  const xau = moiDuong(m).filter((d) => /ielts/i.test(d));
  assert.deepEqual(xau, [],
    'mục IELTS lọt vào danh sách tải — người học sẽ tải mất dung lượng 4G cho thứ nằm trong luật KHÔNG ĐỘNG TỚI');
});

test('lớp lọc thứ hai CÓ chạy và ĐẾM được — không phải một dòng trang trí', () => {
  const { m } = chay();
  assert.equal(m.daLoaiIelts, 1,
    'phải loại đúng 1 mục (IeltsFoundationPage-*.js trong assets). Số 0 nghĩa là bộ lọc không hề chạm tới thứ gì — lúc đó nó không chứng minh được điều gì cả');
});

test('bộ quét KHÔNG đi vào thư mục ielts-foundation / ielts-prep', () => {
  const { m } = chay();
  const d = moiDuong(m);
  assert.ok(!d.some((x) => x.startsWith('/ielts-')),
    'bộ quét đã đi vào thư mục IELTS — ngoài đời đó là 30 GB');
});

test('số byte là số THẬT trên đĩa, để giao diện không nói dối dung lượng', () => {
  const { m } = chay();
  const mp3 = m.nhom.tiengNoi.tep.find((t) => t.d === '/audio/tat-1512.mp3');
  assert.ok(mp3, 'thiếu tệp thu trong nhóm tiếng nói');
  assert.equal(mp3.b, 15917, 'số byte không khớp kích thước thật — người học sẽ thấy một con số bịa');
  assert.equal(m.tongByte, Object.values(m.nhom).reduce((s, n) => s + n.byte, 0));
});

test('chia đúng ba nhóm, và VỎ APP tách riêng khỏi bài học', () => {
  const { m } = chay();
  assert.deepEqual(Object.keys(m.nhom), ['voApp', 'baiHoc', 'tiengNoi']);
  const vo = m.nhom.voApp.tep.map((t) => t.d);
  assert.ok(vo.includes('/index.html') && vo.includes('/assets/index-abc123.js') && vo.includes('/fonts/a.woff2'),
    'vỏ app phải đủ để MỞ được app khi mất mạng');
  assert.ok(!vo.includes('/assets/grammarData-xyz.js'),
    'dữ liệu bài học không được nhét vào nhóm vỏ — người mạng yếu phải tải được riêng phần nhỏ nhất trước');
  assert.equal(m.nhom.baiHoc.tep.length, 1);
});

test('nhóm tiếng nói chỉ nhận tệp âm thanh, không vơ cả thư mục', () => {
  const { m } = chay();
  const d = m.nhom.tiengNoi.tep.map((t) => t.d);
  assert.deepEqual(d, ['/audio/tat-1512.mp3'],
    'tệp không phải âm thanh trong /audio cũng bị vơ vào — danh sách tải phải nói đúng nó tải cái gì');
});

test('manifest ghi ra đĩa GIỐNG HỆT thứ hàm trả về', () => {
  const { m, tuDia } = chay();
  assert.deepEqual(tuDia, JSON.parse(JSON.stringify(m)),
    'thứ ghi ra đĩa khác thứ hàm trả về — mọi phép kiểm trên đo một bản không ai dùng');
});

// ══ MÃ BẢN DỰNG — THỨ CHO PHÉP NÓI "GÓI CỦA BẠN ĐÃ CŨ" ══
// Tên mảnh mã mang băm nội dung, nên MỖI lần đẩy bản mới là mọi tên đổi và gói
// 17,5 MB người học đã tải bằng 4G không còn đường dẫn nào khớp. Trước bản vá
// này KHÔNG có gì báo cho họ biết — đúng kiểu im lặng dự án cấm.

test('mã bản dựng ỔN ĐỊNH khi nội dung không đổi — không giục tải lại vô ích', () => {
  const a = chay().m.banDung;
  const b = chay().m.banDung;
  assert.equal(a, b,
    'hai lần dựng trên cùng nội dung ra hai mã khác nhau — mỗi lần deploy sẽ bảo người học tải lại 17,5 MB dù chẳng có gì đổi');
  assert.match(a, /^[0-9a-f]{12}$/);
});

test('mã bản dựng ĐỔI khi một mảnh mã đổi tên (tức nội dung đổi)', () => {
  const goc = distGia();
  const khac = distGia();
  try {
    const m1 = taoManifest(goc);
    // Vite đổi tên theo băm nội dung; giả lập đúng điều đó.
    fs.renameSync(path.join(khac, 'assets/grammarData-xyz.js'), path.join(khac, 'assets/grammarData-ZZZ999.js'));
    const m2 = taoManifest(khac);
    assert.notEqual(m1.banDung, m2.banDung,
      'nội dung đổi mà mã bản dựng không đổi — người học sẽ giữ mãi một gói đã chết mà tưởng còn dùng được');
  } finally {
    rmSync(goc, { recursive: true, force: true });
    rmSync(khac, { recursive: true, force: true });
  }
});

test('mã bản dựng KHÔNG lấy từ thời điểm dựng', () => {
  const s = readFileSync(path.join(ROOT, 'scripts/tao_manifest_offline.mjs'), 'utf8');
  const i = s.indexOf('manifest.banDung');
  assert.ok(i > 0, 'không thấy chỗ tính mã bản dựng');
  const than = s.slice(i, i + 200);
  assert.doesNotMatch(than, /taoLuc|Date\.now|new Date/,
    'mã bản dựng đang lấy từ thời điểm — mỗi lần dựng lại là một mã mới, và người học bị giục tải lại 17,5 MB dù không có gì đổi');
});
