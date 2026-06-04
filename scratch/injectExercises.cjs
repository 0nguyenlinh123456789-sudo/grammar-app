// Script to add missing exercises to grammar data files
// This adds fillBlanks, errorCorrection, transformation, matching, trueFalse
// to topics that are missing them

const fs = require('fs');
const path = require('path');

// Template exercises generators per topic type
function generateExercises(topic) {
  const id = topic.id;
  const title = topic.title;
  
  // Parse existing exercises to understand the topic's grammar focus
  const exercises = topic.exercises || [];
  
  // Generate fillBlanks based on topic content
  const fillBlanks = generateFillBlanks(topic);
  const errorCorrection = generateErrorCorrection(topic);
  const transformation = generateTransformation(topic);
  const matching = generateMatching(topic);
  const trueFalse = generateTrueFalse(topic);
  
  return { fillBlanks, errorCorrection, transformation, matching, trueFalse };
}

// ========== B1 EXERCISE DATA ==========

const b1ExerciseData = {
  "b1_07": {
    fillBlanks: [
      { q: "I think it _____ rain tomorrow.", a: "will", trans: "Tôi nghĩ trời sẽ mưa ngày mai." },
      { q: "She _____ going to study abroad next year.", a: "is", trans: "Cô ấy sẽ đi du học năm tới." },
      { q: "Look at those clouds! It _____ going to rain.", a: "is", trans: "Nhìn mây kìa! Trời sắp mưa." },
      { q: "I promise I _____ call you tonight.", a: "will", trans: "Tôi hứa sẽ gọi cho bạn tối nay." },
      { q: "They _____ going to build a new school here.", a: "are", trans: "Họ sẽ xây một trường mới ở đây." },
      { q: "I _____ help you with your homework.", a: "will", trans: "Tôi sẽ giúp bạn làm bài tập." },
      { q: "We _____ going to have a party this Saturday.", a: "are", trans: "Chúng tôi sẽ tổ chức tiệc thứ Bảy này." },
      { q: "She _____ not come to the meeting tomorrow.", a: "will", trans: "Cô ấy sẽ không đến cuộc họp ngày mai." }
    ],
    errorCorrection: [
      { sentence: "I will going to visit my grandma.", errorWord: "will going to", correction: "am going to", explanation: "Không dùng 'will going to'. Dùng 'am going to' cho kế hoạch đã định.", trans: "Tôi sẽ đi thăm bà." },
      { sentence: "She is going to helps you.", errorWord: "helps", correction: "help", explanation: "Sau 'going to' dùng V nguyên thể, không thêm -s.", trans: "Cô ấy sẽ giúp bạn." },
      { sentence: "Look! It will rain. (có mây đen)", errorWord: "will", correction: "is going to", explanation: "Có bằng chứng (mây đen) → dùng 'is going to', không dùng 'will'.", trans: "Nhìn kìa! Trời sắp mưa." },
      { sentence: "I am going to help you. (quyết định tức thì)", errorWord: "am going to", correction: "will", explanation: "Quyết định tức thì tại lúc nói → dùng 'will'.", trans: "Tôi sẽ giúp bạn." },
      { sentence: "They wills come tomorrow.", errorWord: "wills", correction: "will", explanation: "'Will' không thay đổi theo ngôi. Không thêm -s.", trans: "Họ sẽ đến ngày mai." },
      { sentence: "He is going to travelling next month.", errorWord: "travelling", correction: "travel", explanation: "Sau 'going to' dùng V nguyên thể: travel.", trans: "Anh ấy sẽ đi du lịch tháng tới." }
    ],
    transformation: [
      { original: "She will visit Paris next year.", instruction: "Chuyển sang câu phủ định.", keyword: "won't", a: "She won't visit Paris next year." },
      { original: "They are going to buy a new car.", instruction: "Chuyển sang câu nghi vấn.", keyword: "Are", a: "Are they going to buy a new car?" },
      { original: "I will help you.", instruction: "Chuyển sang câu phủ định.", keyword: "won't", a: "I won't help you." },
      { original: "He is going to study medicine.", instruction: "Chuyển sang câu nghi vấn.", keyword: "Is", a: "Is he going to study medicine?" }
    ],
    matching: [
      { pairs: [
        { left: "I think it _____ rain tomorrow.", right: "will" },
        { left: "Look! She _____ going to fall!", right: "is" },
        { left: "I promise I _____ help you.", right: "will" },
        { left: "We _____ going to have a party.", right: "are" },
        { left: "He _____ going to be a doctor.", right: "is" },
        { left: "I _____ open the door for you.", right: "will" }
      ]}
    ],
    trueFalse: [
      { sentence: "I will going to visit Japan next year.", isCorrect: false, correction: "I am going to visit Japan next year.", explanation: "Không kết hợp 'will' và 'going to'. Kế hoạch → 'am going to'.", trans: "Tôi sẽ đi thăm Nhật Bản năm tới." },
      { sentence: "Look at those clouds! It is going to rain.", isCorrect: true, explanation: "Đúng - dự đoán dựa trên bằng chứng (mây đen) → 'is going to'.", trans: "Nhìn mây kìa! Trời sắp mưa." },
      { sentence: "I'll help you carry those bags.", isCorrect: true, explanation: "Đúng - quyết định tức thì → dùng 'will'.", trans: "Tôi sẽ giúp bạn xách mấy cái túi đó." },
      { sentence: "She is going to visits her parents.", isCorrect: false, correction: "She is going to visit her parents.", explanation: "Sau 'going to' dùng V nguyên thể, không thêm -s.", trans: "Cô ấy sẽ thăm bố mẹ." },
      { sentence: "I promise I will always love you.", isCorrect: true, explanation: "Đúng - lời hứa → dùng 'will'.", trans: "Tôi hứa sẽ luôn yêu bạn." },
      { sentence: "They will going to build a hospital.", isCorrect: false, correction: "They are going to build a hospital.", explanation: "Không dùng 'will going to'. Kế hoạch → 'are going to'.", trans: "Họ sẽ xây một bệnh viện." }
    ]
  },
  "b1_08": {
    fillBlanks: [
      { q: "I need _____ umbrella because it's raining.", a: "an", trans: "Tôi cần một cái ô vì trời đang mưa." },
      { q: "_____ sun rises in the east.", a: "The", trans: "Mặt trời mọc ở phía đông." },
      { q: "She is _____ honest person.", a: "an", trans: "Cô ấy là người trung thực." },
      { q: "I want to buy _____ new phone.", a: "a", trans: "Tôi muốn mua một chiếc điện thoại mới." },
      { q: "_____ children are playing in the park.", a: "The", trans: "Những đứa trẻ đang chơi trong công viên." },
      { q: "He is _____ best student in our class.", a: "the", trans: "Anh ấy là học sinh giỏi nhất lớp." },
      { q: "I had _____ egg for breakfast.", a: "an", trans: "Tôi ăn một quả trứng cho bữa sáng." },
      { q: "She plays _____ piano very well.", a: "the", trans: "Cô ấy chơi piano rất giỏi." }
    ],
    errorCorrection: [
      { sentence: "She is a honest woman.", errorWord: "a", correction: "an", explanation: "'Honest' bắt đầu bằng nguyên âm /ɒ/ → dùng 'an'.", trans: "Cô ấy là người phụ nữ trung thực." },
      { sentence: "I saw the cat in a street.", errorWord: "a", correction: "the", explanation: "Nói về con mèo và con đường cụ thể → dùng 'the'.", trans: "Tôi thấy con mèo trên đường." },
      { sentence: "The water is important for life.", errorWord: "The", correction: "(bỏ 'The')", explanation: "Nói chung về nước → không dùng mạo từ. 'Water is important for life.'", trans: "Nước quan trọng cho cuộc sống." },
      { sentence: "He plays a guitar every evening.", errorWord: "a", correction: "the", explanation: "Nhạc cụ luôn dùng 'the': play the guitar.", trans: "Anh ấy chơi guitar mỗi tối." },
      { sentence: "I need a umbrella.", errorWord: "a", correction: "an", explanation: "'Umbrella' bắt đầu bằng nguyên âm /ʌ/ → dùng 'an'.", trans: "Tôi cần một cái ô." },
      { sentence: "Sun rises in the east.", errorWord: "(thiếu 'The')", correction: "The sun", explanation: "Mặt trời là duy nhất → phải dùng 'The sun'.", trans: "Mặt trời mọc ở phía đông." }
    ],
    transformation: [
      { original: "She has a dog.", instruction: "Thêm mạo từ THE nếu nói về con chó cụ thể.", keyword: "the", a: "She has the dog." },
      { original: "I bought a book yesterday.", instruction: "Đổi thành câu nói về cuốn sách cụ thể.", keyword: "the", a: "I bought the book yesterday." },
      { original: "He is best player on the team.", instruction: "Thêm mạo từ đúng.", keyword: "the", a: "He is the best player on the team." },
      { original: "I want apple.", instruction: "Thêm mạo từ đúng.", keyword: "an", a: "I want an apple." }
    ],
    matching: [
      { pairs: [
        { left: "I need _____ umbrella.", right: "an" },
        { left: "_____ sun is shining.", right: "The" },
        { left: "She is _____ doctor.", right: "a" },
        { left: "He plays _____ piano.", right: "the" },
        { left: "I had _____ egg for breakfast.", right: "an" },
        { left: "_____ life is beautiful.", right: "(zero)" }
      ]}
    ],
    trueFalse: [
      { sentence: "She is a honest person.", isCorrect: false, correction: "She is an honest person.", explanation: "'Honest' phát âm bắt đầu bằng nguyên âm → dùng 'an'.", trans: "Cô ấy là người trung thực." },
      { sentence: "The sun rises in the east.", isCorrect: true, explanation: "Đúng - mặt trời là duy nhất → dùng 'the'.", trans: "Mặt trời mọc ở phía đông." },
      { sentence: "I want to buy a new laptop.", isCorrect: true, explanation: "Đúng - nói về một laptop bất kỳ → dùng 'a'.", trans: "Tôi muốn mua một laptop mới." },
      { sentence: "He is the best student in class.", isCorrect: true, explanation: "Đúng - so sánh nhất → dùng 'the'.", trans: "Anh ấy là học sinh giỏi nhất lớp." },
      { sentence: "Water is important for the life.", isCorrect: false, correction: "Water is important for life.", explanation: "Nói chung về cuộc sống → không dùng 'the' trước 'life'.", trans: "Nước quan trọng cho cuộc sống." },
      { sentence: "She plays the violin beautifully.", isCorrect: true, explanation: "Đúng - nhạc cụ luôn dùng 'the'.", trans: "Cô ấy chơi violin rất hay." }
    ]
  },
  "b1_09": {
    fillBlanks: [
      { q: "How _____ water do you drink every day?", a: "much", trans: "Bạn uống bao nhiêu nước mỗi ngày?" },
      { q: "There are many _____ in the garden.", a: "flowers", trans: "Có nhiều hoa trong vườn." },
      { q: "I don't have _____ money left.", a: "much", trans: "Tôi không còn nhiều tiền." },
      { q: "She gave me some good _____.", a: "advice", trans: "Cô ấy cho tôi một số lời khuyên tốt." },
      { q: "How _____ eggs do we need?", a: "many", trans: "Chúng ta cần bao nhiêu trứng?" },
      { q: "There is a lot of _____ on the roads.", a: "traffic", trans: "Có nhiều xe trên đường." },
      { q: "I need two _____ of bread.", a: "pieces", trans: "Tôi cần hai miếng bánh mì." },
      { q: "Can I have some _____?", a: "information", trans: "Tôi có thể xin một số thông tin không?" }
    ],
    errorCorrection: [
      { sentence: "I need some informations about the course.", errorWord: "informations", correction: "information", explanation: "'Information' là danh từ không đếm được, không thêm -s.", trans: "Tôi cần thông tin về khóa học." },
      { sentence: "She has many money.", errorWord: "many", correction: "much/a lot of", explanation: "'Money' không đếm được → dùng 'much' hoặc 'a lot of'.", trans: "Cô ấy có nhiều tiền." },
      { sentence: "How much chairs are there?", errorWord: "much", correction: "many", explanation: "'Chairs' đếm được → dùng 'How many'.", trans: "Có bao nhiêu ghế?" },
      { sentence: "He gave me a good advice.", errorWord: "a", correction: "(bỏ 'a') hoặc 'a piece of'", explanation: "'Advice' không đếm được → dùng 'some advice' hoặc 'a piece of advice'.", trans: "Anh ấy cho tôi lời khuyên tốt." },
      { sentence: "There are much students in the class.", errorWord: "much", correction: "many", explanation: "'Students' đếm được số nhiều → dùng 'many'.", trans: "Có nhiều học sinh trong lớp." },
      { sentence: "I bought three furnitures.", errorWord: "furnitures", correction: "pieces of furniture", explanation: "'Furniture' không đếm được. Dùng 'three pieces of furniture'.", trans: "Tôi mua ba món đồ nội thất." }
    ],
    transformation: [
      { original: "There are many books on the shelf.", instruction: "Thay 'many' bằng 'a lot of'.", keyword: "a lot of", a: "There are a lot of books on the shelf." },
      { original: "How much water do you need?", instruction: "Đổi sang danh từ đếm được 'bottles'.", keyword: "many", a: "How many bottles of water do you need?" },
      { original: "She doesn't have much free time.", instruction: "Chuyển sang câu khẳng định với 'a lot of'.", keyword: "a lot of", a: "She has a lot of free time." },
      { original: "There is some milk in the fridge.", instruction: "Chuyển sang câu phủ định.", keyword: "isn't any", a: "There isn't any milk in the fridge." }
    ],
    matching: [
      { pairs: [
        { left: "How _____ water do you drink?", right: "much" },
        { left: "How _____ students are there?", right: "many" },
        { left: "I need some _____.", right: "information" },
        { left: "There are many _____ here.", right: "people" },
        { left: "She has a lot of _____.", right: "money" },
        { left: "Two _____ of bread, please.", right: "pieces" }
      ]}
    ],
    trueFalse: [
      { sentence: "I need some informations.", isCorrect: false, correction: "I need some information.", explanation: "'Information' không đếm được, không thêm -s.", trans: "Tôi cần thông tin." },
      { sentence: "How much sugar do you want?", isCorrect: true, explanation: "Đúng - 'sugar' không đếm được → dùng 'how much'.", trans: "Bạn muốn bao nhiêu đường?" },
      { sentence: "There are many children in the park.", isCorrect: true, explanation: "Đúng - 'children' đếm được → dùng 'many'.", trans: "Có nhiều trẻ em trong công viên." },
      { sentence: "She gave me a good advice.", isCorrect: false, correction: "She gave me good advice / a piece of good advice.", explanation: "'Advice' không đếm được → không dùng 'a'.", trans: "Cô ấy cho tôi lời khuyên tốt." },
      { sentence: "We don't have much time.", isCorrect: true, explanation: "Đúng - 'time' không đếm được → dùng 'much'.", trans: "Chúng tôi không có nhiều thời gian." },
      { sentence: "How many furniture do you have?", isCorrect: false, correction: "How much furniture do you have?", explanation: "'Furniture' không đếm được → dùng 'how much'.", trans: "Bạn có bao nhiêu đồ nội thất?" }
    ]
  },
  "b1_10": {
    fillBlanks: [
      { q: "There is _____ milk in the fridge.", a: "some", trans: "Có một ít sữa trong tủ lạnh." },
      { q: "Is there _____ bread left?", a: "any", trans: "Còn bánh mì nào không?" },
      { q: "She doesn't have _____ friends here.", a: "many", trans: "Cô ấy không có nhiều bạn ở đây." },
      { q: "We need _____ sugar for the cake.", a: "some", trans: "Chúng ta cần một ít đường cho bánh." },
      { q: "There aren't _____ eggs in the box.", a: "any", trans: "Không có quả trứng nào trong hộp." },
      { q: "I have _____ of homework to do.", a: "a lot", trans: "Tôi có rất nhiều bài tập phải làm." },
      { q: "How _____ coffee do you drink a day?", a: "much", trans: "Bạn uống bao nhiêu cà phê một ngày?" },
      { q: "There are _____ books on the shelf.", a: "many", trans: "Có nhiều sách trên kệ." }
    ],
    errorCorrection: [
      { sentence: "There is some milk in the fridge? (question)", errorWord: "some", correction: "any", explanation: "Câu hỏi dùng 'any', không dùng 'some'. 'Is there any milk?'", trans: "Có sữa trong tủ lạnh không?" },
      { sentence: "I don't have some money.", errorWord: "some", correction: "any", explanation: "Câu phủ định dùng 'any', không dùng 'some'.", trans: "Tôi không có tiền." },
      { sentence: "She has much friends at school.", errorWord: "much", correction: "many", explanation: "'Friends' đếm được → dùng 'many', không dùng 'much'.", trans: "Cô ấy có nhiều bạn ở trường." },
      { sentence: "There is a lot of students in the class.", errorWord: "is", correction: "are", explanation: "'Students' số nhiều → dùng 'There are a lot of'.", trans: "Có rất nhiều học sinh trong lớp." },
      { sentence: "How many water do you need?", errorWord: "many", correction: "much", explanation: "'Water' không đếm được → dùng 'How much'.", trans: "Bạn cần bao nhiêu nước?" },
      { sentence: "Can I have any sugar, please?", errorWord: "any", correction: "some", explanation: "Lời mời/yêu cầu lịch sự → dùng 'some'.", trans: "Cho tôi xin chút đường được không?" }
    ],
    transformation: [
      { original: "There is some water in the glass.", instruction: "Chuyển sang câu phủ định.", keyword: "isn't any", a: "There isn't any water in the glass." },
      { original: "She has many books.", instruction: "Thay 'many' bằng 'a lot of'.", keyword: "a lot of", a: "She has a lot of books." },
      { original: "Is there any milk?", instruction: "Chuyển sang câu khẳng định.", keyword: "some", a: "There is some milk." },
      { original: "I don't have any money.", instruction: "Chuyển sang câu khẳng định với 'some'.", keyword: "some", a: "I have some money." }
    ],
    matching: [
      { pairs: [
        { left: "There is _____ milk in the fridge.", right: "some" },
        { left: "Is there _____ bread left?", right: "any" },
        { left: "She has _____ of homework.", right: "a lot" },
        { left: "How _____ sugar do you want?", right: "much" },
        { left: "There aren't _____ eggs.", right: "any" },
        { left: "How _____ students are here?", right: "many" }
      ]}
    ],
    trueFalse: [
      { sentence: "There is some milk in the fridge.", isCorrect: true, explanation: "Đúng - câu khẳng định dùng 'some'.", trans: "Có một ít sữa trong tủ lạnh." },
      { sentence: "I don't have some money.", isCorrect: false, correction: "I don't have any money.", explanation: "Câu phủ định dùng 'any', không phải 'some'.", trans: "Tôi không có tiền." },
      { sentence: "Can I have some water, please?", isCorrect: true, explanation: "Đúng - yêu cầu lịch sự dùng 'some'.", trans: "Cho tôi xin nước được không?" },
      { sentence: "How much apples do you want?", isCorrect: false, correction: "How many apples do you want?", explanation: "'Apples' đếm được → dùng 'how many'.", trans: "Bạn muốn bao nhiêu táo?" },
      { sentence: "There are a lot of people at the concert.", isCorrect: true, explanation: "Đúng - 'a lot of' dùng cho cả đếm được và không đếm được.", trans: "Có rất nhiều người ở buổi hòa nhạc." },
      { sentence: "She doesn't have many time.", isCorrect: false, correction: "She doesn't have much time.", explanation: "'Time' không đếm được → dùng 'much'.", trans: "Cô ấy không có nhiều thời gian." }
    ]
  },
  "b1_11": {
    fillBlanks: [
      { q: "I was born _____ 1990.", a: "in", trans: "Tôi sinh năm 1990." },
      { q: "We have a meeting _____ Monday.", a: "on", trans: "Chúng tôi có cuộc họp vào thứ Hai." },
      { q: "She usually wakes up _____ 6 o'clock.", a: "at", trans: "Cô ấy thường dậy lúc 6 giờ." },
      { q: "It is very cold _____ winter.", a: "in", trans: "Trời rất lạnh vào mùa đông." },
      { q: "The concert starts _____ 8 PM.", a: "at", trans: "Buổi hòa nhạc bắt đầu lúc 8 giờ tối." },
      { q: "My birthday is _____ March 15th.", a: "on", trans: "Sinh nhật tôi vào ngày 15 tháng 3." },
      { q: "I like to exercise _____ the morning.", a: "in", trans: "Tôi thích tập thể dục vào buổi sáng." },
      { q: "We go on holiday _____ August.", a: "in", trans: "Chúng tôi đi nghỉ vào tháng 8." }
    ],
    errorCorrection: [
      { sentence: "I was born in March 15th.", errorWord: "in", correction: "on", explanation: "Ngày cụ thể dùng 'on': on March 15th.", trans: "Tôi sinh ngày 15 tháng 3." },
      { sentence: "She wakes up in 6 o'clock.", errorWord: "in", correction: "at", explanation: "Giờ cụ thể dùng 'at': at 6 o'clock.", trans: "Cô ấy dậy lúc 6 giờ." },
      { sentence: "We have a meeting at Monday.", errorWord: "at", correction: "on", explanation: "Ngày trong tuần dùng 'on': on Monday.", trans: "Chúng tôi có cuộc họp vào thứ Hai." },
      { sentence: "It snows a lot on winter.", errorWord: "on", correction: "in", explanation: "Mùa dùng 'in': in winter.", trans: "Tuyết rơi nhiều vào mùa đông." },
      { sentence: "The shop opens on 9 AM.", errorWord: "on", correction: "at", explanation: "Giờ cụ thể dùng 'at': at 9 AM.", trans: "Cửa hàng mở lúc 9 giờ sáng." },
      { sentence: "I like reading at the evening.", errorWord: "at", correction: "in", explanation: "Buổi trong ngày dùng 'in': in the evening.", trans: "Tôi thích đọc sách vào buổi tối." }
    ],
    transformation: [
      { original: "The meeting is at 3 PM.", instruction: "Thêm ngày: on Friday.", keyword: "on Friday at", a: "The meeting is on Friday at 3 PM." },
      { original: "I was born in 1990.", instruction: "Thêm tháng cụ thể.", keyword: "in July", a: "I was born in July 1990." },
      { original: "She exercises every morning.", instruction: "Viết lại dùng giới từ thời gian.", keyword: "in", a: "She exercises in the morning." },
      { original: "We go to church on Sunday.", instruction: "Thêm thời gian cụ thể.", keyword: "at", a: "We go to church on Sunday at 10 AM." }
    ],
    matching: [
      { pairs: [
        { left: "I wake up _____ 7 AM.", right: "at" },
        { left: "She was born _____ 1995.", right: "in" },
        { left: "We have class _____ Wednesday.", right: "on" },
        { left: "It's cold _____ winter.", right: "in" },
        { left: "The party is _____ Saturday.", right: "on" },
        { left: "I study _____ the evening.", right: "in" }
      ]}
    ],
    trueFalse: [
      { sentence: "I was born in 1990.", isCorrect: true, explanation: "Đúng - năm dùng 'in'.", trans: "Tôi sinh năm 1990." },
      { sentence: "She wakes up in 7 o'clock.", isCorrect: false, correction: "She wakes up at 7 o'clock.", explanation: "Giờ cụ thể dùng 'at'.", trans: "Cô ấy dậy lúc 7 giờ." },
      { sentence: "The concert is on Friday.", isCorrect: true, explanation: "Đúng - ngày trong tuần dùng 'on'.", trans: "Buổi hòa nhạc vào thứ Sáu." },
      { sentence: "We go swimming on summer.", isCorrect: false, correction: "We go swimming in summer.", explanation: "Mùa dùng 'in'.", trans: "Chúng tôi đi bơi vào mùa hè." },
      { sentence: "My birthday is on April 5th.", isCorrect: true, explanation: "Đúng - ngày cụ thể dùng 'on'.", trans: "Sinh nhật tôi ngày 5 tháng 4." },
      { sentence: "The shop closes at midnight.", isCorrect: true, explanation: "Đúng - 'midnight' dùng 'at'.", trans: "Cửa hàng đóng cửa lúc nửa đêm." }
    ]
  }
};

