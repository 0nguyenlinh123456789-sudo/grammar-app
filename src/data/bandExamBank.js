// File: src/data/bandExamBank.js
// BÀI THI CUỐI BẬC A2 / B1 / B2 (việc 4.2) — SOẠN TAY TOÀN BỘ.
//
// ══ VÌ SAO KHÔNG SINH BẰNG MÁY ══
// Câu trắc nghiệm là một KHẲNG ĐỊNH KÈM ĐÁP ÁN. Đó đúng là loại nội dung đã bị
// xoá khỏi kho ở chuỗi dọn nội dung (máy tự đặt câu hỏi rồi tự nhận mình biết
// đáp án đúng). Đề viết/đề nói thì máy được đóng khung vì chúng KHÔNG có đáp án
// để bịa — bài thi này thì có. Nên số câu ở đây là số tôi soạn được cho tử tế,
// không phải con số nghe cho oai.
//
// ══ ĐIỀU QUAN TRỌNG NHẤT: "ĐỦ 4 KỸ NĂNG" KHÔNG CÓ NGHĨA LÀ "CHẤM ĐƯỢC 4 KỸ NĂNG"
// Mỗi đề có đủ bốn phần Nghe / Đọc / Viết / Nói. Nhưng chỉ hai phần đầu CHẤM
// ĐƯỢC, và mỗi phần tự khai điều đó bằng cờ `chamDuoc`:
//
//   • Đọc  — chấm được: có đáp án đúng, đếm được.
//   • Nghe — chấm được: âm thanh GIỌNG NGƯỜI THẬT có giấy phép (Tatoeba CC BY /
//            VOA), câu hỏi soạn tay, có đáp án đúng.
//   • Viết — KHÔNG chấm được: app không chấm ngữ pháp và không cho điểm bài viết.
//   • Nói  — KHÔNG chấm được: trình duyệt chỉ trả về văn bản nó nghe được.
//
// **Nhãn bậc chỉ được suy ra từ những phần `chamDuoc: true`**, và bài thi phải
// nói thẳng điều đó ra. Một bài thi tự nhận "đã kiểm đủ 4 kỹ năng" trong khi hai
// phần chỉ là bài tập tự chấm thì chính là kiểu tuyên bố mà cả chuỗi này dựng
// lên để chặn. `tests/band_exam.test.js` ghim cả hai chiều.
//
// ══ VÌ SAO CÂU HỎI PHẢI MỚI, KHÔNG LẤY TỪ KHO CÓ SẴN ══
// Ngân hàng test đầu vào (`placementBank.js`) và câu hỏi của 60 bài nghe đều đã
// hiện ra cho người học ở chỗ khác. Lấy lại chúng làm đề thi cuối bậc thì bài
// thi không chứng nhận được gì — người ta đã thấy đáp án rồi. Có test chốt
// KHÔNG TRÙNG MỘT MÃ NÀO với `placementBank`.
//
// ══ ÂM THANH ══
// `clipId` trỏ tới `audioManifest.js` (Tatoeba, CC BY, giọng người thật, câu
// ngắn) — hợp với A2/B1. `passageId` trỏ tới `listeningPassages.js` (VOA, bài
// 3–5 phút) — hợp với B2. KHÔNG dùng giọng máy đọc ở bài thi này: giọng máy đủ
// để luyện tập, không đủ để làm căn cứ gắn nhãn bậc.
//
// ⚠️ CHƯA AI NGHE THỬ hai kho âm thanh đó. Máy đã kiểm giấy phép, ghép cặp,
// định dạng và độ dài; máy KHÔNG kiểm được giọng đọc có nghe ra không.

