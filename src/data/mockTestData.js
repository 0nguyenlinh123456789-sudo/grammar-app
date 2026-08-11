// File: src/data/mockTestData.js
// Đề thi thử rút gọn (mini mock test) cho VSTEP và IELTS.
// Mỗi đề: 20 câu, 4 phần (Listening / Grammar / Vocabulary / Reading).
// Câu Listening có `audioText` — đọc bằng giọng máy (TTS) khi làm bài, học
// viên không nhìn thấy chữ cho tới khi xem lại đáp án.
// Cấu trúc câu: { id, section, prompt, options[], answer (index), explanation, audioText? }

export const MOCK_TESTS = [
  {
    id: 'vstep-b1b2',
    name: 'VSTEP B1–B2',
    subtitle: 'Đề mini 20 câu · 20 phút',
    minutes: 20,
    color: 'bg-emerald-400',
    questions: [
      // --- LISTENING (5) ---
      { id: 'v1', section: 'listening', audioText: 'The meeting has been moved from Tuesday morning to Thursday afternoon.', prompt: 'Cuộc họp được dời sang khi nào?', options: ['Sáng thứ Ba', 'Chiều thứ Năm', 'Sáng thứ Năm', 'Chiều thứ Ba'], answer: 1, explanation: '“moved from Tuesday morning to Thursday afternoon” — dời sang chiều thứ Năm.' },
      { id: 'v2', section: 'listening', audioText: 'I would like a return ticket to Da Nang, leaving on the fifteenth.', prompt: 'Người nói muốn mua loại vé nào?', options: ['Vé một chiều', 'Vé khứ hồi', 'Vé tháng', 'Vé trẻ em'], answer: 1, explanation: '“a return ticket” là vé khứ hồi.' },
      { id: 'v3', section: 'listening', audioText: 'Unfortunately, the library will be closed for repairs until the end of the month.', prompt: 'Vì sao thư viện đóng cửa?', options: ['Vì ngày lễ', 'Để sửa chữa', 'Vì thiếu nhân viên', 'Để kiểm kê sách'], answer: 1, explanation: '“closed for repairs” — đóng cửa để sửa chữa.' },
      { id: 'v4', section: 'listening', audioText: 'You should take the second turning on the left, and the post office is opposite the bank.', prompt: 'Bưu điện nằm ở đâu?', options: ['Bên cạnh ngân hàng', 'Đối diện ngân hàng', 'Phía sau ngân hàng', 'Trong ngân hàng'], answer: 1, explanation: '“opposite the bank” — đối diện ngân hàng.' },
      { id: 'v5', section: 'listening', audioText: 'The training course costs two hundred dollars, but students get a twenty percent discount.', prompt: 'Sinh viên được giảm bao nhiêu?', options: ['2 phần trăm', '12 phần trăm', '20 phần trăm', '200 đô la'], answer: 2, explanation: '“a twenty percent discount” — giảm 20%.' },
      // --- GRAMMAR (5) ---
      { id: 'v6', section: 'grammar', prompt: 'She suggested ___ the meeting until next week.', options: ['to postpone', 'postponing', 'postpone', 'postponed'], answer: 1, explanation: 'Sau “suggest” dùng V-ing: suggest doing something.' },
      { id: 'v7', section: 'grammar', prompt: 'If the weather ___ better, we would have gone hiking.', options: ['was', 'had been', 'were', 'has been'], answer: 1, explanation: 'Câu điều kiện loại 3: If + had + V3, would have + V3.' },
      { id: 'v8', section: 'grammar', prompt: 'This is the colleague ___ helped me with the report.', options: ['which', 'whose', 'who', 'whom'], answer: 2, explanation: '“who” làm chủ ngữ trong mệnh đề quan hệ chỉ người.' },
      { id: 'v9', section: 'grammar', prompt: 'Not only ___ late, but he also forgot the documents.', options: ['he was', 'was he', 'he is', 'is he'], answer: 1, explanation: 'Đảo ngữ sau “Not only”: Not only + trợ động từ + chủ ngữ.' },
      { id: 'v10', section: 'grammar', prompt: 'The new policy will come ___ effect next January.', options: ['in', 'into', 'on', 'at'], answer: 1, explanation: 'Cụm cố định “come into effect” — có hiệu lực.' },
      // --- VOCABULARY (5) ---
      { id: 'v11', section: 'vocabulary', prompt: '“To be in charge of” something means to:', options: ['pay for it', 'be responsible for it', 'complain about it', 'be interested in it'], answer: 1, explanation: 'In charge of = chịu trách nhiệm về.' },
      { id: 'v12', section: 'vocabulary', prompt: 'The company is trying to ___ costs without cutting jobs.', options: ['reduce', 'refuse', 'release', 'remove'], answer: 0, explanation: 'reduce costs = cắt giảm chi phí.' },
      { id: 'v13', section: 'vocabulary', prompt: 'A person who is “punctual” always:', options: ['works hard', 'arrives on time', 'speaks politely', 'pays attention'], answer: 1, explanation: 'Punctual = đúng giờ.' },
      { id: 'v14', section: 'vocabulary', prompt: 'We had to ___ the trip because of the storm.', options: ['call off', 'call on', 'call up', 'call for'], answer: 0, explanation: 'call off = hủy bỏ.' },
      { id: 'v15', section: 'vocabulary', prompt: '“Sufficient” is closest in meaning to:', options: ['enough', 'expensive', 'sudden', 'similar'], answer: 0, explanation: 'Sufficient = đủ.' },
      // --- READING (5) ---
      { id: 'v16', section: 'reading', prompt: '“Employees who wish to take annual leave must inform their manager at least two weeks in advance.” Nhân viên phải làm gì?', options: ['Xin phép sau khi nghỉ', 'Báo quản lý trước ít nhất 2 tuần', 'Nộp đơn cho phòng nhân sự', 'Không cần báo trước'], answer: 1, explanation: '“inform their manager at least two weeks in advance”.' },
      { id: 'v17', section: 'reading', prompt: '“The city plans to plant 10,000 trees to improve air quality and reduce summer temperatures.” Mục đích của kế hoạch là gì?', options: ['Tăng doanh thu du lịch', 'Cải thiện không khí và giảm nhiệt độ', 'Xây thêm công viên', 'Tạo việc làm mới'], answer: 1, explanation: '“to improve air quality and reduce summer temperatures”.' },
      { id: 'v18', section: 'reading', prompt: '“Although online shopping is convenient, many customers still prefer to see products in person.” Ý chính của câu?', options: ['Mua sắm online luôn tốt hơn', 'Nhiều khách vẫn thích xem hàng trực tiếp', 'Cửa hàng đang đóng cửa', 'Khách hàng không tin online'], answer: 1, explanation: 'Mệnh đề chính nhấn mạnh “still prefer to see products in person”.' },
      { id: 'v19', section: 'reading', prompt: '“Applicants without relevant experience will not be considered for this position.” Ai sẽ KHÔNG được xét?', options: ['Người có kinh nghiệm', 'Người không có kinh nghiệm liên quan', 'Người mới tốt nghiệp', 'Tất cả ứng viên'], answer: 1, explanation: '“without relevant experience will not be considered”.' },
      { id: 'v20', section: 'reading', prompt: '“The workshop is free, but registration is required in advance.” Điều nào đúng?', options: ['Phải trả phí và đăng ký', 'Miễn phí nhưng phải đăng ký trước', 'Miễn phí, không cần đăng ký', 'Chỉ dành cho nhân viên'], answer: 1, explanation: 'free = miễn phí; registration is required = phải đăng ký trước.' },
    ],
  },
  {
    id: 'ielts-mini',
    name: 'IELTS Mini',
    subtitle: 'Đề mini 20 câu · 25 phút',
    minutes: 25,
    color: 'bg-blue-400',
    questions: [
      // --- LISTENING (5) ---
      { id: 'i1', section: 'listening', audioText: 'The lecture on climate policy will take place in room B twelve, not room B twenty.', prompt: 'Bài giảng diễn ra ở phòng nào?', options: ['B12', 'B20', 'B2', 'B22'], answer: 0, explanation: '“room B twelve, not room B twenty” — phòng B12.' },
      { id: 'i2', section: 'listening', audioText: 'Please note that the deadline for the essay has been extended by one week.', prompt: 'Hạn nộp bài luận thế nào?', options: ['Bị rút ngắn 1 tuần', 'Được gia hạn 1 tuần', 'Giữ nguyên', 'Bị hủy'], answer: 1, explanation: '“extended by one week” — gia hạn thêm một tuần.' },
      { id: 'i3', section: 'listening', audioText: 'Most participants said the accommodation was excellent, although the food was rather disappointing.', prompt: 'Người tham gia đánh giá thế nào?', options: ['Cả chỗ ở và đồ ăn đều tốt', 'Chỗ ở tốt nhưng đồ ăn kém', 'Chỗ ở kém, đồ ăn ngon', 'Cả hai đều tệ'], answer: 1, explanation: 'accommodation excellent nhưng food rather disappointing.' },
      { id: 'i4', section: 'listening', audioText: 'The research suggests that regular exercise improves memory more than diet alone.', prompt: 'Nghiên cứu cho thấy điều gì cải thiện trí nhớ nhiều hơn?', options: ['Chỉ ăn kiêng', 'Tập thể dục đều đặn', 'Ngủ nhiều', 'Uống thuốc bổ'], answer: 1, explanation: '“regular exercise improves memory more than diet alone”.' },
      { id: 'i5', section: 'listening', audioText: 'Tickets are available online at twelve pounds fifty, or fifteen pounds at the door.', prompt: 'Mua vé online giá bao nhiêu?', options: ['12,50 bảng', '15 bảng', '12 bảng', '50 bảng'], answer: 0, explanation: '“online at twelve pounds fifty”.' },
      // --- GRAMMAR (5) ---
      { id: 'i6', section: 'grammar', prompt: 'The number of applicants ___ increased significantly this year.', options: ['have', 'has', 'are', 'were'], answer: 1, explanation: '“The number of + N” là số ít → has.' },
      { id: 'i7', section: 'grammar', prompt: 'Rarely ___ such a well-organised conference.', options: ['I have attended', 'have I attended', 'I attended', 'did I attending'], answer: 1, explanation: 'Đảo ngữ với trạng từ phủ định “Rarely”.' },
      { id: 'i8', section: 'grammar', prompt: 'The results, ___ were published last week, surprised researchers.', options: ['that', 'which', 'who', 'what'], answer: 1, explanation: 'Mệnh đề quan hệ không xác định dùng “which”, không dùng “that”.' },
      { id: 'i9', section: 'grammar', prompt: 'Governments should invest more in renewable energy ___ reduce emissions.', options: ['so as to', 'so that to', 'in order for', 'for to'], answer: 0, explanation: '“so as to + V” diễn tả mục đích.' },
      { id: 'i10', section: 'grammar', prompt: '___ the heavy rain, the outdoor event continued as planned.', options: ['Although', 'Despite', 'However', 'Because of'], answer: 1, explanation: 'Despite + danh từ (the heavy rain).' },
      // --- VOCABULARY (5) ---
      { id: 'i11', section: 'vocabulary', prompt: 'A “significant” increase means the increase is:', options: ['very small', 'important and noticeable', 'temporary', 'unexpected'], answer: 1, explanation: 'Significant = đáng kể, quan trọng.' },
      { id: 'i12', section: 'vocabulary', prompt: 'The graph shows a ___ decline in sales after 2019.', options: ['sharp', 'sharply', 'sharpen', 'sharpness'], answer: 0, explanation: 'Cần tính từ bổ nghĩa cho danh từ “decline”: a sharp decline.' },
      { id: 'i13', section: 'vocabulary', prompt: '“To alleviate” a problem means to:', options: ['make it worse', 'make it less severe', 'ignore it', 'explain it'], answer: 1, explanation: 'Alleviate = làm giảm nhẹ.' },
      { id: 'i14', section: 'vocabulary', prompt: 'Which word best completes: “The findings are ___ with previous studies.”', options: ['consistent', 'constant', 'continuous', 'contained'], answer: 0, explanation: '“consistent with” = nhất quán với.' },
      { id: 'i15', section: 'vocabulary', prompt: '“Widespread” is closest in meaning to:', options: ['common over a large area', 'very expensive', 'happening quickly', 'strictly limited'], answer: 0, explanation: 'Widespread = lan rộng, phổ biến trên diện rộng.' },
      // --- READING (5) ---
      { id: 'i16', section: 'reading', prompt: '“While solar power has become cheaper, storage remains the main obstacle to wider adoption.” Trở ngại chính là gì?', options: ['Giá điện mặt trời', 'Việc lưu trữ điện', 'Thiếu ánh nắng', 'Chính sách thuế'], answer: 1, explanation: '“storage remains the main obstacle”.' },
      { id: 'i17', section: 'reading', prompt: '“Researchers concluded that the benefits outweigh the risks in most cases.” Kết luận là gì?', options: ['Rủi ro lớn hơn lợi ích', 'Lợi ích lớn hơn rủi ro trong đa số trường hợp', 'Không có rủi ro', 'Cần nghiên cứu lại'], answer: 1, explanation: '“benefits outweigh the risks in most cases”.' },
      { id: 'i18', section: 'reading', prompt: '“Unlike its predecessor, the new model consumes far less energy.” Điều gì đúng về mẫu mới?', options: ['Tốn điện hơn mẫu cũ', 'Ít tốn điện hơn mẫu cũ', 'Giống hệt mẫu cũ', 'Đắt hơn mẫu cũ'], answer: 1, explanation: '“consumes far less energy” so với mẫu trước.' },
      { id: 'i19', section: 'reading', prompt: '“The survey, conducted among 2,000 students, revealed a strong preference for flexible schedules.” Ai được khảo sát?', options: ['2.000 giáo viên', '2.000 sinh viên', '200 sinh viên', 'Toàn trường'], answer: 1, explanation: '“conducted among 2,000 students”.' },
      { id: 'i20', section: 'reading', prompt: '“Critics argue that the policy, however well-intentioned, is unlikely to succeed.” Thái độ của người phê bình?', options: ['Hoàn toàn ủng hộ', 'Hoài nghi về hiệu quả', 'Trung lập', 'Không quan tâm'], answer: 1, explanation: '“is unlikely to succeed” — hoài nghi khả năng thành công.' },
    ],
  },
];

export const SECTION_LABELS = {
  listening: '🎧 Nghe hiểu',
  grammar: '📖 Ngữ pháp',
  vocabulary: '🔤 Từ vựng',
  reading: '📄 Đọc hiểu',
};
