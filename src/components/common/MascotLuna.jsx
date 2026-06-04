// File: src/components/common/MascotLuna.jsx
// Luna the Owl — App mascot for Grammar Pro
// Animated, context-aware, works in both light and dark mode

import { useState, useEffect } from 'react';

const LUNA_MESSAGES = {
  welcome: [
    "Chào mừng bạn đến với Grammar Pro! 🎉 Tớ là Luna, chú chuột lang nước (capybara) dẫn đường siêu đáng yêu của bạn!",
    "Học tiếng Anh mỗi ngày giúp não bộ phát triển! Hãy bắt đầu nào! ✨",
    "Hôm nay chúng ta học gì nhỉ? Tớ luôn ở đây hỗ trợ bạn! 💖",
  ],
  correct: [
    "Xuất sắc lắm! 🌟 Bạn làm tốt lắm!",
    "Chính xác! 🎯 Tiếp tục phát huy nhé!",
    "Tuyệt vời! 🏆 Não bộ của bạn đang phát triển đấy!",
    "Đúng rồi! 🦦 Tớ biết bạn làm được mà!",
  ],
  wrong: [
    "Ôi không sao! 💪 Sai để học, thử lại nhé!",
    "Gần đúng rồi! 🤔 Xem lại lý thuyết nhé!",
    "Đừng nản! 🦦 Mỗi lần sai là một bước tiến!",
    "Không sao! 😊 Người giỏi cũng đã từng sai nhiều lần!",
  ],
  vocab: [
    "Từ vựng là nền tảng! 📚 Hãy học 10 từ mỗi ngày!",
    "Thú vị không? Hãy dùng từ này trong câu nhé! ✍️",
    "Lặp lại 7 lần để ghi nhớ dài hạn! 🔁",
    "Học theo câu chuyện giúp nhớ lâu hơn 5 lần! 🧠",
  ],
  streak: [
    "Bạn đang có streak! 🔥 Đừng bỏ lỡ hôm nay nhé!",
    "Kiên trì mỗi ngày — bí quyết của người giỏi! 💪",
    "Tuyệt vời! Bạn học rất đều đặn! 🌟",
  ],
  grammar: [
    "Ngữ pháp không khó! 💡 Hiểu logic là dùng được!",
    "Mẹo nhỏ: Đọc thành tiếng khi làm bài tập! 🗣️",
    "Làm sai? Không sao! Não bạn đang học đấy! 🧠",
  ],
  idle: [
    "🦦 Nhóp nhép... Bạn đang ở đây à?",
    "Cùng học một bài ngắn nhé? Chỉ 5 phút thôi! ⏱️",
    "Mỗi ngày một từ mới = 365 từ mỗi năm! 📈",
  ],
  loading: ["Đang tải... Tớ đang gặm cỏ đợi cậu! 🌿"],
};

const LUNA_MOODS = {
  idle: 'animate-mascot-float',
  happy: 'animate-mascot-bounce',
  celebrate: 'animate-mascot-celebrate',
  thinking: 'animate-mascot-wiggle',
};

const CAPYBARA_IMAGES = {
  idle: '/capybara_neutral.png',
  thinking: '/capybara_studying.png',
  happy: '/capybara_success.png',
  celebrate: '/capybara_success.png',
  wrong: '/capybara_failed.png',
};

// The Capybara Image component — white background removed via mix-blend-multiply
// In dark mode, a warm light wrapper is added so the multiply blending still works
const CapybaraImage = ({ size = 80, mood = 'idle' }) => {
  const src = CAPYBARA_IMAGES[mood] || CAPYBARA_IMAGES.idle;
  
  return (
    <div 
      className={`relative select-none flex items-center justify-center ${LUNA_MOODS[mood] || LUNA_MOODS.idle}`}
      style={{ width: size, height: size }}
    >
      {/* Circular sticker badge wrapper — bg removes white PNG background via mix-blend-multiply */}
      <div 
        className="w-full h-full flex items-center justify-center border-[3px] border-slate-800 dark:border-slate-700 bg-[#fffbeb] dark:bg-[#fef9c3] shadow-[3px_3px_0_0_#1e293b] dark:shadow-[3px_3px_0_0_#000] transition-all duration-300"
        style={{ borderRadius: '50%', padding: '6px', overflow: 'hidden' }}
      >
        <img 
          src={src} 
          alt="Luna the Capybara mascot" 
          className="w-full h-full object-contain pointer-events-none mix-blend-multiply"
          draggable={false}
        />
      </div>
      {/* Graduation cap decoration */}
      {(mood === 'happy' || mood === 'celebrate') && (
        <span 
          style={{ 
            position: 'absolute', top: -size * 0.1, left: '50%', 
            transform: 'translateX(-50%)', 
            fontSize: size * 0.35,
            lineHeight: 1,
          }}
        >
          🎓
        </span>
      )}
      {/* Stars when celebrating */}
      {mood === 'celebrate' && (
        <>
          <span style={{ position: 'absolute', top: -4, right: -4, fontSize: size * 0.25 }}>⭐</span>
          <span style={{ position: 'absolute', bottom: 0, left: -4, fontSize: size * 0.2 }}>✨</span>
        </>
      )}
    </div>
  );
};

