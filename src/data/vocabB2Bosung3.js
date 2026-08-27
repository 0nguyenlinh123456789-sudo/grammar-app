// File: src/data/vocabB2Bosung3.js
// BÙ LỖ HỔNG VỐN TỪ B2 — ĐỢT 3: 78 TỪ CÒN LẠI CỦA NHÓM "CHỈ LƯỚT QUA".
//
// ══ ĐỢT NÀY ĐÓNG NHÓM NÀO ══
// Phép đo ngày 27/08/2026 tách 322 từ B2 chưa có mục từ riêng làm ba nhóm:
//   ·  69 từ VẮNG HẲN        → đợt 1 soạn 66 (bỏ có chủ ý `gay`, `sexy`, `punk`);
//   · 167 từ CHỈ LƯỚT QUA    → đợt 2 soạn 89, đợt này soạn nốt 78;
//   ·  86 từ Oxford CÓ DẠY   → giữ nguyên, xem lý do ở cuối chú thích này.
//
// "Chỉ lướt qua" nghĩa là từ có xuất hiện đâu đó trong câu ví dụ hoặc bài đọc
// của chặng khác, nhưng chưa từng được DẠY thành một mục từ có nghĩa, có phiên
// âm, có câu ví dụ riêng. Người học gặp mặt chữ mà không được ai giảng — đó là
// gặp, không phải học.
//
// ══ VÌ SAO KHÔNG SOẠN NỐT 86 TỪ CỦA NHÓM OXFORD ══
// Nhóm đó nằm trong 260 unit giáo trình Oxford đang có trên web, được dạy qua
// `theory` / `quiz` / `typingGame` chứ không qua mục từ. Soạn lại thành mục từ
// là DẠY HAI LẦN cùng một từ ở hai chỗ, và sẽ đẻ ra đúng loại trùng lặp mà
// `npm run bam:dup` sinh ra để chặn. Thiếu khuôn không phải là thiếu nội dung.
//
// ══ KHÔNG CHÉP DANH SÁCH CỦA OXFORD VÀO REPO ══
// Oxford 5000 là tuyển tập có bản quyền của OUP; thứ được bảo hộ là việc CHỌN
// và XẾP BẬC. Danh sách chỉ đóng vai bảng đối chiếu ngoài repo. Mọi nghĩa tiếng
// Việt, mọi câu ví dụ và cả bài đọc dưới đây đều soạn mới.

