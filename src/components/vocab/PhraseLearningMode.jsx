// File: src/components/vocab/PhraseLearningMode.jsx
// Dạy từ vựng qua collocation/cụm từ CÓ NGƯỜI SOẠN (topic.phrases) và câu ví dụ
// thật của từ (word.example/viExample).
//
// CHÍNH SÁCH NỘI DUNG (đợt (f) 2026-08-12 — chỉ đạo chủ dự án):
// Thiếu dữ liệu thì ẨN hoặc BÁO, tuyệt đối không thay thế âm thầm. Mọi nội dung
// thay thế phải tự khai báo là nội dung thay thế.
// Trước đây file này TỰ SINH collocation ("a significant X", "need to X"...) và
// "mẫu câu thi" ("It is essential to X in order to...") bằng template ghép chuỗi,
// dán nhãn "IELTS Writing Task 2"/"IELTS Band 7+" cho 274/274 chủ đề — kể cả
// tiếng Anh sai ngữ pháp với trạng từ ("It is essential to quickly..."). Toàn bộ
// nhánh template đã bị XÓA theo nguyên tắc GIỮ/XÓA trong AUDIT_SU_PHAM.md §9.5:
// máy chỉ được SẮP XẾP LẠI nguyên liệu curated, không được bịa chữ mới.
// VocabVstepPage ẩn hẳn mode này với topic không có `phrases` soạn tay.

