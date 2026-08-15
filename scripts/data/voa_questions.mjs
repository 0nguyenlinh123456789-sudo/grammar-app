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
};

export default CAU_HOI;
