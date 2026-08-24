// File: src/data/grammarDataA1.js
// BA BÀI NGỮ PHÁP A1 MÀ KHO CHƯA TỪNG CÓ — SOẠN TAY.
//
// ══ VÌ SAO PHẢI SOẠN THÊM, TRONG KHI NGUYÊN TẮC LÀ KHÔNG TỰ THÊM NỘI DUNG ══
// Đợt audit này đo được: trong toàn bộ 90 chuyên đề ngữ pháp của kho, KHÔNG CÓ
// bài nào dạy ba thứ dưới đây:
//
//   1. động từ TO BE (am / is / are)
//   2. danh từ số nhiều (-s / -es / bất quy tắc)
//   3. this / that / these / those
//
// Cụm "am/is/are" xuất hiện 20 lần trong kho, nhưng lần nào cũng NẰM TRONG một
// cấu trúc khác — hiện tại tiếp diễn (S + am/is/are + V-ing), be going to,
// be able to — tức là mọi bài đều GIẢ ĐỊNH người học đã biết TO BE rồi. Người
// mất gốc thì chưa. Họ gặp "I am watching TV" trước khi gặp "I am a student".
//
// Ba bài này không phải "thêm bài cho nhiều". Không có chúng thì bậc A1 không
// đứng được: đại từ, mạo từ, There is/are, câu hỏi Wh- đều cần TO BE và số
// nhiều làm nền. Đây là mức tối thiểu để một người mất gốc đặt được câu tiếng
// Anh đầu tiên của mình.
//
// ══ KHUÔN DỮ LIỆU ══
// Giữ ĐÚNG khuôn của grammarDataB1.js — theory / sentenceGame / exercises /
// fillBlanks / errorCorrection / transformation / matching / trueFalse — để mọi
// màn hình và mọi bộ lọc hiện có dùng được ngay, không phải thêm nhánh nào.
//
// `level: 'A1'` là bậc THẬT của ba bài này. Các file khác khai 'B1'/'B2'/'C1/C2'
// theo tên bộ giáo trình gốc; ở đây không có bộ giáo trình nào để bám theo, nên
// khai đúng thang CEFR.

