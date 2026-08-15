// File: tests/listening_plan.test.js
// GHÉP KHO BẢN THU VÀO BẬC NGƯỜI HỌC + BÁNH CÓC ĐỘ PHỦ (việc 2.1).
//
// Test này ghim HAI thứ:
//   1. Phép phân nhóm là theo ĐỘ DÀI CÂU, không phải đo bậc CEFR — nên không
//      chỗ nào trong module được phép gọi nhóm bằng tên bậc. Kho bản thu là câu
//      rời không ai gắn bậc; gắn nhãn bậc cho thứ chưa đo là đúng loại tuyên bố
//      mà cả chuỗi dọn nội dung dựng lên để chặn.
//   2. BÁNH CÓC: số bản thu chỉ được TĂNG. Xoá bớt audio là làm hỏng bài của
//      người học mà không ai thấy.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { audioManifest } from '../src/data/audioManifest.js';
import {
  NHOM_DO_DAI, nhomCuaCau, nhomChoBac, thongKeKho, chonBoCau, xaoTron,
} from '../src/utils/listeningPlan.js';
import { ROADMAP_LEVEL_ORDER } from '../src/utils/roadmapNav.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// BÁNH CÓC — chỉ được tăng. Thêm bản thu thì sửa số này lên.
const BAN_THU_TOI_THIEU = 40;

const rand = (seed = 1) => { let s = seed; return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }; };

test('bánh cóc: số bản thu giọng người thật chỉ được tăng', () => {
  assert.ok(audioManifest.length >= BAN_THU_TOI_THIEU,
    `kho còn ${audioManifest.length} bản thu, dưới mốc ${BAN_THU_TOI_THIEU} đã đạt được — audio bị xoá bớt?`);
});

test('mọi bậc lộ trình đều biết bắt đầu ở nhóm nào (thêm bậc mà quên map là đỏ)', () => {
  const hopLe = new Set(NHOM_DO_DAI.map((g) => g.id));
  for (const bac of ROADMAP_LEVEL_ORDER) {
    assert.ok(hopLe.has(nhomChoBac(bac)), `bậc "${bac}" trỏ tới nhóm không có thật`);
  }
  // Bậc lạ / rỗng cũng phải rơi vào một nhóm có thật, không được trả undefined.
  assert.ok(hopLe.has(nhomChoBac('khong-co-that')));
  assert.ok(hopLe.has(nhomChoBac(null)));
  // Bậc càng cao thì nhóm càng dài — không được đảo ngược.
  const thuTu = NHOM_DO_DAI.map((g) => g.id);
  const chiSo = ROADMAP_LEVEL_ORDER.map((b) => thuTu.indexOf(nhomChoBac(b)));
  for (let i = 1; i < chiSo.length; i += 1) {
    assert.ok(chiSo[i] >= chiSo[i - 1], `bậc ${ROADMAP_LEVEL_ORDER[i]} lại được xếp nhóm ngắn hơn bậc dưới nó`);
  }
});

test('phân nhóm theo số từ, và mọi câu trong kho đều rơi vào đúng một nhóm', () => {
  assert.equal(nhomCuaCau({ words: 4 }), 'ngan');
  assert.equal(nhomCuaCau({ words: 6 }), 'ngan');
  assert.equal(nhomCuaCau({ words: 7 }), 'vua');
  assert.equal(nhomCuaCau({ words: 9 }), 'vua');
  assert.equal(nhomCuaCau({ words: 10 }), 'dai');
  assert.equal(nhomCuaCau({ words: 40 }), 'dai');
  // Thiếu trường words thì đếm từ chính câu, không văng.
  assert.equal(nhomCuaCau({ text: 'one two three four five' }), 'ngan');
  assert.equal(nhomCuaCau({}), 'ngan');

  const hopLe = new Set(NHOM_DO_DAI.map((g) => g.id));
  for (const e of audioManifest) assert.ok(hopLe.has(nhomCuaCau(e)), `${e.id} không rơi vào nhóm nào`);
});

test('nhóm KHÔNG được đặt tên bằng bậc CEFR — nó là độ dài, không phải trình độ', () => {
  const nguon = fs.readFileSync(path.join(ROOT, 'src', 'utils', 'listeningPlan.js'), 'utf8');
  for (const g of NHOM_DO_DAI) {
    assert.ok(!/^(A[012]|B[12]|C[12])$/i.test(g.id), `nhóm "${g.id}" đang mang tên một bậc CEFR`);
    assert.ok(!/\b(A1|A2|B1|B2|C1|C2)\b/.test(g.label), `nhãn "${g.label}" đang khai một bậc CEFR chưa hề được đo`);
  }
  // Và module phải nói thẳng điều đó ra, để người sửa sau không hiểu nhầm.
  assert.match(nguon, /KHÔNG phải đo bậc CEFR/);
});

test('bốc bộ câu: đúng nhóm trước, nhóm mỏng thì mượn nhóm bên cạnh', () => {
  const kho = [
    ...Array.from({ length: 8 }, (_, i) => ({ id: `s${i}`, file: `s${i}.mp3`, text: 'a b c d', words: 4 })),
    ...Array.from({ length: 2 }, (_, i) => ({ id: `m${i}`, file: `m${i}.mp3`, text: 'x', words: 8 })),
  ];
  const bo = chonBoCau(kho, 'vua', 5, rand(3));
  assert.equal(bo.length, 5, 'nhóm mỏng thì phải mượn, không được trả bộ thiếu');
  assert.equal(bo.filter((e) => nhomCuaCau(e) === 'vua').length, 2, 'phải lấy hết nhóm đúng trước');
  // Không được lặp câu để cho đủ số.
  assert.equal(new Set(bo.map((e) => e.id)).size, bo.length);
});

test('kho ít hơn số câu yêu cầu → trả về đúng số đang có, không lặp lại', () => {
  const kho = [{ id: 'a', file: 'a.mp3', text: 'one two three four', words: 4 }];
  const bo = chonBoCau(kho, 'ngan', 5, rand(1));
  assert.equal(bo.length, 1);
  assert.equal(new Set(bo.map((e) => e.id)).size, 1);
});

test('kho rỗng/hỏng không làm văng', () => {
  assert.deepEqual(chonBoCau([], 'ngan', 5), []);
  assert.deepEqual(chonBoCau(null, 'ngan', 5), []);
  assert.deepEqual(chonBoCau([null, { id: 'x' }], 'ngan', 5), [], 'bản ghi thiếu file/text phải bị bỏ');
  assert.deepEqual(xaoTron(null), []);
  const tk = thongKeKho(null);
  assert.ok(NHOM_DO_DAI.every((g) => tk[g.id] === 0));
});

test('kho thật phải bốc được một buổi 5 câu cho MỌI bậc lộ trình', () => {
  for (const bac of ROADMAP_LEVEL_ORDER) {
    const bo = chonBoCau(audioManifest, nhomChoBac(bac), 5, rand(7));
    assert.equal(bo.length, 5, `bậc ${bac} chỉ bốc được ${bo.length} câu`);
    assert.equal(new Set(bo.map((e) => e.id)).size, 5, `bậc ${bac} có câu bị lặp trong cùng một buổi`);
  }
});
