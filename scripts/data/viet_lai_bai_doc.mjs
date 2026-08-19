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
  // ── ĐỢT NĂM 19/08: 6 chặng A2 (đợt A2 thứ ba) ────────────────────────────
  // Sáu cảnh, không trùng cảnh nào của bốn đợt trước: Tết ở làng bà với việc chia
  // theo từng người; trận lụt lên tới bậc thứ hai; buổi dọn rác con suối sau khu
  // nhà; đám cưới gặp mưa dù bản tin nói nắng; ngọn đồi trơ được trồng lại suốt
  // hơn hai mươi năm; trận chung kết thua ở loạt luân lưu.
  'culture-traditions-daily': {
    en: [
      'Every Tet our whole family goes back to my grandmother\'s village, and the work is divided the same way every year.',
      'My grandmother decides the day the house must be finished, and nobody argues with the date she chooses.',
      'My mother and my aunt cook, my father and my uncle clean and repair, and the children carry things.',
      'Three days before Tet we scrub the whole house, because my grandmother says dirt from the old year must not cross into the new one.',
      'My uncle repaints the front gate every single year, even in the years when it does not need it.',
      'On the last afternoon my grandmother puts five kinds of fruit on the altar, and the number never changes.',
      'She once explained why it is five and not four, and the explanation was different the second time she told me.',
      'At midnight the oldest man present speaks first, and for the last two years that has been my father.',
      'Children receive red envelopes, but in our family the money inside must be a new note, never a used one.',
      'My cousin from the city once gave used notes, and my grandmother returned them to him without a word.',
      'On the first morning no one is allowed to sweep the floor, because sweeping sends the luck out of the door.',
      'The second day is for visiting neighbours, and we must eat something in every house we enter.',
      'By the third day everyone is tired of the same food, and my aunt secretly makes a pot of plain soup.',
      'My grandmother knows about the soup and pretends she does not, which is its own kind of tradition.',
      'She is eighty-one, and she has told us the village will keep these customs long after she stops keeping them.',
    ],
    vi: [
      'Tết nào cả nhà tôi cũng về làng của bà, và việc được chia đúng một kiểu năm nào cũng vậy.',
      'Bà tôi quyết định ngày nhà phải xong, và không ai cãi cái ngày bà chọn.',
      'Mẹ tôi và cô tôi nấu ăn, bố tôi và cậu tôi dọn dẹp sửa sang, còn trẻ con thì bê đồ.',
      'Ba ngày trước Tết chúng tôi cọ cả nhà, vì bà nói bụi của năm cũ không được bước sang năm mới.',
      'Cậu tôi sơn lại cái cổng trước mỗi năm một lần, kể cả những năm nó không cần sơn.',
      'Chiều cuối cùng bà tôi đặt năm loại quả lên bàn thờ, và con số đó không bao giờ đổi.',
      'Có lần bà giải thích vì sao là năm chứ không phải bốn, và lần thứ hai bà kể thì lời giải thích lại khác.',
      'Đúng nửa đêm, người đàn ông lớn tuổi nhất có mặt sẽ nói trước, và hai năm nay người đó là bố tôi.',
      'Trẻ con được nhận bao đỏ, nhưng ở nhà tôi tiền bên trong phải là tờ mới, không bao giờ là tờ đã dùng.',
      'Anh họ tôi ở thành phố có lần đưa tiền cũ, và bà tôi trả lại cho anh mà không nói một tiếng nào.',
      'Sáng đầu năm không ai được quét nhà, vì quét là đưa may mắn ra khỏi cửa.',
      'Ngày thứ hai là để đi thăm láng giềng, và vào nhà nào chúng tôi cũng phải ăn một thứ gì đó.',
      'Tới ngày thứ ba thì ai cũng chán món ăn cũ, và cô tôi lén nấu một nồi canh nhạt.',
      'Bà tôi biết chuyện nồi canh và giả vờ không biết, chuyện đó tự nó cũng là một kiểu truyền thống.',
      'Bà tám mươi mốt tuổi, và bà nói với chúng tôi rằng cái làng sẽ giữ những tục này rất lâu sau khi bà thôi giữ.',
    ],
    hoi: [
      {
        q: 'Việc nhà dịp Tết được chia thế nào trong gia đình người kể?',
        options: ['Mẹ và cô nấu ăn, bố và cậu dọn sửa, trẻ con bê đồ', 'Bà quyết ngày, mẹ và cô dọn dẹp, bố và cậu nấu ăn', 'Mọi người cùng làm chung, không ai có việc riêng cả', 'Trẻ con nấu ăn, người lớn thì dọn dẹp và sửa sang'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Vì sao phải cọ cả nhà ba ngày trước Tết?',
        options: ['Vì bà nói bụi của năm cũ không được bước sang năm mới', 'Vì cái cổng trước cần được sơn lại trước ngày Tết', 'Vì láng giềng sẽ tới thăm nhà vào ngày thứ hai', 'Vì bà là người quyết định ngày nhà phải xong hẳn'],
        answer: 0,
        cau: 3,
      },
      {
        q: 'Chuyện gì xảy ra khi anh họ ở thành phố đưa tiền cũ?',
        options: ['Bà trả lại cho anh mà không nói một tiếng nào', 'Bà giải thích lại cho anh vì sao phải là tờ mới', 'Bà giả vờ không biết chuyện đó, như với nồi canh', 'Bà nhận nhưng không đưa cho đứa trẻ con nào cả'],
        answer: 0,
        cau: 9,
      },
      {
        q: 'Cô của người kể làm gì tới ngày thứ ba?',
        options: ['Lén nấu một nồi canh nhạt vì ai cũng chán món cũ', 'Đi thăm láng giềng và ăn một thứ ở mỗi nhà', 'Quét nhà cho sạch sau ba ngày không được quét', 'Nấu thêm món mới để bà không phải ăn món cũ'],
        answer: 0,
        cau: 12,
      },
    ],
  },
  'weather-climate-daily': {
    en: [
      'The flood of two years ago reached the second step of our house, and we had thought we were safe.',
      'The forecast on the radio said heavy rain, which it says perhaps thirty times a year.',
      'My father listens to the river instead of the radio, and he says a rising river changes its sound before its level.',
      'On the Tuesday evening he heard it and told us to move everything off the floor.',
      'We carried the rice, the books and the electric fan upstairs, and we left the furniture where it was.',
      'The water came in at about two in the morning, and by five it was thirty centimetres deep inside.',
      'Our neighbour lost more than we did, because he had gone to the city and nobody could reach him.',
      'His hens survived on the roof of the shed, which surprised everyone including him.',
      'The water went down after two days, and the mud that stayed was worse than the water.',
      'It took us nine days to clean, and the smell in the wooden cupboard never fully went away.',
      'The government sent rice and clean water on the fourth day, which was earlier than in the flood before.',
      'My mother now keeps everything important in two plastic boxes that can be carried with one hand.',
      'My father built a shelf high on the wall in every room, and the shelves look strange when it is dry.',
      'Since then we have had two seasons of very little rain, and the well went low in April.',
      'My father says the same sky gives you both problems, and you cannot prepare for only one of them.',
    ],
    vi: [
      'Trận lụt hai năm trước lên tới bậc thứ hai của nhà tôi, mà chúng tôi đã tưởng mình an toàn.',
      'Bản tin trên radio nói mưa lớn, câu mà nó nói có lẽ ba mươi lần một năm.',
      'Bố tôi nghe dòng sông thay vì nghe radio, và bố nói sông lên thì đổi tiếng trước khi đổi mực nước.',
      'Tối thứ Ba bố nghe thấy và bảo chúng tôi dọn hết mọi thứ khỏi sàn.',
      'Chúng tôi mang gạo, sách và cái quạt điện lên gác, còn đồ gỗ thì để nguyên chỗ.',
      'Nước vào khoảng hai giờ sáng, và tới năm giờ thì trong nhà sâu ba mươi xăng-ti-mét.',
      'Người láng giềng mất nhiều hơn chúng tôi, vì ông đi thành phố và không ai liên lạc được.',
      'Mấy con gà của ông sống được trên mái cái chái, chuyện làm mọi người ngạc nhiên kể cả chính ông.',
      'Nước rút sau hai ngày, và lớp bùn ở lại còn tệ hơn cả nước.',
      'Chúng tôi mất chín ngày để dọn, và cái mùi trong tủ gỗ thì không bao giờ hết hẳn.',
      'Nhà nước gửi gạo và nước sạch tới vào ngày thứ tư, sớm hơn so với trận lụt trước đó.',
      'Giờ mẹ tôi giữ mọi thứ quan trọng trong hai cái thùng nhựa mà một tay bê được.',
      'Bố tôi đóng một cái giá cao trên tường ở mỗi phòng, và mấy cái giá đó trông kỳ khi trời khô.',
      'Từ đó tới nay chúng tôi có hai mùa mưa rất ít, và cái giếng cạn xuống vào tháng Tư.',
      'Bố tôi nói cùng một cái trời cho anh cả hai vấn đề, và anh không thể chỉ chuẩn bị cho một cái.',
    ],
    hoi: [
      {
        q: 'Bố người kể dựa vào cái gì để biết nước sắp lên?',
        options: ['Nghe dòng sông, vì sông lên thì đổi tiếng trước khi đổi mực nước', 'Nghe bản tin trên radio, vì bản tin đó đã báo trước là sẽ mưa lớn', 'Xem mực nước ở bậc thứ hai của nhà mình mỗi buổi tối', 'Hỏi người láng giềng đã sống ở đó lâu hơn gia đình mình'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Gia đình mang những gì lên gác, và để lại gì?',
        options: ['Mang gạo, sách và cái quạt điện; để nguyên đồ gỗ', 'Mang đồ gỗ và gạo; để lại sách và cái quạt điện', 'Mang hai cái thùng nhựa quan trọng; để lại tất cả', 'Mang tất cả mọi thứ lên gác, không để lại thứ gì'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Vì sao người láng giềng mất nhiều hơn?',
        options: ['Vì ông đi thành phố và không ai liên lạc được với ông', 'Vì nhà ông thấp hơn nhà người kể tới ba mươi xăng-ti-mét', 'Vì mấy con gà của ông không sống được qua trận lụt đó', 'Vì ông không nghe radio nên không biết trời sẽ mưa lớn'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Theo bài, thứ gì tệ hơn cả nước?',
        options: ['Lớp bùn ở lại sau khi nước đã rút hết', 'Cái mùi ở trong tủ gỗ suốt nhiều tháng', 'Chín ngày phải dọn dẹp lại toàn bộ nhà', 'Hai mùa mưa rất ít làm cái giếng cạn đi'],
        answer: 0,
        cau: 8,
      },
    ],
  },
  'nature-environment-daily': {
    en: [
      'The stream behind our block was so full of rubbish that people had stopped calling it a stream.',
      'A retired teacher named Mr Tuan put a paper notice on the wall asking for ten volunteers on a Sunday.',
      'Thirty-one people came, which was more than he had bags or gloves for.',
      'We worked from six until eleven, and we filled ninety-four bags in the first morning alone.',
      'The heaviest thing we pulled out was a motorbike frame, and it took six of us to lift it up the bank.',
      'Mr Tuan wrote down what we found, because he said a list is harder to argue with than a complaint.',
      'His list included two hundred and eleven plastic bottles, and that number appeared in the local newspaper.',
      'After the article the district sent a truck to take the bags away, which had not happened before.',
      'We repeated the work every month, and by the fourth month there was much less to collect.',
      'The water is still not clean, and Mr Tuan is careful never to say that it is.',
      'He says the rubbish we remove is the easy part, and what runs into the water from the factory is not.',
      'A woman who lives above the shop now sweeps her section of the bank herself every week.',
      'Two boys who joined for the free lunch on the first day have come to every clean-up since.',
      'Birds returned in the second year, and somebody counted eleven kinds where there had been three.',
      'Mr Tuan is seventy, and he says the point was never the stream; it was getting neighbours to speak to each other.',
    ],
    vi: [
      'Con suối phía sau khu nhà tôi đầy rác tới mức người ta thôi gọi nó là suối.',
      'Một thầy giáo về hưu tên là ông Tuấn dán một tờ thông báo lên tường xin mười người tình nguyện vào một Chủ nhật.',
      'Ba mươi mốt người tới, nhiều hơn số bao và số găng tay ông có.',
      'Chúng tôi làm từ sáu giờ tới mười một giờ, và chỉ riêng buổi sáng đầu đã đầy chín mươi bốn bao.',
      'Thứ nặng nhất chúng tôi kéo lên là cái khung xe máy, và phải sáu người mới nhấc nó lên bờ.',
      'Ông Tuấn ghi lại những gì tìm được, vì ông nói một bản danh sách khó cãi hơn một lời phàn nàn.',
      'Danh sách của ông có hai trăm mười một chai nhựa, và con số đó lên cả báo địa phương.',
      'Sau bài báo, quận cử một xe tải tới chở mấy cái bao đi, chuyện trước đó chưa từng có.',
      'Chúng tôi làm lại mỗi tháng, và tới tháng thứ tư thì còn ít thứ để thu hơn nhiều.',
      'Nước vẫn chưa sạch, và ông Tuấn rất cẩn thận không bao giờ nói là nó sạch.',
      'Ông nói rác mình vớt lên là phần dễ, còn thứ chảy vào nước từ nhà máy thì không dễ.',
      'Một cô sống phía trên cửa hàng giờ tự quét đoạn bờ của mình mỗi tuần.',
      'Hai cậu bé tham gia hôm đầu chỉ vì suất ăn trưa miễn phí thì từ đó buổi dọn nào cũng có mặt.',
      'Sang năm thứ hai chim quay lại, và có người đếm được mười một loài ở chỗ trước đó chỉ có ba.',
      'Ông Tuấn bảy mươi tuổi, và ông nói mục đích chưa bao giờ là con suối; mục đích là để láng giềng nói chuyện với nhau.',
    ],
    hoi: [
      {
        q: 'Ông Tuấn xin bao nhiêu người, và bao nhiêu người tới?',
        options: ['Xin mười người, và ba mươi mốt người đã tới', 'Xin ba mươi người, và chỉ có mười người tới', 'Xin mười người, và đúng mười người đã tới', 'Xin sáu người, và ba mươi mốt người đã tới'],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Vì sao ông Tuấn ghi lại danh sách những thứ tìm được?',
        options: ['Vì ông nói một bản danh sách khó cãi hơn một lời phàn nàn', 'Vì báo địa phương yêu cầu phải có con số cụ thể mới in', 'Vì quận đòi bản danh sách trước khi cử xe tải tới chở', 'Vì ông muốn so số rác giữa tháng này với tháng trước'],
        answer: 0,
        cau: 5,
      },
      {
        q: 'Theo ông Tuấn, phần KHÔNG dễ là gì?',
        options: ['Thứ chảy vào nước từ nhà máy, không phải rác vớt lên', 'Việc thuyết phục quận cử xe tải tới chở bao rác đi', 'Việc giữ cho ba mươi mốt người quay lại mỗi tháng', 'Việc kéo cái khung xe máy nặng lên khỏi bờ suối'],
        answer: 0,
        cau: 10,
      },
      {
        q: 'Ông Tuấn nói mục đích thật của việc này là gì?',
        options: ['Để láng giềng nói chuyện với nhau, chưa bao giờ là con suối', 'Để nước con suối sạch trở lại như nhiều năm trước đây', 'Để báo địa phương chú ý và quận phải có trách nhiệm', 'Để chim quay lại đủ mười một loài như trước khi có rác'],
        answer: 0,
        cau: 14,
      },
    ],
  },
  'weather-seasons-daily-p3': {
    en: [
      'My sister chose the last Saturday of November for her wedding, because November is the dry month here.',
      'The forecast one week before said sunny, and the forecast two days before said sunny as well.',
      'On the Friday evening the sky was clear enough to see stars, and we set up the tables outside.',
      'It began to rain at half past four on Saturday morning, quietly and then very hard.',
      'My uncle woke everyone up, and eleven of us moved forty chairs indoors in the dark.',
      'The wedding was supposed to start at nine, and at eight the rain was still heavy.',
      'My mother cried, and my grandmother said a wet wedding means a full house for the rest of your life.',
      'Nobody knows whether that is a real saying or something my grandmother made up that morning.',
      'The rain stopped at twenty past nine, and steam rose off the road in front of the house.',
      'We could not use the garden, so ninety guests ate inside a room built for fifty.',
      'It was hot, loud, and closer than anyone wanted, and the photographs from that day are the best we have.',
      'Two guests slipped on the wet step, and neither of them was hurt beyond a wet sleeve.',
      'By afternoon the sun was so strong that the ground was dry and the tables could have gone out after all.',
      'My sister says she would not change anything, though she also says she checked the forecast for a month.',
      'My father now says that in this province the only honest forecast is the one for yesterday.',
    ],
    vi: [
      'Em gái tôi chọn thứ Bảy cuối tháng Mười Một để cưới, vì tháng Mười Một ở đây là tháng khô.',
      'Bản tin một tuần trước nói trời nắng, và bản tin hai ngày trước cũng nói trời nắng.',
      'Tối thứ Sáu trời trong đủ để thấy sao, và chúng tôi kê bàn ra ngoài sân.',
      'Bốn giờ ba mươi sáng thứ Bảy trời bắt đầu mưa, lúc đầu nhẹ rồi rất to.',
      'Cậu tôi gọi cả nhà dậy, và mười một người chúng tôi dọn bốn mươi cái ghế vào trong nhà trong đêm tối.',
      'Đám cưới lẽ ra bắt đầu lúc chín giờ, và tám giờ thì mưa vẫn còn nặng.',
      'Mẹ tôi khóc, và bà tôi nói cưới mà mưa thì cả đời nhà đông người.',
      'Không ai biết đó là một câu nói có thật hay là câu bà tôi tự nghĩ ra sáng hôm đó.',
      'Mưa tạnh lúc chín giờ hai mươi, và hơi nước bốc lên khỏi mặt đường trước nhà.',
      'Chúng tôi không dùng được cái sân, nên chín mươi khách ăn trong một phòng dựng cho năm mươi người.',
      'Trời nóng, ồn, và chật hơn tất cả những gì ai muốn, mà ảnh chụp hôm đó là những bức đẹp nhất nhà tôi có.',
      'Hai người khách trượt trên bậc thềm ướt, và cả hai không bị gì ngoài một ống tay áo ướt.',
      'Tới chiều thì nắng mạnh tới mức mặt đất khô hẳn và đáng ra kê bàn ra ngoài vẫn được.',
      'Em gái tôi nói em sẽ không đổi gì cả, dù em cũng nói em đã theo bản tin thời tiết suốt một tháng.',
      'Giờ bố tôi nói ở tỉnh này bản tin thời tiết trung thực duy nhất là bản tin cho ngày hôm qua.',
    ],
    hoi: [
      {
        q: 'Vì sao em gái người kể chọn tháng Mười Một để cưới?',
        options: ['Vì tháng Mười Một ở đây là tháng khô', 'Vì bản tin một tuần trước nói trời sẽ nắng', 'Vì tối thứ Sáu trời trong đủ để thấy sao', 'Vì bà nói cưới tháng đó thì nhà đông người'],
        answer: 0,
        cau: 0,
      },
      {
        q: 'Bà của người kể nói gì khi mẹ khóc?',
        options: ['Cưới mà mưa thì cả đời nhà đông người', 'Mưa sẽ tạnh trước giờ đám cưới bắt đầu', 'Nên dọn bàn ghế vào trong nhà cho chắc', 'Bản tin thời tiết ở tỉnh này không tin được'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Chín mươi khách đã ăn ở đâu?',
        options: ['Trong một phòng dựng cho năm mươi người', 'Ngoài sân, sau khi mặt đất đã khô hẳn', 'Chia làm hai chỗ, một nửa trong một nửa ngoài', 'Trong nhà buổi sáng, ngoài sân buổi chiều'],
        answer: 0,
        cau: 9,
      },
      {
        q: 'Bố người kể kết luận thế nào về bản tin thời tiết?',
        options: ['Ở tỉnh này bản tin trung thực duy nhất là bản tin cho hôm qua', 'Bản tin một tuần trước đáng tin hơn bản tin hai ngày trước', 'Nên nghe bà hơn là nghe bản tin thời tiết trên radio', 'Tháng Mười Một vẫn là tháng khô nhất trong cả năm ở đây'],
        answer: 0,
        cau: 14,
      },
    ],
  },
  'nature-environment-daily-p2': {
    en: [
      'The hill behind my village was bare when I was a child, and nobody remembered it any other way.',
      'An old man called Mr Bay began planting trees there in the year I was born.',
      'He planted alone for the first six years, and people in the village called it his hobby.',
      'Nineteen of his first thirty trees died, because he chose a kind that needs more water than that soil holds.',
      'He changed to a local kind after that, and the survival rate went above half.',
      'My school sent us up the hill once a year, and each child had to plant one tree and write its number on a card.',
      'My tree is number four hundred and six, and it is now taller than my father.',
      'Two hundred trees were lost in a fire in my last year of school, all on the southern side.',
      'Mr Bay replanted that side with a different mix, and he said a fire teaches you what to plant next.',
      'The stream at the bottom of the hill now runs all year, and it used to stop every March.',
      'Birds came back before the insects did, which Mr Bay says is the wrong order and he cannot explain it.',
      'The village council put a sign at the path with his name on it, and he asked them to take it down.',
      'They left it up, and he still says every year that it should not be there.',
      'He is ninety-one now, and he no longer climbs the hill, but he asks about it every day.',
      'The forest is not large and it is not old, but it is the only thing in the village that everyone is proud of.',
    ],
    vi: [
      'Ngọn đồi phía sau làng tôi trơ trọi khi tôi còn nhỏ, và không ai nhớ nó từng khác thế nào.',
      'Một ông cụ tên là ông Bảy bắt đầu trồng cây trên đó vào chính năm tôi sinh ra.',
      'Ông trồng một mình suốt sáu năm đầu, và người trong làng gọi đó là cái thú của ông.',
      'Mười chín trong ba mươi cây đầu tiên của ông bị chết, vì ông chọn một loại cần nhiều nước hơn thứ đất đó giữ được.',
      'Sau đó ông đổi sang một loại cây bản địa, và tỉ lệ sống lên trên một nửa.',
      'Trường tôi mỗi năm cho chúng tôi lên đồi một lần, và mỗi đứa phải trồng một cây rồi ghi số của nó vào một tấm thẻ.',
      'Cây của tôi là số bốn trăm lẻ sáu, và giờ nó cao hơn bố tôi.',
      'Hai trăm cây bị mất trong một vụ cháy vào năm cuối tôi học phổ thông, tất cả đều ở mặt phía nam.',
      'Ông Bảy trồng lại mặt đó bằng một hỗn hợp khác, và ông nói một vụ cháy dạy anh biết nên trồng gì tiếp.',
      'Con suối dưới chân đồi giờ chảy cả năm, trước kia tháng Ba nào nó cũng ngừng.',
      'Chim quay lại trước cả côn trùng, chuyện mà ông Bảy nói là sai thứ tự và ông không giải thích được.',
      'Hội đồng làng dựng một tấm bảng ở đầu lối đi có ghi tên ông, và ông xin họ dỡ nó xuống.',
      'Họ cứ để đó, và năm nào ông cũng vẫn nói là không nên có cái bảng ấy.',
      'Giờ ông chín mươi mốt tuổi, ông không lên đồi được nữa, nhưng ngày nào ông cũng hỏi về nó.',
      'Cánh rừng không lớn và cũng không già, nhưng nó là thứ duy nhất trong làng mà ai cũng tự hào.',
    ],
    hoi: [
      {
        q: 'Vì sao mười chín cây đầu tiên của ông Bảy bị chết?',
        options: ['Vì ông chọn loại cần nhiều nước hơn thứ đất đó giữ được', 'Vì một vụ cháy đã thiêu mất toàn bộ mặt phía nam đồi', 'Vì ông trồng một mình nên không kịp tưới hết số cây', 'Vì con suối dưới chân đồi ngừng chảy vào tháng Ba'],
        answer: 0,
        cau: 3,
      },
      {
        q: 'Trường của người kể tổ chức việc gì trên đồi?',
        options: ['Mỗi năm một lần, mỗi đứa trồng một cây và ghi số vào thẻ', 'Mỗi tháng một lần, cả lớp cùng trồng chung một hàng cây', 'Mỗi năm một lần, cả trường trồng lại mặt phía nam đồi', 'Mỗi năm hai lần, mỗi đứa tưới cây mình đã trồng năm trước'],
        answer: 0,
        cau: 5,
      },
      {
        q: 'Ông Bảy nói gì sau vụ cháy?',
        options: ['Một vụ cháy dạy anh biết nên trồng gì tiếp theo', 'Mặt phía nam của đồi thì không nên trồng lại nữa', 'Phải đổi hẳn sang loại cây bản địa cho chắc chắn', 'Chim sẽ quay lại trước cả côn trùng sau vụ cháy'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Ông Bảy phản ứng thế nào với tấm bảng ghi tên ông?',
        options: ['Ông xin hội đồng làng dỡ nó xuống, và vẫn nói vậy mỗi năm', 'Ông đồng ý để đó vì cả làng đều tự hào về cánh rừng', 'Ông tự dỡ nó xuống rồi mang về nhà mình giữ lại', 'Ông xin đổi tên trên tấm bảng đó thành tên của trường học'],
        answer: 0,
        cau: 11,
      },
    ],
  },
  'sports-fitness-daily': {
    en: [
      'Our school reached the district football final in my last year, and we lost it on penalties.',
      'We had won six matches that season, and four of them by a single goal.',
      'Our best player was a thin boy called Kien who never trained with the team on Wednesdays.',
      'He worked at his family\'s shop on Wednesdays, and the coach allowed it because Kien never missed a match.',
      'In the final the other school scored first, in the ninth minute, from a corner nobody defended.',
      'Kien equalised twenty minutes later with a shot that the goalkeeper touched but could not hold.',
      'Neither team scored again in the remaining hour, though we hit the crossbar twice in the second half.',
      'Two of our players were so tired by the end that the coach asked them not to take a penalty.',
      'Both of them insisted, and both of them scored, which the coach mentioned in every speech afterwards.',
      'Kien missed his, and he was the only one who did.',
      'He sat on the grass and would not get up until the referee had left the pitch.',
      'The coach told him a striker who never misses is a striker who never shoots, and Kien did not answer.',
      'At the school assembly on Monday the whole hall clapped for a team that had lost.',
      'Kien plays for a district club now, and he says that penalty is the reason he trains on Wednesdays.',
      'Our coach retired that summer after nineteen years, and the final was the last match he ever managed.',
    ],
    vi: [
      'Trường tôi vào tới trận chung kết bóng đá cấp quận vào năm cuối của tôi, và chúng tôi thua ở loạt luân lưu.',
      'Chúng tôi đã thắng sáu trận trong mùa đó, và bốn trận trong số ấy chỉ hơn đúng một bàn.',
      'Cầu thủ hay nhất của chúng tôi là một cậu gầy tên Kiên, cậu ấy không bao giờ tập cùng đội vào thứ Tư.',
      'Thứ Tư cậu ấy làm ở cửa hàng của nhà, và thầy huấn luyện cho phép vì Kiên không bỏ trận nào.',
      'Trong trận chung kết, trường kia ghi bàn trước, ở phút thứ chín, từ một quả góc không ai chịu kèm.',
      'Kiên gỡ hòa hai mươi phút sau bằng một cú sút mà thủ môn có chạm được nhưng không giữ nổi.',
      'Cả hai đội không ghi thêm bàn nào trong một tiếng còn lại, dù chúng tôi dội cột ngang hai lần trong nửa sau.',
      'Hai cầu thủ của chúng tôi cuối trận mệt tới mức thầy đề nghị họ đừng nhận quả luân lưu nào.',
      'Cả hai đều nhất định nhận, và cả hai đều ghi được, chuyện mà sau đó thầy nhắc trong mọi bài nói.',
      'Kiên thì sút không vào, và cậu ấy là người duy nhất như vậy.',
      'Cậu ấy ngồi xuống cỏ và không chịu đứng lên cho tới khi trọng tài rời khỏi sân.',
      'Thầy bảo cậu ấy rằng một tiền đạo không bao giờ sút trượt là một tiền đạo không bao giờ sút, và Kiên không đáp.',
      'Ở buổi tập trung sáng thứ Hai, cả hội trường vỗ tay cho một đội đã thua.',
      'Giờ Kiên chơi cho một câu lạc bộ của quận, và cậu ấy nói quả luân lưu đó là lý do cậu tập vào thứ Tư.',
      'Thầy của chúng tôi nghỉ hưu ngay mùa hè đó sau mười chín năm, và trận chung kết là trận cuối thầy dẫn.',
    ],
    hoi: [
      {
        q: 'Vì sao Kiên không tập cùng đội vào thứ Tư?',
        options: ['Vì thứ Tư cậu ấy làm ở cửa hàng của gia đình mình', 'Vì cậu ấy đã chơi cho một câu lạc bộ của quận', 'Vì thầy huấn luyện muốn cậu ấy nghỉ giữa các trận', 'Vì cậu ấy quá gầy nên không tập nổi cả tuần liền'],
        answer: 0,
        cau: 3,
      },
      {
        q: 'Trường kia ghi bàn mở tỉ số như thế nào?',
        options: ['Ở phút thứ chín, từ một quả góc không ai chịu kèm', 'Ở phút hai mươi, từ một cú sút thủ môn không giữ nổi', 'Ở nửa sau, sau khi đội của người kể dội cột ngang', 'Ở loạt luân lưu, sau khi Kiên đã sút không vào'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Hai cầu thủ mệt nhất đã làm gì ở loạt luân lưu?',
        options: ['Nhất định nhận sút, và cả hai đều ghi được bàn', 'Nghe theo thầy và không nhận quả luân lưu nào', 'Nhận sút nhưng cả hai đều sút trượt như Kiên', 'Xin thầy cho người khác sút thay mình hai quả'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Thầy huấn luyện nói gì với Kiên sau khi cậu sút trượt?',
        options: ['Một tiền đạo không bao giờ sút trượt là người không bao giờ sút', 'Cả hội trường rồi sẽ vỗ tay cho đội dù đội đã thua trận', 'Cậu ấy nên tập cùng cả đội vào cả ngày thứ Tư kể từ mùa giải sau', 'Trận này là trận cuối thầy dẫn nên đừng tự trách mình'],
        answer: 0,
        cau: 11,
      },
    ],
  },
};

export default VIET_LAI;