export const grammarDataA1 = [
  {
    id: 'a1_be',
    title: '1. Động Từ TO BE (am / is / are)',
    level: 'A1',
    category: 'Câu cơ bản',
    color: 'bg-lime-200',
    theory: [
      {
        h: 'I. TO BE là gì',
        c: '👉 TO BE là động từ "thì / là / ở". Nó nối CHỦ NGỮ với thứ nói về chủ ngữ đó.\n→ I am a student. (Tôi LÀ học sinh.)\n→ She is happy. (Cô ấy THÌ vui.)\n→ They are at home. (Họ Ở nhà.)\n\n⚠️ Tiếng Việt bỏ được chữ "thì/là": "Tôi vui." Tiếng Anh thì KHÔNG.\n❌ I happy. → ✅ I am happy.\nĐây là lỗi số một của người Việt mới học.',
      },
      {
        h: 'II. Chia theo chủ ngữ — chỉ có 3 dạng',
        c: '✅ I → am\n✅ He / She / It → is\n✅ You / We / They → are\n\nHọc thuộc đúng ba dòng này là xong phần khó nhất:\n→ I am Nam.\n→ He is my brother.\n→ We are students.\n\n📌 Danh từ số ít cũng dùng IS: My father is a doctor.\n📌 Danh từ số nhiều cũng dùng ARE: My friends are here.',
      },
      {
        h: 'III. Dạng rút gọn (nói hằng ngày)',
        c: 'Người bản ngữ gần như luôn nói dạng rút gọn:\n→ I am = I\'m\n→ He is = He\'s · She is = She\'s · It is = It\'s\n→ You are = You\'re · We are = We\'re · They are = They\'re\n\n✅ I\'m from Vietnam.\n✅ She\'s my teacher.',
      },
      {
        h: 'IV. Phủ định và câu hỏi',
        c: '❌ PHỦ ĐỊNH: thêm NOT ngay sau to be\n→ I am not tired. (I\'m not tired.)\n→ He is not here. (He isn\'t here.)\n→ They are not students. (They aren\'t students.)\n\n❓ CÂU HỎI: đảo to be lên TRƯỚC chủ ngữ\n→ Are you a student? — Yes, I am. / No, I\'m not.\n→ Is she your sister? — Yes, she is. / No, she isn\'t.\n\n⚠️ Trả lời ngắn KHÔNG rút gọn ở dạng khẳng định:\n❌ Yes, I\'m. → ✅ Yes, I am.',
      },
      {
        h: 'V. Lỗi thường gặp của người Việt',
        c: '⚠️ SAI: I am go to school. → ĐÚNG: I go to school.\n   (TO BE không đứng trước động từ thường.)\n⚠️ SAI: She have 20 years old. → ĐÚNG: She is 20 years old.\n   (Tuổi dùng TO BE, không dùng "have".)\n⚠️ SAI: I very happy. → ĐÚNG: I am very happy.\n⚠️ SAI: Are you student? → ĐÚNG: Are you a student?',
      },
    ],
    sentenceGame: [
      { id: 1, text: 'I am a student at this school', trans: 'Tôi là học sinh ở trường này' },
      { id: 2, text: 'She is my older sister', trans: 'Cô ấy là chị gái tôi' },
      { id: 3, text: 'We are very happy today', trans: 'Hôm nay chúng tôi rất vui' },
      { id: 4, text: 'He is not at home now', trans: 'Bây giờ anh ấy không ở nhà' },
      { id: 5, text: 'Are you from Vietnam', trans: 'Bạn đến từ Việt Nam phải không' },
      { id: 6, text: 'My parents are teachers', trans: 'Bố mẹ tôi là giáo viên' },
    ],
    exercises: [
      { id: 1, q: 'I _____ a student.', opts: ['am', 'is', 'are', 'be'], a: 'am' },
      { id: 2, q: 'She _____ my friend.', opts: ['is', 'am', 'are', 'be'], a: 'is' },
      { id: 3, q: 'They _____ at school now.', opts: ['are', 'is', 'am', 'be'], a: 'are' },
      { id: 4, q: 'My brother _____ ten years old.', opts: ['is', 'are', 'am', 'have'], a: 'is' },
      { id: 5, q: '_____ you tired?', opts: ['Are', 'Is', 'Am', 'Do'], a: 'Are' },
      { id: 6, q: 'We _____ not ready yet.', opts: ['are', 'is', 'am', 'do'], a: 'are' },
      { id: 7, q: 'It _____ very cold today.', opts: ['is', 'are', 'am', 'has'], a: 'is' },
      { id: 8, q: 'Yes, I _____.', opts: ['am', 'is', 'are', "'m"], a: 'am' },
    ],
    fillBlanks: [
      { q: 'I _____ from Hanoi.', a: 'am', trans: 'Tôi đến từ Hà Nội.' },
      { q: 'My mother _____ a nurse.', a: 'is', trans: 'Mẹ tôi là y tá.' },
      { q: 'You and I _____ good friends.', a: 'are', trans: 'Bạn và tôi là bạn tốt.' },
      { q: '_____ this your book?', a: 'Is', trans: 'Đây có phải sách của bạn không?' },
      { q: 'The children _____ in the garden.', a: 'are', trans: 'Bọn trẻ đang ở trong vườn.' },
    ],
    errorCorrection: [
      { sentence: 'I very tired today.', errorWord: 'very', correction: 'am very', explanation: 'Tiếng Anh không bỏ được TO BE: I AM very tired.', trans: 'Hôm nay tôi rất mệt.' },
      { sentence: 'She are my teacher.', errorWord: 'are', correction: 'is', explanation: 'Chủ ngữ He/She/It luôn đi với IS, không đi với ARE.', trans: 'Cô ấy là giáo viên của tôi.' },
      { sentence: 'They is students.', errorWord: 'is', correction: 'are', explanation: 'Chủ ngữ You/We/They luôn đi với ARE, không đi với IS.', trans: 'Họ là học sinh.' },
      { sentence: 'He have 15 years old.', errorWord: 'have', correction: 'is', explanation: 'Tuổi dùng TO BE, không dùng have: He IS 15 years old.', trans: 'Anh ấy 15 tuổi.' },
      { sentence: 'I am go to work by bus.', errorWord: 'am', correction: "(bỏ 'am')", explanation: 'TO BE không đứng trước động từ thường: I go to work by bus.', trans: 'Tôi đi làm bằng xe buýt.' },
    ],
    transformation: [
      { original: 'I am a teacher.', instruction: 'Chuyển sang phủ định.', keyword: 'not', a: 'I am not a teacher.' },
      { original: 'She is at home.', instruction: 'Chuyển sang câu hỏi.', keyword: 'Is', a: 'Is she at home?' },
      { original: 'They are not ready.', instruction: 'Viết dạng rút gọn.', keyword: "aren't", a: "They aren't ready." },
      { original: 'He is my brother.', instruction: 'Đổi chủ ngữ sang They.', keyword: 'are', a: 'They are my brothers.' },
    ],
    matching: [
      {
        pairs: [
          { left: 'I _____', right: 'am' },
          { left: 'She _____', right: 'is' },
          { left: 'They _____', right: 'are' },
          { left: 'It _____', right: 'is' },
        ],
      },
    ],
    trueFalse: [
      { sentence: 'I am a doctor.', isCorrect: true, correction: '', explanation: 'Chủ ngữ I luôn đi với AM — đây là dạng duy nhất chỉ dùng cho I.', trans: 'Tôi là bác sĩ.' },
      { sentence: 'He are my father.', isCorrect: false, correction: 'He is my father.', explanation: 'Chủ ngữ He đi với IS; ARE chỉ dùng cho You/We/They.', trans: 'Anh ấy là bố tôi.' },
      { sentence: 'We happy today.', isCorrect: false, correction: 'We are happy today.', explanation: 'Tiếng Anh không bỏ được TO BE trước tính từ: We ARE happy today.', trans: 'Hôm nay chúng tôi vui.' },
      { sentence: 'Are you ready?', isCorrect: true, correction: '', explanation: 'Câu hỏi với TO BE: đảo động từ lên trước chủ ngữ — Are you…?', trans: 'Bạn sẵn sàng chưa?' },
    ],
  },

  {
    id: 'a1_plural',
    title: '2. Danh Từ Số Nhiều (Plural Nouns)',
    level: 'A1',
    category: 'Danh từ',
    color: 'bg-lime-200',
    theory: [
      {
        h: 'I. Vì sao phải học sớm',
        c: '👉 Tiếng Việt: "một quyển sách" / "ba quyển sách" — chữ "sách" KHÔNG đổi.\n👉 Tiếng Anh: one book / three bookS — danh từ PHẢI đổi.\n\nBỏ chữ "s" là lỗi phổ biến nhất của người Việt, và nó kéo theo lỗi thứ hai: chia sai động từ.\n❌ Three book is on the table.\n✅ Three books are on the table.',
      },
      {
        h: 'II. Quy tắc thường: thêm -S',
        c: '✅ book → books · pen → pens · dog → dogs · house → houses\n\n📌 Tận cùng -s, -ss, -sh, -ch, -x, -o → thêm -ES:\n→ bus → buses · glass → glasses · dish → dishes\n→ watch → watches · box → boxes · tomato → tomatoes',
      },
      {
        h: 'III. Tận cùng -Y và -F',
        c: '📌 Phụ âm + Y → đổi Y thành I rồi thêm ES:\n→ baby → babies · city → cities · country → countries\n⚠️ Nhưng nguyên âm + Y thì chỉ thêm S:\n→ boy → boys · day → days · key → keys\n\n📌 Tận cùng -F / -FE → đổi thành VES:\n→ leaf → leaves · knife → knives · wife → wives',
      },
      {
        h: 'IV. Bất quy tắc — phải học thuộc',
        c: '⭐ man → men · woman → women · child → children\n⭐ foot → feet · tooth → teeth · person → people\n⭐ mouse → mice\n\n📌 KHÔNG ĐỔI: fish → fish · sheep → sheep\n\n⚠️ "people" đã là số nhiều rồi:\n❌ many peoples → ✅ many people',
      },
      {
        h: 'V. Số nhiều kéo theo động từ',
        c: 'Danh từ số nhiều thì động từ cũng đổi:\n→ The book IS new. → The books ARE new.\n→ My friend LIVES here. → My friends LIVE here.\n\n⚠️ SAI: My friends lives here. → ĐÚNG: My friends live here.',
      },
    ],
    sentenceGame: [
      { id: 1, text: 'There are three books on the table', trans: 'Có ba quyển sách trên bàn' },
      { id: 2, text: 'My friends live in the city', trans: 'Bạn tôi sống trong thành phố' },
      { id: 3, text: 'The children are playing outside', trans: 'Bọn trẻ đang chơi ngoài kia' },
      { id: 4, text: 'She has two babies', trans: 'Cô ấy có hai em bé' },
      { id: 5, text: 'Many people work in this building', trans: 'Nhiều người làm việc trong toà nhà này' },
    ],
    exercises: [
      { id: 1, q: 'I have two _____.', opts: ['books', 'book', 'bookes', 'bookies'], a: 'books' },
      { id: 2, q: 'There are five _____ in the box.', opts: ['boxes', 'boxs', 'box', 'boxies'], a: 'boxes' },
      { id: 3, q: 'The _____ are playing.', opts: ['children', 'childs', 'childrens', 'child'], a: 'children' },
      { id: 4, q: 'She has three _____.', opts: ['babies', 'babys', 'babyes', 'baby'], a: 'babies' },
      { id: 5, q: 'Many _____ live here.', opts: ['people', 'peoples', 'person', 'persons'], a: 'people' },
      { id: 6, q: 'I need two _____.', opts: ['knives', 'knifes', 'knife', 'knifs'], a: 'knives' },
      { id: 7, q: 'My _____ hurt after the walk.', opts: ['feet', 'foots', 'feets', 'foot'], a: 'feet' },
      { id: 8, q: 'There are seven _____ in a week.', opts: ['days', 'dayes', 'daies', 'day'], a: 'days' },
    ],
    fillBlanks: [
      { q: 'I see three (cat) _____ in the garden.', a: 'cats', trans: 'Tôi thấy ba con mèo trong vườn.' },
      { q: 'There are many (city) _____ in Vietnam.', a: 'cities', trans: 'Việt Nam có nhiều thành phố.' },
      { q: 'Two (man) _____ are waiting outside.', a: 'men', trans: 'Hai người đàn ông đang đợi bên ngoài.' },
      { q: 'She brushes her (tooth) _____ twice a day.', a: 'teeth', trans: 'Cô ấy đánh răng hai lần mỗi ngày.' },
      { q: 'We bought some (tomato) _____.', a: 'tomatoes', trans: 'Chúng tôi mua vài quả cà chua.' },
    ],
    errorCorrection: [
      { sentence: 'I have two book.', errorWord: 'book', correction: 'books', explanation: 'Có "two" thì danh từ phải số nhiều.', trans: 'Tôi có hai quyển sách.' },
      { sentence: 'There are many childs here.', errorWord: 'childs', correction: 'children', explanation: 'child → children (bất quy tắc).', trans: 'Có nhiều trẻ em ở đây.' },
      { sentence: 'Many peoples came to the party.', errorWord: 'peoples', correction: 'people', explanation: '"people" đã là số nhiều.', trans: 'Nhiều người đã đến bữa tiệc.' },
      { sentence: 'My friends lives in Hue.', errorWord: 'lives', correction: 'live', explanation: 'Chủ ngữ số nhiều → động từ không thêm -s.', trans: 'Bạn tôi sống ở Huế.' },
      { sentence: 'She has three babys.', errorWord: 'babys', correction: 'babies', explanation: 'Phụ âm + y → đổi y thành i rồi thêm es.', trans: 'Cô ấy có ba em bé.' },
    ],
    transformation: [
      { original: 'There is one book on the desk.', instruction: 'Đổi sang ba quyển.', keyword: 'three', a: 'There are three books on the desk.' },
      { original: 'The child is playing.', instruction: 'Chuyển sang số nhiều.', keyword: 'children', a: 'The children are playing.' },
      { original: 'I have a knife.', instruction: 'Chuyển sang hai cái.', keyword: 'knives', a: 'I have two knives.' },
      { original: 'This city is beautiful.', instruction: 'Chuyển sang số nhiều.', keyword: 'cities', a: 'These cities are beautiful.' },
    ],
    matching: [
      {
        pairs: [
          { left: 'child', right: 'children' },
          { left: 'foot', right: 'feet' },
          { left: 'city', right: 'cities' },
          { left: 'box', right: 'boxes' },
        ],
      },
    ],
    trueFalse: [
      { sentence: 'I have three cats.', isCorrect: true, correction: '', explanation: 'Danh từ đếm được số nhiều thì thêm -s: cat → cats.', trans: 'Tôi có ba con mèo.' },
      { sentence: 'There are many womans here.', isCorrect: false, correction: 'There are many women here.', explanation: 'woman là danh từ bất quy tắc: số nhiều là women, không thêm -s.', trans: 'Có nhiều phụ nữ ở đây.' },
      { sentence: 'Two buses are coming.', isCorrect: true, correction: '', explanation: 'Danh từ tận cùng bằng -s/-ss/-sh/-ch/-x thì thêm -ES: bus → buses.', trans: 'Hai xe buýt đang tới.' },
      { sentence: 'He has five childs.', isCorrect: false, correction: 'He has five children.', explanation: 'child là danh từ bất quy tắc: số nhiều là children, không thêm -s.', trans: 'Anh ấy có năm người con.' },
    ],
  },

  {
    id: 'a1_this',
    title: '3. This / That / These / Those',
    level: 'A1',
    category: 'Từ chỉ định',
    color: 'bg-lime-200',
    theory: [
      {
        h: 'I. Bốn từ, hai câu hỏi',
        c: 'Chỉ cần trả lời hai câu hỏi là chọn đúng:\n\n1️⃣ GẦN hay XA?\n2️⃣ MỘT hay NHIỀU?\n\n✅ Gần + một → THIS (này)\n✅ Gần + nhiều → THESE (những … này)\n✅ Xa + một → THAT (kia/đó)\n✅ Xa + nhiều → THOSE (những … kia)',
      },
      {
        h: 'II. Ví dụ',
        c: '→ This book is mine. (Quyển sách NÀY là của tôi.)\n→ These books are mine. (Những quyển sách NÀY là của tôi.)\n→ That house is big. (Ngôi nhà KIA to.)\n→ Those houses are big. (Những ngôi nhà KIA to.)\n\n📌 Đi kèm to be tương ứng:\nthis / that → is\nthese / those → are',
      },
      {
        h: 'III. Dùng một mình (không có danh từ)',
        c: '→ This is my brother. (Đây là anh trai tôi.)\n→ What is that? (Cái kia là gì?)\n→ These are my keys. (Đây là chìa khoá của tôi.)\n\n📌 Giới thiệu người khác luôn dùng THIS:\n→ This is Nam. He is my friend.\n📌 Nói điện thoại:\n→ Hello, this is Lan speaking.',
      },
      {
        h: 'IV. Lỗi thường gặp',
        c: '⚠️ SAI: This books are new. → ĐÚNG: These books are new.\n⚠️ SAI: These is my friend. → ĐÚNG: This is my friend.\n⚠️ SAI: I like this shoes. → ĐÚNG: I like these shoes.\n   ("shoes" số nhiều → these)\n⚠️ SAI: That are my parents. → ĐÚNG: Those are my parents.',
      },
    ],
    sentenceGame: [
      { id: 1, text: 'This is my new phone', trans: 'Đây là điện thoại mới của tôi' },
      { id: 2, text: 'These books are very interesting', trans: 'Những quyển sách này rất thú vị' },
      { id: 3, text: 'That house over there is big', trans: 'Ngôi nhà đằng kia to' },
      { id: 4, text: 'Those are my parents', trans: 'Kia là bố mẹ tôi' },
      { id: 5, text: 'What is this in English', trans: 'Cái này tiếng Anh là gì' },
    ],
    exercises: [
      { id: 1, q: '_____ is my book. (in my hand)', opts: ['This', 'These', 'Those', 'They'], a: 'This' },
      { id: 2, q: '_____ books are heavy. (in my hands)', opts: ['These', 'This', 'That', 'It'], a: 'These' },
      { id: 3, q: '_____ car over there is new.', opts: ['That', 'These', 'This', 'Those'], a: 'That' },
      { id: 4, q: '_____ are my friends over there.', opts: ['Those', 'That', 'This', 'It'], a: 'Those' },
      { id: 5, q: '_____ is Lan speaking. (on the phone)', opts: ['This', 'That', 'These', 'It'], a: 'This' },
      { id: 6, q: 'I like _____ shoes.', opts: ['these', 'this', 'that', 'it'], a: 'these' },
      { id: 7, q: 'What is _____? (pointing far away)', opts: ['that', 'these', 'those', 'this'], a: 'that' },
      { id: 8, q: '_____ children are very noisy. (near me)', opts: ['These', 'This', 'That', 'It'], a: 'These' },
    ],
    fillBlanks: [
      { q: '_____ is my sister. (standing next to me)', a: 'This', trans: 'Đây là em gái tôi.' },
      { q: '_____ apples are fresh. (in my basket)', a: 'These', trans: 'Những quả táo này tươi.' },
      { q: '_____ mountain is very high. (far away)', a: 'That', trans: 'Ngọn núi kia rất cao.' },
      { q: '_____ are my old photos. (across the room)', a: 'Those', trans: 'Kia là ảnh cũ của tôi.' },
      { q: 'Do you like _____ dress? (I am wearing it)', a: 'this', trans: 'Bạn có thích chiếc váy này không?' },
    ],
    errorCorrection: [
      { sentence: 'This books are new.', errorWord: 'This', correction: 'These', explanation: 'books là số nhiều nên phải dùng These, không dùng This.', trans: 'Những quyển sách này mới.' },
      { sentence: 'These is my friend.', errorWord: 'These', correction: 'This', explanation: 'friend là số ít nên phải dùng This, không dùng These.', trans: 'Đây là bạn tôi.' },
      { sentence: 'That are my parents.', errorWord: 'That', correction: 'Those', explanation: 'parents là số nhiều nên phải dùng Those, không dùng That.', trans: 'Kia là bố mẹ tôi.' },
      { sentence: 'I like this shoes.', errorWord: 'this', correction: 'these', explanation: 'shoes luôn ở dạng số nhiều (một đôi), nên đi với these chứ không phải this.', trans: 'Tôi thích đôi giày này.' },
    ],
    transformation: [
      { original: 'This is my pen.', instruction: 'Chuyển sang số nhiều.', keyword: 'These', a: 'These are my pens.' },
      { original: 'That car is fast.', instruction: 'Chuyển sang số nhiều.', keyword: 'Those', a: 'Those cars are fast.' },
      { original: 'These books are mine.', instruction: 'Chuyển sang số ít.', keyword: 'This', a: 'This book is mine.' },
      { original: 'Those are my friends.', instruction: 'Chuyển sang số ít.', keyword: 'That', a: 'That is my friend.' },
    ],
    matching: [
      {
        pairs: [
          { left: 'gần + một', right: 'this' },
          { left: 'gần + nhiều', right: 'these' },
          { left: 'xa + một', right: 'that' },
          { left: 'xa + nhiều', right: 'those' },
        ],
      },
    ],
    trueFalse: [
      { sentence: 'These are my keys.', isCorrect: true, correction: '', explanation: 'keys là số nhiều và ở gần người nói, nên dùng these.', trans: 'Đây là chìa khoá của tôi.' },
      { sentence: 'This are my brothers.', isCorrect: false, correction: 'These are my brothers.', explanation: 'brothers là số nhiều nên phải dùng These, không dùng This.', trans: 'Đây là các anh em tôi.' },
      { sentence: 'That is my house.', isCorrect: true, correction: '', explanation: 'house là số ít và ở xa người nói, nên dùng that.', trans: 'Kia là nhà tôi.' },
      { sentence: 'Those is a good idea.', isCorrect: false, correction: 'That is a good idea.', explanation: 'idea là số ít nên phải dùng That, không dùng Those.', trans: 'Đó là một ý hay.' },
    ],
  },
];

export default grammarDataA1;
