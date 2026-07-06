// File: src/data/ieltsRoadmap.js
// Full PrepEdu-style "IELTS Nền Tảng" roadmap, transcribed exactly from the
// official course outline (4 chặng → sub-courses → lessons). This is the
// STRUCTURE / curriculum. Media (video/exercise) is attached at render time:
//  - lessons that exist in the extracted zip (Chặng 1) play their real video
//  - every other lesson shows a one-click "find resources" (YouTube/Google)
//
// Lesson tuple: [title, typeCode?]. typeCode:
//   ''   bài giảng (lecture)        'mm'  Mind map / sơ đồ tư duy
//   'test' bài kiểm tra / mini test 'sp'  Phòng ảo Speaking AI
//   'wr' Phòng ảo Writing AI        'tp'  Chủ đề (Speaking topic)
//   'di' nghe chép chính tả         'bn'  Bonus
//
// `mediaModuleId` links a course to a module id in ieltsFoundationData.js so its
// lessons can be matched to real videos by title.

export const ieltsRoadmap = [
  {
    id: 'chang-1',
    title: 'Chặng 1: Nền Tảng IELTS',
    icon: '🌱',
    color: 'green',
    desc: 'Tích lũy 400 từ vựng quan trọng, 21 phạm trù ngữ pháp toàn diện, hoàn thiện phát âm, ngữ điệu, nối âm, nuốt âm, trọng âm tròn vẹn.',
    courses: [
      {
        id: 'c1-ngu-phap', title: 'Nền Tảng Ngữ Pháp', tag: '12 bài học · 5 bài kiểm tra',
        mediaModuleId: 'ng-ph-p-c-b-n-plus',
        lessons: [
          ['Bài giới thiệu khoá Ngữ pháp'], ['Danh từ'], ['Mind map 1', 'mm'], ['Bài kiểm tra 1 - Ngữ pháp', 'test'],
          ['Động từ'], ['Mind map 2', 'mm'], ['Bài kiểm tra 2 - Ngữ pháp', 'test'],
          ['Đại từ'], ['Mind map 3', 'mm'], ['Bài kiểm tra 3 - Ngữ pháp', 'test'],
          ['Tính từ và Trạng từ'], ['Giới từ'], ['Mind map 4', 'mm'], ['Bài kiểm tra 4 - Ngữ pháp', 'test'],
          ['Các mẫu câu'], ['Mind map 5', 'mm'], ['Bài kiểm tra cuối khoá - Ngữ pháp', 'test'],
        ],
      },
      {
        id: 'c1-phat-am', title: 'Nền Tảng Phát Âm', tag: '12 bài học · 6 bài kiểm tra',
        mediaModuleId: 'ph-t-m-c-b-n',
        lessons: [
          ['Tổng quan phát âm'], ['Các lỗi phát âm thường gặp'], ['Bài kiểm tra 1 - Phát âm', 'test'],
          ['Nguyên âm đơn (phần 1)'], ['Bài kiểm tra 2 - Phát âm', 'test'],
          ['Nguyên âm đơn (phần 2)'], ['Nguyên âm đơn (phần 3)'], ['Bài kiểm tra 3 - Phát âm', 'test'],
          ['Nguyên âm đôi'], ['Tổng kết âm nguyên âm'], ['Bài kiểm tra 4 - Phát âm', 'test'],
          ['Phụ âm (phần 1)'], ['Phụ âm (phần 2)'], ['Phụ âm (phần 3)'], ['Bài kiểm tra 5 - Phát âm', 'test'],
          ['Âm cuối'], ['Trọng âm'], ['Bài kiểm tra cuối khoá - Phát âm', 'test'],
        ],
      },
      {
        id: 'c1-tu-vung', title: 'Nền Tảng Từ Vựng', tag: '10 bài học · 5 bài kiểm tra',
        mediaModuleId: 't-v-ng-c-b-n',
        lessons: [
          ['Mở đầu khoá Từ vựng'], ['Thế giới tự nhiên'], ['Bài kiểm tra 1 - Từ vựng', 'test'],
          ['Hoạt động hàng ngày'], ['Gia đình'], ['Bài kiểm tra 2 - Từ vựng', 'test'],
          ['Kiến trúc và nội thất'], ['Sức khỏe'], ['Bài kiểm tra 3 - Từ vựng', 'test'],
          ['Cuộc sống sinh viên'], ['Thời gian rảnh rỗi'], ['Bài kiểm tra 4 - Từ vựng', 'test'],
          ['Công việc và đồng nghiệp'], ['Công nghệ'], ['Bài kiểm tra cuối khoá - Từ vựng', 'test'],
        ],
      },
      {
        id: 'c1-nghe-chep', title: 'Bài tập bổ trợ Nghe chép chính tả', tag: '15 bài học',
        mediaModuleId: 'b-b-i-t-p-b-tr-listening-gap-filling-c-b-n',
        lessons: Array.from({ length: 15 }, (_, i) => [`Bài nghe chép chính tả ${i + 1}`, 'di']),
      },
    ],
  },

  {
    id: 'chang-2',
    title: 'Chặng 2: IELTS Cơ Bản',
    icon: '⭐',
    color: 'cyan',
    desc: 'Xây dựng tư duy, phương pháp làm các dạng bài Listening + Reading + Speaking + Writing. Viết câu, phát triển ý mạch lạc và rèn cách mở rộng câu trả lời cho nhiều chủ đề.',
    courses: [
      {
        id: 'c2-reading', title: 'IELTS Reading cơ bản [2.5]', tag: '9 bài học · 4 bài kiểm tra',
        lessons: [
          ['Giới thiệu về kỹ năng IELTS Reading'], ['Xây dựng kĩ năng IELTS Reading'],
          ['Dạng bài Multiple Choice (MCQ)'], ['Bài kiểm tra tiến độ 1 - Reading', 'test'],
          ['Dạng bài điền từ (Completion)'], ['Dạng bài Matching Headings'], ['Bài kiểm tra tiến độ 2 - Reading', 'test'],
          ['Dạng bài Matching sentence endings'], ['Dạng bài Matching Features'], ['Bài kiểm tra tiến độ 3 - Reading', 'test'],
          ['Dạng bài Short-answer questions'], ['Dạng bài True/False/Not Given'], ['Kiểm tra cuối khóa - Reading', 'test'],
        ],
      },
      {
        id: 'c2-listening', title: 'IELTS Listening cơ bản [2.5]', tag: '9 bài học · 3 bài kiểm tra',
        lessons: [
          ['Giới thiệu về kỹ năng IELTS Listening'], ['Cần làm gì trước khi nghe?'],
          ['Nhận biết/Dự đoán paraphrasing'], ['Ngôn ngữ chỉ dẫn (Signposting language)'], ['Bài kiểm tra tiến độ 1 - Listening', 'test'],
          ['Điền từ vào chỗ trống'], ['Trả lời câu hỏi ngắn'], ['Xác nhận vị trí trên bản đồ'], ['Bài kiểm tra tiến độ 2 - Listening', 'test'],
          ['Nối đáp án (Matching)'], ['Câu hỏi trắc nghiệm (Multiple choice)'], ['Kiểm tra cuối khoá - Listening', 'test'],
        ],
      },
      {
        id: 'c2-speaking', title: 'IELTS Speaking cơ bản [2.5]', tag: '8 bài học · 18 bài kiểm tra',
        lessons: [
          ['Giới thiệu về kỹ năng IELTS Speaking'], ['Xây dựng kĩ năng IELTS Speaking'],
          ['Chủ đề: Work and study', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 1 - Luyện tập Part 1', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 2 - Luyện tập Part 2', 'sp'], ['Bài kiểm tra tiến độ lý thuyết 1 - Kĩ năng Speaking', 'test'],
          ['Chủ đề: Hometown', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 3 - Luyện tập Part 1', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 4 - Luyện tập Part 2', 'sp'], ['Bài kiểm tra tiến độ lý thuyết 2 - Kĩ năng Speaking', 'test'],
          ['Chủ đề: Family and friends', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 5 - Luyện tập Part 1', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 6 - Luyện tập Part 2', 'sp'], ['Bài kiểm tra tiến độ lý thuyết 3 - Kĩ năng Speaking', 'test'],
          ['Chủ đề: Holiday and travel', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 7 - Luyện tập Part 1', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 8 - Luyện tập Part 2', 'sp'], ['Bài kiểm tra tiến độ lý thuyết 4 - Kĩ năng Speaking', 'test'],
          ['Chủ đề: Free time', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 9 - Luyện tập Part 1', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 10 - Luyện tập Part 2', 'sp'], ['Bài kiểm tra tiến độ lý thuyết 5 - Kĩ năng Speaking', 'test'],
          ['Chủ đề: Weather', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 11 - Luyện tập Part 1', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 12 - Luyện tập Part 2', 'sp'], ['Bài kiểm tra cuối khoá - Speaking', 'test'],
        ],
      },
      {
        id: 'c2-writing', title: 'IELTS Writing cơ bản [2.5]', tag: '10 bài học · 9 bài kiểm tra',
        lessons: [
          ['Giới thiệu về kỹ năng IELTS Writing'], ['Cấu trúc của câu'], ['Cấu trúc của một đoạn văn'],
          ['Writing Task 1: Biểu đồ xu hướng'], ['Phòng ảo Writing Prep AI - Đề 1: Biểu đồ xu hướng', 'wr'],
          ['Writing task 1: Biểu đồ so sánh'], ['Phòng ảo Writing Prep AI - Đề 2: Biểu đồ so sánh', 'wr'],
          ['Writing task 1: Các dạng biểu đồ khác'], ['Phòng ảo Writing Prep AI - Đề 3: Miêu tả quy trình', 'wr'], ['Phòng ảo Writing Prep AI - Đề 4: Miêu tả bản đồ', 'wr'],
          ['Writing task 2: Dạng bài Opinion'], ['Phòng ảo Writing Prep AI - Đề 5: Dạng bài Opinion', 'wr'],
          ['Writing task 2: Dạng bài Advantages and disadvantages'], ['Phòng ảo Writing Prep AI - Đề 6: Dạng bài Advantages outweigh Disadvantages', 'wr'],
          ['Writing task 2: Dạng bài Discuss both views and give your own opinion'], ['Phòng ảo Writing Prep AI - Đề 7: Dạng Discuss both views and give your opinion', 'wr'],
          ['Writing Task 2: Dạng bài Problems - Causes - Solutions'], ['Phòng ảo Writing Prep AI - Đề 8: Dạng Causes - Effects', 'wr'],
          ['Phòng ảo Writing Prep AI - Đề 9 - Full test', 'wr'],
        ],
      },
      {
        id: 'c2-tu-vung', title: 'Từ Vựng Cơ Bản [2.5]', tag: '17 bài học · 5 bài kiểm tra',
        lessons: [
          ['Ngoại hình'], ['Tính cách và mối quan hệ xã hội'], ['Sự kiện, lễ kỉ niệm'], ['Nhà cửa'], ['Mini Test 1', 'test'],
          ['Thời tiết và khí hậu'], ['Cảm xúc và quan điểm'], ['Vui chơi giải trí'], ['Mua sắm'], ['Mini Test 2', 'test'],
          ['Ăn uống'], ['Sức khỏe'], ['Nghệ thuật và thể thao'], ['Giáo dục'], ['Mini Test 3', 'test'],
          ['Công việc'], ['Môi trường và thế giới tự nhiên'], ['Phim và truyền thông'], ['Mini Test 4', 'test'],
          ['Địa điểm, nơi chốn'], ['Phương tiện giao thông'], ['Final Test - Từ vựng', 'test'],
        ],
      },
      {
        id: 'c2-ngu-phap', title: 'Ngữ pháp Cơ Bản [2.5]', tag: '15 bài học · 4 bài kiểm tra',
        lessons: [
          ['So sánh'], ['Thì hiện tại'], ['Thì quá khứ'], ['Mind map 1', 'mm'], ['Bài kiểm tra 1', 'test'],
          ['Mạo từ a/an/the'], ['Động từ khuyết thiếu'], ['Giới từ'], ['Mind map 2', 'mm'], ['Bài kiểm tra 2', 'test'],
          ['Câu bị động'], ['Câu tường thuật'], ['Mệnh đề quan hệ'], ['Mind map 3', 'mm'], ['Bài kiểm tra 3', 'test'],
          ['Từ nối'], ['Câu điều kiện loại 1'], ['Mind map 4', 'mm'], ['Bài kiểm tra cuối khoá', 'test'],
        ],
      },
      {
        id: 'c2-phat-am', title: 'Phát âm Cơ Bản [2.5]', tag: '4 bài học · 2 bài kiểm tra',
        lessons: [
          ['Chunking'], ['Nối âm'], ['Progress Test', 'test'], ['Trọng âm câu'], ['Ngữ điệu'], ['Final Test - Phát âm', 'test'],
        ],
      },
    ],
  },

  {
    id: 'chang-3',
    title: 'Chặng 3: IELTS Trung Cấp',
    icon: '🌟',
    color: 'yellow',
    desc: 'Chiến lược xử lý nhanh gọn, chính xác các dạng bài toàn diện cả 4 kỹ năng. Writing nắm chắc 4 dạng biểu đồ, 4 dạng bài luận. Speaking nằm lòng 8 nhóm chủ điểm quan trọng xuất hiện trong 90% kỳ thi IELTS.',
    courses: [
      {
        id: 'c3-listening', title: 'IELTS Listening Trung cấp', tag: '9 bài học · 2 bài kiểm tra',
        lessons: [
          ['Giới thiệu về khoá Listening'], ['Dạng bài Completion'], ['Dạng bài Flowchart'], ['Dạng bài trả lời câu hỏi ngắn'],
          ['Dạng bài MCQ'], ['Dạng bài Pick from a list'], ['Bài kiểm tra - Listening', 'test'],
          ['Dạng bài Matching - Listening'], ['Dạng bài Labelling a map'], ['Dạng bài Labelling a diagram'], ['Bài kiểm tra cuối khoá - Listening', 'test'],
        ],
      },
      {
        id: 'c3-reading', title: 'IELTS Reading trung cấp [2.5]', tag: '7 bài học · 3 bài kiểm tra',
        lessons: [
          ['Giới thiệu về khoá Reading'], ['Xây dựng kĩ năng IELTS Reading'], ['Dạng bài: Điền từ vào chỗ trống'], ['Bài kiểm tra tiến độ 1 - Reading', 'test'],
          ['Dạng bài: Trả lời câu hỏi (Short Answer)'], ['Dạng bài: Matching - Reading'], ['Bài kiểm tra tiến độ 2 - Reading', 'test'],
          ['Dạng bài: Multiple Choice Questions'], ['Dạng bài: True/ False/ Not given - Yes/ No/ Not given'], ['Bài kiểm tra cuối khoá - Reading', 'test'],
        ],
      },
      {
        id: 'c3-speaking', title: 'IELTS Speaking Trung cấp', tag: 'Lý thuyết + Phòng ảo AI',
        lessons: [
          ['Phương pháp cải thiện điểm số'],
          ['Chủ đề: Work & Study', 'tp'], ['Kiểm tra lý thuyết tiến độ 1 - Kỹ năng Speaking', 'test'], ['Phòng ảo Speaking Prep AI - Đề 1', 'sp'],
          ['Chủ đề: Hobbies', 'tp'], ['Kiểm tra lý thuyết tiến độ 2 - Kỹ năng Speaking', 'test'], ['Phòng ảo Speaking Prep AI - Đề 2', 'sp'],
          ['Chủ đề: People', 'tp'], ['Kiểm tra lý thuyết tiến độ 3 - Kỹ năng Speaking', 'test'], ['Phòng ảo Speaking Prep AI - Đề 3', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 4', 'sp'],
          ['Chủ đề: Destination', 'tp'], ['Kiểm tra lý thuyết tiến độ 4 - Kỹ năng Speaking', 'test'], ['Phòng ảo Speaking Prep AI - Đề 5', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 6', 'sp'],
          ['Chủ đề: Buildings', 'tp'], ['Kiểm tra lý thuyết tiến độ 5 - Kỹ năng Speaking', 'test'], ['Phòng ảo Speaking Prep AI - Đề 7', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 8', 'sp'],
          ['Chủ đề: Objects', 'tp'], ['Kiểm tra lý thuyết tiến độ 6 - Kỹ năng Speaking', 'test'], ['Phòng ảo Speaking Prep AI - Đề 9', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 10', 'sp'],
          ['Kiểm tra cuối khoá - Lý thuyết kĩ năng Speaking', 'test'],
        ],
      },
      {
        id: 'c3-writing', title: 'IELTS Writing Trung cấp', tag: 'Task 1 + Task 2 + Phòng ảo AI',
        lessons: [
          ['Giới thiệu về Writing Task 1'], ['Writing Task 1 - Biểu đồ xu hướng'], ['Chữa đề: WT 1 - Biểu đồ xu hướng'], ['Phòng ảo Writing Prep AI - Đề 1: WT1 - Biểu đồ xu hướng', 'wr'],
          ['Writing Task 1 - Biểu đồ so sánh'], ['Phòng ảo Writing Prep AI - Đề 2: WT1 - Biểu đồ so sánh', 'wr'], ['Bài kiểm tra tiến độ 1 - Writing', 'test'],
          ['Writing Task 1 - Dạng tổng hợp các loại biểu đồ'], ['Phòng ảo Writing Prep AI - Đề 3: WT1 - Mixed Charts', 'wr'],
          ['Writing Task 1 - Miêu tả bản đồ'], ['Phòng ảo Writing Prep AI - Đề 4: WT 1 - Miêu tả bản đồ', 'wr'],
          ['Writing Task 1 - Miêu tả quy trình'], ['Bài kiểm tra tiến độ 2 - Writing', 'test'],
          ['Giới thiệu về Writing Task 2'], ['Writing Task 2 - Dạng bài nghị luận'], ['Phòng ảo Writing Prep AI - Đề 5: WT2 - To what extent do you agree/disagree?', 'wr'],
          ['Writing Task 2 - Dạng bài thảo luận'], ['Phòng ảo Writing Prep AI - Đề 6: WT 2 - Advantages and Disadvantages', 'wr'],
          ['Writing Task 2: Dạng bài Discuss both views and give your opinion'], ['Phòng ảo Writing Prep AI - Đề 7: WT2 - Discuss both views and give your own opinion', 'wr'], ['Bài kiểm tra tiến độ 3 - Writing', 'test'],
          ['Writing Task 2 - Dạng bài Problem/Causes - Solution'], ['Phòng ảo Writing Prep AI - Đề 8: WT2 - Problem/ Cause - Solution', 'wr'],
          ['Writing Task 2 - Dạng bài gồm 2 câu hỏi'], ['Bài kiểm tra cuối khoá - Writing', 'test'], ['Phòng ảo Writing Prep AI - Đề 9 - Full test', 'wr'],
        ],
      },
    ],
  },

  {
    id: 'chang-4',
    title: 'Chặng 4: IELTS Chuyên Sâu',
    icon: '🏆',
    color: 'pink',
    desc: 'Làm chủ mọi kỹ năng Skimming, Scanning và Read in details. Brainstorm và phát triển ý tưởng hiệu quả. Làm chủ ngôn ngữ, tăng tốc độ nói cùng các kỹ năng chuyên sâu.',
    courses: [
      {
        id: 'c4-listening', title: 'IELTS - Listening chuyên sâu', tag: '10 bài học · 3 bài kiểm tra',
        lessons: [
          ['Giới thiệu khoá học - Listening'], ['Form Filling'], ['Further practice: Form Filling'], ['Multiple Choice Questions - Part 2'], ['Progress test 1 - Listening', 'test'],
          ['Multiple Choice Questions - Part 3'], ['Labelling a map/diagram'], ['Matching information'], ['Sentence completion, short answer question'], ['Progress test 2 - Listening', 'test'],
          ['Summary/Table completion, Flow-chart'], ['Note completion'], ['Final test - Listening', 'test'],
        ],
      },
      {
        id: 'c4-reading', title: 'IELTS - Reading Chuyên sâu', tag: '10 bài học · 3 bài kiểm tra',
        lessons: [
          ['Giới thiệu khóa học & Hướng dẫn học - Reading'], ['Reading passage 1: T/F/NG, Short answer'], ['Reading Passage 1: T/F/NG, Table/ Note/ Summary Completion'], ['Reading passage 2: Matching information, Sentence completion'], ['Progress Test 1 - Reading', 'test'],
          ['Reading passage 2: MCQ, Summary completion, Y/N/NG'], ['Reading passage 3: Matching information, MCQ, Summary'], ['Reading passage 3: Summary, MCQ, matching sentence endings'], ['Progress Test 2 - Reading', 'test'],
          ['Reading passage 3: Matching features, YNNG, summary'], ['Reading passage 1 lạ: Xuất hiện matching và YNNG'], ['Reading passage 3: Matching headings, sentence completion, TFNG'], ['Final Test Reading', 'test'],
        ],
      },
      {
        id: 'c4-speaking', title: 'IELTS Speaking Chuyên sâu [2.5]', tag: '11 bài học · 10 bài kiểm tra',
        lessons: [
          ['Giới thiệu khoá học - Speaking'],
          ['Chủ đề: Work & Study', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 1 - Full test', 'sp'],
          ['Chủ đề: People', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 2 - Full test', 'sp'],
          ['Chủ đề: Places', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 3 - Full test', 'sp'], ['Kiểm tra giữa khoá - Speaking', 'test'],
          ['Chủ đề: Events', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 4 - Full test', 'sp'],
          ['Chủ đề: Media & Hobbies', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 5 - Full test', 'sp'],
          ['Chủ đề: Objects', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 6 - Full test', 'sp'],
          ['Chủ đề khác', 'tp'], ['Phòng ảo Speaking Prep AI - Đề 7 - Full test', 'sp'], ['Phòng ảo Speaking Prep AI - Đề 8 - Full test', 'sp'], ['Final Test - Speaking', 'test'],
          ['Bonus - Holiday: Christmas Vocabulary', 'bn'], ['Bonus: Bí kíp để tăng điểm số - Sử dụng discourse markers', 'bn'], ['Bonus: Bí kíp để tăng điểm số - Làm thế nào để tránh các lỗi phát âm thường gặp', 'bn'],
        ],
      },
      {
        id: 'c4-writing', title: 'IELTS Writing Chuyên sâu [2.5]', tag: '19 bài học · 18 bài kiểm tra',
        lessons: [
          ['Các dạng bài phổ biến trong IELTS Writing'], ['Tiêu chí chấm điểm cho kĩ năng Viết'], ['Phong cách viết Học thuật'],
          ['Writing task 2: Advantages and Disadvantages'], ['Luyện tập bổ sung: WT2 - Advantages and disadvantages'], ['Phòng ảo Writing Prep AI - Đề 1: WT2 - Advantages & Disadvantages', 'wr'], ['Bài ôn tập 1', 'test'],
          ['Writing task 2: Discuss both views and give your opinion'], ['Luyện tập bổ sung Writing task 2: Discuss both views and give your opinion'], ['Phòng ảo Writing Prep AI - Đề 2: WT2 - Discuss both views and give your own opinion', 'wr'], ['Bài ôn tập 2', 'test'],
          ['Writing task 2: To what extent do you agree/disagree'], ['Luyện tập bổ sung Writing task 2: To what extent do you agree/disagree'], ['Phòng ảo Writing Prep AI - Đề 3: WT2 - To what extent do you agree/disagree?', 'wr'], ['Bài ôn tập 3', 'test'],
          ['Writing Task 2: Problem - Solution'], ['Luyện tập bổ sung: Writing Task 2: Problem - Solution'], ['Bài ôn tập 4', 'test'],
          ['Writing Task 2: Dạng để bài gồm 2 câu hỏi'], ['Luyện tập bổ sung: Writing Task 2 - Dạng đề bài gồm 2 câu hỏi'], ['Phòng ảo Writing Prep AI - Đề 4: WT2 - Dạng đề bài gồm 2 câu hỏi', 'wr'], ['Bài ôn tập 5', 'test'],
          ['Học một biết nhiều - Bí kíp nâng band điểm WT2 ở đây nha!', 'bn'],
          ['Writing Task 1: Graphs with a trend'], ['Phòng ảo Writing Prep AI - Đề 5: WT1 - Graphs with a trend', 'wr'], ['Bài ôn tập 6', 'test'],
          ['Writing Task 1: Comparative Graphs'], ['Phòng ảo Writing Prep AI - Đề 6: WT1 - Comparative Graphs', 'wr'], ['Bài ôn tập 7', 'test'],
          ['Writing Task 1: Process'], ['Phòng ảo Writing Prep AI - Đề 7: WT1 - Process Diagram', 'wr'], ['Bài ôn tập 8', 'test'],
          ['Writing Task 1: Maps'], ['Phòng ảo Writing Prep AI - Đề 8: WT1 - Maps', 'wr'], ['Bài ôn tập 9', 'test'],
          ['Bonus: Chân ái nâng điểm WT1 là đây chứ đâu!', 'bn'], ['Phòng ảo Writing Prep AI - Đề 9 - Full test', 'wr'],
        ],
      },
      {
        id: 'c4-tu-vung', title: 'Từ vựng Chuyên sâu', tag: '19 bài học · 5 bài kiểm tra',
        lessons: [
          ['Bảy phương pháp học từ vựng hiệu quả'], ['Từ nối'], ['Thời gian'], ['Cơ thể con người'], ['Mini Test 1 - Từ vựng', 'test'],
          ['Cảm xúc và quan điểm'], ['Mối quan hệ trong cuộc sống'], ['Mini Test 2 - Từ vựng', 'test'],
          ['Ăn uống'], ['Giải trí'], ['Văn hoá và du lịch'], ['Mini Test 3 - Từ vựng', 'test'],
          ['Nhà cửa và xây dựng'], ['Truyền thông và xã hội'], ['Chính trị và chiến tranh'], ['Mini Test 4 - Từ vựng', 'test'],
          ['Tội ác và hình phạt'], ['Giáo dục'], ['Mini Test 5 - Từ vựng', 'test'],
          ['Môi trường và các vấn đề liên quan'], ['Khoa học và công nghệ'], ['Nghề nghiệp và kinh tế'], ['Cơ sở hạ tầng'], ['Final Test - Từ vựng', 'test'],
        ],
      },
      {
        id: 'c4-ngu-phap', title: 'Ngữ pháp nâng cao [2.5]', tag: '18 bài học · 5 bài kiểm tra',
        lessons: [
          ['Thời hiện tại hoàn thành tiếp diễn'], ['Quá khứ hoàn thành tiếp diễn'], ['Tương lai hoàn thành'], ['Mind map 1', 'mm'], ['Mini Test 1 - Ngữ pháp', 'test'],
          ['Câu tường thuật'], ['Câu điều kiện'], ['Mệnh đề quan hệ'], ['Mind map 2', 'mm'], ['Mini Test 2 - Ngữ pháp', 'test'],
          ['Cấu trúc song song'], ['Sự hoà hợp giữa chủ ngữ và động từ'], ['Mind map 3', 'mm'], ['Mini test 3 - Ngữ pháp', 'test'],
          ['Mệnh đề danh từ'], ['Trạng từ và mệnh đề trạng ngữ'], ['Tính từ phân cấp và không phân cấp'], ['Mind map 4', 'mm'], ['Mini test 4 - Ngữ pháp', 'test'],
          ['Giới từ'], ['Những lỗi phổ biến khi viết câu'], ['Mind map 5', 'mm'], ['Final test - Ngữ pháp', 'test'],
        ],
      },
      {
        id: 'c4-phat-am', title: 'Phát âm nâng cao [2.5]', tag: '2 bài học',
        lessons: [['Ngữ điệu nâng cao'], ['Nối âm nâng cao']],
      },
      {
        id: 'c4-mock', title: 'IELTS - Mock test cuối khóa Lộ trình Chuyên sâu', tag: '1 bài kiểm tra',
        lessons: [['Mock Test 4 Kỹ năng chuyên sâu', 'test']],
      },
    ],
  },
];

export default ieltsRoadmap;