// Speech Bubble
const SpeechBubble = ({ message, direction = 'right', isVisible }) => {
  if (!isVisible || !message) return null;
  
  return (
    <div 
      className={`
        animate-pop-in absolute z-50
        ${direction === 'right' ? 'left-full ml-3 top-0' : 'right-full mr-3 top-0'}
        bg-white dark:bg-slate-800 border-4 border-black dark:border-slate-600
        rounded-2xl px-4 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_#000]
        min-w-[180px] max-w-[260px]
      `}
      style={{ pointerEvents: 'none' }}
    >
      {/* Arrow */}
      <div 
        className={`absolute top-4 ${direction === 'right' ? '-left-3' : '-right-3'}`}
        style={{
          width: 0, height: 0,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          [direction === 'right' ? 'borderRight' : 'borderLeft']: '12px solid black',
        }}
      />
      <div 
        className={`absolute top-4 ${direction === 'right' ? '-left-[10px]' : '-right-[10px]'}`}
        style={{
          width: 0, height: 0,
          borderTop: '7px solid transparent',
          borderBottom: '7px solid transparent',
          [direction === 'right' ? 'borderRight' : 'borderLeft']: '10px solid white',
        }}
      />
      <p className="text-slate-800 dark:text-slate-100 font-bold text-xs md:text-sm leading-snug">
        {message}
      </p>
    </div>
  );
};

// ─── Main MascotLuna Component ─────────────────────────────────────────────
const MascotLuna = ({
  mood = 'idle',
  context = 'welcome',  // 'welcome' | 'vocab' | 'grammar' | 'streak' | 'correct' | 'wrong'
  customMessage = null,
  size = 70,
  showBubble = true,
  direction = 'right',
  className = '',
  onMascotClick = null,
}) => {
  const [message, setMessage] = useState('');
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [currentMood, setCurrentMood] = useState(mood);
  const [clickCount, setClickCount] = useState(0);

  // Pick a random message for context
  useEffect(() => {
    const msgs = LUNA_MESSAGES[context] || LUNA_MESSAGES.idle;
    const msg = customMessage || msgs[Math.floor(Math.random() * msgs.length)];
    setMessage(msg);
    setCurrentMood(mood);
    
    if (showBubble) {
      const delay = setTimeout(() => setBubbleVisible(true), 600);
      const hide = setTimeout(() => setBubbleVisible(false), 6000);
      return () => { clearTimeout(delay); clearTimeout(hide); };
    }
  }, [mood, context, customMessage, showBubble]);

  const handleClick = () => {
    setClickCount(c => c + 1);
    setCurrentMood('celebrate');
    const msgs = LUNA_MESSAGES[context] || LUNA_MESSAGES.idle;
    setMessage(msgs[clickCount % msgs.length]);
    setBubbleVisible(true);
    setTimeout(() => { setCurrentMood(mood); }, 1500);
    setTimeout(() => setBubbleVisible(false), 5000);
    if (onMascotClick) onMascotClick();
  };

  return (
    <div 
      className={`relative inline-flex items-start ${className}`}
      style={{ isolation: 'isolate' }}
    >
      {/* Left bubble */}
      {direction === 'left' && (
        <SpeechBubble message={message} direction="left" isVisible={bubbleVisible} />
      )}
      
      {/* Luna icon */}
      <button
        onClick={handleClick}
        className="relative z-10 cursor-pointer focus:outline-none rounded-full 
          hover:scale-110 transition-transform duration-200 active:scale-95
          drop-shadow-lg"
        title="Click để nghe lời khuyên từ Luna! 🦦"
        aria-label="Luna the mascot capybara - click for tips"
      >
        <CapybaraImage size={size} mood={currentMood} />
      </button>

      {/* Right bubble */}
      {direction === 'right' && (
        <SpeechBubble message={message} direction="right" isVisible={bubbleVisible} />
      )}
    </div>
  );
};

export default MascotLuna;
export { LUNA_MESSAGES };
