// File: tests/milestone_gate.test.js
// CHỐT CHẶN CỔNG HOÀN THÀNH (hạng mục #1).
//
// `completeMilestone(id, xp, evidence)` cố ý MỞ SẴN khi không nhận được
// evidence, để mỗi màn hình được chuyển đổi dần mà không ai mất tiến độ giữa
// chừng. Cái giá của thiết kế đó: một call site mới quên gửi evidence sẽ lặng
// lẽ mở lại đúng cái cửa mà hạng mục #1 sinh ra để đóng.
//
// Test này liệt kê MỌI chỗ gọi completeMilestone trong src/ và bắt buộc:
//   - hoặc gọi kèm tham số thứ ba (evidence),
//   - hoặc nằm trong danh sách miễn trừ có LÝ DO ghi rõ bên dưới.
// Thêm màn hình mới mà quên gate → test đỏ, không cần ai nhớ.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

// Miễn trừ CÓ LÝ DO — không phải chỗ nào cũng là bài học có điểm.
const EXEMPT = {
  'src/pages/IeltsFoundationPage.jsx': 'cụm IELTS Nền Tảng là bài VIDEO, không có câu hỏi để chấm; file này chủ dự án cấm sửa nên miễn trừ từ BÊN NGOÀI, nhận diện theo đường dẫn',
  'src/pages/GamesPage.jsx': 'trò chơi ôn tập tự chấm theo điểm số của chính nó, id "game-*" không nằm trong lộ trình 44 chặng',
};

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.jsx?$/.test(name)) out.push(full);
  }
  return out;
}

test('mọi chỗ gọi completeMilestone đều có bằng chứng, hoặc được miễn trừ có lý do', () => {
  const offenders = [];
  const seen = new Set();

  for (const file of walk(SRC)) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const text = readFileSync(file, 'utf8');
    // Chỉ bắt LỆNH GỌI thật: completeMilestone( ... ) — bỏ qua khai báo prop.
    const calls = text.match(/completeMilestone\??\.?\(([^;\n]*)\)/g) || [];
    if (calls.length === 0) continue;
    seen.add(rel);
    if (EXEMPT[rel]) continue;
    for (const call of calls) {
      const args = call.replace(/^completeMilestone\??\.?\(/, '').replace(/\)$/, '');
      const argc = args.split(',').length;
      if (argc < 3) offenders.push(`${rel}: ${call.trim()}`);
    }
  }

  assert.deepEqual(offenders, [],
    'call site sau đây gọi completeMilestone mà không gửi bằng chứng độ chính xác:\n  ' + offenders.join('\n  '));

  // Danh sách miễn trừ phải còn đúng: file đã hết gọi thì phải gỡ khỏi danh sách
  for (const rel of Object.keys(EXEMPT)) {
    assert.ok(seen.has(rel), `${rel} nằm trong danh sách miễn trừ nhưng không còn gọi completeMilestone — hãy gỡ khỏi EXEMPT`);
  }
});
