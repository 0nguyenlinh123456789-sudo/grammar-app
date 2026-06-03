import fs from 'fs';

const rawUnits = [
  {
    unitNum: 76, title: "Unit 76: Complaining and protesting", description: "Từ vựng diễn tả sự càu nhàu, phàn nàn và bới lông tìm vết.", buckets: ["Complaining (Phàn nàn)", "Protesting (Phản đối)"],
    words: [
      { word: "grouse", type: "Động từ", phonetic: "/ɡraʊs/", vi: "càu nhàu, cằn nhằn", example: "He's always grousing about how much he has to work.", bucket: 0 },
      { word: "whinge", type: "Động từ", phonetic: "/wɪndʒ/", vi: "rên rỉ, than vãn (một cách phiền toái)", example: "Stop whingeing and just get on with it!", bucket: 0 },
      { word: "find fault", type: "Cụm động từ", phonetic: "/faɪnd fɒlt/", vi: "bới lông tìm vết, chê bai", example: "He's always trying to find fault with my work.", bucket: 0 },
      { word: "grumble", type: "Động từ", phonetic: "/ˈɡrʌm.bəl/", vi: "lầm bầm phàn nàn", example: "She grumbled about the cold weather.", bucket: 0 },
      { word: "boycott", type: "Động từ", phonetic: "/ˈbɔɪ.kɒt/", vi: "tẩy chay", example: "Consumers decided to boycott the company's products.", bucket: 1 },
      { word: "picket", type: "Động từ", phonetic: "/ˈpɪk.ɪt/", vi: "đứng biểu tình chặn cửa (đình công)", example: "The striking workers picketed outside the factory gates.", bucket: 1 },
      { word: "uproar", type: "Danh từ", phonetic: "/ˈʌp.rɔːr/", vi: "sự náo động, phản đối dữ dội", example: "The new tax policy caused a massive public uproar.", bucket: 1 },
      { word: "petition", type: "Danh từ", phonetic: "/pəˈtɪʃ.ən/", vi: "đơn kiến nghị", example: "They collected 10,000 signatures on the petition.", bucket: 1 }
    ]
  },
  {
    unitNum: 77, title: "Unit 77: Apologising, forgiving and reconciliation", description: "Sự ân hận, chứng cớ ngoại phạm và sự minh oan.", buckets: ["Apology (Xin lỗi)", "Forgiveness (Tha thứ)"],
    words: [
      { word: "alibi", type: "Danh từ", phonetic: "/ˈæl.ɪ.baɪ/", vi: "chứng cớ ngoại phạm", example: "He has a cast-iron alibi for the night of the murder.", bucket: 1 },
      { word: "remorse", type: "Danh từ", phonetic: "/rɪˈmɔːs/", vi: "sự ăn năn, hối hận tột cùng", example: "The killer showed no remorse for his terrible crimes.", bucket: 0 },
      { word: "exonerate", type: "Động từ", phonetic: "/ɪɡˈzɒn.ə.reɪt/", vi: "minh oan, giải trừ tội danh", example: "The DNA evidence completely exonerated him.", bucket: 1 },
      { word: "repent", type: "Động từ", phonetic: "/rɪˈpent/", vi: "sám hối", example: "He repented of his sins and became a monk.", bucket: 0 },
      { word: "acquittal", type: "Danh từ", phonetic: "/əˈkwɪt.əl/", vi: "sự tuyên trắng án", example: "The trial resulted in a full acquittal.", bucket: 1 },
      { word: "clemency", type: "Danh từ", phonetic: "/ˈklem.ən.si/", vi: "sự khoan hồng, ân xá", example: "The prisoner begged the governor for clemency.", bucket: 1 },
      { word: "reconcile", type: "Động từ", phonetic: "/ˈrek.ən.saɪl/", vi: "hòa giải, làm lành", example: "It took years for the two brothers to finally reconcile.", bucket: 1 },
      { word: "absolve", type: "Động từ", phonetic: "/əbˈzɒlv/", vi: "xá tội, miễn trách nhiệm", example: "The priest absolved him of all his sins.", bucket: 1 }
    ]
  },
  {
    unitNum: 78, title: "Unit 78: Complimenting and praising", description: "Từ vựng tán dương chân thành và cả sự xu nịnh giả tạo.", buckets: ["Praise (Khen ngợi)", "Flattery (Xu nịnh)"],
    words: [
      { word: "laud", type: "Động từ", phonetic: "/lɔːd/", vi: "tán dương, ca ngợi (trịnh trọng)", example: "The brave firefighter was loudly lauded by the mayor.", bucket: 0 },
      { word: "flatter", type: "Động từ", phonetic: "/ˈflæt.ər/", vi: "tâng bốc, nịnh nọt", example: "Are you trying to flatter me into giving you a raise?", bucket: 1 },
      { word: "obsequious", type: "Tính từ", phonetic: "/əbˈsiː.kwi.əs/", vi: "khúm núm, nịnh hót quá đáng", example: "He is surrounded by obsequious assistants who never disagree.", bucket: 1 },
      { word: "extol", type: "Động từ", phonetic: "/ɪkˈstəʊl/", vi: "tán tụng hết lời", example: "The critics extolled the virtues of her new novel.", bucket: 0 },
      { word: "eulogy", type: "Danh từ", phonetic: "/ˈjuː.lə.dʒi/", vi: "điếu văn ca ngợi (người đã khuất)", example: "He delivered a moving eulogy at his father's funeral.", bucket: 0 },
      { word: "sycophant", type: "Danh từ", phonetic: "/ˈsɪk.ə.fænt/", vi: "kẻ nịnh bợ, bợ đỡ", example: "The king's court was filled with greedy sycophants.", bucket: 1 },
      { word: "commend", type: "Động từ", phonetic: "/kəˈmend/", vi: "khen ngợi (vì đã làm tốt)", example: "I must commend you on your excellent presentation.", bucket: 0 },
      { word: "accolade", type: "Danh từ", phonetic: "/ˈæk.ə.leɪd/", vi: "giải thưởng, vinh dự (như lời khen)", example: "She received the highest accolade for her scientific research.", bucket: 0 }
    ]
  },
  {
    unitNum: 79, title: "Unit 79: Promises and bets", description: "Lời thề, cam kết và các trò cá cược.", buckets: ["Promises (Lời hứa)", "Bets (Cá cược)"],
    words: [
      { word: "vow", type: "Động từ", phonetic: "/vaʊ/", vi: "thề, lập lời thề", example: "They stood at the altar and vowed to love each other forever.", bucket: 0 },
      { word: "pledge", type: "Danh từ", phonetic: "/pledʒ/", vi: "lời cam kết, sự đóng góp (quyên tiền)", example: "Thousands made a monthly pledge to the charity.", bucket: 0 },
      { word: "have a flutter", type: "Thành ngữ", phonetic: "/hæv ə ˈflʌt.ər/", vi: "đặt cược nhỏ cho vui", example: "I usually have a little flutter on the horse races.", bucket: 1 },
      { word: "wager", type: "Danh từ", phonetic: "/ˈweɪ.dʒər/", vi: "khoản tiền cá cược", example: "He placed a heavy wager on the football match.", bucket: 1 },
      { word: "oath", type: "Danh từ", phonetic: "/əʊθ/", vi: "lời thề (trước tòa, khi nhậm chức)", example: "The witness took an oath to tell the truth.", bucket: 0 },
      { word: "guarantee", type: "Động từ", phonetic: "/ˌɡær.ənˈtiː/", vi: "bảo đảm", example: "I guarantee you will love this new restaurant.", bucket: 0 },
      { word: "stake", type: "Danh từ", phonetic: "/steɪk/", vi: "tiền cọc, cổ phần", example: "They are playing poker for very high stakes.", bucket: 1 },
      { word: "assure", type: "Động từ", phonetic: "/əˈʃɔːr/", vi: "cam đoan (để làm yên tâm)", example: "I assure you that the car is perfectly safe.", bucket: 0 }
    ]
  },
  {
    unitNum: 80, title: "Unit 80: Reminiscences and regrets", description: "Hồi ức về quá khứ tươi đẹp và sự than thở tiếc nuối.", buckets: ["Memories (Ký ức)", "Regrets (Tiếc nuối)"],
    words: [
      { word: "the good old days", type: "Cụm danh từ", phonetic: "/ðə ɡʊd əʊld deɪz/", vi: "những ngày tháng xưa tươi đẹp", example: "My grandfather always talks fondly about the good old days.", bucket: 0 },
      { word: "look back", type: "Cụm động từ", phonetic: "/lʊk bæk/", vi: "nhìn lại (quá khứ)", example: "When I look back on my youth, I have no regrets.", bucket: 0 },
      { word: "lament", type: "Động từ", phonetic: "/ləˈment/", vi: "than vãn, xót xa", example: "He lamented the tragic loss of his best friend.", bucket: 1 },
      { word: "nostalgia", type: "Danh từ", phonetic: "/nɒsˈtæl.dʒə/", vi: "nỗi nhớ nhà, sự hoài niệm", example: "Hearing that old song fills me with deep nostalgia.", bucket: 0 },
      { word: "reminisce", type: "Động từ", phonetic: "/ˌrem.ɪˈnɪs/", vi: "hồi tưởng, ôn lại kỷ niệm", example: "We spent the evening reminiscing about our college years.", bucket: 0 },
      { word: "mourn", type: "Động từ", phonetic: "/mɔːn/", vi: "than khóc (người chết), tiếc thương", example: "The entire country mourned the death of the president.", bucket: 1 },
      { word: "rue", type: "Động từ", phonetic: "/ruː/", vi: "hối hận, tiếc (cay đắng)", example: "You will live to rue this foolish decision.", bucket: 1 },
      { word: "evocative", type: "Tính từ", phonetic: "/ɪˈvɒk.ə.tɪv/", vi: "gợi nhớ (ký ức)", example: "The smell of baking bread is highly evocative of my childhood.", bucket: 0 }
    ]
  },
  {
    unitNum: 81, title: "Unit 81: Agreement, disagreement and compromise", description: "Từ vựng về sự đồng thuận, rạn nứt và việc nhượng bộ.", buckets: ["Agreement (Đồng tình)", "Disagreement (Bất đồng)"],
    words: [
      { word: "tally", type: "Động từ", phonetic: "/ˈtæl.i/", vi: "khớp với nhau, đồng nhất", example: "Her story doesn't tally with what the other witnesses said.", bucket: 0 },
      { word: "rift", type: "Danh từ", phonetic: "/rɪft/", vi: "sự rạn nứt (mối quan hệ)", example: "The argument caused a deep rift between the two brothers.", bucket: 1 },
      { word: "concession", type: "Danh từ", phonetic: "/kənˈseʃ.ən/", vi: "sự nhượng bộ", example: "Both sides had to make some major concessions to reach a deal.", bucket: 0 },
      { word: "unanimous", type: "Tính từ", phonetic: "/juːˈnæn.ɪ.məs/", vi: "nhất trí hoàn toàn (100%)", example: "The jury reached a unanimous verdict of guilty.", bucket: 0 },
      { word: "compromise", type: "Danh từ", phonetic: "/ˈkɒm.prə.maɪz/", vi: "sự thỏa hiệp", example: "We couldn't agree, so we had to find a compromise.", bucket: 0 },
      { word: "dissent", type: "Danh từ", phonetic: "/dɪˈsent/", vi: "sự bất đồng quan điểm (đặc biệt là với số đông)", example: "There was growing dissent within the ruling party.", bucket: 1 },
      { word: "friction", type: "Danh từ", phonetic: "/ˈfrɪk.ʃən/", vi: "sự xích mích", example: "There is constant friction between the sales and marketing teams.", bucket: 1 },
      { word: "concur", type: "Động từ", phonetic: "/kənˈkɜːr/", vi: "tán thành, đồng quan điểm", example: "I strongly concur with the speaker's main points.", bucket: 0 }
    ]
  },
  {
    unitNum: 82, title: "Unit 82: Academic writing 1", description: "Các động từ học thuật dùng để suy luận, bóp méo hoặc đính kèm.", buckets: ["Academic Verbs (Động từ học thuật)", "Data handling (Xử lý dữ liệu)"],
    words: [
      { word: "infer", type: "Động từ", phonetic: "/ɪnˈfɜːr/", vi: "suy luận, suy ra", example: "We can infer from the data that the economy is improving.", bucket: 0 },
      { word: "distort", type: "Động từ", phonetic: "/dɪˈstɔːt/", vi: "bóp méo, xuyên tạc", example: "The journalist deliberately distorted the politician's words.", bucket: 1 },
      { word: "append", type: "Động từ", phonetic: "/əˈpend/", vi: "đính kèm, thêm vào phần cuối", example: "Please append a list of references at the end of the essay.", bucket: 1 },
      { word: "derive", type: "Động từ", phonetic: "/dɪˈraɪv/", vi: "bắt nguồn từ, rút ra từ", example: "Many English words are derived from Latin.", bucket: 0 },
      { word: "corroborate", type: "Động từ", phonetic: "/kəˈrɒb.ə.reɪt/", vi: "làm chứng, chứng thực (bằng chứng)", example: "The new evidence heavily corroborates her story.", bucket: 0 },
      { word: "refute", type: "Động từ", phonetic: "/rɪˈfjuːt/", vi: "bác bỏ, chứng minh là sai", example: "The scientist completely refuted the old theory with his new experiment.", bucket: 1 },
      { word: "deduce", type: "Động từ", phonetic: "/dɪˈdʒuːs/", vi: "suy diễn (dựa trên logic)", example: "The detective deduced that the killer was left-handed.", bucket: 0 },
      { word: "compile", type: "Động từ", phonetic: "/kəmˈpaɪl/", vi: "biên soạn, tập hợp", example: "She spent years compiling a massive dictionary.", bucket: 1 }
    ]
  },
  {
    unitNum: 83, title: "Unit 83: Academic writing 2", description: "Từ vựng dùng để nhắc lại, là ví dụ điển hình hoặc ám chỉ.", buckets: ["Statements (Nhận định)", "Examples (Ví dụ)"],
    words: [
      { word: "reiterate", type: "Động từ", phonetic: "/riˈɪt.ər.eɪt/", vi: "nhắc lại, lặp lại (để nhấn mạnh)", example: "Let me reiterate that this rule applies to everyone.", bucket: 0 },
      { word: "epitomise", type: "Động từ", phonetic: "/ɪˈpɪt.ə.maɪz/", vi: "là hình ảnh/ví dụ tiêu biểu của", example: "She perfectly epitomises the modern working mother.", bucket: 1 },
      { word: "allude to", type: "Cụm động từ", phonetic: "/əˈluːd tuː/", vi: "ám chỉ, nói bóng gió tới", example: "The poem briefly alludes to the Greek myth of Icarus.", bucket: 0 },
      { word: "assert", type: "Động từ", phonetic: "/əˈsɜːt/", vi: "khẳng định mạnh mẽ", example: "He confidently asserted his innocence in court.", bucket: 0 },
      { word: "substantiate", type: "Động từ", phonetic: "/səbˈstæn.ʃi.eɪt/", vi: "chứng minh (bằng bằng chứng)", example: "You must provide data to substantiate your bold claims.", bucket: 0 },
      { word: "elucidate", type: "Động từ", phonetic: "/ɪˈluː.sɪ.deɪt/", vi: "làm sáng tỏ, giải thích rõ", example: "The professor helped to elucidate this very complex theory.", bucket: 0 },
      { word: "imply", type: "Động từ", phonetic: "/ɪmˈplaɪ/", vi: "ngụ ý (không nói thẳng)", example: "Are you implying that I am a liar?", bucket: 1 },
      { word: "exemplify", type: "Động từ", phonetic: "/ɪɡˈzem.plɪ.faɪ/", vi: "minh họa bằng ví dụ cụ thể", example: "This painting heavily exemplifies the romantic style.", bucket: 1 }
    ]
  },
  {
    unitNum: 84, title: "Unit 84: Writing: style and format", description: "Phong cách viết lách, viết nháp nguệch ngoạc và định dạng văn bản.", buckets: ["Writing Style (Phong cách)", "Formatting (Định dạng)"],
    words: [
      { word: "doodle", type: "Động từ", phonetic: "/ˈduː.dəl/", vi: "vẽ nguệch ngoạc (khi đang rảnh/suy nghĩ)", example: "He absentmindedly doodled in the margins of his notebook.", bucket: 0 },
      { word: "block capitals", type: "Cụm danh từ", phonetic: "/ˌblɒk ˈkæp.ɪ.təlz/", vi: "CHỮ IN HOA (không viết liền)", example: "Please fill out the application form in block capitals.", bucket: 1 },
      { word: "bullet point", type: "Cụm danh từ", phonetic: "/ˈbʊl.ɪt ˌpɔɪnt/", vi: "dấu chấm đầu dòng", example: "Summarize your main arguments using clear bullet points.", bucket: 1 },
      { word: "illegible", type: "Tính từ", phonetic: "/ɪˈledʒ.ə.bəl/", vi: "chữ viết không thể đọc nổi", example: "The doctor's handwriting is completely illegible.", bucket: 0 },
      { word: "concise", type: "Tính từ", phonetic: "/kənˈsaɪs/", vi: "ngắn gọn, súc tích", example: "Make sure your summary is clear and concise.", bucket: 0 },
      { word: "verbose", type: "Tính từ", phonetic: "/vɜːˈbəʊs/", vi: "dài dòng, rườm rà", example: "His essay was too verbose and boring to read.", bucket: 0 },
      { word: "draft", type: "Danh từ", phonetic: "/drɑːft/", vi: "bản nháp", example: "This is just the rough first draft of my novel.", bucket: 1 },
      { word: "indent", type: "Động từ", phonetic: "/ɪnˈdent/", vi: "thụt lề dòng đầu tiên", example: "You should indent the first line of each new paragraph.", bucket: 1 }
    ]
  },
  {
    unitNum: 85, title: "Unit 85: Lexical strategies for speaking", description: "Cách diễn đạt khi quên từ hoặc nói ước chừng trong giao tiếp.", buckets: ["Fillers (Từ đệm)", "Vague quantity (Ước lượng)"],
    words: [
      { word: "thingummy", type: "Danh từ", phonetic: "/ˈθɪŋ.ə.mi/", vi: "cái gì đó (khi quên tên đồ vật/người)", example: "Pass me the... thingummy, you know, the tool for opening bottles.", bucket: 0 },
      { word: "umpteen", type: "Số từ", phonetic: "/ˌʌmpˈtiːn/", vi: "vô số, rất nhiều lần (văn nói)", example: "I've told you umpteen times to clean your room!", bucket: 1 },
      { word: "a touch of", type: "Cụm từ", phonetic: "/ə tʌtʃ əv/", vi: "một chút, hơi hơi (ốm nhẹ)", example: "I think I have a touch of the flu.", bucket: 1 },
      { word: "whatsit", type: "Danh từ", phonetic: "/ˈwɒt.sɪt/", vi: "cái gì cơ (quên tên)", example: "Where did you put the whatsit for the television?", bucket: 0 },
      { word: "loads of", type: "Cụm từ", phonetic: "/ləʊdz əv/", vi: "rất nhiều (văn nói)", example: "Don't worry, we have loads of time before the train leaves.", bucket: 1 },
      { word: "sort of", type: "Cụm từ", phonetic: "/ˈsɔːt.əv/", vi: "đại loại thế, kiểu như", example: "It's sort of a blue-green color.", bucket: 0 },
      { word: "ish", type: "Hậu tố", phonetic: "/ɪʃ/", vi: "tầm khoảng (giờ, tuổi, màu)", example: "Let's meet at seven-ish.", bucket: 0 },
      { word: "give or take", type: "Thành ngữ", phonetic: "/ˌɡɪv ɔː ˈteɪk/", vi: "khoảng chừng, xê xích chút xíu", example: "It will cost $100, give or take a few dollars.", bucket: 1 }
    ]
  },
  {
    unitNum: 86, title: "Unit 86: Speech: style and articulation", description: "Các lỗi và phong cách phát âm: hét lên, nói ngọng, nói nhịu.", buckets: ["Speech defects (Lỗi phát âm)", "Vocal styles (Kiểu nói)"],
    words: [
      { word: "shriek", type: "Động từ", phonetic: "/ʃriːk/", vi: "hét thất thanh, the thé", example: "The little girls shrieked with laughter.", bucket: 1 },
      { word: "lisp", type: "Danh từ", phonetic: "/lɪsp/", vi: "tật nói ngọng (âm s/z biến thành th)", example: "The cute little boy speaks with a slight lisp.", bucket: 0 },
      { word: "slur", type: "Động từ", phonetic: "/slɜːr/", vi: "nói nhịu, nói lè nhè (do say/mệt)", example: "He was drunk and started to loudly slur his words.", bucket: 0 },
      { word: "mumble", type: "Động từ", phonetic: "/ˈmʌm.bəl/", vi: "nói lầm bầm (trong miệng)", example: "Stop mumbling and speak clearly!", bucket: 0 },
      { word: "stutter", type: "Động từ", phonetic: "/ˈstʌt.ər/", vi: "nói lắp bắp", example: "He tends to stutter when he gets nervous.", bucket: 0 },
      { word: "whisper", type: "Động từ", phonetic: "/ˈwɪs.pər/", vi: "nói thì thầm", example: "She leaned over to whisper a secret in my ear.", bucket: 1 },
      { word: "bellow", type: "Động từ", phonetic: "/ˈbel.əʊ/", vi: "rống lên, gầm lên (vì giận/để gọi ai)", example: "The sergeant bellowed orders at the soldiers.", bucket: 1 },
      { word: "mutter", type: "Động từ", phonetic: "/ˈmʌt.ər/", vi: "càu nhàu (âm lượng nhỏ)", example: "He walked away muttering curses under his breath.", bucket: 1 }
    ]
  },
  {
    unitNum: 87, title: "Unit 87: Vague language expressions", description: "Từ ngữ nói mơ hồ, chung chung và thiếu chính xác.", buckets: ["Approximation (Mơ hồ)", "Generality (Chung chung)"],
    words: [
      { word: "smattering", type: "Danh từ", phonetic: "/ˈsmæt.ər.ɪŋ/", vi: "một chút kiến thức/từ vựng bập bõm", example: "I only know a small smattering of French.", bucket: 0 },
      { word: "more or less", type: "Cụm từ", phonetic: "/ˌmɔː.r ər ˈles/", vi: "tương đối, gần như là", example: "The project is more or less finished.", bucket: 0 },
      { word: "or whatever", type: "Cụm từ", phonetic: "/ɔː wɒtˈev.ər/", vi: "hay cái gì đó đại loại thế", example: "You can bring wine, beer, or whatever you like.", bucket: 0 },
      { word: "bits and pieces", type: "Cụm danh từ", phonetic: "/ˌbɪts ənd ˈpiː.sɪz/", vi: "vài thứ lặt vặt", example: "I just need to buy a few bits and pieces at the supermarket.", bucket: 1 },
      { word: "somewhere in the region of", type: "Thành ngữ", phonetic: "/ˈsʌm.weər ɪn ðə ˈriː.dʒən əv/", vi: "vào khoảng (giá tiền, số lượng)", example: "The house will cost somewhere in the region of $500,000.", bucket: 1 },
      { word: "odds and ends", type: "Cụm danh từ", phonetic: "/ˌɒdz ənd ˈendz/", vi: "đồ lặt vặt rải rác", example: "I've packed most things, just got a few odds and ends left.", bucket: 1 },
      { word: "stuff", type: "Danh từ", phonetic: "/stʌf/", vi: "đồ đạc (nói chung)", example: "Can you move all this stuff off the table?", bucket: 1 },
      { word: "along those lines", type: "Thành ngữ", phonetic: "/əˈlɒŋ ðəʊz laɪnz/", vi: "cái gì đó tương tự như thế", example: "I want a car, a Honda Civic or something along those lines.", bucket: 0 }
    ]
  },
  {
    unitNum: 88, title: "Unit 88: Types of idiom", description: "Các loại thành ngữ thông dụng về sự ngần ngại, bí mật và trở ngại.", buckets: ["Idioms (Thành ngữ)", "Phrasal Idioms (Cụm từ)"],
    words: [
      { word: "have second thoughts", type: "Thành ngữ", phonetic: "/hæv ˌsek.ənd ˈθɔːts/", vi: "đắn đo, suy nghĩ lại (thay đổi quyết định)", example: "I agreed to go, but now I'm having second thoughts.", bucket: 0 },
      { word: "in the dark", type: "Thành ngữ", phonetic: "/ɪn ðə dɑːk/", vi: "mù tịt, không được biết thông tin", example: "They kept me completely in the dark about their plans.", bucket: 0 },
      { word: "stumbling block", type: "Cụm danh từ", phonetic: "/ˈstʌm.bəl.ɪŋ blɒk/", vi: "vật cản, trở ngại lớn", example: "Money has always been the main stumbling block to this project.", bucket: 1 },
      { word: "out of the blue", type: "Thành ngữ", phonetic: "/aʊt əv ðə bluː/", vi: "bất thình lình, không báo trước", example: "One day, he just called me completely out of the blue.", bucket: 0 },
      { word: "turn a blind eye", type: "Thành ngữ", phonetic: "/tɜːn ə blaɪnd aɪ/", vi: "nhắm mắt làm ngơ", example: "The manager turned a blind eye to the employees coming in late.", bucket: 0 },
      { word: "a piece of cake", type: "Thành ngữ", phonetic: "/ə piːs əv keɪk/", vi: "dễ ợt", example: "That math exam was an absolute piece of cake.", bucket: 1 },
      { word: "ring a bell", type: "Thành ngữ", phonetic: "/rɪŋ ə bel/", vi: "nghe quen quen", example: "That name definitely rings a bell, but I can't remember his face.", bucket: 1 },
      { word: "under the weather", type: "Thành ngữ", phonetic: "/ˌʌn.də ðə ˈweð.ər/", vi: "cảm thấy hơi ốm", example: "I'm feeling a bit under the weather today.", bucket: 0 }
    ]
  },
  {
    unitNum: 89, title: "Unit 89: Idioms for situations", description: "Thành ngữ mô tả tình huống trơn tru, hỗn loạn hoặc khó hiểu.", buckets: ["Success (Thành công)", "Chaos (Hỗn loạn)"],
    words: [
      { word: "up and running", type: "Thành ngữ", phonetic: "/ʌp ənd ˈrʌn.ɪŋ/", vi: "hoạt động trơn tru (máy móc, dự án)", example: "We finally got the new computer system up and running.", bucket: 0 },
      { word: "a complete shambles", type: "Cụm danh từ", phonetic: "/ə kəmˈpliːt ˈʃæm.bəlz/", vi: "tình trạng hỗn loạn, lộn xộn", example: "The organization of the festival was a complete shambles.", bucket: 1 },
      { word: "as clear as mud", type: "Thành ngữ", phonetic: "/əz ˌklɪər əz ˈmʌd/", vi: "rất khó hiểu (như bùn)", example: "His explanation of the grammar rules was as clear as mud.", bucket: 1 },
      { word: "smooth sailing", type: "Thành ngữ", phonetic: "/smuːð ˈseɪ.lɪŋ/", vi: "thuận buồm xuôi gió", example: "Once we got the visa, the rest of the trip was smooth sailing.", bucket: 0 },
      { word: "a vicious circle", type: "Cụm danh từ", phonetic: "/ə ˌvɪʃ.əs ˈsɜː.kəl/", vi: "vòng luẩn quẩn", example: "Poverty and lack of education create a terrible vicious circle.", bucket: 1 },
      { word: "in a nutshell", type: "Thành ngữ", phonetic: "/ɪn ə ˈnʌt.ʃel/", vi: "tóm lại là", example: "Well, to put it in a nutshell, we are bankrupt.", bucket: 0 },
      { word: "out of hand", type: "Thành ngữ", phonetic: "/aʊt əv hænd/", vi: "vượt tầm kiểm soát", example: "The protest quickly got violently out of hand.", bucket: 1 },
      { word: "nip and tuck", type: "Thành ngữ", phonetic: "/nɪp ənd tʌk/", vi: "bất phân thắng bại, rượt đuổi sát sao", example: "The race was strictly nip and tuck until the final lap.", bucket: 0 }
    ]
  },
  {
    unitNum: 90, title: "Unit 90: Idioms that comment on people 1", description: "Thành ngữ miêu tả sự yêu mến, bộ não đứng sau và niềm vui sướng.", buckets: ["Affection (Tình cảm)", "Role (Vai trò)"],
    words: [
      { word: "soft spot", type: "Thành ngữ", phonetic: "/sɒft spɒt/", vi: "sự yêu mến, yếu lòng (trước ai đó)", example: "I will always have a soft spot for my old dog.", bucket: 0 },
      { word: "the brains behind", type: "Cụm danh từ", phonetic: "/ðə breɪnz bɪˈhaɪnd/", vi: "kẻ đứng sau giật dây / bộ não chủ mưu", example: "She is definitely the brains behind this whole operation.", bucket: 1 },
      { word: "on cloud nine", type: "Thành ngữ", phonetic: "/ɒn klaʊd naɪn/", vi: "hạnh phúc tột đỉnh (lên chín tầng mây)", example: "When he asked her to marry him, she was on cloud nine.", bucket: 0 },
      { word: "a pain in the neck", type: "Thành ngữ", phonetic: "/ə peɪn ɪn ðə nek/", vi: "kẻ phiền toái, nhức nhối", example: "My little brother can be a real pain in the neck.", bucket: 1 },
      { word: "know-it-all", type: "Danh từ", phonetic: "/ˈnəʊ.ɪt.ɔːl/", vi: "người tỏ vẻ biết tuốt", example: "Don't be such a know-it-all; nobody likes it.", bucket: 1 },
      { word: "life and soul of the party", type: "Thành ngữ", phonetic: "/laɪf ənd səʊl əv ðə ˈpɑː.ti/", vi: "người năng nổ, trung tâm của bữa tiệc", example: "He's very funny and always the life and soul of the party.", bucket: 0 },
      { word: "down to earth", type: "Tính từ", phonetic: "/ˌdaʊn.tuˈɜːθ/", vi: "thực tế, không viển vông", example: "Despite her fame, she is a very down to earth person.", bucket: 0 },
      { word: "a big head", type: "Cụm danh từ", phonetic: "/ə bɪɡ hed/", vi: "kẻ tự phụ, kiêu ngạo", example: "Winning the award gave him a massively big head.", bucket: 1 }
    ]
  },
  {
    unitNum: 91, title: "Unit 91: Idioms that comment on people 2", description: "Thành ngữ chỉ người thô kệch nhưng tốt, nhân tố bí ẩn và mâu thuẫn.", buckets: ["Personality Types (Kiểu người)", "Conflict (Xung đột)"],
    words: [
      { word: "a rough diamond", type: "Thành ngữ", phonetic: "/ə rʌf ˈdaɪə.mənd/", vi: "viên kim cương thô (người thô lỗ nhưng tốt bụng/tài năng)", example: "He's a bit of a rough diamond, but he has a heart of gold.", bucket: 0 },
      { word: "a dark horse", type: "Thành ngữ", phonetic: "/ə dɑːk hɔːs/", vi: "nhân tố bí ẩn, người có tài năng che giấu", example: "Anna is a dark horse; I didn't know she could sing so well.", bucket: 0 },
      { word: "at loggerheads", type: "Thành ngữ", phonetic: "/ət ˈlɒɡ.ə.hedz/", vi: "cãi vã, bất đồng gay gắt", example: "The two managers are constantly at loggerheads over the budget.", bucket: 1 },
      { word: "a lone wolf", type: "Thành ngữ", phonetic: "/ə ləʊn wʊlf/", vi: "người thích đơn độc (sói đơn độc)", example: "He's a lone wolf who prefers working by himself.", bucket: 0 },
      { word: "a cold fish", type: "Thành ngữ", phonetic: "/ə kəʊld fɪʃ/", vi: "người lạnh lùng, vô cảm", example: "My boss is a bit of a cold fish; he never smiles.", bucket: 0 },
      { word: "a guinea pig", type: "Danh từ", phonetic: "/ə ˈɡɪn.i ˌpɪɡ/", vi: "chuột bạch (người bị đem ra thử nghiệm)", example: "They used the students as guinea pigs for the new drug.", bucket: 1 },
      { word: "a busybody", type: "Danh từ", phonetic: "/ˈbɪz.iˌbɒd.i/", vi: "người hay tọc mạch chuyện người khác", example: "The old lady next door is a terrible busybody.", bucket: 1 },
      { word: "at cross purposes", type: "Thành ngữ", phonetic: "/ət krɒs ˈpɜː.pəs.ɪz/", vi: "hiểu lầm ý nhau, trống đánh xuôi kèn thổi ngược", example: "I think we've been talking at completely cross purposes.", bucket: 1 }
    ]
  },
  {
    unitNum: 92, title: "Unit 92: Idioms that comment on stories and reports", description: "Bất thình lình, những lời nói mỉa mai và sự trùng hợp thú vị.", buckets: ["Surprise (Sự bất ngờ)", "Comments (Bình luận)"],
    words: [
      { word: "out of the blue", type: "Thành ngữ", phonetic: "/aʊt əv ðə bluː/", vi: "bất thình lình, hoàn toàn bất ngờ", example: "The job offer came completely out of the blue.", bucket: 0 },
      { word: "famous last words", type: "Thành ngữ", phonetic: "/ˌfeɪ.məs ˈlɑːst ˌwɜːdz/", vi: "nói trước bước không qua (châm biếm)", example: "He said it wouldn't rain. Famous last words!", bucket: 1 },
      { word: "small world", type: "Thành ngữ", phonetic: "/smɔːl wɜːld/", vi: "thế giới quả là nhỏ bé (khi gặp người quen ở nơi xa lạ)", example: "I met my old teacher in Tokyo! It's a small world.", bucket: 1 },
      { word: "a likely story", type: "Thành ngữ", phonetic: "/ə ˈlaɪ.kli ˌstɔː.ri/", vi: "chuyện khó tin (mỉa mai ai đó đang nói dối)", example: "The dog ate your homework? That's a likely story!", bucket: 1 },
      { word: "a tall order", type: "Thành ngữ", phonetic: "/ə tɔːl ˈɔː.dər/", vi: "một nhiệm vụ vô cùng khó khăn", example: "Finishing this project in two days is a very tall order.", bucket: 0 },
      { word: "ring true", type: "Cụm từ", phonetic: "/rɪŋ truː/", vi: "nghe có vẻ thật/hợp lý", example: "Her excuse for being late didn't exactly ring true.", bucket: 0 },
      { word: "off the record", type: "Thành ngữ", phonetic: "/ɒf ðə ˈrek.ɔːd/", vi: "không chính thức, không được ghi âm/công bố", example: "The politician made a controversial comment strictly off the record.", bucket: 0 },
      { word: "word of mouth", type: "Danh từ", phonetic: "/wɜːd əv maʊθ/", vi: "truyền miệng", example: "The restaurant became famous simply through word of mouth.", bucket: 1 }
    ]
  },
  {
    unitNum: 93, title: "Unit 93: Phrasal verbs 1", description: "Cụm động từ chỉ sự lùi lại đánh giá, làm thay và đứng lên bảo vệ.", buckets: ["Representation (Đại diện)", "Action (Hành động)"],
    words: [
      { word: "stand back from", type: "Cụm động từ", phonetic: "/stænd bæk frɒm/", vi: "lùi lại để nhìn nhận toàn cảnh vấn đề", example: "We need to stand back from the situation and look at the bigger picture.", bucket: 1 },
      { word: "stand in for", type: "Cụm động từ", phonetic: "/stænd ɪn fɔːr/", vi: "làm thay thế tạm thời cho ai", example: "Could you please stand in for me at the meeting tomorrow?", bucket: 0 },
      { word: "stand up for", type: "Cụm động từ", phonetic: "/stænd ʌp fɔːr/", vi: "đứng lên bảo vệ (lẽ phải/ai đó)", example: "You must always stand up for what you believe is right.", bucket: 1 },
      { word: "look up to", type: "Cụm động từ", phonetic: "/lʊk ʌp tʊ/", vi: "kính trọng, ngưỡng mộ", example: "I have always deeply looked up to my older sister.", bucket: 0 },
      { word: "look down on", type: "Cụm động từ", phonetic: "/lʊk daʊn ɒn/", vi: "khinh thường", example: "He tends to look down on people who are less educated.", bucket: 0 },
      { word: "make up for", type: "Cụm động từ", phonetic: "/meɪk ʌp fɔːr/", vi: "bù đắp cho", example: "I bought her flowers to make up for forgetting her birthday.", bucket: 1 },
      { word: "get away with", type: "Cụm động từ", phonetic: "/ɡet əˈweɪ wɪð/", vi: "thoát tội, làm sai mà không bị phạt", example: "He thinks he can lie and always get away with it.", bucket: 1 },
      { word: "put up with", type: "Cụm động từ", phonetic: "/pʊt ʌp wɪð/", vi: "chịu đựng (điều khó chịu)", example: "I refuse to put up with this terrible noise anymore.", bucket: 0 }
    ]
  },
  {
    unitNum: 94, title: "Unit 94: Phrasal verbs 2", description: "Cụm động từ diễn tả sự nỗ lực làm việc, mưa trút nước và sự hèn nhát.", buckets: ["Weather (Thời tiết)", "Work/Effort (Nỗ lực)"],
    words: [
      { word: "slog away", type: "Cụm động từ", phonetic: "/slɒɡ əˈweɪ/", vi: "làm việc cật lực, cặm cụi", example: "I've been slogging away at this report all morning.", bucket: 1 },
      { word: "pelt down", type: "Cụm động từ", phonetic: "/pelt daʊn/", vi: "mưa xối xả", example: "We couldn't go out because the rain was absolutely pelting down.", bucket: 0 },
      { word: "bottle out", type: "Cụm động từ", phonetic: "/ˈbɒt.əl aʊt/", vi: "mất can đảm phút chót, hèn nhát bỏ cuộc", example: "He was going to ask her out, but he entirely bottled out.", bucket: 1 },
      { word: "knuckle down", type: "Cụm động từ", phonetic: "/ˈnʌk.əl daʊn/", vi: "bắt tay vào làm việc nghiêm túc", example: "Exams are near; it's time to seriously knuckle down and study.", bucket: 1 },
      { word: "breeze through", type: "Cụm động từ", phonetic: "/briːz θruː/", vi: "vượt qua dễ dàng (kỳ thi)", example: "She is so smart she just breezed through the math test.", bucket: 1 },
      { word: "tuck in", type: "Cụm động từ", phonetic: "/tʌk ɪn/", vi: "bắt đầu ăn một cách ngon miệng", example: "The food is getting cold, let's tuck in!", bucket: 0 },
      { word: "freshen up", type: "Cụm động từ", phonetic: "/ˈfreʃ.ən ʌp/", vi: "rửa mặt mũi tay chân cho tỉnh táo", example: "I just need ten minutes to properly freshen up before dinner.", bucket: 0 },
      { word: "laze around", type: "Cụm động từ", phonetic: "/leɪz əˈraʊnd/", vi: "lười biếng nằm ườn ra", example: "We spent Sunday just lazing around the house.", bucket: 0 }
    ]
  },
  {
    unitNum: 95, title: "Unit 95: Phrasal verbs 3", description: "Sự bỏ lỡ cơ hội, mở rộng chi nhánh và tràn ngập cảm xúc.", buckets: ["Opportunities (Cơ hội)", "Emotions (Cảm xúc)"],
    words: [
      { word: "miss out on", type: "Cụm động từ", phonetic: "/mɪs aʊt ɒn/", vi: "bỏ lỡ (cơ hội, niềm vui)", example: "Don't miss out on this fantastic discount offer!", bucket: 0 },
      { word: "branch out", type: "Cụm động từ", phonetic: "/brɑːntʃ aʊt/", vi: "mở rộng lĩnh vực kinh doanh / rẽ nhánh", example: "The bookstore decided to branch out into selling coffee.", bucket: 0 },
      { word: "bubble over with", type: "Cụm động từ", phonetic: "/ˈbʌb.əl ˌəʊ.və wɪð/", vi: "tràn ngập (sự phấn khích/hạnh phúc)", example: "The children were absolutely bubbling over with excitement.", bucket: 1 },
      { word: "boil down to", type: "Cụm động từ", phonetic: "/bɔɪl daʊn tuː/", vi: "chung quy lại là (vấn đề cốt lõi)", example: "The whole problem basically boils down to a lack of money.", bucket: 0 },
      { word: "cater for", type: "Cụm động từ", phonetic: "/ˈkeɪ.tə fɔːr/", vi: "phục vụ cho (nhu cầu/sự kiện)", example: "This school specifically caters for children with learning difficulties.", bucket: 0 },
      { word: "dwell on", type: "Cụm động từ", phonetic: "/dwel ɒn/", vi: "nghĩ ngợi/dằn vặt mãi về điều buồn bã", example: "Don't dwell on your past mistakes; move forward.", bucket: 1 },
      { word: "opt out", type: "Cụm động từ", phonetic: "/ɒpt aʊt/", vi: "chọn rút lui khỏi", example: "Employees can legally opt out of the pension scheme.", bucket: 1 },
      { word: "capitalize on", type: "Cụm động từ", phonetic: "/ˈkæp.ɪ.təl.aɪz ɒn/", vi: "tận dụng tối đa lợi thế", example: "We must quickly capitalize on our competitor's mistake.", bucket: 0 }
    ]
  },
  {
    unitNum: 96, title: "Unit 96: Divided by a common language", description: "Từ vựng tiếng Anh - Mỹ: góc chéo, xuống máy bay và vòi nước.", buckets: ["American English (Tiếng Anh-Mỹ)", "British English (Anh-Anh)"],
    words: [
      { word: "kitty-corner", type: "Tính từ", phonetic: "/ˈkɪt.iˌkɔː.nər/", vi: "nằm ở góc chéo (ngã tư) (tiếng Mỹ)", example: "The bank is kitty-corner to the post office.", bucket: 0 },
      { word: "deplane", type: "Động từ", phonetic: "/ˌdiːˈpleɪn/", vi: "xuống máy bay (tiếng Mỹ)", example: "Passengers must wait until the seatbelt sign is off to fully deplane.", bucket: 0 },
      { word: "faucet", type: "Danh từ", phonetic: "/ˈfɔː.sɪt/", vi: "vòi nước (tiếng Mỹ, Anh dùng 'tap')", example: "Turn off the bathroom faucet to save water.", bucket: 0 },
      { word: "sidewalk", type: "Danh từ", phonetic: "/ˈsaɪd.wɔːk/", vi: "vỉa hè (tiếng Mỹ, Anh dùng 'pavement')", example: "Please walk safely on the sidewalk.", bucket: 0 },
      { word: "trunk", type: "Danh từ", phonetic: "/trʌŋk/", vi: "cốp xe hơi (tiếng Mỹ, Anh dùng 'boot')", example: "Put your heavy luggage in the trunk.", bucket: 0 },
      { word: "sneakers", type: "Danh từ", phonetic: "/ˈsniː.kəz/", vi: "giày thể thao (tiếng Mỹ, Anh dùng 'trainers')", example: "He bought a new pair of basketball sneakers.", bucket: 0 },
      { word: "freeway", type: "Danh từ", phonetic: "/ˈfriː.weɪ/", vi: "đường cao tốc (tiếng Mỹ, Anh dùng 'motorway')", example: "The traffic on the freeway is terrible at 5 PM.", bucket: 0 },
      { word: "eggplant", type: "Danh từ", phonetic: "/ˈeɡ.plɑːnt/", vi: "quả cà tím (tiếng Mỹ, Anh dùng 'aubergine')", example: "We had a delicious roasted eggplant dish.", bucket: 1 }
    ]
  },
  {
    unitNum: 97, title: "Unit 97: Other Englishes: diversity and variety", description: "Các từ vựng tiếng Anh đặc trưng từ Ireland, Úc hoặc châu Á.", buckets: ["Slang (Từ lóng quốc tế)", "Cultural words (Văn hóa)"],
    words: [
      { word: "craic", type: "Danh từ", phonetic: "/kræk/", vi: "sự vui vẻ, trò chuyện tán gẫu (tiếng Ireland)", example: "We went to the pub and the craic was brilliant.", bucket: 1 },
      { word: "beaut", type: "Danh từ", phonetic: "/bjuːt/", vi: "cái gì đó tuyệt vời (tiếng Úc/NZ)", example: "That new car of yours is an absolute beaut!", bucket: 1 },
      { word: "shroff", type: "Danh từ", phonetic: "/ʃrɒf/", vi: "nhân viên thu ngân, quầy thanh toán (tiếng Anh ở châu Á)", example: "Please pay for your parking at the shroff office.", bucket: 1 },
      { word: "barbie", type: "Danh từ", phonetic: "/ˈbɑː.bi/", vi: "tiệc nướng ngoài trời (tiếng Úc - BBQ)", example: "We're throwing a barbie on the beach this weekend.", bucket: 1 },
      { word: "mate", type: "Danh từ", phonetic: "/meɪt/", vi: "bạn hiền (dùng phổ biến ở Úc/Anh)", example: "G'day mate, how are things?", bucket: 0 },
      { word: "arvo", type: "Danh từ", phonetic: "/ˈɑː.vəʊ/", vi: "buổi chiều (tiếng Úc - afternoon)", example: "See you this arvo at the beach.", bucket: 1 },
      { word: "kiwi", type: "Danh từ", phonetic: "/ˈkiː.wiː/", vi: "người New Zealand", example: "He's a proud Kiwi living in London.", bucket: 0 },
      { word: "bloke", type: "Danh từ", phonetic: "/bləʊk/", vi: "gã, chàng trai (tiếng Anh/Úc - guy)", example: "He's a really nice bloke once you get to know him.", bucket: 0 }
    ]
  },
  {
    unitNum: 98, title: "Unit 98: Language and gender", description: "Cách dùng từ không phân biệt giới tính và những định kiến giới.", buckets: ["Gender-neutral (Trung lập)", "Stereotypes (Định kiến)"],
    words: [
      { word: "spokesperson", type: "Danh từ", phonetic: "/ˈspəʊksˌpɜː.sən/", vi: "người phát ngôn (thay vì spokesman/spokeswoman)", example: "A government spokesperson declined to comment on the scandal.", bucket: 0 },
      { word: "butch", type: "Tính từ", phonetic: "/bʊtʃ/", vi: "có vẻ ngoài/tính cách quá nam tính (thường nói về phụ nữ)", example: "She has a slightly butch haircut.", bucket: 1 },
      { word: "effeminate", type: "Tính từ", phonetic: "/ɪˈfem.ɪ.nət/", vi: "ẻo lả, ẻo lợt (dùng cho đàn ông - mang tính chê bai)", example: "He was bullied at school for being effeminate.", bucket: 1 },
      { word: "flight attendant", type: "Cụm danh từ", phonetic: "/ˈflaɪt əˌten.dənt/", vi: "tiếp viên hàng không (trung tính hơn 'stewardess')", example: "The flight attendant demonstrated the safety procedures.", bucket: 0 },
      { word: "firefighter", type: "Danh từ", phonetic: "/ˈfaɪəˌfaɪ.tər/", vi: "lính cứu hỏa (thay cho 'fireman')", example: "The brave firefighter rescued the cat from the tree.", bucket: 0 },
      { word: "chairperson", type: "Danh từ", phonetic: "/ˈtʃeəˌpɜː.sən/", vi: "chủ tọa, chủ tịch (thay cho 'chairman')", example: "The chairperson will begin the board meeting now.", bucket: 0 },
      { word: "sexism", type: "Danh từ", phonetic: "/ˈsek.sɪ.zəm/", vi: "sự phân biệt giới tính", example: "The company was sued for blatant workplace sexism.", bucket: 1 },
      { word: "macho", type: "Tính từ", phonetic: "/ˈmætʃ.əʊ/", vi: "cố tỏ ra nam tính, gia trưởng", example: "He has a very toxic and macho attitude towards women.", bucket: 1 }
    ]
  },
  {
    unitNum: 99, title: "Unit 99: Language of age and social class", description: "Từ lóng thể hiện giai cấp xã hội, thế hệ cũ và mới.", buckets: ["Class (Giai cấp)", "Age/Generations (Thế hệ)"],
    words: [
      { word: "oik", type: "Danh từ", phonetic: "/ɔɪk/", vi: "kẻ vô học, thô lỗ (tiếng lóng Anh khinh miệt giai cấp thấp)", example: "Don't act like a complete oik in the restaurant.", bucket: 0 },
      { word: "wireless", type: "Danh từ", phonetic: "/ˈwaɪə.ləs/", vi: "máy radio (từ cổ, người già hay dùng)", example: "My grandfather listens to the news on the old wireless.", bucket: 1 },
      { word: "luncheon", type: "Danh từ", phonetic: "/ˈlʌn.tʃən/", vi: "bữa tiệc trưa trang trọng (từ cổ/thượng lưu)", example: "They hosted a charity luncheon at the luxury hotel.", bucket: 1 },
      { word: "posh", type: "Tính từ", phonetic: "/pɒʃ/", vi: "sang chảnh, thuộc tầng lớp thượng lưu", example: "They sent their son to a very posh private school.", bucket: 0 },
      { word: "chav", type: "Danh từ", phonetic: "/tʃæv/", vi: "thanh niên vô văn hóa, hay gây gổ (tiếng lóng Anh)", example: "A group of loud chavs were fighting on the bus.", bucket: 0 },
      { word: "geezer", type: "Danh từ", phonetic: "/ˈɡiː.zər/", vi: "ông già (thường mang ý bỡn cợt)", example: "Some crazy old geezer was shouting at the pigeons.", bucket: 1 },
      { word: "millennial", type: "Danh từ", phonetic: "/mɪˈlen.i.əl/", vi: "thế hệ Y (sinh 1981-1996)", example: "As a millennial, she is very comfortable with digital technology.", bucket: 1 },
      { word: "aristocracy", type: "Danh từ", phonetic: "/ˌær.ɪˈstɒk.rə.si/", vi: "tầng lớp quý tộc", example: "The French aristocracy lost their power during the revolution.", bucket: 0 }
    ]
  },
  {
    unitNum: 100, title: "Unit 100: Newspaper headline language", description: "Từ vựng cực ngắn và kịch tính chuyên dùng trên giật tít báo chí.", buckets: ["Headlines (Giật tít)", "Action verbs (Hành động mạnh)"],
    words: [
      { word: "crackdown", type: "Danh từ", phonetic: "/ˈkræk.daʊn/", vi: "sự trừng trị thẳng tay", example: "Police launch a massive crackdown on illegal racing.", bucket: 1 },
      { word: "louts", type: "Danh từ", phonetic: "/laʊts/", vi: "kẻ côn đồ, du côn (trên báo)", example: "Drunken louts smashed the shop windows last night.", bucket: 0 },
      { word: "besiege", type: "Động từ", phonetic: "/bɪˈsiːdʒ/", vi: "bao vây (tòa nhà / người nổi tiếng)", example: "Fans completely besiege the hotel where the band is staying.", bucket: 1 },
      { word: "axe", type: "Động từ", phonetic: "/æks/", vi: "cắt giảm, sa thải (dùng trên báo thay cho 'cut')", example: "The company axes 500 jobs to save money.", bucket: 0 },
      { word: "blaze", type: "Danh từ", phonetic: "/bleɪz/", vi: "đám cháy lớn (dùng thay 'fire')", example: "Three people were rescued from the factory blaze.", bucket: 0 },
      { word: "bid", type: "Danh từ", phonetic: "/bɪd/", vi: "nỗ lực (dùng thay 'attempt')", example: "The mayor makes a desperate bid for re-election.", bucket: 1 },
      { word: "clash", type: "Động từ", phonetic: "/klæʃ/", vi: "đụng độ, xung đột (thay 'fight')", example: "Protesters clash with riot police in the city center.", bucket: 1 },
      { word: "probe", type: "Danh từ", phonetic: "/prəʊb/", vi: "cuộc điều tra (thay 'investigation')", example: "The FBI launches a probe into the banking scandal.", bucket: 0 }
    ]
  }
];

