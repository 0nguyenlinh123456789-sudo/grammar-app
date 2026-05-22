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
  }
];