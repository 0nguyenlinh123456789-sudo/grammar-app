// Bulk inject exercises into grammarDataB1.js for topics b1_08 through b1_25
const fs = require('fs');

const allExercises = {
  "b1_08": {
    fillBlanks: [
      { q: "I need _____ umbrella because it's raining.", a: "an", trans: "Tôi cần một cái ô vì trời đang mưa." },
      { q: "_____ sun rises in the east.", a: "The", trans: "Mặt trời mọc ở phía đông." },
      { q: "She is _____ honest person.", a: "an", trans: "Cô ấy là người trung thực." },
      { q: "I want to buy _____ new phone.", a: "a", trans: "Tôi muốn mua một chiếc điện thoại mới." },
      { q: "_____ children are playing in the park.", a: "The", trans: "Những đứa trẻ đang chơi trong công viên." },
      { q: "He is _____ best student in our class.", a: "the", trans: "Anh ấy là học sinh giỏi nhất lớp." },
      { q: "She plays _____ piano very well.", a: "the", trans: "Cô ấy chơi piano rất giỏi." },
      { q: "I had _____ egg for breakfast.", a: "an", trans: "Tôi ăn một quả trứng cho bữa sáng." }
    ],
    errorCorrection: [
      { sentence: "She is a honest woman.", errorWord: "a", correction: "an", explanation: "'Honest' phát âm bắt đầu bằng nguyên âm → dùng 'an'.", trans: "Cô ấy là người trung thực." },
      { sentence: "The water is important for life.", errorWord: "The", correction: "(bỏ 'The')", explanation: "Nói chung về nước → không dùng mạo từ.", trans: "Nước quan trọng cho cuộc sống." },
      { sentence: "He plays a guitar every evening.", errorWord: "a", correction: "the", explanation: "Nhạc cụ luôn dùng 'the': play the guitar.", trans: "Anh ấy chơi guitar mỗi tối." },
      { sentence: "I need a umbrella.", errorWord: "a", correction: "an", explanation: "'Umbrella' bắt đầu bằng nguyên âm → dùng 'an'.", trans: "Tôi cần một cái ô." },
      { sentence: "Sun rises in the east.", errorWord: "(thiếu)", correction: "The sun", explanation: "Mặt trời là duy nhất → phải dùng 'The sun'.", trans: "Mặt trời mọc ở phía đông." },
      { sentence: "I saw the cat in a street.", errorWord: "a", correction: "the", explanation: "Nói về con đường cụ thể → dùng 'the'.", trans: "Tôi thấy con mèo trên đường." }
    ],
    transformation: [
      { original: "He is best player on the team.", instruction: "Thêm mạo từ đúng.", keyword: "the", a: "He is the best player on the team." },
      { original: "I want apple.", instruction: "Thêm mạo từ đúng.", keyword: "an", a: "I want an apple." },
      { original: "She has a dog.", instruction: "Nói về con chó cụ thể.", keyword: "the", a: "She has the dog." },
      { original: "I bought a book yesterday.", instruction: "Nói về cuốn sách cụ thể.", keyword: "the", a: "I bought the book yesterday." }
    ],
    matching: [{ pairs: [
      { left: "I need _____ umbrella.", right: "an" },
      { left: "_____ sun is shining.", right: "The" },
      { left: "She is _____ doctor.", right: "a" },
      { left: "He plays _____ piano.", right: "the" },
      { left: "I had _____ egg.", right: "an" },
      { left: "He is _____ best student.", right: "the" }
    ]}],
    trueFalse: [
      { sentence: "She is a honest person.", isCorrect: false, correction: "She is an honest person.", explanation: "'Honest' phát âm nguyên âm → dùng 'an'.", trans: "Cô ấy là người trung thực." },
      { sentence: "The sun rises in the east.", isCorrect: true, explanation: "Đúng - mặt trời duy nhất → dùng 'the'.", trans: "Mặt trời mọc ở phía đông." },
      { sentence: "I want to buy a new laptop.", isCorrect: true, explanation: "Đúng - laptop bất kỳ → 'a'.", trans: "Tôi muốn mua một laptop mới." },
      { sentence: "He is the best student in class.", isCorrect: true, explanation: "Đúng - so sánh nhất → 'the'.", trans: "Anh ấy là học sinh giỏi nhất lớp." },
      { sentence: "Water is important for the life.", isCorrect: false, correction: "Water is important for life.", explanation: "Nói chung → không dùng 'the'.", trans: "Nước quan trọng cho cuộc sống." },
      { sentence: "She plays the violin beautifully.", isCorrect: true, explanation: "Đúng - nhạc cụ → 'the'.", trans: "Cô ấy chơi violin hay." }
    ]
  },
  "b1_09": {
    fillBlanks: [
      { q: "How _____ water do you drink every day?", a: "much", trans: "Bạn uống bao nhiêu nước mỗi ngày?" },
      { q: "There are many _____ in the garden.", a: "flowers", trans: "Có nhiều hoa trong vườn." },
      { q: "She gave me some good _____.", a: "advice", trans: "Cô ấy cho tôi lời khuyên tốt." },
      { q: "How _____ eggs do we need?", a: "many", trans: "Chúng ta cần bao nhiêu trứng?" },
      { q: "There is a lot of _____ on the roads.", a: "traffic", trans: "Có nhiều xe trên đường." },
      { q: "I need two _____ of bread.", a: "pieces", trans: "Tôi cần hai miếng bánh mì." },
      { q: "I don't have _____ money left.", a: "much", trans: "Tôi không còn nhiều tiền." },
      { q: "Can I have some _____?", a: "information", trans: "Tôi xin thông tin được không?" }
    ],
    errorCorrection: [
      { sentence: "I need some informations.", errorWord: "informations", correction: "information", explanation: "'Information' không đếm được, không thêm -s.", trans: "Tôi cần thông tin." },
      { sentence: "She has many money.", errorWord: "many", correction: "much/a lot of", explanation: "'Money' không đếm được → 'much'.", trans: "Cô ấy có nhiều tiền." },
      { sentence: "How much chairs are there?", errorWord: "much", correction: "many", explanation: "'Chairs' đếm được → 'How many'.", trans: "Có bao nhiêu ghế?" },
      { sentence: "He gave me a good advice.", errorWord: "a", correction: "(bỏ 'a')", explanation: "'Advice' không đếm được → 'some advice'.", trans: "Anh ấy cho tôi lời khuyên." },
      { sentence: "There are much students.", errorWord: "much", correction: "many", explanation: "'Students' đếm được → 'many'.", trans: "Có nhiều học sinh." },
      { sentence: "I bought three furnitures.", errorWord: "furnitures", correction: "pieces of furniture", explanation: "'Furniture' không đếm được.", trans: "Tôi mua ba món đồ." }
    ],
    transformation: [
      { original: "There are many books.", instruction: "Thay 'many' bằng 'a lot of'.", keyword: "a lot of", a: "There are a lot of books." },
      { original: "How much water do you need?", instruction: "Đổi sang 'bottles'.", keyword: "many", a: "How many bottles of water do you need?" },
      { original: "There is some milk.", instruction: "Chuyển phủ định.", keyword: "isn't any", a: "There isn't any milk." },
      { original: "She doesn't have much time.", instruction: "Chuyển khẳng định.", keyword: "a lot of", a: "She has a lot of time." }
    ],
    matching: [{ pairs: [
      { left: "How _____ water?", right: "much" },
      { left: "How _____ students?", right: "many" },
      { left: "I need some _____.", right: "information" },
      { left: "There are many _____.", right: "people" },
      { left: "She has a lot of _____.", right: "money" },
      { left: "Two _____ of bread.", right: "pieces" }
    ]}],
    trueFalse: [
      { sentence: "I need some informations.", isCorrect: false, correction: "I need some information.", explanation: "'Information' không đếm được.", trans: "Tôi cần thông tin." },
      { sentence: "How much sugar do you want?", isCorrect: true, explanation: "Đúng - 'sugar' không đếm được → 'how much'.", trans: "Bạn muốn bao nhiêu đường?" },
      { sentence: "There are many children.", isCorrect: true, explanation: "Đúng - 'children' đếm được → 'many'.", trans: "Có nhiều trẻ em." },
      { sentence: "She gave me a good advice.", isCorrect: false, correction: "She gave me good advice.", explanation: "'Advice' không đếm được.", trans: "Cô ấy cho tôi lời khuyên." },
      { sentence: "We don't have much time.", isCorrect: true, explanation: "Đúng - 'time' không đếm được.", trans: "Chúng tôi ít thời gian." },
      { sentence: "How many furniture?", isCorrect: false, correction: "How much furniture?", explanation: "'Furniture' không đếm được.", trans: "Bao nhiêu đồ nội thất?" }
    ]
  },
  "b1_10": {
    fillBlanks: [
      { q: "There is _____ milk in the fridge.", a: "some", trans: "Có sữa trong tủ lạnh." },
      { q: "Is there _____ bread left?", a: "any", trans: "Còn bánh mì không?" },
      { q: "We need _____ sugar for the cake.", a: "some", trans: "Cần đường cho bánh." },
      { q: "There aren't _____ eggs in the box.", a: "any", trans: "Không có trứng trong hộp." },
      { q: "I have _____ of homework.", a: "a lot", trans: "Tôi có nhiều bài tập." },
      { q: "How _____ coffee do you drink?", a: "much", trans: "Bạn uống bao nhiêu cà phê?" },
      { q: "There are _____ books on the shelf.", a: "many", trans: "Có nhiều sách trên kệ." },
      { q: "She doesn't have _____ friends here.", a: "many", trans: "Cô ấy ít bạn ở đây." }
    ],
    errorCorrection: [
      { sentence: "I don't have some money.", errorWord: "some", correction: "any", explanation: "Phủ định dùng 'any'.", trans: "Tôi không có tiền." },
      { sentence: "She has much friends.", errorWord: "much", correction: "many", explanation: "'Friends' đếm được → 'many'.", trans: "Cô ấy có nhiều bạn." },
      { sentence: "There is a lot of students.", errorWord: "is", correction: "are", explanation: "'Students' số nhiều → 'There are'.", trans: "Có nhiều học sinh." },
      { sentence: "How many water do you need?", errorWord: "many", correction: "much", explanation: "'Water' không đếm được → 'much'.", trans: "Bạn cần bao nhiêu nước?" },
      { sentence: "Can I have any sugar?", errorWord: "any", correction: "some", explanation: "Yêu cầu lịch sự → dùng 'some'.", trans: "Cho tôi đường được không?" },
      { sentence: "Is there some milk? (câu hỏi)", errorWord: "some", correction: "any", explanation: "Câu hỏi dùng 'any'.", trans: "Có sữa không?" }
    ],
    transformation: [
      { original: "There is some water.", instruction: "Chuyển phủ định.", keyword: "isn't any", a: "There isn't any water." },
      { original: "She has many books.", instruction: "Dùng 'a lot of'.", keyword: "a lot of", a: "She has a lot of books." },
      { original: "Is there any milk?", instruction: "Chuyển khẳng định.", keyword: "some", a: "There is some milk." },
      { original: "I don't have any money.", instruction: "Chuyển khẳng định.", keyword: "some", a: "I have some money." }
    ],
    matching: [{ pairs: [
      { left: "There is _____ milk.", right: "some" },
      { left: "Is there _____ bread?", right: "any" },
      { left: "She has _____ of homework.", right: "a lot" },
      { left: "How _____ sugar?", right: "much" },
      { left: "There aren't _____ eggs.", right: "any" },
      { left: "How _____ students?", right: "many" }
    ]}],
    trueFalse: [
      { sentence: "There is some milk.", isCorrect: true, explanation: "Đúng - khẳng định dùng 'some'.", trans: "Có sữa." },
      { sentence: "I don't have some money.", isCorrect: false, correction: "I don't have any money.", explanation: "Phủ định dùng 'any'.", trans: "Tôi không có tiền." },
      { sentence: "Can I have some water?", isCorrect: true, explanation: "Đúng - yêu cầu lịch sự dùng 'some'.", trans: "Cho nước được không?" },
      { sentence: "How much apples?", isCorrect: false, correction: "How many apples?", explanation: "'Apples' đếm được → 'many'.", trans: "Bao nhiêu táo?" },
      { sentence: "There are a lot of people.", isCorrect: true, explanation: "Đúng - 'a lot of' dùng cho cả hai loại.", trans: "Có nhiều người." },
      { sentence: "She doesn't have many time.", isCorrect: false, correction: "She doesn't have much time.", explanation: "'Time' không đếm được → 'much'.", trans: "Cô ấy ít thời gian." }
    ]
  },
  "b1_11": {
    fillBlanks: [
      { q: "I was born _____ 1990.", a: "in", trans: "Tôi sinh năm 1990." },
      { q: "We have a meeting _____ Monday.", a: "on", trans: "Họp vào thứ Hai." },
      { q: "She wakes up _____ 6 o'clock.", a: "at", trans: "Cô ấy dậy lúc 6 giờ." },
      { q: "It is cold _____ winter.", a: "in", trans: "Trời lạnh vào mùa đông." },
      { q: "The concert starts _____ 8 PM.", a: "at", trans: "Hòa nhạc bắt đầu lúc 8 tối." },
      { q: "My birthday is _____ March 15th.", a: "on", trans: "Sinh nhật tôi ngày 15/3." },
      { q: "I exercise _____ the morning.", a: "in", trans: "Tôi tập buổi sáng." },
      { q: "We go on holiday _____ August.", a: "in", trans: "Nghỉ mát tháng 8." }
    ],
    errorCorrection: [
      { sentence: "I was born in March 15th.", errorWord: "in", correction: "on", explanation: "Ngày cụ thể dùng 'on'.", trans: "Tôi sinh ngày 15/3." },
      { sentence: "She wakes up in 6 o'clock.", errorWord: "in", correction: "at", explanation: "Giờ dùng 'at'.", trans: "Cô ấy dậy lúc 6 giờ." },
      { sentence: "We have a meeting at Monday.", errorWord: "at", correction: "on", explanation: "Ngày trong tuần dùng 'on'.", trans: "Họp vào thứ Hai." },
      { sentence: "It snows a lot on winter.", errorWord: "on", correction: "in", explanation: "Mùa dùng 'in'.", trans: "Tuyết rơi nhiều mùa đông." },
      { sentence: "The shop opens on 9 AM.", errorWord: "on", correction: "at", explanation: "Giờ dùng 'at'.", trans: "Cửa hàng mở lúc 9 giờ." },
      { sentence: "I like reading at the evening.", errorWord: "at", correction: "in", explanation: "Buổi trong ngày dùng 'in'.", trans: "Tôi thích đọc buổi tối." }
    ],
    transformation: [
      { original: "The meeting is at 3 PM.", instruction: "Thêm ngày: on Friday.", keyword: "on Friday at", a: "The meeting is on Friday at 3 PM." },
      { original: "I was born in 1990.", instruction: "Thêm tháng.", keyword: "in July", a: "I was born in July 1990." },
      { original: "She exercises every morning.", instruction: "Dùng giới từ thời gian.", keyword: "in", a: "She exercises in the morning." },
      { original: "We go to church on Sunday.", instruction: "Thêm giờ.", keyword: "at", a: "We go to church on Sunday at 10 AM." }
    ],
    matching: [{ pairs: [
      { left: "I wake up _____ 7 AM.", right: "at" },
      { left: "She was born _____ 1995.", right: "in" },
      { left: "Class is _____ Wednesday.", right: "on" },
      { left: "It's cold _____ winter.", right: "in" },
      { left: "The party is _____ Saturday.", right: "on" },
      { left: "I study _____ the evening.", right: "in" }
    ]}],
    trueFalse: [
      { sentence: "I was born in 1990.", isCorrect: true, explanation: "Đúng - năm dùng 'in'.", trans: "Sinh năm 1990." },
      { sentence: "She wakes up in 7 o'clock.", isCorrect: false, correction: "at 7 o'clock.", explanation: "Giờ dùng 'at'.", trans: "Dậy lúc 7 giờ." },
      { sentence: "The concert is on Friday.", isCorrect: true, explanation: "Đúng - ngày dùng 'on'.", trans: "Hòa nhạc thứ Sáu." },
      { sentence: "We go swimming on summer.", isCorrect: false, correction: "in summer.", explanation: "Mùa dùng 'in'.", trans: "Bơi vào mùa hè." },
      { sentence: "My birthday is on April 5th.", isCorrect: true, explanation: "Đúng - ngày cụ thể dùng 'on'.", trans: "Sinh nhật 5/4." },
      { sentence: "The shop closes at midnight.", isCorrect: true, explanation: "Đúng - 'midnight' dùng 'at'.", trans: "Đóng cửa nửa đêm." }
    ]
  },
  "b1_12": {
    fillBlanks: [
      { q: "The cat is _____ the table.", a: "on", trans: "Con mèo ở trên bàn." },
      { q: "She lives _____ Tokyo.", a: "in", trans: "Cô ấy sống ở Tokyo." },
      { q: "I'll meet you _____ the bus stop.", a: "at", trans: "Tôi gặp bạn ở trạm xe buýt." },
      { q: "The picture is _____ the wall.", a: "on", trans: "Bức tranh trên tường." },
      { q: "He is sitting _____ the chair.", a: "on", trans: "Anh ấy ngồi trên ghế." },
      { q: "She works _____ a hospital.", a: "in", trans: "Cô ấy làm ở bệnh viện." },
      { q: "We arrived _____ the airport early.", a: "at", trans: "Chúng tôi đến sân bay sớm." },
      { q: "The keys are _____ my bag.", a: "in", trans: "Chìa khóa ở trong túi." }
    ],
    errorCorrection: [
      { sentence: "She lives at Tokyo.", errorWord: "at", correction: "in", explanation: "Thành phố dùng 'in'.", trans: "Cô ấy sống ở Tokyo." },
      { sentence: "The cat is in the table.", errorWord: "in", correction: "on", explanation: "Trên bề mặt dùng 'on'.", trans: "Con mèo trên bàn." },
      { sentence: "I'll meet you in the bus stop.", errorWord: "in", correction: "at", explanation: "Điểm cụ thể dùng 'at'.", trans: "Gặp ở trạm xe buýt." },
      { sentence: "The picture is in the wall.", errorWord: "in", correction: "on", explanation: "Trên bề mặt tường dùng 'on'.", trans: "Bức tranh trên tường." },
      { sentence: "He works at a big company.", errorWord: "at", correction: "in/for", explanation: "Làm trong công ty dùng 'in' hoặc 'for'.", trans: "Anh ấy làm ở công ty lớn." },
      { sentence: "We arrived in the airport.", errorWord: "in", correction: "at", explanation: "Đến sân bay dùng 'at'.", trans: "Đến sân bay." }
    ],
    transformation: [
      { original: "The book is on the shelf.", instruction: "Đổi vị trí sang 'in the bag'.", keyword: "in", a: "The book is in the bag." },
      { original: "She works in a hospital.", instruction: "Đổi nơi làm sang 'at home'.", keyword: "at", a: "She works at home." },
      { original: "I live in Vietnam.", instruction: "Cụ thể thành phố.", keyword: "in", a: "I live in Ho Chi Minh City." },
      { original: "We met at the park.", instruction: "Dùng 'in' cho không gian rộng.", keyword: "in", a: "We met in the park." }
    ],
    matching: [{ pairs: [
      { left: "She lives _____ Tokyo.", right: "in" },
      { left: "The cat is _____ the table.", right: "on" },
      { left: "Meet me _____ the bus stop.", right: "at" },
      { left: "The keys are _____ my bag.", right: "in" },
      { left: "The picture is _____ the wall.", right: "on" },
      { left: "We arrived _____ the airport.", right: "at" }
    ]}],
    trueFalse: [
      { sentence: "She lives in Tokyo.", isCorrect: true, explanation: "Đúng - thành phố dùng 'in'.", trans: "Sống ở Tokyo." },
      { sentence: "The cat is in the table.", isCorrect: false, correction: "on the table.", explanation: "Trên bề mặt → 'on'.", trans: "Mèo trên bàn." },
      { sentence: "I'll meet you at the station.", isCorrect: true, explanation: "Đúng - điểm cụ thể dùng 'at'.", trans: "Gặp ở ga." },
      { sentence: "The picture is on the wall.", isCorrect: true, explanation: "Đúng - bề mặt dùng 'on'.", trans: "Tranh trên tường." },
      { sentence: "She lives at Vietnam.", isCorrect: false, correction: "in Vietnam.", explanation: "Quốc gia dùng 'in'.", trans: "Sống ở Việt Nam." },
      { sentence: "The keys are in my pocket.", isCorrect: true, explanation: "Đúng - bên trong dùng 'in'.", trans: "Chìa khóa trong túi." }
    ]
  },
  "b1_13": {
    fillBlanks: [
      { q: "She sings _____.", a: "beautifully", trans: "Cô ấy hát hay." },
      { q: "He is a _____ runner.", a: "fast", trans: "Anh ấy là người chạy nhanh." },
      { q: "The test was _____ difficult.", a: "extremely", trans: "Bài thi cực kỳ khó." },
      { q: "She speaks English _____.", a: "fluently", trans: "Cô ấy nói tiếng Anh trôi chảy." },
      { q: "He drives very _____.", a: "carefully", trans: "Anh ấy lái xe cẩn thận." },
      { q: "This is a _____ book.", a: "good", trans: "Đây là cuốn sách hay." },
      { q: "She answered the question _____.", a: "correctly", trans: "Cô ấy trả lời đúng." },
      { q: "He is _____ tired today.", a: "really", trans: "Anh ấy thực sự mệt hôm nay." }
    ],
    errorCorrection: [
      { sentence: "She sings beautiful.", errorWord: "beautiful", correction: "beautifully", explanation: "Bổ nghĩa cho động từ → dùng trạng từ.", trans: "Cô ấy hát hay." },
      { sentence: "He runs fastly.", errorWord: "fastly", correction: "fast", explanation: "'Fast' vừa là adj vừa là adv. Không thêm -ly.", trans: "Anh ấy chạy nhanh." },
      { sentence: "She speaks English good.", errorWord: "good", correction: "well", explanation: "Bổ nghĩa cho 'speaks' → dùng 'well'.", trans: "Cô ấy nói tiếng Anh giỏi." },
      { sentence: "He is a carefully driver.", errorWord: "carefully", correction: "careful", explanation: "Đứng trước danh từ → dùng tính từ.", trans: "Anh ấy lái cẩn thận." },
      { sentence: "This food tastes badly.", errorWord: "badly", correction: "bad", explanation: "Sau 'taste' (giác quan) → dùng tính từ.", trans: "Đồ ăn dở." },
      { sentence: "She answered correct.", errorWord: "correct", correction: "correctly", explanation: "Bổ nghĩa cho 'answered' → trạng từ.", trans: "Cô ấy trả lời đúng." }
    ],
    transformation: [
      { original: "She is a careful driver.", instruction: "Viết lại dùng trạng từ.", keyword: "carefully", a: "She drives carefully." },
      { original: "He runs fast.", instruction: "Dùng tính từ.", keyword: "fast", a: "He is a fast runner." },
      { original: "She sings beautifully.", instruction: "Dùng tính từ.", keyword: "beautiful", a: "Her singing is beautiful." },
      { original: "He speaks quietly.", instruction: "Dùng tính từ.", keyword: "quiet", a: "His voice is quiet." }
    ],
    matching: [{ pairs: [
      { left: "She sings _____.", right: "beautifully" },
      { left: "He is a _____ driver.", right: "careful" },
      { left: "She speaks English _____.", right: "well" },
      { left: "This is a _____ book.", right: "good" },
      { left: "He drives _____.", right: "carefully" },
      { left: "He runs _____.", right: "fast" }
    ]}],
    trueFalse: [
      { sentence: "She sings beautiful.", isCorrect: false, correction: "She sings beautifully.", explanation: "Bổ nghĩa động từ → trạng từ.", trans: "Cô ấy hát hay." },
      { sentence: "He runs fast.", isCorrect: true, explanation: "Đúng - 'fast' vừa adj vừa adv.", trans: "Anh ấy chạy nhanh." },
      { sentence: "She speaks English well.", isCorrect: true, explanation: "Đúng - 'well' là trạng từ của 'good'.", trans: "Cô ấy nói tiếng Anh giỏi." },
      { sentence: "He is a carefully driver.", isCorrect: false, correction: "He is a careful driver.", explanation: "Trước danh từ → tính từ.", trans: "Anh ấy lái cẩn thận." },
      { sentence: "This food tastes delicious.", isCorrect: true, explanation: "Đúng - sau 'taste' dùng tính từ.", trans: "Đồ ăn ngon." },
      { sentence: "She answered correct.", isCorrect: false, correction: "She answered correctly.", explanation: "Bổ nghĩa động từ → trạng từ.", trans: "Trả lời đúng." }
    ]
  },
  "b1_14": {
    fillBlanks: [
      { q: "She is _____ than her sister.", a: "taller", trans: "Cô ấy cao hơn chị." },
      { q: "This is the _____ book I've ever read.", a: "best", trans: "Đây là cuốn sách hay nhất." },
      { q: "He runs _____ than me.", a: "faster", trans: "Anh ấy chạy nhanh hơn tôi." },
      { q: "She is the _____ girl in class.", a: "smartest", trans: "Cô ấy thông minh nhất lớp." },
      { q: "This film is _____ interesting than that one.", a: "more", trans: "Phim này thú vị hơn phim kia." },
      { q: "He is as _____ as his brother.", a: "tall", trans: "Anh ấy cao bằng anh trai." },
      { q: "Today is the _____ day of the year.", a: "hottest", trans: "Hôm nay nóng nhất năm." },
      { q: "This exercise is _____ difficult than the last one.", a: "more", trans: "Bài tập này khó hơn bài trước." }
    ],
    errorCorrection: [
      { sentence: "She is more taller than me.", errorWord: "more taller", correction: "taller", explanation: "Adj ngắn: thêm -er. Không dùng 'more' + '-er'.", trans: "Cô ấy cao hơn tôi." },
      { sentence: "He is the more intelligent student.", errorWord: "more", correction: "most", explanation: "So sánh nhất → 'the most intelligent'.", trans: "Anh ấy thông minh nhất." },
      { sentence: "This is the goodest book.", errorWord: "goodest", correction: "best", explanation: "good → better → best (bất quy tắc).", trans: "Đây là cuốn sách hay nhất." },
      { sentence: "She runs more fast than him.", errorWord: "more fast", correction: "faster", explanation: "'Fast' là adj ngắn → 'faster'.", trans: "Cô ấy chạy nhanh hơn." },
      { sentence: "He is the baddest player.", errorWord: "baddest", correction: "worst", explanation: "bad → worse → worst (bất quy tắc).", trans: "Anh ấy chơi tệ nhất." },
      { sentence: "She is beautifuler than her sister.", errorWord: "beautifuler", correction: "more beautiful", explanation: "Adj dài → 'more beautiful'.", trans: "Cô ấy đẹp hơn chị." }
    ],
    transformation: [
      { original: "She is taller than me.", instruction: "Dùng so sánh bằng 'as...as' (phủ định).", keyword: "not as tall as", a: "I am not as tall as her." },
      { original: "This is the best restaurant.", instruction: "Dùng so sánh hơn.", keyword: "better than", a: "This restaurant is better than the others." },
      { original: "He runs faster than me.", instruction: "Dùng so sánh bằng.", keyword: "as fast as", a: "I don't run as fast as him." },
      { original: "She is the most beautiful girl.", instruction: "Dùng so sánh hơn.", keyword: "more beautiful than", a: "She is more beautiful than the other girls." }
    ],
    matching: [{ pairs: [
      { left: "She is _____ than her sister.", right: "taller" },
      { left: "This is the _____ book.", right: "best" },
      { left: "He runs _____ than me.", right: "faster" },
      { left: "This is _____ interesting.", right: "more" },
      { left: "Today is the _____ day.", right: "hottest" },
      { left: "He is as _____ as his brother.", right: "tall" }
    ]}],
    trueFalse: [
      { sentence: "She is more taller than me.", isCorrect: false, correction: "She is taller than me.", explanation: "Không dùng 'more' + '-er'.", trans: "Cô ấy cao hơn." },
      { sentence: "This is the best movie.", isCorrect: true, explanation: "Đúng - good → best.", trans: "Phim hay nhất." },
      { sentence: "He is the most smart student.", isCorrect: false, correction: "He is the smartest student.", explanation: "'Smart' ngắn → 'smartest'.", trans: "Anh ấy thông minh nhất." },
      { sentence: "She runs faster than him.", isCorrect: true, explanation: "Đúng - fast → faster.", trans: "Cô ấy chạy nhanh hơn." },
      { sentence: "This is the goodest answer.", isCorrect: false, correction: "This is the best answer.", explanation: "good → best (bất quy tắc).", trans: "Câu trả lời tốt nhất." },
      { sentence: "He is as tall as his brother.", isCorrect: true, explanation: "Đúng - so sánh bằng: as + adj + as.", trans: "Anh ấy cao bằng anh trai." }
    ]
  },
  "b1_15": {
    fillBlanks: [
      { q: "I _____ swim when I was five.", a: "could", trans: "Tôi biết bơi từ 5 tuổi." },
      { q: "She _____ speak three languages.", a: "can", trans: "Cô ấy nói được ba ngôn ngữ." },
      { q: "He wasn't _____ to come yesterday.", a: "able", trans: "Anh ấy không thể đến hôm qua." },
      { q: "_____ you help me, please?", a: "Can", trans: "Bạn giúp tôi được không?" },
      { q: "I _____ not drive when I was 16.", a: "could", trans: "Tôi không biết lái xe lúc 16." },
      { q: "She will be _____ to finish tomorrow.", a: "able", trans: "Cô ấy sẽ hoàn thành được ngày mai." },
      { q: "_____ I use your phone?", a: "Can", trans: "Tôi dùng điện thoại bạn được không?" },
      { q: "He _____ play the piano very well.", a: "can", trans: "Anh ấy chơi piano rất giỏi." }
    ],
    errorCorrection: [
      { sentence: "She can to swim.", errorWord: "to", correction: "(bỏ 'to')", explanation: "Sau 'can' dùng V nguyên thể, không có 'to'.", trans: "Cô ấy biết bơi." },
      { sentence: "He cans play guitar.", errorWord: "cans", correction: "can", explanation: "'Can' không thay đổi theo ngôi.", trans: "Anh ấy chơi guitar được." },
      { sentence: "I could to speak French.", errorWord: "to", correction: "(bỏ 'to')", explanation: "Sau 'could' không có 'to'.", trans: "Tôi nói được tiếng Pháp." },
      { sentence: "She is can drive.", errorWord: "is", correction: "(bỏ 'is')", explanation: "Không dùng 'is' trước 'can'.", trans: "Cô ấy lái xe được." },
      { sentence: "He wasn't able swim.", errorWord: "(thiếu 'to')", correction: "able to swim", explanation: "'Be able to' + V nguyên thể.", trans: "Anh ấy không bơi được." },
      { sentence: "I can swimming.", errorWord: "swimming", correction: "swim", explanation: "Sau 'can' dùng V nguyên thể.", trans: "Tôi bơi được." }
    ],
    transformation: [
      { original: "She can swim.", instruction: "Dùng 'be able to'.", keyword: "able to", a: "She is able to swim." },
      { original: "He could play piano.", instruction: "Dùng 'was able to'.", keyword: "was able to", a: "He was able to play piano." },
      { original: "I can't drive.", instruction: "Dùng 'not able to'.", keyword: "not able to", a: "I am not able to drive." },
      { original: "She is able to cook.", instruction: "Dùng 'can'.", keyword: "can", a: "She can cook." }
    ],
    matching: [{ pairs: [
      { left: "She _____ swim.", right: "can" },
      { left: "I _____ swim when I was 5.", right: "could" },
      { left: "He is _____ to drive.", right: "able" },
      { left: "_____ you help me?", right: "Can" },
      { left: "He wasn't _____ to come.", right: "able" },
      { left: "She _____ speak French.", right: "can" }
    ]}],
    trueFalse: [
      { sentence: "She can to swim.", isCorrect: false, correction: "She can swim.", explanation: "Sau 'can' không dùng 'to'.", trans: "Cô ấy bơi được." },
      { sentence: "I could swim when I was five.", isCorrect: true, explanation: "Đúng - khả năng quá khứ dùng 'could'.", trans: "Tôi bơi được lúc 5 tuổi." },
      { sentence: "He cans play guitar.", isCorrect: false, correction: "He can play guitar.", explanation: "'Can' không thêm -s.", trans: "Anh ấy chơi guitar được." },
      { sentence: "She is able to drive.", isCorrect: true, explanation: "Đúng - 'be able to' + V nguyên thể.", trans: "Cô ấy lái xe được." },
      { sentence: "I can swimming.", isCorrect: false, correction: "I can swim.", explanation: "Sau 'can' dùng V nguyên thể.", trans: "Tôi bơi được." },
      { sentence: "Can you help me?", isCorrect: true, explanation: "Đúng - câu hỏi với 'can'.", trans: "Bạn giúp tôi được không?" }
    ]
  },
  "b1_16": {
    fillBlanks: [
      { q: "You _____ wear a seatbelt in the car.", a: "must", trans: "Bạn phải thắt dây an toàn." },
      { q: "She _____ to work on Saturdays.", a: "has", trans: "Cô ấy phải làm thứ Bảy." },
      { q: "You _____ study harder for the exam.", a: "should", trans: "Bạn nên học chăm hơn." },
      { q: "He _____ to go to the dentist.", a: "has", trans: "Anh ấy phải đi nha sĩ." },
      { q: "You _____ not touch that wire!", a: "must", trans: "Không được chạm dây điện!" },
      { q: "We _____ be quiet in the library.", a: "should", trans: "Chúng ta nên im lặng ở thư viện." },
      { q: "She doesn't _____ to wear a uniform.", a: "have", trans: "Cô ấy không phải mặc đồng phục." },
      { q: "You _____ eat more vegetables.", a: "should", trans: "Bạn nên ăn nhiều rau hơn." }
    ],
    errorCorrection: [
      { sentence: "You must to wear a helmet.", errorWord: "to", correction: "(bỏ 'to')", explanation: "Sau 'must' dùng V nguyên thể, không 'to'.", trans: "Phải đội mũ bảo hiểm." },
      { sentence: "She musts study hard.", errorWord: "musts", correction: "must", explanation: "'Must' không thay đổi theo ngôi.", trans: "Cô ấy phải học chăm." },
      { sentence: "He have to go now.", errorWord: "have", correction: "has", explanation: "He → 'has to'.", trans: "Anh ấy phải đi." },
      { sentence: "You should to rest more.", errorWord: "to", correction: "(bỏ 'to')", explanation: "Sau 'should' không dùng 'to'.", trans: "Bạn nên nghỉ ngơi." },
      { sentence: "She don't have to work today.", errorWord: "don't", correction: "doesn't", explanation: "She → 'doesn't have to'.", trans: "Cô ấy không phải làm hôm nay." },
      { sentence: "You must not to smoke here.", errorWord: "to", correction: "(bỏ 'to')", explanation: "Sau 'must not' không dùng 'to'.", trans: "Cấm hút thuốc ở đây." }
    ],
    transformation: [
      { original: "You must wear a helmet.", instruction: "Dùng 'have to'.", keyword: "have to", a: "You have to wear a helmet." },
      { original: "She has to work today.", instruction: "Chuyển phủ định.", keyword: "doesn't have to", a: "She doesn't have to work today." },
      { original: "You should study harder.", instruction: "Chuyển phủ định.", keyword: "shouldn't", a: "You shouldn't study harder." },
      { original: "You must not smoke here.", instruction: "Dùng 'not allowed to'.", keyword: "not allowed to", a: "You are not allowed to smoke here." }
    ],
    matching: [{ pairs: [
      { left: "You _____ wear a seatbelt.", right: "must" },
      { left: "She _____ to work today.", right: "has" },
      { left: "You _____ study harder.", right: "should" },
      { left: "You _____ not smoke here.", right: "must" },
      { left: "She doesn't _____ to come.", right: "have" },
      { left: "You _____ eat more vegetables.", right: "should" }
    ]}],
    trueFalse: [
      { sentence: "You must to wear a helmet.", isCorrect: false, correction: "You must wear a helmet.", explanation: "Sau 'must' không dùng 'to'.", trans: "Phải đội mũ." },
      { sentence: "She has to work on Saturday.", isCorrect: true, explanation: "Đúng - 'has to' cho ngôi 3.", trans: "Cô ấy phải làm thứ Bảy." },
      { sentence: "You should eat more vegetables.", isCorrect: true, explanation: "Đúng - lời khuyên dùng 'should'.", trans: "Nên ăn nhiều rau." },
      { sentence: "He musts go now.", isCorrect: false, correction: "He must go now.", explanation: "'Must' không thêm -s.", trans: "Anh ấy phải đi." },
      { sentence: "You must not smoke here.", isCorrect: true, explanation: "Đúng - cấm dùng 'must not'.", trans: "Cấm hút thuốc." },
      { sentence: "She don't have to come.", isCorrect: false, correction: "She doesn't have to come.", explanation: "She → 'doesn't'.", trans: "Cô ấy không cần đến." }
    ]
  },
  "b1_17": {
    fillBlanks: [
      { q: "There _____ a book on the table.", a: "is", trans: "Có một cuốn sách trên bàn." },
      { q: "_____ there any milk in the fridge?", a: "Is", trans: "Có sữa trong tủ lạnh không?" },
      { q: "There _____ many students in the class.", a: "are", trans: "Có nhiều học sinh trong lớp." },
      { q: "There _____ a lot of traffic today.", a: "is", trans: "Hôm nay nhiều xe." },
      { q: "_____ there a bank near here?", a: "Is", trans: "Có ngân hàng gần đây không?" },
      { q: "There _____ some water in the bottle.", a: "is", trans: "Có nước trong chai." },
      { q: "There _____ three cats in the garden.", a: "are", trans: "Có ba con mèo trong vườn." },
      { q: "There _____ no sugar left.", a: "is", trans: "Hết đường rồi." }
    ],
    errorCorrection: [
      { sentence: "There is many students.", errorWord: "is", correction: "are", explanation: "'Students' số nhiều → 'There are'.", trans: "Có nhiều học sinh." },
      { sentence: "There are a book on the table.", errorWord: "are", correction: "is", explanation: "'A book' số ít → 'There is'.", trans: "Có một cuốn sách trên bàn." },
      { sentence: "Is there any students?", errorWord: "Is", correction: "Are", explanation: "'Students' số nhiều → 'Are there'.", trans: "Có học sinh nào không?" },
      { sentence: "There is three cats.", errorWord: "is", correction: "are", explanation: "'Three cats' số nhiều → 'There are'.", trans: "Có ba con mèo." },
      { sentence: "There are a lot of water.", errorWord: "are", correction: "is", explanation: "'Water' không đếm được → 'There is'.", trans: "Có nhiều nước." },
      { sentence: "It is a bank near here.", errorWord: "It", correction: "There", explanation: "Dùng 'There is' để giới thiệu sự tồn tại.", trans: "Có ngân hàng gần đây." }
    ],
    transformation: [
      { original: "There is a book.", instruction: "Chuyển phủ định.", keyword: "isn't", a: "There isn't a book." },
      { original: "There are some chairs.", instruction: "Chuyển nghi vấn.", keyword: "Are there", a: "Are there any chairs?" },
      { original: "There isn't any milk.", instruction: "Chuyển khẳng định.", keyword: "is some", a: "There is some milk." },
      { original: "Are there any eggs?", instruction: "Trả lời khẳng định.", keyword: "Yes, there are", a: "Yes, there are some eggs." }
    ],
    matching: [{ pairs: [
      { left: "There _____ a book.", right: "is" },
      { left: "There _____ many students.", right: "are" },
      { left: "_____ there any milk?", right: "Is" },
      { left: "There _____ three cats.", right: "are" },
      { left: "There _____ a lot of traffic.", right: "is" },
      { left: "_____ there any chairs?", right: "Are" }
    ]}],
    trueFalse: [
      { sentence: "There is many students.", isCorrect: false, correction: "There are many students.", explanation: "Số nhiều → 'are'.", trans: "Có nhiều học sinh." },
      { sentence: "There is a book on the table.", isCorrect: true, explanation: "Đúng - số ít → 'is'.", trans: "Có sách trên bàn." },
      { sentence: "There are a lot of water.", isCorrect: false, correction: "There is a lot of water.", explanation: "Không đếm được → 'is'.", trans: "Có nhiều nước." },
      { sentence: "Is there a bank near here?", isCorrect: true, explanation: "Đúng - số ít, câu hỏi.", trans: "Có ngân hàng gần đây?" },
      { sentence: "There are some sugar.", isCorrect: false, correction: "There is some sugar.", explanation: "'Sugar' không đếm được → 'is'.", trans: "Có đường." },
      { sentence: "There are three cats.", isCorrect: true, explanation: "Đúng - số nhiều → 'are'.", trans: "Có ba con mèo." }
    ]
  },
  "b1_18": {
    fillBlanks: [
      { q: "I like tea _____ I don't like coffee.", a: "but", trans: "Tôi thích trà nhưng không thích cà phê." },
      { q: "She studied hard _____ she passed the exam.", a: "and", trans: "Cô ấy học chăm và đỗ." },
      { q: "Do you want tea _____ coffee?", a: "or", trans: "Bạn muốn trà hay cà phê?" },
      { q: "He was tired _____ he kept working.", a: "but", trans: "Anh ấy mệt nhưng vẫn làm." },
      { q: "I was hungry, _____ I made a sandwich.", a: "so", trans: "Tôi đói, nên tôi làm bánh." },
      { q: "She can't swim _____ can she ride a bike.", a: "nor", trans: "Cô ấy không bơi được, cũng không đi xe đạp được." },
      { q: "We can go to the beach _____ the park.", a: "or", trans: "Chúng ta có thể đi biển hoặc công viên." },
      { q: "It rained, _____ we stayed home.", a: "so", trans: "Trời mưa, nên chúng tôi ở nhà." }
    ],
    errorCorrection: [
      { sentence: "I like tea and I don't like coffee.", errorWord: "and", correction: "but", explanation: "Hai ý tương phản → dùng 'but'.", trans: "Tôi thích trà nhưng không thích cà phê." },
      { sentence: "She was tired so she went to bed early.", errorWord: "(missing comma)", correction: "tired, so", explanation: "Trước 'so' nối hai mệnh đề cần dấu phẩy.", trans: "Cô ấy mệt nên đi ngủ sớm." },
      { sentence: "He is rich or he is not happy.", errorWord: "or", correction: "but", explanation: "Hai ý tương phản → dùng 'but'.", trans: "Anh ấy giàu nhưng không vui." },
      { sentence: "I like swimming but running.", errorWord: "but", correction: "and", explanation: "Liệt kê sở thích → 'and'.", trans: "Tôi thích bơi và chạy." },
      { sentence: "She can sing or she can dance.", errorWord: "or", correction: "and", explanation: "Nói về hai khả năng cùng có → 'and'.", trans: "Cô ấy hát và nhảy được." },
      { sentence: "It rained, but we stayed home.", errorWord: "but", correction: "so", explanation: "Kết quả của mưa → 'so'.", trans: "Trời mưa, nên ở nhà." }
    ],
    transformation: [
      { original: "She was tired. She went to bed.", instruction: "Nối bằng 'so'.", keyword: "so", a: "She was tired, so she went to bed." },
      { original: "He is rich. He is not happy.", instruction: "Nối bằng 'but'.", keyword: "but", a: "He is rich but he is not happy." },
      { original: "I like tea. I like coffee.", instruction: "Nối bằng 'and'.", keyword: "and", a: "I like tea and coffee." },
      { original: "Do you want tea? Do you want coffee?", instruction: "Nối bằng 'or'.", keyword: "or", a: "Do you want tea or coffee?" }
    ],
    matching: [{ pairs: [
      { left: "I like tea _____ not coffee.", right: "but" },
      { left: "She studied _____ passed.", right: "and" },
      { left: "Tea _____ coffee?", right: "or" },
      { left: "He was tired, _____ he kept working.", right: "but" },
      { left: "I was hungry, _____ I ate.", right: "so" },
      { left: "She sings _____ dances.", right: "and" }
    ]}],
    trueFalse: [
      { sentence: "I like tea but I don't like coffee.", isCorrect: true, explanation: "Đúng - tương phản dùng 'but'.", trans: "Thích trà không thích cà phê." },
      { sentence: "She was tired and she went to bed.", isCorrect: false, correction: "so she went to bed.", explanation: "Kết quả → dùng 'so'.", trans: "Mệt nên đi ngủ." },
      { sentence: "Do you want tea or coffee?", isCorrect: true, explanation: "Đúng - lựa chọn dùng 'or'.", trans: "Trà hay cà phê?" },
      { sentence: "He is rich or he is not happy.", isCorrect: false, correction: "but he is not happy.", explanation: "Tương phản → 'but'.", trans: "Giàu nhưng không vui." },
      { sentence: "It rained, so we stayed home.", isCorrect: true, explanation: "Đúng - kết quả dùng 'so'.", trans: "Mưa nên ở nhà." },
      { sentence: "I like swimming but running.", isCorrect: false, correction: "and running.", explanation: "Liệt kê → 'and'.", trans: "Thích bơi và chạy." }
    ]
  },
  "b1_19": {
    fillBlanks: [
      { q: "_____ the door, please!", a: "Open", trans: "Mở cửa đi!" },
      { q: "_____ talk in the library!", a: "Don't", trans: "Đừng nói chuyện trong thư viện!" },
      { q: "What a _____ day!", a: "beautiful", trans: "Ngày đẹp quá!" },
      { q: "_____ careful on the road!", a: "Be", trans: "Cẩn thận trên đường!" },
      { q: "How _____ she is!", a: "kind", trans: "Cô ấy tốt bụng quá!" },
      { q: "_____ sit down.", a: "Please", trans: "Xin mời ngồi." },
      { q: "What an _____ idea!", a: "amazing", trans: "Ý tưởng tuyệt vời quá!" },
      { q: "_____ run in the hallway!", a: "Don't", trans: "Đừng chạy ngoài hành lang!" }
    ],
    errorCorrection: [
      { sentence: "Don't to talk in class!", errorWord: "to", correction: "(bỏ 'to')", explanation: "Mệnh lệnh phủ định: Don't + V nguyên thể.", trans: "Đừng nói chuyện trong lớp!" },
      { sentence: "What beautiful day!", errorWord: "(thiếu 'a')", correction: "What a beautiful day!", explanation: "Cấu trúc: What + a/an + adj + noun!", trans: "Ngày đẹp quá!" },
      { sentence: "How a nice day!", errorWord: "a", correction: "(bỏ 'a')", explanation: "Cấu trúc: How + adj! (không dùng 'a').", trans: "Ngày đẹp quá!" },
      { sentence: "Opens the door!", errorWord: "Opens", correction: "Open", explanation: "Mệnh lệnh dùng V nguyên thể.", trans: "Mở cửa đi!" },
      { sentence: "Not run here!", errorWord: "Not", correction: "Don't", explanation: "Phủ định mệnh lệnh: Don't + V.", trans: "Đừng chạy ở đây!" },
      { sentence: "What a amazing idea!", errorWord: "a", correction: "an", explanation: "'Amazing' bắt đầu nguyên âm → 'an'.", trans: "Ý tưởng tuyệt vời!" }
    ],
    transformation: [
      { original: "You should close the window.", instruction: "Chuyển sang câu mệnh lệnh.", keyword: "Close", a: "Close the window." },
      { original: "You mustn't run here.", instruction: "Chuyển sang câu mệnh lệnh.", keyword: "Don't", a: "Don't run here." },
      { original: "The weather is beautiful today.", instruction: "Chuyển sang câu cảm thán.", keyword: "What a", a: "What a beautiful day!" },
      { original: "She is very kind.", instruction: "Chuyển sang câu cảm thán.", keyword: "How", a: "How kind she is!" }
    ],
    matching: [{ pairs: [
      { left: "_____ the door!", right: "Open" },
      { left: "_____ talk in class!", right: "Don't" },
      { left: "What _____ beautiful day!", right: "a" },
      { left: "_____ careful!", right: "Be" },
      { left: "How _____ she is!", right: "kind" },
      { left: "What _____ amazing idea!", right: "an" }
    ]}],
    trueFalse: [
      { sentence: "Don't to talk in class!", isCorrect: false, correction: "Don't talk in class!", explanation: "Không dùng 'to' sau 'Don't'.", trans: "Đừng nói chuyện!" },
      { sentence: "What a beautiful day!", isCorrect: true, explanation: "Đúng - cấu trúc cảm thán đúng.", trans: "Ngày đẹp quá!" },
      { sentence: "Opens the door!", isCorrect: false, correction: "Open the door!", explanation: "Mệnh lệnh dùng V nguyên thể.", trans: "Mở cửa!" },
      { sentence: "How kind she is!", isCorrect: true, explanation: "Đúng - cấu trúc: How + adj + S + V!", trans: "Cô ấy tốt quá!" },
      { sentence: "Be quiet, please.", isCorrect: true, explanation: "Đúng - mệnh lệnh lịch sự.", trans: "Im lặng." },
      { sentence: "What beautiful day!", isCorrect: false, correction: "What a beautiful day!", explanation: "Thiếu 'a' trước 'beautiful day'.", trans: "Ngày đẹp quá!" }
    ]
  },
  "b1_20": {
    fillBlanks: [
      { q: "This book is _____. It belongs to me.", a: "mine", trans: "Cuốn sách này là của tôi." },
      { q: "_____ helped us with the project.", a: "They", trans: "Họ giúp chúng tôi dự án." },
      { q: "The dog wagged _____ tail.", a: "its", trans: "Con chó vẫy đuôi." },
      { q: "She gave _____ a present.", a: "him", trans: "Cô ấy tặng anh ấy quà." },
      { q: "Is this bag _____?", a: "yours", trans: "Túi này là của bạn à?" },
      { q: "We enjoyed _____ at the party.", a: "ourselves", trans: "Chúng tôi vui ở tiệc." },
      { q: "_____ house is very big.", a: "Their", trans: "Nhà họ rất lớn." },
      { q: "She cut _____ with a knife.", a: "herself", trans: "Cô ấy bị đứt tay." }
    ],
    errorCorrection: [
      { sentence: "This book is my.", errorWord: "my", correction: "mine", explanation: "Đứng cuối câu dùng đại từ sở hữu: mine.", trans: "Sách này là của tôi." },
      { sentence: "Him helped us.", errorWord: "Him", correction: "He", explanation: "Chủ ngữ dùng đại từ chủ ngữ: He.", trans: "Anh ấy giúp chúng tôi." },
      { sentence: "The dog wagged it's tail.", errorWord: "it's", correction: "its", explanation: "'its' (sở hữu), 'it's' = 'it is'.", trans: "Con chó vẫy đuôi." },
      { sentence: "She gave he a present.", errorWord: "he", correction: "him", explanation: "Tân ngữ dùng đại từ tân ngữ: him.", trans: "Cô ấy tặng anh ấy quà." },
      { sentence: "They enjoyed theirselves.", errorWord: "theirselves", correction: "themselves", explanation: "Đại từ phản thân: themselves.", trans: "Họ vui vẻ." },
      { sentence: "Is this yours bag?", errorWord: "yours", correction: "your", explanation: "Trước danh từ dùng tính từ sở hữu: your.", trans: "Đây là túi bạn à?" }
    ],
    transformation: [
      { original: "This is my book.", instruction: "Dùng đại từ sở hữu.", keyword: "mine", a: "This book is mine." },
      { original: "He helped her.", instruction: "Đổi ngôi.", keyword: "She", a: "She helped him." },
      { original: "They enjoyed the party.", instruction: "Dùng đại từ phản thân.", keyword: "themselves", a: "They enjoyed themselves at the party." },
      { original: "Is this your bag?", instruction: "Dùng đại từ sở hữu.", keyword: "yours", a: "Is this bag yours?" }
    ],
    matching: [{ pairs: [
      { left: "This is _____. (của tôi)", right: "mine" },
      { left: "_____ helped us. (Anh ấy)", right: "He" },
      { left: "The dog wagged _____ tail.", right: "its" },
      { left: "She gave _____ a present.", right: "him" },
      { left: "_____ house is big. (Của họ)", right: "Their" },
      { left: "She cut _____ .", right: "herself" }
    ]}],
    trueFalse: [
      { sentence: "This book is my.", isCorrect: false, correction: "This book is mine.", explanation: "Cuối câu → đại từ sở hữu 'mine'.", trans: "Sách này của tôi." },
      { sentence: "He helped us.", isCorrect: true, explanation: "Đúng - chủ ngữ 'He', tân ngữ 'us'.", trans: "Anh ấy giúp chúng tôi." },
      { sentence: "The dog wagged it's tail.", isCorrect: false, correction: "its tail.", explanation: "'its' sở hữu, 'it's' = 'it is'.", trans: "Vẫy đuôi." },
      { sentence: "Is this bag yours?", isCorrect: true, explanation: "Đúng - cuối câu dùng 'yours'.", trans: "Túi này của bạn?" },
      { sentence: "She cut herself with a knife.", isCorrect: true, explanation: "Đúng - phản thân 'herself'.", trans: "Cô ấy bị đứt tay." },
      { sentence: "They enjoyed theirselves.", isCorrect: false, correction: "themselves.", explanation: "Đại từ phản thân: themselves.", trans: "Họ vui vẻ." }
    ]
  },
  "b1_21": {
    fillBlanks: [
      { q: "She _____ got a new car.", a: "has", trans: "Cô ấy có xe mới." },
      { q: "_____ you got any brothers?", a: "Have", trans: "Bạn có anh em trai không?" },
      { q: "I _____ a big house.", a: "have", trans: "Tôi có nhà lớn." },
      { q: "He hasn't _____ any money.", a: "got", trans: "Anh ấy không có tiền." },
      { q: "She _____ two children.", a: "has", trans: "Cô ấy có hai con." },
      { q: "We _____ got a dog.", a: "have", trans: "Chúng tôi có chó." },
      { q: "_____ she got a laptop?", a: "Has", trans: "Cô ấy có laptop không?" },
      { q: "They _____ a beautiful garden.", a: "have", trans: "Họ có vườn đẹp." }
    ],
    errorCorrection: [
      { sentence: "She have got a car.", errorWord: "have", correction: "has", explanation: "She → 'has got'.", trans: "Cô ấy có xe." },
      { sentence: "Have he got any brothers?", errorWord: "Have", correction: "Has", explanation: "He → 'Has he got'.", trans: "Anh ấy có anh em?" },
      { sentence: "I has a big house.", errorWord: "has", correction: "have", explanation: "I → 'have'.", trans: "Tôi có nhà lớn." },
      { sentence: "She have two children.", errorWord: "have", correction: "has", explanation: "She → 'has'.", trans: "Cô ấy có hai con." },
      { sentence: "He haven't got money.", errorWord: "haven't", correction: "hasn't", explanation: "He → 'hasn't got'.", trans: "Anh ấy không có tiền." },
      { sentence: "Does she has a car?", errorWord: "has", correction: "have", explanation: "Sau 'Does' → V nguyên thể: have.", trans: "Cô ấy có xe không?" }
    ],
    transformation: [
      { original: "She has got a car.", instruction: "Dùng 'have' (American English).", keyword: "has", a: "She has a car." },
      { original: "I have a laptop.", instruction: "Dùng 'have got'.", keyword: "have got", a: "I have got a laptop." },
      { original: "He has got two brothers.", instruction: "Chuyển phủ định.", keyword: "hasn't got", a: "He hasn't got two brothers." },
      { original: "Have you got a pet?", instruction: "Dùng 'Do you have'.", keyword: "Do", a: "Do you have a pet?" }
    ],
    matching: [{ pairs: [
      { left: "She _____ got a car.", right: "has" },
      { left: "_____ you got brothers?", right: "Have" },
      { left: "I _____ a big house.", right: "have" },
      { left: "He hasn't _____ money.", right: "got" },
      { left: "She _____ two children.", right: "has" },
      { left: "_____ she got a laptop?", right: "Has" }
    ]}],
    trueFalse: [
      { sentence: "She have got a car.", isCorrect: false, correction: "She has got a car.", explanation: "She → 'has'.", trans: "Cô ấy có xe." },
      { sentence: "I have a big house.", isCorrect: true, explanation: "Đúng - I → 'have'.", trans: "Tôi có nhà lớn." },
      { sentence: "Has she got a laptop?", isCorrect: true, explanation: "Đúng - She → 'Has she got'.", trans: "Cô ấy có laptop?" },
      { sentence: "He haven't got money.", isCorrect: false, correction: "He hasn't got money.", explanation: "He → 'hasn't'.", trans: "Anh ấy không có tiền." },
      { sentence: "They have got a beautiful garden.", isCorrect: true, explanation: "Đúng - They → 'have got'.", trans: "Họ có vườn đẹp." },
      { sentence: "Does she has a car?", isCorrect: false, correction: "Does she have a car?", explanation: "Sau 'Does' → V nguyên thể.", trans: "Cô ấy có xe không?" }
    ]
  },
  "b1_22": {
    fillBlanks: [
      { q: "This coffee is _____ hot to drink.", a: "too", trans: "Cà phê nóng quá không uống được." },
      { q: "She is old _____ to drive.", a: "enough", trans: "Cô ấy đủ tuổi lái xe." },
      { q: "He is _____ tired to study.", a: "too", trans: "Anh ấy quá mệt không học được." },
      { q: "The room is big _____ for everyone.", a: "enough", trans: "Phòng đủ rộng cho mọi người." },
      { q: "This bag is _____ heavy to carry.", a: "too", trans: "Túi quá nặng không xách được." },
      { q: "She doesn't have _____ money to buy it.", a: "enough", trans: "Cô ấy không đủ tiền mua." },
      { q: "The water is _____ cold to swim.", a: "too", trans: "Nước quá lạnh không bơi được." },
      { q: "He runs fast _____ to win the race.", a: "enough", trans: "Anh ấy chạy đủ nhanh để thắng." }
    ],
    errorCorrection: [
      { sentence: "She is enough old to drive.", errorWord: "enough old", correction: "old enough", explanation: "'Enough' đứng SAU adj: old enough.", trans: "Cô ấy đủ tuổi lái xe." },
      { sentence: "He is too much tired.", errorWord: "too much", correction: "too", explanation: "Trước adj dùng 'too' (không phải 'too much').", trans: "Anh ấy quá mệt." },
      { sentence: "This is enough good.", errorWord: "enough good", correction: "good enough", explanation: "'Enough' đứng SAU adj: good enough.", trans: "Đủ tốt." },
      { sentence: "The coffee is too much hot.", errorWord: "too much", correction: "too", explanation: "'Too' + adj (không dùng 'much').", trans: "Cà phê quá nóng." },
      { sentence: "She has money enough.", errorWord: "money enough", correction: "enough money", explanation: "'Enough' đứng TRƯỚC danh từ: enough money.", trans: "Cô ấy đủ tiền." },
      { sentence: "He too is young to drive.", errorWord: "too is", correction: "is too", explanation: "'Too' đứng sau 'is': He is too young.", trans: "Anh ấy quá nhỏ để lái xe." }
    ],
    transformation: [
      { original: "She is too young to drive.", instruction: "Dùng 'not old enough'.", keyword: "not old enough", a: "She is not old enough to drive." },
      { original: "He doesn't have enough money.", instruction: "Dùng 'too little'.", keyword: "too little", a: "He has too little money." },
      { original: "The room is big enough.", instruction: "Dùng 'not too small'.", keyword: "not too small", a: "The room is not too small." },
      { original: "The coffee is too hot.", instruction: "Dùng 'not cool enough'.", keyword: "not cool enough", a: "The coffee is not cool enough to drink." }
    ],
    matching: [{ pairs: [
      { left: "_____ hot to drink.", right: "too" },
      { left: "Old _____ to drive.", right: "enough" },
      { left: "_____ tired to study.", right: "too" },
      { left: "Big _____ for everyone.", right: "enough" },
      { left: "_____ heavy to carry.", right: "too" },
      { left: "Doesn't have _____ money.", right: "enough" }
    ]}],
    trueFalse: [
      { sentence: "This coffee is too hot to drink.", isCorrect: true, explanation: "Đúng - 'too' + adj + to V.", trans: "Cà phê nóng quá." },
      { sentence: "She is enough old to drive.", isCorrect: false, correction: "old enough.", explanation: "'Enough' đứng SAU adj.", trans: "Đủ tuổi lái xe." },
      { sentence: "He runs fast enough to win.", isCorrect: true, explanation: "Đúng - adv + enough.", trans: "Chạy đủ nhanh." },
      { sentence: "This is too much expensive.", isCorrect: false, correction: "too expensive.", explanation: "'Too' + adj, không dùng 'much'.", trans: "Quá đắt." },
      { sentence: "She doesn't have enough money.", isCorrect: true, explanation: "Đúng - enough + noun.", trans: "Không đủ tiền." },
      { sentence: "The water is too cold to swim.", isCorrect: true, explanation: "Đúng - too + adj + to V.", trans: "Nước quá lạnh." }
    ]
  },
  "b1_23": {
    fillBlanks: [
      { q: "_____ do you live?", a: "Where", trans: "Bạn sống ở đâu?" },
      { q: "_____ is your birthday?", a: "When", trans: "Sinh nhật bạn khi nào?" },
      { q: "_____ did you buy that shirt?", a: "Where", trans: "Bạn mua áo ở đâu?" },
      { q: "_____ is your favorite color?", a: "What", trans: "Màu yêu thích của bạn là gì?" },
      { q: "_____ old are you?", a: "How", trans: "Bạn bao nhiêu tuổi?" },
      { q: "_____ did you go yesterday?", a: "Where", trans: "Hôm qua bạn đi đâu?" },
      { q: "_____ book is this?", a: "Whose", trans: "Sách này của ai?" },
      { q: "_____ do you prefer, tea or coffee?", a: "Which", trans: "Bạn thích cái nào, trà hay cà phê?" }
    ],
    errorCorrection: [
      { sentence: "Where you live?", errorWord: "(thiếu 'do')", correction: "Where do you live?", explanation: "Câu hỏi cần trợ động từ 'do'.", trans: "Bạn sống ở đâu?" },
      { sentence: "What she does?", errorWord: "she does", correction: "does she do", explanation: "Đảo trợ động từ: What does she do?", trans: "Cô ấy làm gì?" },
      { sentence: "How many time do you have?", errorWord: "many", correction: "much", explanation: "'Time' không đếm được → 'How much'.", trans: "Bạn có bao nhiêu thời gian?" },
      { sentence: "Who did told you?", errorWord: "told", correction: "tell", explanation: "Sau 'did' dùng V nguyên thể: tell.", trans: "Ai nói cho bạn?" },
      { sentence: "When you will come?", errorWord: "you will", correction: "will you", explanation: "Câu hỏi đảo: When will you come?", trans: "Bạn sẽ đến khi nào?" },
      { sentence: "Why you are late?", errorWord: "you are", correction: "are you", explanation: "Câu hỏi đảo: Why are you late?", trans: "Sao bạn trễ?" }
    ],
    transformation: [
      { original: "She lives in London.", instruction: "Đặt câu hỏi cho 'London'.", keyword: "Where", a: "Where does she live?" },
      { original: "He is 25 years old.", instruction: "Đặt câu hỏi cho '25 years old'.", keyword: "How old", a: "How old is he?" },
      { original: "They went to the park.", instruction: "Đặt câu hỏi cho 'the park'.", keyword: "Where", a: "Where did they go?" },
      { original: "This is Tom's book.", instruction: "Đặt câu hỏi cho 'Tom's'.", keyword: "Whose", a: "Whose book is this?" }
    ],
    matching: [{ pairs: [
      { left: "_____ do you live?", right: "Where" },
      { left: "_____ old are you?", right: "How" },
      { left: "_____ is your name?", right: "What" },
      { left: "_____ book is this?", right: "Whose" },
      { left: "_____ is your birthday?", right: "When" },
      { left: "_____ do you prefer?", right: "Which" }
    ]}],
    trueFalse: [
      { sentence: "Where you live?", isCorrect: false, correction: "Where do you live?", explanation: "Cần trợ động từ 'do'.", trans: "Bạn sống ở đâu?" },
      { sentence: "How old are you?", isCorrect: true, explanation: "Đúng - câu hỏi tuổi.", trans: "Bạn bao nhiêu tuổi?" },
      { sentence: "What does she do?", isCorrect: true, explanation: "Đúng - hỏi nghề nghiệp.", trans: "Cô ấy làm gì?" },
      { sentence: "Who did told you?", isCorrect: false, correction: "Who told you?", explanation: "'Who' là chủ ngữ → không cần 'did'.", trans: "Ai nói cho bạn?" },
      { sentence: "When will you come?", isCorrect: true, explanation: "Đúng - câu hỏi thời gian.", trans: "Bạn sẽ đến khi nào?" },
      { sentence: "Why you are late?", isCorrect: false, correction: "Why are you late?", explanation: "Phải đảo: are you.", trans: "Sao bạn trễ?" }
    ]
  },
  "b1_24": {
    fillBlanks: [
      { q: "I _____ to live in the countryside.", a: "used", trans: "Tôi từng sống ở nông thôn." },
      { q: "She _____ to have long hair.", a: "used", trans: "Cô ấy từng có tóc dài." },
      { q: "He didn't _____ to like vegetables.", a: "use", trans: "Anh ấy từng không thích rau." },
      { q: "_____ you use to play football?", a: "Did", trans: "Bạn từng chơi bóng đá không?" },
      { q: "We _____ to go to the beach every summer.", a: "used", trans: "Chúng tôi từng đi biển mỗi hè." },
      { q: "They _____ to live next door.", a: "used", trans: "Họ từng sống kế bên." },
      { q: "I didn't _____ to drink coffee.", a: "use", trans: "Tôi từng không uống cà phê." },
      { q: "She _____ to be very shy.", a: "used", trans: "Cô ấy từng rất nhút nhát." }
    ],
    errorCorrection: [
      { sentence: "I use to live in Paris.", errorWord: "use", correction: "used", explanation: "Khẳng định: 'used to' + V.", trans: "Tôi từng sống ở Paris." },
      { sentence: "She used to has long hair.", errorWord: "has", correction: "have", explanation: "Sau 'used to' dùng V nguyên thể: have.", trans: "Cô ấy từng có tóc dài." },
      { sentence: "He didn't used to like vegetables.", errorWord: "used", correction: "use", explanation: "Phủ định: didn't use to + V.", trans: "Anh ấy từng không thích rau." },
      { sentence: "Did you used to play football?", errorWord: "used", correction: "use", explanation: "Câu hỏi: Did + S + use to + V.", trans: "Bạn từng chơi bóng đá?" },
      { sentence: "I am used to live in London.", errorWord: "am", correction: "(bỏ 'am')", explanation: "'Used to' (thói quen quá khứ) không dùng 'am'.", trans: "Tôi từng sống ở London." },
      { sentence: "They used to going to school together.", errorWord: "going", correction: "go", explanation: "Sau 'used to' dùng V nguyên thể: go.", trans: "Họ từng đi học cùng nhau." }
    ],
    transformation: [
      { original: "I lived in the countryside when I was young.", instruction: "Dùng 'used to'.", keyword: "used to", a: "I used to live in the countryside." },
      { original: "She used to have long hair.", instruction: "Chuyển phủ định.", keyword: "didn't use to", a: "She didn't use to have long hair." },
      { original: "He used to play football.", instruction: "Chuyển nghi vấn.", keyword: "Did", a: "Did he use to play football?" },
      { original: "We went to the beach every summer.", instruction: "Dùng 'used to'.", keyword: "used to", a: "We used to go to the beach every summer." }
    ],
    matching: [{ pairs: [
      { left: "I _____ to live in Paris.", right: "used" },
      { left: "She _____ to have long hair.", right: "used" },
      { left: "He didn't _____ to like rau.", right: "use" },
      { left: "_____ you use to play?", right: "Did" },
      { left: "We _____ to go to the beach.", right: "used" },
      { left: "I didn't _____ to drink coffee.", right: "use" }
    ]}],
    trueFalse: [
      { sentence: "I use to live in Paris.", isCorrect: false, correction: "I used to live in Paris.", explanation: "Khẳng định: 'used to'.", trans: "Từng sống ở Paris." },
      { sentence: "She used to have long hair.", isCorrect: true, explanation: "Đúng - thói quen quá khứ.", trans: "Từng có tóc dài." },
      { sentence: "He didn't used to like vegetables.", isCorrect: false, correction: "He didn't use to like vegetables.", explanation: "Phủ định: didn't use to.", trans: "Từng không thích rau." },
      { sentence: "Did you use to play football?", isCorrect: true, explanation: "Đúng - câu hỏi: Did + use to.", trans: "Từng chơi bóng đá?" },
      { sentence: "They used to going to school.", isCorrect: false, correction: "They used to go to school.", explanation: "Sau 'used to' → V nguyên thể.", trans: "Từng đi học cùng." },
      { sentence: "We used to go to the beach every summer.", isCorrect: true, explanation: "Đúng - thói quen quá khứ.", trans: "Từng đi biển mỗi hè." }
    ]
  },
  "b1_25": {
    fillBlanks: [
      { q: "She _____ reads books in the library.", a: "often", trans: "Cô ấy thường đọc sách ở thư viện." },
      { q: "I _____ go to bed after 11 PM.", a: "never", trans: "Tôi không bao giờ đi ngủ sau 11 giờ." },
      { q: "He _____ eats lunch at his desk.", a: "usually", trans: "Anh ấy thường ăn trưa ở bàn làm việc." },
      { q: "She speaks English _____.", a: "fluently", trans: "Cô ấy nói tiếng Anh trôi chảy." },
      { q: "I have _____ been to Japan.", a: "never", trans: "Tôi chưa bao giờ đến Nhật." },
      { q: "He _____ plays guitar on Sundays.", a: "always", trans: "Anh ấy luôn chơi guitar vào Chủ nhật." },
      { q: "They _____ go to the cinema.", a: "sometimes", trans: "Họ đôi khi đi xem phim." },
      { q: "She speaks very _____ in meetings.", a: "quietly", trans: "Cô ấy nói rất nhỏ trong cuộc họp." }
    ],
    errorCorrection: [
      { sentence: "She reads often books.", errorWord: "reads often", correction: "often reads", explanation: "Trạng từ tần suất đứng TRƯỚC động từ thường.", trans: "Cô ấy thường đọc sách." },
      { sentence: "He is always late never.", errorWord: "never", correction: "(bỏ 'never')", explanation: "Không dùng cả 'always' và 'never' cùng lúc.", trans: "Anh ấy luôn trễ." },
      { sentence: "I go always to school by bus.", errorWord: "go always", correction: "always go", explanation: "Trạng từ tần suất trước động từ: always go.", trans: "Tôi luôn đi xe buýt đến trường." },
      { sentence: "She very speaks quietly.", errorWord: "very speaks", correction: "speaks very", explanation: "'Very' bổ nghĩa 'quietly': speaks very quietly.", trans: "Cô ấy nói rất nhỏ." },
      { sentence: "He usually is tired after work.", errorWord: "usually is", correction: "is usually", explanation: "Trạng từ tần suất đứng SAU 'be': is usually.", trans: "Anh ấy thường mệt sau giờ làm." },
      { sentence: "Never I go to bed late.", errorWord: "Never I", correction: "I never", explanation: "Trạng từ tần suất phủ định đứng trước V thường: I never go.", trans: "Tôi không bao giờ ngủ muộn." }
    ],
    transformation: [
      { original: "She goes to the gym every day.", instruction: "Thêm 'always'.", keyword: "always", a: "She always goes to the gym." },
      { original: "He is late for class.", instruction: "Thêm 'never'.", keyword: "never", a: "He is never late for class." },
      { original: "They watch TV in the evening.", instruction: "Thêm 'usually'.", keyword: "usually", a: "They usually watch TV in the evening." },
      { original: "She speaks quietly.", instruction: "Thêm 'very'.", keyword: "very", a: "She speaks very quietly." }
    ],
    matching: [{ pairs: [
      { left: "She _____ reads books.", right: "often" },
      { left: "I _____ go to bed late.", right: "never" },
      { left: "He is _____ tired.", right: "usually" },
      { left: "She speaks _____ .", right: "fluently" },
      { left: "He _____ plays guitar.", right: "always" },
      { left: "They _____ go to the cinema.", right: "sometimes" }
    ]}],
    trueFalse: [
      { sentence: "She reads often books.", isCorrect: false, correction: "She often reads books.", explanation: "Trạng từ tần suất trước V thường.", trans: "Thường đọc sách." },
      { sentence: "He usually eats lunch at his desk.", isCorrect: true, explanation: "Đúng - 'usually' trước V thường.", trans: "Thường ăn trưa ở bàn." },
      { sentence: "I go always to school.", isCorrect: false, correction: "I always go to school.", explanation: "'Always' trước V thường.", trans: "Tôi luôn đi học." },
      { sentence: "She is always happy.", isCorrect: true, explanation: "Đúng - trạng từ tần suất SAU 'be'.", trans: "Cô ấy luôn vui vẻ." },
      { sentence: "He usually is tired.", isCorrect: false, correction: "He is usually tired.", explanation: "Đứng SAU 'is': is usually.", trans: "Thường mệt." },
      { sentence: "I have never been to Japan.", isCorrect: true, explanation: "Đúng - 'never' giữa have và V3.", trans: "Chưa bao giờ đến Nhật." }
    ]
  }
};