// Generator logic...
const courseData = rawUnits.map(unit => {
  const words = unit.words;

  const coreVocab = words.map((w, index) => {
    let colls = [];
    if (w.type.includes('Danh từ')) colls = [`important ${w.word}`, `${w.word} system`];
    if (w.type.includes('Động từ')) colls = [`${w.word} effectively`, `must ${w.word}`];
    if (w.type.includes('Tính từ')) colls = [`highly ${w.word}`, `extremely ${w.word}`];
    
    return {
      word: w.word,
      type: w.type || 'Từ vựng',
      phonetic: w.phonetic || '',
      vi: w.vi || '',
      example: w.example || '',
      bucket: w.bucket + 1,
      collocations: colls,
      wordFamily: `Biến thể của ${w.word}`
    };
  });

  const practicalUsage = [
    {
      heading: `💬 Ứng dụng: ${unit.title}`,
      intro: `Vận dụng các từ vựng cao cấp vào giao tiếp thực tế:`,
      details: words.map(w => ({
        title: w.word,
        value: `👉 ${w.example}`
      }))
    }
  ];

  const families = words.slice(0, 3).map(w => {
    return {
      title: `Họ từ (Word Family) của "${w.word}"`,
      value: `Các dạng từ loại khác của "${w.word}" giúp bạn đa dạng hóa văn phong.`
    };
  });

  const collocations = words.slice(3, 6).map(w => {
    let colls = [];
    if (w.type.includes('Danh từ')) colls = [`a major ${w.word}`, `focus on ${w.word}`];
    if (w.type.includes('Động từ')) colls = [`${w.word} significantly`, `start to ${w.word}`];
    if (w.type.includes('Tính từ')) colls = [`very ${w.word}`, `completely ${w.word}`];
    if (colls.length === 0) colls = [`common ${w.word}`];
    return {
      title: `Cụm từ (Collocations) với "${w.word}"`,
      value: `Ví dụ: ${colls.join(', ')}`
    };
  });

  const discoveryCorner = [
    {
      heading: `💡 Góc khám phá: Word Families`,
      intro: `Mở rộng vốn từ vựng học thuật:`,
      details: families
    },
    {
      heading: `🔥 Góc khám phá: Collocations`,
      intro: `Học cách sử dụng từ như người bản xứ:`,
      details: collocations
    }
  ];

  let textbookExercises = [];
  const ex1 = {
    exNum: `${unit.unitNum}.1`,
    type: 'fill_in_blanks',
    instruction: "Điền từ tiếng Anh thích hợp vào chỗ trống dựa trên gợi ý nghĩa tiếng Việt:",
    questions: words.slice(0, 4).map((w, idx) => {
      let sentence = w.example;
      const regex = new RegExp("\\b" + w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\b", "gi");
      if (regex.test(sentence)) {
        sentence = sentence.replace(regex, "[blank]");
      } else {
        sentence = `The correct word is [blank].`;
      }
      return {
        id: `ex_${unit.unitNum}_1_${idx}`,
        text: sentence,
        answers: [w.word],
        hint: w.vi,
        explanation: `Từ cần điền là "${w.word}", mang nghĩa là "${w.vi}".`
      };
    })
  };

  const ex2 = {
    exNum: `${unit.unitNum}.2`,
    type: 'matching',
    instruction: "Ghép các từ tiếng Anh ở cột trái với nghĩa tiếng Việt tương ứng ở cột phải:",
    questions: words.slice(4, 8).map((w, idx) => {
      return {
        id: `ex_${unit.unitNum}_2_${idx}`,
        text: w.word,
        options: words.slice(4, 8).map(x => x.vi).sort(() => Math.random() - 0.5),
        answer: w.vi,
        explanation: `Từ "${w.word}" có nghĩa chính xác là "${w.vi}".`
      };
    })
  };

  const ex3 = {
    exNum: `${unit.unitNum}.3`,
    type: 'categorization',
    instruction: "Phân loại các từ vựng sau vào đúng nhóm chủ đề của bài học:",
    categories: unit.buckets,
    questions: words.slice(0, 6).map((w, idx) => {
      const cat = unit.buckets[w.bucket];
      return {
        id: `ex_${unit.unitNum}_3_${idx}`,
        word: w.word,
        category: cat,
        explanation: `Từ "${w.word}" thuộc nhóm "${cat}".`
      }
    })
  };

  const ex4 = {
    exNum: `${unit.unitNum}.4`,
    type: 'error_correction',
    instruction: "Tìm và sửa lỗi sai trong các câu sau (Chú ý ngữ pháp và cách dùng từ nâng cao):",
    questions: words.slice(2, 4).map((w, idx) => {
      let badWord = w.word + "s";
      if (w.word.endsWith('s')) badWord = w.word.slice(0, -1);
      if (w.word.includes(' ')) badWord = w.word.split(' ')[0] + 's ' + w.word.split(' ').slice(1).join(' ');
      
      let badExample = w.example.replace(new RegExp("\\b" + w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\b", 'i'), badWord);
      if (badExample === w.example) badExample = `I really like ${badWord}.`;
      return {
        id: `ex_${unit.unitNum}_4_${idx}`,
        original: badExample,
        correct: w.example,
        explanation: `Từ viết đúng chính xác phải là "${w.word}".`
      };
    })
  };

  const ex5 = {
    exNum: `${unit.unitNum}.5`,
    type: 'fill_in_blanks',
    instruction: "Ôn tập tổng hợp: Điền từ thích hợp vào chỗ trống:",
    questions: words.slice(4, 8).map((w, idx) => {
      let sentence = w.example;
      const regex = new RegExp("\\b" + w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\b", "gi");
      if (regex.test(sentence)) {
        sentence = sentence.replace(regex, "[blank]");
      } else {
        sentence = `This [blank] is very important.`;
      }
      return {
        id: `ex_${unit.unitNum}_5_${idx}`,
        text: sentence,
        answers: [w.word],
        hint: w.vi,
        explanation: `Từ cần điền là "${w.word}".`
      };
    })
  };

  textbookExercises = [ex1, ex2, ex3, ex4, ex5];

  return {
    id: `adv_${unit.unitNum}`,
    title: unit.title,
    description: unit.description,
    theory: { coreVocab, practicalUsage, discoveryCorner },
    textbookExercises,
    dragDrop: {
      buckets: unit.buckets,
      items: words.slice(0, 4).map((w, i) => ({
        id: `i${i+1}`, word: w.word, target: unit.buckets[w.bucket], vi: w.vi
      }))
    },
    quiz: [
      {
        q: `What is the best translation for "${words[0].word}"?`,
        options: [words[0].vi, words[1].vi, words[2].vi, words[3].vi].sort(() => Math.random() - 0.5),
        a: words[0].vi
      },
      {
        q: `Which word fits this example: "${words[1].example.replace(new RegExp(words[1].word, 'i'), '___')}"?`,
        options: [words[0].word, words[1].word, words[2].word, words[3].word].sort(() => Math.random() - 0.5),
        a: words[1].word
      }
    ],
    typingGame: [
      { q: `${words[2].vi}: ${words[2].word.charAt(0)}...`, hint: words[2].word.split('').join(' '), a: words[2].word },
      { q: `${words[3].vi}: ${words[3].word.charAt(0)}...`, hint: words[3].word.split('').join(' '), a: words[3].word }
    ],
    speaking: [
      { text: words[0].example, trans: `[Tạm dịch] Câu ví dụ cho ${words[0].word}` }
    ]
  };
});

const fileContent = "// File: src/data/oxfordAdvancedData76_100.js\n// Auto-generated Phase 4 Advanced Units (76-100)\n\n" +
  "export const courseData76_100 = " + JSON.stringify(courseData, null, 2) + ";\n";

fs.writeFileSync('src/data/oxfordAdvancedData76_100.js', fileContent);
console.log("Successfully generated oxfordAdvancedData76_100.js");
