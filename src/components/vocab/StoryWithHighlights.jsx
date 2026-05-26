// File: src/components/vocab/StoryWithHighlights.jsx
import React from 'react';

const StoryWithHighlights = ({ storyText, vocabList }) => {
  if (!storyText || !vocabList) return null;

  // 1. Lấy danh sách các từ tiếng Anh
  const wordsToHighlight = vocabList.map((w) => w.en);

  // 2. Tạo bộ lọc tìm kiếm chính xác từng từ (không bị dính vào code HTML)
  // Ký tự \b giúp chỉ tìm từ đứng độc lập
  const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');

  // 3. Cắt đoạn văn thành các phần nhỏ
  const textParts = storyText.split(regex);

  return (
    <div className="whitespace-pre-wrap leading-relaxed">
      {textParts.map((part, index) => {
        // Tìm xem đoạn chữ này có nằm trong danh sách từ vựng không
        const matchedWord = vocabList.find(
          (vocab) => vocab.en.toLowerCase() === part.toLowerCase()
        );

        if (matchedWord) {
          // Nếu ĐÚNG là từ vựng -> Bôi vàng và thêm hiệu ứng
          return (
             <span
              key={index}
              className="text-black inline-block bg-yellow-300 font-bold px-1 rounded cursor-pointer transform hover:-translate-y-1 hover:rotate-2 transition-transform duration-200"
              title={`Nghĩa: ${matchedWord.vi} | Phát âm: ${matchedWord.ipa}`}
            >
              {part}
            </span>
          );
        }

        // Nếu KHÔNG PHẢI từ vựng -> In ra chữ bình thường
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
};

export default StoryWithHighlights;
