import fs from 'fs';

const rawUnits = [
  {
    unitNum: 51, title: "Unit 51: The media: print", description: "Từ vựng về ngành báo in, tờ rơi và góc tư vấn.", buckets: ["Publications (Ấn phẩm)", "Content (Nội dung)"],
    words: [
      { word: "agony aunt", type: "Cụm danh từ", phonetic: "/ˈæɡ.ə.ni ˌɑːnt/", vi: "chuyên mục tư vấn tâm lý (trên báo)", example: "She writes as an agony aunt for a popular magazine.", bucket: 1 },
      { word: "flyer", type: "Danh từ", phonetic: "/ˈflaɪ.ər/", vi: "tờ rơi (quảng cáo sự kiện)", example: "A boy was handing out flyers for a new nightclub.", bucket: 0 },
      { word: "pamphlet", type: "Danh từ", phonetic: "/ˈpæm.flət/", vi: "cuốn sách nhỏ (về vấn đề chính trị/xã hội)", example: "They distributed a political pamphlet about human rights.", bucket: 0 },
      { word: "tabloid", type: "Danh từ", phonetic: "/ˈtæb.lɔɪd/", vi: "báo lá cải (chuyên đăng tin giật gân)", example: "The tabloid is full of gossip about celebrities.", bucket: 0 },
      { word: "broadsheet", type: "Danh từ", phonetic: "/ˈbrɔːd.ʃiːt/", vi: "báo khổ lớn (báo chính thống, nghiêm túc)", example: "He prefers reading broadsheets like The Times.", bucket: 0 },
      { word: "editorial", type: "Danh từ", phonetic: "/ˌed.ɪˈtɔː.ri.əl/", vi: "bài xã luận (thể hiện quan điểm tòa soạn)", example: "The newspaper published a strong editorial condemning the war.", bucket: 1 },
      { word: "supplement", type: "Danh từ", phonetic: "/ˈsʌp.lɪ.mənt/", vi: "phần phụ trương (của báo)", example: "The Sunday edition comes with a free color supplement.", bucket: 0 },
      { word: "circulation", type: "Danh từ", phonetic: "/ˌsɜː.kjəˈleɪ.ʃən/", vi: "số lượng báo phát hành", example: "The daily circulation of the paper has dropped recently.", bucket: 1 }
    ]
  },
  {
    unitNum: 52, title: "Unit 52: The media: Internet and e-mail", description: "Từ vựng về mạng internet, hành vi duyệt web và lưu trữ dữ liệu.", buckets: ["Internet (Mạng)", "Cyber (Không gian mạng)"],
    words: [
      { word: "chat room", type: "Cụm danh từ", phonetic: "/ˈtʃæt ˌruːm/", vi: "phòng trò chuyện trực tuyến", example: "He spends hours talking to strangers in internet chat rooms.", bucket: 0 },
      { word: "browse", type: "Động từ", phonetic: "/braʊz/", vi: "lướt web, xem lướt qua", example: "I usually browse the internet for an hour before bed.", bucket: 0 },
      { word: "cookie", type: "Danh từ", phonetic: "/ˈkʊk.i/", vi: "tệp lưu trữ dữ liệu duyệt web", example: "Websites use cookies to track your online behavior.", bucket: 1 },
      { word: "bookmark", type: "Động từ", phonetic: "/ˈbʊk.mɑːk/", vi: "lưu trang web yêu thích", example: "You should bookmark this page so you can find it later.", bucket: 0 },
      { word: "spam", type: "Danh từ", phonetic: "/spæm/", vi: "thư rác", example: "My email inbox is full of annoying spam.", bucket: 1 },
      { word: "phishing", type: "Danh từ", phonetic: "/ˈfɪʃ.ɪŋ/", vi: "sự lừa đảo trên mạng (đánh cắp thông tin)", example: "He lost his bank details in a phishing scam.", bucket: 1 },
      { word: "broadband", type: "Danh từ", phonetic: "/ˈbrɔːd.bænd/", vi: "băng thông rộng (mạng tốc độ cao)", example: "We finally got a fast broadband connection installed.", bucket: 0 },
      { word: "troll", type: "Danh từ", phonetic: "/trəʊl/", vi: "kẻ gây rối, khiêu khích trên mạng", example: "Don't reply to the internet troll; just ignore him.", bucket: 1 }
    ]
  },
  {
    unitNum: 53, title: "Unit 53: Advertising", description: "Chiến thuật quảng cáo, giá cả và những lời hứa hẹn sản phẩm.", buckets: ["Advertising (Quảng cáo)", "Marketing (Tiếp thị)"],
    words: [
      { word: "rock-bottom prices", type: "Cụm danh từ", phonetic: "/ˌrɒkˈbɒt.əm ˈpraɪ.sɪz/", vi: "giá rẻ mạt, rẻ nhất có thể", example: "The store is selling off old stock at rock-bottom prices.", bucket: 1 },
      { word: "state-of-the-art", type: "Tính từ", phonetic: "/ˌsteɪt.əv.ðiˈɑːt/", vi: "hiện đại nhất, tiên tiến nhất", example: "The new hospital is equipped with state-of-the-art technology.", bucket: 0 },
      { word: "trailer", type: "Danh từ", phonetic: "/ˈtreɪ.lər/", vi: "đoạn quảng cáo phim ngắn", example: "The movie trailer looks incredibly exciting.", bucket: 0 },
      { word: "billboard", type: "Danh từ", phonetic: "/ˈbɪl.bɔːd/", vi: "biển quảng cáo lớn (ngoài trời)", example: "We saw a huge billboard for the new car on the highway.", bucket: 0 },
      { word: "endorse", type: "Động từ", phonetic: "/ɪnˈdɔːs/", vi: "bảo chứng (người nổi tiếng quảng cáo)", example: "The athlete was paid millions to endorse the sports shoes.", bucket: 1 },
      { word: "catchy", type: "Tính từ", phonetic: "/ˈkætʃ.i/", vi: "bắt tai, dễ nhớ (nhạc, khẩu hiệu)", example: "The commercial has a very catchy tune.", bucket: 0 },
      { word: "slogan", type: "Danh từ", phonetic: "/ˈsləʊ.ɡən/", vi: "khẩu hiệu", example: "Nike's famous slogan is 'Just Do It'.", bucket: 1 },
      { word: "gimmick", type: "Danh từ", phonetic: "/ˈɡɪm.ɪk/", vi: "chiêu trò (để thu hút sự chú ý)", example: "The free gift was just a cheap marketing gimmick.", bucket: 1 }
    ]
  },
  {
    unitNum: 54, title: "Unit 54: The news: gathering and delivering", description: "Quá trình thu thập tin tức, phát sóng và định lượng bài viết.", buckets: ["Journalism (Báo chí)", "Broadcasting (Phát sóng)"],
    words: [
      { word: "column inch", type: "Cụm danh từ", phonetic: "/ˈkɒl.əm ɪntʃ/", vi: "đơn vị đo độ dài bài viết trên báo", example: "The scandal generated thousands of column inches in the press.", bucket: 0 },
      { word: "sound bite", type: "Cụm danh từ", phonetic: "/ˈsaʊnd ˌbaɪt/", vi: "đoạn trích phát biểu ngắn (trên TV/radio)", example: "Politicians often speak in carefully rehearsed sound bites.", bucket: 1 },
      { word: "hot off the press", type: "Thành ngữ", phonetic: "/hɒt ɒf ðə pres/", vi: "vừa mới xuất bản, tin nóng hổi", example: "This news is hot off the press; it just happened.", bucket: 1 },
      { word: "correspondent", type: "Danh từ", phonetic: "/ˌkɒr.ɪˈspɒn.dənt/", vi: "phóng viên thường trú", example: "Our war correspondent is reporting live from the capital.", bucket: 0 },
      { word: "breaking news", type: "Cụm danh từ", phonetic: "/ˌbreɪ.kɪŋ ˈnjuːz/", vi: "tin khẩn, tin nóng đang diễn ra", example: "We interrupt this program for breaking news.", bucket: 0 },
      { word: "censorship", type: "Danh từ", phonetic: "/ˈsen.sə.ʃɪp/", vi: "sự kiểm duyệt", example: "The authoritarian government imposes strict press censorship.", bucket: 1 },
      { word: "leak", type: "Động từ", phonetic: "/liːk/", vi: "rò rỉ (thông tin mật)", example: "Someone leaked the confidential documents to the media.", bucket: 1 },
      { word: "scoop", type: "Danh từ", phonetic: "/skuːp/", vi: "tin độc quyền (chỉ báo mình có)", example: "The journalist won an award for getting the massive scoop.", bucket: 0 }
    ]
  },
  {
    unitNum: 55, title: "Unit 55: Health and illness 1", description: "Từ vựng về các loại bệnh tật, mắc bệnh và bệnh truyền nhiễm.", buckets: ["Diseases (Bệnh tật)", "Getting ill (Mắc bệnh)"],
    words: [
      { word: "go down with", type: "Cụm động từ", phonetic: "/ɡəʊ daʊn wɪð/", vi: "mắc bệnh (thường là bệnh nhẹ)", example: "Half the class has gone down with the flu.", bucket: 1 },
      { word: "hepatitis", type: "Danh từ", phonetic: "/ˌhep.əˈtaɪ.tɪs/", vi: "bệnh viêm gan", example: "Hepatitis is a serious disease that affects the liver.", bucket: 0 },
      { word: "typhoid", type: "Danh từ", phonetic: "/ˈtaɪ.fɔɪd/", vi: "bệnh thương hàn", example: "Typhoid fever is spread through contaminated water.", bucket: 0 },
      { word: "cholera", type: "Danh từ", phonetic: "/ˈkɒl.ər.ə/", vi: "bệnh tả", example: "Thousands died in the cholera outbreak after the flood.", bucket: 0 },
      { word: "contagious", type: "Tính từ", phonetic: "/kənˈteɪ.dʒəs/", vi: "lây nhiễm (qua tiếp xúc)", example: "The infection is highly contagious.", bucket: 1 },
      { word: "epidemic", type: "Danh từ", phonetic: "/ˌep.ɪˈdem.ɪk/", vi: "bệnh dịch (phát tán nhanh trong 1 khu vực)", example: "The city is struggling to control a measles epidemic.", bucket: 1 },
      { word: "chronic", type: "Tính từ", phonetic: "/ˈkrɒn.ɪk/", vi: "mãn tính (bệnh kéo dài)", example: "He suffers from chronic back pain.", bucket: 0 },
      { word: "fatal", type: "Tính từ", phonetic: "/ˈfeɪ.təl/", vi: "gây tử vong", example: "Without treatment, the disease can be fatal.", bucket: 1 }
    ]
  },
  {
    unitNum: 56, title: "Unit 56: Health and illness 2", description: "Các triệu chứng đau nhức, buồn nôn và phương pháp trị liệu.", buckets: ["Symptoms (Triệu chứng)", "Therapies (Trị liệu)"],
    words: [
      { word: "aches and pains", type: "Cụm danh từ", phonetic: "/eɪks ənd peɪnz/", vi: "đau nhức mình mẩy", example: "As you get older, you get more aches and pains.", bucket: 0 },
      { word: "nauseous", type: "Tính từ", phonetic: "/ˈnɔː.zi.əs/", vi: "buồn nôn", example: "The medicine made her feel dizzy and nauseous.", bucket: 0 },
      { word: "acupuncture", type: "Danh từ", phonetic: "/ˈæk.jə.pʌŋk.tʃər/", vi: "thuật châm cứu", example: "He tried acupuncture to relieve his chronic pain.", bucket: 1 },
      { word: "dizzy", type: "Tính từ", phonetic: "/ˈdɪz.i/", vi: "chóng mặt", example: "I felt dizzy after standing up too fast.", bucket: 0 },
      { word: "shiver", type: "Động từ", phonetic: "/ˈʃɪv.ər/", vi: "run rẩy (vì lạnh/sốt)", example: "The high fever made him shiver uncontrollably.", bucket: 0 },
      { word: "concussion", type: "Danh từ", phonetic: "/kənˈkʌʃ.ən/", vi: "chấn động não", example: "The football player suffered a mild concussion.", bucket: 1 },
      { word: "inflammation", type: "Danh từ", phonetic: "/ˌɪn.fləˈmeɪ.ʃən/", vi: "sự sưng viêm", example: "Ice will help reduce the inflammation in your knee.", bucket: 1 },
      { word: "therapy", type: "Danh từ", phonetic: "/ˈθer.ə.pi/", vi: "liệu pháp điều trị", example: "She is undergoing physical therapy after the accident.", bucket: 1 }
    ]
  },
  {
    unitNum: 57, title: "Unit 57: Health and illness 3", description: "Tác dụng phụ, chẩn đoán, tiên lượng và quan điểm y tế.", buckets: ["Medical outcomes (Kết quả y tế)", "Perspectives (Góc nhìn)"],
    words: [
      { word: "side effects", type: "Cụm danh từ", phonetic: "/ˈsaɪd ɪˌfekts/", vi: "tác dụng phụ (của thuốc)", example: "Headaches are one of the common side effects of this drug.", bucket: 0 },
      { word: "jaundiced view", type: "Cụm danh từ", phonetic: "/ˈdʒɔːn.dɪst ˌvjuː/", vi: "cái nhìn bi quan/đầy thành kiến", example: "He takes a very jaundiced view of the medical profession.", bucket: 1 },
      { word: "prognosis", type: "Danh từ", phonetic: "/prɒɡˈnəʊ.sɪs/", vi: "tiên lượng (dự đoán tiến triển bệnh)", example: "The doctor gave a very poor prognosis for her recovery.", bucket: 0 },
      { word: "diagnosis", type: "Danh từ", phonetic: "/ˌdaɪ.əɡˈnəʊ.sɪs/", vi: "sự chẩn đoán bệnh", example: "An accurate early diagnosis is crucial for cancer treatment.", bucket: 0 },
      { word: "immune system", type: "Cụm danh từ", phonetic: "/ɪˈmjuːn ˌsɪs.təm/", vi: "hệ miễn dịch", example: "A healthy diet strengthens your immune system.", bucket: 1 },
      { word: "relapse", type: "Danh từ", phonetic: "/ˈriː.læps/", vi: "sự tái phát bệnh", example: "He was recovering well until he suffered a sudden relapse.", bucket: 0 },
      { word: "remission", type: "Danh từ", phonetic: "/rɪˈmɪʃ.ən/", vi: "sự thuyên giảm (ung thư/bệnh hiểm nghèo)", example: "Her cancer has been in remission for five years.", bucket: 0 },
      { word: "terminal", type: "Tính từ", phonetic: "/ˈtɜː.mɪ.nəl/", vi: "vô phương cứu chữa, giai đoạn cuối", example: "The patient was diagnosed with a terminal illness.", bucket: 1 }
    ]
  },
  {
    unitNum: 58, title: "Unit 58: Diet, sport and fitness", description: "Dinh dưỡng sức khỏe, hệ tim mạch và các ẩn dụ thể thao.", buckets: ["Fitness (Thể hình)", "Sports Metaphors (Ẩn dụ thể thao)"],
    words: [
      { word: "cholesterol", type: "Danh từ", phonetic: "/kəˈles.tər.ɒl/", vi: "chất béo (trong máu)", example: "Exercise helps to lower bad cholesterol levels.", bucket: 0 },
      { word: "cardiovascular", type: "Tính từ", phonetic: "/ˌkɑː.di.əʊˈvæs.kjə.lər/", vi: "thuộc về tim mạch", example: "Running is excellent for your cardiovascular system.", bucket: 0 },
      { word: "move the goalposts", type: "Thành ngữ", phonetic: "/muːv ðə ˈɡəʊl.pəʊsts/", vi: "thay đổi luật chơi (gây khó dễ)", example: "Every time we meet the requirements, the boss moves the goalposts.", bucket: 1 },
      { word: "metabolism", type: "Danh từ", phonetic: "/məˈtæb.əl.ɪ.zəm/", vi: "sự trao đổi chất", example: "A fast metabolism helps you burn calories quickly.", bucket: 0 },
      { word: "stamina", type: "Danh từ", phonetic: "/ˈstæm.ɪ.nə/", vi: "sức bền, thể lực", example: "Marathon runners need incredible stamina.", bucket: 0 },
      { word: "level playing field", type: "Cụm danh từ", phonetic: "/ˌlev.əl ˈpleɪ.ɪŋ ˌfiːld/", vi: "sân chơi bình đẳng (ẩn dụ)", example: "Public education helps create a level playing field for all kids.", bucket: 1 },
      { word: "front runner", type: "Cụm danh từ", phonetic: "/ˈfrʌnt ˌrʌn.ər/", vi: "người/phe dẫn đầu (đang có ưu thế)", example: "He is the front runner to win the election.", bucket: 1 },
      { word: "sweat it out", type: "Cụm động từ", phonetic: "/swet ɪt aʊt/", vi: "vã mồ hôi tập luyện / lo lắng chờ đợi kết quả", example: "We just have to sweat it out until the exam results are published.", bucket: 1 }
    ]
  },
  {
    unitNum: 59, title: "Unit 59: Aspects of industrialisation", description: "Các đặc điểm của công nghiệp hóa, trợ cấp và doanh nghiệp thua lỗ.", buckets: ["Industry (Công nghiệp)", "Economy (Kinh tế)"],
    words: [
      { word: "low-tech", type: "Tính từ", phonetic: "/ˌləʊˈtek/", vi: "công nghệ thấp, thủ công", example: "Farming in this region is still very low-tech.", bucket: 0 },
      { word: "subsidies", type: "Danh từ", phonetic: "/ˈsʌb.sɪ.diz/", vi: "tiền trợ cấp (chính phủ cho doanh nghiệp)", example: "The coal industry relies heavily on state subsidies.", bucket: 1 },
      { word: "lame duck", type: "Cụm danh từ", phonetic: "/ˌleɪm ˈdʌk/", vi: "người/công ty thất bại, kém cỏi", example: "The government refused to bail out the lame duck corporation.", bucket: 1 },
      { word: "mass production", type: "Cụm danh từ", phonetic: "/ˌmæs prəˈdʌk.ʃən/", vi: "sản xuất hàng loạt", example: "Mass production made cars affordable for normal families.", bucket: 0 },
      { word: "automation", type: "Danh từ", phonetic: "/ˌɔː.təˈmeɪ.ʃən/", vi: "sự tự động hóa", example: "Automation has replaced many factory workers with robots.", bucket: 0 },
      { word: "infrastructure", type: "Danh từ", phonetic: "/ˈɪn.frəˌstrʌk.tʃər/", vi: "cơ sở hạ tầng", example: "A developing country must invest heavily in its infrastructure.", bucket: 1 },
      { word: "monopoly", type: "Danh từ", phonetic: "/məˈnɒp.əl.i/", vi: "độc quyền", example: "The company holds a dangerous monopoly in the market.", bucket: 1 },
      { word: "privatize", type: "Động từ", phonetic: "/ˈpraɪ.və.taɪz/", vi: "tư nhân hóa", example: "The government plans to privatize the national railway network.", bucket: 1 }
    ]
  },
  {
    unitNum: 60, title: "Unit 60: Technology and its impact", description: "Các công nghệ ảnh hưởng sâu sắc đến đời sống và công thái học.", buckets: ["Tech tools (Công cụ)", "Impact (Tác động)"],
    words: [
      { word: "PDA", type: "Cụm viết tắt", phonetic: "/ˌpiː.diːˈeɪ/", vi: "thiết bị kỹ thuật số hỗ trợ cá nhân (Personal Digital Assistant)", example: "Before smartphones, business people used PDAs to organize their schedules.", bucket: 0 },
      { word: "biotechnology", type: "Danh từ", phonetic: "/ˌbaɪ.əʊ.tekˈnɒl.ə.dʒi/", vi: "công nghệ sinh học", example: "Biotechnology is revolutionizing modern medicine and agriculture.", bucket: 1 },
      { word: "ergonomics", type: "Danh từ", phonetic: "/ˌɜː.ɡəˈnɒm.ɪks/", vi: "công thái học (thiết kế tối ưu cho con người)", example: "Good ergonomics in office chairs reduces back pain.", bucket: 1 },
      { word: "algorithm", type: "Danh từ", phonetic: "/ˈæl.ɡə.rɪ.ðəm/", vi: "thuật toán", example: "The social media algorithm decides what content you see.", bucket: 1 },
      { word: "artificial intelligence", type: "Cụm danh từ", phonetic: "/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/", vi: "trí tuệ nhân tạo (AI)", example: "Artificial intelligence can now generate images and write code.", bucket: 1 },
      { word: "obsolete", type: "Tính từ", phonetic: "/ˈɒb.səl.iːt/", vi: "lỗi thời, không còn được dùng", example: "Typewriters have become completely obsolete.", bucket: 0 },
      { word: "breakthrough", type: "Danh từ", phonetic: "/ˈbreɪk.θruː/", vi: "bước đột phá lớn", example: "Scientists have made a major breakthrough in cancer research.", bucket: 0 },
      { word: "cutting-edge", type: "Tính từ", phonetic: "/ˌkʌt.ɪŋˈedʒ/", vi: "hiện đại nhất, tiên tiến nhất", example: "The laboratory uses cutting-edge equipment for its experiments.", bucket: 0 }
    ]
  },
  {
    unitNum: 61, title: "Unit 61: Future visions", description: "Tầm nhìn tương lai: thực tế ảo, thương mại điện tử, và liệu pháp gen.", buckets: ["Future concepts (Khái niệm)", "Sci-Fi (Viễn tưởng)"],
    words: [
      { word: "virtual reality", type: "Cụm danh từ", phonetic: "/ˌvɜː.tʃu.əl riˈæl.ə.ti/", vi: "thực tế ảo (VR)", example: "Virtual reality is widely used for training airplane pilots.", bucket: 0 },
      { word: "e-commerce", type: "Danh từ", phonetic: "/ˈiːˌkɒm.ɜːs/", vi: "thương mại điện tử", example: "The growth of e-commerce has led to the closure of physical stores.", bucket: 0 },
      { word: "gene therapy", type: "Cụm danh từ", phonetic: "/ˈdʒiːn ˌθer.ə.pi/", vi: "liệu pháp gen (chữa bệnh bằng DNA)", example: "Gene therapy holds the promise to cure genetic diseases.", bucket: 1 },
      { word: "utopia", type: "Danh từ", phonetic: "/juːˈtəʊ.pi.ə/", vi: "xã hội không tưởng (hoàn hảo)", example: "The novel describes a peaceful, futuristic utopia.", bucket: 1 },
      { word: "dystopia", type: "Danh từ", phonetic: "/dɪˈstəʊ.pi.ə/", vi: "xã hội đen tối, tồi tệ", example: "Many sci-fi movies take place in a ruined dystopia.", bucket: 1 },
      { word: "cloning", type: "Danh từ", phonetic: "/ˈkləʊ.nɪŋ/", vi: "sự nhân bản vô tính", example: "Human cloning remains a highly controversial ethical issue.", bucket: 1 },
      { word: "telepathy", type: "Danh từ", phonetic: "/təˈlep.ə.θi/", vi: "sự ngoại cảm (đọc suy nghĩ)", example: "Some people believe in communication through telepathy.", bucket: 0 },
      { word: "colonize", type: "Động từ", phonetic: "/ˈkɒl.ə.naɪz/", vi: "thuộc địa hóa (chiếm đất/hành tinh)", example: "Elon Musk wants humanity to colonize Mars.", bucket: 0 }
    ]
  },
  {
    unitNum: 62, title: "Unit 62: Space: expanse and confinement", description: "Từ vựng diễn tả sự rộng lớn thênh thang hoặc chật hẹp giam cầm.", buckets: ["Expanse (Rộng rãi)", "Confinement (Chật hẹp)"],
    words: [
      { word: "rambling", type: "Tính từ", phonetic: "/ˈræm.blɪŋ/", vi: "rộng lớn thênh thang (xây lộn xộn/rải rác)", example: "They live in a huge, rambling old house in the countryside.", bucket: 0 },
      { word: "poky", type: "Tính từ", phonetic: "/ˈpəʊ.ki/", vi: "nhỏ bé, chật hẹp khó chịu", example: "I can't live in this poky little apartment.", bucket: 1 },
      { word: "labyrinth", type: "Danh từ", phonetic: "/ˈlæb.ə.rɪnθ/", vi: "mê cung, hệ thống phức tạp", example: "The old city is a fascinating labyrinth of narrow streets.", bucket: 1 },
      { word: "claustrophobia", type: "Danh từ", phonetic: "/ˌklɒs.trəˈfəʊ.bi.ə/", vi: "hội chứng sợ không gian hẹp", example: "He suffers from claustrophobia and hates taking the elevator.", bucket: 1 },
      { word: "cramped", type: "Tính từ", phonetic: "/kræmpt/", vi: "tù túng, chật ních", example: "We sat for hours in a cramped bus.", bucket: 1 },
      { word: "boundless", type: "Tính từ", phonetic: "/ˈbaʊnd.ləs/", vi: "bao la, không giới hạn", example: "Children seem to have boundless energy.", bucket: 0 },
      { word: "infinite", type: "Tính từ", phonetic: "/ˈɪn.fɪ.nət/", vi: "vô tận, vô cực", example: "The universe is believed to be infinite.", bucket: 0 },
      { word: "confined", type: "Tính từ", phonetic: "/kənˈfaɪnd/", vi: "bị giới hạn, giam giữ", example: "The dog was kept in a confined space for days.", bucket: 1 }
    ]
  },
  {
    unitNum: 63, title: "Unit 63: Time: sequence and duration", description: "Cách diễn đạt về thời gian, quá trình già đi và sự ngắn ngủi.", buckets: ["Duration (Độ dài)", "Aging (Lão hóa)"],
    words: [
      { word: "donkey's years", type: "Thành ngữ", phonetic: "/ˈdɒŋ.kiz ˌjɪəz/", vi: "một khoảng thời gian rất dài", example: "I haven't seen my old friend for donkey's years.", bucket: 0 },
      { word: "over the hill", type: "Thành ngữ", phonetic: "/ˌəʊ.və ðə ˈhɪl/", vi: "quá tuổi, qua thời kỳ đỉnh cao (già)", example: "He's nearly 60, but he doesn't think he's over the hill yet.", bucket: 1 },
      { word: "fleeting", type: "Tính từ", phonetic: "/ˈfliː.tɪŋ/", vi: "thoáng qua, ngắn ngủi", example: "I only caught a fleeting glimpse of the thief.", bucket: 0 },
      { word: "transient", type: "Tính từ", phonetic: "/ˈtræn.zi.ənt/", vi: "tạm thời, chớp nhoáng", example: "Beauty is a transient thing.", bucket: 0 },
      { word: "prolonged", type: "Tính từ", phonetic: "/prəˈlɒŋd/", vi: "kéo dài, dền dứ", example: "He returned to work after a prolonged absence.", bucket: 0 },
      { word: "simultaneous", type: "Tính từ", phonetic: "/ˌsɪm.əlˈteɪ.ni.əs/", vi: "xảy ra đồng thời", example: "There were simultaneous explosions in three different cities.", bucket: 0 },
      { word: "eternal", type: "Tính từ", phonetic: "/ɪˈtɜː.nəl/", vi: "vĩnh hằng, bất diệt", example: "He promised her eternal love.", bucket: 0 },
      { word: "belated", type: "Tính từ", phonetic: "/bɪˈleɪ.tɪd/", vi: "đến muộn màng", example: "They sent a belated birthday card.", bucket: 1 }
    ]
  },
  {
    unitNum: 64, title: "Unit 64: Motion: nuances of pace and movement", description: "Các sắc thái tinh tế của cách đi lại, tốc độ và chuyển động.", buckets: ["Slow/Struggling (Chậm/Khó nhọc)", "Fast/Flowing (Nhanh/Chảy)"],
    words: [
      { word: "hobble", type: "Động từ", phonetic: "/ˈhɒb.əl/", vi: "đi tập tễnh (do đau)", example: "The old man had to hobble with a walking stick.", bucket: 0 },
      { word: "trudge", type: "Động từ", phonetic: "/trʌdʒ/", vi: "đi lê bước nhọc nhằn (vì mệt/tuyết dầy)", example: "We had to trudge through deep snow for hours.", bucket: 0 },
      { word: "stream", type: "Động từ", phonetic: "/striːm/", vi: "chảy tuôn ra, ùa ra", example: "People began to stream out of the stadium after the match.", bucket: 1 },
      { word: "saunter", type: "Động từ", phonetic: "/ˈsɔːn.tər/", vi: "đi dạo thong thả", example: "They sauntered along the beach holding hands.", bucket: 0 },
      { word: "dash", type: "Động từ", phonetic: "/dæʃ/", vi: "lao đi vùn vụt, chạy vội", example: "I must dash to the station to catch my train.", bucket: 1 },
      { word: "sluggish", type: "Tính từ", phonetic: "/ˈslʌɡ.ɪʃ/", vi: "chậm chạp, uể oải", example: "The hot weather makes me feel extremely sluggish.", bucket: 0 },
      { word: "velocity", type: "Danh từ", phonetic: "/vəˈlɒs.ə.ti/", vi: "vận tốc (theo hướng nhất định)", example: "Light travels at the highest known velocity in the universe.", bucket: 1 },
      { word: "stroll", type: "Động từ", phonetic: "/strəʊl/", vi: "đi tản bộ", example: "We took a leisurely stroll in the park.", bucket: 0 }
    ]
  },
  {
    unitNum: 65, title: "Unit 65: Manner: behaviour and body language", description: "Phép xã giao, cách hành xử và ngôn ngữ cơ thể.", buckets: ["Etiquette (Phép lịch sự)", "Body language (Ngôn ngữ cơ thể)"],
    words: [
      { word: "mind your Ps and Qs", type: "Thành ngữ", phonetic: "/maɪnd jɔː ˌpiːz ənd ˈkjuːz/", vi: "chú ý cư xử cho đúng mực", example: "When you meet my parents, you better mind your Ps and Qs.", bucket: 0 },
      { word: "etiquette", type: "Danh từ", phonetic: "/ˈet.ɪ.ket/", vi: "phép xã giao, quy tắc ứng xử", example: "According to royal etiquette, you must not touch the Queen.", bucket: 0 },
      { word: "twitch", type: "Động từ", phonetic: "/twɪtʃ/", vi: "co giật (cơ bắp, mí mắt)", example: "His left eye started to twitch from lack of sleep.", bucket: 1 },
      { word: "flinch", type: "Động từ", phonetic: "/flɪntʃ/", vi: "rụt người lại, nao núng (vì đau/sợ)", example: "He didn't even flinch when the nurse gave him the injection.", bucket: 1 },
      { word: "smirk", type: "Động từ", phonetic: "/smɜːk/", vi: "cười khẩy, cười tự mãn", example: "Wipe that arrogant smirk off your face!", bucket: 1 },
      { word: "nod", type: "Động từ", phonetic: "/nɒd/", vi: "gật đầu (đồng ý)", example: "She gave a quick nod to show she understood.", bucket: 1 },
      { word: "frown", type: "Động từ", phonetic: "/fraʊn/", vi: "cau mày", example: "The teacher frowned at the noisy students.", bucket: 1 },
      { word: "courteous", type: "Tính từ", phonetic: "/ˈkɜː.ti.əs/", vi: "nhã nhặn, lịch thiệp", example: "The hotel staff were extremely polite and courteous.", bucket: 0 }
    ]
  },
  {
    unitNum: 66, title: "Unit 66: Sound: from noise to silence", description: "Từ vựng miêu tả các mức độ m thanh từ sự im lặng tuyệt đối đến tiếng ồn chói tai.", buckets: ["Silence (Im lặng)", "Noise (Tiếng ồn)"],
    words: [
      { word: "noiseless", type: "Tính từ", phonetic: "/ˈnɔɪz.ləs/", vi: "không một tiếng động", example: "The electric car is completely noiseless.", bucket: 0 },
      { word: "deafening", type: "Tính từ", phonetic: "/ˈdef.ən.ɪŋ/", vi: "đinh tai nhức óc", example: "The music at the concert was absolutely deafening.", bucket: 1 },
      { word: "wail", type: "Động từ", phonetic: "/weɪl/", vi: "tiếng rền rĩ, gào thét (vì đau khổ/còi hụ)", example: "The ambulance rushed past with its sirens wailing.", bucket: 1 },
      { word: "muffle", type: "Động từ", phonetic: "/ˈmʌf.əl/", vi: "làm tắt tiếng, bóp nghẹt âm thanh", example: "The thick walls muffle the noise of the traffic.", bucket: 0 },
      { word: "creak", type: "Động từ", phonetic: "/kriːk/", vi: "tiếng cọt kẹt (cửa, sàn gỗ)", example: "The old wooden stairs creak when you walk on them.", bucket: 1 },
      { word: "hiss", type: "Động từ", phonetic: "/hɪs/", vi: "tiếng xì xì (rắn, hơi nước)", example: "The angry snake began to hiss at the dog.", bucket: 1 },
      { word: "roar", type: "Động từ", phonetic: "/rɔːr/", vi: "gầm rống", example: "We could hear the lion roar in the jungle.", bucket: 1 },
      { word: "mute", type: "Tính từ", phonetic: "/mjuːt/", vi: "câm nín, im lặng", example: "He pressed the button to mute the television.", bucket: 0 }
    ]
  },
  {
    unitNum: 67, title: "Unit 67: Weight and density", description: "Từ vựng về tính chất vật lý: cồng kềnh, đông đặc và không thấm qua được.", buckets: ["Weight (Khối lượng)", "Density (Mật độ)"],
    words: [
      { word: "unwieldy", type: "Tính từ", phonetic: "/ʌnˈwiːl.di/", vi: "cồng kềnh, khó cầm nắm", example: "The sofa is too large and unwieldy to fit through the door.", bucket: 0 },
      { word: "congeal", type: "Động từ", phonetic: "/kənˈdʒiːl/", vi: "đông lại, vón cục (chất lỏng, mỡ, máu)", example: "The fat on the cold meat began to congeal.", bucket: 1 },
      { word: "impervious", type: "Tính từ", phonetic: "/ɪmˈpɜː.vi.əs/", vi: "không thấm qua được / không bị ảnh hưởng", example: "This new material is completely impervious to water.", bucket: 1 },
      { word: "dense", type: "Tính từ", phonetic: "/dens/", vi: "dày đặc, đặc xịt", example: "We walked through a very dense and dark forest.", bucket: 1 },
      { word: "dilute", type: "Động từ", phonetic: "/daɪˈluːt/", vi: "pha loãng", example: "You must dilute the acid with plenty of water.", bucket: 1 },
      { word: "buoyant", type: "Tính từ", phonetic: "/ˈbɔɪ.ənt/", vi: "nổi trên mặt nước / (tâm trạng) vui vẻ nổi lên", example: "Cork is a very light and buoyant material.", bucket: 0 },
      { word: "clunky", type: "Tính từ", phonetic: "/ˈklʌŋ.ki/", vi: "to nặng, vụng về (máy móc, thiết kế)", example: "I had to use a clunky old computer.", bucket: 0 },
      { word: "fragile", type: "Tính từ", phonetic: "/ˈfrædʒ.aɪl/", vi: "dễ vỡ", example: "Be careful! That antique vase is very fragile.", bucket: 0 }
    ]
  },
  {
    unitNum: 68, title: "Unit 68: Colour: range and intensity", description: "Sự phong phú và cường độ của màu sắc (màu gừng, màu phấn) và ẩn dụ.", buckets: ["Color range (Dải màu)", "Metaphors (Ẩn dụ màu)"],
    words: [
      { word: "ginger", type: "Tính từ", phonetic: "/ˈdʒɪn.dʒər/", vi: "màu nâu cam nhạt (tóc, mèo)", example: "He has a cute ginger cat.", bucket: 0 },
      { word: "pastel", type: "Tính từ", phonetic: "/ˈpæs.təl/", vi: "màu phấn nhạt, màu nhạt", example: "The room was painted in soft pastel colors.", bucket: 0 },
      { word: "grey cells", type: "Cụm danh từ", phonetic: "/ˈɡreɪ ˌselz/", vi: "chất xám, trí não", example: "Solving this puzzle will definitely stimulate your grey cells.", bucket: 1 },
      { word: "vivid", type: "Tính từ", phonetic: "/ˈvɪv.ɪd/", vi: "chói lọi, sống động (màu sắc, trí nhớ)", example: "She was wearing a vivid red dress.", bucket: 0 },
      { word: "translucent", type: "Tính từ", phonetic: "/trænzˈluː.sənt/", vi: "mờ ảo, ánh sáng xuyên qua được (nhưng không trong suốt)", example: "The frosted glass on the door is completely translucent.", bucket: 0 },
      { word: "opaque", type: "Tính từ", phonetic: "/əʊˈpeɪk/", vi: "mờ đục, không cho ánh sáng qua", example: "I bought some opaque curtains to block out the sun.", bucket: 0 },
      { word: "crimson", type: "Danh từ", phonetic: "/ˈkrɪm.zən/", vi: "màu đỏ thẫm", example: "Her face turned crimson with intense embarrassment.", bucket: 1 },
      { word: "faded", type: "Tính từ", phonetic: "/ˈfeɪ.dɪd/", vi: "phai màu", example: "He was wearing a pair of old, faded jeans.", bucket: 1 }
    ]
  },
  {
    unitNum: 69, title: "Unit 69: Speed", description: "Tốc độ: sự xuất hiện bất thình lình, trượt đi hoặc phóng lên như tên lửa.", buckets: ["Fast (Nhanh)", "Sudden (Bất thình lình)"],
    words: [
      { word: "pop", type: "Động từ", phonetic: "/pɒp/", vi: "xuất hiện đột ngột, tạt qua", example: "I'll just pop into the shop to buy some milk.", bucket: 1 },
      { word: "scuttle", type: "Động từ", phonetic: "/ˈskʌt.əl/", vi: "chạy trốn nhanh bằng những bước ngắn (như cua, chuột)", example: "The crab scuttled quickly across the sand.", bucket: 0 },
      { word: "rocket", type: "Động từ", phonetic: "/ˈrɒk.ɪt/", vi: "phóng vọt lên (giá cả, con người)", example: "House prices in the city have rocketed this year.", bucket: 0 },
      { word: "accelerate", type: "Động từ", phonetic: "/əkˈsel.ə.reɪt/", vi: "tăng tốc", example: "The sports car can accelerate from 0 to 60 in 3 seconds.", bucket: 0 },
      { word: "plunge", type: "Động từ", phonetic: "/plʌndʒ/", vi: "lao xuống dốc không phanh (giá cả, rơi tự do)", example: "The stock market plunged deeply after the news.", bucket: 1 },
      { word: "swift", type: "Tính từ", phonetic: "/swɪft/", vi: "nhanh nhẹn, mau lẹ", example: "The government promised to take swift action.", bucket: 0 },
      { word: "sluggish", type: "Tính từ", phonetic: "/ˈslʌɡ.ɪʃ/", vi: "chậm chạp, uể oải", example: "The economy has been extremely sluggish lately.", bucket: 0 },
      { word: "brisk", type: "Tính từ", phonetic: "/brɪsk/", vi: "lanh lợi, lanh lẹ (bước đi)", example: "They went for a brisk walk in the cold air.", bucket: 0 }
    ]
  },
  {
    unitNum: 70, title: "Unit 70: Cause and effect", description: "Các động từ diễn tả quá trình tạo ra, châm ngòi và mang lại hệ quả.", buckets: ["Cause (Nguyên nhân)", "Effect (Hệ quả)"],
    words: [
      { word: "generate", type: "Động từ", phonetic: "/ˈdʒen.ə.reɪt/", vi: "tạo ra, phát sinh", example: "Wind turbines generate green electricity.", bucket: 0 },
      { word: "spark off", type: "Cụm động từ", phonetic: "/spɑːk ɒf/", vi: "châm ngòi, khơi mào (xung đột, biểu tình)", example: "The arrest of the activist sparked off massive riots.", bucket: 0 },
      { word: "bring about", type: "Cụm động từ", phonetic: "/brɪŋ əˈbaʊt/", vi: "dẫn đến, mang lại (thay đổi lớn)", example: "The new president promised to bring about major social changes.", bucket: 1 },
      { word: "trigger", type: "Động từ", phonetic: "/ˈtrɪɡ.ər/", vi: "kích hoạt, gây ra", example: "Certain foods can trigger a severe allergic reaction.", bucket: 0 },
      { word: "stem from", type: "Cụm động từ", phonetic: "/stem frɒm/", vi: "bắt nguồn từ", example: "Her mental health problems stem from her difficult childhood.", bucket: 0 },
      { word: "catalyst", type: "Danh từ", phonetic: "/ˈkæt.ə.lɪst/", vi: "chất xúc tác (nghĩa bóng: nhân tố thúc đẩy)", example: "The scandal acted as a catalyst for political reform.", bucket: 1 },
      { word: "consequence", type: "Danh từ", phonetic: "/ˈkɒn.sɪ.kwəns/", vi: "hậu quả", example: "Global warming is a direct consequence of carbon emissions.", bucket: 1 },
      { word: "induce", type: "Động từ", phonetic: "/ɪnˈdjuːs/", vi: "xui khiến, gây ra (về y tế/trạng thái)", example: "Pills were used to induce a deep sleep.", bucket: 1 }
    ]
  },
  {
    unitNum: 71, title: "Unit 71: Comparison and contrast", description: "Sự gắn kết đồng điệu, sự khác biệt hoàn toàn và những thứ rời rạc.", buckets: ["Similarities (Sự giống nhau)", "Differences (Sự khác biệt)"],
    words: [
      { word: "affinity", type: "Danh từ", phonetic: "/əˈfɪn.ə.ti/", vi: "sự đồng điệu, mối quan hệ gắn kết", example: "He felt a strong affinity for the isolated village.", bucket: 0 },
      { word: "disparate", type: "Tính từ", phonetic: "/ˈdɪs.pər.ət/", vi: "hoàn toàn khác biệt, hỗn tạp", example: "The team is made up of disparate individuals from all over the world.", bucket: 1 },
      { word: "discrete", type: "Tính từ", phonetic: "/dɪˈskriːt/", vi: "rời rạc, riêng biệt", example: "The data is divided into five completely discrete categories.", bucket: 1 },
      { word: "akin", type: "Tính từ", phonetic: "/əˈkɪn/", vi: "hơi giống, na ná", example: "Their language is very akin to Spanish.", bucket: 0 },
      { word: "analogous", type: "Tính từ", phonetic: "/əˈnæl.ə.ɡəs/", vi: "tương tự, có thể so sánh", example: "The human brain is often considered analogous to a computer.", bucket: 0 },
      { word: "contradictory", type: "Tính từ", phonetic: "/ˌkɒn.trəˈdɪk.tər.i/", vi: "mâu thuẫn", example: "The two witnesses gave entirely contradictory statements.", bucket: 1 },
      { word: "diverge", type: "Động từ", phonetic: "/daɪˈvɜːdʒ/", vi: "phân kỳ, rẽ sang hướng khác", example: "Their opinions began to deeply diverge over time.", bucket: 1 },
      { word: "compatible", type: "Tính từ", phonetic: "/kəmˈpæt.ə.bəl/", vi: "tương thích, hòa hợp", example: "Are their personalities actually compatible for marriage?", bucket: 0 }
    ]
  },
  {
    unitNum: 72, title: "Unit 72: Difficulties, dilemmas and hitches", description: "Trục trặc kỹ thuật, những thử thách vất vả và tình thế tiến thoái lưỡng nan.", buckets: ["Obstacles (Trở ngại)", "Dilemmas (Tình thế khó)"],
    words: [
      { word: "glitch", type: "Danh từ", phonetic: "/ɡlɪtʃ/", vi: "lỗi kỹ thuật nhỏ (phần mềm)", example: "The website crashed due to a temporary computer glitch.", bucket: 0 },
      { word: "gruelling", type: "Tính từ", phonetic: "/ˈɡruː.ə.lɪŋ/", vi: "vắt kiệt sức lực, mệt mỏi rã rời", example: "He collapsed after a highly gruelling marathon.", bucket: 0 },
      { word: "in a fix", type: "Thành ngữ", phonetic: "/ɪn ə fɪks/", vi: "lâm vào tình thế bế tắc/khó khăn", example: "I've lost my passport and I'm really in a fix now.", bucket: 1 },
      { word: "dilemma", type: "Danh từ", phonetic: "/daɪˈlem.ə/", vi: "tiến thoái lưỡng nan", example: "The doctor faced a terrible ethical dilemma.", bucket: 1 },
      { word: "hitch", type: "Danh từ", phonetic: "/hɪtʃ/", vi: "sự trì hoãn, trục trặc nhỏ (kế hoạch)", example: "The ceremony went perfectly, without a single hitch.", bucket: 0 },
      { word: "obstacle", type: "Danh từ", phonetic: "/ˈɒb.stə.kəl/", vi: "chướng ngại vật", example: "Lack of funding is the main obstacle to the project.", bucket: 0 },
      { word: "ordeal", type: "Danh từ", phonetic: "/ɔːˈdɪəl/", vi: "thử thách khắc nghiệt, cơn ác mộng", example: "Being kidnapped was a terrifying ordeal for the family.", bucket: 1 },
      { word: "predicament", type: "Danh từ", phonetic: "/prɪˈdɪk.ə.mənt/", vi: "tình trạng khó xử, rắc rối", example: "I am in a terrible predicament because I owe money to the mafia.", bucket: 1 }
    ]
  },
  {
    unitNum: 73, title: "Unit 73: Modality: expressing facts, opinions, desires", description: "Đánh giá xác suất, tính thiết thực và tính bắt buộc.", buckets: ["Facts/Probability (Xác suất)", "Desires/Duties (Bắt buộc)"],
    words: [
      { word: "the odds are", type: "Thành ngữ", phonetic: "/ði ɒdz ɑːr/", vi: "khả năng cao là (xác suất là)", example: "The odds are that he won't come to the party.", bucket: 0 },
      { word: "expedient", type: "Tính từ", phonetic: "/ɪkˈspiː.di.ənt/", vi: "thiết thực, có lợi (dù có thể không đúng đạo lý)", example: "The government took the politically expedient decision to cut taxes.", bucket: 0 },
      { word: "compulsory", type: "Tính từ", phonetic: "/kəmˈpʌl.sər.i/", vi: "bắt buộc", example: "Math and English are completely compulsory subjects in school.", bucket: 1 },
      { word: "inevitable", type: "Tính từ", phonetic: "/ɪˈnev.ɪ.tə.bəl/", vi: "chắc chắn xảy ra, không thể tránh khỏi", example: "With such bad management, bankruptcy is absolutely inevitable.", bucket: 0 },
      { word: "mandatory", type: "Tính từ", phonetic: "/ˈmæn.də.tər.i/", vi: "bắt buộc (bằng pháp luật)", example: "Wearing a helmet is strictly mandatory for motorcyclists.", bucket: 1 },
      { word: "desirable", type: "Tính từ", phonetic: "/dɪˈzaɪə.rə.bəl/", vi: "đáng khát khao, mong muốn", example: "Previous teaching experience is highly desirable for this job.", bucket: 1 },
      { word: "feasible", type: "Tính từ", phonetic: "/ˈfiː.zə.bəl/", vi: "khả thi", example: "Building a bridge there is simply not economically feasible.", bucket: 0 },
      { word: "imperative", type: "Tính từ", phonetic: "/ɪmˈper.ə.tɪv/", vi: "cực kỳ khẩn cấp, cấp bách", example: "It is absolutely imperative that we act immediately.", bucket: 1 }
    ]
  },
  {
    unitNum: 74, title: "Unit 74: Number: statistics and assessing quantity", description: "Từ vựng về đo lường IQ, thống kê tổng hợp và làm tròn số.", buckets: ["Statistics (Thống kê)", "Quantity (Định lượng)"],
    words: [
      { word: "IQ", type: "Cụm viết tắt", phonetic: "/ˌaɪˈkjuː/", vi: "chỉ số thông minh", example: "He is a genius with an incredibly high IQ.", bucket: 0 },
      { word: "aggregate", type: "Danh từ", phonetic: "/ˈæɡ.rɪ.ɡət/", vi: "tổng số, gộp lại", example: "The team won by an aggregate score of 5-2.", bucket: 0 },
      { word: "round down", type: "Cụm động từ", phonetic: "/raʊnd daʊn/", vi: "làm tròn xuống (số thập phân)", example: "The price is $9.95, but they will round down to $9.", bucket: 1 },
      { word: "fraction", type: "Danh từ", phonetic: "/ˈfræk.ʃən/", vi: "phần nhỏ, phân số", example: "They bought the house for a fraction of its true value.", bucket: 1 },
      { word: "ratio", type: "Danh từ", phonetic: "/ˈreɪ.ʃi.əʊ/", vi: "tỉ lệ (toán học)", example: "The student-to-teacher ratio in this school is very high.", bucket: 0 },
      { word: "approximate", type: "Tính từ", phonetic: "/əˈprɒk.sɪ.mət/", vi: "xấp xỉ", example: "Can you give me an approximate cost for the repair?", bucket: 1 },
      { word: "tally", type: "Danh từ", phonetic: "/ˈtæl.i/", vi: "số liệu đếm, kiểm đếm", example: "Keep a daily tally of your expenses.", bucket: 1 },
      { word: "exponential", type: "Tính từ", phonetic: "/ˌek.spəˈnen.ʃəl/", vi: "tăng theo cấp số nhân", example: "There has been an exponential increase in internet users.", bucket: 0 }
    ]
  },
  {
    unitNum: 75, title: "Unit 75: Permission and prohibition", description: "Từ vựng về việc ưng thuận, quyền phủ quyết và đặt ra ngoài vòng pháp luật.", buckets: ["Permission (Cho phép)", "Prohibition (Cấm đoán)"],
    words: [
      { word: "acquiesce", type: "Động từ", phonetic: "/ˌæk.wiˈes/", vi: "bằng lòng, ưng thuận (dù miễn cưỡng)", example: "Despite her doubts, she finally decided to acquiesce to the plan.", bucket: 0 },
      { word: "veto", type: "Động từ", phonetic: "/ˈviː.təʊ/", vi: "phủ quyết (bác bỏ đạo luật)", example: "The President has the power to veto any bill.", bucket: 1 },
      { word: "outlaw", type: "Động từ", phonetic: "/ˈaʊt.lɔː/", vi: "bất hợp pháp hóa, cấm", example: "The new government decided to outlaw smoking in public places.", bucket: 1 },
      { word: "authorize", type: "Động từ", phonetic: "/ˈɔː.θər.aɪz/", vi: "ủy quyền, cấp phép", example: "I did not authorize this transaction on my credit card.", bucket: 0 },
      { word: "consent", type: "Danh từ", phonetic: "/kənˈsent/", vi: "sự đồng ý, bằng lòng", example: "You cannot operate on the patient without their full consent.", bucket: 0 },
      { word: "ban", type: "Động từ", phonetic: "/bæn/", vi: "cấm đoán", example: "The athlete was completely banned from the sport for doping.", bucket: 1 },
      { word: "censor", type: "Động từ", phonetic: "/ˈsen.sər/", vi: "kiểm duyệt (cắt bỏ nội dung)", example: "The movie was heavily censored before being broadcast.", bucket: 1 },
      { word: "permit", type: "Danh từ", phonetic: "/ˈpɜː.mɪt/", vi: "giấy phép", example: "You need a special permit to park your car here.", bucket: 0 }
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

const fileContent = "// File: src/data/oxfordAdvancedData51_75.js\n// Auto-generated Phase 3 Advanced Units (51-75)\n\n" +
  "export const courseData51_75 = " + JSON.stringify(courseData, null, 2) + ";\n";

fs.writeFileSync('src/data/oxfordAdvancedData51_75.js', fileContent);
console.log("Successfully generated oxfordAdvancedData51_75.js");
