// File: scripts/data/voa_questions.mjs
// CÂU HỎI HIỂU Ý — SOẠN TAY, TỪNG CÂU MỘT.
//
// Không có máy sinh nào chạm vào file này. Câu hỏi đọc/nghe hiểu sinh từ khuôn
// mẫu ("Từ X có nghĩa là gì?" nhân lên cho mọi từ) chính là loại nội dung đã bị
// xoá khỏi kho trong chuỗi dọn nội dung. Mỗi câu dưới đây được viết sau khi đọc
// hết bản chép lời của bài đó.
//
// Nguyên tắc khi viết:
//   - Hỏi Ý, không hỏi việc nhớ một từ đã nghe. "Người kể dùng ví dụ nào để
//     giải thích..." tốt hơn "Từ tedious nghĩa là gì".
//   - Đáp án PHẢI có trong bản chép lời. Không hỏi thứ người nghe phải suy đoán
//     ngoài bài.
//   - Các lựa chọn sai phải HỢP LÝ: lấy từ nội dung có thật trong bài nhưng trả
//     lời sai câu hỏi. Lựa chọn sai vô lý làm bài trở nên đoán được.
//   - Bốn lựa chọn phải KHÁC NHAU, phân biệt cả chữ hoa chữ thường.
export const CAU_HOI = {
  // 'Watching the Grass Grow' Is Not Fun
  'voa-8003108': [
    {
      q: 'Thành ngữ “like watching grass grow” dùng để tả điều gì?',
      opts: ['Một việc rất thú vị', 'Một trải nghiệm chán ngắt, tẻ nhạt', 'Một việc diễn ra rất nhanh', 'Một việc đòi hỏi nhiều sức lực'],
      a: 'Một trải nghiệm chán ngắt, tẻ nhạt',
      why: 'Bài nói: “We use this expression to describe an experience that is uninteresting. Another good word to describe it is tedious.”',
    },
    {
      q: 'Người kể đưa ra hai ví dụ nào cho thành ngữ đó?',
      opts: ['Bài diễn văn hai tiếng và trận thể thao dài', 'Một buổi hoà nhạc và một chuyến bay', 'Một lớp học và một cuộc họp', 'Một bộ phim và một quyển sách'],
      a: 'Bài diễn văn hai tiếng và trận thể thao dài',
      why: 'Bài nói: “After the politician won his campaign, he gave a two-hour long acceptance speech” và “I really don’t like watching long sports games.”',
    },
    {
      q: '“Don’t let the grass grow under your feet” nghĩa là gì?',
      opts: ['Hãy nghỉ ngơi cho lại sức', 'Đừng giẫm lên cỏ', 'Đừng chần chừ — hãy bắt tay vào việc', 'Hãy đứng yên một chỗ'],
      a: 'Đừng chần chừ — hãy bắt tay vào việc',
      why: 'Bài dùng câu này như một mệnh lệnh: “Don’t let the grass grow beneath your feet. Get back to work.”',
    },
    {
      q: 'Vì sao hình ảnh cỏ mọc lại sinh ra được HAI thành ngữ trái ngược nhau?',
      opts: [
        'Vì cỏ mọc vừa chậm để tả sự tẻ nhạt, vừa mọc dưới chân người đứng yên để tả sự chần chừ',
        'Vì cỏ có hai loại khác nhau',
        'Vì một thành ngữ dùng ở Anh, một dùng ở Mỹ',
        'Vì hai thành ngữ ra đời cách nhau rất lâu',
      ],
      a: 'Vì cỏ mọc vừa chậm để tả sự tẻ nhạt, vừa mọc dưới chân người đứng yên để tả sự chần chừ',
      why: 'Hình ảnh thứ hai nằm ở câu: “If you stand in one place for a long time, the grass will continue to grow under your feet.”',
    },
  ],

  // How to 'Dish Up' Something Good
  'voa-7980848': [
    {
      q: 'Theo bài, “a signature dish” là gì?',
      opts: ['Món ăn mà bạn nổi tiếng vì nấu ngon', 'Món ăn đắt tiền nhất trên thực đơn', 'Món ăn bạn ký tên lên đó', 'Món ăn của nhà hàng nổi tiếng'],
      a: 'Món ăn mà bạn nổi tiếng vì nấu ngon',
      why: 'Bài nói: “a signature dish is a dish we are known for making well. In a way, it identifies us.”',
    },
    {
      q: 'Người kể lấy món gì của chính mình làm ví dụ?',
      opts: ['Bánh mì cuộn khoai lang hương thảo', 'Bánh táo', 'Súp gà', 'Salad rau trộn'],
      a: 'Bánh mì cuộn khoai lang hương thảo',
      why: '“My signature dish is sweet potato rosemary dinner rolls.”',
    },
    {
      q: 'Ngoài nghĩa về đồ ăn, động từ “to dish” còn nghĩa gì?',
      opts: ['Rửa bát', 'Đặt bàn ăn', 'Kể chuyện riêng tư, buôn chuyện', 'Nấu ăn cho nhiều người'],
      a: 'Kể chuyện riêng tư, buôn chuyện',
      why: '“To dish” can mean to talk about private or personal information. It might be gossip.',
    },
    {
      q: 'Câu “They can dish it out, but they can’t take it” nói về kiểu người nào?',
      opts: [
        'Người thích chê bai người khác nhưng không chịu được khi bị chê lại',
        'Người nấu ăn ngon nhưng không thích ăn',
        'Người hay cho đi nhưng không nhận lại',
        'Người nói nhiều nhưng làm ít',
      ],
      a: 'Người thích chê bai người khác nhưng không chịu được khi bị chê lại',
      why: 'Bài nói: “They are able and willing to share harsh thoughts, criticisms, or insults about others, but they do not think they, themselves, deserve such treatment.”',
    },
  ],

  // The Importance of Being 'Dialed In'
  'voa-7979814': [
    {
      q: 'Vì sao tiếng Anh vẫn còn những thành ngữ như “dialed in”, “stay tuned”?',
      opts: [
        'Vì các thành ngữ này mới ra đời gần đây',
        'Vì chúng sinh ra từ những công nghệ cũ như núm vặn đài, dù công nghệ đã đổi',
        'Vì người Mỹ vẫn dùng đài nhiều hơn TV',
        'Vì chúng do các đài phát thanh nghĩ ra để quảng cáo',
      ],
      a: 'Vì chúng sinh ra từ những công nghệ cũ như núm vặn đài, dù công nghệ đã đổi',
      why: 'Bài nói: “some expressions and idioms used by English speakers still describe older technologies.”',
    },
    {
      q: 'Nói một người “dialed in to a project” nghĩa là gì?',
      opts: [
        'Họ biết chính xác cần làm gì và đang rất tập trung',
        'Họ vừa mới nhận dự án',
        'Họ đang gọi điện bàn về dự án',
        'Họ không hiểu dự án đó',
      ],
      a: 'Họ biết chính xác cần làm gì và đang rất tập trung',
      why: '“You know exactly what needs to be done. You are thinking clearly about it and remain very focused.”',
    },
    {
      q: 'Bài phân biệt “flip the switch” với núm vặn (dial) ở điểm nào?',
      opts: [
        'Công tắc chỉ có bật hoặc tắt, không có nấc ở giữa như núm vặn',
        'Công tắc đắt hơn núm vặn',
        'Công tắc dùng cho đài, núm vặn dùng cho TV',
        'Công tắc là đồ kỹ thuật số, núm vặn là đồ cơ khí',
      ],
      a: 'Công tắc chỉ có bật hoặc tắt, không có nấc ở giữa như núm vặn',
      why: '“These are built to either be off or on. There are no in-between settings like with a dial.”',
    },
    {
      q: '“To move the needle” nghĩa là gì?',
      opts: [
        'Tạo ra một thay đổi thấy rõ, thường là theo hướng tốt',
        'Bắt đầu một việc mới',
        'Sửa một chiếc đồng hồ',
        'Làm hỏng một thiết bị đo',
      ],
      a: 'Tạo ra một thay đổi thấy rõ, thường là theo hướng tốt',
      why: '“When something moves the needle, it causes a noticeable change in something, usually for the good.”',
    },
  ],

  // Sometimes We 'Spread Ourself Too Thin'
  'voa-7940837': [
    {
      q: '“Spread ourselves too thin” nghĩa là gì?',
      opts: ['Nhận quá nhiều việc, quá sức mình', 'Ăn kiêng để giảm cân', 'Chia tiền cho quá nhiều người', 'Làm việc quá chậm'],
      a: 'Nhận quá nhiều việc, quá sức mình',
      why: '“This expression means we have taken on too much. We are pushed to the limit.”',
    },
    {
      q: 'Theo bài, làm nhiều việc cùng lúc dẫn tới hậu quả gì?',
      opts: [
        'Có thể không việc nào xong tử tế, và còn gây căng thẳng',
        'Mọi việc đều xong nhanh hơn',
        'Chỉ việc quan trọng nhất mới xong',
        'Không có hậu quả gì đáng kể',
      ],
      a: 'Có thể không việc nào xong tử tế, và còn gây căng thẳng',
      why: '“It is possible that none will get done well, if they get done at all. And it is possible such multitasking could stress us out.”',
    },
    {
      q: 'Thành ngữ nào trong bài mang nghĩa gần giống “spread ourselves too thin”?',
      opts: ['Bite off more than we can chew', 'Watch the grass grow', 'Dish it out', 'Move the needle'],
      a: 'Bite off more than we can chew',
      why: '“Being spread too thin can also be described as biting off more than we can chew.”',
    },
    {
      q: 'Trong đoạn hội thoại, vì sao học sinh giỏi lại lỡ hạn nộp bài?',
      opts: [
        'Vì các em cùng diễn một vở kịch, tập mỗi tối, lại còn đi làm thêm',
        'Vì các em không hiểu đề bài',
        'Vì các em bị ốm',
        'Vì giáo viên ra hạn quá ngắn',
      ],
      a: 'Vì các em cùng diễn một vở kịch, tập mỗi tối, lại còn đi làm thêm',
      why: '“They are all performing in the same play. So, they have had rehearsals every night for the past month. And many have part-time jobs as well.”',
    },
  ],

  // What Does It Take to Be a 'Power Couple'?
  'voa-7963076': [
    {
      q: 'Cụm “joined at the hip” tả hai người như thế nào?',
      opts: ['Gần như lúc nào cũng đi cùng nhau', 'Hai người có cùng nghề nghiệp', 'Hai người vừa mới quen nhau', 'Hai người hay cãi nhau'],
      a: 'Gần như lúc nào cũng đi cùng nhau',
      why: '“If we say two people are joined at the hip, they are nearly always together.”',
    },
    {
      q: 'Theo bài, “power couple” là cặp đôi thế nào?',
      opts: [
        'Hai người yêu nhau và đều rất thành đạt',
        'Hai người cùng làm trong ngành điện',
        'Hai người giàu nhất trong công ty',
        'Hai người lãnh đạo cùng một tổ chức',
      ],
      a: 'Hai người yêu nhau và đều rất thành đạt',
      why: '“two people who are romantically involved and very successful.”',
    },
    {
      q: 'Hai người trong một “power couple” có bắt buộc làm cùng ngành không?',
      opts: [
        'Không bắt buộc, nhưng nếu cùng ngành thì có thể còn mạnh hơn',
        'Bắt buộc phải cùng ngành',
        'Bắt buộc phải khác ngành',
        'Bài không nhắc tới điều này',
      ],
      a: 'Không bắt buộc, nhưng nếu cùng ngành thì có thể còn mạnh hơn',
      why: '“the two people do not have to work in the same industry. If they do, however, that can make them even more powerful.”',
    },
    {
      q: 'Kết thúc đoạn hội thoại, người B phản ứng ra sao?',
      opts: [
        'Phủ nhận hết, nói hai người chỉ đang cùng làm một dự án',
        'Thừa nhận họ là một power couple',
        'Nổi giận rồi bỏ đi',
        'Nói rằng họ sắp cưới nhau',
      ],
      a: 'Phủ nhận hết, nói hai người chỉ đang cùng làm một dự án',
      why: '“We’re not thick as thieves or kindred spirits, and we’re definitely not a power couple. We are just working hard on the same project!”',
    },
  ],

  // Knee Jerk and Gut Reactions
  'voa-7937763': [
    {
      q: 'Từ “knee jerk” bắt nguồn từ đâu?',
      opts: [
        'Từ một phản xạ y học: gõ nhẹ vào gân dưới xương bánh chè thì chân đá lên',
        'Từ một môn thể thao',
        'Từ một bộ phim nổi tiếng',
        'Từ tên một bác sĩ',
      ],
      a: 'Từ một phản xạ y học: gõ nhẹ vào gân dưới xương bánh chè thì chân đá lên',
      why: '“an involuntary forward kick produced by a light blow on the tendon below the kneecap.”',
    },
    {
      q: 'Hai từ nào là chìa khoá để hiểu “knee jerk”?',
      opts: ['Involuntary và automatic', 'Quick và strong', 'Medical và physical', 'Negative và critical'],
      a: 'Involuntary và automatic',
      why: '“The words ‘involuntary’ and ‘automatic’ are important when understanding the term ‘knee jerk’.”',
    },
    {
      q: '“Knee jerk” và “gut reaction” khác nhau ở chỗ nào?',
      opts: [
        '“Knee jerk” thường nói về người khác và mang ý chê; “gut reaction” là cảm giác linh tính, thường nói về chính mình',
        '“Knee jerk” nhanh hơn “gut reaction”',
        '“Gut reaction” chỉ dùng trong y học',
        'Hai cụm hoàn toàn giống nhau',
      ],
      a: '“Knee jerk” thường nói về người khác và mang ý chê; “gut reaction” là cảm giác linh tính, thường nói về chính mình',
      why: 'Bài nói “We often use knee-jerk in a criticizing or negative way” và “We usually talk about our own gut reactions or impulses, not others.”',
    },
    {
      q: 'Người kể dùng chuyện gì của chính mình để minh hoạ “gut instinct”?',
      opts: [
        'Chuyện đang leo núi thì thấy bất an nên quay xuống, sau mới biết vùng đó có gấu',
        'Chuyện bị lạc đường trong thành phố',
        'Chuyện từ chối một công việc',
        'Chuyện chọn mua một ngôi nhà',
      ],
      a: 'Chuyện đang leo núi thì thấy bất an nên quay xuống, sau mới biết vùng đó có gấu',
      why: '“my gut instinct was to turn around and head back down the mountain. I later found out that a dangerous bear had been sighted in the same area.”',
    },
  ],

  // ---- Ask a Teacher ------------------------------------------------------

  // Sew and Knit
  'voa-7995839': [
    {
      q: 'Khác biệt cốt lõi giữa “sew” và “knit” là gì?',
      opts: [
        'Khâu là nối những mảnh vải đã có sẵn; đan là làm ra chính tấm vải từ sợi',
        'Khâu làm bằng tay, đan làm bằng máy',
        'Khâu dùng cho quần áo, đan dùng cho chăn màn',
        'Khâu là nghề, đan là thú vui',
      ],
      a: 'Khâu là nối những mảnh vải đã có sẵn; đan là làm ra chính tấm vải từ sợi',
      why: 'Bài nói: “when we sew, we connect pieces of fabric or cloth that are already made. When we knit, we make the cloth itself from strings called yarn.”',
    },
    {
      q: 'Dụng cụ của hai việc khác nhau thế nào?',
      opts: [
        'Khâu dùng kim và chỉ (có thể có máy khâu); đan dùng hai que đan và sợi len dày',
        'Cả hai đều dùng máy',
        'Khâu dùng que đan, đan dùng kim chỉ',
        'Cả hai đều chỉ dùng tay không',
      ],
      a: 'Khâu dùng kim và chỉ (có thể có máy khâu); đan dùng hai que đan và sợi len dày',
      why: 'Bài nói: “To knit, a person uses thicker strings called yarn, along with two thin sticks called knitting needles.”',
    },
    {
      q: 'Sợi đan dày hơn chỉ khâu bao nhiêu?',
      opts: [
        'Chỉ khâu thường dưới 1 mm, sợi đan khoảng 2–5 mm',
        'Cả hai đều khoảng 1 mm',
        'Sợi đan mỏng hơn chỉ khâu',
        'Bài không nói tới độ dày',
      ],
      a: 'Chỉ khâu thường dưới 1 mm, sợi đan khoảng 2–5 mm',
      why: 'Bài nói: “While sewing thread is often less than one millimeter thick, knitting yarn is generally two to five millimeters thick.”',
    },
    {
      q: 'Người có nghề sửa quần áo cho vừa vặn được gọi là gì?',
      opts: ['Tailor', 'Seamstress', 'Sewist', 'Knitter'],
      a: 'Tailor',
      why: 'Bài nói: “a person whose job is to sew or repair clothes to make them fit well is called a tailor.”',
    },
  ],

  // Beach, Coast, Shore
  'voa-7989017': [
    {
      q: 'Trong ba từ beach, coast, shore, từ nào có nghĩa CỤ THỂ nhất?',
      opts: ['Beach', 'Coast', 'Shore', 'Cả ba đều như nhau'],
      a: 'Beach',
      why: 'Bài mở đầu phần giải thích bằng: “The word “beach” is the most specific of the three words.”',
    },
    {
      q: 'Khác nhau giữa “at the beach” và “on the beach” là gì?',
      opts: [
        '“At the beach” nói chung về việc ở vùng biển; “on the beach” nói về hoạt động cụ thể ngay trên bãi',
        '“At the beach” trang trọng hơn “on the beach”',
        '“On the beach” chỉ dùng cho biển, “at the beach” dùng cho cả hồ',
        'Hai cách nói hoàn toàn thay thế được cho nhau',
      ],
      a: '“At the beach” nói chung về việc ở vùng biển; “on the beach” nói về hoạt động cụ thể ngay trên bãi',
      why: 'Bài nói: “We usually say “on the beach” when describing specific activities we do there”, còn “at the beach” dùng cho vùng chung quanh.',
    },
    {
      q: 'Vì sao Baltimore vẫn được gọi là thành phố “East Coast” dù cách Đại Tây Dương vài chục kilômét?',
      opts: [
        'Vì “coast” có thể chỉ cả một vùng rộng, không chỉ mép nước',
        'Vì Baltimore từng nằm sát biển',
        'Vì đó là cách gọi sai nhưng đã thành quen',
        'Vì Baltimore có cảng biển',
      ],
      a: 'Vì “coast” có thể chỉ cả một vùng rộng, không chỉ mép nước',
      why: 'Bài nói: “We can use the word to describe a wide area, however. For example, Baltimore, Maryland is an East Coast city even though it is several kilometers from the Atlantic Ocean.”',
    },
    {
      q: '“Shore” có luôn đồng nghĩa với “beach” không?',
      opts: [
        'Không — có thể cập bờ ở một bến cảng mà chẳng có bãi biển nào',
        'Có, hai từ luôn thay thế được cho nhau',
        'Không, vì “shore” chỉ dùng cho sông',
        'Không, vì “shore” chỉ dùng cho hồ',
      ],
      a: 'Không — có thể cập bờ ở một bến cảng mà chẳng có bãi biển nào',
      why: 'Bài nói: “you could also come to shore at a port with no beach in sight.”',
    },
  ],

  // Appeal
  'voa-7985917': [
    {
      q: 'Là động từ, “appeal” dùng cho loại yêu cầu nào?',
      opts: [
        'Yêu cầu trang trọng hoặc hệ trọng, không dùng cho việc vặt hằng ngày',
        'Mọi loại yêu cầu, kể cả nhờ mua sữa',
        'Chỉ yêu cầu trong toà án',
        'Chỉ yêu cầu bằng văn bản',
      ],
      a: 'Yêu cầu trang trọng hoặc hệ trọng, không dùng cho việc vặt hằng ngày',
      why: 'Bài nói: “appeal” means to make a request, often in official situations or involving important things. Generally, we do not use “appeal” for normal, everyday requests.',
    },
    {
      q: 'Tính từ “appealing” mang nghĩa gì?',
      opts: [
        'Có sức hấp dẫn, dễ ưa',
        'Đang được kháng cáo',
        'Cần được giúp đỡ',
        'Mang tính chính thức',
      ],
      a: 'Có sức hấp dẫn, dễ ưa',
      why: 'Bài nói: “This forms the word “appealing,” which describes something that has a pleasing quality.”',
    },
    {
      q: 'Trong toà án, toà CHẤP NHẬN và toà TỪ CHỐI một đơn kháng cáo được diễn đạt bằng động từ nào?',
      opts: [
        'granted và denied',
        'accepted và refused',
        'opened và closed',
        'approved và cancelled',
      ],
      a: 'granted và denied',
      why: 'Bài nói: “we can say the court “granted” the appeal. If the court rejects the appeal, we can say the court “denied” it.”',
    },
    {
      q: 'Tính từ nào chỉ loại toà chuyên xử các vụ đã kháng cáo?',
      opts: ['Appellate', 'Appealing', 'Appealed', 'Appealable'],
      a: 'Appellate',
      why: 'Bài nói: “The adjective “appellate” describes a kind of court that deals with cases that have been appealed.”',
    },
  ],

  // Extend, Expand, etc.
  'voa-7980779': [
    {
      q: 'Trong bốn động từ, từ nào KHÔNG dùng để nói về việc tăng thời gian?',
      opts: ['Enlarge', 'Extend', 'Stretch out', 'Expand'],
      a: 'Enlarge',
      why: 'Bài nói: “Unlike the verb “extend,” we do not use “enlarge” to talk about an increase in time.”',
    },
    {
      q: '“Expand” thường gắn với lĩnh vực nào nhất?',
      opts: ['Kinh doanh và công nghiệp', 'Y tế', 'Địa lý', 'Giáo dục phổ thông'],
      a: 'Kinh doanh và công nghiệp',
      why: 'Bài nói: “We commonly use “expand” in connection with business or industry.”',
    },
    {
      q: 'Khi nói “Learning a new language will stretch your mind”, người nói ngụ ý thêm điều gì?',
      opts: [
        'Sự tiến bộ đó có thể hơi khó và tốn nhiều công sức',
        'Việc đó rất dễ dàng',
        'Việc đó tốn nhiều tiền',
        'Việc đó cần rất nhiều thời gian',
      ],
      a: 'Sự tiến bộ đó có thể hơi khó và tốn nhiều công sức',
      why: 'Bài nói: “when we use the verb “stretch” in this way, we communicate the idea that the improvement might be a little difficult or take a lot of effort.”',
    },
    {
      q: 'Câu “The Rocky Mountains extend from the United States into Canada” cho thấy “extend” còn dùng để tả gì?',
      opts: [
        'Khoảng cách hoặc phạm vi mà một vật trải dài tới',
        'Thời gian tồn tại của dãy núi',
        'Chiều cao của dãy núi',
        'Số lượng người sống ở đó',
      ],
      a: 'Khoảng cách hoặc phạm vi mà một vật trải dài tới',
      why: 'Bài nói: “We can also use “extend” to express the distance or the area something reaches.”',
    },
  ],

  // Regimen
  'voa-7966564': [
    {
      q: '“Regimen” nghĩa là gì?',
      opts: [
        'Một chế độ hoạt động lặp đi lặp lại, nhất là trong tập luyện',
        'Một buổi tập duy nhất',
        'Một loại thuốc',
        'Một môn thể thao',
      ],
      a: 'Một chế độ hoạt động lặp đi lặp lại, nhất là trong tập luyện',
      why: 'Bài nói: “A regimen is usual and repeated action, especially in training.”',
    },
    {
      q: 'Danh từ đứng trước “regimen” (như trong “running regimen”) được gọi là gì?',
      opts: [
        'Attributive noun — danh từ dùng như tính từ',
        'Compound verb',
        'Quantifier',
        'Modal noun',
      ],
      a: 'Attributive noun — danh từ dùng như tính từ',
      why: 'Bài nói: “These are called attributive nouns. They act similarly to adjectives.”',
    },
    {
      q: 'Muốn nói một chế độ GỒM những gì, bài gợi ý dùng cụm nào?',
      opts: ['consist of', 'made by', 'depend on', 'take up'],
      a: 'consist of',
      why: 'Bài nói: “we can use the verb and preposition “consist of”.”',
    },
    {
      q: 'Từ nào người bản ngữ đôi khi dùng thay cho “regimen”?',
      opts: ['Routine', 'Practice', 'Session', 'Schedule'],
      a: 'Routine',
      why: 'Bài nói: “native speakers might substitute the word “routine” for “regimen” in some situations.”',
    },
  ],

  // Regarding and Regardless
  'voa-7958511': [
    {
      q: '“Regarding” có nghĩa gần nhất với từ nào?',
      opts: ['About', 'Without', 'Because', 'Although'],
      a: 'About',
      why: 'Bài nói: “The word “regarding” in the second example means the same thing as the preposition “about” in the first example.”',
    },
    {
      q: 'So với “about”, khi nào người ta hay dùng “regarding” hơn?',
      opts: [
        'Trong lời nói trang trọng',
        'Trong hội thoại thân mật',
        'Khi viết cho trẻ em',
        'Khi nói nhanh',
      ],
      a: 'Trong lời nói trang trọng',
      why: 'Bài nói: “it is more common to use “regarding” in formal speech than in informal communication.”',
    },
    {
      q: 'Vì sao “regardless” lại có nghĩa “bất kể”?',
      opts: [
        'Vì hậu tố -less mang nghĩa “without”, nên regardless = without regard to',
        'Vì nó bắt nguồn từ tiếng Latin',
        'Vì nó là dạng phủ định của động từ regard',
        'Vì nó luôn đứng đầu câu',
      ],
      a: 'Vì hậu tố -less mang nghĩa “without”, nên regardless = without regard to',
      why: 'Bài nói: “This suffix means the same thing as the word “without.” So, “regardless” means “without regard to.”',
    },
    {
      q: 'Sau cụm “in regard to” phải dùng loại từ gì?',
      opts: [
        'Danh từ, cụm danh từ hoặc mệnh đề danh từ',
        'Động từ nguyên thể',
        'Tính từ',
        'Trạng từ',
      ],
      a: 'Danh từ, cụm danh từ hoặc mệnh đề danh từ',
      why: 'Bài nói: “we use a noun, noun phrase, or noun clause after the expression “in regard to.”',
    },
  ],

  // Apply and Application
  'voa-7932638': [
    {
      q: 'Khi nào dùng “apply for” và khi nào dùng “apply to”?',
      opts: [
        '“Apply for” khi xin việc hoặc xin hỗ trợ tài chính; “apply to” khi xin vào trường học',
        '“Apply for” khi xin vào trường; “apply to” khi xin việc',
        'Hai cách dùng hoàn toàn thay thế được cho nhau',
        '“Apply to” chỉ dùng trong văn viết',
      ],
      a: '“Apply for” khi xin việc hoặc xin hỗ trợ tài chính; “apply to” khi xin vào trường học',
      why: 'Bài nói: “we say “apply for” when trying to get a job, we say “apply to” when we are trying to get accepted into a school or other program”, và “we say “apply for” when we are trying to get financial aid or special awards.”',
    },
    {
      q: 'Cụm động từ nào dùng cho việc điền một đơn xin việc?',
      opts: ['Fill out', 'Fill in for', 'Take up', 'Put down'],
      a: 'Fill out',
      why: 'Bài nói: “We commonly use the phrasal verb “fill out” to express the act of completing an application.”',
    },
    {
      q: 'Ngoài nghĩa “nộp đơn”, “apply to” còn nghĩa gì?',
      opts: [
        'Có liên quan tới, hoặc đúng với một nhóm người hay sự vật',
        'Đến gần một nơi nào đó',
        'Chấp nhận một quy tắc',
        'Trả lời một câu hỏi',
      ],
      a: 'Có liên quan tới, hoặc đúng với một nhóm người hay sự vật',
      why: 'Bài nói: “It can mean that something relates to something else, or that something is true for all people or things.”',
    },
    {
      q: '“Apply yourself” nghĩa là gì?',
      opts: [
        'Chăm chỉ làm việc suốt một thời gian để hoàn thành hoặc rèn được một kỹ năng',
        'Tự nộp đơn thay vì nhờ người khác',
        'Tự đánh giá bản thân',
        'Tự học không cần thầy',
      ],
      a: 'Chăm chỉ làm việc suốt một thời gian để hoàn thành hoặc rèn được một kỹ năng',
      why: 'Bài nói: “that means that you are working hard over a period of time to complete a project or develop a skill.”',
    },
  ],

  // Remaining, Remainder, and Rest of
  'voa-7927796': [
    {
      q: 'Vì sao không thể thay “the remaining countries” bằng “the remain”?',
      opts: [
        'Vì “remain” là động từ, mà ở đây cần một tính từ đứng trước danh từ',
        'Vì “remain” là từ cổ, không còn dùng',
        'Vì “remain” chỉ dùng số ít',
        'Vì “remain” chỉ dùng trong văn nói',
      ],
      a: 'Vì “remain” là động từ, mà ở đây cần một tính từ đứng trước danh từ',
      why: 'Bài nói: “the word “remain” is a verb, and the term “the rest” is a quantifier. To describe the word “countries,” we need to use an adjective.”',
    },
    {
      q: 'Muốn dùng “the rest” để bổ nghĩa cho một danh từ thì phải viết thế nào?',
      opts: [
        '“The rest of the” — đủ bốn từ',
        '“The rest” — hai từ là đủ',
        '“Rest of” — hai từ',
        '“The resting” — thêm đuôi -ing',
      ],
      a: '“The rest of the” — đủ bốn từ',
      why: 'Bài nói: “you need to use four words. These four words are “the rest of the.”',
    },
    {
      q: 'Giữa “the rest of the” và “the remainder of the”, cụm nào phổ biến hơn?',
      opts: [
        '“The rest of the”, nhất là trong tiếng Anh nói',
        '“The remainder of the”, nhất là trong tiếng Anh nói',
        'Hai cụm dùng ngang nhau',
        'Cả hai đều hiếm gặp',
      ],
      a: '“The rest of the”, nhất là trong tiếng Anh nói',
      why: 'Bài nói: “we use the quantifier “the rest of the” much more often, especially in spoken English, than “the remainder of the.”',
    },
    {
      q: 'Trong toán học, “the remainder” chỉ cái gì?',
      opts: [
        'Phần dư khi chia hoặc phần còn lại khi trừ',
        'Kết quả của phép nhân',
        'Số lớn nhất trong một dãy',
        'Số bị chia',
      ],
      a: 'Phần dư khi chia hoặc phần còn lại khi trừ',
      why: 'Bài nói: “It can also be what is left over from the process of subtraction.”',
    },
  ],

  // ---- Education Tips -----------------------------------------------------

  // Learn New Skills with Microcredentials
  'voa-7908673': [
    {
      q: 'UNESCO định nghĩa “microcredential” thế nào?',
      opts: [
        'Chứng chỉ nghề tập trung vào một nhóm kết quả học tập hẹp, học trong thời gian ngắn hơn chương trình đại học',
        'Một tấm bằng đại học rút gọn hai năm',
        'Một khoá học miễn phí hoàn toàn',
        'Một kỳ thi do chính phủ tổ chức',
      ],
      a: 'Chứng chỉ nghề tập trung vào một nhóm kết quả học tập hẹp, học trong thời gian ngắn hơn chương trình đại học',
      why: 'Bài nói: “professional certification that centers on a set of learning outcomes in a narrow field. It is completed over a shorter time than a traditional university program, from a week to a month.”',
    },
    {
      q: 'Những lĩnh vực nào có nhiều microcredential nhất?',
      opts: [
        'Phân tích dữ liệu, hỗ trợ công nghệ thông tin và an ninh mạng',
        'Y khoa, luật và kiến trúc',
        'Nông nghiệp và du lịch',
        'Nghệ thuật và âm nhạc',
      ],
      a: 'Phân tích dữ liệu, hỗ trợ công nghệ thông tin và an ninh mạng',
      why: 'Bài nói: “The most popular fields in which microcredentials appear are data analytics, information technology support and cybersecurity.”',
    },
    {
      q: 'Theo báo cáo của Coursera, bao nhiêu phần trăm trường đại học Mỹ có microcredential cũng công nhận tín chỉ cho chúng?',
      opts: ['51 phần trăm', '15 phần trăm', '75 phần trăm', '90 phần trăm'],
      a: '51 phần trăm',
      why: 'Bài nói: “51 percent of colleges in the United States that offer microcredentials also provide school credit.”',
    },
    {
      q: 'Học tài liệu và lấy chứng chỉ khác nhau ở điểm nào về chi phí?',
      opts: [
        'Nhiều nơi cho học tài liệu miễn phí, nhưng muốn lấy chứng chỉ thì phải trả tiền',
        'Cả hai đều miễn phí',
        'Cả hai đều phải trả tiền',
        'Học thì mất phí, lấy chứng chỉ thì miễn phí',
      ],
      a: 'Nhiều nơi cho học tài liệu miễn phí, nhưng muốn lấy chứng chỉ thì phải trả tiền',
      why: 'Bài nói: “Many of the course providers permit learners to use the materials for free, but to earn a certification, payment is required.”',
    },
  ],

  // Tips for Better Writing
  'voa-2453053': [
    {
      q: 'Điều đầu tiên bà Ahern-Dodson muốn người học nhận ra về việc viết là gì?',
      opts: [
        'Viết là việc khó với tất cả mọi người, ai rồi cũng có lúc bế tắc',
        'Chỉ người học ngoại ngữ mới thấy viết khó',
        'Viết sẽ dễ dần nếu luyện đủ nhiều',
        'Viết là năng khiếu bẩm sinh',
      ],
      a: 'Viết là việc khó với tất cả mọi người, ai rồi cũng có lúc bế tắc',
      why: 'Bà nói: “Writing is hard. All writers struggle at some point.”',
    },
    {
      q: 'Theo bà, vì sao nhiều người có trải nghiệm tệ với việc viết?',
      opts: [
        'Vì họ chỉ lo bài viết cuối cùng phải trông thế nào — đủ mấy trang, đúng ngữ pháp',
        'Vì họ không đọc đủ nhiều',
        'Vì giáo viên chấm quá khắt khe',
        'Vì họ viết bằng ngôn ngữ mẹ đẻ',
      ],
      a: 'Vì họ chỉ lo bài viết cuối cùng phải trông thế nào — đủ mấy trang, đúng ngữ pháp',
      why: 'Bà nói: “they primarily focus on, and worry about, what the final product has to look like, like how many pages for a research essay?”',
    },
    {
      q: 'Việc chỉ chăm chăm vào sản phẩm cuối cùng gây ra hậu quả gì?',
      opts: [
        'Rất khó bắt đầu viết',
        'Bài viết dài hơn cần thiết',
        'Ngữ pháp kém đi',
        'Mất nhiều thời gian tìm tài liệu',
      ],
      a: 'Rất khó bắt đầu viết',
      why: 'Bà nói: “focusing on the end makes it really hard to get started.”',
    },
    {
      q: 'Bà khuyên chuyển sự chú ý sang đâu?',
      opts: [
        'Sang người đọc và điều mình thật sự muốn nói với họ',
        'Sang việc chọn từ vựng hay hơn',
        'Sang việc lập dàn ý chi tiết',
        'Sang việc đọc thêm sách tham khảo',
      ],
      a: 'Sang người đọc và điều mình thật sự muốn nói với họ',
      why: 'Bà nói: “Think about who your audience is, and what it is that you really want to say to them.”',
    },
  ],
  // ===== ĐỢT 3 (16 bài) — mỗi bài viết sau khi đọc hết bản chép lời =====

  // Using the Phonetic Alphabet
  'voa-7897823': [
    {
      q: 'Theo bài, “phoneme” (âm vị) là gì?',
      opts: ['Mỗi âm riêng lẻ ta phát ra khi nói', 'Một chữ cái trong bảng chữ cái', 'Một từ ngắn có nghĩa', 'Một dấu nhấn trọng âm'],
      a: 'Mỗi âm riêng lẻ ta phát ra khi nói',
      why: 'Bài nói: “Each separate sound we make when we talk is called a phoneme.” Ví dụ từ “cat” có ba âm vị.',
    },
    {
      q: 'Trong ví dụ với từ “cat”, ký hiệu phiên âm nào trông giống hệt chữ cái tiếng Anh?',
      opts: ['Ký hiệu của chữ “t”', 'Ký hiệu của chữ “c”', 'Ký hiệu của nguyên âm ở giữa', 'Cả ba ký hiệu đều giống'],
      a: 'Ký hiệu của chữ “t”',
      why: 'Bài nói chỉ có ký hiệu của chữ “t” là “looks the same as the English letter for that sound.”',
    },
    {
      q: 'Bài khuyên dùng bảng phiên âm để làm gì trước tiên?',
      opts: [
        'Nhận ra những âm mà chính mình đang thấy khó',
        'Học thuộc toàn bộ 44 ký hiệu theo thứ tự',
        'Thay chữ viết thường bằng ký hiệu khi ghi chép',
        'Đoán cách viết chính tả của từ mới',
      ],
      a: 'Nhận ra những âm mà chính mình đang thấy khó',
      why: 'Bài nói “Try to identify the phonemes that are difficult for you”, vì “small differences between some vowel sounds in American English may be difficult for some ” người không bản ngữ nghe ra.',
    },
    {
      q: 'Bài chỉ ra công cụ nào cho nghe được âm thanh của TỪNG ký hiệu phiên âm?',
      opts: [
        'IPA Pronunciation Guide trên trang Vocabulary.com',
        'Từ điển Merriam-Webster bản in',
        'Bảng chữ cái quốc tế in trên giấy',
        'Mục bình luận của VOA Learning English',
      ],
      a: 'IPA Pronunciation Guide trên trang Vocabulary.com',
      why: 'Bài nói công cụ này “has an audio element so you can listen to the sound of each symbol.”',
    },
  ],

  // Kinds and Types
  'voa-7902900': [
    {
      q: 'Câu hỏi của tuần này gửi tới từ đâu?',
      opts: ['Từ một người học ở Việt Nam', 'Từ một người học ở Nhật Bản', 'Từ một người học ở Ai Cập', 'Từ một giáo viên ở Ukraine'],
      a: 'Từ một người học ở Việt Nam',
      why: 'Mở đầu bài: “we answer a question from Ann in Vietnam about four words that help describe what group something belongs to.”',
    },
    {
      q: 'Quan hệ giữa “kind” và “type” là gì?',
      opts: [
        'Là từ đồng nghĩa, nghĩa chung nhất trong bốn từ',
        '“Kind” trang trọng hơn “type”',
        '“Type” chỉ dùng cho vật, “kind” chỉ dùng cho người',
        'Hai từ trái nghĩa nhau',
      ],
      a: 'Là từ đồng nghĩa, nghĩa chung nhất trong bốn từ',
      why: 'Bài nói hai từ này “are synonyms”, còn “species” và “genre” thì “are more specific than the two words ” đó.',
    },
    {
      q: 'Từ “species” dùng để phân loại nhóm nào?',
      opts: ['Sinh vật sống', 'Tác phẩm nghệ thuật', 'Phương tiện giao thông', 'Các loại thời tiết'],
      a: 'Sinh vật sống',
      why: 'Bài lấy ví dụ: “Elephants, cats, dogs, and mice are different species of animals.”',
    },
    {
      q: 'Từ “genre” dùng cho cái gì?',
      opts: [
        'Các thể loại của tác phẩm sáng tạo',
        'Các loài động vật',
        'Các loại phương tiện chạy điện',
        'Các nhóm nghề nghiệp',
      ],
      a: 'Các thể loại của tác phẩm sáng tạo',
      why: 'Bài nói ta dùng “genre” “to categorize styles of creative works”, ví dụ nhạc rock, hip-hop, cổ điển, jazz.',
    },
  ],

  // It and That
  'voa-7876003': [
    {
      q: 'Theo bài, ta thường dùng “it” để làm gì?',
      opts: [
        'Tả trạng thái chung của môi trường hoặc tình huống',
        'Đáp lại một câu cụ thể vừa nghe',
        'Nhấn mạnh một danh từ đã nhắc trước đó',
        'Hỏi lại khi chưa nghe rõ',
      ],
      a: 'Tả trạng thái chung của môi trường hoặc tình huống',
      why: 'Bài nói ta dùng “it” “to describe a general state of our environment or a situation.”',
    },
    {
      q: 'Còn “that” thường dùng khi nào?',
      opts: [
        'Khi đáp lại một điều cụ thể ai đó vừa nói',
        'Khi nói về thời tiết',
        'Khi mở đầu một câu chuyện mới',
        'Khi nói về một việc chưa xảy ra',
      ],
      a: 'Khi đáp lại một điều cụ thể ai đó vừa nói',
      why: 'Bài nói ta thường dùng “that” “to answer something specific that someone said.”',
    },
    {
      q: 'Ví dụ nào trong bài dùng “it” để nói về việc làm một điều gì đó nói chung?',
      opts: [
        '“It’s normal to feel nervous before giving a speech.”',
        '“That is the best answer I can give you.”',
        '“No, no, that is not what I mean.”',
        '“Did Diane say she was leaving her job?”',
      ],
      a: '“It’s normal to feel nervous before giving a speech.”',
      why: 'Bài đưa câu này ngay sau khi nói ta dùng “it” để tả việc làm gì đó nói chung: “s normal to feel nervous before giving a speech.”',
    },
    {
      q: 'Có bao giờ ta dùng “it” để đáp lại một điều cụ thể không?',
      opts: [
        'Có — ví dụ khi ai đó hỏi bạn có thích một hoạt động nào không',
        'Không bao giờ, đó luôn là chỗ của “that”',
        'Chỉ khi viết, không dùng khi nói',
        'Chỉ khi câu hỏi có từ để hỏi',
      ],
      a: 'Có — ví dụ khi ai đó hỏi bạn có thích một hoạt động nào không',
      why: 'Bài viết rõ: “there are times when we use the word ” “it” để trả lời một điều cụ thể.',
    },
  ],

  // Practice Your Listening
  'voa-7847923': [
    {
      q: 'Người gửi câu hỏi gặp vấn đề gì khi luyện nghe?',
      opts: [
        'Nghe đi nghe lại nhiều đến mức thuộc lòng bản thu thay vì luyện nghe',
        'Không tìm được tài liệu nghe miễn phí',
        'Không nghe được giọng Anh-Anh',
        'Nghe xong quên hết từ mới',
      ],
      a: 'Nghe đi nghe lại nhiều đến mức thuộc lòng bản thu thay vì luyện nghe',
      why: 'Người hỏi viết: “I was actually memorizing the audio recording instead of practicing listening.”',
    },
    {
      q: 'Bài khuyên chọn tài liệu nghe ở mức nào?',
      opts: [
        'Cao hơn trình độ hiện tại một chút',
        'Đúng bằng trình độ hiện tại',
        'Càng khó càng tốt',
        'Thấp hơn trình độ để nghe cho trôi',
      ],
      a: 'Cao hơn trình độ hiện tại một chút',
      why: 'Bài khuyên “try to find listening material that is just a bit above your ability”, để học từ mới mà không quá khó.',
    },
    {
      q: '“Transcribing” trong bài là làm gì?',
      opts: [
        'Viết ra từng từ mình nghe được',
        'Dịch bài nghe sang tiếng mẹ đẻ',
        'Đọc to theo bản chép lời',
        'Tóm tắt bài nghe bằng một câu',
      ],
      a: 'Viết ra từng từ mình nghe được',
      why: 'Bài nói: “One of the best ways to practice listening is by writing every word you hear.”',
    },
    {
      q: 'Vì sao cách chép lại giúp từ mới ở lại trong trí nhớ lâu hơn?',
      opts: [
        'Vì mình tự tìm ra đáp án cho một bài toán mình đã cố giải bằng tai',
        'Vì viết tay làm tay nhớ được chữ',
        'Vì mình phải tra từ điển nhiều lần',
        'Vì mình nghe đi nghe lại nhiều lần hơn',
      ],
      a: 'Vì mình tự tìm ra đáp án cho một bài toán mình đã cố giải bằng tai',
      why: 'Bài giải thích: “you are discovering the answer to a problem you have already tried to solve through listening.”',
    },
  ],

  // Obviously and Apparently
  'voa-7805936': [
    {
      q: 'Theo bài, có phải cái gì “obvious” thì ai cũng thấy rõ không?',
      opts: [
        'Không — có thứ chỉ hiển nhiên với người đủ kinh nghiệm hoặc hiểu biết',
        'Đúng, hiển nhiên nghĩa là ai cũng thấy',
        'Chỉ hiển nhiên khi nhìn tận mắt',
        'Chỉ hiển nhiên trong văn viết trang trọng',
      ],
      a: 'Không — có thứ chỉ hiển nhiên với người đủ kinh nghiệm hoặc hiểu biết',
      why: 'Bài nói: “some things are only obvious if you have enough experience or knowledge”, ví dụ thợ sửa xe lành nghề với người không biết gì về xe.',
    },
    {
      q: 'Điểm khác nhau chính giữa trạng từ “apparently” và “obviously” là gì?',
      opts: [
        '“Apparently” dựa trên điều nghe/đọc được, chưa chắc chắn',
        '“Apparently” trang trọng hơn nên chỉ dùng khi viết',
        '“Obviously” chỉ đứng đầu câu, “apparently” chỉ đứng cuối câu',
        'Hai từ hoàn toàn thay thế được cho nhau',
      ],
      a: '“Apparently” dựa trên điều nghe/đọc được, chưa chắc chắn',
      why: 'Bài nói ý đó “is usually based on information we have heard or read rather than our own direct experience.”',
    },
    {
      q: 'Nói “He’s obviously not a very good teacher” hàm ý gì?',
      opts: [
        'Người nói tin mình đủ thông tin để chắc chắn và cho rằng người khác cũng dễ đồng ý',
        'Người nói chỉ nghe kể lại nên không dám chắc',
        'Người nói đang hỏi ý kiến người nghe',
        'Người nói muốn nói giảm cho lịch sự',
      ],
      a: 'Người nói tin mình đủ thông tin để chắc chắn và cho rằng người khác cũng dễ đồng ý',
      why: 'Bài nói câu đó còn có nghĩa “you think others should easily understand or agree with what you are saying.”',
    },
    {
      q: 'Sau “obvious” và “apparent” thường là giới từ nào?',
      opts: ['“to” + đại từ tân ngữ', '“for” + danh từ', '“with” + đại từ', '“about” + danh động từ'],
      a: '“to” + đại từ tân ngữ',
      why: 'Bài cho ví dụ: “It was apparent to him that no one in the office had the right skills for the job.”',
    },
  ],

  // Who’s and Whose
  'voa-7693007': [
    {
      q: 'Cách dễ nhất để biết mình đang nghe “who’s” hay “whose” là gì?',
      opts: [
        'Nghe kỹ những từ đi ngay sau nó',
        'Nghe xem người nói nhấn mạnh chỗ nào',
        'Đợi đến hết câu rồi đoán theo ngữ cảnh',
        'Nghe độ dài của nguyên âm',
      ],
      a: 'Nghe kỹ những từ đi ngay sau nó',
      why: 'Bài nói: “The easiest way to know which word you are hearing is to listen for the words that follow it.”',
    },
    {
      q: 'Sau “who’s” thường là loại từ nào?',
      opts: ['Động từ', 'Danh từ', 'Tính từ sở hữu', 'Giới từ chỉ nơi chốn'],
      a: 'Động từ',
      why: 'Bài nói: “Often, the next word you hear after ” “who’s” là một động từ.',
    },
    {
      q: 'Còn sau “whose” thì nên chờ nghe thấy gì?',
      opts: [
        'Một danh từ, hoặc các từ “this/that/these/those”',
        'Một động từ ở thì hiện tại',
        'Một trạng từ chỉ tần suất',
        'Một liên từ',
      ],
      a: 'Một danh từ, hoặc các từ “this/that/these/those”',
      why: 'Bài dặn: “you should listen for a noun after the pronoun ” “whose”, hoặc nghe các từ “this”, “that”, “these”, “those”.',
    },
    {
      q: 'Ngoài “who is”, “who’s” còn có thể là dạng rút gọn của gì?',
      opts: ['“who has”', '“who was”', '“who does”', '“who would”'],
      a: '“who has”',
      why: 'Bài nói: “Last, we can contract the word ” “who” với động từ “has”, nên “Who has already seen this film?” nghe thành “who’s”.',
    },
  ],

  // Simple Past and Present Perfect
  'voa-2752310': [
    {
      q: 'Khác biệt chính giữa “I saw the movie” và “I have seen the movie” là gì?',
      opts: [
        'Câu sau không cho biết xem vào lúc nào',
        'Câu sau nói về việc chưa xảy ra',
        'Câu trước trang trọng hơn',
        'Câu trước nói về việc lặp lại nhiều lần',
      ],
      a: 'Câu sau không cho biết xem vào lúc nào',
      why: 'Bài nói “I have seen the movie” “suggests that you saw the movie at an unknown time in the past.”',
    },
    {
      q: 'Thì hiện tại hoàn thành được lập bằng công thức nào?',
      opts: [
        '“have” hoặc “has” + phân từ quá khứ',
        '“did” + động từ nguyên thể',
        '“was/were” + động từ thêm -ing',
        '“will have” + động từ nguyên thể',
      ],
      a: '“have” hoặc “has” + phân từ quá khứ',
      why: 'Bài nói ta lập thì này bằng “have” hay “has” “followed by the past participle form of the verb.”',
    },
    {
      q: '“For” và “since” cho biết điều gì?',
      opts: [
        'Khoảng thời gian kéo dài của một hoạt động',
        'Thời điểm chính xác của hành động',
        'Số lần hành động lặp lại',
        'Thái độ của người nói',
      ],
      a: 'Khoảng thời gian kéo dài của một hoạt động',
      why: 'Bài nói hai từ này “are adverbs that tell about the duration of an activity”, trả lời câu hỏi “how long?”',
    },
    {
      q: 'Bài mách người học chú ý vào đâu để chọn đúng thì?',
      opts: [
        'Vào các trạng từ trong câu',
        'Vào chủ ngữ của câu',
        'Vào độ dài của câu',
        'Vào dấu câu ở cuối',
      ],
      a: 'Vào các trạng từ trong câu',
      why: 'Bài nói: “Adverbs give hints, or clues, about which verb tense you should use.”',
    },
  ],

  // In, On and At: Prepositions of Time and Place
  'voa-3073690': [
    {
      q: 'Quy tắc chung của bài về ba giới từ in / on / at là gì?',
      opts: [
        'Đi từ chung đến cụ thể',
        'Đi từ cụ thể đến chung',
        'Tuỳ theo câu là câu hỏi hay câu kể',
        'Tuỳ theo danh từ đếm được hay không',
      ],
      a: 'Đi từ chung đến cụ thể',
      why: 'Bài nói: “the prepositions in, on, and at go from general to specific.”',
    },
    {
      q: 'Dùng “in” cho những khoảng thời gian nào?',
      opts: [
        'Tháng, năm, thập kỷ, thế kỷ',
        'Ngày trong tuần và ngày lễ',
        'Giờ giấc chính xác',
        'Các buổi trong ngày',
      ],
      a: 'Tháng, năm, thập kỷ, thế kỷ',
      why: 'Bài nói: “English speakers use in to refer to a general, longer period of time, such as months, years, decades, or centuries.”',
    },
    {
      q: 'Với địa chỉ chính xác hoặc ngã tư, dùng giới từ nào?',
      opts: ['at', 'in', 'on', 'to'],
      a: 'at',
      why: 'Bài nói: “For exact addresses or intersections, we use the preposition at.”',
    },
    {
      q: 'Ngoại lệ về phương tiện giao thông trong bài là gì?',
      opts: [
        'Dùng “on” với xe buýt, tàu, xe đạp — nhưng “in” với ô tô',
        'Dùng “in” với mọi phương tiện',
        'Dùng “at” với phương tiện công cộng',
        'Dùng “on” với ô tô, “in” với xe đạp',
      ],
      a: 'Dùng “on” với xe buýt, tàu, xe đạp — nhưng “in” với ô tô',
      why: 'Bài nói: “We use on for public vehicles like buses or trains, but also for smaller ones like a bicycle”, còn ô tô thì đi với “in”.',
    },
  ],

  // It’s 'Kind of Just' Hedging
  'voa-7689850': [
    {
      q: 'Trong câu “It kind of just saps your motivation to do anything”, động từ chính là từ nào và nghĩa gì?',
      opts: [
        '“sap” — làm cạn dần đi',
        '“kind” — phân loại',
        '“just” — vừa mới',
        '“do” — làm',
      ],
      a: '“sap” — làm cạn dần đi',
      why: 'Bài nói động từ là “sap”, “which means to use up the supply of something”, thường nói về sức lực hay năng lượng.',
    },
    {
      q: '“Qualifier” là gì?',
      opts: [
        'Một từ làm thay đổi mức độ của từ hoặc cụm từ khác',
        'Một loại câu hỏi mở',
        'Một dạng của động từ',
        'Một dấu hiệu của thì quá khứ',
      ],
      a: 'Một từ làm thay đổi mức độ của từ hoặc cụm từ khác',
      why: 'Bài định nghĩa: “A qualifier is a word, usually an adjective or adverb, that changes the meaning of another word or phrase.”',
    },
    {
      q: '“Hedging” trong ngôn ngữ nghĩa là gì?',
      opts: [
        'Nói giảm mức độ khẳng định, tỏ ra chưa chắc chắn',
        'Nói mạnh hơn sự thật để gây chú ý',
        'Nhắc lại lời người khác cho rõ',
        'Dùng từ trang trọng khi nói chuyện công việc',
      ],
      a: 'Nói giảm mức độ khẳng định, tỏ ra chưa chắc chắn',
      why: 'Bài nói một “hedge” “in language is often a way to express uncertainty or reduce the force of a statement.”',
    },
    {
      q: 'Vì sao khi bạn mình thích ban nhạc, ta lại nói “it’s kind of loud for me”?',
      opts: [
        'Để giữ hoà khí, không làm bạn buồn',
        'Vì thật sự chỉ hơi to một chút',
        'Vì đó là cách nói trang trọng hơn',
        'Vì ta chưa nghe rõ câu hỏi',
      ],
      a: 'Để giữ hoà khí, không làm bạn buồn',
      why: 'Bài giải thích dùng “kind of” “is one way that speakers preserve their relationships with others.”',
    },
  ],

  // How to Create Many Activities from One Video
  'voa-6976225': [
    {
      q: 'Bài lấy video nào ra làm ví dụ?',
      opts: [
        '“The Big Snow”, bài 11 của Let’s Learn English Level 2',
        'Một video trong loạt How to Pronounce',
        'Một bản tin thời tiết của VOA',
        'Một video trong loạt Everyday Grammar',
      ],
      a: '“The Big Snow”, bài 11 của Let’s Learn English Level 2',
      why: 'Bài viết: “We will look at the video for The Big Snow, Lesson ” 11 của Let’s Learn English Level 2.',
    },
    {
      q: 'Video đó dạy điểm ngữ pháp nào?',
      opts: [
        'Hiện tại hoàn thành và quá khứ hoàn thành',
        'Câu điều kiện loại hai',
        'Giới từ chỉ nơi chốn',
        'Câu bị động',
      ],
      a: 'Hiện tại hoàn thành và quá khứ hoàn thành',
      why: 'Bài nói: “The video teaches the present perfect and past perfect verb tenses.”',
    },
    {
      q: 'Nhóm giáo viên trong buổi tập huấn nghĩ ra khoảng bao nhiêu ý tưởng hoạt động từ một video?',
      opts: ['Khoảng 40', 'Khoảng 10', 'Khoảng 100', 'Đúng 4'],
      a: 'Khoảng 40',
      why: 'Bài viết: “The teachers came up with about ” 40 ý tưởng, từ hoạt động ngữ pháp tới hoạt động về chủ đề thời tiết.',
    },
    {
      // Câu hỏi đầu tiên tôi viết cho bài này hỏi về trò "snowball game" — mà
      // dòng mô tả trò đó CHỈ CÓ TRÊN TRANG WEB, phát thanh viên không đọc.
      // Người nghe không thể trả lời được. Đổi sang một ý có trong bản thu.
      q: 'Ngoài bản thân video, mỗi bài Let’s Learn English còn kèm theo gì?',
      opts: [
        'Một giáo án tải về được',
        'Một bài kiểm tra chấm điểm tự động',
        'Một bản dịch sang nhiều thứ tiếng',
        'Một buổi học trực tuyến với giáo viên',
      ],
      a: 'Một giáo án tải về được',
      why: 'Bài nói: “each Let’s Learn English video comes with a lesson plan that you can download.”',
    },
  ],

  // Tips for Better Conversations in English at Work
  'voa-5726549': [
    {
      q: 'Chiến lược đầu tiên bài đưa ra là gì?',
      opts: [
        'Đoán trước những gì mình sắp nghe',
        'Ghi âm lại cuộc trò chuyện',
        'Nhờ đồng nghiệp nói thay',
        'Học thuộc toàn bộ tên sản phẩm',
      ],
      a: 'Đoán trước những gì mình sắp nghe',
      why: 'Bài nói: “The first strategy is to predict what you will hear”, chẳng hạn khách hàng hay hỏi về việc đặt hàng.',
    },
    {
      q: '“Focusing when you listen” nghĩa là làm gì?',
      opts: [
        'Lập sẵn danh sách từ khoá rồi chờ nghe đúng những từ đó',
        'Nhìn thẳng vào mặt người nói',
        'Tắt hết tiếng ồn xung quanh',
        'Nghe đi nghe lại một đoạn nhiều lần',
      ],
      a: 'Lập sẵn danh sách từ khoá rồi chờ nghe đúng những từ đó',
      why: 'Bài nói: “The next strategy is to prepare a list of those words and listen for them when a customer begins talking with you.”',
    },
    {
      q: 'Câu nào bài gợi ý dùng ngay ở ĐẦU cuộc trò chuyện?',
      opts: [
        '“Would you please speak more slowly?”',
        '“Did you say you want to order?”',
        '“May I ask the name of the product you want to order?”',
        '“I cannot find the button for ordering.”',
      ],
      a: '“Would you please speak more slowly?”',
      why: 'Bài viết: “At the beginning of the conversation, you can ask, ” “Would you please speak more slowly?”',
    },
    {
      q: '“Asking to clarify” là làm gì?',
      opts: [
        'Hỏi lại một câu ngắn để chắc mình nghe đúng từ khoá',
        'Xin lỗi vì tiếng Anh chưa tốt',
        'Nhờ khách hàng viết ra giấy',
        'Chuyển máy cho người khác',
      ],
      a: 'Hỏi lại một câu ngắn để chắc mình nghe đúng từ khoá',
      why: 'Bài dặn khi nghe thấy từ khoá đã đoán trước thì “you can ask the customer a short question to be sure.”',
    },
  ],

  // Avoid Ineffective Study Methods
  'voa-3795956': [
    {
      q: 'Hai cách ôn bài rất phổ biến nào bị bài đánh giá là kém hiệu quả?',
      opts: [
        'Đọc lại và tô/gạch chân',
        'Tự kiểm tra và học nhóm',
        'Chép lại bài và học thuộc',
        'Làm đề thi thử và vẽ sơ đồ',
      ],
      a: 'Đọc lại và tô/gạch chân',
      why: 'Nhà khoa học nhận thức Mary Pyc nói: “both rereading and highlighting are ineffective study tools.”',
    },
    {
      q: 'Vì sao đọc lại kém hiệu quả?',
      opts: [
        'Vì thấy quen mắt nên tưởng mình đã biết, mà không chủ động lục lại kiến thức',
        'Vì mất quá nhiều thời gian',
        'Vì dễ đọc nhầm sang phần khác',
        'Vì sách giáo khoa thường viết khó hiểu',
      ],
      a: 'Vì thấy quen mắt nên tưởng mình đã biết, mà không chủ động lục lại kiến thức',
      why: 'Bà Pyc nói: “it is going to feel like you already know the information because you\'ve already read it.”',
    },
    {
      q: 'Vấn đề THỨ HAI của việc tô đậm là gì?',
      opts: [
        'Người học không phải lúc nào cũng biết đâu mới là thông tin quan trọng nhất',
        'Bút tô làm hỏng sách',
        'Tô xong rồi không đọc lại nữa',
        'Màu tô làm chữ khó đọc hơn',
      ],
      a: 'Người học không phải lúc nào cũng biết đâu mới là thông tin quan trọng nhất',
      why: 'Bà Pyc nói: “Students aren\'t always aware of what the most important information is.”',
    },
    {
      q: '“Spaced practice” nghĩa là gì?',
      opts: [
        'Ôn lại kiến thức rải ra theo thời gian thay vì dồn một lúc',
        'Học ở nơi rộng rãi, thoáng đãng',
        'Chừa khoảng trống trong vở để ghi thêm',
        'Chia lớp thành các nhóm nhỏ',
      ],
      a: 'Ôn lại kiến thức rải ra theo thời gian thay vì dồn một lúc',
      why: 'Bài giải thích: “This means to practice remembering the new information over time, instead of doing everything all at once.”',
    },
  ],

  // 'Happy Thanksgiving'
  'voa-7355854': [
    {
      q: 'Vào những năm 1300, từ “happy” mang nghĩa gì?',
      opts: [
        'May mắn, được vận may ưu ái',
        'Khoẻ mạnh',
        'Giàu lòng thương người',
        'Yên tĩnh, bình lặng',
      ],
      a: 'May mắn, được vận may ưu ái',
      why: 'Bài dẫn từ điển từ nguyên: “The Dictionary also tells us that the majority of the words for ” “happy” trong các ngôn ngữ châu Âu ban đầu đều có nghĩa “lucky”.',
    },
    {
      q: 'Người nói tiếng Anh dùng từ nào nhiều hơn?',
      opts: [
        'Tính từ “happy”',
        'Danh từ “happiness”',
        'Hai từ dùng ngang nhau',
        'Bài không nói tới chuyện này',
      ],
      a: 'Tính từ “happy”',
      why: 'Theo Google Ngram Viewer, “we find that English speakers use ” “happy” nhiều hơn hẳn “happiness”.',
    },
    {
      q: '“Happy” thường đứng sau loại động từ nào nhất?',
      opts: [
        'Động từ nối (linking verbs) như be, feel, seem',
        'Động từ khuyết thiếu như can, must',
        'Động từ chỉ chuyển động như go, run',
        'Động từ ở thể bị động',
      ],
      a: 'Động từ nối (linking verbs) như be, feel, seem',
      why: 'Bài giải thích động từ nối là: “These are verbs that link their subjects with their predicates.”',
    },
    {
      q: 'Vì sao “Happy Thanksgiving” là một câu không hoàn chỉnh?',
      opts: [
        'Vì không có chủ ngữ — dạng đầy đủ là “I wish you a Happy Thanksgiving”',
        'Vì thiếu dấu chấm câu',
        'Vì “happy” đứng trước danh từ',
        'Vì đó là một câu hỏi bị rút gọn',
      ],
      a: 'Vì không có chủ ngữ — dạng đầy đủ là “I wish you a Happy Thanksgiving”',
      why: 'Bài nói: “The subject and main verb are understood between the speakers.”',
    },
  ],

  // Expressions That ‘Stop You Cold’
  'voa-7897488': [
    {
      q: 'Khi một thứ “stops cold” thì nghĩa là gì?',
      opts: [
        'Dừng hẳn, đột ngột, có phần bất ngờ',
        'Chậm lại từ từ rồi mới dừng',
        'Dừng vì trời quá lạnh',
        'Tạm dừng rồi chạy tiếp',
      ],
      a: 'Dừng hẳn, đột ngột, có phần bất ngờ',
      why: 'Bài nói: “it stops completely, suddenly, and perhaps with surprise.”',
    },
    {
      q: 'Cụm nào KHÔNG cùng nghĩa với “stop someone cold”?',
      opts: [
        '“come in from the cold”',
        '“stop someone dead in their tracks”',
        '“stop someone on a dime”',
        '“stop someone cold in my tracks”',
      ],
      a: '“come in from the cold”',
      why: 'Bài xếp ba cụm kia cùng một nhóm: “Other variations of this expression include to stop ” (someone) dead in their tracks, on a dime.',
    },
    {
      q: '“Cold call” là gì?',
      opts: [
        'Gọi hoặc đến gặp người mình không quen, thường để bán hàng, mà không ai yêu cầu trước',
        'Gọi điện vào mùa đông',
        'Gọi lại cho khách hàng cũ',
        'Cuộc gọi bị cắt giữa chừng',
      ],
      a: 'Gọi hoặc đến gặp người mình không quen, thường để bán hàng, mà không ai yêu cầu trước',
      why: 'Bài nói các cuộc gọi này là “unsolicited”: “This means that no one asked or requested contact.”',
    },
    {
      q: '“Come in from the cold” khác “come into something cold” ở chỗ nào?',
      opts: [
        'Cụm đầu là được quay lại nhóm/cuộc sống bình thường; cụm sau là đến mà không chuẩn bị gì',
        'Cụm đầu nói về thời tiết, cụm sau nói về công việc',
        'Hai cụm nghĩa như nhau',
        'Cụm đầu chỉ dùng trong kinh doanh',
      ],
      a: 'Cụm đầu là được quay lại nhóm/cuộc sống bình thường; cụm sau là đến mà không chuẩn bị gì',
      why: 'Bài nói về cụm đầu: “It means you rejoin a group or a normal society again after being outside.”',
    },
  ],

  // One Person's Trash Is Another Person's Treasure
  'voa-7733886': [
    {
      q: 'Thành ngữ “one person’s trash is another person’s treasure” nghĩa là gì?',
      opts: [
        'Thứ người này thấy vô giá trị lại có thể rất quý với người khác',
        'Người nghèo và người giàu nhìn tiền khác nhau',
        'Đồ cũ bán lại thì được giá hơn',
        'Đừng vứt đi thứ gì cả',
      ],
      a: 'Thứ người này thấy vô giá trị lại có thể rất quý với người khác',
      why: 'Bài giải thích: “something that one person may consider worthless could be highly prized or valued by someone else.”',
    },
    {
      q: 'Vì sao thành ngữ dùng “trash” chứ không dùng “rubbish” hay “garbage”?',
      opts: [
        'Vì âm “tr” trong trash và treasure nghe thuận tai hơn',
        'Vì “rubbish” là từ của tiếng Anh-Anh',
        'Vì “garbage” nghe nặng nghĩa hơn',
        'Vì “trash” ngắn hơn hai từ kia',
      ],
      a: 'Vì âm “tr” trong trash và treasure nghe thuận tai hơn',
      why: 'Bài nói âm “tr” “in trash and treasure makes the expression sound more natural.”',
    },
    {
      q: 'Thành ngữ nào trong bài có nghĩa gần giống nhất?',
      opts: [
        '“different strokes for different folks”',
        '“an eye for an eye”',
        '“a point of no return”',
        '“food for thought”',
      ],
      a: '“different strokes for different folks”',
      why: 'Bài nói: “Another expression with a similar meaning is different strokes for different folks.”',
    },
    {
      q: 'Vì sao không được đổi thành “different strokes for different people”?',
      opts: [
        'Vì đây là cụm cố định, đổi từ thì nghe không đúng',
        'Vì “people” là số nhiều',
        'Vì “folks” trang trọng hơn',
        'Vì câu sẽ quá dài',
      ],
      a: 'Vì đây là cụm cố định, đổi từ thì nghe không đúng',
      why: 'Bài nói: “as a set expression, we do not say ” “different strokes for different people” — “That just doesn\'t sound right.”',
    },
  ],

  // Reaching the 'Tipping Point'
  'voa-7750319': [
    {
      q: 'Từ điển Merriam-Webster định nghĩa “tipping point” thế nào?',
      opts: [
        'Điểm tới hạn mà vượt qua nó sẽ có thay đổi lớn, thường không ngăn được nữa',
        'Thời điểm bắt đầu của một phong trào',
        'Lúc một ý tưởng bị lãng quên',
        'Điểm cân bằng giữa hai lựa chọn',
      ],
      a: 'Điểm tới hạn mà vượt qua nó sẽ có thay đổi lớn, thường không ngăn được nữa',
      why: 'Từ điển định nghĩa là “the critical point in a situation, process, or system beyond which a significant and often unstoppable effect or change takes place.”',
    },
    {
      q: 'Bài lấy ví dụ nào cho việc ĐÃ vượt qua điểm tới hạn?',
      opts: [
        'Trái Đất và hiện tượng nóng lên toàn cầu',
        'Giá cả ở cửa hàng thực phẩm',
        'Cơn giận của học sinh với cô giáo',
        'Cuốn sách thứ hai của một nhà văn',
      ],
      a: 'Trái Đất và hiện tượng nóng lên toàn cầu',
      why: 'Bài nói: “some scientists believe Earth may have passed the tipping point in global warming.”',
    },
    {
      q: 'Cụm nào trong bài diễn đạt ý “quá muộn để quay lại”?',
      opts: [
        '“that ship has sailed” và “a point of no return”',
        '“spreads like wildfire”',
        '“crosses a threshold”',
        '“an important decision has to be made”',
      ],
      a: '“that ship has sailed” và “a point of no return”',
      why: 'Bài nói: “When something reaches a tipping point it is too late to turn back.”',
    },
    {
      q: 'Malcolm Gladwell mô tả tipping point là khoảnh khắc gì?',
      opts: [
        'Khoảnh khắc một ý tưởng vượt ngưỡng và lan đi như cháy rừng',
        'Khoảnh khắc một ý tưởng bị bác bỏ',
        'Khoảnh khắc mọi người ngừng quan tâm',
        'Khoảnh khắc một cuốn sách được xuất bản',
      ],
      a: 'Khoảnh khắc một ý tưởng vượt ngưỡng và lan đi như cháy rừng',
      why: 'Ông viết đó là lúc một ý tưởng “crosses a threshold, tips, and spreads like wildfire.”',
    },
  ],

};

export default CAU_HOI;
