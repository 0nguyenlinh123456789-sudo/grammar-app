// File: src/data/writingPrompts.js
// ĐỀ VIẾT — SOẠN TAY. Đây là BỘ HẠT GIỐNG của việc 3.4, không phải ngân hàng đủ.
//
// Việc 3.4 là "chấm viết dự phòng KHÔNG CẦN AI". Nhưng tiêu chí nghiệm thu của
// nó — "mọi đề viết dùng được khi không có key" — nói về một tập đề mà lúc này
// chưa tồn tại (ngân hàng đề là việc 3.3, làm sau). Một bài kiểm chạy trên tập
// rỗng thì luôn xanh và không nói lên gì cả — đúng kiểu MAX_ROUNDS = 5 mà đường
// dài nhất chỉ có 4 vòng. Nên 3.4 kèm theo đây 9 đề thật để bộ máy có thứ mà
// chấm, và test ghim bằng bánh cóc; việc 3.3 sẽ làm con số này lớn lên.
//
// BA ĐIỀU MỖI ĐỀ BẮT BUỘC PHẢI CÓ, vì thiếu một trong ba là đề đó KHÔNG dùng
// được khi khách chưa nhập key Gemini:
//   1. `modelAnswer` — bài mẫu để người học tự đối chiếu.
//   2. `checklist` — tiêu chí để người học tự soi bài mình, viết bằng câu hỏi
//      trả lời được có/không, không phải lời khuyên chung chung.
//   3. `yeuCau` — những thứ MÁY KIỂM ĐƯỢC (số từ, từ/cấu trúc bắt buộc). Đây là
//      phần duy nhất máy được phép khẳng định.
//
// KHÔNG CÓ TRƯỜNG "ĐIỂM". Bài viết tự do có nhiều đáp án đúng; chấm bằng cách so
// với MỘT bài mẫu rồi ra phần trăm giống nhau là bịa ra một con số — cùng loại
// sai với việc ghi 0% thay vì "chưa đo được". Cách chấm chép chính tả (LCS)
// KHÔNG áp được sang đây, vì chép chính tả chỉ có đúng một đáp án.
//
// `bacToiThieu`: bậc CEFR mà đề này hợp lý nhất. Không khoá — người học bậc
// thấp hơn vẫn viết được, chỉ là khó hơn.

export const KIEU_DE = {
  cau: { id: 'cau', label: 'Viết câu', moTa: 'một tới ba câu' },
  doan: { id: 'doan', label: 'Viết đoạn', moTa: 'một đoạn 40–90 từ' },
  bai: { id: 'bai', label: 'Viết bài', moTa: 'bài 150–200 từ' },
};

