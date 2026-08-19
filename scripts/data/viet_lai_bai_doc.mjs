// File: scripts/data/viet_lai_bai_doc.mjs
// BÀI ĐỌC VIẾT LẠI CHO CÁC CHẶNG BỊ XẾP LÀ "DIỄU HÀNH TỪ VỰNG".
//
// ══ VÌ SAO CÓ FILE NÀY ══
// 34 chặng A1/A2 (11 A1 · 23 A2) có bài đọc là văn sinh ra để PHỦ HẾT danh sách
// từ vựng của chủ đề: "you can see a tall tree with a green leaf and a beautiful
// flower". Không mệnh đề nào để hỏi, nên chúng mang tấm băng cảnh báo cam "chưa
// có câu hỏi về bài đọc" — và tấm băng đó đúng, không được tắt bằng bốn câu hỏi
// kiến thức chung. Lý do đích danh từng chặng: `scripts/data/a1a2_phan_loai.mjs`.
//
// ══ CÁCH VIẾT LẠI ══
// Giữ nguyên VIỆC CỦA BÀI (cho người học gặp từ vựng của chủ đề) nhưng đổi HÌNH
// của bài: từ danh mục định nghĩa sang một cảnh có nhân vật và có việc xảy ra.
// Bài mới vẫn dùng từ của chủ đề, chỉ khác là mỗi từ nằm trong một câu KỂ được
// chuyện gì, nên hỏi vào đó là hỏi về bài chứ không phải hỏi về thế giới.
//
// ══ VÌ SAO LƯU THÀNH MẢNG CÂU, KHÔNG PHẢI MỘT CHUỖI ══
// `tests/story_quiz.test.js` đòi mỗi `dan` phải là chuỗi CHÉP NGUYÊN VĂN từ
// `storyEn`. Nếu bài là một chuỗi dài và `dan` gõ lại bằng tay thì sai một dấu
// phẩy là hỏng — và đợt A2 vừa rồi đã phải chép bằng máy để tránh đúng chuyện đó
// (dấu gạch ngang, nháy đơn lồng trong nháy kép).
//
// Ở đây chặn tận gốc: bài là MẢNG CÂU, `storyEn` do máy nối lại, và mỗi câu hỏi
// trỏ tới câu căn cứ BẰNG CHỈ SỐ. Không còn chỗ nào để gõ sai, vì không còn chỗ
// nào phải gõ lại.
//
// `vi` là mảng câu tiếng Việt SONG SONG, cùng số lượng và cùng thứ tự. Bài đọc
// nào cũng có `storyVi` hiện cho người học; đổi tiếng Anh mà để nguyên tiếng
// Việt thì bản dịch đang tả một bài khác — đúng kiểu "thay thế âm thầm" mà dự án
// cấm. `scripts/viet_lai_bai_doc.mjs` kiểm hai mảng khớp số lượng trước khi ghi.

/**
 * @typedef {object} BaiVietLai
 * @property {string[]} en  câu tiếng Anh, nối bằng một dấu cách thành storyEn
 * @property {string[]} vi  câu tiếng Việt song song, cùng số lượng
 * @property {{q: string, options: string[], answer: number, cau: number}[]} hoi
 *   `cau` = chỉ số câu trong `en` dùng làm căn cứ nguyên văn
 */

