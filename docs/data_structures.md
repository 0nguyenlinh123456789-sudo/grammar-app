# Cấu Trúc Dữ Liệu Tĩnh (Static Data Structures) - Grammar Pro

Tài liệu này giải thích chi tiết cấu trúc dữ liệu (schemas) của các tệp tin trong thư mục `src/data/` để giúp lập trình viên hoặc AI Agent tiếp theo hiểu cách thêm, bớt hoặc chỉnh sửa dữ liệu học tập mà không làm gián đoạn mã nguồn hiển thị.

---

## 📖 1. Chuyên đề Ngữ pháp (`src/data/grammarData.js`)

Mảng gốc `CORE_GRAMMAR_DATA` được cấu trúc để bảo toàn lý thuyết chi tiết và bài tập thực hành. Định dạng như sau:

### Chi tiết Schema:
```javascript
{
  i: 't1',                        // (String) ID duy nhất của chuyên đề (Topic ID)
  t: '1. Hiện Tại Đơn...',       // (String) Tiêu đề chuyên đề hiển thị trên giao diện
  c: 'bg-cyan-200',               // (String) Lớp màu nền Tailwind cho header
  th: [                           // (Array) Danh sách các mục Lý thuyết (Sketchnote)
    {
      h: 'I. Định nghĩa...',     // (String) Tiêu đề mục lý thuyết
      c: '👉 Diễn đạt thói...'    // (String) Nội dung chi tiết lý thuyết (hỗ trợ ký tự đặc biệt 👉, ✅, ❌)
    }
  ],
  s: "I usually go to bed...|...",// (String) Danh sách câu xếp phản xạ, ngăn cách bằng dấu xuống dòng \n và ký tự | (English|Vietnamese)
  e: "He always _______ a...|..." // (String) Danh sách câu hỏi trắc nghiệm, ngăn cách bằng dấu xuống dòng \n và ký tự | (Câu hỏi|Phương án A,B|Đáp án)
}
```

### Thuật toán mở rộng tự động (`expandData`):
Mã nguồn tự động nhân bản dữ liệu thô để tạo ra đủ **30 câu** cho Game xếp câu phản xạ và **30 câu** cho Game Trắc nghiệm Duolingo bằng phép toán chia dư (`%`), giúp chống lỗi màn hình trắng (White Screen of Death) 100% trong trường hợp dữ liệu thô nhập vào quá ít.

---

## 🎯 2. Từ vựng VSTEP (`src/data/vocabVstepData.js`)

Mảng `vocabData` quản lý từ vựng nâng cao phục vụ ôn thi VSTEP / IELTS theo định dạng truyện chêm ngữ cảnh đặc trưng.

### Chi tiết Schema:
```javascript
{
  id: 'travel-transport',         // (String) ID duy nhất của chủ đề từ vựng
  title: '✈️ Du Lịch & Giao...',   // (String) Tiêu đề chủ đề hiển thị
  description: 'Từ vựng tiếng...',// (String) Mô tả ngắn về chủ đề
  words: [                        // (Array) Danh sách các từ vựng chi tiết
    {
      en: 'ticket',               // (String) Từ tiếng Anh gốc
      type: '(n)',                // (String) Từ loại: danh từ (n), động từ (v), tính từ (adj)...
      vi: 'vé',                   // (String) Nghĩa tiếng Việt
      ipa: '/ˈtɪkɪt/',            // (String) Phiên âm quốc tế IPA
      example: 'She bought...',   // (String) Câu ví dụ tiếng Anh
      viExample: 'Cô ấy đã mua...'// (String) Dịch nghĩa câu ví dụ tiếng Việt
    }
  ],
  storyEn: 'Bob wanted to...',    // (String) Truyện chêm tiếng Anh (Các từ vựng trong danh sách phải được viết HOA chữ cái đầu tiên để bộ tô sáng regex nhận diện tốt)
  storyVi: 'Bob muốn đi...'       // (String) Bản dịch tiếng Việt tương ứng
}
```

---

## 📕 3. Từ vựng Oxford (`src/data/oxfordData.js`)

Mảng `courseData` chứa 60 bài học từ vựng Oxford phân tách thành các Unit.

### Chi tiết Schema:
```javascript
{
  id: 1,                          // (Number) ID duy nhất của Unit
  title: 'Unit 1: Everyday...',  // (String) Tiêu đề Unit
  description: 'Learn basic...',  // (String) Mô tả của Unit
  theory: [                       // (Array) Danh sách các nhóm từ vựng chính
    {
      heading: 'Everyday verbs', // (String) Tiêu đề nhóm từ
      items: [
        {
          word: 'do',             // (String) Từ vựng tiếng Anh
          type: 'verb',           // (String) Từ loại
          phonetic: '/duː/',      // (String) Phiên âm
          vi: 'làm',              // (String) Nghĩa tiếng Việt
          example: 'Do your best' // (String) Ví dụ tiếng Anh
        }
      ]
    }
  ],
  dragDrop: {                     // (Object) Dữ liệu trò chơi kéo thả ghép từ
    buckets: ['Verbs', 'Nouns'],  // (Array) Danh sách các ô thả từ vựng
    items: [
      {
        id: 'dd-1',
        word: 'do',
        target: 'Verbs'           // (String) Tên ô thả chính xác
      }
    ]
  },
  typingGame: [                   // (Array) Dữ liệu trò chơi gõ từ phản xạ
    {
      q: 'To perform an action',  // (String) Định nghĩa câu hỏi
      hint: 'd_ (2 letters)',     // (String) Gợi ý ký tự
      a: 'do'                     // (String) Đáp án chính xác
    }
  ],
  quiz: [                         // (Array) Dữ liệu câu hỏi trắc nghiệm
    {
      q: 'Which word is a verb?', // (String) Câu hỏi
      options: ['do', 'table'],   // (Array) Các phương án lựa chọn
      a: 'do'                     // (String) Đáp án chính xác
    }
  ],
  speaking: [                     // (Array) Dữ liệu luyện nói
    {
      text: 'Do your best',       // (String) Câu tiếng Anh cần phát âm
      trans: 'Hãy làm hết sức'    // (String) Bản dịch tiếng Việt
    }
  ]
}
```
