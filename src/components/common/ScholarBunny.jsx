import React from 'react';

// Mapping of component state to transparent PNG images
const STATE_IMAGES = {
  neutral: '/bunny_neutral.png',   // Ảnh vẫy tay chào cực đáng yêu tách nền
  happy: '/bunny_neutral.png',
  surprised: '/bunny_neutral.png',
  shocked: '/bunny_neutral.png',
  completed: '/bunny_neutral.png',
  love: '/bunny_neutral.png',
  studying: '/bunny_studying.png',  // Thỏ đeo kính cận ngồi học bên bàn sách
  success: '/bunny_success.png',   // Thỏ nhảy cẫng ăn mừng
  failed: '/bunny_failed.png',     // Thỏ cúi đầu buồn bã hối lỗi
  sad: '/bunny_failed.png'
};

/**
 * Mascot Component (Static Transparent PNG)
 * Uses high-quality isolated assets. Maintains perfect aspect ratio without deformation.
 */
const ScholarBunny = ({
  state = 'neutral',
  className = '',
  width = 40,   // Shrunk default width from 60 to 40
  height = 40,  // Shrunk default height from 60 to 40
  style = {}
}) => {
  const src = STATE_IMAGES[state] || STATE_IMAGES['neutral'];

  return (
    <img
      src={src}
      alt={`Scholar Bunny Mascot - ${state}`}
      className={`select-none object-contain pointer-events-none ${className}`}
      draggable={false}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style
      }}
    />
  );
};

export default ScholarBunny;
