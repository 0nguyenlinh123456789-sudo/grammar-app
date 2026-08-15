// File: tests/skill_profile.test.js
// HỒ SƠ NĂNG LỰC THEO KỸ NĂNG (việc 4.3).
//
// Điều quan trọng nhất test ở đây KHÔNG phải là số hiển thị đúng, mà là kỹ
// năng CHƯA ĐO ĐƯỢC không bao giờ được hiện ra dưới dạng một con số. 0% cho
// "Nghe" là một tuyên bố SAI: nó nói người học nghe sai hết, trong khi sự thật
// là app chưa có bài nghe nào để mà đo.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSkillProfile, CEFR_SKILL_ORDER, NOT_MEASURED_REASON } from '../src/utils/skillProfile.js';

const v2 = {
  version: 2, cefr: 'B1', preA1: false, correct: 13, total: 18,
  skillStats: { grammar: { correct: 5, total: 6 }, vocabulary: { correct: 4, total: 6 }, reading: { correct: 4, total: 6 } },
  skillCefr: { grammar: 'B1', vocabulary: 'A2', reading: null },
};

test('chưa làm test → không có hồ sơ, không dựng khung rỗng', () => {
  assert.equal(buildSkillProfile(null), null);
  assert.equal(buildSkillProfile(undefined), null);
});

test('đủ bốn kỹ năng CEFR, đúng thứ tự, ba kỹ năng chưa đo được ghi rõ lý do', () => {
  const p = buildSkillProfile(v2);
  assert.deepEqual(p.cefrSkills.map((s) => s.key), CEFR_SKILL_ORDER);

  const chuaDo = p.cefrSkills.filter((s) => !s.measured);
  assert.deepEqual(chuaDo.map((s) => s.key), ['listening', 'speaking', 'writing']);
  for (const s of chuaDo) {
    // KHÔNG được là 0 — phải là "không có số".
    assert.equal(s.percent, null, `${s.key}: kỹ năng chưa đo được lại có số ${s.percent}`);
    assert.equal(s.cefr, null);
    assert.equal(s.reason, NOT_MEASURED_REASON[s.key]);
    assert.ok(s.reason && s.reason.length > 10, `${s.key}: lý do quá sơ sài`);
  }

  const doc = p.cefrSkills.find((s) => s.key === 'reading');
  assert.equal(doc.measured, true);
  assert.equal(doc.percent, 67);
  assert.equal(doc.cefr, null, 'đọc chưa đúng hết ở bậc nào → không được gán bậc');
});

test('hai kỹ năng nền tách riêng, không trộn vào bốn kỹ năng CEFR', () => {
  const p = buildSkillProfile(v2);
  assert.deepEqual(p.foundation.map((s) => s.key), ['grammar', 'vocabulary']);
  assert.equal(p.foundation[0].percent, 83);
  assert.equal(p.foundation[0].cefr, 'B1');
  assert.ok(!p.cefrSkills.some((s) => s.key === 'grammar'), 'ngữ pháp không phải một trong bốn kỹ năng CEFR');
  assert.equal(p.measuredCount, 3);
});

test('total = 0 KHÔNG được ra NaN (cùng loại bẫy với .length của unit Oxford)', () => {
  const p = buildSkillProfile({ ...v2, skillStats: { ...v2.skillStats, reading: { correct: 0, total: 0 } } });
  const doc = p.cefrSkills.find((s) => s.key === 'reading');
  assert.equal(doc.measured, false);
  assert.equal(doc.percent, null);
  for (const s of [...p.cefrSkills, ...p.foundation]) {
    assert.ok(s.percent === null || Number.isFinite(s.percent), `${s.key}: phần trăm là ${s.percent}`);
  }
});

test('kết quả CŨ (12 câu, không nhãn bậc) đọc được nhưng không bị suy ra bậc', () => {
  const legacy = { score: 58, level: 'intermediate', levelLabel: 'Intermediate', skillStats: { grammar: { correct: 3, total: 5 }, vocabulary: { correct: 2, total: 4 }, reading: { correct: 2, total: 3 } } };
  const p = buildSkillProfile(legacy);
  assert.equal(p.legacy, true);
  assert.equal(p.cefr, null, 'kết quả cũ không có nhãn bậc — không được bịa ra');
  assert.equal(p.preA1, false);
  assert.equal(p.foundation[0].measured, true);
  assert.equal(p.foundation[0].cefr, null, 'kết quả cũ không có bậc theo kỹ năng');
});

test('kết quả thiếu skillStats hẳn cũng không làm vỡ hồ sơ', () => {
  const p = buildSkillProfile({ version: 2, cefr: null, preA1: true });
  assert.equal(p.preA1, true);
  assert.equal(p.measuredCount, 0);
  assert.ok(p.cefrSkills.every((s) => !s.measured && s.percent === null));
  assert.ok(p.foundation.every((s) => !s.measured));
});
