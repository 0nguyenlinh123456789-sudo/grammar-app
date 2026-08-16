// File: src/utils/writingScorer.js
// Offline (no API key) heuristic scorer for short English writing.
// Gives learners instant, useful feedback in Vietnamese. If a Gemini API key
// is available the caller can additionally request AI feedback — this offline
// scorer always works so writing practice is never blocked behind a key.

import { recordError } from './errorBank.js';

const COMMON_MISSPELLINGS = {
  recieve: 'receive', teh: 'the', wich: 'which', becuase: 'because',
  definately: 'definitely', seperate: 'separate', occured: 'occurred',
  untill: 'until', alot: 'a lot', thier: 'their', beacuse: 'because',
  wnat: 'want', freind: 'friend', beleive: 'believe', enviroment: 'environment',
};

// Score a single English sentence/short paragraph.
// opts: { targetWords?: string[] } — words the learner is expected to use.
// Returns { score (0-100), level, tips: string[], praises: string[], usedTargets: string[] }
export function scoreWriting(text, opts = {}) {
  const raw = String(text || '').trim();
  const tips = [];
  const praises = [];
  const targetWords = (opts.targetWords || []).map((w) => String(w).toLowerCase());

  if (!raw) {
    return { score: 0, level: 'empty', tips: ['Hãy viết một câu tiếng Anh trước nhé.'], praises: [], usedTargets: [] };
  }

  const words = raw.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = raw.toLowerCase();
  let score = 100;

  // 1. Length — a real sentence needs a few words.
  if (wordCount < 3) {
    score -= 35;
    tips.push('Câu quá ngắn — hãy viết ít nhất một câu hoàn chỉnh (3+ từ, có chủ ngữ + động từ).');
  } else if (wordCount >= 6) {
    praises.push('Độ dài câu tốt 👍');
  }

  // 2. Capitalization of the first letter.
  const firstChar = raw[0];
  if (firstChar && firstChar !== firstChar.toUpperCase()) {
    score -= 12;
    tips.push('Viết hoa chữ cái đầu câu.');
  } else {
    praises.push('Viết hoa đầu câu ✓');
  }

  // 3. Ending punctuation.
  if (!/[.!?]$/.test(raw)) {
    score -= 12;
    tips.push('Kết thúc câu bằng dấu chấm (.), chấm hỏi (?) hoặc chấm than (!).');
  } else {
    praises.push('Có dấu kết câu ✓');
  }

  // 4. Standalone "i" should be capitalized.
  if (/\bi\b/.test(raw)) {
    score -= 8;
    tips.push('Đại từ "I" (tôi) luôn viết hoa.');
  }

  // 5. Common misspellings.
  const misspelled = [];
  for (const w of words) {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (COMMON_MISSPELLINGS[clean]) {
      misspelled.push(`"${clean}" → "${COMMON_MISSPELLINGS[clean]}"`);
    }
  }
  if (misspelled.length) {
    score -= 10 * misspelled.length;
    tips.push('Lỗi chính tả: ' + misspelled.join(', ') + '.');
    // Each misspelling becomes an error-bank card so it resurfaces on the
    // 3/7/14-day ladder ("Học từ lỗi sai" on the roadmap).
    for (const pair of misspelled) {
      const [wrong, right] = pair.split(' → ');
      recordError({ skill: 'writing', prompt: `Viết đúng chính tả từ ${wrong}`, answer: (right || '').replace(/"/g, ''), chosen: (wrong || '').replace(/"/g, '') });
    }
  }

  // 6. Double spaces / repeated words.
  if (/\b(\w+)\s+\1\b/i.test(raw)) {
    score -= 8;
    tips.push('Có từ bị lặp liền nhau — kiểm tra lại.');
  }

  // 7. Target vocabulary usage (if requested).
  let usedTargets = [];
  if (targetWords.length) {
    usedTargets = targetWords.filter((t) => new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(lower));
    if (usedTargets.length === 0) {
      score -= 20;
      tips.push(`Hãy dùng từ mục tiêu trong câu: ${opts.targetWords.slice(0, 5).join(', ')}.`);
    } else {
      praises.push(`Đã dùng từ mục tiêu: ${usedTargets.join(', ')} ✓`);
    }
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  let level;
  if (score >= 85) level = 'excellent';
  else if (score >= 65) level = 'good';
  else if (score >= 40) level = 'fair';
  else level = 'weak';

  // (#0-C7) Bộ chấm offline chỉ soi lỗi bề mặt (chính tả thường gặp, viết hoa,
  // dấu câu, lặp từ) — KHÔNG kiểm tra ngữ pháp. Không được khen "viết đúng
  // chuẩn" vì câu sai ngữ pháp vẫn qua được hết các kiểm tra này.
  if (tips.length === 0) tips.push('Không phát hiện lỗi chính tả hay dấu câu. (Phần này chưa kiểm tra ngữ pháp.)');

  return { score, level, tips, praises, usedTargets };
}

// ─────────────────────────────────────────────────────────────────────────────
// ĐỐI CHIẾU BÀI VIẾT VỚI YÊU CẦU CỦA ĐỀ (việc 3.4) — đường không cần key.
//
// Hàm này CHỈ TRẢ VỀ SỰ THẬT KIỂM ĐƯỢC: bài dài bao nhiêu từ so với khoảng đề
// yêu cầu, và những từ/cụm bắt buộc có mặt hay không. Hết. Không điểm, không
// xếp loại, không nhận xét ngữ pháp.
//
// VÌ SAO KHÔNG CÓ ĐIỂM GIỐNG BÀI MẪU — đây là chỗ dễ sai nhất:
// Bài viết tự do có RẤT NHIỀU đáp án đúng. So bài người học với MỘT bài mẫu rồi
// ra phần trăm giống nhau là bịa ra một con số nghe như đo được. Cách chấm nghe
// chép chính tả (LCS trong dictation.js) KHÔNG áp sang đây được, vì chép chính
// tả chỉ có đúng một đáp án — khác nhau ở đó là sai thật. Ở đây khác nhau là
// bình thường. Bài mẫu để người học ĐỌC và tự đối chiếu, máy không được chấm hộ.
//
// Chỗ này cũng KHÔNG ghi vào ngân hàng lỗi. `scoreWriting` ở trên đã ghi lỗi
// chính tả rồi; ghi thêm lần nữa là một lỗi bị đếm hai lần trên thang 3/7/14
// ngày, làm thẻ ôn quay lại dày gấp đôi thực tế.
export function kiemTraDeViet(text, prompt) {
  const raw = String(text || '').trim();
  const yc = prompt?.yeuCau || {};
  const soTu = raw ? raw.split(/\s+/).filter(Boolean).length : 0;
  const lower = raw.toLowerCase();

  const min = Number(yc.soTuToiThieu) || 0;
  const max = Number(yc.soTuToiDa) || Infinity;
  const doDai = {
    soTu,
    min,
    max: Number.isFinite(max) ? max : null,
    dat: soTu >= min && soTu <= max,
    // Nói rõ thiếu/thừa bao nhiêu — "chưa đạt" suông thì người học phải tự đếm.
    thieu: soTu < min ? min - soTu : 0,
    thua: Number.isFinite(max) && soTu > max ? soTu - max : 0,
  };

  const canCo = (yc.tuBatBuoc || []).map((t) => String(t).toLowerCase());
  const daDung = canCo.filter((t) => lower.includes(t));
  const conThieu = canCo.filter((t) => !lower.includes(t));

  return {
    doDai,
    tuBatBuoc: {
      canCo,
      daDung,
      conThieu,
      dat: conThieu.length === 0,
      moTa: yc.moTaTuBatBuoc || '',
    },
    // Cờ này để giao diện KHÔNG BAO GIỜ hiển thị kết quả trên như một điểm số.
    laSuThatKiemDuoc: true,
    khongKiemDuoc: [
      'ngữ pháp',
      'bài có trả lời đúng trọng tâm đề không',
      'ý có mạch lạc không',
      'từ dùng có tự nhiên không',
    ],
  };
}

// Ask the AI proxy for richer feedback using the learner's own Gemini key.
// The offline scorer above stays available when no key has been added.
export async function scoreWritingWithAI(text, { topicTitle = '' } = {}) {
  const { requestAi } = await import('./aiClient.js');
  const data = await requestAi('writing', { text, topicTitle });
  return data.text;
}
