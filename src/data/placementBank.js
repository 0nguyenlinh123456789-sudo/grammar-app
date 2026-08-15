// File: src/data/placementBank.js
// NGÂN HÀNG CÂU HỎI TEST ĐẦU VÀO — mỗi câu GẮN NHÃN BẬC CEFR (việc 4.1).
//
// Thay cho `placementQuestions.js` cũ: 12 câu, KHÔNG câu nào có nhãn bậc, và
// trình độ được suy ra từ phần trăm đúng. Hậu quả: không tách nổi B2 với C1, và
// một người trả lời đúng 7/12 câu thì không ai biết 7 câu đó khó tới đâu.
// 12 câu cũ vẫn nằm trong ngân hàng này, nay đã được gắn bậc (xem `origin: 'v1'`).
//
// Mỗi bậc 10 câu = 4 ngữ pháp + 3 từ vựng + 3 đọc hiểu. Bộ máy thích ứng
// (src/utils/placementAdaptive.js) hỏi 2 câu/kỹ năng cho mỗi vòng, nên MỖI BẬC
// PHẢI CÓ ≥2 CÂU CHO MỖI KỸ NĂNG — `tests/placement_bank.test.js` ghim điều đó.
//
// CHỈ ĐO ĐƯỢC 3 THỨ: ngữ pháp, từ vựng, đọc hiểu.
// Nghe/nói/viết KHÔNG có trong bài này và cũng không được suy ra từ đây. Kho
// hiện chưa có một file âm thanh giọng người thật nào (việc 2.1, Đợt 3) và
// chưa có ngân hàng đề viết/nói (việc 3.3/3.5, Đợt 4). Đo bằng giọng máy đọc
// rồi gọi đó là "điểm nghe" chính là kiểu thay thế âm thầm mà cả chuỗi dọn
// nội dung vừa rồi dựng lên để chặn. Hồ sơ năng lực ghi thẳng "chưa đo được".
export const placementBank = [
  // ---------------------------------------------------------------- A1 (10)
  { id: 'a1_g1', cefr: 'A1', skill: 'grammar', prompt: 'My sister ___ a teacher.', options: ['is', 'am', 'are', 'be'], answer: 0, explanation: 'Chủ ngữ số ít ngôi thứ ba đi với “is”.' },
  { id: 'a1_g2', cefr: 'A1', skill: 'grammar', prompt: '___ you like coffee?', options: ['Do', 'Does', 'Is', 'Are'], answer: 0, explanation: 'Câu hỏi thì hiện tại đơn với “you” dùng trợ động từ “Do”.' },
  { id: 'a1_g3', cefr: 'A1', skill: 'grammar', prompt: 'There ___ two books on the table.', options: ['is', 'are', 'be', 'am'], answer: 1, explanation: '“Two books” số nhiều nên dùng “There are”.' },
  { id: 'a1_g4', cefr: 'A1', skill: 'grammar', prompt: 'She ___ to school every day.', options: ['go', 'goes', 'going', 'gone'], answer: 1, explanation: 'Hiện tại đơn, chủ ngữ ngôi thứ ba số ít thêm “-es”.' },
  { id: 'a1_v1', cefr: 'A1', skill: 'vocabulary', prompt: 'Từ nào chỉ MÀU SẮC?', options: ['blue', 'table', 'run', 'happy'], answer: 0, explanation: '“Blue” nghĩa là màu xanh dương.' },
  { id: 'a1_v2', cefr: 'A1', skill: 'vocabulary', prompt: '“Monday” là ngày nào trong tuần?', options: ['Thứ Hai', 'Thứ Ba', 'Chủ Nhật', 'Thứ Sáu'], answer: 0, explanation: 'Monday = Thứ Hai.' },
  { id: 'a1_v3', cefr: 'A1', skill: 'vocabulary', prompt: 'We eat breakfast in the ___.', options: ['morning', 'night', 'evening', 'afternoon'], answer: 0, explanation: 'Breakfast là bữa sáng, ăn vào buổi sáng.' },
  { id: 'a1_r1', cefr: 'A1', skill: 'reading', prompt: '“The shop opens at 9 a.m. and closes at 6 p.m.” Cửa hàng mở cửa lúc mấy giờ?', options: ['9 giờ sáng', '6 giờ chiều', '9 giờ tối', '6 giờ sáng'], answer: 0, explanation: '“Opens at 9 a.m.” = mở cửa lúc 9 giờ sáng.' },
  { id: 'a1_r2', cefr: 'A1', skill: 'reading', prompt: '“Tom has a dog. Its name is Max.” What is the dog’s name?', options: ['Tom', 'Max', 'Dog', 'It'], answer: 1, explanation: '“Its name is Max” — con chó tên Max.' },
  { id: 'a1_r3', cefr: 'A1', skill: 'reading', prompt: 'Biển ghi “No photos.” nghĩa là gì?', options: ['Không chụp ảnh', 'Miễn phí vào cửa', 'Cấm hút thuốc', 'Lối ra'], answer: 0, explanation: '“No photos” = không được chụp ảnh.' },

  // ---------------------------------------------------------------- A2 (10)
  { id: 'a2_g1', cefr: 'A2', skill: 'grammar', prompt: 'I ___ to Da Nang last summer.', options: ['go', 'went', 'have gone', 'will go'], answer: 1, explanation: '“Last summer” là mốc quá khứ → quá khứ đơn “went”.' },
  { id: 'a2_g2', cefr: 'A2', skill: 'grammar', prompt: 'This book is ___ than that one.', options: ['interesting', 'more interesting', 'most interesting', 'the interesting'], answer: 1, explanation: 'So sánh hơn của tính từ dài: “more + tính từ + than”.' },
  { id: 'a2_g3', cefr: 'A2', skill: 'grammar', prompt: 'She is good ___ playing the guitar.', options: ['at', 'on', 'in', 'for'], answer: 0, explanation: 'Cụm cố định “be good at + V-ing”.' },
  { id: 'a2_g4', cefr: 'A2', skill: 'grammar', prompt: 'You ___ wear a helmet when you ride a motorbike.', options: ['must', 'can', 'might', 'would'], answer: 0, explanation: '“Must” diễn tả bắt buộc theo luật.' },
  { id: 'a2_v1', cefr: 'A2', skill: 'vocabulary', prompt: 'The opposite of “cheap” is:', options: ['expensive', 'small', 'quiet', 'early'], answer: 0, explanation: 'Cheap (rẻ) ↔ expensive (đắt).' },
  { id: 'a2_v2', cefr: 'A2', skill: 'vocabulary', prompt: 'We ___ the bus at the corner every morning.', options: ['catch', 'make', 'do', 'bring'], answer: 0, explanation: 'Cụm cố định “catch the bus” = bắt xe buýt.' },
  { id: 'a2_v3', cefr: 'A2', skill: 'vocabulary', prompt: 'A person who cooks in a restaurant is a ___.', options: ['chef', 'waiter', 'guest', 'farmer'], answer: 0, explanation: 'Chef = đầu bếp; waiter là người phục vụ bàn.' },
  { id: 'a2_r1', cefr: 'A2', skill: 'reading', prompt: '“The train to Hue leaves at 7:15. Please arrive 20 minutes early.” Bạn nên có mặt lúc mấy giờ?', options: ['6:55', '7:15', '7:35', '6:15'], answer: 0, explanation: 'Sớm hơn 7:15 hai mươi phút là 6:55.' },
  { id: 'a2_r2', cefr: 'A2', skill: 'reading', prompt: '“Lan usually walks to work, but when it rains she takes a taxi.” Khi trời mưa Lan làm gì?', options: ['Đi taxi', 'Đi bộ', 'Ở nhà', 'Đi xe đạp'], answer: 0, explanation: '“When it rains she takes a taxi.”' },
  { id: 'a2_r3', cefr: 'A2', skill: 'reading', prompt: '“Sale: buy two shirts, get one free.” What do you get if you buy two shirts?', options: ['One extra shirt for free', 'Two free shirts', 'Half price on everything', 'Free delivery'], answer: 0, explanation: '“Get one free” = được tặng thêm một chiếc.' },

  // ---------------------------------------------------------------- B1 (10)
  { id: 'b1_g1', cefr: 'B1', skill: 'grammar', prompt: 'She has worked here ___ 2021.', options: ['for', 'since', 'during', 'from'], answer: 1, explanation: '“Since” đi với mốc thời gian.', origin: 'v1' },
  { id: 'b1_g2', cefr: 'B1', skill: 'grammar', prompt: 'If it rains tomorrow, we ___ the picnic.', options: ['cancel', 'will cancel', 'would cancel', 'cancelled'], answer: 1, explanation: 'Câu điều kiện loại 1: “If + hiện tại đơn, will + V”.' },
  { id: 'b1_g3', cefr: 'B1', skill: 'grammar', prompt: 'The report ___ by the team yesterday.', options: ['completed', 'has completed', 'was completed', 'is completing'], answer: 2, explanation: 'Bị động quá khứ: was + past participle.', origin: 'v1' },
  { id: 'b1_g4', cefr: 'B1', skill: 'grammar', prompt: 'He asked me where I ___.', options: ['live', 'lived', 'do live', 'am live'], answer: 1, explanation: 'Câu tường thuật lùi thì: live → lived.' },
  { id: 'b1_v1', cefr: 'B1', skill: 'vocabulary', prompt: 'The word “reliable” is closest in meaning to:', options: ['expensive', 'trustworthy', 'temporary', 'difficult'], answer: 1, explanation: 'Reliable nghĩa là đáng tin cậy.', origin: 'v1' },
  { id: 'b1_v2', cefr: 'B1', skill: 'vocabulary', prompt: 'We need to ___ a decision before Friday.', options: ['do', 'make', 'take up', 'put'], answer: 1, explanation: 'Cụm cố định là “make a decision”.', origin: 'v1' },
  { id: 'b1_v3', cefr: 'B1', skill: 'vocabulary', prompt: 'An “emission” is:', options: ['a type of payment', 'something released into the air', 'a written contract', 'a meeting'], answer: 1, explanation: 'Emission thường chỉ khí/chất thải được thải ra.', origin: 'v1' },
  { id: 'b1_r1', cefr: 'B1', skill: 'reading', prompt: '“Although the plan was costly, it reduced delays.” What reduced delays?', options: ['The cost', 'The plan', 'The delay', 'The schedule'], answer: 1, explanation: 'Chủ ngữ của mệnh đề chính là the plan.', origin: 'v1' },
  { id: 'b1_r2', cefr: 'B1', skill: 'reading', prompt: '“Applicants must submit forms online; paper copies are not accepted.” What is required?', options: ['A paper copy', 'An online form', 'A phone call', 'No form'], answer: 1, explanation: 'Ứng viên phải nộp biểu mẫu trực tuyến.', origin: 'v1' },
  { id: 'b1_r3', cefr: 'B1', skill: 'reading', prompt: '“The museum is free on the first Sunday of each month; on other days tickets cost 50,000 VND.” Đi vào Chủ Nhật thứ HAI của tháng thì sao?', options: ['Phải mua vé 50.000 đồng', 'Được vào miễn phí', 'Bảo tàng đóng cửa', 'Được giảm nửa giá'], answer: 0, explanation: 'Chỉ Chủ Nhật ĐẦU TIÊN mới miễn phí; các ngày khác vẫn mua vé.' },

  // ---------------------------------------------------------------- B2 (10)
  { id: 'b2_g1', cefr: 'B2', skill: 'grammar', prompt: 'By next month, they ___ the project.', options: ['finish', 'finished', 'will have finished', 'are finishing'], answer: 2, explanation: 'Future perfect diễn tả việc hoàn tất trước một mốc tương lai.', origin: 'v1' },
  { id: 'b2_g2', cefr: 'B2', skill: 'grammar', prompt: 'If I ___ more time, I would join the course.', options: ['have', 'had', 'will have', 'am having'], answer: 1, explanation: 'Câu điều kiện loại 2 dùng “If + past simple”.', origin: 'v1' },
  { id: 'b2_g3', cefr: 'B2', skill: 'grammar', prompt: '___ she was tired, she finished the report.', options: ['Although', 'Despite', 'In spite', 'Because of'], answer: 0, explanation: '“Although” đi với cả một mệnh đề; “Despite/In spite of” đi với danh từ.' },
  { id: 'b2_g4', cefr: 'B2', skill: 'grammar', prompt: 'The manager suggested ___ the deadline.', options: ['to extend', 'extending', 'extend', 'extended'], answer: 1, explanation: '“Suggest” theo sau bởi V-ing.' },
  { id: 'b2_v1', cefr: 'B2', skill: 'vocabulary', prompt: '“Despite” is followed by:', options: ['a noun or -ing form', 'an infinitive only', 'a full clause without change', 'an adjective only'], answer: 0, explanation: 'Despite + noun / gerund.', origin: 'v1' },
  { id: 'b2_v2', cefr: 'B2', skill: 'vocabulary', prompt: 'After the loss, the company had to ___ down on spending.', options: ['cut', 'put', 'take', 'give'], answer: 0, explanation: '“Cut down on” = cắt giảm.' },
  { id: 'b2_v3', cefr: 'B2', skill: 'vocabulary', prompt: 'A “controversial” decision is one that:', options: ['causes public disagreement', 'is made very quickly', 'costs a lot of money', 'is kept secret'], answer: 0, explanation: 'Controversial = gây tranh cãi.' },
  { id: 'b2_r1', cefr: 'B2', skill: 'reading', prompt: '“The policy was welcomed by residents, though critics argue it does little to address the underlying cause.” What do critics say?', options: ['Residents dislike the policy', 'The policy does not tackle the root problem', 'The policy is too expensive', 'The policy has already failed'], answer: 1, explanation: '“Does little to address the underlying cause” = không xử lý nguyên nhân gốc.' },
  { id: 'b2_r2', cefr: 'B2', skill: 'reading', prompt: '“Sales rose sharply in the first quarter, only to fall back in the second.” What happened in the second quarter?', options: ['Sales kept rising', 'Sales dropped again', 'Sales stayed the same', 'Sales doubled'], answer: 1, explanation: '“Only to fall back” diễn tả một kết cục ngược lại: doanh số giảm trở lại.' },
  { id: 'b2_r3', cefr: 'B2', skill: 'reading', prompt: '“Far from being a luxury, regular exercise is a necessity for older adults.” Tác giả muốn nói gì?', options: ['Tập thể dục là thứ xa xỉ', 'Tập thể dục là điều cần thiết', 'Người lớn tuổi không nên tập', 'Tập thể dục rất tốn kém'], answer: 1, explanation: '“Far from being a luxury” = hoàn toàn không phải xa xỉ, mà là thiết yếu.' },

  // ---------------------------------------------------------------- C1 (10)
  { id: 'c1_g1', cefr: 'C1', skill: 'grammar', prompt: 'It is essential that every student ___ on time.', options: ['arrives', 'arrive', 'arrived', 'will arrive'], answer: 1, explanation: 'Sau “It is essential that” dùng subjunctive: arrive.', origin: 'v1' },
  { id: 'c1_g2', cefr: 'C1', skill: 'grammar', prompt: 'Not only ___ the deadline, but he also exceeded the target.', options: ['he met', 'did he meet', 'he did meet', 'met he'], answer: 1, explanation: '“Not only” đầu câu kéo theo đảo ngữ: did he meet.' },
  { id: 'c1_g3', cefr: 'C1', skill: 'grammar', prompt: 'Had she known about the risk, she ___ differently.', options: ['would act', 'would have acted', 'had acted', 'will act'], answer: 1, explanation: 'Điều kiện loại 3 đảo ngữ: Had + S + V3, S + would have + V3.' },
  { id: 'c1_g4', cefr: 'C1', skill: 'grammar', prompt: 'She resigned, ___ came as a shock to everyone.', options: ['which', 'that', 'what', 'it'], answer: 0, explanation: '“Which” thay cho cả mệnh đề trước đó trong mệnh đề quan hệ không xác định.' },
  { id: 'c1_v1', cefr: 'C1', skill: 'vocabulary', prompt: '“To exacerbate a problem” means to:', options: ['make it worse', 'solve it completely', 'ignore it', 'explain it clearly'], answer: 0, explanation: 'Exacerbate = làm trầm trọng thêm.' },
  { id: 'c1_v2', cefr: 'C1', skill: 'vocabulary', prompt: 'A “tenuous” connection is one that is:', options: ['very weak', 'extremely strong', 'newly formed', 'well documented'], answer: 0, explanation: 'Tenuous = mong manh, yếu ớt.' },
  { id: 'c1_v3', cefr: 'C1', skill: 'vocabulary', prompt: '“The findings are, at best, inconclusive.” The writer sounds:', options: ['sceptical', 'enthusiastic', 'certain', 'delighted'], answer: 0, explanation: '“At best, inconclusive” là cách nói hoài nghi về kết quả.' },
  { id: 'c1_r1', cefr: 'C1', skill: 'reading', prompt: '“While the theory is elegant, its practical application remains, for the most part, unproven.” What does the writer imply?', options: ['The theory works well in practice', 'The theory is appealing but largely untested in practice', 'The theory has been disproved', 'The theory is badly constructed'], answer: 1, explanation: '“Elegant” khen lý thuyết, “remains unproven” nói phần áp dụng chưa được kiểm chứng.' },
  { id: 'c1_r2', cefr: 'C1', skill: 'reading', prompt: '“Her argument, compelling though it is, rests on a single unverified assumption.” The writer:', options: ['fully accepts the argument', 'finds the argument persuasive but flawed at its base', 'rejects the argument as poorly written', 'has not read the argument'], answer: 1, explanation: '“Compelling though it is” là nhượng bộ, mệnh đề chính mới là ý phê bình.' },
  { id: 'c1_r3', cefr: 'C1', skill: 'reading', prompt: '“It would be premature to attribute the decline solely to the new regulation.” Tác giả cho rằng:', options: ['Quy định mới chắc chắn là nguyên nhân duy nhất', 'Còn quá sớm để quy nguyên nhân chỉ cho quy định mới', 'Quy định mới không liên quan gì', 'Sự suy giảm không hề xảy ra'], answer: 1, explanation: '“Premature to attribute… solely” = chưa đủ căn cứ để quy về một nguyên nhân duy nhất.' },
];

export default placementBank;
