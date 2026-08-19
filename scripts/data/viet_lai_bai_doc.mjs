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
  // ── ĐỢT HAI 19/08: 7 chặng A1 CÒN LẠI ────────────────────────────────────
  // Đợt một (4 chặng) đã ghi vào src/data ở commit 9b745eb, nên không giữ lại ở
  // đây: nguồn sự thật của bài đọc là src/data, của câu hỏi là storyQuizA1.js.
  // Giữ cả hai chỗ sẽ có hai bản có thể lệch nhau mà không ai biết bản nào đúng.
  'body-health-beginner-p3': {
    en: [
      'Last Tuesday was a strange day at my school, because three of us ended up in the nurse\'s room.',
      'During the sports lesson my friend Long fell on the hard ground and hurt his left knee.',
      'He could still walk, but the skin on his leg was cut and it began to bleed a little.',
      'The nurse washed the cut, put a clean bandage on it, and told him not to run for a week.',
      'I went with him because I had a headache that would not go away since the morning.',
      'The nurse asked me how many hours I had slept, and I had to say only four.',
      'She checked my temperature, and it was normal, so she said the problem was sleep, not illness.',
      'She gave me water instead of medicine and told me to sit quietly with my eyes closed.',
      'The third person was Hoa, who had a bad toothache on the right side of her mouth.',
      'The nurse could do nothing for a tooth, so she called Hoa\'s mother to take her to the dentist.',
      'Before we left, the nurse showed us how to breathe slowly to feel less tired.',
      'She said most students who come to her room are not sick at all; they are simply weak from too little sleep.',
      'That night I went to bed at nine o\'clock, and in the morning my head did not hurt.',
      'Long\'s knee was better after five days, and he asked the nurse if he could play again.',
      'She checked it once more and said yes, but only if he stopped playing the moment it hurt.',
    ],
    vi: [
      'Thứ Ba tuần trước là một ngày lạ ở trường tôi, vì ba đứa chúng tôi cùng phải vào phòng y tế.',
      'Trong giờ thể dục, bạn Long của tôi ngã xuống mặt sân cứng và đau đầu gối bên trái.',
      'Cậu ấy vẫn đi được, nhưng da ở chân bị xước và bắt đầu chảy một chút máu.',
      'Cô y tế rửa vết xước, dán một miếng băng sạch lên, và dặn cậu ấy đừng chạy trong một tuần.',
      'Tôi đi cùng cậu ấy vì tôi bị đau đầu từ sáng mà không hết.',
      'Cô y tế hỏi tôi ngủ được mấy tiếng, và tôi phải nói là chỉ bốn tiếng.',
      'Cô đo nhiệt độ cho tôi, và nhiệt độ bình thường, nên cô nói vấn đề là giấc ngủ, không phải bệnh.',
      'Cô đưa tôi nước thay vì thuốc và bảo tôi ngồi yên nhắm mắt lại.',
      'Người thứ ba là Hoa, bị đau răng nặng ở bên phải miệng.',
      'Cô y tế không làm gì được với cái răng, nên cô gọi mẹ Hoa tới đưa em đi nha sĩ.',
      'Trước khi chúng tôi về, cô chỉ chúng tôi cách hít thở chậm để thấy đỡ mệt.',
      'Cô nói phần lớn học sinh vào phòng cô không bị bệnh gì cả; các em chỉ yếu vì ngủ quá ít.',
      'Tối đó tôi đi ngủ lúc chín giờ, và sáng ra đầu tôi không đau nữa.',
      'Đầu gối của Long đỡ sau năm ngày, và cậu ấy hỏi cô y tế xem có được chơi lại chưa.',
      'Cô kiểm tra lại một lần nữa rồi nói được, nhưng chỉ khi nào đau là phải ngừng chơi ngay.',
    ],
    hoi: [
      {
        q: 'Long bị đau ở đâu?',
        options: ['Đầu gối bên trái', 'Đầu gối bên phải', 'Đầu bên trái', 'Bàn chân bên trái'],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Cô y tế kết luận vì sao người kể bị đau đầu?',
        options: ['Vì ngủ quá ít, không phải vì bệnh', 'Vì bị sốt nhẹ từ buổi sáng', 'Vì chạy nhiều trong giờ thể dục', 'Vì uống quá ít nước cả ngày'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Vì sao cô y tế không tự xử lý cho Hoa?',
        options: ['Vì cô không làm gì được với một cái răng', 'Vì Hoa phải về nhà nghỉ ngay lập tức', 'Vì thuốc trong phòng y tế đã hết', 'Vì Hoa còn bị sốt cao hơn bình thường'],
        answer: 0,
        cau: 9,
      },
      {
        q: 'Cô y tế cho Long chơi lại với điều kiện gì?',
        options: ['Đau là phải ngừng chơi ngay', 'Phải chờ thêm một tuần nữa', 'Phải đi gặp bác sĩ ở bệnh viện', 'Phải ngủ đủ tám tiếng mỗi đêm'],
        answer: 0,
        cau: 14,
      },
    ],
  },
  'food-drinks-beginner-p2': {
    en: [
      'For my mother\'s birthday I decided to cook dinner by myself for the first time.',
      'In the morning I went to the market with a list: fish, pork, rice, tomatoes, garlic and a watermelon.',
      'The woman at the fruit stall said the watermelon was sweet, but when we cut it open it was not.',
      'I fried the garlic first, and I left it on the heat too long, so it turned black and bitter.',
      'I had to throw that pan away and start again with fresh garlic and a lower heat.',
      'The fish came out well, but my little brother would not eat any of it because of the bones.',
      'He ate rice with an egg instead, and he said that was the best part of the meal.',
      'My father drank tea, my mother drank orange juice, and I made a jug of cold lemon water.',
      'The soup was too salty, because I added salt twice and forgot the first time.',
      'My mother ate it anyway and said nothing until I tasted it myself and made a face.',
      'For dessert we had bananas and a plate of grapes, which needed no cooking at all.',
      'My mother said the meal was delicious, but my father said the truth: the soup was the weak part.',
      'I was not upset, because he also said the fish was better than the fish at the restaurant.',
      'Next time I will taste the soup before I put it on the table, and I will buy the watermelon last.',
      'Cooking took me four hours, and the family finished eating in twenty minutes.',
    ],
    vi: [
      'Vào sinh nhật mẹ, tôi quyết định tự nấu bữa tối lần đầu tiên.',
      'Buổi sáng tôi ra chợ với một tờ danh sách: cá, thịt lợn, gạo, cà chua, tỏi và một quả dưa hấu.',
      'Bà bán trái cây nói quả dưa hấu ngọt, nhưng lúc cắt ra thì nó không ngọt.',
      'Tôi phi tỏi trước, và tôi để trên lửa quá lâu, nên tỏi cháy đen và đắng.',
      'Tôi phải bỏ chảo đó đi và làm lại với tỏi mới và lửa nhỏ hơn.',
      'Món cá thành công, nhưng em trai nhỏ của tôi không ăn miếng nào vì sợ xương.',
      'Em ăn cơm với một quả trứng thay vào đó, và em nói đó là phần ngon nhất của bữa ăn.',
      'Bố tôi uống trà, mẹ tôi uống nước cam, còn tôi làm một bình nước chanh lạnh.',
      'Món canh thì quá mặn, vì tôi cho muối hai lần và quên mất lần đầu.',
      'Mẹ tôi vẫn ăn và không nói gì, tới khi tôi tự nếm rồi nhăn mặt.',
      'Món tráng miệng là chuối và một đĩa nho, hai thứ không cần nấu gì cả.',
      'Mẹ nói bữa ăn rất ngon, nhưng bố nói thật: món canh là chỗ yếu.',
      'Tôi không tự ái, vì bố cũng nói món cá còn ngon hơn cá ở nhà hàng.',
      'Lần sau tôi sẽ nếm canh trước khi đặt lên bàn, và tôi sẽ mua dưa hấu sau cùng.',
      'Nấu ăn mất của tôi bốn tiếng, còn cả nhà ăn xong trong hai mươi phút.',
    ],
    hoi: [
      {
        q: 'Vì sao món tỏi đầu tiên phải bỏ đi?',
        options: ['Vì để trên lửa quá lâu nên cháy đen và đắng', 'Vì tỏi mua ở chợ sáng đó đã bị hỏng sẵn rồi', 'Vì người kể cho muối vào tỏi hai lần', 'Vì em trai không ăn được món có tỏi'],
        answer: 0,
        cau: 3,
      },
      {
        q: 'Vì sao em trai người kể không ăn cá?',
        options: ['Vì sợ xương cá', 'Vì cá bị mặn quá', 'Vì em thích trứng hơn', 'Vì cá đã nguội hết'],
        answer: 0,
        cau: 5,
      },
      {
        q: 'Món canh bị mặn vì lý do gì?',
        options: ['Vì cho muối hai lần, do quên mất lần đầu', 'Vì nước dùng bị cạn khi đun quá lâu', 'Vì cho cả muối lẫn nước mắm vào canh', 'Vì mẹ đã cho muối trước khi người kể nấu'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Bố người kể nhận xét thế nào về bữa ăn?',
        options: ['Nói thật rằng món canh là chỗ yếu', 'Nói bữa ăn ngon hết, không có chỗ nào dở', 'Không nói gì cho tới khi ăn xong bữa', 'Nói món cá dở hơn cá ở nhà hàng'],
        answer: 0,
        cau: 11,
      },
    ],
  },
  'animals-nature-beginner': {
    en: [
      'Every summer I stay with my grandfather in a village at the foot of a mountain.',
      'He wakes me at half past four, because he says the birds sing best before the sun comes up.',
      'We walk up the hill along a path between two fields of tall grass.',
      'On the way we always stop at a big flat rock, and he lets me rest there for five minutes.',
      'Last July, from that rock, we watched a fox cross the path below us and disappear into the forest.',
      'My grandfather did not move at all, and he put his hand on my shoulder so that I would not move either.',
      'At the top there is a small lake, and the water is so cold that my feet hurt after a minute.',
      'A grey bird stands in that lake every morning, and my grandfather says it is the same bird each year.',
      'On the way down we passed a dead tree covered in insects, and I counted eleven bees on one flower.',
      'A frog jumped out of the wet grass beside my foot, and I shouted so loudly that my grandfather laughed.',
      'He told me the frog was more afraid of me than I was of it.',
      'That afternoon it rained hard for an hour, and the sky went from bright blue to almost black.',
      'After the rain the air was cool, and we could see the moon before the sun had gone down.',
      'My grandfather says the mountain teaches more than any book about nature.',
      'I think he is right, but I still bring one book with me every summer.',
    ],
    vi: [
      'Mùa hè nào tôi cũng về ở với ông tôi trong một làng dưới chân núi.',
      'Ông gọi tôi dậy lúc bốn giờ ba mươi, vì ông nói chim hát hay nhất trước khi mặt trời lên.',
      'Chúng tôi đi lên đồi theo một lối mòn giữa hai thửa ruộng cỏ cao.',
      'Trên đường chúng tôi luôn dừng ở một tảng đá phẳng lớn, và ông cho tôi nghỉ ở đó năm phút.',
      'Tháng Bảy vừa rồi, từ tảng đá đó, chúng tôi thấy một con cáo băng qua lối mòn phía dưới rồi mất hút vào rừng.',
      'Ông tôi không hề động đậy, và ông đặt tay lên vai tôi để tôi cũng đừng động.',
      'Trên đỉnh có một cái hồ nhỏ, và nước lạnh tới mức chân tôi đau sau một phút.',
      'Một con chim màu xám đứng trong hồ đó mỗi sáng, và ông tôi nói năm nào cũng là con chim đó.',
      'Lúc xuống chúng tôi đi qua một cây khô đầy côn trùng, và tôi đếm được mười một con ong trên một bông hoa.',
      'Một con ếch nhảy ra từ đám cỏ ướt cạnh chân tôi, và tôi hét to tới mức ông tôi bật cười.',
      'Ông bảo tôi rằng con ếch sợ tôi còn hơn tôi sợ nó.',
      'Chiều đó mưa to suốt một tiếng, và trời từ xanh trong chuyển sang gần như đen.',
      'Sau mưa không khí mát, và chúng tôi thấy được mặt trăng trước cả khi mặt trời lặn.',
      'Ông tôi nói ngọn núi dạy nhiều hơn bất cứ quyển sách nào về thiên nhiên.',
      'Tôi nghĩ ông đúng, nhưng mùa hè nào tôi vẫn mang theo một quyển sách.',
    ],
    hoi: [
      {
        q: 'Vì sao ông gọi người kể dậy lúc bốn giờ ba mươi?',
        options: ['Vì ông nói chim hát hay nhất trước khi mặt trời lên', 'Vì hai người phải lên tới đỉnh núi trước khi trời mưa', 'Vì con cáo chỉ băng qua lối mòn vào sáng sớm', 'Vì nước hồ trên đỉnh lạnh nhất vào lúc đó'],
        answer: 0,
        cau: 1,
      },
      {
        q: 'Khi thấy con cáo, ông đã làm gì?',
        options: ['Không động đậy, và đặt tay lên vai người kể', 'Chỉ tay về phía rừng cho người kể nhìn theo', 'Bật cười vì người kể hét lên quá to', 'Dừng lại ở tảng đá phẳng để nghỉ năm phút'],
        answer: 0,
        cau: 5,
      },
      {
        q: 'Người kể đếm được bao nhiêu con ong trên một bông hoa?',
        options: ['Mười một con', 'Năm con', 'Mười con', 'Hai mươi con'],
        answer: 0,
        cau: 8,
      },
      {
        q: 'Ông nói gì khi người kể hét lên vì con ếch?',
        options: ['Con ếch sợ người kể còn hơn người kể sợ nó', 'Ngọn núi dạy nhiều hơn bất cứ quyển sách nào', 'Con chim xám trong hồ năm nào cũng là con đó', 'Trời sắp mưa to nên phải xuống núi ngay'],
        answer: 0,
        cau: 10,
      },
    ],
  },
  'nature-animals-beginner': {
    en: [
      'Our class went to the sea for two days, and it was the first time eight of us had seen it.',
      'The bus left the school at six in the morning and reached the beach before eleven.',
      'Our teacher counted us four times on the way, because she was afraid of losing someone.',
      'The sand was so hot at midday that we could not stand on it without shoes.',
      'In the afternoon we found a small crab under a stone, and we put the stone back exactly as it was.',
      'A boy called Duc swam out too far, and the teacher blew a whistle until he came back.',
      'That evening the wind grew strong, and the sea became too rough for anyone to swim.',
      'We sat on the rocks instead and watched the sun go down behind a long grey cloud.',
      'After dark the sky was full of stars, more than any of us had ever seen from the town.',
      'Our teacher showed us how to find one bright star that always points north.',
      'On the second morning it rained, so we walked in the wood behind the beach instead.',
      'We saw no wild animals at all, only the tracks of a dog and one large bird in a tree.',
      'The teacher said we were lucky, because the animals had seen us long before we arrived.',
      'On the bus home everyone slept except Duc, who had lost one shoe and did not want to say so.',
      'I still keep a small white stone from that beach on the desk in my room.',
    ],
    vi: [
      'Lớp tôi đi biển hai ngày, và đó là lần đầu tám đứa trong lớp được thấy biển.',
      'Xe buýt rời trường lúc sáu giờ sáng và tới bãi biển trước mười một giờ.',
      'Cô giáo đếm chúng tôi bốn lần trên đường, vì cô sợ mất một đứa nào đó.',
      'Cát nóng tới mức giữa trưa chúng tôi không đứng lên được nếu không có giày.',
      'Buổi chiều chúng tôi tìm thấy một con cua nhỏ dưới một hòn đá, và chúng tôi đặt hòn đá lại đúng như cũ.',
      'Một bạn tên Đức bơi ra quá xa, và cô giáo thổi còi cho tới khi cậu ấy quay lại.',
      'Tối đó gió mạnh lên, và biển động quá không ai bơi được.',
      'Chúng tôi ngồi trên mấy tảng đá và xem mặt trời lặn sau một dải mây xám dài.',
      'Khi tối hẳn thì trời đầy sao, nhiều hơn tất cả những gì chúng tôi từng thấy ở thị trấn.',
      'Cô giáo chỉ chúng tôi cách tìm một ngôi sao sáng luôn chỉ về phương bắc.',
      'Sáng thứ hai thì mưa, nên chúng tôi đi bộ trong khu rừng phía sau bãi biển.',
      'Chúng tôi không thấy con vật hoang dã nào cả, chỉ thấy dấu chân một con chó và một con chim lớn trên cây.',
      'Cô giáo nói chúng tôi may, vì các con vật đã thấy chúng tôi từ lâu trước khi chúng tôi tới.',
      'Trên xe về ai cũng ngủ trừ Đức, cậu ấy mất một chiếc giày và không muốn nói ra.',
      'Tôi vẫn giữ một hòn đá trắng nhỏ từ bãi biển đó trên bàn trong phòng mình.',
    ],
    hoi: [
      {
        q: 'Vì sao cô giáo đếm cả lớp bốn lần trên đường?',
        options: ['Vì cô sợ mất một đứa nào đó', 'Vì xe buýt phải dừng lại bốn lần', 'Vì có tám đứa lần đầu được thấy biển', 'Vì cô muốn chia lớp thành bốn nhóm'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Sau khi tìm thấy con cua dưới hòn đá, cả lớp làm gì?',
        options: ['Đặt hòn đá lại đúng như cũ', 'Mang con cua về cho cô giáo xem', 'Thả con cua xuống nước rồi đi tiếp', 'Lấy hòn đá đó mang về làm quà'],
        answer: 0,
        cau: 4,
      },
      {
        q: 'Vì sao buổi tối không ai bơi được?',
        options: ['Vì gió mạnh lên và biển động', 'Vì trời đã tối hẳn và đầy sao', 'Vì cô giáo thổi còi gọi cả lớp về', 'Vì trời mưa suốt cả buổi tối đó'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Theo cô giáo, vì sao cả lớp không thấy con vật hoang dã nào?',
        options: ['Vì các con vật đã thấy cả lớp từ lâu trước khi lớp tới', 'Vì trời mưa nên các con vật đều trú trong hang', 'Vì khu rừng phía sau bãi biển vốn không có con vật nào', 'Vì cả lớp đi quá nhanh nên không kịp nhìn thấy'],
        answer: 0,
        cau: 12,
      },
    ],
  },
  'human-body-beginner': {
    en: [
      'I learned to swim when I was twelve, and it was harder than anyone had told me.',
      'My teacher was an old man who had taught swimming for thirty years.',
      'On the first day he said the only rule was to breathe out under the water, never in.',
      'I could not do it, and I swallowed so much water that my chest hurt for an hour.',
      'He told me to hold the wall with both hands and put only my face in the water.',
      'For three lessons I did nothing else but that, and I began to think I would never swim.',
      'In the fourth lesson he held my stomach with one hand and told me to move my legs slowly.',
      'When he took his hand away I did not notice for several seconds, and by then I was swimming.',
      'My arms were weak the next morning, and I could not lift my schoolbag with my right shoulder.',
      'He said that meant I was using my arms too much and my legs too little.',
      'After a month I could swim the length of the pool twice without stopping to stand.',
      'My knees still hurt on cold days, because I kicked the wall by mistake in the second week.',
      'The old man never once shouted, and he never let anyone laugh at a beginner.',
      'On the last day he shook my hand and said my back was straighter than when I arrived.',
      'Now I swim every Sunday, and I always breathe out under the water without thinking about it.',
    ],
    vi: [
      'Tôi học bơi khi mười hai tuổi, và nó khó hơn tất cả những gì người ta nói với tôi.',
      'Thầy tôi là một ông cụ đã dạy bơi ba mươi năm.',
      'Ngày đầu thầy nói luật duy nhất là thở RA dưới nước, không bao giờ thở vào.',
      'Tôi không làm được, và tôi uống nhiều nước tới mức ngực đau suốt một tiếng.',
      'Thầy bảo tôi bám vào thành bể bằng cả hai tay và chỉ úp mặt xuống nước.',
      'Suốt ba buổi tôi không làm gì khác ngoài việc đó, và tôi bắt đầu nghĩ mình sẽ không bao giờ bơi được.',
      'Buổi thứ tư thầy đỡ bụng tôi bằng một tay và bảo tôi đạp chân chầm chậm.',
      'Lúc thầy rút tay ra tôi không nhận ra suốt mấy giây, và tới lúc đó thì tôi đang bơi.',
      'Sáng hôm sau hai cánh tay tôi yếu, và tôi không nhấc nổi cặp sách bằng vai phải.',
      'Thầy nói thế nghĩa là tôi dùng tay quá nhiều và dùng chân quá ít.',
      'Sau một tháng tôi bơi được hết chiều dài bể hai lượt mà không phải dừng lại đứng.',
      'Đầu gối tôi vẫn đau vào những ngày lạnh, vì tuần thứ hai tôi đạp phải thành bể.',
      'Ông cụ chưa một lần lớn tiếng, và ông không để ai cười một người mới học.',
      'Ngày cuối thầy bắt tay tôi và nói lưng tôi thẳng hơn lúc tôi mới đến.',
      'Giờ tôi bơi mỗi Chủ nhật, và tôi luôn thở ra dưới nước mà không phải nghĩ về nó.',
    ],
    hoi: [
      {
        q: 'Luật duy nhất thầy đưa ra trong ngày đầu là gì?',
        options: ['Thở ra dưới nước, không bao giờ thở vào', 'Bám vào thành bể bằng cả hai tay', 'Đạp chân chầm chậm và đừng dùng tay', 'Không bao giờ cười một người mới học'],
        answer: 0,
        cau: 2,
      },
      {
        q: 'Người kể bơi được lần đầu trong hoàn cảnh nào?',
        options: ['Thầy rút tay đỡ bụng ra mà người kể không nhận ra', 'Người kể tự bỏ tay khỏi thành bể ở buổi thứ ba', 'Sau một tháng bơi hết chiều dài bể hai lượt', 'Sau khi thầy bảo dùng tay ít và dùng chân nhiều hơn'],
        answer: 0,
        cau: 7,
      },
      {
        q: 'Theo thầy, vì sao hai cánh tay người kể bị yếu?',
        options: ['Vì dùng tay quá nhiều và dùng chân quá ít', 'Vì nhấc cặp sách bằng vai phải quá nặng', 'Vì đạp phải thành bể trong tuần thứ hai', 'Vì uống quá nhiều nước ở buổi học đầu'],
        answer: 0,
        cau: 9,
      },
      {
        q: 'Vì sao đầu gối người kể vẫn đau vào ngày lạnh?',
        options: ['Vì tuần thứ hai đạp phải thành bể', 'Vì bơi hai lượt bể mà không dừng nghỉ', 'Vì đạp chân quá chậm trong buổi thứ tư', 'Vì bám thành bể bằng hai tay suốt ba buổi'],
        answer: 0,
        cau: 11,
      },
    ],
  },
  'colors-shapes-beginner-p3': {
    en: [
      'Our art teacher gave the class one strange task: paint your own room from memory, with no pencil lines.',
      'I have shared a room with my sister for nine years, so I thought it would be easy.',
      'When I began, I could not remember whether our curtain was dark green or dark blue.',
      'My sister was in the same class, and she painted it green while I painted it blue.',
      'The teacher held the two pictures side by side and asked the class which one was right.',
      'Nobody could tell, and even our own mother later said she was not sure.',
      'In my picture the window is a wide rectangle, but in my sister\'s it is almost square.',
      'We measured the real window that evening, and it was wider than it was tall, so I was right about that.',
      'We both drew the round white clock above the door in exactly the same place.',
      'She remembered a small red heart she had drawn on the wall when she was six; I had forgotten it completely.',
      'Her picture had a thin black line along the floor, which turned out to be a crack neither of us had noticed before.',
      'The teacher gave us the same mark and said the task was never about being right.',
      'She said two people can live in one room for nine years and still see two different rooms.',
      'We hung both pictures on the wall, and now the room really does have a green curtain and a blue one.',
      'The curtain, we found out, is green on one side and blue on the other.',
    ],
    vi: [
      'Cô dạy vẽ cho lớp tôi một bài lạ: vẽ chính phòng mình theo trí nhớ, không được kẻ bút chì.',
      'Tôi ở cùng phòng với em gái chín năm rồi, nên tôi tưởng bài này dễ.',
      'Lúc bắt đầu, tôi không nhớ được cái màn cửa nhà tôi là xanh lá đậm hay xanh dương đậm.',
      'Em gái tôi học cùng lớp, và em vẽ nó màu xanh lá còn tôi vẽ màu xanh dương.',
      'Cô đặt hai bức cạnh nhau và hỏi cả lớp bức nào đúng.',
      'Không ai nói được, và sau đó ngay cả mẹ tôi cũng bảo mẹ không chắc.',
      'Trong bức của tôi, cái cửa sổ là một hình chữ nhật rộng, còn trong bức của em thì gần như hình vuông.',
      'Tối đó chúng tôi đo cái cửa sổ thật, và nó rộng hơn là cao, nên chỗ đó tôi đúng.',
      'Cả hai chúng tôi đều vẽ cái đồng hồ tròn màu trắng phía trên cửa, ở đúng cùng một chỗ.',
      'Em nhớ một trái tim đỏ nhỏ em vẽ lên tường lúc sáu tuổi; tôi thì quên hẳn nó.',
      'Bức của em có một đường kẻ đen mảnh dọc sàn, hóa ra là một vết nứt mà cả hai chưa từng để ý.',
      'Cô cho hai đứa cùng một điểm và nói bài này chưa bao giờ là về việc ai đúng.',
      'Cô nói hai người có thể ở chung một phòng chín năm mà vẫn thấy hai cái phòng khác nhau.',
      'Chúng tôi treo cả hai bức lên tường, và giờ căn phòng đúng là có một màn xanh lá và một màn xanh dương.',
      'Cái màn cửa, chúng tôi phát hiện ra, một mặt màu xanh lá và mặt kia màu xanh dương.',
    ],
    hoi: [
      {
        q: 'Bài tập cô dạy vẽ đưa ra là gì?',
        options: ['Vẽ chính phòng mình theo trí nhớ, không kẻ bút chì', 'Vẽ phòng mình sau khi đo tất cả các món đồ trong đó', 'Vẽ hai bức về cùng một phòng rồi so sánh', 'Vẽ một hình chữ nhật và một hình vuông'],
        answer: 0,
        cau: 0,
      },
      {
        q: 'Hai chị em vẽ cái cửa sổ khác nhau thế nào?',
        options: ['Người kể vẽ hình chữ nhật rộng, em vẽ gần như hình vuông', 'Người kể vẽ gần như hình vuông, em vẽ hình chữ nhật rộng', 'Người kể vẽ cửa sổ tròn, em vẽ cửa sổ chữ nhật', 'Cả hai vẽ giống nhau, chỉ khác màu của khung'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Chi tiết nào chỉ em gái nhớ mà người kể quên hẳn?',
        options: ['Một trái tim đỏ nhỏ em vẽ lên tường lúc sáu tuổi', 'Một đường kẻ đen mảnh chạy dọc theo sàn nhà gỗ', 'Cái đồng hồ tròn màu trắng phía trên cửa', 'Cái màn cửa có hai mặt hai màu khác nhau'],
        answer: 0,
        cau: 9,
      },
      {
        q: 'Cuối cùng hóa ra cái màn cửa như thế nào?',
        options: ['Một mặt xanh lá, mặt kia xanh dương', 'Xanh lá hết, nên em gái đã đúng', 'Xanh dương hết, nên người kể đã đúng', 'Đã được đổi màu từ hồi em sáu tuổi'],
        answer: 0,
        cau: 14,
      },
    ],
  },
  'school-life-100': {
    en: [
      'I am the student in my class who always forgets something, and last month it became a problem.',
      'On Monday I left my textbook at home, so I had to read from my classmate\'s book all lesson.',
      'On Tuesday I forgot my homework in my folder on the kitchen table.',
      'My teacher did not shout; she wrote a note in my notebook and asked my mother to sign it.',
      'On Wednesday I lost my ruler and my eraser, and I found them a week later inside my schoolbag.',
      'The worst day was Thursday, when I forgot that we had a history exam at eight o\'clock.',
      'I had studied for the science test instead, because I read the wrong week on the calendar.',
      'I answered only nine of the twenty questions, and my score was the lowest in the class.',
      'My teacher let me take the exam again on Friday, but she said this was the only time.',
      'She also gave me one piece of advice: write everything on paper, never in your head.',
      'Now I keep a small notebook in my pocket, and I write down every lesson and every test.',
      'I check that notebook twice a day, once at break and once before I leave the classroom.',
      'Last week I remembered the exam, the homework, my dictionary and even my scissors for the art project.',
      'My teacher said nothing about it, but she gave me the group project to lead.',
      'My classmates were surprised, and honestly so was I.',
    ],
    vi: [
      'Tôi là đứa học sinh trong lớp lúc nào cũng quên một thứ gì đó, và tháng trước chuyện đó thành vấn đề.',
      'Thứ Hai tôi để quên sách giáo khoa ở nhà, nên suốt tiết tôi phải đọc chung sách với bạn cùng lớp.',
      'Thứ Ba tôi quên bài tập trong cái bìa kẹp để trên bàn ăn.',
      'Cô tôi không lớn tiếng; cô viết một lời nhắn vào vở tôi và nhờ mẹ tôi ký vào đó.',
      'Thứ Tư tôi mất cái thước và cái tẩy, và một tuần sau tôi tìm thấy chúng trong chính cặp sách của mình.',
      'Ngày tệ nhất là thứ Năm, khi tôi quên rằng có bài kiểm tra môn lịch sử lúc tám giờ.',
      'Tôi lại đi học cho bài kiểm tra môn khoa học, vì tôi đọc sai tuần trên tờ lịch.',
      'Tôi chỉ trả lời được chín trong hai mươi câu, và điểm của tôi thấp nhất lớp.',
      'Cô cho tôi làm lại bài kiểm tra vào thứ Sáu, nhưng cô nói đây là lần duy nhất.',
      'Cô cũng cho tôi một lời khuyên: viết mọi thứ ra giấy, đừng bao giờ để trong đầu.',
      'Giờ tôi giữ một quyển sổ nhỏ trong túi, và tôi ghi lại từng buổi học và từng bài kiểm tra.',
      'Tôi xem quyển sổ đó hai lần mỗi ngày, một lần vào giờ nghỉ và một lần trước khi ra khỏi lớp.',
      'Tuần trước tôi nhớ cả bài kiểm tra, bài tập, quyển từ điển và cả cái kéo cho bài tập vẽ.',
      'Cô tôi không nói gì về chuyện đó, nhưng cô giao cho tôi làm trưởng nhóm bài tập lớn.',
      'Các bạn cùng lớp ngạc nhiên, và thật lòng thì tôi cũng vậy.',
    ],
    hoi: [
      {
        q: 'Cô giáo xử lý việc quên bài tập hôm thứ Ba thế nào?',
        options: ['Viết lời nhắn vào vở và nhờ mẹ ký vào đó', 'Cho làm lại bài tập đó vào hôm thứ Sáu', 'Bắt đọc chung sách với bạn cùng lớp', 'Không nói gì và bỏ qua chuyện đó luôn'],
        answer: 0,
        cau: 3,
      },
      {
        q: 'Vì sao người kể học sai môn cho bài kiểm tra thứ Năm?',
        options: ['Vì đọc sai tuần trên tờ lịch', 'Vì quên mất giờ thi là tám giờ', 'Vì để quên sách giáo khoa ở nhà', 'Vì mất cái thước và cái tẩy hôm thứ Tư'],
        answer: 0,
        cau: 6,
      },
      {
        q: 'Người kể trả lời được bao nhiêu câu trong bài kiểm tra đó?',
        options: ['Chín trong hai mươi câu', 'Mười trong hai mươi câu', 'Chín trong mười câu', 'Hai mươi trong hai mươi câu'],
        answer: 0,
        cau: 7,
      },
      {
        q: 'Lời khuyên cô giáo cho người kể là gì?',
        options: ['Viết mọi thứ ra giấy, đừng để trong đầu', 'Xem lại sổ hai lần mỗi ngày cho chắc', 'Đừng bao giờ để quên sách ở nhà nữa', 'Học trước cho cả hai môn để khỏi sai'],
        answer: 0,
        cau: 9,
      },
    ],
  },
};

export default VIET_LAI;
