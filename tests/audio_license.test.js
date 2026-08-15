// File: tests/audio_license.test.js
// CỔNG GIẤY PHÉP ÂM THANH — FAIL CLOSED (việc 2.1).
//
// Vì sao test này tồn tại, bằng số đo thật trên kho Tatoeba ngày 2026-08-15
// (bản kê sentences_with_audio.csv, lấy mẫu đầu/giữa/cuối file):
//     66–82%  CC BY-NC-ND 3.0   (người đọc CK — kho lớn nhất, hay được giới
//                                thiệu là "audio miễn phí")
//     12–16%  CC BY-NC 4.0
//      4–12%  BỎ TRỐNG
//      1–2,6% CC BY 4.0 / CC0
// Bunny English CÓ THU PHÍ (màn hình chọn gói trong AccessGate). "NC" nghĩa là
// phi thương mại → hơn 95% kho đó KHÔNG dùng được. Nhìn lướt sẽ kết luận ngược
// lại, và cái giá của việc kết luận sai không phải là một dòng chữ xấu trên
// giao diện.
//
// Nguyên tắc của test: BẤT CỨ THỨ GÌ KHÔNG CHỨNG MINH ĐƯỢC LÀ ĐỎ. Không có
// đường "chưa rõ thì cho qua".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import {
  coTheDung, lyDoTuChoi, kiemTraBanGhi, dongGhiCong,
  GIAY_PHEP_CHO_PHEP, GIAY_PHEP_TU_CHOI, TRUONG_BAT_BUOC,
} from '../src/utils/audioLicense.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'audio');
const MANIFEST = path.join(ROOT, 'src', 'data', 'audioManifest.js');

test('danh sách cho phép đúng là hai loại giấy phép mở + phạm vi công cộng', () => {
  assert.deepEqual(Object.keys(GIAY_PHEP_CHO_PHEP).sort(), ['CC BY 4.0', 'CC0 1.0', 'Public Domain']);
  for (const gp of Object.keys(GIAY_PHEP_CHO_PHEP)) assert.equal(coTheDung(gp), true, `${gp} phải được cho phép`);
});

test('mọi giấy phép NC/ND đều bị chặn, kể cả loại chưa từng gặp', () => {
  const phaiChan = [
    'CC BY-NC-ND 3.0', 'CC BY-NC 4.0', 'CC BY-NC-SA 4.0', 'CC BY-ND 4.0',
    'CC BY-NC 2.0 FR', 'Attribution-NonCommercial 4.0', 'CC BY-NoDerivatives 4.0',
  ];
  for (const gp of phaiChan) {
    assert.equal(coTheDung(gp), false, `"${gp}" lọt qua cổng — đây là giấy phép cấm dùng cho sản phẩm thu phí`);
    assert.ok(lyDoTuChoi(gp), `"${gp}" bị chặn nhưng không nói được lý do`);
  }
});

test('BỎ TRỐNG không có nghĩa là tự do — đây là chỗ dễ sai nhất', () => {
  // Tatoeba nói nguyên văn ở trang downloads: "If the license field is empty,
  // you may not reuse the audio outside the Tatoeba project."
  for (const rong of ['', '   ', null, undefined, '\\N']) {
    assert.equal(coTheDung(rong), false, `giá trị rỗng ${JSON.stringify(rong)} bị coi là dùng được`);
  }
  assert.match(GIAY_PHEP_TU_CHOI[''], /không.*tự do|Tatoeba/i);
});

test('CC BY-SA bị loại có chủ ý, không phải bỏ sót', () => {
  assert.equal(coTheDung('CC BY-SA 4.0'), false);
  assert.ok(GIAY_PHEP_TU_CHOI['CC BY-SA 4.0'].includes('ShareAlike'), 'phải ghi rõ lý do loại, để người sau biết đây là quyết định');
});

