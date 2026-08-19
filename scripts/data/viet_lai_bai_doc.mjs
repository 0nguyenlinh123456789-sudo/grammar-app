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
  // ── ĐỢT MỘT: 4 chặng A1 ───────────────────────────────────────────────────
  'animals-pets-beginner': {
    en: [
      'My name is Mai, and I keep two pets at home.',
      'My dog is called Bo.',
      'He is still a puppy, so he barks at the door and wags his tail every time I come home.',
      'My cat is called Mun, and she has grey fur with one white paw.',
      'She sleeps on my bed all afternoon, and at six o\'clock I feed them both.',
      'Last Sunday my uncle took me to his farm, because he is a farmer.',
      'He showed me how to get milk from a cow, and he let me touch the sheep and the goat.',
      'I did not go near the pig, because it was much bigger than I expected.',
      'The chickens and the ducks ran away from me and hid behind a nest of dry grass.',
      'On Monday our class went to the zoo, and our teacher told us to stay behind the cage.',
      'I liked the elephant best, because it drank water with its long nose.',
      'My friend Nam liked the monkey, because the monkey took his hat and would not give it back.',
      'We did not see the lion at all; the keeper said it was asleep in the shade.',
      'On the way home we stopped beside a pond and watched a small frog jump into the water.',
      'A bee flew past my ear, but it did not bite me.',
      'I want to work in a zoo when I grow up, because wild animals are not scary to me.',
    ],
    vi: [
      'Tên tôi là Mai, và tôi nuôi hai con vật ở nhà.',
      'Con chó của tôi tên là Bo.',
      'Nó vẫn còn là chó con, nên nó kêu ăng ẳng ở cửa và vẫy đuôi mỗi lần tôi về nhà.',
      'Con mèo của tôi tên là Mun, và nó có bộ lông xám với một bàn chân trắng.',
      'Nó ngủ trên giường tôi suốt buổi chiều, và đúng sáu giờ tôi cho cả hai con ăn.',
      'Chủ nhật vừa rồi cậu tôi đưa tôi tới trang trại của cậu, vì cậu là nông dân.',
      'Cậu chỉ tôi cách lấy sữa từ con bò, và cho tôi chạm vào con cừu và con dê.',
      'Tôi không lại gần con lợn, vì nó to hơn tôi tưởng nhiều.',
      'Mấy con gà và con vịt chạy khỏi tôi rồi trốn sau một cái tổ bằng cỏ khô.',
      'Thứ Hai cả lớp tôi đi sở thú, và cô giáo dặn chúng tôi đứng sau lồng.',
      'Tôi thích con voi nhất, vì nó uống nước bằng cái mũi dài của mình.',
      'Bạn Nam của tôi thích con khỉ, vì con khỉ lấy mũ của cậu ấy và không trả lại.',
      'Chúng tôi không thấy con sư tử nào cả; người trông sở thú nói nó đang ngủ trong bóng mát.',
      'Trên đường về chúng tôi dừng bên một cái ao và xem một con ếch nhỏ nhảy xuống nước.',
      'Một con ong bay qua tai tôi, nhưng nó không đốt tôi.',
      'Tôi muốn làm việc trong sở thú khi lớn lên, vì với tôi động vật hoang dã không đáng sợ.',
    ],
    hoi: [
      {
        q: 'Con mèo Mun trông thế nào?',
        options: [
          'Lông xám, có một bàn chân trắng',
          'Lông xám, có một cái tai trắng',
          'Lông trắng, có một bàn chân xám',
          'Lông xám hết, không có chỗ nào trắng',
        ],
        answer: 0,
        cau: 3,
      },
      {
        q: 'Vì sao người kể không lại gần con lợn?',
        options: [
          'Vì nó to hơn người kể tưởng nhiều',
          'Vì cậu của người kể không cho lại gần',
          'Vì nó đang ăn và có thể cắn người kể',
          'Vì nó trốn sau một cái tổ bằng cỏ khô',
        ],
        answer: 0,
        cau: 7,
      },
      {
        q: 'Vì sao bạn Nam thích con khỉ?',
        options: [
          'Vì con khỉ lấy mũ của cậu ấy và không trả lại',
          'Vì con khỉ uống nước bằng cái mũi dài của nó',
          'Vì con khỉ chạy khỏi cậu ấy rồi trốn sau cái tổ',
          'Vì con khỉ ngủ trong bóng mát cả buổi chiều',
        ],
        answer: 0,
        cau: 11,
      },
      {
        q: 'Vì sao cả lớp không thấy con sư tử?',
        options: [
          'Người trông sở thú nói nó đang ngủ trong bóng mát',
          'Cô giáo dặn cả lớp phải đứng ở phía sau cái lồng',
          'Cả lớp về sớm nên không kịp đi hết vòng sở thú',
          'Nó bị chuyển sang một sở thú khác từ hôm thứ Hai',
        ],
        answer: 0,
        cau: 12,
      },
    ],
  },

  'transport-vehicles-beginner': {
    en: [
      'Last Friday I had to travel from my village to the airport, and the journey took me all day.',
      'I missed the seven o\'clock bus, because I could not find my ticket in my bag.',
      'The next bus came an hour later, so I waited at the bus stop and read a map.',
      'The road out of the village is narrow, and the driver had to stop twice for a slow truck.',
      'We crossed the river on an old bridge, not through the new tunnel, because the tunnel was closed.',
      'In the city I got off at the station and took the subway, which was much faster than the tram.',
      'A woman beside me said the traffic above our heads was worse than usual that morning.',
      'When I came out I could not find the airport bus, so I caught a taxi at the corner.',
      'The taxi driver told me to put on my seat belt before he would start the engine.',
      'He drove onto the highway, and we passed a police car and an ambulance near a broken van.',
      'At the airport I showed my ticket, and a man in a uniform pointed me to the right gate.',
      'The pilot said the flight would be two hours, and that the weather ahead was safe.',
      'My brother rides a motorbike everywhere, and he always wears a helmet, even for a short trip.',
      'He says a bicycle is better in our village, because the path behind the school is too narrow for a car.',
      'Next time I will keep my ticket in my pocket, so I do not miss the first bus again.',
    ],
    vi: [
      'Thứ Sáu vừa rồi tôi phải đi từ làng tôi ra sân bay, và chuyến đi mất của tôi cả ngày.',
      'Tôi trượt chuyến xe buýt bảy giờ, vì tôi không tìm thấy vé của mình trong túi.',
      'Chuyến sau tới muộn một tiếng, nên tôi đứng chờ ở trạm xe buýt và xem bản đồ.',
      'Con đường ra khỏi làng thì hẹp, và bác tài phải dừng hai lần vì một chiếc xe tải chạy chậm.',
      'Chúng tôi qua sông bằng một cây cầu cũ, không đi qua đường hầm mới, vì đường hầm đang đóng.',
      'Vào thành phố tôi xuống ở nhà ga rồi đi tàu điện ngầm, nhanh hơn tàu điện mặt đất nhiều.',
      'Một người phụ nữ ngồi cạnh tôi nói giao thông trên đầu chúng tôi sáng đó tệ hơn thường lệ.',
      'Lúc lên khỏi ga tôi không tìm được xe buýt ra sân bay, nên tôi bắt một chiếc taxi ở góc phố.',
      'Bác tài taxi bảo tôi thắt dây an toàn trước khi bác nổ máy.',
      'Bác lái lên đường cao tốc, và chúng tôi đi qua một xe cảnh sát và một xe cứu thương cạnh chiếc xe tải nhỏ bị hỏng.',
      'Ở sân bay tôi trình vé, và một người mặc đồng phục chỉ tôi tới đúng cửa ra máy bay.',
      'Phi công nói chuyến bay sẽ mất hai tiếng, và thời tiết phía trước thì an toàn.',
      'Anh trai tôi đi xe máy khắp nơi, và anh luôn đội mũ bảo hiểm, kể cả chuyến ngắn.',
      'Anh nói ở làng tôi thì xe đạp tốt hơn, vì lối đi sau trường quá hẹp cho một chiếc xe hơi.',
      'Lần sau tôi sẽ giữ vé trong túi áo, để không trượt chuyến xe buýt đầu nữa.',
    ],
    hoi: [
      {
        q: 'Vì sao người kể trượt chuyến xe buýt bảy giờ?',
        options: [
          'Vì không tìm thấy vé trong túi',
          'Vì con đường ra khỏi làng quá hẹp',
          'Vì chuyến xe đó tới muộn một tiếng',
          'Vì phải dừng lại vì một xe tải chậm',
        ],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Người kể qua sông bằng đường nào, và vì sao?',
        options: [
          'Bằng cây cầu cũ, vì đường hầm mới đang đóng',
          'Bằng đường hầm mới, vì cây cầu cũ đang đóng',
          'Bằng thuyền, vì cả cầu và đường hầm đều đóng',
          'Bằng cây cầu mới, vì đường hầm cũ quá hẹp',
        ],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Bác tài taxi yêu cầu người kể làm gì trước khi nổ máy?',
        options: [
          'Thắt dây an toàn',
          'Trình vé máy bay',
          'Đội mũ bảo hiểm',
          'Cất bản đồ vào túi',
        ],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Theo anh trai người kể, vì sao ở làng thì xe đạp tốt hơn?',
        options: [
          'Vì lối đi sau trường quá hẹp cho một chiếc xe hơi',
          'Vì đi xe đạp thì không cần phải đội mũ bảo hiểm',
          'Vì đường cao tốc gần làng có quá nhiều xe tải lớn',
          'Vì xe máy chạy nhanh hơn nhưng lại không an toàn',
        ],
        answer: 0,
        cau: 13,
      },
    ],
  },

  'body-health-beginner-p2': {
    en: [
      'Two weeks ago everyone in my family was ill at the same time, and I had to look after them.',
      'My brother woke up with a bad toothache, so my mother took him to the dentist that morning.',
      'The dentist said his tooth was broken and gave him medicine for the pain.',
      'That afternoon I began to cough, and by evening my temperature was thirty-nine degrees.',
      'My father drove me to the hospital, because I felt too weak to walk to the clinic.',
      'A nurse checked my blood pressure first, and then she looked at my throat and my ears.',
      'The doctor said I had the flu, not a simple cold, and that my chest was clear.',
      'He told me to take one pill twice a day, after food, for five days.',
      'He also said the most important thing was to rest and to sleep more than usual.',
      'My little sister did not get sick, but she cut her finger on a glass and it began to bleed.',
      'My mother washed the cut, put something on her skin, and my sister did not even cry.',
      'By Sunday my fever was gone, and I could eat a normal meal again.',
      'My father says our family gets ill every year at the end of the rainy season.',
      'Now I exercise for twenty minutes each morning, because the doctor said a strong body gets better faster.',
      'I still do not like going to the dentist, but I go twice a year anyway.',
    ],
    vi: [
      'Hai tuần trước cả nhà tôi bị ốm cùng một lúc, và tôi phải trông cả nhà.',
      'Anh trai tôi thức dậy với một cơn đau răng nặng, nên sáng đó mẹ đưa anh đi nha sĩ.',
      'Nha sĩ nói cái răng của anh bị nứt và cho anh thuốc giảm đau.',
      'Chiều đó tôi bắt đầu ho, và tới tối thì nhiệt độ của tôi là ba mươi chín độ.',
      'Bố chở tôi tới bệnh viện, vì tôi thấy yếu quá không đi bộ tới phòng khám được.',
      'Một y tá đo huyết áp cho tôi trước, rồi cô ấy xem cổ họng và hai tai của tôi.',
      'Bác sĩ nói tôi bị cúm, không phải cảm thường, và ngực tôi thì không có gì.',
      'Bác dặn tôi uống một viên, hai lần một ngày, sau khi ăn, trong năm ngày.',
      'Bác cũng nói điều quan trọng nhất là nghỉ ngơi và ngủ nhiều hơn bình thường.',
      'Em gái nhỏ của tôi không bị ốm, nhưng em cắt vào ngón tay khi cầm cái cốc và máu chảy ra.',
      'Mẹ rửa vết cắt, bôi gì đó lên da em, và em còn không khóc.',
      'Tới Chủ nhật thì cơn sốt của tôi hết, và tôi ăn được một bữa bình thường trở lại.',
      'Bố tôi nói nhà tôi năm nào cũng ốm vào cuối mùa mưa.',
      'Giờ tôi tập thể dục hai mươi phút mỗi sáng, vì bác sĩ nói cơ thể khỏe thì hồi phục nhanh hơn.',
      'Tôi vẫn không thích đi nha sĩ, nhưng dù sao mỗi năm tôi vẫn đi hai lần.',
    ],
    hoi: [
      {
        q: 'Nhiệt độ của người kể lúc buổi tối là bao nhiêu?',
        options: [
          'Ba mươi chín độ',
          'Ba mươi bảy độ',
          'Bốn mươi độ',
          'Ba mươi tám độ',
        ],
        answer: 0,
        cau: 3,
      },
      {
        q: 'Ai bị đau răng, và người đó được đưa đi gặp ai?',
        options: [
          'Anh trai người kể, mẹ đưa đi gặp nha sĩ',
          'Người kể, bố đưa đi gặp bác sĩ ở bệnh viện',
          'Em gái người kể, mẹ đưa đi gặp nha sĩ',
          'Anh trai người kể, bố đưa đi gặp y tá',
        ],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Y tá làm gì cho người kể TRƯỚC TIÊN?',
        options: [
          'Đo huyết áp',
          'Xem cổ họng và hai tai',
          'Nghe ngực xem có gì không',
          'Đưa thuốc giảm đau',
        ],
        answer: 0,
        cau: 5,
      },
      {
        q: 'Bác sĩ dặn uống thuốc thế nào?',
        options: [
          'Một viên, hai lần một ngày, sau khi ăn, trong năm ngày',
          'Hai viên, một lần một ngày, trước khi ăn, trong năm ngày',
          'Một viên, hai lần một ngày, trước khi ngủ, trong ba ngày',
          'Hai viên, hai lần một ngày, sau khi ăn, trong bảy ngày',
        ],
        answer: 0,
        cau: 7,
      },
    ],
  },

  'places-buildings-beginner': {
    en: [
      'I have lived in the same small town for eleven years, and I can walk across it in twenty minutes.',
      'The market is right opposite the post office, so my mother sends a letter and buys fish on the same trip.',
      'The library is above the cafe, and you reach it by a narrow staircase at the side of the building.',
      'My grandmother does not live in a house; she lives in a flat on the fifth floor near the park.',
      'There is no lift in her building, so I count the steps every time I visit her.',
      'The only factory in our town is outside it, beyond the bridge and close to the river.',
      'My father works there, and he says the walk home takes longer than the work itself.',
      'Our school is behind the temple, and between them there is a garden with two old trees.',
      'The hospital is at the far end of the main street, next to the police station.',
      'We have no cinema and no museum, so on Saturday people go to the city by bus.',
      'The bakery opens at five in the morning and is closed by noon, because the bread is gone.',
      'A new supermarket was built last year where the old bus stop used to be.',
      'Now the bus stop is in front of the bank, which most people still find confusing.',
      'My favourite place is the top of the hill behind the village, because from there I can see the whole town.',
      'When visitors ask for directions, I always start from the market, because everybody can find it.',
    ],
    vi: [
      'Tôi đã sống ở cùng một thị trấn nhỏ suốt mười một năm, và tôi đi bộ hết thị trấn trong hai mươi phút.',
      'Cái chợ nằm ngay đối diện bưu điện, nên mẹ tôi gửi thư và mua cá trong cùng một chuyến đi.',
      'Thư viện nằm phía trên quán cà phê, và bạn lên đó bằng một cầu thang hẹp ở bên hông tòa nhà.',
      'Bà tôi không sống trong một ngôi nhà; bà sống trong một căn hộ ở tầng năm gần công viên.',
      'Tòa nhà của bà không có thang máy, nên lần nào tới thăm bà tôi cũng đếm bậc thang.',
      'Nhà máy duy nhất của thị trấn thì nằm ngoài thị trấn, bên kia cây cầu và sát dòng sông.',
      'Bố tôi làm ở đó, và bố nói đường đi bộ về nhà còn lâu hơn cả giờ làm.',
      'Trường tôi nằm sau ngôi đền, và giữa hai chỗ đó có một khu vườn với hai cây cổ thụ.',
      'Bệnh viện nằm ở cuối con phố chính, kế bên đồn cảnh sát.',
      'Chúng tôi không có rạp chiếu phim và không có viện bảo tàng, nên thứ Bảy mọi người đi xe buýt ra thành phố.',
      'Tiệm bánh mở lúc năm giờ sáng và đóng cửa trước trưa, vì bánh đã bán hết.',
      'Một siêu thị mới được xây năm ngoái ở chỗ trạm xe buýt cũ từng đứng.',
      'Giờ trạm xe buýt nằm phía trước ngân hàng, chuyện mà phần lớn mọi người vẫn thấy dễ lẫn.',
      'Chỗ tôi thích nhất là đỉnh ngọn đồi phía sau làng, vì từ đó tôi thấy được cả thị trấn.',
      'Khi khách hỏi đường, tôi luôn bắt đầu từ cái chợ, vì ai cũng tìm được nó.',
    ],
    hoi: [
      {
        q: 'Cái chợ nằm đối diện cái gì?',
        options: [
          'Bưu điện',
          'Ngân hàng',
          'Đồn cảnh sát',
          'Quán cà phê',
        ],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Bà của người kể sống ở đâu?',
        options: [
          'Một căn hộ ở tầng năm, gần công viên',
          'Một ngôi nhà nhỏ ở gần công viên',
          'Một căn hộ ở tầng năm, sau ngôi đền',
          'Một căn hộ ở tầng nhất, gần cây cầu',
        ],
        answer: 0,
        cau: 3,
      },
      {
        q: 'Muốn lên thư viện thì đi thế nào?',
        options: [
          'Lên bằng cầu thang hẹp ở bên hông tòa nhà',
          'Lên bằng thang máy trong tòa nhà quán cà phê',
          'Đi qua khu vườn có hai cây cổ thụ ở giữa',
          'Đi bên kia cây cầu rồi men theo dòng sông',
        ],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Nhà máy duy nhất của thị trấn nằm ở đâu?',
        options: [
          'Ngoài thị trấn, bên kia cây cầu và sát dòng sông',
          'Trong thị trấn, ở cuối con phố chính',
          'Ngoài thị trấn, trên đỉnh ngọn đồi sau làng',
          'Trong thị trấn, phía sau ngôi đền và khu vườn',
        ],
        answer: 0,
        cau: 5,
      },
    ],
  },
};

export default VIET_LAI;
