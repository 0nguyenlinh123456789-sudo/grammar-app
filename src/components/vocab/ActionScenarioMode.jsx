// File: src/components/vocab/ActionScenarioMode.jsx
// Role-play scenarios with dialogue using topic vocabulary

import { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronUp, Volume2 } from 'lucide-react';

// Comprehensive scenarios by topic keywords
const SCENARIO_TEMPLATES = {
  'travel': [
    {
      title: '✈️ Tại Sân Bay (At the Airport)',
      icon: '✈️',
      color: 'bg-sky-100 dark:bg-sky-900/40 border-sky-400',
      dialogue: [
        { speaker: 'Staff 👩', line: 'Good morning! Can I see your boarding pass and passport, please?', vi: 'Xin chào buổi sáng! Xin cho xem thẻ lên máy bay và hộ chiếu của bạn?' },
        { speaker: 'You 🙋', line: 'Here you go. Is my flight to Bangkok on time?', vi: 'Đây ạ. Chuyến bay đi Bangkok có đúng giờ không?' },
        { speaker: 'Staff 👩', line: 'Yes, the departure is at gate 12. You need to go through security first.', vi: 'Đúng rồi, khởi hành ở cổng 12. Bạn cần qua cửa an ninh trước.' },
        { speaker: 'You 🙋', line: 'How much luggage am I allowed to carry on?', vi: 'Tôi được mang theo bao nhiêu hành lý xách tay?' },
        { speaker: 'Staff 👩', line: 'You can bring one carry-on bag up to 7kg. Your checked luggage is already at 18kg.', vi: 'Bạn có thể mang một túi xách tay tối đa 7kg. Hành lý ký gửi của bạn đã là 18kg.' },
        { speaker: 'You 🙋', line: 'Great, thank you! Where is the baggage claim area when I arrive?', vi: 'Tuyệt, cảm ơn! Khu vực nhận hành lý ở đâu khi tôi đến?' },
        { speaker: 'Staff 👩', line: 'Follow the signs after immigration. Have a safe flight!', vi: 'Đi theo biển chỉ dẫn sau khu xuất nhập cảnh. Chúc bạn bay an toàn!' },
      ],
      task: 'Thực hành hỏi: "Excuse me, where is the nearest currency exchange?" và "Could I get a window seat?"',
      usefulExpressions: [
        'I\'d like a window/aisle seat, please.',
        'Where is the departure gate?',
        'Is there a delay on this flight?',
        'Could you help me with my luggage?',
      ],
    },
    {
      title: '🏨 Tại Khách Sạn (At the Hotel)',
      icon: '🏨',
      color: 'bg-amber-100 dark:bg-amber-900/40 border-amber-400',
      dialogue: [
        { speaker: 'Receptionist 👨', line: 'Good evening! Welcome to Grand Hotel. Do you have a reservation?', vi: 'Chào buổi tối! Chào mừng đến Grand Hotel. Bạn có đặt phòng trước không?' },
        { speaker: 'You 🙋', line: 'Yes, I booked a double room for 3 nights. My name is Minh Tran.', vi: 'Vâng, tôi đặt phòng đôi 3 đêm. Tên tôi là Trần Minh.' },
        { speaker: 'Receptionist 👨', line: 'Perfect! I found your booking. The room is on the 8th floor with a city view. Here is your key card.', vi: 'Tuyệt! Tôi tìm thấy đặt phòng. Phòng ở tầng 8 có view thành phố. Đây là thẻ phòng.' },
        { speaker: 'You 🙋', line: 'Thank you! What time is breakfast, and is the gym open 24 hours?', vi: 'Cảm ơn! Bữa sáng lúc mấy giờ, và phòng gym mở cả ngày không?' },
        { speaker: 'Receptionist 👨', line: 'Breakfast is from 6:30 to 10 AM at the restaurant on the 2nd floor. The gym is open 6 AM to 10 PM.', vi: 'Bữa sáng từ 6:30 đến 10 giờ tại nhà hàng tầng 2. Phòng gym mở từ 6 sáng đến 10 tối.' },
        { speaker: 'You 🙋', line: 'Can I get a late check-out on Sunday? My flight is at 8 PM.', vi: 'Tôi có thể check-out trễ vào Chủ nhật không? Chuyến bay lúc 8 tối.' },
        { speaker: 'Receptionist 👨', line: 'Of course! We can extend your check-out to 2 PM. Would you also like an airport shuttle?', vi: 'Tất nhiên! Chúng tôi có thể gia hạn check-out đến 2 giờ chiều. Bạn có muốn xe đưa đón sân bay không?' },
      ],
      task: 'Thực hành: "Could you recommend a good restaurant nearby?" và "Is there a laundry service?"',
      usefulExpressions: [
        'Could I have extra towels, please?',
        'The air conditioning doesn\'t seem to work.',
        'I\'d like to order room service.',
        'Can you call a taxi for me?',
      ],
    },
  ],
  'health': [
    {
      title: '🏥 Tại Phòng Khám (At the Doctor\'s Office)',
      icon: '🏥',
      color: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400',
      dialogue: [
        { speaker: 'Doctor 👨‍⚕️', line: 'Good morning! What brings you in today?', vi: 'Chào buổi sáng! Hôm nay bạn đến vì lý do gì?' },
        { speaker: 'You 🙋', line: 'I\'ve been having a terrible headache for three days and a sore throat since yesterday.', vi: 'Tôi bị đau đầu kinh khủng 3 ngày rồi và đau họng từ hôm qua.' },
        { speaker: 'Doctor 👨‍⚕️', line: 'I see. Have you had a fever or any other symptoms like coughing?', vi: 'Tôi hiểu. Bạn có bị sốt hoặc triệu chứng khác như ho không?' },
        { speaker: 'You 🙋', line: 'Yes, I had a fever of 38.5°C last night. I also feel very tired and dizzy.', vi: 'Có, tôi bị sốt 38.5°C tối qua. Tôi cũng cảm thấy rất mệt và chóng mặt.' },
        { speaker: 'Doctor 👨‍⚕️', line: 'Let me check your blood pressure and temperature. Please open your mouth and say "aah".', vi: 'Để tôi kiểm tra huyết áp và nhiệt độ. Xin hãy há miệng và nói "aah".' },
        { speaker: 'Doctor 👨‍⚕️', line: 'It looks like you have a viral infection. I\'ll prescribe some medicine and you need plenty of rest.', vi: 'Có vẻ bạn bị nhiễm virus. Tôi sẽ kê đơn thuốc và bạn cần nghỉ ngơi nhiều.' },
        { speaker: 'You 🙋', line: 'Should I take any time off work? And how often should I take the medicine?', vi: 'Tôi có nên nghỉ làm không? Và uống thuốc bao lâu một lần?' },
        { speaker: 'Doctor 👨‍⚕️', line: 'Take 2-3 days off. Take this medicine three times a day after meals. Come back if it doesn\'t improve in a week.', vi: 'Nghỉ 2-3 ngày. Uống thuốc này 3 lần/ngày sau bữa ăn. Quay lại nếu không đỡ trong một tuần.' },
      ],
      task: 'Thực hành mô tả triệu chứng: "I have a sharp pain in my stomach" và "I\'ve been feeling nauseous since this morning"',
      usefulExpressions: [
        'I need to make an appointment.',
        'Is it contagious?',
        'Are there any side effects?',
        'I\'m allergic to penicillin.',
      ],
    },
  ],
  'business': [
    {
      title: '💼 Buổi Họp Văn Phòng (Office Meeting)',
      icon: '💼',
      color: 'bg-indigo-100 dark:bg-indigo-900/40 border-indigo-400',
      dialogue: [
        { speaker: 'Manager 👩‍💼', line: 'Good morning everyone. Let\'s begin today\'s meeting. The main topic is our Q3 sales performance.', vi: 'Chào buổi sáng mọi người. Hãy bắt đầu cuộc họp hôm nay. Chủ đề chính là hiệu suất bán hàng Q3.' },
        { speaker: 'You 🙋', line: 'Thank you. I\'d like to present our department\'s results. We exceeded the target by 15%.', vi: 'Cảm ơn. Tôi muốn trình bày kết quả bộ phận. Chúng tôi vượt chỉ tiêu 15%.' },
        { speaker: 'Colleague 👨', line: 'That\'s impressive! What strategies contributed to this success?', vi: 'Ấn tượng quá! Chiến lược nào đóng góp vào thành công này?' },
        { speaker: 'You 🙋', line: 'We focused on customer retention and launched a new marketing campaign on social media that increased engagement by 40%.', vi: 'Chúng tôi tập trung vào giữ chân khách hàng và triển khai chiến dịch marketing mới trên mạng xã hội, tăng tương tác 40%.' },
        { speaker: 'Manager 👩‍💼', line: 'Excellent work! Are there any challenges we should address for Q4?', vi: 'Làm tốt lắm! Có thách thức nào cần giải quyết cho Q4 không?' },
        { speaker: 'You 🙋', line: 'Yes, we need to hire two more team members to handle the increasing workload. I\'d also recommend investing in better CRM software.', vi: 'Có, chúng ta cần tuyển thêm 2 thành viên để xử lý khối lượng công việc tăng. Tôi cũng đề xuất đầu tư phần mềm CRM tốt hơn.' },
        { speaker: 'Manager 👩‍💼', line: 'Good points. Let\'s discuss the budget for that in our next meeting. Please prepare a detailed proposal by Friday.', vi: 'Ý kiến hay. Hãy thảo luận ngân sách cho việc đó trong cuộc họp tiếp. Xin chuẩn bị đề xuất chi tiết trước thứ Sáu.' },
      ],
      task: 'Thực hành: "I\'d like to raise a concern about..." và "Based on the data, I suggest we..."',
      usefulExpressions: [
        'Moving on to the next agenda item...',
        'Could you elaborate on that point?',
        'I respectfully disagree because...',
        'Let me summarize the key takeaways.',
      ],
    },
    {
      title: '📞 Phỏng Vấn Xin Việc (Job Interview)',
      icon: '📞',
      color: 'bg-purple-100 dark:bg-purple-900/40 border-purple-400',
      dialogue: [
        { speaker: 'Interviewer 👩‍💼', line: 'Thank you for coming in today. Can you tell me a little about yourself?', vi: 'Cảm ơn bạn đã đến hôm nay. Bạn có thể giới thiệu đôi chút về bản thân không?' },
        { speaker: 'You 🙋', line: 'I graduated from HCMC University with a degree in Business Administration. I have 3 years of experience in digital marketing.', vi: 'Tôi tốt nghiệp ĐH TPHCM chuyên ngành Quản trị Kinh doanh. Tôi có 3 năm kinh nghiệm marketing số.' },
        { speaker: 'Interviewer 👩‍💼', line: 'What do you consider your greatest strength?', vi: 'Điểm mạnh nhất của bạn là gì?' },
        { speaker: 'You 🙋', line: 'I\'m very detail-oriented and I work well under pressure. In my previous role, I managed 5 projects simultaneously while maintaining quality.', vi: 'Tôi rất chú ý chi tiết và làm việc tốt dưới áp lực. Ở vị trí trước, tôi quản lý 5 dự án cùng lúc mà vẫn đảm bảo chất lượng.' },
        { speaker: 'Interviewer 👩‍💼', line: 'Why do you want to work for our company?', vi: 'Tại sao bạn muốn làm việc cho công ty chúng tôi?' },
        { speaker: 'You 🙋', line: 'I admire your company\'s innovation in the tech industry. I believe my skills in data analysis and team leadership would be a great fit for your marketing team.', vi: 'Tôi ngưỡng mộ sự đổi mới của công ty trong ngành công nghệ. Tôi tin kỹ năng phân tích dữ liệu và lãnh đạo nhóm sẽ phù hợp với đội marketing.' },
        { speaker: 'Interviewer 👩‍💼', line: 'That\'s great to hear. Do you have any questions for us?', vi: 'Rất vui được nghe. Bạn có câu hỏi nào cho chúng tôi không?' },
      ],
      task: 'Thực hành: "What are the opportunities for professional development?" và "What does a typical day look like in this role?"',
      usefulExpressions: [
        'I\'m passionate about...',
        'My previous experience has prepared me for...',
        'I\'m looking forward to contributing to...',
        'Could you tell me more about the team culture?',
      ],
    },
  ],
  'education': [
    {
      title: '🎓 Tại Trường / Lớp Học (In the Classroom)',
      icon: '🎓',
      color: 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-400',
      dialogue: [
        { speaker: 'Teacher 👩‍🏫', line: 'Good morning, class! Today we\'re going to discuss the effects of climate change. Who can tell me what they know?', vi: 'Chào buổi sáng cả lớp! Hôm nay chúng ta sẽ thảo luận về tác động của biến đổi khí hậu. Ai có thể cho cô biết những gì em biết?' },
        { speaker: 'You 🙋', line: 'Climate change causes rising sea levels, extreme weather events, and threatens biodiversity.', vi: 'Biến đổi khí hậu gây ra mực nước biển dâng, các hiện tượng thời tiết cực đoan và đe dọa đa dạng sinh học.' },
        { speaker: 'Teacher 👩‍🏫', line: 'Excellent! That\'s very comprehensive. Can you give a specific example from Vietnam?', vi: 'Xuất sắc! Rất toàn diện. Em có thể cho ví dụ cụ thể từ Việt Nam không?' },
        { speaker: 'You 🙋', line: 'In the Mekong Delta, saltwater intrusion has damaged thousands of hectares of farmland. Many farmers have had to change their crops.', vi: 'Ở Đồng bằng Sông Cửu Long, xâm nhập mặn đã phá hủy hàng ngàn hecta đất nông nghiệp. Nhiều nông dân phải thay đổi cây trồng.' },
        { speaker: 'Classmate 👧', line: 'What can we do to help reduce climate change?', vi: 'Chúng ta có thể làm gì để giúp giảm biến đổi khí hậu?' },
        { speaker: 'You 🙋', line: 'We can reduce our carbon footprint by using public transport, saving energy, and recycling. Every small action counts.', vi: 'Chúng ta có thể giảm lượng khí thải carbon bằng cách dùng phương tiện công cộng, tiết kiệm năng lượng và tái chế. Mọi hành động nhỏ đều có ý nghĩa.' },
        { speaker: 'Teacher 👩‍🏫', line: 'Well said! For homework, please write a 500-word essay on solutions to climate change in developing countries.', vi: 'Nói hay lắm! Bài tập về nhà, xin viết bài luận 500 từ về giải pháp cho biến đổi khí hậu ở các nước đang phát triển.' },
      ],
      task: 'Thực hành: "I\'d like to add that..." và "Could you explain that in more detail?"',
      usefulExpressions: [
        'I agree/disagree with that point because...',
        'Could you repeat that, please?',
        'What does this word mean?',
        'May I go to the restroom?',
      ],
    },
  ],
  'food': [
    {
      title: '🍽️ Gọi Món Tại Nhà Hàng (Ordering at a Restaurant)',
      icon: '🍽️',
      color: 'bg-orange-100 dark:bg-orange-900/40 border-orange-400',
      dialogue: [
        { speaker: 'Waiter 🧑‍🍳', line: 'Good evening! Welcome to The Garden Restaurant. Table for two?', vi: 'Chào buổi tối! Chào mừng đến The Garden Restaurant. Bàn cho hai người ạ?' },
        { speaker: 'You 🙋', line: 'Yes, please. Could we sit by the window? And could I see the menu?', vi: 'Vâng, cho chúng tôi ngồi cạnh cửa sổ được không? Và cho tôi xem thực đơn?' },
        { speaker: 'Waiter 🧑‍🍳', line: 'Of course! Here are your menus. Today\'s special is grilled salmon with roasted vegetables.', vi: 'Tất nhiên! Đây là thực đơn. Món đặc biệt hôm nay là cá hồi nướng với rau nướng.' },
        { speaker: 'You 🙋', line: 'That sounds delicious! I\'ll have the salmon, please. And my friend would like the mushroom pasta.', vi: 'Nghe ngon quá! Cho tôi cá hồi. Và bạn tôi muốn mì nấm.' },
        { speaker: 'Waiter 🧑‍🍳', line: 'Would you like any drinks or appetizers to start?', vi: 'Quý khách muốn gọi đồ uống hoặc khai vị trước không?' },
        { speaker: 'You 🙋', line: 'I\'ll have a glass of sparkling water, please. Oh, I should mention — I\'m allergic to nuts. Does the salmon dish contain any?', vi: 'Cho tôi một ly nước có ga. À, tôi cần nói — tôi bị dị ứng hạt. Món cá hồi có chứa hạt không?' },
        { speaker: 'Waiter 🧑‍🍳', line: 'No, the salmon is nut-free. I\'ll make a note on your order. Your food will be ready in about 15 minutes.', vi: 'Không, cá hồi không có hạt. Tôi sẽ ghi chú vào đơn. Món ăn sẽ sẵn sàng trong khoảng 15 phút.' },
      ],
      task: 'Thực hành: "Could I have the bill, please?" và "Is there a vegetarian option?"',
      usefulExpressions: [
        'What do you recommend?',
        'I\'d like to make a reservation for tonight.',
        'Could we have separate bills, please?',
        'This is really delicious! My compliments to the chef.',
      ],
    },
  ],
  'nature': [
    {
      title: '🌿 Đi Dã Ngoại (Nature Trip)',
      icon: '🌿',
      color: 'bg-green-100 dark:bg-green-900/40 border-green-400',
      dialogue: [
        { speaker: 'Guide 🧑‍🌾', line: 'Welcome to the national park! Today we\'ll explore the rainforest trail. Does everyone have water?', vi: 'Chào mừng đến vườn quốc gia! Hôm nay chúng ta sẽ khám phá đường mòn rừng nhiệt đới. Mọi người có nước chưa?' },
        { speaker: 'You 🙋', line: 'Yes! What kinds of animals can we see on this trail?', vi: 'Có rồi! Chúng ta có thể thấy những loài động vật gì trên đường mòn này?' },
        { speaker: 'Guide 🧑‍🌾', line: 'We might see monkeys, tropical birds, and if we\'re lucky, a wild deer. Remember to stay quiet and not feed the animals.', vi: 'Chúng ta có thể thấy khỉ, chim nhiệt đới, và nếu may mắn, hươu hoang dã. Nhớ giữ yên lặng và không cho động vật ăn.' },
        { speaker: 'You 🙋', line: 'Look at that beautiful waterfall! Can we swim there?', vi: 'Nhìn thác nước đẹp kìa! Chúng ta có thể bơi ở đó không?' },
        { speaker: 'Guide 🧑‍🌾', line: 'Yes, but only in the shallow area near the rocks. The current is strong further out. Be careful!', vi: 'Có, nhưng chỉ ở khu vực nông gần đá. Dòng nước mạnh ở xa hơn. Cẩn thận!' },
        { speaker: 'You 🙋', line: 'This is amazing! The air here is so fresh. How can we help protect this forest?', vi: 'Tuyệt vời quá! Không khí ở đây trong lành quá. Chúng ta có thể giúp bảo vệ khu rừng này thế nào?' },
      ],
      task: 'Thực hành: Mô tả cảnh thiên nhiên bạn thấy bằng tiếng Anh — dùng từ như "breathtaking", "scenic", "tranquil"',
      usefulExpressions: [
        'The scenery is breathtaking!',
        'I\'ve never seen anything so beautiful.',
        'We should protect the environment for future generations.',
        'This is an endangered species.',
      ],
    },
  ],
  'technology': [
    {
      title: '💻 Mua Điện Thoại Mới (Buying a New Phone)',
      icon: '💻',
      color: 'bg-cyan-100 dark:bg-cyan-900/40 border-cyan-400',
      dialogue: [
        { speaker: 'Staff 🧑‍💼', line: 'Hi! Are you looking for a new smartphone today?', vi: 'Xin chào! Hôm nay bạn đang tìm điện thoại thông minh mới à?' },
        { speaker: 'You 🙋', line: 'Yes, I need a phone with a good camera and long battery life. My budget is around 10 million VND.', vi: 'Vâng, tôi cần điện thoại có camera tốt và pin lâu. Ngân sách khoảng 10 triệu đồng.' },
        { speaker: 'Staff 🧑‍💼', line: 'I\'d recommend this model. It has a 108MP camera, 5000mAh battery, and 128GB storage. It\'s very popular.', vi: 'Tôi đề xuất mẫu này. Có camera 108MP, pin 5000mAh và bộ nhớ 128GB. Rất được ưa chuộng.' },
        { speaker: 'You 🙋', line: 'Does it support 5G? And how much RAM does it have?', vi: 'Nó hỗ trợ 5G không? Và có bao nhiêu RAM?' },
        { speaker: 'Staff 🧑‍💼', line: 'Yes, it supports 5G and has 8GB of RAM. The screen is 6.5 inches with AMOLED display.', vi: 'Có, nó hỗ trợ 5G và có 8GB RAM. Màn hình 6.5 inch với công nghệ AMOLED.' },
        { speaker: 'You 🙋', line: 'Sounds great! Is there a warranty? And can I pay in installments?', vi: 'Nghe tuyệt! Có bảo hành không? Và tôi có thể trả góp không?' },
        { speaker: 'Staff 🧑‍💼', line: 'There\'s a 12-month warranty and you can pay in 6 or 12 installments with 0% interest. Would you like to try it out?', vi: 'Bảo hành 12 tháng và bạn có thể trả góp 6 hoặc 12 kỳ với lãi suất 0%. Bạn muốn thử không?' },
      ],
      task: 'Thực hành: "What are the key features?" và "Can you compare this with the other model?"',
      usefulExpressions: [
        'Is this the latest model?',
        'Does it come with a screen protector?',
        'Can I trade in my old phone?',
        'I\'d like to see the premium version.',
      ],
    },
  ],
  'family': [
    {
      title: '👨‍👩‍👧‍👦 Họp Mặt Gia Đình (Family Gathering)',
      icon: '👨‍👩‍👧‍👦',
      color: 'bg-pink-100 dark:bg-pink-900/40 border-pink-400',
      dialogue: [
        { speaker: 'Grandmother 👵', line: 'It\'s so wonderful to have everyone together for Tet! Come, sit down. The food is almost ready.', vi: 'Thật tuyệt khi cả nhà tụ họp dịp Tết! Lại đây, ngồi xuống. Thức ăn sắp xong rồi.' },
        { speaker: 'You 🙋', line: 'Happy New Year, Grandma! The house looks beautiful with all the decorations. Can I help set the table?', vi: 'Chúc mừng năm mới bà! Nhà đẹp quá với trang trí. Con giúp dọn bàn ăn nhé?' },
        { speaker: 'Uncle 👨', line: 'How is university going? Are you enjoying your studies?', vi: 'Học đại học thế nào rồi? Con có thích học không?' },
        { speaker: 'You 🙋', line: 'It\'s going well, Uncle! I\'m studying hard for my final exams. I hope to graduate with honors this year.', vi: 'Tốt lắm ạ chú! Con đang học chăm cho kỳ thi cuối kỳ. Con hy vọng tốt nghiệp loại giỏi năm nay.' },
        { speaker: 'Mother 👩', line: 'We\'re so proud of you! Now come help me make the spring rolls before everyone gets hungry.', vi: 'Mẹ tự hào về con lắm! Giờ lại giúp mẹ cuốn chả giò trước khi mọi người đói.' },
        { speaker: 'You 🙋', line: 'Sure, Mom! I really miss your cooking. Nothing beats homemade food during the holidays.', vi: 'Dạ mẹ! Con rất nhớ món mẹ nấu. Không gì sánh bằng đồ ăn nhà làm dịp lễ.' },
      ],
      task: 'Thực hành: Giới thiệu các thành viên gia đình và kể về kỷ niệm gia đình bằng tiếng Anh',
      usefulExpressions: [
        'We usually get together during holidays.',
        'I take after my mother/father.',
        'My sister and I are very close.',
        'Family means everything to me.',
      ],
    },
  ],
  'shopping': [
    {
      title: '🛒 Mua Sắm Quần Áo (Clothes Shopping)',
      icon: '🛒',
      color: 'bg-rose-100 dark:bg-rose-900/40 border-rose-400',
      dialogue: [
        { speaker: 'Staff 👩‍💼', line: 'Hello! Welcome to our store. Are you looking for anything in particular?', vi: 'Xin chào! Chào mừng đến cửa hàng. Bạn đang tìm gì đặc biệt không?' },
        { speaker: 'You 🙋', line: 'Yes, I\'m looking for a formal shirt for a job interview next week. Something professional but comfortable.', vi: 'Vâng, tôi đang tìm áo sơ mi lịch sự cho phỏng vấn tuần tới. Chuyên nghiệp nhưng thoải mái.' },
        { speaker: 'Staff 👩‍💼', line: 'Great! We have some new arrivals over here. What size do you usually wear?', vi: 'Tuyệt! Chúng tôi có hàng mới ở đây. Bạn thường mặc size gì?' },
        { speaker: 'You 🙋', line: 'I\'m usually a medium. Can I try this light blue one? It looks very elegant.', vi: 'Tôi thường mặc size M. Tôi thử cái xanh nhạt này được không? Trông rất thanh lịch.' },
        { speaker: 'Staff 👩‍💼', line: 'Sure! The fitting room is right there. This shirt is made of 100% cotton and it\'s wrinkle-resistant.', vi: 'Được! Phòng thử ở kia. Áo này 100% cotton và chống nhăn.' },
        { speaker: 'You 🙋', line: 'It fits perfectly! How much is it? And do you have a matching tie?', vi: 'Vừa vặn tuyệt! Bao nhiêu tiền? Và có cà vạt phối không?' },
        { speaker: 'Staff 👩‍💼', line: 'The shirt is 450,000 VND and we have matching ties for 200,000 VND. If you buy both, you get 10% off the total.', vi: 'Áo 450.000đ và cà vạt phối 200.000đ. Nếu mua cả hai, giảm 10% tổng.' },
      ],
      task: 'Thực hành: "Do you have this in a different color?" và "Can I get a refund if it doesn\'t fit?"',
      usefulExpressions: [
        'Do you have a smaller/larger size?',
        'Is there a sale going on?',
        'Can I pay by card?',
        'Do you offer gift wrapping?',
      ],
    },
  ],
  'emotion': [
    {
      title: '💭 Tâm Sự Với Bạn Bè (Heart-to-Heart Talk)',
      icon: '💭',
      color: 'bg-violet-100 dark:bg-violet-900/40 border-violet-400',
      dialogue: [
        { speaker: 'Friend 👫', line: 'Hey, you look a bit down today. Is everything okay?', vi: 'Này, hôm nay trông bạn hơi buồn. Mọi thứ ổn không?' },
        { speaker: 'You 🙋', line: 'To be honest, I\'ve been feeling really stressed lately. Work has been overwhelming.', vi: 'Thật lòng, gần đây tôi cảm thấy rất căng thẳng. Công việc quá tải.' },
        { speaker: 'Friend 👫', line: 'I\'m sorry to hear that. Have you talked to your boss about the workload?', vi: 'Tiếc quá. Bạn đã nói với sếp về khối lượng công việc chưa?' },
        { speaker: 'You 🙋', line: 'Not yet, I\'m afraid it might affect my evaluation. But I know I need to set better boundaries.', vi: 'Chưa, tôi sợ nó ảnh hưởng đến đánh giá. Nhưng tôi biết cần đặt ranh giới tốt hơn.' },
        { speaker: 'Friend 👫', line: 'Your mental health is more important than any job. Take care of yourself first. What do you usually do to relax?', vi: 'Sức khỏe tinh thần quan trọng hơn bất kỳ công việc nào. Hãy chăm sóc bản thân trước. Bạn thường làm gì để thư giãn?' },
        { speaker: 'You 🙋', line: 'I love going for walks in the park and listening to music. Thank you for listening — it really means a lot to me.', vi: 'Tôi thích đi dạo ở công viên và nghe nhạc. Cảm ơn đã lắng nghe — điều đó rất quan trọng với tôi.' },
      ],
      task: 'Thực hành: Bày tỏ cảm xúc bằng tiếng Anh — "I feel anxious about..." và "I\'m grateful for..."',
      usefulExpressions: [
        'I need some time to think about it.',
        'That really made my day!',
        'I\'m disappointed but I understand.',
        'I appreciate your support.',
      ],
    },
  ],
  'default': [
    {
      title: '🛒 Mua Sắm Tại Siêu Thị (Supermarket Shopping)',
      icon: '🛒',
      color: 'bg-rose-100 dark:bg-rose-900/40 border-rose-400',
      dialogue: [
        { speaker: 'Staff 👩‍💼', line: 'Hello! Are you looking for anything in particular today?', vi: 'Xin chào! Hôm nay bạn đang tìm kiếm gì đặc biệt không?' },
        { speaker: 'You 🙋', line: 'Yes, I\'m looking for organic vegetables and some fresh fruit. Where is the produce section?', vi: 'Vâng, tôi đang tìm rau hữu cơ và trái cây tươi. Khu rau quả ở đâu?' },
        { speaker: 'Staff 👩‍💼', line: 'The produce section is in aisle 3. We just got fresh strawberries and mangoes today.', vi: 'Khu rau quả ở dãy 3. Hôm nay chúng tôi vừa nhận dâu tây và xoài tươi.' },
        { speaker: 'You 🙋', line: 'Great! I also need some rice and soy sauce. Are there any promotions today?', vi: 'Tuyệt! Tôi cũng cần gạo và nước tương. Hôm nay có khuyến mãi gì không?' },
        { speaker: 'Staff 👩‍💼', line: 'Yes! Buy 2 bags of rice and get 1 bottle of cooking oil free. The promotion ends this weekend.', vi: 'Có! Mua 2 túi gạo tặng 1 chai dầu ăn. Khuyến mãi kết thúc cuối tuần này.' },
        { speaker: 'You 🙋', line: 'That\'s a great deal! Do you accept mobile payment? I don\'t have cash.', vi: 'Ưu đãi tốt quá! Bạn có nhận thanh toán di động không? Tôi không có tiền mặt.' },
        { speaker: 'Staff 👩‍💼', line: 'Absolutely! We accept all major mobile payment apps. The checkout is at counter 5. Thank you for shopping with us!', vi: 'Chắc chắn! Chúng tôi nhận tất cả ứng dụng thanh toán phổ biến. Quầy thanh toán ở quầy 5. Cảm ơn đã mua sắm!' },
      ],
      task: 'Thực hành: "How much does this cost?" và "Can I return this if I change my mind?"',
      usefulExpressions: [
        'Where can I find the dairy products?',
        'Do you have this in a larger size?',
        'I\'d like a bag, please.',
        'Could you scan my loyalty card?',
      ],
    },
    {
      title: '🍽️ Đặt Bàn Nhà Hàng (Making a Reservation)',
      icon: '🍽️',
      color: 'bg-orange-100 dark:bg-orange-900/40 border-orange-400',
      dialogue: [
        { speaker: 'You 🙋', line: 'Hello, I\'d like to make a reservation for Saturday evening, please.', vi: 'Xin chào, tôi muốn đặt bàn cho tối thứ Bảy.' },
        { speaker: 'Host 🧑‍🍳', line: 'Of course! For how many people, and what time would you prefer?', vi: 'Tất nhiên! Cho bao nhiêu người, và bạn muốn lúc mấy giờ?' },
        { speaker: 'You 🙋', line: 'A table for four at 7 PM, please. Is there a terrace available? We\'d love to sit outside.', vi: 'Bàn cho 4 người lúc 7 giờ tối. Có sân hiên không? Chúng tôi muốn ngồi ngoài trời.' },
        { speaker: 'Host 🧑‍🍳', line: 'Let me check... Yes, we have a terrace table available! Would you like to pre-order any special dishes?', vi: 'Để tôi kiểm tra... Có, chúng tôi có bàn sân hiên! Bạn muốn đặt trước món đặc biệt nào không?' },
        { speaker: 'You 🙋', line: 'Actually, it\'s my friend\'s birthday. Can you prepare a cake for us?', vi: 'Thực ra, là sinh nhật bạn tôi. Bạn có thể chuẩn bị bánh cho chúng tôi không?' },
        { speaker: 'Host 🧑‍🍳', line: 'Absolutely! We can prepare a chocolate or vanilla cake. Just let us know the name for the birthday message.', vi: 'Chắc chắn! Chúng tôi có thể chuẩn bị bánh sô-cô-la hoặc vani. Cho chúng tôi biết tên để viết lời chúc.' },
      ],
      task: 'Thực hành: "Do you have any vegetarian/vegan options?" và "What\'s included in the set menu?"',
      usefulExpressions: [
        'Is there a dress code?',
        'We have someone with a nut allergy.',
        'Can we bring our own wine? Is there a corkage fee?',
        'Could we have a quiet table in the corner?',
      ],
    },
  ],
};