test('bản ghi thiếu hồ sơ là đỏ — có giấy phép thôi chưa đủ', () => {
  const day = {
    id: 'tat-1646', file: 'tat-1646.mp3', text: 'My name is Jack.',
    license: 'CC BY 4.0', author: 'Them', source: 'Tatoeba',
    sourceUrl: 'https://tatoeba.org/en/sentences/show/1646',
    licenseStatementUrl: 'https://tatoeba.org/en/downloads',
    licenseCheckedAt: '2026-08-15',
  };
  assert.deepEqual(kiemTraBanGhi(day), []);

  for (const truong of TRUONG_BAT_BUOC) {
    const thieu = { ...day, [truong]: '' };
    assert.ok(kiemTraBanGhi(thieu).length > 0, `bỏ trường "${truong}" mà vẫn qua cổng`);
  }
  // CC BY bắt buộc ghi công → không có tên tác giả thì không ghi công được.
  assert.ok(kiemTraBanGhi({ ...day, author: '' }).some((l) => /ghi công/.test(l)));
  // CC0 thì không cần tác giả.
  assert.deepEqual(kiemTraBanGhi({ ...day, license: 'CC0 1.0', author: '' }), []);
  // Giấy phép cấm thì đỏ dù hồ sơ đầy đủ.
  assert.ok(kiemTraBanGhi({ ...day, license: 'CC BY-NC-ND 3.0' }).some((l) => /không dùng được/.test(l)));
});

test('dòng ghi công của CC BY phải có tên tác giả (thiếu là vi phạm giấy phép)', () => {
  const d = dongGhiCong({ license: 'CC BY 4.0', author: 'Them', source: 'Tatoeba' });
  assert.match(d, /Them/);
  assert.match(d, /CC BY 4\.0/);
  // CC0 không bắt buộc ghi công, nhưng vẫn nêu nguồn.
  assert.match(dongGhiCong({ license: 'CC0 1.0', source: 'LibriVox' }), /LibriVox/);
  assert.equal(dongGhiCong(null), '');
});

test('mọi file trong public/audio đều có bản ghi, và mọi bản ghi đều có file', async () => {
  const coManifest = fs.existsSync(MANIFEST);
  const coThuMuc = fs.existsSync(AUDIO_DIR);

  // Chưa có audio nào là trạng thái HỢP LỆ ở đợt này — nhưng có file mà không
  // có manifest thì không: đó đúng là kiểu "âm thầm có thứ không ai kiểm".
  if (!coManifest) {
    const files = coThuMuc ? fs.readdirSync(AUDIO_DIR).filter((f) => /\.(mp3|ogg|m4a|wav)$/i.test(f)) : [];
    assert.deepEqual(files, [], 'có file âm thanh trong public/audio nhưng chưa có src/data/audioManifest.js khai giấy phép');
    return;
  }

  // pathToFileURL: trên Windows đường dẫn "d:\..." bị bộ nạp ESM hiểu là giao
  // thức "d:" — đã dính ở đây một lần.
  const { audioManifest } = await import(pathToFileURL(MANIFEST).href);
  const loi = [];
  const ids = new Set();
  for (const e of audioManifest) {
    for (const l of kiemTraBanGhi(e)) loi.push(`${e?.id || '(không id)'}: ${l}`);
    if (ids.has(e.id)) loi.push(`${e.id}: id bị trùng`);
    ids.add(e.id);
    if (!fs.existsSync(path.join(AUDIO_DIR, e.file))) loi.push(`${e.id}: không có file ${e.file}`);
  }
  assert.deepEqual(loi, [], 'bản ghi âm thanh hỏng:\n  ' + loi.join('\n  '));

  const khai = new Set(audioManifest.map((e) => e.file));
  const moCoi = (coThuMuc ? fs.readdirSync(AUDIO_DIR) : []).filter((f) => /\.(mp3|ogg|m4a|wav)$/i.test(f) && !khai.has(f));
  assert.deepEqual(moCoi, [], 'file âm thanh không được khai trong manifest — không ai biết giấy phép của nó:\n  ' + moCoi.join('\n  '));
});
