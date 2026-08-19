// File: src/data/storyQuizA1.js
// CÂU HỎI ĐỌC HIỂU MỨC VĂN BẢN — BẬC A1 (việc 3.1, phần mở rộng).
// SOẠN TAY. Luật chung + lý do tồn tại: xem src/data/storyQuiz.js.
//
// ══ BẬC A1 KHÁC BA BẬC KIA Ở MỘT ĐIỂM QUYẾT ĐỊNH ══
// Bài đọc ≥B1 phần lớn là TRUYỆN KỂ — hỏi "vì sao", "sau đó thế nào" là được.
// Bài A1 phần lớn là VĂN MIÊU TẢ đời thường: "Every morning, I wake up and
// decide what clothes to wear." Với loại bài này có một cái bẫy riêng:
//
//   **CÂU HỎI PHẢI KHÔNG TRẢ LỜI ĐƯỢC BẰNG KIẾN THỨC CHUNG.**
//
// "Người ta mặc gì khi trời lạnh?" là câu hỏi về THẾ GIỚI, ai cũng đoán được áo
// ấm — người học ghi điểm mà chưa hề đọc bài. Đó đúng là họ lỗi "dấu hiệu bề
// ngoài cho phép đoán đúng mà không cần hiểu" đã gặp hai lần ở đợt ≥B1 (đáp án
// nằm lì ở ô đầu; đáp án dài nhất). Ở A1 nó xuất hiện dưới dạng thứ ba, và là
// dạng khó thấy nhất vì câu hỏi trông rất hợp lý.
//
// Nên mọi câu ở đây neo vào một CHI TIẾT RIÊNG của chính bài đó: màu áo phông
// mùa hè là "light blue", số người trong nhà là "five", con vật gặp đầu tiên là
// "a butterfly". Đoán không ra, phải đọc mới biết.
//
// Câu nhiễu dựng từ chi tiết CÓ THẬT trong bài nhưng ghép sai — cùng luật đã
// dùng để chữa thiên lệch độ dài ở ba bậc trên (57,2% → 6,0%).
export const STORY_QUIZ_A1 = {
  'travel-transport': [
    {
      q: 'Ở phần 1, Bob phát hiện mình để quên gì khi tới sân bay?',
      options: [
        'Hộ chiếu và thị thực, vì anh bỏ chúng trong chiếc túi còn lại',
        'Thẻ lên máy bay, vì anh chưa kịp làm thủ tục ở quầy check-in',
        'Vé máy bay khứ hồi, vì máy bán vé chỉ in cho anh vé một chiều',
        'Giấy phép lái xe, vì anh cất nó cùng hợp đồng thuê xe ở nhà',
      ],
      answer: 0,
      dan: 'Arriving at the airport terminal, he realized he left his passport and visa in his other bag!',
    },
    {
      q: 'Ở phần 2, vì sao Bob phải đẩy xe tới trạm xăng?',
      options: [
        'Vì xe đã cạn hết nhiên liệu, hết cả dầu lẫn xăng',
        'Vì anh đi sai làn nên bị mắc cứng giữa đám tắc đường',
        'Vì anh cố vượt một chiếc xe khách rồi va vào lề đường',
        'Vì vô lăng bị khoá cứng ngay lúc anh vừa cài dây an toàn',
      ],
      answer: 0,
      dan: 'He had run out of fuel and petrol!',
    },
    {
      q: 'Ở phần 3, cái máy ở điểm xe buýt đã bán cho Bob loại vé nào?',
      options: [
        'Chỉ vé một chiều, nên sau đó anh không có vé hợp lệ để đi tiếp',
        'Vé khứ hồi giá rẻ, nhưng vé đó không dùng được cho tàu điện',
        'Vé tháng cho cả hệ thống, nhưng máy in sai ngày bắt đầu',
        'Vé tàu trên đường sắt, nên anh phải ra ga chờ ở phòng chờ lạnh',
      ],
      answer: 0,
      dan: "He walked to the bus stop to buy a return ticket, but the machine only gave him a single ticket (a cheap one-way ticket), so he didn't have a valid ticket for later.",
    },
    {
      q: 'Ở phần 4, vì sao Bob bị phạt tiền khi đi xe máy?',
      options: [
        'Vì anh không đội mũ bảo hiểm khi chuyển sang xe tay ga và xe máy',
        'Vì anh đi xe đạp thuê vào đúng làn dành riêng cho xe cơ giới',
        'Vì anh đọc sai bản đồ nên đi bộ băng qua chiếc cầu lớn',
        'Vì anh dừng xe ở bến cảng để chờ phà mà không mua vé',
      ],
      answer: 0,
      dan: 'He tried to cycle on a rented bicycle, then swapped to a scooter and a fast motorbike, but got fined for not wearing a helmet.',
    },
  ],

  'family-relationships': [
    {
      q: 'Theo bài, bố mẹ người kể đã nuôi mấy người con?',
      options: [
        'Bốn người con, và ngôi nhà họ ở lúc đó là một căn nhà nhỏ',
        'Ba người con, gồm một anh trai, một chị gái và người kể',
        'Hai người con, nên nhà chỉ có người kể và em gái nhỏ',
        'Năm người con, vì nhiều họ hàng cũng sống chung một nhà',
      ],
      answer: 0,
      dan: 'My parents raised four children in a small house.',
    },
    {
      q: 'Người kể có những người thân ruột nào cùng thế hệ?',
      options: [
        'Một anh trai lớn hơn và một em gái nhỏ hơn mình',
        'Một chị gái lớn hơn và một em trai nhỏ hơn mình',
        'Hai người em họ, con của chú và cô ruột của mình',
        'Một cháu trai còn đang tập đi, con của anh trai mình',
      ],
      answer: 0,
      dan: 'I have two siblings – an older brother and a younger sister.',
    },
    {
      q: 'Cháu trai của người kể là con của ai, và cậu bé đang làm gì?',
      options: [
        'Con của anh trai, còn là trẻ nhỏ và đang tập những bước đi',
        'Con của chú và cô, đang cùng người kể chơi suốt cả ngày',
        'Con của người em họ, vừa được giới thiệu với cả gia đình',
        'Con của chị gái, đang nghe bà kể chuyện về tổ tiên dòng họ',
      ],
      answer: 0,
      dan: 'My nephew, the son of my older brother, is just a toddler learning to walk.',
    },
    {
      q: 'Theo bài, ông của người kể sẽ nghỉ hưu khi nào?',
      options: [
        'Năm sau, sau bốn mươi năm đi làm của mình',
        'Vào mùa xuân, đúng dịp đám cưới của người em họ',
        'Ngay hè này, khi cả nhà về quê thăm ông bà',
        'Sau khi bà kể xong chuyện về các thế hệ trong họ',
      ],
      answer: 0,
      dan: 'My grandfather will retire next year after 40 years of working.',
    },
  ],

  'shopping-stores-beginner': [
    {
      q: 'Trước khi ra khỏi nhà, người kể làm việc gì?',
      options: [
        'Viết một danh sách mua sắm để không quên thứ mình cần',
        'Xem trước giá tiền của từng món ở quầy thu ngân',
        'Gọi cho người quản lý để hỏi cửa hàng còn cỡ nào',
        'Đếm lại số tiền trong ví để biết mình mua được bao nhiêu',
      ],
      answer: 0,
      dan: "Before I leave the house, I make a shopping list so I don't forget what I need.",
    },
    {
      q: 'Người kể cần cỡ áo nào, và cửa hàng có sẵn những cỡ nào?',
      options: [
        'Cần cỡ vừa, nhưng cửa hàng chỉ còn cỡ nhỏ hoặc cỡ lớn',
        'Cần cỡ nhỏ, nhưng cửa hàng chỉ còn cỡ vừa hoặc cỡ lớn',
        'Cần cỡ lớn, và cửa hàng còn đúng một chiếc cỡ lớn duy nhất',
        'Cần cỡ vừa, và người quản lý tìm được đúng cỡ đó trong kho',
      ],
      answer: 0,
      dan: 'I need a medium, but they only have small or large.',
    },
    {
      q: 'Chiếc áo người kể nhìn thấy có màu gì?',
      options: [
        'Màu đỏ, còn các màu khác trong cửa hàng thì họ chỉ nhìn qua',
        'Màu xanh dương, còn màu đỏ thì đã hết đúng cỡ vừa của mình',
        'Màu vàng, cùng màu với chiếc mũ mà họ định mua thêm',
        'Màu trắng, vì đó là màu dễ phối với chiếc váy đang có',
      ],
      answer: 0,
      dan: 'It is red, but I also see blue, green, yellow, black, and white.',
    },
    {
      q: 'Theo bài, khi nào người kể quyết định KHÔNG mua một món?',
      options: [
        'Khi món đó đắt quá nhiều tiền so với mức mình chịu được',
        'Khi món đó chỉ còn cỡ nhỏ hoặc cỡ lớn, không có cỡ vừa',
        'Khi cửa hàng đang đóng cửa nên không thể thử đồ tại chỗ',
        'Khi món đó không có đợt giảm giá hay khuyến mãi nào cả',
      ],
      answer: 0,
      dan: 'If it is too much money, I do not buy it.',
    },
  ],

  'kids-nature-animals': [
    {
      q: 'Con vật đầu tiên mà Benny gặp trong rừng là con gì?',
      options: [
        'Một con bướm có đôi cánh nhiều màu sắc rực rỡ',
        'Một con ong bay vụt qua và nhắc Benny phải cẩn thận',
        'Một con chim đang xây tổ trên một cái cây thật cao',
        'Một con ếch đang nhảy quanh cái ao ở sâu trong rừng',
      ],
      answer: 0,
      dan: 'First, he met a butterfly with colorful wings.',
    },
    {
      q: 'Con ong đã nói với Benny điều gì?',
      options: [
        'Rằng có đàn kiến đang xây một thành phố khổng lồ dưới đất',
        'Rằng phía trước có ao nước nơi ếch nhảy và cá đang bơi',
        'Rằng con nhện trong rừng làm nhiệm vụ kiểm soát lũ sâu bọ',
        'Rằng cầu vồng sẽ hiện lên trên trời ngay sau cơn mưa rào',
      ],
      answer: 0,
      dan: '"There are ants building a huge city underground!"',
    },
    {
      q: 'Theo Benny, mỗi loài trong rừng làm việc gì?',
      options: [
        'Ong làm mật, chim mang hạt đi khắp nơi, nhện kiểm soát sâu bọ',
        'Ong xây thành phố dưới đất, chim làm mật, nhện dệt tổ trên cây',
        'Ong mang hạt đi khắp nơi, chim kiểm soát sâu bọ, nhện làm mật',
        'Ong kiểm soát sâu bọ, chim xây thành phố, nhện mang hạt đi xa',
      ],
      answer: 0,
      dan: '"The bees make honey, the birds spread seeds, and even the spiders control insects.',
    },
    {
      q: 'Điều gì xảy ra lúc trời lặn khiến Benny chạy vội về nhà?',
      options: [
        'Sét loé lên trong những đám mây và tiếng sấm nổ vang',
        'Một cơn mưa rào đổ xuống rồi cầu vồng hiện lên trên trời',
        'Con voi bất ngờ vẩy nước từ dòng sông lên khắp người cậu',
        'Con cú bay vụt qua đầu cậu và kêu lên một tiếng thật to',
      ],
      answer: 0,
      dan: 'At sunset, lightning flashed in the clouds.',
    },
  ],

  'family-relationships-beginner': [
    {
      q: 'Theo bài, một gia đình Việt Nam điển hình thường có mấy thế hệ sống chung?',
      options: [
        'Ba thế hệ — ông bà, cha mẹ và con cái cùng chung một nhà',
        'Hai thế hệ — chỉ có cha mẹ và con cái sống trong một nhà',
        'Bốn thế hệ, tính cả các cô chú và anh chị em họ hàng gần',
        'Ba thế hệ, nhưng ông bà chỉ về ở chung trong dịp Tết',
      ],
      answer: 0,
      dan: 'In a typical household, three generations — grandparents, parents, and children — often live together, sharing a strong bond.',
    },
    {
      q: 'Buổi sáng, mỗi người trong nhà làm việc gì?',
      options: [
        'Mẹ nấu bữa sáng trong khi cha chuẩn bị đi làm',
        'Cha nấu bữa sáng trong khi mẹ chuẩn bị đi làm',
        'Anh chị em nấu bữa sáng rồi cùng nhau làm bài tập',
        'Ông bà nấu bữa sáng để cha mẹ kịp giờ đi làm sớm',
      ],
      answer: 0,
      dan: 'Every morning, the mother cooks breakfast while the father prepares for work.',
    },
    {
      q: 'Theo bài, đôi vợ chồng mới cưới làm gì trước lễ cưới?',
      options: [
        'Giới thiệu vị hôn phu hoặc hôn thê với cả đại gia đình',
        'Về quê thăm ông bà rồi mời toàn bộ họ hàng tới dự lễ',
        'Chờ tới dịp Tết để cả họ tụ họp rồi mới thông báo tin vui',
        'Cùng nhau chia việc nhà với cha mẹ của cả hai bên gia đình',
      ],
      answer: 0,
      dan: 'Vietnamese families value traditions: newlyweds introduce their fiancé or fiancée to the extended family before the wedding ceremony.',
    },
    {
      q: 'Khi một em bé chào đời, bài nói ai giúp chăm đứa trẻ?',
      options: [
        'Ông bà giúp nuôi đứa trẻ trong lúc cha mẹ đi làm',
        'Các cô chú và anh chị em họ thay nhau tới nhà giúp',
        'Anh chị lớn trong nhà, vì cha mẹ còn phải lo việc nhà',
        'Người con lớn nhất, còn ông bà chỉ dạy về lễ nghĩa',
      ],
      answer: 0,
      dan: 'When a baby is born, grandparents help raise the child while parents work.',
    },
  ],

  'food-drinks-beginner': [
    {
      q: 'Theo bài, bữa sáng của nhiều người gồm những gì?',
      options: [
        'Bánh mì hoặc một bát phở, kèm cà phê hay một cốc sữa',
        'Cơm với thịt bò, thịt lợn hoặc thịt gà và rau xanh tươi',
        'Một bát canh mẹ nấu, cá hoặc hải sản trộn cùng hành tỏi',
        'Trái cây ngọt như táo, chuối hoặc một miếng dưa hấu',
      ],
      answer: 0,
      dan: 'For breakfast, many people eat bread or a bowl of noodle soup like Pho, and drink a cup of coffee or a glass of milk.',
    },
    {
      q: 'Mẹ của người kể cắt những nguyên liệu nào rồi trộn với cá hoặc hải sản?',
      options: [
        'Hành, tỏi và cà chua, rồi trộn chúng với cá hay hải sản',
        'Cà chua, khoai tây và cà rốt mua ngoài chợ về từ sáng',
        'Rau xanh tươi, kèm chút muối và hạt tiêu cho đậm đà',
        'Thịt bò, thịt lợn và thịt gà để rán cùng một chút dầu',
      ],
      answer: 0,
      dan: 'She cuts onions, garlic, and tomatoes, and mixes them with fish or seafood.',
    },
    {
      q: 'Theo bài, người kể dùng những dụng cụ nào để ăn?',
      options: [
        'Đôi đũa, một cái thìa và một cái bát để ăn cơm hằng ngày',
        'Một cái đĩa, dao và nĩa, giống như khi ăn ở nhà hàng',
        'Chỉ một cái thìa, vì bữa nào cũng có canh mẹ nấu sẵn',
        'Đôi đũa và một cái đĩa, còn bát chỉ dùng để đựng canh',
      ],
      answer: 0,
      dan: 'We use chopsticks, a spoon, and a bowl to eat.',
    },
    {
      q: 'Sau khi ăn ở nhà hàng, gia đình người kể làm gì?',
      options: [
        'Hỏi người phục vụ lấy hoá đơn rồi để lại một ít tiền tip',
        'Xem lại thực đơn để gọi thêm món tráng miệng ngọt',
        'Gọi thêm pizza, hamburger hoặc một đĩa salad rau xanh',
        'Uống nước cam vắt hoặc một chút bia lạnh cho đỡ khát',
      ],
      answer: 0,
      dan: 'After we eat, we ask the waiter for the bill and leave a small tip.',
    },
  ],

  'clothes-colors-beginner': [
    {
      q: 'Vào mùa hè, người kể mặc áo phông màu gì?',
      options: [
        'Màu xanh nhạt, kèm quần đùi rộng bằng vải cotton',
        'Màu trắng, kèm một chiếc cà vạt cho dịp trang trọng',
        'Màu xám đậm, vì đó là màu của chiếc áo khoác dày',
        'Màu đỏ, cùng màu với chiếc váy mặc dịp cưới hỏi',
      ],
      answer: 0,
      dan: 'I put on a light blue T-shirt and loose shorts made of cotton, and wear sandals on my feet.',
    },
    {
      q: 'Khi mùa đông tới, người kể mặc những gì?',
      options: [
        'Áo len ấm, quần jean tối màu và áo khoác xám dày',
        'Áo phông cotton, quần đùi rộng và một đôi xăng đan',
        'Bộ đồ đen trang trọng, áo sơ mi trắng và một cà vạt',
        'Một chiếc váy đỏ đẹp hoặc áo lụa mặc cùng chân váy',
      ],
      answer: 0,
      dan: 'I wear a warm wool sweater, dark jeans, and a heavy gray coat.',
    },
    {
      q: 'Theo bài, đàn ông thường mặc gì cho dịp trang trọng như cưới hỏi hay phỏng vấn xin việc?',
      options: [
        'Bộ đồ đen hoặc xanh đậm, áo sơ mi trắng và một cà vạt',
        'Áo len ấm, quần jean tối màu và một chiếc áo khoác dày',
        'Áo lụa mặc cùng chân váy, thêm nhẫn vàng hoặc bông tai',
        'Áo phông nhẹ, quần đùi rộng và một đôi xăng đan mùa hè',
      ],
      answer: 0,
      dan: 'For formal events like a wedding or a job interview, men usually wear a black or dark blue suit, a white shirt, and a tie.',
    },
    {
      q: 'Người kể soi gương để kiểm tra điều gì?',
      options: [
        'Xem đôi giày nâu có ăn với chiếc thắt lưng da của mình không',
        'Xem chiếc áo có quá nhỏ hoặc quá chật với mình không',
        'Xem chiếc mũ và cặp kính râm có phù hợp ngày nắng không',
        'Xem chiếc váy đỏ có đẹp hơn chiếc áo lụa và chân váy không',
      ],
      answer: 0,
      dan: 'We look in the mirror to see if our brown shoes match our leather belt.',
    },
  ],

  'school-learning-beginner': [
    {
      q: 'Người kể tới trường bằng cách nào?',
      options: [
        'Đi xe buýt, sau khi xếp sách và bút chì vào ba lô',
        'Đi bộ, và chạy nếu hôm nào sắp muộn giờ vào lớp',
        'Đi cùng cô giáo, người đón mình ngay trước cổng trường',
        'Đạp xe quanh hồ, giống lúc cả nhà đi chơi cuối tuần',
      ],
      answer: 0,
      dan: 'Every morning, I wake up early, put my books and pencil in my backpack, and take the bus to school.',
    },
    {
      q: 'Môn học đầu tiên trong ngày của người kể là môn gì?',
      options: [
        'Tiếng Anh, sau đó mới tới toán, khoa học và lịch sử',
        'Toán, sau đó mới tới tiếng Anh, khoa học và lịch sử',
        'Mỹ thuật, vì đó là môn mà người kể thích nhất ở trường',
        'Lịch sử, rồi mới tới khoa học và cuối cùng là tiếng Anh',
      ],
      answer: 0,
      dan: 'Today, we have English class first.',
    },
    {
      q: 'Vì sao người kể thích giờ mỹ thuật nhất?',
      options: [
        'Vì trong giờ đó cả lớp được vẽ và tô màu bằng nhiều màu sắc',
        'Vì giờ đó cả lớp được ra sân chơi và ăn đồ trong hộp cơm',
        'Vì giờ đó cô giáo hỏi bài và mình được giơ tay trả lời',
        'Vì giờ đó được tra từ điển để hiểu những từ vựng khó',
      ],
      answer: 0,
      dan: 'I like art class the most because we draw and paint with many colors.',
    },
    {
      q: 'Theo bài, người kể phải làm gì trước một bài kiểm tra?',
      options: [
        'Đọc sách và làm thật nhiều bài tập về nhà để được điểm tốt',
        'Tra từ điển để hiểu hết những từ vựng khó trong sách',
        'Ra sân chơi cho đầu óc nhẹ nhõm rồi mới vào làm bài',
        'Nhờ cô giáo sửa lại những chỗ mình từng làm sai trước đó',
      ],
      answer: 0,
      dan: 'Before a test, I have to read my book and do a lot of homework to get a good grade.',
    },
  ],

  'hobbies-free-time-beginner': [
    {
      q: 'Anh trai của người kể thích môn thể thao nào?',
      options: [
        'Bóng đá và bóng rổ, chơi cùng đội của mình vào cuối tuần',
        'Bơi ở biển, và đạp xe quanh hồ vào những ngày trời nắng',
        'Cờ vua và các trò xếp hình khi trời mưa phải ở trong nhà',
        'Chạy bộ trong công viên, vì anh chạy rất nhanh',
      ],
      answer: 0,
      dan: 'He likes to play football and basketball with his team on the weekend.',
    },
    {
      q: 'Chị/em gái của người kể thích những thú vui nào?',
      options: [
        'Vẽ và tô tranh, hoặc chơi nhạc cụ như piano và guitar',
        'Đọc truyện tranh, nghe nhạc và xem phim trên tivi',
        'Chơi bóng đá và bóng rổ cùng đội vào mỗi cuối tuần',
        'Nấu ăn và nướng bánh quy cùng mẹ ở trong nhà bếp',
      ],
      answer: 0,
      dan: 'She likes to draw and paint pictures, or play a musical instrument like the piano or guitar.',
    },
    {
      q: 'Theo bài, nếu trời mưa thì cả nhà làm gì?',
      options: [
        'Ở nhà chơi trò chơi trên bàn, xếp hình hoặc chơi cờ vua',
        'Ra công viên đi bộ, hoặc đạp xe một vòng quanh hồ nước',
        'Ra biển tắm, hoặc tới sở thú để ngắm các loài động vật',
        'Nấu ăn và nướng bánh quy, rồi cùng ngồi xem phim trên tivi',
      ],
      answer: 0,
      dan: 'If it rains, we stay at home and play a board game, do a puzzle, or play chess.',
    },
    {
      q: 'Người kể thích làm gì cùng mẹ?',
      options: [
        'Nấu ăn và nướng bánh quy cùng nhau ở trong nhà',
        'Đi bộ trong công viên vào những ngày trời có nắng',
        'Đọc truyện tranh và nghe nhạc cho đỡ mệt sau giờ học',
        'Lên mạng trò chuyện và dùng máy tính để giải trí',
      ],
      answer: 0,
      dan: 'I also like to cook and bake cookies with my mother.',
    },
  ],

  'family-people-beginner': [
    {
      q: 'Theo bài, con của các cô chú (anh chị em của cha mẹ) gọi là gì?',
      options: [
        'Là anh chị em họ của bạn, con của các cô chú ruột',
        'Là anh chị em ruột của bạn, những người chơi và chia đồ',
        'Là cháu trai, cháu gái mà ông bà thường ôm khi tới thăm',
        'Là bạn học cùng lớp, những người sau này thành người bạn tốt',
      ],
      answer: 0,
      dan: 'Their children are your cousins.',
    },
    {
      q: 'Theo bài, ông bà thích làm gì khi các cháu tới thăm?',
      options: [
        'Cười tươi và ôm lấy cháu trai, cháu gái của mình',
        'Kể cho các cháu nghe chuyện về những đời trước trong họ',
        'Cùng các cháu chơi và chia nhau những món đồ chơi',
        'Dẫn các cháu đi dự cưới cùng thật nhiều khách mời',
      ],
      answer: 0,
      dan: 'They like to smile and hug their grandson and granddaughter when they visit.',
    },
    {
      q: 'Theo bài, một người đàn ông và một người phụ nữ trở thành vợ chồng sau những bước nào?',
      options: [
        'Gặp nhau, yêu nhau, rồi quyết định kết hôn với nhau',
        'Gặp nhau ở đám cưới của người khác rồi thành bạn tốt',
        'Cùng lớn lên trong một nhà rồi trở thành anh chị em họ',
        'Sinh con trước, rồi mới tổ chức cưới với nhiều khách mời',
      ],
      answer: 0,
      dan: 'A man and a woman meet, fall in love, and decide to marry.',
    },
    {
      q: 'Bài kết lại bằng hình ảnh nào về một gia đình hạnh phúc?',
      options: [
        'Mọi người cùng ngồi ở nhà để nói chuyện và cười với nhau',
        'Đám cưới đông khách mời, bạn bè và những người láng giềng',
        'Anh chị em cùng chơi, chia đồ chơi và đôi khi cãi nhau',
        'Ông bà tới thăm và ôm lấy các cháu trai, cháu gái của mình',
      ],
      answer: 0,
      dan: 'But the memory of a happy family, where everyone sits together at home to talk and laugh, will always remain.',
    },
  ],

  'food-meals-beginner': [
    {
      q: 'Bữa sáng của người kể thường gồm những gì?',
      options: [
        'Bánh mì phết bơ, một quả trứng luộc và sữa hoặc cà phê nóng',
        'Cơm với cá, thịt lợn hay thịt bò, kèm theo một bát canh',
        'Hamburger, xúc xích hoặc bánh kẹp cùng khoai tây chiên',
        'Một quả táo hoặc quả chuối, uống thêm nước cam cho mát',
      ],
      answer: 0,
      dan: 'I usually have bread with butter, a boiled egg, and I drink a glass of milk or a cup of hot coffee.',
    },
    {
      q: 'Nếu bận, người kể ăn trưa bằng gì?',
      options: [
        'Đồ ăn nhanh như hamburger, xúc xích hay bánh kẹp và khoai chiên',
        'Cơm ăn với cá, thịt lợn hoặc thịt bò và thêm một bát canh nóng',
        'Một quả táo hoặc quả chuối, coi như bữa nhẹ giữa buổi chiều',
        'Món tráng miệng ngọt như bánh sô cô la hoặc kem lạnh',
      ],
      answer: 0,
      dan: 'If I am busy, I just buy some fast food like a hamburger, a hot dog, or a sandwich with fries and ketchup.',
    },
    {
      q: 'Theo bài, bữa nào là bữa lớn nhất trong ngày?',
      options: [
        'Bữa tối, bữa mà mẹ nấu bằng thịt và rau mua ngoài chợ',
        'Bữa trưa, bữa có cơm với cá, thịt và một bát canh nóng',
        'Bữa sáng, bữa có bánh mì phết bơ và một quả trứng luộc',
        'Bữa nhẹ buổi chiều, khi cả nhà cùng ăn trái cây và uống nước',
      ],
      answer: 0,
      dan: 'Dinner is the biggest meal of the day.',
    },
    {
      q: 'Mẹ của người kể mua rau củ gì ở ngoài chợ?',
      options: [
        'Cà chua, khoai tây và cà rốt, cùng thịt và hải sản tươi',
        'Hành, tỏi và ớt để rán cùng thịt gà trong một chút dầu',
        'Táo, chuối và dưa hấu để cả nhà ăn làm bữa nhẹ',
        'Rau xà lách để trộn salad, thêm chút muối và hạt tiêu',
      ],
      answer: 0,
      dan: 'She buys fresh meat, seafood, and vegetables like tomatoes, potatoes, and carrots from the market.',
    },
  ],

  'body-health-beginner': [
    {
      q: 'Theo bài, ta dùng những bộ phận nào để nếm và ăn thức ăn?',
      options: [
        'Miệng, môi và lưỡi, còn bên trong miệng có răng để nhai',
        'Mũi để ngửi, còn tai thì dùng để nghe âm thanh quanh mình',
        'Hai tay với bàn tay và ngón tay để chạm và giữ đồ vật',
        'Hai chân với đầu gối và bàn chân để đứng, đi và chạy',
      ],
      answer: 0,
      dan: 'We use our eyes to see, our ears to hear, our nose to smell, and our mouth, lips, and tongue to taste and eat food.',
    },
    {
      q: 'Theo bài, bên trong lồng ngực có gì và nó làm việc gì?',
      options: [
        'Trái tim đập để bơm máu, còn não giúp chúng ta suy nghĩ',
        'Hai lá phổi giúp thở, còn răng bên trong miệng thì để nhai',
        'Bộ não điều khiển hai tay để chạm và giữ mọi đồ vật',
        'Xương và da, những thứ có thể bị đứt hoặc bị gãy khi ngã',
      ],
      answer: 0,
      dan: 'Inside our chest, our heart beats to pump blood, and our brain helps us think.',
    },
    {
      q: 'Theo bài, ăn quá nhiều đồ ăn vặt sẽ dẫn tới điều gì?',
      options: [
        'Sẽ trở nên béo và nặng nề hơn so với trước',
        'Sẽ bị cảm lạnh, ho nhiều, sốt hoặc mắc cúm',
        'Sẽ thấy mệt và yếu, phải tới bệnh viện khám',
        'Sẽ bị đau đầu, và khi răng đau thì thành đau răng',
      ],
      answer: 0,
      dan: 'If we eat too much junk food, we will get fat and heavy.',
    },
    {
      q: 'Nếu bị ngã, theo bài ta có thể gặp chuyện gì và cần gì?',
      options: [
        'Có thể bị đứt da chảy máu hoặc gãy xương, cần băng và nghỉ nhiều',
        'Có thể bị đau đầu hoặc đau răng, cần bác sĩ cho thuốc uống',
        'Có thể bị cảm lạnh và sốt, cần y tá kiểm tra rồi cho viên thuốc',
        'Có thể thấy mệt và yếu, cần ăn uống đủ chất và tập luyện lại',
      ],
      answer: 0,
      dan: 'If we fall, we might get a cut on our skin that bleeds, or a broken bone.',
    },
  ],

  'clothes-fashion-beginner': [
    {
      q: 'Người kể mặc gì để đi làm?',
      options: [
        'Áo sơ mi trắng sạch, một cà vạt và một chiếc quán dài tối màu',
        'Áo phông cotton, quần jean xanh và một đôi giày thể thao',
        'Quần đùi, mũ lưỡi trai và xăng đan như khi ra ngoài biển',
        'Áo khoác dày cùng khăn len, vì trời mùa đông rất lạnh',
      ],
      answer: 0,
      dan: 'For work, I usually wear a clean white shirt, a tie, and a pair of dark trousers.',
    },
    {
      q: 'Cuối tuần, người kể thích mặc gì hơn?',
      options: [
        'Đồ thoải mái: áo phông cotton, quần jean xanh và giày thể thao',
        'Bộ đồ trang trọng cùng đôi giày da đen, vì nó rất vừa vặn với mình',
        'Quần đùi, mũ lưỡi trai và xăng đan, dù không ra biển',
        'Áo khoác dày và khăn len để giữ ấm suốt cả ngày nghỉ',
      ],
      answer: 0,
      dan: 'I take off my work uniform and dress up in a cotton T-shirt, blue jeans, and sneakers.',
    },
    {
      q: 'Khi thử đồ ở cửa hàng, người kể kiểm tra điều gì?',
      options: [
        'Thử các cỡ khác nhau để chắc là đồ không quá chật hay quá rộng',
        'Soi gương xem đôi giày có ăn với chiếc thắt lưng da không',
        'Xem chiếc áo có đúng màu trắng như mình muốn hay không',
        'Hỏi người bán xem cửa hàng còn cỡ nào ngoài cỡ vừa',
      ],
      answer: 0,
      dan: 'I like to try on different sizes, like medium or large, to make sure they are not too tight or too loose.',
    },
    {
      q: 'Theo bài, điều quan trọng nhất khi mặc quần áo là gì?',
      options: [
        'Mặc thứ khiến bạn thấy dễ chịu và tự tin về chính mình',
        'Mặc theo đúng những mốt đang thịnh hành ở thời điểm đó',
        'Mặc đồ trang trọng để phù hợp với mọi hoàn cảnh đi làm',
        'Mặc đồ có giá tốt, mua đúng dịp đang giảm giá ở cửa hàng',
      ],
      answer: 0,
      dan: 'Whether you like old-fashioned styles or fashionable trends, the most important thing is to wear clothes that make you feel good and confident.',
    },
  ],

  'colors-shapes-beginner': [
    {
      q: 'Theo bài, một quyển sách có hình gì?',
      options: [
        'Hình chữ nhật, có các cạnh thẳng và bốn góc',
        'Hình vuông, giống bàn cờ với các ô đen trắng',
        'Hình tam giác, giống một miếng bánh pizza',
        'Hình tròn hoàn hảo, giống một quả bóng',
      ],
      answer: 0,
      dan: 'A book is a rectangle with straight edges and four corners.',
    },
    {
      q: 'Bài so sánh con voi với con chuột như thế nào?',
      options: [
        'Voi to, nặng, da xám dày; còn chuột thì nhỏ xíu và nhẹ',
        'Voi nhỏ nhưng nặng; còn chuột thì to và da xám rất dày',
        'Cả hai đều nhẹ, chỉ khác nhau ở màu da và độ dày của da',
        'Voi có da nhẵn mịn như lụa; còn chuột thì cứng và thô ráp',
      ],
      answer: 0,
      dan: 'An elephant is a huge, heavy animal with thick gray skin, while a mouse is a tiny, light creature.',
    },
    {
      q: 'Khi muốn mua một cái bàn mới, ta dùng thước để đo những gì?',
      options: [
        'Chiều dài, chiều rộng và chiều cao, để chắc bàn không quá to hay quá nhỏ',
        'Màu gỗ và độ nhẵn của mặt bàn, xem nó có mịn được như lụa hay không',
        'Hình dạng của mặt bàn, xem nó là hình chữ nhật hay hình vuông',
        'Số góc và số cạnh thẳng của mặt bàn trước khi trả tiền mua',
      ],
      answer: 0,
      dan: 'When we want to buy a new desk, we use a ruler to measure the length, width, and height to make sure it is not too big or too small.',
    },
    {
      q: 'Bài lấy hai ví dụ nào để so sánh vật mềm mịn với vật cứng thô?',
      options: [
        'Lụa thì mềm và mịn, còn một hòn đá thì cứng và thô ráp',
        'Gỗ thì mềm và mịn, còn một đồng xu bạc thì cứng và thô',
        'Cỏ thì mềm và mịn, còn da voi thì dày, cứng và thô ráp',
        'Một quả bóng thì mềm và mịn, còn bàn cờ thì cứng và thô',
      ],
      answer: 0,
      dan: 'Some objects are soft and smooth, like silk, while others are hard and rough, like a rock.',
    },
  ],

  'weather-seasons-beginner': [
    {
      q: 'Vào mùa hè, bài khuyên nên dùng những gì vì nắng rất mạnh?',
      options: [
        'Kính râm, một chiếc mũ và bôi thêm kem chống nắng',
        'Áo khoác dày, khăn quàng, găng tay và một đôi bốt',
        'Áo len ấm cùng trà nóng khi phải ở trong nhà tránh bão',
        'Kính râm và một chiếc khăn quàng để chắn gió mát thổi',
      ],
      answer: 0,
      dan: 'Because the sun is very strong, you should wear sunglasses, a hat, and put on sunscreen.',
    },
    {
      q: 'Vào mùa thu, lá trên cây đổi màu như thế nào?',
      options: [
        'Từ xanh sang vàng và đỏ, rồi rụng xuống mặt đất',
        'Từ vàng sang xanh, rồi ở lại trên cây suốt cả mùa',
        'Từ đỏ sang trắng, rồi bị tuyết phủ kín trên mặt đất',
        'Từ xanh sang trắng, cùng lúc hoa nở rộ trên các cành',
      ],
      answer: 0,
      dan: 'The leaves on the trees change color from green to yellow and red, and then drop to the ground.',
    },
    {
      q: 'Theo bài, vào ngày trời nhiều mây của mùa đông thì điều gì xảy ra?',
      options: [
        'Nhiệt độ tụt xuống dưới không và trời bắt đầu có tuyết rơi',
        'Nhiệt độ tăng lên và trời trở nên rất ẩm, dễ bị ra mồ hôi',
        'Một cơn gió mát thổi qua và lá trên cây bắt đầu đổi màu',
        'Nắng chiếu rực trên nền trời trong xanh và hoa nở trên cây',
      ],
      answer: 0,
      dan: 'On a cloudy day, the temperature drops below zero and it begins to snow.',
    },
    {
      q: 'Nếu có bão lớn kèm mưa to, sấm và sét, bài khuyên làm gì?',
      options: [
        'Nên ở trong nhà và uống trà nóng cho ấm người',
        'Nên ra biển tắm vì sau bão nước sẽ mát hơn hẳn',
        'Nên mặc áo khoác dày rồi ra ngoài ngắm cầu vồng',
        'Nên đeo kính râm, đội mũ và bôi kem chống nắng',
      ],
      answer: 0,
      dan: 'If there is a bad storm with heavy rain, thunder, and lightning, it is better to stay inside and drink hot tea.',
    },
  ],

  'rooms-furniture-beginner': [
    {
      q: 'Khi bước qua cửa vào nhà, bạn đang ở đâu?',
      options: [
        'Ở sảnh vào nhà, trước khi đi tiếp vào các phòng khác',
        'Ở phòng khách, nơi có ghế sofa và ghế bành để ngồi',
        'Ở nhà bếp, nơi có bếp nấu, lò nướng và chiếc tủ lạnh',
        'Ở phòng ngủ, nơi có giường với gối và chăn sạch sẽ',
      ],
      answer: 0,
      dan: 'When you walk through the door, you are in the hall.',
    },
    {
      q: 'Theo bài, trong phòng ngủ có những gì?',
      options: [
        'Một chiếc giường với gối, chăn và ga trải giường sạch',
        'Một ghế sofa và ghế bành, kèm tranh treo trên tường',
        'Bồn tắm, xà phòng và dầu gội, cùng một chiếc khăn khô',
        'Một cái bếp, lò nướng và tủ lạnh để giữ thức ăn được lạnh',
      ],
      answer: 0,
      dan: 'In the bedroom, there is a bed with a pillow, a blanket, and clean sheets.',
    },
    {
      q: 'Bát đĩa bẩn được rửa ở đâu?',
      options: [
        'Ở bồn rửa trong nhà bếp, nơi cũng có bếp và lò nướng',
        'Ở bồn tắm trong nhà tắm, cùng chỗ dùng xà phòng và khăn',
        'Ở bàn ăn trong phòng ăn, nơi cả nhà ngồi ăn với nhau',
        'Ở sảnh vào nhà, ngay chỗ bước qua cửa để vào bên trong',
      ],
      answer: 0,
      dan: 'We wash the dirty plates and bowls in the sink.',
    },
    {
      q: 'Theo bài, để giữ nhà sạch và gọn thì mỗi ngày ta làm gì?',
      options: [
        'Quét sàn nhà và rửa bát đĩa mỗi ngày một lần',
        'Treo tranh lên tường và trải thảm xuống sàn nhà',
        'Cất quần áo vào tủ và trải lại ga giường cho phẳng',
        'Mang thức ăn từ bếp ra bàn ăn ở phòng ăn để dùng',
      ],
      answer: 0,
      dan: 'Keeping the house clean and tidy is important, so we sweep the floor and wash the dishes every day.',
    },
  ],

  'days-months-beginner': [
    {
      q: 'Theo bài, mùa xuân gồm những tháng nào?',
      options: [
        'Tháng Ba, tháng Tư và tháng Năm, khi trời ấm dần lên',
        'Tháng Sáu, tháng Bảy và tháng Tám, khi trời rất nóng',
        'Tháng Chín, tháng Mười và tháng Mười một, khi trời mát',
        'Tháng Một và tháng Hai, khi trời còn lạnh và có tuyết',
      ],
      answer: 0,
      dan: 'Then comes the spring, in March, April, and May.',
    },
    {
      q: 'Ba tháng của mùa hè được bài mô tả thế nào?',
      options: [
        'Ngày thì nóng, trời thì trong, rất thích để đi nghỉ hay ra biển',
        'Trời mát và có lúc nhiều gió hoặc sương mù, lá bắt đầu rụng',
        'Trời lạnh, đóng băng và có tuyết ở nhiều nước trên thế giới',
        'Trời ấm dần, nắng lên và hoa bắt đầu nở dù vẫn còn mưa',
      ],
      answer: 0,
      dan: "The days are hot, and the sky is clear, so it's a great time for a holiday or a trip to the beach.",
    },
    {
      q: 'Theo bài, tháng Mười hai mang tới những gì?',
      options: [
        'Mang tới mùa đông và lễ Giáng sinh cho mọi người',
        'Mang tới mùa thu, gió lạnh và những chiếc lá vàng rụng',
        'Mang tới kỳ nghỉ dài và những chuyến đi biển của cả nhà',
        'Mang tới mùa xuân, nắng ấm và những bông hoa mới nở',
      ],
      answer: 0,
      dan: 'Finally, December brings the winter and Christmas!',
    },
    {
      q: 'Cuối tuần, theo bài, người ta thường làm gì?',
      options: [
        'Nghỉ ngơi, đi dự tiệc hoặc tổ chức mừng một ngày sinh nhật',
        'Đi làm hoặc đi học, giống như từ thứ Hai tới thứ Sáu',
        'Xem lịch và bảng thời gian để biết hôm đó là ngày nào',
        'Ra biển hoặc đi nghỉ, vì đó là lúc trời nóng nhất trong năm',
      ],
      answer: 0,
      dan: 'But on the weekend, Saturday and Sunday, we relax, go to a party, or celebrate a birthday.',
    },
  ],

  'jobs-occupations-beginner': [
    {
      q: 'Theo bài, ai xây nhà và ai sửa xe?',
      options: [
        'Thợ xây và thợ mộc xây nhà, còn thợ máy thì sửa xe',
        'Thợ máy xây nhà, còn thợ xây và thợ mộc thì sửa xe',
        'Đầu bếp xây nhà, còn người phục vụ thì lo việc sửa xe',
        'Cảnh sát xây nhà, còn lính cứu hoả thì sửa xe cho dân',
      ],
      answer: 0,
      dan: 'A mechanic works hard to fix cars, while a builder and a carpenter build houses.',
    },
    {
      q: 'Bài lấy hai nghề nào làm ví dụ cho công việc cần mặc đồng phục?',
      options: [
        'Cảnh sát và lính cứu hoả là hai nghề cần mặc đồng phục',
        'Đầu bếp và người phục vụ ở nhà hàng cần mặc đồng phục',
        'Doanh nhân nam và doanh nhân nữ làm ở văn phòng lớn',
        'Bác sĩ và y tá làm ở bệnh viện để giúp người bị bệnh',
      ],
      answer: 0,
      dan: 'Some jobs require a uniform, like a police officer or a firefighter.',
    },
    {
      q: 'Theo bài, muốn tìm việc thì phải làm gì trước?',
      options: [
        'Viết một bản lý lịch tốt rồi nộp đơn ứng tuyển vào chỗ đó',
        'Đi họp với ông chủ hoặc với đồng nghiệp ở văn phòng lớn',
        'Học một nghề cần đồng phục như cảnh sát hay lính cứu hoả',
        'Xin làm bán thời gian trước, giống như các bạn sinh viên',
      ],
      answer: 0,
      dan: 'If you want to find work, you must write a good resume and apply for a job.',
    },
    {
      q: 'Bài nói vì sao việc nghỉ ngơi là quan trọng?',
      options: [
        'Vì công việc có thể làm bạn mệt và bận rộn',
        'Vì làm việc chăm chỉ sẽ mang lại rất nhiều thành công',
        'Vì sinh viên chỉ được làm bán thời gian, không làm cả ngày',
        'Vì cần thời gian để viết lý lịch và nộp đơn ứng tuyển',
      ],
      answer: 0,
      dan: 'Work can make you tired and busy, so it is important to take a break.',
    },
  ],

  'colors-shapes-beginner-p2': [
    {
      q: 'Theo bài, trong vườn có những màu hoa nào?',
      options: [
        'Hoa màu đỏ, hồng và tím rất đẹp ở trong vườn',
        'Hoa màu vàng và xanh, cùng màu với nắng và cỏ',
        'Hoa màu cam và bạc, giống áo phông và chiếc nhẫn',
        'Hoa màu nâu và đen, giống bộ lông của con chó',
      ],
      answer: 0,
      dan: 'In the garden, there are pretty red, pink, and purple flowers.',
    },
    {
      q: 'Theo bài, cái cửa, cửa sổ và miếng pizza có hình gì?',
      options: [
        'Cửa là hình chữ nhật, cửa sổ thường hình vuông, pizza hình tam giác',
        'Cửa là hình vuông, cửa sổ hình tam giác, pizza thì hình chữ nhật',
        'Cửa là hình tam giác, cửa sổ hình chữ nhật, pizza thì hình vuông',
        'Cả ba đều là hình chữ nhật, chỉ khác nhau ở kích thước lớn nhỏ',
      ],
      answer: 0,
      dan: 'A door is a rectangle, a window is often a square, and a pizza slice is a triangle.',
    },
    {
      q: 'Bài so sánh con dao với cái thìa như thế nào?',
      options: [
        'Dao có cạnh thẳng và rất sắc, còn thìa thì cong và cùn',
        'Dao thì cong và cùn, còn thìa có cạnh thẳng và rất sắc',
        'Dao thì phẳng và nhẵn như gương, còn thìa thì cứng và thô',
        'Cả hai đều có cạnh thẳng, chỉ khác nhau ở độ sắc của lưỡi',
      ],
      answer: 0,
      dan: 'A knife has a straight edge and is very sharp, but a spoon is curved and blunt.',
    },
    {
      q: 'Bài đặt những câu hỏi so sánh nào để mời người đọc quan sát?',
      options: [
        'Dòng sông rộng hay hẹp, và nước ở đó sâu hay cạn',
        'Con chuột nhẹ hay nặng, và con voi to hay nhỏ',
        'Cái gương phẳng hay nhẵn, và hòn đá cứng hay thô',
        'Quần áo bẩn hay sạch, và chúng đã khô hay còn ướt',
      ],
      answer: 0,
      dan: 'Is the river wide or narrow? Is the water deep or shallow?',
    },
  ],

  'clothes-accessories-beginner': [
    {
      q: 'Nếu ra biển, theo bài bạn cần mặc gì?',
      options: [
        'Một bộ đồ tắm và một cặp kính râm',
        'Áo len ấm, quần dài và một đôi bốt',
        'Một bộ đồ trang trọng, sơ mi và cà vạt',
        'Mũ, khăn quàng cổ và găng tay giữ ấm tay',
      ],
      answer: 0,
      dan: 'If you go to the beach, you need to wear a swimsuit and sunglasses.',
    },
    {
      q: 'Theo bài, đàn ông đi làm thường mặc gì?',
      options: [
        'Bộ đồ lịch sự với sơ mi, cà vạt và một chiếc thắt lưng da',
        'Áo phông cotton, quần đùi rộng và một đôi xăng đan',
        'Áo len ấm hoặc áo khoác dày, quần dài và một đôi bốt',
        'Một chiếc váy đẹp hoặc chân váy, kèm túi để đựng đồ',
      ],
      answer: 0,
      dan: 'When a man goes to work, he often wears a smart suit with a shirt, a tie, and a leather belt.',
    },
    {
      q: 'Khi thử áo khoác ở cửa hàng, theo bài bạn cần kiểm những gì?',
      options: [
        'Kiểm cỡ nhỏ, vừa hay lớn, và xem nó quá chật hay quá rộng',
        'Kiểm màu áo, xem nó có ăn với đôi bốt và chiếc mũ không',
        'Kiểm chất liệu, xem áo bằng cotton hay bằng len giữ ấm',
        'Kiểm xem áo đã sạch chưa, có cần giặt và là lại không',
      ],
      answer: 0,
      dan: 'Check the size: is it small, medium, or large? Is it too tight or loose?',
    },
    {
      q: 'Sau khi mặc quần áo một thời gian, theo bài phải làm gì?',
      options: [
        'Giặt, phơi khô và là chúng để giữ sạch sẽ và tươm tất',
        'Cất chúng vào tủ và chọn bộ khác cho ngày hôm sau',
        'Mang ra cửa hàng đổi cỡ khác nếu thấy quá chật hay rộng',
        'Cất kèm hoá đơn, ví và túi tiền vào cùng một chỗ',
      ],
      answer: 0,
      dan: 'You must wash them, dry them, and iron them to keep them clean and nice.',
    },
  ],

  'animals-pets-beginner-p2': [
    {
      q: 'Theo bài, con mèo con nhỏ có đặc điểm gì?',
      options: [
        'Có bộ lông mềm và hay kêu meo meo khi thấy đói',
        'Có cái đuôi lúc nào cũng ve vẩy và rất thích kêu to',
        'Có bộ lông mềm và thích nhảy, đu quanh các cành cây',
        'Có đôi tai to và một cái mũi dài để hút nước lên',
      ],
      answer: 0,
      dan: 'A little kitten has soft fur and likes to meow when it is hungry.',
    },
    {
      q: 'Ở nông trại, theo bài có thể thấy những con gì?',
      options: [
        'Một con bò lớn, một con lợn hồng, một con ngựa và nhiều con cừu',
        'Một con hổ có vằn đẹp, một con voi và một con khỉ hay đu cành',
        'Một con cá heo thông minh, một con cá voi lớn và một con cá mập',
        'Một con hươu cao cổ, một con lợn hồng và một con rắn nằm trong cỏ',
      ],
      answer: 0,
      dan: 'On a farm, you can see a big cow, a pink pig, a horse, and many sheep.',
    },
    {
      q: 'Theo bài, con hươu cao cổ dùng cái cổ dài để làm gì?',
      options: [
        'Để ăn lá từ những cái cây rất cao',
        'Để nhảy và đu từ cành này sang cành khác',
        'Để nấp trong cỏ giống như con rắn vẫn làm',
        'Để hút nước lên rồi vẩy ra như con voi',
      ],
      answer: 0,
      dan: 'A giraffe has a long neck to eat leaves from tall trees.',
    },
    {
      q: 'Trong đại dương, theo bài có những con gì?',
      options: [
        'Một con cá heo thông minh, một con cá voi lớn và cá mập răng sắc',
        'Một con bò, một con lợn hồng và rất nhiều con cừu trên đồng',
        'Một con hổ có vằn, một con voi tai to và một con khỉ hay đu',
        'Một con rùa, một con cá trong bát và một con chim nhỏ trong nhà',
      ],
      answer: 0,
      dan: 'In the ocean, you can find a smart dolphin, a huge whale, and a dangerous shark with sharp teeth.',
    },
  ],

  'days-months-beginner-p2': [
    {
      q: 'Theo bài, một ngày có bao nhiêu giờ và một phút có bao nhiêu giây?',
      options: [
        'Một ngày có 24 giờ, và một phút có 60 giây',
        'Một ngày có 12 giờ, và một phút có 24 giây',
        'Một ngày có 60 giờ, và một phút có 24 giây',
        'Một ngày có 24 giờ, và một phút có 12 giây',
      ],
      answer: 0,
      dan: 'There are 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day.',
    },
    {
      q: 'Theo bài, trẻ em có kỳ nghỉ học dài vào những tháng nào?',
      options: [
        'Tháng Sáu, tháng Bảy và tháng Tám, đúng mùa hè nóng',
        'Tháng Ba, tháng Tư và tháng Năm, đúng mùa xuân hoa nở',
        'Tháng Chín, tháng Mười và tháng Mười một, đúng mùa thu',
        'Tháng Một và tháng Hai, đúng lúc mùa đông đang lạnh',
      ],
      answer: 0,
      dan: 'Then comes the hot summer in June, July, and August, when children have a long school holiday.',
    },
    {
      q: 'Để biết ngày hay một dịp đặc biệt như sinh nhật, theo bài ta dùng gì?',
      options: [
        'Dùng một quyển lịch để tra ngày tháng',
        'Dùng chiếc đồng hồ treo trên tường trong nhà',
        'Dùng chiếc đồng hồ đeo trên tay của mình',
        'Dùng bảng thời gian đã lên kế hoạch cẩn thận',
      ],
      answer: 0,
      dan: 'To know the date or a special anniversary like a birthday, we use a calendar.',
    },
    {
      q: 'Bài kết lại bằng lời khuyên nào?',
      options: [
        'Lên kế hoạch cẩn thận, nhớ quá khứ, sống hiện tại và mong tương lai',
        'Luôn thức tới nửa đêm để làm cho hết những việc còn lại trong ngày',
        'Chỉ nhìn vào lịch và đồng hồ để không bao giờ tới muộn',
        'Chia ngày thành sáng, chiều, tối và đêm rồi nghỉ đúng giờ',
      ],
      answer: 0,
      dan: 'We should always plan our schedule carefully, remember the past, live in the present, and hope for a good future!',
    },
  ],

  'city-transport-beginner': [
    {
      q: 'Theo bài, muốn đi tàu hoặc tàu điện ngầm thì phải làm gì?',
      options: [
        'Ra nhà ga để mua một chiếc vé cho chuyến đi',
        'Chờ ở điểm dừng xe buýt cho tới khi xe tới',
        'Gọi một chiếc taxi nếu như đang bị gấp giờ',
        'Đi trên vỉa hè rồi chờ đèn giao thông chuyển xanh',
      ],
      answer: 0,
      dan: 'They wait at the bus stop for a bus or go to the station to buy a ticket for the train or the subway.',
    },
    {
      q: 'Khi nào thì được băng qua đường, theo bài?',
      options: [
        'Chỉ khi đèn giao thông đang là màu xanh',
        'Khi đang đi trên vỉa hè và thấy đường vắng xe',
        'Khi xe tải hoặc xe van đã chở hàng đi hết',
        'Khi đã gọi được taxi và xe đang chờ bên kia',
      ],
      answer: 0,
      dan: 'Always look at the traffic light and cross the street only when it is green.',
    },
    {
      q: 'Theo bài, ta lấy tiền ở đâu và gửi thư ở đâu?',
      options: [
        'Lấy tiền ở ngân hàng, còn gửi thư ở bưu điện',
        'Lấy tiền ở bưu điện, còn gửi thư ở ngân hàng',
        'Lấy tiền ở siêu thị, còn gửi thư ở ngoài chợ',
        'Lấy tiền ở nhà ga, còn gửi thư ở quán cà phê',
      ],
      answer: 0,
      dan: 'You can buy food at the supermarket or the market, get money from the bank, or send a letter at the post office.',
    },
    {
      q: 'Cuối tuần, theo bài các gia đình thích đi đâu?',
      options: [
        'Ra công viên, thăm sở thú hoặc xem đồ cổ trong viện bảo tàng',
        'Ra nhà ga mua vé rồi đi tàu điện ngầm vòng quanh thành phố',
        'Tới siêu thị và chợ để mua thức ăn cho cả tuần sau',
        'Ra ngân hàng lấy tiền rồi ghé bưu điện để gửi thư đi',
      ],
      answer: 0,
      dan: 'On the weekend, families like to go to the park, visit the zoo, or look at old things in a museum.',
    },
  ],

  'family-people-beginner-p2': [
    {
      q: 'Theo bài, ai là anh chị em ruột trong gia đình được kể?',
      options: [
        'Người con trai là anh, người con gái là em — họ là ruột thịt',
        'Người con trai và các em họ, con của người chú và người cô ruột',
        'Ông và bà, những người rất yêu các cháu trai cháu gái',
        'Người chồng và người vợ, sau khi họ tổ chức lễ cưới',
      ],
      answer: 0,
      dan: 'The son is the brother, and the daughter is the sister.',
    },
    {
      q: 'Theo bài, sau khi kết hôn thì hai người trở thành gì?',
      options: [
        'Người đàn ông thành người chồng, người phụ nữ thành người vợ',
        'Cả hai thành ông bà, những người rất yêu các cháu của mình',
        'Cả hai thành các em họ trong cùng một đại gia đình lớn',
        'Người đàn ông thành người chú, người phụ nữ thành người cô',
      ],
      answer: 0,
      dan: 'Then, the man becomes a husband and the woman becomes a wife.',
    },
    {
      q: 'Theo bài, họ mời những ai tới dự đám cưới?',
      options: [
        'Rất nhiều khách mời, bạn bè và những người láng giềng',
        'Chỉ ông bà, cha mẹ và các anh chị em ruột trong nhà',
        'Các chú, các cô và toàn bộ những người em họ của mình',
        'Bạn bè cùng lớp và những người đồng nghiệp ở nơi làm',
      ],
      answer: 0,
      dan: 'They might have a beautiful wedding and invite many guests, friends, and neighbors.',
    },
    {
      q: 'Bài kết lại bằng ý nào?',
      options: [
        'Một gia đình tử tế sẽ luôn yêu và giúp nhau trong cuộc sống',
        'Mọi người đều có tên riêng, tên gọi và họ khác nhau',
        'Có người cao và gầy, có người thấp hoặc mập hơn',
        'Chúng ta có lúc vui và thân thiện, có lúc buồn hoặc mệt',
      ],
      answer: 0,
      dan: 'But no matter what, a kind family will always love and help each other in life.',
    },
  ],

  'feelings-senses-beginner': [
    {
      q: 'Theo bài, con người có bao nhiêu giác quan?',
      options: [
        'Có năm giác quan',
        'Có bốn giác quan',
        'Có sáu giác quan',
        'Có ba giác quan',
      ],
      answer: 0,
      dan: 'Humans have five senses.',
    },
    {
      q: 'Theo bài, ta dùng miệng để nếm những vị gì?',
      options: [
        'Vị ngọt của bánh và vị chua của quả chanh',
        'Mùi thơm của một bông hoa màu đỏ trong vườn',
        'Âm thanh to hoặc tiếng nhạc êm dịu, nhẹ nhàng',
        'Cảm giác mềm của con mèo hoặc cứng của hòn đá',
      ],
      answer: 0,
      dan: 'We use our mouth to taste sweet cake or sour lemon.',
    },
    {
      q: 'Theo bài, ta dùng tay để chạm vào những gì?',
      options: [
        'Chạm một con mèo mềm hoặc một hòn đá cứng',
        'Chạm vào bông hoa đỏ để ngửi mùi hương của nó',
        'Chạm vào quả táo khi thấy đói và muốn ăn nó',
        'Chạm vào cốc nước khi thấy khát và cần uống',
      ],
      answer: 0,
      dan: 'We use our hands to touch a soft cat or a hard rock.',
    },
    {
      q: 'Bài kết lại bằng cảm giác nào về gia đình?',
      options: [
        'Gia đình làm người kể thấy an toàn và hạnh phúc',
        'Gia đình làm người kể thấy buồn ngủ và mệt mỏi',
        'Gia đình làm người kể thấy đói và muốn ăn một quả táo',
        'Gia đình làm người kể thấy đau khi bị đứt tay',
      ],
      answer: 0,
      dan: 'They make me feel safe and happy.',
    },
  ],

  'clothes-beginner': [
    {
      q: 'Mùa hè trời nóng, người kể mặc áo phông màu gì?',
      options: [
        'Một chiếc áo phông ngắn màu xanh dương và quần đùi rộng',
        'Một chiếc áo len dày màu đỏ và quần dài màu xám đậm',
        'Một chiếc áo sơ mi trắng và chân váy hoặc quần đen',
        'Một chiếc váy hồng đẹp với dây chuyền vàng và bông tai bạc',
      ],
      answer: 0,
      dan: 'If it is summer and the weather is hot, I put on a short blue t-shirt and loose shorts.',
    },
    {
      q: 'Đồng phục đi học của người kể gồm những gì?',
      options: [
        'Một áo sơ mi trắng và chân váy hoặc quần màu đen',
        'Một áo phông xanh ngắn tay và quần đùi rộng mát mẻ',
        'Một áo len đỏ dày, quần xám đậm và áo khoác mùa đông',
        'Một chiếc váy hồng cùng dây chuyền vàng và bông tai bạc',
      ],
      answer: 0,
      dan: 'It is a white shirt and a black skirt or pants.',
    },
    {
      q: 'Cha của người kể mặc gì để đi làm?',
      options: [
        'Một bộ đồ và một chiếc cà vạt',
        'Một chiếc áo len dày cùng khăn quàng cổ',
        'Một chiếc áo phông ngắn và quần đùi rộng',
        'Đồng phục gồm áo sơ mi trắng và quần đen',
      ],
      answer: 0,
      dan: 'My father wears a suit and a tie to work.',
    },
    {
      q: 'Theo bài, nếu áo vừa người và giá rẻ thì người kể trả tiền bằng gì?',
      options: [
        'Trả bằng tiền mặt lấy ra từ trong ví của mình',
        'Trả bằng thẻ ngân hàng rồi giữ lại hoá đơn',
        'Nhờ cha trả giúp vì ông cũng đang đi cùng',
        'Chờ đợt giảm giá rồi mới quay lại mua nó',
      ],
      answer: 0,
      dan: 'If it fits and the price is cheap, I pay with cash from my wallet.',
    },
  ],

  'family-people-beginner-p3': [
    {
      q: 'Gia đình người kể có mấy người, và gồm những ai?',
      options: [
        'Năm người: cha, mẹ, anh trai, em gái nhỏ và người kể',
        'Bốn người: cha, mẹ, anh trai và người kể trong nhà',
        'Sáu người: cha, mẹ, anh trai, em gái, ông và bà',
        'Năm người: cha, mẹ, chú, cô và người em họ của mình',
      ],
      answer: 0,
      dan: 'They are my father, my mother, my older brother, my baby sister, and me.',
    },
    {
      q: 'Theo bài, mẹ của người kể làm những việc gì?',
      options: [
        'Giúp người kể học bài và nấu những món ăn ngon',
        'Đi làm rất chăm chỉ mỗi ngày ở bên ngoài nhà',
        'Chơi cùng người kể, cùng chạy, nhảy và cười vui',
        'Đưa cả nhà về thăm ông bà vào mỗi dịp cuối tuần',
      ],
      answer: 0,
      dan: 'She helps me study and cooks good food.',
    },
    {
      q: 'Khi em gái nhỏ khóc, cả nhà làm gì?',
      options: [
        'Cho em một cái ôm và một cái thơm, rồi em cười trở lại',
        'Cùng em chạy, nhảy và cười cho em quên đi cơn khóc',
        'Đưa em về thăm ông bà để em được chơi với các cháu khác',
        'Cho em ăn cơm tối cùng cả nhà như mọi buổi tối khác',
      ],
      answer: 0,
      dan: 'Sometimes she cries, but we give her a hug and a kiss, and then she smiles.',
    },
    {
      q: 'Cuối tuần, gia đình người kể đi đâu và gặp những ai?',
      options: [
        'Về thăm ông bà, và gặp cả chú, cô cùng người em họ',
        'Tới trường để người kể gặp và nói chuyện với bạn bè',
        'Ở nhà ăn cơm tối cùng nhau như mọi buổi tối khác',
        'Đi chơi cùng bạn bè, chia đồ chơi và giúp đỡ nhau',
      ],
      answer: 0,
      dan: 'On the weekend, we visit my grandparents.',
    },
  ],

  'jobs-work-beginner': [
    {
      q: 'Theo bài, người nông dân làm gì trên nông trại?',
      options: [
        'Trồng ra thức ăn cho mọi người',
        'Bảo vệ cả thành phố khỏi những điều xấu',
        'Nấu ra những món ăn thật ngon cho khách',
        'Lái một chiếc taxi hoặc một chiếc xe buýt',
      ],
      answer: 0,
      dan: 'A farmer works on a farm and grows food.',
    },
    {
      q: 'Theo bài, người làm ở văn phòng làm những việc gì?',
      options: [
        'Dùng máy tính đặt trên bàn và trả lời điện thoại',
        'Dạy cho học sinh cách đọc và cách viết cho đúng',
        'Giúp những người bị bệnh ở trong bệnh viện',
        'Nấu món ăn ngon rồi mang ra bàn cho khách',
      ],
      answer: 0,
      dan: 'They use a computer on a desk and answer the phone.',
    },
    {
      q: 'Theo bài, buổi trưa người ta làm gì?',
      options: [
        'Nghỉ một lát để ăn bữa trưa',
        'Bắt đầu ngày làm việc từ rất sớm',
        'Về nhà nghỉ sau một ngày dài',
        'Họp với ông chủ và người quản lý',
      ],
      answer: 0,
      dan: 'At noon, they take a break to eat lunch.',
    },
    {
      q: 'Bài kết lại bằng ý nào về công việc?',
      options: [
        'Điều quan trọng là làm việc chăm chỉ và giúp đỡ người khác',
        'Điều quan trọng là kiếm được nhiều tiền để mua nhà',
        'Điều quan trọng là chọn nghề dễ, tránh những việc khó',
        'Điều quan trọng là nghỉ trưa đủ để chiều còn làm tiếp',
      ],
      answer: 0,
      dan: 'It is important to work hard and help other people.',
    },
  ],

  'transportation-beginner': [
    {
      q: 'Theo bài, khi đèn giao thông màu đỏ thì phải làm gì?',
      options: [
        'Phải dừng lại và chờ',
        'Được phép đi tiếp bình thường',
        'Phải nhìn sang trái rồi sang phải',
        'Phải ra nhà ga để mua một chiếc vé',
      ],
      answer: 0,
      dan: 'When it is red, you must stop.',
    },
    {
      q: 'Muốn đi xe buýt hoặc tàu điện ngầm, theo bài phải làm những gì?',
      options: [
        'Ra nhà ga mua vé, chờ xe, lên xe rồi tìm một chỗ ngồi',
        'Ra sân bay để bắt một chuyến máy bay rồi bay lên thật cao',
        'Lái một chiếc xe hơi hay xe máy trên đường phố',
        'Đạp xe từ từ cho vui, hoặc chỉ đi bộ cho gần',
      ],
      answer: 0,
      dan: 'You must go to the station and buy a ticket.',
    },
    {
      q: 'Người kể nói gì về việc đạp xe của mình?',
      options: [
        'Chậm nhưng mà vui',
        'Nhanh nhưng hay tắc đường',
        'Nhanh và bay rất cao trên trời',
        'Chậm và chở được đồ rất nặng',
      ],
      answer: 0,
      dan: 'It is slow but fun.',
    },
    {
      q: 'Theo bài, lái xe quá nhanh dẫn tới điều gì?',
      options: [
        'Rất nguy hiểm và có thể gây ra tai nạn',
        'Rất nhanh nên sẽ tới nơi sớm hơn nhiều',
        'Sẽ bị mất vé và phải ra nhà ga mua lại',
        'Sẽ phải nhìn sang trái rồi sang phải trước',
      ],
      answer: 0,
      dan: 'Driving too fast is dangerous and can cause an accident.',
    },
  ],

  'action-verbs-beginner': [
    {
      q: 'Sau khi thức dậy và đi tới cửa sổ, người kể thấy và nghe gì?',
      options: [
        'Thấy đàn chim bay trên trời và nghe chúng hát một bài vui',
        'Thấy mẹ đang nấu bữa sáng và nghe tiếng bát đĩa trong bếp',
        'Thấy bạn bè đang chờ ở trường và nghe tiếng cô giáo gọi',
        'Thấy trời đã sáng nên nghe tiếng mình chạy vội ra ngoài',
      ],
      answer: 0,
      dan: 'I see the birds fly in the sky and I hear them sing a happy song.',
    },
    {
      q: 'Theo bài, khi nào người kể chạy thay vì đi bộ tới trường?',
      options: [
        'Khi hôm đó mình bị muộn giờ',
        'Khi giờ ra chơi bắt đầu ở sân trường',
        'Khi cô giáo hỏi bài và mình phải trả lời',
        'Khi trời đẹp và đàn chim đang hát trên trời',
      ],
      answer: 0,
      dan: 'Sometimes, I run if I am late.',
    },
    {
      q: 'Người kể giúp mẹ dọn phòng bằng những việc gì?',
      options: [
        'Quét sàn nhà và rửa bát đĩa',
        'Nấu bữa sáng và rót nước uống',
        'Vẽ một bức tranh rồi tô màu cho nó',
        'Làm bài tập rồi cố hiểu các bài học',
      ],
      answer: 0,
      dan: 'I sweep the floor and I wash the plates.',
    },
    {
      q: 'Ban đêm, trước khi đi ngủ người kể làm những gì?',
      options: [
        'Đánh răng lại, đổi quần áo và mặc bộ pyjama vào',
        'Vẽ một bức tranh, tô màu rồi xem tivi một lúc ngắn',
        'Ăn bữa tối cùng gia đình và cùng nhau kể chuyện',
        'Quét sàn nhà, rửa bát rồi làm nốt bài tập về nhà',
      ],
      answer: 0,
      dan: 'I change my clothes and put on my pajamas.',
    },
  ],

  'feelings-emotions-beginner': [
    {
      q: 'Theo bài, nếu người kể trượt một bài kiểm tra dễ thì cảm thấy thế nào?',
      options: [
        'Cảm thấy buồn, và một giọt nước mắt có thể rơi khỏi mắt',
        'Cảm thấy tức và giận, và muốn hét lên cho thật to',
        'Cảm thấy sợ, giống như khi xem một phim kinh dị trong tối',
        'Cảm thấy buồn tẻ, vì lúc đó chẳng có việc gì để mà làm',
      ],
      answer: 0,
      dan: 'If I fail an easy test, I might feel sad, and a tear might fall from my eye.',
    },
    {
      q: 'Theo bài, khi nào người kể cảm thấy tức giận và muốn hét lên?',
      options: [
        'Khi có ai làm hỏng món đồ chơi của mình',
        'Khi trượt một bài kiểm tra rất dễ ở trên lớp',
        'Khi phải xem một bộ phim kinh dị ở trong tối',
        'Khi có một tiếng động to bất ngờ vang lên gần',
      ],
      answer: 0,
      dan: 'If someone breaks my toy, I might feel angry and mad, and I want to shout.',
    },
    {
      q: 'Một tiếng động to bất ngờ làm người kể cảm thấy thế nào?',
      options: [
        'Cảm thấy ngạc nhiên hoặc bị sốc',
        'Cảm thấy sợ, giống khi ở trong tối',
        'Cảm thấy tức và muốn hét thật to',
        'Cảm thấy buồn tẻ vì không có gì làm',
      ],
      answer: 0,
      dan: 'A sudden loud noise makes me feel surprised or shocked.',
    },
    {
      q: 'Khi người kể bị ốm, gia đình làm gì?',
      options: [
        'Cho một chiếc gối mềm và một cái chăn nhẹ',
        'Cho một chiếc áo khoác ấm để đỡ thấy lạnh',
        'Cho một cốc nước mát để thấy dễ chịu hơn',
        'Cùng cười với nhau cho quên đi cơn đau',
      ],
      answer: 0,
      dan: 'They give me a soft pillow and a light blanket.',
    },
  ],

  'weather-seasons-beginner-p3': [
    {
      q: 'Theo bài, vào mùa hè ban ngày trời thế nào?',
      options: [
        'Rất nóng và nắng, ban ngày không có mây',
        'Mát và có lúc nhiều gió, lá bắt đầu đổi màu',
        'Ấm và dễ chịu, hoa mọc lên từ trong đất',
        'Rất lạnh, ngày ngắn còn đêm thì dài và tối',
      ],
      answer: 0,
      dan: 'During the day, there are no clouds.',
    },
    {
      q: 'Vào ngày mưa của mùa thu, bài khuyên mang gì?',
      options: [
        'Mang theo một chiếc dù để không bị ướt',
        'Mang theo một chiếc áo khoác ấm và một đôi bốt',
        'Mang theo trà nóng để uống khi ngồi bên lửa',
        'Mang theo bộ quần áo nhẹ như khi ra ngoài biển',
      ],
      answer: 0,
      dan: "You need to bring an umbrella so you don't get wet.",
    },
    {
      q: 'Theo bài, ngày có tuyết đẹp nhưng có gì đáng lo?',
      options: [
        'Đường có thể đóng băng và trở nên nguy hiểm',
        'Ngày sẽ ngắn lại còn đêm thì dài và tối hơn',
        'Gió sẽ thổi rất mạnh trong một cơn bão mùa đông',
        'Sương mù buổi sáng sẽ dày lên và khó nhìn đường',
      ],
      answer: 0,
      dan: 'A snowy day is beautiful, but the roads can be icy and dangerous.',
    },
    {
      q: 'Trong một cơn bão mùa đông, bài khuyên nên làm gì?',
      options: [
        'Ở trong nhà, ngồi bên lửa và uống trà nóng',
        'Ra biển chơi trên cát rồi tắm trong nước xanh',
        'Mang theo dù để đi ra ngoài mà không bị ướt',
        'Ra ngắm đêm trời trong với mặt trăng và các ngôi sao',
      ],
      answer: 0,
      dan: 'It is a good time to stay inside your home, sit by the fire, and drink hot tea.',
    },
  ],

  'family-relatives-beginner': [
    {
      q: 'Trong cây gia phả theo bài, ai đứng ở trên cùng?',
      options: [
        'Ông bà, những người lớn tuổi nhất trong gia đình',
        'Cha và mẹ, những người sinh ra các con trong nhà',
        'Các con trai và con gái, tức là những người ruột thịt',
        'Các chú và các cô, anh chị em của cha hoặc mẹ mình',
      ],
      answer: 0,
      dan: 'In a typical family tree, you have your grandparents at the top.',
    },
    {
      q: 'Theo bài, anh em của cha hoặc mẹ bạn gọi là gì?',
      options: [
        'Là chú của bạn, còn chị em của họ là cô của bạn',
        'Là cô của bạn, còn chị em của họ là chú của bạn',
        'Là các em họ của bạn, vì họ cùng một cây gia phả',
        'Là ông bà của bạn, vì họ thuộc thế hệ ở trên cùng',
      ],
      answer: 0,
      dan: "Your father's or mother's brother is your uncle, and their sister is your aunt.",
    },
    {
      q: 'Nếu anh hoặc chị của bạn sinh con, đứa trẻ đó gọi là gì?',
      options: [
        'Là cháu trai nếu là con trai, cháu gái nếu là con gái',
        'Là em họ của bạn, vì cùng nằm trong một cây gia phả',
        'Là anh chị em ruột của bạn, vì cùng chung cha mẹ',
        'Là con riêng, vì bạn có thêm mẹ kế hoặc cha kế',
      ],
      answer: 0,
      dan: 'If your brother or sister has a child, that child is your nephew if it is a boy, and your niece if it is a girl.',
    },
    {
      q: 'Theo bài, khi người ta ly hôn rồi cưới lại thì đứa trẻ có thêm ai?',
      options: [
        'Có thêm một người mẹ kế hoặc một người cha kế',
        'Có thêm một người cô hoặc một người chú trong họ',
        'Có thêm các em họ, tức con của chú và của cô',
        'Có thêm ông bà, những người lớn tuổi nhất trong nhà',
      ],
      answer: 0,
      dan: 'Sometimes people get divorced and live single, or they marry again, giving their child a stepmother or stepfather.',
    },
  ],

  'time-calendar-beginner': [
    {
      q: 'Theo bài, 2:45 được nói thế nào?',
      options: [
        'Là "kém mười lăm phút nữa tới ba giờ"',
        'Là "hai giờ ba mươi phút" của buổi chiều',
        'Là "nửa giờ đã qua kể từ lúc hai giờ"',
        'Là "hai giờ bốn mươi phút" theo cách nói ngắn',
      ],
      answer: 0,
      dan: 'If it is 2:30, we can say it is half past two, and if it is 2:45, it is a quarter to three.',
    },
    {
      q: 'Theo bài, một ngày bắt đầu và kết thúc vào lúc nào?',
      options: [
        'Bắt đầu buổi sáng và kết thúc vào lúc nửa đêm',
        'Bắt đầu lúc trưa và kết thúc khi trời vừa tối',
        'Bắt đầu buổi chiều và kết thúc vào buổi tối muộn',
        'Bắt đầu lúc nửa đêm và kết thúc vào giữa buổi trưa',
      ],
      answer: 0,
      dan: 'The day starts in the morning, followed by noon, then the afternoon, the evening, and finally night, ending at midnight.',
    },
    {
      q: 'Theo bài, cuối tuần khác ngày thường ở chỗ nào?',
      options: [
        'Cuối tuần được ngủ muộn, còn ngày thường phải đi sớm',
        'Cuối tuần dài hơn ngày thường tới hai mươi bốn giờ',
        'Cuối tuần có bảy ngày, còn ngày thường chỉ có năm ngày',
        'Cuối tuần dùng lịch, còn ngày thường thì dùng đồng hồ',
      ],
      answer: 0,
      dan: 'The weekend is Saturday and Sunday, when we can sleep late.',
    },
    {
      q: 'Bài lấy câu nói nào làm ví dụ cho việc dùng từ chỉ thời gian?',
      options: [
        '"Tôi đang bận bây giờ, nhưng tôi sẽ gặp bạn sớm."',
        '"Hôm qua tôi rất bận, còn hôm nay thì tôi rảnh rỗi."',
        '"Ngày mai tôi sẽ đi làm sớm hơn thường lệ một chút."',
        '"Thời gian trôi rất nhanh nên hãy tận hưởng mọi lúc."',
      ],
      answer: 0,
      dan: "You might say 'I am busy now, but I will see you soon.'",
    },
  ],

  'clothes-accessories-beginner-p2': [
    {
      q: 'Mùa hè, người kể mặc gì và đội gì?',
      options: [
        'Áo phông trắng, quần đùi xanh, có lúc thêm mũ lưỡi trai đỏ',
        'Áo len dày, quần jean xanh ấm và một chiếc áo khoác lớn',
        'Đồng phục gồm áo trắng, quần đen và tất trắng cùng giày đen',
        'Một chiếc váy hồng đẹp hoặc chân váy vàng ngắn như em gái',
      ],
      answer: 0,
      dan: 'In the summer, when the sun is yellow and hot, I like to wear a white T-shirt and blue shorts.',
    },
    {
      q: 'Đồng phục đi học của người kể gồm những gì?',
      options: [
        'Áo sơ mi trắng, quần đen, giày đen và tất trắng',
        'Áo phông trắng, quần đùi xanh và mũ lưỡi trai đỏ',
        'Áo len dày, quần jean xanh và áo khoác mùa đông',
        'Váy hồng đẹp, chân váy vàng và một chiếc nhẫn nhỏ',
      ],
      answer: 0,
      dan: 'When I go to school, I must wear my uniform: a white shirt, black pants, and black shoes with white socks.',
    },
    {
      q: 'Chiếc áo khoác màu xanh lá mà người kể thử ở cửa hàng ra sao?',
      options: [
        'Vừa vặn hoàn hảo, nhưng giá thì lại rất đắt',
        'Vừa vặn hoàn hảo và giá rẻ, nên đã mua ngay nó',
        'Quá chật với người kể, nên phải đổi sang cỡ lớn hơn',
        'Không vừa và cũng rất đắt, nên đã bỏ lại ở cửa hàng',
      ],
      answer: 0,
      dan: "It was a perfect fit, but the price was very expensive.",
    },
    {
      q: 'Cuối cùng người kể mua chiếc áo khoác màu gì?',
      options: [
        'Một chiếc áo khoác màu xám đẹp',
        'Một chiếc áo khoác màu xanh lá',
        'Một chiếc áo khoác màu xanh dương',
        'Một chiếc áo khoác màu hồng nhạt',
      ],
      answer: 0,
      dan: 'Finally, I bought a nice gray jacket.',
    },
  ],

  'hobbies-games-beginner': [
    {
      q: 'Theo bài, những người thích nghệ thuật làm gì?',
      options: [
        'Vẽ tranh, tô màu hoặc chụp một bức ảnh đẹp',
        'Đọc một quyển sách hay hoặc viết một câu chuyện',
        'Hát một bài hát hoặc nhảy theo tiếng nhạc',
        'Xem phim trên tivi hoặc nghe nhạc cho thư giãn',
      ],
      answer: 0,
      dan: 'They draw a picture, paint with many colors, or take a beautiful photo.',
    },
    {
      q: 'Theo bài, trẻ em chơi những gì ở bên ngoài?',
      options: [
        'Chạy ngoài trời, thả một con diều hoặc đạp xe trong công viên',
        'Đọc sách hay và viết truyện, những việc rất yên tĩnh',
        'Hát một bài hát, nhảy múa hoặc nghe nhạc trên điện thoại',
        'Xem phim trên tivi, dùng điện thoại và lướt mạng internet',
      ],
      answer: 0,
      dan: 'They run outside, fly a kite, or ride a bike in the park.',
    },
    {
      q: 'Theo bài, khi chơi một trận thì điều gì mới là quan trọng nhất?',
      options: [
        'Tận hưởng chính hoạt động đó',
        'Thắng được trận đấu đang chơi',
        'Chạy nhanh và nhảy cao hơn người khác',
        'Chơi cùng một đội thay vì chơi một mình',
      ],
      answer: 0,
      dan: 'The most important thing is to enjoy the activity.',
    },
    {
      q: 'Bài kết lại bằng ý nào?',
      options: [
        'Ta vui khi làm điều mình yêu cùng với bạn bè của mình',
        'Ta vui khi thắng được trận đấu bóng đá hoặc quần vợt',
        'Ta vui khi có một món đồ chơi mới như búp bê hay bóng',
        'Ta vui khi được nghỉ ngơi, xem phim và nghe nhạc ở nhà',
      ],
      answer: 0,
      dan: 'We are happy when we do things we love together with our friends.',
    },
  ],

  'transport-vehicles-beginner-p2': [
    {
      q: 'Theo bài, muốn đi tàu thì mua vé ở đâu?',
      options: [
        'Mua vé ở nhà ga',
        'Mua vé ở điểm dừng xe buýt',
        'Mua vé ở sân bay trước khi bay',
        'Mua vé ở trên tàu khi đã lên xe',
      ],
      answer: 0,
      dan: 'To take a train, you buy a ticket at the station.',
    },
    {
      q: 'Cho một chuyến đi rất dài, theo bài người ta làm gì?',
      options: [
        'Ra sân bay và bay bằng một chiếc máy bay',
        'Ra nhà ga và mua vé cho một chuyến tàu',
        'Chờ ở điểm dừng để bắt một chuyến xe buýt',
        'Đi bằng một chiếc thuyền nhỏ hoặc tàu lớn',
      ],
      answer: 0,
      dan: 'For a very long journey, people go to the airport and fly in a plane.',
    },
    {
      q: 'Theo bài, dùng bản đồ để làm gì?',
      options: [
        'Để tìm đúng đường mà không bị lạc',
        'Để biết đèn giao thông đang xanh hay đỏ',
        'Để mua vé đúng chuyến ở trong nhà ga',
        'Để biết đường đang đông và chậm hay không',
      ],
      answer: 0,
      dan: 'You can use a map to find the right way so you do not get lost.',
    },
    {
      q: 'Theo bài, khi nào ta tới sớm và có một chuyến đi tốt?',
      options: [
        'Khi đường thông thoáng, không đông và không chậm',
        'Khi đi bằng tàu, vì tàu rất nhanh và an toàn',
        'Khi biết trước đường và không cần dùng bản đồ',
        'Khi đèn giao thông chuyển sang màu xanh sớm',
      ],
      answer: 0,
      dan: 'But if the road is clear, we can arrive early and have a good trip.',
    },
  ],

  'jobs-professions-beginner': [
    {
      q: 'Theo bài, bác sĩ và y tá mặc gì khi làm việc?',
      options: [
        'Mặc một bộ đồng phục màu trắng',
        'Mặc một bộ đồ lịch sự kèm cà vạt',
        'Mặc đồ bảo hộ để dùng dụng cụ xây nhà',
        'Mặc đồ của người phục vụ ở trong nhà hàng',
      ],
      answer: 0,
      dan: 'They wear a white uniform.',
    },
    {
      q: 'Theo bài, ai xây nhà và ai sửa xe được?',
      options: [
        'Thợ xây dùng dụng cụ để xây nhà, còn thợ máy thì sửa xe',
        'Thợ máy dùng dụng cụ để xây nhà, còn thợ xây thì sửa xe',
        'Người nông dân xây nhà, còn người bán hàng thì sửa xe',
        'Người dọn dẹp xây nhà, còn đầu bếp thì lo việc sửa xe',
      ],
      answer: 0,
      dan: 'A builder uses a tool to build a house, and a mechanic can fix a car.',
    },
    {
      q: 'Trong nhà hàng, theo bài ai làm gì?',
      options: [
        'Đầu bếp nấu món ngon, còn người phục vụ mang ra bàn cho bạn',
        'Người phục vụ nấu món ngon, còn đầu bếp mang ra bàn cho bạn',
        'Người bán hàng nấu món ngon, còn người dọn dẹp mang ra bàn',
        'Người nông dân nấu món ngon, còn thợ máy mang ra bàn cho bạn',
      ],
      answer: 0,
      dan: 'In a restaurant, a cook makes delicious food and a waiter brings it to your table.',
    },
    {
      q: 'Theo bài, sau khi làm xong công việc thì điều gì xảy ra?',
      options: [
        'Được trả tiền, rồi rảnh để về nhà nghỉ vì đã mệt',
        'Phải họp với ông chủ về những việc quan trọng nhất',
        'Phải dọn cho cửa hàng thật sạch trước khi ra về',
        'Bắt đầu một ngày mới và trở nên bận rộn trở lại',
      ],
      answer: 0,
      dan: 'When we finish work, we get paid with money.',
    },
  ],

  'numbers-time-beginner-p2': [
    {
      q: 'Theo bài, ngày đầu tiên của tuần học là ngày nào?',
      options: [
        'Thứ Hai',
        'Thứ Ba',
        'Chủ nhật',
        'Thứ Bảy',
      ],
      answer: 0,
      dan: 'The first day of the school week is Monday.',
    },
    {
      q: 'Theo bài, ngày bắt đầu vào lúc nào?',
      options: [
        'Buổi sáng, khi mặt trời mọc lên',
        'Buổi chiều, sau khi đã qua buổi trưa',
        'Buổi tối, khi trời bắt đầu chuyển tối',
        'Ban đêm, khi bầu trời đã tối hẳn',
      ],
      answer: 0,
      dan: 'The day starts in the morning when the sun comes up.',
    },
    {
      q: 'Nếu có hẹn lúc tám giờ, theo bài ta nên làm gì?',
      options: [
        'Không được tới muộn, và tốt hơn là tới sớm',
        'Xem đồng hồ trên tường rồi đi ngay lúc tám giờ',
        'Có thể làm việc đó bây giờ, sau này hoặc ngày mai',
        'Nhớ lại xem hôm qua mình đã làm những việc gì',
      ],
      answer: 0,
      dan: 'If an appointment is at eight o’clock, we must not be late.',
    },
    {
      q: 'Bài lấy những ví dụ nào cho việc đếm?',
      options: [
        'Hai bàn tay, mười ngón tay, hoặc ba mươi học sinh trong lớp',
        'Bảy ngày trong tuần, mười hai tháng trong một năm',
        'Sáu mươi phút trong một giờ và sáu mươi giây trong một phút',
        'Buổi sáng, buổi chiều, buổi tối và ban đêm trong ngày',
      ],
      answer: 0,
      dan: 'By learning numbers from zero to one hundred or even a thousand, we can count anything, like having two hands, ten fingers, or thirty students in a class.',
    },
  ],

  'money-shopping-beginner': [
    {
      q: 'Theo bài, ta có thể trả tiền bằng những cách nào?',
      options: [
        'Bằng tiền mặt như xu và tiền giấy, hoặc bằng thẻ ngân hàng',
        'Chỉ bằng tiền mặt gồm những đồng xu và các tờ tiền giấy',
        'Chỉ bằng thẻ ngân hàng, vì cửa hàng không nhận tiền mặt',
        'Bằng cách để lại hoá đơn rồi trả nốt vào một lần sau',
      ],
      answer: 0,
      dan: 'We can pay with cash, like a coin or paper money, or we can use a bank card.',
    },
    {
      q: 'Nếu một món quá đắt, theo bài ta nên làm gì?',
      options: [
        'Tiết kiệm tiền và chờ tới đợt giảm giá',
        'Cứ mua luôn vì nó là món mình đang thích',
        'Bỏ vào giỏ trước rồi tính lại lúc ra quầy',
        'Nhờ người bán tìm cho một cỡ và màu khác',
      ],
      answer: 0,
      dan: 'If it is too expensive, we might save our money and wait for a sale.',
    },
    {
      q: 'Người bán hàng giúp bạn những việc gì?',
      options: [
        'Giúp tìm đúng cỡ và màu, rồi cho bạn thử xem có vừa không',
        'Giúp bỏ những món bạn cần vào giỏ rồi mang tới quầy tính tiền',
        'Giúp giữ tiền của bạn an toàn cho tới khi bạn ra khỏi cửa hàng',
        'Giúp bạn chờ tới đợt giảm giá bằng cách giữ lại món hàng đó',
      ],
      answer: 0,
      dan: 'They will help you find the right size and color, and you can try it on to see if it fits.',
    },
    {
      q: 'Khi bạn trả tiền xong, người bán đưa lại những gì?',
      options: [
        'Tiền thừa và một tờ hoá đơn, rồi bỏ đồ vào túi cho bạn',
        'Một chiếc giỏ để bạn tự bỏ nốt những món còn lại vào',
        'Một chiếc thẻ ngân hàng để bạn dùng cho lần mua sau',
        'Một lời cảm ơn, rồi đóng cửa hàng khi bạn vừa đi ra',
      ],
      answer: 0,
      dan: 'They will give you your change and a receipt, and put your things in a bag.',
    },
  ],

  'clothes-fashion-beginner-p2': [
    {
      q: 'Buổi sáng, theo bài việc đầu tiên là gì?',
      options: [
        'Thức dậy và cởi bộ pyjama đang mặc trên người',
        'Mặc ngay áo sơ mi sạch hoặc một chiếc áo phông',
        'Mặc tất rồi xỏ vào một đôi giày hoặc đôi bốt',
        'Đội một chiếc mũ và đeo kính râm để che nắng',
      ],
      answer: 0,
      dan: 'In the morning, you wake up and take off your pajamas.',
    },
    {
      q: 'Nếu trời lạnh, theo bài bạn sẽ cần những gì?',
      options: [
        'Quần dài hoặc quần jean, có thể thêm áo len ấm và áo khoác dày',
        'Quần đùi hoặc một chiếc chân váy ngắn cho thoáng mát',
        'Một chiếc mũ lưỡi trai và cặp kính râm để chắn ánh nắng',
        'Một chiếc thắt lưng, dây chuyền đẹp và một chiếc nhẫn bạc',
      ],
      answer: 0,
      dan: 'If it is cold, you will need long pants or jeans, and maybe a warm sweater and a thick coat or jacket.',
    },
    {
      q: 'Theo bài, những phụ kiện nào được kể ra?',
      options: [
        'Thắt lưng quanh bụng, dây chuyền đẹp, nhẫn bạc, đồng hồ vàng',
        'Áo sơ mi sạch, áo phông, quần đùi và một chiếc chân váy ngắn',
        'Tất, giày hoặc bốt, và một bộ pyjama để mặc lúc đi ngủ',
        'Một bộ đồ lịch sự hoặc bộ đồng phục dùng để đi làm',
      ],
      answer: 0,
      dan: 'They might have a belt around their waist, a beautiful necklace, a silver ring, or a gold watch.',
    },
    {
      q: 'Bài kết lại bằng ý nào về mốt và sự thoải mái?',
      options: [
        'Theo mốt thì vui, nhưng thấy thoải mái mới là quan trọng nhất',
        'Theo mốt là quan trọng nhất, vì nó khiến ta trông đẹp hơn',
        'Chọn đúng cỡ nhỏ, vừa hay lớn mới là điều quan trọng nhất',
        'Giặt và phơi khô quần áo mới là việc quan trọng nhất',
      ],
      answer: 0,
      dan: 'Following fashion can be fun, but feeling comfortable is the most important thing.',
    },
  ],

  'weather-seasons-beginner-p4': [
    {
      q: 'Theo bài, mùa hè nóng tới mức nào?',
      options: [
        'Nóng tới mức bạn muốn nhảy vào làn nước mát',
        'Nóng tới mức lá trên cây bị gió thổi rụng hết',
        'Nóng tới mức nhiệt độ bắt đầu tụt xuống nhanh',
        'Nóng tới mức bầu trời trở nên nhiều mây và tối',
      ],
      answer: 0,
      dan: 'Sometimes it is so hot that you want to jump into cool water.',
    },
    {
      q: 'Khi mùa thu tới, theo bài điều gì xảy ra?',
      options: [
        'Nhiệt độ bắt đầu tụt, trời mát và thường có nhiều gió',
        'Trời trong và sáng, thời tiết ấm và rất dễ chịu',
        'Trời rất lạnh, có lúc tối, và mây phủ kín bầu trời',
        'Trời nóng và nắng gần như suốt cả ngày trong tuần',
      ],
      answer: 0,
      dan: 'When autumn or fall arrives, the temperature starts to drop.',
    },
    {
      q: 'Vào một ngày có tuyết, theo bài bạn thấy gì và phải mặc gì?',
      options: [
        'Thấy băng trắng trên mặt đất, và phải mặc áo ấm cùng bốt',
        'Thấy mọi thứ ngoài trời bị ướt, và phải mang theo một cái dù',
        'Thấy gió mạnh thổi lá rụng, và phải mặc một chiếc áo mỏng',
        'Thấy sương mù thật dày, và tốt nhất là nên ở trong nhà',
      ],
      answer: 0,
      dan: 'If it is a snowy day, you will see white ice on the ground, and you must wear a warm coat and a boot to stay dry.',
    },
    {
      q: 'Theo bài, khi nào thì tốt nhất là ở trong nhà?',
      options: [
        'Khi thời tiết xấu hoặc có sương mù dày',
        'Khi trời đang nắng nóng gần như cả ngày',
        'Khi trời mát và có gió mạnh thổi lá rụng',
        'Khi trời trong sáng vào buổi sáng mùa xuân',
      ],
      answer: 0,
      dan: 'If the weather is bad or there is thick fog, it is better to stay inside your house.',
    },
  ],

  'technology-devices-beginner': [
    {
      q: 'Theo bài, khi dùng máy tính thì ta làm những gì?',
      options: [
        'Nhìn màn hình sáng, gõ chữ trên bàn phím và bấm con chuột',
        'Bật tivi lên hoặc mở radio để nghe cho đỡ buồn',
        'Cắm tai nghe vào để nghe nhạc mà không làm ồn người khác',
        'Chụp một bức ảnh bằng máy ảnh trên chiếc điện thoại',
      ],
      answer: 0,
      dan: 'If you use a computer, you look at the bright screen, type letters on the keyboard, and click the mouse.',
    },
    {
      q: 'Theo bài, muốn nghe nhạc mà không làm ồn người khác thì dùng gì?',
      options: [
        'Cắm tai nghe vào để nghe một mình',
        'Bật loa lên cho tất cả mọi người nghe',
        'Mở radio với âm lượng thật nhỏ lại',
        'Bật tivi rồi ngồi thật gần màn hình',
      ],
      answer: 0,
      dan: 'If you want to listen to music without bothering others, you plug in your headphones.',
    },
    {
      q: 'Khi pin gần hết, theo bài ta phải làm gì?',
      options: [
        'Dùng bộ sạc với một dây dài để cắm vào tường',
        'Bấm một cái nút hoặc gạt công tắc để tắt máy đi',
        'Chạm vào màn hình để tạm dừng đoạn phim đang xem',
        'Mang máy đi sửa hoặc mua một chiếc mới thật nhanh',
      ],
      answer: 0,
      dan: 'When the battery is low, you must use a charger with a long cable to plug it into the wall.',
    },
    {
      q: 'Theo bài, ta chạm vào màn hình để làm những việc gì?',
      options: [
        'Mở ứng dụng, bật phim, tạm dừng, lưu hoặc xoá một bức ảnh',
        'Gõ chữ trên bàn phím rồi bấm con chuột cho chính xác',
        'In bài làm của mình ra bằng một chiếc máy in ở gần đó',
        'Cắm tai nghe hoặc bật loa để mọi người cùng nghe được',
      ],
      answer: 0,
      dan: 'We touch our screens to open apps, start a video, pause it, save a picture, or delete it.',
    },
  ],

  'communication-internet-beginner': [
    {
      q: 'Theo bài, trước đây muốn liên lạc thì phải làm gì?',
      options: [
        'Viết thư trên giấy rồi chờ nhiều ngày để gửi đi',
        'Gọi điện thoại rồi chờ máy reo để nghe giọng nói',
        'Mở một ứng dụng hoặc một trang web trên thiết bị',
        'Gửi một tin nhắn nhanh hoặc viết một lá thư điện tử',
      ],
      answer: 0,
      dan: 'We do not have to write a letter on paper and wait days to send it.',
    },
    {
      q: 'Theo bài, muốn đăng nhập thì cần những gì?',
      options: [
        'Cần một tài khoản và một mật khẩu bí mật',
        'Cần một thiết bị nối được vào mạng wifi',
        'Cần mở một ứng dụng hoặc một trang web',
        'Cần một lá thư điện tử và một nhóm để trò chuyện',
      ],
      answer: 0,
      dan: 'You need an account and a secret password to log in.',
    },
    {
      q: 'Theo bài, sau khi đăng nhập thì ta làm được những gì?',
      options: [
        'Tải một trò chơi vui về, nghe nhạc hoặc xem một đoạn phim',
        'Viết thư trên giấy rồi chờ vài ngày nữa mới gửi được đi',
        'Nghe giọng nói của bạn mình ngay khi máy vừa reo lên',
        'Nối thiết bị của mình vào mạng wifi ở gần chỗ đang ngồi',
      ],
      answer: 0,
      dan: 'Once you are inside, you can download a fun game, listen to music, or watch a video.',
    },
    {
      q: 'Theo bài, khi dùng xong thì phải nhớ điều gì?',
      options: [
        'Nhớ đăng xuất ra khỏi tài khoản của mình',
        'Nhớ đổi lại mật khẩu bí mật cho an toàn',
        'Nhớ tải về trò chơi mà mình vẫn đang thích',
        'Nhớ đăng một bức ảnh lên trang của mình',
      ],
      answer: 0,
      dan: 'When you finish, remember to log out.',
    },
  ],

  'money-banking-beginner': [
    {
      q: 'Theo bài, người ta nhận lương vào lúc nào?',
      options: [
        'Vào ngày trả lương',
        'Vào mỗi buổi sáng đi làm',
        'Sau khi trả xong hoá đơn',
        'Khi mở một tài khoản mới',
      ],
      answer: 0,
      dan: 'On payday, they get paid.',
    },
    {
      q: 'Bài lấy ví dụ nào cho thứ miễn phí?',
      options: [
        'Nước uống ở trong công viên',
        'Tiền thừa nhận lại sau khi trả',
        'Tờ hoá đơn giấy ở cửa hàng',
        'Máy rút tiền đặt ở ngoài phố',
      ],
      answer: 0,
      dan: 'Some things, like water in a park, are free.',
    },
    {
      q: 'Khi tới ngân hàng, theo bài ta phải cung cấp những gì?',
      options: [
        'Tên của mình, số tài khoản và viết chữ ký của mình',
        'Tiền mặt gồm những tờ tiền giấy và các đồng xu lẻ',
        'Một chiếc thẻ ngân hàng cùng tờ hoá đơn giấy đã in',
        'Số tiền cần vay và tên của người bạn cho mình vay',
      ],
      answer: 0,
      dan: 'You will need to give your name, your account number, and write your signature.',
    },
    {
      q: 'Bài khuyên gì về việc dùng tiền?',
      options: [
        'Đừng tiêu hết, nên để lại một phần dành cho sau này',
        'Nên vay của bạn bè mỗi khi thiếu để mua đủ mọi thứ',
        'Nên trả mọi hoá đơn bằng thẻ chứ đừng dùng tiền mặt',
        'Nên giữ hết tiền mặt trong ví thay vì gửi ở ngân hàng',
      ],
      answer: 0,
      dan: 'It is a good idea not to spend all your money, but to save some value for the future.',
    },
  ],

  'places-directions-beginner': [
    {
      q: 'Theo bài, muốn gửi một lá thư thì tìm chỗ nào?',
      options: [
        'Tìm bưu điện',
        'Tìm ngân hàng',
        'Tìm nhà ga',
        'Tìm thư viện',
      ],
      answer: 0,
      dan: 'If you want to send a letter, you find the post office.',
    },
    {
      q: 'Để giải trí, theo bài có thể làm những gì và ở đâu?',
      options: [
        'Đọc sách ở thư viện, xem đồ cổ ở bảo tàng, xem phim ở rạp',
        'Ăn ở nhà hàng, uống cà phê ở quán, rồi ra công viên nghỉ',
        'Ra nhà ga hoặc sân bay để bắt đầu một chuyến đi xa',
        'Tới cửa hàng, ra chợ hoặc vào siêu thị lớn để mua thức ăn',
      ],
      answer: 0,
      dan: 'For fun, you can read a book in the library, see old things in a museum, or watch a film at the cinema.',
    },
    {
      q: 'Bài lấy câu chỉ đường nào làm ví dụ?',
      options: [
        '"Đi thẳng, rồi rẽ trái hoặc rẽ phải ở chỗ góc phố."',
        '"Đi qua cầu, rồi đi bộ vượt qua một toà nhà cao."',
        '"Chỗ đó ở gần đây, không phải đi xa lắm đâu."',
        '"Chỗ đó nằm cạnh đồn cảnh sát, đối diện quán cà phê."',
      ],
      answer: 0,
      dan: "Someone might say, 'Go straight, then turn left or turn right at the corner.'",
    },
    {
      q: 'Bài kể những cách nào để nói một chỗ nằm ở đâu?',
      options: [
        'Cạnh đồn cảnh sát, đối diện quán cà phê, giữa hai cửa hàng, sau ngân hàng',
        'Đi thẳng, rẽ trái ở chỗ góc phố, rồi đi qua cầu và vượt một toà nhà cao',
        'Ở thành phố lớn, ở một thị trấn nhỏ, hoặc ở một làng quê yên tĩnh',
        'Ở công viên, ở vườn hoa, ở thư viện, ở bảo tàng hoặc ở rạp phim',
      ],
      answer: 0,
      dan: 'It could be next to the police station, opposite the cafe, between two shops, behind the bank, or right in front of you.',
    },
  ],

  'numbers-quantity-beginner': [
    {
      q: 'Theo bài, sau khi biết đếm tới hai mươi thì đếm theo chục gồm những số nào?',
      options: [
        'Ba mươi, bốn mươi, năm mươi, sáu mươi, bảy mươi, tám mươi, chín mươi',
        'Mười một, mười hai, mười ba, mười bốn, mười lăm cho tới hai mươi',
        'Một trăm, một nghìn, rồi tới cả một triệu nếu muốn đếm tiếp',
        'Số thứ nhất, ngày thứ hai và giải thưởng thứ ba theo thứ tự',
      ],
      answer: 0,
      dan: 'When you know these, it is simple to count by tens: thirty, forty, fifty, sixty, seventy, eighty, and ninety.',
    },
    {
      q: 'Bài lấy ví dụ nào cho số chỉ thứ tự?',
      options: [
        'Vị trí thứ nhất, ngày thứ hai, hoặc giải thưởng thứ ba',
        'Ba mươi, bốn mươi và năm mươi khi ta đếm theo từng chục một',
        'Một trăm, một nghìn hoặc thậm chí là cả một triệu',
        'Một ít sữa, một chút thức ăn, hoặc vài người bạn tới nhà',
      ],
      answer: 0,
      dan: 'Sometimes we need to use an order number, like the first place, the second day, or the third prize.',
    },
    {
      q: 'Theo bài, khi muốn cộng các thứ lại thì ta hỏi thế nào?',
      options: [
        'Hỏi "bao nhiêu nước?" hoặc "bao nhiêu quả táo?"',
        'Hỏi "còn lại chút tiền nào không?" cho chắc chắn',
        'Hỏi "muốn tất cả bánh quy hay là không cái nào?"',
        'Hỏi "cần thêm một chút hay là bớt đi một ít?"',
      ],
      answer: 0,
      dan: "If we want to add things together, we might ask 'How much water?' or 'How many apples?'.",
    },
    {
      q: 'Bài kết lại bằng ý nào?',
      options: [
        'Có đủ cho cả hai người thì tốt hơn là để bị đói',
        'Có tất cả bánh quy thì tốt hơn là chẳng có cái nào',
        'Có một ít sữa thì tốt hơn là chẳng còn chút tiền nào',
        'Có vài người bạn tới nhà thì tốt hơn là ngồi một mình',
      ],
      answer: 0,
      dan: 'Most people agree that it is better to have enough for both of us than to be hungry.',
    },
  ],

  // ══ ĐỢT 19/08 — 9 CHẶNG A1 TRƯỢT BỘ LỌC NHƯNG ĐỌC RA THÌ HỎI ĐƯỢC ══════════
  //
  // 52 chặng A1/A2 bị `scripts/audit_a1a2_story.mjs` xếp là "không đủ điều kiện
  // soạn", và 48/52 trượt vì ĐẾM ĐƯỢC ÍT HƠN 4 DẤU HIỆU TƯỜNG THUẬT (đại từ,
  // liên từ). Đọc thật cả 24 chặng bậc A1 thì bộ đếm đó gộp hai chuyện khác hẳn:
  //
  //   · `kids-starter` là truyện kể ngôi thứ nhất — Luna chào mặt trời, chạy tới
  //     trường cùng con mèo, cô giáo khen. Trượt vì chỉ có 1 chữ "After".
  //   · `nature-animals-beginner` thì đúng là diễu hành từ vựng: "you can see a
  //     tall tree with a green leaf and a beautiful flower" — không một mệnh đề
  //     nào để hỏi, hỏi gì cũng thành hỏi kiến thức chung.
  //
  // Phép thử thật sự KHÔNG phải đếm đại từ, mà là: **chỉ ra được BỐN CÂU KHÁC
  // NHAU trong bài, mỗi câu trả lời một câu hỏi khác nhau, không đoán ra bằng
  // kiến thức chung.** Chín chặng dưới đây qua phép thử đó. Phần còn lại ghi lý
  // do đích danh trong `scripts/data/a1a2_phan_loai.mjs`.
  //
  // Chính file `audit_a1a2_story.mjs` đã tự dặn ở đầu: "BỘ LỌC THÔ để ra DANH
  // SÁCH VIỆC, KHÔNG phải phán quyết chất lượng."
  'kids-starter': [
    {
      q: 'Buổi sáng, Luna chào ai đầu tiên?',
      options: [
        'Chào mặt trời màu vàng, ngay sau khi thức dậy sớm',
        'Chào con mèo nhỏ, người bạn cùng chạy tới trường',
        'Chào cô giáo đứng chờ sẵn ở cổng trường buổi sáng',
        'Chào cầu vồng bảy màu hiện ra trên bầu trời sớm',
      ],
      answer: 0,
      dan: 'I wake up early and say "Good morning!" to the yellow sun',
    },
    {
      q: 'Luna tới trường cùng với ai?',
      options: [
        'Cùng con mèo nhỏ, và Luna chạy rất nhanh',
        'Cùng cô giáo, người khen Luna giỏi hôm nay',
        'Cùng quả bóng mà Luna chơi ở ngoài vườn',
        'Cùng bông hoa mà Luna vẽ bằng bút chì xanh',
      ],
      answer: 0,
      dan: 'I run fast to school with my friend, the little cat',
    },
    {
      q: 'Ở trường, Luna học nội dung gì?',
      options: [
        'Học các màu: đỏ, xanh dương, xanh lá và vàng',
        'Học đếm số: một, hai, ba, cho tới hết buổi tối',
        'Học vẽ hoa bằng cây bút chì màu xanh lá cây',
        'Học bảy màu của cầu vồng hiện trên bầu trời',
      ],
      answer: 0,
      dan: 'At school, I learn colors: red, blue, green, yellow!',
    },
    {
      q: 'Cô giáo nói gì với Luna?',
      options: [
        'Rằng hôm nay Luna rất giỏi',
        'Rằng hôm nay Luna tới lớp muộn',
        'Rằng Luna nên vẽ thêm một bông hoa',
        'Rằng Luna hãy đếm sao vào buổi tối',
      ],
      answer: 0,
      dan: 'My teacher says: "Luna, you are very good today!"',
    },
  ],
  'food-cooking': [
    {
      q: 'Ở lớp nấu ăn, người đầu bếp dạy những việc gì?',
      options: [
        'Thái rau, gọt khoai tây và cắt bánh mì cho đúng cách',
        'Nướng gà, nướng bánh mì kẹp và khuấy nồi súp cho đều',
        'Đun nước, rán hành và nêm gia vị sao cho vừa miệng',
        'Rửa rau, bày đĩa khai vị và làm bánh ngọt tráng miệng',
      ],
      answer: 0,
      dan: 'The chef taught us how to chop vegetables, peel potatoes, and slice bread properly.',
    },
    {
      q: 'Theo bài, thứ tự hai việc đầu tiên khi nấu là gì?',
      options: [
        'Đun nước luộc mì trước, rồi mới rán hành với dầu ô liu',
        'Rán hành với dầu ô liu trước, rồi mới đun nước luộc mì',
        'Nêm gia vị cho vừa trước, rồi mới đun nước để luộc mì',
        'Thái rau và gọt khoai trước, rồi mới rán hành với dầu',
      ],
      answer: 0,
      dan: 'First, we had to boil water for the pasta, then fry onions in olive oil.',
    },
    {
      q: 'Trong bữa tối Chủ nhật, mẹ và bố mỗi người làm món gì?',
      options: [
        'Mẹ quay gà, còn bố nướng bánh mì kẹp thịt',
        'Mẹ nướng bánh mì kẹp thịt, còn bố quay gà',
        'Mẹ khuấy nồi súp, còn bố làm bánh tráng miệng',
        'Mẹ làm bánh tráng miệng, còn bố bày món khai vị',
      ],
      answer: 0,
      dan: 'Mom likes to roast chicken while Dad grills burgers.',
    },
    {
      q: 'Gia đình xử lý thức ăn thừa như thế nào?',
      options: [
        'Không bỏ phí, thức ăn thừa thành bữa trưa hôm sau',
        'Không bỏ phí, thức ăn thừa thành món khai vị hôm sau',
        'Bỏ đi hết, vì bữa tối Chủ nhật nào cũng nấu rất nhiều',
        'Đem chia cho hàng xóm, vì nhà nấu nhiều hơn mức ăn hết',
      ],
      answer: 0,
      dan: "We never waste food – any leftovers become tomorrow's lunch!",
    },
  ],
  'time-dates-beginner': [
    {
      q: 'Người kể thức dậy lúc mấy giờ?',
      options: [
        'Sáu giờ rưỡi, và luôn luôn dậy vào giờ đó',
        'Sáu giờ đúng, và luôn luôn dậy vào giờ đó',
        'Bảy giờ rưỡi, sau khi đã ăn xong bữa sáng',
        'Trước nửa đêm, vì hôm sau còn phải đi học',
      ],
      answer: 0,
      dan: 'I always wake up at half past six.',
    },
    {
      q: 'Người kể đi học vào những ngày nào?',
      options: [
        'Từ thứ Hai đến thứ Sáu',
        'Từ thứ Hai đến thứ Bảy',
        'Chỉ thứ Bảy và Chủ nhật',
        'Cả bảy ngày trong một tuần',
      ],
      answer: 0,
      dan: 'I go to school from Monday to Friday.',
    },
    {
      q: 'Sinh nhật của người kể vào tháng nào, và tháng đó thuộc mùa gì?',
      options: [
        'Tháng Năm, và đó là một tháng của mùa xuân',
        'Tháng Sáu, và đó là một tháng của mùa xuân',
        'Tháng Năm, và đó là một tháng của mùa hè',
        'Tháng Sáu, và đó là tháng mùa hè bắt đầu',
      ],
      answer: 0,
      dan: 'My birthday is in May, which is a spring month.',
    },
    {
      q: 'Bài nói gì về thói quen đi ngủ của người kể?',
      options: [
        'Không bao giờ ngủ muộn, thường ngủ trước nửa đêm',
        'Không bao giờ ngủ muộn, thường ngủ trước mười giờ',
        'Thường ngủ muộn vào cuối tuần vì được nghỉ học',
        'Thường ngủ muộn vì buổi tối còn phải làm bài tập',
      ],
      answer: 0,
      dan: 'I never go to bed late; I usually sleep before midnight.',
    },
  ],
  'house-rooms-beginner': [
    {
      q: 'Trong phòng khách có những gì?',
      options: [
        'Ghế sofa êm, một cái TV và tấm thảm màu đỏ trên sàn',
        'Ghế sofa êm, một cái TV và cái bàn gỗ lớn để ăn cơm',
        'Bếp ga, lò nướng và lò vi sóng mẹ dùng để nấu ăn',
        'Một cái giường có gối mềm và một cái chăn thật ấm',
      ],
      answer: 0,
      dan: 'There is a comfortable sofa, a TV, and a red carpet on the floor.',
    },
    {
      q: 'Gia đình cất thịt và sữa ở đâu?',
      options: [
        'Trong tủ lạnh, còn bát đĩa thì rửa ở bồn rửa',
        'Trong tủ quần áo, còn bát đĩa thì để trong bếp',
        'Trong lò vi sóng, còn bát đĩa thì rửa ở bồn rửa',
        'Trên bàn gỗ lớn ở phòng ăn, cạnh phòng khách',
      ],
      answer: 0,
      dan: 'We keep meat and milk in the fridge, and we wash the plates and bowls in the sink.',
    },
    {
      q: 'Trên tầng có mấy phòng ngủ?',
      options: [
        'Ba phòng ngủ và một phòng tắm',
        'Hai phòng ngủ và một phòng tắm',
        'Ba phòng ngủ và hai phòng tắm',
        'Một phòng ngủ và một phòng khách',
      ],
      answer: 0,
      dan: 'Upstairs, there are three bedrooms and a bathroom.',
    },
    {
      q: 'Khi ra khỏi nhà, gia đình luôn làm gì?',
      options: [
        'Đóng cửa sổ và khoá cửa bằng chìa để nhà được an toàn',
        'Quét sàn bằng chổi và lau bụi trên các món đồ trong nhà',
        'Tắt bếp ga, lò nướng và lò vi sóng ở trong phòng bếp',
        'Đóng cửa nhà xe và tưới nước cho khu vườn phía trước',
      ],
      answer: 0,
      dan: 'When we leave home, we always close the windows and lock the door with a key to keep our house safe.',
    },
  ],
  'weather-seasons-beginner-p2': [
    {
      q: 'Bài tả mùa xuân thế nào?',
      options: [
        'Không khí ấm, trời quang, hoa bắt đầu mọc trên cỏ xanh',
        'Không khí mát, gió nhẹ thổi, lá vàng rụng khỏi thân cây',
        'Nhiệt độ tăng cao, trời xanh không một gợn mây trắng nào',
        'Trời lạnh cóng, nước trong hồ đóng băng và tuyết rơi xuống',
      ],
      answer: 0,
      dan: 'In the spring, the air is warm, the sky is clear, and beautiful flowers begin to grow on the green grass.',
    },
    {
      q: 'Vào mùa thu, lá cây trong bài có màu gì?',
      options: [
        'Màu nâu và màu vàng, và lá rụng khỏi cây',
        'Màu xanh lá và màu vàng, và lá rụng khỏi cây',
        'Màu trắng, vì tuyết phủ kín cả tán lá trên cây',
        'Màu đỏ và màu nâu, và lá vẫn còn ở trên cây',
      ],
      answer: 0,
      dan: 'A gentle breeze blows, and brown and yellow leaves drop from the trees.',
    },
    {
      q: 'Mùa đông, nước ở đâu có thể đóng thành băng?',
      options: [
        'Nước trong hồ, còn tuyết thì rơi xuống từ bầu trời',
        'Nước ngoài biển, còn tuyết thì rơi xuống từ bầu trời',
        'Nước trong hồ, còn mưa thì kèm theo sấm và chớp',
        'Nước ngoài biển, nơi mọi người bơi vào mùa hè',
      ],
      answer: 0,
      dan: 'The water in the lake might freeze into ice, and snow falls from the sky.',
    },
    {
      q: 'Bài kết lại bằng ý nào?',
      options: [
        'Sau mùa đông lạnh, băng sẽ tan và mùa xuân quay trở lại',
        'Sau mùa đông lạnh, tuyết sẽ rơi dày hơn ở trên các con đường',
        'Sau mùa hè nóng, trời sẽ mát dần và gió nhẹ bắt đầu thổi',
        'Sau mùa thu mát, bão sẽ mang theo mưa, sấm và cả chớp nữa',
      ],
      answer: 0,
      dan: 'After a cold winter, the ice will melt, and spring will return again.',
    },
  ],
  'places-buildings-beginner-p2': [
    {
      q: 'Ở trung tâm thị trấn có gì?',
      options: [
        'Một quảng trường lớn, gần đó là nhiều toà nhà',
        'Một công viên đẹp, gần đó là trường của người kể',
        'Một bệnh viện lớn màu trắng dành cho người bị ốm',
        'Một nhà ga để bắt tàu đi lên thành phố vào cuối tuần',
      ],
      answer: 0,
      dan: 'In the center of the town, there is a big square.',
    },
    {
      q: 'Đối diện quán cà phê là những nơi nào?',
      options: [
        'Một ngân hàng và một bưu điện',
        'Một siêu thị và một cửa hàng nhỏ',
        'Một đồn cảnh sát và một trạm cứu hoả',
        'Một công viên và một cái hồ nhỏ',
      ],
      answer: 0,
      dan: 'Opposite the cafe is a bank and a post office.',
    },
    {
      q: 'Trường của người kể nằm ở đâu?',
      options: [
        'Bên tay phải, ngay cạnh một công viên đẹp',
        'Bên tay trái, ngay cạnh một công viên đẹp',
        'Ngay cạnh siêu thị nơi mẹ người kể mua đồ ăn',
        'Ở trung tâm thị trấn, ngay cạnh quảng trường lớn',
      ],
      answer: 0,
      dan: 'My school is on the right, next to a beautiful park.',
    },
    {
      q: 'Phòng khách sạn của gia đình ở tầng mấy?',
      options: [
        'Tầng mười, và có thang máy để đi lên',
        'Tầng một, nên không cần dùng tới thang máy',
        'Tầng mười, nhưng phải đi bộ vì không có thang máy',
        'Tầng hai, ngay phía trên sảnh của khách sạn',
      ],
      answer: 0,
      dan: 'The hotel has an elevator to go up to our room on the 10th floor.',
    },
  ],
  'daily-routine-beginner': [
    {
      q: 'Khi thức dậy, đồng hồ chỉ mấy giờ?',
      options: [
        'Sáu giờ sáng',
        'Bảy giờ sáng',
        'Mười hai giờ trưa',
        'Sáu giờ chiều',
      ],
      answer: 0,
      dan: 'I look at the clock, it is 6 AM.',
    },
    {
      q: 'Người kể tới trường hoặc chỗ làm bằng cách nào?',
      options: [
        'Đi bộ ra bến xe buýt, hoặc đôi khi bố chở đi',
        'Đi bộ ra bến xe buýt, hoặc đôi khi mẹ chở đi',
        'Tự lái xe đi, vì bến xe buýt ở khá xa nhà',
        'Đạp xe đi, vì nhà nằm ngay gần chỗ học và làm',
      ],
      answer: 0,
      dan: 'I leave my house and walk to the bus stop, or sometimes my dad drives me.',
    },
    {
      q: 'Sau bữa tối, người kể làm việc nhà gì?',
      options: [
        'Quét sàn nhà hoặc rửa bát đĩa',
        'Quét sàn nhà hoặc lau cửa sổ cho sạch',
        'Nấu bữa tối cùng cả nhà rồi cùng ngồi ăn',
        'Làm bài tập rồi nằm nghỉ trên ghế sofa',
      ],
      answer: 0,
      dan: 'I sweep the floor or wash up the plates.',
    },
    {
      q: 'Việc cuối cùng người kể làm trước khi ngủ là gì?',
      options: [
        'Đọc một quyển sách',
        'Làm nốt bài tập về nhà',
        'Xem TV hoặc chơi trò chơi',
        'Rửa mặt và đánh răng',
      ],
      answer: 0,
      dan: 'At night, before I go to sleep, I read a book.',
    },
  ],
  'house-rooms-beginner-p2': [
    {
      q: 'Nhà của người kể có mấy phòng?',
      options: [
        'Bốn phòng',
        'Ba phòng',
        'Năm phòng',
        'Hai phòng',
      ],
      answer: 0,
      dan: 'My house has four rooms.',
    },
    {
      q: 'Mở cửa vào là bước thẳng vào phòng nào?',
      options: [
        'Phòng khách',
        'Phòng bếp',
        'Phòng ngủ',
        'Phòng tắm',
      ],
      answer: 0,
      dan: 'When you open the door, you walk into the living room.',
    },
    {
      q: 'Trên tường phòng khách có gì?',
      options: [
        'Một bức tranh đẹp và một cái đồng hồ xem giờ',
        'Một cái TV và một cái bàn nhỏ kê ở giữa phòng',
        'Một tấm gương, một cái khăn và một bánh xà phòng',
        'Một cái giá sách đựng sách, bút mực và bút chì',
      ],
      answer: 0,
      dan: 'There is a beautiful picture on the wall and a clock to tell the time.',
    },
    {
      q: 'Trong phòng tắm có những gì?',
      options: [
        'Một tấm gương, một cái khăn và một ít xà phòng',
        'Một tấm gương, một cái bàn học và một cái ghế',
        'Nhiều cốc, ly, đĩa và bát dùng cho bữa ăn hằng ngày',
        'Một cái giường lớn để ngủ và một cái cặp đựng sách',
      ],
      answer: 0,
      dan: 'In the bathroom, you can find a mirror, a towel, and some soap to wash your hands when they are dirty.',
    },
  ],
  'school-classroom-beginner': [
    {
      q: 'Cô giáo đứng ở đâu và dùng gì để viết bài?',
      options: [
        'Đứng gần bảng trắng, dùng phấn hoặc bút để viết',
        'Đứng gần bàn học, dùng bút chì và thước để viết',
        'Đứng gần cửa lớp, dùng phấn để viết lên bảng đen',
        'Ngồi ở bàn giáo viên, dùng sách để đọc bài cho lớp',
      ],
      answer: 0,
      dan: 'The teacher stands near the whiteboard and uses chalk or a pen to write the lesson.',
    },
    {
      q: 'Trong cặp của người kể có những gì?',
      options: [
        'Một quyển vở, một cây bút chì, một cục tẩy và một cái thước',
        'Một quyển sách, một mẩu phấn, một cái bảng và một cây bút',
        'Một quyển vở, một tờ giấy, một cái ghế và một cái bàn học',
        'Một quyển sách, một cục tẩy, một cây bút mực và một cái cặp',
      ],
      answer: 0,
      dan: 'In my bag, I have a notebook, a pencil, an eraser, and a ruler.',
    },
    {
      q: 'Người kể nói gì về các môn học?',
      options: [
        'Thích toán, nhưng khoa học và lịch sử cũng thú vị',
        'Thích lịch sử, nhưng toán và khoa học thì rất khó',
        'Thích môn mỹ thuật, nhưng không thích môn thể thao',
        'Thích khoa học, còn toán thì chỉ học vì bắt buộc',
      ],
      answer: 0,
      dan: 'I like math, but science and history are also interesting.',
    },
    {
      q: 'Cuối buổi học, chuyện gì xảy ra?',
      options: [
        'Cả lớp gấp sách lại và cô giáo giao bài tập về nhà',
        'Cả lớp mở sách ra và cô giáo đọc bài học tiếp theo',
        'Cả lớp ra sân chạy nhảy trong giờ thể thao cuối ngày',
        'Cả lớp làm bài kiểm tra để lấy điểm tổng kết cuối kỳ',
      ],
      answer: 0,
      dan: 'At the end of the day, we close our book and the teacher gives us homework.',
    },
  ],

  // ── ĐỢT HAI 19/08 — bốn chặng A1 còn lại của nhóm "hỏi được" ──────────────
  // Bốn bài này khó soạn hơn chín bài trước vì NỬA BÀI LÀ KIẾN THỨC CHUNG (60
  // giây một phút; mắt để nhìn; hình vuông có bốn cạnh). Hỏi vào đó là hỏi về
  // THẾ GIỚI, người học ghi điểm mà chưa đọc bài. Nên mọi câu dưới đây neo vào
  // chi tiết CHỈ CÓ trong chính bài: mười ngón, mười apple thêm năm, tim ĐỎ và
  // sao VÀNG, con đường rộng còn lối trong vườn hẹp.
  'numbers-time-beginner': [
    {
      q: 'Bài đưa ra hai cách nói giờ nào làm ví dụ?',
      options: [
        '"Chín giờ" và "mười giờ rưỡi"',
        '"Bảy giờ" và "mười hai giờ trưa"',
        '"Sáu giờ rưỡi" và "chín giờ tối"',
        '"Nửa đêm" và "tám giờ sáng"',
      ],
      answer: 0,
      dan: "When people ask 'What time is it?', you can say 'It is nine o'clock' or 'It is half past ten'.",
    },
    {
      q: 'Người kể thức dậy lúc mấy giờ?',
      options: [
        'Bảy giờ',
        'Sáu giờ',
        'Mười giờ rưỡi',
        'Mười hai giờ trưa',
      ],
      answer: 0,
      dan: 'At 7 o\'clock, I wake up.',
    },
    {
      q: 'Vì sao người kể luôn đi ngủ trước nửa đêm?',
      options: [
        'Để ngủ được đủ tám tiếng',
        'Để kịp thức dậy lúc bảy giờ',
        'Để có thời gian rảnh vào cuối tuần',
        'Để không bao giờ bị muộn giờ làm',
      ],
      answer: 0,
      dan: 'I always go to bed before midnight, so I can sleep for eight hours.',
    },
    {
      q: 'Theo bài, người kể làm gì để không bao giờ bị muộn?',
      options: [
        'Lên lịch trong sổ và xem đồng hồ đeo tay',
        'Đi ngủ trước nửa đêm và ngủ đủ tám tiếng',
        'Thức dậy sớm từ bảy giờ mỗi buổi sáng',
        'Chỉ làm việc từ sáng tới hết buổi chiều',
      ],
      answer: 0,
      dan: 'Sometimes I feel like there is never enough time in a day, but if I plan my calendar and check my watch, I am never late.',
    },
  ],
  'body-parts-beginner': [
    {
      q: 'Người kể nói mình có bao nhiêu ngón tay và bao nhiêu ngón chân?',
      options: [
        'Mười ngón tay và mười ngón chân',
        'Mười ngón tay và năm ngón chân',
        'Năm ngón tay và mười ngón chân',
        'Hai bàn tay và hai bàn chân',
      ],
      answer: 0,
      dan: 'I have ten fingers on my hands.',
    },
    {
      q: 'Người kể dùng hai bàn tay để làm những việc gì?',
      options: [
        'Chạm vào đồ vật, giữ một quyển sách, hoặc vỗ tay',
        'Đứng, đi bộ, chạy và nhảy lên khỏi mặt đất',
        'Nhai thức ăn, nói chuyện, ăn uống và mỉm cười',
        'Rửa mặt, đánh răng và chải lại mái tóc mỗi ngày',
      ],
      answer: 0,
      dan: 'I use my hands to touch things, hold a book, or clap.',
    },
    {
      q: 'Người kể rửa tay bằng xà phòng vào lúc nào?',
      options: [
        'Trước khi ăn',
        'Sau khi ăn xong',
        'Trước khi đi ngủ',
        'Sau khi chạy và nhảy',
      ],
      answer: 0,
      dan: 'I wash my hands with soap and water before I eat.',
    },
    {
      q: 'Ba việc người kể làm để chăm sóc cơ thể mỗi ngày là gì?',
      options: [
        'Rửa mặt, đánh răng và chải tóc',
        'Rửa tay, uống nước và ăn đồ ăn lành',
        'Đứng, đi bộ và chạy cho cơ thể khoẻ',
        'Ngủ, nghỉ và tới bệnh viện gặp bác sĩ',
      ],
      answer: 0,
      dan: 'I wash my face, brush my teeth, and comb my hair.',
    },
  ],
  'numbers-shapes-beginner': [
    {
      q: 'Theo ví dụ trong bài, mười quả táo thêm năm quả thì được bao nhiêu?',
      options: [
        'Mười lăm quả',
        'Tám quả',
        'Hai mươi quả',
        'Mười hai quả',
      ],
      answer: 0,
      dan: 'If you have ten apples and you add five, you get fifteen apples.',
    },
    {
      q: 'Còn mười quả táo bớt đi hai quả thì còn lại bao nhiêu?',
      options: [
        'Tám quả',
        'Mười lăm quả',
        'Mười hai quả',
        'Năm quả',
      ],
      answer: 0,
      dan: 'If you have ten apples and you subtract two, you have eight left.',
    },
    {
      q: 'Cô giáo yêu cầu cả lớp vẽ những gì?',
      options: [
        'Một trái tim màu đỏ và một ngôi sao màu vàng',
        'Một trái tim màu vàng và một ngôi sao màu đỏ',
        'Một đường thẳng và một đường cong trên giấy',
        'Một hình vuông bốn cạnh và một hình tam giác',
      ],
      answer: 0,
      dan: 'Our teacher asks us to draw a red heart and a yellow star.',
    },
    {
      q: 'Bài so sánh con đường về nhà với lối đi trong vườn thế nào?',
      options: [
        'Đường về nhà thì rộng, còn lối trong vườn thì hẹp',
        'Đường về nhà thì hẹp, còn lối trong vườn thì rộng',
        'Đường về nhà thì dài, còn lối trong vườn thì ngắn',
        'Cả hai đều hẹp, chỉ khác nhau ở chỗ dài hay ngắn',
      ],
      answer: 0,
      dan: 'The road to my house is wide, but the path in the garden is narrow.',
    },
  ],
  'travel-transport-beginner': [
    {
      q: 'Theo bài, việc cần làm TRƯỚC KHI đi là gì?',
      options: [
        'Soạn túi và hành lý của mình',
        'Đặt một phòng khách sạn có giường êm',
        'Xem bản đồ hoặc nghe hướng dẫn viên',
        'Mua vé rồi ra sân bay để lên máy bay',
      ],
      answer: 0,
      dan: 'Before you go, you pack your bag and your luggage.',
    },
    {
      q: 'Bài nhắc đừng quên thứ gì khi đi sang một nước khác?',
      options: [
        'Hộ chiếu và thị thực',
        'Vé máy bay và bản đồ',
        'Máy ảnh để chụp hình',
        'Túi và hành lý của mình',
      ],
      answer: 0,
      dan: "Don't forget your passport and visa if you go to another country.",
    },
    {
      q: 'Khi tới nơi, khách du lịch có thể làm gì để đi thăm các nơi đẹp?',
      options: [
        'Xem bản đồ hoặc nghe hướng dẫn viên du lịch',
        'Đặt một phòng khách sạn rồi nghỉ trên giường êm',
        'Soạn lại túi và hành lý cho gọn trước khi ra ngoài',
        'Gọi một chiếc taxi hoặc thuê một chiếc xe đạp',
      ],
      answer: 0,
      dan: 'As a tourist or visitor, you can look at a map or listen to a tour guide to visit beautiful places.',
    },
    {
      q: 'Bài kết lại bằng lời nhắc nào?',
      options: [
        'Nhớ mang máy ảnh để chụp lại những nơi mình thấy',
        'Nhớ mang hộ chiếu và thị thực nếu ra nước ngoài',
        'Nhớ đặt phòng khách sạn trước khi bắt đầu chuyến đi',
        'Nhớ đội mũ bảo hiểm và cài dây an toàn cho an toàn',
      ],
      answer: 0,
      dan: 'Just remember to bring your camera to take a beautiful picture or photo of the sun and the places you see.',
    },
  ],

  // ══ ĐỢT 19/08 — CHẶNG ĐÃ VIẾT LẠI BÀI ĐỌC ════════════════════════════════
  // Bốn chặng này trước đây là diễu hành từ vựng ("A dog is a very friendly
  // animal"), nên chúng nằm trong nhóm 'viet-lai' và mang băng cảnh báo cam.
  // Bài đọc ĐÃ ĐƯỢC VIẾT LẠI thành một cảnh có nhân vật và có việc xảy ra —
  // xem `scripts/data/viet_lai_bai_doc.mjs`. Nay hỏi được, nên soạn câu.
  //
  // `dan` ở đây do MÁY lấy từ chính mảng câu của bài, không gõ lại — cùng lý do
  // đã phải chép bằng máy ở đợt A2 (dấu gạch ngang, nháy lồng nhau).
  'animals-pets-beginner': [
    {
      q: 'Con mèo Mun trông thế nào?',
      options: [
        'Lông xám, có một bàn chân trắng',
        'Lông xám, có một cái tai trắng',
        'Lông trắng, có một bàn chân xám',
        'Lông xám hết, không có chỗ nào trắng',
      ],
      answer: 0,
      dan: 'My cat is called Mun, and she has grey fur with one white paw.',
    },
    {
      q: 'Vì sao người kể không lại gần con lợn?',
      options: [
        'Vì nó to hơn người kể tưởng nhiều',
        'Vì cậu của người kể không cho lại gần',
        'Vì nó đang ăn và có thể cắn người kể',
        'Vì nó trốn sau một cái tổ bằng cỏ khô',
      ],
      answer: 0,
      dan: 'I did not go near the pig, because it was much bigger than I expected.',
    },
    {
      q: 'Vì sao bạn Nam thích con khỉ?',
      options: [
        'Vì con khỉ lấy mũ của cậu ấy và không trả lại',
        'Vì con khỉ uống nước bằng cái mũi dài của nó',
        'Vì con khỉ chạy khỏi cậu ấy rồi trốn sau cái tổ',
        'Vì con khỉ ngủ trong bóng mát cả buổi chiều',
      ],
      answer: 0,
      dan: 'My friend Nam liked the monkey, because the monkey took his hat and would not give it back.',
    },
    {
      q: 'Vì sao cả lớp không thấy con sư tử?',
      options: [
        'Người trông sở thú nói nó đang ngủ trong bóng mát',
        'Cô giáo dặn cả lớp phải đứng ở phía sau cái lồng',
        'Cả lớp về sớm nên không kịp đi hết vòng sở thú',
        'Nó bị chuyển sang một sở thú khác từ hôm thứ Hai',
      ],
      answer: 0,
      dan: 'We did not see the lion at all; the keeper said it was asleep in the shade.',
    },
  ],
  'transport-vehicles-beginner': [
    {
      q: 'Vì sao người kể trượt chuyến xe buýt bảy giờ?',
      options: [
        'Vì không tìm thấy vé trong túi',
        'Vì con đường ra khỏi làng quá hẹp',
        'Vì chuyến xe đó tới muộn một tiếng',
        'Vì phải dừng lại vì một xe tải chậm',
      ],
      answer: 0,
      dan: 'I missed the seven o\'clock bus, because I could not find my ticket in my bag.',
    },
    {
      q: 'Người kể qua sông bằng đường nào, và vì sao?',
      options: [
        'Bằng cây cầu cũ, vì đường hầm mới đang đóng',
        'Bằng đường hầm mới, vì cây cầu cũ đang đóng',
        'Bằng thuyền, vì cả cầu và đường hầm đều đóng',
        'Bằng cây cầu mới, vì đường hầm cũ quá hẹp',
      ],
      answer: 0,
      dan: 'We crossed the river on an old bridge, not through the new tunnel, because the tunnel was closed.',
    },
    {
      q: 'Bác tài taxi yêu cầu người kể làm gì trước khi nổ máy?',
      options: [
        'Thắt dây an toàn',
        'Trình vé máy bay',
        'Đội mũ bảo hiểm',
        'Cất bản đồ vào túi',
      ],
      answer: 0,
      dan: 'The taxi driver told me to put on my seat belt before he would start the engine.',
    },
    {
      q: 'Theo anh trai người kể, vì sao ở làng thì xe đạp tốt hơn?',
      options: [
        'Vì lối đi sau trường quá hẹp cho một chiếc xe hơi',
        'Vì đi xe đạp thì không cần phải đội mũ bảo hiểm',
        'Vì đường cao tốc gần làng có quá nhiều xe tải lớn',
        'Vì xe máy chạy nhanh hơn nhưng lại không an toàn',
      ],
      answer: 0,
      dan: 'He says a bicycle is better in our village, because the path behind the school is too narrow for a car.',
    },
  ],
  'body-health-beginner-p2': [
    {
      q: 'Nhiệt độ của người kể lúc buổi tối là bao nhiêu?',
      options: [
        'Ba mươi chín độ',
        'Ba mươi bảy độ',
        'Bốn mươi độ',
        'Ba mươi tám độ',
      ],
      answer: 0,
      dan: 'That afternoon I began to cough, and by evening my temperature was thirty-nine degrees.',
    },
    {
      q: 'Ai bị đau răng, và người đó được đưa đi gặp ai?',
      options: [
        'Anh trai người kể, mẹ đưa đi gặp nha sĩ',
        'Người kể, bố đưa đi gặp bác sĩ ở bệnh viện',
        'Em gái người kể, mẹ đưa đi gặp nha sĩ',
        'Anh trai người kể, bố đưa đi gặp y tá',
      ],
      answer: 0,
      dan: 'My brother woke up with a bad toothache, so my mother took him to the dentist that morning.',
    },
    {
      q: 'Y tá làm gì cho người kể TRƯỚC TIÊN?',
      options: [
        'Đo huyết áp',
        'Xem cổ họng và hai tai',
        'Nghe ngực xem có gì không',
        'Đưa thuốc giảm đau',
      ],
      answer: 0,
      dan: 'A nurse checked my blood pressure first, and then she looked at my throat and my ears.',
    },
    {
      q: 'Bác sĩ dặn uống thuốc thế nào?',
      options: [
        'Một viên, hai lần một ngày, sau khi ăn, trong năm ngày',
        'Hai viên, một lần một ngày, trước khi ăn, trong năm ngày',
        'Một viên, hai lần một ngày, trước khi ngủ, trong ba ngày',
        'Hai viên, hai lần một ngày, sau khi ăn, trong bảy ngày',
      ],
      answer: 0,
      dan: 'He told me to take one pill twice a day, after food, for five days.',
    },
  ],
  'places-buildings-beginner': [
    {
      q: 'Cái chợ nằm đối diện cái gì?',
      options: [
        'Bưu điện',
        'Ngân hàng',
        'Đồn cảnh sát',
        'Quán cà phê',
      ],
      answer: 0,
      dan: 'The market is right opposite the post office, so my mother sends a letter and buys fish on the same trip.',
    },
    {
      q: 'Bà của người kể sống ở đâu?',
      options: [
        'Một căn hộ ở tầng năm, gần công viên',
        'Một ngôi nhà nhỏ ở gần công viên',
        'Một căn hộ ở tầng năm, sau ngôi đền',
        'Một căn hộ ở tầng nhất, gần cây cầu',
      ],
      answer: 0,
      dan: 'My grandmother does not live in a house; she lives in a flat on the fifth floor near the park.',
    },
    {
      q: 'Muốn lên thư viện thì đi thế nào?',
      options: [
        'Lên bằng cầu thang hẹp ở bên hông tòa nhà',
        'Lên bằng thang máy trong tòa nhà quán cà phê',
        'Đi qua khu vườn có hai cây cổ thụ ở giữa',
        'Đi bên kia cây cầu rồi men theo dòng sông',
      ],
      answer: 0,
      dan: 'The library is above the cafe, and you reach it by a narrow staircase at the side of the building.',
    },
    {
      q: 'Nhà máy duy nhất của thị trấn nằm ở đâu?',
      options: [
        'Ngoài thị trấn, bên kia cây cầu và sát dòng sông',
        'Trong thị trấn, ở cuối con phố chính',
        'Ngoài thị trấn, trên đỉnh ngọn đồi sau làng',
        'Trong thị trấn, phía sau ngôi đền và khu vườn',
      ],
      answer: 0,
      dan: 'The only factory in our town is outside it, beyond the bridge and close to the river.',
    },
  ],

  // ══ ĐỢT HAI 19/08 — 7 CHẶNG A1 CÒN LẠI, ĐÃ VIẾT LẠI BÀI ĐỌC ════════════════════════════════
  // Bảy chặng này trước đây là diễu hành từ vựng ("A dog is a very friendly
  // animal"), nên chúng nằm trong nhóm 'viet-lai' và mang băng cảnh báo cam.
  // Bài đọc ĐÃ ĐƯỢC VIẾT LẠI thành một cảnh có nhân vật và có việc xảy ra —
  // xem `scripts/data/viet_lai_bai_doc.mjs`. Nay hỏi được, nên soạn câu.
  //
  // `dan` ở đây do MÁY lấy từ chính mảng câu của bài, không gõ lại — cùng lý do
  // đã phải chép bằng máy ở đợt A2 (dấu gạch ngang, nháy lồng nhau).
  'body-health-beginner-p3': [
    {
      q: 'Long bị đau ở đâu?',
      options: [
        'Đầu gối bên trái',
        'Đầu gối bên phải',
        'Đầu bên trái',
        'Bàn chân bên trái',
      ],
      answer: 0,
      dan: 'During the sports lesson my friend Long fell on the hard ground and hurt his left knee.',
    },
    {
      q: 'Cô y tế kết luận vì sao người kể bị đau đầu?',
      options: [
        'Vì ngủ quá ít, không phải vì bệnh',
        'Vì bị sốt nhẹ từ buổi sáng',
        'Vì chạy nhiều trong giờ thể dục',
        'Vì uống quá ít nước cả ngày',
      ],
      answer: 0,
      dan: 'She checked my temperature, and it was normal, so she said the problem was sleep, not illness.',
    },
    {
      q: 'Vì sao cô y tế không tự xử lý cho Hoa?',
      options: [
        'Vì cô không làm gì được với một cái răng',
        'Vì Hoa phải về nhà nghỉ ngay lập tức',
        'Vì thuốc trong phòng y tế đã hết',
        'Vì Hoa còn bị sốt cao hơn bình thường',
      ],
      answer: 0,
      dan: 'The nurse could do nothing for a tooth, so she called Hoa\'s mother to take her to the dentist.',
    },
    {
      q: 'Cô y tế cho Long chơi lại với điều kiện gì?',
      options: [
        'Đau là phải ngừng chơi ngay',
        'Phải chờ thêm một tuần nữa',
        'Phải đi gặp bác sĩ ở bệnh viện',
        'Phải ngủ đủ tám tiếng mỗi đêm',
      ],
      answer: 0,
      dan: 'She checked it once more and said yes, but only if he stopped playing the moment it hurt.',
    },
  ],
  'food-drinks-beginner-p2': [
    {
      q: 'Vì sao món tỏi đầu tiên phải bỏ đi?',
      options: [
        'Vì để trên lửa quá lâu nên cháy đen và đắng',
        'Vì tỏi mua ở chợ sáng đó đã bị hỏng sẵn rồi',
        'Vì người kể cho muối vào tỏi hai lần',
        'Vì em trai không ăn được món có tỏi',
      ],
      answer: 0,
      dan: 'I fried the garlic first, and I left it on the heat too long, so it turned black and bitter.',
    },
    {
      q: 'Vì sao em trai người kể không ăn cá?',
      options: [
        'Vì sợ xương cá',
        'Vì cá bị mặn quá',
        'Vì em thích trứng hơn',
        'Vì cá đã nguội hết',
      ],
      answer: 0,
      dan: 'The fish came out well, but my little brother would not eat any of it because of the bones.',
    },
    {
      q: 'Món canh bị mặn vì lý do gì?',
      options: [
        'Vì cho muối hai lần, do quên mất lần đầu',
        'Vì nước dùng bị cạn khi đun quá lâu',
        'Vì cho cả muối lẫn nước mắm vào canh',
        'Vì mẹ đã cho muối trước khi người kể nấu',
      ],
      answer: 0,
      dan: 'The soup was too salty, because I added salt twice and forgot the first time.',
    },
    {
      q: 'Bố người kể nhận xét thế nào về bữa ăn?',
      options: [
        'Nói thật rằng món canh là chỗ yếu',
        'Nói bữa ăn ngon hết, không có chỗ nào dở',
        'Không nói gì cho tới khi ăn xong bữa',
        'Nói món cá dở hơn cá ở nhà hàng',
      ],
      answer: 0,
      dan: 'My mother said the meal was delicious, but my father said the truth: the soup was the weak part.',
    },
  ],
  'animals-nature-beginner': [
    {
      q: 'Vì sao ông gọi người kể dậy lúc bốn giờ ba mươi?',
      options: [
        'Vì ông nói chim hát hay nhất trước khi mặt trời lên',
        'Vì hai người phải lên tới đỉnh núi trước khi trời mưa',
        'Vì con cáo chỉ băng qua lối mòn vào sáng sớm',
        'Vì nước hồ trên đỉnh lạnh nhất vào lúc đó',
      ],
      answer: 0,
      dan: 'He wakes me at half past four, because he says the birds sing best before the sun comes up.',
    },
    {
      q: 'Khi thấy con cáo, ông đã làm gì?',
      options: [
        'Không động đậy, và đặt tay lên vai người kể',
        'Chỉ tay về phía rừng cho người kể nhìn theo',
        'Bật cười vì người kể hét lên quá to',
        'Dừng lại ở tảng đá phẳng để nghỉ năm phút',
      ],
      answer: 0,
      dan: 'My grandfather did not move at all, and he put his hand on my shoulder so that I would not move either.',
    },
    {
      q: 'Người kể đếm được bao nhiêu con ong trên một bông hoa?',
      options: [
        'Mười một con',
        'Năm con',
        'Mười con',
        'Hai mươi con',
      ],
      answer: 0,
      dan: 'On the way down we passed a dead tree covered in insects, and I counted eleven bees on one flower.',
    },
    {
      q: 'Ông nói gì khi người kể hét lên vì con ếch?',
      options: [
        'Con ếch sợ người kể còn hơn người kể sợ nó',
        'Ngọn núi dạy nhiều hơn bất cứ quyển sách nào',
        'Con chim xám trong hồ năm nào cũng là con đó',
        'Trời sắp mưa to nên phải xuống núi ngay',
      ],
      answer: 0,
      dan: 'He told me the frog was more afraid of me than I was of it.',
    },
  ],
  'nature-animals-beginner': [
    {
      q: 'Vì sao cô giáo đếm cả lớp bốn lần trên đường?',
      options: [
        'Vì cô sợ mất một đứa nào đó',
        'Vì xe buýt phải dừng lại bốn lần',
        'Vì có tám đứa lần đầu được thấy biển',
        'Vì cô muốn chia lớp thành bốn nhóm',
      ],
      answer: 0,
      dan: 'Our teacher counted us four times on the way, because she was afraid of losing someone.',
    },
    {
      q: 'Sau khi tìm thấy con cua dưới hòn đá, cả lớp làm gì?',
      options: [
        'Đặt hòn đá lại đúng như cũ',
        'Mang con cua về cho cô giáo xem',
        'Thả con cua xuống nước rồi đi tiếp',
        'Lấy hòn đá đó mang về làm quà',
      ],
      answer: 0,
      dan: 'In the afternoon we found a small crab under a stone, and we put the stone back exactly as it was.',
    },
    {
      q: 'Vì sao buổi tối không ai bơi được?',
      options: [
        'Vì gió mạnh lên và biển động',
        'Vì trời đã tối hẳn và đầy sao',
        'Vì cô giáo thổi còi gọi cả lớp về',
        'Vì trời mưa suốt cả buổi tối đó',
      ],
      answer: 0,
      dan: 'That evening the wind grew strong, and the sea became too rough for anyone to swim.',
    },
    {
      q: 'Theo cô giáo, vì sao cả lớp không thấy con vật hoang dã nào?',
      options: [
        'Vì các con vật đã thấy cả lớp từ lâu trước khi lớp tới',
        'Vì trời mưa nên các con vật đều trú trong hang',
        'Vì khu rừng phía sau bãi biển vốn không có con vật nào',
        'Vì cả lớp đi quá nhanh nên không kịp nhìn thấy',
      ],
      answer: 0,
      dan: 'The teacher said we were lucky, because the animals had seen us long before we arrived.',
    },
  ],
  'human-body-beginner': [
    {
      q: 'Luật duy nhất thầy đưa ra trong ngày đầu là gì?',
      options: [
        'Thở ra dưới nước, không bao giờ thở vào',
        'Bám vào thành bể bằng cả hai tay',
        'Đạp chân chầm chậm và đừng dùng tay',
        'Không bao giờ cười một người mới học',
      ],
      answer: 0,
      dan: 'On the first day he said the only rule was to breathe out under the water, never in.',
    },
    {
      q: 'Người kể bơi được lần đầu trong hoàn cảnh nào?',
      options: [
        'Thầy rút tay đỡ bụng ra mà người kể không nhận ra',
        'Người kể tự bỏ tay khỏi thành bể ở buổi thứ ba',
        'Sau một tháng bơi hết chiều dài bể hai lượt',
        'Sau khi thầy bảo dùng tay ít và dùng chân nhiều hơn',
      ],
      answer: 0,
      dan: 'When he took his hand away I did not notice for several seconds, and by then I was swimming.',
    },
    {
      q: 'Theo thầy, vì sao hai cánh tay người kể bị yếu?',
      options: [
        'Vì dùng tay quá nhiều và dùng chân quá ít',
        'Vì nhấc cặp sách bằng vai phải quá nặng',
        'Vì đạp phải thành bể trong tuần thứ hai',
        'Vì uống quá nhiều nước ở buổi học đầu',
      ],
      answer: 0,
      dan: 'He said that meant I was using my arms too much and my legs too little.',
    },
    {
      q: 'Vì sao đầu gối người kể vẫn đau vào ngày lạnh?',
      options: [
        'Vì tuần thứ hai đạp phải thành bể',
        'Vì bơi hai lượt bể mà không dừng nghỉ',
        'Vì đạp chân quá chậm trong buổi thứ tư',
        'Vì bám thành bể bằng hai tay suốt ba buổi',
      ],
      answer: 0,
      dan: 'My knees still hurt on cold days, because I kicked the wall by mistake in the second week.',
    },
  ],
  'colors-shapes-beginner-p3': [
    {
      q: 'Bài tập cô dạy vẽ đưa ra là gì?',
      options: [
        'Vẽ chính phòng mình theo trí nhớ, không kẻ bút chì',
        'Vẽ phòng mình sau khi đo tất cả các món đồ trong đó',
        'Vẽ hai bức về cùng một phòng rồi so sánh',
        'Vẽ một hình chữ nhật và một hình vuông',
      ],
      answer: 0,
      dan: 'Our art teacher gave the class one strange task: paint your own room from memory, with no pencil lines.',
    },
    {
      q: 'Hai chị em vẽ cái cửa sổ khác nhau thế nào?',
      options: [
        'Người kể vẽ hình chữ nhật rộng, em vẽ gần như hình vuông',
        'Người kể vẽ gần như hình vuông, em vẽ hình chữ nhật rộng',
        'Người kể vẽ cửa sổ tròn, em vẽ cửa sổ chữ nhật',
        'Cả hai vẽ giống nhau, chỉ khác màu của khung',
      ],
      answer: 0,
      dan: 'In my picture the window is a wide rectangle, but in my sister\'s it is almost square.',
    },
    {
      q: 'Chi tiết nào chỉ em gái nhớ mà người kể quên hẳn?',
      options: [
        'Một trái tim đỏ nhỏ em vẽ lên tường lúc sáu tuổi',
        'Một đường kẻ đen mảnh chạy dọc theo sàn nhà gỗ',
        'Cái đồng hồ tròn màu trắng phía trên cửa',
        'Cái màn cửa có hai mặt hai màu khác nhau',
      ],
      answer: 0,
      dan: 'She remembered a small red heart she had drawn on the wall when she was six; I had forgotten it completely.',
    },
    {
      q: 'Cuối cùng hóa ra cái màn cửa như thế nào?',
      options: [
        'Một mặt xanh lá, mặt kia xanh dương',
        'Xanh lá hết, nên em gái đã đúng',
        'Xanh dương hết, nên người kể đã đúng',
        'Đã được đổi màu từ hồi em sáu tuổi',
      ],
      answer: 0,
      dan: 'The curtain, we found out, is green on one side and blue on the other.',
    },
  ],
  'school-life-100': [
    {
      q: 'Cô giáo xử lý việc quên bài tập hôm thứ Ba thế nào?',
      options: [
        'Viết lời nhắn vào vở và nhờ mẹ ký vào đó',
        'Cho làm lại bài tập đó vào hôm thứ Sáu',
        'Bắt đọc chung sách với bạn cùng lớp',
        'Không nói gì và bỏ qua chuyện đó luôn',
      ],
      answer: 0,
      dan: 'My teacher did not shout; she wrote a note in my notebook and asked my mother to sign it.',
    },
    {
      q: 'Vì sao người kể học sai môn cho bài kiểm tra thứ Năm?',
      options: [
        'Vì đọc sai tuần trên tờ lịch',
        'Vì quên mất giờ thi là tám giờ',
        'Vì để quên sách giáo khoa ở nhà',
        'Vì mất cái thước và cái tẩy hôm thứ Tư',
      ],
      answer: 0,
      dan: 'I had studied for the science test instead, because I read the wrong week on the calendar.',
    },
    {
      q: 'Người kể trả lời được bao nhiêu câu trong bài kiểm tra đó?',
      options: [
        'Chín trong hai mươi câu',
        'Mười trong hai mươi câu',
        'Chín trong mười câu',
        'Hai mươi trong hai mươi câu',
      ],
      answer: 0,
      dan: 'I answered only nine of the twenty questions, and my score was the lowest in the class.',
    },
    {
      q: 'Lời khuyên cô giáo cho người kể là gì?',
      options: [
        'Viết mọi thứ ra giấy, đừng để trong đầu',
        'Xem lại sổ hai lần mỗi ngày cho chắc',
        'Đừng bao giờ để quên sách ở nhà nữa',
        'Học trước cho cả hai môn để khỏi sai',
      ],
      answer: 0,
      dan: 'She also gave me one piece of advice: write everything on paper, never in your head.',
    },
  ],
};

export default STORY_QUIZ_A1;
