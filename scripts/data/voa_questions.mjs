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
};

export default CAU_HOI;
