import fs from 'fs';

const rawUnits = [
  {
    unitNum: 1, title: "Unit 1: Academic English", description: "Làm chủ từ vựng học thuật và viết báo cáo khoa học.", buckets: ["Research (Nghiên cứu)", "Analysis (Phân tích)"],
    words: [
      { word: "conduct research", type: "Cụm từ", phonetic: "/kənˈdʌkt rɪˈsɜːrtʃ/", vi: "tiến hành nghiên cứu khoa học", example: "The scientists will conduct research on renewable energy.", bucket: 0 },
      { word: "provide evidence", type: "Cụm từ", phonetic: "/prəˈvaɪd ˈev.ə.dəns/", vi: "cung cấp bằng chứng thực nghiệm", example: "You must provide evidence to support your thesis.", bucket: 0 },
      { word: "hypothesize", type: "Động từ", phonetic: "/haɪˈpɑː.θə.saɪz/", vi: "đưa ra giả thuyết", example: "Researchers hypothesize that the climate will change.", bucket: 0 },
      { word: "empirical", type: "Tính từ", phonetic: "/ɪmˈpɪr.ɪ.kəl/", vi: "dựa trên thực nghiệm", example: "We need empirical data to prove the theory.", bucket: 0 },
      { word: "analytical", type: "Tính từ", phonetic: "/ˌæn.əˈlɪt.ɪ.kəl/", vi: "có tính phân tích", example: "She has a highly analytical mind.", bucket: 1 },
      { word: "synthesize", type: "Động từ", phonetic: "/ˈsɪn.θə.saɪz/", vi: "tổng hợp thông tin", example: "The report attempts to synthesize various studies.", bucket: 1 },
      { word: "methodology", type: "Danh từ", phonetic: "/ˌmeθ.əˈdɒl.ə.dʒi/", vi: "phương pháp luận", example: "The methodology of this research is flawed.", bucket: 1 },
      { word: "paradigm", type: "Danh từ", phonetic: "/ˈpær.ə.daɪm/", vi: "mô hình, hệ chuẩn", example: "This discovery represents a new paradigm in physics.", bucket: 1 }
    ]
  },
  {
    unitNum: 2, title: "Unit 2: Idioms & Metaphors", description: "Thành ngữ và ẩn dụ để giao tiếp tự nhiên như người bản xứ.", buckets: ["Success (Thành công)", "Secrets (Bí mật)"],
    words: [
      { word: "a piece of cake", type: "Thành ngữ", phonetic: "/piːs əv keɪk/", vi: "dễ như ăn bánh", example: "The math test was a piece of cake.", bucket: 0 },
      { word: "break a leg", type: "Thành ngữ", phonetic: "/breɪk ə leɡ/", vi: "chúc may mắn", example: "You're going on stage now? Break a leg!", bucket: 0 },
      { word: "spill the beans", type: "Thành ngữ", phonetic: "/spɪl ðə biːnz/", vi: "tiết lộ bí mật", example: "Who spilled the beans about the surprise party?", bucket: 1 },
      { word: "let the cat out of the bag", type: "Thành ngữ", phonetic: "/let ðə kæt aʊt əv ðə bæɡ/", vi: "vô tình lộ bí mật", example: "I accidentally let the cat out of the bag.", bucket: 1 },
      { word: "hit the nail on the head", type: "Thành ngữ", phonetic: "/hɪt ðə neɪl ɒn ðə hed/", vi: "nói trúng phóc", example: "You hit the nail on the head with that answer.", bucket: 0 },
      { word: "under the weather", type: "Thành ngữ", phonetic: "/ˈʌn.dər ðə ˈweð.ər/", vi: "cảm thấy mệt mỏi, ốm", example: "I'm feeling a bit under the weather today.", bucket: 1 },
      { word: "bite the bullet", type: "Thành ngữ", phonetic: "/baɪt ðə ˈbʊl.ɪt/", vi: "cắn răng chịu đựng", example: "I have to bite the bullet and go to the dentist.", bucket: 0 },
      { word: "cost an arm and a leg", type: "Thành ngữ", phonetic: "/kɒst ən ɑːm ænd ə leɡ/", vi: "vô cùng đắt đỏ", example: "This designer bag cost an arm and a leg.", bucket: 1 }
    ]
  },
  {
    unitNum: 3, title: "Unit 3: Corporate and Business Jargon", description: "Từ vựng chuyên nghiệp trong môi trường doanh nghiệp quốc tế.", buckets: ["Operations (Vận hành)", "Strategy (Chiến lược)"],
    words: [
      { word: "streamline", type: "Động từ", phonetic: "/ˈstriːm.laɪn/", vi: "tinh giản, tối ưu hóa", example: "We need to streamline our production process.", bucket: 0 },
      { word: "synergy", type: "Danh từ", phonetic: "/ˈsɪn.ə.dʒi/", vi: "sự hiệp lực", example: "The synergy between the two teams was amazing.", bucket: 1 },
      { word: "leverage", type: "Động từ", phonetic: "/ˈliː.vər.ɪdʒ/", vi: "tận dụng tối đa", example: "We must leverage our resources to win the market.", bucket: 1 },
      { word: "paradigm shift", type: "Cụm danh từ", phonetic: "/ˈpær.ə.daɪm ʃɪft/", vi: "sự thay đổi mô hình đột phá", example: "The internet caused a paradigm shift in business.", bucket: 1 },
      { word: "core competency", type: "Cụm danh từ", phonetic: "/kɔːr ˈkɒm.pɪ.tən.si/", vi: "năng lực cốt lõi", example: "Our core competency is excellent customer service.", bucket: 0 },
      { word: "scalable", type: "Tính từ", phonetic: "/ˈskeɪ.lə.bəl/", vi: "có khả năng mở rộng", example: "We need a scalable business model.", bucket: 0 },
      { word: "return on investment", type: "Cụm từ", phonetic: "/rɪˈtɜːn ɒn ɪnˈvest.mənt/", vi: "tỉ suất hoàn vốn (ROI)", example: "The return on investment for this project is high.", bucket: 1 },
      { word: "stakeholder", type: "Danh từ", phonetic: "/ˈsteɪkˌhəʊl.dər/", vi: "bên liên quan, cổ đông", example: "All stakeholders must agree to the new terms.", bucket: 0 }
    ]
  },
  {
    unitNum: 4, title: "Unit 4: Global Issues and Environment", description: "Thảo luận về các vấn đề toàn cầu, biến đổi khí hậu và môi trường.", buckets: ["Environment (Môi trường)", "Global Crisis (Khủng hoảng)"],
    words: [
      { word: "climate change", type: "Cụm danh từ", phonetic: "/ˈklaɪ.mət tʃeɪndʒ/", vi: "biến đổi khí hậu", example: "Climate change is the biggest threat to our planet.", bucket: 0 },
      { word: "sustainable development", type: "Cụm danh từ", phonetic: "/səˈsteɪ.nə.bəl dɪˈvel.əp.mənt/", vi: "phát triển bền vững", example: "Sustainable development ensures resources for the future.", bucket: 0 },
      { word: "biodiversity", type: "Danh từ", phonetic: "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/", vi: "sự đa dạng sinh học", example: "The Amazon is famous for its rich biodiversity.", bucket: 0 },
      { word: "carbon footprint", type: "Cụm danh từ", phonetic: "/ˈkɑː.bən ˈfʊt.prɪnt/", vi: "lượng khí thải carbon", example: "We need to reduce our carbon footprint.", bucket: 0 },
      { word: "globalization", type: "Danh từ", phonetic: "/ˌɡləʊ.bəl.aɪˈzeɪ.ʃən/", vi: "toàn cầu hóa", example: "Globalization has connected economies worldwide.", bucket: 1 },
      { word: "human rights", type: "Cụm danh từ", phonetic: "/ˈhjuː.mən raɪts/", vi: "nhân quyền", example: "The organization fights for basic human rights.", bucket: 1 },
      { word: "poverty eradication", type: "Cụm danh từ", phonetic: "/ˈpɒv.ə.ti ɪˌræd.ɪˈkeɪ.ʃən/", vi: "xóa đói giảm nghèo", example: "Poverty eradication is a major goal for the UN.", bucket: 1 },
      { word: "humanitarian crisis", type: "Cụm danh từ", phonetic: "/hjuːˌmæn.ɪˈteə.ri.ən ˈkraɪ.sɪs/", vi: "khủng hoảng nhân đạo", example: "The war has caused a severe humanitarian crisis.", bucket: 1 }
    ]
  },
  {
    unitNum: 5, title: "Unit 5: Media and Communication", description: "Từ vựng về truyền thông đại chúng, báo chí và mạng xã hội.", buckets: ["Media (Truyền thông)", "Communication (Giao tiếp)"],
    words: [
      { word: "mass media", type: "Cụm danh từ", phonetic: "/mæs ˈmiː.di.ə/", vi: "truyền thông đại chúng", example: "Mass media has a huge influence on public opinion.", bucket: 0 },
      { word: "censorship", type: "Danh từ", phonetic: "/ˈsen.sə.ʃɪp/", vi: "sự kiểm duyệt", example: "Strict censorship laws limit freedom of speech.", bucket: 0 },
      { word: "biased", type: "Tính từ", phonetic: "/ˈbaɪ.əst/", vi: "thiên vị, thành kiến", example: "The news report was highly biased.", bucket: 0 },
      { word: "propaganda", type: "Danh từ", phonetic: "/ˌprɒp.əˈɡæn.də/", vi: "tuyên truyền (chính trị)", example: "The government used propaganda to control the masses.", bucket: 0 },
      { word: "viral", type: "Tính từ", phonetic: "/ˈvaɪ.rəl/", vi: "lan truyền nhanh chóng", example: "The funny video went viral on the internet.", bucket: 1 },
      { word: "misinformation", type: "Danh từ", phonetic: "/ˌmɪs.ɪn.fəˈmeɪ.ʃən/", vi: "thông tin sai lệch", example: "Social media is often criticized for spreading misinformation.", bucket: 1 },
      { word: "clickbait", type: "Danh từ", phonetic: "/ˈklɪk.beɪt/", vi: "mồi nhấp chuột (tiêu đề giật tít)", example: "I ignore articles with clickbait titles.", bucket: 1 },
      { word: "broadcaster", type: "Danh từ", phonetic: "/ˈbrɔːdˌkɑː.stər/", vi: "phát thanh viên, đài truyền hình", example: "He is a famous sports broadcaster.", bucket: 1 }
    ]
  },
  {
    unitNum: 6, title: "Unit 6: Technology and Innovation", description: "Trí tuệ nhân tạo, công nghệ đột phá và tương lai kỹ thuật số.", buckets: ["Innovation (Đột phá)", "Technology (Công nghệ)"],
    words: [
      { word: "artificial intelligence", type: "Cụm danh từ", phonetic: "/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/", vi: "trí tuệ nhân tạo (AI)", example: "Artificial intelligence is revolutionizing the tech industry.", bucket: 1 },
      { word: "breakthrough", type: "Danh từ", phonetic: "/ˈbreɪk.θruː/", vi: "bước đột phá", example: "The new medicine is a major breakthrough.", bucket: 0 },
      { word: "obsolete", type: "Tính từ", phonetic: "/ˈɒb.səl.iːt/", vi: "lỗi thời, không còn dùng", example: "Typewriters are now completely obsolete.", bucket: 1 },
      { word: "cutting-edge", type: "Tính từ", phonetic: "/ˌkʌt.ɪŋ ˈedʒ/", vi: "tiên tiến nhất, hiện đại nhất", example: "They use cutting-edge technology to build this car.", bucket: 0 },
      { word: "automation", type: "Danh từ", phonetic: "/ˌɔː.təˈmeɪ.ʃən/", vi: "sự tự động hóa", example: "Automation will replace many manual jobs.", bucket: 0 },
      { word: "cybersecurity", type: "Danh từ", phonetic: "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/", vi: "an ninh mạng", example: "Cybersecurity is crucial for online banking.", bucket: 1 },
      { word: "innovate", type: "Động từ", phonetic: "/ˈɪn.ə.veɪt/", vi: "đổi mới, sáng tạo", example: "Companies must innovate to survive in the market.", bucket: 0 },
      { word: "algorithm", type: "Danh từ", phonetic: "/ˈæl.ɡə.rɪ.ðəm/", vi: "thuật toán", example: "The social media algorithm shows you targeted ads.", bucket: 1 }
    ]
  },
  {
    unitNum: 7, title: "Unit 7: Law and Crime", description: "Từ vựng chuyên ngành luật pháp, tội phạm và công lý.", buckets: ["Legal System (Hệ thống Luật)", "Crime (Tội phạm)"],
    words: [
      { word: "legislation", type: "Danh từ", phonetic: "/ˌledʒ.ɪˈsleɪ.ʃən/", vi: "pháp luật, sự lập pháp", example: "The government passed new environmental legislation.", bucket: 0 },
      { word: "defendant", type: "Danh từ", phonetic: "/dɪˈfen.dənt/", vi: "bị cáo (trong tòa án)", example: "The defendant pleaded not guilty.", bucket: 0 },
      { word: "prosecutor", type: "Danh từ", phonetic: "/ˈprɒs.ɪ.kjuː.tər/", vi: "công tố viên, người khởi tố", example: "The prosecutor presented strong evidence.", bucket: 0 },
      { word: "verdict", type: "Danh từ", phonetic: "/ˈvɜː.dɪkt/", vi: "phán quyết của bồi thẩm đoàn", example: "The jury reached a verdict of guilty.", bucket: 0 },
      { word: "commit a crime", type: "Cụm từ", phonetic: "/kəˈmɪt ə kraɪm/", vi: "phạm tội", example: "He was arrested for committing a serious crime.", bucket: 1 },
      { word: "deterrent", type: "Danh từ", phonetic: "/dɪˈter.ənt/", vi: "sự răn đe, ngăn chặn", example: "Strict laws act as a deterrent to criminals.", bucket: 1 },
      { word: "acquit", type: "Động từ", phonetic: "/əˈkwɪt/", vi: "tuyên trắng án", example: "The judge decided to acquit the suspect due to lack of evidence.", bucket: 1 },
      { word: "sentence", type: "Động từ", phonetic: "/ˈsen.təns/", vi: "kết án", example: "The criminal was sentenced to ten years in prison.", bucket: 1 }
    ]
  },
  {
    unitNum: 8, title: "Unit 8: Health and Medicine", description: "Từ vựng Y khoa nâng cao về triệu chứng, điều trị và phòng bệnh.", buckets: ["Medicine (Y tế)", "Health (Sức khỏe)"],
    words: [
      { word: "diagnosis", type: "Danh từ", phonetic: "/ˌdaɪ.əɡˈnəʊ.sɪs/", vi: "sự chẩn đoán bệnh", example: "The doctor made an accurate diagnosis of the illness.", bucket: 0 },
      { word: "symptom", type: "Danh từ", phonetic: "/ˈsɪmp.təm/", vi: "triệu chứng bệnh", example: "A high fever is a common symptom of the flu.", bucket: 0 },
      { word: "prescription", type: "Danh từ", phonetic: "/prɪˈskrɪp.ʃən/", vi: "đơn thuốc", example: "You need a prescription to buy this antibiotic.", bucket: 0 },
      { word: "epidemic", type: "Danh từ", phonetic: "/ˌep.ɪˈdem.ɪk/", vi: "dịch bệnh", example: "The flu epidemic spread rapidly across the city.", bucket: 0 },
      { word: "vaccination", type: "Danh từ", phonetic: "/ˌvæk.sɪˈneɪ.ʃən/", vi: "sự tiêm chủng", example: "Vaccination is essential to prevent infectious diseases.", bucket: 1 },
      { word: "immune system", type: "Cụm danh từ", phonetic: "/ɪˈmjuːn ˌsɪs.təm/", vi: "hệ miễn dịch", example: "Eating vegetables strengthens your immune system.", bucket: 1 },
      { word: "chronic", type: "Tính từ", phonetic: "/ˈkrɒn.ɪk/", vi: "mãn tính (bệnh)", example: "He suffers from chronic back pain.", bucket: 1 },
      { word: "rehabilitation", type: "Danh từ", phonetic: "/ˌriː.həˌbɪl.ɪˈteɪ.ʃən/", vi: "sự phục hồi chức năng", example: "She is undergoing rehabilitation after her injury.", bucket: 1 }
    ]
  },
  {
    unitNum: 9, title: "Unit 9: Finance and Economics", description: "Kinh tế học vĩ mô, tài chính cá nhân và thị trường chứng khoán.", buckets: ["Finance (Tài chính)", "Economics (Kinh tế)"],
    words: [
      { word: "inflation", type: "Danh từ", phonetic: "/ɪnˈfleɪ.ʃən/", vi: "sự lạm phát", example: "High inflation decreases the purchasing power of money.", bucket: 1 },
      { word: "recession", type: "Danh từ", phonetic: "/rɪˈseʃ.ən/", vi: "sự suy thoái kinh tế", example: "The country is slowly recovering from the economic recession.", bucket: 1 },
      { word: "investment", type: "Danh từ", phonetic: "/ɪnˈvest.mənt/", vi: "sự đầu tư", example: "Buying real estate is a solid long-term investment.", bucket: 0 },
      { word: "bankruptcy", type: "Danh từ", phonetic: "/ˈbæŋ.krəpt.si/", vi: "sự phá sản", example: "The company filed for bankruptcy last year.", bucket: 0 },
      { word: "interest rate", type: "Cụm danh từ", phonetic: "/ˈɪn.trəst reɪt/", vi: "lãi suất", example: "The bank increased its interest rate for loans.", bucket: 0 },
      { word: "asset", type: "Danh từ", phonetic: "/ˈæs.et/", vi: "tài sản", example: "The company's intellectual property is its most valuable asset.", bucket: 0 },
      { word: "liability", type: "Danh từ", phonetic: "/ˌlaɪ.əˈbɪl.ə.ti/", vi: "khoản nợ, trách nhiệm pháp lý", example: "They have a lot of financial liabilities to clear.", bucket: 1 },
      { word: "monopoly", type: "Danh từ", phonetic: "/məˈnɒp.əl.i/", vi: "sự độc quyền", example: "The government passed laws to prevent a corporate monopoly.", bucket: 1 }
    ]
  },
  {
    unitNum: 10, title: "Unit 10: Travel and Tourism", description: "Từ vựng chuyên sâu về du lịch, lưu trú và trải nghiệm văn hóa.", buckets: ["Tourism (Du lịch)", "Experience (Trải nghiệm)"],
    words: [
      { word: "itinerary", type: "Danh từ", phonetic: "/aɪˈtɪn.ər.ər.i/", vi: "lịch trình chuyến đi", example: "Our tour itinerary includes visits to three museums.", bucket: 0 },
      { word: "picturesque", type: "Tính từ", phonetic: "/ˌpɪk.tʃərˈesk/", vi: "đẹp như tranh vẽ", example: "We visited a picturesque village in the mountains.", bucket: 0 },
      { word: "accommodation", type: "Danh từ", phonetic: "/əˌkɒm.əˈdeɪ.ʃən/", vi: "chỗ ở", example: "We booked our accommodation through a travel website.", bucket: 0 },
      { word: "excursion", type: "Danh từ", phonetic: "/ɪkˈskɜː.ʃən/", vi: "chuyến tham quan ngắn", example: "The cruise includes a shore excursion to the island.", bucket: 0 },
      { word: "heritage", type: "Danh từ", phonetic: "/ˈher.ɪ.tɪdʒ/", vi: "di sản văn hóa", example: "Hoi An is recognized as a world heritage site.", bucket: 1 },
      { word: "sustainable tourism", type: "Cụm danh từ", phonetic: "/səˈsteɪ.nə.bəl ˈtʊə.rɪ.zəm/", vi: "du lịch bền vững", example: "Sustainable tourism helps protect local environments.", bucket: 1 },
      { word: "off the beaten track", type: "Thành ngữ", phonetic: "/ɒf ðə ˈbiː.tən træk/", vi: "nơi hẻo lánh, ít người biết", example: "They love exploring places off the beaten track.", bucket: 1 },
      { word: "layover", type: "Danh từ", phonetic: "/ˈleɪˌəʊ.vər/", vi: "thời gian quá cảnh", example: "We had a three-hour layover in Dubai.", bucket: 1 }
    ]
  },
  {
    unitNum: 11, title: "Unit 11: Art and Literature", description: "Từ vựng phê bình nghệ thuật, văn học và sáng tạo.", buckets: ["Art (Nghệ thuật)", "Literature (Văn học)"],
    words: [
      { word: "masterpiece", type: "Danh từ", phonetic: "/ˈmɑː.stə.piːs/", vi: "kiệt tác", example: "The Mona Lisa is considered Leonardo's masterpiece.", bucket: 0 },
      { word: "aesthetics", type: "Danh từ", phonetic: "/esˈθet.ɪks/", vi: "mỹ học, tính thẩm mỹ", example: "The aesthetics of the building are highly modern.", bucket: 0 },
      { word: "protagonist", type: "Danh từ", phonetic: "/prəˈtæɡ.ən.ɪst/", vi: "nhân vật chính", example: "The protagonist of the novel is a brave young girl.", bucket: 1 },
      { word: "genre", type: "Danh từ", phonetic: "/ˈʒɒn.rə/", vi: "thể loại (nhạc, phim, văn học)", example: "Science fiction is my favorite literary genre.", bucket: 1 },
      { word: "metaphor", type: "Danh từ", phonetic: "/ˈmet.ə.fɔːr/", vi: "phép ẩn dụ", example: "The poem uses a powerful metaphor for freedom.", bucket: 1 },
      { word: "abstract", type: "Tính từ", phonetic: "/ˈæb.strækt/", vi: "trừu tượng", example: "Abstract art focuses on colors and shapes, not reality.", bucket: 0 },
      { word: "exhibition", type: "Danh từ", phonetic: "/ˌek.sɪˈbɪʃ.ən/", vi: "cuộc triển lãm", example: "We went to an art exhibition at the local gallery.", bucket: 0 },
      { word: "critique", type: "Danh từ", phonetic: "/krɪˈtiːk/", vi: "bài phê bình", example: "He wrote a harsh critique of the new movie.", bucket: 1 }
    ]
  },
  {
    unitNum: 12, title: "Unit 12: Food and Cuisine", description: "Ẩm thực cao cấp, dinh dưỡng và nghệ thuật nấu ăn.", buckets: ["Cuisine (Ẩm thực)", "Nutrition (Dinh dưỡng)"],
    words: [
      { word: "culinary", type: "Tính từ", phonetic: "/ˈkʌl.ɪ.nər.i/", vi: "thuộc về việc nấu nướng, ẩm thực", example: "She has amazing culinary skills.", bucket: 0 },
      { word: "gourmet", type: "Tính từ", phonetic: "/ˈɡɔː.meɪ/", vi: "chất lượng cao, sành ăn", example: "We had a gourmet dinner at a five-star restaurant.", bucket: 0 },
      { word: "ingredients", type: "Danh từ", phonetic: "/ɪnˈɡriː.di.ənts/", vi: "nguyên liệu nấu ăn", example: "Fresh ingredients are the secret to a good dish.", bucket: 0 },
      { word: "appetite", type: "Danh từ", phonetic: "/ˈæp.ə.taɪt/", vi: "sự thèm ăn, khẩu vị", example: "The long walk gave me a huge appetite.", bucket: 0 },
      { word: "vegetarian", type: "Danh từ", phonetic: "/ˌvedʒ.ɪˈteə.ri.ən/", vi: "người ăn chay", example: "The menu offers many options for vegetarians.", bucket: 1 },
      { word: "preservative", type: "Danh từ", phonetic: "/prɪˈzɜː.və.tɪv/", vi: "chất bảo quản", example: "Organic food contains no artificial preservatives.", bucket: 1 },
      { word: "delicacy", type: "Danh từ", phonetic: "/ˈdel.ɪ.kə.si/", vi: "đặc sản, món ăn tinh tế", example: "Caviar is considered a rare delicacy.", bucket: 1 },
      { word: "nutritious", type: "Tính từ", phonetic: "/njuːˈtrɪʃ.əs/", vi: "bổ dưỡng", example: "A balanced diet must be highly nutritious.", bucket: 1 }
    ]
  },
  {
    unitNum: 13, title: "Unit 13: Relationships and Emotions", description: "Diễn tả cảm xúc phức tạp và các mối quan hệ xã hội.", buckets: ["Emotions (Cảm xúc)", "Relationships (Mối quan hệ)"],
    words: [
      { word: "empathy", type: "Danh từ", phonetic: "/ˈem.pə.θi/", vi: "sự đồng cảm", example: "Empathy allows us to understand other people's feelings.", bucket: 0 },
      { word: "compassion", type: "Danh từ", phonetic: "/kəmˈpæʃ.ən/", vi: "sự thương xót, trắc ẩn", example: "She showed great compassion for the poor.", bucket: 0 },
      { word: "alienation", type: "Danh từ", phonetic: "/ˌeɪ.li.əˈneɪ.ʃən/", vi: "sự xa lánh, ghẻ lạnh", example: "Modern society can cause a sense of alienation.", bucket: 0 },
      { word: "reconcile", type: "Động từ", phonetic: "/ˈrek.ən.saɪl/", vi: "hòa giải, làm lành", example: "The two brothers finally reconciled after years of fighting.", bucket: 1 },
      { word: "acquaintance", type: "Danh từ", phonetic: "/əˈkweɪn.təns/", vi: "người quen (không phải bạn thân)", example: "He is just a business acquaintance of mine.", bucket: 1 },
      { word: "mutual", type: "Tính từ", phonetic: "/ˈmjuː.tʃu.əl/", vi: "lẫn nhau, qua lại", example: "A healthy relationship requires mutual respect.", bucket: 1 },
      { word: "resentment", type: "Danh từ", phonetic: "/rɪˈzent.mənt/", vi: "sự oán giận, bực tức", example: "He felt deep resentment towards his boss.", bucket: 0 },
      { word: "infatuation", type: "Danh từ", phonetic: "/ɪnˌfætʃ.uˈeɪ.ʃən/", vi: "sự say mê mù quáng", example: "It isn't true love, it's just a passing infatuation.", bucket: 1 }
    ]
  },
  {
    unitNum: 14, title: "Unit 14: Sports and Fitness", description: "Từ vựng thể thao chuyên nghiệp và sức khỏe thể chất.", buckets: ["Sports (Thể thao)", "Fitness (Thể chất)"],
    words: [
      { word: "endurance", type: "Danh từ", phonetic: "/ɪnˈdʒʊə.rəns/", vi: "sự bền bỉ, sức chịu đựng", example: "Marathon runners need incredible physical endurance.", bucket: 0 },
      { word: "agility", type: "Danh từ", phonetic: "/əˈdʒɪl.ə.ti/", vi: "sự nhanh nhẹn, linh hoạt", example: "Tennis requires great speed and agility.", bucket: 0 },
      { word: "stamina", type: "Danh từ", phonetic: "/ˈstæm.ɪ.nə/", vi: "thể lực, sức dẻo dai", example: "Swimming builds up your stamina over time.", bucket: 0 },
      { word: "spectator", type: "Danh từ", phonetic: "/spekˈteɪ.tər/", vi: "khán giả (xem thể thao)", example: "The stadium was packed with enthusiastic spectators.", bucket: 1 },
      { word: "tournament", type: "Danh từ", phonetic: "/ˈtʊə.nə.mənt/", vi: "giải đấu", example: "She won the grand slam tennis tournament.", bucket: 1 },
      { word: "concussion", type: "Danh từ", phonetic: "/kənˈkʌʃ.ən/", vi: "sự chấn động não", example: "The boxer suffered a severe concussion.", bucket: 1 },
      { word: "performance-enhancing", type: "Tính từ", phonetic: "/pəˈfɔː.məns ɪnˌhɑːns.ɪŋ/", vi: "tăng cường hiệu suất (thuốc kích thích)", example: "The athlete was banned for using performance-enhancing drugs.", bucket: 1 },
      { word: "amateur", type: "Danh từ", phonetic: "/ˈæm.ə.tər/", vi: "nghiệp dư", example: "He is an amateur golfer, not a professional.", bucket: 0 }
    ]
  },
  {
    unitNum: 15, title: "Unit 15: Science and Space", description: "Từ vựng khám phá vũ trụ, vật lý và các hiện tượng khoa học.", buckets: ["Science (Khoa học)", "Space (Không gian)"],
    words: [
      { word: "astronomy", type: "Danh từ", phonetic: "/əˈstrɒn.ə.mi/", vi: "thiên văn học", example: "Astronomy is the scientific study of stars and planets.", bucket: 0 },
      { word: "gravity", type: "Danh từ", phonetic: "/ˈɡræv.ə.ti/", vi: "trọng lực", example: "Without gravity, we would float into space.", bucket: 0 },
      { word: "galaxy", type: "Danh từ", phonetic: "/ˈɡæl.ək.si/", vi: "thiên hà", example: "The Milky Way is our home galaxy.", bucket: 0 },
      { word: "orbit", type: "Danh từ", phonetic: "/ˈɔː.bɪt/", vi: "quỹ đạo", example: "The Earth revolves in an orbit around the sun.", bucket: 0 },
      { word: "satellite", type: "Danh từ", phonetic: "/ˈsæt.əl.aɪt/", vi: "vệ tinh", example: "The moon is Earth's natural satellite.", bucket: 1 },
      { word: "extraterrestrial", type: "Tính từ", phonetic: "/ˌek.strə.təˈres.tri.əl/", vi: "ngoài hành tinh", example: "Scientists are searching for extraterrestrial life.", bucket: 1 },
      { word: "quantum", type: "Tính từ", phonetic: "/ˈkwɒn.təm/", vi: "lượng tử", example: "Quantum mechanics describes the universe at a microscopic level.", bucket: 1 },
      { word: "vacuum", type: "Danh từ", phonetic: "/ˈvæk.juːm/", vi: "chân không", example: "Sound cannot travel through the vacuum of space.", bucket: 1 }
    ]
  },
  {
    unitNum: 16, title: "Unit 16: History and Archaeology", description: "Lịch sử nhân loại, khai quật khảo cổ và di sản.", buckets: ["History (Lịch sử)", "Archaeology (Khảo cổ)"],
    words: [
      { word: "civilization", type: "Danh từ", phonetic: "/ˌsɪv.əl.aɪˈzeɪ.ʃən/", vi: "nền văn minh", example: "Ancient Egypt was a highly advanced civilization.", bucket: 0 },
      { word: "excavation", type: "Danh từ", phonetic: "/ˌeks.kəˈveɪ.ʃən/", vi: "sự khai quật", example: "The excavation of the tomb took three years.", bucket: 0 },
      { word: "artifact", type: "Danh từ", phonetic: "/ˈɑː.tɪ.fækt/", vi: "đồ tạo tác (đồ cổ)", example: "The museum displays rare Roman artifacts.", bucket: 0 },
      { word: "prehistoric", type: "Tính từ", phonetic: "/ˌpriː.hɪˈstɒr.ɪk/", vi: "thuộc thời tiền sử", example: "Dinosaurs lived during the prehistoric era.", bucket: 0 },
      { word: "ancestor", type: "Danh từ", phonetic: "/ˈæn.ses.tər/", vi: "tổ tiên", example: "Our ancestors survived by hunting and gathering.", bucket: 1 },
      { word: "monument", type: "Danh từ", phonetic: "/ˈmɒn.jə.mənt/", vi: "đài kỷ niệm, di tích", example: "The Taj Mahal is a famous historical monument.", bucket: 1 },
      { word: "chronological", type: "Tính từ", phonetic: "/ˌkrɒn.əˈlɒdʒ.ɪ.kəl/", vi: "theo thứ tự thời gian", example: "The events are listed in chronological order.", bucket: 1 },
      { word: "fossil", type: "Danh từ", phonetic: "/ˈfɒs.əl/", vi: "hóa thạch", example: "They found a dinosaur fossil in the desert.", bucket: 1 }
    ]
  },
  {
    unitNum: 17, title: "Unit 17: Architecture and Design", description: "Kiến trúc công trình, quy hoạch đô thị và thẩm mỹ thiết kế.", buckets: ["Architecture (Kiến trúc)", "Design (Thiết kế)"],
    words: [
      { word: "skyscraper", type: "Danh từ", phonetic: "/ˈskaɪˌskreɪ.pər/", vi: "tòa nhà chọc trời", example: "New York is famous for its towering skyscrapers.", bucket: 0 },
      { word: "blueprint", type: "Danh từ", phonetic: "/ˈbluː.prɪnt/", vi: "bản thiết kế (kiến trúc)", example: "The architect presented the blueprint to the client.", bucket: 0 },
      { word: "infrastructure", type: "Danh từ", phonetic: "/ˈɪn.frəˌstrʌk.tʃər/", vi: "cơ sở hạ tầng", example: "The country needs to modernize its infrastructure.", bucket: 0 },
      { word: "minimalist", type: "Tính từ", phonetic: "/ˈmɪn.ɪ.mə.lɪst/", vi: "tối giản", example: "Her apartment has a clean, minimalist design.", bucket: 0 },
      { word: "aesthetic", type: "Tính từ", phonetic: "/esˈθet.ɪk/", vi: "có tính thẩm mỹ", example: "The new bridge is both functional and aesthetic.", bucket: 1 },
      { word: "facade", type: "Danh từ", phonetic: "/fəˈsɑːd/", vi: "mặt tiền (của tòa nhà)", example: "The building has a beautiful glass facade.", bucket: 1 },
      { word: "renovate", type: "Động từ", phonetic: "/ˈren.ə.veɪt/", vi: "cải tạo, nâng cấp", example: "They plan to renovate the old museum.", bucket: 1 },
      { word: "interior", type: "Danh từ", phonetic: "/ɪnˈtɪə.ri.ər/", vi: "nội thất, không gian bên trong", example: "The interior of the church is beautifully decorated.", bucket: 1 }
    ]
  },
  {
    unitNum: 18, title: "Unit 18: Psychology and Mind", description: "Tâm lý học hành vi, nhận thức và tư duy con người.", buckets: ["Mind (Tâm trí)", "Behavior (Hành vi)"],
    words: [
      { word: "cognitive", type: "Tính từ", phonetic: "/ˈkɒɡ.nə.tɪv/", vi: "thuộc về nhận thức", example: "Puzzles can help improve your cognitive skills.", bucket: 0 },
      { word: "subconscious", type: "Danh từ", phonetic: "/ˌsʌbˈkɒn.ʃəs/", vi: "tiềm thức", example: "Dreams are a window into the subconscious.", bucket: 0 },
      { word: "introvert", type: "Danh từ", phonetic: "/ˈɪn.trə.vɜːt/", vi: "người hướng nội", example: "As an introvert, he prefers reading alone to attending parties.", bucket: 0 },
      { word: "extrovert", type: "Danh từ", phonetic: "/ˈek.strə.vɜːt/", vi: "người hướng ngoại", example: "Extroverts gain energy from social interactions.", bucket: 0 },
      { word: "trauma", type: "Danh từ", phonetic: "/ˈtrɔː.mə/", vi: "chấn thương tâm lý", example: "Therapy helps patients deal with childhood trauma.", bucket: 1 },
      { word: "resilience", type: "Danh từ", phonetic: "/rɪˈzɪl.jəns/", vi: "sự kiên cường, khả năng phục hồi", example: "She showed great resilience in overcoming the tragedy.", bucket: 1 },
      { word: "perception", type: "Danh từ", phonetic: "/pəˈsep.ʃən/", vi: "sự nhận thức, góc nhìn", example: "Public perception of the brand has improved.", bucket: 1 },
      { word: "neurotic", type: "Tính từ", phonetic: "/njʊəˈrɒt.ɪk/", vi: "hay lo âu, rối loạn thần kinh", example: "He is highly neurotic and constantly worries about everything.", bucket: 1 }
    ]
  },
  {
    unitNum: 19, title: "Unit 19: Culture and Traditions", description: "Bản sắc văn hóa, tín ngưỡng và sự đa dạng.", buckets: ["Culture (Văn hóa)", "Tradition (Truyền thống)"],
    words: [
      { word: "indigenous", type: "Tính từ", phonetic: "/ɪnˈdɪdʒ.ɪ.nəs/", vi: "bản địa", example: "The indigenous people have lived here for centuries.", bucket: 0 },
      { word: "heritage", type: "Danh từ", phonetic: "/ˈher.ɪ.tɪdʒ/", vi: "di sản", example: "Traditional music is an important part of our cultural heritage.", bucket: 0 },
      { word: "assimilation", type: "Danh từ", phonetic: "/əˌsɪm.ɪˈleɪ.ʃən/", vi: "sự đồng hóa", example: "Cultural assimilation occurs when immigrants adopt local customs.", bucket: 0 },
      { word: "stereotype", type: "Danh từ", phonetic: "/ˈster.i.ə.taɪp/", vi: "khuôn mẫu, định kiến", example: "We must challenge the stereotype that women are bad at math.", bucket: 0 },
      { word: "ritual", type: "Danh từ", phonetic: "/ˈrɪtʃ.u.əl/", vi: "nghi lễ", example: "The tribe performed a rain dance as a sacred ritual.", bucket: 1 },
      { word: "diversity", type: "Danh từ", phonetic: "/daɪˈvɜː.sə.ti/", vi: "sự đa dạng", example: "New York is known for its cultural diversity.", bucket: 1 },
      { word: "etiquette", type: "Danh từ", phonetic: "/ˈet.ɪ.ket/", vi: "phép lịch sự, nghi thức", example: "Business etiquette dictates that you shake hands firmly.", bucket: 1 },
      { word: "folklore", type: "Danh từ", phonetic: "/ˈfəʊk.lɔːr/", vi: "văn học dân gian, truyền thuyết", example: "Vampires are a common theme in European folklore.", bucket: 1 }
    ]
  },
  {
    unitNum: 20, title: "Unit 20: Phrasal Verbs - Up and Down", description: "Cụm động từ nâng cao với giới từ Up và Down.", buckets: ["Up (Hướng lên)", "Down (Hướng xuống)"],
    words: [
      { word: "bring up", type: "Cụm động từ", phonetic: "/brɪŋ ʌp/", vi: "nuôi dưỡng / đề cập đến", example: "Don't bring up the budget issue during the meeting.", bucket: 0 },
      { word: "turn up", type: "Cụm động từ", phonetic: "/tɜːn ʌp/", vi: "xuất hiện bất ngờ", example: "He didn't turn up for the interview.", bucket: 0 },
      { word: "look up to", type: "Cụm động từ", phonetic: "/lʊk ʌp tuː/", vi: "kính trọng, ngưỡng mộ", example: "I have always looked up to my grandfather.", bucket: 0 },
      { word: "make up", type: "Cụm động từ", phonetic: "/meɪk ʌp/", vi: "bịa chuyện / làm hòa", example: "He tried to make up an excuse for being late.", bucket: 0 },
      { word: "turn down", type: "Cụm động từ", phonetic: "/tɜːn daʊn/", vi: "từ chối", example: "They offered him the job, but he turned it down.", bucket: 1 },
      { word: "let down", type: "Cụm động từ", phonetic: "/let daʊn/", vi: "làm thất vọng", example: "I trusted you, please don't let me down.", bucket: 1 },
      { word: "break down", type: "Cụm động từ", phonetic: "/breɪk daʊn/", vi: "hỏng hóc / suy sụp", example: "Her car broke down on the highway.", bucket: 1 },
      { word: "calm down", type: "Cụm động từ", phonetic: "/kɑːm daʊn/", vi: "bình tĩnh lại", example: "Take a deep breath and calm down.", bucket: 1 }
    ]
  },
  {
    unitNum: 21, title: "Unit 21: Phrasal Verbs - In and Out", description: "Cụm động từ nâng cao với giới từ In và Out.", buckets: ["In (Bên trong)", "Out (Bên ngoài)"],
    words: [
      { word: "give in", type: "Cụm động từ", phonetic: "/ɡɪv ɪn/", vi: "đầu hàng, nhượng bộ", example: "The rebels were forced to give in.", bucket: 0 },
      { word: "fill in", type: "Cụm động từ", phonetic: "/fɪl ɪn/", vi: "điền vào / thay thế ai đó", example: "Please fill in this application form.", bucket: 0 },
      { word: "take in", type: "Cụm động từ", phonetic: "/teɪk ɪn/", vi: "lừa gạt / tiếp thu kiến thức", example: "I was completely taken in by his lies.", bucket: 0 },
      { word: "drop in", type: "Cụm động từ", phonetic: "/drɒp ɪn/", vi: "ghé thăm bất chợt", example: "Feel free to drop in whenever you are in town.", bucket: 0 },
      { word: "figure out", type: "Cụm động từ", phonetic: "/ˈfɪɡ.ər aʊt/", vi: "tìm ra giải pháp, hiểu ra", example: "I need to figure out how to fix this bug.", bucket: 1 },
      { word: "stand out", type: "Cụm động từ", phonetic: "/stænd aʊt/", vi: "nổi bật", example: "Her bright red dress made her stand out in the crowd.", bucket: 1 },
      { word: "rule out", type: "Cụm động từ", phonetic: "/ruːl aʊt/", vi: "loại trừ khả năng", example: "The police have ruled out murder.", bucket: 1 },
      { word: "carry out", type: "Cụm động từ", phonetic: "/ˈkær.i aʊt/", vi: "thực hiện (kế hoạch, nghiên cứu)", example: "The scientists will carry out an experiment.", bucket: 1 }
    ]
  },
  {
    unitNum: 22, title: "Unit 22: Collocations with Make and Do", description: "Phân biệt cụm từ đi với Make (tạo ra mới) và Do (thực hiện việc có sẵn).", buckets: ["Make (Tạo ra)", "Do (Thực hiện)"],
    words: [
      { word: "make a decision", type: "Cụm từ", phonetic: "/meɪk ə dɪˈsɪʒ.ən/", vi: "đưa ra quyết định", example: "It is time for the manager to make a decision.", bucket: 0 },
      { word: "make an effort", type: "Cụm từ", phonetic: "/meɪk ən ˈef.ət/", vi: "nỗ lực", example: "You must make an effort to arrive on time.", bucket: 0 },
      { word: "make a mistake", type: "Cụm từ", phonetic: "/meɪk ə mɪˈsteɪk/", vi: "phạm sai lầm", example: "Everyone makes a mistake sometimes.", bucket: 0 },
      { word: "make progress", type: "Cụm từ", phonetic: "/meɪk ˈprəʊ.ɡres/", vi: "tiến bộ", example: "The patient is making good progress.", bucket: 0 },
      { word: "do business", type: "Cụm từ", phonetic: "/duː ˈbɪz.nɪs/", vi: "làm ăn, kinh doanh", example: "It is a pleasure to do business with your company.", bucket: 1 },
      { word: "do someone a favor", type: "Cụm từ", phonetic: "/duː ˈsʌm.wʌn ə ˈfeɪ.vər/", vi: "giúp đỡ ai đó", example: "Could you do me a favor and open the door?", bucket: 1 },
      { word: "do your best", type: "Cụm từ", phonetic: "/duː jɔːr best/", vi: "cố gắng hết sức", example: "Don't worry about winning, just do your best.", bucket: 1 },
      { word: "do research", type: "Cụm từ", phonetic: "/duː rɪˈsɜːtʃ/", vi: "thực hiện nghiên cứu", example: "The students have to do research for their essay.", bucket: 1 }
    ]
  },
  {
    unitNum: 23, title: "Unit 23: Collocations with Get and Take", description: "Các cụm từ cố định sử dụng Get và Take thông dụng nhất.", buckets: ["Get", "Take"],
    words: [
      { word: "get rid of", type: "Cụm động từ", phonetic: "/ɡet rɪd əv/", vi: "loại bỏ, vứt bỏ", example: "We need to get rid of this old furniture.", bucket: 0 },
      { word: "get in touch", type: "Cụm từ", phonetic: "/ɡet ɪn tʌtʃ/", vi: "giữ liên lạc", example: "I will get in touch with you next week.", bucket: 0 },
      { word: "get fired", type: "Cụm từ", phonetic: "/ɡet faɪəd/", vi: "bị đuổi việc", example: "He got fired for stealing from the company.", bucket: 0 },
      { word: "get used to", type: "Cụm từ", phonetic: "/ɡet juːst tuː/", vi: "quen với việc gì", example: "It takes time to get used to the cold weather.", bucket: 0 },
      { word: "take advantage of", type: "Cụm từ", phonetic: "/teɪk ədˈvɑːn.tɪdʒ əv/", vi: "tận dụng, lợi dụng", example: "You should take advantage of this free training.", bucket: 1 },
      { word: "take into account", type: "Cụm từ", phonetic: "/teɪk ˈɪn.tuː əˈkaʊnt/", vi: "xem xét, tính đến", example: "We must take all factors into account.", bucket: 1 },
      { word: "take for granted", type: "Cụm từ", phonetic: "/teɪk fɔːr ˈɡrɑːn.tɪd/", vi: "coi là điều hiển nhiên", example: "Don't take your parents' love for granted.", bucket: 1 },
      { word: "take place", type: "Cụm động từ", phonetic: "/teɪk pleɪs/", vi: "diễn ra, xảy ra", example: "The Olympic Games take place every four years.", bucket: 1 }
    ]
  },
  {
    unitNum: 24, title: "Unit 24: Advanced Adjectives and Adverbs", description: "Sử dụng tính từ và trạng từ nâng cao để miêu tả chính xác.", buckets: ["Adjectives (Tính từ)", "Adverbs (Trạng từ)"],
    words: [
      { word: "meticulous", type: "Tính từ", phonetic: "/məˈtɪk.jə.ləs/", vi: "tỉ mỉ, kỹ càng", example: "She is highly meticulous about her work.", bucket: 0 },
      { word: "inevitable", type: "Tính từ", phonetic: "/ɪˈnev.ɪ.tə.bəl/", vi: "không thể tránh khỏi", example: "Change is an inevitable part of life.", bucket: 0 },
      { word: "ubiquitous", type: "Tính từ", phonetic: "/juːˈbɪk.wɪ.təs/", vi: "có mặt ở khắp nơi", example: "Smartphones have become ubiquitous in modern society.", bucket: 0 },
      { word: "lucrative", type: "Tính từ", phonetic: "/ˈluː.krə.tɪv/", vi: "sinh lời nhiều", example: "He turned his hobby into a lucrative business.", bucket: 0 },
      { word: "reluctantly", type: "Trạng từ", phonetic: "/rɪˈlʌk.tənt.li/", vi: "một cách miễn cưỡng", example: "He reluctantly agreed to help them.", bucket: 1 },
      { word: "undeniably", type: "Trạng từ", phonetic: "/ˌʌn.dɪˈnaɪ.ə.bli/", vi: "không thể chối cãi", example: "She is undeniably the best singer in the group.", bucket: 1 },
      { word: "consequently", type: "Trạng từ", phonetic: "/ˈkɒn.sɪ.kwənt.li/", vi: "hậu quả là, do đó", example: "He failed his exams; consequently, he couldn't graduate.", bucket: 1 },
      { word: "ironically", type: "Trạng từ", phonetic: "/aɪˈrɒn.ɪ.kəl.i/", vi: "trớ trêu thay", example: "Ironically, the fire station burned down.", bucket: 1 }
    ]
  },
  {
    unitNum: 25, title: "Unit 25: Social Issues and Politics", description: "Từ vựng chính trị học và các vấn đề xã hội.", buckets: ["Society (Xã hội)", "Politics (Chính trị)"],
    words: [
      { word: "inequality", type: "Danh từ", phonetic: "/ˌɪn.ɪˈkwɒl.ə.ti/", vi: "sự bất bình đẳng", example: "Social inequality is a major issue in many cities.", bucket: 0 },
      { word: "welfare", type: "Danh từ", phonetic: "/ˈwel.feər/", vi: "phúc lợi xã hội", example: "The state provides welfare for unemployed citizens.", bucket: 0 },
      { word: "segregation", type: "Danh từ", phonetic: "/ˌseɡ.rɪˈɡeɪ.ʃən/", vi: "sự phân biệt đối xử, cách ly", example: "Racial segregation was legally abolished decades ago.", bucket: 0 },
      { word: "marginalize", type: "Động từ", phonetic: "/ˈmɑː.dʒɪ.nəl.aɪz/", vi: "gạt ra ngoài lề xã hội", example: "We must not marginalize minority groups.", bucket: 0 },
      { word: "democracy", type: "Danh từ", phonetic: "/dɪˈmɒk.rə.si/", vi: "nền dân chủ", example: "In a democracy, citizens have the right to vote.", bucket: 1 },
      { word: "campaign", type: "Danh từ", phonetic: "/kæmˈpeɪn/", vi: "chiến dịch (chính trị/quân sự)", example: "The presidential campaign was long and expensive.", bucket: 1 },
      { word: "corruption", type: "Danh từ", phonetic: "/kəˈrʌp.ʃən/", vi: "sự tham nhũng", example: "Political corruption destroys public trust.", bucket: 1 },
      { word: "bipartisan", type: "Tính từ", phonetic: "/ˌbaɪˈpɑː.tɪ.zæn/", vi: "lưỡng đảng (được cả hai phe ủng hộ)", example: "The new law received strong bipartisan support.", bucket: 1 }
    ]
  }
];

