// File: src/utils/placementAdaptive.js
// BỘ MÁY TEST ĐẦU VÀO THÍCH ỨNG (việc 4.1) — thuần tính toán, không React, có test.
//
// CÁI SAI CỦA BẢN CŨ, và cũng là lý do file này tồn tại:
// bản cũ suy trình độ từ PHẦN TRĂM ĐÚNG (`score >= LEVELS[].min`). Với bài
// thích ứng thì cách đó hỏng hẳn — bài thích ứng được thiết kế để LEO ĐẾN KHI
// SAI, nên ai cũng hội tụ về quanh 50–60% đúng. Người trình độ C1 leo lên tới
// C1 rồi sai vài câu sẽ ra ~55% → bị xếp "intermediate". Mà `level` không phải
// thứ trang trí: nó chạy thẳng vào roadmapLevelFor() → pickNextMilestone() và
// quyết định người học được đưa tới chặng nào trong 617 chặng.
//
// Nên ở đây: TRÌNH ĐỘ LẤY TỪ NẤC THANG, không lấy từ phần trăm.
//   cefr = bậc CAO NHẤT mà người học VƯỢT QUA được vòng câu hỏi của bậc đó.
// Phần trăm vẫn tính, nhưng chỉ được hiển thị kèm nhãn "% câu đúng", không bao
// giờ được dùng để suy ra bậc.
import { placementBank } from '../data/placementBank.js';
import { placementLevelFor, levelMeta, CEFR_LABEL } from './placement.js';

export const CEFR_LADDER = ['A1', 'A2', 'B1', 'B2', 'C1'];
export const START_CEFR = 'A2';
export const SKILLS = ['grammar', 'vocabulary', 'reading'];

// Mỗi vòng: 3 câu × 3 kỹ năng = 9 câu, qua vòng khi đúng ≥ 2/3 (tức 6/9).
//
// TRƯỚC ĐÂY LÀ 2 CÂU/KỸ NĂNG (6 câu/vòng) VÀ ĐÓ LÀ QUÁ MỎNG ĐỂ XẾP BẬC.
// Với 6 câu và mốc 4/6, đúng MỘT câu lỡ tay là lật cả một bậc — mà `level` chạy
// thẳng vào `pickNextMilestone()` của 710 chặng. Chính file này đã ghi "chỉ 2
// câu/bậc/kỹ năng nên con số này là SƠ BỘ"; nay ngân hàng có 6 câu/kỹ năng/bậc
// nên hỏi 3 câu được, và bậc quyết định còn được hỏi thêm một VÒNG XÁC NHẬN
// bằng 3 câu chưa dùng (xem `daXacNhan` bên dưới).
export const PER_SKILL_PER_ROUND = 3;
export const ROUND_SIZE = SKILLS.length * PER_SKILL_PER_ROUND;
export const PASS_RATIO = 2 / 3;

// GIỚI HẠN THỜI GIAN MỖI CÂU (giây).
//
// Không phải để tạo áp lực, mà để con số đo được có nghĩa: bài đầu vào KHÔNG
// giới hạn thời gian thì người học tra từ điển/hỏi máy được, và bậc đo ra là bậc
// của cái từ điển chứ không phải của người học — rồi họ bị thả vào chặng quá sức
// và bỏ học. Đọc hiểu được nhiều thời gian hơn vì phải đọc cả đoạn.
//
// Hết giờ = KHÔNG trả lời, và không trả lời thì tính SAI (xem `answerCurrent`).
export const GIAY_MOI_CAU = { grammar: 45, vocabulary: 45, reading: 75 };
export function gioiHanGiay(question) {
  return GIAY_MOI_CAU[question?.skill] ?? 60;
}

