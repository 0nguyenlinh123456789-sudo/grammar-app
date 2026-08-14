// File: src/utils/mastery.js
// GATE HOÀN THÀNH BẰNG ĐỘ CHÍNH XÁC (hạng mục #1).
//
// Trước đây "hoàn thành" chỉ có nghĩa là ĐI HẾT bài: trả lời sai sạch vẫn được
// đánh dấu ✓, vẫn +XP, vẫn tính vào % lộ trình và chứng nhận. Module này là
// phần tính toán thuần (không React, có test) để mọi màn hình dùng chung một
// định nghĩa "đạt".
//
// HAI ĐƯỜNG ỐNG PHẦN THƯỞNG (QĐ2 — chủ dự án chốt):
//   Đường 1 — ĐỀU ĐẶN (streak, mục tiêu ngày): tính khi LÀM XONG MỘT PHIÊN,
//     bất kể đúng sai. Đi học là được ghi nhận.
//   Đường 2 — THÀNH TÍCH (XP thưởng, milestone, danh hiệu, chứng nhận): chỉ
//     khi đạt ngưỡng độ chính xác.
// Làm lại không giới hạn, không phạt, không cooldown.

export const MASTERY_STORAGE_KEY = 'milestoneScoresV1';

export const PASS_THRESHOLD = 0.8;
// Bộ đề toàn trắc nghiệm thì đoán mò cũng trúng 25% → nâng ngưỡng.
export const PASS_THRESHOLD_MCQ_HEAVY = 0.85;
export const MCQ_HEAVY_RATIO = 0.7;

// Ngưỡng tính TỪ CHÍNH BỘ CÂU NGƯỜI HỌC VỪA LÀM, không phải từ unit bao quanh
// — để con số luôn khớp với thứ họ thật sự trả lời.
export function thresholdFor(questionTypes) {
  const list = Array.isArray(questionTypes) ? questionTypes : [];
  if (list.length === 0) return PASS_THRESHOLD;
  const mcq = list.filter((t) => t === 'mcq').length;
  return mcq / list.length > MCQ_HEAVY_RATIO ? PASS_THRESHOLD_MCQ_HEAVY : PASS_THRESHOLD;
}

// ---- Phiên làm bài ----------------------------------------------------------
// Ghi nhận LẦN TRẢ LỜI ĐẦU TIÊN của từng câu. Người học bấm lại câu vừa sai
// không ghi đè kết quả — nếu không thì "đạt 80%" chỉ có nghĩa là "chịu khó bấm".

export function createSession() {
  return { answers: new Map() };
}

export function recordAnswer(session, questionId, correct, type = 'other') {
  if (!session || questionId === undefined || questionId === null) return session;
  if (session.answers.has(questionId)) return session; // lần đầu là lần tính
  session.answers.set(questionId, { correct: !!correct, type });
  return session;
}

export function sessionEvidence(session) {
  const entries = session ? [...session.answers.values()] : [];
  const total = entries.length;
  const correct = entries.filter((e) => e.correct).length;
  return buildEvidence(correct, total, entries.map((e) => e.type));
}

// Bằng chứng gọn để truyền cho completeMilestone và lưu xuống máy.
export function buildEvidence(correct, total, questionTypes = []) {
  const safeTotal = Math.max(0, Number(total) || 0);
  const safeCorrect = Math.min(Math.max(0, Number(correct) || 0), safeTotal);
  const threshold = thresholdFor(questionTypes);
  const percent = safeTotal > 0 ? safeCorrect / safeTotal : 0;
  return {
    correct: safeCorrect,
    total: safeTotal,
    percent: Math.round(percent * 100),
    threshold: Math.round(threshold * 100),
    passed: safeTotal > 0 && percent >= threshold,
  };
}

export function isPassing(evidence) {
  return !!evidence && evidence.passed === true;
}

// ---- Lưu trữ ----------------------------------------------------------------
// Chỉ ghi bản ĐẠT tốt nhất. Không bao giờ hạ một milestone đã đạt xuống chưa
// đạt: người học đã chứng minh được rồi thì thôi.

export function loadScores(storage) {
  try {
    const raw = storage?.getItem(MASTERY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function saveScore(storage, milestoneId, evidence, nowIso) {
  if (!milestoneId || !isPassing(evidence)) return loadScores(storage);
  const scores = loadScores(storage);
  const prev = scores[milestoneId];
  if (!prev || evidence.percent > prev.percent) {
    scores[milestoneId] = {
      correct: evidence.correct,
      total: evidence.total,
      percent: evidence.percent,
      threshold: evidence.threshold,
      passedAt: nowIso || new Date().toISOString(),
    };
    try { storage?.setItem(MASTERY_STORAGE_KEY, JSON.stringify(scores)); } catch { /* hết chỗ lưu thì bỏ qua */ }
  }
  return scores;
}

// Milestone ĐÃ XÁC MINH = có bản ghi điểm đạt. Milestone hoàn thành từ bản cũ
// (trước hạng mục #1) không có bản ghi → "⏳ chưa xác minh", KHÔNG bị hạ.
export function isVerified(scores, milestoneId) {
  return !!scores?.[milestoneId];
}

// Đếm tách theo LOẠI TUYÊN BỐ (quyết định đã chốt của chủ dự án):
//  - huy hiệu CHUYÊN CẦN + % lộ trình + XP: đếm cả milestone chưa xác minh,
//    vì đó là thưởng cho nỗ lực, không phải tuyên bố năng lực.
//  - chứng nhận / lên bậc / quy đổi band: chỉ đếm milestone đã xác minh.
export function splitCompleted(completedIds, scores) {
  const all = Array.isArray(completedIds) ? completedIds : [];
  const verified = all.filter((id) => isVerified(scores, id));
  return { all, verified, unverified: all.filter((id) => !isVerified(scores, id)) };
}

// ---- Bài xác minh nhanh cho người dùng cũ (#1b) ------------------------------
// 5 câu rút từ chính bộ quiz của unit, đạt ≥4/5 là chuyển sang ✓ xác minh.
export const QUICK_VERIFY_SIZE = 5;
export const QUICK_VERIFY_PASS = 4;

export function pickQuickVerifyQuestions(quiz, size = QUICK_VERIFY_SIZE, pick = Math.random) {
  const list = Array.isArray(quiz) ? [...quiz] : [];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(pick() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list.slice(0, Math.min(size, list.length));
}

export function quickVerifyPassed(correct, total) {
  if (!total) return false;
  // Bộ đề ngắn hơn 5 câu (unit ít câu) thì quy về cùng tỉ lệ 4/5.
  const need = total >= QUICK_VERIFY_SIZE ? QUICK_VERIFY_PASS : Math.ceil(total * (QUICK_VERIFY_PASS / QUICK_VERIFY_SIZE));
  return correct >= need;
}
