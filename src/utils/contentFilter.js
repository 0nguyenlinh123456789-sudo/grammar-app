// File: src/utils/contentFilter.js
// LỚP LỌC NỘI DUNG RUNTIME — TẠM THỜI (băng gạc, không thay thế việc dọn dữ liệu).
//
// Bối cảnh: các file src/data/oxfordPreIntData*.js chứa ~2.600 item bài tập rác
// do các nhánh fallback của generate_preint_data*.js sinh ra (kiểm kê ngày
// 2026-08-12 — xem AUDIT_SU_PHAM.md và KE_HOACH_TRIEN_KHAI.md, hạng mục #3).
// Lớp lọc này chặn không cho người học nhìn thấy item rác cho tới khi dữ liệu
// được sinh lại sạch; khi đó có thể gỡ lớp lọc.
//
// NGUYÊN TẮC: luật lọc CỐ Ý HẸP — chỉ khớp đúng các mẫu máy-sinh đã kiểm kê,
// tuyệt đối không dùng luật rộng (kiểu "chứa tiếng Việt là loại"), vì dữ liệu
// do người soạn có nhiều item hợp lệ trông "lạ": particle kèm chú thích
// "up (thức dậy)", đáp án nghĩa tiếng Việt, từ có dấu như "cybercafé"...

// Mẫu rác đã kiểm kê — mỗi luật kèm số item khớp tại thời điểm 2026-08-12:
// - drag-tu:               "Từ" trần (807 item một phần, unit 1–50)
// - drag-lien-quan:        "liên quan tới X" (1.200 item, unit 51–100)
// - drag-frequently-use:   "frequently use X" (phần còn lại của 807, unit 1–50)
// - quiz-fake-collocation: đề bài 'Hoàn thành cụm từ: "frequently use _____"' (392 câu)
// - quiz-wrong-word:       distractor là chuỗi literal "wrong_word_1/2/3" (1.000 câu, unit 51–100)
// - typing-template:       đáp án "X synonym" / đề bài "…đồng nghĩa của X" (~198 câu)
const DRAG_WORD_RULES = [
  ['drag-tu', /^Từ$/],
  ['drag-lien-quan', /^liên quan tới /i],
  ['drag-frequently-use', /^frequently use /i],
];
const QUIZ_QUESTION_RULES = [
  ['quiz-fake-collocation', /frequently use _____/i],
];
const QUIZ_OPTION_RULE = ['quiz-wrong-word', /^wrong_word_\d+$/];
const TYPING_RULES = [
  ['typing-x-synonym', (t) => / synonym$/i.test(t.a || '')],
  ['typing-dong-nghia-template', (t) => /đồng nghĩa của/i.test(t.q || '')],
  // Phát hiện (f2) 2026-08-12: 393 câu "Gõ cụm từ tiếng Anh có nghĩa là:
  // 'cảm thấy rất once in a blue moon'" — "nghĩa tiếng Việt" là template ghép
  // với TỪ ANH CHƯA DỊCH, đáp án là collocation máy sai văn phạm ("use a
  // active learning"). Chỉ khớp khi phần sau template KHÔNG có dấu tiếng Việt
  // — 7 câu dịch tay thật ("cảm..." không tồn tại; "đạt tiến bộ vượt bậc"...)
  // đều có dấu nên không bị đụng.
  ['typing-vi-template-meaning', (t) => {
    const m = /có nghĩa là: "(?:cảm thấy rất|sử dụng một|nỗ lực thực hiện) ([^"]+)"/.exec(t.q || '');
    return !!m && !/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(m[1]);
  }],
];

// ---- Rác trong LUYỆN NÓI (PracticeTab) — trường trans ----
// Generator không dịch câu speaking mà đổ placeholder/công thức vào trans:
// Advanced: "[Tạm dịch] Câu ví dụ cho X" (100 câu); Pre-Int: "Hãy phát âm và
// luyện nói câu: ..." (100 câu unit 1–50) và "Đọc to câu này." (50 câu unit
// 51–100). Kiểm kê (e) 2026-08-12: 250 câu. Chỉ ẨN trường trans — GIỮ NGUYÊN
// câu tiếng Anh để bài luyện nói vẫn chạy đủ (chỉ đạo chủ dự án).
// Trans của Elementary (oxfordData*.js) là bản dịch người soạn — không khớp
// các mẫu này nên không bị đụng.
const SPEAKING_TRANS_RULES = [
  ['speaking-trans-tam-dich', /^\[Tạm dịch\]/],
  ['speaking-trans-cong-thuc-phat-am', /^Hãy phát âm và luyện nói câu:/],
  ['speaking-trans-doc-to', /^Đọc to câu này\.?$/],
];

