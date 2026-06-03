import fs from 'fs';

const C1C2_TOPICS = [
  {
    id: 'c1c2_1', title: '1. Hiện Tại & Quá Khứ (Advanced)', category: 'Tenses', color: 'bg-red-400',
    theory: [
      { h: 'I. Hiện tại hoàn thành & Hiện tại hoàn thành tiếp diễn (Advanced)', c: '📌 Present Perfect dùng để diễn tả kết quả (results) hoặc số lượng (how much/many).\n→ I have written three reports this morning.\n📌 Present Perfect Continuous nhấn mạnh vào HÀNH ĐỘNG hoặc khoảng thời gian (how long), hoặc hành động vừa mới kết thúc để lại kết quả rõ rệt.\n→ I have been writing reports all morning.\n→ You look exhausted! Have you been working out?\n⚠️ Lưu ý: Stative verbs (know, believe, understand) thường KHÔNG dùng với V-ing.' },
      { h: 'II. Quá khứ hoàn thành & Quá khứ hoàn thành tiếp diễn', c: '📌 Past Perfect (had + V3) diễn tả hành động xảy ra trước một thời điểm/hành động khác trong quá khứ.\n→ By the time we arrived, the film had started.\n📌 Past Perfect Continuous (had been + V-ing) nhấn mạnh tính liên tục của hành động kéo dài đến một thời điểm trong quá khứ.\n→ She had been waiting for two hours when he finally showed up.\n📌 Dùng với "It was the first/second time...":\n→ It was the first time I had ever eaten sushi.' },
      { h: 'III. Will vs Would diễn tả thói quen', c: '📌 WILL: Thói quen ở hiện tại (thường gây khó chịu).\n→ He will always leave his dirty socks on the floor!\n📌 WOULD: Thói quen trong quá khứ (không dùng cho trạng thái).\n→ When I was young, I would spend hours reading.\n(Không nói: I would live in London. → Dùng: I used to live...)' },
      { h: 'IV. Be always doing / Be forever doing', c: '📌 Diễn tả sự phàn nàn về một thói quen gây khó chịu.\n→ She is forever complaining about her job.\n→ You are always interrupting me when I speak!' }
    ],
    sentences: [
      { text: "I have been trying to contact you all morning", trans: "Tôi đã cố liên lạc với bạn cả buổi sáng" },
      { text: "By the time we got to the station the train had left", trans: "Lúc chúng tôi đến nhà ga chuyến tàu đã rời đi" },
      { text: "It was the first time I had ever seen such a beautiful painting", trans: "Đó là lần đầu tiên tôi từng thấy một bức tranh đẹp như vậy" },
      { text: "He will always complain about the food in this restaurant", trans: "Anh ta luôn phàn nàn về đồ ăn ở nhà hàng này" },
      { text: "When we were kids we would play in the garden for hours", trans: "Khi chúng tôi còn nhỏ chúng tôi thường chơi trong vườn hàng giờ" },
      { text: "She is forever losing her keys and asking for help", trans: "Cô ấy luôn luôn làm mất chìa khóa và xin giúp đỡ" },
      { text: "I have known him since we were in primary school", trans: "Tôi đã biết anh ấy từ khi chúng tôi học tiểu học" },
      { text: "They had been driving for six hours when they finally stopped", trans: "Họ đã lái xe sáu tiếng đồng hồ thì cuối cùng cũng dừng lại" },
      { text: "He has written three bestselling novels so far", trans: "Anh ấy đã viết được ba cuốn tiểu thuyết bán chạy nhất cho đến nay" },
      { text: "The roads were wet because it had been raining all night", trans: "Đường xá ướt át vì trời đã mưa rả rích cả đêm" }
    ],
    exercises: [
      { q: "You look exhausted! _______ out?", opts: ["Have you worked", "Did you work", "Have you been working", "Are you working"], a: "Have you been working" },
      { q: "It was the first time she _______ sushi.", opts: ["has eaten", "had eaten", "ate", "was eating"], a: "had eaten" },
      { q: "When I was young, I _______ spend hours reading.", opts: ["would", "will", "used", "am used to"], a: "would" },
      { q: "He _______ always leaving his dirty socks on the floor!", opts: ["is", "has", "does", "will"], a: "is" },
      { q: "By the time we arrived, the film _______.", opts: ["started", "has started", "had started", "was starting"], a: "had started" },
      { q: "I _______ him since we were in primary school.", opts: ["have been knowing", "knew", "have known", "know"], a: "have known" },
      { q: "They _______ for six hours when they finally stopped.", opts: ["have driven", "had driven", "have been driving", "had been driving"], a: "had been driving" },
      { q: "She _______ three letters this morning.", opts: ["has written", "has been writing", "wrote", "had written"], a: "has written" },
      { q: "I _______ to contact you all morning.", opts: ["tried", "have tried", "have been trying", "had tried"], a: "have been trying" },
      { q: "He is forever _______ about his job.", opts: ["complain", "complains", "complained", "complaining"], a: "complaining" }
    ]
  },
  {
    id: 'c1c2_2', title: '2. Tương Lai Nâng Cao', category: 'Tenses', color: 'bg-orange-400',
    theory: [
      { h: 'I. Future Perfect & Future Perfect Continuous', c: '📌 Future Perfect (will have + V3): Hành động sẽ hoàn thành TRƯỚC một thời điểm ở tương lai.\n→ By next year, I will have graduated.\n📌 Future Perfect Continuous (will have been + V-ing): Nhấn mạnh khoảng thời gian kéo dài đến một thời điểm ở tương lai.\n→ By 5 PM, I will have been working for 8 hours.' },
      { h: 'II. Be to + infinitive / Be due to', c: '📌 Be to + V: Lịch trình trang trọng, chỉ thị, hoặc sự sắp xếp chính thức.\n→ The Prime Minister is to visit France next week.\n→ You are to be here by 8 AM.\n📌 Be due to + V: Sắp xảy ra theo lịch trình dự kiến.\n→ The train is due to arrive in 5 minutes.' },
      { h: 'III. Be about to / Be on the point of', c: '📌 Be about to + V: Sắp sửa làm gì (immediate future).\n→ Hurry up! The movie is about to start.\n📌 Be on the point of + V-ing: Sắp sửa, ngay ngưỡng cửa của việc gì.\n→ I was on the point of leaving when the phone rang.' },
      { h: 'IV. Present tenses for Future', c: '📌 Present Simple: Lịch trình tàu, xe, chuyến bay, rạp chiếu phim (timetables).\n→ My flight leaves at 10 AM tomorrow.\n📌 Present Continuous: Kế hoạch cá nhân ĐÃ SẮP XẾP cụ thể (personal arrangements).\n→ I am meeting John tomorrow evening.' }
    ],
    sentences: [
      { text: "By next summer I will have finished my master's degree", trans: "Đến mùa hè năm sau tôi sẽ hoàn thành bằng thạc sĩ" },
      { text: "The President is to make an official announcement tonight", trans: "Tổng thống dự kiến sẽ có thông báo chính thức tối nay" },
      { text: "I was on the point of giving up when I finally succeeded", trans: "Tôi gần như sắp bỏ cuộc thì cuối cùng lại thành công" },
      { text: "By five o'clock she will have been working for ten hours", trans: "Đến năm giờ cô ấy sẽ làm việc được mười tiếng liên tục" },
      { text: "The new shopping mall is due to open early next month", trans: "Trung tâm thương mại mới dự kiến mở cửa đầu tháng sau" },
      { text: "Hurry up because the train is about to leave the station", trans: "Nhanh lên vì tàu sắp sửa rời ga rồi" },
      { text: "We are meeting the clients tomorrow afternoon for a presentation", trans: "Chúng tôi sẽ gặp khách hàng chiều mai để thuyết trình" },
      { text: "The concert starts at eight so don't be late", trans: "Buổi hòa nhạc bắt đầu lúc tám giờ nên đừng đến muộn" },
      { text: "You are to hand in your assignments by Friday at the latest", trans: "Các em phải nộp bài tập muộn nhất là vào thứ Sáu" },
      { text: "They will have built the new bridge by the end of the year", trans: "Họ sẽ xây xong cây cầu mới trước cuối năm nay" }
    ],
    exercises: [
      { q: "By next year, I _______ my degree.", opts: ["will finish", "will be finishing", "will have finished", "finish"], a: "will have finished" },
      { q: "The Prime Minister _______ visit Japan next week.", opts: ["is to", "about to", "due to", "on the point of"], a: "is to" },
      { q: "I was on the point of _______ when the phone rang.", opts: ["leave", "leaving", "left", "to leave"], a: "leaving" },
      { q: "By 5 PM, she _______ for 8 hours.", opts: ["will work", "will be working", "will have worked", "will have been working"], a: "will have been working" },
      { q: "The train is due _______ in 5 minutes.", opts: ["arrive", "to arrive", "arriving", "arrived"], a: "to arrive" },
      { q: "Hurry up! The movie is _______ start.", opts: ["due to", "to", "about to", "on the point of"], a: "about to" },
      { q: "My flight _______ at 10 AM tomorrow.", opts: ["is leaving", "leaves", "will leave", "is going to leave"], a: "leaves" },
      { q: "I _______ John tomorrow evening.", opts: ["meet", "am meeting", "will have met", "meet to"], a: "am meeting" },
      { q: "You _______ be here by 8 AM.", opts: ["are to", "will", "going to", "about to"], a: "are to" },
      { q: "They _______ the bridge by the end of the year.", opts: ["will build", "will be building", "will have built", "will have been building"], a: "will have built" }
    ]
  },
  {
    id: 'c1c2_3', title: '3. Inversion (Đảo ngữ Toàn diện)', category: 'Advanced Structures', color: 'bg-amber-400',
    theory: [
      { h: 'I. Inversion sau phó từ phủ định & hạn chế', c: '📌 Never, Rarely, Seldom, Hardly, Scarcely, Barely, Little.\n→ Little did he know that he was being watched.\n→ Rarely have I seen such a beautiful performance.\n📌 Cụm No/Not: At no time, On no account, Under no circumstances, Not only... but also.\n→ Under no circumstances should you leave this door unlocked.\n→ Not only did she win the race, but she also broke the record.' },
      { h: 'II. Inversion với Only', c: '📌 Only after, Only when, Only later, Only then, Only by, Only if.\n⚠️ Lưu ý: Đảo ngữ ở mệnh đề CHÍNH.\n→ Only after she left did I realize her importance.\n→ Only by working hard can you succeed.' },
      { h: 'III. Inversion với cụm trạng từ chỉ nơi chốn/phương hướng', c: '📌 Here, There, Away, Out, Up, Down... + V (thường là come/go/sit/stand) + S (danh từ).\n→ Here comes the bus! (Không dùng: Here does the bus come)\n→ Out ran the thief.\n⚠️ Nếu S là đại từ (he/she/it/they), KHÔNG đảo ngữ:\n→ Here it comes! Away he went.' },
      { h: 'IV. So / Such / As / Nor', c: '📌 So + adj/adv + trợ V + S + that...\n→ So devastating were the floods that entire villages were wiped out.\n📌 Such + be + N + that...\n→ Such is the elegance of the design that it won an award.\n📌 So / Neither / Nor (Đồng tình):\n→ He doesn\'t like it, nor do I.' }
    ],
    sentences: [
      { text: "Little did he know that his life was about to change", trans: "Anh ta hoàn toàn không biết rằng cuộc đời mình sắp thay đổi" },
      { text: "Under no circumstances should you reveal this secret", trans: "Trong bất kỳ hoàn cảnh nào bạn cũng không được tiết lộ bí mật này" },
      { text: "Only after I had read the book did I understand the movie", trans: "Chỉ sau khi đọc sách tôi mới hiểu được bộ phim" },
      { text: "Out ran the children into the garden to play", trans: "Bọn trẻ chạy ùa ra vườn để chơi" },
      { text: "So strong was the wind that trees were uprooted", trans: "Gió mạnh đến nỗi cây cối bị tróc rễ" },
      { text: "Such was his popularity that he won the election easily", trans: "Sự nổi tiếng của anh ta lớn đến mức anh ta thắng cử dễ dàng" },
      { text: "Not only did they arrive late but they also forgot the tickets", trans: "Họ không những đến muộn mà còn quên vé" },
      { text: "Rarely have I tasted such a delicious meal in my life", trans: "Hiếm khi nào tôi nếm được một bữa ăn ngon như vậy trong đời" },
      { text: "Here comes the train we have been waiting for", trans: "Chuyến tàu chúng ta đang đợi đến rồi kìa" },
      { text: "He didn't want to go to the party and neither did I", trans: "Anh ta không muốn đi dự tiệc và tôi cũng vậy" }
    ],
    exercises: [
      { q: "Little _______ that his life was about to change.", opts: ["he knew", "knew he", "did he know", "does he know"], a: "did he know" },
      { q: "Under no circumstances _______ leave this door unlocked.", opts: ["you should", "should you", "you must", "mustn't you"], a: "should you" },
      { q: "Only after she left _______ her importance.", opts: ["I realized", "did I realize", "I did realize", "had I realized"], a: "did I realize" },
      { q: "Out _______ into the garden.", opts: ["the children ran", "did the children run", "ran the children", "running the children"], a: "ran the children" },
      { q: "So strong _______ that trees were uprooted.", opts: ["the wind was", "was the wind", "did the wind be", "had the wind been"], a: "was the wind" },
      { q: "Such _______ his popularity that he won easily.", opts: ["was", "did", "had", "is"], a: "was" },
      { q: "Not only _______ late, but they also forgot the tickets.", opts: ["they arrived", "arrived they", "did they arrive", "had they arrived"], a: "did they arrive" },
      { q: "Here _______!", opts: ["comes the bus", "the bus comes", "does the bus come", "is the bus coming"], a: "comes the bus" },
      { q: "Away _______.", opts: ["he went", "went he", "did he go", "goes he"], a: "he went" },
      { q: "He doesn't like it, nor _______ I.", opts: ["does", "do", "did", "am"], a: "do" }
    ]
  },
  {
    id: 'c1c2_4', title: '4. Động từ Khuyết thiếu Phức hợp', category: 'Modals', color: 'bg-lime-400',
    theory: [
      { h: 'I. Modals in the Past (Deduction)', c: '📌 Must have + V3: Chắc hẳn đã (có chứng cứ ở QK).\n→ The streets are wet. It must have rained.\n📌 Can\'t have / Couldn\'t have + V3: Chắc chắn KHÔNG thể đã...\n→ He can\'t have stolen the car; he was with me.\n📌 May/Might/Could have + V3: Có lẽ đã...\n→ She might have missed the bus.' },
      { h: 'II. Modals in the Past (Regret & Criticism)', c: '📌 Should have / Ought to have + V3: Lẽ ra nên làm nhưng KHÔNG làm.\n→ You should have told me earlier!\n📌 Shouldn\'t have + V3: Lẽ ra KHÔNG nên làm nhưng ĐÃ làm.\n→ I shouldn\'t have eaten so much cake.\n📌 Needn\'t have + V3: Lẽ ra không cần làm nhưng ĐÃ làm (tốn công vô ích).\n→ You needn\'t have bought flowers, but thank you.\n📌 Didn\'t need to + V: Không cần làm và ĐÃ KHÔNG làm.' },
      { h: 'III. Các dạng Semi-modals', c: '📌 Had better + V = Nên (dùng cho lời khuyên mang tính đe dọa/cảnh báo nếu không làm sẽ có hậu quả).\n→ You had better leave now, or you\'ll miss the flight.\n📌 Would rather + V / Would rather + S + V2/V-ed: Thích/Muốn (hiện tại).\n→ I\'d rather stay home.\n→ I\'d rather you didn\'t tell anyone.' },
      { h: 'IV. Can vs Be able to', c: '📌 Dùng "be able to" cho các thì mà can không có (Future, Perfect, Infinitive).\n→ I will be able to help you tomorrow.\n📌 Dùng "managed to" hoặc "was/were able to" cho việc xoay xở thành công trong MỘT tình huống cụ thể ở quá khứ (không dùng could).\n→ The fire spread quickly, but everyone managed to escape (hoặc was able to escape).' }
    ],
    sentences: [
      { text: "The streets are entirely wet so it must have rained last night", trans: "Đường phố hoàn toàn ướt nên chắc hẳn đêm qua đã mưa" },
      { text: "He can't have committed the crime because he was with me", trans: "Anh ta không thể đã phạm tội vì lúc đó anh ta ở với tôi" },
      { text: "You should have informed me about the changes earlier", trans: "Lẽ ra bạn nên thông báo cho tôi về những thay đổi sớm hơn" },
      { text: "We needn't have cooked so much food since nobody came", trans: "Chúng ta lẽ ra không cần nấu quá nhiều thức ăn vì không ai đến" },
      { text: "They didn't need to wear a uniform at their previous school", trans: "Họ không cần mặc đồng phục ở trường cũ" },
      { text: "You had better apologize to her before she gets really angry", trans: "Tốt hơn hết bạn nên xin lỗi cô ấy trước khi cô ấy thực sự nổi giận" },
      { text: "I would rather you didn't smoke in my car if you don't mind", trans: "Tôi muốn bạn không hút thuốc trong xe của tôi nếu bạn không phiền" },
      { text: "Despite the heavy storm we managed to reach the summit", trans: "Bất chấp cơn bão lớn chúng tôi đã xoay xở lên tới đỉnh" },
      { text: "She might have left her keys at the office by mistake", trans: "Có lẽ cô ấy đã để quên chìa khóa ở văn phòng do nhầm lẫn" },
      { text: "I have never been able to understand his strange behavior", trans: "Tôi chưa bao giờ có thể hiểu được hành vi kỳ lạ của anh ta" }
    ],
    exercises: [
      { q: "The streets are wet. It _______ rained.", opts: ["must have", "can't have", "should have", "needn't have"], a: "must have" },
      { q: "He _______ committed the crime; he was with me.", opts: ["must have", "can't have", "should have", "might have"], a: "can't have" },
      { q: "You _______ told me earlier! Now it's too late.", opts: ["must have", "can't have", "should have", "might have"], a: "should have" },
      { q: "You _______ bought flowers, but thank you.", opts: ["mustn't have", "can't have", "shouldn't have", "needn't have"], a: "needn't have" },
      { q: "We _______ wake up early, so we slept in.", opts: ["didn't need to", "needn't have", "mustn't", "shouldn't have"], a: "didn't need to" },
      { q: "You _______ leave now, or you'll miss the flight.", opts: ["would rather", "had better", "should have", "must have"], a: "had better" },
      { q: "I'd rather you _______ anyone about this.", opts: ["don't tell", "didn't tell", "not tell", "hadn't told"], a: "didn't tell" },
      { q: "The fire spread quickly, but everyone _______ escape.", opts: ["could", "managed to", "can", "might"], a: "managed to" },
      { q: "She _______ missed the bus; she's usually on time.", opts: ["must have", "might have", "should have", "needn't have"], a: "might have" },
      { q: "I will _______ help you tomorrow.", opts: ["can", "could", "be able to", "manage to"], a: "be able to" }
    ]
  },
  {
    id: 'c1c2_5', title: '5. Subjunctive & Unreal Past', category: 'Verbs', color: 'bg-emerald-400',
    theory: [
      { h: 'I. Present Subjunctive (Giả định Hiện tại)', c: '📌 Dùng dạng V (nguyên thể không to) cho TẤT CẢ các ngôi sau các động từ/tính từ thể hiện sự khẩn cấp, yêu cầu (demand, insist, suggest, recommend, vital, crucial, imperative).\n→ It is vital that she arrive on time.\n→ The doctor insisted that he stop smoking.' },
      { h: 'II. Unreal Past (Quá khứ Giả định)', c: '📌 Dùng thì Past Simple để nói về hiện tại trái ngược thực tế.\n→ It\'s (high/about) time S + V2/V-ed: Đã đến lúc phải làm gì.\n→ It\'s high time you started looking for a job.\n📌 Would rather S + V2/V-ed: Muốn người khác làm gì ở hiện tại.\n→ I\'d rather you stayed here with me.' },
      { h: 'III. As if / As though', c: '📌 Nếu sự việc KHÔNG CÓ THẬT ở hiện tại → lùi thì về Quá khứ.\n→ He acts as if he knew everything (nhưng anh ta không biết).\n📌 Nếu sự việc KHÔNG CÓ THẬT ở quá khứ → lùi thì về Quá khứ hoàn thành.\n→ She looked as though she had seen a ghost.\n📌 Nếu sự việc CÓ THỂ THẬT → dùng thì bình thường.\n→ It looks as if it is going to rain.' },
      { h: 'IV. Suppose / Supposing / Imagine', c: '📌 Dùng để đặt giả thiết (trái hiện tại → dùng QK; trái QK → dùng QK hoàn thành).\n→ Suppose you won the lottery, what would you do?\n→ Imagine we hadn\'t met that day!' }
    ],
    sentences: [
      { text: "It is absolutely vital that she arrive at the airport on time", trans: "Việc cô ấy đến sân bay đúng giờ là hoàn toàn quan trọng" },
      { text: "The manager insisted that he wear a suit to the meeting", trans: "Quản lý kiên quyết yêu cầu anh ta mặc vest dự cuộc họp" },
      { text: "It is high time the government took action on climate change", trans: "Đã đến lúc chính phủ phải hành động về biến đổi khí hậu" },
      { text: "I would rather you didn't mention this to anyone else", trans: "Tôi muốn bạn không nhắc chuyện này với ai khác" },
      { text: "He acts as if he owned the entire company", trans: "Anh ta hành động như thể anh ta sở hữu cả công ty" },
      { text: "She looked as though she had been crying for hours", trans: "Cô ấy trông như thể đã khóc hàng giờ đồng hồ" },
      { text: "Suppose you lost your job today what would you do", trans: "Giả sử hôm nay bạn mất việc bạn sẽ làm gì" },
      { text: "Imagine you had been born a hundred years ago", trans: "Hãy tưởng tượng bạn được sinh ra cách đây một trăm năm" },
      { text: "It is imperative that everyone be aware of the new rules", trans: "Bắt buộc mọi người phải nhận thức được các quy định mới" },
      { text: "I'd rather stay home tonight than go out to a club", trans: "Tôi thà ở nhà tối nay còn hơn đi chơi ở câu lạc bộ" }
    ],
    exercises: [
      { q: "It is vital that she _______ on time.", opts: ["arrives", "arrive", "arrived", "is arriving"], a: "arrive" },
      { q: "The doctor insisted that he _______ smoking.", opts: ["stops", "stop", "stopped", "stopping"], a: "stop" },
      { q: "It's high time you _______ looking for a job.", opts: ["start", "started", "had started", "starting"], a: "started" },
      { q: "I'd rather you _______ here with me.", opts: ["stay", "stayed", "had stayed", "staying"], a: "stayed" },
      { q: "He acts as if he _______ everything.", opts: ["knows", "know", "knew", "had known"], a: "knew" },
      { q: "She looked as though she _______ a ghost.", opts: ["saw", "sees", "had seen", "has seen"], a: "had seen" },
      { q: "Suppose you _______ the lottery, what would you do?", opts: ["win", "won", "had won", "have won"], a: "won" },
      { q: "Imagine we _______ met that day!", opts: ["haven't", "didn't", "hadn't", "wouldn't"], a: "hadn't" },
      { q: "It is imperative that everyone _______ present.", opts: ["is", "be", "are", "were"], a: "be" },
      { q: "I'd rather _______ home tonight.", opts: ["stay", "stayed", "staying", "to stay"], a: "stay" }
    ]
  },
  {
    id: 'c1c2_6', title: '6. Câu Điều Kiện Hỗn Hợp & Nâng Cao', category: 'Conditionals', color: 'bg-teal-400',
    theory: [
      { h: 'I. Mixed Conditionals (Hỗn hợp)', c: '📌 Mixed 3-2: Trái với QK → Kết quả trái Hiện tại.\n(If + Past Perfect, S + would + V)\n→ If I had studied harder (QK), I would have a better job now (HT).\n📌 Mixed 2-3: Trái với HT (thường là sự thật/bản chất) → Kết quả trái QK.\n(If + Past Simple, S + would have + V3)\n→ If I were smarter (HT), I would have solved that math problem yesterday (QK).' },
      { h: 'II. Inversion in Conditionals (Đảo ngữ)', c: '📌 Loại 1: Should S + V (Should it rain, we will stay at home)\n📌 Loại 2: Were S + to V / Were S + N/Adj (Were I you, I wouldn\'t do that)\n📌 Loại 3: Had S + V3 (Had he known, he would have come)' },
      { h: 'III. But for / Without', c: '📌 Diễn tả ý "Nếu không có...": dùng cho loại 2 và 3.\n→ But for his help (If he hadn\'t helped), I would have failed.\n→ Without water (If there were no water), life would not exist.' },
      { h: 'IV. As long as / Provided that / On condition that / Unless', c: '📌 Các từ nối thay thế If (với nghĩa Miễn là, Với điều kiện là).\n→ You can borrow the car provided that you drive carefully.\n📌 Unless = If not (Trừ khi).\n→ I won\'t go unless you go with me.' }
    ],
    sentences: [
      { text: "If I had taken your advice I wouldn't be in this mess now", trans: "Nếu tôi nghe lời khuyên của bạn thì bây giờ tôi đã không rắc rối thế này" },
      { text: "If she were a better driver she wouldn't have crashed the car", trans: "Nếu cô ấy lái xe giỏi hơn cô ấy đã không gây tai nạn" },
      { text: "Had I known about the meeting I would have attended", trans: "Nếu tôi biết về cuộc họp tôi đã tham dự" },
      { text: "Were she to accept the offer we would be delighted", trans: "Nếu cô ấy chấp nhận lời đề nghị chúng tôi sẽ rất vui" },
      { text: "Should you need any further assistance please contact us", trans: "Nếu bạn cần hỗ trợ thêm xin vui lòng liên hệ chúng tôi" },
      { text: "But for his generous donation the charity would have closed", trans: "Nếu không có khoản quyên góp hào phóng của ông quỹ từ thiện đã đóng cửa" },
      { text: "Without your guidance I couldn't have completed the project", trans: "Nếu không có sự hướng dẫn của bạn tôi đã không thể hoàn thành dự án" },
      { text: "You can go out provided that you finish your homework first", trans: "Bạn có thể đi chơi miễn là bạn hoàn thành bài tập trước" },
      { text: "I will not sign the contract unless you agree to my terms", trans: "Tôi sẽ không ký hợp đồng trừ khi bạn đồng ý với các điều khoản của tôi" },
      { text: "Assuming that it rains tomorrow what is our backup plan", trans: "Giả sử ngày mai trời mưa kế hoạch dự phòng của chúng ta là gì" }
    ],
    exercises: [
      { q: "If I had studied harder, I _______ a better job now.", opts: ["would have", "would have had", "will have", "had"], a: "would have" },
      { q: "If I were smarter, I _______ that problem yesterday.", opts: ["would solve", "would have solved", "will solve", "solved"], a: "would have solved" },
      { q: "_______ he known, he would have come.", opts: ["If", "Should", "Were", "Had"], a: "Had" },
      { q: "_______ I you, I wouldn't do that.", opts: ["If", "Should", "Were", "Had"], a: "Were" },
      { q: "_______ it rain, we will stay at home.", opts: ["If", "Should", "Were", "Had"], a: "Should" },
      { q: "_______ his help, I would have failed.", opts: ["But for", "Unless", "Provided", "If not"], a: "But for" },
      { q: "You can borrow the car _______ you drive carefully.", opts: ["unless", "but for", "provided that", "without"], a: "provided that" },
      { q: "I won't go _______ you go with me.", opts: ["unless", "if", "provided", "as long as"], a: "unless" },
      { q: "Had we left earlier, we _______ the traffic.", opts: ["would miss", "would have missed", "will miss", "missed"], a: "would have missed" },
      { q: "Were she _______ accept, we would be happy.", opts: ["to", "for", "in", "of"], a: "to" }
    ]
  },
  {
    id: 'c1c2_7', title: '7. Absolute Constructions', category: 'Clauses', color: 'bg-cyan-400',
    theory: [
      { h: 'I. Cấu trúc độc lập (Absolute Clauses)', c: '📌 Gồm: Noun/Pronoun + Participle (V-ing hoặc V3). Thường diễn tả nguyên nhân, điều kiện hoặc hoàn cảnh đi kèm. Khác chủ ngữ với mệnh đề chính.\n→ The weather being fine, we went for a picnic. (Vì thời tiết đẹp...)\n→ All things considered, it is a good idea. (Sau khi cân nhắc mọi thứ...)' },
      { h: 'II. There being / It being', c: '📌 Thay cho "Because there was/is" hoặc "Because it was/is".\n→ There being no bus, we had to walk. (Vì không có xe buýt...)\n→ It being a holiday, the shops were closed.' },
      { h: 'III. With / Without + O + Participle', c: '📌 Mô tả hoàn cảnh, bối cảnh đang diễn ra.\n→ She stood there with tears running down her face. (V-ing vì tears tự run)\n→ He sat in the chair with his eyes closed. (V3 vì eyes bị nhắm)' },
      { h: 'IV. Idiomatic Absolute Phrases', c: '📌 Các cụm cố định thường gặp:\n→ Weather permitting (Nếu thời tiết cho phép)\n→ God willing (Nếu trời thương/cho phép)\n→ Present company excepted (Trừ những người đang có mặt ở đây)' }
    ],
    sentences: [
      { text: "The weather being fine we decided to go for a long walk", trans: "Thời tiết đẹp nên chúng tôi quyết định đi dạo thật lâu" },
      { text: "All things considered we have made a very profitable investment", trans: "Xét về mọi mặt chúng ta đã đầu tư rất sinh lời" },
      { text: "There being no further business the meeting was adjourned", trans: "Vì không còn việc gì nữa nên cuộc họp bị hoãn" },
      { text: "It being Sunday all the local supermarkets were closed", trans: "Vì là Chủ nhật nên mọi siêu thị địa phương đều đóng cửa" },
      { text: "She fell asleep on the sofa with the television still playing", trans: "Cô ấy ngủ thiếp trên sô pha với chiếc tivi vẫn đang bật" },
      { text: "He listened to the sad news with his eyes tightly closed", trans: "Anh ấy lắng nghe tin buồn với đôi mắt nhắm nghiền" },
      { text: "Weather permitting we will host the barbecue in the backyard", trans: "Nếu thời tiết cho phép chúng tôi sẽ tổ chức tiệc nướng ở sân sau" },
      { text: "His money having been stolen he had to sleep on the street", trans: "Bị trộm mất tiền anh ấy phải ngủ ngoài đường" },
      { text: "The sun having set the temperature dropped rapidly", trans: "Khi mặt trời lặn nhiệt độ giảm nhanh chóng" },
      { text: "With so many people watching she felt extremely nervous", trans: "Với bao nhiêu người đang nhìn cô ấy cảm thấy cực kỳ hồi hộp" }
    ],
    exercises: [
      { q: "The weather _______ fine, we went for a picnic.", opts: ["was", "being", "been", "is"], a: "being" },
      { q: "All things _______, it is a good idea.", opts: ["considering", "considered", "consider", "to consider"], a: "considered" },
      { q: "There _______ no bus, we had to walk.", opts: ["was", "is", "being", "been"], a: "being" },
      { q: "It _______ a holiday, the shops were closed.", opts: ["is", "was", "being", "been"], a: "being" },
      { q: "She stood there with tears _______ down her face.", opts: ["run", "running", "ran", "to run"], a: "running" },
      { q: "He sat in the chair with his eyes _______.", opts: ["close", "closing", "closed", "to close"], a: "closed" },
      { q: "Weather _______, we will play baseball tomorrow.", opts: ["permits", "permitting", "permitted", "to permit"], a: "permitting" },
      { q: "The sun _______ set, it grew dark.", opts: ["having", "has", "had", "have"], a: "having" },
      { q: "_______ being no objections, the plan was approved.", opts: ["It", "There", "Here", "They"], a: "There" },
      { q: "With so much work _______, I can't go out.", opts: ["do", "to do", "done", "doing"], a: "to do" }
    ]
  },
  {
    id: 'c1c2_8', title: '8. Rút gọn Mệnh đề Quan hệ (Advanced)', category: 'Clauses', color: 'bg-blue-400',
    theory: [
      { h: 'I. V-ing và V3/V-ed', c: '📌 Rút gọn chủ động dùng V-ing: The man standing there is my brother.\n📌 Rút gọn bị động dùng V3/V-ed: The book written by him is a bestseller.' },
      { h: 'II. Rút gọn thành To-infinitive', c: '📌 Khi danh từ trước đó có the first, the second, the last, the only, the best...\n→ Neil Armstrong was the first man to walk on the moon.\n→ She is the only person to understand me.\n📌 Chú ý bị động: to be + V3\n→ This is the last box to be opened.' },
      { h: 'III. Cụm Giới từ / Danh từ đồng vị (Appositive)', c: '📌 Lược bỏ đại từ quan hệ và động từ to be, để lại cụm giới từ.\n→ The book (which is) on the table is mine.\n📌 Appositive: Bổ sung thông tin cho danh từ kề trước bằng một danh từ/cụm danh từ khác.\n→ Mr. Smith, (who is) an expert in AI, will speak today.' },
      { h: 'IV. Bỏ Đại từ Quan hệ khi làm Tân ngữ', c: '📌 The man (whom) I met yesterday is kind.\n📌 Cẩn thận với giới từ: The house (which) I live in / The house in which I live.' }
    ],
    sentences: [
      { text: "Neil Armstrong was the first man to walk on the moon", trans: "Neil Armstrong là người đầu tiên đi bộ trên mặt trăng" },
      { text: "The students preparing for the exam are very stressed", trans: "Các học sinh đang chuẩn bị cho kỳ thi rất căng thẳng" },
      { text: "The reports written by the manager are always accurate", trans: "Các báo cáo được viết bởi người quản lý luôn chính xác" },
      { text: "She is the only person to have survived the crash", trans: "Cô ấy là người duy nhất sống sót sau vụ tai nạn" },
      { text: "The house located at the corner belongs to my uncle", trans: "Ngôi nhà nằm ở góc đường thuộc về chú tôi" },
      { text: "Mr Brown a famous scientist gave a speech yesterday", trans: "Ông Brown một nhà khoa học nổi tiếng đã phát biểu hôm qua" },
      { text: "This is the most important issue to be discussed today", trans: "Đây là vấn đề quan trọng nhất cần được thảo luận hôm nay" },
      { text: "The man talking to the teacher is my father", trans: "Người đàn ông đang nói chuyện với giáo viên là bố tôi" },
      { text: "The car purchased last year has already broken down", trans: "Chiếc xe được mua năm ngoái đã bị hỏng rồi" },
      { text: "He has a lot of emails to answer before noon", trans: "Anh ấy có rất nhiều email phải trả lời trước buổi trưa" }
    ],
    exercises: [
      { q: "Neil Armstrong was the first man _______ on the moon.", opts: ["walking", "walked", "to walk", "walk"], a: "to walk" },
      { q: "The students _______ for the exam are stressed.", opts: ["prepare", "prepared", "preparing", "to prepare"], a: "preparing" },
      { q: "The book _______ by him is a bestseller.", opts: ["writing", "written", "wrote", "to write"], a: "written" },
      { q: "She is the only person _______ the secret.", opts: ["knowing", "known", "to know", "knows"], a: "to know" },
      { q: "This is the last box _______.", opts: ["opening", "opened", "to be opened", "open"], a: "to be opened" },
      { q: "Mr. Smith, _______ an expert in AI, will speak today.", opts: ["is", "who is", "who", "he is"], a: "who is" },
      { q: "The house _______ I live is very old.", opts: ["in which", "which in", "where in", "that in"], a: "in which" },
      { q: "The man _______ I met yesterday is kind.", opts: ["who", "whom", "which", "whose"], a: "whom" },
      { q: "The products _______ in this factory are exported.", opts: ["making", "made", "to make", "make"], a: "made" },
      { q: "I have some letters _______.", opts: ["typing", "typed", "to type", "type"], a: "to type" }
    ]
  },
  {
    id: 'c1c2_9', title: '9. Nouns & Determiners (Advanced)', category: 'Nouns', color: 'bg-indigo-400',
    theory: [
      { h: 'I. Danh từ tập hợp (Collective Nouns)', c: '📌 Family, Team, Government, Committee, Police, Staff...\n→ Có thể dùng V số ít (nếu coi là một khối) hoặc số nhiều (nhấn mạnh từng cá nhân).\n→ The team is winning. (Một khối)\n→ The team are wearing different shoes. (Cá nhân)\n⚠️ Police, cattle, people LUÔN dùng số nhiều: The police are investigating.' },
      { h: 'II. Danh từ luôn ở số nhiều', c: '📌 Scissors, glasses, trousers, jeans, pyjamas, belongings, goods, stairs, earnings, premises.\n→ My glasses are broken. (Dùng "A pair of glasses" thì số ít).' },
      { h: 'III. Định lượng từ (Quantifiers) đặc biệt', c: '📌 A great deal of / A large amount of + N không đếm được.\n📌 A large number of / A majority of + N đếm được số nhiều.\n📌 Both (cả 2), Either (1 trong 2), Neither (không ai trong 2).\n📌 All (tất cả >2), None (không ai >2).' },
      { h: 'IV. Phân biệt All/Whole, Each/Every', c: '📌 All (the) day = The whole day. Chú ý: whole đứng SAU mạo từ (the whole city), all đứng TRƯỚC mạo từ (all the city).\n📌 Every: dùng cho 3 người/vật trở lên, hoặc tần suất (every 2 days).\n📌 Each: dùng cho 2 người/vật trở lên, nhấn mạnh cá thể.' }
    ],
    sentences: [
      { text: "The police are still investigating the mysterious robbery", trans: "Cảnh sát vẫn đang điều tra vụ cướp bí ẩn" },
      { text: "My trousers are completely ruined after I fell in the mud", trans: "Quần của tôi bị hỏng hoàn toàn sau khi tôi ngã vào bùn" },
      { text: "A great deal of effort has been put into this project", trans: "Một nỗ lực lớn đã được dồn vào dự án này" },
      { text: "A large number of students have registered for the course", trans: "Một số lượng lớn sinh viên đã đăng ký khóa học" },
      { text: "Neither of the two candidates was suitable for the job", trans: "Không ai trong hai ứng viên phù hợp với công việc" },
      { text: "None of the ten applicants met the strict requirements", trans: "Không ai trong mười ứng viên đáp ứng được yêu cầu khắt khe" },
      { text: "I spent the whole day cleaning the house from top to bottom", trans: "Tôi dành trọn cả ngày dọn dẹp nhà cửa từ trên xuống dưới" },
      { text: "All the information you provided was extremely helpful", trans: "Tất cả thông tin bạn cung cấp đều cực kỳ hữu ích" },
      { text: "Each of the participants received a certificate of completion", trans: "Mỗi người tham gia đều nhận được giấy chứng nhận hoàn thành" },
      { text: "We have staff meetings every two weeks to discuss progress", trans: "Chúng tôi họp nhân viên hai tuần một lần để thảo luận tiến độ" }
    ],
    exercises: [
      { q: "The police _______ investigating the robbery.", opts: ["is", "are", "was", "has"], a: "are" },
      { q: "My glasses _______ broken.", opts: ["is", "are", "was", "has"], a: "are" },
      { q: "A great deal of _______ has been wasted.", opts: ["time", "times", "hour", "hours"], a: "time" },
      { q: "A large number of students _______ absent.", opts: ["is", "are", "was", "has"], a: "are" },
      { q: "_______ of the two brothers came to the party.", opts: ["None", "Neither", "All", "Both"], a: "Neither" },
      { q: "_______ of the 10 students passed the exam.", opts: ["None", "Neither", "Every", "Each"], a: "None" },
      { q: "I spent _______ day reading.", opts: ["all", "the whole", "whole the", "every"], a: "the whole" },
      { q: "_______ the students in the class were happy.", opts: ["Whole", "Every", "All", "Each"], a: "All" },
      { q: "He visits his mother _______ 2 weeks.", opts: ["each", "every", "all", "whole"], a: "every" },
      { q: "The cattle _______ grazing in the field.", opts: ["is", "are", "was", "has"], a: "are" }
    ]
  },
  {
    id: 'c1c2_10', title: '10. Substitution & Ellipsis (Lược bỏ)', category: 'Advanced Structures', color: 'bg-violet-400',
    theory: [
      { h: 'I. Đại từ thay thế (Substitution)', c: '📌 Dùng ONE (số ít) / ONES (số nhiều) để thay thế danh từ.\n→ I don\'t like this shirt. Give me the blue one.\n📌 Dùng DO / DOES / DID hoặc DO SO thay thế động từ.\n→ "Will you help me?" "I will do so tomorrow."\n📌 Dùng SO và NOT cho mệnh đề (sau think, believe, hope, suppose, expect, afraid).\n→ "Will it rain?" "I hope not." / "I think so."' },
      { h: 'II. Rút gọn/Lược bỏ (Ellipsis) ở Trợ động từ', c: '📌 Tránh lặp lại bằng cách chỉ dùng trợ động từ.\n→ She can swim, but I can\'t. (Lược bỏ "swim")\n→ He is working, and she is too. (Lược bỏ "working")\n→ I haven\'t seen it, but John has.' },
      { h: 'III. Lược bỏ To-infinitive', c: '📌 Chỉ giữ lại TO khi động từ đã rõ.\n→ I didn\'t want to go, but I had to. (Lược bỏ "go")\n→ You can borrow it if you want to.' },
      { h: 'IV. Lược bỏ trong mệnh đề trạng ngữ', c: '📌 Lược bỏ S + Be khi cùng chủ ngữ với mệnh đề chính.\n→ While (I was) walking to school, I met him.\n→ Though (he was) exhausted, he kept running.' }
    ],
    sentences: [
      { text: "I don't like the red shirt give me the blue one", trans: "Tôi không thích áo sơ mi đỏ hãy đưa tôi cái xanh" },
      { text: "Are they coming to the party tonight I hope so", trans: "Tối nay họ có đến tiệc không tôi hy vọng thế" },
      { text: "He promised to help me clean and he did so", trans: "Anh ấy hứa giúp tôi dọn dẹp và anh ấy đã làm vậy" },
      { text: "She can speak Japanese fluently but her brother cannot", trans: "Cô ấy có thể nói tiếng Nhật trôi chảy nhưng anh trai cô ấy không thể" },
      { text: "I haven't finished the report yet but my colleague has", trans: "Tôi chưa hoàn thành báo cáo nhưng đồng nghiệp tôi đã xong" },
      { text: "I didn't want to attend the meeting but I had to", trans: "Tôi không muốn tham dự cuộc họp nhưng tôi phải đi" },
      { text: "You can stay at my place for the night if you want to", trans: "Bạn có thể ở lại chỗ tôi đêm nay nếu bạn muốn" },
      { text: "While walking home from work I found a lost wallet", trans: "Trong lúc đi bộ từ chỗ làm về nhà tôi nhặt được một chiếc ví rơi" },
      { text: "Though deeply exhausted the marathon runner kept going", trans: "Dù vô cùng kiệt sức vận động viên marathon vẫn tiếp tục chạy" },
      { text: "Is the project going to be cancelled I am afraid so", trans: "Dự án có bị hủy không tôi e là có" }
    ],
    exercises: [
      { q: "I don't like this bag. Give me the red _______.", opts: ["one", "ones", "so", "it"], a: "one" },
      { q: "\"Will it rain?\" - \"I hope _______.\"", opts: ["no", "not", "none", "nothing"], a: "not" },
      { q: "\"Is he coming?\" - \"I think _______.\"", opts: ["it", "that", "so", "yes"], a: "so" },
      { q: "She can swim, but I _______.", opts: ["don't", "can't", "am not", "haven't"], a: "can't" },
      { q: "I haven't seen the movie, but John _______.", opts: ["did", "saw", "has", "does"], a: "has" },
      { q: "I didn't want to go, but I had _______.", opts: ["it", "to", "go", "so"], a: "to" },
      { q: "You can borrow my book if you want _______.", opts: ["it", "to", "borrow", "so"], a: "to" },
      { q: "While _______ to school, I met Tom.", opts: ["walked", "walking", "was walking", "walk"], a: "walking" },
      { q: "Though _______, he kept running.", opts: ["exhausting", "exhausted", "he exhausts", "exhaust"], a: "exhausted" },
      { q: "He asked me to help, and I did _______.", opts: ["it", "so", "that", "to"], a: "so" }
    ]
  },
  {
    id: 'c1c2_11', title: '11. Adjectives & Adverbs (Advanced)', category: 'Modifiers', color: 'bg-fuchsia-400',
    theory: [
      { h: 'I. Trật tự Tính từ (OSASCOMP)', c: '📌 Opinion (Ý kiến) - Size (Kích cỡ) - Age (Tuổi) - Shape (Hình dáng) - Color (Màu) - Origin (Nguồn gốc) - Material (Chất liệu) - Purpose (Mục đích).\n→ A beautiful large old round red Italian wooden dining table.' },
      { h: 'II. Tính từ tuyệt đối (Ungradable Adjectives)', c: '📌 Không dùng với "very". Chỉ dùng với: absolutely, completely, totally, utterly.\n→ absolutely exhausted (không nói very exhausted)\n→ completely destroyed\n→ utterly ridiculous' },
      { h: 'III. Phân biệt tính từ/trạng từ dễ nhầm', c: '📌 Hard (khó, chăm chỉ) vs Hardly (hầu như không).\n📌 Late (trễ) vs Lately (gần đây).\n📌 High (cao) vs Highly (rất, đánh giá cao).\n📌 Deep (sâu - physical) vs Deeply (sâu sắc - emotional).' },
      { h: 'IV. Cấu trúc The + Adjective', c: '📌 The + Adj = Nhóm người (luôn dùng V số nhiều).\n→ The rich are getting richer, and the poor are getting poorer.\n→ The injured were taken to the hospital.' }
    ],
    sentences: [
      { text: "She bought a beautiful large old red Italian wooden table", trans: "Cô ấy mua một cái bàn gỗ Ý màu đỏ cũ lớn đẹp" },
      { text: "After the marathon I was absolutely exhausted and couldn't walk", trans: "Sau cuộc chạy marathon tôi hoàn toàn kiệt sức và không thể đi bộ" },
      { text: "The house was completely destroyed by the fierce hurricane", trans: "Ngôi nhà bị phá hủy hoàn toàn bởi cơn bão dữ dội" },
      { text: "He works hard every day but earns hardly enough money", trans: "Anh ấy làm việc chăm chỉ mỗi ngày nhưng hầu như không kiếm đủ tiền" },
      { text: "I haven't seen her lately so I don't know how she is", trans: "Gần đây tôi không gặp cô ấy nên tôi không biết cô ấy thế nào" },
      { text: "His efforts to save the company were highly appreciated", trans: "Những nỗ lực cứu công ty của anh ấy được đánh giá rất cao" },
      { text: "I was deeply moved by the tragic story of the orphans", trans: "Tôi vô cùng cảm động trước câu chuyện bi thảm của những đứa trẻ mồ côi" },
      { text: "The rich must pay higher taxes to help the poor", trans: "Người giàu phải trả thuế cao hơn để giúp đỡ người nghèo" },
      { text: "The severely injured were immediately taken to the nearest hospital", trans: "Những người bị thương nặng ngay lập tức được đưa đến bệnh viện gần nhất" },
      { text: "It is utterly ridiculous to expect me to work for free", trans: "Thật hoàn toàn nực cười khi mong tôi làm việc miễn phí" }
    ],
    exercises: [
      { q: "She bought a _______ table.", opts: ["wooden red Italian", "red Italian wooden", "Italian red wooden", "wooden Italian red"], a: "red Italian wooden" },
      { q: "After the race, I was _______ exhausted.", opts: ["very", "extremely", "absolutely", "a bit"], a: "absolutely" },
      { q: "The house was _______ destroyed.", opts: ["very", "completely", "extremely", "highly"], a: "completely" },
      { q: "He works _______, but earns _______ anything.", opts: ["hardly / hard", "hard / hardly", "hardly / hardly", "hard / hard"], a: "hard / hardly" },
      { q: "I haven't seen him _______.", opts: ["late", "lately", "latest", "later"], a: "lately" },
      { q: "His work is _______ appreciated.", opts: ["high", "highly", "height", "highest"], a: "highly" },
      { q: "I was _______ moved by the story.", opts: ["deep", "deeply", "depth", "deepest"], a: "deeply" },
      { q: "The rich _______ getting richer.", opts: ["is", "are", "was", "has"], a: "are" },
      { q: "The _______ were taken to the hospital.", opts: ["injured", "injure", "injures", "injuring"], a: "injured" },
      { q: "It is _______ ridiculous to say that.", opts: ["very", "utterly", "extremely", "highly"], a: "utterly" }
    ]
  },
  {
    id: 'c1c2_12', title: '12. So sánh Nâng cao & Thành ngữ', category: 'Comparisons', color: 'bg-rose-400',
    theory: [
      { h: 'I. Modifiers với So sánh hơn', c: '📌 Để nhấn mạnh mức độ lớn: far, much, a lot, significantly, considerably.\n→ He is significantly taller than me.\n📌 Mức độ nhỏ: slightly, a bit, a little, marginally.\n→ The new model is marginally faster.' },
      { h: 'II. Modifiers với So sánh nhất', c: '📌 By far, Easily, Much: đứng trước so sánh nhất.\n→ This is by far the best movie I have seen.\n📌 One of the + superlative + N(số nhiều).\n→ She is one of the brightest students.' },
      { h: 'III. So sánh kép (Double Comparatives)', c: '📌 Càng... càng...: The + comparative, The + comparative.\n→ The more demanding the job (is), the higher the salary (is).\n📌 Kép liên tục: comparative and comparative.\n→ The weather is getting hotter and hotter.' },
      { h: 'IV. Idiomatic Comparisons (Thành ngữ)', c: '📌 As cold as ice (Lạnh như băng)\n📌 As light as a feather (Nhẹ tựa lông hồng)\n📌 As blind as a bat (Mù dở)\n📌 As stubborn as a mule (Cứng đầu)\n📌 As quiet as a mouse (Im bặt)' }
    ],
    sentences: [
      { text: "The new software is significantly faster than the old version", trans: "Phần mềm mới nhanh hơn đáng kể so với phiên bản cũ" },
      { text: "Our sales this quarter are marginally higher than expected", trans: "Doanh số quý này của chúng ta cao hơn một chút so với dự kiến" },
      { text: "That was by far the most challenging exam I have taken", trans: "Đó cho đến nay là bài thi thử thách nhất mà tôi từng làm" },
      { text: "Tokyo is one of the most densely populated cities globally", trans: "Tokyo là một trong những thành phố đông dân nhất toàn cầu" },
      { text: "The more effort you put in the better the results", trans: "Càng nỗ lực nhiều kết quả càng tốt" },
      { text: "Because of global warming the summers are getting hotter and hotter", trans: "Vì trái đất nóng lên mùa hè ngày càng nóng hơn" },
      { text: "He showed no emotion and remained as cold as ice", trans: "Anh ta không bộc lộ cảm xúc và lạnh lùng như băng" },
      { text: "Even though she ate a lot she is as light as a feather", trans: "Dù ăn nhiều cô ấy vẫn nhẹ tựa lông hồng" },
      { text: "Without his glasses my grandfather is as blind as a bat", trans: "Không có kính ông tôi gần như không thấy gì" },
      { text: "Trying to convince him is useless he is as stubborn as a mule", trans: "Thuyết phục anh ta là vô ích anh ta vô cùng bướng bỉnh" }
    ],
    exercises: [
      { q: "He is _______ taller than his brother.", opts: ["significantly", "very", "too", "so"], a: "significantly" },
      { q: "The new car is _______ more expensive.", opts: ["slightly", "very", "too", "so"], a: "slightly" },
      { q: "This is _______ the best restaurant in town.", opts: ["by far", "very", "too", "so much"], a: "by far" },
      { q: "She is one of the _______ students in the class.", opts: ["brightest", "brighter", "bright", "most bright"], a: "brightest" },
      { q: "The harder you work, _______ you become.", opts: ["the successful", "the more successful", "more successful", "most successful"], a: "the more successful" },
      { q: "It's getting _______ and darker.", opts: ["dark", "darker", "darkest", "more dark"], a: "darker" },
      { q: "Her hands were as cold as _______.", opts: ["ice", "water", "snow", "winter"], a: "ice" },
      { q: "This suitcase is as light as a _______.", opts: ["feather", "bird", "cloud", "air"], a: "feather" },
      { q: "Without his glasses, he's as blind as a _______.", opts: ["bat", "rat", "cat", "dog"], a: "bat" },
      { q: "He is as stubborn as a _______.", opts: ["mule", "donkey", "horse", "bull"], a: "mule" }
    ]
  },
  {
    id: 'c1c2_13', title: '13. Prepositional Phrases (Nâng cao)', category: 'Prepositions', color: 'bg-emerald-400',
    theory: [
      { h: 'I. Cụm giới từ phức tạp', c: '📌 In accordance with (Phù hợp với, tuân theo)\n📌 In exchange for (Đổi lấy)\n📌 On behalf of (Thay mặt cho)\n📌 With reference to (Về việc, liên quan đến)\n📌 By means of (Bằng cách)' },
      { h: 'II. Giới từ đi với Tính từ/Phân từ (C1/C2)', c: '📌 Devoid OF (Trống rỗng, không có)\n📌 Exempt FROM (Được miễn)\n📌 Prone TO (Dễ mắc phải)\n📌 Resigned TO (Cam chịu)\n📌 Compatible WITH (Tương thích với)' },
      { h: 'III. Cụm từ cố định (Fixed phrases)', c: '📌 AT random (ngẫu nhiên), AT a loss (bối rối)\n📌 BY coincidence (tình cờ), BY all means (bằng mọi giá / cứ tự nhiên)\n📌 IN vain (vô ích), IN the meantime (trong lúc đó)\n📌 ON edge (bồn chồn), ON second thoughts (nghĩ lại thì)' },
      { h: 'IV. Giới từ sau Danh từ', c: '📌 A breach OF (sự vi phạm)\n📌 A thirst FOR (sự khao khát)\n📌 An exception TO (ngoại lệ)\n📌 A decrease IN (sự suy giảm)' }
    ],
    sentences: [
      { text: "The project was carried out in accordance with safety regulations", trans: "Dự án được thực hiện tuân theo các quy định an toàn" },
      { text: "I am writing this email with reference to your recent inquiry", trans: "Tôi viết email này liên quan đến thắc mắc gần đây của bạn" },
      { text: "On behalf of the company I would like to apologize", trans: "Thay mặt công ty tôi muốn gửi lời xin lỗi" },
      { text: "Charities are usually exempt from paying income tax", trans: "Các tổ chức từ thiện thường được miễn đóng thuế thu nhập" },
      { text: "People who eat poorly are more prone to infections", trans: "Những người ăn uống kém dễ mắc bệnh nhiễm trùng hơn" },
      { text: "He tried to fix the broken computer but in vain", trans: "Anh ta cố sửa chiếc máy tính hỏng nhưng vô ích" },
      { text: "I was at a loss for words when I heard the news", trans: "Tôi đã không nói nên lời khi nghe tin" },
      { text: "On second thoughts maybe we shouldn't buy this expensive car", trans: "Nghĩ lại thì có lẽ chúng ta không nên mua chiếc xe đắt tiền này" },
      { text: "There is an exception to every rule in English grammar", trans: "Có một ngoại lệ cho mọi quy tắc trong ngữ pháp tiếng Anh" },
      { text: "His explanation was completely devoid of any logic or sense", trans: "Lời giải thích của anh ta hoàn toàn không có chút logic hay ý nghĩa nào" }
    ],
    exercises: [
      { q: "The work was done in accordance _______ the rules.", opts: ["to", "with", "for", "of"], a: "with" },
      { q: "I am writing with reference _______ your letter.", opts: ["to", "with", "for", "of"], a: "to" },
      { q: "_______ behalf of the team, I accept this award.", opts: ["In", "On", "At", "By"], a: "On" },
      { q: "Charities are exempt _______ paying tax.", opts: ["to", "from", "for", "with"], a: "from" },
      { q: "He is prone _______ making careless mistakes.", opts: ["to", "from", "for", "with"], a: "to" },
      { q: "He tried to save her, but _______ vain.", opts: ["at", "on", "in", "by"], a: "in" },
      { q: "I was _______ a loss to explain what happened.", opts: ["at", "on", "in", "by"], a: "at" },
      { q: "_______ second thoughts, I'll have tea.", opts: ["At", "On", "In", "By"], a: "On" },
      { q: "This is an exception _______ the rule.", opts: ["of", "to", "for", "with"], a: "to" },
      { q: "His speech was devoid _______ emotion.", opts: ["of", "to", "for", "with"], a: "of" }
    ]
  },
  {
    id: 'c1c2_14', title: '14. Advanced Gerunds & Infinitives', category: 'Verbs', color: 'bg-purple-400',
    theory: [
      { h: 'I. Perfect Infinitive (to have V3)', c: '📌 Diễn tả hành động ĐÃ XẢY RA TRƯỚC thời điểm của động từ chính.\n→ He claims to have met the President. (Anh ta khẳng định đã gặp...)\n→ I am glad to have finished the project.' },
      { h: 'II. Passive Infinitive & Gerund', c: '📌 Passive Infinitive (to be V3): I want to be chosen.\n📌 Perfect Passive Infinitive (to have been V3): He is lucky to have been rescued.\n📌 Passive Gerund (being V3): I hate being told what to do.\n📌 Perfect Passive Gerund (having been V3): He denied having been arrested.' },
      { h: 'III. Verbs + Obj + To V vs V-ing', c: '📌 Force, compel, persuade, allow + Obj + To V.\n→ They forced him to sign the document.\n📌 Catch, find, leave, keep + Obj + V-ing.\n→ I caught him stealing the money.' },
      { h: 'IV. Động từ đổi nghĩa (Stop, Remember, Regret, Try)', c: '📌 Regret + V-ing: Tiếc vì ĐÃ LÀM.\n→ I regret telling him the secret.\n📌 Regret + To V: Rất tiếc PHẢI thông báo (việc sắp làm).\n→ I regret to inform you that you failed.\n📌 Try + V-ing: Thử làm gì.\n📌 Try + To V: Cố gắng làm gì.' }
    ],
    sentences: [
      { text: "He claims to have met the President during his visit", trans: "Anh ta khẳng định đã gặp Tổng thống trong chuyến thăm của ông" },
      { text: "I am absolutely thrilled to have been given this opportunity", trans: "Tôi vô cùng hồi hộp vì đã được trao cơ hội này" },
      { text: "She strongly dislikes being told what to do by others", trans: "Cô ấy cực kỳ không thích bị người khác bảo phải làm gì" },
      { text: "The politician denied having been involved in the massive scandal", trans: "Chính trị gia phủ nhận việc đã dính líu đến vụ bê bối lớn" },
      { text: "They eventually persuaded him to sign the new contract", trans: "Cuối cùng họ đã thuyết phục được anh ta ký hợp đồng mới" },
      { text: "The security guard caught the thief trying to steal a car", trans: "Bảo vệ bắt quả tang tên trộm đang cố ăn cắp xe" },
      { text: "I deeply regret lending him so much money last year", trans: "Tôi vô cùng hối hận vì đã cho anh ta vay quá nhiều tiền năm ngoái" },
      { text: "We regret to inform you that your application was rejected", trans: "Chúng tôi rất tiếc phải thông báo rằng đơn của bạn bị từ chối" },
      { text: "He tried opening the window but it was completely stuck", trans: "Anh ta đã thử mở cửa sổ nhưng nó bị kẹt cứng" },
      { text: "Please remember to turn off all the lights before leaving", trans: "Xin nhớ tắt hết đèn trước khi rời đi" }
    ],
    exercises: [
      { q: "He claims _______ the President.", opts: ["to meet", "to have met", "meeting", "have met"], a: "to have met" },
      { q: "I am glad _______ the project.", opts: ["to finish", "to have finished", "finishing", "finished"], a: "to have finished" },
      { q: "I hate _______ what to do.", opts: ["telling", "being told", "to tell", "to be told"], a: "being told" },
      { q: "He denied _______ arrested.", opts: ["having been", "to have been", "being", "to be"], a: "having been" },
      { q: "They forced him _______ the document.", opts: ["sign", "to sign", "signing", "signed"], a: "to sign" },
      { q: "I caught him _______ the money.", opts: ["steal", "to steal", "stealing", "stolen"], a: "stealing" },
      { q: "I regret _______ him the secret. It was a mistake.", opts: ["tell", "to tell", "telling", "told"], a: "telling" },
      { q: "We regret _______ you that you failed.", opts: ["inform", "to inform", "informing", "informed"], a: "to inform" },
      { q: "If you have a headache, try _______ an aspirin.", opts: ["take", "to take", "taking", "taken"], a: "taking" },
      { q: "I must try _______ hard to pass the exam.", opts: ["study", "to study", "studying", "studied"], a: "to study" }
    ]
  },
  {
    id: 'c1c2_15', title: '15. Advanced Passive Voice', category: 'Verbs', color: 'bg-indigo-400',
    theory: [
      { h: 'I. Impersonal Passive (Bị động khách quan)', c: '📌 Dùng với: say, think, believe, report, know, consider, expect.\n📌 Cách 1: It is said that S + V...\n→ It is reported that the CEO resigned.\n📌 Cách 2: S + is said + to V (nếu cùng thì) / to have V3 (nếu xảy ra trước).\n→ The CEO is reported to have resigned. (Từ chức trước khi báo cáo)\n→ He is known to be a billionaire. (Hiện tại)' },
      { h: 'II. Have/Get something done (Nâng cao)', c: '📌 Nhấn mạnh ai đó chịu đựng việc tồi tệ xảy ra.\n→ He had his car stolen yesterday. (Không phải anh ta nhờ người trộm xe, mà là bị trộm).\n→ They got their roof blown off in the storm.' },
      { h: 'III. Passive với Verbs of Perception (Tri giác)', c: '📌 Active: I saw him cross the road. (Xong rồi)\n→ Passive: He was seen to cross the road.\n📌 Active: I saw him crossing the road. (Đang xảy ra)\n→ Passive: He was seen crossing the road.' },
      { h: 'IV. Passive của Make / Let', c: '📌 Make sb do sth → Be made TO DO sth.\n→ I was made to wait for 2 hours.\n📌 Let sb do sth → Be allowed TO DO sth (Không dùng be let to do).\n→ We were allowed to leave early.' }
    ],
    sentences: [
      { text: "It is widely reported that the CEO resigned yesterday", trans: "Được báo cáo rộng rãi rằng CEO đã từ chức hôm qua" },
      { text: "The suspect is believed to have fled the country", trans: "Kẻ tình nghi được cho là đã trốn khỏi đất nước" },
      { text: "He had his wallet stolen while riding the crowded bus", trans: "Anh ấy bị trộm ví khi đang đi xe buýt đông người" },
      { text: "We got our roof blown off during the severe hurricane", trans: "Chúng tôi bị tốc mái nhà trong cơn bão tồi tệ" },
      { text: "The man was seen to cross the street quickly", trans: "Người đàn ông được nhìn thấy băng qua đường nhanh chóng" },
      { text: "The children were heard singing loudly in the next room", trans: "Bọn trẻ được nghe thấy đang hát lớn ở phòng bên" },
      { text: "We were made to wait in the rain for two hours", trans: "Chúng tôi bị bắt đứng đợi dưới mưa suốt hai tiếng" },
      { text: "Students are not allowed to use their phones during exams", trans: "Học sinh không được phép sử dụng điện thoại trong giờ thi" },
      { text: "She is considered to be the best doctor in the hospital", trans: "Cô ấy được coi là bác sĩ giỏi nhất trong bệnh viện" },
      { text: "It is expected that the new policy will improve productivity", trans: "Người ta kỳ vọng rằng chính sách mới sẽ cải thiện năng suất" }
    ],
    exercises: [
      { q: "It _______ that the CEO resigned.", opts: ["is reported", "reports", "has reported", "reporting"], a: "is reported" },
      { q: "The suspect is believed _______ the country.", opts: ["to flee", "to have fled", "fleeing", "having fled"], a: "to have fled" },
      { q: "He is known _______ a billionaire.", opts: ["be", "to be", "being", "been"], a: "to be" },
      { q: "He had his car _______ yesterday.", opts: ["steal", "stealing", "stolen", "stole"], a: "stolen" },
      { q: "They got their roof _______ off in the storm.", opts: ["blow", "blew", "blown", "blowing"], a: "blown" },
      { q: "He was seen _______ the road.", opts: ["cross", "crossed", "to cross", "crossing"], a: "to cross" },
      { q: "He was seen _______ the road when the accident happened.", opts: ["cross", "crossed", "to cross", "crossing"], a: "crossing" },
      { q: "I was made _______ for 2 hours.", opts: ["wait", "to wait", "waiting", "waited"], a: "to wait" },
      { q: "We were _______ to leave early.", opts: ["let", "make", "allowed", "allow"], a: "allowed" },
      { q: "The painting is reported _______ fake.", opts: ["to be", "be", "being", "been"], a: "to be" }
    ]
  },
  {
    id: 'c1c2_16', title: '16. Advanced Reported Speech', category: 'Clauses', color: 'bg-yellow-400',
    theory: [
      { h: 'I. Reporting Verbs (Động từ tường thuật)', c: '📌 V + To V: agree, offer, promise, refuse, threaten.\n→ He refused to answer the question.\n📌 V + Obj + To V: advise, beg, encourage, invite, order, remind, warn.\n→ She warned him not to touch the wire.\n📌 V + V-ing: admit, deny, mention, suggest.\n→ He denied stealing the money.\n📌 V + Prep + V-ing: apologize for, accuse sb of, blame sb for, congratulate sb on, insist on, object to.\n→ She accused him of lying.' },
      { h: 'II. Lùi thì Nâng cao (Tùy chọn)', c: '📌 Không lùi thì khi: sự thật hiển nhiên, câu điều kiện loại 2/3, hoặc thời gian/địa điểm không đổi so với lúc nói.\n→ "The earth goes around the sun." → He said the earth goes around the sun.\n→ "I will be here tomorrow." (Tường thuật ngay trong ngày hôm đó) → He said he will be here tomorrow.' },
      { h: 'III. Tường thuật câu hỏi và mệnh lệnh', c: '📌 Wh-questions: S + asked + wh-word + S + V (không đảo ngữ).\n→ "Where do you live?" → He asked me where I lived.\n📌 Yes/No questions: S + asked + if/whether + S + V.\n📌 Câu cảm thán: "What a pity!" → He exclaimed that it was a pity.' }
    ],
    sentences: [
      { text: "The suspect firmly refused to answer any questions from police", trans: "Kẻ tình nghi kiên quyết từ chối trả lời bất kỳ câu hỏi nào của cảnh sát" },
      { text: "The teacher encouraged her to apply for the prestigious scholarship", trans: "Giáo viên khuyến khích cô ấy nộp đơn xin học bổng danh giá" },
      { text: "He strongly denied stealing the money from the company safe", trans: "Anh ta kịch liệt phủ nhận việc trộm tiền từ két sắt công ty" },
      { text: "She accused him of deliberately lying about his qualifications", trans: "Cô ấy buộc tội anh ta cố ý nói dối về bằng cấp của mình" },
      { text: "The manager apologized for causing so much inconvenience to everyone", trans: "Người quản lý xin lỗi vì đã gây quá nhiều bất tiện cho mọi người" },
      { text: "He promised to return the borrowed book by next Friday", trans: "Anh ấy hứa sẽ trả lại cuốn sách đã mượn trước thứ Sáu tới" },
      { text: "The scientist explained that water boils at one hundred degrees", trans: "Nhà khoa học giải thích rằng nước sôi ở một trăm độ" },
      { text: "She asked me where I had bought that beautiful dress", trans: "Cô ấy hỏi tôi đã mua chiếc váy đẹp đó ở đâu" },
      { text: "He wondered if she would come to the party tonight", trans: "Anh ta tự hỏi liệu cô ấy có đến bữa tiệc tối nay không" },
      { text: "She exclaimed with joy that she had passed the exam", trans: "Cô ấy reo lên sung sướng rằng cô ấy đã đỗ kỳ thi" }
    ],
    exercises: [
      { q: "He refused _______ the question.", opts: ["answer", "to answer", "answering", "answered"], a: "to answer" },
      { q: "She warned him _______ touch the wire.", opts: ["not", "to not", "not to", "don't"], a: "not to" },
      { q: "He denied _______ the money.", opts: ["steal", "to steal", "stealing", "stolen"], a: "stealing" },
      { q: "She accused him _______ lying.", opts: ["for", "of", "on", "about"], a: "of" },
      { q: "He apologized _______ being late.", opts: ["for", "of", "on", "about"], a: "for" },
      { q: "He promised _______ the book.", opts: ["return", "to return", "returning", "returned"], a: "to return" },
      { q: "He asked me where I _______.", opts: ["live", "did I live", "lived", "do I live"], a: "lived" },
      { q: "She asked _______ I liked coffee.", opts: ["if", "that", "weather", "what"], a: "if" },
      { q: "He insisted _______ paying for the meal.", opts: ["for", "of", "on", "about"], a: "on" },
      { q: "She congratulated him _______ his promotion.", opts: ["for", "of", "on", "about"], a: "on" }
    ]
  },
  {
    id: 'c1c2_17', title: '17. Linking Words & Discourse Markers (C1/C2)', category: 'Connectors', color: 'bg-emerald-300',
    theory: [
      { h: 'I. Thêm thông tin & Nhấn mạnh', c: '📌 What is more, Into the bargain, To make matters worse, Above all.\n→ It was raining, and to make matters worse, we lost our map.\n📌 Indeed, As a matter of fact, In fact (Nhấn mạnh sự thật).' },
      { h: 'II. Nguyên nhân & Hệ quả', c: '📌 In view of, In light of (Bởi vì, xét thấy).\n→ In light of recent events, the trip is cancelled.\n📌 Stem from, Bring about (Gây ra, bắt nguồn từ).\n📌 Accordingly, Consequently, Hence (Vì vậy, do đó).' },
      { h: 'III. Tương phản & Nhượng bộ', c: '📌 Much as (= Although), Be that as it may (= However), Albeit (= Although).\n→ Much as I like him, I can\'t trust him.\n→ He is a good worker, albeit a bit slow.\n📌 On the contrary (Ngược lại hoàn toàn), In contrast (Trái ngược so sánh).' },
      { h: 'IV. Thay đổi chủ đề & Tóm lại', c: '📌 As regards, Regarding, With respect to (Về việc).\n📌 By the way, Incidentally (Nhân tiện).\n📌 In a nutshell, To sum up (Tóm lại).' }
    ],
    sentences: [
      { text: "It was cold and to make matters worse it started raining", trans: "Trời đã lạnh và tệ hơn nữa là trời bắt đầu mưa" },
      { text: "In light of the new evidence the case was reopened", trans: "Xét thấy có bằng chứng mới vụ án đã được mở lại" },
      { text: "Much as I respect him I strongly disagree with his methods", trans: "Dù rất tôn trọng ông ấy nhưng tôi kịch liệt phản đối phương pháp của ông" },
      { text: "He is a highly skilled programmer albeit slightly unorganized", trans: "Anh ta là một lập trình viên tay nghề cao mặc dù hơi thiếu tổ chức" },
      { text: "Be that as it may we still have a deadline to meet", trans: "Dù sao đi nữa chúng ta vẫn có hạn chót phải hoàn thành" },
      { text: "Regarding your request for a refund it is being processed", trans: "Về yêu cầu hoàn tiền của bạn nó đang được xử lý" },
      { text: "Incidentally I met your brother at the supermarket yesterday", trans: "Nhân tiện hôm qua tôi gặp anh trai bạn ở siêu thị" },
      { text: "The failure of the project stemmed from poor initial planning", trans: "Sự thất bại của dự án bắt nguồn từ việc lập kế hoạch ban đầu kém" },
      { text: "He didn't study at all consequently he failed the final exam", trans: "Anh ta không học gì cả do đó anh ta trượt bài thi cuối kỳ" },
      { text: "In a nutshell the entire marketing campaign was a total disaster", trans: "Tóm lại toàn bộ chiến dịch marketing là một thảm họa hoàn toàn" }
    ],
    exercises: [
      { q: "It was raining, and to make matters _______, we got lost.", opts: ["bad", "worse", "worst", "badly"], a: "worse" },
      { q: "In _______ of the new rules, you must wear a helmet.", opts: ["light", "view", "fact", "both A & B"], a: "both A & B" },
      { q: "_______ as I like him, I can't vote for him.", opts: ["Much", "Many", "Although", "Even"], a: "Much" },
      { q: "He is a good player, _______ a bit slow.", opts: ["albeit", "although", "despite", "however"], a: "albeit" },
      { q: "He was late. Be that as it _______, he still did a great job.", opts: ["is", "was", "be", "may"], a: "may" },
      { q: "_______ regards your application, we will contact you soon.", opts: ["In", "As", "With", "For"], a: "As" },
      { q: "I'm going to Paris. _______, do you want me to buy you anything?", opts: ["By the way", "In fact", "In a nutshell", "Hence"], a: "By the way" },
      { q: "His problems stem _______ his lack of confidence.", opts: ["of", "from", "with", "by"], a: "from" },
      { q: "He didn't study. _______, he failed.", opts: ["Consequently", "Albeit", "Much as", "Regarding"], a: "Consequently" },
      { q: "In a _______, we are bankrupt.", opts: ["nutshell", "shell", "nut", "summary"], a: "nutshell" }
    ]
  },
  {
    id: 'c1c2_18', title: '18. Phrasal Verbs (C1/C2 - Part 1)', category: 'Vocabulary', color: 'bg-rose-400',
    theory: [
      { h: 'I. Come & Go', c: '📌 Come across: Tình cờ gặp/thấy.\n📌 Come down with: Mắc bệnh (nhẹ).\n📌 Come into: Thừa kế.\n📌 Go off: Nổ (bom), ôi thiu (thức ăn), reo (chuông).\n📌 Go over: Ôn lại, kiểm tra lại.' },
      { h: 'II. Bring & Take', c: '📌 Bring about: Gây ra.\n📌 Bring up: Nuôi dưỡng, đề cập tới.\n📌 Take after: Giống ai (về ngoại hình/tính cách).\n📌 Take over: Tiếp quản.\n📌 Take up: Bắt đầu một sở thích.' },
      { h: 'III. Look & Make', c: '📌 Look into: Điều tra.\n📌 Look up to: Tôn trọng.\n📌 Make up for: Bù đắp cho.\n📌 Make out: Hiểu, nhận ra (khó khăn).\n📌 Make off with: Trộm và tẩu thoát.' },
      { h: 'IV. Put & Set', c: '📌 Put off: Hoãn lại.\n📌 Put up with: Chịu đựng.\n📌 Set off/out: Khởi hành.\n📌 Set up: Thành lập.' }
    ],
    sentences: [
      { text: "I came across some old photographs while cleaning the attic", trans: "Tôi tình cờ thấy vài bức ảnh cũ khi dọn gác xép" },
      { text: "He came down with a bad cold after walking in the rain", trans: "Anh ấy mắc bệnh cảm nặng sau khi đi dưới mưa" },
      { text: "She came into a fortune when her wealthy grandfather passed away", trans: "Cô ấy thừa kế một gia tài khi người ông giàu có qua đời" },
      { text: "The alarm clock went off at six o'clock this morning", trans: "Đồng hồ báo thức reo lúc sáu giờ sáng nay" },
      { text: "Let's go over the plan one more time before the meeting", trans: "Hãy kiểm tra lại kế hoạch một lần nữa trước cuộc họp" },
      { text: "The new manager will take over the department next week", trans: "Quản lý mới sẽ tiếp quản phòng ban vào tuần tới" },
      { text: "He takes after his father in both looks and personality", trans: "Anh ấy giống bố cả về ngoại hình lẫn tính cách" },
      { text: "She brought up three children all by herself after the divorce", trans: "Cô ấy một mình nuôi dưỡng ba đứa trẻ sau khi ly hôn" },
      { text: "The police are looking into the mysterious disappearance", trans: "Cảnh sát đang điều tra vụ mất tích bí ẩn" },
      { text: "I can't put up with this terrible noise any longer", trans: "Tôi không thể chịu đựng tiếng ồn khủng khiếp này thêm nữa" }
    ],
    exercises: [
      { q: "I came _______ an old friend in the street.", opts: ["across", "down with", "into", "up"], a: "across" },
      { q: "He came _______ a bad flu.", opts: ["across", "down with", "into", "up"], a: "down with" },
      { q: "She came _______ a lot of money when her uncle died.", opts: ["across", "down with", "into", "up"], a: "into" },
      { q: "The milk has gone _______. Don't drink it.", opts: ["off", "over", "out", "on"], a: "off" },
      { q: "We need to go _______ the contract carefully.", opts: ["off", "over", "out", "on"], a: "over" },
      { q: "The crisis was brought _______ by poor management.", opts: ["about", "up", "in", "down"], a: "about" },
      { q: "He takes _______ his father.", opts: ["after", "over", "up", "in"], a: "after" },
      { q: "I decided to take _______ tennis.", opts: ["after", "over", "up", "in"], a: "up" },
      { q: "The police are looking _______ the murder.", opts: ["into", "up to", "for", "after"], a: "into" },
      { q: "I can't put _______ with his behavior.", opts: ["off", "up", "on", "out"], a: "up" }
    ]
  },
  {
    id: 'c1c2_19', title: '19. Phrasal Verbs (C1/C2 - Part 2)', category: 'Vocabulary', color: 'bg-rose-500',
    theory: [
      { h: 'I. Phrasal Verbs nâng cao (A-F)', c: '📌 Break down: Hỏng hóc, suy sụp tinh thần.\n📌 Break into: Đột nhập.\n📌 Call off: Hủy bỏ.\n📌 Cut down on: Cắt giảm.\n📌 Fall out with: Cãi vã, nghỉ chơi với ai.' },
      { h: 'II. Phrasal Verbs nâng cao (G-P)', c: '📌 Get away with: Thoát tội.\n📌 Get round to: Có thời gian để làm việc gì (đã định từ lâu).\n📌 Give off: Tỏa ra (mùi, nhiệt).\n📌 Hold up: Trì hoãn, cướp có vũ trang.\n📌 Pass out: Bất tỉnh.' },
      { h: 'III. Phrasal Verbs nâng cao (R-T)', c: '📌 Run out of: Cạn kiệt, hết sạch.\n📌 Stand for: Viết tắt cho, đại diện cho, chịu đựng.\n📌 Turn down: Từ chối, vặn nhỏ.\n📌 Turn out: Hóa ra là.\n📌 Turn up: Xuất hiện (bất ngờ).' },
      { h: 'IV. Idiomatic Phrasal Verbs', c: '📌 Do away with: Xóa bỏ, thủ tiêu.\n📌 Face up to: Đối mặt với.\n📌 Brush up on: Ôn tập lại kĩ năng.\n📌 Boil down to: Chung quy lại là.' }
    ],
    sentences: [
      { text: "Her car broke down on the highway during rush hour", trans: "Xe của cô ấy bị hỏng trên đường cao tốc vào giờ cao điểm" },
      { text: "The thieves broke into the museum and stole a valuable painting", trans: "Những tên trộm đột nhập bảo tàng và lấy đi một bức tranh quý" },
      { text: "They had to call off the football match because of heavy rain", trans: "Họ phải hủy bỏ trận bóng đá do mưa lớn" },
      { text: "You should cut down on sugar if you want to lose weight", trans: "Bạn nên cắt giảm lượng đường nếu muốn giảm cân" },
      { text: "He got away with cheating on the exam without being caught", trans: "Anh ta trót lọt việc gian lận thi cử mà không bị bắt" },
      { text: "The garbage bin gives off a terrible smell in the summer", trans: "Thùng rác tỏa ra mùi kinh khủng vào mùa hè" },
      { text: "Sorry I'm late I was held up in terrible traffic", trans: "Xin lỗi tôi đến muộn tôi bị kẹt trong đám tắc đường tồi tệ" },
      { text: "We have completely run out of milk so I will buy some", trans: "Chúng ta đã hết sạch sữa rồi nên tôi sẽ đi mua" },
      { text: "He turned down the job offer because the salary was too low", trans: "Anh ta từ chối lời mời làm việc vì lương quá thấp" },
      { text: "We need to face up to the fact that we are losing money", trans: "Chúng ta cần đối mặt với thực tế là chúng ta đang lỗ" }
    ],
    exercises: [
      { q: "My car broke _______ on the way to work.", opts: ["down", "into", "out", "up"], a: "down" },
      { q: "They called _______ the meeting.", opts: ["off", "out", "on", "up"], a: "off" },
      { q: "I need to cut _______ on sugar.", opts: ["down", "out", "off", "up"], a: "down" },
      { q: "He thought he could get _______ with cheating.", opts: ["away", "round", "off", "out"], a: "away" },
      { q: "The cheese is giving _______ a bad smell.", opts: ["off", "out", "up", "away"], a: "off" },
      { q: "We were held _______ in traffic.", opts: ["up", "out", "on", "off"], a: "up" },
      { q: "We have run _______ of gas.", opts: ["out", "off", "away", "down"], a: "out" },
      { q: "She turned _______ the job offer.", opts: ["down", "out", "up", "off"], a: "down" },
      { q: "He finally turned _______ at the party.", opts: ["up", "out", "down", "off"], a: "up" },
      { q: "We must face _______ to reality.", opts: ["up", "out", "down", "off"], a: "up" }
    ]
  },
  {
    id: 'c1c2_20', title: '20. Collocations (C1/C2 - Part 1)', category: 'Vocabulary', color: 'bg-violet-400',
    theory: [
      { h: 'I. Noun Collocations', c: '📌 A stroke of luck (Sự may mắn bất ngờ)\n📌 A sense of humor (Khiếu hài hước)\n📌 A wave of panic (Cơn hoảng loạn)\n📌 A shred of evidence (Một chút bằng chứng)\n📌 A ray of hope (Tia hy vọng)' },
      { h: 'II. Adjective + Noun', c: '📌 Heavy rain/traffic, Strong wind, High probability.\n📌 Utter failure (Thất bại hoàn toàn).\n📌 Vested interest (Quyền lợi gắn liền).\n📌 Ulterior motive (Động cơ sâu xa/mờ ám).\n📌 Blunt refusal (Sự từ chối phũ phàng).' },
      { h: 'III. Verb + Noun', c: '📌 Draw a conclusion (Rút ra kết luận).\n📌 Pose a threat (Tạo ra mối đe dọa).\n📌 Bear a resemblance to (Giống với).\n📌 Shed light on (Làm sáng tỏ).\n📌 Wreak havoc on (Tàn phá).' },
      { h: 'IV. Adverb + Adjective', c: '📌 Bitterly cold (Lạnh buốt).\n📌 Blissfully unaware (Hoàn toàn không biết điều tồi tệ).\n📌 Highly unlikely (Rất khó xảy ra).\n📌 Fiercely competitive (Cạnh tranh khốc liệt).' }
    ],
    sentences: [
      { text: "Winning the lottery was a stroke of luck for the poor family", trans: "Trúng xổ số là một sự may mắn bất ngờ cho gia đình nghèo" },
      { text: "There is not a shred of evidence to support his wild claims", trans: "Không có một chút bằng chứng nào để ủng hộ những tuyên bố hoang đường của anh ta" },
      { text: "The project ended in utter failure despite everyone's hard work", trans: "Dự án kết thúc trong thất bại hoàn toàn bất chấp sự nỗ lực của mọi người" },
      { text: "Climate change poses a serious threat to our planet's future", trans: "Biến đổi khí hậu tạo ra mối đe dọa nghiêm trọng tới tương lai hành tinh chúng ta" },
      { text: "The new findings will shed light on the origin of the universe", trans: "Những phát hiện mới sẽ làm sáng tỏ nguồn gốc của vũ trụ" },
      { text: "The storm wreaked havoc on the coastal villages last night", trans: "Cơn bão đã tàn phá các ngôi làng ven biển đêm qua" },
      { text: "It was bitterly cold outside so we decided to stay indoors", trans: "Ngoài trời lạnh buốt nên chúng tôi quyết định ở trong nhà" },
      { text: "He was blissfully unaware of the danger he was facing", trans: "Anh ta hoàn toàn không biết gì về mối nguy hiểm mình đang đối mặt" },
      { text: "It is highly unlikely that he will win the upcoming election", trans: "Rất khó có khả năng anh ta sẽ thắng cuộc bầu cử sắp tới" },
      { text: "The smartphone market is fiercely competitive nowadays", trans: "Thị trường điện thoại thông minh ngày nay cạnh tranh vô cùng khốc liệt" }
    ],
    exercises: [
      { q: "It was a _______ of luck that I found my keys.", opts: ["stroke", "strike", "hit", "piece"], a: "stroke" },
      { q: "There isn't a _______ of evidence.", opts: ["shred", "piece", "drop", "slice"], a: "shred" },
      { q: "The plan was an _______ failure.", opts: ["utter", "absolute", "entire", "all"], a: "utter" },
      { q: "Pollution _______ a threat to the environment.", opts: ["poses", "makes", "does", "gives"], a: "poses" },
      { q: "This discovery will _______ light on the mystery.", opts: ["shed", "throw", "cast", "all A,B,C"], a: "all A,B,C" },
      { q: "The earthquake wreaked _______ on the city.", opts: ["havoc", "damage", "destruction", "ruin"], a: "havoc" },
      { q: "It is _______ cold outside.", opts: ["bitterly", "highly", "strongly", "heavily"], a: "bitterly" },
      { q: "He is _______ unaware of the problem.", opts: ["blissfully", "happily", "gladly", "joyfully"], a: "blissfully" },
      { q: "It is _______ unlikely that he will come.", opts: ["highly", "strongly", "deeply", "heavily"], a: "highly" },
      { q: "The market is _______ competitive.", opts: ["fiercely", "strongly", "heavily", "deeply"], a: "fiercely" }
    ]
  },
  {
    id: 'c1c2_21', title: '21. Collocations (C1/C2 - Part 2)', category: 'Vocabulary', color: 'bg-fuchsia-500',
    theory: [
      { h: 'I. Verb + Adverb', c: '📌 Rely heavily on (Phụ thuộc nặng nề vào).\n📌 Object strenuously to (Phản đối kịch liệt).\n📌 Deny categorically (Phủ nhận hoàn toàn).\n📌 Recommend thoroughly (Kịch liệt tiến cử).\n📌 Apologize profusely (Xin lỗi rối rít).' },
      { h: 'II. Noun + Verb', c: '📌 The clock ticked (Đồng hồ tích tắc).\n📌 The bomb went off (Bom nổ).\n📌 The wind howled (Gió rít).\n📌 Prices fluctuate (Giá cả biến động).\n📌 Opportunity arises (Cơ hội xuất hiện).' },
      { h: 'III. Business Collocations', c: '📌 Strike a deal (Thỏa thuận thành công).\n📌 Launch a campaign (Phát động chiến dịch).\n📌 Call a meeting (Triệu tập cuộc họp).\n📌 Go bankrupt (Phá sản).\n📌 Meet the deadline (Kịp hạn chót).' },
      { h: 'IV. Academic Collocations', c: '📌 Conduct research (Tiến hành nghiên cứu).\n📌 Plausible explanation (Lời giải thích hợp lý).\n📌 Comprehensive knowledge (Kiến thức toàn diện).\n📌 Empirical evidence (Bằng chứng thực nghiệm).' }
    ],
    sentences: [
      { text: "The country's economy relies heavily on tourism and agriculture", trans: "Nền kinh tế đất nước phụ thuộc nặng nề vào du lịch và nông nghiệp" },
      { text: "He categorically denied having any involvement in the scandal", trans: "Anh ta phủ nhận hoàn toàn việc có bất kỳ dính líu nào đến vụ bê bối" },
      { text: "She apologized profusely for spilling coffee on my laptop", trans: "Cô ấy xin lỗi rối rít vì làm đổ cà phê lên laptop của tôi" },
      { text: "Housing prices fluctuate wildly depending on the current market", trans: "Giá nhà đất biến động dữ dội tùy thuộc vào thị trường hiện tại" },
      { text: "When the opportunity arises you must grab it immediately", trans: "Khi cơ hội xuất hiện bạn phải nắm lấy nó ngay lập tức" },
      { text: "The two companies finally struck a deal after months of negotiation", trans: "Hai công ty cuối cùng đã thỏa thuận thành công sau nhiều tháng đàm phán" },
      { text: "The marketing team launched a campaign to promote the new product", trans: "Đội marketing phát động một chiến dịch để quảng bá sản phẩm mới" },
      { text: "They failed to meet the deadline because of unexpected delays", trans: "Họ thất bại trong việc kịp hạn chót do những sự chậm trễ bất ngờ" },
      { text: "Scientists are conducting research to find a cure for the disease", trans: "Các nhà khoa học đang tiến hành nghiên cứu để tìm cách chữa căn bệnh" },
      { text: "His theory lacks empirical evidence to support its claims", trans: "Lý thuyết của ông ta thiếu bằng chứng thực nghiệm để ủng hộ các tuyên bố" }
    ],
    exercises: [
      { q: "We rely _______ on imports.", opts: ["heavily", "strongly", "deeply", "highly"], a: "heavily" },
      { q: "He _______ denied the accusations.", opts: ["categorically", "heavily", "strongly", "deeply"], a: "categorically" },
      { q: "She apologized _______ for the mistake.", opts: ["profusely", "heavily", "deeply", "strongly"], a: "profusely" },
      { q: "Prices _______ depending on the season.", opts: ["fluctuate", "change", "move", "go"], a: "fluctuate" },
      { q: "When the opportunity _______, take it.", opts: ["arises", "rises", "happens", "comes"], a: "arises" },
      { q: "They _______ a deal after a long negotiation.", opts: ["struck", "made", "did", "hit"], a: "struck" },
      { q: "We need to _______ a campaign.", opts: ["launch", "open", "start", "make"], a: "launch" },
      { q: "It's important to _______ the deadline.", opts: ["meet", "make", "do", "catch"], a: "meet" },
      { q: "They are _______ research on cancer.", opts: ["conducting", "making", "doing", "both A & C"], a: "both A & C" },
      { q: "We need _______ evidence, not just theories.", opts: ["empirical", "real", "true", "factual"], a: "empirical" }
    ]
  },
  {
    id: 'c1c2_22', title: '22. Idioms (C1/C2 - Part 1)', category: 'Idioms', color: 'bg-amber-500',
    theory: [
      { h: 'I. Idioms with Body Parts', c: '📌 Cost an arm and a leg: Rất đắt đỏ.\n📌 See eye to eye: Đồng quan điểm.\n📌 Turn a blind eye to: Nhắm mắt làm ngơ.\n📌 Keep an eye on: Để mắt tới, trông chừng.\n📌 Give someone a hand: Giúp đỡ ai.' },
      { h: 'II. Idioms with Animals', c: '📌 Let the cat out of the bag: Tiết lộ bí mật vô tình.\n📌 Kill two birds with one stone: Một mũi tên trúng hai đích.\n📌 A dark horse: Nhân tố bí ẩn, người ít ai ngờ tới.\n📌 Smell a rat: Nghi ngờ có điều mờ ám.\n📌 Bark up the wrong tree: Hiểu nhầm, tìm sai hướng.' },
      { h: 'III. Idioms with Colors', c: '📌 Out of the blue: Bất ngờ.\n📌 Once in a blue moon: Rất hiếm khi.\n📌 Caught red-handed: Bị bắt quả tang.\n📌 A white lie: Lời nói dối vô hại.\n📌 In the red: Đang mắc nợ, thua lỗ (>< In the black).' },
      { h: 'IV. Idioms with Weather', c: '📌 Under the weather: Cảm thấy ốm nhẹ.\n📌 A breeze: Rất dễ dàng.\n📌 Rain or shine: Dù thế nào đi nữa.\n📌 Steal someone\'s thunder: Cướp công, giành sự chú ý.\n📌 On cloud nine: Rất hạnh phúc.' }
    ],
    sentences: [
      { text: "Buying that sports car cost him an arm and a leg", trans: "Mua chiếc xe thể thao đó tốn của anh ta một khoản tiền rất lớn" },
      { text: "My boss and I rarely see eye to eye on marketing strategies", trans: "Sếp tôi và tôi hiếm khi đồng quan điểm về các chiến lược marketing" },
      { text: "The police cannot turn a blind eye to these illegal activities", trans: "Cảnh sát không thể nhắm mắt làm ngơ trước những hoạt động phi pháp này" },
      { text: "I bought a gift for Mom but my sister let the cat out of the bag", trans: "Tôi mua quà cho mẹ nhưng em gái tôi đã vô tình tiết lộ bí mật" },
      { text: "He is a dark horse in this tournament and might actually win", trans: "Anh ta là nhân tố bí ẩn trong giải đấu này và có thể thực sự giành chiến thắng" },
      { text: "If you think I stole your money you are barking up the wrong tree", trans: "Nếu bạn nghĩ tôi trộm tiền của bạn thì bạn đang tìm sai người rồi" },
      { text: "My old friend called me completely out of the blue yesterday", trans: "Người bạn cũ gọi cho tôi một cách hoàn toàn bất ngờ vào hôm qua" },
      { text: "The thief was caught red-handed trying to open the safe", trans: "Tên trộm bị bắt quả tang đang cố mở két sắt" },
      { text: "I'm feeling a bit under the weather so I will stay home", trans: "Tôi cảm thấy hơi ốm nên tôi sẽ ở nhà" },
      { text: "She passed the exam easily she said it was a breeze", trans: "Cô ấy qua bài thi dễ dàng cô ấy nói nó dễ như ăn kẹo" }
    ],
    exercises: [
      { q: "That diamond ring must have cost an arm and a _______.", opts: ["leg", "foot", "hand", "eye"], a: "leg" },
      { q: "We don't always see _______ to eye on politics.", opts: ["eye", "face", "head", "mind"], a: "eye" },
      { q: "Don't tell anyone! Keep it a secret and don't let the _______ out of the bag.", opts: ["cat", "dog", "bird", "mouse"], a: "cat" },
      { q: "I think he is a _______ horse. He might win the election.", opts: ["dark", "black", "wild", "fast"], a: "dark" },
      { q: "He arrived completely out of the _______.", opts: ["blue", "red", "black", "white"], a: "blue" },
      { q: "He was caught _______-handed stealing the money.", opts: ["red", "black", "blue", "white"], a: "red" },
      { q: "I'm feeling a bit under the _______. I think I have a cold.", opts: ["weather", "rain", "sun", "cloud"], a: "weather" },
      { q: "Don't worry, the test will be a _______.", opts: ["breeze", "wind", "storm", "hurricane"], a: "breeze" },
      { q: "I _______ a rat. Something is wrong here.", opts: ["smell", "see", "hear", "feel"], a: "smell" },
      { q: "You are barking up the wrong _______.", opts: ["tree", "door", "wall", "house"], a: "tree" }
    ]
  },
  {
    id: 'c1c2_23', title: '23. Idioms (C1/C2 - Part 2)', category: 'Idioms', color: 'bg-yellow-500',
    theory: [
      { h: 'I. Idioms with Food', c: '📌 A piece of cake: Rất dễ.\n📌 Spill the beans: Tiết lộ bí mật.\n📌 Take it with a grain of salt: Bán tín bán nghi, không hoàn toàn tin.\n📌 Butter someone up: Nịnh bợ ai đó.\n📌 In a nutshell: Tóm lại.' },
      { h: 'II. Idioms with Time', c: '📌 Beat the clock: Hoàn thành trước hạn chót.\n📌 Call it a day: Nghỉ tay, kết thúc công việc trong ngày.\n📌 In the nick of time: Vừa kịp lúc.\n📌 Around the clock: Suốt ngày đêm (24/7).\n📌 Behind the times: Lạc hậu.' },
      { h: 'III. Idioms with Money', c: '📌 Break the bank: Tốn quá nhiều tiền.\n📌 Make ends meet: Kiếm đủ sống.\n📌 Bread and butter: Nguồn thu nhập chính.\n📌 Born with a silver spoon in one\'s mouth: Sinh ra ngậm thìa vàng.\n📌 Feel the pinch: Gặp khó khăn tài chính.' },
      { h: 'IV. Idioms for Success & Failure', c: '📌 Pass with flying colors: Thi đỗ điểm cao.\n📌 Hit the nail on the head: Nói trúng phóc.\n📌 Miss the boat: Lỡ mất cơ hội.\n📌 Go back to the drawing board: Bắt đầu lại từ đầu vì thất bại.\n📌 A piece of the action: Được chia phần (lợi nhuận/thành công).' }
    ],
    sentences: [
      { text: "I read his story but I took it with a grain of salt", trans: "Tôi đọc câu chuyện của anh ta nhưng chỉ bán tín bán nghi" },
      { text: "He is just buttering you up because he wants a promotion", trans: "Anh ta chỉ đang nịnh bợ bạn vì muốn được thăng chức" },
      { text: "We have been working for ten hours let's call it a day", trans: "Chúng ta đã làm việc mười tiếng rồi hãy nghỉ tay thôi" },
      { text: "The ambulance arrived in the nick of time to save him", trans: "Xe cứu thương đến vừa kịp lúc để cứu anh ấy" },
      { text: "It is hard to make ends meet with such a low salary", trans: "Thật khó để kiếm đủ sống với mức lương thấp như vậy" },
      { text: "Teaching is her passion but writing is her bread and butter", trans: "Dạy học là đam mê nhưng viết lách là nguồn thu nhập chính của cô ấy" },
      { text: "She studied very hard and passed the exam with flying colors", trans: "Cô ấy học rất chăm và thi đỗ với điểm số xuất sắc" },
      { text: "You really hit the nail on the head with that comment", trans: "Bạn thực sự nói trúng phóc với bình luận đó" },
      { text: "If you don't buy the tickets now you will miss the boat", trans: "Nếu bạn không mua vé bây giờ bạn sẽ lỡ mất cơ hội" },
      { text: "The prototype failed so we must go back to the drawing board", trans: "Bản mẫu thất bại nên chúng ta phải bắt đầu lại từ đầu" }
    ],
    exercises: [
      { q: "The exam was a piece of _______.", opts: ["cake", "bread", "pie", "meat"], a: "cake" },
      { q: "Take his advice with a grain of _______.", opts: ["salt", "sugar", "pepper", "rice"], a: "salt" },
      { q: "Let's call it a _______ and go home.", opts: ["day", "night", "time", "week"], a: "day" },
      { q: "He arrived in the _______ of time.", opts: ["nick", "tick", "moment", "second"], a: "nick" },
      { q: "It's hard to make _______ meet.", opts: ["ends", "sides", "lines", "points"], a: "ends" },
      { q: "Teaching is my bread and _______.", opts: ["butter", "jam", "honey", "milk"], a: "butter" },
      { q: "She passed the test with flying _______.", opts: ["colors", "flags", "kites", "birds"], a: "colors" },
      { q: "You hit the _______ on the head.", opts: ["nail", "hammer", "wood", "wall"], a: "nail" },
      { q: "Hurry up or you'll miss the _______.", opts: ["boat", "ship", "train", "bus"], a: "boat" },
      { q: "We have to go back to the drawing _______.", opts: ["board", "table", "desk", "room"], a: "board" }
    ]
  },
  {
    id: 'c1c2_24', title: '24. Punctuation & Spelling Rules', category: 'Grammar Rules', color: 'bg-cyan-500',
    theory: [
      { h: 'I. Dấu phẩy (Comma)', c: '📌 Tách các mệnh đề độc lập (nối bằng and, but, so...).\n📌 Tách mệnh đề phụ đứng đầu câu (If it rains, we will stay).\n📌 Tách mệnh đề quan hệ KHÔNG XÁC ĐỊNH (My father, who is 60, is retired).\n📌 Tách các trạng từ nối (However, Therefore, ...).' },
      { h: 'II. Dấu chấm phẩy (Semicolon) & Dấu hai chấm (Colon)', c: '📌 Semicolon (;): Nối 2 mệnh đề độc lập có liên quan chặt chẽ mà KHÔNG dùng từ nối.\n→ It was raining heavily; we decided to stay indoors.\n📌 Colon (:): Bắt đầu một danh sách, lời giải thích hoặc trích dẫn.\n→ I need three things: a pen, a paper, and a ruler.' },
      { h: 'III. Spelling (Chính tả) cơ bản', c: '📌 Quy tắc "i before e except after c": receive, ceiling, believe, piece.\n(Ngoại lệ: weird, seize, science).\n📌 Thêm đuôi -ing/-ed: Nhân đôi phụ âm nếu từ 1 âm tiết kết thúc bằng 1 nguyên âm + 1 phụ âm (stop → stopped, run → running).\n📌 Anh-Anh vs Anh-Mỹ: colour/color, centre/center, organise/organize.' },
      { h: 'IV. Lỗi chính tả thường gặp (C1/C2)', c: '📌 Accommodate (2 c, 2 m)\n📌 Embarrass (2 r, 2 s)\n📌 Recommend (1 c, 2 m)\n📌 Definitely (tận cùng -ite + ly)\n📌 Separate (có chữ "a" ở giữa: par)' }
    ],
    sentences: [
      { text: "My father who is sixty years old has just retired", trans: "Bố tôi người đã 60 tuổi vừa mới nghỉ hưu" },
      { text: "It was raining heavily therefore we decided to stay indoors", trans: "Trời mưa to vì vậy chúng tôi quyết định ở trong nhà" },
      { text: "We need three ingredients flour sugar and eggs", trans: "Chúng ta cần ba nguyên liệu bột mì đường và trứng" },
      { text: "The hotel can accommodate up to five hundred guests", trans: "Khách sạn có thể chứa tới năm trăm khách" },
      { text: "I was extremely embarrassed when I forgot her name", trans: "Tôi cực kỳ xấu hổ khi quên tên cô ấy" },
      { text: "I would highly recommend this restaurant to anyone", trans: "Tôi chân thành giới thiệu nhà hàng này cho mọi người" },
      { text: "She is definitely going to win the competition this year", trans: "Cô ấy chắc chắn sẽ thắng cuộc thi năm nay" },
      { text: "Please keep the two documents in separate folders", trans: "Vui lòng giữ hai tài liệu trong các thư mục riêng biệt" },
      { text: "I believe that science holds the key to our future", trans: "Tôi tin rằng khoa học nắm giữ chìa khóa cho tương lai chúng ta" },
      { text: "He tried to deceive me but I knew the truth", trans: "Anh ta cố lừa dối tôi nhưng tôi biết sự thật" }
    ],
    exercises: [
      { q: "Which spelling is correct?", opts: ["accomodate", "accommodate", "acommodate", "acomodate"], a: "accommodate" },
      { q: "Which spelling is correct?", opts: ["embarass", "embarrass", "embaress", "embarras"], a: "embarrass" },
      { q: "Which spelling is correct?", opts: ["recomend", "recommend", "reccomend", "reccommend"], a: "recommend" },
      { q: "Which spelling is correct?", opts: ["definatly", "definitely", "definitly", "definately"], a: "definitely" },
      { q: "Which spelling is correct?", opts: ["seperate", "separate", "separete", "separat"], a: "separate" },
      { q: "Which word breaks the 'i before e' rule?", opts: ["believe", "piece", "receive", "weird"], a: "weird" },
      { q: "Which sentence uses the semicolon correctly?", opts: ["I like apples; and bananas.", "It rained; we stayed home.", "He said; hello.", "Because it rained; we stayed."], a: "It rained; we stayed home." },
      { q: "Which spelling is correct?", opts: ["recieve", "receive", "receve", "recive"], a: "receive" },
      { q: "Which spelling is correct?", opts: ["believe", "beleive", "beleve", "belive"], a: "believe" },
      { q: "I have two brothers _______ both live in London.", opts: [", who", "; who", ": who", "who"], a: ", who" }
    ]
  },
  {
    id: 'c1c2_25', title: '25. Tổng ôn (C1/C2 Mixed Grammar)', category: 'Mixed Practice', color: 'bg-slate-500',
    theory: [
      { h: 'I. Ôn tập: Inversion', c: '📌 Nhớ kỹ: Chỉ đảo ngữ ở mệnh đề chính.\n→ Only after he had finished his work did he go home.\n📌 Not only... but also...\n→ Not only is he smart, but he is also hardworking.' },
      { h: 'II. Ôn tập: Modals & Subjunctive', c: '📌 Should have V3 (Trách móc)\n📌 Must have V3 (Suy luận chắc chắn)\n📌 It is essential that S + V(nguyên thể)\n📌 It\'s high time S + V2/V-ed' },
      { h: 'III. Ôn tập: Conditionals & Participles', c: '📌 Mixed conditionals (Trái HT -> Kết quả QK / Trái QK -> Kết quả HT)\n📌 Đảo ngữ câu điều kiện: Had I known, Were I you, Should you need...\n📌 Rút gọn đồng chủ ngữ: Having finished..., Exhausted from work...' },
      { h: 'IV. Bài tập tổng hợp', c: '📌 Phần này tập trung vào các dạng bài tập trộn lẫn tất cả kiến thức C1/C2 đã học, nhằm kiểm tra phản xạ và sự hiểu biết toàn diện của bạn.' }
    ],
    sentences: [
      { text: "Only when you grow up will you understand this", trans: "Chỉ khi bạn lớn lên bạn mới hiểu được điều này" },
      { text: "Had I not seen it with my own eyes I wouldn't have believed it", trans: "Nếu tôi không tận mắt chứng kiến tôi đã không tin" },
      { text: "It is crucial that the document be signed immediately", trans: "Điều quan trọng là tài liệu phải được ký ngay lập tức" },
      { text: "Not only did they lose the match but they also lost their captain", trans: "Họ không những thua trận mà còn mất luôn đội trưởng" },
      { text: "He acts as if he were the boss of this company", trans: "Anh ta hành động như thể anh ta là sếp của công ty này" },
      { text: "Having been delayed by the snow the train arrived late", trans: "Bị tuyết làm chậm trễ chuyến tàu đã đến muộn" },
      { text: "I'd rather you didn't play your music so loudly", trans: "Tôi muốn bạn đừng mở nhạc quá lớn như vậy" },
      { text: "The thief is reported to have escaped through the window", trans: "Tên trộm được báo cáo là đã trốn thoát qua cửa sổ" },
      { text: "She claims to have been working here for ten years", trans: "Cô ấy khẳng định đã làm việc ở đây được mười năm" },
      { text: "But for your timely advice I would have made a huge mistake", trans: "Nếu không có lời khuyên kịp thời của bạn tôi đã phạm sai lầm lớn" }
    ],
    exercises: [
      { q: "Only when he apologizes _______ him.", opts: ["I will forgive", "will I forgive", "do I forgive", "I forgive"], a: "will I forgive" },
      { q: "Had I known, I _______.", opts: ["will come", "would come", "would have come", "came"], a: "would have come" },
      { q: "It is vital that he _______ present.", opts: ["is", "be", "was", "were"], a: "be" },
      { q: "Not only _______ late, but he was also rude.", opts: ["he was", "was he", "did he be", "he is"], a: "was he" },
      { q: "He acts as if he _______ everything.", opts: ["knows", "know", "knew", "had known"], a: "knew" },
      { q: "_______ finished his work, he went home.", opts: ["Having", "Have", "Has", "Had"], a: "Having" },
      { q: "I'd rather you _______ it now.", opts: ["do", "did", "done", "doing"], a: "did" },
      { q: "He is reported _______ the country.", opts: ["to leave", "to have left", "leaving", "left"], a: "to have left" },
      { q: "She claims _______ the President.", opts: ["to meet", "to have met", "meeting", "meet"], a: "to have met" },
      { q: "But for your help, I _______.", opts: ["will fail", "would fail", "would have failed", "failed"], a: "would have failed" },
      { q: "We were made _______ for hours.", opts: ["wait", "to wait", "waiting", "waited"], a: "to wait" },
      { q: "He can't _______ stolen the car; he was with me.", opts: ["have", "has", "had", "having"], a: "have" },
      { q: "The weather _______ fine, we went out.", opts: ["was", "is", "being", "been"], a: "being" },
      { q: "I regret _______ you that you failed.", opts: ["inform", "to inform", "informing", "informed"], a: "to inform" },
      { q: "The _______ you practice, the better you get.", opts: ["more", "much", "most", "many"], a: "more" }
    ]
  }
];

// Build the output structure matching B1/B2
const output = C1C2_TOPICS.map(topic => {
  const sentenceGame = topic.sentences.map((s, i) => ({
    id: i + 1,
    eng: s.text,
    vie: s.trans
  }));

  const exercises = topic.exercises.map((e, i) => ({
    id: i + 1,
    q: e.q,
    opts: e.opts,
    a: e.a
  }));

  return {
    id: topic.id,
    title: topic.title,
    level: 'C1/C2',
    category: topic.category,
    color: topic.color,
    theory: topic.theory,
    sentenceGame,
    exercises
  };
});

const fileContent = `// File: src/data/grammarDataC1C2.js
// Auto-generated C1/C2 Grammar Data (Advanced Level)

export const grammarDataC1C2 = ${JSON.stringify(output, null, 2)};
`;

fs.writeFileSync('src/data/grammarDataC1C2.js', fileContent);
console.log(`Successfully generated grammarDataC1C2.js with ${output.length} topics`);
