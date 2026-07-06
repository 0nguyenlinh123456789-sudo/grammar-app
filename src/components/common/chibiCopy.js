// File: src/components/common/chibiCopy.js
// Encouraging Vietnamese one-liners for the chibi animal buddies. Kept separate
// from ChibiAnimals.jsx so that file only exports components (react-refresh).

const PRAISE = [
  'Giỏi quá đi! 🎉', 'Tuyệt vời ông mặt trời! 🌟', 'Xuất sắc! Cậu làm được mà! 💪',
  'Học đỉnh thật đấy! 🏆', 'Thêm một bài nữa rồi! 🥳', 'Cậu chăm ghê! Tớ tự hào! 💖',
  'Band 7+ đang tới gần! 🚀', 'Não bộ vừa lớn thêm một xíu! 🧠',
];
const GREET = [
  'Chào cậu! Hôm nay mình học một bài nhé? Chỉ 5 phút thôi! ⏱️',
  'Quay lại rồi! Tớ chờ cậu nãy giờ đó 🥰',
  'Mỗi ngày một chút, 7+ IELTS không còn xa đâu! 🌈',
  'Học đều đặn là bí kíp của người giỏi đấy! ✨',
];

let _p = 0, _g = 0;
export const praiseLine = () => PRAISE[(_p++) % PRAISE.length];
export const greetLine = () => GREET[(_g++) % GREET.length];
export const CHIBI_SPECIES = ['fox', 'cat', 'panda', 'bunny', 'penguin', 'chick'];
