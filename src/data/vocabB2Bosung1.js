// File: src/data/vocabB2Bosung1.js
// BÙ LỖ HỔNG VỐN TỪ B2 — ĐỢT 1: 66 TỪ CẢ WEB CHƯA HỀ CÓ.
//
// ══ VÌ SAO CÓ FILE NÀY ══
// Đo ngày 27/08/2026 bằng cách đối chiếu kho từ đang dạy với dải B2 của
// Oxford 5000 (chủ dự án cung cấp bản PDF chính thức làm bảng đối chiếu):
//
//   · 378 từ  — có mục từ riêng trong chủ đề từ vựng;
//   ·  86 từ  — giáo trình Oxford có dạy, chỉ khác khuôn (không phải mục từ);
//   · 167 từ  — CHỈ lướt qua trong câu ví dụ/bài đọc, không hề được dạy;
//   ·  69 từ  — VẮNG HẲN, cả web không xuất hiện một lần nào.
//
// File này soạn cho nhóm cuối — nhóm không thể chối cãi. Ba từ bị loại có chủ
// ý (`gay`, `sexy`, `punk`): không hợp với một web dạy tiếng Anh phổ thông cho
// người Việt, và bỏ CÓ CHỦ Ý thì không phải là thiếu. Còn 66.
//
// ══ KHÔNG CHÉP DANH SÁCH CỦA OXFORD VÀO ĐÂY ══
// Oxford 5000 là tuyển tập có bản quyền của OUP — thứ được bảo hộ là việc CHỌN
// và XẾP BẬC, không phải từng từ tiếng Anh. Nên danh sách chỉ đóng vai bảng đối
// chiếu ngoài repo; mọi nghĩa tiếng Việt và mọi câu ví dụ dưới đây là soạn mới,
// và các từ được xếp theo CHỦ ĐỀ chứ không theo thứ tự bảng chữ cái của họ.
//
// ══ VÌ SAO KHÔNG SINH HÀNG LOẠT ══
// Luật GIỮ/XÓA của dự án: giữ nội dung soạn tay, xoá nội dung sinh theo khuôn.
// Mỗi mục dưới đây có nghĩa riêng và câu ví dụ riêng, không phải một khuôn câu
// thay chỗ trống — vì đó chính là loại nội dung dự án đã mất một đợt để dọn.