// Generator logic...
const courseData = rawUnits.map(unit => {
  const words = unit.words;

  // 1. Core Vocab
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

  // 2. Practical Usage
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

  // 3. Discovery Corner
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

  // 4. Textbook Exercises (5 Exercises)
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

  // 5. Build full unit
  return {
    id: `adv_${unit.unitNum}`,
    title: unit.title,
    description: unit.description,
    theory: {
      coreVocab,
      practicalUsage,
      discoveryCorner
    },
    textbookExercises,
    dragDrop: {
      buckets: unit.buckets,
      items: words.slice(0, 4).map((w, i) => ({
        id: `i${i+1}`,
        word: w.word,
        target: unit.buckets[w.bucket],
        vi: w.vi
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
      {
        q: `${words[2].vi}: ${words[2].word.charAt(0)}...`,
        hint: words[2].word.split('').join(' '),
        a: words[2].word
      },
      {
        q: `${words[3].vi}: ${words[3].word.charAt(0)}...`,
        hint: words[3].word.split('').join(' '),
        a: words[3].word
      }
    ],
    speaking: [
      {
        text: words[0].example,
        trans: `[Tạm dịch] Câu ví dụ cho ${words[0].word}`
      }
    ]
  };
});

const fileContent = "// File: src/data/oxfordAdvancedData1_25.js\n// Auto-generated 25 Advanced Units\n\n" +
  "export const courseData1_25 = " + JSON.stringify(courseData, null, 2) + ";\n";

fs.writeFileSync('src/data/oxfordAdvancedData1_25.js', fileContent);
console.log("Successfully generated oxfordAdvancedData1_25.js");
