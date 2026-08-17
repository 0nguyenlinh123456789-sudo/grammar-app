// RÀ BẰNG CÁCH VẼ THẬT — MỌI COMPONENT, VÀ MỘT LỖI SẬP TRANG TÌM RA NHỜ NÓ.
//
// Hai script rà tay (`tests/helpers/__quet.mjs`, `__stale.mjs`) đã tìm ra bốn lỗi
// mà 312 test trước đó không thấy. Bài học đã trả giá hai lần trong ngày: **công
// cụ làm nên phát hiện mà chỉ ở dạng script tay thì lần sau không ai có**. Nên
// mỗi phát hiện của chúng được ghim thành test ở đây.
//
// Bốn lỗi đó, xếp theo mức nặng:
//
//   1. **SẬP TRANG.** `VocabVstepPage` lấy `currentWordIndex` từ tiến độ đã lưu
//      mà KHÔNG kẹp ngưỡng ở lần vẽ đầu (phép kẹp chỉ có trong `useEffect`, chạy
//      sau). Tiến độ lưu ở ô 80 mà chủ đề nay còn 50 từ → `currentWord` undefined
//      → Flashcard nổ ở `.en`. Không phải giả thuyết: đợt dọn nội dung 14/08 đã
//      co kho từ lại thật ("73 chủ đề khai 100 mà có 50"), nên **người gặp lỗi là
//      người học lâu nhất**.
//
//   2. **"0/0 (NaN% chính xác)"** — bảy bộ bài tập ngữ pháp vẽ MÀN KẾT QUẢ cho bài
//      chưa từng có, vì `qIdx >= exercisesLen` với danh sách rỗng là `0 >= 0`.
//      Chốt `if (!curr)` tôi thêm ở đợt trước nằm SAU nhánh đó nên chưa bao giờ
//      chạy cho trường hợp rỗng — **sửa nửa vời còn khó thấy hơn không sửa**, vì
//      mã đọc vào trông như đã được chặn.
//
//   3. `PhraseLearningMode` nói "Đang tải..." cho một trạng thái vĩnh viễn — bản
//      thứ tám của cùng lời nói sai, nằm ở mục từ vựng nên đợt trước không thấy.
//
//   4. `Btn3D` nội suy `${className}` khi prop đó vắng → `class="... undefined"`.
//      Mắt không thấy (Tailwind không có lớp tên "undefined"), nhưng nó làm bộ rà
//      kêu ở MỌI màn có nút, tức bộ rà mất tác dụng đúng ở tín hiệu quan trọng nhất.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import { napComponent, veRa, camGlobalTrinhDuyet } from './helpers/render.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { storage } = camGlobalTrinhDuyet();

const CHU_DE_THU = (soTu) => ({
  id: 'thu-nghiem', title: 'Chủ đề thử nghiệm', level: 'A2-B1',
  words: Array.from({ length: soTu }, (_, i) => ({
    en: `word${i}`, vi: `từ ${i}`, ipa: '/w/', type: '(n)', example: `Example ${i}.`, viExample: `Ví dụ ${i}.`,
  })),
  storyEn: 'A short story.', storyVi: 'Một truyện ngắn.',
});

test('SẬP TRANG: tiến độ đã lưu trỏ quá số từ hiện có vẫn phải vẽ được', async () => {
  const { default: VocabVstepPage } = await napComponent('src/pages/VocabVstepPage.jsx');
  const chuDe = CHU_DE_THU(5);
  for (const chiSoLuu of [0, 4, 80, -3, 999999]) {
    storage.clear();
    storage.setItem('vocabLearningProgressV1', JSON.stringify({
      [chuDe.id]: { currentWordIndex: chiSoLuu, visitedModes: [], studiedWordIndexes: [] },
    }));
    // Không bọc try/catch: nổ thì để nó nổ kèm nguyên văn lỗi — đó là thông tin.
    const html = veRa(h(VocabVstepPage, {
      activeTopic: chuDe, playAudio() {}, completedMilestones: [], completeMilestone() {},
    }));
    assert.ok(html.length > 1000, `tiến độ lưu = ${chiSoLuu}: HTML chỉ ${html.length} ký tự`);
    assert.ok(!/undefined|NaN/.test(html), `tiến độ lưu = ${chiSoLuu}: HTML có "undefined" hoặc "NaN"`);
  }
  storage.clear();
});

test('không bộ bài tập nào vẽ bảng điểm cho bài chưa từng có', async () => {
  const BO = [
    ['ErrorCorrectionExercise', 'exercises'], ['FillBlanksExercise', 'exercises'],
    ['MatchingExercise', 'exercises'], ['QuizEngine', 'exercises'],
    ['SentenceBuilder', 'sentences'], ['TransformationExercise', 'exercises'],
    ['TrueFalseExercise', 'exercises'],
  ];
  for (const [ten, propDuLieu] of BO) {
    const { default: C } = await napComponent(`src/components/grammar/${ten}.jsx`);
    const html = veRa(h(C, { [propDuLieu]: [], setGlobalProgress() {}, onComplete() {} }));
    assert.ok(!/NaN/.test(html), `${ten}: danh sách rỗng mà vẽ ra "NaN" — bảng điểm cho bài không tồn tại`);
    assert.ok(!/Kết Quả/.test(html), `${ten}: danh sách rỗng mà vẫn vẽ màn KẾT QUẢ`);
    assert.match(html, /chưa có/, `${ten}: danh sách rỗng mà không BÁO gì`);
  }
});

