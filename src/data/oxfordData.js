// File: src/data/oxfordData.js

export const courseData = [
  {
    id: 1,
    title: "Unit 1: Talking about language",
    description: "Nắm vững các thuật ngữ ngữ pháp cốt lõi và ngôn ngữ mệnh lệnh thường dùng trong các bài tập tiếng Anh.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Language words (Từ vựng về ngôn ngữ)",
        items: [
          { word: "noun", type: "Danh từ", phonetic: "/naʊn/", vi: "Chỉ một người hoặc một vật.", example: "book, girl, pen" },
          { word: "verb", type: "Động từ", phonetic: "/vɜːrb/", vi: "Chỉ một hành động (thứ chúng ta làm).", example: "do, read, write" },
          { word: "adjective", type: "Tính từ", phonetic: "/ˈædʒ.ek.tɪv/", vi: "Dùng để miêu tả một người hoặc một vật.", example: "good, bad, happy, long" },
          { word: "adverb", type: "Trạng từ", phonetic: "/ˈæd.vɜːrb/", vi: "Dùng để miêu tả cho một động từ.", example: "slowly, badly" },
          { word: "preposition", type: "Giới từ", phonetic: "/ˌprep.əˈzɪʃ.ən/", vi: "Một từ nhỏ đứng trước một danh từ/đại từ.", example: "in, on, by, at" },
          { word: "singular", type: "Số ít", phonetic: "/ˈsɪŋ.ɡjə.lɚ/", vi: "Chỉ có một (đơn lẻ).", example: "book, house" },
          { word: "plural", type: "Số nhiều", phonetic: "/ˈplʊr.əl/", vi: "Nhiều hơn một.", example: "books, houses" },
          { word: "phrase", type: "Cụm từ", phonetic: "/freɪz/", vi: "Một nhóm từ (không phải là một câu hoàn chỉnh).", example: "in a house, at home" },
          { word: "sentence", type: "Câu", phonetic: "/ˈsen.təns/", vi: "Một ý tưởng hoàn chỉnh, bắt đầu bằng chữ hoa và kết thúc bằng dấu chấm.", example: "The man went into the room." },
          { word: "paragraph", type: "Đoạn văn", phonetic: "/ˈper.ə.ɡræf/", vi: "Một phần ngắn của văn bản, bắt đầu trên một dòng mới.", example: "This book has 60 units." },
          { word: "dialogue", type: "Hội thoại", phonetic: "/ˈdaɪ.ə.lɑːɡ/", vi: "Cuộc trò chuyện giữa hai người.", example: "Ann: How's Jo? Bill: OK." },
          { word: "question", type: "Câu hỏi", phonetic: "/ˈkwes.tʃən/", vi: "Tập hợp các từ kết thúc bằng dấu chấm hỏi (?).", example: "Are you English?" },
          { word: "answer", type: "Câu trả lời", phonetic: "/ˈæn.sɚ/", vi: "Sự hồi đáp lại cho một câu hỏi.", example: "Yes, I am." }
        ]
      },
      {
        heading: "B. The language of the exercises (Ngôn ngữ bài tập)",
        items: [
          { word: "Match...", type: "Chỉ thị", phonetic: "/mætʃ/", vi: "Ghép/Nối.", example: "Match the words on the left with the words on the right." },
          { word: "Fill...", type: "Chỉ thị", phonetic: "/fɪl/", vi: "Điền vào.", example: "Fill the gaps in the sentence." },
          { word: "Correct...", type: "Chỉ thị", phonetic: "/kəˈrekt/", vi: "Sửa lại cho đúng.", example: "Correct the mistakes in the sentences." },
          { word: "Complete...", type: "Chỉ thị", phonetic: "/kəmˈpliːt/", vi: "Hoàn thành.", example: "Complete the sentence for yourself." },
          { word: "Add...", type: "Chỉ thị", phonetic: "/æd/", vi: "Thêm vào.", example: "Add another example." }
        ]
      }
    ],

    // 2. GHÉP TỪ
    dragDrop: {
      buckets: ["Noun", "Verb", "Adjective", "Adverb", "Preposition"],
      items: [
        { id: "i1", word: "book", target: "Noun", vi: "sách" },
        { id: "i2", word: "girl", target: "Noun", vi: "cô gái" },
        { id: "i3", word: "pen", target: "Noun", vi: "bút" },
        { id: "i4", word: "house", target: "Noun", vi: "ngôi nhà" },
        { id: "i5", word: "man", target: "Noun", vi: "đàn ông" },
        { id: "i6", word: "sentence", target: "Noun", vi: "câu" },
        { id: "i7", word: "phrase", target: "Noun", vi: "cụm từ" },
        { id: "i8", word: "dialogue", target: "Noun", vi: "hội thoại" },
        { id: "i9", word: "do", target: "Verb", vi: "làm" },
        { id: "i10", word: "read", target: "Verb", vi: "đọc" },
        { id: "i11", word: "write", target: "Verb", vi: "viết" },
        { id: "i12", word: "speak", target: "Verb", vi: "nói" },
        { id: "i13", word: "match", target: "Verb", vi: "nối" },
        { id: "i14", word: "fill", target: "Verb", vi: "điền" },
        { id: "i15", word: "correct", target: "Verb", vi: "sửa lỗi" },
        { id: "i16", word: "add", target: "Verb", vi: "thêm" },
        { id: "i17", word: "good", target: "Adjective", vi: "tốt" },
        { id: "i18", word: "bad", target: "Adjective", vi: "tồi tệ" },
        { id: "i19", word: "happy", target: "Adjective", vi: "vui vẻ" },
        { id: "i20", word: "long", target: "Adjective", vi: "dài" },
        { id: "i21", word: "singular", target: "Adjective", vi: "số ít" },
        { id: "i22", word: "plural", target: "Adjective", vi: "số nhiều" },
        { id: "i23", word: "new", target: "Adjective", vi: "mới" },
        { id: "i24", word: "blue", target: "Adjective", vi: "xanh dương" },
        { id: "i25", word: "slowly", target: "Adverb", vi: "một cách chậm chạp" },
        { id: "i26", word: "badly", target: "Adverb", vi: "một cách tồi tệ" },
        { id: "i27", word: "in", target: "Preposition", vi: "ở trong" },
        { id: "i28", word: "on", target: "Preposition", vi: "ở trên" },
        { id: "i29", word: "by", target: "Preposition", vi: "bằng/bởi" },
        { id: "i30", word: "at", target: "Preposition", vi: "tại" }
      ]
    },

    // 3. TRẮC NGHIỆM
    quiz: [
      { q: "Are these words a phrase, sentence or question? 'in the park'", options: ["phrase", "sentence", "question", "paragraph"], a: "phrase" },
      { q: "Are these words a phrase, sentence or question? 'Do you speak English?'", options: ["phrase", "sentence", "question", "dialogue"], a: "question" },
      { q: "Are these words a phrase, sentence or question? 'a black cat'", options: ["phrase", "sentence", "question", "verb"], a: "phrase" },
      { q: "Are these words a phrase, sentence or question? 'She is writing a book.'", options: ["phrase", "sentence", "question", "adverb"], a: "sentence" },
      { q: "Are these words a phrase, sentence or question? 'What is your name?'", options: ["phrase", "sentence", "question", "noun"], a: "question" },
      { q: "Are these words a phrase, sentence or question? 'I like English.'", options: ["phrase", "sentence", "question", "adjective"], a: "sentence" },
      { q: "What is the plural of 'book'?", options: ["bookes", "books", "book", "booking"], a: "books" },
      { q: "What is the singular of 'men'?", options: ["mens", "man", "mans", "mane"], a: "man" },
      { q: "Is 'from' a verb?", options: ["Yes", "No, it's a preposition", "No, it's a noun", "No, it's an adverb"], a: "No, it's a preposition" },
      { q: "Is 'cat' an adjective?", options: ["Yes", "No, it's a verb", "No, it's a noun", "No, it's a preposition"], a: "No, it's a noun" },
      { q: "Is 'Jane loves Hari.' a phrase?", options: ["Yes", "No, it's a question", "No, it's a sentence", "No, it's a paragraph"], a: "No, it's a sentence" },
      { q: "Is 'bad' an adverb?", options: ["Yes", "No, it's a verb", "No, it's an adjective", "No, it's a noun"], a: "No, it's an adjective" },
      { q: "Fill the gap: What _______ your name?", options: ["is", "are", "do", "does"], a: "is" },
      { q: "Which of the following is a NOUN?", options: ["slowly", "write", "house", "in"], a: "house" },
      { q: "Correct the spelling mistake: 'speek'", options: ["speack", "speak", "spiek", "speke"], a: "speak" },
      { q: "Correct the spelling mistake: 'inglish'", options: ["englich", "English", "Anglish", "englis"], a: "English" },
      { q: "Which verb matches 'homework'?", options: ["make homework", "do homework", "have homework", "write homework"], a: "do homework" },
      { q: "Which verb matches 'a mistake'?", options: ["make a mistake", "do a mistake", "have a mistake", "say a mistake"], a: "make a mistake" },
      { q: "Which verb matches 'a shower'?", options: ["make a shower", "do a shower", "have a shower", "go a shower"], a: "have a shower" },
      { q: "What is a 'dialogue'?", options: ["A person or thing", "A conversation between two people", "A group of words", "Just one thing"], a: "A conversation between two people" }
    ],

    // 4. TRÒ CHƠI ĐIỀN KHUYẾT (TYPING)
    typingGame: [
      { q: "A ______ is a person or thing.", hint: "n _ _ n", a: "noun" },
      { q: "A ______ is something we do.", hint: "v _ _ b", a: "verb" },
      { q: "An ______ describes a person or thing.", hint: "a _ _ _ _ _ _ _ e", a: "adjective" },
      { q: "An ______ describes a verb.", hint: "a _ _ _ _ b", a: "adverb" },
      { q: "A ______ is a little word used before a noun (e.g., in, on).", hint: "p _ _ _ _ _ _ _ _ _ n", a: "preposition" },
      { q: "The word for 'just one' is ______.", hint: "s _ _ _ _ _ _ r", a: "singular" },
      { q: "The word for 'more than one' is ______.", hint: "p _ _ _ _ l", a: "plural" },
      { q: "A group of words (not a complete sentence) is a ______.", hint: "p _ _ _ _ e", a: "phrase" },
      { q: "A complete idea in writing, ending with a full stop is a ______.", hint: "s _ _ _ _ _ _ e", a: "sentence" },
      { q: "A short part of a text beginning on a new line is a ______.", hint: "p _ _ _ _ _ _ _ h", a: "paragraph" },
      { q: "A conversation between two people is a ______.", hint: "d _ _ _ _ _ _ e", a: "dialogue" },
      { q: "A set of words that ends with a '?' is a ______.", hint: "q _ _ _ _ _ _ n", a: "question" },
      { q: "A reply to a question is an ______.", hint: "a _ _ _ _ r", a: "answer" },
      { q: "Instruction: ______ the words on the left with the right.", hint: "M _ _ _ h", a: "Match" },
      { q: "Instruction: ______ the gaps in the sentence.", hint: "F _ _ l", a: "Fill" },
      { q: "Instruction: ______ the mistakes in the sentences.", hint: "C _ _ _ _ _ t", a: "Correct" },
      { q: "Instruction: ______ the sentence for yourself.", hint: "C _ _ _ _ _ _ e", a: "Complete" },
      { q: "Instruction: ______ another example.", hint: "A _ d", a: "Add" },
      { q: "The plural of 'book' is ______.", hint: "b _ _ _ s", a: "books" },
      { q: "The singular of 'men' is ______.", hint: "m _ n", a: "man" }
    ],

    // 5. THỰC HÀNH AI
    speaking: [
      { text: "The man went into the room and closed the door.", trans: "Người đàn ông đi vào phòng và đóng cửa lại." },
      { text: "Match the words on the left with the words on the right.", trans: "Ghép các từ bên trái với các từ bên phải." },
      { text: "Fill the gaps in the sentence.", trans: "Điền vào các chỗ trống trong câu." },
      { text: "Correct the mistakes in the sentences.", trans: "Sửa các lỗi sai trong câu." },
      { text: "Complete the sentence for yourself.", trans: "Hoàn thành câu nói về bản thân bạn." }
    ]
  },
  {
    id: 2,
    title: "Unit 2: Learning vocabulary",
    description: "Học cách ghi chép từ vựng hiệu quả: học theo cụm từ (collocations), theo họ từ (word families) và sử dụng hình ảnh/sơ đồ tư duy.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Collocations (Các từ luôn đi kèm với nhau)",
        items: [
          { word: "do an exercise", type: "Cụm từ", phonetic: "/duː ən ˈek.sɚ.saɪz/", vi: "Làm bài tập.", example: "You do the exercises in this book." },
          { word: "make a mistake", type: "Cụm từ", phonetic: "/meɪk ə mɪˈsteɪk/", vi: "Phạm sai lầm (KHÔNG dùng 'do a mistake').", example: "Sometimes, you may make mistakes in your English." },
          { word: "go by train", type: "Cụm từ", phonetic: "/ɡoʊ baɪ treɪn/", vi: "Đi bằng tàu hỏa.", example: "I usually go to work by train." },
          { word: "go on foot", type: "Cụm từ", phonetic: "/ɡoʊ ɑːn fʊt/", vi: "Đi bộ (KHÔNG dùng 'go by foot').", example: "I don't have a car, so I go on foot." },
          { word: "good at languages", type: "Cụm từ", phonetic: "/ɡʊd æt ˈlæŋ.ɡwɪdʒ.ɪz/", vi: "Giỏi ngôn ngữ (KHÔNG dùng 'good in').", example: "Some people are very good at languages." },
          { word: "a tall man", type: "Cụm từ", phonetic: "/ə tɑːl mæn/", vi: "Một người đàn ông cao (KHÔNG dùng 'a high man').", example: "I saw a very tall man." }
        ]
      },
      {
        heading: "B. Word families (Gia đình từ / Nhóm từ vựng)",
        items: [
          { word: "temperature", type: "Nhóm từ", phonetic: "/ˈtem.pɚ.ə.tʃɚ/", vi: "Nhiệt độ. Gồm: hot (nóng), warm (ấm), cool (mát), cold (lạnh).", example: "Make a page for 'temperature' words." },
          { word: "travel", type: "Nhóm từ", phonetic: "/ˈtræv.əl/", vi: "Du lịch. Gồm: ticket (vé), passport (hộ chiếu), suitcase (vali).", example: "Put ticket, passport and suitcase in the 'travel' family." },
          { word: "weather", type: "Nhóm từ", phonetic: "/ˈweð.ɚ/", vi: "Thời tiết. Gồm: sun, cloud, rain, snow, wet, dry.", example: "Wet and dry are weather words." }
        ]
      },
      {
        heading: "C. Pictures and diagrams (Hình ảnh và sơ đồ tư duy)",
        items: [
          { word: "car parts", type: "Từ vựng xe hơi", phonetic: "/kɑːr pɑːrts/", vi: "boot (cốp xe), window (cửa sổ), wheel (bánh xe), door (cửa xe), windscreen (kính chắn gió), headlight (đèn pha).", example: "Draw a car and label its parts." },
          { word: "eating", type: "Đồ ăn uống", phonetic: "/ˈiː.tɪŋ/", vi: "knife (dao), fork (nĩa), spoon (thìa).", example: "We use a knife, fork and spoon to eat." },
          { word: "drinking", type: "Đồ uống nước", phonetic: "/ˈdrɪŋ.kɪŋ/", vi: "glass (ly/cốc thủy tinh), cup (tách), mug (cốc lớn có quai).", example: "I drink coffee from a mug." },
          { word: "furniture", type: "Đồ nội thất", phonetic: "/ˈfɝː.nɪ.tʃɚ/", vi: "chair (ghế), desk (bàn làm việc).", example: "A chair is a piece of furniture." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại từ vựng theo sơ đồ tư duy)
    dragDrop: {
      buckets: ["Car parts", "Eating/Drinking", "Weather", "Travel", "Furniture/Clothes"],
      items: [
        { id: "i1", word: "boot", target: "Car parts", vi: "cốp xe" },
        { id: "i2", word: "wheel", target: "Car parts", vi: "bánh xe" },
        { id: "i3", word: "windscreen", target: "Car parts", vi: "kính chắn gió" },
        { id: "i4", word: "headlight", target: "Car parts", vi: "đèn pha" },
        { id: "i5", word: "door", target: "Car parts", vi: "cửa xe" },
        { id: "i6", word: "window", target: "Car parts", vi: "cửa sổ xe" },
        { id: "i7", word: "knife", target: "Eating/Drinking", vi: "con dao" },
        { id: "i8", word: "fork", target: "Eating/Drinking", vi: "cái nĩa" },
        { id: "i9", word: "spoon", target: "Eating/Drinking", vi: "cái thìa" },
        { id: "i10", word: "glass", target: "Eating/Drinking", vi: "cốc thủy tinh" },
        { id: "i11", word: "cup", target: "Eating/Drinking", vi: "tách (trà)" },
        { id: "i12", word: "mug", target: "Eating/Drinking", vi: "cốc có quai" },
        { id: "i13", word: "sun", target: "Weather", vi: "mặt trời" },
        { id: "i14", word: "cloud", target: "Weather", vi: "đám mây" },
        { id: "i15", word: "rain", target: "Weather", vi: "mưa" },
        { id: "i16", word: "snow", target: "Weather", vi: "tuyết" },
        { id: "i17", word: "ice", target: "Weather", vi: "băng" },
        { id: "i18", word: "warm", target: "Weather", vi: "ấm áp" },
        { id: "i19", word: "ticket", target: "Travel", vi: "vé" },
        { id: "i20", word: "passport", target: "Travel", vi: "hộ chiếu" },
        { id: "i21", word: "suitcase", target: "Travel", vi: "vali" },
        { id: "i22", word: "train", target: "Travel", vi: "tàu hỏa" },
        { id: "i23", word: "hotel", target: "Travel", vi: "khách sạn" },
        { id: "i24", word: "journey", target: "Travel", vi: "chuyến đi" },
        { id: "i25", word: "chair", target: "Furniture/Clothes", vi: "cái ghế" },
        { id: "i26", word: "desk", target: "Furniture/Clothes", vi: "bàn làm việc" },
        { id: "i27", word: "bed", target: "Furniture/Clothes", vi: "cái giường" },
        { id: "i28", word: "dress", target: "Furniture/Clothes", vi: "cái váy" },
        { id: "i29", word: "hat", target: "Furniture/Clothes", vi: "cái mũ" },
        { id: "i30", word: "shoes", target: "Furniture/Clothes", vi: "đôi giày" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Kiểm tra Collocations và Word Families)
    quiz: [
      { q: "1. Which is the correct collocation?", options: ["make an exercise", "do an exercise", "have an exercise", "play an exercise"], a: "do an exercise" },
      { q: "2. Which is the correct collocation?", options: ["do a mistake", "say a mistake", "make a mistake", "have a mistake"], a: "make a mistake" },
      { q: "3. If you walk, you go ____ foot.", options: ["by", "in", "on", "with"], a: "on" },
      { q: "4. I always go to work ____ train.", options: ["by", "in", "on", "with"], a: "by" },
      { q: "5. She is very good ____ languages.", options: ["in", "at", "with", "about"], a: "at" },
      { q: "6. Don't say 'a high man', you must say 'a ____ man'.", options: ["tall", "long", "big", "large"], a: "tall" },
      { q: "7. Which word belongs to the 'temperature' family?", options: ["ticket", "warm", "suitcase", "fork"], a: "warm" },
      { q: "8. Which word belongs to the 'travel' family?", options: ["cold", "spoon", "passport", "cloud"], a: "passport" },
      { q: "9. What is the front glass of a car called?", options: ["window", "headlight", "windscreen", "boot"], a: "windscreen" },
      { q: "10. What do you call the lights at the front of a car?", options: ["headlights", "windows", "boots", "wheels"], a: "headlights" },
      { q: "11. What is the storage area at the back of a car?", options: ["wheel", "windscreen", "boot", "door"], a: "boot" },
      { q: "12. Which tool do you use to cut meat?", options: ["fork", "spoon", "knife", "glass"], a: "knife" },
      { q: "13. Which container has a handle (quai) and is used for hot coffee?", options: ["glass", "plate", "spoon", "mug"], a: "mug" },
      { q: "14. Which word belongs to the 'weather' family?", options: ["cloud", "ticket", "desk", "fork"], a: "cloud" },
      { q: "15. Which word belongs to 'furniture' (đồ nội thất)?", options: ["dress", "desk", "hat", "suitcase"], a: "desk" },
      { q: "16. Which word belongs to 'clothes' (quần áo)?", options: ["chair", "dress", "mug", "wheel"], a: "dress" },
      { q: "17. Which is the correct combination?", options: ["good in maths", "good at maths", "good with maths", "good on maths"], a: "good at maths" },
      { q: "18. You use a ______ to eat soup.", options: ["knife", "fork", "spoon", "cup"], a: "spoon" },
      { q: "19. Which word is NOT a part of a car?", options: ["wheel", "windscreen", "fork", "boot"], a: "fork" },
      { q: "20. A ______ is a piece of furniture.", options: ["passport", "chair", "hat", "knife"], a: "chair" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn trí nhớ mặt chữ)
    typingGame: [
      { q: "Collocation: To complete your homework is to ______ an exercise.", hint: "d _", a: "do" },
      { q: "Collocation: To do something wrong is to ______ a mistake.", hint: "m _ _ e", a: "make" },
      { q: "Collocation: I travel ______ train.", hint: "b _", a: "by" },
      { q: "Collocation: I don't have a car, I go ______ foot.", hint: "o _", a: "on" },
      { q: "Collocation: He is very good ______ languages.", hint: "a _", a: "at" },
      { q: "Collocation: Yao Ming is a very ______ man.", hint: "t _ _ l", a: "tall" },
      { q: "Travel family: You need a ______ to get on a plane or train.", hint: "t _ _ k _ t", a: "ticket" },
      { q: "Travel family: You need a ______ to travel to another country.", hint: "p _ _ s p _ _ t", a: "passport" },
      { q: "Travel family: You put your clothes in a ______ when you travel.", hint: "s _ _ t c _ _ e", a: "suitcase" },
      { q: "Car parts: The storage space at the back of the car is the ______.", hint: "b _ _ t", a: "boot" },
      { q: "Car parts: The glass at the front of the car is the ______.", hint: "w _ _ d s _ _ _ _ n", a: "windscreen" },
      { q: "Car parts: A car has 4 round ______ to move.", hint: "w _ _ _ l s", a: "wheels" },
      { q: "Car parts: The bright lights at the front are ______.", hint: "h _ _ d l _ _ _ t s", a: "headlights" },
      { q: "Eating: You use a ______ to cut food.", hint: "k _ _ f _", a: "knife" },
      { q: "Eating: You use a ______ to eat soup.", hint: "s p _ _ n", a: "spoon" },
      { q: "Eating: You use a ______ to pick up pieces of meat or pasta.", hint: "f _ _ k", a: "fork" },
      { q: "Drinking: You drink cold water from a ______.", hint: "g l _ _ s", a: "glass" },
      { q: "Drinking: A large cup with a handle for coffee is a ______.", hint: "m _ g", a: "mug" },
      { q: "Furniture: A ______ is a table you sit at to work or study.", hint: "d _ s k", a: "desk" },
      { q: "Temperature: The opposite of cold is ______.", hint: "h _ t", a: "hot" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "Always write down collocations when you learn a new word.", trans: "Luôn ghi chú lại các cụm từ đi kèm khi bạn học một từ mới." },
      { text: "Make a page for every different word family in your notebook.", trans: "Hãy dành riêng một trang cho mỗi họ từ khác nhau trong sổ tay của bạn." },
      { text: "Draw simple pictures to help you remember these words.", trans: "Hãy vẽ những bức tranh đơn giản để giúp bạn nhớ những từ này." },
      { text: "I go to work by train, but I go to the park on foot.", trans: "Tôi đi làm bằng tàu hỏa, nhưng tôi đi bộ đến công viên." },
      { text: "I made a mistake in my English exercise today.", trans: "Tôi đã phạm một sai lầm trong bài tập tiếng Anh hôm nay." }
    ]
  },
  {
    id: 3,
    title: "Unit 3: Have / had / had",
    description: "Học cách sử dụng động từ 'have' với các bữa ăn, sự kiện, vệ sinh cá nhân, cũng như các thành ngữ phổ biến, cách dùng 'have got' và 'have to'.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A & B. What can you have? (Bạn có thể dùng HAVE với những gì?)",
        items: [
          { word: "have lunch", type: "Bữa ăn", phonetic: "/hæv lʌntʃ/", vi: "Ăn trưa (Tương tự: have dinner / breakfast / a meal / something to eat).", example: "I usually have lunch at 1 o'clock." },
          { word: "have a party", type: "Sự kiện", phonetic: "/hæv ə ˈpɑːr.t̬i/", vi: "Tổ chức tiệc (Tương tự: have a meeting / a competition / a game of football).", example: "Jane is having a party on Saturday." },
          { word: "have a lesson", type: "Học tập", phonetic: "/hæv ə ˈles.ən/", vi: "Có tiết học (Tương tự: have an exam / homework / an appointment).", example: "I have an appointment with the dentist at 3 o'clock." },
          { word: "have a cup of tea", type: "Đồ uống", phonetic: "/hæv ə kʌp əv tiː/", vi: "Uống một tách trà (Tương tự: have coffee / a drink / a sandwich / an ice-cream).", example: "Let's have a cup of coffee." },
          { word: "have a shower", type: "Vệ sinh/Thể thao", phonetic: "/hæv ə ˈʃaʊ.ɚ/", vi: "Tắm vòi sen (Tương tự: have a bath / a swim / a sauna).", example: "I always have a shower in the morning." }
        ]
      },
      {
        heading: "C. Expressions with Have (Các cụm thành ngữ với Have)",
        items: [
          { word: "have a look", type: "Thành ngữ", phonetic: "/hæv ə lʊk/", vi: "Nhìn qua, xem thử (= look at it).", example: "Is that your new camera? Can I have a look?" },
          { word: "have a go", type: "Thành ngữ", phonetic: "/hæv ə ɡoʊ/", vi: "Thử làm, đi thử (= ride it / try it).", example: "Is that your bicycle? Can I have a go?" },
          { word: "have a good journey", type: "Thành ngữ", phonetic: "/hæv ə ɡʊd ˈdʒɝː.ni/", vi: "Chúc chuyến đi vui vẻ, thượng lộ bình an.", example: "Goodbye! Have a good journey!" },
          { word: "have a moment", type: "Thành ngữ", phonetic: "/hæv ə ˈmoʊ.mənt/", vi: "Có chút thời gian rảnh (= have some time).", example: "Do you have a moment?" },
          { word: "have a word", type: "Thành ngữ", phonetic: "/hæv ə wɝːd/", vi: "Nói chuyện riêng một lát (= speak to you).", example: "Can I have a word with you?" },
          { word: "have a good time", type: "Thành ngữ", phonetic: "/hæv ə ɡʊd taɪm/", vi: "Có khoảng thời gian vui vẻ (= enjoy).", example: "We always have a good time in our English lessons." },
          { word: "have my hair cut", type: "Thành ngữ", phonetic: "/hæv maɪ her kʌt/", vi: "Đi cắt tóc.", example: "I'm going to have my hair cut. See you later." },
          { word: "have the time", type: "Thành ngữ", phonetic: "/hæv ðə taɪm/", vi: "Có thời gian rảnh rỗi.", example: "I want to learn to ski but I don't have the time." }
        ]
      },
      {
        heading: "D & E. Have got & Have to",
        items: [
          { word: "have got", type: "Sở hữu", phonetic: "/hæv ɡɑːt/", vi: "Có (dùng trong văn nói, thân mật = have trong văn viết).", example: "I've got three sisters. / I've got a problem." },
          { word: "have a cold", type: "Bệnh tật", phonetic: "/hæv ə koʊld/", vi: "Bị cảm lạnh (Tương tự: have a headache / a toothache).", example: "I've got a cold and a headache." },
          { word: "have to", type: "Bắt buộc", phonetic: "/hæv tuː/", vi: "Phải làm gì đó (do tình huống ép buộc = must).", example: "You have to pay $10 to go in. All students have to do the exam." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo cụm từ đi với Have)
    dragDrop: {
      buckets: ["Meals & Drinks", "Events & Study", "Washing & Sport", "Health & Problems", "Expressions"],
      items: [
        { id: "i1", word: "lunch", target: "Meals & Drinks", vi: "bữa trưa" },
        { id: "i2", word: "dinner", target: "Meals & Drinks", vi: "bữa tối" },
        { id: "i3", word: "breakfast", target: "Meals & Drinks", vi: "bữa sáng" },
        { id: "i4", word: "a meal", target: "Meals & Drinks", vi: "một bữa ăn" },
        { id: "i5", word: "a sandwich", target: "Meals & Drinks", vi: "bánh mì kẹp" },
        { id: "i6", word: "an ice-cream", target: "Meals & Drinks", vi: "một cây kem" },
        { id: "i7", word: "a cup of tea", target: "Meals & Drinks", vi: "một tách trà" },
        { id: "i8", word: "a party", target: "Events & Study", vi: "bữa tiệc" },
        { id: "i9", word: "a meeting", target: "Events & Study", vi: "cuộc họp" },
        { id: "i10", word: "a competition", target: "Events & Study", vi: "cuộc thi" },
        { id: "i11", word: "a game", target: "Events & Study", vi: "trò chơi/trận đấu" },
        { id: "i12", word: "a lesson", target: "Events & Study", vi: "tiết học" },
        { id: "i13", word: "an exam", target: "Events & Study", vi: "bài kiểm tra" },
        { id: "i14", word: "homework", target: "Events & Study", vi: "bài tập về nhà" },
        { id: "i15", word: "a shower", target: "Washing & Sport", vi: "tắm vòi sen" },
        { id: "i16", word: "a bath", target: "Washing & Sport", vi: "tắm bồn" },
        { id: "i17", word: "a swim", target: "Washing & Sport", vi: "đi bơi" },
        { id: "i18", word: "a sauna", target: "Washing & Sport", vi: "tắm hơi" },
        { id: "i19", word: "an appointment", target: "Health & Problems", vi: "cuộc hẹn (nha sĩ/bác sĩ)" },
        { id: "i20", word: "a problem", target: "Health & Problems", vi: "một vấn đề" },
        { id: "i21", word: "a cold", target: "Health & Problems", vi: "cảm lạnh" },
        { id: "i22", word: "a headache", target: "Health & Problems", vi: "đau đầu" },
        { id: "i23", word: "a look", target: "Expressions", vi: "nhìn thử" },
        { id: "i24", word: "a go", target: "Expressions", vi: "thử làm/đi thử" },
        { id: "i25", word: "a good journey", target: "Expressions", vi: "chuyến đi vui vẻ" },
        { id: "i26", word: "a moment", target: "Expressions", vi: "một lát (thời gian)" },
        { id: "i27", word: "a word", target: "Expressions", vi: "nói chuyện riêng" },
        { id: "i28", word: "a good time", target: "Expressions", vi: "thời gian vui vẻ" },
        { id: "i29", word: "my hair cut", target: "Expressions", vi: "cắt tóc" },
        { id: "i30", word: "the time", target: "Expressions", vi: "thời gian rảnh" }
      ]
    },

    // 3. TRẮC NGHIỆM (20 Câu - Ôn luyện toàn bộ cách dùng Have)
    quiz: [
      { q: "1. I always _____ breakfast at 7 am.", options: ["make", "do", "have", "eat"], a: "have" },
      { q: "2. Do you want to have a _____ of tennis?", options: ["game", "play", "competition", "party"], a: "game" },
      { q: "3. Jane's _____ a party on Saturday. Are you going?", options: ["doing", "making", "having", "going"], a: "having" },
      { q: "4. Do you want to have a _____? The bathroom is just here.", options: ["swim", "shower", "sauna", "meal"], a: "shower" },
      { q: "5. I have an _____ with the dentist at 3 o'clock.", options: ["exam", "lesson", "meeting", "appointment"], a: "appointment" },
      { q: "6. I'm going to the cafeteria to have a _____.", options: ["meal", "swim", "sauna", "shower"], a: "meal" },
      { q: "7. The hotel has a swimming pool, so we can have a _____.", options: ["bath", "swim", "moment", "look"], a: "swim" },
      { q: "8. We can have something to _____ before the film starts.", options: ["eat", "drink", "look", "time"], a: "eat" },
      { q: "9. I have an _____ tomorrow, so I have to study tonight.", options: ["exam", "appointment", "meeting", "party"], a: "exam" },
      { q: "10. (Someone is going away) Bye! Have a good _____!", options: ["time", "journey", "look", "go"], a: "journey" },
      { q: "11. (Someone sneezes) Oh! Have you got a _____?", options: ["headache", "cold", "problem", "time"], a: "cold" },
      { q: "12. Is that new camera yours? Can I have a _____?", options: ["go", "look", "moment", "word"], a: "look" },
      { q: "13. I want to learn to ski but I don't have the _____.", options: ["time", "moment", "journey", "problem"], a: "time" },
      { q: "14. We always have a good _____ in our English lessons.", options: ["moment", "time", "journey", "word"], a: "time" },
      { q: "15. I've _____ three sisters.", options: ["have", "get", "got", "getting"], a: "got" },
      { q: "16. (In a shop) We haven't _____ any postcards at the moment.", options: ["get", "have", "got", "getting"], a: "got" },
      { q: "17. I've got a _____, I need an aspirin.", options: ["cold", "headache", "problem", "moment"], a: "headache" },
      { q: "18. The museum isn't free. You _____ to pay $10.", options: ["have", "got", "must", "need"], a: "have" },
      { q: "19. I haven't got a car, so I _____ walk to school every day.", options: ["have to", "have got", "got to", "having"], a: "have to" },
      { q: "20. Can I have a _____ with you? I need to speak to you.", options: ["moment", "look", "go", "word"], a: "word" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền khuyết luyện trí nhớ)
    typingGame: [
      { q: "To eat in the morning: have ______", hint: "b _ _ _ _ _ _ _ t", a: "breakfast" },
      { q: "To eat at noon: have ______", hint: "l _ _ _ h", a: "lunch" },
      { q: "To eat in the evening: have ______", hint: "d _ _ _ _ r", a: "dinner" },
      { q: "To clean your body standing up: have a ______", hint: "s _ _ _ _ r", a: "shower" },
      { q: "To clean your body sitting in water: have a ______", hint: "b _ _ h", a: "bath" },
      { q: "To celebrate with friends: have a ______", hint: "p _ _ _ y", a: "party" },
      { q: "To meet with colleagues at work: have a ______", hint: "m _ _ _ _ _ g", a: "meeting" },
      { q: "To play a sport: have a ______", hint: "g _ _ e", a: "game" },
      { q: "To see a doctor or dentist: have an ______", hint: "a _ _ _ _ _ _ _ _ _ t", a: "appointment" },
      { q: "To look at something: have a ______", hint: "l _ _ k", a: "look" },
      { q: "To try riding a bike or playing a game: have a ______", hint: "g _", a: "go" },
      { q: "To travel well: have a good ______", hint: "j _ _ _ _ _ y", a: "journey" },
      { q: "To speak to someone briefly: have a ______", hint: "w _ _ d", a: "word" },
      { q: "To enjoy yourself: have a good ______", hint: "t _ _ e", a: "time" },
      { q: "To get your hair short at the hairdresser's: have my hair ______", hint: "c _ t", a: "cut" },
      { q: "To possess/own (informal): have ______", hint: "g _ t", a: "got" },
      { q: "When your head hurts: have a ______", hint: "h _ _ _ _ _ _ e", a: "headache" },
      { q: "When you sneeze and cough: have a ______", hint: "c _ _ d", a: "cold" },
      { q: "When you must do something: ______ to", hint: "h _ _ e", a: "have" },
      { q: "A test at school or university: have an ______", hint: "e _ _ m", a: "exam" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "I always have a good time in our English lessons.", trans: "Tôi luôn có khoảng thời gian vui vẻ trong các giờ học tiếng Anh của chúng tôi." },
      { text: "Can I have a word with you? I've got a problem.", trans: "Tôi có thể nói chuyện riêng với bạn một lát không? Tôi có một vấn đề." },
      { text: "You have to pay ten dollars to go into the museum.", trans: "Bạn phải trả 10 đô la để đi vào bảo tàng." },
      { text: "I haven't got a car, so I have to walk to school every day.", trans: "Tôi không có ô tô, vì vậy tôi phải đi bộ đến trường mỗi ngày." },
      { text: "I'm going to have my hair cut this afternoon.", trans: "Tôi dự định sẽ đi cắt tóc vào chiều nay." }
    ]
  },
  {
    id: 4,
    title: "Unit 4: Go / went / gone",
    description: "Học cách diễn đạt sự di chuyển (go to/by), các giới từ đi kèm với 'go', các hoạt động giải trí (go + -ing), và cách nói về kế hoạch tương lai (be going to).",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Go (Ý nghĩa và cách dùng cơ bản)",
        items: [
          { word: "go", type: "Động từ", phonetic: "/ɡoʊ/", vi: "Di chuyển từ nơi này sang nơi khác.", example: "Where does this road go? (Con đường này dẫn đi đâu?)" },
          { word: "go by", type: "Cụm từ", phonetic: "/ɡoʊ baɪ/", vi: "Đi bằng phương tiện gì (car, bike, train...).", example: "I go to work by bike. My brother goes by car." },
          { word: "go on foot", type: "Cụm từ", phonetic: "/ɡoʊ ɑːn fʊt/", vi: "Đi bộ.", example: "You can go to a place on foot or in some kind of transport." },
          { word: "walk", type: "Động từ", phonetic: "/wɑːk/", vi: "Đi bộ (Thay vì nói 'go on foot', ta có thể dùng 'walk').", example: "We're walking to work this morning." },
          { word: "went", type: "Quá khứ", phonetic: "/went/", vi: "Đã đi (Quá khứ của 'go').", example: "We went to Paris last summer." }
        ]
      },
      {
        heading: "B. Go + prepositions (Go đi kèm giới từ)",
        items: [
          { word: "go in(to)", type: "Cụm động từ", phonetic: "/ɡoʊ ˈɪn.tuː/", vi: "Đi vào trong.", example: "Kim went into his room and shut the door." },
          { word: "go up", type: "Cụm động từ", phonetic: "/ɡoʊ ʌp/", vi: "Đi lên.", example: "Rani was tired. He went up the stairs slowly." },
          { word: "go down", type: "Cụm động từ", phonetic: "/ɡoʊ daʊn/", vi: "Đi xuống.", example: "The phone was ringing. She went down the stairs quickly." },
          { word: "go out of", type: "Cụm động từ", phonetic: "/ɡoʊ aʊt əv/", vi: "Đi ra khỏi.", example: "Yuko went out of the house and into the garden." },
          { word: "go away", type: "Cụm động từ", phonetic: "/ɡoʊ əˈweɪ/", vi: "Đi đi, rời đi nơi khác.", example: "Please go away. I'm tired." },
          { word: "go back", type: "Cụm động từ", phonetic: "/ɡoʊ bæk/", vi: "Quay trở lại, trở về.", example: "I'm going back home this evening." }
        ]
      },
      {
        heading: "C & D. Go + -ing & Future plans (Hoạt động và Kế hoạch)",
        items: [
          { word: "go shopping", type: "Hoạt động", phonetic: "/ɡoʊ ˈʃɑː.pɪŋ/", vi: "Đi mua sắm.", example: "I hate going shopping." },
          { word: "go swimming", type: "Hoạt động", phonetic: "/ɡoʊ ˈswɪm.ɪŋ/", vi: "Đi bơi.", example: "I usually go swimming in the morning." },
          { word: "go dancing", type: "Hoạt động", phonetic: "/ɡoʊ ˈdæn.sɪŋ/", vi: "Đi khiêu vũ / đi nhảy.", example: "Let's go dancing." },
          { word: "go sightseeing", type: "Hoạt động", phonetic: "/ɡoʊ ˈsaɪtˌsiː.ɪŋ/", vi: "Đi ngắm cảnh.", example: "Do you like going sightseeing when you are on holiday?" },
          { word: "go skiing", type: "Hoạt động", phonetic: "/ɡoʊ ˈskiː.ɪŋ/", vi: "Đi trượt tuyết.", example: "Hans goes skiing every winter." },
          { word: "go fishing", type: "Hoạt động", phonetic: "/ɡoʊ ˈfɪʃ.ɪŋ/", vi: "Đi câu cá.", example: "Bob is going fishing today." },
          { word: "be going to", type: "Ngữ pháp", phonetic: "/biː ˈɡoʊ.ɪŋ tuː/", vi: "Dự định làm gì (Dùng cho kế hoạch trong tương lai).", example: "On Saturday Jan is going to visit his aunt." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo cấu trúc đi với Go)
    dragDrop: {
      buckets: ["Places (Go to...)", "Transport (Go by...)", "Prepositions", "Activities (Go...)", "Future Plans"],
      items: [
        { id: "i1", word: "work", target: "Places (Go to...)", vi: "nơi làm việc" },
        { id: "i2", word: "Paris", target: "Places (Go to...)", vi: "thành phố Paris" },
        { id: "i3", word: "the swimming pool", target: "Places (Go to...)", vi: "hồ bơi" },
        { id: "i4", word: "Granada", target: "Places (Go to...)", vi: "thành phố Granada" },
        { id: "i5", word: "the restaurant", target: "Places (Go to...)", vi: "nhà hàng" },
        { id: "i6", word: "home", target: "Places (Go to...)", vi: "nhà (lưu ý: go home, không có 'to')" },
        { id: "i7", word: "bike", target: "Transport (Go by...)", vi: "xe đạp" },
        { id: "i8", word: "car", target: "Transport (Go by...)", vi: "ô tô" },
        { id: "i9", word: "train", target: "Transport (Go by...)", vi: "tàu hỏa" },
        { id: "i10", word: "foot (on)", target: "Transport (Go by...)", vi: "đi bộ" },
        { id: "i11", word: "into", target: "Prepositions", vi: "vào trong" },
        { id: "i12", word: "up", target: "Prepositions", vi: "lên trên" },
        { id: "i13", word: "down", target: "Prepositions", vi: "xuống dưới" },
        { id: "i14", word: "away", target: "Prepositions", vi: "đi xa" },
        { id: "i15", word: "back", target: "Prepositions", vi: "quay lại" },
        { id: "i16", word: "out of", target: "Prepositions", vi: "ra khỏi" },
        { id: "i17", word: "shopping", target: "Activities (Go...)", vi: "mua sắm" },
        { id: "i18", word: "swimming", target: "Activities (Go...)", vi: "bơi lội" },
        { id: "i19", word: "dancing", target: "Activities (Go...)", vi: "khiêu vũ" },
        { id: "i20", word: "sightseeing", target: "Activities (Go...)", vi: "ngắm cảnh" },
        { id: "i21", word: "skiing", target: "Activities (Go...)", vi: "trượt tuyết" },
        { id: "i22", word: "fishing", target: "Activities (Go...)", vi: "câu cá" },
        { id: "i23", word: "on Saturday", target: "Future Plans", vi: "vào thứ Bảy" },
        { id: "i24", word: "on Sunday", target: "Future Plans", vi: "vào Chủ nhật" },
        { id: "i25", word: "on Monday", target: "Future Plans", vi: "vào thứ Hai" },
        { id: "i26", word: "tomorrow", target: "Future Plans", vi: "ngày mai" },
        { id: "i27", word: "next week", target: "Future Plans", vi: "tuần tới" },
        { id: "i28", word: "to visit his aunt", target: "Future Plans", vi: "thăm dì" },
        { id: "i29", word: "to stay at home", target: "Future Plans", vi: "ở nhà" },
        { id: "i30", word: "to meet Sam", target: "Future Plans", vi: "gặp Sam" }
      ]
    },

    // 3. TRẮC NGHIỆM (20 Câu - Dựa trên Exercise 4.1 đến 4.5)
    quiz: [
      { q: "1. I go to work _____ bike.", options: ["in", "on", "by", "with"], a: "by" },
      { q: "2. My brother goes _____ car.", options: ["by", "in", "on", "with"], a: "by" },
      { q: "3. If you don't use transport, you go _____ foot.", options: ["by", "in", "with", "on"], a: "on" },
      { q: "4. Kim went _____ his room and shut the door.", options: ["out of", "away", "into", "up"], a: "into" },
      { q: "5. Rani was tired. He went _____ the stairs slowly.", options: ["down", "up", "away", "back"], a: "up" },
      { q: "6. I'm going _____ home this evening.", options: ["back", "away", "up", "into"], a: "back" },
      { q: "7. Yuko went _____ the house and into the garden.", options: ["in", "out of", "away", "up"], a: "out of" },
      { q: "8. The phone was ringing. She went _____ the stairs quickly.", options: ["down", "into", "away", "out of"], a: "down" },
      { q: "9. What is the correct phrase?", options: ["go to shopping", "go shop", "go shopping", "go to shop"], a: "go shopping" },
      { q: "10. I usually go _____ in the morning.", options: ["swimming", "to swim", "swim", "to swimming"], a: "swimming" },
      { q: "11. Do you like going _____ when you are on holiday?", options: ["sightsee", "to sightsee", "sightseeing", "to sightseeing"], a: "sightseeing" },
      { q: "12. Hans goes _____ every winter.", options: ["to ski", "skiing", "ski", "to skiing"], a: "skiing" },
      { q: "13. On Saturday Jan _____ to visit his aunt.", options: ["going", "goes", "is going", "went"], a: "is going" },
      { q: "14. We _____ to Paris last summer.", options: ["go", "gone", "went", "going"], a: "went" },
      { q: "15. What is the mistake? 'Please, go in I'm tired.'", options: ["go out", "go up", "go away", "go back"], a: "go away" },
      { q: "16. What is the mistake? 'We're going sightsee today.'", options: ["going sightseeing", "go sightseeing", "going to sightsee", "went sightsee"], a: "going sightseeing" },
      { q: "17. What is the mistake? 'Jo went down to the top of the hill.'", options: ["went up", "went away", "went back", "went into"], a: "went up" },
      { q: "18. What is the mistake? 'Let's go to fish today.'", options: ["go to fishing", "go fish", "go fishing", "going fishing"], a: "go fishing" },
      { q: "19. What is the mistake? 'She went out off the shop.'", options: ["out of", "away off", "out from", "out to"], a: "out of" },
      { q: "20. To make it clear we are going on foot, we can say: We're _____ to work.", options: ["running", "walking", "driving", "riding"], a: "walking" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Ôn tập chính tả và phản xạ)
    typingGame: [
      { q: "I travel to work _____ bike.", hint: "b _", a: "by" },
      { q: "I travel to work _____ foot.", hint: "o _", a: "on" },
      { q: "Instead of 'go on foot', you can say: I _____ to work.", hint: "w _ _ k", a: "walk" },
      { q: "Last summer we _____ to Paris.", hint: "w _ _ t", a: "went" },
      { q: "Where does this road _____?", hint: "g _", a: "go" },
      { q: "He went _____ his room and shut the door.", hint: "i _ _ o", a: "into" },
      { q: "He was tired. He went _____ the stairs slowly.", hint: "u _", a: "up" },
      { q: "She went _____ the stairs quickly to answer the phone.", hint: "d _ _ n", a: "down" },
      { q: "I am going _____ home this evening.", hint: "b _ _ k", a: "back" },
      { q: "She went _____ of the house and into the garden.", hint: "o _ t", a: "out" },
      { q: "Please go _____. I'm very tired.", hint: "a _ _ y", a: "away" },
      { q: "I hate going ______ (buying things).", hint: "s _ _ _ _ _ _ g", a: "shopping" },
      { q: "I usually go ______ in the morning (in the pool).", hint: "s _ _ _ _ _ _ g", a: "swimming" },
      { q: "Let's go ______ (moving to music).", hint: "d _ _ _ _ _ g", a: "dancing" },
      { q: "Tourists love going ______ (looking at famous places).", hint: "s _ _ _ _ _ _ _ _ _ g", a: "sightseeing" },
      { q: "Hans goes ______ every winter in the snow.", hint: "s _ _ _ _ g", a: "skiing" },
      { q: "Bob is going ______ today (catching fish).", hint: "f _ _ _ _ _ g", a: "fishing" },
      { q: "On Sunday we are ______ to stay at home (future plan).", hint: "g _ _ _ g", a: "going" },
      { q: "Is this train going ______ Granada?", hint: "t _", a: "to" },
      { q: "Let's ______ dancing tonight!", hint: "g _", a: "go" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "I go to work by bike. My brother goes by car.", trans: "Tôi đi làm bằng xe đạp. Anh trai tôi đi bằng ô tô." },
      { text: "Rani was tired. He went up the stairs slowly.", trans: "Rani đã mệt. Anh ấy đi lên cầu thang một cách chậm chạp." },
      { text: "Yuko went out of the house and into the garden.", trans: "Yuko đã đi ra khỏi nhà và đi vào trong khu vườn." },
      { text: "Do you like going sightseeing when you are on holiday?", trans: "Bạn có thích đi ngắm cảnh khi bạn đi nghỉ mát không?" },
      { text: "On Saturday Jan is going to visit his aunt.", trans: "Vào thứ Bảy, Jan dự định sẽ đi thăm dì của anh ấy." }
    ]
  },
  {
    id: 5,
    title: "Unit 5: Do / did / done",
    description: "Nắm vững cách sử dụng 'do' như một trợ động từ, dùng 'do' để hỏi nghề nghiệp và học thuộc các công việc luôn đi kèm với động từ 'do' (Do + task).",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Do as auxiliary (Do làm trợ động từ)",
        items: [
          { word: "do / does", type: "Hiện tại", phonetic: "/duː/ /dʌz/", vi: "Trợ động từ dùng cho câu hỏi ở hiện tại.", example: "Do you like tennis? Yes, I do. / So does Sinjit." },
          { word: "did", type: "Quá khứ", phonetic: "/dɪd/", vi: "Trợ động từ dùng cho câu hỏi ở quá khứ.", example: "Did they like the film? Yes, they did. / So did I." },
          { word: "don't / doesn't", type: "Phủ định HT", phonetic: "/doʊnt/ /ˈdʌz.ənt/", vi: "Dùng trong câu phủ định ở hiện tại.", example: "He doesn't play well. / Don't do that, Tommy." },
          { word: "didn't", type: "Phủ định QK", phonetic: "/ˈdɪd.ənt/", vi: "Dùng trong câu phủ định ở quá khứ.", example: "Jo didn't see it." }
        ]
      },
      {
        heading: "B & C. Do as a general verb & Asking for jobs (Hành động chung & Hỏi nghề nghiệp)",
        items: [
          { word: "What are you doing?", type: "Câu hỏi", phonetic: "/wɑːt ɑːr juː ˈduː.ɪŋ/", vi: "Bạn đang làm gì vậy?", example: "What are the people in the picture doing? They're dancing." },
          { word: "What do you do to relax?", type: "Câu hỏi", phonetic: "/wɑːt duː juː duː tuː rɪˈlæks/", vi: "Bạn làm gì để thư giãn?", example: "I listen to music." },
          { word: "What do you do?", type: "Hỏi nghề", phonetic: "/wɑːt duː juː duː/", vi: "Bạn làm nghề gì? (= What is your job?)", example: "I'm a student. / I'm an engineer." },
          { word: "What does your wife do?", type: "Hỏi nghề", phonetic: "/wɑːt dʌz jɔːr waɪf duː/", vi: "Vợ bạn làm nghề gì? (= What's your wife's job?)", example: "She's a doctor. / She's a secretary. / She's a mechanic." }
        ]
      },
      {
        heading: "D. Do + task (Do kết hợp với các công việc)",
        items: [
          { word: "do the housework", type: "Cụm từ", phonetic: "/duː ðə ˈhaʊs.wɝːk/", vi: "Làm việc nhà.", example: "I do a lot of housework every day." },
          { word: "do the gardening", type: "Cụm từ", phonetic: "/duː ðə ˈɡɑːr.dən.ɪŋ/", vi: "Làm vườn.", example: "I never do the gardening." },
          { word: "do the washing", type: "Cụm từ", phonetic: "/duː ðə ˈwɑː.ʃɪŋ/", vi: "Giặt giũ quần áo.", example: "Did you do the washing this morning? No, I'll do it later." },
          { word: "do the washing-up", type: "Cụm từ", phonetic: "/duː ðə ˌwɑː.ʃɪŋˈʌp/", vi: "Rửa chén bát.", example: "I usually do the washing-up after dinner." },
          { word: "do your homework", type: "Cụm từ", phonetic: "/duː jɔːr ˈhoʊm.wɝːk/", vi: "Làm bài tập về nhà.", example: "You must do your homework." },
          { word: "do some exercises", type: "Cụm từ", phonetic: "/duː sʌm ˈek.sɚ.saɪ.zɪz/", vi: "Làm bài tập / Tập thể dục.", example: "I have to do some exercises." },
          { word: "do business with", type: "Cụm từ", phonetic: "/duː ˈbɪz.nɪs wɪð/", vi: "Làm ăn, kinh doanh với ai.", example: "Our company does a lot of business with the USA." },
          { word: "do your best", type: "Cụm từ", phonetic: "/duː jɔːr best/", vi: "Cố gắng hết sức.", example: "The exam is very difficult - just do your best." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo cấu trúc của Unit 5)
    dragDrop: {
      buckets: ["Auxiliary Verbs", "Jobs (I'm a...)", "Tasks (Do...)", "General Actions", "Pronouns"],
      items: [
        { id: "i1", word: "do", target: "Auxiliary Verbs", vi: "làm/trợ động từ" },
        { id: "i2", word: "does", target: "Auxiliary Verbs", vi: "trợ động từ số ít" },
        { id: "i3", word: "did", target: "Auxiliary Verbs", vi: "trợ động từ quá khứ" },
        { id: "i4", word: "don't", target: "Auxiliary Verbs", vi: "không (hiện tại)" },
        { id: "i5", word: "doesn't", target: "Auxiliary Verbs", vi: "không (số ít)" },
        { id: "i6", word: "didn't", target: "Auxiliary Verbs", vi: "không (quá khứ)" },
        { id: "i7", word: "student", target: "Jobs (I'm a...)", vi: "học sinh" },
        { id: "i8", word: "teacher", target: "Jobs (I'm a...)", vi: "giáo viên" },
        { id: "i9", word: "engineer", target: "Jobs (I'm a...)", vi: "kỹ sư" },
        { id: "i10", word: "doctor", target: "Jobs (I'm a...)", vi: "bác sĩ" },
        { id: "i11", word: "secretary", target: "Jobs (I'm a...)", vi: "thư ký" },
        { id: "i12", word: "mechanic", target: "Jobs (I'm a...)", vi: "thợ máy" },
        { id: "i13", word: "the housework", target: "Tasks (Do...)", vi: "việc nhà" },
        { id: "i14", word: "the gardening", target: "Tasks (Do...)", vi: "công việc làm vườn" },
        { id: "i15", word: "the washing", target: "Tasks (Do...)", vi: "việc giặt giũ" },
        { id: "i16", word: "the washing-up", target: "Tasks (Do...)", vi: "việc rửa bát" },
        { id: "i17", word: "your homework", target: "Tasks (Do...)", vi: "bài tập về nhà" },
        { id: "i18", word: "some exercises", target: "Tasks (Do...)", vi: "bài tập / thể dục" },
        { id: "i19", word: "business with", target: "Tasks (Do...)", vi: "làm ăn với" },
        { id: "i20", word: "your best", target: "Tasks (Do...)", vi: "cố gắng hết sức" },
        { id: "i21", word: "dancing", target: "General Actions", vi: "đang nhảy múa" },
        { id: "i22", word: "eating", target: "General Actions", vi: "đang ăn" },
        { id: "i23", word: "sleeping", target: "General Actions", vi: "đang ngủ" },
        { id: "i24", word: "playing", target: "General Actions", vi: "đang chơi" },
        { id: "i25", word: "listening", target: "General Actions", vi: "đang nghe" },
        { id: "i26", word: "I", target: "Pronouns", vi: "tôi" },
        { id: "i27", word: "you", target: "Pronouns", vi: "bạn" },
        { id: "i28", word: "we", target: "Pronouns", vi: "chúng tôi" },
        { id: "i29", word: "they", target: "Pronouns", vi: "họ" },
        { id: "i30", word: "he/she", target: "Pronouns", vi: "anh ấy / cô ấy" }
      ]
    },

    // 3. TRẮC NGHIỆM (20 Câu - Kiểm tra lỗi sai kinh điển về Do/Did theo Exercise 5.5)
    quiz: [
      { q: "1. _____ you like tennis? Yes, I _____.", options: ["Does / do", "Do / do", "Did / does", "Are / am"], a: "Do / do" },
      { q: "2. _____ they like the film yesterday? Yes, they _____.", options: ["Do / do", "Are / are", "Did / did", "Does / does"], a: "Did / did" },
      { q: "3. He _____ play well. He always loses.", options: ["don't", "doesn't", "isn't", "didn't"], a: "doesn't" },
      { q: "4. Jo _____ see the film last night.", options: ["don't", "doesn't", "didn't", "wasn't"], a: "didn't" },
      { q: "5. _____ do that, Tommy!", options: ["Doesn't", "Not", "No", "Don't"], a: "Don't" },
      { q: "6. A: What _____ you do? B: I'm a student.", options: ["are", "do", "does", "did"], a: "do" },
      { q: "7. A: What _____ your wife do? B: She's a doctor.", options: ["do", "is", "does", "are"], a: "does" },
      { q: "8. What do you do to relax? I _____ to music.", options: ["listen", "am listening", "listened", "listens"], a: "listen" },
      { q: "9. Did you _____ the washing this morning?", options: ["make", "do", "have", "take"], a: "do" },
      { q: "10. Our company _____ a lot of business with the USA.", options: ["makes", "does", "has", "takes"], a: "does" },
      { q: "11. The homework exercise is very difficult - just _____ your best.", options: ["make", "have", "do", "try"], a: "do" },
      { q: "12. I do a lot of housework but I never _____ the gardening.", options: ["make", "do", "work", "play"], a: "do" },
      { q: "13. What is the correct question?", options: ["Where did you went?", "Where did you go?", "Where do you went?", "Where are you go?"], a: "Where did you go?" },
      { q: "14. What is the correct negative sentence?", options: ["We didn't went.", "We wasn't go.", "We didn't go.", "We don't went."], a: "We didn't go." },
      { q: "15. _____ your grandmother live in Scotland?", options: ["Do", "Is", "Does", "Did"], a: "Does" },
      { q: "16. No, she _____, but my uncle _____.", options: ["doesn't / does", "don't / do", "didn't / did", "isn't / is"], a: "doesn't / does" },
      { q: "17. What _____ the people in the picture doing?", options: ["do", "does", "is", "are"], a: "are" },
      { q: "18. I am going to _____ the washing-up after dinner.", options: ["make", "do", "clean", "wash"], a: "do" },
      { q: "19. I'm an _____. I design machines.", options: ["mechanic", "doctor", "engineer", "secretary"], a: "engineer" },
      { q: "20. She works in a garage. She's a _____.", options: ["secretary", "mechanic", "teacher", "student"], a: "mechanic" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Ôn tập chính tả và chia động từ)
    typingGame: [
      { q: "Auxiliary: _____ you like tennis? Yes, I do.", hint: "D _", a: "Do" },
      { q: "Auxiliary: _____ they like the film yesterday?", hint: "D _ d", a: "Did" },
      { q: "Negative: He _____ play well.", hint: "d _ _ _ _ ' t", a: "doesn't" },
      { q: "Negative past: Jo _____ see it last night.", hint: "d _ _ n ' t", a: "didn't" },
      { q: "Command: _____ do that, Tommy!", hint: "D _ n ' t", a: "Don't" },
      { q: "Asking jobs: What _____ you do? - I'm a student.", hint: "d _", a: "do" },
      { q: "Asking jobs: What _____ your wife do? - She's a doctor.", hint: "d _ _ s", a: "does" },
      { q: "Task: I do a lot of ______ (cleaning the house).", hint: "h _ _ _ _ w _ _ k", a: "housework" },
      { q: "Task: I never do the ______ (working with plants and flowers).", hint: "g _ _ _ _ n _ _ g", a: "gardening" },
      { q: "Task: Did you do the ______ (cleaning clothes) this morning?", hint: "w _ _ _ _ n g", a: "washing" },
      { q: "Task: Who is going to do the ______ (cleaning plates)?", hint: "w _ _ _ _ n g - u p", a: "washing-up" },
      { q: "Task: You must do your ______ (school work at home).", hint: "h _ _ _ w _ _ k", a: "homework" },
      { q: "Task: Our company does a lot of ______ with the USA.", hint: "b _ _ _ n _ _ s", a: "business" },
      { q: "Task: The exam is hard - just do your ______.", hint: "b _ _ t", a: "best" },
      { q: "Job: I teach students. I am a ______.", hint: "t _ _ _ _ _ r", a: "teacher" },
      { q: "Job: I fix cars. I am a ______.", hint: "m _ _ _ _ n _ c", a: "mechanic" },
      { q: "Job: I work in a hospital. I am a ______.", hint: "d _ _ _ _ r", a: "doctor" },
      { q: "Grammar fix: Where did you ______ (not went) on your holidays?", hint: "g _", a: "go" },
      { q: "Grammar fix: We ______ (not don't go) to London last year. We went to Scotland.", hint: "d _ _ n ' t  g _", a: "didn't go" },
      { q: "Grammar fix: _____ your grandmother live in Scotland? (Not Do).", hint: "D _ _ s", a: "Does" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "What do you do? I'm an engineer.", trans: "Bạn làm nghề gì? Tôi là một kỹ sư." },
      { text: "What does your wife do? She's a doctor.", trans: "Vợ của bạn làm nghề gì? Cô ấy là một bác sĩ." },
      { text: "Our company does a lot of business with the USA.", trans: "Công ty của chúng tôi làm ăn rất nhiều với Hoa Kỳ." },
      { text: "The homework exercise is very difficult, just do your best.", trans: "Bài tập về nhà rất khó, hãy cứ cố gắng hết sức mình." },
      { text: "Did you do the washing this morning? No, I'm going to do it later.", trans: "Sáng nay bạn đã giặt quần áo chưa? Chưa, tôi sẽ làm nó sau." }
    ]
  },
  {
    id: 6,
    title: "Unit 6: Make / made / made",
    description: "Học cách dùng động từ 'make' để tạo ra đồ ăn thức uống, tạo ra sự việc, cách dùng 'make somebody feel' và đặc biệt là phân biệt 'make' với 'do' hoặc 'take'.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Make... (Tạo ra đồ ăn, thức uống, bữa ăn)",
        items: [
          { word: "make coffee", type: "Đồ uống", phonetic: "/meɪk ˈkɑː.fi/", vi: "Pha cà phê.", example: "I'll make some coffee." },
          { word: "make tea", type: "Đồ uống", phonetic: "/meɪk tiː/", vi: "Pha trà.", example: "I'll make some tea." },
          { word: "make hot chocolate", type: "Đồ uống", phonetic: "/meɪk hɑːt ˈtʃɑːk.lət/", vi: "Pha sô-cô-la nóng.", example: "I'll make some hot chocolate." },
          { word: "make breakfast", type: "Bữa ăn", phonetic: "/meɪk ˈbrek.fəst/", vi: "Làm bữa sáng.", example: "I make breakfast every day." },
          { word: "make lunch", type: "Bữa ăn", phonetic: "/meɪk lʌntʃ/", vi: "Làm bữa trưa.", example: "I make lunch for my family." },
          { word: "make dinner", type: "Bữa ăn", phonetic: "/meɪk ˈdɪn.ɚ/", vi: "Làm bữa tối.", example: "I'm going to make dinner." },
          { word: "make supper", type: "Bữa ăn", phonetic: "/meɪk ˈsʌp.ɚ/", vi: "Làm bữa ăn nhẹ (ngay trước khi đi ngủ).", example: "I make supper every day." }
        ]
      },
      {
        heading: "B. Make a ... (Tạo ra một thứ gì đó/Sự việc)",
        items: [
          { word: "make a photocopy", type: "Cụm từ", phonetic: "/meɪk ə ˈfoʊ.t̬oʊˌkɑː.pi/", vi: "Bấm máy photocopy.", example: "The teacher's making a photocopy." },
          { word: "make a film", type: "Cụm từ", phonetic: "/meɪk ə fɪlm/", vi: "Làm phim / Quay phim.", example: "He's making a film of the class." },
          { word: "make a video", type: "Cụm từ", phonetic: "/meɪk ə ˈvɪd.i.oʊ/", vi: "Quay video.", example: "He's making a video." },
          { word: "make a noise", type: "Cụm từ", phonetic: "/meɪk ə nɔɪz/", vi: "Làm ồn.", example: "The children are making a noise." }
        ]
      },
      {
        heading: "C. Don't make mistakes with make! (Những lỗi sai kinh điển cần tránh)",
        items: [
          { word: "make a mistake", type: "ĐÚNG", phonetic: "/meɪk ə mɪˈsteɪk/", vi: "Phạm sai lầm (KHÔNG dùng 'do a mistake').", example: "I made a mistake in the exercise." },
          { word: "do homework", type: "ĐÚNG", phonetic: "/duː ˈhoʊm.wɝːk/", vi: "Làm bài tập (KHÔNG dùng 'make my homework').", example: "I have to do my homework." },
          { word: "take / do an exam", type: "ĐÚNG", phonetic: "/teɪk ən ɪɡˈzæm/", vi: "Làm bài kiểm tra (KHÔNG dùng 'make an exam').", example: "I have to take/do an exam next week." },
          { word: "make my bed", type: "ĐÚNG", phonetic: "/meɪk maɪ bed/", vi: "Dọn dẹp giường ngủ.", example: "When I get up I make my bed." },
          { word: "make an appointment", type: "ĐÚNG", phonetic: "/meɪk ən əˈpɔɪnt.mənt/", vi: "Đặt lịch hẹn (= fix a time to see someone) (KHÔNG dùng 'take an appointment').", example: "I want to make an appointment with the doctor." },
          { word: "take a photo", type: "ĐÚNG", phonetic: "/teɪk ə ˈfoʊ.t̬oʊ/", vi: "Chụp ảnh (KHÔNG dùng 'make a photo').", example: "I'd like to take a photo of you." },
          { word: "do the dishes", type: "ĐÚNG", phonetic: "/duː ðə ˈdɪʃ.ɪz/", vi: "Rửa bát (KHÔNG dùng 'make the dishes').", example: "After dinner I'll help you do the dishes." },
          { word: "make a decision", type: "ĐÚNG", phonetic: "/meɪk ə dɪˈsɪʒ.ən/", vi: "Đưa ra quyết định (KHÔNG dùng 'do a decision').", example: "We must make a decision today." }
        ]
      },
      {
        heading: "D. It makes me (feel) ... (Làm ai đó cảm thấy thế nào)",
        items: [
          { word: "make me tired", type: "Cảm xúc", phonetic: "/meɪk miː ˈtaɪɚd/", vi: "Làm tôi cảm thấy mệt mỏi.", example: "Going by train always makes me (feel) tired." },
          { word: "make me angry", type: "Cảm xúc", phonetic: "/meɪk miː ˈæŋ.ɡri/", vi: "Làm tôi tức giận.", example: "My friend called me stupid. It made me (feel) angry." },
          { word: "make me sad", type: "Cảm xúc", phonetic: "/meɪk miː sæd/", vi: "Làm tôi buồn.", example: "That film made me (feel) sad." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại Make, Do, Take và Cảm xúc)
    dragDrop: {
      buckets: ["Make (Food/Drink)", "Make (Things/Events)", "Do (Not Make)", "Take (Not Make)", "Feelings (Makes me)"],
      items: [
        { id: "i1", word: "coffee", target: "Make (Food/Drink)", vi: "cà phê" },
        { id: "i2", word: "tea", target: "Make (Food/Drink)", vi: "trà" },
        { id: "i3", word: "hot chocolate", target: "Make (Food/Drink)", vi: "sô-cô-la nóng" },
        { id: "i4", word: "breakfast", target: "Make (Food/Drink)", vi: "bữa sáng" },
        { id: "i5", word: "lunch", target: "Make (Food/Drink)", vi: "bữa trưa" },
        { id: "i6", word: "dinner", target: "Make (Food/Drink)", vi: "bữa tối" },
        { id: "i7", word: "supper", target: "Make (Food/Drink)", vi: "bữa ăn khuya" },
        { id: "i8", word: "a photocopy", target: "Make (Things/Events)", vi: "bản photo" },
        { id: "i9", word: "a film", target: "Make (Things/Events)", vi: "bộ phim" },
        { id: "i10", word: "a video", target: "Make (Things/Events)", vi: "đoạn video" },
        { id: "i11", word: "a noise", target: "Make (Things/Events)", vi: "tiếng ồn" },
        { id: "i12", word: "a mistake", target: "Make (Things/Events)", vi: "lỗi sai" },
        { id: "i13", word: "my bed", target: "Make (Things/Events)", vi: "giường ngủ" },
        { id: "i14", word: "an appointment", target: "Make (Things/Events)", vi: "lịch hẹn" },
        { id: "i15", word: "a decision", target: "Make (Things/Events)", vi: "quyết định" },
        { id: "i16", word: "my homework", target: "Do (Not Make)", vi: "bài tập về nhà" },
        { id: "i17", word: "the dishes", target: "Do (Not Make)", vi: "rửa bát" },
        { id: "i18", word: "the washing", target: "Do (Not Make)", vi: "giặt giũ" },
        { id: "i19", word: "an exercise", target: "Do (Not Make)", vi: "bài tập" },
        { id: "i20", word: "business", target: "Do (Not Make)", vi: "việc kinh doanh" },
        { id: "i21", word: "a photo", target: "Take (Not Make)", vi: "bức ảnh" },
        { id: "i22", word: "an exam", target: "Take (Not Make)", vi: "bài kiểm tra (hoặc dùng 'do')" },
        { id: "i23", word: "a bus", target: "Take (Not Make)", vi: "xe buýt" },
        { id: "i24", word: "an umbrella", target: "Take (Not Make)", vi: "cái ô" },
        { id: "i25", word: "tired", target: "Feelings (Makes me)", vi: "mệt mỏi" },
        { id: "i26", word: "angry", target: "Feelings (Makes me)", vi: "tức giận" },
        { id: "i27", word: "sad", target: "Feelings (Makes me)", vi: "buồn bã" },
        { id: "i28", word: "happy", target: "Feelings (Makes me)", vi: "vui vẻ" },
        { id: "i29", word: "sick", target: "Feelings (Makes me)", vi: "ốm, buồn nôn" },
        { id: "i30", word: "feel", target: "Feelings (Makes me)", vi: "cảm thấy" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Tập trung bẫy lỗi Make / Do / Take theo Ex 6.1 đến 6.4)
    quiz: [
      { q: "1. I always _____ a lot of mistakes when I speak English.", options: ["do", "make", "take", "have"], a: "make" },
      { q: "2. If I _____ my homework every day, my English will get better.", options: ["make", "take", "do", "get"], a: "do" },
      { q: "3. Let's go to bed now. We can _____ the dishes in the morning.", options: ["make", "do", "clean", "have"], a: "do" },
      { q: "4. I want to _____ an exam in French.", options: ["make", "take", "have", "get"], a: "take" },
      { q: "5. We always try not to _____ a noise after ten o'clock at night.", options: ["make", "do", "take", "say"], a: "make" },
      { q: "6. That film made me _____ sad.", options: ["feel", "do", "make", "take"], a: "feel" },
      { q: "7. Long lessons always _____ me tired.", options: ["do", "take", "make", "have"], a: "make" },
      { q: "8. She was horrible to me; it _____ me angry.", options: ["did", "took", "made", "had"], a: "made" },
      { q: "9. What is the correct sentence?", options: ["I have to make my homework.", "I have to do my homework.", "I have to take my homework.", "I have to get my homework."], a: "I have to do my homework." },
      { q: "10. What is the correct sentence?", options: ["Can I make a photo of you?", "Can I do a photo of you?", "Can I take a photo of you?", "Can I have a photo to you?"], a: "Can I take a photo of you?" },
      { q: "11. He's 25 but he never _____ his own washing.", options: ["makes", "does", "takes", "has"], a: "does" },
      { q: "12. We must _____ a decision today.", options: ["do", "take", "make", "get"], a: "make" },
      { q: "13. I have to _____ an appointment with the doctor.", options: ["take", "do", "have", "make"], a: "make" },
      { q: "14. When I get up I _____ my bed.", options: ["do", "make", "take", "clean"], a: "make" },
      { q: "15. I'll _____ some hot chocolate for you.", options: ["do", "make", "take", "get"], a: "make" },
      { q: "16. The teacher is _____ a photocopy.", options: ["making", "doing", "taking", "having"], a: "making" },
      { q: "17. What is 'supper'?", options: ["A meal in the morning.", "A meal at noon.", "A meal just before bed.", "A drink."], a: "A meal just before bed." },
      { q: "18. Going by train always _____ me feel tired.", options: ["makes", "does", "takes", "gets"], a: "makes" },
      { q: "19. The children are _____ a noise.", options: ["doing", "making", "taking", "getting"], a: "making" },
      { q: "20. Which of these is WRONG?", options: ["make a film", "make dinner", "make a mistake", "make the dishes"], a: "make the dishes" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn luyện phản xạ không sai sót giữa Make và Do)
    typingGame: [
      { q: "To prepare a hot drink: ______ coffee.", hint: "m _ _ e", a: "make" },
      { q: "The meal just before going to bed is called ______.", hint: "s _ _ _ _ r", a: "supper" },
      { q: "The teacher is making a ______ (copying a paper).", hint: "p _ _ _ _ _ _ _ y", a: "photocopy" },
      { q: "The children are loud. They are making a ______.", hint: "n _ _ _ e", a: "noise" },
      { q: "To do something incorrectly is to make a ______.", hint: "m _ _ _ _ _ e", a: "mistake" },
      { q: "You don't 'make' your homework, you ______ it.", hint: "d _", a: "do" },
      { q: "You don't 'make' an exam, you ______ it.", hint: "t _ _ e", a: "take" },
      { q: "When I get up, I make my ______ (organize the blankets).", hint: "b _ d", a: "bed" },
      { q: "I want to make an ______ to see the dentist.", hint: "a _ _ _ _ _ _ _ _ _ t", a: "appointment" },
      { q: "I'd like to ______ a photo of you (not make).", hint: "t _ _ e", a: "take" },
      { q: "After dinner, I'll help you ______ the dishes.", hint: "d _", a: "do" },
      { q: "Going by train always ______ me tired.", hint: "m _ _ _ s", a: "makes" },
      { q: "My friend called me stupid. It made me ______.", hint: "a _ _ _ y", a: "angry" },
      { q: "That romantic movie made me ______ (unhappy).", hint: "s _ d", a: "sad" },
      { q: "We must make a ______ today (choose an option).", hint: "d _ _ _ _ _ _ n", a: "decision" },
      { q: "I'll make some hot ______ for you to drink.", hint: "c _ _ _ _ _ _ _ e", a: "chocolate" },
      { q: "He never does his own ______ (cleaning his dirty clothes).", hint: "w _ _ _ _ _ g", a: "washing" },
      { q: "I always make a lot of mistakes ______ I speak English.", hint: "w _ _ n", a: "when" },
      { q: "Let's make ______ (the main evening meal).", hint: "d _ _ _ _ r", a: "dinner" },
      { q: "He's making a ______ of the class (recording moving pictures).", hint: "f _ _ m", a: "film" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "I made a mistake in the exercise.", trans: "Tôi đã phạm một sai lầm trong bài tập." },
      { text: "When I get up I make my bed.", trans: "Khi tôi ngủ dậy, tôi dọn dẹp giường của mình." },
      { text: "I want to make an appointment with the doctor.", trans: "Tôi muốn đặt một lịch hẹn với bác sĩ." },
      { text: "Going by train always makes me feel tired.", trans: "Đi bằng tàu hỏa luôn làm tôi cảm thấy mệt mỏi." },
      { text: "The children are making a noise.", trans: "Bọn trẻ đang làm ồn." }
    ]
  },
  {
    id: 7,
    title: "Unit 7: Come / came / come",
    description: "Học sự khác biệt giữa 'come' và 'go', các cụm từ chỉ hướng (come in, come out), sự trở về (come back, come home) và các ngữ cảnh giao tiếp quan trọng khác.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Come and Go (Sự khác biệt cơ bản)",
        items: [
          { word: "go", type: "Động từ", phonetic: "/ɡoʊ/", vi: "Di chuyển từ ĐÂY (here) đến ĐÓ (there).", example: "I want to go to the park." },
          { word: "come", type: "Động từ", phonetic: "/kʌm/", vi: "Di chuyển từ ĐÓ (there) đến ĐÂY (here).", example: "Come here, please." }
        ]
      },
      {
        heading: "B. Come in / Come out (Vào / Ra)",
        items: [
          { word: "come in", type: "Cụm động từ", phonetic: "/kʌm ɪn/", vi: "Đi vào trong (khi ai đó gõ cửa, bạn nói 'Come in!').", example: "The teacher came into the classroom." },
          { word: "come out (of)", type: "Cụm động từ", phonetic: "/kʌm aʊt/", vi: "Đi ra ngoài (ngược lại với come in).", example: "A woman came out of the shop. / The ticket comes out of the machine." }
        ]
      },
      {
        heading: "C. Come back / Come home (Trở về)",
        items: [
          { word: "come back", type: "Cụm động từ", phonetic: "/kʌm bæk/", vi: "Trở lại nơi này (Return to this place here).", example: "She went away for three days. She came back yesterday." },
          { word: "come back from", type: "Cụm động từ", phonetic: "/kʌm bæk frʌm/", vi: "Trở về từ đâu đó.", example: "They came back from Italy yesterday." },
          { word: "come home", type: "Cụm động từ", phonetic: "/kʌm hoʊm/", vi: "Về nhà ('home' chính là 'here' đối với người đang nói).", example: "What time did you come home last night?" }
        ]
      },
      {
        heading: "D. Other uses (Các cách dùng quan trọng khác)",
        items: [
          { word: "come from", type: "Cụm từ", phonetic: "/kʌm frʌm/", vi: "Đến từ quốc gia/nơi nào.", example: "What country do you come from? - I come from Norway." },
          { word: "come along", type: "Cụm động từ", phonetic: "/kʌm əˈlɑːŋ/", vi: "Đi cùng nhé (= come with us).", example: "We're going to a disco. Do you want to come along?" },
          { word: "come and see", type: "Cụm từ", phonetic: "/kʌm ænd siː/", vi: "Đến thăm ai đó (= visit).", example: "Come and see me some time." },
          { word: "come round", type: "Cụm động từ", phonetic: "/kʌm raʊnd/", vi: "Ghé thăm nhà ai đó một lát.", example: "Why don't you come round for dinner tonight?" },
          { word: "come across", type: "Cụm động từ", phonetic: "/kʌm əˈkrɑːs/", vi: "Tình cờ tìm thấy, tình cờ gặp.", example: "I came across this old photo in the drawer." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại giới từ và cụm từ đi với Come)
    dragDrop: {
      buckets: ["Direction (in/out/up)", "Return (back/home)", "Origin (from)", "Social (along/see/round)"],
      items: [
        { id: "i1", word: "in", target: "Direction (in/out/up)", vi: "vào trong" },
        { id: "i2", word: "into the room", target: "Direction (in/out/up)", vi: "vào trong phòng" },
        { id: "i3", word: "out", target: "Direction (in/out/up)", vi: "ra ngoài" },
        { id: "i4", word: "out of the shop", target: "Direction (in/out/up)", vi: "ra khỏi cửa hàng" },
        { id: "i5", word: "out of the machine", target: "Direction (in/out/up)", vi: "chạy ra từ máy" },
        { id: "i6", word: "here", target: "Direction (in/out/up)", vi: "đến đây" },
        { id: "i7", word: "up", target: "Direction (in/out/up)", vi: "đi lên" },
        { id: "i8", word: "down", target: "Direction (in/out/up)", vi: "đi xuống" },
        { id: "i9", word: "back", target: "Return (back/home)", vi: "trở lại" },
        { id: "i10", word: "back yesterday", target: "Return (back/home)", vi: "đã trở lại hôm qua" },
        { id: "i11", word: "back from Italy", target: "Return (back/home)", vi: "trở về từ Ý" },
        { id: "i12", word: "home", target: "Return (back/home)", vi: "về nhà" },
        { id: "i13", word: "home late", target: "Return (back/home)", vi: "về nhà muộn" },
        { id: "i14", word: "home last night", target: "Return (back/home)", vi: "đã về nhà tối qua" },
        { id: "i15", word: "home at 11", target: "Return (back/home)", vi: "về nhà lúc 11h" },
        { id: "i16", word: "from", target: "Origin (from)", vi: "đến từ" },
        { id: "i17", word: "from Norway", target: "Origin (from)", vi: "đến từ Na Uy" },
        { id: "i18", word: "from Japan", target: "Origin (from)", vi: "đến từ Nhật Bản" },
        { id: "i19", word: "from Brazil", target: "Origin (from)", vi: "đến từ Brazil" },
        { id: "i20", word: "from Spain", target: "Origin (from)", vi: "đến từ Tây Ban Nha" },
        { id: "i21", word: "from London", target: "Origin (from)", vi: "đến từ London" },
        { id: "i22", word: "along", target: "Social (along/see/round)", vi: "đi cùng" },
        { id: "i23", word: "with us", target: "Social (along/see/round)", vi: "đi cùng chúng tôi" },
        { id: "i24", word: "and see me", target: "Social (along/see/round)", vi: "đến thăm tôi" },
        { id: "i25", word: "some time", target: "Social (along/see/round)", vi: "vào một lúc nào đó" },
        { id: "i26", word: "round", target: "Social (along/see/round)", vi: "ghé chơi" },
        { id: "i27", word: "across", target: "Social (along/see/round)", vi: "tình cờ gặp/thấy" },
        { id: "i28", word: "up (a problem)", target: "Social (along/see/round)", vi: "phát sinh (vấn đề)" },
        { id: "i29", word: "to a disco", target: "Social (along/see/round)", vi: "đến sàn nhảy" },
        { id: "i30", word: "to the party", target: "Social (along/see/round)", vi: "đến bữa tiệc" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 7.1 đến 7.4)
    quiz: [
      { q: "1. I put money in, but the ticket didn't come _____ the machine.", options: ["in", "out of", "back", "from"], a: "out of" },
      { q: "2. I'm going to Taiwan tomorrow. - Oh! When are you coming _____?", options: ["in", "out", "back", "home"], a: "back" },
      { q: "3. The teacher came _____ the classroom and started the lesson.", options: ["into", "out of", "from", "along"], a: "into" },
      { q: "4. Where do you come _____? - I'm Brazilian.", options: ["in", "out", "back", "from"], a: "from" },
      { q: "5. Come and _____ me at five o'clock; we can talk about it then.", options: ["look", "see", "watch", "meet"], a: "see" },
      { q: "6. The children come _____ school at four o'clock.", options: ["out of", "into", "back", "along"], a: "out of" },
      { q: "7. Have you come _____ for your letters? They're on the table.", options: ["back", "from", "out", "home"], a: "back" },
      { q: "8. She came _____ yesterday after a long trip.", options: ["home", "back", "from", "in"], a: "back" },
      { q: "9. He comes _____ every Tuesday.", options: ["here", "there", "from", "out"], a: "here" },
      { q: "10. Are you coming _____ to the school party tonight?", options: ["along", "from", "out of", "into"], a: "along" },
      { q: "11. 'Come _____' is the opposite of 'Come out'.", options: ["back", "here", "in", "from"], a: "in" },
      { q: "12. We say 'Come in!' when someone _____ at the door.", options: ["looks", "knocks", "opens", "shuts"], a: "knocks" },
      { q: "13. What time did you come _____ last night? - About eleven o'clock.", options: ["house", "back to", "home", "here"], a: "home" },
      { q: "14. Come and see me some _____. (= visit me)", options: ["day", "time", "hour", "moment"], a: "time" },
      { q: "15. We're going to a disco. Do you want to come _____?", options: ["back", "along", "from", "out"], a: "along" },
      { q: "16. Which verb means 'to return to this place here'?", options: ["come out", "come in", "come back", "come from"], a: "come back" },
      { q: "17. 'Go' is from HERE to THERE. 'Come' is from THERE to _____.", options: ["HERE", "THERE", "BACK", "OUT"], a: "HERE" },
      { q: "18. What is the past tense of 'come'?", options: ["comed", "came", "coming", "comes"], a: "came" },
      { q: "19. What is the past participle of 'come'?", options: ["comed", "came", "come", "coming"], a: "come" },
      { q: "20. I came _____ this book in the library. (found by chance)", options: ["across", "up", "round", "along"], a: "across" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu)
    typingGame: [
      { q: "To enter a room: come ______", hint: "i _", a: "in" },
      { q: "To leave a room or building: come ______ of", hint: "o _ _", a: "out" },
      { q: "To return to this place: come ______", hint: "b _ _ k", a: "back" },
      { q: "To return to your own house: come ______", hint: "h _ _ e", a: "home" },
      { q: "To be born or live in a country: come ______", hint: "f _ _ m", a: "from" },
      { q: "To go with someone: come ______", hint: "a _ _ _ g", a: "along" },
      { q: "To visit someone: come and ______ me", hint: "s _ _", a: "see" },
      { q: "Past tense of come: ______", hint: "c _ _ e", a: "came" },
      { q: "The ticket comes out ______ the machine.", hint: "o f", a: "of" },
      { q: "They came back ______ Italy yesterday.", hint: "f _ _ m", a: "from" },
      { q: "Please come ______, I want to show you something.", hint: "h _ _ e", a: "here" },
      { q: "What country do you come ______?", hint: "f _ _ m", a: "from" },
      { q: "When someone knocks at the door, we say: 'Come ______!'", hint: "i _", a: "in" },
      { q: "Are you coming ______ to the party tonight? (with us)", hint: "a _ _ _ g", a: "along" },
      { q: "I went away for three days. I came ______ yesterday.", hint: "b _ _ k", a: "back" },
      { q: "A woman came out of the ______ with two big bags.", hint: "s _ _ p", a: "shop" },
      { q: "The opposite of 'go' (from here to there) is ______.", hint: "c _ _ e", a: "come" },
      { q: "What time did you come ______ last night? - At 11.", hint: "h _ _ e", a: "home" },
      { q: "To find by chance: come ______", hint: "a _ _ _ _ s", a: "across" },
      { q: "To visit someone's house casually: come ______", hint: "r _ _ _ d", a: "round" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "What country do you come from? I come from Norway.", trans: "Bạn đến từ quốc gia nào? Tôi đến từ Na Uy." },
      { text: "We're going to a disco tonight. Do you want to come along?", trans: "Chúng tôi sẽ đi sàn nhảy tối nay. Bạn có muốn đi cùng không?" },
      { text: "A woman came out of the shop with two big bags.", trans: "Một người phụ nữ đã đi ra khỏi cửa hàng với hai chiếc túi lớn." },
      { text: "She went away for three days and came back yesterday.", trans: "Cô ấy đã đi vắng ba ngày và đã quay lại vào ngày hôm qua." },
      { text: "What time did you come home last night?", trans: "Bạn đã về nhà lúc mấy giờ tối qua?" }
    ]
  },
  
  {
    id: 8,
    title: "Unit 8: Take / took / taken",
    description: "Học cách dùng 'take' để nói về khoảng thời gian cần thiết, tham gia các khóa học/kỳ thi, bắt các phương tiện giao thông và việc mang theo đồ vật.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Take with time (Dùng với Thời gian)",
        items: [
          { word: "It takes + person + time + to-V", type: "Cấu trúc", phonetic: "/ɪt teɪks/", vi: "Ai đó mất bao nhiêu thời gian để làm gì.", example: "It takes Alan 20 minutes to get to work." },
          { word: "It takes me...", type: "Cụm từ", phonetic: "/ɪt teɪks miː/", vi: "Tôi mất (bao nhiêu thời gian).", example: "It takes me 30 minutes to get to school." },
          { word: "It took me...", type: "Quá khứ", phonetic: "/ɪt tʊk miː/", vi: "Tôi ĐÃ mất (bao nhiêu thời gian).", example: "I do homework every day. It took me two hours yesterday." },
          { word: "How long does it take...?", type: "Câu hỏi", phonetic: "/haʊ lɑːŋ dʌz ɪt teɪk/", vi: "Mất bao lâu để...?", example: "How long does it take to get to the station? - 15 minutes in a taxi." }
        ]
      },
      {
        heading: "B. Take with courses / exams (Dùng với Khóa học / Kỳ thi)",
        items: [
          { word: "take a course", type: "Cụm từ", phonetic: "/teɪk ə kɔːrs/", vi: "Tham gia một khóa học.", example: "Are you taking an English course? Yes." },
          { word: "take an exam", type: "Cụm từ", phonetic: "/teɪk ən ɪɡˈzæm/", vi: "Làm một bài thi (hoặc dùng 'do an exam').", example: "Do you have to take an exam at the end of the course?" },
          { word: "take a lesson", type: "Cụm từ", phonetic: "/teɪk ə ˈles.ən/", vi: "Học một tiết học.", example: "I want to take some Japanese lessons." },
          { word: "take a test", type: "Cụm từ", phonetic: "/teɪk ə test/", vi: "Làm bài kiểm tra.", example: "In Britain, when you are 17, you can take your driving test." }
        ]
      },
      {
        heading: "C. Take with transport (Dùng với Phương tiện đi lại)",
        items: [
          { word: "take the bus", type: "Cụm từ", phonetic: "/teɪk ðə bʌs/", vi: "Bắt xe buýt.", example: "How do you get to work? I take the bus." },
          { word: "take the train", type: "Cụm từ", phonetic: "/teɪk ðə treɪn/", vi: "Bắt tàu hỏa.", example: "How does Nik get to work? He takes the train." },
          { word: "take the metro", type: "Cụm từ", phonetic: "/teɪk ðə ˈmet.roʊ/", vi: "Đi tàu điện ngầm.", example: "In Paris you can take the metro to the Eiffel Tower." },
          { word: "take a taxi", type: "Cụm từ", phonetic: "/teɪk ə ˈtæk.si/", vi: "Bắt taxi.", example: "Take a taxi to the airport." }
        ]
      },
      {
        heading: "D. Take something with you (Mang theo cái gì)",
        items: [
          { word: "take an umbrella", type: "Cụm từ", phonetic: "/teɪk ən ʌmˈbrel.ə/", vi: "Mang theo ô/dù.", example: "Are you going out? Take an umbrella. It's raining." },
          { word: "take water", type: "Cụm từ", phonetic: "/teɪk ˈwɑː.t̬ɚ/", vi: "Mang theo nước.", example: "Are you going to the beach? Take some water with you." },
          { word: "take your camera", type: "Cụm từ", phonetic: "/teɪk jɔːr ˈkæm.rə/", vi: "Mang theo máy ảnh.", example: "Sorry, you can't take your camera into the museum." },
          { word: "take a photograph", type: "Cụm từ", phonetic: "/teɪk ə ˈfoʊ.t̬oʊ.ɡræf/", vi: "Chụp ảnh (= take a picture / a photo).", example: "Can I take a photograph here?" },
          { word: "take a look", type: "Thành ngữ", phonetic: "/teɪk ə lʊk/", vi: "Nhìn thử, xem qua.", example: "Can you take a look at my computer?" }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại Take theo Time, Study, Transport, Objects)
    dragDrop: {
      buckets: ["Time (It takes...)", "Study (Take a...)", "Transport (Take the...)", "Objects (Take...)"],
      items: [
        { id: "i1", word: "20 minutes", target: "Time (It takes...)", vi: "20 phút" },
        { id: "i2", word: "half an hour", target: "Time (It takes...)", vi: "nửa giờ" },
        { id: "i3", word: "two hours", target: "Time (It takes...)", vi: "hai giờ đồng hồ" },
        { id: "i4", word: "a long time", target: "Time (It takes...)", vi: "một thời gian dài" },
        { id: "i5", word: "a few days", target: "Time (It takes...)", vi: "vài ngày" },
        { id: "i6", word: "three weeks", target: "Time (It takes...)", vi: "ba tuần" },
        { id: "i7", word: "an English course", target: "Study (Take a...)", vi: "khóa học tiếng Anh" },
        { id: "i8", word: "an exam", target: "Study (Take a...)", vi: "kỳ thi" },
        { id: "i9", word: "a driving test", target: "Study (Take a...)", vi: "bài thi bằng lái xe" },
        { id: "i10", word: "some lessons", target: "Study (Take a...)", vi: "một vài bài học" },
        { id: "i11", word: "a math test", target: "Study (Take a...)", vi: "bài kiểm tra toán" },
        { id: "i12", word: "a university course", target: "Study (Take a...)", vi: "khóa học đại học" },
        { id: "i13", word: "the bus", target: "Transport (Take the...)", vi: "xe buýt" },
        { id: "i14", word: "a taxi", target: "Transport (Take the...)", vi: "xe taxi" },
        { id: "i15", word: "the train", target: "Transport (Take the...)", vi: "tàu hỏa" },
        { id: "i16", word: "the metro", target: "Transport (Take the...)", vi: "tàu điện ngầm" },
        { id: "i17", word: "the underground", target: "Transport (Take the...)", vi: "tàu điện ngầm" },
        { id: "i18", word: "a plane", target: "Transport (Take the...)", vi: "máy bay" },
        { id: "i19", word: "an umbrella", target: "Objects (Take...)", vi: "một chiếc ô" },
        { id: "i20", word: "some water", target: "Objects (Take...)", vi: "một ít nước" },
        { id: "i21", word: "a camera", target: "Objects (Take...)", vi: "máy ảnh" },
        { id: "i22", word: "a photograph", target: "Objects (Take...)", vi: "bức ảnh" },
        { id: "i23", word: "a picture", target: "Objects (Take...)", vi: "bức hình" },
        { id: "i24", word: "a passport", target: "Objects (Take...)", vi: "hộ chiếu" },
        { id: "i25", word: "a look at", target: "Objects (Take...)", vi: "nhìn vào" },
        { id: "i26", word: "a chance", target: "Objects (Take...)", vi: "một cơ hội" },
        { id: "i27", word: "some money", target: "Objects (Take...)", vi: "một ít tiền" },
        { id: "i28", word: "your keys", target: "Objects (Take...)", vi: "chìa khóa của bạn" },
        { id: "i29", word: "a bag", target: "Objects (Take...)", vi: "một cái túi" },
        { id: "i30", word: "a ticket", target: "Objects (Take...)", vi: "một tấm vé" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 8.1 đến 8.5)
    quiz: [
      { q: "1. At the end of the course, you have to _____ an exam.", options: ["take", "make", "get", "have to"], a: "take" },
      { q: "2. I wanted to speak French, so I took a _____.", options: ["course", "exam", "taxi", "umbrella"], a: "course" },
      { q: "3. You want to learn Russian? Why don't you take some _____?", options: ["lessons", "buses", "exams", "time"], a: "lessons" },
      { q: "4. In Britain, when you are 17, you can take your driving _____.", options: ["test", "lesson", "course", "chance"], a: "test" },
      { q: "5. How does Lisa go to work? She _____ the bus.", options: ["takes", "makes", "goes", "drives"], a: "takes" },
      { q: "6. How can I get to the airport? You can _____ a taxi.", options: ["take", "do", "make", "go"], a: "take" },
      { q: "7. It _____ Alan 20 minutes to get to work.", options: ["takes", "makes", "goes", "has"], a: "takes" },
      { q: "8. I do homework every day. It _____ me two hours yesterday.", options: ["took", "takes", "taken", "made"], a: "took" },
      { q: "9. How long does it _____ to get to the station?", options: ["take", "make", "cost", "need"], a: "take" },
      { q: "10. In Paris you can _____ the metro to the Eiffel Tower.", options: ["take", "make", "go", "travel"], a: "take" },
      { q: "11. Are you going out? _____ an umbrella. It's raining.", options: ["Take", "Make", "Do", "Go"], a: "Take" },
      { q: "12. Sorry, you can't take your _____ into the museum. No photos allowed.", options: ["camera", "umbrella", "water", "bus"], a: "camera" },
      { q: "13. Are you going to the beach? Take some _____ with you.", options: ["water", "exam", "course", "metro"], a: "water" },
      { q: "14. Can I take a _____ here? It's beautiful.", options: ["photograph", "look", "course", "taxi"], a: "photograph" },
      { q: "15. I go to university every day. It takes _____ 30 minutes.", options: ["me", "I", "my", "mine"], a: "me" },
      { q: "16. What is the past tense of 'take'?", options: ["took", "taked", "taken", "taking"], a: "took" },
      { q: "17. What is the past participle of 'take'?", options: ["taken", "took", "taked", "takes"], a: "taken" },
      { q: "18. What do you take with you when you go to another country?", options: ["passport", "exam", "lesson", "metro"], a: "passport" },
      { q: "19. What do you take when it's raining?", options: ["an umbrella", "a camera", "a test", "a course"], a: "an umbrella" },
      { q: "20. How do Paul and Ann get home? They take the _____.", options: ["train", "time", "test", "photograph"], a: "train" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu)
    typingGame: [
      { q: "It ______ Alan 20 minutes to get to work.", hint: "t _ _ _ s", a: "takes" },
      { q: "It ______ me two hours yesterday.", hint: "t _ _ k", a: "took" },
      { q: "How long does it ______ to get to the station?", hint: "t _ _ e", a: "take" },
      { q: "Are you taking an English ______? Yes.", hint: "c _ _ _ _ e", a: "course" },
      { q: "Do you have to take an ______ at the end of the year?", hint: "e _ _ m", a: "exam" },
      { q: "I want to take some Japanese ______.", hint: "l _ _ _ _ _ s", a: "lessons" },
      { q: "In Britain, you can take your driving ______ when you are 17.", hint: "t _ _ t", a: "test" },
      { q: "How do you get to work? I take the ______ (public road transport).", hint: "b _ s", a: "bus" },
      { q: "In Paris you can take the ______ to the Eiffel Tower.", hint: "m _ _ _ o", a: "metro" },
      { q: "He works in London, so he takes the ______ every morning.", hint: "t _ _ _ n", a: "train" },
      { q: "To get to the airport quickly, take a ______.", hint: "t _ _ i", a: "taxi" },
      { q: "Are you going out? Take an ______ (for the rain).", hint: "u _ _ _ _ _ _ a", a: "umbrella" },
      { q: "Are you going to the beach? Take some ______ to drink.", hint: "w _ _ _ r", a: "water" },
      { q: "Sorry, you can't take your ______ into the museum.", hint: "c _ _ _ _ a", a: "camera" },
      { q: "Can I take a ______ here? (a picture)", hint: "p _ _ _ _ _ _ _ _ h", a: "photograph" },
      { q: "Please take a ______ at this document. (= look at)", hint: "l _ _ k", a: "look" },
      { q: "Past tense of 'take' is ______.", hint: "t _ _ k", a: "took" },
      { q: "Past participle of 'take' is ______.", hint: "t _ _ _ n", a: "taken" },
      { q: "When you travel abroad, you must take your ______.", hint: "p _ _ _ _ _ _ t", a: "passport" },
      { q: "It takes ______ 45 minutes to get to work. (Miriam)", hint: "M _ _ _ _ m", a: "Miriam" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "How long does it take to get to the station?", trans: "Mất bao lâu để đi đến nhà ga?" },
      { text: "It takes me thirty minutes to get to school every day.", trans: "Tôi mất 30 phút để đến trường mỗi ngày." },
      { text: "Do you have to take an exam at the end of the course?", trans: "Bạn có phải làm bài kiểm tra vào cuối khóa học không?" },
      { text: "In Paris you can take the metro to the Eiffel Tower.", trans: "Ở Paris, bạn có thể đi tàu điện ngầm đến Tháp Eiffel." },
      { text: "Are you going out? Take an umbrella, it's raining.", trans: "Bạn định ra ngoài à? Nhớ mang theo ô nhé, trời đang mưa đấy." }
    ]
  },
  {
    id: 9,
    title: "Unit 9: Bring / brought / brought",
    description: "Học cách phân biệt rõ ràng giữa 'bring' (mang đến chỗ người nói) và 'take' (mang đi khỏi chỗ người nói), cũng như cấu trúc mang trả lại (bring back).",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Bring and take (Phân biệt mang đến và mang đi)",
        items: [
          { word: "take", type: "Động từ", phonetic: "/teɪk/", vi: "Mang từ ĐÂY (here) đi đến ĐÓ (there). Mang ra xa người nói.", example: "Are you going to school? Take your books." },
          { word: "bring", type: "Động từ", phonetic: "/brɪŋ/", vi: "Mang từ ĐÓ (there) về ĐÂY (here). Mang lại gần người nói.", example: "Are you going to the kitchen? Can you bring me a glass?" },
          { word: "take to...", type: "Cụm từ", phonetic: "/teɪk tuː/", vi: "Mang/đem đến cho ai đó ở xa.", example: "Please take this form to the secretary. (Thư ký đang ở đằng kia)" },
          { word: "bring to...", type: "Cụm từ", phonetic: "/brɪŋ tuː/", vi: "Mang/đem đến chỗ của mình.", example: "Come to my house tomorrow and bring your guitar." }
        ]
      },
      {
        heading: "B. Bring somebody something (Mang cho ai cái gì)",
        items: [
          { word: "brought", type: "Quá khứ", phonetic: "/brɔːt/", vi: "Đã mang đến (Quá khứ của bring).", example: "I've brought you some apples from my garden." },
          { word: "bring me...", type: "Cấu trúc", phonetic: "/brɪŋ miː/", vi: "Mang cho tôi...", example: "When she visits me, she always brings me flowers." }
        ]
      },
      {
        heading: "C. Bring something back (Mang trả lại)",
        items: [
          { word: "take (with you)", type: "Cụm từ", phonetic: "/teɪk wɪð juː/", vi: "Cầm đi, mượn mang đi theo.", example: "It's raining. You can take my umbrella..." },
          { word: "bring back", type: "Cụm động từ", phonetic: "/brɪŋ bæk/", vi: "Mang trả lại chỗ cũ.", example: "...and bring it back tomorrow." },
          { word: "bring it back", type: "Cụm từ", phonetic: "/brɪŋ ɪt bæk/", vi: "Mang cái đó trả lại.", example: "Please take this book with you and read it. - Thanks. I'll bring it back on Friday." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại tình huống dùng Take và Bring)
    dragDrop: {
      buckets: ["Take (from Here to There)", "Bring (from There to Here)", "Bring back (Return)"],
      items: [
        { id: "i1", word: "your books to school", target: "Take (from Here to There)", vi: "sách đến trường" },
        { id: "i2", word: "this form to the office", target: "Take (from Here to There)", vi: "đơn này đến văn phòng" },
        { id: "i3", word: "an umbrella with you", target: "Take (from Here to There)", vi: "ô mang theo" },
        { id: "i4", word: "the camera to Bangkok", target: "Take (from Here to There)", vi: "máy ảnh đến Bangkok" },
        { id: "i5", word: "the letters to the post", target: "Take (from Here to There)", vi: "thư ra bưu điện" },
        { id: "i6", word: "this book to read tonight", target: "Take (from Here to There)", vi: "sách để đọc tối nay" },
        { id: "i7", word: "these papers to him", target: "Take (from Here to There)", vi: "giấy tờ cho anh ấy" },
        { id: "i8", word: "a present to her house", target: "Take (from Here to There)", vi: "quà đến nhà cô ấy" },
        { id: "i9", word: "your dog for a walk", target: "Take (from Here to There)", vi: "chó đi dạo" },
        { id: "i10", word: "the children to school", target: "Take (from Here to There)", vi: "trẻ em đến trường" },
        { id: "i11", word: "me a glass of water", target: "Bring (from There to Here)", vi: "cho tôi cốc nước" },
        { id: "i12", word: "your guitar to my house", target: "Bring (from There to Here)", vi: "đàn đến nhà tôi" },
        { id: "i13", word: "some apples for me", target: "Bring (from There to Here)", vi: "táo cho tôi" },
        { id: "i14", word: "me some flowers", target: "Bring (from There to Here)", vi: "hoa cho tôi" },
        { id: "i15", word: "me some chocolates", target: "Bring (from There to Here)", vi: "sô-cô-la cho tôi" },
        { id: "i16", word: "a present from New York", target: "Bring (from There to Here)", vi: "quà từ New York" },
        { id: "i17", word: "food to the party", target: "Bring (from There to Here)", vi: "thức ăn đến bữa tiệc" },
        { id: "i18", word: "me the menu, please", target: "Bring (from There to Here)", vi: "thực đơn cho tôi" },
        { id: "i19", word: "your friends here", target: "Bring (from There to Here)", vi: "bạn bè đến đây" },
        { id: "i20", word: "me a cup of tea", target: "Bring (from There to Here)", vi: "tách trà cho tôi" },
        { id: "i21", word: "it tomorrow", target: "Bring back (Return)", vi: "trả nó vào ngày mai" },
        { id: "i22", word: "my umbrella later", target: "Bring back (Return)", vi: "trả ô sau" },
        { id: "i23", word: "the book on Friday", target: "Bring back (Return)", vi: "trả sách vào thứ Sáu" },
        { id: "i24", word: "the papers this evening", target: "Bring back (Return)", vi: "trả giấy tờ tối nay" },
        { id: "i25", word: "the keys to me", target: "Bring back (Return)", vi: "trả chìa khóa cho tôi" },
        { id: "i26", word: "my pen tomorrow", target: "Bring back (Return)", vi: "trả bút vào ngày mai" },
        { id: "i27", word: "the car tonight", target: "Bring back (Return)", vi: "mang xe về tối nay" },
        { id: "i28", word: "a souvenir for me", target: "Bring back (Return)", vi: "mang quà lưu niệm về" },
        { id: "i29", word: "memories to me", target: "Bring back (Return)", vi: "mang ký ức trở lại" },
        { id: "i30", word: "the money next week", target: "Bring back (Return)", vi: "trả tiền tuần sau" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 9.1 đến 9.4)
    quiz: [
      { q: "1. Are you going to the shops? _____ an umbrella. It's raining.", options: ["Bring", "Take", "Make", "Do"], a: "Take" },
      { q: "2. 'Don't forget to _____ your books tomorrow!' the teacher said to the class.", options: ["bring", "take", "have", "go"], a: "bring" },
      { q: "3. Are you going to the kitchen? Can you _____ me some water?", options: ["take", "get", "bring", "make"], a: "bring" },
      { q: "4. _____ your camera with you when you go to Bangkok.", options: ["Bring", "Take", "Bring back", "Make"], a: "Take" },
      { q: "5. Are you going to the secretary's office? Can you _____ these papers, please?", options: ["bring", "bring back", "take", "get"], a: "take" },
      { q: "6. Shall I _____ you a present from New York?", options: ["take", "bring", "bring back", "make"], a: "bring" },
      { q: "7. Can I _____ this book to read tonight? I'll bring it back tomorrow.", options: ["bring", "bring back", "take", "have"], a: "take" },
      { q: "8. When she went to Belgium, she _____ me some chocolates.", options: ["brought", "took", "take", "bring"], a: "brought" },
      { q: "9. Please _____ my umbrella. You can bring it back tomorrow.", options: ["bring", "take", "bring back", "get"], a: "take" },
      { q: "10. Come to my house and _____ your guitar.", options: ["take", "get", "make", "bring"], a: "bring" },
      { q: "11. Go to the secretary and _____ these letters, please.", options: ["bring", "take", "bring back", "get"], a: "take" },
      { q: "12. Everybody is going to _____ food to the party.", options: ["take", "bring", "make", "take back"], a: "bring" },
      { q: "13. She always _____ me presents. Yesterday she brought me some chocolates.", options: ["takes", "brings", "brought", "took"], a: "brings" },
      { q: "14. Hello, I've _____ you some flowers. I hope you like them!", options: ["take", "took", "bring", "brought"], a: "brought" },
      { q: "15. She has taken my book, but she's going to _____ it back tomorrow.", options: ["take", "get", "make", "bring"], a: "bring" },
      { q: "16. I _____ 72 photographs when I was in Rio de Janeiro.", options: ["brought", "took", "made", "did"], a: "took" },
      { q: "17. What is the past tense of 'bring'?", options: ["bringed", "brang", "brought", "took"], a: "brought" },
      { q: "18. What is the past tense of 'take'?", options: ["taked", "taken", "took", "brought"], a: "took" },
      { q: "19. Which verb means 'from here to there'?", options: ["bring", "take", "come", "get"], a: "take" },
      { q: "20. Which verb means 'from there to here'?", options: ["bring", "take", "go", "make"], a: "bring" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu)
    typingGame: [
      { q: "From here to there: t _ _ e", hint: "t _ _ e", a: "take" },
      { q: "From there to here: b _ _ _ g", hint: "b _ _ _ g", a: "bring" },
      { q: "Past tense of bring: b _ _ _ _ _ t", hint: "b _ _ _ _ _ t", a: "brought" },
      { q: "Past tense of take: t _ _ k", hint: "t _ _ k", a: "took" },
      { q: "Return something to me: bring it b _ _ k", hint: "b _ _ k", a: "back" },
      { q: "Are you going to school? ______ your books.", hint: "T _ _ e", a: "Take" },
      { q: "Are you in the kitchen? Can you ______ me a glass?", hint: "b _ _ _ g", a: "bring" },
      { q: "Please ______ this form to the secretary over there.", hint: "t _ _ e", a: "take" },
      { q: "Come to my house and ______ your guitar.", hint: "b _ _ _ g", a: "bring" },
      { q: "When she visits me, she always ______ me flowers.", hint: "b _ _ _ _ s", a: "brings" },
      { q: "You can take my umbrella and bring it ______ tomorrow.", hint: "b _ _ k", a: "back" },
      { q: "I've ______ you some apples from my garden.", hint: "b _ _ _ _ _ t", a: "brought" },
      { q: "Shall I ______ you a present from New York?", hint: "b _ _ _ g", a: "bring" },
      { q: "Can I ______ this book to read tonight?", hint: "t _ _ e", a: "take" },
      { q: "Go to the secretary and ______ these letters.", hint: "t _ _ e", a: "take" },
      { q: "Everybody is going to ______ food to the party.", hint: "b _ _ _ g", a: "bring" },
      { q: "Hello, I've ______ you some flowers.", hint: "b _ _ _ _ _ t", a: "brought" },
      { q: "She has taken my book, but she will bring it ______.", hint: "b _ _ k", a: "back" },
      { q: "I ______ 72 photographs when I was in Rio.", hint: "t _ _ k", a: "took" },
      { q: "You must ______ your passport when you travel.", hint: "t _ _ e", a: "take" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "Are you going to the kitchen? Can you bring me a glass?", trans: "Bạn đang đi vào bếp à? Bạn có thể mang cho tôi một cái cốc không?" },
      { text: "Please take this form to the secretary.", trans: "Vui lòng mang tờ đơn này đến cho thư ký." },
      { text: "Come to my house tomorrow and bring your guitar.", trans: "Ngày mai hãy đến nhà tôi và nhớ mang theo cây đàn guitar của bạn nhé." },
      { text: "I've brought you some apples from my garden.", trans: "Tôi vừa mang đến cho bạn vài quả táo từ khu vườn của tôi." },
      { text: "You can take my umbrella and bring it back tomorrow.", trans: "Bạn có thể cầm ô của tôi đi và mang trả lại vào ngày mai." }
    ]
  },

  {
    id: 10,
    title: "Unit 10: Get / got / got",
    description: "Động từ 'get' là một trong những từ thông dụng nhất tiếng Anh. Bạn sẽ học cách dùng 'get' để diễn tả sự thay đổi trạng thái, việc nhận/mua đồ vật, sự di chuyển và các cụm từ phổ biến.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Get + adjective (Trở nên... - dùng cho sự thay đổi)",
        items: [
          { word: "get dark", type: "Tính từ", phonetic: "/ɡet dɑːrk/", vi: "Trời tối dần. (It's light -> It's getting dark -> It's dark).", example: "It's getting dark." },
          { word: "get better", type: "Tính từ", phonetic: "/ɡet ˈbet̬.ɚ/", vi: "Trở nên tốt hơn, khỏe hơn. (She's ill -> She's getting better).", example: "She's getting better." },
          { word: "get tired", type: "Tính từ", phonetic: "/ɡet ˈtaɪɚd/", vi: "Trở nên mệt mỏi.", example: "I'm getting tired. I want to go to bed." },
          { word: "get wet", type: "Tính từ", phonetic: "/ɡet wet/", vi: "Bị ướt.", example: "It's raining! I'm getting wet!" },
          { word: "get cold", type: "Tính từ", phonetic: "/ɡet koʊld/", vi: "Trở nên lạnh.", example: "Please close the window. I'm getting cold." }
        ]
      },
      {
        heading: "B. Get + noun (Nhận được, lấy được, mua được)",
        items: [
          { word: "get a stamp", type: "Danh từ", phonetic: "/ɡet ə stæmp/", vi: "Mua/lấy một con tem.", example: "I want to send a postcard. I have to get a stamp." },
          { word: "get a job", type: "Danh từ", phonetic: "/ɡet ə dʒɑːb/", vi: "Kiếm việc làm.", example: "I've finished my studies. Now I want to get a job." },
          { word: "get a doctor", type: "Danh từ", phonetic: "/ɡet ə ˈdɑːk.tɚ/", vi: "Gọi bác sĩ.", example: "My friend is ill! Please get a doctor." },
          { word: "get some coffee", type: "Danh từ", phonetic: "/ɡet sʌm ˈkɑː.fi/", vi: "Lấy một ít cà phê.", example: "Do you want a drink? I can get some coffee." },
          { word: "get a newspaper", type: "Danh từ", phonetic: "/ɡet ə ˈnuːzˌpeɪ.pɚ/", vi: "Mua tờ báo.", example: "I'm going to the shop to get a newspaper." },
          { word: "get a taxi", type: "Danh từ", phonetic: "/ɡet ə ˈtæk.si/", vi: "Bắt taxi.", example: "Where can I get a taxi?" }
        ]
      },
      {
        heading: "C. Get to (Đến, đi đến một nơi)",
        items: [
          { word: "get to the airport", type: "Cụm từ", phonetic: "/ɡet tuː ði ˈer.pɔːrt/", vi: "Đến sân bay (= arrive at / reach).", example: "How can I get to the airport? Take the airport bus." },
          { word: "get to New York", type: "Cụm từ", phonetic: "/ɡet tuː nuː jɔːrk/", vi: "Đến New York.", example: "When you get to New York, ring me." }
        ]
      },
      {
        heading: "D. Other phrases with get (Các cụm từ khác với get)",
        items: [
          { word: "get married", type: "Cụm từ", phonetic: "/ɡet ˈmer.id/", vi: "Kết hôn.", example: "Maria and David are getting married in April." },
          { word: "get back", type: "Cụm động từ", phonetic: "/ɡet bæk/", vi: "Trở về (= return).", example: "When you get back from Hong Kong, ring me." },
          { word: "get home", type: "Cụm từ", phonetic: "/ɡet hoʊm/", vi: "Về đến nhà (KHÔNG dùng 'get to home').", example: "When I get home, I have my lunch." },
          { word: "get there", type: "Cụm từ", phonetic: "/ɡet ðer/", vi: "Đến đó (KHÔNG dùng 'get to there').", example: "I get there at 6 o'clock." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại Get theo Tính từ, Danh từ, Điểm đến)
    dragDrop: {
      buckets: ["Changes (Get + Adj)", "Obtain (Get + Noun)", "Arrive (Get to...)", "Phrases (Home/Back/Married)"],
      items: [
        { id: "i1", word: "dark", target: "Changes (Get + Adj)", vi: "tối đi" },
        { id: "i2", word: "better", target: "Changes (Get + Adj)", vi: "tốt hơn/khỏe hơn" },
        { id: "i3", word: "tired", target: "Changes (Get + Adj)", vi: "mệt mỏi" },
        { id: "i4", word: "wet", target: "Changes (Get + Adj)", vi: "ướt" },
        { id: "i5", word: "cold", target: "Changes (Get + Adj)", vi: "lạnh" },
        { id: "i6", word: "hot", target: "Changes (Get + Adj)", vi: "nóng" },
        { id: "i7", word: "sick", target: "Changes (Get + Adj)", vi: "ốm" },
        { id: "i8", word: "light", target: "Changes (Get + Adj)", vi: "sáng lên" },
        { id: "i9", word: "a stamp", target: "Obtain (Get + Noun)", vi: "một con tem" },
        { id: "i10", word: "a job", target: "Obtain (Get + Noun)", vi: "một công việc" },
        { id: "i11", word: "a doctor", target: "Obtain (Get + Noun)", vi: "một bác sĩ" },
        { id: "i12", word: "some coffee", target: "Obtain (Get + Noun)", vi: "một chút cà phê" },
        { id: "i13", word: "a newspaper", target: "Obtain (Get + Noun)", vi: "một tờ báo" },
        { id: "i14", word: "a taxi", target: "Obtain (Get + Noun)", vi: "một chiếc taxi" },
        { id: "i15", word: "a drink", target: "Obtain (Get + Noun)", vi: "một đồ uống" },
        { id: "i16", word: "the airport", target: "Arrive (Get to...)", vi: "sân bay" },
        { id: "i17", word: "New York", target: "Arrive (Get to...)", vi: "New York" },
        { id: "i18", word: "the station", target: "Arrive (Get to...)", vi: "nhà ga" },
        { id: "i19", word: "school", target: "Arrive (Get to...)", vi: "trường học" },
        { id: "i20", word: "work", target: "Arrive (Get to...)", vi: "chỗ làm" },
        { id: "i21", word: "the hospital", target: "Arrive (Get to...)", vi: "bệnh viện" },
        { id: "i22", word: "the hotel", target: "Arrive (Get to...)", vi: "khách sạn" },
        { id: "i23", word: "married", target: "Phrases (Home/Back/Married)", vi: "kết hôn" },
        { id: "i24", word: "back", target: "Phrases (Home/Back/Married)", vi: "trở về" },
        { id: "i25", word: "home", target: "Phrases (Home/Back/Married)", vi: "về nhà" },
        { id: "i26", word: "there", target: "Phrases (Home/Back/Married)", vi: "đến đó" },
        { id: "i27", word: "up", target: "Phrases (Home/Back/Married)", vi: "thức dậy" },
        { id: "i28", word: "ready", target: "Phrases (Home/Back/Married)", vi: "sẵn sàng" },
        { id: "i29", word: "lost", target: "Phrases (Home/Back/Married)", vi: "bị lạc" },
        { id: "i30", word: "dressed", target: "Phrases (Home/Back/Married)", vi: "mặc quần áo" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 10.1 đến 10.5)
    quiz: [
      { q: "1. I studied too much and I got _____.", options: ["hot", "tired", "sick", "dark"], a: "tired" },
      { q: "2. I ate too much and I got _____.", options: ["hot", "tired", "sick", "wet"], a: "sick" },
      { q: "3. I sat in the sun too much and I got _____.", options: ["hot", "tired", "sick", "cold"], a: "hot" },
      { q: "4. The sun is going down. It's getting _____.", options: ["light", "dark", "better", "wet"], a: "dark" },
      { q: "5. When the sun comes up it gets _____.", options: ["light", "dark", "cold", "sick"], a: "light" },
      { q: "6. She's in hospital but she's getting _____.", options: ["light", "better", "married", "dark"], a: "better" },
      { q: "7. It's raining! I'm getting _____.", options: ["cold", "wet", "better", "light"], a: "wet" },
      { q: "8. Please close the window. I'm getting _____.", options: ["wet", "cold", "light", "dark"], a: "cold" },
      { q: "9. What do you get if you want to post a letter?", options: ["a stamp", "a job", "a doctor", "a newspaper"], a: "a stamp" },
      { q: "10. What do you get if somebody is ill?", options: ["a taxi", "a stamp", "a doctor", "a job"], a: "a doctor" },
      { q: "11. What do you get if you want a drink of water?", options: ["a stamp", "a glass", "a newspaper", "a taxi"], a: "a glass" },
      { q: "12. What do you get if you want to read the news?", options: ["a newspaper", "a stamp", "a job", "a doctor"], a: "a newspaper" },
      { q: "13. What do you get if you want to go to the airport quickly?", options: ["a taxi", "a stamp", "a doctor", "a job"], a: "a taxi" },
      { q: "14. What do you get if you want to earn some money?", options: ["a job", "a doctor", "a taxi", "a newspaper"], a: "a job" },
      { q: "15. This plane gets _____ Paris at 12:30.", options: ["in", "to", "at", "for"], a: "to" },
      { q: "16. The bus gets _____ my house in 25 minutes.", options: ["to", "in", "at", "for"], a: "to" },
      { q: "17. How do I get _____ the airport? Take a taxi.", options: ["in", "at", "to", "on"], a: "to" },
      { q: "18. Which sentence is correct?", options: ["When I get to home, I have lunch.", "When I get home, I have lunch.", "When I get at home, I have lunch.", "When I get in home, I have lunch."], a: "When I get home, I have lunch." },
      { q: "19. Which sentence is correct?", options: ["I get to there at 6 o'clock.", "I get in there at 6 o'clock.", "I get there at 6 o'clock.", "I get at there at 6 o'clock."], a: "I get there at 6 o'clock." },
      { q: "20. Maria and David are getting _____ in April.", options: ["married", "marry", "marries", "marrying"], a: "married" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu)
    typingGame: [
      { q: "The sun is going down. It's getting ______.", hint: "d _ _ k", a: "dark" },
      { q: "She's in hospital but she's getting ______.", hint: "b _ _ _ _ r", a: "better" },
      { q: "I'm getting ______. I want to go to bed.", hint: "t _ _ _ d", a: "tired" },
      { q: "It's raining! I'm getting ______!", hint: "w _ t", a: "wet" },
      { q: "If you don't have a job, you try to ______ one.", hint: "g _ t", a: "get" },
      { q: "I want to send a postcard. I have to get a ______.", hint: "s _ _ _ p", a: "stamp" },
      { q: "My friend is ill! Please get a ______.", hint: "d _ _ _ _ r", a: "doctor" },
      { q: "I'm going to the shop to get a ______ (to read).", hint: "n _ _ _ _ _ _ _ r", a: "newspaper" },
      { q: "Where can I get a ______? (car to pay for a ride)", hint: "t _ _ i", a: "taxi" },
      { q: "How can I get ______ the airport?", hint: "t _", a: "to" },
      { q: "When you get ______ New York, ring me.", hint: "t _", a: "to" },
      { q: "Maria and David are getting ______ in April. (wedding)", hint: "m _ _ _ _ _ d", a: "married" },
      { q: "When you get ______ from Hong Kong, ring me. (= return)", hint: "b _ _ k", a: "back" },
      { q: "When I get ______ , I have my lunch. (my house)", hint: "h _ _ e", a: "home" },
      { q: "I get ______ at 6 o'clock. (to that place)", hint: "t _ _ _ e", a: "there" },
      { q: "I studied too much and I got ______. (exhausted)", hint: "t _ _ _ d", a: "tired" },
      { q: "I ate too much and I got ______. (ill)", hint: "s _ _ k", a: "sick" },
      { q: "I sat in the sun too much and I got ______.", hint: "h _ t", a: "hot" },
      { q: "Please close the window. I'm getting ______.", hint: "c _ _ d", a: "cold" },
      { q: "This plane gets ______ Paris at 12:30.", hint: "t _", a: "to" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "I'm getting tired. I want to go to bed.", trans: "Tôi đang cảm thấy mệt. Tôi muốn đi ngủ." },
      { text: "I've finished my studies. Now I want to get a job.", trans: "Tôi đã học xong. Bây giờ tôi muốn tìm một công việc." },
      { text: "How can I get to the airport?", trans: "Làm thế nào tôi có thể đi đến sân bay?" },
      { text: "When you get back from Hong Kong, ring me.", trans: "Khi nào bạn từ Hồng Kông trở về, hãy gọi cho tôi nhé." },
      { text: "When I get home, I have my lunch.", trans: "Khi tôi về đến nhà, tôi ăn bữa trưa của mình." }
    ]
  },
  {
    id: 11,
    title: "Unit 11: Phrasal verbs",
    description: "Cụm động từ (Phrasal verbs) là sự kết hợp giữa một động từ và một giới từ, thường mang ý nghĩa hoàn toàn khác với động từ gốc. Bài này giúp bạn nắm vững các cụm từ phổ biến nhất.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. What are phrasal verbs? (Cụm động từ là gì?)",
        items: [
          { word: "get up", type: "Phrasal verb", phonetic: "/ɡet ʌp/", vi: "Thức dậy, rời khỏi giường.", example: "I got up at 6.30 this morning. I'm tired now." },
          { word: "get on (with)", type: "Phrasal verb", phonetic: "/ɡet ɑːn/", vi: "Hòa thuận, có mối quan hệ tốt với ai đó.", example: "I hated my sister when I was young but now we get on very well." },
          { word: "get over", type: "Phrasal verb", phonetic: "/ɡet ˈoʊ.vɚ/", vi: "Bình phục, vượt qua (bệnh tật, cú sốc).", example: "He soon got over his cold. (= he got better quickly)" },
          { word: "turn on", type: "Phrasal verb", phonetic: "/tɝːn ɑːn/", vi: "Bật (máy móc, tivi, đèn).", example: "He always turns on the TV at 9 o'clock." },
          { word: "turn off", type: "Phrasal verb", phonetic: "/tɝːn ɑːf/", vi: "Tắt (máy móc, tivi, đèn).", example: "It's a sunny day. Turn the light off." },
          { word: "turn up", type: "Phrasal verb", phonetic: "/tɝːn ʌp/", vi: "Vặn to lên (âm lượng).", example: "Turn the TV up. I can't hear it." },
          { word: "turn down", type: "Phrasal verb", phonetic: "/tɝːn daʊn/", vi: "Vặn nhỏ đi (âm lượng).", example: "Turn the TV down. It's too loud." },
          { word: "go on", type: "Phrasal verb", phonetic: "/ɡoʊ ɑːn/", vi: "Tiếp tục (= continue).", example: "Don't stop. Go on talking. It's very interesting." },
          { word: "go off", type: "Phrasal verb", phonetic: "/ɡoʊ ɑːf/", vi: "Phát nổ (bom) hoặc Đổ chuông (báo thức).", example: "A bomb went off in a London station today." },
          { word: "put on", type: "Phrasal verb", phonetic: "/pʊt ɑːn/", vi: "Mặc đồ, đội mũ, mang giày vào.", example: "It's cold and windy outside. Put your coat on." },
          { word: "come on", type: "Phrasal verb", phonetic: "/kʌm ɑːn/", vi: "Nhanh lên, thôi nào!", example: "Come on! We're late." }
        ]
      },
      {
        heading: "B. One phrasal verb, different meanings (Một cụm từ, nhiều nghĩa)",
        items: [
          { word: "turn down", type: "Phrasal verb", phonetic: "/tɝːn daʊn/", vi: "1. Vặn nhỏ lại. 2. Từ chối (= refuse).", example: "She turned down the invitation. (= refused it)" },
          { word: "take off", type: "Phrasal verb", phonetic: "/teɪk ɑːf/", vi: "1. Cất cánh (máy bay). 2. Cởi đồ ra.", example: "Our plane takes off at 12.30. / She took off her shoes." },
          { word: "do up", type: "Phrasal verb", phonetic: "/duː ʌp/", vi: "1. Kéo khóa, cài nút áo. 2. Sửa sang, trang trí lại nhà.", example: "She did up her coat. / She did up her flat." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo động từ gốc)
    dragDrop: {
      buckets: ["Get", "Turn", "Go / Come", "Put / Take", "Do"],
      items: [
        { id: "i1", word: "up (thức dậy)", target: "Get", vi: "get up" },
        { id: "i2", word: "on (hòa thuận)", target: "Get", vi: "get on" },
        { id: "i3", word: "over (bình phục)", target: "Get", vi: "get over" },
        { id: "i4", word: "better quickly", target: "Get", vi: "bình phục nhanh (get over)" },
        { id: "i5", word: "out of bed", target: "Get", vi: "rời khỏi giường (get up)" },
        { id: "i6", word: "well with someone", target: "Get", vi: "hòa thuận (get on)" },
        { id: "i7", word: "on (bật đèn)", target: "Turn", vi: "turn on" },
        { id: "i8", word: "off (tắt tivi)", target: "Turn", vi: "turn off" },
        { id: "i9", word: "up (vặn to)", target: "Turn", vi: "turn up" },
        { id: "i10", word: "down (vặn nhỏ)", target: "Turn", vi: "turn down" },
        { id: "i11", word: "down (từ chối)", target: "Turn", vi: "turn down" },
        { id: "i12", word: "refuse an invitation", target: "Turn", vi: "từ chối (turn down)" },
        { id: "i13", word: "on (tiếp tục)", target: "Go / Come", vi: "go on" },
        { id: "i14", word: "off (phát nổ)", target: "Go / Come", vi: "go off" },
        { id: "i15", word: "on! (nhanh lên)", target: "Go / Come", vi: "come on" },
        { id: "i16", word: "explode", target: "Go / Come", vi: "phát nổ (go off)" },
        { id: "i17", word: "continue talking", target: "Go / Come", vi: "tiếp tục (go on)" },
        { id: "i18", word: "hurry up", target: "Go / Come", vi: "nhanh lên (come on)" },
        { id: "i19", word: "on (mặc vào)", target: "Put / Take", vi: "put on" },
        { id: "i20", word: "off (cởi ra)", target: "Put / Take", vi: "take off" },
        { id: "i21", word: "off (cất cánh)", target: "Put / Take", vi: "take off" },
        { id: "i22", word: "leave the ground", target: "Put / Take", vi: "cất cánh (take off)" },
        { id: "i23", word: "remove shoes", target: "Put / Take", vi: "cởi giày (take off)" },
        { id: "i24", word: "wear a coat", target: "Put / Take", vi: "mặc áo (put on)" },
        { id: "i25", word: "up (cài áo)", target: "Do", vi: "do up" },
        { id: "i26", word: "up (trang trí nhà)", target: "Do", vi: "do up" },
        { id: "i27", word: "fasten a coat", target: "Do", vi: "cài nút (do up)" },
        { id: "i28", word: "repair a flat", target: "Do", vi: "sửa nhà (do up)" },
        { id: "i29", word: "decorate a room", target: "Do", vi: "trang trí (do up)" },
        { id: "i30", word: "zip up", target: "Do", vi: "kéo khóa (do up)" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Phân biệt giới từ)
    quiz: [
      { q: "1. It's dark in here. Turn _____ the lights.", options: ["on", "off", "up", "down"], a: "on" },
      { q: "2. Our plane takes _____ at 6.25 and lands at 7.50.", options: ["up", "on", "out", "off"], a: "off" },
      { q: "3. Come _____! It's time to get _____!", options: ["on / up", "in / out", "up / on", "over / up"], a: "on / up" },
      { q: "4. The children took _____ their school uniforms when they got home.", options: ["out", "off", "up", "on"], a: "off" },
      { q: "5. It's time to turn _____ the TV and go to bed now.", options: ["on", "up", "off", "down"], a: "off" },
      { q: "6. That teacher always gets _____ well with her students.", options: ["up", "on", "over", "in"], a: "on" },
      { q: "7. The students went _____ working until late at night.", options: ["on", "off", "up", "over"], a: "on" },
      { q: "8. When they got to the beach, he put _____ his swimming trunks.", options: ["off", "out", "on", "up"], a: "on" },
      { q: "9. She was very ill, but she got _____ it quickly.", options: ["on", "up", "over", "out"], a: "over" },
      { q: "10. The music is too loud. Please turn it _____.", options: ["off", "down", "up", "on"], a: "down" },
      { q: "11. I can't hear the radio. Turn it _____.", options: ["up", "down", "on", "off"], a: "up" },
      { q: "12. A bomb went _____ in a London station today.", options: ["on", "out", "off", "up"], a: "off" },
      { q: "13. It's cold outside. _____ your coat.", options: ["Take off", "Do up", "Put on", "Turn on"], a: "Do up" }, // Do up is correct context for cold, but Put on is also correct. Let's make options clearer.
      { q: "14. She didn't want to go to the party, so she turned _____ the invitation.", options: ["off", "down", "out", "away"], a: "down" },
      { q: "15. They bought an old house and _____ it up.", options: ["made", "did", "got", "took"], a: "did" },
      { q: "16. Which phrasal verb means 'to leave the ground'?", options: ["take off", "get up", "go off", "turn up"], a: "take off" },
      { q: "17. Which phrasal verb means 'to continue'?", options: ["go on", "get on", "come on", "put on"], a: "go on" },
      { q: "18. Which phrasal verb means 'to refuse'?", options: ["turn off", "turn down", "take off", "go off"], a: "turn down" },
      { q: "19. Which phrasal verb means 'to recover from an illness'?", options: ["get over", "get on", "get up", "go on"], a: "get over" },
      { q: "20. Which phrasal verb means 'to explode'?", options: ["go off", "take off", "turn off", "do up"], a: "go off" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền giới từ hoặc động từ)
    typingGame: [
      { q: "It's getting late. Turn _____ the TV and go to sleep.", hint: "o _ _", a: "off" },
      { q: "It's very cold today. Put _____ your coat.", hint: "o _", a: "on" },
      { q: "That funny programme is on soon. Turn _____ the TV.", hint: "o _", a: "on" },
      { q: "Her boyfriend left her, but she got _____ it quickly.", hint: "o _ _ r", a: "over" },
      { q: "I'm trying to work. Please turn the music _____.", hint: "d _ _ n", a: "down" },
      { q: "The flat is quite old, but we can ______ it up nicely.", hint: "d _", a: "do" },
      { q: "I don't want to accept that job. I will turn it _____.", hint: "d _ _ n", a: "down" },
      { q: "Our plane ______ off at 12:30.", hint: "t _ _ _ s", a: "takes" },
      { q: "Don't stop. ______ on talking. It's interesting.", hint: "G _", a: "Go" },
      { q: "A bomb went ______ in the station.", hint: "o _ _", a: "off" },
      { q: "______ on! We are late.", hint: "C _ _ e", a: "Come" },
      { q: "I ______ up at 6.30 this morning.", hint: "g _ t", a: "got" },
      { q: "I hated my sister, but now we get ______ very well.", hint: "o _", a: "on" },
      { q: "Turn the TV ______. I can't hear it.", hint: "u _", a: "up" },
      { q: "She ______ off her shoes because her feet hurt.", hint: "t _ _ k", a: "took" },
      { q: "She ______ up her coat because it was cold.", hint: "d _ d", a: "did" },
      { q: "He soon ______ over his cold.", hint: "g _ t", a: "got" },
      { q: "The children ______ off their uniforms.", hint: "t _ _ k", a: "took" },
      { q: "When they got to the beach, he ______ on his swimming trunks.", hint: "p _ t", a: "put" },
      { q: "The students went ______ working until late.", hint: "o _", a: "on" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "I hated my sister when I was young but now we get on very well.", trans: "Tôi rất ghét chị gái khi còn nhỏ nhưng bây giờ chúng tôi rất hòa thuận." },
      { text: "He always turns on the TV at 9 o'clock to watch the news.", trans: "Anh ấy luôn bật tivi lúc 9 giờ để xem tin tức." },
      { text: "Don't stop. Go on talking. It's very interesting.", trans: "Đừng dừng lại. Hãy tiếp tục nói đi. Nó rất thú vị." },
      { text: "Our plane takes off at half past twelve.", trans: "Máy bay của chúng tôi cất cánh lúc 12 rưỡi." },
      { text: "It's cold and windy outside. Put your coat on.", trans: "Bên ngoài trời lạnh và có gió. Hãy mặc áo khoác vào." }
    ]
  },

  {
    id: 12,
    title: "Unit 12: Everyday things",
    description: "Học cách mô tả các hoạt động thường ngày (thức dậy, ăn sáng, đi làm, xem tivi, làm việc nhà) và cách hỏi đáp về tần suất của các thói quen.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Things we do every day (Những việc làm mỗi ngày)",
        items: [
          { word: "wake up", type: "Hoạt động", phonetic: "/weɪk ʌp/", vi: "Tỉnh giấc.", example: "I usually wake up at 7 o'clock." },
          { word: "get up", type: "Hoạt động", phonetic: "/ɡet ʌp/", vi: "Thức dậy, rời khỏi giường.", example: "I get up at 7.15." },
          { word: "go to the bathroom", type: "Hoạt động", phonetic: "/ɡoʊ tuː ðə ˈbæθ.ruːm/", vi: "Đi vệ sinh.", example: "I go to the bathroom and have a shower." },
          { word: "have a shower", type: "Hoạt động", phonetic: "/hæv ə ˈʃaʊ.ɚ/", vi: "Tắm vòi sen.", example: "I always have a shower in the morning." },
          { word: "have breakfast", type: "Hoạt động", phonetic: "/hæv ˈbrek.fəst/", vi: "Ăn sáng.", example: "I have breakfast at 7.30." },
          { word: "listen to the radio", type: "Hoạt động", phonetic: "/ˈlɪs.ən tuː ðə ˈreɪ.di.oʊ/", vi: "Nghe đài.", example: "I listen to the radio in the kitchen." },
          { word: "go to work", type: "Hoạt động", phonetic: "/ɡoʊ tuː wɝːk/", vi: "Đi làm.", example: "I go to work by bus." },
          { word: "come home", type: "Hoạt động", phonetic: "/kʌm hoʊm/", vi: "Về nhà.", example: "I come home at 6 o'clock." },
          { word: "make dinner", type: "Hoạt động", phonetic: "/meɪk ˈdɪn.ɚ/", vi: "Nấu bữa tối.", example: "I make dinner for my family." },
          { word: "phone a friend", type: "Hoạt động", phonetic: "/foʊn ə frend/", vi: "Gọi điện cho bạn bè (= call a friend).", example: "I phone a friend in the evening." },
          { word: "watch TV", type: "Hoạt động", phonetic: "/wɑːtʃ ˌtiːˈviː/", vi: "Xem tivi.", example: "I watch TV for an hour." },
          { word: "go to bed", type: "Hoạt động", phonetic: "/ɡoʊ tuː bed/", vi: "Đi ngủ.", example: "I go to bed at 11 o'clock." }
        ]
      },
      {
        heading: "B. Sometimes I... (Thỉnh thoảng tôi...)",
        items: [
          { word: "wash clothes", type: "Hoạt động", phonetic: "/wɑːʃ kloʊðz/", vi: "Giặt quần áo.", example: "I wash clothes at the weekend." },
          { word: "clean the house", type: "Hoạt động", phonetic: "/kliːn ðə haʊs/", vi: "Dọn dẹp nhà cửa.", example: "I clean the house on Saturday." },
          { word: "go for a walk", type: "Hoạt động", phonetic: "/ɡoʊ fɔːr ə wɑːk/", vi: "Đi dạo.", example: "On Sunday I go for a walk." },
          { word: "write letters", type: "Hoạt động", phonetic: "/raɪt ˈlet̬.ɚz/", vi: "Viết thư.", example: "Sometimes I write letters to my friends." }
        ]
      },
      {
        heading: "C & D. Questions & Adverbs (Hỏi tần suất & Trạng từ)",
        items: [
          { word: "How often...?", type: "Câu hỏi", phonetic: "/haʊ ˈɑːf.ən/", vi: "Bao lâu một lần? (Hỏi về tần suất).", example: "How often do you watch TV? - Every day." },
          { word: "What time...?", type: "Câu hỏi", phonetic: "/wɑːt taɪm/", vi: "Mấy giờ? (Hỏi thời gian cụ thể).", example: "What time do you get up? - Seven o'clock." },
          { word: "How do you...?", type: "Câu hỏi", phonetic: "/haʊ duː juː/", vi: "Bằng phương tiện gì? Làm như thế nào?", example: "How do you go to work? - By bus." },
          { word: "usually / normally", type: "Trạng từ", phonetic: "/ˈjuː.ʒu.ə.li/ /ˈnɔːr.mə.li/", vi: "Thường xuyên, thông thường.", example: "I normally get up at eight o'clock, but today I got up at 8:30." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo thời điểm và loại hoạt động)
    dragDrop: {
      buckets: ["Morning", "Evening & Night", "Housework", "Leisure", "Questions"],
      items: [
        { id: "i1", word: "wake up", target: "Morning", vi: "tỉnh giấc" },
        { id: "i2", word: "get up", target: "Morning", vi: "thức dậy" },
        { id: "i3", word: "have a shower", target: "Morning", vi: "tắm vòi sen" },
        { id: "i4", word: "have breakfast", target: "Morning", vi: "ăn sáng" },
        { id: "i5", word: "go to work", target: "Morning", vi: "đi làm" },
        { id: "i6", word: "listen to the radio", target: "Morning", vi: "nghe đài" },
        { id: "i7", word: "come home", target: "Evening & Night", vi: "về nhà" },
        { id: "i8", word: "make dinner", target: "Evening & Night", vi: "nấu bữa tối" },
        { id: "i9", word: "have dinner", target: "Evening & Night", vi: "ăn bữa tối" },
        { id: "i10", word: "go to bed", target: "Evening & Night", vi: "đi ngủ" },
        { id: "i11", word: "sleep well", target: "Evening & Night", vi: "ngủ ngon" },
        { id: "i12", word: "get undressed", target: "Evening & Night", vi: "cởi quần áo đi ngủ" },
        { id: "i13", word: "wash clothes", target: "Housework", vi: "giặt quần áo" },
        { id: "i14", word: "clean the house", target: "Housework", vi: "dọn dẹp nhà" },
        { id: "i15", word: "do the washing", target: "Housework", vi: "làm việc giặt giũ" },
        { id: "i16", word: "do the housework", target: "Housework", vi: "làm việc nhà" },
        { id: "i17", word: "do the washing-up", target: "Housework", vi: "rửa bát" },
        { id: "i18", word: "vacuum the floor", target: "Housework", vi: "hút bụi sàn nhà" },
        { id: "i19", word: "go for a walk", target: "Leisure", vi: "đi dạo" },
        { id: "i20", word: "write letters", target: "Leisure", vi: "viết thư" },
        { id: "i21", word: "phone a friend", target: "Leisure", vi: "gọi bạn bè" },
        { id: "i22", word: "watch TV", target: "Leisure", vi: "xem tivi" },
        { id: "i23", word: "read the newspaper", target: "Leisure", vi: "đọc báo" },
        { id: "i24", word: "relax", target: "Leisure", vi: "thư giãn" },
        { id: "i25", word: "How often...?", target: "Questions", vi: "bao lâu một lần" },
        { id: "i26", word: "What time...?", target: "Questions", vi: "mấy giờ" },
        { id: "i27", word: "How do you...?", target: "Questions", vi: "bằng cách nào" },
        { id: "i28", word: "usually", target: "Questions", vi: "thường xuyên" },
        { id: "i29", word: "normally", target: "Questions", vi: "thông thường" },
        { id: "i30", word: "every day", target: "Questions", vi: "mỗi ngày" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Từ vựng thói quen hàng ngày)
    quiz: [
      { q: "1. What is the first thing you do in the morning?", options: ["go to bed", "wake up", "make dinner", "clean the house"], a: "wake up" },
      { q: "2. I go to the bathroom and have a _____.", options: ["breakfast", "walk", "shower", "TV"], a: "shower" },
      { q: "3. After my shower, I _____ breakfast.", options: ["make", "have", "do", "wash"], a: "have" },
      { q: "4. I _____ to the radio while I eat breakfast.", options: ["watch", "hear", "listen", "see"], a: "listen" },
      { q: "5. Then I _____ to work by bus.", options: ["go", "have", "make", "do"], a: "go" },
      { q: "6. I _____ home at 6 o'clock in the evening.", options: ["go to", "arrive to", "come", "reach to"], a: "come" },
      { q: "7. In the evening, I _____ dinner for my family.", options: ["do", "have", "make", "clean"], a: "make" },
      { q: "8. After dinner, I sit on the sofa and _____ TV.", options: ["look", "see", "watch", "listen"], a: "watch" },
      { q: "9. I _____ a friend to talk about my day.", options: ["phone", "speak", "say", "listen"], a: "phone" },
      { q: "10. Finally, at 11 o'clock, I _____ to bed.", options: ["come", "go", "have", "make"], a: "go" },
      { q: "11. On Saturdays, I _____ clothes in the washing machine.", options: ["clean", "wash", "make", "do"], a: "wash" },
      { q: "12. I also _____ the house on the weekend.", options: ["wash", "clean", "do", "make"], a: "clean" },
      { q: "13. On Sunday afternoon, I go for a _____ in the park.", options: ["walk", "walking", "walks", "walker"], a: "walk" },
      { q: "14. Sometimes I _____ letters to my friends abroad.", options: ["read", "write", "make", "do"], a: "write" },
      { q: "15. _____ do you read the newspaper? - Every day.", options: ["How often", "What time", "How", "When"], a: "How often" },
      { q: "16. _____ do you get up? - Half past eight.", options: ["How often", "What time", "How", "Where"], a: "What time" },
      { q: "17. _____ do you go to work? - By train.", options: ["How often", "What time", "How", "Why"], a: "How" },
      { q: "18. I _____ get up at eight o'clock, but today I got up at nine.", options: ["used to", "normally", "am used to", "never"], a: "normally" },
      { q: "19. Which sentence is correct?", options: ["I used to get up at 7 every day.", "I normally get up at 7 every day.", "I'm used to get up at 7 every day.", "I use to get up at 7 every day."], a: "I normally get up at 7 every day." },
      { q: "20. What is another way to say 'call a friend'?", options: ["phone a friend", "speak a friend", "talk a friend", "say a friend"], a: "phone a friend" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền khuyết)
    typingGame: [
      { q: "I open my eyes: I ______ up.", hint: "w _ _ e", a: "wake" },
      { q: "I get out of bed: I ______ up.", hint: "g _ t", a: "get" },
      { q: "I go to the bathroom and have a ______.", hint: "s _ _ _ _ r", a: "shower" },
      { q: "I eat in the morning: I ______ breakfast.", hint: "h _ _ e", a: "have" },
      { q: "I hear the news: I ______ to the radio.", hint: "l _ _ _ _ n", a: "listen" },
      { q: "I travel to my job: I go to ______.", hint: "w _ _ k", a: "work" },
      { q: "I return to my house: I ______ home.", hint: "c _ _ e", a: "come" },
      { q: "I prepare the evening meal: I ______ dinner.", hint: "m _ _ e", a: "make" },
      { q: "I look at programmes: I ______ TV.", hint: "w _ _ _ h", a: "watch" },
      { q: "I sleep: I go to ______.", hint: "b _ d", a: "bed" },
      { q: "I clean my dirty shirts: I ______ clothes.", hint: "w _ _ h", a: "wash" },
      { q: "I tidy my rooms: I ______ the house.", hint: "c _ _ _ n", a: "clean" },
      { q: "I stroll outside: I go for a ______.", hint: "w _ _ k", a: "walk" },
      { q: "I send messages on paper: I ______ letters.", hint: "w _ _ _ e", a: "write" },
      { q: "I speak to a friend: I ______ a friend.", hint: "p _ _ _ e", a: "phone" },
      { q: "______ often do you watch TV? (Bao lâu 1 lần)", hint: "H _ w", a: "How" },
      { q: "______ time do you get up? (Mấy giờ)", hint: "W _ _ t", a: "What" },
      { q: "______ do you go to work? - By bus.", hint: "H _ w", a: "How" },
      { q: "I ______ get up at 8:00. (= usually)", hint: "n _ _ _ _ _ _ y", a: "normally" },
      { q: "I ______ get up at 8:00. (= normally)", hint: "u _ _ _ _ _ y", a: "usually" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "I normally get up at eight o'clock, but today I got up at half past eight.", trans: "Tôi thường thức dậy lúc 8 giờ, nhưng hôm nay tôi đã dậy lúc 8 giờ rưỡi." },
      { text: "I go to the bathroom and have a shower.", trans: "Tôi đi vào phòng tắm và tắm vòi sen." },
      { text: "How often do you read the newspaper?", trans: "Bạn có thường xuyên đọc báo không?" },
      { text: "What time do you go to work? I go at half past eight.", trans: "Bạn đi làm lúc mấy giờ? Tôi đi lúc 8 rưỡi." },
      { text: "Sometimes I go for a walk or write letters to my friends.", trans: "Thỉnh thoảng tôi đi dạo hoặc viết thư cho bạn bè." }
    ]
  },
  {
    id: 13,
    title: "Unit 13: Talking",
    description: "Học cách phân biệt và sử dụng chính xác các động từ giao tiếp rất dễ nhầm lẫn: say, tell, ask, speak, talk, answer, và reply.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Say (Nói, phát biểu)",
        items: [
          { word: "say / said", type: "Động từ", phonetic: "/seɪ/ /sed/", vi: "Dùng để thuật lại lời ai đó nói hoặc hỏi về ngôn ngữ.", example: "She said 'This is horrible!' / He said that he wanted a drink." },
          { word: "say in a language", type: "Cụm từ", phonetic: "/seɪ ɪn ə ˈlæŋ.ɡwɪdʒ/", vi: "Nói/đọc một từ trong ngôn ngữ nào đó.", example: "How do you say 'book' in Spanish? - 'Libro'." },
          { word: "say hello / goodbye", type: "Cụm từ", phonetic: "/seɪ həˈloʊ/", vi: "Nói xin chào / tạm biệt.", example: "I must go now. I just want to say goodbye." },
          { word: "say please / thank you", type: "Cụm từ", phonetic: "/seɪ pliːz/", vi: "Nói làm ơn / cảm ơn.", example: "Always say please and thank you." },
          { word: "say congratulations", type: "Cụm từ", phonetic: "/seɪ kənˌɡrætʃ.əˈleɪ.ʃənz/", vi: "Nói lời chúc mừng.", example: "She passed her exam, so I said congratulations." }
        ]
      },
      {
        heading: "B. Tell (Kể, bảo, cho biết)",
        items: [
          { word: "tell someone", type: "Ngữ pháp", phonetic: "/tel/", vi: "Tell THƯỜNG đi ngay với một người (me, you, him, her...). Say KHÔNG đi ngay với người.", example: "He told me his name. [KHÔNG DÙNG: He said me his name]" },
          { word: "tell someone how/where/why", type: "Cấu trúc", phonetic: "/tel/", vi: "Chỉ đường, giải thích cách làm hoặc lý do.", example: "Can you tell me where the bus station is? / He told me how to send a fax." },
          { word: "tell the time", type: "Cụm từ", phonetic: "/tel ðə taɪm/", vi: "Cho biết mấy giờ rồi.", example: "Excuse me, can you tell me the time?" },
          { word: "tell a story / a joke", type: "Cụm từ", phonetic: "/tel ə ˈstɔːr.i/", vi: "Kể một câu chuyện / Kể một câu chuyện đùa.", example: "Please, tell me a story." },
          { word: "tell your name / address", type: "Cụm từ", phonetic: "/tel jɔːr neɪm/", vi: "Cho biết tên / địa chỉ.", example: "He told me his address." }
        ]
      },
      {
        heading: "C. Ask (Hỏi, yêu cầu)",
        items: [
          { word: "ask a question", type: "Cụm từ", phonetic: "/æsk ə ˈkwes.tʃən/", vi: "Đặt câu hỏi.", example: "Can I ask you a question?" },
          { word: "ask the way / the time", type: "Cụm từ", phonetic: "/æsk ðə weɪ/", vi: "Hỏi đường / Hỏi giờ.", example: "I asked him the way to the station." },
          { word: "ask someone to do something", type: "Cấu trúc", phonetic: "/æsk tuː duː/", vi: "Yêu cầu ai đó làm gì.", example: "I asked him to turn off his radio." },
          { word: "ask for something", type: "Cụm từ", phonetic: "/æsk fɔːr/", vi: "Yêu cầu món đồ gì đó (ví dụ: the bill - hóa đơn).", example: "She asked for the bill." }
        ]
      },
      {
        heading: "D. Speak / talk / answer / reply",
        items: [
          { word: "speak a language", type: "Cụm từ", phonetic: "/spiːk/", vi: "Nói một ngôn ngữ.", example: "Do you speak Japanese? [KHÔNG DÙNG: Do you talk Japanese?]" },
          { word: "talk to someone", type: "Cụm từ", phonetic: "/tɑːk tuː/", vi: "Trò chuyện, nói chuyện với ai.", example: "I like talking to you." },
          { word: "answer the telephone / door", type: "Cụm từ", phonetic: "/ˈæn.sɚ/", vi: "Nhấc máy nghe điện thoại / Ra mở cửa khi có người gõ.", example: "Can you answer the telephone, please?" },
          { word: "reply to a letter", type: "Cụm từ", phonetic: "/rɪˈplaɪ/", vi: "Hồi âm (thư từ, email, fax).", example: "I wrote a letter to him but he did not reply." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ)
    dragDrop: {
      buckets: ["Say", "Tell", "Ask (for)", "Speak / Talk", "Answer / Reply"],
      items: [
        { id: "i1", word: "hello / goodbye", target: "Say", vi: "nói xin chào / tạm biệt" },
        { id: "i2", word: "please / thank you", target: "Say", vi: "nói làm ơn / cảm ơn" },
        { id: "i3", word: "Happy Birthday", target: "Say", vi: "nói chúc mừng sinh nhật" },
        { id: "i4", word: "Merry Christmas", target: "Say", vi: "nói Giáng sinh vui vẻ" },
        { id: "i5", word: "Congratulations", target: "Say", vi: "nói lời chúc mừng" },
        { id: "i6", word: "a word in Spanish", target: "Say", vi: "nói một từ bằng tiếng TBN" },
        { id: "i7", word: "me your name", target: "Tell", vi: "nói cho tôi biết tên" },
        { id: "i8", word: "someone the time", target: "Tell", vi: "cho ai biết giờ" },
        { id: "i9", word: "a story", target: "Tell", vi: "kể một câu chuyện" },
        { id: "i10", word: "a joke", target: "Tell", vi: "kể một chuyện đùa" },
        { id: "i11", word: "me how to do it", target: "Tell", vi: "chỉ tôi cách làm" },
        { id: "i12", word: "me where the hotel is", target: "Tell", vi: "chỉ tôi khách sạn ở đâu" },
        { id: "i13", word: "a question", target: "Ask (for)", vi: "đặt câu hỏi" },
        { id: "i14", word: "the way", target: "Ask (for)", vi: "hỏi đường" },
        { id: "i15", word: "him to turn off the radio", target: "Ask (for)", vi: "bảo anh ấy tắt đài" },
        { id: "i16", word: "the bill", target: "Ask (for)", vi: "yêu cầu hóa đơn" },
        { id: "i17", word: "someone to help you", target: "Ask (for)", vi: "nhờ ai giúp đỡ" },
        { id: "i18", word: "for some money", target: "Ask (for)", vi: "xin một ít tiền" },
        { id: "i19", word: "Japanese", target: "Speak / Talk", vi: "nói tiếng Nhật" },
        { id: "i20", word: "English well", target: "Speak / Talk", vi: "nói tiếng Anh giỏi" },
        { id: "i21", word: "to a friend", target: "Speak / Talk", vi: "nói chuyện với bạn" },
        { id: "i22", word: "about the problem", target: "Speak / Talk", vi: "nói về vấn đề" },
        { id: "i23", word: "to the boss", target: "Speak / Talk", vi: "nói chuyện với sếp" },
        { id: "i24", word: "very quickly", target: "Speak / Talk", vi: "nói rất nhanh" },
        { id: "i25", word: "the telephone", target: "Answer / Reply", vi: "trả lời điện thoại" },
        { id: "i26", word: "the door", target: "Answer / Reply", vi: "ra mở cửa" },
        { id: "i27", word: "a letter", target: "Answer / Reply", vi: "hồi âm thư" },
        { id: "i28", word: "an email", target: "Answer / Reply", vi: "hồi âm email" },
        { id: "i29", word: "the question", target: "Answer / Reply", vi: "trả lời câu hỏi" },
        { id: "i30", word: "to his fax", target: "Answer / Reply", vi: "hồi đáp fax của anh ấy" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 13.1 đến 13.4)
    quiz: [
      { q: "1. Which is correct?", options: ["He said me his name.", "He told me his name.", "He asked me his name.", "He spoke me his name."], a: "He told me his name." },
      { q: "2. Can you _____ me where the Plaza Hotel is, please?", options: ["say", "tell", "speak", "talk"], a: "tell" },
      { q: "3. 'Please, _____ me a story,' the little boy said.", options: ["say", "tell", "speak", "talk"], a: "tell" },
      { q: "4. 'Come here!' the police officer _____.", options: ["told", "said", "spoke", "asked"], a: "said" },
      { q: "5. The teacher _____ that the students were very good.", options: ["said", "told", "spoke", "talked"], a: "said" },
      { q: "6. I must go now. I just want to _____ goodbye.", options: ["tell", "say", "speak", "talk"], a: "say" },
      { q: "7. You want to know the word for 'tree' in German. You ask: 'How do you _____ tree in German?'", options: ["say", "tell", "speak", "talk"], a: "say" },
      { q: "8. Excuse me, can you _____ me the time?", options: ["say", "tell", "speak", "talk"], a: "tell" },
      { q: "9. I want to _____ for the bill in the restaurant.", options: ["say", "tell", "ask", "speak"], a: "ask" },
      { q: "10. Do you _____ Japanese?", options: ["say", "tell", "speak", "talk"], a: "speak" },
      { q: "11. The phone is ringing! Can you _____ the telephone, please?", options: ["reply", "answer", "speak", "say"], a: "answer" },
      { q: "12. Someone is knocking. Can you _____ the door, please?", options: ["open", "answer", "reply", "talk"], a: "answer" },
      { q: "13. I wrote a letter to him but he did not _____.", options: ["answer", "reply", "tell", "say"], a: "reply" },
      { q: "14. My sister _____ me where I was going.", options: ["said", "spoke", "asked", "talked"], a: "asked" },
      { q: "15. He _____ me how to send a fax.", options: ["said", "told", "spoke", "answered"], a: "told" },
      { q: "16. Which is correct?", options: ["Tell me a joke.", "Say me a joke.", "Speak me a joke.", "Talk me a joke."], a: "Tell me a joke." },
      { q: "17. You met a friend on Jan 1st. What do you say?", options: ["Congratulations", "Happy New Year", "Happy Birthday", "Merry Christmas"], a: "Happy New Year" },
      { q: "18. A friend passed their driving test. What do you say?", options: ["Happy Birthday", "Merry Christmas", "Congratulations", "Excuse me"], a: "Congratulations" },
      { q: "19. Which verb goes with 'a letter'?", options: ["say", "reply to", "tell", "talk"], a: "reply to" },
      { q: "20. I like _____ to you.", options: ["saying", "telling", "talking", "answering"], a: "talking" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền khuyết)
    typingGame: [
      { q: "She ______ 'This is horrible!'", hint: "s _ _ d", a: "said" },
      { q: "He ______ me his name. (Not said)", hint: "t _ _ d", a: "told" },
      { q: "How do you ______ 'book' in Spanish?", hint: "s _ y", a: "say" },
      { q: "Can you ______ me where the bus station is?", hint: "t _ _ l", a: "tell" },
      { q: "Please, ______ me a story.", hint: "t _ _ l", a: "tell" },
      { q: "Can I ______ you a question?", hint: "a _ k", a: "ask" },
      { q: "I ______ him to turn off his radio. (Requested)", hint: "a _ _ _ d", a: "asked" },
      { q: "After the meal, she asked ______ the bill.", hint: "f _ r", a: "for" },
      { q: "Do you ______ Japanese?", hint: "s _ _ _ k", a: "speak" },
      { q: "I like ______ to you. (Having a conversation)", hint: "t _ _ _ _ _ g", a: "talking" },
      { q: "Can you ______ the telephone, please? (Pick it up)", hint: "a _ _ _ _ r", a: "answer" },
      { q: "I wrote a letter to him but he did not ______.", hint: "r _ _ _ y", a: "reply" },
      { q: "I just want to ______ goodbye to her.", hint: "s _ y", a: "say" },
      { q: "The teacher ______ that the students were very good.", hint: "s _ _ d", a: "said" },
      { q: "Excuse me, can you ______ me the time?", hint: "t _ _ l", a: "tell" },
      { q: "Someone is knocking. Please answer the ______.", hint: "d _ _ r", a: "door" },
      { q: "He is very funny. He always tells me a ______.", hint: "j _ _ e", a: "joke" },
      { q: "It's Dec 25th. ______ Christmas!", hint: "M _ _ _ y", a: "Merry" },
      { q: "You passed the exam? ______! (Well done)", hint: "C _ _ _ _ _ _ _ _ _ _ _ _ s", a: "Congratulations" },
      { q: "She told me ______ to send a fax. (The way to do it)", hint: "h _ w", a: "how" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "Can you tell me where the bus station is, please?", trans: "Bạn có thể cho tôi biết trạm xe buýt ở đâu không, làm ơn?" },
      { text: "How do you say 'book' in Spanish?", trans: "Từ 'book' trong tiếng Tây Ban Nha nói như thế nào?" },
      { text: "I wrote a letter to him but he did not reply.", trans: "Tôi đã viết một lá thư cho anh ấy nhưng anh ấy không hồi âm." },
      { text: "Do you speak Japanese? I like talking to you.", trans: "Bạn có nói tiếng Nhật không? Tôi thích nói chuyện với bạn." },
      { text: "My sister asked me where I was going.", trans: "Chị gái tôi đã hỏi tôi là tôi đang đi đâu." }
    ]
  },

  {
    id: 14,
    title: "Unit 14: Moving",
    description: "Khám phá từ vựng về các hành động di chuyển (đi bộ, chạy, nhảy...), cách dùng giới từ và động từ chính xác với các phương tiện giao thông, và cách nói về việc bưng bê đồ vật.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Without transport (Di chuyển bằng cơ thể)",
        items: [
          { word: "walk / run / jog", type: "Hoạt động", phonetic: "/wɑːk/ /rʌn/ /dʒɑːɡ/", vi: "Đi bộ / Chạy / Chạy bộ thể dục (jogging).", example: "Jack likes jogging. Everyone runs round the park." },
          { word: "jump", type: "Hoạt động", phonetic: "/dʒʌmp/", vi: "Nhảy lên.", example: "He jumped over the wall." },
          { word: "dance", type: "Hoạt động", phonetic: "/dæns/", vi: "Khiêu vũ, nhảy múa.", example: "They danced at the party last night." },
          { word: "swim", type: "Hoạt động", phonetic: "/swɪm/", vi: "Bơi.", example: "James can swim very fast." },
          { word: "climb", type: "Hoạt động", phonetic: "/klaɪm/", vi: "Leo trèo.", example: "Robert loves climbing hills." },
          { word: "fall", type: "Hoạt động", phonetic: "/fɑːl/", vi: "Ngã, té.", example: "The old lady fell on her way home and broke her arm." }
        ]
      },
      {
        heading: "B & C. Transport & Verbs (Phương tiện và Động từ)",
        items: [
          { word: "go by...", type: "Cụm từ", phonetic: "/ɡoʊ baɪ/", vi: "Đi bằng (car / plane / bus / train / bike / ship / taxi / underground).", example: "I prefer to go by bus than by car. [KHÔNG DÙNG: by a car]" },
          { word: "take a...", type: "Cụm từ", phonetic: "/teɪk ə/", vi: "Bắt chuyến (bus / train / taxi / plane / the underground).", example: "I usually take a taxi when it rains." },
          { word: "ride a...", type: "Cụm từ", phonetic: "/raɪd ə/", vi: "Cưỡi, lái (bicycle / bike / motorbike / horse / elephant).", example: "Can you ride a motorbike?" },
          { word: "drive a...", type: "Cụm từ", phonetic: "/draɪv ə/", vi: "Lái xe (car / bus / train / lorry).", example: "He drives a lorry." },
          { word: "fly a...", type: "Cụm từ", phonetic: "/flaɪ ə/", vi: "Lái máy bay (Dành cho phi công) / Đi máy bay.", example: "The pilot flies a plane. / We flew to Istanbul." }
        ]
      },
      {
        heading: "Arrive, Catch & Miss (Đến nơi và Lỡ chuyến)",
        items: [
          { word: "arrive in / at", type: "Giới từ", phonetic: "/əˈraɪv/", vi: "Đến nơi. Dùng 'in' cho thành phố/quốc gia, 'at' cho địa điểm nhỏ. [KHÔNG DÙNG: arrive to].", example: "The train arrived in Tokyo on time. The plane arrived at Heathrow." },
          { word: "catch", type: "Động từ", phonetic: "/kætʃ/", vi: "Bắt kịp (xe buýt, tàu, máy bay) - đến đủ sớm để lên xe.", example: "Bill catches the 9.45 train to London every day." },
          { word: "miss", type: "Động từ", phonetic: "/mɪs/", vi: "Lỡ chuyến - đến quá muộn.", example: "If you miss the bus, you arrive too late to get it." }
        ]
      },
      {
        heading: "D. Moving objects (Di chuyển đồ vật)",
        items: [
          { word: "pass", type: "Động từ", phonetic: "/pæs/", vi: "Đưa cho, chuyền tay (thường dùng trên bàn ăn).", example: "Please pass the salt." },
          { word: "carry", type: "Động từ", phonetic: "/ˈker.i/", vi: "Mang, vác, xách.", example: "Can I help you carry your luggage?" },
          { word: "pull / push", type: "Động từ", phonetic: "/pʊl/ /pʊʃ/", vi: "Kéo vào / Đẩy ra (thường thấy trên cửa).", example: "Pull the door to open it." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ)
    dragDrop: {
      buckets: ["Body actions", "Go by...", "Take a...", "Ride a...", "Drive a..."],
      items: [
        { id: "i1", word: "walk", target: "Body actions", vi: "đi bộ" },
        { id: "i2", word: "run", target: "Body actions", vi: "chạy" },
        { id: "i3", word: "jump", target: "Body actions", vi: "nhảy" },
        { id: "i4", word: "dance", target: "Body actions", vi: "khiêu vũ" },
        { id: "i5", word: "swim", target: "Body actions", vi: "bơi" },
        { id: "i6", word: "climb", target: "Body actions", vi: "leo trèo" },
        { id: "i7", word: "jog", target: "Body actions", vi: "chạy bộ" },
        { id: "i8", word: "fall", target: "Body actions", vi: "té ngã" },
        { id: "i9", word: "car", target: "Go by...", vi: "bằng ô tô" },
        { id: "i10", word: "plane", target: "Go by...", vi: "bằng máy bay" },
        { id: "i11", word: "bus (by)", target: "Go by...", vi: "bằng xe buýt" },
        { id: "i12", word: "train (by)", target: "Go by...", vi: "bằng tàu hỏa" },
        { id: "i13", word: "ship", target: "Go by...", vi: "bằng tàu thủy" },
        { id: "i14", word: "underground (by)", target: "Go by...", vi: "bằng tàu điện ngầm" },
        { id: "i15", word: "bus (take)", target: "Take a...", vi: "bắt xe buýt" },
        { id: "i16", word: "train (take)", target: "Take a...", vi: "bắt tàu" },
        { id: "i17", word: "taxi", target: "Take a...", vi: "bắt taxi" },
        { id: "i18", word: "plane (take)", target: "Take a...", vi: "bắt máy bay" },
        { id: "i19", word: "the underground", target: "Take a...", vi: "đi tàu điện ngầm" },
        { id: "i20", word: "a shower", target: "Take a...", vi: "tắm (take a shower)" },
        { id: "i21", word: "bicycle", target: "Ride a...", vi: "cưỡi xe đạp" },
        { id: "i22", word: "bike", target: "Ride a...", vi: "cưỡi xe đạp" },
        { id: "i23", word: "motorbike", target: "Ride a...", vi: "cưỡi xe máy" },
        { id: "i24", word: "horse", target: "Ride a...", vi: "cưỡi ngựa" },
        { id: "i25", word: "elephant", target: "Ride a...", vi: "cưỡi voi" },
        { id: "i26", word: "camel", target: "Ride a...", vi: "cưỡi lạc đà" },
        { id: "i27", word: "car (drive)", target: "Drive a...", vi: "lái ô tô" },
        { id: "i28", word: "bus (drive)", target: "Drive a...", vi: "lái xe buýt" },
        { id: "i29", word: "train (drive)", target: "Drive a...", vi: "lái tàu" },
        { id: "i30", word: "lorry", target: "Drive a...", vi: "lái xe tải" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 14.1 đến 14.5)
    quiz: [
      { q: "1. Jack likes _____ around the park every morning.", options: ["jogging", "swimming", "driving", "falling"], a: "jogging" },
      { q: "2. The old lady _____ on her way home and broke her arm.", options: ["climbed", "jumped", "fell", "danced"], a: "fell" },
      { q: "3. James can _____ very fast in the pool.", options: ["run", "swim", "jump", "climb"], a: "swim" },
      { q: "4. Sandra _____ into the pool from the other side.", options: ["jumped", "danced", "jogged", "fell"], a: "jumped" },
      { q: "5. Can you _____ a motorbike?", options: ["drive", "ride", "go", "take"], a: "ride" },
      { q: "6. He works for a railway company. He _____ a train.", options: ["rides", "drives", "takes", "goes"], a: "drives" },
      { q: "7. She sometimes _____ the underground to work.", options: ["takes", "drives", "rides", "goes"], a: "takes" },
      { q: "8. He goes away from home a lot. He _____ a lorry.", options: ["drives", "rides", "takes", "flies"], a: "drives" },
      { q: "9. I prefer to go _____ bus than _____ car.", options: ["by / by", "on / in", "take / drive", "by / in"], a: "by / by" },
      { q: "10. You never forget how to _____ a bicycle.", options: ["drive", "ride", "take", "make"], a: "ride" },
      { q: "11. The train arrived _____ Tokyo on time.", options: ["to", "in", "at", "on"], a: "in" },
      { q: "12. The plane arrived late _____ Heathrow.", options: ["to", "at", "in", "on"], a: "at" },
      { q: "13. If you arrive in time to get the bus, you _____ the bus.", options: ["catch", "miss", "lose", "take"], a: "catch" },
      { q: "14. If you arrive too late to get the bus, you _____ the bus.", options: ["lose", "miss", "catch", "drop"], a: "miss" },
      { q: "15. Please _____ the salt.", options: ["carry", "push", "pass", "pull"], a: "pass" },
      { q: "16. Can I help you _____ your luggage?", options: ["carry", "pass", "push", "fly"], a: "carry" },
      { q: "17. The pilot _____ a plane.", options: ["drives", "rides", "takes", "flies"], a: "flies" },
      { q: "18. What is the past tense of 'run'?", options: ["runned", "ran", "running", "run"], a: "ran" },
      { q: "19. What is the past tense of 'catch'?", options: ["catched", "caught", "cot", "catch"], a: "caught" },
      { q: "20. What is the past tense of 'drive'?", options: ["drived", "drove", "driven", "draves"], a: "drove" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền khuyết)
    typingGame: [
      { q: "To move on your feet quickly: r _ n", hint: "r _ n", a: "run" },
      { q: "To move on your feet very quickly for exercise: j _ g", hint: "j _ g", a: "jog" },
      { q: "To go up a mountain: c _ _ _ b", hint: "c _ _ _ b", a: "climb" },
      { q: "To drop to the ground accidentally: f _ _ l", hint: "f _ _ l", a: "fall" },
      { q: "Past tense of fall: f _ _ l", hint: "f _ _ l", a: "fell" },
      { q: "Past tense of run: r _ n", hint: "r _ n", a: "ran" },
      { q: "Past tense of catch: c _ _ _ _ t", hint: "c _ _ _ _ t", a: "caught" },
      { q: "Past tense of drive: d _ _ _ e", hint: "d _ _ _ e", a: "drove" },
      { q: "You ______ a car/bus/train (control the machine).", hint: "d _ _ _ e", a: "drive" },
      { q: "You ______ a bicycle/motorbike/horse (sit on it).", hint: "r _ _ e", a: "ride" },
      { q: "You ______ a taxi/bus/train (be a passenger).", hint: "t _ _ e", a: "take" },
      { q: "I go to work ______ car. (preposition)", hint: "b _", a: "by" },
      { q: "The pilot ______ a plane.", hint: "f _ _ _ s", a: "flies" },
      { q: "We ______ to Istanbul. (past tense of fly)", hint: "f _ _ w", a: "flew" },
      { q: "If you arrive in time, you ______ the bus.", hint: "c _ _ _ h", a: "catch" },
      { q: "If you arrive too late, you ______ the bus.", hint: "m _ _ s", a: "miss" },
      { q: "The train arrived ______ Tokyo on time.", hint: "i _", a: "in" },
      { q: "Please ______ the salt. (at the dinner table)", hint: "p _ _ s", a: "pass" },
      { q: "Can I help you ______ your luggage? (hold and move)", hint: "c _ _ _ y", a: "carry" },
      { q: "To open a door, you either PUSH or ______.", hint: "P _ _ L", a: "PULL" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "I prefer to go by bus than by car.", trans: "Tôi thích đi bằng xe buýt hơn là bằng ô tô." },
      { text: "He works for a railway company. He drives a train.", trans: "Anh ấy làm việc cho một công ty đường sắt. Anh ấy lái tàu." },
      { text: "Can I help you carry your luggage?", trans: "Tôi có thể giúp bạn xách hành lý không?" },
      { text: "The old lady fell on her way home and broke her arm.", trans: "Bà cụ đã bị ngã trên đường về nhà và bị gãy tay." },
      { text: "If you miss the bus, you arrive too late to get it.", trans: "Nếu bạn lỡ xe buýt, tức là bạn đến quá muộn để bắt được nó." }
    ]
  },
  {
    id: 15,
    title: "Unit 15: Conjunctions and connecting words",
    description: "Học cách sử dụng các liên từ và từ nối để ghép các vế câu lại với nhau. Chúng giúp thể hiện lý do, kết quả, sự đối lập, hoặc bổ sung thêm thông tin.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Basic conjunctions (Các liên từ cơ bản)",
        items: [
          { word: "and", type: "Liên từ", phonetic: "/ænd/", vi: "Và (Dùng để thêm thông tin).", example: "We went home and went straight to bed." },
          { word: "but", type: "Liên từ", phonetic: "/bʌt/", vi: "Nhưng (Dùng để tạo sự đối lập).", example: "They are rich but they aren't happy." },
          { word: "because", type: "Liên từ", phonetic: "/bɪˈkɑːz/", vi: "Bởi vì (Trả lời cho câu hỏi Tại sao / Chỉ lý do).", example: "We went home because we were tired." },
          { word: "so", type: "Liên từ", phonetic: "/soʊ/", vi: "Vì vậy, cho nên (Chỉ kết quả).", example: "We went home early, so we missed the end of the concert." },
          { word: "when", type: "Liên từ", phonetic: "/wen/", vi: "Khi, vào lúc (Trả lời câu hỏi Khi nào).", example: "We went home when Jane wanted to." },
          { word: "before / after", type: "Liên từ", phonetic: "/bɪˈfɔːr/ /ˈæf.tɚ/", vi: "Trước khi / Sau khi (Chỉ cái gì xảy ra trước/sau).", example: "We went home before the concert ended." },
          { word: "although / though", type: "Liên từ", phonetic: "/ɑːlˈðoʊ/ /ðoʊ/", vi: "Mặc dù (Chỉ một điều gì đó gây ngạc nhiên, trái ngược).", example: "We went home although we did not really want to." },
          { word: "if", type: "Liên từ", phonetic: "/ɪf/", vi: "Nếu (Dùng để đưa ra điều kiện).", example: "We will go home if we are tired." }
        ]
      },
      {
        heading: "B. Other connecting words (Các từ nối khác)",
        items: [
          { word: "only", type: "Từ nối", phonetic: "/ˈoʊn.li/", vi: "Chỉ, duy nhất (Ý nói không nhiều hoặc không lớn).", example: "He sleeps only 3 hours every night." },
          { word: "even", type: "Từ nối", phonetic: "/ˈiː.vən/", vi: "Thậm chí (Chỉ sự việc gây ngạc nhiên hoặc bất thường).", example: "Even their 10-year-old son works in the shop." },
          { word: "like", type: "Từ nối", phonetic: "/laɪk/", vi: "Giống như (Dùng để so sánh).", example: "She looks like her dad." },
          { word: "than", type: "Từ nối", phonetic: "/ðæn/", vi: "Hơn (Dùng sau tính từ hoặc trạng từ so sánh hơn).", example: "She works harder than he does." },
          { word: "also / too / as well", type: "Từ nối", phonetic: "/ˈɑːl.soʊ/ /tuː/", vi: "Cũng, ngoài ra (Dùng để thêm thông tin phụ).", example: "He works in the shop and she does also / too / as well." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo chức năng của từ nối)
    dragDrop: {
      buckets: ["Reason & Result", "Contrast & Surprise", "Time", "Addition & Comparison", "Condition & Restriction"],
      items: [
        { id: "i1", word: "because", target: "Reason & Result", vi: "bởi vì (lý do)" },
        { id: "i2", word: "so", target: "Reason & Result", vi: "vì vậy (kết quả)" },
        { id: "i3", word: "we were tired", target: "Reason & Result", vi: "vì chúng tôi mệt (because)" },
        { id: "i4", word: "we missed it", target: "Reason & Result", vi: "nên chúng tôi lỡ mất (so)" },
        { id: "i5", word: "why?", target: "Reason & Result", vi: "tại sao? (because)" },
        { id: "i6", word: "result", target: "Reason & Result", vi: "kết quả (so)" },
        { id: "i7", word: "but", target: "Contrast & Surprise", vi: "nhưng (đối lập)" },
        { id: "i8", word: "although", target: "Contrast & Surprise", vi: "mặc dù" },
        { id: "i9", word: "though", target: "Contrast & Surprise", vi: "mặc dù (ngắn)" },
        { id: "i10", word: "even", target: "Contrast & Surprise", vi: "thậm chí" },
        { id: "i11", word: "surprising", target: "Contrast & Surprise", vi: "gây ngạc nhiên" },
        { id: "i12", word: "a contrast", target: "Contrast & Surprise", vi: "sự đối lập" },
        { id: "i13", word: "when", target: "Time", vi: "khi nào" },
        { id: "i14", word: "before", target: "Time", vi: "trước khi" },
        { id: "i15", word: "after", target: "Time", vi: "sau khi" },
        { id: "i16", word: "what happened first?", target: "Time", vi: "cái gì xảy ra trước?" },
        { id: "i17", word: "when Jane wanted to", target: "Time", vi: "khi Jane muốn" },
        { id: "i18", word: "the concert ended", target: "Time", vi: "buổi hòa nhạc kết thúc" },
        { id: "i19", word: "and", target: "Addition & Comparison", vi: "và (thêm vào)" },
        { id: "i20", word: "also", target: "Addition & Comparison", vi: "cũng (thêm vào)" },
        { id: "i21", word: "too", target: "Addition & Comparison", vi: "cũng vậy" },
        { id: "i22", word: "as well", target: "Addition & Comparison", vi: "cũng thế" },
        { id: "i23", word: "like", target: "Addition & Comparison", vi: "giống như (so sánh)" },
        { id: "i24", word: "than", target: "Addition & Comparison", vi: "hơn (so sánh hơn)" },
        { id: "i25", word: "if", target: "Condition & Restriction", vi: "nếu (điều kiện)" },
        { id: "i26", word: "only", target: "Condition & Restriction", vi: "chỉ (giới hạn)" },
        { id: "i27", word: "a condition", target: "Condition & Restriction", vi: "một điều kiện (if)" },
        { id: "i28", word: "not very much", target: "Condition & Restriction", vi: "không nhiều lắm (only)" },
        { id: "i29", word: "if we are tired", target: "Condition & Restriction", vi: "nếu chúng ta mệt" },
        { id: "i30", word: "only 3 hours", target: "Condition & Restriction", vi: "chỉ 3 tiếng" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 15.1 đến 15.6)
    quiz: [
      { q: "1. Sam liked school _____ he had many friends there.", options: ["because", "although", "if", "but"], a: "because" },
      { q: "2. Sam left school _____ he joined the navy.", options: ["so", "but", "and", "because"], a: "and" },
      { q: "3. He hadn't travelled much _____ he joined the navy.", options: ["but", "before", "after", "although"], a: "before" },
      { q: "4. Sam was seasick _____ he left the navy.", options: ["when", "if", "so", "but"], a: "so" },
      { q: "5. He got a job in a bank _____ he had no qualifications.", options: ["because", "although", "and", "so"], a: "although" },
      { q: "6. He will stay at the bank _____ he likes it there.", options: ["if", "though", "but", "so"], a: "if" },
      { q: "7. I love swimming _____ my brother loves swimming too.", options: ["and", "but", "because", "so"], a: "and" },
      { q: "8. _____ my grandmother swims every day. (Surprising fact)", options: ["Only", "Even", "Also", "Like"], a: "Even" },
      { q: "9. She swims _____ a fish.", options: ["as well", "like", "than", "too"], a: "like" },
      { q: "10. I can swim better _____ my father.", options: ["that", "then", "than", "like"], a: "than" },
      { q: "11. _____ my father doesn't like it very much.", options: ["But", "And", "Because", "So"], a: "But" },
      { q: "12. They are rich _____ they aren't happy.", options: ["but", "so", "because", "if"], a: "but" },
      { q: "13. We went home early, _____ we missed the end of the concert.", options: ["so", "because", "although", "but"], a: "so" },
      { q: "14. We went home _____ we did not really want to.", options: ["though", "because", "so", "and"], a: "though" },
      { q: "15. He sleeps _____ 3 hours every night. (Not very much)", options: ["only", "even", "also", "too"], a: "only" },
      { q: "16. She works harder _____ he does.", options: ["than", "that", "then", "like"], a: "than" },
      { q: "17. He works in the shop and she does ______.", options: ["also", "too", "even", "like"], a: "too" },
      { q: "18. Mary agreed to marry Paul ______ she loves him.", options: ["because", "although", "so", "but"], a: "because" },
      { q: "19. Mary will marry Paul ______ he moves to London. (Condition)", options: ["if", "although", "because", "so"], a: "if" },
      { q: "20. She looks _____ her dad.", options: ["like", "than", "even", "only"], a: "like" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn trí nhớ mặt chữ)
    typingGame: [
      { q: "We went home ______ went straight to bed.", hint: "a _ d", a: "and" },
      { q: "They are rich ______ they aren't happy. (contrast)", hint: "b _ t", a: "but" },
      { q: "We went home ______ we were tired. (reason)", hint: "b _ _ _ _ _ e", a: "because" },
      { q: "We went home early, ______ we missed the end. (result)", hint: "s _", a: "so" },
      { q: "We went home ______ Jane wanted to. (time)", hint: "w _ _ n", a: "when" },
      { q: "We went home ______ the concert ended. (time)", hint: "b _ _ _ _ e", a: "before" },
      { q: "We went home ______ we didn't really want to. (surprise)", hint: "a _ _ _ _ _ _ h", a: "although" },
      { q: "We will go home ______ we are tired. (condition)", hint: "i _", a: "if" },
      { q: "He sleeps ______ 3 hours every night. (not much)", hint: "o _ _ y", a: "only" },
      { q: "______ their 10-year-old son works in the shop. (surprising)", hint: "E _ _ n", a: "Even" },
      { q: "She looks ______ her dad. (comparison)", hint: "l _ _ e", a: "like" },
      { q: "She works harder ______ he does.", hint: "t _ _ n", a: "than" },
      { q: "He works in the shop and she does ______ / too.", hint: "a _ _ o", a: "also" },
      { q: "He works in the shop and she does ______ well.", hint: "a _", a: "as" },
      { q: "I'll learn more English ______ I study hard.", hint: "i _", a: "if" },
      { q: "He got a job ______ he had no qualifications.", hint: "a _ _ _ _ _ _ h", a: "although" },
      { q: "I am learning English ______ I want to travel.", hint: "b _ _ _ _ _ e", a: "because" },
      { q: "I like tea ______ my brother likes coffee.", hint: "b _ t", a: "but" },
      { q: "I missed the bus, ______ I took a taxi.", hint: "s _", a: "so" },
      { q: "We went home ______ Max had sung his first song.", hint: "a _ _ _ r", a: "after" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "We went home early, so we missed the end of the concert.", trans: "Chúng tôi đã về nhà sớm, vì vậy chúng tôi đã lỡ phần cuối của buổi hòa nhạc." },
      { text: "He got a job in a bank although he had no qualifications.", trans: "Anh ấy đã nhận được một công việc ở ngân hàng mặc dù anh ấy không có bằng cấp nào." },
      { text: "Even their 10-year-old son works in the shop.", trans: "Thậm chí cậu con trai 10 tuổi của họ cũng làm việc trong cửa hàng." },
      { text: "She looks like her dad, but she works harder than he does.", trans: "Cô ấy trông giống bố mình, nhưng cô ấy làm việc chăm chỉ hơn ông ấy." },
      { text: "I love swimming and my brother loves swimming too.", trans: "Tôi thích bơi lội và anh trai tôi cũng thích bơi lội." }
    ]
  },

  {
    id: 16,
    title: "Unit 16: Time words (1): days, months and seasons",
    description: "Học từ vựng cơ bản về thời gian, các ngày trong tuần, tháng trong năm, các mùa và đặc biệt là cách dùng giới từ (in, on, at) cho từng mốc thời gian.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Basic time words (Từ vựng thời gian cơ bản)",
        items: [
          { word: "year", type: "Danh từ", phonetic: "/jɪr/", vi: "Năm (Có 365 days / 12 months / 52 weeks).", example: "There are 365 days in a year." },
          { word: "week", type: "Danh từ", phonetic: "/wiːk/", vi: "Tuần (Có 7 days).", example: "There are 7 days in a week." },
          { word: "fortnight", type: "Danh từ", phonetic: "/ˈfɔːrt.naɪt/", vi: "Hai tuần, nửa tháng.", example: "There are 2 weeks in a fortnight." },
          { word: "day", type: "Danh từ", phonetic: "/deɪ/", vi: "Ngày (Có 24 hours).", example: "There are 24 hours in a day." },
          { word: "hour", type: "Danh từ", phonetic: "/aʊr/", vi: "Giờ (Có 60 minutes). Lưu ý: đọc là 'an hour'.", example: "There are 60 minutes in an hour." },
          { word: "minute", type: "Danh từ", phonetic: "/ˈmɪn.ɪt/", vi: "Phút (Có 60 seconds).", example: "There are 60 seconds in a minute." },
          { word: "century", type: "Danh từ", phonetic: "/ˈsen.tʃər.i/", vi: "Thế kỷ (100 năm).", example: "There are 100 years in a century." }
        ]
      },
      {
        heading: "B. Days of the week (Các ngày trong tuần)",
        items: [
          { word: "Monday -> Sunday", type: "Danh từ", phonetic: "", vi: "Thứ Hai đến Chủ nhật. (Luôn viết HOA chữ cái đầu tiên).", example: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday." },
          { word: "the weekend", type: "Cụm từ", phonetic: "/ˈwiːk.end/", vi: "Cuối tuần (Thứ Bảy + Chủ Nhật).", example: "Saturday + Sunday = the weekend." },
          { word: "yesterday / today / tomorrow", type: "Trạng từ", phonetic: "", vi: "Hôm qua / Hôm nay / Ngày mai.", example: "Today is Wednesday. Tomorrow is Thursday." },
          { word: "the day before yesterday", type: "Cụm từ", phonetic: "", vi: "Hôm kia (Trước hôm qua).", example: "The day before yesterday was Monday." },
          { word: "the day after tomorrow", type: "Cụm từ", phonetic: "", vi: "Ngày mốt (Sau ngày mai).", example: "The day after tomorrow is Friday." },
          { word: "Prepositions for Days", type: "Ngữ pháp", phonetic: "", vi: "Dùng ON cho các ngày: on Monday, on Tuesday evening. Dùng AT cho cuối tuần: at the weekend.", example: "I saw her on Friday. I went to the cinema at the weekend." }
        ]
      },
      {
        heading: "C. Months and seasons (Các tháng và các mùa)",
        items: [
          { word: "January -> December", type: "Danh từ", phonetic: "", vi: "Tháng 1 đến Tháng 12. (Luôn viết HOA chữ cái đầu tiên).", example: "January, February, March, April, May, June, July, August, September, October, November, December." },
          { word: "spring / summer", type: "Danh từ", phonetic: "/sprɪŋ/ /ˈsʌm.ɚ/", vi: "Mùa xuân / Mùa hè.", example: "Birds sing in the spring." },
          { word: "autumn / winter", type: "Danh từ", phonetic: "/ˈɑː.t̬əm/ /ˈwɪn.t̬ɚ/", vi: "Mùa thu / Mùa đông.", example: "It is cold in winter." },
          { word: "Prepositions for Months/Seasons", type: "Ngữ pháp", phonetic: "", vi: "Dùng IN cho các tháng và mùa: in July, in (the) spring. KHÔNG dùng ON.", example: "My birthday is in July. [NOT on July]" }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại Thời gian, Ngày, Tháng, Mùa, Giới từ)
    dragDrop: {
      buckets: ["Time Durations", "Days / Time of Day", "Months / Seasons", "Prepositions (in/on/at)"],
      items: [
        { id: "i1", word: "a year", target: "Time Durations", vi: "một năm" },
        { id: "i2", word: "a week", target: "Time Durations", vi: "một tuần" },
        { id: "i3", word: "a fortnight", target: "Time Durations", vi: "hai tuần" },
        { id: "i4", word: "a day", target: "Time Durations", vi: "một ngày" },
        { id: "i5", word: "an hour", target: "Time Durations", vi: "một giờ" },
        { id: "i6", word: "a minute", target: "Time Durations", vi: "một phút" },
        { id: "i7", word: "a second", target: "Time Durations", vi: "một giây" },
        { id: "i8", word: "a century", target: "Time Durations", vi: "một thế kỷ" },
        { id: "i9", word: "Monday", target: "Days / Time of Day", vi: "thứ Hai" },
        { id: "i10", word: "Wednesday", target: "Days / Time of Day", vi: "thứ Tư" },
        { id: "i11", word: "Saturday", target: "Days / Time of Day", vi: "thứ Bảy" },
        { id: "i12", word: "the weekend", target: "Days / Time of Day", vi: "cuối tuần" },
        { id: "i13", word: "yesterday", target: "Days / Time of Day", vi: "hôm qua" },
        { id: "i14", word: "tomorrow", target: "Days / Time of Day", vi: "ngày mai" },
        { id: "i15", word: "morning", target: "Days / Time of Day", vi: "buổi sáng" },
        { id: "i16", word: "evening", target: "Days / Time of Day", vi: "buổi tối" },
        { id: "i17", word: "January", target: "Months / Seasons", vi: "tháng Một" },
        { id: "i18", word: "February", target: "Months / Seasons", vi: "tháng Hai" },
        { id: "i19", word: "August", target: "Months / Seasons", vi: "tháng Tám" },
        { id: "i20", word: "November", target: "Months / Seasons", vi: "tháng Mười một" },
        { id: "i21", word: "spring", target: "Months / Seasons", vi: "mùa xuân" },
        { id: "i22", word: "summer", target: "Months / Seasons", vi: "mùa hè" },
        { id: "i23", word: "autumn", target: "Months / Seasons", vi: "mùa thu" },
        { id: "i24", word: "winter", target: "Months / Seasons", vi: "mùa đông" },
        { id: "i25", word: "in (July)", target: "Prepositions (in/on/at)", vi: "vào tháng 7" },
        { id: "i26", word: "in (the summer)", target: "Prepositions (in/on/at)", vi: "vào mùa hè" },
        { id: "i27", word: "on (Monday)", target: "Prepositions (in/on/at)", vi: "vào thứ Hai" },
        { id: "i28", word: "on (Tuesday evening)", target: "Prepositions (in/on/at)", vi: "vào tối thứ Ba" },
        { id: "i29", word: "at (the weekend)", target: "Prepositions (in/on/at)", vi: "vào cuối tuần" },
        { id: "i30", word: "in (a year)", target: "Prepositions (in/on/at)", vi: "trong một năm" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 16.1 đến 16.7)
    quiz: [
      { q: "1. How many seconds are there in an hour?", options: ["60", "360", "3,600", "8,760"], a: "3,600" },
      { q: "2. How many months are there in a century?", options: ["120", "1,200", "12,000", "100"], a: "1,200" },
      { q: "3. How many hours are there in a week?", options: ["24", "168", "1,000", "720"], a: "168" },
      { q: "4. What is the abbreviation (viết tắt) 'Wed.'?", options: ["Week", "Wednesday", "Winter", "Weekend"], a: "Wednesday" },
      { q: "5. What is the abbreviation 'Th.'?", options: ["Thursday", "Tuesday", "Thirty", "Then"], a: "Thursday" },
      { q: "6. What is the abbreviation 'Aug.'?", options: ["Autumn", "August", "Augustus", "Age"], a: "August" },
      { q: "7. Which preposition is correct? I'm going to a party _____ Saturday.", options: ["in", "on", "at", "for"], a: "on" },
      { q: "8. Which preposition is correct? Her birthday is _____ Thursday.", options: ["in", "on", "at", "for"], a: "on" },
      { q: "9. Which preposition is correct? She wanted to have the party _____ the weekend.", options: ["in", "on", "at", "for"], a: "at" },
      { q: "10. Which preposition is correct? I think June is a good month. My birthday is _____ June.", options: ["in", "on", "at", "for"], a: "in" },
      { q: "11. Which preposition is correct? I love going to barbecues _____ the summer.", options: ["in", "on", "at", "for"], a: "in" },
      { q: "12. What is the third day of the week? (Starting from Sunday/Monday depending on calendar, but standard: Mon=1, Tue=2...)", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], a: "Wednesday" },
      { q: "13. If today is Monday, what day will it be the day after tomorrow?", options: ["Tuesday", "Wednesday", "Thursday", "Sunday"], a: "Wednesday" },
      { q: "14. If today is Friday, what day was it the day before yesterday?", options: ["Wednesday", "Thursday", "Saturday", "Sunday"], a: "Wednesday" },
      { q: "15. How many minutes are there in half an hour?", options: ["15", "30", "45", "60"], a: "30" },
      { q: "16. What is the seventh month?", options: ["June", "July", "August", "September"], a: "July" },
      { q: "17. Which month has 28 days (and 29 in a leap year)?", options: ["January", "February", "September", "November"], a: "February" },
      { q: "18. 'Thirty days has September, April, June and...'?", options: ["November", "October", "December", "January"], a: "November" },
      { q: "19. Which sentence is correct?", options: ["I saw her on Friday.", "I saw her in Friday.", "I saw her at Friday.", "I saw her for Friday."], a: "I saw her on Friday." },
      { q: "20. Which sentence is correct?", options: ["Birds sing on spring.", "Birds sing at spring.", "Birds sing in the spring.", "Birds sing for spring."], a: "Birds sing in the spring." }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền khuyết)
    typingGame: [
      { q: "There are 365 ______ in a year.", hint: "d _ _ s", a: "days" },
      { q: "There are 12 ______ in a year.", hint: "m _ _ _ _ s", a: "months" },
      { q: "There are 52 ______ in a year.", hint: "w _ _ _ s", a: "weeks" },
      { q: "There are 2 weeks in a ______ (14 days).", hint: "f _ _ _ _ _ _ _ t", a: "fortnight" },
      { q: "There are 24 ______ in a day.", hint: "h _ _ _ s", a: "hours" },
      { q: "There are 60 ______ in an hour.", hint: "m _ _ _ _ _ s", a: "minutes" },
      { q: "There are 60 ______ in a minute.", hint: "s _ _ _ _ _ s", a: "seconds" },
      { q: "There are 100 years in a ______.", hint: "c _ _ _ _ _ y", a: "century" },
      { q: "Saturday + Sunday = the ______.", hint: "w _ _ _ _ _ d", a: "weekend" },
      { q: "Today is Wednesday. ______ was Tuesday.", hint: "Y _ _ _ _ _ _ _ y", a: "Yesterday" },
      { q: "Today is Wednesday. ______ is Thursday.", hint: "T _ _ _ _ _ _ w", a: "Tomorrow" },
      { q: "The day ______ yesterday (hôm kia).", hint: "b _ _ _ _ e", a: "before" },
      { q: "The day ______ tomorrow (ngày mốt).", hint: "a _ _ _ r", a: "after" },
      { q: "I saw her ______ Friday. (Preposition)", hint: "o _", a: "on" },
      { q: "I went to the cinema ______ the weekend. (Preposition)", hint: "a _", a: "at" },
      { q: "My birthday is ______ July. (Preposition)", hint: "i _", a: "in" },
      { q: "Birds sing ______ the spring. (Preposition)", hint: "i _", a: "in" },
      { q: "The third month is ______.", hint: "M _ _ _ h", a: "March" },
      { q: "The tenth month is ______.", hint: "O _ _ _ _ _ r", a: "October" },
      { q: "The season before winter is ______.", hint: "a _ _ _ _ n", a: "autumn" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "There are sixty minutes in an hour and twenty-four hours in a day.", trans: "Có 60 phút trong một giờ và 24 giờ trong một ngày." },
      { text: "The names of the days always begin with a capital letter in English.", trans: "Tên của các ngày luôn bắt đầu bằng một chữ cái viết hoa trong tiếng Anh." },
      { text: "I'm going to a party on Saturday for Jill's birthday.", trans: "Tôi sẽ đi dự một bữa tiệc vào thứ Bảy nhân dịp sinh nhật của Jill." },
      { text: "My birthday is in winter and it's too cold to eat outside!", trans: "Sinh nhật của tôi là vào mùa đông và trời quá lạnh để ăn ở ngoài!" },
      { text: "I love going to barbecues in the summer.", trans: "Tôi rất thích đi ăn tiệc nướng ngoài trời vào mùa hè." }
    ]
  },
  {
    id: 17,
    title: "Unit 17: Time words (2)",
    description: "Học cách diễn đạt thời gian so với hiện tại (quá khứ, tương lai), các khoảng thời gian ngắn (in a moment, soon) và các trạng từ chỉ tần suất (always, hardly ever, twice a week...).",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Time in relation to NOW (Thời gian so với Hiện tại)",
        items: [
          { word: "now", type: "Trạng từ", phonetic: "/naʊ/", vi: "Bây giờ, tại thời điểm này.", example: "It is 10 o'clock now." },
          { word: "then", type: "Trạng từ", phonetic: "/ðen/", vi: "Lúc đó, khi đó (thường ở quá khứ).", example: "I lived in Rome then." },
          { word: "ago", type: "Trạng từ", phonetic: "/əˈɡoʊ/", vi: "Trước đây, cách đây.", example: "I got up 2 hours ago. / An hour ago it was 9 o'clock." },
          { word: "for", type: "Giới từ", phonetic: "/fɔːr/", vi: "Trong khoảng thời gian.", example: "He lived there for two years." },
          { word: "from ... to ...", type: "Giới từ", phonetic: "/frʌm/ /tuː/", vi: "Từ ... đến ...", example: "He lived there from 1994 to 1996." },
          { word: "last / next", type: "Tính từ", phonetic: "/læst/ /nekst/", vi: "Trước / Tới.", example: "Last year / last week. Next year / next summer." }
        ]
      },
      {
        heading: "B. Past, present and future (Quá khứ, hiện tại, tương lai)",
        items: [
          { word: "in the past", type: "Cụm từ", phonetic: "/ɪn ðə pæst/", vi: "Trong quá khứ.", example: "In the past people didn't have television." },
          { word: "in the future", type: "Cụm từ", phonetic: "/ɪn ðə ˈfjuː.tʃɚ/", vi: "Trong tương lai.", example: "People may travel to Mars in the future." },
          { word: "in a moment", type: "Cụm từ", phonetic: "/ɪn ə ˈmoʊ.mənt/", vi: "Một lát nữa (= a very short time).", example: "I'll be with you in a moment." },
          { word: "at the moment", type: "Cụm từ", phonetic: "/æt ðə ˈmoʊ.mənt/", vi: "Ngay lúc này (= now).", example: "Jane's in Paris at the moment." },
          { word: "soon", type: "Trạng từ", phonetic: "/suːn/", vi: "Sớm thôi (= in a short time).", example: "See you soon!" },
          { word: "recently", type: "Trạng từ", phonetic: "/ˈriː.sənt.li/", vi: "Gần đây (= not long ago).", example: "We met recently." }
        ]
      },
      {
        heading: "C. Frequency adverbs (Trạng từ chỉ tần suất)",
        items: [
          { word: "always", type: "Trạng từ", phonetic: "/ˈɑːl.weɪz/", vi: "Luôn luôn (100%).", example: "It always snows in Russia in winter." },
          { word: "often / usually", type: "Trạng từ", phonetic: "/ˈɑːf.ən/ /ˈjuː.ʒu.ə.li/", vi: "Thường xuyên / Thông thường (Khoảng 70-80%).", example: "It often rains in Britain." },
          { word: "sometimes / occasionally", type: "Trạng từ", phonetic: "/ˈsʌm.taɪmz/ /əˈkeɪ.ʒən.əl.i/", vi: "Thỉnh thoảng / Đôi khi (Khoảng 30-50%).", example: "I occasionally go to the cinema." },
          { word: "rarely / hardly ever", type: "Trạng từ", phonetic: "/ˈrer.li/ /ˈhɑːrd.li ˈev.ɚ/", vi: "Hiếm khi / Hầu như không bao giờ (= almost never, khoảng 5-10%).", example: "The temperature hardly ever gets to 35 degrees." },
          { word: "never", type: "Trạng từ", phonetic: "/ˈnev.ɚ/", vi: "Không bao giờ (0%).", example: "The Ancient Romans never went to America." }
        ]
      },
      {
        heading: "D. Expressions of frequency (Các cụm từ chỉ tần suất)",
        items: [
          { word: "once a week", type: "Cụm từ", phonetic: "/wʌns ə wiːk/", vi: "Một lần một tuần (= one time).", example: "I go swimming once a week." },
          { word: "twice a day", type: "Cụm từ", phonetic: "/twaɪs ə deɪ/", vi: "Hai lần một ngày (= two times).", example: "I clean my teeth twice a day." },
          { word: "three times a year", type: "Cụm từ", phonetic: "/θriː taɪmz ə jɪr/", vi: "Ba lần một năm.", example: "I see my uncle three times a year." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại Thời gian, Tần suất)
    dragDrop: {
      buckets: ["Time (Past/Future)", "Short times & Now", "Frequency (High)", "Frequency (Low/Zero)", "Exact frequency"],
      items: [
        { id: "i1", word: "last year", target: "Time (Past/Future)", vi: "năm ngoái" },
        { id: "i2", word: "last week", target: "Time (Past/Future)", vi: "tuần trước" },
        { id: "i3", word: "next year", target: "Time (Past/Future)", vi: "năm tới" },
        { id: "i4", word: "next summer", target: "Time (Past/Future)", vi: "mùa hè tới" },
        { id: "i5", word: "in the past", target: "Time (Past/Future)", vi: "trong quá khứ" },
        { id: "i6", word: "in the future", target: "Time (Past/Future)", vi: "trong tương lai" },
        { id: "i7", word: "ago", target: "Time (Past/Future)", vi: "cách đây / trước đây" },
        { id: "i8", word: "now", target: "Short times & Now", vi: "bây giờ" },
        { id: "i9", word: "then", target: "Short times & Now", vi: "khi đó" },
        { id: "i10", word: "at the moment", target: "Short times & Now", vi: "ngay lúc này" },
        { id: "i11", word: "in a moment", target: "Short times & Now", vi: "một lát nữa" },
        { id: "i12", word: "soon", target: "Short times & Now", vi: "sớm thôi" },
        { id: "i13", word: "recently", target: "Short times & Now", vi: "gần đây" },
        { id: "i14", word: "always", target: "Frequency (High)", vi: "luôn luôn" },
        { id: "i15", word: "often", target: "Frequency (High)", vi: "thường xuyên" },
        { id: "i16", word: "usually", target: "Frequency (High)", vi: "thông thường" },
        { id: "i17", word: "normally", target: "Frequency (High)", vi: "thường ngày" },
        { id: "i18", word: "rarely", target: "Frequency (Low/Zero)", vi: "hiếm khi" },
        { id: "i19", word: "hardly ever", target: "Frequency (Low/Zero)", vi: "hầu như không" },
        { id: "i20", word: "not often", target: "Frequency (Low/Zero)", vi: "không thường xuyên" },
        { id: "i21", word: "never", target: "Frequency (Low/Zero)", vi: "không bao giờ" },
        { id: "i22", word: "sometimes", target: "Frequency (Low/Zero)", vi: "thỉnh thoảng (trung bình)" },
        { id: "i23", word: "occasionally", target: "Frequency (Low/Zero)", vi: "đôi khi (tần suất thấp)" },
        { id: "i24", word: "once a week", target: "Exact frequency", vi: "1 lần 1 tuần" },
        { id: "i25", word: "twice a day", target: "Exact frequency", vi: "2 lần 1 ngày" },
        { id: "i26", word: "three times", target: "Exact frequency", vi: "3 lần" },
        { id: "i27", word: "four times", target: "Exact frequency", vi: "4 lần" },
        { id: "i28", word: "once a year", target: "Exact frequency", vi: "1 lần 1 năm" },
        { id: "i29", word: "twice a month", target: "Exact frequency", vi: "2 lần 1 tháng" },
        { id: "i30", word: "every day", target: "Exact frequency", vi: "mỗi ngày" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 17.1 đến 17.6)
    quiz: [
      { q: "1. I got up 2 hours _____, at 8 o'clock.", options: ["before", "past", "ago", "last"], a: "ago" },
      { q: "2. Rosa worked in Hong Kong _____ three years.", options: ["since", "in", "from", "for"], a: "for" },
      { q: "3. She lived in London _____ 1993 to 1996.", options: ["for", "since", "from", "at"], a: "from" },
      { q: "4. _____ the moment, she is working in Tokyo.", options: ["In", "On", "At", "For"], a: "At" },
      { q: "5. She will stay there _____ two more years.", options: ["since", "for", "at", "to"], a: "for" },
      { q: "6. Which century is 'the 19th century'?", options: ["The future", "The present", "The past", "Next year"], a: "The past" },
      { q: "7. Which century is 'the 22nd century'?", options: ["The past", "The present", "The future", "Now"], a: "The future" },
      { q: "8. Peter will get his exam results very soon. When?", options: ["Next year", "In two minutes", "In a few days/weeks", "Ten years ago"], a: "In a few days/weeks" },
      { q: "9. Harriet and Rupert met recently. When?", options: ["A week/month ago", "Next year", "Ten years ago", "In the future"], a: "A week/month ago" },
      { q: "10. I'll help you in a moment. When?", options: ["In a few minutes", "Tomorrow", "Next week", "Last year"], a: "In a few minutes" },
      { q: "11. 'Hardly ever' means...", options: ["always", "often", "almost never", "usually"], a: "almost never" },
      { q: "12. It _____ snows in Russia in winter.", options: ["hardly ever", "always", "never", "rarely"], a: "always" },
      { q: "13. I clean my teeth _____ a day. (Two times)", options: ["two", "second", "twice", "twin"], a: "twice" },
      { q: "14. I go swimming _____ a week. (One time)", options: ["one", "first", "once", "single"], a: "once" },
      { q: "15. I see my uncle _____ times a year.", options: ["three", "third", "thrice", "once"], a: "three" },
      { q: "16. Which word means 'not long ago'?", options: ["soon", "recently", "in a moment", "then"], a: "recently" },
      { q: "17. Which is the correct order of frequency (High to Low)?", options: ["always, often, sometimes, never", "never, often, always, sometimes", "always, never, sometimes, often", "often, sometimes, always, never"], a: "always, often, sometimes, never" },
      { q: "18. 'Occasionally' is closest in meaning to...", options: ["always", "never", "sometimes", "often"], a: "sometimes" },
      { q: "19. Which phrase means 'at this moment'?", options: ["in a moment", "at the moment", "recently", "soon"], a: "at the moment" },
      { q: "20. Which phrase means 'a very short time in the future'?", options: ["in a moment", "at the moment", "ago", "recently"], a: "in a moment" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền khuyết)
    typingGame: [
      { q: "I got up two hours ______.", hint: "a _ o", a: "ago" },
      { q: "He lived there ______ two years. (khoảng thời gian)", hint: "f _ r", a: "for" },
      { q: "She worked in Tokyo ______ 1993 to 1996.", hint: "f _ _ m", a: "from" },
      { q: "______ the past, people didn't have TV.", hint: "I _", a: "In" },
      { q: "People may travel to Mars in the ______.", hint: "f _ _ _ _ e", a: "future" },
      { q: "I'll be with you ______ a moment. (rất nhanh thôi)", hint: "i _", a: "in" },
      { q: "Jane's in Paris ______ the moment. (= now)", hint: "a _", a: "at" },
      { q: "See you ______! (= in a short time)", hint: "s _ _ n", a: "soon" },
      { q: "We met ______. (= not long ago)", hint: "r _ _ _ _ _ _ y", a: "recently" },
      { q: "It ______ snows in Russia in winter. (100%)", hint: "a _ _ _ _ s", a: "always" },
      { q: "The temperature ______ ever gets to 35 degrees. (= almost never)", hint: "h _ _ _ _ y", a: "hardly" },
      { q: "The Ancient Romans ______ went to America. (0%)", hint: "n _ _ _ r", a: "never" },
      { q: "I go swimming ______ a week. (= one time)", hint: "o _ _ e", a: "once" },
      { q: "I clean my teeth ______ a day. (= two times)", hint: "t _ _ _ e", a: "twice" },
      { q: "I see my uncle ______ times a year. (3 lần)", hint: "t _ _ _ e", a: "three" },
      { q: "It ______ rains in Britain. (Thường xuyên)", hint: "o _ _ _ n", a: "often" },
      { q: "I ______ go to the cinema. (Thỉnh thoảng)", hint: "s _ _ _ _ _ _ _ s", a: "sometimes" },
      { q: "I ______ eat chocolate. (Hiếm khi)", hint: "r _ _ _ _ y", a: "rarely" },
      { q: "I ______ drink milk. (Đôi khi, thỉnh thoảng)", hint: "o _ _ _ _ _ _ _ _ _ y", a: "occasionally" },
      { q: "______ year I went to London. (Năm ngoái)", hint: "L _ _ t", a: "Last" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "I'll be with you in a moment.", trans: "Tôi sẽ đến chỗ bạn trong một lát nữa." },
      { text: "Jane's in Paris at the moment.", trans: "Hiện tại Jane đang ở Paris." },
      { text: "The temperature in London hardly ever gets to 35 degrees.", trans: "Nhiệt độ ở London hầu như không bao giờ đạt tới 35 độ." },
      { text: "I clean my teeth twice a day.", trans: "Tôi đánh răng hai lần một ngày." },
      { text: "People may travel to Mars in the future.", trans: "Con người có thể du hành đến Sao Hỏa trong tương lai." }
    ]
  },

  {
    id: 18,
    title: "Unit 18: Places",
    description: "Khám phá các từ vựng chỉ địa điểm chung, vị trí cụ thể (top, bottom, front, back), phương hướng (left, right) và cách nói ở nhà hay đi vắng (at home, away, abroad).",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. General place words (Từ chỉ địa điểm chung)",
        items: [
          { word: "here", type: "Trạng từ", phonetic: "/hɪr/", vi: "Ở đây (tại chỗ người nói).", example: "Come here please." },
          { word: "there", type: "Trạng từ", phonetic: "/ðer/", vi: "Ở đó (một nơi khác).", example: "I'm going there in April." },
          { word: "back", type: "Trạng từ", phonetic: "/bæk/", vi: "Trở lại (nơi xuất phát).", example: "I'm coming back from Portugal in May." },
          { word: "everywhere", type: "Trạng từ", phonetic: "/ˈev.ri.wer/", vi: "Mọi nơi, khắp mọi nơi.", example: "There are books and papers everywhere in my room." }
        ]
      },
      {
        heading: "B. Positions (Vị trí)",
        items: [
          { word: "the top", type: "Danh từ", phonetic: "/tɑːp/", vi: "Đỉnh, phần trên cùng.", example: "The top of the mountain." },
          { word: "the middle", type: "Danh từ", phonetic: "/ˈmɪd.əl/", vi: "Ở giữa.", example: "The middle of the road." },
          { word: "the bottom", type: "Danh từ", phonetic: "/ˈbɑː.t̬əm/", vi: "Đáy, phần dưới cùng.", example: "The bottom of the glass." },
          { word: "the front", type: "Danh từ", phonetic: "/frʌnt/", vi: "Phía trước.", example: "The front of the car." },
          { word: "the side", type: "Danh từ", phonetic: "/saɪd/", vi: "Bên hông, bên cạnh.", example: "The side of the car." },
          { word: "the back", type: "Danh từ", phonetic: "/bæk/", vi: "Phía sau.", example: "The back of the car." },
          { word: "the beginning", type: "Danh từ", phonetic: "/bɪˈɡɪn.ɪŋ/", vi: "Điểm bắt đầu, phần đầu.", example: "The beginning of the motorway." },
          { word: "the end", type: "Danh từ", phonetic: "/end/", vi: "Điểm kết thúc, phần cuối.", example: "The end of the motorway." }
        ]
      },
      {
        heading: "C. Left and right (Trái và Phải)",
        items: [
          { word: "left", type: "Tính từ", phonetic: "/left/", vi: "Bên trái.", example: "This is his left hand." },
          { word: "right", type: "Tính từ", phonetic: "/raɪt/", vi: "Bên phải.", example: "This is his right hand." },
          { word: "on the left / on the right", type: "Cụm từ", phonetic: "", vi: "Ở phía bên trái / Ở phía bên phải.", example: "There is a cinema on the left and a restaurant on the right." }
        ]
      },
      {
        heading: "D. Home and away (Ở nhà và Đi vắng)",
        items: [
          { word: "at home", type: "Cụm từ", phonetic: "/æt hoʊm/", vi: "Ở nhà (in her house/flat).", example: "Is Mary at home?" },
          { word: "out", type: "Trạng từ", phonetic: "/aʊt/", vi: "Ra ngoài (đi siêu thị / đi làm / đi học).", example: "No, sorry, she's out." },
          { word: "away", type: "Trạng từ", phonetic: "/əˈweɪ/", vi: "Đi vắng (ở thành phố khác, nghỉ mát).", example: "No, sorry, she's away." },
          { word: "abroad", type: "Trạng từ", phonetic: "/əˈbrɑːd/", vi: "Ở nước ngoài.", example: "No, sorry, she's abroad." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo nhóm từ)
    dragDrop: {
      buckets: ["General Places", "Vertical (Top/Bottom)", "Horizontal (Front/Back)", "Status (Home/Away)"],
      items: [
        { id: "i1", word: "here", target: "General Places", vi: "ở đây" },
        { id: "i2", word: "there", target: "General Places", vi: "ở đó" },
        { id: "i3", word: "everywhere", target: "General Places", vi: "khắp mọi nơi" },
        { id: "i4", word: "back (return)", target: "General Places", vi: "trở lại" },
        { id: "i5", word: "the top", target: "Vertical (Top/Bottom)", vi: "đỉnh" },
        { id: "i6", word: "the bottom", target: "Vertical (Top/Bottom)", vi: "đáy" },
        { id: "i7", word: "the middle", target: "Vertical (Top/Bottom)", vi: "ở giữa (đường)" },
        { id: "i8", word: "the top of the mountain", target: "Vertical (Top/Bottom)", vi: "đỉnh núi" },
        { id: "i9", word: "the bottom of the glass", target: "Vertical (Top/Bottom)", vi: "đáy cốc" },
        { id: "i10", word: "the middle of the road", target: "Vertical (Top/Bottom)", vi: "giữa đường" },
        { id: "i11", word: "the top of the tree", target: "Vertical (Top/Bottom)", vi: "ngọn cây" },
        { id: "i12", word: "the bottom of the tree", target: "Vertical (Top/Bottom)", vi: "gốc cây" },
        { id: "i13", word: "the front", target: "Horizontal (Front/Back)", vi: "phía trước" },
        { id: "i14", word: "the back", target: "Horizontal (Front/Back)", vi: "phía sau" },
        { id: "i15", word: "the side", target: "Horizontal (Front/Back)", vi: "bên hông" },
        { id: "i16", word: "the front of the car", target: "Horizontal (Front/Back)", vi: "đầu xe" },
        { id: "i17", word: "the back of the car", target: "Horizontal (Front/Back)", vi: "đuôi xe" },
        { id: "i18", word: "the side of the car", target: "Horizontal (Front/Back)", vi: "hông xe" },
        { id: "i19", word: "the front of the bus", target: "Horizontal (Front/Back)", vi: "đầu xe buýt" },
        { id: "i20", word: "the back of the bus", target: "Horizontal (Front/Back)", vi: "đuôi xe buýt" },
        { id: "i21", word: "the side of the bus", target: "Horizontal (Front/Back)", vi: "hông xe buýt" },
        { id: "i22", word: "the beginning", target: "Horizontal (Front/Back)", vi: "phần đầu / điểm bắt đầu" },
        { id: "i23", word: "the end", target: "Horizontal (Front/Back)", vi: "phần cuối / điểm kết thúc" },
        { id: "i24", word: "at home", target: "Status (Home/Away)", vi: "ở nhà" },
        { id: "i25", word: "out", target: "Status (Home/Away)", vi: "ra ngoài" },
        { id: "i26", word: "away", target: "Status (Home/Away)", vi: "đi vắng" },
        { id: "i27", word: "abroad", target: "Status (Home/Away)", vi: "nước ngoài" },
        { id: "i28", word: "at the shops", target: "Status (Home/Away)", vi: "ở cửa hàng (out)" },
        { id: "i29", word: "in another town", target: "Status (Home/Away)", vi: "ở thành phố khác (away)" },
        { id: "i30", word: "in another country", target: "Status (Home/Away)", vi: "ở quốc gia khác (abroad)" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 18.1 đến 18.5)
    quiz: [
      { q: "1. Please bring it _____ next week.", options: ["here", "there", "out", "away"], a: "here" },
      { q: "2. Are you coming _____?", options: ["there", "here", "abroad", "away"], a: "here" },
      { q: "3. This letter is for a teacher at the university. Can you take it _____?", options: ["here", "there", "out", "everywhere"], a: "there" },
      { q: "4. I want to leave this letter in Nora's office. Are you going _____?", options: ["here", "there", "abroad", "away"], a: "there" },
      { q: "5. The opposite of 'the top' is _____.", options: ["the middle", "the back", "the bottom", "the side"], a: "the bottom" },
      { q: "6. The opposite of 'the front' is _____.", options: ["the side", "the bottom", "the beginning", "the back"], a: "the back" },
      { q: "7. The opposite of 'the beginning' is _____.", options: ["the middle", "the side", "the end", "the front"], a: "the end" },
      { q: "8. The opposite of 'left' is _____.", options: ["wrong", "right", "back", "front"], a: "right" },
      { q: "9. Is Mary _____ home?", options: ["in", "at", "on", "to"], a: "at" },
      { q: "10. No, she's _____. She went to the shops.", options: ["away", "abroad", "out", "there"], a: "out" },
      { q: "11. No, she's _____. She's in another town for three days.", options: ["out", "abroad", "away", "at home"], a: "away" },
      { q: "12. No, she's _____. She's in Germany right now.", options: ["abroad", "out", "at home", "away"], a: "abroad" },
      { q: "13. There are books and papers _____ in my room. (In all places)", options: ["everywhere", "anywhere", "somewhere", "here"], a: "everywhere" },
      { q: "14. The driver sits at the _____ of the bus.", options: ["back", "middle", "front", "top"], a: "front" },
      { q: "15. You hold a glass at the _____ or the side.", options: ["top", "middle", "bottom", "end"], a: "bottom" },
      { q: "16. I'd like to work _____ and learn about a new country.", options: ["out", "away", "abroad", "here"], a: "abroad" },
      { q: "17. Is Lily here? No, she's _____ but she'll be back in 5 minutes.", options: ["out", "away", "abroad", "there"], a: "out" },
      { q: "18. I'm going _____ tomorrow to my sister's. She lives 50 miles north of here.", options: ["abroad", "out", "away", "back"], a: "away" },
      { q: "19. When we go _____, we like to go to new countries.", options: ["out", "away", "abroad", "here"], a: "away" },
      { q: "20. Where is the unit on 'Have' in this book?", options: ["The beginning", "The middle", "The end", "The side"], a: "The beginning" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền khuyết)
    typingGame: [
      { q: "Come ______ please. (tới chỗ tôi)", hint: "h _ _ e", a: "here" },
      { q: "I'm going ______ in April. (tới chỗ đó)", hint: "t _ _ _ e", a: "there" },
      { q: "I'm coming ______ from Portugal in May. (trở về)", hint: "b _ _ k", a: "back" },
      { q: "There are books ______ in my room. (khắp mọi nơi)", hint: "e _ _ _ _ _ _ _ _ e", a: "everywhere" },
      { q: "The ______ of the mountain. (đỉnh)", hint: "t _ p", a: "top" },
      { q: "The ______ of the glass. (đáy)", hint: "b _ _ _ _ m", a: "bottom" },
      { q: "The ______ of the road. (giữa)", hint: "m _ _ _ _ e", a: "middle" },
      { q: "The ______ of the car. (phía trước)", hint: "f _ _ _ t", a: "front" },
      { q: "The ______ of the car. (phía sau)", hint: "b _ _ k", a: "back" },
      { q: "The ______ of the car. (bên hông)", hint: "s _ _ e", a: "side" },
      { q: "The ______ of the motorway. (điểm bắt đầu)", hint: "b _ _ _ _ _ _ _ g", a: "beginning" },
      { q: "The ______ of the motorway. (điểm kết thúc)", hint: "e _ d", a: "end" },
      { q: "This is his ______ hand. (bên trái)", hint: "l _ _ t", a: "left" },
      { q: "This is his ______ hand. (bên phải)", hint: "r _ _ _ t", a: "right" },
      { q: "Is Mary ______ home?", hint: "a t", a: "at" },
      { q: "No, she's ______ (at the shops).", hint: "o _ t", a: "out" },
      { q: "No, she's ______ (in another town).", hint: "a _ _ y", a: "away" },
      { q: "No, she's ______ (in another country).", hint: "a _ _ _ _ d", a: "abroad" },
      { q: "There is a cinema ______ the left.", hint: "o n", a: "on" },
      { q: "I'd like to work ______ and learn about a new country.", hint: "a _ _ _ _ d", a: "abroad" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "There are books and papers everywhere in my room.", trans: "Có sách và giấy tờ ở khắp mọi nơi trong phòng tôi." },
      { text: "In York Street, there is a cinema on the left and a restaurant on the right.", trans: "Trên phố York, có một rạp chiếu phim ở bên trái và một nhà hàng ở bên phải." },
      { text: "Is Mary at home? No, sorry, she's out.", trans: "Mary có ở nhà không? Không, rất tiếc, cô ấy đi ra ngoài rồi." },
      { text: "I'd like to work abroad and learn about a new country.", trans: "Tôi muốn làm việc ở nước ngoài và tìm hiểu về một đất nước mới." },
      { text: "I want to leave this letter in Nora's office. Are you going there?", trans: "Tôi muốn để lại lá thư này ở văn phòng của Nora. Bạn có đang đến đó không?" }
    ]
  },
  {
    id: 19,
    title: "Unit 19: Manner",
    description: "Manner (Cách thức) là cách chúng ta làm một việc gì đó. Bài học này giúp bạn phân biệt rõ ràng giữa Tính từ (dùng cho danh từ) và Trạng từ (dùng cho động từ).",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Fast and slow (Nhanh và chậm)",
        items: [
          { word: "fast (adjective)", type: "Tính từ", phonetic: "/fæst/", vi: "Nhanh (Dùng để miêu tả Danh từ).", example: "It's a fast car." },
          { word: "fast (adverb)", type: "Trạng từ", phonetic: "/fæst/", vi: "Một cách nhanh chóng. (KHÔNG CÓ 'fastly').", example: "This car goes very fast." },
          { word: "slow", type: "Tính từ", phonetic: "/sloʊ/", vi: "Chậm chạp.", example: "It's a slow car." },
          { word: "slowly", type: "Trạng từ", phonetic: "/ˈsloʊ.li/", vi: "Một cách chậm chạp.", example: "This car goes very slowly." }
        ]
      },
      {
        heading: "B. Right and wrong (Đúng và sai)",
        items: [
          { word: "right", type: "Tính/Trạng từ", phonetic: "/raɪt/", vi: "Đúng, chính xác.", example: "This sentence is right. / You guessed right." },
          { word: "wrong", type: "Tính/Trạng từ", phonetic: "/rɑːŋ/", vi: "Sai, không chính xác.", example: "This sentence is wrong. / You spelled it wrong." }
        ]
      },
      {
        heading: "C. Loud and quiet (Ồn ào và yên tĩnh)",
        items: [
          { word: "loud", type: "Tính từ", phonetic: "/laʊd/", vi: "To, ồn ào.", example: "The music is too loud." },
          { word: "loudly", type: "Trạng từ", phonetic: "/ˈlaʊd.li/", vi: "Một cách ầm ĩ, to tiếng.", example: "She sang loudly." },
          { word: "quiet", type: "Tính từ", phonetic: "/ˈkwaɪ.ət/", vi: "Yên lặng, không ồn ào.", example: "It's very quiet here." },
          { word: "quietly", type: "Trạng từ", phonetic: "/ˈkwaɪ.ət.li/", vi: "Một cách nhẹ nhàng, khẽ khàng.", example: "The teacher speaks very quietly. We can't hear him." }
        ]
      },
      {
        heading: "D. Well and badly (Tốt và tệ)",
        items: [
          { word: "good", type: "Tính từ", phonetic: "/ɡʊd/", vi: "Tốt, giỏi (Đi với danh từ hoặc động từ to be).", example: "She's a good driver." },
          { word: "well", type: "Trạng từ", phonetic: "/wel/", vi: "Một cách tốt, giỏi (Đây là trạng từ của 'good').", example: "She drives well. [NOT She drives good]" },
          { word: "bad", type: "Tính từ", phonetic: "/bæd/", vi: "Tệ, kém.", example: "He's a bad driver." },
          { word: "badly", type: "Trạng từ", phonetic: "/ˈbæd.li/", vi: "Một cách tệ hại.", example: "He drives badly." }
        ]
      },
      {
        heading: "E. Way (Cách thức)",
        items: [
          { word: "way", type: "Danh từ", phonetic: "/weɪ/", vi: "Cách thức mà ai đó làm việc gì.", example: "He's speaking in a friendly way." },
          { word: "in a friendly way", type: "Cụm từ", phonetic: "", vi: "Một cách thân thiện (Friendly là tính từ, nên phải dùng cụm từ này thay cho trạng từ).", example: "He always talks to me in a friendly way." },
          { word: "in a normal way", type: "Cụm từ", phonetic: "", vi: "Một cách bình thường.", example: "Please speak in a normal way." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại Adjectives, Adverbs và Way)
    dragDrop: {
      buckets: ["Adjectives (Go with Nouns)", "Adverbs (Go with Verbs)", "Adverbs without 'ly'", "Expressions with 'Way'"],
      items: [
        { id: "i1", word: "slow", target: "Adjectives (Go with Nouns)", vi: "chậm chạp" },
        { id: "i2", word: "quiet", target: "Adjectives (Go with Nouns)", vi: "yên tĩnh" },
        { id: "i3", word: "loud", target: "Adjectives (Go with Nouns)", vi: "to, ồn ào" },
        { id: "i4", word: "good", target: "Adjectives (Go with Nouns)", vi: "tốt, giỏi" },
        { id: "i5", word: "bad", target: "Adjectives (Go with Nouns)", vi: "tệ, dở" },
        { id: "i6", word: "friendly", target: "Adjectives (Go with Nouns)", vi: "thân thiện" },
        { id: "i7", word: "strange", target: "Adjectives (Go with Nouns)", vi: "kỳ lạ" },
        { id: "i8", word: "normal", target: "Adjectives (Go with Nouns)", vi: "bình thường" },
        { id: "i9", word: "sad", target: "Adjectives (Go with Nouns)", vi: "buồn bã" },
        { id: "i10", word: "slowly", target: "Adverbs (Go with Verbs)", vi: "một cách chậm chạp" },
        { id: "i11", word: "quietly", target: "Adverbs (Go with Verbs)", vi: "một cách nhỏ nhẹ" },
        { id: "i12", word: "loudly", target: "Adverbs (Go with Verbs)", vi: "một cách to tiếng" },
        { id: "i13", word: "well", target: "Adverbs (Go with Verbs)", vi: "một cách tốt, giỏi" },
        { id: "i14", word: "badly", target: "Adverbs (Go with Verbs)", vi: "một cách tệ hại" },
        { id: "i15", word: "strangely", target: "Adverbs (Go with Verbs)", vi: "một cách kỳ lạ" },
        { id: "i16", word: "suddenly", target: "Adverbs (Go with Verbs)", vi: "một cách đột ngột" },
        { id: "i17", word: "sadly", target: "Adverbs (Go with Verbs)", vi: "một cách buồn bã" },
        { id: "i18", word: "easily", target: "Adverbs (Go with Verbs)", vi: "một cách dễ dàng" },
        { id: "i19", word: "quickly", target: "Adverbs (Go with Verbs)", vi: "một cách nhanh nhẹn" },
        { id: "i20", word: "politely", target: "Adverbs (Go with Verbs)", vi: "một cách lịch sự" },
        { id: "i21", word: "fast (adv)", target: "Adverbs without 'ly'", vi: "nhanh (không có fastly)" },
        { id: "i22", word: "right (adv)", target: "Adverbs without 'ly'", vi: "chính xác" },
        { id: "i23", word: "wrong (adv)", target: "Adverbs without 'ly'", vi: "sai lệch" },
        { id: "i24", word: "hard (adv)", target: "Adverbs without 'ly'", vi: "chăm chỉ / vất vả" },
        { id: "i25", word: "in a friendly way", target: "Expressions with 'Way'", vi: "một cách thân thiện" },
        { id: "i26", word: "in an unfriendly way", target: "Expressions with 'Way'", vi: "một cách không thân thiện" },
        { id: "i27", word: "in a strange way", target: "Expressions with 'Way'", vi: "một cách kỳ lạ" },
        { id: "i28", word: "in a normal way", target: "Expressions with 'Way'", vi: "một cách bình thường" },
        { id: "i29", word: "in a bad way", target: "Expressions with 'Way'", vi: "theo một hướng tồi tệ" },
        { id: "i30", word: "in a good way", target: "Expressions with 'Way'", vi: "theo một hướng tốt" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Bẫy lỗi Adjective vs Adverb)
    quiz: [
      { q: "1. He is a very _____ swimmer.", options: ["fast", "fastly", "quick", "quickly"], a: "fast" },
      { q: "2. This car goes very _____.", options: ["fastly", "fast", "speed", "quick"], a: "fast" },
      { q: "3. She is a _____ driver.", options: ["well", "good", "badly", "slowly"], a: "good" },
      { q: "4. She drives _____.", options: ["good", "nice", "well", "friendly"], a: "well" },
      { q: "5. The teacher speaks very _____. We can't hear him.", options: ["quiet", "quietly", "loud", "loudly"], a: "quietly" },
      { q: "6. It's very _____ here. There is no noise.", options: ["quietly", "quiet", "loudly", "loud"], a: "quiet" },
      { q: "7. He's a _____ singer. I hate his voice.", options: ["badly", "wrong", "bad", "slow"], a: "bad" },
      { q: "8. He sings very _____.", options: ["bad", "badly", "wrong", "wrongly"], a: "badly" },
      { q: "9. This sentence is _____.", options: ["rightly", "wrongly", "wrong", "badly"], a: "wrong" },
      { q: "10. This train is slow. It goes very _____.", options: ["slow", "slowly", "slowing", "slows"], a: "slowly" },
      { q: "11. She is always loud. She speaks very _____.", options: ["loud", "louds", "loudly", "louder"], a: "loudly" },
      { q: "12. He is speaking in a friendly _____.", options: ["manner", "way", "method", "style"], a: "way" },
      { q: "13. Which is the correct adverb for 'friendly'?", options: ["friendlily", "friendly", "in a friendly way", "friend"], a: "in a friendly way" },
      { q: "14. Which is correct?", options: ["I like very much coffee.", "I like coffee very much.", "I very much like coffee.", "Very much I like coffee."], a: "I like coffee very much." },
      { q: "15. 'Suddenly' means...", options: ["very slowly", "quickly and unexpectedly", "with no difficulty", "in an unhappy way"], a: "quickly and unexpectedly" },
      { q: "16. 'Easily' means...", options: ["with no difficulty", "in an unhappy way", "very quickly", "not normal"], a: "with no difficulty" },
      { q: "17. 'Strangely' means...", options: ["in an unhappy way", "very fast", "not in a normal way", "with no difficulty"], a: "not in a normal way" },
      { q: "18. To speak 'impolitely' means to speak in a _____ way.", options: ["nice", "friendly", "rude/bad", "normal"], a: "rude/bad" },
      { q: "19. Which is correct?", options: ["She sang good.", "She sang well.", "She sang goodly.", "She sang nice."], a: "She sang well." },
      { q: "20. The baby is sleeping. Please close the door _____.", options: ["quiet", "quietly", "loud", "loudly"], a: "quietly" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn lỗi chính tả Adverb)
    typingGame: [
      { q: "This train is slow. It goes very ______.", hint: "s _ _ _ _ y", a: "slowly" },
      { q: "He is a bad singer. He sings very ______.", hint: "b _ _ _ y", a: "badly" },
      { q: "She is always loud. She speaks very ______.", hint: "l _ _ _ _ y", a: "loudly" },
      { q: "He's a fast swimmer. He swims very ______. (NO 'ly')", hint: "f _ _ t", a: "fast" },
      { q: "This girl is quiet. She always speaks ______.", hint: "q _ _ _ _ _ y", a: "quietly" },
      { q: "He's a good English-speaker. He speaks English ______.", hint: "w _ _ l", a: "well" },
      { q: "I can do this homework with no difficulty. I can do it ______.", hint: "e _ _ _ _ y", a: "easily" },
      { q: "He didn't say 'thank you'. He spoke ______.", hint: "i _ _ _ _ _ _ _ _ y", a: "impolitely" },
      { q: "She was crying. She spoke ______.", hint: "s _ _ _ y", a: "sadly" },
      { q: "The car stopped very quickly and unexpectedly. It stopped ______.", hint: "s _ _ _ _ _ _ y", a: "suddenly" },
      { q: "He isn't acting in a normal way. He is acting ______.", hint: "s _ _ _ _ _ _ _ y", a: "strangely" },
      { q: "She is a ______ driver. (Tính từ)", hint: "g _ _ d", a: "good" },
      { q: "The music is too ______. (Tính từ)", hint: "l _ _ d", a: "loud" },
      { q: "This sentence is ______. (= not right)", hint: "w _ _ _ g", a: "wrong" },
      { q: "This sentence is ______. (= not wrong)", hint: "r _ _ _ t", a: "right" },
      { q: "He's speaking in an unfriendly ______. (= manner)", hint: "w _ y", a: "way" },
      { q: "A turtle goes very ______.", hint: "s _ _ _ _ y", a: "slowly" },
      { q: "My bedroom is very ______. There is no noise.", hint: "q _ _ _ t", a: "quiet" },
      { q: "She runs very ______. (Not fastly)", hint: "f _ _ t", a: "fast" },
      { q: "I like coffee very ______. (Not 'I like very much coffee')", hint: "m _ _ h", a: "much" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "This car goes very fast.", trans: "Chiếc xe này chạy rất nhanh." },
      { text: "She is a good driver. She drives well.", trans: "Cô ấy là một người lái xe giỏi. Cô ấy lái xe tốt." },
      { text: "The teacher speaks very quietly. We can't hear him.", trans: "Thầy giáo nói rất nhỏ. Chúng tôi không thể nghe thấy thầy." },
      { text: "He is speaking in a friendly way.", trans: "Anh ấy đang nói chuyện theo một cách thân thiện." },
      { text: "I like coffee very much.", trans: "Tôi rất thích cà phê." }
    ]
  },

  {
    id: 20,
    title: "Unit 20: Irregular verbs",
    description: "Tiếng Anh có rất nhiều động từ bất quy tắc. Đừng học thuộc lòng một cách máy móc! Bài này chia chúng thành 4 nhóm quy luật: A-A-A, A-B-B, A-B-A và A-B-C để bạn dễ dàng ghi nhớ.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. All forms the same (A - A - A)",
        items: [
          { word: "cost - cost - cost", type: "V1 - V2 - V3", phonetic: "/kɑːst/", vi: "Trị giá, có giá là.", example: "This book cost £10." },
          { word: "let - let - let", type: "V1 - V2 - V3", phonetic: "/let/", vi: "Cho phép.", example: "My parents let me go out." },
          { word: "cut - cut - cut", type: "V1 - V2 - V3", phonetic: "/kʌt/", vi: "Cắt.", example: "I cut my finger yesterday." },
          { word: "put - put - put", type: "V1 - V2 - V3", phonetic: "/pʊt/", vi: "Đặt, để.", example: "Put the book on the table." },
          { word: "hurt - hurt - hurt", type: "V1 - V2 - V3", phonetic: "/hɝːt/", vi: "Làm đau, bị thương.", example: "My back hurts." },
          { word: "shut - shut - shut", type: "V1 - V2 - V3", phonetic: "/ʃʌt/", vi: "Đóng lại.", example: "Please shut the door." }
        ]
      },
      {
        heading: "B. Two different forms (A - B - B) - Phần 1",
        items: [
          { word: "keep - kept - kept", type: "V1 - V2 - V3", phonetic: "/kiːp/ /kept/", vi: "Giữ.", example: "He kept the money." },
          { word: "sleep - slept - slept", type: "V1 - V2 - V3", phonetic: "/sliːp/ /slept/", vi: "Ngủ.", example: "I slept very well." },
          { word: "feel - felt - felt", type: "V1 - V2 - V3", phonetic: "/fiːl/ /felt/", vi: "Cảm thấy.", example: "I felt ill yesterday." },
          { word: "leave - left - left", type: "V1 - V2 - V3", phonetic: "/liːv/ /left/", vi: "Rời đi, để lại.", example: "She left the office at six." },
          { word: "meet - met - met", type: "V1 - V2 - V3", phonetic: "/miːt/ /met/", vi: "Gặp gỡ.", example: "I met my friend." },
          { word: "bring - brought - brought", type: "V1 - V2 - V3", phonetic: "/brɪŋ/ /brɔːt/", vi: "Mang đến.", example: "He brought a present." },
          { word: "buy - bought - bought", type: "V1 - V2 - V3", phonetic: "/baɪ/ /bɑːt/", vi: "Mua.", example: "I bought a car." },
          { word: "think - thought - thought", type: "V1 - V2 - V3", phonetic: "/θɪŋk/ /θɑːt/", vi: "Nghĩ.", example: "I thought about it." }
        ]
      },
      {
        heading: "C. Two different forms (A - B - B) - Phần 2",
        items: [
          { word: "find - found - found", type: "V1 - V2 - V3", phonetic: "/faɪnd/ /faʊnd/", vi: "Tìm thấy.", example: "I found my keys." },
          { word: "pay - paid - paid", type: "V1 - V2 - V3", phonetic: "/peɪ/ /peɪd/", vi: "Trả tiền.", example: "I paid for the meal." },
          { word: "say - said - said", type: "V1 - V2 - V3", phonetic: "/seɪ/ /sed/", vi: "Nói.", example: "She said hello." },
          { word: "tell - told - told", type: "V1 - V2 - V3", phonetic: "/tel/ /toʊld/", vi: "Bảo, kể.", example: "He told me a story." },
          { word: "make - made - made", type: "V1 - V2 - V3", phonetic: "/meɪk/ /meɪd/", vi: "Làm, chế tạo.", example: "I made a cake." },
          { word: "have - had - had", type: "V1 - V2 - V3", phonetic: "/hæv/ /hæd/", vi: "Có.", example: "I had a dog." },
          { word: "understand - understood", type: "V1 - V2 - V3", phonetic: "/ˌʌn.dɚˈstænd/", vi: "Hiểu.", example: "I understood the lesson." }
        ]
      },
      {
        heading: "D. Three different forms (A - B - C) & (A - B - A)",
        items: [
          { word: "run - ran - run", type: "A - B - A", phonetic: "/rʌn/ /ræn/", vi: "Chạy.", example: "He ran a marathon." },
          { word: "come - came - come", type: "A - B - A", phonetic: "/kʌm/ /keɪm/", vi: "Đến.", example: "She came home." },
          { word: "go - went - gone", type: "A - B - C", phonetic: "/ɡoʊ/ /went/ /ɡɑːn/", vi: "Đi.", example: "He has gone to Paris." },
          { word: "drink - drank - drunk", type: "A - B - C", phonetic: "/drɪŋk/ /dræŋk/ /drʌŋk/", vi: "Uống.", example: "I drank some water." },
          { word: "write - wrote - written", type: "A - B - C", phonetic: "/raɪt/ /roʊt/ /ˈrɪt.ən/", vi: "Viết.", example: "I wrote a letter." },
          { word: "speak - spoke - spoken", type: "A - B - C", phonetic: "/spiːk/ /spoʊk/ /ˈspoʊ.kən/", vi: "Nói.", example: "He spoke to me." },
          { word: "take - took - taken", type: "A - B - C", phonetic: "/teɪk/ /tʊk/ /ˈteɪ.kən/", vi: "Lấy, mất (thời gian).", example: "It took two hours." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại các Động từ nguyên mẫu vào nhóm Quy luật của chúng)
    dragDrop: {
      buckets: ["Nhóm A-A-A (cut-cut-cut)", "Nhóm A-B-B (buy-bought)", "Nhóm A-B-A (run-ran-run)", "Nhóm A-B-C (go-went-gone)"],
      items: [
        { id: "i1", word: "cost (có giá)", target: "Nhóm A-A-A (cut-cut-cut)", vi: "cost - cost - cost" },
        { id: "i2", word: "cut (cắt)", target: "Nhóm A-A-A (cut-cut-cut)", vi: "cut - cut - cut" },
        { id: "i3", word: "put (đặt/để)", target: "Nhóm A-A-A (cut-cut-cut)", vi: "put - put - put" },
        { id: "i4", word: "hurt (làm đau)", target: "Nhóm A-A-A (cut-cut-cut)", vi: "hurt - hurt - hurt" },
        { id: "i5", word: "shut (đóng)", target: "Nhóm A-A-A (cut-cut-cut)", vi: "shut - shut - shut" },
        { id: "i6", word: "let (cho phép)", target: "Nhóm A-A-A (cut-cut-cut)", vi: "let - let - let" },
        { id: "i7", word: "keep (giữ)", target: "Nhóm A-B-B (buy-bought)", vi: "keep - kept - kept" },
        { id: "i8", word: "sleep (ngủ)", target: "Nhóm A-B-B (buy-bought)", vi: "sleep - slept - slept" },
        { id: "i9", word: "feel (cảm thấy)", target: "Nhóm A-B-B (buy-bought)", vi: "feel - felt - felt" },
        { id: "i10", word: "leave (rời đi)", target: "Nhóm A-B-B (buy-bought)", vi: "leave - left - left" },
        { id: "i11", word: "bring (mang đến)", target: "Nhóm A-B-B (buy-bought)", vi: "bring - brought - brought" },
        { id: "i12", word: "buy (mua)", target: "Nhóm A-B-B (buy-bought)", vi: "buy - bought - bought" },
        { id: "i13", word: "think (nghĩ)", target: "Nhóm A-B-B (buy-bought)", vi: "think - thought - thought" },
        { id: "i14", word: "find (tìm thấy)", target: "Nhóm A-B-B (buy-bought)", vi: "find - found - found" },
        { id: "i15", word: "pay (trả tiền)", target: "Nhóm A-B-B (buy-bought)", vi: "pay - paid - paid" },
        { id: "i16", word: "make (làm)", target: "Nhóm A-B-B (buy-bought)", vi: "make - made - made" },
        { id: "i17", word: "run (chạy)", target: "Nhóm A-B-A (run-ran-run)", vi: "run - ran - run" },
        { id: "i18", word: "come (đến)", target: "Nhóm A-B-A (run-ran-run)", vi: "come - came - come" },
        { id: "i19", word: "become (trở thành)", target: "Nhóm A-B-A (run-ran-run)", vi: "become - became - become" },
        { id: "i20", word: "go (đi)", target: "Nhóm A-B-C (go-went-gone)", vi: "go - went - gone" },
        { id: "i21", word: "be (thì/là/ở)", target: "Nhóm A-B-C (go-went-gone)", vi: "be - was/were - been" },
        { id: "i22", word: "drink (uống)", target: "Nhóm A-B-C (go-went-gone)", vi: "drink - drank - drunk" },
        { id: "i23", word: "fly (bay)", target: "Nhóm A-B-C (go-went-gone)", vi: "fly - flew - flown" },
        { id: "i24", word: "speak (nói)", target: "Nhóm A-B-C (go-went-gone)", vi: "speak - spoke - spoken" },
        { id: "i25", word: "write (viết)", target: "Nhóm A-B-C (go-went-gone)", vi: "write - wrote - written" },
        { id: "i26", word: "take (lấy)", target: "Nhóm A-B-C (go-went-gone)", vi: "take - took - taken" },
        { id: "i27", word: "eat (ăn)", target: "Nhóm A-B-C (go-went-gone)", vi: "eat - ate - eaten" },
        { id: "i28", word: "give (cho)", target: "Nhóm A-B-C (go-went-gone)", vi: "give - gave - given" },
        { id: "i29", word: "know (biết)", target: "Nhóm A-B-C (go-went-gone)", vi: "know - knew - known" },
        { id: "i30", word: "swim (bơi)", target: "Nhóm A-B-C (go-went-gone)", vi: "swim - swam - swum" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Kiểm tra trí nhớ V2 / V3)
    quiz: [
      { q: "1. What is the past simple (V2) of 'open'?", options: ["open", "openned", "opened", "opent"], a: "opened" },
      { q: "2. What is the past simple (V2) of 'give'?", options: ["gived", "gave", "given", "gove"], a: "gave" },
      { q: "3. What is the past simple (V2) of 'come'?", options: ["comed", "came", "come", "coming"], a: "came" },
      { q: "4. What is the past simple (V2) of 'make'?", options: ["maked", "make", "made", "maden"], a: "made" },
      { q: "5. What is the past simple (V2) of 'walk'?", options: ["walk", "walked", "walkt", "wolked"], a: "walked" },
      { q: "6. What is the past simple (V2) of 'wake'?", options: ["waked", "wake", "woke", "woken"], a: "woke" },
      { q: "7. What is the past simple (V2) of 'win'?", options: ["winned", "wan", "won", "wined"], a: "won" },
      { q: "8. What is the past simple (V2) of 'buy'?", options: ["buyed", "bought", "brought", "bayed"], a: "bought" },
      { q: "9. We have _____ in the sea every day this week.", options: ["swim", "swam", "swum", "swims"], a: "swum" },
      { q: "10. Where is my bike? Someone has _____ it!", options: ["steal", "stole", "stolen", "stealed"], a: "stolen" },
      { q: "11. I have _____ a long time on this work.", options: ["spend", "spended", "spent", "spending"], a: "spent" },
      { q: "12. That boy has _____ very lazy recently. (become)", options: ["become", "became", "becomed", "becoming"], a: "become" },
      { q: "13. I hope Jack has _____ the bus and won't be late. (catch)", options: ["catched", "caught", "cot", "catch"], a: "caught" },
      { q: "14. Poor John. He has _____ his leg badly. (break)", options: ["break", "broke", "broken", "breakt"], a: "broken" },
      { q: "15. But he hasn't _____ it. (hurt)", options: ["hurted", "hurt", "hart", "hurten"], a: "hurt" },
      { q: "16. Yesterday Jane _____ up at 7.00. (wake)", options: ["woke", "waked", "waken", "wake"], a: "woke" },
      { q: "17. She _____ an apple and she _____ a cup of hot chocolate.", options: ["eat / drink", "ate / drank", "eaten / drunk", "ated / drinked"], a: "ate / drank" },
      { q: "18. Then she got in her car and _____ to work.", options: ["drived", "drave", "drove", "driven"], a: "drove" },
      { q: "19. What is the past participle (V3) of 'forget'?", options: ["forget", "forgot", "forgotten", "forgetted"], a: "forgotten" },
      { q: "20. What is the past participle (V3) of 'know'?", options: ["knew", "knowed", "known", "know"], a: "known" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền khuyết thì Quá khứ)
    typingGame: [
      { q: "Past of 'go': Yesterday I ______ to the shop.", hint: "w _ _ t", a: "went" },
      { q: "Past of 'eat': She ______ an apple.", hint: "a _ e", a: "ate" },
      { q: "Past of 'drink': She ______ a cup of hot chocolate.", hint: "d _ _ _ k", a: "drank" },
      { q: "Past of 'drive': She ______ to work.", hint: "d _ _ _ e", a: "drove" },
      { q: "Past of 'read': She ______ a newspaper.", hint: "r _ _ d", a: "read" },
      { q: "Past of 'write': She ______ some letters.", hint: "w _ _ _ e", a: "wrote" },
      { q: "Past of 'run': She ______ in the park for half an hour.", hint: "r _ n", a: "ran" },
      { q: "Past of 'have': She ______ a sandwich for lunch.", hint: "h _ d", a: "had" },
      { q: "Past of 'sit': She ______ at her desk again.", hint: "s _ t", a: "sat" },
      { q: "Past of 'make': She ______ some telephone calls.", hint: "m _ _ e", a: "made" },
      { q: "Past of 'leave': She ______ the office at six o'clock.", hint: "l _ _ t", a: "left" },
      { q: "Past of 'meet': She ______ some Japanese visitors.", hint: "m _ t", a: "met" },
      { q: "Past of 'sleep': After a busy day Jane ______ very well.", hint: "s _ _ _ t", a: "slept" },
      { q: "Past Participle (V3) of 'swim': We have ______ in the sea.", hint: "s _ _ m", a: "swum" },
      { q: "Past Participle (V3) of 'steal': Someone has ______ it!", hint: "s _ _ _ _ n", a: "stolen" },
      { q: "Past Participle (V3) of 'spend': I have ______ a long time on this.", hint: "s _ _ _ t", a: "spent" },
      { q: "Past Participle (V3) of 'catch': Jack has ______ the bus.", hint: "c _ _ _ _ t", a: "caught" },
      { q: "Past Participle (V3) of 'break': He has ______ his leg.", hint: "b _ _ _ _ n", a: "broken" },
      { q: "Past Participle (V3) of 'hurt': But he hasn't ______ it. (V1-V2-V3 giống nhau)", hint: "h _ _ t", a: "hurt" },
      { q: "Past Participle (V3) of 'take': She has ______ my book.", hint: "t _ _ _ n", a: "taken" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "Yesterday I fell and broke my arm.", trans: "Hôm qua tôi bị ngã và làm gãy tay của mình." },
      { text: "I felt ill yesterday, but I feel OK today.", trans: "Tôi cảm thấy ốm vào ngày hôm qua, nhưng hôm nay tôi cảm thấy ổn rồi." },
      { text: "She left the office at six o'clock and met some visitors.", trans: "Cô ấy đã rời văn phòng lúc 6 giờ và gặp vài vị khách." },
      { text: "Where is my bike? Someone has stolen it!", trans: "Xe đạp của tôi đâu rồi? Ai đó đã lấy cắp nó rồi!" },
      { text: "I have spent a long time on this work.", trans: "Tôi đã dành một thời gian dài cho công việc này." }
    ]
  },
  {
    id: 21,
    title: "Unit 21: Common uncountable words",
    description: "Khám phá danh sách các danh từ không đếm được (Uncountable nouns) thông dụng nhất. Bạn sẽ học cách tránh các lỗi sai kinh điển như dùng 'a/an' hoặc thêm 's' vào những từ này.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. What is countable? (Đếm được là gì?)",
        items: [
          { word: "countable", type: "Ngữ pháp", phonetic: "/ˈkaʊn.t̬ə.bəl/", vi: "Đếm được (có thể thêm số đếm ở trước, có dạng số nhiều).", example: "apples, shoes, plates (4 apples, 2 shoes)" },
          { word: "uncountable", type: "Ngữ pháp", phonetic: "/ʌnˈkaʊn.t̬ə.bəl/", vi: "Không đếm được (KHÔNG thêm số đếm, KHÔNG có dạng số nhiều 's/es').", example: "sugar, money, luggage [KHÔNG DÙNG: 3 luggages]" },
          { word: "some", type: "Từ hạn định", phonetic: "/sʌm/", vi: "Một ít, một vài (Dùng được cho cả đếm được số nhiều và không đếm được).", example: "Can I have three apples and some sugar, please?" }
        ]
      },
      {
        heading: "B. Everyday uncountable words (Từ không đếm được thường ngày)",
        items: [
          { word: "furniture", type: "Danh từ", phonetic: "/ˈfɝː.nɪ.tʃɚ/", vi: "Đồ nội thất (Bàn, ghế, tủ nói chung).", example: "This furniture is modern. [KHÔNG DÙNG: furnitures]" },
          { word: "traffic", type: "Danh từ", phonetic: "/ˈtræf.ɪk/", vi: "Giao thông, xe cộ qua lại.", example: "The traffic is bad today." },
          { word: "information", type: "Danh từ", phonetic: "/ˌɪn.fɚˈmeɪ.ʃən/", vi: "Thông tin.", example: "He can give you some useful information. [NOT an information / informations]" },
          { word: "advice", type: "Danh từ", phonetic: "/ədˈvaɪs/", vi: "Lời khuyên.", example: "I'll give you some advice about your future. [NOT an advice]" },
          { word: "weather", type: "Danh từ", phonetic: "/ˈweð.ɚ/", vi: "Thời tiết.", example: "It's terrible weather today. [NOT a terrible weather]" },
          { word: "work", type: "Danh từ", phonetic: "/wɝːk/", vi: "Công việc.", example: "Studying is hard work. [NOT a hard work]" },
          { word: "news", type: "Danh từ", phonetic: "/nuːz/", vi: "Tin tức (Mặc dù có chữ 's' nhưng luôn là số ít).", example: "There is some bad news today. [NOT The news are]" },
          { word: "accommodation", type: "Danh từ", phonetic: "/əˌkɑː.məˈdeɪ.ʃən/", vi: "Chỗ ở.", example: "Accommodation here is expensive." },
          { word: "air", type: "Danh từ", phonetic: "/er/", vi: "Không khí.", example: "I need some fresh air." },
          { word: "travel", type: "Danh từ", phonetic: "/ˈtræv.əl/", vi: "Việc đi lại, du lịch nói chung.", example: "Air travel is faster than rail travel." }
        ]
      },
      {
        heading: "C. Food and drink (Thức ăn và đồ uống)",
        items: [
          { word: "food categories", type: "Từ vựng", phonetic: "", vi: "Rất nhiều đồ ăn thức uống là KHÔNG đếm được.", example: "rice, spaghetti, butter, bread, milk, water, tea, coffee." },
          { word: "measurements", type: "Đơn vị đo", phonetic: "", vi: "Để nói số lượng của đồ không đếm được, ta dùng các đơn vị đo lường.", example: "Three loaves of bread (3 ổ bánh mì), two litres of milk (2 lít sữa), a kilo of apples (1 ký táo)." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại Countable vs Uncountable)
    dragDrop: {
      buckets: ["Countable (Thêm được S)", "Uncountable (Ý tưởng/Trừu tượng)", "Uncountable (Vật chất/Đồ ăn)", "Measurements (Đơn vị đếm)"],
      items: [
        { id: "i1", word: "apple", target: "Countable (Thêm được S)", vi: "quả táo" },
        { id: "i2", word: "shoe", target: "Countable (Thêm được S)", vi: "chiếc giày" },
        { id: "i3", word: "plate", target: "Countable (Thêm được S)", vi: "cái đĩa" },
        { id: "i4", word: "car", target: "Countable (Thêm được S)", vi: "ô tô" },
        { id: "i5", word: "job", target: "Countable (Thêm được S)", vi: "nghề nghiệp, việc làm" },
        { id: "i6", word: "suitcase", target: "Countable (Thêm được S)", vi: "vali" },
        { id: "i7", word: "chair", target: "Countable (Thêm được S)", vi: "cái ghế" },
        { id: "i8", word: "fact", target: "Countable (Thêm được S)", vi: "sự thật" },
        { id: "i9", word: "information", target: "Uncountable (Ý tưởng/Trừu tượng)", vi: "thông tin" },
        { id: "i10", word: "advice", target: "Uncountable (Ý tưởng/Trừu tượng)", vi: "lời khuyên" },
        { id: "i11", word: "news", target: "Uncountable (Ý tưởng/Trừu tượng)", vi: "tin tức" },
        { id: "i12", word: "work", target: "Uncountable (Ý tưởng/Trừu tượng)", vi: "công việc" },
        { id: "i13", word: "travel", target: "Uncountable (Ý tưởng/Trừu tượng)", vi: "sự di chuyển" },
        { id: "i14", word: "weather", target: "Uncountable (Ý tưởng/Trừu tượng)", vi: "thời tiết" },
        { id: "i15", word: "time", target: "Uncountable (Ý tưởng/Trừu tượng)", vi: "thời gian" },
        { id: "i16", word: "money", target: "Uncountable (Ý tưởng/Trừu tượng)", vi: "tiền bạc" },
        { id: "i17", word: "furniture", target: "Uncountable (Vật chất/Đồ ăn)", vi: "đồ nội thất" },
        { id: "i18", word: "luggage", target: "Uncountable (Vật chất/Đồ ăn)", vi: "hành lý" },
        { id: "i19", word: "traffic", target: "Uncountable (Vật chất/Đồ ăn)", vi: "giao thông" },
        { id: "i20", word: "accommodation", target: "Uncountable (Vật chất/Đồ ăn)", vi: "chỗ ở" },
        { id: "i21", word: "bread", target: "Uncountable (Vật chất/Đồ ăn)", vi: "bánh mì" },
        { id: "i22", word: "spaghetti", target: "Uncountable (Vật chất/Đồ ăn)", vi: "mì Ý" },
        { id: "i23", word: "butter", target: "Uncountable (Vật chất/Đồ ăn)", vi: "bơ" },
        { id: "i24", word: "milk", target: "Uncountable (Vật chất/Đồ ăn)", vi: "sữa" },
        { id: "i25", word: "a kilo of", target: "Measurements (Đơn vị đếm)", vi: "một ký..." },
        { id: "i26", word: "a litre of", target: "Measurements (Đơn vị đếm)", vi: "một lít..." },
        { id: "i27", word: "a loaf of", target: "Measurements (Đơn vị đếm)", vi: "một ổ..." },
        { id: "i28", word: "a piece of", target: "Measurements (Đơn vị đếm)", vi: "một mẩu/miếng..." },
        { id: "i29", word: "a bottle of", target: "Measurements (Đơn vị đếm)", vi: "một chai..." },
        { id: "i30", word: "a cup of", target: "Measurements (Đơn vị đếm)", vi: "một tách..." }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Bẫy lỗi Uncountable Nouns Ex 21.1-21.5)
    quiz: [
      { q: "1. Which sentence is correct?", options: ["The news are not very good today.", "The news is not very good today.", "The new is not very good today.", "A news is not very good today."], a: "The news is not very good today." },
      { q: "2. I need _____ about the trains to London.", options: ["an information", "some informations", "some information", "two informations"], a: "some information" },
      { q: "3. Let me give you _____.", options: ["an advice", "some advices", "some advice", "two advices"], a: "some advice" },
      { q: "4. Mary is looking for _____.", options: ["a new work", "a new job", "some new works", "a new works"], a: "a new job" },
      { q: "5. Can I have _____, please?", options: ["a bread", "some breads", "a piece of bread", "two breads"], a: "a piece of bread" },
      { q: "6. We should buy _____.", options: ["some new furnitures", "a new furniture", "some new furniture", "many furnitures"], a: "some new furniture" },
      { q: "7. The east of the country usually has _____ than the west.", options: ["a better weather", "better weather", "better weathers", "some better weathers"], a: "better weather" },
      { q: "8. We went on two long _____ last year.", options: ["travels", "journeys", "travel", "journey"], a: "journeys" },
      { q: "9. I must find _____ soon.", options: ["a new accommodation", "new accommodation", "some new accommodations", "an accommodation"], a: "new accommodation" },
      { q: "10. Cook _____ for ten minutes.", options: ["this spaghetti", "these spaghettis", "these spaghetti", "a spaghetti"], a: "this spaghetti" },
      { q: "11. The traffic _____ bad today.", options: ["are", "is", "were", "have"], a: "is" },
      { q: "12. Their furniture _____ very old and very beautiful.", options: ["is", "are", "have", "were"], a: "is" },
      { q: "13. I'd like to buy a car but I haven't got enough _____.", options: ["moneys", "money", "a money", "dollar"], a: "money" },
      { q: "14. Cows give us _____ and _____.", options: ["milks / butters", "milk / butter", "a milk / a butter", "milks / butter"], a: "milk / butter" },
      { q: "15. The _____ at the seaside is very good for you.", options: ["air", "airs", "an air", "some airs"], a: "air" },
      { q: "16. Rob left school last month and is now looking for _____.", options: ["a work", "works", "work", "the works"], a: "work" },
      { q: "17. There is always a lot of _____ in central London.", options: ["traffics", "traffic", "a traffic", "car"], a: "traffic" },
      { q: "18. Accommodation in the city centre _____ expensive.", options: ["is", "are", "be", "were"], a: "is" },
      { q: "19. Which word is COUNTABLE?", options: ["suitcase", "luggage", "furniture", "money"], a: "suitcase" },
      { q: "20. Which phrase is correct to express quantity?", options: ["three breads", "three loaves of bread", "three bread", "three piece of breads"], a: "three loaves of bread" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn chính tả các từ không đếm được)
    typingGame: [
      { q: "I need to buy some new ______ for my living room (tables, chairs).", hint: "f _ _ _ _ _ _ _ e", a: "furniture" },
      { q: "There are too many cars. The ______ is very bad today.", hint: "t _ _ _ _ _ c", a: "traffic" },
      { q: "I need some ______ about the timetable (facts/details).", hint: "i _ _ _ _ _ _ _ _ _ n", a: "information" },
      { q: "Can you give me some ______? I don't know what to do.", hint: "a _ _ _ _ e", a: "advice" },
      { q: "It's raining and windy. It's terrible ______ today.", hint: "w _ _ _ _ _ r", a: "weather" },
      { q: "I'm very tired. Studying is hard ______.", hint: "w _ _ k", a: "work" },
      { q: "I read the newspaper. There is some bad ______ today.", hint: "n _ _ s", a: "news" },
      { q: "Hotels are very expensive. ______ here is expensive.", hint: "a _ _ _ _ _ _ _ _ _ _ n", a: "accommodation" },
      { q: "Open the window. I need some fresh ______.", hint: "a _ r", a: "air" },
      { q: "I love going to other countries. I love foreign ______.", hint: "t _ _ _ _ l", a: "travel" },
      { q: "At the airport, you must weigh your ______ (bags and suitcases).", hint: "l _ _ _ _ _ e", a: "luggage" },
      { q: "In Italy, they eat a lot of ______ (like pasta).", hint: "s _ _ _ _ _ _ _ i", a: "spaghetti" },
      { q: "I like to put ______ on my bread.", hint: "b _ _ _ _ r", a: "butter" },
      { q: "I bought three loaves of ______.", hint: "b _ _ _ d", a: "bread" },
      { q: "I drank a litre of ______.", hint: "m _ _ k", a: "milk" },
      { q: "I need a kilo of ______ (sweet white powder).", hint: "s _ _ _ r", a: "sugar" },
      { q: "I'd like to buy a house, but I haven't got enough ______.", hint: "m _ _ _ y", a: "money" },
      { q: "Grammar: You cannot say 'a work', you must say 'a ______'.", hint: "j _ b", a: "job" },
      { q: "Grammar: You cannot say 'a travel', you must say 'a ______'.", hint: "j _ _ _ _ _ y", a: "journey" },
      { q: "Grammar: You cannot say 'a luggage', you must say 'a ______'.", hint: "s _ _ _ _ _ _ e", a: "suitcase" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "He can give you some useful information about Bangkok.", trans: "Anh ấy có thể cung cấp cho bạn một số thông tin hữu ích về Bangkok." },
      { text: "I'll give you some advice about your future.", trans: "Tôi sẽ cho bạn một vài lời khuyên về tương lai của bạn." },
      { text: "The news is not very good today.", trans: "Tin tức hôm nay không được tốt cho lắm." },
      { text: "Accommodation in the city centre is expensive.", trans: "Chỗ ở tại trung tâm thành phố rất đắt đỏ." },
      { text: "We should buy some new furniture.", trans: "Chúng ta nên mua một ít đồ nội thất mới." }
    ]
  },

  {
    id: 22,
    title: "Unit 22: Common adjectives: good and bad things",
    description: "Nâng cấp từ vựng của bạn từ 'good' và 'bad' lên những tính từ thể hiện cảm xúc mạnh mẽ hơn như wonderful, excellent, awful, hay terrible.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. (+) 'good' adjectives (Các tính từ mang nghĩa Tốt)",
        items: [
          { word: "good -> better -> the best", type: "So sánh", phonetic: "/ɡʊd/ /ˈbet̬.ɚ/ /best/", vi: "Tốt -> Tốt hơn -> Tốt nhất.", example: "A good restaurant. This one is better. The best in town." },
          { word: "nice (+)", type: "Tính từ", phonetic: "/naɪs/", vi: "Đẹp, dễ thương, dễ chịu.", example: "That's a nice jacket." },
          { word: "lovely (++)", type: "Tính từ", phonetic: "/ˈlʌv.li/", vi: "Rất đẹp, đáng yêu.", example: "It's a lovely day today!" },
          { word: "wonderful (+++)", type: "Tính từ", phonetic: "/ˈwʌn.dɚ.fəl/", vi: "Tuyệt vời, kỳ diệu.", example: "Mary's a wonderful person. Everybody loves her." },
          { word: "excellent (++++)", type: "Tính từ", phonetic: "/ˈek.səl.ənt/", vi: "Xuất sắc, cực kỳ tốt.", example: "That's an excellent idea!" }
        ]
      },
      {
        heading: "Responding with 'good' adjectives (Cách đáp lời khen ngợi)",
        items: [
          { word: "Excellent!", type: "Cảm thán", phonetic: "/ˈek.səl.ənt/", vi: "Tuyệt quá!", example: "A: Dinner is at seven. B: Excellent!" },
          { word: "Great!", type: "Cảm thán", phonetic: "/ɡreɪt/", vi: "Quá tuyệt!", example: "Great! See you then." },
          { word: "Perfect!", type: "Cảm thán", phonetic: "/ˈpɝː.fekt/", vi: "Hoàn hảo!", example: "A: I booked the tickets. B: Perfect!" }
        ]
      },
      {
        heading: "B. (-) 'bad' adjectives (Các tính từ mang nghĩa Xấu/Tệ)",
        items: [
          { word: "bad -> worse -> the worst", type: "So sánh", phonetic: "/bæd/ /wɝːs/ /wɝːst/", vi: "Tệ -> Tệ hơn -> Tệ nhất.", example: "The weather last year was worse than this year." },
          { word: "awful (--)", type: "Tính từ", phonetic: "/ˈɑː.fəl/", vi: "Tồi tệ, gớm ghiếc.", example: "My hair is awful! I must go to the hairdresser's." },
          { word: "terrible (---)", type: "Tính từ", phonetic: "/ˈter.ə.bəl/", vi: "Khủng khiếp (thường dùng cho tình huống/sự việc).", example: "I had a terrible day at work today." },
          { word: "horrible (---)", type: "Tính từ", phonetic: "/ˈhɔːr.ə.bəl/", vi: "Đáng ghét, kinh khủng (thường dùng cho người).", example: "Tim is a horrible person. Nobody likes him." }
        ]
      },
      {
        heading: "Other common expressions (Các cách diễn đạt phổ biến khác)",
        items: [
          { word: "not bad", type: "Cụm từ", phonetic: "/nɑːt bæd/", vi: "Không tệ (= khá tốt).", example: "A: I get $500 a week. B: That's not bad! (= good!)" },
          { word: "How awful!", type: "Cảm thán", phonetic: "/haʊ ˈɑː.fəl/", vi: "Thật tồi tệ làm sao! [KHÔNG DÙNG: How bad!]", example: "A: I have to get up at 5.30. B: Oh, how awful!" }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại cấp độ Tốt / Xấu)
    dragDrop: {
      buckets: ["Good (+)", "Very Good (++/+++)", "Excellent (++++)", "Bad (-)", "Very Bad (--/---)"],
      items: [
        { id: "i1", word: "good", target: "Good (+)", vi: "tốt" },
        { id: "i2", word: "nice", target: "Good (+)", vi: "đẹp / dễ thương" },
        { id: "i3", word: "fine", target: "Good (+)", vi: "ổn / tốt" },
        { id: "i4", word: "not bad", target: "Good (+)", vi: "không tệ (khá tốt)" },
        { id: "i5", word: "lovely", target: "Very Good (++/+++)", vi: "đáng yêu" },
        { id: "i6", word: "wonderful", target: "Very Good (++/+++)", vi: "tuyệt vời" },
        { id: "i7", word: "great", target: "Very Good (++/+++)", vi: "rất tuyệt" },
        { id: "i8", word: "marvellous", target: "Very Good (++/+++)", vi: "kỳ diệu" },
        { id: "i9", word: "gorgeous", target: "Very Good (++/+++)", vi: "tuyệt đẹp / lộng lẫy" },
        { id: "i10", word: "beautiful", target: "Very Good (++/+++)", vi: "xinh đẹp" },
        { id: "i11", word: "excellent", target: "Excellent (++++)", vi: "xuất sắc" },
        { id: "i12", word: "perfect", target: "Excellent (++++)", vi: "hoàn hảo" },
        { id: "i13", word: "brilliant", target: "Excellent (++++)", vi: "rất thông minh / lỗi lạc" },
        { id: "i14", word: "superb", target: "Excellent (++++)", vi: "tuyệt hảo" },
        { id: "i15", word: "the best", target: "Excellent (++++)", vi: "tốt nhất" },
        { id: "i16", word: "bad", target: "Bad (-)", vi: "tệ / xấu" },
        { id: "i17", word: "worse", target: "Bad (-)", vi: "tệ hơn" },
        { id: "i18", word: "wrong", target: "Bad (-)", vi: "sai lầm" },
        { id: "i19", word: "poor", target: "Bad (-)", vi: "kém / nghèo nàn" },
        { id: "i20", word: "awful", target: "Very Bad (--/---)", vi: "tồi tệ" },
        { id: "i21", word: "terrible", target: "Very Bad (--/---)", vi: "khủng khiếp" },
        { id: "i22", word: "horrible", target: "Very Bad (--/---)", vi: "đáng ghét / kinh khủng" },
        { id: "i23", word: "dreadful", target: "Very Bad (--/---)", vi: "dễ sợ / tồi tệ" },
        { id: "i24", word: "ghastly", target: "Very Bad (--/---)", vi: "rùng rợn / rất dở" },
        { id: "i25", word: "horrendous", target: "Very Bad (--/---)", vi: "kinh khủng khiếp" },
        { id: "i26", word: "the worst", target: "Very Bad (--/---)", vi: "tệ nhất" },
        { id: "i27", word: "How awful!", target: "Very Bad (--/---)", vi: "thật tồi tệ!" },
        { id: "i28", word: "How horrible!", target: "Very Bad (--/---)", vi: "thật kinh khủng!" },
        { id: "i29", word: "terrible traffic", target: "Very Bad (--/---)", vi: "kẹt xe kinh hoàng" },
        { id: "i30", word: "an awful day", target: "Very Bad (--/---)", vi: "một ngày tồi tệ" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Tình huống giao tiếp Ex 22.1 đến 22.5)
    quiz: [
      { q: "1. My hair is _____! I must go to the hairdresser's.", options: ["awful", "excellent", "lovely", "brilliant"], a: "awful" },
      { q: "2. The weather is _____! I don't want to go out.", options: ["wonderful", "terrible", "perfect", "nice"], a: "terrible" },
      { q: "3. The traffic is _____ in the city centre. Take the train.", options: ["lovely", "superb", "horrible", "fine"], a: "horrible" },
      { q: "4. That's an _____ idea! Let's do it!", options: ["awful", "horrible", "excellent", "dreadful"], a: "excellent" },
      { q: "5. _____ awful! Three exams on the same day!", options: ["How", "What", "Which", "Why"], a: "How" },
      { q: "6. _____ a lovely house! The sea is only 100 metres away!", options: ["How", "What", "Which", "Where"], a: "What" },
      { q: "7. My timetable's not _____. I'm free on Wednesdays and Fridays.", options: ["bad", "good", "perfect", "excellent"], a: "bad" },
      { q: "8. A: Do you like my new jacket? B: Yes, it's _____!", options: ["horrible", "awful", "lovely", "terrible"], a: "lovely" },
      { q: "9. A: I have to get up at 4.30 tomorrow morning. B: Oh, _____!", options: ["how awful", "how nice", "what excellent", "how bad"], a: "how awful" },
      { q: "10. A: Shall we go out for dinner tonight? B: Yes, that's a _____ idea!", options: ["dreadful", "ghastly", "great", "terrible"], a: "great" },
      { q: "11. Blue sky, sun, 25 degrees. This is _____ weather.", options: ["awful", "lovely", "dreadful", "ghastly"], a: "lovely" },
      { q: "12. 5 stars (*****), very famous. This is _____ hotel in town.", options: ["the worst", "a terrible", "the best", "a bad"], a: "the best" },
      { q: "13. Bad person. Nobody likes him. He is a _____ person.", options: ["horrible", "wonderful", "lovely", "brilliant"], a: "horrible" },
      { q: "14. 90 out of 100 in an exam. That's _____ news!", options: ["awful", "terrible", "wonderful", "dreadful"], a: "wonderful" },
      { q: "15. Grey sky, wind, rain, 11 degrees. This is _____ weather.", options: ["awful", "lovely", "gorgeous", "superb"], a: "awful" },
      { q: "16. Which of these is a POSITIVE (+) adjective?", options: ["dreadful", "ghastly", "gorgeous", "horrendous"], a: "gorgeous" },
      { q: "17. Which of these is a NEGATIVE (-) adjective?", options: ["marvellous", "superb", "brilliant", "dreadful"], a: "dreadful" },
      { q: "18. What is the comparative form of 'bad'?", options: ["badder", "worse", "the worst", "more bad"], a: "worse" },
      { q: "19. What is the superlative form of 'good'?", options: ["goodest", "better", "the best", "most good"], a: "the best" },
      { q: "20. A: I get $500 a week. B: That's _____! (= good)", options: ["not good", "not bad", "awful", "terrible"], a: "not bad" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn chính tả các tính từ dài)
    typingGame: [
      { q: "My hair's ______. (very bad) I must go to the hairdresser's.", hint: "a _ _ _ l", a: "awful" },
      { q: "The weather's ______. (very bad) I don't want to go out.", hint: "t _ _ _ _ _ _ e", a: "terrible" },
      { q: "The traffic is ______. (very bad) Take the train.", hint: "h _ _ _ _ _ _ e", a: "horrible" },
      { q: "That's an ______ idea! (very good) Let's do it!", hint: "e _ _ _ _ _ _ _ t", a: "excellent" },
      { q: "______ awful! Three exams on the same day!", hint: "H _ w", a: "How" },
      { q: "______ a lovely house! The sea is near.", hint: "W _ _ t", a: "What" },
      { q: "My timetable's not ______. (= it is quite good)", hint: "b _ d", a: "bad" },
      { q: "It's a ______ day today! (very nice)", hint: "l _ _ _ _ y", a: "lovely" },
      { q: "Mary's a ______ person. Everybody loves her.", hint: "w _ _ _ _ _ _ _ l", a: "wonderful" },
      { q: "The train arrives at 6. - ______! (Great/Perfect)", hint: "P _ _ _ _ _ t", a: "Perfect" },
      { q: "The weather last year was ______ than this year. (more bad)", hint: "w _ _ _ e", a: "worse" },
      { q: "This restaurant is ______ than that one. (more good)", hint: "b _ _ _ _ r", a: "better" },
      { q: "This is the ______ restaurant in town. (number 1 good)", hint: "b _ _ t", a: "best" },
      { q: "This is the ______ day of my life! (number 1 bad)", hint: "w _ _ _ t", a: "worst" },
      { q: "Synonym for very bad/awful starting with D: ______", hint: "d _ _ _ _ _ _ l", a: "dreadful" },
      { q: "Synonym for very bad/horrible starting with G: ______", hint: "g _ _ _ _ _ y", a: "ghastly" },
      { q: "Synonym for very beautiful/lovely starting with G: ______", hint: "g _ _ _ _ _ _ s", a: "gorgeous" },
      { q: "Synonym for very good/wonderful starting with M: ______", hint: "m _ _ _ _ _ _ _ _ s", a: "marvellous" },
      { q: "Synonym for very good/excellent starting with S: ______", hint: "s _ _ _ _ b", a: "superb" },
      { q: "Synonym for very clever/excellent starting with B: ______", hint: "b _ _ _ _ _ _ _ t", a: "brilliant" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "That's an excellent idea! Let's do it!", trans: "Đó là một ý tưởng xuất sắc! Hãy làm đi!" },
      { text: "My hair is awful! I must go to the hairdresser's.", trans: "Tóc của tôi trông thật tệ! Tôi phải đến tiệm làm tóc thôi." },
      { text: "I had a terrible day at work today.", trans: "Hôm nay tôi đã có một ngày làm việc tồi tệ." },
      { text: "The weather last year was worse than this year.", trans: "Thời tiết năm ngoái tệ hơn năm nay." },
      { text: "I have to get up at half past five tomorrow morning. - Oh, how awful!", trans: "Sáng mai tôi phải dậy lúc 5 rưỡi. - Ồ, thật tồi tệ làm sao!" }
    ]
  },
  {
    id: 23,
    title: "Unit 23: Common adjectives: people",
    description: "Học các tính từ thông dụng để miêu tả tính cách con người (tốt, xấu, tính cách trẻ em) và các giới từ đi kèm với những tính từ này.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Saying positive (+)/good things about people (Nói điều tốt)",
        items: [
          { word: "nice (**)", type: "Tính từ", phonetic: "/naɪs/", vi: "Tốt, tử tế (Từ phổ biến nhất để chỉ người ta thích).", example: "Mary's very nice. Richard's a nice man." },
          { word: "wonderful (****)", type: "Tính từ", phonetic: "/ˈwʌn.dɚ.fəl/", vi: "Tuyệt vời (Mức độ mạnh hơn 'nice'). KHÔNG DÙNG 'very wonderful'.", example: "Ron is a wonderful teacher." },
          { word: "kind", type: "Tính từ", phonetic: "/kaɪnd/", vi: "Tốt bụng, hay giúp đỡ người khác.", example: "She's very kind; she helps me with the children." },
          { word: "lovely", type: "Tính từ", phonetic: "/ˈlʌv.li/", vi: "Dễ thương, đáng yêu (= very kind / I like him very much).", example: "My teacher is a lovely man." },
          { word: "easy-going", type: "Tính từ", phonetic: "/ˌiː.ziˈɡoʊ.ɪŋ/", vi: "Thoải mái, dễ tính (= relaxed, easy to be with).", example: "My friend Neil is very easy-going." },
          { word: "happy", type: "Tính từ", phonetic: "/ˈhæp.i/", vi: "Vui vẻ (Ngược với unhappy).", example: "Maureen's a happy person." },
          { word: "intelligent", type: "Tính từ", phonetic: "/ɪnˈtel.ə.dʒənt/", vi: "Thông minh (= clever).", example: "All my friends are more intelligent than me." }
        ]
      },
      {
        heading: "B. Saying negative (-)/bad things about people (Nói điều xấu)",
        items: [
          { word: "not very nice (**)", type: "Cụm từ", phonetic: "", vi: "Không tốt lắm.", example: "Marcia is not very nice." },
          { word: "horrible (****)", type: "Tính từ", phonetic: "/ˈhɔːr.ə.bəl/", vi: "Đáng ghét, kinh khủng.", example: "Margaret is a horrible woman; nobody likes her." },
          { word: "difficult", type: "Tính từ", phonetic: "/ˈdɪf.ə.kəlt/", vi: "Khó tính, khó chịu.", example: "My uncle is a difficult person. He is never happy." },
          { word: "stupid (****)", type: "Tính từ", phonetic: "/ˈstuː.pɪd/", vi: "Ngốc nghếch (Từ rất nặng, cần cẩn thận khi dùng).", example: "That waiter is stupid." },
          { word: "selfish", type: "Tính từ", phonetic: "/ˈsel.fɪʃ/", vi: "Ích kỷ (Chỉ nghĩ cho bản thân).", example: "I don't like selfish people." }
        ]
      },
      {
        heading: "C. Little children (Trẻ nhỏ)",
        items: [
          { word: "good", type: "Tính từ", phonetic: "/ɡʊd/", vi: "Ngoan ngoãn.", example: "Tim is very good." },
          { word: "well-behaved", type: "Tính từ", phonetic: "/ˌwel bɪˈheɪvd/", vi: "Cư xử đúng mực, ngoan.", example: "He is a well-behaved boy." },
          { word: "naughty", type: "Tính từ", phonetic: "/ˈnɑː.t̬i/", vi: "Hư, nghịch ngợm.", example: "His little sister is very naughty." }
        ]
      },
      {
        heading: "D. Prepositions (Giới từ đi với tính từ)",
        items: [
          { word: "to me", type: "Giới từ", phonetic: "", vi: "Tốt/Xấu VỚI TÔI.", example: "Jean was nice / kind / wonderful / horrible to me." },
          { word: "of you", type: "Giới từ", phonetic: "", vi: "Bạn thật tốt (khi làm gì đó).", example: "It was nice / kind of you to remember my birthday." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại Tính cách và Giới từ đi kèm)
    dragDrop: {
      buckets: ["Positive (+)", "Negative (-)", "Little Children", "Prepositions (to / of)"],
      items: [
        { id: "i1", word: "nice", target: "Positive (+)", vi: "tốt, tử tế" },
        { id: "i2", word: "wonderful", target: "Positive (+)", vi: "tuyệt vời" },
        { id: "i3", word: "kind", target: "Positive (+)", vi: "tốt bụng" },
        { id: "i4", word: "lovely", target: "Positive (+)", vi: "đáng yêu" },
        { id: "i5", word: "easy-going", target: "Positive (+)", vi: "dễ tính" },
        { id: "i6", word: "happy", target: "Positive (+)", vi: "vui vẻ" },
        { id: "i7", word: "intelligent", target: "Positive (+)", vi: "thông minh" },
        { id: "i8", word: "clever", target: "Positive (+)", vi: "lém lỉnh, thông minh" },
        { id: "i9", word: "relaxed", target: "Positive (+)", vi: "thư thái" },
        { id: "i10", word: "not very nice", target: "Negative (-)", vi: "không tốt lắm" },
        { id: "i11", word: "horrible", target: "Negative (-)", vi: "kinh khủng" },
        { id: "i12", word: "difficult", target: "Negative (-)", vi: "khó tính" },
        { id: "i13", word: "stupid", target: "Negative (-)", vi: "ngốc nghếch" },
        { id: "i14", word: "selfish", target: "Negative (-)", vi: "ích kỷ" },
        { id: "i15", word: "unhappy", target: "Negative (-)", vi: "không vui" },
        { id: "i16", word: "never happy", target: "Negative (-)", vi: "không bao giờ vui" },
        { id: "i17", word: "well-behaved", target: "Little Children", vi: "cư xử ngoan" },
        { id: "i18", word: "naughty", target: "Little Children", vi: "nghịch ngợm, hư" },
        { id: "i19", word: "good boy", target: "Little Children", vi: "cậu bé ngoan" },
        { id: "i20", word: "naughty girl", target: "Little Children", vi: "cô bé nghịch" },
        { id: "i21", word: "nice to me", target: "Prepositions (to / of)", vi: "tốt với tôi" },
        { id: "i22", word: "kind to me", target: "Prepositions (to / of)", vi: "tốt bụng với tôi" },
        { id: "i23", word: "horrible to me", target: "Prepositions (to / of)", vi: "tệ bạc với tôi" },
        { id: "i24", word: "wonderful to me", target: "Prepositions (to / of)", vi: "tuyệt vời với tôi" },
        { id: "i25", word: "nice of you", target: "Prepositions (to / of)", vi: "bạn thật tốt (khi làm gì)" },
        { id: "i26", word: "kind of you", target: "Prepositions (to / of)", vi: "bạn thật tốt bụng (khi làm gì)" },
        { id: "i27", word: "kind to animals", target: "Prepositions (to / of)", vi: "tốt với động vật" },
        { id: "i28", word: "horrible to people", target: "Prepositions (to / of)", vi: "tệ bạc với mọi người" },
        { id: "i29", word: "nice of her", target: "Prepositions (to / of)", vi: "cô ấy thật tốt" },
        { id: "i30", word: "kind to us", target: "Prepositions (to / of)", vi: "tốt với chúng tôi" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Dựa trên Ex 23.1 đến 23.4)
    quiz: [
      { q: "1. A: Mary's very nice. B: She's more than nice, she's _____!", options: ["stupid", "wonderful", "easy-going", "horrible"], a: "wonderful" },
      { q: "2. A: Was George not very nice to you? B: He was really _____!", options: ["lovely", "easy-going", "intelligent", "horrible"], a: "horrible" },
      { q: "3. A: Let me carry your bag. B: Thanks, that's _____ of you.", options: ["kind", "naughty", "difficult", "intelligent"], a: "kind" },
      { q: "4. A: Is your little brother well-behaved? B: No, he's _____!", options: ["good", "naughty", "easy-going", "kind"], a: "naughty" },
      { q: "5. The teacher is never horrible _____ the students.", options: ["for", "of", "to", "with"], a: "to" },
      { q: "6. It is kind _____ you to help me.", options: ["for", "of", "to", "with"], a: "of" },
      { q: "7. Barbara was wonderful _____ me when I needed a friend.", options: ["to", "of", "for", "with"], a: "to" },
      { q: "8. It was nice _____ her to ring me.", options: ["to", "of", "for", "with"], a: "of" },
      { q: "9. People who think only of themselves are _____.", options: ["selfish", "easy-going", "kind", "intelligent"], a: "selfish" },
      { q: "10. Someone who is relaxed and easy to be with is _____.", options: ["difficult", "selfish", "easy-going", "stupid"], a: "easy-going" },
      { q: "11. 'Clever' is a synonym (từ đồng nghĩa) for _____.", options: ["stupid", "intelligent", "naughty", "selfish"], a: "intelligent" },
      { q: "12. 'Naughty' is used to describe _____.", options: ["old people", "teachers", "little children", "animals"], a: "little children" },
      { q: "13. If someone is good to other people, they are _____.", options: ["kind", "horrible", "difficult", "selfish"], a: "kind" },
      { q: "14. Which adjective is NOT used to describe a good person?", options: ["lovely", "horrible", "nice", "kind"], a: "horrible" },
      { q: "15. Which is the correct sentence?", options: ["Mary is very wonderful.", "Mary is wonderful.", "Mary is wonderful very.", "Mary wonderful is."], a: "Mary is wonderful." },
      { q: "16. My uncle is a _____ person. He is never happy.", options: ["easy-going", "difficult", "lovely", "well-behaved"], a: "difficult" },
      { q: "17. That waiter is _____. I asked for coffee and he gave me tea!", options: ["intelligent", "stupid", "kind", "well-behaved"], a: "stupid" },
      { q: "18. 'Well-behaved' is the opposite (trái nghĩa) of _____.", options: ["good", "nice", "naughty", "happy"], a: "naughty" },
      { q: "19. Which sentence is correct?", options: ["It was nice to you to come.", "It was nice of you to come.", "It was nice for you to come.", "It was nice with you to come."], a: "It was nice of you to come." },
      { q: "20. She's very _____; she always helps me with the children.", options: ["selfish", "horrible", "kind", "difficult"], a: "kind" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn chính tả)
    typingGame: [
      { q: "Ron is a w______ teacher. All students love him.", hint: "w _ _ _ _ _ _ _ l", a: "wonderful" },
      { q: "My teacher is a l______ man. (= I like him very much)", hint: "l _ _ _ _ y", a: "lovely" },
      { q: "Neil is very e______-g______. (= relaxed)", hint: "e _ _ y - g _ _ _ g", a: "easy-going" },
      { q: "All my friends are more i______ than me. (= clever)", hint: "i _ _ _ _ _ _ _ _ _ t", a: "intelligent" },
      { q: "Margaret is a h______ woman; nobody likes her.", hint: "h _ _ _ _ _ _ e", a: "horrible" },
      { q: "My uncle is a d______ person. He is never happy.", hint: "d _ _ _ _ _ _ _ t", a: "difficult" },
      { q: "That waiter is s______. He gave me the wrong drink.", hint: "s _ _ _ _ d", a: "stupid" },
      { q: "I don't like s______ people. (think only of themselves)", hint: "s _ _ _ _ _ h", a: "selfish" },
      { q: "Tim is a very w______-b______ boy. (= good)", hint: "w _ _ l - b _ _ _ _ _ d", a: "well-behaved" },
      { q: "His little sister is very n______. (= bad behaviour)", hint: "n _ _ _ _ _ y", a: "naughty" },
      { q: "She is very k______. She helps everyone.", hint: "k _ _ d", a: "kind" },
      { q: "Jean was nice ______ me when I was in hospital. (preposition)", hint: "t _", a: "to" },
      { q: "It was kind ______ you to remember my birthday. (preposition)", hint: "o f", a: "of" },
      { q: "Maureen is a h______ person. (opposite of sad)", hint: "h _ _ _ y", a: "happy" },
      { q: "You were horrible ______ me yesterday! (preposition)", hint: "t _", a: "to" },
      { q: "Marcia is not very n______. (**)", hint: "n _ _ e", a: "nice" },
      { q: "She helps me ______ the children.", hint: "w _ _ h", a: "with" },
      { q: "I asked ______ coffee and he gave me tea.", hint: "f _ r", a: "for" },
      { q: "Nobody ______ her. (opposite of hates)", hint: "l _ _ _ s", a: "likes" },
      { q: "He is never ______. (always sad/angry)", hint: "h _ _ _ y", a: "happy" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "My friend Neil is very easy-going.", trans: "Bạn tôi, Neil, là một người rất dễ tính." },
      { text: "I don't like selfish people.", trans: "Tôi không thích những người ích kỷ." },
      { text: "Jean was wonderful to me when I was in hospital.", trans: "Jean đã đối xử tuyệt vời với tôi khi tôi nằm viện." },
      { text: "It was nice of you to remember my birthday.", trans: "Bạn thật tốt khi đã nhớ sinh nhật của tôi." },
      { text: "Tim is very well-behaved, but his little sister is naughty.", trans: "Tim rất ngoan ngoãn, nhưng em gái nhỏ của cậu ấy lại rất nghịch ngợm." }
    ]
  },

  {
    id: 24,
    title: "Unit 24: Words and prepositions",
    description: "Một trong những bài học quan trọng nhất! Khám phá các động từ và tính từ luôn đi kèm với một giới từ cố định (ví dụ: listen TO, good AT) và các động từ thay đổi nghĩa khi đổi giới từ (look AT, look FOR, look AFTER).",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Verbs and prepositions (Động từ đi kèm giới từ)",
        items: [
          { word: "listen to", type: "Động từ", phonetic: "/ˈlɪs.ən tuː/", vi: "Lắng nghe (ai/cái gì).", example: "I listen to the radio in bed." },
          { word: "wait for", type: "Động từ", phonetic: "/weɪt fɔːr/", vi: "Chờ đợi (ai/cái gì).", example: "I waited for the bus for half an hour." },
          { word: "ask for", type: "Động từ", phonetic: "/æsk fɔːr/", vi: "Yêu cầu, xin (cái gì).", example: "I asked for a black coffee." },
          { word: "pay for", type: "Động từ", phonetic: "/peɪ fɔːr/", vi: "Trả tiền cho (cái gì).", example: "Where do I pay for our meal?" },
          { word: "belong to", type: "Động từ", phonetic: "/bɪˈlɑːŋ tuː/", vi: "Thuộc về (ai).", example: "This book belongs to Sarah." },
          { word: "think about", type: "Động từ", phonetic: "/θɪŋk əˈbaʊt/", vi: "Suy nghĩ về (ai/cái gì).", example: "What are you thinking about?" },
          { word: "thank (someone) for", type: "Động từ", phonetic: "/θæŋk fɔːr/", vi: "Cảm ơn (ai) vì (cái gì).", example: "Helena thanked her mother for the present." },
          { word: "apologise for", type: "Động từ", phonetic: "/əˈpɑː.lə.dʒaɪz fɔːr/", vi: "Xin lỗi vì (điều gì).", example: "Jamie apologised for being late." }
        ]
      },
      {
        heading: "B. Same verb, different preposition (Cùng động từ, khác giới từ)",
        items: [
          { word: "look at", type: "Cụm động từ", phonetic: "/lʊk æt/", vi: "Nhìn vào.", example: "I love looking at old photographs." },
          { word: "look for", type: "Cụm động từ", phonetic: "/lʊk fɔːr/", vi: "Tìm kiếm (= try to find).", example: "I am looking for my key." },
          { word: "look after", type: "Cụm động từ", phonetic: "/lʊk ˈæf.tɚ/", vi: "Chăm sóc (= take care of).", example: "Parents look after their children." },
          { word: "look forward to", type: "Cụm động từ", phonetic: "/lʊk ˈfɔːr.wɚd tuː/", vi: "Mong chờ, háo hức (điều tốt đẹp sắp tới).", example: "I look forward to the holiday." }
        ]
      },
      {
        heading: "C. Adjectives and prepositions (Tính từ đi kèm giới từ)",
        items: [
          { word: "good at / bad at", type: "Tính từ", phonetic: "/ɡʊd æt/ /bæd æt/", vi: "Giỏi về / Tệ về (môn học, kỹ năng). [KHÔNG DÙNG: good in].", example: "I'm good at geography but bad at maths." },
          { word: "interested in", type: "Tính từ", phonetic: "/ˈɪn.trɪ.stɪd ɪn/", vi: "Quan tâm, thích thú với.", example: "I'm interested in hearing all your news." },
          { word: "afraid of", type: "Tính từ", phonetic: "/əˈfreɪd əv/", vi: "Sợ hãi.", example: "He is afraid of mice." },
          { word: "proud of", type: "Tính từ", phonetic: "/praʊd əv/", vi: "Tự hào về.", example: "John is proud of winning a medal." },
          { word: "used to", type: "Tính từ", phonetic: "/juːst tuː/", vi: "Quen với (việc gì đó). Đồng nghĩa: accustomed to.", example: "I'm used to getting up early." }
        ]
      },
      {
        heading: "D. Grammar rule (Quy tắc ngữ pháp quan trọng)",
        items: [
          { word: "Preposition + Noun / V-ing", type: "Ngữ pháp", phonetic: "", vi: "Sau giới từ LUÔN LÀ Danh từ HOẶC Động từ thêm -ing. [KHÔNG BAO GIỜ dùng động từ nguyên mẫu].", example: "Joe is good at tennis (Noun). Joe is good at playing the piano (V-ing)." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo Giới từ đi kèm)
    dragDrop: {
      buckets: ["to", "for", "at", "about / of / in", "Look + preposition"],
      items: [
        { id: "i1", word: "listen...", target: "to", vi: "lắng nghe" },
        { id: "i2", word: "belong...", target: "to", vi: "thuộc về" },
        { id: "i3", word: "used...", target: "to", vi: "quen với" },
        { id: "i4", word: "accustomed...", target: "to", vi: "quen với" },
        { id: "i5", word: "wait...", target: "for", vi: "chờ đợi" },
        { id: "i6", word: "ask...", target: "for", vi: "yêu cầu, xin" },
        { id: "i7", word: "pay...", target: "for", vi: "trả tiền cho" },
        { id: "i8", word: "thank...", target: "for", vi: "cảm ơn vì" },
        { id: "i9", word: "apologise...", target: "for", vi: "xin lỗi vì" },
        { id: "i10", word: "good...", target: "at", vi: "giỏi về" },
        { id: "i11", word: "bad...", target: "at", vi: "tệ về" },
        { id: "i12", word: "think...", target: "about / of / in", vi: "suy nghĩ về (about)" },
        { id: "i13", word: "interested...", target: "about / of / in", vi: "quan tâm đến (in)" },
        { id: "i14", word: "afraid...", target: "about / of / in", vi: "sợ hãi (of)" },
        { id: "i15", word: "proud...", target: "about / of / in", vi: "tự hào về (of)" },
        { id: "i16", word: "... at (nhìn vào)", target: "Look + preposition", vi: "look at" },
        { id: "i17", word: "... for (tìm kiếm)", target: "Look + preposition", vi: "look for" },
        { id: "i18", word: "... after (chăm sóc)", target: "Look + preposition", vi: "look after" },
        { id: "i19", word: "... forward to (mong chờ)", target: "Look + preposition", vi: "look forward to" },
        { id: "i20", word: "take care of = look...", target: "Look + preposition", vi: "look after" },
        { id: "i21", word: "try to find = look...", target: "Look + preposition", vi: "look for" },
        { id: "i22", word: "... a meal (pay)", target: "for", vi: "trả tiền cho bữa ăn" },
        { id: "i23", word: "... a mistake (apologise)", target: "for", vi: "xin lỗi vì lỗi lầm" },
        { id: "i24", word: "... music (listen)", target: "to", vi: "nghe nhạc" },
        { id: "i25", word: "... Sarah (belong)", target: "to", vi: "thuộc về Sarah" },
        { id: "i26", word: "... sports (good)", target: "at", vi: "giỏi thể thao" },
        { id: "i27", word: "... mice (afraid)", target: "about / of / in", vi: "sợ chuột" },
        { id: "i28", word: "... history (interested)", target: "about / of / in", vi: "thích lịch sử" },
        { id: "i29", word: "... my son (proud)", target: "about / of / in", vi: "tự hào về con trai" },
        { id: "i30", word: "... the bus (wait)", target: "for", vi: "chờ xe buýt" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 24.1 đến 24.4)
    quiz: [
      { q: "1. John is waiting _____ a train to London.", options: ["to", "for", "at", "on"], a: "for" },
      { q: "2. This bicycle belongs _____ my brother.", options: ["to", "for", "with", "at"], a: "to" },
      { q: "3. The children thanked their grandmother _____ the money.", options: ["to", "of", "for", "with"], a: "for" },
      { q: "4. Sally is listening _____ her walkman.", options: ["at", "to", "with", "for"], a: "to" },
      { q: "5. He apologised _____ his mistake.", options: ["for", "about", "to", "of"], a: "for" },
      { q: "6. Let me pay _____ our tickets.", options: ["to", "for", "at", "with"], a: "for" },
      { q: "7. Billy is thinking _____ the holidays.", options: ["to", "for", "about", "with"], a: "about" },
      { q: "8. Joanna can't read yet but she likes looking _____ books.", options: ["for", "at", "after", "to"], a: "at" },
      { q: "9. A nurse looks _____ people in hospital.", options: ["for", "at", "after", "forward to"], a: "after" },
      { q: "10. I can't find my glasses. Could you help me look _____ them?", options: ["for", "at", "after", "to"], a: "for" },
      { q: "11. It's my birthday soon. I'm really looking _____ it.", options: ["for", "at", "after", "forward to"], a: "forward to" },
      { q: "12. Why are you looking _____ me in that way? Is my face dirty?", options: ["for", "at", "after", "to"], a: "at" },
      { q: "13. I don't like my job very much. I'm looking _____ a new one.", options: ["for", "at", "after", "to"], a: "for" },
      { q: "14. Alex is going to France in July. He is looking _____ it.", options: ["for", "at", "after", "forward to"], a: "forward to" },
      { q: "15. Anne has got used _____ her new job.", options: ["for", "at", "to", "in"], a: "to" },
      { q: "16. She is very good _____ talking to customers.", options: ["in", "at", "for", "with"], a: "at" },
      { q: "17. She is very interested _____ sport.", options: ["in", "at", "for", "about"], a: "in" },
      { q: "18. She belongs _____ a tennis club.", options: ["in", "at", "to", "for"], a: "to" },
      { q: "19. Her parents were very proud _____ her when she won a medal.", options: ["about", "for", "of", "to"], a: "of" },
      { q: "20. Which sentence is grammatically correct?", options: ["Joe is good at play tennis.", "Joe is good at playing tennis.", "Joe is good in playing tennis.", "Joe is good to play tennis."], a: "Joe is good at playing tennis." }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn phản xạ giới từ)
    typingGame: [
      { q: "I listen ______ the radio in bed.", hint: "t _", a: "to" },
      { q: "I waited ______ the bus for half an hour.", hint: "f _ r", a: "for" },
      { q: "I asked ______ a black coffee.", hint: "f _ r", a: "for" },
      { q: "Where do I pay ______ our meal?", hint: "f _ r", a: "for" },
      { q: "This book belongs ______ Sarah.", hint: "t _", a: "to" },
      { q: "What are you thinking ______?", hint: "a _ _ _ t", a: "about" },
      { q: "Helena thanked her mother ______ the present.", hint: "f _ r", a: "for" },
      { q: "Jamie apologised ______ being late.", hint: "f _ r", a: "for" },
      { q: "I love looking ______ old photographs.", hint: "a t", a: "at" },
      { q: "I lost my key. I am looking ______ it.", hint: "f _ r", a: "for" },
      { q: "Parents look ______ their children. (take care of)", hint: "a _ _ _ r", a: "after" },
      { q: "I look ______ to the holiday. (excited about)", hint: "f _ _ _ _ _ d", a: "forward" },
      { q: "I'm good ______ geography.", hint: "a t", a: "at" },
      { q: "I'm bad ______ maths.", hint: "a t", a: "at" },
      { q: "I'm interested ______ hearing all your news.", hint: "i n", a: "in" },
      { q: "He is afraid ______ mice.", hint: "o f", a: "of" },
      { q: "John is proud ______ winning a medal.", hint: "o f", a: "of" },
      { q: "I'm used ______ getting up early.", hint: "t _", a: "to" },
      { q: "Preposition rule: Joe is good at ______ (play) the piano.", hint: "p _ _ _ _ _ g", a: "playing" },
      { q: "I look forward to ______ (see) you again.", hint: "s _ _ _ _ g", a: "seeing" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "I waited for the bus for half an hour yesterday.", trans: "Tôi đã đợi xe buýt nửa tiếng đồng hồ vào ngày hôm qua." },
      { text: "I'm good at geography but bad at maths.", trans: "Tôi giỏi môn địa lý nhưng lại kém môn toán." },
      { text: "Parents look after their children.", trans: "Cha mẹ chăm sóc con cái của họ." },
      { text: "I'm looking forward to the holiday.", trans: "Tôi đang rất mong chờ kỳ nghỉ." },
      { text: "Joe is good at playing the piano.", trans: "Joe rất giỏi chơi đàn piano." }
    ]
  },
  {
    id: 25,
    title: "Unit 25: Prefixes",
    description: "Tiền tố (Prefixes) là những âm tiết đứng ở đầu từ giúp thay đổi nghĩa của từ gốc. Nắm vững tiền tố giúp bạn tự suy luận ra nghĩa của hàng trăm từ mới.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. ex- / half- / pre-",
        items: [
          { word: "ex- (+ noun)", type: "Tiền tố", phonetic: "/eks/", vi: "Đã từng là (was but not now).", example: "ex-wife (vợ cũ), ex-president (cựu tổng thống)." },
          { word: "half-", type: "Tiền tố", phonetic: "/hæf/", vi: "Một nửa (50% of something).", example: "half-price (nửa giá), half-hour (nửa giờ)." },
          { word: "pre-", type: "Tiền tố", phonetic: "/priː/", vi: "Trước, tiền (before).", example: "pre-school (trường mầm non - trước khi đi học)." }
        ]
      },
      {
        heading: "B. in- / im- / non- / un- (Mang nghĩa Phủ định = NOT)",
        items: [
          { word: "in-", type: "Tiền tố", phonetic: "/ɪn/", vi: "Không (not). Thường đi với tính từ.", example: "informal (không trang trọng), incorrect (không chính xác)." },
          { word: "im-", type: "Tiền tố", phonetic: "/ɪm/", vi: "Không (not). Thường đứng trước từ bắt đầu bằng m, p, b.", example: "impossible (không thể nào), impolite (bất lịch sự)." },
          { word: "non-", type: "Tiền tố", phonetic: "/nɑːn/", vi: "Không (not). Thường có dấu gạch nối.", example: "non-smoking (không hút thuốc), non-alcoholic (không có cồn)." },
          { word: "un-", type: "Tiền tố", phonetic: "/ʌn/", vi: "Không (not).", example: "unhappy (không vui), unsafe (không an toàn), unread (chưa đọc)." }
        ]
      },
      {
        heading: "C. re- (Làm lại điều gì đó)",
        items: [
          { word: "re- (+ verb)", type: "Tiền tố", phonetic: "/riː/", vi: "Lại, một lần nữa (again).", example: "redo (làm lại), rewrite (viết lại), reread (đọc lại)." }
        ]
      },
      {
        heading: "D. Grammar Note (Lưu ý về dấu gạch nối)",
        items: [
          { word: "Hyphens (-)", type: "Ngữ pháp", phonetic: "", vi: "Đôi khi tiền tố đi kèm dấu gạch nối (half-hour), đôi khi thì không (impossible). Bạn nên dùng từ điển khi không chắc chắn.", example: "ex-boss (có gạch) / uncomfortable (không gạch)." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo Tiền tố)
    dragDrop: {
      buckets: ["ex- (Cũ / Đã từng)", "re- (Làm lại)", "half- / pre- (Nửa/Trước)", "un- (Không)", "in- / im- / non- (Không)"],
      items: [
        { id: "i1", word: "wife (vợ cũ)", target: "ex- (Cũ / Đã từng)", vi: "ex-wife" },
        { id: "i2", word: "president (cựu TT)", target: "ex- (Cũ / Đã từng)", vi: "ex-president" },
        { id: "i3", word: "husband (chồng cũ)", target: "ex- (Cũ / Đã từng)", vi: "ex-husband" },
        { id: "i4", word: "boss (sếp cũ)", target: "ex- (Cũ / Đã từng)", vi: "ex-boss" },
        { id: "i5", word: "do (làm lại)", target: "re- (Làm lại)", vi: "redo" },
        { id: "i6", word: "write (viết lại)", target: "re- (Làm lại)", vi: "rewrite" },
        { id: "i7", word: "tell (kể lại)", target: "re- (Làm lại)", vi: "retell" },
        { id: "i8", word: "read (đọc lại)", target: "re- (Làm lại)", vi: "reread" },
        { id: "i9", word: "address (đổi địa chỉ)", target: "re- (Làm lại)", vi: "readdress" },
        { id: "i10", word: "play (phát lại)", target: "re- (Làm lại)", vi: "replay" },
        { id: "i11", word: "price (nửa giá)", target: "half- / pre- (Nửa/Trước)", vi: "half-price" },
        { id: "i12", word: "hour (nửa giờ)", target: "half- / pre- (Nửa/Trước)", vi: "half-hour" },
        { id: "i13", word: "brother (anh/em cùng cha khác mẹ)", target: "half- / pre- (Nửa/Trước)", vi: "half-brother" },
        { id: "i14", word: "school (trường mầm non)", target: "half- / pre- (Nửa/Trước)", vi: "pre-school" },
        { id: "i15", word: "exam (trước kỳ thi)", target: "half- / pre- (Nửa/Trước)", vi: "pre-exam" },
        { id: "i16", word: "happy (không vui)", target: "un- (Không)", vi: "unhappy" },
        { id: "i17", word: "safe (không an toàn)", target: "un- (Không)", vi: "unsafe" },
        { id: "i18", word: "read (chưa đọc)", target: "un- (Không)", vi: "unread" },
        { id: "i19", word: "finished (chưa hoàn thành)", target: "un- (Không)", vi: "unfinished" },
        { id: "i20", word: "comfortable (không thoải mái)", target: "un- (Không)", vi: "uncomfortable" },
        { id: "i21", word: "tidy (bừa bộn)", target: "un- (Không)", vi: "untidy" },
        { id: "i22", word: "formal (không trang trọng)", target: "in- / im- / non- (Không)", vi: "informal" },
        { id: "i23", word: "possible (không thể)", target: "in- / im- / non- (Không)", vi: "impossible" },
        { id: "i24", word: "correct (không đúng)", target: "in- / im- / non- (Không)", vi: "incorrect" },
        { id: "i25", word: "polite (bất lịch sự)", target: "in- / im- / non- (Không)", vi: "impolite" },
        { id: "i26", word: "smoking (không hút thuốc)", target: "in- / im- / non- (Không)", vi: "non-smoking" },
        { id: "i27", word: "alcoholic (không cồn)", target: "in- / im- / non- (Không)", vi: "non-alcoholic" },
        { id: "i28", word: "pack (mở hành lý)", target: "un- (Không)", vi: "unpack" },
        { id: "i29", word: "pack (đóng gói lại)", target: "re- (Làm lại)", vi: "repack" },
        { id: "i30", word: "pay (trả trước)", target: "half- / pre- (Nửa/Trước)", vi: "pre-pay" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 25.1 đến 25.6)
    quiz: [
      { q: "1. What is an 'ex-wife'?", options: ["a wife who is now divorced", "a new wife", "a future wife", "a half-wife"], a: "a wife who is now divorced" },
      { q: "2. If a journey is 30 minutes, it is a _____ journey.", options: ["pre-hour", "ex-hour", "half-hour", "re-hour"], a: "half-hour" },
      { q: "3. If something cost £10 yesterday and £5 today, it is _____.", options: ["half-price", "non-price", "unprice", "ex-price"], a: "half-price" },
      { q: "4. Clothes like jeans and trainers are _____.", options: ["unformal", "informal", "nonformal", "imformal"], a: "informal" },
      { q: "5. What is the opposite of 'possible'?", options: ["inpossible", "unpossible", "impossible", "nonpossible"], a: "impossible" },
      { q: "6. A room where people may not smoke is _____.", options: ["unsmoking", "insmoking", "non-smoking", "resmoking"], a: "non-smoking" },
      { q: "7. Children who are too young to go to school are _____ children.", options: ["un-school", "ex-school", "pre-school", "re-school"], a: "pre-school" },
      { q: "8. To do something a second time is to _____ it.", options: ["undo", "redo", "predo", "exdo"], a: "redo" },
      { q: "9. To write something a second time is to _____ it.", options: ["unwrite", "rewrite", "inwrite", "nonwrite"], a: "rewrite" },
      { q: "10. What is the opposite of 'happy'?", options: ["inhappy", "imhappy", "unhappy", "nonhappy"], a: "unhappy" },
      { q: "11. What is the opposite of 'safe'?", options: ["insafe", "imsafe", "unsafe", "nonsafe"], a: "unsafe" },
      { q: "12. What does 'pre-exam nerves' mean?", options: ["feeling nervous before an exam", "feeling nervous after an exam", "failing an exam", "passing an exam"], a: "feeling nervous before an exam" },
      { q: "13. What is an 'incorrect answer'?", options: ["a wrong answer", "a right answer", "a short answer", "a good answer"], a: "a wrong answer" },
      { q: "14. What is a 'non-alcoholic drink'?", options: ["a drink with a lot of alcohol", "a drink with no alcohol", "a hot drink", "a cold drink"], a: "a drink with no alcohol" },
      { q: "15. I liked school but my sister was very _____ there.", options: ["unhappy", "imhappy", "inhappy", "nonhappy"], a: "unhappy" },
      { q: "16. I can't read this. Please _____ your homework.", options: ["rewrite", "unwrite", "inwrite", "prewrite"], a: "rewrite" },
      { q: "17. What is the negative form of 'polite'?", options: ["unpolite", "impolite", "inpolite", "nonpolite"], a: "impolite" },
      { q: "18. What is the negative form of 'comfortable'?", options: ["uncomfortable", "incomfortable", "imcomfortable", "noncomfortable"], a: "uncomfortable" },
      { q: "19. What is the negative form of 'correct'?", options: ["uncorrect", "incorrect", "imcorrect", "noncorrect"], a: "incorrect" },
      { q: "20. What is a 'half-brother'?", options: ["a brother who shares only one parent with you", "a brother who is much smaller", "a friend", "a twin brother"], a: "a brother who shares only one parent with you" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền từ có Tiền tố)
    typingGame: [
      { q: "This part of the restaurant is ______-______ (no cigarettes allowed).", hint: "n _ _ - s _ _ _ _ _ g", a: "non-smoking" },
      { q: "I can't read this. Please ______ your homework (write again).", hint: "r _ _ _ _ _ e", a: "rewrite" },
      { q: "In English we often say 'Hi'. It is very ______ (not formal).", hint: "i _ _ _ _ _ _ l", a: "informal" },
      { q: "I liked school but my sister was very ______ there (sad).", hint: "u _ _ _ _ _ y", a: "unhappy" },
      { q: "I bought two T-shirts because they were ______-______ in the sale (50% cost).", hint: "h _ _ f - p _ _ _ e", a: "half-price" },
      { q: "Don't walk on that wall. The notice says it is ______ (dangerous).", hint: "u _ _ _ _ e", a: "unsafe" },
      { q: "A husband who is now divorced from his wife is an ______-______.", hint: "e _ - h _ _ _ _ _ d", a: "ex-husband" },
      { q: "An answer that is wrong is an ______ answer.", hint: "i _ _ _ _ _ _ _ t", a: "incorrect" },
      { q: "A book that you haven't read yet is an ______ book.", hint: "u _ _ _ _ d", a: "unread" },
      { q: "To tell a story again is to ______ the story.", hint: "r _ _ _ _ l", a: "retell" },
      { q: "A letter that is not finished is an ______ letter.", hint: "u _ _ _ _ _ _ _ _ d", a: "unfinished" },
      { q: "A drink without alcohol is ______-______.", hint: "n _ _ - a _ _ _ _ _ _ _ c", a: "non-alcoholic" },
      { q: "To read a book again is to ______ it.", hint: "r _ _ _ _ d", a: "reread" },
      { q: "Negative of possible: ______", hint: "i _ _ _ _ _ _ _ _ e", a: "impossible" },
      { q: "Negative of polite: ______", hint: "i _ _ _ _ _ _ e", a: "impolite" },
      { q: "Negative of safe: ______", hint: "u _ _ _ _ e", a: "unsafe" },
      { q: "Negative of comfortable: ______", hint: "u _ _ _ _ _ _ _ _ _ _ e", a: "uncomfortable" },
      { q: "Children before school age: ______-school children.", hint: "p _ _", a: "pre" },
      { q: "My ______-boss lives near me. (former boss)", hint: "e _", a: "ex" },
      { q: "If you make a mistake, you must ______ it (do again).", hint: "r _ _ o", a: "redo" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "It is impossible to read with your eyes closed.", trans: "Thật không thể nào đọc được khi nhắm mắt." },
      { text: "I bought two T-shirts because they were half-price in the sale.", trans: "Tôi đã mua hai chiếc áo thun vì chúng được giảm nửa giá trong đợt khuyến mãi." },
      { text: "Don't walk on that wall, the notice says it is unsafe.", trans: "Đừng đi trên bức tường đó, tấm biển ghi là nó không an toàn." },
      { text: "My ex-boss lives near me.", trans: "Sếp cũ của tôi sống ở gần tôi." },
      { text: "I can't read this. Please rewrite your homework.", trans: "Tôi không thể đọc được chữ này. Vui lòng viết lại bài tập của bạn." }
    ]
  },

  {
    id: 26,
    title: "Unit 26: Suffixes",
    description: "Hậu tố (Suffixes) nằm ở cuối từ, giúp bạn biến đổi từ loại (ví dụ từ Danh từ sang Tính từ, từ Động từ sang Danh từ chỉ người).",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. -er / -or (Chỉ người hoặc máy móc)",
        items: [
          { word: "-er, -or (person)", type: "Hậu tố", phonetic: "/ɚ/", vi: "Chỉ người thực hiện hành động.", example: "worker (công nhân), swimmer (người bơi), instructor (người hướng dẫn)." },
          { word: "-er, -or (machine)", type: "Hậu tố", phonetic: "/ɚ/", vi: "Chỉ máy móc, dụng cụ.", example: "cooker (bếp lò), word processor (máy xử lý văn bản)." }
        ]
      },
      {
        heading: "B. -ful / -less (Có / Không có)",
        items: [
          { word: "-ful", type: "Hậu tố", phonetic: "/fəl/", vi: "Đầy (full of), mang tính chất gì đó. (Tạo ra Tính từ).", example: "useful (hữu ích), beautiful (xinh đẹp)." },
          { word: "less", type: "Hậu tố", phonetic: "/ləs/", vi: "Không có (without). (Tạo ra Tính từ).", example: "useless (vô dụng), endless (bất tận, không có điểm dừng)." }
        ]
      },
      {
        heading: "C. -ology / -ics (Môn học)",
        items: [
          { word: "-ology", type: "Hậu tố", phonetic: "/ˈɑː.lə.dʒi/", vi: "Môn học, ngành khoa học.", example: "sociology (xã hội học), psychology (tâm lý học)." },
          { word: "-ics", type: "Hậu tố", phonetic: "/ɪks/", vi: "Môn học (luôn chia số ít).", example: "economics (kinh tế học), politics (chính trị học)." }
        ]
      },
      {
        heading: "D. -ly / -ness / -y (Trạng từ và Danh từ trừu tượng)",
        items: [
          { word: "-ly", type: "Hậu tố", phonetic: "/li/", vi: "Tạo thành Trạng từ từ Tính từ.", example: "sadly (một cách buồn bã), happily (một cách vui vẻ)." },
          { word: "-ness", type: "Hậu tố", phonetic: "/nəs/", vi: "Tạo thành Danh từ trừu tượng từ Tính từ.", example: "happiness (niềm vui), sadness (sự buồn bã)." },
          { word: "-y", type: "Hậu tố", phonetic: "/i/", vi: "Tạo thành Tính từ từ Danh từ (thường chỉ thời tiết).", example: "sandy (có cát), sunny (có nắng)." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ)
    dragDrop: {
      buckets: ["Person / Machine (-er/-or)", "Without (-less)", "Full of / Adjective (-ful / -y)", "Study (-ology / -ics)", "Adverb / Noun (-ly / -ness)"],
      items: [
        { id: "i1", word: "worker", target: "Person / Machine (-er/-or)", vi: "công nhân" },
        { id: "i2", word: "swimmer", target: "Person / Machine (-er/-or)", vi: "người bơi lội" },
        { id: "i3", word: "instructor", target: "Person / Machine (-er/-or)", vi: "người hướng dẫn" },
        { id: "i4", word: "cooker", target: "Person / Machine (-er/-or)", vi: "bếp lò (không phải đầu bếp!)" },
        { id: "i5", word: "processor", target: "Person / Machine (-er/-or)", vi: "bộ xử lý" },
        { id: "i6", word: "traveller", target: "Person / Machine (-er/-or)", vi: "khách du lịch" },
        { id: "i7", word: "opener", target: "Person / Machine (-er/-or)", vi: "đồ khui hộp" },
        { id: "i8", word: "footballer", target: "Person / Machine (-er/-or)", vi: "cầu thủ bóng đá" },
        { id: "i9", word: "useless", target: "Without (-less)", vi: "vô dụng" },
        { id: "i10", word: "endless", target: "Without (-less)", vi: "vô tận" },
        { id: "i11", word: "painless", target: "Without (-less)", vi: "không đau đớn" },
        { id: "i12", word: "homeless", target: "Without (-less)", vi: "vô gia cư" },
        { id: "i13", word: "useful", target: "Full of / Adjective (-ful / -y)", vi: "hữu ích" },
        { id: "i14", word: "beautiful", target: "Full of / Adjective (-ful / -y)", vi: "xinh đẹp" },
        { id: "i15", word: "hopeful", target: "Full of / Adjective (-ful / -y)", vi: "đầy hi vọng" },
        { id: "i16", word: "sandy", target: "Full of / Adjective (-ful / -y)", vi: "có cát" },
        { id: "i17", word: "sunny", target: "Full of / Adjective (-ful / -y)", vi: "có nắng" },
        { id: "i18", word: "rainy", target: "Full of / Adjective (-ful / -y)", vi: "có mưa" },
        { id: "i19", word: "sociology", target: "Study (-ology / -ics)", vi: "xã hội học" },
        { id: "i20", word: "psychology", target: "Study (-ology / -ics)", vi: "tâm lý học" },
        { id: "i21", word: "zoology", target: "Study (-ology / -ics)", vi: "động vật học" },
        { id: "i22", word: "economics", target: "Study (-ology / -ics)", vi: "kinh tế học" },
        { id: "i23", word: "politics", target: "Study (-ology / -ics)", vi: "chính trị học" },
        { id: "i24", word: "mathematics", target: "Study (-ology / -ics)", vi: "toán học" },
        { id: "i25", word: "sadly", target: "Adverb / Noun (-ly / -ness)", vi: "một cách buồn bã (-ly)" },
        { id: "i26", word: "happily", target: "Adverb / Noun (-ly / -ness)", vi: "một cách vui vẻ (-ly)" },
        { id: "i27", word: "slowly", target: "Adverb / Noun (-ly / -ness)", vi: "một cách chậm chạp (-ly)" },
        { id: "i28", word: "badly", target: "Adverb / Noun (-ly / -ness)", vi: "một cách tồi tệ (-ly)" },
        { id: "i29", word: "happiness", target: "Adverb / Noun (-ly / -ness)", vi: "niềm vui (-ness)" },
        { id: "i30", word: "sadness", target: "Adverb / Noun (-ly / -ness)", vi: "nỗi buồn (-ness)" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 26.1 đến 26.5)
    quiz: [
      { q: "1. A person who works hard is a hard _____.", options: ["work", "worker", "workor", "workful"], a: "worker" },
      { q: "2. The machine we use to cook food is a _____.", options: ["cook", "cooker", "cookor", "cookless"], a: "cooker" },
      { q: "3. If information helps you a lot, it is very _____.", options: ["useless", "user", "useful", "useology"], a: "useful" },
      { q: "4. If a book is no help at all, it is _____.", options: ["useless", "useful", "useor", "user"], a: "useless" },
      { q: "5. A photo that is very pretty is _____.", options: ["beauty", "beautiful", "beautyless", "beautier"], a: "beautiful" },
      { q: "6. The study of society is _____.", options: ["socialics", "sociology", "socialology", "societyics"], a: "sociology" },
      { q: "7. The study of the human mind and people is _____.", options: ["psychology", "biology", "zoology", "politics"], a: "psychology" },
      { q: "8. The study of money and finance is _____.", options: ["moneyology", "financelogy", "economics", "politics"], a: "economics" },
      { q: "9. A beach with a lot of sand is a _____ beach.", options: ["sandful", "sandless", "sander", "sandy"], a: "sandy" },
      { q: "10. A day with a lot of sun is a _____ day.", options: ["sunny", "sunful", "sunless", "sunner"], a: "sunny" },
      { q: "11. To do something in a happy way is to do it _____.", options: ["happiness", "happier", "happily", "happyful"], a: "happily" },
      { q: "12. The noun for 'happy' is _____.", options: ["happily", "happiness", "happyology", "happyer"], a: "happiness" },
      { q: "13. What is the study of animals?", options: ["psychology", "sociology", "zoology", "economics"], a: "zoology" },
      { q: "14. A person who travels is a _____.", options: ["travel", "travelful", "travelless", "traveller"], a: "traveller" },
      { q: "15. A day with a lot of rain is _____.", options: ["rainful", "rainy", "rainer", "rainless"], a: "rainy" },
      { q: "16. If something does not hurt at all, it is _____.", options: ["painful", "painless", "painy", "painly"], a: "painless" },
      { q: "17. An instrument to open a tin is a tin _____.", options: ["opener", "openful", "openless", "openology"], a: "opener" },
      { q: "18. A person who plays football is a _____.", options: ["football", "footballist", "footballer", "footballor"], a: "footballer" },
      { q: "19. The mother was smiling with _____ as she held her baby.", options: ["happily", "happiness", "happy", "happyful"], a: "happiness" },
      { q: "20. They said goodbye with great _____. (Noun of sad)", options: ["sadly", "sadness", "saddy", "sadful"], a: "sadness" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn chính tả Hậu tố)
    typingGame: [
      { q: "A person who swims well: She's a very good ______.", hint: "s _ _ _ _ _ r", a: "swimmer" },
      { q: "A machine for cooking: We've got a new gas ______.", hint: "c _ _ _ _ r", a: "cooker" },
      { q: "Full of use: Thanks for the info, it was very ______.", hint: "u _ _ _ _ l", a: "useful" },
      { q: "Full of beauty: What a ______ photo.", hint: "b _ _ _ _ _ _ _ l", a: "beautiful" },
      { q: "Without use: This book is no help at all - it's ______.", hint: "u _ _ _ _ _ s", a: "useless" },
      { q: "Without an end: I can't finish this book - it's ______.", hint: "e _ _ _ _ _ s", a: "endless" },
      { q: "Study of people/mind: Studying ______ teaches you about people.", hint: "p _ _ _ _ _ _ _ _ y", a: "psychology" },
      { q: "Study of money/finance: ______ is the study of finance.", hint: "e _ _ _ _ _ _ _ s", a: "economics" },
      { q: "Study of government: He has never studied ______.", hint: "p _ _ _ _ _ _ s", a: "politics" },
      { q: "Adverb of happy: The child danced ______.", hint: "h _ _ _ _ _ y", a: "happily" },
      { q: "Noun of happy: The mother was smiling with ______.", hint: "h _ _ _ _ _ _ _ s", a: "happiness" },
      { q: "Noun of sad: They said goodbye with great ______.", hint: "s _ _ _ _ _ s", a: "sadness" },
      { q: "Adjective of sand: The beach is long and ______.", hint: "s _ _ _ y", a: "sandy" },
      { q: "Adjective of sun: It's a lovely ______ day.", hint: "s _ _ _ y", a: "sunny" },
      { q: "The study of animals is ______.", hint: "z _ _ _ _ _ y", a: "zoology" },
      { q: "A person who travels is a ______.", hint: "t _ _ _ _ _ _ _ r", a: "traveller" },
      { q: "Adjective of rain: It is a ______ day.", hint: "r _ _ _ y", a: "rainy" },
      { q: "Without pain: The dentist said it would be ______.", hint: "p _ _ _ _ _ _ s", a: "painless" },
      { q: "A machine to open tins: a tin ______.", hint: "o _ _ _ _ r", a: "opener" },
      { q: "A person who teaches/instructs: an ______.", hint: "i _ _ _ _ _ _ _ _ r", a: "instructor" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "Thanks for the information. It was very useful.", trans: "Cảm ơn vì thông tin. Nó rất hữu ích." },
      { text: "It's a lovely sunny day, let's go to the beach.", trans: "Hôm nay là một ngày nắng đẹp, hãy đi biển thôi." },
      { text: "He was late for work so he went quickly to the station.", trans: "Anh ấy bị muộn làm nên đã đi nhanh ra ga tàu." },
      { text: "Her tennis is much better now that she has a new instructor.", trans: "Môn quần vợt của cô ấy giờ tốt hơn nhiều vì cô ấy có một người hướng dẫn mới." },
      { text: "The mother was smiling with happiness as she held her baby.", trans: "Người mẹ mỉm cười hạnh phúc khi bế đứa con của mình." }
    ]
  },
  {
    id: 27,
    title: "Unit 27: Words you may confuse",
    description: "Khắc phục triệt để các lỗi sai kinh điển khi sử dụng những từ có âm thanh giống nhau (quite/quiet, lose/loose) hoặc ý nghĩa dễ nhầm lẫn (lend/borrow, check/control).",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Similar sounds (Các từ có âm thanh giống nhau)",
        items: [
          { word: "quite", type: "Trạng từ", phonetic: "/kwaɪt/", vi: "Khá, tương đối (= not bad, quite good). (Âm /aɪ/ giống 'right').", example: "This book is quite good." },
          { word: "quiet", type: "Tính từ", phonetic: "/ˈkwaɪ.ət/", vi: "Yên lặng, không ồn ào. (Âm /aɪ.ə/ giống 'higher').", example: "My bedroom is very quiet." },
          { word: "lose", type: "Động từ", phonetic: "/luːz/", vi: "Đánh mất, không tìm thấy (Âm cuối là /z/, vần với 'shoes').", example: "Why do I always lose my keys!" },
          { word: "loose", type: "Tính từ", phonetic: "/luːs/", vi: "Lỏng lẻo, rộng, không chật (Âm cuối là /s/, vần với 'juice').", example: "These trousers are very loose." },
          { word: "fell", type: "Động từ", phonetic: "/fel/", vi: "Đã ngã (Quá khứ của fall).", example: "Yesterday I fell and broke my arm." },
          { word: "felt", type: "Động từ", phonetic: "/felt/", vi: "Đã cảm thấy (Quá khứ của feel).", example: "I felt ill yesterday, but I feel OK today." },
          { word: "cooker", type: "Danh từ", phonetic: "/ˈkʊk.ɚ/", vi: "Bếp lò (cái máy để nấu ăn).", example: "This cooker costs £500." },
          { word: "cook", type: "Danh từ", phonetic: "/kʊk/", vi: "Đầu bếp (người nấu ăn).", example: "He is a very good cook. [NOT He is a very good cooker]" }
        ]
      },
      {
        heading: "B. Similar or related meanings (Ý nghĩa tương tự nhau)",
        items: [
          { word: "lend", type: "Động từ", phonetic: "/lend/", vi: "Cho mượn (bạn đưa cho ai đó).", example: "Will you lend me your bicycle?" },
          { word: "borrow", type: "Động từ", phonetic: "/ˈbɑː.roʊ/", vi: "Đi mượn (bạn lấy từ ai đó).", example: "Can I borrow your bicycle?" },
          { word: "check", type: "Động từ", phonetic: "/tʃek/", vi: "Kiểm tra, xem xét (xem có đúng/an toàn không).", example: "The passport officer checked my passport." },
          { word: "control", type: "Động từ", phonetic: "/kənˈtroʊl/", vi: "Điều khiển, kiểm soát (bảo nó phải làm gì).", example: "The mouse controls the computer. [NOT checked the computer]" }
        ]
      },
      {
        heading: "C. Other words often mixed up (Các từ khác thường bị nhầm)",
        items: [
          { word: "afternoon", type: "Danh từ", phonetic: "/ˌæf.tɚˈnuːn/", vi: "Buổi chiều (Khoảng từ 12h trưa đến 5-6h chiều).", example: "I will see you in the afternoon." },
          { word: "evening", type: "Danh từ", phonetic: "/ˈiːv.nɪŋ/", vi: "Buổi tối (Khoảng 5-6h chiều đến 9-10h tối).", example: "We watch TV in the evening." },
          { word: "night", type: "Danh từ", phonetic: "/naɪt/", vi: "Đêm (Sau 9-10h tối).", example: "I sleep at night." },
          { word: "wait for", type: "Cụm động từ", phonetic: "/weɪt fɔːr/", vi: "Chờ đợi (ai/cái gì).", example: "They're waiting for the bus." },
          { word: "hope", type: "Động từ", phonetic: "/hoʊp/", vi: "Hy vọng (bạn thực sự muốn điều đó xảy ra).", example: "I hope I pass my exams." },
          { word: "expect", type: "Động từ", phonetic: "/ɪkˈspekt/", vi: "Nghĩ rằng điều gì sẽ xảy ra, dự kiến (dù có muốn hay không).", example: "I have not studied; I expect I'll fail my exams." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại các cặp từ dễ nhầm)
    dragDrop: {
      buckets: ["Quite / Quiet", "Lose / Loose", "Fell / Felt / Cook", "Lend / Borrow", "Check / Control / Time"],
      items: [
        { id: "i1", word: "quite", target: "Quite / Quiet", vi: "khá, tương đối" },
        { id: "i2", word: "quiet", target: "Quite / Quiet", vi: "yên tĩnh" },
        { id: "i3", word: "quite good", target: "Quite / Quiet", vi: "khá tốt" },
        { id: "i4", word: "silent room", target: "Quite / Quiet", vi: "phòng yên tĩnh (quiet)" },
        { id: "i5", word: "sounds like 'right'", target: "Quite / Quiet", vi: "phát âm giống 'right' (quite)" },
        { id: "i6", word: "sounds like 'higher'", target: "Quite / Quiet", vi: "phát âm giống 'higher' (quiet)" },
        { id: "i7", word: "lose", target: "Lose / Loose", vi: "đánh mất" },
        { id: "i8", word: "loose", target: "Lose / Loose", vi: "lỏng lẻo, rộng" },
        { id: "i9", word: "can't find it", target: "Lose / Loose", vi: "không tìm thấy (lose)" },
        { id: "i10", word: "not tight", target: "Lose / Loose", vi: "không chật (loose)" },
        { id: "i11", word: "sounds like 'shoes'", target: "Lose / Loose", vi: "phát âm giống 'shoes' (lose)" },
        { id: "i12", word: "sounds like 'juice'", target: "Lose / Loose", vi: "phát âm giống 'juice' (loose)" },
        { id: "i13", word: "fell", target: "Fell / Felt / Cook", vi: "đã ngã (fall)" },
        { id: "i14", word: "felt", target: "Fell / Felt / Cook", vi: "đã cảm thấy (feel)" },
        { id: "i15", word: "broke my arm", target: "Fell / Felt / Cook", vi: "gãy tay (fell)" },
        { id: "i16", word: "ill yesterday", target: "Fell / Felt / Cook", vi: "ốm hôm qua (felt)" },
        { id: "i17", word: "cook", target: "Fell / Felt / Cook", vi: "đầu bếp" },
        { id: "i18", word: "cooker", target: "Fell / Felt / Cook", vi: "bếp lò" },
        { id: "i19", word: "lend", target: "Lend / Borrow", vi: "cho mượn (đưa đi)" },
        { id: "i20", word: "borrow", target: "Lend / Borrow", vi: "đi mượn (nhận về)" },
        { id: "i21", word: "give it", target: "Lend / Borrow", vi: "đưa nó ra (lend)" },
        { id: "i22", word: "get it", target: "Lend / Borrow", vi: "nhận nó về (borrow)" },
        { id: "i23", word: "check", target: "Check / Control / Time", vi: "kiểm tra (nhìn xem xét)" },
        { id: "i24", word: "control", target: "Check / Control / Time", vi: "điều khiển (bảo phải làm gì)" },
        { id: "i25", word: "afternoon", target: "Check / Control / Time", vi: "buổi chiều (12-6pm)" },
        { id: "i26", word: "evening", target: "Check / Control / Time", vi: "buổi tối (6-10pm)" },
        { id: "i27", word: "night", target: "Check / Control / Time", vi: "đêm (sau 10pm)" },
        { id: "i28", word: "wait for", target: "Check / Control / Time", vi: "chờ đợi" },
        { id: "i29", word: "hope", target: "Check / Control / Time", vi: "hy vọng (muốn xảy ra)" },
        { id: "i30", word: "expect", target: "Check / Control / Time", vi: "dự kiến (sẽ xảy ra)" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Bẫy lỗi thường gặp Ex 27.1-27.4)
    quiz: [
      { q: "1. Please be _____. The baby is sleeping.", options: ["quite", "quiet", "quit", "quick"], a: "quiet" },
      { q: "2. The film was _____ good.", options: ["quiet", "quite", "quit", "quietly"], a: "quite" },
      { q: "3. If you _____ your passport, you must call the Embassy.", options: ["loose", "lose", "lost", "loss"], a: "lose" },
      { q: "4. These shoes are very _____. I need smaller ones.", options: ["lose", "loose", "loss", "lost"], a: "loose" },
      { q: "5. I _____ tired this morning, but I am OK now.", options: ["fell", "fall", "felt", "feel"], a: "felt" },
      { q: "6. She _____ and broke her leg. She had to go to hospital.", options: ["felt", "fall", "feel", "fell"], a: "fell" },
      { q: "7. We are going to buy a _____ for our new kitchen.", options: ["cook", "cooking", "cooker", "cooked"], a: "cooker" },
      { q: "8. My sister is a good _____. I love eating at her house.", options: ["cooker", "cook", "cooking", "cooks"], a: "cook" },
      { q: "9. What does a mouse do to a computer? It _____ it.", options: ["checks", "lends", "borrows", "controls"], a: "controls" },
      { q: "10. What does the passport officer do to your passport? He _____ it.", options: ["controls", "checks", "looks", "borrows"], a: "checks" },
      { q: "11. If you want to use someone's camera, you say: 'Can I _____ your camera?'", options: ["lend", "borrow", "take", "give"], a: "borrow" },
      { q: "12. If your friend needs £1, they ask: 'Can you _____ me £1?'", options: ["borrow", "lend", "give", "take"], a: "lend" },
      { q: "13. What do you say to someone at 3 p.m.?", options: ["Good evening", "Good night", "Good afternoon", "Good day"], a: "Good afternoon" },
      { q: "14. What do people do at a bus stop?", options: ["They wait to the bus.", "They wait the bus.", "They expect the bus.", "They wait for the bus."], a: "They wait for the bus." },
      { q: "15. I haven't studied at all. I _____ I'll fail the exam.", options: ["hope", "expect", "wait", "wish"], a: "expect" },
      { q: "16. I _____ I pass my driving test today! (I really want to)", options: ["expect", "wait", "hope", "control"], a: "hope" },
      { q: "17. Which word sounds like 'shoes'?", options: ["loose", "lose", "juice", "quiet"], a: "lose" },
      { q: "18. Which word sounds like 'juice'?", options: ["lose", "loose", "quite", "shoes"], a: "loose" },
      { q: "19. Which word sounds like 'higher'?", options: ["quite", "quiet", "right", "hide"], a: "quiet" },
      { q: "20. Which word sounds like 'right'?", options: ["quite", "quiet", "higher", "wait"], a: "quite" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Rèn chính tả phân biệt từ)
    typingGame: [
      { q: "My bedroom is very ______. (no noise)", hint: "q _ _ _ t", a: "quiet" },
      { q: "This book is ______ good. (not bad)", hint: "q _ _ _ e", a: "quite" },
      { q: "Why do I always ______ my keys? (can't find)", hint: "l _ _ e", a: "lose" },
      { q: "These trousers are very ______. (not tight)", hint: "l _ _ _ e", a: "loose" },
      { q: "Yesterday I ______ and broke my arm. (past of fall)", hint: "f _ _ l", a: "fell" },
      { q: "I ______ ill yesterday, but I'm OK today. (past of feel)", hint: "f _ _ t", a: "felt" },
      { q: "This ______ costs £500. (the thing you cook on)", hint: "c _ _ _ _ r", a: "cooker" },
      { q: "He is a very good ______. (the person who cooks)", hint: "c _ _ k", a: "cook" },
      { q: "Can I ______ your bicycle? (I get it from you)", hint: "b _ _ _ _ w", a: "borrow" },
      { q: "Will you ______ me your bicycle? (you give it to me)", hint: "l _ _ d", a: "lend" },
      { q: "The passport officer ______ my passport. (looked at it)", hint: "c _ _ _ _ _ d", a: "checked" },
      { q: "The mouse ______ the computer. (tells it what to do)", hint: "c _ _ _ _ _ _ s", a: "controls" },
      { q: "Between 12 o'clock and 5 p.m. is the ______.", hint: "a _ _ _ _ _ _ _ n", a: "afternoon" },
      { q: "Between 6 p.m. and 10 p.m. is the ______.", hint: "e _ _ _ _ _ g", a: "evening" },
      { q: "They are waiting ______ the bus. (preposition)", hint: "f _ r", a: "for" },
      { q: "I ______ I pass my exams! (I really want to)", hint: "h _ _ e", a: "hope" },
      { q: "I have not studied; I ______ I'll fail. (it's probable)", hint: "e _ _ _ _ t", a: "expect" },
      { q: "Sound check: 'loose' sounds like j______.", hint: "j _ _ _ e", a: "juice" },
      { q: "Sound check: 'lose' sounds like s______.", hint: "s _ _ _ s", a: "shoes" },
      { q: "Sound check: 'quiet' sounds like h______.", hint: "h _ _ _ _ r", a: "higher" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "My bedroom is very quiet. I can read quite well here.", trans: "Phòng ngủ của tôi rất yên tĩnh. Tôi có thể đọc sách khá tốt ở đây." },
      { text: "Why do I always lose my keys? I need to check my bag again.", trans: "Tại sao tôi luôn đánh mất chìa khóa thế nhỉ? Tôi cần phải kiểm tra lại túi của mình." },
      { text: "These trousers are very loose because I lost weight.", trans: "Chiếc quần này rất rộng vì tôi đã giảm cân." },
      { text: "Will you lend me your bicycle? I promise to give it back in the afternoon.", trans: "Bạn cho tôi mượn xe đạp được không? Tôi hứa sẽ trả lại vào buổi chiều." },
      { text: "He is a very good cook and he just bought a new cooker.", trans: "Anh ấy là một đầu bếp rất giỏi và anh ấy vừa mua một chiếc bếp lò mới." }
    ]
  },

  {
    id: 28,
    title: "Unit 28: Birth, marriage and death",
    description: "Học toàn bộ hệ thống từ vựng về ba cột mốc quan trọng nhất trong vòng đời con người: sinh ra, kết hôn và qua đời, cùng các cụm từ đi kèm.",
    
    // 1. LÝ THUYẾT CHI TIẾT
    theory: [
      {
        heading: "A. Birth (Sự ra đời)",
        items: [
          { word: "have a baby", type: "Cụm từ", phonetic: "/hæv ə ˈbeɪ.bi/", vi: "Sinh em bé.", example: "Diana had a baby yesterday." },
          { word: "be born", type: "Động từ (Bị động)", phonetic: "/bɔːrn/", vi: "Được sinh ra.", example: "He was born at 1.15 yesterday morning. / The parents were born in 1974." },
          { word: "weigh", type: "Động từ", phonetic: "/weɪ/", vi: "Nặng (bao nhiêu cân).", example: "The baby weighed 3 kilograms." },
          { word: "call someone after...", type: "Cụm động từ", phonetic: "/kɑːl ˈæf.tɚ/", vi: "Đặt tên theo tên của ai đó.", example: "They are going to call him John - after John, his grandfather." }
        ]
      },
      {
        heading: "B. Marriage (Kết hôn)",
        items: [
          { word: "single", type: "Tính từ", phonetic: "/ˈsɪŋ.ɡəl/", vi: "Độc thân (không có đối tác/vợ/chồng).", example: "If you do not have a partner, you are single." },
          { word: "married", type: "Tính từ", phonetic: "/ˈmer.id/", vi: "Đã kết hôn.", example: "If you have a husband or wife, you are married." },
          { word: "widowed", type: "Tính từ", phonetic: "/ˈwɪd.oʊd/", vi: "Góa (chồng hoặc vợ đã mất).", example: "If your husband or wife dies, you are widowed." },
          { word: "separated / divorced", type: "Tính từ", phonetic: "/ˈsep.ə.reɪ.tɪd/ /dɪˈvɔːrst/", vi: "Ly thân / Ly hôn.", example: "If your marriage breaks up, you are separated/divorced." },
          { word: "bride / (bride)groom", type: "Danh từ", phonetic: "/braɪd/ /ɡruːm/", vi: "Cô dâu / Chú rể.", example: "The bride and groom looked very happy." },
          { word: "get married to", type: "Cụm từ", phonetic: "/get ˈmer.id tuː/", vi: "Kết hôn với ai. [KHÔNG DÙNG: married with].", example: "Sarah got married to Bill." },
          { word: "honeymoon", type: "Danh từ", phonetic: "/ˈhʌn.i.muːn/", vi: "Tuần trăng mật.", example: "They went on honeymoon to Italy." }
        ]
      },
      {
        heading: "C. Death (Sự qua đời)",
        items: [
          { word: "die", type: "Động từ", phonetic: "/daɪ/", vi: "Chết, qua đời (Hành động).", example: "He died last year." },
          { word: "die of", type: "Cụm động từ", phonetic: "/daɪ əv/", vi: "Chết vì bệnh gì đó.", example: "He died of a heart attack." },
          { word: "dead", type: "Tính từ", phonetic: "/ded/", vi: "Đã chết (Trạng thái).", example: "Bill is dead." },
          { word: "death", type: "Danh từ", phonetic: "/deθ/", vi: "Cái chết.", example: "His death was a great shock." },
          { word: "funeral", type: "Danh từ", phonetic: "/ˈfjuː.nɚ.əl/", vi: "Đám tang.", example: "Many people went to the funeral." }
        ]
      }
    ],

    // 2. GHÉP TỪ (30 từ - Phân loại theo Birth, Marriage, Death)
    dragDrop: {
      buckets: ["Birth (Sinh ra)", "Marriage (Kết hôn)", "Death (Qua đời)", "People (Người)", "Status (Tình trạng)"],
      items: [
        { id: "i1", word: "have a baby", target: "Birth (Sinh ra)", vi: "sinh em bé" },
        { id: "i2", word: "was born", target: "Birth (Sinh ra)", vi: "được sinh ra" },
        { id: "i3", word: "weighed 3 kilos", target: "Birth (Sinh ra)", vi: "nặng 3 ký" },
        { id: "i4", word: "call after", target: "Birth (Sinh ra)", vi: "đặt tên theo" },
        { id: "i5", word: "birthday", target: "Birth (Sinh ra)", vi: "ngày sinh nhật" },
        { id: "i6", word: "get married", target: "Marriage (Kết hôn)", vi: "kết hôn" },
        { id: "i7", word: "married to", target: "Marriage (Kết hôn)", vi: "kết hôn với (ai)" },
        { id: "i8", word: "in church", target: "Marriage (Kết hôn)", vi: "ở nhà thờ" },
        { id: "i9", word: "honeymoon", target: "Marriage (Kết hôn)", vi: "tuần trăng mật" },
        { id: "i10", word: "wedding", target: "Marriage (Kết hôn)", vi: "lễ cưới" },
        { id: "i11", word: "marriage breaks up", target: "Marriage (Kết hôn)", vi: "hôn nhân tan vỡ" },
        { id: "i12", word: "die", target: "Death (Qua đời)", vi: "qua đời (động từ)" },
        { id: "i13", word: "died of", target: "Death (Qua đời)", vi: "chết vì (bệnh gì)" },
        { id: "i14", word: "death", target: "Death (Qua đời)", vi: "cái chết (danh từ)" },
        { id: "i15", word: "funeral", target: "Death (Qua đời)", vi: "đám tang" },
        { id: "i16", word: "a heart attack", target: "Death (Qua đời)", vi: "cơn đau tim" },
        { id: "i17", word: "bride", target: "People (Người)", vi: "cô dâu" },
        { id: "i18", word: "groom", target: "People (Người)", vi: "chú rể" },
        { id: "i19", word: "husband", target: "People (Người)", vi: "người chồng" },
        { id: "i20", word: "wife", target: "People (Người)", vi: "người vợ" },
        { id: "i21", word: "partner", target: "People (Người)", vi: "đối tác / người yêu" },
        { id: "i22", word: "parents", target: "People (Người)", vi: "cha mẹ" },
        { id: "i23", word: "single", target: "Status (Tình trạng)", vi: "độc thân" },
        { id: "i24", word: "married (status)", target: "Status (Tình trạng)", vi: "đã kết hôn" },
        { id: "i25", word: "widowed", target: "Status (Tình trạng)", vi: "góa vợ/chồng" },
        { id: "i26", word: "separated", target: "Status (Tình trạng)", vi: "ly thân" },
        { id: "i27", word: "divorced", target: "Status (Tình trạng)", vi: "đã ly hôn" },
        { id: "i28", word: "dead", target: "Status (Tình trạng)", vi: "đã chết (tính từ)" },
        { id: "i29", word: "alive", target: "Status (Tình trạng)", vi: "còn sống" },
        { id: "i30", word: "ill", target: "Status (Tình trạng)", vi: "bị ốm" }
      ]
    },

    // 3. TRẮC NGHIỆM TỰ ĐỘNG (20 Câu - Ex 28.1 đến 28.5)
    quiz: [
      { q: "1. Diana _____ a baby yesterday.", options: ["made", "had", "got", "took"], a: "had" },
      { q: "2. The baby was _____ at 1.15 yesterday morning.", options: ["born", "borne", "birth", "birth's"], a: "born" },
      { q: "3. The baby _____ 3 kilograms.", options: ["weighs", "weighed", "wait", "heavy"], a: "weighed" },
      { q: "4. They are going to call him John _____ his grandfather.", options: ["before", "behind", "after", "for"], a: "after" },
      { q: "5. If you do not have a partner, you are _____.", options: ["widowed", "married", "divorced", "single"], a: "single" },
      { q: "6. If your husband or wife dies, you are _____.", options: ["widowed", "married", "divorced", "single"], a: "widowed" },
      { q: "7. If your marriage breaks up legally, you are _____.", options: ["widowed", "married", "divorced", "single"], a: "divorced" },
      { q: "8. The name for a woman on her wedding day is the _____.", options: ["groom", "wife", "bride", "single"], a: "bride" },
      { q: "9. The name for a man on his wedding day is the _____.", options: ["groom", "husband", "bride", "widow"], a: "groom" },
      { q: "10. Sarah got married _____ Bill.", options: ["with", "to", "for", "by"], a: "to" },
      { q: "11. After the wedding, they went on _____ to Italy.", options: ["honeymoon", "holiday", "trip", "travel"], a: "honeymoon" },
      { q: "12. Bill became ill and _____ last year.", options: ["dead", "death", "die", "died"], a: "died" },
      { q: "13. He died _____ a heart attack.", options: ["from", "by", "of", "with"], a: "of" },
      { q: "14. A religious service for a dead person is a _____.", options: ["wedding", "honeymoon", "funeral", "marriage"], a: "funeral" },
      { q: "15. Which is correct?", options: ["His dead was a shock.", "His died was a shock.", "His die was a shock.", "His death was a shock."], a: "His death was a shock." },
      { q: "16. Her grandmother has been _____ for five years now.", options: ["died", "die", "death", "dead"], a: "dead" },
      { q: "17. Now all Jill's grandparents are _____.", options: ["dead", "death", "died", "dies"], a: "dead" },
      { q: "18. In 1993, Anne got married. She was married _____ Robert.", options: ["with", "to", "for", "by"], a: "to" },
      { q: "19. Robert's grandmother died _____ old age.", options: ["with", "by", "for", "of"], a: "of" },
      { q: "20. They were _____ their honeymoon when she died.", options: ["in", "on", "at", "for"], a: "on" }
    ],

    // 4. GÕ TỪ TỰ ĐỘNG (20 Câu - Điền khuyết)
    typingGame: [
      { q: "Diana ______ a baby yesterday.", hint: "h _ d", a: "had" },
      { q: "The baby was ______ at 1.15.", hint: "b _ _ n", a: "born" },
      { q: "It ______ 3 kilograms. (số cân nặng ở quá khứ)", hint: "w _ _ _ _ _ d", a: "weighed" },
      { q: "They call him John ______ his grandfather.", hint: "a _ _ _ r", a: "after" },
      { q: "If you do not have a partner, you are ______.", hint: "s _ _ _ _ e", a: "single" },
      { q: "If you have a husband or wife, you are ______.", hint: "m _ _ _ _ _ d", a: "married" },
      { q: "If your husband or wife dies, you are ______.", hint: "w _ _ _ _ _ d", a: "widowed" },
      { q: "If your marriage legally ends, you are ______.", hint: "d _ _ _ _ _ _ d", a: "divorced" },
      { q: "The woman on her wedding day is the ______.", hint: "b _ _ _ e", a: "bride" },
      { q: "The man on his wedding day is the ______.", hint: "g _ _ _ m", a: "groom" },
      { q: "Sarah got married ______ Bill. (preposition)", hint: "t _", a: "to" },
      { q: "They got married in ______ (a religious building).", hint: "c _ _ _ _ h", a: "church" },
      { q: "They went on ______ to Italy after the wedding.", hint: "h _ _ _ _ _ _ _ n", a: "honeymoon" },
      { q: "He ______ last year. (verb, past tense)", hint: "d _ _ d", a: "died" },
      { q: "He died ______ a heart attack. (preposition)", hint: "o f", a: "of" },
      { q: "Bill is ______. (adjective, state)", hint: "d _ _ d", a: "dead" },
      { q: "His ______ was a great shock to her. (noun)", hint: "d _ _ _ h", a: "death" },
      { q: "Many people went to the ______ (service for a dead person).", hint: "f _ _ _ _ _ l", a: "funeral" },
      { q: "My mother was born ______ July 4th.", hint: "o n", a: "on" },
      { q: "My father was born ______ 1947.", hint: "i n", a: "in" }
    ],

    // 5. THỰC HÀNH NÓI VÀ VIẾT AI
    speaking: [
      { text: "Diana had a baby yesterday. It was born at 1.15.", trans: "Diana đã sinh một em bé vào ngày hôm qua. Em bé chào đời lúc 1 giờ 15 phút." },
      { text: "Sarah got married to Bill in church.", trans: "Sarah đã kết hôn với Bill ở nhà thờ." },
      { text: "They went on honeymoon to Italy after the wedding.", trans: "Họ đã đi nghỉ tuần trăng mật ở Ý sau lễ cưới." },
      { text: "If your marriage breaks up, you are separated or divorced.", trans: "Nếu cuộc hôn nhân của bạn tan vỡ, bạn sẽ ở tình trạng ly thân hoặc ly hôn." },
      { text: "His death was a great shock to her.", trans: "Cái chết của anh ấy là một cú sốc lớn đối với cô." }
    ]
  }
];