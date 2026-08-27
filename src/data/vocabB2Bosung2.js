// File: src/data/vocabB2Bosung2.js
// BÙ LỖ HỔNG VỐN TỪ B2 — ĐỢT 2: 89 TỪ CHỈ "LƯỚT QUA" MÀ CHƯA HỀ ĐƯỢC DẠY.
//
// ══ NHÓM NÀY KHÁC NHÓM ĐỢT 1 THẾ NÀO ══
// Đợt 1 (`vocabB2Bosung1.js`) soạn cho những từ VẮNG HẲN — cả web không có một
// lần nào. Đợt này soạn cho nhóm âm thầm hơn và đông hơn: từ CÓ xuất hiện, nhưng
// chỉ nằm lọt trong một câu ví dụ của từ khác hoặc trong một bài đọc. Người học
// nhìn thấy chúng lướt qua, không được dạy nghĩa, không được luyện — nên gặp lại
// trong đề thi vẫn không nhận ra. Về mặt học thì đó là CHƯA HỌC.
//
// Đo 27/08/2026, đối chiếu với dải B2 của Oxford 5000:
//   378 có mục từ riêng · 86 Oxford dạy (khác khuôn) · 167 chỉ lướt qua · 69 vắng hẳn.
// Đợt 1 đã xử lý 66/69. Đợt này lấy 89 từ có giá trị dùng cao nhất trong 167 từ
// nhóm giữa; phần còn lại để đợt 3.
//
// ══ KHÔNG CHÉP DANH SÁCH CỦA OXFORD ══
// Cùng luật với đợt 1: Oxford 5000 là tuyển tập có bản quyền của OUP, thứ được
// bảo hộ là việc CHỌN và XẾP BẬC. Danh sách chỉ đóng vai bảng đối chiếu ngoài
// repo; mọi nghĩa tiếng Việt và câu ví dụ ở đây là soạn mới, và từ được xếp theo
// CHỦ ĐỀ chứ không theo thứ tự bảng chữ cái của họ.

