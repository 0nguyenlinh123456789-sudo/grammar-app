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
      // Sửa lại sau khi phục hồi được các câu ví dụ ngắn: bản chép lời nay có
      // cả "Who's in the office today?" và "Who's the director of that film?",
      // nên hỏi trống "thường là loại từ nào" thì lựa chọn "danh từ" cũng có
      // chỗ dựa. Hỏi rõ "HAY GẶP NHẤT" mới khớp đúng chữ "Often" của bài.
      q: 'Sau “who’s”, từ HAY GẶP NHẤT là loại nào?',
      opts: ['Động từ', 'Danh từ', 'Tính từ sở hữu', 'Giới từ chỉ nơi chốn'],
      a: 'Động từ',
      why: 'Bài nói: “Often, the next word you hear after ” “who’s” là một động từ — đôi khi mới là cụm giới từ hay cụm danh từ.',
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

  // ===== ĐỢT 4 (16 bài) — mỗi bài viết sau khi đọc hết bản chép lời =====

  // Perhaps and Maybe
  'voa-7771274': [
    {
      q: 'Nghĩa của “perhaps” và “maybe” khác nhau thế nào?',
      opts: ['Hai từ nghĩa như nhau, chỉ khác cách dùng', '“Perhaps” chắc chắn hơn', '“Maybe” chỉ dùng cho việc tương lai', 'Hai từ trái nghĩa nhau'],
      a: 'Hai từ nghĩa như nhau, chỉ khác cách dùng',
      why: 'Bài nói: “The two words mean the same thing” — cả hai đều diễn đạt việc mình đang đoán hoặc chưa chắc.',
    },
    {
      q: 'Người nói tiếng Anh Mỹ dùng từ nào nhiều hơn, và làm sao biết được?',
      opts: [
        '“Maybe”, nhiều hơn gấp đôi, theo kho ngữ liệu tiếng Anh Mỹ đương đại',
        '“Perhaps”, vì nghe trang trọng hơn',
        'Hai từ dùng ngang nhau',
        'Bài không đưa ra con số nào',
      ],
      a: '“Maybe”, nhiều hơn gấp đôi, theo kho ngữ liệu tiếng Anh Mỹ đương đại',
      why: 'Các nhà nghiên cứu thấy “speakers of American English use ” “maybe” “more than twice as often as the word ” “perhaps.”',
    },
    {
      q: 'Nếu thay “maybe” bằng “perhaps” trong câu trả lời đời thường thì nghe thế nào?',
      opts: [
        'Nghe quá trang trọng hoặc quá nghiêm trọng',
        'Nghe thân mật hơn',
        'Nghe không rõ nghĩa',
        'Nghe giống hệt, không ai nhận ra',
      ],
      a: 'Nghe quá trang trọng hoặc quá nghiêm trọng',
      why: 'Bài nói trong tình huống đó “it might sound too formal, or serious, in American English.”',
    },
    {
      q: 'Khi người viết đặt một từ “Maybe.” đứng riêng thành một câu sau một lời tuyên bố, ý họ là gì?',
      opts: [
        'Tỏ rõ hơn cảm giác rằng lời tuyên bố đó có thể sai',
        'Đồng ý hoàn toàn với lời tuyên bố',
        'Nhắc lại lời tuyên bố cho rõ',
        'Chuyển sang một chủ đề khác',
      ],
      a: 'Tỏ rõ hơn cảm giác rằng lời tuyên bố đó có thể sai',
      why: 'Bài giải thích khi dùng “maybe” như vậy, “the writer communicates more strongly a feeling that the government officials might be wrong.”',
    },
  ],

  // How to Summarize
  'voa-7769761': [
    {
      q: 'Một bản tóm tắt (summary) là gì?',
      opts: [
        'Giải thích ngắn gọn các ý chính, không gồm mọi chi tiết',
        'Bản chép lại toàn bộ nội dung cho gọn hơn',
        'Danh sách các từ mới trong bài',
        'Ý kiến riêng của người đọc về bài',
      ],
      a: 'Giải thích ngắn gọn các ý chính, không gồm mọi chi tiết',
      why: 'Bài định nghĩa: “A summary briefly explains the main ideas of a piece of writing or a speech but does not include all the details.”',
    },
    {
      q: 'Bước ĐẦU TIÊN của phương pháp trong bài là gì?',
      opts: [
        'Đọc hoặc nghe một lần mà không ghi chú gì cả',
        'Gạch chân mọi từ mới',
        'Viết ngay ý chính ra giấy',
        'Dịch toàn bài sang tiếng mẹ đẻ',
      ],
      a: 'Đọc hoặc nghe một lần mà không ghi chú gì cả',
      why: 'Bài dặn: “First, read or listen to the material one time without writing any notes” — để đầu óc tập trung vào việc hiểu ý.',
    },
    {
      q: 'Vì sao nên để vài tiếng trôi qua giữa lúc ghi chú và lúc viết ý chính?',
      opts: [
        'Để xem mình có tự nhớ và sắp xếp được ý chính trong đầu không',
        'Để chữ viết khô mực',
        'Để hỏi ý kiến người khác trước',
        'Để đọc lại bài thêm một lần nữa',
      ],
      a: 'Để xem mình có tự nhớ và sắp xếp được ý chính trong đầu không',
      why: 'Bài nói: “This is a good way to see if you can remember and organize the main points in your mind.”',
    },
    {
      q: 'Cách thứ hai bài gợi ý để chuẩn bị một bản tóm tắt là gì?',
      opts: [
        'Thử kể lại nội dung như đang nói chuyện với bạn bè, nói thành tiếng',
        'Vẽ sơ đồ tư duy',
        'Đếm số câu trong bài',
        'Học thuộc đoạn mở đầu',
      ],
      a: 'Thử kể lại nội dung như đang nói chuyện với bạn bè, nói thành tiếng',
      why: 'Bài gợi ý: “Try to explain the material as if you were talking about it with your friends or family.”',
    },
  ],

  // Speaking Fluently
  'voa-7750089': [
    {
      q: 'Theo bài, nói trôi chảy có phải là nói không mắc lỗi không?',
      opts: [
        'Không — trôi chảy là nói mà không phải ngừng lại quá nhiều',
        'Đúng, trôi chảy nghĩa là không sai ngữ pháp',
        'Đúng, và còn phải phát âm chuẩn giọng Mỹ',
        'Bài không định nghĩa từ này',
      ],
      a: 'Không — trôi chảy là nói mà không phải ngừng lại quá nhiều',
      why: 'Bài nói: “fluency is the ability to speak without stopping too much”, và còn là khả năng nói được về nhiều vấn đề.',
    },
    {
      q: '“Input” trong bài nghĩa là gì?',
      opts: [
        'Thứ tiếng Anh mình nghe và đọc',
        'Thứ tiếng Anh mình nói ra',
        'Số giờ học mỗi tuần',
        'Bài tập ngữ pháp',
      ],
      a: 'Thứ tiếng Anh mình nghe và đọc',
      why: 'Bài nói rõ: “Input means the language you listen to and read.”',
    },
    {
      q: 'Bài nói người học cần HAI thứ để trôi chảy — thứ thứ hai là gì?',
      opts: [
        'Luyện nói thật nhiều trong nhiều kiểu tình huống khác nhau',
        'Học thuộc bảng động từ bất quy tắc',
        'Sống ở nước nói tiếng Anh',
        'Thi lấy một chứng chỉ quốc tế',
      ],
      a: 'Luyện nói thật nhiều trong nhiều kiểu tình huống khác nhau',
      why: 'Bài nói: “The second thing learners need is a lot of practice speaking in different kinds of situations.”',
    },
    {
      q: 'Quan hệ giữa lỗi ngữ pháp và sự trôi chảy theo bài là gì?',
      opts: [
        'Vẫn trôi chảy được dù sai ngữ pháp nhiều, nhưng không trôi chảy được nếu thiếu từ',
        'Sai ngữ pháp thì chắc chắn không trôi chảy',
        'Ngữ pháp quan trọng hơn từ vựng',
        'Hai thứ không liên quan gì đến nhau',
      ],
      a: 'Vẫn trôi chảy được dù sai ngữ pháp nhiều, nhưng không trôi chảy được nếu thiếu từ',
      why: 'Bài nói: “you can be fluent even if you make many grammar mistakes”, nhưng không thể trôi chảy nếu không biết đủ từ và cụm từ.',
    },
  ],

  // Using 'Though' and 'However': Part 1
  'voa-7652826': [
    {
      q: 'Hai từ “though” và “however” dùng để làm gì?',
      opts: [
        'Cho thấy quan hệ giữa các ý, thường là sự khác biệt',
        'Nối hai danh từ với nhau',
        'Đặt câu hỏi lịch sự',
        'Nhấn mạnh thời gian của hành động',
      ],
      a: 'Cho thấy quan hệ giữa các ý, thường là sự khác biệt',
      why: 'Bài nói hai từ này “are words that show a relationship between ideas”, thường diễn đạt sự khác nhau giữa hai điều.',
    },
    {
      q: 'Trong tiếng Anh nói, “though” rất hay đứng ở đâu?',
      opts: ['Cuối câu', 'Đầu câu', 'Ngay sau chủ ngữ', 'Giữa hai dấu phẩy'],
      a: 'Cuối câu',
      why: 'Bài nói ta dùng “though” nhiều khi nói, và “it is very common at the end of a sentence”, như câu “I like him, though.”',
    },
    {
      q: '“However” phổ biến hơn ở dạng tiếng Anh nào?',
      opts: ['Tiếng Anh viết', 'Tiếng Anh nói hằng ngày', 'Tiếng lóng', 'Tiếng Anh trong bài hát'],
      a: 'Tiếng Anh viết',
      why: 'Bài nói ngắn gọn rằng “However” “is very common in written English.”',
    },
    {
      q: 'Trong tiếng Anh nói, “however” còn có cách dùng nào nữa?',
      opts: [
        'Làm cách nói mạnh hơn của “how”, và nhấn vào phần -ever',
        'Thay cho “because”',
        'Làm đại từ chỉ người',
        'Làm cách nói nhẹ đi của “never”',
      ],
      a: 'Làm cách nói mạnh hơn của “how”, và nhấn vào phần -ever',
      why: 'Bài nói “however” “can be used as a more forceful way of saying ” “how”, ví dụ “However will I choose?”',
    },
  ],

  // Feel, Feel Like
  'voa-7646528': [
    {
      q: '“Feel like” đi với một người hoặc một vật thì nghĩa là gì?',
      opts: [
        'Mình giống với người hoặc vật đó',
        'Mình thích người hoặc vật đó',
        'Mình chạm vào người hoặc vật đó',
        'Mình nhớ người hoặc vật đó',
      ],
      a: 'Mình giống với người hoặc vật đó',
      why: 'Bài nói “Feel like” “someone or something means that you are similar to the person or thing”, ví dụ “My feet feel like blocks of ice.”',
    },
    {
      q: '“Jose feels like eating ice cream” nghĩa là gì?',
      opts: [
        'Anh ấy muốn ăn kem',
        'Anh ấy thấy mình giống que kem',
        'Anh ấy đang ăn kem',
        'Anh ấy không thích kem',
      ],
      a: 'Anh ấy muốn ăn kem',
      why: 'Bài giải thích “Feel like” “doing something means that you want to do it”, và động từ sau đó thường thêm -ing.',
    },
    {
      q: 'Câu “Jose feels like ice cream.” (không có -ing) hiểu thế nào?',
      opts: [
        'Vẫn hiểu là anh ấy muốn ăn kem',
        'Anh ấy thấy mình lạnh như kem',
        'Câu đó sai ngữ pháp',
        'Anh ấy đang bán kem',
      ],
      a: 'Vẫn hiểu là anh ấy muốn ăn kem',
      why: 'Bài nói: “It is understood that he wants to eat ice cream or that she wants to watch a movie.”',
    },
    {
      q: 'Câu nào dùng “feel” theo nghĩa CHẠM VÀO?',
      opts: [
        '“I feel the rough sand under my feet.”',
        '“It feels cold outside.”',
        '“He feels sure we are right.”',
        '“I always feel thankful to my parents.”',
      ],
      a: '“I feel the rough sand under my feet.”',
      why: 'Bài xếp câu “I feel the rough sand under my feet” vào nhóm “feel” mang nghĩa chạm vào một vật.',
    },
  ],

  // Nobody, No one
  'voa-7642124': [
    {
      q: '“Nobody” và “no one” thuộc loại từ nào?',
      opts: ['Đại từ bất định', 'Danh từ riêng', 'Trạng từ phủ định', 'Liên từ'],
      a: 'Đại từ bất định',
      why: 'Bài nói: “Indefinite pronouns refer to people in a general and open way”, và “no” trong cả hai từ cho biết không có người nào.',
    },
    {
      q: 'Nghĩa của hai từ này khác nhau nhiều không?',
      opts: [
        'Không khác gì đáng kể, và cả hai đều coi là số ít',
        '“Nobody” mạnh hơn “no one”',
        '“No one” chỉ dùng cho một người, “nobody” cho nhiều người',
        'Một từ khẳng định, một từ phủ định',
      ],
      a: 'Không khác gì đáng kể, và cả hai đều coi là số ít',
      why: 'Bài nói không có khác biệt lớn về nghĩa, và “Both are treated as singular nouns.”',
    },
    {
      q: 'Từ nào trang trọng hơn, và hay gặp ở đâu?',
      opts: [
        '“No one”, hay gặp trong tiếng Anh viết',
        '“Nobody”, hay gặp trong tiếng Anh viết',
        '“No one”, chỉ dùng khi nói',
        'Cả hai đều chỉ dùng khi viết',
      ],
      a: '“No one”, hay gặp trong tiếng Anh viết',
      why: 'Bài nói “No one” trang trọng hơn một chút: “It is used more in written English”, còn “nobody” thì thiên về tiếng Anh nói.',
    },
    {
      q: 'Câu “He was just a nobody five years ago.” có nghĩa gì?',
      opts: [
        'Đó là cách nói không tử tế rằng người ấy chẳng có tiếng tăm gì',
        'Người ấy không có mặt ở đó',
        'Người ấy còn rất trẻ',
        'Người ấy sống một mình',
      ],
      a: 'Đó là cách nói không tử tế rằng người ấy chẳng có tiếng tăm gì',
      why: 'Bài nói: “This is an unkind way to say that someone is not important or not well-known.”',
    },
  ],

  // 'Ever' in Questions
  'voa-7595360': [
    {
      q: 'Một trong các nghĩa của “ever” là gì?',
      opts: ['“at any time” — vào bất cứ lúc nào', '“never” — không bao giờ', '“always” — luôn luôn', '“almost” — gần như'],
      a: '“at any time” — vào bất cứ lúc nào',
      why: 'Bài nhắc lại một số nghĩa của từ này: “we explained several meanings of ” “ever”, một trong đó là “at any time.”',
    },
    {
      q: 'Dùng “ever” trong câu hỏi kiểu “have you ever…” để làm gì?',
      opts: [
        'Thêm sức nhấn, nhất là khi mình mong người nghe cũng nghĩ như mình',
        'Làm câu hỏi trở nên lịch sự hơn',
        'Đổi câu hỏi thành câu kể',
        'Chỉ ra rằng việc đã xảy ra hôm qua',
      ],
      a: 'Thêm sức nhấn, nhất là khi mình mong người nghe cũng nghĩ như mình',
      why: 'Bài nói ta dùng “ever” “if we expect people to agree with us, or have the same answer.”',
    },
    {
      q: 'Câu “Will I ever be able to climb Mount Everest?” hàm ý gì?',
      opts: [
        'Người nói nghĩ câu trả lời là không',
        'Người nói đang lên kế hoạch leo núi',
        'Người nói đang hỏi xin lời khuyên',
        'Người nói tin chắc mình sẽ leo được',
      ],
      a: 'Người nói nghĩ câu trả lời là không',
      why: 'Bài nói trong những ví dụ này ta dùng “ever” “because we think the answer is no.”',
    },
    {
      q: 'Người hỏi kiểu câu đó có chờ ai trả lời không?',
      opts: [
        'Không nhất thiết — có khi họ không mong ai trả lời cả',
        'Có, họ luôn chờ một câu trả lời rõ ràng',
        'Chỉ chờ trả lời nếu hỏi người quen',
        'Bài không nói tới điều này',
      ],
      a: 'Không nhất thiết — có khi họ không mong ai trả lời cả',
      why: 'Bài nói: “we may not expect anyone to actually answer the question.”',
    },
  ],

  // ‘Must’ or ‘Have To’?
  'voa-7508873': [
    {
      q: 'Trong tiếng Anh NÓI, “must” thường dùng để diễn đạt điều gì?',
      opts: [
        'Điều mình cho là nhiều khả năng đúng — gần nghĩa với “probably”',
        'Một mệnh lệnh bắt buộc',
        'Một lời mời',
        'Một việc đã xảy ra rồi',
      ],
      a: 'Điều mình cho là nhiều khả năng đúng — gần nghĩa với “probably”',
      why: 'Bài nói khi dùng “must” trong tiếng Anh nói thì “usually it is to express something we think is likely.”',
    },
    {
      q: 'Câu “You must be cold after working all day in the rain.” tương đương câu nào?',
      opts: [
        '“You are probably cold after working all day in the rain.”',
        '“You have to get warm right now.”',
        '“You should not work in the rain.”',
        '“You were cold all day in the rain.”',
      ],
      a: '“You are probably cold after working all day in the rain.”',
      why: 'Bài đặt hai câu cạnh nhau để so sánh, câu thứ hai là “You are probably cold after working all day in the rain.”',
    },
    {
      q: '“Gotta” là gì?',
      opts: [
        'Dạng rút gọn của “have got to”, rất hay dùng khi nói',
        'Dạng quá khứ của “get”',
        'Một cách nói trang trọng của “must”',
        'Một từ chỉ dùng trong văn viết',
      ],
      a: 'Dạng rút gọn của “have got to”, rất hay dùng khi nói',
      why: 'Bài nói “have to”, “have got to” và dạng rút gọn “gotta” “are used very often in spoken language to communicate requirement.”',
    },
    {
      q: 'Chọn giữa “must” và “have to” dựa vào đâu?',
      opts: [
        'Vào ngữ cảnh: muốn nói về xác suất, hay muốn ra lệnh / nêu quy định',
        'Vào việc câu dài hay ngắn',
        'Vào chủ ngữ là số ít hay số nhiều',
        'Vào việc câu ở thì nào',
      ],
      a: 'Vào ngữ cảnh: muốn nói về xác suất, hay muốn ra lệnh / nêu quy định',
      why: 'Bài hỏi lại người học: “Or are you trying to give an order or announce a rule?”',
    },
  ],

  // Different 'From' or 'Than'?
  'voa-7553685': [
    {
      q: 'Có phải “different than” là sai không?',
      opts: [
        'Không sai — tiếng Anh Mỹ dùng cả hai cách',
        'Sai hoàn toàn, phải luôn nói “different from”',
        'Chỉ đúng khi viết',
        'Chỉ đúng ở Anh, không đúng ở Mỹ',
      ],
      a: 'Không sai — tiếng Anh Mỹ dùng cả hai cách',
      why: 'Bài nói dù sách ngữ pháp có thể bảo là sai, nhưng “in American English, we use both ” “different from” và “different than”.',
    },
    {
      q: '“Different than” hay gặp ở đâu và đứng trước cái gì?',
      opts: [
        'Trong tiếng Anh nói, và hầu như luôn đứng trước một mệnh đề',
        'Trong văn bản trang trọng, đứng trước danh từ',
        'Trong thơ ca, đứng cuối câu',
        'Chỉ trong câu hỏi',
      ],
      a: 'Trong tiếng Anh nói, và hầu như luôn đứng trước một mệnh đề',
      why: 'Bài nói: “It is more informal, and it is almost always used before a clause.”',
    },
    {
      q: 'Cách nào được dùng nhiều hơn hẳn?',
      opts: ['“different from”', '“different than”', 'Hai cách ngang nhau', '“different to”'],
      a: '“different from”',
      why: 'Bài nói ta dùng “different from” “mostly in written English, and we use it far more often than ” “different than”.',
    },
    {
      q: 'Với ví dụ của người hỏi, bài khuyên chọn cách nào và vì sao?',
      opts: [
        '“Different from”, vì ở đó nó đứng trước một cụm danh từ',
        '“Different than”, vì câu đó là câu nói',
        'Cách nào cũng như nhau, không cần chọn',
        'Nên viết lại câu để tránh cả hai',
      ],
      a: '“Different from”, vì ở đó nó đứng trước một cụm danh từ',
      why: 'Bài kết luận “different from” “is the better choice because it comes before a noun phrase.”',
    },
  ],

  // Reduction and Assimilation
  'voa-7466606': [
    {
      q: '“Assimilation” trong phát âm là hiện tượng gì?',
      opts: [
        'Hai âm khác nhau bắt đầu nghe thành giống nhau khi nói nhanh',
        'Một âm bị bỏ hẳn đi',
        'Một từ bị đọc chậm lại',
        'Trọng âm chuyển sang âm tiết khác',
      ],
      a: 'Hai âm khác nhau bắt đầu nghe thành giống nhau khi nói nhanh',
      why: 'Bài định nghĩa: “Two different sounds can start to sound the same when they are said quickly.”',
    },
    {
      q: 'Trong từ “handbag”, âm /n/ biến thành âm gì?',
      opts: [
        'Thành /m/ — kết hợp giữa âm mũi và âm môi',
        'Thành /ŋ/ — âm mũi cuống lưỡi',
        'Bị bỏ hẳn, không còn âm nào',
        'Thành /d/',
      ],
      a: 'Thành /m/ — kết hợp giữa âm mũi và âm môi',
      why: 'Bài giải thích âm đó trở thành “a combination of a nasal sound and the labial sound”, vì bị âm /b/ trong “bag” kéo theo.',
    },
    {
      q: 'Vì sao các từ chức năng như “to” và “and” hay bị rút gọn?',
      opts: [
        'Để dồn sự chú ý vào những từ mang nghĩa quan trọng hơn',
        'Vì chúng khó phát âm',
        'Vì chúng không cần thiết về ngữ pháp',
        'Vì người nói quên mất chúng',
      ],
      a: 'Để dồn sự chú ý vào những từ mang nghĩa quan trọng hơn',
      why: 'Bài nói: “This helps us to pay more attention to the more important words that carry meaning.”',
    },
    {
      q: '“Want to” thành “wanna” qua những bước nào?',
      opts: [
        'Nguyên âm của “to” rút thành schwa, rồi hai âm /t/ rụng đi khi nói nhanh',
        'Chữ “t” đổi thành chữ “n” trên giấy',
        'Hai từ được viết dính vào nhau rồi mới đọc',
        'Trọng âm chuyển sang từ “to”',
      ],
      a: 'Nguyên âm của “to” rút thành schwa, rồi hai âm /t/ rụng đi khi nói nhanh',
      why: 'Bài mô tả: “want ta” thành “wanna” vì “sounds drop off in fast speech.”',
    },
  ],

  // How to Summon Others
  'voa-7920108': [
    {
      q: '“To summon” nghĩa là gì?',
      opts: [
        'Gọi ai đó đến có mặt, thường vì một việc quan trọng',
        'Gửi thư mời dự tiệc',
        'Gọi điện thoại cho người quen',
        'Nhờ ai đó làm hộ một việc',
      ],
      a: 'Gọi ai đó đến có mặt, thường vì một việc quan trọng',
      why: 'Bài định nghĩa: “To summon means to call for a person or persons to be present, often for an important meeting.”',
    },
    {
      q: 'Bài đánh giá thế nào về những câu như “Could you come here, please?”',
      opts: [
        'Rất chung, lịch sự, và dùng được trong nhiều tình huống',
        'Chỉ dùng được ở nơi làm việc',
        'Quá trang trọng nên ít ai dùng',
        'Chỉ dùng khi nói với trẻ con',
      ],
      a: 'Rất chung, lịch sự, và dùng được trong nhiều tình huống',
      why: 'Bài nói: “These questions are very general, polite, and useful in a lot of situations.”',
    },
    {
      q: 'Khi cha mẹ hoặc thầy cô nói “Come over here!”, thường sau đó là gì?',
      opts: [
        'Một lời mắng hoặc phê bình',
        'Một lời khen',
        'Một món quà',
        'Một câu hỏi về bài học',
      ],
      a: 'Một lời mắng hoặc phê bình',
      why: 'Bài nói kiểu gọi này “is followed by scolding, or criticism.”',
    },
    {
      q: 'Giữa “would like to see you” và “wants to see you”, cách nào lịch sự hơn?',
      opts: [
        '“Would like” — lịch sự và trang trọng hơn một chút',
        '“Wants to” — vì ngắn hơn',
        'Hai cách hoàn toàn như nhau',
        'Cách nào cũng bị coi là thiếu lịch sự',
      ],
      a: '“Would like” — lịch sự và trang trọng hơn một chút',
      why: 'Bài nói: “English speakers usually consider the structure ” “would like” “to be a little more polite and formal.”',
    },
  ],

  // Exploring the 'Butterfly Effect'
  'voa-7835956': [
    {
      q: '“Butterfly effect” nghĩa là gì?',
      opts: [
        'Những thay đổi rất nhỏ dẫn tới thay đổi lớn và khó lường về sau',
        'Một loài bướm gây hại cho mùa màng',
        'Việc thay đổi ý kiến liên tục',
        'Một hiện tượng chỉ có trong khí tượng học',
      ],
      a: 'Những thay đổi rất nhỏ dẫn tới thay đổi lớn và khó lường về sau',
      why: 'Bài định nghĩa: “The butterfly effect is when very small changes lead to large and unpredictable changes in the future.”',
    },
    {
      q: '“Butterfly effect” và “domino effect” giống nhau ở điểm nào?',
      opts: [
        'Cả hai đều là phản ứng dây chuyền — việc này kéo theo việc kia',
        'Cả hai đều nói về thời tiết',
        'Cả hai đều mang nghĩa xấu',
        'Cả hai đều chỉ dùng trong khoa học',
      ],
      a: 'Cả hai đều là phản ứng dây chuyền — việc này kéo theo việc kia',
      why: 'Bài nói: “The butterfly effect and domino effect are chain reactions.”',
    },
    {
      q: 'Trong đoạn hội thoại, người mở hiệu sách mô tả quá trình khởi nghiệp bằng cụm nào?',
      opts: [
        '“Domino effect”',
        '“Butterfly effect”',
        '“Chain of command”',
        '“Trial and error”',
      ],
      a: '“Domino effect”',
      why: 'Người đó kể: “As soon as I finished the first thing, the next thing to do became clear”, rồi việc tiếp theo, rồi tiếp nữa.',
    },
    {
      q: 'Vì sao chuyện hồi nhỏ hay la cà ở hiệu sách nhà bạn lại được gọi là “butterfly effect”?',
      opts: [
        'Vì một việc xảy ra rất lâu trước đó lại ảnh hưởng tới hiện tại',
        'Vì hiệu sách có bán tranh bướm',
        'Vì hai người bạn đó tình cờ gặp lại nhau',
        'Vì việc đó xảy ra rất nhanh',
      ],
      a: 'Vì một việc xảy ra rất lâu trước đó lại ảnh hưởng tới hiện tại',
      why: 'Người bạn nhận xét: “Something that happened a long time ago, affected your future today.”',
    },
  ],

  // What Gives You 'Food for Thought'?
  'voa-7692856': [
    {
      q: '“Food for thought” là gì?',
      opts: [
        'Điều đáng để nghĩ kỹ và cân nhắc cẩn thận',
        'Món ăn giúp tăng trí nhớ',
        'Một bữa ăn nhẹ giữa giờ học',
        'Lời khuyên không nên nghe theo',
      ],
      a: 'Điều đáng để nghĩ kỹ và cân nhắc cẩn thận',
      why: 'Bài định nghĩa: “It describes something that should be thought about and considered carefully.”',
    },
    {
      q: 'Bài dùng cụm nào để tả việc nhìn ra điều mình chưa từng thấy?',
      opts: [
        '“Open our eyes” / “eye-opening”',
        '“Close our eyes”',
        '“Turn a blind eye”',
        '“See eye to eye”',
      ],
      a: '“Open our eyes” / “eye-opening”',
      why: 'Bài nói “food for thought” “can make us look at something with new eyes”, hay nói cách khác là mở mắt ta ra.',
    },
    {
      q: '“To chew on something” khác “food for thought” ở chỗ nào?',
      opts: [
        'Nghĩa gần giống nhưng thân mật hơn nhiều',
        'Nghĩa hoàn toàn trái ngược',
        'Chỉ dùng khi nói về đồ ăn thật',
        'Trang trọng hơn nhiều',
      ],
      a: 'Nghĩa gần giống nhưng thân mật hơn nhiều',
      why: 'Bài giới thiệu một “phrasal verb that is similar to food for thought, although it is much more informal.”',
    },
    {
      q: 'Muốn nói trang trọng hơn thì bài gợi ý dùng động từ nào?',
      opts: [
        '“Reflect” hoặc “contemplate”',
        '“Chew” hoặc “digest”',
        '“Eat” hoặc “taste”',
        '“Look” hoặc “watch”',
      ],
      a: '“Reflect” hoặc “contemplate”',
      why: 'Bài gợi ý: “If you want to sound more formal, you can use verbs like reflect or contemplate.”',
    },
  ],

  // Walk Before You Can Run
  'voa-7434600': [
    {
      q: '“Baby steps” nghĩa bóng là gì?',
      opts: [
        'Những bước nhỏ nối nhau dẫn tới một mục tiêu lớn',
        'Cách dạy trẻ tập đi',
        'Việc bỏ cuộc giữa chừng',
        'Một bài tập thể dục nhẹ',
      ],
      a: 'Những bước nhỏ nối nhau dẫn tới một mục tiêu lớn',
      why: 'Bài nói: “Small baby steps can lead to the bigger goal”, và cụm này còn dùng để khuyên ai đó chậm lại, kiên nhẫn.',
    },
    {
      q: 'Vì sao bài lấy hình ảnh em bé tập đi?',
      opts: [
        'Vì càng đi nhiều thì bước chân càng vững',
        'Vì em bé đi rất nhanh',
        'Vì em bé không bao giờ ngã',
        'Vì người lớn không cần tập đi nữa',
      ],
      a: 'Vì càng đi nhiều thì bước chân càng vững',
      why: 'Bài tả: “The more they walk, the steadier they get on their feet.”',
    },
    {
      q: 'Trong hội thoại, vì sao người bạn khuyên nên tập hợp âm trước?',
      opts: [
        'Vì hợp âm là nền móng của âm nhạc',
        'Vì hợp âm dễ hơn giai điệu',
        'Vì thầy giáo bắt buộc như vậy',
        'Vì hợp âm nghe hay hơn',
      ],
      a: 'Vì hợp âm là nền móng của âm nhạc',
      why: 'Người bạn nói hợp âm là nền của âm nhạc: “You need to know how to walk before you can run.”',
    },
    {
      q: 'Bài kết bằng lời khuyên nào cho người học tiếng Anh?',
      opts: [
        'Đi từng bước nhỏ, học một ít mỗi ngày để khỏi kiệt sức',
        'Học dồn vào cuối tuần',
        'Chỉ học khi thấy hứng thú',
        'Học thuộc càng nhiều từ càng tốt trong thời gian ngắn',
      ],
      a: 'Đi từng bước nhỏ, học một ít mỗi ngày để khỏi kiệt sức',
      why: 'Bài khuyên: “To keep yourself from burning out, take baby steps”, học một ít mỗi ngày.',
    },
  ],

  // Do You Color Inside or Outside the Lines?
  'voa-7427555': [
    {
      q: '“Color inside the lines” nghĩa bóng là gì?',
      opts: [
        'Nghĩ và làm trong khuôn phép chung được chấp nhận',
        'Vẽ đẹp và cẩn thận',
        'Làm việc rất chậm',
        'Không dám bày tỏ ý kiến',
      ],
      a: 'Nghĩ và làm trong khuôn phép chung được chấp nhận',
      why: 'Bài giải thích cụm này “means to think or act within generally accepted guidelines”, tức là theo luật.',
    },
    {
      q: 'Trẻ thường bắt đầu tô trong nét vẽ vào khoảng tuổi nào?',
      opts: ['Từ hai đến năm tuổi', 'Trước một tuổi', 'Từ bảy đến mười tuổi', 'Chỉ khi đi học tiểu học'],
      a: 'Từ hai đến năm tuổi',
      why: 'Bài nói: “Then between the ages of two and five they start coloring inside the lines.”',
    },
    {
      q: 'Cụm nào KHÔNG mang nghĩa “làm theo luật”?',
      opts: [
        '“Think outside the box”',
        '“Play by the book”',
        '“Stick to the script”',
        '“Toe the line”',
      ],
      a: '“Think outside the box”',
      why: 'Bài xếp cụm đó về phía người phá luật: “people who color outside the lines do not follow rules.”',
    },
    {
      q: 'Bài mô tả những người phá luật bằng cách nói nào?',
      opts: [
        'Họ “go off script” — bỏ kịch bản mà ứng biến',
        'Họ “stick to the script” — bám sát kịch bản',
        'Họ “toe the line” — đứng đúng vạch',
        'Họ “play by the book” — làm theo sách',
      ],
      a: 'Họ “go off script” — bỏ kịch bản mà ứng biến',
      why: 'Bài viết: “Instead of sticking to the script they go off script”, họ ứng biến và mở lối mới.',
    },
  ],

  // Tips for Writing: ‘They Say, I Say’
  'voa-2598428': [
    {
      q: 'Công thức “They Say, I Say” là gì?',
      opts: [
        'Mở đầu bằng điều người khác đã nói về chủ đề, rồi mới trình bày ý mình',
        'Trích dẫn thật nhiều tác giả nổi tiếng',
        'Viết một đoạn kể chuyện rồi mới vào bài',
        'Đặt câu hỏi rồi tự trả lời',
      ],
      a: 'Mở đầu bằng điều người khác đã nói về chủ đề, rồi mới trình bày ý mình',
      why: 'Hai tác giả nói: “A paper should begin with what others have already said about the subject”, rồi người viết mới nêu ý riêng.',
    },
    {
      q: 'Theo Cathy Birkenstein, phần khó nhất của viết học thuật là gì?',
      opts: [
        'Học cách đọc và nghĩ có phản biện',
        'Chính tả và ngữ pháp',
        'Cách trình bày trang giấy',
        'Tìm đủ số trang theo yêu cầu',
      ],
      a: 'Học cách đọc và nghĩ có phản biện',
      why: 'Bà nói hầu như ai cũng đặt câu được, còn “The difficult part is learning to read and think critically.”',
    },
    {
      q: 'Bà cho rằng công thức đó dùng được ở đâu?',
      opts: [
        'Ở cả Facebook, email, thơ, tiểu thuyết — và ở nhiều thứ tiếng, trong đó có tiếng Việt',
        'Chỉ trong bài luận đại học',
        'Chỉ trong báo chí',
        'Chỉ trong tiếng Anh, không dùng được ở tiếng khác',
      ],
      a: 'Ở cả Facebook, email, thơ, tiểu thuyết — và ở nhiều thứ tiếng, trong đó có tiếng Việt',
      why: 'Bà nói dù bạn viết trên Facebook hay gửi email, “re writing a poem or a novel, and whether you” nói bằng tiếng Việt, tiếng Pháp hay tiếng Anh cũng vậy.',
    },
    {
      q: 'Chưa biết viết gì thì bài khuyên bắt đầu thế nào?',
      opts: [
        'Tóm tắt một tác giả hay, tìm xem họ đang đáp lại ai, rồi xác định mình đứng ở đâu',
        'Viết bừa một đoạn rồi sửa sau',
        'Đọc thật nhiều sách trước đã',
        'Chọn một đề tài thật hẹp',
      ],
      a: 'Tóm tắt một tác giả hay, tìm xem họ đang đáp lại ai, rồi xác định mình đứng ở đâu',
      why: 'Bà khuyên: “summarize a good author, find out who that author is responding to”, rồi tìm ra cuộc tranh luận ở đó.',
    },
  ],

  // ===== ĐỢT 5 (12 bài) — chạm mốc 60 bài của việc 2.2 =====

  // Learning Prepositions
  'voa-7865589': [
    {
      q: 'Giới từ cho biết thêm thông tin gì về danh từ?',
      opts: [
        'Hướng, thời gian, vị trí và quan hệ sở hữu',
        'Số ít hay số nhiều',
        'Giống đực hay giống cái',
        'Đếm được hay không đếm được',
      ],
      a: 'Hướng, thời gian, vị trí và quan hệ sở hữu',
      why: 'Bài định nghĩa giới từ là những từ nhỏ “that give additional information about nouns, such as direction, time, location, and possession.”',
    },
    {
      q: 'Bài chia giới từ thành mấy nhóm lớn, và nhóm thứ hai là gì?',
      opts: [
        'Hai nhóm; nhóm thứ hai là các cụm quen dùng, ở đó nghĩa của giới từ kém rõ ràng',
        'Hai nhóm; nhóm thứ hai chỉ dùng trong văn viết',
        'Ba nhóm; nhóm thứ ba là giới từ ghép',
        'Bài không chia nhóm nào cả',
      ],
      a: 'Hai nhóm; nhóm thứ hai là các cụm quen dùng, ở đó nghĩa của giới từ kém rõ ràng',
      why: 'Bài nói nhóm thứ hai gồm “common expressions where the preposition sometimes has a less exact meaning.”',
    },
    {
      q: 'Câu “This house is different to the one I used to live in” thuộc dạng tiếng Anh nào?',
      opts: ['Tiếng Anh Anh', 'Tiếng Anh Mỹ', 'Tiếng Anh Úc', 'Cả hai đều không dùng câu này'],
      a: 'Tiếng Anh Anh',
      why: 'Bài giới thiệu hai ví dụ: “The first is used in British English, the second in American English”, và bản Mỹ dùng “different from”.',
    },
    {
      q: 'Vì sao người học rất dễ chọn nhầm giới từ trong các cụm quen dùng?',
      opts: [
        'Vì đổi giới từ nhiều khi không làm nghĩa đổi, nên giới từ nào nghe cũng hợp lý như nhau',
        'Vì giới từ luôn đứng ở cuối câu',
        'Vì mỗi vùng dùng một giới từ khác nhau',
        'Vì giới từ có quá nhiều âm tiết',
      ],
      a: 'Vì đổi giới từ nhiều khi không làm nghĩa đổi, nên giới từ nào nghe cũng hợp lý như nhau',
      why: 'Bài nói với người học tiếng Anh thì “one preposition might seem as good a choice as any other for this expression.”',
    },
  ],

  // Most and Almost
  'voa-7862372': [
    {
      q: 'Về từ loại, “almost” và “most” khác nhau thế nào?',
      opts: [
        '“Almost” chỉ là trạng từ; “most” có thể là tính từ, trạng từ hoặc lượng từ',
        'Cả hai đều chỉ là trạng từ',
        '“Almost” là lượng từ, “most” là trạng từ',
        'Cả hai đều chỉ là tính từ',
      ],
      a: '“Almost” chỉ là trạng từ; “most” có thể là tính từ, trạng từ hoặc lượng từ',
      why: 'Bài nói: “The word “almost” is an adverb. The word “most” can be an adjective, adverb, or quantifier.”',
    },
    {
      q: 'Sau “almost” có được đặt thẳng giới từ “of” không?',
      opts: [
        'Không — phải dùng “almost all of”',
        'Có, “almost of” là đúng',
        'Chỉ được khi nói, không được khi viết',
        'Chỉ được khi sau đó là danh từ số nhiều',
      ],
      a: 'Không — phải dùng “almost all of”',
      why: 'Bài nói ta không đặt “of” ngay sau “almost”: “we must use the two words “all of” after “almost” to describe a noun.”',
    },
    {
      q: 'Khi nào dùng “most” + danh từ thẳng, khi nào dùng “most of”?',
      opts: [
        'Nói chung thì dùng thẳng; nói về một nhóm cụ thể thì dùng “most of”',
        'Ngược lại: nói chung thì dùng “most of”',
        'Luôn phải dùng “most of”',
        'Tuỳ theo danh từ đếm được hay không',
      ],
      a: 'Nói chung thì dùng thẳng; nói về một nhóm cụ thể thì dùng “most of”',
      why: 'Bài đối chiếu “Most children enjoy playing games” với “Most of the children in his class enjoy playing this game.”',
    },
    {
      q: 'Bài lấy ví dụ nào cho nghĩa “gần xong” của “almost”?',
      opts: [
        'Việc mất một tiếng mà đã làm được 55 phút',
        'Chín mươi phần trăm số trẻ khỏi bệnh',
        'Hoàng hôn đẹp nhất từng thấy',
        'Phần lớn bạn bè sống ở thành phố',
      ],
      a: 'Việc mất một tiếng mà đã làm được 55 phút',
      why: 'Bài nêu tình huống: “if you have a job to do that takes an hour to finish and you have already worked 55 minutes”, thì nói “I am almost finished.”',
    },
  ],

  // Near and Nearby
  'voa-7842145': [
    {
      q: 'Khác biệt cơ bản khi dùng “near” và “nearby” để nói vị trí là gì?',
      opts: [
        '“Nearby” không cần nói nơi kia là đâu; “near” thì phải nói cả hai nơi',
        '“Near” chỉ dùng cho khoảng cách xa hơn',
        '“Nearby” chỉ dùng khi viết',
        'Hai từ dùng thay nhau hoàn toàn',
      ],
      a: '“Nearby” không cần nói nơi kia là đâu; “near” thì phải nói cả hai nơi',
      why: 'Bài nói khi dùng “near” để chỉ nơi chốn thì “we say both places”, ví dụ “Their house is near the market.”',
    },
    {
      q: 'Nếu bạn đang ở trong nhà ai đó và họ nói “The market is nearby.”, câu đó nghĩa là gì?',
      opts: [
        'Chợ ở gần ngôi nhà đó',
        'Chợ ở gần chỗ bạn làm việc',
        'Chợ ở gần trung tâm thành phố',
        'Câu đó thiếu thông tin nên không hiểu được',
      ],
      a: 'Chợ ở gần ngôi nhà đó',
      why: 'Bài giải thích người nói không cần nhắc lại từ “house” vì “nearby” “means close to the place already stated or known.”',
    },
    {
      q: '“Near” dùng làm tính từ ghép thì phải viết thế nào?',
      opts: [
        'Có dấu gạch nối, như “near-perfect condition”',
        'Viết liền một từ',
        'Viết rời và không có dấu gì',
        'Luôn viết hoa chữ đầu',
      ],
      a: 'Có dấu gạch nối, như “near-perfect condition”',
      why: 'Bài dặn khi viết tính từ ghép thì “we must put a hyphen, or short line, connecting the two adjectives.”',
    },
    {
      q: 'Câu “The building project is nearing completion.” dùng “near” làm gì?',
      opts: ['Làm động từ', 'Làm trạng từ', 'Làm giới từ', 'Làm danh từ'],
      a: 'Làm động từ',
      why: 'Bài nói: “Lastly, we can use the word ” “near” như một động từ, nghĩa là đang tiến gần tới về mặt thời gian.',
    },
  ],

  // Types of Sentences
  'voa-7543267': [
    {
      q: 'Một “clause” (mệnh đề) gồm hai phần nào?',
      opts: [
        'Chủ ngữ và động từ',
        'Chủ ngữ và tân ngữ',
        'Động từ và trạng ngữ',
        'Danh từ và tính từ',
      ],
      a: 'Chủ ngữ và động từ',
      why: 'Bài định nghĩa mệnh đề gồm “a subject (the topic of a clause) and a verb (what is said about the topic).”',
    },
    {
      q: 'Vì sao “In the morning” KHÔNG phải là một mệnh đề?',
      opts: [
        'Vì nó không có động từ',
        'Vì nó quá ngắn',
        'Vì nó không đứng đầu câu',
        'Vì nó bắt đầu bằng một giới từ',
      ],
      a: 'Vì nó không có động từ',
      why: 'Bài nói thẳng: “In the morning” is not a clause because it does not have a verb.”',
    },
    {
      q: 'Câu có ÍT NHẤT một mệnh đề độc lập và một hoặc nhiều mệnh đề phụ thuộc gọi là gì?',
      opts: ['Câu phức (complex sentence)', 'Câu ghép (compound sentence)', 'Câu đơn (simple sentence)', 'Câu hỏi'],
      a: 'Câu phức (complex sentence)',
      why: 'Bài nói: “When a sentence has at least one independent clause as well as one or more dependent clauses, it is a complex sentence.”',
    },
    {
      q: 'Câu người đọc hỏi — “In Norway, there’s an art museum for children’s art.” — thực ra là loại câu gì?',
      opts: [
        'Câu đơn, không phải câu phức như sách viết',
        'Câu phức, sách viết đúng',
        'Câu ghép',
        'Không phải một câu hoàn chỉnh',
      ],
      a: 'Câu đơn, không phải câu phức như sách viết',
      why: 'Bài trả lời: “Your example has only one clause. This means it is a simple sentence, not a complex sentence.”',
    },
  ],

  // Using 'Just' and 'Only'
  'voa-7527550': [
    {
      q: 'Bài nói “only” hay được dùng trong tình huống nào?',
      opts: [
        'Tình huống không như ý, hoặc khi mình không hài lòng',
        'Tình huống vui vẻ, đáng mừng',
        'Chỉ trong câu hỏi',
        'Chỉ trong văn bản trang trọng',
      ],
      a: 'Tình huống không như ý, hoặc khi mình không hài lòng',
      why: 'Bài nói: “The word “only” can be used in an undesirable situation”, ví dụ “He only finished half his homework.”',
    },
    {
      q: 'Còn “just” dùng khi muốn làm gì?',
      opts: [
        'Nhấn mạnh, nói mạnh hơn',
        'Nói giảm cho lịch sự',
        'Đặt câu hỏi gián tiếp',
        'Chỉ thời gian trong quá khứ',
      ],
      a: 'Nhấn mạnh, nói mạnh hơn',
      why: 'Bài nói ta dùng “just” “when we want to make an emphasis, or a stronger statement.”',
    },
    {
      q: 'Trong tiếng Anh nói, “just” còn có tác dụng ngược lại nào?',
      opts: [
        'Làm một việc nghe nhỏ đi, nhẹ đi',
        'Làm câu nghe trang trọng hơn',
        'Biến câu kể thành câu hỏi',
        'Chỉ ra rằng việc đã kết thúc',
      ],
      a: 'Làm một việc nghe nhỏ đi, nhẹ đi',
      why: 'Bài nói: “we also use “just” when we want to make something smaller or less important”, ví dụ “Your friend lives just down the road.”',
    },
    {
      q: 'Vì sao ta hay nói “Could I just ask you something?”',
      opts: [
        'Vì người kia có vẻ đang bận, nên ta làm cho lời đề nghị nghe nhẹ đi',
        'Vì ta muốn nhấn mạnh câu hỏi',
        'Vì đó là cách hỏi trang trọng nhất',
        'Vì câu hỏi rất quan trọng',
      ],
      a: 'Vì người kia có vẻ đang bận, nên ta làm cho lời đề nghị nghe nhẹ đi',
      why: 'Bài đặt câu này vào tình huống “when someone appears to be busy, we might say” như vậy.',
    },
  ],

  // 'Do' for Emphasis
  'voa-7496596': [
    {
      q: 'Câu học sinh viết — “Yes, consumers do adopt new habits.” — có sai ngữ pháp không?',
      opts: [
        'Không sai — “do” ở đây dùng để nhấn mạnh',
        'Sai, vì “do” chỉ dùng trong câu hỏi',
        'Sai, vì thiếu trợ động từ khác',
        'Sai, vì “do” phải đứng cuối câu',
      ],
      a: 'Không sai — “do” ở đây dùng để nhấn mạnh',
      why: 'Bài trả lời: “The sentence you ask about is grammatically correct. The use of “do” shows emphasis.”',
    },
    {
      q: 'Câu “Do come in.” dùng “do” để làm gì?',
      opts: [
        'Làm một câu mệnh lệnh nghe lịch sự hơn',
        'Đặt một câu hỏi',
        'Phủ định một câu',
        'Rút gọn câu cho ngắn',
      ],
      a: 'Làm một câu mệnh lệnh nghe lịch sự hơn',
      why: 'Bài nói “do” có thể “make imperatives, or commands, more polite.”',
    },
    {
      q: 'Câu “Bill likes to swim, and so does Betty.” cho thấy “do” còn dùng để làm gì?',
      opts: [
        'Làm câu rõ hơn và ngắn hơn',
        'Nhấn mạnh Betty',
        'Đặt câu hỏi về Betty',
        'Phủ định vế sau',
      ],
      a: 'Làm câu rõ hơn và ngắn hơn',
      why: 'Bài nói: “Do” can also be used to make sentences clearer and shorter.”',
    },
    {
      q: 'Câu nào trong bài là ví dụ cho việc dùng “do” để nhấn mạnh CẢ CÂU?',
      opts: [
        '“It does taste good!”',
        '“Does Brent have to work on weekends?”',
        '“I don’t have any money.”',
        '“Yes, I do.”',
      ],
      a: '“It does taste good!”',
      why: 'Bài nói: “A whole sentence can be emphasized by adding ” “do”, rồi nêu “It does taste good!” và “We did enjoy the play.”',
    },
  ],

  // Improve Your Vocabulary: Part 1
  'voa-7613240': [
    {
      q: 'Theo bài, cách tốt nhất để mở rộng vốn từ là gì?',
      opts: [
        'Biết một từ cho THẤU: hình thức, nghĩa và cách dùng',
        'Học định nghĩa của thật nhiều từ',
        'Đọc thật nhiều sách',
        'Học thuộc danh sách từ mỗi ngày',
      ],
      a: 'Biết một từ cho THẤU: hình thức, nghĩa và cách dùng',
      why: 'Bài nói học nhiều định nghĩa chưa hẳn là tốt nhất: “The best way is to fully know a word.”',
    },
    {
      q: 'Vì sao câu “It’s nice to meet you.” lại khó nghe ra?',
      opts: [
        'Vì khi nói nhanh, chỗ nối “meet” và “you” bật ra âm /ch/ mà chính tả không hề gợi ý',
        'Vì câu đó nói quá nhanh',
        'Vì có từ đồng âm',
        'Vì trọng âm rơi vào từ “nice”',
      ],
      a: 'Vì khi nói nhanh, chỗ nối “meet” và “you” bật ra âm /ch/ mà chính tả không hề gợi ý',
      why: 'Bài nói người ta có thể tạo ra âm đó “at the beginning of the word “you” although the words’ spellings do not suggest this.”',
    },
    {
      q: 'Từ viết r-e-c-o-r-d cho thấy trọng âm quan trọng thế nào?',
      opts: [
        'Nhấn phần đầu thì là danh từ, nhấn phần sau thì là động từ',
        'Nhấn phần đầu thì là số ít, phần sau là số nhiều',
        'Trọng âm không đổi nghĩa, chỉ đổi giọng điệu',
        'Nhấn phần sau thì thành tính từ',
      ],
      a: 'Nhấn phần đầu thì là danh từ, nhấn phần sau thì là động từ',
      why: 'Bài nói: “When we stress the first part of the word, RE-cord, it is a noun.”',
    },
    {
      q: 'Bài lấy hai ví dụ nào cho việc nhận ra gốc từ và tiền tố / hậu tố?',
      opts: [
        '“Addition” (add + -tion) và “untrue” (un- + true)',
        '“Record” và “vocabulary”',
        '“Meet” và “you”',
        '“Prefix” và “suffix”',
      ],
      a: '“Addition” (add + -tion) và “untrue” (un- + true)',
      why: 'Bài nhắc: “It is important to recognize the root word in addition to prefixes or suffixes” — như “add” + -tion, hay “true” + un-.',
    },
  ],

  // 'Call'
  'voa-7601370': [
    {
      q: 'Từ điển Merriam-Webster liệt kê khoảng bao nhiêu nghĩa cho từ “call”?',
      opts: ['Gần 50', 'Khoảng 10', 'Đúng 20', 'Hơn 200'],
      a: 'Gần 50',
      why: 'Từ điển Merriam-Webster liệt kê gần 50 nghĩa cho từ này, nên bài công nhận: “It is, as you say, a challenging word.”',
    },
    {
      q: 'Khi “call” dùng để mô tả một người hay một vật, sắc thái thường thế nào?',
      opts: [
        'Thường gắn với lời mô tả không hay',
        'Thường là lời khen',
        'Luôn trung tính',
        'Chỉ dùng trong văn viết trang trọng',
      ],
      a: 'Thường gắn với lời mô tả không hay',
      why: 'Bài nói: “Usually, it is linked to an unpleasant description”, ví dụ “It’s not nice to call people stupid.”',
    },
    {
      q: '“Call out” nghĩa là gì?',
      opts: [
        'Phê bình ai đó, hoặc yêu cầu họ giải thích việc mình làm',
        'Gọi to tên ai đó',
        'Gọi điện ra nước ngoài',
        'Huỷ một cuộc hẹn',
      ],
      a: 'Phê bình ai đó, hoặc yêu cầu họ giải thích việc mình làm',
      why: 'Bài định nghĩa: “Call out” means to criticize someone or ask them to explain their actions.”',
    },
    {
      q: 'Bài kết thúc bằng cách chơi chữ với cụm nào?',
      opts: [
        '“Call it quits” — nghĩa là dừng lại ở đây',
        '“Call the shots” — nghĩa là ra quyết định',
        '“Call in sick” — nghĩa là xin nghỉ ốm',
        '“Call for” — nghĩa là yêu cầu',
      ],
      a: '“Call it quits” — nghĩa là dừng lại ở đây',
      why: 'Bài viết: “But we are out of time now. In other words, we have to call it quits.”',
    },
  ],

  // Are You Strong 'Out of the Gate'?
  'voa-7645574': [
    {
      q: '“Out of the gate” nghĩa là gì?',
      opts: [
        'Ngay lúc bắt đầu một việc gì đó',
        'Lúc kết thúc một việc',
        'Lúc bỏ dở giữa chừng',
        'Lúc ra khỏi nhà',
      ],
      a: 'Ngay lúc bắt đầu một việc gì đó',
      why: 'Bài nói: “Out of the gate means the very start of something” — như lúc mở đầu một chương trình phát thanh.',
    },
    {
      q: 'Thành ngữ này bắt nguồn từ đâu?',
      opts: [
        'Từ các môn thể thao có nhốt con vật sau một cánh cổng trước khi xuất phát',
        'Từ việc mở cổng thành phố buổi sáng',
        'Từ nghề chăn nuôi',
        'Từ một trò chơi trẻ em',
      ],
      a: 'Từ các môn thể thao có nhốt con vật sau một cánh cổng trước khi xuất phát',
      why: 'Bài nói cụm này đến từ các môn “that involve holding animals behind a gate until it is time to start.”',
    },
    {
      q: '“Right off the bat” bắt nguồn từ môn nào?',
      opts: [
        'Bóng chày hoặc cricket — môn có dùng gậy',
        'Đua ngựa',
        'Bơi lội',
        'Điền kinh',
      ],
      a: 'Bóng chày hoặc cricket — môn có dùng gậy',
      why: 'Bài nói các nhà nghiên cứu từ ngữ cho rằng cụm này “is from baseball, cricket, or another sport where a bat is involved.”',
    },
    {
      q: 'Bài lấy tình huống nào để minh hoạ “from the get-go”?',
      opts: [
        'Ngày đầu đi làm ở chỗ mới — phải đúng giờ và sẵn sàng làm việc',
        'Buổi họp mặt gia đình',
        'Một cuộc đua ngựa',
        'Một lớp học trực tuyến bị trục trặc',
      ],
      a: 'Ngày đầu đi làm ở chỗ mới — phải đúng giờ và sẵn sàng làm việc',
      why: 'Bài nói khi bắt đầu công việc mới thì “It’s important to make a good first impression from the get-go.”',
    },
  ],

  // Marathon or Sprint?
  'voa-7444324': [
    {
      q: 'Khác biệt giữa marathon và sprint là gì?',
      opts: [
        'Marathon thử sức bền, sprint thử tốc độ',
        'Marathon chạy trong sân, sprint chạy ngoài đường',
        'Marathon dành cho người trẻ, sprint cho người lớn tuổi',
        'Hai môn chỉ khác nhau ở tên gọi',
      ],
      a: 'Marathon thử sức bền, sprint thử tốc độ',
      why: 'Bài nói: “It is a test of endurance. A sprint is a short race and tests speed.”',
    },
    {
      q: 'Nếu chạy marathon mà lao hết sức ngay từ đầu thì sao?',
      opts: [
        'Sẽ nhanh chóng cạn sức',
        'Sẽ về đích sớm hơn',
        'Sẽ giữ được nhịp tốt hơn',
        'Sẽ không ảnh hưởng gì',
      ],
      a: 'Sẽ nhanh chóng cạn sức',
      why: 'Bài nói người đó “would likely quickly run out of steam”, và cách chạy ấy khó dẫn tới thành công.',
    },
    {
      q: '“Pacing” nghĩa là gì?',
      opts: [
        'Cân nhắc việc cần làm với nguồn lực mình có — thời gian, sức lực, tiền bạc',
        'Chạy thật đều một tốc độ',
        'Đếm số bước chân',
        'Nghỉ giữa chừng cho lại sức',
      ],
      a: 'Cân nhắc việc cần làm với nguồn lực mình có — thời gian, sức lực, tiền bạc',
      why: 'Bài định nghĩa: “Pacing means considering the task you need to complete and the resources you have available.”',
    },
    {
      q: 'Bài áp câu “life is a marathon, not a sprint” vào việc học tiếng Anh thế nào?',
      opts: [
        'Cứ học đều mỗi ngày, từng chút một, rồi tiếng Anh sẽ khá lên theo thời gian',
        'Nên học dồn thật nhiều trong một tháng',
        'Nên thi lấy chứng chỉ càng sớm càng tốt',
        'Nên tìm một lớp học cấp tốc',
      ],
      a: 'Cứ học đều mỗi ngày, từng chút một, rồi tiếng Anh sẽ khá lên theo thời gian',
      why: 'Bài kết: “If you keep studying day by day, little by little, your English is sure to get better over time.”',
    },
  ],

  // 'Dip Your Toes' or 'Take the Plunge'?
  'voa-7518407': [
    {
      q: '“Dip your toes in” nghĩa là gì?',
      opts: [
        'Bắt đầu một việc từ từ, cẩn thận, vì chưa chắc mình có thích không',
        'Bỏ dở một việc giữa chừng',
        'Làm một việc thật nhanh',
        'Nhờ người khác làm thử trước',
      ],
      a: 'Bắt đầu một việc từ từ, cẩn thận, vì chưa chắc mình có thích không',
      why: 'Bài nói: “you start doing it slowly and carefully. You are not sure if you will like it.”',
    },
    {
      q: '“Take the plunge” thì ngược lại thế nào?',
      opts: [
        'Lao thẳng vào việc, không chờ đợi, không do dự',
        'Bỏ cuộc ngay từ đầu',
        'Nhờ người khác quyết định giúp',
        'Chờ đến khi có đủ thông tin',
      ],
      a: 'Lao thẳng vào việc, không chờ đợi, không do dự',
      why: 'Bài nói: “When you take the plunge, you jump right into something. You do not wait or hesitate.”',
    },
    {
      q: '“Test the waters” nghĩa là gì, và bài lấy ví dụ nào?',
      opts: [
        'Thử cảm nhận trước khi dấn thân — như đến ở ngắn ngày trước khi chuyển tới thành phố mới',
        'Đo nhiệt độ nước hồ bơi',
        'Hỏi ý kiến người thân',
        'Đọc trước tài liệu về việc mình sắp làm',
      ],
      a: 'Thử cảm nhận trước khi dấn thân — như đến ở ngắn ngày trước khi chuyển tới thành phố mới',
      why: 'Bài nói cụm này nghĩa là “you get a feel for something before committing to it”, rồi nêu ví dụ chuyển tới thành phố mới.',
    },
    {
      q: 'Trong đoạn hội thoại về khiêu vũ, người B chọn cách nào?',
      opts: [
        'Đến xem trước đã — “dip my toes in”',
        'Vào học ngay lớp cho người mới',
        'Từ chối hẳn, không đi',
        'Rủ thêm người khác cùng đi',
      ],
      a: 'Đến xem trước đã — “dip my toes in”',
      why: 'Người B chọn đến xem trước — “dip my toes in”. Bài mô tả cách đó: “You may want to try an activity briefly to find out if you like it first.”',
    },
  ],

  // Questions, Answers about Holiday Activities
  'voa-6904240': [
    {
      q: 'Cấu trúc câu hỏi có/không về ngày lễ trong bài là gì?',
      opts: [
        'Do + chủ ngữ + celebrate + tên ngày lễ',
        'Did + chủ ngữ + celebrating + tên ngày lễ',
        'Are + chủ ngữ + celebrate + tên ngày lễ',
        'What + chủ ngữ + celebrate',
      ],
      a: 'Do + chủ ngữ + celebrate + tên ngày lễ',
      why: 'Bài nói: “You can start with yes or no questions, which involve the helping verb ” “do”, theo khung “Do + subject + celebrate + the holiday”.',
    },
    {
      q: '“Open-ended question” là loại câu hỏi nào?',
      opts: [
        'Câu hỏi không nhằm lấy câu trả lời có hoặc không',
        'Câu hỏi để ngỏ cuối buổi trò chuyện',
        'Câu hỏi có nhiều lựa chọn sẵn',
        'Câu hỏi về tương lai',
      ],
      a: 'Câu hỏi không nhằm lấy câu trả lời có hoặc không',
      why: 'Bài định nghĩa đó là “questions that are not asking for a yes or no answer.”',
    },
    {
      q: 'Trong khung “What + do + chủ ngữ + do + …”, vì sao ví dụ lại thành “What did you do…”?',
      opts: [
        'Vì đang hỏi về một việc trong quá khứ nên “do” chuyển sang dạng quá khứ',
        'Vì câu hỏi cần trang trọng hơn',
        'Vì có hai chữ “do” nên phải đổi một chữ',
        'Vì chủ ngữ là ngôi thứ hai',
      ],
      a: 'Vì đang hỏi về một việc trong quá khứ nên “do” chuyển sang dạng quá khứ',
      why: 'Bài giải thích: “This is because we are asking about an event in the past.”',
    },
    {
      q: 'Câu trả lời thường gặp nhất hay dùng dạng quá khứ đơn của những động từ nào?',
      opts: [
        'go, see, visit',
        'do, make, take',
        'be, have, get',
        'come, stay, leave',
      ],
      a: 'go, see, visit',
      why: 'Bài nói câu trả lời phổ biến nhất “will involve the simple past forms of the verbs go, see, or visit.”',
    },
  ],

};

export default CAU_HOI;
