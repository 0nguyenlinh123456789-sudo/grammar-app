// File: tests/reading_texts.test.js
// GHIM VIỆC 5.3 — VĂN BẢN ĐỌC DÀI 600–1.000 TỪ.
//
// Ba lời hứa của kho bài đọc, mỗi lời một cách vỡ riêng:
//   1. GIẤY PHÉP: chỉ bài VOA tự sản xuất — một bài AP/AFP lọt vào là phát hành
//      lại thứ không thuộc phạm vi công cộng.
//   2. ĐỘ DÀI: "600–1.000 từ" in ngay trên trang chủ — con số phải đo được từ
//      chính dữ liệu, không phải chữ viết tay.
//   3. CÂU HỎI SOẠN TAY: đáp án phải nằm trong lựa chọn, giải thích phải dẫn
//      được về bài — câu hỏi sinh từ khuôn là loại nội dung đã bị xoá khỏi kho.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readingTexts } from '../src/data/readingTexts.js';
import { SO_BAI_DOC } from '../src/data/readingCounts.js';
import { laDongNgoaiBanThu } from '../src/utils/transcriptClean.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Bánh cóc: chỉ được tăng. 30 là số đo lúc làm việc 5.3 — đúng mốc ≥30 bài của
// bảng kế hoạch.
const BAI_DOC_TOI_THIEU = 30;

test(`bánh cóc: kho có ≥ ${BAI_DOC_TOI_THIEU} bài đọc, con số trang chủ khớp kho thật`, () => {
  assert.ok(readingTexts.length >= BAI_DOC_TOI_THIEU, `còn ${readingTexts.length} bài`);
  assert.equal(SO_BAI_DOC, readingTexts.length, 'readingCounts.js lệch với kho — chạy lại build_reading_texts.mjs');
});

test('độ dài 600–1.000 từ là số ĐO ĐƯỢC trên từng bài, không phải lời hứa', () => {
  for (const b of readingTexts) {
    const thuc = b.paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
    assert.equal(b.words, thuc, `${b.id}: trường words ghi ${b.words} nhưng đếm được ${thuc}`);
    assert.ok(thuc >= 600 && thuc <= 1000, `${b.id}: ${thuc} từ, ngoài khoảng 600–1.000 mà trang chủ hứa`);
  }
});

test('giấy phép: đủ trường ghi nguồn, và KHÔNG bài nào nhắc hãng thông tấn', () => {
  const HANG = /\b(Associated Press|Reuters|Agence[ -]France[ -]Presse?|AFP|Bloomberg)\b/i;
  for (const b of readingTexts) {
    for (const truong of ['source', 'sourceUrl', 'license', 'author', 'attributionUrl', 'licenseStatementUrl', 'licenseCheckedAt']) {
      assert.ok(b[truong], `${b.id}: thiếu trường giấy phép "${truong}"`);
    }
    assert.equal(b.license, 'Public Domain');
    assert.match(b.sourceUrl, /^https:\/\/learningenglish\.voanews\.com\//);
    const caBai = b.paragraphs.join(' ');
    assert.doesNotMatch(caBai, HANG, `${b.id}: thân bài nhắc hãng thông tấn — không được phát hành lại`);
    // Dòng ghi công VOA-tự-viết phải có THẬT trong bài gốc — nhưng nó bị cắt
    // khỏi paragraphs khi làm sạch (nó không phải nội dung đọc). Kho ứng viên
    // giữ bằng chứng, kiểm ở test dưới.
  }
});

test('mọi bài trong kho đều truy được về ứng viên có dòng ghi công VOA-tự-viết', () => {
  const uv = JSON.parse(readFileSync(path.join(ROOT, 'voa_doc_chon.json'), 'utf8'));
  const GHI_CONG = /\b(wrote|reported)( on)? this (story|report|lesson) for (VOA Learning English|VOA Special English|Learning English)\b/i;
  for (const b of readingTexts) {
    const goc = uv.find((x) => x.id === b.id);
    assert.ok(goc, `${b.id}: không có trong voa_doc_chon.json`);
    // `dongGhiCong` là NGUYÊN VĂN dòng ghi công lưu lúc thu thập — bộ làm sạch
    // cắt nó khỏi thân bài nên phải lưu riêng, không thì bằng chứng giấy phép
    // biến mất cùng dòng bị cắt.
    assert.match(String(goc.dongGhiCong || ''), GHI_CONG, `${b.id}: hồ sơ ứng viên không lưu dòng ghi công VOA-tự-viết`);
  }
});

test('câu hỏi: đáp án nằm trong lựa chọn, giải thích dẫn về bài, không trùng lựa chọn', () => {
  for (const b of readingTexts) {
    assert.ok(b.questions.length >= 3, `${b.id}: chỉ ${b.questions.length} câu hỏi`);
    for (const h of b.questions) {
      assert.ok(h.opts.includes(h.a), `${b.id}: đáp án "${h.a.slice(0, 40)}…" không nằm trong lựa chọn`);
      assert.equal(new Set(h.opts).size, h.opts.length, `${b.id}: lựa chọn trùng nhau ở câu "${h.q.slice(0, 40)}…"`);
      assert.ok(h.why && h.why.length > 20, `${b.id}: câu "${h.q.slice(0, 40)}…" thiếu phần giải thích dẫn về bài`);
    }
  }
});

// Bài đọc là thứ người học nhìn LÂU NHẤT — một dòng rác chân trang hay dòng
// giải nghĩa lọt vào là lộ ngay. Luật làm sạch nằm ở transcriptClean.js; test
// này bắt kho ĐÃ PHÁT HÀNH phải sạch theo đúng luật hiện hành, chặn kiểu hồi
// quy "luật thêm sau không chạy trên dữ liệu cũ".
test('không đoạn văn nào trong kho dính luật làm sạch hiện hành', () => {
  const dinh = [];
  for (const b of readingTexts) {
    for (const d of b.paragraphs) {
      if (laDongNgoaiBanThu(d)) dinh.push(`${b.id}: "${String(d).slice(0, 70)}"`);
    }
  }
  assert.deepEqual(dinh.slice(0, 8), [], `${dinh.length} đoạn dính luật làm sạch — chạy lại build_reading_texts.mjs:\n  ${dinh.slice(0, 8).join('\n  ')}`);
});

// Kho bài đọc và kho bài nghe dùng chung nguồn VOA — nếu một bài nằm cả hai
// nơi thì người học "đọc trước bản chép lời" của chính bài nghe đó.
test('không bài đọc nào trùng bài trong kho bài nghe', async () => {
  const { listeningPassages } = await import('../src/data/listeningPassages.js');
  const nghe = new Set(listeningPassages.map((b) => b.sourceUrl));
  for (const b of readingTexts) {
    assert.ok(!nghe.has(b.sourceUrl), `${b.id} trùng với một bài trong kho bài nghe`);
  }
});

test('WelcomePage nạp panel bài đọc bằng lazy import, không kéo kho vào chunk trang chủ', () => {
  const s = readFileSync(path.join(ROOT, 'src/pages/WelcomePage.jsx'), 'utf8');
  assert.match(s, /lazy\(\(\) => import\('\.\.\/components\/reading\/ReadingLongPanel'\)\)/);
  assert.doesNotMatch(s, /from '\.\.\/data\/readingTexts'/, 'trang chủ import thẳng kho bài đọc — ~200 KB vào gói tải đầu');
  assert.match(s, /SO_BAI_DOC/, 'trang chủ không còn hiện số bài đọc thật');
});
