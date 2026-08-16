// File: tests/speaking_bank.test.js
// Ghim việc 3.5. Ba nhóm bất biến, và nhóm đầu là quan trọng nhất:
//
//   1. KHÔNG CHỖ NÀO HỨA CHẤM PHÁT ÂM. Cái micro làm người ta tưởng mình đang
//      được đo; trình duyệt thì chỉ trả về VĂN BẢN. Test này quét cả dữ liệu,
//      bộ kiểm và giao diện để không lọt một chữ "điểm phát âm" nào.
//   2. Phủ đủ chặng B1+ (tiêu chí nghiệm thu của 3.5).
//   3. Bộ kiểm chỉ trả về sự thật kiểm được, và không ghi vào sổ lỗi.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { speakingGenerated } from '../src/data/speakingGenerated.js';
import { SO_DE_NOI_THEO_CHANG } from '../src/data/speakingCounts.js';
import { kiemTraLuotNoi, CHECKLIST_NOI } from '../src/utils/speakingCheck.js';
import { deNoiTuChang, deNoiChoChang } from '../src/utils/speakingBank.js';
import { buildRequest } from '../functions/api/ai.js';

const { roadmapData } = await import(pathToFileURL(path.resolve('src/data/roadmapData.js')).href);

// ── 1. KHÔNG HỨA CHẤM PHÁT ÂM ────────────────────────────────────────────────

test('không file nào của mục nói hứa chấm/điểm phát âm', () => {
  const FILES = [
    'src/data/speakingGenerated.js',
    'src/utils/speakingCheck.js',
    'src/utils/speakingBank.js',
    'src/components/speaking/SpeakingPromptPanel.jsx',
  ];
  // Cụm bị cấm: bất kỳ cách nói nào ngụ ý app CHẤM hoặc CHO ĐIỂM phát âm.
  const CAM = [/điểm phát âm/i, /chấm phát âm của bạn/i, /phát âm đúng \d/i, /điểm nói/i];
  // BỎ CHÚ THÍCH TRƯỚC KHI QUÉT. Chính chú thích trong các file này nói "không
  // có điểm phát âm" — quét cả chú thích thì test bắt đúng câu cam kết KHÔNG
  // làm điều đó, tức là bắt nhầm hoàn toàn ngược. Chỉ thứ CHẠY hoặc HIỆN RA
  // mới đáng bị soi.
  const boChuThich = (s) => s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/.*$/gm, '$1');
  const loi = [];
  for (const f of FILES) {
    const s = boChuThich(fs.readFileSync(f, 'utf8'));
    for (const re of CAM) {
      const m = s.match(re);
      if (m) loi.push(`${f}: “${m[0]}”`);
    }
  }
  assert.deepEqual(loi, [], `có chỗ hứa chấm phát âm:\n  ${loi.join('\n  ')}`);
});

test('giao diện nói thẳng rằng đây là chữ máy nghe, không phải đánh giá phát âm', () => {
  const s = fs.readFileSync('src/components/speaking/SpeakingPromptPanel.jsx', 'utf8');
  assert.ok(s.includes('không chấm phát âm'), 'thiếu câu cảnh báo "không chấm phát âm"');
  assert.ok(/văn bản nó nghe được/i.test(s), 'thiếu lời giải thích trình duyệt chỉ trả về văn bản');
  assert.ok(s.includes('chưa có bài nói mẫu'), 'phải nói thẳng là chưa có bài mẫu, không lặng lẽ bỏ bước');
});

test('lời nhắc AI cấm mô hình nhận xét phát âm và không xin điểm số', () => {
  const [p] = buildRequest('speaking', { text: 'I go to school every day.', topicTitle: 'Daily routine' });
  assert.ok(/KHÔNG nghe được âm thanh/.test(p.text), 'phải nói rõ mô hình không nghe được gì');
  assert.ok(/KHÔNG nhận xét về phát âm/.test(p.text), 'phải cấm nhận xét phát âm');
  assert.ok(/KHÔNG cho điểm số/.test(p.text), 'phải cấm cho điểm');
  assert.ok(/nghe sai/.test(p.text), 'phải nhắc rằng bản nhận dạng có thể sai, không phải người nói sai');
  // Khác hẳn lời nhắc bài viết — chỗ đó CÓ xin điểm /10 vì bài viết là chữ thật.
  const [w] = buildRequest('writing', { text: 'I go to school.', topicTitle: '' });
  assert.ok(/điểm \/10/.test(w.text), 'lời nhắc bài viết vẫn xin điểm — nếu đổi thì test này cần đọc lại');
  assert.ok(!/điểm \/10/.test(p.text), 'lời nhắc lượt nói KHÔNG được xin điểm');
});

test('bộ kiểm không trả về bất kỳ trường nào có hình dạng điểm số', () => {
  const de = deNoiTuChang(speakingGenerated[0]);
  const kq = kiemTraLuotNoi('I use public transport every day to go to work.', de);
  const chuoi = JSON.stringify(kq);
  for (const xau of ['score', 'percent', 'diem', 'điểm', 'similarity', 'accuracy']) {
    assert.ok(!chuoi.toLowerCase().includes(xau.toLowerCase()), `kết quả chứa trường giống điểm số: ${xau}`);
  }
  assert.equal(kq.laSuThatKiemDuoc, true);
  assert.ok(kq.khongKiemDuoc.length >= 4, 'phải kê rõ những gì máy KHÔNG kiểm được');
  assert.ok(/TRÌNH DUYỆT/.test(kq.nguon), 'phải nói rõ nguồn con số là trình duyệt');
});