// Read file and inject
const filePath = 'src/data/grammarDataB1.js';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find each topic and add exercises before the closing }
let injected = 0;
for (const [topicId, data] of Object.entries(allExercises)) {
  // Find topic line
  let topicLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"id": "${topicId}"`)) {
      topicLine = i;
      break;
    }
  }
  if (topicLine === -1) { console.log(`  ❌ ${topicId}: Not found`); continue; }
  
  // Find the closing ] of exercises array
  let exercisesEnd = -1;
  let braceDepth = 0;
  let inExercises = false;
  for (let i = topicLine; i < lines.length; i++) {
    if (lines[i].includes('"exercises"')) inExercises = true;
    if (inExercises) {
      for (const ch of lines[i]) {
        if (ch === '[') braceDepth++;
        if (ch === ']') { braceDepth--; if (braceDepth === 0) { exercisesEnd = i; break; } }
      }
      if (exercisesEnd !== -1) break;
    }
    // Stop at next topic
    if (i > topicLine && lines[i].match(/"id": "b[12]_\d+"/)) break;
  }
  
  if (exercisesEnd === -1) { console.log(`  ⚠️ ${topicId}: exercises end not found`); continue; }
  
  // Check if next line after exercises ] is the topic closing }
  // We need to insert after the ] line
  const insertJson = `,
    "fillBlanks": ${JSON.stringify(data.fillBlanks, null, 6).replace(/\n/g, '\n    ')},
    "errorCorrection": ${JSON.stringify(data.errorCorrection, null, 6).replace(/\n/g, '\n    ')},
    "transformation": ${JSON.stringify(data.transformation, null, 6).replace(/\n/g, '\n    ')},
    "matching": ${JSON.stringify(data.matching, null, 6).replace(/\n/g, '\n    ')},
    "trueFalse": ${JSON.stringify(data.trueFalse, null, 6).replace(/\n/g, '\n    ')}`;
  
  // Insert after exercises closing ]
  lines[exercisesEnd] = lines[exercisesEnd] + insertJson;
  injected++;
  console.log(`  ✅ ${topicId}: Injected at line ${exercisesEnd + 1}`);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log(`\nTotal injected: ${injected} topics`);
console.log('Done!');
