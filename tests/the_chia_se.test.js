// LINK CHIA SẺ PHẢI HIỆN RA THÀNH MỘT CÁI THẺ, VÀ SỐ TRÊN THẺ PHẢI LÀ SỐ THẬT.
//
// ══ VÌ SAO THẺ NÀY LÀ KÊNH MIỄN PHÍ THẬT, KHÔNG PHẢI SEO ══
// Web là MỘT url: không router, không dựng sẵn phía máy chủ. Google gần như
// không có gì để xếp hạng, nên đổ công vào SEO ở đây là đổ vào chỗ trống. Kênh
// miễn phí thật ở Việt Nam là LINK DÁN VÀO NHÓM ZALO / FACEBOOK, và thứ quyết
// định người ta có bấm hay không là thẻ Open Graph. Trước 19/08 index.html
// KHÔNG có thẻ nào, nên mọi link chia sẻ hiện ra là một url trần.
//
// ══ VÌ SAO PHẢI CANH CON SỐ ══
// Bản đầu của chính thẻ này tôi ghi "617 chặng" — con số lấy từ trí nhớ. Đo lại
// thì lộ trình đã là **710**; 617 là `TONG_CHANG_TRUOC`, tức số của lần sinh
// TRƯỚC. Suýt nữa quảng cáo bằng một con số hết hạn, và nó sẽ hết hạn lần nữa
// mỗi lần chạy `node scripts/build_roadmap.mjs`. Nên con số trên thẻ phải được
// so với dữ liệu thật, không phải với trí nhớ của ai.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { TONG_CHANG } from '../src/data/roadmapCounts.js';
import { STORY_QUIZ } from '../src/data/storyQuiz.js';

const HTML = fs.readFileSync('index.html', 'utf8');
const the = (ten) => {
  const m = new RegExp(`<meta (?:property|name)="${ten}" content="([^"]*)"`).exec(HTML);
  return m ? m[1] : '';
};

test('có đủ thẻ để link dán vào Zalo/Facebook hiện thành một cái thẻ', () => {
  for (const ten of ['og:type', 'og:title', 'og:description', 'og:image', 'og:url', 'og:site_name']) {
    assert.ok(the(ten).length > 0, `thiếu ${ten} — link chia sẻ sẽ hiện ra là url trần`);
  }
  assert.equal(the('og:locale'), 'vi_VN');
  assert.equal(the('twitter:card'), 'summary_large_image');
});

test('og:image và og:url phải TUYỆT ĐỐI — Zalo/Facebook không giải đường dẫn tương đối', () => {
  // Đây là lỗi im lặng nhất trong nhóm này: thẻ có đủ, nhưng ảnh không hiện, và
  // trên máy mình mở link thì vẫn thấy bình thường vì trình duyệt tự ghép url.
  for (const ten of ['og:image', 'og:url', 'twitter:image']) {
    assert.match(the(ten), /^https:\/\//, `${ten} không phải URL tuyệt đối`);
  }
  // Ảnh phải CÓ THẬT trong public/, không thì thẻ trỏ vào 404.
  const ten = the('og:image').replace(/^https:\/\/[^/]+/, '');
  assert.ok(fs.existsSync(`public${ten}`), `og:image trỏ tới ${ten} nhưng public${ten} không tồn tại`);
  assert.ok(the('og:image:alt').length > 10, 'ảnh chia sẻ không có mô tả thay thế');
});

test('SỐ trên thẻ quảng cáo phải khớp dữ liệu thật', () => {
  // Phép canh sinh ra từ một lỗi có thật: bản đầu ghi 617 chặng trong khi lộ
  // trình đã là 710. Con số quảng cáo hết hạn là một lời nói sai, kể cả khi nó
  // từng đúng.
  const mo = `${the('og:description')} ${the('twitter:description')}`;

  const chang = [...mo.matchAll(/(\d+) chặng/g)].map((m) => Number(m[1]));
  assert.ok(chang.length > 0, 'mô tả không nêu số chặng — bỏ số thì không có gì để canh');
  for (const n of chang) {
    assert.equal(n, TONG_CHANG,
      `thẻ quảng cáo ghi ${n} chặng, lộ trình thật có ${TONG_CHANG}. `
      + 'Chạy lại scripts/build_roadmap.mjs là con số này lệch, nên phải sửa index.html theo.');
  }

  const doc = [...mo.matchAll(/(\d+) bài đọc/g)].map((m) => Number(m[1]));
  const that = Object.keys(STORY_QUIZ).length;
  for (const n of doc) {
    assert.ok(n <= that,
      `thẻ ghi ${n} bài đọc song ngữ nhưng kho chỉ có ${that} — quảng cáo nhiều hơn thứ có thật`);
  }

  // KHÔNG được hứa những thứ sản phẩm không làm. Cam kết là B2 + nhánh C1 dự bị,
  // và app không có bài nghe đoạn dài hay chấm phát âm thật.
  assert.ok(!/C2\b/.test(mo), 'thẻ hứa C2 — cam kết của sản phẩm là B2 vững + nhánh C1');
  assert.ok(!/4 kỹ năng|bốn kỹ năng|luyện nghe|chấm phát âm/i.test(mo),
    'thẻ hứa kỹ năng app chưa có — cùng lỗi đã sửa ở LandingSections');
});

test('robots.txt và sitemap.xml khai đúng, không bịa url', () => {
  const robots = fs.readFileSync('public/robots.txt', 'utf8');
  const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');

  // Bảng quản trị mở bằng ?admin=access — không được để nó vào kết quả tìm kiếm.
  assert.match(robots, /Disallow: \/\?admin=access/, 'robots.txt không chặn bảng quản trị');
  assert.match(robots, /Sitemap: https:\/\//, 'robots.txt không trỏ tới sitemap');

  assert.match(sitemap, /sitemaps\.org\/schemas\/sitemap\/0\.9/,
    'namespace sitemap sai (dễ gõ nhầm sitemap.org thiếu chữ s) — công cụ tìm kiếm sẽ bỏ qua file');

  // ĐÚNG MỘT url, vì web thật sự chỉ có một url. Khai thêm url không tồn tại thì
  // công cụ tìm kiếm nhận 200 kèm cùng một trang — đó là trang rác.
  const soUrl = (sitemap.match(/<loc>/g) || []).length;
  assert.equal(soUrl, 1, `sitemap khai ${soUrl} url, nhưng SPA này chỉ có 1`);
  assert.ok(sitemap.includes(the('og:url')), 'url trong sitemap khác og:url');
});
