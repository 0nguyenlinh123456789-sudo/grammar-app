// File: src/data/storyQuizA2.js
// CÂU HỎI ĐỌC HIỂU MỨC VĂN BẢN — BẬC A2 (việc 3.1, phần mở rộng).
// SOẠN TAY. Luật chung: xem src/data/storyQuiz.js. Cái bẫy riêng của bậc thấp
// (câu hỏi trả lời được bằng kiến thức chung) ghi ở đầu src/data/storyQuizA1.js —
// nó áp y nguyên cho bậc này.
//
// Khác A1 một chút: bài A2 dài hơn và có nhiều chi tiết đối lập nhau hơn, nên câu
// nhiễu ở đây phần lớn là HOÁN VỊ hai chi tiết có thật trong bài (ai làm việc gì,
// cái nào ở đâu). Loại nhiễu đó vừa dài tương đương đáp án, vừa buộc người học
// phải đọc đúng câu chứa thông tin thay vì đoán theo cảm giác.
export const STORY_QUIZ_A2 = {
  'emotions-personality': [
    {
      q: 'Khi mới chuyển ra nước ngoài, người kể cảm thấy thế nào?',
      options: [
        'Cảm thấy lo lắng và nhớ nhà, mọi thứ đều mới và quá sức chịu',
        'Cảm thấy tự tin và lạc quan hẳn về cuộc sống mới của mình',
        'Cảm thấy tò mò và nhiệt tình, dù có lúc hơi quá cố chấp',
        'Cảm thấy biết ơn vì lòng tốt của người láng giềng bên cạnh',
      ],
      answer: 0,
      dan: 'When I first moved abroad, I felt anxious and homesick.',
    },
    {
      q: 'Ai đã giúp người kể ổn định cuộc sống mới?',
      options: [
        'Người láng giềng, vì bà ấy rất rộng lòng và biết cảm thông',
        'Người thầy, vì thầy khen người kể tò mò và đầy nhiệt tình',
        'Các bạn cùng lớp, vì họ kiên nhẫn và luôn động viên mình',
        'Chính bản thân người kể, nhờ tự tin và lạc quan dần lên',
      ],
      answer: 0,
      dan: 'But my neighbor was so generous and sympathetic that she helped me settle in.',
    },
    {
      q: 'Thầy giáo nhận xét người kể thế nào?',
      options: [
        'Tò mò và nhiệt tình, nhưng có lúc thì lại quá cố chấp',
        'Kiên nhẫn và biết động viên, nhưng có lúc hơi bực bội',
        'Can đảm và biết thương người, nhưng có lúc hơi ganh tị',
        'Lo lắng và nhớ nhà, nhưng dần trở nên tự tin hơn hẳn',
      ],
      answer: 0,
      dan: 'My teacher said I was curious and enthusiastic, but sometimes too stubborn.',
    },
    {
      q: 'Theo bài, khi cuối cùng làm được việc khó thì người kể cảm thấy gì?',
      options: [
        'Cảm thấy nhẹ nhõm và tự hào về chính mình',
        'Cảm thấy bối rối và hơi ngượng trước cả lớp',
        'Cảm thấy bực bội với những nhiệm vụ quá khó',
        'Cảm thấy ganh tị với tiến bộ của người khác',
      ],
      answer: 0,
      dan: 'Sometimes I was frustrated with difficult tasks, but when I finally succeeded, I felt relieved and proud.',
    },
  ],

  'animals-pets': [
    {
      q: 'Con vật nuôi đầu tiên của người kể là gì, thuộc giống nào?',
      options: [
        'Một con cún, thuộc giống golden retriever có bộ lông mềm',
        'Một con mèo, loài duy nhất trong bài thật sự biết kêu rừ rừ',
        'Một con chim, loài mà bài nói dùng lông vũ để bay đi xa',
        'Một con rùa, thuộc nhóm bò sát và có vuốt dùng để đào đất',
      ],
      answer: 0,
      dan: 'It was a golden retriever breed with soft fur.',
    },
    {
      q: 'Người kể phải cho con vật ăn bao nhiêu lần một ngày?',
      options: [
        'Hai lần một ngày, và phải đưa nó đi khám thú y đều đặn',
        'Một lần một ngày, và chỉ đưa đi khám thú y khi nó bị bệnh',
        'Ba lần một ngày, giống như bữa ăn của người trong nhà',
        'Hai lần một tuần, vào đúng những ngày đi khám thú y',
      ],
      answer: 0,
      dan: 'I had to feed it twice a day and take it to the veterinarian regularly.',
    },
    {
      q: 'Theo bài, vì sao một số loài đang bị nguy cấp?',
      options: [
        'Vì con người phá hủy nơi sống của chúng',
        'Vì chúng phải bay hàng nghìn ki-lô-mét mỗi mùa',
        'Vì những loài săn mồi như hổ báo đi tìm con mồi',
        'Vì chúng phải dùng vuốt để đào đất tìm chỗ trú',
      ],
      answer: 0,
      dan: 'Some animals are endangered because humans destroy their habitat.',
    },
    {
      q: 'Bài so sánh động vật có vú với loài bò sát như thế nào?',
      options: [
        'Cá heo là thú có vú và thông minh, còn rùa là bò sát và có vuốt',
        'Rùa là thú có vú và thông minh, còn cá heo là bò sát và có vuốt',
        'Cả hai đều là thú có vú, chỉ khác nhau ở chỗ sống dưới nước',
        'Cá heo là loài săn mồi, còn rùa thì luôn là con mồi bị bắt',
      ],
      answer: 0,
      dan: 'Mammals like dolphins are intelligent, while reptiles like turtles have claws for digging.',
    },
  ],

  'health-basics': [
    {
      q: 'Ở phần 1, Bob bị thương ra sao khi tập quá sức?',
      options: [
        'Trượt chân, đập khuỷu tay và vai, nứt xương và lật cổ chân',
        'Bị chóng mặt và mất hết sức, phải chịu một cơn đau dữ dội',
        'Bị bỏng nặng và một vết thương sâu trên da bắt đầu chảy máu',
        'Bị đau họng, ho nặng, đau đầu dữ dội và đau cả vùng bụng',
      ],
      answer: 0,
      dan: 'He tripped, hit his elbow and shoulder, and managed to crack a bone and sprain his ankle.',
    },
    {
      q: 'Ở phần 2, người bán thuốc phải hướng dẫn Bob điều gì?',
      options: [
        'Hướng dẫn đúng liều dùng và mức cho phép mỗi ngày',
        'Hướng dẫn cách tự sơ cứu khi bị bỏng và chảy máu',
        'Hướng dẫn cách kiểm tra mạch và đo huyết áp tại nhà',
        'Hướng dẫn cách tập luyện để không bị nứt xương nữa',
      ],
      answer: 0,
      dan: 'The pharmacist had to instruct him on the correct dose and daily allowance to relieve his sore throat.',
    },
    {
      q: 'Ở phần 3, y tá đã làm những gì cho Bob tại bệnh viện?',
      options: [
        'Kiểm tra mạch, đo huyết áp và lấy một mẫu máu của anh',
        'Chẩn đoán lâm sàng rồi kết luận đó là một vết thương cấp',
        'Tiêm một mũi và bắt đầu truyền thuốc kháng sinh vào người',
        'Đặt một chiếc đinh, băng lại vết thương và làm một ca mổ nhỏ',
      ],
      answer: 0,
      dan: 'At the hospital clinic, a nurse checked his pulse and blood pressure, taking a blood sample.',
    },
    {
      q: 'Ở phần 4, bác sĩ thấy có mối liên hệ giữa những thứ nào?',
      options: [
        'Giữa việc nghiện đồ ăn vặt, chứng đau lưng và sức khoẻ kém',
        'Giữa chứng mất ngủ, rối loạn giấc ngủ và nỗi lo về cân nặng',
        'Giữa cơn đau răng dữ dội, dị ứng và thị lực đang kém dần',
        'Giữa việc tiêm vắc-xin, bảo hiểm y tế và cơ thể mỏng manh',
      ],
      answer: 0,
      dan: 'The doctor noted an adverse indicator and an indication of a strong correlation (they correlate) between his addiction to junk food, his backache, and poor health.',
    },
  ],

  'city-urban-life': [
    {
      q: 'Ở phần 1, người kể đã đi qua những chỗ nào trên đường?',
      options: [
        'Vạch kẻ ngựa vằn ở ngã tư, một cầu vượt, một hầm đi bộ và một đại lộ',
        'Một lâu đài cổ, một nhà thờ lớn, rồi tới bảo tàng và phòng tranh',
        'Chợ, khu chợ trời, một cửa hàng tổng hợp hiện đại và một trung tâm',
        'Một khu dân cư trong nội thành, cách trung tâm đúng một dãy phố',
      ],
      answer: 0,
      dan: 'I crossed the zebra crossing at the intersection, walked over an overpass, under an underpass, and through a long boulevard.',
    },
    {
      q: 'Ở phần 2, gia đình người kể đã chọn ở đâu?',
      options: [
        'Một khu dân cư trong nội thành, cách trung tâm đúng một dãy phố',
        'Vùng ngoại vi phía ngoài, gần một khu định cư nghèo và xóm liều',
        'Một thị trấn yên tĩnh, chỗ mà cả nhà đã ở trước khi chuyển đi',
        'Một toà nhà cao tầng vừa xây xong sau khi phá dỡ nhà ở cũ',
      ],
      answer: 0,
      dan: 'Instead, we chose a residential neighborhood in the urban area.',
    },
    {
      q: 'Ở phần 3, người kể đã tới thăm những chỗ nào?',
      options: [
        'Một lâu đài cổ và một nhà thờ lớn rất đẹp trong thành phố',
        'Một cửa hàng tổng hợp hiện đại và một trung tâm mua sắm',
        'Một khu dân cư nội thành cách trung tâm đúng một dãy phố',
        'Một hầm đi bộ, một cầu vượt và một đại lộ rất dài trong phố',
      ],
      answer: 0,
      dan: 'We visited a historic castle and a beautiful cathedral.',
    },
    {
      q: 'Ở phần 4, bạn của người kể làm việc ở đâu và ở đâu?',
      options: [
        'Làm ở văn phòng gần toà thị chính, và ở một khách sạn sang',
        'Làm ở toà thị chính cùng thị trưởng, và ở một nhà hàng sang',
        'Làm ở bưu điện, và ở một khách sạn ngay cạnh bến cảng',
        'Làm ở phòng tập và sân vận động, và ở gần bệnh viện lớn',
      ],
      answer: 0,
      dan: 'My friend works at an office near the city hall where the mayor works, and stays at a luxury hotel.',
    },
  ],

  'home-daily-life': [
    {
      q: 'Trước khi mua nhà, Benny ở đâu và mỗi ngày đi làm mất bao lâu?',
      options: [
        'Ở một căn hộ studio nhỏ gần trường, đi xe buýt bốn mươi lăm phút',
        'Ở một căn nhà phố ba phòng ngủ trong khu ngoại ô rất yên tĩnh',
        'Ở nhà của chủ cho thuê, và đi làm mất đúng hai mươi năm',
        'Ở một căn có ban công đẹp nhìn ra vườn, ngay gần chỗ làm',
      ],
      answer: 0,
      dan: 'He lived in a tiny studio flat near campus, paying high rent to his landlord.',
    },
    {
      q: 'Benny mua nhà bằng cách nào?',
      options: [
        'Trả trước một khoản, rồi vay thế chấp trong hai mươi năm',
        'Trả hết một lần bằng tiền tiết kiệm sau nhiều năm đi làm',
        'Trả tiền thuê hằng tháng cho chủ nhà cho tới khi đủ số',
        'Vay của chủ nhà rồi trả lại bằng tiền lắp pin năng lượng',
      ],
      answer: 0,
      dan: 'With a 20-year mortgage, he bought a beautiful townhouse in a quiet neighbourhood outside the city — in the suburbs.',
    },
    {
      q: 'Benny thuê hai người thợ nào, và mỗi người làm gì?',
      options: [
        'Thợ điện kiểm tra hệ dây điện, thợ nước sửa lại đường ống',
        'Thợ nước kiểm tra hệ dây điện, thợ điện sửa lại đường ống',
        'Thợ điện lắp pin năng lượng, thợ nước lắp nhà thông minh',
        'Nhà thiết kế nội thất kiểm tra dây điện và sửa đường ống',
      ],
      answer: 0,
      dan: 'He hired an electrician to check the wiring, and a plumber to fix the pipes.',
    },
    {
      q: 'Benny thêm những gì để tiết kiệm tiền tiện ích?',
      options: [
        'Lắp các tấm pin năng lượng mặt trời lên nhà của mình',
        'Lắp hệ thống nhà thông minh cho toàn bộ các phòng ở',
        'Lắp quạt trần trong mọi phòng và một giá sách thật lớn',
        'Thay rèm mới, một chiếc sofa êm và một giá sách rất lớn',
      ],
      answer: 0,
      dan: 'He added solar panels to save on utility bills and installed smart home technology.',
    },
  ],

  'food-nutrition': [
    {
      q: 'Mỗi cuối tuần, Benny lên kế hoạch gì cho tuần tới?',
      options: [
        'Một thực đơn cân bằng: nhiều rau, đạm nạc, chất béo tốt, ngũ cốc',
        'Một ngày nấu ăn: mua nguyên liệu hữu cơ tươi ở ngoài chợ về',
        'Một bữa tối mời bạn, trong đó có món chay cho người bạn Luna',
        'Một công thức mới: cá hấp, rau nướng và kim chi lên men',
      ],
      answer: 0,
      dan: 'Every weekend, he planned his balanced diet for the coming week: plenty of vegetables, lean protein, healthy fats, and high-fiber whole grains.',
    },
    {
      q: 'Công thức của hôm đó gồm những món gì?',
      options: [
        'Cá hấp, rau nướng và một phần kim chi lên men ăn kèm',
        'Rau xào, đạm nạc và một phần ngũ cốc nguyên hạt ăn kèm',
        'Cá ướp, nước dùng nhẹ và một phần rau hữu cơ ăn kèm',
        'Món chay hoàn toàn từ thực vật, dành riêng cho bạn Luna',
      ],
      answer: 0,
      dan: "Today's recipe: steamed fish with grilled vegetables and a side of fermented kimchi (rich in antioxidants!).",
    },
    {
      q: 'Theo Benny, điều bí mật nằm ở đâu?',
      options: [
        'Nằm ở cách nêm nếm gia vị cho món ăn',
        'Nằm ở việc chọn nguyên liệu hữu cơ tươi',
        'Nằm ở cách ướp cá trước khi mang đi hấp',
        'Nằm ở việc đun nước dùng thật nhẹ và lâu',
      ],
      answer: 0,
      dan: '"The secret is in the seasoning," he said wisely.',
    },
    {
      q: 'Benny kết luận công thức cho một cuộc sống vui gồm những gì?',
      options: [
        'Thực đơn cân bằng, uống đủ nước và kiểm soát khẩu phần ăn',
        'Nguyên liệu hữu cơ tươi, không đồ chế biến và không chất bảo quản',
        'An ninh lương thực, giảm rác thải thức ăn và sản xuất bền vững',
        'Nhiều rau, đạm nạc, chất béo tốt và ngũ cốc nguyên hạt nhiều xơ',
      ],
      answer: 0,
      dan: '"A balanced diet, proper hydration, and portion control — that\'s the recipe for a happy life!" 🥕',
    },
  ],

  'sports-fitness': [
    {
      q: 'Mỗi buổi sáng Benny khởi động bằng những gì?',
      options: [
        'Giãn cơ và tập tim mạch, để tăng sức bền và độ linh hoạt',
        'Chơi bóng đá cùng các đồng đội của mình ở ngoài sân cỏ',
        'Chạy nước rút một trăm mét để phá kỷ lục của chính mình',
        'Sút một quả phạt đền thật bình tĩnh trong trận đấu cuối',
      ],
      answer: 0,
      dan: 'Every morning, he warmed up with stretching and cardio, building his stamina and agility.',
    },
    {
      q: 'Ở giải khu vực, vì sao Benny bị coi là kèo dưới?',
      options: [
        'Vì không ai tin một con thỏ lại có thể tranh tài được',
        'Vì huấn luyện viên của cậu chỉ nói về tinh thần thượng võ',
        'Vì cậu chưa từng ghi được một cú hat-trick nào trước đó',
        'Vì sân vận động hôm ấy có tới tám mươi nghìn khán giả',
      ],
      answer: 0,
      dan: 'At the regional tournament, Benny was the underdog — nobody believed a bunny could compete!',
    },
    {
      q: 'Trong trận cuối, Benny làm được những gì?',
      options: [
        'Ghi một cú hat-trick, rồi sút thành công quả phạt đền',
        'Phá kỷ lục cá nhân ở nội dung chạy nước rút một trăm mét',
        'Được trọng tài trao huy chương vàng ngay trên sân đấu',
        'Giữ được tinh thần thượng võ dù bị coi là kèo dưới',
      ],
      answer: 0,
      dan: 'In the final match, Benny scored a hat-trick!',
    },
    {
      q: 'Theo Benny, thể thao thật ra nói về điều gì?',
      options: [
        'Về tính kỷ luật, tinh thần đồng đội và không bao giờ bỏ cuộc',
        'Về việc thắng được trận đấu và giành lấy chiếc huy chương vàng',
        'Về sức bền, độ linh hoạt và việc phá được kỷ lục của mình',
        'Về việc từ kèo dưới vươn lên thành nhà vô địch của giải',
      ],
      answer: 0,
      dan: '"It\'s about discipline, teamwork, and never giving up — whether you\'re the champion or the underdog!" 🥇',
    },
  ],

  'shopping-finance': [
    {
      q: 'Benny đã tiết kiệm được bao nhiêu, và tới đâu?',
      options: [
        'Được 500 đô, và tới trung tâm mua sắm đúng dịp giảm giá lớn',
        'Được 3.000 đô mỗi tháng, và tới ngân hàng để gửi tiền vào',
        'Được 40% giá gốc, và tới quầy thu ngân để lấy tờ hoá đơn',
        'Được một khoản đủ mua đồng hồ sang, và tới cửa hàng đó',
      ],
      answer: 0,
      dan: 'Benny the Bunny had saved $500 and went to the mall for a big sale.',
    },
    {
      q: 'Ở quầy thu ngân, tờ hoá đơn cho thấy gì?',
      options: [
        'Cho thấy một mức giảm giá bốn mươi phần trăm',
        'Cho thấy tổng chi tiêu đã vượt quá ngân sách đặt ra',
        'Cho thấy khoản tiết kiệm được chuyển tự động sang đầu tư',
        'Cho thấy một khoản trả góp cho chiếc thẻ tín dụng',
      ],
      answer: 0,
      dan: 'At checkout, the cashier scanned his items and gave him a receipt showing a 40% discount.',
    },
    {
      q: 'Vì sao Benny không mua chiếc đồng hồ sang trọng?',
      options: [
        'Vì nó vượt xa ngân sách, và cậu nhớ tới mục tiêu tài chính',
        'Vì nó không có trong đợt giảm giá lớn của trung tâm hôm đó',
        'Vì cậu chỉ mang đúng 500 đô nên không đủ tiền để trả góp',
        'Vì cậu muốn dồn tiền cho việc bán hàng thủ công trên mạng',
      ],
      answer: 0,
      dan: 'But then he saw a luxury watch — way over budget!',
    },
    {
      q: 'Theo Benny, kẻ thù của tự do tài chính là gì?',
      options: [
        'Việc mua sắm theo cảm hứng',
        'Việc trả góp bằng thẻ tín dụng',
        'Lạm phát làm mất sức mua của tiền',
        'Việc đầu tư vào tiền mã hoá',
      ],
      answer: 0,
      dan: '"Impulse buying is the enemy of financial freedom," Benny said.',
    },
  ],

  'shopping-market-daily': [
    {
      q: 'Theo bài, ở chợ mỗi buổi sáng người dân mua gì từ ai?',
      options: [
        'Mua thịt từ người bán thịt và hải sản từ người bán cá',
        'Mua thịt từ người bán cá và hải sản từ người bán thịt',
        'Mua rau hữu cơ và đồ đông lạnh từ các kệ trong siêu thị',
        'Mua đồ giảm giá từ những người bán rong ở ngoài đường',
      ],
      answer: 0,
      dan: 'Every morning, locals visit the market to buy fresh vegetables, fruit, meat from the butcher, and seafood from the fishmonger.',
    },
    {
      q: 'Theo bài, có thể trả tiền ở quầy bằng những cách nào?',
      options: [
        'Tiền mặt, thẻ tín dụng, hoặc ví điện tử bằng cách quét mã QR',
        'Chỉ tiền mặt hoặc thẻ tín dụng, vì chợ chưa nhận ví điện tử',
        'Chỉ ví điện tử như Momo, vì đó là cách nhanh và tiện nhất',
        'Phiếu giảm giá và mã khuyến mãi lấy từ các trang bán hàng',
      ],
      answer: 0,
      dan: 'At the checkout counter, you can pay by cash, credit card, or mobile payment through e-wallets like Momo by scanning a QR code.',
    },
    {
      q: 'Theo bài, người mua ở siêu thị làm những việc gì?',
      options: [
        'Đẩy xe, xem ngày hết hạn và nhãn hàng, rồi xếp hàng chờ tính tiền',
        'Mặc cả với người bán rồi trả bằng tiền mặt để có được giá tốt',
        'Đặt hàng trên mạng, đọc bình luận rồi dùng phiếu giảm giá',
        'Thử quần áo trong phòng thử để xem đúng cỡ và đúng màu',
      ],
      answer: 0,
      dan: 'Shoppers push carts, check expiry dates and labels, then queue at the checkout.',
    },
    {
      q: 'Theo bài, người mua thông minh kiểm tra những gì trước khi mua?',
      options: [
        'Chất lượng sản phẩm, uy tín thương hiệu và chế độ bảo hành',
        'Ngày hết hạn, nhãn hàng và số lượng còn lại trên kệ hàng',
        'Mức giảm giá, phiếu khuyến mãi và điều kiện giao hàng miễn phí',
        'Ngân sách của mình, giá của các nơi khác và cỡ đồ cần mua',
      ],
      answer: 0,
      dan: 'Smart consumers check product quality, brand reputation, and warranty before purchasing.',
    },
  ],

  'transportation-driving-daily': [
    {
      q: 'Theo bài, người đi bộ chờ ở đâu và chờ điều gì?',
      options: [
        'Chờ ở vạch sang đường cho tới khi đèn chuyển sang màu xanh',
        'Chờ ở nhà ga cho tới khi tàu hoặc tàu điện ngầm tới bến',
        'Chờ ở ngã tư cho tới khi đám xe đang tắc bắt đầu di chuyển',
        'Chờ ở bãi đỗ xe cho tới khi tìm được một chỗ trống để đỗ',
      ],
      answer: 0,
      dan: 'Drivers frequently honk their horns in frustration, while pedestrians wait patiently at the crosswalk for the traffic light to turn green.',
    },
    {
      q: 'Nếu lái xe hơi, theo bài bạn buộc phải làm những gì?',
      options: [
        'Mang giấy phép lái xe, cài dây an toàn và tuân thủ giới hạn tốc độ',
        'Đội mũ bảo hiểm, bấm còi khi cần và nhìn kỹ vào các tấm gương',
        'Bật đèn báo rẽ trước khi đổi làn và sẵn sàng đạp lên chân phanh',
        'Tìm một bãi đỗ hoặc một ga-ra để đỗ xe sau chuyến đi dài',
      ],
      answer: 0,
      dan: "If you drive a car, you must carry your driver's license, fasten your seatbelt, and follow the speed limit.",
    },
    {
      q: 'Theo bài, vượt xe không an toàn hoặc bỏ qua biển dừng dẫn tới gì?',
      options: [
        'Dẫn tới một vụ tai nạn hoặc một khoản tiền phạt',
        'Dẫn tới việc bị tắc cứng giữa đám xe ở chỗ ngã tư',
        'Dẫn tới việc phải đi tìm một bãi đỗ hoặc một ga-ra',
        'Dẫn tới việc phải bấm còi liên tục vì quá bực bội',
      ],
      answer: 0,
      dan: 'Overtaking unsafely or ignoring a stop sign can lead to an accident or a fine.',
    },
    {
      q: 'Khi lái trên đường cao tốc, theo bài điều gì là quan trọng?',
      options: [
        'Nhìn gương, bật đèn báo rẽ trước khi đổi làn, sẵn sàng đạp phanh',
        'Mang giấy phép, cài dây an toàn và tuân thủ đúng giới hạn tốc độ',
        'Đội mũ bảo hiểm cho an toàn và bấm còi khi thấy xe khác vượt',
        'Tìm bãi đỗ hoặc ga-ra rồi ra khỏi xe để đi bộ trên vỉa hè',
      ],
      answer: 0,
      dan: 'When driving on the highway, it is important to check the mirrors, use the indicator before changing lanes, and be ready to hit the brake.',
    },
  ],

  'public-facilities-daily': [
    {
      q: 'Nếu ai đó bị bệnh, theo bài họ có thể đi đâu?',
      options: [
        'Tới phòng khám gần nhà hoặc bệnh viện chính, rồi ghé nhà thuốc',
        'Tới trường học hoặc trường đại học để được học hành đầy đủ',
        'Tới bảo tàng, nhà hát hoặc rạp phim cho việc giải trí',
        'Tới bưu điện gửi bưu kiện rồi ra ngân hàng để rút tiền',
      ],
      answer: 0,
      dan: 'If someone feels sick, they can quickly visit a local clinic or go to the main hospital for treatment, stopping by the pharmacy for medicine afterward.',
    },
    {
      q: 'Theo bài, người dân thường tụ tập ở đâu?',
      options: [
        'Ở quảng trường thị trấn, gần tượng đài và vòi phun nước đẹp',
        'Ở khu trung tâm, nơi có những toà nhà cao tầng đầy văn phòng',
        'Ở hành lang rộng của trung tâm mua sắm hoặc sảnh khách sạn',
        'Ở điểm dừng xe buýt, chỗ mọi người cùng chờ chuyến xe tới',
      ],
      answer: 0,
      dan: 'People often gather in the town square near the monument and the beautiful fountain.',
    },
    {
      q: 'Khi thời tiết đẹp, theo bài trẻ em và người già làm gì?',
      options: [
        'Trẻ em chơi ở sân chơi trong công viên, người già ngồi trên ghế dài',
        'Người già chơi ở sân chơi trong công viên, trẻ em ngồi trên ghế dài',
        'Cả hai cùng ra quảng trường gần tượng đài và vòi phun nước',
        'Cả hai cùng vào bảo tàng, nhà hát hoặc rạp phim cho mát mẻ',
      ],
      answer: 0,
      dan: 'When the weather is nice, children play on the playground in the park while the elderly sit on the bench.',
    },
    {
      q: 'Theo bài, những dịch vụ quan trọng nào cũng có sẵn?',
      options: [
        'Gửi bưu kiện ở bưu điện, rút tiền ở ngân hàng, gần đồn cảnh sát',
        'Mua đồ ở siêu thị lớn, ở chợ địa phương và ở hàng bánh góc phố',
        'Học ở trường và đại học, khám ở phòng khám và bệnh viện chính',
        'Xem kịch ở nhà hát, xem phim ở rạp và thăm quan ở bảo tàng',
      ],
      answer: 0,
      dan: 'Important services are also available: you can send a parcel from the post office, withdraw cash from the bank, and feel safe knowing the police station and fire station are nearby.',
    },
  ],

  'money-banking-daily': [
    {
      q: 'Theo bài, muốn mua đồ hằng ngày thì có những cách nào?',
      options: [
        'Rút tiền mặt ở máy ATM bằng thẻ ghi nợ, hoặc trả bằng thẻ tín dụng',
        'Nhận lương vào tài khoản ngân hàng vào đúng ngày trả lương',
        'Mang theo tiền giấy và tiền xu để mặc cả cho được giá tốt',
        'Vay một khoản thế chấp từ ngân hàng rồi trả lại kèm tiền lãi',
      ],
      answer: 0,
      dan: 'To buy daily items, you can either withdraw cash at an ATM using your debit card or pay directly by credit card.',
    },
    {
      q: 'Vì sao khi đi chợ nên mang tiền giấy và tiền xu?',
      options: [
        'Để có thể mặc cả cho được một mức giá tốt hơn',
        'Để nhận lại tiền thừa và tờ hoá đơn từ người bán',
        'Để tránh tiêu quá số mình kiếm được mỗi tháng',
        'Để kiểm tra tỉ giá trước khi đi một chuyến xa',
      ],
      answer: 0,
      dan: 'If you go to the market, it is better to carry some banknotes and coins so you can haggle for a bargain.',
    },
    {
      q: 'Theo bài, tiêu nhiều hơn số mình kiếm được sẽ dẫn tới gì?',
      options: [
        'Có thể cạn tiền, vỡ nợ và rơi vào cảnh mắc nợ',
        'Có thể phải sống trong một ngân sách rất chật vật',
        'Có thể phải vay thế chấp rồi trả lại kèm tiền lãi',
        'Có thể mất đi phần giá trị của món đồ vừa mua',
      ],
      answer: 0,
      dan: 'If you spend more than you earn, you might run out of money, go broke, and fall into debt.',
    },
    {
      q: 'Theo bài, người giàu thường làm gì với khoản tiền của mình?',
      options: [
        'Đầu tư vào chứng khoán để tạo ra lợi nhuận',
        'Quyên góp cho hội từ thiện để giúp người nghèo',
        'Vay thế chấp từ ngân hàng để mua một căn nhà',
        'Giữ tiền giấy và tiền xu để mặc cả khi đi chợ',
      ],
      answer: 0,
      dan: 'Wealthy people often invest their funds in stocks to make a profit.',
    },
  ],

  'health-body-daily': [
    {
      q: 'Theo bài, ngủ không tốt và bị căng thẳng dẫn tới điều gì?',
      options: [
        'Hệ miễn dịch yếu đi, nên dễ bị cảm lạnh hoặc bị cúm',
        'Cơ và xương yếu đi, nên cần ăn cân bằng và tập đều đặn',
        'Đầu đau dữ dội hoặc đau vùng bụng, nên phải tới phòng khám',
        'Chân hoặc tay bị gãy, nên có thể phải làm một ca mổ',
      ],
      answer: 0,
      dan: "If you don't sleep well and feel stressed, your immune system becomes weak, making it easy to catch a cold or the flu.",
    },
    {
      q: 'Ở phòng khám, theo bài bác sĩ và y tá làm những việc gì?',
      options: [
        'Bác sĩ khám mắt, tai, miệng và lồng ngực; y tá đo huyết áp',
        'Y tá khám mắt, tai, miệng và lồng ngực; bác sĩ đo huyết áp',
        'Bác sĩ viết đơn thuốc, còn y tá bán thuốc ở ngay nhà thuốc',
        'Bác sĩ làm một ca mổ, còn y tá dọn và băng lại vết thương',
      ],
      answer: 0,
      dan: 'The doctor will examine your eyes, ears, mouth, and chest. The nurse might take your blood pressure.',
    },
    {
      q: 'Nếu bị đứt tay chảy máu, theo bài nên làm gì?',
      options: [
        'Rửa sạch vết thương rồi dán băng cá nhân hoặc băng gạc lên',
        'Tới phòng khám ngay để bác sĩ viết cho một đơn thuốc',
        'Nghỉ ngơi để cơ thể tự lành và hồi phục dần theo thời gian',
        'Hít thật sâu để đầu óc thư giãn và đỡ thấy cơn đau hơn',
      ],
      answer: 0,
      dan: 'If you have an injury, like a cut on your finger that bleeds, you should clean the wound and put a plaster or bandage on it.',
    },
    {
      q: 'Bài kể những việc đơn giản nào cũng cần cho một đời sống lành mạnh?',
      options: [
        'Đánh răng phòng đau răng, che da khỏi nắng, hít sâu cho thư giãn',
        'Ăn cân bằng, tập đều đặn để cơ và xương của mình khoẻ hơn',
        'Nghỉ ngơi sau điều trị để cơ thể tự lành và hồi phục hoàn toàn',
        'Đi phòng khám khi thấy chóng mặt, đau đầu hoặc đau vùng bụng',
      ],
      answer: 0,
      dan: 'Remember, simple things like brushing your teeth to prevent a toothache, protecting your skin from the sun, and taking deep breaths to relax your mind are all essential for a healthy life.',
    },
  ],

  'weather-seasons-daily': [
    {
      q: 'Theo bài, ở một số vùng nhiệt đới thì mùa hè còn là mùa gì?',
      options: [
        'Là đầu mùa mưa, với mưa lớn, ẩm ướt và có lúc lụt nặng',
        'Là mùa cây cối bắt đầu mọc lên, nhiệt độ dịu và ấm dần',
        'Là mùa lá vàng rụng xuống đất khi gió lạnh bắt đầu thổi',
        'Là mùa lạnh nhất, khi nhiệt độ tụt xuống dưới không độ',
      ],
      answer: 0,
      dan: 'However, in some tropical regions, summer is also the start of the monsoon season, when heavy rain pours down, causing wet and humid conditions, and sometimes a severe flood.',
    },
    {
      q: 'Trong một cơn bão tuyết, theo bài người ta làm gì?',
      options: [
        'Ở trong nhà và mặc đồ ấm như găng tay, khăn quàng cho khỏi rét',
        'Xem dự báo để biết bão, bão nhiệt đới hay bão xoáy có tới không',
        'Lái xe cẩn thận vì đường có tuyết hoặc băng rất nguy hiểm',
        'Thích nghi dần vì trái đất nóng lên và khí hậu đang đổi khác',
      ],
      answer: 0,
      dan: 'During a blizzard, a strong gale blows, and people stay indoors wearing warm clothes like gloves and a scarf to avoid shivering.',
    },
    {
      q: 'Bài kể những hiện tượng cực đoan nào là thiên tai?',
      options: [
        'Hạn hán, động đất hoặc sóng thần — những thứ nhắc ta về sức mạnh tự nhiên',
        'Bão, bão nhiệt đới hoặc bão xoáy — những thứ ta xem dự báo để biết trước',
        'Sương mù dày và sương giăng buổi sáng, cùng đường có tuyết hoặc băng',
        'Mưa lớn của mùa mưa, khiến trời ẩm ướt và có lúc gây lụt nặng',
      ],
      answer: 0,
      dan: 'Extreme events like a drought, an earthquake, or a tsunami are natural disasters that remind us of the power of nature.',
    },
    {
      q: 'Theo bài, vì sao dự báo thời tiết nay khó hơn trước?',
      options: [
        'Vì trái đất nóng lên và khí hậu đang biến đổi khác đi',
        'Vì mùa mưa mang theo mưa lớn, độ ẩm cao và lụt nặng',
        'Vì sương mù dày và đường có băng khiến việc đo khó hơn',
        'Vì thiên tai như hạn hán, động đất và sóng thần nhiều hơn',
      ],
      answer: 0,
      dan: 'Because of global warming and climate change, predicting the weather has become harder for meteorologists, making it essential for us to adapt to protect our environment.',
    },
  ],

  'shopping-stores-daily': [
    {
      q: 'Theo bài, ở đâu thì mặc cả được và ở đâu thì không?',
      options: [
        'Mặc cả được ở chợ, còn ở cửa hàng tổng hợp thì không được',
        'Mặc cả được ở cửa hàng tổng hợp, còn ở chợ thì lại không được',
        'Mặc cả được ở cả hai chỗ, miễn là đang trong đợt giảm giá',
        'Không mặc cả được ở đâu cả, chỉ chờ đợt giảm giá mà thôi',
      ],
      answer: 0,
      dan: 'If an item is too expensive, you might ask for a lower price, although you can only bargain at the market, not at a department store.',
    },
    {
      q: 'Khi vào cửa hàng, theo bài bạn có thể làm gì để xem hàng?',
      options: [
        'Lấy một cái giỏ hoặc đẩy một chiếc xe dọc theo lối đi giữa kệ',
        'Mang đồ vào phòng thử để xem cỡ có vừa và màu có phù hợp',
        'Ra quầy tính tiền và đứng xếp hàng chờ tới lượt của mình',
        'Hỏi người bán một mức giá thấp hơn giá đang được niêm yết',
      ],
      answer: 0,
      dan: 'When you enter a store, you can take a basket or push a trolley down the aisle to browse the products.',
    },
    {
      q: 'Ở quầy tính tiền, theo bài người bán làm những việc gì?',
      options: [
        'Quét hàng, áp phiếu giảm giá, rồi đưa hoá đơn và tiền thừa',
        'Hỏi bạn muốn trả bằng tiền mặt hay bằng thẻ tín dụng nào',
        'Mang hàng vào phòng thử để bạn xem cỡ có vừa người không',
        'Đưa cho bạn một cái giỏ hoặc một chiếc xe để đi chọn hàng',
      ],
      answer: 0,
      dan: 'They will scan your goods, apply any voucher or coupon you have, and hand you the receipt and change.',
    },
    {
      q: 'Nếu hàng kém chất lượng hoặc bị hỏng, theo bài bạn làm được gì?',
      options: [
        'Mang lại kèm hoá đơn để đổi hoặc lấy tiền, nếu còn bảo hành',
        'Mang lại kèm phiếu giảm giá để được áp mức giá thấp hơn',
        'Mang vào phòng thử để kiểm lại cỡ và màu của món hàng',
        'Chờ đợt giảm giá tiếp theo rồi mua lại một món hàng khác',
      ],
      answer: 0,
      dan: 'If the product has bad quality or is broken, you can bring it back with the receipt to exchange it or get a refund, as long as it is under warranty.',
    },
  ],

  'emotions-feelings-daily': [
    {
      q: 'Theo bài, khi có người thô lỗ với bạn thì cảm giác nào là bình thường?',
      options: [
        'Thấy khó chịu, tức tối hoặc nổi giận với người đó',
        'Thấy buồn, thất vọng hoặc thậm chí là mất hy vọng',
        'Thấy lo lắng, bồn chồn hoặc hơi rụt rè trước mặt họ',
        'Thấy đỏ mặt và ngượng, rồi lịch sự xin lỗi người đó',
      ],
      answer: 0,
      dan: 'When someone is rude or mean to you, it is normal to feel annoyed, angry, or mad.',
    },
    {
      q: 'Thay vì hét lên, theo bài nên làm gì?',
      options: [
        'Giữ bình tĩnh và hít vào một hơi thật sâu',
        'Xin lỗi một cách lịch sự với người vừa nói',
        'Chuẩn bị thật kỹ để lấy lại sự tự tin của mình',
        'Tìm người khác để chia sẻ và được an ủi',
      ],
      answer: 0,
      dan: 'You might want to shout or yell, but it is better to stay calm and take a deep breath.',
    },
    {
      q: 'Theo bài, trong tình huống mới như buổi phỏng vấn thì nhiều người cảm thấy gì?',
      options: [
        'Lo lắng, bồn chồn hoặc hơi rụt rè trước những điều chưa quen',
        'Khó chịu, tức tối hoặc nổi giận với người đang đối diện mình',
        'Buồn, thất vọng hoặc hối tiếc vì đã không chuẩn bị kỹ hơn',
        'Vui vẻ, phấn khởi và hài lòng vì mọi thứ đang diễn ra tốt',
      ],
      answer: 0,
      dan: 'In new situations, like a job interview, many people feel nervous, anxious, or a bit shy.',
    },
    {
      q: 'Khi thấy ai đó đang khóc, theo bài chúng ta làm gì?',
      options: [
        'Cảm thấy thương cảm và đồng cảm, rồi tìm cách an ủi họ',
        'Giữ bình tĩnh, hít một hơi thật sâu rồi mới nói chuyện',
        'Đỏ mặt vì ngượng nhưng vẫn lịch sự xin lỗi người đó',
        'Nhớ tới những người mình yêu đang ở nơi rất xa mình',
      ],
      answer: 0,
      dan: 'When we see someone crying, we feel sympathy and empathy, and try to comfort them.',
    },
  ],

  'food-cooking-daily': [
    {
      q: 'Buổi tối, mẹ của người kể chuẩn bị nguyên liệu thế nào?',
      options: [
        'Băm một củ hành, cắt lát cà chua và cho một tép tỏi vào nồi',
        'Luộc cá hoặc rán thịt bò trong chảo trên bếp đang cháy',
        'Bày bàn với đĩa, bát, dao, nĩa và một chiếc thìa để ăn',
        'Bỏ bát đĩa bẩn vào bồn và cất đồ ăn còn lại vào tủ lạnh',
      ],
      answer: 0,
      dan: 'She might chop an onion, slice a tomato, and add a clove of garlic to a pot.',
    },
    {
      q: 'Trong lúc mẹ nấu, người kể làm gì?',
      options: [
        'Giúp bày bàn với đĩa, bát, một con dao, một cái nĩa và thìa',
        'Giúp băm hành, cắt cà chua và cho một tép tỏi vào trong nồi',
        'Giúp luộc cá hoặc rán thịt bò trong chảo đặt trên bếp lửa',
        'Giúp bỏ bát đĩa bẩn vào bồn rồi cất đồ còn lại vào tủ lạnh',
      ],
      answer: 0,
      dan: 'While she cooks on the stove, I help set the table with plates, bowls, a knife, a fork, and a spoon.',
    },
    {
      q: 'Theo bài, món nhà nấu tốt hơn những gì?',
      options: [
        'Tốt hơn ăn đồ sống hoặc đồ ăn nhanh ở bên ngoài',
        'Tốt hơn ăn một bữa nhẹ như quả táo hay quả chuối',
        'Tốt hơn ăn cơm với thịt lợn, thịt gà và rau tươi',
        'Tốt hơn ăn bánh mì, một quả trứng và một cốc sữa',
      ],
      answer: 0,
      dan: 'Whether a dish is spicy, sweet, or a little salty, a home-cooked meal is always better than eating raw or fast food.',
    },
    {
      q: 'Sau khi ăn xong, theo bài cả nhà làm gì?',
      options: [
        'Bỏ bát đĩa bẩn vào bồn và cất đồ ăn còn lại vào tủ lạnh',
        'Bày lại bàn với đĩa, bát, dao, nĩa và thìa cho bữa sau',
        'Băm hành, cắt cà chua và cho tỏi vào nồi cho bữa mai',
        'Ăn thêm một bữa nhẹ như một quả táo hay một quả chuối',
      ],
      answer: 0,
      dan: 'After eating, when our stomachs are full, we put the dirty dishes in the sink and keep the leftover food in the fridge.',
    },
  ],

  'health-fitness-daily': [
    {
      q: 'Ở phòng tập, theo bài người ta làm những gì?',
      options: [
        'Giãn cơ, nâng tạ và ra mồ hôi để tim và phổi khoẻ hơn',
        'Ăn rau, trái cây tươi và uống đủ nước để có thêm năng lượng',
        'Nghỉ trên giường và ngủ đủ giấc khi thấy người không khoẻ',
        'Tới phòng khám để được kiểm tra và nhận một đơn thuốc',
      ],
      answer: 0,
      dan: 'They stretch their muscles, lift weights, and sweat to keep their heart and lungs healthy.',
    },
    {
      q: 'Nếu bị cảm hoặc cúm, theo bài có những dấu hiệu nào?',
      options: [
        'Sốt cao, ho, chảy nước mũi và một cơn đau đầu khó chịu',
        'Một vết đứt, một vết thương chảy máu hoặc một chỗ xương gãy',
        'Thừa cân, nên nhiều người phải tới phòng tập để tập luyện',
        'Căng thẳng nhiều, nên phải giữ vệ sinh tốt để phòng bệnh',
      ],
      answer: 0,
      dan: 'If you catch a cold or the flu, you might have a high fever, a cough, a runny nose, and a headache.',
    },
    {
      q: 'Theo bài, trong tình huống cấp cứu thì điều gì xảy ra?',
      options: [
        'Xe cứu thương chở người bệnh tới viện, nơi có thể phải mổ',
        'Bác sĩ hoặc y tá khám rồi viết cho một đơn thuốc để mua',
        'Người bệnh nghỉ trên giường và ngủ cho thật đủ giấc',
        'Người bệnh ra nhà thuốc để mua những viên thuốc cần dùng',
      ],
      answer: 0,
      dan: 'In an emergency, an ambulance will take the patient to the hospital, where they might need surgery or an operation.',
    },
    {
      q: 'Theo bài, cách tốt nhất để phòng bệnh là gì?',
      options: [
        'Chăm sóc cơ thể, giảm căng thẳng và giữ vệ sinh cho tốt',
        'Ăn rau và trái cây tươi, uống đủ nước để có thêm sức',
        'Tới phòng tập tập luyện để không bị thừa cân quá mức',
        'Nghỉ ngơi đủ sau điều trị để cơ thể lành và hồi phục',
      ],
      answer: 0,
      dan: 'Remember, taking care of your body, reducing stress, and maintaining good hygiene are the best ways to prevent disease.',
    },
  ],

  'education-school-daily': [
    {
      q: 'Theo bài, ai điều hành nhà trường?',
      options: [
        'Hiệu trưởng cùng với các thầy cô giáo',
        'Các học sinh giỏi và các bạn cùng lớp',
        'Các thầy cô dạy toán, khoa học và lịch sử',
        'Hiệu trưởng cùng với các phụ huynh học sinh',
      ],
      answer: 0,
      dan: 'The headmaster and the teachers run the school.',
    },
    {
      q: 'Giáo viên giảng bài khó bằng cách nào?',
      options: [
        'Viết lên bảng bằng một viên phấn màu trắng',
        'Đặt câu hỏi rồi chờ học sinh giơ tay trả lời',
        'Cho bài tập về nhà để học sinh tự luyện thêm',
        'Cho học sinh ra sân chơi nghỉ một lát giữa giờ',
      ],
      answer: 0,
      dan: 'In class, the teacher might explain a difficult lesson by writing on the board with white chalk.',
    },
    {
      q: 'Theo bài, một học sinh tốt sẽ làm những gì trong lớp?',
      options: [
        'Lắng nghe kỹ, ghi chép lại và hỏi khi mình chưa hiểu bài',
        'Luôn làm hết bài tập về nhà và không bao giờ mắc lỗi nào',
        'Ra sân chơi cùng bạn bè và ăn trưa ở nhà ăn của trường',
        'Học thật kỹ để cuối kỳ thi được điểm cao và vượt qua bài',
      ],
      answer: 0,
      dan: 'A good pupil will listen carefully, take notes, and ask a question if they do not understand.',
    },
    {
      q: 'Theo bài, học sinh rất giỏi thì có thể được gì ở đại học?',
      options: [
        'Có thể giành được một suất học bổng',
        'Có thể tốt nghiệp và nhận được một tấm bằng',
        'Có thể vượt qua bài thi với một điểm số cao',
        'Có thể dùng kiến thức của mình để tìm việc tốt',
      ],
      answer: 0,
      dan: 'If they are very smart, they might win a scholarship.',
    },
  ],

  'work-career-daily': [
    {
      q: 'Theo bài, bước đầu tiên khi đi tìm việc là gì?',
      options: [
        'Viết một bản CV mạnh để cho thấy kỹ năng và kinh nghiệm',
        'Nộp đơn ứng tuyển vào một vị trí ở công ty mà mình muốn',
        'Đi dự buổi phỏng vấn mà công ty đó mời mình tới tham gia',
        'Ký một bản hợp đồng sau khi nhà tuyển dụng nhận mình vào',
      ],
      answer: 0,
      dan: 'When you are looking for work, the first step is to write a strong CV or resume to show your skills, experience, and qualifications.',
    },
    {
      q: 'Theo bài, một công việc toàn thời gian bình thường nghĩa là gì?',
      options: [
        'Làm một ca tám tiếng, nhưng có lúc phải làm thêm giờ',
        'Làm cùng một đội, chia sẻ tài liệu và dự các buổi họp',
        'Nhận lương cuối tháng để trang trải cuộc sống và thuế',
        'Được nghỉ có lương và một kỳ nghỉ để nghỉ ngơi đôi chút',
      ],
      answer: 0,
      dan: 'A regular full-time job means working an 8-hour shift, but sometimes you might be very busy, have a tight deadline, and need to work overtime.',
    },
    {
      q: 'Theo bài, một công ty tốt cho người làm những gì?',
      options: [
        'Cho nghỉ có lương và một kỳ nghỉ để có thể nghỉ ngơi',
        'Cho làm cùng đội và chia sẻ tài liệu với các đồng nghiệp',
        'Cho một bản hợp đồng ngay sau buổi phỏng vấn thành công',
        'Cho một ca tám tiếng cùng thời hạn công việc rất gấp',
      ],
      answer: 0,
      dan: 'Some jobs are very stressful, but a good company will offer paid leave and a holiday so you can take a break.',
    },
    {
      q: 'Theo bài, làm gì trong nhiều năm thì có thể được thăng chức?',
      options: [
        'Làm việc chăm chỉ, tham gia đào tạo và giúp các đồng nghiệp',
        'Viết một bản CV mạnh và nộp đơn vào những vị trí tốt hơn',
        'Làm thêm giờ mỗi khi công việc bận và thời hạn quá gấp',
        'Nhận lương đều đặn cuối tháng và trả đủ các khoản thuế',
      ],
      answer: 0,
      dan: 'Over the years, if you work hard, take part in training, and help your coworkers, you might get a promotion.',
    },
  ],

  'money-shopping-daily': [
    {
      q: 'Theo bài, "window shopping" ở trung tâm là để làm gì?',
      options: [
        'Chỉ để xem có món gì mới, chưa phải để mua thứ gì cả',
        'Để lấp đầy một chiếc xe đẩy với các món đồ ăn cần thiết',
        'Để tìm một chiếc áo đẹp rồi mang vào phòng thử mặc lên',
        'Để tìm đợt giảm giá và mua được một món thật vừa tiền',
      ],
      answer: 0,
      dan: 'Sometimes, people just go window shopping at the mall to see what is new.',
    },
    {
      q: 'Nếu chiếc áo không vừa, theo bài bạn làm gì?',
      options: [
        'Nhờ người bán hàng đưa cho một cỡ khác để thử lại',
        'Mang ra quầy thu ngân rồi trả bằng tiền mặt hoặc thẻ',
        'Giữ lại tờ hoá đơn để sau này mang tới xin hoàn tiền',
        'Kiểm lại giá của nó xem có đang trong đợt giảm giá không',
      ],
      answer: 0,
      dan: "If it doesn't fit, you can ask the shop assistant for a different size.",
    },
    {
      q: 'Vì sao theo bài luôn phải giữ lại tờ hoá đơn?',
      options: [
        'Vì nếu món hỏng hoặc mình không thích thì còn trả lại được',
        'Vì nó ghi mức giảm giá và cho biết món đó có vừa tiền không',
        'Vì người bán cần nó để đưa lại đúng số tiền thừa cho mình',
        'Vì nó là bằng chứng cho thấy mình đã trả bằng thẻ tín dụng',
      ],
      answer: 0,
      dan: "Always keep the receipt, because if the item is broken or you don't like it later, you can return it to the store to ask for a refund or an exchange.",
    },
    {
      q: 'Bài kết lại bằng lời khuyên nào về tiền?',
      options: [
        'Đừng tiêu hết, nên gửi một phần vào tài khoản ngân hàng',
        'Nên chờ đợt giảm giá thì mua mới được món thật vừa tiền',
        'Nên mang theo ví hoặc túi tiền mỗi khi ra ngoài mua sắm',
        'Nên trả bằng tiền mặt để luôn kiểm lại được số tiền thừa',
      ],
      answer: 0,
      dan: 'Shopping can be fun, but remember not to spend all your money; it is important to save some in your bank account so you don\'t go broke!',
    },
  ],

  'family-relationships-daily': [
    {
      q: 'Cuối tuần, khi về thăm ông bà thì mỗi người làm gì?',
      options: [
        'Ông kể chuyện thời thơ ấu, còn bà thì nướng bánh quy',
        'Bà kể chuyện thời thơ ấu, còn ông thì nướng bánh quy',
        'Cả hai cùng kể chuyện, còn chú và cô thì tới thăm nhà',
        'Cả hai cùng nướng bánh quy để cả họ tụ họp cho đông vui',
      ],
      answer: 0,
      dan: 'My grandfather tells us stories from his childhood, and my grandmother bakes cookies.',
    },
    {
      q: 'Theo bài, một cuộc hôn nhân thành công cần những gì?',
      options: [
        'Cần tôn trọng, tin tưởng và ủng hộ lẫn nhau giữa hai người',
        'Cần một buổi hẹn hò, tình yêu rồi tiến tới việc kết hôn',
        'Cần một gia đình lớn cùng tụ họp và những tình bạn bền',
        'Cần dựa được vào họ hàng và người bạn thân nhất của mình',
      ],
      answer: 0,
      dan: 'A successful marriage requires you to respect, trust, and support each other.',
    },
    {
      q: 'Theo bài, nếu các đôi có tranh cãi thì nên làm gì?',
      options: [
        'Nên cố gắng làm hoà lại với nhau sau đó',
        'Nên tin tưởng và ủng hộ nhau nhiều hơn nữa',
        'Nên dựa vào họ hàng và người bạn thân nhất',
        'Nên đi hẹn hò lại để tình cảm được hâm nóng',
      ],
      answer: 0,
      dan: 'Even if couples argue, they should try to make up.',
    },
    {
      q: 'Theo bài, khi cần giúp đỡ thì có thể dựa vào ai?',
      options: [
        'Vào họ hàng của mình và người bạn thân nhất',
        'Vào bạn cùng lớp hoặc một người đồng nghiệp',
        'Vào người mới quen mà sau này thành bạn tốt',
        'Vào người bạn đời sau khi hai người kết hôn',
      ],
      answer: 0,
      dan: 'You can always depend on your relatives and your best friend when you need help.',
    },
  ],

  'hobbies-free-time-daily': [
    {
      q: 'Thú vui yêu thích của người kể là gì?',
      options: [
        'Đọc một quyển sách hay hoặc nghe nhạc cho thư thái',
        'Vẽ, tô màu và chơi đàn piano như người em gái mình',
        'Chơi một môn thể thao như bóng đá, bóng rổ hay quần vợt',
        'Lướt mạng, dùng mạng xã hội hoặc chơi một trò điện tử',
      ],
      answer: 0,
      dan: 'For example, my favorite hobby is reading a good book or listening to music.',
    },
    {
      q: 'Người em gái của người kể có tài về gì?',
      options: [
        'Về nghệ thuật: cô ấy thích vẽ, tô màu và chơi đàn piano',
        'Về thể thao: cô ấy tới phòng tập, đi bơi và đạp xe đều',
        'Về công nghệ: cô ấy lướt mạng và chơi các trò điện tử',
        'Về việc nội trợ: cô ấy nướng bánh và xếp hình cùng cả nhà',
      ],
      answer: 0,
      dan: 'My sister is very artistic; she loves to draw, paint, and play the piano.',
    },
    {
      q: 'Cuối tuần, theo bài các gia đình thường làm gì cùng nhau?',
      options: [
        'Ra rạp xem phim, hoặc ở nhà nướng bánh, xếp hình, chơi cờ',
        'Đi cắm lều trong rừng, hoặc leo núi để hít không khí trong',
        'Tới phòng tập, đi bơi và đạp xe để giữ cho cơ thể khoẻ',
        'Lướt mạng, dùng mạng xã hội và chơi các trò điện tử vui',
      ],
      answer: 0,
      dan: 'They might go to the cinema to watch a movie, or stay at home to bake a cake, do a puzzle, and play a board game like chess.',
    },
    {
      q: 'Bài kết lại bằng lời khuyên nào?',
      options: [
        'Tìm việc thú vị, vào một câu lạc bộ, gặp bạn mới và vui vẻ',
        'Đừng lãng phí thời gian rảnh mà hãy tới phòng tập cho khoẻ',
        'Chọn thú vui yên tĩnh như đọc sách hoặc nghe nhạc cho thư thái',
        'Đi du lịch, cắm lều trong rừng hoặc leo núi vào mỗi cuối tuần',
      ],
      answer: 0,
      dan: 'Find an interesting activity, join a club, meet new friends, and just have fun!',
    },
  ],

  'transport-driving-daily': [
    {
      q: 'Theo bài, một người lái xe tốt phải làm những gì?',
      options: [
        'Nhìn gương, cài dây an toàn và giữ chắc lấy vô lăng',
        'Mua vé, chờ ở điểm dừng rồi lên xe buýt hoặc tàu ngầm',
        'Đi bộ trên vỉa hè hoặc đạp xe trong làn dành cho xe đạp',
        'Tuân thủ giới hạn tốc độ và quan sát các đèn giao thông',
      ],
      answer: 0,
      dan: 'A good driver must check the mirror, put on their seat belt, and hold the steering wheel.',
    },
    {
      q: 'Nếu đèn đỏ, theo bài phải làm gì?',
      options: [
        'Đạp phanh và dừng lại trước vạch sang đường',
        'Nhìn gương rồi cài lại dây an toàn cho chắc',
        'Bấm còi để nhắc những xe phía trước biết',
        'Đi chậm lại rồi từ từ vượt qua vạch kẻ đường',
      ],
      answer: 0,
      dan: 'If the light is red, you must step on the brake and stop before the crosswalk so pedestrians can walk safely.',
    },
    {
      q: 'Theo bài, muốn đi một chặng rất xa thì có thể làm gì?',
      options: [
        'Bắt taxi ra sân bay rồi bay bằng một chiếc máy bay',
        'Đi bộ trên vỉa hè hoặc đạp xe trong làn dành cho xe đạp',
        'Mua vé rồi chờ ở điểm dừng để lên một chuyến xe buýt',
        'Lái xe trên phố đông hoặc trên một đường cao tốc lớn',
      ],
      answer: 0,
      dan: 'You can take a taxi to the airport and fly on an airplane.',
    },
    {
      q: 'Nếu bạn tới thăm, theo bài bạn có thể làm gì cho họ?',
      options: [
        'Lái xe ra ga đón họ, rồi sau đó chở họ ra lúc họ về',
        'Mua vé giúp họ rồi cùng chờ ở điểm dừng xe buýt',
        'Chở họ đi trên đường cao tốc lớn cho nhanh tới nơi',
        'Đi bộ cùng họ trên vỉa hè và băng qua ở vạch kẻ đường',
      ],
      answer: 0,
      dan: 'If your friend comes to visit, you can drive to the station to pick them up, and later drop them off when they leave.',
    },
  ],

  'entertainment-media-daily': [
    {
      q: 'Theo bài, ra nhà hát thì để xem gì?',
      options: [
        'Xem một vở kịch có các diễn viên nổi tiếng',
        'Xem một phim hành động hoặc một phim hài',
        'Xem một buổi hoà nhạc của ban nhạc mình thích',
        'Xem một phim tài liệu hoặc một bộ phim nhiều tập',
      ],
      answer: 0,
      dan: 'You can also go to a theater to see a play with famous actors, or attend a music concert to see your favorite pop star or rock band perform live.',
    },
    {
      q: 'Nếu thích ở nhà, theo bài bạn có thể làm gì?',
      options: [
        'Bật tivi xem phim tài liệu, phim hoạt hình hoặc phim nhiều tập',
        'Mua vé ra rạp xem một phim hành động hấp dẫn trên màn hình lớn',
        'Ra nhà hát xem một vở kịch có các diễn viên rất nổi tiếng',
        'Dự một buổi hoà nhạc để xem ban nhạc mình thích biểu diễn',
      ],
      answer: 0,
      dan: 'If you prefer to stay at home, you can turn on the television to watch a documentary, a cartoon, or binge-watch a new drama series on Netflix.',
    },
    {
      q: 'Trên mạng xã hội, theo bài người trẻ làm những gì?',
      options: [
        'Dùng máy ảnh chụp hình, tải lên rồi viết một dòng trạng thái',
        'Dùng một ứng dụng để phát nhạc, nghe podcast hoặc tải trò chơi',
        'Kết nối vào wifi rồi mở trình duyệt để tìm thông tin trên mạng',
        'Đọc tin tức trên một bài báo mạng rồi nhắn tin cho bạn bè',
      ],
      answer: 0,
      dan: 'They use the camera to take a photo, upload it, and write a post.',
    },
    {
      q: 'Bài nhắc nhớ điều gì ở câu cuối?',
      options: [
        'Nhớ sạc pin khi pin yếu, để không bị mất kết nối',
        'Nhớ mua vé trước khi ra rạp xem một phim hấp dẫn',
        'Nhớ bấm thích và để lại bình luận cho bạn của mình',
        'Nhớ kết nối vào wifi trước khi mở trình duyệt lên',
      ],
      answer: 0,
      dan: "Just remember to charge your battery when it gets low, so you don't lose your connection!",
    },
  ],

  'technology-internet-daily-p2': [
    {
      q: 'Theo bài, để dùng thiết bị thì việc đầu tiên là gì?',
      options: [
        'Bấm nút nguồn rồi đăng nhập tài khoản bằng mật khẩu an toàn',
        'Kết nối vào wifi hoặc vào một mạng nào đó ở gần chỗ ngồi',
        'Mở trình duyệt rồi dùng máy tìm kiếm như Google để tra cứu',
        'Gõ chữ trên bàn phím rồi dùng con chuột để bấm vào liên kết',
      ],
      answer: 0,
      dan: 'To use these machines, you first need to turn on the power button and log in to your account with a secure password.',
    },
    {
      q: 'Theo bài, tin tặc có thể làm gì với máy của bạn?',
      options: [
        'Có thể gửi một con vi-rút vào chiếc máy tính của bạn',
        'Có thể làm máy treo và hiện lên một thông báo lỗi lạ',
        'Có thể lấy mất tài liệu bạn đã lưu trong một thư mục',
        'Có thể tắt mất hệ điều hành mà bạn vừa cập nhật xong',
      ],
      answer: 0,
      dan: 'A hacker might try to send a virus to your PC.',
    },
    {
      q: 'Theo bài, để bảo vệ dữ liệu thì nên làm gì?',
      options: [
        'Cài phần mềm diệt vi-rút và cập nhật hệ điều hành đều đặn',
        'Khởi động lại máy mỗi khi thấy nó treo hoặc hiện thông báo lỗi',
        'Nhờ một lập trình viên hoặc một chuyên gia tới sửa lỗi giúp',
        'Cắm sạc mỗi khi pin yếu và lưu tài liệu vào một thư mục',
      ],
      answer: 0,
      dan: 'To protect your data and memory, you should install antivirus software and regularly update your operating system.',
    },
    {
      q: 'Nếu khởi động lại mà vẫn không được, theo bài phải làm gì?',
      options: [
        'Có thể cần một lập trình viên hoặc một chuyên gia tới sửa lỗi',
        'Có thể cần cài lại phần mềm diệt vi-rút và cập nhật hệ điều hành',
        'Có thể cần cắm sạc vào và chờ cho pin đầy lại rồi thử tiếp',
        'Có thể cần lưu tài liệu vào một thư mục khác cho an toàn hơn',
      ],
      answer: 0,
      dan: "If that doesn't work, you might need a developer or an expert to fix the bug.",
    },
  ],

  'education-learning-daily': [
    {
      q: 'Theo bài, khi còn nhỏ thì trẻ em học những gì ở trường mầm non?',
      options: [
        'Học cách chơi và cách chia sẻ với nhau',
        'Học toán, khoa học, lịch sử và địa lý',
        'Học cách đọc, viết và ghi vào vở của mình',
        'Học cách làm bài tập về nhà và nhớ từ mới',
      ],
      answer: 0,
      dan: 'When children are young, they go to preschool or kindergarten to learn how to play and share.',
    },
    {
      q: 'Theo bài, nếu học sinh viết sai thì dùng gì?',
      options: [
        'Dùng một cái gôm để xoá đi',
        'Dùng một cái bút mực để viết lại',
        'Dùng một cái bút dạ như của thầy cô',
        'Dùng ngay quyển sách để tra lại từ',
      ],
      answer: 0,
      dan: 'If they make a mistake, they use an eraser.',
    },
    {
      q: 'Bài nói gì về việc hỏi khi không hiểu?',
      options: [
        'Hỏi để được giúp thì không phải là chuyện ngốc nghếch',
        'Chỉ những học sinh giỏi mới nên giơ tay lên để hỏi bài',
        'Nên chờ tới lúc ra chơi rồi hỏi bạn cùng lớp cho tiện',
        'Nên tự nhớ lại từ mới rồi luyện thêm ở nhà cho chắc',
      ],
      answer: 0,
      dan: "If you don't understand, it is not stupid to ask for help!",
    },
    {
      q: 'Theo bài, nếu lười và không luyện tập thì hậu quả là gì?',
      options: [
        'Có thể trượt bài kiểm tra hoặc bài thi của mình',
        'Có thể bị điểm thấp nhưng vẫn qua được kỳ thi',
        'Có thể không được ra sân chơi cùng các bạn khác',
        'Có thể không được tốt nghiệp để lên đại học học tiếp',
      ],
      answer: 0,
      dan: "If you are lazy and don't practice, you might fail your test or exam.",
    },
  ],

  'jobs-careers-daily': [
    {
      q: 'Theo bài, ai sửa xe và ai sửa đường ống?',
      options: [
        'Thợ máy sửa xe, còn thợ nước thì sửa các đường ống',
        'Thợ nước sửa xe, còn thợ máy thì sửa các đường ống',
        'Kiến trúc sư sửa xe, còn nhà văn thì sửa đường ống',
        'Bác sĩ sửa xe, còn y tá thì lo việc sửa các đường ống',
      ],
      answer: 0,
      dan: 'If you like fixing things, you can work as a mechanic to repair cars, or as a plumber to fix pipes.',
    },
    {
      q: 'Theo bài, người sáng tạo có thể chọn những nghề nào?',
      options: [
        'Nhà văn, hoạ sĩ, hoặc kiến trúc sư thiết kế các toà nhà',
        'Bác sĩ hoặc y tá, những người giúp đỡ người đang bị bệnh',
        'Thợ máy sửa xe hoặc thợ nước sửa các đường ống nước',
        'Người quản lý ký hợp đồng và nhận người mới vào làm',
      ],
      answer: 0,
      dan: 'Creative people might choose to be a writer, an artist, or an architect who designs buildings.',
    },
    {
      q: 'Theo bài, một số việc toàn thời gian làm từ mấy giờ tới mấy giờ?',
      options: [
        'Từ 9 giờ sáng tới 5 giờ chiều',
        'Từ 8 giờ sáng tới 4 giờ chiều',
        'Từ 7 giờ sáng tới 3 giờ chiều',
        'Từ 10 giờ sáng tới 6 giờ chiều',
      ],
      answer: 0,
      dan: 'Some jobs are full-time, working from 9 AM to 5 PM, while others are part-time or involve working the night shift.',
    },
    {
      q: 'Theo bài, nếu chăm chỉ thì có thể được gì?',
      options: [
        'Có thể được một khoản thưởng hoặc được thăng chức',
        'Có thể được nhận vào làm và được trao một hợp đồng',
        'Có thể được thoả thuận mức lương hoặc lương theo giờ',
        'Có thể được làm cùng đồng nghiệp trong các dự án khác',
      ],
      answer: 0,
      dan: 'Work can sometimes be stressful, but if you are hard-working, you might get a bonus or a promotion.',
    },
  ],

  'clothes-fashion-daily-p2': [
    {
      q: 'Vào cuối tuần thoải mái, theo bài bạn có thể mặc gì?',
      options: [
        'Áo phông trơn, một chiếc quần jean bò và giày thể thao êm',
        'Một bộ đồ lịch sự với áo sơ mi trắng và một chiếc cà vạt',
        'Áo len ấm, áo khoác dày, khăn quàng cổ và một đôi găng',
        'Đồ cotton rộng, quần đùi và một đôi xăng đan cho mát mẻ',
      ],
      answer: 0,
      dan: 'If it is a casual weekend, you might put on a plain T-shirt, a pair of blue denim jeans, and some comfortable sneakers.',
    },
    {
      q: 'Vào mùa đông giá lạnh, theo bài ta mặc những gì?',
      options: [
        'Áo len ấm, áo khoác dày, khăn quàng cổ và một đôi găng tay',
        'Đồ cotton rộng, một chiếc quần đùi và một đôi xăng đan',
        'Áo phông trơn, quần jean bò và một đôi giày thể thao êm',
        'Một bộ đồ lịch sự cùng áo sơ mi trắng và một cà vạt đẹp',
      ],
      answer: 0,
      dan: 'In winter, when it is freezing, we wear a warm wool sweater, a heavy coat, a scarf around our neck, and gloves.',
    },
    {
      q: 'Theo bài, phụ nữ có thể thêm những món trang sức nào?',
      options: [
        'Một chiếc dây chuyền, một chiếc nhẫn vàng hoặc đôi bông tai',
        'Một chiếc đồng hồ, một chiếc thắt lưng hoặc một cặp kính râm',
        'Một chiếc áo blouse mặc cùng chân váy cho thật lịch sự',
        'Một đôi bốt da cùng khăn quàng cổ và một đôi găng tay',
      ],
      answer: 0,
      dan: 'Women might add jewelry like a necklace, a gold ring, or earrings.',
    },
    {
      q: 'Bài nhắc làm gì để giữ quần áo trông sạch và đẹp?',
      options: [
        'Giặt, là và gấp quần áo lại cho gọn gàng',
        'Mang vào phòng thử để kiểm lại đúng cỡ mình',
        'Chọn màu ăn với mình và hoạ tiết đúng phong cách',
        'Thêm phụ kiện như đồng hồ, thắt lưng hay kính râm',
      ],
      answer: 0,
      dan: "Finally, don't forget to wash, iron, and fold your clothes to keep them looking clean and beautiful!",
    },
  ],

  'shopping-money-daily': [
    {
      q: 'Ở siêu thị, người kể lấy những gì từ trên kệ?',
      options: [
        'Trái cây tươi, sữa và bánh mì lấy từ trên kệ hàng',
        'Một chiếc xe đẩy để đẩy dọc theo lối đi giữa các kệ',
        'Một chiếc túi giấy mà mình xin ở quầy tính tiền',
        'Một chiếc áo đẹp rồi mang vào phòng thử để mặc lên',
      ],
      answer: 0,
      dan: 'I pick up fresh fruit, milk, and bread from the shelf.',
    },
    {
      q: 'Vì sao có lúc người kể ra chợ hoặc hàng bánh?',
      options: [
        'Vì ở đó rẻ hơn so với siêu thị',
        'Vì ở đó có nhiều đợt giảm giá tốt hơn',
        'Vì ở đó có phòng thử để mặc thử đồ',
        'Vì ở đó nhận trả bằng thẻ tín dụng',
      ],
      answer: 0,
      dan: 'Sometimes I go to the local market or the bakery because it is cheaper.',
    },
    {
      q: 'Nếu trả bằng tiền mặt, theo bài người kể luôn làm gì?',
      options: [
        'Kiểm lại tiền thừa và cất tờ hoá đơn vào trong ví',
        'Xin một chiếc túi giấy để đựng hết những món vừa mua',
        'Đứng xếp hàng ở quầy tính tiền cho tới lượt của mình',
        'Tìm một đợt giảm giá để tiết kiệm được thêm ít tiền',
      ],
      answer: 0,
      dan: 'If I pay with cash, I always check my change and put the receipt in my wallet.',
    },
    {
      q: 'Nếu chiếc áo không vừa, theo bài người kể làm gì?',
      options: [
        'Mang trả lại sau để lấy tiền hoặc đổi sang màu khác',
        'Nhờ người bán tìm giúp một mức giá thấp hơn nữa',
        'Cất tờ hoá đơn vào ví rồi chờ tới đợt giảm giá sau',
        'Đứng xếp hàng ở quầy để hỏi lại về cỡ của chiếc áo',
      ],
      answer: 0,
      dan: "If it doesn't fit, I can return it later to get a refund or exchange it for a different color.",
    },
  ],

  'free-time-hobbies-daily': [
    {
      q: 'Theo bài, người có hứng thú mạnh với thể thao làm gì?',
      options: [
        'Vào một câu lạc bộ và chơi bóng đá, bóng rổ hay quần vợt',
        'Tới phòng tập để tập luyện, chạy trong công viên hoặc tập yoga',
        'Ở nhà đọc một quyển sách, một cuốn tiểu thuyết hoặc tạp chí',
        'Nghe những bài hát mình thích hoặc học chơi một loại nhạc cụ',
      ],
      answer: 0,
      dan: 'Some people have a strong interest in sports. They join a club and play football, basketball, or tennis.',
    },
    {
      q: 'Theo bài, những thú vui sáng tạo gồm những gì?',
      options: [
        'Vẽ, tô màu, chụp ảnh đẹp bằng máy ảnh, hoặc đan một chiếc áo len',
        'Đọc một quyển sách, một cuốn tiểu thuyết hoặc một tờ tạp chí',
        'Ra rạp xem một phim mới, hoặc ở nhà chơi điện tử và chơi cờ',
        'Cuối tuần đi làm vườn, hoặc gói lều đi cắm trại và leo núi',
      ],
      answer: 0,
      dan: 'Creative hobbies are also very popular. You can draw, paint, take beautiful photos with your camera, or even knit a warm sweater.',
    },
    {
      q: 'Người yêu thiên nhiên, theo bài, dành cuối tuần làm gì?',
      options: [
        'Đi làm vườn, hoặc gói lều đi cắm trại và leo núi',
        'Vào câu lạc bộ chơi bóng đá, bóng rổ hoặc quần vợt',
        'Ở nhà đọc sách, tiểu thuyết hoặc một tờ tạp chí hay',
        'Ra rạp xem phim mới hoặc chơi cờ cùng với gia đình',
      ],
      answer: 0,
      dan: 'Some people love nature, so they spend their weekends gardening, or they pack a tent and go camping and hiking in the mountains.',
    },
    {
      q: 'Bài kết lại bằng ý nào?',
      options: [
        'Dù sưu tầm tem, nấu ăn hay chỉ trò chuyện, có thú vui là đời vui',
        'Dù chơi thể thao hay tập yoga, quan trọng là giữ cho mình khoẻ',
        'Dù đọc sách hay nghe nhạc, quan trọng là được nghỉ ngơi yên tĩnh',
        'Dù đi cắm trại hay leo núi, quan trọng là được ở gần thiên nhiên',
      ],
      answer: 0,
      dan: 'Whether you collect stamps, cook delicious meals, or just hang out and chat with friends, having a hobby makes life fun and interesting!',
    },
  ],

  'city-life-daily': [
    {
      q: 'Theo bài, vì sao nhiều người thích phương tiện công cộng hơn?',
      options: [
        'Vì tàu điện ngầm rất tiện lợi cho việc đi lại',
        'Vì họ sống trong căn hộ ở ngoại ô và phải đi xa',
        'Vì đường phố buổi sáng nào cũng đông kín xe cộ',
        'Vì khu trung tâm có nhiều nhà cao tầng và quán ăn',
      ],
      answer: 0,
      dan: 'Others prefer public transport, so they wait at the bus stop or take the subway because it is very convenient.',
    },
    {
      q: 'Nếu là khách du lịch, theo bài bạn làm gì để không bị lạc?',
      options: [
        'Hỏi đường một người dân địa phương, hoặc xem một tấm bản đồ',
        'Đi thẳng trên vỉa hè rồi băng qua đường ở vạch kẻ sang đường',
        'Vào bảo tàng hoặc thư viện để hỏi người ở đó chỉ giúp mình',
        'Ra quảng trường lớn ở trung tâm, chỗ có vòi phun và pho tượng',
      ],
      answer: 0,
      dan: "If you are a tourist, you can ask a local person for directions, or look at a map so you don't get lost.",
    },
    {
      q: 'Theo bài, ở quảng trường trung tâm thường có gì?',
      options: [
        'Một vòi phun nước rất đẹp và một pho tượng',
        'Nhiều nhà cao tầng, các cửa hàng và quán ăn',
        'Một bảo tàng và một thư viện ở ngay bên cạnh',
        'Một công viên, một rạp phim và vài quán cà phê',
      ],
      answer: 0,
      dan: 'In the center, there is usually a large square with a beautiful fountain and a statue.',
    },
    {
      q: 'Bài nói gì về mặt xấu của việc sống ở thành phố?',
      options: [
        'Có thể đắt đỏ và có lúc bẩn vì tình trạng ô nhiễm',
        'Có thể ồn ào vì đường phố buổi sáng nào cũng đông xe',
        'Có thể bị lạc nếu không hỏi đường hoặc không xem bản đồ',
        'Có thể tắc đường nếu lái xe riêng thay vì đi tàu ngầm',
      ],
      answer: 0,
      dan: 'Living in the city can be expensive and sometimes dirty because of pollution, but there is always something fun to do and see near your neighborhood.',
    },
  ],

  'countryside-nature-daily': [
    {
      q: 'Theo bài, trên những cánh đồng rộng có những con gì?',
      options: [
        'Bò, cừu và ngựa đang ăn cỏ ở trên đồng',
        'Lợn và gà, những con mà người nông dân cho ăn',
        'Chim hoang bay trên trời và sâu bọ bò trong đất',
        'Cá trong hồ và trong sông, nơi người ta câu cá',
      ],
      answer: 0,
      dan: 'You can see wide fields where cows, sheep, and horses eat grass.',
    },
    {
      q: 'Theo bài, người nông dân làm những việc gì?',
      options: [
        'Trồng cây, trồng rau và cho lợn cùng gà ăn',
        'Đi theo lối nhỏ vào rừng để ngắm cây và hoa',
        'Leo lên đồi hoặc núi để ngắm được cảnh rộng',
        'Ra hồ hoặc ra sông để câu cá trên thuyền nhỏ',
      ],
      answer: 0,
      dan: 'A hardworking farmer will grow plants, vegetables, and feed the pigs and chickens.',
    },
    {
      q: 'Theo bài, người thích nước thì đi đâu và làm gì?',
      options: [
        'Ra hồ hoặc ra sông để câu cá trên một chiếc thuyền nhỏ',
        'Leo lên một quả đồi hoặc một ngọn núi để ngắm cảnh rộng',
        'Đi theo một lối nhỏ vào rừng để ngắm cây cao và hoa đẹp',
        'Ra bờ biển để nghỉ trên bãi cát và tắm ở trong biển xanh',
      ],
      answer: 0,
      dan: 'Others prefer the water, so they go to a lake or a river to fish in a small boat.',
    },
    {
      q: 'Theo bài, ngồi quanh đống lửa trong lều khi cắm trại là cách để làm gì?',
      options: [
        'Để hưởng không khí trong lành và sự yên bình của tự nhiên',
        'Để ngắm mặt trăng và những ngôi sao khi trời đã tối hẳn',
        'Để nghỉ trên bãi cát và tắm ở trong biển vào mùa hè nóng',
        'Để ngắm được cảnh rộng từ trên một quả đồi hay ngọn núi',
      ],
      answer: 0,
      dan: 'Sitting around a fire in a tent while camping is a great way to enjoy the fresh air and the peace of the natural environment.',
    },
  ],

  'feelings-emotions-daily': [
    {
      q: 'Theo bài, điều gì có thể đưa bạn vào một tâm trạng tốt?',
      options: [
        'Một tách cà phê ngon',
        'Một buổi sáng có nắng đẹp',
        'Một bất ngờ từ người bạn',
        'Một cái ôm từ người thân',
      ],
      answer: 0,
      dan: 'A good cup of coffee can put you in a great mood.',
    },
    {
      q: 'Theo bài, khi mắc lỗi thì có thể xảy ra chuyện gì?',
      options: [
        'Đỏ mặt vì ngượng, rồi sau đó xin lỗi hoặc thấy tội lỗi',
        'Thấy tức tối, bực bội hoặc thất vọng vì việc không như ý',
        'Thấy căng thẳng và bồn chồn giống như trước một bài thi',
        'Thấy vui mừng và phấn khởi vì có một bất ngờ tuyệt vời',
      ],
      answer: 0,
      dan: 'When you make a mistake, you might blush and feel embarrassed, and later apologize or feel guilty.',
    },
    {
      q: 'Theo bài, ta thể hiện cảm xúc bằng những cách nào?',
      options: [
        'Cười khi vui, nhíu mặt khi bối rối, khóc hay thở dài khi buồn',
        'Ôm hoặc thơm người thân để cho thấy tình yêu và sự quan tâm',
        'Chia sẻ thật lòng những cảm xúc đó với người mà mình tin',
        'Đỏ mặt vì ngượng rồi xin lỗi và thấy tội lỗi trong lòng',
      ],
      answer: 0,
      dan: 'We smile and laugh when we are glad, we frown when we are confused, and we cry or sigh when we feel sadness.',
    },
    {
      q: 'Bài kết lại bằng ý nào?',
      options: [
        'Hiểu và tôn trọng cảm xúc, chia sẻ thật lòng với người mình tin',
        'Giữ bình tĩnh khi tức giận và hít vào một hơi cho thật sâu',
        'Ôm hoặc thơm người thân để thể hiện tình yêu và quan tâm',
        'Nhớ rằng một tách cà phê ngon có thể làm tâm trạng tốt lên',
      ],
      answer: 0,
      dan: 'No matter if you feel proud, nervous, tired, or cheerful, it is important to understand and respect your feelings, and to share them honestly with the people you trust.',
    },
  ],

  'technology-daily-life': [
    {
      q: 'Buổi sáng, theo bài bạn làm gì với chiếc điện thoại?',
      options: [
        'Bật máy, mở khoá màn hình và xem các thông báo mới',
        'Đăng nhập mạng xã hội để đọc bài và xem những bức ảnh',
        'Gửi một tin nhắn hoặc gọi một cuộc gọi có hình cho nhà',
        'Cắm sạc vào máy vì pin đã yếu sau một đêm dài không sạc',
      ],
      answer: 0,
      dan: 'In the morning, you turn on your phone, unlock the screen, and check your notifications.',
    },
    {
      q: 'Nếu máy tính bị treo hoặc sập, theo bài nên làm gì?',
      options: [
        'Khởi động lại máy và chạy phần mềm diệt vi-rút của mình',
        'Cắm sạc vào máy rồi chờ cho tới khi pin được nạp đầy',
        'Tải một tệp về hoặc gửi kèm tài liệu vào một lá thư điện tử',
        'Mở trình duyệt lên rồi tìm thông tin để tự sửa lấy lỗi đó',
      ],
      answer: 0,
      dan: 'If your computer freezes or crashes, you might have a virus, so you should restart the machine and run your antivirus software.',
    },
    {
      q: 'Trong thời gian rảnh, theo bài người ta thích làm gì?',
      options: [
        'Đeo tai nghe nghe podcast, xem vlog hoặc chơi trên máy tính bảng',
        'Kết nối wifi rồi mở trình duyệt để tìm kiếm những thông tin cần',
        'Gõ tài liệu trên bàn phím và dùng con chuột để bấm vào liên kết',
        'Đăng nhập mạng xã hội để đọc bài, xem ảnh và để lại bình luận',
      ],
      answer: 0,
      dan: 'In our free time, we like to put on our headphones to listen to a podcast, watch a vlog on a YouTube channel, or play games on a tablet.',
    },
    {
      q: 'Bài kết lại bằng lời nhắc nào?',
      options: [
        'Không nên dành quá nhiều thời gian để nhìn vào màn hình',
        'Không nên quên cắm sạc vào máy mỗi khi thấy pin đã yếu',
        'Không nên bỏ qua việc chạy phần mềm diệt vi-rút định kỳ',
        'Không nên quên kết nối wifi trước khi mở trình duyệt lên',
      ],
      answer: 0,
      dan: "Electronic devices make our life very convenient, but we shouldn't spend too much time looking at a screen.",
    },
  ],

  'family-relationships-daily-p2': [
    {
      q: 'Theo bài, nếu người cô của bạn sinh em bé thì bạn có thêm ai?',
      options: [
        'Có thêm một cháu trai hoặc một cháu gái',
        'Có thêm một người em họ trong đại gia đình',
        'Có thêm một cặp sinh đôi trong nhà của mình',
        'Có thêm một người bạn thân từ nhỏ tới lớn',
      ],
      answer: 0,
      dan: 'If your aunt has a new baby, you will have a new nephew or niece.',
    },
    {
      q: 'Theo bài, một tình bạn thật sự cần những gì?',
      options: [
        'Cần tin tưởng, ủng hộ và giúp đỡ nhau giữa hai người',
        'Cần gặp nhau từ một người xa lạ rồi thành người quen',
        'Cần đi hẹn hò, yêu nhau rồi tiến tới việc kết hôn',
        'Cần lịch sự, thật thà và tử tế với tất cả mọi người',
      ],
      answer: 0,
      dan: 'A true friendship requires you to trust, support, and help each other.',
    },
    {
      q: 'Nếu bạn bè có tranh cãi, theo bài nên làm gì?',
      options: [
        'Nên nhanh chóng xin lỗi và tha thứ cho nhau',
        'Nên tin tưởng, ủng hộ và giúp đỡ nhau nhiều hơn',
        'Nên nhờ họ hàng hoặc bạn thân nhất đứng ra giúp',
        'Nên lịch sự và tử tế với những người láng giềng',
      ],
      answer: 0,
      dan: 'Sometimes friends argue or fight, but they should quickly apologize and forgive.',
    },
    {
      q: 'Bài nói ta phải làm gì với cha mẹ và với người láng giềng?',
      options: [
        'Luôn tôn trọng cha mẹ và thân thiện với người láng giềng',
        'Luôn tin tưởng cha mẹ và giúp đỡ những người láng giềng',
        'Luôn xin lỗi cha mẹ và tha thứ cho người láng giềng',
        'Luôn lịch sự với cha mẹ và thật thà với người láng giềng',
      ],
      answer: 0,
      dan: 'We must always respect our parents and be friendly to our neighbors.',
    },
  ],

  'food-dining-daily': [
    {
      q: 'Theo bài, người ăn chay thì không ăn gì?',
      options: [
        'Không ăn thịt và cũng không ăn cá',
        'Không ăn thịt bò nhưng vẫn ăn thịt lợn',
        'Không ăn rau tươi và cũng không ăn trái cây',
        'Không ăn cơm và cũng không ăn mì sợi',
      ],
      answer: 0,
      dan: 'Vegetarians do not eat meat or fish at all.',
    },
    {
      q: 'Trong nhà bếp, theo bài người nấu làm những gì?',
      options: [
        'Trộn nguyên liệu, băm hành tỏi, đun nước hoặc rán trứng',
        'Mang thực đơn tới cho khách rồi ghi lại món khách gọi',
        'Dùng nĩa, thìa hoặc đôi đũa để ăn hết bữa của mình',
        'Để lại một khoản tiền tip khi trả tờ hoá đơn tính tiền',
      ],
      answer: 0,
      dan: 'They mix the ingredients, chop the onions and garlic, and boil water in a pot or fry an egg in a pan.',
    },
    {
      q: 'Ở nhà hàng, theo bài bạn gọi món theo trình tự nào?',
      options: [
        'Món khai vị trước, rồi món chính là cơm hay mì, cuối là tráng miệng',
        'Món chính trước, rồi món khai vị, và cuối cùng mới là tráng miệng',
        'Món tráng miệng trước, rồi món khai vị và cuối cùng là món chính',
        'Chỉ gọi một món chính là cơm hoặc mì, không gọi thêm món nào',
      ],
      answer: 0,
      dan: 'You order your food, perhaps starting with an appetizer, followed by a main course of rice or noodles, and finishing with a delicious dessert.',
    },
    {
      q: 'Theo bài, khi nào nên để lại một khoản tiền tip?',
      options: [
        'Khi phục vụ tốt và món ăn ngon miệng',
        'Khi mình gọi đủ cả ba món từ đầu tới cuối',
        'Khi mình mang đồ về thay vì ăn tại nhà hàng',
        'Khi người phục vụ mang thực đơn tới cho mình',
      ],
      answer: 0,
      dan: 'If the service is good and the food is tasty, you should leave a tip when you pay the bill.',
    },
  ],

  'education-school-daily-p2': [
    {
      q: 'Theo bài, môn toán và môn khoa học dạy những gì?',
      options: [
        'Toán giúp giải các bài về số, còn khoa học dạy về tự nhiên',
        'Khoa học giúp giải các bài về số, còn toán thì dạy về tự nhiên',
        'Địa lý cho xem bản đồ thế giới, còn lịch sử kể về quá khứ',
        'Cả hai đều dạy cách đọc sách và cách luyện nói cho tốt',
      ],
      answer: 0,
      dan: 'Mathematics helps you solve number problems, while science teaches you about nature.',
    },
    {
      q: 'Theo bài, môn địa lý và môn lịch sử cho ta biết gì?',
      options: [
        'Địa lý cho xem bản đồ thế giới, còn lịch sử kể về quá khứ',
        'Lịch sử cho xem bản đồ thế giới, còn địa lý kể về quá khứ',
        'Toán giúp giải các bài về số, còn khoa học dạy về tự nhiên',
        'Cả hai đều dạy cách vẽ trong giờ mỹ thuật và hát nhạc',
      ],
      answer: 0,
      dan: 'Geography shows you the world map, and history tells you about the past.',
    },
    {
      q: 'Trong giờ ngoại ngữ, theo bài học sinh làm những gì?',
      options: [
        'Đọc một quyển sách, luyện cách nói, hoặc tra từ mới trong từ điển',
        'Vẽ trong giờ mỹ thuật hoặc hát ở trong giờ học môn âm nhạc',
        'Ngồi ở bàn, lắng nghe kỹ và ghi vào vở bằng bút mực hoặc chì',
        'Làm bài tập được thầy cô giao về nhà sau khi hết giờ trên lớp',
      ],
      answer: 0,
      dan: 'During a language class, you might read a book, practice how to speak, or look up new words in a dictionary.',
    },
    {
      q: 'Ở đại học, theo bài sinh viên làm gì?',
      options: [
        'Học thật chăm để lấy được một tấm bằng và tốt nghiệp',
        'Làm bài tập được giao và luyện tập ở nhà cho thật chắc',
        'Vượt qua bài thi cuối năm với một điểm số thật cao',
        'Ngồi ở bàn, nghe kỹ rồi ghi lại vào vở của mình',
      ],
      answer: 0,
      dan: 'There, they work hard to earn a degree and graduate.',
    },
  ],

  'work-jobs-daily': [
    {
      q: 'Theo bài, hai việc đầu tiên khi tìm việc là gì?',
      options: [
        'Viết một bản lý lịch tốt và điền vào một tờ đơn ứng tuyển',
        'Dự buổi phỏng vấn mà công ty đó mời mình tới tham gia',
        'Nhận việc rồi trở thành một người làm thuê ở công ty đó',
        'Làm cùng đồng nghiệp trong một văn phòng có bàn riêng',
      ],
      answer: 0,
      dan: 'To find work, you must first write a good resume and fill out an application.',
    },
    {
      q: 'Theo bài, ai thiết kế các toà nhà và ai sửa xe?',
      options: [
        'Kỹ sư thiết kế các toà nhà, còn thợ máy thì sửa xe',
        'Thợ máy thiết kế các toà nhà, còn kỹ sư thì sửa xe',
        'Bác sĩ thiết kế các toà nhà, còn y tá thì lo sửa xe',
        'Giáo viên thiết kế các toà nhà, còn kỹ sư thì sửa xe',
      ],
      answer: 0,
      dan: 'An engineer might design buildings, and a mechanic fixes cars.',
    },
    {
      q: 'Theo bài, người quản lý giao cho bạn những gì?',
      options: [
        'Các nhiệm vụ và một thời hạn để làm xong dự án',
        'Một mức lương hằng tháng để trang trải cuộc sống',
        'Một chiếc bàn riêng và những người đồng nghiệp',
        'Một buổi phỏng vấn để xem bạn có phù hợp không',
      ],
      answer: 0,
      dan: 'Your boss or manager will give you tasks and a deadline to complete a project.',
    },
    {
      q: 'Theo bài, khi nào người ta có thể bị cho thôi việc?',
      options: [
        'Khi họ lười hoặc mắc những lỗi rất lớn trong công việc',
        'Khi họ tìm được một cơ hội tốt hơn ở một nơi làm khác',
        'Khi họ đã làm việc chăm chỉ suốt rất nhiều năm liền',
        'Khi họ chưa hoàn thành dự án đúng với thời hạn đã giao',
      ],
      answer: 0,
      dan: 'Sometimes, if someone is lazy or makes big mistakes, they might be fired.',
    },
  ],

  'health-medicine-daily': [
    {
      q: 'Theo bài, cảm hoặc cúm gây ra những gì?',
      options: [
        'Gây sốt, ho nặng và một cơn đau họng khó chịu',
        'Gây đau bụng, do ăn quá nhiều đồ ăn không lành mạnh',
        'Gây đau đầu dữ dội hoặc một cơn đau răng khó chịu',
        'Gây một vết thương cần y tá dọn sạch rồi băng lại',
      ],
      answer: 0,
      dan: 'Sometimes you might catch a cold or the flu, which gives you a fever, a bad cough, and a sore throat.',
    },
    {
      q: 'Theo bài, ăn quá nhiều đồ không lành mạnh sẽ bị gì?',
      options: [
        'Sẽ bị đau bụng',
        'Sẽ bị sốt và ho nặng',
        'Sẽ bị đau răng khó chịu',
        'Sẽ cần một ca mổ ở viện',
      ],
      answer: 0,
      dan: 'If you eat too much unhealthy food, you might get a stomachache.',
    },
    {
      q: 'Ở bệnh viện, theo bài y tá và bác sĩ mổ làm gì?',
      options: [
        'Y tá dọn vết thương và băng lại, bác sĩ mổ thì làm ca mổ',
        'Bác sĩ mổ dọn vết thương và băng lại, y tá thì làm ca mổ',
        'Cả hai cùng khám rồi cùng viết cho bạn một đơn thuốc',
        'Cả hai cùng đưa người bệnh tới viện bằng xe cứu thương',
      ],
      answer: 0,
      dan: 'There, a nurse can clean a wound and put on a bandage, or a skilled surgeon can perform an operation.',
    },
    {
      q: 'Theo bài, để khoẻ và tránh bệnh nặng thì nên làm gì?',
      options: [
        'Ăn cân bằng, tập luyện và chăm sóc cơ thể để nó lành nhanh',
        'Tới phòng khám gặp bác sĩ hoặc nha sĩ mỗi khi thấy đau',
        'Ra nhà thuốc mua viên thuốc để giúp mình hồi phục lại',
        'Gọi xe cứu thương ngay khi có một tình huống cấp cứu',
      ],
      answer: 0,
      dan: 'To stay healthy and avoid serious disease, we should eat a balanced diet, exercise, and take care of our bodies so they can heal quickly.',
    },
  ],

  'technology-gadgets-daily-p2': [
    {
      q: 'Theo bài, khi tới chỗ làm thì việc đầu tiên là gì?',
      options: [
        'Bật máy tính hoặc máy tính xách tay của mình lên',
        'Nhìn màn hình, đặt tay lên bàn phím rồi bấm chuột',
        'Gõ mật khẩu để mở một tệp mình đang cần dùng',
        'Dùng máy in để in ra một bản giấy cho công việc',
      ],
      answer: 0,
      dan: 'When you arrive at work, the first thing you do is turn on your computer or laptop.',
    },
    {
      q: 'Vì sao theo bài phải lưu tài liệu thường xuyên?',
      options: [
        'Để không mất nó nếu máy sập hoặc hiện một thông báo lỗi',
        'Để không phải gõ lại mật khẩu mỗi lần mở tệp đó ra',
        'Để có thể in ra một bản giấy bằng máy in ở chỗ làm',
        'Để tiết kiệm điện khi mình đã dùng xong chiếc máy đó',
      ],
      answer: 0,
      dan: 'It is important to save your document often so you do not lose it if the system crashes or shows an error.',
    },
    {
      q: 'Khi pin yếu, theo bài phải làm gì?',
      options: [
        'Tìm bộ sạc, cắm vào và nạp điện cho chiếc điện thoại',
        'Dùng tai nghe không dây để nghe nhạc cho đỡ tốn pin',
        'Tắt máy rồi rút phích ra để tiết kiệm điện cho nhà',
        'Dùng máy ảnh chụp ảnh rồi tải một ứng dụng hữu ích',
      ],
      answer: 0,
      dan: 'However, when the battery is low, we must find a charger, plug it in, and charge the phone.',
    },
    {
      q: 'Theo bài, nên làm gì với đồ điện khi đã dùng xong?',
      options: [
        'Tắt đi và rút phích ra để tiết kiệm điện',
        'Lưu tài liệu lại rồi để máy chạy tiếp',
        'Cắm sạc vào để lần sau dùng là có pin đầy',
        'Cất tai nghe không dây vào chỗ an toàn',
      ],
      answer: 0,
      dan: 'Always remember to turn off and unplug electronic gadgets when you are finished to save power.',
    },
  ],

  'communication-internet-daily': [
    {
      q: 'Theo bài, để bắt đầu thì bạn làm gì?',
      options: [
        'Mở trình duyệt trên điện thoại hay máy tính rồi tìm một trang web',
        'Đăng nhập bằng mật khẩu để tải một bức ảnh lên và viết bài đăng',
        'Gửi một lá thư điện tử cho công việc kèm theo một tài liệu',
        'Nhắn tin cho một người bạn hoặc gọi một cuộc gọi có hình',
      ],
      answer: 0,
      dan: 'To get started, you open a browser on your phone or computer and search for a website.',
    },
    {
      q: 'Với thư điện tử cho công việc, theo bài bạn làm được gì?',
      options: [
        'Gửi kèm một tài liệu, và người nhận sẽ trả lời hoặc chuyển tiếp',
        'Tải một bức ảnh lên, viết một bài đăng rồi đọc bình luận',
        'Bấm thích một bài của người khác hoặc chia sẻ nó cho bạn bè',
        'Gọi một cuộc gọi có hình để thấy mặt người kia trên màn hình',
      ],
      answer: 0,
      dan: 'You can attach a document to your message, and when the other person gets the attachment, they will reply or forward it.',
    },
    {
      q: 'Theo bài, tin tặc có thể làm gì?',
      options: [
        'Gửi một con vi-rút qua thư rác tới máy của bạn',
        'Chặn hoặc tắt tiếng bạn trên các trang mạng xã hội',
        'Đọc bình luận của người theo dõi trên bài bạn đăng',
        'Chuyển tiếp lá thư điện tử của bạn cho người khác',
      ],
      answer: 0,
      dan: 'A hacker can send a virus through spam, so we must ensure our connection is secure.',
    },
    {
      q: 'Nếu có ai làm bạn khó chịu trên mạng, theo bài bạn làm gì?',
      options: [
        'Có thể chặn hoặc tắt tiếng người đó đi',
        'Có thể trả lời hoặc chuyển tiếp cho người khác',
        'Có thể bấm thích rồi chia sẻ lại bài của họ',
        'Có thể đăng nhập lại bằng một mật khẩu mới',
      ],
      answer: 0,
      dan: 'If someone bothers you online, you can simply block or mute them.',
    },
  ],

  'crime-law-daily': [
    {
      q: 'Theo bài, cảnh sát hoặc điều tra viên làm những gì?',
      options: [
        'Tìm bằng chứng và nói chuyện với người đã trông thấy vụ việc',
        'Bắt giữ nghi phạm rồi giao người đó cho toà để mở phiên xử',
        'Nghe các bằng chứng cùng với một quan toà và một luật sư',
        'Ra một mức phạt nặng hoặc đưa người đó vào trong tù giam',
      ],
      answer: 0,
      dan: 'A brave police officer or detective will look for evidence and talk to a witness who saw the attack.',
    },
    {
      q: 'Ở phiên toà, theo bài ai nghe các bằng chứng?',
      options: [
        'Một quan toà và một luật sư nghe các bằng chứng',
        'Một cảnh sát và một điều tra viên nghe bằng chứng',
        'Một người chứng kiến và một bảo vệ nghe bằng chứng',
        'Một nghi phạm và một tù nhân nghe các bằng chứng',
      ],
      answer: 0,
      dan: 'There, a judge and a lawyer will listen to the proof.',
    },
    {
      q: 'Nếu bị kết là có tội, theo bài người đó nhận gì?',
      options: [
        'Phải trả một mức phạt nặng, hoặc bị đưa vào tù làm tù nhân',
        'Được tuyên là vô tội và được cho phép đi ra khỏi phiên toà',
        'Bị cảnh sát và điều tra viên tiếp tục tìm thêm bằng chứng',
        'Bị người chứng kiến kể lại toàn bộ vụ việc ở trước toà',
      ],
      answer: 0,
      dan: 'They might have to pay a heavy fine or be sent to a prison or jail as a prisoner.',
    },
    {
      q: 'Theo bài, ta góp phần làm cộng đồng an toàn hơn bằng cách nào?',
      options: [
        'Tuân theo luật, tôn trọng người bảo vệ và nhớ khoá cửa ban đêm',
        'Tìm bằng chứng và nói chuyện với những người đã trông thấy',
        'Bắt giữ nghi phạm rồi đưa họ ra trước một phiên toà xét xử',
        'Ra mức phạt nặng cho những ai đã bị kết luận là có tội',
      ],
      answer: 0,
      dan: 'By following the law, respecting the security guard, and remembering to lock our doors at night, we help make our community less dangerous and more secure for every potential victim.',
    },
  ],

  'emergency-safety-daily': [
    {
      q: 'Theo bài, nếu trượt chân và ngã xuống cầu thang thì có thể bị gì?',
      options: [
        'Có thể gãy chân, hoặc bị một vết cắt sâu bắt đầu chảy máu',
        'Có thể bị mắc kẹt trong xe sau khi hai xe đâm vào nhau',
        'Có thể bị bỏng da hoặc ngạt vì khói khiến khó thở được',
        'Có thể phải đội mũ bảo hiểm khi đi xe máy cho an toàn',
      ],
      answer: 0,
      dan: 'For example, if you slip and fall down the stairs, you might break your leg or suffer a deep cut that starts to bleed.',
    },
    {
      q: 'Nếu có cháy trong toà nhà, theo bài điều gì xảy ra?',
      options: [
        'Khói sẽ làm chuông báo cháy kêu lên, và bạn phải thoát nhanh',
        'Xe cứu thương sẽ tới chở người bị thương vào bệnh viện',
        'Một hành khách bị thương có thể bị mắc kẹt ở bên trong',
        'Bác sĩ hoặc y tá sẽ cho bạn thuốc, viên thuốc hoặc băng',
      ],
      answer: 0,
      dan: 'If there is a fire in a building, the smoke will trigger the fire alarm.',
    },
    {
      q: 'Theo bài, người lính cứu hoả tới để làm gì?',
      options: [
        'Để dập lửa, cứu người đang gặp nguy và giữ lại tính mạng',
        'Để chở người bị thương vào bệnh viện bằng xe cứu thương',
        'Để cho người bị thương thuốc, viên thuốc hoặc một cái băng',
        'Để nhắc mọi người đội mũ bảo hiểm khi đi trên xe máy',
      ],
      answer: 0,
      dan: 'A brave firefighter will arrive to fight the flames, rescue anyone in danger, and save lives.',
    },
    {
      q: 'Bài kết lại bằng ý nào?',
      options: [
        'Cẩn thận và biết gọi ai có thể là khác biệt giữa sống và chết',
        'Nghe mọi lời cảnh báo và hành động một cách thật thận trọng',
        'Luôn đội mũ bảo hiểm khi đi xe máy và phòng rủi ro trước',
        'Gọi xe cứu thương để bác sĩ ở bệnh viện có thể cho thuốc',
      ],
      answer: 0,
      dan: 'Being careful and knowing who to call, like the police or the rescue team, can mean the difference between life and death.',
    },
  ],

  'environment-ecology-daily': [
    {
      q: 'Theo bài, vì sao khói bẩn làm ô nhiễm không khí và nước?',
      options: [
        'Vì con người đốt quá nhiều than, dầu và khí đốt',
        'Vì con người chặt cây để lấy chỗ mà xây nhà ở',
        'Vì con người vứt rác bừa bãi ra ngoài môi trường',
        'Vì con người dùng quá nhiều điện và nhiều năng lượng',
      ],
      answer: 0,
      dan: 'Because people burn too much coal, oil, and gas, the dirty smoke pollutes the air and water.',
    },
    {
      q: 'Theo bài, chặt cây để xây nhà gây hậu quả gì?',
      options: [
        'Phá mất nơi sống tự nhiên của rất nhiều loài hoang dã',
        'Làm khí hậu nóng lên và khiến những tảng băng tan chảy',
        'Làm không khí và nước bị ô nhiễm bởi khói bụi bẩn',
        'Làm rác thải nhựa tăng lên và khó thu gom để tái chế',
      ],
      answer: 0,
      dan: 'When we cut down a tree to build houses, we destroy the natural habitat of many wild animals.',
    },
    {
      q: 'Theo bài, thay vì bỏ rác đi thì ta nên làm gì?',
      options: [
        'Không xả rác, tái chế chai nhựa và dùng lại túi để giảm rác',
        'Tiết kiệm điện bằng cách dùng năng lượng mặt trời và gió',
        'Trồng thêm nhiều cây hơn và làm sạch những dòng sông',
        'Ngừng đốt than, dầu và khí đốt để không thải khói bẩn',
      ],
      answer: 0,
      dan: 'We must recycle plastic bottles and reuse bags to reduce waste.',
    },
    {
      q: 'Theo bài, ta tiết kiệm điện và năng lượng bằng cách nào?',
      options: [
        'Dùng năng lượng sạch và xanh như điện mặt trời và điện gió',
        'Trồng thêm cây và làm sạch những dòng sông đang bị bẩn',
        'Không xả rác, tái chế chai nhựa và dùng lại các loại túi',
        'Ngừng chặt cây để không phá mất nơi sống của loài hoang',
      ],
      answer: 0,
      dan: 'We can also save energy and electricity by using clean, green power like solar and wind energy.',
    },
  ],

  'beliefs-values-daily': [
    {
      q: 'Theo bài, một số người tìm thấy hy vọng và sức mạnh ở đâu?',
      options: [
        'Ở tôn giáo của họ, nơi họ tới nhà thờ hoặc đền để cầu nguyện',
        'Ở việc làm một người tốt và trung thực với mọi người quanh mình',
        'Ở lòng biết ơn với tình yêu và những người đã ủng hộ họ',
        'Ở sự kiên nhẫn, giữ đúng lời hứa và không hề lười nhác',
      ],
      answer: 0,
      dan: 'Some people find hope and strength in their religion.',
    },
    {
      q: 'Theo bài, trung thực nghĩa là gì?',
      options: [
        'Nghĩa là nói ra sự thật và không bao giờ nói dối',
        'Nghĩa là công bằng, tử tế và rộng lòng với mọi người',
        'Nghĩa là biết tôn trọng và lịch sự với tất cả mọi người',
        'Nghĩa là có can đảm để xin lỗi khi mình đã mắc lỗi',
      ],
      answer: 0,
      dan: 'Honesty means you tell the truth and never tell a lie.',
    },
    {
      q: 'Theo bài, khi mắc một lỗi ngớ ngẩn thì người can đảm làm gì?',
      options: [
        'Có can đảm để xin lỗi và nói ra câu "tôi xin lỗi"',
        'Giữ được sự công bằng, tử tế và rộng lòng như trước',
        'Tha thứ cho người đã làm mình đau thay vì giữ nỗi sợ',
        'Biết ơn tình yêu mình nhận và cảm ơn người ủng hộ',
      ],
      answer: 0,
      dan: "When that happens, a brave person will have the courage to apologize and say 'I am sorry'.",
    },
    {
      q: 'Nếu có ai làm bạn đau, theo bài điều gì tốt hơn?',
      options: [
        'Tha thứ cho họ thì tốt hơn là giữ lấy nỗi sợ và cơn giận',
        'Nói ra sự thật với họ thì tốt hơn là im lặng và nói dối',
        'Tôn trọng và lịch sự với họ thì tốt hơn là tỏ ra thô lỗ',
        'Xin lỗi họ trước thì tốt hơn là chờ họ xin lỗi mình',
      ],
      answer: 0,
      dan: 'If someone hurts you, it is better to forgive them than to hold onto fear and anger.',
    },
  ],

  // ══ ĐỢT 19/08 — 5 CHẶNG A2 SOẠN ĐƯỢC / 28 CHẶNG ĐÃ ĐỌC ═══════════════════
  // Lý do xếp loại từng chặng: `scripts/data/a1a2_phan_loai.mjs`. 23 chặng còn
  // lại là bài văn viết ra để phủ danh sách từ vựng, KHÔNG soạn — băng cảnh báo
  // cam của chúng vẫn bật, chứ không tắt bằng bốn câu hỏi kiến thức chung.
  //
  // Bốn câu của mỗi chặng neo vào BỐN CÂU KHÁC NHAU trong bài, và câu nhiễu là
  // HOÁN VỊ chi tiết có thật trong chính bài đó (đổi trái thành phải, đổi việc
  // của chị sang việc của anh, đổi thứ tự hạn–lụt). Nhiễu kiểu đó buộc phải đọc
  // đúng câu chứa thông tin, và dài tương đương đáp án nên không đoán theo độ dài.
  'weather-seasons': [
    {
      q: 'Người kể thích mùa nào nhất, và tả mùa đó thế nào?',
      options: [
        'Mùa thu, với những buổi sáng lành lạnh và nắng đẹp',
        'Mùa xuân, với nhiệt độ dịu nhẹ và những cơn gió hiu hiu',
        'Mùa hè, dù trời có thể nóng như thiêu và rất ẩm ướt',
        'Mùa đông, khi có sương giá và đôi lúc cả bão tuyết nữa',
      ],
      answer: 0,
      dan: 'Autumn is my favorite – chilly mornings with beautiful sunshine.',
    },
    {
      q: 'Năm ngoái thành phố của người kể trải qua hai chuyện gì, theo thứ tự nào?',
      options: [
        'Một đợt hạn nặng, rồi sau đó là lụt',
        'Một trận lụt, rồi sau đó là đợt hạn nặng',
        'Một cơn dông có sét, rồi sau đó là lụt',
        'Nhiều ngày trời u, rồi sau đó là hạn nặng',
      ],
      answer: 0,
      dan: 'Last year, our city experienced a terrible drought followed by a flood.',
    },
    {
      q: 'Trong cơn dông, sét đánh vào đâu?',
      options: [
        'Một cái cây gần nhà người kể',
        'Chính mái nhà của người kể',
        'Một cái cây trong công viên thành phố',
        'Cột điện ở đầu con phố nhà người kể',
      ],
      answer: 0,
      dan: 'During a thunderstorm, lightning struck a tree near our house.',
    },
    {
      q: 'Sau nhiều ngày trời u và sáng nào cũng sương mù, chuyện gì xảy ra?',
      options: [
        'Một cầu vồng hiện ra, và mọi người lại thấy hy vọng',
        'Trời đổ mưa suốt mấy giờ, rồi lụt tràn vào thành phố',
        'Sét đánh vào một cái cây, tiếng sấm dội mấy giờ liền',
        'Sương giá phủ khắp nơi, và có cả một cơn bão tuyết',
      ],
      answer: 0,
      dan: 'Then a rainbow appeared, and everyone felt hopeful again.',
    },
  ],
  'places-directions-daily': [
    {
      q: 'Bài dẫn nguyên văn câu người khách hỏi đường là gì?',
      options: [
        '“Xin lỗi, chỉ giúp tôi đường tới viện bảo tàng với?”',
        '“Xin lỗi, ngân hàng gần nhất ở lối nào ạ?”',
        '“Xin lỗi, cho hỏi thư viện có xa chỗ này không?”',
        '“Xin lỗi, tôi đi bộ tới trung tâm phố được không ạ?”',
      ],
      answer: 0,
      dan: 'You can say, \'Excuse me, could you tell me the way to the museum?\'',
    },
    {
      q: 'Người địa phương bảo đi thẳng con phố này mấy dãy nhà, rồi rẽ hướng nào?',
      options: [
        'Hai dãy nhà, tới chỗ giao có đèn thì rẽ trái',
        'Hai dãy nhà, tới chỗ giao có đèn thì rẽ phải',
        'Ba dãy nhà, tới chỗ giao có đèn thì rẽ trái',
        'Hai dãy nhà, tới góc quảng trường thì rẽ trái',
      ],
      answer: 0,
      dan: 'Go straight down this street for two blocks. When you reach the intersection with the traffic light, turn left.',
    },
    {
      q: 'Viện bảo tàng nằm cạnh cái gì, và đối diện cái gì?',
      options: [
        'Cạnh một công viên lớn, đối diện thư viện',
        'Cạnh thư viện, đối diện một công viên lớn',
        'Cạnh bưu điện, đối diện một công viên lớn',
        'Cạnh một công viên lớn, đối diện bưu điện',
      ],
      answer: 0,
      dan: 'The museum is on your right, next to a large park and opposite the library.',
    },
    {
      q: 'Nếu cần tiền mặt thì bài nói thường có ngân hàng ở đâu?',
      options: [
        'Ở góc quảng trường',
        'Ở ngay cạnh bưu điện',
        'Ở giữa trung tâm phố',
        'Ở đối diện thư viện',
      ],
      answer: 0,
      dan: 'If you need cash, there is usually a bank on the corner of the square.',
    },
  ],
  'housing-home-daily': [
    {
      q: 'Trong nhà người kể, ai lau dọn buồng tắm, rửa bồn rửa và bồn tắm?',
      options: [
        'Chị (hoặc em) gái của người kể',
        'Anh (hoặc em) trai của người kể',
        'Mẹ của người kể',
        'Chính người kể',
      ],
      answer: 0,
      dan: 'My sister cleans the bathroom, washing the sink and the bathtub.',
    },
    {
      q: 'Ai quét sàn và mang rác đi bỏ?',
      options: [
        'Anh (hoặc em) trai của người kể',
        'Chị (hoặc em) gái của người kể',
        'Người kể, làm cùng với mẹ',
        'Cả nhà cùng làm việc đó',
      ],
      answer: 0,
      dan: 'My brother sweeps the floor and takes out the rubbish.',
    },
    {
      q: 'Bên cạnh giường của người kể có những gì?',
      options: [
        'Một cái bàn để làm bài tập và một cái tủ để treo quần áo',
        'Một cái tủ đựng bát đĩa và một cái bàn để làm bài tập',
        'Một cái chăn ấm và một cái gối mềm để ngủ cho ngon',
        'Một cái ghế và cái bàn lớn mà cả nhà ngồi ăn quanh',
      ],
      answer: 0,
      dan: 'Beside my bed is a desk where I do my homework, and a wardrobe where I hang my clothes.',
    },
    {
      q: 'Người kể giúp mẹ làm việc gì?',
      options: [
        'Rửa bát rồi xếp vào tủ',
        'Quét sàn rồi mang rác đi bỏ',
        'Rửa bồn rửa và bồn tắm',
        'Nấu ăn bằng lò và lò vi ba',
      ],
      answer: 0,
      dan: 'I help my mother wash the dishes and put them in the cupboard.',
    },
  ],
  'food-cooking-daily-p2': [
    {
      q: 'Bài nói muốn ăn món lành thì làm cách nào?',
      options: [
        'Hấp rau hoặc nướng vỉ cá',
        'Luộc rau hoặc rán cá trong chảo',
        'Rán rau trong chảo hoặc hấp cá',
        'Nướng rau trong lò hoặc luộc cá',
      ],
      answer: 0,
      dan: 'If you like healthy food, you can steam vegetables or grill fish.',
    },
    {
      q: 'Bài bảo dùng dao sắc để thái hoặc xắt những gì?',
      options: [
        'Hành và cà chua',
        'Thịt và cá',
        'Rau và thịt gà',
        'Hành và rau',
      ],
      answer: 0,
      dan: 'First, you must take a sharp knife to chop or slice the onions and tomatoes.',
    },
    {
      q: 'Thái xong rồi thì bài bảo làm gì tiếp?',
      options: [
        'Trộn mọi thứ trong bát rồi khuấy nước sốt trên bếp',
        'Cho cả con gà vào lò nướng rồi hấp rau lên trên',
        'Rót một cốc nước rồi dọn bàn với nĩa, thìa và dao',
        'Nếm thử rồi thêm muối cho mặn hoặc đường cho ngọt',
      ],
      answer: 0,
      dan: 'Then, you mix everything in a bowl and stir the sauce on the stove.',
    },
    {
      q: 'Bài kết phần nhà hàng bằng những việc gì?',
      options: [
        'Xem thực đơn, gọi món, rồi trả tiền và để lại tiền tip',
        'Xem thực đơn, tự chọn chỗ, rồi trả tiền bằng thẻ tín dụng',
        'Gọi món với người phục vụ, rồi mang phần còn lại về nhà',
        'Đặt bàn trước, gọi món, rồi trả tiền và giữ lại hóa đơn',
      ],
      answer: 0,
      dan: 'You look at the menu, tell the waiter or waitress your order, and enjoy a wonderful meal before paying the bill and leaving a tip.',
    },
  ],
  'shopping-clothes-daily': [
    {
      q: 'Bài dẫn nguyên văn câu người mua hỏi nhân viên bán hàng là gì?',
      options: [
        '“Tôi thử cái này được không?”',
        '“Cái này bao nhiêu tiền ạ?”',
        '“Có cỡ lớn hơn không ạ?”',
        '“Tôi trả bằng thẻ được không?”',
      ],
      answer: 0,
      dan: 'you can ask the shop assistant: \'Can I try this on?\'',
    },
    {
      q: 'Bài kể ba kiểu quần áo không vừa là gì?',
      options: [
        'Quá chật, quá rộng, hoặc sai độ dài',
        'Quá chật, quá rộng, hoặc sai màu',
        'Quá dày, quá mỏng, hoặc sai độ dài',
        'Quá chật, sai cỡ, hoặc sai kiểu dáng',
      ],
      answer: 0,
      dan: 'Sometimes clothes are too tight, too loose, or the wrong length.',
    },
    {
      q: 'Theo bài, giữ hóa đơn để làm gì?',
      options: [
        'Để trả lại hoặc đổi hàng nếu khóa kéo đứt hay mất cúc',
        'Để được giảm giá vào lần mua sắm sau ở cùng cửa hàng',
        'Để chứng minh mình đã trả tiền nếu nhân viên hỏi lại',
        'Để tính lại tiền thừa nếu người bán đưa thiếu cho mình',
      ],
      answer: 0,
      dan: 'Always keep your receipt in your wallet or pocket, so you can return or exchange the item later if there is a broken zip or a missing button.',
    },
    {
      q: 'Người mua mang món hàng tới đâu để xem có vừa cỡ mình không?',
      options: [
        'Phòng thử đồ',
        'Quầy thu ngân',
        'Chỗ nhân viên bán hàng',
        'Trước một cái gương lớn',
      ],
      answer: 0,
      dan: 'You take the item to the fitting room to see if it fits your size or suits your style.',
    },
  ],

  // ══ ĐỢT 19/08 — CHẶNG A2 ĐÃ VIẾT LẠI BÀI ĐỌC ════════════════════════════════
  // Các chặng này trước đây là diễu hành từ vựng ("A dog is a very friendly
  // animal"), nên chúng nằm trong nhóm 'viet-lai' và mang băng cảnh báo cam.
  // Bài đọc ĐÃ ĐƯỢC VIẾT LẠI thành một cảnh có nhân vật và có việc xảy ra —
  // xem `scripts/data/viet_lai_bai_doc.mjs`. Nay hỏi được, nên soạn câu.
  //
  // `dan` ở đây do MÁY lấy từ chính mảng câu của bài, không gõ lại — cùng lý do
  // đã phải chép bằng máy ở đợt A2 (dấu gạch ngang, nháy lồng nhau).
  'animals-nature-daily': [
    {
      q: 'Trại cứu hộ của cô Chi trả được tiền gì, và không trả được tiền gì?',
      options: [
        'Trả được tiền thuốc, không trả được tiền ăn',
        'Trả được tiền ăn, không trả được tiền thuốc',
        'Trả được cả tiền ăn lẫn tiền thuốc cho con vật',
        'Không trả được gì, tất cả nhờ người tới cho',
      ],
      answer: 0,
      dan: 'She told us the shelter refuses no animal, but it can only pay for medicine, not for food.',
    },
    {
      q: 'Cô Chi biết con chó khoảng bốn tuổi nhờ vào đâu?',
      options: [
        'Nhờ nhìn răng của nó',
        'Nhờ nhìn bộ lông của nó',
        'Nhờ người ở tầng một kể lại',
        'Nhờ ảnh gia đình nhận nuôi gửi',
      ],
      answer: 0,
      dan: 'Chi said his teeth showed he was about four years old, not a puppy as we had thought.',
    },
    {
      q: 'Theo cô Chi, vì sao động vật trang trại phải để ở khu riêng?',
      options: [
        'Vì một con bò hoảng sợ còn nguy hiểm hơn con vật hoang dã',
        'Vì chúng có thể làm chó và mèo trong trại bị bệnh',
        'Vì người nông dân sẽ tới nhận chúng về sau vài tuần nữa',
        'Vì chúng cần một khu đất rộng hơn để đi lại tự do',
      ],
      answer: 0,
      dan: 'Chi keeps farm animals in a separate field, because a frightened cow is more dangerous than any wild animal she has met.',
    },
    {
      q: 'Cô Chi từng bị con vật nào làm xước tay?',
      options: [
        'Một con vịt, bằng cái mỏ',
        'Một con chó, bằng hàm răng',
        'Một con dê, bằng cái sừng',
        'Một con vẹt, bằng móng chân',
      ],
      answer: 0,
      dan: 'She has never been bitten by a dog, but a duck once cut her hand with its beak.',
    },
  ],
  'technology-internet-daily': [
    {
      q: 'Vấn đề đầu tiên khi bà học dùng điện thoại là gì?',
      options: [
        'Bà không cảm được khác nhau giữa chạm nhẹ và giữ lâu',
        'Bà không biết cách bật wifi trên máy của mình',
        'Bà không nhớ được mật khẩu tài khoản ngân hàng của bà',
        'Bà không phân biệt được tên tôi với tên anh họ',
      ],
      answer: 0,
      dan: 'The first problem was not the internet; it was that she could not feel the difference between a tap and a long press.',
    },
    {
      q: 'Vì sao suốt hai tuần bà gọi cho người kể thay vì gọi anh họ?',
      options: [
        'Vì hai cái tên bắt đầu bằng cùng một chữ',
        'Vì anh họ chỉ gọi về hai lần mỗi tháng',
        'Vì bà chưa tự bật được wifi trên máy',
        'Vì tờ giấy dán trên tường ghi sai bước',
      ],
      answer: 0,
      dan: 'For two weeks she called me instead of my cousin, because both names begin with the same letter.',
    },
    {
      q: 'Khi nhận tin nhắn đòi nhập mật khẩu, bà đã làm gì?',
      options: [
        'Chụp ảnh tin nhắn rồi gửi cho người kể trước',
        'Nhập mật khẩu vào trang web đó rồi mới hỏi',
        'Gọi ngay cho ngân hàng để hỏi cho chắc',
        'Xóa tin nhắn đi và không kể với ai cả',
      ],
      answer: 0,
      dan: 'She did not type it; she took a photograph of the message and sent it to me first.',
    },
    {
      q: 'Vì sao pin điện thoại của bà hết vào khoảng hai giờ chiều?',
      options: [
        'Vì bà không bao giờ tắt cái gì',
        'Vì bà xem video nấu ăn cả buổi sáng',
        'Vì bà để lại quá nhiều bình luận',
        'Vì bà quên cắm sạc từ tối hôm trước',
      ],
      answer: 0,
      dan: 'Her battery runs out by two in the afternoon, because she never closes anything.',
    },
  ],
  'hobbies-entertainment-daily': [
    {
      q: 'Vì sao chủ quán luôn rút được tờ "xem phim"?',
      options: [
        'Vì ông gấp tờ đá bóng nhỏ hơn cho khó rút',
        'Vì hai đứa muốn xem phim viết chữ to hơn',
        'Vì ông cũng thích phim hài hơn là đá bóng',
        'Vì tờ đá bóng bị ướt nên dính vào nhau',
      ],
      answer: 0,
      dan: 'It turned out he had folded the football paper smaller, because he did not want us shouting outside his shop.',
    },
    {
      q: 'Luật mới của nhóm sau vụ rút giấy là gì?',
      options: [
        'Ai tới muộn nhất thì được chọn, người khác không được cãi',
        'Ai tới sớm nhất thì được chọn cho cả buổi chiều hôm đó',
        'Mỗi tuần đổi một người chọn, xoay đủ năm người',
        'Bỏ hẳn việc chọn, thứ Bảy nào cũng ngồi ở quán',
      ],
      answer: 0,
      dan: 'After that we changed the rule: whoever arrives last chooses, and the others may not complain.',
    },
    {
      q: 'Lan học chơi cờ từ ai, và bằng cách nào?',
      options: [
        'Từ bố cô, người không bao giờ để cô thắng một ván',
        'Từ bốn người bạn trong nhóm suốt hai tuần mưa',
        'Từ chủ quán cà phê, người dạy cô mỗi thứ Bảy',
        'Từ một quyển sách cô mang tới quán để đọc',
      ],
      answer: 0,
      dan: 'She learned it from her father, who taught her by never letting her win a single game.',
    },
    {
      q: 'Chủ quán nhận xét thế nào về nhóm?',
      options: [
        'Là khách yên nhất và cũng tệ nhất, vì năm người chia hai ly',
        'Là khách tốt nhất, vì tuần nào cũng tới đúng thứ Bảy đó',
        'Là khách ồn nhất, vì hay hò hét ngay ngoài cửa hàng',
        'Là khách lạ nhất, vì vừa đọc sách vừa chơi cờ',
      ],
      answer: 0,
      dan: 'The owner says we are his quietest customers and his worst customers, because five people share two drinks.',
    },
  ],
  'clothes-fashion-daily': [
    {
      q: 'Bộ đồ màu xám ở chợ không vừa ở chỗ nào?',
      options: [
        'Phần vai',
        'Phần bụng',
        'Ống quần',
        'Cổ áo',
      ],
      answer: 0,
      dan: 'I went to the market first, where a woman showed me a grey suit that fitted everywhere except the shoulders.',
    },
    {
      q: 'Cái quần ở cửa hàng thứ hai sai thế nào?',
      options: [
        'Dài sai bốn xăng-ti-mét',
        'Rộng sai bốn xăng-ti-mét',
        'Ngắn sai một cỡ áo',
        'Chật ở phần bụng',
      ],
      answer: 0,
      dan: 'In the second shop the jacket was cheap and the trousers were the wrong length by four centimetres.',
    },
    {
      q: 'Người kể xử lý chỗ hơi rộng ở bụng bằng cách nào?',
      options: [
        'Đeo một cái dây lưng để che',
        'Mua rộng hơn một cỡ nữa',
        'Nhờ cửa hàng sửa lại cho vừa',
        'Mặc thêm một cái áo bên trong',
      ],
      answer: 0,
      dan: 'It was slightly too loose at the waist, but a belt hid that completely.',
    },
    {
      q: 'Chuyện gì xảy ra ở đám cưới với bộ đồ đó?',
      options: [
        'Hai khách nữa mặc đúng bộ đó, từ đúng cửa hàng đang dẹp',
        'Không ai nhận ra người kể mặc đồ mua ở chợ',
        'Đôi giày của bố bị tuột ra ngay khi người kể đi lại',
        'Mẹ người kể nhận ra ngay là bộ đồ hơi rộng',
      ],
      answer: 0,
      dan: 'At the wedding two other guests were wearing exactly the same dark blue suit from the same closing shop.',
    },
  ],
  'house-furniture-daily': [
    {
      q: 'Vì sao cái sofa không lên được?',
      options: [
        'Vì nó rộng hơn cái cửa sáu xăng-ti-mét',
        'Vì cầu thang lên tầng ba quẹo hai lần',
        'Vì bốn người đẩy nó sai hướng suốt hai mươi phút',
        'Vì phải tháo chân ghế ra mới nhấc được',
      ],
      answer: 0,
      dan: 'My uncle measured the doorway and the sofa, and the sofa was six centimetres wider.',
    },
    {
      q: 'Vì sao mẹ người kể khóc vì cái tủ quần áo?',
      options: [
        'Vì bà ngoại đã cho mẹ nó vào đúng ngày cưới của mẹ',
        'Vì cái tủ đó là món đồ đắt nhất trong nhà cũ',
        'Vì gia đình mua nhà cũ trả giá quá thấp cho nó',
        'Vì cái tủ bị hỏng khi nhấc qua tay cầm cầu thang',
      ],
      answer: 0,
      dan: 'My mother cried about the wardrobe, because her mother had given it to her at her own wedding.',
    },
    {
      q: 'Chuyện gì xảy ra với cái tủ lạnh?',
      options: [
        'Không chạy suốt hai ngày rồi tự chạy lại',
        'Không chạy nữa và phải bán lại cho người khác',
        'Chạy được ngay nhưng kêu to hơn ở nhà cũ',
        'Không vào được cửa nên phải tháo cánh ra',
      ],
      answer: 0,
      dan: 'The fridge was easier, but it did not work for two days after the move and then started again by itself.',
    },
    {
      q: 'Gia đình trước để lại thứ gì trong tủ?',
      options: [
        'Một cái thảm đỏ đậm, vừa khít phòng khách',
        'Một cái đèn để lắp phía trên bếp',
        'Một cái bàn ăn nhỏ có thể gấp gọn lại được',
        'Một cái tủ quần áo cũ đã tháo rời',
      ],
      answer: 0,
      dan: 'On the fourth day we found that the previous family had left a carpet rolled up in a cupboard.',
    },
  ],
  'body-health-daily': [
    {
      q: 'Vì sao lần này bố người kể không tránh được việc đi khám?',
      options: [
        'Vì công ty trả tiền cho mọi người trên năm mươi tuổi đi khám',
        'Vì bố đã tăng mười một ki-lô so với ảnh cưới',
        'Vì bác sĩ đã yêu cầu bố phải tới đo lại huyết áp lần nữa',
        'Vì mẹ người kể muốn đi bộ cùng bố mỗi ngày',
      ],
      answer: 0,
      dan: 'Last spring his company paid for everyone over fifty to see a doctor, so he could not avoid it.',
    },
    {
      q: 'Câu nào của bác sĩ làm bố sợ?',
      options: [
        'Rằng một người có thể thấy bình thường mà vẫn đang gặp chuyện',
        'Rằng con số huyết áp của bố đã cao hơn mức cho phép nhiều',
        'Rằng bố phải ngừng ăn sau tám giờ tối mỗi ngày',
        'Rằng bố đã tăng cân quá nhiều từ ngày cưới',
      ],
      answer: 0,
      dan: 'That was the sentence that frightened him: that a person can feel fine and still be in trouble.',
    },
    {
      q: 'Trong ba việc bác sĩ dặn, việc nào bố KHÔNG giữ được?',
      options: [
        'Ngừng ăn sau tám giờ tối',
        'Đi bộ ba mươi phút mỗi ngày',
        'Ăn ít muối hơn trước',
        'Đi đo lại huyết áp hằng tháng',
      ],
      answer: 0,
      dan: 'He kept the walking and the salt, but the evening rule lasted four days.',
    },
    {
      q: 'Bố nói gì về năm ki-lô đã giảm?',
      options: [
        'Hai ki-lô cuối khó hơn ba ki-lô đầu cộng lại',
        'Ba ki-lô đầu khó hơn hai ki-lô cuối rất nhiều',
        'Cả năm ki-lô đều giảm dễ nhờ đi bộ mỗi ngày',
        'Bố giảm được nhờ ngừng ăn sau tám giờ tối',
      ],
      answer: 0,
      dan: 'He lost five kilograms, and he says the last two were harder than the first three together.',
    },
  ],
};

export default STORY_QUIZ_A2;
