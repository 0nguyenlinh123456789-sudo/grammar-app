// File: src/data/ieltsFoundationOverlay.js
// Hand-curated overlay for the "IELTS Nền Tảng" section. This is NOT auto-
// generated — it survives re-running scratch/gen_manifest.cjs.
//
// Purpose:
//  1) Fill genuine gaps in the extracted course (e.g. a lesson missing from the
//     media archive) by adding a notes-based lesson.
//  2) Add human-friendly module descriptions.
//  3) Attach optional per-lesson descriptions, keyed by the STABLE lesson id
//     (never rename ids — they drive completeMilestone progress).
//
// Keys are the module / lesson `id`s produced by gen_manifest.cjs.

export const moduleOverlay = {
  'ph-t-m-c-b-n': {
    description: 'Xây gốc phát âm chuẩn IPA: nguyên âm, phụ âm, âm cuối, trọng âm — nền tảng cho cả Nghe và Nói.',
  },
  't-v-ng-c-b-n': {
    description: '1000+ từ vựng nền tảng theo 10 chủ đề đời sống, kèm phát âm và ứng dụng trong câu.',
  },
  'ng-ph-p-c-b-n': {
    description: 'Ngữ pháp cốt lõi: danh từ, đại từ, giới từ, tính/trạng từ, thì động từ, trật tự câu — kèm sơ đồ tư duy.',
  },
  'ng-ph-p-c-b-n-plus': {
    description: 'Nâng cao ngữ pháp nền tảng với nhiều sơ đồ tư duy và mẫu câu, củng cố trước khi vào IELTS.',
  },
  'b-b-i-t-p-b-tr-listening-gap-filling-c-b-n': {
    description: '15 bài luyện nghe điền từ (gap-filling) — kỹ năng cốt lõi cho IELTS Listening.',
  },
};

// Supplemental lessons to PREPEND to a module (used to fill archive gaps).
// Each needs a stable synthetic id and a `notes` HTML string (no media).
export const prependLessons = {
  // The media archive for "Ngữ pháp cơ bản Plus" starts at Lesson 2 — the intro
  // (Lesson 1) is missing. Provide a text-based opening lesson so the roadmap is
  // complete and sequential.
  'ng-ph-p-c-b-n-plus': [
    {
      id: 'ielts-ng-ph-p-c-b-n-plus-lesson-1-mo-dau',
      title: 'Bài 1: Mở đầu',
      type: 'lesson',
      notes: `
        <h3>Chào mừng đến với Ngữ Pháp Cơ Bản Plus 🧩</h3>
        <p>Đây là phần <strong>nâng cao</strong> của Ngữ pháp cơ bản. Sau khi đã nắm các viên gạch nền tảng (danh từ, động từ, thì...), phần này giúp bạn <strong>hệ thống hoá</strong> kiến thức bằng nhiều <em>sơ đồ tư duy (mind map)</em> và luyện áp dụng vào <em>mẫu câu</em> thực tế.</p>
        <h4>Bạn sẽ học gì trong module này?</h4>
        <ul>
          <li>📦 <strong>Danh từ</strong> — đếm được/không đếm được, số ít/số nhiều.</li>
          <li>🏃 <strong>Động từ &amp; thì</strong> — cách chọn thì đúng theo ngữ cảnh.</li>
          <li>🙋 <strong>Đại từ</strong> — nhân xưng, sở hữu, phản thân.</li>
          <li>🎨 <strong>Tính từ &amp; trạng từ</strong> — vị trí và trật tự.</li>
          <li>🧭 <strong>Giới từ</strong> — in/on/at về thời gian &amp; nơi chốn.</li>
          <li>🧱 <strong>Các mẫu câu</strong> — ghép các thành phần thành câu hoàn chỉnh.</li>
          <li>🗺️ <strong>5 sơ đồ tư duy</strong> tổng hợp sau mỗi cụm bài.</li>
        </ul>
        <h4>Cách học hiệu quả</h4>
        <ol>
          <li>Xem bài giảng, ghi lại quy tắc chính vào sổ tay.</li>
          <li>Làm bài tập PDF ngay sau mỗi bài để ghi nhớ.</li>
          <li>Ôn lại bằng sơ đồ tư duy trước khi làm Mini Test.</li>
          <li>Hoàn thành 4 Mini Test và 1 Final Test để tự đánh giá.</li>
        </ol>
        <p>👉 Sẵn sàng chưa? Bấm <strong>“Đánh dấu hoàn thành”</strong> rồi sang <strong>Bài 2: Danh từ</strong> nhé!</p>
      `,
    },
  ],
};

// Optional per-lesson descriptions, keyed by stable lesson id.
export const lessonOverlay = {
  'ielts-ph-t-m-c-b-n-lesson-1-t-ng-quan-ph-t-m': { desc: 'Phân biệt bảng chữ cái và bảng phiên âm, giới thiệu tổng quan IPA.' },
  'ielts-t-v-ng-c-b-n-lesson-1-m-u': { desc: 'Cách học từ vựng hiệu quả và lộ trình 10 chủ đề.' },
  'ielts-ng-ph-p-c-b-n-lesson-1-m-u': { desc: 'Tổng quan lộ trình ngữ pháp nền tảng.' },
};
