# Kiến Trúc Dự Án (Project Architecture) - Grammar Pro

Tài liệu này giải thích chi tiết kiến trúc phân lớp chuẩn Senior Developer của dự án Grammar Pro để các AI Agent và lập trình viên tiếp theo có thể dễ dàng nắm bắt, bảo trì và phát triển.

---

## 🏛️ Tổng quan mô hình phân lớp

Dự án tuân thủ nghiêm ngặt nguyên lý **Tách biệt mối quan tâm (Separation of Concerns)** bằng cách phân chia mã nguồn thành 5 tầng rõ rệt:

```mermaid
graph TD
    Entry[src/main.jsx] --> Root[src/App.jsx (Router/Coordinator)]
    Root --> Layout[src/layouts/MainLayout.jsx]
    Layout --> Pages[src/pages/* (Views)]
    Pages --> Components[src/components/* (Domain & Common)]
    Pages --> Data[src/data/* (Mock Data)]
```

### 1. Tầng Khởi tạo (Initialization Layer)
- **File chính**: [main.jsx](file:///d:/HocCode/grammar-app/src/main.jsx) & [index.css](file:///d:/HocCode/grammar-app/src/index.css)
- **Nhiệm vụ**: Đóng vai trò là cổng vào duy nhất (Single Entry Point), nhập CSS toàn cầu (Tailwind CSS v4) và hiển thị phần tử gốc `<App />`.

### 2. Tầng Điều phối & Định tuyến (Coordinator & Router Layer)
- **File chính**: [App.jsx](file:///d:/HocCode/grammar-app/src/App.jsx)
- **Nhiệm vụ**: 
  - Đóng vai trò là Router chính quản lý các chế độ hiển thị (`appMode`: 'grammar', 'vocab', 'scanner').
  - Quản lý trạng thái toàn cục (như điểm kinh nghiệm `xp`).
  - Đóng gói các hàm tiện ích toàn cục (ví dụ: `playAudio` sử dụng Web Speech Synthesis API).

### 3. Tầng Bố cục (Layout Layer)
- **File chính**: [MainLayout.jsx](file:///d:/HocCode/grammar-app/src/layouts/MainLayout.jsx)
- **Nhiệm vụ**:
  - Dựng bộ khung giao diện nhất quán cho toàn bộ ứng dụng.
  - Quản lý Sidebar điều hướng chính cho cả 3 chế độ: Ngữ pháp, Từ vựng (VSTEP / Oxford), và AI Scanner.
  - Tích hợp thanh tìm kiếm và cơ chế cuộn mượt mà có responsive hoàn chỉnh.

### 4. Tầng Trang (Page/Route Layer)
- **Địa chỉ**: `src/pages/`
- **Các trang**:
  - `WelcomePage.jsx`: Giao diện chào mừng khi người dùng mở ứng dụng.
  - `GrammarPage.jsx`: Quản lý các chế độ học tập ngữ pháp (Lý thuyết, Xếp câu, Gia sư AI, Kiểm tra).
  - `VocabVstepPage.jsx`: Quản lý tiến trình học từ vựng VSTEP theo 4 bước chuyên sâu.
  - `VocabOxfordPage.jsx`: Lớp bọc an toàn hiển thị học từ vựng Oxford.
  - `ScannerPage.jsx`: Trang quét ảnh AI thông qua kết nối Gemini API của người dùng.

### 5. Tầng Thành phần & Giao diện dùng chung (Component Layer)
- **Địa chỉ**: `src/components/`
- **Phân nhóm**:
  - `common/`: Chứa các component dùng chung như `Btn3D.jsx` (Nút bấm 3D Gamification).
  - `grammar/`: Chứa các component đặc trưng cho Ngữ Pháp như `SketchnoteTheory.jsx`, `SentenceBuilder.jsx`, `QuizEngine.jsx`, `AiAssistant.jsx`.
  - `vocab/`: Chứa các component đặc trưng cho Từ Vựng như `StoryWithHighlights.jsx`, `Flashcard.jsx`, `WritingPractice.jsx`, `SpeakingPractice.jsx`.
  - `oxford/`: Chứa các sub-component phục vụ học từ vựng Oxford như `TheoryTab.jsx`, `FlashcardTab.jsx`, `DragDropTab.jsx`, `TypingTab.jsx`, `QuizTab.jsx`, `PracticeTab.jsx`.
  - `unitData.jsx`: Đóng vai trò làm view container điều phối gọn nhẹ cho 6 sub-component ở thư mục `oxford/` trên.

### 6. Tầng Dữ liệu (Data Layer)
- **Địa chỉ**: `src/data/`
- **Dữ liệu**:
  - `grammarData.js`: 21 chuyên đề ngữ pháp đã qua xử lý nhân bản và mở rộng (`expandData`).
  - `vocabVstepData.js`: Hơn 1000 từ vựng VSTEP phân nhóm theo chủ đề, truyện chêm ngữ cảnh.
  - `oxfordData.js`: Dữ liệu bài học từ vựng Oxford.

---

## 🚀 Lợi ích của kiến trúc mới
1. **Dễ bảo trì**: Tệp `App.jsx` giảm từ 630 dòng xuống 100 dòng. Tệp `Vocab.jsx` cồng kềnh (1640 dòng) được loại bỏ hoàn toàn và chia nhỏ thành các tệp tin dưới 150 dòng.
2. **Tốc độ & Hiệu suất**: Tránh việc render lại (re-render) không cần thiết nhờ phân tách các component quản lý State cục bộ (như thẻ lật flashcard, tab lý thuyết).
3. **Thuận tiện mở rộng**: Khi muốn thêm một chủ đề từ vựng mới hoặc chuyên đề ngữ pháp mới, các AI Agent tiếp theo chỉ cần cập nhật các tệp tin trong `src/data/` mà không sợ làm lỗi giao diện UI chính.