/** @type {Record<string, BaiVietLai>} */
export const VIET_LAI = {
  // ── ĐỢT BA 19/08: 6 chặng A2 (đợt A2 thứ nhất) ───────────────────────────
  // 11 chặng A1 đã ghi vào src/data (commit 9b745eb, 8366b68) nên không giữ ở đây.
  //
  // ⚠️ RÀNG BUỘC RIÊNG CỦA BẬC A2: nhiều chặng TRÙNG ĐỀ TÀI (bốn bài thời tiết,
  // hai bài thiên nhiên, hai bài công nghệ, hai bài sở thích, hai bài sức khỏe,
  // hai bài giải trí, hai bài giao thông, hai bài văn hóa). Chính chỗ trùng đó là
  // lý do bản cũ đọc xong không phân biệt được bài nào nói gì. Nên mỗi bài viết
  // lại phải là một CẢNH KHÁC HẲN, không chỉ đổi câu chữ: chó lạc ở gầm cầu thang,
  // bà bảy mươi tám học gọi video, năm đứa tranh nhau chiều thứ Bảy, tìm đồ cưới
  // với ít tiền, chuyển nhà mà sofa không lên được, bố đi khám sau mười chín năm.
  'animals-nature-daily': {
    en: [
      'Two years ago a thin brown dog started sleeping under the stairs of our building.',
      'Nobody owned him, and the man on the ground floor wanted him gone before the rain came.',
      'My sister and I fed him rice and fish for a week, and by the end of it he waited for us at four o\'clock.',
      'We took him to a shelter across the river, where a woman called Chi looks after fourteen dogs and nine cats.',
      'She told us the shelter refuses no animal, but it can only pay for medicine, not for food.',
      'The dog had an insect problem in his fur, and it took three baths before his skin stopped hurting him.',
      'Chi said his teeth showed he was about four years old, not a puppy as we had thought.',
      'While we were there a farmer arrived with a young goat that had broken its leg on a wire fence.',
      'Chi keeps farm animals in a separate field, because a frightened cow is more dangerous than any wild animal she has met.',
      'She has never been bitten by a dog, but a duck once cut her hand with its beak.',
      'The shelter also takes birds, and there was a parrot that had lived in a cage for eleven years.',
      'It could say two words in Vietnamese, and Chi said it would never learn to fly properly.',
      'Our dog was taken by a family from the next district after five weeks, and they sent us a photograph.',
      'In the photograph he is lying on a tiled floor, and he is clearly much fatter than before.',
      'My sister still visits the shelter every month, and she says the hardest part is the animals nobody asks about.',
    ],
    vi: [
      'Hai năm trước một con chó nâu gầy bắt đầu ngủ dưới gầm cầu thang khu nhà tôi.',
      'Không ai nhận nó, và ông ở tầng một muốn nó đi khỏi trước khi mùa mưa tới.',
      'Tôi và em gái cho nó ăn cơm với cá suốt một tuần, và tới cuối tuần đó nó đã chờ chúng tôi lúc bốn giờ.',
      'Chúng tôi đưa nó tới một trại cứu hộ bên kia sông, nơi một cô tên Chi trông mười bốn con chó và chín con mèo.',
      'Cô nói trại không từ chối con vật nào, nhưng chỉ trả được tiền thuốc, không trả được tiền ăn.',
      'Con chó bị côn trùng trong bộ lông, và phải tắm ba lần thì da nó mới hết đau.',
      'Cô Chi nói răng nó cho thấy nó khoảng bốn tuổi, không phải chó con như chúng tôi tưởng.',
      'Lúc chúng tôi ở đó, một người nông dân tới với một con dê non bị gãy chân vì hàng rào dây thép.',
      'Cô Chi để động vật trang trại ở một khu riêng, vì một con bò hoảng sợ còn nguy hiểm hơn bất cứ con vật hoang dã nào cô từng gặp.',
      'Cô chưa bao giờ bị chó cắn, nhưng có một lần một con vịt làm xước tay cô bằng cái mỏ.',
      'Trại cũng nhận chim, và ở đó có một con vẹt đã sống trong lồng mười một năm.',
      'Nó nói được hai chữ tiếng Việt, và cô Chi nói nó sẽ không bao giờ bay được cho tử tế.',
      'Con chó của chúng tôi được một gia đình ở quận bên nhận sau năm tuần, và họ gửi cho chúng tôi một bức ảnh.',
      'Trong ảnh nó đang nằm trên sàn gạch, và rõ ràng nó béo hơn trước rất nhiều.',
      'Em gái tôi vẫn tới trại mỗi tháng, và em nói chỗ khó nhất là những con vật không ai hỏi tới.',
    ],
    hoi: [
      {
        q: 'Trại cứu hộ của cô Chi trả được tiền gì, và không trả được tiền gì?',
        options: ['Trả được tiền thuốc, không trả được tiền ăn', 'Trả được tiền ăn, không trả được tiền thuốc', 'Trả được cả tiền ăn lẫn tiền thuốc cho con vật', 'Không trả được gì, tất cả nhờ người tới cho'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Cô Chi biết con chó khoảng bốn tuổi nhờ vào đâu?',
        options: ['Nhờ nhìn răng của nó', 'Nhờ nhìn bộ lông của nó', 'Nhờ người ở tầng một kể lại', 'Nhờ ảnh gia đình nhận nuôi gửi'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Theo cô Chi, vì sao động vật trang trại phải để ở khu riêng?',
        options: ['Vì một con bò hoảng sợ còn nguy hiểm hơn con vật hoang dã', 'Vì chúng có thể làm chó và mèo trong trại bị bệnh', 'Vì người nông dân sẽ tới nhận chúng về sau vài tuần nữa', 'Vì chúng cần một khu đất rộng hơn để đi lại tự do'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Cô Chi từng bị con vật nào làm xước tay?',
        options: ['Một con vịt, bằng cái mỏ', 'Một con chó, bằng hàm răng', 'Một con dê, bằng cái sừng', 'Một con vẹt, bằng móng chân'],
        answer: 0,
        cau: 9,
      },
    ],
  },
  'technology-internet-daily': {
    en: [
      'My grandmother is seventy-eight, and last year she asked me to teach her to use a smartphone.',
      'She wanted one thing only: to see my cousin\'s face, because he works in Japan and calls twice a month.',
      'The first problem was not the internet; it was that she could not feel the difference between a tap and a long press.',
      'I wrote the four steps on paper and taped the paper to the wall beside her chair.',
      'For two weeks she called me instead of my cousin, because both names begin with the same letter.',
      'Then she learned to turn the wifi on herself, and after that she stopped asking me anything.',
      'In March a message arrived saying her bank account would close unless she typed her password into a website.',
      'She did not type it; she took a photograph of the message and sent it to me first.',
      'I told her it was a trick, and she said she already knew, because her bank never writes in that tone.',
      'Now she watches cooking videos every evening, and she has started leaving comments on them.',
      'One of her comments received sixty replies, which she found more surprising than the video call.',
      'Her battery runs out by two in the afternoon, because she never closes anything.',
      'I showed her how to close an app, and she said she prefers to plug the charger in instead.',
      'Last month she asked me how to send a photograph to two people at the same time.',
      'I no longer explain the internet to her; I explain only the button she is looking for.',
    ],
    vi: [
      'Bà tôi bảy mươi tám tuổi, và năm ngoái bà nhờ tôi dạy bà dùng điện thoại thông minh.',
      'Bà chỉ muốn một việc: thấy mặt anh họ tôi, vì anh làm ở Nhật và gọi về hai lần mỗi tháng.',
      'Vấn đề đầu tiên không phải internet; mà là bà không cảm được khác nhau giữa chạm nhẹ và giữ lâu.',
      'Tôi viết bốn bước ra giấy và dán tờ giấy lên tường cạnh ghế bà ngồi.',
      'Suốt hai tuần bà gọi tôi thay vì gọi anh họ, vì hai cái tên bắt đầu bằng cùng một chữ.',
      'Rồi bà tự bật được wifi, và sau đó bà không hỏi tôi gì nữa.',
      'Tháng Ba có một tin nhắn tới nói tài khoản ngân hàng của bà sẽ bị đóng nếu bà không nhập mật khẩu vào một trang web.',
      'Bà không nhập; bà chụp ảnh cái tin nhắn đó rồi gửi cho tôi trước.',
      'Tôi nói đó là một cái bẫy, và bà bảo bà biết rồi, vì ngân hàng của bà không bao giờ viết bằng cái giọng đó.',
      'Giờ tối nào bà cũng xem video nấu ăn, và bà đã bắt đầu để lại bình luận dưới đó.',
      'Một bình luận của bà nhận được sáu mươi lời trả lời, chuyện mà bà thấy lạ hơn cả cuộc gọi video.',
      'Pin của bà hết vào khoảng hai giờ chiều, vì bà không bao giờ tắt cái gì.',
      'Tôi chỉ bà cách tắt một ứng dụng, và bà nói bà thích cắm sạc hơn.',
      'Tháng trước bà hỏi tôi cách gửi một bức ảnh cho hai người cùng một lúc.',
      'Tôi không giải thích internet cho bà nữa; tôi chỉ giải thích đúng cái nút bà đang tìm.',
    ],
    hoi: [
      {
        q: 'Vấn đề đầu tiên khi bà học dùng điện thoại là gì?',
        options: ['Bà không cảm được khác nhau giữa chạm nhẹ và giữ lâu', 'Bà không biết cách bật wifi trên máy của mình', 'Bà không nhớ được mật khẩu tài khoản ngân hàng của bà', 'Bà không phân biệt được tên tôi với tên anh họ'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Vì sao suốt hai tuần bà gọi cho người kể thay vì gọi anh họ?',
        options: ['Vì hai cái tên bắt đầu bằng cùng một chữ', 'Vì anh họ chỉ gọi về hai lần mỗi tháng', 'Vì bà chưa tự bật được wifi trên máy', 'Vì tờ giấy dán trên tường ghi sai bước'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Khi nhận tin nhắn đòi nhập mật khẩu, bà đã làm gì?',
        options: ['Chụp ảnh tin nhắn rồi gửi cho người kể trước', 'Nhập mật khẩu vào trang web đó rồi mới hỏi', 'Gọi ngay cho ngân hàng để hỏi cho chắc', 'Xóa tin nhắn đi và không kể với ai cả'],
        answer: 0,
        cau: 7,
      },
      {
        q: 'Vì sao pin điện thoại của bà hết vào khoảng hai giờ chiều?',
        options: ['Vì bà không bao giờ tắt cái gì', 'Vì bà xem video nấu ăn cả buổi sáng', 'Vì bà để lại quá nhiều bình luận', 'Vì bà quên cắm sạc từ tối hôm trước'],
        answer: 0,
        cau: 11,
      },
    ],
  },
  'hobbies-entertainment-daily': {
    en: [
      'Every Saturday afternoon five of us meet at the same cafe, and every Saturday we argue about the same thing.',
      'Three of us want to play football, and two want to go to the cinema.',
      'Last month we agreed to write both choices on paper and let the cafe owner pick one.',
      'He picked the cinema four Saturdays in a row, which nobody believed was chance.',
      'It turned out he had folded the football paper smaller, because he did not want us shouting outside his shop.',
      'After that we changed the rule: whoever arrives last chooses, and the others may not complain.',
      'Hung arrived last three times and chose football every time, so we played until it was too dark to see the ball.',
      'When Lan arrived last she chose a comedy film, and Hung fell asleep in the first twenty minutes.',
      'He said afterwards that he had enjoyed it, which we did not believe either.',
      'In August it rained for two weeks, so we stayed in the cafe and played chess and cards instead.',
      'Nobody had played chess before except Lan, who beat all four of us in one afternoon.',
      'She learned it from her father, who taught her by never letting her win a single game.',
      'Now three of us bring a book to the cafe, and we read for an hour before anyone speaks.',
      'The owner says we are his quietest customers and his worst customers, because five people share two drinks.',
      'We still argue every Saturday, but now the argument is part of the afternoon, not a problem with it.',
    ],
    vi: [
      'Chiều thứ Bảy nào năm đứa chúng tôi cũng gặp ở cùng một quán cà phê, và thứ Bảy nào cũng tranh nhau đúng một chuyện.',
      'Ba đứa muốn đi đá bóng, hai đứa muốn đi xem phim.',
      'Tháng trước chúng tôi thống nhất viết cả hai lựa chọn ra giấy rồi để chủ quán rút một tờ.',
      'Ông rút được tờ xem phim bốn thứ Bảy liền, chuyện mà không ai tin là tình cờ.',
      'Hóa ra ông gấp tờ đá bóng nhỏ hơn, vì ông không muốn chúng tôi hò hét ngoài cửa hàng.',
      'Sau đó chúng tôi đổi luật: ai tới muộn nhất thì được chọn, và mấy người kia không được cãi.',
      'Hùng tới muộn nhất ba lần và lần nào cũng chọn đá bóng, nên chúng tôi chơi tới lúc tối không thấy bóng nữa.',
      'Lúc Lan tới muộn nhất, cô ấy chọn một phim hài, và Hùng ngủ mất trong hai mươi phút đầu.',
      'Sau đó cậu ấy nói cậu ấy thấy phim hay, chuyện đó chúng tôi cũng không tin.',
      'Tháng Tám mưa suốt hai tuần, nên chúng tôi ngồi trong quán chơi cờ và chơi bài.',
      'Chưa ai từng chơi cờ ngoài Lan, và cô ấy thắng cả bốn đứa trong một buổi chiều.',
      'Cô ấy học từ bố mình, người dạy cô bằng cách không bao giờ để cô thắng một ván nào.',
      'Giờ ba đứa chúng tôi mang sách tới quán, và chúng tôi đọc một tiếng trước khi có ai nói chuyện.',
      'Chủ quán nói chúng tôi là khách yên nhất và cũng là khách tệ nhất, vì năm người chia nhau hai ly nước.',
      'Chúng tôi vẫn tranh nhau mỗi thứ Bảy, nhưng giờ chuyện tranh nhau là một phần của buổi chiều, không phải một vấn đề.',
    ],
    hoi: [
      {
        q: 'Vì sao chủ quán luôn rút được tờ "xem phim"?',
        options: ['Vì ông gấp tờ đá bóng nhỏ hơn cho khó rút', 'Vì hai đứa muốn xem phim viết chữ to hơn', 'Vì ông cũng thích phim hài hơn là đá bóng', 'Vì tờ đá bóng bị ướt nên dính vào nhau'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Luật mới của nhóm sau vụ rút giấy là gì?',
        options: ['Ai tới muộn nhất thì được chọn, người khác không được cãi', 'Ai tới sớm nhất thì được chọn cho cả buổi chiều hôm đó', 'Mỗi tuần đổi một người chọn, xoay đủ năm người', 'Bỏ hẳn việc chọn, thứ Bảy nào cũng ngồi ở quán'],
        answer: 0,
        cau: 5,
      },
      {
        q: 'Lan học chơi cờ từ ai, và bằng cách nào?',
        options: ['Từ bố cô, người không bao giờ để cô thắng một ván', 'Từ bốn người bạn trong nhóm suốt hai tuần mưa', 'Từ chủ quán cà phê, người dạy cô mỗi thứ Bảy', 'Từ một quyển sách cô mang tới quán để đọc'],
        answer: 0,
        cau: 11,
      },
      {
        q: 'Chủ quán nhận xét thế nào về nhóm?',
        options: ['Là khách yên nhất và cũng tệ nhất, vì năm người chia hai ly', 'Là khách tốt nhất, vì tuần nào cũng tới đúng thứ Bảy đó', 'Là khách ồn nhất, vì hay hò hét ngay ngoài cửa hàng', 'Là khách lạ nhất, vì vừa đọc sách vừa chơi cờ'],
        answer: 0,
        cau: 13,
      },
    ],
  },
  'clothes-fashion-daily': {
    en: [
      'My cousin\'s wedding was in October, and I had two weeks and very little money to find something to wear.',
      'My mother said a suit was necessary; my father said nobody looks at the guests.',
      'I went to the market first, where a woman showed me a grey suit that fitted everywhere except the shoulders.',
      'She said the shoulders could be changed for a small price, but the price she then named was not small.',
      'In the second shop the jacket was cheap and the trousers were the wrong length by four centimetres.',
      'The shop assistant told me to try the fitting room at the back, and the mirror there made everything look worse.',
      'On the fifth day I found a dark blue suit in a shop that was closing down, at half the usual price.',
      'It was slightly too loose at the waist, but a belt hid that completely.',
      'The shirt was the harder problem, because every white shirt I tried had a collar that was too tight.',
      'I finally bought one size larger and wore it without a tie, which my mother noticed immediately.',
      'My shoes were my father\'s, and they were leather, black, and one size too big.',
      'I wore two pairs of socks and walked slowly, and nobody noticed anything at all.',
      'At the wedding two other guests were wearing exactly the same dark blue suit from the same closing shop.',
      'We stood together for a photograph, and it is now the funniest photograph I own.',
      'My father was right that nobody looks at the guests, but he was wrong that it does not matter.',
    ],
    vi: [
      'Đám cưới anh họ tôi vào tháng Mười, và tôi có hai tuần với rất ít tiền để tìm cái gì mà mặc.',
      'Mẹ tôi nói phải có một bộ đồ lịch sự; bố tôi nói không ai nhìn khách mời.',
      'Tôi ra chợ trước, ở đó một cô cho tôi xem một bộ màu xám vừa hết mọi chỗ trừ phần vai.',
      'Cô nói phần vai sửa được với một giá nhỏ, nhưng cái giá cô nói sau đó thì không nhỏ.',
      'Ở cửa hàng thứ hai, cái áo khoác thì rẻ mà cái quần thì dài sai bốn xăng-ti-mét.',
      'Nhân viên bán hàng bảo tôi vào thử ở phòng thử phía sau, và cái gương trong đó làm mọi thứ trông tệ hơn.',
      'Ngày thứ năm tôi tìm được một bộ màu xanh dương đậm ở một cửa hàng đang dẹp, giá bằng một nửa bình thường.',
      'Nó hơi rộng ở phần bụng, nhưng một cái dây lưng che hẳn chuyện đó.',
      'Cái áo sơ mi mới là chuyện khó, vì mọi áo trắng tôi thử đều có cổ áo quá chật.',
      'Cuối cùng tôi mua rộng hơn một cỡ và mặc không đeo cà vạt, chuyện mẹ tôi nhận ra ngay lập tức.',
      'Đôi giày là của bố tôi, giày da, màu đen, và rộng hơn một cỡ.',
      'Tôi mặc hai đôi tất và đi chậm, và tuyệt đối không ai để ý gì.',
      'Ở đám cưới có hai khách nữa mặc đúng bộ xanh dương đậm đó, từ đúng cửa hàng đang dẹp đó.',
      'Chúng tôi đứng chung một bức ảnh, và giờ đó là bức ảnh vui nhất tôi có.',
      'Bố tôi đúng ở chỗ không ai nhìn khách mời, nhưng bố sai ở chỗ nói chuyện đó không quan trọng.',
    ],
    hoi: [
      {
        q: 'Bộ đồ màu xám ở chợ không vừa ở chỗ nào?',
        options: ['Phần vai', 'Phần bụng', 'Ống quần', 'Cổ áo'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Cái quần ở cửa hàng thứ hai sai thế nào?',
        options: ['Dài sai bốn xăng-ti-mét', 'Rộng sai bốn xăng-ti-mét', 'Ngắn sai một cỡ áo', 'Chật ở phần bụng'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Người kể xử lý chỗ hơi rộng ở bụng bằng cách nào?',
        options: ['Đeo một cái dây lưng để che', 'Mua rộng hơn một cỡ nữa', 'Nhờ cửa hàng sửa lại cho vừa', 'Mặc thêm một cái áo bên trong'],
        answer: 0,
        cau: 7,
      },
      {
        q: 'Chuyện gì xảy ra ở đám cưới với bộ đồ đó?',
        options: ['Hai khách nữa mặc đúng bộ đó, từ đúng cửa hàng đang dẹp', 'Không ai nhận ra người kể mặc đồ mua ở chợ', 'Đôi giày của bố bị tuột ra ngay khi người kể đi lại', 'Mẹ người kể nhận ra ngay là bộ đồ hơi rộng'],
        answer: 0,
        cau: 12,
      },
    ],
  },
  'house-furniture-daily': {
    en: [
      'We moved house in July, and the whole family agreed afterwards that we had planned nothing properly.',
      'The new apartment is on the third floor, and the staircase turns twice on the way up.',
      'The sofa reached the second turn and stopped, and four of us pushed it for twenty minutes before we understood.',
      'My uncle measured the doorway and the sofa, and the sofa was six centimetres wider.',
      'We had to take the legs off, turn it on its side, and lift it over the handrail.',
      'The wardrobe did not fit at all, so we sold it to the family who bought our old house.',
      'My mother cried about the wardrobe, because her mother had given it to her at her own wedding.',
      'The fridge was easier, but it did not work for two days after the move and then started again by itself.',
      'The kitchen has no window, so my father put a lamp above the stove on the first evening.',
      'We ate on the floor for a week, because the dining table was still in the old house.',
      'My sister liked eating on the floor and asked why we needed a table at all.',
      'The bathroom door opens inward and hits the sink, and nothing can be done about it.',
      'On the fourth day we found that the previous family had left a carpet rolled up in a cupboard.',
      'It is dark red, it fits the living room exactly, and we still do not know if they forgot it or left it as a gift.',
      'My mother says the apartment became a home the day she put that carpet down.',
    ],
    vi: [
      'Chúng tôi chuyển nhà vào tháng Bảy, và sau đó cả nhà đều đồng ý là chúng tôi đã không tính toán gì cho tử tế.',
      'Căn hộ mới ở tầng ba, và cầu thang lên đó quẹo hai lần.',
      'Cái ghế sofa tới chỗ quẹo thứ hai thì tắc, và bốn người chúng tôi đẩy nó hai mươi phút mới hiểu ra.',
      'Cậu tôi đo cái cửa và cái sofa, và cái sofa rộng hơn sáu xăng-ti-mét.',
      'Chúng tôi phải tháo chân ghế ra, dựng nó nằm nghiêng, và nhấc nó qua tay cầm cầu thang.',
      'Cái tủ quần áo thì không vào được chút nào, nên chúng tôi bán lại cho gia đình mua nhà cũ của mình.',
      'Mẹ tôi khóc vì cái tủ đó, vì bà ngoại đã cho mẹ nó vào đúng ngày cưới của mẹ.',
      'Cái tủ lạnh thì dễ hơn, nhưng nó không chạy suốt hai ngày sau khi chuyển rồi tự chạy lại.',
      'Nhà bếp không có cửa sổ, nên tối đầu tiên bố tôi lắp một cái đèn phía trên bếp.',
      'Chúng tôi ăn dưới sàn suốt một tuần, vì cái bàn ăn vẫn còn ở nhà cũ.',
      'Em gái tôi thích ăn dưới sàn và hỏi vậy thì cần cái bàn để làm gì.',
      'Cửa buồng tắm mở vào phía trong và đập vào bồn rửa, và không làm gì được với chuyện đó.',
      'Ngày thứ tư chúng tôi phát hiện gia đình trước để lại một cái thảm cuộn tròn trong tủ.',
      'Nó màu đỏ đậm, nó vừa khít phòng khách, và chúng tôi vẫn không biết họ quên hay để lại làm quà.',
      'Mẹ tôi nói căn hộ thành một cái nhà đúng vào cái ngày mẹ trải tấm thảm đó xuống.',
    ],
    hoi: [
      {
        q: 'Vì sao cái sofa không lên được?',
        options: ['Vì nó rộng hơn cái cửa sáu xăng-ti-mét', 'Vì cầu thang lên tầng ba quẹo hai lần', 'Vì bốn người đẩy nó sai hướng suốt hai mươi phút', 'Vì phải tháo chân ghế ra mới nhấc được'],
        answer: 0,
        cau: 3,
      },
      {
        q: 'Vì sao mẹ người kể khóc vì cái tủ quần áo?',
        options: ['Vì bà ngoại đã cho mẹ nó vào đúng ngày cưới của mẹ', 'Vì cái tủ đó là món đồ đắt nhất trong nhà cũ', 'Vì gia đình mua nhà cũ trả giá quá thấp cho nó', 'Vì cái tủ bị hỏng khi nhấc qua tay cầm cầu thang'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Chuyện gì xảy ra với cái tủ lạnh?',
        options: ['Không chạy suốt hai ngày rồi tự chạy lại', 'Không chạy nữa và phải bán lại cho người khác', 'Chạy được ngay nhưng kêu to hơn ở nhà cũ', 'Không vào được cửa nên phải tháo cánh ra'],
        answer: 0,
        cau: 7,
      },
      {
        q: 'Gia đình trước để lại thứ gì trong tủ?',
        options: ['Một cái thảm đỏ đậm, vừa khít phòng khách', 'Một cái đèn để lắp phía trên bếp', 'Một cái bàn ăn nhỏ có thể gấp gọn lại được', 'Một cái tủ quần áo cũ đã tháo rời'],
        answer: 0,
        cau: 12,
      },
    ],
  },
  'body-health-daily': {
    en: [
      'My father worked in the same office for nineteen years and never once went for a checkup.',
      'Last spring his company paid for everyone over fifty to see a doctor, so he could not avoid it.',
      'The nurse measured his weight first, and he had gained eleven kilograms since his wedding photograph.',
      'His blood pressure was high enough that the doctor asked him to sit quietly and be measured again.',
      'The second reading was still high, and the doctor said the number mattered more than how my father felt.',
      'My father said he felt fine, and the doctor agreed that he probably did.',
      'That was the sentence that frightened him: that a person can feel fine and still be in trouble.',
      'He was told to walk thirty minutes a day, to eat less salt, and to stop eating after eight in the evening.',
      'He kept the walking and the salt, but the evening rule lasted four days.',
      'My mother started walking with him, and after a month she said her knees hurt less than before.',
      'In August his blood pressure was lower, though still not where the doctor wanted it.',
      'He lost five kilograms, and he says the last two were harder than the first three together.',
      'He also sleeps better, which he had not expected and did not connect to the walking at first.',
      'He now tells everyone at his office to go for a checkup, and most of them do not.',
      'He says he understands them, because he was the same for nineteen years.',
    ],
    vi: [
      'Bố tôi làm ở cùng một công ty mười chín năm và chưa một lần đi khám sức khỏe.',
      'Mùa xuân vừa rồi công ty trả tiền cho mọi người trên năm mươi tuổi đi gặp bác sĩ, nên bố không tránh được.',
      'Y tá cân bố trước, và bố đã tăng mười một ki-lô-gam so với bức ảnh cưới.',
      'Huyết áp của bố cao tới mức bác sĩ đề nghị bố ngồi yên rồi đo lại.',
      'Lần đo thứ hai vẫn cao, và bác sĩ nói con số quan trọng hơn cảm giác của bố.',
      'Bố nói bố thấy bình thường, và bác sĩ đồng ý là bố chắc thấy bình thường thật.',
      'Chính câu đó làm bố sợ: rằng một người có thể thấy bình thường mà vẫn đang gặp chuyện.',
      'Bố được dặn đi bộ ba mươi phút mỗi ngày, ăn ít muối hơn, và ngừng ăn sau tám giờ tối.',
      'Bố giữ được việc đi bộ và việc ăn ít muối, còn cái luật buổi tối thì trụ được bốn ngày.',
      'Mẹ tôi bắt đầu đi bộ cùng bố, và sau một tháng mẹ nói đầu gối mẹ đỡ đau hơn trước.',
      'Tháng Tám huyết áp bố thấp hơn, dù vẫn chưa tới chỗ bác sĩ muốn.',
      'Bố giảm được năm ki-lô, và bố nói hai ki-lô cuối khó hơn ba ki-lô đầu cộng lại.',
      'Bố cũng ngủ ngon hơn, chuyện bố không ngờ tới và lúc đầu không nối được với việc đi bộ.',
      'Giờ bố khuyên mọi người ở công ty đi khám, và phần lớn họ không đi.',
      'Bố nói bố hiểu họ, vì chính bố đã như vậy suốt mười chín năm.',
    ],
    hoi: [
      {
        q: 'Vì sao lần này bố người kể không tránh được việc đi khám?',
        options: ['Vì công ty trả tiền cho mọi người trên năm mươi tuổi đi khám', 'Vì bố đã tăng mười một ki-lô so với ảnh cưới', 'Vì bác sĩ đã yêu cầu bố phải tới đo lại huyết áp lần nữa', 'Vì mẹ người kể muốn đi bộ cùng bố mỗi ngày'],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Câu nào của bác sĩ làm bố sợ?',
        options: ['Rằng một người có thể thấy bình thường mà vẫn đang gặp chuyện', 'Rằng con số huyết áp của bố đã cao hơn mức cho phép nhiều', 'Rằng bố phải ngừng ăn sau tám giờ tối mỗi ngày', 'Rằng bố đã tăng cân quá nhiều từ ngày cưới'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Trong ba việc bác sĩ dặn, việc nào bố KHÔNG giữ được?',
        options: ['Ngừng ăn sau tám giờ tối', 'Đi bộ ba mươi phút mỗi ngày', 'Ăn ít muối hơn trước', 'Đi đo lại huyết áp hằng tháng'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Bố nói gì về năm ki-lô đã giảm?',
        options: ['Hai ki-lô cuối khó hơn ba ki-lô đầu cộng lại', 'Ba ki-lô đầu khó hơn hai ki-lô cuối rất nhiều', 'Cả năm ki-lô đều giảm dễ nhờ đi bộ mỗi ngày', 'Bố giảm được nhờ ngừng ăn sau tám giờ tối'],
        answer: 0,
        cau: 11,
      },
    ],
  },
};

export default VIET_LAI;