// Function to inject exercises into a grammar data file
function injectExercises(filePath, exerciseMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  for (const [topicId, exercises] of Object.entries(exerciseMap)) {
    // Check if this topic exists in the file and is missing exercises
    const idPattern = `"id": "${topicId}"`;
    if (!content.includes(idPattern)) continue;
    
    // Find the topic's closing section - look for empty arrays or missing fields
    // We need to find where the topic data ends and add exercises before it
    
    // Strategy: Find the topic, then find next topic or end of array
    const topicIdx = content.indexOf(idPattern);
    if (topicIdx === -1) continue;
    
    // Check if fillBlanks already exists and has content
    const nextTopicRegex = new RegExp(`"id": "(?!${topicId}")[^"]+"`);
    const afterTopic = content.substring(topicIdx + idPattern.length);
    const nextTopicMatch = nextTopicRegex.exec(afterTopic);
    const topicEnd = nextTopicMatch ? topicIdx + idPattern.length + nextTopicMatch.index : content.length;
    const topicContent = content.substring(topicIdx, topicEnd);
    
    // Check if fillBlanks is empty or missing
    if (topicContent.includes('"fillBlanks": [') && !topicContent.includes('"fillBlanks": []')) {
      // Has fillBlanks with content, check if it actually has items
      const fbMatch = topicContent.match(/"fillBlanks":\s*\[([\s\S]*?)\]/);
      if (fbMatch && fbMatch[1].trim().length > 10) {
        console.log(`  ${topicId}: Already has fillBlanks, skipping.`);
        continue;
      }
    }
    
    // Build the JSON strings
    const fillBlanksStr = JSON.stringify(exercises.fillBlanks, null, 6);
    const errorCorrectionStr = JSON.stringify(exercises.errorCorrection, null, 6);
    const transformationStr = JSON.stringify(exercises.transformation, null, 6);
    const matchingStr = JSON.stringify(exercises.matching, null, 6);
    const trueFalseStr = JSON.stringify(exercises.trueFalse, null, 6);
    
    // Find the insertion point - after the last exercise array before the topic closes
    // Look for the closing of exercises array
    const exercisesEndPattern = /("exercises"\s*:\s*\[[\s\S]*?\]\s*)(,?\s*})/;
    
    // We need to replace within the topic section only
    const topicSection = content.substring(topicIdx, topicEnd);
    
    // Find where exercises array ends in this topic
    const exEndMatch = topicSection.match(/("exercises"\s*:\s*\[[\s\S]*?\]\s*)\n\s*}/);
    
    if (exEndMatch) {
      const insertPoint = topicIdx + exEndMatch.index + exEndMatch[1].length;
      
      const newContent = `,\n    "fillBlanks": ${fillBlanksStr},\n    "errorCorrection": ${errorCorrectionStr},\n    "transformation": ${transformationStr},\n    "matching": ${matchingStr},\n    "trueFalse": ${trueFalseStr}`;
      
      content = content.substring(0, insertPoint) + newContent + content.substring(insertPoint);
      modified = true;
      console.log(`  ✅ ${topicId}: Added exercises!`);
    } else {
      console.log(`  ⚠️ ${topicId}: Could not find insertion point.`);
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`\nFile saved: ${filePath}`);
  }
  return modified;
}

// Run
const b1Path = path.join(__dirname, '../src/data/grammarDataB1.js');
console.log('=== Injecting B1 Exercises ===');
injectExercises(b1Path, b1ExerciseData);
console.log('\nDone!');
