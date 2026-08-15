// File: scripts/audit_transcript_holes.mjs
// KIỂM LẠI CÁC BÀI ĐÃ PHÁT HÀNH bằng bộ dò lỗ thủng MỚI.
//
// Vì sao cần: bộ dò được siết lại SAU KHI 32 bài đã lên. Siết một cái lưới rồi
// chỉ đem thả cho mẻ cá sau là tự lừa mình — những con lọt lưới cũ vẫn đang
// nằm trong kho. Script này tải lại trang gốc của từng bài đã phát hành và soi
// lại bằng luật mới.
//
// Chạy tay, KHÔNG nằm trong npm test (phụ thuộc mạng — cùng lý do với
// scripts/check_voa_links.mjs).
//
// Chạy:  node scripts/audit_transcript_holes.mjs
import { listeningPassages } from '../src/data/listeningPassages.js';
import { timLoThung } from './harvest_voa_passages.mjs';

const goHtml = (s) => String(s || '')
  .replace(/<[^>]*>/g, '')
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ')
  .replace(/&#x[0-9a-f]+;|&#\d+;|&[a-z]+;/gi, ' ')
  .replace(/\s+/g, ' ').trim();

const hong = [];
for (const b of listeningPassages) {
  try {
    const html = await (await fetch(b.sourceUrl)).text();
    const doanTho = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => goHtml(m[1]));
    const lo = timLoThung(doanTho);
    if (lo.length) {
      hong.push({ id: b.id, title: b.title, lo });
      process.stderr.write(`✖ ${b.id.padEnd(13)} ${b.title.slice(0, 45)}\n`);
      for (const l of lo) process.stderr.write(`    ${l}\n`);
    } else {
      process.stderr.write(`✓ ${b.id.padEnd(13)} ${b.title.slice(0, 45)}\n`);
    }
  } catch (e) { process.stderr.write(`! ${b.id}: ${e.message}\n`); }
}

process.stderr.write(`\n${listeningPassages.length - hong.length}/${listeningPassages.length} bài không có lỗ thủng.\n`);
if (hong.length) {
  process.stderr.write(`\nPHẢI GỠ ${hong.length} bài khỏi kho: ${hong.map((h) => h.id).join(', ')}\n`);
  process.exit(1);
}
