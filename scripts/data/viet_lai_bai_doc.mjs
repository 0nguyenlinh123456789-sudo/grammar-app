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
  // ── ĐỢT SÁU 19/08: 5 chặng A2 CUỐI CÙNG ──────────────────────────────────
  // Đợt này đóng nốt danh sách 34 chặng A1/A2 bị bộ lọc xếp là "không đủ điều kiện
  // soạn". Năm cảnh cuối: cây ghi ta cũ và buổi hòa nhạc cuối năm; học đi xe máy ở
  // sân chợ trống; khách sạn đặt hai phòng mà chỉ có một; bảo tàng và bức tranh nổi
  // tiếng mà người kể không cảm thấy gì; hội chợ khoa học với một thí nghiệm thất
  // bại ở lần đầu.
  'music-entertainment-daily': {
    en: [
      'I bought a second-hand guitar for the price of four bowls of noodles, and two strings were missing.',
      'My neighbour, who plays in a band at weddings, replaced them and refused to take any money.',
      'He taught me four chords and said that four chords are enough for about half the songs I like.',
      'He was right, and it took me two months to believe him.',
      'In March our school asked for volunteers to perform at the end-of-year concert.',
      'I put my name down while I was sitting alone, which is a decision I would not have made in company.',
      'I practised one song for six weeks, and by the end I could play it with my eyes closed.',
      'On the day of the concert the stage lights were much brighter than I had imagined.',
      'I could not see the audience at all, which turned out to be the only reason I got through it.',
      'My hands shook on the first two lines, and a boy in the front row noticed and looked away politely.',
      'The song lasted three minutes, and afterwards I could not remember any part of the middle.',
      'A teacher I had never spoken to told me the second verse was better than the first.',
      'My neighbour came to watch, and he said the mistake in the third chord was one nobody else would hear.',
      'Two students asked me to teach them, and I told them exactly what my neighbour had told me.',
      'I still cannot play more than five songs, and I have stopped treating that as a problem.',
    ],
    vi: [
      'Tôi mua một cây ghi ta cũ với giá bằng bốn bát phở, và nó thiếu hai sợi dây.',
      'Người láng giềng của tôi, người chơi trong một ban nhạc ở các đám cưới, thay dây giúp tôi và nhất định không lấy tiền.',
      'Anh dạy tôi bốn thế bấm và nói bốn thế bấm là đủ cho khoảng một nửa số bài tôi thích.',
      'Anh nói đúng, và tôi mất hai tháng mới tin anh.',
      'Tháng Ba trường tôi xin người tình nguyện biểu diễn ở buổi hòa nhạc cuối năm.',
      'Tôi ghi tên lúc đang ngồi một mình, một quyết định mà nếu có người bên cạnh thì tôi sẽ không ghi.',
      'Tôi tập đúng một bài suốt sáu tuần, và tới cuối thì tôi chơi được nó với hai mắt nhắm lại.',
      'Hôm hòa nhạc, đèn sân khấu sáng hơn nhiều so với những gì tôi tưởng.',
      'Tôi không thấy khán giả một chút nào, hóa ra đó là lý do duy nhất giúp tôi đi hết bài.',
      'Tay tôi run ở hai dòng đầu, và một cậu ngồi hàng đầu nhận ra rồi lịch sự nhìn sang chỗ khác.',
      'Bài hát dài ba phút, và sau đó tôi không nhớ được chút nào về đoạn giữa.',
      'Một thầy tôi chưa từng nói chuyện với bao giờ bảo tôi rằng đoạn hai hay hơn đoạn một.',
      'Người láng giềng tới xem, và anh nói lỗi ở thế bấm thứ ba là lỗi không ai khác nghe ra được.',
      'Hai bạn học sinh xin tôi dạy, và tôi nói với họ đúng những gì người láng giềng đã nói với tôi.',
      'Tôi vẫn chưa chơi được quá năm bài, và tôi đã thôi coi đó là một vấn đề.',
    ],
    hoi: [
      {
        q: 'Người láng giềng nói gì về bốn thế bấm mà anh dạy?',
        options: ['Bốn thế bấm là đủ cho khoảng một nửa số bài người kể thích', 'Bốn thế bấm chỉ đủ để chơi được đúng năm bài hát mà thôi', 'Phải tập hai tháng liền thì mới bấm được cả bốn thế đó', 'Bốn thế bấm là những gì anh dùng khi chơi ở các đám cưới'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Vì sao người kể đi hết được bài trên sân khấu?',
        options: ['Vì đèn quá sáng nên không thấy khán giả một chút nào', 'Vì đã tập đúng một bài đó liên tục suốt sáu tuần liền', 'Vì cậu ngồi hàng đầu đã lịch sự nhìn sang chỗ khác', 'Vì bài hát chỉ dài ba phút nên qua rất nhanh chóng'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Người thầy chưa từng nói chuyện đã nhận xét gì?',
        options: ['Đoạn hai của bài hay hơn đoạn một', 'Tay người kể run ở hai dòng đầu bài', 'Lỗi ở thế bấm thứ ba không ai nghe ra', 'Nên dạy lại cho hai bạn học sinh khác'],
        answer: 0,
        cau: 11,
      },
      {
        q: 'Người láng giềng nhận xét thế nào sau buổi diễn?',
        options: ['Lỗi ở thế bấm thứ ba là lỗi không ai khác nghe ra được', 'Đoạn hai của bài rõ ràng là hay hơn hẳn đoạn thứ nhất', 'Người kể nên tập thêm để chơi được nhiều hơn năm bài', 'Đèn sân khấu quá sáng nên khó mà nhìn thấy khán giả'],
        answer: 0,
        cau: 12,
      },
    ],
  },
  'transport-vehicles-daily': {
    en: [
      'My father taught me to ride a motorbike in an empty market square on Sunday mornings.',
      'His first rule was that I had to be able to stop before he would teach me to go faster.',
      'For three Sundays I did nothing but start, ride ten metres, and brake.',
      'He made me brake with both brakes together, and he checked my right hand every single time.',
      'On the fourth Sunday he let me ride around the square, and I hit the kerb because I looked at it.',
      'He said the machine goes where the eyes go, and that this is true of cars and bicycles too.',
      'When I finally rode on a real street, the thing that frightened me was not the speed but the buses.',
      'A bus passed me so closely that I felt the air move, and I stopped and sat on the kerb for ten minutes.',
      'My father did not tell me to get back on; he waited and said nothing at all.',
      'Two months later a van pulled out of a side street in front of me without looking.',
      'I braked with both brakes, exactly as I had done a hundred times in the market square, and nothing happened to me.',
      'The van driver shouted at me, which my father says is what frightened people usually do.',
      'I now check my tires and my brakes on the first Sunday of every month.',
      'My helmet is three years old, and my father says a helmet that has been dropped hard is finished.',
      'He still asks me, every time I leave the house, whether I know where I am going.',
    ],
    vi: [
      'Bố dạy tôi đi xe máy ở một cái sân chợ trống vào các buổi sáng Chủ nhật.',
      'Luật đầu tiên của bố là tôi phải dừng được thì bố mới dạy tôi đi nhanh hơn.',
      'Suốt ba Chủ nhật tôi không làm gì ngoài việc đề máy, đi mười mét, rồi phanh.',
      'Bố buộc tôi phanh cả hai phanh cùng lúc, và lần nào bố cũng kiểm tay phải của tôi.',
      'Chủ nhật thứ tư bố cho tôi chạy quanh sân, và tôi đâm vào bờ vỉa vì tôi nhìn vào nó.',
      'Bố nói cái xe đi về nơi mắt đi về, và điều đó đúng với cả xe hơi lẫn xe đạp.',
      'Lúc cuối cùng tôi ra đường thật, thứ làm tôi sợ không phải tốc độ mà là mấy chiếc xe buýt.',
      'Một chiếc xe buýt vượt sát tôi tới mức tôi cảm được luồng không khí, và tôi dừng lại ngồi trên bờ vỉa mười phút.',
      'Bố không bảo tôi lên xe lại; bố chờ và tuyệt đối không nói gì.',
      'Hai tháng sau, một chiếc xe tải nhỏ từ đường nhánh lao ra trước mặt tôi mà không nhìn.',
      'Tôi phanh cả hai phanh, đúng như tôi đã làm cả trăm lần ở sân chợ, và tôi không bị gì cả.',
      'Người lái xe tải quay ra mắng tôi, chuyện mà bố tôi nói là điều người ta hay làm khi đã sợ.',
      'Giờ tôi kiểm lốp và kiểm phanh vào Chủ nhật đầu tiên của mỗi tháng.',
      'Cái mũ bảo hiểm của tôi đã ba năm, và bố tôi nói một cái mũ đã bị rơi mạnh thì coi như hết dùng.',
      'Bố vẫn hỏi tôi, mỗi lần tôi ra khỏi nhà, rằng tôi có biết mình đang đi đâu không.',
    ],
    hoi: [
      {
        q: 'Luật đầu tiên bố đặt ra khi dạy đi xe là gì?',
        options: ['Phải dừng được thì mới được dạy đi nhanh hơn', 'Phải phanh cả hai phanh cùng một lúc mỗi lần', 'Phải tập ở sân chợ trống suốt ba Chủ nhật liền', 'Phải kiểm lốp và phanh trước mỗi lần ra đường'],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Vì sao người kể đâm vào bờ vỉa ở Chủ nhật thứ tư?',
        options: ['Vì người kể nhìn vào chính cái bờ vỉa đó', 'Vì người kể chưa phanh được bằng cả hai phanh', 'Vì một chiếc xe buýt đã vượt sát bên cạnh', 'Vì bố mới cho chạy quanh sân lần đầu tiên'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Bố làm gì khi người kể ngồi trên bờ vỉa mười phút?',
        options: ['Chờ, và tuyệt đối không nói gì cả', 'Bảo người kể lên xe đi tiếp ngay lập tức', 'Giải thích lại luật phanh bằng hai phanh', 'Đưa người kể về nhà rồi hôm sau dạy lại'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Theo bố, một cái mũ bảo hiểm thế nào thì coi như hết dùng?',
        options: ['Mũ đã bị rơi mạnh một lần', 'Mũ đã dùng quá ba năm rồi', 'Mũ không còn vừa với đầu nữa', 'Mũ đã có vết xước ở bên ngoài'],
        answer: 0,
        cau: 13,
      },
    ],
  },
  'hotel-accommodation-daily': {
    en: [
      'We booked two rooms for four nights, and when we arrived the hotel had one room and an apology.',
      'The receptionist said the booking system had shown our second room as cancelled that morning.',
      'My father had the confirmation on paper, printed a week earlier, and he put it on the desk without speaking.',
      'The manager came out after eleven minutes and offered us a suite on the top floor at no extra cost.',
      'The suite had one very large bed and a sofa, which was not two rooms but was better than nothing.',
      'The lift was out of order for the first two days, and the top floor is the eighth.',
      'My grandmother did not complain once, but she went out only twice in four days.',
      'Breakfast was included, and it stopped at half past eight, which nobody had told us.',
      'On the first morning we arrived at twenty to nine and were given cold bread and no eggs.',
      'After that we set an alarm, and the breakfast on the following days was genuinely good.',
      'The room was cleaned every day except Sunday, and the maid left a note explaining why.',
      'The note was in English and Vietnamese, and the Vietnamese half was clearly written by a person, not a machine.',
      'On the last day the manager took thirty percent off the bill without being asked.',
      'My father said afterwards that a hotel is judged by what it does when something goes wrong.',
      'We have stayed there twice since then, and both times we asked for the same suite.',
    ],
    vi: [
      'Chúng tôi đặt hai phòng cho bốn đêm, và khi tới thì khách sạn có một phòng và một lời xin lỗi.',
      'Lễ tân nói hệ thống đặt phòng hiện phòng thứ hai của chúng tôi là đã bị hủy từ sáng hôm đó.',
      'Bố tôi có tờ xác nhận in ra giấy từ một tuần trước, và bố đặt nó lên quầy mà không nói gì.',
      'Người quản lý ra sau mười một phút và đề nghị cho chúng tôi một phòng suite ở tầng trên cùng, không tính thêm tiền.',
      'Phòng suite có một cái giường rất lớn và một cái sofa, không phải hai phòng nhưng vẫn hơn là không có gì.',
      'Cái thang máy hỏng suốt hai ngày đầu, và tầng trên cùng là tầng tám.',
      'Bà tôi không phàn nàn một lần nào, nhưng bà chỉ ra khỏi phòng đúng hai lần trong bốn ngày.',
      'Bữa sáng có sẵn trong giá, và nó dừng lúc tám giờ ba mươi, chuyện không ai nói cho chúng tôi biết.',
      'Sáng đầu tiên chúng tôi xuống lúc chín giờ kém hai mươi và được cho bánh nguội, không có trứng.',
      'Sau đó chúng tôi đặt báo thức, và bữa sáng những ngày sau thì ngon thật sự.',
      'Phòng được dọn mỗi ngày trừ Chủ nhật, và người dọn phòng để lại một tờ giấy giải thích vì sao.',
      'Tờ giấy viết bằng tiếng Anh và tiếng Việt, và nửa tiếng Việt thì rõ ràng do người viết, không phải do máy.',
      'Ngày cuối, người quản lý bớt ba mươi phần trăm hóa đơn mà không cần ai phải xin.',
      'Sau đó bố tôi nói một khách sạn được đánh giá bằng việc nó làm gì khi có chuyện không ổn.',
      'Từ đó chúng tôi đã ở lại đó hai lần nữa, và cả hai lần chúng tôi đều xin đúng cái phòng suite ấy.',
    ],
    hoi: [
      {
        q: 'Bố người kể phản ứng thế nào khi lễ tân nói phòng đã bị hủy?',
        options: ['Đặt tờ xác nhận in từ một tuần trước lên quầy mà không nói gì', 'Yêu cầu gặp ngay người quản lý của khách sạn để giải quyết', 'Đề nghị đổi sang một phòng suite ở tầng trên cùng luôn', 'Xin bớt ba mươi phần trăm hóa đơn cho cả bốn đêm ở đó'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Vì sao chuyện thang máy hỏng lại thành vấn đề lớn?',
        options: ['Vì phòng của họ ở tầng tám, tầng trên cùng của khách sạn', 'Vì bà của người kể thì không hề phàn nàn một lần nào cả hết', 'Vì bữa sáng dừng lúc tám giờ ba mươi mỗi buổi sáng', 'Vì phòng chỉ được dọn mỗi ngày trừ ngày Chủ nhật'],
        answer: 0,
        cau: 5,
      },
      {
        q: 'Chuyện gì xảy ra vào bữa sáng đầu tiên?',
        options: ['Xuống lúc chín giờ kém hai mươi nên chỉ có bánh nguội, không trứng', 'Bữa sáng ngon thật sự vì cả nhà đã kịp đặt báo thức từ trước', 'Không ai nói cho cả nhà biết là bữa sáng vốn có sẵn trong giá phòng', 'Người dọn phòng để lại một tờ giấy giải thích về bữa sáng'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Người quản lý làm gì vào ngày cuối?',
        options: ['Bớt ba mươi phần trăm hóa đơn mà không cần ai phải xin', 'Đề nghị cho ở thêm một đêm nữa mà không tính tiền', 'Xin lỗi thêm một lần nữa về chuyện phòng đã bị hủy từ đầu', 'Sửa xong cái thang máy để cả nhà đi lại cho dễ'],
        answer: 0,
        cau: 12,
      },
    ],
  },
  'arts-culture-daily': {
    en: [
      'Our class went to the city art museum, and I had been looking forward to one painting for a month.',
      'It is the most famous work in the museum, and it appears on the cover of our textbook.',
      'When I stood in front of it, I felt nothing at all, and I was ashamed of feeling nothing.',
      'It is smaller than the photograph suggests, and the room around it was full of people talking.',
      'I stayed for eight minutes because I thought the feeling might arrive late, and it did not.',
      'In the next room there was a small drawing of a woman sewing, by an artist whose name I had never heard.',
      'I stood in front of that one for almost half an hour, and my teacher had to come and find me.',
      'The drawing is in pencil, and one of her hands is not finished; you can see where the artist stopped.',
      'Our guide said that unfinished hand is why the museum bought it, which I did not understand at first.',
      'She explained that a finished picture shows you the result, and an unfinished one shows you the work.',
      'I bought a postcard of the drawing, and there were no postcards of the famous painting left.',
      'On the bus home four students said the famous painting was their favourite thing in the museum.',
      'I did not argue, because I had spent a month expecting to say exactly the same thing.',
      'My teacher told me privately that she has never liked that painting either, in twenty-six years of visits.',
      'The postcard is on my wall, and the textbook with the famous cover is in a box under my bed.',
    ],
    vi: [
      'Lớp tôi đi bảo tàng mỹ thuật thành phố, và tôi đã mong một bức tranh suốt một tháng.',
      'Đó là tác phẩm nổi tiếng nhất của bảo tàng, và nó nằm trên bìa sách giáo khoa của chúng tôi.',
      'Khi tôi đứng trước nó, tôi không cảm thấy gì cả, và tôi thấy xấu hổ vì mình không cảm thấy gì.',
      'Nó nhỏ hơn so với những gì bức ảnh gợi ra, và cả căn phòng quanh nó đầy người đang nói chuyện.',
      'Tôi đứng đó tám phút vì tôi nghĩ cái cảm giác kia có thể tới muộn, nhưng nó không tới.',
      'Ở phòng bên có một bức vẽ nhỏ về một người đàn bà đang khâu, của một họa sĩ tôi chưa từng nghe tên.',
      'Tôi đứng trước bức đó gần nửa tiếng, và cô giáo phải đi tìm tôi.',
      'Bức vẽ bằng bút chì, và một bàn tay của bà chưa được vẽ xong; bạn thấy được chỗ họa sĩ đã dừng lại.',
      'Người hướng dẫn nói chính cái bàn tay chưa xong đó là lý do bảo tàng mua nó, điều lúc đầu tôi không hiểu.',
      'Cô giải thích rằng một bức vẽ xong thì cho bạn thấy kết quả, còn một bức chưa xong thì cho bạn thấy công việc.',
      'Tôi mua một tấm bưu thiếp in bức vẽ đó, và bưu thiếp của bức tranh nổi tiếng thì đã hết.',
      'Trên xe về, bốn bạn nói bức tranh nổi tiếng là thứ họ thích nhất trong bảo tàng.',
      'Tôi không tranh luận, vì chính tôi đã mất một tháng để chờ được nói đúng câu đó.',
      'Cô giáo nói riêng với tôi rằng cô cũng chưa bao giờ thích bức tranh ấy, trong hai mươi sáu năm đi bảo tàng.',
      'Tấm bưu thiếp giờ ở trên tường phòng tôi, còn quyển sách giáo khoa có cái bìa nổi tiếng thì nằm trong thùng dưới gầm giường.',
    ],
    hoi: [
      {
        q: 'Người kể cảm thấy thế nào khi đứng trước bức tranh nổi tiếng?',
        options: ['Không cảm thấy gì cả, và thấy xấu hổ vì mình không cảm thấy gì', 'Thấy thất vọng vì bức tranh nhỏ hơn so với ảnh trên bìa sách', 'Thấy khó chịu vì căn phòng quanh nó đầy người đang nói chuyện', 'Thấy thích ngay từ phút đầu, đúng như đã mong suốt một tháng'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Điều gì đặc biệt ở bức vẽ người đàn bà đang khâu?',
        options: ['Một bàn tay của bà chưa vẽ xong, thấy được chỗ họa sĩ dừng lại', 'Nó được vẽ bằng bút chì bởi một họa sĩ rất nổi tiếng thời đó', 'Nó nhỏ hơn nhiều so với bức tranh nổi tiếng ở phòng bên cạnh', 'Nó là bức duy nhất trong bảo tàng còn bưu thiếp để bán lại'],
        answer: 0,
        cau: 7,
      },
      {
        q: 'Người hướng dẫn giải thích thế nào về bức vẽ chưa xong?',
        options: ['Bức vẽ xong cho thấy kết quả, bức chưa xong cho thấy công việc', 'Bảo tàng mua nó vì họa sĩ đó về sau trở nên rất nổi tiếng', 'Bức chưa xong thì luôn có giá cao hơn bức đã được vẽ xong', 'Người xem sẽ đứng lâu hơn trước một bức còn dở dang như thế'],
        answer: 0,
        cau: 9,
      },
      {
        q: 'Cô giáo nói riêng điều gì với người kể?',
        options: ['Cô cũng chưa bao giờ thích bức tranh ấy, trong hai mươi sáu năm', 'Cô thấy bức vẽ bút chì đáng xem hơn bức tranh nổi tiếng kia', 'Cô đã phải đi tìm người kể vì đứng quá lâu ở phòng bên', 'Cô khuyên đừng tranh luận với bốn bạn ở trên xe về nhà'],
        answer: 0,
        cau: 13,
      },
    ],
  },
  'science-technology-daily': {
    en: [
      'For the school science fair my group chose to test whether salt water freezes more slowly than fresh water.',
      'Everybody already knows the answer, and our teacher warned us that a known answer is not an experiment.',
      'She told us the question was not whether it freezes slower, but by how much, and at what concentration it stops.',
      'We used nine cups, from no salt up to eight spoons, and we put them all in the same freezer.',
      'Our first attempt failed completely, because we opened the freezer every ten minutes to look.',
      'The temperature inside never became stable, and our numbers made no pattern at all.',
      'On the second attempt we used a thermometer we could read through the glass door without opening it.',
      'That data made a clean curve, and the eight-spoon cup never froze in the four hours we watched.',
      'We wrote down what we had done wrong the first time, and the teacher said that page was the best part.',
      'Another group had a machine that lit up, and it was more popular with the visiting parents.',
      'The judges asked us one question: what would we test next if we had another month.',
      'My friend Ngan answered that she would test whether the salt changes the shape of the ice crystals.',
      'We came second, and the group with the machine came fourth.',
      'Our teacher told us afterwards that we won points for the failure page and not for the curve.',
      'Ngan is studying chemistry at university now, and she still has the nine cups in a box at home.',
    ],
    vi: [
      'Cho hội chợ khoa học của trường, nhóm tôi chọn thử xem nước muối có đóng băng chậm hơn nước thường không.',
      'Ai cũng biết câu trả lời rồi, và cô giáo cảnh báo chúng tôi rằng một câu trả lời đã biết thì không phải một thí nghiệm.',
      'Cô nói câu hỏi không phải là nó đóng băng chậm hơn không, mà là chậm hơn BAO NHIÊU, và ở nồng độ nào thì nó ngừng.',
      'Chúng tôi dùng chín cái cốc, từ không muối tới tám thìa, và đặt tất cả vào cùng một cái tủ đá.',
      'Lần thử đầu tiên thất bại hoàn toàn, vì chúng tôi mở tủ đá mười phút một lần để xem.',
      'Nhiệt độ bên trong không bao giờ ổn định, và các con số của chúng tôi chẳng thành quy luật gì cả.',
      'Lần thử thứ hai chúng tôi dùng một cái nhiệt kế đọc được qua cửa kính mà không cần mở ra.',
      'Số liệu đó vẽ thành một đường cong đẹp, và cái cốc tám thìa thì không đóng băng trong bốn tiếng chúng tôi theo dõi.',
      'Chúng tôi ghi lại những gì mình đã làm sai ở lần đầu, và cô giáo nói trang đó là phần hay nhất.',
      'Một nhóm khác có một cái máy phát sáng, và nó được các bậc phụ huynh tới xem thích hơn.',
      'Ban giám khảo hỏi chúng tôi một câu: nếu có thêm một tháng thì chúng tôi sẽ thử điều gì tiếp.',
      'Bạn Ngân của tôi trả lời rằng bạn sẽ thử xem muối có làm đổi hình dạng của tinh thể băng không.',
      'Chúng tôi được giải nhì, còn nhóm có cái máy thì được giải tư.',
      'Cô giáo nói với chúng tôi sau đó rằng chúng tôi được điểm nhờ trang ghi thất bại, không phải nhờ đường cong.',
      'Giờ Ngân đang học hóa ở đại học, và bạn vẫn giữ chín cái cốc đó trong một cái thùng ở nhà.',
    ],
    hoi: [
      {
        q: 'Cô giáo nói câu hỏi thật sự của thí nghiệm là gì?',
        options: ['Chậm hơn bao nhiêu, và ở nồng độ nào thì nó ngừng đóng băng', 'Nước muối có đóng băng chậm hơn nước thường hay là không', 'Muối có làm đổi hình dạng của tinh thể băng hay là không', 'Bao nhiêu thìa muối thì cần cho chín cái cốc thí nghiệm'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Vì sao lần thử đầu tiên thất bại?',
        options: ['Vì cứ mở tủ đá ra xem mười phút một lần', 'Vì cái nhiệt kế không đọc được qua cửa kính', 'Vì cốc tám thìa muối không đóng băng nổi', 'Vì chín cái cốc được đặt ở hai tủ đá khác nhau'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Theo cô giáo, phần hay nhất trong bài của nhóm là gì?',
        options: ['Trang ghi lại những gì nhóm đã làm sai ở lần đầu', 'Đường cong đẹp vẽ ra từ số liệu của lần thứ hai', 'Câu trả lời của Ngân trước ban giám khảo hôm đó', 'Cái cốc tám thìa muối không đóng băng suốt bốn tiếng'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Ngân trả lời ban giám khảo sẽ thử gì tiếp nếu có thêm một tháng?',
        options: ['Thử xem muối có làm đổi hình dạng của tinh thể băng không', 'Thử thêm nhiều cốc nữa với nồng độ muối cao hơn tám thìa', 'Thử đo nhiệt độ trong tủ đá mà không mở cửa kính ra lần nào', 'Thử làm một cái máy phát sáng như của nhóm được giải tư'],
        answer: 0,
        cau: 11,
      },
    ],
  },
};

export default VIET_LAI;
