// File: scripts/data/reading_questions.mjs
// CÂU HỎI HIỂU Ý CHO VĂN BẢN ĐỌC DÀI (việc 5.3) — SOẠN TAY, TỪNG CÂU MỘT.
//
// Không có máy sinh nào chạm vào file này. Cùng nguyên tắc với
// voa_questions.mjs (kho bài nghe):
//   - Hỏi Ý, không hỏi việc nhớ một từ.
//   - Đáp án PHẢI có trong bài. Không hỏi thứ người đọc phải suy đoán ngoài bài.
//   - Lựa chọn sai phải HỢP LÝ: lấy từ nội dung có thật trong bài nhưng trả
//     lời sai câu hỏi.
//   - `why` dẫn NGUYÊN VĂN câu trong bài để người học kiểm lại được.
// ĐÃ LOẠI SAU KHI SOẠN: 'voa-doc-6560639' (Old Clothing… Vintage Stores) —
// sau khi lọc lại bằng luật làm sạch mới, thân bài còn 571 từ, tụt khỏi khoảng
// 600–1.000 từ mà việc 5.3 cam kết. Loại bài thay vì nới lời hứa.
export const CAU_HOI_DOC = {
  // 2024 Another Big Year for Space Exploration
  'voa-doc-7922471': [
    {
      q: 'Tàu Odysseus (tháng 2/2024) đánh dấu cột mốc nào?',
      opts: [
        'Cuộc đổ bộ mặt trăng đầu tiên của Mỹ sau hơn 50 năm, do tàu tư nhân thực hiện',
        'Lần đầu tiên con người quay lại mặt trăng',
        'Chuyến bay đầu tiên của NASA tới sao Hoả',
        'Vụ phóng thử đầu tiên của hệ thống Starship',
      ],
      a: 'Cuộc đổ bộ mặt trăng đầu tiên của Mỹ sau hơn 50 năm, do tàu tư nhân thực hiện',
      why: 'Bài viết: “a private spacecraft completed the first U.S. moon landing in more than 50 years” — và Odysseus do công ty Intuitive Machines phát triển, không phải NASA.',
    },
    {
      q: 'Tàu SLIM của Nhật hạ cánh LỘN NGƯỢC — vì sao JAXA vẫn coi thí nghiệm là thành công?',
      opts: [
        'Vì nó hạ cánh trong phạm vi 10 mét so với mục tiêu — đúng mục đích trình diễn công nghệ hạ cánh chính xác',
        'Vì nó là tàu đầu tiên của Nhật lên tới mặt trăng',
        'Vì nó thu thập được mẫu đất đá mang về Trái Đất',
        'Vì nó hoạt động lâu hơn dự kiến nhiều năm',
      ],
      a: 'Vì nó hạ cánh trong phạm vi 10 mét so với mục tiêu — đúng mục đích trình diễn công nghệ hạ cánh chính xác',
      why: 'Bài viết: “JAXA said the experiment was successful because SLIM was able to land within 10 meters of its planned target” — mục đích chuyến bay là “demonstrate new precision landing technology”.',
    },
    {
      q: 'Chuyến Chang’e 6 của Trung Quốc làm được điều chưa nước nào làm?',
      opts: [
        'Mang về mẫu đất đá lấy từ NỬA XA của mặt trăng',
        'Hạ cánh xuống mặt trăng lần đầu tiên',
        'Đưa phi hành gia lên nửa xa của mặt trăng',
        'Bay tới tiểu hành tinh Dimorphos',
      ],
      a: 'Mang về mẫu đất đá lấy từ NỬA XA của mặt trăng',
      why: 'Bài viết: “The successful return made China the first country to ever collect and bring back lunar samples from the far side of the moon.”',
    },
    {
      q: 'Tàu Hera của châu Âu được phóng đi để làm gì?',
      opts: [
        'Khảo sát xem cú đâm của tàu DART đã thay đổi tiểu hành tinh Dimorphos thế nào',
        'Đâm vào một tiểu hành tinh để đổi quỹ đạo của nó',
        'Tìm dấu hiệu sự sống trên mặt trăng Europa',
        'Đưa hàng tiếp tế lên Trạm Vũ trụ Quốc tế',
      ],
      a: 'Khảo sát xem cú đâm của tàu DART đã thay đổi tiểu hành tinh Dimorphos thế nào',
      why: 'Bài viết: “Hera aims to closely examine Dimorphos to get more details on how the strike by DART affected the asteroid.” Vụ đâm là việc DART đã làm từ 2022 — lựa chọn thứ hai tả nhầm nhiệm vụ.',
    },
  ],

  // Top Technology Stories of 2024
  'voa-doc-7907257': [
    {
      q: '“Personal agents” mà Microsoft công bố khác chatbot ở chỗ nào?',
      opts: [
        'Được thiết kế để tự hoàn thành công việc với rất ít hoặc không cần người tham gia',
        'Chỉ trả lời câu hỏi bằng giọng nói',
        'Chạy hoàn toàn trên điện thoại iPhone',
        'Chỉ dùng để dự báo thời tiết',
      ],
      a: 'Được thiết kế để tự hoàn thành công việc với rất ít hoặc không cần người tham gia',
      why: 'Bài viết: “personal agents designed to help users complete business activities with little or no human involvement” — và nói rõ chúng “expand on so-called chatbots”.',
    },
    {
      q: 'Ba đạo luật của bang California nhắm chống lại thứ gì?',
      opts: [
        'Deepfake — hình ảnh, video giả trong vận động tranh cử',
        'Việc thu thập dữ liệu cá nhân của người dùng',
        'Độc quyền của công cụ tìm kiếm',
        'Xe tải tự lái trên đường cao tốc công cộng',
      ],
      a: 'Deepfake — hình ảnh, video giả trong vận động tranh cử',
      why: 'Bài viết: “three legislative measures were enacted to ban the use of AI tools to create false images and videos during election campaigns. One main goal was to fight deepfakes.”',
    },
    {
      q: 'Toà án Mỹ kết luận gì về Google trong năm 2024?',
      opts: [
        'Vận hành công cụ tìm kiếm như một thế độc quyền, trả tiền cho hãng điện thoại để được cài làm mặc định',
        'Tạo deepfake trong bầu cử',
        'Bán ứng dụng TikTok trái phép',
        'Thu phí quá cao trên kho ứng dụng mà không vi phạm luật nào',
      ],
      a: 'Vận hành công cụ tìm kiếm như một thế độc quyền, trả tiền cho hãng điện thoại để được cài làm mặc định',
      why: 'Bài viết: “a federal judge ruled that Google had violated trade laws by operating its search engine as a monopoly. The ruling accused Google of paying smartphone makers to ensure that its search engine was set as the default system.”',
    },
    {
      q: 'Theo FAA, air taxi (taxi bay) thuộc loại phương tiện có đặc điểm gì?',
      opts: [
        'Chạy bằng điện, tự vận hành, cất và hạ cánh thẳng đứng',
        'Dùng động cơ phản lực siêu thanh',
        'Phải có hai phi công điều khiển',
        'Chỉ được bay trên biển',
      ],
      a: 'Chạy bằng điện, tự vận hành, cất và hạ cánh thẳng đứng',
      why: 'Bài viết: “They generally operate on their own on electrical power, with vertical take-off and landing abilities.”',
    },
  ],

  // NASA Identifies Cause of Mars Helicopter's Final Crash
  'voa-doc-7905637': [
    {
      q: 'Nguyên nhân khiến trực thăng Ingenuity rơi ở chuyến bay cuối là gì?',
      opts: [
        'Hệ thống định vị bằng camera không tìm đủ đặc điểm bề mặt ở vùng địa hình trơn trụi nên hạ xuống quá nhanh',
        'Hết pin giữa chuyến bay',
        'Bão bụi trên sao Hoả làm gãy cánh quạt',
        'Mất liên lạc với tàu Perseverance nên bay lạc',
      ],
      a: 'Hệ thống định vị bằng camera không tìm đủ đặc điểm bề mặt ở vùng địa hình trơn trụi nên hạ xuống quá nhanh',
      why: 'Bài viết: “the helicopter was traveling in an area with very few surface features for the camera to capture… the navigation system’s inability to pick up surface features made the helicopter descend too fast.” Mất liên lạc là HẬU QUẢ của cú rơi, không phải nguyên nhân.',
    },
    {
      q: 'Ingenuity lập cột mốc gì vào tháng 4 năm 2021?',
      opts: [
        'Máy bay đầu tiên bay có động cơ, có điều khiển trên một hành tinh khác',
        'Tàu đầu tiên hạ cánh xuống sao Hoả',
        'Máy bay đầu tiên chở thiết bị khoa học lên sao Hoả',
        'Chuyến bay dài 3 km đầu tiên trên sao Hoả',
      ],
      a: 'Máy bay đầu tiên bay có động cơ, có điều khiển trên một hành tinh khác',
      why: 'Bài viết: “Ingenuity became the first aircraft to complete a powered, controlled flight on another planet.” Bay 3 km/ngày là năng lực của Mars Chopper TƯƠNG LAI — chuyến dài nhất của Ingenuity chỉ 704 mét.',
    },
    {
      q: 'Sau vụ rơi, Ingenuity còn làm được gì?',
      opts: [
        'Vẫn thu và gửi về dữ liệu thời tiết cùng các dữ liệu khác',
        'Không còn liên lạc được nữa',
        'Tiếp tục bay nhưng ở độ cao thấp hơn',
        'Được Perseverance sửa lại cánh quạt',
      ],
      a: 'Vẫn thu và gửi về dữ liệu thời tiết cùng các dữ liệu khác',
      why: 'Bài viết: “Although the crash ended Ingenuity’s flight operations, NASA said it is still able to provide and send back weather information and other kinds of data.”',
    },
    {
      q: 'Bài học lớn mà quản lý dự án Teddy Tzanetos rút ra là gì?',
      opts: [
        'Thiết bị bay cho không gian không nhất thiết phải to hơn, nặng hơn, chống bức xạ mạnh hơn',
        'Mọi thiết bị bay tương lai phải có cánh quạt dự phòng',
        'Không nên bay ở vùng địa hình bằng phẳng',
        'Trực thăng không phù hợp với sao Hoả',
      ],
      a: 'Thiết bị bay cho không gian không nhất thiết phải to hơn, nặng hơn, chống bức xạ mạnh hơn',
      why: 'Bài viết: Tzanetos nói Ingenuity cho thấy “not everything needs to be bigger, heavier, and radiation-hardened” — và NASA đang thử nghiệm các thiết bị bay NHỎ, NHẸ hơn.',
    },
  ],

  // NASA Reconnects with Voyager, Longest Serving Mission in History
  'voa-doc-7872624': [
    {
      q: 'Sự cố tháng 10 với Voyager 1 xảy ra thế nào?',
      opts: [
        'Hệ thống bảo vệ lỗi tự kích hoạt khi NASA ra lệnh bật máy sưởi, khiến tàu chuyển sang phát tín hiệu qua bộ phát vô tuyến khác',
        'Con chip trong máy tính chính bị hỏng hoàn toàn',
        'Tàu bay ra khỏi tầm phủ sóng của Trái Đất',
        'Ăng-ten của tàu bị xoay lệch khỏi hướng Trái Đất',
      ],
      a: 'Hệ thống bảo vệ lỗi tự kích hoạt khi NASA ra lệnh bật máy sưởi, khiến tàu chuyển sang phát tín hiệu qua bộ phát vô tuyến khác',
      why: 'Bài viết: “Voyager 1’s fault protection system was activated when NASA sent a command for the spacecraft to turn on one of its heaters. This activation… led Voyager 1 to start sending signals to a different radio transmitter system.” Lỗi chip là sự cố TRƯỚC ĐÓ (tháng 4), đã sửa xong.',
    },
    {
      q: 'Vì sao mỗi chiều liên lạc với Voyager mất khoảng MỘT NGÀY?',
      opts: [
        'Vì khoảng cách quá lớn — Voyager 1 cách Trái Đất khoảng 24 tỉ km',
        'Vì băng tần S-band truyền chậm hơn X-band',
        'Vì tàu chỉ bật máy thu vài giờ mỗi ngày để tiết kiệm điện',
        'Vì tín hiệu phải chuyển tiếp qua một vệ tinh trung gian',
      ],
      a: 'Vì khoảng cách quá lớn — Voyager 1 cách Trái Đất khoảng 24 tỉ km',
      why: 'Bài viết: “Because of this great distance, NASA says its communication with the two Voyagers takes about one day to receive data, and another day to send information back.” S-band yếu hơn chứ bài không nói nó CHẬM hơn.',
    },
    {
      q: 'Năm 2013, NASA công bố Voyager 1 làm được điều gì?',
      opts: [
        'Vượt ranh giới hệ mặt trời, đi vào không gian liên sao (interstellar)',
        'Quan sát cận cảnh sao Thiên Vương và sao Hải Vương',
        'Hạ cánh xuống một tiểu hành tinh',
        'Quay trở về quỹ đạo Trái Đất',
      ],
      a: 'Vượt ranh giới hệ mặt trời, đi vào không gian liên sao (interstellar)',
      why: 'Bài viết: “In 2013, NASA announced Voyager 1 had crossed over the border dividing our solar system from interstellar space.” Quan sát Thiên Vương/Hải Vương là của Voyager 2, năm 1989.',
    },
    {
      q: 'Theo quản lý dự án Suzanne Dodd, một lý do khiến hai tàu Voyager hoạt động được lâu như vậy là gì?',
      opts: [
        'Các kỹ sư chế tạo đã trang bị nhiều hệ thống dự phòng',
        'NASA thay pin cho tàu định kỳ',
        'Tàu bay chậm nên ít hỏng hóc',
        'Phần mềm của tàu được viết lại hoàn toàn mỗi năm',
      ],
      a: 'Các kỹ sư chế tạo đã trang bị nhiều hệ thống dự phòng',
      why: 'Bài viết: “one reason the Voyagers have been operating for so long is that the engineers who built them provided multiple backup systems to avoid future problems.”',
    },
  ],

  // Study: Saturn's Moon Titan Has Huge Layer of Methane-filled Ice
  'voa-doc-7854402': [
    {
      q: 'Điều gì về các hố va chạm trên Titan khiến các nhà khoa học bất ngờ?',
      opts: [
        'Chúng ít hơn hẳn dự kiến (chỉ 90 hố trên cả mặt trăng này) và nông hơn hàng trăm mét',
        'Chúng sâu gấp đôi các mặt trăng khác',
        'Chúng chứa đầy nước lỏng',
        'Chúng chỉ xuất hiện ở một bán cầu',
      ],
      a: 'Chúng ít hơn hẳn dự kiến (chỉ 90 hố trên cả mặt trăng này) và nông hơn hàng trăm mét',
      why: 'Bài viết: “craters were hundreds of meters shallower… than scientists expected. In addition, only 90 craters were identified on the whole moon” — và Schurmeier nói “we expect to see many more impact craters”.',
    },
    {
      q: 'Nhóm nghiên cứu giải thích hiện tượng hố nông đi và biến mất bằng gì?',
      opts: [
        'Lớp vỏ băng nước dày 5–10 km có khí methane bị nhốt bên trong, làm ấm phần bên dưới bề mặt',
        'Mưa methane lỏng bào mòn miệng hố',
        'Núi lửa phun băng lấp đầy các hố',
        'Gió mạnh cuốn cát lấp hố',
      ],
      a: 'Lớp vỏ băng nước dày 5–10 km có khí methane bị nhốt bên trong, làm ấm phần bên dưới bề mặt',
      why: 'Bài viết: “Titan has a methane-filled icy crust that is from five to 10 kilometers thick” và lớp vỏ đó “warms Titan’s interior” gây thay đổi bề mặt nhanh bất ngờ.',
    },
    {
      q: 'Tốc độ nông đi của hố va chạm trên Titan được so sánh với gì trên Trái Đất?',
      opts: [
        'Tốc độ của các sông băng ấm chảy nhanh',
        'Tốc độ xói mòn của sóng biển',
        'Tốc độ trôi của các lục địa',
        'Tốc độ tan của băng Bắc Cực',
      ],
      a: 'Tốc độ của các sông băng ấm chảy nhanh',
      why: 'Bài viết: crater shallowing đang diễn ra ở tốc độ “that is close to that of fast-moving warm glaciers on Earth.”',
    },
    {
      q: 'NASA dự định làm gì vào năm 2028?',
      opts: [
        'Gửi Dragonfly — thiết bị bay kiểu trực thăng — tới thăm dò nhiều khu vực của Titan',
        'Cho tàu Cassini đâm vào khí quyển sao Thổ',
        'Đưa người đổ bộ lên Titan',
        'Phóng kính viễn vọng mới để quan sát Titan từ xa',
      ],
      a: 'Gửi Dragonfly — thiết bị bay kiểu trực thăng — tới thăm dò nhiều khu vực của Titan',
      why: 'Bài viết: “the U.S. space agency has plans to send another explorer to Titan in 2028… called Dragonfly… operates similar to a helicopter.” Cassini đã kết thúc nhiệm vụ từ 2017.',
    },
  ],

  // NASA to Launch Instruments to Study Water on Moon
  'voa-doc-7846588': [
    {
      q: 'Hai thiết bị khoa học trên tàu Lunar Trailblazer được thiết kế để làm gì?',
      opts: [
        'Lập bản đồ những vùng có nước trên mặt trăng và xác định nước đang ở dạng nào',
        'Khoan xuống bề mặt để lấy mẫu băng',
        'Đo nhiệt độ bên trong lõi mặt trăng',
        'Tìm vị trí hạ cánh cho phi hành gia',
      ],
      a: 'Lập bản đồ những vùng có nước trên mặt trăng và xác định nước đang ở dạng nào',
      why: 'Bài viết: “Both instruments are designed to map the moon in search of areas containing water, as well as what forms the water is in.” Đây là tàu BAY QUANH (orbiter) ở độ cao 100 km, không khoan gì cả.',
    },
    {
      q: 'Vì sao NASA coi việc tìm nước trên mặt trăng là quan trọng?',
      opts: [
        'Vì nước là tài nguyên cần thiết: có thể xử lý thành nước uống, làm mát thiết bị, tạo oxy thở, thậm chí làm nhiên liệu tên lửa',
        'Vì nước chứng minh mặt trăng từng có sự sống',
        'Vì cần nước để trồng cây trên mặt trăng',
        'Vì các nước đang tranh chấp chủ quyền vùng có nước',
      ],
      a: 'Vì nước là tài nguyên cần thiết: có thể xử lý thành nước uống, làm mát thiết bị, tạo oxy thở, thậm chí làm nhiên liệu tên lửa',
      why: 'Bài viết: “Astronauts could process it for drinking water, to cool equipment, to create breathable oxygen or even to make rocket fuel.”',
    },
    {
      q: 'Theo bài, dấu vết hoá học trong băng nói lên điều gì về NGUỒN GỐC của nước?',
      opts: [
        'Ammonia gợi ý nước đến từ sao chổi; sulfur gợi ý nước trồi lên từ sâu bên trong khi mặt trăng còn hoạt động núi lửa',
        'Sulfur gợi ý nước đến từ sao chổi; ammonia gợi ý nước từ núi lửa',
        'Cả hai chất đều chứng minh nước đến từ Trái Đất',
        'Băng trên mặt trăng không chứa chất nào ngoài nước',
      ],
      a: 'Ammonia gợi ý nước đến từ sao chổi; sulfur gợi ý nước trồi lên từ sâu bên trong khi mặt trăng còn hoạt động núi lửa',
      why: 'Bài viết: “the presence of ammonia in ice could suggest it came from comets… The presence of sulfur, on the other hand, could show it rose to the surface from deep inside the lunar interior.” Lựa chọn thứ hai đảo ngược đúng hai vế đó.',
    },
    {
      q: 'Nhà nghiên cứu Rachel Klima so sánh việc nghiên cứu băng mặt trăng với gì?',
      opts: [
        'Việc nghiên cứu sông băng giúp các nhà khoa học hiểu lịch sử cổ đại của Trái Đất',
        'Việc đọc vân gỗ để biết tuổi của cây',
        'Việc khảo sát đáy đại dương',
        'Việc phân tích thiên thạch rơi xuống Trái Đất',
      ],
      a: 'Việc nghiên cứu sông băng giúp các nhà khoa học hiểu lịch sử cổ đại của Trái Đất',
      why: 'Bài viết: “Klima compared such examinations to those involving glaciers that help scientists learn about Earth’s ancient history.”',
    },
  ],

  // NASA Rocket Confirms Existence of Earth's Hidden Electric Field
  'voa-doc-7782117': [
    {
      q: 'Tên lửa Endurance đã xác nhận điều gì?',
      opts: [
        'Sự tồn tại của trường điện “ambipolar” — trường năng lượng thứ ba của Trái Đất, bên cạnh trường hấp dẫn và từ trường',
        'Sự tồn tại của từ trường Trái Đất',
        'Nguyên nhân của cực quang ở Bắc Cực',
        'Việc tầng ozone đang mỏng đi ở hai cực',
      ],
      a: 'Sự tồn tại của trường điện “ambipolar” — trường năng lượng thứ ba của Trái Đất, bên cạnh trường hấp dẫn và từ trường',
      why: 'Bài viết: trường điện tìm kiếm “was one of three energy fields affecting Earth. The others are gravitational and magnetic.” Từ trường đã biết từ lâu, không phải thứ vừa được xác nhận.',
    },
    {
      q: 'Trường ambipolar được cho là nguyên nhân của hiện tượng nào?',
      opts: [
        '“Gió cực” — dòng hạt tích điện chảy đều đặn ra không gian phía trên hai cực Trái Đất',
        'Thuỷ triều ở các đại dương',
        'Bão từ làm mất điện diện rộng',
        'Mưa sao băng hàng năm',
      ],
      a: '“Gió cực” — dòng hạt tích điện chảy đều đặn ra không gian phía trên hai cực Trái Đất',
      why: 'Bài viết: trường ambipolar là “an influential driver of the polar wind… a steady outflow of charged particles into space that occurs above Earth’s poles.”',
    },
    {
      q: 'Điện áp đo được là bao nhiêu, và điều đó có ý nghĩa gì?',
      opts: [
        '0,55 volt — chỉ cỡ pin đồng hồ, nhưng “vừa đúng” để giải thích dòng hạt tạo nên gió cực',
        '550 volt — đủ mạnh để gây nguy hiểm cho vệ tinh',
        '0,55 volt — quá yếu nên các nhà khoa học kết luận trường này không tồn tại',
        '5,5 volt — bằng điện áp của một củ pin thông thường',
      ],
      a: '0,55 volt — chỉ cỡ pin đồng hồ, nhưng “vừa đúng” để giải thích dòng hạt tạo nên gió cực',
      why: 'Bài viết: đo được “an electrical voltage of 0.55 volts… about the same voltage used to power a watch battery. But… 0.55 volts was ‘just the right amount’ to explain the outflows of particles driving the polar wind.”',
    },
    {
      q: 'Collinson mô tả trường điện này bằng hình ảnh nào?',
      opts: [
        'Một “băng chuyền” nâng khí quyển lên không gian',
        'Một “tấm khiên” chặn gió mặt trời',
        'Một “tấm chăn” giữ ấm cho Trái Đất',
        'Một “nam châm khổng lồ” hút các hạt về hai cực',
      ],
      a: 'Một “băng chuyền” nâng khí quyển lên không gian',
      why: 'Bài viết: Collinson mô tả trường này như “a kind of ‘conveyor belt that’s lifting this atmosphere up into space.’”',
    },
  ],

  // Study: New Evidence Suggests Earth-like Exoplanet May Hold Liquid Ocean
  'voa-doc-7713189': [
    {
      q: 'Nghiên cứu mới kết luận LHS 1140 b nhiều khả năng là loại hành tinh nào?',
      opts: [
        'Một “siêu Trái Đất” — hành tinh đá lớn hơn Trái Đất, có thể là thế giới băng hoặc nước',
        'Một hành tinh khí kiểu “mini-Neptune”',
        'Một ngôi sao lùn nhỏ',
        'Một mặt trăng của hành tinh khác',
      ],
      a: 'Một “siêu Trái Đất” — hành tinh đá lớn hơn Trái Đất, có thể là thế giới băng hoặc nước',
      why: 'Bài viết: “the new study provides evidence that LHS 1140 b is more likely a super-Earth, a rocky planet bigger than Earth.” Mini-Neptune là giả thuyết của MỘT SỐ NGHIÊN CỨU CŨ.',
    },
    {
      q: 'Manh mối nào khiến các nhà nghiên cứu nghĩ hành tinh này có nhiều nước?',
      opts: [
        'Nó KÉM ĐẶC hơn mức dự kiến cho một hành tinh đá — ước tính 10–20% khối lượng có thể là nước',
        'Kính viễn vọng chụp được ảnh đại dương trên bề mặt',
        'Người ta thu được tín hiệu vô tuyến từ hành tinh',
        'Nó có màu xanh khi quan sát từ Trái Đất',
      ],
      a: 'Nó KÉM ĐẶC hơn mức dự kiến cho một hành tinh đá — ước tính 10–20% khối lượng có thể là nước',
      why: 'Bài viết: hành tinh “is less dense” than expected for a rocky, Earth-like body và “10 to 20 percent of LHS 1140 b’s mass might be made up of water.” Không có ảnh chụp trực tiếp nào — chữ dùng trong bài là “indirectly confirm”.',
    },
    {
      q: 'Vì sao phát hiện về khí quyển của LHS 1140 b được gọi là lần đầu tiên?',
      opts: [
        'Đây là lần đầu thấy DẤU HIỆU khí quyển ở một hành tinh đá/băng nằm trong vùng ở được',
        'Đây là lần đầu một hành tinh ngoài hệ mặt trời có khí quyển',
        'Đây là lần đầu đo được khí quyển toàn hydro',
        'Đây là lần đầu James Webb quan sát một hành tinh',
      ],
      a: 'Đây là lần đầu thấy DẤU HIỆU khí quyển ở một hành tinh đá/băng nằm trong vùng ở được',
      why: 'Bài viết: MacDonald nói “This is the first time we have ever seen a hint of an atmosphere on a habitable zone rocky or ice-rich exoplanet.” Và dấu hiệu là khí quyển GIÀU NITƠ, khác dự đoán hydro trước đây.',
    },
    {
      q: 'Theo René Doyon, cần bao lâu để xác nhận các phát hiện?',
      opts: [
        'Ít nhất một năm quan sát nữa để xác nhận có khí quyển; nhiều năm nữa cho CO₂ và nước lỏng',
        'Chỉ vài tuần phân tích lại dữ liệu cũ',
        'Mười năm để chế tạo kính viễn vọng mới',
        'Không thể xác nhận được vì hành tinh quá xa',
      ],
      a: 'Ít nhất một năm quan sát nữa để xác nhận có khí quyển; nhiều năm nữa cho CO₂ và nước lỏng',
      why: 'Bài viết: “at least one more year of observations will be needed ‘to confirm that LHS 1140 b has an atmosphere’” và việc xác nhận CO₂/nước lỏng “would likely require several years of observations.”',
    },
  ],

  // New Rocket Engine Could Cut Travel Time to Mars
  'voa-doc-7624454': [
    {
      q: 'Động cơ Pulsed Plasma Rocket (PPR) hứa hẹn rút ngắn chuyến đi tới sao Hoả thế nào?',
      opts: [
        'Từ ít nhất 200 ngày mỗi chiều xuống còn khoảng hai tháng mỗi chiều',
        'Từ hai tháng xuống còn 200 giờ',
        'Từ một năm xuống còn một tuần',
        'Từ 200 ngày xuống còn 20 ngày',
      ],
      a: 'Từ ít nhất 200 ngày mỗi chiều xuống còn khoảng hai tháng mỗi chiều',
      why: 'Bài viết: “a trip to Mars with existing spacecraft would take at least 200 days each way… it could reduce travel time to the Red Planet to about two months each way.”',
    },
    {
      q: '“Specific impulse” đo điều gì, và PPR so với hệ SLS của NASA ra sao?',
      opts: [
        'Đo hiệu suất động cơ (tính bằng giây) — PPR đạt khoảng 5.000, còn SLS dưới 500',
        'Đo lực đẩy — PPR mạnh gấp mười lần SLS',
        'Đo trọng lượng động cơ — PPR nhẹ bằng một phần mười SLS',
        'Đo giá thành — PPR rẻ bằng nửa SLS',
      ],
      a: 'Đo hiệu suất động cơ (tính bằng giây) — PPR đạt khoảng 5.000, còn SLS dưới 500',
      why: 'Bài viết: “Specific impulse is a method for measuring – in seconds – thrust and efficiency levels… The higher this rate is, the more efficient the rocket system is… the SLS rocket has specific impulse rates below 500.” Về LỰC ĐẨY thô thì SLS (53 triệu N) vẫn lớn hơn PPR (100.000 N) rất nhiều.',
    },
    {
      q: 'Ngoài tốc độ, thiết kế PPR còn mở ra lợi ích nào cho phi hành gia?',
      opts: [
        'Đẩy được tàu nặng hơn, nên tàu có thể mang khiên chắn dày bảo vệ người khỏi tia vũ trụ ngân hà',
        'Cho phép tàu hạ cánh thẳng đứng trên sao Hoả',
        'Tạo trọng lực nhân tạo trong tàu',
        'Cho phép tàu tự sửa chữa giữa hành trình',
      ],
      a: 'Đẩy được tàu nặng hơn, nên tàu có thể mang khiên chắn dày bảo vệ người khỏi tia vũ trụ ngân hà',
      why: 'Bài viết: hệ thống “should be able to propel much heavier spacecraft” và “make it easier for spacecraft to be equipped with heavy shields to protect traveling astronauts from Galactic Cosmic Rays.”',
    },
    {
      q: 'Dự án PPR hiện đang ở giai đoạn nào?',
      opts: [
        'Giai đoạn I của chương trình NIAC — nghiên cứu công nghệ, chưa chế tạo mẫu động cơ hoạt động',
        'Đã bay thử thành công tới mặt trăng',
        'Đang sản xuất hàng loạt cho NASA',
        'Đã bị NASA dừng cấp vốn',
      ],
      a: 'Giai đoạn I của chương trình NIAC — nghiên cứu công nghệ, chưa chế tạo mẫu động cơ hoạt động',
      why: 'Bài viết: công ty “is currently in the early stages of studying the technology before building working engine models” và “PPR is currently in Phase I of development” thuộc chương trình NIAC — dự án vừa NHẬN THÊM vốn, không phải bị dừng.',
    },
  ],

  // NASA Details Plans for Railway System on the Moon
  'voa-doc-7605113': [
    {
      q: 'Hệ thống đường ray FLOAT trên mặt trăng sẽ dùng để làm gì?',
      opts: [
        'Chở đất mặt trăng và vật liệu quanh khu phi hành gia hoạt động, và chở hàng nặng đến/từ bãi đáp tàu',
        'Chở phi hành gia đi tham quan bề mặt mặt trăng',
        'Phóng tàu vũ trụ lên quỹ đạo mặt trăng',
        'Vận chuyển hàng từ Trái Đất lên mặt trăng',
      ],
      a: 'Chở đất mặt trăng và vật liệu quanh khu phi hành gia hoạt động, và chở hàng nặng đến/từ bãi đáp tàu',
      why: 'Bài viết: “carrying loads of lunar soil and other materials to different areas” và “transport larger loads of materials and equipment to and from the areas where spacecraft land” — đây là “robotic transport system”, không chở người.',
    },
    {
      q: 'Vì sao NASA muốn khai thác lớp đất mặt trăng (regolith)?',
      opts: [
        'Vì nó có thể chứa nước và dạng lỏng của oxy, hydro — những chất nuôi sống phi hành gia trong các đợt ở dài ngày',
        'Vì nó chứa vàng và kim loại quý',
        'Vì cần dọn sạch đất để xây căn cứ',
        'Vì regolith là nhiên liệu trực tiếp cho tên lửa',
      ],
      a: 'Vì nó có thể chứa nước và dạng lỏng của oxy, hydro — những chất nuôi sống phi hành gia trong các đợt ở dài ngày',
      why: 'Bài viết: “Regolith can contain materials like water or liquid forms of oxygen and hydrogen. Those elements could be used to support astronauts and their equipment during long stays.”',
    },
    {
      q: 'Điểm đặc biệt trong thiết kế của các robot chở hàng là gì?',
      opts: [
        'Là tấm phẳng có từ tính, không có bộ phận chuyển động và không có nguồn điện riêng — được năng lượng điện từ đẩy lơ lửng trên ray',
        'Là xe bốn bánh chạy pin mặt trời',
        'Là robot hai chân biết tự bốc dỡ hàng',
        'Là khí cầu bay là là trên bề mặt',
      ],
      a: 'Là tấm phẳng có từ tính, không có bộ phận chuyển động và không có nguồn điện riêng — được năng lượng điện từ đẩy lơ lửng trên ray',
      why: 'Bài viết: “flat, magnetic panels, called robots, to float, or levitate, over a flat rail line… The robots have no moving parts and are unpowered. They are pushed along the track by electromagnetic energy.”',
    },
    {
      q: 'Vì sao đường ray của FLOAT được coi là dễ triển khai?',
      opts: [
        'Ray đặt thẳng lên bề mặt mặt trăng, không cần xây công trình cố định, và có thể dời đi để đổi tuyến đường',
        'Ray được in 3D ngay trên mặt trăng',
        'Ray tự lắp ráp bằng robot',
        'Ray làm từ chính đất mặt trăng nung chảy',
      ],
      a: 'Ray đặt thẳng lên bề mặt mặt trăng, không cần xây công trình cố định, và có thể dời đi để đổi tuyến đường',
      why: 'Bài viết: “The system’s tracks can be placed directly on the lunar surface, avoiding the need to build a complex, permanent structure. They could also be moved around to change the transportation path.”',
    },
  ],

  // Virtual Fences for Cows Show Benefits
  'voa-doc-7511350': [
    {
      q: 'Hàng rào ảo dạy bò tránh ranh giới bằng cách nào?',
      opts: [
        'Vòng cổ phát âm thanh cảnh báo khi bò lại gần ranh giới; tiến gần hơn nữa thì bò nhận một cú giật điện nhỏ — bò nhanh chóng học cách tránh',
        'Ranh giới phát ánh sáng chói làm bò sợ',
        'Người chăn dùng còi điều khiển từ xa',
        'Một hàng rào thép mỏng gần như vô hình',
      ],
      a: 'Vòng cổ phát âm thanh cảnh báo khi bò lại gần ranh giới; tiến gần hơn nữa thì bò nhận một cú giật điện nhỏ — bò nhanh chóng học cách tránh',
      why: 'Bài viết: “When an animal gets close to a virtual fence, its collar makes a warning sound. If the animal moves even closer to the fence, it receives a shock. In this way, livestock quickly learn to stay away.” Hàng rào hoàn toàn vô hình — làm bằng tín hiệu radio, không phải thép.',
    },
    {
      q: 'Sự kiện nào trong bài cho thấy hệ ảo bền hơn hàng rào vật lý?',
      opts: [
        'Bão Ian phá huỷ 45 km hàng rào vật lý ở trang trại, nhưng các tháp sóng của hệ ảo vẫn hoạt động',
        'Hàng rào vật lý bị trộm cắt, còn hệ ảo thì không',
        'Cháy đồng cỏ thiêu rụi hàng rào gỗ',
        'Động đất làm đổ toàn bộ cột rào',
      ],
      a: 'Bão Ian phá huỷ 45 km hàng rào vật lý ở trang trại, nhưng các tháp sóng của hệ ảo vẫn hoạt động',
      why: 'Bài viết: “When hurricane Ian hit Florida last year, it destroyed four houses and 45 kilometers of physical fence… But the cell towers for the virtual fence system kept working.”',
    },
    {
      q: 'Nghiên cứu ở Oregon đo được sự khác biệt nào?',
      opts: [
        'Bò KHÔNG đeo vòng cổ ăn gần 70% số cây ở vùng mới cháy; bò CÓ vòng cổ chỉ ăn chưa tới 3%',
        'Bò đeo vòng cổ tăng cân nhanh gấp đôi',
        'Bò đeo vòng cổ cho sữa nhiều hơn 70%',
        'Vùng có hàng rào ảo giảm 3% lượng mưa',
      ],
      a: 'Bò KHÔNG đeo vòng cổ ăn gần 70% số cây ở vùng mới cháy; bò CÓ vòng cổ chỉ ăn chưa tới 3%',
      why: 'Bài viết: “cows without virtual fence collars ate nearly 70 percent of the plants available to them in a burned area. However, cows with collars… ate less than three percent.”',
    },
    {
      q: 'Bài nêu những hạn chế nào của hàng rào ảo?',
      opts: [
        'Chi phí cao (vòng cổ ~50 đô/con/năm, trạm phát hơn 10.000 đô), và ở nơi như Kenya nó có thể khiến người chăn nuôi mất việc',
        'Bò không thể học được cách phản ứng với vòng cổ',
        'Hệ thống chỉ hoạt động vào ban ngày',
        'Tín hiệu GPS làm hại sức khoẻ của bò',
      ],
      a: 'Chi phí cao (vòng cổ ~50 đô/con/năm, trạm phát hơn 10.000 đô), và ở nơi như Kenya nó có thể khiến người chăn nuôi mất việc',
      why: 'Bài viết: “A collar for just one animal can cost around $50 each year or more. And portable base stations cost $10,000 or more” và Burnidge thấy ở Kenya “Virtual fences could cause some of these workers to lose their jobs.”',
    },
  ],

  // New Evidence Suggests Large Water Ice Supply near Mars' Equator
  'voa-doc-7458018': [
    {
      q: 'Vùng Medusae Fossae (MFF) trước đây được cho là chứa gì, và dữ liệu mới gợi ý gì?',
      opts: [
        'Trước đây cho là bụi bị gió thổi tích tụ; dữ liệu radar mới gợi ý đó là lượng lớn băng nước xếp lớp',
        'Trước đây cho là băng; dữ liệu mới chứng minh chỉ là bụi',
        'Trước đây cho là dung nham; dữ liệu mới cho thấy là cát',
        'Trước đây chưa ai quan sát vùng này',
      ],
      a: 'Trước đây cho là bụi bị gió thổi tích tụ; dữ liệu radar mới gợi ý đó là lượng lớn băng nước xếp lớp',
      why: 'Bài viết: “raised areas that scientists thought in the past might contain dust blown around the planet by wind” — nhưng “MARSIS readings suggest the MFF area of Mars contains a large amount of water ice rather than wind-blown dust.”',
    },
    {
      q: 'Thiết bị MARSIS phát hiện nước bằng cách nào?',
      opts: [
        'Gửi sóng radio xuống rồi phân tích “tiếng vọng” — nước gần bề mặt cho tín hiệu mạnh hơn, băng và vật liệu khác cho tín hiệu yếu hơn',
        'Chụp ảnh màu độ phân giải cao của bề mặt',
        'Khoan lấy mẫu đất ở độ sâu 5 km',
        'Đo nhiệt độ bề mặt bằng tia hồng ngoại',
      ],
      a: 'Gửi sóng radio xuống rồi phân tích “tiếng vọng” — nước gần bề mặt cho tín hiệu mạnh hơn, băng và vật liệu khác cho tín hiệu yếu hơn',
      why: 'Bài viết: MARSIS “send radio waves… listen to and examine ‘echoes’” và “any water identified near the surface results in stronger signals while the presence of ice or other materials would produce weaker signals.”',
    },
    {
      q: 'Lượng băng ước tính ở MFF lớn tới mức nào?',
      opts: [
        'Nếu tan chảy, đủ nước phủ toàn bộ bề mặt sao Hoả một lớp sâu khoảng 1,5–3 mét',
        'Đủ lấp đầy một hồ nhỏ',
        'Bằng toàn bộ nước của Trái Đất',
        'Chỉ vài trăm lít nằm rải rác',
      ],
      a: 'Nếu tan chảy, đủ nước phủ toàn bộ bề mặt sao Hoả một lớp sâu khoảng 1,5–3 mét',
      why: 'Bài viết: “the total amount of water contained there would be enough ‘to cover the surface of Mars to a depth of about 1.5 to 3 meters’” — và trầm tích kéo dài xuống độ sâu tới 3,7 km.',
    },
    {
      q: 'Vì sao vị trí của phát hiện này quý giá cho các chuyến thám hiểm tương lai?',
      opts: [
        'Nó nằm gần xích đạo và ở độ cao thấp — nơi có nhiều khí quyển hơn để hạ cánh có kiểm soát',
        'Nó nằm ngay cạnh trạm đổ bộ cũ của NASA',
        'Nó là vùng ấm nhất trên sao Hoả',
        'Nó có thể nhìn thấy trực tiếp từ Trái Đất',
      ],
      a: 'Nó nằm gần xích đạo và ở độ cao thấp — nơi có nhiều khí quyển hơn để hạ cánh có kiểm soát',
      why: 'Bài viết: “with a lower elevation, the MFF area would be considered ‘an ideal landing spot for spacecraft.’ Such an elevation provides more atmosphere to support an effective, controlled landing.”',
    },
  ],

  // NASA Prepares for First Flight of Its New Supersonic Jet
  'voa-doc-7446472': [
    {
      q: 'Nhiệm vụ Quesst thu thập dữ liệu gì, và dữ liệu đó dùng để làm gì?',
      opts: [
        'Độ ồn của bay siêu thanh — để nhà quản lý cân nhắc sửa luật đang CẤM bay siêu thanh trên đất liền Mỹ',
        'Mức tiêu thụ nhiên liệu — để giảm giá vé máy bay',
        'Dữ liệu thời tiết ở độ cao lớn — để dự báo bão',
        'Sức bền của vật liệu mới — để đóng tàu vũ trụ',
      ],
      a: 'Độ ồn của bay siêu thanh — để nhà quản lý cân nhắc sửa luật đang CẤM bay siêu thanh trên đất liền Mỹ',
      why: 'Bài viết: “The mission aims to collect data… on the level of noise produced by supersonic travel. The data Quesst gathers could lead U.S. officials to change rules that currently ban supersonic flights over land.”',
    },
    {
      q: 'X-59 dùng những thiết kế nào để giảm tiếng nổ siêu thanh?',
      opts: [
        'Mũi máy bay thon và nhỏ hơn khoảng một phần ba để phá sóng xung kích, động cơ gắn TRÊN lưng, và mặt bụng nhẵn',
        'Bốn động cơ nhỏ thay cho một động cơ lớn',
        'Cánh gập được khi vượt tường âm thanh',
        'Lớp sơn đặc biệt hấp thụ âm thanh',
      ],
      a: 'Mũi máy bay thon và nhỏ hơn khoảng một phần ba để phá sóng xung kích, động cơ gắn TRÊN lưng, và mặt bụng nhẵn',
      why: 'Bài viết: “it has a thinner, smaller nose… reduced by about one-third, aims to break up shock waves” và nhóm “designed the aircraft with its engine mounted on top and gave it a smooth underside.”',
    },
    {
      q: 'Bài cho biết gì về máy bay Concorde?',
      opts: [
        'Máy bay chở khách siêu thanh đầu tiên trên thế giới, do Anh và Pháp cùng vận hành, ngừng bay năm 2003; bay London–New York chỉ mất khoảng 3,5 giờ',
        'Máy bay do NASA và Lockheed Martin chế tạo',
        'Máy bay siêu thanh vẫn đang chở khách đến nay',
        'Máy bay thử nghiệm chưa từng chở khách',
      ],
      a: 'Máy bay chở khách siêu thanh đầu tiên trên thế giới, do Anh và Pháp cùng vận hành, ngừng bay năm 2003; bay London–New York chỉ mất khoảng 3,5 giờ',
      why: 'Bài viết: “The Concorde was the world’s first supersonic passenger jet. It was operated jointly by Britain and France”, ngừng bay 2003, và “it could travel from London to New York in about three-and-a-half hours” so với ~8 giờ của máy bay thường.',
    },
    {
      q: 'Sau khi được phép bay, X-59 sẽ làm gì tiếp theo?',
      opts: [
        'Bay qua nhiều thành phố Mỹ để đo âm thanh nó tạo ra và phản ứng của người dân dưới đất',
        'Chở hành khách tuyến London – New York',
        'Bay vòng quanh thế giới để lập kỷ lục tốc độ',
        'Được đưa vào bảo tàng hàng không',
      ],
      a: 'Bay qua nhiều thành phố Mỹ để đo âm thanh nó tạo ra và phản ứng của người dân dưới đất',
      why: 'Bài viết: “it will be deployed to several cities across the U.S. to collect data on the sounds the plane produces and how people on the ground react to the noise” — dữ liệu nộp cho FAA và cơ quan quản lý bay quốc tế.',
    },
  ],

  // 2023 Was Another Big Year for Space Missions
  'voa-doc-7414703': [
    {
      q: 'Mẫu vật mang về từ tiểu hành tinh Bennu cho thấy điều gì?',
      opts: [
        'Vật liệu giàu carbon và nước — hai chất gợi ý “những viên gạch dựng nên sự sống” có thể nằm trong đá',
        'Vàng và kim loại quý hiếm',
        'Vi khuẩn còn sống',
        'Không khí có thể thở được',
      ],
      a: 'Vật liệu giàu carbon và nước — hai chất gợi ý “những viên gạch dựng nên sự sống” có thể nằm trong đá',
      why: 'Bài viết: “the first examinations of the sample showed evidence of high-carbon material and water. These two substances suggest the possibility that ‘the building blocks of life on Earth may be found in the rock.’”',
    },
    {
      q: 'NASA trình diễn công nghệ liên lạc laser bằng cách nào?',
      opts: [
        'Truyền một video con mèo đuổi đèn laser đi hơn 30 triệu km về Trái Đất trong chưa đầy hai phút',
        'Gọi điện video trực tiếp với phi hành gia trên sao Hoả',
        'Chiếu laser từ Trái Đất lên mặt trăng',
        'Gửi bản đồ tiểu hành tinh Psyche về Trái Đất',
      ],
      a: 'Truyền một video con mèo đuổi đèn laser đi hơn 30 triệu km về Trái Đất trong chưa đầy hai phút',
      why: 'Bài viết: “NASA demonstrated the technology with a short video sent by the laser technology over 30 million kilometers… it took less than two minutes… The video showed a cat repeatedly chasing a red laser light.”',
    },
    {
      q: 'Chuyến Chandrayaan-3 của Ấn Độ đặc biệt ở những điểm nào?',
      opts: [
        'Ấn Độ thành nước thứ tư hạ cánh xuống mặt trăng, và tàu là tàu ĐẦU TIÊN đáp gần cực nam — vùng được cho là chứa nhiều nước đóng băng',
        'Ấn Độ thành nước đầu tiên hạ cánh xuống mặt trăng',
        'Tàu mang về mẫu đất từ cực nam mặt trăng',
        'Tàu chở phi hành gia Ấn Độ đầu tiên',
      ],
      a: 'Ấn Độ thành nước thứ tư hạ cánh xuống mặt trăng, và tàu là tàu ĐẦU TIÊN đáp gần cực nam — vùng được cho là chứa nhiều nước đóng băng',
      why: 'Bài viết: “India became the fourth country to successfully land a spacecraft on the moon. The moon lander, called Chandrayaan-3, also became the first spacecraft to land near the moon’s south pole.”',
    },
    {
      q: 'Các nhà khoa học Trung Quốc tìm thấy nước trên mặt trăng ở dạng nào?',
      opts: [
        'Những hạt cườm cực nhỏ trong đất do Chang’e 5 mang về — có thể có hàng tỉ hạt như vậy, nhưng khai thác sẽ khó',
        'Hồ nước lỏng dưới bề mặt',
        'Băng tảng lớn ở cực bắc',
        'Hơi nước trong khí quyển mặt trăng',
      ],
      a: 'Những hạt cườm cực nhỏ trong đất do Chang’e 5 mang về — có thể có hàng tỉ hạt như vậy, nhưng khai thác sẽ khó',
      why: 'Bài viết: “the water was in the form of extremely small beads found in dirt collected in 2020… billions, if not trillions, of these beads could exist… But the team said mining the water would be difficult.”',
    },
  ],

  // NASA Finds Material that Could Support Possible Life on Saturn's Moon
  'voa-doc-7407145': [
    {
      q: 'Phân tử nào vừa được “xác nhận mạnh mẽ” trên mặt trăng Enceladus, và vì sao nó quan trọng?',
      opts: [
        'Hydrogen cyanide — “điểm khởi đầu của phần lớn các lý thuyết về nguồn gốc sự sống”, phân tử then chốt để hình thành amino acid',
        'Oxy — chứng minh có thể thở được trên Enceladus',
        'Methane — chứng minh có sinh vật đang sống',
        'Muối ăn — chứng minh có đại dương giống Trái Đất',
      ],
      a: 'Hydrogen cyanide — “điểm khởi đầu của phần lớn các lý thuyết về nguồn gốc sự sống”, phân tử then chốt để hình thành amino acid',
      why: 'Bài viết: Jonah Peter gọi hydrogen cyanide là “the starting point for most theories on the origin of life” và NASA: “one of the most important and versatile molecules needed to form amino acids.” Bài KHÔNG nói tìm thấy sinh vật.',
    },
    {
      q: 'Phát hiện năm 2017 của Cassini trên Enceladus là gì?',
      opts: [
        'Phân tử hydro trong các hạt băng và hơi nước phun lên từ bề mặt — dấu hiệu phản ứng hoá học dưới biển sâu giữa nước và đá',
        'Một núi lửa đang hoạt động',
        'Từ trường mạnh bất thường',
        'Dấu vết của tàu vũ trụ cổ',
      ],
      a: 'Phân tử hydro trong các hạt băng và hơi nước phun lên từ bề mặt — dấu hiệu phản ứng hoá học dưới biển sâu giữa nước và đá',
      why: 'Bài viết: “the observation of hydrogen molecules in ice particles and vapor shooting upward from the moon’s surface… could signal deep-sea chemical reactions between water and rock that could create microbial life.”',
    },
    {
      q: 'Ngoài hydrogen cyanide, phân tích mới còn nhận diện được gì trong đại dương ngầm của Enceladus?',
      opts: [
        'Một nguồn năng lượng hoá học mạnh — các hợp chất hữu cơ mà trên Trái Đất có loại làm nhiên liệu cho sinh vật',
        'Một dòng hải lưu ấm chảy quanh xích đạo',
        'Những sinh vật phát sáng',
        'Kim loại hiếm dùng làm pin',
      ],
      a: 'Một nguồn năng lượng hoá học mạnh — các hợp chất hữu cơ mà trên Trái Đất có loại làm nhiên liệu cho sinh vật',
      why: 'Bài viết: đại dương ngầm “holds a powerful source of chemical energy… in the form of several organic compounds, some of which, on Earth, serve as fuel for organisms.” Càng nhiều năng lượng, sự sống càng dễ hình thành và tồn tại.',
    },
    {
      q: 'Nhiệm vụ Cassini đã kết thúc từ 2017 — vì sao vẫn có phát hiện mới?',
      opts: [
        'Vì các nhà khoa học vẫn tiếp tục phân tích kho dữ liệu Cassini để lại, và nó vẫn cho ra hiểu biết mới',
        'Vì NASA đã sửa được tàu và cho bay lại',
        'Vì một tàu khác chụp lại được ảnh của Cassini',
        'Vì dữ liệu bị thất lạc mới được tìm thấy',
      ],
      a: 'Vì các nhà khoa học vẫn tiếp tục phân tích kho dữ liệu Cassini để lại, và nó vẫn cho ra hiểu biết mới',
      why: 'Bài viết: NASA chủ động cho Cassini đâm vào khí quyển sao Thổ để kết thúc nhiệm vụ, nhưng “while Cassini’s mission has ended, its observations continue to provide us with new insights about Saturn and its moons.”',
    },
  ],

  // NASA Continues Mars Helicopter Experiments, Tests New Design on Earth
  'voa-doc-7379281': [
    {
      q: 'Ingenuity đã vượt kế hoạch ban đầu đến mức nào?',
      opts: [
        'Kế hoạch chỉ 5 chuyến bay thử — nó đã bay 66 chuyến',
        'Kế hoạch 66 chuyến — nó bay được 5 chuyến',
        'Kế hoạch một năm — nó bay được ba tháng',
        'Nó bay đúng số chuyến dự kiến',
      ],
      a: 'Kế hoạch chỉ 5 chuyến bay thử — nó đã bay 66 chuyến',
      why: 'Bài viết: “Agency engineers planned on Ingenuity completing just five experimental flights on Mars. But the helicopter has so far performed 66 flights.”',
    },
    {
      q: 'Vì sao đội điều khiển KHÔNG dám cho Ingenuity bay quá nhanh, và họ xử lý bằng cách nào?',
      opts: [
        'Camera định vị dựa vào vật thể trên bề mặt — bay nhanh quá dễ mất phương hướng; giải pháp là cho bay CAO hơn để vật thể nằm trong khung hình lâu hơn',
        'Động cơ quá nóng khi bay nhanh; giải pháp là chỉ bay ban đêm',
        'Bụi sao Hoả làm mờ camera; giải pháp là lau camera bằng robot',
        'Tín hiệu điều khiển không theo kịp; giải pháp là điều khiển tự động hoàn toàn',
      ],
      a: 'Camera định vị dựa vào vật thể trên bề mặt — bay nhanh quá dễ mất phương hướng; giải pháp là cho bay CAO hơn để vật thể nằm trong khung hình lâu hơn',
      why: 'Bài viết: “If the aircraft goes too fast, it might not be able to navigate the best way forward… they have sent commands to Ingenuity to fly at higher levels. This way the aircraft has less chance of losing its way because surface objects stay in view longer.”',
    },
    {
      q: 'Hai chuyến bay 61 và 62 lập những kỷ lục nào?',
      opts: [
        'Chuyến 61 đạt độ cao kỷ lục 24 mét khi khảo sát gió; chuyến 62 đạt tốc độ kỷ lục 10 m/giây và tìm được điểm thí nghiệm mới cho rover Perseverance',
        'Chuyến 61 bay xa 10 km; chuyến 62 bay liền một giờ',
        'Cả hai chuyến đều chở mẫu đất về cho rover',
        'Chuyến 61 đạt tốc độ âm thanh; chuyến 62 bay qua cực bắc sao Hoả',
      ],
      a: 'Chuyến 61 đạt độ cao kỷ lục 24 mét khi khảo sát gió; chuyến 62 đạt tốc độ kỷ lục 10 m/giây và tìm được điểm thí nghiệm mới cho rover Perseverance',
      why: 'Bài viết: “a new height record, on flight 61, of 24 meters as it examined Martian wind conditions. On flight 62, the helicopter set a new speed record of 10 meters per second. During this flight Ingenuity also identified a new place for the Perseverance rover.”',
    },
    {
      q: 'Cánh quạt thế hệ mới được thử trên Trái Đất khác cánh của Ingenuity thế nào?',
      opts: [
        'Làm bằng vật liệu carbon, dài hơn 10 cm, quay tới 3.500 vòng/phút — nhanh hơn 750 vòng/phút so với cánh Ingenuity, đầu cánh gần chạm tốc độ âm thanh',
        'Làm bằng titan, ngắn hơn một nửa',
        'Gập lại được khi hạ cánh',
        'Có thể tự sửa khi gãy',
      ],
      a: 'Làm bằng vật liệu carbon, dài hơn 10 cm, quay tới 3.500 vòng/phút — nhanh hơn 750 vòng/phút so với cánh Ingenuity, đầu cánh gần chạm tốc độ âm thanh',
      why: 'Bài viết: “The blades tested on Earth are made of carbon material and are more than 10 centimeters longer than Ingenuity’s… We spun our blades up to 3,500 rpm, which is 750 revolutions per minute faster…” và đạt tốc độ “nearly equal to Mach 1”. Thử trong buồng mô phỏng môi trường sao Hoả tại JPL.',
    },
  ],

  // How to Keep a Betta Fish
  'voa-doc-6894375': [
    {
      q: 'Vì sao bể cá to lại TỐT hơn cho người mới nuôi betta?',
      opts: [
        'Nước ít phải thay hơn và môi trường sống của cá khoẻ mạnh hơn',
        'Vì cá betta lớn rất nhanh',
        'Vì bể to không cần máy lọc',
        'Vì bể to giữ nhiệt mà không cần máy sưởi',
      ],
      a: 'Nước ít phải thay hơn và môi trường sống của cá khoẻ mạnh hơn',
      why: 'Bài viết: “Larger tanks are better because the water needs to be changed less often and provides a healthier environment for the fish.” Máy lọc và máy sưởi vẫn được khuyên dùng bất kể cỡ bể.',
    },
    {
      q: 'Nước máy phải xử lý thế nào trước khi cho vào bể?',
      opts: [
        'Dùng chất khử chlorine và kiểm tra kim loại nặng — nước máy thường chứa hoá chất gốc chlorine hại cá',
        'Đun sôi rồi để nguội',
        'Pha thêm muối biển',
        'Không cần xử lý gì, đổ thẳng vào bể',
      ],
      a: 'Dùng chất khử chlorine và kiểm tra kim loại nặng — nước máy thường chứa hoá chất gốc chlorine hại cá',
      why: 'Bài viết: nước máy “usually contains a chlorine-based chemical harmful to fish” và giáo sư Krista Keller khuyên “use a dechlorinating product and test for heavy metals.”',
    },
    {
      q: 'Chọn thức ăn cho betta phải chú ý điều gì?',
      opts: [
        'Phải chứa thịt hoặc côn trùng — vì đó là thức ăn của betta trong tự nhiên',
        'Chỉ được cho ăn rau củ nghiền',
        'Phải cho ăn năm bữa mỗi ngày',
        'Chỉ dùng được thức ăn tươi sống',
      ],
      a: 'Phải chứa thịt hoặc côn trùng — vì đó là thức ăn của betta trong tự nhiên',
      why: 'Bài viết: “Whatever food you choose, make sure it contains meat or insects because that is what bettas eat in the wild.” Cho ăn 1–2 lần/ngày, và có nhiều dạng: viên, đông lạnh, sấy khô, tươi sống.',
    },
    {
      q: 'Vì sao cá betta ĐỰC thường phải nuôi một mình?',
      opts: [
        'Vì chúng hung hăng — tên khác của betta là “cá chọi Xiêm”, hai con đực không bao giờ được nhốt chung',
        'Vì chúng cần nhiều không gian hơn cá cái',
        'Vì chúng chỉ đẹp khi ở một mình',
        'Vì chúng sợ các loài cá khác',
      ],
      a: 'Vì chúng hung hăng — tên khác của betta là “cá chọi Xiêm”, hai con đực không bao giờ được nhốt chung',
      why: 'Bài viết: “Male betta fish are kept alone because they are aggressive fish. Another name for bettas is Siamese fighting fish. Males should never be kept with other betta males.” Cá CÁI thì có thể sống chung nhóm.',
    },
  ],

  // Another Year of COVID-19, Variants and Restrictions
  'voa-doc-6352213': [
    {
      q: 'Vì sao WHO chuyển sang đặt tên biến thể theo bảng chữ cái Hy Lạp?',
      opts: [
        'Vì có quá nhiều “biến thể đáng lo ngại” mang tên khoa học khó nhớ',
        'Vì các nhà khoa học Hy Lạp tìm ra biến thể đầu tiên',
        'Vì luật quốc tế yêu cầu như vậy',
        'Vì tên cũ trùng với tên các địa danh',
      ],
      a: 'Vì có quá nhiều “biến thể đáng lo ngại” mang tên khoa học khó nhớ',
      why: 'Bài viết: “There were so many ‘variants of concern’ with hard-to-remember scientific names that the World Health Organization (WHO) started to name them after the letters of the Greek alphabet.”',
    },
    {
      q: 'Vì sao biến thể Delta xuất hiện vào một “thời điểm khó khăn”?',
      opts: [
        'Vì tỉ lệ tiêm chủng ở nhiều nước còn thấp trong khi các chính phủ đang mở cửa lại nền kinh tế',
        'Vì các nhà máy vaccine vừa đóng cửa',
        'Vì mùa đông làm virus mạnh lên',
        'Vì WHO vừa tuyên bố hết đại dịch',
      ],
      a: 'Vì tỉ lệ tiêm chủng ở nhiều nước còn thấp trong khi các chính phủ đang mở cửa lại nền kinh tế',
      why: 'Bài viết: “When it started being reported, vaccination rates remained low in many countries. And officials were moving quickly to reopen economies. Then, infections of the Delta variant became widespread.”',
    },
    {
      q: '“Endemic” (lưu hành địa phương) nghĩa là gì theo bài?',
      opts: [
        'Virus sẽ tiếp tục tồn tại ở một số khu vực trong nhiều năm — như sốt rét ở các vùng ấm, ẩm',
        'Virus sẽ biến mất hoàn toàn sau một năm',
        'Virus chỉ lây trong bệnh viện',
        'Virus trở nên vô hại với tất cả mọi người',
      ],
      a: 'Virus sẽ tiếp tục tồn tại ở một số khu vực trong nhiều năm — như sốt rét ở các vùng ấm, ẩm',
      why: 'Bài viết: “Endemic means the virus will continue to exist in some areas for years to come. For example, Malaria is considered endemic to many warm, wet areas…” 89% trong hơn 100 nhà khoa học được Nature khảo sát tin SARS-CoV-2 sẽ thành endemic.',
    },
    {
      q: 'Miễn dịch cộng đồng (herd immunity) bảo vệ người có nguy cơ bằng cách nào?',
      opts: [
        'Khi đủ nhiều người đã khỏi bệnh hoặc đã tiêm, virus không còn lây lan dễ dàng — nhờ đó người dễ tổn thương được che chắn',
        'Bằng cách làm mọi người miễn nhiễm tuyệt đối với virus',
        'Bằng cách buộc tất cả ở nhà vĩnh viễn',
        'Bằng cách tiêu diệt hoàn toàn virus trong tự nhiên',
      ],
      a: 'Khi đủ nhiều người đã khỏi bệnh hoặc đã tiêm, virus không còn lây lan dễ dàng — nhờ đó người dễ tổn thương được che chắn',
      why: 'Bài viết: “It does not mean everyone is protected from the virus. However, when herd immunity is reached, the virus can no longer spread easily, which helps protect those who are at risk.”',
    },
  ],

  // Thanksgiving: An American Tradition
  'voa-doc-4117570': [
    {
      q: 'Lễ Tạ ơn thuộc loại lễ hội nào, và diễn ra khi nào?',
      opts: [
        'Lễ hội thu hoạch mùa thu — giống nhiều nền văn hoá khác — vào thứ Năm thứ tư của tháng 11',
        'Lễ hội tôn giáo vào ngày 25 tháng 12',
        'Lễ hội mùa xuân vào tháng 3',
        'Quốc khánh của nước Mỹ',
      ],
      a: 'Lễ hội thu hoạch mùa thu — giống nhiều nền văn hoá khác — vào thứ Năm thứ tư của tháng 11',
      why: 'Bài viết: “celebrated every year on the fourth Thursday in November… Thanksgiving is an autumn harvest festival like those found in many cultures around the world.”',
    },
    {
      q: '“Friendsgiving” là gì?',
      opts: [
        'Bữa Tạ ơn của người trẻ sống xa quê, ăn cùng bạn bè thay vì gia đình — thường theo kiểu “potluck”, mỗi người mang một món',
        'Bữa tiệc dành riêng cho đồng nghiệp ở công ty',
        'Ngày mua sắm giảm giá sau lễ',
        'Cuộc thi nấu gà tây giữa các gia đình',
      ],
      a: 'Bữa Tạ ơn của người trẻ sống xa quê, ăn cùng bạn bè thay vì gia đình — thường theo kiểu “potluck”, mỗi người mang một món',
      why: 'Bài viết: “young people living in cities away from their hometowns sometimes celebrate ‘Friendsgiving’ – a Thanksgiving meal with their friends instead of their family… a ‘potluck’… everyone who is invited brings food to share.”',
    },
    {
      q: 'Cuộc diễu hành của Macy’s bắt đầu như thế nào?',
      opts: [
        'Nhân viên cửa hàng Macy’s — nhiều người là dân nhập cư — tổ chức lần đầu năm 1924 vì muốn có diễu hành lớn như ở châu Âu; họ mặc trang phục hoá trang và mượn thú từ vườn thú',
        'Chính quyền New York tổ chức để mừng chiến thắng thể thao',
        'Một hãng phim tổ chức để quảng bá phim mới',
        'Trẻ em các trường học thành phố khởi xướng',
      ],
      a: 'Nhân viên cửa hàng Macy’s — nhiều người là dân nhập cư — tổ chức lần đầu năm 1924 vì muốn có diễu hành lớn như ở châu Âu; họ mặc trang phục hoá trang và mượn thú từ vườn thú',
      why: 'Bài viết: “Workers of the Macy’s store on Herald Square organized the first parade in 1924. Many of the workers were immigrants and wanted to hold a big parade like the ones in Europe. So, they dressed in costumes and borrowed some animals from the zoo.”',
    },
    {
      q: 'Vì sao nhà văn O. Henry gọi Tạ ơn là ngày lễ “thuần Mỹ”?',
      opts: [
        'Vì nó không gắn với tôn giáo hay một nhóm người nào — bất kỳ ai ở Mỹ hôm đó đều được chào đón tham gia',
        'Vì chỉ công dân Mỹ mới được phép ăn mừng',
        'Vì nó là ngày lễ lâu đời nhất thế giới',
        'Vì món gà tây chỉ có ở Mỹ',
      ],
      a: 'Vì nó không gắn với tôn giáo hay một nhóm người nào — bất kỳ ai ở Mỹ hôm đó đều được chào đón tham gia',
      why: 'Bài viết: “the one holiday that is purely American. It is not linked to a religion or a certain group. Anyone in the United States on the fourth Thursday of November is welcome to celebrate Thanksgiving.”',
    },
  ],

  // Vernal Equinox Marks Arrival of Spring
  'voa-doc-7532255': [
    {
      q: 'Từ “equinox” có nghĩa gốc là gì?',
      opts: [
        'Ghép từ tiếng Latin aequus (bằng nhau) và nox (đêm) — ngày có 12 giờ sáng và 12 giờ tối, mặt trời nằm đúng trên xích đạo',
        'Tiếng Hy Lạp nghĩa là “mùa xuân đến”',
        'Tiếng Farsi nghĩa là “ngày mới”',
        'Tên một vị thần La Mã của mùa màng',
      ],
      a: 'Ghép từ tiếng Latin aequus (bằng nhau) và nox (đêm) — ngày có 12 giờ sáng và 12 giờ tối, mặt trời nằm đúng trên xích đạo',
      why: 'Bài viết: “equinox comes from the Latin words aequus, meaning equal, and nox, meaning night. The day has 12 hours of daylight and 12 hours of nighttime.” “Ngày mới” trong tiếng Farsi là nghĩa của Nowruz.',
    },
    {
      q: 'Điều gì xảy ra ở kim tự tháp Chichen Itza của người Maya vào ngày xuân phân?',
      opts: [
        'Ánh nắng chiếu vào công trình theo cách khiến nó trông như một con rắn — người Maya gọi là “sự trở lại của thần rắn Mặt Trời”',
        'Đỉnh tháp phát ra âm thanh như tiếng chim',
        'Bóng của tháp biến mất hoàn toàn vào giữa trưa',
        'Mặt trời mọc chính giữa hai đỉnh tháp',
      ],
      a: 'Ánh nắng chiếu vào công trình theo cách khiến nó trông như một con rắn — người Maya gọi là “sự trở lại của thần rắn Mặt Trời”',
      why: 'Bài viết: “On the spring equinox, the sunlight hits in a way that makes the structure look like a snake. The Maya called this day ‘the return of the Sun serpent.’”',
    },
    {
      q: 'Vì sao số nước coi Nowruz là quốc lễ tăng lên?',
      opts: [
        'Sau khi Liên Xô tan rã, nhiều nước Trung Á giành độc lập đã đưa Nowruz thành ngày lễ quốc gia — trước đó chỉ Iran có',
        'Vì Liên Hợp Quốc bắt buộc các nước công nhận',
        'Vì lễ này mới được phát minh gần đây',
        'Vì Iran vận động các nước láng giềng',
      ],
      a: 'Sau khi Liên Xô tan rã, nhiều nước Trung Á giành độc lập đã đưa Nowruz thành ngày lễ quốc gia — trước đó chỉ Iran có',
      why: 'Bài viết: “In the past, Iran was the only country where Nowruz was an official holiday. But after countries gained their independence following the fall of the Soviet Union, many made Nowruz a national holiday, as well.”',
    },
    {
      q: 'Lễ hội Las Fallas ở Valencia kết thúc như thế nào?',
      opts: [
        'Nửa đêm 19/3, cả thành phố tắt đèn đường và những bức tượng khổng lồ (có pháo hoa bên trong) bị châm lửa đốt',
        'Mọi người ném bột màu vào nhau trên đường phố',
        'Một đoàn thuyền hoa diễu hành trên sông',
        'Người dân thả đèn trời cầu may',
      ],
      a: 'Nửa đêm 19/3, cả thành phố tắt đèn đường và những bức tượng khổng lồ (có pháo hoa bên trong) bị châm lửa đốt',
      why: 'Bài viết: “at midnight on March 19, the city turns off all its streetlights and the statues are set on fire. This marks the end of the festival and the beginning of spring.” Ném bột màu là lễ Holi ở Ấn Độ và Nepal.',
    },
  ],

  // American Orchestra Shares Arabic Music, Culture
  'voa-doc-7148741': [
    {
      q: 'Dàn nhạc National Arab Orchestra (NAO) được lập ra nhằm mục đích gì?',
      opts: [
        'Gìn giữ và chia sẻ âm nhạc, văn hoá Ả Rập tại Mỹ qua biểu diễn và các chương trình giáo dục',
        'Đào tạo nhạc công cho các dàn nhạc giao hưởng châu Âu',
        'Gây quỹ xây một nhà hát mới ở Michigan',
        'Thu âm lại các bản nhạc cổ điển phương Tây bằng nhạc cụ Ả Rập',
      ],
      a: 'Gìn giữ và chia sẻ âm nhạc, văn hoá Ả Rập tại Mỹ qua biểu diễn và các chương trình giáo dục',
      why: 'Bài viết: “It aims to preserve and share Arabic music and culture in the United States through its performances and education programs” — Ibrahim muốn NAO là “the cultural representative of the Arab-American community”.',
    },
    {
      q: 'Trong buổi diễn, Ibrahim “bắc cầu” với khán giả bằng cách nào?',
      opts: [
        'Quay xuống khán phòng, mời mọi người vỗ tay theo nhịp và hát theo những bài nổi tiếng của Ai Cập hoặc Liban',
        'Phát tờ giới thiệu lịch sử từng bản nhạc',
        'Mời khán giả lên sân khấu chơi thử nhạc cụ',
        'Chiếu phụ đề dịch lời bài hát lên màn hình',
      ],
      a: 'Quay xuống khán phòng, mời mọi người vỗ tay theo nhịp và hát theo những bài nổi tiếng của Ai Cập hoặc Liban',
      why: 'Bài viết: “Ibrahim turns around and faces the audience. He urges them to clap their hands to the beat of the music. And he urges them to sing along with parts of a well-known song from Egypt or Lebanon.”',
    },
    {
      q: 'Theo bài, điều gì làm âm nhạc Ả Rập nghe khác nhạc phương Tây?',
      opts: [
        'Các mẫu giai điệu và tiết tấu khác hẳn; gần như suốt mỗi bài đều có trống tay và trống lục lạc, cùng các nhạc cụ riêng như oud, buzuq và qanun',
        'Chỉ chơi bằng nhạc cụ điện tử',
        'Không bao giờ có ca sĩ hát',
        'Mỗi bản nhạc chỉ dài đúng một phút',
      ],
      a: 'Các mẫu giai điệu và tiết tấu khác hẳn; gần như suốt mỗi bài đều có trống tay và trống lục lạc, cùng các nhạc cụ riêng như oud, buzuq và qanun',
      why: 'Bài viết: “The tonal and rhythmic patterns central to Arabic music are different from Western music… musicians playing different kinds of hand drums and tambourines… Two kinds of lutes, the oud and the buzuq… Another important instrument is the qanun.”',
    },
    {
      q: 'Con số nào trong bài cho thấy sức lan toả của dàn nhạc?',
      opts: [
        'Buổi diễn ở Washington bán hết 1.100 vé trong chưa đầy ba giờ, và kênh YouTube có hơn 400.000 người theo dõi — nhiều hơn mọi dàn nhạc khác trên thế giới',
        'Dàn nhạc có 400.000 nhạc công trên toàn cầu',
        'Mỗi năm dàn nhạc diễn 1.100 buổi',
        'Dàn nhạc đã tồn tại được 400 năm',
      ],
      a: 'Buổi diễn ở Washington bán hết 1.100 vé trong chưa đầy ba giờ, và kênh YouTube có hơn 400.000 người theo dõi — nhiều hơn mọi dàn nhạc khác trên thế giới',
      why: 'Bài viết: “the NAO concert in Washington, D.C. sold out in less than three hours. About 1,100 people attended” và “We have over 400,000 followers on YouTube, which is more than any other orchestra in the world.”',
    },
  ],

  // Play Explores Humor, Complexity of Learning English
  'voa-doc-6998098': [
    {
      q: 'Vở kịch “English” kể về ai?',
      opts: [
        'Bốn học viên người Iran trong một lớp luyện thi TOEFL và cô giáo của họ, diễn ra ở Iran trong một học kỳ',
        'Một gia đình Mỹ chuyển đến sống ở Iran',
        'Các giáo viên tiếng Anh tranh tài ở New York',
        'Một nhóm du học sinh ở Úc',
      ],
      a: 'Bốn học viên người Iran trong một lớp luyện thi TOEFL và cô giáo của họ, diễn ra ở Iran trong một học kỳ',
      why: 'Bài viết: “The comedy is about four Iranian students in an upper-level English class preparing to take the TOEFL… The play is set in Iran over the course of one term.”',
    },
    {
      q: 'Vở kịch dùng thủ pháp nào để khán giả biết nhân vật đang nói thứ tiếng gì?',
      opts: [
        'Toàn bộ vở bằng tiếng Anh: khi nói giọng Ba Tư nặng và câu đơn giản là đang nói TIẾNG ANH; khi nói giọng Mỹ hoàn hảo là đang “nói” TIẾNG FARSI',
        'Chiếu phụ đề song ngữ trên sân khấu',
        'Diễn viên đổi trang phục theo ngôn ngữ',
        'Mỗi ngôn ngữ do một diễn viên khác đóng',
      ],
      a: 'Toàn bộ vở bằng tiếng Anh: khi nói giọng Ba Tư nặng và câu đơn giản là đang nói TIẾNG ANH; khi nói giọng Mỹ hoàn hảo là đang “nói” TIẾNG FARSI',
      why: 'Bài viết: “The play is entirely in English… When the students speak English, they do so in a strong Persian accent… when the characters speak English in a perfect American accent, that means to the audience that they are speaking Farsi.”',
    },
    {
      q: 'Vở kịch khám phá điều gì về việc nói ngoại ngữ?',
      opts: [
        'Tính cách của một người có thể thay đổi, thậm chí biến mất khi nói ngoại ngữ — và điều đó khiến người ta tự hỏi về bản sắc của mình',
        'Ai cũng nói ngoại ngữ giỏi hơn khi tức giận',
        'Người lớn không thể học ngoại ngữ',
        'Ngoại ngữ chỉ cần cho công việc',
      ],
      a: 'Tính cách của một người có thể thay đổi, thậm chí biến mất khi nói ngoại ngữ — và điều đó khiến người ta tự hỏi về bản sắc của mình',
      why: 'Bài viết: “The play explores how one’s personality can change or even be lost when speaking a foreign language. It also deals with how speaking a different language can make a person question their sense of identity.” — Elham thấy xấu hổ khi nói tiếng Anh, còn cô giáo Marjan lại thấy “giống mình hơn”.',
    },
    {
      q: 'Diễn viên Tara Grammy nghĩ gì về chuyện “mất tính cách” khi nói ngoại ngữ?',
      opts: [
        'Chị không cho là mất — càng biết nhiều ngôn ngữ càng có thêm cách thể hiện những mặt khác nhau của bản thân',
        'Chị đồng ý rằng ngoại ngữ xoá bỏ tính cách',
        'Chị cho rằng chỉ trẻ em mới giữ được tính cách',
        'Chị không có ý kiến về chuyện này',
      ],
      a: 'Chị không cho là mất — càng biết nhiều ngôn ngữ càng có thêm cách thể hiện những mặt khác nhau của bản thân',
      why: 'Bài viết: “Grammy thinks personality is not lost when speaking different languages. Instead… ‘the more languages you know the more access you have to expressing different sides of yourself.’” Với chị, tiếng Anh là ngôn ngữ của trí tuệ, tiếng Farsi là ngôn ngữ của tình yêu.',
    },
  ],

  // Report: Language, Traditions Central to National Identity
  'voa-doc-7496623': [
    {
      q: 'Nghiên cứu của Pew hỏi về bốn khía cạnh nào của bản sắc dân tộc, và khía cạnh nào được coi trọng nhất?',
      opts: [
        'Ngôn ngữ, truyền thống, nơi sinh và tôn giáo — trong đó NGÔN NGỮ đứng đầu với trung vị 91% ở 21 nước',
        'Quốc kỳ, quốc ca, ẩm thực và thể thao — trong đó ẩm thực đứng đầu',
        'Ngôn ngữ, thu nhập, học vấn và nghề nghiệp — trong đó thu nhập đứng đầu',
        'Nơi sinh, quốc tịch cha mẹ, tôn giáo và màu da — trong đó nơi sinh đứng đầu',
      ],
      a: 'Ngôn ngữ, truyền thống, nơi sinh và tôn giáo — trong đó NGÔN NGỮ đứng đầu với trung vị 91% ở 21 nước',
      why: 'Bài viết: “four aspects… language, traditions, birthplace and religion. They found that language is by far the most valued aspect” và “a median of 91 percent of people across 21 countries.”',
    },
    {
      q: 'Jorge Catalan đồng ý tiếng Tây Ban Nha quan trọng với bản sắc Mexico, nhưng vì sao anh thấy điều đó đáng tiếc?',
      opts: [
        'Vì Mexico có khoảng 68 ngôn ngữ khác ngoài tiếng Tây Ban Nha, nhưng chính phủ trong lịch sử đã đẩy tiếng Tây Ban Nha thành “công cụ bắt buộc”',
        'Vì anh không nói được tiếng Tây Ban Nha',
        'Vì tiếng Tây Ban Nha khó học hơn các thứ tiếng khác',
        'Vì anh muốn tiếng Anh thành ngôn ngữ chính của Mexico',
      ],
      a: 'Vì Mexico có khoảng 68 ngôn ngữ khác ngoài tiếng Tây Ban Nha, nhưng chính phủ trong lịch sử đã đẩy tiếng Tây Ban Nha thành “công cụ bắt buộc”',
      why: 'Bài viết: “Mexico is a place where we have around 68 spoken languages besides Spanish… the government has pushed Spanish as the main language throughout history and has turned it into a ‘must-have tool.’”',
    },
    {
      q: 'Nghiên cứu tìm thấy mối liên hệ nào giữa tỉ lệ dân nhập cư và quan niệm về NƠI SINH?',
      opts: [
        'Nước có ÍT dân nhập cư coi nơi sinh quan trọng hơn; nước có NHIỀU dân nhập cư dễ chấp nhận người sinh ở nước ngoài là “quốc dân thật”',
        'Nước nhiều dân nhập cư coi nơi sinh quan trọng hơn',
        'Tỉ lệ nhập cư không liên quan gì tới quan niệm về nơi sinh',
        'Chỉ các nước châu Á coi trọng nơi sinh',
      ],
      a: 'Nước có ÍT dân nhập cư coi nơi sinh quan trọng hơn; nước có NHIỀU dân nhập cư dễ chấp nhận người sinh ở nước ngoài là “quốc dân thật”',
      why: 'Bài viết: “Countries where immigrants make up a smaller share of the population tend to see birthplace as a more important aspect of national identity. Countries with a greater share of immigrants are more willing to accept those born outside of the country as true nationals.”',
    },
    {
      q: 'Khía cạnh nào ÍT được coi là quan trọng nhất với bản sắc dân tộc?',
      opts: [
        'Tôn giáo — chỉ 42% người trả lời coi việc theo tôn giáo chính của đất nước là quan trọng',
        'Ngôn ngữ — chỉ 9% coi là quan trọng',
        'Truyền thống — chỉ 19% coi là quan trọng',
        'Nơi sinh — chỉ 5% coi là quan trọng',
      ],
      a: 'Tôn giáo — chỉ 42% người trả lời coi việc theo tôn giáo chính của đất nước là quan trọng',
      why: 'Bài viết: “An even lower number of respondents – 42 percent – said that being a member of the country’s main religion is important to national identity.” Ngôn ngữ 91%, truyền thống 81%, nơi sinh 58%.',
    },
  ],

  // How Connected Are You to the World?
  'voa-doc-7405930': [
    {
      q: 'Hai nhân vật mở đầu bài tạo nên nghịch lý nào?',
      opts: [
        'Bright đã đi hơn 20 nước nhưng KHÔNG thấy gắn kết với thế giới; Sadikova chưa từng ra khỏi Uzbekistan lại thấy gắn kết',
        'Cả hai đều đi nhiều nước và đều thấy gắn kết',
        'Cả hai đều chưa từng ra nước ngoài',
        'Sadikova ghét du lịch còn Bright mê du lịch',
      ],
      a: 'Bright đã đi hơn 20 nước nhưng KHÔNG thấy gắn kết với thế giới; Sadikova chưa từng ra khỏi Uzbekistan lại thấy gắn kết',
      why: 'Bài viết: “Bright has visited more than 20 countries. But Bright, unlike Sadikova, does not report feeling connected to people around the world” — còn Sadikova “has never traveled outside Uzbekistan. Even so, she reports feeling connected.”',
    },
    {
      q: 'Xu hướng CHUNG mà nghiên cứu Pew tìm thấy là gì?',
      opts: [
        'Người từng đến ít nhất một nước khác nhìn chung thấy gắn kết với thế giới hơn; cảm giác này phổ biến ở châu Âu hơn nơi khác',
        'Du lịch không liên quan gì tới cảm giác gắn kết',
        'Người Mỹ gắn kết với thế giới nhất',
        'Càng đi nhiều nước càng thấy xa cách',
      ],
      a: 'Người từng đến ít nhất một nước khác nhìn chung thấy gắn kết với thế giới hơn; cảm giác này phổ biến ở châu Âu hơn nơi khác',
      why: 'Bài viết: “respondents who had traveled to at least one other country feel more connected” và “Feeling close to others around the world is more common in Europe than in most other places.” Ở Mỹ chỉ 35%.',
    },
    {
      q: 'Cặp số liệu Thuỵ Điển – Ấn Độ chứng minh điều gì?',
      opts: [
        '99% người Thuỵ Điển từng xuất ngoại nhưng chỉ 47% thấy gắn kết; Ấn Độ chỉ 3% từng xuất ngoại mà 68% thấy gắn kết — nghĩa là sự gắn kết còn hình thành bằng những cách khác ngoài du lịch',
        'Người Thuỵ Điển gắn kết hơn người Ấn Độ vì đi nhiều hơn',
        'Cả hai nước có tỉ lệ gắn kết bằng nhau',
        'Không nước nào trong hai nước được khảo sát',
      ],
      a: '99% người Thuỵ Điển từng xuất ngoại nhưng chỉ 47% thấy gắn kết; Ấn Độ chỉ 3% từng xuất ngoại mà 68% thấy gắn kết — nghĩa là sự gắn kết còn hình thành bằng những cách khác ngoài du lịch',
      why: 'Bài viết dẫn đúng bốn con số đó rồi kết: “Such findings show that international connectedness can be formed in ways other than traveling overseas.”',
    },
    {
      q: 'Sadikova giải thích vì sao chị thấy gắn kết dù chưa từng xuất ngoại?',
      opts: [
        'Nhờ truyền thông — ngày nay việc nắm tin tức và sự kiện thế giới trở nên dễ dàng, khác hẳn nhiều năm trước',
        'Nhờ chị có họ hàng ở khắp các châu lục',
        'Nhờ chị làm việc cho một công ty đa quốc gia',
        'Nhờ chị từng làm tiếp viên hàng không',
      ],
      a: 'Nhờ truyền thông — ngày nay việc nắm tin tức và sự kiện thế giới trở nên dễ dàng, khác hẳn nhiều năm trước',
      why: 'Bài viết: “Some years ago it was difficult for us to get information about people in the world, but currently, because of media, it is quite easy to get acquainted with events and news.” Ước mơ tiếp viên hàng không của chị KHÔNG thành hiện thực.',
    },
  ],

  // Make a Memory Palace to Improve Your English
  'voa-doc-5855771': [
    {
      q: '“Cung điện ký ức” (memory palace) là gì?',
      opts: [
        'Một không gian có thật mà bạn hình dung trong đầu — như nhà mình — rồi tưởng tượng đặt những thứ cần nhớ vào các vị trí dọc lối đi quen thuộc',
        'Một toà nhà xây riêng để trưng ảnh kỷ niệm',
        'Một ứng dụng điện thoại luyện trí nhớ',
        'Một trò chơi trên truyền hình BBC',
      ],
      a: 'Một không gian có thật mà bạn hình dung trong đầu — như nhà mình — rồi tưởng tượng đặt những thứ cần nhớ vào các vị trí dọc lối đi quen thuộc',
      why: 'Bài viết: “It is a real structure, such as a home or building, that you can picture in your head. You then imagine placing things you want to remember inside the structure.” Phim BBC chỉ làm nó nổi tiếng — phương pháp đã tồn tại hàng nghìn năm.',
    },
    {
      q: 'Theo thầy giáo James, ba chìa khoá của một cung điện ký ức mạnh là gì?',
      opts: [
        'Cảm xúc, chuyển động, và kết nối giữa vật cần nhớ với một thứ CỐ ĐỊNH trong không gian',
        'Màu sắc, âm thanh và mùi hương',
        'Lặp lại, ghi chép và kiểm tra',
        'Im lặng, tập trung và ngủ đủ',
      ],
      a: 'Cảm xúc, chuyển động, và kết nối giữa vật cần nhớ với một thứ CỐ ĐỊNH trong không gian',
      why: 'Bài viết: “there are three keys to a strong memory palace. They are: emotion, movement, and connections between the object and something permanent” — ví dụ khối phô mai treo TRÊN TƯỜNG.',
    },
    {
      q: 'Vì sao mọi hình ảnh trong ví dụ (thìa men xem TV, hai quả cà chua đuổi nhau…) đều kỳ quặc?',
      opts: [
        'Vì tưởng tượng theo cách hài hước, điên rồ giúp nhớ lâu hơn — các chuyên gia trong bài đều đồng ý như vậy',
        'Vì tác giả muốn gây cười cho vui',
        'Vì trẻ em là đối tượng chính của bài',
        'Vì hình ảnh bình thường không thể tưởng tượng được',
      ],
      a: 'Vì tưởng tượng theo cách hài hước, điên rồ giúp nhớ lâu hơn — các chuyên gia trong bài đều đồng ý như vậy',
      why: 'Bài viết: “imagining things in a humorous or crazy way improves your ability to remember them” và “connecting images to actions or movement will create lasting memories.”',
    },
    {
      q: 'Khi cần nhớ NHIỀU từ, chuyên gia Anthony Metivier khuyên bắt đầu thế nào?',
      opts: [
        'Vẽ một bản đồ đơn giản của cung điện, đánh số trước các vị trí sẽ đặt đồ, rồi mới thêm hình ảnh tưởng tượng sau',
        'Học thuộc lòng từng từ trước khi xây cung điện',
        'Thu âm danh sách từ rồi nghe khi ngủ',
        'Chép mỗi từ một trăm lần',
      ],
      a: 'Vẽ một bản đồ đơn giản của cung điện, đánh số trước các vị trí sẽ đặt đồ, rồi mới thêm hình ảnh tưởng tượng sau',
      why: 'Bài viết: “first drawing a simple map of your memory palace. Then, number the places along your path where you will put the things that you want to remember… Later, you will add the mental imagery.”',
    },
  ],

  // Improve Your Reading Through Context Clues
  'voa-doc-5332817': [
    {
      q: 'Vì sao cả hai phản xạ thường gặp — tra từ điển mọi từ lạ, hoặc bỏ luôn bài đọc — đều không tối ưu?',
      opts: [
        'Bỏ đọc để lại cảm giác thất bại, còn dừng lại tra từng từ làm chậm hẳn việc đọc',
        'Vì từ điển thường dịch sai',
        'Vì bài đọc nào cũng quá khó',
        'Vì người đọc giỏi không bao giờ gặp từ lạ',
      ],
      a: 'Bỏ đọc để lại cảm giác thất bại, còn dừng lại tra từng từ làm chậm hẳn việc đọc',
      why: 'Bài viết: “avoiding reading may leave you feeling defeated. And pausing to look up every word can slow down your reading.” Giải pháp thay thế là manh mối ngữ cảnh.',
    },
    {
      q: 'Bốn loại manh mối ngữ cảnh trong bài là gì?',
      opts: [
        'Từ đồng nghĩa, từ trái nghĩa, ngữ đồng vị (appositive) và ví dụ',
        'Tiền tố, hậu tố, gốc từ và trọng âm',
        'Tiêu đề, hình ảnh, chú thích và mục lục',
        'Ngữ pháp, phát âm, chính tả và dấu câu',
      ],
      a: 'Từ đồng nghĩa, từ trái nghĩa, ngữ đồng vị (appositive) và ví dụ',
      why: 'Bốn mục Tip của bài: Synonyms, Antonyms, Appositives, Examples — appositive là “danh từ/cụm danh từ đứng sau một danh từ khác để định nghĩa nó”, thường có dấu phẩy hai bên.',
    },
    {
      q: 'Những từ nào báo hiệu có thể sắp gặp một ý TRÁI NGHĨA?',
      opts: [
        'But, however, though, although, unlike, whereas, despite',
        'For example, for instance, such as, like',
        'And, also, moreover, in addition',
        'First, second, third, finally',
      ],
      a: 'But, however, though, although, unlike, whereas, despite',
      why: 'Bài viết: “look for contrast words, such as ‘but,’ ‘however,’ ‘though,’ ‘although,’ ‘unlike,’ ‘whereas’ and ‘despite.’ These words signal that some opposite idea or meaning is coming.” Nhóm “for example, such as…” là từ báo hiệu VÍ DỤ.',
    },
    {
      q: 'Lời khuyên khép lại bài là gì?',
      opts: [
        'Không cần biết nghĩa của MỌI từ — hãy tự hỏi mình có hiểu được câu mà không cần từ đó không, và đừng ép bản thân giỏi kỹ năng này quá nhanh',
        'Phải học thuộc 100 từ mới mỗi ngày',
        'Chỉ nên đọc những bài không có từ lạ',
        'Luôn đọc to mọi bài để nhớ lâu',
      ],
      a: 'Không cần biết nghĩa của MỌI từ — hãy tự hỏi mình có hiểu được câu mà không cần từ đó không, và đừng ép bản thân giỏi kỹ năng này quá nhanh',
      why: 'Bài viết: “it is often not necessary to know the meaning of every word to understand what you are reading… ask yourself whether you can understand the sentence without it” và “Don’t pressure yourself to be great at the skill too quickly.”',
    },
  ],

  // Train Your Brain to Think in English
  'voa-doc-5023664': [
    {
      q: 'Theo bài, vì sao lời nói của người học thường chậm và thiếu tự nhiên?',
      opts: [
        'Vì đầu óc vẫn đang DỊCH từ tiếng mẹ đẻ sang tiếng Anh thay vì nghĩ thẳng bằng tiếng Anh',
        'Vì họ phát âm sai quá nhiều',
        'Vì họ chưa học đủ ngữ pháp',
        'Vì họ nói quá nhỏ',
      ],
      a: 'Vì đầu óc vẫn đang DỊCH từ tiếng mẹ đẻ sang tiếng Anh thay vì nghĩ thẳng bằng tiếng Anh',
      why: 'Bài viết: “your speech might be slower than you would like. This is because your mind is still translating from your first language, which can also sound unnatural.”',
    },
    {
      q: 'Các bài tập trong bài được xếp theo bậc thang nào?',
      opts: [
        'Nghĩ bằng TỪ đơn lẻ → mô tả từ chưa biết → nghĩ bằng CÂU đơn giản → tả một ngày của mình → tưởng tượng cả cuộc HỘI THOẠI',
        'Nghe → nói → đọc → viết → dịch',
        'Học thuộc → kiểm tra → thi thử → thi thật',
        'Ngữ pháp → từ vựng → phát âm → giao tiếp',
      ],
      a: 'Nghĩ bằng TỪ đơn lẻ → mô tả từ chưa biết → nghĩ bằng CÂU đơn giản → tả một ngày của mình → tưởng tượng cả cuộc HỘI THOẠI',
      why: 'Đúng thứ tự các mục của bài: Think in single words (danh từ trước, thêm động từ sau) → Describe unknown words → Think in sentences → Describe your day → Think in conversation.',
    },
    {
      q: 'Khi không nhớ ra từ “garage”, thầy Thomas khuyên làm gì?',
      opts: [
        'Mô tả nó bằng lời khác trong đầu: “The place inside where I put my car”, hoặc dùng khuôn “It’s similar to… / It’s the opposite of…”',
        'Dừng lại tra từ điển ngay lập tức',
        'Bỏ qua và không bao giờ dùng từ đó nữa',
        'Chuyển sang nói tiếng mẹ đẻ',
      ],
      a: 'Mô tả nó bằng lời khác trong đầu: “The place inside where I put my car”, hoặc dùng khuôn “It’s similar to… / It’s the opposite of…”',
      why: 'Bài viết: “you can say, ‘The place inside where I put my car.’ Or… ‘It’s next to my house. I keep things there.’” và “you can also use shorter phrases, such as ‘It’s similar to…’ or ‘It’s the opposite of…’”',
    },
    {
      q: 'Thầy Hinshaw khuyên ghi chép từ mới thế nào?',
      opts: [
        'Chỉ 5–10 từ và cụm mỗi ngày — sổ tay giúp nhớ TÌNH HUỐNG mình cần từ đó, để lần sau gặp lại tình huống là bật ra',
        'Chép toàn bộ từ điển mỗi tháng một chương',
        'Ghi âm thay vì viết',
        'Chỉ ghi những từ dài trên mười chữ cái',
      ],
      a: 'Chỉ 5–10 từ và cụm mỗi ngày — sổ tay giúp nhớ TÌNH HUỐNG mình cần từ đó, để lần sau gặp lại tình huống là bật ra',
      why: 'Bài viết: “Hinshaw suggests writing down just five to 10 new words and phrases each day. Keeping a notebook… helps you remember the situation that you needed that word or phrase for.”',
    },
  ],

  // Successful Debate Is Like Building a House
  'voa-doc-3270255': [
    {
      q: 'Theo giáo sư LeBeau, debate nằm ở đâu giữa presentation và discussion?',
      opts: [
        'Presentation là trải nghiệm MỘT CHIỀU, discussion thì không có khuôn dạng rõ ràng — debate dẫn tới thảo luận tự nhiên hơn vì buộc phải hiểu và đáp lại quan điểm của đối phương',
        'Debate chính là presentation có thêm khán giả',
        'Debate dễ hơn cả hai vì không cần chuẩn bị',
        'Debate chỉ là discussion nói to hơn',
      ],
      a: 'Presentation là trải nghiệm MỘT CHIỀU, discussion thì không có khuôn dạng rõ ràng — debate dẫn tới thảo luận tự nhiên hơn vì buộc phải hiểu và đáp lại quan điểm của đối phương',
      why: 'Bài viết: “presentation, which is mostly a one-way experience… discussion… there is no real clear, exacting format” và “debate leads towards a more natural discussion… I would address each of the points in your position and comment on them.”',
    },
    {
      q: 'Trong ẩn dụ “ngôi nhà”, ba phần của một lập luận là gì?',
      opts: [
        'MÁI là trọng tâm của cuộc tranh luận; các CỘT là lý lẽ chống đỡ; MÓNG bê tông là số liệu, ví dụ và ý kiến chuyên gia',
        'MÁI là kết luận; CỬA là mở bài; TƯỜNG là thân bài',
        'MÓNG là cảm xúc; CỘT là giọng nói; MÁI là cử chỉ',
        'Cả ba phần đều là các câu hỏi chất vấn',
      ],
      a: 'MÁI là trọng tâm của cuộc tranh luận; các CỘT là lý lẽ chống đỡ; MÓNG bê tông là số liệu, ví dụ và ý kiến chuyên gia',
      why: 'Bài viết: “The focus of the discussion or the debate is the roof. The reasons and arguments are the ‘pillars’ to support the roof. The data, numbers, examples, and expert opinions provide the concrete foundation.”',
    },
    {
      q: 'Một cuộc thi debate truyền thống có cấu trúc thế nào?',
      opts: [
        'Hai đội nhận một “resolution”: đội ủng hộ và đội phản đối lần lượt trình bày, chất vấn nhau, bổ sung lập luận rồi tổng kết — có thể tới 12 lượt nói',
        'Mỗi người nói một bài diễn văn dài một giờ',
        'Khán giả bỏ phiếu chọn người nói to nhất',
        'Hai đội cùng bảo vệ một quan điểm giống nhau',
      ],
      a: 'Hai đội nhận một “resolution”: đội ủng hộ và đội phản đối lần lượt trình bày, chất vấn nhau, bổ sung lập luận rồi tổng kết — có thể tới 12 lượt nói',
      why: 'Bài viết: “One team is the affirmative team… One is the negative… Each team gives an argument… Then each team asks questions… Finally, they summarize the arguments. In a classic debate, teams may take 12 turns.”',
    },
    {
      q: 'Vì sao người Hy Lạp cổ coi trọng những kỹ năng của debate?',
      opts: [
        'Họ cho rằng trong một nền dân chủ, con người cần biết nói trước công chúng để bảo vệ quan điểm và đưa bằng chứng chống đỡ cho nó — và họ tổ chức các cuộc thi để rèn những kỹ năng ấy',
        'Vì debate là môn thi bắt buộc ở Olympic cổ đại',
        'Vì họ muốn đào tạo diễn viên sân khấu',
        'Vì luật pháp cấm tranh cãi ngoài cuộc thi',
      ],
      a: 'Họ cho rằng trong một nền dân chủ, con người cần biết nói trước công chúng để bảo vệ quan điểm và đưa bằng chứng chống đỡ cho nó — và họ tổ chức các cuộc thi để rèn những kỹ năng ấy',
      why: 'Bài viết: “The Greeks thought that, in a democracy, people needed to have certain skills. These skills included speaking in public in favor of an opinion, and providing evidence… The Greeks supported the development of these skills by holding contests.”',
    },
  ],

  // Body Language Can Help With Public Speaking
  'voa-doc-3196872': [
    {
      q: '“Thông điệp cơ thể” trong bài gồm những thành phần nào?',
      opts: [
        'Tư thế, giao tiếp bằng mắt và cử chỉ (cách di chuyển tay, cánh tay)',
        'Trang phục, kiểu tóc và giày dép',
        'Âm lượng, tốc độ nói và ngữ điệu',
        'Slide, ghi chú và micro',
      ],
      a: 'Tư thế, giao tiếp bằng mắt và cử chỉ (cách di chuyển tay, cánh tay)',
      why: 'Bài viết: “body language includes posture, eye contact and gestures - how you move your hands or arms.”',
    },
    {
      q: 'Theo LeBeau, vì sao người thuyết trình không bản ngữ đặc biệt khó kiểm soát cơ thể?',
      opts: [
        'Vì họ lo lắng KÉP: vừa lo việc thuyết trình, vừa lo tiếng Anh của mình — đầu óc bận vật lộn với ngữ pháp nên không còn sức điều khiển cơ thể',
        'Vì họ không được dạy khiêu vũ',
        'Vì sân khấu ở nước ngoài rộng hơn',
        'Vì khán giả nước ngoài khó tính hơn',
      ],
      a: 'Vì họ lo lắng KÉP: vừa lo việc thuyết trình, vừa lo tiếng Anh của mình — đầu óc bận vật lộn với ngữ pháp nên không còn sức điều khiển cơ thể',
      why: 'Bài viết: “Not only are they nervous because they’re doing a presentation, but in addition to that they’re really nervous because of their English… they’re trying to figure out the grammar… and also controlling their body.” Lỗi điển hình: quay mặt vào bảng hoặc màn hình thay vì khán giả.',
    },
    {
      q: 'LeBeau khuyên sửa slide thế nào để giữ được giao tiếp mắt?',
      opts: [
        'Dùng HÌNH ẢNH kèm vài chữ thay cho các câu dài — hình truyền đạt nhanh và rõ hơn chữ, và người nói được rảnh mắt để nhìn khán giả',
        'Viết cả bài nói lên slide để đọc cho chuẩn',
        'Không dùng slide nữa',
        'Thuê người khác bấm slide hộ',
      ],
      a: 'Dùng HÌNH ẢNH kèm vài chữ thay cho các câu dài — hình truyền đạt nhanh và rõ hơn chữ, và người nói được rảnh mắt để nhìn khán giả',
      why: 'Bài viết: “use images and few words for notes instead of sentences… the images will communicate faster and more clearly than words.” Cầm giấy ghi chú còn làm cử chỉ mất tự nhiên.',
    },
    {
      q: 'Vì sao lớp của LeBeau dạy “thông điệp cơ thể” TRƯỚC TIÊN?',
      opts: [
        'Vì nó dễ thay đổi nhất — học viên nhìn thấy mình tiến bộ ngay sau vài buổi, có trải nghiệm tích cực và tin rằng “mình làm được”',
        'Vì ngữ pháp không quan trọng trong thuyết trình',
        'Vì đó là phần khó nhất nên phải học sớm',
        'Vì giáo trình bắt buộc dạy theo thứ tự đó',
      ],
      a: 'Vì nó dễ thay đổi nhất — học viên nhìn thấy mình tiến bộ ngay sau vài buổi, có trải nghiệm tích cực và tin rằng “mình làm được”',
      why: 'Bài viết: “The first thing that we deal with is the physical message… so students can have a real positive experience really quickly… it’s the easiest to change, and maybe the most important thing to deal with first.” Cách tự sửa: quay video chính mình rồi xem lại.',
    },
  ],

  // Tech Tip: Google Wallet Now Creates Digital IDs from Photos
  'voa-doc-7742571': [
    {
      q: 'Công cụ mới của Google Wallet cho phép làm gì?',
      opts: [
        'Tạo bản số của gần như mọi loại thẻ và vé bằng cách CHỤP ẢNH giấy tờ (hoặc chụp màn hình) — AI đọc thông tin từ ảnh để dựng thẻ số',
        'In thẻ nhựa từ bản số có sẵn',
        'Chuyển tiền quốc tế không mất phí',
        'Tạo hộ chiếu giấy mới qua mạng',
      ],
      a: 'Tạo bản số của gần như mọi loại thẻ và vé bằng cách CHỤP ẢNH giấy tờ (hoặc chụp màn hình) — AI đọc thông tin từ ảnh để dựng thẻ số',
      why: 'Bài viết: “These digital versions can be created by the user taking a picture of the physical document or by doing a screen capture… Google Wallet then uses artificial intelligence (AI) technology to use information from the photo to create a new digital pass.”',
    },
    {
      q: 'Danh mục mới “Everything Else” sinh ra để làm gì?',
      opts: [
        'Cho phép số hoá bất kỳ loại thẻ hay giấy tờ nào KHÔNG thuộc các nhóm sẵn có (thẻ thanh toán, vé đi lại, thẻ ID) — như thẻ tập gym, thẻ y tế, thẻ bảo hiểm',
        'Lưu ảnh và video cá nhân',
        'Chứa các ứng dụng ít dùng',
        'Bán vé sự kiện cho người khác',
      ],
      a: 'Cho phép số hoá bất kỳ loại thẻ hay giấy tờ nào KHÔNG thuộc các nhóm sẵn có (thẻ thanh toán, vé đi lại, thẻ ID) — như thẻ tập gym, thẻ y tế, thẻ bảo hiểm',
      why: 'Bài viết: “a new category, called ‘Everything Else’… to permit users to make digital copies of just about any card, pass or document” — trước đó Wallet chia cứng theo nhóm.',
    },
    {
      q: 'Với giấy tờ chính thức, Google thêm lớp bảo mật nào?',
      opts: [
        'Chúng thành “private passes”, và dữ liệu bên trong CHỈ được lưu trên chính thiết bị như một biện pháp an toàn bổ sung',
        'Dữ liệu được đăng công khai để dễ xác minh',
        'Mỗi lần mở phải trả một khoản phí nhỏ',
        'Chỉ xem được khi có kết nối internet',
      ],
      a: 'Chúng thành “private passes”, và dữ liệu bên trong CHỈ được lưu trên chính thiết bị như một biện pháp an toàn bổ sung',
      why: 'Bài viết: “These ‘private passes’ can also be added to Google Wallet. Google says data contained in official digital documents is only saved on the device as an extra security measure.”',
    },
    {
      q: 'Bài nói gì về hộ chiếu số trong Google Wallet?',
      opts: [
        'Đang được phát triển; có thể giúp không phải xuất trình hộ chiếu thật trong vài trường hợp, nhưng KHÔNG được thiết kế để thay thế hộ chiếu giấy — người dùng vẫn phải mang theo',
        'Đã phát hành và thay thế hoàn toàn hộ chiếu giấy',
        'Bị chính phủ Mỹ cấm phát triển',
        'Chỉ dành cho công dân ngoài nước Mỹ',
      ],
      a: 'Đang được phát triển; có thể giúp không phải xuất trình hộ chiếu thật trong vài trường hợp, nhưng KHÔNG được thiết kế để thay thế hộ chiếu giấy — người dùng vẫn phải mang theo',
      why: 'Bài viết: “the Google Wallet passport is still in development… might remove the need to present an actual passport in some cases. However, the digital version is not designed to replace the physical passport, which the user should continue to carry.”',
    },
  ],
};
