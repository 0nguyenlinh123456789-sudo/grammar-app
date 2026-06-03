// File: src/data/grammarData.js
// Grammar Data Wrapper - Combines B1, B2, C1/C2 levels
// New system based on Destination series curriculum

import { grammarDataB1 } from './grammarDataB1';
import { grammarDataB2 } from './grammarDataB2';
import { grammarDataC1C2 } from './grammarDataC1C2';

// Combine all levels into one flat array for backward compatibility
export const parsedGrammarData = [...grammarDataB1, ...grammarDataB2, ...grammarDataC1C2];

// Export by level for the new tabbed UI
export const grammarLevels = [
  { id: 'B1', label: '🟢 B1 - Nền Tảng', description: 'Ngữ pháp cơ bản cho người mới bắt đầu', color: 'bg-emerald-400', topics: grammarDataB1 },
  { id: 'B2', label: '🟡 B2 - Trung Cấp', description: 'Ngữ pháp nâng cao cho người đã có nền tảng', color: 'bg-amber-400', topics: grammarDataB2 },
  { id: 'C1C2', label: '🔴 C1/C2 - Nâng Cao', description: 'Ngữ pháp chuyên sâu cho trình độ cao', color: 'bg-rose-400', topics: grammarDataC1C2 },
];
