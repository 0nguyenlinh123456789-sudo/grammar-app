// File: src/data/oxfordDataPart3.js

export const courseData = [
  {
    "id": 47,
    "title": "Unit 47: Jobs",
    "description": "Học từ vựng về các ngành nghề, nơi làm việc, các chức danh phổ biến và cách diễn đạt công việc trong cuộc sống.",
    "theory": [
      {
        "heading": "A. People and their jobs (Các ngành nghề phổ biến)",
        "items": [
          {
            "word": "secretary",
            "type": "Danh từ",
            "phonetic": "/ˈsek.rə.ter.i/",
            "vi": "Thư ký (viết thư, trả lời điện thoại, sắp xếp lịch trình).",
            "example": "The secretary is typing letters in the office."
          },
          {
            "word": "manager",
            "type": "Danh từ",
            "phonetic": "/ˈmæn.ə.dʒɚ/",
            "vi": "Người quản lý (điều hành công ty hoặc phòng ban).",
            "example": "The manager is in a meeting with the clients."
          },
          {
            "word": "nurse / doctor",
            "type": "Danh từ",
            "phonetic": "/nɝːs/ /ˈdɑːk.tɚ/",
            "vi": "Y tá / Bác sĩ (chăm sóc và chữa trị bệnh nhân).",
            "example": "The doctor and nurse work together at the hospital."
          },
          {
            "word": "engineer",
            "type": "Danh từ",
            "phonetic": "/ˌen.dʒɪˈnɪr/",
            "vi": "Kỹ sư (thiết kế, xây dựng máy móc, cầu cống, phần mềm).",
            "example": "He is a software engineer for a tech company."
          }
        ]
      },
      {
        "heading": "B. Workplaces (Nơi làm việc tương ứng)",
        "items": [
          {
            "word": "office / factory",
            "type": "Danh từ",
            "phonetic": "/ˈɑː.fɪs/ /ˈfæk.tɚ.i/",
            "vi": "Văn phòng / Nhà máy.",
            "example": "My dad works in a factory, but my mom works in an office."
          },
          {
            "word": "hospital / school",
            "type": "Danh từ",
            "phonetic": "/ˈhɑː.spɪ.t̬əl/ /skuːl/",
            "vi": "Bệnh viện / Trường học.",
            "example": "Nurses work in a hospital, and teachers work in a school."
          }
        ]
      },
      {
        "heading": "C. Job expressions (Cách hỏi và trả lời về nghề nghiệp)",
        "items": [
          {
            "word": "What do you do?",
            "type": "Câu hỏi",
            "phonetic": "/wɒt duː juː duː/",
            "vi": "Bạn làm nghề gì? (= What is your job?)",
            "example": "What do you do? - I'm an engineer."
          },
          {
            "word": "work for / work in",
            "type": "Động từ",
            "phonetic": "work for: /wɜːk fɔː/ | work in: /wɜːk ɪn/",
            "vi": "Làm việc cho (công ty/ai đó) / Làm việc ở (địa điểm/lĩnh vực).",
            "example": "I work for a large German bank. She works in a department store."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Medical & Education",
        "Office & Business",
        "Technical & Services",
        "Work Expressions"
      ],
      "items": [
        {
          "id": "i1",
          "word": "doctor",
          "target": "Medical & Education",
          "vi": "bác sĩ"
        },
        {
          "id": "i2",
          "word": "nurse",
          "target": "Medical & Education",
          "vi": "y tá"
        },
        {
          "id": "i3",
          "word": "dentist",
          "target": "Medical & Education",
          "vi": "nha sĩ"
        },
        {
          "id": "i4",
          "word": "teacher",
          "target": "Medical & Education",
          "vi": "giáo viên"
        },
        {
          "id": "i5",
          "word": "professor",
          "target": "Medical & Education",
          "vi": "giáo sư"
        },
        {
          "id": "i6",
          "word": "scientist",
          "target": "Medical & Education",
          "vi": "nhà khoa học"
        },
        {
          "id": "i7",
          "word": "secretary",
          "target": "Office & Business",
          "vi": "thư ký"
        },
        {
          "id": "i8",
          "word": "manager",
          "target": "Office & Business",
          "vi": "quản lý"
        },
        {
          "id": "i9",
          "word": "clerk",
          "target": "Office & Business",
          "vi": "nhân viên văn phòng"
        },
        {
          "id": "i10",
          "word": "businessman",
          "target": "Office & Business",
          "vi": "nam doanh nhân"
        },
        {
          "id": "i11",
          "word": "engineer",
          "target": "Technical & Services",
          "vi": "kỹ sư"
        },
        {
          "id": "i12",
          "word": "mechanic",
          "target": "Technical & Services",
          "vi": "thợ cơ khí"
        },
        {
          "id": "i13",
          "word": "pilot",
          "target": "Technical & Services",
          "vi": "phi công"
        },
        {
          "id": "i14",
          "word": "driver",
          "target": "Technical & Services",
          "vi": "tài xế"
        },
        {
          "id": "i15",
          "word": "shop assistant",
          "target": "Technical & Services",
          "vi": "nhân viên bán hàng"
        },
        {
          "id": "i16",
          "word": "chef",
          "target": "Technical & Services",
          "vi": "đầu bếp trưởng"
        },
        {
          "id": "i17",
          "word": "waiter",
          "target": "Technical & Services",
          "vi": "nam bồi bàn"
        },
        {
          "id": "i18",
          "word": "hairdresser",
          "target": "Technical & Services",
          "vi": "thợ làm tóc"
        },
        {
          "id": "i19",
          "word": "actor",
          "target": "Technical & Services",
          "vi": "diễn viên"
        },
        {
          "id": "i20",
          "word": "writer",
          "target": "Technical & Services",
          "vi": "nhà văn"
        },
        {
          "id": "i21",
          "word": "work in hospital",
          "target": "Work Expressions",
          "vi": "làm ở bệnh viện"
        },
        {
          "id": "i22",
          "word": "work in office",
          "target": "Work Expressions",
          "vi": "làm ở văn phòng"
        },
        {
          "id": "i23",
          "word": "work in factory",
          "target": "Work Expressions",
          "vi": "làm ở nhà máy"
        },
        {
          "id": "i24",
          "word": "work for a bank",
          "target": "Work Expressions",
          "vi": "làm cho ngân hàng"
        },
        {
          "id": "i25",
          "word": "What do you do",
          "target": "Work Expressions",
          "vi": "bạn làm nghề gì"
        },
        {
          "id": "i26",
          "word": "unemployed",
          "target": "Work Expressions",
          "vi": "thất nghiệp"
        },
        {
          "id": "i27",
          "word": "retired",
          "target": "Work Expressions",
          "vi": "đã nghỉ hưu"
        },
        {
          "id": "i28",
          "word": "earn money",
          "target": "Work Expressions",
          "vi": "kiếm tiền"
        },
        {
          "id": "i29",
          "word": "salary",
          "target": "Work Expressions",
          "vi": "tiền lương"
        },
        {
          "id": "i30",
          "word": "job",
          "target": "Work Expressions",
          "vi": "công việc"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. She writes letters and answers the phone for the boss. She is a _____.",
        "options": [
          "nurse",
          "secretary",
          "mechanic",
          "engineer"
        ],
        "a": "secretary"
      },
      {
        "q": "2. The person who runs a department or company is the _____.",
        "options": [
          "manager",
          "clerk",
          "waiter",
          "actor"
        ],
        "a": "manager"
      },
      {
        "q": "3. 'What do you do?' means _____.",
        "options": [
          "What are you doing now?",
          "What is your job?",
          "Where do you work?",
          "How are you?"
        ],
        "a": "What is your job?"
      },
      {
        "q": "4. My tooth hurts, I need to see the _____.",
        "options": [
          "doctor",
          "dentist",
          "nurse",
          "hairdresser"
        ],
        "a": "dentist"
      },
      {
        "q": "5. He repairs car engines in a garage. He is a _____.",
        "options": [
          "mechanic",
          "engineer",
          "pilot",
          "driver"
        ],
        "a": "mechanic"
      },
      {
        "q": "6. A person who works in a school and helps students learn is a _____.",
        "options": [
          "doctor",
          "teacher",
          "waiter",
          "secretary"
        ],
        "a": "teacher"
      },
      {
        "q": "7. My uncle works _____ a big computer company.",
        "options": [
          "for",
          "at",
          "in",
          "to"
        ],
        "a": "for"
      },
      {
        "q": "8. A nurse and a doctor work in a _____.",
        "options": [
          "school",
          "office",
          "hospital",
          "factory"
        ],
        "a": "hospital"
      },
      {
        "q": "9. He is 70 years old and has stopped working. He is _____.",
        "options": [
          "unemployed",
          "retired",
          "busy",
          "manager"
        ],
        "a": "retired"
      },
      {
        "q": "10. He does not have a job. He is _____.",
        "options": [
          "unemployed",
          "retired",
          "clerk",
          "chef"
        ],
        "a": "unemployed"
      },
      {
        "q": "11. The cook in a professional restaurant kitchen is the _____.",
        "options": [
          "waiter",
          "chef",
          "manager",
          "clerk"
        ],
        "a": "chef"
      },
      {
        "q": "12. She cuts and styles people's hair. She is a _____.",
        "options": [
          "hairdresser",
          "shop assistant",
          "waitress",
          "nurse"
        ],
        "a": "hairdresser"
      },
      {
        "q": "13. A person who flies commercial planes is a _____.",
        "options": [
          "driver",
          "pilot",
          "engineer",
          "mechanic"
        ],
        "a": "pilot"
      },
      {
        "q": "14. A person who acts in films or plays is an _____.",
        "options": [
          "writer",
          "actor",
          "artist",
          "secretary"
        ],
        "a": "actor"
      },
      {
        "q": "15. I work _____ a small office in the city center.",
        "options": [
          "for",
          "in",
          "at",
          "by"
        ],
        "a": "in"
      },
      {
        "q": "16. She works in a clothes shop. She is a _____.",
        "options": [
          "shop assistant",
          "manager",
          "hairdresser",
          "chef"
        ],
        "a": "shop assistant"
      },
      {
        "q": "17. The monthly money you get for your work is your _____.",
        "options": [
          "salary",
          "job",
          "career",
          "coin"
        ],
        "a": "salary"
      },
      {
        "q": "18. A person who designs bridges and roads is an _____.",
        "options": [
          "engineer",
          "mechanic",
          "clerk",
          "secretary"
        ],
        "a": "engineer"
      },
      {
        "q": "19. The waiter brought the food. The _____ cooked it.",
        "options": [
          "chef",
          "manager",
          "driver",
          "dentist"
        ],
        "a": "chef"
      },
      {
        "q": "20. I work in a _____ where they make cars.",
        "options": [
          "office",
          "factory",
          "hospital",
          "school"
        ],
        "a": "factory"
      }
    ],
    "typingGame": [
      {
        "q": "Thư ký: s _ _ _ _ _ _ _ y",
        "hint": "s e c r e t a r y",
        "a": "secretary"
      },
      {
        "q": "Người quản lý: m _ _ _ _ _ r",
        "hint": "m a n a ɡ e r",
        "a": "manager"
      },
      {
        "q": "Bác sĩ: d _ _ _ _ r",
        "hint": "d o c t o r",
        "a": "doctor"
      },
      {
        "q": "Y tá: n _ _ s e",
        "hint": "n u r s e",
        "a": "nurse"
      },
      {
        "q": "Kỹ sư: e _ _ _ _ _ _ r",
        "hint": "e n ɡ i n e e r",
        "a": "engineer"
      },
      {
        "q": "Thợ cơ khí: m _ _ _ _ _ _ c",
        "hint": "m e c h a n i c",
        "a": "mechanic"
      },
      {
        "q": "Phi công: p _ _ _ t",
        "hint": "p i l o t",
        "a": "pilot"
      },
      {
        "q": "Bếp trưởng: c _ _ f",
        "hint": "c h e f",
        "a": "chef"
      },
      {
        "q": "Nha sĩ: d _ _ _ _ _ t",
        "hint": "d e n t i s t",
        "a": "dentist"
      },
      {
        "q": "Nhân viên bán hàng: shop a _ _ _ _ _ _ _ t",
        "hint": "a s s i s t a n t",
        "a": "assistant"
      },
      {
        "q": "Làm việc cho: work f _ r",
        "hint": "f o r",
        "a": "for"
      },
      {
        "q": "Làm việc ở: work i _",
        "hint": "i n",
        "a": "in"
      },
      {
        "q": "Thất nghiệp: u _ _ _ _ _ _ _ _ d",
        "hint": "u n e m p l o y e d",
        "a": "unemployed"
      },
      {
        "q": "Đã nghỉ hưu: r _ _ _ _ _ d",
        "hint": "r e t i r e d",
        "a": "retired"
      },
      {
        "q": "Văn phòng: o _ _ _ _ e",
        "hint": "o f f i c e",
        "a": "office"
      },
      {
        "q": "Nhà máy: f _ _ _ _ _ y",
        "hint": "f a c t o r y",
        "a": "factory"
      },
      {
        "q": "Bệnh viện: h _ _ _ _ _ _ l",
        "hint": "h o s p i t a l",
        "a": "hospital"
      },
      {
        "q": "Tiền lương: s _ _ _ _ y",
        "hint": "s a l a r y",
        "a": "salary"
      },
      {
        "q": "Tài xế: d _ _ _ _ r",
        "hint": "d r i v e r",
        "a": "driver"
      },
      {
        "q": "Giáo viên: t _ _ _ _ _ r",
        "hint": "t e a c h e r",
        "a": "teacher"
      }
    ],
    "speaking": [
      {
        "text": "What do you do? - I'm an engineer and I work for a tech company.",
        "trans": "Bạn làm nghề gì? - Tôi là một kỹ sư và tôi làm việc cho một công ty công nghệ."
      },
      {
        "text": "My mother works in an office, but my father works in a factory.",
        "trans": "Mẹ tôi làm việc ở văn phòng, nhưng bố tôi làm việc ở một nhà máy."
      },
      {
        "text": "The secretary is busy typing letters and answering phone calls.",
        "trans": "Người thư ký đang bận rộn viết thư và trả lời các cuộc điện thoại."
      },
      {
        "text": "He has been unemployed for three months, but he has an interview tomorrow.",
        "trans": "Anh ấy đã bị thất nghiệp ba tháng rồi, nhưng anh ấy có một cuộc phỏng vấn vào ngày mai."
      },
      {
        "text": "My grandfather is seventy years old, so he is retired now.",
        "trans": "Ông nội tôi bảy mươi tuổi rồi, vì vậy hiện tại ông đã nghỉ hưu."
      }
    ]
  },
  {
    "id": 48,
    "title": "Unit 48: At school and university",
    "description": "Học từ vựng về các môn học, địa điểm trong trường học, các dụng cụ học tập và cách diễn đạt các hoạt động học thi.",
    "theory": [
      {
        "heading": "A. School subjects (Các môn học chính khóa)",
        "items": [
          {
            "word": "maths / physics / chemistry",
            "type": "Danh từ",
            "phonetic": "/mæθs/ /ˈfɪz.ɪks/ /ˈkem.ɪ.stri/",
            "vi": "Toán học / Vật lý / Hóa học.",
            "example": "I like maths, but I am bad at physics and chemistry."
          },
          {
            "word": "biology / history / geography",
            "type": "Danh từ",
            "phonetic": "/baɪˈɑː.lə.dʒi/ /ˈhɪs.t̬ɚ.i/ /dʒiˈɑː.ɡrə.fi/",
            "vi": "Sinh học / Lịch sử / Địa lý.",
            "example": "We learned about rivers in our geography class."
          }
        ]
      },
      {
        "heading": "B. School places and things (Địa điểm & Dụng cụ học tập)",
        "items": [
          {
            "word": "classroom / library / laboratory",
            "type": "Danh từ",
            "phonetic": "classroom: /ˈklɑːsruːm/ | library: /ˈlaɪbrəri/ | laboratory: /ləˈbɒrətri/",
            "vi": "Lớp học / Thư viện / Phòng thí nghiệm.",
            "example": "We study in the classroom and borrow books from the library."
          },
          {
            "word": "textbook / notebook / rubber",
            "type": "Danh từ",
            "phonetic": "textbook: /ˈtekstbʊk/ | notebook: /ˈnəʊtbʊk/ | rubber: /ˈrʌbə/",
            "vi": "Sách giáo khoa / Vở viết / Cục tẩy (Gôm).",
            "example": "Open your textbook and write the answers in your notebook."
          }
        ]
      },
      {
        "heading": "C. School and university verbs (Động từ học thi và giáo dục)",
        "items": [
          {
            "word": "take / pass / fail an exam",
            "type": "Cụm động từ",
            "phonetic": "take exam: /teɪk ɪɡˈzæm/ | pass: /pɑːs/ | fail: /feɪl/",
            "vi": "Đi thi / Thi đỗ / Thi trượt.",
            "example": "I have to take an exam tomorrow. I hope I pass and don't fail."
          },
          {
            "word": "study / learn / do homework",
            "type": "Động từ",
            "phonetic": "study: /ˈstʌdi/ | learn: /lɜːn/ | do homework: /duː ˈhəʊmwɜːk/",
            "vi": "Nghiên cứu / Học hỏi / Làm bài tập về nhà.",
            "example": "She is studying biology. He has to do his homework before dinner."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "School Subjects",
        "Places & Things",
        "Education Verbs",
        "People in Education"
      ],
      "items": [
        {
          "id": "i1",
          "word": "maths",
          "target": "School Subjects",
          "vi": "toán học"
        },
        {
          "id": "i2",
          "word": "physics",
          "target": "School Subjects",
          "vi": "vật lý"
        },
        {
          "id": "i3",
          "word": "chemistry",
          "target": "School Subjects",
          "vi": "hóa học"
        },
        {
          "id": "i4",
          "word": "biology",
          "target": "School Subjects",
          "vi": "sinh học"
        },
        {
          "id": "i5",
          "word": "history",
          "target": "School Subjects",
          "vi": "lịch sử"
        },
        {
          "id": "i6",
          "word": "geography",
          "target": "School Subjects",
          "vi": "địa lý"
        },
        {
          "id": "i7",
          "word": "art",
          "target": "School Subjects",
          "vi": "mỹ thuật"
        },
        {
          "id": "i8",
          "word": "music",
          "target": "School Subjects",
          "vi": "âm nhạc"
        },
        {
          "id": "i9",
          "word": "classroom",
          "target": "Places & Things",
          "vi": "lớp học"
        },
        {
          "id": "i10",
          "word": "library",
          "target": "Places & Things",
          "vi": "thư viện"
        },
        {
          "id": "i11",
          "word": "laboratory",
          "target": "Places & Things",
          "vi": "phòng thí nghiệm"
        },
        {
          "id": "i12",
          "word": "playground",
          "target": "Places & Things",
          "vi": "sân chơi"
        },
        {
          "id": "i13",
          "word": "gym",
          "target": "Places & Things",
          "vi": "phòng thể chất"
        },
        {
          "id": "i14",
          "word": "textbook",
          "target": "Places & Things",
          "vi": "sách giáo khoa"
        },
        {
          "id": "i15",
          "word": "notebook",
          "target": "Places & Things",
          "vi": "vở viết"
        },
        {
          "id": "i16",
          "word": "pencil",
          "target": "Places & Things",
          "vi": "bút chì"
        },
        {
          "id": "i17",
          "word": "rubber",
          "target": "Places & Things",
          "vi": "cục tẩy"
        },
        {
          "id": "i18",
          "word": "ruler",
          "target": "Places & Things",
          "vi": "thước kẻ"
        },
        {
          "id": "i19",
          "word": "study",
          "target": "Education Verbs",
          "vi": "học chuyên sâu, nghiên cứu"
        },
        {
          "id": "i20",
          "word": "learn",
          "target": "Education Verbs",
          "vi": "học hỏi kiến thức"
        },
        {
          "id": "i21",
          "word": "take an exam",
          "target": "Education Verbs",
          "vi": "làm bài thi"
        },
        {
          "id": "i22",
          "word": "pass an exam",
          "target": "Education Verbs",
          "vi": "thi đỗ"
        },
        {
          "id": "i23",
          "word": "fail an exam",
          "target": "Education Verbs",
          "vi": "thi trượt"
        },
        {
          "id": "i24",
          "word": "do homework",
          "target": "Education Verbs",
          "vi": "làm bài tập về nhà"
        },
        {
          "id": "i25",
          "word": "student",
          "target": "People in Education",
          "vi": "học sinh, sinh viên"
        },
        {
          "id": "i26",
          "word": "teacher",
          "target": "People in Education",
          "vi": "giáo viên"
        },
        {
          "id": "i27",
          "word": "professor",
          "target": "People in Education",
          "vi": "giáo sư"
        },
        {
          "id": "i28",
          "word": "pupil",
          "target": "People in Education",
          "vi": "học sinh nhỏ"
        },
        {
          "id": "i29",
          "word": "graduate",
          "target": "Education Verbs",
          "vi": "tốt nghiệp"
        },
        {
          "id": "i30",
          "word": "exam",
          "target": "Places & Things",
          "vi": "bài thi"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. We learn about maps and different countries in _____.",
        "options": [
          "history",
          "geography",
          "physics",
          "art"
        ],
        "a": "geography"
      },
      {
        "q": "2. We learn about events in the past in _____.",
        "options": [
          "history",
          "maths",
          "chemistry",
          "biology"
        ],
        "a": "history"
      },
      {
        "q": "3. Open your _____ to page 45 and read the paragraph.",
        "options": [
          "notebook",
          "textbook",
          "rubber",
          "ruler"
        ],
        "a": "textbook"
      },
      {
        "q": "4. I failed the exam because I didn't study, so I have to _____ it again.",
        "options": [
          "pass",
          "take",
          "do",
          "learn"
        ],
        "a": "take"
      },
      {
        "q": "5. Excellent! You got 95% and _____ the difficult exam.",
        "options": [
          "failed",
          "passed",
          "took",
          "lost"
        ],
        "a": "passed"
      },
      {
        "q": "6. I wrote all the notes in my new green _____.",
        "options": [
          "notebook",
          "textbook",
          "rubber",
          "ruler"
        ],
        "a": "notebook"
      },
      {
        "q": "7. You can erase the pencil mistake with a _____.",
        "options": [
          "ruler",
          "rubber",
          "pencil",
          "notebook"
        ],
        "a": "rubber"
      },
      {
        "q": "8. The university teacher is called a _____.",
        "options": [
          "student",
          "pupil",
          "professor",
          "clerk"
        ],
        "a": "professor"
      },
      {
        "q": "9. We do chemical experiments in the science _____.",
        "options": [
          "library",
          "classroom",
          "laboratory",
          "gym"
        ],
        "a": "laboratory"
      },
      {
        "q": "10. In _____ class, we learn about plants and animals.",
        "options": [
          "chemistry",
          "biology",
          "physics",
          "history"
        ],
        "a": "biology"
      },
      {
        "q": "11. Don't play inside. Go to the _____ to run and play.",
        "options": [
          "classroom",
          "library",
          "playground",
          "laboratory"
        ],
        "a": "playground"
      },
      {
        "q": "12. I didn't pass the exam. I _____ it and was very sad.",
        "options": [
          "passed",
          "took",
          "failed",
          "won"
        ],
        "a": "failed"
      },
      {
        "q": "13. Children go to primary _____ from age 5 to 11.",
        "options": [
          "school",
          "university",
          "factory",
          "office"
        ],
        "a": "school"
      },
      {
        "q": "14. After school, you must do your _____ before watching TV.",
        "options": [
          "work",
          "exam",
          "homework",
          "lesson"
        ],
        "a": "homework"
      },
      {
        "q": "15. I'm bad at numbers, so I hate _____.",
        "options": [
          "art",
          "music",
          "maths",
          "geography"
        ],
        "a": "maths"
      },
      {
        "q": "16. We paint pictures and draw sketches in _____ class.",
        "options": [
          "art",
          "music",
          "physics",
          "biology"
        ],
        "a": "art"
      },
      {
        "q": "17. A person who is studying at a university is a _____.",
        "options": [
          "pupil",
          "student",
          "teacher",
          "professor"
        ],
        "a": "student"
      },
      {
        "q": "18. I need a _____ to draw a straight line.",
        "options": [
          "pencil",
          "rubber",
          "ruler",
          "notebook"
        ],
        "a": "ruler"
      },
      {
        "q": "19. The school library is a quiet place to read and _____.",
        "options": [
          "shout",
          "study",
          "play",
          "dance"
        ],
        "a": "study"
      },
      {
        "q": "20. We learn about elements and reactions in _____.",
        "options": [
          "physics",
          "chemistry",
          "history",
          "art"
        ],
        "a": "chemistry"
      }
    ],
    "typingGame": [
      {
        "q": "Toán học: m _ _ _ s",
        "hint": "m a t h s",
        "a": "maths"
      },
      {
        "q": "Sinh học: b _ _ _ _ _ y",
        "hint": "b i o l o ɡ y",
        "a": "biology"
      },
      {
        "q": "Địa lý: g _ _ _ _ _ _ _ y",
        "hint": "ɡ e o ɡ r a p h y",
        "a": "geography"
      },
      {
        "q": "Lớp học: c _ _ _ _ _ _ _ m",
        "hint": "c l a s s r o o m",
        "a": "classroom"
      },
      {
        "q": "Thư viện: l _ _ _ _ _ y",
        "hint": "l i b r a r y",
        "a": "library"
      },
      {
        "q": "Phòng thí nghiệm: l _ _ _ _ _ _ _ _ y",
        "hint": "l a b o r a t o r y",
        "a": "laboratory"
      },
      {
        "q": "Sách giáo khoa: t _ _ _ _ _ _ k",
        "hint": "t e x t b o o k",
        "a": "textbook"
      },
      {
        "q": "Vở viết: n _ _ _ _ _ _ k",
        "hint": "n o t e b o o k",
        "a": "notebook"
      },
      {
        "q": "Cục tẩy: r _ _ b _ r",
        "hint": "r u b b e r",
        "a": "rubber"
      },
      {
        "q": "Thước kẻ: r _ _ e r",
        "hint": "r u l e r",
        "a": "ruler"
      },
      {
        "q": "Thi đỗ: p _ _ s an exam",
        "hint": "p a s s",
        "a": "pass"
      },
      {
        "q": "Thi trượt: f _ _ l an exam",
        "hint": "f a i l",
        "a": "fail"
      },
      {
        "q": "Làm bài tập: do h _ _ _ _ _ _ k",
        "hint": "h o m e w o r k",
        "a": "homework"
      },
      {
        "q": "Sinh viên đại học: s _ _ _ _ _ t",
        "hint": "s t u d e n t",
        "a": "student"
      },
      {
        "q": "Giáo sư đại học: p _ _ _ _ _ _ _ r",
        "hint": "p r o f e s s o r",
        "a": "professor"
      },
      {
        "q": "Học tập, nghiên cứu: s _ _ _ y",
        "hint": "s t u d y",
        "a": "study"
      },
      {
        "q": "Môn Hóa học: c _ _ _ _ _ _ _ y",
        "hint": "c h e m i s t r y",
        "a": "chemistry"
      },
      {
        "q": "Môn Lịch sử: h _ _ _ _ _ y",
        "hint": "h i s t o r y",
        "a": "history"
      },
      {
        "q": "Bút chì: p _ _ _ _ l",
        "hint": "p e n c i l",
        "a": "pencil"
      },
      {
        "q": "Sân chơi: p _ _ _ _ _ _ _ _ d",
        "hint": "p l a y ɡ r o u n d",
        "a": "playground"
      }
    ],
    "speaking": [
      {
        "text": "I have to take an exam in geography tomorrow morning.",
        "trans": "Tôi phải làm một bài thi môn Địa lý vào sáng mai."
      },
      {
        "text": "If you study hard, you will pass your exams easily.",
        "trans": "Nếu bạn học tập chăm chỉ, bạn sẽ đỗ các kỳ thi một cách dễ dàng."
      },
      {
        "text": "We borrow textbooks from the library and study in the classroom.",
        "trans": "Chúng tôi mượn sách giáo khoa từ thư viện và học tập ở trong lớp."
      },
      {
        "text": "She failed the chemistry exam and has to take it again.",
        "trans": "Cô ấy đã thi trượt môn Hóa học và phải thi lại nó."
      },
      {
        "text": "Please do your homework in your notebook using a pencil.",
        "trans": "Làm ơn hãy làm bài tập về nhà vào vở viết của bạn bằng bút chì."
      }
    ]
  },
  {
    "id": 49,
    "title": "Unit 49: Communications",
    "description": "Học từ vựng về các phương thức liên lạc truyền thống và hiện đại, máy tính, mạng internet và các thuật ngữ kỹ thuật số.",
    "theory": [
      {
        "heading": "A. Ways of communicating (Các phương thức liên lạc)",
        "items": [
          {
            "word": "letter / postcard",
            "type": "Danh từ",
            "phonetic": "letter: /ˈletə/ | postcard: /ˈpəʊstkɑːd/",
            "vi": "Thư tay / Bưu thiếp.",
            "example": "He sent me a postcard from Paris and a long letter."
          },
          {
            "word": "email / text message",
            "type": "Danh từ",
            "phonetic": "email: /ˈiːmeɪl/ | text message: /tekst ˈmesɪdʒ/",
            "vi": "Thư điện tử / Tin nhắn văn bản.",
            "example": "I got an email from my boss and a text message from a friend."
          }
        ]
      },
      {
        "heading": "B. Computer and Internet (Máy tính và Mạng internet)",
        "items": [
          {
            "word": "keyboard / mouse / screen",
            "type": "Danh từ",
            "phonetic": "keyboard: /ˈkiːbɔːd/ | mouse: /maʊs/ | screen: /skriːn/",
            "vi": "Bàn phím / Chuột máy tính / Màn hình.",
            "example": "Use the keyboard to type and the mouse to click on the screen."
          },
          {
            "word": "website / online",
            "type": "Danh từ / Tính từ",
            "phonetic": "website: /ˈwebsaɪt/ | online: /ˌɒnˈlaɪn/",
            "vi": "Trang web / Trực tuyến.",
            "example": "You can find all details online on our official website."
          },
          {
            "word": "download / save / delete",
            "type": "Động từ",
            "phonetic": "download: /ˌdaʊnˈləʊd/ | save: /seɪv/ | delete: /dɪˈliːt/",
            "vi": "Tải xuống / Lưu lại / Xóa đi.",
            "example": "Download the file, save it on your computer, and delete the old version."
          }
        ]
      },
      {
        "heading": "C. Phone communications (Liên lạc qua điện thoại)",
        "items": [
          {
            "word": "make a phone call",
            "type": "Cụm động từ",
            "phonetic": "/meɪk ə fəʊn kɔːl/",
            "vi": "Gọi một cuộc điện thoại.",
            "example": "I need to make a phone call to my parents."
          },
          {
            "word": "voicemail / ring",
            "type": "Danh từ / Động từ",
            "phonetic": "voicemail: /ˈvɔɪsmeɪl/ | ring: /rɪŋ/",
            "vi": "Tin nhắn thoại / Rung chuông.",
            "example": "If I don't answer, leave a voicemail. The phone is ringing."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Post & Written",
        "Digital & Computers",
        "Phone & Telecom",
        "Action Verbs"
      ],
      "items": [
        {
          "id": "i1",
          "word": "letter",
          "target": "Post & Written",
          "vi": "lá thư tay"
        },
        {
          "id": "i2",
          "word": "postcard",
          "target": "Post & Written",
          "vi": "bưu thiếp"
        },
        {
          "id": "i3",
          "word": "package",
          "target": "Post & Written",
          "vi": "bưu kiện"
        },
        {
          "id": "i4",
          "word": "envelope",
          "target": "Post & Written",
          "vi": "phong bì"
        },
        {
          "id": "i5",
          "word": "stamp",
          "target": "Post & Written",
          "vi": "con tem"
        },
        {
          "id": "i6",
          "word": "address",
          "target": "Post & Written",
          "vi": "địa chỉ nhận"
        },
        {
          "id": "i7",
          "word": "computer",
          "target": "Digital & Computers",
          "vi": "máy tính"
        },
        {
          "id": "i8",
          "word": "keyboard",
          "target": "Digital & Computers",
          "vi": "bàn phím"
        },
        {
          "id": "i9",
          "word": "mouse",
          "target": "Digital & Computers",
          "vi": "con chuột"
        },
        {
          "id": "i10",
          "word": "screen",
          "target": "Digital & Computers",
          "vi": "màn hình"
        },
        {
          "id": "i11",
          "word": "website",
          "target": "Digital & Computers",
          "vi": "trang web"
        },
        {
          "id": "i12",
          "word": "internet",
          "target": "Digital & Computers",
          "vi": "mạng internet"
        },
        {
          "id": "i13",
          "word": "online",
          "target": "Digital & Computers",
          "vi": "trực tuyến"
        },
        {
          "id": "i14",
          "word": "email address",
          "target": "Digital & Computers",
          "vi": "địa chỉ email"
        },
        {
          "id": "i15",
          "word": "mobile phone",
          "target": "Phone & Telecom",
          "vi": "điện thoại di động"
        },
        {
          "id": "i16",
          "word": "text message",
          "target": "Phone & Telecom",
          "vi": "tin nhắn chữ"
        },
        {
          "id": "i17",
          "word": "voicemail",
          "target": "Phone & Telecom",
          "vi": "thư thoại"
        },
        {
          "id": "i18",
          "word": "phone call",
          "target": "Phone & Telecom",
          "vi": "cuộc gọi điện"
        },
        {
          "id": "i19",
          "word": "ringtone",
          "target": "Phone & Telecom",
          "vi": "nhạc chuông"
        },
        {
          "id": "i20",
          "word": "apps",
          "target": "Phone & Telecom",
          "vi": "ứng dụng di động"
        },
        {
          "id": "i21",
          "word": "download",
          "target": "Action Verbs",
          "vi": "tải xuống"
        },
        {
          "id": "i22",
          "word": "upload",
          "target": "Action Verbs",
          "vi": "tải lên"
        },
        {
          "id": "i23",
          "word": "save",
          "target": "Action Verbs",
          "vi": "lưu giữ"
        },
        {
          "id": "i24",
          "word": "delete",
          "target": "Action Verbs",
          "vi": "xóa bỏ"
        },
        {
          "id": "i25",
          "word": "send",
          "target": "Action Verbs",
          "vi": "gửi đi"
        },
        {
          "id": "i26",
          "word": "write",
          "target": "Action Verbs",
          "vi": "viết"
        },
        {
          "id": "i27",
          "word": "post",
          "target": "Action Verbs",
          "vi": "gửi bưu điện"
        },
        {
          "id": "i28",
          "word": "type",
          "target": "Action Verbs",
          "vi": "gõ phím"
        },
        {
          "id": "i29",
          "word": "click",
          "target": "Action Verbs",
          "vi": "nhấp chuột"
        },
        {
          "id": "i30",
          "word": "reply",
          "target": "Action Verbs",
          "vi": "hồi đáp"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. I typed the email on my keyboard and clicked the button on the _____.",
        "options": [
          "mouse",
          "screen",
          "stamp",
          "voicemail"
        ],
        "a": "screen"
      },
      {
        "q": "2. If you don't save the document, you will _____ all your changes.",
        "options": [
          "delete",
          "download",
          "save",
          "lose"
        ],
        "a": "lose"
      },
      {
        "q": "3. He sent me a beautiful photo _____ from his holiday in Greece.",
        "options": [
          "letter",
          "postcard",
          "email",
          "envelope"
        ],
        "a": "postcard"
      },
      {
        "q": "4. You need to put a _____ on the envelope before posting a letter.",
        "options": [
          "stamp",
          "mouse",
          "app",
          "voicemail"
        ],
        "a": "stamp"
      },
      {
        "q": "5. Can you send me a _____? I am in a quiet meeting and cannot talk.",
        "options": [
          "phone call",
          "text message",
          "voicemail",
          "postcard"
        ],
        "a": "text message"
      },
      {
        "q": "6. I couldn't reach him, so I left a message on his _____.",
        "options": [
          "envelope",
          "website",
          "voicemail",
          "keyboard"
        ],
        "a": "voicemail"
      },
      {
        "q": "7. Use the _____ to move the cursor on the screen.",
        "options": [
          "keyboard",
          "mouse",
          "stamp",
          "letter"
        ],
        "a": "mouse"
      },
      {
        "q": "8. I will _____ this software from the internet; it is free.",
        "options": [
          "delete",
          "save",
          "download",
          "post"
        ],
        "a": "download"
      },
      {
        "q": "9. Please send the document to my _____ (john@gmail.com).",
        "options": [
          "address",
          "email address",
          "website",
          "phone call"
        ],
        "a": "email address"
      },
      {
        "q": "10. The phone is _____! Can you answer it?",
        "options": [
          "ringing",
          "clicking",
          "typing",
          "saving"
        ],
        "a": "ringing"
      },
      {
        "q": "11. He doesn't go to shops; he buys everything _____.",
        "options": [
          "online",
          "by hand",
          "by cash",
          "post"
        ],
        "a": "online"
      },
      {
        "q": "12. I visited their official _____ to find the company's address.",
        "options": [
          "screen",
          "keyboard",
          "website",
          "envelope"
        ],
        "a": "website"
      },
      {
        "q": "13. Don't forget to put the letter inside the _____ and seal it.",
        "options": [
          "envelope",
          "stamp",
          "postcard",
          "mouse"
        ],
        "a": "envelope"
      },
      {
        "q": "14. Please write your postal _____ clearly so the letter arrives.",
        "options": [
          "website",
          "address",
          "email",
          "voicemail"
        ],
        "a": "address"
      },
      {
        "q": "15. I need to make a quick _____ to my mother.",
        "options": [
          "phone call",
          "text message",
          "postcard",
          "email"
        ],
        "a": "phone call"
      },
      {
        "q": "16. You are typing too fast on that noisy _____.",
        "options": [
          "mouse",
          "screen",
          "keyboard",
          "envelope"
        ],
        "a": "keyboard"
      },
      {
        "q": "17. If you don't need this photo, you can _____ it.",
        "options": [
          "delete",
          "save",
          "download",
          "upload"
        ],
        "a": "delete"
      },
      {
        "q": "18. He has many useful _____ on his mobile phone.",
        "options": [
          "postcards",
          "stamps",
          "apps",
          "envelopes"
        ],
        "a": "apps"
      },
      {
        "q": "19. Click the left button of the _____ to select the link.",
        "options": [
          "keyboard",
          "mouse",
          "screen",
          "stamp"
        ],
        "a": "mouse"
      },
      {
        "q": "20. I will _____ the photos to my Google Drive to keep them safe.",
        "options": [
          "download",
          "upload",
          "delete",
          "post"
        ],
        "a": "upload"
      }
    ],
    "typingGame": [
      {
        "q": "Thư tay: l _ _ t _ r",
        "hint": "l e t t e r",
        "a": "letter"
      },
      {
        "q": "Bưu thiếp: p _ _ _ c _ _ d",
        "hint": "p o s t c a r d",
        "a": "postcard"
      },
      {
        "q": "Bàn phím: k _ _ b _ _ _ d",
        "hint": "k e y b o a r d",
        "a": "keyboard"
      },
      {
        "q": "Chuột máy tính: m _ _ s e",
        "hint": "m o u s e",
        "a": "mouse"
      },
      {
        "q": "Màn hình: s _ _ _ e n",
        "hint": "s c r e e n",
        "a": "screen"
      },
      {
        "q": "Thư điện tử: e _ _ _ l",
        "hint": "e m a i l",
        "a": "email"
      },
      {
        "q": "Tải xuống: d _ _ _ l _ _ d",
        "hint": "d o w n l o a d",
        "a": "download"
      },
      {
        "q": "Xóa đi: d _ _ _ t e",
        "hint": "d e l e t e",
        "a": "delete"
      },
      {
        "q": "Lưu lại: s _ _ e",
        "hint": "s a v e",
        "a": "save"
      },
      {
        "q": "Địa chỉ: a _ _ _ _ s s",
        "hint": "a d d r e s s",
        "a": "address"
      },
      {
        "q": "Trang web: w _ _ s _ t e",
        "hint": "w e b s i t e",
        "a": "website"
      },
      {
        "q": "Trực tuyến: o _ _ _ n e",
        "hint": "o n l i n e",
        "a": "online"
      },
      {
        "q": "Tin nhắn thoại: v _ _ c _ _ _ _ l",
        "hint": "v o i c e m a i l",
        "a": "voicemail"
      },
      {
        "q": "Chuông điện thoại kêu: r _ _ g",
        "hint": "r i n ɡ",
        "a": "ring"
      },
      {
        "q": "Con tem: s _ _ m p",
        "hint": "s t a m p",
        "a": "stamp"
      },
      {
        "q": "Phong bì: e _ _ _ l _ p e",
        "hint": "e n v e l o p e",
        "a": "envelope"
      },
      {
        "q": "Ứng dụng di động: a _ p s",
        "hint": "a p p s",
        "a": "apps"
      },
      {
        "q": "Gõ phím: t _ _ e",
        "hint": "t y p e",
        "a": "type"
      },
      {
        "q": "Gửi bưu điện: p _ s t",
        "hint": "p o s t",
        "a": "post"
      },
      {
        "q": "Nhấp chuột: c _ _ c k",
        "hint": "c l i c k",
        "a": "click"
      }
    ],
    "speaking": [
      {
        "text": "Can you send me a text message with your email address?",
        "trans": "Bạn có thể gửi cho tôi một tin nhắn văn bản kèm địa chỉ email của bạn được không?"
      },
      {
        "text": "I left a voicemail because your phone was ringing for a long time.",
        "trans": "Tôi đã để lại tin nhắn thoại vì điện thoại của bạn reo chuông suốt một lúc lâu."
      },
      {
        "text": "You can download the PDF document from our official website.",
        "trans": "Bạn có thể tải xuống tài liệu PDF từ trang web chính thức của chúng tôi."
      },
      {
        "text": "Don't forget to save your file before you delete the old one.",
        "trans": "Đừng quên lưu tệp của bạn trước khi bạn xóa tệp cũ."
      },
      {
        "text": "I bought stamps at the post office and sent a letter to my ex-boss.",
        "trans": "Tôi đã mua tem ở bưu điện và gửi một lá thư cho sếp cũ của tôi."
      }
    ]
  },
  {
    "id": 50,
    "title": "Unit 50: Holidays",
    "description": "Học từ vựng về các loại hình du lịch, đồ dùng cá nhân khi đi xa, các hoạt động tham quan và cách viết bưu thiếp du lịch.",
    "theory": [
      {
        "heading": "A. Types of holidays (Các hình thức du lịch phổ biến)",
        "items": [
          {
            "word": "package holiday",
            "type": "Danh từ",
            "phonetic": "/ˈpækɪdʒ ˈhɒlɪdeɪ/",
            "vi": "Du lịch trọn gói (đã bao gồm vé bay, khách sạn, đồ ăn).",
            "example": "We booked a package holiday to Italy."
          },
          {
            "word": "sightseeing",
            "type": "Danh từ",
            "phonetic": "/ˈsaɪtˌsiː.ɪŋ/",
            "vi": "Hoạt động ngắm cảnh, tham quan các địa danh nổi tiếng.",
            "example": "We did lots of sightseeing in Rome."
          },
          {
            "word": "camping",
            "type": "Danh từ",
            "phonetic": "/ˈkæm.pɪŋ/",
            "vi": "Cắm trại ngoài trời (ngủ trong lều dã ngoại).",
            "example": "We love camping in the mountains during summer."
          }
        ]
      },
      {
        "heading": "B. Travel essentials (Đồ dùng cần thiết khi đi du lịch)",
        "items": [
          {
            "word": "passport / visa",
            "type": "Danh từ",
            "phonetic": "passport: /ˈpɑːspɔːt/ | visa: /ˈviːzə/",
            "vi": "Hộ chiếu / Thị thực xuất nhập cảnh.",
            "example": "You cannot travel abroad without a passport and a visa."
          },
          {
            "word": "suitcase / ticket / map",
            "type": "Danh từ",
            "phonetic": "suitcase: /ˈsuːtkeɪs/ | ticket: /ˈtɪkɪt/ | map: /mæp/",
            "vi": "Va li / Vé đi lại / Bản đồ.",
            "example": "I packed my suitcase, printed my ticket, and bought a city map."
          }
        ]
      },
      {
        "heading": "C. Holiday activities (Các hoạt động giải trí ngày nghỉ)",
        "items": [
          {
            "word": "go on holiday / have a holiday",
            "type": "Cụm từ",
            "phonetic": "go on holiday: /ɡəʊ ɒn ˈhɒlɪdeɪ/ | have holiday: /hæv ə ˈhɒlɪdeɪ/",
            "vi": "Đi nghỉ mát / Có kỳ nghỉ mát.",
            "example": "We are going on holiday next week. I had a wonderful holiday."
          },
          {
            "word": "take photos / buy souvenirs",
            "type": "Cụm từ",
            "phonetic": "take photos: /teɪk ˈfəʊtəʊz/ | buy souvenirs: /baɪ ˌsuːvəˈnɪəz/",
            "vi": "Chụp ảnh / Mua quà lưu niệm.",
            "example": "I took many photos of the mountains and bought souvenirs for my friends."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Types of Holidays",
        "Travel Gear & Docs",
        "Holiday Activities",
        "Places to Travel"
      ],
      "items": [
        {
          "id": "i1",
          "word": "package holiday",
          "target": "Types of Holidays",
          "vi": "du lịch trọn gói"
        },
        {
          "id": "i2",
          "word": "sightseeing",
          "target": "Types of Holidays",
          "vi": "đi tham quan ngắm cảnh"
        },
        {
          "id": "i3",
          "word": "camping",
          "target": "Types of Holidays",
          "vi": "đi cắm trại dã ngoại"
        },
        {
          "id": "i4",
          "word": "beach holiday",
          "target": "Types of Holidays",
          "vi": "nghỉ mát bãi biển"
        },
        {
          "id": "i5",
          "word": "activity holiday",
          "target": "Types of Holidays",
          "vi": "du lịch trải nghiệm vận động"
        },
        {
          "id": "i6",
          "word": "cruise",
          "target": "Types of Holidays",
          "vi": "du thuyền du ngoạn"
        },
        {
          "id": "i7",
          "word": "passport",
          "target": "Travel Gear & Docs",
          "vi": "hộ chiếu quốc tế"
        },
        {
          "id": "i8",
          "word": "visa",
          "target": "Travel Gear & Docs",
          "vi": "thị thực, visa"
        },
        {
          "id": "i9",
          "word": "suitcase",
          "target": "Travel Gear & Docs",
          "vi": "va li hành lý"
        },
        {
          "id": "i10",
          "word": "ticket",
          "target": "Travel Gear & Docs",
          "vi": "vé máy bay/tàu"
        },
        {
          "id": "i11",
          "word": "map",
          "target": "Travel Gear & Docs",
          "vi": "bản đồ chỉ đường"
        },
        {
          "id": "i12",
          "word": "currency",
          "target": "Travel Gear & Docs",
          "vi": "ngoại tệ, tiền tệ"
        },
        {
          "id": "i13",
          "word": "sunglasses",
          "target": "Travel Gear & Docs",
          "vi": "kính râm"
        },
        {
          "id": "i14",
          "word": "camera",
          "target": "Travel Gear & Docs",
          "vi": "máy ảnh"
        },
        {
          "id": "i15",
          "word": "go on holiday",
          "target": "Holiday Activities",
          "vi": "đi du lịch nghỉ mát"
        },
        {
          "id": "i16",
          "word": "take photos",
          "target": "Holiday Activities",
          "vi": "chụp hình ảnh"
        },
        {
          "id": "i17",
          "word": "buy souvenirs",
          "target": "Holiday Activities",
          "vi": "mua quà lưu niệm"
        },
        {
          "id": "i18",
          "word": "sunbathe",
          "target": "Holiday Activities",
          "vi": "tắm nắng"
        },
        {
          "id": "i19",
          "word": "explore the town",
          "target": "Holiday Activities",
          "vi": "khám phá thị trấn"
        },
        {
          "id": "i20",
          "word": "relax",
          "target": "Holiday Activities",
          "vi": "thư giãn đầu óc"
        },
        {
          "id": "i21",
          "word": "send postcards",
          "target": "Holiday Activities",
          "vi": "gửi bưu thiếp du lịch"
        },
        {
          "id": "i22",
          "word": "beach",
          "target": "Places to Travel",
          "vi": "bãi biển"
        },
        {
          "id": "i23",
          "word": "sea",
          "target": "Places to Travel",
          "vi": "biển khơi"
        },
        {
          "id": "i24",
          "word": "mountains",
          "target": "Places to Travel",
          "vi": "vùng núi non"
        },
        {
          "id": "i25",
          "word": "forest",
          "target": "Places to Travel",
          "vi": "khu rừng xanh"
        },
        {
          "id": "i26",
          "word": "lake",
          "target": "Places to Travel",
          "vi": "hồ nước"
        },
        {
          "id": "i27",
          "word": "hotel",
          "target": "Places to Travel",
          "vi": "khách sạn"
        },
        {
          "id": "i28",
          "word": "campsite",
          "target": "Places to Travel",
          "vi": "khu vực cắm trại"
        },
        {
          "id": "i29",
          "word": "tourist",
          "target": "People on Holiday",
          "vi": "khách du lịch"
        },
        {
          "id": "i30",
          "word": "luggage",
          "target": "Travel Gear & Docs",
          "vi": "hành lý nói chung"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. We stayed in a tent next to the lake. We went _____.",
        "options": [
          "sightseeing",
          "camping",
          "cruising",
          "shopping"
        ],
        "a": "camping"
      },
      {
        "q": "2. We booked a _____ because flight, hotel, and food were all included.",
        "options": [
          "beach holiday",
          "sightseeing",
          "package holiday",
          "camping"
        ],
        "a": "package holiday"
      },
      {
        "q": "3. Before travelling to China, she had to get a passport and a _____.",
        "options": [
          "ticket",
          "visa",
          "map",
          "postcard"
        ],
        "a": "visa"
      },
      {
        "q": "4. Don't forget your _____! The sun is extremely bright on the beach.",
        "options": [
          "passport",
          "suitcase",
          "sunglasses",
          "map"
        ],
        "a": "sunglasses"
      },
      {
        "q": "5. He bought a beautiful wooden statue to _____ as a souvenir.",
        "options": [
          "take",
          "give",
          "keep",
          "buy"
        ],
        "a": "keep"
      },
      {
        "q": "6. I carried my clothes and shoes in a large blue _____.",
        "options": [
          "map",
          "envelope",
          "suitcase",
          "stamp"
        ],
        "a": "suitcase"
      },
      {
        "q": "7. We walked around the old city center to go _____.",
        "options": [
          "sightseeing",
          "camping",
          "hiking",
          "swimming"
        ],
        "a": "sightseeing"
      },
      {
        "q": "8. I love to lie on the beach and _____ in the morning.",
        "options": [
          "swim",
          "sunbathe",
          "explore",
          "relax"
        ],
        "a": "sunbathe"
      },
      {
        "q": "9. You need to exchange money because the local _____ is different.",
        "options": [
          "visa",
          "currency",
          "ticket",
          "stamp"
        ],
        "a": "currency"
      },
      {
        "q": "10. We decided to go _____ holiday to Spain this summer.",
        "options": [
          "on",
          "at",
          "to",
          "for"
        ],
        "a": "on"
      },
      {
        "q": "11. She used her new digital _____ to take gorgeous photos.",
        "options": [
          "camera",
          "map",
          "ticket",
          "suitcase"
        ],
        "a": "camera"
      },
      {
        "q": "12. Can you show me where the museum is on the _____?",
        "options": [
          "ticket",
          "map",
          "passport",
          "visa"
        ],
        "a": "map"
      },
      {
        "q": "13. I bought lots of _____ for my family, like keyrings and magnets.",
        "options": [
          "souvenirs",
          "postcards",
          "luggage",
          "currency"
        ],
        "a": "souvenirs"
      },
      {
        "q": "14. We slept in a high-quality _____ during our camping trip.",
        "options": [
          "hotel",
          "tent",
          "house",
          "room"
        ],
        "a": "tent"
      },
      {
        "q": "15. The sandy _____ was covered in beautiful white shells.",
        "options": [
          "sea",
          "beach",
          "lake",
          "mountain"
        ],
        "a": "beach"
      },
      {
        "q": "16. A person who is visiting a country for pleasure is a _____.",
        "options": [
          "tourist",
          "manager",
          "secretary",
          "dentist"
        ],
        "a": "tourist"
      },
      {
        "q": "17. We had a great time _____ in the warm clear sea.",
        "options": [
          "climbing",
          "swimming",
          "camping",
          "exploring"
        ],
        "a": "swimming"
      },
      {
        "q": "18. I printed my boarding _____ before going to the airport.",
        "options": [
          "ticket",
          "map",
          "visa",
          "postcard"
        ],
        "a": "ticket"
      },
      {
        "q": "19. The hotel has a beautiful view of the blue _____.",
        "options": [
          "campsite",
          "sea",
          "forest",
          "mountain"
        ],
        "a": "sea"
      },
      {
        "q": "20. I always send a _____ to my grandparents when I travel.",
        "options": [
          "letter",
          "postcard",
          "email",
          "voicemail"
        ],
        "a": "postcard"
      }
    ],
    "typingGame": [
      {
        "q": "Cắm trại: c _ _ p _ _ g",
        "hint": "c a m p i n ɡ",
        "a": "camping"
      },
      {
        "q": "Đi tham quan: s _ _ h _ s _ _ _ _ g",
        "hint": "s i ɡ h t s e e i n ɡ",
        "a": "sightseeing"
      },
      {
        "q": "Du lịch trọn gói: p _ _ k _ _ e holiday",
        "hint": "p a c k a ɡ e",
        "a": "package"
      },
      {
        "q": "Hộ chiếu: p _ _ s p _ _ t",
        "hint": "p a s s p o r t",
        "a": "passport"
      },
      {
        "q": "Thị thực: v _ _ a",
        "hint": "v i s a",
        "a": "visa"
      },
      {
        "q": "Va li hành lý: s _ _ t c _ _ e",
        "hint": "s u i t c a s e",
        "a": "suitcase"
      },
      {
        "q": "Vé đi lại: t _ _ k _ t",
        "hint": "t i c k e t",
        "a": "ticket"
      },
      {
        "q": "Bản đồ: m _ p",
        "hint": "m a p",
        "a": "map"
      },
      {
        "q": "Ngoại tệ: c _ _ r _ _ _ y",
        "hint": "c u r r e n c y",
        "a": "currency"
      },
      {
        "q": "Kính râm: s _ _ g _ _ _ s _ s",
        "hint": "s u n ɡ l a s s e s",
        "a": "sunglasses"
      },
      {
        "q": "Máy ảnh: c _ _ e _ a",
        "hint": "c a m e r a",
        "a": "camera"
      },
      {
        "q": "Quà lưu niệm: s _ _ v _ _ _ r s",
        "hint": "s o u v e n i r s",
        "a": "souvenirs"
      },
      {
        "q": "Tắm nắng: s _ _ b _ _ _ e",
        "hint": "s u n b a t h e",
        "a": "sunbathe"
      },
      {
        "q": "Thư giãn: r _ _ _ x",
        "hint": "r e l a x",
        "a": "relax"
      },
      {
        "q": "Bãi biển: b _ _ c h",
        "hint": "b e a c h",
        "a": "beach"
      },
      {
        "q": "Khách du lịch: t _ _ r _ s t",
        "hint": "t o u r i s t",
        "a": "tourist"
      },
      {
        "q": "Chiếc lều: t _ n t",
        "hint": "t e n t",
        "a": "tent"
      },
      {
        "q": "Bưu thiếp du lịch: p _ _ t c _ _ d",
        "hint": "p o s t c a r d",
        "a": "postcard"
      },
      {
        "q": "Chụp ảnh: t _ _ e photos",
        "hint": "t a k e",
        "a": "take"
      },
      {
        "q": "Nghỉ mát: go on h _ _ _ _ _ y",
        "hint": "h o l i d a y",
        "a": "holiday"
      }
    ],
    "speaking": [
      {
        "text": "We booked a package holiday because it was much cheaper.",
        "trans": "Chúng tôi đã đặt một kỳ nghỉ trọn gói vì nó rẻ hơn nhiều."
      },
      {
        "text": "You must show your passport and visa at the airport border.",
        "trans": "Bạn phải xuất trình hộ chiếu và thị thực tại cửa khẩu sân bay."
      },
      {
        "text": "I love lying on the sandy beach to sunbathe and relax.",
        "trans": "Tôi thích nằm trên bãi biển cát trắng để tắm nắng và thư giãn."
      },
      {
        "text": "He spent a lot of money to buy souvenirs and take photos.",
        "trans": "Anh ấy đã chi nhiều tiền để mua quà lưu niệm và chụp ảnh."
      },
      {
        "text": "Can you show me where the campsite is on the map?",
        "trans": "Bạn có thể chỉ cho tôi khu cắm trại ở đâu trên bản đồ được không?"
      }
    ]
  },
  {
    "id": 51,
    "title": "Unit 51: Shops and shopping",
    "description": "Học từ vựng về các loại cửa hàng chuyên dụng, các đồ vật tại nơi mua sắm, giao dịch thanh toán và từ vựng về hàng hiệu, giảm giá.",
    "theory": [
      {
        "heading": "A. Types of shops (Các loại cửa hàng bán lẻ chuyên dụng)",
        "items": [
          {
            "word": "supermarket / department store",
            "type": "Danh từ",
            "phonetic": "supermarket: /ˈsuːpəmɑːkɪt/ | department store: /dɪˈpɑːtmənt stɔː/",
            "vi": "Siêu thị / Cửa hàng bách hóa tổng hợp.",
            "example": "We buy food in the supermarket and clothes in the department store."
          },
          {
            "word": "baker's / butcher's / chemist's",
            "type": "Danh từ",
            "phonetic": "baker's: /ˈbeɪkəz/ | butcher's: /ˈbʊtʃəz/ | chemist's: /ˈkemɪsts/",
            "vi": "Tiệm bánh mì / Tiệm bán thịt / Hiệu thuốc tây.",
            "example": "Get bread at the baker's, sausages at the butcher's, and aspirin at the chemist's."
          },
          {
            "word": "bookshop / shoe shop",
            "type": "Danh từ",
            "phonetic": "bookshop: /ˈbʊkʃɒp/ | shoe shop: /ʃuː ʃɒp/",
            "vi": "Hiệu sách / Cửa hàng bán giày.",
            "example": "I bought a novel at the bookshop and trainers at the shoe shop."
          }
        ]
      },
      {
        "heading": "B. Inside the shop (Các đồ vật thường gặp tại cửa hàng)",
        "items": [
          {
            "word": "trolley / basket",
            "type": "Danh từ",
            "phonetic": "trolley: /ˈtrɒli/ | basket: /ˈbɑːskɪt/",
            "vi": "Xe đẩy siêu thị / Giỏ xách mua hàng.",
            "example": "Put heavy items in the trolley and small items in the basket."
          },
          {
            "word": "queue / checkout / receipt",
            "type": "Danh từ",
            "phonetic": "queue: /kjuː/ | checkout: /ˈtʃekaʊt/ | receipt: /rɪˈsiːt/",
            "vi": "Hàng người xếp hàng / Quầy thu ngân / Hóa đơn mua hàng.",
            "example": "There is a long queue at the checkout. Keep your receipt."
          }
        ]
      },
      {
        "heading": "C. Paying & Money (Giao dịch và tiền nong)",
        "items": [
          {
            "word": "cash / credit card",
            "type": "Danh từ",
            "phonetic": "cash: /kæʃ/ | credit card: /ˈkredɪt kɑːd/",
            "vi": "Tiền mặt / Thẻ tín dụng.",
            "example": "You can pay in cash or by credit card."
          },
          {
            "word": "price / discount / sale",
            "type": "Danh từ",
            "phonetic": "price: /praɪs/ | discount: /ˈdɪskaʊnt/ | sale: /seɪl/",
            "vi": "Giá cả / Phần trăm giảm giá / Đợt giảm giá xả hàng.",
            "example": "The price is cheap because the store has a big sale."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Retail Shops",
        "In the Shop",
        "Money & Payment",
        "Shopping Actions"
      ],
      "items": [
        {
          "id": "i1",
          "word": "supermarket",
          "target": "Retail Shops",
          "vi": "siêu thị thực phẩm"
        },
        {
          "id": "i2",
          "word": "baker's",
          "target": "Retail Shops",
          "vi": "cửa hàng bánh mì"
        },
        {
          "id": "i3",
          "word": "butcher's",
          "target": "Retail Shops",
          "vi": "cửa hàng bán thịt"
        },
        {
          "id": "i4",
          "word": "chemist's",
          "target": "Retail Shops",
          "vi": "hiệu thuốc tây"
        },
        {
          "id": "i5",
          "word": "bookshop",
          "target": "Retail Shops",
          "vi": "hiệu sách"
        },
        {
          "id": "i6",
          "word": "department store",
          "target": "Retail Shops",
          "vi": "cửa hàng bách hóa"
        },
        {
          "id": "i7",
          "word": "clothes shop",
          "target": "Retail Shops",
          "vi": "cửa hàng quần áo"
        },
        {
          "id": "i8",
          "word": "shoe shop",
          "target": "Retail Shops",
          "vi": "cửa hàng giày dép"
        },
        {
          "id": "i9",
          "word": "trolley",
          "target": "In the Shop",
          "vi": "xe đẩy mua hàng"
        },
        {
          "id": "i10",
          "word": "basket",
          "target": "In the Shop",
          "vi": "giỏ xách mua hàng"
        },
        {
          "id": "i11",
          "word": "queue",
          "target": "In the Shop",
          "vi": "hàng xếp chờ"
        },
        {
          "id": "i12",
          "word": "checkout",
          "target": "In the Shop",
          "vi": "quầy thu ngân"
        },
        {
          "id": "i13",
          "word": "receipt",
          "target": "In the Shop",
          "vi": "hóa đơn thanh toán"
        },
        {
          "id": "i14",
          "word": "customer",
          "target": "In the Shop",
          "vi": "khách mua hàng"
        },
        {
          "id": "i15",
          "word": "shop assistant",
          "target": "In the Shop",
          "vi": "nhân viên hỗ trợ"
        },
        {
          "id": "i16",
          "word": "price",
          "target": "Money & Payment",
          "vi": "mức giá"
        },
        {
          "id": "i17",
          "word": "cash",
          "target": "Money & Payment",
          "vi": "tiền mặt"
        },
        {
          "id": "i18",
          "word": "credit card",
          "target": "Money & Payment",
          "vi": "thẻ tín dụng"
        },
        {
          "id": "i19",
          "word": "change",
          "target": "Money & Payment",
          "vi": "tiền lẻ trả lại"
        },
        {
          "id": "i20",
          "word": "discount",
          "target": "Money & Payment",
          "vi": "chiết khấu giảm giá"
        },
        {
          "id": "i21",
          "word": "sale",
          "target": "Money & Payment",
          "vi": "đợt đại hạ giá"
        },
        {
          "id": "i22",
          "word": "refund",
          "target": "Money & Payment",
          "vi": "khoản hoàn tiền"
        },
        {
          "id": "i23",
          "word": "buy",
          "target": "Shopping Actions",
          "vi": "mua"
        },
        {
          "id": "i24",
          "word": "sell",
          "target": "Shopping Actions",
          "vi": "bán"
        },
        {
          "id": "i25",
          "word": "spend money",
          "target": "Shopping Actions",
          "vi": "tiêu tiền"
        },
        {
          "id": "i26",
          "word": "save money",
          "target": "Shopping Actions",
          "vi": "tiết kiệm tiền"
        },
        {
          "id": "i27",
          "word": "pay at counter",
          "target": "Shopping Actions",
          "vi": "thanh toán tại quầy"
        },
        {
          "id": "i28",
          "word": "try on clothes",
          "target": "Shopping Actions",
          "vi": "thử quần áo"
        },
        {
          "id": "i29",
          "word": "cost",
          "target": "Money & Payment",
          "vi": "có giá trị là"
        },
        {
          "id": "i30",
          "word": "expensive",
          "target": "Money & Payment",
          "vi": "đắt đỏ"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. You should buy bread at the _____.",
        "options": [
          "chemist's",
          "butcher's",
          "baker's",
          "bookshop"
        ],
        "a": "baker's"
      },
      {
        "q": "2. I need some medicine for my cold. I'm going to the _____.",
        "options": [
          "butcher's",
          "chemist's",
          "baker's",
          "department store"
        ],
        "a": "chemist's"
      },
      {
        "q": "3. If you want to buy fresh beef or sausages, see the _____.",
        "options": [
          "baker's",
          "butcher's",
          "chemist's",
          "bookshop"
        ],
        "a": "butcher's"
      },
      {
        "q": "4. The customer had to stand in a long _____ at the checkout.",
        "options": [
          "basket",
          "trolley",
          "queue",
          "receipt"
        ],
        "a": "queue"
      },
      {
        "q": "5. When you pay, the cashier gives you a _____ to show what you bought.",
        "options": [
          "receipt",
          "trolley",
          "queue",
          "change"
        ],
        "a": "receipt"
      },
      {
        "q": "6. Excuse me, what is the _____ of this jacket? - $50.",
        "options": [
          "price",
          "discount",
          "change",
          "receipt"
        ],
        "a": "price"
      },
      {
        "q": "7. I paid $20 for a $15 book, so the cashier gave me $5 _____.",
        "options": [
          "receipt",
          "change",
          "price",
          "discount"
        ],
        "a": "change"
      },
      {
        "q": "8. Can I pay _____ credit card?",
        "options": [
          "by",
          "in",
          "with",
          "at"
        ],
        "a": "by"
      },
      {
        "q": "9. Can I pay _____ cash?",
        "options": [
          "by",
          "in",
          "with",
          "at"
        ],
        "a": "in"
      },
      {
        "q": "10. The shop has a 20% _____ on all boots today.",
        "options": [
          "price",
          "receipt",
          "discount",
          "queue"
        ],
        "a": "discount"
      },
      {
        "q": "11. This luxury dress is very _____! It costs $2000.",
        "options": [
          "cheap",
          "expensive",
          "free",
          "discounted"
        ],
        "a": "expensive"
      },
      {
        "q": "12. In a supermarket, you can push a large metal _____ for your groceries.",
        "options": [
          "basket",
          "trolley",
          "queue",
          "box"
        ],
        "a": "trolley"
      },
      {
        "q": "13. I buy my books and stationery at the local _____.",
        "options": [
          "bookshop",
          "shoe shop",
          "butcher's",
          "baker's"
        ],
        "a": "bookshop"
      },
      {
        "q": "14. Let's go inside this large _____ store; it has ten floors of brands.",
        "options": [
          "supermarket",
          "department",
          "chemist",
          "butcher"
        ],
        "a": "department"
      },
      {
        "q": "15. The _____ helped me find the right size of jeans.",
        "options": [
          "customer",
          "shop assistant",
          "chef",
          "manager"
        ],
        "a": "shop assistant"
      },
      {
        "q": "16. You can pay for all your goods at the _____.",
        "options": [
          "trolley",
          "basket",
          "checkout",
          "queue"
        ],
        "a": "checkout"
      },
      {
        "q": "17. Before buying these shoes, you should _____ them on.",
        "options": [
          "try",
          "take",
          "wear",
          "look"
        ],
        "a": "try"
      },
      {
        "q": "18. If the item is damaged, you can ask for a full _____.",
        "options": [
          "refund",
          "change",
          "receipt",
          "price"
        ],
        "a": "refund"
      },
      {
        "q": "19. The shops have a winter _____ with huge price reductions.",
        "options": [
          "sale",
          "price",
          "receipt",
          "queue"
        ],
        "a": "sale"
      },
      {
        "q": "20. I spent too much _____ on clothes yesterday.",
        "options": [
          "salary",
          "money",
          "progress",
          "weather"
        ],
        "a": "money"
      }
    ],
    "typingGame": [
      {
        "q": "Hiệu thuốc tây: c _ _ m _ _ t's",
        "hint": "c h e m i s t",
        "a": "chemist's"
      },
      {
        "q": "Tiệm bánh mì: b _ _ e _'s",
        "hint": "b a k e r",
        "a": "baker's"
      },
      {
        "q": "Tiệm bán thịt: b _ _ c _ _ r's",
        "hint": "b u t c h e r",
        "a": "butcher's"
      },
      {
        "q": "Hóa đơn mua hàng: r _ _ e _ _ t",
        "hint": "r e c e i p t",
        "a": "receipt"
      },
      {
        "q": "Xe đẩy siêu thị: t _ _ l _ _ y",
        "hint": "t r o l l e y",
        "a": "trolley"
      },
      {
        "q": "Hàng đợi xếp người: q _ _ u e",
        "hint": "q u e u e",
        "a": "queue"
      },
      {
        "q": "Quầy thu ngân: c _ _ c _ _ _ t",
        "hint": "c h e c k o u t",
        "a": "checkout"
      },
      {
        "q": "Tiền mặt: c _ _ h",
        "hint": "c a s h",
        "a": "cash"
      },
      {
        "q": "Thẻ tín dụng: c _ _ d _ t card",
        "hint": "c r e d i t",
        "a": "credit"
      },
      {
        "q": "Tiền lẻ trả lại: c _ _ n _ e",
        "hint": "c h a n ɡ e",
        "a": "change"
      },
      {
        "q": "Giá cả: p _ _ c e",
        "hint": "p r i c e",
        "a": "price"
      },
      {
        "q": "Giảm giá: d _ _ c _ _ _ t",
        "hint": "d i s c o u n t",
        "a": "discount"
      },
      {
        "q": "Đợt đại hạ giá: s _ l e",
        "hint": "s a l e",
        "a": "sale"
      },
      {
        "q": "Nhân viên bán hàng: shop a _ _ _ _ _ _ _ t",
        "hint": "a s s i s t a n t",
        "a": "assistant"
      },
      {
        "q": "Khách hàng: c _ _ t _ _ _ r",
        "hint": "c u s t o m e r",
        "a": "customer"
      },
      {
        "q": "Đắt đỏ: e _ _ _ n _ _ v e",
        "hint": "e x p e n s i v e",
        "a": "expensive"
      },
      {
        "q": "Tiệm bán giày: s _ _ e shop",
        "hint": "s h o e",
        "a": "shoe"
      },
      {
        "q": "Cửa hàng bách hóa: d _ _ _ r _ _ _ n t store",
        "hint": "d e p a r t m e n t",
        "a": "department"
      },
      {
        "q": "Thanh toán (động từ): p _ y",
        "hint": "p a y",
        "a": "pay"
      },
      {
        "q": "Giỏ xách mua hàng: b _ _ k _ t",
        "hint": "b a s k e t",
        "a": "basket"
      }
    ],
    "speaking": [
      {
        "text": "Can I pay by credit card, or must I pay in cash?",
        "trans": "Tôi có thể thanh toán bằng thẻ tín dụng không, hay bắt buộc phải trả bằng tiền mặt?"
      },
      {
        "text": "Please keep your receipt in case you want a full refund.",
        "trans": "Làm ơn hãy giữ hóa đơn phòng trường hợp bạn muốn được hoàn tiền lại toàn bộ."
      },
      {
        "text": "There is a long queue of customers at the supermarket checkout.",
        "trans": "Có một hàng người xếp hàng dài gồm các khách mua hàng tại quầy thu ngân siêu thị."
      },
      {
        "text": "I bought fresh croissants at the baker's and steak at the butcher's.",
        "trans": "Tôi đã mua bánh sừng bò tươi ở tiệm bánh mì và thịt bò bít tết ở tiệm bán thịt."
      },
      {
        "text": "This department store has a fifty percent discount on many items.",
        "trans": "Cửa hàng bách hóa này đang giảm giá năm mươi phần trăm cho nhiều mặt hàng."
      }
    ]
  },
  {
    "id": 52,
    "title": "Unit 52: In a hotel",
    "description": "Học cách giao tiếp đặt phòng khách sạn, làm quen với các loại phòng, dịch vụ buồng phòng, thủ tục check-in và thanh toán hóa đơn.",
    "theory": [
      {
        "heading": "A. Hotel rooms (Các loại phòng khách sạn)",
        "items": [
          {
            "word": "single room / double room",
            "type": "Danh từ",
            "phonetic": "single room: /ˈsɪŋɡl ruːm/ | double room: /ˈdʌbl ruːm/",
            "vi": "Phòng đơn (một giường đơn) / Phòng đôi (một giường đôi lớn).",
            "example": "I booked a single room for myself, and a double room for my parents."
          },
          {
            "word": "twin room / suite",
            "type": "Danh từ",
            "phonetic": "twin room: /twɪn ruːm/ | suite: /swiːt/",
            "vi": "Phòng đôi (hai giường đơn tách rời) / Phòng hạng sang (suite - có thêm phòng khách).",
            "example": "We stayed in a twin room. The wealthy guest booked the luxury suite."
          }
        ]
      },
      {
        "heading": "B. Hotel services & facilities (Dịch vụ & Tiện ích khách sạn)",
        "items": [
          {
            "word": "reception / room service",
            "type": "Danh từ",
            "phonetic": "reception: /rɪˈsepʃn/ | room service: /ruːm ˈsɜːvɪs/",
            "vi": "Quầy lễ tân / Dịch vụ phục vụ thức ăn tận buồng phòng.",
            "example": "Leave your key card at reception. We ordered room service for breakfast."
          },
          {
            "word": "lift / key card",
            "type": "Danh từ",
            "phonetic": "lift: /lɪft/ | key card: /kiː kɑːd/",
            "vi": "Thang máy / Thẻ từ mở cửa phòng.",
            "example": "Take the lift to the fourth floor. I lost my key card."
          }
        ]
      },
      {
        "heading": "C. Hotel actions (Các thủ tục hành động cần biết)",
        "items": [
          {
            "word": "book a room",
            "type": "Cụm động từ",
            "phonetic": "/bʊk ə ruːm/",
            "vi": "Đặt phòng trước.",
            "example": "You should book a room in advance during summer holidays."
          },
          {
            "word": "check in / check out",
            "type": "Cụm động từ",
            "phonetic": "check in: /tʃek ɪn/ | check out: /tʃek aʊt/",
            "vi": "Làm thủ tục nhận phòng / Làm thủ tục trả phòng.",
            "example": "We checked in at 2 PM, and checked out at 11 AM to pay our bill."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Hotel Rooms",
        "Hotel Facilities",
        "Actions & Procedures",
        "People & Things"
      ],
      "items": [
        {
          "id": "i1",
          "word": "single room",
          "target": "Hotel Rooms",
          "vi": "phòng đơn một giường"
        },
        {
          "id": "i2",
          "word": "double room",
          "target": "Hotel Rooms",
          "vi": "phòng đôi giường lớn"
        },
        {
          "id": "i3",
          "word": "twin room",
          "target": "Hotel Rooms",
          "vi": "phòng đôi 2 giường nhỏ"
        },
        {
          "id": "i4",
          "word": "suite",
          "target": "Hotel Rooms",
          "vi": "phòng hạng sang có phòng khách"
        },
        {
          "id": "i5",
          "word": "reception",
          "target": "Hotel Facilities",
          "vi": "quầy lễ tân nhận phòng"
        },
        {
          "id": "i6",
          "word": "room service",
          "target": "Hotel Facilities",
          "vi": "phục vụ ăn uống tại phòng"
        },
        {
          "id": "i7",
          "word": "lift",
          "target": "Hotel Facilities",
          "vi": "thang máy vận hành"
        },
        {
          "id": "i8",
          "word": "lobby",
          "target": "Hotel Facilities",
          "vi": "sảnh lớn khách sạn"
        },
        {
          "id": "i9",
          "word": "bar",
          "target": "Hotel Facilities",
          "vi": "quầy bar phục vụ nước"
        },
        {
          "id": "i10",
          "word": "swimming pool",
          "target": "Hotel Facilities",
          "vi": "bể bơi thư giãn"
        },
        {
          "id": "i11",
          "word": "gym",
          "target": "Hotel Facilities",
          "vi": "phòng tập thể dục"
        },
        {
          "id": "i12",
          "word": "book a room",
          "target": "Actions & Procedures",
          "vi": "đăng ký đặt phòng trước"
        },
        {
          "id": "i13",
          "word": "check in",
          "target": "Actions & Procedures",
          "vi": "nhận phòng làm thủ tục"
        },
        {
          "id": "i14",
          "word": "check out",
          "target": "Actions & Procedures",
          "vi": "trả phòng thanh toán"
        },
        {
          "id": "i15",
          "word": "pay the bill",
          "target": "Actions & Procedures",
          "vi": "thanh toán hóa đơn phòng"
        },
        {
          "id": "i16",
          "word": "stay",
          "target": "Actions & Procedures",
          "vi": "lưu trú tạm thời"
        },
        {
          "id": "i17",
          "word": "order food",
          "target": "Actions & Procedures",
          "vi": "gọi đồ ăn thức uống"
        },
        {
          "id": "i18",
          "word": "wake-up call",
          "target": "Actions & Procedures",
          "vi": "cuộc gọi báo thức buổi sáng"
        },
        {
          "id": "i19",
          "word": "key card",
          "target": "People & Things",
          "vi": "thẻ từ mở khóa phòng"
        },
        {
          "id": "i20",
          "word": "receptionist",
          "target": "People & Things",
          "vi": "nhân viên lễ tân"
        },
        {
          "id": "i21",
          "word": "guest",
          "target": "People & Things",
          "vi": "khách lưu trú"
        },
        {
          "id": "i22",
          "word": "manager",
          "target": "People & Things",
          "vi": "giám đốc khách sạn"
        },
        {
          "id": "i23",
          "word": "luggage",
          "target": "People & Things",
          "vi": "hành lý khách mang theo"
        },
        {
          "id": "i24",
          "word": "pillow",
          "target": "People & Things",
          "vi": "gối ngủ đầu"
        },
        {
          "id": "i25",
          "word": "towel",
          "target": "People & Things",
          "vi": "khăn tắm"
        },
        {
          "id": "i26",
          "word": "soap",
          "target": "People & Things",
          "vi": "xà phòng rửa tay"
        },
        {
          "id": "i27",
          "word": "hairdryer",
          "target": "People & Things",
          "vi": "máy sấy tóc"
        },
        {
          "id": "i28",
          "word": "minibar",
          "target": "Hotel Facilities",
          "vi": "tủ lạnh mini trong phòng"
        },
        {
          "id": "i29",
          "word": "shampoo",
          "target": "People & Things",
          "vi": "dầu gội đầu"
        },
        {
          "id": "i30",
          "word": "reservation",
          "target": "Actions & Procedures",
          "vi": "sự đặt chỗ trước"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. I want a room with one large bed for my husband and me. I need a _____.",
        "options": [
          "single room",
          "twin room",
          "double room",
          "suite"
        ],
        "a": "double room"
      },
      {
        "q": "2. I want a room with two separate single beds for my friend and me. We need a _____.",
        "options": [
          "single room",
          "twin room",
          "double room",
          "suite"
        ],
        "a": "twin room"
      },
      {
        "q": "3. The first place you go to when you arrive at a hotel is the _____.",
        "options": [
          "room service",
          "reception",
          "lift",
          "minibar"
        ],
        "a": "reception"
      },
      {
        "q": "4. The staff member who works at the reception desk is the _____.",
        "options": [
          "guest",
          "receptionist",
          "chef",
          "waiter"
        ],
        "a": "receptionist"
      },
      {
        "q": "5. Instead of a key, modern hotels use a plastic _____ to unlock rooms.",
        "options": [
          "key card",
          "credit card",
          "passport",
          "bill"
        ],
        "a": "key card"
      },
      {
        "q": "6. When we finished our stay, we had to check out and pay the _____.",
        "options": [
          "money",
          "bill",
          "salary",
          "receipt"
        ],
        "a": "bill"
      },
      {
        "q": "7. I don't want to walk up to the tenth floor, let's take the _____.",
        "options": [
          "lift",
          "lobby",
          "reception",
          "room service"
        ],
        "a": "lift"
      },
      {
        "q": "8. I am very hungry, let's call the reception and order _____.",
        "options": [
          "reception",
          "room service",
          "minibar",
          "gym"
        ],
        "a": "room service"
      },
      {
        "q": "9. We need to _____ a room before we travel because hotels are busy in summer.",
        "options": [
          "stay",
          "book",
          "check in",
          "check out"
        ],
        "a": "book"
      },
      {
        "q": "10. We arrived early, so we couldn't _____ into our room until 2 PM.",
        "options": [
          "stay",
          "book",
          "check",
          "check in"
        ],
        "a": "check in"
      },
      {
        "q": "11. On the last day, we must _____ of the hotel before 12:00 noon.",
        "options": [
          "check out",
          "check in",
          "stay",
          "book"
        ],
        "a": "check out"
      },
      {
        "q": "12. A person who is staying in a hotel is a _____.",
        "options": [
          "receptionist",
          "guest",
          "manager",
          "chef"
        ],
        "a": "guest"
      },
      {
        "q": "13. There is a small fridge with drinks in your room. It is the _____.",
        "options": [
          "minibar",
          "lobby",
          "lift",
          "reception"
        ],
        "a": "minibar"
      },
      {
        "q": "14. I need to wake up at 6:00 tomorrow. Can I get a _____ call?",
        "options": [
          "room",
          "wake-up",
          "morning",
          "phone"
        ],
        "a": "wake-up"
      },
      {
        "q": "15. The large entrance hall of a hotel is called the _____.",
        "options": [
          "lobby",
          "lift",
          "gym",
          "bar"
        ],
        "a": "lobby"
      },
      {
        "q": "16. I want to have a relaxing swim in the hotel's _____.",
        "options": [
          "gym",
          "bar",
          "swimming pool",
          "lobby"
        ],
        "a": "swimming pool"
      },
      {
        "q": "17. Can I have another fresh _____ for my shower?",
        "options": [
          "pillow",
          "towel",
          "soap",
          "shampoo"
        ],
        "a": "towel"
      },
      {
        "q": "18. My neck hurts, I need another soft _____ for my bed.",
        "options": [
          "pillow",
          "towel",
          "soap",
          "key card"
        ],
        "a": "pillow"
      },
      {
        "q": "19. The hotel has a _____ with modern running and weight machines.",
        "options": [
          "bar",
          "gym",
          "lobby",
          "reception"
        ],
        "a": "gym"
      },
      {
        "q": "20. We made a _____ online last month to secure our room.",
        "options": [
          "reservation",
          "checkout",
          "room service",
          "lift"
        ],
        "a": "reservation"
      }
    ],
    "typingGame": [
      {
        "q": "Phòng đơn: s _ _ g _ e room",
        "hint": "s i n ɡ l e",
        "a": "single"
      },
      {
        "q": "Phòng đôi giường lớn: d _ _ b _ e room",
        "hint": "d o u b l e",
        "a": "double"
      },
      {
        "q": "Phòng đôi 2 giường nhỏ: t _ _ n room",
        "hint": "t w i n",
        "a": "twin"
      },
      {
        "q": "Phòng thượng hạng: s _ _ t e",
        "hint": "s u i t e",
        "a": "suite"
      },
      {
        "q": "Quầy lễ tân: r _ _ e _ _ _ _ n",
        "hint": "r e c e p t i o n",
        "a": "reception"
      },
      {
        "q": "Thang máy: l _ _ t",
        "hint": "l i f t",
        "a": "lift"
      },
      {
        "q": "Dịch vụ phòng: room s _ _ _ _ _ e",
        "hint": "s e r v i c e",
        "a": "service"
      },
      {
        "q": "Đặt phòng: b _ _ k a room",
        "hint": "b o o k",
        "a": "book"
      },
      {
        "q": "Thủ tục nhận phòng: c _ _ _ k in",
        "hint": "c h e c k",
        "a": "check"
      },
      {
        "q": "Thủ tục trả phòng: c _ _ _ k out",
        "hint": "c h e c k",
        "a": "check"
      },
      {
        "q": "Thanh toán hóa đơn: pay the b _ _ l",
        "hint": "b i l l",
        "a": "bill"
      },
      {
        "q": "Khách trọ: g _ _ s t",
        "hint": "ɡ u e s t",
        "a": "guest"
      },
      {
        "q": "Thẻ từ: k _ y card",
        "hint": "k e y",
        "a": "key"
      },
      {
        "q": "Lễ tân (người): r _ _ e _ _ _ _ _ _ _ t",
        "hint": "r e c e p t i o n i s t",
        "a": "receptionist"
      },
      {
        "q": "Gối ngủ: p _ _ l _ w",
        "hint": "p i l l o w",
        "a": "pillow"
      },
      {
        "q": "Khăn tắm: t _ _ e l",
        "hint": "t o w e l",
        "a": "towel"
      },
      {
        "q": "Hành lý: l _ _ g _ _ e",
        "hint": "l u ɡ ɡ a ɡ e",
        "a": "luggage"
      },
      {
        "q": "Báo thức bằng cuộc gọi: w _ _ e-up call",
        "hint": "w a k e",
        "a": "wake"
      },
      {
        "q": "Tủ lạnh nhỏ trong phòng: m _ _ _ b _ r",
        "hint": "m i n i b a r",
        "a": "minibar"
      },
      {
        "q": "Chỗ đặt phòng trước: r _ _ e _ _ _ _ _ _ n",
        "hint": "r e s e r v a t i o n",
        "a": "reservation"
      }
    ],
    "speaking": [
      {
        "text": "Can I book a double room with a bathroom, please?",
        "trans": "Tôi có thể đặt một phòng đôi có phòng tắm được không?"
      },
      {
        "text": "We checked in at reception and receptionist gave us our key card.",
        "trans": "Chúng tôi đã làm thủ tục nhận phòng tại quầy lễ tân và nhân viên lễ tân đã đưa cho chúng tôi thẻ từ."
      },
      {
        "text": "I ordered room service for a hot breakfast in my suite.",
        "trans": "Tôi đã gọi dịch vụ phục vụ phòng để ăn bữa sáng nóng sốt ngay tại phòng hạng sang của mình."
      },
      {
        "text": "Please call me at seven tomorrow morning for my wake-up call.",
        "trans": "Làm ơn hãy gọi cho tôi vào 7 giờ sáng mai để báo thức."
      },
      {
        "text": "I lost my key card, can I get another one at reception?",
        "trans": "Tôi đã làm mất thẻ từ phòng mình rồi, tôi có thể nhận cái khác tại quầy lễ tân được không?"
      }
    ]
  },
  {
    "id": 53,
    "title": "Unit 53: Eating out",
    "description": "Học từ vựng phục vụ việc đi ăn ngoài nhà hàng: các hình thức quán ăn, quy trình gọi món từ thực đơn (menu), dùng bữa và thanh toán hóa đơn.",
    "theory": [
      {
        "heading": "A. Places to eat (Các địa điểm ăn uống)",
        "items": [
          {
            "word": "restaurant / café",
            "type": "Danh từ",
            "phonetic": "/ˈres.tə.rɑːnt/ /kæfˈeɪ/",
            "vi": "Nhà hàng ăn uống / Quán cà phê giải khát.",
            "example": "We had a formal dinner in a restaurant and coffee in a café."
          },
          {
            "word": "pub / fast food restaurant",
            "type": "Danh từ",
            "phonetic": "pub: /pʌb/ | fast food: /fɑːst fuːd ˈrestrɒnt/",
            "vi": "Quán bia hơi phục vụ đồ ăn / Cửa hàng ăn nhanh.",
            "example": "Let's go to the pub for a beer and chips. Kids love fast food restaurants."
          }
        ]
      },
      {
        "heading": "B. People & Procedures (Nhân sự & Quy trình đặt món)",
        "items": [
          {
            "word": "waiter / waitress / chef",
            "type": "Danh từ",
            "phonetic": "waiter: /ˈweɪtə/ | waitress: /ˈweɪtrəs/ | chef: /ʃef/",
            "vi": "Nam bồi bàn / Nữ bồi bàn / Đầu bếp trưởng.",
            "example": "The waiter took our order and the chef cooked the food."
          },
          {
            "word": "menu / order / bill / tip",
            "type": "Danh từ / Động từ",
            "phonetic": "menu: /ˈmenjuː/ | order: /ˈɔːdə/ | bill: /bɪl/ | tip: /tɪp/",
            "vi": "Thực đơn / Gọi món / Hóa đơn / Tiền boa.",
            "example": "Look at the menu. We ordered soup. Can we have the bill? We left a tip."
          }
        ]
      },
      {
        "heading": "C. Menu courses (Các phần của bữa ăn)",
        "items": [
          {
            "word": "starter",
            "type": "Danh từ",
            "phonetic": "/ˈstɑːr.t̬ɚ/",
            "vi": "Món khai vị (soup, salad).",
            "example": "For my starter, I had chicken soup."
          },
          {
            "word": "main course",
            "type": "Danh từ",
            "phonetic": "/meɪn kɔːs/",
            "vi": "Món ăn chính (steak, fish and chips).",
            "example": "My main course was steak and baked potatoes."
          },
          {
            "word": "dessert / drinks",
            "type": "Danh từ",
            "phonetic": "/dɪˈzɝːt/",
            "vi": "Món tráng miệng (ice cream, cake) / Đồ uống.",
            "example": "We had chocolate ice cream for dessert and red wine for drinks."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Eating Places",
        "Restaurant Team & Guests",
        "Menu & Courses",
        "Dining Actions"
      ],
      "items": [
        {
          "id": "i1",
          "word": "restaurant",
          "target": "Eating Places",
          "vi": "nhà hàng sang trọng"
        },
        {
          "id": "i2",
          "word": "café",
          "target": "Eating Places",
          "vi": "quán cà phê bánh ngọt"
        },
        {
          "id": "i3",
          "word": "pub",
          "target": "Eating Places",
          "vi": "quán pub, bia hơi"
        },
        {
          "id": "i4",
          "word": "fast food",
          "target": "Eating Places",
          "vi": "cửa hàng thức ăn nhanh"
        },
        {
          "id": "i5",
          "word": "pizzeria",
          "target": "Eating Places",
          "vi": "quán bánh pizza"
        },
        {
          "id": "i6",
          "word": "bistro",
          "target": "Eating Places",
          "vi": "quán ăn nhỏ kiểu Pháp"
        },
        {
          "id": "i7",
          "word": "waiter",
          "target": "Restaurant Team & Guests",
          "vi": "nam phục vụ bàn"
        },
        {
          "id": "i8",
          "word": "waitress",
          "target": "Restaurant Team & Guests",
          "vi": "nữ phục vụ bàn"
        },
        {
          "id": "i9",
          "word": "chef",
          "target": "Restaurant Team & Guests",
          "vi": "đầu bếp nấu ăn"
        },
        {
          "id": "i10",
          "word": "customer",
          "target": "Restaurant Team & Guests",
          "vi": "khách ăn uống"
        },
        {
          "id": "i11",
          "word": "menu",
          "target": "Menu & Courses",
          "vi": "thực đơn ăn uống"
        },
        {
          "id": "i12",
          "word": "starter",
          "target": "Menu & Courses",
          "vi": "món ăn khai vị"
        },
        {
          "id": "i13",
          "word": "main course",
          "target": "Menu & Courses",
          "vi": "món ăn chính"
        },
        {
          "id": "i14",
          "word": "dessert",
          "target": "Menu & Courses",
          "vi": "món ăn tráng miệng"
        },
        {
          "id": "i15",
          "word": "drinks",
          "target": "Menu & Courses",
          "vi": "đồ uống giải khát"
        },
        {
          "id": "i16",
          "word": "soup",
          "target": "Menu & Courses",
          "vi": "món súp nóng"
        },
        {
          "id": "i17",
          "word": "steak",
          "target": "Menu & Courses",
          "vi": "thịt bò bít tết"
        },
        {
          "id": "i18",
          "word": "ice cream",
          "target": "Menu & Courses",
          "vi": "kem tráng miệng"
        },
        {
          "id": "i19",
          "word": "red wine",
          "target": "Menu & Courses",
          "vi": "rượu vang đỏ"
        },
        {
          "id": "i20",
          "word": "coffee",
          "target": "Menu & Courses",
          "vi": "cà phê đen"
        },
        {
          "id": "i21",
          "word": "book a table",
          "target": "Dining Actions",
          "vi": "đăng ký đặt bàn trước"
        },
        {
          "id": "i22",
          "word": "order food",
          "target": "Dining Actions",
          "vi": "yêu cầu gọi món"
        },
        {
          "id": "i23",
          "word": "pay the bill",
          "target": "Dining Actions",
          "vi": "thanh toán tiền bữa ăn"
        },
        {
          "id": "i24",
          "word": "leave a tip",
          "target": "Dining Actions",
          "vi": "để lại tiền boa phục vụ"
        },
        {
          "id": "i25",
          "word": "eat",
          "target": "Dining Actions",
          "vi": "ăn uống"
        },
        {
          "id": "i26",
          "word": "drink",
          "target": "Dining Actions",
          "vi": "uống nước"
        },
        {
          "id": "i27",
          "word": "delicious",
          "target": "Menu & Courses",
          "vi": "ngon miệng"
        },
        {
          "id": "i28",
          "word": "service charge",
          "target": "Money & Payment",
          "vi": "phí phục vụ bàn"
        },
        {
          "id": "i29",
          "word": "cashier",
          "target": "Restaurant Team & Guests",
          "vi": "nhân viên thu ngân"
        },
        {
          "id": "i30",
          "word": "bill",
          "target": "Menu & Courses",
          "vi": "hóa đơn tiền ăn"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. The female person who brings you your food in a restaurant is the _____.",
        "options": [
          "waiter",
          "waitress",
          "chef",
          "customer"
        ],
        "a": "waitress"
      },
      {
        "q": "2. The male person who brings you your food is the _____.",
        "options": [
          "waiter",
          "waitress",
          "chef",
          "customer"
        ],
        "a": "waiter"
      },
      {
        "q": "3. The list of food and drinks with prices in a restaurant is the _____.",
        "options": [
          "receipt",
          "bill",
          "menu",
          "trolley"
        ],
        "a": "menu"
      },
      {
        "q": "4. The first course of a meal (e.g. soup) is the _____.",
        "options": [
          "starter",
          "main course",
          "dessert",
          "drinks"
        ],
        "a": "starter"
      },
      {
        "q": "5. The sweet course at the end of a meal is the _____.",
        "options": [
          "starter",
          "main course",
          "dessert",
          "drinks"
        ],
        "a": "dessert"
      },
      {
        "q": "6. I want to have steak and potatoes. That is my _____.",
        "options": [
          "starter",
          "main course",
          "dessert",
          "drinks"
        ],
        "a": "main course"
      },
      {
        "q": "7. When we finished eating, we asked the waiter for the _____.",
        "options": [
          "receipt",
          "bill",
          "salary",
          "change"
        ],
        "a": "bill"
      },
      {
        "q": "8. The service was excellent, so we left a generous _____ for the waiter.",
        "options": [
          "price",
          "salary",
          "tip",
          "bill"
        ],
        "a": "tip"
      },
      {
        "q": "9. We decided to eat at a formal _____ to celebrate her birthday.",
        "options": [
          "pub",
          "fast food",
          "restaurant",
          "campsite"
        ],
        "a": "restaurant"
      },
      {
        "q": "10. Let's go to the _____ for a quick coffee and croissant.",
        "options": [
          "pub",
          "café",
          "butcher's",
          "hotel"
        ],
        "a": "café"
      },
      {
        "q": "11. Kids love eating burgers and French fries at _____ restaurants.",
        "options": [
          "restaurant",
          "café",
          "fast food",
          "pub"
        ],
        "a": "fast food"
      },
      {
        "q": "12. The professional cook who prepares meals in the kitchen is the _____.",
        "options": [
          "waiter",
          "chef",
          "manager",
          "dentist"
        ],
        "a": "chef"
      },
      {
        "q": "13. Are you ready to _____? - Yes, chicken soup please.",
        "options": [
          "eat",
          "drink",
          "order",
          "pay"
        ],
        "a": "order"
      },
      {
        "q": "14. We went to the local _____ to have some beers with friends.",
        "options": [
          "pub",
          "supermarket",
          "chemist's",
          "library"
        ],
        "a": "pub"
      },
      {
        "q": "15. The soup was absolutely _____! It tasted wonderful.",
        "options": [
          "awful",
          "terrible",
          "delicious",
          "useless"
        ],
        "a": "delicious"
      },
      {
        "q": "16. For my tráng miệng (dessert), I had vanilla _____.",
        "options": [
          "soup",
          "steak",
          "ice cream",
          "wine"
        ],
        "a": "ice cream"
      },
      {
        "q": "17. We drank a bottle of red _____ with our steak.",
        "options": [
          "beer",
          "water",
          "wine",
          "tea"
        ],
        "a": "wine"
      },
      {
        "q": "18. I need to book a _____ for four people at 8:00 PM.",
        "options": [
          "room",
          "table",
          "chair",
          "bed"
        ],
        "a": "table"
      },
      {
        "q": "19. The waiter asked: What would you like to _____? - A bottle of mineral water.",
        "options": [
          "eat",
          "drink",
          "order",
          "pay"
        ],
        "a": "drink"
      },
      {
        "q": "20. The bill already includes a ten percent _____ charge.",
        "options": [
          "service",
          "price",
          "tip",
          "refund"
        ],
        "a": "service"
      }
    ],
    "typingGame": [
      {
        "q": "Nhà hàng: r _ _ t _ _ _ _ _ t",
        "hint": "r e s t a u r a n t",
        "a": "restaurant"
      },
      {
        "q": "Bồi bàn nam: w _ _ t _ r",
        "hint": "w a i t e r",
        "a": "waiter"
      },
      {
        "q": "Bồi bàn nữ: w _ _ t _ _ s s",
        "hint": "w a i t r e s s",
        "a": "waitress"
      },
      {
        "q": "Đầu bếp: c _ _ f",
        "hint": "c h e f",
        "a": "chef"
      },
      {
        "q": "Thực đơn: m _ _ u",
        "hint": "m e n u",
        "a": "menu"
      },
      {
        "q": "Món khai vị: s _ _ r _ _ r",
        "hint": "s t a r t e r",
        "a": "starter"
      },
      {
        "q": "Món chính: m _ _ n course",
        "hint": "m a i n",
        "a": "main"
      },
      {
        "q": "Món tráng miệng: d _ _ s _ _ t",
        "hint": "d e s s e r t",
        "a": "dessert"
      },
      {
        "q": "Hóa đơn: b _ _ l",
        "hint": "b i l l",
        "a": "bill"
      },
      {
        "q": "Tiền boa: t _ p",
        "hint": "t i p",
        "a": "tip"
      },
      {
        "q": "Quán bia hơi: p _ b",
        "hint": "p u b",
        "a": "pub"
      },
      {
        "q": "Ngon miệng: d _ _ i _ _ _ _ s",
        "hint": "d e l i c i o u s",
        "a": "delicious"
      },
      {
        "q": "Món súp: s _ _ p",
        "hint": "s o u p",
        "a": "soup"
      },
      {
        "q": "Thịt bít tết: s _ _ _ k",
        "hint": "s t e a k",
        "a": "steak"
      },
      {
        "q": "Kem tráng miệng: ice c _ _ _ m",
        "hint": "c r e a m",
        "a": "cream"
      },
      {
        "q": "Rượu vang: w _ _ e",
        "hint": "w i n e",
        "a": "wine"
      },
      {
        "q": "Gọi món (verb): o _ _ _ r",
        "hint": "o r d e r",
        "a": "order"
      },
      {
        "q": "Quán cà phê: c _ _ é",
        "hint": "c a f e",
        "a": "cafe"
      },
      {
        "q": "Thanh toán hóa đơn: pay the b _ _ l",
        "hint": "b i l l",
        "a": "bill"
      },
      {
        "q": "Đặt bàn: book a t _ _ _ e",
        "hint": "t a b l e",
        "a": "table"
      }
    ],
    "speaking": [
      {
        "text": "Can we have a table for two, please? - Yes, this way.",
        "trans": "Làm ơn cho chúng tôi đặt bàn hai người được không? - Vâng, mời đi lối này."
      },
      {
        "text": "Are you ready to order? - Yes, chicken soup for my starter, please.",
        "trans": "Bạn đã sẵn sàng gọi món chưa? - Vâng, cho tôi súp gà làm món khai vị nhé."
      },
      {
        "text": "The steak was absolutely delicious! The chef is fantastic.",
        "trans": "Món bít tết thực sự rất ngon! Đầu bếp thật tuyệt vời."
      },
      {
        "text": "Could we have the bill, please? - Yes, of course.",
        "trans": "Làm ơn cho chúng tôi xin hóa đơn thanh toán được không? - Vâng, tất nhiên rồi."
      },
      {
        "text": "We left a generous tip for the waitress because the service was excellent.",
        "trans": "Chúng tôi đã để lại một khoản tiền boa lớn cho cô phục vụ bàn vì dịch vụ cực kỳ tốt."
      }
    ]
  },
  {
    "id": 54,
    "title": "Unit 54: Sports",
    "description": "Học từ vựng về các môn thể thao đồng đội và cá nhân phổ biến, các địa điểm thi đấu, dụng cụ thể thao và động từ đi cùng.",
    "theory": [
      {
        "heading": "A. Team and Individual sports (Các môn thể thao)",
        "items": [
          {
            "word": "football / basketball / volleyball",
            "type": "Danh từ",
            "phonetic": "football: /ˈfʊtbɔːl/ | basketball: /ˈbɑːskɪtbɔːl/ | volleyball: /ˈvɒlɪbɔːl/",
            "vi": "Bóng đá / Bóng rổ / Bóng chuyền (Môn thể thao đồng đội).",
            "example": "We play football on the pitch and basketball in the gym."
          },
          {
            "word": "tennis / swimming / running",
            "type": "Danh từ",
            "phonetic": "tennis: /ˈtenɪs/ | swimming: /ˈswɪmɪŋ/ | running: /ˈrʌnɪŋ/",
            "vi": "Quần vợt / Bơi lội / Chạy bộ.",
            "example": "I play tennis on weekends and go swimming in summer."
          }
        ]
      },
      {
        "heading": "B. Places and Equipment (Địa điểm & Dụng cụ thể thao)",
        "items": [
          {
            "word": "pool / pitch / court",
            "type": "Danh từ",
            "phonetic": "pool: /puːl/ | pitch: /pɪtʃ/ | court: /cɔːt/",
            "vi": "Bể bơi / Sân cỏ bóng đá / Sân đấu quần vợt, bóng rổ.",
            "example": "We swam in the pool, played football on the pitch, and tennis on the court."
          },
          {
            "word": "racket / ball / trainers",
            "type": "Danh từ",
            "phonetic": "racket: /ˈrækɪt/ | ball: /bɔːl/ | trainers: /ˈtreɪnəz/",
            "vi": "Vợt thể thao / Quả bóng / Giày thể thao.",
            "example": "You need a tennis racket, a ball, and a good pair of trainers."
          }
        ]
      },
      {
        "heading": "C. Sports verbs & outcomes (Động từ và kết quả thi đấu)",
        "items": [
          {
            "word": "play / go / do",
            "type": "Động từ",
            "phonetic": "play: /pleɪ/ | go: /ɡəʊ/ | do: /duː/",
            "vi": "Chơi (môn dùng bóng: play football/tennis) / Đi (môn đuôi -ing: go swimming/running) / Tập (môn võ/dẻo: do judo/gymnastics).",
            "example": "I play basketball, go running, and do judo."
          },
          {
            "word": "win / lose / draw",
            "type": "Động từ",
            "phonetic": "win: /wɪn/ | lose: /luːz/ | draw: /drɔː/",
            "vi": "Thắng / Thua / Hòa.",
            "example": "Our team played well. We won 3-1 and didn't lose. Last week we drew 1-1."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Ball & Team Sports",
        "Individual Sports",
        "Equipment & Venues",
        "Sports Verbs & Terms"
      ],
      "items": [
        {
          "id": "i1",
          "word": "football",
          "target": "Ball & Team Sports",
          "vi": "bóng đá"
        },
        {
          "id": "i2",
          "word": "basketball",
          "target": "Ball & Team Sports",
          "vi": "bóng rổ"
        },
        {
          "id": "i3",
          "word": "volleyball",
          "target": "Ball & Team Sports",
          "vi": "bóng chuyền"
        },
        {
          "id": "i4",
          "word": "rugby",
          "target": "Ball & Team Sports",
          "vi": "bóng bầu dục"
        },
        {
          "id": "i5",
          "word": "baseball",
          "target": "Ball & Team Sports",
          "vi": "bóng chày"
        },
        {
          "id": "i6",
          "word": "tennis",
          "target": "Ball & Team Sports",
          "vi": "quần vợt"
        },
        {
          "id": "i7",
          "word": "golf",
          "target": "Ball & Team Sports",
          "vi": "môn đánh golf"
        },
        {
          "id": "i8",
          "word": "table tennis",
          "target": "Ball & Team Sports",
          "vi": "bóng bàn"
        },
        {
          "id": "i9",
          "word": "swimming",
          "target": "Individual Sports",
          "vi": "bơi lội"
        },
        {
          "id": "i10",
          "word": "running",
          "target": "Individual Sports",
          "vi": "chạy bộ"
        },
        {
          "id": "i11",
          "word": "cycling",
          "target": "Individual Sports",
          "vi": "đạp xe dã ngoại"
        },
        {
          "id": "i12",
          "word": "skiing",
          "target": "Individual Sports",
          "vi": "trượt tuyết"
        },
        {
          "id": "i13",
          "word": "judo",
          "target": "Individual Sports",
          "vi": "võ judo"
        },
        {
          "id": "i14",
          "word": "gymnastics",
          "target": "Individual Sports",
          "vi": "thể dục dụng cụ"
        },
        {
          "id": "i15",
          "word": "racket",
          "target": "Equipment & Venues",
          "vi": "vợt thi đấu"
        },
        {
          "id": "i16",
          "word": "ball",
          "target": "Equipment & Venues",
          "vi": "quả bóng"
        },
        {
          "id": "i17",
          "word": "trainers",
          "target": "Equipment & Venues",
          "vi": "giày thể thao chuyên dụng"
        },
        {
          "id": "i18",
          "word": "net",
          "target": "Equipment & Venues",
          "vi": "tấm lưới ngăn"
        },
        {
          "id": "i19",
          "word": "swimming pool",
          "target": "Equipment & Venues",
          "vi": "hồ bơi thi đấu"
        },
        {
          "id": "i20",
          "word": "football pitch",
          "target": "Equipment & Venues",
          "vi": "sân bóng đá"
        },
        {
          "id": "i21",
          "word": "tennis court",
          "target": "Equipment & Venues",
          "vi": "sân đấu quần vợt"
        },
        {
          "id": "i22",
          "word": "play football",
          "target": "Sports Verbs & Terms",
          "vi": "chơi bóng đá"
        },
        {
          "id": "i23",
          "word": "go swimming",
          "target": "Sports Verbs & Terms",
          "vi": "đi bơi lội"
        },
        {
          "id": "i24",
          "word": "do gymnastics",
          "target": "Sports Verbs & Terms",
          "vi": "tập thể dục dụng cụ"
        },
        {
          "id": "i25",
          "word": "win a match",
          "target": "Sports Verbs & Terms",
          "vi": "giành chiến thắng"
        },
        {
          "id": "i26",
          "word": "lose a match",
          "target": "Sports Verbs & Terms",
          "vi": "bị thua cuộc"
        },
        {
          "id": "i27",
          "word": "draw a match",
          "target": "Sports Verbs & Terms",
          "vi": "thi đấu hòa"
        },
        {
          "id": "i28",
          "word": "score a goal",
          "target": "Sports Verbs & Terms",
          "vi": "ghi một bàn thắng"
        },
        {
          "id": "i29",
          "word": "team player",
          "target": "Sports Verbs & Terms",
          "vi": "vận động viên thi đấu"
        },
        {
          "id": "i30",
          "word": "stadium",
          "target": "Equipment & Venues",
          "vi": "sân vận động lớn"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. You play tennis on a tennis _____.",
        "options": [
          "pitch",
          "court",
          "pool",
          "stadium"
        ],
        "a": "court"
      },
      {
        "q": "2. You play football on a football _____.",
        "options": [
          "pitch",
          "court",
          "pool",
          "gym"
        ],
        "a": "pitch"
      },
      {
        "q": "3. You go swimming in a swimming _____.",
        "options": [
          "court",
          "pitch",
          "pool",
          "stadium"
        ],
        "a": "pool"
      },
      {
        "q": "4. To hit the ball in tennis, you need a tennis _____.",
        "options": [
          "racket",
          "club",
          "bat",
          "net"
        ],
        "a": "racket"
      },
      {
        "q": "5. I bought a new pair of _____ to go running in the park.",
        "options": [
          "sunglasses",
          "trainers",
          "suitcases",
          "rubber"
        ],
        "a": "trainers"
      },
      {
        "q": "6. Our team scored three goals, and the other team scored zero. We _____!",
        "options": [
          "lost",
          "won",
          "drew",
          "failed"
        ],
        "a": "won"
      },
      {
        "q": "7. The match ended 2-2. It was a _____.",
        "options": [
          "win",
          "loss",
          "draw",
          "victory"
        ],
        "a": "draw"
      },
      {
        "q": "8. Do you _____ judo? - Yes, I have a brown belt.",
        "options": [
          "play",
          "go",
          "do",
          "make"
        ],
        "a": "do"
      },
      {
        "q": "9. I want to _____ running this afternoon. Would you like to join?",
        "options": [
          "play",
          "go",
          "do",
          "take"
        ],
        "a": "go"
      },
      {
        "q": "10. He loves to _____ basketball with his school friends.",
        "options": [
          "play",
          "go",
          "do",
          "draw"
        ],
        "a": "play"
      },
      {
        "q": "11. He scored a brilliant _____ in the final minute of the match.",
        "options": [
          "goal",
          "point",
          "net",
          "draw"
        ],
        "a": "goal"
      },
      {
        "q": "12. The professional game was played in a large _____ with 50,000 fans.",
        "options": [
          "court",
          "pitch",
          "stadium",
          "pool"
        ],
        "a": "stadium"
      },
      {
        "q": "13. If you want to ski, you should go to the mountains in _____.",
        "options": [
          "spring",
          "summer",
          "autumn",
          "winter"
        ],
        "a": "winter"
      },
      {
        "q": "14. A person who plays a sport is a _____.",
        "options": [
          "waiter",
          "player",
          "secretary",
          "manager"
        ],
        "a": "player"
      },
      {
        "q": "15. Which of the following is NOT played with a ball?",
        "options": [
          "tennis",
          "swimming",
          "basketball",
          "volleyball"
        ],
        "a": "swimming"
      },
      {
        "q": "16. In tennis and volleyball, the ball must fly over the _____.",
        "options": [
          "court",
          "pitch",
          "net",
          "pool"
        ],
        "a": "net"
      },
      {
        "q": "17. The opposite of 'win' is _____.",
        "options": [
          "lose",
          "draw",
          "play",
          "do"
        ],
        "a": "lose"
      },
      {
        "q": "18. She is very flexible because she does _____.",
        "options": [
          "judo",
          "gymnastics",
          "football",
          "running"
        ],
        "a": "gymnastics"
      },
      {
        "q": "19. We went _____ in the French Alps last winter.",
        "options": [
          "swimming",
          "running",
          "skiing",
          "cycling"
        ],
        "a": "skiing"
      },
      {
        "q": "20. The tennis court is divided into two parts by a _____.",
        "options": [
          "wall",
          "net",
          "line",
          "fence"
        ],
        "a": "net"
      }
    ],
    "typingGame": [
      {
        "q": "Bóng đá: f _ _ t b _ _ l",
        "hint": "f o o t b a l l",
        "a": "football"
      },
      {
        "q": "Bóng rổ: b _ _ k _ t b _ _ l",
        "hint": "b a s k e t b a l l",
        "a": "basketball"
      },
      {
        "q": "Quần vợt: t _ _ n _ s",
        "hint": "t e n n i s",
        "a": "tennis"
      },
      {
        "q": "Bơi lội: s _ _ m _ _ _ g",
        "hint": "s w i m m i n ɡ",
        "a": "swimming"
      },
      {
        "q": "Vợt tennis: r _ _ k _ t",
        "hint": "r a c k e t",
        "a": "racket"
      },
      {
        "q": "Giày thể thao: t _ _ i _ _ r s",
        "hint": "t r a i n e r s",
        "a": "trainers"
      },
      {
        "q": "Bể bơi: swimming p _ _ l",
        "hint": "p o o l",
        "a": "pool"
      },
      {
        "q": "Sân bóng đá: football p _ _ c h",
        "hint": "p i t c h",
        "a": "pitch"
      },
      {
        "q": "Sân quần vợt: tennis c _ _ r t",
        "hint": "c o u r t",
        "a": "court"
      },
      {
        "q": "Chơi bóng đá: p _ _ y football",
        "hint": "p l a y",
        "a": "play"
      },
      {
        "q": "Đi bơi: g _ swimming",
        "hint": "ɡ o",
        "a": "go"
      },
      {
        "q": "Tập võ judo: d _ judo",
        "hint": "d o",
        "a": "do"
      },
      {
        "q": "Giành chiến thắng: w _ n the match",
        "hint": "w i n",
        "a": "win"
      },
      {
        "q": "Thua cuộc: l _ _ e the match",
        "hint": "l o s e",
        "a": "lose"
      },
      {
        "q": "Thi đấu hòa: d _ _ w the match",
        "hint": "d r a w",
        "a": "draw"
      },
      {
        "q": "Ghi bàn thắng: score a g _ _ l",
        "hint": "ɡ o a l",
        "a": "goal"
      },
      {
        "q": "Trượt tuyết: s _ _ i _ g",
        "hint": "s k i i n ɡ",
        "a": "skiing"
      },
      {
        "q": "Sân vận động: s _ _ d _ _ m",
        "hint": "s t a d i u m",
        "a": "stadium"
      },
      {
        "q": "Tấm lưới: n _ t",
        "hint": "n e t",
        "a": "net"
      },
      {
        "q": "Đồng đội: t _ _ m",
        "hint": "t e a m",
        "a": "team"
      }
    ],
    "speaking": [
      {
        "text": "Do you play football? - No, I go running and swimming instead.",
        "trans": "Bạn có chơi bóng đá không? - Không, thay vào đó tôi chạy bộ và đi bơi."
      },
      {
        "text": "You need a tennis racket, a ball, and a good pair of trainers.",
        "trans": "Bạn cần một chiếc vợt quần vợt, một quả bóng và một đôi giày thể thao tốt."
      },
      {
        "text": "We played tennis on the court and then went swimming in the pool.",
        "trans": "Chúng tôi đã chơi quần vợt trên sân đấu và sau đó đã đi bơi ở bể bơi."
      },
      {
        "text": "Our team played fantastic and won the final match three to one.",
        "trans": "Đội của chúng tôi đã thi đấu tuyệt vời và thắng trận chung kết với tỷ số 3-1."
      },
      {
        "text": "He scored a goal and the match ended in a draw.",
        "trans": "Anh ấy đã ghi một bàn thắng và trận đấu kết thúc với tỷ số hòa."
      }
    ]
  },
  {
    "id": 55,
    "title": "Unit 55: Cinema",
    "description": "Học từ vựng về thế giới điện ảnh: các thể loại phim hấp dẫn, nhân sự đoàn phim, trải nghiệm xem phim rạp và viết đánh giá (review).",
    "theory": [
      {
        "heading": "A. Film genres (Các thể loại phim phổ biến)",
        "items": [
          {
            "word": "action film / comedy / horror film",
            "type": "Danh từ",
            "phonetic": "action film: /ˈækʃn fɪlm/ | comedy: /ˈkɒmədi/ | horror film: /ˈhɒrə fɪlm/",
            "vi": "Phim hành động / Phim hài / Phim kinh dị.",
            "example": "I love action films, my sister likes comedies, but we both hate horror films."
          },
          {
            "word": "romantic film / sci-fi / documentary",
            "type": "Danh từ",
            "phonetic": "romantic: /rəʊˈmæntɪk/ | sci-fi: /ˌsaɪˈfaɪ/ | documentary: /ˌdɒkjuˈmentri/",
            "vi": "Phim lãng mạn / Phim khoa học viễn tưởng / Phim tài liệu.",
            "example": "We watched a romantic film last night. Sci-fi shows future technology. This documentary is about nature."
          }
        ]
      },
      {
        "heading": "B. People in cinema (Những con người làm nên tác phẩm)",
        "items": [
          {
            "word": "actor / actress / star",
            "type": "Danh từ",
            "phonetic": "actor: /ˈæktə/ | actress: /ˈæktrəs/ | star: /stɑː/",
            "vi": "Nam diễn viên / Nữ diễn viên / Ngôi sao điện ảnh nổi tiếng.",
            "example": "He is a brilliant actor. She is a famous actress. She became a Hollywood star."
          },
          {
            "word": "director / audience",
            "type": "Danh từ",
            "phonetic": "/daɪˈrek.tɚ/ /ˈɑː.di.əns/",
            "vi": "Đạo diễn (người chỉ đạo) / Khán giả xem phim.",
            "example": "The director directed the film, and the audience clapped at the end."
          }
        ]
      },
      {
        "heading": "C. Going to the cinema (Trải nghiệm tại rạp phim)",
        "items": [
          {
            "word": "ticket / screen / popcorn",
            "type": "Danh từ",
            "phonetic": "ticket: /ˈtɪkɪt/ | screen: /skriːn/ | popcorn: /ˈpɒpkɔːn/",
            "vi": "Vé xem phim / Màn ảnh rộng / Bắp rang bơ.",
            "example": "We bought tickets, got large popcorn, and sat in front of the giant screen."
          },
          {
            "word": "review / subtitles",
            "type": "Danh từ",
            "phonetic": "review: /rɪˈvjuː/ | subtitles: /ˈsʌbtaɪtlz/",
            "vi": "Bài đánh giá, bình luận phim / Phụ đề tiếng nước ngoài.",
            "example": "The film got great reviews. I prefer foreign movies with English subtitles."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Film Genres",
        "Movie Makers & Crew",
        "At the Cinema",
        "Film Terms"
      ],
      "items": [
        {
          "id": "i1",
          "word": "action film",
          "target": "Film Genres",
          "vi": "phim hành động kịch tính"
        },
        {
          "id": "i2",
          "word": "comedy",
          "target": "Film Genres",
          "vi": "phim hài hước"
        },
        {
          "id": "i3",
          "word": "horror film",
          "target": "Film Genres",
          "vi": "phim kinh dị đáng sợ"
        },
        {
          "id": "i4",
          "word": "romantic film",
          "target": "Film Genres",
          "vi": "phim tình cảm lãng mạn"
        },
        {
          "id": "i5",
          "word": "science fiction",
          "target": "Film Genres",
          "vi": "phim khoa học viễn tưởng"
        },
        {
          "id": "i6",
          "word": "documentary",
          "target": "Film Genres",
          "vi": "phim tài liệu thực tế"
        },
        {
          "id": "i7",
          "word": "thriller",
          "target": "Film Genres",
          "vi": "phim giật gân, hồi hộp"
        },
        {
          "id": "i8",
          "word": "cartoon",
          "target": "Film Genres",
          "vi": "phim hoạt hình vẽ tay"
        },
        {
          "id": "i9",
          "word": "actor",
          "target": "Movie Makers & Crew",
          "vi": "nam diễn viên đóng phim"
        },
        {
          "id": "i10",
          "word": "actress",
          "target": "Movie Makers & Crew",
          "vi": "nữ diễn viên đóng phim"
        },
        {
          "id": "i11",
          "word": "director",
          "target": "Movie Makers & Crew",
          "vi": "đạo diễn bộ phim"
        },
        {
          "id": "i12",
          "word": "star",
          "target": "Movie Makers & Crew",
          "vi": "ngôi sao điện ảnh"
        },
        {
          "id": "i13",
          "word": "producer",
          "target": "Movie Makers & Crew",
          "vi": "nhà sản xuất phim"
        },
        {
          "id": "i14",
          "word": "cameraman",
          "target": "Movie Makers & Crew",
          "vi": "quay phim chuyên nghiệp"
        },
        {
          "id": "i15",
          "word": "ticket",
          "target": "At the Cinema",
          "vi": "vé vào cửa xem phim"
        },
        {
          "id": "i16",
          "word": "screen",
          "target": "At the Cinema",
          "vi": "màn ảnh rạp phim"
        },
        {
          "id": "i17",
          "word": "popcorn",
          "target": "At the Cinema",
          "vi": "bắp rang bơ"
        },
        {
          "id": "i18",
          "word": "cinema",
          "target": "At the Cinema",
          "vi": "rạp chiếu phim"
        },
        {
          "id": "i19",
          "word": "seat",
          "target": "At the Cinema",
          "vi": "ghế ngồi trong rạp"
        },
        {
          "id": "i20",
          "word": "box office",
          "target": "At the Cinema",
          "vi": "quầy bán vé/doanh thu"
        },
        {
          "id": "i21",
          "word": "audience",
          "target": "Movie Makers & Crew",
          "vi": "khán thính giả"
        },
        {
          "id": "i22",
          "word": "review",
          "target": "Film Terms",
          "vi": "bài đánh giá phê bình"
        },
        {
          "id": "i23",
          "word": "subtitles",
          "target": "Film Terms",
          "vi": "phụ đề dịch nghĩa"
        },
        {
          "id": "i24",
          "word": "original version",
          "target": "Film Terms",
          "vi": "bản phim gốc"
        },
        {
          "id": "i25",
          "word": "dubbed film",
          "target": "Film Terms",
          "vi": "phim đã lồng tiếng"
        },
        {
          "id": "i26",
          "word": "watch a movie",
          "target": "Film Terms",
          "vi": "xem một bộ phim"
        },
        {
          "id": "i27",
          "word": "see a film",
          "target": "Film Terms",
          "vi": "đi coi phim"
        },
        {
          "id": "i28",
          "word": "plot",
          "target": "Film Terms",
          "vi": "cốt truyện bộ phim"
        },
        {
          "id": "i29",
          "word": "soundtrack",
          "target": "Film Terms",
          "vi": "nhạc nền phim"
        },
        {
          "id": "i30",
          "word": "special effects",
          "target": "Film Terms",
          "vi": "hiệu ứng đặc biệt"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. A film that is designed to make the audience laugh is a _____.",
        "options": [
          "horror film",
          "comedy",
          "action film",
          "documentary"
        ],
        "a": "comedy"
      },
      {
        "q": "2. A film that is scary and full of ghosts or monsters is a _____.",
        "options": [
          "romantic film",
          "sci-fi",
          "horror film",
          "cartoon"
        ],
        "a": "horror film"
      },
      {
        "q": "3. A film about future technology, space, and aliens is _____.",
        "options": [
          "science fiction",
          "comedy",
          "documentary",
          "thriller"
        ],
        "a": "science fiction"
      },
      {
        "q": "4. The person who tells the actors what to do and directs the film is the _____.",
        "options": [
          "actor",
          "director",
          "star",
          "audience"
        ],
        "a": "director"
      },
      {
        "q": "5. A woman who acts in a film is an _____.",
        "options": [
          "actor",
          "actress",
          "director",
          "producer"
        ],
        "a": "actress"
      },
      {
        "q": "6. A man who acts in a film is an _____.",
        "options": [
          "actor",
          "actress",
          "director",
          "producer"
        ],
        "a": "actor"
      },
      {
        "q": "7. We bought our ticket at the _____ before entering the cinema.",
        "options": [
          "box office",
          "screen",
          "minibar",
          "lobby"
        ],
        "a": "box office"
      },
      {
        "q": "8. I couldn't understand the French movie, so I read the English _____.",
        "options": [
          "reviews",
          "subtitles",
          "plots",
          "tickets"
        ],
        "a": "subtitles"
      },
      {
        "q": "9. I love eating hot, sweet _____ while watching a movie.",
        "options": [
          "popcorn",
          "soup",
          "steak",
          "bread"
        ],
        "a": "popcorn"
      },
      {
        "q": "10. The film got terrible _____ from critics; they said it was boring.",
        "options": [
          "reviews",
          "subtitles",
          "stamps",
          "tickets"
        ],
        "a": "reviews"
      },
      {
        "q": "11. The group of people who watch a film in the cinema is the _____.",
        "options": [
          "receptionist",
          "audience",
          "manager",
          "chef"
        ],
        "a": "audience"
      },
      {
        "q": "12. She became a famous Hollywood _____ after her brilliant performance.",
        "options": [
          "clerk",
          "director",
          "star",
          "pupil"
        ],
        "a": "star"
      },
      {
        "q": "13. This _____ is about the lives of wild lions in Africa.",
        "options": [
          "comedy",
          "documentary",
          "sci-fi",
          "thriller"
        ],
        "a": "documentary"
      },
      {
        "q": "14. A drawing film like Toy Story or Tom and Jerry is a _____.",
        "options": [
          "cartoon",
          "sci-fi",
          "horror",
          "documentary"
        ],
        "a": "cartoon"
      },
      {
        "q": "15. The movie has amazing special _____ like realistic explosions.",
        "options": [
          "effects",
          "soundtracks",
          "plots",
          "reviews"
        ],
        "a": "effects"
      },
      {
        "q": "16. The story and events of a film make up its _____.",
        "options": [
          "plot",
          "soundtrack",
          "review",
          "screen"
        ],
        "a": "plot"
      },
      {
        "q": "17. A film that is exciting, fast, and has many fights and car chases is an _____.",
        "options": [
          "action film",
          "comedy",
          "documentary",
          "romantic"
        ],
        "a": "action film"
      },
      {
        "q": "18. I prefer to watch foreign films in their _____ version with subtitles.",
        "options": [
          "dubbed",
          "original",
          "deleted",
          "saved"
        ],
        "a": "original"
      },
      {
        "q": "19. The music played throughout the movie is the _____.",
        "options": [
          "soundtrack",
          "plot",
          "review",
          "subtitles"
        ],
        "a": "soundtrack"
      },
      {
        "q": "20. The cinema has a giant _____ that makes the experience amazing.",
        "options": [
          "screen",
          "keyboard",
          "envelope",
          "trolley"
        ],
        "a": "screen"
      }
    ],
    "typingGame": [
      {
        "q": "Phim hài: c _ _ e _ y",
        "hint": "c o m e d y",
        "a": "comedy"
      },
      {
        "q": "Phim kinh dị: h _ _ r _ r film",
        "hint": "h o r r o r",
        "a": "horror"
      },
      {
        "q": "Nam diễn viên: a _ t _ r",
        "hint": "a c t o r",
        "a": "actor"
      },
      {
        "q": "Nữ diễn viên: a _ t _ _ s s",
        "hint": "a c t r e s s",
        "a": "actress"
      },
      {
        "q": "Đạo diễn: d _ _ e _ t _ r",
        "hint": "d i r e c t o r",
        "a": "director"
      },
      {
        "q": "Bắp rang bơ: p _ _ c _ r n",
        "hint": "p o p c o r n",
        "a": "popcorn"
      },
      {
        "q": "Vé xem phim: t _ _ k _ t",
        "hint": "t i c k e t",
        "a": "ticket"
      },
      {
        "q": "Màn hình rạp: s _ _ e _ n",
        "hint": "s c r e e n",
        "a": "screen"
      },
      {
        "q": "Phụ đề: s _ _ t _ t _ _ s",
        "hint": "s u b t i t l e s",
        "a": "subtitles"
      },
      {
        "q": "Bài đánh giá: r _ _ i _ w",
        "hint": "r e v i e w",
        "a": "review"
      },
      {
        "q": "Rạp chiếu phim: c _ _ e _ a",
        "hint": "c i n e m a",
        "a": "cinema"
      },
      {
        "q": "Ngôi sao điện ảnh: s _ _ r",
        "hint": "s t a r",
        "a": "star"
      },
      {
        "q": "Phim hoạt hình: c _ _ t _ _ n",
        "hint": "c a r t o o n",
        "a": "cartoon"
      },
      {
        "q": "Phim tài liệu: d _ _ u _ _ _ _ _ r y",
        "hint": "d o c u m e n t a r y",
        "a": "documentary"
      },
      {
        "q": "Cốt truyện: p _ _ t",
        "hint": "p l o t",
        "a": "plot"
      },
      {
        "q": "Khán giả: a _ _ i _ _ c e",
        "hint": "a u d i e n c e",
        "a": "audience"
      },
      {
        "q": "Nhạc nền phim: s _ _ n _ _ r _ c k",
        "hint": "s o u n d t r a c k",
        "a": "soundtrack"
      },
      {
        "q": "Phim giật gân: t _ _ i _ _ e r",
        "hint": "t h r i l l e r",
        "a": "thriller"
      },
      {
        "q": "Phim tình cảm: r _ _ a _ _ _ c film",
        "hint": "r o m a n t i c",
        "a": "romantic"
      },
      {
        "q": "Quầy bán vé: b _ x office",
        "hint": "b o x",
        "a": "box"
      }
    ],
    "speaking": [
      {
        "text": "I love romantic comedies, but my brother prefers horror films.",
        "trans": "Tôi yêu thích phim hài lãng mạn, nhưng anh trai tôi lại thích phim kinh dị hơn."
      },
      {
        "text": "The director directed a brilliant movie that got fantastic reviews.",
        "trans": "Vị đạo diễn đã chỉ đạo một bộ phim tuyệt vời nhận được những lời đánh giá rất cao."
      },
      {
        "text": "We bought tickets online and got large popcorn at the cinema.",
        "trans": "Chúng tôi đã mua vé trực tuyến và lấy một phần bắp rang bơ lớn ở rạp phim."
      },
      {
        "text": "I prefer to watch French movies in their original version with subtitles.",
        "trans": "Tôi thích xem phim Pháp phiên bản gốc có phụ đề tiếng Anh hơn."
      },
      {
        "text": "The cinema audience clapped loudly because the film had a wonderful soundtrack.",
        "trans": "Khán giả rạp phim đã vỗ tay nồng nhiệt vì bộ phim có nhạc nền rất hay."
      }
    ]
  },
  {
    "id": 56,
    "title": "Unit 56: Free time at home / Leisure",
    "description": "Học từ vựng về các hoạt động giải trí khi ở nhà: sở thích nhẹ nhàng (đọc sách, xem TV), sáng tạo (nấu ăn, vẽ tranh) và giao lưu bạn bè.",
    "theory": [
      {
        "heading": "A. Quiet hobbies at home (Sở thích thư giãn nhẹ nhàng)",
        "items": [
          {
            "word": "reading / listening to music",
            "type": "Danh từ",
            "phonetic": "reading: /ˈriːdɪŋ/ | listening to music: /ˈlɪsnɪŋ tuː ˈmjuːzɪk/",
            "vi": "Đọc sách / Lắng nghe âm nhạc.",
            "example": "I spend my free time reading novels and listening to music."
          },
          {
            "word": "playing board games / chess",
            "type": "Cụm danh từ",
            "phonetic": "playing board games: /ˈpleɪɪŋ bɔːd ɡeɪmz/ | chess: /tʃes/",
            "vi": "Chơi cờ bàn / Chơi cờ vua.",
            "example": "My dad and I love playing board games like chess on rainy days."
          }
        ]
      },
      {
        "heading": "B. Creative & Practical hobbies (Sở thích sáng tạo & Thực tế)",
        "items": [
          {
            "word": "gardening / cooking",
            "type": "Danh từ",
            "phonetic": "gardening: /ˈɡɑːdnɪŋ/ | cooking: /ˈkʊkɪŋ/",
            "vi": "Làm vườn / Nấu nướng.",
            "example": "Gardening keeps me healthy, and cooking allows me to create delicious meals."
          },
          {
            "word": "DIY (Do-It-Yourself) / painting",
            "type": "Danh từ",
            "phonetic": "DIY: /ˌdiː aɪ ˈwaɪ/ | painting: /ˈpeɪntɪŋ/",
            "vi": "Tự tay làm, sửa đồ đạc (thủ công) / Vẽ tranh.",
            "example": "He loves DIY and repaired the broken chair. She does painting for relaxation."
          }
        ]
      },
      {
        "heading": "C. Active & Social leisure (Hoạt động tương tác & Mạng xã hội)",
        "items": [
          {
            "word": "surf the internet / play video games",
            "type": "Cụm động từ",
            "phonetic": "surf internet: /sɜːf ˈɪntənet/ | play video games: /pleɪ ˈvɪdɪəʊ ɡeɪmz/",
            "vi": "Lướt mạng internet / Chơi trò chơi điện tử.",
            "example": "He surfs the internet for news and plays video games with friends."
          },
          {
            "word": "invite friends over / have a party",
            "type": "Cụm động từ",
            "phonetic": "invite friends: /ɪnˈvaɪt frendz/ | have a party: /hæv ə ˈpɑːti/",
            "vi": "Mời bạn bè sang nhà chơi / Tổ chức một bữa tiệc.",
            "example": "Let's invite friends over and have a party at the weekend."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Quiet Hobbies",
        "Creative & Craft",
        "Active & Digital",
        "Social & Hosting"
      ],
      "items": [
        {
          "id": "i1",
          "word": "reading",
          "target": "Quiet Hobbies",
          "vi": "việc đọc sách truyện"
        },
        {
          "id": "i2",
          "word": "listening to music",
          "target": "Quiet Hobbies",
          "vi": "lắng nghe âm nhạc"
        },
        {
          "id": "i3",
          "word": "playing board games",
          "target": "Quiet Hobbies",
          "vi": "chơi cờ bàn, cờ tỷ phú"
        },
        {
          "id": "i4",
          "word": "chess",
          "target": "Quiet Hobbies",
          "vi": "môn cờ vua"
        },
        {
          "id": "i5",
          "word": "cards",
          "target": "Quiet Hobbies",
          "vi": "chơi bài tây"
        },
        {
          "id": "i6",
          "word": "crossword",
          "target": "Quiet Hobbies",
          "vi": "trò chơi ô chữ"
        },
        {
          "id": "i7",
          "word": "gardening",
          "target": "Creative & Craft",
          "vi": "công việc làm vườn"
        },
        {
          "id": "i8",
          "word": "cooking",
          "target": "Creative & Craft",
          "vi": "việc nấu ăn"
        },
        {
          "id": "i9",
          "word": "painting",
          "target": "Creative & Craft",
          "vi": "vẽ tranh nghệ thuật"
        },
        {
          "id": "i10",
          "word": "drawing",
          "target": "Creative & Craft",
          "vi": "tập vẽ phác họa"
        },
        {
          "id": "i11",
          "word": "DIY",
          "target": "Creative & Craft",
          "vi": "tự làm/sửa đồ gia dụng"
        },
        {
          "id": "i12",
          "word": "sewing",
          "target": "Creative & Craft",
          "vi": "may vá quần áo"
        },
        {
          "id": "i13",
          "word": "knitting",
          "target": "Creative & Craft",
          "vi": "đan len sợi"
        },
        {
          "id": "i14",
          "word": "baking",
          "target": "Creative & Craft",
          "vi": "làm bánh ngọt"
        },
        {
          "id": "i15",
          "word": "surf the internet",
          "target": "Active & Digital",
          "vi": "lướt mạng internet"
        },
        {
          "id": "i16",
          "word": "play video games",
          "target": "Active & Digital",
          "vi": "chơi game điện tử"
        },
        {
          "id": "i17",
          "word": "watch TV",
          "target": "Active & Digital",
          "vi": "xem chương trình truyền hình"
        },
        {
          "id": "i18",
          "word": "blogging",
          "target": "Active & Digital",
          "vi": "viết blog cá nhân"
        },
        {
          "id": "i19",
          "word": "online shopping",
          "target": "Active & Digital",
          "vi": "mua sắm trực tuyến"
        },
        {
          "id": "i20",
          "word": "photography",
          "target": "Creative & Craft",
          "vi": "nghệ thuật nhiếp ảnh"
        },
        {
          "id": "i21",
          "word": "invite friends over",
          "target": "Social & Hosting",
          "vi": "mời bạn bè đến nhà"
        },
        {
          "id": "i22",
          "word": "have a party",
          "target": "Social & Hosting",
          "vi": "tổ chức tiệc tùng"
        },
        {
          "id": "i23",
          "word": "barbecue",
          "target": "Social & Hosting",
          "vi": "tiệc nướng BBQ ngoài trời"
        },
        {
          "id": "i24",
          "word": "chat online",
          "target": "Active & Digital",
          "vi": "trò chuyện mạng xã hội"
        },
        {
          "id": "i25",
          "word": "hobby",
          "target": "Quiet Hobbies",
          "vi": "sở thích cá nhân"
        },
        {
          "id": "i26",
          "word": "free time",
          "target": "Quiet Hobbies",
          "vi": "thời gian rảnh rỗi"
        },
        {
          "id": "i27",
          "word": "leisure",
          "target": "Quiet Hobbies",
          "vi": "thời gian rảnh rỗi giải trí"
        },
        {
          "id": "i28",
          "word": "guest",
          "target": "Social & Hosting",
          "vi": "khách mời đến chơi"
        },
        {
          "id": "i29",
          "word": "relax",
          "target": "Quiet Hobbies",
          "vi": "thư giãn đầu óc"
        },
        {
          "id": "i30",
          "word": "play guitar",
          "target": "Creative & Craft",
          "vi": "chơi đàn guitar"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. He spends his weekends planting flowers in the garden. His hobby is _____.",
        "options": [
          "cooking",
          "DIY",
          "gardening",
          "sewing"
        ],
        "a": "gardening"
      },
      {
        "q": "2. I love to listen to _____. It makes me feel relaxed.",
        "options": [
          "chess",
          "cards",
          "music",
          "DIY"
        ],
        "a": "music"
      },
      {
        "q": "3. Board games like _____ are great for rainy days.",
        "options": [
          "gardening",
          "chess",
          "baking",
          "photography"
        ],
        "a": "chess"
      },
      {
        "q": "4. He enjoys cooking delicious _____ for his family.",
        "options": [
          "gardens",
          "meals",
          "knittings",
          "sewings"
        ],
        "a": "meals"
      },
      {
        "q": "5. Do-It-Yourself is abbreviated as _____.",
        "options": [
          "DIY",
          "CAD",
          "CEO",
          "VIP"
        ],
        "a": "DIY"
      },
      {
        "q": "6. She paints beautiful pictures. Her hobby is _____.",
        "options": [
          "sewing",
          "knitting",
          "painting",
          "baking"
        ],
        "a": "painting"
      },
      {
        "q": "7. Many teenagers like to play _____ games.",
        "options": [
          "video",
          "board",
          "card",
          "chess"
        ],
        "a": "video"
      },
      {
        "q": "8. He surfs the _____ for news every morning.",
        "options": [
          "newspaper",
          "internet",
          "television",
          "radio"
        ],
        "a": "internet"
      },
      {
        "q": "9. Let's invite friends _____ and have a party.",
        "options": [
          "over",
          "in",
          "at",
          "for"
        ],
        "a": "over"
      },
      {
        "q": "10. Gardening keeps me _____ and active.",
        "options": [
          "healthy",
          "ill",
          "sick",
          "tired"
        ],
        "a": "healthy"
      },
      {
        "q": "11. She does _____ for relaxation.",
        "options": [
          "gardening",
          "painting",
          "sewing",
          "cooking"
        ],
        "a": "painting"
      },
      {
        "q": "12. He repaired the broken chair. He loves _____.",
        "options": [
          "knitting",
          "baking",
          "DIY",
          "cards"
        ],
        "a": "DIY"
      },
      {
        "q": "13. Let's play a game of _____. I have a board here.",
        "options": [
          "cooking",
          "gardening",
          "chess",
          "painting"
        ],
        "a": "chess"
      },
      {
        "q": "14. My mother loves baking _____ in her free time.",
        "options": [
          "cakes",
          "flowers",
          "books",
          "clothes"
        ],
        "a": "cakes"
      },
      {
        "q": "15. He often watches _____ in the evening.",
        "options": [
          "chess",
          "radio",
          "TV",
          "gardening"
        ],
        "a": "TV"
      },
      {
        "q": "16. She makes her own clothes by _____.",
        "options": [
          "sewing",
          "painting",
          "gardening",
          "cooking"
        ],
        "a": "sewing"
      },
      {
        "q": "17. I like to write my own blog. I love _____.",
        "options": [
          "blogging",
          "baking",
          "gardening",
          "chess"
        ],
        "a": "blogging"
      },
      {
        "q": "18. Many people buy things online. It is called online _____.",
        "options": [
          "shopping",
          "working",
          "gardening",
          "sewing"
        ],
        "a": "shopping"
      },
      {
        "q": "19. He takes photos with his camera. He loves _____.",
        "options": [
          "photography",
          "baking",
          "knitting",
          "chess"
        ],
        "a": "photography"
      },
      {
        "q": "20. I spend my time reading _____.",
        "options": [
          "novels",
          "radios",
          "TVs",
          "cards"
        ],
        "a": "novels"
      }
    ],
    "typingGame": [
      {
        "q": "Việc đọc sách: r _ _ d i n g",
        "hint": "reading",
        "a": "reading"
      },
      {
        "q": "Việc nghe nhạc: l _ _ t e n i n g",
        "hint": "listening",
        "a": "listening"
      },
      {
        "q": "Cờ vua: c _ _ s s",
        "hint": "chess",
        "a": "chess"
      },
      {
        "q": "Việc làm vườn: g _ _ d e n i n g",
        "hint": "gardening",
        "a": "gardening"
      },
      {
        "q": "Nấu ăn: c _ _ k i n g",
        "hint": "cooking",
        "a": "cooking"
      },
      {
        "q": "Vẽ tranh nghệ thuật: p _ _ n t i n g",
        "hint": "painting",
        "a": "painting"
      },
      {
        "q": "Tự sửa đồ: D _ Y",
        "hint": "DIY",
        "a": "DIY"
      },
      {
        "q": "Lướt mạng: s _ _ f the internet",
        "hint": "surf",
        "a": "surf"
      },
      {
        "q": "Chơi game: play v _ _ e o games",
        "hint": "video",
        "a": "video"
      },
      {
        "q": "Mời bạn bè qua chơi: invite friends o _ _ r",
        "hint": "over",
        "a": "over"
      },
      {
        "q": "Tổ chức tiệc: have a p _ _ t y",
        "hint": "party",
        "a": "party"
      },
      {
        "q": "May vá: s _ _ i n g",
        "hint": "sewing",
        "a": "sewing"
      },
      {
        "q": "Đan len: k _ _ t t i n g",
        "hint": "knitting",
        "a": "knitting"
      },
      {
        "q": "Làm bánh: b _ _ i n g",
        "hint": "baking",
        "a": "baking"
      },
      {
        "q": "Chụp ảnh: p _ _ t o g r a p h y",
        "hint": "photography",
        "a": "photography"
      },
      {
        "q": "Thời gian rảnh rỗi: f _ _ e time",
        "hint": "free",
        "a": "free"
      },
      {
        "q": "Giải trí rảnh rỗi: l _ _ s u r e",
        "hint": "leisure",
        "a": "leisure"
      },
      {
        "q": "Thư giãn: r _ _ a x",
        "hint": "relax",
        "a": "relax"
      },
      {
        "q": "Chơi cờ bàn: play b _ _ r d games",
        "hint": "board",
        "a": "board"
      },
      {
        "q": "Khách mời: g _ _ s t",
        "hint": "guest",
        "a": "guest"
      }
    ],
    "speaking": [
      {
        "text": "I spend my free time reading novels and listening to music.",
        "trans": "Tôi dành thời gian rảnh của mình để đọc tiểu thuyết và nghe nhạc."
      },
      {
        "text": "My dad and I love playing board games like chess on rainy days.",
        "trans": "Tôi và bố tôi thích chơi cờ bàn như cờ vua vào những ngày mưa."
      },
      {
        "text": "Gardening keeps me healthy, and cooking allows me to make delicious meals.",
        "trans": "Làm vườn giúp tôi khỏe mạnh, và nấu ăn cho phép tôi làm nên những bữa ăn ngon."
      },
      {
        "text": "He surfs the internet for news and plays video games with friends.",
        "trans": "Anh ấy lướt mạng internet để xem tin tức và chơi trò chơi điện tử với bạn bè."
      },
      {
        "text": "Let's invite friends over and have a party at the weekend.",
        "trans": "Chúng ta hãy mời bạn bè qua chơi và tổ chức một bữa tiệc vào cuối tuần nhé."
      }
    ]
  },
  {
    "id": 57,
    "title": "Unit 57: Crime",
    "description": "Học từ vựng mô tả các hành vi phạm tội thường gặp (theft, robbery), danh xưng của tội phạm, cơ quan thực thi pháp luật và các động từ liên quan.",
    "theory": [
      {
        "heading": "A. Types of crime (Các loại tội phạm hành vi)",
        "items": [
          {
            "word": "theft / robbery",
            "type": "Danh từ",
            "phonetic": "/θeft/ /ˈrɑː.bɚ.i/",
            "vi": "Trộm cắp (lén lút) / Cướp đoạt (dùng bạo lực, vũ khí cướp ngân hàng/người).",
            "example": "The theft of the money occurred at night. The armed robbery at the bank was terrifying."
          },
          {
            "word": "burglary / shoplifting",
            "type": "Danh từ",
            "phonetic": "burglary: /ˈbɜːɡləri/ | shoplifting: /ˈʃɒplɪftɪŋ/",
            "vi": "Trộm đột nhập vào nhà / Ăn cắp vặt ở cửa hàng.",
            "example": "Burglary is a problem when people are on holiday. Shoplifting is common in supermarkets."
          }
        ]
      },
      {
        "heading": "B. Criminals (Tên gọi của các loại tội phạm)",
        "items": [
          {
            "word": "thief / robber / burglar",
            "type": "Danh từ",
            "phonetic": "thief: /θiːf/ | robber: /ˈrɒbə/ | burglar: /ˈbɜːɡlə/",
            "vi": "Kẻ trộm / Kẻ cướp / Kẻ trộm đột nhập.",
            "example": "The thief stole my wallet. The bank robbers had guns. The burglar entered through the window."
          },
          {
            "word": "shoplifter / murderer",
            "type": "Danh từ",
            "phonetic": "shoplifter: /ˈtʃɒplɪftə/ | murderer: /ˈmɜːdərə/",
            "vi": "Kẻ cắp vặt cửa hàng / Kẻ sát nhân.",
            "example": "The shoplifter was caught by security. The murderer was sentenced to life."
          }
        ]
      },
      {
        "heading": "C. Law enforcement and verbs (Thực thi pháp luật và động từ)",
        "items": [
          {
            "word": "steal / rob / break into",
            "type": "Động từ",
            "phonetic": "steal: /stiːl/ | rob: /rɒb/ | break into: /breɪk ˈɪntuː/",
            "vi": "Ăn trộm (vật cụ thể) / Cướp đoạt (tiền từ ai/ngân hàng) / Đột nhập vào nhà.",
            "example": "He stole my bike. They robbed the bank. Burglars broke into the house."
          },
          {
            "word": "police officer / arrest / prison",
            "type": "Danh từ / Động từ",
            "phonetic": "police officer: /pəˈliːs ˈɒfɪs/ | arrest: /əˈrest/ | prison: /ˈprɪzn/",
            "vi": "Cảnh sát viên / Bắt giữ / Nhà tù.",
            "example": "The police officer arrested the thief and sent him to prison."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Types of Crimes",
        "Criminals",
        "Law & Enforcement",
        "Action Verbs"
      ],
      "items": [
        {
          "id": "i1",
          "word": "theft",
          "target": "Types of Crimes",
          "vi": "hành vi trộm cắp"
        },
        {
          "id": "i2",
          "word": "robbery",
          "target": "Types of Crimes",
          "vi": "vụ cướp tài sản"
        },
        {
          "id": "i3",
          "word": "burglary",
          "target": "Types of Crimes",
          "vi": "vụ trộm đột nhập nhà"
        },
        {
          "id": "i4",
          "word": "shoplifting",
          "target": "Types of Crimes",
          "vi": "ăn cắp vặt cửa hàng"
        },
        {
          "id": "i5",
          "word": "murder",
          "target": "Types of Crimes",
          "vi": "vụ án mạng, giết người"
        },
        {
          "id": "i6",
          "word": "vandalism",
          "target": "Types of Crimes",
          "vi": "hành vi phá hoại tài sản công"
        },
        {
          "id": "i7",
          "word": "crime",
          "target": "Types of Crimes",
          "vi": "tội phạm nói chung"
        },
        {
          "id": "i8",
          "word": "thief",
          "target": "Criminals",
          "vi": "kẻ trộm lén lút"
        },
        {
          "id": "i9",
          "word": "robber",
          "target": "Criminals",
          "vi": "kẻ cướp bạo lực"
        },
        {
          "id": "i10",
          "word": "burglar",
          "target": "Criminals",
          "vi": "kẻ trộm đột nhập"
        },
        {
          "id": "i11",
          "word": "shoplifter",
          "target": "Criminals",
          "vi": "kẻ cắp vặt siêu thị"
        },
        {
          "id": "i12",
          "word": "murderer",
          "target": "Criminals",
          "vi": "kẻ sát nhân"
        },
        {
          "id": "i13",
          "word": "vandal",
          "target": "Criminals",
          "vi": "kẻ phá hoại của công"
        },
        {
          "id": "i14",
          "word": "criminal",
          "target": "Criminals",
          "vi": "tội phạm, kẻ phạm pháp"
        },
        {
          "id": "i15",
          "word": "police officer",
          "target": "Law & Enforcement",
          "vi": "viên cảnh sát"
        },
        {
          "id": "i16",
          "word": "detective",
          "target": "Law & Enforcement",
          "vi": "thám tử điều tra"
        },
        {
          "id": "i17",
          "word": "judge",
          "target": "Law & Enforcement",
          "vi": "thẩm phán tòa án"
        },
        {
          "id": "i18",
          "word": "police station",
          "target": "Law & Enforcement",
          "vi": "đồn cảnh sát"
        },
        {
          "id": "i19",
          "word": "court",
          "target": "Law & Enforcement",
          "vi": "tòa án xét xử"
        },
        {
          "id": "i20",
          "word": "prison",
          "target": "Law & Enforcement",
          "vi": "nhà tù giam giữ"
        },
        {
          "id": "i21",
          "word": "steal money",
          "target": "Action Verbs",
          "vi": "trộm tiền bạc"
        },
        {
          "id": "i22",
          "word": "rob a bank",
          "target": "Action Verbs",
          "vi": "cướp ngân hàng"
        },
        {
          "id": "i23",
          "word": "break into house",
          "target": "Action Verbs",
          "vi": "đột nhập nhà riêng"
        },
        {
          "id": "i24",
          "word": "arrest a thief",
          "target": "Action Verbs",
          "vi": "bắt giữ tên trộm"
        },
        {
          "id": "i25",
          "word": "go to prison",
          "target": "Action Verbs",
          "vi": "vào ngồi tù"
        },
        {
          "id": "i26",
          "word": "call the police",
          "target": "Action Verbs",
          "vi": "gọi điện báo cảnh sát"
        },
        {
          "id": "i27",
          "word": "fingerprints",
          "target": "Law & Enforcement",
          "vi": "dấu vân tay chứng cứ"
        },
        {
          "id": "i28",
          "word": "investigate",
          "target": "Action Verbs",
          "vi": "điều tra phá án"
        },
        {
          "id": "i29",
          "word": "illegal",
          "target": "Law & Enforcement",
          "vi": "bất hợp pháp"
        },
        {
          "id": "i30",
          "word": "lock the door",
          "target": "Action Verbs",
          "vi": "khóa cửa phòng"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. A person who steals items from a supermarket or shop is a _____.",
        "options": [
          "burglar",
          "shoplifter",
          "robber",
          "murderer"
        ],
        "a": "shoplifter"
      },
      {
        "q": "2. The bank _____ had guns and stole half a million dollars.",
        "options": [
          "thieves",
          "robbers",
          "burglars",
          "criminals"
        ],
        "a": "robbers"
      },
      {
        "q": "3. A burglar _____ our house through the back window last night.",
        "options": [
          "stole",
          "robbed",
          "broke into",
          "arrested"
        ],
        "a": "broke into"
      },
      {
        "q": "4. Someone _____ my bicycle from the garden yesterday. (taking a specific item)",
        "options": [
          "stole",
          "robbed",
          "broke into",
          "arrested"
        ],
        "a": "stole"
      },
      {
        "q": "5. They _____ a wealthy tourist in the park using a knife. (attacking/taking from a person)",
        "options": [
          "stole",
          "robbed",
          "broke into",
          "arrested"
        ],
        "a": "robbed"
      },
      {
        "q": "6. The police officer ran fast and _____ the thief.",
        "options": [
          "robbed",
          "stole",
          "arrested",
          "escaped"
        ],
        "a": "arrested"
      },
      {
        "q": "7. After the trial, the criminal was sent to _____ for five years.",
        "options": [
          "police station",
          "court",
          "prison",
          "hospital"
        ],
        "a": "prison"
      },
      {
        "q": "8. The crime of entering a house illegally to steal things is _____.",
        "options": [
          "theft",
          "robbery",
          "burglary",
          "shoplifting"
        ],
        "a": "burglary"
      },
      {
        "q": "9. If you see a crime, you should immediately _____ the police.",
        "options": [
          "call",
          "arrest",
          "steal",
          "rob"
        ],
        "a": "call"
      },
      {
        "q": "10. The detectives collected _____ left on the window glass.",
        "options": [
          "suitcases",
          "fingerprints",
          "stamps",
          "receipts"
        ],
        "a": "fingerprints"
      },
      {
        "q": "11. Stealing is bad, it is strictly _____.",
        "options": [
          "legal",
          "illegal",
          "polite",
          "comfortable"
        ],
        "a": "illegal"
      },
      {
        "q": "12. A person who deliberately kills another human is a _____.",
        "options": [
          "thief",
          "robber",
          "murderer",
          "vandal"
        ],
        "a": "murderer"
      },
      {
        "q": "13. Burglars often target houses when people are _____ holiday.",
        "options": [
          "on",
          "at",
          "in",
          "to"
        ],
        "a": "on"
      },
      {
        "q": "14. Always lock your front _____ to protect your house from burglars.",
        "options": [
          "window",
          "door",
          "trolley",
          "bag"
        ],
        "a": "door"
      },
      {
        "q": "15. The suspect was taken to the _____ station for questioning.",
        "options": [
          "court",
          "prison",
          "police",
          "hospital"
        ],
        "a": "police"
      },
      {
        "q": "16. A person who steals things quietly in public without violence is a _____.",
        "options": [
          "thief",
          "robber",
          "detective",
          "judge"
        ],
        "a": "thief"
      },
      {
        "q": "17. The _____ listened to the witnesses in court and gave the sentence.",
        "options": [
          "detective",
          "judge",
          "police officer",
          "thief"
        ],
        "a": "judge"
      },
      {
        "q": "18. Damaging public property like spray-painting walls is called _____.",
        "options": [
          "theft",
          "burglary",
          "vandalism",
          "shoplifting"
        ],
        "a": "vandalism"
      },
      {
        "q": "19. The detectives came to _____ the mysterious murder.",
        "options": [
          "arrest",
          "investigate",
          "steal",
          "rob"
        ],
        "a": "investigate"
      },
      {
        "q": "20. The bank robbery was a very serious _____.",
        "options": [
          "job",
          "crime",
          "hobby",
          "progress"
        ],
        "a": "crime"
      }
    ],
    "typingGame": [
      {
        "q": "Hành vi trộm cắp: t _ _ f t",
        "hint": "t h e f t",
        "a": "theft"
      },
      {
        "q": "Vụ cướp bạo lực: r _ _ b _ _ y",
        "hint": "r o b b e r y",
        "a": "robbery"
      },
      {
        "q": "Vụ trộm đột nhập: b _ _ g _ _ y",
        "hint": "b u r ɡ l a r y",
        "a": "burglary"
      },
      {
        "q": "Kẻ trộm lén lút: t _ _ e f",
        "hint": "t h i e f",
        "a": "thief"
      },
      {
        "q": "Kẻ cướp ngân hàng: r _ _ b _ r",
        "hint": "r o b b e r",
        "a": "robber"
      },
      {
        "q": "Kẻ trộm đột nhập: b _ _ g _ _ r",
        "hint": "b u r ɡ l a r",
        "a": "burglar"
      },
      {
        "q": "Kẻ cắp vặt cửa hàng: s _ _ p _ _ _ _ _ r",
        "hint": "s h o p l i f t e r",
        "a": "shoplifter"
      },
      {
        "q": "Kẻ sát nhân: m _ _ d _ _ _ r",
        "hint": "m u r d e r e r",
        "a": "murderer"
      },
      {
        "q": "Viên cảnh sát: police o _ _ _ c _ r",
        "hint": "o f f i c e r",
        "a": "officer"
      },
      {
        "q": "Đồn cảnh sát: police s _ _ t _ _ n",
        "hint": "s t a t i o n",
        "a": "station"
      },
      {
        "q": "Nhà tù: p _ _ s _ n",
        "hint": "p r i s o n",
        "a": "prison"
      },
      {
        "q": "Đột nhập vào nhà: b _ _ _ k into a house",
        "hint": "b r e a k",
        "a": "break"
      },
      {
        "q": "Bắt giữ: a _ _ _ s t",
        "hint": "a r r e s t",
        "a": "arrest"
      },
      {
        "q": "Ăn trộm (xe/tiền): s _ _ _ l",
        "hint": "s t e a l",
        "a": "steal"
      },
      {
        "q": "Cướp đoạt (ngân hàng): r _ b",
        "hint": "r o b",
        "a": "rob"
      },
      {
        "q": "Bất hợp pháp: i _ _ _ g _ l",
        "hint": "i l l e ɡ a l",
        "a": "illegal"
      },
      {
        "q": "Tòa án: c _ _ r t",
        "hint": "c o u r t",
        "a": "court"
      },
      {
        "q": "Thẩm phán: j _ _ g e",
        "hint": "j u d ɡ e",
        "a": "judge"
      },
      {
        "q": "Dấu vân tay: f _ _ g _ _ _ _ _ _ t s",
        "hint": "f i n ɡ e r p r i n t s",
        "a": "fingerprints"
      },
      {
        "q": "Ăn cắp vặt siêu thị: s _ _ p _ _ _ _ _ _ g",
        "hint": "s h o p l i f t i n ɡ",
        "a": "shoplifting"
      }
    ],
    "speaking": [
      {
        "text": "The burglar broke into our house and stole my laptop.",
        "trans": "Tên trộm đã đột nhập vào nhà chúng tôi và ăn trộm chiếc máy tính xách tay của tôi."
      },
      {
        "text": "Three bank robbers stole half a million dollars and escaped.",
        "trans": "Ba kẻ cướp ngân hàng đã cướp nửa triệu đô la và trốn thoát."
      },
      {
        "text": "The police officer arrested the shoplifter outside the department store.",
        "trans": "Viên cảnh sát đã bắt giữ kẻ cắp vặt bên ngoài cửa hàng bách hóa."
      },
      {
        "text": "Stealing money is illegal, and criminals will go to prison.",
        "trans": "Ăn trộm tiền là bất hợp pháp, và tội phạm sẽ phải đi tù."
      },
      {
        "text": "The detectives collected fingerprints from the door to investigate the crime.",
        "trans": "Các thám tử đã thu thập dấu vân tay từ cánh cửa để điều tra vụ án."
      }
    ]
  },
  {
    "id": 58,
    "title": "Unit 58: The media",
    "description": "Học từ vựng về báo chí (newspaper, magazine), truyền hình (news, documentary), internet và mạng xã hội.",
    "theory": [
      {
        "heading": "A. Print media (Báo chí in ấn truyền thống)",
        "items": [
          {
            "word": "newspaper / magazine",
            "type": "Danh từ",
            "phonetic": "newspaper: /ˈnjuːzpeɪpə/ | magazine: /ˌmæɡəˈziːn/",
            "vi": "Báo giấy hằng ngày / Tạp chí chuyên đề.",
            "example": "I read the newspaper in the morning and a fashion magazine on weekends."
          },
          {
            "word": "article / headline",
            "type": "Danh từ",
            "phonetic": "article: /ˈɑːtɪkl/ | headline: /ˈhedlaɪn/",
            "vi": "Bài báo / Tiêu đề lớn trên trang nhất.",
            "example": "The front-page headline was shocking. I read an interesting article about travel."
          }
        ]
      },
      {
        "heading": "B. Broadcast media (Truyền hình và phát thanh)",
        "items": [
          {
            "word": "news program / documentary",
            "type": "Danh từ",
            "phonetic": "news program: /njuːz ˈprəʊɡræm/ | documentary: /ˌdɒkjuˈmentri/",
            "vi": "Chương trình tin tức / Phim tài liệu.",
            "example": "We watch the news program at 7:00 and a nature documentary later."
          },
          {
            "word": "soap opera / commercial",
            "type": "Danh từ",
            "phonetic": "soap opera: /ˈsəʊp ˈɒprə/ | commercial: /kəˈmɜːʃl/",
            "vi": "Phim truyền hình dài tập tâm lý / Quảng cáo truyền hình.",
            "example": "My mother loves this Spanish soap opera. There are too many commercials during the film."
          }
        ]
      },
      {
        "heading": "C. Digital media & verbs (Mạng internet và mạng xã hội)",
        "items": [
          {
            "word": "social network / blog / channel",
            "type": "Danh từ",
            "phonetic": "social network: /ˈsəʊʃl ˈnetwɜːk/ | blog: /blɒɡ/ | channel: /ˈtʃænl/",
            "vi": "Mạng xã hội (Facebook, Instagram) / Blog cá nhân / Kênh nội dung.",
            "example": "She has a popular travel blog and a YouTube channel with many subscribers."
          },
          {
            "word": "post / share / publish",
            "type": "Động từ",
            "phonetic": "post: /pəʊst/ | share: /ʃeə/ | publish: /ˈpʌblɪʃ/",
            "vi": "Đăng tải bài viết / Chia sẻ / Xuất bản, phát hành.",
            "example": "He posted a comment, shared the video, and the company published the news."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Print Media",
        "Broadcast (TV & Radio)",
        "Digital & Internet",
        "Media Professionals & Verbs"
      ],
      "items": [
        {
          "id": "i1",
          "word": "newspaper",
          "target": "Print Media",
          "vi": "tờ báo giấy"
        },
        {
          "id": "i2",
          "word": "magazine",
          "target": "Print Media",
          "vi": "cuốn tạp chí"
        },
        {
          "id": "i3",
          "word": "journal",
          "target": "Print Media",
          "vi": "tạp chí chuyên ngành"
        },
        {
          "id": "i4",
          "word": "article",
          "target": "Print Media",
          "vi": "bài báo bài viết"
        },
        {
          "id": "i5",
          "word": "headline",
          "target": "Print Media",
          "vi": "tiêu đề trang nhất"
        },
        {
          "id": "i6",
          "word": "press",
          "target": "Print Media",
          "vi": "giới báo chí"
        },
        {
          "id": "i7",
          "word": "news program",
          "target": "Broadcast (TV & Radio)",
          "vi": "chương trình thời sự"
        },
        {
          "id": "i8",
          "word": "soap opera",
          "target": "Broadcast (TV & Radio)",
          "vi": "phim dài tập gia đình"
        },
        {
          "id": "i9",
          "word": "talk show",
          "target": "Broadcast (TV & Radio)",
          "vi": "chương trình đàm thoại"
        },
        {
          "id": "i10",
          "word": "cartoon",
          "target": "Broadcast (TV & Radio)",
          "vi": "phim hoạt hình"
        },
        {
          "id": "i11",
          "word": "commercial",
          "target": "Broadcast (TV & Radio)",
          "vi": "quảng cáo thương mại"
        },
        {
          "id": "i12",
          "word": "documentary",
          "target": "Broadcast (TV & Radio)",
          "vi": "phim tài liệu thực tế"
        },
        {
          "id": "i13",
          "word": "weather forecast",
          "target": "Broadcast (TV & Radio)",
          "vi": "dự báo thời tiết"
        },
        {
          "id": "i14",
          "word": "social network",
          "target": "Digital & Internet",
          "vi": "mạng xã hội trực tuyến"
        },
        {
          "id": "i15",
          "word": "blog",
          "target": "Digital & Internet",
          "vi": "trang blog cá nhân"
        },
        {
          "id": "i16",
          "word": "channel",
          "target": "Digital & Internet",
          "vi": "kênh thông tin"
        },
        {
          "id": "i17",
          "word": "podcast",
          "target": "Digital & Internet",
          "vi": "tệp âm thanh trực tuyến"
        },
        {
          "id": "i18",
          "word": "website",
          "target": "Digital & Internet",
          "vi": "trang web"
        },
        {
          "id": "i19",
          "word": "online news",
          "target": "Digital & Internet",
          "vi": "tin tức trực tuyến"
        },
        {
          "id": "i20",
          "word": "follower",
          "target": "Digital & Internet",
          "vi": "người theo dõi kênh"
        },
        {
          "id": "i21",
          "word": "journalist",
          "target": "Media Professionals & Verbs",
          "vi": "nhà báo, phóng viên"
        },
        {
          "id": "i22",
          "word": "reporter",
          "target": "Media Professionals & Verbs",
          "vi": "phóng viên đưa tin"
        },
        {
          "id": "i23",
          "word": "presenter",
          "target": "Media Professionals & Verbs",
          "vi": "người dẫn chương trình"
        },
        {
          "id": "i24",
          "word": "read news",
          "target": "Media Professionals & Verbs",
          "vi": "đọc tin tức"
        },
        {
          "id": "i25",
          "word": "post a comment",
          "target": "Media Professionals & Verbs",
          "vi": "đăng bình luận"
        },
        {
          "id": "i26",
          "word": "share video",
          "target": "Media Professionals & Verbs",
          "vi": "chia sẻ video"
        },
        {
          "id": "i27",
          "word": "publish book",
          "target": "Media Professionals & Verbs",
          "vi": "xuất bản sách"
        },
        {
          "id": "i28",
          "word": "interview",
          "target": "Media Professionals & Verbs",
          "vi": "phỏng vấn nhân vật"
        },
        {
          "id": "i29",
          "word": "broadcast",
          "target": "Media Professionals & Verbs",
          "vi": "phát sóng"
        },
        {
          "id": "i30",
          "word": "subscribe",
          "target": "Media Professionals & Verbs",
          "vi": "đăng ký kênh"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. She reads the daily _____ to know what is happening in the world.",
        "options": [
          "envelope",
          "newspaper",
          "postcard",
          "trolley"
        ],
        "a": "newspaper"
      },
      {
        "q": "2. I love this fashion _____; it has amazing pictures and articles.",
        "options": [
          "newspaper",
          "magazine",
          "journal",
          "envelope"
        ],
        "a": "magazine"
      },
      {
        "q": "3. The front-page _____ of the newspaper was: 'PRIME MINISTER RESIGNS'.",
        "options": [
          "headline",
          "article",
          "ad",
          "comment"
        ],
        "a": "headline"
      },
      {
        "q": "4. The TV channel is broadcasting a fascinating _____ about Amazon wild animals.",
        "options": [
          "soap opera",
          "documentary",
          "talk show",
          "cartoon"
        ],
        "a": "documentary"
      },
      {
        "q": "5. There are way too many _____ on TV; they interrupt the movie every ten minutes.",
        "options": [
          "commercials",
          "headlines",
          "articles",
          "news"
        ],
        "a": "commercials"
      },
      {
        "q": "6. She writes weekly articles about travel on her personal _____.",
        "options": [
          "blog",
          "social network",
          "newspaper",
          "envelope"
        ],
        "a": "blog"
      },
      {
        "q": "7. I watched the _____ forecast to see if it will rain tomorrow.",
        "options": [
          "news",
          "weather",
          "documentary",
          "commercial"
        ],
        "a": "weather"
      },
      {
        "q": "8. A person who writes articles for newspapers or magazines is a _____.",
        "options": [
          "presenter",
          "journalist",
          "waiter",
          "manager"
        ],
        "a": "journalist"
      },
      {
        "q": "9. He _____ a funny video on Facebook and all his friends shared it.",
        "options": [
          "posted",
          "published",
          "broadcast",
          "read"
        ],
        "a": "posted"
      },
      {
        "q": "10. The company will _____ their new science book next month.",
        "options": [
          "post",
          "publish",
          "share",
          "write"
        ],
        "a": "publish"
      },
      {
        "q": "11. I really love this YouTube _____! I subscribed to it yesterday.",
        "options": [
          "channel",
          "blog",
          "magazine",
          "headline"
        ],
        "a": "channel"
      },
      {
        "q": "12. A reporter works for the _____ to gather news stories.",
        "options": [
          "press",
          "hospital",
          "school",
          "library"
        ],
        "a": "press"
      },
      {
        "q": "13. She loves this emotional emotional _____ and watches it every afternoon.",
        "options": [
          "soap opera",
          "talk show",
          "documentary",
          "news"
        ],
        "a": "soap opera"
      },
      {
        "q": "14. A person who presents a TV program or news show is a _____.",
        "options": [
          "reporter",
          "presenter",
          "actor",
          "waiter"
        ],
        "a": "presenter"
      },
      {
        "q": "15. The radio station is going to _____ the concert live tonight.",
        "options": [
          "publish",
          "broadcast",
          "delete",
          "post"
        ],
        "a": "broadcast"
      },
      {
        "q": "16. Please _____ to my channel and click the bell icon!",
        "options": [
          "subscribe",
          "post",
          "share",
          "like"
        ],
        "a": "subscribe"
      },
      {
        "q": "17. The journalist went to _____ the famous singer in her hotel.",
        "options": [
          "publish",
          "interview",
          "broadcast",
          "post"
        ],
        "a": "interview"
      },
      {
        "q": "18. Facebook, Instagram and Twitter are types of _____ networks.",
        "options": [
          "print",
          "social",
          "broadcast",
          "envelope"
        ],
        "a": "social"
      },
      {
        "q": "19. The front page has an interesting _____ about artificial intelligence.",
        "options": [
          "article",
          "headline",
          "commercial",
          "envelope"
        ],
        "a": "article"
      },
      {
        "q": "20. How many _____ do you have on Instagram? - About 2000.",
        "options": [
          "followers",
          "reporters",
          "presenters",
          "chefs"
        ],
        "a": "followers"
      }
    ],
    "typingGame": [
      {
        "q": "Tờ báo: n _ _ s _ _ _ _ r",
        "hint": "n e w s p a p e r",
        "a": "newspaper"
      },
      {
        "q": "Tạp chí: m _ _ a _ _ n e",
        "hint": "m a ɡ a z i n e",
        "a": "magazine"
      },
      {
        "q": "Tiêu đề báo: h _ _ d _ _ _ e",
        "hint": "h e a d l i n e",
        "a": "headline"
      },
      {
        "q": "Bài báo: a _ _ _ _ l e",
        "hint": "a r t i c l e",
        "a": "article"
      },
      {
        "q": "Quảng cáo: c _ _ m _ _ _ _ _ l",
        "hint": "c o m m e r c i a l",
        "a": "commercial"
      },
      {
        "q": "Phim tài liệu: d _ _ u _ _ _ _ _ r y",
        "hint": "d o c u m e n t a r y",
        "a": "documentary"
      },
      {
        "q": "Mạng xã hội: s _ _ i _ l network",
        "hint": "s o c i a l",
        "a": "social"
      },
      {
        "q": "Trang blog: b _ _ g",
        "hint": "b l o ɡ",
        "a": "blog"
      },
      {
        "q": "Kênh truyền thông: c _ _ n _ _ l",
        "hint": "c h a n n e l",
        "a": "channel"
      },
      {
        "q": "Đăng bình luận: p _ s t a comment",
        "hint": "p o s t",
        "a": "post"
      },
      {
        "q": "Chia sẻ video: s _ _ r e a video",
        "hint": "s h a r e",
        "a": "share"
      },
      {
        "q": "Xuất bản sách: p _ _ l _ _ h a book",
        "hint": "p u b l i s h",
        "a": "publish"
      },
      {
        "q": "Nhà báo: j _ _ r _ _ _ _ s t",
        "hint": "j o u r n a l i s t",
        "a": "journalist"
      },
      {
        "q": "Phóng viên: r _ _ o _ _ _ r",
        "hint": "r e p o r t e r",
        "a": "reporter"
      },
      {
        "q": "Phát sóng: b _ _ _ d _ _ s t",
        "hint": "b r o a d c a s t",
        "a": "broadcast"
      },
      {
        "q": "Đăng ký kênh: s _ _ s _ _ _ _ e",
        "hint": "s u b s c r i b e",
        "a": "subscribe"
      },
      {
        "q": "Phóng sự dài tập: soap o _ _ _ a",
        "hint": "o p e r a",
        "a": "opera"
      },
      {
        "q": "Phát ngôn báo chí: the p _ _ s s",
        "hint": "p r e s s",
        "a": "press"
      },
      {
        "q": "Người dẫn chương trình: p _ _ s _ _ _ _ r",
        "hint": "p r e s e n t e r",
        "a": "presenter"
      },
      {
        "q": "Dự báo thời tiết: weather f _ _ _ c _ _ t",
        "hint": "f o r e c a s t",
        "a": "forecast"
      }
    ],
    "speaking": [
      {
        "text": "I read the front-page headline of the newspaper this morning.",
        "trans": "Tôi đã đọc tiêu đề lớn trên trang nhất của tờ báo sáng nay."
      },
      {
        "text": "The journalist interviewed the director for their news channel.",
        "trans": "Nhà báo đã phỏng vấn vị đạo diễn cho kênh tin tức của họ."
      },
      {
        "text": "The soap opera was interrupted by too many annoying commercials.",
        "trans": "Phim truyền hình dài tập đã bị gián đoạn bởi quá nhiều quảng cáo phiền nhiễu."
      },
      {
        "text": "He posted an interesting article and shared it on social networks.",
        "trans": "Anh ấy đã đăng một bài báo thú vị và chia sẻ nó trên các mạng xã hội."
      },
      {
        "text": "Please subscribe to my channel and read my daily blogs online.",
        "trans": "Làm ơn hãy đăng ký kênh của tôi và đọc các trang blog hằng ngày của tôi trực tuyến."
      }
    ]
  },
  {
    "id": 59,
    "title": "Unit 59: Everyday problems / Problems at home and work",
    "description": "Học từ vựng mô tả sự cố sinh hoạt thường gặp tại nhà (tắc cống, mất điện) và tại công sở (quá tải, muộn giờ, hỏng máy).",
    "theory": [
      {
        "heading": "A. Problems at home (Sự cố hỏng hóc trong gia đình)",
        "items": [
          {
            "word": "broken window / leaking tap",
            "type": "Cụm danh từ",
            "phonetic": "broken window: /ˈbrəʊkən ˈwɪndəʊ/ | leaking tap: /ˈliːkɪŋ tæp/",
            "vi": "Cửa kính bị vỡ / Vòi nước rò rỉ chảy giọt.",
            "example": "We have a broken window in the bedroom and a leaking tap in the kitchen."
          },
          {
            "word": "power cut / untidy room",
            "type": "Cụm danh từ",
            "phonetic": "power cut: /ˈpaʊə kʌt/ | untidy room: /ʌnˈtaɪdi ruːm/",
            "vi": "Sự cố mất điện / Căn phòng bừa bộn.",
            "example": "There was a power cut last night and the room was untidy because of dark."
          },
          {
            "word": "lost keys / clogged toilet",
            "type": "Cụm danh từ",
            "phonetic": "lost keys: /lɒst kiːz/ | clogged toilet: /ˈklɒɡd ˈtɔɪlət/",
            "vi": "Chìa khóa bị thất lạc / Bồn cầu bị tắc nghẽn.",
            "example": "I have lost keys and cannot enter, plus the toilet is clogged."
          }
        ]
      },
      {
        "heading": "B. Problems at work (Trục trặc tại nơi làm việc)",
        "items": [
          {
            "word": "too much work / stress",
            "type": "Cụm danh từ",
            "phonetic": "too much work: /tuː mʌtʃ wɜːk/ | stress: /stres/",
            "vi": "Quá tải nhiều việc / Căng thẳng mệt mỏi.",
            "example": "I have too much work today and suffer from stress."
          },
          {
            "word": "bad mood / late for work",
            "type": "Cụm từ",
            "phonetic": "bad mood: /bæd muːd/ | late for work: /leɪt fɔː wɜːk/",
            "vi": "Tâm trạng tồi tệ, bực bội / Đi làm muộn.",
            "example": "He is in a bad mood because he was late for work this morning."
          },
          {
            "word": "computer crash / missed deadline",
            "type": "Cụm danh từ",
            "phonetic": "computer crash: /kəmˈpjuːtə kræʃ/ | missed deadline: /mɪst ˈdedlaɪn/",
            "vi": "Máy tính bị treo hỏng / Bị trễ hạn nộp báo cáo.",
            "example": "My computer crashed and I missed the project deadline."
          }
        ]
      },
      {
        "heading": "C. Solutions & Fixes (Các từ vựng về sửa chữa sự cố)",
        "items": [
          {
            "word": "repair / fix",
            "type": "Động từ",
            "phonetic": "/rɪˈper/ /fɪks/",
            "vi": "Sửa chữa, khắc phục sự cố hỏng hóc.",
            "example": "We need a plumber to fix the leaking tap and repair the toilet."
          },
          {
            "word": "plumber / electrician / mechanic",
            "type": "Danh từ",
            "phonetic": "plumber: /ˈplʌmə/ | electrician: /ɪˌlekˈtrɪʃn/ | mechanic: /mɪˈkænɪk/",
            "vi": "Thợ sửa đường ống nước / Thợ điện / Thợ sửa máy móc cơ khí.",
            "example": "Call a plumber for the pipes, an electrician for the power, and a mechanic for the car."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Home Problems",
        "Work Problems",
        "Repair & Services",
        "States & Consequences"
      ],
      "items": [
        {
          "id": "i1",
          "word": "broken window",
          "target": "Home Problems",
          "vi": "cửa sổ bị vỡ"
        },
        {
          "id": "i2",
          "word": "leaking tap",
          "target": "Home Problems",
          "vi": "vòi nước bị rò rỉ"
        },
        {
          "id": "i3",
          "word": "power cut",
          "target": "Home Problems",
          "vi": "sự cố mất điện lưới"
        },
        {
          "id": "i4",
          "word": "clogged toilet",
          "target": "Home Problems",
          "vi": "bồn cầu bị tắc nghẹt"
        },
        {
          "id": "i5",
          "word": "lost keys",
          "target": "Home Problems",
          "vi": "chìa khóa bị mất"
        },
        {
          "id": "i6",
          "word": "stained carpet",
          "target": "Home Problems",
          "vi": "tấm thảm bị ố bẩn"
        },
        {
          "id": "i7",
          "word": "untidy room",
          "target": "Home Problems",
          "vi": "căn phòng bừa bộn"
        },
        {
          "id": "i8",
          "word": "computer crash",
          "target": "Work Problems",
          "vi": "máy tính treo sập nguồn"
        },
        {
          "id": "i9",
          "word": "missed deadline",
          "target": "Work Problems",
          "vi": "lỡ hạn chót nộp báo cáo"
        },
        {
          "id": "i10",
          "word": "too much work",
          "target": "Work Problems",
          "vi": "quá nhiều công việc"
        },
        {
          "id": "i11",
          "word": "late for work",
          "target": "Work Problems",
          "vi": "đi làm bị muộn giờ"
        },
        {
          "id": "i12",
          "word": "copier jam",
          "target": "Work Problems",
          "vi": "máy photocopy bị kẹt giấy"
        },
        {
          "id": "i13",
          "word": "plumber",
          "target": "Repair & Services",
          "vi": "thợ sửa ống nước"
        },
        {
          "id": "i14",
          "word": "electrician",
          "target": "Repair & Services",
          "vi": "thợ sửa điện"
        },
        {
          "id": "i15",
          "word": "mechanic",
          "target": "Repair & Services",
          "vi": "thợ sửa máy móc"
        },
        {
          "id": "i16",
          "word": "repair",
          "target": "Repair & Services",
          "vi": "sửa chữa bảo trì"
        },
        {
          "id": "i17",
          "word": "fix",
          "target": "Repair & Services",
          "vi": "khắc phục sửa lỗi"
        },
        {
          "id": "i18",
          "word": "clean",
          "target": "Repair & Services",
          "vi": "lau dọn vệ sinh"
        },
        {
          "id": "i19",
          "word": "replace",
          "target": "Repair & Services",
          "vi": "thay thế bộ phận mới"
        },
        {
          "id": "i20",
          "word": "stress",
          "target": "States & Consequences",
          "vi": "áp lực căng thẳng"
        },
        {
          "id": "i21",
          "word": "bad mood",
          "target": "States & Consequences",
          "vi": "tâm trạng tồi tệ"
        },
        {
          "id": "i22",
          "word": "argument",
          "target": "States & Consequences",
          "vi": "cuộc cãi vã xung đột"
        },
        {
          "id": "i23",
          "word": "broken",
          "target": "States & Consequences",
          "vi": "bị vỡ, hỏng"
        },
        {
          "id": "i24",
          "word": "dirty",
          "target": "States & Consequences",
          "vi": "bị bẩn thỉu"
        },
        {
          "id": "i25",
          "word": "damaged",
          "target": "States & Consequences",
          "vi": "bị tổn hại, hư hỏng"
        },
        {
          "id": "i26",
          "word": "call for help",
          "target": "Repair & Services",
          "vi": "gọi cứu trợ hỗ trợ"
        },
        {
          "id": "i27",
          "word": "service repair",
          "target": "Repair & Services",
          "vi": "dịch vụ sửa chữa"
        },
        {
          "id": "i28",
          "word": "apologize",
          "target": "States & Consequences",
          "vi": "nói lời xin lỗi"
        },
        {
          "id": "i29",
          "word": "exhausted",
          "target": "States & Consequences",
          "vi": "kiệt sức mệt mỏi"
        },
        {
          "id": "i30",
          "word": "clogged pipe",
          "target": "Home Problems",
          "vi": "đường ống nước bị tắc"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. The kitchen sink won't drain because the pipe is _____.",
        "options": [
          "broken",
          "clogged",
          "untidy",
          "lost"
        ],
        "a": "clogged"
      },
      {
        "q": "2. The water is dripping constantly from the bathroom _____.",
        "options": [
          "tap",
          "window",
          "carpet",
          "copier"
        ],
        "a": "tap"
      },
      {
        "q": "3. We had to use candles last night because of a major _____.",
        "options": [
          "power cut",
          "computer crash",
          "argument",
          "missed deadline"
        ],
        "a": "power cut"
      },
      {
        "q": "4. I cannot unlock the front door because I have _____ my keys.",
        "options": [
          "broken",
          "damaged",
          "lost",
          "repaired"
        ],
        "a": "lost"
      },
      {
        "q": "5. He got angry and had a serious _____ with his coworker today.",
        "options": [
          "stress",
          "argument",
          "bad mood",
          "deadline"
        ],
        "a": "argument"
      },
      {
        "q": "6. I was late _____ work this morning because my alarm clock didn't ring.",
        "options": [
          "to",
          "for",
          "at",
          "in"
        ],
        "a": "for"
      },
      {
        "q": "7. My computer _____ and I lost all my unsaved files.",
        "options": [
          "crashed",
          "repaired",
          "fixed",
          "cleaned"
        ],
        "a": "crashed"
      },
      {
        "q": "8. Call a _____ to fix the leaking pipes and clogged sink.",
        "options": [
          "electrician",
          "plumber",
          "mechanic",
          "journalist"
        ],
        "a": "plumber"
      },
      {
        "q": "9. Call a _____ to fix the electric wires after the power cut.",
        "options": [
          "plumber",
          "electrician",
          "mechanic",
          "presenter"
        ],
        "a": "electrician"
      },
      {
        "q": "10. He is in a very _____ mood today, so don't talk to him.",
        "options": [
          "nice",
          "pleasant",
          "bad",
          "wonderful"
        ],
        "a": "bad"
      },
      {
        "q": "11. She has _____ work today; she has to stay in the office until 9 PM.",
        "options": [
          "too much",
          "too many",
          "few",
          "no"
        ],
        "a": "too much"
      },
      {
        "q": "12. The glass in the bedroom window is _____ and needs to be replaced.",
        "options": [
          "clogged",
          "broken",
          "dirty",
          "lost"
        ],
        "a": "broken"
      },
      {
        "q": "13. I missed the project _____ because my computer crashed.",
        "options": [
          "deadline",
          "argument",
          "stress",
          "salary"
        ],
        "a": "deadline"
      },
      {
        "q": "14. Please help me _____ this untidy room. It is a complete mess.",
        "options": [
          "dirty",
          "clean",
          "clog",
          "damage"
        ],
        "a": "clean"
      },
      {
        "q": "15. The car broke down on the highway. We need a _____.",
        "options": [
          "plumber",
          "electrician",
          "mechanic",
          "dentist"
        ],
        "a": "mechanic"
      },
      {
        "q": "16. My job causes me a lot of _____ and I can't sleep.",
        "options": [
          "progress",
          "stress",
          "holiday",
          "change"
        ],
        "a": "stress"
      },
      {
        "q": "17. The red wine left a dark _____ on the white living room carpet.",
        "options": [
          "stain",
          "clog",
          "cut",
          "jam"
        ],
        "a": "stain"
      },
      {
        "q": "18. I spilled water and _____ the keyboard. It doesn't work now.",
        "options": [
          "repaired",
          "fixed",
          "damaged",
          "cleaned"
        ],
        "a": "damaged"
      },
      {
        "q": "19. The paper got stuck inside. There is a paper _____.",
        "options": [
          "cut",
          "cutout",
          "jam",
          "clog"
        ],
        "a": "jam"
      },
      {
        "q": "20. Don't worry, the local mechanic can easily _____ your bicycle chain.",
        "options": [
          "clog",
          "lose",
          "fix",
          "damage"
        ],
        "a": "fix"
      }
    ],
    "typingGame": [
      {
        "q": "Vòi nước rò rỉ: leaking t _ p",
        "hint": "t a p",
        "a": "tap"
      },
      {
        "q": "Mất điện lưới: p _ _ e r cut",
        "hint": "p o w e r",
        "a": "power"
      },
      {
        "q": "Mất chìa khóa: l _ s t keys",
        "hint": "l o s t",
        "a": "lost"
      },
      {
        "q": "Thợ sửa nước: p _ _ m _ _ r",
        "hint": "p l u m b e r",
        "a": "plumber"
      },
      {
        "q": "Thợ sửa điện: e _ _ c _ _ _ _ _ _ _ n",
        "hint": "e l e c t r i c i a n",
        "a": "electrician"
      },
      {
        "q": "Thợ sửa xe: m _ _ h _ _ _ c",
        "hint": "m e c h a n i c",
        "a": "mechanic"
      },
      {
        "q": "Treo máy tính: computer c _ _ s h",
        "hint": "c r a s h",
        "a": "crash"
      },
      {
        "q": "Trễ hạn chót: missed d _ _ d _ _ _ e",
        "hint": "d e a d l i n e",
        "a": "deadline"
      },
      {
        "q": "Đi làm trễ: late f _ r work",
        "hint": "f o r",
        "a": "for"
      },
      {
        "q": "Áp lực, căng thẳng: s _ _ e s s",
        "hint": "s t r e s s",
        "a": "stress"
      },
      {
        "q": "Tâm trạng tồi tệ: bad m _ _ d",
        "hint": "m o o d",
        "a": "mood"
      },
      {
        "q": "Cãi vã: a _ _ u _ _ n t",
        "hint": "a r ɡ u m e n t",
        "a": "argument"
      },
      {
        "q": "Sửa chữa (repair): r _ _ a _ r",
        "hint": "r e p a i r",
        "a": "repair"
      },
      {
        "q": "Khắc phục (fix): f _ x",
        "hint": "f i x",
        "a": "fix"
      },
      {
        "q": "Vết ố bẩn: s _ _ a n",
        "hint": "s t a i n",
        "a": "stain"
      },
      {
        "q": "Kẹt giấy (jam): paper j _ m",
        "hint": "j a m",
        "a": "jam"
      },
      {
        "q": "Cửa kính bị vỡ: b _ _ k _ n window",
        "hint": "b r o k e n",
        "a": "broken"
      },
      {
        "q": "Bồn cầu bị tắc: c _ _ g _ _ d toilet",
        "hint": "c l o ɡ ɡ e d",
        "a": "clogged"
      },
      {
        "q": "Lau dọn: c _ _ a n",
        "hint": "c l e a n",
        "a": "clean"
      },
      {
        "q": "Thay thế: r _ _ l _ c e",
        "hint": "r e p l a c e",
        "a": "replace"
      }
    ],
    "speaking": [
      {
        "text": "The bedroom has a broken window and the kitchen sink is leaking.",
        "trans": "Phòng ngủ có một chiếc cửa sổ bị vỡ và bồn rửa nhà bếp đang rò rỉ nước."
      },
      {
        "text": "I was late for work because there was a power cut last night.",
        "trans": "Tôi đã đi làm muộn vì đêm qua bị mất điện."
      },
      {
        "text": "My computer crashed yesterday, so I missed the project deadline.",
        "trans": "Máy tính của tôi đã bị treo hôm qua, vì thế tôi đã trễ hạn chót dự án."
      },
      {
        "text": "We need a plumber to fix the clogged toilet as soon as possible.",
        "trans": "Chúng ta cần thợ sửa ống nước đến để thông bồn cầu bị tắc càng sớm càng tốt."
      },
      {
        "text": "He is in a bad mood because he has too much work and stress.",
        "trans": "Anh ấy đang có tâm trạng tồi tệ vì anh ấy có quá nhiều công việc và căng thẳng."
      }
    ]
  },
  {
    "id": 60,
    "title": "Unit 60: Global problems",
    "description": "Học từ vựng về các thiên tai tàn khốc trên thế giới (earthquake, flood), vấn đề môi trường và xã hội toàn cầu, cùng cách diễn đạt ý thức bảo vệ hành tinh.",
    "theory": [
      {
        "heading": "A. Natural disasters (Thiên tai tàn khốc)",
        "items": [
          {
            "word": "hurricane / storm",
            "type": "Danh từ",
            "phonetic": "hurricane: /ˈhʌrɪkən/ | storm: /stɔːm/",
            "vi": "Cuồng phong, bão nhiệt đới lớn / Cơn bão kèm sấm chớp.",
            "example": "The hurricane destroyed many wooden houses on the coast."
          },
          {
            "word": "earthquake / forest fire",
            "type": "Danh từ",
            "phonetic": "earthquake: /ˈɜːθkweɪk/ | forest fire: /ˈfɒrɪst ˈfaɪə/",
            "vi": "Động đất / Cháy rừng diện rộng.",
            "example": "The earthquake damaged buildings. The forest fire burned the trees."
          },
          {
            "word": "flood / drought",
            "type": "Danh từ",
            "phonetic": "/flʌd/ /draʊt/",
            "vi": "Lũ lụt / Hạn hán kéo dài.",
            "example": "The heavy rain caused a flood. The crops died during the long drought."
          }
        ]
      },
      {
        "heading": "B. Social & Environmental problems (Vấn đề môi trường và xã hội)",
        "items": [
          {
            "word": "pollution / global warming",
            "type": "Danh từ",
            "phonetic": "pollution: /pəˈluːʃn/ | global warming: /ˈɡləʊbl ˈwɔːmɪŋ/",
            "vi": "Sự ô nhiễm / Sự nóng lên toàn cầu.",
            "example": "Air pollution is serious in cities. Global warming is melting ice caps."
          },
          {
            "word": "war / strike",
            "type": "Danh từ",
            "phonetic": "war: /wɔː/ | strike: /straɪk/",
            "vi": "Chiến tranh, xung đột vũ trang / Cuộc bãi công, đình công.",
            "example": "The war caused terrible suffering. Bus drivers are on strike today."
          },
          {
            "word": "poverty / hunger",
            "type": "Danh từ",
            "phonetic": "poverty: /ˈpɒvəti/ | hunger: /ˈhʌŋɡə/",
            "vi": "Cảnh nghèo đói / Sự đói khát.",
            "example": "Many children die of hunger. The charity works to reduce poverty."
          }
        ]
      },
      {
        "heading": "C. Environmental action verbs (Động từ hành động vì trái đất)",
        "items": [
          {
            "word": "destroy / damage",
            "type": "Động từ",
            "phonetic": "destroy: /dɪˈstrɔɪ/ | damage: /ˈdæmɪdʒ/",
            "vi": "Phá hủy hoàn toàn / Làm tổn hại, hư hỏng.",
            "example": "The flood destroyed the bridge and damaged houses."
          },
          {
            "word": "protect / save / recycle",
            "type": "Động từ",
            "phonetic": "protect: /prəˈtekt/ | save: /seɪv/ | recycle: /ˌriːˈsaɪkl/",
            "vi": "Bảo vệ / Cứu giúp, tiết kiệm / Tái chế rác thải.",
            "example": "We must protect the environment, save energy, and recycle plastic waste."
          }
        ]
      }
    ],
    "dragDrop": {
      "buckets": [
        "Natural Disasters",
        "Environmental Issues",
        "Social & Political",
        "Action Verbs"
      ],
      "items": [
        {
          "id": "i1",
          "word": "hurricane",
          "target": "Natural Disasters",
          "vi": "cuồng phong nhiệt đới"
        },
        {
          "id": "i2",
          "word": "earthquake",
          "target": "Natural Disasters",
          "vi": "trận động đất"
        },
        {
          "id": "i3",
          "word": "flood",
          "target": "Natural Disasters",
          "vi": "trận lũ lụt"
        },
        {
          "id": "i4",
          "word": "drought",
          "target": "Natural Disasters",
          "vi": "nạn hạn hán"
        },
        {
          "id": "i5",
          "word": "forest fire",
          "target": "Natural Disasters",
          "vi": "vụ cháy rừng"
        },
        {
          "id": "i6",
          "word": "volcano",
          "target": "Natural Disasters",
          "vi": "núi lửa phun trào"
        },
        {
          "id": "i7",
          "word": "tsunami",
          "target": "Natural Disasters",
          "vi": "sóng thần kinh hoàng"
        },
        {
          "id": "i8",
          "word": "pollution",
          "target": "Environmental Issues",
          "vi": "sự ô nhiễm"
        },
        {
          "id": "i9",
          "word": "global warming",
          "target": "Environmental Issues",
          "vi": "nóng lên toàn cầu"
        },
        {
          "id": "i10",
          "word": "plastic waste",
          "target": "Environmental Issues",
          "vi": "rác thải nhựa"
        },
        {
          "id": "i11",
          "word": "trash",
          "target": "Environmental Issues",
          "vi": "rác thải sinh hoạt"
        },
        {
          "id": "i12",
          "word": "deforestation",
          "target": "Environmental Issues",
          "vi": "nạn phá rừng"
        },
        {
          "id": "i13",
          "word": "climate change",
          "target": "Environmental Issues",
          "vi": "biến đổi khí hậu"
        },
        {
          "id": "i14",
          "word": "war",
          "target": "Social & Political",
          "vi": "chiến tranh xung đột"
        },
        {
          "id": "i15",
          "word": "strike",
          "target": "Social & Political",
          "vi": "cuộc bãi công đình công"
        },
        {
          "id": "i16",
          "word": "poverty",
          "target": "Social & Political",
          "vi": "cảnh nghèo đói"
        },
        {
          "id": "i17",
          "word": "hunger",
          "target": "Social & Political",
          "vi": "nạn đói khát"
        },
        {
          "id": "i18",
          "word": "homelessness",
          "target": "Social & Political",
          "vi": "tình trạng vô gia cư"
        },
        {
          "id": "i19",
          "word": "inflation",
          "target": "Social & Political",
          "vi": "nạn lạm phát tiền tệ"
        },
        {
          "id": "i20",
          "word": "destroy",
          "target": "Action Verbs",
          "vi": "tàn phá hủy hoại"
        },
        {
          "id": "i21",
          "word": "damage",
          "target": "Action Verbs",
          "vi": "gây hư hại"
        },
        {
          "id": "i22",
          "word": "protect",
          "target": "Action Verbs",
          "vi": "bảo vệ giữ gìn"
        },
        {
          "id": "i23",
          "word": "save",
          "target": "Action Verbs",
          "vi": "cứu nguy, tiết kiệm"
        },
        {
          "id": "i24",
          "word": "recycle",
          "target": "Action Verbs",
          "vi": "tái chế sử dụng lại"
        },
        {
          "id": "i25",
          "word": "clean up",
          "target": "Action Verbs",
          "vi": "dọn dẹp làm sạch"
        },
        {
          "id": "i26",
          "word": "support",
          "target": "Action Verbs",
          "vi": "hỗ trợ giúp đỡ"
        },
        {
          "id": "i27",
          "word": "volunteer",
          "target": "Action Verbs",
          "vi": "tình nguyện cống hiến"
        },
        {
          "id": "i28",
          "word": "survive",
          "target": "Action Verbs",
          "vi": "sống sót sinh tồn"
        },
        {
          "id": "i29",
          "word": "environment",
          "target": "Environmental Issues",
          "vi": "môi trường sinh thái"
        },
        {
          "id": "i30",
          "word": "earth",
          "target": "Environmental Issues",
          "vi": "trái đất của chúng ta"
        }
      ]
    },
    "quiz": [
      {
        "q": "1. The violent shaking of the earth's surface that damages buildings is an _____.",
        "options": [
          "hurricane",
          "earthquake",
          "drought",
          "flood"
        ],
        "a": "earthquake"
      },
      {
        "q": "2. The water rose so high that it covered cars and roads. It was a major _____.",
        "options": [
          "drought",
          "flood",
          "earthquake",
          "forest fire"
        ],
        "a": "flood"
      },
      {
        "q": "3. No rain fell in the region for ten months, causing a terrible _____.",
        "options": [
          "flood",
          "drought",
          "storm",
          "hurricane"
        ],
        "a": "drought"
      },
      {
        "q": "4. The strong winds of the tropical _____ blew away roofs of coastal houses.",
        "options": [
          "drought",
          "hurricane",
          "earthquake",
          "forest fire"
        ],
        "a": "hurricane"
      },
      {
        "q": "5. We must protect the planet by recycling paper and _____ waste.",
        "options": [
          "trash",
          "plastic",
          "wood",
          "glass"
        ],
        "a": "plastic"
      },
      {
        "q": "6. Air and water _____ are serious problems in modern industrial cities.",
        "options": [
          "poverty",
          "pollution",
          "warming",
          "hunger"
        ],
        "a": "pollution"
      },
      {
        "q": "7. The planet is getting warmer because of global _____.",
        "options": [
          "warming",
          "cooling",
          "pollution",
          "strike"
        ],
        "a": "warming"
      },
      {
        "q": "8. The train drivers are on _____ today, so there are no trains running.",
        "options": [
          "war",
          "strike",
          "poverty",
          "drought"
        ],
        "a": "strike"
      },
      {
        "q": "9. Many children in poor countries suffer from _____ due to lack of food.",
        "options": [
          "poverty",
          "hunger",
          "pollution",
          "strike"
        ],
        "a": "hunger"
      },
      {
        "q": "10. The armed conflict between the two countries led to a devastating _____.",
        "options": [
          "war",
          "strike",
          "drought",
          "flood"
        ],
        "a": "war"
      },
      {
        "q": "11. The devastating earthquake _____ the bridge and damaged the railway.",
        "options": [
          "protected",
          "destroyed",
          "saved",
          "recycled"
        ],
        "a": "destroyed"
      },
      {
        "q": "12. We must try our best to _____ energy and water to protect the environment.",
        "options": [
          "destroy",
          "damage",
          "save",
          "recycle"
        ],
        "a": "save"
      },
      {
        "q": "13. You should always _____ your plastic bottles, cans and newspapers.",
        "options": [
          "destroy",
          "damage",
          "recycle",
          "save"
        ],
        "a": "recycle"
      },
      {
        "q": "14. A charity organization works hard to help people living in deep _____.",
        "options": [
          "poverty",
          "wealth",
          "progress",
          "salary"
        ],
        "a": "poverty"
      },
      {
        "q": "15. The hot dry summer caused a major _____ in the pine forest.",
        "options": [
          "drought",
          "flood",
          "forest fire",
          "earthquake"
        ],
        "a": "forest fire"
      },
      {
        "q": "16. We should protect the _____ for the next generations.",
        "options": [
          "environment",
          "poverty",
          "weather",
          "traffic"
        ],
        "a": "environment"
      },
      {
        "q": "17. Volunteers gathered on the beach to _____ all the trash and plastic bottles.",
        "options": [
          "destroy",
          "damage",
          "clean up",
          "recycle"
        ],
        "a": "clean up"
      },
      {
        "q": "18. Many people lost their homes in the war and suffered from _____.",
        "options": [
          "homelessness",
          "poverty",
          "strike",
          "drought"
        ],
        "a": "homelessness"
      },
      {
        "q": "19. The extreme heat wave made it difficult for local farmers to _____.",
        "options": [
          "survive",
          "destroy",
          "damage",
          "strike"
        ],
        "a": "survive"
      },
      {
        "q": "20. Earth is the only _____ in the solar system that has human life.",
        "options": [
          "star",
          "planet",
          "country",
          "environment"
        ],
        "a": "planet"
      }
    ],
    "typingGame": [
      {
        "q": "Trận động đất: e _ _ t h q _ _ _ e",
        "hint": "e a r t h q u a k e",
        "a": "earthquake"
      },
      {
        "q": "Lũ lụt: f _ _ o d",
        "hint": "f l o o d",
        "a": "flood"
      },
      {
        "q": "Hạn hán: d _ _ u g h t",
        "hint": "d r o u ɡ h t",
        "a": "drought"
      },
      {
        "q": "Bão cuồng phong: h _ _ r _ _ _ _ e",
        "hint": "h u r r i c a n e",
        "a": "hurricane"
      },
      {
        "q": "Sự ô nhiễm: p _ _ l _ _ _ _ n",
        "hint": "p o l l u t i o n",
        "a": "pollution"
      },
      {
        "q": "Nóng lên toàn cầu: global w _ _ m _ _ g",
        "hint": "w a r m i n ɡ",
        "a": "warming"
      },
      {
        "q": "Chiến tranh: w _ r",
        "hint": "w a r",
        "a": "war"
      },
      {
        "q": "Cuộc đình công: s _ _ i k e",
        "hint": "s t r i k e",
        "a": "strike"
      },
      {
        "q": "Nghèo đói: p _ _ e _ t y",
        "hint": "p o v e r t y",
        "a": "poverty"
      },
      {
        "q": "Sự đói khát: h _ _ g e r",
        "hint": "h u n ɡ e r",
        "a": "hunger"
      },
      {
        "q": "Tàn phá: d _ _ t _ _ y",
        "hint": "d e s t r o y",
        "a": "destroy"
      },
      {
        "q": "Bảo vệ: p _ _ t _ _ t",
        "hint": "p r o t e c t",
        "a": "protect"
      },
      {
        "q": "Tiết kiệm/Cứu giúp: s _ _ e",
        "hint": "s a v e",
        "a": "save"
      },
      {
        "q": "Tái chế: r _ _ y _ _ e",
        "hint": "r e c y c l e",
        "a": "recycle"
      },
      {
        "q": "Trái đất: E _ _ t h",
        "hint": "E a r t h",
        "a": "Earth"
      },
      {
        "q": "Môi trường: e _ _ i _ _ _ _ _ _ t",
        "hint": "e n v i r o n m e n t",
        "a": "environment"
      },
      {
        "q": "Rác thải nhựa: plastic w _ _ t e",
        "hint": "w a s t e",
        "a": "waste"
      },
      {
        "q": "Cháy rừng: forest f _ _ e",
        "hint": "f i r e",
        "a": "fire"
      },
      {
        "q": "Sống sót: s _ _ v _ v e",
        "hint": "s u r v i v e",
        "a": "survive"
      },
      {
        "q": "Dọn dẹp: c _ _ a n up",
        "hint": "c l e a n",
        "a": "clean"
      }
    ],
    "speaking": [
      {
        "text": "The devastating flood destroyed the bridge and damaged many homes.",
        "trans": "Trận lũ lụt tàn khốc đã phá hủy cây cầu và làm hư hại nhiều ngôi nhà."
      },
      {
        "text": "We must protect the environment and recycle plastic waste to save the Earth.",
        "trans": "Chúng ta phải bảo vệ môi trường và tái chế rác thải nhựa để cứu lấy Trái Đất."
      },
      {
        "text": "Many children in poor nations live in poverty and die of hunger.",
        "trans": "Nhiều trẻ em ở các quốc gia nghèo sống trong cảnh nghèo đói và chết vì đói khát."
      },
      {
        "text": "The train drivers are on strike today due to poor salaries.",
        "trans": "Các tài xế xe lửa đang đình công hôm nay do tiền lương quá thấp."
      },
      {
        "text": "Global warming is causing dangerous climate change and melting polar ice.",
        "trans": "Sự nóng lên toàn cầu đang gây ra biến đổi khí hậu nguy hiểm và làm tan băng ở cực."
      }
    ]
  }
];
