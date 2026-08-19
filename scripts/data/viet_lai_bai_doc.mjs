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
  // ── ĐỢT BỐN 19/08: 6 chặng A2 (đợt A2 thứ hai) ───────────────────────────
  // Đợt này soạn câu nhiễu DÀI NGAY TỪ ĐẦU, không để bánh cóc bắt lần thứ ba:
  // chốt chặn thiên lệch độ dài nay nằm trong chính bộ ghi (xem phần kiểm hình
  // dữ liệu ở `scripts/viet_lai_bai_doc.mjs`), nên bài không ghi được nếu còn lệch.
  //
  // Sáu cảnh, cố ý không trùng cảnh nào của đợt trước: một năm hai thửa ruộng theo
  // bốn mùa; bộ sưu tập tiền xu của cậu để lại; đêm mười một tiếng ở sân bay; tám
  // tuần tập chạy năm ki-lô-mét; điện thoại chết hai ngày trước kỳ thi; tờ báo
  // trường bốn trang mười một người đọc.
  'weather-seasons-daily-p2': {
    en: [
      'My family grows rice on two small fields, and the weather decides how the year goes.',
      'In spring my father watches the sky more than the calendar, because planting too early wastes the seed.',
      'Last spring the rain came three weeks late, and the ground was too dry to work with.',
      'When it finally rained it rained for nine days without stopping, and half the young plants were washed away.',
      'In summer the heat is useful, but two years ago the temperature stayed above thirty-eight degrees for a fortnight.',
      'My mother says a hot summer is easier to plan for than a wet one, because water is the thing you cannot remove.',
      'In autumn we harvest, and the only thing we fear is a storm arriving in the last week.',
      'That is exactly what happened in October: a storm came four days before we finished cutting.',
      'We lost the third field completely, and my father did not speak for most of that evening.',
      'The first two fields were already cut and dry under cover, which is why we did not lose everything.',
      'In winter the fields rest, and we repair the roof and the fence with the money from the harvest.',
      'Winter here is not cold enough for frost, but the wind at night is strong enough to move roof tiles.',
      'My grandmother remembers a winter fifty years ago when ice formed on a bucket, and nobody believes her.',
      'My father now cuts the earliest field a week sooner than he used to, even if the rice is not perfect.',
      'He says a smaller harvest you actually keep is better than a bigger one the sky can take from you.',
    ],
    vi: [
      'Nhà tôi trồng lúa trên hai thửa ruộng nhỏ, và thời tiết quyết định cả năm ra sao.',
      'Mùa xuân bố tôi ngó trời nhiều hơn ngó lịch, vì cấy sớm quá là bỏ giống đi.',
      'Mùa xuân năm ngoái mưa tới muộn ba tuần, và đất khô quá không làm được.',
      'Tới lúc mưa thì mưa chín ngày không ngớt, và một nửa số cây non bị nước trôi mất.',
      'Mùa hè thì cái nóng lại có ích, nhưng hai năm trước nhiệt độ ở trên ba mươi tám độ suốt nửa tháng.',
      'Mẹ tôi nói mùa hè nóng dễ tính trước hơn mùa hè ướt, vì nước là thứ mình không lấy ra được.',
      'Mùa thu chúng tôi thu hoạch, và điều duy nhất chúng tôi sợ là bão tới vào tuần cuối.',
      'Tháng Mười năm đó đúng là như vậy: bão tới bốn ngày trước khi chúng tôi cắt xong.',
      'Chúng tôi mất trắng thửa thứ ba, và bố tôi gần như không nói gì suốt buổi tối đó.',
      'Hai thửa đầu thì đã cắt xong và phơi khô dưới mái che, nhờ vậy chúng tôi không mất hết.',
      'Mùa đông ruộng nghỉ, và chúng tôi sửa lại mái với hàng rào bằng tiền của vụ thu hoạch.',
      'Mùa đông ở đây không lạnh tới mức có sương giá, nhưng gió đêm đủ mạnh để làm xê dịch ngói.',
      'Bà tôi nhớ một mùa đông năm mươi năm trước có băng đóng trên một cái xô, và không ai tin bà.',
      'Giờ bố tôi cắt thửa sớm nhất trước một tuần so với trước kia, dù lúa chưa được đẹp.',
      'Bố nói một vụ nhỏ mà giữ được thì hơn một vụ lớn mà trời có thể lấy đi của mình.',
    ],
    hoi: [
      {
        q: 'Mùa xuân năm ngoái, thời tiết làm hỏng việc thế nào?',
        options: ['Mưa tới muộn ba tuần, rồi lại mưa chín ngày không ngớt', 'Nhiệt độ ở trên ba mươi tám độ suốt cả nửa tháng liền', 'Một cơn bão tới đúng bốn ngày trước khi cắt lúa xong', 'Gió đêm mạnh tới mức làm xê dịch hết ngói trên mái nhà'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Theo mẹ người kể, vì sao mùa hè nóng dễ tính trước hơn mùa hè ướt?',
        options: ['Vì nước là thứ mình không lấy ra được', 'Vì cái nóng làm lúa chín nhanh hơn hẳn', 'Vì mùa hè ướt thường kèm theo bão lớn', 'Vì đất khô thì dễ làm hơn đất ngập nước'],
        answer: 0,
        cau: 5,
      },
      {
        q: 'Vì sao gia đình không mất hết trong cơn bão tháng Mười?',
        options: ['Vì hai thửa đầu đã cắt xong và phơi khô dưới mái che', 'Vì bão chỉ đi qua đúng một thửa ruộng thứ ba', 'Vì bố đã cắt cả ba thửa sớm hơn một tuần', 'Vì mái che và hàng rào vừa mới được sửa lại xong hết'],
        answer: 0,
        cau: 9,
      },
      {
        q: 'Bố người kể đổi cách làm thế nào sau chuyện đó?',
        options: ['Cắt thửa sớm nhất trước một tuần, dù lúa chưa đẹp', 'Chỉ trồng hai thửa thay vì trồng cả ba thửa ruộng', 'Ngó lịch nhiều hơn ngó trời khi tới vụ cấy lúa', 'Dựng thêm mái che cho cả ba thửa ruộng của nhà'],
        answer: 0,
        cau: 13,
      },
    ],
  },
  'hobbies-interests-daily': {
    en: [
      'When my uncle died four years ago he left me two heavy boxes and no explanation.',
      'Inside were coins from nineteen countries, sorted into paper envelopes with dates written on them.',
      'My mother wanted to sell the whole collection, because we needed money that year more than we needed coins.',
      'I asked her to wait one month while I found out what the collection actually was.',
      'A man at a shop near the market looked at the boxes for half an hour and then made an offer.',
      'The offer was low, and he admitted himself that two of the envelopes were worth more than all the rest.',
      'Those two envelopes held coins my uncle had bought in the same year I was born.',
      'I sold everything except those two, and the money paid for my mother\'s hospital bill that autumn.',
      'Now I collect coins myself, but only from countries somebody in my family has actually visited.',
      'That rule makes the collection grow slowly, which my sister thinks is the whole point of a hobby.',
      'I keep them in the same paper envelopes, and I write the date in the same corner as my uncle did.',
      'Last year I found a coin in a market that my uncle had listed but never owned.',
      'It cost me two days of work, and it is not rare or valuable to anybody but me.',
      'My mother still says the collection is money sitting in a box doing nothing.',
      'She is right, and I have stopped trying to argue with her about it.',
    ],
    vi: [
      'Khi cậu tôi mất bốn năm trước, cậu để lại cho tôi hai cái thùng nặng và không một lời giải thích.',
      'Bên trong là tiền xu của mười chín nước, xếp vào từng phong bì giấy có ghi ngày ở ngoài.',
      'Mẹ tôi muốn bán cả bộ, vì năm đó nhà tôi cần tiền hơn là cần tiền xu.',
      'Tôi xin mẹ chờ một tháng để tôi tìm hiểu xem bộ sưu tập đó thật ra là gì.',
      'Một ông ở cửa hàng gần chợ xem hai cái thùng suốt nửa tiếng rồi đưa ra một cái giá.',
      'Cái giá đó thấp, và chính ông thừa nhận hai cái phong bì có giá hơn tất cả phần còn lại.',
      'Hai phong bì đó đựng những đồng xu cậu tôi mua đúng vào năm tôi sinh ra.',
      'Tôi bán hết trừ hai phong bì đó, và số tiền đủ trả tiền bệnh viện cho mẹ tôi mùa thu năm ấy.',
      'Giờ chính tôi sưu tập tiền xu, nhưng chỉ của những nước mà một người trong nhà đã thật sự đặt chân tới.',
      'Cái luật đó làm bộ sưu tập lớn lên rất chậm, chuyện mà em gái tôi cho rằng mới đúng là ý nghĩa của một sở thích.',
      'Tôi giữ chúng trong đúng loại phong bì giấy đó, và tôi ghi ngày vào đúng cái góc mà cậu tôi từng ghi.',
      'Năm ngoái tôi tìm được ở chợ một đồng xu mà cậu tôi có ghi trong danh sách nhưng chưa từng có.',
      'Nó lấy của tôi hai ngày công, và nó không hiếm cũng không quý với ai ngoài tôi.',
      'Mẹ tôi vẫn nói bộ sưu tập là tiền nằm trong thùng chẳng làm gì cả.',
      'Mẹ đúng, và tôi đã thôi cố tranh luận với mẹ về chuyện đó.',
    ],
    hoi: [
      {
        q: 'Trong hai cái thùng cậu để lại có gì?',
        options: ['Tiền xu của mười chín nước, xếp trong phong bì có ghi ngày', 'Tiền xu của mười chín nước cùng một danh sách viết tay', 'Tiền xu và tem của nhiều nước, xếp lẫn vào nhau', 'Hai cái phong bì giấy đựng những đồng xu quý nhất'],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Vì sao người kể giữ lại đúng hai cái phong bì?',
        options: ['Vì chúng đựng những đồng xu cậu mua đúng năm người kể sinh ra', 'Vì chính ông ở cửa hàng đã khuyên nên giữ lại hai cái đó', 'Vì hai cái đó là những phong bì duy nhất còn nguyên vẹn', 'Vì mẹ người kể muốn giữ lại vài thứ để làm kỷ niệm'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Luật riêng của người kể khi sưu tập là gì?',
        options: ['Chỉ lấy xu của nước mà một người trong nhà đã đặt chân tới', 'Chỉ lấy những đồng xu có trong danh sách của cậu để lại', 'Chỉ lấy xu mua được ở chợ gần nhà, không mua ở cửa hàng', 'Chỉ lấy xu đúc trong năm mà người kể được sinh ra'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Người kể nói gì về đồng xu tìm được ở chợ năm ngoái?',
        options: ['Nó không hiếm cũng không quý với ai ngoài chính người kể', 'Nó là đồng xu quý nhất trong cả bộ sưu tập hiện nay', 'Nó lấy của người kể hai ngày công nhưng bán lại được giá', 'Nó vốn thuộc về cậu nhưng đã bị bán đi từ trước đó'],
        answer: 0,
        cau: 12,
      },
    ],
  },
  'transport-travel-daily': {
    en: [
      'My first flight abroad was delayed for eleven hours, and I learned more from that night than from the trip itself.',
      'The board said the delay was two hours, then three, then it stopped saying anything at all.',
      'Nobody at the desk knew more than we did, which the woman there admitted after the fourth time I asked.',
      'A man beside me had a connecting flight in another country and was going to lose it whatever happened.',
      'He was calm about it, and he told me the trick is to ask what the airline will pay for, not when the plane will leave.',
      'I asked, and they gave me a card for food worth about the price of two bowls of noodles.',
      'The airport shops closed at eleven, so the card was useless until six in the morning.',
      'I slept on three chairs with my bag under my head, and a cleaner woke me twice to move.',
      'At four in the morning the airport was colder than the street outside, and I put on every shirt I had packed.',
      'The flight finally left at nine, and the plane was less than half full because many people had given up.',
      'The pilot apologised over the speaker and said the problem had been a part they had to fly in from another city.',
      'When I arrived my suitcase was not there, and it came to my hotel two days later.',
      'Inside it, everything was fine except a bottle of fish sauce, which had opened.',
      'Now I keep one change of clothes and a toothbrush in the bag I carry on, and no bottles at all.',
      'The man with the connecting flight sent me a message a week later saying he had got home eventually.',
    ],
    vi: [
      'Chuyến bay ra nước ngoài đầu tiên của tôi bị hoãn mười một tiếng, và tôi học được từ cái đêm đó nhiều hơn từ cả chuyến đi.',
      'Bảng thông báo ghi hoãn hai tiếng, rồi ba tiếng, rồi nó thôi ghi gì nữa.',
      'Không ai ở quầy biết nhiều hơn chúng tôi, chuyện mà chính cô ở đó thừa nhận sau lần thứ tư tôi hỏi.',
      'Một ông ngồi cạnh tôi có chuyến nối ở một nước khác và kiểu gì cũng sẽ mất chuyến đó.',
      'Ông ấy bình tĩnh, và ông bảo tôi mẹo là hỏi hãng sẽ chi trả những gì, chứ không phải hỏi mấy giờ máy bay đi.',
      'Tôi hỏi, và họ đưa tôi một cái phiếu ăn trị giá khoảng bằng hai bát phở.',
      'Các cửa hàng trong sân bay đóng lúc mười một giờ, nên cái phiếu đó vô dụng cho tới sáu giờ sáng.',
      'Tôi ngủ trên ba cái ghế với cái túi kê dưới đầu, và một người dọn vệ sinh gọi tôi dậy hai lần để dịch chỗ.',
      'Bốn giờ sáng, trong sân bay còn lạnh hơn ngoài đường, và tôi mặc hết số áo mình mang theo.',
      'Chuyến bay cuối cùng khởi hành lúc chín giờ, và máy bay không đầy được một nửa vì nhiều người đã bỏ.',
      'Phi công xin lỗi qua loa và nói vấn đề là một bộ phận họ phải chở từ một thành phố khác tới.',
      'Lúc tôi tới thì cái vali của tôi không có ở đó, và nó tới khách sạn của tôi hai ngày sau.',
      'Bên trong, mọi thứ đều ổn trừ một chai nước mắm, chai đó đã bị bung ra.',
      'Giờ tôi luôn để một bộ quần áo và một cái bàn chải trong túi mang lên máy bay, và không mang chai nào cả.',
      'Ông có chuyến nối gửi tin cho tôi một tuần sau, nói rốt cuộc ông cũng về được nhà.',
    ],
    hoi: [
      {
        q: 'Theo ông ngồi cạnh, mẹo khi bị hoãn chuyến là gì?',
        options: ['Hỏi hãng sẽ chi trả những gì, không hỏi mấy giờ máy bay đi', 'Hỏi liên tục ở quầy cho tới khi họ nói ra giờ bay thật', 'Đổi ngay sang một chuyến khác của hãng khác cho chắc', 'Ra ngoài đường tìm chỗ ngủ vì trong sân bay rất lạnh'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Vì sao cái phiếu ăn trở thành vô dụng?',
        options: ['Vì cửa hàng trong sân bay đóng lúc mười một giờ đêm', 'Vì trị giá của nó chỉ bằng khoảng hai bát phở', 'Vì người kể đã ngủ mất và quên không dùng nó', 'Vì người dọn vệ sinh bắt người kể dịch chỗ hai lần'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Phi công nói nguyên nhân của việc hoãn là gì?',
        options: ['Một bộ phận phải chở từ một thành phố khác tới', 'Thời tiết ở nơi đến quá xấu để hạ cánh an toàn', 'Nhiều hành khách đã bỏ chuyến nên phải xếp lại', 'Máy bay không đầy được một nửa số ghế trên khoang'],
        answer: 0,
        cau: 10,
      },
      {
        q: 'Trong vali, thứ duy nhất có vấn đề là gì?',
        options: ['Một chai nước mắm, chai đó đã bị bung ra', 'Một bộ quần áo bị ướt hết vì trời mưa', 'Cái bàn chải bị mất trong hai ngày chờ đợi', 'Toàn bộ số áo người kể mang theo bị bẩn'],
        answer: 0,
        cau: 12,
      },
    ],
  },
  'health-body-daily-p2': {
    en: [
      'I signed up for a five-kilometre run because a friend said it was nothing, and he was wrong about that.',
      'I had eight weeks, and I could not run for four minutes without stopping on the first day.',
      'My shoulders hurt more than my legs in the first two weeks, because I was holding my arms too high.',
      'A woman at the park who runs every morning told me to drop my hands and breathe through my nose.',
      'That one change made the second week easier than the first, which I had not expected at all.',
      'In week five my right knee began to hurt after every run, and I ignored it for nine days.',
      'By the time I saw a doctor I could not walk down stairs without holding the rail.',
      'He said the muscle above the knee was weak, so the knee was doing work that was not its own.',
      'He gave me four exercises and told me not to run at all for twelve days.',
      'I did the exercises twice a day and hated every one of them, especially the slowest one.',
      'When I started again my knee was quiet, and I could run further than before the injury.',
      'On the day of the run it rained, and my shoes were full of water after one kilometre.',
      'I finished in thirty-four minutes, which was slower than my worst practice run.',
      'My friend who said it was nothing did not finish, because he had done no training at all.',
      'The woman from the park was there too, and she finished eleven minutes before I did.',
    ],
    vi: [
      'Tôi đăng ký chạy năm ki-lô-mét vì một người bạn nói việc đó chẳng có gì, và cậu ấy đã sai chỗ đó.',
      'Tôi có tám tuần, và ngày đầu tôi không chạy nổi bốn phút mà không phải dừng.',
      'Hai tuần đầu vai tôi đau hơn cả chân, vì tôi giữ hai tay quá cao.',
      'Một cô chạy ở công viên mỗi sáng bảo tôi hạ tay xuống và hít thở bằng mũi.',
      'Chỉ một thay đổi đó làm tuần thứ hai dễ hơn tuần đầu, chuyện tôi hoàn toàn không ngờ tới.',
      'Tuần thứ năm đầu gối phải của tôi bắt đầu đau sau mỗi lần chạy, và tôi bỏ qua nó suốt chín ngày.',
      'Tới lúc tôi đi gặp bác sĩ thì tôi không xuống được cầu thang mà không bám tay vào tay cầm.',
      'Bác sĩ nói bắp cơ phía trên đầu gối bị yếu, nên cái đầu gối đang phải làm việc không phải của nó.',
      'Bác cho tôi bốn bài tập và dặn tuyệt đối không chạy trong mười hai ngày.',
      'Tôi tập hai lần mỗi ngày và ghét từng bài một, nhất là cái bài chậm nhất.',
      'Lúc chạy lại thì đầu gối tôi im, và tôi chạy được xa hơn cả trước khi bị đau.',
      'Ngày chạy chính thức thì trời mưa, và giày tôi đầy nước sau một ki-lô-mét.',
      'Tôi về đích trong ba mươi bốn phút, chậm hơn cả buổi tập tệ nhất của tôi.',
      'Người bạn nói việc đó chẳng có gì thì không về đích, vì cậu ấy chẳng tập gì cả.',
      'Cô ở công viên cũng có ở đó, và cô về đích trước tôi mười một phút.',
    ],
    hoi: [
      {
        q: 'Vì sao hai tuần đầu vai người kể đau hơn cả chân?',
        options: ['Vì người kể giữ hai tay quá cao khi chạy', 'Vì người kể chưa hít thở bằng mũi khi chạy', 'Vì bắp cơ phía trên đầu gối vốn đã bị yếu', 'Vì ngày đầu chạy chưa nổi bốn phút liên tục'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Bác sĩ giải thích cơn đau đầu gối là do đâu?',
        options: ['Bắp cơ phía trên đầu gối yếu nên đầu gối làm việc không phải của nó', 'Chạy quá xa trong tuần thứ năm mà không nghỉ đủ giữa các buổi', 'Bỏ qua cơn đau suốt chín ngày nên chỗ đau nặng thêm nhiều', 'Đi xuống cầu thang mà không bám tay vào tay cầm bên cạnh'],
        answer: 0,
        cau: 7,
      },
      {
        q: 'Bác sĩ dặn nghỉ chạy bao lâu?',
        options: ['Mười hai ngày, tuyệt đối không chạy', 'Chín ngày, đúng bằng số ngày đã bỏ qua', 'Hai tuần, rồi chạy lại thật chậm', 'Tám tuần, tức là hết cả thời gian tập'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Kết quả ngày chạy chính thức của người kể thế nào?',
        options: ['Ba mươi bốn phút, chậm hơn cả buổi tập tệ nhất', 'Ba mươi bốn phút, nhanh hơn mọi buổi tập trước đó', 'Không về đích được vì giày đầy nước sau một ki-lô', 'Về đích trước cô ở công viên đúng mười một phút'],
        answer: 0,
        cau: 12,
      },
    ],
  },
  'technology-gadgets-daily': {
    en: [
      'My phone stopped working two days before my final exam, and everything I needed was inside it.',
      'The screen showed nothing at all, but the phone was warm, so I knew it had not simply run out of battery.',
      'I had photographed sixty pages of notes and never copied them anywhere else.',
      'A shop near the university looked at it and said the screen was fine but a part behind it had failed.',
      'They wanted four days and a price I could not pay before the exam.',
      'A second shop, run by a man of about twenty-five, opened the phone while I waited.',
      'He said the same part had failed, but he had one from another phone of the same model.',
      'It worked for nine minutes, long enough for me to copy every photograph onto a computer.',
      'Then it went dark again, and he did not charge me anything because the repair had not lasted.',
      'He told me the real mistake was not the phone; it was keeping one copy of anything important.',
      'I printed the notes that evening on paper, which felt old-fashioned and worked perfectly.',
      'After the exam I bought a cheap second phone instead of repairing the first one properly.',
      'Now every photograph I take goes to a second place automatically, and I have checked that it really does.',
      'My old phone is still in a drawer, and I have not thrown it away for no clear reason.',
      'The man in the second shop is the person I recommend whenever anyone asks me about repairs.',
    ],
    vi: [
      'Điện thoại của tôi ngừng hoạt động hai ngày trước kỳ thi cuối, và mọi thứ tôi cần đều ở trong đó.',
      'Màn hình không hiện gì cả, nhưng cái máy thì ấm, nên tôi biết nó không đơn giản là hết pin.',
      'Tôi đã chụp sáu mươi trang ghi chép và chưa từng sao chép chúng sang đâu khác.',
      'Một cửa hàng gần trường xem máy rồi nói màn hình không sao nhưng một bộ phận phía sau nó đã hỏng.',
      'Họ đòi bốn ngày và một cái giá tôi không trả nổi trước kỳ thi.',
      'Cửa hàng thứ hai, do một anh khoảng hai mươi lăm tuổi làm, mở máy ra ngay khi tôi còn đứng chờ.',
      'Anh nói đúng bộ phận đó đã hỏng, nhưng anh có một cái lấy từ máy khác cùng đời.',
      'Nó chạy được chín phút, đủ lâu để tôi sao hết số ảnh sang một cái máy tính.',
      'Rồi nó tối lại, và anh không lấy của tôi đồng nào vì lần sửa đó không trụ được.',
      'Anh bảo tôi cái sai thật ra không phải ở điện thoại; mà là ở việc chỉ giữ một bản của một thứ quan trọng.',
      'Tối đó tôi in số ghi chép ra giấy, cảm giác thì cổ lỗ mà lại chạy tốt hoàn hảo.',
      'Sau kỳ thi tôi mua một cái điện thoại thứ hai loại rẻ thay vì sửa cái đầu cho tử tế.',
      'Giờ mọi bức ảnh tôi chụp đều tự sang một chỗ thứ hai, và tôi đã kiểm rằng nó sang thật.',
      'Cái điện thoại cũ vẫn nằm trong ngăn kéo, và tôi chưa bỏ nó đi vì một lý do không rõ ràng nào.',
      'Anh ở cửa hàng thứ hai là người tôi giới thiệu mỗi khi có ai hỏi tôi về chuyện sửa máy.',
    ],
    hoi: [
      {
        q: 'Vì sao người kể biết điện thoại không phải chỉ hết pin?',
        options: ['Vì màn hình không hiện gì mà cái máy thì vẫn ấm', 'Vì cửa hàng gần trường đã nói màn hình không sao', 'Vì máy đã tối lại đúng sau chín phút chạy được', 'Vì trước đó máy vẫn chụp được sáu mươi trang ghi chép'],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Cửa hàng thứ hai làm được gì mà cửa hàng thứ nhất không làm?',
        options: ['Có một bộ phận lấy từ máy khác cùng đời để thay ngay', 'Sửa xong hẳn cái máy chỉ trong vòng bốn ngày chờ', 'Đưa ra một cái giá thấp hơn nhiều so với chỗ đầu', 'Chỉ ra rằng màn hình mới là chỗ thật sự bị hỏng'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Vì sao anh ở cửa hàng thứ hai không lấy tiền?',
        options: ['Vì lần sửa đó không trụ được, máy tối lại sau chín phút', 'Vì người kể là sinh viên và sắp phải đi thi cuối kỳ', 'Vì bộ phận thay vào là đồ cũ lấy từ một máy khác', 'Vì người kể sẽ giới thiệu cửa hàng cho những người khác'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Theo anh ấy, cái sai thật sự của người kể là gì?',
        options: ['Chỉ giữ một bản của một thứ quan trọng', 'Không mang máy đi sửa ngay từ hôm đầu', 'Chụp ghi chép bằng ảnh thay vì in ra giấy', 'Mua một cái điện thoại quá rẻ ngay từ đầu'],
        answer: 0,
        cau: 9,
      },
    ],
  },
  'entertainment-media-daily-p2': {
    en: [
      'Our school newspaper had four pages and eleven readers, and I became its editor by being the only person who applied.',
      'The first thing I learned is that nobody wants to write, but everybody wants to be interviewed.',
      'I asked the football team for a short article and received three sentences, two of them the same.',
      'So I changed the plan: instead of articles, I would ask questions and print the answers exactly as given.',
      'The first interview was with the woman who has cooked in our school kitchen for twenty-two years.',
      'She told me she knows which class is coming down the corridor by the sound alone.',
      'That issue was read by more than a hundred students, and two teachers asked for extra copies.',
      'After that, people came to me with ideas instead of me chasing them for a paragraph.',
      'One student wanted to review films, but he only wanted to review films he had not seen.',
      'I said no, and he wrote about the cinema queue instead, which turned out to be funnier.',
      'A local newspaper printed two paragraphs from our kitchen interview, without asking us first.',
      'They spelled the cook\'s name wrong, and she was more annoyed about that than about anything else.',
      'We now print a photograph on the front page, because the issue with a photograph sells out first.',
      'Our budget is the money from selling old paper, and it pays for exactly six issues a year.',
      'I will finish school in June, and so far nobody has applied to take over.',
    ],
    vi: [
      'Tờ báo trường tôi có bốn trang và mười một người đọc, và tôi thành người phụ trách vì tôi là người duy nhất xin làm.',
      'Điều đầu tiên tôi học được là không ai muốn viết, nhưng ai cũng muốn được phỏng vấn.',
      'Tôi xin đội bóng của trường một bài ngắn và nhận được ba câu, trong đó hai câu giống nhau.',
      'Nên tôi đổi cách làm: thay vì bài viết, tôi sẽ đặt câu hỏi và in nguyên câu trả lời của người ta.',
      'Bài phỏng vấn đầu tiên là với cô đã nấu ăn trong bếp trường tôi suốt hai mươi hai năm.',
      'Cô kể cô biết lớp nào đang đi dọc hành lang chỉ bằng cách nghe tiếng.',
      'Số báo đó có hơn một trăm học sinh đọc, và hai thầy cô còn hỏi xin thêm bản.',
      'Sau đó người ta tự tìm tôi với ý tưởng, thay vì tôi phải chạy theo họ xin một đoạn.',
      'Một bạn muốn viết điểm phim, nhưng cậu ấy chỉ muốn viết về những phim cậu chưa xem.',
      'Tôi nói không, và cậu ấy viết về chuyện xếp hàng ở rạp, hóa ra lại vui hơn.',
      'Một tờ báo địa phương in lại hai đoạn từ bài phỏng vấn cô nấu bếp, mà không hỏi chúng tôi trước.',
      'Họ viết sai tên cô, và cô khó chịu về chuyện đó hơn tất cả mọi chuyện khác.',
      'Giờ chúng tôi in một bức ảnh ở trang nhất, vì số báo nào có ảnh thì bán hết trước.',
      'Ngân sách của chúng tôi là tiền bán giấy vụn, và nó đủ trả cho đúng sáu số một năm.',
      'Tháng Sáu tôi ra trường, và tới giờ chưa ai xin làm thay.',
    ],
    hoi: [
      {
        q: 'Điều đầu tiên người kể học được khi làm báo trường là gì?',
        options: ['Không ai muốn viết, nhưng ai cũng muốn được phỏng vấn', 'Số báo có ảnh ở trang nhất thì luôn bán hết trước', 'Phải chạy theo người ta rất lâu mới xin được một đoạn', 'In nguyên câu trả lời thì dễ hơn là tự viết thành bài'],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Cô nấu bếp kể chi tiết gì về công việc của mình?',
        options: ['Cô biết lớp nào đang đi dọc hành lang chỉ bằng cách nghe tiếng', 'Cô đã nấu ăn trong bếp trường suốt hai mươi hai năm liền', 'Cô khó chịu nhất là chuyện tờ báo địa phương viết sai tên', 'Cô thấy số báo có ảnh trang nhất thì học sinh đọc nhiều hơn'],
        answer: 0,
        cau: 5,
      },
      {
        q: 'Bạn muốn viết điểm phim gặp vấn đề gì?',
        options: ['Cậu ấy chỉ muốn viết về những phim cậu chưa hề xem', 'Cậu ấy viết ba câu mà hai câu trong đó giống nhau', 'Cậu ấy muốn được phỏng vấn thay vì phải tự viết bài', 'Cậu ấy viết về chuyện xếp hàng ở rạp thay vì về phim'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Cô nấu bếp khó chịu nhất về chuyện gì?',
        options: ['Tờ báo địa phương viết sai tên cô', 'Tờ báo địa phương không hỏi trước khi in', 'Bài phỏng vấn chỉ được in lại có hai đoạn', 'Hai thầy cô phải hỏi xin thêm bản báo'],
        answer: 0,
        cau: 11,
      },
    ],
  },
};

export default VIET_LAI;
