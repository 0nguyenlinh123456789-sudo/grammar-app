// File: src/data/storyQuiz.js
// VIỆC 3.1 — CÂU HỎI ĐỌC HIỂU MỨC VĂN BẢN, SOẠN TAY.
//
// ══ VÌ SAO FILE NÀY TỒN TẠI ══
// Phần kiểm tra nằm ngay dưới bài đọc của mỗi chủ đề, nên người học mặc nhiên
// hiểu là nó hỏi về BÀI ĐỌC. Trước file này thì 266/267 chủ đề không có câu nào
// hỏi về bài: các câu hiện ra được sắp xếp từ câu ví dụ của từng mục từ, tức là
// kiểm tra hiểu MỘT CÂU rời không liên quan tới bài vừa đọc.
//
// ⚠️ Dòng "1/267" trong bảng kế hoạch cũng chưa đúng. Chủ đề duy nhất có câu
// soạn tay (`travel-transport`) có 5 câu MỨC CÂU — mỗi câu kèm một câu tiếng
// Anh độc lập, không dính gì tới `storyEn` của chủ đề đó. Tính theo tiêu chí N5
// ("đọc hiểu theo VĂN BẢN") thì điểm xuất phát thật là **0/267**.
//
// ══ CĂN CỨ PHẢI NGUYÊN VĂN ══
// Mỗi câu có trường `dan` = câu tiếng Anh CHÉP NGUYÊN VĂN từ `storyEn` của chính
// chủ đề đó, làm căn cứ cho đáp án đúng. `tests/story_quiz.test.js` kiểm từng
// chuỗi có thật nằm trong bài hay không.
//
// Không có nó thì một đáp án sai nằm lẫn trong 152 câu là vĩnh viễn không ai
// thấy, và về mặt máy móc không có gì phân biệt câu hỏi có căn cứ với câu hỏi
// nghe hợp lý mà bịa. Đây là cách đã dùng cho 120 câu hỏi bài đọc VOA ở việc 5.3
// (trường `why` dẫn nguyên văn), áp lại ở đây.
//
// `dan` cũng hiện ra cho người học SAU KHI chọn, để họ tự kiểm lại chứ không
// phải tin lời chấm.
//
// ══ PHẠM VI ĐỢT NÀY ══
// 38 chặng bậc **B1** — theo đúng tiêu chí N5 đã ghi trong bảng kế hoạch:
// "đọc hiểu theo VĂN BẢN ở mọi chặng ≥B1" = 122 chặng (B1 38 · B2 38 · C1 46).
// Bánh cóc trong test chỉ ghim con số ĐANG CÓ, không ghim 122 khi chưa soạn đủ.
//
// Hình dạng: { q, options, answer, dan }. KHÔNG có trường `en` — bài đọc đã nằm
// ngay phía trên rồi; chép một câu vào ô trích dẫn là quay về hỏi câu lẻ. Không
// có `en` cũng là thứ chặn câu mức văn bản lọt sang phần NGHE (xem
// `src/utils/comprehension.js`).
//
// Thứ tự lựa chọn hiện ra được XÁO trong mã, không phụ thuộc `answer` ở đây.
//
// ══ ⚠️ KHUYẾT ĐIỂM ĐÃ ĐO, CHƯA SỬA XONG: THIÊN LỆCH ĐỘ DÀI ══
// **84,3% câu có đáp án đúng là lựa chọn DÀI NHẤT** (không thiên lệch thì phải
// quanh 25%). Người học không đọc bài, cứ chọn phương án dài nhất, vẫn đúng
// ~84%. Nguyên nhân là thói quen soạn: viết đáp án đúng thành mệnh đề đầy đủ
// bám sát câu `dan`, rồi thêm ba câu nhiễu ngắn gọn.
//
// Đây CÙNG LOẠI với lỗi "đáp án nằm lì ở ô đầu" đã sửa ở việc này — một dấu
// hiệu bề ngoài cho phép đoán đúng mà không cần hiểu bài. Khác ở chỗ lỗi kia
// sửa được bằng mã (xáo lựa chọn), còn lỗi này phải sửa bằng công soạn: câu
// nhiễu phải dài tương đương đáp án và dựng từ nội dung có thật trong bài.
//
// Đo lại: `node scripts/audit_story_quiz.mjs`. Bánh cóc trong
// `tests/story_quiz.test.js` ghim 84,3% để con số chỉ được giảm.
//
// ══ MỘT CHẶNG SÁT RANH GIỚI, CÂN NHẮC RỒI GIỮ ══
// `success-mindset-100` (C1) cũng là bài kiểu danh sách như chặng đã loại bên
// dưới, nhưng dài 108 từ với khoảng mười câu, nên tìm được BỐN câu neo khác
// nhau — mỗi câu hỏi bám một mệnh đề riêng, không phải bốn lần hỏi lại cùng một
// danh sách. Vì thế giữ. Ghi ra đây để người đọc sau thấy cả hai phán đoán, chứ
// không chỉ thấy cái đi theo hướng loại bỏ.