// Hint vi của dragDrop nhóm "họ từ": "biến thể từ loại của X" — không phải
// bản dịch. Đa số nằm trên item đã bị DRAG_WORD_RULES loại cả item; luật này
// vét nốt hint rác trên item sống sót (chỉ xóa trường vi, giữ item).
const DRAG_VI_RULE = ['drag-vi-bien-the', /^biến thể từ loại của /i];

// ---- Rác trong phần LÝ THUYẾT (TheoryTab) ----
// Generator còn bịa cả nội dung dạy học: "họ từ" ghép hậu tố mù quáng
// ("washbasinful (Tính từ)", "reviseer (Danh từ)") và collocation template sai
// văn phạm ("have a asthma", "make a engineer"). Kiểm kê 2026-08-12: 287 mục
// họ-từ ngụy tạo + 322 mục collocation template + 213 mục filler rỗng, trên cả
// 3 sách. Luật dưới đây khớp ĐÚNG công thức chuỗi của generator nên không thể
// trúng nội dung người soạn.
const DISCOVERY_VALUE_RULES = [
  ['theory-fake-word-family', /\S+(er|ful|ly) \((Danh từ|Tính từ|Trạng từ)\)/],
  ['theory-empty-collocation-filler', /^Cụm từ liên quan đến /],
  ['theory-template-collocation', /^Ví dụ: (have a .+, make a .+, good .+|very .+, extremely .+|very .+, completely .+|.+ quickly, always .+)$/],
];
const PRACTICAL_VALUE_RULE = ['theory-template-practical', /Cụm từ: "(frequently use |use the word |study the word |understand )/];

// ---- Rác trong BÀI TẬP TEXTBOOK (ExercisesTab) ----
// Fallback của generator khi câu ví dụ không chứa từ cần điền: đề bài trở thành
// câu vô nghĩa. Kiểm kê 2026-08-12: ~437 câu trên cả 3 sách (Elementary 259,
// Advanced 147, Pre-Int 31).
const TEXTBOOK_TEXT_RULES = [
  ['textbook-blank-filler', /^The correct word is \[blank\]\.?$/],
  ['textbook-important-filler', /^This \[blank\] is very important\.?$/],
];
// error_correction fallback: original bịa "I really like X." trong khi câu đúng
// là một câu hoàn toàn khác — chữ ký máy, không thể là bài người soạn.
// Lưu ý (d1): X có thể là CỤM nhiều từ ("I really like overturns a verdict.")
// nên phải dùng .+ — bản đầu dùng \S+ đã bỏ sót 56/90 câu.
function isFakeErrorCorrection(q) {
  return /^I really like .+$/.test(q.original || '') && !/really like/.test(q.correct || '');
}

// Các collocation máy-sinh gắn trên từng từ coreVocab — dựng lại đúng chuỗi
// generator tạo ra từ chính từ đó rồi so khớp tuyệt đối (không false positive:
// "have a friendly chat" của người soạn khác "have a chat" máy ghép).
function machineCollocationsOf(word) {
  const w = (word || '').toLowerCase();
  return new Set([
    `use the word ${w}`, `frequently use ${w}`, `study the word ${w}`, `understand ${w}`,
    `use ${w}`, `about ${w}`, `have a ${w}`, `make a ${w}`, `good ${w}`,
    `very ${w}`, `extremely ${w}`, `completely ${w}`, `always ${w}`,
    `${w} quickly`, `${w} something`, `try to ${w}`, `feel very ${w}`, `use a ${w}`,
  ]);
}

// Unit còn dưới ngần này item luyện tập hợp lệ thì coi như không đủ để làm bài
// và bị ẩn kèm thông báo "đang cập nhật nội dung". Theo kiểm kê hiện tại không
// unit nào rơi xuống dưới ngưỡng — đây là lưới an toàn.
export const MIN_PLAYABLE_ITEMS = 12;

const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;

// Log CHỈ ở môi trường dev — để đối chiếu với đợt dọn dữ liệu (#3), xác nhận
// không lọc nhầm item tốt. Người học không bao giờ thấy log này.
function logDrop(unitId, kind, detail, rule) {
  if (isDev) console.info(`[contentFilter] ${unitId} · ${kind} · loại bỏ "${detail}" · luật: ${rule}`);
}

function firstMatch(rules, value) {
  for (const [name, re] of rules) if (re.test(value)) return name;
  return null;
}

export function sanitizeUnit(unit) {
  if (!unit) return unit;
  const out = { ...unit };

  if (out.dragDrop?.items) {
    let dragChanged = false;
    const kept = out.dragDrop.items.filter((it) => {
      const rule = firstMatch(DRAG_WORD_RULES, it.word || '');
      if (rule) { logDrop(unit.id, 'dragDrop', it.word, rule); dragChanged = true; }
      return !rule;
    }).map((it) => {
      if (!DRAG_VI_RULE[1].test(it.vi || '')) return it;
      logDrop(unit.id, 'dragDrop-vi', it.vi, DRAG_VI_RULE[0]);
      dragChanged = true;
      const rest = { ...it };
      delete rest.vi;
      return rest;
    });
    if (dragChanged) out.dragDrop = { ...out.dragDrop, items: kept };
  }

  // unit.words: FlashcardTab render word/vi/phonetic/example từ đây (đều
  // curated sạch). Trường collocations đi kèm chứa template máy ("frequently
  // use X") và hiện KHÔNG component nào render — lọc phòng thủ (e3) để nếu
  // sau này có code đọc tới thì rác đã bị gỡ sẵn. Dùng đúng bộ so khớp
  // tuyệt-đối machineCollocationsOf nên không thể trúng collocation người soạn.
  if (Array.isArray(out.words)) {
    let wChanged = false;
    const words = out.words.map((w) => {
      if (!Array.isArray(w.collocations) || w.collocations.length === 0) return w;
      const machine = machineCollocationsOf(w.word || w.en);
      const kept = w.collocations.filter((c) => {
        const bad = machine.has((c || '').toLowerCase());
        if (bad) { logDrop(unit.id, 'words-collocation', c, 'words-machine-collocation'); wChanged = true; }
        return !bad;
      });
      return kept.length === w.collocations.length ? w : { ...w, collocations: kept };
    });
    if (wChanged) out.words = words;
  }

  if (Array.isArray(out.speaking)) {
    let spChanged = false;
    const speaking = out.speaking.map((s) => {
      const rule = firstMatch(SPEAKING_TRANS_RULES, s.trans || '');
      if (!rule) return s;
      logDrop(unit.id, 'speaking-trans', s.trans, rule);
      spChanged = true;
      const rest = { ...s };
      delete rest.trans;
      return rest;
    });
    if (spChanged) out.speaking = speaking;
  }

  if (Array.isArray(out.quiz)) {
    const kept = out.quiz.filter((q) => {
      let rule = firstMatch(QUIZ_QUESTION_RULES, q.q || '');
      if (!rule && (q.options || []).some((o) => QUIZ_OPTION_RULE[1].test(o))) rule = QUIZ_OPTION_RULE[0];
      if (rule) logDrop(unit.id, 'quiz', q.q, rule);
      return !rule;
    });
    if (kept.length !== out.quiz.length) out.quiz = kept;
  }

  if (Array.isArray(out.typingGame)) {
    const kept = out.typingGame.filter((t) => {
      for (const [name, test] of TYPING_RULES) {
        if (test(t)) { logDrop(unit.id, 'typing', t.a || t.q, name); return false; }
      }
      return true;
    });
    if (kept.length !== out.typingGame.length) out.typingGame = kept;
  }

  if (Array.isArray(out.textbookExercises)) {
    let tbChanged = false;
    const blocks = out.textbookExercises.map((ex) => {
      const questions = (ex.questions || []).filter((q) => {
        let rule = TEXTBOOK_TEXT_RULES.find(([, re]) => re.test(q.text || ''))?.[0];
        if (!rule && ex.type === 'error_correction' && isFakeErrorCorrection(q)) rule = 'textbook-fake-error-correction';
        if (rule) { logDrop(unit.id, 'textbook', q.text || q.original, rule); tbChanged = true; }
        return !rule;
      });
      return questions.length === (ex.questions || []).length ? ex : { ...ex, questions };
    }).filter((ex) => (ex.questions || []).length > 0);
    if (tbChanged || blocks.length !== out.textbookExercises.length) out.textbookExercises = blocks;
  }

  if (out.theory) out.theory = sanitizeTheory(unit.id, out.theory);

  const textbookQuestions = (out.textbookExercises || [])
    .reduce((sum, ex) => sum + (ex.questions?.length || 0), 0);
  const playableItems =
    (out.quiz?.length || 0) + (out.typingGame?.length || 0)
    + (out.dragDrop?.items?.length || 0) + textbookQuestions;
  if (playableItems < MIN_PLAYABLE_ITEMS) {
    out.contentUpdating = true;
    if (isDev) console.warn(`[contentFilter] ${unit.id} bị ẩn: chỉ còn ${playableItems} item hợp lệ (< ${MIN_PLAYABLE_ITEMS})`);
  }

  return out;
}

function sanitizeSections(unitId, sections, valueRules) {
  let changed = false;
  const kept = (sections || []).map((section) => {
    const details = (section.details || []).filter((d) => {
      const rule = valueRules.find(([, re]) => re.test(d.value || ''));
      if (rule) { logDrop(unitId, 'theory', d.value, rule[0]); changed = true; }
      return !rule;
    });
    return details.length === (section.details || []).length ? section : { ...section, details };
  }).filter((section) => (section.details || []).length > 0);
  if ((sections || []).length !== kept.length) changed = true;
  return { changed, sections: kept };
}

function sanitizeTheory(unitId, theory) {
  let out = theory;

  const dc = sanitizeSections(unitId, theory.discoveryCorner, DISCOVERY_VALUE_RULES);
  if (dc.changed) out = { ...out, discoveryCorner: dc.sections };

  const pu = sanitizeSections(unitId, out.practicalUsage, [PRACTICAL_VALUE_RULE]);
  if (pu.changed) out = { ...out, practicalUsage: pu.sections };

  if (Array.isArray(out.coreVocab)) {
    let cvChanged = false;
    const coreVocab = out.coreVocab.map((w) => {
      if (!Array.isArray(w.collocations) || w.collocations.length === 0) return w;
      const machine = machineCollocationsOf(w.word || w.en);
      const kept = w.collocations.filter((c) => {
        const bad = machine.has((c || '').toLowerCase());
        if (bad) { logDrop(unitId, 'theory-collocation', c, 'coreVocab-machine-collocation'); cvChanged = true; }
        return !bad;
      });
      return kept.length === w.collocations.length ? w : { ...w, collocations: kept };
    });
    if (cvChanged) out = { ...out, coreVocab };
  }

  return out;
}

export function sanitizeBook(units) {
  return (units || []).map(sanitizeUnit);
}

// ---- Rác trong KHO TỪ VỰNG (vocabVstepData) — cặp example/viExample máy ----
// Phát hiện (e1) 2026-08-12: trong vocabFinalData/vocabMoreData/vocabExtendedData
// có 553 từ mà example là chuỗi keyword không thành câu ("Bouncing white carrot
// bunny") và viExample KHÔNG PHẢI bản dịch mà là cụm tiếng Anh trái nghĩa/liên
// quan ("Orderly rational peace" cho "hysteria"). Cặp này hiển thị ở Flashcard/
// SRS/Writing/Games như "câu ví dụ + bản dịch", và đổ vào buildComprehension
// làm đáp án "đúng" của bài nghe/đọc hiểu bị sai hẳn.
//
// Chữ ký hẹp đã kiểm chứng trên toàn kho (22.204 mục luyện tập / 6.618 từ duy
// nhất — xem AUDIT_SU_PHAM.md §9.4b): viExample không chứa ký tự
// tiếng Việt có dấu VÀ không kết thúc bằng dấu câu (rác máy là cụm keyword trần).
// Đúng 553 khớp; 3 câu tiếng Việt không dấu hợp lệ ("Ba con chim.",
// "Con chim bay cao.", "Ronaldo ghi hat-trick.") thoát nhờ dấu chấm cuối câu.
// Chỉ xóa CẶP example/viExample — giữ nguyên từ (en/vi/ipa là curated sạch).
const VIET_DIACRITIC = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
const ENDS_SENTENCE = /[.!?…]\s*$/;
export function isMachineExamplePair(w) {
  const viEx = w?.viExample || '';
  return viEx !== '' && !VIET_DIACRITIC.test(viEx) && !ENDS_SENTENCE.test(viEx);
}

export function sanitizeVocabTopics(topics) {
  return (topics || []).map((t) => {
    if (!Array.isArray(t.words)) return t;
    let changed = false;
    const words = t.words.map((w) => {
      if (!isMachineExamplePair(w)) return w;
      logDrop(t.id, 'vocab-example-pair', `${w.en}: "${w.viExample}"`, 'vocab-vi-example-english');
      changed = true;
      const rest = { ...w };
      delete rest.example;
      delete rest.viExample;
      return rest;
    });
    return changed ? { ...t, words } : t;
  });
}
