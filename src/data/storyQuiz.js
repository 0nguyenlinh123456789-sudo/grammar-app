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
};

export default STORY_QUIZ;