const ScenarioCard = ({ scenario, playAudio }) => {
  const [expanded, setExpanded] = useState(false);
  const [userTried, setUserTried] = useState(false);

  return (
    <div className={`border-3 rounded-2xl overflow-hidden border-4 ${scenario.color} transition-all`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 font-black text-left"
      >
        <span className="text-lg text-slate-800 dark:text-slate-100">{scenario.title}</span>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in">
          {/* Dialogue */}
          <div className="space-y-2">
            {scenario.dialogue.map((line, i) => (
              <div key={i} className={`flex gap-3 ${line.speaker.includes('You') ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-slate-700 border-2 border-black flex items-center justify-center text-xl">
                  {line.speaker.split(' ')[1] || '👤'}
                </div>
                <div className={`flex-1 max-w-sm ${line.speaker.includes('You') ? 'text-right' : ''}`}>
                  <div className="text-xs font-black text-slate-500 dark:text-slate-400 mb-1">
                    {line.speaker.split(' ')[0]}
                  </div>
                  <div
                    className={`
                      inline-block rounded-2xl px-4 py-2 border-2 border-black
                      ${line.speaker.includes('You')
                        ? 'bg-yellow-400 text-slate-900'
                        : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                      }
                    `}
                  >
                    <div className="font-bold text-sm">{line.line}</div>
                    <div className="text-xs opacity-75 mt-1 italic">{line.vi}</div>
                  </div>
                  <button
                    onClick={() => playAudio(line.line)}
                    className="mt-1 text-xs text-blue-500 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <Volume2 size={12} /> Nghe
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Useful Expressions */}
          {scenario.usefulExpressions && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">💡</span>
                <span className="font-black text-sm text-blue-700 dark:text-blue-300">Cụm Từ Hữu Ích:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {scenario.usefulExpressions.map((expr, i) => (
                  <button
                    key={i}
                    onClick={() => playAudio(expr)}
                    className="text-left text-sm font-bold text-blue-800 dark:text-blue-200 bg-white dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800 transition-all flex items-center gap-1.5"
                  >
                    <Volume2 size={12} className="flex-shrink-0" />
                    {expr}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Task */}
          <div className="bg-white dark:bg-slate-700 border-2 border-dashed border-slate-400 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={16} className="text-purple-500" />
              <span className="font-black text-sm text-purple-700 dark:text-purple-300">Luyện Tập Của Bạn:</span>
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{scenario.task}</p>
            <button
              onClick={() => setUserTried(true)}
              className={`mt-3 px-4 py-2 rounded-xl border-2 border-black font-black text-sm transition-all ${
                userTried
                  ? 'bg-emerald-400 text-white'
                  : 'bg-yellow-300 hover:bg-yellow-400'
              }`}
            >
              {userTried ? '✓ Đã luyện xong!' : '🎯 Tôi đã thực hành!'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ActionScenarioMode = ({ activeTopic, playAudio }) => {
  // Pick scenarios based on topic keywords  
  const topicId = (activeTopic?.id || '').toLowerCase();
  const topicTitle = (activeTopic?.title || '').toLowerCase();
  const combined = `${topicId} ${topicTitle}`;

  const getScenarios = () => {
    if (combined.includes('travel') || combined.includes('transport') || combined.includes('du lịch') || combined.includes('giao thông')) return SCENARIO_TEMPLATES.travel;
    if (combined.includes('health') || combined.includes('medical') || combined.includes('sức khỏe') || combined.includes('y tế')) return SCENARIO_TEMPLATES.health;
    if (combined.includes('business') || combined.includes('office') || combined.includes('work') || combined.includes('kinh doanh') || combined.includes('văn phòng') || combined.includes('nghề')) return SCENARIO_TEMPLATES.business;
    if (combined.includes('education') || combined.includes('school') || combined.includes('academic') || combined.includes('giáo dục') || combined.includes('học')) return SCENARIO_TEMPLATES.education;
    if (combined.includes('food') || combined.includes('cook') || combined.includes('thức ăn') || combined.includes('nấu') || combined.includes('dinh dưỡng')) return SCENARIO_TEMPLATES.food;
    if (combined.includes('nature') || combined.includes('environment') || combined.includes('thiên nhiên') || combined.includes('môi trường') || combined.includes('động vật') || combined.includes('animal')) return SCENARIO_TEMPLATES.nature;
    if (combined.includes('tech') || combined.includes('internet') || combined.includes('digital') || combined.includes('công nghệ')) return SCENARIO_TEMPLATES.technology;
    if (combined.includes('family') || combined.includes('relationship') || combined.includes('gia đình') || combined.includes('quan hệ')) return SCENARIO_TEMPLATES.family;
    if (combined.includes('shopping') || combined.includes('mua sắm') || combined.includes('tài chính') || combined.includes('finance')) return SCENARIO_TEMPLATES.shopping;
    if (combined.includes('emotion') || combined.includes('feeling') || combined.includes('cảm xúc') || combined.includes('tâm lý') || combined.includes('tính cách')) return SCENARIO_TEMPLATES.emotion;
    return SCENARIO_TEMPLATES.default;
  };

  const scenarios = getScenarios();

  // Key vocabulary for this context
  const contextWords = (activeTopic?.words || []).slice(0, 10);

  return (
    <div className="w-full max-w-4xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-5 text-white border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black flex items-center gap-3">
          🎭 <span>Học Qua Tình Huống Thực Tế</span>
        </h2>
        <p className="text-white/80 font-bold mt-2 text-sm">
          Thực hành hội thoại tiếng Anh trong các tình huống đời thực. Đọc to, nghe, và luyện theo từng câu!
        </p>
      </div>

      {/* Quick Reference Vocab */}
      <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <h3 className="text-lg font-black mb-3 text-slate-800 dark:text-slate-100 flex items-center gap-2">
          📋 Từ Vựng Chính Trong Tình Huống
        </h3>
        <div className="flex flex-wrap gap-2">
          {contextWords.map((word, i) => (
            <button
              key={i}
              onClick={() => playAudio(word.en)}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-400 rounded-full font-bold text-sm text-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all"
            >
              <Volume2 size={12} />
              {word.en} — {word.vi}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Cards */}
      <div className="space-y-4">
        {scenarios.map((scenario, i) => (
          <ScenarioCard key={i} scenario={scenario} playAudio={playAudio} />
        ))}
      </div>

      {/* Tip Box */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-900 border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <h3 className="font-black text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
          💡 Bí Quyết Học Qua Tình Huống
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-bold text-slate-700 dark:text-slate-200">
          <div className="flex gap-2 items-start">
            <span className="text-2xl">🎭</span>
            <span>Đóng vai cả hai nhân vật để nhớ từ lâu hơn</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-2xl">🔊</span>
            <span>Đọc to từng câu để rèn phát âm tự nhiên</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-2xl">✏️</span>
            <span>Tự tạo tình huống mới dùng từ đã học</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-2xl">📱</span>
            <span>Ghi âm bản thân để cải thiện ngữ điệu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionScenarioMode;