test('không component nào nói "đang tải" khi chẳng có gì đang tải', async () => {
  // Quét TOÀN BỘ, không chỉ mấy file đã biết: bản thứ tám của lời nói sai này nằm
  // ở mục từ vựng, ngoài phạm vi đợt rà trước. Chỉ trừ những chỗ THẬT SỰ có việc
  // tải bất đồng bộ.
  const CO_TAI_THAT = new Set([
    'src/components/common/DangMo.jsx',            // lớp chờ chunk lazy — đúng là đang tải
    'src/components/common/MascotLuna.jsx',        // câu thoại của linh vật, dùng cho lúc tải thật
    'src/components/progress/QuickVerifyModal.jsx',// chờ bộ đề dựng xong
    'src/components/oxford/TheoryTab.jsx',         // chờ ảnh/nội dung unit
  ]);
  const loi = [];
  const di = (d) => {
    for (const t of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) {
      const p = `${d}/${t.name}`;
      if (t.isDirectory()) di(p);
      else if (t.name.endsWith('.jsx') && !/ielts/i.test(p) && !CO_TAI_THAT.has(p)) {
        const src = fs.readFileSync(path.join(ROOT, p), 'utf8')
          .split('\n').filter((x) => !/^\s*(\/\/|\*|\/\*)/.test(x)).join('\n');
        if (/[Đđ]ang tải/.test(src)) loi.push(p);
      }
    }
  };
  di('src/components'); di('src/pages');
  assert.deepEqual(loi, [], 'nói "đang tải" cho trạng thái không tải gì:\n  ' + loi.join('\n  '));
});

test('Btn3D không nhét chữ "undefined" vào class', async () => {
  const { default: Btn3D } = await napComponent('src/components/common/Btn3D.jsx');
  const html = veRa(h(Btn3D, { onClick() {} }, 'Bấm'));
  assert.ok(!/undefined/.test(html),
    'class có chữ "undefined" — rác trong DOM, và làm bộ rà kêu ở mọi màn có nút');
});

test('vẽ được TOÀN BỘ component với props tối thiểu — không cái nào nổ', async () => {
  // Đây là cái lưới rộng: nó không kiểm nội dung, chỉ kiểm "lần vẽ đầu không nổ".
  // Danh sách miễn trừ là những component BẮT BUỘC phải có dữ liệu mới vẽ được
  // (chúng luôn được cha truyền đủ), và mỗi cái phải ghi rõ cha nào canh cửa.
  const CAN_DU_LIEU = {
    'src/components/vocab/Flashcard.jsx': 'VocabVstepPage canh: activeTopic.words + kepChiSo',
    'src/components/vocab/SpeakingPractice.jsx': 'VocabVstepPage truyền currentWord đã kẹp',
    'src/components/vocab/WritingPractice.jsx': 'VocabVstepPage truyền currentWord đã kẹp',
    'src/components/progress/QuickVerifyModal.jsx': 'App chỉ mở khi đã dựng được bộ đề',
    'src/components/exam/BandExamPanel.jsx': 'chỉ mở từ thẻ Thi cuối bậc, luôn có đề',
    'src/components/listening/DictationPanel.jsx': 'chỉ mở khi kho bản thu đã nạp',
    // Hai cái dưới đây LÀ Ô HIỂN THỊ MỘT MỤC, không phải một màn: chúng nhận đúng
    // một mục và không có nghĩa gì khi mục đó vắng. Đã ĐO trước khi miễn trừ, chứ
    // không miễn trừ vì test đỏ:
    //   · SketchnoteTheory nhận `section` = `topic.theory[i]`. Đo cả 90 chủ đề ngữ
    //     pháp: **0 chủ đề thiếu `theory`, 0 mục theory rỗng hoặc sai kiểu**. Nên
    //     nhánh `section` vắng không tới được từ GrammarPage.
    //   · FlashcardTab nhận `unit`; cha là VocabOxfordPage, chỉ vẽ sau khi chọn
    //     được unit có thật.
    'src/components/grammar/SketchnoteTheory.jsx': 'nhận section = topic.theory[i]; đo 90/90 chủ đề đều có theory hợp lệ',
    'src/components/oxford/FlashcardTab.jsx': 'nhận unit; VocabOxfordPage chỉ vẽ khi đã chọn được unit có thật',
  };
  const ds = [];
  const di = (d) => {
    for (const t of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) {
      const p = `${d}/${t.name}`;
      if (t.isDirectory()) di(p);
      else if (t.name.endsWith('.jsx') && !/ielts/i.test(p)) ds.push(p);
    }
  };
  di('src/components');

  const PROPS = { onClose() {}, playAudio() {}, completeMilestone() {}, verifyMilestone() {}, setXp() {}, onScore() {}, setGlobalProgress() {}, onComplete() {}, completedMilestones: [] };
  const no = [];
  for (const f of ds.sort()) {
    if (f in CAN_DU_LIEU) continue;
    let C;
    try { ({ default: C } = await napComponent(f)); } catch (e) { no.push(`${f} (gói lỗi: ${e.message.slice(0, 60)})`); continue; }
    if (typeof C !== 'function') continue;
    try { veRa(h(C, PROPS)); } catch (e) { no.push(`${f} :: ${String(e.message).slice(0, 80)}`); }
  }
  assert.deepEqual(no, [], 'component nổ ở lần vẽ đầu:\n  ' + no.join('\n  '));
});