// SỐ VÒNG THẬT SỰ ĐẠT ĐƯỢC, không phải số bậc trên thang.
//
// Đã suýt in sai: đặt MAX_ROUNDS = CEFR_LADDER.length = 5 thì giao diện hiện
// "Vòng 1/5" và "tổng cộng 12–30 câu" — mà xuất phát từ A2 và không bao giờ hỏi
// lại một bậc, đường dài nhất chỉ là A2→B1→B2→C1 = 4 vòng = 24 câu. Vòng thứ 5
// KHÔNG TỒN TẠI. Một mẫu số không với tới được cũng là một con số bịa, đúng loại
// vừa mất hai đợt để dọn khỏi 235 tiêu đề.
//
// Tính theo điểm xuất phát vì createSession cho phép đổi `start`: từ A2 là 4
// vòng, nhưng từ A1 (leo hết thang) hoặc từ C1 (rơi hết thang) là 5.
export function roundBounds(start = START_CEFR) {
  const i = CEFR_LADDER.indexOf(start);
  if (i < 0) return roundBounds(START_CEFR);
  const leoHet = CEFR_LADDER.length - i;   // qua liên tục, lên tới đỉnh
  const roiHet = i + 1;                    // trượt liên tục, xuống tới đáy
  return {
    // Đứng ở hai đầu thang thì trượt/qua một cái là hết đường → dừng sau 1 vòng.
    min: (i === 0 || i === CEFR_LADDER.length - 1) ? 1 : 2,
    max: Math.max(leoHet, roiHet),
  };
}

// +1 vì bài nào CHỐT được một bậc cũng chạy thêm VÒNG XÁC NHẬN ở bậc đó.
// Cận dưới KHÔNG +1: người không qua nổi bậc nào thì không có bậc để xác nhận,
// và đó chính là bài ngắn nhất (2 vòng). Một con số duy nhất ở đây, giao diện
// và bài kiểm đều đọc từ đây — dự án này đã ba lần trả giá cho "ba con số trong
// một tài liệu".
export const MAX_ROUNDS = roundBounds(START_CEFR).max + 1;
export const MIN_ROUNDS = roundBounds(START_CEFR).min;

// Ngưỡng qua vòng tính theo SỐ CÂU THẬT SỰ ĐƯỢC HỎI, không phải theo ROUND_SIZE.
// Nếu một bậc trong ngân hàng mỏng hơn dự tính thì vòng đó ngắn hơn, và ngưỡng
// phải co theo — nếu không người học bị đánh trượt vì ngân hàng thiếu câu.
export function passMark(asked) {
  return Math.ceil(Math.max(1, asked) * PASS_RATIO);
}