export const writingPrompts = [
  {
    id: 'w-a1-gioi-thieu',
    kieu: 'cau',
    bacToiThieu: 'A1',
    title: 'Giới thiệu bản thân',
    deBai: 'Viết 2–3 câu tự giới thiệu: tên, quê, và một việc bạn thích làm.',
    goiY: 'Dùng "My name is…", "I am from…", "I like…".',
    yeuCau: {
      soTuToiThieu: 12,
      soTuToiDa: 45,
      tuBatBuoc: ['my name', 'from', 'like'],
      moTaTuBatBuoc: 'Bài phải có "my name", "from" và "like".',
    },
    checklist: [
      'Mình đã viết đủ 2–3 câu, câu nào cũng có chủ ngữ và động từ chưa?',
      'Mỗi câu đã bắt đầu bằng chữ hoa và kết thúc bằng dấu chấm chưa?',
      'Chữ "I" trong bài đã viết hoa hết chưa?',
      'Người đọc không quen mình có hiểu được mình tên gì, ở đâu, thích gì không?',
    ],
    modelAnswer: 'My name is Linh. I am from Da Nang, a city in central Vietnam. I like cooking, and I make noodles for my family every Sunday.',
    ghiChuBaiMau: 'Bài mẫu thêm một chi tiết nhỏ sau mỗi ý ("a city in central Vietnam", "every Sunday") — đó là cách làm câu dài ra mà không cần từ khó.',
  },
  {
    id: 'w-a1-ngay-cua-toi',
    kieu: 'cau',
    bacToiThieu: 'A1',
    title: 'Một ngày của bạn',
    deBai: 'Viết 3 câu kể một ngày thường của bạn, theo thứ tự sáng – chiều – tối.',
    goiY: 'Dùng thì hiện tại đơn và các từ chỉ thời gian: in the morning, in the afternoon, in the evening.',
    yeuCau: {
      soTuToiThieu: 15,
      soTuToiDa: 60,
      tuBatBuoc: ['in the morning', 'in the afternoon', 'in the evening'],
      moTaTuBatBuoc: 'Bài phải có đủ ba cụm chỉ thời gian trong ngày.',
    },
    checklist: [
      'Ba câu của mình có đúng thứ tự sáng → chiều → tối không?',
      'Động từ đã chia ở hiện tại đơn chưa (thêm -s với he/she/it)?',
      'Mình có kể việc thật mình làm, chứ không chép nguyên bài mẫu chứ?',
      'Đọc to lên, câu nào nghe vấp thì viết lại — còn câu nào vấp không?',
    ],
    modelAnswer: 'In the morning, I drink coffee and read the news for twenty minutes. In the afternoon, I work at a small office near my house. In the evening, I walk with my mother and then study English.',
    ghiChuBaiMau: 'Mỗi câu chỉ một việc chính rồi thêm một chi tiết. Đừng nhồi bốn việc vào một câu — đó là lỗi thường gặp nhất ở bậc này.',
  },
  {
    id: 'w-a2-mo-ta-anh',
    kieu: 'doan',
    bacToiThieu: 'A2',
    title: 'Tả một nơi bạn thích',
    deBai: 'Viết một đoạn 40–90 từ tả một nơi bạn thích đến. Nói rõ nơi đó ở đâu, trông thế nào, và vì sao bạn thích.',
    goiY: 'Dùng there is / there are, và ít nhất hai tính từ.',
    yeuCau: {
      soTuToiThieu: 40,
      soTuToiDa: 90,
      tuBatBuoc: ['there is', 'because'],
      moTaTuBatBuoc: 'Bài phải có "there is" (hoặc "there are") và "because".',
    },
    checklist: [
      'Đoạn của mình có đủ ba phần: ở đâu, trông thế nào, vì sao thích không?',
      'Mình đã dùng ít nhất hai tính từ để tả chưa?',
      'Có câu nào bắt đầu bằng "There is/are" không?',
      'Mình có giải thích lý do bằng "because" chứ không chỉ nói "I like it" không?',
    ],
    modelAnswer: 'My favourite place is the small library near my school. It is on the second floor of an old yellow building. There is a wide window at the back, so the room is always bright and quiet. I go there every Saturday because I can read for hours without anyone calling me. It is the only place where I forget my phone.',
    ghiChuBaiMau: 'Câu cuối không thêm thông tin mới mà nói lại ý chính bằng một hình ảnh cụ thể. Đó là cách kết đoạn dễ nhất và hiệu quả.',
  },
  {
    id: 'w-a2-email-xin-nghi',
    kieu: 'doan',
    bacToiThieu: 'A2',
    title: 'Email xin nghỉ học',
    deBai: 'Viết email ngắn (40–90 từ) gửi giáo viên xin nghỉ buổi học tuần sau. Nêu lý do và hỏi cách học bù.',
    goiY: 'Mở đầu bằng "Dear…", kết bằng "Best regards". Dùng "I will not be able to…".',
    yeuCau: {
      soTuToiThieu: 40,
      soTuToiDa: 90,
      tuBatBuoc: ['dear', 'because', 'regards'],
      moTaTuBatBuoc: 'Email phải có lời chào "Dear…", lý do với "because", và lời chào cuối có "regards".',
    },
    checklist: [
      'Email của mình có đủ ba phần: chào – lý do – câu hỏi học bù không?',
      'Mình có nói rõ buổi nào nghỉ (thứ mấy, ngày nào) không?',
      'Giọng văn có lịch sự không — có câu nào nghe như ra lệnh không?',
      'Mình có hỏi một câu cụ thể để thầy cô trả lời được không?',
    ],
    modelAnswer: 'Dear Ms. Hoa,\n\nI am writing to let you know that I will not be able to attend the class next Tuesday because I have a medical appointment that morning. I am sorry for the short notice. Could you tell me which pages we will cover so that I can study them at home?\n\nBest regards,\nLinh',
    ghiChuBaiMau: 'Bài mẫu xin lỗi MỘT lần rồi thôi, và hỏi một câu trả lời được ngay. Xin lỗi ba lần không lịch sự hơn, chỉ dài hơn.',
  },
  {
    id: 'w-b1-ke-lai-viec',
    kieu: 'doan',
    bacToiThieu: 'B1',
    title: 'Kể một lần bạn học được điều gì đó',
    deBai: 'Viết một đoạn 60–90 từ kể một lần bạn mắc lỗi và học được điều gì từ đó.',
    goiY: 'Dùng thì quá khứ đơn cho các việc đã xảy ra, và một câu với "At first… but then…".',
    yeuCau: {
      soTuToiThieu: 60,
      soTuToiDa: 100,
      tuBatBuoc: ['at first', 'but'],
      moTaTuBatBuoc: 'Bài phải có "at first" và "but" để cho thấy sự thay đổi.',
    },
    checklist: [
      'Câu chuyện của mình có đủ: chuyện gì xảy ra – mình đã nghĩ sai chỗ nào – mình học được gì?',
      'Các động từ kể chuyện đã ở thì quá khứ hết chưa?',
      'Mình có nêu một bài học CỤ THỂ, chứ không phải câu chung chung như "I learned a lot"?',
      'Đoạn có mạch từ đầu tới cuối, hay đang là ba câu rời không dính nhau?',
    ],
    modelAnswer: 'Last year I joined an online English club and stayed silent for three months. At first I thought I had to speak perfectly, so I prepared every sentence in my head and the moment always passed. But then one evening the host asked me a question directly and I answered badly, with many mistakes. Nobody minded. That night I understood that waiting to be ready is just a slower way of never starting.',
    ghiChuBaiMau: 'Bài học nằm ở câu cuối và được nói bằng lời của chính người viết, không phải một câu châm ngôn mượn về.',
  },
  {
    id: 'w-b1-so-sanh',
    kieu: 'doan',
    bacToiThieu: 'B1',
    title: 'So sánh hai cách học',
    deBai: 'Viết một đoạn 60–100 từ so sánh học tiếng Anh một mình và học có bạn cùng luyện. Nêu ưu và nhược của mỗi cách, rồi nói bạn chọn cách nào.',
    goiY: 'Dùng "however", "on the other hand", và ít nhất một câu so sánh hơn (more … than).',
    yeuCau: {
      soTuToiThieu: 60,
      soTuToiDa: 110,
      tuBatBuoc: ['however', 'than'],
      moTaTuBatBuoc: 'Bài phải có "however" và một câu so sánh dùng "than".',
    },
    checklist: [
      'Mình đã nói CẢ ưu và nhược của cả hai cách chưa, hay chỉ khen một bên?',
      'Có ít nhất một câu so sánh hơn (more/-er … than) không?',
      'Mình đã nói rõ mình chọn cách nào và vì sao chưa?',
      'Từ nối ("however", "on the other hand") có đặt đúng chỗ chuyển ý không?',
    ],
    modelAnswer: 'Studying alone is more flexible than studying with a partner: I can open a book at midnight and stop whenever I want. However, nobody notices when I skip a week, and my speaking gets no practice at all. On the other hand, a partner forces me to show up and to say things out loud, which is uncomfortable but useful. I choose a mix: I learn new words alone and use them with a partner twice a week.',
    ghiChuBaiMau: 'Kết luận không chọn "một trong hai" mà nói rõ dùng cách nào cho việc gì. Câu trả lời như vậy luôn mạnh hơn.',
  },
  {
    id: 'w-b1-thu-phan-hoi',
    kieu: 'bai',
    bacToiThieu: 'B1',
    title: 'Thư góp ý cho một dịch vụ',
    deBai: 'Viết một bài 150–200 từ gửi một quán ăn hoặc cửa hàng bạn từng dùng: nói rõ điều gì tốt, điều gì chưa tốt, và đề nghị một thay đổi cụ thể.',
    goiY: 'Chia ba đoạn: khen – vấn đề – đề nghị. Dùng "I would suggest…".',
    yeuCau: {
      soTuToiThieu: 150,
      soTuToiDa: 220,
      tuBatBuoc: ['suggest', 'however'],
      moTaTuBatBuoc: 'Bài phải có "suggest" và "however".',
    },
    checklist: [
      'Bài của mình có đúng ba đoạn, mỗi đoạn một nhiệm vụ không?',
      'Phần chê có nêu việc CỤ THỂ (ngày nào, việc gì) chứ không phải cảm giác chung chung?',
      'Đề nghị của mình có thực hiện được không — người nhận đọc xong có biết phải làm gì?',
      'Giọng văn có giữ lịch sự suốt bài, kể cả ở đoạn chê không?',
      'Bài đã đủ 150 từ chưa, và có câu nào viết ra chỉ để cho đủ số từ không?',
    ],
    modelAnswer: 'I am writing about my visits to your restaurant on Le Loi Street, where I have eaten roughly twice a month for the past year.\n\nThe food has been consistently good, and the staff at the counter are quick and friendly even when the queue reaches the door. The two servers who work on weekday evenings clearly know the regular customers by name, which is a small thing that makes people come back.\n\nHowever, the seating area has become difficult to use. On my last three visits there was no free table between twelve and one, while four tables near the window were occupied by people who had finished eating an hour earlier and were working on laptops. Customers with food on a tray had nowhere to sit and several left.\n\nI would suggest reserving the four window tables for laptop users after two in the afternoon, and marking the rest as dining tables during the lunch hour. This would cost nothing and would free about sixteen seats at the busiest time of the day.',
    ghiChuBaiMau: 'Đoạn chê dẫn ra số lần và khung giờ cụ thể, nên nó thành thông tin dùng được chứ không phải lời phàn nàn. Đề nghị cuối bài nói rõ cái giá phải trả ("would cost nothing") — đó là thứ làm người nhận cân nhắc thật.',
  },
  {
    id: 'w-b2-y-kien',
    kieu: 'bai',
    bacToiThieu: 'B2',
    title: 'Nêu ý kiến: điện thoại trong lớp học',
    deBai: 'Viết một bài 150–200 từ nêu ý kiến của bạn: trường học có nên cấm điện thoại trong giờ học không? Nêu lý lẽ của phía bạn KHÔNG chọn trước, rồi mới nêu lý lẽ của mình.',
    goiY: 'Dùng "Some people argue that…", "However,…", "In my view,…".',
    yeuCau: {
      soTuToiThieu: 150,
      soTuToiDa: 220,
      tuBatBuoc: ['argue', 'however', 'in my view'],
      moTaTuBatBuoc: 'Bài phải nêu ý phía kia ("argue"), có "however", và nêu ý mình bằng "in my view".',
    },
    checklist: [
      'Mình có trình bày lý lẽ của phía kia một cách công bằng, chứ không dựng lên để đập không?',
      'Ý kiến của mình có nằm rõ ở một chỗ, hay rải rác khắp bài?',
      'Mỗi lý lẽ có kèm một ví dụ hoặc lý do, chứ không chỉ là một câu khẳng định?',
      'Bài có đoạn kết nói lại lập trường mà không lặp nguyên si đoạn mở không?',
      'Có câu nào mình viết vì nghe hay chứ không vì nó nói thêm điều gì không?',
    ],
    modelAnswer: 'Some people argue that phones should be banned in classrooms because they are the single biggest source of distraction a teacher has to compete with. This is a fair point. A student who checks a message in the middle of an explanation loses the thread, and research on attention suggests that getting it back takes several minutes, not seconds.\n\nHowever, a ban treats the phone as the cause rather than the symptom. Students reach for a device when a lesson stops asking anything of them. A classroom where everyone is answering a question does not need a rule about phones.\n\nIn my view, schools should regulate the phone rather than remove it. Phones on the desk, screen down, is a workable rule: it makes checking visible, which is usually enough. And there are lessons where the device is the better tool, such as looking up a pronunciation or recording your own speaking to hear it back.\n\nA total ban is easy to announce and hard to enforce. A visible-use rule is harder to explain and much easier to live with.',
    ghiChuBaiMau: 'Bài mẫu nhận lý lẽ phía kia là ĐÚNG ("This is a fair point") trước khi phản bác. Bài viết nào cũng mạnh lên khi làm vậy, và người chấm nào cũng nhận ra.',
  },
  {
    id: 'w-b2-tom-tat',
    kieu: 'bai',
    bacToiThieu: 'B2',
    title: 'Tóm tắt và phản hồi',
    deBai: 'Chọn một bài nghe bạn đã học trong mục "Bài nghe theo đoạn". Viết 150–200 từ: đoạn đầu tóm tắt ý chính của bài, đoạn sau nói bạn đồng ý hay không và vì sao.',
    goiY: 'Dùng "The main idea is that…", "According to the speaker,…", "I agree/disagree because…".',
    yeuCau: {
      soTuToiThieu: 150,
      soTuToiDa: 220,
      tuBatBuoc: ['main idea', 'according to', 'because'],
      moTaTuBatBuoc: 'Bài phải có "main idea", "according to" và "because".',
    },
    checklist: [
      'Đoạn tóm tắt của mình có viết bằng lời của mình, chứ không chép nguyên câu trong bài không?',
      'Mình có tóm ý CHÍNH, hay đang kể lại một chi tiết phụ vì nó dễ viết?',
      'Phần phản hồi có nói rõ mình đồng ý/không đồng ý với ĐIỀU GÌ cụ thể trong bài không?',
      'Lý do của mình có dựa vào trải nghiệm hoặc ví dụ thật không?',
      'Hai đoạn có tách bạch nhiệm vụ, hay đang lẫn tóm tắt với ý kiến?',
    ],
    modelAnswer: 'The main idea is that rereading and highlighting feel productive but do very little for memory. According to the speaker, a cognitive scientist named Mary Pyc, both habits create a false sense of knowing: the text looks familiar the second time, and familiarity is easily mistaken for understanding. She recommends self-testing and spaced practice instead, because retrieving an answer is what strengthens it.\n\nI agree, and my own experience is uncomfortably close to her description. For two years I reread vocabulary lists before every test and scored badly on anything that asked me to produce a word rather than recognise it. The lists always looked familiar, so I never suspected the method. What changed things was writing the English word from the Vietnamese one, which is slower and much less pleasant.\n\nThe part I would add is that self-testing is harder to keep doing, precisely because it shows you what you do not know. Rereading is comfortable, and comfort is why the weaker method survives.',
    ghiChuBaiMau: 'Đoạn hai không chỉ nói "tôi đồng ý" mà kể một trải nghiệm khớp với ý bài, rồi thêm MỘT ý mà bài chưa nói. Đó là chỗ tách bài B2 khỏi bài B1.',
  },
];

export const demTheoKieu = () => writingPrompts.reduce((d, p) => ({ ...d, [p.kieu]: (d[p.kieu] || 0) + 1 }), {});

export default writingPrompts;
