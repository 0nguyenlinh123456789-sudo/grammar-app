import fs from 'fs';

const B2_TOPICS = [
  {
    id: 'b2_01', title: '1. Hiện Tại Hoàn Thành Tiếp Diễn', category: 'Tenses', color: 'bg-blue-200',
    theory: [
      { h: 'I. Khi nào dùng?', c: '👉 Hành động bắt đầu ở quá khứ, KÉO DÀI LIÊN TỤC đến hiện tại, nhấn mạnh QUÁ TRÌNH:\n→ I have been studying English for 3 years. (vẫn đang học)\n→ She has been waiting for the bus since 7 AM. (vẫn đang đợi)\n👉 Hành động VỪA KẾT THÚC nhưng để lại DẤU VẾT/KẾT QUẢ:\n→ Why are you so tired? — I have been running. (vừa chạy xong → mệt)\n→ Her eyes are red. She has been crying. (khóc → mắt đỏ)' },
      { h: 'II. Công thức', c: '✅ S + have/has + been + V-ing\n→ I have been working here for 5 years.\n→ She has been cooking all morning.\n\n❌ Phủ định: S + have/has + not + been + V-ing\n→ It hasn\'t been raining lately.\n\n❓ Nghi vấn: Have/Has + S + been + V-ing?\n→ Have you been exercising regularly?' },
      { h: 'III. Present Perfect vs Present Perfect Continuous', c: '📌 PRESENT PERFECT = nhấn mạnh KẾT QUẢ:\n→ I have read 3 books this month. (= 3 cuốn, xong rồi)\n\n📌 PRESENT PERFECT CONTINUOUS = nhấn mạnh QUÁ TRÌNH:\n→ I have been reading all day. (= quá trình đọc, mệt rồi)\n\n⚠️ Stative verbs (know, love, believe...) KHÔNG dùng ở Continuous:\n→ I have known her for 10 years. (KHÔNG: I have been knowing...)' },
      { h: 'IV. Dấu hiệu nhận biết', c: '📌 for + khoảng thời gian, since + mốc thời gian (giống Present Perfect)\n📌 all day/morning/week, recently, lately\n📌 How long have you been + V-ing?' }
    ],
    sentences: [
      { text: "I have been studying English for three years now", trans: "Tôi đã học tiếng Anh được ba năm rồi" },
      { text: "She has been waiting for the bus since seven", trans: "Cô ấy đã đợi xe buýt từ lúc 7 giờ" },
      { text: "They have been living in this city since two thousand ten", trans: "Họ đã sống ở thành phố này từ năm 2010" },
      { text: "He has been working on this project all week", trans: "Anh ấy đã làm dự án này cả tuần" },
      { text: "Why are your hands dirty have you been gardening", trans: "Tại sao tay bạn bẩn vậy bạn đã làm vườn phải không" },
      { text: "I have been trying to call you all morning", trans: "Tôi đã cố gọi cho bạn cả buổi sáng" },
      { text: "She has been feeling unwell for a few days", trans: "Cô ấy đã cảm thấy không khỏe vài ngày" },
      { text: "How long have you been learning to play piano", trans: "Bạn đã học chơi piano bao lâu rồi" },
      { text: "It has been raining heavily since last night", trans: "Trời đã mưa nặng hạt từ tối qua" },
      { text: "We have been planning this trip for months", trans: "Chúng tôi đã lên kế hoạch cho chuyến đi này nhiều tháng" }
    ],
    exercises: [
      { q: "I _______ English for three years.", opts: ["have been studying", "have studied", "am studying", "study"], a: "have been studying" },
      { q: "She _______ for the bus since 7 AM.", opts: ["has waited", "has been waiting", "is waiting", "waits"], a: "has been waiting" },
      { q: "How long _______ you _______ here?", opts: ["have/been living", "do/live", "are/living", "did/live"], a: "have/been living" },
      { q: "Your eyes are red. _______ you _______ ?", opts: ["Have/been crying", "Did/cry", "Are/crying", "Do/cry"], a: "Have/been crying" },
      { q: "He _______ on this project all day.", opts: ["has been working", "has worked", "is working", "works"], a: "has been working" },
      { q: "It _______ since morning.", opts: ["has rained", "has been raining", "is raining", "rains"], a: "has been raining" },
      { q: "I _______ to call you all morning!", opts: ["have been trying", "have tried", "am trying", "try"], a: "have been trying" },
      { q: "She _______ her for 10 years. (know = stative)", opts: ["has been knowing", "has known", "is knowing", "knows"], a: "has known" },
      { q: "They _______ in this house since 2015.", opts: ["have lived", "have been living", "are living", "live"], a: "have been living" },
      { q: "Why are you so dirty? _______ you _______?", opts: ["Have/been gardening", "Did/garden", "Are/gardening", "Do/garden"], a: "Have/been gardening" },
      { q: "I _______ 3 books this month. (result)", opts: ["have been reading", "have read", "am reading", "read"], a: "have read" },
      { q: "She _______ all day. She looks exhausted.", opts: ["has worked", "has been working", "works", "is working"], a: "has been working" },
      { q: "How long _______ it _______?", opts: ["has/been snowing", "did/snow", "is/snowing", "does/snow"], a: "has/been snowing" },
      { q: "We _______ this trip for weeks.", opts: ["have planned", "have been planning", "are planning", "plan"], a: "have been planning" },
      { q: "He _______ (not/feel) well recently.", opts: ["hasn't been feeling", "hasn't felt", "doesn't feel", "isn't feeling"], a: "hasn't been feeling" }
    ]
  },
  {
    id: 'b2_02', title: '2. Quá Khứ Hoàn Thành (Past Perfect)', category: 'Tenses', color: 'bg-amber-300',
    theory: [
      { h: 'I. Khi nào dùng?', c: '👉 Hành động xảy ra TRƯỚC một hành động khác trong quá khứ:\n→ When I arrived, she had already left. (cô ấy đi TRƯỚC khi tôi đến)\n→ I had finished my homework before he called me.\n👉 Trải nghiệm cho đến MỘT THỜI ĐIỂM trong quá khứ:\n→ By the time I was 20, I had visited 10 countries.\n👉 Trong câu điều kiện loại 3 (If + Past Perfect → would have + V3):\n→ If I had studied harder, I would have passed the exam.' },
      { h: 'II. Công thức', c: '✅ S + had + V3 (past participle)\n→ She had gone home before the rain started.\n\n❌ S + had not (hadn\'t) + V3\n→ I hadn\'t seen that movie before.\n\n❓ Had + S + V3?\n→ Had you eaten before the party?' },
      { h: 'III. Dấu hiệu nhận biết', c: '📌 before, after, when, by the time, by + thời gian quá khứ\n📌 already, just, never... before, ever\n📌 Mẫu câu thường gặp:\n→ AFTER + Past Perfect, Past Simple\n→ BEFORE + Past Simple, Past Perfect\n→ BY THE TIME + Past Simple, Past Perfect' },
      { h: 'IV. Past Perfect vs Past Simple', c: '⚠️ PAST SIMPLE: hành động xảy ra theo THỨ TỰ thời gian\n→ I woke up, had breakfast, and went to school. (1→2→3)\n\n⚠️ PAST PERFECT: nhấn mạnh hành động xảy ra TRƯỚC hành động quá khứ khác\n→ When I arrived at school, the class had already started. (class started TRƯỚC → had started)' }
    ],
    sentences: [
      { text: "She had already left when I arrived at the party", trans: "Cô ấy đã rời đi rồi khi tôi đến bữa tiệc" },
      { text: "I had never seen such a beautiful sunset before", trans: "Tôi chưa bao giờ thấy hoàng hôn đẹp như vậy trước đó" },
      { text: "By the time he called me I had finished my work", trans: "Khi anh ấy gọi tôi tôi đã hoàn thành công việc rồi" },
      { text: "After she had eaten dinner she went for a walk", trans: "Sau khi cô ấy ăn tối xong cô ấy đi dạo" },
      { text: "They had lived in London before they moved to Paris", trans: "Họ đã sống ở London trước khi chuyển đến Paris" },
      { text: "The movie had already started when we got there", trans: "Phim đã bắt đầu rồi khi chúng tôi đến" },
      { text: "I realized I had forgotten my keys at home", trans: "Tôi nhận ra tôi đã quên chìa khóa ở nhà" },
      { text: "She had studied French before she went to Paris", trans: "Cô ấy đã học tiếng Pháp trước khi đến Paris" },
      { text: "Had you ever traveled abroad before last year", trans: "Bạn đã bao giờ đi nước ngoài trước năm ngoái chưa" },
      { text: "By two thousand fifteen I had graduated from university", trans: "Vào năm 2015 tôi đã tốt nghiệp đại học" }
    ],
    exercises: [
      { q: "When I arrived, she _______ already _______.", opts: ["had/left", "has/left", "was/leaving", "did/leave"], a: "had/left" },
      { q: "After he _______ dinner, he watched TV.", opts: ["has had", "had had", "was having", "having"], a: "had had" },
      { q: "I _______ never _______ sushi before last night.", opts: ["had/eaten", "have/eaten", "was/eating", "did/eat"], a: "had/eaten" },
      { q: "By the time we arrived, the movie _______.", opts: ["had started", "has started", "started", "was starting"], a: "had started" },
      { q: "She _______ in Paris before she moved to London.", opts: ["has lived", "had lived", "was living", "lived"], a: "had lived" },
      { q: "_______ you _______ the book before the exam?", opts: ["Had/read", "Have/read", "Did/read", "Were/reading"], a: "Had/read" },
      { q: "I realized I _______ my wallet at home.", opts: ["had forgotten", "have forgotten", "forgot", "was forgetting"], a: "had forgotten" },
      { q: "The train _______ already _______ when we got to the station.", opts: ["had/left", "has/left", "was/leaving", "did/leave"], a: "had/left" },
      { q: "Before she _______ to Paris, she _______ French for 2 years.", opts: ["went/had studied", "goes/has studied", "went/studied", "going/had studied"], a: "went/had studied" },
      { q: "By 2020, he _______ three different countries.", opts: ["had visited", "has visited", "visited", "was visiting"], a: "had visited" },
      { q: "After I _______ the email, I called my boss.", opts: ["had read", "have read", "read", "was reading"], a: "had read" },
      { q: "She _______ (not/finish) when the teacher collected the papers.", opts: ["hadn't finished", "hasn't finished", "didn't finish", "wasn't finishing"], a: "hadn't finished" },
      { q: "_______ they ever _______ abroad before 2019?", opts: ["Had/traveled", "Have/traveled", "Did/travel", "Were/traveling"], a: "Had/traveled" },
      { q: "I was tired because I _______ (not/sleep) well.", opts: ["hadn't slept", "haven't slept", "didn't sleep", "wasn't sleeping"], a: "hadn't slept" },
      { q: "By the time she was 25, she _______ her own company.", opts: ["had started", "has started", "started", "was starting"], a: "had started" }
    ]
  },
  {
    id: 'b2_03', title: '3. Câu Bị Động (Passive Voice)', category: 'Voice', color: 'bg-emerald-300',
    theory: [
      { h: 'I. Khi nào dùng Bị Động?', c: '👉 Khi KHÔNG BIẾT hoặc KHÔNG CẦN BIẾT ai thực hiện hành động:\n→ The window was broken. (ai đập? không biết/không quan trọng)\n👉 Khi muốn NHẤN MẠNH vào hành động hoặc người chịu tác động:\n→ The Mona Lisa was painted by Leonardo da Vinci.\n👉 Trong văn phong TRANG TRỌNG (báo cáo, tin tức, khoa học):\n→ The results were published yesterday.' },
      { h: 'II. Công thức tổng quát', c: '✅ S + BE + V3 (past participle) + (by + agent)\n\n📌 Hiện tại đơn: am/is/are + V3 → English is spoken worldwide.\n📌 Hiện tại tiếp diễn: am/is/are + being + V3 → The house is being painted.\n📌 Quá khứ đơn: was/were + V3 → The book was written in 1998.\n📌 Quá khứ tiếp diễn: was/were + being + V3 → The road was being repaired.\n📌 Hiện tại hoàn thành: have/has + been + V3 → The report has been completed.\n📌 Quá khứ hoàn thành: had + been + V3 → The car had been stolen.\n📌 Tương lai đơn: will + be + V3 → The results will be announced.\n📌 Modal verbs: can/must/should + be + V3 → This must be done today.' },
      { h: 'III. Chuyển từ Chủ Động sang Bị Động', c: '📌 Bước 1: Tân ngữ (O) → Chủ ngữ mới\n📌 Bước 2: Động từ → be + V3 (giữ nguyên thì)\n📌 Bước 3: Chủ ngữ cũ → by + agent (có thể bỏ nếu không cần)\n\n✅ Ví dụ:\n→ Active: Tom painted the fence. (Past Simple)\n→ Passive: The fence was painted by Tom.\n\n→ Active: They are building a new school.\n→ Passive: A new school is being built.' },
      { h: 'IV. Lỗi thường gặp', c: '⚠️ SAI: The car was steal. → ĐÚNG: The car was stolen. (phải dùng V3)\n⚠️ SAI: English is speak worldwide. → ĐÚNG: English is spoken worldwide.\n⚠️ SAI: The report has completed. → ĐÚNG: The report has been completed.' }
    ],
    sentences: [
      { text: "English is spoken by millions of people worldwide", trans: "Tiếng Anh được nói bởi hàng triệu người trên thế giới" },
      { text: "The house was built in nineteen fifty five", trans: "Ngôi nhà được xây năm 1955" },
      { text: "A new hospital is being built near the park", trans: "Một bệnh viện mới đang được xây gần công viên" },
      { text: "The report has been completed by the team", trans: "Báo cáo đã được hoàn thành bởi nhóm" },
      { text: "The road was being repaired when we passed by", trans: "Đường đang được sửa khi chúng tôi đi qua" },
      { text: "The results will be announced next Monday morning", trans: "Kết quả sẽ được công bố sáng thứ Hai tới" },
      { text: "This cake was made by my grandmother yesterday", trans: "Bánh này được làm bởi bà tôi hôm qua" },
      { text: "Students must not be allowed to use phones in class", trans: "Học sinh không được phép dùng điện thoại trong lớp" },
      { text: "The meeting has been postponed until next week", trans: "Cuộc họp đã bị hoãn đến tuần sau" },
      { text: "Rice is grown in many Asian countries every year", trans: "Gạo được trồng ở nhiều nước châu Á mỗi năm" }
    ],
    exercises: [
      { q: "English _______ by millions of people.", opts: ["speaks", "is spoken", "spoke", "speaking"], a: "is spoken" },
      { q: "The bridge _______ in 1990.", opts: ["built", "was built", "is built", "has built"], a: "was built" },
      { q: "A new school _______ right now.", opts: ["is building", "is being built", "was built", "has built"], a: "is being built" },
      { q: "The report _______ already _______.", opts: ["has/been completed", "was/completed", "is/completing", "had/completed"], a: "has/been completed" },
      { q: "The car _______ last night.", opts: ["stole", "was stolen", "is stolen", "has stolen"], a: "was stolen" },
      { q: "The results _______ tomorrow.", opts: ["will announce", "will be announced", "are announcing", "announced"], a: "will be announced" },
      { q: "This room must _______ before the guests arrive.", opts: ["clean", "be cleaned", "cleaned", "cleaning"], a: "be cleaned" },
      { q: "The road _______ when we drove past.", opts: ["was being repaired", "was repairing", "repaired", "has been repaired"], a: "was being repaired" },
      { q: "Rice _______ in many Asian countries.", opts: ["grows", "is grown", "growing", "grew"], a: "is grown" },
      { q: "The cake _______ by my grandmother.", opts: ["made", "was made", "is making", "has making"], a: "was made" },
      { q: "The letter _______ yet.", opts: ["hasn't been sent", "hasn't sent", "didn't send", "wasn't sending"], a: "hasn't been sent" },
      { q: "Many houses _______ by the earthquake.", opts: ["destroyed", "were destroyed", "are destroying", "have destroying"], a: "were destroyed" },
      { q: "This song _______ by millions of people.", opts: ["loves", "is loved", "loving", "loved"], a: "is loved" },
      { q: "The meeting _______ until next week.", opts: ["has postponed", "has been postponed", "postponed", "is postponing"], a: "has been postponed" },
      { q: "Phones _______ in the exam room.", opts: ["mustn't use", "mustn't be used", "must not using", "must not used"], a: "mustn't be used" }
    ]
  },
  {
    id: 'b2_04', title: '4. Câu Tường Thuật (Reported Speech)', category: 'Reported Speech', color: 'bg-rose-300',
    theory: [
      { h: 'I. Quy tắc lùi thì', c: '👉 Khi chuyển lời nói trực tiếp → gián tiếp, ĐỘNG TỪ LÙI 1 THÌ:\n📌 Present Simple → Past Simple: "I like tea" → She said she liked tea.\n📌 Present Continuous → Past Continuous: "I am studying" → He said he was studying.\n📌 Present Perfect → Past Perfect: "I have done it" → She said she had done it.\n📌 Past Simple → Past Perfect: "I went home" → He said he had gone home.\n📌 Will → Would: "I will come" → She said she would come.\n📌 Can → Could: "I can swim" → He said he could swim.' },
      { h: 'II. Thay đổi đại từ & trạng từ', c: '📌 ĐẠI TỪ: I → he/she, my → his/her, we → they\n📌 TRẠNG TỪ THỜI GIAN:\n- today → that day\n- tomorrow → the next day / the following day\n- yesterday → the day before / the previous day\n- now → then\n- here → there\n- this → that\n- ago → before' },
      { h: 'III. Câu hỏi gián tiếp', c: '📌 Yes/No questions → S + asked + if/whether + S + V (lùi thì)\n→ "Do you like pizza?" → He asked me if I liked pizza.\n→ "Can you help?" → She asked if I could help.\n\n📌 WH-questions → S + asked + WH-word + S + V (lùi thì)\n→ "Where do you live?" → She asked me where I lived.\n→ "What time is it?" → He asked what time it was.\n\n⚠️ Câu hỏi gián tiếp KHÔNG đảo ngữ, KHÔNG dấu chấm hỏi!' },
      { h: 'IV. Mệnh lệnh & Yêu cầu gián tiếp', c: '📌 Mệnh lệnh: S + told/ordered + O + TO V\n→ "Sit down!" → She told me to sit down.\n📌 Phủ định: S + told + O + NOT TO V\n→ "Don\'t be late!" → He told us not to be late.\n📌 Yêu cầu: S + asked + O + TO V\n→ "Please help me." → She asked me to help her.' }
    ],
    sentences: [
      { text: "She said that she was very tired after working", trans: "Cô ấy nói rằng cô ấy rất mệt sau khi làm việc" },
      { text: "He told me that he had finished his homework", trans: "Anh ấy nói với tôi rằng anh ấy đã xong bài tập" },
      { text: "She asked me where I lived and what I did", trans: "Cô ấy hỏi tôi sống ở đâu và làm nghề gì" },
      { text: "The teacher told us not to be late for class", trans: "Cô giáo bảo chúng tôi đừng đến lớp muộn" },
      { text: "He said he would call me the next day", trans: "Anh ấy nói anh ấy sẽ gọi cho tôi ngày hôm sau" },
      { text: "She asked me if I could help her with the project", trans: "Cô ấy hỏi tôi có thể giúp cô ấy dự án không" },
      { text: "They told us that they were moving to a new city", trans: "Họ nói với chúng tôi rằng họ sẽ chuyển đến thành phố mới" },
      { text: "He asked her what time the train arrived", trans: "Anh ấy hỏi cô ấy mấy giờ tàu đến" },
      { text: "My mother told me to clean my room immediately", trans: "Mẹ tôi bảo tôi dọn phòng ngay lập tức" },
      { text: "She said that she had never been to Japan before", trans: "Cô ấy nói cô ấy chưa bao giờ đến Nhật trước đó" }
    ],
    exercises: [
      { q: "\"I like coffee.\" → She said she _______ coffee.", opts: ["likes", "liked", "liking", "has liked"], a: "liked" },
      { q: "\"I am studying.\" → He said he _______ studying.", opts: ["is", "was", "has been", "will be"], a: "was" },
      { q: "\"I have finished.\" → She said she _______ finished.", opts: ["has", "had", "have", "having"], a: "had" },
      { q: "\"I will come.\" → He said he _______ come.", opts: ["will", "would", "shall", "should"], a: "would" },
      { q: "\"Do you like pizza?\" → He asked me _______ I liked pizza.", opts: ["that", "if", "what", "do"], a: "if" },
      { q: "\"Where do you live?\" → She asked me where I _______.", opts: ["live", "lived", "living", "have lived"], a: "lived" },
      { q: "\"Sit down!\" → She told me _______ down.", opts: ["sit", "to sit", "sitting", "sat"], a: "to sit" },
      { q: "\"Don't be late!\" → He told us _______ late.", opts: ["don't be", "not to be", "to not be", "not be"], a: "not to be" },
      { q: "\"I can swim.\" → He said he _______ swim.", opts: ["can", "could", "may", "might"], a: "could" },
      { q: "\"I went to Paris.\" → She said she _______ to Paris.", opts: ["went", "had gone", "has gone", "goes"], a: "had gone" },
      { q: "He said he would call me the _______ day.", opts: ["next", "tomorrow", "yesterday", "last"], a: "next" },
      { q: "\"Please help me.\" → She asked me _______ her.", opts: ["help", "to help", "helping", "helped"], a: "to help" },
      { q: "\"What time is it?\" → She asked what time it _______.", opts: ["is", "was", "has been", "will be"], a: "was" },
      { q: "She said she _______ never _______ sushi before.", opts: ["had/eaten", "has/eaten", "have/eaten", "was/eating"], a: "had/eaten" },
      { q: "\"Are you coming?\" → He asked me _______ I was coming.", opts: ["that", "whether", "what", "how"], a: "whether" }
    ]
  },
  {
    id: 'b2_05', title: '5. Mệnh Đề Quan Hệ (Relative Clauses)', category: 'Clauses', color: 'bg-sky-300',
    theory: [
      { h: 'I. Đại từ Quan hệ', c: '📌 WHO = thay thế cho NGƯỜI (chủ ngữ): The man who lives next door is a doctor.\n📌 WHOM = thay thế cho NGƯỜI (tân ngữ): The girl whom I met yesterday is nice.\n📌 WHICH = thay thế cho VẬT: The book which I bought is interesting.\n📌 THAT = thay thế cho cả NGƯỜI và VẬT: The movie that we watched was great.\n📌 WHOSE = sở hữu (của ai): The man whose car was stolen called the police.' },
      { h: 'II. Mệnh đề Xác định vs Không xác định', c: '📌 DEFINING (Xác định) - KHÔNG có dấu phẩy, thông tin CẦN THIẾT:\n→ The book that I bought yesterday is great. (cuốn sách NÀO? → cần biết)\n\n📌 NON-DEFINING (Không xác định) - CÓ dấu phẩy, thông tin BỔ SUNG:\n→ My mother, who is a teacher, speaks English well. (đã biết mẹ là ai)\n\n⚠️ THAT không dùng trong mệnh đề KHÔNG xác định!\n→ SAI: My car, that is red, is very fast.\n→ ĐÚNG: My car, which is red, is very fast.' },
      { h: 'III. Rút gọn Mệnh Đề Quan Hệ', c: '📌 V-ing (khi mệnh đề ở dạng CHỦ ĐỘNG):\n→ The man who is sitting there → The man sitting there\n📌 V3/V-ed (khi mệnh đề ở dạng BỊ ĐỘNG):\n→ The letter which was written yesterday → The letter written yesterday\n📌 TO V (khi có the first/last/only hoặc so sánh nhất):\n→ He was the first person who arrived → He was the first person to arrive' },
      { h: 'IV. WHERE/WHEN/WHY', c: '📌 WHERE = in/at which (thay cho nơi chốn):\n→ This is the restaurant where we had dinner. (= at which)\n📌 WHEN = in/on which (thay cho thời gian):\n→ I remember the day when we first met. (= on which)\n📌 WHY = for which (thay cho lý do):\n→ Tell me the reason why you were late. (= for which)' }
    ],
    sentences: [
      { text: "The man who lives next door is a famous doctor", trans: "Người đàn ông sống cạnh nhà là bác sĩ nổi tiếng" },
      { text: "This is the book which my teacher recommended", trans: "Đây là cuốn sách mà giáo viên tôi giới thiệu" },
      { text: "My sister who is a lawyer lives in New York", trans: "Chị gái tôi là luật sư sống ở New York" },
      { text: "The restaurant where we had dinner was excellent", trans: "Nhà hàng nơi chúng tôi ăn tối rất tuyệt vời" },
      { text: "The girl whose phone was stolen called the police", trans: "Cô gái mà điện thoại bị lấy cắp đã gọi cảnh sát" },
      { text: "I remember the day when we first met at school", trans: "Tôi nhớ ngày chúng ta gặp nhau lần đầu ở trường" },
      { text: "He was the first person to arrive at the meeting", trans: "Anh ấy là người đầu tiên đến cuộc họp" },
      { text: "The movie that we watched last night was amazing", trans: "Bộ phim mà chúng tôi xem tối qua rất tuyệt" },
      { text: "London which is the capital of England is very big", trans: "London là thủ đô của Anh rất lớn" },
      { text: "Tell me the reason why you were absent yesterday", trans: "Hãy nói lý do tại sao bạn vắng mặt hôm qua" }
    ],
    exercises: [
      { q: "The man _______ lives next door is a doctor.", opts: ["which", "who", "whom", "whose"], a: "who" },
      { q: "This is the book _______ I bought yesterday.", opts: ["who", "whom", "which", "whose"], a: "which" },
      { q: "The girl _______ I met yesterday is very nice.", opts: ["who", "whom", "which", "whose"], a: "whom" },
      { q: "The boy _______ father is a pilot lives here.", opts: ["who", "whom", "which", "whose"], a: "whose" },
      { q: "This is the restaurant _______ we had dinner.", opts: ["which", "who", "where", "when"], a: "where" },
      { q: "I remember the day _______ we first met.", opts: ["which", "who", "where", "when"], a: "when" },
      { q: "Tell me the reason _______ you were late.", opts: ["which", "who", "where", "why"], a: "why" },
      { q: "London, _______ is the capital, is very large.", opts: ["that", "which", "who", "where"], a: "which" },
      { q: "He was the first person _______ arrive.", opts: ["who", "to", "which", "that"], a: "to" },
      { q: "The man _______ there is my teacher.", opts: ["sitting", "who sitting", "sits", "sat"], a: "sitting" },
      { q: "The letter _______ yesterday has arrived.", opts: ["writing", "written", "wrote", "write"], a: "written" },
      { q: "My mother, _______ is 60, still works every day.", opts: ["that", "who", "which", "whom"], a: "who" },
      { q: "The car _______ he bought is very expensive.", opts: ["who", "whose", "which", "whom"], a: "which" },
      { q: "Do you know the woman _______ is talking to Tom?", opts: ["which", "who", "whom", "whose"], a: "who" },
      { q: "The house in _______ I grew up has been sold.", opts: ["that", "which", "where", "when"], a: "which" }
    ]
  },
  {
    id: 'b2_06', title: '6. Câu Điều Kiện Loại 0, 1, 2, 3', category: 'Conditionals', color: 'bg-purple-300',
    theory: [
      { h: 'I. Loại 0 - Sự thật hiển nhiên', c: '📌 If + Present Simple, Present Simple\n→ If you heat water to 100°C, it boils.\n→ If you mix red and blue, you get purple.\n⚠️ Dùng cho sự thật khoa học, quy luật tự nhiên.' },
      { h: 'II. Loại 1 - Có thể xảy ra (tương lai)', c: '📌 If + Present Simple, Will + V\n→ If it rains tomorrow, I will stay home.\n→ If you study hard, you will pass the exam.\n⚠️ Tình huống CÓ THỂ xảy ra trong tương lai.\n⚠️ Có thể dùng can/may/should thay will.' },
      { h: 'III. Loại 2 - Không có thật (hiện tại)', c: '📌 If + Past Simple, Would + V\n→ If I had a million dollars, I would buy a house.\n→ If she were taller, she would be a model.\n⚠️ Tình huống TRÁI VỚI SỰ THẬT ở hiện tại.\n⚠️ Dùng WERE cho tất cả các ngôi (formal): If I were you...' },
      { h: 'IV. Loại 3 - Không có thật (quá khứ)', c: '📌 If + Past Perfect, Would have + V3\n→ If I had studied harder, I would have passed.\n→ If she had taken the taxi, she wouldn\'t have been late.\n⚠️ Tình huống TRÁI VỚI SỰ THẬT trong QUÁ KHỨ (hối tiếc, giả định).\n⚠️ Không thể thay đổi được vì đã xảy ra rồi.' },
      { h: 'V. Bảng tổng hợp', c: '📌 Loại 0: If + Present → Present (sự thật)\n📌 Loại 1: If + Present → Will + V (có thể xảy ra)\n📌 Loại 2: If + Past → Would + V (không thật ở hiện tại)\n📌 Loại 3: If + Past Perfect → Would have + V3 (không thật ở quá khứ)\n\n⚠️ UNLESS = IF...NOT\n→ Unless you study, you will fail. = If you don\'t study, you will fail.' }
    ],
    sentences: [
      { text: "If you heat ice it melts into water", trans: "Nếu bạn đun nóng đá nó tan thành nước" },
      { text: "If it rains tomorrow I will stay at home", trans: "Nếu mai trời mưa tôi sẽ ở nhà" },
      { text: "If I had more money I would travel around the world", trans: "Nếu tôi có nhiều tiền hơn tôi sẽ đi du lịch vòng quanh thế giới" },
      { text: "If she had studied harder she would have passed", trans: "Nếu cô ấy học chăm hơn cô ấy đã đỗ rồi" },
      { text: "I will call you if I finish work early today", trans: "Tôi sẽ gọi bạn nếu tôi xong việc sớm hôm nay" },
      { text: "If I were you I would accept that job offer", trans: "Nếu tôi là bạn tôi sẽ nhận lời đề nghị công việc đó" },
      { text: "Unless you hurry you will miss the last train", trans: "Trừ khi bạn nhanh lên bạn sẽ lỡ chuyến tàu cuối" },
      { text: "If I had known about the party I would have come", trans: "Nếu tôi biết về bữa tiệc tôi đã đến rồi" },
      { text: "If you mix blue and yellow you get green", trans: "Nếu bạn trộn xanh dương và vàng bạn được xanh lá" },
      { text: "If she spoke English she would get a better job", trans: "Nếu cô ấy nói tiếng Anh cô ấy sẽ có việc tốt hơn" }
    ],
    exercises: [
      { q: "If you _______ water to 100°C, it _______. (Type 0)", opts: ["heat/boils", "heated/would boil", "heat/will boil", "had heated/would have boiled"], a: "heat/boils" },
      { q: "If it _______ tomorrow, I _______ stay home. (Type 1)", opts: ["rains/will", "rained/would", "rains/would", "had rained/would have"], a: "rains/will" },
      { q: "If I _______ rich, I _______ buy a mansion. (Type 2)", opts: ["am/will", "were/would", "was/will", "had been/would have"], a: "were/would" },
      { q: "If she _______ harder, she _______ passed. (Type 3)", opts: ["studies/will", "studied/would", "had studied/would have", "studies/would have"], a: "had studied/would have" },
      { q: "I will call you if I _______ early.", opts: ["finish", "finished", "will finish", "had finished"], a: "finish" },
      { q: "If I _______ you, I would take the job.", opts: ["am", "was", "were", "be"], a: "were" },
      { q: "_______ you hurry, you'll miss the bus.", opts: ["If", "Unless", "When", "While"], a: "Unless" },
      { q: "If I had known, I _______ come.", opts: ["will", "would", "would have", "had"], a: "would have" },
      { q: "If she _______ English, she would get a better job.", opts: ["speaks", "spoke", "had spoken", "will speak"], a: "spoke" },
      { q: "If you mix red and white, you _______ pink.", opts: ["will get", "get", "would get", "got"], a: "get" },
      { q: "If he _______ (not/eat) so much, he wouldn't be sick.", opts: ["doesn't eat", "didn't eat", "hadn't eaten", "won't eat"], a: "didn't eat" },
      { q: "If they _______ the early flight, they wouldn't have missed the meeting.", opts: ["took", "take", "had taken", "would take"], a: "had taken" },
      { q: "I'll help you if you _______ me nicely.", opts: ["ask", "asked", "will ask", "had asked"], a: "ask" },
      { q: "She would be happier if she _______ more free time.", opts: ["has", "had", "will have", "had had"], a: "had" },
      { q: "If I _______ about the sale, I would have bought it.", opts: ["know", "knew", "had known", "will know"], a: "had known" }
    ]
  },
  {
    id: 'b2_07', title: '7. Wish / If only (Câu Ao Ước)', category: 'Conditionals', color: 'bg-pink-300',
    theory: [
      { h: 'I. Ước ở Hiện tại (trái thực tế)', c: '📌 S + WISH + S + V2 (Past Simple)\n→ I wish I were taller. (= Tôi ước tôi cao hơn, nhưng thực tế thấp)\n→ She wishes she had more free time. (= Ước có nhiều thời gian hơn)\n→ I wish I knew the answer. (= Ước tôi biết câu trả lời)\n\n⚠️ Dùng WERE cho tất cả ngôi (formal): I wish I were...' },
      { h: 'II. Ước ở Quá khứ (hối tiếc)', c: '📌 S + WISH + S + HAD + V3 (Past Perfect)\n→ I wish I had studied harder. (= Ước đã học chăm hơn, nhưng không)\n→ She wishes she hadn\'t said that. (= Hối hận đã nói)\n→ I wish I had gone to the party. (= Tiếc đã không đi)' },
      { h: 'III. Ước ở Tương lai (muốn thay đổi)', c: '📌 S + WISH + S + WOULD + V (mong ai đó thay đổi)\n→ I wish it would stop raining. (= Ước trời ngừng mưa)\n→ I wish you would be quiet. (= Ước bạn im lặng)\n\n⚠️ KHÔNG dùng: I wish I would... (chủ ngữ giống nhau)\n→ SAI: I wish I would be taller.\n→ ĐÚNG: I wish I were taller.' },
      { h: 'IV. IF ONLY = Giá mà...', c: '📌 IF ONLY = WISH nhưng MẠNH HƠN, cảm xúc hơn:\n→ If only I were rich! (= Giá mà tôi giàu!)\n→ If only I had listened to my parents! (= Giá mà tôi đã nghe bố mẹ!)\n→ If only it would stop raining! (= Giá mà trời ngừng mưa!)' }
    ],
    sentences: [
      { text: "I wish I could speak French fluently right now", trans: "Tôi ước tôi có thể nói tiếng Pháp trôi chảy" },
      { text: "She wishes she had studied harder for the exam", trans: "Cô ấy ước cô ấy đã học chăm hơn cho kỳ thi" },
      { text: "I wish it would stop raining so we can go out", trans: "Tôi ước trời ngừng mưa để chúng tôi ra ngoài" },
      { text: "If only I were taller I could reach the top shelf", trans: "Giá mà tôi cao hơn tôi có thể lấy kệ trên cùng" },
      { text: "He wishes he had not said those hurtful words", trans: "Anh ấy ước anh ấy đã không nói những lời tổn thương đó" },
      { text: "I wish I had more free time to spend with family", trans: "Tôi ước tôi có nhiều thời gian rảnh hơn cho gia đình" },
      { text: "She wishes she lived closer to her workplace", trans: "Cô ấy ước cô ấy sống gần nơi làm việc hơn" },
      { text: "If only I had taken that job offer last year", trans: "Giá mà tôi đã nhận lời đề nghị việc năm ngoái" },
      { text: "I wish you would stop making so much noise", trans: "Tôi ước bạn ngừng gây ồn ào" },
      { text: "We wish we could travel to Europe this summer", trans: "Chúng tôi ước có thể đi châu Âu mùa hè này" }
    ],
    exercises: [
      { q: "I wish I _______ taller. (present)", opts: ["am", "were", "was being", "will be"], a: "were" },
      { q: "She wishes she _______ harder for the exam. (past)", opts: ["studied", "had studied", "studies", "would study"], a: "had studied" },
      { q: "I wish it _______ stop raining.", opts: ["will", "would", "can", "could"], a: "would" },
      { q: "If only I _______ the answer right now!", opts: ["know", "knew", "had known", "would know"], a: "knew" },
      { q: "He wishes he _______ (not/say) those words.", opts: ["didn't say", "hadn't said", "doesn't say", "wouldn't say"], a: "hadn't said" },
      { q: "I wish I _______ more money. (present)", opts: ["have", "had", "had had", "would have"], a: "had" },
      { q: "She wishes she _______ in a bigger house.", opts: ["lives", "lived", "had lived", "would live"], a: "lived" },
      { q: "If only I _______ that job offer! (past regret)", opts: ["took", "had taken", "take", "would take"], a: "had taken" },
      { q: "I wish you _______ making noise.", opts: ["stop", "stopped", "would stop", "had stopped"], a: "would stop" },
      { q: "We wish we _______ travel this summer.", opts: ["can", "could", "will", "would"], a: "could" },
      { q: "I wish I _______ (not/eat) so much last night.", opts: ["didn't eat", "hadn't eaten", "don't eat", "wouldn't eat"], a: "hadn't eaten" },
      { q: "If only the weather _______ better today!", opts: ["is", "were", "had been", "would be"], a: "were" },
      { q: "She wishes she _______ to the concert yesterday.", opts: ["went", "had gone", "goes", "would go"], a: "had gone" },
      { q: "I wish I _______ drive. I need to learn.", opts: ["can", "could", "will", "would"], a: "could" },
      { q: "If only he _______ listening to me!", opts: ["stops", "stopped", "would stop", "had stopped"], a: "would stop" }
    ]
  },
  {
    id: 'b2_08', title: '8. Gerund vs Infinitive (V-ing vs To V)', category: 'Verb Patterns', color: 'bg-yellow-300',
    theory: [
      { h: 'I. Động từ + V-ing (Gerund)', c: '📌 Các động từ theo sau bởi V-ing:\nenjoy, finish, avoid, mind, suggest, practice, keep, consider, deny, imagine, miss, risk, admit, delay, quit, resist\n\n→ I enjoy reading books. She finished cooking.\n→ He avoids eating fast food. Do you mind waiting?' },
      { h: 'II. Động từ + TO V (Infinitive)', c: '📌 Các động từ theo sau bởi TO V:\nwant, need, hope, plan, decide, promise, agree, refuse, offer, learn, manage, seem, appear, pretend, afford, expect\n\n→ I want to travel. She decided to quit her job.\n→ He promised to call me. They agreed to help.' },
      { h: 'III. Động từ + V-ing hoặc TO V (NGHĨA GIỐNG)', c: '📌 Các động từ dùng cả hai MÀ NGHĨA KHÔNG ĐỔI:\nbegin, start, continue, love, like, hate, prefer\n\n→ I like swimming. = I like to swim.\n→ It started raining. = It started to rain.' },
      { h: 'IV. Động từ + V-ing hoặc TO V (NGHĨA KHÁC)', c: '⚠️ REMEMBER:\n- remember + V-ing = NHỚ ĐÃ LÀM: I remember locking the door. (đã khóa)\n- remember + to V = NHỚ PHẢI LÀM: Remember to lock the door. (nhớ phải khóa)\n\n⚠️ STOP:\n- stop + V-ing = DỪNG LÀM: She stopped smoking. (bỏ hút thuốc)\n- stop + to V = DỪNG LẠI ĐỂ: She stopped to smoke. (dừng để hút thuốc)\n\n⚠️ TRY:\n- try + V-ing = THỬ LÀM: Try pressing the button. (thử nhấn)\n- try + to V = CỐ GẮNG LÀM: Try to finish on time. (cố gắng xong)\n\n⚠️ FORGET:\n- forget + V-ing = QUÊN ĐÃ LÀM: I\'ll never forget meeting you. (quên đã gặp)\n- forget + to V = QUÊN PHẢI LÀM: Don\'t forget to call me. (quên phải gọi)' }
    ],
    sentences: [
      { text: "I enjoy reading books in the evening before bed", trans: "Tôi thích đọc sách vào buổi tối trước khi ngủ" },
      { text: "She decided to quit her job and start a business", trans: "Cô ấy quyết định nghỉ việc và bắt đầu kinh doanh" },
      { text: "He avoided answering the question about his past", trans: "Anh ấy tránh trả lời câu hỏi về quá khứ" },
      { text: "I remember locking the door before I left home", trans: "Tôi nhớ đã khóa cửa trước khi rời nhà" },
      { text: "Please remember to turn off the lights tonight", trans: "Vui lòng nhớ tắt đèn tối nay" },
      { text: "She stopped smoking two years ago for her health", trans: "Cô ấy bỏ hút thuốc hai năm trước vì sức khỏe" },
      { text: "He tried to fix the computer but he could not", trans: "Anh ấy cố sửa máy tính nhưng không được" },
      { text: "Do you mind opening the window for some fresh air", trans: "Bạn có phiền mở cửa sổ cho thoáng không" },
      { text: "They agreed to help us with the project next week", trans: "Họ đồng ý giúp chúng tôi với dự án tuần tới" },
      { text: "I suggest going to the new Italian restaurant tonight", trans: "Tôi đề nghị đi nhà hàng Ý mới tối nay" }
    ],
    exercises: [
      { q: "I enjoy _______ books.", opts: ["read", "reading", "to read", "reads"], a: "reading" },
      { q: "She decided _______ her job.", opts: ["quit", "quitting", "to quit", "quits"], a: "to quit" },
      { q: "He avoided _______ the difficult question.", opts: ["answer", "answering", "to answer", "answers"], a: "answering" },
      { q: "I want _______ to Europe next summer.", opts: ["travel", "traveling", "to travel", "travels"], a: "to travel" },
      { q: "Do you mind _______ the window?", opts: ["open", "opening", "to open", "opens"], a: "opening" },
      { q: "She promised _______ on time.", opts: ["arrive", "arriving", "to arrive", "arrives"], a: "to arrive" },
      { q: "He finished _______ his homework.", opts: ["do", "doing", "to do", "does"], a: "doing" },
      { q: "I remember _______ the door. (= I did lock it)", opts: ["lock", "locking", "to lock", "locked"], a: "locking" },
      { q: "Remember _______ the lights! (= don't forget)", opts: ["turning off", "to turn off", "turn off", "turned off"], a: "to turn off" },
      { q: "She stopped _______. (= she quit the habit)", opts: ["smoke", "smoking", "to smoke", "smoked"], a: "smoking" },
      { q: "He stopped _______ a coffee. (= paused to drink)", opts: ["have", "having", "to have", "had"], a: "to have" },
      { q: "They agreed _______ us with the project.", opts: ["help", "helping", "to help", "helped"], a: "to help" },
      { q: "I suggest _______ to the new restaurant.", opts: ["go", "going", "to go", "went"], a: "going" },
      { q: "She keeps _______ the same mistakes.", opts: ["make", "making", "to make", "made"], a: "making" },
      { q: "Try _______ this button. Maybe it works.", opts: ["press", "pressing", "to press", "pressed"], a: "pressing" }
    ]
  },
  {
    id: 'b2_09', title: '9. Phrasal Verbs Thông Dụng', category: 'Vocabulary', color: 'bg-orange-300',
    theory: [
      { h: 'I. Phrasal Verb là gì?', c: '👉 Là sự kết hợp ĐỘNG TỪ + GIỚI TỪ/TRẠNG TỪ tạo nghĩa MỚI:\n→ give up = bỏ cuộc (KHÔNG phải "cho lên")\n→ look after = chăm sóc (KHÔNG phải "nhìn sau")\n→ turn on = bật (KHÔNG phải "quay trên")\n\n⚠️ Nghĩa phrasal verb thường KHÁC HOÀN TOÀN nghĩa từng từ riêng lẻ!' },
      { h: 'II. Tách được (Separable) vs Không tách được', c: '📌 TÁCH ĐƯỢC: có thể đặt tân ngữ ở GIỮA hoặc SAU:\n→ Turn on the light. = Turn the light on. = Turn it on.\n⚠️ Nếu tân ngữ là ĐẠI TỪ → PHẢI đặt ở giữa:\n→ Turn it on. (KHÔNG: Turn on it.)\n\n📌 KHÔNG TÁCH ĐƯỢC: tân ngữ LUÔN đứng SAU:\n→ Look after the children. (KHÔNG: Look the children after)\n→ Look after them. (KHÔNG: Look them after)' },
      { h: 'III. Phrasal Verbs thường gặp nhất', c: '📌 get up = dậy | give up = bỏ cuộc | look for = tìm kiếm\n📌 look after = chăm sóc | turn on/off = bật/tắt\n📌 pick up = nhặt/đón | put on = mặc vào | take off = cởi ra/cất cánh\n📌 come back = quay lại | find out = phát hiện | carry on = tiếp tục\n📌 put off = hoãn lại | set up = thành lập | bring up = nuôi dưỡng\n📌 run out of = hết | look forward to = mong chờ\n📌 get on with = hòa hợp | keep up with = theo kịp' },
      { h: 'IV. Các nhóm hay gặp trong thi cử', c: '📌 BREAK: break down (hỏng), break up (chia tay), break into (đột nhập)\n📌 COME: come across (tình cờ gặp), come up with (nghĩ ra)\n📌 GET: get over (vượt qua), get along with (hòa thuận)\n📌 GO: go on (tiếp tục), go off (nổ/reo), go through (trải qua)\n📌 TURN: turn down (từ chối), turn up (xuất hiện), turn into (biến thành)' }
    ],
    sentences: [
      { text: "I usually get up at six o clock every morning", trans: "Tôi thường thức dậy lúc 6 giờ mỗi sáng" },
      { text: "She gave up smoking last year for her health", trans: "Cô ấy bỏ hút thuốc năm ngoái vì sức khỏe" },
      { text: "Can you look after the children while I am out", trans: "Bạn có thể trông bọn trẻ khi tôi ra ngoài không" },
      { text: "Please turn off the lights before you leave", trans: "Xin hãy tắt đèn trước khi rời đi" },
      { text: "I am looking forward to meeting you next week", trans: "Tôi đang mong chờ gặp bạn tuần tới" },
      { text: "We have run out of milk so I need to buy some", trans: "Chúng tôi đã hết sữa nên tôi cần mua thêm" },
      { text: "She came up with a brilliant idea for the project", trans: "Cô ấy nghĩ ra một ý tưởng tuyệt vời cho dự án" },
      { text: "He turned down the job offer because of low salary", trans: "Anh ấy từ chối lời đề nghị việc vì lương thấp" },
      { text: "The car broke down on the highway last night", trans: "Chiếc xe bị hỏng trên đường cao tốc tối qua" },
      { text: "I need to find out the truth about what happened", trans: "Tôi cần tìm ra sự thật về chuyện đã xảy ra" }
    ],
    exercises: [
      { q: "I _______ at 6 AM every morning.", opts: ["get up", "get on", "get over", "get in"], a: "get up" },
      { q: "She _______ smoking last year.", opts: ["gave up", "gave in", "gave off", "gave out"], a: "gave up" },
      { q: "Can you _______ my cat while I'm away?", opts: ["look for", "look after", "look up", "look into"], a: "look after" },
      { q: "Please _______ the TV. It's too loud.", opts: ["turn on", "turn off", "turn up", "turn into"], a: "turn off" },
      { q: "We've _______ of sugar. Can you buy some?", opts: ["run out", "run over", "run into", "run away"], a: "run out" },
      { q: "He _______ the job offer. (refused)", opts: ["turned on", "turned off", "turned down", "turned up"], a: "turned down" },
      { q: "The car _______ on the highway.", opts: ["broke in", "broke up", "broke out", "broke down"], a: "broke down" },
      { q: "She _______ a great idea yesterday.", opts: ["came up with", "came across", "came over", "came back"], a: "came up with" },
      { q: "I'm _______ to seeing you!", opts: ["looking forward", "looking after", "looking for", "looking up"], a: "looking forward" },
      { q: "Can you _______ this word in the dictionary?", opts: ["look for", "look after", "look up", "look into"], a: "look up" },
      { q: "Put _______ your coat. It's cold outside.", opts: ["on", "off", "up", "down"], a: "on" },
      { q: "The plane _______ at 3 PM.", opts: ["took on", "took off", "took up", "took over"], a: "took off" },
      { q: "I need to _______ what happened.", opts: ["find up", "find out", "find off", "find in"], a: "find out" },
      { q: "Don't _______ the meeting until next week.", opts: ["put on", "put off", "put up", "put down"], a: "put off" },
      { q: "She _______ with her neighbors very well.", opts: ["gets on", "gets up", "gets off", "gets over"], a: "gets on" }
    ]
  },
  {
    id: 'b2_10', title: '10. Modal Verbs Nâng Cao', category: 'Modals', color: 'bg-indigo-300',
    theory: [
      { h: 'I. Suy luận ở Hiện tại', c: '📌 MUST = chắc chắn là (99%): She must be at home. (chắc chắn ở nhà)\n📌 CAN\'T = chắc chắn KHÔNG: He can\'t be serious. (không thể nghiêm túc)\n📌 MIGHT/MAY/COULD = có thể (50%): She might be sleeping. (có thể đang ngủ)\n\n👉 + be + V-ing (hành động đang xảy ra):\n→ He must be working right now.\n→ She can\'t be studying. She\'s watching TV.' },
      { h: 'II. Suy luận ở Quá khứ', c: '📌 MUST HAVE + V3 = chắc chắn ĐÃ:\n→ She must have forgotten. (chắc đã quên)\n📌 CAN\'T/COULDN\'T HAVE + V3 = chắc chắn ĐÃ KHÔNG:\n→ He can\'t have done that! (không thể đã làm)\n📌 MIGHT/MAY/COULD HAVE + V3 = có thể ĐÃ:\n→ She might have lost her phone. (có thể đã mất)' },
      { h: 'III. SHOULD HAVE + V3 (Lẽ ra nên)', c: '📌 Lẽ ra NÊN nhưng KHÔNG LÀM:\n→ You should have told me earlier. (lẽ ra nên nói sớm hơn)\n📌 Lẽ ra KHÔNG NÊN nhưng ĐÃ LÀM:\n→ I shouldn\'t have eaten so much. (lẽ ra không nên ăn nhiều)' },
      { h: 'IV. NEEDN\'T HAVE + V3 vs DIDN\'T NEED TO', c: '📌 NEEDN\'T HAVE + V3 = KHÔNG CẦN nhưng ĐÃ LÀM:\n→ You needn\'t have bought milk. We already had some. (đã mua nhưng không cần)\n📌 DIDN\'T NEED TO + V = KHÔNG CẦN và KHÔNG LÀM:\n→ I didn\'t need to buy milk. (= không cần nên không mua)' }
    ],
    sentences: [
      { text: "She must be very tired after working all day", trans: "Cô ấy chắc chắn rất mệt sau khi làm việc cả ngày" },
      { text: "He can not be serious about quitting his job", trans: "Anh ấy không thể nghiêm túc về việc nghỉ việc" },
      { text: "They might have forgotten about the meeting today", trans: "Họ có thể đã quên về cuộc họp hôm nay" },
      { text: "You should have told me about the problem earlier", trans: "Bạn lẽ ra nên nói cho tôi về vấn đề sớm hơn" },
      { text: "She must have left her phone at the office", trans: "Cô ấy chắc đã để quên điện thoại ở văn phòng" },
      { text: "He could be sleeping right now do not disturb him", trans: "Anh ấy có thể đang ngủ đừng làm phiền anh ấy" },
      { text: "I should not have eaten so much at the party", trans: "Tôi lẽ ra không nên ăn nhiều ở bữa tiệc" },
      { text: "She can not have said that she is too kind", trans: "Cô ấy không thể đã nói điều đó cô ấy quá tốt bụng" },
      { text: "You need not have bought milk we already had some", trans: "Bạn không cần phải mua sữa chúng tôi đã có rồi" },
      { text: "He may have taken the wrong bus this morning", trans: "Anh ấy có thể đã đi nhầm xe buýt sáng nay" }
    ],
    exercises: [
      { q: "She _______ be at home. Her lights are on.", opts: ["can", "must", "might not", "shouldn't"], a: "must" },
      { q: "He _______ be serious! That's impossible.", opts: ["must", "can't", "should", "might"], a: "can't" },
      { q: "She _______ be sleeping. I'm not sure.", opts: ["must", "can't", "might", "should"], a: "might" },
      { q: "He _______ have forgotten. He's usually reliable.", opts: ["must", "can't", "should", "might"], a: "must" },
      { q: "She _______ have passed. She studied very hard.", opts: ["must", "can't", "shouldn't", "needn't"], a: "must" },
      { q: "You _______ have told me earlier!", opts: ["must", "can't", "should", "might"], a: "should" },
      { q: "I _______ have eaten so much. I feel sick.", opts: ["should", "shouldn't", "must", "can't"], a: "shouldn't" },
      { q: "She _______ have lost her phone. She keeps checking.", opts: ["must", "can't", "should", "needn't"], a: "might" },
      { q: "He _______ have done that. He's too honest.", opts: ["must", "can't", "should", "might"], a: "can't" },
      { q: "You _______ have bought more milk. We have plenty.", opts: ["should", "must", "needn't", "can't"], a: "needn't" },
      { q: "She _______ be studying right now. Her exam is tomorrow.", opts: ["must", "can't", "shouldn't", "needn't"], a: "must" },
      { q: "He _______ have taken the wrong bus.", opts: ["must", "can't", "may", "shouldn't"], a: "may" },
      { q: "You _______ have locked the door. (but you didn't)", opts: ["should", "shouldn't", "must", "needn't"], a: "should" },
      { q: "She _______ be at the party. She said she was sick.", opts: ["must", "can't", "might", "should"], a: "can't" },
      { q: "They _______ have arrived by now. The flight was at 3.", opts: ["should", "shouldn't", "can't", "needn't"], a: "should" }
    ]
  },
  {
    id: 'b2_11', title: '11. Mạo từ A/An/The', category: 'Articles', color: 'bg-lime-300',
    theory: [
      { h: 'I. A/AN - Mạo từ không xác định', c: '📌 A + phụ âm đầu: a book, a car, a university (/j/)\n📌 AN + nguyên âm đầu: an apple, an hour (/aʊ/ → silent h)\n👉 Dùng khi nói lần ĐẦU, chưa biết cụ thể:\n→ I saw a dog in the park. (con chó nào đó)\n→ She is an engineer. (nghề nghiệp)' },
      { h: 'II. THE - Mạo từ xác định', c: '👉 Đã biết rõ, đã nhắc đến trước đó:\n→ I saw a dog. The dog was very big.\n👉 Duy nhất: the sun, the moon, the Earth, the Internet\n👉 So sánh nhất: the tallest, the best, the most beautiful\n👉 Tên sông/biển/đại dương/dãy núi: the Mekong, the Pacific\n👉 Quốc gia có "Republic/Kingdom/States": the UK, the USA' },
      { h: 'III. KHÔNG dùng mạo từ (Zero Article)', c: '📌 Danh từ số nhiều/không đếm được mang nghĩa CHUNG:\n→ Dogs are loyal. (chó nói chung) Water is essential.\n📌 Tên người, hầu hết tên quốc gia: Vietnam, Japan, Tom\n📌 Bữa ăn, môn thể thao, môn học: breakfast, football, Math\n📌 Phương tiện (by + N): by bus, by car, on foot' },
      { h: 'IV. Lỗi phổ biến', c: '⚠️ SAI: I go to the school every day. → ĐÚNG: I go to school every day.\n⚠️ SAI: She plays the piano beautifully. → ĐÚNG ✓ (nhạc cụ dùng THE)\n⚠️ SAI: The life is beautiful. → ĐÚNG: Life is beautiful. (nghĩa chung)\n⚠️ SAI: I have a breakfast at 7. → ĐÚNG: I have breakfast at 7.' }
    ],
    sentences: [
      { text: "I bought a new book at the bookstore yesterday", trans: "Tôi mua một cuốn sách mới ở hiệu sách hôm qua" },
      { text: "The sun rises in the east and sets in the west", trans: "Mặt trời mọc ở đông và lặn ở tây" },
      { text: "She is an engineer who works at a big company", trans: "Cô ấy là kỹ sư làm việc ở công ty lớn" },
      { text: "Dogs are loyal animals that love their owners", trans: "Chó là loài vật trung thành yêu chủ" },
      { text: "I always have breakfast before I go to school", trans: "Tôi luôn ăn sáng trước khi đến trường" },
      { text: "He plays the guitar and the piano very well", trans: "Anh ấy chơi guitar và piano rất giỏi" },
      { text: "The United Kingdom is an island country in Europe", trans: "Vương quốc Anh là quốc gia đảo ở châu Âu" },
      { text: "We traveled to Japan by plane last summer", trans: "Chúng tôi đi Nhật bằng máy bay hè trước" },
      { text: "She is the most intelligent student in the class", trans: "Cô ấy là học sinh thông minh nhất lớp" },
      { text: "Water is essential for life on earth", trans: "Nước là thiết yếu cho sự sống trên trái đất" }
    ],
    exercises: [
      { q: "I saw _______ dog in the park.", opts: ["a", "an", "the", "—"], a: "a" },
      { q: "_______ sun rises in the east.", opts: ["A", "An", "The", "—"], a: "The" },
      { q: "She is _______ honest person.", opts: ["a", "an", "the", "—"], a: "an" },
      { q: "_______ dogs are loyal animals.", opts: ["A", "An", "The", "—"], a: "—" },
      { q: "He plays _______ piano every day.", opts: ["a", "an", "the", "—"], a: "the" },
      { q: "I go to _______ school by bus.", opts: ["a", "an", "the", "—"], a: "—" },
      { q: "This is _______ best movie I've ever seen.", opts: ["a", "an", "the", "—"], a: "the" },
      { q: "_______ water is essential for life.", opts: ["A", "An", "The", "—"], a: "—" },
      { q: "She visited _______ United States last year.", opts: ["a", "an", "the", "—"], a: "the" },
      { q: "I have _______ breakfast at 7 AM.", opts: ["a", "an", "the", "—"], a: "—" },
      { q: "He is _______ university student.", opts: ["a", "an", "the", "—"], a: "a" },
      { q: "_______ moon is beautiful tonight.", opts: ["A", "An", "The", "—"], a: "The" },
      { q: "She bought _______ apple and _______ banana.", opts: ["an/a", "a/an", "the/the", "—/—"], a: "an/a" },
      { q: "I love _______ music.", opts: ["a", "an", "the", "—"], a: "—" },
      { q: "_______ Pacific Ocean is the largest ocean.", opts: ["A", "An", "The", "—"], a: "The" }
    ]
  },
  {
    id: 'b2_12', title: '12. Giới từ Nâng cao (Prepositions)', category: 'Prepositions', color: 'bg-cyan-300',
    theory: [
      { h: 'I. Giới từ chỉ thời gian', c: '📌 AT: thời điểm cụ thể → at 7 o\'clock, at noon, at midnight, at Christmas\n📌 ON: ngày/thứ cụ thể → on Monday, on my birthday, on January 1st\n📌 IN: tháng/năm/mùa/thập kỷ → in January, in 2024, in summer, in the 1990s\n📌 DURING + N: trong suốt → during the lesson, during the war\n📌 FOR + khoảng thời gian: for 2 hours, for a week\n📌 SINCE + mốc thời gian: since 2020, since Monday\n📌 BY + thời hạn: trước → by Friday, by the end of the month' },
      { h: 'II. Giới từ chỉ nơi chốn', c: '📌 AT: điểm cụ thể → at home, at the bus stop, at the door\n📌 IN: không gian bên trong → in the room, in the city, in the world\n📌 ON: bề mặt → on the table, on the wall, on the floor\n📌 BETWEEN: giữa 2 → between A and B\n📌 AMONG: giữa 3+ → among the crowd\n📌 NEXT TO / BESIDE: bên cạnh\n📌 OPPOSITE: đối diện\n📌 IN FRONT OF / BEHIND: trước / sau' },
      { h: 'III. Giới từ đi kèm Tính từ', c: '📌 afraid OF, good AT, interested IN, famous FOR\n📌 different FROM, similar TO, proud OF, responsible FOR\n📌 worried ABOUT, excited ABOUT, angry WITH/ABOUT\n📌 keen ON, fond OF, aware OF, capable OF' },
      { h: 'IV. Giới từ đi kèm Động từ', c: '📌 depend ON, believe IN, consist OF, belong TO\n📌 apologize FOR, congratulate ON, succeed IN\n📌 agree WITH, complain ABOUT, look FORWARD TO\n📌 result IN, insist ON, concentrate ON' }
    ],
    sentences: [
      { text: "The meeting starts at nine o clock on Monday", trans: "Cuộc họp bắt đầu lúc 9 giờ vào thứ Hai" },
      { text: "She has been living in London since two thousand ten", trans: "Cô ấy đã sống ở London từ năm 2010" },
      { text: "I will finish the report by the end of this week", trans: "Tôi sẽ hoàn thành báo cáo trước cuối tuần này" },
      { text: "He is very good at playing chess and solving puzzles", trans: "Anh ấy rất giỏi chơi cờ và giải đố" },
      { text: "She is interested in learning about different cultures", trans: "Cô ấy quan tâm đến việc tìm hiểu các nền văn hóa" },
      { text: "The school is between the park and the hospital", trans: "Trường nằm giữa công viên và bệnh viện" },
      { text: "I apologize for being late to the meeting today", trans: "Tôi xin lỗi vì đến muộn cuộc họp hôm nay" },
      { text: "They congratulated her on passing the difficult exam", trans: "Họ chúc mừng cô ấy đỗ kỳ thi khó" },
      { text: "This book is different from the one I read before", trans: "Cuốn sách này khác với cuốn tôi đọc trước đó" },
      { text: "I am looking forward to meeting you next week", trans: "Tôi mong chờ gặp bạn tuần tới" }
    ],
    exercises: [
      { q: "The class starts _______ 9 AM.", opts: ["in", "on", "at", "by"], a: "at" },
      { q: "She was born _______ January 15th.", opts: ["in", "on", "at", "by"], a: "on" },
      { q: "We moved here _______ 2015.", opts: ["in", "on", "at", "by"], a: "in" },
      { q: "Please finish this _______ Friday.", opts: ["in", "on", "at", "by"], a: "by" },
      { q: "He is very good _______ math.", opts: ["in", "on", "at", "for"], a: "at" },
      { q: "She is interested _______ music.", opts: ["on", "in", "at", "for"], a: "in" },
      { q: "This is different _______ what I expected.", opts: ["to", "from", "with", "for"], a: "from" },
      { q: "I apologize _______ the mistake.", opts: ["about", "for", "to", "with"], a: "for" },
      { q: "He is proud _______ his daughter.", opts: ["for", "about", "of", "with"], a: "of" },
      { q: "It depends _______ the weather.", opts: ["in", "on", "at", "for"], a: "on" },
      { q: "She congratulated me _______ my promotion.", opts: ["for", "on", "about", "with"], a: "on" },
      { q: "The bank is _______ the post office and the café.", opts: ["among", "between", "beside", "next"], a: "between" },
      { q: "I've been waiting _______ two hours.", opts: ["since", "for", "during", "by"], a: "for" },
      { q: "She has lived here _______ 2018.", opts: ["for", "since", "during", "by"], a: "since" },
      { q: "He succeeded _______ passing the test.", opts: ["on", "in", "at", "for"], a: "in" }
    ]
  },
  {
    id: 'b2_13', title: '13. Liên từ Nâng cao (Linking Words)', category: 'Connectors', color: 'bg-violet-300',
    theory: [
      { h: 'I. Thêm thông tin', c: '📌 Moreover / Furthermore / In addition / Besides = Hơn nữa\n→ The hotel is expensive. Moreover, it is far from the beach.\n📌 Also / As well / Too = Cũng\n📌 Not only...but also = Không chỉ...mà còn\n→ She is not only smart but also hardworking.' },
      { h: 'II. Tương phản', c: '📌 However / Nevertheless / Nonetheless = Tuy nhiên\n→ He was tired. However, he kept working.\n📌 On the other hand = Mặt khác\n📌 In contrast / On the contrary = Ngược lại\n📌 Despite / In spite of + N/V-ing = Mặc dù\n📌 Although / Even though / Though + clause' },
      { h: 'III. Nguyên nhân - Kết quả', c: '📌 Therefore / Consequently / As a result = Do đó\n→ He didn\'t study. Therefore, he failed.\n📌 Due to / Because of / Owing to + N = Vì\n📌 So...that / Such...that = Quá...đến nỗi\n→ It was so hot that we couldn\'t sleep.' },
      { h: 'IV. Mục đích & Điều kiện', c: '📌 In order to / So as to + V = Để mà\n📌 So that / In order that + clause = Để mà\n→ She studies hard so that she can pass.\n📌 Provided (that) / As long as = Miễn là\n📌 Unless = Trừ khi (= If...not)\n📌 Otherwise = Nếu không thì' }
    ],
    sentences: [
      { text: "He was tired however he kept working until midnight", trans: "Anh ấy mệt tuy nhiên anh ấy tiếp tục làm việc đến nửa đêm" },
      { text: "She is not only smart but also very hardworking", trans: "Cô ấy không chỉ thông minh mà còn rất chăm chỉ" },
      { text: "Therefore we decided to postpone the meeting", trans: "Do đó chúng tôi quyết định hoãn cuộc họp" },
      { text: "Despite the rain they went out for a long walk", trans: "Mặc dù mưa họ vẫn ra ngoài đi dạo" },
      { text: "She studies hard so that she can get a scholarship", trans: "Cô ấy học chăm để có thể được học bổng" },
      { text: "He left early in order to avoid the heavy traffic", trans: "Anh ấy đi sớm để tránh kẹt xe" },
      { text: "You can go provided that you finish your homework", trans: "Bạn có thể đi miễn là bạn xong bài tập" },
      { text: "It was so cold that we had to wear thick jackets", trans: "Trời lạnh đến nỗi chúng tôi phải mặc áo khoác dày" },
      { text: "Furthermore this method is faster and more efficient", trans: "Hơn nữa phương pháp này nhanh hơn và hiệu quả hơn" },
      { text: "On the other hand the new plan has many advantages", trans: "Mặt khác kế hoạch mới có nhiều ưu điểm" }
    ],
    exercises: [
      { q: "He was tired. _______, he kept working.", opts: ["Therefore", "However", "Moreover", "Because"], a: "However" },
      { q: "She is _______ smart _______ hardworking.", opts: ["not only/but also", "either/or", "neither/nor", "both/and"], a: "not only/but also" },
      { q: "He didn't study. _______, he failed the exam.", opts: ["However", "Therefore", "Moreover", "Although"], a: "Therefore" },
      { q: "_______ the bad weather, they went hiking.", opts: ["Although", "Despite", "However", "Therefore"], a: "Despite" },
      { q: "She left early _______ catch the train.", opts: ["so that", "in order to", "although", "despite"], a: "in order to" },
      { q: "You can go _______ you finish your work.", opts: ["unless", "provided that", "although", "despite"], a: "provided that" },
      { q: "It was _______ hot that we couldn't sleep.", opts: ["such", "so", "too", "very"], a: "so" },
      { q: "_______, this method saves a lot of time.", opts: ["However", "Although", "Furthermore", "Despite"], a: "Furthermore" },
      { q: "He must hurry. _______, he'll miss the bus.", opts: ["Moreover", "However", "Otherwise", "Furthermore"], a: "Otherwise" },
      { q: "_______ she was sick, she went to work.", opts: ["Despite", "Although", "However", "Therefore"], a: "Although" },
      { q: "She works hard _______ she can support her family.", opts: ["in order to", "so that", "despite", "although"], a: "so that" },
      { q: "_______ his illness, he attended the meeting.", opts: ["Although", "In spite of", "However", "Therefore"], a: "In spite of" },
      { q: "_______ you study harder, you will fail.", opts: ["If", "Unless", "Provided", "Although"], a: "Unless" },
      { q: "It was _______ a difficult exam that many failed.", opts: ["so", "such", "too", "very"], a: "such" },
      { q: "He didn't apologize. _______, I forgave him.", opts: ["Therefore", "Moreover", "Nevertheless", "Furthermore"], a: "Nevertheless" }
    ]
  },
  {
    id: 'b2_14', title: '14. Câu Hỏi Đuôi (Tag Questions)', category: 'Question Forms', color: 'bg-teal-200',
    theory: [
      { h: 'I. Nguyên tắc chính', c: '👉 Mệnh đề KHẲNG ĐỊNH → đuôi PHỦ ĐỊNH:\n→ She is beautiful, isn\'t she?\n→ They have left, haven\'t they?\n👉 Mệnh đề PHỦ ĐỊNH → đuôi KHẲNG ĐỊNH:\n→ You don\'t like coffee, do you?\n→ He can\'t swim, can he?' },
      { h: 'II. Trường hợp đặc biệt', c: '📌 I am → aren\'t I?\n→ I am late, aren\'t I? (KHÔNG: amn\'t I)\n📌 Let\'s → shall we?\n→ Let\'s go, shall we?\n📌 Mệnh lệnh → will you?\n→ Open the door, will you?\n📌 Everyone/Someone/Nobody + they:\n→ Everyone is here, aren\'t they?\n📌 Nothing/Everything → it:\n→ Nothing happened, did it?' },
      { h: 'III. Phó từ phủ định → Đuôi KHẲNG ĐỊNH', c: '⚠️ Câu có never, rarely, seldom, hardly, barely, little, few → mang nghĩa PHỦ ĐỊNH:\n→ She never comes late, does she?\n→ He hardly ever speaks, does he?\n→ They seldom go out, do they?' },
      { h: 'IV. I think/believe + MĐ phụ', c: '📌 Khi chủ ngữ chính là "I" → lấy MĐ PHỤ làm đuôi:\n→ I think he is right, isn\'t he? (theo MĐ phụ)\n→ I don\'t think she will come, will she?\n📌 Khi chủ ngữ KHÔNG phải "I" → lấy MĐ CHÍNH:\n→ She thinks he will come, doesn\'t she?' }
    ],
    sentences: [
      { text: "You like pizza don't you", trans: "Bạn thích pizza phải không" },
      { text: "She isn't coming to the party is she", trans: "Cô ấy không đến tiệc phải không" },
      { text: "They have already left haven't they", trans: "Họ đã đi rồi đúng không" },
      { text: "He can speak French can't he", trans: "Anh ấy nói được tiếng Pháp phải không" },
      { text: "Let's go to the cinema shall we", trans: "Đi xem phim nhé" },
      { text: "She never comes late does she", trans: "Cô ấy không bao giờ đến muộn phải không" },
      { text: "I am your friend aren't I", trans: "Tôi là bạn của bạn đúng không" },
      { text: "Nobody called me did they", trans: "Không ai gọi cho tôi phải không" },
      { text: "Open the window will you", trans: "Mở cửa sổ giùm nhé" },
      { text: "I think she is right isn't she", trans: "Tôi nghĩ cô ấy đúng phải không" }
    ],
    exercises: [
      { q: "You like pizza, _______ you?", opts: ["don't", "do", "aren't", "are"], a: "don't" },
      { q: "She is beautiful, _______ she?", opts: ["is", "isn't", "does", "doesn't"], a: "isn't" },
      { q: "They have left, _______ they?", opts: ["have", "haven't", "do", "don't"], a: "haven't" },
      { q: "He can't swim, _______ he?", opts: ["can't", "can", "does", "doesn't"], a: "can" },
      { q: "I am late, _______ I?", opts: ["amn't", "aren't", "am not", "isn't"], a: "aren't" },
      { q: "Let's go, _______ we?", opts: ["will", "shall", "can", "do"], a: "shall" },
      { q: "She never comes late, _______ she?", opts: ["doesn't", "does", "isn't", "is"], a: "does" },
      { q: "Nobody called, _______ they?", opts: ["didn't", "did", "don't", "do"], a: "did" },
      { q: "Open the door, _______ you?", opts: ["do", "will", "can", "shall"], a: "will" },
      { q: "He hardly ever speaks, _______ he?", opts: ["doesn't", "does", "isn't", "is"], a: "does" },
      { q: "I think he is right, _______ he?", opts: ["don't", "isn't", "doesn't", "is"], a: "isn't" },
      { q: "Nothing happened, _______ it?", opts: ["didn't", "did", "doesn't", "does"], a: "did" },
      { q: "She won't be late, _______ she?", opts: ["won't", "will", "doesn't", "does"], a: "will" },
      { q: "Everyone is here, _______ they?", opts: ["isn't", "aren't", "is", "are"], a: "aren't" },
      { q: "He rarely goes out, _______ he?", opts: ["doesn't", "does", "isn't", "is"], a: "does" }
    ]
  },
  {
    id: 'b2_15', title: '15. Đảo Ngữ (Inversion)', category: 'Advanced Structures', color: 'bg-rose-200',
    theory: [
      { h: 'I. Đảo ngữ với phó từ phủ định', c: '📌 Never/Rarely/Seldom/Hardly + trợ ĐT + S + V:\n→ Never have I seen such beauty.\n→ Rarely does she make mistakes.\n→ Seldom do they eat out.\n→ Hardly had I arrived when it started raining.' },
      { h: 'II. Đảo ngữ với NO/NOT', c: '📌 At no time + trợ ĐT + S + V:\n→ At no time did I say I would quit.\n📌 Under no circumstances:\n→ Under no circumstances should you open this door.\n📌 On no account:\n→ On no account must this be repeated.\n📌 Not only...but also:\n→ Not only does she sing, but she also dances.' },
      { h: 'III. No sooner...than / Hardly...when', c: '📌 No sooner + had + S + V3 + than + S + V2:\n→ No sooner had I left than it started raining.\n📌 Hardly/Scarcely + had + S + V3 + when + S + V2:\n→ Hardly had she arrived when the phone rang.' },
      { h: 'IV. Đảo ngữ với SO/SUCH/ONLY', c: '📌 So + adj + trợ ĐT + S + that:\n→ So beautiful was the view that I took many photos.\n📌 Not until + clause/time + trợ ĐT + S + V:\n→ Not until I got home did I realize my mistake.\n📌 Only when/after/if + clause + trợ ĐT + S + V:\n→ Only when she left did I understand her value.' }
    ],
    sentences: [
      { text: "Never have I seen such a beautiful sunset before", trans: "Chưa bao giờ tôi thấy hoàng hôn đẹp như vậy" },
      { text: "Rarely does she make mistakes in her work", trans: "Hiếm khi cô ấy mắc lỗi trong công việc" },
      { text: "No sooner had I arrived than it started raining", trans: "Tôi vừa đến thì trời bắt đầu mưa" },
      { text: "Not only does she sing but she also dances well", trans: "Cô ấy không chỉ hát mà còn nhảy giỏi" },
      { text: "Only when she left did I realize how much I missed her", trans: "Chỉ khi cô ấy đi tôi mới nhận ra tôi nhớ cô ấy nhiều đến vậy" },
      { text: "Under no circumstances should you open this door", trans: "Trong bất kỳ trường hợp nào bạn cũng không nên mở cánh cửa này" },
      { text: "Hardly had she finished speaking when they applauded", trans: "Cô ấy vừa nói xong thì họ vỗ tay" },
      { text: "Not until I got home did I realize my mistake", trans: "Mãi đến khi về nhà tôi mới nhận ra lỗi sai" },
      { text: "So beautiful was the view that everyone stopped to look", trans: "Cảnh đẹp đến nỗi mọi người dừng lại để ngắm" },
      { text: "At no time did he mention leaving the company", trans: "Không lúc nào anh ấy nhắc đến việc rời công ty" }
    ],
    exercises: [
      { q: "Never _______ I seen such a thing.", opts: ["had", "have", "did", "do"], a: "have" },
      { q: "Rarely _______ she make mistakes.", opts: ["do", "does", "is", "has"], a: "does" },
      { q: "No sooner _______ I arrived than it rained.", opts: ["did", "had", "have", "was"], a: "had" },
      { q: "Not only _______ she sing, but she also dances.", opts: ["do", "does", "is", "has"], a: "does" },
      { q: "_______ had she finished when they applauded.", opts: ["Hardly", "Never", "Not only", "No sooner"], a: "Hardly" },
      { q: "Under no circumstances _______ you open this.", opts: ["should", "do", "are", "have"], a: "should" },
      { q: "Not until he left _______ I understand.", opts: ["do", "did", "have", "was"], a: "did" },
      { q: "Only when she called _______ I know the truth.", opts: ["do", "did", "have", "was"], a: "did" },
      { q: "So tired _______ he that he fell asleep immediately.", opts: ["is", "was", "did", "had"], a: "was" },
      { q: "At no time _______ I say that.", opts: ["do", "did", "have", "was"], a: "did" },
      { q: "Seldom _______ they go out for dinner.", opts: ["do", "does", "are", "have"], a: "do" },
      { q: "No sooner had I sat down _______ the phone rang.", opts: ["when", "than", "that", "before"], a: "than" },
      { q: "Hardly had she arrived _______ it started snowing.", opts: ["than", "when", "that", "before"], a: "when" },
      { q: "Little _______ he know about the surprise.", opts: ["do", "did", "has", "was"], a: "did" },
      { q: "Not only _______ he pass, but he got the top score.", opts: ["does", "did", "has", "was"], a: "did" }
    ]
  },
  {
    id: 'b2_16', title: '16. Causative (Thể Sai Khiến)', category: 'Advanced Structures', color: 'bg-amber-200',
    theory: [
      { h: 'I. HAVE something DONE', c: '👉 Nhờ ai đó LÀM HỘ (không tự làm):\n📌 S + HAVE + O(vật) + V3 (past participle)\n→ I had my car repaired. (= Tôi nhờ người sửa xe)\n→ She has her hair cut every month. (= Cô ấy đi cắt tóc)\n→ We had the house painted last week. (= Nhờ người sơn nhà)' },
      { h: 'II. GET something DONE', c: '👉 Tương tự HAVE...DONE nhưng mang tính INFORMAL hơn:\n📌 S + GET + O(vật) + V3\n→ I got my phone fixed. (= Tôi mang điện thoại đi sửa)\n→ She got her nails done. (= Cô ấy đi làm móng)' },
      { h: 'III. HAVE/MAKE someone DO', c: '👉 HAVE + sb + V(nguyên thể) = Nhờ ai làm:\n→ I had my brother help me move. (nhờ anh trai giúp dọn nhà)\n👉 MAKE + sb + V(nguyên thể) = Bắt/khiến ai làm:\n→ The teacher made us rewrite the essay. (bắt viết lại)\n👉 GET + sb + TO V = Thuyết phục ai làm:\n→ I got him to lend me his car. (thuyết phục cho mượn xe)' },
      { h: 'IV. LET/ALLOW someone TO DO', c: '📌 LET + sb + V(nguyên thể) = Cho phép:\n→ My parents let me stay up late. (cho phép thức khuya)\n📌 ALLOW + sb + TO V = Cho phép (formal):\n→ The school doesn\'t allow students to use phones.' }
    ],
    sentences: [
      { text: "I had my car repaired at the garage yesterday", trans: "Tôi nhờ sửa xe ở gara hôm qua" },
      { text: "She has her hair cut at the salon every month", trans: "Cô ấy đi cắt tóc ở tiệm mỗi tháng" },
      { text: "We got the house painted before the holidays", trans: "Chúng tôi nhờ sơn nhà trước kỳ nghỉ" },
      { text: "The teacher made us rewrite the entire essay", trans: "Giáo viên bắt chúng tôi viết lại toàn bộ bài luận" },
      { text: "I got him to lend me his laptop for the weekend", trans: "Tôi thuyết phục anh ấy cho tôi mượn laptop cuối tuần" },
      { text: "My parents let me stay up late on weekends", trans: "Bố mẹ cho tôi thức khuya vào cuối tuần" },
      { text: "She had her photo taken by a professional photographer", trans: "Cô ấy nhờ nhiếp ảnh gia chuyên nghiệp chụp ảnh" },
      { text: "They got their kitchen renovated last summer", trans: "Họ nhờ cải tạo nhà bếp hè trước" },
      { text: "The manager made everyone work overtime this week", trans: "Quản lý bắt mọi người làm thêm giờ tuần này" },
      { text: "The school does not allow students to use phones", trans: "Trường không cho phép học sinh dùng điện thoại" }
    ],
    exercises: [
      { q: "I had my car _______. (repair)", opts: ["repair", "repaired", "repairing", "to repair"], a: "repaired" },
      { q: "She has her hair _______ every month.", opts: ["cut", "cuts", "cutting", "to cut"], a: "cut" },
      { q: "We got the house _______.", opts: ["paint", "painted", "painting", "to paint"], a: "painted" },
      { q: "The teacher made us _______ the essay.", opts: ["rewrite", "rewritten", "to rewrite", "rewriting"], a: "rewrite" },
      { q: "I got him _______ me his car.", opts: ["lend", "to lend", "lending", "lent"], a: "to lend" },
      { q: "My parents let me _______ up late.", opts: ["stay", "to stay", "staying", "stayed"], a: "stay" },
      { q: "She had her photo _______ by a professional.", opts: ["take", "taken", "taking", "to take"], a: "taken" },
      { q: "He _______ his suit dry-cleaned.", opts: ["had", "made", "let", "allowed"], a: "had" },
      { q: "The boss made everyone _______ overtime.", opts: ["work", "to work", "working", "worked"], a: "work" },
      { q: "The school doesn't _______ students to use phones.", opts: ["let", "make", "allow", "have"], a: "allow" },
      { q: "I need to get my laptop _______.", opts: ["fix", "fixed", "fixing", "to fix"], a: "fixed" },
      { q: "She got her friend _______ her move.", opts: ["help", "to help", "helping", "helped"], a: "to help" },
      { q: "Don't let the children _______ near the pool.", opts: ["play", "to play", "playing", "played"], a: "play" },
      { q: "I had the mechanic _______ my brakes.", opts: ["check", "checked", "to check", "checking"], a: "check" },
      { q: "The movie made me _______.", opts: ["cry", "to cry", "cried", "crying"], a: "cry" }
    ]
  },
  {
    id: 'b2_17', title: '17. Câu Chẻ (Cleft Sentences)', category: 'Emphasis', color: 'bg-fuchsia-200',
    theory: [
      { h: 'I. IT IS/WAS...THAT/WHO', c: '👉 Nhấn mạnh một thành phần trong câu:\n📌 Nhấn mạnh CHỦ NGỮ: It was Tom who broke the window.\n📌 Nhấn mạnh TÂN NGỮ: It was the book that I bought.\n📌 Nhấn mạnh TRẠNG NGỮ: It was yesterday that I met her.\n\n→ Câu gốc: Tom broke the window yesterday.\n→ Nhấn Tom: It was Tom who broke the window.\n→ Nhấn window: It was the window that Tom broke.\n→ Nhấn yesterday: It was yesterday that Tom broke the window.' },
      { h: 'II. WHAT...IS/WAS', c: '👉 Nhấn mạnh hành động/vật:\n→ What I need is a good rest. (Điều tôi cần là nghỉ ngơi)\n→ What she said was surprising. (Điều cô ấy nói thật bất ngờ)\n→ What annoys me is his attitude. (Điều làm tôi khó chịu là thái độ anh ấy)' },
      { h: 'III. THE REASON WHY...IS THAT', c: '📌 Nhấn mạnh LÝ DO:\n→ The reason why I was late is that I missed the bus.\n→ The reason why she cried was that she failed the exam.\n📌 THE THING THAT / THE PERSON WHO:\n→ The thing that surprised me was his reaction.\n→ The person who helped me was a stranger.' }
    ],
    sentences: [
      { text: "It was Tom who broke the window yesterday", trans: "Chính Tom là người đã làm vỡ cửa sổ hôm qua" },
      { text: "What I need most right now is a good rest", trans: "Điều tôi cần nhất lúc này là nghỉ ngơi tốt" },
      { text: "It was in Paris that they first met each other", trans: "Chính ở Paris họ gặp nhau lần đầu" },
      { text: "The reason why she was late is that she missed the bus", trans: "Lý do cô ấy trễ là vì cô ấy lỡ xe buýt" },
      { text: "What surprised me most was his unexpected reaction", trans: "Điều khiến tôi ngạc nhiên nhất là phản ứng bất ngờ của anh ấy" },
      { text: "It was the book that I wanted to buy for you", trans: "Chính cuốn sách đó là thứ tôi muốn mua cho bạn" },
      { text: "What annoys me is people who talk during movies", trans: "Điều làm tôi khó chịu là những người nói chuyện trong phim" },
      { text: "It was yesterday that I received the good news", trans: "Chính hôm qua tôi nhận được tin vui" },
      { text: "The person who helped me was a complete stranger", trans: "Người giúp tôi là một người hoàn toàn xa lạ" },
      { text: "What she told me changed my life forever", trans: "Điều cô ấy nói với tôi đã thay đổi cuộc đời tôi mãi mãi" }
    ],
    exercises: [
      { q: "It was Tom _______ broke the window.", opts: ["which", "who", "whom", "whose"], a: "who" },
      { q: "_______ I need is a good rest.", opts: ["That", "Which", "What", "Who"], a: "What" },
      { q: "It was in Paris _______ they first met.", opts: ["which", "who", "where", "that"], a: "that" },
      { q: "The reason _______ she left is that she was unhappy.", opts: ["which", "that", "why", "what"], a: "why" },
      { q: "_______ surprised me was his attitude.", opts: ["That", "Which", "What", "Who"], a: "What" },
      { q: "It _______ the book that I bought.", opts: ["is", "was", "were", "are"], a: "was" },
      { q: "_______ annoys me is his laziness.", opts: ["That", "Which", "What", "It"], a: "What" },
      { q: "It was yesterday _______ I met her.", opts: ["when", "which", "that", "where"], a: "that" },
      { q: "The thing _______ I like most is traveling.", opts: ["what", "that", "who", "whom"], a: "that" },
      { q: "It was Mary _______ I gave the flowers to.", opts: ["which", "who", "whom", "that"], a: "that" },
      { q: "_______ she said was absolutely true.", opts: ["That", "Which", "What", "It"], a: "What" },
      { q: "It _______ in 2020 that the pandemic started.", opts: ["is", "was", "were", "has"], a: "was" },
      { q: "The person _______ called you was my sister.", opts: ["which", "who", "whom", "what"], a: "who" },
      { q: "_______ he wants is to be left alone.", opts: ["That", "Which", "What", "All"], a: "What" },
      { q: "It was his kindness _______ impressed me most.", opts: ["who", "which", "that", "what"], a: "that" }
    ]
  },
  {
    id: 'b2_18', title: '18. Phân từ (Participle Clauses)', category: 'Clauses', color: 'bg-sky-200',
    theory: [
      { h: 'I. V-ing (Present Participle)', c: '👉 Thay thế mệnh đề CHỦ ĐỘNG, cùng chủ ngữ:\n→ Walking along the street, I met an old friend.\n= While I was walking along the street, I met an old friend.\n→ Feeling tired, she went to bed early.\n= Because she felt tired, she went to bed early.' },
      { h: 'II. V3/V-ed (Past Participle)', c: '👉 Thay thế mệnh đề BỊ ĐỘNG, cùng chủ ngữ:\n→ Written in English, the book is easy to understand.\n= Because the book was written in English, it is easy to understand.\n→ Shocked by the news, she burst into tears.\n= Because she was shocked by the news, she burst into tears.' },
      { h: 'III. Having + V3 (Perfect Participle)', c: '👉 Hành động HOÀN THÀNH TRƯỚC hành động kia:\n→ Having finished his homework, he went to bed.\n= After he had finished his homework, he went to bed.\n→ Having been warned, she was more careful.\n= Because she had been warned, she was more careful.' }
    ],
    sentences: [
      { text: "Walking along the street I met my old friend", trans: "Đang đi dọc phố tôi gặp người bạn cũ" },
      { text: "Feeling very tired she decided to go to bed early", trans: "Cảm thấy rất mệt cô ấy quyết định đi ngủ sớm" },
      { text: "Written in simple English the book is easy to read", trans: "Được viết bằng tiếng Anh đơn giản cuốn sách dễ đọc" },
      { text: "Having finished his work he went home to rest", trans: "Sau khi hoàn thành công việc anh ấy về nhà nghỉ" },
      { text: "Surprised by the news she could not say anything", trans: "Bị bất ngờ bởi tin tức cô ấy không thể nói gì" },
      { text: "Sitting in the garden I enjoyed the beautiful sunset", trans: "Ngồi trong vườn tôi thưởng thức hoàng hôn đẹp" },
      { text: "Not knowing what to do she asked for help", trans: "Không biết phải làm gì cô ấy xin giúp đỡ" },
      { text: "Built in the eighteenth century the castle is famous", trans: "Được xây vào thế kỷ 18 lâu đài rất nổi tiếng" },
      { text: "Having been warned about the danger they were careful", trans: "Đã được cảnh báo về nguy hiểm họ rất cẩn thận" },
      { text: "Seeing the police the thief ran away immediately", trans: "Thấy cảnh sát tên trộm bỏ chạy ngay lập tức" }
    ],
    exercises: [
      { q: "_______ along the street, I met an old friend.", opts: ["Walk", "Walking", "Walked", "Having walked"], a: "Walking" },
      { q: "_______ tired, she went to bed early.", opts: ["Feel", "Feeling", "Felt", "Having felt"], a: "Feeling" },
      { q: "_______ in English, the book is easy to read.", opts: ["Write", "Writing", "Written", "Having written"], a: "Written" },
      { q: "_______ his homework, he went out.", opts: ["Finish", "Finishing", "Finished", "Having finished"], a: "Having finished" },
      { q: "_______ by the news, she cried.", opts: ["Shock", "Shocking", "Shocked", "Having shocked"], a: "Shocked" },
      { q: "_______ in the park, I saw a deer.", opts: ["Sit", "Sitting", "Sat", "Having sat"], a: "Sitting" },
      { q: "Not _______ what to say, he remained silent.", opts: ["know", "knowing", "known", "knew"], a: "knowing" },
      { q: "_______ in 1800, the building is very old.", opts: ["Build", "Building", "Built", "Having built"], a: "Built" },
      { q: "_______ the police, the thief ran away.", opts: ["See", "Seeing", "Seen", "Having seen"], a: "Seeing" },
      { q: "_______ been warned, they were very careful.", opts: ["Have", "Has", "Having", "Had"], a: "Having" },
      { q: "_______ late, he missed the beginning of the show.", opts: ["Arrive", "Arriving", "Arrived", "Having arrived"], a: "Arriving" },
      { q: "_______ from France, she speaks fluent French.", opts: ["Come", "Coming", "Came", "Having come"], a: "Coming" },
      { q: "_______ by many critics, the movie became a hit.", opts: ["Praise", "Praising", "Praised", "Having praised"], a: "Praised" },
      { q: "_______ finished eating, they asked for the bill.", opts: ["Have", "Has", "Having", "Had"], a: "Having" },
      { q: "_______ nothing to do, I decided to read a book.", opts: ["Have", "Having", "Has", "Had"], a: "Having" }
    ]
  },
  {
    id: 'b2_19', title: '19. Sự Hòa hợp Chủ-Vị (Subject-Verb Agreement)', category: 'Grammar Rules', color: 'bg-green-200',
    theory: [
      { h: 'I. Nguyên tắc cơ bản', c: '📌 Chủ ngữ SỐ ÍT → Động từ SỐ ÍT (thêm s/es):\n→ She likes music. The dog runs fast.\n📌 Chủ ngữ SỐ NHIỀU → Động từ SỐ NHIỀU:\n→ They like music. The dogs run fast.' },
      { h: 'II. Trường hợp đặc biệt', c: '📌 Each/Every/Either/Neither + N số ít → V số ít:\n→ Each student has a book. Every child is special.\n📌 One of + N số nhiều → V SỐ ÍT:\n→ One of my friends lives in London.\n📌 The number of + N → V SỐ ÍT:\n→ The number of students is increasing.\n📌 A number of + N → V SỐ NHIỀU:\n→ A number of students are absent today.' },
      { h: 'III. Chủ ngữ đặc biệt', c: '📌 V-ing / To V làm chủ ngữ → V SỐ ÍT:\n→ Swimming is good for health. To err is human.\n📌 Danh từ không đếm được → V SỐ ÍT:\n→ Information is important. News is on TV.\n📌 Everyone/Someone/Nobody → V SỐ ÍT:\n→ Everyone loves pizza. Nobody knows the answer.' },
      { h: 'IV. Chủ ngữ nối', c: '📌 A and B → V SỐ NHIỀU: Tom and Jerry are friends.\n📌 A or B / Either A or B / Neither A nor B → V theo B:\n→ Either Tom or his friends are coming.\n→ Neither the students nor the teacher was happy.\n📌 Not only A but also B → V theo B:\n→ Not only the teacher but also the students were excited.' }
    ],
    sentences: [
      { text: "Each student has a textbook for the class", trans: "Mỗi học sinh có một sách giáo khoa cho lớp" },
      { text: "The number of tourists is increasing every year", trans: "Số lượng du khách đang tăng mỗi năm" },
      { text: "A number of people were waiting at the bus stop", trans: "Một số người đang đợi ở bến xe buýt" },
      { text: "Swimming is one of the best forms of exercise", trans: "Bơi lội là một trong những hình thức tập luyện tốt nhất" },
      { text: "Neither the teacher nor the students were happy", trans: "Cả giáo viên lẫn học sinh đều không vui" },
      { text: "Everyone in the office knows about the new policy", trans: "Mọi người trong văn phòng đều biết về chính sách mới" },
      { text: "One of my best friends lives in Australia now", trans: "Một trong những người bạn tốt nhất của tôi sống ở Úc" },
      { text: "The news about the accident was very shocking", trans: "Tin tức về vụ tai nạn rất gây sốc" },
      { text: "Either you or she has to take responsibility", trans: "Hoặc bạn hoặc cô ấy phải chịu trách nhiệm" },
      { text: "Not only Tom but also his brothers are tall", trans: "Không chỉ Tom mà cả anh em anh ấy đều cao" }
    ],
    exercises: [
      { q: "Each student _______ a book.", opts: ["have", "has", "are having", "were having"], a: "has" },
      { q: "The number of visitors _______ increasing.", opts: ["are", "is", "were", "have been"], a: "is" },
      { q: "A number of students _______ absent.", opts: ["is", "are", "was", "has been"], a: "are" },
      { q: "Swimming _______ good exercise.", opts: ["are", "is", "were", "have been"], a: "is" },
      { q: "Neither Tom nor his friends _______ coming.", opts: ["is", "are", "was", "has"], a: "are" },
      { q: "Everyone _______ this song.", opts: ["love", "loves", "are loving", "were loving"], a: "loves" },
      { q: "One of my friends _______ in Japan.", opts: ["live", "lives", "are living", "were living"], a: "lives" },
      { q: "The news _______ very surprising.", opts: ["are", "is", "were", "have been"], a: "is" },
      { q: "Either you or he _______ to go.", opts: ["have", "has", "are", "were"], a: "has" },
      { q: "Tom and Jerry _______ best friends.", opts: ["is", "are", "was", "has been"], a: "are" },
      { q: "Every child _______ special.", opts: ["are", "is", "were", "have been"], a: "is" },
      { q: "To travel _______ to learn.", opts: ["are", "is", "were", "have been"], a: "is" },
      { q: "Nobody _______ the truth.", opts: ["know", "knows", "are knowing", "were knowing"], a: "knows" },
      { q: "Not only he but also they _______ ready.", opts: ["is", "are", "was", "has been"], a: "are" },
      { q: "Mathematics _______ my favorite subject.", opts: ["are", "is", "were", "have been"], a: "is" }
    ]
  },
  {
    id: 'b2_20', title: '20. Câu Giả Định (Subjunctive)', category: 'Advanced Structures', color: 'bg-purple-200',
    theory: [
      { h: 'I. Giả định Hiện tại', c: '👉 Sau các ĐT: suggest, recommend, demand, insist, request, propose, advise\n📌 S + V + that + S + V(nguyên thể KHÔNG TO):\n→ The doctor suggested that he take more rest.\n→ I insist that she be on time.\n→ They demand that the work be completed.\n\n⚠️ Không chia s/es, không dùng to, dùng nguyên thể cho MỌI NGÔI.' },
      { h: 'II. Sau tính từ', c: '📌 It is + adj + that + S + V(nguyên thể):\n→ It is essential that he attend the meeting.\n→ It is important that everyone be present.\n→ It is necessary that she study harder.\n\n📌 Các tính từ: essential, necessary, important, vital, crucial, imperative, urgent' },
      { h: 'III. It\'s (high/about) time', c: '📌 It\'s time + S + V2 (Past Simple) = Đã đến lúc phải...\n→ It\'s time we left. (Đã đến lúc chúng ta phải đi)\n→ It\'s high time you got a job. (Đến lúc bạn phải tìm việc rồi)\n→ It\'s about time he learned to cook. (Đến lúc anh ấy nên học nấu ăn)' },
      { h: 'IV. Would rather + S + V2', c: '📌 Muốn AI ĐÓ KHÁC làm gì (trái ý muốn hiện tại):\n→ I would rather you stayed home today. (Tôi muốn bạn ở nhà)\n→ She\'d rather he didn\'t smoke. (Cô ấy muốn anh ấy không hút thuốc)\n\n⚠️ Khác: I\'d rather + V(nguyên thể) = TÔI thích hơn:\n→ I\'d rather stay home. (Tôi thích ở nhà hơn)' }
    ],
    sentences: [
      { text: "The doctor suggested that he take more rest every day", trans: "Bác sĩ đề nghị anh ấy nghỉ ngơi nhiều hơn mỗi ngày" },
      { text: "It is essential that everyone be present at the meeting", trans: "Điều cần thiết là mọi người phải có mặt tại cuộc họp" },
      { text: "I insist that she be given another chance to prove herself", trans: "Tôi kiên quyết cô ấy phải được cho thêm cơ hội" },
      { text: "It is high time you got a real job and started earning", trans: "Đã đến lúc bạn tìm việc thật sự và bắt đầu kiếm tiền" },
      { text: "I would rather you didn't tell anyone about this", trans: "Tôi muốn bạn đừng nói ai về chuyện này" },
      { text: "They demanded that the work be completed by Friday", trans: "Họ yêu cầu công việc phải hoàn thành trước thứ Sáu" },
      { text: "It is important that he study harder for the final exam", trans: "Điều quan trọng là anh ấy phải học chăm hơn cho kỳ thi" },
      { text: "She recommended that we visit the museum in the city", trans: "Cô ấy giới thiệu chúng tôi nên thăm bảo tàng trong thành phố" },
      { text: "I would rather stay home than go out in this weather", trans: "Tôi thích ở nhà hơn ra ngoài với thời tiết này" },
      { text: "It is about time she learned how to drive a car", trans: "Đã đến lúc cô ấy nên học lái xe" }
    ],
    exercises: [
      { q: "He suggested that she _______ more rest.", opts: ["takes", "take", "took", "taking"], a: "take" },
      { q: "It is essential that he _______ the meeting.", opts: ["attends", "attend", "attended", "attending"], a: "attend" },
      { q: "I insist that she _______ on time.", opts: ["is", "be", "was", "being"], a: "be" },
      { q: "It's high time you _______ a job.", opts: ["get", "got", "getting", "gets"], a: "got" },
      { q: "I'd rather you _______ smoke here.", opts: ["don't", "didn't", "not", "won't"], a: "didn't" },
      { q: "They demand that the project _______ finished.", opts: ["is", "be", "was", "will be"], a: "be" },
      { q: "It's important that everyone _______ present.", opts: ["is", "be", "are", "was"], a: "be" },
      { q: "She recommended that we _______ early.", opts: ["leave", "left", "leaving", "leaves"], a: "leave" },
      { q: "I'd rather _______ home tonight.", opts: ["stay", "stayed", "staying", "to stay"], a: "stay" },
      { q: "It's about time he _______ to cook.", opts: ["learn", "learned", "learning", "learns"], a: "learned" },
      { q: "I suggest that he _______ a doctor.", opts: ["sees", "see", "saw", "seeing"], a: "see" },
      { q: "It is vital that she _______ the truth.", opts: ["knows", "know", "knew", "knowing"], a: "know" },
      { q: "I'd rather you _______ here yesterday.", opts: ["come", "came", "had come", "coming"], a: "had come" },
      { q: "They proposed that the meeting _______ postponed.", opts: ["is", "be", "was", "were"], a: "be" },
      { q: "It's time we _______.", opts: ["leave", "left", "leaving", "leaves"], a: "left" }
    ]
  },
  {
    id: 'b2_21', title: '21. Từ Tạo Từ (Word Formation)', category: 'Vocabulary', color: 'bg-orange-200',
    theory: [
      { h: 'I. Tiền tố (Prefix)', c: '📌 UN- = không: unhappy, unable, unfair, unusual\n📌 DIS- = không: disagree, disappear, dislike\n📌 IM-/IN-/IR-/IL- = không: impossible, incorrect, irregular, illegal\n📌 RE- = lại: rewrite, redo, rebuild, reconsider\n📌 OVER- = quá: overwork, overeat, oversleep\n📌 MIS- = sai: misunderstand, mislead, misspell\n📌 PRE- = trước: preview, prepare, predict' },
      { h: 'II. Hậu tố tạo DANH TỪ', c: '📌 -TION/-SION: education, decision, information\n📌 -MENT: development, environment, achievement\n📌 -NESS: happiness, kindness, darkness\n📌 -ITY: ability, responsibility, possibility\n📌 -ER/-OR: teacher, actor, driver\n📌 -ANCE/-ENCE: importance, difference, confidence' },
      { h: 'III. Hậu tố tạo TÍNH TỪ', c: '📌 -FUL: beautiful, careful, helpful, wonderful\n📌 -LESS: homeless, useless, careless, hopeless\n📌 -OUS: dangerous, famous, nervous, curious\n📌 -AL: national, cultural, traditional\n📌 -IVE: creative, active, attractive\n📌 -ABLE/-IBLE: comfortable, possible, responsible' },
      { h: 'IV. Hậu tố tạo ĐỘNG TỪ & TRẠNG TỪ', c: '📌 -IZE/-ISE: organize, realize, modernize\n📌 -EN: widen, strengthen, shorten, darken\n📌 -IFY: simplify, identify, classify\n📌 -LY (trạng từ): quickly, carefully, happily, beautifully' }
    ],
    sentences: [
      { text: "The development of technology has changed our lives", trans: "Sự phát triển của công nghệ đã thay đổi cuộc sống chúng ta" },
      { text: "It is impossible to finish this work in one day", trans: "Không thể hoàn thành công việc này trong một ngày" },
      { text: "Her kindness and generosity impressed everyone", trans: "Sự tốt bụng và hào phóng của cô ấy gây ấn tượng với mọi người" },
      { text: "He was careless and made many mistakes on the test", trans: "Anh ấy bất cẩn và mắc nhiều lỗi trong bài kiểm tra" },
      { text: "The organization is responsible for this important event", trans: "Tổ chức này chịu trách nhiệm cho sự kiện quan trọng này" },
      { text: "She misunderstood what I said and got very angry", trans: "Cô ấy hiểu nhầm những gì tôi nói và rất tức giận" },
      { text: "They need to modernize their production methods", trans: "Họ cần hiện đại hóa phương pháp sản xuất" },
      { text: "His creativity and imagination are truly remarkable", trans: "Sự sáng tạo và trí tưởng tượng của anh ấy thật đáng chú ý" },
      { text: "She spoke confidently in front of the large audience", trans: "Cô ấy nói tự tin trước đông đảo khán giả" },
      { text: "The teacher encouraged us to rewrite our essays", trans: "Giáo viên khuyến khích chúng tôi viết lại bài luận" }
    ],
    exercises: [
      { q: "The _______ of this project is very important. (develop)", opts: ["develop", "development", "developing", "developer"], a: "development" },
      { q: "It is _______ to finish this today. (possible)", opts: ["possible", "impossible", "possibility", "possibly"], a: "impossible" },
      { q: "Her _______ surprised everyone. (kind)", opts: ["kind", "kindly", "kindness", "unkind"], a: "kindness" },
      { q: "He was very _______ and made errors. (care)", opts: ["careful", "careless", "caring", "carefully"], a: "careless" },
      { q: "She speaks _______. (confident)", opts: ["confident", "confidence", "confidently", "confide"], a: "confidently" },
      { q: "They need to _______ the system. (modern)", opts: ["modern", "modernize", "modernity", "modernly"], a: "modernize" },
      { q: "He _______ what I meant. (understand)", opts: ["understood", "misunderstood", "understanding", "understands"], a: "misunderstood" },
      { q: "The _______ is very responsible. (organize)", opts: ["organize", "organization", "organizing", "organizer"], a: "organization" },
      { q: "She has great _______. (creative)", opts: ["creative", "create", "creativity", "creatively"], a: "creativity" },
      { q: "This task seems _______. (manage)", opts: ["manage", "manageable", "management", "manager"], a: "manageable" },
      { q: "His _______ was truly inspiring. (achieve)", opts: ["achieve", "achieving", "achievement", "achiever"], a: "achievement" },
      { q: "She felt _______ about the results. (happy)", opts: ["happy", "unhappy", "happiness", "happily"], a: "unhappy" },
      { q: "They made the road _______ for safety. (wide)", opts: ["wide", "wider", "widen", "widely"], a: "widen" },
      { q: "It was an _______ day at work. (enjoy)", opts: ["enjoy", "enjoyable", "enjoyment", "enjoying"], a: "enjoyable" },
      { q: "Please _______ your name on the form. (simple)", opts: ["simple", "simplify", "simply", "simplicity"], a: "simplify" }
    ]
  },
  {
    id: 'b2_22', title: '22. Collocations Quan Trọng', category: 'Vocabulary', color: 'bg-pink-200',
    theory: [
      { h: 'I. Make vs Do', c: '📌 MAKE: make a decision, make a mistake, make progress, make an effort, make money, make friends, make a phone call, make plans, make a suggestion, make an appointment\n📌 DO: do homework, do housework, do business, do research, do the dishes, do exercise, do a favor, do your best, do harm, do well' },
      { h: 'II. Collocations với HAVE/TAKE/GET', c: '📌 HAVE: have a rest, have fun, have a meal, have a look, have a chat, have an argument, have a headache, have a meeting\n📌 TAKE: take a break, take notes, take a photo, take a shower, take an exam, take a seat, take place, take part in, take turns\n📌 GET: get married, get divorced, get ready, get lost, get angry, get better/worse, get used to, get rid of' },
      { h: 'III. Collocations với COME/GO/KEEP', c: '📌 COME: come true, come first, come to an end, come to a conclusion\n📌 GO: go mad, go bald, go wrong, go bankrupt, go missing\n📌 KEEP: keep calm, keep quiet, keep in touch, keep a promise, keep a secret, keep fit' },
      { h: 'IV. Tính từ + Giới từ', c: '📌 good AT, keen ON, fond OF, proud OF, afraid OF\n📌 interested IN, involved IN, similar TO, different FROM\n📌 responsible FOR, sorry FOR/ABOUT, famous FOR\n📌 worried ABOUT, excited ABOUT, angry WITH/ABOUT' }
    ],
    sentences: [
      { text: "She made a decision to study abroad next year", trans: "Cô ấy đã đưa ra quyết định du học năm tới" },
      { text: "I need to do my homework before watching television", trans: "Tôi cần làm bài tập trước khi xem TV" },
      { text: "Let's take a break and have some coffee together", trans: "Hãy nghỉ giải lao và uống cà phê cùng nhau" },
      { text: "He got married to his college sweetheart last summer", trans: "Anh ấy kết hôn với người yêu thời đại học hè trước" },
      { text: "Please keep calm and don't make any noise", trans: "Xin hãy giữ bình tĩnh và đừng gây ồn" },
      { text: "Her dream finally came true after years of hard work", trans: "Giấc mơ của cô ấy cuối cùng đã thành hiện thực" },
      { text: "I always try to do my best in every situation", trans: "Tôi luôn cố gắng hết sức trong mọi tình huống" },
      { text: "She made a mistake but quickly learned from it", trans: "Cô ấy mắc lỗi nhưng nhanh chóng rút kinh nghiệm" },
      { text: "We should keep in touch after you move to the new city", trans: "Chúng ta nên giữ liên lạc sau khi bạn chuyển đến thành phố mới" },
      { text: "He took notes during the entire lecture very carefully", trans: "Anh ấy ghi chép cẩn thận trong suốt bài giảng" }
    ],
    exercises: [
      { q: "She _______ a decision to quit.", opts: ["made", "did", "took", "got"], a: "made" },
      { q: "I need to _______ my homework.", opts: ["make", "do", "take", "get"], a: "do" },
      { q: "Let's _______ a break.", opts: ["make", "do", "take", "get"], a: "take" },
      { q: "He _______ married last year.", opts: ["made", "did", "took", "got"], a: "got" },
      { q: "She _______ a mistake on the test.", opts: ["made", "did", "took", "got"], a: "made" },
      { q: "Please _______ calm.", opts: ["make", "do", "keep", "take"], a: "keep" },
      { q: "Her dream _______ true.", opts: ["went", "came", "made", "did"], a: "came" },
      { q: "I always _______ my best.", opts: ["make", "do", "take", "get"], a: "do" },
      { q: "He _______ notes during the lecture.", opts: ["made", "did", "took", "got"], a: "took" },
      { q: "Let's _______ in touch!", opts: ["make", "do", "keep", "take"], a: "keep" },
      { q: "She _______ a phone call to her mother.", opts: ["made", "did", "took", "got"], a: "made" },
      { q: "I _______ a shower every morning.", opts: ["make", "do", "take", "get"], a: "take" },
      { q: "Something went _______ with the computer.", opts: ["bad", "wrong", "worse", "miss"], a: "wrong" },
      { q: "She _______ research on the topic.", opts: ["made", "did", "took", "got"], a: "did" },
      { q: "He _______ a promise to his mother.", opts: ["made", "did", "kept", "took"], a: "made" }
    ]
  },
  {
    id: 'b2_23', title: '23. Đại từ Quan hệ Nâng cao', category: 'Clauses', color: 'bg-blue-300',
    theory: [
      { h: 'I. WHICH thay thế mệnh đề', c: '👉 WHICH có thể thay thế cho CẢ MỆnh đề trước đó:\n→ He passed the exam, which surprised everyone.\n(= Anh ấy đỗ kỳ thi, điều này khiến mọi người ngạc nhiên)\n→ She arrived late, which annoyed the teacher.\n→ They won the match, which made us very happy.' },
      { h: 'II. Giới từ + WHICH/WHOM', c: '📌 Giới từ đứng trước WHICH/WHOM (formal):\n→ The chair on which I sat was broken. (= that I sat on)\n→ The man to whom I spoke was a doctor. (= that I spoke to)\n→ The company for which she works is famous.\n\n⚠️ Trong văn nói, giới từ thường đứng CUỐI:\n→ The chair which I sat on was broken.' },
      { h: 'III. ALL/SOME/MOST/NONE + OF WHICH/WHOM', c: '📌 Dùng trong mệnh đề KHÔNG XÁC ĐỊNH:\n→ She has two brothers, both of whom live abroad.\n→ I read 5 books, all of which were interesting.\n→ He invited 20 people, most of whom came.\n→ There were many problems, none of which were solved.' },
      { h: 'IV. Rút gọn nâng cao', c: '📌 TO V (sau ordinal numbers, the only, superlatives):\n→ He was the last person to leave.\n→ She was the youngest player to win the tournament.\n📌 Tính từ/Cụm giới từ:\n→ The people present (= who were present)\n→ The house next to mine (= which is next to mine)' }
    ],
    sentences: [
      { text: "He passed the exam which surprised everyone in class", trans: "Anh ấy đỗ kỳ thi điều khiến mọi người trong lớp ngạc nhiên" },
      { text: "The chair on which I was sitting suddenly broke", trans: "Cái ghế mà tôi đang ngồi bất ngờ bị gãy" },
      { text: "She has two brothers both of whom live in Canada", trans: "Cô ấy có hai anh trai cả hai đều sống ở Canada" },
      { text: "I read five books all of which were fascinating", trans: "Tôi đọc năm cuốn sách tất cả đều hấp dẫn" },
      { text: "He was the last person to leave the office that night", trans: "Anh ấy là người cuối cùng rời văn phòng tối đó" },
      { text: "The man to whom I spoke was very helpful and kind", trans: "Người đàn ông mà tôi nói chuyện rất nhiệt tình và tốt bụng" },
      { text: "She arrived late which annoyed the teacher greatly", trans: "Cô ấy đến muộn điều này khiến giáo viên rất khó chịu" },
      { text: "There were many applicants most of whom were qualified", trans: "Có nhiều ứng viên hầu hết đều đủ điều kiện" },
      { text: "The company for which she works is internationally famous", trans: "Công ty mà cô ấy làm việc nổi tiếng quốc tế" },
      { text: "She was the youngest player to win the championship", trans: "Cô ấy là cầu thủ trẻ nhất giành chức vô địch" }
    ],
    exercises: [
      { q: "He won the prize, _______ made us proud.", opts: ["that", "which", "who", "whom"], a: "which" },
      { q: "The chair on _______ I sat was broken.", opts: ["that", "which", "who", "whom"], a: "which" },
      { q: "She has two sisters, both of _______ are doctors.", opts: ["who", "whom", "which", "that"], a: "whom" },
      { q: "I read 3 books, all of _______ were interesting.", opts: ["who", "whom", "which", "that"], a: "which" },
      { q: "He was the first _______ arrive.", opts: ["who", "to", "that", "which"], a: "to" },
      { q: "The man to _______ I spoke was kind.", opts: ["who", "whom", "which", "that"], a: "whom" },
      { q: "She was late, _______ annoyed the boss.", opts: ["that", "which", "who", "whom"], a: "which" },
      { q: "There were 30 people, most of _______ were students.", opts: ["who", "whom", "which", "that"], a: "whom" },
      { q: "The company for _______ he works is famous.", opts: ["who", "whom", "which", "that"], a: "which" },
      { q: "She was the youngest player _______ win.", opts: ["who", "to", "that", "which"], a: "to" },
      { q: "He invited 10 guests, none of _______ came.", opts: ["who", "whom", "which", "that"], a: "whom" },
      { q: "The hotel in _______ we stayed was excellent.", opts: ["that", "which", "where", "who"], a: "which" },
      { q: "She has 3 cats, two of _______ are black.", opts: ["who", "whom", "which", "that"], a: "which" },
      { q: "He failed the test, _______ was unexpected.", opts: ["that", "which", "who", "whom"], a: "which" },
      { q: "The girl with _______ he danced was his sister.", opts: ["who", "whom", "which", "that"], a: "whom" }
    ]
  },
  {
    id: 'b2_24', title: '24. Cấu trúc So sánh Nâng cao', category: 'Comparisons', color: 'bg-yellow-200',
    theory: [
      { h: 'I. So sánh bội số', c: '📌 TWICE/THREE TIMES + AS...AS = Gấp đôi/ba lần:\n→ This house is twice as big as mine.\n→ He earns three times as much as I do.\n📌 HALF + AS...AS = Một nửa:\n→ This bag is half as expensive as that one.' },
      { h: 'II. The...the... (Càng...càng...)', c: '📌 THE + so sánh hơn..., THE + so sánh hơn...:\n→ The more you practice, the better you get.\n→ The harder you work, the more successful you become.\n→ The sooner, the better. (Càng sớm càng tốt)\n→ The less you eat, the thinner you become.' },
      { h: 'III. Cấu trúc nhấn mạnh', c: '📌 FAR/MUCH/A LOT + so sánh hơn:\n→ She is far more intelligent than him.\n→ This is much better than the old version.\n📌 BY FAR + so sánh nhất:\n→ She is by far the best student.\n📌 NOWHERE NEAR AS...AS = Không gần bằng:\n→ He is nowhere near as tall as his brother.' },
      { h: 'IV. Like / As / The same as', c: '📌 LIKE + N/pronoun = giống như (so sánh):\n→ She looks like her mother.\n📌 AS + clause = như, với tư cách:\n→ As I said before, we need to hurry.\n📌 THE SAME AS / DIFFERENT FROM:\n→ My opinion is the same as yours.\n→ This is different from what I expected.' }
    ],
    sentences: [
      { text: "This house is twice as expensive as the other one", trans: "Ngôi nhà này đắt gấp đôi ngôi nhà kia" },
      { text: "The more you practice the better you will become", trans: "Càng luyện tập nhiều bạn càng giỏi hơn" },
      { text: "She is far more experienced than her colleague", trans: "Cô ấy có kinh nghiệm hơn nhiều so với đồng nghiệp" },
      { text: "This restaurant is by far the best in the city", trans: "Nhà hàng này là tốt nhất trong thành phố" },
      { text: "He is nowhere near as tall as his older brother", trans: "Anh ấy không cao bằng anh trai" },
      { text: "She looks like her mother when she was young", trans: "Cô ấy trông giống mẹ khi bà còn trẻ" },
      { text: "My answer is the same as yours on this question", trans: "Câu trả lời của tôi giống của bạn ở câu hỏi này" },
      { text: "He earns three times as much as I do every month", trans: "Anh ấy kiếm gấp ba lần tôi mỗi tháng" },
      { text: "The less you worry the happier you will be", trans: "Càng ít lo lắng bạn càng hạnh phúc hơn" },
      { text: "This version is much better than the previous one", trans: "Phiên bản này tốt hơn nhiều so với phiên bản trước" }
    ],
    exercises: [
      { q: "This is _______ as expensive as that.", opts: ["two", "twice", "double", "two time"], a: "twice" },
      { q: "The more you study, the _______ you get.", opts: ["good", "better", "best", "well"], a: "better" },
      { q: "She is _______ more talented than him.", opts: ["very", "far", "too", "so"], a: "far" },
      { q: "He is by _______ the best player.", opts: ["much", "far", "very", "so"], a: "far" },
      { q: "She is nowhere _______ as fast as her sister.", opts: ["near", "far", "much", "very"], a: "near" },
      { q: "He earns three _______ as much as I do.", opts: ["time", "times", "timing", "timed"], a: "times" },
      { q: "The _______ you eat, the thinner you become.", opts: ["less", "least", "more", "most"], a: "less" },
      { q: "This is _______ better than the old one.", opts: ["very", "much", "more", "most"], a: "much" },
      { q: "She looks _______ her mother.", opts: ["as", "like", "alike", "similar"], a: "like" },
      { q: "My bag is the same _______ yours.", opts: ["like", "as", "to", "with"], a: "as" },
      { q: "This is different _______ what I expected.", opts: ["to", "from", "with", "as"], a: "from" },
      { q: "He is _______ as smart as his brother.", opts: ["half", "halve", "halved", "halving"], a: "half" },
      { q: "The sooner, the _______.", opts: ["good", "well", "better", "best"], a: "better" },
      { q: "She is _______ the most intelligent in class.", opts: ["by far", "very", "too", "so"], a: "by far" },
      { q: "This bag is three times _______ heavy as mine.", opts: ["more", "as", "so", "very"], a: "as" }
    ]
  },
  {
    id: 'b2_25', title: '25. Tổng ôn Thì & Chia Động từ', category: 'Mixed Practice', color: 'bg-slate-300',
    theory: [
      { h: 'I. Bảng tổng hợp 12 thì', c: '📌 HIỆN TẠI:\n- Simple: V/Vs → She works every day.\n- Continuous: am/is/are + V-ing → She is working now.\n- Perfect: have/has + V3 → She has worked here for 5 years.\n- Perfect Continuous: have/has + been + V-ing → She has been working all day.\n\n📌 QUÁ KHỨ:\n- Simple: V2/Ved → She worked yesterday.\n- Continuous: was/were + V-ing → She was working at 8 PM.\n- Perfect: had + V3 → She had worked before he arrived.\n- Perfect Continuous: had + been + V-ing → She had been working for hours.\n\n📌 TƯƠNG LAI:\n- Simple: will + V → She will work tomorrow.\n- Continuous: will + be + V-ing → She will be working at 8 PM.\n- Perfect: will + have + V3 → She will have worked by Friday.\n- Perfect Continuous: will + have + been + V-ing → She will have been working for 10 years.' },
      { h: 'II. Mẹo chọn thì nhanh', c: '📌 DẤU HIỆU THỜI GIAN:\n- always, usually, every → Present Simple\n- now, at the moment → Present Continuous\n- already, just, yet, ever → Present Perfect\n- yesterday, last, ago → Past Simple\n- while, when (đang) → Past Continuous\n- before, after, by the time → Past Perfect\n- tomorrow, next → Future Simple\n- by + time (tương lai) → Future Perfect' },
      { h: 'III. Lỗi thường gặp', c: '⚠️ SAI: I am knowing him. → ĐÚNG: I know him. (stative verb)\n⚠️ SAI: When I arrived, she left. → ĐÚNG: When I arrived, she had left. (trước → Past Perfect)\n⚠️ SAI: I have seen him yesterday. → ĐÚNG: I saw him yesterday. (có mốc QK → Past Simple)\n⚠️ SAI: She is study now. → ĐÚNG: She is studying now. (am/is/are + V-ing)' }
    ],
    sentences: [
      { text: "She has been working here since she graduated", trans: "Cô ấy đã làm việc ở đây từ khi tốt nghiệp" },
      { text: "By this time next year I will have finished my degree", trans: "Tính đến lúc này năm tới tôi sẽ hoàn thành bằng cấp" },
      { text: "While I was cooking dinner the doorbell rang", trans: "Trong khi tôi đang nấu tối chuông cửa reo" },
      { text: "She had already left when I arrived at the party", trans: "Cô ấy đã rời đi khi tôi đến bữa tiệc" },
      { text: "They are planning to move to a new house next month", trans: "Họ đang lên kế hoạch chuyển nhà tháng tới" },
      { text: "I have never been to Japan but I want to go", trans: "Tôi chưa bao giờ đến Nhật nhưng tôi muốn đi" },
      { text: "He always drinks coffee in the morning before work", trans: "Anh ấy luôn uống cà phê buổi sáng trước khi làm" },
      { text: "At this time tomorrow I will be flying to London", trans: "Lúc này ngày mai tôi sẽ đang bay đến London" },
      { text: "By the time you arrive the movie will have started", trans: "Khi bạn đến phim đã bắt đầu rồi" },
      { text: "She had been studying for three hours when he called", trans: "Cô ấy đã học được ba tiếng khi anh ấy gọi" }
    ],
    exercises: [
      { q: "She usually _______ to work by bus. (go)", opts: ["goes", "is going", "has gone", "went"], a: "goes" },
      { q: "Look! The children _______ in the garden. (play)", opts: ["play", "are playing", "played", "have played"], a: "are playing" },
      { q: "I _______ this movie before. (see)", opts: ["saw", "see", "have seen", "am seeing"], a: "have seen" },
      { q: "She _______ to Paris last summer. (go)", opts: ["goes", "has gone", "went", "is going"], a: "went" },
      { q: "While I _______, the phone rang. (cook)", opts: ["cooked", "was cooking", "have cooked", "cook"], a: "was cooking" },
      { q: "By the time he arrived, she _______. (leave)", opts: ["left", "has left", "had left", "leaves"], a: "had left" },
      { q: "They _______ here for 10 years. (live)", opts: ["live", "lived", "have lived", "are living"], a: "have lived" },
      { q: "She _______ all day. She's exhausted. (work)", opts: ["works", "worked", "has been working", "is working"], a: "has been working" },
      { q: "I _______ you tomorrow. (call)", opts: ["call", "am calling", "will call", "called"], a: "will call" },
      { q: "At 8 PM tomorrow, I _______ TV. (watch)", opts: ["watch", "will watch", "will be watching", "watched"], a: "will be watching" },
      { q: "By next June, she _______ her degree. (finish)", opts: ["finishes", "will finish", "will have finished", "finished"], a: "will have finished" },
      { q: "I _______ him since 2010. (know)", opts: ["know", "knew", "have known", "am knowing"], a: "have known" },
      { q: "She _______ when I got home. (sleep)", opts: ["sleeps", "slept", "was sleeping", "has slept"], a: "was sleeping" },
      { q: "He _______ for 2 hours before I joined. (run)", opts: ["ran", "has run", "had been running", "was running"], a: "had been running" },
      { q: "I _______ her yesterday. (meet)", opts: ["meet", "have met", "met", "am meeting"], a: "met" }
    ]
  }
];

// Build the output
const output = B2_TOPICS.map(topic => {
  const sentenceGame = topic.sentences.map((s, i) => ({
    id: i + 1,
    text: s.text,
    trans: s.trans
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
    level: 'B2',
    category: topic.category,
    color: topic.color,
    theory: topic.theory,
    sentenceGame,
    exercises
  };
});

const fileContent = `// File: src/data/grammarDataB2.js
// Auto-generated B2 Grammar Data (Intermediate Level)
// Based on Destination B2 curriculum structure

export const grammarDataB2 = ${JSON.stringify(output, null, 2)};
`;

fs.writeFileSync('src/data/grammarDataB2.js', fileContent);
console.log(`Successfully generated grammarDataB2.js with ${output.length} topics`);