export function shuffle(list, rand = Math.random) {
  const out = [...(list || [])];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Bốc câu cho một vòng: lấy đều mỗi kỹ năng, xáo trộn trong từng nhóm để hai
// người cùng bậc không gặp y hệt một đề.
//
// `boQuaId` để VÒNG XÁC NHẬN không hỏi lại đúng câu vừa hỏi — hỏi lại thì nó
// không xác nhận thêm gì, chỉ đo trí nhớ ngắn hạn.
export function pickRound(bank, cefr, rand = Math.random, boQuaId = []) {
  const daHoi = new Set(boQuaId);
  const out = [];
  for (const skill of SKILLS) {
    const pool = (bank || []).filter((q) => q.cefr === cefr && q.skill === skill && !daHoi.has(q.id));
    out.push(...shuffle(pool, rand).slice(0, PER_SKILL_PER_ROUND));
  }
  return shuffle(out, rand);
}

/**
 * Bậc nào đã VƯỢT QUA, tính trên TOÀN BỘ câu đã hỏi ở bậc đó.
 *
 * Suy ra từ `rounds` chứ không cộng dồn dần vào một mảng: một bậc có thể được
 * hỏi HAI vòng (vòng thường + vòng xác nhận), và khi đó câu trả lời đúng phải là
 * "đúng bao nhiêu trên TỔNG số câu của bậc ấy", không phải "vòng nào cũng phải
 * qua" (khắt khe quá) hay "qua một vòng là xong" (dễ quá). Gộp lại thì bậc quyết
 * định được chấm trên 18 câu thay vì 9.
 */
export function bacDaQua(rounds) {
  const gop = new Map();
  for (const r of rounds || []) {
    const o = gop.get(r.cefr) || { asked: 0, correct: 0 };
    o.asked += r.asked;
    o.correct += r.correct;
    gop.set(r.cefr, o);
  }
  const out = [];
  for (const cefr of CEFR_LADDER) {
    const o = gop.get(cefr);
    if (o && o.correct >= passMark(o.asked)) out.push(cefr);
  }
  return out;
}

export function createSession(bank = placementBank, { rand = Math.random, start = START_CEFR } = {}) {
  const cefr = CEFR_LADDER.includes(start) ? start : START_CEFR;
  const bounds = roundBounds(cefr);
  return {
    bank,
    rand,
    cefr,
    bounds,
    queue: pickRound(bank, cefr, rand),
    asked: [],          // { id, cefr, skill, chosen, correct }
    visited: [cefr],
    cleared: [],        // các bậc đã VƯỢT QUA
    rounds: [],         // { cefr, asked, correct, cleared, xacNhan }
    roundStart: 0,
    daXacNhan: false,   // đã dùng vòng xác nhận chưa (mỗi bài đúng MỘT lần)
    dangXacNhan: false, // vòng đang chạy có phải vòng xác nhận không
    done: false,
  };
}

export function currentQuestion(session) {
  if (!session || session.done) return null;
  return session.queue[0] || null;
}

// Số câu đã trả lời + vị trí trong vòng — dùng cho thanh tiến độ. Không có
// "câu N/tổng" vì tổng số câu CHƯA BIẾT cho tới khi bài kết thúc: hiển thị một
// mẫu số bịa ra là nói dối người học ngay ở màn hình đầu tiên.
export function progressOf(session) {
  const bounds = session?.bounds || roundBounds(START_CEFR);
  if (!session) return { answered: 0, round: 1, inRound: 0, roundSize: ROUND_SIZE, cefr: START_CEFR, maxRounds: bounds.max, minQuestions: ROUND_SIZE * bounds.min, maxQuestions: ROUND_SIZE * bounds.max };
  const inRound = session.asked.length - session.roundStart;
  return {
    answered: session.asked.length,
    round: session.rounds.length + 1,
    inRound,
    roundSize: inRound + session.queue.length,
    cefr: session.cefr,
    // Số vòng/số câu ĐẠT ĐƯỢC THẬT — giao diện chỉ được lấy con số từ đây.
    // +1 vòng vì bài nào chốt được một bậc cũng có VÒNG XÁC NHẬN; đây là con số
    // người học nhìn thấy nên nó phải kể cả vòng đó, không thì bài dài hơn lời
    // hứa in trên màn hình.
    maxRounds: bounds.max + 1,
    minQuestions: ROUND_SIZE * bounds.min,
    maxQuestions: ROUND_SIZE * (bounds.max + 1),
    dangXacNhan: !!session.dangXacNhan,
  };
}

export function answerCurrent(session, choiceIndex) {
  const question = currentQuestion(session);
  if (!question) return session;

  // HẾT GIỜ = KHÔNG CHỌN GÌ = SAI. Phải kiểm null/undefined TRƯỚC khi ép kiểu:
  // `Number(null)` là **0**, nên nếu chỉ viết `Number(choiceIndex) === answer`
  // thì mọi câu bỏ trống có đáp án ở ô đầu sẽ được chấm ĐÚNG — và 38% ngân hàng
  // có đáp án ở ô 0. Người hết giờ toàn bộ bài vẫn có thể được xếp một bậc.
  const coChon = choiceIndex !== null && choiceIndex !== undefined && choiceIndex !== '';
  const asked = [...session.asked, {
    id: question.id,
    cefr: question.cefr,
    skill: question.skill,
    chosen: coChon ? Number(choiceIndex) : null,
    hetGio: !coChon,
    correct: coChon && Number(choiceIndex) === question.answer,
  }];
  const queue = session.queue.slice(1);
  if (queue.length > 0) return { ...session, asked, queue };

  // --- hết một vòng: chấm vòng rồi quyết định đi lên hay đi xuống -----------
  const items = asked.slice(session.roundStart);
  const correct = items.filter((a) => a.correct).length;
  const cleared = correct >= passMark(items.length);
  const rounds = [...session.rounds, { cefr: session.cefr, asked: items.length, correct, cleared, xacNhan: !!session.dangXacNhan }];
  const clearedLevels = bacDaQua(rounds);

  const step = cleared ? 1 : -1;
  const nextCefr = CEFR_LADDER[CEFR_LADDER.indexOf(session.cefr) + step];

  // Dừng khi: hết thang (đã lên đỉnh hoặc xuống đáy), HOẶC bậc kế tiếp đã hỏi
  // rồi (qua bậc dưới rồi trượt bậc trên = đã kẹp đúng chỗ), HOẶC hết số vòng.
  // Mốc ở đây là số vòng LEO THANG (không kể vòng xác nhận) — `session.bounds`
  // do `roundBounds` sinh ra, còn `MAX_ROUNDS` đã cộng thêm vòng xác nhận nên
  // KHÔNG được dùng làm giá trị dự phòng ở chỗ này.
  const tranVongLeo = session.bounds?.max ?? roundBounds(START_CEFR).max;
  const stop = !nextCefr || session.visited.includes(nextCefr) || rounds.length >= tranVongLeo;

  if (stop) {
    // ── VÒNG XÁC NHẬN ─────────────────────────────────────────────────────
    // Đúng chỗ bài test sắp CHỐT một bậc thì hỏi thêm một vòng nữa ở chính bậc
    // đó, bằng những câu CHƯA dùng. Lý do: chỗ dừng của bài thích ứng luôn là
    // chỗ ranh giới, mà ranh giới lại đúng là chỗ 9 câu nói ít nhất — qua 6/9
    // và trượt 5/9 chỉ cách nhau một câu. Sau vòng này bậc quyết định được chấm
    // trên 18 câu (xem `bacDaQua` gộp theo bậc), không phải 9.
    const bacChot = highestCleared(clearedLevels);
    if (bacChot && !session.daXacNhan) {
      const themCau = pickRound(session.bank, bacChot, session.rand, asked.map((a) => a.id));
      if (themCau.length > 0) {
        return {
          ...session,
          asked,
          rounds,
          cleared: clearedLevels,
          cefr: bacChot,
          visited: session.visited.includes(bacChot) ? session.visited : [...session.visited, bacChot],
          queue: themCau,
          roundStart: asked.length,
          daXacNhan: true,
          dangXacNhan: true,
        };
      }
    }
    return { ...session, asked, queue: [], rounds, cleared: clearedLevels, dangXacNhan: false, done: true };
  }
  return {
    ...session,
    asked,
    rounds,
    cleared: clearedLevels,
    cefr: nextCefr,
    visited: [...session.visited, nextCefr],
    queue: pickRound(session.bank, nextCefr, session.rand, asked.map((a) => a.id)),
    roundStart: asked.length,
    dangXacNhan: false,
  };
}

// Bậc cao nhất VƯỢT QUA được. Không vượt qua bậc nào (kể cả A1) → chưa tới A1.
export function highestCleared(cleared) {
  let best = null;
  for (const level of cleared || []) {
    if (CEFR_LADDER.indexOf(level) > CEFR_LADDER.indexOf(best)) best = level;
  }
  return best;
}

// Hồ sơ theo kỹ năng: đếm đúng/tổng, và bậc cao nhất mà kỹ năng đó làm ĐÚNG
// HẾT các câu được hỏi ở bậc ấy. Chỉ 2 câu/bậc/kỹ năng nên con số này là SƠ BỘ
// — giao diện phải ghi rõ như vậy, đừng in ra như một kết luận.
function skillBreakdown(asked) {
  const stats = {};
  for (const skill of SKILLS) stats[skill] = { correct: 0, total: 0 };
  const perLevel = {};
  for (const a of asked || []) {
    stats[a.skill] ||= { correct: 0, total: 0 };
    stats[a.skill].total += 1;
    if (a.correct) stats[a.skill].correct += 1;
    const key = `${a.skill}|${a.cefr}`;
    perLevel[key] ||= { correct: 0, total: 0 };
    perLevel[key].total += 1;
    if (a.correct) perLevel[key].correct += 1;
  }
  const skillCefr = {};
  for (const skill of Object.keys(stats)) {
    let best = null;
    for (const level of CEFR_LADDER) {
      const cell = perLevel[`${skill}|${level}`];
      if (cell && cell.total > 0 && cell.correct === cell.total) best = level;
    }
    skillCefr[skill] = best;
  }
  return { skillStats: stats, skillCefr };
}

export function placementResultFrom(session, now = new Date()) {
  const asked = session?.asked || [];
  const correct = asked.filter((a) => a.correct).length;
  // Suy từ `rounds` chứ không đọc `session.cleared`: bậc được hỏi hai vòng phải
  // được chấm trên TỔNG số câu của bậc đó — xem `bacDaQua`.
  const cefr = highestCleared(bacDaQua(session?.rounds));
  const { skillStats, skillCefr } = skillBreakdown(asked);
  const levelId = placementLevelFor(cefr);
  const meta = levelMeta(levelId);

  // Mạnh/yếu tính trên số câu THẬT SỰ được hỏi cho kỹ năng đó. Bài thích ứng có
  // thể để một kỹ năng ở total = 0 nếu ngân hàng bậc đó thiếu câu — chia cho 0
  // sẽ ra NaN và NaN thì im lặng trôi thẳng ra giao diện.
  const ratio = (s) => (s && s.total > 0 ? s.correct / s.total : null);
  const strengths = Object.entries(skillStats).filter(([, s]) => ratio(s) !== null && ratio(s) >= PASS_RATIO).map(([k]) => k);
  const focus = Object.entries(skillStats).filter(([, s]) => ratio(s) !== null && ratio(s) < PASS_RATIO).map(([k]) => k);

  return {
    version: 2,
    // Ba trường dưới đây là hợp đồng với phần còn lại của app (WelcomePage →
    // roadmapLevelFor → pickNextMilestone, LearningReport, chứng nhận).
    // `level` LẤY TỪ BẬC CEFR ĐẠT ĐƯỢC, không lấy từ `score`.
    level: levelId,
    levelLabel: cefr ? CEFR_LABEL[cefr] || cefr : 'Chưa qua vòng A1',
    next: cefr ? meta.next : 'Cụm A0 → A1',
    strengths,
    focus,
    // Không vượt qua nổi vòng A1 → chưa tới A1. KHÔNG đặt cefr thành 'A1' cho
    // đẹp: đó là điều duy nhất bài test này biết chắc về người đó.
    cefr: cefr || null,
    preA1: !cefr,
    correct,
    total: asked.length,
    // Còn tính, nhưng chỉ là "% câu đúng của bài thích ứng" — KHÔNG dùng để suy
    // ra bậc. Giao diện phải gắn nhãn đúng như vậy.
    score: asked.length ? Math.round((correct / asked.length) * 100) : 0,
    rounds: session?.rounds || [],
    // Số câu HẾT GIỜ — báo ra để người học biết bậc thấp có thể là do chậm chứ
    // không hẳn do không biết. Giấu con số này đi là để họ tự trách nhầm chỗ.
    hetGio: asked.filter((a) => a.hetGio).length,
    skillStats,
    skillCefr,
    measuredSkills: [...SKILLS],
    completedAt: (now instanceof Date ? now : new Date()).toISOString(),
  };
}