// ── 2. PHỦ ĐỦ CHẶNG B1+ ──────────────────────────────────────────────────────

test('mọi chặng B1 trở lên đều có đúng một đề nói', () => {
  const B1_TRO_LEN = new Set(['intermediate', 'upper_intermediate', 'advanced']);
  const thieu = [];
  let dem = 0;
  for (const band of roadmapData) {
    if (!B1_TRO_LEN.has(band.level)) continue;
    for (const m of band.milestones) {
      dem += 1;
      if (!deNoiChoChang(m)) thieu.push(`${band.level}/${m.type}:${m.targetId}`);
    }
  }
  assert.ok(dem > 300, `chỉ soi được ${dem} chặng B1+ — bộ đọc lộ trình hỏng, test này đang xanh giả`);
  assert.deepEqual(thieu.slice(0, 10), [], `${thieu.length}/${dem} chặng B1+ chưa có đề nói`);
});

test('A0–A2 CỐ Ý không có đề nói theo chủ đề', () => {
  const DUOI_B1 = new Set(['foundation', 'starter', 'elementary']);
  const thua = [];
  for (const band of roadmapData) {
    if (!DUOI_B1.has(band.level)) continue;
    for (const m of band.milestones) if (deNoiChoChang(m)) thua.push(`${band.level}/${m.targetId}`);
  }
  assert.deepEqual(thua.slice(0, 5), [],
    `${thua.length} chặng dưới B1 có đề nói — nói thành bài là việc của B1+, xem lý do ở đầu build_speaking_tasks.mjs`);
});

test('con số hiển thị ở trang chủ khớp kho đề thật', () => {
  assert.equal(SO_DE_NOI_THEO_CHANG, speakingGenerated.length,
    'speakingCounts.js lệch — chạy lại scripts/build_speaking_tasks.mjs');
});

test('chặng không có đề thì trả null, KHÔNG mượn đề của chặng khác', () => {
  assert.equal(deNoiChoChang({ type: 'vstep', targetId: 'khong-ton-tai-abc' }), null);
  assert.equal(deNoiChoChang(null), null);
});

// ── 3. BỘ KIỂM ───────────────────────────────────────────────────────────────

test('đếm độ dài và từ mục tiêu đúng như đã hứa', () => {
  const de = {
    soTuToiThieu: 10,
    tuMucTieu: ['commuter', 'gridlock', 'pavement'],
    soTuPhaiDung: 2,
    kieu: 'ke',
  };
  const kq = kiemTraLuotNoi('As a commuter I walk on the pavement every single morning here', de);
  assert.equal(kq.doDai.soTu, 12);
  assert.equal(kq.doDai.dat, true);
  assert.deepEqual(kq.tuMucTieu.daNghe, ['commuter', 'pavement']);
  assert.equal(kq.tuMucTieu.dat, true);

  const it = kiemTraLuotNoi('a commuter', de);
  assert.equal(it.doDai.dat, false);
  assert.equal(it.doDai.thieu, 8);
  assert.equal(it.tuMucTieu.dat, false);
  assert.equal(it.tuMucTieu.con, 1);
});

test('chặng ngữ pháp không có danh sách từ thì nói ra, không giả vờ kiểm được', () => {
  const nguPhap = speakingGenerated.filter((t) => t.type === 'grammar');
  assert.ok(nguPhap.length > 0, 'không còn chặng ngữ pháp nào — dữ liệu đổi, đọc lại test này');
  for (const t of nguPhap) {
    assert.equal(t.chiKiemDuocDoDai, true, `${t.id}: thiếu cờ chiKiemDuocDoDai`);
    assert.deepEqual(t.tuMucTieu, []);
  }
  const de = deNoiTuChang(nguPhap[0]);
  assert.equal(kiemTraLuotNoi('anything at all here', de).tuMucTieu, null,
    'không có danh sách từ thì phải trả null, không phải một kết quả rỗng trông như đã kiểm');
});

test('mọi đề đều tự khai là chưa có bài mẫu và checklist là chung', () => {
  for (const t of speakingGenerated.slice(0, 40)) {
    const de = deNoiTuChang(t);
    assert.equal(de.coBaiMau, false, `${t.id}: không được hứa có bài mẫu`);
    assert.equal(de.checklistLaChung, true, `${t.id}: checklist dùng chung thì phải tự khai`);
    assert.ok(de.checklist.length >= 4, `${t.id}: checklist quá ngắn`);
    assert.ok(de.deBai.includes('giây'), `${t.id}: đề nói phải nêu thời lượng`);
  }
  for (const k of Object.keys(CHECKLIST_NOI)) {
    assert.ok(CHECKLIST_NOI[k].every((c) => c.trim().endsWith('?')),
      `checklist "${k}" phải là câu hỏi có/không để người học tự soi`);
  }
});