export const vocabB2Bosung2 = [
  {
    id: 'b2-doi-song-cong-viec',
    category: 'vstep',
    // ⚠️ `level` phải là "B2" TRẦN. `bandFromLevelString` kiểm B1 TRƯỚC B2, nên
    // viết "B1-B2" sẽ khiến chặng rơi xuống bậc intermediate.
    level: 'B2',
    title: '🧩 Đời Sống, Công Việc & Mô Tả (B2)',
    description: '89 từ B2 mà kho cũ chỉ để lướt qua trong câu ví dụ: mô tả tính chất, nói về công việc, và diễn đạt mức độ chính xác hơn.',
    words: [
      // ── Mô tả tính chất, trạng thái ──────────────────────────────────────
      { en: 'distinct', vi: 'riêng biệt, rõ rệt', type: '(adj)', ipa: '/dɪˈstɪŋkt/', example: 'There are two distinct groups of learners in this class.', viExample: 'Lớp này có hai nhóm người học riêng biệt.' },
      { en: 'identical', vi: 'giống hệt nhau', type: '(adj)', ipa: '/aɪˈdentɪkl/', example: 'The two reports were almost identical.', viExample: 'Hai bản báo cáo gần như giống hệt nhau.' },
      { en: 'dominant', vi: 'chiếm ưu thế', type: '(adj)', ipa: '/ˈdɒmɪnənt/', example: 'English is the dominant language at the conference.', viExample: 'Tiếng Anh là ngôn ngữ chiếm ưu thế tại hội nghị.' },
      { en: 'dependent', vi: 'phụ thuộc', type: '(adj)', ipa: '/dɪˈpendənt/', example: 'The result is dependent on how much you practise.', viExample: 'Kết quả phụ thuộc vào việc bạn luyện tập bao nhiêu.' },
      { en: 'balanced', vi: 'cân đối, cân bằng', type: '(adj)', ipa: '/ˈbælənst/', example: 'A balanced diet includes fruit and vegetables.', viExample: 'Chế độ ăn cân đối có cả trái cây và rau.' },
      { en: 'elegant', vi: 'thanh lịch, tinh tế', type: '(adj)', ipa: '/ˈelɪɡənt/', example: 'She gave an elegant answer to a difficult question.', viExample: 'Cô ấy đưa ra một câu trả lời tinh tế cho câu hỏi khó.' },
      { en: 'fabulous', vi: 'tuyệt vời', type: '(adj)', ipa: '/ˈfæbjələs/', example: 'The view from the top was fabulous.', viExample: 'Khung cảnh từ trên đỉnh thật tuyệt vời.' },
      { en: 'memorable', vi: 'đáng nhớ', type: '(adj)', ipa: '/ˈmemərəbl/', example: 'It was the most memorable trip of my life.', viExample: 'Đó là chuyến đi đáng nhớ nhất đời tôi.' },
      { en: 'enjoyable', vi: 'thú vị, dễ chịu', type: '(adj)', ipa: '/ɪnˈdʒɔɪəbl/', example: 'The lesson was short but enjoyable.', viExample: 'Buổi học ngắn nhưng thú vị.' },
      { en: 'fond', vi: 'quý mến, thích', type: '(adj)', ipa: '/fɒnd/', example: 'She is very fond of her grandmother.', viExample: 'Cô ấy rất quý bà của mình.' },
      { en: 'fortunate', vi: 'may mắn', type: '(adj)', ipa: '/ˈfɔːtʃənət/', example: 'We were fortunate to find a seat on the train.', viExample: 'Chúng tôi may mắn tìm được chỗ ngồi trên tàu.' },
      { en: 'genuine', vi: 'thật, chân thành', type: '(adj)', ipa: '/ˈdʒenjuɪn/', example: 'He showed genuine interest in our project.', viExample: 'Anh ấy tỏ ra quan tâm thật lòng tới dự án của chúng tôi.' },
      { en: 'deadly', vi: 'chết người, nguy hiểm', type: '(adj)', ipa: '/ˈdedli/', example: 'The snake carries a deadly poison.', viExample: 'Con rắn mang nọc độc chết người.' },
      { en: 'distant', vi: 'xa xôi', type: '(adj)', ipa: '/ˈdɪstənt/', example: 'They moved to a distant village in the north.', viExample: 'Họ chuyển tới một ngôi làng xa xôi ở phía bắc.' },
      { en: 'nearby', vi: 'gần đó', type: '(adj/adv)', ipa: '/ˌnɪəˈbaɪ/', example: 'There is a nearby market that opens early.', viExample: 'Có một khu chợ gần đó mở cửa sớm.' },
      { en: 'naked', vi: 'trần, không che phủ', type: '(adj)', ipa: '/ˈneɪkɪd/', example: 'You cannot see the virus with the naked eye.', viExample: 'Bạn không thể nhìn thấy vi-rút bằng mắt thường.' },
      { en: 'automatic', vi: 'tự động', type: '(adj)', ipa: '/ˌɔːtəˈmætɪk/', example: 'The door has an automatic lock.', viExample: 'Cánh cửa có khoá tự động.' },
      { en: 'mechanical', vi: 'thuộc về cơ khí, máy móc', type: '(adj)', ipa: '/məˈkænɪkl/', example: 'The delay was caused by a mechanical fault.', viExample: 'Sự chậm trễ do một lỗi cơ khí gây ra.' },
      { en: 'dynamic', vi: 'năng động, luôn thay đổi', type: '(adj)', ipa: '/daɪˈnæmɪk/', example: 'She works in a dynamic and fast-growing company.', viExample: 'Cô ấy làm ở một công ty năng động và phát triển nhanh.' },
      { en: 'extensive', vi: 'rộng, sâu rộng', type: '(adj)', ipa: '/ɪkˈstensɪv/', example: 'He has extensive experience in teaching.', viExample: 'Anh ấy có kinh nghiệm giảng dạy sâu rộng.' },
      { en: 'challenging', vi: 'đầy thử thách', type: '(adj)', ipa: '/ˈtʃælɪndʒɪŋ/', example: 'The last exercise was the most challenging.', viExample: 'Bài tập cuối là bài khó nhất.' },
      { en: 'federal', vi: 'thuộc liên bang', type: '(adj)', ipa: '/ˈfedərəl/', example: 'The federal government funds the programme.', viExample: 'Chính phủ liên bang tài trợ chương trình này.' },
      { en: 'martial', vi: 'thuộc về võ thuật, quân sự', type: '(adj)', ipa: '/ˈmɑːʃl/', example: 'He has practised martial arts since he was six.', viExample: 'Anh ấy tập võ từ năm sáu tuổi.' },
      { en: 'newly', vi: 'mới, vừa mới', type: '(adv)', ipa: '/ˈnjuːli/', example: 'The newly opened library is always full.', viExample: 'Thư viện mới mở lúc nào cũng đông.' },

      // ── Mức độ và cách nói chính xác hơn ────────────────────────────────
      { en: 'accurately', vi: 'một cách chính xác', type: '(adv)', ipa: '/ˈækjərətli/', example: 'Please describe what you saw accurately.', viExample: 'Hãy mô tả chính xác những gì bạn đã thấy.' },
      { en: 'barely', vi: 'vừa đủ, hầu như không', type: '(adv)', ipa: '/ˈbeəli/', example: 'I could barely hear him over the noise.', viExample: 'Tôi hầu như không nghe được anh ấy vì ồn quá.' },
      { en: 'broadly', vi: 'nhìn chung, rộng rãi', type: '(adv)', ipa: '/ˈbrɔːdli/', example: 'Broadly speaking, the plan worked well.', viExample: 'Nhìn chung, kế hoạch đã hiệu quả.' },
      { en: 'critically', vi: 'một cách phê phán; nghiêm trọng', type: '(adv)', ipa: '/ˈkrɪtɪkli/', example: 'Students should read the text critically.', viExample: 'Học sinh nên đọc văn bản với tinh thần phê phán.' },
      { en: 'dramatically', vi: 'một cách mạnh mẽ, đột ngột', type: '(adv)', ipa: '/drəˈmætɪkli/', example: 'Sales rose dramatically after the advertisement.', viExample: 'Doanh số tăng mạnh sau quảng cáo.' },
      { en: 'extensively', vi: 'một cách rộng rãi', type: '(adv)', ipa: '/ɪkˈstensɪvli/', example: 'She has travelled extensively in Asia.', viExample: 'Cô ấy đã đi rất nhiều nơi ở châu Á.' },
      { en: 'firmly', vi: 'một cách chắc chắn, dứt khoát', type: '(adv)', ipa: '/ˈfɜːmli/', example: 'He firmly refused to change his mind.', viExample: 'Anh ấy dứt khoát từ chối đổi ý.' },
      { en: 'freely', vi: 'một cách tự do', type: '(adv)', ipa: '/ˈfriːli/', example: 'Students may speak freely during the discussion.', viExample: 'Học sinh được nói tự do trong buổi thảo luận.' },
      { en: 'fundamentally', vi: 'về căn bản', type: '(adv)', ipa: '/ˌfʌndəˈmentəli/', example: 'The two methods are fundamentally different.', viExample: 'Hai phương pháp khác nhau về căn bản.' },
      { en: 'genuinely', vi: 'một cách thật lòng', type: '(adv)', ipa: '/ˈdʒenjuɪnli/', example: 'I am genuinely happy for you.', viExample: 'Tôi thật lòng mừng cho bạn.' },
      { en: 'greatly', vi: 'rất nhiều', type: '(adv)', ipa: '/ˈɡreɪtli/', example: 'Her advice greatly improved my writing.', viExample: 'Lời khuyên của cô ấy cải thiện bài viết của tôi rất nhiều.' },
      { en: 'instantly', vi: 'ngay lập tức', type: '(adv)', ipa: '/ˈɪnstəntli/', example: 'She recognised his voice instantly.', viExample: 'Cô ấy nhận ra giọng anh ta ngay lập tức.' },
      { en: 'literally', vi: 'theo nghĩa đen', type: '(adv)', ipa: '/ˈlɪtərəli/', example: 'The word literally means "small house".', viExample: 'Từ này theo nghĩa đen là "ngôi nhà nhỏ".' },
      { en: 'likewise', vi: 'tương tự như vậy', type: '(adv)', ipa: '/ˈlaɪkwaɪz/', example: 'He works hard; his sister does likewise.', viExample: 'Anh ấy chăm chỉ; em gái anh cũng vậy.' },
      { en: 'additionally', vi: 'ngoài ra', type: '(adv)', ipa: '/əˈdɪʃənəli/', example: 'Additionally, the price includes breakfast.', viExample: 'Ngoài ra, giá đã bao gồm bữa sáng.' },
      { en: 'moreover', vi: 'hơn nữa', type: '(adv)', ipa: '/mɔːrˈəʊvə(r)/', example: 'The room is small; moreover, it is very noisy.', viExample: 'Phòng thì nhỏ; hơn nữa lại rất ồn.' },
      { en: 'hence', vi: 'do đó', type: '(adv)', ipa: '/hens/', example: 'The road was closed, hence the long delay.', viExample: 'Đường bị đóng, do đó mới chậm lâu như vậy.' },
      { en: 'annually', vi: 'hằng năm', type: '(adv)', ipa: '/ˈænjuəli/', example: 'The festival is held annually in April.', viExample: 'Lễ hội được tổ chức hằng năm vào tháng Tư.' },
      { en: 'frequent', vi: 'thường xuyên', type: '(adj)', ipa: '/ˈfriːkwənt/', example: 'She is a frequent visitor to this library.', viExample: 'Cô ấy là khách quen của thư viện này.' },
      { en: 'alongside', vi: 'bên cạnh, cùng với', type: '(prep)', ipa: '/əˌlɒŋˈsaɪd/', example: 'He worked alongside three other engineers.', viExample: 'Anh ấy làm việc cùng ba kỹ sư khác.' },
      { en: 'beside', vi: 'bên cạnh', type: '(prep)', ipa: '/bɪˈsaɪd/', example: 'She sat beside her brother at dinner.', viExample: 'Cô ấy ngồi cạnh em trai trong bữa tối.' },
      { en: 'besides', vi: 'ngoài ra, bên cạnh đó', type: '(prep/adv)', ipa: '/bɪˈsaɪdz/', example: 'Besides English, he speaks Japanese.', viExample: 'Ngoài tiếng Anh, anh ấy còn nói tiếng Nhật.' },

      // ── Hành động, quá trình ────────────────────────────────────────────
      { en: 'accommodate', vi: 'chứa được; đáp ứng', type: '(v)', ipa: '/əˈkɒmədeɪt/', example: 'The hall can accommodate three hundred people.', viExample: 'Hội trường chứa được ba trăm người.' },
      { en: 'boost', vi: 'thúc đẩy, tăng cường', type: '(v/n)', ipa: '/buːst/', example: 'Reading every day will boost your vocabulary.', viExample: 'Đọc mỗi ngày sẽ tăng vốn từ của bạn.' },
      { en: 'differ', vi: 'khác nhau', type: '(v)', ipa: '/ˈdɪfə(r)/', example: 'Opinions differ on how to solve the problem.', viExample: 'Các ý kiến khác nhau về cách giải quyết vấn đề.' },
      { en: 'distinguish', vi: 'phân biệt', type: '(v)', ipa: '/dɪˈstɪŋɡwɪʃ/', example: 'It is hard to distinguish the twins.', viExample: 'Rất khó phân biệt hai anh em sinh đôi.' },
      { en: 'distract', vi: 'làm phân tâm', type: '(v)', ipa: '/dɪˈstrækt/', example: 'Turn off your phone so it does not distract you.', viExample: 'Tắt điện thoại để nó không làm bạn phân tâm.' },
      { en: 'disappoint', vi: 'làm thất vọng', type: '(v)', ipa: '/ˌdɪsəˈpɔɪnt/', example: 'I hope the film does not disappoint you.', viExample: 'Tôi mong bộ phim không làm bạn thất vọng.' },
      { en: 'embrace', vi: 'ôm; đón nhận', type: '(v)', ipa: '/ɪmˈbreɪs/', example: 'The school embraced the new teaching method.', viExample: 'Nhà trường đón nhận phương pháp dạy mới.' },
      { en: 'exceed', vi: 'vượt quá', type: '(v)', ipa: '/ɪkˈsiːd/', example: 'Do not exceed the speed limit.', viExample: 'Đừng vượt quá tốc độ cho phép.' },
      { en: 'exclude', vi: 'loại trừ, không tính', type: '(v)', ipa: '/ɪkˈskluːd/', example: 'The price excludes delivery.', viExample: 'Giá này không bao gồm phí giao hàng.' },

      // ── Công việc, học thuật ────────────────────────────────────────────
      { en: 'analyst', vi: 'nhà phân tích', type: '(n)', ipa: '/ˈænəlɪst/', example: 'A market analyst explained the sudden change.', viExample: 'Một nhà phân tích thị trường giải thích sự thay đổi đột ngột.' },
      { en: 'founder', vi: 'người sáng lập', type: '(n)', ipa: '/ˈfaʊndə(r)/', example: 'The founder still runs the company today.', viExample: 'Người sáng lập vẫn điều hành công ty tới hôm nay.' },
      { en: 'expertise', vi: 'chuyên môn', type: '(n)', ipa: '/ˌekspɜːˈtiːz/', example: 'We need someone with technical expertise.', viExample: 'Chúng tôi cần người có chuyên môn kỹ thuật.' },
      { en: 'evaluation', vi: 'sự đánh giá', type: '(n)', ipa: '/ɪˌvæljuˈeɪʃn/', example: 'Each course ends with a short evaluation.', viExample: 'Mỗi khoá học kết thúc bằng một bài đánh giá ngắn.' },
      { en: 'assistance', vi: 'sự hỗ trợ', type: '(n)', ipa: '/əˈsɪstəns/', example: 'Thank you for your assistance yesterday.', viExample: 'Cảm ơn bạn đã hỗ trợ hôm qua.' },
      { en: 'completion', vi: 'sự hoàn thành', type: '(n)', ipa: '/kəmˈpliːʃn/', example: 'You get a certificate on completion of the course.', viExample: 'Bạn nhận chứng nhận khi hoàn thành khoá học.' },
      { en: 'limitation', vi: 'hạn chế', type: '(n)', ipa: '/ˌlɪmɪˈteɪʃn/', example: 'Every method has its limitations.', viExample: 'Phương pháp nào cũng có hạn chế của nó.' },
      { en: 'certainty', vi: 'sự chắc chắn', type: '(n)', ipa: '/ˈsɜːtnti/', example: 'Nobody can say with certainty what will happen.', viExample: 'Không ai có thể nói chắc chắn điều gì sẽ xảy ra.' },
      { en: 'mechanism', vi: 'cơ chế', type: '(n)', ipa: '/ˈmekənɪzəm/', example: 'The body has a natural mechanism for healing.', viExample: 'Cơ thể có cơ chế tự chữa lành.' },
      { en: 'formation', vi: 'sự hình thành', type: '(n)', ipa: '/fɔːˈmeɪʃn/', example: 'Scientists study the formation of clouds.', viExample: 'Các nhà khoa học nghiên cứu sự hình thành của mây.' },
      { en: 'fragment', vi: 'mảnh vỡ, đoạn rời', type: '(n)', ipa: '/ˈfræɡmənt/', example: 'They found a fragment of an old bowl.', viExample: 'Họ tìm thấy một mảnh vỡ của chiếc bát cổ.' },
      { en: 'coincidence', vi: 'sự trùng hợp', type: '(n)', ipa: '/kəʊˈɪnsɪdəns/', example: 'Meeting her there was a complete coincidence.', viExample: 'Gặp cô ấy ở đó hoàn toàn là trùng hợp.' },
      { en: 'input', vi: 'đầu vào, đóng góp', type: '(n)', ipa: '/ˈɪnpʊt/', example: 'We value your input on this decision.', viExample: 'Chúng tôi coi trọng đóng góp của bạn cho quyết định này.' },
      { en: 'lifetime', vi: 'cả đời', type: '(n)', ipa: '/ˈlaɪftaɪm/', example: 'This is a once-in-a-lifetime opportunity.', viExample: 'Đây là cơ hội cả đời chỉ có một lần.' },

      // ── Vật và nơi chốn ─────────────────────────────────────────────────
      { en: 'arrow', vi: 'mũi tên', type: '(n)', ipa: '/ˈærəʊ/', example: 'Follow the arrow to the exit.', viExample: 'Đi theo mũi tên để ra cửa.' },
      { en: 'artwork', vi: 'tác phẩm nghệ thuật', type: '(n)', ipa: '/ˈɑːtwɜːk/', example: 'The children hung their artwork on the wall.', viExample: 'Bọn trẻ treo tác phẩm của mình lên tường.' },
      { en: 'circuit', vi: 'mạch điện; vòng', type: '(n)', ipa: '/ˈsɜːkɪt/', example: 'A broken circuit stopped the whole machine.', viExample: 'Một mạch điện hỏng làm cả cỗ máy dừng lại.' },
      { en: 'clip', vi: 'đoạn phim ngắn; cái kẹp', type: '(n)', ipa: '/klɪp/', example: 'She shared a short clip from the concert.', viExample: 'Cô ấy chia sẻ một đoạn phim ngắn từ buổi hoà nhạc.' },
      { en: 'deck', vi: 'boong tàu; sàn', type: '(n)', ipa: '/dek/', example: 'We stood on the deck and watched the sunset.', viExample: 'Chúng tôi đứng trên boong tàu ngắm hoàng hôn.' },
      { en: 'dot', vi: 'dấu chấm', type: '(n)', ipa: '/dɒt/', example: 'Put a dot at the end of each line.', viExample: 'Đặt một dấu chấm ở cuối mỗi dòng.' },
      { en: 'firework', vi: 'pháo hoa', type: '(n)', ipa: '/ˈfaɪəwɜːk/', example: 'We watched the fireworks from the bridge.', viExample: 'Chúng tôi xem pháo hoa từ trên cầu.' },
      { en: 'globe', vi: 'quả địa cầu; toàn cầu', type: '(n)', ipa: '/ɡləʊb/', example: 'The band has fans across the globe.', viExample: 'Ban nhạc có người hâm mộ khắp toàn cầu.' },
      { en: 'herb', vi: 'thảo mộc, rau thơm', type: '(n)', ipa: '/hɜːb/', example: 'She grows herbs on the kitchen window.', viExample: 'Cô ấy trồng rau thơm ở cửa sổ bếp.' },
      { en: 'jet', vi: 'máy bay phản lực', type: '(n)', ipa: '/dʒet/', example: 'A jet flew low over the houses.', viExample: 'Một chiếc phản lực bay thấp qua các ngôi nhà.' },
      { en: 'kit', vi: 'bộ dụng cụ', type: '(n)', ipa: '/kɪt/', example: 'Keep a first-aid kit in the car.', viExample: 'Hãy để một bộ sơ cứu trong xe.' },
      { en: 'landing', vi: 'sự hạ cánh; chiếu nghỉ', type: '(n)', ipa: '/ˈlændɪŋ/', example: 'The plane made a smooth landing.', viExample: 'Máy bay hạ cánh êm ru.' },
      { en: 'darkness', vi: 'bóng tối', type: '(n)', ipa: '/ˈdɑːknəs/', example: 'We walked home in complete darkness.', viExample: 'Chúng tôi đi bộ về nhà trong bóng tối hoàn toàn.' },
      { en: 'flavour', vi: 'hương vị', type: '(n)', ipa: '/ˈfleɪvə(r)/', example: 'This soup has a strong flavour of ginger.', viExample: 'Món canh này có vị gừng đậm.' },
      { en: 'fantasy', vi: 'điều tưởng tượng', type: '(n)', ipa: '/ˈfæntəsi/', example: 'The novel mixes history with fantasy.', viExample: 'Cuốn tiểu thuyết pha trộn lịch sử với điều tưởng tượng.' },
      { en: 'gaming', vi: 'việc chơi game', type: '(n)', ipa: '/ˈɡeɪmɪŋ/', example: 'Gaming has become a serious industry.', viExample: 'Chơi game đã trở thành một ngành nghiêm túc.' },
      { en: 'cue', vi: 'tín hiệu, gợi ý', type: '(n)', ipa: '/kjuː/', example: 'The music was the cue for the dancers to enter.', viExample: 'Tiếng nhạc là tín hiệu để các vũ công bước ra.' },
      { en: 'bat', vi: 'con dơi; cây gậy', type: '(n)', ipa: '/bæt/', example: 'A bat flew out of the cave at sunset.', viExample: 'Một con dơi bay ra khỏi hang lúc hoàng hôn.' },
      { en: 'firm', vi: 'công ty; chắc chắn', type: '(n/adj)', ipa: '/fɜːm/', example: 'She joined a small law firm last year.', viExample: 'Cô ấy vào làm ở một công ty luật nhỏ năm ngoái.' },
      { en: 'instant', vi: 'khoảnh khắc; tức thì', type: '(n/adj)', ipa: '/ˈɪnstənt/', example: 'For an instant, nobody said a word.', viExample: 'Trong một khoảnh khắc, không ai nói lời nào.' },
    ],
    storyEn: '📖 PART 1: THE NIGHT SHIFT\nMinh works as an analyst at a small firm that repairs medical machines. The building can accommodate only twelve people, but the work is challenging and he enjoys it. His job is to distinguish a real fault from a false alarm, and the two are not always distinct.\n\nOne night an alarm went off at three in the morning. A warning light was blinking beside the main switch, and a single red dot moved slowly across the screen. Minh could barely read the numbers in the darkness. He checked the circuit twice, firmly refusing to guess. The fault was mechanical, not electrical, and the machine had simply exceeded its safe running time.\n\n📖 PART 2: WHAT THE JOB TEACHES\nMinh says the work has greatly changed how he thinks. Beside the technical skill, he has learned patience. Opinions differ about how fast a repair should be, and speed can distract you from the real question. Moreover, a rushed answer disappoints everyone later.\n\nHis manager once told him something he repeats to new staff. Fundamentally, she said, the machine is honest: it will not exclude information to protect itself. If you look accurately and read broadly, the answer is instantly there. Hence the rule in their workshop — check twice, guess never.',
    storyVi: '📖 PHẦN 1: CA ĐÊM\nMinh làm Nhà phân tích (analyst) tại một Công ty (firm) nhỏ chuyên sửa máy y tế. Toà nhà chỉ Chứa được (accommodate) mười hai người, nhưng công việc Đầy thử thách (challenging) và anh thích nó. Việc của anh là Phân biệt (distinguish) một lỗi thật với một báo động giả, mà hai thứ đó không phải lúc nào cũng Rõ rệt (distinct).\n\nMột đêm nọ chuông báo kêu lúc ba giờ sáng. Một đèn cảnh báo nhấp nháy Bên cạnh (beside) công tắc chính, và một Dấu chấm (dot) đỏ di chuyển chậm trên màn hình. Minh Hầu như không (barely) đọc nổi các con số trong Bóng tối (darkness). Anh kiểm tra Mạch điện (circuit) hai lần, Dứt khoát (firmly) không đoán bừa. Lỗi thuộc về Cơ khí (mechanical) chứ không phải điện, và cỗ máy chỉ đơn giản là đã Vượt quá (exceeded) thời gian chạy an toàn.\n\n📖 PHẦN 2: NGHỀ DẠY ĐIỀU GÌ\nMinh nói công việc đã thay đổi cách anh nghĩ Rất nhiều (greatly). Bên cạnh kỹ năng kỹ thuật, anh học được sự kiên nhẫn. Các ý kiến Khác nhau (differ) về việc sửa nhanh đến đâu, và tốc độ có thể Làm phân tâm (distract) khỏi câu hỏi thật. Hơn nữa (Moreover), một câu trả lời vội vàng sẽ Làm thất vọng (disappoints) tất cả mọi người về sau.\n\nQuản lý của anh từng nói một câu mà anh vẫn nhắc lại cho nhân viên mới. Về căn bản (Fundamentally), cô nói, cỗ máy rất trung thực: nó sẽ không Giấu đi (exclude) thông tin để tự bảo vệ mình. Nếu bạn nhìn Chính xác (accurately) và đọc Rộng (broadly), câu trả lời Ngay lập tức (instantly) hiện ra. Do đó (Hence) mới có quy tắc trong xưởng của họ — kiểm hai lần, không bao giờ đoán.',
  },
];
