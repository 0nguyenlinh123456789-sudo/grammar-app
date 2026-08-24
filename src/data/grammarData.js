// File: src/data/grammarData.js
// Grammar Data Wrapper - Combines B1, B2, C1/C2 levels
// New system based on Destination series curriculum

import { foundationData } from './foundationData';
import { grammarDataA1 } from './grammarDataA1';
import { grammarDataB1 } from './grammarDataB1';
import { grammarDataB2 } from './grammarDataB2';
import { grammarDataC1C2 } from './grammarDataC1C2';

// Combine all levels into one flat array for backward compatibility.
// Cụm A0 đứng TRƯỚC: người mất gốc phải đọc được bảng chữ cái và ký hiệu IPA
// trước khi gặp mục từ nào — trước đây kho không có nội dung này (KE_HOACH_B2
// việc 1.1).
// A1 đứng ngay sau A0: TO BE / số nhiều / this-that là ba thứ mọi bài sau đó
// đều GIẢ ĐỊNH người học đã biết. Xem đầu grammarDataA1.js.
export const parsedGrammarData = [...foundationData, ...grammarDataA1, ...grammarDataB1, ...grammarDataB2, ...grammarDataC1C2];

// Export by level for the new tabbed UI
export const grammarLevels = [
  { id: 'A0', label: '⬜ A0 - Mất Gốc', description: 'Bảng chữ cái, phát âm, cách đọc phiên âm IPA — học trước mọi thứ khác', color: 'bg-lime-400', topics: foundationData },
  { id: 'A1', label: '🌱 A1 - Câu Đầu Tiên', description: 'TO BE, danh từ số nhiều, this/that — đủ để đặt câu tiếng Anh đầu tiên của mình', color: 'bg-lime-400', topics: grammarDataA1 },
  { id: 'B1', label: '🟢 B1 - Nền Tảng', description: 'Ngữ pháp cơ bản cho người mới bắt đầu', color: 'bg-emerald-400', topics: grammarDataB1 },
  { id: 'B2', label: '🟡 B2 - Trung Cấp', description: 'Ngữ pháp nâng cao cho người đã có nền tảng', color: 'bg-amber-400', topics: grammarDataB2 },
  // (5.2) Nhãn cũ '🔴 C1/C2' hứa vượt cam kết (B2 vững + nền C1, không hứa C2).
  // Gọi là C1+ và nói thẳng là bộ bài này chưa tách C1 với C2 — xem
  // src/utils/nhanCapDo.js.
  { id: 'C1C2', label: '🔴 C1+ - Nâng Cao', description: 'Ngữ pháp chuyên sâu bậc trên B2 — bộ bài gộp chung C1 và C2, chưa tách', color: 'bg-rose-400', topics: grammarDataC1C2 },
];