import { Zap, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

const PhraseLearningMode = ({ activeTopic, playAudio, currentWordIndex, onWordChange }) => {
  const words = activeTopic?.words || [];
  const phrases = activeTopic?.phrases || [];

  const currentWord = words[currentWordIndex];

  // Chỉ trả về cụm từ NGƯỜI SOẠN của đúng từ này — không còn nhánh tự sinh.
  const getPhrasesForWord = (word) => {
    if (!word) return [];
    return phrases.filter(p => p.word === word.en).slice(0, 5);
  };

  // Chỉ hiển thị câu ví dụ THẬT của từ (curated) — mọi "mẫu câu thi" template
  // đã bị xóa (xem chính sách ở đầu file).
  const getSentencePatterns = (word) => {
    if (!word || !word.example || !word.viExample) return [];
    return [{
      label: '💬 Câu mẫu thực tế',
      pattern: word.example,
      vi: word.viExample,
      color: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400',
    }];
  };

  // Không phải "đang tải": `currentWord` lấy từ mảng truyền vào bằng prop, có mặt
  // ngay lần vẽ đầu. Rỗng nghĩa là chủ đề này không có cụm câu nào — trạng thái
  // vĩnh viễn. Cùng lỗi với bảy bộ bài tập ngữ pháp, do bộ vẽ-thật tìm ra.
  if (!currentWord) {
    return (
      <div className="p-8 text-center rounded-3xl border-4 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50">
        <p className="text-3xl mb-2">💬</p>
        <p className="font-black text-slate-600 dark:text-slate-300">Chủ đề này chưa có cụm câu nào.</p>
        <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">Chọn một chế độ học khác ở hàng thẻ phía trên.</p>
      </div>
    );
  }

  // Lưới an toàn: VocabVstepPage đã ẩn mode này với topic không có phrases soạn
  // tay; nếu vẫn bị render thì BÁO trung thực thay vì hiện màn hình rỗng.
  if (phrases.length === 0) {
    return (
      <div className="w-full max-w-4xl p-10 font-bold text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-3xl border-4 border-slate-200 dark:border-slate-700 animate-fade-in">
        <p className="text-3xl mb-3">⚡🚧</p>
        <p className="text-xl">Chủ đề này chưa có cụm từ &amp; mẫu câu được biên soạn.</p>
      </div>
    );
  }

  const wordPhrases = getPhrasesForWord(currentWord);
  const sentencePatterns = getSentencePatterns(currentWord);

  return (
    <div className="w-full max-w-4xl space-y-6 animate-fade-in">
      {/* Word Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-black">{currentWord.en}</div>
            <div className="text-blue-200 font-bold text-lg mt-1">{currentWord.ipa}</div>
            <div className="text-white/90 font-bold text-xl mt-1">{currentWord.vi}</div>
            {currentWord.synonyms && (
              <div className="text-blue-200 text-sm font-medium mt-2">
                <span className="text-white/70">Đồng nghĩa:</span> {currentWord.synonyms}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200 font-bold mb-1">Từ</div>
            <div className="text-4xl font-black text-yellow-300">
              {currentWordIndex + 1}/{words.length}
            </div>
            <button
              onClick={() => playAudio(currentWord.en)}
              className="mt-2 px-3 py-1 bg-white/20 border-2 border-white/50 rounded-xl text-sm font-bold hover:bg-white/30 transition-all"
            >
              🔊 Nghe
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: Common Phrases / Collocations */}
      <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <h3 className="text-xl font-black mb-4 flex items-center gap-2">
          <Zap size={20} className="text-yellow-500" />
          <span className="text-slate-800 dark:text-slate-100">Cụm Từ & Collocation</span>
        </h3>
        {wordPhrases.length === 0 && (
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Từ "{currentWord.en}" chưa có cụm từ được biên soạn — hãy chuyển từ khác.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {wordPhrases.map((p, i) => (
            <div
              key={i}
              className="phrase-card p-4 cursor-pointer hover:scale-[1.02] transition-all"
              onClick={() => playAudio(p.phrase)}
            >
              <div className="font-black text-blue-800 dark:text-blue-200 text-lg">{p.phrase}</div>
              <div className="text-slate-600 dark:text-slate-300 font-bold text-sm mt-1">{p.vi}</div>
              {p.use && (
                <div className="mt-2 inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-0.5 rounded-full">
                  {p.use}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: câu ví dụ thật của từ (curated) */}
      {sentencePatterns.length > 0 && (
      <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <h3 className="text-xl font-black mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span>📝</span> Câu Ví Dụ Trong Ngữ Cảnh
        </h3>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 -mt-2">
          Câu ví dụ do người soạn viết cho từ này — đọc to để nhớ cách dùng
        </p>
        <div className="space-y-3">
          {sentencePatterns.map((s, i) => (
            <div key={i} className={`border-2 rounded-xl p-4 relative pr-12 ${s.color}`}>
              <button
                onClick={(e) => { e.stopPropagation(); playAudio(s.pattern); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-700/80 p-2 rounded-full border-2 border-black/20 hover:bg-white dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center hover:scale-110 active:scale-95"
                title="Nghe câu mẫu"
              >
                <Volume2 size={16} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black px-2 py-0.5 bg-black text-white rounded-full">{s.label}</span>
              </div>
              <div className="font-bold text-slate-800 dark:text-slate-100 text-base">{s.pattern}</div>
              <div className="text-slate-600 dark:text-slate-300 text-sm font-medium mt-1 italic">{s.vi}</div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* SECTION 3: Memory Anchor */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <h3 className="text-xl font-black mb-3 text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span>🧠</span> Mẹo Ghi Nhớ Nhanh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-700 border-2 border-black rounded-xl p-3 text-center">
            <div className="text-3xl mb-2">🔗</div>
            <div className="text-xs font-black text-slate-600 dark:text-slate-300 mb-1">LIÊN KẾT</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">"{currentWord.en}" giống với?</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Nghĩ về từ tiếng Việt gần giống</div>
          </div>
          <div className="bg-white dark:bg-slate-700 border-2 border-black rounded-xl p-3 text-center">
            <div className="text-3xl mb-2">🎬</div>
            <div className="text-xs font-black text-slate-600 dark:text-slate-300 mb-1">HÌNH ẢNH</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Tưởng tượng cảnh "{currentWord.vi}"</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Não ghi nhớ hình ảnh tốt hơn 60000 lần</div>
          </div>
          <div className="bg-white dark:bg-slate-700 border-2 border-black rounded-xl p-3 text-center">
            <div className="text-3xl mb-2">🗣️</div>
            <div className="text-xs font-black text-slate-600 dark:text-slate-300 mb-1">NÓI TO</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Đọc "{currentWord.en}" 3 lần</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Kết hợp âm thanh + chuyển động môi</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => onWordChange?.((currentWordIndex - 1 + words.length) % words.length)}
          className="flex-1 py-4 bg-white dark:bg-slate-700 border-4 border-black dark:border-slate-500 rounded-2xl font-black text-xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
        >
          <ChevronLeft size={24} /> Từ Trước
        </button>
        <button
          onClick={() => onWordChange?.((currentWordIndex + 1) % words.length)}
          className="flex-1 py-4 bg-yellow-400 border-4 border-black rounded-2xl font-black text-xl hover:bg-yellow-500 shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
        >
          Từ Tiếp <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default PhraseLearningMode;