export const bandExams = [
  // ══════════════════════════════════════════════════════════════════ A2
  {
    id: 'exam-a2',
    cefr: 'A2',
    name: 'Thi cuối bậc A2',
    moTa: 'Hiểu câu và đoạn ngắn về việc hằng ngày.',
    phut: 25,
    sections: [
      {
        key: 'listening',
        nhan: 'Nghe',
        chamDuoc: true,
        nguon: 'clip',
        huongDan: 'Nghe từng câu (giọng người thật, có thể nghe lại) rồi chọn ý đúng.',
        items: [
          { id: 'ea2-l1', clipId: 'tat-1646', prompt: 'Người nói cho biết điều gì?', options: ['Tên của mình', 'Tuổi của mình', 'Nghề của mình', 'Nơi mình sống'], answer: 0, explanation: '“My name is Jack.” — người nói giới thiệu TÊN.' },
          { id: 'ea2-l2', clipId: 'tat-2086', prompt: 'Chuyện gì đã xảy ra với cô ấy?', options: ['Cô ấy bị ốm', 'Cô ấy đi làm', 'Cô ấy chuyển nhà', 'Cô ấy đi nghỉ'], answer: 0, explanation: '“She got sick this weekend.” — got sick = bị ốm.' },
          { id: 'ea2-l3', clipId: 'tat-21553', prompt: 'Ngày 8 tháng 4 có gì?', options: ['Trường bắt đầu học', 'Trường nghỉ hè', 'Có kỳ thi', 'Có ngày lễ'], answer: 0, explanation: '“School begins on April 8.” — begins = bắt đầu.' },
          { id: 'ea2-l4', clipId: 'tat-66810', prompt: 'Người nói môn thể thao nào?', options: ['Quần vợt', 'Bóng đá', 'Bơi lội', 'Bóng rổ'], answer: 0, explanation: '“No, but I play tennis.” — tennis = quần vợt.' },
          { id: 'ea2-l5', clipId: 'tat-256196', prompt: 'Người nói đã làm gì?', options: ['Viết một lá thư bằng tiếng Anh', 'Đọc một cuốn sách tiếng Anh', 'Học một lớp tiếng Anh', 'Dịch một lá thư'], answer: 0, explanation: '“I wrote a letter in English.” — wrote a letter = viết một lá thư.' },
          { id: 'ea2-l6', clipId: 'tat-19320', prompt: 'Câu này là gì?', options: ['Một câu hỏi về việc đã từng đến Kyoto chưa', 'Một lời mời đi Kyoto', 'Một lời kể về chuyến đi Kyoto', 'Một lời từ chối'], answer: 0, explanation: '“Have you been to Kyoto?” — câu hỏi ở thì hiện tại hoàn thành, hỏi đã từng đến chưa.' },
        ],
      },
      {
        key: 'reading',
        nhan: 'Đọc',
        chamDuoc: true,
        huongDan: 'Đọc đoạn ngắn rồi chọn ý đúng.',
        items: [
          { id: 'ea2-r1', doan: 'The library is open from Monday to Friday, 8 a.m. to 5 p.m. It is closed on Saturday and Sunday.', prompt: 'Thư viện đóng cửa ngày nào?', options: ['Thứ Bảy và Chủ Nhật', 'Thứ Hai', 'Thứ Sáu', 'Không đóng cửa ngày nào'], answer: 0, explanation: '“It is closed on Saturday and Sunday.”' },
          { id: 'ea2-r2', doan: 'Nam usually walks to school, but when it rains his father drives him.', prompt: 'Khi trời mưa thì Nam đi học bằng cách nào?', options: ['Bố chở đi', 'Đi bộ', 'Đi xe buýt', 'Đi xe đạp'], answer: 0, explanation: '“when it rains his father drives him” — bố chở.' },
          { id: 'ea2-r3', doan: 'Please do not eat or drink in the computer room. You can use the room next door.', prompt: 'Bạn KHÔNG được làm gì trong phòng máy tính?', options: ['Ăn uống', 'Nói chuyện', 'Dùng máy tính', 'Ngồi lâu'], answer: 0, explanation: '“do not eat or drink in the computer room”.' },
          { id: 'ea2-r4', doan: 'The bus to the city centre leaves every twenty minutes. The trip takes about half an hour.', prompt: 'Chuyến đi mất bao lâu?', options: ['Khoảng nửa tiếng', 'Hai mươi phút', 'Một tiếng', 'Mười phút'], answer: 0, explanation: '“The trip takes about half an hour.” — half an hour = nửa tiếng.' },
          { id: 'ea2-r5', doan: 'Lan works in a small shop near her house. She starts at nine and finishes at four. She likes her job because the shop is quiet.', prompt: 'Vì sao Lan thích công việc của mình?', options: ['Vì cửa hàng yên tĩnh', 'Vì lương cao', 'Vì gần nhà', 'Vì làm ít giờ'], answer: 0, explanation: '“She likes her job because the shop is quiet.”' },
          { id: 'ea2-r6', doan: 'Tickets cost 50,000 dong. Children under six do not pay.', prompt: 'Ai không phải trả tiền vé?', options: ['Trẻ dưới sáu tuổi', 'Tất cả trẻ em', 'Người già', 'Học sinh'], answer: 0, explanation: '“Children under six do not pay.”' },
          { id: 'ea2-r7', doan: 'I bought this jacket last week, but it is too small. Can I change it for a bigger one?', prompt: 'Người viết muốn gì?', options: ['Đổi sang cái to hơn', 'Trả lại lấy tiền', 'Mua thêm một cái', 'Sửa lại chiếc áo'], answer: 0, explanation: '“Can I change it for a bigger one?” — đổi lấy cái to hơn.' },
          { id: 'ea2-r8', doan: 'The meeting will start at 2 p.m. Please come ten minutes early.', prompt: 'Nên có mặt lúc mấy giờ?', options: ['1 giờ 50', '2 giờ', '2 giờ 10', '1 giờ'], answer: 0, explanation: 'Đến sớm 10 phút so với 2 giờ chiều = 1 giờ 50.' },
        ],
      },
      {
        key: 'writing',
        nhan: 'Viết',
        chamDuoc: false,
        lyDoKhongCham: 'App không chấm ngữ pháp và không cho điểm bài viết. Máy chỉ đối chiếu được số từ và các cụm bắt buộc; phần còn lại bạn tự soi theo bảng tiêu chí.',
        de: {
          id: 'ex-w-a2',
          deBai: 'Viết 40–70 từ giới thiệu một người bạn của bạn: tên, tuổi, nơi ở, và một việc người đó thích làm.',
          yeuCau: { soTuToiThieu: 40, soTuToiDa: 70, tuBatBuoc: ['name', 'live'], moTaTuBatBuoc: 'Bài phải có từ “name” và từ “live/lives”.' },
          checklist: [
            'Mình đã nêu đủ tên, tuổi, nơi ở và một sở thích chưa?',
            'Câu nào cũng có chủ ngữ và động từ chứ?',
            'Động từ ngôi thứ ba số ít đã thêm “-s” chưa (he lives, she likes)?',
            'Mỗi câu đã bắt đầu bằng chữ hoa và kết thúc bằng dấu chấm chưa?',
          ],
          modelAnswer: 'My friend’s name is Linh. She is nineteen years old. She lives with her family in Da Nang, near the beach. She is a student at a small college in the city. In her free time she likes drawing. She draws people in the park almost every weekend. She also likes coffee, so we often meet at a coffee shop on Sunday morning and talk for an hour.',
          ghiChuBaiMau: 'Bài mẫu này cố ý dùng câu ngắn và thì hiện tại đơn — đúng mức A2. Chú ý “She lives”, “She likes”, “She draws”: chủ ngữ ngôi thứ ba số ít thì động từ thêm “-s”. Đây là MỘT cách viết, không phải cách duy nhất.',
        },
      },
      {
        key: 'speaking',
        nhan: 'Nói',
        chamDuoc: false,
        lyDoKhongCham: 'Trình duyệt chỉ trả về VĂN BẢN nó nghe được, không đánh giá phát âm. App này cố ý không dùng dịch vụ chấm phát âm trả phí.',
        de: {
          id: 'ex-s-a2',
          deBai: 'Nói khoảng 45 giây về một ngày bình thường của bạn: bạn dậy lúc mấy giờ, làm gì buổi sáng, buổi chiều và buổi tối.',
          giay: 45,
          soTuToiThieu: 35,
          tuMucTieu: ['morning', 'afternoon', 'evening', 'usually'],
          soTuPhaiDung: 3,
          kieu: 'ke',
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════ B1
  {
    id: 'exam-b1',
    cefr: 'B1',
    name: 'Thi cuối bậc B1',
    moTa: 'Hiểu ý chính của lời nói và văn bản về việc quen thuộc.',
    phut: 30,
    sections: [
      {
        key: 'listening',
        nhan: 'Nghe',
        chamDuoc: true,
        nguon: 'clip',
        huongDan: 'Nghe từng câu (giọng người thật, có thể nghe lại) rồi chọn ý đúng.',
        items: [
          { id: 'eb1-l1', clipId: 'tat-2201', prompt: 'Người nói muốn nói gì?', options: ['Nếu chưa có chương trình này thì tải về ngay bây giờ được', 'Chương trình này không tải về được nữa', 'Phải trả tiền mới tải được', 'Chương trình sẽ tự cài đặt'], answer: 0, explanation: '“If you do not have this program, you can download it now.”' },
          { id: 'eb1-l2', clipId: 'tat-16431', prompt: 'Người nghe đã quên làm gì?', options: ['Quên dặn người nói mua bánh mì', 'Quên mua bánh mì', 'Quên trả tiền bánh mì', 'Quên mang bánh mì về'], answer: 0, explanation: '“You neglected to TELL ME to buy bread.” — quên DẶN, không phải quên mua.' },
          { id: 'eb1-l3', clipId: 'tat-19290', prompt: 'Câu nói cho biết gì về Kyoto?', options: ['Mỗi năm đón hàng nghìn khách từ khắp thế giới', 'Là thành phố lớn nhất Nhật Bản', 'Có nhiều đền chùa cổ', 'Từng có tuyết rơi dày'], answer: 0, explanation: '“Kyoto gets thousands of visitors from all over the world each year.”' },
          { id: 'eb1-l4', clipId: 'tat-2364', prompt: 'Người nói muốn nói gì?', options: ['Trước đây không biết anh ta uống nhiều đến vậy', 'Biết rõ anh ta uống nhiều', 'Anh ta đã bỏ rượu', 'Anh ta không uống rượu'], answer: 0, explanation: '“I didn’t know he drank so much.” — trước đó KHÔNG biết.' },
          { id: 'eb1-l5', clipId: 'tat-25996', prompt: 'Khoảng cách tới nhà ga là bao nhiêu?', options: ['Hơn 3 km', 'Đúng 3 km', 'Dưới 3 km', 'Khoảng 300 m'], answer: 0, explanation: '“It is MORE THAN 3 kilometers to the station.” — more than = hơn.' },
          { id: 'eb1-l6', clipId: 'tat-2183', prompt: 'Tình trạng của cô ấy thế nào?', options: ['Sắp suy sụp tinh thần', 'Đang rất vui', 'Vừa khỏi bệnh', 'Sắp đi xa'], answer: 0, explanation: '“on the verge of a nervous breakdown” — on the verge of = sắp, ngay bên bờ.' },
        ],
      },
      {
        key: 'reading',
        nhan: 'Đọc',
        chamDuoc: true,
        huongDan: 'Đọc đoạn rồi chọn ý đúng. Có câu hỏi về Ý CHÍNH, không chỉ chi tiết.',
        items: [
          { id: 'eb1-r1', doan: 'Our office will move to a new building on 3 March. All staff should pack their personal things before 28 February. The IT team will move the computers, so please do not unplug anything yourself.', prompt: 'Nhân viên KHÔNG nên làm gì?', options: ['Tự rút dây máy tính', 'Đóng gói đồ cá nhân', 'Đến văn phòng mới', 'Báo cho đội IT'], answer: 0, explanation: '“please do not unplug anything yourself”.' },
          { id: 'eb1-r2', doan: 'Many people believe that reading before bed helps them sleep. Researchers say the important thing is not the book but the habit: doing the same quiet activity every night tells the body it is time to rest.', prompt: 'Ý chính của đoạn là gì?', options: ['Chính THÓI QUEN lặp lại mới giúp dễ ngủ, không phải việc đọc sách', 'Đọc sách là cách duy nhất để dễ ngủ', 'Nhà nghiên cứu khuyên nên đọc sách hay trước khi ngủ', 'Không nên làm gì trước khi ngủ'], answer: 0, explanation: '“the important thing is not the book but the habit”.' },
          { id: 'eb1-r3', doan: 'The restaurant was busier than we expected, so we had to wait almost an hour for a table. The food was good, but by the time it arrived, the children were too tired to eat.', prompt: 'Vì sao bọn trẻ không ăn được?', options: ['Vì phải chờ quá lâu nên đã quá mệt', 'Vì món ăn không ngon', 'Vì nhà hàng đóng cửa', 'Vì bọn trẻ đã ăn trước đó'], answer: 0, explanation: '“by the time it arrived, the children were too tired to eat” — hệ quả của việc chờ gần một tiếng.' },
          { id: 'eb1-r4', doan: 'If you cannot attend the course, please let us know at least three days in advance. Students who cancel later than that will still be charged half the fee.', prompt: 'Huỷ trước hai ngày thì sao?', options: ['Vẫn phải trả một nửa học phí', 'Được hoàn lại toàn bộ', 'Không phải trả gì', 'Bị mất toàn bộ học phí'], answer: 0, explanation: 'Huỷ muộn hơn mốc ba ngày thì “will still be charged half the fee”.' },
          { id: 'eb1-r5', doan: 'Minh applied for two jobs. The first one paid more, but it was an hour away by bus. The second paid less and was near his house. He chose the second one because he wanted more time with his family.', prompt: 'Vì sao Minh chọn công việc thứ hai?', options: ['Vì muốn có thêm thời gian cho gia đình', 'Vì lương cao hơn', 'Vì công việc thú vị hơn', 'Vì công ty lớn hơn'], answer: 0, explanation: '“because he wanted more time with his family”.' },
          { id: 'eb1-r6', doan: 'The city introduced free buses on Sundays last year. Traffic did fall slightly, but most of the new passengers were people who had walked before, not people who had driven.', prompt: 'Kết quả của chính sách này là gì?', options: ['Có giảm kẹt xe chút ít, nhưng phần lớn khách mới là người trước đó đi bộ', 'Kẹt xe giảm mạnh vì người lái xe chuyển sang đi buýt', 'Không có gì thay đổi', 'Số người đi bộ tăng lên'], answer: 0, explanation: '“Traffic did fall slightly, but most of the new passengers were people who had WALKED before, not people who had DRIVEN.”' },
          { id: 'eb1-r7', doan: 'Note to staff: the coffee machine is broken again. A technician will come on Thursday. Until then, there is a kettle in the meeting room. Please wash your cup after using it.', prompt: 'Đến thứ Năm thì nhân viên nên làm gì?', options: ['Dùng ấm đun nước trong phòng họp', 'Dùng máy pha cà phê như bình thường', 'Mua cà phê bên ngoài', 'Không uống gì'], answer: 0, explanation: '“Until then, there is a kettle in the meeting room.”' },
          { id: 'eb1-r8', doan: 'When she started running, Hoa could only manage ten minutes. She did not try to go faster; instead she added two minutes each week. After four months she finished her first ten-kilometre race.', prompt: 'Cách Hoa tiến bộ là gì?', options: ['Tăng dần thời gian chạy mỗi tuần thay vì chạy nhanh hơn', 'Chạy nhanh hơn mỗi tuần', 'Chạy mười cây số ngay từ đầu', 'Tập với huấn luyện viên'], answer: 0, explanation: '“She did not try to go faster; instead she added two minutes each week.”' },
        ],
      },
      {
        key: 'writing',
        nhan: 'Viết',
        chamDuoc: false,
        lyDoKhongCham: 'App không chấm ngữ pháp và không cho điểm bài viết. Máy chỉ đối chiếu được số từ và các cụm bắt buộc; phần còn lại bạn tự soi theo bảng tiêu chí.',
        de: {
          id: 'ex-w-b1',
          deBai: 'Viết 90–130 từ kể về một lần bạn phải thay đổi kế hoạch. Nêu kế hoạch ban đầu, chuyện gì xảy ra, và bạn đã làm gì thay vào đó.',
          yeuCau: { soTuToiThieu: 90, soTuToiDa: 130, tuBatBuoc: ['because', 'instead'], moTaTuBatBuoc: 'Bài phải có từ “because” (nêu lý do) và “instead” (nêu việc làm thay thế).' },
          checklist: [
            'Bài của mình có đủ ba phần: kế hoạch ban đầu — chuyện xảy ra — việc làm thay thế không?',
            'Mình có dùng thì quá khứ nhất quán không?',
            'Các câu có nối được với nhau bằng từ nối, hay câu nào cũng bắt đầu lại từ đầu?',
            'Mình có nêu được LÝ DO chứ không chỉ kể sự việc không?',
            'Có câu nào mình viết chỉ để cho đủ số từ không?',
          ],
          modelAnswer: 'Last summer my brother and I planned to cycle to a beach about forty kilometres from our house. We got up at five, packed some water and left before the sun was hot. After an hour, my brother’s back tyre went flat and we had no repair kit with us. We were still far from any town, so we could not fix it there. We had to change our plan because walking the whole way would have taken all day. Instead, we pushed the bikes to a small village, left them at a repair shop, and took a local bus to the beach. We arrived two hours late, but we still had time to swim.',
          ghiChuBaiMau: 'Bài mẫu bám đúng ba phần đề yêu cầu và dùng thì quá khứ nhất quán. Chú ý cách “because” nêu LÝ DO của quyết định (không phải chỉ kể sự việc), và “Instead” mở đầu câu nói về việc làm thay thế. Đây là MỘT cách viết, không phải cách duy nhất.',
        },
      },
      {
        key: 'speaking',
        nhan: 'Nói',
        chamDuoc: false,
        lyDoKhongCham: 'Trình duyệt chỉ trả về VĂN BẢN nó nghe được, không đánh giá phát âm. App này cố ý không dùng dịch vụ chấm phát âm trả phí.',
        de: {
          id: 'ex-s-b1',
          deBai: 'Nói khoảng 60 giây về một nơi bạn từng đến và muốn quay lại. Nói bạn đến đó khi nào, thấy gì, và vì sao muốn quay lại.',
          giay: 60,
          soTuToiThieu: 45,
          tuMucTieu: ['visited', 'because', 'again', 'remember'],
          soTuPhaiDung: 3,
          kieu: 'ke',
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════ B2
  {
    id: 'exam-b2',
    cefr: 'B2',
    name: 'Thi cuối bậc B2',
    moTa: 'Hiểu bài nói dài và văn bản có lập luận; nắm được ý ngầm.',
    phut: 40,
    sections: [
      {
        key: 'listening',
        nhan: 'Nghe',
        chamDuoc: true,
        nguon: 'passage',
        passageId: 'voa-7835956',
        huongDan: 'Nghe cả bài (khoảng 4 phút 40 giây, giọng người thật) rồi trả lời. Bản chép lời chỉ hiện sau khi nộp.',
        items: [
          { id: 'eb2-l1', prompt: 'Theo bài, vì sao hình ảnh con bướm được chọn làm ví dụ?', options: ['Vì cánh bướm mỏng manh, một tác động rất nhỏ mà có thể dẫn tới việc lớn', 'Vì bướm bay được rất xa', 'Vì bướm sống ở khắp nơi trên thế giới', 'Vì bướm gây ra bão'], answer: 0, explanation: 'Bài mở đầu: “Butterflies are delicate insects. Their wings are thin and can be easily damaged. So, how can a butterfly cause major things to happen?”' },
          { id: 'eb2-l2', prompt: 'Trong ví dụ về ngành truyền hình, chuỗi sự việc BẮT ĐẦU từ đâu?', options: ['Từ việc người viết kịch bản đòi tăng lương', 'Từ việc diễn viên đình công', 'Từ việc các doanh nghiệp khác bị ảnh hưởng', 'Từ việc ngành truyền hình ngừng sản xuất'], answer: 0, explanation: '“a group of television writers demand higher pay… These changes all resulted from that FIRST demand for higher pay.”' },
          { id: 'eb2-l3', prompt: 'Bài phân biệt “domino effect” với “butterfly effect” ở điểm nào?', options: ['Domino là chuỗi đổ liên tiếp từ một cú đẩy; butterfly nhấn mạnh thay đổi RẤT NHỎ dẫn tới hậu quả LỚN và KHÓ LƯỜNG', 'Domino nhanh hơn butterfly', 'Butterfly chỉ dùng trong khí tượng, domino dùng trong kinh tế', 'Hai cách nói hoàn toàn giống nhau'], answer: 0, explanation: 'Bài định nghĩa butterfly effect là “very small changes lead to large and UNPREDICTABLE changes”, còn domino effect là chuỗi đổ từ “your single push of a single domino”.' },
          { id: 'eb2-l4', prompt: 'Trong đoạn hội thoại, người mở hiệu sách mô tả quá trình khởi nghiệp của mình là gì?', options: ['Một hiệu ứng domino — xong việc này thì việc tiếp theo tự sáng tỏ', 'Một hiệu ứng cánh bướm', 'Một chuỗi thất bại liên tiếp', 'Một kế hoạch đã vạch sẵn từ đầu'], answer: 0, explanation: '“It was a domino effect. As soon as I finished the first thing, the next thing to do became clear.”' },
          { id: 'eb2-l5', prompt: 'Người bạn gọi việc gì là “butterfly effect”?', options: ['Việc hồi nhỏ hay la cà ở hiệu sách của bố mẹ bạn, ảnh hưởng tới cuộc đời hôm nay', 'Việc mở hiệu sách đúng dịp cuối tuần', 'Việc hai người là bạn của nhau', 'Việc trở thành nhà văn'], answer: 0, explanation: '“It’s like the butterfly effect. Something that happened a long time ago, affected your future today.” — nói về việc hồi nhỏ la cà ở hiệu sách.' },
          { id: 'eb2-l6', prompt: 'Cụm “sets off a chain reaction” trong bài nghĩa là gì?', options: ['Khởi phát một chuỗi phản ứng nối tiếp nhau', 'Kết thúc một chuỗi sự việc', 'Ngăn một sự việc xảy ra', 'Lặp lại một việc nhiều lần'], answer: 0, explanation: '“We often say that something SETS OFF a chain reaction… One thing leads to another.”' },
        ],
      },
      {
        key: 'reading',
        nhan: 'Đọc',
        chamDuoc: true,
        huongDan: 'Đọc rồi chọn ý đúng. Có câu hỏi về Ý NGẦM và THÁI ĐỘ của người viết, không chỉ chi tiết.',
        items: [
          { id: 'eb2-r1', doan: 'Supporters of the new rule argue that it will reduce waste. Critics do not dispute this, but point out that the cost of enforcing it may be higher than the value of the waste saved.', prompt: 'Những người phản đối lập luận thế nào?', options: ['Họ không phủ nhận việc giảm rác, mà cho rằng chi phí thực thi có thể lớn hơn lợi ích', 'Họ cho rằng quy định không giảm được rác', 'Họ ủng hộ quy định nhưng muốn hoãn lại', 'Họ cho rằng rác không phải vấn đề'], answer: 0, explanation: '“Critics do not dispute this, but point out that the cost… may be higher than the value of the waste saved.”' },
          { id: 'eb2-r2', doan: 'The report was widely praised when it appeared. It is only now, five years later, that anyone has bothered to check whether its central prediction came true.', prompt: 'Thái độ của người viết đối với bản báo cáo là gì?', options: ['Hoài nghi — ngụ ý rằng người ta khen mà không ai kiểm chứng', 'Ngưỡng mộ và đồng tình hoàn toàn', 'Trung lập, chỉ thuật lại sự việc', 'Tức giận vì báo cáo bị bỏ quên'], answer: 0, explanation: 'Cụm “has bothered to check” và “only now, five years later” mang sắc thái phê phán: lời khen đến trước, việc kiểm chứng đến rất muộn.' },
          { id: 'eb2-r3', doan: 'Remote work was expected to empty city centres. In practice, offices did lose staff, but the same people kept coming into town for restaurants, gyms and meetings. What changed was not whether people came, but why.', prompt: 'Câu cuối muốn nói gì?', options: ['Người ta vẫn vào trung tâm, chỉ khác ở LÝ DO họ vào', 'Người ta không còn vào trung tâm nữa', 'Số người vào trung tâm tăng lên', 'Lý do vào trung tâm vẫn như cũ'], answer: 0, explanation: '“What changed was not WHETHER people came, but WHY.”' },
          { id: 'eb2-r4', doan: 'Had the company disclosed the fault when it was first discovered, the recall would have cost far less. Instead, it waited until the story reached the press.', prompt: 'Điều gì đã thực sự xảy ra?', options: ['Công ty im lặng cho tới khi báo chí đưa tin', 'Công ty công bố lỗi ngay khi phát hiện', 'Công ty không hề thu hồi sản phẩm', 'Báo chí không hề biết chuyện'], answer: 0, explanation: 'Câu đảo ngữ “Had the company disclosed…” là điều kiện KHÔNG có thật; thực tế là “it waited until the story reached the press”.' },
          { id: 'eb2-r5', doan: 'Learners often assume that a bigger vocabulary is the fastest route to fluency. Yet someone who knows five hundred words well and can combine them quickly will usually be understood more easily than someone who recognises five thousand but hesitates over every sentence.', prompt: 'Ý chính của đoạn là gì?', options: ['Dùng thành thạo vốn từ nhỏ có thể hiệu quả hơn biết nhiều từ mà nói ngập ngừng', 'Vốn từ càng lớn thì càng nói trôi chảy', 'Nên học đúng năm trăm từ', 'Không cần học thêm từ mới'], answer: 0, explanation: 'Đoạn đối lập “knows five hundred words WELL and can combine them QUICKLY” với “recognises five thousand but HESITATES”.' },
          { id: 'eb2-r6', doan: 'The scheme is voluntary — for now. Officials have said they will "review participation levels" at the end of the year.', prompt: 'Cụm “for now” và câu sau ngụ ý điều gì?', options: ['Chương trình có thể sẽ thành bắt buộc nếu ít người tham gia', 'Chương trình sẽ bị huỷ vào cuối năm', 'Chương trình đã là bắt buộc', 'Quan chức không quan tâm tới số người tham gia'], answer: 0, explanation: '“for now” báo hiệu tình trạng tạm thời; “review participation levels” là lời cảnh báo mềm rằng mức tham gia thấp sẽ dẫn tới thay đổi.' },
          { id: 'eb2-r7', doan: 'Both studies used the same dataset, but reached opposite conclusions. The difference lay entirely in how each team defined "regular exercise".', prompt: 'Vì sao hai nghiên cứu ra kết luận trái ngược?', options: ['Vì mỗi nhóm định nghĩa “tập luyện đều đặn” khác nhau', 'Vì hai nhóm dùng dữ liệu khác nhau', 'Vì một nhóm mắc lỗi tính toán', 'Vì hai nhóm nghiên cứu hai nhóm người khác nhau'], answer: 0, explanation: '“The difference lay ENTIRELY in how each team defined ‘regular exercise’.”' },
          { id: 'eb2-r8', doan: 'It would be convenient to blame the delay on the weather. The weather, however, was no worse than in any of the three previous years, when the same work was finished on time.', prompt: 'Người viết ngụ ý gì?', options: ['Thời tiết không phải nguyên nhân thật sự của việc chậm trễ', 'Thời tiết năm nay tệ hơn hẳn mọi năm', 'Công việc năm nào cũng bị chậm', 'Không thể biết nguyên nhân chậm trễ'], answer: 0, explanation: '“It would be CONVENIENT to blame…” + bằng chứng thời tiết không tệ hơn ba năm trước ⇒ đổ lỗi cho thời tiết là không đứng vững.' },
        ],
      },
      {
        key: 'writing',
        nhan: 'Viết',
        chamDuoc: false,
        lyDoKhongCham: 'App không chấm ngữ pháp và không cho điểm bài viết. Máy chỉ đối chiếu được số từ và các cụm bắt buộc; phần còn lại bạn tự soi theo bảng tiêu chí.',
        de: {
          id: 'ex-w-b2',
          deBai: 'Viết 150–220 từ nêu quan điểm: “Học ngoại ngữ bằng ứng dụng có thể thay thế lớp học có giáo viên.” Nêu lập trường của bạn, ít nhất hai lý do, và trả lời một ý kiến ngược lại.',
          yeuCau: { soTuToiThieu: 150, soTuToiDa: 220, tuBatBuoc: ['however', 'although'], moTaTuBatBuoc: 'Bài phải có “however” và “although” — hai từ nối dùng để đưa ý ngược lại.' },
          checklist: [
            'Mình có nêu rõ lập trường ngay từ đoạn đầu không, hay nói nước đôi?',
            'Mình có đủ ít nhất HAI lý do khác nhau, mỗi lý do kèm ví dụ hoặc giải thích không?',
            'Mình có nêu một ý kiến NGƯỢC LẠI rồi trả lời nó, chứ không chỉ nhắc qua?',
            'Đoạn kết có nói lại lập trường mà không chép nguyên đoạn mở không?',
            'Có câu nào mình viết chỉ để cho đủ số từ không?',
          ],
          modelAnswer: 'An app can take a learner a long way, but I do not believe it can replace a teacher entirely. My first reason is feedback. An app can tell me that my answer does not match the expected one, yet it cannot explain why my sentence sounds unnatural to a real listener, or notice that I have been avoiding a structure for weeks. A teacher notices patterns in my mistakes that I cannot see myself. My second reason is pressure. Learning alone is easy to postpone, and an app has no way of asking me where I was last Tuesday. Although some learners are disciplined enough to study every day without anyone watching, most of the people I know who reached a high level had someone expecting them. However, I would not argue that classes are always better. A class moves at the average speed of the group, so it wastes the time of both the fastest and the slowest learner, and an app fixes exactly that. The honest answer is that they do different jobs: the app builds hours, the teacher corrects direction.',
          ghiChuBaiMau: 'Bài mẫu nêu lập trường ở câu đầu, đưa hai lý do TÁCH BẠCH (feedback và pressure), mỗi lý do có giải thích cụ thể chứ không phải khẳng định suông. “Although” và “However” được dùng đúng chức năng: nhượng bộ rồi phản bác — đó là chỗ nhiều bài B2 bị mất điểm vì chỉ nêu ý mình. Kết bài không lặp lại đoạn mở mà đưa ra một cách nhìn thứ ba. Đây là MỘT cách viết, không phải cách duy nhất.',
        },
      },
      {
        key: 'speaking',
        nhan: 'Nói',
        chamDuoc: false,
        lyDoKhongCham: 'Trình duyệt chỉ trả về VĂN BẢN nó nghe được, không đánh giá phát âm. App này cố ý không dùng dịch vụ chấm phát âm trả phí.',
        de: {
          id: 'ex-s-b2',
          deBai: 'Nói khoảng 90 giây: theo bạn, mạng xã hội có làm người ta cô đơn hơn không? Nêu lập trường, đưa hai lý do, và nói cả mặt ngược lại.',
          giay: 90,
          soTuToiThieu: 90,
          tuMucTieu: ['however', 'personally', 'depends', 'research', 'connect'],
          soTuPhaiDung: 3,
          kieu: 'lap_luan',
        },
      },
    ],
  },
];

export default bandExams;
