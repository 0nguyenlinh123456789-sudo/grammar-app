// File: src/data/oxfordDataPart2.js

export const courseData = [
  {
    "id": 33,
    "title": "Unit 33: Health and illness",
    "description": "Học từ vựng về các vấn đề sức khỏe thường gặp, các triệu chứng bệnh, các căn bệnh nghiêm trọng và cách giữ gìn vóc dáng, sức khỏe.",
    "theory": [
      {
        "heading": "A. How are you today? (Hôm nay bạn thế nào?)",
        "items": [
          {
            "word": "very well / fine",
            "type": "Tính từ",
            "phonetic": "/wel/ /faɪn/",
            "vi": "Rất khỏe / Ổn.",
            "example": "I am very well, thanks. I'm fine, thanks."
          },
          {
            "word": "feel ill / feel sick",
            "type": "Cụm từ",
            "phonetic": "/fiːl ɪl/ /sɪk/",
            "vi": "Cảm thấy ốm/bệnh (Ill thường cần bác sĩ; feel sick có thể nghĩa là buồn nôn).",
            "example": "I feel ill. Can you get a doctor please. I feel sick and want to vomit."
          }
        ]
      },
      {
        "heading": "B. Everyday problems (Các vấn đề thường gặp)",
        "items": [
          {
            "word": "headache / toothache",
            "type": "Danh từ",
            "phonetic": "/ˈhed.eɪk/ /ˈtuːθ.eɪk/",
            "vi": "Đau đầu / Đau răng.",
            "example": "Have you got an aspirin? I've got a headache."
          },
          {
            "word": "a cold / cough",
            "type": "Danh từ / Động từ",
            "phonetic": "/koʊld/ /kɑːf/",
            "vi": "Cảm lạnh / Ho.",
            "example": "I'm going to bed with a hot drink. I've got a cold."
          }
        ]
      },
      {
        "heading": "C & D. Serious illnesses & Tropical problems (Bệnh nghiêm trọng & Vùng nhiệt đới)",
        "items": [
          {
            "word": "asthma / hay-fever",
            "type": "Danh từ",
            "phonetic": "/ˈæz.mə/ /ˈheɪˌfiː.vɚ/",
            "vi": "Hen suyễn / Dị ứng phấn hoa (hắt hơi liên tục).",
            "example": "My brother has asthma; sometimes he can't breathe."
          },
          {
            "word": "malaria / cholera",
            "type": "Danh từ",
            "phonetic": "/məˈler.i.ə/ /ˈkɑː.lɚ.ə/",
            "vi": "Sốt rét / Bệnh tả (do muỗi đốt hoặc nước bẩn).",
            "example": "Mosquitoes can give people malaria. Dirty water caused cholera."
          },
          {
            "word": "heart attack / cancer",
            "type": "Danh từ",
            "phonetic": "/hɑːrt əˈtæk/ /ˈkæn.sɚ/",
            "vi": "Cơn đau tim / Bệnh ung thư.",
            "example": "My grandfather had a heart attack. Cancer kills many people."
          }
        ]
      },
      {
        "heading": "E. How to keep fit and well (Cách giữ sức khỏe)",
        "items": [
          {
            "word": "healthy diet",
            "type": "Cụm từ",
            "phonetic": "/ˈhel.θi ˈdaɪ.ət/",
            "vi": "Chế độ ăn uống lành mạnh (nhiều rau quả).",
            "example": "Eat lots of fruit and vegetables to have a healthy diet."
          },
          {
            "word": "get exercise",
            "type": "Cụm từ",
            "phonetic": "/ˈek.sɚ.saɪz/",
            "vi": "Tập thể dục (chạy bộ, bơi lội, đạp xe).",
            "example": "Swimming and jogging are good ways to get exercise."
          },
          {
            "word": "stress",
            "type": "Danh từ",
            "phonetic": "/stres/",
            "vi": "Căng thẳng, áp lực.",
            "example": "Relax after work and don't have too much stress."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Everyday Symptoms",
        "Serious Illnesses",
        "Keep Fit (Giữ dáng)",
        "Medical & Treatment"
      ],
      "items": [
        {
          "id": "i1",
          "word": "headache",
          "target": "Everyday Symptoms",
          "vi": "đau đầu"
        },
        {
          "id": "i2",
          "word": "toothache",
          "target": "Everyday Symptoms",
          "vi": "đau răng"
        },
        {
          "id": "i3",
          "word": "cold",
          "target": "Everyday Symptoms",
          "vi": "cảm lạnh"
        },
        {
          "id": "i4",
          "word": "cough",
          "target": "Everyday Symptoms",
          "vi": "cơn ho / ho"
        },
        {
          "id": "i5",
          "word": "sneezing",
          "target": "Everyday Symptoms",
          "vi": "hắt hơi"
        },
        {
          "id": "i6",
          "word": "hay-fever",
          "target": "Everyday Symptoms",
          "vi": "dị ứng phấn hoa"
        },
        {
          "id": "i7",
          "word": "sick",
          "target": "Everyday Symptoms",
          "vi": "buồn nôn / ốm"
        },
        {
          "id": "i8",
          "word": "vomit",
          "target": "Everyday Symptoms",
          "vi": "nôn mửa"
        },
        {
          "id": "i9",
          "word": "heart attack",
          "target": "Serious Illnesses",
          "vi": "cơn đau tim"
        },
        {
          "id": "i10",
          "word": "cancer",
          "target": "Serious Illnesses",
          "vi": "bệnh ung thư"
        },
        {
          "id": "i11",
          "word": "malaria",
          "target": "Serious Illnesses",
          "vi": "bệnh sốt rét"
        },
        {
          "id": "i12",
          "word": "cholera",
          "target": "Serious Illnesses",
          "vi": "bệnh tả"
        },
        {
          "id": "i13",
          "word": "asthma",
          "target": "Serious Illnesses",
          "vi": "bệnh hen suyễn"
        },
        {
          "id": "i14",
          "word": "ill",
          "target": "Serious Illnesses",
          "vi": "bị ốm nặng"
        },
        {
          "id": "i15",
          "word": "healthy diet",
          "target": "Keep Fit (Giữ dáng)",
          "vi": "chế độ ăn lành mạnh"
        },
        {
          "id": "i16",
          "word": "exercise",
          "target": "Keep Fit (Giữ dáng)",
          "vi": "tập thể dục"
        },
        {
          "id": "i17",
          "word": "swimming",
          "target": "Keep Fit (Giữ dáng)",
          "vi": "bơi lội"
        },
        {
          "id": "i18",
          "word": "jogging",
          "target": "Keep Fit (Giữ dáng)",
          "vi": "chạy bộ"
        },
        {
          "id": "i19",
          "word": "cycling",
          "target": "Keep Fit (Giữ dáng)",
          "vi": "đạp xe"
        },
        {
          "id": "i20",
          "word": "relax",
          "target": "Keep Fit (Giữ dáng)",
          "vi": "thư giãn"
        },
        {
          "id": "i21",
          "word": "stress",
          "target": "Keep Fit (Giữ dáng)",
          "vi": "căng thẳng"
        },
        {
          "id": "i22",
          "word": "fruit",
          "target": "Keep Fit (Giữ dáng)",
          "vi": "trái cây"
        },
        {
          "id": "i23",
          "word": "vegetables",
          "target": "Keep Fit (Giữ dáng)",
          "vi": "rau củ"
        },
        {
          "id": "i24",
          "word": "aspirin",
          "target": "Medical & Treatment",
          "vi": "thuốc giảm đau aspirin"
        },
        {
          "id": "i25",
          "word": "doctor",
          "target": "Medical & Treatment",
          "vi": "bác sĩ"
        },
        {
          "id": "i26",
          "word": "dentist",
          "target": "Medical & Treatment",
          "vi": "nha sĩ"
        },
        {
          "id": "i27",
          "word": "hospital",
          "type": "Danh từ",
          "target": "Medical & Treatment",
          "vi": "bệnh viện"
        },
        {
          "id": "i28",
          "word": "hot drink",
          "target": "Medical & Treatment",
          "vi": "nước uống nóng"
        },
        {
          "id": "i29",
          "word": "breathe",
          "target": "Medical & Treatment",
          "vi": "thở"
        },
        {
          "id": "i30",
          "word": "mosquito",
          "target": "Medical & Treatment",
          "vi": "con muỗi"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. If you have a head pain, you have a _____.",
        "options": [
          "stomachache",
          "toothache",
          "headache",
          "cold"
        ],
        "a": "headache"
      },
      {
        "q": "2. If your tooth hurts, you should see a _____.",
        "options": [
          "doctor",
          "dentist",
          "mechanic",
          "nurse"
        ],
        "a": "dentist"
      },
      {
        "q": "3. 'Feel sick' in British English often means _____.",
        "options": [
          "want to sleep",
          "want to vomit",
          "very happy",
          "well"
        ],
        "a": "want to vomit"
      },
      {
        "q": "4. Mosquitoes can give people _____ in hot countries.",
        "options": [
          "cholera",
          "malaria",
          "asthma",
          "cancer"
        ],
        "a": "malaria"
      },
      {
        "q": "5. Pollution and smoke can make _____ worse (difficulty breathing).",
        "options": [
          "malaria",
          "asthma",
          "hay-fever",
          "toothache"
        ],
        "a": "asthma"
      },
      {
        "q": "6. I sneeze when there is grass or flowers. I have _____.",
        "options": [
          "asthma",
          "cold",
          "hay-fever",
          "heart attack"
        ],
        "a": "hay-fever"
      },
      {
        "q": "7. Eating lots of fruit and vegetables is a healthy _____.",
        "options": [
          "exercise",
          "diet",
          "sport",
          "stress"
        ],
        "a": "diet"
      },
      {
        "q": "8. Swimming, jogging, and cycling are types of _____.",
        "options": [
          "diet",
          "exercise",
          "illness",
          "symptom"
        ],
        "a": "exercise"
      },
      {
        "q": "9. To cure a headache, you can take an _____.",
        "options": [
          "asthma",
          "aspirin",
          "apple",
          "exercise"
        ],
        "a": "aspirin"
      },
      {
        "q": "10. Bill had a _____ attack and is now in hospital.",
        "options": [
          "head",
          "tooth",
          "heart",
          "brain"
        ],
        "a": "heart"
      },
      {
        "q": "11. If you feel very ill, you must get a _____.",
        "options": [
          "dentist",
          "doctor",
          "pilot",
          "guide"
        ],
        "a": "doctor"
      },
      {
        "q": "12. Dirty water can cause a serious disease called _____.",
        "options": [
          "malaria",
          "cholera",
          "hay-fever",
          "asthma"
        ],
        "a": "cholera"
      },
      {
        "q": "13. Jogging and swimming help you to keep _____.",
        "options": [
          "sick",
          "fit",
          "stress",
          "ill"
        ],
        "a": "fit"
      },
      {
        "q": "14. What do you say when you are perfectly healthy? I am very _____.",
        "options": [
          "sick",
          "ill",
          "well",
          "bad"
        ],
        "a": "well"
      },
      {
        "q": "15. The red, painful thing on your skin from a mosquito is a mosquito _____.",
        "options": [
          "sting",
          "bite",
          "cut",
          "pain"
        ],
        "a": "bite"
      },
      {
        "q": "16. Which of the following is NOT an exercise?",
        "options": [
          "jogging",
          "swimming",
          "sleeping",
          "cycling"
        ],
        "a": "sleeping"
      },
      {
        "q": "17. Cancer is a _____ illness.",
        "options": [
          "not serious",
          "very serious",
          "funny",
          "easy"
        ],
        "a": "very serious"
      },
      {
        "q": "18. If you have too much work, you might have a lot of _____.",
        "options": [
          "exercise",
          "diet",
          "stress",
          "fitness"
        ],
        "a": "stress"
      },
      {
        "q": "19. If you got a cold, you should rest with a _____ drink.",
        "options": [
          "cold",
          "hot",
          "ice",
          "beer"
        ],
        "a": "hot"
      },
      {
        "q": "20. To breathe easily, you need fresh _____.",
        "options": [
          "water",
          "food",
          "air",
          "diet"
        ],
        "a": "air"
      }
    ],
    "typingGame": [
      {
        "q": "Head hurts: h _ _ _ _ _ _ e",
        "hint": "h e a d a c h e",
        "a": "headache"
      },
      {
        "q": "Tooth hurts: t _ _ _ _ _ _ _ e",
        "hint": "t o o t h a c h e",
        "a": "toothache"
      },
      {
        "q": "To take to reduce pain: a _ _ _ _ _ n",
        "hint": "a s p i r i n",
        "a": "aspirin"
      },
      {
        "q": "Feel like vomiting: feel ______",
        "hint": "s i c k",
        "a": "sick"
      },
      {
        "q": "Disease from mosquitoes: m _ _ _ _ _ a",
        "hint": "m a l a r i a",
        "a": "malaria"
      },
      {
        "q": "Difficulty breathing: a _ _ h _ a",
        "hint": "a s t h m a",
        "a": "asthma"
      },
      {
        "q": "Sneezing because of flowers: ______-fever",
        "hint": "h a y",
        "a": "hay"
      },
      {
        "q": "To eject air from the lungs violently: c _ _ _ h",
        "hint": "c o u g h",
        "a": "cough"
      },
      {
        "q": "To eject food from the stomach: v _ _ _ t",
        "hint": "v o m i t",
        "a": "vomit"
      },
      {
        "q": "Grandpa had a ______ attack.",
        "hint": "h e a r t",
        "a": "heart"
      },
      {
        "q": "Eating lots of veggies: healthy ______",
        "hint": "d i e t",
        "a": "diet"
      },
      {
        "q": "Running/Swimming: get ______",
        "hint": "e x e r c i s e",
        "a": "exercise"
      },
      {
        "q": "Too much work causes ______.",
        "hint": "s t r e s s",
        "a": "stress"
      },
      {
        "q": "Medical professional: d _ _ _ _ r",
        "hint": "d o c t o r",
        "a": "doctor"
      },
      {
        "q": "Teeth professional: d _ _ _ _ _ t",
        "hint": "d e n t i s t",
        "a": "dentist"
      },
      {
        "q": "A person who is sick: i _ _",
        "hint": "i l l",
        "a": "ill"
      },
      {
        "q": "I am ______ well, thanks.",
        "hint": "v e r y",
        "a": "very"
      },
      {
        "q": "Dangerous disease: c _ _ _ _ r",
        "hint": "c a n c e r",
        "a": "cancer"
      },
      {
        "q": "Disease from dirty water: c _ _ _ _ _ a",
        "hint": "c h o l e r a",
        "a": "cholera"
      },
      {
        "q": "Rest with a ______ drink when cold.",
        "hint": "h o t",
        "a": "hot"
      }
    ],
    "speaking": [
      {
        "text": "I have got a headache. Have you got an aspirin?",
        "trans": "Tôi bị đau đầu. Bạn có thuốc aspirin không?"
      },
      {
        "text": "My brother has asthma; sometimes he can't breathe.",
        "trans": "Anh trai tôi bị hen suyễn; thỉnh thoảng anh ấy không thở được."
      },
      {
        "text": "Eat lots of fruit and vegetables to keep a healthy diet.",
        "trans": "Ăn nhiều trái cây và rau củ để duy trì chế độ ăn uống lành mạnh."
      },
      {
        "text": "Grandpa had a heart attack and is in hospital.",
        "trans": "Ông nội bị một cơn đau tim và hiện đang nằm viện."
      },
      {
        "text": "Relax after work and don't have too much stress.",
        "trans": "Thư giãn sau giờ làm việc và đừng chịu quá nhiều căng thẳng."
      }
    ]
  },
  {
    "id": 34,
    "title": "Unit 34: Feelings",
    "description": "Học cách diễn đạt cảm xúc, tình cảm (love, hate, like) và các trạng thái thể chất cơ bản (happy, tired, hungry, cold).",
    "theory": [
      {
        "heading": "A. Love, like, hate (Tình cảm)",
        "items": [
          {
            "word": "love / like / don't like / hate",
            "type": "Động từ",
            "phonetic": "/lʌv/ /laɪk/ /heɪt/",
            "vi": "Yêu / Thích / Không thích / Ghét.",
            "example": "I love my family. I hate my boss. I don't like horror films."
          },
          {
            "word": "prefer",
            "type": "Động từ",
            "phonetic": "/prɪˈfɝː/",
            "vi": "Thích hơn.",
            "example": "I prefer coffee to tea (Tôi thích cà phê hơn trà)."
          },
          {
            "word": "want / hope",
            "type": "Động từ",
            "phonetic": "/wɑːnt/ /hoʊp/",
            "vi": "Muốn / Hy vọng (want + to V | hope + to V / hope + clause).",
            "example": "I want to buy a new car. I hope to do well in my exam."
          }
        ]
      },
      {
        "heading": "B. Physical feelings (Cảm giác thể chất)",
        "items": [
          {
            "word": "happy / sad / angry / surprised",
            "type": "Tính từ",
            "phonetic": "/ˈhæp.i/ /sæd/ /ˈæŋ.ɡri/",
            "vi": "Vui vẻ / Buồn bã / Tức giận / Ngạc nhiên.",
            "example": "She is happy because she won a prize. He is angry."
          },
          {
            "word": "tired / hungry / thirsty",
            "type": "Tính từ",
            "phonetic": "/taɪərd/ /ˈhʌŋ.ɡri/ /ˈθɝː.sti/",
            "vi": "Mệt mỏi / Đói bụng / Khát nước.",
            "example": "I am tired and want to sleep. I am hungry, I want a sandwich."
          },
          {
            "word": "cold / hot / well / ill",
            "type": "Tính từ",
            "phonetic": "/koʊld/ /hɑːt/ /wel/ /ɪl/",
            "vi": "Lạnh / Nóng / Khỏe / Ốm.",
            "example": "I am cold, put a sweater on. I feel ill today."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Positive Feelings",
        "Negative Feelings",
        "Physical States",
        "Verbs (Động từ)"
      ],
      "items": [
        {
          "id": "i1",
          "word": "happy",
          "target": "Positive Feelings",
          "vi": "vui vẻ"
        },
        {
          "id": "i2",
          "word": "surprised",
          "target": "Positive Feelings",
          "vi": "ngạc nhiên"
        },
        {
          "id": "i3",
          "word": "excited",
          "target": "Positive Feelings",
          "vi": "phấn khích"
        },
        {
          "id": "i4",
          "word": "cheerful",
          "target": "Positive Feelings",
          "vi": "vui tươi"
        },
        {
          "id": "i5",
          "word": "hopeful",
          "target": "Positive Feelings",
          "vi": "đầy hy vọng"
        },
        {
          "id": "i6",
          "word": "sad",
          "target": "Negative Feelings",
          "vi": "buồn bã"
        },
        {
          "id": "i7",
          "word": "angry",
          "target": "Negative Feelings",
          "vi": "tức giận"
        },
        {
          "id": "i8",
          "word": "upset",
          "target": "Negative Feelings",
          "vi": "đau lòng / buồn bực"
        },
        {
          "id": "i9",
          "word": "unhappy",
          "target": "Negative Feelings",
          "vi": "không hạnh phúc"
        },
        {
          "id": "i10",
          "word": "scared",
          "target": "Negative Feelings",
          "vi": "sợ hãi"
        },
        {
          "id": "i11",
          "word": "tired",
          "target": "Physical States",
          "vi": "mệt mỏi"
        },
        {
          "id": "i12",
          "word": "hungry",
          "target": "Physical States",
          "vi": "đói bụng"
        },
        {
          "id": "i13",
          "word": "thirsty",
          "target": "Physical States",
          "vi": "khát nước"
        },
        {
          "id": "i14",
          "word": "cold",
          "target": "Physical States",
          "vi": "lạnh"
        },
        {
          "id": "i15",
          "word": "hot",
          "target": "Physical States",
          "vi": "nóng"
        },
        {
          "id": "i16",
          "word": "well",
          "target": "Physical States",
          "vi": "khỏe"
        },
        {
          "id": "i17",
          "word": "ill",
          "target": "Physical States",
          "vi": "ốm / bệnh"
        },
        {
          "id": "i18",
          "word": "sleepy",
          "target": "Physical States",
          "vi": "buồn ngủ"
        },
        {
          "id": "i19",
          "word": "warm",
          "target": "Physical States",
          "vi": "ấm áp"
        },
        {
          "id": "i20",
          "word": "exhausted",
          "target": "Physical States",
          "vi": "kiệt sức"
        },
        {
          "id": "i21",
          "word": "love",
          "target": "Verbs (Động từ)",
          "vi": "yêu"
        },
        {
          "id": "i22",
          "word": "like",
          "target": "Verbs (Động từ)",
          "vi": "thích"
        },
        {
          "id": "i23",
          "word": "hate",
          "target": "Verbs (Động từ)",
          "vi": "ghét"
        },
        {
          "id": "i24",
          "word": "prefer",
          "target": "Verbs (Động từ)",
          "vi": "thích hơn"
        },
        {
          "id": "i25",
          "word": "want",
          "target": "Verbs (Động từ)",
          "vi": "muốn"
        },
        {
          "id": "i26",
          "word": "hope",
          "target": "Verbs (Động từ)",
          "vi": "hy vọng"
        },
        {
          "id": "i27",
          "word": "dislike",
          "target": "Verbs (Động từ)",
          "vi": "không thích"
        },
        {
          "id": "i28",
          "word": "feel",
          "target": "Verbs (Động từ)",
          "vi": "cảm thấy"
        },
        {
          "id": "i29",
          "word": "fear",
          "target": "Verbs (Động từ)",
          "vi": "sợ"
        },
        {
          "id": "i30",
          "word": "enjoy",
          "target": "Verbs (Động từ)",
          "vi": "tận hưởng"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. I want a sandwich. I am _____.",
        "options": [
          "thirsty",
          "hungry",
          "sad",
          "cold"
        ],
        "a": "hungry"
      },
      {
        "q": "2. I want a glass of water. I am _____.",
        "options": [
          "hungry",
          "thirsty",
          "hot",
          "tired"
        ],
        "a": "thirsty"
      },
      {
        "q": "3. 'I like coffee more than tea' = I _____ coffee to tea.",
        "options": [
          "love",
          "hate",
          "prefer",
          "want"
        ],
        "a": "prefer"
      },
      {
        "q": "4. Naomi won $10,000 in the lottery! She is very _____.",
        "options": [
          "angry",
          "sad",
          "surprised",
          "cold"
        ],
        "a": "surprised"
      },
      {
        "q": "5. I played tennis for three hours. I am _____.",
        "options": [
          "hungry",
          "tired",
          "happy",
          "well"
        ],
        "a": "tired"
      },
      {
        "q": "6. Which is CORRECT in grammar?",
        "options": [
          "I want my father buy a car.",
          "I want my father to buy a car.",
          "I want that my father buy a car.",
          "I want my father buying a car."
        ],
        "a": "I want my father to buy a car."
      },
      {
        "q": "7. I _____ horror films. (I don't like them at all)",
        "options": [
          "love",
          "prefer",
          "hope",
          "hate"
        ],
        "a": "hate"
      },
      {
        "q": "8. I _____ to pass my exam next week.",
        "options": [
          "hope",
          "wanting",
          "hating",
          "dislike"
        ],
        "a": "hope"
      },
      {
        "q": "9. Put a sweater on if you are _____.",
        "options": [
          "hot",
          "cold",
          "thirsty",
          "surprised"
        ],
        "a": "cold"
      },
      {
        "q": "10. In summer, you often feel _____.",
        "options": [
          "cold",
          "hot",
          "sad",
          "sleepy"
        ],
        "a": "hot"
      },
      {
        "q": "11. The opposite of 'happy' is _____.",
        "options": [
          "surprised",
          "sad",
          "well",
          "thirsty"
        ],
        "a": "sad"
      },
      {
        "q": "12. She is crying because she is very _____.",
        "options": [
          "happy",
          "upset",
          "cheerful",
          "excited"
        ],
        "a": "upset"
      },
      {
        "q": "13. I am going to bed. I am _____.",
        "options": [
          "hungry",
          "thirsty",
          "sleepy",
          "well"
        ],
        "a": "sleepy"
      },
      {
        "q": "14. A person who think only about themselves is _____.",
        "options": [
          "happy",
          "easy-going",
          "selfish",
          "kind"
        ],
        "a": "selfish"
      },
      {
        "q": "15. I _____ to visit London next summer.",
        "options": [
          "want",
          "prefer",
          "dislike",
          "angry"
        ],
        "a": "want"
      },
      {
        "q": "16. Which verb do we use with physical feelings? I _____ hot.",
        "options": [
          "have",
          "make",
          "feel",
          "do"
        ],
        "a": "feel"
      },
      {
        "q": "17. 'I don't like horror films' = I _____ horror films.",
        "options": [
          "love",
          "dislike",
          "prefer",
          "hope"
        ],
        "a": "dislike"
      },
      {
        "q": "18. She is shouting. She must be _____.",
        "options": [
          "happy",
          "sad",
          "angry",
          "tired"
        ],
        "a": "angry"
      },
      {
        "q": "19. The sun is out, it feels very _____.",
        "options": [
          "cold",
          "warm",
          "thirsty",
          "sleepy"
        ],
        "a": "warm"
      },
      {
        "q": "20. I got 10/10 in my test. I am very _____.",
        "options": [
          "sad",
          "angry",
          "happy",
          "ill"
        ],
        "a": "happy"
      }
    ],
    "typingGame": [
      {
        "q": "Want to eat: h _ _ _ r y",
        "hint": "h u n g r y",
        "a": "hungry"
      },
      {
        "q": "Want to drink: t _ _ _ s t y",
        "hint": "t h i r s t y",
        "a": "thirsty"
      },
      {
        "q": "Want to sleep: t _ _ e d",
        "hint": "t i r e d",
        "a": "tired"
      },
      {
        "q": "Opposite of cold: h _ t",
        "hint": "h o t",
        "a": "hot"
      },
      {
        "q": "Opposite of hot: c _ _ d",
        "hint": "c o l d",
        "a": "cold"
      },
      {
        "q": "Opposite of sad: h _ _ p y",
        "hint": "h a p p y",
        "a": "happy"
      },
      {
        "q": "Opposite of happy: s _ d",
        "hint": "s a d",
        "a": "sad"
      },
      {
        "q": "Like very much: l _ v e",
        "hint": "l o v e",
        "a": "love"
      },
      {
        "q": "Dislike very much: h _ t e",
        "hint": "h a t e",
        "a": "hate"
      },
      {
        "q": "Thích hơn: p _ _ f _ r",
        "hint": "p r e f e r",
        "a": "prefer"
      },
      {
        "q": "Muốn: w _ n t",
        "hint": "w a n t",
        "a": "want"
      },
      {
        "q": "Hy vọng: h _ p e",
        "hint": "h o p e",
        "a": "hope"
      },
      {
        "q": "Tức giận: a _ _ r y",
        "hint": "a n g r y",
        "a": "angry"
      },
      {
        "q": "Ngạc nhiên: s _ _ p _ _ s e d",
        "hint": "s u r p r i s e d",
        "a": "surprised"
      },
      {
        "q": "Buồn bực/đau lòng: u _ s _ t",
        "hint": "u p s e t",
        "a": "upset"
      },
      {
        "q": "Buồn ngủ: s _ _ e p y",
        "hint": "s l e e p y",
        "a": "sleepy"
      },
      {
        "q": "Ấm áp: w _ r m",
        "hint": "w a r m",
        "a": "warm"
      },
      {
        "q": "Cảm thấy: f _ e l",
        "hint": "f e e l",
        "a": "feel"
      },
      {
        "q": "Thích: l _ k e",
        "hint": "l i k e",
        "a": "like"
      },
      {
        "q": "Không thích: d _ s l _ k e",
        "hint": "d i s l i k e",
        "a": "dislike"
      }
    ],
    "speaking": [
      {
        "text": "I am hungry. I want a sandwich.",
        "trans": "Tôi đói bụng. Tôi muốn một chiếc bánh mì kẹp."
      },
      {
        "text": "I prefer coffee to tea.",
        "trans": "Tôi thích cà phê hơn trà."
      },
      {
        "text": "I hope to do well in my exam.",
        "trans": "Tôi hy vọng sẽ làm bài thi tốt."
      },
      {
        "text": "She is happy because she won a prize.",
        "trans": "Cô ấy vui mừng vì vừa đoạt được giải thưởng."
      },
      {
        "text": "I am cold, put a sweater on.",
        "trans": "Tôi lạnh, hãy mặc một chiếc áo len vào."
      }
    ]
  },
  {
    "id": 35,
    "title": "Unit 35: Greetings and other useful phrases",
    "description": "Học các câu chào hỏi thường ngày, câu chúc mừng trong các dịp đặc biệt, cách giao tiếp lịch sự (Please, Thank you, Cheers).",
    "theory": [
      {
        "heading": "A. Greetings (Chào hỏi thường ngày)",
        "items": [
          {
            "word": "Good morning / afternoon / evening",
            "type": "Chào hỏi",
            "phonetic": "morning: /ˈmɔːnɪŋ/ | afternoon: /ˌɑːftəˈnuːn/ | evening: /ˈiːvnɪŋ/",
            "vi": "Chào buổi sáng / chiều / tối.",
            "example": "Good morning, how are you today?"
          },
          {
            "word": "Hello / Hi",
            "type": "Chào hỏi",
            "phonetic": "Hello: /həˈləʊ/ | Hi: /haɪ/",
            "vi": "Xin chào (thân mật).",
            "example": "Hi! How are you?"
          },
          {
            "word": "Goodbye / See you soon",
            "type": "Chào hỏi",
            "phonetic": "Goodbye: /ˌɡʊdˈbaɪ/ | See you soon: /siː juː suːn/",
            "vi": "Tạm biệt / Hẹn gặp lại sớm.",
            "example": "Goodbye! Have a good journey."
          },
          {
            "word": "Goodnight / Sleep well",
            "type": "Chào hỏi",
            "phonetic": "Goodnight: /ˌɡʊdˈnaɪt/ | Sleep well: /sliːp wel/",
            "vi": "Chúc ngủ ngon / Ngủ ngon nhé.",
            "example": "Goodnight! Sleep well."
          }
        ]
      },
      {
        "heading": "B. Polite phrases (Giao tiếp lịch sự)",
        "items": [
          {
            "word": "Please / Thank you",
            "type": "Lịch sự",
            "phonetic": "Please: /pliːz/ | Thank you: /ˈθæŋk juː/",
            "vi": "Vui lòng / Cảm ơn.",
            "example": "Can I have a coffee, please? Thank you very much."
          },
          {
            "word": "Excuse me",
            "type": "Lịch sự",
            "phonetic": "/ɪkˈskjuːz miː/",
            "vi": "Xin lỗi (khi muốn thu hút chú ý hoặc chen qua đám đông).",
            "example": "Excuse me! Can I get past?"
          },
          {
            "word": "Sorry",
            "type": "Lịch sự",
            "phonetic": "/ˈsɒri/",
            "vi": "Xin lỗi (khi mắc lỗi hoặc vô tình va phải ai).",
            "example": "I'm sorry I'm late. Oh, sorry!"
          },
          {
            "word": "Bless you!",
            "type": "Lịch sự",
            "phonetic": "/bles juː/",
            "vi": "Chúc sức khỏe! (Nói khi có ai đó hắt hơi).",
            "example": "Atchoo! - Bless you!"
          },
          {
            "word": "Cheers!",
            "type": "Lịch sự",
            "phonetic": "/tʃɪəz/",
            "vi": "Nâng ly! / Cụng ly! / Cảm ơn!",
            "example": "Here is your beer. - Cheers!"
          }
        ]
      },
      {
        "heading": "C. Special days (Các dịp đặc biệt)",
        "items": [
          {
            "word": "Happy Birthday",
            "type": "Dịp đặc biệt",
            "phonetic": "/ˈhæpi ˈbɜːθdeɪ/",
            "vi": "Chúc mừng sinh nhật (KHÔNG dùng Congratulations).",
            "example": "Happy Birthday to you!"
          },
          {
            "word": "Happy New Year / Merry Christmas",
            "type": "Dịp đặc biệt",
            "phonetic": "New Year: /njuː jɪə/ | Christmas: /ˌmeri ˈkrɪsməs/",
            "vi": "Chúc mừng năm mới / Giáng sinh vui vẻ.",
            "example": "Happy New Year! Merry Christmas!"
          },
          {
            "word": "Good luck",
            "type": "Dịp đặc biệt",
            "phonetic": "/ɡʊd lʌk/",
            "vi": "Chúc may mắn (trước kỳ thi hoặc phỏng vấn).",
            "example": "Good luck in your driving test!"
          },
          {
            "word": "Congratulations! / Well done!",
            "type": "Dịp đặc biệt",
            "phonetic": "Congratulations: /kənˌɡrætʃuˈleɪʃnz/ | Well done: /wel dʌn/",
            "vi": "Chúc mừng! / Làm tốt lắm! (khi ai đó đỗ kỳ thi, sinh em bé...).",
            "example": "I passed my exam! - Congratulations!"
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Greetings (Chào hỏi)",
        "Polite Words (Lịch sự)",
        "Special Occasions",
        "Responses & Others"
      ],
      "items": [
        {
          "id": "i1",
          "word": "Good morning",
          "target": "Greetings (Chào hỏi)",
          "vi": "chào buổi sáng"
        },
        {
          "id": "i2",
          "word": "Good afternoon",
          "target": "Greetings (Chào hỏi)",
          "vi": "chào buổi chiều"
        },
        {
          "id": "i3",
          "word": "Good evening",
          "target": "Greetings (Chào hỏi)",
          "vi": "chào buổi tối"
        },
        {
          "id": "i4",
          "word": "Goodnight",
          "target": "Greetings (Chào hỏi)",
          "vi": "chúc ngủ ngon"
        },
        {
          "id": "i5",
          "word": "Hello",
          "target": "Greetings (Chào hỏi)",
          "vi": "xin chào"
        },
        {
          "id": "i6",
          "word": "Hi",
          "target": "Greetings (Chào hỏi)",
          "vi": "chào"
        },
        {
          "id": "i7",
          "word": "Goodbye",
          "target": "Greetings (Chào hỏi)",
          "vi": "tạm biệt"
        },
        {
          "id": "i8",
          "word": "See you soon",
          "target": "Greetings (Chào hỏi)",
          "vi": "hẹn gặp lại sớm"
        },
        {
          "id": "i9",
          "word": "Bye",
          "target": "Greetings (Chào hỏi)",
          "vi": "tạm biệt (ngắn)"
        },
        {
          "id": "i10",
          "word": "Please",
          "target": "Polite Words (Lịch sự)",
          "vi": "vui lòng"
        },
        {
          "id": "i11",
          "word": "Thank you",
          "target": "Polite Words (Lịch sự)",
          "vi": "cảm ơn"
        },
        {
          "id": "i12",
          "word": "Excuse me",
          "target": "Polite Words (Lịch sự)",
          "vi": "xin lỗi (thu hút chú ý)"
        },
        {
          "id": "i13",
          "word": "Sorry",
          "target": "Polite Words (Lịch sự)",
          "vi": "xin lỗi (khi làm sai)"
        },
        {
          "id": "i14",
          "word": "Bless you",
          "target": "Polite Words (Lịch sự)",
          "vi": "chúc sức khỏe (khi hắt hơi)"
        },
        {
          "id": "i15",
          "word": "Cheers",
          "target": "Polite Words (Lịch sự)",
          "vi": "nâng ly / cụng ly"
        },
        {
          "id": "i16",
          "word": "Happy Birthday",
          "target": "Special Occasions",
          "vi": "chúc mừng sinh nhật"
        },
        {
          "id": "i17",
          "word": "Merry Christmas",
          "target": "Special Occasions",
          "vi": "giáng sinh vui vẻ"
        },
        {
          "id": "i18",
          "word": "Happy New Year",
          "target": "Special Occasions",
          "vi": "chúc mừng năm mới"
        },
        {
          "id": "i19",
          "word": "Congratulations",
          "target": "Special Occasions",
          "vi": "xin chúc mừng"
        },
        {
          "id": "i20",
          "word": "Good luck",
          "target": "Special Occasions",
          "vi": "chúc may mắn"
        },
        {
          "id": "i21",
          "word": "Well done",
          "target": "Special Occasions",
          "vi": "làm tốt lắm"
        },
        {
          "id": "i22",
          "word": "Sleep well",
          "target": "Greetings (Chào hỏi)",
          "vi": "ngủ ngon nhé"
        },
        {
          "id": "i23",
          "word": "Fine, thanks",
          "target": "Responses & Others",
          "vi": "tôi ổn, cảm ơn"
        },
        {
          "id": "i24",
          "word": "Not too bad",
          "target": "Responses & Others",
          "vi": "không tệ lắm"
        },
        {
          "id": "i25",
          "word": "Same to you",
          "target": "Responses & Others",
          "vi": "bạn cũng thế nhé"
        },
        {
          "id": "i26",
          "word": "Nice day",
          "target": "Responses & Others",
          "vi": "ngày tốt lành"
        },
        {
          "id": "i27",
          "word": "Passed exam",
          "target": "Responses & Others",
          "vi": "đỗ kỳ thi"
        },
        {
          "id": "i28",
          "word": "Sneezes",
          "target": "Responses & Others",
          "vi": "hắt hơi"
        },
        {
          "id": "i29",
          "word": "Get past",
          "target": "Responses & Others",
          "vi": "đi qua"
        },
        {
          "id": "i30",
          "word": "Welcome",
          "target": "Responses & Others",
          "vi": "không có gì / chào mừng"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. (Someone sneezes: Atchoo!) You should say: _____",
        "options": [
          "Congratulations!",
          "Good luck!",
          "Bless you!",
          "Cheers!"
        ],
        "a": "Bless you!"
      },
      {
        "q": "2. Today is Naomi's birthday. You should say: _____",
        "options": [
          "Congratulations!",
          "Happy Birthday!",
          "Well done!",
          "Cheers!"
        ],
        "a": "Happy Birthday!"
      },
      {
        "q": "3. Your friend is taking a difficult exam tomorrow. You say: _____",
        "options": [
          "Congratulations!",
          "Good luck!",
          "Bless you!",
          "Excuse me!"
        ],
        "a": "Good luck!"
      },
      {
        "q": "4. Your friend just passed their driving test. You say: _____",
        "options": [
          "Good luck!",
          "Happy Birthday!",
          "Congratulations!",
          "Bless you!"
        ],
        "a": "Congratulations!"
      },
      {
        "q": "5. (In a pub, raising glasses of beer) You say: _____",
        "options": [
          "Please!",
          "Cheers!",
          "Bless you!",
          "Excuse me!"
        ],
        "a": "Cheers!"
      },
      {
        "q": "6. You want to ask a stranger for directions. You start with: _____",
        "options": [
          "Sorry!",
          "Bless you!",
          "Excuse me!",
          "Goodbye!"
        ],
        "a": "Excuse me!"
      },
      {
        "q": "7. You step on someone's foot by accident. You say: _____",
        "options": [
          "Excuse me!",
          "Atchoo!",
          "Sorry!",
          "Cheers!"
        ],
        "a": "Sorry!"
      },
      {
        "q": "8. When someone goes to bed, you say: 'Goodnight, _____ well'.",
        "options": [
          "sleep",
          "go",
          "dream",
          "eat"
        ],
        "a": "sleep"
      },
      {
        "q": "9. Can I have a black coffee, _____?",
        "options": [
          "thanks",
          "please",
          "sorry",
          "excuse"
        ],
        "a": "please"
      },
      {
        "q": "10. 'I passed my exam!' - '_____ done!'",
        "options": [
          "Good",
          "Happy",
          "Well",
          "Nice"
        ],
        "a": "Well"
      },
      {
        "q": "11. 'Merry Christmas!' - '_____ to you!'",
        "options": [
          "Well done",
          "Same",
          "Cheers",
          "Congratulations"
        ],
        "a": "Same"
      },
      {
        "q": "12. In the afternoon, you greet someone with: Good _____.",
        "options": [
          "morning",
          "afternoon",
          "evening",
          "night"
        ],
        "a": "afternoon"
      },
      {
        "q": "13. In the evening, you greet someone with: Good _____.",
        "options": [
          "morning",
          "afternoon",
          "evening",
          "night"
        ],
        "a": "evening"
      },
      {
        "q": "14. 'How are you?' - 'Fine, _____.'",
        "options": [
          "thanks",
          "please",
          "excuse",
          "sorry"
        ],
        "a": "thanks"
      },
      {
        "q": "15. 'How are you?' - 'Not too _____.' (meaning okay)",
        "options": [
          "good",
          "bad",
          "well",
          "fine"
        ],
        "a": "bad"
      },
      {
        "q": "16. Which phrase is NOT for greeting?",
        "options": [
          "Hello",
          "Good morning",
          "Goodbye",
          "Hi"
        ],
        "a": "Goodbye"
      },
      {
        "q": "17. What do you say on December 25th?",
        "options": [
          "Happy New Year",
          "Merry Christmas",
          "Happy Birthday",
          "Good luck"
        ],
        "a": "Merry Christmas"
      },
      {
        "q": "18. What do you say on January 1st?",
        "options": [
          "Happy New Year",
          "Merry Christmas",
          "Happy Birthday",
          "Congratulations"
        ],
        "a": "Happy New Year"
      },
      {
        "q": "19. Which phrase is used to accept a drink? _____, please.",
        "options": [
          "Sorry",
          "Yes",
          "Cheers",
          "Atchoo"
        ],
        "a": "Yes"
      },
      {
        "q": "20. 'Here is your tea.' - 'Thank _____.'",
        "options": [
          "your",
          "you",
          "please",
          "much"
        ],
        "a": "you"
      }
    ],
    "typingGame": [
      {
        "q": "Chào buổi sáng: Good ______",
        "hint": "m o r n i n g",
        "a": "morning"
      },
      {
        "q": "Chào buổi chiều: Good ______",
        "hint": "a f t e r n o o n",
        "a": "afternoon"
      },
      {
        "q": "Chào buổi tối: Good ______",
        "hint": "e v e n i n g",
        "a": "evening"
      },
      {
        "q": "Chúc ngủ ngon: G _ _ d n _ _ h t",
        "hint": "g o o d n i g h t",
        "a": "goodnight"
      },
      {
        "q": "Vui lòng: p _ _ _ s e",
        "hint": "p l e a s e",
        "a": "please"
      },
      {
        "q": "Xin lỗi (thu hút chú ý): E _ _ _ s e me",
        "hint": "e x c u s e",
        "a": "excuse"
      },
      {
        "q": "Xin lỗi (khi va phải ai): S _ _ r y",
        "hint": "s o r r y",
        "a": "sorry"
      },
      {
        "q": "Chúc sức khỏe (khi hắt hơi): B _ _ s s you",
        "hint": "b l e s s",
        "a": "bless"
      },
      {
        "q": "Nâng ly cụng ly: C _ _ _ r s",
        "hint": "c h e e r s",
        "a": "cheers"
      },
      {
        "q": "Chúc mừng sinh nhật: Happy ______",
        "hint": "b i r t h d a y",
        "a": "birthday"
      },
      {
        "q": "Giáng sinh vui vẻ: Merry ______",
        "hint": "c h r i s t m a s",
        "a": "christmas"
      },
      {
        "q": "Chúc mừng năm mới: Happy New ______",
        "hint": "y e a r",
        "a": "year"
      },
      {
        "q": "Chúc may mắn: Good ______",
        "hint": "l u c k",
        "a": "luck"
      },
      {
        "q": "Xin chúc mừng (khi đỗ xe/sinh con): C _ _ _ r a t _ _ a t _ _ n s",
        "hint": "c o n g r a t u l a t i o n s",
        "a": "congratulations"
      },
      {
        "q": "Làm tốt lắm: ______ done",
        "hint": "w e l l",
        "a": "well"
      },
      {
        "q": "Tạm biệt: G _ _ d b _ e",
        "hint": "g o o d b y e",
        "a": "goodbye"
      },
      {
        "q": "Hẹn gặp lại sớm: See you ______",
        "hint": "s o o n",
        "a": "soon"
      },
      {
        "q": "Ngủ ngon nhé: Sleep ______",
        "hint": "w e l l",
        "a": "well"
      },
      {
        "q": "Tôi ổn, cảm ơn: Fine, ______",
        "hint": "t h a n k s",
        "a": "thanks"
      },
      {
        "q": "Cảm ơn bạn: Thank ______",
        "hint": "y o u",
        "a": "you"
      }
    ],
    "speaking": [
      {
        "text": "Good morning! How are you today? - Fine, thanks.",
        "trans": "Chào buổi sáng! Hôm nay bạn thế nào? - Tôi khỏe, cảm ơn."
      },
      {
        "text": "Excuse me, can I get past please? - Oh, sorry!",
        "trans": "Xin lỗi, cho tôi đi qua được không? - Ôi, xin lỗi!"
      },
      {
        "text": "Good luck in your driving test today! - Thank you!",
        "trans": "Chúc bạn may mắn trong kỳ thi sát hạch lái xe hôm nay! - Cảm ơn bạn!"
      },
      {
        "text": "I passed my university exam! - Congratulations! Well done!",
        "trans": "Tôi đã đỗ kỳ thi đại học rồi! - Xin chúc mừng! Làm tốt lắm!"
      },
      {
        "text": "Merry Christmas and a Happy New Year to you!",
        "trans": "Chúc bạn một Giáng sinh an lành và một năm mới hạnh phúc!"
      }
    ]
  },
  {
    "id": 36,
    "title": "Unit 36: Countries, languages and people",
    "description": "Học từ vựng về các châu lục, quốc gia, quốc tịch và ngôn ngữ trên thế giới. Lưu ý quy tắc viết hoa chữ cái đầu tiên.",
    "theory": [
      {
        "heading": "A. The Continents (Các châu lục)",
        "items": [
          {
            "word": "Europe / Asia / Africa",
            "type": "Châu lục",
            "phonetic": "/ˈjʊr.əp/ /ˈeɪ.ʒə/ /ˈæf.rɪ.kə/",
            "vi": "Châu Âu / Châu Á / Châu Phi.",
            "example": "Germany is in Europe. Vietnam is in Asia."
          },
          {
            "word": "North America / South America / Australia",
            "type": "Châu lục",
            "phonetic": "North America: /nɔːθ əˈmerɪkə/ | South America: /saʊθ əˈmerɪkə/ | Australia: /ɒˈstreɪliə/",
            "vi": "Bắc Mỹ / Nam Mỹ / Châu Úc (Australia).",
            "example": "The USA is in North America. Brazil is in South America."
          }
        ]
      },
      {
        "heading": "B. Countries, People and Languages (Quốc gia, Con người và Ngôn ngữ)",
        "items": [
          {
            "word": "capital letters",
            "type": "Quy tắc",
            "phonetic": "/ˈkæpɪtl ˈletəz/",
            "vi": "Chữ hoa (Mọi từ chỉ châu lục, đất nước, quốc tịch, ngôn ngữ LUÔN viết hoa chữ cái đầu tiên).",
            "example": "Japan [KHÔNG DÙNG: japan], Japanese [KHÔNG DÙNG: japanese]."
          },
          {
            "word": "adjective endings",
            "type": "Ngữ pháp",
            "phonetic": "/ˈædʒɪktɪv ˈendɪŋz/",
            "vi": "Đuôi tính từ chỉ người/ngôn ngữ: -an (German, American, Korean), -ish (British, English, Spanish), -ese (Chinese, Japanese, Vietnamese).",
            "example": "He is Vietnamese. He speaks Vietnamese."
          },
          {
            "word": "exceptions",
            "type": "Từ vựng",
            "phonetic": "/ɪkˈsepʃnz/",
            "vi": "Các trường hợp bất quy tắc: French (từ France), Dutch (từ Holland), Greek (từ Greece), Swiss (từ Switzerland).",
            "example": "Athens is the capital of Greece. The Greeks speak Greek."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Continents (Châu lục)",
        "Countries (Quốc gia)",
        "Nationalities (-an/-ish)",
        "Nationalities (-ese/Exceptions)"
      ],
      "items": [
        {
          "id": "i1",
          "word": "Europe",
          "target": "Continents (Châu lục)",
          "vi": "châu Âu"
        },
        {
          "id": "i2",
          "word": "Asia",
          "target": "Continents (Châu lục)",
          "vi": "châu Á"
        },
        {
          "id": "i3",
          "word": "Africa",
          "target": "Continents (Châu lục)",
          "vi": "châu Phi"
        },
        {
          "id": "i4",
          "word": "North America",
          "target": "Continents (Châu lục)",
          "vi": "Bắc Mỹ"
        },
        {
          "id": "i5",
          "word": "South America",
          "target": "Continents (Châu lục)",
          "vi": "Nam Mỹ"
        },
        {
          "id": "i6",
          "word": "Australia",
          "target": "Continents (Châu lục)",
          "vi": "châu Úc"
        },
        {
          "id": "i7",
          "word": "Germany",
          "target": "Countries (Quốc gia)",
          "vi": "nước Đức"
        },
        {
          "id": "i8",
          "word": "Japan",
          "target": "Countries (Quốc gia)",
          "vi": "nước Nhật"
        },
        {
          "id": "i9",
          "word": "Vietnam",
          "target": "Countries (Quốc gia)",
          "vi": "nước Việt Nam"
        },
        {
          "id": "i10",
          "word": "France",
          "target": "Countries (Quốc gia)",
          "vi": "nước Pháp"
        },
        {
          "id": "i11",
          "word": "Spain",
          "target": "Countries (Quốc gia)",
          "vi": "nước Tây Ban Nha"
        },
        {
          "id": "i12",
          "word": "Brazil",
          "target": "Countries (Quốc gia)",
          "vi": "nước Brazil"
        },
        {
          "id": "i13",
          "word": "China",
          "target": "Countries (Quốc gia)",
          "vi": "nước Trung Quốc"
        },
        {
          "id": "i14",
          "word": "Greece",
          "target": "Countries (Quốc gia)",
          "vi": "nước Hy Lạp"
        },
        {
          "id": "i15",
          "word": "Switzerland",
          "target": "Countries (Quốc gia)",
          "vi": "nước Thụy Sĩ"
        },
        {
          "id": "i16",
          "word": "German",
          "target": "Nationalities (-an/-ish)",
          "vi": "người/tiếng Đức"
        },
        {
          "id": "i17",
          "word": "American",
          "target": "Nationalities (-an/-ish)",
          "vi": "người Mỹ"
        },
        {
          "id": "i18",
          "word": "Korean",
          "target": "Nationalities (-an/-ish)",
          "vi": "người/tiếng Hàn"
        },
        {
          "id": "i19",
          "word": "Spanish",
          "target": "Nationalities (-an/-ish)",
          "vi": "người/tiếng Tây Ban Nha"
        },
        {
          "id": "i20",
          "word": "British",
          "target": "Nationalities (-an/-ish)",
          "vi": "người Anh Quốc"
        },
        {
          "id": "i21",
          "word": "English",
          "target": "Nationalities (-an/-ish)",
          "vi": "người/tiếng Anh"
        },
        {
          "id": "i22",
          "word": "Vietnamese",
          "target": "Nationalities (-ese/Exceptions)",
          "vi": "người/tiếng Việt"
        },
        {
          "id": "i23",
          "word": "Japanese",
          "target": "Nationalities (-ese/Exceptions)",
          "vi": "người/tiếng Nhật"
        },
        {
          "id": "i24",
          "word": "Chinese",
          "target": "Nationalities (-ese/Exceptions)",
          "vi": "người/tiếng Trung"
        },
        {
          "id": "i25",
          "word": "French",
          "target": "Nationalities (-ese/Exceptions)",
          "vi": "người/tiếng Pháp"
        },
        {
          "id": "i26",
          "word": "Dutch",
          "target": "Nationalities (-ese/Exceptions)",
          "vi": "người/tiếng Hà Lan"
        },
        {
          "id": "i27",
          "word": "Swiss",
          "target": "Nationalities (-ese/Exceptions)",
          "vi": "người Thụy Sĩ"
        },
        {
          "id": "i28",
          "word": "Greek",
          "target": "Nationalities (-ese/Exceptions)",
          "vi": "người/tiếng Hy Lạp"
        },
        {
          "id": "i29",
          "word": "Italian",
          "target": "Nationalities (-an/-ish)",
          "vi": "người/tiếng Ý"
        },
        {
          "id": "i30",
          "word": "Russian",
          "target": "Nationalities (-an/-ish)",
          "vi": "người/tiếng Nga"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. Germany, France and Spain are in _____.",
        "options": [
          "Asia",
          "Africa",
          "Europe",
          "Australia"
        ],
        "a": "Europe"
      },
      {
        "q": "2. Vietnam, Japan and Korea are in _____.",
        "options": [
          "Europe",
          "Asia",
          "South America",
          "North America"
        ],
        "a": "Asia"
      },
      {
        "q": "3. Brazil and Argentina are in _____.",
        "options": [
          "Europe",
          "Asia",
          "South America",
          "Africa"
        ],
        "a": "South America"
      },
      {
        "q": "4. Athens is the capital of Greece. The people are _____.",
        "options": [
          "Greens",
          "Greeks",
          "Greeces",
          "Greekish"
        ],
        "a": "Greeks"
      },
      {
        "q": "5. He comes from Switzerland. He is _____.",
        "options": [
          "Swiss",
          "Switzerlander",
          "Swisser",
          "Swissian"
        ],
        "a": "Swiss"
      },
      {
        "q": "6. The people of France speak _____.",
        "options": [
          "France",
          "French",
          "Frenchish",
          "Francian"
        ],
        "a": "French"
      },
      {
        "q": "7. The people of Holland (The Netherlands) are _____.",
        "options": [
          "Hollanders",
          "Dutch",
          "Dutches",
          "Netherlanders"
        ],
        "a": "Dutch"
      },
      {
        "q": "8. Which is CORRECT in capitalization?",
        "options": [
          "I speak japanese.",
          "I speak Japanese.",
          "i speak Japanese.",
          "I speak Japanesey."
        ],
        "a": "I speak Japanese."
      },
      {
        "q": "9. People from South Korea are _____.",
        "options": [
          "Koreese",
          "Koreanish",
          "Korean",
          "Koreans"
        ],
        "a": "Korean"
      },
      {
        "q": "10. Berlin is the capital of _____.",
        "options": [
          "Germany",
          "German",
          "Dutch",
          "Switzerland"
        ],
        "a": "Germany"
      },
      {
        "q": "11. 'He is from Spain' = He is _____.",
        "options": [
          "Spainish",
          "Spanish",
          "Spaniard",
          "Spained"
        ],
        "a": "Spanish"
      },
      {
        "q": "12. In which continent is Egypt?",
        "options": [
          "Asia",
          "Africa",
          "Europe",
          "North America"
        ],
        "a": "Africa"
      },
      {
        "q": "13. In which continent is the USA?",
        "options": [
          "Europe",
          "South America",
          "North America",
          "Asia"
        ],
        "a": "North America"
      },
      {
        "q": "14. Tokyo is the capital of _____.",
        "options": [
          "China",
          "Korea",
          "Japan",
          "Vietnam"
        ],
        "a": "Japan"
      },
      {
        "q": "15. The language of Brazil is _____.",
        "options": [
          "Brazilian",
          "Spanish",
          "Portuguese",
          "Dutch"
        ],
        "a": "Portuguese"
      },
      {
        "q": "16. Amsterdam is the capital of _____.",
        "options": [
          "Switzerland",
          "Holland (The Netherlands)",
          "Germany",
          "Sweden"
        ],
        "a": "Holland (The Netherlands)"
      },
      {
        "q": "17. Rome is the capital of _____.",
        "options": [
          "Spain",
          "France",
          "Italy",
          "Greece"
        ],
        "a": "Italy"
      },
      {
        "q": "18. People from China speak _____.",
        "options": [
          "Chinian",
          "Chinese",
          "Chinish",
          "Chinesey"
        ],
        "a": "Chinese"
      },
      {
        "q": "19. The adjective for 'Sweden' is _____.",
        "options": [
          "Swedenish",
          "Swedish",
          "Sweden",
          "Swede"
        ],
        "a": "Swedish"
      },
      {
        "q": "20. The adjective for 'Vietnam' is _____.",
        "options": [
          "Vietnamese",
          "Vietnamish",
          "Vietnaman",
          "Vietnameseish"
        ],
        "a": "Vietnamese"
      }
    ],
    "typingGame": [
      {
        "q": "Châu Âu: E _ _ _ p e",
        "hint": "E u r o p e",
        "a": "Europe"
      },
      {
        "q": "Châu Á: A _ _ a",
        "hint": "A s i a",
        "a": "Asia"
      },
      {
        "q": "Châu Phi: A _ _ _ c a",
        "hint": "A f r i c a",
        "a": "Africa"
      },
      {
        "q": "Nước Đức: G _ _ _ _ n y",
        "hint": "G e r m a n y",
        "a": "Germany"
      },
      {
        "q": "Nước Nhật: J _ _ _ n",
        "hint": "J a p a n",
        "a": "Japan"
      },
      {
        "q": "Nước Pháp: F _ _ _ c e",
        "hint": "F r a n c e",
        "a": "France"
      },
      {
        "q": "Nước Tây Ban Nha: S _ _ _ n",
        "hint": "S p a i n",
        "a": "Spain"
      },
      {
        "q": "Nước Trung Quốc: C _ _ _ a",
        "hint": "C h i n a",
        "a": "China"
      },
      {
        "q": "Nước Thụy Sĩ: S _ _ t _ _ r _ _ n d",
        "hint": "S w i t z e r l a n d",
        "a": "Switzerland"
      },
      {
        "q": "Nước Hy Lạp: G _ _ _ c e",
        "hint": "G r e e c e",
        "a": "Greece"
      },
      {
        "q": "Người Việt Nam: V _ _ t _ _ _ _ s e",
        "hint": "V i e t n a m e s e",
        "a": "Vietnamese"
      },
      {
        "q": "Người Nhật Bản: J _ _ _ n _ s e",
        "hint": "J a p a n e s e",
        "a": "Japanese"
      },
      {
        "q": "Người Trung Quốc: C _ _ n _ s e",
        "hint": "C h i n e s e",
        "a": "Chinese"
      },
      {
        "q": "Người Mỹ: A _ _ _ i _ a n",
        "hint": "A m e r i c a n",
        "a": "American"
      },
      {
        "q": "Người Tây Ban Nha: S _ _ n _ s h",
        "hint": "S p a n i s h",
        "a": "Spanish"
      },
      {
        "q": "Người Pháp: F _ _ n c h",
        "hint": "F r e n c h",
        "a": "French"
      },
      {
        "q": "Người Thụy Sĩ: S _ _ s s",
        "hint": "S w i s s",
        "a": "Swiss"
      },
      {
        "q": "Người Hy Lạp: G _ _ e k",
        "hint": "G r e e k",
        "a": "Greek"
      },
      {
        "q": "Người Hà Lan: D _ t c h",
        "hint": "D u t c h",
        "a": "Dutch"
      },
      {
        "q": "Người Thụy Điển: S _ _ d _ s h",
        "hint": "S w e d i s h",
        "a": "Swedish"
      }
    ],
    "speaking": [
      {
        "text": "Germany and France are in Europe, but Vietnam and Japan are in Asia.",
        "trans": "Nước Đức và nước Pháp nằm ở châu Âu, nhưng Việt Nam và Nhật Bản nằm ở châu Á."
      },
      {
        "text": "Athens is the capital of Greece. The Greeks speak Greek.",
        "trans": "Athens là thủ đô của Hy Lạp. Người Hy Lạp nói tiếng Hy Lạp."
      },
      {
        "text": "He comes from Switzerland, so he is Swiss and speaks Swiss-German.",
        "trans": "Anh ấy đến từ Thụy Sĩ, vì vậy anh ấy là người Thụy Sĩ và nói tiếng Đức-Thụy Sĩ."
      },
      {
        "text": "Naomi speaks Japanese fluently because she lived in Japan.",
        "trans": "Naomi nói tiếng Nhật rất trôi chảy vì cô ấy từng sống ở Nhật Bản."
      },
      {
        "text": "All names of countries and languages must start with capital letters.",
        "trans": "Mọi tên quốc gia và ngôn ngữ đều phải bắt đầu bằng chữ hoa."
      }
    ]
  },
  {
    "id": 37,
    "title": "Unit 37: Weather",
    "description": "Học cách hỏi và miêu tả thời tiết hằng ngày (nắng, mưa, mây, tuyết), sự khác biệt giữa danh từ và tính từ thời tiết, các trạng thái nhiệt độ.",
    "theory": [
      {
        "heading": "A. Types of weather (Các hiện tượng thời tiết)",
        "items": [
          {
            "word": "sun / rain / wind / cloud",
            "type": "Danh từ",
            "phonetic": "/sʌn/ /reɪn/ /wɪnd/ /klaʊd/",
            "vi": "Mặt trời / Cơn mưa / Gió / Đám mây.",
            "example": "The sun is shining. Rain is falling."
          },
          {
            "word": "snow / fog / thunder / lightning",
            "type": "Danh từ",
            "phonetic": "snow: /snəʊ/ | fog: /fɒɡ/ | thunder: /ˈθʌndə/ | lightning: /ˈlaɪtnɪŋ/",
            "vi": "Tuyết / Sương mù / Sấm / Sét.",
            "example": "Look at the lightning in the sky!"
          }
        ]
      },
      {
        "heading": "B. Nouns and Adjectives (Danh từ và Tính từ thời tiết)",
        "items": [
          {
            "word": "sunny / rainy / windy",
            "type": "Tính từ",
            "phonetic": "sunny: /ˈsʌni/ | rainy: /ˈreɪni/ | windy: /ˈwɪndi/",
            "vi": "Có nắng / Có mưa / Có gió (Thêm '-y' vào sau danh từ).",
            "example": "It is a sunny day in Tokyo. Today it is very windy."
          },
          {
            "word": "cloudy / snowy / foggy",
            "type": "Tính từ",
            "phonetic": "cloudy: /ˈklaʊdi/ | snowy: /ˈsnəʊi/ | foggy: /ˈfɒɡi/",
            "vi": "Nhiều mây / Có tuyết / Nhiều sương mù (Gấp đôi phụ âm cuối trước khi thêm '-y' đối với fog -> foggy, sun -> sunny).",
            "example": "It's cloudy in London. Drive slowly because it is foggy."
          }
        ]
      },
      {
        "heading": "C. Temperature & Other words (Nhiệt độ)",
        "items": [
          {
            "word": "hot / warm / cool / cold",
            "type": "Tính từ",
            "phonetic": "hot: /hɒt/ | warm: /wɔːm/ | cool: /kuːl/ | cold: /kəʊld/",
            "vi": "Nóng / Ấm áp / Mát mẻ / Lạnh.",
            "example": "It is very hot in Mexico today (35 degrees). It is cold in the Arctic."
          },
          {
            "word": "storm / hurricane / thunderstorm",
            "type": "Danh từ",
            "phonetic": "storm: /stɔːm/ | hurricane: /ˈhʌrɪkən/ | thunderstorm: /ˈθʌndəstɔːm/",
            "vi": "Bão / Cuồng phong / Bão kèm sấm chớp.",
            "example": "A hurricane is a very strong wind. We had a thunderstorm last night."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Weather Nouns (Danh từ)",
        "Weather Adjectives",
        "Temperature (Nhiệt độ)",
        "Storms & Disasters"
      ],
      "items": [
        {
          "id": "i1",
          "word": "sun",
          "target": "Weather Nouns (Danh từ)",
          "vi": "mặt trời"
        },
        {
          "id": "i2",
          "word": "rain",
          "target": "Weather Nouns (Danh từ)",
          "vi": "mưa"
        },
        {
          "id": "i3",
          "word": "wind",
          "target": "Weather Nouns (Danh từ)",
          "vi": "giáo / gió"
        },
        {
          "id": "i4",
          "word": "cloud",
          "target": "Weather Nouns (Danh từ)",
          "vi": "đám mây"
        },
        {
          "id": "i5",
          "word": "snow",
          "target": "Weather Nouns (Danh từ)",
          "vi": "tuyết"
        },
        {
          "id": "i6",
          "word": "fog",
          "target": "Weather Nouns (Danh từ)",
          "vi": "sương mù"
        },
        {
          "id": "i7",
          "word": "thunder",
          "target": "Weather Nouns (Danh từ)",
          "vi": "sấm"
        },
        {
          "id": "i8",
          "word": "lightning",
          "target": "Weather Nouns (Danh từ)",
          "vi": "tia sét"
        },
        {
          "id": "i9",
          "word": "sunny",
          "target": "Weather Adjectives",
          "vi": "có nắng"
        },
        {
          "id": "i10",
          "word": "rainy",
          "target": "Weather Adjectives",
          "vi": "có mưa"
        },
        {
          "id": "i11",
          "word": "windy",
          "target": "Weather Adjectives",
          "vi": "có gió"
        },
        {
          "id": "i12",
          "word": "cloudy",
          "target": "Weather Adjectives",
          "vi": "nhiều mây"
        },
        {
          "id": "i13",
          "word": "snowy",
          "target": "Weather Adjectives",
          "vi": "có tuyết rơi"
        },
        {
          "id": "i14",
          "word": "foggy",
          "target": "Weather Adjectives",
          "vi": "nhiều sương mù"
        },
        {
          "id": "i15",
          "word": "thundery",
          "target": "Weather Adjectives",
          "vi": "có sấm sét / giông"
        },
        {
          "id": "i16",
          "word": "hot",
          "target": "Temperature (Nhiệt độ)",
          "vi": "nóng"
        },
        {
          "id": "i17",
          "word": "warm",
          "target": "Temperature (Nhiệt độ)",
          "vi": "ấm áp"
        },
        {
          "id": "i18",
          "word": "cool",
          "target": "Temperature (Nhiệt độ)",
          "vi": "mát mẻ"
        },
        {
          "id": "i19",
          "word": "cold",
          "target": "Temperature (Nhiệt độ)",
          "vi": "lạnh"
        },
        {
          "id": "i20",
          "word": "degrees",
          "target": "Temperature (Nhiệt độ)",
          "vi": "độ (C/F)"
        },
        {
          "id": "i21",
          "word": "minus",
          "target": "Temperature (Nhiệt độ)",
          "vi": "âm (nhiệt độ)"
        },
        {
          "id": "i22",
          "word": "storm",
          "target": "Storms & Disasters",
          "vi": "cơn bão"
        },
        {
          "id": "i23",
          "word": "hurricane",
          "target": "Storms & Disasters",
          "vi": "trận cuồng phong"
        },
        {
          "id": "i24",
          "word": "thunderstorm",
          "target": "Storms & Disasters",
          "vi": "bão sấm sét"
        },
        {
          "id": "i25",
          "word": "shower",
          "target": "Weather Nouns (Danh từ)",
          "vi": "mưa rào"
        },
        {
          "id": "i26",
          "word": "wet",
          "target": "Temperature (Nhiệt độ)",
          "vi": "ướt át"
        },
        {
          "id": "i27",
          "word": "dry",
          "target": "Temperature (Nhiệt độ)",
          "vi": "khô ráo"
        },
        {
          "id": "i28",
          "word": "blow",
          "target": "Storms & Disasters",
          "vi": "thổi (gió)"
        },
        {
          "id": "i29",
          "word": "shine",
          "target": "Storms & Disasters",
          "vi": "tỏa sáng / chiếu sáng"
        },
        {
          "id": "i30",
          "word": "gale",
          "target": "Storms & Disasters",
          "vi": "gió giật mạnh"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. The sun is shining. It is a _____ day.",
        "options": [
          "rainy",
          "windy",
          "sunny",
          "foggy"
        ],
        "a": "sunny"
      },
      {
        "q": "2. Rain is falling. It is _____.",
        "options": [
          "sunny",
          "windy",
          "rainy",
          "cloudy"
        ],
        "a": "rainy"
      },
      {
        "q": "3. There is a lot of wind. It is very _____.",
        "options": [
          "windy",
          "cloudy",
          "foggy",
          "snowy"
        ],
        "a": "windy"
      },
      {
        "q": "4. There are many clouds in the sky. It is _____.",
        "options": [
          "sunny",
          "cloudy",
          "rainy",
          "foggy"
        ],
        "a": "cloudy"
      },
      {
        "q": "5. It is snowing. The weather is _____.",
        "options": [
          "sunny",
          "snowy",
          "rainy",
          "windy"
        ],
        "a": "snowy"
      },
      {
        "q": "6. Drive slowly! The sương mù is thick. It is very _____.",
        "options": [
          "foggy",
          "sunny",
          "windy",
          "dry"
        ],
        "a": "foggy"
      },
      {
        "q": "7. It is 35 degrees today. It is very _____.",
        "options": [
          "cold",
          "cool",
          "warm",
          "hot"
        ],
        "a": "hot"
      },
      {
        "q": "8. It is minus 10 degrees in Siberia. It is extremely _____.",
        "options": [
          "hot",
          "warm",
          "cold",
          "cool"
        ],
        "a": "cold"
      },
      {
        "q": "9. A _____ is a storm with very strong wind.",
        "options": [
          "shower",
          "hurricane",
          "thunder",
          "lightning"
        ],
        "a": "hurricane"
      },
      {
        "q": "10. We had a _____ last night with loud thunder and bright lightning.",
        "options": [
          "shower",
          "thunderstorm",
          "breeze",
          "gale"
        ],
        "a": "thunderstorm"
      },
      {
        "q": "11. 'It is lovely weather today, isn't it?' - What is the mistake here? 'It is a lovely weather...'",
        "options": [
          "We must say 'a lovely weather'",
          "We must NOT say 'a lovely weather'",
          "We must say 'the lovely weather'",
          "We must say 'a weather lovely'"
        ],
        "a": "We must NOT say 'a lovely weather'"
      },
      {
        "q": "12. In the desert, it doesn't rain much. The weather is very _____.",
        "options": [
          "wet",
          "humid",
          "dry",
          "foggy"
        ],
        "a": "dry"
      },
      {
        "q": "13. After a heavy rain, the ground is extremely _____.",
        "options": [
          "dry",
          "wet",
          "hot",
          "cloudy"
        ],
        "a": "wet"
      },
      {
        "q": "14. A sudden short period of rain is called a _____.",
        "options": [
          "shower",
          "storm",
          "hurricane",
          "gale"
        ],
        "a": "shower"
      },
      {
        "q": "15. The sun _____ in the East.",
        "options": [
          "blows",
          "rains",
          "shines",
          "snows"
        ],
        "a": "shines"
      },
      {
        "q": "16. The wind is _____ strongly today.",
        "options": [
          "shining",
          "blowing",
          "raining",
          "snowing"
        ],
        "a": "blowing"
      },
      {
        "q": "17. What do you see in the sky before you hear thunder?",
        "options": [
          "rain",
          "cloud",
          "lightning",
          "fog"
        ],
        "a": "lightning"
      },
      {
        "q": "18. What is the loud noise in the sky during a storm?",
        "options": [
          "lightning",
          "thunder",
          "rain",
          "wind"
        ],
        "a": "thunder"
      },
      {
        "q": "19. The temperature is 18 degrees. It is nice and _____.",
        "options": [
          "hot",
          "cold",
          "warm",
          "foggy"
        ],
        "a": "warm"
      },
      {
        "q": "20. The autumn breeze is refreshing. It is _____.",
        "options": [
          "hot",
          "cold",
          "cool",
          "foggy"
        ],
        "a": "cool"
      }
    ],
    "typingGame": [
      {
        "q": "Mặt trời: s _ n",
        "hint": "s u n",
        "a": "sun"
      },
      {
        "q": "Có nắng: s _ _ _ y",
        "hint": "s u n n y",
        "a": "sunny"
      },
      {
        "q": "Mưa: r _ _ n",
        "hint": "r a i n",
        "a": "rain"
      },
      {
        "q": "Có mưa: r _ _ _ y",
        "hint": "r a i n y",
        "a": "rainy"
      },
      {
        "q": "Gió: w _ _ d",
        "hint": "w i n d",
        "a": "wind"
      },
      {
        "q": "Có gió: w _ _ _ y",
        "hint": "w i n d y",
        "a": "windy"
      },
      {
        "q": "Mây: c _ _ u d",
        "hint": "c l o u d",
        "a": "cloud"
      },
      {
        "q": "Nhiều mây: c _ _ _ d y",
        "hint": "c l o u d y",
        "a": "cloudy"
      },
      {
        "q": "Tuyết: s _ _ w",
        "hint": "s n o w",
        "a": "snow"
      },
      {
        "q": "Có tuyết: s _ _ _ y",
        "hint": "s n o w y",
        "a": "snowy"
      },
      {
        "q": "Sương mù: f _ g",
        "hint": "f o g",
        "a": "fog"
      },
      {
        "q": "Nhiều sương mù: f _ _ g y",
        "hint": "f o g g y",
        "a": "foggy"
      },
      {
        "q": "Sấm: t _ _ _ d e r",
        "hint": "t h u n d e r",
        "a": "thunder"
      },
      {
        "q": "Tia sét: l _ _ _ t n _ _ g",
        "hint": "l i g h t n i n g",
        "a": "lightning"
      },
      {
        "q": "Nóng: h _ t",
        "hint": "h o t",
        "a": "hot"
      },
      {
        "q": "Lạnh: c _ _ d",
        "hint": "c o l d",
        "a": "cold"
      },
      {
        "q": "Bão kèm sấm sét: t _ _ _ d e r s _ _ r m",
        "hint": "t h u n d e r s t o r m",
        "a": "thunderstorm"
      },
      {
        "q": "Cuồng phong/Bão mạnh: h _ _ r _ c _ n e",
        "hint": "h u r r i c a n e",
        "a": "hurricane"
      },
      {
        "q": "Ướt: w _ t",
        "hint": "w e t",
        "a": "wet"
      },
      {
        "q": "Khô ráo: d _ y",
        "hint": "d r y",
        "a": "dry"
      }
    ],
    "speaking": [
      {
        "text": "It is a sunny day in Tokyo today, but it is cloudy in Hong Kong.",
        "trans": "Hôm nay ở Tokyo là một ngày nắng, nhưng ở Hồng Kông lại nhiều mây."
      },
      {
        "text": "Drive slowly because it is very foggy on the road.",
        "trans": "Lái xe chậm thôi vì trên đường có rất nhiều sương mù."
      },
      {
        "text": "It is very hot in Mexico, but it is freezing cold in the Arctic.",
        "trans": "Ở Mexico trời rất nóng, nhưng ở Bắc Cực lại lạnh giá."
      },
      {
        "text": "We had a big thunderstorm last night with loud thunder and bright lightning.",
        "trans": "Đêm qua chúng tôi đã gặp một trận bão lớn có sấm to và sét sáng."
      },
      {
        "text": "It is lovely weather today, isn't it? Let's go for a walk.",
        "trans": "Hôm nay thời tiết thật đẹp phải không? Chúng ta đi dạo nào."
      }
    ]
  },
  {
    "id": 38,
    "title": "Unit 38: In the town",
    "description": "Học các địa điểm công cộng trong thành phố (bưu điện, ngân hàng, nhà ga), biển báo chỉ đường và cách hỏi đường.",
    "theory": [
      {
        "heading": "A. The town centre (Trung tâm thị trấn/thành phố)",
        "items": [
          {
            "word": "railway station / bus station",
            "type": "Địa điểm",
            "phonetic": "railway station: /ˈreɪlweɪ ˈsteɪʃn/ | bus station: /bʌs ˈsteɪʃn/",
            "vi": "Ga tàu hỏa / Bến xe buýt.",
            "example": "You can get a train at the railway station."
          },
          {
            "word": "bank / post office / library",
            "type": "Địa điểm",
            "phonetic": "bank: /bæŋk/ | post office: /pəʊst ˈɒfɪs/ | library: /ˈlaɪbrəri/",
            "vi": "Ngân hàng / Bưu điện / Thư viện.",
            "example": "You can change money at the bank. Post letters at the post office."
          },
          {
            "word": "museum / town hall / car park",
            "type": "Địa điểm",
            "phonetic": "museum: /mjuˈziːəm/ | town hall: /taʊn hɔːl/ | car park: /kɑː pɑːk/",
            "vi": "Bảo tàng / Tòa thị chính / Bãi đỗ xe.",
            "example": "You can see old things in the museum. Park in the car park."
          }
        ]
      },
      {
        "heading": "B. Streets and roads & Signs (Đường sá & Biển báo)",
        "items": [
          {
            "word": "pedestrian area / shopping centre",
            "type": "Đường phố",
            "phonetic": "pedestrian area: /pəˈdestriən ˈeəriə/ | shopping centre: /ˈʃɒpɪŋ ˈsentə/",
            "vi": "Phố đi bộ / Trung tâm thương mại.",
            "example": "A pedestrian area is for walking only, no cars."
          },
          {
            "word": "no parking / no entry / bus stop",
            "type": "Biển báo",
            "phonetic": "no parking: /nəʊ ˈpɑːkɪŋ/ | no entry: /nəʊ ˈentri/ | bus stop: /bʌs stɒp/",
            "vi": "Cấm đỗ xe / Cấm vào / Điểm dừng xe buýt.",
            "example": "Look at the 'No Parking' sign."
          }
        ]
      },
      {
        "heading": "C. Asking for help (Cách hỏi đường)",
        "items": [
          {
            "word": "Where is the...?",
            "type": "Hỏi đường",
            "phonetic": "/weə z ðə.../",
            "vi": "Đường đến... ở đâu?",
            "example": "Where is the main square please?"
          },
          {
            "word": "How do I get to...?",
            "type": "Hỏi đường",
            "phonetic": "/haʊ duː aɪ ɡet tuː.../",
            "vi": "Làm thế nào để tôi đi đến...?",
            "example": "How do I get to York Street?"
          },
          {
            "word": "Excuse me, I'm looking for...",
            "type": "Hỏi đường",
            "phonetic": "/ɪkˈskjuːz miː, aɪm ˈlʊkɪŋ fɔː.../",
            "vi": "Xin lỗi, tôi đang tìm kiếm...",
            "example": "Excuse me, I'm looking for the museum."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Public Buildings (Địa điểm)",
        "Streets & Traffic",
        "Town Signs (Biển báo)",
        "People & Jobs"
      ],
      "items": [
        {
          "id": "i1",
          "word": "railway station",
          "target": "Public Buildings (Địa điểm)",
          "vi": "ga tàu hỏa"
        },
        {
          "id": "i2",
          "word": "bus station",
          "target": "Public Buildings (Địa điểm)",
          "vi": "bến xe buýt"
        },
        {
          "id": "i3",
          "word": "bank",
          "target": "Public Buildings (Địa điểm)",
          "vi": "ngân hàng"
        },
        {
          "id": "i4",
          "word": "post office",
          "target": "Public Buildings (Địa điểm)",
          "vi": "bưu điện"
        },
        {
          "id": "i5",
          "word": "library",
          "target": "Public Buildings (Địa điểm)",
          "vi": "thư viện"
        },
        {
          "id": "i6",
          "word": "museum",
          "target": "Public Buildings (Địa điểm)",
          "vi": "bảo tàng"
        },
        {
          "id": "i7",
          "word": "town hall",
          "target": "Public Buildings (Địa điểm)",
          "vi": "tòa thị chính"
        },
        {
          "id": "i8",
          "word": "car park",
          "target": "Public Buildings (Địa điểm)",
          "vi": "bãi đỗ xe"
        },
        {
          "id": "i9",
          "word": "supermarket",
          "target": "Public Buildings (Địa điểm)",
          "vi": "siêu thị"
        },
        {
          "id": "i10",
          "word": "hotel",
          "target": "Public Buildings (Địa điểm)",
          "vi": "khách sạn"
        },
        {
          "id": "i11",
          "word": "shopping centre",
          "target": "Streets & Traffic",
          "vi": "trung tâm thương mại"
        },
        {
          "id": "i12",
          "word": "pedestrian area",
          "target": "Streets & Traffic",
          "vi": "phố đi bộ"
        },
        {
          "id": "i13",
          "word": "street",
          "target": "Streets & Traffic",
          "vi": "con đường phố"
        },
        {
          "id": "i14",
          "word": "road",
          "target": "Streets & Traffic",
          "vi": "đường lộ"
        },
        {
          "id": "i15",
          "word": "main square",
          "target": "Streets & Traffic",
          "vi": "quảng trường chính"
        },
        {
          "id": "i16",
          "word": "crossroads",
          "target": "Streets & Traffic",
          "vi": "ngã tư / giao lộ"
        },
        {
          "id": "i17",
          "word": "traffic lights",
          "target": "Streets & Traffic",
          "vi": "đèn giao thông"
        },
        {
          "id": "i18",
          "word": "no parking",
          "target": "Town Signs (Biển báo)",
          "vi": "cấm đỗ xe"
        },
        {
          "id": "i19",
          "word": "no entry",
          "target": "Town Signs (Biển báo)",
          "vi": "cấm vào"
        },
        {
          "id": "i20",
          "word": "bus stop",
          "target": "Town Signs (Biển báo)",
          "vi": "điểm dừng xe buýt"
        },
        {
          "id": "i21",
          "word": "parking prohibited",
          "target": "Town Signs (Biển báo)",
          "vi": "nghiêm cấm đỗ xe"
        },
        {
          "id": "i22",
          "word": "one way",
          "target": "Town Signs (Biển báo)",
          "vi": "đường một chiều"
        },
        {
          "id": "i23",
          "word": "speed limit",
          "target": "Town Signs (Biển báo)",
          "vi": "giới hạn tốc độ"
        },
        {
          "id": "i24",
          "word": "police officer",
          "target": "People & Jobs",
          "vi": "cảnh sát"
        },
        {
          "id": "i25",
          "word": "traffic warden",
          "target": "People & Jobs",
          "vi": "nhân viên kiểm soát giao thông"
        },
        {
          "id": "i26",
          "word": "shop assistant",
          "target": "People & Jobs",
          "vi": "nhân viên bán hàng"
        },
        {
          "id": "i27",
          "word": "librarian",
          "target": "People & Jobs",
          "vi": "thủ thư"
        },
        {
          "id": "i28",
          "word": "bank clerk",
          "target": "People & Jobs",
          "vi": "giao dịch viên ngân hàng"
        },
        {
          "id": "i29",
          "word": "tourist",
          "target": "People & Jobs",
          "vi": "khách du lịch"
        },
        {
          "id": "i30",
          "word": "pedestrian",
          "target": "People & Jobs",
          "vi": "người đi bộ"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. Where can you get a train?",
        "options": [
          "bus station",
          "car park",
          "railway station",
          "bank"
        ],
        "a": "railway station"
      },
      {
        "q": "2. Where can you post letters and buy stamps?",
        "options": [
          "library",
          "post office",
          "museum",
          "town hall"
        ],
        "a": "post office"
      },
      {
        "q": "3. Where can you borrow and read books for free?",
        "options": [
          "supermarket",
          "museum",
          "library",
          "bank"
        ],
        "a": "library"
      },
      {
        "q": "4. Where can you change or withdraw money?",
        "options": [
          "post office",
          "bank",
          "library",
          "car park"
        ],
        "a": "bank"
      },
      {
        "q": "5. Where can you park your car safely in town?",
        "options": [
          "crossroads",
          "pedestrian area",
          "car park",
          "bus stop"
        ],
        "a": "car park"
      },
      {
        "q": "6. An area of town where cars are NOT allowed is a _____.",
        "options": [
          "shopping centre",
          "crossroads",
          "pedestrian area",
          "high street"
        ],
        "a": "pedestrian area"
      },
      {
        "q": "7. Excuse me! I am _____ the railway station. Can you help me?",
        "options": [
          "looking for",
          "finding",
          "seeing",
          "going"
        ],
        "a": "looking for"
      },
      {
        "q": "8. How _____ I get to York Street?",
        "options": [
          "do",
          "am",
          "can",
          "will"
        ],
        "a": "do"
      },
      {
        "q": "9. Where _____ the main square please?",
        "options": [
          "is",
          "are",
          "do",
          "does"
        ],
        "a": "is"
      },
      {
        "q": "10. The sign says 'No _____'. You cannot leave your car here.",
        "options": [
          "Parking",
          "Entry",
          "Exit",
          "Smoking"
        ],
        "a": "Parking"
      },
      {
        "q": "11. The sign says 'No _____'. You cannot walk or drive into this street.",
        "options": [
          "Smoking",
          "Entry",
          "Parking",
          "Exit"
        ],
        "a": "Entry"
      },
      {
        "q": "12. You wait for the bus at the _____.",
        "options": [
          "crossroads",
          "bus stop",
          "car park",
          "railway station"
        ],
        "a": "bus stop"
      },
      {
        "q": "13. The person who works in a library is a _____.",
        "options": [
          "librarian",
          "bank clerk",
          "shop assistant",
          "police officer"
        ],
        "a": "librarian"
      },
      {
        "q": "14. The person who helps you in a shop is a _____.",
        "options": [
          "bank clerk",
          "shop assistant",
          "librarian",
          "traffic warden"
        ],
        "a": "shop assistant"
      },
      {
        "q": "15. The person who helps you with money in a bank is a _____.",
        "options": [
          "giao dịch viên",
          "thủ thư",
          "bank clerk",
          "shop assistant"
        ],
        "a": "bank clerk"
      },
      {
        "q": "16. A large open area in the centre of a town, usually square in shape, is the _____.",
        "options": [
          "main square",
          "pedestrian area",
          "crossroads",
          "car park"
        ],
        "a": "main square"
      },
      {
        "q": "17. A place where two roads meet and cross each other is a _____.",
        "options": [
          "crossroads",
          "roundabout",
          "junction",
          "stop"
        ],
        "a": "crossroads"
      },
      {
        "q": "18. The lights that control traffic are _____.",
        "options": [
          "traffic signs",
          "traffic lights",
          "crossroads",
          "headlights"
        ],
        "a": "traffic lights"
      },
      {
        "q": "19. Excuse me, is there a bank _____ here?",
        "options": [
          "at",
          "near",
          "in",
          "by"
        ],
        "a": "near"
      },
      {
        "q": "20. Where can you see historical and interesting things?",
        "options": [
          "bank",
          "museum",
          "library",
          "car park"
        ],
        "a": "museum"
      }
    ],
    "typingGame": [
      {
        "q": "Ga tàu hỏa: railway ______",
        "hint": "s t a t i o n",
        "a": "station"
      },
      {
        "q": "Bưu điện: post ______",
        "hint": "o f f i c e",
        "a": "office"
      },
      {
        "q": "Ngân hàng: b _ _ k",
        "hint": "b a n k",
        "a": "bank"
      },
      {
        "q": "Thư viện: l _ _ r _ r y",
        "hint": "l i b r a r y",
        "a": "library"
      },
      {
        "q": "Bảo tàng: m _ s _ _ m",
        "hint": "m u s e u m",
        "a": "museum"
      },
      {
        "q": "Bãi đỗ xe: car ______",
        "hint": "p a r k",
        "a": "park"
      },
      {
        "q": "Tòa thị chính: town ______",
        "hint": "h a l l",
        "a": "hall"
      },
      {
        "q": "Phố đi bộ: pedestrian ______",
        "hint": "a r e a",
        "a": "area"
      },
      {
        "q": "Trung tâm mua sắm: shopping ______",
        "hint": "c e n t r e",
        "a": "centre"
      },
      {
        "q": "Cấm đỗ xe: no ______",
        "hint": "p a r k i n g",
        "a": "parking"
      },
      {
        "q": "Cấm vào: no ______",
        "hint": "e n t r y",
        "a": "entry"
      },
      {
        "q": "Trạm dừng xe buýt: bus ______",
        "hint": "s t o p",
        "a": "stop"
      },
      {
        "q": "Nhân viên bán hàng: shop ______",
        "hint": "a s s i s t a n t",
        "a": "assistant"
      },
      {
        "q": "Thủ thư: l _ _ r _ r i _ n",
        "hint": "l i b r a r i a n",
        "a": "librarian"
      },
      {
        "q": "Nhân viên ngân hàng: bank ______",
        "hint": "c l e r k",
        "a": "clerk"
      },
      {
        "q": "Đèn giao thông: traffic ______",
        "hint": "l i g h t s",
        "a": "lights"
      },
      {
        "q": "Ngã tư: c _ _ s s _ _ a d s",
        "hint": "c r o s s r o a d s",
        "a": "crossroads"
      },
      {
        "q": "Quảng trường chính: main ______",
        "hint": "s q u a r e",
        "a": "square"
      },
      {
        "q": "Khách du lịch: t _ _ r _ s t",
        "hint": "t o u r i s t",
        "a": "tourist"
      },
      {
        "q": "Người đi bộ: p _ _ e s t r i _ n",
        "hint": "p e d e s t r i a n",
        "a": "pedestrian"
      }
    ],
    "speaking": [
      {
        "text": "Excuse me, I'm looking for the museum. Is it near here?",
        "trans": "Xin lỗi, tôi đang tìm bảo tàng. Nó có ở gần đây không?"
      },
      {
        "text": "How do I get to York Street? - Turn left at the crossroads.",
        "trans": "Làm thế nào để tôi đi đến phố York? - Hãy rẽ trái tại ngã tư."
      },
      {
        "text": "You can change money at the bank and post letters at the post office.",
        "trans": "Bạn có thể đổi tiền ở ngân hàng và gửi thư tại bưu điện."
      },
      {
        "text": "Look at the 'No Parking' sign. You can't park here.",
        "trans": "Nhìn biển báo 'Cấm Đỗ Xe' kìa. Bạn không được đỗ xe ở đây."
      },
      {
        "text": "Cars are not allowed in the pedestrian area.",
        "trans": "Xe ô tô không được phép đi vào phố đi bộ."
      }
    ]
  },
  {
    "id": 39,
    "title": "Unit 39: In the countryside",
    "description": "Học từ vựng về thiên nhiên vùng nông thôn (đồi, núi, sông, hồ, rừng) và cuộc sống làm nông (trang trại, nhà tranh).",
    "theory": [
      {
        "heading": "A. Things we can see in the countryside (Cảnh quan nông thôn)",
        "items": [
          {
            "word": "mountains / hills / forest / wood",
            "type": "Danh từ",
            "phonetic": "mountains: /ˈmaʊntɪnz/ | hills: /hɪlz/ | forest: /ˈfɒrɪst/ | wood: /wʊd/",
            "vi": "Dãy núi / Đồi / Rừng rậm / Rừng thưa.",
            "example": "You can go walking in the mountains. A forest has thousands of trees."
          },
          {
            "word": "lake / river / country road / path",
            "type": "Danh từ",
            "phonetic": "lake: /leɪk/ | river: /ˈrɪvə/ | country road: /ˈkʌntri rəʊd/ | path: /pɑːθ/",
            "vi": "Hồ nước / Dòng sông / Đường quê / Lối mòn.",
            "example": "We took a boat on the lake. Follow the path through the wood."
          }
        ]
      },
      {
        "heading": "B. Living and working in the countryside (Sống và làm việc ở nông thôn)",
        "items": [
          {
            "word": "village / small town",
            "type": "Danh từ",
            "phonetic": "village: /ˈvɪlɪdʒ/ | small town: /smɔːl taʊn/",
            "vi": "Ngôi làng / Thị trấn nhỏ.",
            "example": "A village is very small (e.g. 700 people)."
          },
          {
            "word": "farm / farmer / fields",
            "type": "Danh từ",
            "phonetic": "farm: /fɑːm/ | farmer: /ˈfɑːmə/ | fields: /fiːldz/",
            "vi": "Trang trại / Nông dân / Cánh đồng.",
            "example": "A farmer lives on a farm and works in the fields."
          },
          {
            "word": "cottage",
            "type": "Danh từ",
            "phonetic": "/ˈkɑː.t̬ɪdʒ/",
            "vi": "Nhà tranh, nhà nhỏ ở quê.",
            "example": "My grandparents live in a beautiful cottage."
          }
        ]
      },
      {
        "heading": "C. Nature and conservation (Thiên nhiên & bảo tồn)",
        "items": [
          {
            "word": "nature / wildlife",
            "type": "Danh từ",
            "phonetic": "nature: /ˈneɪtʃə/ | wildlife: /ˈwaɪldlaɪf/",
            "vi": "Tự nhiên / Động vật hoang dã (chim, thú, côn trùng).",
            "example": "I love walking in the countryside and seeing wildlife. Nature means the natural world."
          },
          {
            "word": "national park / conservation area",
            "type": "Danh từ",
            "phonetic": "national park: /ˈnæʃnəl pɑːk/ | conservation area: /ˌkɒnsəˈveɪʃn ˈeəriə/",
            "vi": "Công viên quốc gia / Khu bảo tồn.",
            "example": "In a national park, nature and wildlife are protected."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Land & Water",
        "Farming & Living",
        "Nature & Conservation",
        "Activities"
      ],
      "items": [
        {
          "id": "i1",
          "word": "mountain",
          "target": "Land & Water",
          "vi": "ngọn núi"
        },
        {
          "id": "i2",
          "word": "hill",
          "target": "Land & Water",
          "vi": "ngọn đồi"
        },
        {
          "id": "i3",
          "word": "forest",
          "target": "Land & Water",
          "vi": "rừng rậm"
        },
        {
          "id": "i4",
          "word": "wood",
          "target": "Land & Water",
          "vi": "rừng thưa / gỗ"
        },
        {
          "id": "i5",
          "word": "lake",
          "target": "Land & Water",
          "vi": "hồ nước"
        },
        {
          "id": "i6",
          "word": "river",
          "target": "Land & Water",
          "vi": "dòng sông"
        },
        {
          "id": "i7",
          "word": "country road",
          "target": "Land & Water",
          "vi": "đường quê"
        },
        {
          "id": "i8",
          "word": "path",
          "target": "Land & Water",
          "vi": "lối đi nhỏ / đường mòn"
        },
        {
          "id": "i9",
          "word": "farm",
          "target": "Farming & Living",
          "vi": "trang trại"
        },
        {
          "id": "i10",
          "word": "farmer",
          "target": "Farming & Living",
          "vi": "nông dân"
        },
        {
          "id": "i11",
          "word": "field",
          "target": "Farming & Living",
          "vi": "cánh đồng"
        },
        {
          "id": "i12",
          "word": "cottage",
          "target": "Farming & Living",
          "vi": "nhà tranh ở quê"
        },
        {
          "id": "i13",
          "word": "village",
          "target": "Farming & Living",
          "vi": "ngôi làng"
        },
        {
          "id": "i14",
          "word": "small town",
          "target": "Farming & Living",
          "vi": "thị trấn nhỏ"
        },
        {
          "id": "i15",
          "word": "crops",
          "target": "Farming & Living",
          "vi": "mùa màng / cây trồng"
        },
        {
          "id": "i16",
          "word": "nature",
          "target": "Nature & Conservation",
          "vi": "tự nhiên"
        },
        {
          "id": "i17",
          "word": "wildlife",
          "target": "Nature & Conservation",
          "vi": "động vật hoang dã"
        },
        {
          "id": "i18",
          "word": "national park",
          "target": "Nature & Conservation",
          "vi": "công viên quốc gia"
        },
        {
          "id": "i19",
          "word": "conservation",
          "target": "Nature & Conservation",
          "vi": "sự bảo tồn"
        },
        {
          "id": "i20",
          "word": "protected area",
          "target": "Nature & Conservation",
          "vi": "khu vực bảo vệ"
        },
        {
          "id": "i21",
          "word": "wild animals",
          "target": "Nature & Conservation",
          "vi": "thú hoang dã"
        },
        {
          "id": "i22",
          "word": "birds",
          "target": "Nature & Conservation",
          "vi": "chim chóc"
        },
        {
          "id": "i23",
          "word": "insects",
          "target": "Nature & Conservation",
          "vi": "côn trùng"
        },
        {
          "id": "i24",
          "word": "walking",
          "target": "Activities",
          "vi": "đi bộ"
        },
        {
          "id": "i25",
          "word": "skiing",
          "target": "Activities",
          "vi": "trượt tuyết"
        },
        {
          "id": "i26",
          "word": "picnic",
          "target": "Activities",
          "vi": "dã ngoại"
        },
        {
          "id": "i27",
          "word": "boating",
          "target": "Activities",
          "vi": "chèo thuyền"
        },
        {
          "id": "i28",
          "word": "camping",
          "target": "Activities",
          "vi": "cắm trại"
        },
        {
          "id": "i29",
          "word": "hiking",
          "target": "Activities",
          "vi": "đi bộ đường dài"
        },
        {
          "id": "i30",
          "word": "fishing",
          "target": "Activities",
          "vi": "câu cá"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. A area larger than a wood, covered with thousands of trees is a _____.",
        "options": [
          "mountain",
          "lake",
          "forest",
          "field"
        ],
        "a": "forest"
      },
      {
        "q": "2. A very small town in the countryside (e.g. 500 people) is a _____.",
        "options": [
          "city",
          "village",
          "suburb",
          "capital"
        ],
        "a": "village"
      },
      {
        "q": "3. The person who owns and works on a farm is a _____.",
        "options": [
          "farmer",
          "pedestrian",
          "guide",
          "warden"
        ],
        "a": "farmer"
      },
      {
        "q": "4. A small, charming house in the countryside is a _____.",
        "options": [
          "flat",
          "cottage",
          "skyscraper",
          "hotel"
        ],
        "a": "cottage"
      },
      {
        "q": "5. Wild animals, birds, and insects in their natural habitat are called _____.",
        "options": [
          "pets",
          "wildlife",
          "nature",
          "domestic"
        ],
        "a": "wildlife"
      },
      {
        "q": "6. A large area of protected land where nature is kept safe is a _____.",
        "options": [
          "car park",
          "national park",
          "shopping centre",
          "pedestrian area"
        ],
        "a": "national park"
      },
      {
        "q": "7. You can go _____ on the lake using a wooden boat.",
        "options": [
          "skiing",
          "walking",
          "boating",
          "climbing"
        ],
        "a": "boating"
      },
      {
        "q": "8. A farmer works in the green _____.",
        "options": [
          "offices",
          "fields",
          "stations",
          "libraries"
        ],
        "a": "fields"
      },
      {
        "q": "9. Mount Everest is the highest _____ in the world.",
        "options": [
          "hill",
          "lake",
          "mountain",
          "river"
        ],
        "a": "mountain"
      },
      {
        "q": "10. The Thames is a famous _____ in London.",
        "options": [
          "lake",
          "river",
          "mountain",
          "path"
        ],
        "a": "river"
      },
      {
        "q": "11. 'I love the nature' - What is the mistake?",
        "options": [
          "We should use 'a nature'",
          "We should NOT use 'the' before nature",
          "We should say 'the natures'",
          "No mistake"
        ],
        "a": "We should NOT use 'the' before nature"
      },
      {
        "q": "12. A small mountain, easier to climb, is a _____.",
        "options": [
          "hill",
          "cliff",
          "valley",
          "lake"
        ],
        "a": "hill"
      },
      {
        "q": "13. Follow the small _____ through the woods so you don't get lost.",
        "options": [
          "highway",
          "motorway",
          "path",
          "crossroads"
        ],
        "a": "path"
      },
      {
        "q": "14. A large body of water surrounded by land is a _____.",
        "options": [
          "river",
          "sea",
          "lake",
          "ocean"
        ],
        "a": "lake"
      },
      {
        "q": "15. We had a wonderful _____ on the grass under a tree, eating sandwiches.",
        "options": [
          "picnic",
          "skiing",
          "walking",
          "climbing"
        ],
        "a": "picnic"
      },
      {
        "q": "16. A forest is filled with thousands of _____.",
        "options": [
          "cars",
          "people",
          "trees",
          "houses"
        ],
        "a": "trees"
      },
      {
        "q": "17. An area of countryside smaller than a forest is a _____.",
        "options": [
          "lake",
          "wood",
          "field",
          "mountain"
        ],
        "a": "wood"
      },
      {
        "q": "18. Agriculture and growing crops happen on a _____.",
        "options": [
          "factory",
          "farm",
          "office",
          "museum"
        ],
        "a": "farm"
      },
      {
        "q": "19. The study and protection of wildlife and plants is _____.",
        "options": [
          "pollution",
          "conservation",
          "industry",
          "capitalism"
        ],
        "a": "conservation"
      },
      {
        "q": "20. We stayed in a tent on the hill. We went _____.",
        "options": [
          "boating",
          "shopping",
          "camping",
          "skiing"
        ],
        "a": "camping"
      }
    ],
    "typingGame": [
      {
        "q": "Ngọn núi: m _ _ _ t _ _ n",
        "hint": "m o u n t a i n",
        "a": "mountain"
      },
      {
        "q": "Ngọn đồi: h _ l l",
        "hint": "h i l l",
        "a": "hill"
      },
      {
        "q": "Rừng rậm: f _ _ e s t",
        "hint": "f o r e s t",
        "a": "forest"
      },
      {
        "q": "Rừng thưa/Gỗ: w _ o d",
        "hint": "w o o d",
        "a": "wood"
      },
      {
        "q": "Hồ nước: l _ k e",
        "hint": "l a k e",
        "a": "lake"
      },
      {
        "q": "Dòng sông: r _ _ e r",
        "hint": "r i v e r",
        "a": "river"
      },
      {
        "q": "Lối đi/Đường mòn: p _ t h",
        "hint": "p a t h",
        "a": "path"
      },
      {
        "q": "Trang trại: f _ r m",
        "hint": "f a r m",
        "a": "farm"
      },
      {
        "q": "Nông dân: f _ r m _ r",
        "hint": "f a r m e r",
        "a": "farmer"
      },
      {
        "q": "Cánh đồng: f _ e l d",
        "hint": "f i e l d",
        "a": "field"
      },
      {
        "q": "Nhà tranh: c _ _ t _ g e",
        "hint": "c o t t a g e",
        "a": "cottage"
      },
      {
        "q": "Ngôi làng: v _ _ l _ g e",
        "hint": "v i l l a g e",
        "a": "village"
      },
      {
        "q": "Tự nhiên: n _ t _ r e",
        "hint": "n a t u r e",
        "a": "nature"
      },
      {
        "q": "Thú hoang dã: w _ l d l _ f e",
        "hint": "w i l d l i f e",
        "a": "wildlife"
      },
      {
        "q": "Công viên quốc gia: national ______",
        "hint": "p a r k",
        "a": "park"
      },
      {
        "q": "Dã ngoại: p _ c n _ c",
        "hint": "p i c n i c",
        "a": "picnic"
      },
      {
        "q": "Cắm trại: c _ m p _ n g",
        "hint": "c a m p i n g",
        "a": "camping"
      },
      {
        "q": "Chèo thuyền: b _ a t _ n g",
        "hint": "b o a t i n g",
        "a": "boating"
      },
      {
        "q": "Đường quê: country ______",
        "hint": "r o a d",
        "a": "road"
      },
      {
        "q": "Trượt tuyết: s _ i _ n g",
        "hint": "s k i i n g",
        "a": "skiing"
      }
    ],
    "speaking": [
      {
        "text": "My grandparents live in a beautiful cottage in a small village.",
        "trans": "Ông bà tôi sống trong một ngôi nhà tranh xinh đẹp ở một ngôi làng nhỏ."
      },
      {
        "text": "I love walking in the mountains and seeing wild birds and wildlife.",
        "trans": "Tôi thích đi bộ trên núi và ngắm nhìn chim chóc hoang dã cùng thiên nhiên."
      },
      {
        "text": "The farmer works hard in the fields from morning till night.",
        "trans": "Người nông dân làm việc chăm chỉ trên cánh đồng từ sáng tới đêm."
      },
      {
        "text": "In a national park, all nature and wildlife are strictly protected.",
        "trans": "Trong một công viên quốc gia, mọi tự nhiên và động vật hoang dã đều được bảo vệ nghiêm ngặt."
      },
      {
        "text": "Let's have a picnic by the lake on Sunday.",
        "trans": "Chúng ta hãy đi dã ngoại bên hồ vào ngày Chủ nhật."
      }
    ]
  },
  {
    "id": 40,
    "title": "Unit 40: Animals and pets",
    "description": "Học từ vựng tiếng Anh về động vật nuôi trong trang trại, thú hoang dã trong sở thú và thú cưng trong nhà.",
    "theory": [
      {
        "heading": "A. Farm animals (Động vật trang trại)",
        "items": [
          {
            "word": "horse / cow / sheep / pig / hen",
            "type": "Danh từ",
            "phonetic": "/hɔːrs/ /kaʊ/ /ʃiːp/ /pɪɡ/ /hen/",
            "vi": "Con ngựa / Bò / Cừu / Heo / Gà mái.",
            "example": "Sheep give us wool. Cows give us milk and beef."
          },
          {
            "word": "meat names",
            "type": "Từ vựng",
            "phonetic": "/miːt neɪmz/",
            "vi": "Tên thịt tương ứng: cow -> beef, sheep -> lamb, pig -> pork/bacon/ham, hen -> chicken.",
            "example": "I like eating lamb."
          }
        ]
      },
      {
        "heading": "B. Wild or zoo animals (Động vật hoang dã)",
        "items": [
          {
            "word": "elephant / giraffe / lion / tiger",
            "type": "Danh từ",
            "phonetic": "/ˈel.ə.fənt/ /dʒɪˈræf/ /ˈlaɪ.ən/ /ˈtaɪ.ɡɚ/",
            "vi": "Con voi / Hươu cao cổ / Sư tử / Hổ.",
            "example": "A giraffe has a very long neck. Sư tử is the king of the jungle."
          },
          {
            "word": "monkey / snake",
            "type": "Danh từ",
            "phonetic": "/ˈmʌŋ.ki/ /sneɪk/",
            "vi": "Con khỉ / Con rắn.",
            "example": "Monkeys love eating bananas. Watch out for the snake!"
          }
        ]
      },
      {
        "heading": "C. Pets (Thú cưng)",
        "items": [
          {
            "word": "dog / cat / fish / parrot / tortoise",
            "type": "Danh từ",
            "phonetic": "dog: /dɒɡ/ | cat: /kæt/ | fish: /fɪʃ/ | parrot: /ˈpærət/ | tortoise: /ˈtɔːtəs/",
            "vi": "Con chó / Mèo / Cá / Con vẹt / Con rùa.",
            "example": "I take my dog for a walk every day. Parrots and budgies are birds."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Farm Animals",
        "Wild Animals",
        "Pets",
        "Animal Babies & Products"
      ],
      "items": [
        {
          "id": "i1",
          "word": "horse",
          "target": "Farm Animals",
          "vi": "con ngựa"
        },
        {
          "id": "i2",
          "word": "cow",
          "target": "Farm Animals",
          "vi": "con bò"
        },
        {
          "id": "i3",
          "word": "sheep",
          "target": "Farm Animals",
          "vi": "con cừu"
        },
        {
          "id": "i4",
          "word": "pig",
          "target": "Farm Animals",
          "vi": "con heo"
        },
        {
          "id": "i5",
          "word": "hen",
          "target": "Farm Animals",
          "vi": "con gà mái"
        },
        {
          "id": "i6",
          "word": "goat",
          "target": "Farm Animals",
          "vi": "con dê"
        },
        {
          "id": "i7",
          "word": "chicken",
          "target": "Farm Animals",
          "vi": "gà nói chung"
        },
        {
          "id": "i8",
          "word": "elephant",
          "target": "Wild Animals",
          "vi": "con voi"
        },
        {
          "id": "i9",
          "word": "giraffe",
          "target": "Wild Animals",
          "vi": "hươu cao cổ"
        },
        {
          "id": "i10",
          "word": "lion",
          "target": "Wild Animals",
          "vi": "sư tử"
        },
        {
          "id": "i11",
          "word": "tiger",
          "target": "Wild Animals",
          "vi": "con hổ"
        },
        {
          "id": "i12",
          "word": "monkey",
          "target": "Wild Animals",
          "vi": "con khỉ"
        },
        {
          "id": "i13",
          "word": "snake",
          "target": "Wild Animals",
          "vi": "con rắn"
        },
        {
          "id": "i14",
          "word": "bear",
          "target": "Wild Animals",
          "vi": "con gấu"
        },
        {
          "id": "i15",
          "word": "kangaroo",
          "target": "Wild Animals",
          "vi": "chuột túi"
        },
        {
          "id": "i16",
          "word": "dog",
          "target": "Pets",
          "vi": "con chó"
        },
        {
          "id": "i17",
          "word": "cat",
          "target": "Pets",
          "vi": "con mèo"
        },
        {
          "id": "i18",
          "word": "fish",
          "target": "Pets",
          "vi": "con cá"
        },
        {
          "id": "i19",
          "word": "parrot",
          "target": "Pets",
          "vi": "con vẹt"
        },
        {
          "id": "i20",
          "word": "tortoise",
          "target": "Pets",
          "vi": "con rùa cạn"
        },
        {
          "id": "i21",
          "word": "rabbit",
          "target": "Pets",
          "vi": "con thỏ"
        },
        {
          "id": "i22",
          "word": "budgie",
          "target": "Pets",
          "vi": "vẹt đuôi dài cảnh"
        },
        {
          "id": "i23",
          "word": "lamb",
          "target": "Animal Babies & Products",
          "vi": "thịt cừu / cừu non"
        },
        {
          "id": "i24",
          "word": "beef",
          "target": "Animal Babies & Products",
          "vi": "thịt bò"
        },
        {
          "id": "i25",
          "word": "pork",
          "target": "Animal Babies & Products",
          "vi": "thịt heo"
        },
        {
          "id": "i26",
          "word": "wool",
          "target": "Animal Babies & Products",
          "vi": "len từ lông cừu"
        },
        {
          "id": "i27",
          "word": "foal",
          "target": "Animal Babies & Products",
          "vi": "ngựa con"
        },
        {
          "id": "i28",
          "word": "calf",
          "target": "Animal Babies & Products",
          "vi": "bê (bò con)"
        },
        {
          "id": "i29",
          "word": "piglet",
          "target": "Animal Babies & Products",
          "vi": "heo con"
        },
        {
          "id": "i30",
          "word": "chick",
          "target": "Animal Babies & Products",
          "vi": "gà con"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. Cow meat is called _____.",
        "options": [
          "pork",
          "beef",
          "lamb",
          "bacon"
        ],
        "a": "beef"
      },
      {
        "q": "2. Pig meat is called _____.",
        "options": [
          "beef",
          "wool",
          "pork",
          "chicken"
        ],
        "a": "pork"
      },
      {
        "q": "3. Sheep meat is called _____.",
        "options": [
          "beef",
          "pork",
          "lamb",
          "ham"
        ],
        "a": "lamb"
      },
      {
        "q": "4. Sheep provide us with _____ to make warm clothes.",
        "options": [
          "milk",
          "wool",
          "leather",
          "feathers"
        ],
        "a": "wool"
      },
      {
        "q": "5. Which animal has a very long neck?",
        "options": [
          "elephant",
          "giraffe",
          "lion",
          "monkey"
        ],
        "a": "giraffe"
      },
      {
        "q": "6. Which animal is considered the king of the jungle?",
        "options": [
          "tiger",
          "elephant",
          "lion",
          "snake"
        ],
        "a": "lion"
      },
      {
        "q": "7. Which pet has a hard shell on its back and moves very slowly?",
        "options": [
          "rabbit",
          "parrot",
          "tortoise",
          "cat"
        ],
        "a": "tortoise"
      },
      {
        "q": "8. A baby cow is called a _____.",
        "options": [
          "foal",
          "calf",
          "piglet",
          "chick"
        ],
        "a": "calf"
      },
      {
        "q": "9. A baby horse is called a _____.",
        "options": [
          "calf",
          "foal",
          "chick",
          "piglet"
        ],
        "a": "foal"
      },
      {
        "q": "10. Which animal slithers on the ground and has no legs?",
        "options": [
          "monkey",
          "snake",
          "lizard",
          "spider"
        ],
        "a": "snake"
      },
      {
        "q": "11. budgies and parrots are types of _____.",
        "options": [
          "mammals",
          "fish",
          "birds",
          "reptiles"
        ],
        "a": "birds"
      },
      {
        "q": "12. I take my dog _____ every afternoon.",
        "options": [
          "for a walk",
          "to shopping",
          "for a fly",
          "to swimming"
        ],
        "a": "for a walk"
      },
      {
        "q": "13. Which animal has a trunk (vòi) and is very large?",
        "options": [
          "lion",
          "giraffe",
          "elephant",
          "bear"
        ],
        "a": "elephant"
      },
      {
        "q": "14. A baby chicken is called a _____.",
        "options": [
          "chick",
          "piglet",
          "lamb",
          "foal"
        ],
        "a": "chick"
      },
      {
        "q": "15. Monkeys love climbing trees and eating _____.",
        "options": [
          "apples",
          "bananas",
          "grapes",
          "meat"
        ],
        "a": "bananas"
      },
      {
        "q": "16. Which of the following is NOT a farm animal?",
        "options": [
          "sheep",
          "cow",
          "lion",
          "hen"
        ],
        "a": "lion"
      },
      {
        "q": "17. A baby pig is called a _____.",
        "options": [
          "calf",
          "piglet",
          "foal",
          "lamb"
        ],
        "a": "piglet"
      },
      {
        "q": "18. Which pet can copy human speech?",
        "options": [
          "dog",
          "cat",
          "parrot",
          "tortoise"
        ],
        "a": "parrot"
      },
      {
        "q": "19. Gà mái is called _____.",
        "options": [
          "hen",
          "cock",
          "chicken",
          "bird"
        ],
        "a": "hen"
      },
      {
        "q": "20. Bacon and ham come from _____.",
        "options": [
          "cows",
          "sheep",
          "pigs",
          "hens"
        ],
        "a": "pigs"
      }
    ],
    "typingGame": [
      {
        "q": "Con ngựa: h _ _ s e",
        "hint": "h o r s e",
        "a": "horse"
      },
      {
        "q": "Con bò: c _ w",
        "hint": "c o w",
        "a": "cow"
      },
      {
        "q": "Thịt bò: b _ _ f",
        "hint": "b e e f",
        "a": "beef"
      },
      {
        "q": "Con cừu: s _ _ e p",
        "hint": "s h e e p",
        "a": "sheep"
      },
      {
        "q": "Thịt cừu: l _ m b",
        "hint": "l a m b",
        "a": "lamb"
      },
      {
        "q": "Con heo: p _ g",
        "hint": "p i g",
        "a": "pig"
      },
      {
        "q": "Thịt heo: p _ _ k",
        "hint": "p o r k",
        "a": "pork"
      },
      {
        "q": "Con gà mái: h _ n",
        "hint": "h e n",
        "a": "hen"
      },
      {
        "q": "Con voi: e _ _ p h _ n t",
        "hint": "e l e p h a n t",
        "a": "elephant"
      },
      {
        "q": "Hươu cao cổ: g _ r _ f _ e",
        "hint": "g i r a f f e",
        "a": "giraffe"
      },
      {
        "q": "Sư tử: l _ o n",
        "hint": "l i o n",
        "a": "lion"
      },
      {
        "q": "Con hổ: t _ g _ r",
        "hint": "t i g e r",
        "a": "tiger"
      },
      {
        "q": "Con khỉ: m _ n _ e y",
        "hint": "m o n k e y",
        "a": "monkey"
      },
      {
        "q": "Con rắn: s _ n _ e",
        "hint": "s n a k e",
        "a": "snake"
      },
      {
        "q": "Con vẹt: p _ r _ o t",
        "hint": "p a r r o t",
        "a": "parrot"
      },
      {
        "q": "Con rùa: t _ r t _ _ s e",
        "hint": "t o r t o i s e",
        "a": "tortoise"
      },
      {
        "q": "Len từ lông cừu: w _ o l",
        "hint": "w o o l",
        "a": "wool"
      },
      {
        "q": "Bê (bò con): c _ l f",
        "hint": "c a l f",
        "a": "calf"
      },
      {
        "q": "Ngựa con: f _ a l",
        "hint": "f o a l",
        "a": "foal"
      },
      {
        "q": "Gà con: c _ i c k",
        "hint": "c h i c k",
        "a": "chick"
      }
    ],
    "speaking": [
      {
        "text": "Cows give us milk and beef. Sheep give us wool.",
        "trans": "Bò cho chúng ta sữa và thịt bò. Cừu cho chúng ta len."
      },
      {
        "text": "I take my dog for a walk in the park every afternoon.",
        "trans": "Tôi dẫn chó đi dạo trong công viên mỗi buổi chiều."
      },
      {
        "text": "A giraffe has a very long neck to eat leaves on trees.",
        "trans": "Hươu cao cổ có cái cổ rất dài để ăn lá cây trên cao."
      },
      {
        "text": "Budgies and parrots are popular pet birds.",
        "trans": "Vẹt cảnh và vẹt lớn là các loài chim cảnh phổ biến."
      },
      {
        "text": "The lion is a wild animal. It is the king of animals.",
        "trans": "Sư tử là động vật hoang dã. Nó là vua của muôn loài."
      }
    ]
  },
  {
    "id": 41,
    "title": "Unit 41: Travelling",
    "description": "Học từ vựng chuyên sâu về du lịch và các phương tiện di chuyển (xe buýt, tàu hỏa, máy bay), cách đặt vé và giới từ.",
    "theory": [
      {
        "heading": "A. Types of transport (Các loại phương tiện)",
        "items": [
          {
            "word": "train / plane / car / bus",
            "type": "Phương tiện",
            "phonetic": "train: /treɪn/ | plane: /pleɪn/ | car: /kɑː/ | bus: /bʌs/",
            "vi": "Tàu hỏa / Máy bay / Ô tô / Xe buýt.",
            "example": "Travelling by plane is very fast. I go to school by bus."
          },
          {
            "word": "motorbike / underground / boat",
            "type": "Phương tiện",
            "phonetic": "motorbike: /ˈməʊtəbaɪk/ | underground: /ˈʌndəɡraʊnd/ | boat: /bəʊt/",
            "vi": "Xe máy / Tàu điện ngầm / Thuyền.",
            "example": "In London we take the underground."
          }
        ]
      },
      {
        "heading": "B. Travel vocabulary (Thuật ngữ du lịch)",
        "items": [
          {
            "word": "timetable / map",
            "type": "Từ vựng",
            "phonetic": "timetable: /ˈtaɪmteɪbl/ | map: /mæp/",
            "vi": "Lịch trình tàu chạy / Bản đồ.",
            "example": "Check the timetable to see when the train departs."
          },
          {
            "word": "single ticket / return ticket",
            "type": "Vé",
            "phonetic": "single ticket: /ˈsɪŋɡl ˈtɪkɪt/ | return ticket: /rɪˈtɜːn ˈtɪkɪt/",
            "vi": "Vé một chiều / Vé khứ hồi.",
            "example": "Can I have a return ticket to Oxford please?"
          },
          {
            "word": "book a seat",
            "type": "Động từ",
            "phonetic": "/bʊk ə siːt/",
            "vi": "Đặt chỗ trước.",
            "example": "I want to book a seat in advance."
          }
        ]
      },
      {
        "heading": "C & D. By train and plane (Đi tàu và máy bay)",
        "items": [
          {
            "word": "arrive at platform",
            "type": "Cụm từ",
            "phonetic": "/əˈraɪv æt ˈplætfɔːm/",
            "vi": "Đến sân ga số...",
            "example": "The train departs from platform 6."
          },
          {
            "word": "check in / takes off / land",
            "type": "Cụm từ",
            "phonetic": "check in: /tʃek ɪn/ | takes off: /teɪks ɒf/ | land: /lænd/",
            "vi": "Thủ tục lên máy bay / Cất cánh / Hạ cánh.",
            "example": "Check in 2 hours before the plane takes off. The plane landed safely."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Vehicles (Phương tiện)",
        "Travel Words (Từ vựng)",
        "Train Travel (Đi tàu)",
        "Plane Travel (Đi bay)"
      ],
      "items": [
        {
          "id": "i1",
          "word": "train",
          "target": "Vehicles (Phương tiện)",
          "vi": "tàu hỏa"
        },
        {
          "id": "i2",
          "word": "plane",
          "target": "Vehicles (Phương tiện)",
          "vi": "máy bay"
        },
        {
          "id": "i3",
          "word": "car",
          "target": "Vehicles (Phương tiện)",
          "vi": "xe ô tô"
        },
        {
          "id": "i4",
          "word": "bus",
          "target": "Vehicles (Phương tiện)",
          "vi": "xe buýt"
        },
        {
          "id": "i5",
          "word": "bicycle",
          "target": "Vehicles (Phương tiện)",
          "vi": "xe đạp"
        },
        {
          "id": "i6",
          "word": "motorbike",
          "target": "Vehicles (Phương tiện)",
          "vi": "xe máy"
        },
        {
          "id": "i7",
          "word": "underground",
          "target": "Vehicles (Phương tiện)",
          "vi": "tàu điện ngầm"
        },
        {
          "id": "i8",
          "word": "boat",
          "target": "Vehicles (Phương tiện)",
          "vi": "thuyền"
        },
        {
          "id": "i9",
          "word": "ship",
          "target": "Vehicles (Phương tiện)",
          "vi": "tàu lớn"
        },
        {
          "id": "i10",
          "word": "helicopter",
          "target": "Vehicles (Phương tiện)",
          "vi": "trực thăng"
        },
        {
          "id": "i11",
          "word": "map",
          "target": "Travel Words (Từ vựng)",
          "vi": "bản đồ"
        },
        {
          "id": "i12",
          "word": "timetable",
          "target": "Travel Words (Từ vựng)",
          "vi": "lịch trình giờ chạy"
        },
        {
          "id": "i13",
          "word": "single ticket",
          "target": "Travel Words (Từ vựng)",
          "vi": "vé một chiều"
        },
        {
          "id": "i14",
          "word": "return ticket",
          "target": "Travel Words (Từ vựng)",
          "vi": "vé khứ hồi"
        },
        {
          "id": "i15",
          "word": "fare",
          "target": "Travel Words (Từ vựng)",
          "vi": "giá vé"
        },
        {
          "id": "i16",
          "word": "journey",
          "target": "Travel Words (Từ vựng)",
          "vi": "hành trình / chuyến đi"
        },
        {
          "id": "i17",
          "word": "book in advance",
          "target": "Travel Words (Từ vựng)",
          "vi": "đặt trước"
        },
        {
          "id": "i18",
          "word": "luggage",
          "target": "Travel Words (Từ vựng)",
          "vi": "hành lý"
        },
        {
          "id": "i19",
          "word": "passport",
          "target": "Travel Words (Từ vựng)",
          "vi": "hộ chiếu"
        },
        {
          "id": "i20",
          "word": "platform",
          "target": "Train Travel (Đi tàu)",
          "vi": "sân ga tàu"
        },
        {
          "id": "i21",
          "word": "depart",
          "target": "Train Travel (Đi tàu)",
          "vi": "khởi hành"
        },
        {
          "id": "i22",
          "word": "arrive",
          "target": "Train Travel (Đi tàu)",
          "vi": "đến nơi"
        },
        {
          "id": "i23",
          "word": "change trains",
          "target": "Train Travel (Đi tàu)",
          "vi": "đổi tàu / chuyển tuyến"
        },
        {
          "id": "i24",
          "word": "buffet car",
          "target": "Train Travel (Đi tàu)",
          "vi": "toa ăn uống trên tàu"
        },
        {
          "id": "i25",
          "word": "check in",
          "target": "Plane Travel (Đi bay)",
          "vi": "làm thủ tục bay"
        },
        {
          "id": "i26",
          "word": "customs",
          "target": "Plane Travel (Đi bay)",
          "vi": "hải quan"
        },
        {
          "id": "i27",
          "word": "boarding card",
          "target": "Plane Travel (Đi bay)",
          "vi": "thẻ lên máy bay"
        },
        {
          "id": "i28",
          "word": "takes off",
          "target": "Plane Travel (Đi bay)",
          "vi": "cất cánh"
        },
        {
          "id": "i29",
          "word": "land",
          "target": "Plane Travel (Đi bay)",
          "vi": "hạ cánh"
        },
        {
          "id": "i30",
          "word": "flight stewards",
          "target": "Plane Travel (Đi bay)",
          "vi": "tiếp viên hàng không"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. A ticket for a trip going and coming back is a _____ ticket.",
        "options": [
          "single",
          "double",
          "return",
          "pass"
        ],
        "a": "return"
      },
      {
        "q": "2. A ticket for a trip going one-way only is a _____ ticket.",
        "options": [
          "return",
          "single",
          "one",
          "half"
        ],
        "a": "single"
      },
      {
        "q": "3. You must _____ your luggage before getting on the plane.",
        "options": [
          "land",
          "check in",
          "take off",
          "depart"
        ],
        "a": "check in"
      },
      {
        "q": "4. The plane _____ from the airport runway when it flies up.",
        "options": [
          "lands",
          "departs",
          "takes off",
          "checks in"
        ],
        "a": "takes off"
      },
      {
        "q": "5. When the plane reaches the ground, it _____.",
        "options": [
          "takes off",
          "lands",
          "departs",
          "flies"
        ],
        "a": "lands"
      },
      {
        "q": "6. The train to Paris departs from _____ 3.",
        "options": [
          "car park",
          "platform",
          "crossroads",
          "bus stop"
        ],
        "a": "platform"
      },
      {
        "q": "7. You can check the train schedule in the _____.",
        "options": [
          "map",
          "timetable",
          "passport",
          "fare"
        ],
        "a": "timetable"
      },
      {
        "q": "8. The price you pay to travel is the _____.",
        "options": [
          "money",
          "cost",
          "fare",
          "bill"
        ],
        "a": "fare"
      },
      {
        "q": "9. To ensure you have a seat on a busy train, you should _____ a seat.",
        "options": [
          "take",
          "buy",
          "book",
          "rent"
        ],
        "a": "book"
      },
      {
        "q": "10. In London, the fast electric train system below the city is the _____.",
        "options": [
          "timetable",
          "underground",
          "ferry",
          "coach"
        ],
        "a": "underground"
      },
      {
        "q": "11. 'Was the journey long?' - Which word cannot be used instead of 'journey'?",
        "options": [
          "trip",
          "travel",
          "flight",
          "voyage"
        ],
        "a": "travel"
      },
      {
        "q": "12. The people who look after passengers on a plane are _____.",
        "options": [
          "pilots",
          "mechanics",
          "flight stewards",
          "librarians"
        ],
        "a": "flight stewards"
      },
      {
        "q": "13. I travel to work _____ train every day.",
        "options": [
          "in",
          "on",
          "by",
          "with"
        ],
        "a": "by"
      },
      {
        "q": "14. We went _____ their honeymoon to Italy.",
        "options": [
          "in",
          "on",
          "at",
          "for"
        ],
        "a": "on"
      },
      {
        "q": "15. The train departs from London and _____ in Paris 2 hours later.",
        "options": [
          "takes off",
          "lands",
          "arrives",
          "goes"
        ],
        "a": "arrives"
      },
      {
        "q": "16. You get the card to board the plane at check-in. It is a _____ card.",
        "options": [
          "credit",
          "boarding",
          "identity",
          "member"
        ],
        "a": "boarding"
      }
    ],
    "typingGame": [
      {
        "q": "Tàu điện ngầm: u _ _ _ r g r _ _ _ d",
        "hint": "u n d e r g r o u n d",
        "a": "underground"
      },
      {
        "q": "Giá vé: f _ r e",
        "hint": "f a r e",
        "a": "fare"
      },
      {
        "q": "Vé một chiều: single ______",
        "hint": "t i c k e t",
        "a": "ticket"
      },
      {
        "q": "Vé khứ hồi: return ______",
        "hint": "t i c k e t",
        "a": "ticket"
      },
      {
        "q": "Lịch trình chạy: t _ _ e t a b l e",
        "hint": "t i m e t a b l e",
        "a": "timetable"
      },
      {
        "q": "Đặt chỗ trước: b _ _ k",
        "hint": "b o o k",
        "a": "book"
      },
      {
        "q": "Hành lý: l _ _ g a g e",
        "hint": "l u g g a g e",
        "a": "luggage"
      },
      {
        "q": "Hộ chiếu: p _ _ s p o r t",
        "hint": "p a s s p o r t",
        "a": "passport"
      },
      {
        "q": "Sân ga tàu: p _ _ t f o r m",
        "hint": "p l a t f o r m",
        "a": "platform"
      },
      {
        "q": "Khởi hành: d _ _ a r t",
        "hint": "d e p a r t",
        "a": "depart"
      },
      {
        "q": "Đến nơi: a _ r i v e",
        "hint": "a r r i v e",
        "a": "arrive"
      },
      {
        "q": "Toa ăn uống: buffet ______",
        "hint": "c a r",
        "a": "car"
      },
      {
        "q": "Làm thủ tục bay: check ______",
        "hint": "i n",
        "a": "in"
      },
      {
        "q": "Thẻ lên máy bay: boarding ______",
        "hint": "c a r d",
        "a": "card"
      },
      {
        "q": "Máy bay cất cánh: ______ off",
        "hint": "t a k e s",
        "a": "takes"
      },
      {
        "q": "Hạ cánh: l _ n d",
        "hint": "l a n d",
        "a": "land"
      },
      {
        "q": "Tiếp viên: flight ______",
        "hint": "s t e w a r d s",
        "a": "stewards"
      },
      {
        "q": "Đại lộ/Xa lộ: h _ _ h w a y",
        "hint": "h i g h w a y",
        "a": "highway"
      },
      {
        "q": "Chuyến đi: j _ _ r n e y",
        "hint": "j o u r n e y",
        "a": "journey"
      },
      {
        "q": "Bản đồ: m _ p",
        "hint": "m a p",
        "a": "map"
      }
    ],
    "speaking": [
      {
        "text": "Can I have a return ticket to Oxford please?",
        "trans": "Cho tôi xin một vé khứ hồi đi Oxford được không?"
      },
      {
        "text": "The train departs from platform 3 and arrives in London at 5 PM.",
        "trans": "Đoàn tàu khởi hành từ sân ga số 3 và đến London lúc 5 giờ chiều."
      },
      {
        "text": "We need to check in one hour before the plane takes off.",
        "trans": "Chúng ta cần làm thủ tục một tiếng trước khi máy bay cất cánh."
      },
      {
        "text": "The plane landed safely in heavy rain at Tokyo airport.",
        "trans": "Máy bay đã hạ cánh an toàn trong cơn mưa lớn tại sân bay Tokyo."
      },
      {
        "text": "Tim booked a seat in advance on the express train.",
        "trans": "Tim đã đặt một chỗ ngồi trước trên chuyến tàu tốc hành."
      }
    ]
  },
  {
    "id": 42,
    "title": "Unit 42: Notices",
    "description": "Học từ vựng về các biển báo, thông báo công cộng phổ biến (cấm hút thuốc, cấm vào, cửa đóng/mở, hỏng hóc).",
    "theory": [
      {
        "heading": "A. Common Notices (Các thông báo phổ biến)",
        "items": [
          {
            "word": "No smoking",
            "type": "Biển báo",
            "phonetic": "/nəʊ ˈsməʊkɪŋ/",
            "vi": "Cấm hút thuốc.",
            "example": "You can see 'No Smoking' in restaurants and planes."
          },
          {
            "word": "Out of order",
            "type": "Biển báo",
            "phonetic": "/aʊt ɒv ˈɔːdə/",
            "vi": "Máy hỏng, không hoạt động (dùng cho điện thoại công cộng, máy bán nước).",
            "example": "The public telephone is out of order."
          },
          {
            "word": "No camping / No parking",
            "type": "Biển báo",
            "phonetic": "No camping: /nəʊ ˈkæmpɪŋ/ | No parking: /nəʊ ˈpɑːkɪŋ/",
            "vi": "Cấm cắm trại / Cấm đỗ xe.",
            "example": "There is a 'No Parking' sign outside the gate."
          }
        ]
      },
      {
        "heading": "B. Doors and Shops (Cửa và cửa hàng)",
        "items": [
          {
            "word": "Push / Pull",
            "type": "Chỉ dẫn",
            "phonetic": "Push: /pʊʃ/ | Pull: /pʊl/",
            "vi": "Đẩy vào / Kéo ra (ở cánh cửa).",
            "example": "Push the door to enter, pull it to exit."
          },
          {
            "word": "Open / Closed",
            "type": "Trạng thái",
            "phonetic": "Open: /ˈəʊpən/ | Closed: /kləʊzd/",
            "vi": "Mở cửa / Đóng cửa.",
            "example": "The shop is closed on Sunday."
          },
          {
            "word": "Sale",
            "type": "Thông báo",
            "phonetic": "/seɪl/",
            "vi": "Đợt giảm giá, xả hàng.",
            "example": "The big summer sale starts today."
          }
        ]
      },
      {
        "heading": "C & D. Instructions & Information (Chỉ dẫn & Thông tin)",
        "items": [
          {
            "word": "Please pay here",
            "type": "Chỉ dẫn",
            "phonetic": "/pliːz peɪ hɪə/",
            "vi": "Vui lòng thanh toán tại đây (ở quầy thu ngân).",
            "example": "Take your items to the cash desk: 'Please pay here'."
          },
          {
            "word": "Please do not walk on the grass",
            "type": "Chỉ dẫn",
            "phonetic": "/pliːz duː nɒt wɔːk ɒn ðə ɡrɑːs/",
            "vi": "Vui lòng không đi bộ trên cỏ.",
            "example": "You see this notice in public parks."
          },
          {
            "word": "Queue this side",
            "type": "Chỉ dẫn",
            "phonetic": "/kjuː ðɪs saɪd/",
            "vi": "Xếp hàng bên này.",
            "example": "Please queue this side to buy tickets."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Prohibition (Cấm đoán)",
        "Instructions (Chỉ dẫn)",
        "Shop & Door Signs",
        "State (Trạng thái)"
      ],
      "items": [
        {
          "id": "i1",
          "word": "no smoking",
          "target": "Prohibition (Cấm đoán)",
          "vi": "cấm hút thuốc"
        },
        {
          "id": "i2",
          "word": "no entry",
          "target": "Prohibition (Cấm đoán)",
          "vi": "cấm vào"
        },
        {
          "id": "i3",
          "word": "no camping",
          "target": "Prohibition (Cấm đoán)",
          "vi": "cấm cắm trại"
        },
        {
          "id": "i4",
          "word": "no parking",
          "target": "Prohibition (Cấm đoán)",
          "vi": "cấm đỗ xe"
        },
        {
          "id": "i5",
          "word": "silence please",
          "target": "Prohibition (Cấm đoán)",
          "vi": "xin hãy giữ im lặng"
        },
        {
          "id": "i6",
          "word": "please pay here",
          "target": "Instructions (Chỉ dẫn)",
          "vi": "vui lòng thanh toán tại đây"
        },
        {
          "id": "i7",
          "word": "do not walk on the grass",
          "target": "Instructions (Chỉ dẫn)",
          "vi": "không đi lên cỏ"
        },
        {
          "id": "i8",
          "word": "queue this side",
          "target": "Instructions (Chỉ dẫn)",
          "vi": "xếp hàng phía bên này"
        },
        {
          "id": "i9",
          "word": "please ring for attention",
          "target": "Instructions (Chỉ dẫn)",
          "vi": "vui lòng rung chuông để được hỗ trợ"
        },
        {
          "id": "i10",
          "word": "mind your head",
          "target": "Instructions (Chỉ dẫn)",
          "vi": "chú ý cẩn thận cộc đầu"
        },
        {
          "id": "i11",
          "word": "keep right",
          "target": "Instructions (Chỉ dẫn)",
          "vi": "đi bên phải"
        },
        {
          "id": "i12",
          "word": "push",
          "target": "Shop & Door Signs",
          "vi": "đẩy vào"
        },
        {
          "id": "i13",
          "word": "pull",
          "target": "Shop & Door Signs",
          "vi": "kéo ra"
        },
        {
          "id": "i14",
          "word": "open",
          "target": "Shop & Door Signs",
          "vi": "mở cửa"
        },
        {
          "id": "i15",
          "word": "closed",
          "target": "Shop & Door Signs",
          "vi": "đóng cửa"
        },
        {
          "id": "i16",
          "word": "sale",
          "target": "Shop & Door Signs",
          "vi": "giảm giá"
        },
        {
          "id": "i17",
          "word": "entrance",
          "target": "Shop & Door Signs",
          "vi": "lối vào"
        },
        {
          "id": "i18",
          "word": "exit",
          "target": "Shop & Door Signs",
          "vi": "lối ra"
        },
        {
          "id": "i19",
          "word": "out of order",
          "target": "State (Trạng thái)",
          "vi": "máy bị hỏng"
        },
        {
          "id": "i20",
          "word": "free",
          "target": "State (Trạng thái)",
          "vi": "miễn phí"
        },
        {
          "id": "i21",
          "word": "vacant",
          "target": "State (Trạng thái)",
          "vi": "trống (nhà vệ sinh)"
        },
        {
          "id": "i22",
          "word": "occupied",
          "target": "State (Trạng thái)",
          "vi": "đã có người (nhà vệ sinh)"
        },
        {
          "id": "i23",
          "word": "no vacancies",
          "target": "State (Trạng thái)",
          "vi": "hết phòng trống (khách sạn)"
        },
        {
          "id": "i24",
          "word": "wc / toilets",
          "target": "Shop & Door Signs",
          "vi": "nhà vệ sinh"
        },
        {
          "id": "i25",
          "word": "gentlemen / men",
          "target": "Shop & Door Signs",
          "vi": "nhà vệ sinh nam"
        },
        {
          "id": "i26",
          "word": "ladies / women",
          "target": "Shop & Door Signs",
          "vi": "nhà vệ sinh nữ"
        },
        {
          "id": "i27",
          "word": "out of stock",
          "target": "State (Trạng thái)",
          "vi": "hết hàng"
        },
        {
          "id": "i28",
          "word": "sold out",
          "target": "State (Trạng thái)",
          "vi": "đã bán hết"
        },
        {
          "id": "i29",
          "word": "broken",
          "target": "State (Trạng thái)",
          "vi": "bị vỡ / hỏng"
        },
        {
          "id": "i30",
          "word": "do not touch",
          "target": "Prohibition (Cấm đoán)",
          "vi": "không được chạm vào"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. The telephone doesn't work. The sign says: _____.",
        "options": [
          "Out of stock",
          "Out of order",
          "Closed",
          "No entry"
        ],
        "a": "Out of order"
      },
      {
        "q": "2. The shop is selling clothes cheaply today. The window says: _____.",
        "options": [
          "Sale",
          "Push",
          "Closed",
          "No parking"
        ],
        "a": "Sale"
      },
      {
        "q": "3. You want to open a door. The sign says 'PULL'. You must _____ the door.",
        "options": [
          "push",
          "pull",
          "kick",
          "lift"
        ],
        "a": "pull"
      },
      {
        "q": "4. You want to enter a building. The door says 'PUSH'. You must _____ the door.",
        "options": [
          "pull",
          "push",
          "touch",
          "open"
        ],
        "a": "push"
      },
      {
        "q": "5. In a public park, you see: 'Please do not walk on the _____'.",
        "options": [
          "trees",
          "flowers",
          "grass",
          "roads"
        ],
        "a": "grass"
      },
      {
        "q": "6. At the supermarket checkout, you see: 'Please pay _____'.",
        "options": [
          "here",
          "now",
          "there",
          "cash"
        ],
        "a": "here"
      },
      {
        "q": "7. You want to go inside a shop. The sign says 'CLOSED'. Can you go in?",
        "options": [
          "Yes, it is open.",
          "No, it is closed.",
          "Yes, but only for one person.",
          "No, it is out of order."
        ],
        "a": "No, it is closed."
      },
      {
        "q": "8. The sign says 'NO PARKING'. This means you cannot _____.",
        "options": [
          "smoke here",
          "park your car here",
          "camp here",
          "walk here"
        ],
        "a": "park your car here"
      },
      {
        "q": "9. In the museum, you see: 'Please do not _____ the pictures'.",
        "options": [
          "look",
          "see",
          "touch",
          "buy"
        ],
        "a": "touch"
      },
      {
        "q": "10. In a library or hospital, you see: '_____ please'.",
        "options": [
          "Silence",
          "Noise",
          "Shout",
          "Talk"
        ],
        "a": "Silence"
      },
      {
        "q": "11. The toilet door says 'OCCUPIED'. This means _____.",
        "options": [
          "it is empty",
          "someone is inside",
          "it is out of order",
          "it is closed"
        ],
        "a": "someone is inside"
      },
      {
        "q": "12. The toilet door says 'VACANT'. This means _____.",
        "options": [
          "it is empty",
          "someone is inside",
          "it is broken",
          "it is dirty"
        ],
        "a": "it is empty"
      },
      {
        "q": "13. In front of a hotel, you see 'NO VACANCIES'. This means _____.",
        "options": [
          "no empty rooms",
          "no parking allowed",
          "no smoking inside",
          "no entrance"
        ],
        "a": "no empty rooms"
      },
      {
        "q": "14. A ticket office sign says 'Queue this side'. You must _____.",
        "options": [
          "run on this side",
          "sit on this side",
          "stand in a line on this side",
          "pay here"
        ],
        "a": "stand in a line on this side"
      },
      {
        "q": "15. The door to exit a building has a sign: _____.",
        "options": [
          "Entrance",
          "Exit",
          "Push",
          "Pull"
        ],
        "a": "Exit"
      },
      {
        "q": "16. The door to go inside a building has a sign: _____.",
        "options": [
          "Exit",
          "Entrance",
          "No entry",
          "Closed"
        ],
        "a": "Entrance"
      }
    ],
    "typingGame": [
      {
        "q": "Cấm hút thuốc: no ______",
        "hint": "s m o k i n g",
        "a": "smoking"
      },
      {
        "q": "Cấm vào: no ______",
        "hint": "e n t r y",
        "a": "entry"
      },
      {
        "q": "Máy bị hỏng: out of ______",
        "hint": "o r d e r",
        "a": "order"
      },
      {
        "q": "Đẩy cửa: p _ s h",
        "hint": "p u s h",
        "a": "push"
      },
      {
        "q": "Kéo cửa: p _ l l",
        "hint": "p u l l",
        "a": "pull"
      },
      {
        "q": "Đóng cửa: c _ o s _ d",
        "hint": "c l o s e d",
        "a": "closed"
      },
      {
        "q": "Mở cửa: o _ e n",
        "hint": "o p e n",
        "a": "open"
      },
      {
        "q": "Giảm giá: s _ l e",
        "hint": "s a l e",
        "a": "sale"
      },
      {
        "q": "Lối vào: e _ t r _ n c e",
        "hint": "e n t r a n c e",
        "a": "entrance"
      },
      {
        "q": "Lối ra: e _ i t",
        "hint": "e x i t",
        "a": "exit"
      },
      {
        "q": "Không đi lên cỏ: do not walk on the ______",
        "hint": "g r a s s",
        "a": "grass"
      },
      {
        "q": "Thanh toán tại đây: please pay ______",
        "hint": "h e r e",
        "a": "here"
      },
      {
        "q": "Xếp hàng bên này: queue this ______",
        "hint": "s i d e",
        "a": "side"
      },
      {
        "q": "Im lặng xin vui lòng: s _ l _ n c e please",
        "hint": "s i l e n c e",
        "a": "silence"
      },
      {
        "q": "Không chạm vào: do not ______",
        "hint": "t o u c h",
        "a": "touch"
      },
      {
        "q": "Đang sử dụng (toilet): o _ c _ p _ e d",
        "hint": "o c c u p i e d",
        "a": "occupied"
      },
      {
        "q": "Còn trống (toilet): v _ c _ n t",
        "hint": "v a c a n t",
        "a": "vacant"
      },
      {
        "q": "Hết phòng trống: no ______",
        "hint": "v a c a n c i e s",
        "a": "vacancies"
      },
      {
        "q": "Rung chuông: please ______ for attention",
        "hint": "r i n g",
        "a": "ring"
      },
      {
        "q": "Cấm cắm trại: no ______",
        "hint": "c a m p i n g",
        "a": "camping"
      }
    ],
    "speaking": [
      {
        "text": "The public telephone is out of order. I have to find another one.",
        "trans": "Điện thoại công cộng bị hỏng rồi. Tôi phải tìm một cái khác."
      },
      {
        "text": "Push the door to enter the shop, and pull it when you leave.",
        "trans": "Hãy đẩy cửa để vào cửa hàng, và kéo nó ra khi bạn ra về."
      },
      {
        "text": "Excuse me, where is the exit of the building? - Just follow the 'Exit' sign.",
        "trans": "Xin lỗi, lối ra của tòa nhà ở đâu? - Hãy đi theo biển báo 'Lối ra'."
      },
      {
        "text": "The sign in the park says: 'Please do not walk on the grass'.",
        "trans": "Biển báo trong công viên ghi: 'Vui lòng không đi bộ trên cỏ'."
      },
      {
        "text": "Please queue this side to check in your baggage.",
        "trans": "Vui lòng xếp hàng bên này để làm thủ tục ký gửi hành lý."
      }
    ]
  },
  {
    "id": 43,
    "title": "Unit 43: Food and drink",
    "description": "Học từ vựng tiếng Anh về đồ ăn hằng ngày, hoa quả, rau củ và các loại thức uống quen thuộc.",
    "theory": [
      {
        "heading": "A. Everyday food (Thức ăn hằng ngày)",
        "items": [
          {
            "word": "bread / rice / pasta",
            "type": "Danh từ",
            "phonetic": "/bred/ /raɪs/ /ˈpæs.tə/",
            "vi": "Bánh mì / Cơm, gạo / Mì ống.",
            "example": "In China, most people eat rice. In Italy, pasta is very popular."
          },
          {
            "word": "meat / fish",
            "type": "Danh từ",
            "phonetic": "/miːt/ /fɪʃ/",
            "vi": "Thịt / Cá.",
            "example": "Some people do not eat meat or fish."
          }
        ]
      },
      {
        "heading": "B. Popular food & Fast food (Đồ ăn nhanh)",
        "items": [
          {
            "word": "hot-dog / hamburger / pizza",
            "type": "Danh từ",
            "phonetic": "hot-dog: /ˈhɒtdɒɡ/ | hamburger: /ˈhæmbɜːɡə/ | pizza: /ˈpiːtsə/",
            "vi": "Bánh mì kẹp xúc xích / Hamburgers / Bánh pizza.",
            "example": "Young people love fast food like pizza and hot-dogs."
          },
          {
            "word": "fish and chips",
            "type": "Danh từ",
            "phonetic": "/fɪʃ ænd tʃɪps/",
            "vi": "Cá chiên kèm khoai tây chiên (Món ăn truyền thống của người Anh).",
            "example": "Most British people like fish and chips."
          }
        ]
      },
      {
        "heading": "C. Fruit and vegetables (Hoa quả & Rau củ)",
        "items": [
          {
            "word": "carrot / bean / potato / tomato",
            "type": "Rau củ",
            "phonetic": "carrot: /ˈkærət/ | bean: /biːn/ | potato: /pəˈteɪtəʊ/ | tomato: /təˈmɑːtəʊ/",
            "vi": "Cà rốt / Hạt đậu / Khoai tây / Cà chua.",
            "example": "Vegetables are good for you."
          },
          {
            "word": "apple / banana / pear / grape / strawberry",
            "type": "Hoa quả",
            "phonetic": "apple: /ˈæpl/ | banana: /bəˈnɑːnə/ | pear: /peə/ | grape: /ɡreɪp/ | strawberry: /ˈstrɔːbəri/",
            "vi": "Quả táo / Chuối / Lê / Nho / Dâu tây.",
            "example": "Fruit is also good for you (Fruit ở dạng số ít không đếm được nói chung)."
          }
        ]
      },
      {
        "heading": "D. Drinks (Đồ uống)",
        "items": [
          {
            "word": "tea / coffee / milk / fruit juice",
            "type": "Đồ uống",
            "phonetic": "tea: /tiː/ | coffee: /ˈkɒfi/ | milk: /mɪlk/ | fruit juice: /fruːt dʒuːs/",
            "vi": "Trà / Cà phê / Sữa / Nước ép hoa quả.",
            "example": "I drink a glass of milk in the morning."
          },
          {
            "word": "beer / wine / mineral water",
            "type": "Đồ uống",
            "phonetic": "beer: /bɪə/ | wine: /waɪn/ | mineral water: /ˈmɪnərəl ˈwɔːtə/",
            "vi": "Bia / Rượu vang / Nước khoáng.",
            "example": "Would you like a glass of red wine?"
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Everyday Food (Đồ ăn)",
        "Vegetables (Rau củ)",
        "Fruits (Trái cây)",
        "Drinks (Thức uống)"
      ],
      "items": [
        {
          "id": "i1",
          "word": "bread",
          "target": "Everyday Food (Đồ ăn)",
          "vi": "bánh mì"
        },
        {
          "id": "i2",
          "word": "rice",
          "target": "Everyday Food (Đồ ăn)",
          "vi": "cơm, gạo"
        },
        {
          "id": "i3",
          "word": "pasta",
          "target": "Everyday Food (Đồ ăn)",
          "vi": "mì ống"
        },
        {
          "id": "i4",
          "word": "meat",
          "target": "Everyday Food (Đồ ăn)",
          "vi": "thịt"
        },
        {
          "id": "i5",
          "word": "fish",
          "target": "Everyday Food (Đồ ăn)",
          "vi": "cá"
        },
        {
          "id": "i6",
          "word": "pizza",
          "target": "Everyday Food (Đồ ăn)",
          "vi": "bánh pizza"
        },
        {
          "id": "i7",
          "word": "hamburger",
          "target": "Everyday Food (Đồ ăn)",
          "vi": "bánh kẹp thịt"
        },
        {
          "id": "i8",
          "word": "hot-dog",
          "target": "Everyday Food (Đồ ăn)",
          "vi": "bánh kẹp xúc xích"
        },
        {
          "id": "i9",
          "word": "carrot",
          "target": "Vegetables (Rau củ)",
          "vi": "củ cà rốt"
        },
        {
          "id": "i10",
          "word": "bean",
          "target": "Vegetables (Rau củ)",
          "vi": "hạt đậu"
        },
        {
          "id": "i11",
          "word": "potato",
          "target": "Vegetables (Rau củ)",
          "vi": "củ khoai tây"
        },
        {
          "id": "i12",
          "word": "tomato",
          "target": "Vegetables (Rau củ)",
          "vi": "quả cà chua"
        },
        {
          "id": "i13",
          "word": "peas",
          "target": "Vegetables (Rau củ)",
          "vi": "đậu hà lan"
        },
        {
          "id": "i14",
          "word": "onion",
          "target": "Vegetables (Rau củ)",
          "vi": "củ hành tây"
        },
        {
          "id": "i15",
          "word": "garlic",
          "target": "Vegetables (Rau củ)",
          "vi": "tỏi"
        },
        {
          "id": "i16",
          "word": "mushroom",
          "target": "Vegetables (Rau củ)",
          "vi": "nấm"
        },
        {
          "id": "i17",
          "word": "apple",
          "target": "Fruits (Trái cây)",
          "vi": "quả táo"
        },
        {
          "id": "i18",
          "word": "banana",
          "target": "Fruits (Trái cây)",
          "vi": "quả chuối"
        },
        {
          "id": "i19",
          "word": "pear",
          "target": "Fruits (Trái cây)",
          "vi": "quả lê"
        },
        {
          "id": "i20",
          "word": "grapes",
          "target": "Fruits (Trái cây)",
          "vi": "chùm nho"
        },
        {
          "id": "i21",
          "word": "strawberry",
          "target": "Fruits (Trái cây)",
          "vi": "quả dâu tây"
        },
        {
          "id": "i22",
          "word": "pineapple",
          "target": "Fruits (Trái cây)",
          "vi": "quả dứa / thơm"
        },
        {
          "id": "i23",
          "word": "tea",
          "target": "Drinks (Thức uống)",
          "vi": "trà"
        },
        {
          "id": "i24",
          "word": "coffee",
          "target": "Drinks (Thức uống)",
          "vi": "cà phê"
        },
        {
          "id": "i25",
          "word": "milk",
          "target": "Drinks (Thức uống)",
          "vi": "sữa"
        },
        {
          "id": "i26",
          "word": "fruit juice",
          "target": "Drinks (Thức uống)",
          "vi": "nước ép quả"
        },
        {
          "id": "i27",
          "word": "beer",
          "target": "Drinks (Thức uống)",
          "vi": "bia"
        },
        {
          "id": "i28",
          "word": "wine",
          "target": "Drinks (Thức uống)",
          "vi": "rượu vang"
        },
        {
          "id": "i29",
          "word": "mineral water",
          "target": "Drinks (Thức uống)",
          "vi": "nước khoáng"
        },
        {
          "id": "i30",
          "word": "butter",
          "target": "Everyday Food (Đồ ăn)",
          "vi": "bơ"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. In Italy, _____ is very popular (long noodle strings).",
        "options": [
          "rice",
          "bread",
          "pasta",
          "banana"
        ],
        "a": "pasta"
      },
      {
        "q": "2. In China, most people eat _____ as their main food.",
        "options": [
          "bread",
          "rice",
          "potatoes",
          "pasta"
        ],
        "a": "rice"
      },
      {
        "q": "3. 'Fish and chips' is a traditional dish from _____.",
        "options": [
          "Italy",
          "China",
          "Britain",
          "France"
        ],
        "a": "Britain"
      },
      {
        "q": "4. Which of the following is NOT a vegetable?",
        "options": [
          "carrot",
          "pear",
          "tomato",
          "potato"
        ],
        "a": "pear"
      },
      {
        "q": "5. Which of the following is NOT a fruit?",
        "options": [
          "strawberry",
          "garlic",
          "banana",
          "pineapple"
        ],
        "a": "garlic"
      },
      {
        "q": "6. 'Vegetables are good for you.' - 'Fruit _____ also good for you.' (to be)",
        "options": [
          "is",
          "are",
          "be",
          "were"
        ],
        "a": "is"
      },
      {
        "q": "7. A long yellow fruit that monkeys love to eat is a _____.",
        "options": [
          "pear",
          "grape",
          "banana",
          "strawberry"
        ],
        "a": "banana"
      },
      {
        "q": "8. A round red or green fruit that is crunchy is an _____.",
        "options": [
          "apple",
          "pear",
          "pineapple",
          "onion"
        ],
        "a": "apple"
      },
      {
        "q": "9. People often cry when they cut _____ (a vegetable).",
        "options": [
          "potatoes",
          "carrots",
          "onions",
          "beans"
        ],
        "a": "onions"
      },
      {
        "q": "10. Potato chips are made from _____.",
        "options": [
          "carrots",
          "tomatoes",
          "potatoes",
          "mushrooms"
        ],
        "a": "potatoes"
      },
      {
        "q": "11. 'Mineral _____' has no calories and is very healthy.",
        "options": [
          "wine",
          "beer",
          "water",
          "juice"
        ],
        "a": "water"
      },
      {
        "q": "12. In the morning, many adults drink hot _____ to stay awake.",
        "options": [
          "milk",
          "coffee",
          "beer",
          "wine"
        ],
        "a": "coffee"
      },
      {
        "q": "13. Children drink a lot of white _____ for strong bones.",
        "options": [
          "juice",
          "milk",
          "wine",
          "tea"
        ],
        "a": "milk"
      },
      {
        "q": "14. A hamburger has a slice of _____ (meat) inside.",
        "options": [
          "vegetable",
          "fruit",
          "beef / meat",
          "bread"
        ],
        "a": "beef / meat"
      },
      {
        "q": "15. The red fruit we often use to make ketchup (sốt) is _____.",
        "options": [
          "tomato",
          "apple",
          "strawberry",
          "grape"
        ],
        "a": "tomato"
      },
      {
        "q": "16. Which of the following is an alcoholic drink?",
        "options": [
          "milk",
          "fruit juice",
          "mineral water",
          "wine"
        ],
        "a": "wine"
      }
    ],
    "typingGame": [
      {
        "q": "Bánh mì: b _ _ a d",
        "hint": "b r e a d",
        "a": "bread"
      },
      {
        "q": "Cơm, gạo: r _ c e",
        "hint": "r i c e",
        "a": "rice"
      },
      {
        "q": "Mì ống: p _ s t a",
        "hint": "p a s t a",
        "a": "pasta"
      },
      {
        "q": "Trái chuối: b _ n _ n a",
        "hint": "b a n a n a",
        "a": "banana"
      },
      {
        "q": "Quả táo: a _ _ l e",
        "hint": "a p p l e",
        "a": "apple"
      },
      {
        "q": "Quả lê: p _ a r",
        "hint": "p e a r",
        "a": "pear"
      },
      {
        "q": "Khoai tây: p _ t _ t o",
        "hint": "p o t a t o",
        "a": "potato"
      },
      {
        "q": "Cà chua: t _ m _ t o",
        "hint": "t o m a t o",
        "a": "tomato"
      },
      {
        "q": "Cà rốt: c _ r _ o t",
        "hint": "c a r r o t",
        "a": "carrot"
      },
      {
        "q": "Hành tây: o _ i o n",
        "hint": "o n i o n",
        "a": "onion"
      },
      {
        "q": "Tỏi: g _ r l _ c",
        "hint": "g a r l i c",
        "a": "garlic"
      },
      {
        "q": "Nấm: m _ s h r _ o m",
        "hint": "m u s h r o o m",
        "a": "mushroom"
      },
      {
        "q": "Dâu tây: s _ r _ w b _ r r y",
        "hint": "s t r a w b e r r y",
        "a": "strawberry"
      },
      {
        "q": "Quả dứa: p _ n _ a p p l e",
        "hint": "p i n e a p p l e",
        "a": "pineapple"
      },
      {
        "q": "Rượu vang: w _ n e",
        "hint": "w i n e",
        "a": "wine"
      },
      {
        "q": "Bia: b _ e r",
        "hint": "b e e r",
        "a": "beer"
      },
      {
        "q": "Sữa: m _ l k",
        "hint": "m i l k",
        "a": "milk"
      },
      {
        "q": "Trà: t _ a",
        "hint": "t e a",
        "a": "tea"
      },
      {
        "q": "Cà phê: c _ f f _ e",
        "hint": "c o f f e e",
        "a": "coffee"
      },
      {
        "q": "Bơ: b _ t t _ r",
        "hint": "b u t t e r",
        "a": "butter"
      }
    ],
    "speaking": [
      {
        "text": "In China, most people eat rice. In Italy, pasta is very popular.",
        "trans": "Ở Trung Quốc, hầu hết mọi người ăn cơm. Ở Ý, mì ống rất phổ biến."
      },
      {
        "text": "Vegetables are good for you, and fruit is also very healthy.",
        "trans": "Rau củ tốt cho bạn, và hoa quả cũng rất lành mạnh."
      },
      {
        "text": "I usually have a cup of coffee and some bread for breakfast.",
        "trans": "Tôi thường uống một tách cà phê và ăn một ít bánh mì vào bữa sáng."
      },
      {
        "text": "Would you like a glass of red wine or a mineral water?",
        "trans": "Bạn có muốn một ly rượu vang đỏ hay nước khoáng không?"
      },
      {
        "text": "He bought some bananas, apples, pears and strawberries.",
        "trans": "Anh ấy đã mua một ít chuối, táo, lê và dâu tây."
      }
    ]
  },
  {
    "id": 44,
    "title": "Unit 44: In the kitchen",
    "description": "Học từ vựng về các đồ gia dụng trong bếp (tủ lạnh, bồn rửa, bếp nấu) và dụng cụ ăn uống (dao, dĩa, thìa, cốc).",
    "theory": [
      {
        "heading": "A. What's in the kitchen? (Có gì trong bếp?)",
        "items": [
          {
            "word": "fridge / freezer",
            "type": "Gia dụng",
            "phonetic": "/frɪdʒ/ /ˈfriː.zɚ/",
            "vi": "Tủ lạnh / Tủ đông.",
            "example": "Keep the milk in the fridge. The ice is in the freezer."
          },
          {
            "word": "cooker / microwave",
            "type": "Gia dụng",
            "phonetic": "/ˈkʊk.ɚ/ /ˈmaɪ.kroʊ.weɪv/",
            "vi": "Bếp nấu / Lò vi sóng.",
            "example": "Cook dinner on the cooker. Heat the soup in the microwave."
          },
          {
            "word": "sink / cupboard / taps",
            "type": "Đồ đạc",
            "phonetic": "/sɪŋk/ /ˈkʌb.ɚd/ /tæps/",
            "vi": "Bồn rửa chén / Tủ ly chén / Vòi nước.",
            "example": "Put the dirty dishes in the sink. Turn the tap on."
          }
        ]
      },
      {
        "heading": "B. Tools we use in the kitchen (Dụng cụ nấu ăn)",
        "items": [
          {
            "word": "saucepan / frying pan",
            "type": "Dụng cụ",
            "phonetic": "/ˈsɑːs.pæn/ /ˈfraɪ.ɪŋ ˌpæn/",
            "vi": "Nồi sâu lòng / Chảo rán.",
            "example": "Boil potatoes in a saucepan. Fry eggs in a frying pan."
          },
          {
            "word": "washing-up liquid / teapot",
            "type": "Dụng cụ",
            "phonetic": "washing-up liquid: /ˌwɒʃɪŋˈʌp ˈlɪkwɪd/ | teapot: /ˈtiːpɒt/",
            "vi": "Nước rửa chén / Ấm pha trà.",
            "example": "Wash the dishes with washing-up liquid. Put tea in the teapot."
          }
        ]
      },
      {
        "heading": "C. Tools for eating and drinking (Dụng cụ ăn uống)",
        "items": [
          {
            "word": "cup / plate / bowl / saucer",
            "type": "Ăn uống",
            "phonetic": "cup: /kʌp/ | plate: /pleɪt/ | bowl: /bəʊl/ | saucer: /ˈsɔːsə/",
            "vi": "Cái tách / Đĩa / Bát / Đĩa lót tách.",
            "example": "Pour tea into the cup. Eat soup from a bowl."
          },
          {
            "word": "knife / fork / spoon / chopsticks",
            "type": "Ăn uống",
            "phonetic": "knife: /naɪf/ | fork: /fɔːk/ | spoon: /spuːn/ | chopsticks: /ˈtʃɒpstɪks/",
            "vi": "Con dao / Cái nĩa / Cái thìa / Đôi đũa.",
            "example": "Cut meat with a knife. Eat rice with chopsticks."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Kitchen Appliances (Gia dụng)",
        "Cooking Tools (Nấu nướng)",
        "Tableware (Đồ ăn uống)",
        "Kitchen Parts"
      ],
      "items": [
        {
          "id": "i1",
          "word": "fridge",
          "target": "Kitchen Appliances (Gia dụng)",
          "vi": "tủ lạnh"
        },
        {
          "id": "i2",
          "word": "freezer",
          "target": "Kitchen Appliances (Gia dụng)",
          "vi": "tủ đông"
        },
        {
          "id": "i3",
          "word": "cooker",
          "target": "Kitchen Appliances (Gia dụng)",
          "vi": "bếp nấu"
        },
        {
          "id": "i4",
          "word": "microwave",
          "target": "Kitchen Appliances (Gia dụng)",
          "vi": "lò vi sóng"
        },
        {
          "id": "i5",
          "word": "coffee maker",
          "target": "Kitchen Appliances (Gia dụng)",
          "vi": "máy pha cà phê"
        },
        {
          "id": "i6",
          "word": "dishwasher",
          "target": "Kitchen Appliances (Gia dụng)",
          "vi": "máy rửa bát"
        },
        {
          "id": "i7",
          "word": "saucepan",
          "target": "Cooking Tools (Nấu nướng)",
          "vi": "cái xoong / nồi sâu"
        },
        {
          "id": "i8",
          "word": "frying pan",
          "target": "Cooking Tools (Nấu nướng)",
          "vi": "chảo rán"
        },
        {
          "id": "i9",
          "word": "teapot",
          "target": "Cooking Tools (Nấu nướng)",
          "vi": "ấm pha trà"
        },
        {
          "id": "i10",
          "word": "kettle",
          "target": "Cooking Tools (Nấu nướng)",
          "vi": "ấm đun nước"
        },
        {
          "id": "i11",
          "word": "cup",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "tách uống trà/cà phê"
        },
        {
          "id": "i12",
          "word": "mug",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "cốc lớn có quai"
        },
        {
          "id": "i13",
          "word": "plate",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "cái đĩa"
        },
        {
          "id": "i14",
          "word": "bowl",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "cái bát / tô"
        },
        {
          "id": "i15",
          "word": "saucer",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "đĩa lót cốc"
        },
        {
          "id": "i16",
          "word": "knife",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "con dao"
        },
        {
          "id": "i17",
          "word": "fork",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "cái nĩa"
        },
        {
          "id": "i18",
          "word": "spoon",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "cái thìa"
        },
        {
          "id": "i19",
          "word": "chopsticks",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "đôi đũa"
        },
        {
          "id": "i20",
          "word": "glass",
          "target": "Tableware (Đồ ăn uống)",
          "vi": "cốc thủy tinh"
        },
        {
          "id": "i21",
          "word": "sink",
          "target": "Kitchen Parts",
          "vi": "bồn rửa bát"
        },
        {
          "id": "i22",
          "word": "cupboard",
          "target": "Kitchen Parts",
          "vi": "tủ chạn bát đĩa"
        },
        {
          "id": "i23",
          "word": "tap",
          "target": "Kitchen Parts",
          "vi": "vòi nước"
        },
        {
          "id": "i24",
          "word": "worktop",
          "target": "Kitchen Parts",
          "vi": "bàn bếp làm việc"
        },
        {
          "id": "i25",
          "word": "shelf",
          "target": "Kitchen Parts",
          "vi": "giá kệ đựng đồ"
        },
        {
          "id": "i26",
          "word": "wastebin",
          "target": "Kitchen Parts",
          "vi": "thùng rác"
        },
        {
          "id": "i27",
          "word": "washing-up liquid",
          "target": "Cooking Tools (Nấu nướng)",
          "vi": "nước rửa bát"
        },
        {
          "id": "i28",
          "word": "cloth",
          "target": "Cooking Tools (Nấu nướng)",
          "vi": "khăn lau bếp"
        },
        {
          "id": "i29",
          "word": "tea towel",
          "target": "Cooking Tools (Nấu nướng)",
          "vi": "khăn lau bát đĩa"
        },
        {
          "id": "i30",
          "word": "kitchen roll",
          "target": "Cooking Tools (Nấu nướng)",
          "vi": "cuộn giấy lau bếp"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. To fry an egg, you should use a _____.",
        "options": [
          "saucepan",
          "frying pan",
          "teapot",
          "bowl"
        ],
        "a": "frying pan"
      },
      {
        "q": "2. To boil potatoes in water, you should use a _____.",
        "options": [
          "frying pan",
          "saucepan",
          "saucer",
          "cup"
        ],
        "a": "saucepan"
      },
      {
        "q": "3. Put the dirty plates and glasses in the _____ to wash them.",
        "options": [
          "cupboard",
          "sink",
          "fridge",
          "freezer"
        ],
        "a": "sink"
      },
      {
        "q": "4. Keep the milk in the _____ so it stays cold and fresh.",
        "options": [
          "cooker",
          "microwave",
          "fridge",
          "cupboard"
        ],
        "a": "fridge"
      },
      {
        "q": "5. To make coffee quickly, I boil water in a _____.",
        "options": [
          "teapot",
          "kettle",
          "saucepan",
          "cup"
        ],
        "a": "kettle"
      },
      {
        "q": "6. You use a _____ to cut bread or meat.",
        "options": [
          "fork",
          "spoon",
          "knife",
          "chopsticks"
        ],
        "a": "knife"
      },
      {
        "q": "7. You use a _____ to eat soup.",
        "options": [
          "knife",
          "fork",
          "spoon",
          "chopsticks"
        ],
        "a": "spoon"
      },
      {
        "q": "8. In Asia, people eat rice using _____.",
        "options": [
          "knives",
          "forks",
          "spoons",
          "chopsticks"
        ],
        "a": "chopsticks"
      },
      {
        "q": "9. Pour the hot tea from the _____ into the cup.",
        "options": [
          "teapot",
          "frying pan",
          "sink",
          "freezer"
        ],
        "a": "teapot"
      },
      {
        "q": "10. Turn the _____ on to get cold or hot water.",
        "options": [
          "cooker",
          "fridge",
          "tap",
          "microwave"
        ],
        "a": "tap"
      },
      {
        "q": "11. Keep the ice-cream in the _____ so it doesn't melt.",
        "options": [
          "fridge",
          "freezer",
          "sink",
          "cupboard"
        ],
        "a": "freezer"
      },
      {
        "q": "12. Plates, cups, and bowls are kept in the kitchen _____ (with doors).",
        "options": [
          "sink",
          "cupboard",
          "cooker",
          "kettle"
        ],
        "a": "cupboard"
      },
      {
        "q": "13. I clean the plates using _____ liquid.",
        "options": [
          "washing-up",
          "washing",
          "soapy",
          "water"
        ],
        "a": "washing-up"
      },
      {
        "q": "14. A small plate that you put under a tea cup is a _____.",
        "options": [
          "saucer",
          "bowl",
          "plate",
          "tray"
        ],
        "a": "saucer"
      },
      {
        "q": "15. I dry the wet plates using a ______ towel.",
        "options": [
          "bath",
          "hand",
          "tea",
          "face"
        ],
        "a": "tea"
      },
      {
        "q": "16. Heat up the cold pizza in the _____ for 1 minute.",
        "options": [
          "cooker",
          "fridge",
          "microwave",
          "dishwasher"
        ],
        "a": "microwave"
      }
    ],
    "typingGame": [
      {
        "q": "Tủ lạnh: f _ _ d g e",
        "hint": "f r i d g e",
        "a": "fridge"
      },
      {
        "q": "Tủ đông: f _ _ e z _ r",
        "hint": "f r e e z e r",
        "a": "freezer"
      },
      {
        "q": "Lò vi sóng: m _ c r _ w a v e",
        "hint": "m i c r o w a v e",
        "a": "microwave"
      },
      {
        "q": "Bếp nấu: c _ o k _ r",
        "hint": "c o o k e r",
        "a": "cooker"
      },
      {
        "q": "Bồn rửa bát: s _ n k",
        "hint": "s i n k",
        "a": "sink"
      },
      {
        "q": "Tủ đựng ly chén: c _ p b _ a r d",
        "hint": "c u p b o a r d",
        "a": "cupboard"
      },
      {
        "q": "Xoong/nồi sâu: s _ u c _ p _ n",
        "hint": "s a u c e p a n",
        "a": "saucepan"
      },
      {
        "q": "Chảo rán: frying ______",
        "hint": "p a n",
        "a": "pan"
      },
      {
        "q": "Ấm pha trà: t _ _ p o t",
        "hint": "t e a p o t",
        "a": "teapot"
      },
      {
        "q": "Ấm đun nước: k _ t t l e",
        "hint": "k e t t l e",
        "a": "kettle"
      },
      {
        "q": "Vòi nước: t _ p",
        "hint": "t a p",
        "a": "tap"
      },
      {
        "q": "Cái tách: c _ p",
        "hint": "c u p",
        "a": "cup"
      },
      {
        "q": "Cái đĩa: p _ l a t e",
        "hint": "p l a t e",
        "a": "plate"
      },
      {
        "q": "Cái bát: b _ w l",
        "hint": "b o w l",
        "a": "bowl"
      },
      {
        "q": "Đĩa lót tách: s _ u c _ r",
        "hint": "s a u c e r",
        "a": "saucer"
      },
      {
        "q": "Con dao: k _ i f e",
        "hint": "k n i f e",
        "a": "knife"
      },
      {
        "q": "Cái nĩa: f _ o r k",
        "hint": "f o r k",
        "a": "fork"
      },
      {
        "q": "Cái thìa: s _ p o o n",
        "hint": "s p o o n",
        "a": "spoon"
      },
      {
        "q": "Đôi đũa: c _ o p s t _ c k s",
        "hint": "c h o p s t i c k s",
        "a": "chopsticks"
      },
      {
        "q": "Khăn lau bát đĩa: tea ______",
        "hint": "t o w e l",
        "a": "towel"
      }
    ],
    "speaking": [
      {
        "text": "Keep the milk in the fridge and the ice-cream in the freezer.",
        "trans": "Hãy giữ sữa trong tủ lạnh và kem trong tủ đông."
      },
      {
        "text": "Put the dirty dishes in the sink and wash them with washing-up liquid.",
        "trans": "Hãy để bát đĩa bẩn vào bồn rửa và rửa chúng bằng nước rửa chén."
      },
      {
        "text": "We use a knife and fork to eat steak, but chopsticks to eat rice.",
        "trans": "Chúng ta dùng dao và nĩa để ăn thịt bò tết, nhưng dùng đũa để ăn cơm."
      },
      {
        "text": "Can I help you with the washing-up? Where is the cloth?",
        "trans": "Tôi có thể giúp bạn rửa bát không? Khăn lau ở đâu thế?"
      },
      {
        "text": "Boil the soup in a saucepan, and fry the eggs in a frying pan.",
        "trans": "Hãy đun súp trong một chiếc nồi sâu lòng, và rán trứng trên một chiếc chảo rán."
      }
    ]
  },
  {
    "id": 45,
    "title": "Unit 45: In the bedroom and bathroom",
    "description": "Học từ vựng tiếng Anh về đồ nội thất phòng ngủ (giường, tủ quần áo) và phòng tắm (bồn tắm, vòi sen, xà bông, bàn chải), cũng như thói quen hằng ngày.",
    "theory": [
      {
        "heading": "A. The bedroom (Phòng ngủ)",
        "items": [
          {
            "word": "bed / alarm clock / wardrobe",
            "type": "Đồ đạc",
            "phonetic": "bed: /bed/ | alarm clock: /əˈlɑːm klɒk/ | wardrobe: /ˈwɔːdrəʊ/",
            "vi": "Giường ngủ / Đồng hồ báo thức / Tủ quần áo.",
            "example": "I wake up when the alarm clock rings. Hang your coat in the wardrobe."
          },
          {
            "word": "dressing table / chest of drawers / bedside table",
            "type": "Đồ đạc",
            "phonetic": "dressing table: /ˈdresɪŋ ˈteɪbl/ | chest of drawers: /tʃest ɒv drɔːz/ | bedside table: /ˈbedsaɪd ˈteɪbl/",
            "vi": "Bàn trang điểm / Tủ nhiều ngăn kéo / Bàn đầu giường.",
            "example": "Put the alarm clock on the bedside table."
          }
        ]
      },
      {
        "heading": "B. The bathroom (Phòng tắm)",
        "items": [
          {
            "word": "shower / bath / basin / toilet",
            "type": "Đồ đạc",
            "phonetic": "shower: /ˈʃaʊə/ | bath: /bɑːθ/ | basin: /ˈbeɪsn/ | toilet: /ˈtɔɪlət/",
            "vi": "Vòi sen / Bồn tắm / Bồn rửa mặt / Bồn cầu.",
            "example": "I have a shower in the morning. Put water in the basin."
          },
          {
            "word": "soap / shampoo / toothpaste / toothbrush / towel",
            "type": "Vật dụng",
            "phonetic": "soap: /səʊp/ | shampoo: /ʃæmˈpuː/ | toothpaste: /ˈtuːθpeɪst/ | toothbrush: /ˈtuːθbrʌʃ/ | towel: /ˈtaʊəl/",
            "vi": "Xà bông / Dầu gội / Kem đánh răng / Bàn chải / Khăn tắm.",
            "example": "Wash your hands with soap. Clean teeth with toothbrush and toothpaste."
          }
        ]
      },
      {
        "heading": "C. Joel's routine (Thói quen hằng ngày của Joel)",
        "items": [
          {
            "word": "wake up / get up / get dressed",
            "type": "Hành động",
            "phonetic": "wake up: /weɪk ʌp/ | get up: /ɡet ʌp/ | get dressed: /ɡet drest/",
            "vi": "Thức giấc / Thức dậy (ra khỏi giường) / Mặc quần áo.",
            "example": "Joel wakes up at 7, gets up at 7.15, and gets dressed."
          },
          {
            "word": "clean teeth / turn off the light / fall asleep",
            "type": "Hành động",
            "phonetic": "clean teeth: /kliːn tiːθ/ | turn off light: /tɜːn ɒf ðə laɪt/ | fall asleep: /fɔːl əˈsliːp/",
            "vi": "Đánh răng / Tắt đèn / Ngủ thiếp đi.",
            "example": "He cleans his teeth, turns off the light, and falls asleep."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Bedroom (Phòng ngủ)",
        "Bathroom (Phòng tắm)",
        "Physical Routine (Hành động)",
        "Toiletries (Vật dụng cá nhân)"
      ],
      "items": [
        {
          "id": "i1",
          "word": "bed",
          "target": "Bedroom (Phòng ngủ)",
          "vi": "giường ngủ"
        },
        {
          "id": "i2",
          "word": "wardrobe",
          "target": "Bedroom (Phòng ngủ)",
          "vi": "tủ quần áo"
        },
        {
          "id": "i3",
          "word": "bedside table",
          "target": "Bedroom (Phòng ngủ)",
          "vi": "bàn đầu giường"
        },
        {
          "id": "i4",
          "word": "dressing table",
          "target": "Bedroom (Phòng ngủ)",
          "vi": "bàn trang điểm"
        },
        {
          "id": "i5",
          "word": "chest of drawers",
          "target": "Bedroom (Phòng ngủ)",
          "vi": "tủ ngăn kéo"
        },
        {
          "id": "i6",
          "word": "alarm clock",
          "target": "Bedroom (Phòng ngủ)",
          "vi": "đồng hồ báo thức"
        },
        {
          "id": "i7",
          "word": "bedside lamp",
          "target": "Bedroom (Phòng ngủ)",
          "vi": "đèn ngủ đầu giường"
        },
        {
          "id": "i8",
          "word": "mirror",
          "target": "Bedroom (Phòng ngủ)",
          "vi": "cái gương"
        },
        {
          "id": "i9",
          "word": "pyjamas",
          "target": "Bedroom (Phòng ngủ)",
          "vi": "bộ đồ ngủ"
        },
        {
          "id": "i10",
          "word": "shower",
          "target": "Bathroom (Phòng tắm)",
          "vi": "vòi hoa sen"
        },
        {
          "id": "i11",
          "word": "bath",
          "target": "Bathroom (Phòng tắm)",
          "vi": "bồn tắm"
        },
        {
          "id": "i12",
          "word": "basin",
          "target": "Bathroom (Phòng tắm)",
          "vi": "bồn rửa mặt"
        },
        {
          "id": "i13",
          "word": "toilet",
          "target": "Bathroom (Phòng tắm)",
          "vi": "bồn cầu / nhà vệ sinh"
        },
        {
          "id": "i14",
          "word": "bath plug",
          "target": "Bathroom (Phòng tắm)",
          "vi": "nút chặn bồn tắm"
        },
        {
          "id": "i15",
          "word": "wake up",
          "target": "Physical Routine (Hành động)",
          "vi": "thức giấc"
        },
        {
          "id": "i16",
          "word": "get up",
          "target": "Physical Routine (Hành động)",
          "vi": "thức dậy (bước ra khỏi giường)"
        },
        {
          "id": "i17",
          "word": "get dressed",
          "target": "Physical Routine (Hành động)",
          "vi": "mặc quần áo"
        },
        {
          "id": "i18",
          "word": "get undressed",
          "target": "Physical Routine (Hành động)",
          "vi": "cởi quần áo"
        },
        {
          "id": "i19",
          "word": "clean teeth",
          "target": "Physical Routine (Hành động)",
          "vi": "đánh răng"
        },
        {
          "id": "i20",
          "word": "turn off light",
          "target": "Physical Routine (Hành động)",
          "vi": "tắt đèn"
        },
        {
          "id": "i21",
          "word": "fall asleep",
          "target": "Physical Routine (Hành động)",
          "vi": "ngủ thiếp đi"
        },
        {
          "id": "i22",
          "word": "soap",
          "target": "Toiletries (Vật dụng cá nhân)",
          "vi": "xà bông bánh"
        },
        {
          "id": "i23",
          "word": "shampoo",
          "target": "Toiletries (Vật dụng cá nhân)",
          "vi": "dầu gội đầu"
        },
        {
          "id": "i24",
          "word": "toothpaste",
          "target": "Toiletries (Vật dụng cá nhân)",
          "vi": "kem đánh răng"
        },
        {
          "id": "i25",
          "word": "toothbrush",
          "target": "Toiletries (Vật dụng cá nhân)",
          "vi": "bàn chải đánh răng"
        },
        {
          "id": "i26",
          "word": "towel",
          "target": "Toiletries (Vật dụng cá nhân)",
          "vi": "khăn tắm"
        },
        {
          "id": "i27",
          "word": "hairbrush",
          "target": "Toiletries (Vật dụng cá nhân)",
          "vi": "lược bàn tròn"
        },
        {
          "id": "i28",
          "word": "comb",
          "target": "Toiletries (Vật dụng cá nhân)",
          "vi": "cái lược chải tóc"
        },
        {
          "id": "i29",
          "word": "go upstairs",
          "target": "Physical Routine (Hành động)",
          "vi": "đi lên lầu"
        },
        {
          "id": "i30",
          "word": "go downstairs",
          "target": "Physical Routine (Hành động)",
          "vi": "đi xuống lầu"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. I open my eyes in the morning. I _____.",
        "options": [
          "wake up",
          "get up",
          "get dressed",
          "sleep"
        ],
        "a": "wake up"
      },
      {
        "q": "2. I step out of the bed onto the floor. I _____.",
        "options": [
          "wake up",
          "get up",
          "get undressed",
          "fall asleep"
        ],
        "a": "get up"
      },
      {
        "q": "3. I clean my teeth using a toothbrush and _____.",
        "options": [
          "soap",
          "shampoo",
          "toothpaste",
          "water"
        ],
        "a": "toothpaste"
      },
      {
        "q": "4. I wash my hair with _____.",
        "options": [
          "soap",
          "shampoo",
          "toothpaste",
          "conditioner"
        ],
        "a": "shampoo"
      },
      {
        "q": "5. I wash my hands and face with _____.",
        "options": [
          "shampoo",
          "toothpaste",
          "soap",
          "towel"
        ],
        "a": "soap"
      },
      {
        "q": "6. After a bath or shower, I dry my body with a _____.",
        "options": [
          "basin",
          "towel",
          "blanket",
          "curtain"
        ],
        "a": "towel"
      },
      {
        "q": "7. In the morning, you put your clothes on. You get _____.",
        "options": [
          "undressed",
          "dressed",
          "sleepy",
          "up"
        ],
        "a": "dressed"
      },
      {
        "q": "8. At night, you take your clothes off. You get _____.",
        "options": [
          "dressed",
          "undressed",
          "sleepy",
          "down"
        ],
        "a": "undressed"
      },
      {
        "q": "9. Where do you hang your shirts and coats in the bedroom?",
        "options": [
          "bed",
          "wardrobe",
          "chest of drawers",
          "bedside table"
        ],
        "a": "wardrobe"
      },
      {
        "q": "10. What rings in the morning to wake you up?",
        "options": [
          "alarm clock",
          "watch",
          "telephone",
          "doorbell"
        ],
        "a": "alarm clock"
      },
      {
        "q": "11. Joel is very tired. He turns off the light and _____ (starts sleeping).",
        "options": [
          "wakes up",
          "gets up",
          "falls asleep",
          "cleans teeth"
        ],
        "a": "falls asleep"
      },
      {
        "q": "12. In the bathroom, you fill the _____ with water to wash your face.",
        "options": [
          "toilet",
          "basin",
          "wardrobe",
          "bed"
        ],
        "a": "basin"
      },
      {
        "q": "13. I wear _____ (special loose clothes) to sleep in bed.",
        "options": [
          "jeans",
          "suit",
          "pyjamas",
          "skirt"
        ],
        "a": "pyjamas"
      },
      {
        "q": "14. A chest of _____ has many drawers to keep socks and T-shirts.",
        "options": [
          "beds",
          "drawers",
          "wardrobes",
          "tables"
        ],
        "a": "drawers"
      },
      {
        "q": "15. I put the alarm clock on the _____ next to my bed.",
        "options": [
          "dressing table",
          "bedside table",
          "wardrobe",
          "basin"
        ],
        "a": "bedside table"
      },
      {
        "q": "16. You brush your hair using a comb or a _____.",
        "options": [
          "toothbrush",
          "hairbrush",
          "soap",
          "towel"
        ],
        "a": "hairbrush"
      }
    ],
    "typingGame": [
      {
        "q": "Giường ngủ: b _ d",
        "hint": "b e d",
        "a": "bed"
      },
      {
        "q": "Tủ quần áo: w _ r d r _ b e",
        "hint": "w a r d r o b e",
        "a": "wardrobe"
      },
      {
        "q": "Đồng hồ báo thức: alarm ______",
        "hint": "c l o c k",
        "a": "clock"
      },
      {
        "q": "Gương: m _ r r _ r",
        "hint": "m i r r o r",
        "a": "mirror"
      },
      {
        "q": "Vòi hoa sen: s _ o w _ r",
        "hint": "s h o w e r",
        "a": "shower"
      },
      {
        "q": "Bồn tắm: b _ t h",
        "hint": "b a t h",
        "a": "bath"
      },
      {
        "q": "Bồn rửa mặt: b _ s _ n",
        "hint": "b a s i n",
        "a": "basin"
      },
      {
        "q": "Bồn cầu: t _ i l _ t",
        "hint": "t o i l e t",
        "a": "toilet"
      },
      {
        "q": "Xà bông: s _ a p",
        "hint": "s o a p",
        "a": "soap"
      },
      {
        "q": "Dầu gội: s _ a m p _ o",
        "hint": "s h a m p o o",
        "a": "shampoo"
      },
      {
        "q": "Kem đánh răng: t _ o t h p _ s t e",
        "hint": "t o o t h p a s t e",
        "a": "toothpaste"
      },
      {
        "q": "Bàn chải: t _ o t h b _ u s h",
        "hint": "t o o t h b r u s h",
        "a": "toothbrush"
      },
      {
        "q": "Khăn tắm: t _ w _ l",
        "hint": "t o w e l",
        "a": "towel"
      },
      {
        "q": "Quần áo ngủ: p _ j _ m _ s",
        "hint": "p y j a m a s",
        "a": "pyjamas"
      },
      {
        "q": "Mặc quần áo: get ______",
        "hint": "d r e s s e d",
        "a": "dressed"
      },
      {
        "q": "Cởi quần áo: get ______",
        "hint": "u n d r e s s e d",
        "a": "undressed"
      },
      {
        "q": "Thức giấc: wake ______",
        "hint": "u p",
        "a": "up"
      },
      {
        "q": "Thức dậy: get ______",
        "hint": "u p",
        "a": "up"
      },
      {
        "q": "Ngủ thiếp đi: fall ______",
        "hint": "a s l e e p",
        "a": "asleep"
      },
      {
        "q": "Tắt đèn: turn ______ the light",
        "hint": "o f f",
        "a": "off"
      }
    ],
    "speaking": [
      {
        "text": "I wake up when the alarm clock rings, and get up at 7.15.",
        "trans": "Tôi thức giấc khi chuông đồng hồ báo thức reo, và thức dậy lúc 7 giờ 15 phút."
      },
      {
        "text": "Joel washed his face in the basin with soap and dried it with a towel.",
        "trans": "Joel đã rửa mặt trong bồn bằng xà bông và lau khô bằng khăn."
      },
      {
        "text": "I cleaned my teeth with toothbrush and toothpaste in the bathroom.",
        "trans": "Tôi đã đánh răng bằng bàn chải và kem đánh răng trong phòng tắm."
      },
      {
        "text": "In the morning I get dressed, and at night I get undressed.",
        "trans": "Buổi sáng tôi mặc quần áo, và buổi tối tôi cởi quần áo ra."
      },
      {
        "text": "Before sleeping, he turns off the light and falls asleep quickly.",
        "trans": "Trước khi ngủ, anh ấy tắt đèn và ngủ thiếp đi rất nhanh."
      }
    ]
  },
  {
    "id": 46,
    "title": "Unit 46: In the living room",
    "description": "Học từ vựng về đồ đạc trong phòng khách (sofa, ghế bành, rèm cửa, TV), các giới từ vị trí và hành động thư giãn thường ngày.",
    "theory": [
      {
        "heading": "A. Things in the living room (Đồ đạc phòng khách)",
        "items": [
          {
            "word": "sofa / armchair",
            "type": "Đồ đạc",
            "phonetic": "/ˈsoʊ.fə/ /ˈɑːrm.tʃer/",
            "vi": "Ghế sofa / Ghế bành (có tay vịn).",
            "example": "Two people can sit on the sofa. I sat in the armchair."
          },
          {
            "word": "bookshelf / power point / light switch",
            "type": "Đồ đạc",
            "phonetic": "bookshelf: /ˈbʊkʃelf/ | power point: /ˈpaʊə pɔɪnt/ | light switch: /laɪt swɪtʃ/",
            "vi": "Kệ sách / Ổ cắm điện / Công tắc đèn.",
            "example": "Put the novels on the bookshelf. Plug the TV into the power point."
          },
          {
            "word": "coffee table / carpet / curtains",
            "type": "Đồ đạc",
            "phonetic": "coffee table: /ˈkɒfi ˈteɪbl/ | carpet: /ˈkɑːpɪt/ | curtains: /ˈkɜːtnz/",
            "vi": "Bàn trà nhỏ / Tấm thảm trải sàn / Rèm cửa sổ.",
            "example": "We put cups on the coffee table. Close the curtains because it is dark."
          }
        ]
      },
      {
        "heading": "B. Useful prepositions (Giới từ chỉ vị trí)",
        "items": [
          {
            "word": "near / next to / in the corner",
            "type": "Giới từ",
            "phonetic": "near: /nɪə/ | next to: /nekst tuː/ | in the corner: /ɪn ðə ˈkɔːnə/",
            "vi": "Gần / Ngay bên cạnh / Trong góc phòng.",
            "example": "The sofa is near the window. The TV is in the corner."
          },
          {
            "word": "against the wall / under",
            "type": "Giới từ",
            "phonetic": "against the wall: /əˈɡenst ðə wɔːl/ | under: /ˈʌndə/",
            "vi": "Tựa vào tường / Bên dưới.",
            "example": "The bookshelf is against the wall. The book is under the table."
          }
        ]
      },
      {
        "heading": "C & D. Things we do and use (Hành động & Thiết bị)",
        "items": [
          {
            "word": "watch television / listen to the radio",
            "type": "Hành động",
            "phonetic": "watch television: /wɒtʃ ˈtelɪvɪʒn/ | listen to radio: /ˈlɪsn tuː ðə ˈreɪdɪəʊ/",
            "vi": "Xem tivi / Nghe đài.",
            "example": "Every evening I watch television. I listen to the radio in the morning."
          },
          {
            "word": "remote control / reading lamp",
            "type": "Thiết bị",
            "phonetic": "remote control: /rɪˈməʊt kənˈtrəʊl/ | reading lamp: /ˈriːdɪŋ læmp/",
            "vi": "Điều khiển từ xa / Đèn đọc sách.",
            "example": "Where is the remote control for the TV? Turn on the reading lamp."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Living Room Furniture",
        "Electronics & Devices",
        "Decorations (Trang trí)",
        "Prepositions (Giới từ)"
      ],
      "items": [
        {
          "id": "i1",
          "word": "sofa",
          "target": "Living Room Furniture",
          "vi": "ghế sofa dài"
        },
        {
          "id": "i2",
          "word": "armchair",
          "target": "Living Room Furniture",
          "vi": "ghế bành có tay vịn"
        },
        {
          "id": "i3",
          "word": "chair",
          "target": "Living Room Furniture",
          "vi": "cái ghế đơn"
        },
        {
          "id": "i4",
          "word": "bookshelf",
          "target": "Living Room Furniture",
          "vi": "giá sách"
        },
        {
          "id": "i5",
          "word": "coffee table",
          "target": "Living Room Furniture",
          "vi": "bàn trà nhỏ"
        },
        {
          "id": "i6",
          "word": "table",
          "target": "Living Room Furniture",
          "vi": "cái bàn"
        },
        {
          "id": "i7",
          "word": "desk",
          "target": "Living Room Furniture",
          "vi": "bàn làm việc"
        },
        {
          "id": "i8",
          "word": "television / TV",
          "target": "Electronics & Devices",
          "vi": "tivi"
        },
        {
          "id": "i9",
          "word": "remote control",
          "target": "Electronics & Devices",
          "vi": "điều khiển từ xa"
        },
        {
          "id": "i10",
          "word": "radio",
          "target": "Electronics & Devices",
          "vi": "đài phát thanh"
        },
        {
          "id": "i11",
          "word": "CD player",
          "target": "Electronics & Devices",
          "vi": "máy nghe đĩa CD"
        },
        {
          "id": "i12",
          "word": "music centre",
          "target": "Electronics & Devices",
          "vi": "dàn âm thanh"
        },
        {
          "id": "i13",
          "word": "reading lamp",
          "target": "Electronics & Devices",
          "vi": "đèn đọc sách"
        },
        {
          "id": "i14",
          "word": "light switch",
          "target": "Electronics & Devices",
          "vi": "công tắc đèn"
        },
        {
          "id": "i15",
          "word": "power point",
          "target": "Electronics & Devices",
          "vi": "ổ cắm điện"
        },
        {
          "id": "i16",
          "word": "curtains",
          "target": "Decorations (Trang trí)",
          "vi": "rèm cửa sổ"
        },
        {
          "id": "i17",
          "word": "carpet",
          "target": "Decorations (Trang trí)",
          "vi": "tấm thảm trải sàn"
        },
        {
          "id": "i18",
          "word": "picture",
          "target": "Decorations (Trang trí)",
          "vi": "bức tranh treo tường"
        },
        {
          "id": "i19",
          "word": "cushion",
          "target": "Decorations (Trang trí)",
          "vi": "gối tựa sofa"
        },
        {
          "id": "i20",
          "word": "house plant",
          "target": "Decorations (Trang trí)",
          "vi": "cây cảnh trong nhà"
        },
        {
          "id": "i21",
          "word": "near",
          "target": "Prepositions (Giới từ)",
          "vi": "gần"
        },
        {
          "id": "i22",
          "word": "next to",
          "target": "Prepositions (Giới từ)",
          "vi": "ngay bên cạnh"
        },
        {
          "id": "i23",
          "word": "in the corner",
          "target": "Prepositions (Giới từ)",
          "vi": "trong góc phòng"
        },
        {
          "id": "i24",
          "word": "against the wall",
          "target": "Prepositions (Giới từ)",
          "vi": "tựa sát vào tường"
        },
        {
          "id": "i25",
          "word": "under",
          "target": "Prepositions (Giới từ)",
          "vi": "bên dưới"
        },
        {
          "id": "i26",
          "word": "on",
          "target": "Prepositions (Giới từ)",
          "vi": "trên bề mặt"
        },
        {
          "id": "i27",
          "word": "in the middle of",
          "target": "Prepositions (Giới từ)",
          "vi": "ở giữa"
        },
        {
          "id": "i28",
          "word": "behind",
          "target": "Prepositions (Giới từ)",
          "vi": "phía sau"
        },
        {
          "id": "i29",
          "word": "above",
          "target": "Prepositions (Giới từ)",
          "vi": "ở phía trên"
        },
        {
          "id": "i30",
          "word": "between",
          "target": "Prepositions (Giới từ)",
          "vi": "ở giữa hai vật"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. A comfortable chair for one person, with supports for your arms, is an _____.",
        "options": [
          "sofa",
          "armchair",
          "desk",
          "stool"
        ],
        "a": "armchair"
      },
      {
        "q": "2. A long comfortable seat for two or three people is a _____.",
        "options": [
          "armchair",
          "chair",
          "sofa",
          "shelf"
        ],
        "a": "sofa"
      },
      {
        "q": "3. You use a _____ control to change TV channels from your seat.",
        "options": [
          "power",
          "remote",
          "light",
          "radio"
        ],
        "a": "remote"
      },
      {
        "q": "4. A small table in the living room used for drinks is a _____ table.",
        "options": [
          "dinner",
          "desk",
          "coffee",
          "bedside"
        ],
        "a": "coffee"
      },
      {
        "q": "5. Thick pieces of cloth that hang in front of windows are _____.",
        "options": [
          "carpets",
          "cushions",
          "curtains",
          "shelves"
        ],
        "a": "curtains"
      },
      {
        "q": "6. A heavy thick fabric covering a part of the floor is a _____.",
        "options": [
          "curtain",
          "carpet",
          "cushion",
          "sofa"
        ],
        "a": "carpet"
      },
      {
        "q": "7. The television is plugged into the _____ in the wall.",
        "options": [
          "light switch",
          "power point",
          "reading lamp",
          "bookshelf"
        ],
        "a": "power point"
      },
      {
        "q": "8. I put the novels on the _____.",
        "options": [
          "coffee table",
          "bookshelf",
          "curtains",
          "carpet"
        ],
        "a": "bookshelf"
      },
      {
        "q": "9. To turn the light on or off, you press the _____.",
        "options": [
          "power point",
          "light switch",
          "remote control",
          "armchair"
        ],
        "a": "light switch"
      },
      {
        "q": "10. The sofa is standing _____ the window. (very close to it)",
        "options": [
          "under",
          "near",
          "against",
          "between"
        ],
        "a": "near"
      },
      {
        "q": "11. The bookcase is leaning _____ the wall.",
        "options": [
          "in",
          "under",
          "against",
          "next to"
        ],
        "a": "against"
      },
      {
        "q": "12. In the evening I like to sit down and _____ television.",
        "options": [
          "see",
          "watch",
          "look",
          "listen"
        ],
        "a": "watch"
      },
      {
        "q": "13. In the morning, I like to _____ the radio.",
        "options": [
          "watch",
          "listen to",
          "hear",
          "play"
        ],
        "a": "listen to"
      },
      {
        "q": "14. Turn _____ the radio, it's too loud!",
        "options": [
          "on",
          "off",
          "up",
          "down"
        ],
        "a": "down"
      },
      {
        "q": "15. Please turn _____ the TV, I want to watch the football match. (activate it)",
        "options": [
          "on",
          "off",
          "under",
          "out"
        ],
        "a": "on"
      },
      {
        "q": "16. The coffee table is _____ the middle of the room.",
        "options": [
          "in",
          "on",
          "at",
          "by"
        ],
        "a": "in"
      }
    ],
    "typingGame": [
      {
        "q": "Ghế sofa dài: s _ f a",
        "hint": "s o f a",
        "a": "sofa"
      },
      {
        "q": "Ghế bành: a _ m c _ a _ r",
        "hint": "a r m c h a i r",
        "a": "armchair"
      },
      {
        "q": "Kệ sách: b _ o k s _ e l f",
        "hint": "b o o k s h e l f",
        "a": "bookshelf"
      },
      {
        "q": "Bàn trà nhỏ: coffee ______",
        "hint": "t a b l e",
        "a": "table"
      },
      {
        "q": "Rèm cửa: c _ r t _ i n s",
        "hint": "c u r t a i n s",
        "a": "curtains"
      },
      {
        "q": "Thảm trải sàn: c _ r p _ t",
        "hint": "c a r p e t",
        "a": "carpet"
      },
      {
        "q": "Ổ cắm điện: power ______",
        "hint": "p o i n t",
        "a": "point"
      },
      {
        "q": "Công tắc đèn: light ______",
        "hint": "s w i t c h",
        "a": "switch"
      },
      {
        "q": "Điều khiển từ xa: remote ______",
        "hint": "c o n t r o l",
        "a": "control"
      },
      {
        "q": "Đèn đọc sách: reading ______",
        "hint": "l a m p",
        "a": "lamp"
      },
      {
        "q": "Bức tranh: p _ c t _ r e",
        "hint": "p i c t u r e",
        "a": "picture"
      },
      {
        "q": "Nghe đài: listen to the ______",
        "hint": "r a d i o",
        "a": "radio"
      },
      {
        "q": "Xem tivi: watch ______",
        "hint": "t e l e v i s i o n",
        "a": "television"
      },
      {
        "q": "Gần cửa sổ: ______ the window",
        "hint": "n e a r",
        "a": "near"
      },
      {
        "q": "Kế bên sofa: ______ to the sofa",
        "hint": "n e x t",
        "a": "next"
      },
      {
        "q": "Trong góc: in the ______",
        "hint": "c o r n e r",
        "a": "corner"
      },
      {
        "q": "Tựa sát tường: ______ the wall",
        "hint": "a g a i n s t",
        "a": "against"
      },
      {
        "q": "Dưới gầm bàn: ______ the table",
        "hint": "u n d e r",
        "a": "under"
      },
      {
        "q": "Ở giữa phòng: in the ______ of the room",
        "hint": "m i d d l e",
        "a": "middle"
      },
      {
        "q": "Bật tivi: turn ______ the TV",
        "hint": "o n",
        "a": "on"
      }
    ],
    "speaking": [
      {
        "text": "Every evening I watch television and relax on the sofa.",
        "trans": "Mỗi buổi tối tôi xem tivi và thư giãn trên ghế sofa."
      },
      {
        "text": "The bookshelf is against the wall, next to the coffee table.",
        "trans": "Kệ sách tựa vào tường, nằm bên cạnh bàn trà nhỏ."
      },
      {
        "text": "Where is the remote control? I want to turn on the TV.",
        "trans": "Điều khiển từ xa ở đâu thế? Tôi muốn bật tivi."
      },
      {
        "text": "The sofa is near the window and the reading lamp is in the corner.",
        "trans": "Ghế sofa nằm gần cửa sổ và đèn đọc sách nằm trong góc."
      },
      {
        "text": "Close the curtains and switch the light on, it is getting dark.",
        "trans": "Hãy đóng rèm lại và bật đèn lên, trời đang tối dần rồi."
      }
    ]
  }
];
