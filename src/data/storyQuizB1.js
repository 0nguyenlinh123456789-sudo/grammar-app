// File: src/data/storyQuizB1.js
// Câu hỏi đọc hiểu MỨC VĂN BẢN — bậc B1 (38 chặng · 152 câu).
// Luật chung, hình dạng dữ liệu và các quyết định: xem `src/data/storyQuiz.js`.
//
// CÂU NHIỄU DÀI TƯƠNG ĐƯƠNG ĐÁP ÁN. Bản soạn đầu có 84,3% câu mà đáp án đúng là
// lựa chọn dài nhất — chọn phương án dài nhất mà không đọc bài vẫn đúng ~84%.
// Mọi lựa chọn ở đây được viết thành mệnh đề đầy đủ, độ dài xấp xỉ nhau, và câu
// nhiễu dựng từ chi tiết có thật trong bài nhưng ghép sai.

export const STORY_QUIZ_B1 = {
  'nature-countryside': [
    {
      q: 'Bài đọc kể về ai và chuyện gì?',
      options: [
        'Một người mới mua trang trại và liên tiếp gặp rắc rối khi tập làm nông',
        'Một nông dân lâu năm truyền lại kinh nghiệm trồng trọt cho lớp trẻ trong làng',
        'Một nhà khoa học về đất tới vùng nông thôn khảo sát rồi ở lại làm ruộng',
        'Một nhóm du khách đi tham quan làng nghề rồi lạc trong vườn quốc gia',
      ],
      answer: 0,
      dan: 'Bob bought a farm and a small farmhouse. He wanted to be a real farmer.',
    },
    {
      q: 'Vì sao Bob chạy vào bãi chăn?',
      options: [
        'Vì đàn gia cầm đuổi theo anh khi anh định cho chúng ăn',
        'Vì đàn bò sổng chuồng và anh phải chạy theo lùa chúng về',
        'Vì trời đổ mưa nên anh chạy tìm chỗ trú dưới mái chuồng',
        'Vì anh muốn thử lái chiếc máy kéo mới mua trên bãi cỏ rộng',
      ],
      answer: 0,
      dan: 'He tried to feed the poultry, but they chased him into the pasture!',
    },
    {
      q: 'Bob chọn cách canh tác nào?',
      options: [
        'Canh tác hữu cơ, thay cho việc dùng thuốc trừ sâu và phân bón',
        'Bón thật nhiều phân để cây lớn nhanh và cho thu hoạch sớm',
        'Trồng đúng một loại cây suốt cả năm cho dễ chăm sóc',
        'Thuê người trong làng làm toàn bộ việc đồng áng thay mình',
      ],
      answer: 0,
      dan: 'Instead of using pesticide and fertilizer, he chose organic farming to grow organic crops.',
    },
    {
      q: 'Vì sao Bob rời trang trại để đi leo núi?',
      options: [
        'Để thoát khỏi trang trại và khám phá thiên nhiên ở nơi hẻo lánh',
        'Để tìm mua thêm đất canh tác ở vùng đồi phía trong đất liền',
        'Để đưa đàn gia súc lên vùng cao ăn cỏ trong mùa khô hạn',
        'Để kịp dự lễ hội làng tổ chức ở bên kia dãy núi cao',
      ],
      answer: 0,
      dan: 'To escape the farm, Bob went inland to explore the environment and nature in an isolated and remote location.',
    },
  ],

  'technology-internet': [
    {
      q: 'Vì sao người kể đặt mật khẩu rất mạnh?',
      options: [
        'Vì an ninh mạng là điều quan trọng đối với anh',
        'Vì nơi anh làm việc bắt buộc phải đổi mật khẩu',
        'Vì máy tính của anh hay bị nhiễm vi-rút lạ',
        'Vì anh thường quên những mật khẩu quá ngắn',
      ],
      answer: 0,
      dan: 'My password is very strong because cybersecurity is important.',
    },
    {
      q: 'Người kể sao lưu tệp để phòng chuyện gì?',
      options: [
        'Phòng khi một con vi-rút làm hỏng máy tính',
        'Phòng khi mất điện đột ngột lúc đang làm việc',
        'Phòng khi quên mất mật khẩu đăng nhập máy',
        'Phòng khi dung lượng trên đám mây bị đầy',
      ],
      answer: 0,
      dan: 'I always backup my files in case a virus damages my computer.',
    },
    {
      q: 'Theo bài, điện toán đám mây cho phép làm gì?',
      options: [
        'Lưu dữ liệu của chúng ta ở bất cứ đâu',
        'Xem truyền hình truyền thống mà không mất phí',
        'Chặn được hoàn toàn vi-rút trên máy tính',
        'Tự sinh ra mật khẩu mạnh cho người dùng',
      ],
      answer: 0,
      dan: 'Cloud computing lets us store data anywhere.',
    },
    {
      q: 'Bài kết lại rằng để an toàn trong tương lai, chúng ta cần gì?',
      options: [
        'Băng thông tốt hơn và công nghệ mã hoá',
        'Nhiều công ty khởi nghiệp công nghệ hơn',
        'Bớt thời gian dùng các mạng xã hội lại',
        'Quay lại xem truyền hình truyền thống',
      ],
      answer: 0,
      dan: 'Startups are building the future, but we need better bandwidth and encryption to stay safe.',
    },
  ],

  'health-medical': [
    {
      q: 'Bệnh nhân có những triệu chứng gì và kéo dài bao lâu?',
      options: [
        'Mệt mỏi, chóng mặt và buồn nôn, suốt hai tuần liền',
        'Sốt cao kèm ho khan, suốt hai ngày trước khi khám',
        'Đau đầu và mất ngủ triền miên, suốt hai tháng qua',
        'Đau bụng kèm sụt cân nhanh, suốt hơn một tuần nay',
      ],
      answer: 0,
      dan: 'The patient has been experiencing fatigue, dizziness, and nausea for two weeks.',
    },
    {
      q: 'Bác sĩ cho chụp MRI và lấy mẫu máu nhằm mục đích gì?',
      options: [
        'Để xác nhận lại chẩn đoán mà bà đang nghi ngờ',
        'Để thay thế hẳn cho việc phải dùng thuốc điều trị',
        'Để theo dõi tác dụng phụ của thuốc đã kê trước đó',
        'Để chuẩn bị cho một ca phẫu thuật ngay trong tuần',
      ],
      answer: 0,
      dan: 'She orders an MRI scan and blood specimen to confirm the diagnosis.',
    },
    {
      q: 'Theo bài, nhờ đâu tiên lượng của bệnh nhân là tích cực?',
      options: [
        'Nhờ chế độ dinh dưỡng hợp lý và việc tập luyện đều',
        'Nhờ được chuyển lên bệnh viện tuyến trên kịp thời',
        'Nhờ được kê thuốc với liều cao hơn lần khám trước',
        'Nhờ nghỉ làm hoàn toàn trong suốt sáu tháng liền',
      ],
      answer: 0,
      dan: 'With proper nutrition and exercise, his prognosis is positive.',
    },
    {
      q: 'Chiến dịch y tế cộng đồng trong bài tập trung vào việc gì?',
      options: [
        'Dạy người dân về tiêm chủng, dinh dưỡng và cách tránh nhiễm trùng',
        'Phát thuốc miễn phí cho những người mắc bệnh mạn tính lâu năm',
        'Xây thêm bệnh viện và trạm y tế cho các vùng nông thôn xa',
        'Đào tạo thêm bác sĩ chuyên khoa tim mạch cho tuyến cơ sở',
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
        'Chính phủ phải một mình gánh vác mọi vấn đề của cộng đồng',
        'Người giàu nên chia lại phần lớn tài sản cho người nghèo',
        'Vấn đề xã hội chỉ xuất hiện ở những quốc gia còn nghèo',
      ],
      answer: 0,
      dan: 'Whether we act in private or join a group, working together rather than alone is the best way to solve social problems and build a safe place for every member.',
    },
    {
      q: 'Theo bài, nhiều người tốt bụng làm gì?',
      options: [
        'Làm tình nguyện viên cho một tổ chức từ thiện',
        'Mở doanh nghiệp để tạo việc làm cho người nghèo',
        'Vận động chính quyền sửa đổi những đạo luật cũ',
        'Chuyển tới sống tại các khu dân cư khó khăn hơn',
      ],
      answer: 0,
      dan: 'Many kind people work as a volunteer for a charity.',
    },
    {
      q: 'Một công dân tốt phối hợp với chính phủ để làm những việc gì?',
      options: [
        'Bảo vệ nhân quyền, ngăn bạo lực và tội phạm, thúc đẩy hoà bình',
        'Thu thuế đầy đủ và phân phối lại thu nhập cho người khó khăn',
        'Xây dựng thêm trường học và bệnh viện cho các khu dân cư mới',
        'Kiểm soát giá lương thực để người nghèo không bị đói kém',
      ],
      answer: 0,
      dan: 'A good citizen also works with the government to protect human rights, stop violence and crime, and promote peace instead of war.',
    },
    {
      q: 'Khi đám đông tụ họp nơi công cộng để bỏ phiếu hoặc đòi sửa một đạo luật bất công, điều đó thể hiện gì?',
      options: [
        'Sức mạnh của đông đảo dân chúng',
        'Sự bất lực của bộ máy chính quyền',
        'Nguy cơ dẫn tới bạo lực đường phố',
        'Sự chia rẽ sâu sắc trong cộng đồng',
      ],
      answer: 0,
      dan: 'When a large crowd comes together in public to vote or demand an unfair law be changed, they show the power of the population.',
    },
  ],

  'media-news-daily': [
    {
      q: 'Bài đọc kết lại bằng thông điệp nào?',
      options: [
        'Dù là người nghe hay người đọc, phải biết đâu mới là tin thật',
        'Báo giấy vẫn là nguồn đáng tin hơn hẳn tin tức trên mạng',
        'Nên tránh xa mạng xã hội để khỏi gặp phải tin tức sai lệch',
        'Chỉ nên theo dõi tin tức trên các kênh truyền hình quốc gia',
      ],
      answer: 0,
      dan: 'Whether you are a listener or a reader, it is important to know what is real when the media covers an event.',
    },
    {
      q: 'Theo bài, người đang lái xe có thể theo dõi tin tức bằng cách nào?',
      options: [
        'Nghe một bản tin địa phương phát trên radio',
        'Đọc tờ báo giấy mang theo ở ghế phía sau xe',
        'Xem chương trình phát trực tiếp trên truyền hình',
        'Viết bình luận vào bài đăng trên mạng xã hội',
      ],
      answer: 0,
      dan: 'If you are driving, you might listen to a local report on the radio.',
    },
    {
      q: 'Khi mở tờ báo hoặc tạp chí ra, người đọc nhìn vào cái gì trước?',
      options: [
        'Dòng tít lớn, rồi đọc bài do nhà báo viết',
        'Các trang quảng cáo nằm ở cuối tờ báo',
        'Những tấm ảnh chụp người nổi tiếng',
        'Mục thư bạn đọc gửi về cho toà soạn',
      ],
      answer: 0,
      dan: 'When they open it, they look at the big headline and read an article written by a journalist.',
    },
    {
      q: 'Vì sao bài nhắc người đọc phải kiểm chứng thông tin?',
      options: [
        'Vì có khi câu chuyện là thật, nhưng cũng có khi là tin giả',
        'Vì nhà báo luôn viết theo ý của người bỏ tiền ra thuê họ',
        'Vì trên internet không còn nguồn thông tin nào đáng tin nữa',
        'Vì báo in bao giờ cũng chậm hơn tin đăng trên mạng xã hội',
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
        'Một trận cháy rừng bùng lên sau khi bị sét đánh trúng',
        'Xe cộ qua lại quá nhiều trên con đường xuyên rừng',
        'Rác thải mà khách du lịch bỏ lại rồi bốc mùi hôi',
      ],
      answer: 0,
      dan: 'A factory was releasing greenhouse gases and carbon emissions into the sky.',
    },
    {
      q: 'Benny và bạn bè đã bắt tay làm những việc gì?',
      options: [
        'Tái chế, dùng năng lượng mặt trời và ủ rác thực phẩm',
        'Kiện nhà máy ra toà và đòi bồi thường cho khu rừng',
        'Chuyển cả đàn thú trong rừng sang một nơi ở mới',
        'Kêu gọi khách du lịch ngừng tới khu rừng một thời gian',
      ],
      answer: 0,
      dan: 'They started recycling, using solar energy, and composting food waste.',
    },
    {
      q: 'Sau khi cả nhóm hành động, kết quả đo được là gì?',
      options: [
        'Chỉ số chất lượng không khí đã được cải thiện',
        'Nhà máy buộc phải đóng cửa và dời đi nơi khác',
        'Khu rừng được công nhận là một di sản thế giới',
        'Lượng khách du lịch tới đây tăng lên gấp đôi',
      ],
      answer: 0,
      dan: 'The air quality index improved.',
    },
    {
      q: 'Thông điệp Benny chứng minh được là gì?',
      options: [
        'Phát triển bền vững là điều làm được, kể cả với một chú thỏ nhỏ',
        'Chỉ có chính phủ mới đủ sức cứu lấy môi trường đang xuống cấp',
        'Rừng sẽ tự phục hồi được nếu con người để yên cho nó một thời gian',
        'Công nghệ mới mới là lời giải duy nhất cho khủng hoảng môi trường',
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
        'Nhờ gia đình bán trang trại để lấy tiền cho anh lên đường',
        'Nhờ trúng tuyển trong một kỳ thi do chính phủ tổ chức',
        'Nhờ được một vị giáo sư đứng ra bảo trợ toàn bộ chi phí',
      ],
      answer: 0,
      dan: 'He earned a scholarship to an international university, which excited him enormously.',
    },
    {
      q: 'Bài tập đầu tiên của Benny đòi hỏi những gì?',
      options: [
        'Tìm trích dẫn, tránh đạo văn và xây dựng một giả thuyết vững',
        'Thuyết trình trước toàn khoa trong khoảng ba mươi phút liền',
        'Dịch trọn một cuốn sách chuyên ngành sang tiếng mẹ đẻ',
        'Làm một bài kiểm tra trắc nghiệm vào cuối học kỳ đầu',
      ],
      answer: 0,
      dan: 'Benny’s first assignment was a research paper — he had to find citations, avoid plagiarism, and develop a strong hypothesis.',
    },
    {
      q: 'Benny khám phá ra khái niệm siêu nhận thức, tức là hiểu điều gì?',
      options: [
        'Hiểu được CÁCH mà bản thân mình học tốt nhất',
        'Hiểu nội dung môn học sâu hơn cả giáo trình',
        'Hiểu được cách mà giáo sư thường ra đề thi',
        'Hiểu vì sao điểm trung bình lại quan trọng',
      ],
      answer: 0,
      dan: 'Benny discovered metacognition — understanding HOW he learned best.',
    },
    {
      q: 'Kết cục của Benny khi tốt nghiệp là gì?',
      options: [
        'Trở thành sinh viên xuất sắc nhất khoá',
        'Ở lại trường để làm trợ giảng cho giáo sư',
        'Bỏ dở chương trình vì thấy quá sức mình',
        'Chuyển sang học tiếp ở một trường khác',
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
        'Một bức tượng được tạc từ khối đá cẩm thạch',
        'Một bộ phim tài liệu về các nhà soạn nhạc lớn',
        'Một bản giao hưởng viết riêng cho dàn nhạc',
      ],
      answer: 0,
      dan: 'One day, he decided to create his own painting — a large landscape in watercolor.',
    },
    {
      q: 'Ai là người tỏ ra ấn tượng với tác phẩm của Benny?',
      options: [
        'Người phụ trách triển lãm ở địa phương',
        'Một nhà soạn nhạc nổi tiếng trong vùng',
        'Vị giám đốc của bảo tàng quốc gia lớn',
        'Một nhà xuất bản sách anh từng gửi bài',
      ],
      answer: 0,
      dan: 'The curator was impressed.',
    },
    {
      q: 'Được truyền cảm hứng, Benny làm gì tiếp theo?',
      options: [
        'Viết một tiểu thuyết có nhân vật chính hấp dẫn và cốt truyện bất ngờ',
        'Mở một phòng tranh của riêng mình ngay tại khu phố anh đang sống',
        'Học sáng tác nhạc để viết cho dàn nhạc từng chơi trong khu vườn',
        'Đi khắp nơi mở lớp dạy vẽ màu nước cho những người mới bắt đầu',
      ],
      answer: 0,
      dan: 'Inspired, Benny started writing a novel with a fascinating protagonist, clever metaphors, and an unexpected plot.',
    },
    {
      q: 'Cuốn tiểu thuyết đưa Benny tới kết quả nào?',
      options: [
        'Gửi cho nhà xuất bản và có được hợp đồng chuyển thể thành phim',
        'Bán được bản quyền đăng nhiều kỳ cho một tờ báo lớn trong vùng',
        'Được mời ngồi ghế giám khảo của một cuộc thi sáng tác văn học',
        'Bị yêu cầu viết lại toàn bộ theo góp ý của người biên tập sách',
      ],
      answer: 0,
      dan: 'He submitted it to publishers and earned a film adaptation deal.',
    },
  ],

  'career-workplace': [
    {
      q: 'Benny khởi đầu con đường xin việc bằng cách nào?',
      options: [
        'Cập nhật CV rồi gửi đi mười bộ hồ sơ xin việc',
        'Nhờ một người quen giới thiệu vào công ty lớn',
        'Tới dự một hội chợ việc làm do trường tổ chức',
        'Nộp hồ sơ cho một công ty chuyên săn nhân sự',
      ],
      answer: 0,
      dan: 'Benny the Bunny updated his CV and sent out 10 job applications.',
    },
    {
      q: 'Sau khi được thăng chức, phòng ban của Benny thay đổi ra sao?',
      options: [
        'Tăng từ năm người lên thành hai mươi nhân viên',
        'Tách ra thành hai phòng ban riêng biệt hẳn nhau',
        'Giữ nguyên quy mô nhưng đổi hẳn sang việc khác',
        'Sáp nhập với phòng kỹ thuật thành một bộ phận',
      ],
      answer: 0,
      dan: 'His department grew from 5 to 20 employees.',
    },
    {
      q: 'Cùng với thành công, Benny phải học điều gì?',
      options: [
        'Học cách cân bằng công việc với cuộc sống để tránh kiệt sức',
        'Học cách làm thêm giờ nhiều hơn nữa để theo kịp tiến độ',
        'Học cách tự mình gánh hết phần việc của cả nhóm bên dưới',
        'Học cách thương lượng lương với những công ty lớn hơn',
      ],
      answer: 0,
      dan: 'But with success came challenges — he learned about work-life balance to avoid burnout.',
    },
    {
      q: 'Vì sao Benny từ chối lời mời làm giám đốc cấp cao ở công ty lớn hơn?',
      options: [
        'Vì anh quá yêu văn hoá của công ty khởi nghiệp mình đang làm',
        'Vì mức lương mà bên kia đưa ra thấp hơn chỗ làm hiện tại',
        'Vì trụ sở công ty ấy nằm quá xa nơi gia đình anh sinh sống',
        'Vì anh đang ấp ủ dự định tự mở một công ty của riêng mình',
      ],
      answer: 0,
      dan: 'But Benny loved his startup’s corporate culture too much to leave.',
    },
  ],

  'urban-traffic-vstep': [
    {
      q: 'Bài đọc kết lại bằng viễn cảnh nào?',
      options: [
        'Thành phố thân thiện với người đi bộ, không khí sạch, đi lại dễ dàng',
        'Thành phố không còn bóng dáng xe máy trên bất kỳ tuyến phố nào',
        'Thành phố có tàu điện ngầm chạy dưới mọi tuyến đường trung tâm',
        'Thành phố cấm hẳn ô tô cá nhân đi vào khu vực nội đô đông đúc',
      ],
      answer: 0,
      dan: 'The dream is a pedestrian-friendly city with clean air, accessible public transit, and safe crosswalks where every citizen can travel freely.',
    },
    {
      q: 'Chính phủ đã đầu tư mạnh vào những hạng mục hạ tầng nào?',
      options: [
        'Đường cao tốc, cầu vượt và hầm chui xây mới',
        'Bãi đỗ xe ngầm và các trạm sạc xe điện',
        'Tuyến đường sắt cao tốc nối các tỉnh lân cận',
        'Sân bay quốc tế và cảng biển nước sâu mới',
      ],
      answer: 0,
      dan: 'The government has invested heavily in infrastructure, building new highways, overpasses, flyovers, and tunnels.',
    },
    {
      q: 'Phí tắc đường và việc xử phạt nghiêm vi phạm giao thông nhằm mục đích gì?',
      options: [
        'Giảm số vụ tai nạn và số người tử vong',
        'Tăng thêm nguồn thu cho ngân sách thành phố',
        'Buộc người dân phải chuyển sang dùng xe điện',
        'Hạn chế người từ tỉnh khác đổ về thành phố',
      ],
      answer: 0,
      dan: 'Congestion charges and strict enforcement of traffic violations, including jaywalking, reckless driving, and tailgating, aim to reduce accidents and fatalities.',
    },
    {
      q: 'Ứng dụng đi chung xe giúp giảm điều gì?',
      options: [
        'Khí thải và khói xe tạo ra sương mù độc hại',
        'Chi phí xây dựng cầu vượt và hầm chui mới',
        'Số lượng đèn tín hiệu cần lắp ở các ngã tư',
        'Thời gian thi công các tuyến metro trong nội đô',
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
        'Đó là vùng đang mất dần đất canh tác vì tốc độ đô thị hoá quá nhanh',
        'Đó là nơi có sản lượng thuỷ sản lớn nhất trong khu vực Đông Nam Á',
        'Đó là vùng đầu tiên trong cả nước áp dụng mô hình nông nghiệp hữu cơ',
      ],
      answer: 0,
      dan: 'In Vietnam’s Mekong Delta, the granary of the nation, millions of farmers depend on agriculture for their livelihood.',
    },
    {
      q: 'Dù đã có tưới tiêu hiện đại, mối đe doạ nghiêm trọng nào vẫn còn?',
      options: [
        'Hạn hán kéo dài và tình trạng xói mòn đất',
        'Thiếu lao động trẻ ở các vùng quê xa xôi',
        'Giá phân bón nhập khẩu tăng quá nhanh',
        'Cạnh tranh từ gạo nhập khẩu giá rẻ hơn',
      ],
      answer: 0,
      dan: 'Modern irrigation systems have replaced the old methods, but drought and soil erosion remain serious threats.',
    },
    {
      q: 'Canh tác hữu cơ đang phát triển giúp giảm phụ thuộc vào thứ gì?',
      options: [
        'Thuốc trừ sâu, thuốc diệt cỏ và thuốc diệt côn trùng',
        'Máy móc nông nghiệp nhập khẩu với giá rất đắt đỏ',
        'Nguồn nước tưới lấy từ dòng chính sông Mekong',
        'Các khoản trợ cấp hằng năm của chính phủ cấp',
      ],
      answer: 0,
      dan: 'Organic farming is growing, reducing dependence on harmful pesticides, herbicides, and insecticides.',
    },
    {
      q: 'Công nghệ sinh học và canh tác chính xác mang lại hy vọng nhờ điều gì?',
      options: [
        'Giống lai và cây biến đổi gen chịu được hạn hán',
        'Máy gặt tự động thay cho sức lao động con người',
        'Nhà kính điều khiển hoàn toàn bằng máy tính',
        'Phân bón sinh học rẻ hơn hẳn phân bón hoá học',
      ],
      answer: 0,
      dan: 'Biotechnology and precision farming offer hope, with hybrid seeds and genetically modified crops that are drought-resistant.',
    },
  ],

  'sustainable-tourism-vstep': [
    {
      q: 'Theo bài, tương lai của ngành du lịch nằm ở đâu?',
      options: [
        'Ở thực hành tái tạo, để mỗi chuyến đi làm điểm đến tốt hơn trước',
        'Ở việc xây thêm thật nhiều khu nghỉ dưỡng cao cấp ven biển',
        'Ở việc tăng số lượng khách quốc tế đến mỗi năm một nhiều',
        'Ở việc mở thêm các tuyến bay thẳng tới những nước xa xôi',
      ],
      answer: 0,
      dan: 'The future of tourism lies in regenerative practices and sustainable development, where every excursion and expedition leaves destinations better than before.',
    },
    {
      q: 'Du khách có trách nhiệm được mô tả làm những việc gì?',
      options: [
        'Mang bình nước dùng lại, dùng kem chống nắng an toàn cho san hô',
        'Chỉ đi theo những tour do cơ quan nhà nước đứng ra tổ chức',
        'Tránh hoàn toàn việc đặt chân vào các khu bảo tồn thiên nhiên',
        'Ở khách sạn lớn thay vì nghỉ tại nhà dân trong bản làng',
      ],
      answer: 0,
      dan: 'Responsible travelers bring reusable bottles, use reef-safe sunscreen, and buy fair trade handicrafts as souvenirs.',
    },
    {
      q: 'Mặt trái nào của du lịch được bài nêu ra?',
      options: [
        'Quá tải du lịch đe doạ di sản, gây suy thoái môi trường và ô nhiễm',
        'Du khách nước ngoài không hiểu và không tôn trọng văn hoá bản địa',
        'Giá dịch vụ tăng cao khiến người dân trong nước không đi nổi',
        'Nhân lực trong ngành du lịch thiếu được đào tạo bài bản',
      ],
      answer: 0,
      dan: 'However, overtourism threatens heritage sites, causing environmental degradation and pollution.',
    },
    {
      q: 'Các khu nghỉ dưỡng thân thiện môi trường có chứng nhận xanh làm gì?',
      options: [
        'Dùng năng lượng tái tạo và xử lý nước thải đúng cách',
        'Chỉ nhận khách đi theo những đoàn có quy mô nhỏ',
        'Xây dựng hoàn toàn bằng vật liệu lấy tại địa phương',
        'Miễn phí cho khách tham gia hoạt động trồng rừng',
      ],
      answer: 0,
      dan: 'Community-based homestays offer cultural immersion, while eco-friendly resorts with green certification use renewable energy and treat wastewater properly.',
    },
  ],

  'water-pollution-vstep': [
    {
      q: 'Theo bài, các "vùng chết" dưới nước hình thành như thế nào?',
      options: [
        'Dư thừa phân bón gây phú dưỡng, tảo nở hoa và rút cạn ô-xy',
        'Dầu tràn phủ kín mặt nước và chặn hết ánh sáng xuống dưới',
        'Kim loại nặng lắng xuống đáy làm sinh vật tầng đáy chết dần',
        'Nước biển dâng làm độ mặn tăng lên đột ngột ở vùng cửa sông',
      ],
      answer: 0,
      dan: 'Eutrophication from excess fertilizer causes algal blooms that deplete oxygen, creating dead zones where no marine life can survive.',
    },
    {
      q: 'Nhà máy xử lý nước dùng những phương pháp nào, và điểm yếu còn lại là gì?',
      options: [
        'Lọc, khử trùng bằng clo và sục khí; thực thi tiêu chuẩn xả thải còn yếu',
        'Chưng cất rồi khử mặn; nhưng chi phí vận hành quá cao so với ngân sách',
        'Để lắng cặn tự nhiên; nhưng cách này mất quá nhiều thời gian chờ đợi',
        'Xử lý bằng vi sinh; nhưng chỉ áp dụng được ở các thành phố lớn',
      ],
      answer: 0,
      dan: 'Water treatment plants use filtration, chlorination, and aeration to purify water, but enforcement of discharge standards remains weak.',
    },
    {
      q: 'Vi nhựa đi vào chuỗi thức ăn bằng con đường nào?',
      options: [
        'Qua quá trình tích luỹ sinh học',
        'Qua nước mưa chảy tràn xuống ruộng',
        'Qua hệ thống nước máy sinh hoạt',
        'Qua không khí ở các vùng ven biển',
      ],
      answer: 0,
      dan: 'Oil spills and plastic debris devastate marine life, while microplastics enter the food chain through bioaccumulation.',
    },
    {
      q: 'Bài kết lại bằng con số nào và ý nghĩa gì?',
      options: [
        'Chỉ 3% nước Trái Đất là nước ngọt, nên quản lý bền vững là sống còn',
        'Chỉ 30% lượng nước thải được xử lý đúng cách trước khi xả ra sông',
        'Chỉ 3% dân số thế giới được dùng nước sạch đạt chuẩn hằng ngày',
        'Chỉ 13% sông ngòi còn giữ được chất lượng nước đạt mức an toàn',
      ],
      answer: 0,
      dan: 'With only 3% of Earth’s water being freshwater, sustainable water management and reducing our water footprint are critical for ensuring clean water for future generations.',
    },
  ],

  'traditions-festivals-vstep': [
    {
      q: 'Theo bài, hoa trang trí ngày Tết ở hai miền khác nhau ra sao?',
      options: [
        'Miền Bắc dùng hoa đào, còn miền Nam dùng hoa mai',
        'Miền Bắc dùng hoa mai, còn miền Nam dùng hoa đào',
        'Cả hai miền đều chuộng hoa cúc vàng đặt trên bàn thờ',
        'Miền Bắc dùng cây quất, còn miền Nam dùng hoa đào',
      ],
      answer: 0,
      dan: 'During Lunar New Year, families gather for reunion, decorate homes with peach blossoms in the North and apricot blossoms in the South, and place offerings on the ancestral altar.',
    },
    {
      q: 'Tiền lì xì trong phong bao đỏ tượng trưng cho điều gì?',
      options: [
        'May mắn và sự thịnh vượng trong năm mới',
        'Sự trưởng thành thêm một tuổi của trẻ nhỏ',
        'Lòng hiếu thảo của con cháu với ông bà',
        'Ước nguyện học hành đỗ đạt của người trẻ',
      ],
      answer: 0,
      dan: 'Children receive lucky money in red envelopes, symbolizing fortune and prosperity.',
    },
    {
      q: 'Bài nhắc tới đóng góp nào của 54 dân tộc thiểu số?',
      options: [
        'Phong tục riêng, từ văn hoá cồng chiêng tới múa rối nước',
        'Các món ăn truyền thống góp vào mâm cỗ ngày Tết cổ truyền',
        'Nghề dệt lụa và làm gốm lâu đời ở vùng châu thổ đồng bằng',
        'Những lễ hội chùa chiền được tổ chức vào mỗi độ xuân về',
      ],
      answer: 0,
      dan: 'Vietnam’s 54 ethnic minorities contribute unique customs, from gong culture recognized by UNESCO to water puppet shows in the Red River Delta.',
    },
    {
      q: 'Bài kết lại rằng điều gì tiếp tục định hình bản sắc Việt Nam dù có hiện đại hoá và toàn cầu hoá?',
      options: [
        'Những giá trị như hiếu đạo, kính người già và hoà hợp cộng đồng',
        'Các lễ hội lớn vẫn được tổ chức đều đặn hằng năm khắp cả nước',
        'Những nghề thủ công truyền thống đang dần được hồi sinh trở lại',
        'Nền ẩm thực Việt Nam ngày càng nổi tiếng ở nhiều nơi trên thế giới',
      ],
      answer: 0,
      dan: 'Values like filial piety, respect for elders, and community harmony shaped by Confucianism, Buddhism, and Taoism continue to define Vietnamese identity despite modernization and globalization.',
    },
  ],

  'e-learning-vstep': [
    {
      q: 'Vì sao học trực tuyến chuyển từ thứ xa xỉ thành nhu cầu thiết yếu?',
      options: [
        'Vì đại dịch đã làm thay đổi nền giáo dục trên toàn thế giới',
        'Vì học phí các khoá trực tuyến rẻ hơn nhiều so với trước',
        'Vì nhiều trường đại học lớn đã ngừng hẳn việc dạy trực tiếp',
        'Vì công nghệ thực tế ảo nay đã đủ rẻ để phổ cập tới trường',
      ],
      answer: 0,
      dan: 'The pandemic transformed education worldwide, making e-learning a necessity rather than a luxury.',
    },
    {
      q: 'Bài coi mô hình nào là lý tưởng?',
      options: [
        'Học kết hợp, phối hợp dạy trực tiếp với các công cụ số',
        'Học hoàn toàn tự định nhịp, không có giờ giấc cố định',
        'Học trực tuyến toàn phần theo đúng thời gian thực',
        'Học chủ yếu qua các khoá MOOC miễn phí trên mạng',
      ],
      answer: 0,
      dan: 'Blended learning emerged as the ideal hybrid model, combining face-to-face instruction with digital tools.',
    },
    {
      q: 'Khoảng cách số gây ra hậu quả gì?',
      options: [
        'Học sinh nông thôn thiếu kết nối, bất bình đẳng giáo dục rộng thêm',
        'Giáo viên phải đứng lớp nhiều giờ hơn hẳn so với trước kia',
        'Các trường buộc phải mua thêm nhiều phần mềm có bản quyền',
        'Chất lượng bài giảng bị giảm sút đồng loạt ở mọi cấp học',
      ],
      answer: 0,
      dan: 'However, the digital divide left rural students without connectivity or bandwidth, widening educational inequality.',
    },
    {
      q: 'Những lo ngại nào dẫn tới giải pháp giám sát thi bằng AI?',
      options: [
        'Riêng tư, an ninh mạng, đạo văn và gian lận trong thi cử',
        'Tốc độ đường truyền và chất lượng hình ảnh khi thi',
        'Chi phí nền tảng và bản quyền của nội dung bài giảng',
        'Sự trì hoãn của người học và tỉ lệ bỏ khoá quá cao',
      ],
      answer: 0,
      dan: 'Concerns about privacy, cybersecurity, plagiarism, and cheating led to AI proctoring solutions.',
    },
  ],

  'health-medicine-vstep': [
    {
      q: 'Bài kết lại rằng tuổi thọ khoẻ mạnh phụ thuộc vào những gì?',
      options: [
        'Không chỉ y học, mà cả thói quen ngủ đủ, tránh thuốc lá và rượu bia',
        'Chủ yếu vào chất lượng của bệnh viện gần nơi mình đang sinh sống',
        'Chủ yếu vào việc tiêm đầy đủ các loại vắc-xin theo đúng lịch hẹn',
        'Chủ yếu vào yếu tố di truyền được thừa hưởng từ những người thân',
      ],
      answer: 0,
      dan: 'A healthy lifespan depends not only on medicine and healthcare systems but also on daily habits, such as getting enough sleep, avoiding smoking or excess alcohol, and practicing good hygiene and sanitation.',
    },
    {
      q: 'Theo bài, khi nào thì cần đơn thuốc kháng sinh?',
      options: [
        'Khi bị nhiễm khuẩn; còn đau họng nhẹ thì bài thuốc tự nhiên có thể đủ',
        'Khi cơn sốt cao kéo dài liên tục hơn ba ngày mà không hạ được',
        'Khi kết quả chụp X-quang cho thấy có dấu hiệu bất thường ở phổi',
        'Khi bệnh nhân phải nhập viện cấp cứu và nằm ở khu hồi sức',
      ],
      answer: 0,
      dan: 'For minor issues like a sore throat, a natural remedy might suffice, but a bacterial infection often requires a prescription for an antibiotic from a pharmacy.',
    },
    {
      q: 'Bác sĩ đưa ra chẩn đoán bằng cách nào?',
      options: [
        'Qua xét nghiệm máu hoặc chụp X-quang',
        'Qua hỏi kỹ bệnh sử của cả gia đình',
        'Qua đo huyết áp và bắt mạch cho bệnh nhân',
        'Qua theo dõi người bệnh trong hai mươi tư giờ',
      ],
      answer: 0,
      dan: 'There, a physician can make a diagnosis through a blood test or x-ray.',
    },
    {
      q: 'Bài nói gì về sức khoẻ tinh thần?',
      options: [
        'Đang được chú ý hơn, có nhà tâm lý trị liệu cho căng thẳng và lo âu',
        'Vẫn đang bị bỏ qua hoàn toàn trong hệ thống y tế hiện nay',
        'Chỉ cần tập thể dục đều đặn mỗi ngày là có thể tự cải thiện',
        'Là vấn đề riêng của những người đã bước vào tuổi cao niên',
      ],
      answer: 0,
      dan: 'Moreover, mental health is gaining attention, with psychologists providing therapy for stress, anxiety, and depression.',
    },
  ],

  'technology-internet-vstep': [
    {
      q: 'Bài so sánh máy tính vài thập kỷ trước với thiết bị ngày nay ra sao?',
      options: [
        'Trước cồng kềnh, nay ai cũng mang điện thoại thông minh hoặc máy tính bảng',
        'Trước rất đắt tiền, nay giá đã rẻ đi nhiều nên nhà nào cũng sắm được',
        'Trước chỉ dùng trong công sở, nay đã có mặt ở khắp các trường học',
        'Trước chạy rất chậm chạp, nay tốc độ xử lý nhanh gấp hàng trăm lần',
      ],
      answer: 0,
      dan: 'A few decades ago, computers were bulky, but today, everyone carries a smartphone or tablet.',
    },
    {
      q: 'Bài nêu ba biện pháp bảo vệ nào trước tin tặc?',
      options: [
        'Cài tường lửa, chọn mật khẩu mạnh và dùng xác thực hai lớp',
        'Đổi mật khẩu hằng tuần, khoá máy khi rời đi và sao lưu',
        'Dùng mạng riêng ảo, xoá cookie định kỳ và tắt định vị',
        'Cập nhật phần mềm, quét vi-rút và mã hoá toàn bộ ổ cứng',
      ],
      answer: 0,
      dan: 'Hackers use malware, viruses, and phishing to steal data, so installing a firewall, choosing a strong password, and using two-factor authentication for login are crucial.',
    },
    {
      q: 'Bài cảnh báo những mặt trái nào?',
      options: [
        'Bắt nạt trên mạng xã hội và nghiện làm tăng thời gian nhìn màn hình',
        'Lỗi phần mềm khiến hệ thống treo và phải khởi động lại nhiều lần',
        'Chi phí mua sắm thiết bị công nghệ ngày càng trở nên đắt đỏ hơn',
        'Thiếu người có đủ trình độ để vận hành các công nghệ mới nhất',
      ],
      answer: 0,
      dan: 'Yet, we must be mindful of the downsides, such as cyberbullying on social media and addiction that increases screen time.',
    },
    {
      q: 'Những công nghệ tiên tiến nào đang thúc đẩy tự động hoá?',
      options: [
        'Trí tuệ nhân tạo, thuật toán học máy và ngành người máy',
        'Thực tế ảo và thực tế tăng cường trong giải trí',
        'Điện toán đám mây và các nền tảng thương mại điện tử',
        'Mạng không dây băng thông rộng phủ khắp mọi nơi',
      ],
      answer: 0,
      dan: 'Beyond basic tech, cutting-edge innovations like artificial intelligence, machine learning algorithms, and robotics are driving automation.',
    },
  ],

  'environment-conservation-vstep': [
    {
      q: 'Theo bài, chuỗi nhân quả dẫn tới nóng lên toàn cầu bắt đầu từ đâu?',
      options: [
        'Đốt than và dầu, thải khí nhà kính giữ nhiệt lại trong khí quyển',
        'Chặt phá rừng làm mất đi khả năng hấp thụ khí carbon của cây',
        'Xả chất thải công nghiệp xuống các dòng sông và vùng cửa biển',
        'Săn bắt trái phép làm mất cân bằng sinh thái ở nhiều khu rừng',
      ],
      answer: 0,
      dan: 'The burning of fossil fuels like coal and oil creates massive greenhouse gas emissions, trapping heat in the atmosphere and causing global warming.',
    },
    {
      q: 'Nhiệt độ toàn cầu tăng dẫn tới hậu quả gì cho các thành phố ven biển?',
      options: [
        'Sông băng tan, mực nước biển dâng lên và đe doạ xói lở bờ',
        'Bão nhiệt đới xuất hiện quanh năm chứ không theo mùa nữa',
        'Nguồn nước ngọt sinh hoạt bị nhiễm mặn gần như hoàn toàn',
        'Dân cư buộc phải di dời vào sâu bên trong phía đất liền',
      ],
      answer: 0,
      dan: 'As the global temperature rises, glaciers melt, and sea levels rise, threatening coastal cities with erosion.',
    },
    {
      q: 'Điều gì đẩy nhiều loài động thực vật tới bờ tuyệt chủng?',
      options: [
        'Phá rừng và săn trộm phá huỷ môi trường sống của thú hoang',
        'Ô nhiễm không khí ngày càng nặng ở các đô thị lớn đông dân',
        'Nhiệt độ nước biển tăng nhanh hơn khả năng thích nghi của loài',
        'Việc du nhập những loài ngoại lai lấn át loài bản địa sẵn có',
      ],
      answer: 0,
      dan: 'Deforestation and poaching destroy wildlife habitats, pushing many species of flora and fauna toward extinction.',
    },
    {
      q: 'Giải pháp năng lượng mà bài đề xuất là gì?',
      options: [
        'Thay nhiên liệu hoá thạch bằng điện mặt trời, tua-bin gió và thuỷ điện',
        'Xây thêm các nhà máy điện hạt nhân công suất lớn ở vùng ven biển',
        'Nhập khẩu năng lượng sạch từ những nước đã đi trước về công nghệ',
        'Cắt giảm một nửa mức tiêu thụ điện năng trên phạm vi toàn cầu',
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
        'Quan hệ rộng trong ngành cộng thêm một chút may mắn nhất định',
        'Sự sẵn sàng làm thêm giờ một cách thường xuyên và đều đặn',
        'Khả năng sử dụng ngoại ngữ và thành thạo các phần mềm văn phòng',
      ],
      answer: 0,
      dan: 'Building a successful career requires more than just a good qualification; it demands experience, soft skills like teamwork, and the ability to collaborate.',
    },
    {
      q: 'Hành trình nghề nghiệp thường bắt đầu bằng việc gì?',
      options: [
        'Ứng viên gửi hồ sơ cho nhà tuyển dụng và mong được mời phỏng vấn',
        'Ứng viên xin vào thực tập tại một công ty khởi nghiệp nhỏ trong ngành',
        'Ứng viên đăng ký tham gia một khoá đào tạo nghề ngắn hạn có chứng chỉ',
        'Ứng viên nhờ người quen trong nghề giới thiệu tới nơi đang cần người',
      ],
      answer: 0,
      dan: 'The journey often begins when an applicant sends a resume to an employer, hoping for a job interview.',
    },
    {
      q: 'Lãnh đạo tốt giúp nhân viên tránh được điều gì?',
      options: [
        'Kiệt sức, và giữ được cân bằng giữa công việc với cuộc sống',
        'Bị đánh giá thấp trong kỳ xét thưởng cuối năm của công ty',
        'Phải chuyển sang một bộ phận khác không đúng chuyên môn',
        'Đánh mất cơ hội được thăng tiến lên vị trí cao hơn trong ngành',
      ],
      answer: 0,
      dan: 'Good leadership helps employees avoid burnout and maintain a healthy work-life balance, especially when doing overtime.',
    },
    {
      q: 'Làm việc từ xa trở nên phổ biến giúp nhân viên tránh được điều gì?',
      options: [
        'Quãng đường đi làm dài phải vượt qua mỗi ngày',
        'Những cuộc họp kéo dài mà không thật sự cần thiết',
        'Áp lực trực tiếp từ người quản lý ngồi ngay bên cạnh',
        'Chi phí thuê nhà đắt đỏ ở gần khu vực trung tâm',
      ],
      answer: 0,
      dan: 'With the rise of technology, remote work and telecommuting have become popular, allowing staff to avoid a long daily commute.',
    },
  ],

  'space-exploration-vstep': [
    {
      q: 'Phi hành gia phải luyện tập trong thiết bị nào, và để chuẩn bị cho điều gì?',
      options: [
        'Trong buồng mô phỏng, để quen không trọng lực và bức xạ vũ trụ',
        'Trong đài quan sát, để học cách sử dụng kính thiên văn cỡ lớn',
        'Trong khoang tàu, để quen với lực đẩy rất mạnh lúc phóng lên',
        'Trong phòng thí nghiệm, để học cách phân tích mẫu vật thu về',
      ],
      answer: 0,
      dan: 'An astronaut or cosmonaut must undergo rigorous training in a simulator to prepare for the zero gravity environment and cosmic radiation.',
    },
    {
      q: 'Các tàu thăm dò và xe tự hành không người lái được gửi tới sao Hoả để tìm gì?',
      options: [
        'Dấu vết của nước hoặc của sự sống ngoài Trái Đất',
        'Các loại khoáng sản có thể khai thác và mang về',
        'Vị trí thích hợp để dựng thuộc địa cho con người',
        'Nguồn năng lượng mới thay thế cho Trái Đất dùng',
      ],
      answer: 0,
      dan: 'Unmanned probes and rovers are also sent to explore the surface of Mars, searching for signs of water or extraterrestrial life.',
    },
    {
      q: 'Vì sao một số nhà khoa học tin rằng con người sẽ lập thuộc địa trên hành tinh khác?',
      options: [
        'Để bảo đảm loài người sống sót nếu Trái Đất gặp thảm hoạ',
        'Để khai thác tài nguyên ở đó rồi chuyển ngược về Trái Đất',
        'Để giảm bớt sức ép dân số đang quá tải trên Trái Đất này',
        'Để nghiên cứu sự sống ngoài hành tinh ngay tại chỗ có nó',
      ],
      answer: 0,
      dan: 'Some scientists believe that in the future, humans will colonise habitable planets, building a colony to ensure survival if Earth faces a catastrophe.',
    },
    {
      q: 'Bài kết lại thế nào về du hành liên sao?',
      options: [
        'Vẫn là lý thuyết, nhưng công nghệ đang biến viễn tưởng thành hiện thực',
        'Sẽ thực hiện được ngay trong vòng vài thập kỷ sắp tới đây thôi',
        'Là điều bất khả thi với con người dù công nghệ tiến xa đến đâu',
        'Chỉ khả thi nếu trước đó tìm được một hành tinh sống được',
      ],
      answer: 0,
      dan: 'While interstellar travel across light years remains a theory in astrophysics, our technological advancements continue to expand our horizon, turning what was once science fiction into reality.',
    },
  ],

  'history-archaeology-vstep': [
    {
      q: 'Nhà khảo cổ dựng lại đời sống của tổ tiên bằng cách nào?',
      options: [
        'Nghiên cứu hiện vật cổ, đồ gốm và các mẫu hoá thạch',
        'Đọc lại những bản thảo được lưu trong kho tư liệu cổ',
        'Đối chiếu truyền thuyết dân gian với ghi chép lịch sử',
        'So sánh cấu trúc của các lâu đài xây thời trung cổ',
      ],
      answer: 0,
      dan: 'By examining ancient artifacts, pottery, and fossils, an archaeologist can reconstruct the lives of our ancestors.',
    },
    {
      q: 'Xã hội trung cổ được bài mô tả phân chia ra sao?',
      options: [
        'Nông dân làm ruộng, quý tộc và hiệp sĩ sống trong lâu đài có hào',
        'Thương nhân giàu có nắm quyền, còn nông dân đi làm thuê kiếm sống',
        'Tăng lữ đứng ra cai quản, dân thường phải phục dịch cho nhà thờ',
        'Nhà vua chia đều ruộng đất cho mọi tầng lớp trong vương quốc',
      ],
      answer: 0,
      dan: 'In the Middle Ages, medieval society was divided: peasants worked the land, while nobles and knights lived in stone castles protected by moats, defending their kingdom from siege.',
    },
    {
      q: 'Vũ khí mạnh hơn ở thời đồ đồng và đồ sắt dẫn tới điều gì?',
      options: [
        'Những trận chiến đẫm máu khi các vương quốc muốn mở rộng đế chế',
        'Sự lụi tàn của các bộ lạc săn bắt hái lượm còn sót lại thời đó',
        'Việc xây dựng những thành trì ngày càng kiên cố hơn để phòng thủ',
        'Sự ra đời của những hiệp ước hoà bình đầu tiên giữa các bộ tộc',
      ],
      answer: 0,
      dan: 'During the Bronze Age and Iron Age, societies developed stronger weapons like swords and spears, leading to bloody battles as kingdoms sought to conquer new territory and expand their empire.',
    },
    {
      q: 'Bài kết lại rằng nhờ những kỹ thuật như định tuổi bằng carbon, chúng ta làm được gì?',
      options: [
        'Bảo tồn di sản và lần theo tiến hoá loài người theo trình tự thời gian',
        'Xác định thật chính xác niên đại của mọi công trình kiến trúc cổ',
        'Chứng minh được rằng mọi truyền thuyết xưa đều có thật ngoài đời',
        'Tái tạo lại được ngôn ngữ mà những người tiền sử từng sử dụng',
      ],
      answer: 0,
      dan: 'Thanks to techniques like carbon dating, we can preserve our cultural heritage and trace human evolution chronologically, learning valuable lessons from our ancestors’ victories and defeats.',
    },
  ],

  'art-entertainment-vstep': [
    {
      q: 'Trước đêm công diễn, diễn viên phải chuẩn bị những gì?',
      options: [
        'Tập kịch bản, mặc đúng trang phục và hoá trang cho vai',
        'Gặp gỡ khán giả và trả lời phỏng vấn của báo chí',
        'Tự viết lại phần lời thoại cho nhân vật mình đóng',
        'Chọn nhạc nền phù hợp cho từng cảnh trong vở diễn',
      ],
      answer: 0,
      dan: 'Before opening night, they must rehearse the script and wear the correct costume and makeup.',
    },
    {
      q: 'Theo bài, khán giả phản ứng thế nào tuỳ vào chất lượng vở diễn?',
      options: [
        'Vở hay thì vỗ tay vang dội, còn vở dở thì có thể la ó phản đối',
        'Vở hay thì đứng dậy hoan hô, còn vở dở thì bỏ về ngay giữa chừng',
        'Vở hay thì lên tặng hoa diễn viên, còn vở dở thì ngồi im lặng',
        'Vở hay thì xin chữ ký của diễn viên, còn vở dở thì đòi lại tiền vé',
      ],
      answer: 0,
      dan: 'When the curtain falls, if the drama or comedy was good, the audience will give a loud applause; if it was bad, they might boo.',
    },
    {
      q: 'Ai cùng nhau làm nên một bộ phim theo bài?',
      options: [
        'Đạo diễn và nhà sản xuất tài năng',
        'Đạo diễn và diễn viên vai chính',
        'Nhà sản xuất và người viết kịch bản',
        'Nhà quay phim và người dựng phim',
      ],
      answer: 0,
      dan: 'A talented director and producer work together to create a movie with a thrilling plot, brave heroes, and evil villains.',
    },
    {
      q: 'Bài nói gì về sức mạnh của âm nhạc?',
      options: [
        'Dù là dàn nhạc cổ điển hay ca sĩ nhạc pop, giai điệu bắt tai đều lan xa',
        'Chỉ nhạc cổ điển mới thật sự được xem là nghệ thuật đúng nghĩa',
        'Âm nhạc hiện đại đang dần mất đi lượng khán giả trung thành',
        'Nhạc biểu diễn trực tiếp bao giờ cũng hay hơn nhạc đã thu âm',
      ],
      answer: 0,
      dan: 'Whether it is a classical orchestra playing a complex melody, a rock band going on tour, or a pop singer performing at a crowded festival, a good rhythm and catchy lyrics can go viral, turning musicians into idols for millions of fans.',
    },
  ],

  'crime-law-vstep': [
    {
      q: 'Thám tử tìm kiếm những gì tại hiện trường vụ án?',
      options: [
        'Manh mối như dấu vân tay hoặc một thứ vũ khí giấu kín',
        'Lời khai của những người dân sống ở khu vực xung quanh',
        'Hình ảnh từ camera giám sát của các nhà lân cận ghi lại',
        'Động cơ khiến nghi phạm quyết định thực hiện hành vi đó',
      ],
      answer: 0,
      dan: 'Detectives search the crime scene for a clue, like a fingerprint or a hidden weapon.',
    },
    {
      q: 'Công tố viên và luật sư bào chữa làm việc gì tại phiên toà?',
      options: [
        'Công tố viên đưa chứng cứ buộc tội, luật sư lập luận thân chủ vô tội',
        'Cả hai cùng thẩm vấn nhân chứng để cùng nhau tìm ra sự thật vụ án',
        'Công tố viên đề nghị mức án, còn luật sư xin toà xem xét giảm nhẹ',
        'Công tố viên điều tra thêm, còn luật sư đi thu thập bằng chứng mới',
      ],
      answer: 0,
      dan: 'A prosecutor presents evidence to prove the accused is guilty, while a defense lawyer or attorney tries to defend their client, arguing they are innocent.',
    },
    {
      q: 'Hình phạt mà thẩm phán có thể tuyên gồm những gì?',
      options: [
        'Phạt tiền nặng, cho hưởng án treo, hoặc ngồi tù trong vài năm',
        'Lao động công ích trong cộng đồng hoặc bị quản chế tại nhà',
        'Bồi thường cho người bị hại và phải xin lỗi một cách công khai',
        'Bị tước một số quyền công dân trong một thời hạn nhất định',
      ],
      answer: 0,
      dan: 'The punishment might be a heavy fine, probation, or being sent to prison for several years.',
    },
    {
      q: 'Bài kết lại rằng quy trình pháp lý này được thiết kế để làm gì?',
      options: [
        'Bảo vệ nạn nhân, trừng phạt người vi phạm và giữ công lý không thiên vị',
        'Giảm bớt số vụ phạm tội xảy ra hằng năm trên phạm vi cả nước',
        'Cho người từng phạm tội một cơ hội để làm lại cuộc đời của mình',
        'Củng cố niềm tin của dân chúng vào lực lượng cảnh sát điều tra',
      ],
      answer: 0,
      dan: 'This legal process is designed to protect victims, punish those who violate the rules, and ensure that justice is fair and unbiased.',
    },
  ],

  'society-culture-vstep': [
    {
      q: 'Theo bài, nghèo đói, thất nghiệp và thiếu giáo dục thường dẫn tới điều gì?',
      options: [
        'Mức sống thấp hơn cho nhóm thiểu số trong cộng đồng',
        'Làn sóng người dân tìm đường di cư ra nước ngoài',
        'Sự sụp đổ dần dần của các giá trị truyền thống cũ',
        'Mâu thuẫn giữa các thế hệ trong cùng một gia đình',
      ],
      answer: 0,
      dan: 'Issues such as poverty, unemployment, and lack of education often lead to a lower standard of living for the minority.',
    },
    {
      q: 'Người nhập cư và người tị nạn vẫn phải đối mặt với điều gì trong đời sống hằng ngày?',
      options: [
        'Định kiến và những khuôn mẫu có hại về họ',
        'Rào cản ngôn ngữ khi đi tìm kiếm việc làm',
        'Sự khác biệt về tín ngưỡng và lễ nghi tôn giáo',
        'Khó khăn khi tiếp cận dịch vụ y tế và bệnh viện',
      ],
      answer: 0,
      dan: 'Another significant social problem is discrimination and racism; many immigrants and refugees still encounter prejudice and harmful stereotypes in their daily lives.',
    },
    {
      q: 'Bài nêu giáo dục tốt giúp giới trẻ đạt được điều gì?',
      options: [
        'Có được việc làm ổn định và thu nhập tốt hơn',
        'Hoà nhập nhanh hơn vào môi trường đa văn hoá',
        'Giữ gìn được di sản văn hoá của dân tộc mình',
        'Tránh được mọi hình thức phân biệt đối xử',
      ],
      answer: 0,
      dan: 'For example, providing a good education can help the youth secure stable employment and a better income.',
    },
    {
      q: 'Bài kết lại rằng bằng cách nào ta có thể giảm xung đột và hy vọng vào hoà bình?',
      options: [
        'Tôn trọng sự đa dạng và phá bỏ rào cản về mặt ngôn ngữ',
        'Tăng viện trợ cho những quốc gia còn đang kém phát triển',
        'Thống nhất các giá trị văn hoá chung trên phạm vi toàn cầu',
        'Hạn chế bớt dòng người di cư đi lại giữa các quốc gia',
      ],
      answer: 0,
      dan: 'By respecting diversity and breaking down the language barrier, we can reduce conflict, resolve international issues, and hope for a world defined by peace rather than war.',
    },
  ],

  'media-press-vstep': [
    {
      q: 'Một nhà báo đáng tin cậy làm gì, nhất là khi đưa tin nóng?',
      options: [
        'Kiểm chứng nguồn tin để bài viết giữ được tính khách quan',
        'Đăng tin thật nhanh để dẫn trước các toà soạn đối thủ',
        'Phỏng vấn càng nhiều người liên quan tới vụ việc càng tốt',
        'Chờ cơ quan chức năng xác nhận rồi mới cho đăng bài',
      ],
      answer: 0,
      dan: 'A reliable journalist or reporter will verify their sources to provide an objective article, especially when covering breaking news.',
    },
    {
      q: 'Báo lá cải và các nền tảng trực tuyến dùng cách gì để hút người xem?',
      options: [
        'Tít giật gân câu khách, lan truyền tin giả và tin đồn chưa kiểm chứng',
        'Giảm giá gói đăng ký thuê bao hằng tháng cho độc giả trung thành',
        'Mời những người nổi tiếng đứng ra viết chuyên mục riêng cho báo',
        'Đăng thật nhiều ảnh và video thay vì các bài viết dài bằng chữ',
      ],
      answer: 0,
      dan: 'Tabloids and online platforms often use clickbait headlines to attract viewers, spreading fake news and unverified rumors.',
    },
    {
      q: 'Theo bài, các nhãn hàng trả tiền cho ai để quảng bá sản phẩm?',
      options: [
        'Những người có ảnh hưởng trên mạng',
        'Các tờ báo lớn có đông đảo độc giả',
        'Đội ngũ phóng viên ảnh chuyên nghiệp',
        'Các đài truyền hình phát sóng toàn quốc',
      ],
      answer: 0,
      dan: 'Brands even pay an influencer to promote their items.',
    },
    {
      q: 'Nhiều người cho rằng chính phủ cần làm gì, và nhằm mục đích gì?',
      options: [
        'Quản lý chặt truyền thông, để tin tức vừa hữu ích vừa đáng tin cậy',
        'Cấm hẳn mọi hình thức quảng cáo xuất hiện trên các mạng xã hội',
        'Tài trợ ngân sách cho các cơ quan báo chí hoạt động độc lập',
        'Buộc các nền tảng phải công khai thuật toán chọn nội dung',
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
        'Nguy hiểm nếu không được dùng kháng sinh từ thật sớm',
        'Chỉ trở nặng ở người cao tuổi và trẻ nhỏ dưới năm tuổi',
        'Cần chụp X-quang để phân biệt được với bệnh viêm phổi',
      ],
      answer: 0,
      dan: 'Sometimes, we only catch a common cold or the flu, which are highly contagious but easily cured with rest and warm fluids.',
    },
    {
      q: 'Nhiễm trùng nặng hoặc gãy xương có thể được điều trị bằng cách nào?',
      options: [
        'Uống thuốc kháng sinh, bó bột, hoặc thậm chí phải phẫu thuật',
        'Nghỉ ngơi hoàn toàn tại nhà và theo dõi diễn biến từng ngày',
        'Tập vật lý trị liệu kéo dài liên tục trong suốt nhiều tháng',
        'Truyền dịch và theo dõi huyết áp thường xuyên tại bệnh viện',
      ],
      answer: 0,
      dan: 'If a person suffers from a severe infection or a fracture, the treatment may involve taking an antibiotic pill, wearing a plaster cast, or even undergoing an operation.',
    },
    {
      q: 'Nhờ sự phát triển của vắc-xin, chúng ta làm được điều gì?',
      options: [
        'Ngăn nhiều bệnh chết người và chặn được cả đại dịch toàn cầu',
        'Rút ngắn thời gian nằm viện điều trị của từng người bệnh',
        'Giảm chi phí chăm sóc sức khoẻ cho toàn bộ xã hội nói chung',
        'Kéo dài tuổi thọ trung bình thêm khoảng chừng mười năm nữa',
      ],
      answer: 0,
      dan: 'Thanks to the development of vaccines, we can prevent many fatal diseases and stop a global pandemic.',
    },
    {
      q: 'Bài kết lại thế nào về việc quản lý căng thẳng và giữ vận động?',
      options: [
        'Quan trọng ngang với thuốc men khi muốn hồi phục hoàn toàn',
        'Chỉ thật sự cần thiết với người đang mắc bệnh mạn tính',
        'Nên bắt đầu sau khi đã điều trị dứt điểm bệnh đang mắc',
        'Là phần việc của nhà tâm lý chứ không phải của bác sĩ',
      ],
      answer: 0,
      dan: 'Managing stress and staying active are just as important as medicine when it comes to making a full recovery and enjoying life.',
    },
  ],

  'environment-climate-vstep': [
    {
      q: 'Theo bài, suốt nhiều thập kỷ con người đã làm gì với khí quyển?',
      options: [
        'Đốt than và dầu, thải khí độc cùng chất ô nhiễm lên bầu trời',
        'Phá rừng trên diện rộng để lấy đất canh tác và chăn nuôi',
        'Xả rác thải nhựa xuống đại dương ở khắp nơi trên thế giới',
        'Khai thác quá mức nguồn nước ngầm ở các vùng khô hạn',
      ],
      answer: 0,
      dan: 'For decades, humans have burned fossil fuels like coal and oil, releasing toxic emissions and harmful pollutants into the atmosphere.',
    },
    {
      q: 'Nhiệt độ tăng làm băng Bắc Cực tan, kéo theo hậu quả gì?',
      options: [
        'Mực nước biển dâng cao và đe doạ các thành phố ven biển',
        'Các dòng hải lưu đổi hướng một cách bất thường khó lường',
        'Nguồn cá ở những vùng biển gần cực suy giảm rất nhanh',
        'Bão tuyết xuất hiện ngay cả ở những vùng khí hậu ôn hoà',
      ],
      answer: 0,
      dan: 'Furthermore, rising temperatures cause the Arctic glaciers to melt, which leads to higher sea levels that threaten coastal cities.',
    },
    {
      q: 'Những hoạt động nào của con người gây hại cho sinh vật biển và rạn san hô?',
      options: [
        'Phá rừng, khai thác gỗ trái phép và đổ chất thải độc ra biển',
        'Đánh bắt cá bằng lưới kéo đáy trên những ngư trường lớn',
        'Xây cảng biển và các khu du lịch nghỉ dưỡng dọc bờ biển',
        'Vận tải hàng hải và những vụ tràn dầu từ tàu chở dầu lớn',
      ],
      answer: 0,
      dan: 'Deforestation, illegal logging, and dumping toxic waste into the ocean harm marine life and coral reefs.',
    },
    {
      q: 'Bài nêu mỗi người có thể góp phần bằng cách nào?',
      options: [
        'Chọn tái chế, dùng sản phẩm thân thiện môi trường, giảm rác hằng ngày',
        'Chuyển hẳn sang dùng xe điện thay cho xe chạy bằng xăng dầu',
        'Tham gia vào các tổ chức hoạt động vì môi trường ở địa phương',
        'Trồng cây gây rừng vào mỗi dịp cuối tuần cùng với cộng đồng',
      ],
      answer: 0,
      dan: 'Everyone can help by choosing to recycle, using eco-friendly products, and reducing their daily garbage.',
    },
  ],

  'science-technology-vstep': [
    {
      q: 'Nhà khoa học trong phòng thí nghiệm tiến hành thí nghiệm phức tạp nhằm mục đích gì?',
      options: [
        'Để chứng minh cho một lý thuyết hoàn toàn mới',
        'Để tạo ra sản phẩm rồi đem bán ra ngoài thị trường',
        'Để kiểm tra mức độ an toàn của các thiết bị đang dùng',
        'Để đào tạo lớp nghiên cứu viên trẻ tiếp nối công việc',
      ],
      answer: 0,
      dan: 'A scientist working in a laboratory might conduct a complex experiment to prove a new theory.',
    },
    {
      q: 'Vì sao an ninh mạng quan trọng?',
      options: [
        'Vì tin tặc có thể khai thác lỗi phần mềm hoặc dùng vi-rút trộm mật khẩu',
        'Vì mọi thiết bị ngày nay đều kết nối với nhau qua mạng không dây',
        'Vì dữ liệu ngày càng được lưu trữ nhiều trên các nền tảng đám mây',
        'Vì phần mềm mới ra đời quá nhanh khiến người dùng không theo kịp',
      ],
      answer: 0,
      dan: 'Cyber security is crucial because a hacker can exploit a software bug or use a computer virus to steal your password.',
    },
    {
      q: 'Robot hiện đại và trí tuệ nhân tạo đang dẫn tới điều gì?',
      options: [
        'Việc tự động hoá rất nhiều công việc',
        'Sự ra đời của mạng internet thế hệ mới',
        'Việc khám phá vũ trụ nhờ các vệ tinh',
        'Bước đột phá trong nghiên cứu về gen',
      ],
      answer: 0,
      dan: 'State-of-the-art robots and artificial intelligence are leading to the automation of many jobs.',
    },
    {
      q: 'Bài kết lại bằng nhận định nào?',
      options: [
        'Chừng nào con người còn phát minh, tương lai khoa học còn vô tận',
        'Khoa học sẽ sớm giải quyết được mọi vấn đề của cả nhân loại',
        'Tốc độ đổi mới hiện nay đang vượt quá khả năng kiểm soát',
        'Công nghệ đem lại nhiều rủi ro hơn là lợi ích cho con người',
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
        'Đưa tin nhanh hơn hẳn so với các đối thủ cạnh tranh',
        'Phản ánh đúng quan điểm của phần đông bạn đọc',
        'Tránh xa những chủ đề dễ gây tranh cãi trong xã hội',
      ],
      answer: 0,
      dan: 'Good journalism should always remain objective and rely on a reliable source.',
    },
    {
      q: 'Báo lá cải làm gì để hút thêm người xem và tăng lượng phát hành?',
      options: [
        'Dùng tít câu khách và lối viết giật gân',
        'Hạ giá bán của từng số báo phát hành',
        'Tăng thêm số trang và mở nhiều chuyên mục',
        'Mời chuyên gia viết các bài bình luận sâu',
      ],
      answer: 0,
      dan: 'Today, tabloids often use clickbait and sensationalism to attract more viewers and increase their circulation.',
    },
    {
      q: 'Vì sao bài nhấn mạnh phải kiểm chứng thông tin trước khi tin?',
      options: [
        'Vì mạng xã hội khiến tin giả và thông tin sai lan đi rất nhanh',
        'Vì các nền tảng không chịu trách nhiệm về nội dung đăng tải',
        'Vì ngay cả báo chí chính thống cũng có thể mắc phải sai sót',
        'Vì kiểm duyệt có thể làm mất đi một phần của sự thật vụ việc',
      ],
      answer: 0,
      dan: 'Unfortunately, this also leads to the rapid spread of fake news and misinformation.',
    },
    {
      q: 'Bài kết lại rằng bất chấp thiên kiến và kiểm duyệt, tự do ngôn luận bảo đảm điều gì?',
      options: [
        'Báo chí vẫn phơi bày được tiêu cực và thông tin cho công chúng',
        'Mọi công dân đều có quyền tự mình xuất bản tin tức của riêng họ',
        'Chính phủ không được phép can thiệp vào nội dung của báo chí',
        'Nhà báo được bảo vệ khỏi những vụ kiện tụng nhắm vào họ',
      ],
      answer: 0,
      dan: 'Despite the challenges of bias and censorship, freedom of speech ensures that the press can continue to expose corrupt practices, inform the public, and even entertain us with documentaries, podcasts, and infotainment.',
    },
  ],

  'crime-punishment-vstep': [
    {
      q: 'Bài phân biệt trộm cắp và đột nhập như thế nào?',
      options: [
        'Trộm cắp là kẻ trộm lấy xe, đột nhập là kẻ gian phá cửa vào nhà',
        'Trộm cắp thường xảy ra ban ngày, đột nhập thì xảy ra vào ban đêm',
        'Trộm cắp là tội nhẹ, còn đột nhập luôn bị xem là tội có bạo lực',
        'Trộm cắp do một người làm, đột nhập thì do cả một nhóm thực hiện',
      ],
      answer: 0,
      dan: 'More serious crimes include theft, where a thief might steal a car, or burglary, where a burglar breaks into a house.',
    },
    {
      q: 'Bị cáo có thể làm gì để chứng minh mình vô tội?',
      options: [
        'Phủ nhận cáo buộc và đưa ra bằng chứng ngoại phạm',
        'Yêu cầu toà thay đổi vị thẩm phán đang xét xử vụ án',
        'Đề nghị được bồi thường cho phía người bị thiệt hại',
        'Xin được xét xử kín để giữ danh dự cho gia đình mình',
      ],
      answer: 0,
      dan: 'The defendant might confess, or they might deny the charges and present an alibi to prove they are innocent.',
    },
    {
      q: 'Nếu không đủ chứng cứ thì kết cục ra sao?',
      options: [
        'Bị cáo sẽ được toà tuyên trắng án',
        'Vụ án tạm đình chỉ để điều tra thêm',
        'Bị cáo phải chịu một mức án treo',
        'Toà chuyển hồ sơ lên cấp cao hơn',
      ],
      answer: 0,
      dan: 'However, if there is not enough evidence, the defendant will be acquitted.',
    },
    {
      q: 'Bài kết lại rằng hệ thống này bảo đảm điều gì?',
      options: [
        'Tội phạm bị trừng phạt trong khi quyền của người vô tội được bảo vệ',
        'Mọi vụ án đều được đưa ra xét xử công khai trước toàn thể dân chúng',
        'Số vụ phạm tội trong xã hội sẽ giảm dần đều qua từng năm một',
        'Nạn nhân của các vụ án luôn được bồi thường một cách thoả đáng',
      ],
      answer: 0,
      dan: 'This system ensures that criminals are punished while protecting the rights of the innocent.',
    },
  ],

  'business-finance-vstep': [
    {
      q: 'Một doanh nghiệp thành công thường khởi đầu như thế nào?',
      options: [
        'Là công ty khởi nghiệp nhỏ của người có ý tưởng hay nhưng thiếu vốn',
        'Là một chi nhánh được tách ra từ một tập đoàn lớn đã có sẵn tên tuổi',
        'Là cơ sở sản xuất của gia đình rồi được mở rộng dần theo năm tháng',
        'Là kết quả của việc sáp nhập hai công ty nhỏ cùng ngành với nhau',
      ],
      answer: 0,
      dan: 'A successful enterprise usually starts as a small startup created by an entrepreneur who has a great idea but needs capital.',
    },
    {
      q: 'Để lớn lên, công ty có thể huy động vốn bằng cách nào?',
      options: [
        'Tìm nguồn tài trợ từ nhà đầu tư hoặc vay tiền của ngân hàng',
        'Bán bớt một phần tài sản cố định mà công ty đang nắm giữ',
        'Tăng giá bán sản phẩm hiện có ra thị trường trong nước',
        'Cắt giảm chi phí nhân sự và tinh gọn bộ máy vận hành',
      ],
      answer: 0,
      dan: 'To grow, the company might seek funding from an investor or take out a bank loan.',
    },
    {
      q: 'Tập đoàn lớn phát hành cổ phiếu để làm gì, và trả gì cho cổ đông khi lãi cao?',
      options: [
        'Để huy động tiền, và trả cổ tức cho từng cổ đông của công ty',
        'Để tăng giá trị thương hiệu, và thưởng thêm cổ phiếu cho họ',
        'Để mở rộng thị phần, và giảm giá bán sản phẩm cho khách hàng',
        'Để trả nợ cho ngân hàng, và tăng lương cho toàn bộ nhân viên',
      ],
      answer: 0,
      dan: 'A large corporation often issues stock on the stock market to raise money, paying a dividend to each shareholder when profits are high.',
    },
    {
      q: 'Lạm phát và suy thoái ảnh hưởng thế nào theo bài?',
      options: [
        'Lạm phát làm giảm nhu cầu tiêu dùng, suy thoái tác động cả ngành',
        'Cả hai đều làm tăng chi phí vay vốn của các doanh nghiệp lớn',
        'Lạm phát làm tăng doanh thu, còn suy thoái làm giảm lợi nhuận',
        'Cả hai đều khiến tỉ giá hối đoái trở nên ổn định hơn trước',
      ],
      answer: 0,
      dan: 'Factors like inflation can reduce consumer demand, while a recession impacts the whole industry.',
    },
  ],

  'economy-trade-vstep': [
    {
      q: 'Khi nào một nước có thặng dư thương mại?',
      options: [
        'Khi giá trị xuất khẩu vượt quá giá trị nhập khẩu',
        'Khi giá trị nhập khẩu vượt quá giá trị xuất khẩu',
        'Khi cán cân ngân sách quốc gia đạt mức thặng dư',
        'Khi vốn đầu tư nước ngoài đổ vào tăng thật mạnh',
      ],
      answer: 0,
      dan: 'When a country’s exports exceed its imports, it enjoys a trade surplus; otherwise, it faces a deficit.',
    },
    {
      q: 'Thời kỳ bùng nổ kinh tế mang lại những gì?',
      options: [
        'Tăng việc làm, nhu cầu tiêu dùng và đầu tư trực tiếp từ nước ngoài',
        'Tăng nguồn thu từ thuế và mở rộng chi tiêu công của chính phủ',
        'Tăng lãi suất ngân hàng và mức tiết kiệm của các hộ gia đình',
        'Tăng kim ngạch xuất khẩu và giảm bớt hàng hoá phải nhập về',
      ],
      answer: 0,
      dan: 'A period of economic boom increases employment, consumer demand, and foreign direct investment (FDI).',
    },
    {
      q: 'Để giữ thế cân bằng, ngân hàng trung ương và chính phủ dùng công cụ nào?',
      options: [
        'Ngân hàng dùng chính sách tiền tệ chỉnh lãi suất, chính phủ dùng tài khoá',
        'Ngân hàng chỉnh tỉ giá hối đoái, còn chính phủ chỉnh thuế hàng nhập khẩu',
        'Cả hai bên cùng nhau điều chỉnh mức lương tối thiểu theo từng vùng',
        'Ngân hàng phát hành trái phiếu, còn chính phủ đi vay của nước ngoài',
      ],
      answer: 0,
      dan: 'To maintain an equilibrium, the central bank uses monetary policy to adjust the interest rate, while the government relies on fiscal policy, adjusting its budget and tax revenue.',
    },
    {
      q: 'Theo kinh tế học vĩ mô, GDP là chỉ số then chốt của điều gì?',
      options: [
        'Mức tăng trưởng tổng thể của một quốc gia',
        'Mức sống trung bình của người dân trong nước',
        'Sức mua thực tế của đồng tiền nội tệ',
        'Quy mô của khu vực sản xuất công nghiệp',
      ],
      answer: 0,
      dan: 'Macroeconomics shows that a country’s GDP is a key indicator of its overall growth.',
    },
  ],

  'transport-logistics-vstep': [
    {
      q: 'Các công ty kho vận điều đội xe tải để làm gì?',
      options: [
        'Chở hàng từ kho lớn tới các cửa hàng bán lẻ',
        'Giao hàng thẳng tới tận tay từng người tiêu dùng',
        'Đưa hàng hoá ra cảng để làm thủ tục xuất khẩu',
        'Thu gom hàng từ những nhà sản xuất quy mô nhỏ',
      ],
      answer: 0,
      dan: 'They dispatch a fleet of trucks to transport cargo from a massive warehouse to a retail store.',
    },
    {
      q: 'Hàng hoá đi quốc tế được vận chuyển bằng phương tiện nào?',
      options: [
        'Hãng hàng không hoặc công-ten-nơ đặt trên tàu lớn',
        'Các tuyến đường sắt chạy xuyên qua nhiều quốc gia',
        'Đội xe tải chuyên chạy những chặng đường thật dài',
        'Kho trung chuyển đặt ngay tại khu vực cửa khẩu',
      ],
      answer: 0,
      dan: 'Sometimes, freight is moved globally by an airline or a shipping container on a large vessel.',
    },
    {
      q: 'Hỏng xe hoặc va chạm gây hậu quả gì?',
      options: [
        'Chậm trễ giao hàng, ảnh hưởng cả nhà phân phối lẫn người tiêu dùng',
        'Làm tăng chi phí bảo hiểm phải đóng cho toàn bộ đội xe của hãng',
        'Buộc phải đổi sang tuyến đường vận chuyển khác dài hơn nhiều',
        'Làm hư hỏng phần hàng hoá đang được xếp trong công-ten-nơ',
      ],
      answer: 0,
      dan: 'A breakdown or a collision can cause a severe delay in the delivery schedule, affecting both the distributor and the consumer.',
    },
    {
      q: 'Các nhà quy hoạch hiện đang tập trung vào điều gì?',
      options: [
        'Giao thông đô thị bền vững, khuyến khích đi chung xe và dùng xe điện',
        'Mở rộng thêm mạng lưới đường cao tốc nối liền các tỉnh với nhau',
        'Xây thêm kho bãi ở những vị trí gần trung tâm của thành phố',
        'Số hoá toàn bộ quy trình quản lý chuỗi cung ứng hàng hoá',
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
        'Để con cái được học ở những ngôi trường tốt hơn',
        'Để tránh thiên tai thường xảy ra ở vùng nông thôn',
        'Để tiếp cận các dịch vụ y tế hiện đại hơn ở đô thị',
      ],
      answer: 0,
      dan: 'Every year, rural-to-urban migration brings thousands of people to a bustling metropolis in search of better employment and a higher standard of living.',
    },
    {
      q: 'Quá tải dân số dẫn tới gì?',
      options: [
        'Xe buýt chật cứng, tắc đường nặng và thiếu nhà ở giá phải chăng',
        'Giá đất tăng vọt và các khu công nghiệp mở rộng ra vùng ven',
        'Trường học và bệnh viện trong thành phố rơi vào cảnh quá tải',
        'Nguồn nước sạch cung cấp cho thành phố dần dần cạn kiệt đi',
      ],
      answer: 0,
      dan: 'Overpopulation leads to overcrowded public transport, severe traffic congestion, and a serious shortage of affordable housing.',
    },
    {
      q: 'Dù có nhiều vấn đề, thành phố vẫn mang lại điều gì?',
      options: [
        'Sự tiện lợi, đời sống văn hoá giải trí đa dạng và tiện ích tốt',
        'Cơ hội việc làm phù hợp với mọi trình độ và mọi lứa tuổi',
        'Môi trường sống an toàn hơn hẳn so với ở vùng nông thôn',
        'Chi phí sinh hoạt rẻ dần đi theo thời gian sống lâu tại đó',
      ],
      answer: 0,
      dan: 'Despite these problems, cities offer incredible convenience, diverse cultural entertainment, and excellent amenities.',
    },
    {
      q: 'Bài nêu chính quyền phải làm gì?',
      options: [
        'Giải quyết bất bình đẳng, giữ không gian xanh và nâng cấp hạ tầng',
        'Hạn chế bớt dòng người nhập cư đổ về thành phố mỗi năm một đông',
        'Xây thêm nhiều toà nhà cao tầng ở khu vực vùng ven của đô thị',
        'Di dời toàn bộ các khu công nghiệp ra khỏi địa bàn nội thành',
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
        'Đài quan sát dựng trên đỉnh núi cao',
        'Đồng hồ mặt trời cùng với la bàn',
      ],
      answer: 0,
      dan: 'Early astronomers used a simple telescope to observe a distant star, a moving planet, or a beautiful constellation.',
    },
    {
      q: 'Con người phóng tên lửa mang tàu thăm dò tới sao Hoả để tìm gì?',
      options: [
        'Dấu hiệu của sự sống ngoài Trái Đất',
        'Nguồn nước có thể khai thác được ở đó',
        'Địa điểm hạ cánh cho các phi hành gia',
        'Khoáng sản quý hiếm nằm trên bề mặt',
      ],
      answer: 0,
      dan: 'We launch a powerful rocket to send a probe or a rover to study the surface of Mars, looking for signs of extraterrestrial life.',
    },
    {
      q: 'Một ngôi sao đang tàn tạo ra hiện tượng gì?',
      options: [
        'Nổ thành siêu tân tinh và để lại một tinh vân rực sáng',
        'Co dần lại cho tới khi thành một hố đen khổng lồ',
        'Tan ra thành bụi vũ trụ trôi trong khoảng chân không',
        'Biến thành một thiên thạch bay quanh theo quỹ đạo cũ',
      ],
      answer: 0,
      dan: 'Out in the vast vacuum of space, incredible phenomena occur: a dying star explodes as a supernova, leaving behind a glowing nebula, while a massive black hole traps everything, even light.',
    },
    {
      q: 'Du hành vũ trụ thương mại phát triển dẫn tới kế hoạch gì?',
      options: [
        'Một số công ty dự tính xây thuộc địa ngay trên Mặt Trăng',
        'Đưa khách du lịch lên thăm Trạm Vũ trụ Quốc tế mỗi năm',
        'Khai thác khoáng sản từ những tiểu hành tinh gần Trái Đất',
        'Phóng thêm nhiều vệ tinh chuyên quan sát bề mặt Trái Đất',
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
        'Thuỷ điện lấy từ những con đập lớn xây trên các dòng sông',
        'Điện hạt nhân sản xuất tại các nhà máy có công suất rất lớn',
        'Năng lượng sinh khối và địa nhiệt khai thác ngay tại chỗ',
      ],
      answer: 0,
      dan: 'For decades, our main supply has been non-renewable fossil fuels, such as coal, oil, and natural gas.',
    },
    {
      q: 'Vì sao nguồn tái tạo như gió và mặt trời cần công nghệ pin tốt hơn?',
      options: [
        'Vì chúng phụ thuộc thời tiết, cần tích điện để giữ lưới ổn định',
        'Vì chi phí lắp đặt ban đầu cho chúng còn quá cao so với than',
        'Vì hiệu suất chuyển hoá của chúng hiện vẫn còn khá là thấp',
        'Vì cần truyền tải điện đi xa từ nơi sản xuất tới nơi tiêu thụ',
      ],
      answer: 0,
      dan: 'However, renewable sources like wind and solar depend on the weather, so we need better battery technology to store power and keep the grid stable during a blackout.',
    },
    {
      q: 'Kỹ sư xây dựng những gì để tạo ra điện sạch?',
      options: [
        'Đập lớn cho thuỷ điện, hoặc mạng tua-bin gió và tấm pin mặt trời',
        'Nhà máy điện chạy bằng khí theo chu trình hỗn hợp hiện đại',
        'Các trạm địa nhiệt đặt ở những vùng có hoạt động núi lửa',
        'Nhà máy đốt sinh khối từ phụ phẩm của ngành nông nghiệp',
      ],
      answer: 0,
      dan: 'Engineers build a giant dam for hydroelectric power, or install a vast network of wind turbines and solar panels to generate clean electricity.',
    },
    {
      q: 'Bài nêu mỗi công dân có thể giảm dấu chân carbon bằng cách nào?',
      options: [
        'Cải thiện cách nhiệt, chọn xe lai, hoặc đơn giản là tắt bớt đèn',
        'Chuyển sang dùng hoàn toàn điện mặt trời lắp ngay tại nhà mình',
        'Hạn chế đi lại bằng phương tiện cá nhân trong các chuyến ngắn',
        'Ưu tiên mua những mặt hàng được sản xuất ngay ở trong nước',
      ],
      answer: 0,
      dan: 'By improving insulation to increase efficiency, choosing a hybrid vehicle, or simply turning off lights to conserve power, we can significantly reduce our carbon footprint and build a green, sustainable future.',
    },
  ],

  'history-civilizations-vstep': [
    {
      q: 'Phát minh nào giúp con người thôi sống du mục và lập nơi định cư lâu dài?',
      options: [
        'Nghề nông',
        'Chữ viết',
        'Kim loại',
        'Bánh xe',
      ],
      answer: 0,
      dan: 'Long ago, people were nomads, but the invention of agriculture allowed them to build a permanent settlement.',
    },
    {
      q: 'Nhà khảo cổ khai quật phế tích cổ để làm gì?',
      options: [
        'Tìm ngôi mộ ẩn giấu hoặc hiện vật đẹp, hé lộ bí mật của quá khứ',
        'Xác định cho thật chính xác niên đại của từng công trình cổ',
        'Bảo tồn các di tích khỏi bị phá huỷ bởi thời gian và con người',
        'Thu thập mẫu vật đem về trưng bày tại các bảo tàng quốc gia',
      ],
      answer: 0,
      dan: 'The archaeologist often excavates ancient ruins to uncover a hidden tomb or a beautiful artifact, revealing the secrets of the past.',
    },
    {
      q: 'Thời Phục Hưng nổi bật vì điều gì?',
      options: [
        'Là thời kỳ huy hoàng, khi nghệ thuật và khoa học cùng hưng thịnh',
        'Là thời kỳ chiến tranh và chinh phạt diễn ra liên miên khắp nơi',
        'Là thời kỳ các đế chế lớn lần lượt suy tàn rồi sụp đổ hoàn toàn',
        'Là thời kỳ chuyển từ chế độ nô lệ sang xã hội có nhiều tự do',
      ],
      answer: 0,
      dan: 'Throughout the chronological timeline of our world, we see periods of great glory, like the Renaissance, where art and science prospered.',
    },
    {
      q: 'Bài kết lại rằng cuộc đấu tranh của tổ tiên để lại điều gì?',
      options: [
        'Di sản lâu bền, nhắc ta đừng lặp lại sai lầm khiến xã hội xưa suy tàn',
        'Những hiệp ước hoà bình cho tới nay vẫn còn nguyên giá trị pháp lý',
        'Các nền dân chủ hiện đại đang tồn tại ở khắp nơi trên thế giới này',
        'Kho tàng thư tịch và tiểu sử của rất nhiều bậc danh nhân thuở trước',
      ],
      answer: 0,
      dan: 'Their fight for justice, equality, and democracy has left a lasting impact, reminding us not to repeat the mistakes that caused past societies to decline and collapse.',
    },
  ],

  'arts-literature-vstep': [
    {
      q: 'Nhà điêu khắc và kiến trúc sư làm những việc gì?',
      options: [
        'Nhà điêu khắc tạc kiệt tác từ đá, kiến trúc sư thiết kế bảo tàng mới',
        'Nhà điêu khắc dựng tượng đài, còn kiến trúc sư giám sát việc thi công',
        'Cả hai người cùng nhau thiết kế không gian trưng bày cho triển lãm',
        'Nhà điêu khắc vẽ phác thảo, còn kiến trúc sư dựng mô hình thu nhỏ',
      ],
      answer: 0,
      dan: 'A talented sculptor might carve a masterpiece from marble, while an architect focuses on the creative design of a new museum.',
    },
    {
      q: 'Ai viết kịch bản và ai hướng dẫn diễn viên trong buổi tập?',
      options: [
        'Nhà viết kịch viết kịch bản, còn đạo diễn hướng dẫn diễn viên',
        'Đạo diễn viết kịch bản, còn nhà viết kịch chỉ đạo phần diễn xuất',
        'Nhà sản xuất viết kịch bản, còn đạo diễn đi tuyển chọn diễn viên',
        'Diễn viên chính viết lời thoại, còn đạo diễn duyệt lại từng cảnh',
      ],
      answer: 0,
      dan: 'A playwright writes a script full of witty dialogue, and a director guides the actors during the rehearsal.',
    },
    {
      q: 'Nhà soạn nhạc và nhạc trưởng đảm nhận vai trò gì?',
      options: [
        'Nhà soạn nhạc viết giai điệu cho dàn nhạc, nhạc trưởng dẫn nhạc công',
        'Nhà soạn nhạc chỉ huy cả dàn nhạc, còn nhạc trưởng viết phần đệm',
        'Cả hai cùng nhau tuyển chọn nhạc công cho dàn nhạc giao hưởng',
        'Nhà soạn nhạc chọn nhạc mục, còn nhạc trưởng lo phần phối khí',
      ],
      answer: 0,
      dan: 'A brilliant composer writes the melody and harmony for an orchestra, and the conductor leads the musicians during a live concert.',
    },
    {
      q: 'Bài phân biệt nhà văn với nhà thơ như thế nào?',
      options: [
        'Nhà văn xuất bản sách hư cấu có cốt truyện phức tạp, nhà thơ viết thơ',
        'Nhà văn viết về đời thực, còn nhà thơ thì viết về những cảm xúc riêng',
        'Nhà văn thường viết dài, còn nhà thơ thì viết ngắn gọn và cô đọng',
        'Nhà văn xuất bản thành sách, còn nhà thơ đăng bài trên các tạp chí',
      ],
      answer: 0,
      dan: 'A writer or a novelist might publish a compelling fiction book with a complex plot, while a poet writes beautiful poetry.',
    },
  ],
};

export default STORY_QUIZ_B1;