export const vocabB2Bosung3 = [
  {
    id: 'b2-thoi-gian-muc-do-xa-hoi',
    category: 'vstep',
    // ⚠️ `level` phải là "B2" TRẦN. `bandFromLevelString` kiểm B1 TRƯỚC B2, nên
    // chuỗi "B1-B2" sẽ rơi xuống bậc intermediate và chặng này biến mất khỏi
    // bậc B2 mà không có gì báo.
    level: 'B2',
    title: '🧱 Thời Gian, Mức Độ & Đời Sống Xã Hội (B2)',
    description: '78 từ B2 khép lại nhóm "chỉ lướt qua": cách nói về thời gian và mức độ, cách gọi tên tổ chức - nghề nghiệp - trạng thái xã hội, và một nhóm động từ, danh từ cụ thể hay gặp trong bài đọc B2.',
    words: [
      // ── Thời gian, nhịp độ, mức độ ──────────────────────────────────────
      { en: 'nowadays', vi: 'ngày nay, thời nay', type: '(adv)', ipa: '/ˈnaʊədeɪz/', example: 'Nowadays most students look things up on their phones.', viExample: 'Ngày nay phần lớn học sinh tra cứu bằng điện thoại.' },
      { en: 'overnight', vi: 'qua đêm; chỉ sau một đêm', type: '(adv/adj)', ipa: '/ˌəʊvəˈnaɪt/', example: 'Leave the beans in water overnight before cooking.', viExample: 'Ngâm đậu trong nước qua đêm trước khi nấu.' },
      { en: 'permanently', vi: 'vĩnh viễn, lâu dài', type: '(adv)', ipa: '/ˈpɜːmənəntli/', example: 'The shop closed permanently after the flood.', viExample: 'Cửa hàng đóng cửa vĩnh viễn sau trận lụt.' },
      { en: 'temporarily', vi: 'tạm thời', type: '(adv)', ipa: '/ˈtemprərəli/', example: 'The bridge is temporarily closed for repairs.', viExample: 'Cây cầu tạm đóng để sửa chữa.' },
      { en: 'shortly', vi: 'chẳng bao lâu nữa, ngay sau đó', type: '(adv)', ipa: '/ˈʃɔːtli/', example: 'The doctor will see you shortly.', viExample: 'Bác sĩ sẽ khám cho bạn ngay bây giờ.' },
      { en: 'steadily', vi: 'đều đặn, ổn định', type: '(adv)', ipa: '/ˈstedɪli/', example: 'Her English has improved steadily since January.', viExample: 'Tiếng Anh của cô ấy tiến bộ đều đặn từ tháng Một.' },
      { en: 'timing', vi: 'thời điểm, cách chọn lúc', type: '(n)', ipa: '/ˈtaɪmɪŋ/', example: 'The idea was good, but the timing was wrong.', viExample: 'Ý tưởng thì hay, nhưng chọn sai thời điểm.' },
      { en: 'precisely', vi: 'chính xác, đúng y', type: '(adv)', ipa: '/prɪˈsaɪsli/', example: 'The train left at precisely six o clock.', viExample: 'Tàu rời ga đúng sáu giờ.' },
      { en: 'primarily', vi: 'chủ yếu là', type: '(adv)', ipa: '/praɪˈmerəli/', example: 'The course is primarily for beginners.', viExample: 'Khoá học chủ yếu dành cho người mới bắt đầu.' },
      { en: 'purely', vi: 'thuần tuý, hoàn toàn chỉ vì', type: '(adv)', ipa: '/ˈpjʊəli/', example: 'We met purely by chance at the airport.', viExample: 'Chúng tôi gặp nhau hoàn toàn tình cờ ở sân bay.' },
      { en: 'severely', vi: 'nghiêm trọng, nặng nề', type: '(adv)', ipa: '/sɪˈvɪəli/', example: 'The harvest was severely damaged by the storm.', viExample: 'Vụ mùa bị bão làm hư hại nặng.' },
      { en: 'thoroughly', vi: 'kỹ lưỡng, triệt để', type: '(adv)', ipa: '/ˈθʌrəli/', example: 'Wash the vegetables thoroughly before eating.', viExample: 'Rửa rau thật kỹ trước khi ăn.' },
      { en: 'automatically', vi: 'tự động', type: '(adv)', ipa: '/ˌɔːtəˈmætɪkli/', example: 'The lights turn off automatically at midnight.', viExample: 'Đèn tự động tắt lúc nửa đêm.' },
      { en: 'openly', vi: 'công khai, thẳng thắn', type: '(adv)', ipa: '/ˈəʊpənli/', example: 'She spoke openly about her mistakes.', viExample: 'Cô ấy nói thẳng thắn về những sai lầm của mình.' },

      // ── Nhận định, đánh giá, mô tả tính chất ────────────────────────────
      { en: 'outstanding', vi: 'xuất sắc; (khoản) còn tồn đọng', type: '(adj)', ipa: '/aʊtˈstændɪŋ/', example: 'He won a prize for outstanding work in physics.', viExample: 'Cậu ấy được giải nhờ thành tích xuất sắc môn vật lý.' },
      { en: 'remarkable', vi: 'đáng chú ý, phi thường', type: '(adj)', ipa: '/rɪˈmɑːkəbl/', example: 'She made a remarkable recovery after the accident.', viExample: 'Cô ấy hồi phục một cách đáng kinh ngạc sau tai nạn.' },
      { en: 'precious', vi: 'quý giá', type: '(adj)', ipa: '/ˈpreʃəs/', example: 'Time with family is precious.', viExample: 'Thời gian bên gia đình là quý giá.' },
      { en: 'precise', vi: 'chính xác, tỉ mỉ', type: '(adj)', ipa: '/prɪˈsaɪs/', example: 'Can you give me the precise number of guests?', viExample: 'Bạn cho tôi con số khách chính xác được không?' },
      { en: 'predictable', vi: 'đoán trước được', type: '(adj)', ipa: '/prɪˈdɪktəbl/', example: 'The ending of the film was rather predictable.', viExample: 'Đoạn kết bộ phim khá dễ đoán.' },
      { en: 'promising', vi: 'đầy hứa hẹn, nhiều triển vọng', type: '(adj)', ipa: '/ˈprɒmɪsɪŋ/', example: 'She is a promising young singer.', viExample: 'Cô ấy là một ca sĩ trẻ đầy triển vọng.' },
      { en: 'risky', vi: 'rủi ro, mạo hiểm', type: '(adj)', ipa: '/ˈrɪski/', example: 'Lending money to friends can be risky.', viExample: 'Cho bạn bè vay tiền có thể rất rủi ro.' },
      { en: 'valid', vi: 'còn hiệu lực; hợp lý', type: '(adj)', ipa: '/ˈvælɪd/', example: 'Your ticket is valid for three months.', viExample: 'Vé của bạn có giá trị trong ba tháng.' },
      { en: 'visible', vi: 'nhìn thấy được, rõ ràng', type: '(adj)', ipa: '/ˈvɪzəbl/', example: 'The mountain is visible from our window.', viExample: 'Từ cửa sổ nhà tôi nhìn thấy ngọn núi.' },
      { en: 'universal', vi: 'phổ quát, chung cho tất cả', type: '(adj)', ipa: '/ˌjuːnɪˈvɜːsl/', example: 'Music is often called a universal language.', viExample: 'Âm nhạc thường được gọi là ngôn ngữ chung của loài người.' },
      { en: 'ultimate', vi: 'cuối cùng, tối thượng', type: '(adj)', ipa: '/ˈʌltɪmət/', example: 'Her ultimate goal is to teach at a university.', viExample: 'Mục tiêu cuối cùng của cô ấy là dạy ở đại học.' },
      { en: 'unacceptable', vi: 'không thể chấp nhận', type: '(adj)', ipa: '/ˌʌnəkˈseptəbl/', example: 'Shouting at customers is completely unacceptable.', viExample: 'Quát khách hàng là điều hoàn toàn không thể chấp nhận.' },
      { en: 'weird', vi: 'kỳ quặc, lạ lùng', type: '(adj)', ipa: '/wɪəd/', example: 'There was a weird noise coming from the engine.', viExample: 'Có tiếng động kỳ lạ phát ra từ động cơ.' },
      { en: 'super', vi: 'tuyệt, cực kỳ', type: '(adj/adv)', ipa: '/ˈsuːpə(r)/', example: 'The soup was super hot, so I waited a minute.', viExample: 'Bát canh nóng cực, nên tôi chờ một phút.' },
      { en: 'thorough', vi: 'kỹ càng, thấu đáo', type: '(adj)', ipa: '/ˈθʌrə/', example: 'The police carried out a thorough search of the house.', viExample: 'Cảnh sát khám xét ngôi nhà rất kỹ.' },
      { en: 'so-called', vi: 'cái gọi là (hàm ý nghi ngờ)', type: '(adj)', ipa: '/ˌsəʊ ˈkɔːld/', example: 'His so-called friends never visited him in hospital.', viExample: 'Cái gọi là bạn bè của anh ta chẳng ai vào bệnh viện thăm.' },
      { en: 'random', vi: 'ngẫu nhiên, không theo trật tự', type: '(adj)', ipa: '/ˈrændəm/', example: 'We asked a random group of shoppers for their opinion.', viExample: 'Chúng tôi hỏi ý kiến một nhóm khách mua hàng ngẫu nhiên.' },
      { en: 'sufficient', vi: 'đủ, đầy đủ', type: '(adj)', ipa: '/səˈfɪʃnt/', example: 'One bag of rice is sufficient for the whole week.', viExample: 'Một túi gạo là đủ cho cả tuần.' },
      { en: 'skilled', vi: 'lành nghề, có tay nghề', type: '(adj)', ipa: '/skɪld/', example: 'The factory needs more skilled workers.', viExample: 'Nhà máy cần thêm công nhân lành nghề.' },
      { en: 'passionate', vi: 'say mê, nhiệt huyết', type: '(adj)', ipa: '/ˈpæʃənət/', example: 'He is passionate about protecting the forest.', viExample: 'Anh ấy rất say mê việc bảo vệ rừng.' },
      { en: 'parallel', vi: 'song song; tương đồng', type: '(adj/n)', ipa: '/ˈpærəlel/', example: 'The new road runs parallel to the river.', viExample: 'Con đường mới chạy song song với dòng sông.' },
      { en: 'shaped', vi: 'có hình dạng, được tạo hình', type: '(adj)', ipa: '/ʃeɪpt/', example: 'The cake was shaped like a star.', viExample: 'Cái bánh có hình ngôi sao.' },
      { en: 'ongoing', vi: 'đang diễn ra, chưa kết thúc', type: '(adj)', ipa: '/ˈɒnɡəʊɪŋ/', example: 'The repairs are ongoing and will finish in May.', viExample: 'Việc sửa chữa vẫn đang diễn ra và sẽ xong vào tháng Năm.' },

      // ── Nghề nghiệp, tổ chức, hoạt động xã hội ──────────────────────────
      { en: 'nursing', vi: 'ngành điều dưỡng, nghề y tá', type: '(n)', ipa: '/ˈnɜːsɪŋ/', example: 'She left the bank to study nursing.', viExample: 'Cô ấy nghỉ việc ở ngân hàng để đi học điều dưỡng.' },
      { en: 'observer', vi: 'người quan sát, quan sát viên', type: '(n)', ipa: '/əbˈzɜːvə(r)/', example: 'He attended the meeting as an observer, not a member.', viExample: 'Anh ấy dự họp với tư cách quan sát viên, không phải thành viên.' },
      { en: 'partnership', vi: 'quan hệ hợp tác; công ty hợp danh', type: '(n)', ipa: '/ˈpɑːtnəʃɪp/', example: 'The school formed a partnership with a local library.', viExample: 'Trường lập quan hệ hợp tác với một thư viện địa phương.' },
      { en: 'placement', vi: 'kỳ thực tập; việc sắp xếp chỗ', type: '(n)', ipa: '/ˈpleɪsmənt/', example: 'Students spend six weeks on a work placement.', viExample: 'Sinh viên có sáu tuần đi thực tập.' },
      { en: 'publishing', vi: 'ngành xuất bản', type: '(n)', ipa: '/ˈpʌblɪʃɪŋ/', example: 'After university she went into publishing.', viExample: 'Sau đại học cô ấy vào làm ngành xuất bản.' },
      { en: 'trading', vi: 'việc buôn bán, giao dịch', type: '(n)', ipa: '/ˈtreɪdɪŋ/', example: 'Trading on the market was quiet all morning.', viExample: 'Việc giao dịch trên thị trường trầm lắng suốt buổi sáng.' },
      { en: 'voting', vi: 'việc bỏ phiếu', type: '(n)', ipa: '/ˈvəʊtɪŋ/', example: 'Voting closes at seven in the evening.', viExample: 'Việc bỏ phiếu kết thúc lúc bảy giờ tối.' },
      { en: 'voluntary', vi: 'tự nguyện, thiện nguyện', type: '(adj)', ipa: '/ˈvɒləntri/', example: 'She does voluntary work at the animal shelter.', viExample: 'Cô ấy làm việc thiện nguyện ở trạm cứu hộ động vật.' },
      { en: 'racial', vi: 'thuộc về chủng tộc', type: '(adj)', ipa: '/ˈreɪʃl/', example: 'The law was written to end racial discrimination.', viExample: 'Đạo luật được viết ra để chấm dứt phân biệt chủng tộc.' },
      { en: 'testing', vi: 'việc kiểm tra, thử nghiệm', type: '(n)', ipa: '/ˈtestɪŋ/', example: 'Testing of the new vaccine took two years.', viExample: 'Việc thử nghiệm vắc-xin mới mất hai năm.' },
      { en: 'output', vi: 'sản lượng, đầu ra', type: '(n)', ipa: '/ˈaʊtpʊt/', example: 'The factory doubled its output in one year.', viExample: 'Nhà máy tăng gấp đôi sản lượng trong một năm.' },
      { en: 'overseas', vi: 'ở nước ngoài, ra nước ngoài', type: '(adj/adv)', ipa: '/ˌəʊvəˈsiːz/', example: 'Many of our customers are overseas.', viExample: 'Nhiều khách hàng của chúng tôi ở nước ngoài.' },
      { en: 'recognition', vi: 'sự công nhận; sự nhận ra', type: '(n)', ipa: '/ˌrekəɡˈnɪʃn/', example: 'Her work finally received the recognition it deserved.', viExample: 'Công trình của bà cuối cùng cũng được công nhận xứng đáng.' },
      { en: 'preference', vi: 'sự ưa thích hơn, lựa chọn ưu tiên', type: '(n)', ipa: '/ˈprefrəns/', example: 'Do you have a preference for tea or coffee?', viExample: 'Bạn thích trà hay cà phê hơn?' },
      { en: 'pursuit', vi: 'sự theo đuổi; cuộc rượt đuổi', type: '(n)', ipa: '/pəˈsjuːt/', example: 'He gave up a safe job in pursuit of a dream.', viExample: 'Anh ấy bỏ một công việc an toàn để theo đuổi giấc mơ.' },
      { en: 'satisfaction', vi: 'sự hài lòng, sự thoả mãn', type: '(n)', ipa: '/ˌsætɪsˈfækʃn/', example: 'There is real satisfaction in finishing something difficult.', viExample: 'Hoàn thành một việc khó mang lại sự hài lòng thật sự.' },
      { en: 'tendency', vi: 'xu hướng, thiên hướng', type: '(n)', ipa: '/ˈtendənsi/', example: 'He has a tendency to talk too fast when he is nervous.', viExample: 'Anh ấy có xu hướng nói quá nhanh khi hồi hộp.' },
      { en: 'tension', vi: 'sự căng thẳng; độ căng', type: '(n)', ipa: '/ˈtenʃn/', example: 'You could feel the tension in the room before the results.', viExample: 'Có thể cảm nhận sự căng thẳng trong phòng trước khi có kết quả.' },
      { en: 'uncertainty', vi: 'sự không chắc chắn', type: '(n)', ipa: '/ʌnˈsɜːtnti/', example: 'There is still uncertainty about the exam date.', viExample: 'Vẫn chưa chắc chắn về ngày thi.' },
      { en: 'viewpoint', vi: 'quan điểm, góc nhìn', type: '(n)', ipa: '/ˈvjuːpɔɪnt/', example: 'Try to see the problem from her viewpoint.', viExample: 'Hãy thử nhìn vấn đề từ góc nhìn của cô ấy.' },
      { en: 'terror', vi: 'nỗi kinh hoàng, sự khủng bố', type: '(n)', ipa: '/ˈterə(r)/', example: 'The child screamed in terror at the sound.', viExample: 'Đứa bé hét lên kinh hoàng vì tiếng động đó.' },
      { en: 'rival', vi: 'đối thủ', type: '(n)', ipa: '/ˈraɪvl/', example: 'The two shops have been rivals for twenty years.', viExample: 'Hai cửa hàng là đối thủ của nhau đã hai mươi năm.' },
      { en: 'seeker', vi: 'người đi tìm, người tìm kiếm', type: '(n)', ipa: '/ˈsiːkə(r)/', example: 'The centre offers free advice to every job seeker.', viExample: 'Trung tâm tư vấn miễn phí cho mọi người đi tìm việc.' },
      { en: 'survivor', vi: 'người sống sót', type: '(n)', ipa: '/səˈvaɪvə(r)/', example: 'The only survivor of the crash was a young girl.', viExample: 'Người duy nhất sống sót sau vụ tai nạn là một bé gái.' },
      { en: 'troop', vi: 'đoàn, toán; (số nhiều) quân lính', type: '(n)', ipa: '/truːp/', example: 'A troop of children ran across the field.', viExample: 'Một toán trẻ con chạy băng qua cánh đồng.' },
      { en: 'treasure', vi: 'kho báu, vật quý', type: '(n)', ipa: '/ˈtreʒə(r)/', example: 'The old map showed where the treasure was buried.', viExample: 'Tấm bản đồ cũ chỉ chỗ chôn kho báu.' },
      { en: 'trillion', vi: 'nghìn tỷ', type: '(number)', ipa: '/ˈtrɪljən/', example: 'The world spends trillions of dollars on energy.', viExample: 'Thế giới chi hàng nghìn tỷ đô la cho năng lượng.' },
      { en: 'teens', vi: 'tuổi mười mấy; thanh thiếu niên', type: '(n)', ipa: '/tiːnz/', example: 'She started learning the guitar in her teens.', viExample: 'Cô ấy bắt đầu học ghi-ta từ tuổi mười mấy.' },
      { en: 'receiver', vi: 'ống nghe điện thoại; người nhận', type: '(n)', ipa: '/rɪˈsiːvə(r)/', example: 'He picked up the receiver and said nothing.', viExample: 'Anh ta nhấc ống nghe lên mà không nói gì.' },

      // ── Động từ ─────────────────────────────────────────────────────────
      { en: 'occupy', vi: 'chiếm (chỗ, thời gian); cư ngụ', type: '(v)', ipa: '/ˈɒkjupaɪ/', example: 'The bookshelves occupy an entire wall.', viExample: 'Mấy giá sách chiếm trọn một bức tường.' },
      { en: 'precede', vi: 'đi trước, xảy ra trước', type: '(v)', ipa: '/prɪˈsiːd/', example: 'A short speech preceded the concert.', viExample: 'Một bài phát biểu ngắn diễn ra trước buổi hoà nhạc.' },
      { en: 'proceed', vi: 'tiến hành, tiếp tục', type: '(v)', ipa: '/prəˈsiːd/', example: 'Please proceed to gate twelve for boarding.', viExample: 'Vui lòng đi tiếp tới cửa số mười hai để lên máy bay.' },
      { en: 'rebuild', vi: 'xây lại, dựng lại', type: '(v)', ipa: '/ˌriːˈbɪld/', example: 'The village had to rebuild the school after the flood.', viExample: 'Ngôi làng phải xây lại trường học sau trận lụt.' },
      { en: 'specify', vi: 'nêu rõ, chỉ định cụ thể', type: '(v)', ipa: '/ˈspesɪfaɪ/', example: 'Please specify the size and colour in your order.', viExample: 'Vui lòng nêu rõ kích cỡ và màu sắc trong đơn hàng.' },
      { en: 'scratch', vi: 'cào, gãi; vết xước', type: '(v/n)', ipa: '/skrætʃ/', example: 'Do not scratch the screen with your keys.', viExample: 'Đừng làm xước màn hình bằng chìa khoá.' },
      { en: 'trap', vi: 'bẫy; mắc kẹt', type: '(n/v)', ipa: '/træp/', example: 'Two workers were trapped in the lift for an hour.', viExample: 'Hai công nhân mắc kẹt trong thang máy suốt một tiếng.' },

      // ── Cơ thể và nơi chốn ──────────────────────────────────────────────
      { en: 'palm', vi: 'lòng bàn tay; cây cọ', type: '(n)', ipa: '/pɑːm/', example: 'She held the small key in the palm of her hand.', viExample: 'Cô ấy giữ chiếc chìa khoá nhỏ trong lòng bàn tay.' },
      { en: 'wrist', vi: 'cổ tay', type: '(n)', ipa: '/rɪst/', example: 'He hurt his wrist playing badminton.', viExample: 'Anh ấy đau cổ tay khi chơi cầu lông.' },
      { en: 'shore', vi: 'bờ biển, bờ hồ', type: '(n)', ipa: '/ʃɔː(r)/', example: 'We walked along the shore until sunset.', viExample: 'Chúng tôi đi dọc bờ biển tới lúc mặt trời lặn.' },
      { en: 'worm', vi: 'con giun, con sâu', type: '(n)', ipa: '/wɜːm/', example: 'Birds pull worms out of the wet ground.', viExample: 'Chim rút giun lên khỏi mặt đất ẩm.' },

      // ── Đại từ ──────────────────────────────────────────────────────────
      { en: 'whoever', vi: 'bất cứ ai, người nào mà', type: '(pron)', ipa: '/huːˈevə(r)/', example: 'Whoever finishes first can leave early.', viExample: 'Ai xong trước thì được về sớm.' },
    ],
    storyEn: '📖 PART 1: THE LIGHTHOUSE ON THE SHORE\nNowadays the old lighthouse on our shore is a small museum, but ten years ago it was close to falling down. A voluntary trust was formed to rebuild it, and my aunt, who had just finished a nursing course, came to the first meeting only as an observer. She stayed for ten years.\n\nThe trust had no money at all. The survey was thorough: the walls were sound, the stairs were not, and the roof would not last one winter. The chairman said openly that the work might occupy a decade, and that nothing about the cost was predictable. Nobody left the room.\n\nMoney came in slowly but steadily. A partnership with a small publishing house paid for the first repairs, and a trading company overseas sent a cheque nobody had expected. Teens from the local school gave up their Saturdays. My cousin took a work placement there instead of an office job and said the satisfaction was worth more than the pay.\n\n📖 PART 2: WHAT THEY FOUND\nHalfway through the work someone scratched at a loose brick in the base and found a tin box. Inside was a logbook, precious and almost unreadable, kept by the last keeper. It recorded precisely, in a beautiful hand, every ship that had passed. One entry named a survivor pulled from the water in 1911.\n\nThe find was outstanding, and recognition followed quickly. A university asked to publish it; the trust agreed on one condition — the original must stay on the shore where it belonged. That, the chairman said, was not a preference but a rule.\n\nThe lighthouse reopened last spring. The work is ongoing, because salt air is a patient enemy and nothing on this coast stays painted permanently. But whoever climbs the stairs now can see forty miles of sea, and my aunt says that view is the ultimate reward.',
    storyVi: '📖 PHẦN 1: NGỌN HẢI ĐĂNG TRÊN BỜ BIỂN\nNgày nay (Nowadays) ngọn hải đăng cũ trên Bờ biển (shore) quê tôi là một bảo tàng nhỏ, nhưng mười năm trước nó sắp đổ. Một quỹ Thiện nguyện (voluntary) được lập ra để Dựng lại (rebuild) nó, và dì tôi, người vừa học xong khoá Điều dưỡng (nursing), đến buổi họp đầu tiên chỉ với tư cách Quan sát viên (observer). Rồi dì ở lại mười năm.\n\nQuỹ không có đồng nào. Cuộc khảo sát rất Kỹ càng (thorough): tường thì chắc, cầu thang thì không, còn mái thì không trụ nổi một mùa đông. Ông chủ tịch nói Thẳng thắn (openly) rằng công việc có thể Chiếm (occupy) cả một thập kỷ, và rằng không có gì về chi phí là Đoán trước được (predictable). Không ai rời khỏi phòng.\n\nTiền về chậm nhưng Đều đặn (steadily). Một quan hệ Hợp tác (partnership) với một nhà Xuất bản (publishing) nhỏ trả cho đợt sửa đầu tiên, và một công ty Buôn bán (trading) ở Nước ngoài (overseas) gửi tới một tấm séc không ai ngờ. Đám Thanh thiếu niên (Teens) ở trường làng bỏ những ngày thứ Bảy của mình. Anh họ tôi nhận một kỳ Thực tập (placement) ở đó thay vì một việc văn phòng, và bảo rằng Sự hài lòng (satisfaction) đáng giá hơn tiền lương.\n\n📖 PHẦN 2: THỨ HỌ TÌM THẤY\nGiữa chừng công việc, có người Cào (scratched) vào một viên gạch lỏng ở chân tháp và tìm thấy một hộp thiếc. Bên trong là một cuốn nhật ký hải trình, Quý giá (precious) và gần như không đọc nổi, do người gác đèn cuối cùng để lại. Nó ghi Chính xác (precisely), bằng một nét chữ đẹp, từng con tàu đã đi qua. Một dòng nhắc tên một Người sống sót (survivor) được vớt lên khỏi mặt nước năm 1911.\n\nPhát hiện ấy thật Xuất sắc (outstanding), và Sự công nhận (recognition) đến rất nhanh. Một trường đại học xin được xuất bản nó; quỹ đồng ý với một điều kiện — bản gốc phải ở lại trên Bờ biển (shore) nơi nó thuộc về. Ông chủ tịch bảo, đó không phải một Lựa chọn ưa thích (preference) mà là một luật.\n\nNgọn hải đăng mở cửa lại mùa xuân năm ngoái. Công việc vẫn Đang tiếp diễn (ongoing), vì hơi muối là một kẻ thù kiên nhẫn và trên bờ biển này không có lớp sơn nào giữ được Vĩnh viễn (permanently). Nhưng Bất cứ ai (whoever) leo lên cầu thang bây giờ đều nhìn thấy bốn mươi dặm biển, và dì tôi bảo cảnh ấy là phần thưởng Tối thượng (ultimate).',
  },
];