export const STORY_QUIZ = {
  'nature-countryside': [
    {
      q: 'Bài đọc kể về ai và chuyện gì?',
      options: [
        'Một người mới mua trang trại và liên tiếp gặp rắc rối khi tập làm nông',
        'Một nông dân lâu năm dạy người khác cách trồng lúa',
        'Một nhà khoa học nghiên cứu đất ở vùng nông thôn',
        'Một nhóm du khách đi tham quan làng nghề',
      ],
      answer: 0,
      dan: 'Bob bought a farm and a small farmhouse. He wanted to be a real farmer.',
    },
    {
      q: 'Vì sao Bob chạy vào bãi chăn?',
      options: [
        'Vì đàn gia cầm đuổi theo khi anh cho chúng ăn',
        'Vì anh đuổi theo đàn bò bị sổng',
        'Vì trời mưa và anh tìm chỗ trú',
        'Vì anh muốn thử lái máy kéo ở đó',
      ],
      answer: 0,
      dan: 'He tried to feed the poultry, but they chased him into the pasture!',
    },
    {
      q: 'Bob chọn cách canh tác nào?',
      options: [
        'Canh tác hữu cơ, thay cho thuốc trừ sâu và phân bón',
        'Dùng thật nhiều phân bón để cây lớn nhanh',
        'Chỉ trồng một loại cây duy nhất quanh năm',
        'Thuê người khác làm toàn bộ việc đồng áng',
      ],
      answer: 0,
      dan: 'Instead of using pesticide and fertilizer, he chose organic farming to grow organic crops.',
    },
    {
      q: 'Vì sao Bob rời trang trại để đi leo núi?',
      options: [
        'Để thoát khỏi trang trại và khám phá thiên nhiên ở nơi hẻo lánh',
        'Để tìm mua thêm đất canh tác trên núi',
        'Để đưa gia súc lên vùng cao ăn cỏ',
        'Để dự lễ hội làng ở bên kia núi',
      ],
      answer: 0,
      dan: 'To escape the farm, Bob went inland to explore the environment and nature in an isolated and remote location.',
    },
  ],

  'technology-internet': [
    {
      q: 'Vì sao người kể đặt mật khẩu rất mạnh?',
      options: [
        'Vì an ninh mạng là điều quan trọng',
        'Vì công ty bắt buộc phải làm vậy',
        'Vì máy tính của anh ta hay bị hỏng',
        'Vì anh ta hay quên mật khẩu ngắn',
      ],
      answer: 0,
      dan: 'My password is very strong because cybersecurity is important.',
    },
    {
      q: 'Người kể sao lưu tệp để phòng chuyện gì?',
      options: [
        'Phòng khi vi-rút làm hỏng máy tính',
        'Phòng khi mất điện giữa chừng',
        'Phòng khi quên mật khẩu đăng nhập',
        'Phòng khi hết dung lượng đám mây',
      ],
      answer: 0,
      dan: 'I always backup my files in case a virus damages my computer.',
    },
    {
      q: 'Theo bài, điện toán đám mây cho phép làm gì?',
      options: [
        'Lưu dữ liệu ở bất cứ đâu',
        'Xem truyền hình truyền thống miễn phí',
        'Chặn hoàn toàn vi-rút máy tính',
        'Tự động tạo mật khẩu mạnh',
      ],
      answer: 0,
      dan: 'Cloud computing lets us store data anywhere.',
    },
    {
      q: 'Bài kết lại rằng để an toàn trong tương lai, chúng ta cần gì?',
      options: [
        'Băng thông tốt hơn và mã hoá',
        'Nhiều công ty khởi nghiệp hơn',
        'Ít dùng mạng xã hội hơn',
        'Quay lại dùng truyền hình truyền thống',
      ],
      answer: 0,
      dan: 'Startups are building the future, but we need better bandwidth and encryption to stay safe.',
    },
  ],

  'health-medical': [
    {
      q: 'Bệnh nhân có những triệu chứng gì và kéo dài bao lâu?',
      options: [
        'Mệt mỏi, chóng mặt và buồn nôn, suốt hai tuần',
        'Sốt cao và ho, suốt hai ngày',
        'Đau đầu và mất ngủ, suốt hai tháng',
        'Đau bụng và sụt cân, suốt một tuần',
      ],
      answer: 0,
      dan: 'The patient has been experiencing fatigue, dizziness, and nausea for two weeks.',
    },
    {
      q: 'Bác sĩ cho chụp MRI và lấy mẫu máu nhằm mục đích gì?',
      options: [
        'Để xác nhận chẩn đoán',
        'Để thay thế cho việc dùng thuốc',
        'Để kiểm tra tác dụng phụ của thuốc',
        'Để lập kế hoạch phẫu thuật ngay',
      ],
      answer: 0,
      dan: 'She orders an MRI scan and blood specimen to confirm the diagnosis.',
    },
    {
      q: 'Theo bài, nhờ đâu tiên lượng của bệnh nhân là tích cực?',
      options: [
        'Nhờ dinh dưỡng hợp lý và tập luyện',
        'Nhờ được chuyển lên bệnh viện tuyến trên',
        'Nhờ uống thuốc liều cao hơn',
        'Nhờ nghỉ làm hoàn toàn trong sáu tháng',
      ],
      answer: 0,
      dan: 'With proper nutrition and exercise, his prognosis is positive.',
    },
    {
      q: 'Chiến dịch y tế cộng đồng trong bài tập trung vào việc gì?',
      options: [
        'Giáo dục người dân về tiêm chủng, dinh dưỡng và tránh nhiễm trùng',
        'Phát thuốc miễn phí cho người bệnh mạn tính',
        'Xây thêm bệnh viện ở vùng nông thôn',
        'Đào tạo thêm bác sĩ chuyên khoa tim mạch',
      ],
      answer: 0,
      dan: 'Meanwhile, a public health campaign educates citizens about vaccination, healthy nutrition, and avoiding infections.',
    },
  ],

  'social-issues-daily': [
    {
      q: 'Ý chính của bài đọc là gì?',
      options: [
        'Cùng nhau hành động là cách tốt nhất để giải quyết vấn đề xã hội',
        'Chính phủ phải tự mình giải quyết mọi vấn đề xã hội',
        'Người giàu nên chuyển hết tài sản cho người nghèo',
        'Vấn đề xã hội chỉ xuất hiện ở các nước nghèo',
      ],
      answer: 0,
      dan: 'Whether we act in private or join a group, working together rather than alone is the best way to solve social problems and build a safe place for every member.',
    },
    {
      q: 'Theo bài, nhiều người tốt bụng làm gì?',
      options: [
        'Làm tình nguyện viên cho một tổ chức từ thiện',
        'Mở doanh nghiệp để tạo việc làm',
        'Vận động thay đổi hiến pháp',
        'Chuyển tới sống ở khu vực nghèo hơn',
      ],
      answer: 0,
      dan: 'Many kind people work as a volunteer for a charity.',
    },
    {
      q: 'Một công dân tốt phối hợp với chính phủ để làm những việc gì?',
      options: [
        'Bảo vệ nhân quyền, ngăn bạo lực và tội phạm, thúc đẩy hoà bình',
        'Thu thuế và phân phối lại thu nhập',
        'Xây trường học và bệnh viện mới',
        'Kiểm soát giá lương thực trên thị trường',
      ],
      answer: 0,
      dan: 'A good citizen also works with the government to protect human rights, stop violence and crime, and promote peace instead of war.',
    },
    {
      q: 'Khi đám đông tụ họp nơi công cộng để bỏ phiếu hoặc đòi sửa một đạo luật bất công, điều đó thể hiện gì?',
      options: [
        'Sức mạnh của dân chúng',
        'Sự thất bại của chính quyền',
        'Nguy cơ dẫn tới bạo lực',
        'Sự chia rẽ trong cộng đồng',
      ],
      answer: 0,
      dan: 'When a large crowd comes together in public to vote or demand an unfair law be changed, they show the power of the population.',
    },
  ],

  'media-news-daily': [
    {
      q: 'Bài đọc kết lại bằng thông điệp nào?',
      options: [
        'Dù là người nghe hay người đọc, phải biết đâu là thông tin thật',
        'Báo giấy đáng tin hơn internet',
        'Nên tránh xa mạng xã hội hoàn toàn',
        'Chỉ nên xem tin tức trên truyền hình quốc gia',
      ],
      answer: 0,
      dan: 'Whether you are a listener or a reader, it is important to know what is real when the media covers an event.',
    },
    {
      q: 'Theo bài, người đang lái xe có thể theo dõi tin tức bằng cách nào?',
      options: [
        'Nghe bản tin địa phương trên radio',
        'Đọc báo giấy ở ghế sau',
        'Xem chương trình trực tiếp trên truyền hình',
        'Viết bình luận trên mạng xã hội',
      ],
      answer: 0,
      dan: 'If you are driving, you might listen to a local report on the radio.',
    },
    {
      q: 'Khi mở tờ báo hoặc tạp chí ra, người đọc nhìn vào cái gì trước?',
      options: [
        'Dòng tít lớn, rồi đọc bài do nhà báo viết',
        'Trang quảng cáo ở cuối báo',
        'Ảnh của người nổi tiếng',
        'Mục thư bạn đọc',
      ],
      answer: 0,
      dan: 'When they open it, they look at the big headline and read an article written by a journalist.',
    },
    {
      q: 'Vì sao bài nhắc người đọc phải kiểm chứng thông tin?',
      options: [
        'Vì có khi tin là thật, nhưng cũng có khi là tin giả',
        'Vì nhà báo luôn viết theo ý người trả tiền',
        'Vì internet không có thông tin đáng tin nào',
        'Vì báo in luôn chậm hơn tin trên mạng',
      ],
      answer: 0,
      dan: 'Sometimes the story is true and real, but sometimes it is false or fake news.',
    },
  ],

  'environment-nature': [
    {
      q: 'Điều gì khiến không khí quanh khu rừng của Benny trở nên tệ?',
      options: [
        'Một nhà máy thải khí nhà kính và khí carbon lên trời',
        'Một trận cháy rừng do sét đánh',
        'Xe cộ đi lại quá nhiều trong rừng',
        'Rác thải của khách du lịch bỏ lại',
      ],
      answer: 0,
      dan: 'A factory was releasing greenhouse gases and carbon emissions into the sky.',
    },
    {
      q: 'Benny và bạn bè đã bắt tay làm những việc gì?',
      options: [
        'Tái chế, dùng năng lượng mặt trời và ủ rác thực phẩm',
        'Kiện nhà máy ra toà và đòi bồi thường',
        'Chuyển cả khu rừng đi nơi khác',
        'Kêu gọi khách du lịch ngừng đến rừng',
      ],
      answer: 0,
      dan: 'They started recycling, using solar energy, and composting food waste.',
    },
    {
      q: 'Sau khi cả nhóm hành động, kết quả đo được là gì?',
      options: [
        'Chỉ số chất lượng không khí được cải thiện',
        'Nhà máy phải đóng cửa vĩnh viễn',
        'Rừng được công nhận là di sản thế giới',
        'Số lượng khách du lịch tăng gấp đôi',
      ],
      answer: 0,
      dan: 'The air quality index improved.',
    },
    {
      q: 'Thông điệp Benny chứng minh được là gì?',
      options: [
        'Phát triển bền vững là điều làm được, kể cả với một chú thỏ nhỏ',
        'Chỉ chính phủ mới cứu được môi trường',
        'Rừng sẽ tự phục hồi nếu để yên',
        'Công nghệ mới là lời giải duy nhất',
      ],
      answer: 0,
      dan: 'Benny proved that sustainability is possible — even for a small bunny!',
    },
  ],

  'education-academic': [
    {
      q: 'Nhờ đâu Benny đi du học được?',
      options: [
        'Nhờ giành được học bổng của một trường đại học quốc tế',
        'Nhờ gia đình bán trang trại lấy tiền',
        'Nhờ trúng tuyển kỳ thi của chính phủ',
        'Nhờ được giáo sư bảo trợ toàn phần',
      ],
      answer: 0,
      dan: 'He earned a scholarship to an international university, which excited him enormously.',
    },
    {
      q: 'Bài tập đầu tiên của Benny đòi hỏi những gì?',
      options: [
        'Tìm trích dẫn, tránh đạo văn và xây dựng giả thuyết vững',
        'Thuyết trình trước toàn khoa trong 30 phút',
        'Dịch một cuốn sách sang tiếng mẹ đẻ',
        'Làm bài kiểm tra trắc nghiệm cuối kỳ',
      ],
      answer: 0,
      dan: 'Benny’s first assignment was a research paper — he had to find citations, avoid plagiarism, and develop a strong hypothesis.',
    },
    {
      q: 'Benny khám phá ra khái niệm siêu nhận thức, tức là hiểu điều gì?',
      options: [
        'Hiểu CÁCH bản thân học tốt nhất',
        'Hiểu nội dung môn học sâu hơn giáo trình',
        'Hiểu cách giáo sư ra đề thi',
        'Hiểu vì sao điểm trung bình quan trọng',
      ],
      answer: 0,
      dan: 'Benny discovered metacognition — understanding HOW he learned best.',
    },
    {
      q: 'Kết cục của Benny khi tốt nghiệp là gì?',
      options: [
        'Trở thành sinh viên xuất sắc nhất',
        'Ở lại trường làm trợ giảng',
        'Bỏ dở chương trình vì quá khó',
        'Chuyển sang một trường khác',
      ],
      answer: 0,
      dan: 'By graduation, Benny was the top student.',
    },
  ],

  'arts-entertainment': [
    {
      q: 'Benny quyết định tự sáng tác tác phẩm gì?',
      options: [
        'Một bức tranh phong cảnh lớn vẽ bằng màu nước',
        'Một bức tượng tạc từ đá cẩm thạch',
        'Một bộ phim tài liệu về các nhà soạn nhạc',
        'Một bản giao hưởng cho dàn nhạc',
      ],
      answer: 0,
      dan: 'One day, he decided to create his own painting — a large landscape in watercolor.',
    },
    {
      q: 'Ai là người tỏ ra ấn tượng với tác phẩm của Benny?',
      options: [
        'Người phụ trách triển lãm',
        'Một nhà soạn nhạc nổi tiếng',
        'Giám đốc bảo tàng quốc gia',
        'Một nhà xuất bản sách',
      ],
      answer: 0,
      dan: 'The curator was impressed.',
    },
    {
      q: 'Được truyền cảm hứng, Benny làm gì tiếp theo?',
      options: [
        'Bắt tay viết một cuốn tiểu thuyết có nhân vật chính hấp dẫn và cốt truyện bất ngờ',
        'Mở một phòng tranh của riêng mình',
        'Học sáng tác nhạc cho dàn nhạc',
        'Đi khắp nơi dạy vẽ màu nước',
      ],
      answer: 0,
      dan: 'Inspired, Benny started writing a novel with a fascinating protagonist, clever metaphors, and an unexpected plot.',
    },
    {
      q: 'Cuốn tiểu thuyết đưa Benny tới kết quả nào?',
      options: [
        'Anh gửi cho nhà xuất bản và có được hợp đồng chuyển thể thành phim',
        'Anh bán được bản quyền cho một tờ báo',
        'Anh được mời làm giám khảo một cuộc thi',
        'Anh phải viết lại toàn bộ theo yêu cầu',
      ],
      answer: 0,
      dan: 'He submitted it to publishers and earned a film adaptation deal.',
    },
  ],

  'career-workplace': [
    {
      q: 'Benny khởi đầu con đường xin việc bằng cách nào?',
      options: [
        'Cập nhật CV và gửi đi 10 hồ sơ xin việc',
        'Nhờ người quen giới thiệu vào công ty',
        'Dự một hội chợ việc làm của trường',
        'Nộp hồ sơ cho một công ty săn đầu người',
      ],
      answer: 0,
      dan: 'Benny the Bunny updated his CV and sent out 10 job applications.',
    },
    {
      q: 'Sau khi được thăng chức, phòng ban của Benny thay đổi ra sao?',
      options: [
        'Tăng từ 5 lên 20 nhân viên',
        'Tách thành hai phòng riêng biệt',
        'Giữ nguyên quy mô nhưng đổi nhiệm vụ',
        'Sáp nhập với phòng kỹ thuật',
      ],
      answer: 0,
      dan: 'His department grew from 5 to 20 employees.',
    },
    {
      q: 'Cùng với thành công, Benny phải học điều gì?',
      options: [
        'Học cách cân bằng công việc và cuộc sống để tránh kiệt sức',
        'Học cách làm thêm giờ nhiều hơn nữa',
        'Học cách tự làm hết việc của cả nhóm',
        'Học cách đàm phán lương với công ty lớn',
      ],
      answer: 0,
      dan: 'But with success came challenges — he learned about work-life balance to avoid burnout.',
    },
    {
      q: 'Vì sao Benny từ chối lời mời làm giám đốc cấp cao ở công ty lớn hơn?',
      options: [
        'Vì anh quá yêu văn hoá của công ty khởi nghiệp mình đang làm',
        'Vì mức lương được đề nghị quá thấp',
        'Vì công ty kia ở quá xa nhà anh',
        'Vì anh muốn tự mở công ty riêng',
      ],
      answer: 0,
      dan: 'But Benny loved his startup’s corporate culture too much to leave.',
    },
  ],

  'urban-traffic-vstep': [
    {
      q: 'Bài đọc kết lại bằng viễn cảnh nào?',
      options: [
        'Một thành phố thân thiện với người đi bộ, không khí sạch và giao thông công cộng dễ tiếp cận',
        'Một thành phố không còn xe máy',
        'Một thành phố có tàu điện ngầm ở mọi tuyến phố',
        'Một thành phố cấm hoàn toàn ô tô cá nhân',
      ],
      answer: 0,
      dan: 'The dream is a pedestrian-friendly city with clean air, accessible public transit, and safe crosswalks where every citizen can travel freely.',
    },
    {
      q: 'Chính phủ đã đầu tư mạnh vào những hạng mục hạ tầng nào?',
      options: [
        'Đường cao tốc, cầu vượt và hầm chui mới',
        'Bãi đỗ xe ngầm và trạm sạc điện',
        'Đường sắt cao tốc liên tỉnh',
        'Sân bay và cảng biển mới',
      ],
      answer: 0,
      dan: 'The government has invested heavily in infrastructure, building new highways, overpasses, flyovers, and tunnels.',
    },
    {
      q: 'Phí tắc đường và việc xử phạt nghiêm vi phạm giao thông nhằm mục đích gì?',
      options: [
        'Giảm tai nạn và số ca tử vong',
        'Tăng nguồn thu cho ngân sách thành phố',
        'Buộc người dân chuyển sang xe điện',
        'Hạn chế người từ tỉnh khác vào thành phố',
      ],
      answer: 0,
      dan: 'Congestion charges and strict enforcement of traffic violations, including jaywalking, reckless driving, and tailgating, aim to reduce accidents and fatalities.',
    },
    {
      q: 'Ứng dụng đi chung xe giúp giảm điều gì?',
      options: [
        'Khí thải và khói xe tạo ra sương mù độc hại',
        'Chi phí xây dựng cầu vượt',
        'Số lượng đèn tín hiệu cần lắp đặt',
        'Thời gian thi công các tuyến metro',
      ],
      answer: 0,
      dan: 'Ride-sharing apps and carpooling help decrease emissions and exhaust fumes that create dangerous smog.',
    },
  ],

  'agriculture-food-security-vstep': [
    {
      q: 'Bài mở đầu bằng nhận định nào về Đồng bằng sông Cửu Long?',
      options: [
        'Đó là vựa lúa của cả nước, nơi hàng triệu nông dân sống nhờ nông nghiệp',
        'Đó là vùng đang mất dần đất canh tác vì đô thị hoá',
        'Đó là nơi có sản lượng thuỷ sản lớn nhất thế giới',
        'Đó là vùng đầu tiên áp dụng nông nghiệp hữu cơ',
      ],
      answer: 0,
      dan: 'In Vietnam’s Mekong Delta, the granary of the nation, millions of farmers depend on agriculture for their livelihood.',
    },
    {
      q: 'Dù đã có hệ thống tưới tiêu hiện đại, mối đe doạ nghiêm trọng nào vẫn còn?',
      options: [
        'Hạn hán và xói mòn đất',
        'Thiếu lao động trẻ ở nông thôn',
        'Giá phân bón tăng quá nhanh',
        'Cạnh tranh từ gạo nhập khẩu',
      ],
      answer: 0,
      dan: 'Modern irrigation systems have replaced the old methods, but drought and soil erosion remain serious threats.',
    },
    {
      q: 'Canh tác hữu cơ đang phát triển giúp giảm phụ thuộc vào thứ gì?',
      options: [
        'Thuốc trừ sâu, thuốc diệt cỏ và thuốc diệt côn trùng độc hại',
        'Máy móc nhập khẩu đắt tiền',
        'Nguồn nước tưới từ sông Mekong',
        'Trợ cấp của chính phủ',
      ],
      answer: 0,
      dan: 'Organic farming is growing, reducing dependence on harmful pesticides, herbicides, and insecticides.',
    },
    {
      q: 'Công nghệ sinh học và canh tác chính xác mang lại hy vọng nhờ điều gì?',
      options: [
        'Giống lai và cây biến đổi gen chịu được hạn',
        'Máy gặt tự động thay thế sức người',
        'Hệ thống nhà kính điều khiển bằng máy tính',
        'Phân bón sinh học rẻ hơn phân hoá học',
      ],
      answer: 0,
      dan: 'Biotechnology and precision farming offer hope, with hybrid seeds and genetically modified crops that are drought-resistant.',
    },
  ],

  'sustainable-tourism-vstep': [
    {
      q: 'Theo bài, tương lai của ngành du lịch nằm ở đâu?',
      options: [
        'Ở thực hành tái tạo và phát triển bền vững, để mỗi chuyến đi làm điểm đến tốt hơn trước',
        'Ở việc xây thêm nhiều khu nghỉ dưỡng cao cấp',
        'Ở việc tăng số lượng khách quốc tế mỗi năm',
        'Ở việc mở thêm các tuyến bay thẳng',
      ],
      answer: 0,
      dan: 'The future of tourism lies in regenerative practices and sustainable development, where every excursion and expedition leaves destinations better than before.',
    },
    {
      q: 'Du khách có trách nhiệm được mô tả làm những việc gì?',
      options: [
        'Mang bình nước dùng lại, dùng kem chống nắng an toàn cho rạn san hô, mua đồ thủ công thương mại công bằng',
        'Chỉ đi theo tour do nhà nước tổ chức',
        'Tránh hoàn toàn các khu bảo tồn thiên nhiên',
        'Ở khách sạn lớn thay vì nhà dân',
      ],
      answer: 0,
      dan: 'Responsible travelers bring reusable bottles, use reef-safe sunscreen, and buy fair trade handicrafts as souvenirs.',
    },
    {
      q: 'Mặt trái nào của du lịch được bài nêu ra?',
      options: [
        'Quá tải du lịch đe doạ các di sản, gây suy thoái môi trường và ô nhiễm',
        'Du khách nước ngoài không hiểu văn hoá bản địa',
        'Giá dịch vụ tăng khiến người dân không đi du lịch được',
        'Nhân lực ngành du lịch thiếu đào tạo',
      ],
      answer: 0,
      dan: 'However, overtourism threatens heritage sites, causing environmental degradation and pollution.',
    },
    {
      q: 'Các khu nghỉ dưỡng thân thiện môi trường có chứng nhận xanh làm gì?',
      options: [
        'Dùng năng lượng tái tạo và xử lý nước thải đúng cách',
        'Chỉ nhận khách đi theo nhóm nhỏ',
        'Xây dựng hoàn toàn bằng vật liệu địa phương',
        'Miễn phí cho khách tham gia trồng rừng',
      ],
      answer: 0,
      dan: 'Community-based homestays offer cultural immersion, while eco-friendly resorts with green certification use renewable energy and treat wastewater properly.',
    },
  ],

  'water-pollution-vstep': [
    {
      q: 'Theo bài, các "vùng chết" dưới nước hình thành như thế nào?',
      options: [
        'Dư thừa phân bón gây phú dưỡng, làm tảo nở hoa và rút cạn ô-xy',
        'Dầu tràn phủ kín mặt nước ngăn ánh sáng',
        'Kim loại nặng lắng xuống đáy làm chết sinh vật',
        'Nước biển dâng làm tăng độ mặn đột ngột',
      ],
      answer: 0,
      dan: 'Eutrophication from excess fertilizer causes algal blooms that deplete oxygen, creating dead zones where no marine life can survive.',
    },
    {
      q: 'Nhà máy xử lý nước dùng những phương pháp nào, và điểm yếu còn lại là gì?',
      options: [
        'Lọc, khử trùng bằng clo và sục khí; nhưng việc thực thi tiêu chuẩn xả thải còn yếu',
        'Chưng cất và khử mặn; nhưng chi phí quá cao',
        'Lắng cặn tự nhiên; nhưng mất quá nhiều thời gian',
        'Xử lý sinh học; nhưng chỉ áp dụng được ở thành phố lớn',
      ],
      answer: 0,
      dan: 'Water treatment plants use filtration, chlorination, and aeration to purify water, but enforcement of discharge standards remains weak.',
    },
    {
      q: 'Vi nhựa đi vào chuỗi thức ăn bằng con đường nào?',
      options: [
        'Qua tích luỹ sinh học',
        'Qua nước mưa rơi xuống ruộng',
        'Qua hệ thống nước máy sinh hoạt',
        'Qua không khí ở vùng ven biển',
      ],
      answer: 0,
      dan: 'Oil spills and plastic debris devastate marine life, while microplastics enter the food chain through bioaccumulation.',
    },
    {
      q: 'Bài kết lại bằng con số nào và ý nghĩa gì?',
      options: [
        'Chỉ 3% nước trên Trái Đất là nước ngọt, nên quản lý bền vững là điều sống còn',
        'Chỉ 30% nước thải được xử lý đúng cách',
        'Chỉ 3% dân số được dùng nước sạch',
        'Chỉ 13% sông ngòi còn đạt chuẩn',
      ],
      answer: 0,
      dan: 'With only 3% of Earth’s water being freshwater, sustainable water management and reducing our water footprint are critical for ensuring clean water for future generations.',
    },
  ],

  'traditions-festivals-vstep': [
    {
      q: 'Theo bài, hoa trang trí ngày Tết ở hai miền khác nhau ra sao?',
      options: [
        'Miền Bắc dùng hoa đào, miền Nam dùng hoa mai',
        'Miền Bắc dùng hoa mai, miền Nam dùng hoa đào',
        'Cả hai miền đều dùng hoa cúc vàng',
        'Miền Bắc dùng quất, miền Nam dùng hoa đào',
      ],
      answer: 0,
      dan: 'During Lunar New Year, families gather for reunion, decorate homes with peach blossoms in the North and apricot blossoms in the South, and place offerings on the ancestral altar.',
    },
    {
      q: 'Tiền lì xì trong phong bao đỏ tượng trưng cho điều gì?',
      options: [
        'May mắn và thịnh vượng',
        'Sự trưởng thành của trẻ nhỏ',
        'Lòng hiếu thảo với ông bà',
        'Ước nguyện học hành đỗ đạt',
      ],
      answer: 0,
      dan: 'Children receive lucky money in red envelopes, symbolizing fortune and prosperity.',
    },
    {
      q: 'Bài nhắc tới đóng góp nào của 54 dân tộc thiểu số?',
      options: [
        'Những phong tục riêng, từ văn hoá cồng chiêng được UNESCO công nhận tới múa rối nước',
        'Các món ăn truyền thống trong mâm cỗ Tết',
        'Nghề dệt lụa và làm gốm ở đồng bằng',
        'Các lễ hội chùa chiền vào mùa xuân',
      ],
      answer: 0,
      dan: 'Vietnam’s 54 ethnic minorities contribute unique customs, from gong culture recognized by UNESCO to water puppet shows in the Red River Delta.',
    },
    {
      q: 'Bài kết lại rằng điều gì tiếp tục định hình bản sắc Việt Nam dù có hiện đại hoá và toàn cầu hoá?',
      options: [
        'Những giá trị như hiếu đạo, kính trọng người già và sự hoà hợp cộng đồng',
        'Các lễ hội lớn được tổ chức hằng năm',
        'Nghề thủ công truyền thống đang được hồi sinh',
        'Ẩm thực Việt Nam nổi tiếng khắp thế giới',
      ],
      answer: 0,
      dan: 'Values like filial piety, respect for elders, and community harmony shaped by Confucianism, Buddhism, and Taoism continue to define Vietnamese identity despite modernization and globalization.',
    },
  ],

  'e-learning-vstep': [
    {
      q: 'Vì sao học trực tuyến chuyển từ thứ xa xỉ thành nhu cầu thiết yếu?',
      options: [
        'Vì đại dịch đã làm thay đổi giáo dục trên toàn thế giới',
        'Vì học phí trực tuyến rẻ hơn nhiều',
        'Vì các trường đại học lớn ngừng dạy trực tiếp',
        'Vì công nghệ thực tế ảo đã đủ rẻ',
      ],
      answer: 0,
      dan: 'The pandemic transformed education worldwide, making e-learning a necessity rather than a luxury.',
    },
    {
      q: 'Bài coi mô hình nào là lý tưởng?',
      options: [
        'Học kết hợp, phối hợp dạy trực tiếp với công cụ số',
        'Học hoàn toàn tự định nhịp, không có giờ cố định',
        'Học hoàn toàn trực tuyến theo thời gian thực',
        'Học qua các khoá MOOC miễn phí là chính',
      ],
      answer: 0,
      dan: 'Blended learning emerged as the ideal hybrid model, combining face-to-face instruction with digital tools.',
    },
    {
      q: 'Khoảng cách số gây ra hậu quả gì?',
      options: [
        'Học sinh nông thôn không có kết nối hay băng thông, làm bất bình đẳng giáo dục rộng thêm',
        'Giáo viên phải dạy nhiều giờ hơn trước',
        'Các trường phải mua thêm phần mềm bản quyền',
        'Chất lượng bài giảng bị giảm đồng loạt',
      ],
      answer: 0,
      dan: 'However, the digital divide left rural students without connectivity or bandwidth, widening educational inequality.',
    },
    {
      q: 'Những lo ngại nào dẫn tới giải pháp giám sát thi bằng AI?',
      options: [
        'Riêng tư, an ninh mạng, đạo văn và gian lận',
        'Tốc độ mạng và chất lượng video',
        'Chi phí nền tảng và bản quyền nội dung',
        'Sự trì hoãn và tỉ lệ bỏ học cao',
      ],
      answer: 0,
      dan: 'Concerns about privacy, cybersecurity, plagiarism, and cheating led to AI proctoring solutions.',
    },
  ],

  'health-medicine-vstep': [
    {
      q: 'Bài kết lại rằng tuổi thọ khoẻ mạnh phụ thuộc vào những gì?',
      options: [
        'Không chỉ y học và hệ thống y tế, mà còn thói quen hằng ngày như ngủ đủ, tránh thuốc lá và rượu, giữ vệ sinh',
        'Chủ yếu vào chất lượng bệnh viện nơi mình sống',
        'Chủ yếu vào việc tiêm đủ các loại vắc-xin',
        'Chủ yếu vào yếu tố di truyền của mỗi người',
      ],
      answer: 0,
      dan: 'A healthy lifespan depends not only on medicine and healthcare systems but also on daily habits, such as getting enough sleep, avoiding smoking or excess alcohol, and practicing good hygiene and sanitation.',
    },
    {
      q: 'Theo bài, khi nào thì cần đơn thuốc kháng sinh?',
      options: [
        'Khi bị nhiễm khuẩn — còn vấn đề nhẹ như đau họng thì bài thuốc tự nhiên có thể đủ',
        'Khi bị sốt cao trên ba ngày',
        'Khi kết quả chụp X-quang bất thường',
        'Khi bệnh nhân phải nhập viện cấp cứu',
      ],
      answer: 0,
      dan: 'For minor issues like a sore throat, a natural remedy might suffice, but a bacterial infection often requires a prescription for an antibiotic from a pharmacy.',
    },
    {
      q: 'Bác sĩ đưa ra chẩn đoán bằng cách nào?',
      options: [
        'Qua xét nghiệm máu hoặc chụp X-quang',
        'Qua hỏi bệnh sử gia đình',
        'Qua đo huyết áp và nhịp tim',
        'Qua theo dõi bệnh nhân trong 24 giờ',
      ],
      answer: 0,
      dan: 'There, a physician can make a diagnosis through a blood test or x-ray.',
    },
    {
      q: 'Bài nói gì về sức khoẻ tinh thần?',
      options: [
        'Đang được chú ý nhiều hơn, với nhà tâm lý trị liệu cho căng thẳng, lo âu và trầm cảm',
        'Vẫn bị bỏ qua hoàn toàn trong hệ thống y tế',
        'Chỉ cần tập thể dục đều là đủ',
        'Là vấn đề của riêng người cao tuổi',
      ],
      answer: 0,
      dan: 'Moreover, mental health is gaining attention, with psychologists providing therapy for stress, anxiety, and depression.',
    },
  ],

  'technology-internet-vstep': [
    {
      q: 'Bài so sánh máy tính vài thập kỷ trước với thiết bị ngày nay ra sao?',
      options: [
        'Trước kia máy tính cồng kềnh, nay ai cũng mang theo điện thoại thông minh hoặc máy tính bảng',
        'Trước kia máy tính đắt, nay giá đã rẻ hơn nhiều',
        'Trước kia máy tính chỉ dùng trong công sở, nay dùng ở trường học',
        'Trước kia máy tính chạy chậm, nay xử lý nhanh gấp trăm lần',
      ],
      answer: 0,
      dan: 'A few decades ago, computers were bulky, but today, everyone carries a smartphone or tablet.',
    },
    {
      q: 'Bài nêu ba biện pháp bảo vệ nào trước tin tặc?',
      options: [
        'Cài tường lửa, chọn mật khẩu mạnh và dùng xác thực hai lớp khi đăng nhập',
        'Đổi mật khẩu hằng tuần, khoá máy và sao lưu dữ liệu',
        'Dùng mạng riêng ảo, xoá cookie và tắt định vị',
        'Cập nhật phần mềm, quét vi-rút và mã hoá ổ cứng',
      ],
      answer: 0,
      dan: 'Hackers use malware, viruses, and phishing to steal data, so installing a firewall, choosing a strong password, and using two-factor authentication for login are crucial.',
    },
    {
      q: 'Bài cảnh báo những mặt trái nào?',
      options: [
        'Bắt nạt trên mạng xã hội và nghiện làm tăng thời gian nhìn màn hình',
        'Lỗi phần mềm khiến hệ thống phải khởi động lại',
        'Chi phí thiết bị ngày càng đắt đỏ',
        'Thiếu người biết dùng công nghệ mới',
      ],
      answer: 0,
      dan: 'Yet, we must be mindful of the downsides, such as cyberbullying on social media and addiction that increases screen time.',
    },
    {
      q: 'Những công nghệ tiên tiến nào đang thúc đẩy tự động hoá?',
      options: [
        'Trí tuệ nhân tạo, thuật toán học máy và người máy',
        'Thực tế ảo và thực tế tăng cường',
        'Điện toán đám mây và thương mại điện tử',
        'Mạng không dây băng thông rộng',
      ],
      answer: 0,
      dan: 'Beyond basic tech, cutting-edge innovations like artificial intelligence, machine learning algorithms, and robotics are driving automation.',
    },
  ],

  'environment-conservation-vstep': [
    {
      q: 'Theo bài, chuỗi nhân quả dẫn tới nóng lên toàn cầu bắt đầu từ đâu?',
      options: [
        'Đốt nhiên liệu hoá thạch như than và dầu, thải khí nhà kính giữ nhiệt trong khí quyển',
        'Chặt phá rừng làm mất khả năng hấp thụ khí carbon',
        'Xả chất thải công nghiệp xuống sông ngòi',
        'Săn bắt trái phép làm mất cân bằng sinh thái',
      ],
      answer: 0,
      dan: 'The burning of fossil fuels like coal and oil creates massive greenhouse gas emissions, trapping heat in the atmosphere and causing global warming.',
    },
    {
      q: 'Nhiệt độ toàn cầu tăng dẫn tới hậu quả gì cho các thành phố ven biển?',
      options: [
        'Sông băng tan, mực nước biển dâng, đe doạ xói lở',
        'Bão nhiệt đới xuất hiện quanh năm',
        'Nguồn nước ngọt bị nhiễm mặn hoàn toàn',
        'Dân cư phải di dời vào sâu trong đất liền',
      ],
      answer: 0,
      dan: 'As the global temperature rises, glaciers melt, and sea levels rise, threatening coastal cities with erosion.',
    },
    {
      q: 'Điều gì đẩy nhiều loài động thực vật tới bờ tuyệt chủng?',
      options: [
        'Phá rừng và săn trộm phá huỷ môi trường sống của động vật hoang dã',
        'Ô nhiễm không khí ở các đô thị lớn',
        'Nhiệt độ đại dương tăng nhanh',
        'Việc du nhập các loài ngoại lai',
      ],
      answer: 0,
      dan: 'Deforestation and poaching destroy wildlife habitats, pushing many species of flora and fauna toward extinction.',
    },
    {
      q: 'Giải pháp năng lượng mà bài đề xuất là gì?',
      options: [
        'Thay nhiên liệu hoá thạch bằng điện mặt trời, tua-bin gió và thuỷ điện',
        'Xây thêm nhà máy điện hạt nhân',
        'Nhập khẩu năng lượng sạch từ nước ngoài',
        'Giảm một nửa mức tiêu thụ điện toàn cầu',
      ],
      answer: 0,
      dan: 'We need to replace fossil fuels with alternative, renewable energy sources like solar power, wind turbines, and hydroelectricity to reduce our carbon footprint.',
    },
  ],

  'work-career-vstep': [
    {
      q: 'Theo câu mở đầu, một sự nghiệp thành công đòi hỏi những gì ngoài bằng cấp tốt?',
      options: [
        'Kinh nghiệm, kỹ năng mềm như làm việc nhóm và khả năng phối hợp',
        'Quan hệ rộng và may mắn',
        'Sẵn sàng làm thêm giờ thường xuyên',
        'Khả năng ngoại ngữ và tin học',
      ],
      answer: 0,
      dan: 'Building a successful career requires more than just a good qualification; it demands experience, soft skills like teamwork, and the ability to collaborate.',
    },
    {
      q: 'Hành trình nghề nghiệp thường bắt đầu bằng việc gì?',
      options: [
        'Ứng viên gửi hồ sơ cho nhà tuyển dụng, mong được phỏng vấn',
        'Ứng viên thực tập tại một công ty khởi nghiệp',
        'Ứng viên tham gia một khoá đào tạo nghề',
        'Ứng viên được người quen giới thiệu',
      ],
      answer: 0,
      dan: 'The journey often begins when an applicant sends a resume to an employer, hoping for a job interview.',
    },
    {
      q: 'Lãnh đạo tốt giúp nhân viên tránh được điều gì?',
      options: [
        'Kiệt sức, và giữ được cân bằng giữa công việc với cuộc sống',
        'Bị đánh giá kém trong kỳ xét thưởng',
        'Phải chuyển sang bộ phận khác',
        'Mất cơ hội thăng tiến trong công ty',
      ],
      answer: 0,
      dan: 'Good leadership helps employees avoid burnout and maintain a healthy work-life balance, especially when doing overtime.',
    },
    {
      q: 'Làm việc từ xa trở nên phổ biến giúp nhân viên tránh được điều gì?',
      options: [
        'Quãng đường đi làm dài mỗi ngày',
        'Các cuộc họp kéo dài không cần thiết',
        'Áp lực từ cấp trên trực tiếp',
        'Chi phí thuê nhà gần trung tâm',
      ],
      answer: 0,
      dan: 'With the rise of technology, remote work and telecommuting have become popular, allowing staff to avoid a long daily commute.',
    },
  ],

  'space-exploration-vstep': [
    {
      q: 'Phi hành gia phải luyện tập trong thiết bị nào, và để chuẩn bị cho điều gì?',
      options: [
        'Trong buồng mô phỏng, để quen môi trường không trọng lực và bức xạ vũ trụ',
        'Trong đài quan sát, để học cách dùng kính thiên văn',
        'Trong khoang tàu, để quen với lực đẩy khi phóng',
        'Trong phòng thí nghiệm, để học phân tích mẫu vật',
      ],
      answer: 0,
      dan: 'An astronaut or cosmonaut must undergo rigorous training in a simulator to prepare for the zero gravity environment and cosmic radiation.',
    },
    {
      q: 'Các tàu thăm dò và xe tự hành không người lái được gửi tới sao Hoả để tìm gì?',
      options: [
        'Dấu vết của nước hoặc sự sống ngoài Trái Đất',
        'Khoáng sản có thể khai thác được',
        'Vị trí thích hợp để xây thuộc địa',
        'Nguồn năng lượng thay thế cho Trái Đất',
      ],
      answer: 0,
      dan: 'Unmanned probes and rovers are also sent to explore the surface of Mars, searching for signs of water or extraterrestrial life.',
    },
    {
      q: 'Vì sao một số nhà khoa học tin rằng con người sẽ lập thuộc địa trên hành tinh khác?',
      options: [
        'Để bảo đảm sự sống còn nếu Trái Đất gặp thảm hoạ',
        'Để khai thác tài nguyên đưa về Trái Đất',
        'Để giảm tải dân số cho Trái Đất',
        'Để nghiên cứu sự sống ngoài hành tinh tại chỗ',
      ],
      answer: 0,
      dan: 'Some scientists believe that in the future, humans will colonise habitable planets, building a colony to ensure survival if Earth faces a catastrophe.',
    },
    {
      q: 'Bài kết lại thế nào về du hành liên sao?',
      options: [
        'Vẫn còn là lý thuyết, nhưng tiến bộ công nghệ đang biến khoa học viễn tưởng thành hiện thực',
        'Sẽ thực hiện được trong vòng vài thập kỷ tới',
        'Là điều bất khả thi với con người',
        'Chỉ khả thi nếu tìm được hành tinh sống được',
      ],
      answer: 0,
      dan: 'While interstellar travel across light years remains a theory in astrophysics, our technological advancements continue to expand our horizon, turning what was once science fiction into reality.',
    },
  ],

  'history-archaeology-vstep': [
    {
      q: 'Nhà khảo cổ dựng lại đời sống của tổ tiên bằng cách nào?',
      options: [
        'Nghiên cứu hiện vật cổ, đồ gốm và hoá thạch',
        'Đọc các bản thảo lưu trong kho lưu trữ',
        'So sánh truyền thuyết với ghi chép lịch sử',
        'Phân tích cấu trúc các lâu đài trung cổ',
      ],
      answer: 0,
      dan: 'By examining ancient artifacts, pottery, and fossils, an archaeologist can reconstruct the lives of our ancestors.',
    },
    {
      q: 'Xã hội trung cổ được bài mô tả phân chia ra sao?',
      options: [
        'Nông dân làm ruộng, còn quý tộc và hiệp sĩ sống trong lâu đài đá có hào bảo vệ',
        'Thương nhân giàu có nắm quyền, nông dân làm thuê',
        'Tăng lữ cai quản, dân thường phục dịch',
        'Vua chia đất đều cho mọi tầng lớp',
      ],
      answer: 0,
      dan: 'In the Middle Ages, medieval society was divided: peasants worked the land, while nobles and knights lived in stone castles protected by moats, defending their kingdom from siege.',
    },
    {
      q: 'Vũ khí mạnh hơn ở thời đồ đồng và đồ sắt dẫn tới điều gì?',
      options: [
        'Những trận chiến đẫm máu khi các vương quốc muốn chiếm đất và mở rộng đế chế',
        'Sự sụp đổ của các bộ lạc săn bắt hái lượm',
        'Việc xây dựng các thành trì kiên cố hơn',
        'Sự ra đời của các hiệp ước hoà bình đầu tiên',
      ],
      answer: 0,
      dan: 'During the Bronze Age and Iron Age, societies developed stronger weapons like swords and spears, leading to bloody battles as kingdoms sought to conquer new territory and expand their empire.',
    },
    {
      q: 'Bài kết lại rằng nhờ những kỹ thuật như định tuổi bằng carbon, chúng ta làm được gì?',
      options: [
        'Bảo tồn di sản văn hoá và lần theo tiến hoá của loài người theo trình tự thời gian',
        'Xác định chính xác niên đại mọi công trình cổ',
        'Chứng minh mọi truyền thuyết đều có thật',
        'Tái tạo lại ngôn ngữ của người tiền sử',
      ],
      answer: 0,
      dan: 'Thanks to techniques like carbon dating, we can preserve our cultural heritage and trace human evolution chronologically, learning valuable lessons from our ancestors’ victories and defeats.',
    },
  ],

  'art-entertainment-vstep': [
    {
      q: 'Trước đêm công diễn, diễn viên phải chuẩn bị những gì?',
      options: [
        'Tập kịch bản, mặc đúng trang phục và hoá trang',
        'Gặp gỡ khán giả và báo chí',
        'Tự viết lại lời thoại cho vai của mình',
        'Chọn nhạc nền cho vở diễn',
      ],
      answer: 0,
      dan: 'Before opening night, they must rehearse the script and wear the correct costume and makeup.',
    },
    {
      q: 'Theo bài, khán giả phản ứng thế nào tuỳ vào chất lượng vở diễn?',
      options: [
        'Vở hay thì vỗ tay vang dội, vở dở thì có thể la ó',
        'Vở hay thì đứng dậy, vở dở thì bỏ về giữa chừng',
        'Vở hay thì tặng hoa, vở dở thì im lặng',
        'Vở hay thì xin chữ ký, vở dở thì đòi lại tiền vé',
      ],
      answer: 0,
      dan: 'When the curtain falls, if the drama or comedy was good, the audience will give a loud applause; if it was bad, they might boo.',
    },
    {
      q: 'Ai cùng nhau làm nên một bộ phim theo bài?',
      options: [
        'Đạo diễn và nhà sản xuất tài năng',
        'Đạo diễn và diễn viên chính',
        'Nhà sản xuất và người viết kịch bản',
        'Nhà quay phim và người dựng phim',
      ],
      answer: 0,
      dan: 'A talented director and producer work together to create a movie with a thrilling plot, brave heroes, and evil villains.',
    },
    {
      q: 'Bài nói gì về sức mạnh của âm nhạc?',
      options: [
        'Dù là dàn nhạc cổ điển, ban nhạc rock hay ca sĩ nhạc pop, giai điệu bắt tai có thể lan truyền và biến nhạc sĩ thành thần tượng',
        'Chỉ nhạc cổ điển mới được coi là nghệ thuật thật sự',
        'Âm nhạc hiện đại đang mất dần khán giả',
        'Nhạc sống luôn hay hơn nhạc thu âm',
      ],
      answer: 0,
      dan: 'Whether it is a classical orchestra playing a complex melody, a rock band going on tour, or a pop singer performing at a crowded festival, a good rhythm and catchy lyrics can go viral, turning musicians into idols for millions of fans.',
    },
  ],

  'crime-law-vstep': [
    {
      q: 'Thám tử tìm kiếm những gì tại hiện trường vụ án?',
      options: [
        'Manh mối như dấu vân tay hoặc vũ khí giấu kín',
        'Lời khai của người dân xung quanh',
        'Camera giám sát của các nhà lân cận',
        'Động cơ gây án của nghi phạm',
      ],
      answer: 0,
      dan: 'Detectives search the crime scene for a clue, like a fingerprint or a hidden weapon.',
    },
    {
      q: 'Công tố viên và luật sư bào chữa làm việc gì tại phiên toà?',
      options: [
        'Công tố viên đưa chứng cứ chứng minh bị cáo có tội, luật sư bào chữa lập luận thân chủ vô tội',
        'Cả hai cùng thẩm vấn nhân chứng để tìm sự thật',
        'Công tố viên đề nghị mức án, luật sư xin giảm nhẹ',
        'Công tố viên điều tra tiếp, luật sư thu thập bằng chứng mới',
      ],
      answer: 0,
      dan: 'A prosecutor presents evidence to prove the accused is guilty, while a defense lawyer or attorney tries to defend their client, arguing they are innocent.',
    },
    {
      q: 'Hình phạt mà thẩm phán có thể tuyên gồm những gì?',
      options: [
        'Phạt tiền nặng, án treo, hoặc ngồi tù vài năm',
        'Lao động công ích hoặc quản chế tại nhà',
        'Bồi thường cho nạn nhân và xin lỗi công khai',
        'Tước quyền công dân trong một thời hạn',
      ],
      answer: 0,
      dan: 'The punishment might be a heavy fine, probation, or being sent to prison for several years.',
    },
    {
      q: 'Bài kết lại rằng quy trình pháp lý này được thiết kế để làm gì?',
      options: [
        'Bảo vệ nạn nhân, trừng phạt người vi phạm và bảo đảm công lý công bằng, không thiên vị',
        'Giảm số vụ phạm tội trong xã hội',
        'Giúp người phạm tội có cơ hội làm lại',
        'Tăng niềm tin của dân chúng vào cảnh sát',
      ],
      answer: 0,
      dan: 'This legal process is designed to protect victims, punish those who violate the rules, and ensure that justice is fair and unbiased.',
    },
  ],

  'society-culture-vstep': [
    {
      q: 'Theo bài, nghèo đói, thất nghiệp và thiếu giáo dục thường dẫn tới điều gì?',
      options: [
        'Mức sống thấp hơn cho nhóm thiểu số',
        'Làn sóng di cư ra nước ngoài',
        'Sự sụp đổ của các giá trị truyền thống',
        'Mâu thuẫn giữa các thế hệ trong gia đình',
      ],
      answer: 0,
      dan: 'Issues such as poverty, unemployment, and lack of education often lead to a lower standard of living for the minority.',
    },
    {
      q: 'Người nhập cư và người tị nạn vẫn phải đối mặt với điều gì trong đời sống hằng ngày?',
      options: [
        'Định kiến và những khuôn mẫu có hại',
        'Rào cản ngôn ngữ khi tìm việc làm',
        'Sự khác biệt về tín ngưỡng tôn giáo',
        'Khó khăn trong việc tiếp cận y tế',
      ],
      answer: 0,
      dan: 'Another significant social problem is discrimination and racism; many immigrants and refugees still encounter prejudice and harmful stereotypes in their daily lives.',
    },
    {
      q: 'Bài nêu giáo dục tốt giúp giới trẻ đạt được điều gì?',
      options: [
        'Có việc làm ổn định và thu nhập tốt hơn',
        'Hoà nhập nhanh hơn vào môi trường đa văn hoá',
        'Giữ gìn được di sản văn hoá dân tộc',
        'Tránh được mọi hình thức phân biệt đối xử',
      ],
      answer: 0,
      dan: 'For example, providing a good education can help the youth secure stable employment and a better income.',
    },
    {
      q: 'Bài kết lại rằng bằng cách nào ta có thể giảm xung đột và hy vọng vào hoà bình?',
      options: [
        'Tôn trọng sự đa dạng và phá bỏ rào cản ngôn ngữ',
        'Tăng viện trợ cho các nước đang phát triển',
        'Thống nhất các giá trị văn hoá toàn cầu',
        'Hạn chế dòng người di cư giữa các nước',
      ],
      answer: 0,
      dan: 'By respecting diversity and breaking down the language barrier, we can reduce conflict, resolve international issues, and hope for a world defined by peace rather than war.',
    },
  ],

  'media-press-vstep': [
    {
      q: 'Một nhà báo đáng tin cậy làm gì, nhất là khi đưa tin nóng?',
      options: [
        'Kiểm chứng nguồn tin để bài viết khách quan',
        'Đăng tin nhanh nhất có thể để dẫn đầu',
        'Phỏng vấn càng nhiều người càng tốt',
        'Chờ cơ quan chức năng xác nhận rồi mới đăng',
      ],
      answer: 0,
      dan: 'A reliable journalist or reporter will verify their sources to provide an objective article, especially when covering breaking news.',
    },
    {
      q: 'Báo lá cải và các nền tảng trực tuyến dùng cách gì để hút người xem?',
      options: [
        'Tít giật gân câu khách, lan truyền tin giả và tin đồn chưa kiểm chứng',
        'Giảm giá đăng ký thuê bao hằng tháng',
        'Mời người nổi tiếng viết chuyên mục riêng',
        'Đăng nhiều ảnh và video hơn chữ viết',
      ],
      answer: 0,
      dan: 'Tabloids and online platforms often use clickbait headlines to attract viewers, spreading fake news and unverified rumors.',
    },
    {
      q: 'Theo bài, các nhãn hàng trả tiền cho ai để quảng bá sản phẩm?',
      options: [
        'Người có ảnh hưởng trên mạng',
        'Các tờ báo lớn có nhiều độc giả',
        'Đội ngũ phóng viên ảnh chuyên nghiệp',
        'Các đài truyền hình quốc gia',
      ],
      answer: 0,
      dan: 'Brands even pay an influencer to promote their items.',
    },
    {
      q: 'Nhiều người cho rằng chính phủ cần làm gì, và nhằm mục đích gì?',
      options: [
        'Quản lý chặt truyền thông và kiểm duyệt khi cần, để tin tức vừa hữu ích vừa đáng tin',
        'Cấm hoàn toàn quảng cáo trên mạng xã hội',
        'Tài trợ cho các cơ quan báo chí độc lập',
        'Buộc các nền tảng công khai thuật toán của mình',
      ],
      answer: 0,
      dan: 'To protect citizens from misleading advertisements and harmful content like cyberbullying, many believe the government must strictly regulate the media and enforce censorship where necessary, ensuring that the news remains both informative and trustworthy.',
    },
  ],

  'medicine-healthcare-vstep': [
    {
      q: 'Bài mô tả cảm lạnh thông thường và cúm như thế nào?',
      options: [
        'Rất dễ lây nhưng dễ khỏi nhờ nghỉ ngơi và uống nước ấm',
        'Nguy hiểm nếu không dùng kháng sinh sớm',
        'Chỉ nặng ở người cao tuổi và trẻ nhỏ',
        'Cần chụp X-quang để phân biệt với viêm phổi',
      ],
      answer: 0,
      dan: 'Sometimes, we only catch a common cold or the flu, which are highly contagious but easily cured with rest and warm fluids.',
    },
    {
      q: 'Nhiễm trùng nặng hoặc gãy xương có thể được điều trị bằng cách nào?',
      options: [
        'Uống thuốc kháng sinh, bó bột, hoặc thậm chí phải phẫu thuật',
        'Nghỉ ngơi hoàn toàn và theo dõi tại nhà',
        'Vật lý trị liệu kéo dài nhiều tháng',
        'Truyền dịch và theo dõi huyết áp',
      ],
      answer: 0,
      dan: 'If a person suffers from a severe infection or a fracture, the treatment may involve taking an antibiotic pill, wearing a plaster cast, or even undergoing an operation.',
    },
    {
      q: 'Nhờ sự phát triển của vắc-xin, chúng ta làm được điều gì?',
      options: [
        'Ngăn nhiều bệnh chết người và chặn được đại dịch toàn cầu',
        'Rút ngắn thời gian nằm viện của bệnh nhân',
        'Giảm chi phí chăm sóc sức khoẻ cho xã hội',
        'Kéo dài tuổi thọ trung bình thêm mười năm',
      ],
      answer: 0,
      dan: 'Thanks to the development of vaccines, we can prevent many fatal diseases and stop a global pandemic.',
    },
    {
      q: 'Bài kết lại thế nào về việc quản lý căng thẳng và giữ vận động?',
      options: [
        'Quan trọng ngang với thuốc men khi muốn hồi phục hoàn toàn và tận hưởng cuộc sống',
        'Chỉ cần thiết với người mắc bệnh mạn tính',
        'Nên làm sau khi đã điều trị dứt điểm bệnh',
        'Là việc của nhà tâm lý chứ không phải bác sĩ',
      ],
      answer: 0,
      dan: 'Managing stress and staying active are just as important as medicine when it comes to making a full recovery and enjoying life.',
    },
  ],

  'environment-climate-vstep': [
    {
      q: 'Theo bài, suốt nhiều thập kỷ con người đã làm gì với khí quyển?',
      options: [
        'Đốt nhiên liệu hoá thạch như than và dầu, thải khí độc và chất ô nhiễm',
        'Phá rừng để lấy đất canh tác',
        'Xả rác thải nhựa ra đại dương',
        'Khai thác quá mức nguồn nước ngầm',
      ],
      answer: 0,
      dan: 'For decades, humans have burned fossil fuels like coal and oil, releasing toxic emissions and harmful pollutants into the atmosphere.',
    },
    {
      q: 'Nhiệt độ tăng làm băng Bắc Cực tan, kéo theo hậu quả gì?',
      options: [
        'Mực nước biển dâng cao, đe doạ các thành phố ven biển',
        'Dòng hải lưu đổi hướng bất thường',
        'Nguồn cá ở vùng cực suy giảm',
        'Bão tuyết xuất hiện ở vùng ôn đới',
      ],
      answer: 0,
      dan: 'Furthermore, rising temperatures cause the Arctic glaciers to melt, which leads to higher sea levels that threaten coastal cities.',
    },
    {
      q: 'Những hoạt động nào của con người gây hại cho sinh vật biển và rạn san hô?',
      options: [
        'Phá rừng, khai thác gỗ trái phép và đổ chất thải độc xuống biển',
        'Đánh bắt cá bằng lưới kéo đáy',
        'Xây dựng cảng biển và khu du lịch ven bờ',
        'Vận tải hàng hải và tràn dầu từ tàu chở dầu',
      ],
      answer: 0,
      dan: 'Deforestation, illegal logging, and dumping toxic waste into the ocean harm marine life and coral reefs.',
    },
    {
      q: 'Bài nêu mỗi người có thể góp phần bằng cách nào?',
      options: [
        'Chọn tái chế, dùng sản phẩm thân thiện môi trường và giảm rác thải hằng ngày',
        'Chuyển sang dùng xe điện thay xe xăng',
        'Tham gia các tổ chức bảo vệ môi trường',
        'Trồng cây gây rừng vào mỗi cuối tuần',
      ],
      answer: 0,
      dan: 'Everyone can help by choosing to recycle, using eco-friendly products, and reducing their daily garbage.',
    },
  ],

  'science-technology-vstep': [
    {
      q: 'Nhà khoa học trong phòng thí nghiệm tiến hành thí nghiệm phức tạp nhằm mục đích gì?',
      options: [
        'Để chứng minh một lý thuyết mới',
        'Để tạo ra sản phẩm bán ra thị trường',
        'Để kiểm tra độ an toàn của thiết bị',
        'Để đào tạo thế hệ nghiên cứu viên tiếp theo',
      ],
      answer: 0,
      dan: 'A scientist working in a laboratory might conduct a complex experiment to prove a new theory.',
    },
    {
      q: 'Vì sao an ninh mạng là điều thiết yếu?',
      options: [
        'Vì tin tặc có thể khai thác lỗi phần mềm hoặc dùng vi-rút để lấy cắp mật khẩu',
        'Vì mọi thiết bị đều kết nối qua mạng không dây',
        'Vì dữ liệu ngày càng được lưu nhiều trên đám mây',
        'Vì phần mềm mới ra đời quá nhanh',
      ],
      answer: 0,
      dan: 'Cyber security is crucial because a hacker can exploit a software bug or use a computer virus to steal your password.',
    },
    {
      q: 'Robot hiện đại và trí tuệ nhân tạo đang dẫn tới điều gì?',
      options: [
        'Tự động hoá nhiều công việc',
        'Sự ra đời của mạng internet thế hệ mới',
        'Việc khám phá vũ trụ bằng vệ tinh',
        'Bước đột phá trong nghiên cứu gen',
      ],
      answer: 0,
      dan: 'State-of-the-art robots and artificial intelligence are leading to the automation of many jobs.',
    },
    {
      q: 'Bài kết lại bằng nhận định nào?',
      options: [
        'Chừng nào con người còn phát minh và đổi mới, tương lai khoa học còn đầy khả năng vô tận',
        'Khoa học sẽ sớm giải quyết được mọi vấn đề của nhân loại',
        'Tốc độ đổi mới hiện nay đang vượt khả năng kiểm soát',
        'Công nghệ đem lại nhiều rủi ro hơn lợi ích',
      ],
      answer: 0,
      dan: 'As long as humans continue to invent and innovate, the future of science will remain full of endless possibilities.',
    },
  ],

  'media-journalism-vstep': [
    {
      q: 'Theo bài, báo chí tốt phải như thế nào?',
      options: [
        'Luôn khách quan và dựa vào nguồn tin đáng tin cậy',
        'Đưa tin nhanh hơn các đối thủ cạnh tranh',
        'Phản ánh đúng quan điểm của đa số độc giả',
        'Tránh mọi chủ đề gây tranh cãi',
      ],
      answer: 0,
      dan: 'Good journalism should always remain objective and rely on a reliable source.',
    },
    {
      q: 'Báo lá cải làm gì để hút thêm người xem và tăng lượng phát hành?',
      options: [
        'Dùng tít câu khách và lối giật gân',
        'Hạ giá bán từng số báo',
        'Tăng số trang và số chuyên mục',
        'Mời chuyên gia viết bình luận',
      ],
      answer: 0,
      dan: 'Today, tabloids often use clickbait and sensationalism to attract more viewers and increase their circulation.',
    },
    {
      q: 'Vì sao bài nhấn mạnh phải kiểm chứng thông tin trước khi tin?',
      options: [
        'Vì mạng xã hội khiến tin giả và thông tin sai lệch lan nhanh',
        'Vì các nền tảng không chịu trách nhiệm về nội dung',
        'Vì báo chí chính thống cũng có thể sai sót',
        'Vì kiểm duyệt làm mất một phần sự thật',
      ],
      answer: 0,
      dan: 'Unfortunately, this also leads to the rapid spread of fake news and misinformation.',
    },
    {
      q: 'Bài kết lại rằng bất chấp thiên kiến và kiểm duyệt, tự do ngôn luận bảo đảm điều gì?',
      options: [
        'Báo chí vẫn có thể phơi bày tiêu cực, thông tin cho công chúng và cả giải trí',
        'Mọi công dân đều có quyền tự xuất bản tin tức',
        'Chính phủ không được can thiệp vào nội dung báo chí',
        'Nhà báo được bảo vệ khỏi các vụ kiện',
      ],
      answer: 0,
      dan: 'Despite the challenges of bias and censorship, freedom of speech ensures that the press can continue to expose corrupt practices, inform the public, and even entertain us with documentaries, podcasts, and infotainment.',
    },
  ],

  'crime-punishment-vstep': [
    {
      q: 'Bài phân biệt trộm cắp và đột nhập như thế nào?',
      options: [
        'Trộm cắp là kẻ trộm lấy xe, còn đột nhập là kẻ gian phá cửa vào nhà',
        'Trộm cắp xảy ra ban ngày, đột nhập xảy ra ban đêm',
        'Trộm cắp là tội nhẹ, đột nhập luôn là tội bạo lực',
        'Trộm cắp do một người, đột nhập do một nhóm thực hiện',
      ],
      answer: 0,
      dan: 'More serious crimes include theft, where a thief might steal a car, or burglary, where a burglar breaks into a house.',
    },
    {
      q: 'Bị cáo có thể làm gì để chứng minh mình vô tội?',
      options: [
        'Phủ nhận cáo buộc và đưa ra bằng chứng ngoại phạm',
        'Yêu cầu thay đổi thẩm phán xét xử',
        'Đề nghị bồi thường cho người bị hại',
        'Xin xét xử kín để bảo vệ danh dự',
      ],
      answer: 0,
      dan: 'The defendant might confess, or they might deny the charges and present an alibi to prove they are innocent.',
    },
    {
      q: 'Nếu không đủ chứng cứ thì kết cục ra sao?',
      options: [
        'Bị cáo được tuyên trắng án',
        'Vụ án bị tạm đình chỉ để điều tra thêm',
        'Bị cáo phải chịu án treo',
        'Toà chuyển hồ sơ lên cấp cao hơn',
      ],
      answer: 0,
      dan: 'However, if there is not enough evidence, the defendant will be acquitted.',
    },
    {
      q: 'Bài kết lại rằng hệ thống này bảo đảm điều gì?',
      options: [
        'Tội phạm bị trừng phạt trong khi quyền của người vô tội được bảo vệ',
        'Mọi vụ án đều được xét xử công khai',
        'Số vụ phạm tội trong xã hội sẽ giảm dần',
        'Nạn nhân luôn được bồi thường thoả đáng',
      ],
      answer: 0,
      dan: 'This system ensures that criminals are punished while protecting the rights of the innocent.',
    },
  ],

  'business-finance-vstep': [
    {
      q: 'Một doanh nghiệp thành công thường khởi đầu như thế nào?',
      options: [
        'Là một công ty khởi nghiệp nhỏ của người sáng lập có ý tưởng hay nhưng cần vốn',
        'Là một chi nhánh tách ra từ tập đoàn lớn',
        'Là một cơ sở sản xuất gia đình mở rộng dần',
        'Là kết quả của việc sáp nhập hai công ty nhỏ',
      ],
      answer: 0,
      dan: 'A successful enterprise usually starts as a small startup created by an entrepreneur who has a great idea but needs capital.',
    },
    {
      q: 'Để lớn lên, công ty có thể huy động vốn bằng cách nào?',
      options: [
        'Tìm nguồn tài trợ từ nhà đầu tư hoặc vay ngân hàng',
        'Bán bớt tài sản cố định hiện có',
        'Tăng giá bán sản phẩm ra thị trường',
        'Cắt giảm chi phí nhân sự và vận hành',
      ],
      answer: 0,
      dan: 'To grow, the company might seek funding from an investor or take out a bank loan.',
    },
    {
      q: 'Tập đoàn lớn phát hành cổ phiếu để làm gì, và trả gì cho cổ đông khi lãi cao?',
      options: [
        'Để huy động tiền, và trả cổ tức cho từng cổ đông',
        'Để tăng giá trị thương hiệu, và thưởng thêm cổ phiếu',
        'Để mở rộng thị phần, và giảm giá sản phẩm',
        'Để trả nợ ngân hàng, và tăng lương nhân viên',
      ],
      answer: 0,
      dan: 'A large corporation often issues stock on the stock market to raise money, paying a dividend to each shareholder when profits are high.',
    },
    {
      q: 'Lạm phát và suy thoái ảnh hưởng thế nào theo bài?',
      options: [
        'Lạm phát làm giảm nhu cầu tiêu dùng, còn suy thoái tác động tới cả ngành',
        'Cả hai đều làm tăng chi phí vay vốn',
        'Lạm phát làm tăng doanh thu, suy thoái làm giảm lợi nhuận',
        'Cả hai đều khiến tỉ giá hối đoái ổn định hơn',
      ],
      answer: 0,
      dan: 'Factors like inflation can reduce consumer demand, while a recession impacts the whole industry.',
    },
  ],

  'economy-trade-vstep': [
    {
      q: 'Khi nào một nước có thặng dư thương mại?',
      options: [
        'Khi xuất khẩu vượt nhập khẩu',
        'Khi nhập khẩu vượt xuất khẩu',
        'Khi cán cân ngân sách dương',
        'Khi đầu tư nước ngoài tăng mạnh',
      ],
      answer: 0,
      dan: 'When a country’s exports exceed its imports, it enjoys a trade surplus; otherwise, it faces a deficit.',
    },
    {
      q: 'Thời kỳ bùng nổ kinh tế mang lại những gì?',
      options: [
        'Tăng việc làm, nhu cầu tiêu dùng và đầu tư trực tiếp nước ngoài',
        'Tăng thuế và chi tiêu công',
        'Tăng lãi suất và tiết kiệm của dân cư',
        'Tăng xuất khẩu và giảm nhập khẩu',
      ],
      answer: 0,
      dan: 'A period of economic boom increases employment, consumer demand, and foreign direct investment (FDI).',
    },
    {
      q: 'Để giữ thế cân bằng, ngân hàng trung ương và chính phủ dùng công cụ nào?',
      options: [
        'Ngân hàng trung ương dùng chính sách tiền tệ điều chỉnh lãi suất, chính phủ dùng chính sách tài khoá',
        'Ngân hàng trung ương điều chỉnh tỉ giá, chính phủ điều chỉnh thuế nhập khẩu',
        'Cả hai cùng điều chỉnh mức lương tối thiểu',
        'Ngân hàng trung ương phát hành trái phiếu, chính phủ vay nước ngoài',
      ],
      answer: 0,
      dan: 'To maintain an equilibrium, the central bank uses monetary policy to adjust the interest rate, while the government relies on fiscal policy, adjusting its budget and tax revenue.',
    },
    {
      q: 'Theo kinh tế học vĩ mô, GDP là chỉ số then chốt của điều gì?',
      options: [
        'Tăng trưởng tổng thể của một quốc gia',
        'Mức sống trung bình của người dân',
        'Sức mua của đồng nội tệ',
        'Quy mô của khu vực sản xuất',
      ],
      answer: 0,
      dan: 'Macroeconomics shows that a country’s GDP is a key indicator of its overall growth.',
    },
  ],

  'transport-logistics-vstep': [
    {
      q: 'Các công ty kho vận điều đội xe tải để làm gì?',
      options: [
        'Chở hàng từ kho lớn tới cửa hàng bán lẻ',
        'Phân phối hàng trực tiếp tới người tiêu dùng',
        'Đưa hàng ra cảng để xuất khẩu',
        'Thu gom hàng từ các nhà sản xuất nhỏ',
      ],
      answer: 0,
      dan: 'They dispatch a fleet of trucks to transport cargo from a massive warehouse to a retail store.',
    },
    {
      q: 'Hàng hoá đi quốc tế được vận chuyển bằng phương tiện nào?',
      options: [
        'Hãng hàng không hoặc công-ten-nơ trên tàu lớn',
        'Đường sắt xuyên quốc gia',
        'Đội xe tải đường dài',
        'Kho trung chuyển ở biên giới',
      ],
      answer: 0,
      dan: 'Sometimes, freight is moved globally by an airline or a shipping container on a large vessel.',
    },
    {
      q: 'Hỏng xe hoặc va chạm gây hậu quả gì?',
      options: [
        'Chậm trễ nghiêm trọng lịch giao hàng, ảnh hưởng cả nhà phân phối lẫn người tiêu dùng',
        'Tăng chi phí bảo hiểm cho cả đội xe',
        'Buộc phải đổi tuyến đường vận chuyển',
        'Làm hư hỏng hàng hoá trong công-ten-nơ',
      ],
      answer: 0,
      dan: 'A breakdown or a collision can cause a severe delay in the delivery schedule, affecting both the distributor and the consumer.',
    },
    {
      q: 'Các nhà quy hoạch hiện đang tập trung vào điều gì?',
      options: [
        'Giao thông đô thị bền vững, khuyến khích đi chung xe hoặc dùng xe điện để giảm khí thải',
        'Mở rộng mạng lưới đường cao tốc liên tỉnh',
        'Xây thêm kho bãi gần trung tâm thành phố',
        'Số hoá toàn bộ quy trình chuỗi cung ứng',
      ],
      answer: 0,
      dan: 'Today, planners are focusing on sustainable urban mobility, encouraging people to carpool or use electric vehicles to reduce harmful emissions.',
    },
  ],

  'urbanization-city-vstep': [
    {
      q: 'Vì sao mỗi năm hàng nghìn người rời nông thôn ra thành phố lớn?',
      options: [
        'Để tìm việc làm tốt hơn và mức sống cao hơn',
        'Để con cái được học ở trường tốt hơn',
        'Để tránh thiên tai ở vùng nông thôn',
        'Để tiếp cận dịch vụ y tế hiện đại',
      ],
      answer: 0,
      dan: 'Every year, rural-to-urban migration brings thousands of people to a bustling metropolis in search of better employment and a higher standard of living.',
    },
    {
      q: 'Quá tải dân số dẫn tới những hệ quả nào?',
      options: [
        'Giao thông công cộng chật cứng, tắc đường nặng và thiếu nhà ở giá phải chăng',
        'Giá đất tăng và các khu công nghiệp mở rộng',
        'Trường học và bệnh viện quá tải',
        'Nguồn nước sạch cạn kiệt dần',
      ],
      answer: 0,
      dan: 'Overpopulation leads to overcrowded public transport, severe traffic congestion, and a serious shortage of affordable housing.',
    },
    {
      q: 'Dù có nhiều vấn đề, thành phố vẫn mang lại điều gì?',
      options: [
        'Sự tiện lợi, đời sống văn hoá giải trí đa dạng và tiện ích tuyệt vời',
        'Cơ hội việc làm cho mọi trình độ',
        'Môi trường sống an toàn hơn nông thôn',
        'Chi phí sinh hoạt thấp hơn theo thời gian',
      ],
      answer: 0,
      dan: 'Despite these problems, cities offer incredible convenience, diverse cultural entertainment, and excellent amenities.',
    },
    {
      q: 'Bài nêu chính quyền phải làm những gì?',
      options: [
        'Giải quyết bất bình đẳng, giữ không gian xanh thiết yếu và nâng cấp hạ tầng',
        'Hạn chế người nhập cư vào thành phố',
        'Xây thêm nhà cao tầng ở vùng ven',
        'Di dời các khu công nghiệp ra ngoại thành',
      ],
      answer: 0,
      dan: 'Governments must tackle inequality, preserve essential green space, and upgrade the infrastructure.',
    },
  ],

  'space-astronomy-vstep': [
    {
      q: 'Các nhà thiên văn thời đầu quan sát bầu trời bằng gì?',
      options: [
        'Một chiếc kính thiên văn đơn giản',
        'Mắt thường và bản đồ sao vẽ tay',
        'Đài quan sát xây trên đỉnh núi',
        'Đồng hồ mặt trời và la bàn',
      ],
      answer: 0,
      dan: 'Early astronomers used a simple telescope to observe a distant star, a moving planet, or a beautiful constellation.',
    },
    {
      q: 'Con người phóng tên lửa mang tàu thăm dò tới sao Hoả để tìm gì?',
      options: [
        'Dấu hiệu của sự sống ngoài Trái Đất',
        'Nguồn nước có thể khai thác',
        'Địa điểm hạ cánh cho phi hành gia',
        'Khoáng sản hiếm trên bề mặt',
      ],
      answer: 0,
      dan: 'We launch a powerful rocket to send a probe or a rover to study the surface of Mars, looking for signs of extraterrestrial life.',
    },
    {
      q: 'Một ngôi sao đang tàn tạo ra hiện tượng gì?',
      options: [
        'Nổ thành siêu tân tinh, để lại một tinh vân rực sáng',
        'Co lại thành một hố đen khổng lồ',
        'Tan thành bụi vũ trụ trong chân không',
        'Biến thành một thiên thạch bay quanh quỹ đạo',
      ],
      answer: 0,
      dan: 'Out in the vast vacuum of space, incredible phenomena occur: a dying star explodes as a supernova, leaving behind a glowing nebula, while a massive black hole traps everything, even light.',
    },
    {
      q: 'Du hành vũ trụ thương mại phát triển dẫn tới kế hoạch gì?',
      options: [
        'Một số công ty dự tính xây thuộc địa trên Mặt Trăng',
        'Đưa khách du lịch lên Trạm Vũ trụ Quốc tế',
        'Khai thác khoáng sản từ các tiểu hành tinh',
        'Phóng thêm vệ tinh quan sát Trái Đất',
      ],
      answer: 0,
      dan: 'With the rise of commercial space travel, some companies even plan to build a colony on the moon.',
    },
  ],

  'energy-resources-vstep': [
    {
      q: 'Suốt nhiều thập kỷ, nguồn cung năng lượng chính của chúng ta là gì?',
      options: [
        'Nhiên liệu hoá thạch không tái tạo như than, dầu và khí tự nhiên',
        'Thuỷ điện từ các đập lớn',
        'Điện hạt nhân từ các nhà máy quy mô lớn',
        'Sinh khối và địa nhiệt',
      ],
      answer: 0,
      dan: 'For decades, our main supply has been non-renewable fossil fuels, such as coal, oil, and natural gas.',
    },
    {
      q: 'Vì sao nguồn tái tạo như gió và mặt trời cần công nghệ pin tốt hơn?',
      options: [
        'Vì chúng phụ thuộc thời tiết, cần tích trữ điện để giữ lưới ổn định khi mất điện',
        'Vì chi phí lắp đặt ban đầu quá cao',
        'Vì hiệu suất chuyển hoá còn thấp',
        'Vì cần truyền tải điện đi xa',
      ],
      answer: 0,
      dan: 'However, renewable sources like wind and solar depend on the weather, so we need better battery technology to store power and keep the grid stable during a blackout.',
    },
    {
      q: 'Kỹ sư xây dựng những gì để tạo ra điện sạch?',
      options: [
        'Đập lớn cho thuỷ điện, hoặc mạng lưới tua-bin gió và tấm pin mặt trời',
        'Nhà máy điện khí chu trình hỗn hợp',
        'Trạm địa nhiệt ở vùng núi lửa',
        'Nhà máy đốt sinh khối từ phụ phẩm nông nghiệp',
      ],
      answer: 0,
      dan: 'Engineers build a giant dam for hydroelectric power, or install a vast network of wind turbines and solar panels to generate clean electricity.',
    },
    {
      q: 'Bài nêu mỗi công dân có thể giảm dấu chân carbon bằng cách nào?',
      options: [
        'Cải thiện cách nhiệt để tăng hiệu suất, chọn xe lai, hoặc đơn giản là tắt đèn',
        'Chuyển sang dùng hoàn toàn điện mặt trời tại nhà',
        'Hạn chế đi lại bằng phương tiện cá nhân',
        'Ưu tiên mua hàng sản xuất trong nước',
      ],
      answer: 0,
      dan: 'By improving insulation to increase efficiency, choosing a hybrid vehicle, or simply turning off lights to conserve power, we can significantly reduce our carbon footprint and build a green, sustainable future.',
    },
  ],

  'history-civilizations-vstep': [
    {
      q: 'Phát minh nào giúp con người thôi sống du mục và lập nơi định cư lâu dài?',
      options: [
        'Nông nghiệp',
        'Chữ viết',
        'Công cụ bằng kim loại',
        'Bánh xe',
      ],
      answer: 0,
      dan: 'Long ago, people were nomads, but the invention of agriculture allowed them to build a permanent settlement.',
    },
    {
      q: 'Nhà khảo cổ khai quật phế tích cổ để làm gì?',
      options: [
        'Tìm ra ngôi mộ ẩn giấu hoặc hiện vật đẹp, hé lộ bí mật quá khứ',
        'Xác định niên đại chính xác của công trình',
        'Bảo tồn di tích khỏi bị phá huỷ',
        'Thu thập mẫu vật cho bảo tàng quốc gia',
      ],
      answer: 0,
      dan: 'The archaeologist often excavates ancient ruins to uncover a hidden tomb or a beautiful artifact, revealing the secrets of the past.',
    },
    {
      q: 'Thời Phục Hưng được bài nhắc tới như một giai đoạn thế nào?',
      options: [
        'Một thời kỳ huy hoàng, khi nghệ thuật và khoa học hưng thịnh',
        'Một thời kỳ chiến tranh và chinh phạt liên miên',
        'Một thời kỳ các đế chế lớn sụp đổ',
        'Một thời kỳ chuyển từ chế độ nô lệ sang tự do',
      ],
      answer: 0,
      dan: 'Throughout the chronological timeline of our world, we see periods of great glory, like the Renaissance, where art and science prospered.',
    },
    {
      q: 'Bài kết lại rằng cuộc đấu tranh của tổ tiên để lại điều gì?',
      options: [
        'Một di sản lâu bền, nhắc ta đừng lặp lại sai lầm khiến các xã hội xưa suy tàn',
        'Những hiệp ước hoà bình còn giá trị tới nay',
        'Các nền dân chủ hiện đại trên khắp thế giới',
        'Kho tàng thư tịch và tiểu sử các danh nhân',
      ],
      answer: 0,
      dan: 'Their fight for justice, equality, and democracy has left a lasting impact, reminding us not to repeat the mistakes that caused past societies to decline and collapse.',
    },
  ],

  'arts-literature-vstep': [
    {
      q: 'Nhà điêu khắc và kiến trúc sư làm những việc gì?',
      options: [
        'Nhà điêu khắc tạc kiệt tác từ đá cẩm thạch, kiến trúc sư lo thiết kế sáng tạo cho bảo tàng mới',
        'Nhà điêu khắc dựng tượng đài, kiến trúc sư giám sát thi công',
        'Cả hai cùng thiết kế không gian trưng bày',
        'Nhà điêu khắc vẽ phác thảo, kiến trúc sư dựng mô hình',
      ],
      answer: 0,
      dan: 'A talented sculptor might carve a masterpiece from marble, while an architect focuses on the creative design of a new museum.',
    },
    {
      q: 'Ai viết kịch bản và ai hướng dẫn diễn viên trong buổi tập?',
      options: [
        'Nhà viết kịch viết kịch bản đầy lời thoại sắc sảo, đạo diễn hướng dẫn diễn viên',
        'Đạo diễn viết kịch bản, nhà viết kịch chỉ đạo diễn xuất',
        'Nhà sản xuất viết kịch bản, đạo diễn chọn diễn viên',
        'Diễn viên chính viết lời thoại, đạo diễn duyệt lại',
      ],
      answer: 0,
      dan: 'A playwright writes a script full of witty dialogue, and a director guides the actors during the rehearsal.',
    },
    {
      q: 'Nhà soạn nhạc và nhạc trưởng đảm nhận vai trò gì?',
      options: [
        'Nhà soạn nhạc viết giai điệu và hoà âm cho dàn nhạc, nhạc trưởng dẫn dắt nhạc công trong buổi hoà nhạc',
        'Nhà soạn nhạc chỉ huy dàn nhạc, nhạc trưởng viết phần đệm',
        'Cả hai cùng tuyển chọn nhạc công cho dàn nhạc',
        'Nhà soạn nhạc chọn nhạc mục, nhạc trưởng phối khí',
      ],
      answer: 0,
      dan: 'A brilliant composer writes the melody and harmony for an orchestra, and the conductor leads the musicians during a live concert.',
    },
    {
      q: 'Bài phân biệt nhà văn với nhà thơ như thế nào?',
      options: [
        'Nhà văn hoặc tiểu thuyết gia xuất bản sách hư cấu có cốt truyện phức tạp, còn nhà thơ viết thơ',
        'Nhà văn viết về đời thực, nhà thơ viết về cảm xúc',
        'Nhà văn viết dài, nhà thơ viết ngắn',
        'Nhà văn xuất bản sách, nhà thơ đăng trên tạp chí',
      ],
      answer: 0,
      dan: 'A writer or a novelist might publish a compelling fiction book with a complex plot, while a poet writes beautiful poetry.',
    },
  ],

  // ════════════════════════════════════════════════════════════════════════
  // BẬC B2 — 37/38 chặng.
  //
  // ⚠️ CHẶNG BỊ LOẠI CÓ LÝ DO: `digital-society-100` (🌐 Xã Hội Số & Quyền
  // Riêng Tư). Bài đọc của nó chỉ **60 từ / 3 câu**, và cả ba câu đều là danh
  // sách thuật ngữ nối nhau ("Users should control their password settings,
  // enable firewalls, backup data…"). Bốn câu hỏi mức VĂN BẢN rút từ đó sẽ
  // chỉ là bốn lần hỏi lại cùng một danh sách — tức là hỏi từ vựng, đúng thứ
  // việc này đang thay thế. Soạn 3 câu cũng không được: dưới 4 câu thì panel
  // TỰ BIẾN MẤT chứ không báo gì.
  //
  // Nên: BÁO chứ không độn. Chặng này sẽ hiện đúng dòng cảnh báo "chưa có câu
  // hỏi về bài đọc" như 192 chặng còn lại. Muốn nó có câu hỏi mức văn bản thì
  // phải viết lại bài đọc cho dài ra — đó là soạn nội dung mới, cần bạn duyệt.
  // ════════════════════════════════════════════════════════════════════════

  'business-office': [
    {
      q: 'Linh đang chuẩn bị gì, và cho ai?',
      options: [
        'Bộ tài liệu thuyết trình gọi vốn, cho các nhà đầu tư tiềm năng',
        'Báo cáo tài chính quý, cho ban giám đốc',
        'Kế hoạch sáp nhập, cho đối thủ cạnh tranh',
        'Chiến lược tiếp thị, cho đội bán hàng',
      ],
      answer: 0,
      dan: 'Linh is a young entrepreneur preparing her pitch deck for potential investors.',
    },
    {
      q: 'Cột mốc tài chính mà công ty vừa đạt được là gì?',
      options: [
        'Quý đầu tiên có lãi, với biên lợi nhuận lành mạnh và dòng tiền dương',
        'Lần đầu gọi vốn thành công từ quỹ đầu tư',
        'Doanh thu vượt mốc một triệu đô la',
        'Số khách hàng tăng gấp đôi trong một quý',
      ],
      answer: 0,
      dan: 'The company recently achieved its first profitable quarter, with a healthy profit margin and positive cash flow.',
    },
    {
      q: 'Trong thương vụ sáp nhập, các bên liên quan đang làm gì?',
      options: [
        'Định giá mua lại, soát bảng cân đối kế toán và thẩm định chi tiết',
        'Đàm phán vị trí lãnh đạo sau sáp nhập',
        'Xin phê duyệt của cơ quan quản lý cạnh tranh',
        'Chuẩn bị thông cáo báo chí chung',
      ],
      answer: 0,
      dan: 'Stakeholders are evaluating the acquisition price, reviewing balance sheets and conducting due diligence.',
    },
    {
      q: 'Theo phần cuối, điều gì phân biệt công ty xuất sắc với phần còn lại?',
      options: [
        'Đội ngũ linh hoạt, sản phẩm bàn giao rõ ràng và lãnh đạo có đạo đức',
        'Quy mô vốn và thị phần lớn',
        'Công nghệ độc quyền và bằng sáng chế',
        'Mạng lưới phân phối rộng khắp',
      ],
      answer: 0,
      dan: 'Agile teams, clear deliverables, and ethical leadership are what separate great companies from the rest.',
    },
  ],

  'daily-routine-time-management': [
    {
      q: 'Chuông báo thức reo mỗi sáng, Bob làm gì?',
      options: [
        'Quyết định chần chừ trì hoãn',
        'Dậy ngay và cho chó ăn',
        'Tắt chuông rồi đi làm luôn',
        'Lập danh sách việc cần làm',
      ],
      answer: 0,
      dan: 'Every morning, his alarm clock rings, but he decides to procrastinate.',
    },
    {
      q: 'Việc Bob cố làm nhiều thứ cùng lúc mang lại kết quả gì?',
      options: [
        'Hoàn toàn không hiệu quả',
        'Xong việc nhanh hơn nhưng sai nhiều',
        'Giúp anh bắt kịp tiến độ',
        'Khiến đồng nghiệp nể phục',
      ],
      answer: 0,
      dan: 'He tries to multitask and type reports simultaneously, but it’s completely unproductive.',
    },
    {
      q: 'Vì sao Bob rơi vào cảnh chạy deadline?',
      options: [
        'Vì anh không phải người làm theo hạn chót nên chẳng làm gì từ trước',
        'Vì sếp giao thêm việc vào phút chót',
        'Vì đồng nghiệp không bàn giao đúng hẹn',
        'Vì dự án bị đổi yêu cầu giữa chừng',
      ],
      answer: 0,
      dan: 'Since he is not deadline-driven, he didn’t do anything in advance.',
    },
    {
      q: 'Điều gì đẩy Bob tới kiệt sức?',
      options: [
        'Làm thêm giờ với những việc nặng nhọc',
        'Việc phải quản lý cả một đội ngũ',
        'Quãng đường đi làm quá xa',
        'Áp lực từ những cuộc họp liên miên',
      ],
      answer: 0,
      dan: 'Working overtime doing strenuous tasks led Bob to burnout.',
    },
  ],

  'energy-resources': [
    {
      q: 'Vì sao hoá đơn tiền điện của Bob rất cao?',
      options: [
        'Vì anh hoang phí và thích lãng phí năng lượng',
        'Vì cả thị trấn đang khủng hoảng năng lượng',
        'Vì nhà máy điện than tăng giá bán',
        'Vì nhà anh dùng máy sưởi suốt mùa đông',
      ],
      answer: 0,
      dan: 'His electricity bill was huge because he was wasteful and loved to waste energy.',
    },
    {
      q: 'Bob học được điều gì về nhiên liệu hoá thạch?',
      options: [
        'Đó là nguồn không tái tạo, có thể cạn kiệt và hữu hạn',
        'Đó là nguồn rẻ nhất nhưng gây ô nhiễm nhất',
        'Đó là nguồn duy nhất chạy được nhà máy điện',
        'Đó là nguồn sẽ được thay thế trong mười năm tới',
      ],
      answer: 0,
      dan: 'Bob learned that fossil fuel is non-renewable, exhaustible, and finite.',
    },
    {
      q: 'Vì sao Bob chọn năng lượng mặt trời?',
      options: [
        'Vì mặt trời là nguồn vô tận, không bao giờ cạn',
        'Vì tấm pin mặt trời rẻ hơn tua-bin gió',
        'Vì nhà anh không nằm ở vùng ven biển',
        'Vì chính phủ trợ giá cho điện mặt trời',
      ],
      answer: 0,
      dan: 'Because the sun is inexhaustible, an inexhaustible resource, and non-exhaustible, he used solar energy.',
    },
    {
      q: 'Ý định dùng uranium làm điện hạt nhân của Bob kết thúc ra sao?',
      options: [
        'Vợ anh ngăn lại',
        'Anh không mua nổi nhiên liệu',
        'Chính quyền không cấp phép',
        'Anh chuyển sang dùng pin nhiên liệu thay thế',
      ],
      answer: 0,
      dan: 'He played with a fuel cell and even considered uranium for nuclear power, but his wife stopped him!',
    },
  ],

  'society-law-rights': [
    {
      q: 'Điều gì khiến Benny quyết định hành động?',
      options: [
        'Người hàng xóm tị nạn tên Lily bị trục xuất bất công dù đã theo đúng quy trình',
        'Chính quyền địa phương tăng thuế bất hợp lý',
        'Anh bị từ chối quyền bỏ phiếu trong bầu cử',
        'Một đạo luật mới hạn chế quyền tự do ngôn luận',
      ],
      answer: 0,
      dan: 'When his neighbor, a refugee named Lily, faced unjust deportation despite having followed due process, Benny took action.',
    },
    {
      q: 'Benny đã làm những việc gì để giúp Lily?',
      options: [
        'Thuê luật sư, thu thập chứng cứ và ra toà làm nhân chứng',
        'Vận động báo chí đưa tin về vụ việc',
        'Kêu gọi cộng đồng ký đơn thỉnh nguyện',
        'Đứng ra bảo lãnh cho cô ở lại',
      ],
      answer: 0,
      dan: 'He hired an attorney, gathered evidence, and attended the trial as a witness.',
    },
    {
      q: 'Vụ án dẫn tới kết quả gì?',
      options: [
        'Phơi bày tham nhũng trong chính quyền và trở thành cột mốc của phong trào dân quyền',
        'Buộc chính phủ bồi thường cho người tị nạn',
        'Khiến công tố viên phải từ chức',
        'Dẫn tới việc sửa đổi hiến pháp',
      ],
      answer: 0,
      dan: 'The case exposed government corruption and became a landmark in the movement for civil rights.',
    },
    {
      q: 'Nhiều năm sau, thay đổi nào diễn ra trong chính quyền?',
      options: [
        'Trách nhiệm giải trình và sự minh bạch trở thành nền tảng',
        'Toàn bộ nội các bị thay thế',
        'Toà án được trao thêm quyền lực',
        'Người tị nạn được cấp quốc tịch tự động',
      ],
      answer: 0,
      dan: 'Accountability and transparency became cornerstones of the government.',
    },
  ],

  'globalization-culture': [
    {
      q: 'Ở Paris, Benny khám phá ra điều gì?',
      options: [
        'Tính đa văn hoá — sinh viên từ 40 nước trong cùng một lớp',
        'Rằng tiếng Pháp khó hơn anh tưởng',
        'Rằng chi phí sinh hoạt ở châu Âu rất đắt',
        'Rằng học bổng không đủ trang trải',
      ],
      answer: 0,
      dan: 'There, he discovered multiculturalism: students from 40 countries in one classroom.',
    },
    {
      q: 'Theo bài, "chủ nghĩa vị chủng" nghĩa là gì?',
      options: [
        'Đánh giá các nền văn hoá khác bằng chuẩn mực của chính mình',
        'Từ chối tiếp xúc với người nước ngoài',
        'Coi văn hoá phương Tây là hình mẫu duy nhất',
        'Chỉ giao tiếp trong cộng đồng đồng hương',
      ],
      answer: 0,
      dan: 'He learned the importance of intercultural communication and avoided ethnocentrism — judging other cultures by his own standards.',
    },
    {
      q: 'Bài giải thích "chảy máu chất xám" là gì?',
      options: [
        'Người tài rời khỏi các nước đang phát triển',
        'Sinh viên giỏi bỏ học giữa chừng',
        'Tri thức bản địa bị mai một dần',
        'Doanh nghiệp chuyển trụ sở ra nước ngoài',
      ],
      answer: 0,
      dan: 'He also learned about brain drain — how talented people leave developing countries — and the digital divide.',
    },
    {
      q: 'Các cộng đồng hải ngoại mà Benny gặp gỡ gặp khó khăn gì?',
      options: [
        'Vật lộn với bản sắc văn hoá, kẹt giữa văn hoá quê nhà và sự Tây hoá',
        'Không được công nhận quyền cư trú hợp pháp',
        'Mất dần ngôn ngữ mẹ đẻ qua các thế hệ',
        'Bị hạn chế tiếp cận giáo dục đại học',
      ],
      answer: 0,
      dan: 'He met diaspora communities who struggled with cultural identity — caught between their home culture and westernization.',
    },
  ],

  'population-migration-vstep': [
    {
      q: 'Dân số thế giới đã vượt mốc nào?',
      options: [
        '8 tỉ người',
        '7 tỉ người',
        '9 tỉ người',
        '10 tỉ người',
      ],
      answer: 0,
      dan: 'The world’s population has surpassed 8 billion, creating unprecedented challenges.',
    },
    {
      q: 'Các nước phát triển đang vật lộn với vấn đề gì?',
      options: [
        'Dân số già và tỉ suất sinh giảm, dẫn tới tỉ lệ phụ thuộc cao và thiếu lao động',
        'Đô thị hoá quá nhanh và khu ổ chuột mở rộng',
        'Người nhập cư tràn vào gây quá tải hạ tầng',
        'Mật độ dân số vượt ngưỡng chịu đựng',
      ],
      answer: 0,
      dan: 'Meanwhile, developed countries grapple with an aging population and declining fertility rates, resulting in high dependency ratios and workforce shortages.',
    },
    {
      q: 'Chảy máu chất xám làm suy yếu nước đang phát triển, nhưng có mặt bù trừ nào?',
      options: [
        'Tiền kiều hối gửi về mang lại nguồn thu quan trọng',
        'Lao động trong nước có thêm cơ hội thăng tiến',
        'Áp lực việc làm trong nước giảm bớt',
        'Quan hệ ngoại giao với nước tiếp nhận được cải thiện',
      ],
      answer: 0,
      dan: 'Brain drain weakens developing nations as skilled workers emigrate, though remittances sent back provide vital income.',
    },
    {
      q: 'Dữ liệu điều tra dân số giúp chính phủ làm gì?',
      options: [
        'Lập kế hoạch cho mật độ dân số, vệ sinh và an ninh lương thực',
        'Dự báo dòng người di cư trong tương lai',
        'Phân bổ ngân sách cho từng vùng',
        'Xác định nhu cầu lao động của từng ngành',
      ],
      answer: 0,
      dan: 'Census data helps governments plan for population density, sanitation, and food security.',
    },
  ],

  'housing-architecture-ielts': [
    {
      q: 'Việc thiếu nhà ở giá phải chăng dẫn tới hệ quả gì?',
      options: [
        'Vô gia cư gia tăng và quá trình cao cấp hoá đẩy người thuê thu nhập thấp ra ngoại ô',
        'Giá thuê ở trung tâm giảm dần theo thời gian',
        'Các toà nhà cũ bị phá bỏ hàng loạt',
        'Người dân chuyển sang thuê chung nhà',
      ],
      answer: 0,
      dan: 'Affordable housing remains scarce, driving homelessness and gentrification that pushes low-income tenants to the suburbs.',
    },
    {
      q: 'Kiến trúc sư và nhà quy hoạch thiết kế công trình xanh với những gì?',
      options: [
        'Tấm pin mặt trời, cách nhiệt đúng chuẩn và thông gió tự nhiên',
        'Vườn trên mái và bãi đỗ xe ngầm',
        'Vật liệu tái chế và hệ thống lọc nước',
        'Công nghệ nhà thông minh và cảm biến tiết kiệm điện',
      ],
      answer: 0,
      dan: 'Architects and urban planners are designing green buildings with solar panels, proper insulation, and natural ventilation to promote sustainability.',
    },
    {
      q: 'Luật phân vùng và quy chuẩn xây dựng bảo đảm điều gì?',
      options: [
        'Tiêu chuẩn an toàn, kể cả thiết kế chống động đất',
        'Giá bất động sản không tăng quá nhanh',
        'Mật độ dân cư trong từng khu vực',
        'Tỉ lệ không gian xanh tối thiểu',
      ],
      answer: 0,
      dan: 'Zoning laws and building codes ensure safety standards, including earthquake-resistant designs.',
    },
    {
      q: 'Bài kết lại rằng tương lai của nhà ở nằm ở đâu?',
      options: [
        'Ở những toà nhà trung hoà carbon vừa phải chăng, dễ tiếp cận, vừa hợp với cộng đồng đa dạng',
        'Ở những khu đô thị thông minh dùng công nghệ IoT',
        'Ở nhà lắp ghép sẵn và không gian ở chung',
        'Ở các dự án đa chức năng trên đất công nghiệp cũ',
      ],
      answer: 0,
      dan: 'The future of housing lies in carbon-neutral buildings that are affordable, accessible, and designed for diverse communities.',
    },
  ],

  'crime-punishment-ielts': [
    {
      q: 'Cuộc tranh luận về án tử hình có hai phía nào?',
      options: [
        'Bên ủng hộ coi đó là sự răn đe, bên phản đối đòi bãi bỏ vì lý do nhân quyền',
        'Bên ủng hộ nói giảm chi phí giam giữ, bên phản đối lo xử oan',
        'Bên ủng hộ dựa vào ý kiến dân chúng, bên phản đối dựa vào luật quốc tế',
        'Bên ủng hộ muốn áp dụng rộng, bên phản đối muốn giới hạn vài tội danh',
      ],
      answer: 0,
      dan: 'The death penalty debate continues: supporters see it as deterrence, while critics advocate to abolish it on human rights grounds.',
    },
    {
      q: 'Phục hồi nhân phẩm và tư pháp phục hồi tập trung vào điều gì?',
      options: [
        'Tái hoà nhập, thay vì thuần tuý trừng phạt',
        'Bồi thường đầy đủ cho nạn nhân',
        'Rút ngắn thời gian thụ án',
        'Giáo dục nghề trong trại giam',
      ],
      answer: 0,
      dan: 'Rehabilitation and restorative justice offer alternatives, focusing on reintegration rather than pure punishment.',
    },
    {
      q: 'Tình trạng tái phạm được bài mô tả thế nào?',
      options: [
        'Vẫn ở mức cao, nhiều người mãn hạn tù lại phạm tội sau khi ra trại',
        'Đã giảm rõ rệt nhờ các chương trình xã hội',
        'Chỉ phổ biến ở nhóm tội phạm vị thành niên',
        'Khó đo lường vì thiếu số liệu thống kê',
      ],
      answer: 0,
      dan: 'However, recidivism remains high, with many ex-prisoners reoffending after release.',
    },
    {
      q: 'Cải cách nhà tù cần giải quyết những vấn đề nào?',
      options: [
        'Quá tải và biệt giam, để bảo vệ cả an toàn công cộng lẫn nhân phẩm',
        'Chi phí vận hành và thiếu nhân lực quản giáo',
        'Điều kiện y tế và chế độ ăn của phạm nhân',
        'Việc phân loại tội phạm theo mức độ nguy hiểm',
      ],
      answer: 0,
      dan: 'Prison reform, addressing overcrowding and solitary confinement, is urgently needed to protect both public safety and human dignity.',
    },
  ],

  'politics-government-vstep': [
    {
      q: 'Trong một nền dân chủ, quyền lực thuộc về ai?',
      options: [
        'Công dân',
        'Quốc hội',
        'Đảng cầm quyền',
        'Toà án tối cao',
      ],
      answer: 0,
      dan: 'In a democracy, the power belongs to the citizens.',
    },
    {
      q: 'Ứng cử viên làm gì trong chiến dịch tranh cử?',
      options: [
        'Tranh luận và thuyết phục đa số, kèm lời hứa về cải cách thuế, kinh tế và phúc lợi xã hội',
        'Đàm phán liên minh với các đảng nhỏ',
        'Vận động các nhà tài trợ lớn ủng hộ',
        'Soạn sẵn các dự luật để trình quốc hội',
      ],
      answer: 0,
      dan: 'During the campaign, candidates from different political parties hold a debate, trying to persuade the majority to vote for them while making promises about tax reform, the economy, and social welfare.',
    },
    {
      q: 'Theo bài, biểu tình có thể leo thang thành bạo loạn khi nào?',
      options: [
        'Khi các đòi hỏi về bình đẳng và công lý không được đáp ứng',
        'Khi cảnh sát can thiệp bằng vũ lực',
        'Khi số người tham gia vượt quá kiểm soát',
        'Khi phe đối lập đứng ra tổ chức',
      ],
      answer: 0,
      dan: 'Sometimes, an angry minority might organize a protest against a controversial law, which can occasionally escalate into a violent riot if demands for equality and justice are not met.',
    },
    {
      q: 'Bài kết lại rằng một chính phủ thành công phải làm gì?',
      options: [
        'Cân bằng giữa quyền lực với quyền tự do và các quyền của người dân',
        'Giữ vững chủ quyền trước mọi mối đe doạ từ bên ngoài',
        'Xoá bỏ hoàn toàn tham nhũng trong bộ máy',
        'Duy trì đa số ổn định trong quốc hội',
      ],
      answer: 0,
      dan: 'Ultimately, whether dealing with domestic corruption scandals or protecting national sovereignty against foreign threats, a successful government must balance authority with the liberty and rights of its people.',
    },
  ],

  'globalisation-ielts': [
    {
      q: 'Việc chuyển sản xuất ra nước ngoài mang lại gì và bị chỉ trích vì điều gì?',
      options: [
        'Giảm chi phí, nhưng bị chỉ trích vì bóc lột lao động giá rẻ trong các xưởng bóc lột và làm bất bình đẳng thu nhập tệ hơn',
        'Tăng lợi nhuận, nhưng bị chỉ trích vì trốn thuế ở nước sở tại',
        'Mở rộng thị trường, nhưng bị chỉ trích vì phá vỡ ngành sản xuất trong nước',
        'Rút ngắn chuỗi cung ứng, nhưng bị chỉ trích vì rủi ro chất lượng',
      ],
      answer: 0,
      dan: 'By offshoring and outsourcing manufacturing to developing countries, these companies reduce costs but often face criticism for exploiting cheap labor in sweatshops and worsening income inequality.',
    },
    {
      q: 'Tiếng Anh trở thành ngôn ngữ chung mang lại lợi ích gì và làm dấy lên lo ngại gì?',
      options: [
        'Tăng sự thấu hiểu, nhưng làm dấy lên nỗi lo đồng nhất hoá văn hoá và Tây hoá, đe doạ bản sắc và di sản địa phương',
        'Thúc đẩy thương mại, nhưng khiến các ngôn ngữ nhỏ biến mất',
        'Giúp giáo dục dễ tiếp cận, nhưng làm giảm chất lượng dịch thuật',
        'Rút ngắn khoảng cách, nhưng khiến người học bỏ bê tiếng mẹ đẻ',
      ],
      answer: 0,
      dan: 'Culturally, the spread of the internet and global media has promoted English as a lingua franca, fostering greater understanding but raising fears of cultural homogenisation and Westernisation, which threaten local identities and heritage.',
    },
    {
      q: 'Các nhà hoạt động ủng hộ những gì để chống lại sự bóc lột?',
      options: [
        'Phát triển bền vững, thương mại công bằng và tiêu dùng có đạo đức',
        'Đánh thuế cao lên các tập đoàn đa quốc gia',
        'Hạn chế dòng vốn xuyên biên giới',
        'Bảo hộ ngành sản xuất trong nước',
      ],
      answer: 0,
      dan: 'In response, activists advocate for sustainable development, fair trade, and ethical consumerism to combat exploitation.',
    },
    {
      q: 'Bài kết lại rằng giải quyết thách thức của toàn cầu hoá đòi hỏi gì?',
      options: [
        'Hợp tác quốc tế, ngoại giao và các liên minh mạnh qua những diễn đàn như Liên Hợp Quốc',
        'Các hiệp định thương mại tự do sâu rộng hơn',
        'Sự tự điều chỉnh của các tập đoàn đa quốc gia',
        'Việc từng quốc gia siết chặt kiểm soát biên giới',
      ],
      answer: 0,
      dan: 'Ultimately, tackling the challenges of globalisation requires international cooperation, diplomacy, and strong alliances through forums like the UN to ensure that economic growth does not compromise human rights or environmental sustainability.',
    },
  ],

  'education-advanced-ielts': [
    {
      q: 'Môi trường đại học đòi hỏi gì hơn là học vẹt hời hợt?',
      options: [
        'Tư duy phản biện sâu sắc và kỹ năng phân tích',
        'Khả năng ghi nhớ khối lượng lớn kiến thức',
        'Kỹ năng thuyết trình trước đám đông',
        'Sự chuyên cần trong việc dự giảng',
      ],
      answer: 0,
      dan: 'When undergraduates enroll in university, they step into an environment that demands more than just superficial rote learning; it requires profound critical thinking and analytical skills.',
    },
    {
      q: 'Học viên sau đại học phải làm gì để tránh đạo văn?',
      options: [
        'Kiểm chứng giả thuyết và trích dẫn nguồn đúng cách trong thư mục tham khảo',
        'Nộp bài qua phần mềm rà soát trùng lặp',
        'Xin phép tác giả trước khi dùng tư liệu',
        'Diễn đạt lại toàn bộ ý tưởng bằng lời của mình',
      ],
      answer: 0,
      dan: 'Furthermore, the modern pedagogy emphasizes empirical research, requiring postgraduates pursuing a master’s or doctorate to validate hypotheses and cite sources properly in their bibliography to avoid plagiarism.',
    },
    {
      q: 'Học phí tăng để lại hậu quả gì?',
      options: [
        'Nhiều người tốt nghiệp mang khoản nợ sinh viên lớn, dù đã có trợ cấp và học bổng',
        'Số sinh viên nhập học giảm rõ rệt mỗi năm',
        'Các trường phải cắt giảm chương trình đào tạo',
        'Sinh viên phải đi làm thêm và bỏ bê việc học',
      ],
      answer: 0,
      dan: 'Tuition fees are rising, leaving many graduates with substantial student debt despite grants and scholarships.',
    },
    {
      q: 'Bài kết lại rằng tấm bằng đại học mang lại gì ngoài một chứng chỉ nghề nghiệp?',
      options: [
        'Mở rộng tầm nhìn trí tuệ và chuẩn bị cho cựu sinh viên bước vào một thế giới toàn cầu hoá đầy cạnh tranh',
        'Bảo đảm một công việc ổn định với thu nhập cao',
        'Cơ hội xây dựng mạng lưới quan hệ suốt đời',
        'Khả năng tiếp tục học lên bậc cao hơn',
      ],
      answer: 0,
      dan: 'Ultimately, a university degree does more than provide a qualification for a career; it broadens one’s intellectual perspective and prepares alumni to navigate a highly competitive, globalised world.',
    },
  ],

  'crime-law-advanced-ielts': [
    {
      q: 'Nhân chứng khai trước toà theo cách nào, và khai man bị xử lý ra sao?',
      options: [
        'Khai có tuyên thệ, và mọi lời khai man đều bị trừng phạt nghiêm',
        'Khai kín trước thẩm phán, và khai man bị phạt tiền',
        'Khai bằng văn bản, và khai man bị loại khỏi hồ sơ',
        'Khai qua luật sư, và khai man bị truy tố riêng',
      ],
      answer: 0,
      dan: 'In the courtroom, witnesses testify under oath, and any perjury is strictly punished.',
    },
    {
      q: 'Luật sư bào chữa lập luận bằng những cách nào?',
      options: [
        'Đưa ra bằng chứng ngoại phạm hoặc chất vấn động cơ gây án',
        'Yêu cầu loại bỏ chứng cứ thu thập trái phép',
        'Đề nghị hoà giải với phía bị hại',
        'Xin giảm nhẹ dựa trên nhân thân bị cáo',
      ],
      answer: 0,
      dan: 'The defense attorney argues on behalf of the accused, presenting an alibi or questioning the motive.',
    },
    {
      q: 'Với những vụ giết người hoặc khủng bố, các quốc gia xử lý ra sao?',
      options: [
        'Một số vẫn thi hành án tử hình, nhiều nước đã bãi bỏ và chuộng phục hồi nhân phẩm hơn',
        'Hầu hết đều áp dụng án chung thân không ân xá',
        'Các nước phải xử theo toà án quốc tế',
        'Mức án được quyết định bởi bồi thẩm đoàn riêng',
      ],
      answer: 0,
      dan: 'In extreme cases of homicide or terrorism, some nations still enforce the death penalty, though many have abolished it, favoring rehabilitation over capital punishment.',
    },
    {
      q: 'Hệ thống tư pháp hình sự nhắm tới những mục tiêu nào?',
      options: [
        'Răn đe, giảm tội phạm vị thành niên và ngăn người từng bị kết án tái phạm',
        'Bảo đảm mọi vụ án đều được xử lý trong thời hạn luật định',
        'Giảm gánh nặng cho hệ thống nhà tù',
        'Tăng niềm tin của công chúng vào cơ quan điều tra',
      ],
      answer: 0,
      dan: 'The criminal justice system aims to act as a deterrent, reducing juvenile delinquency and preventing former convicts from reoffending, ensuring that justice is served for every victim.',
    },
  ],

  'media-communication-ielts': [
    {
      q: 'Người tiêu dùng tin tức ngày nay lấy tin từ đâu?',
      options: [
        'Tin tức tức thời qua mạng xã hội, blog và podcast',
        'Báo giấy buổi sáng và bản tin truyền hình',
        'Các trang tin chính thống có trả phí',
        'Bản tin phát thanh và tạp chí chuyên đề',
      ],
      answer: 0,
      dan: 'Today, consumers do not wait for the morning newspaper or a broadsheet; they get instant news through social media, blogs, and podcasts.',
    },
    {
      q: 'Thông tin sai lệch và tít câu khách thường được tạo ra nhằm mục đích gì?',
      options: [
        'Thao túng nhận thức công chúng hoặc kiếm doanh thu quảng cáo',
        'Tăng lượng người đăng ký trả phí',
        'Gây sức ép lên các chính trị gia',
        'Đánh lạc hướng khỏi các vụ bê bối lớn',
      ],
      answer: 0,
      dan: 'The internet is flooded with misinformation, fake news, and clickbait, often created to manipulate public perception or generate ad revenue.',
    },
    {
      q: 'Thuật toán của mạng xã hội nhốt người dùng vào cái gì?',
      options: [
        'Một buồng vọng âm, liên tục nạp nội dung giật gân củng cố quan điểm sẵn có',
        'Một vòng lặp quảng cáo không thể tắt',
        'Một nguồn tin duy nhất do nền tảng chọn',
        'Một nhóm người dùng có cùng độ tuổi',
      ],
      answer: 0,
      dan: 'Furthermore, the algorithms used by social networks often trap users in an echo chamber, feeding them sensational content that reinforces their existing views.',
    },
    {
      q: 'Để bảo vệ uy tín của báo chí, công dân cần làm gì?',
      options: [
        'Kiểm chứng nguồn tin, cổ vũ báo chí minh bạch và cưỡng lại tuyên truyền cùng thông tin sai lệch có chủ đích',
        'Chỉ đọc các cơ quan báo chí được nhà nước cấp phép',
        'Ngừng dùng mạng xã hội làm nguồn tin',
        'Yêu cầu các nền tảng công khai thuật toán',
      ],
      answer: 0,
      dan: 'To protect the credibility of the press, it is essential for citizens to verify sources, encourage transparent journalism, and resist the propaganda and disinformation that threaten freedom of speech in modern society.',
    },
  ],

  'language-linguistics-ielts': [
    {
      q: 'Tiếng Anh đóng vai trò gì trên thế giới theo bài?',
      options: [
        'Ngôn ngữ chung, phá bỏ rào cản ngôn ngữ trong kinh doanh quốc tế',
        'Ngôn ngữ chính thức của các tổ chức quốc tế',
        'Ngôn ngữ có nhiều người bản ngữ nhất',
        'Ngôn ngữ bắt buộc trong hệ giáo dục nhiều nước',
      ],
      answer: 0,
      dan: 'Around the world, English acts as the lingua franca, breaking down the language barrier in international business.',
    },
    {
      q: 'Trẻ sơ sinh và người lớn học ngôn ngữ khác nhau ra sao?',
      options: [
        'Trẻ học tiếng mẹ đẻ dễ dàng qua đắm mình, người lớn vật lộn với phát âm, ngữ điệu và ẩn dụ hay sự mỉa mai',
        'Trẻ học nhanh hơn nhờ trí nhớ tốt, người lớn học chậm vì bận rộn',
        'Trẻ học qua bắt chước, người lớn học qua ngữ pháp',
        'Trẻ không sợ sai, còn người lớn ngại mắc lỗi',
      ],
      answer: 0,
      dan: 'Language acquisition is complex; an infant easily learns their mother tongue through immersion, but adults often struggle with pronunciation, intonation, and understanding implicit metaphors or sarcasm.',
    },
    {
      q: 'Ngôn ngữ học xã hội nghiên cứu điều gì?',
      options: [
        'Cách một phương ngữ hay giọng nói cụ thể hé lộ xuất thân xã hội của một người',
        'Cách các ngôn ngữ vay mượn từ vựng của nhau',
        'Cách trẻ em tiếp thu ngôn ngữ trong gia đình',
        'Cách các ngôn ngữ thiểu số được bảo tồn',
      ],
      answer: 0,
      dan: 'In sociolinguistics, experts study how a specific dialect or accent can reveal a person’s social background.',
    },
    {
      q: 'Bài nói gì về số phận của một số ngôn ngữ bản địa?',
      options: [
        'Chúng bị tuyệt chủng một cách đáng tiếc nếu không được bảo tồn',
        'Chúng dần hoà lẫn vào các ngôn ngữ lớn hơn',
        'Chúng chỉ còn tồn tại trong văn bản cổ',
        'Chúng đang được hồi sinh nhờ công nghệ',
      ],
      answer: 0,
      dan: 'Over centuries, words derive from common roots, while some indigenous languages tragically become extinct if not preserved.',
    },
  ],

  'media-advertising-ielts': [
    {
      q: 'Nhà báo giỏi làm gì, còn một số kênh tin bị chỉ trích vì điều gì?',
      options: [
        'Đưa tin khách quan về sự kiện toàn cầu; một số kênh bị chỉ trích vì dựa quá nhiều vào giật gân và bình luận thiên vị để tăng lượng phát hành',
        'Điều tra độc lập; một số kênh bị chỉ trích vì lệ thuộc nhà tài trợ',
        'Kiểm chứng nguồn tin; một số kênh bị chỉ trích vì đưa tin quá chậm',
        'Bảo vệ nguồn tin; một số kênh bị chỉ trích vì tiết lộ danh tính',
      ],
      answer: 0,
      dan: 'A skilled journalist or foreign correspondent provides objective coverage of global events, yet many critics argue that some news channels rely too heavily on sensationalism and biased editorial opinions to boost circulation.',
    },
    {
      q: 'Các công ty nay đầu tư vào đâu để nhắm tới một nhóm khách hàng cụ thể?',
      options: [
        'Chiến dịch số, dùng người có ảnh hưởng và nội dung lan truyền',
        'Bảng quảng cáo ngoài trời ở khu trung tâm',
        'Quảng cáo truyền hình vào khung giờ vàng',
        'Tài trợ cho các sự kiện thể thao lớn',
      ],
      answer: 0,
      dan: 'Companies now invest in digital campaigns, using influencers and viral content to target a specific demographic.',
    },
    {
      q: 'Những tuyên bố gây hiểu lầm và thủ thuật lừa dối gây hại gì?',
      options: [
        'Tẩy não người tiêu dùng trẻ và củng cố các khuôn mẫu có hại',
        'Làm giảm doanh số của các thương hiệu trung thực',
        'Khiến người tiêu dùng mất niềm tin vào mọi quảng cáo',
        'Buộc cơ quan quản lý phải rút giấy phép',
      ],
      answer: 0,
      dan: 'Misleading claims or deceptive practices can brainwash young consumers and reinforce harmful stereotypes.',
    },
    {
      q: 'Chính phủ cần làm gì với ngành quảng cáo?',
      options: [
        'Áp quy định chặt hơn, để thông điệp quảng bá vừa có đạo đức vừa cung cấp thông tin, thay vì chỉ khai thác khán giả',
        'Cấm quảng cáo nhắm tới trẻ vị thành niên',
        'Đánh thuế cao lên chi phí quảng cáo trực tuyến',
        'Buộc công khai mọi hợp đồng với người có ảnh hưởng',
      ],
      answer: 0,
      dan: 'To protect consumer privacy and prevent false publicity, governments must impose stricter regulations on the advertising industry, ensuring that promotional messages are both ethical and informative rather than merely exploiting the audience.',
    },
  ],

  'cities-urbanization-ielts': [
    {
      q: 'Vì sao hàng triệu người từ nông thôn chuyển ra đô thị?',
      options: [
        'Đi tìm mức sống tốt hơn',
        'Chạy trốn thiên tai ở quê nhà',
        'Theo chính sách giãn dân của chính phủ',
        'Muốn con cái học ở trường tốt hơn',
      ],
      answer: 0,
      dan: 'Urbanization is transforming the globe as millions of rural migrants move to the metropolis in search of a better standard of living.',
    },
    {
      q: 'Đô thị mở rộng không quy hoạch và quá tải dân số gây ra gì?',
      options: [
        'Sức ép khổng lồ lên hạ tầng đô thị, dẫn tới tắc đường và kẹt cứng vào giờ cao điểm',
        'Giá bất động sản tăng vọt ở vùng ven',
        'Thiếu hụt lao động trong khu vực dịch vụ',
        'Ô nhiễm nguồn nước ngầm trong thành phố',
      ],
      answer: 0,
      dan: 'Unplanned urban sprawl and overpopulation put massive strain on municipal infrastructure, leading to constant traffic congestion and gridlock during rush hour.',
    },
    {
      q: 'Quy hoạch đô thị kém dẫn tới điều gì ở vùng ven?',
      options: [
        'Khu ổ chuột và xóm liều mọc lên, cư dân thiếu vệ sinh cơ bản và hệ thống thoát nước',
        'Đất nông nghiệp bị chuyển đổi ồ ạt',
        'Các khu công nghiệp lấn vào khu dân cư',
        'Giao thông công cộng không vươn tới được',
      ],
      answer: 0,
      dan: 'To make matters worse, poor urban planning often results in the growth of slums and shanty towns on the outskirts, where residents lack basic sanitation and proper sewage systems.',
    },
    {
      q: 'Những giải pháp nào giúp giảm ô nhiễm đô thị?',
      options: [
        'Mở rộng giao thông công cộng, siết luật phân vùng và biến một số khu thành phố đi bộ',
        'Di dời nhà máy ra khỏi nội đô',
        'Hạn chế đăng ký xe cá nhân mới',
        'Trồng thêm cây xanh dọc các trục đường lớn',
      ],
      answer: 0,
      dan: 'Expanding public transport, enforcing strict zoning laws, and pedestrianizing certain districts can help reduce pollution.',
    },
  ],

  'space-exploration-ielts': [
    {
      q: 'Cột mốc lịch sử giữa thế kỷ 20 là gì?',
      options: [
        'Phi hành gia đầu tiên bay vào không gian sâu, mở đầu giai đoạn khám phá vũ trụ ráo riết',
        'Vệ tinh nhân tạo đầu tiên được phóng lên quỹ đạo',
        'Con người lần đầu đặt chân lên Mặt Trăng',
        'Kính thiên văn không gian đầu tiên đi vào hoạt động',
      ],
      answer: 0,
      dan: 'In the mid-20th century, a historic milestone was achieved when the first astronaut traveled into deep space, marking the beginning of intense space exploration.',
    },
    {
      q: 'Rác vũ trụ ngày càng nhiều trong quỹ đạo Trái Đất đe doạ điều gì?',
      options: [
        'Đe doạ các vệ tinh bằng một vụ va chạm thảm khốc',
        'Cản trở tầm quan sát của kính thiên văn',
        'Làm ô nhiễm tầng khí quyển phía trên',
        'Gây nhiễu tín hiệu liên lạc mặt đất',
      ],
      answer: 0,
      dan: 'Furthermore, the increasing amount of space debris in Earth’s orbit threatens satellites with a catastrophic collision.',
    },
    {
      q: 'Việc di chuyển trong chân không vũ trụ đòi hỏi con người chịu đựng những gì?',
      options: [
        'Không trọng lực và bức xạ vũ trụ nguy hiểm',
        'Nhiệt độ cực đoan và thiếu ô-xy',
        'Áp suất cao và tiếng ồn của động cơ',
        'Sự cô lập kéo dài và thiếu ngủ',
      ],
      answer: 0,
      dan: 'Navigating the vacuum of space involves surviving zero gravity and dangerous cosmic radiation.',
    },
    {
      q: 'Hai lý do được nêu để biện minh cho chi phí khổng lồ của các sứ mệnh?',
      options: [
        'Lợi ích từ công nghệ phái sinh, và việc lập thuộc địa hành tinh mới có thể trở thành cần thiết cho sự sống còn của loài người',
        'Uy tín quốc gia, và cơ hội khai thác khoáng sản ngoài Trái Đất',
        'Việc làm cho ngành hàng không vũ trụ, và hợp tác quốc tế',
        'Dữ liệu khí hậu từ vệ tinh, và du lịch vũ trụ thương mại',
      ],
      answer: 0,
      dan: 'Not only do we benefit from technological spin-offs, but colonizing a new planet may eventually become necessary for the survival of our species.',
    },
  ],

  'media-advertising-ielts-p2': [
    {
      q: 'Những tiêu đề mang tính thao túng được thiết kế nhằm mục đích gì?',
      options: [
        'Thu hút sự chú ý hơn là cung cấp thông tin',
        'Tăng thứ hạng trên công cụ tìm kiếm',
        'Che giấu nguồn gốc thật của bài viết',
        'Kéo người đọc sang các trang quảng cáo',
      ],
      answer: 0,
      dan: 'The rise of sensationalism and fake news often overshadows authentic reporting, as manipulative headlines are designed to attract attention rather than inform.',
    },
    {
      q: 'Vì sao năng lực đọc hiểu truyền thông là thiết yếu với khán giả?',
      options: [
        'Để nhận ra thiên kiến và phân biệt thông tin đáng tin với tuyên truyền hay thông tin sai lệch có chủ đích',
        'Để chọn được nguồn tin phù hợp với sở thích',
        'Để tránh bị lộ dữ liệu cá nhân trên mạng',
        'Để hiểu cách các thuật toán vận hành',
      ],
      answer: 0,
      dan: 'Consequently, media literacy is crucial for audiences to identify bias and distinguish between credible information and propaganda or deliberate disinformation.',
    },
    {
      q: 'Giới phê bình đòi hỏi điều gì trước những thủ thuật lừa dối?',
      options: [
        'Quy định chặt hơn để buộc các tập đoàn chịu trách nhiệm và bảo đảm tiếp thị minh bạch',
        'Cấm hoàn toàn quảng cáo nhắm mục tiêu theo hành vi',
        'Bồi thường cho người tiêu dùng bị lừa dối',
        'Công khai toàn bộ ngân sách quảng cáo',
      ],
      answer: 0,
      dan: 'Critics argue that such deceptive practices are unethical, demanding stricter regulations to hold corporations accountable and ensure transparent marketing.',
    },
    {
      q: 'Bài kết lại rằng truyền thông và quảng cáo còn có sức mạnh nào?',
      options: [
        'Giáo dục, nâng cao nhận thức cho các vấn đề quan trọng và mang lại giải trí tương tác hấp dẫn khi dùng có trách nhiệm',
        'Kết nối người tiêu dùng với các thương hiệu uy tín',
        'Giám sát quyền lực của chính phủ',
        'Tạo việc làm cho hàng triệu người',
      ],
      answer: 0,
      dan: 'Despite the controversies and potential for distraction, media and advertising also have the power to educate, raise awareness for important causes, and provide engaging, interactive entertainment when used responsibly.',
    },
  ],

  'technology-internet-ielts': [
    {
      q: 'Tin tặc dùng phần mềm độc hại tinh vi để làm gì, và gây ra lo ngại nào?',
      options: [
        'Xâm nhập cơ sở dữ liệu, gây lo ngại rộng khắp về quyền riêng tư dữ liệu và giám sát hàng loạt',
        'Đánh sập các trang thương mại điện tử, gây thiệt hại kinh tế',
        'Chiếm quyền điều khiển thiết bị, gây lo ngại về an toàn cá nhân',
        'Phát tán tin giả, gây lo ngại về nhận thức công chúng',
      ],
      answer: 0,
      dan: 'Cybersecurity is a major concern, as hackers use sophisticated malware and viruses to breach databases, leading to widespread anxiety over data privacy and mass surveillance.',
    },
    {
      q: 'Mạng xã hội và các thuật toán gây nghiện dẫn tới hệ quả gì cho người dùng?',
      options: [
        'Mất tập trung nặng, cô lập và lối sống ít vận động',
        'Giảm khả năng ghi nhớ và tư duy phản biện',
        'Lệ thuộc vào ý kiến của người có ảnh hưởng',
        'Khó phân biệt thông tin thật với thông tin giả',
      ],
      answer: 0,
      dan: 'Furthermore, the pervasive nature of social media and addictive algorithms can cause profound distraction, isolation, and a sedentary lifestyle among users.',
    },
    {
      q: 'Khoảng cách số cản trở điều gì?',
      options: [
        'Sự tiến bộ ở các vùng nông thôn thiếu hạ tầng',
        'Việc phổ cập giáo dục trực tuyến trong trường học',
        'Khả năng cạnh tranh của doanh nghiệp nhỏ',
        'Việc triển khai chính phủ điện tử',
      ],
      answer: 0,
      dan: 'There is also the issue of the digital divide, which hinders progress in rural areas lacking infrastructure.',
    },
    {
      q: 'Bài kết lại rằng chúng ta phải làm gì?',
      options: [
        'Nâng cao trình độ tin học để làm chủ những thay đổi nhanh chóng, bảo đảm tiến bộ công nghệ phục vụ con người',
        'Hạn chế thời gian sử dụng thiết bị mỗi ngày',
        'Đòi hỏi các nền tảng minh bạch về dữ liệu',
        'Đầu tư hạ tầng mạng cho vùng sâu vùng xa',
      ],
      answer: 0,
      dan: 'We must upgrade our computer literacy to navigate these rapid changes, ensuring that technological advancements benefit humanity rather than creating a dystopian, overly simulated reality.',
    },
  ],

  'environment-energy-ielts': [
    {
      q: 'Theo bài, nguyên nhân của biến đổi khí hậu nghiêm trọng là gì?',
      options: [
        'Nhiệt độ toàn cầu tăng nhanh do hiệu ứng nhà kính và khí thải carbon quá mức từ đốt nhiên liệu hoá thạch',
        'Nạn phá rừng và khai thác gỗ trái phép trên diện rộng',
        'Việc lạm dụng thuốc trừ sâu độc hại trong nông nghiệp',
        'Sự cạn kiệt của các nguồn tài nguyên thiên nhiên',
      ],
      answer: 0,
      dan: 'The rapid rise in global temperatures, driven by the greenhouse effect and excessive carbon emissions from burning fossil fuels, is causing severe climate change.',
    },
    {
      q: 'Những hoạt động nào của con người phá huỷ môi trường sống trên diện rộng?',
      options: [
        'Phá rừng, khai thác gỗ trái phép và lạm dụng thuốc trừ sâu độc hại',
        'Xây dựng đô thị và mở rộng đất canh tác',
        'Đánh bắt quá mức và nuôi trồng thuỷ sản',
        'Khai khoáng lộ thiên và xả thải công nghiệp',
      ],
      answer: 0,
      dan: 'Moreover, human activities like deforestation, illegal logging, and the overuse of toxic pesticides are causing massive habitat destruction.',
    },
    {
      q: 'Bài đề nghị chuyển đổi khỏi những nguồn nào, sang những nguồn nào?',
      options: [
        'Rời than và dầu gây ô nhiễm, sang điện mặt trời, tua-bin gió và thuỷ điện',
        'Rời điện than, sang điện hạt nhân và khí tự nhiên',
        'Rời nhiên liệu nhập khẩu, sang nguồn sản xuất trong nước',
        'Rời năng lượng tập trung, sang các hệ thống phân tán tại chỗ',
      ],
      answer: 0,
      dan: 'We need to transition away from polluting resources like coal and oil and invest heavily in alternative, renewable energy sources such as solar power, wind turbines, and hydroelectricity.',
    },
    {
      q: 'Bài kết lại bằng điều gì?',
      options: [
        'Phấn đấu trung hoà carbon và bảo vệ các khu bảo tồn, trước khi sự cạn kiệt tài nguyên chạm điểm không thể quay lại',
        'Kêu gọi mọi quốc gia ký kết một hiệp ước khí hậu chung',
        'Yêu cầu doanh nghiệp chịu trách nhiệm về khí thải của mình',
        'Đề nghị đưa giáo dục môi trường vào trường học',
      ],
      answer: 0,
      dan: 'By striving to become carbon-neutral and protecting natural reserves, we can alleviate the damage and preserve a healthy environment for future generations before the depletion of natural resources reaches a point of no return.',
    },
  ],

  'government-politics-ielts': [
    {
      q: 'Người dân thực hiện nghĩa vụ công dân bằng cách nào?',
      options: [
        'Bỏ lá phiếu trong một cuộc bầu cử để chọn người đại diện',
        'Tham gia các cuộc tuần hành ôn hoà',
        'Đóng thuế đầy đủ và đúng hạn',
        'Giám sát hoạt động của chính quyền địa phương',
      ],
      answer: 0,
      dan: 'In a true democracy, power lies with the people, who exercise their civic duty by casting their ballot in an election to choose their representatives.',
    },
    {
      q: 'Điều gì thường làm chậm quá trình thi hành luật?',
      options: [
        'Bộ máy quan liêu và thủ tục hành chính rườm rà',
        'Sự phản đối của phe đối lập trong quốc hội',
        'Thiếu ngân sách để triển khai',
        'Việc phải chờ toà án phán quyết về tính hợp hiến',
      ],
      answer: 0,
      dan: 'However, implementing these laws can be a slow process, often hindered by bureaucracy and excessive red tape.',
    },
    {
      q: 'Bê bối chính trị liên quan tham nhũng hoặc hối lộ bị phanh phui dẫn tới gì?',
      options: [
        'Phẫn nộ lan rộng, đôi khi lên tới đỉnh điểm là biểu tình ôn hoà hoặc thậm chí bạo loạn',
        'Chính phủ buộc phải giải tán và bầu cử lại',
        'Các nhà đầu tư nước ngoài rút vốn',
        'Toà án tối cao vào cuộc điều tra',
      ],
      answer: 0,
      dan: 'When a political scandal involving corruption or bribes is exposed, it can lead to widespread outrage, sometimes culminating in a peaceful protest or even a violent riot.',
    },
    {
      q: 'Hiệu quả của một hệ thống chính trị phụ thuộc vào những gì?',
      options: [
        'Tìm được đồng thuận, bảo vệ nhân quyền và giữ vững hiến pháp, ngăn mọi bước trượt vào chế độ độc tài',
        'Duy trì tăng trưởng kinh tế và ổn định xã hội',
        'Xây dựng được các liên minh quốc tế vững chắc',
        'Bảo đảm bầu cử diễn ra tự do và công bằng',
      ],
      answer: 0,
      dan: 'Ultimately, the effectiveness of a political system depends on finding a consensus, safeguarding human rights, and ensuring that the constitution is upheld, preventing any descent into dictatorship while striving to build a fair and equitable society for all.',
    },
  ],

  'crime-law-ielts': [
    {
      q: 'Thám tử và chuyên gia pháp y cố xác lập những gì tại hiện trường?',
      options: [
        'Động cơ gây án, và kiểm chứng xem nghi phạm có bằng chứng ngoại phạm hợp lệ không',
        'Trình tự thời gian của vụ việc và số người liên quan',
        'Mối quan hệ giữa nghi phạm và nạn nhân',
        'Loại vũ khí đã được sử dụng',
      ],
      answer: 0,
      dan: 'Detectives and forensic experts gather evidence at the crime scene, trying to establish a motive and verify if the suspect has a valid alibi.',
    },
    {
      q: 'Khi tìm đủ chứng cứ, cảnh sát làm gì?',
      options: [
        'Xin lệnh để bắt nghi phạm, người sau đó bị buộc tội và truy tố chính thức',
        'Chuyển hồ sơ sang viện kiểm sát để xem xét',
        'Triệu tập nghi phạm lên lấy lời khai',
        'Đề nghị toà án ra lệnh cấm rời khỏi nơi cư trú',
      ],
      answer: 0,
      dan: 'If sufficient proof is found, the police obtain a warrant to arrest the suspect, who is then formally charged and indicted.',
    },
    {
      q: 'Bên công tố phải chứng minh bị cáo có tội tới mức nào?',
      options: [
        'Tới mức không còn nghi ngờ hợp lý',
        'Tới mức đa số bồi thẩm đoàn đồng ý',
        'Tới mức thẩm phán chấp nhận chứng cứ',
        'Tới mức luật sư bào chữa không phản bác được',
      ],
      answer: 0,
      dan: 'During the trial in court, the prosecution must present compelling testimony from witnesses to prove the defendant is guilty beyond a reasonable doubt.',
    },
    {
      q: 'Mục tiêu tối hậu của hệ thống tư pháp là gì?',
      options: [
        'Vừa răn đe hành vi phạm pháp, vừa cải tạo người phạm tội để họ không quay lại con đường phạm pháp',
        'Bảo đảm mọi nạn nhân đều được bồi thường',
        'Giảm số vụ án phải đưa ra xét xử',
        'Duy trì niềm tin của công chúng vào pháp luật',
      ],
      answer: 0,
      dan: 'The ultimate goal of the justice system is not only to act as a deterrent to unlawful behavior but also to rehabilitate offenders so they do not return to a life of juvenile delinquency or criminal activity.',
    },
  ],

  'space-exploration-ielts-p2': [
    {
      q: 'Các nhà khoa học nghiên cứu những gì qua kính thiên văn mạnh và tàu thăm dò không người lái?',
      options: [
        'Thiên hà xa xôi, tinh vân, và các hiện tượng đáng sợ như hố đen và siêu tân tinh',
        'Bề mặt các hành tinh trong hệ Mặt Trời',
        'Quỹ đạo của các tiểu hành tinh nguy hiểm',
        'Thành phần khí quyển của các ngoại hành tinh',
      ],
      answer: 0,
      dan: 'Through powerful telescopes and unmanned probes, scientists investigate distant galaxies, nebulae, and the terrifying phenomena of black holes and supernovas.',
    },
    {
      q: 'Người ủng hộ biện minh cho khoản đầu tư khổng lồ bằng lập luận nào?',
      options: [
        'Các công nghệ phái sinh đem lại lợi ích đáng kể cho đời sống trên mặt đất',
        'Chi phí sẽ giảm dần khi công nghệ trưởng thành',
        'Đó là khoản đầu tư cho uy tín quốc gia',
        'Không gian chứa nguồn tài nguyên chưa khai thác',
      ],
      answer: 0,
      dan: 'While some question if the massive investment required for such an endeavour is justifiable, advocates argue that the technological spinoffs significantly benefit terrestrial life.',
    },
    {
      q: 'Việc thương mại hoá không gian mang lại cơ hội và thách thức gì?',
      options: [
        'Cơ hội du lịch vũ trụ, và thách thức từ rác quỹ đạo',
        'Cơ hội khai khoáng, và thách thức về pháp lý quốc tế',
        'Cơ hội hạ giá thành phóng, và thách thức về an toàn',
        'Cơ hội hợp tác tư nhân, và thách thức về bảo mật công nghệ',
      ],
      answer: 0,
      dan: 'Furthermore, global collaboration is essential, as the commercialization of space introduces both opportunities for space tourism and challenges like orbital debris.',
    },
    {
      q: 'Cột mốc tối hậu mà bài nhắc tới là gì?',
      options: [
        'Lập thuộc địa trên một hành tinh ngoài Trái Đất sống được, bảo đảm sự sống còn của loài người',
        'Đưa con người tới rìa hệ Mặt Trời',
        'Liên lạc được với nền văn minh ngoài Trái Đất',
        'Xây dựng một trạm vũ trụ vĩnh viễn trên Mặt Trăng',
      ],
      answer: 0,
      dan: 'As we continue to propel our rockets at incredible velocity, the ultimate milestone remains the colonization of a habitable, extraterrestrial planet, ensuring the survival of our species in this vast, infinite cosmos.',
    },
  ],

  'ethics-philosophy-ielts': [
    {
      q: 'Thuyết vị lợi cho rằng hành động hợp lý là hành động thế nào?',
      options: [
        'Tối đa hoá điều tốt lớn nhất, đòi hỏi đánh giá khách quan các hệ quả',
        'Tuân thủ nghiêm ngặt các nguyên tắc đạo đức bất biến',
        'Đặt lợi ích của người khác lên trên lợi ích bản thân',
        'Cân nhắc giữa lý trí và cảm xúc trong mỗi lựa chọn',
      ],
      answer: 0,
      dan: 'Utilitarianism suggests that a rational action is one that maximizes the greatest good, demanding an objective evaluation of the consequences.',
    },
    {
      q: 'Chủ nghĩa duy tâm và vị tha nhấn mạnh điều gì?',
      options: [
        'Giá trị nội tại của lòng trắc ẩn, sự đồng cảm và tính trung thực tuyệt đối',
        'Trách nhiệm của cá nhân trước cộng đồng',
        'Sự cần thiết của các chuẩn mực xã hội chung',
        'Vai trò của giáo dục trong hình thành nhân cách',
      ],
      answer: 0,
      dan: 'Conversely, idealism and altruism emphasize the intrinsic value of compassion, empathy, and absolute honesty, arguing that virtues should transcend mere pragmatism.',
    },
    {
      q: 'Thực tế hành vi con người cho thấy một cuộc đấu tranh liên tục chống lại điều gì?',
      options: [
        'Những thói xấu huỷ hoại như chủ nghĩa vị kỷ, đạo đức giả và sự dối trá',
        'Áp lực của dư luận và định kiến xã hội',
        'Sự cám dỗ của quyền lực và tiền bạc',
        'Nỗi sợ hãi và bản năng sinh tồn',
      ],
      answer: 0,
      dan: 'However, the reality of human behavior reveals a constant struggle against destructive vices like egoism, hypocrisy, and deceit.',
    },
    {
      q: 'Bài đề xuất chống lại sự vô minh hời hợt bằng cách nào?',
      options: [
        'Nuôi dưỡng trí tuệ và lòng khoan dung',
        'Quay lại với các giá trị truyền thống',
        'Xây dựng hệ thống pháp luật chặt chẽ hơn',
        'Thúc đẩy tranh luận công khai về đạo đức',
      ],
      answer: 0,
      dan: 'To combat this superficial ignorance, we must cultivate wisdom and tolerance.',
    },
  ],

  'art-architecture-ielts': [
    {
      q: 'Nhà thờ lớn được mô tả bằng những chi tiết kiến trúc nào?',
      options: [
        'Vòm Gothic vút cao, cột trang trí cầu kỳ và kính màu tinh xảo',
        'Mái vòm tròn, hàng cột đá và bậc thềm rộng',
        'Tường đá dày, tháp chuông cao và cửa gỗ chạm khắc',
        'Trần chạm nổi, sàn khảm đá và tượng thánh hai bên',
      ],
      answer: 0,
      dan: 'A monumental cathedral with its soaring Gothic arches, ornate columns, and intricate stained glass is an architectural masterpiece that evokes a sense of awe.',
    },
    {
      q: 'Nghệ thuật tiến hoá từ đâu tới đâu theo bài?',
      options: [
        'Từ chủ nghĩa hiện thực cổ điển dựa vào tỉ lệ nghiêm ngặt và phối cảnh tuyến tính, tới các trào lưu tiên phong như lập thể và siêu thực',
        'Từ nghệ thuật tôn giáo tới nghệ thuật thế tục',
        'Từ hội hoạ trên tường tới hội hoạ trên toan',
        'Từ nghệ thuật thủ công tới nghệ thuật công nghiệp',
      ],
      answer: 0,
      dan: 'The evolution of art—from classical realism, which relies on strict proportion and linear perspective, to avant-garde movements like cubism and surrealism—demonstrates our endless desire to innovate.',
    },
    {
      q: 'Kiến trúc sư đương đại thường ưu tiên điều gì?',
      options: [
        'Thiết kế công năng, tối giản, dùng thép, kính và bê tông để dựng những toà nhà chọc trời',
        'Vật liệu bản địa và kỹ thuật xây dựng truyền thống',
        'Không gian mở và ánh sáng tự nhiên tối đa',
        'Sự hoà hợp giữa công trình mới và cảnh quan cũ',
      ],
      answer: 0,
      dan: 'Today, contemporary architects often prioritize functional, minimalist designs, utilizing modern mediums such as steel, glass, and concrete to construct breathtaking skyscrapers.',
    },
    {
      q: 'Vì sao các hiện vật nghệ thuật vượt lên trên vai trò trang trí đơn thuần?',
      options: [
        'Vì chúng là nguồn cảm hứng vô giá cho đời sau, nối liền đời sống thường nhật với những khả năng vô hạn của sáng tạo',
        'Vì chúng có giá trị vật chất tăng theo thời gian',
        'Vì chúng ghi lại chính xác các sự kiện lịch sử',
        'Vì chúng thể hiện trình độ kỹ thuật của từng thời kỳ',
      ],
      answer: 0,
      dan: 'They provide invaluable inspiration for future generations, bridging the gap between the mundane realities of daily life and the boundless possibilities of artistic creativity.',
    },
  ],

  'energy-environment-ielts': [
    {
      q: 'Sự chuyển đổi nào được coi là thiết yếu cho phát triển bền vững?',
      options: [
        'Từ nhiên liệu hoá thạch không tái tạo sang các nguồn tái tạo như điện mặt trời, tua-bin gió và thuỷ điện',
        'Từ tiêu thụ tập trung sang tiêu thụ phân tán',
        'Từ sản xuất công nghiệp sang kinh tế dịch vụ',
        'Từ vật liệu tổng hợp sang vật liệu phân huỷ sinh học',
      ],
      answer: 0,
      dan: 'The transition from non-renewable fossil fuels to renewable energy sources, such as solar power, wind turbines, and hydroelectric systems, is essential for sustainable development.',
    },
    {
      q: 'Các hiện tượng khí hậu này đẩy nhiều loài nguy cấp tới đâu?',
      options: [
        'Tới bờ tuyệt chủng, khi môi trường sống tự nhiên bị phá rừng huỷ hoại',
        'Tới việc phải di cư sang vùng khí hậu khác',
        'Tới tình trạng suy giảm số lượng nghiêm trọng',
        'Tới việc phụ thuộc vào các khu bảo tồn nhân tạo',
      ],
      answer: 0,
      dan: 'These phenomena disrupt the ecological balance, threaten biodiversity, and push many endangered species towards extinction as their natural habitats are destroyed by deforestation.',
    },
    {
      q: 'Chính phủ phải làm gì để giảm nhẹ tác động môi trường?',
      options: [
        'Thi hành chính sách nghiêm ngặt và thực thi luật pháp',
        'Tăng đầu tư công cho nghiên cứu năng lượng sạch',
        'Đàm phán các hiệp định khí hậu song phương',
        'Trợ giá cho doanh nghiệp chuyển đổi công nghệ',
      ],
      answer: 0,
      dan: 'Governments must implement strict policies and enforce legislation to mitigate environmental impacts.',
    },
    {
      q: 'Bài kết lại bằng ưu tiên nào?',
      options: [
        'Ưu tiên hiệu suất năng lượng và bảo tồn, để gìn giữ các hệ sinh thái mong manh của Trái Đất',
        'Ưu tiên hợp tác quốc tế trong ứng phó khí hậu',
        'Ưu tiên nâng cao nhận thức của từng công dân',
        'Ưu tiên tái chế và xử lý rác phân huỷ sinh học',
      ],
      answer: 0,
      dan: 'By prioritizing energy efficiency and conservation, we can preserve the earth’s delicate ecosystems and ensure a safe, sustainable future for generations to come.',
    },
  ],

  'politics-society-ielts': [
    {
      q: 'Sau khi trúng cử, các nhánh lập pháp và hành pháp phải làm gì?',
      options: [
        'Điều hành hiệu quả và thi hành chính sách giải quyết các vấn đề xã hội cấp bách như nghèo đói và bất bình đẳng',
        'Xây dựng lại bộ máy hành chính cho gọn nhẹ',
        'Đàm phán với phe đối lập để tìm đồng thuận',
        'Rà soát lại toàn bộ hệ thống pháp luật hiện hành',
      ],
      answer: 0,
      dan: 'Once elected, the legislative and executive branches must govern effectively and implement policies that address pressing social issues, such as poverty and inequality.',
    },
    {
      q: 'Hai luồng quan điểm về cách xử lý tội phạm là gì?',
      options: [
        'Một bên đòi trừng phạt nghiêm kể cả án tử hình để răn đe, bên kia nhấn mạnh phải cải tạo người phạm tội và xử lý gốc rễ tội phạm vị thành niên',
        'Một bên muốn tăng án tù, bên kia muốn thay bằng lao động công ích',
        'Một bên tin vào giám sát công nghệ, bên kia tin vào giáo dục cộng đồng',
        'Một bên ưu tiên bảo vệ nạn nhân, bên kia ưu tiên quyền của bị cáo',
      ],
      answer: 0,
      dan: 'While some advocate for strict punishment, including capital punishment, to deter criminals, others emphasize the need to rehabilitate offenders and tackle the root causes of juvenile delinquency.',
    },
    {
      q: 'Ngoại giao và hợp tác quốc tế nhằm những mục đích gì?',
      options: [
        'Giải quyết xung đột, đàm phán hiệp ước hoà bình và đối phó các mối đe doạ toàn cầu như khủng bố và thách thức của di cư quy mô lớn',
        'Mở rộng thị trường xuất khẩu và thu hút đầu tư',
        'Xây dựng các liên minh quân sự phòng thủ',
        'Thúc đẩy trao đổi văn hoá và giáo dục',
      ],
      answer: 0,
      dan: 'Beyond domestic borders, international diplomacy and cooperation are vital to resolve conflict, negotiate peace treaties, and combat global threats like terrorism and the challenges of mass immigration.',
    },
    {
      q: 'Trách nhiệm cốt lõi của mọi chính quyền là gì?',
      options: [
        'Bảo vệ tự do, nhân quyền và phúc lợi của đa số, đồng thời ngăn phân biệt đối xử với các nhóm thiểu số',
        'Duy trì trật tự xã hội và an ninh quốc gia',
        'Bảo đảm tăng trưởng kinh tế bền vững',
        'Giữ vững chủ quyền và toàn vẹn lãnh thổ',
      ],
      answer: 0,
      dan: 'Ultimately, protecting liberty, human rights, and the welfare of the majority while preventing discrimination against minorities remains the core responsibility of any authority.',
    },
  ],

  'history-culture-ielts-p2': [
    {
      q: 'Khảo cổ học giúp chúng ta hiểu điều gì?',
      options: [
        'Truyền thống, thần thoại và nghi lễ của tổ tiên, qua việc khai quật hiện vật và di vật',
        'Niên đại chính xác của các nền văn minh cổ',
        'Nguyên nhân sụp đổ của các đế chế lớn',
        'Cách con người thời cổ tổ chức xã hội',
      ],
      answer: 0,
      dan: 'Archaeology helps us excavate artifacts and relics, allowing us to understand the traditions, myths, and rituals of our ancestors.',
    },
    {
      q: 'Toàn cầu hoá vừa kết nối các xã hội đa văn hoá, vừa thách thức điều gì?',
      options: [
        'Sự đa dạng ngôn ngữ và bản sắc dân tộc',
        'Việc bảo tồn các di tích lịch sử',
        'Quyền tự chủ của các cộng đồng bản địa',
        'Sự tồn tại của các nghề thủ công truyền thống',
      ],
      answer: 0,
      dan: 'Today, globalization connects diverse multicultural societies, but it also challenges linguistic diversity and national identity.',
    },
    {
      q: 'Điều gì đôi khi can thiệp vào mục tiêu đưa tin khách quan của báo chí?',
      options: [
        'Kiểm duyệt và tuyên truyền chính trị',
        'Áp lực từ các nhà quảng cáo lớn',
        'Tốc độ đưa tin của mạng xã hội',
        'Thiếu nguồn lực điều tra chuyên sâu',
      ],
      answer: 0,
      dan: 'Journalism aims to provide objective coverage of events, though censorship and political propaganda sometimes interfere.',
    },
    {
      q: 'Bài kết lại rằng mỗi cá nhân cần nhận ra điều gì?',
      options: [
        'Thiên kiến tiềm ẩn và các thủ thuật thao túng, trong cả bản tin lẫn chiến dịch tiếp thị',
        'Nguồn gốc thật sự của mỗi thông tin lan truyền',
        'Vai trò của thuật toán trong việc chọn nội dung',
        'Ranh giới giữa quảng cáo và nội dung biên tập',
      ],
      answer: 0,
      dan: 'As viral content spreads rapidly through sophisticated algorithms, it is crucial for individuals to recognize potential bias and manipulative tactics in both news broadcasting and marketing campaigns.',
    },
  ],

  'business-economy-ielts': [
    {
      q: 'Một doanh nghiệp thành công đòi hỏi những gì?',
      options: [
        'Vốn lớn, đầu tư có chiến lược và hiểu rõ cung cầu',
        'Sản phẩm khác biệt và thương hiệu mạnh',
        'Đội ngũ lãnh đạo giàu kinh nghiệm',
        'Mạng lưới phân phối rộng và giá cạnh tranh',
      ],
      answer: 0,
      dan: 'A successful business requires significant capital, strategic investment, and a clear understanding of supply and demand.',
    },
    {
      q: 'Khi nào doanh nghiệp đứng trước nguy cơ phá sản?',
      options: [
        'Khi nợ phải trả vượt tài sản, hoặc vật lộn với nợ nặng và lãi suất vay ngân hàng cao',
        'Khi doanh thu giảm liên tiếp trong nhiều quý',
        'Khi mất thị phần vào tay đối thủ lớn hơn',
        'Khi không huy động được vốn từ nhà đầu tư',
      ],
      answer: 0,
      dan: 'If their liabilities exceed their assets, or if they struggle with heavy debt and high interest rates on bank loans, they risk facing bankruptcy.',
    },
    {
      q: 'Lạm phát cao dẫn tới chuỗi hậu quả nào?',
      options: [
        'Chi phí sinh hoạt tăng, sức mua giảm, có thể dẫn tới suy thoái và thất nghiệp gia tăng',
        'Lãi suất giảm và tín dụng được nới lỏng',
        'Xuất khẩu tăng nhờ đồng nội tệ yếu đi',
        'Chính phủ buộc phải tăng thuế thu nhập',
      ],
      answer: 0,
      dan: 'When inflation is high, the cost of living increases and consumer purchasing power drops, which can lead to an economic recession and rising unemployment.',
    },
    {
      q: 'Bài kết lại rằng nền tảng của một doanh nghiệp sinh lời và bền vững là gì?',
      options: [
        'Đổi mới liên tục và lực lượng lao động có tay nghề',
        'Quản trị tài chính chặt chẽ và kiểm soát chi phí',
        'Khả năng thích ứng với biến động vĩ mô',
        'Chiến lược mở rộng ra thị trường quốc tế',
      ],
      answer: 0,
      dan: 'Ultimately, continuous innovation and a skilled workforce are the cornerstones of a lucrative and sustainable enterprise.',
    },
  ],

  'transport-tourism-ielts': [
    {
      q: 'Tình trạng tắc đường nặng thúc đẩy các thành phố làm gì?',
      options: [
        'Cải thiện giao thông công cộng, khuyến khích đi chung xe và xây khu vực an toàn hơn cho người đi bộ',
        'Mở rộng lòng đường và xây thêm cầu vượt',
        'Hạn chế xe cá nhân vào giờ cao điểm',
        'Chuyển các cơ quan ra khỏi khu trung tâm',
      ],
      answer: 0,
      dan: 'In bustling urban centres, daily commuters often face severe traffic congestion, prompting cities to improve public transit, encourage carpooling, and build safer areas for pedestrians.',
    },
    {
      q: 'Một lịch trình được lên kỹ có thể gồm những gì?',
      options: [
        'Tham quan danh thắng lịch sử, nghỉ ngơi trên bãi biển hoang sơ, hoặc trải nghiệm văn hoá bản địa ở những ngôn làng xa xôi nên thơ',
        'Các tour trọn gói có hướng dẫn viên đi kèm',
        'Những chuyến bay nội địa nối các điểm đến chính',
        'Thời gian nghỉ dài giữa các chặng di chuyển',
      ],
      answer: 0,
      dan: 'A carefully planned itinerary might include sightseeing at historic landmarks, relaxing on pristine beaches, or experiencing the authentic culture of remote, picturesque villages.',
    },
    {
      q: 'Vì sao nhiều du khách chọn du lịch sinh thái?',
      options: [
        'Để giữ gìn cảnh quan địa phương và bảo đảm tính bền vững',
        'Vì chi phí thấp hơn các loại hình du lịch khác',
        'Vì được tiếp xúc gần với người dân bản địa',
        'Vì tránh được đám đông ở các điểm nổi tiếng',
      ],
      answer: 0,
      dan: 'Many travellers prefer eco-tourism to preserve the local landscape and ensure sustainability, while backpackers might embrace a more nomadic or itinerant lifestyle.',
    },
    {
      q: 'Trước một chuyến đi quốc tế dài ngày, cần chuẩn bị những gì?',
      options: [
        'Sắp xếp chỗ ở, xin thị thực và kiểm tra tỉ giá hối đoái',
        'Mua bảo hiểm du lịch và tiêm phòng theo yêu cầu',
        'Đặt vé khứ hồi và lên lịch trình chi tiết',
        'Đổi tiền mặt và đăng ký gói cước quốc tế',
      ],
      answer: 0,
      dan: 'Before embarking on an international voyage or a long expedition, one must arrange accommodation, secure a visa, and check the currency exchange rate.',
    },
  ],

  'health-medicine-ielts': [
    {
      q: 'Hệ thống y tế hiện đại đang đối mặt những thách thức nào?',
      options: [
        'Chi phí thuốc men tăng và thiếu bác sĩ, bác sĩ phẫu thuật có chuyên môn',
        'Quá tải bệnh viện và thiếu giường bệnh',
        'Bất bình đẳng trong tiếp cận dịch vụ y tế',
        'Sự lạm dụng kháng sinh trong điều trị',
      ],
      answer: 0,
      dan: 'However, modern medical systems face numerous challenges, from the rising costs of medication to a shortage of qualified physicians and surgeons.',
    },
    {
      q: 'Vì sao chẩn đoán chính xác là điều then chốt?',
      options: [
        'Vì nó quyết định phương pháp điều trị hoặc trị liệu đúng đắn',
        'Vì nó giúp rút ngắn thời gian nằm viện',
        'Vì nó giảm chi phí cho người bệnh',
        'Vì nó ngăn bệnh lây lan ra cộng đồng',
      ],
      answer: 0,
      dan: 'When a patient presents with a symptom, an accurate diagnosis is crucial for determining the correct treatment or therapy.',
    },
    {
      q: 'Các bệnh không lây nhiễm như tim mạch, tiểu đường và ung thư thường liên quan tới gì?',
      options: [
        'Các yếu tố lối sống như dinh dưỡng kém và béo phì',
        'Yếu tố di truyền trong gia đình',
        'Ô nhiễm môi trường sống và làm việc',
        'Sự lão hoá của dân số',
      ],
      answer: 0,
      dan: 'Beyond viruses, non-communicable ailments such as heart disease, diabetes, and cancer pose significant threats, often linked to lifestyle factors like poor nutrition and obesity.',
    },
    {
      q: 'Các biện pháp phòng ngừa giúp giảm đáng kể nguy cơ gì?',
      options: [
        'Nguy cơ đột quỵ hoặc nhồi máu cơ tim',
        'Nguy cơ mắc bệnh truyền nhiễm',
        'Nguy cơ phải phẫu thuật khẩn cấp',
        'Nguy cơ biến chứng do dùng thuốc',
      ],
      answer: 0,
      dan: 'Preventive measures, including public hygiene, better sanitation, and regular exercise, can significantly reduce the risk of a stroke or heart attack.',
    },
  ],

  'law-crime-ielts-p2': [
    {
      q: 'Thám tử cần điều gì để xin được lệnh bắt nghi phạm chính?',
      options: [
        'Thu thập đủ chứng cứ',
        'Được viện kiểm sát phê chuẩn',
        'Có lời khai của ít nhất một nhân chứng',
        'Xác định được động cơ gây án',
      ],
      answer: 0,
      dan: 'If a detective gathers enough evidence, they can obtain a warrant to arrest the prime suspect.',
    },
    {
      q: 'Luật sư bào chữa làm những gì tại phiên toà?',
      options: [
        'Bảo vệ thân chủ, mời nhân chứng ra khai và tìm cách gieo nghi ngờ lên chứng cứ đưa ra',
        'Đề nghị toà xem xét tình tiết giảm nhẹ',
        'Yêu cầu điều tra bổ sung trước khi tuyên án',
        'Thương lượng mức án với bên công tố',
      ],
      answer: 0,
      dan: 'Conversely, a defense attorney will defend their client, calling upon a witness to testify and attempting to cast doubt on the proof provided.',
    },
    {
      q: 'Mức án phụ thuộc vào điều gì?',
      options: [
        'Mức độ nghiêm trọng của hành vi phạm pháp',
        'Thái độ khai báo của bị cáo tại toà',
        'Số lượng chứng cứ mà bên công tố đưa ra',
        'Tiền án tiền sự của người phạm tội',
      ],
      answer: 0,
      dan: 'Depending on the severity of the illegal act, the sentence might be a heavy fine, community service, or being sent to prison.',
    },
    {
      q: 'Nhiều người cho rằng hệ thống tư pháp hình sự nên tập trung thêm vào điều gì?',
      options: [
        'Cải tạo phạm nhân, giúp họ tái hoà nhập xã hội thay vì chỉ nhốt lại',
        'Rút ngắn thời gian xét xử mỗi vụ án',
        'Tăng mức án để răn đe mạnh hơn',
        'Bồi thường thoả đáng cho người bị hại',
      ],
      answer: 0,
      dan: 'While punishment serves as a deterrent to others, many argue that the criminal justice system should also focus on trying to rehabilitate inmates, helping them reintegrate into society rather than simply locking them away for their crimes.',
    },
  ],

  'arts-culture-ielts': [
    {
      q: 'Những truyền thống nào kể câu chuyện của một dân tộc?',
      options: [
        'Từ truyền thuyết cổ và văn hoá dân gian tới thơ ca cổ điển',
        'Từ kiến trúc đền đài tới nghề thủ công truyền thống',
        'Từ lễ hội mùa vụ tới nghi lễ tôn giáo',
        'Từ trang phục dân tộc tới ẩm thực vùng miền',
      ],
      answer: 0,
      dan: 'From ancient legends and folklore to classic poetry, these traditions tell the story of a nation.',
    },
    {
      q: 'Diễn viên tận tuỵ dành hàng giờ để làm gì?',
      options: [
        'Tập luyện nhằm hoàn thiện phần trình diễn trong một vở kịch',
        'Nghiên cứu bối cảnh lịch sử của vai diễn',
        'Học thuộc toàn bộ kịch bản trước buổi tập',
        'Phối hợp với đạo diễn về cách xử lý nhân vật',
      ],
      answer: 0,
      dan: 'A dedicated actor or actress spends hours in rehearsal to perfect their performance in a play or drama.',
    },
    {
      q: 'Âm nhạc nối các thế hệ bằng cách nào?',
      options: [
        'Nhà soạn nhạc tài năng viết giao hưởng cho dàn nhạc lớn trình diễn với nhiều loại nhạc cụ',
        'Các bản nhạc cũ được phối lại theo phong cách hiện đại',
        'Các nhạc viện truyền dạy kỹ thuật qua nhiều đời',
        'Lễ hội âm nhạc quy tụ khán giả mọi lứa tuổi',
      ],
      answer: 0,
      dan: 'Music also bridges generations, as a talented composer creates a symphony performed by a grand orchestra playing a variety of instruments.',
    },
    {
      q: 'Bài kết lại về giá trị của những trải nghiệm văn hoá?',
      options: [
        'Chúng làm giàu đời sống và nối ta với lịch sử chung của loài người',
        'Chúng giúp bảo tồn di sản cho thế hệ sau',
        'Chúng tạo ra nguồn thu lớn cho ngành du lịch',
        'Chúng là cách để mỗi dân tộc khẳng định bản sắc',
      ],
      answer: 0,
      dan: 'Whether attending a vibrant festival, admiring the aesthetic design of unique architecture, or reading a compelling work of fiction by a renowned author, these cultural experiences enrich our lives and connect us to our shared human history.',
    },
  ],

  'media-communication-ielts-p2': [
    {
      q: 'Ngày nay bất cứ ai cũng có thể làm gì?',
      options: [
        'Đóng vai phóng viên, đăng bài và chia sẻ tin nóng',
        'Mở một kênh tin tức có thu phí',
        'Đăng ký hành nghề báo chí trực tuyến',
        'Truy cập mọi nguồn tin không giới hạn',
      ],
      answer: 0,
      dan: 'Today, anyone can act as a correspondent, publishing articles and sharing breaking news.',
    },
    {
      q: 'Tin giả và thông tin sai lệch lan nhanh trên mạng xã hội gây hậu quả gì?',
      options: [
        'Dễ dàng thao túng dư luận',
        'Làm giảm uy tín của các nền tảng',
        'Khiến người dùng rời bỏ mạng xã hội',
        'Buộc chính phủ phải tăng kiểm duyệt',
      ],
      answer: 0,
      dan: 'The rapid spread of fake news and misinformation across social media networks can easily manipulate public opinion.',
    },
    {
      q: 'Một số kênh tin bị cáo buộc điều gì?',
      options: [
        'Thiên vị chính trị, ưu tiên tít giật gân và chuyện đời tư người nổi tiếng hơn là đưa tin khách quan, thực chứng',
        'Nhận tài trợ ngầm từ các tập đoàn lớn',
        'Sao chép nội dung từ các nguồn nước ngoài',
        'Không kiểm chứng thông tin trước khi phát sóng',
      ],
      answer: 0,
      dan: 'Furthermore, some news channels are accused of political bias, prioritizing sensational headlines and celebrity gossip—much like a tabloid—over objective, factual reporting.',
    },
    {
      q: 'Bài kết lại rằng công nghệ đòi hỏi người dùng làm gì?',
      options: [
        'Đánh giá một cách phản biện nội dung họ tiếp nhận và nguồn họ theo dõi',
        'Hạn chế thời gian dùng mạng xã hội mỗi ngày',
        'Ưu tiên các cơ quan báo chí truyền thống',
        'Báo cáo những nội dung sai lệch mà họ gặp',
      ],
      answer: 0,
      dan: 'Ultimately, while technology allows us to interact and communicate faster than ever before, it requires users to critically evaluate the content they consume and the sources they subscribe to.',
    },
  ],

  'history-past-ielts': [
    {
      q: 'Khi khai quật một di chỉ, các chuyên gia thường tìm thấy gì?',
      options: [
        'Hiện vật vô giá và hoá thạch giấu dưới lòng đất',
        'Nền móng của các công trình cổ',
        'Văn bản khắc trên đá và kim loại',
        'Mộ táng của tầng lớp quý tộc',
      ],
      answer: 0,
      dan: 'Archaeology plays a crucial role in this process; when experts excavate a site, they often uncover priceless artifacts and fossils hidden beneath the earth.',
    },
    {
      q: 'Số phận chung của các đế chế hùng mạnh và triều đại lâu đời là gì?',
      options: [
        'Trỗi dậy rồi rốt cuộc cũng đổ nát',
        'Sáp nhập dần vào các thế lực lớn hơn',
        'Chuyển hoá thành các quốc gia hiện đại',
        'Tan rã do xung đột nội bộ kéo dài',
      ],
      answer: 0,
      dan: 'Over the centuries and millennia, a powerful empire or a long-lasting dynasty would rise, only to eventually fall into ruin.',
    },
    {
      q: 'Việc hoàng đế xâm lược nước láng giềng thường châm ngòi cho điều gì?',
      options: [
        'Một cuộc nổi dậy hoặc cách mạng toàn diện trong những người bị áp bức',
        'Một liên minh phòng thủ giữa các nước nhỏ',
        'Một giai đoạn đình trệ kinh tế kéo dài',
        'Một làn sóng di cư sang vùng đất khác',
      ],
      answer: 0,
      dan: 'However, such actions frequently sparked a rebellion or a full-scale revolution among the oppressed.',
    },
    {
      q: 'Việc bảo tồn di sản văn hoá bảo đảm điều gì?',
      options: [
        'Con cháu hôm nay học được từ cả chiến thắng lẫn sai lầm của quá khứ',
        'Các di tích không bị huỷ hoại bởi thời gian',
        'Bản sắc dân tộc không bị hoà tan',
        'Ngành du lịch văn hoá có nguồn thu ổn định',
      ],
      answer: 0,
      dan: 'Whether it is by maintaining a historic monument, studying oral mythology, or protecting documents in an archive, the preservation of our cultural heritage ensures that the descendants of today can learn from the triumphs and mistakes of the past.',
    },
  ],

  'science-space-ielts': [
    {
      q: 'Nhà khoa học tận tuỵ làm gì với một giả thuyết?',
      options: [
        'Hình thành nó rồi kiểm chứng bằng thực nghiệm nghiêm ngặt trong phòng thí nghiệm',
        'Công bố nó để cộng đồng khoa học phản biện',
        'Đối chiếu nó với các lý thuyết đã có',
        'Mô phỏng nó bằng mô hình máy tính',
      ],
      answer: 0,
      dan: 'A dedicated scientist will formulate a hypothesis and test it through rigorous experimentation in a laboratory.',
    },
    {
      q: 'Một sứ mệnh không gian phải cẩn thận tránh những gì?',
      options: [
        'Tiểu hành tinh nguy hiểm và bức xạ vũ trụ chết người',
        'Rác vũ trụ và các vệ tinh đang hoạt động',
        'Trường hấp dẫn của các hành tinh lớn',
        'Bão từ phát ra từ Mặt Trời',
      ],
      answer: 0,
      dan: 'A space mission involves sending an astronaut in a rocket far beyond Earth’s atmosphere into the vacuum of space, carefully avoiding dangerous asteroids and lethal cosmic radiation.',
    },
    {
      q: 'Một số người có tầm nhìn xa đang bàn tới khả năng gì?',
      options: [
        'Lập thuộc địa trên các hành tinh khác như sao Hoả để bảo đảm sự sống còn của loài người',
        'Khai thác khoáng sản từ các tiểu hành tinh',
        'Xây dựng trạm nghiên cứu vĩnh viễn trên quỹ đạo',
        'Dùng vệ tinh để kiểm soát khí hậu Trái Đất',
      ],
      answer: 0,
      dan: 'With satellites transmitting vital data back to Earth, some visionaries even discuss the possibility of colonizing other planets like Mars to ensure human survival.',
    },
    {
      q: 'Điều gì thúc đẩy con người tiến lên phía trước?',
      options: [
        'Khát vọng tìm ra sự sống ngoài Trái Đất hoặc hiểu được các hạt cơ bản của vật chất lượng tử',
        'Nhu cầu tìm nguồn tài nguyên mới ngoài Trái Đất',
        'Cuộc chạy đua công nghệ giữa các cường quốc',
        'Mong muốn chứng minh các lý thuyết vật lý hiện có',
      ],
      answer: 0,
      dan: 'The quest to discover extraterrestrial life or understand the fundamental particles of quantum matter drives us forward, proving that the frontier of space exploration is truly limitless.',
    },
  ],

  'architecture-urban-ielts': [
    {
      q: 'Làn sóng di cư nhanh từ nông thôn ra đô thị dẫn tới điều gì?',
      options: [
        'Đô thị mở rộng tràn lan và mật độ dân số cao',
        'Thiếu hụt lao động ở khu vực nông thôn',
        'Giá nhà đất tăng vọt ở vùng ngoại vi',
        'Áp lực lên hệ thống giáo dục thành phố',
      ],
      answer: 0,
      dan: 'This rapid migration often results in urban sprawl and high population density.',
    },
    {
      q: 'Một hạ tầng vững chắc gồm những gì?',
      options: [
        'Không chỉ đường rộng để giảm tắc nghẽn, mà còn giao thông công cộng đáng tin cho hành trình đi làm hằng ngày',
        'Hệ thống cấp thoát nước và xử lý rác thải',
        'Mạng lưới điện và viễn thông phủ khắp',
        'Các tiện ích công cộng như công viên và trường học',
      ],
      answer: 0,
      dan: 'A solid infrastructure is vital, encompassing not just wide roads to reduce traffic congestion, but also reliable public transport for a tenant’s daily commute.',
    },
    {
      q: 'Thay vì phá bỏ công trình cũ, nhiều nhà phát triển chọn cách nào?',
      options: [
        'Cải tạo và phục dựng công trình lịch sử để giữ di sản văn hoá của thành phố',
        'Di dời chúng sang khu bảo tồn kiến trúc',
        'Giữ nguyên mặt ngoài và thay mới toàn bộ bên trong',
        'Chuyển đổi công năng thành bảo tàng hoặc phòng trưng bày',
      ],
      answer: 0,
      dan: 'Rather than choosing to demolish old structures, many developers opt to renovate and restore historical buildings to preserve the city’s cultural heritage.',
    },
    {
      q: 'Quy hoạch đô thị thành công tạo ra điều gì?',
      options: [
        'Một môi trường hài hoà nơi cả chủ nhà lẫn người thuê đều phát triển được',
        'Một thành phố có mật độ xây dựng hợp lý',
        'Một hệ thống giao thông không còn ùn tắc',
        'Một cảnh quan đô thị mang bản sắc riêng',
      ],
      answer: 0,
      dan: 'Ultimately, successful urban planning creates a harmonious environment where both a landlord and a tenant can thrive in a well-designed, modern society.',
    },
  ],

  // ════════════════════════════════════════════════════════════════════════
  // BẬC C1 — 46/46 chặng. Đủ tiêu chí N5: 121/122 chặng ≥B1.
  // ════════════════════════════════════════════════════════════════════════

  'economy-money': [
    {
      q: 'Vì sao Bob không mặc cả được với thu ngân?',
      options: [
        'Vì cửa hàng có chính sách bán lẻ nghiêm ngặt',
        'Vì chiếc TV đã hết hàng',
        'Vì anh không mang đủ tiền mặt',
        'Vì thu ngân không có quyền quyết định',
      ],
      answer: 0,
      dan: 'He tried to bargain with the cashier for a discount, but the store had a strict retail policy.',
    },
    {
      q: 'Chuyện gì xảy ra khi Bob tới ngân hàng?',
      options: [
        'Tài khoản rỗng, và ngân hàng từ chối tấm séc giả anh định gửi',
        'Anh rút được tiền nhưng phải trả phí cao',
        'Ngân hàng đồng ý cho vay ngay lập tức',
        'Anh mở được một tài khoản tiết kiệm mới',
      ],
      answer: 0,
      dan: 'He tried to deposit a fake check, but the bank refused the transaction.',
    },
    {
      q: 'Vì sao việc kinh doanh của Bob thua lỗ nặng?',
      options: [
        'Vì anh không lập ngân sách, và sau khi đóng thuế nặng thì lỗ lớn',
        'Vì hàng hoá anh nhập không bán được',
        'Vì đối thủ trong chợ cạnh tranh gay gắt',
        'Vì kế toán anh thuê làm sai sổ sách',
      ],
      answer: 0,
      dan: 'However, he didn’t plan a budget. After paying heavy tax, his business suffered a huge loss.',
    },
    {
      q: 'Điều gì làm đời Bob đổi hẳn ở phần cuối?',
      options: [
        'Anh biết mình sắp thừa kế một gia tài lớn từ người chú giàu có',
        'Việc kinh doanh của anh cuối cùng cũng có lãi',
        'Anh trúng lớn trên thị trường chứng khoán',
        'Anh được nhận một khoản lương hưu sớm',
      ],
      answer: 0,
      dan: 'Suddenly, Bob discovered he was going to inherit a huge fortune from a wealthy uncle!',
    },
  ],

  'education-learning-advanced': [
    {
      q: 'Vì sao cha mẹ chuyển Bob sang trường tư và trường nội trú?',
      options: [
        'Để rèn tính kỷ luật cho anh',
        'Vì trường công gần nhà đã đóng cửa',
        'Vì anh bị đuổi khỏi trường cũ',
        'Để anh được học chương trình nâng cao',
      ],
      answer: 0,
      dan: 'His parents transferred him to a strict private school and a boarding school to improve his discipline.',
    },
    {
      q: 'Điều gì ngăn Bob bỏ học?',
      options: [
        'Một giáo viên tiến bộ dùng phép so sánh để hướng dẫn và chỉ dạy rõ ràng cho anh',
        'Cha mẹ anh dọa cắt trợ cấp',
        'Anh giành được học bổng vào phút chót',
        'Hiệu trưởng cho anh một cơ hội cuối',
      ],
      answer: 0,
      dan: 'Bob lost his motivation and thought about deciding to drop out, but a progressive teacher used an analogy to give him guidance and clear instruction.',
    },
    {
      q: 'Vì sao phần trình bày miệng của Bob bị điểm thấp?',
      options: [
        'Vì câu trả lời của anh sai',
        'Vì anh nói quá giờ quy định',
        'Vì anh không chuẩn bị tài liệu',
        'Vì anh trích dẫn sai nguồn',
      ],
      answer: 0,
      dan: 'His oral presentation got a bad grade, negative feedback, and a low score because his answer was incorrect.',
    },
    {
      q: 'Nghịch lý ở kết cục của Bob là gì?',
      options: [
        'Bất chấp quá khứ lười biếng, anh trở thành người hành nghề tận tuỵ và dành cả đời cho việc dạy học',
        'Anh tốt nghiệp nhưng không tìm được việc',
        'Anh trở lại chính ngôi trường từng đuổi mình',
        'Anh bỏ ngành nghệ thuật để theo khoa học',
      ],
      answer: 0,
      dan: 'Ironically, despite the irony of his lazy past, it was an ironic twist that he became a dedicated practitioner who decided to dedicate his life to teaching.',
    },
  ],

  'science-tech-advanced': [
    {
      q: 'Nhóm của Benny dùng học máy để làm gì?',
      options: [
        'Phân tích dữ liệu lớn từ nghiên cứu hệ gen, hướng tới y học cá thể hoá',
        'Dự báo nhu cầu thị trường cho công ty khởi nghiệp',
        'Tự động hoá các công việc lặp đi lặp lại',
        'Phát hiện lỗ hổng trong hệ thống an ninh mạng',
      ],
      answer: 0,
      dan: 'His team used machine learning to analyze big data from genomics research, hoping to create personalized medicine.',
    },
    {
      q: 'Benny xử lý sự cố an ninh mạng bằng cách nào?',
      options: [
        'Dùng mô phỏng bằng máy tính lượng tử để thiết kế nguyên mẫu vắc-xin mRNA trong thời gian kỷ lục',
        'Cô lập toàn bộ hệ thống điện toán đám mây',
        'Nhờ mạng nơ-ron truy vết nguồn tấn công',
        'Chuyển dữ liệu sang nền tảng blockchain',
      ],
      answer: 0,
      dan: 'Using quantum computing simulation, Benny designed an mRNA vaccine prototype in record time.',
    },
    {
      q: 'Đổi mới lớn nhất mà bài nhắc tới là gì?',
      options: [
        'Kết hợp blockchain với IoT để tạo nền tảng y tế số an toàn',
        'In 3D các bộ phận cấy ghép y tế',
        'Công nghệ đeo được để theo dõi bệnh nhân',
        'Robot đảm nhận việc tự động hoá',
      ],
      answer: 0,
      dan: 'But the biggest innovation? They combined blockchain with IoT to create a secure digital health platform — a breakthrough in digital transformation.',
    },
    {
      q: 'Theo Benny, mọi đổi mới bắt đầu từ đâu?',
      options: [
        'Từ sự tò mò',
        'Từ nhu cầu của thị trường',
        'Từ nguồn vốn đầu tư dồi dào',
        'Từ hợp tác giữa các nhóm nghiên cứu',
      ],
      answer: 0,
      dan: 'From space exploration to semiconductor design — every innovation starts with curiosity.',
    },
  ],

  'psychology-emotions': [
    {
      q: 'Nhà trị liệu chẩn đoán Benny đã mắc phải điều gì?',
      options: [
        'Sự bất lực tập nhiễm — anh thôi tin rằng mình có thể thành công',
        'Rối loạn lo âu xã hội',
        'Hội chứng kẻ mạo danh',
        'Thiên kiến xác nhận trong tư duy',
      ],
      answer: 0,
      dan: 'His therapist said he had developed learned helplessness — he’d stopped believing he could succeed.',
    },
    {
      q: 'Thiên kiến xác nhận tác động lên Benny thế nào?',
      options: [
        'Khiến anh chỉ để ý tới những lần thất bại của mình',
        'Khiến anh đánh giá quá cao khả năng bản thân',
        'Khiến anh né tránh mọi thử thách mới',
        'Khiến anh so sánh mình với người khác',
      ],
      answer: 0,
      dan: 'Confirmation bias made him only notice his failures.',
    },
    {
      q: 'Benny học được gì về hội chứng kẻ mạo danh?',
      options: [
        'Rằng nó rất phổ biến — cả những người tự tin nhất đôi khi cũng thấy mình như kẻ giả mạo',
        'Rằng nó chỉ xuất hiện ở người mới bắt đầu',
        'Rằng nó là dấu hiệu của lòng tự trọng thấp',
        'Rằng nó biến mất khi ta đạt được thành tựu',
      ],
      answer: 0,
      dan: 'He learned that imposter syndrome was common — even the most confident people felt like frauds sometimes.',
    },
    {
      q: 'Nhà trị liệu giải thích tính mềm dẻo thần kinh ra sao?',
      options: [
        'Não thay đổi qua tính mềm dẻo thần kinh — mỗi lần thử lại là một lần nối lại dây thần kinh hướng tới thành công',
        'Não học nhanh nhất trong giai đoạn còn trẻ',
        'Não cần thời gian nghỉ để củng cố trí nhớ',
        'Não phản ứng với cảm xúc trước khi kịp suy nghĩ',
      ],
      answer: 0,
      dan: 'The brain changes through neuroplasticity — every time you try again, you rewire for success.',
    },
  ],

  'media-journalism': [
    {
      q: 'Bài báo lớn đầu tiên của Benny nói về chuyện gì?',
      options: [
        'Tin giả và thông tin sai lệch lan truyền trên mạng xã hội',
        'Việc người có ảnh hưởng nhận tiền quảng cáo trá hình',
        'Sự sụp đổ của các toà soạn báo in',
        'Quyền tự do báo chí bị hạn chế',
      ],
      answer: 0,
      dan: 'His first major story was about fake news and misinformation spreading on social media.',
    },
    {
      q: 'Benny phát hiện thuật toán tạo ra thứ gì?',
      options: [
        'Buồng vọng âm — nơi người ta chỉ thấy nội dung củng cố niềm tin sẵn có',
        'Những nội dung lan truyền không kiểm soát',
        'Sự phân cực giữa các nhóm người dùng',
        'Nguồn thu quảng cáo cho các nền tảng',
      ],
      answer: 0,
      dan: 'He discovered how algorithms create echo chambers — where people only see content that confirms their beliefs.',
    },
    {
      q: 'Người có ảnh hưởng với 5 triệu người theo dõi đã làm gì?',
      options: [
        'Vô tình lan truyền tuyên truyền được nguỵ trang thành nội dung lan toả',
        'Cố tình đăng tin sai để tăng lượt xem',
        'Nhận tiền của một tổ chức chính trị',
        'Từ chối trả lời phỏng vấn của Benny',
      ],
      answer: 0,
      dan: 'He interviewed an influencer with 5 million followers who had unknowingly spread propaganda disguised as viral content.',
    },
    {
      q: 'Benny gọi năng lực đọc hiểu truyền thông là gì?',
      options: [
        'Siêu năng lực của thế kỷ 21',
        'Điều kiện của một nền dân chủ lành mạnh',
        'Kỹ năng bắt buộc với mọi nhà báo',
        'Cách duy nhất để chống lại kiểm duyệt',
      ],
      answer: 0,
      dan: 'Media literacy is the superpower of the 21st century!',
    },
  ],

  'ielts-academic-vocab': [
    {
      q: 'Benny lập kế hoạch học dựa trên nguồn nào?',
      options: [
        'Danh sách Từ vựng Học thuật (AWL)',
        'Bộ đề thi IELTS các năm trước',
        'Một cuốn từ điển đồng nghĩa chuyên sâu',
        'Các bài mẫu điểm cao của thí sinh khác',
      ],
      answer: 0,
      dan: 'So he created a study plan using the Academic Word List (AWL).',
    },
    {
      q: 'Trong bài luận, Benny nêu bằng chứng thực nghiệm chỉ ra mối tương quan giữa gì với gì?',
      options: [
        'Giữa công việc ít vận động và việc tăng cân',
        'Giữa quảng cáo thực phẩm và thói quen ăn uống',
        'Giữa mạng xã hội và mức độ vận động',
        'Giữa chính sách công và tỉ lệ béo phì',
      ],
      answer: 0,
      dan: 'The empirical evidence indicates a strong correlation between sedentary work and increased body weight.',
    },
    {
      q: 'Giám khảo ấn tượng với những điểm nào trong bài của Benny?',
      options: [
        'Cấu trúc mạch lạc, vốn từ sâu sắc và khả năng luận chứng',
        'Độ dài bài viết và tốc độ hoàn thành',
        'Cách dùng ví dụ thực tế và số liệu',
        'Ngữ pháp chính xác và chính tả không lỗi',
      ],
      answer: 0,
      dan: 'The examiner was impressed by the coherent structure, profound vocabulary, and ability to substantiate arguments.',
    },
    {
      q: 'Benny nói vốn từ học thuật giúp ích thế nào ngoài phòng thi?',
      options: [
        'Giúp nghĩ rõ ràng hơn, viết thuyết phục hơn và giao tiếp chuyên nghiệp hơn',
        'Giúp đọc nhanh các tài liệu chuyên ngành',
        'Giúp gây ấn tượng với nhà tuyển dụng',
        'Giúp hiểu sâu các bài nghiên cứu khoa học',
      ],
      answer: 0,
      dan: 'Every word in the AWL helps you think more clearly, write more convincingly, and communicate more professionally.',
    },
  ],

  'success-mindset-100': [
    {
      q: 'Theo bài, để đạt mục tiêu và tới thành công thì cần gì?',
      options: [
        'Bỏ công sức và tìm ra động lực',
        'Có tài năng bẩm sinh và may mắn',
        'Có người dẫn dắt và mạng lưới quan hệ',
        'Có kế hoạch chi tiết và nguồn lực',
      ],
      answer: 0,
      dan: 'To achieve your goal and reach success, you must put in effort and find motivation.',
    },
    {
      q: 'Bài nói bạn truyền cảm hứng cho người khác khi nào?',
      options: [
        'Khi vượt qua mọi trở ngại bằng sự quyết tâm',
        'Khi đạt được thành tựu lớn trong nghề',
        'Khi chia sẻ tri thức mình có',
        'Khi giữ được thái độ lạc quan',
      ],
      answer: 0,
      dan: 'You can inspire others when you overcome every obstacle with determination.',
    },
    {
      q: 'Hai phẩm chất nào được nói là dẫn tới sự bền bỉ?',
      options: [
        'Tính nhất quán và kỷ luật',
        'Sự tập trung và tư duy phát triển',
        'Tham vọng và lòng dũng cảm',
        'Sự tận tâm và lòng biết ơn',
      ],
      answer: 0,
      dan: 'Consistency and discipline will lead to resilience.',
    },
    {
      q: 'Bài khuyên nên đón nhận điều gì?',
      options: [
        'Gian khó, đổi mới và tận hưởng hành trình của tri thức, năng lực dẫn dắt và sự tinh thông',
        'Mọi cơ hội đến với mình dù nhỏ',
        'Lời phê bình từ những người xung quanh',
        'Thất bại như một phần của quá trình',
      ],
      answer: 0,
      dan: 'Embrace hardship, innovate, and enjoy the journey of knowledge, leadership, and mastery.',
    },
  ],

  'global-issues-politics-ielts': [
    {
      q: 'Mối lo lớn nào ở các nước đang phát triển được nêu?',
      options: [
        'Nghèo cùng cực và nạn đói dai dẳng, thường trầm trọng thêm vì bất bình đẳng và thiếu nhân quyền',
        'Tình trạng tham nhũng trong bộ máy chính quyền',
        'Sự phụ thuộc vào viện trợ nước ngoài',
        'Làn sóng di cư ra nước ngoài của người trẻ',
      ],
      answer: 0,
      dan: 'One major concern is the persistence of extreme poverty and famine in developing nations, often worsened by severe inequality and a lack of human rights.',
    },
    {
      q: 'Đại sứ hướng tới điều gì khi đàm phán với lãnh đạo nước ngoài?',
      options: [
        'Ký một hiệp ước hoà bình, thay vì áp lệnh trừng phạt kinh tế',
        'Mở rộng quan hệ thương mại song phương',
        'Vận động viện trợ cho người tị nạn',
        'Thành lập một liên minh phòng thủ chung',
      ],
      answer: 0,
      dan: 'An ambassador will negotiate with foreign leaders, aiming to sign a peace treaty rather than imposing economic sanctions.',
    },
    {
      q: 'Nhà hoạt động có thể làm gì trên đường phố, và rủi ro là gì?',
      options: [
        'Dẫn đầu biểu tình ôn hoà đòi hành động chống phân biệt chủng tộc, nhưng đôi khi có thể biến thành bạo loạn',
        'Vận động ký tên vào kiến nghị gửi quốc hội',
        'Tổ chức đình công gây sức ép lên doanh nghiệp',
        'Kêu gọi tẩy chay hàng hoá của nước vi phạm',
      ],
      answer: 0,
      dan: 'Meanwhile, on the streets, an activist might lead a peaceful protest or mass demonstration to demand action against racism and discrimination, though sometimes these can unfortunately turn into a riot.',
    },
    {
      q: 'Bài kết lại rằng nền dân chủ chỉ thật sự phát triển được nhờ điều gì?',
      options: [
        'Nỗ lực chung của cộng đồng quốc tế',
        'Việc mỗi quốc gia tự giải quyết vấn đề nội bộ',
        'Sự lớn mạnh của các tổ chức phi chính phủ',
        'Việc chấm dứt mọi xung đột vũ trang',
      ],
      answer: 0,
      dan: 'Only through shared effort can a democracy truly thrive and secure global peace.',
    },
  ],

  'music-performing-arts-ielts': [
    {
      q: 'Dàn diễn viên phải làm gì để hoàn thiện vai diễn?',
      options: [
        'Tập kịch bản thật kỹ trong các buổi tập',
        'Nghiên cứu bối cảnh lịch sử của vở kịch',
        'Thử vai nhiều lần trước ban giám khảo',
        'Làm việc riêng với nhà viết kịch',
      ],
      answer: 0,
      dan: 'The cast must meticulously rehearse the script during a rehearsal to perfect their roles.',
    },
    {
      q: 'Nhạc trưởng đảm nhận việc gì?',
      options: [
        'Dẫn dắt dàn nhạc giao hưởng và dàn hợp xướng, bảo đảm mọi nhạc cụ và bè hát hoà quyện hoàn hảo',
        'Sáng tác bản nhạc cho dàn nhạc trình diễn',
        'Chọn nhạc mục và sắp xếp chương trình',
        'Tuyển chọn nhạc công qua các buổi thử',
      ],
      answer: 0,
      dan: 'A conductor leads the symphony orchestra and the choir, ensuring that every instrument and vocal part is in perfect harmony.',
    },
    {
      q: 'Ba yếu tố nào phải khớp nhau để tạo nên giai điệu du dương?',
      options: [
        'Nhịp điệu, tiết tấu và cao độ',
        'Giai điệu, hoà âm và lời ca',
        'Âm sắc, cường độ và nhịp phách',
        'Tốc độ, sắc thái và kỹ thuật',
      ],
      answer: 0,
      dan: 'The rhythm, tempo, and pitch must align seamlessly to produce a melodious melody.',
    },
    {
      q: 'Bài kết lại rằng các kiệt tác nghệ thuật này làm được gì?',
      options: [
        'Không chỉ giải trí mà còn nâng tầm hiểu biết văn hoá của chúng ta',
        'Giữ gìn các loại hình biểu diễn truyền thống',
        'Tạo nguồn thu cho ngành công nghiệp biểu diễn',
        'Đưa nghệ sĩ tới với công chúng rộng rãi hơn',
      ],
      answer: 0,
      dan: 'These artistic masterpieces not only entertain but also elevate our cultural understanding, making every audition, rehearsal, and live performance a valuable contribution to society.',
    },
  ],

  'science-tech-advanced-ielts': [
    {
      q: 'Tin tặc thường khai thác gì, và hậu quả là gì?',
      options: [
        'Dùng mã độc khai thác lỗi hệ thống, dẫn tới rò rỉ dữ liệu thảm khốc',
        'Đánh cắp mật khẩu người dùng qua thư giả mạo',
        'Chiếm quyền điều khiển các thiết bị thông minh',
        'Làm tê liệt hạ tầng bằng tấn công từ chối dịch vụ',
      ],
      answer: 0,
      dan: 'Cybersecurity is crucial, as hackers frequently use malware to exploit system flaws, leading to a catastrophic data breach.',
    },
    {
      q: 'Trong lĩnh vực sinh học, các nhà khoa học nay có thể làm gì?',
      options: [
        'Can thiệp vào bộ gen người hoặc dùng tế bào gốc để chữa bệnh, dù việc đó thường làm dấy lên tình thế lưỡng nan về đạo đức',
        'Tạo ra vắc-xin mới trong vài tuần',
        'Chẩn đoán bệnh bằng trí tuệ nhân tạo',
        'Nuôi cấy mô nhân tạo thay cho cấy ghép',
      ],
      answer: 0,
      dan: 'Scientists can now manipulate the human genome or use stem cells to cure diseases, though such practices often spark a controversial ethical dilemma.',
    },
    {
      q: 'Sự lệ thuộc vào nhiên liệu hoá thạch phải chuyển dịch sang đâu?',
      options: [
        'Sang các nguồn tái tạo như mặt trời và gió, để dựng nên hạ tầng bền vững',
        'Sang năng lượng hạt nhân quy mô nhỏ',
        'Sang vật liệu tổng hợp mới ít phát thải',
        'Sang các thiết bị thông minh tiết kiệm điện',
      ],
      answer: 0,
      dan: 'As we synthesize new materials and deploy smart gadgets, our reliance on fossil fuels must shift towards renewable energy sources like solar and wind, allowing us to build a sustainable infrastructure.',
    },
    {
      q: 'Bài kết lại rằng điều gì sẽ là chất xúc tác cho sự tiến hoá tiếp theo của chúng ta?',
      options: [
        'Việc khai thác sự cộng hưởng chưa từng có giữa khoa học và đạo đức',
        'Tốc độ đổi mới công nghệ ngày càng nhanh',
        'Việc thay thế các phương pháp lỗi thời',
        'Sự hợp tác giữa các trung tâm nghiên cứu',
      ],
      answer: 0,
      dan: 'Ultimately, while disruptive technologies often render old methods obsolete, harnessing this unprecedented synergy between science and ethics will be the catalyst for our continued evolution.',
    },
  ],

  'health-medicine-advanced-ielts': [
    {
      q: 'Nhờ đâu hệ miễn dịch của chúng ta nay được trang bị tốt hơn để chống nhiễm trùng?',
      options: [
        'Nhờ tiêm chủng đại trà và dịch tễ học',
        'Nhờ dinh dưỡng và vệ sinh được cải thiện',
        'Nhờ kháng sinh thế hệ mới',
        'Nhờ chẩn đoán sớm và can thiệp kịp thời',
      ],
      answer: 0,
      dan: 'Today, through mass immunization and epidemiology, our immune system is better equipped with the necessary antibodies to fight infections.',
    },
    {
      q: 'Lối sống ít vận động cộng với dinh dưỡng kém dẫn tới điều gì?',
      options: [
        'Béo phì và các bệnh tim mạch tăng vọt, chẳng hạn tắc nghẽn động mạch',
        'Suy giảm nhận thức ở người cao tuổi',
        'Nguy cơ mắc bệnh truyền nhiễm cao hơn',
        'Tuổi thọ trung bình giảm rõ rệt',
      ],
      answer: 0,
      dan: 'A sedentary lifestyle, coupled with poor nutrition, has led to a surge in obesity and cardiovascular conditions, such as blocked arteries.',
    },
    {
      q: 'Dân số già kéo theo tỉ lệ mắc cao hơn của những gì?',
      options: [
        'Suy giảm nhận thức, kể cả sa sút trí tuệ, và các rối loạn thần kinh',
        'Bệnh tim mạch và tiểu đường',
        'Các bệnh mạn tính không lây khác',
        'Ung thư giai đoạn cuối',
      ],
      answer: 0,
      dan: 'Furthermore, an aging population means a higher incidence of cognitive decline, including dementia, and neurological disorders.',
    },
    {
      q: 'Bài coi chiến lược hiệu quả nhất cho sức khoẻ cộng đồng là gì?',
      options: [
        'Chuyển trọng tâm sang y học toàn diện và phòng ngừa — khuyến khích vệ sinh, điều kiện vệ sinh và rèn luyện thể chất',
        'Đầu tư mạnh vào phẫu thuật và cấy ghép',
        'Mở rộng bảo hiểm y tế cho toàn dân',
        'Đào tạo thêm bác sĩ và điều dưỡng',
      ],
      answer: 0,
      dan: 'Ultimately, shifting the focus towards holistic and preventive medicine—encouraging better hygiene, sanitation, and fitness—remains the most effective strategy to ensure public health and well-being.',
    },
  ],

  'art-literature-ielts': [
    {
      q: 'Người phụ trách triển lãm có thể tổ chức trưng bày những gì?',
      options: [
        'Cả trường phái siêu thực đương đại lẫn ấn tượng cổ điển',
        'Các tác phẩm điêu khắc bằng đá cẩm thạch',
        'Những bức tranh của các hoạ sĩ tiên phong',
        'Hiện vật cổ và tác phẩm hiện đại xen kẽ',
      ],
      answer: 0,
      dan: 'In a local gallery, a curator might organize an exhibition showcasing both contemporary surrealism and classic impressionism.',
    },
    {
      q: 'Nhà điêu khắc và hoạ sĩ tiên phong theo đuổi những điều khác nhau thế nào?',
      options: [
        'Nhà điêu khắc nhắm tới đối xứng hoàn hảo và hài hoà thẩm mỹ, còn hoạ sĩ tiên phong dùng kỹ thuật táo bạo để thách thức góc nhìn',
        'Nhà điêu khắc làm việc với chất liệu cứng, hoạ sĩ với màu sắc',
        'Nhà điêu khắc theo truyền thống, hoạ sĩ theo hiện đại',
        'Nhà điêu khắc chú trọng hình khối, hoạ sĩ chú trọng bố cục',
      ],
      answer: 0,
      dan: 'A sculptor might carve a masterpiece from marble, aiming for perfect symmetry and aesthetic harmony, while an avant-garde painter might use a bold technique and innovative composition to challenge our perspective.',
    },
    {
      q: 'Nhà văn dùng những thủ pháp nào để gợi ký ức mạnh mẽ và truyền cảm hứng?',
      options: [
        'Ẩn dụ, mỉa mai và biểu tượng dày đặc',
        'Đối thoại sắc sảo và độc thoại nội tâm',
        'Cốt truyện gay cấn và nhân vật phản diện',
        'Bối cảnh chi tiết và mô tả tỉ mỉ',
      ],
      answer: 0,
      dan: 'Using literary devices like metaphor, irony, and heavy symbolism, writers evoke powerful memories and inspire readers.',
    },
    {
      q: 'Bài kết lại rằng điều gì vượt qua được thử thách của thời gian?',
      options: [
        'Một tác phẩm nghệ thuật đích thực, bất chấp lời phê phán gay gắt hay nguy cơ bị đạo văn',
        'Những tác phẩm được công chúng yêu thích nhất',
        'Các trường phái nghệ thuật có ảnh hưởng lớn',
        'Những hiện vật được bảo tồn trong bảo tàng',
      ],
      answer: 0,
      dan: 'Despite harsh critiques from a critic or the threat of plagiarism, an authentic work of art endures the test of time.',
    },
  ],

  'psychology-mind-ielts': [
    {
      q: 'Cuộc tranh luận về việc hành vi con người do đâu mà có thường được gọi là gì?',
      options: [
        'Bẩm sinh hay nuôi dưỡng',
        'Ý thức hay vô thức',
        'Bản năng hay lý trí',
        'Cá nhân hay xã hội',
      ],
      answer: 0,
      dan: 'In the field of psychology, experts study how our behavior is shaped by both instinct and the environment, a debate often referred to as ‘nature vs nurture’.',
    },
    {
      q: 'Trong những trường hợp cực đoan, người bệnh có thể trải qua điều gì?',
      options: [
        'Tâm thần phân liệt, với hoang tưởng hoặc ảo giác làm sai lệch nhận thức thực tại',
        'Trầm cảm nặng kéo dài nhiều năm',
        'Ám ảnh sợ hãi với những vật thể thông thường',
        'Mất trí nhớ về các sự kiện gây sang chấn',
      ],
      answer: 0,
      dan: 'In more extreme cases, individuals may suffer from schizophrenia, experiencing a delusion or hallucination that alters their perception of reality.',
    },
    {
      q: 'Áp lực đồng trang lứa và mong muốn hoà nhập có thể gây ra điều gì?',
      options: [
        'Lấn át lý lẽ hợp lý của một người, dẫn tới hành vi bốc đồng hoặc lệch chuẩn',
        'Làm giảm lòng tự trọng và sự tự tin',
        'Khiến người ta che giấu cảm xúc thật',
        'Tạo ra mâu thuẫn giữa các nhóm xã hội',
      ],
      answer: 0,
      dan: 'The desire for conformity and the impact of peer pressure can override a person’s rational logic, leading to impulsive or deviant actions.',
    },
    {
      q: 'Bài kết lại bằng nhận định nào về tâm trí con người?',
      options: [
        'Tuy mong manh, tâm trí cũng có khả năng thích nghi phi thường',
        'Tâm trí luôn tìm cách tự bảo vệ trước tổn thương',
        'Tâm trí chịu ảnh hưởng của xã hội nhiều hơn di truyền',
        'Tâm trí cần được chăm sóc như sức khoẻ thể chất',
      ],
      answer: 0,
      dan: 'Through cognitive behavioral therapy, counseling, and mindfulness, patients can build resilience, overcome their insecurities, and achieve a healthier mental state, proving that while the mind can be fragile, it is also incredibly adaptable.',
    },
  ],

  'politics-government-ielts': [
    {
      q: 'Sau khi được bầu, các nghị sĩ làm gì, và ai có quyền ký hoặc phủ quyết?',
      options: [
        'Soạn luật và thông qua dự luật; tổng thống hoặc thủ tướng ký hoặc phủ quyết',
        'Giám sát chính phủ; toà án tối cao quyết định tính hợp hiến',
        'Phân bổ ngân sách; bộ trưởng tài chính phê duyệt',
        'Bổ nhiệm quan chức; chủ tịch quốc hội phê chuẩn',
      ],
      answer: 0,
      dan: 'Once elected, members of parliament or congress work to draft legislation and pass a bill into law, which the president or prime minister must either sign or veto.',
    },
    {
      q: 'Những vấn đề nào làm xói mòn niềm tin của công chúng?',
      options: [
        'Bộ máy quan liêu, tham nhũng và hối lộ',
        'Sự chia rẽ giữa các đảng phái',
        'Việc thi hành luật chậm trễ',
        'Ảnh hưởng của truyền thông lên dư luận',
      ],
      answer: 0,
      dan: 'Issues like bureaucracy, corruption, and bribery often undermine public trust, leading to demands for greater transparency and accountability.',
    },
    {
      q: 'Khi ngoại giao thất bại, một quốc gia có thể đối mặt với điều gì?',
      options: [
        'Các lệnh trừng phạt thương mại hoặc thậm chí chiến tranh, đe doạ chủ quyền của mình',
        'Sự cô lập trên trường quốc tế',
        'Việc bị loại khỏi các liên minh hiện có',
        'Áp lực từ các tổ chức quốc tế',
      ],
      answer: 0,
      dan: 'When diplomacy fails, a country might face trade sanctions or even war, threatening its sovereignty.',
    },
    {
      q: 'Chế độ độc tài hoặc toàn trị thường dẫn tới hệ quả gì?',
      options: [
        'Đàn áp chính trị, nổi dậy, hoặc một cuộc cách mạng toàn diện',
        'Sự trì trệ của nền kinh tế trong nước',
        'Việc bị cộng đồng quốc tế trừng phạt',
        'Làn sóng di cư ồ ạt ra nước ngoài',
      ],
      answer: 0,
      dan: 'In contrast to democratic societies, an authoritarian regime or dictatorship suppresses freedom, often resulting in political oppression, a rebellion, or a full-scale revolution.',
    },
  ],

  'law-justice-ielts': [
    {
      q: 'Luật dân sự thường xử lý những tranh chấp nào?',
      options: [
        'Vi phạm hợp đồng hoặc xâm phạm quyền sở hữu trí tuệ',
        'Trộm cắp và phá hoại tài sản',
        'Buôn lậu và biển thủ công quỹ',
        'Các hành vi gây rối trật tự công cộng',
      ],
      answer: 0,
      dan: 'In civil law, disputes often involve a breach of contract or intellectual property infringement.',
    },
    {
      q: 'Thay cho kiện tụng tốn kém, các bên có thể chọn cách nào?',
      options: [
        'Trọng tài hoặc hoà giải để đạt một thoả thuận',
        'Đàm phán trực tiếp không qua luật sư',
        'Yêu cầu toà xử theo thủ tục rút gọn',
        'Chuyển vụ việc sang cơ quan hành chính',
      ],
      answer: 0,
      dan: 'Instead of costly litigation, both parties may choose arbitration or mediation to reach a settlement.',
    },
    {
      q: 'Nhân chứng được cảnh báo điều gì khi khai trước toà?',
      options: [
        'Rằng nói dối là khai man',
        'Rằng lời khai sẽ được ghi âm',
        'Rằng họ có quyền im lặng',
        'Rằng họ có thể bị chất vấn chéo',
      ],
      answer: 0,
      dan: 'During the trial, the prosecution presents an indictment, calling witnesses to testify under oath, warning them that lying is perjury.',
    },
    {
      q: 'Hệ thống tư pháp hiện đại còn hướng tới điều gì ngoài trừng phạt?',
      options: [
        'Cải tạo phạm nhân, mong họ được tha có điều kiện và tái hoà nhập thành công dân tuân thủ pháp luật',
        'Giảm số vụ án tồn đọng tại toà',
        'Bồi thường thoả đáng cho nguyên đơn',
        'Ngăn tái phạm bằng giám sát điện tử',
      ],
      answer: 0,
      dan: 'However, a modern justice system also focuses on the rehabilitation of prisoners, hoping they can eventually be released on parole and reintegrate into society as law-abiding citizens.',
    },
  ],

  'history-civilizations-ielts': [
    {
      q: 'Tổ tiên loài người thời tiền sử sống ra sao?',
      options: [
        'Sống du mục, di chuyển theo bộ lạc như những người săn bắt hái lượm',
        'Sống định cư quanh các con sông lớn',
        'Sống trong hang động theo từng gia đình nhỏ',
        'Sống bằng nghề chăn nuôi gia súc',
      ],
      answer: 0,
      dan: 'In prehistoric times, our ancestors lived a nomadic lifestyle, moving in tribes as hunters and gatherers.',
    },
    {
      q: 'Châu Âu thời trung cổ được cai trị theo chế độ nào?',
      options: [
        'Chế độ phong kiến, nơi tầng lớp quý tộc nắm quyền trên dân thường',
        'Chế độ quân chủ tập quyền tuyệt đối',
        'Chế độ thần quyền do giáo hội đứng đầu',
        'Chế độ cộng hoà quý tộc kiểu La Mã',
      ],
      answer: 0,
      dan: 'Throughout the medieval era, Europe was governed by feudalism, where the aristocracy held power over the common people.',
    },
    {
      q: 'Thời kỳ nào tiếp sau thời của lâu đài và hiệp sĩ, và mang lại điều gì?',
      options: [
        'Phục Hưng và Khai Sáng, mang lại sự tái sinh của khoa học và lý trí',
        'Cách mạng công nghiệp, mang lại máy móc và đô thị',
        'Thời đại khám phá, mang lại các tuyến hàng hải mới',
        'Thời kỳ cải cách tôn giáo, mang lại tự do tín ngưỡng',
      ],
      answer: 0,
      dan: 'This period of castles and knights was followed by the Renaissance and the Enlightenment, which brought a rebirth of science and reason.',
    },
    {
      q: 'Cách mạng hoặc khởi nghĩa thường bùng nổ khi nào?',
      options: [
        'Khi những người bị áp bức đấu tranh để xoá bỏ chế độ nô lệ và đòi quyền của mình',
        'Khi các quân vương tham vọng xâm chiếm lẫn nhau',
        'Khi nạn đói và dịch bệnh lan rộng',
        'Khi tầng lớp quý tộc mất dần quyền lực',
      ],
      answer: 0,
      dan: 'A revolution or an uprising often erupted when the oppressed fought to abolish slavery and demand their rights.',
    },
  ],

  'geography-earth-ielts': [
    {
      q: 'Trái Đất được chia thành hai bán cầu bởi cái gì, và được lập bản đồ bằng gì?',
      options: [
        'Bởi đường xích đạo, và bằng các đường vĩ tuyến và kinh tuyến',
        'Bởi trục quay, và bằng các múi giờ',
        'Bởi các mảng kiến tạo, và bằng đường đứt gãy',
        'Bởi các đại dương, và bằng đường bờ biển',
      ],
      answer: 0,
      dan: 'From a geographical perspective, the globe is divided by the equator into the northern and southern hemispheres, mapped by lines of latitude and longitude.',
    },
    {
      q: 'Một dòng sông đi qua những chặng nào?',
      options: [
        'Bắt đầu từ nguồn, chảy qua thung lũng, rồi đổ ra biển ở một châu thổ hoặc cửa sông màu mỡ',
        'Bắt đầu từ hồ băng, chảy qua đồng bằng, rồi thấm vào lòng đất',
        'Bắt đầu từ mưa, tụ thành suối, rồi đổ vào hồ nội địa',
        'Bắt đầu từ đỉnh núi, tạo thác, rồi chảy vào hang ngầm',
      ],
      answer: 0,
      dan: 'Water shapes the land; a river begins at its source, flows through a valley, and empties into the sea at a fertile delta or estuary.',
    },
    {
      q: 'Khi các mảng kiến tạo dịch chuyển, điều gì có thể xảy ra?',
      options: [
        'Một trận động đất tàn khốc, hoặc kích hoạt sóng thần',
        'Một đợt phun trào magma và dung nham',
        'Sự xói mòn đá cứng thành trầm tích',
        'Sự hình thành các dãy núi mới trong nhiều triệu năm',
      ],
      answer: 0,
      dan: 'When these plates move, they can cause a seismic event like a devastating earthquake or trigger a tsunami.',
    },
    {
      q: 'Bài kết lại rằng điều gì là thiết yếu để bảo vệ hành tinh?',
      options: [
        'Bảo tồn môi trường sống tự nhiên và sử dụng bền vững tài nguyên khoáng sản',
        'Giảm phát thải từ nhiên liệu hoá thạch',
        'Dự báo sớm các hiện tượng thời tiết cực đoan',
        'Hạn chế xây dựng ở những vùng có đứt gãy',
      ],
      answer: 0,
      dan: 'Therefore, the conservation of our natural habitat and the sustainable use of mineral resources are essential to protect our planet.',
    },
  ],

  'art-design-ielts': [
    {
      q: 'Hoạ sĩ dùng bảng màu để làm gì?',
      options: [
        'Pha các sắc độ khác nhau, tạo tương phản mạnh gợi cảm xúc sâu',
        'Thử màu trước khi vẽ lên toan',
        'Giữ màu không bị khô trong lúc vẽ',
        'Đạt được tỉ lệ và đối xứng chuẩn xác',
      ],
      answer: 0,
      dan: 'An artist uses a palette to mix various hues and shades, creating a striking contrast that evokes deep emotions.',
    },
    {
      q: 'Nghệ thuật cổ điển và các trào lưu hiện đại khác nhau ở điểm nào?',
      options: [
        'Cổ điển chú trọng hiện thực, còn lập thể hay siêu thực đưa ra góc nhìn tiên phong và rất chủ quan',
        'Cổ điển dùng chất liệu tự nhiên, hiện đại dùng chất liệu tổng hợp',
        'Cổ điển vẽ chân dung, hiện đại vẽ phong cảnh',
        'Cổ điển phục vụ tôn giáo, hiện đại phục vụ công chúng',
      ],
      answer: 0,
      dan: 'While classical art focuses on realism, modern movements like cubism or surrealism present an avant-garde and highly subjective perspective.',
    },
    {
      q: 'Thiết kế thẩm mỹ vươn tới đời sống thường ngày qua những gì?',
      options: [
        'Từ kiến trúc hùng vĩ của một toà nhà cao tầng tới nghề thủ công tinh xảo với gốm sứ và vải vóc',
        'Từ đồ nội thất tới trang phục hằng ngày',
        'Từ bao bì sản phẩm tới biển hiệu đường phố',
        'Từ tranh treo tường tới đồ trang trí gia đình',
      ],
      answer: 0,
      dan: 'Beyond fine art, aesthetic design extends to everyday life, from the majestic architecture of a high-rise to the intricate craft of a local artisan working with ceramics or textiles.',
    },
    {
      q: 'Nghệ thuật cần gì để phát triển và truyền cảm hứng cho đời sau?',
      options: [
        'Sự trân trọng của công chúng và sự hỗ trợ của một nhà bảo trợ hoặc nhà tài trợ giàu có',
        'Các bảo tàng và phòng trưng bày quy mô lớn',
        'Nền giáo dục nghệ thuật từ bậc phổ thông',
        'Chính sách bảo hộ của nhà nước',
      ],
      answer: 0,
      dan: 'Whether it is a contemporary graphic illustration, a vibrant mural, or an immersive installation, art relies on the appreciation of the public and the support of a wealthy patron or sponsor to thrive and inspire future generations.',
    },
  ],

  'literature-poetry-ielts': [
    {
      q: 'Cốt truyện xây dựng căng thẳng cho tới đâu?',
      options: [
        'Tới một cao trào kịch tính và một kết thúc thoả đáng',
        'Tới lúc nhân vật chính đánh bại kẻ phản diện',
        'Tới khi chủ đề của tác phẩm được hé lộ',
        'Tới đoạn kết mở để người đọc tự suy ngẫm',
      ],
      answer: 0,
      dan: 'The setting of the story provides the context, while the plot builds tension through the character’s journey until it reaches a dramatic climax and a satisfying resolution.',
    },
    {
      q: 'Thơ thường được cấu trúc thế nào, và dùng gì để tạo hiệu ứng âm nhạc?',
      options: [
        'Chia thành khổ hoặc dòng thơ, dùng nhịp điệu và vần',
        'Chia thành chương, dùng hình ảnh và ẩn dụ',
        'Chia theo chủ đề, dùng điệp ngữ và đối',
        'Chia theo lời kể, dùng giọng điệu và ngắt nhịp',
      ],
      answer: 0,
      dan: 'In poetry, a poem is often structured into a stanza or a verse, utilizing rhythm and rhyme to create a musical effect.',
    },
    {
      q: 'Vì sao đôi khi một văn bản đòi hỏi phải diễn giải cẩn thận?',
      options: [
        'Vì tác giả dùng ngôn ngữ bóng bẩy, nghịch lý, hoặc ám chỉ tới một sự kiện lịch sử',
        'Vì bản thảo gốc đã bị biên tập nhiều lần',
        'Vì ngôn ngữ của tác phẩm đã cũ so với ngày nay',
        'Vì mỗi người đọc hiểu chủ đề một cách khác nhau',
      ],
      answer: 0,
      dan: 'Sometimes, a text requires careful interpretation, as authors use figurative language, a paradox, or an allusion to a historical event.',
    },
    {
      q: 'Trước khi tới tay công chúng, bản thảo phải qua khâu nào?',
      options: [
        'Biên tập kỹ lưỡng bởi nhà xuất bản',
        'Thẩm định của một nhà phê bình văn học',
        'Đăng thử trên tạp chí chuyên ngành',
        'Đọc duyệt bởi một hội đồng chuyên môn',
      ],
      answer: 0,
      dan: 'Before a masterpiece reaches the public, the initial manuscript goes through rigorous editing by a publisher.',
    },
  ],

  'travel-tourism-ielts': [
    {
      q: 'Lượng khách đổ về vào mùa cao điểm có thể biến điều gì thành điều gì?',
      options: [
        'Biến một thị trấn nên thơ thành cái bẫy du lịch đông nghịt',
        'Biến một điểm đến hoang sơ thành khu nghỉ dưỡng',
        'Biến một làng nghề thành trung tâm thương mại',
        'Biến một vùng nghèo thành nơi thịnh vượng',
      ],
      answer: 0,
      dan: 'However, the influx of visitors during peak season can turn a picturesque town into a crowded tourist trap.',
    },
    {
      q: 'Du lịch sinh thái bền vững tập trung vào điều gì?',
      options: [
        'Bảo tồn động vật hoang dã, bảo đảm du lịch tạo nguồn thu mà không tổn hại văn hoá bản địa',
        'Giới hạn số lượng khách tới mỗi điểm đến',
        'Xây dựng cơ sở lưu trú thân thiện môi trường',
        'Đào tạo người dân địa phương làm hướng dẫn viên',
      ],
      answer: 0,
      dan: 'This approach focuses on wildlife conservation, ensuring that tourism generates vital revenue without harming the indigenous culture.',
    },
    {
      q: 'Dù gặp rào cản ngôn ngữ hay sốc văn hoá, việc đi lại mang lại cơ hội gì?',
      options: [
        'Cơ hội độc đáo để hoà mình vào phong tục xứ người',
        'Cơ hội học một ngôn ngữ mới nhanh hơn',
        'Cơ hội kết bạn với người dân bản địa',
        'Cơ hội thoát khỏi nhịp sống thường ngày',
      ],
      answer: 0,
      dan: 'Although they might face a language barrier or experience culture shock, travel provides a unique opportunity to immerse oneself in foreign customs.',
    },
    {
      q: 'Bài kết lại rằng điều gì khiến du lịch vẫn là một trải nghiệm đáng giá?',
      options: [
        'Sự hiếu khách của phần lớn người dân bản địa, bất chấp rủi ro bị lừa chặt chém',
        'Sự đa dạng của các điểm đến trên thế giới',
        'Chi phí đi lại ngày càng phải chăng hơn',
        'Cơ hội mở mang tầm nhìn của mỗi người',
      ],
      answer: 0,
      dan: 'Despite the risks of being overcharged by a scam, the hospitable nature of most locals ensures that travel remains a magnificent and enriching pursuit.',
    },
  ],

  'food-agriculture-ielts': [
    {
      q: 'Ngày xưa nhiều người dựa vào hình thức canh tác nào?',
      options: [
        'Canh tác tự cung tự cấp, trồng ít cây và nuôi ít gia súc gia cầm chỉ để nuôi gia đình',
        'Canh tác luân canh trên đất thuê của địa chủ',
        'Canh tác tập thể theo mùa vụ trong làng',
        'Canh tác chuyên canh một loại cây để bán',
      ],
      answer: 0,
      dan: 'In the past, many people relied on subsistence farming, cultivating a small crop and keeping some livestock or poultry just to feed their families.',
    },
    {
      q: 'Canh tác độc canh thâm canh gây hậu quả gì?',
      options: [
        'Làm đất kiệt sức',
        'Làm giảm chất lượng nông sản',
        'Làm tăng chi phí phân bón',
        'Làm mất đa dạng giống cây trồng',
      ],
      answer: 0,
      dan: 'However, such intensive monoculture can exhaust the soil.',
    },
    {
      q: 'Nghịch lý nào về dinh dưỡng toàn cầu được nêu?',
      options: [
        'Béo phì tăng trên toàn cầu, song song với suy dinh dưỡng nặng và nạn đói ở các vùng nghèo hơn',
        'Sản lượng lương thực tăng nhưng giá vẫn leo thang',
        'Thực phẩm hữu cơ đắt hơn thực phẩm chế biến',
        'Người ăn chay tăng nhưng tiêu thụ thịt cũng tăng',
      ],
      answer: 0,
      dan: 'This shift in consumption has led to a global rise in obesity, paradoxically existing alongside severe malnutrition and famine in poorer regions.',
    },
    {
      q: 'Để giữ sức khoẻ, bài khuyên cân bằng chế độ ăn thế nào?',
      options: [
        'Ăn đủ dinh dưỡng giàu vitamin, khoáng chất và chất xơ, giảm chất béo bão hoà và tinh bột tinh chế',
        'Ăn nhiều rau sống và hạn chế thịt đỏ',
        'Chia nhỏ bữa ăn và kiểm soát khẩu phần',
        'Ưu tiên thực phẩm hữu cơ không hoá chất',
      ],
      answer: 0,
      dan: 'To maintain good health, we must balance our daily calories, consuming a nutritious diet rich in vitamins, minerals, and dietary fiber, and reducing our intake of saturated fat and refined carbohydrates.',
    },
  ],

  'business-finance-ielts': [
    {
      q: 'Doanh nghiệp có thể phải làm gì nếu thâm hụt nặng hoặc nợ vượt khả năng trả?',
      options: [
        'Phá sản và buộc phải thanh lý tài sản',
        'Sáp nhập với một đối thủ lớn hơn',
        'Phát hành thêm cổ phiếu để bù đắp',
        'Cắt giảm nhân sự và thu hẹp hoạt động',
      ],
      answer: 0,
      dan: 'If an enterprise faces a severe deficit or unmanageable debt due to high interest rates, it might go bankrupt and be forced to liquidate its assets.',
    },
    {
      q: 'Suy thoái hoặc giảm phát đột ngột gây ra điều gì?',
      options: [
        'Giá cổ phiếu lao dốc, dẫn tới thị trường trì trệ',
        'Lãi suất tăng và tín dụng bị siết chặt',
        'Đồng nội tệ mất giá so với ngoại tệ',
        'Doanh nghiệp phải cắt giảm cổ tức',
      ],
      answer: 0,
      dan: 'A sudden recession or period of deflation can cause share prices to plummet, leading to a stagnant market.',
    },
    {
      q: 'Tập đoàn đa quốc gia làm gì để sống sót?',
      options: [
        'Đàm phán sáp nhập hoặc thâu tóm chiến lược, mở rộng chuỗi cung ứng bằng cách thuê ngoài để giảm chi phí',
        'Chuyển hướng sang các thị trường ít cạnh tranh hơn',
        'Tăng giá bán để bù đắp chi phí gia tăng',
        'Xin trợ cấp và ưu đãi thuế từ chính phủ',
      ],
      answer: 0,
      dan: 'To survive, a multinational corporation might negotiate a strategic merger or an acquisition, expanding its global supply chain by outsourcing operations to reduce expenditure.',
    },
    {
      q: 'Chính phủ đóng vai trò gì trong nền kinh tế?',
      options: [
        'Dùng chính sách tài khoá và tiền tệ để ổn định tỉ giá, hoặc ưu đãi thuế và trợ cấp cho các ngành cụ thể',
        'Kiểm soát giá cả các mặt hàng thiết yếu',
        'Điều tiết hoạt động của thị trường chứng khoán',
        'Bảo hộ doanh nghiệp trong nước trước cạnh tranh',
      ],
      answer: 0,
      dan: 'Governments also play a crucial role by using fiscal and monetary policy to stabilize the currency exchange rate, or by offering a tax incentive or subsidy to support specific industries.',
    },
  ],

  'law-crime-ielts': [
    {
      q: 'Thám tử làm những gì trong quá trình điều tra?',
      options: [
        'Tìm manh mối, thẩm vấn nghi phạm, và cố tìm đồng phạm hoặc xác lập động cơ',
        'Khám nghiệm hiện trường và thu mẫu pháp y',
        'Lấy lời khai nhân chứng và dựng lại hiện trường',
        'Theo dõi nghi phạm và thu thập chứng cứ điện tử',
      ],
      answer: 0,
      dan: 'A detective will search for clues, interrogate any suspect, and try to find an accomplice or establish a motive.',
    },
    {
      q: 'Tại phiên xử, công tố viên và luật sư bào chữa làm gì?',
      options: [
        'Công tố viên chứng minh bị cáo có tội, luật sư bào chữa đưa bằng chứng ngoại phạm để lập luận thân chủ vô tội',
        'Công tố viên đề xuất mức án, luật sư xin giảm nhẹ',
        'Công tố viên trình chứng cứ, luật sư phản bác nhân chứng',
        'Cả hai cùng thẩm vấn nghi phạm trước bồi thẩm đoàn',
      ],
      answer: 0,
      dan: 'During the litigation, the prosecutor tries to prove the defendant is guilty, while the defense attorney presents an alibi to argue for their innocence.',
    },
    {
      q: 'Mức án mà thẩm phán tuyên có thể trải từ đâu tới đâu?',
      options: [
        'Từ khoản phạt nặng hoặc án treo, tới nhiều năm tù',
        'Từ lao động công ích tới án chung thân',
        'Từ cảnh cáo tới tước quyền công dân',
        'Từ bồi thường dân sự tới truy tố hình sự',
      ],
      answer: 0,
      dan: 'If the defendant is convicted, the judge hands down a sentence, which could range from a hefty fine or probation to years in prison.',
    },
    {
      q: 'Nhiều chuyên gia lập luận hệ thống tư pháp nên đầu tư vào gì?',
      options: [
        'Các chương trình cải tạo người phạm tội, giúp họ tái hoà nhập và ngăn tội phạm vị thành niên thành cả đời phạm pháp',
        'Công nghệ giám sát để phát hiện tội phạm sớm',
        'Tăng mức án để răn đe hiệu quả hơn',
        'Đào tạo lực lượng điều tra chuyên nghiệp hơn',
      ],
      answer: 0,
      dan: 'However, many experts argue that instead of purely focusing on harsh punishment as a deterrent, the justice system should also invest in programs to rehabilitate offenders, helping them reintegrate into society and preventing juvenile delinquency from turning into a lifetime of crime.',
    },
  ],

  'history-culture-ielts': [
    {
      q: 'Nhà khảo cổ có thể dành cả thập kỷ để làm gì?',
      options: [
        'Khai quật một khu định cư tiền sử hoặc tìm ra hiện vật cổ, mong lần được nguồn gốc một nền văn minh đã mất',
        'Phục dựng lại một công trình cổ đại',
        'Giải mã các văn bản viết bằng ngôn ngữ đã chết',
        'Lập bản đồ các di chỉ chưa được khám phá',
      ],
      answer: 0,
      dan: 'An archaeologist might spend a decade trying to excavate a prehistoric settlement or uncover an ancient artifact, hoping to trace the origin of a lost civilization.',
    },
    {
      q: 'Toàn cầu hoá vừa có mặt tốt vừa đe doạ điều gì?',
      options: [
        'Thúc đẩy hoà nhập và phá bỏ khuôn mẫu, nhưng đe doạ việc gìn giữ phong tục truyền thống và ngôn ngữ bản địa',
        'Mở rộng thương mại, nhưng làm tăng bất bình đẳng',
        'Kết nối con người, nhưng làm mờ ranh giới quốc gia',
        'Lan toả tri thức, nhưng làm mai một giáo dục truyền thống',
      ],
      answer: 0,
      dan: 'While it promotes integration and breaks down old stereotypes, prejudice, and segregation, it also threatens the preservation of traditional customs and indigenous languages.',
    },
    {
      q: 'Nỗi lo gì xuất hiện khi người nhập cư hoà nhập vào xã hội mới?',
      options: [
        'Rằng các chuẩn mực văn hoá sẽ bị đồng hoá, mất đi bản sắc và tính nguyên bản',
        'Rằng họ sẽ không được cộng đồng chấp nhận',
        'Rằng thế hệ sau sẽ quên tiếng mẹ đẻ',
        'Rằng xung đột văn hoá sẽ gia tăng',
      ],
      answer: 0,
      dan: 'As immigrants assimilate into new societies, there is a fear that cultural norms will homogenize, losing their unique identity and authenticity.',
    },
    {
      q: 'Vì thế điều gì trở nên thiết yếu?',
      options: [
        'Nuôi dưỡng sự khoan dung và tôn trọng các nghi lễ tôn giáo và phép tắc xã hội khác nhau',
        'Ghi chép lại toàn bộ phong tục của các dân tộc',
        'Hạn chế tốc độ của quá trình toàn cầu hoá',
        'Đưa giáo dục đa văn hoá vào nhà trường',
      ],
      answer: 0,
      dan: 'Therefore, it is crucial to cultivate tolerance and respect for different religious rituals and social etiquette.',
    },
  ],

  'transportation-traffic-ielts': [
    {
      q: 'Một vụ va chạm nhỏ ở nút giao đông đúc gây ra điều gì?',
      options: [
        'Ùn tắc lớn, xe kẹt hàng giờ trong khi xe cứu thương lao tới cứu người bị nạn',
        'Việc phải đóng tạm thời tuyến đường',
        'Thiệt hại lớn cho các phương tiện liên quan',
        'Việc cảnh sát phải điều tiết giao thông thủ công',
      ],
      answer: 0,
      dan: 'A minor collision or an accident at a busy intersection can cause massive delays, leaving vehicles stuck for hours while an ambulance rushes to treat any casualty.',
    },
    {
      q: 'Chính phủ đầu tư vào những gì để cải thiện hạ tầng?',
      options: [
        'Hệ thống giao thông công cộng như tàu điện ngầm, mạng xe điện và cầu vượt mới để tránh khu vực ùn tắc',
        'Mở rộng lòng đường và xây thêm bãi đỗ xe',
        'Hệ thống đèn tín hiệu điều khiển thông minh',
        'Các tuyến đường vành đai quanh thành phố',
      ],
      answer: 0,
      dan: 'To improve the infrastructure, governments are investing in public transit systems like the subway, tram networks, and new flyovers to bypass congested areas.',
    },
    {
      q: 'Những chiến lược nào được coi là hiệu quả để giảm ô nhiễm không khí?',
      options: [
        'Khuyến khích xe lai và xe điện, đi chung xe, hoặc đơn giản là đạp xe trên làn dành riêng',
        'Hạn chế xe cá nhân vào khu trung tâm',
        'Chuyển đổi toàn bộ xe buýt sang chạy điện',
        'Trồng cây xanh dọc các tuyến đường lớn',
      ],
      answer: 0,
      dan: 'Therefore, promoting the use of hybrid and electric vehicles (EVs), encouraging people to carpool, or simply pedaling a bicycle on designated lanes are effective strategies.',
    },
    {
      q: 'Người lái xe phải tuân thủ những gì để bảo đảm an toàn?',
      options: [
        'Tuân thủ tốc độ, không vượt ẩu, và bảo dưỡng xe định kỳ bởi thợ có tay nghề',
        'Thắt dây an toàn và không dùng điện thoại',
        'Giữ khoảng cách an toàn và bật đèn tín hiệu',
        'Kiểm tra phanh và lốp trước mỗi chuyến đi',
      ],
      answer: 0,
      dan: 'Drivers must obey the speed limit, not overtake dangerously, and ensure their vehicle undergoes regular maintenance by a qualified mechanic.',
    },
  ],

  'family-society-ielts': [
    {
      q: 'Thay đổi nhân khẩu học dẫn tới sự gia tăng của loại hình gia đình nào?',
      options: [
        'Gia đình hạt nhân và gia đình đơn thân',
        'Gia đình nhiều thế hệ sống chung',
        'Gia đình không có con cái',
        'Gia đình có người giúp việc thường trú',
      ],
      answer: 0,
      dan: 'Today, however, demographic changes have led to an increase in the nuclear family and the single-parent family.',
    },
    {
      q: 'Khoảng cách thế hệ đôi khi gây ra điều gì?',
      options: [
        'Xung đột giữa cha mẹ và con cái, đe doạ sự hoà thuận trong gia đình',
        'Việc con cái rời nhà sớm hơn',
        'Sự khác biệt trong cách nuôi dạy trẻ',
        'Việc người già bị bỏ lại một mình',
      ],
      answer: 0,
      dan: 'Unfortunately, a generation gap can sometimes lead to conflict between parents and children, threatening family harmony.',
    },
    {
      q: 'Dân số già gây sức ép lên điều gì?',
      options: [
        'Hệ thống phúc lợi, vì nhà nước phải lo lương hưu và chăm sóc người cao tuổi',
        'Hệ thống y tế và bệnh viện công',
        'Nguồn lao động của nền kinh tế',
        'Ngân sách dành cho giáo dục',
      ],
      answer: 0,
      dan: 'Furthermore, the aging population puts pressure on the welfare system, as the state must provide a pension and care for the elderly.',
    },
    {
      q: 'Để đạt được sự gắn kết xã hội thực sự, bài nêu cần làm gì?',
      options: [
        'Phá bỏ khuôn mẫu và định kiến, chống nghèo đói và bất bình đẳng, hoà nhập các nhóm bị gạt ra lề',
        'Tăng chi cho an sinh xã hội và trợ cấp',
        'Khuyến khích các hoạt động thiện nguyện cộng đồng',
        'Cải thiện điều kiện sống ở các khu đô thị nghèo',
      ],
      answer: 0,
      dan: 'To achieve true social cohesion, we must break down stereotypes and prejudice, combat poverty and inequality, and integrate marginalized groups, ensuring that every individual, regardless of their social class or status, has the opportunity for social mobility and a better life.',
    },
  ],

  'languages-communication-ielts': [
    {
      q: 'Nhà ngôn ngữ học nghiên cứu những gì?',
      options: [
        'Cách một ngôn ngữ tiến hoá, phân tích ngữ pháp, cú pháp và ngữ nghĩa để hiểu các sắc thái tinh tế của nghĩa',
        'Cách trẻ em tiếp thu tiếng mẹ đẻ',
        'Cách các ngôn ngữ vay mượn lẫn nhau',
        'Cách phương ngữ hình thành ở từng vùng',
      ],
      answer: 0,
      dan: 'A linguist studies how a language evolves, analyzing its grammar, syntax, and semantics to understand the subtle nuances of meaning.',
    },
    {
      q: 'Ngoài lời nói, những tín hiệu nào cũng quan trọng không kém?',
      options: [
        'Giao tiếp bằng mắt, cử chỉ tay và nét mặt',
        'Ngữ điệu và tốc độ nói',
        'Khoảng cách đứng và tư thế cơ thể',
        'Cách chọn từ và mức độ trang trọng',
      ],
      answer: 0,
      dan: 'Non-verbal signals, such as eye contact, a hand gesture, or a facial expression, are just as important to convey the right message.',
    },
    {
      q: 'Người nói thuyết phục và người nói mơ hồ khác nhau ở kết quả nào?',
      options: [
        'Người thuyết phục và hùng biện có thể thuyết phục khán giả, còn phát biểu mơ hồ hay nước đôi có thể dẫn tới hiểu lầm',
        'Người thuyết phục được lắng nghe lâu hơn',
        'Người thuyết phục truyền được cảm xúc, người mơ hồ chỉ truyền thông tin',
        'Người thuyết phục dùng ít từ hơn để nói cùng một ý',
      ],
      answer: 0,
      dan: 'A persuasive and eloquent speaker can convince an audience, while a vague or ambiguous statement might lead to a misunderstanding.',
    },
    {
      q: 'Khi xảy ra mâu thuẫn, bài khuyên làm gì?',
      options: [
        'Đừng để nó thành cuộc cãi vã giận dữ, mà hãy bàn bạc bình tĩnh',
        'Tạm dừng cuộc trao đổi để cả hai nguôi giận',
        'Nhờ một bên thứ ba đứng ra hoà giải',
        'Ghi lại các điểm bất đồng để bàn sau',
      ],
      answer: 0,
      dan: 'If a conflict arises, do not let it turn into an angry argument; instead, discuss the issue calmly.',
    },
  ],

  'philosophy-ethics-ielts': [
    {
      q: 'Nhà triết học xem xét những câu hỏi nền tảng nào?',
      options: [
        'Về sự tồn tại, thực tại và bản chất của tri thức qua nhận thức luận',
        'Về đạo đức, công lý và trách nhiệm cá nhân',
        'Về ý nghĩa cuộc đời và cái chết',
        'Về mối quan hệ giữa cá nhân và xã hội',
      ],
      answer: 0,
      dan: 'A philosopher examines fundamental questions about existence, reality, and the nature of knowledge through epistemology.',
    },
    {
      q: 'Câu hỏi trung tâm khi phán xét một hành động là gì?',
      options: [
        'Nên xét theo hệ quả như thuyết vị lợi gợi ý, hay theo nguyên tắc và đức hạnh nền tảng của nó',
        'Nên xét theo động cơ hay theo kết quả thực tế',
        'Nên xét theo chuẩn mực xã hội hay theo lương tâm',
        'Nên xét theo luật pháp hay theo đạo đức',
      ],
      answer: 0,
      dan: 'Should an action be judged by its consequence, as suggested by utilitarianism, or by its underlying principle and virtue?',
    },
    {
      q: 'Thuyết tất định và ý chí tự do khác nhau thế nào?',
      options: [
        'Thuyết tất định cho rằng số phận đã an bài, còn ý chí tự do khẳng định mỗi người chịu trách nhiệm về lựa chọn của mình',
        'Thuyết tất định dựa vào khoa học, ý chí tự do dựa vào tôn giáo',
        'Thuyết tất định phủ nhận đạo đức, ý chí tự do đề cao đạo đức',
        'Thuyết tất định nói về quá khứ, ý chí tự do nói về tương lai',
      ],
      answer: 0,
      dan: 'While some thinkers embrace determinism, believing our fates are sealed, many defend the concept of free will, asserting that individuals are responsible for their own choices.',
    },
    {
      q: 'Suy tư triết học và đạo đức có vai trò gì?',
      options: [
        'Thách thức những giáo điều và niềm tin phi lý có thể dẫn tới một xã hội vô đạo đức',
        'Giúp con người tìm được hạnh phúc cá nhân',
        'Đặt nền cho hệ thống pháp luật của xã hội',
        'Hoà giải mâu thuẫn giữa các hệ giá trị khác nhau',
      ],
      answer: 0,
      dan: 'It challenges the dogma and irrational beliefs that can lead to an immoral society, encouraging us to justify our actions and continually search for deeper meaning.',
    },
  ],

  'psychology-mind-ielts-p2': [
    {
      q: 'Nhà tâm lý học chuyên nghiệp phân tích những gì?',
      options: [
        'Không chỉ suy nghĩ có ý thức và năng lực nhận thức, mà cả những ham muốn trong tiềm thức',
        'Chủ yếu là các rối loạn tâm thần và cách điều trị',
        'Hành vi con người trong các tình huống xã hội',
        'Ảnh hưởng của di truyền lên tính cách',
      ],
      answer: 0,
      dan: 'A professional psychologist analyzes not only our conscious thoughts and cognitive abilities but also our subconscious desires.',
    },
    {
      q: 'Con người phản ứng khác nhau thế nào trước sang chấn nặng?',
      options: [
        'Một số có sức bền để hồi phục, số khác vẫn dễ tổn thương trước căng thẳng, lo âu hoặc trầm cảm sâu',
        'Một số quên đi nhanh chóng, số khác nhớ mãi',
        'Một số tìm tới trị liệu, số khác tự chịu đựng',
        'Một số trở nên mạnh mẽ hơn, số khác thu mình lại',
      ],
      answer: 0,
      dan: 'While some individuals possess the resilience to recover from severe trauma, others remain vulnerable to stress, anxiety, or deep depression.',
    },
    {
      q: 'Trong tham vấn hoặc trị liệu, nhà trị liệu giúp bệnh nhân hiểu điều gì?',
      options: [
        'Nhân cách và khí chất riêng của họ — hướng ngoại cởi mở hay hướng nội trầm lặng',
        'Nguồn gốc của những sang chấn trong quá khứ',
        'Cách kiểm soát cảm xúc trong tình huống căng thẳng',
        'Mối liên hệ giữa suy nghĩ và hành vi',
      ],
      answer: 0,
      dan: 'In counseling or therapy, a therapist helps patients understand their unique personality and temperament—whether they are an outgoing extrovert or a quiet introvert.',
    },
    {
      q: 'Bài kết lại rằng những bước thiết yếu để giữ sức khoẻ tinh thần là gì?',
      options: [
        'Nuôi dưỡng sự đồng cảm, giữ thái độ tích cực và tìm được động lực bên trong',
        'Trị liệu đều đặn và dùng thuốc theo chỉ định',
        'Duy trì các mối quan hệ xã hội lành mạnh',
        'Tập thể dục và ngủ đủ giấc mỗi ngày',
      ],
      answer: 0,
      dan: 'Ultimately, fostering empathy, maintaining a positive attitude, and finding inner motivation are essential steps in protecting our mental well-being and achieving emotional balance.',
    },
  ],

  'literature-writing-ielts': [
    {
      q: 'Vẻ đẹp của một kiệt tác văn chương nằm ở đâu?',
      options: [
        'Ở khả năng kết nối với người đọc',
        'Ở sự tinh tế của ngôn từ và hình ảnh',
        'Ở chiều sâu của các chủ đề được khai thác',
        'Ở tính độc đáo của cốt truyện',
      ],
      answer: 0,
      dan: 'Whether it is poetry full of deep metaphor and simile, or elegant prose, the beauty of a literary masterpiece lies in its ability to connect with readers.',
    },
    {
      q: 'Trong thể loại phi hư cấu, tiểu sử hoặc hồi ký mang lại điều gì?',
      options: [
        'Một tường thuật có thật về lịch sử',
        'Góc nhìn chủ quan của người trong cuộc',
        'Tư liệu cho các nhà nghiên cứu',
        'Nguồn cảm hứng cho người đọc trẻ',
      ],
      answer: 0,
      dan: 'In the realm of non-fiction, a biography or a personal memoir provides a factual account of history.',
    },
    {
      q: 'Biên tập viên làm gì với bản thảo?',
      options: [
        'Biên tập và soát lỗi để văn bản mạch lạc, rõ ràng, súc tích, loại bỏ mọi chỗ dài dòng',
        'Đề xuất thay đổi cốt truyện cho hấp dẫn hơn',
        'Kiểm tra tính chính xác của các dữ kiện',
        'Quyết định tác phẩm có được xuất bản hay không',
      ],
      answer: 0,
      dan: 'This manuscript is then sent to an editor who will edit and proofread the text to ensure it is coherent, articulate, and concise, removing any verbose language.',
    },
    {
      q: 'Người viết học thuật phải cẩn thận điều gì?',
      options: [
        'Tránh đạo văn bằng cách trích dẫn đúng và có thư mục tham khảo chi tiết',
        'Trình bày lập luận theo bố cục chuẩn',
        'Dùng ngôn ngữ khách quan, tránh cảm tính',
        'Kiểm chứng mọi số liệu trước khi công bố',
      ],
      answer: 0,
      dan: 'Academic writers must also be careful to avoid plagiarism by providing a proper citation and a detailed bibliography.',
    },
  ],

  'art-design-ielts-p2': [
    {
      q: 'Người sáng tác đương đại thường thích phong cách nào, và dùng gì?',
      options: [
        'Phong cách trừu tượng hoặc tiên phong, dùng sự bất đối xứng và hoạ tiết độc đáo để thách thức thẩm mỹ truyền thống',
        'Phong cách tối giản, dùng đường nét và mảng màu lớn',
        'Phong cách hiện thực, dùng chi tiết tỉ mỉ',
        'Phong cách kỹ thuật số, dùng phần mềm và công nghệ mới',
      ],
      answer: 0,
      dan: 'On the other hand, contemporary creators often prefer an abstract or avant-garde style, using asymmetry and unique patterns to challenge traditional aesthetics.',
    },
    {
      q: 'Ai là người tổ chức triển lãm cho công chúng thưởng lãm?',
      options: [
        'Người phụ trách triển lãm',
        'Giám đốc bảo tàng',
        'Chính các nghệ sĩ tham gia',
        'Nhà phê bình nghệ thuật',
      ],
      answer: 0,
      dan: 'In a museum or gallery, an exhibition carefully organized by a curator allows the public to admire these works.',
    },
    {
      q: 'Một thiết kế hiện đại có thể chơi với những yếu tố nào để đạt sự hài hoà trong bố cục?',
      options: [
        'Sự tương phản và tính đối xứng',
        'Màu sắc và ánh sáng',
        'Chất liệu và kết cấu bề mặt',
        'Tỉ lệ và khoảng trống',
      ],
      answer: 0,
      dan: 'A beautiful sculpture made of marble shows incredible craftsmanship, while a modern design might play with contrast and symmetry to achieve perfect harmony in its composition.',
    },
    {
      q: 'Bài kết lại rằng điều gì không thể bị phủ nhận, kể cả khi bị phê bình gay gắt?',
      options: [
        'Tính nguyên bản của một kiệt tác đích thực',
        'Giá trị vật chất của tác phẩm nghệ thuật',
        'Sức ảnh hưởng của một trào lưu nghệ thuật',
        'Kỹ thuật điêu luyện của người nghệ sĩ',
      ],
      answer: 0,
      dan: 'Even when an art critic offers a harsh critique, the originality of an authentic masterpiece can never be denied.',
    },
  ],

  'society-demographics-ielts': [
    {
      q: 'Tỉ suất sinh giảm cộng với tuổi thọ tăng dẫn tới điều gì?',
      options: [
        'Dân số già, gây sức ép lên hệ thống lương hưu và phúc lợi công',
        'Thiếu hụt lao động trong các ngành sản xuất',
        'Quy mô gia đình ngày càng nhỏ lại',
        'Chi phí y tế tăng nhanh hơn thu nhập',
      ],
      answer: 0,
      dan: 'In many nations, a declining fertility rate combined with rising life expectancy has led to an aging population, putting pressure on pension systems and public welfare.',
    },
    {
      q: 'Đô thị hoá nhanh và di cư từ nông thôn ra thành phố thường dẫn tới gì?',
      options: [
        'Quá tải và sự mọc lên của các khu ổ chuột nghèo ở vùng ven',
        'Sự thiếu hụt lao động ở nông thôn',
        'Giá bất động sản đô thị tăng vọt',
        'Áp lực lên hệ thống giao thông công cộng',
      ],
      answer: 0,
      dan: 'Furthermore, rapid urbanization and migration from rural areas to the city often result in overcrowding and the growth of a poor slum in the suburb.',
    },
    {
      q: 'Xã hội đa văn hoá phải đối phó với thách thức nào?',
      options: [
        'Thách thức hoà nhập, phải xoá bỏ định kiến, phân biệt đối xử và sự kỳ thị đẩy nhóm thiểu số ra lề',
        'Thách thức giữ gìn bản sắc của từng nhóm dân cư',
        'Thách thức về rào cản ngôn ngữ trong giao tiếp',
        'Thách thức phân bổ nguồn lực công bằng',
      ],
      answer: 0,
      dan: 'A multicultural society must also deal with the challenges of integration, striving to eliminate prejudice, discrimination, and the stigma that marginalize a minority.',
    },
    {
      q: 'Bài kết lại rằng chỉ bằng cách nào một quốc gia mới tạo được sự dịch chuyển cho mọi người?',
      options: [
        'Phá bỏ các khuôn mẫu tiêu cực và khuyến khích bình đẳng thực chất',
        'Đầu tư mạnh vào giáo dục và đào tạo nghề',
        'Xây dựng hệ thống an sinh xã hội toàn diện',
        'Thu hẹp khoảng cách giàu nghèo bằng chính sách thuế',
      ],
      answer: 0,
      dan: 'Only by breaking negative stereotypes and encouraging true equality can a nation provide the mobility needed for everyone to improve their status.',
    },
  ],

  'law-crime-ielts-p3': [
    {
      q: 'Cảnh sát phải làm những gì khi có vụ việc xảy ra?',
      options: [
        'Điều tra vụ việc, thu thập chứng cứ và cuối cùng bắt giữ nghi phạm',
        'Phong toả hiện trường và lấy lời khai nhân chứng',
        'Chuyển hồ sơ cho viện kiểm sát xem xét',
        'Xác định động cơ và truy tìm đồng phạm',
      ],
      answer: 0,
      dan: 'The police must investigate the incident, gather proof, and eventually arrest the suspect.',
    },
    {
      q: 'Ai là người quyết định bị cáo có tội hay vô tội?',
      options: [
        'Thẩm phán và bồi thẩm đoàn',
        'Công tố viên sau khi trình chứng cứ',
        'Bồi thẩm đoàn, dựa trên lời khai nhân chứng',
        'Thẩm phán, dựa trên đề nghị của luật sư',
      ],
      answer: 0,
      dan: 'Ultimately, the judge and jury determine if the person is guilty or innocent.',
    },
    {
      q: 'Hình phạt có thể trải từ đâu tới đâu?',
      options: [
        'Từ khoản phạt nặng tới án tù dài hạn',
        'Từ cảnh cáo tới án chung thân',
        'Từ lao động công ích tới tử hình',
        'Từ bồi thường tới quản chế tại nhà',
      ],
      answer: 0,
      dan: 'If convicted, the offender faces a penalty, which could range from a heavy fine to long-term imprisonment.',
    },
    {
      q: 'Bằng cách cân bằng thực thi pháp luật nghiêm với mong muốn giúp người phạm tội, chúng ta hướng tới điều gì?',
      options: [
        'Giữ trật tự, chống tham nhũng và đạt được công lý thật sự',
        'Giảm số vụ phạm tội trong xã hội',
        'Tiết kiệm chi phí vận hành hệ thống nhà tù',
        'Tăng niềm tin của người dân vào toà án',
      ],
      answer: 0,
      dan: 'By balancing strict law enforcement with a desire to help offenders rejoin society, we strive to maintain order, fight corruption, and achieve true justice.',
    },
  ],

  'business-economy-ielts-p2': [
    {
      q: 'Nhà đầu tư mua cổ phần trên thị trường chứng khoán với hy vọng gì?',
      options: [
        'Nhận được cổ tức',
        'Bán lại với giá cao hơn',
        'Có quyền biểu quyết trong công ty',
        'Tham gia vào ban quản trị',
      ],
      answer: 0,
      dan: 'A successful entrepreneur uses their capital to start a business, while an investor buys a share in the stock market, hoping to receive a dividend.',
    },
    {
      q: 'Khi chi tiêu vượt doanh thu, công ty có thể rơi vào tình cảnh nào?',
      options: [
        'Thua lỗ hoặc thậm chí phá sản, chìm trong nợ và chật vật trả khoản vay ngân hàng',
        'Phải bán bớt tài sản để duy trì hoạt động',
        'Buộc phải sáp nhập với đối thủ',
        'Mất niềm tin của các cổ đông',
      ],
      answer: 0,
      dan: 'When expenditure exceeds revenue, a company may suffer a financial loss or even face bankruptcy, leaving it buried in debt and struggling to pay a bank loan.',
    },
    {
      q: 'Chiến lược sống sót trước cạnh tranh khốc liệt có thể gồm những gì?',
      options: [
        'Sáp nhập để gộp tài sản, hoặc thâu tóm để loại bỏ đối thủ và lập thế độc quyền',
        'Cắt giảm chi phí và tinh gọn bộ máy',
        'Đa dạng hoá sản phẩm và mở rộng thị trường',
        'Tăng đầu tư vào nghiên cứu và phát triển',
      ],
      answer: 0,
      dan: 'This might involve a merger to combine assets, or an acquisition to eliminate a rival and establish a monopoly.',
    },
    {
      q: 'Trợ cấp của chính phủ có thể mang lại tác dụng gì?',
      options: [
        'Ngăn suy thoái kinh tế và kích thích một đợt bùng nổ',
        'Giữ ổn định giá cả hàng hoá thiết yếu',
        'Hỗ trợ doanh nghiệp nhỏ vượt qua khó khăn',
        'Giảm tỉ lệ thất nghiệp trong ngắn hạn',
      ],
      answer: 0,
      dan: 'For instance, offering a subsidy can prevent an economic recession and stimulate a sudden boom.',
    },
  ],

  'globalization-trade-ielts': [
    {
      q: 'Tập đoàn đa quốc gia xây dựng chuỗi cung ứng toàn cầu dựa vào điều gì?',
      options: [
        'Thuê ngoài nhân công tại các nhà máy ở nước ngoài',
        'Đầu tư trực tiếp vào thị trường mới nổi',
        'Mua lại các nhà sản xuất địa phương',
        'Ký hợp đồng dài hạn với nhà cung cấp',
      ],
      answer: 0,
      dan: 'A multinational corporation can establish a massive global supply chain, relying on the outsourcing of labor to an offshore factory.',
    },
    {
      q: 'Người ủng hộ tự do thương mại lập luận thế nào?',
      options: [
        'Rằng nó gỡ bỏ mọi rào cản hay thuế quan, mang lại của cải, thịnh vượng và dòng ngoại tệ đổ vào',
        'Rằng nó tạo việc làm cho các nước đang phát triển',
        'Rằng nó hạ giá hàng hoá cho người tiêu dùng',
        'Rằng nó thúc đẩy chuyển giao công nghệ',
      ],
      answer: 0,
      dan: 'Proponents argue that free trade removes any barrier or tariff, bringing wealth, prosperity, and an influx of foreign currency.',
    },
    {
      q: 'Phía phản đối cảnh báo về những nguy cơ nào?',
      options: [
        'Bóc lột công nhân trong các xưởng gia công, và nguy cơ đế quốc văn hoá xoá đi các truyền thống bản địa',
        'Sự lệ thuộc kinh tế vào các cường quốc',
        'Việc mất chủ quyền trong hoạch định chính sách',
        'Ô nhiễm môi trường do vận tải toàn cầu',
      ],
      answer: 0,
      dan: 'On the other hand, critics warn of the exploitation of workers in a sweatshop and the danger of cultural imperialism, where a homogeneous global culture replaces diverse local traditions.',
    },
    {
      q: 'Khi ngành sản xuất trong nước bị cạnh tranh, chính phủ có thể làm gì?',
      options: [
        'Áp hạn ngạch nghiêm ngặt, trợ giá cho nông dân trong nước, hoặc ra lệnh cấm vận hay trừng phạt nước đối thủ',
        'Đàm phán lại các hiệp định thương mại đã ký',
        'Hỗ trợ doanh nghiệp nâng cao năng lực cạnh tranh',
        'Kêu gọi người dân ưu tiên dùng hàng nội địa',
      ],
      answer: 0,
      dan: 'They may impose a strict quota, offer a subsidy to local farmers, or even issue an embargo or a sanction against a rival nation.',
    },
  ],

  'history-heritage-ielts': [
    {
      q: 'Trong khảo cổ học, chuyên gia khai quật phế tích để tìm gì?',
      options: [
        'Một hiện vật cổ hoặc một thánh tích',
        'Dấu vết của các nền văn minh đã mất',
        'Bằng chứng về đời sống thường ngày thời cổ',
        'Niên đại chính xác của công trình',
      ],
      answer: 0,
      dan: 'In the field of archaeology, experts excavate a ruin to find an ancient artifact or a holy relic.',
    },
    {
      q: 'Bảo tàng sắp xếp bộ sưu tập cổ vật theo cách nào?',
      options: [
        'Theo trình tự thời gian, giúp ta hiểu một thời đại cách đây hàng thế kỷ hoặc cả thiên niên kỷ',
        'Theo từng nền văn minh riêng biệt',
        'Theo chất liệu và kỹ thuật chế tác',
        'Theo mức độ quý hiếm của hiện vật',
      ],
      answer: 0,
      dan: 'A museum often hosts an exhibition to display a collection of antiquities, arranged in chronological order, allowing us to understand an epoch from centuries or even a millennium ago.',
    },
    {
      q: 'Qua việc phục dựng cẩn thận, chúng ta làm được gì?',
      options: [
        'Tưởng niệm cuộc đấu tranh của cộng đồng bản địa và giữ cho truyền khẩu hay thần thoại không mất đi',
        'Khôi phục nguyên trạng các công trình cổ',
        'Thu hút du khách tới các di tích lịch sử',
        'Xác định lại niên đại của các di sản',
      ],
      answer: 0,
      dan: 'Through careful restoration, we can commemorate the struggles of an indigenous population and ensure that an oral tradition or mythology is not lost.',
    },
    {
      q: 'Bài kết lại rằng việc gìn giữ dấu tích lịch sử mang lại điều gì?',
      options: [
        'Kết nối chúng ta sâu sắc với quá khứ',
        'Giữ cho bản sắc dân tộc không bị mai một',
        'Cung cấp tư liệu cho các nhà nghiên cứu',
        'Tạo nguồn cảm hứng cho nghệ thuật đương đại',
      ],
      answer: 0,
      dan: 'Whether preserving a document in an archive or saving a castle from decay, safeguarding historical remnants connects us deeply to the past.',
    },
  ],

  'architecture-urban-ielts-p2': [
    {
      q: 'Khi vẽ bản thiết kế, kiến trúc sư phải cân nhắc những gì?',
      options: [
        'Kích thước, bố cục nội thất và lựa chọn vật liệu xây dựng',
        'Chi phí xây dựng và thời gian thi công',
        'Quy định về phân vùng và chiều cao tối đa',
        'Tác động của công trình tới cảnh quan xung quanh',
      ],
      answer: 0,
      dan: 'When an architect draws a blueprint for a new structure, they must consider the dimensions, the layout of the interior, and the choice of building material.',
    },
    {
      q: 'Một toà nhà chọc trời bằng kính cần gì để dựng lên được?',
      options: [
        'Móng bê tông vững chắc và khung thép khoẻ',
        'Hệ thống chống động đất và thoát hiểm',
        'Vật liệu cách nhiệt và kính chịu lực',
        'Giấy phép xây dựng và thẩm định an toàn',
      ],
      answer: 0,
      dan: 'While a modern high-rise or a glass skyscraper adds to a city’s iconic skyline, it requires a solid concrete foundation and a strong steel frame to construct.',
    },
    {
      q: 'Ngược với việc phá dỡ, nhà quy hoạch có thể chọn cách nào?',
      options: [
        'Cải tạo một công trình lịch sử để giữ lại mặt tiền cổ điển của nó',
        'Giữ nguyên hiện trạng và cấm xây mới quanh đó',
        'Di dời công trình sang một khu bảo tồn',
        'Chuyển đổi công năng thành không gian công cộng',
      ],
      answer: 0,
      dan: 'Conversely, they may choose to renovate a historic building to preserve its classic facade.',
    },
    {
      q: 'Mục tiêu của kiến trúc bền vững là gì?',
      options: [
        'Không chỉ dựng nên kiệt tác mà còn hoà cảnh quan bên ngoài với môi trường, để hạ tầng phục vụ cả khu thương mại sầm uất lẫn khu dân cư yên tĩnh',
        'Giảm tối đa mức tiêu thụ năng lượng của công trình',
        'Dùng vật liệu tái chế và thân thiện môi trường',
        'Tăng mật độ không gian xanh trong đô thị',
      ],
      answer: 0,
      dan: 'The goal of sustainable architecture is not only to build a masterpiece but also to integrate the exterior landscape with the environment, ensuring the infrastructure supports both a busy downtown commercial district and a peaceful industrial or residential area.',
    },
  ],

  'science-innovation-ielts': [
    {
      q: 'Nhà khoa học hay nhà phát minh xuất sắc làm gì với hệ hình đã được chấp nhận?',
      options: [
        'Thách thức nó để kiểm chứng một giả thuyết mới',
        'Dùng nó làm nền cho nghiên cứu tiếp theo',
        'Đối chiếu nó với dữ liệu thực nghiệm mới',
        'Phổ biến nó rộng rãi trong giới chuyên môn',
      ],
      answer: 0,
      dan: 'Throughout history, a brilliant scientist or inventor has challenged the accepted paradigm to test a new hypothesis.',
    },
    {
      q: 'Trí tuệ nhân tạo và học máy đang mang tự động hoá tới đâu?',
      options: [
        'Tới mọi ngành, thay hệ thống lỗi thời bằng hạ tầng hiện đại tối tân',
        'Tới các ngành sản xuất và chế tạo là chính',
        'Tới các công việc mang tính lặp lại',
        'Tới lĩnh vực dịch vụ và chăm sóc khách hàng',
      ],
      answer: 0,
      dan: 'The rise of artificial intelligence and machine learning is bringing automation to every industry, replacing an obsolete or outdated system with a cutting-edge, state-of-the-art infrastructure.',
    },
    {
      q: 'Bài nêu ví dụ nào về vấn đề đạo đức gây tranh cãi?',
      options: [
        'Khả năng nhân bản hoặc biến đổi gen một sinh vật',
        'Việc dùng trí tuệ nhân tạo thay thế lao động người',
        'Việc theo dõi sinh trắc học và giám sát dữ liệu',
        'Quyền sở hữu bằng sáng chế đối với thuật toán',
      ],
      answer: 0,
      dan: 'For example, the ability to clone or genetically modify an organism raises deep concerns.',
    },
    {
      q: 'Mục tiêu cuối cùng mà bài nêu là gì?',
      options: [
        'Khai thác sức mạnh của tiến bộ khoa học và đưa nó vào xã hội sao cho mọi phát minh có lợi cho nhân loại chứ không gây hại',
        'Đẩy nhanh tốc độ đổi mới trong mọi lĩnh vực',
        'Bảo vệ quyền sở hữu trí tuệ của nhà phát minh',
        'Xây dựng khung pháp lý cho công nghệ mới',
      ],
      answer: 0,
      dan: 'Ultimately, our goal is to harness the power of these scientific advances and integrate them into society, ensuring that every new invention benefits humanity rather than causing harm.',
    },
  ],

  'space-exploration-ielts-p3': [
    {
      q: 'Nhà thiên văn quan sát được những gì qua kính thiên văn ở đài quan sát?',
      options: [
        'Một thiên hà xa xôi, một sao chổi rực sáng, hoặc một tiểu hành tinh quay quanh một ngôi sao',
        'Bề mặt các hành tinh trong hệ Mặt Trời',
        'Chuyển động của các vệ tinh nhân tạo',
        'Sự hình thành của các ngôi sao mới',
      ],
      answer: 0,
      dan: 'Through the lens of a powerful telescope at an observatory, an astronomer can observe a distant galaxy, a glowing comet, or an asteroid orbiting a star.',
    },
    {
      q: 'Chúng ta gửi xe tự hành và tàu thăm dò đi làm gì?',
      options: [
        'Khảo sát bề mặt các hành tinh, mong tìm ra sự sống ngoài Trái Đất hoặc dấu vết của một thế giới khác',
        'Thu thập mẫu vật mang về Trái Đất',
        'Thử nghiệm công nghệ cho các chuyến bay có người lái',
        'Lập bản đồ chi tiết của hệ Mặt Trời',
      ],
      answer: 0,
      dan: 'We have sent a robotic rover and a space probe to investigate planetary surfaces, hoping to discover extraterrestrial life or evidence of an alien world.',
    },
    {
      q: 'Những thách thức nào đòi hỏi đổi mới công nghệ tối tân?',
      options: [
        'Khoảng cách mênh mông tính bằng năm ánh sáng, lực hút dữ dội của hố đen, và hiểm hoạ rác vũ trụ ngày càng lớn',
        'Chi phí phóng cao và rủi ro kỹ thuật',
        'Bức xạ vũ trụ và tình trạng không trọng lực',
        'Thời gian bay dài và nguồn cung dưỡng khí',
      ],
      answer: 0,
      dan: 'The vast distances measured in light years, the intense gravitational pull of a black hole, and the growing hazard of space debris require cutting-edge technological innovation.',
    },
    {
      q: 'Tham vọng của ngành khám phá vũ trụ nay đã lớn tới mức nào?',
      options: [
        'Tới mức bàn cả tới việc lập thuộc địa trên sao Hoả trong tương lai',
        'Tới mức đưa du khách thường lên quỹ đạo',
        'Tới mức khai thác tài nguyên ngoài Trái Đất',
        'Tới mức xây trạm nghiên cứu trên Mặt Trăng',
      ],
      answer: 0,
      dan: 'As our knowledge expands, the ambition of space exploration grows, with discussions even turning to the future colonization of Mars.',
    },
  ],

  'food-agriculture-ielts-p2': [
    {
      q: 'Việc dựa vào phân bón hoá học, thuốc trừ sâu và thuốc diệt cỏ có thể gây ra gì?',
      options: [
        'Xói mòn đất và tổn hại hệ sinh thái',
        'Giảm chất lượng nông sản thu hoạch',
        'Kháng thuốc ở các loài sâu bệnh',
        'Ô nhiễm nguồn nước ngầm quanh vùng',
      ],
      answer: 0,
      dan: 'However, modern farming often relies on a chemical fertilizer, pesticide, or herbicide, which can cause soil erosion and damage the ecosystem.',
    },
    {
      q: 'Canh tác hữu cơ hướng tới điều gì?',
      options: [
        'Tránh hoá chất và tập trung vào thực hành bền vững để giữ đất màu mỡ thay vì cằn cỗi',
        'Tăng giá trị nông sản trên thị trường',
        'Giảm chi phí đầu vào cho người nông dân',
        'Bảo tồn các giống cây trồng truyền thống',
      ],
      answer: 0,
      dan: 'A growing trend is organic farming, which avoids these chemicals and focuses on sustainable practices to keep the land fertile rather than barren.',
    },
    {
      q: 'Vì sao một số người ủng hộ cây trồng biến đổi gen?',
      options: [
        'Để ngăn thiếu lương thực trong hạn hán, hướng tới an ninh lương thực toàn cầu',
        'Để giảm nhu cầu dùng thuốc trừ sâu',
        'Để tăng giá trị dinh dưỡng của nông sản',
        'Để rút ngắn thời gian sinh trưởng của cây',
      ],
      answer: 0,
      dan: 'Some advocate for genetically modified crops to prevent a food shortage during a drought, aiming for global food security.',
    },
    {
      q: 'Ăn thực phẩm chế biến kỹ có phụ gia và chất bảo quản nhân tạo dẫn tới gì?',
      options: [
        'Béo phì và suy dinh dưỡng',
        'Bệnh tim mạch và tiểu đường',
        'Rối loạn tiêu hoá kéo dài',
        'Suy giảm hệ miễn dịch',
      ],
      answer: 0,
      dan: 'Eating highly processed food with an artificial additive or preservative can lead to obesity and malnutrition, whereas a nutritious meal full of raw vegetables provides essential nutrients.',
    },
  ],

  'energy-resources-ielts': [
    {
      q: 'Chúng ta khai thác nhiên liệu hoá thạch từ đâu?',
      options: [
        'Từ hầm mỏ sâu hoặc giàn khoan ngoài khơi',
        'Từ các mỏ lộ thiên và giếng dầu trên đất liền',
        'Từ các bể trầm tích dưới đáy biển',
        'Từ các mỏ than và khí đá phiến',
      ],
      answer: 0,
      dan: 'We extract these from a deep mine or an offshore drilling rig.',
    },
    {
      q: 'Mức tiêu thụ cao dẫn tới hai hệ quả nào?',
      options: [
        'Trữ lượng tài nguyên hữu hạn cạn nhanh, và khí thải carbon tăng nguy hiểm làm trầm trọng hiệu ứng nhà kính',
        'Giá năng lượng tăng và nguồn cung bất ổn',
        'Ô nhiễm không khí và suy giảm sức khoẻ cộng đồng',
        'Phụ thuộc vào nhập khẩu và rủi ro địa chính trị',
      ],
      answer: 0,
      dan: 'However, this high consumption leads to the rapid depletion of our finite resource reserve and a dangerous increase in carbon emissions, exacerbating the greenhouse effect and growing our carbon footprint.',
    },
    {
      q: 'Nếu không thay đổi, chúng ta sẽ đối mặt với điều gì?',
      options: [
        'Khủng hoảng năng lượng nghiêm trọng hoặc mất điện lưới thường xuyên',
        'Chi phí sinh hoạt tăng vọt trên toàn cầu',
        'Xung đột giữa các quốc gia vì tài nguyên',
        'Sự sụp đổ của các ngành công nghiệp nặng',
      ],
      answer: 0,
      dan: 'If we do not change, we will face a severe energy crisis or frequent power grid blackouts.',
    },
    {
      q: 'Chính phủ phải làm gì theo bài?',
      options: [
        'Cấp trợ giá cho các sáng kiến xanh và khuyến khích mọi công dân tiết kiệm thay vì làm cạn kiệt tài nguyên',
        'Đầu tư công vào nghiên cứu năng lượng sạch',
        'Đánh thuế cao lên các ngành phát thải lớn',
        'Đặt mục tiêu bắt buộc về tỉ lệ năng lượng tái tạo',
      ],
      answer: 0,
      dan: 'The government must provide a subsidy to subsidize green initiatives and encourage every citizen to conserve rather than deplete our natural wealth.',
    },
  ],

  'media-journalism-ielts': [
    {
      q: 'Báo chí xuất sắc đòi hỏi nhà báo làm gì?',
      options: [
        'Kiểm chứng dữ kiện để giữ uy tín cho tờ báo',
        'Đưa tin nhanh nhất có thể trước đối thủ',
        'Phỏng vấn nhiều nguồn khác nhau',
        'Giữ khoảng cách với các nhân vật quyền lực',
      ],
      answer: 0,
      dan: 'Excellent journalism demands that a journalist or foreign correspondent verify their facts to maintain the credibility of a broadsheet publication.',
    },
    {
      q: 'Báo lá cải làm gì để tăng lượng phát hành, còn paparazzi làm gì?',
      options: [
        'Báo lá cải dùng lối giật gân và tít gây sốc; paparazzi liên tục xâm phạm đời tư người nổi tiếng để săn bê bối',
        'Báo lá cải hạ giá bán; paparazzi bán ảnh cho nhiều toà soạn',
        'Báo lá cải tăng số trang; paparazzi theo dõi các sự kiện lớn',
        'Báo lá cải mời người nổi tiếng viết bài; paparazzi phỏng vấn họ',
      ],
      answer: 0,
      dan: 'Even worse, a tabloid might rely on sensationalism and shocking headlines to increase its circulation, while paparazzi relentlessly invade a celebrity’s privacy in search of a scandalous controversy.',
    },
    {
      q: 'Khi chính phủ dùng kiểm duyệt hoặc tuyên truyền, cần tới ai?',
      options: [
        'Một người tố giác dũng cảm rò rỉ thông tin mật cho một đài phát đáng tin',
        'Các tổ chức bảo vệ quyền tự do báo chí',
        'Toà án độc lập bảo vệ nhà báo',
        'Sự phản ứng của dư luận quốc tế',
      ],
      answer: 0,
      dan: 'In such cases, it takes a brave whistleblower to leak classified information to a reliable broadcaster.',
    },
    {
      q: 'Vì thế điều gì trở nên thiết yếu?',
      options: [
        'Nâng cao năng lực đọc hiểu truyền thông, để công dân đòi được đưa tin khách quan và phân biệt bài viết đáng tin với thao túng giật gân',
        'Siết chặt quy định pháp luật với các toà soạn',
        'Xây dựng các cơ quan báo chí độc lập với nhà nước',
        'Đào tạo lại đội ngũ phóng viên theo chuẩn quốc tế',
      ],
      answer: 0,
      dan: 'Consequently, improving media literacy is essential, ensuring that citizens can demand objective coverage and distinguish between a credible article and mere sensational media manipulation.',
    },
  ],

  'sports-competition-ielts': [
    {
      q: 'Dưới sự dẫn dắt của huấn luyện viên, vận động viên tập trung rèn gì?',
      options: [
        'Sức bền, độ dẻo dai và sự nhanh nhẹn, đồng thời làm chủ chiến thuật khôn ngoan',
        'Kỹ thuật cơ bản và thể lực nền',
        'Tâm lý thi đấu và khả năng chịu áp lực',
        'Chế độ dinh dưỡng và phục hồi sau tập',
      ],
      answer: 0,
      dan: 'Guided by an experienced coach, they focus on building incredible stamina, endurance, and physical agility, while mastering a clever strategy or tactic.',
    },
    {
      q: 'Áp lực thương mại hoá khiến một số vận động viên liều lĩnh làm gì?',
      options: [
        'Dùng doping hoặc chất kích thích để giành lợi thế bất chính, đánh đổi bằng nguy cơ bị cấm thi đấu vĩnh viễn',
        'Chuyển sang thi đấu cho các câu lạc bộ giàu hơn',
        'Kéo dài sự nghiệp quá giới hạn thể chất',
        'Nhận các hợp đồng quảng cáo gây tranh cãi',
      ],
      answer: 0,
      dan: 'With lucrative sponsorship and endorsement deals at stake, some athletes risk a lifetime ban by resorting to doping or using a performance-enhancing drug to gain an unfair advantage.',
    },
    {
      q: 'Trọng tài có nhiệm vụ gì để bảo vệ tính chính trực của trận đấu?',
      options: [
        'Thực thi luật nghiêm ngặt, phạt nặng mọi lỗi vi phạm',
        'Bảo đảm hai đội có điều kiện thi đấu ngang nhau',
        'Giữ trật tự trên sân và trên khán đài',
        'Ghi nhận chính xác kết quả từng pha bóng',
      ],
      answer: 0,
      dan: 'To protect the integrity of the game, a referee or umpire must enforce the rules strictly, penalizing any foul with a severe penalty.',
    },
    {
      q: 'Bài kết lại rằng điều gì phải là cốt lõi của mọi cuộc thi đấu?',
      options: [
        'Tinh thần thể thao và chơi đẹp, để tinh thần của trận đấu được tôn vinh trên cả phần thưởng tài chính',
        'Sự công bằng trong cách tổ chức giải đấu',
        'Nỗ lực hết mình của từng vận động viên',
        'Sự cổ vũ văn minh của khán giả',
      ],
      answer: 0,
      dan: 'True sportsmanship and fair play should remain the core of every competition, ensuring that whether a team secures a win, suffers a defeat, or ends in a draw, the spirit of the game is honored above the financial rewards of the industry.',
    },
  ],

  'global-issues-politics-ielts-p2': [
    {
      q: 'Nhà ngoại giao làm gì tại một hội nghị thượng đỉnh toàn cầu?',
      options: [
        'Thiết lập một hiệp ước hoặc xây dựng một liên minh',
        'Vận động ủng hộ cho chính sách nước mình',
        'Đàm phán các thoả thuận thương mại song phương',
        'Trình bày quan điểm của quốc gia về vấn đề chung',
      ],
      answer: 0,
      dan: 'Through diplomacy, a diplomat works to establish a treaty or build an alliance at a global summit.',
    },
    {
      q: 'Khủng hoảng chính trị nghiêm trọng có thể dẫn tới điều gì?',
      options: [
        'Chiến tranh, buộc nhiều người thành người tị nạn xin tị nạn ở nước khác',
        'Sự sụp đổ của chính quyền đương nhiệm',
        'Các lệnh trừng phạt từ cộng đồng quốc tế',
        'Làn sóng biểu tình lan rộng trong nước',
      ],
      answer: 0,
      dan: 'A severe political crisis can lead to war, forcing many to become a refugee seeking asylum across a border.',
    },
    {
      q: 'Bài đối lập nền dân chủ thịnh vượng với điều gì?',
      options: [
        'Chế độ độc tài tàn bạo hoặc chính thể toàn trị đầy rẫy tham nhũng',
        'Các quốc gia đang trong giai đoạn chuyển đổi',
        'Những nước có nền kinh tế kém phát triển',
        'Các thể chế nơi quyền lực tập trung vào quốc hội',
      ],
      answer: 0,
      dan: 'While some nations enjoy a thriving democracy with transparency and a fair election where a citizen can vote for a candidate, others suffer under a brutal dictatorship or an authoritarian regime plagued by corruption.',
    },
    {
      q: 'Bài kết lại rằng cộng đồng quốc tế xây được tương lai ổn định, bình đẳng bằng cách nào?',
      options: [
        'Nuôi dưỡng tinh thần hợp tác trung lập và đạt đồng thuận, không cần liên tục can thiệp hay phủ quyết',
        'Tăng cường viện trợ cho các nước nghèo',
        'Thiết lập các cơ chế giám sát nhân quyền chặt chẽ',
        'Thúc đẩy dân chủ hoá ở các nước độc tài',
      ],
      answer: 0,
      dan: 'Only by fostering a spirit of neutral cooperation and reaching a consensus without the need to constantly intervene or veto can the international community build a stable, equal future.',
    },
  ],

  'language-communication-ielts': [
    {
      q: 'Việc tiếp thu ngôn ngữ đòi hỏi gì ngoài học từ vựng và ngữ pháp?',
      options: [
        'Hiểu sâu về ngữ nghĩa và bối cảnh văn hoá',
        'Luyện phát âm và ngữ điệu chuẩn xác',
        'Đọc nhiều tài liệu bằng ngôn ngữ đích',
        'Giao tiếp thường xuyên với người bản ngữ',
      ],
      answer: 0,
      dan: 'Language acquisition involves more than just memorizing vocabulary and grammar or mastering syntax; it requires a deep understanding of semantics and cultural context.',
    },
    {
      q: 'Để đạt độ trôi chảy và thành thạo thật sự, người học phải nắm được gì?',
      options: [
        'Sắc thái tinh tế và ẩn dụ bóng bẩy, không chỉ nghĩa đen của bản dịch',
        'Toàn bộ hệ thống thì và cấu trúc câu',
        'Vốn từ đủ rộng cho mọi chủ đề',
        'Cách dùng ngôn ngữ trong văn viết trang trọng',
      ],
      answer: 0,
      dan: 'To achieve true fluency and proficiency, one must grasp the subtle nuance and figurative metaphor, not just the literal translation.',
    },
    {
      q: 'Khi người bản ngữ dùng phương ngữ, tiếng lóng hay thành ngữ phức tạp, điều gì có thể xảy ra?',
      options: [
        'Người phiên dịch có thể chật vật, dẫn tới rào cản ngôn ngữ hoặc hiểu lầm',
        'Người nghe phải đoán nghĩa theo ngữ cảnh',
        'Cuộc trò chuyện phải chuyển sang ngôn ngữ chung',
        'Thông điệp bị mất đi sắc thái ban đầu',
      ],
      answer: 0,
      dan: 'When a native speaker uses a regional dialect, slang, or complex idiom, an interpreter may struggle, leading to a frustrating language barrier or misunderstanding.',
    },
    {
      q: 'Ngay cả khi cùng nói một tiếng mẹ đẻ, điều gì vẫn có thể làm công chúng thấy xa cách?',
      options: [
        'Việc lạm dụng biệt ngữ chuyên ngành dày đặc',
        'Việc dùng cấu trúc câu quá phức tạp',
        'Sự khác biệt về giọng vùng miền',
        'Tốc độ nói quá nhanh của người trình bày',
      ],
      answer: 0,
      dan: 'Even when we speak the same mother tongue, a reliance on dense professional jargon can alienate the public.',
    },
  ],

  'literature-poetry-ielts-p2': [
    {
      q: 'Tác giả thường bắt đầu từ đâu trước khi nhà xuất bản đồng ý in?',
      options: [
        'Từ một bản thảo nháp',
        'Từ một đề cương chi tiết',
        'Từ một chương mẫu gửi thử',
        'Từ hợp đồng với nhà xuất bản',
      ],
      answer: 0,
      dan: 'An aspiring author or a seasoned novelist often begins with a rough draft of a manuscript before a publisher agrees to print it.',
    },
    {
      q: 'Một tường thuật cuốn hút dựa vào điều gì?',
      options: [
        'Một nhân vật chính mạnh mẽ đối đầu một kẻ phản diện đáng gờm',
        'Một bối cảnh được dựng chi tiết và sống động',
        'Một chủ đề mang tính phổ quát',
        'Một giọng kể riêng biệt của tác giả',
      ],
      answer: 0,
      dan: 'A compelling narrative relies on a strong protagonist facing off against a formidable antagonist.',
    },
    {
      q: 'Nhà thơ chú ý tới những yếu tố nào để tạo nên kiệt tác?',
      options: [
        'Nhịp điệu, vần và dòng thơ',
        'Hình ảnh, ẩn dụ và biểu tượng',
        'Chủ đề, giọng điệu và cảm xúc',
        'Bố cục, độ dài và cách ngắt dòng',
      ],
      answer: 0,
      dan: 'In poetry, a poet pays close attention to rhythm, rhyme, and verse to create a masterpiece.',
    },
    {
      q: 'Để thật sự thưởng thức một tác phẩm kinh điển, người đọc phải làm gì?',
      options: [
        'Đọc vượt qua nghĩa đen của một trích đoạn hay câu trích, tránh mọi đạo văn, và cố hiểu thông điệp sâu xa',
        'Tìm hiểu bối cảnh lịch sử khi tác phẩm ra đời',
        'Đọc kèm các bài phê bình của giới chuyên môn',
        'So sánh với các tác phẩm khác cùng thể loại',
      ],
      answer: 0,
      dan: 'To truly appreciate a classic volume, one must read beyond the literal meaning of an excerpt or quotation, avoiding any plagiarism, and striving to understand the profound message that words in prose and poetry convey.',
    },
  ],
};

export default STORY_QUIZ;