export const vocabB2Bosung1 = [
  {
    id: 'b2-nhan-dinh-su-viec',
    category: 'vstep',
    title: '🧭 Nhận Định & Sự Việc (B2)',
    // ⚠️ `level` phải là "B2" TRẦN, không được viết "B1-B2":
    // `bandFromLevelString` kiểm B1 TRƯỚC B2, nên chuỗi "B1-B2" sẽ rơi xuống
    // bậc intermediate và chặng này biến mất khỏi bậc B2 — đúng loại lỗi xếp
    // nhầm bậc mà `BAC_CUA_CHUYEN_DE` sinh ra để chặn.
    level: 'B2',
    description: '66 từ B2 mà kho cũ chưa hề có: cách nêu nhận định, đo mức độ, và gọi tên người - vật - sự việc trong đời sống và công việc.',
    words: [
      // ── Nêu nhận định, đánh giá ──────────────────────────────────────────
      { en: 'adequate', vi: 'đủ dùng, đạt mức tối thiểu', type: '(adj)', ipa: '/ˈædɪkwət/', example: 'The room was small but adequate for two people.', viExample: 'Căn phòng nhỏ nhưng đủ cho hai người.' },
      { en: 'adequately', vi: 'một cách đủ mức', type: '(adv)', ipa: '/ˈædɪkwətli/', example: 'The staff were not adequately trained for the job.', viExample: 'Nhân viên chưa được đào tạo đủ mức cho công việc này.' },
      { en: 'sufficiently', vi: 'đủ đến mức cần thiết', type: '(adv)', ipa: '/səˈfɪʃntli/', example: 'She spoke slowly enough for us to understand sufficiently.', viExample: 'Cô ấy nói chậm đủ để chúng tôi hiểu được.' },
      { en: 'reasonably', vi: 'khá, ở mức hợp lý', type: '(adv)', ipa: '/ˈriːznəbli/', example: 'The hotel was reasonably clean for the price.', viExample: 'Khách sạn khá sạch so với giá tiền.' },
      { en: 'remarkably', vi: 'đáng chú ý, một cách rõ rệt', type: '(adv)', ipa: '/rɪˈmɑːkəbli/', example: 'For a beginner, his accent is remarkably clear.', viExample: 'Với người mới học, phát âm của cậu ấy rõ một cách đáng chú ý.' },
      { en: 'terribly', vi: 'cực kỳ, tệ hại', type: '(adv)', ipa: '/ˈterəbli/', example: 'I am terribly sorry for the delay.', viExample: 'Tôi vô cùng xin lỗi vì sự chậm trễ.' },
      { en: 'desperately', vi: 'một cách tuyệt vọng, rất cần', type: '(adv)', ipa: '/ˈdespərətli/', example: 'The village desperately needs clean water.', viExample: 'Ngôi làng đang rất cần nước sạch.' },
      { en: 'emotionally', vi: 'về mặt cảm xúc', type: '(adv)', ipa: '/ɪˈməʊʃənəli/', example: 'The film was emotionally exhausting to watch.', viExample: 'Bộ phim xem xong thấy kiệt sức về mặt cảm xúc.' },
      { en: 'essentially', vi: 'về cơ bản, xét cho cùng', type: '(adv)', ipa: '/ɪˈsenʃəli/', example: 'The two plans are essentially the same.', viExample: 'Hai kế hoạch về cơ bản là giống nhau.' },
      { en: 'inevitably', vi: 'tất yếu, không tránh khỏi', type: '(adv)', ipa: '/ɪnˈevɪtəbli/', example: 'Prices inevitably rise when fuel costs go up.', viExample: 'Giá cả tất yếu tăng khi chi phí nhiên liệu lên.' },
      { en: 'somehow', vi: 'bằng cách nào đó', type: '(adv)', ipa: '/ˈsʌmhaʊ/', example: 'We got lost but somehow arrived on time.', viExample: 'Chúng tôi lạc đường nhưng bằng cách nào đó vẫn đến đúng giờ.' },
      { en: 'hopefully', vi: 'hy vọng là', type: '(adv)', ipa: '/ˈhəʊpfəli/', example: 'Hopefully the rain will stop before the match.', viExample: 'Hy vọng là mưa sẽ tạnh trước trận đấu.' },
      { en: 'appropriately', vi: 'một cách phù hợp', type: '(adv)', ipa: '/əˈprəʊpriətli/', example: 'Please dress appropriately for the interview.', viExample: 'Hãy ăn mặc phù hợp khi đi phỏng vấn.' },
      { en: 'evident', vi: 'rõ ràng, thấy rõ', type: '(adj)', ipa: '/ˈevɪdənt/', example: 'It was evident from her face that something was wrong.', viExample: 'Nhìn mặt cô ấy là thấy rõ có chuyện không ổn.' },
      { en: 'convincing', vi: 'thuyết phục', type: '(adj)', ipa: '/kənˈvɪnsɪŋ/', example: 'His excuse was not very convincing.', viExample: 'Lời biện hộ của anh ta không thuyết phục lắm.' },
      { en: 'astonishing', vi: 'gây kinh ngạc', type: '(adj)', ipa: '/əˈstɒnɪʃɪŋ/', example: 'She learned the whole song in an astonishing ten minutes.', viExample: 'Cô ấy thuộc cả bài hát chỉ trong mười phút đáng kinh ngạc.' },
      { en: 'amusing', vi: 'buồn cười, thú vị', type: '(adj)', ipa: '/əˈmjuːzɪŋ/', example: 'He told an amusing story about his first day at work.', viExample: 'Anh ấy kể một câu chuyện buồn cười về ngày đầu đi làm.' },
      { en: 'hilarious', vi: 'cực kỳ hài hước', type: '(adj)', ipa: '/hɪˈleəriəs/', example: 'The ending of the play was absolutely hilarious.', viExample: 'Đoạn kết vở kịch cực kỳ hài hước.' },
      { en: 'awkward', vi: 'ngượng nghịu, khó xử', type: '(adj)', ipa: '/ˈɔːkwəd/', example: 'There was an awkward silence after his question.', viExample: 'Có một khoảng im lặng khó xử sau câu hỏi của anh ta.' },
      { en: 'nasty', vi: 'khó chịu, tồi tệ', type: '(adj)', ipa: '/ˈnɑːsti/', example: 'She had a nasty fall on the stairs.', viExample: 'Cô ấy ngã một cú khá nặng trên cầu thang.' },
      { en: 'unfortunate', vi: 'không may', type: '(adj)', ipa: '/ʌnˈfɔːtʃənət/', example: 'It was unfortunate that the train was cancelled.', viExample: 'Thật không may là chuyến tàu bị huỷ.' },
      { en: 'colourful', vi: 'nhiều màu sắc, sinh động', type: '(adj)', ipa: '/ˈkʌləfl/', example: 'The market was full of colourful fruit.', viExample: 'Khu chợ đầy trái cây nhiều màu sắc.' },
      { en: 'altogether', vi: 'tổng cộng; hoàn toàn', type: '(adv)', ipa: '/ˌɔːltəˈɡeðə(r)/', example: 'There were twelve of us altogether.', viExample: 'Tổng cộng chúng tôi có mười hai người.' },
      { en: 'aside', vi: 'sang một bên', type: '(adv)', ipa: '/əˈsaɪd/', example: 'He stepped aside to let the nurse pass.', viExample: 'Anh ấy bước sang một bên để y tá đi qua.' },

      // ── Thời gian, thứ tự, mức độ dài ngắn ──────────────────────────────
      { en: 'formerly', vi: 'trước đây', type: '(adv)', ipa: '/ˈfɔːməli/', example: 'The building was formerly a train station.', viExample: 'Toà nhà này trước đây là một nhà ga.' },
      { en: 'subsequent', vi: 'tiếp sau đó', type: '(adj)', ipa: '/ˈsʌbsɪkwənt/', example: 'The first test failed, and subsequent attempts also failed.', viExample: 'Lần thử đầu thất bại, và những lần sau đó cũng vậy.' },
      { en: 'interval', vi: 'khoảng cách thời gian; giờ nghỉ', type: '(n)', ipa: '/ˈɪntəvl/', example: 'Take the medicine at four-hour intervals.', viExample: 'Uống thuốc cách nhau bốn tiếng.' },
      { en: 'short-term', vi: 'ngắn hạn', type: '(adj)', ipa: '/ˌʃɔːt ˈtɜːm/', example: 'This is only a short-term solution to the problem.', viExample: 'Đây chỉ là giải pháp ngắn hạn cho vấn đề.' },

      // ── Hành động, việc làm ─────────────────────────────────────────────
      { en: 'anticipate', vi: 'dự đoán, lường trước', type: '(v)', ipa: '/ænˈtɪsɪpeɪt/', example: 'We anticipate more customers during the holiday.', viExample: 'Chúng tôi dự đoán sẽ có nhiều khách hơn vào dịp lễ.' },
      { en: 'undertake', vi: 'nhận làm, đảm nhận', type: '(v)', ipa: '/ˌʌndəˈteɪk/', example: 'The company agreed to undertake the repairs.', viExample: 'Công ty đồng ý nhận sửa chữa.' },
      { en: 'comprise', vi: 'gồm có, tạo thành', type: '(v)', ipa: '/kəmˈpraɪz/', example: 'The course comprises ten lessons and one final test.', viExample: 'Khoá học gồm mười bài và một bài kiểm tra cuối.' },
      { en: 'fulfil', vi: 'hoàn thành, thực hiện được', type: '(v)', ipa: '/fʊlˈfɪl/', example: 'She finally fulfilled her dream of studying abroad.', viExample: 'Cuối cùng cô ấy cũng thực hiện được giấc mơ du học.' },
      { en: 'equip', vi: 'trang bị', type: '(v)', ipa: '/ɪˈkwɪp/', example: 'Every classroom is equipped with a projector.', viExample: 'Mỗi phòng học đều được trang bị một máy chiếu.' },
      { en: 'suspend', vi: 'tạm ngừng; đình chỉ', type: '(v)', ipa: '/səˈspend/', example: 'Bus services were suspended because of the storm.', viExample: 'Các tuyến xe buýt bị tạm ngừng vì bão.' },
      { en: 'unfold', vi: 'mở ra; dần hé lộ', type: '(v)', ipa: '/ʌnˈfəʊld/', example: 'We watched the story unfold on the news.', viExample: 'Chúng tôi theo dõi câu chuyện dần hé lộ trên bản tin.' },
      { en: 'spoil', vi: 'làm hỏng; nuông chiều', type: '(v)', ipa: '/spɔɪl/', example: 'Do not tell me the ending — you will spoil the film.', viExample: 'Đừng kể đoạn kết, cậu sẽ làm hỏng bộ phim mất.' },
      { en: 'dare', vi: 'dám', type: '(v)', ipa: '/deə(r)/', example: 'Nobody dared to ask him what happened.', viExample: 'Không ai dám hỏi anh ta chuyện gì đã xảy ra.' },
      { en: 'reckon', vi: 'cho rằng, tính rằng', type: '(v)', ipa: '/ˈrekən/', example: 'I reckon we will be there by six.', viExample: 'Tôi cho là chúng ta sẽ đến đó lúc sáu giờ.' },
      { en: 'dive', vi: 'lặn, lao xuống', type: '(v)', ipa: '/daɪv/', example: 'He dived into the pool without hesitating.', viExample: 'Anh ấy lao xuống bể bơi không chút do dự.' },
      { en: 'fool', vi: 'kẻ khờ; lừa gạt', type: '(n/v)', ipa: '/fuːl/', example: 'Do not let anyone fool you with that trick.', viExample: 'Đừng để ai lừa bạn bằng trò đó.' },

      // ── Người và vai trò ────────────────────────────────────────────────
      { en: 'consultant', vi: 'chuyên gia tư vấn', type: '(n)', ipa: '/kənˈsʌltənt/', example: 'The school hired a consultant to improve its website.', viExample: 'Trường thuê một chuyên gia tư vấn để cải thiện trang web.' },
      { en: 'inspector', vi: 'thanh tra viên', type: '(n)', ipa: '/ɪnˈspektə(r)/', example: 'A health inspector visits the restaurant twice a year.', viExample: 'Một thanh tra y tế đến nhà hàng hai lần mỗi năm.' },
      { en: 'dealer', vi: 'người buôn bán, đại lý', type: '(n)', ipa: '/ˈdiːlə(r)/', example: 'We bought the car from a local dealer.', viExample: 'Chúng tôi mua xe từ một đại lý địa phương.' },
      { en: 'collector', vi: 'người sưu tầm', type: '(n)', ipa: '/kəˈlektə(r)/', example: 'My uncle is a collector of old coins.', viExample: 'Chú tôi là người sưu tầm tiền xu cổ.' },
      { en: 'settler', vi: 'người đến định cư', type: '(n)', ipa: '/ˈsetlə(r)/', example: 'The first settlers built their homes near the river.', viExample: 'Những người định cư đầu tiên dựng nhà gần con sông.' },

      // ── Vật và đồ dùng ──────────────────────────────────────────────────
      { en: 'badge', vi: 'phù hiệu, thẻ tên', type: '(n)', ipa: '/bædʒ/', example: 'All staff must wear a name badge.', viExample: 'Toàn bộ nhân viên phải đeo thẻ tên.' },
      { en: 'ink', vi: 'mực', type: '(n)', ipa: '/ɪŋk/', example: 'The printer has run out of black ink.', viExample: 'Máy in đã hết mực đen.' },
      { en: 'hook', vi: 'cái móc', type: '(n)', ipa: '/hʊk/', example: 'Hang your coat on the hook behind the door.', viExample: 'Treo áo khoác lên cái móc sau cánh cửa.' },
      { en: 'outfit', vi: 'bộ trang phục', type: '(n)', ipa: '/ˈaʊtfɪt/', example: 'She wore a bright outfit to the party.', viExample: 'Cô ấy mặc một bộ trang phục sáng màu đến bữa tiệc.' },
      { en: 'tag', vi: 'nhãn, mác', type: '(n)', ipa: '/tæɡ/', example: 'The price tag was still on the shirt.', viExample: 'Cái mác giá vẫn còn trên chiếc áo.' },
      { en: 'skull', vi: 'hộp sọ', type: '(n)', ipa: '/skʌl/', example: 'The museum displays the skull of a whale.', viExample: 'Bảo tàng trưng bày hộp sọ của một con cá voi.' },
      { en: 'graphics', vi: 'đồ hoạ', type: '(n)', ipa: '/ˈɡræfɪks/', example: 'The graphics in this game look very real.', viExample: 'Đồ hoạ trong trò chơi này trông rất thật.' },

      // ── Sự việc, khái niệm ──────────────────────────────────────────────
      { en: 'questionnaire', vi: 'bảng câu hỏi khảo sát', type: '(n)', ipa: '/ˌkwestʃəˈneə(r)/', example: 'Please complete the questionnaire before you leave.', viExample: 'Vui lòng điền bảng câu hỏi trước khi ra về.' },
      { en: 'convention', vi: 'hội nghị; thông lệ', type: '(n)', ipa: '/kənˈvenʃn/', example: 'Thousands of teachers attended the convention.', viExample: 'Hàng nghìn giáo viên đã dự hội nghị.' },
      { en: 'conspiracy', vi: 'âm mưu', type: '(n)', ipa: '/kənˈspɪrəsi/', example: 'The article claimed there was a conspiracy to hide the truth.', viExample: 'Bài báo cho rằng có một âm mưu che giấu sự thật.' },
      { en: 'disappointment', vi: 'sự thất vọng', type: '(n)', ipa: '/ˌdɪsəˈpɔɪntmənt/', example: 'Losing the final was a huge disappointment.', viExample: 'Thua trận chung kết là một nỗi thất vọng lớn.' },
      { en: 'significance', vi: 'tầm quan trọng, ý nghĩa', type: '(n)', ipa: '/sɪɡˈnɪfɪkəns/', example: 'Few people understood the significance of the discovery.', viExample: 'Ít người hiểu được tầm quan trọng của phát hiện đó.' },
      { en: 'stance', vi: 'lập trường', type: '(n)', ipa: '/stæns/', example: 'The government has not changed its stance on the issue.', viExample: 'Chính phủ chưa thay đổi lập trường về vấn đề này.' },
      { en: 'scenario', vi: 'kịch bản, tình huống giả định', type: '(n)', ipa: '/səˈnɑːriəʊ/', example: 'In the worst scenario, the whole system stops working.', viExample: 'Trong tình huống xấu nhất, cả hệ thống ngừng hoạt động.' },
      { en: 'ownership', vi: 'quyền sở hữu', type: '(n)', ipa: '/ˈəʊnəʃɪp/', example: 'Ownership of the land is still unclear.', viExample: 'Quyền sở hữu mảnh đất vẫn chưa rõ ràng.' },
      { en: 'extension', vi: 'phần mở rộng; sự gia hạn', type: '(n)', ipa: '/ɪkˈstenʃn/', example: 'She asked for an extension to finish the report.', viExample: 'Cô ấy xin gia hạn để hoàn thành báo cáo.' },
      { en: 'gig', vi: 'buổi diễn; việc làm ngắn hạn', type: '(n)', ipa: '/ɡɪɡ/', example: 'The band played a small gig in a local café.', viExample: 'Ban nhạc chơi một buổi diễn nhỏ ở quán cà phê địa phương.' },
      { en: 'sporting', vi: 'thuộc về thể thao', type: '(adj)', ipa: '/ˈspɔːtɪŋ/', example: 'The city hosts several sporting events each year.', viExample: 'Thành phố tổ chức vài sự kiện thể thao mỗi năm.' },
      { en: 'bound', vi: 'chắc chắn sẽ; bị buộc', type: '(adj)', ipa: '/baʊnd/', example: 'If you practise daily, you are bound to improve.', viExample: 'Nếu luyện mỗi ngày, bạn chắc chắn sẽ tiến bộ.' },

      // ── Đơn vị đo ───────────────────────────────────────────────────────
      { en: 'ton', vi: 'tấn (đơn vị Anh/Mỹ)', type: '(n)', ipa: '/tʌn/', example: 'The truck can carry up to ten tons of rice.', viExample: 'Chiếc xe tải chở được tới mười tấn gạo.' },
      { en: 'tonne', vi: 'tấn (hệ mét, 1000 kg)', type: '(n)', ipa: '/tʌn/', example: 'The factory produces two hundred tonnes of paper a month.', viExample: 'Nhà máy sản xuất hai trăm tấn giấy mỗi tháng.' },
    ],
    storyEn: '📖 PART 1: THE SCHOOL SURVEY\nLast spring our school hired a consultant to find out why so few students joined the sports club. She began by handing every class a short questionnaire. The questions were simple, and the answers were adequate for a first look, but she reckoned that numbers alone would not be convincing. So she sat with us during the interval between lessons and simply listened.\n\nWhat she heard was astonishing. Students did not dislike sport at all. The real problem was the changing room: it had one broken hook, no mirror, and a nasty smell that nobody dared to mention. Formerly the room had been a store cupboard, and it had never been properly equipped. It was evident that the club was losing members for a reason nobody had anticipated.\n\n📖 PART 2: WHAT CHANGED\nThe report she wrote comprised only four pages, but its significance was clear. The school suspended all spending on new equipment for one term and spent the money on the changing room instead. Subsequent weeks brought a remarkably quick change. Students arrived in colourful outfits, wore their name badges without complaining, and the club grew from twelve members to forty altogether.\n\nThe consultant said something we still repeat. A short-term fix, she told us, is bound to fail if you have not understood the real question. Ask people appropriately, listen sufficiently, and the answer will unfold on its own.',
    storyVi: '📖 PHẦN 1: CUỘC KHẢO SÁT Ở TRƯỜNG\nMùa xuân năm ngoái trường tôi thuê một Chuyên gia tư vấn (consultant) để tìm hiểu vì sao rất ít học sinh tham gia câu lạc bộ thể thao. Cô bắt đầu bằng việc phát cho mỗi lớp một Bảng câu hỏi (questionnaire) ngắn. Câu hỏi đơn giản, và câu trả lời cũng Đủ dùng (adequate) cho một cái nhìn ban đầu, nhưng cô Cho rằng (reckoned) chỉ riêng con số thì không Thuyết phục (convincing). Vậy nên cô ngồi lại với chúng tôi trong Giờ nghỉ (interval) giữa các tiết và chỉ lắng nghe.\n\nĐiều cô nghe được thật Đáng kinh ngạc (astonishing). Học sinh không hề ghét thể thao. Vấn đề thật nằm ở phòng thay đồ: một cái Móc (hook) bị gãy, không gương, và một mùi Khó chịu (nasty) mà không ai Dám (dared) nhắc tới. Trước đây (Formerly) căn phòng vốn là kho chứa đồ, và chưa bao giờ được Trang bị (equipped) tử tế. Rõ ràng (It was evident) là câu lạc bộ mất thành viên vì một lý do không ai Lường trước (anticipated).\n\n📖 PHẦN 2: ĐIỀU ĐÃ THAY ĐỔI\nBản báo cáo cô viết chỉ Gồm (comprised) bốn trang, nhưng Tầm quan trọng (significance) của nó thì rất rõ. Trường Tạm ngừng (suspended) mọi khoản chi cho thiết bị mới trong một học kỳ và dồn tiền vào phòng thay đồ. Những tuần Tiếp sau đó (Subsequent) mang lại thay đổi nhanh một cách Đáng chú ý (remarkably). Học sinh đến trong những Bộ trang phục (outfits) Nhiều màu sắc (colourful), đeo Thẻ tên (badges) mà không kêu ca, và câu lạc bộ tăng từ mười hai lên Tổng cộng (altogether) bốn mươi thành viên.\n\nChuyên gia tư vấn nói một câu chúng tôi vẫn nhắc lại. Một giải pháp Ngắn hạn (short-term), cô bảo, Chắc chắn sẽ (is bound to) thất bại nếu bạn chưa hiểu câu hỏi thật. Hãy hỏi người ta một cách Phù hợp (appropriately), lắng nghe Đủ mức (sufficiently), rồi câu trả lời sẽ tự Hé lộ (unfold).',
  },
];
