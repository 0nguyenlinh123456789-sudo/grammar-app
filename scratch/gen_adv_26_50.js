import fs from 'fs';

const rawUnits = [
  {
    unitNum: 26, title: "Unit 26: The plastic arts: reviews and critiques", description: "Từ vựng phê bình hội họa và nghệ thuật tạo hình (plastic arts).", buckets: ["Criticism (Phê bình)", "Art styles (Phong cách)"],
    words: [
      { word: "philistinism", type: "Danh từ", phonetic: "/ˈfɪl.ɪ.stɪ.nɪ.zəm/", vi: "thái độ hờ hững/dốt nát về nghệ thuật", example: "He accused the town council of cultural philistinism.", bucket: 0 },
      { word: "impenetrable", type: "Tính từ", phonetic: "/ɪmˈpen.ɪ.trə.bəl/", vi: "khó hiểu, không thể xuyên thấu", example: "Some abstract paintings are completely impenetrable to me.", bucket: 0 },
      { word: "tongue-in-cheek", type: "Tính từ", phonetic: "/ˌtʌŋ.ɪnˈtʃiːk/", vi: "có tính châm biếm, mỉa mai", example: "The artist made a tongue-in-cheek comment about modern society.", bucket: 1 },
      { word: "transparent", type: "Tính từ", phonetic: "/trænˈspær.ənt/", vi: "trong suốt, dễ hiểu", example: "Her meaning is perfectly transparent in this sculpture.", bucket: 0 },
      { word: "evocative", type: "Tính từ", phonetic: "/ɪˈvɒk.ə.tɪv/", vi: "gợi lên ký ức, cảm xúc mạnh mẽ", example: "The landscape painting is highly evocative of the countryside.", bucket: 1 },
      { word: "highbrow", type: "Tính từ", phonetic: "/ˈhaɪ.braʊ/", vi: "có tính học thuật cao, kén người xem", example: "It was a very highbrow exhibition intended for critics.", bucket: 1 },
      { word: "dazzling", type: "Tính từ", phonetic: "/ˈdæz.lɪŋ/", vi: "sáng chói, lộng lẫy", example: "The use of colors in this mural is simply dazzling.", bucket: 1 },
      { word: "canvas", type: "Danh từ", phonetic: "/ˈkæn.vəs/", vi: "tấm vải bạt (để vẽ tranh)", example: "The painter stared at the blank canvas.", bucket: 0 }
    ]
  },
  {
    unitNum: 27, title: "Unit 27: Talking about books", description: "Các thể loại sách, hồi ký và thói quen đọc sách.", buckets: ["Genres (Thể loại)", "Reading Habits (Thói quen)"],
    words: [
      { word: "chronicle", type: "Danh từ", phonetic: "/ˈkrɒn.ɪ.kəl/", vi: "sử biên niên, ký sự", example: "The book is a fascinating chronicle of the war.", bucket: 0 },
      { word: "memoirs", type: "Danh từ", phonetic: "/ˈmem.wɑːz/", vi: "hồi ký", example: "The former president published his memoirs last year.", bucket: 0 },
      { word: "compulsive reading", type: "Cụm danh từ", phonetic: "/kəmˈpʌl.sɪv ˈriː.dɪŋ/", vi: "cuốn sách quá hay khiến bạn không thể đặt xuống", example: "This thriller novel is truly compulsive reading.", bucket: 1 },
      { word: "anthology", type: "Danh từ", phonetic: "/ænˈθɒl.ə.dʒi/", vi: "tuyển tập (thơ, truyện ngắn)", example: "She edited an anthology of modern poetry.", bucket: 0 },
      { word: "encyclopedia", type: "Danh từ", phonetic: "/ɪnˌsaɪ.kləˈpiː.di.ə/", vi: "bách khoa toàn thư", example: "He learned everything by reading a giant encyclopedia.", bucket: 0 },
      { word: "unputdownable", type: "Tính từ", phonetic: "/ˌʌn.pʊtˈdaʊ.nə.bəl/", vi: "hấp dẫn đến mức không thể bỏ xuống", example: "It's an unputdownable story full of suspense.", bucket: 1 },
      { word: "page-turner", type: "Danh từ", phonetic: "/ˈpeɪdʒˌtɜː.nər/", vi: "cuốn sách rất hấp dẫn", example: "Stephen King's new book is a real page-turner.", bucket: 1 },
      { word: "prologue", type: "Danh từ", phonetic: "/ˈprəʊ.lɒɡ/", vi: "phần mở đầu (của một cuốn sách)", example: "The prologue sets the dark tone for the entire story.", bucket: 0 }
    ]
  },
  {
    unitNum: 28, title: "Unit 28: We are what we eat", description: "Từ vựng về sức khỏe dinh dưỡng và vệ sinh an toàn thực phẩm.", buckets: ["Nutrition (Dinh dưỡng)", "Food quality (Chất lượng)"],
    words: [
      { word: "wholesome", type: "Tính từ", phonetic: "/ˈhəʊl.səm/", vi: "lành mạnh, tốt cho sức khỏe", example: "We try to eat fresh and wholesome food.", bucket: 0 },
      { word: "GM", type: "Danh từ", phonetic: "/ˌdʒiːˈem/", vi: "thực phẩm biến đổi gen (Genetically Modified)", example: "Many people are concerned about the effects of GM crops.", bucket: 1 },
      { word: "unsavoury", type: "Tính từ", phonetic: "/ʌnˈseɪ.vər.i/", vi: "khó chịu, có mùi vị không ngon / đáng ngờ", example: "The meat had an unsavoury smell.", bucket: 1 },
      { word: "additives", type: "Danh từ", phonetic: "/ˈæd.ɪ.tɪvz/", vi: "chất phụ gia", example: "This juice is free from artificial additives.", bucket: 1 },
      { word: "organic", type: "Tính từ", phonetic: "/ɔːˈɡæn.ɪk/", vi: "hữu cơ", example: "Organic farming is better for the environment.", bucket: 0 },
      { word: "vegan", type: "Danh từ", phonetic: "/ˈviː.ɡən/", vi: "người ăn thuần chay", example: "As a vegan, he does not eat dairy or eggs.", bucket: 0 },
      { word: "cholesterol", type: "Danh từ", phonetic: "/kəˈles.tər.ɒl/", vi: "chất béo trong máu", example: "Eating too much saturated fat raises your cholesterol.", bucket: 1 },
      { word: "stale", type: "Tính từ", phonetic: "/steɪl/", vi: "ôi thiu, cũ (bánh mì, thức ăn)", example: "The bread has gone completely stale.", bucket: 1 }
    ]
  },
  {
    unitNum: 29, title: "Unit 29: Dinner's on me: entertaining and eating out", description: "Chiêu đãi khách, thói quen ăn uống và thanh toán hóa đơn.", buckets: ["Eating habits (Thói quen)", "Entertaining (Chiêu đãi)"],
    words: [
      { word: "sweet tooth", type: "Cụm danh từ", phonetic: "/ˈswiːt ˌtuːθ/", vi: "sự thích ăn đồ ngọt", example: "I have a terrible sweet tooth; I can't resist chocolate.", bucket: 0 },
      { word: "calorie-conscious", type: "Tính từ", phonetic: "/ˈkæl.ər.iˌkɒn.ʃəs/", vi: "có ý thức kiểm soát lượng calo", example: "She is very calorie-conscious and always orders a salad.", bucket: 0 },
      { word: "teetotal", type: "Tính từ", phonetic: "/ˌtiːˈtəʊ.təl/", vi: "hoàn toàn không uống rượu", example: "My grandfather has been teetotal his whole life.", bucket: 0 },
      { word: "on me", type: "Thành ngữ", phonetic: "/ɒn miː/", vi: "để tôi trả tiền (bao)", example: "Put your wallet away; dinner is on me tonight.", bucket: 1 },
      { word: "gourmet", type: "Tính từ", phonetic: "/ˈɡʊə.meɪ/", vi: "cao cấp, sành ăn", example: "We went to a fancy gourmet restaurant for our anniversary.", bucket: 1 },
      { word: "portion", type: "Danh từ", phonetic: "/ˈpɔː.ʃən/", vi: "khẩu phần ăn", example: "The restaurant serves huge portions of pasta.", bucket: 1 },
      { word: "appetite", type: "Danh từ", phonetic: "/ˈæp.ə.taɪt/", vi: "sự thèm ăn, cảm giác ngon miệng", example: "The long walk gave me a huge appetite.", bucket: 0 },
      { word: "digest", type: "Động từ", phonetic: "/daɪˈdʒest/", vi: "tiêu hóa", example: "It takes hours to digest a heavy meal.", bucket: 1 }
    ]
  },
  {
    unitNum: 30, title: "Unit 30: On the road: traffic and driving", description: "Vấn đề giao thông, tai nạn và các hành vi lái xe.", buckets: ["Traffic issues (Sự cố)", "Driving (Lái xe)"],
    words: [
      { word: "hit-and-run", type: "Danh từ", phonetic: "/ˌhɪt.əndˈrʌn/", vi: "tai nạn đâm xe rồi bỏ chạy", example: "The police are looking for the driver in a hit-and-run accident.", bucket: 0 },
      { word: "road rage", type: "Cụm danh từ", phonetic: "/ˈrəʊd ˌreɪdʒ/", vi: "cơn thịnh nộ trên đường (của tài xế)", example: "He lost his temper in a terrible incident of road rage.", bucket: 0 },
      { word: "tailback", type: "Danh từ", phonetic: "/ˈteɪl.bæk/", vi: "hàng dài xe cộ ùn tắc", example: "There is a massive tailback on the highway due to a crash.", bucket: 0 },
      { word: "toll", type: "Danh từ", phonetic: "/təʊl/", vi: "phí cầu đường", example: "You have to pay a toll to cross the bridge.", bucket: 1 },
      { word: "pedestrian", type: "Danh từ", phonetic: "/pəˈdes.tri.ən/", vi: "người đi bộ", example: "Drivers must stop for pedestrians at the crossing.", bucket: 1 },
      { word: "junction", type: "Danh từ", phonetic: "/ˈdʒʌŋk.ʃən/", vi: "giao lộ, ngã tư", example: "Turn left at the next major junction.", bucket: 1 },
      { word: "overtake", type: "Động từ", phonetic: "/ˌəʊ.vəˈteɪk/", vi: "vượt qua (xe khác)", example: "It is dangerous to overtake on a sharp curve.", bucket: 1 },
      { word: "commuter", type: "Danh từ", phonetic: "/kəˈmjuː.tər/", vi: "người đi làm xa (bằng xe cộ mỗi ngày)", example: "The train was packed with angry commuters.", bucket: 1 }
    ]
  },
  {
    unitNum: 31, title: "Unit 31: Travel and accommodation", description: "Từ vựng về du lịch, lưu trú và chuyến bay.", buckets: ["Travel types (Kiểu du lịch)", "Accommodation (Lưu trú)"],
    words: [
      { word: "deluxe", type: "Tính từ", phonetic: "/dɪˈlʌks/", vi: "cực kỳ sang trọng (hạng sang)", example: "We booked a deluxe suite at the hotel.", bucket: 1 },
      { word: "charter", type: "Động từ", phonetic: "/ˈtʃɑː.tər/", vi: "thuê trọn gói (máy bay, tàu)", example: "The wealthy businessman decided to charter a private jet.", bucket: 0 },
      { word: "half-board", type: "Danh từ", phonetic: "/ˌhɑːfˈbɔːd/", vi: "dịch vụ thuê phòng kèm 2 bữa ăn", example: "Our hotel package includes half-board.", bucket: 1 },
      { word: "itinerary", type: "Danh từ", phonetic: "/aɪˈtɪn.ər.ər.i/", vi: "lịch trình chuyến đi", example: "Our travel agent gave us a very strict itinerary.", bucket: 0 },
      { word: "layover", type: "Danh từ", phonetic: "/ˈleɪˌəʊ.vər/", vi: "thời gian quá cảnh", example: "We had a three-hour layover in Dubai.", bucket: 0 },
      { word: "suite", type: "Danh từ", phonetic: "/swiːt/", vi: "phòng thượng hạng", example: "The president stayed in the luxury suite.", bucket: 1 },
      { word: "jet lag", type: "Cụm danh từ", phonetic: "/ˈdʒet ˌlæɡ/", vi: "sự mệt mỏi do lệch múi giờ", example: "I am suffering from severe jet lag after the flight.", bucket: 0 },
      { word: "hitchhike", type: "Động từ", phonetic: "/ˈhɪtʃ.haɪk/", vi: "đi nhờ xe", example: "They decided to hitchhike across Europe to save money.", bucket: 0 }
    ]
  },
  {
    unitNum: 32, title: "Unit 32: Tourism", description: "Các hình thức du lịch bảo vệ môi trường và du khách sành sỏi.", buckets: ["Nature (Thiên nhiên)", "Tourists (Du khách)"],
    words: [
      { word: "back to nature", type: "Cụm từ", phonetic: "/ˌbæk tʊ ˈneɪ.tʃər/", vi: "trở về với thiên nhiên", example: "Camping in the forest is a great way to get back to nature.", bucket: 0 },
      { word: "eco-tourism", type: "Danh từ", phonetic: "/ˈiː.kəʊˌtʊə.rɪ.zəm/", vi: "du lịch sinh thái", example: "Costa Rica is famous for its sustainable eco-tourism.", bucket: 0 },
      { word: "discerning", type: "Tính từ", phonetic: "/dɪˈsɜː.nɪŋ/", vi: "sành sỏi, có con mắt tinh đời", example: "This luxury resort attracts the most discerning travelers.", bucket: 1 },
      { word: "unspoilt", type: "Tính từ", phonetic: "/ʌnˈspɔɪlt/", vi: "hoang sơ, chưa bị phá hủy", example: "We visited an island with beautiful, unspoilt beaches.", bucket: 0 },
      { word: "breathtaking", type: "Tính từ", phonetic: "/ˈbreθˌteɪ.kɪŋ/", vi: "đẹp ngoạn mục", example: "The view from the top of the mountain was breathtaking.", bucket: 0 },
      { word: "overcrowded", type: "Tính từ", phonetic: "/ˌəʊ.vəˈkraʊ.dɪd/", vi: "chật ních người", example: "The famous museums were incredibly overcrowded in summer.", bucket: 1 },
      { word: "souvenir", type: "Danh từ", phonetic: "/ˌsuː.vənˈɪər/", vi: "đồ lưu niệm", example: "I bought a small wooden elephant as a souvenir.", bucket: 1 },
      { word: "heritage", type: "Danh từ", phonetic: "/ˈher.ɪ.tɪdʒ/", vi: "di sản", example: "The old castle is recognized as a world heritage site.", bucket: 0 }
    ]
  },
  {
    unitNum: 33, title: "Unit 33: Describing the world", description: "Từ vựng miêu tả địa hình, nông nghiệp và sự di cư.", buckets: ["Geography (Địa lý)", "Migration (Di cư)"],
    words: [
      { word: "paddy field", type: "Cụm danh từ", phonetic: "/ˈpæd.i ˌfiːld/", vi: "cánh đồng lúa nước", example: "Vietnam is famous for its beautiful green paddy fields.", bucket: 0 },
      { word: "prairies", type: "Danh từ", phonetic: "/ˈpreə.riz/", vi: "thảo nguyên, đồng cỏ rộng lớn", example: "Wild buffalo used to roam across the American prairies.", bucket: 0 },
      { word: "migrant", type: "Danh từ", phonetic: "/ˈmaɪ.ɡrənt/", vi: "người di cư (tìm việc/sống)", example: "Millions of economic migrants leave their countries each year.", bucket: 1 },
      { word: "glacier", type: "Danh từ", phonetic: "/ˈɡlæs.i.ər/", vi: "sông băng", example: "The massive glacier is melting due to global warming.", bucket: 0 },
      { word: "peninsula", type: "Danh từ", phonetic: "/pəˈnɪn.sjə.lə/", vi: "bán đảo", example: "Korea is located on a peninsula in East Asia.", bucket: 0 },
      { word: "desertification", type: "Danh từ", phonetic: "/dɪˌzɜː.tɪ.fɪˈkeɪ.ʃən/", vi: "sự sa mạc hóa", example: "Deforestation leads to rapid desertification.", bucket: 0 },
      { word: "settlement", type: "Danh từ", phonetic: "/ˈset.əl.mənt/", vi: "khu định cư", example: "Archeologists found an ancient Viking settlement.", bucket: 1 },
      { word: "indigenous", type: "Tính từ", phonetic: "/ɪnˈdɪdʒ.ɪ.nəs/", vi: "bản địa", example: "The indigenous people of Australia are the Aboriginals.", bucket: 1 }
    ]
  },
  {
    unitNum: 34, title: "Unit 34: Weather and climate", description: "Các trạng thái thời tiết khắc nghiệt và ẩn dụ thời tiết.", buckets: ["Extreme weather (Thời tiết)", "Metaphors (Ẩn dụ)"],
    words: [
      { word: "clammy", type: "Tính từ", phonetic: "/ˈklæm.i/", vi: "lạnh nhơm nhớp, ẩm ướt", example: "His hands were cold and clammy with fear.", bucket: 0 },
      { word: "sweltering", type: "Tính từ", phonetic: "/ˈswel.tər.ɪŋ/", vi: "nóng bức ngột ngạt", example: "I cannot sleep in this sweltering summer heat.", bucket: 0 },
      { word: "snowed under", type: "Cụm tính từ", phonetic: "/snəʊd ˈʌn.dər/", vi: "ngập đầu trong công việc (ẩn dụ)", example: "I can't go to the party; I'm completely snowed under with work.", bucket: 1 },
      { word: "blizzard", type: "Danh từ", phonetic: "/ˈblɪz.əd/", vi: "trận bão tuyết", example: "We were trapped in the cabin by a fierce blizzard.", bucket: 0 },
      { word: "drought", type: "Danh từ", phonetic: "/draʊt/", vi: "hạn hán", example: "The severe drought destroyed all the crops.", bucket: 0 },
      { word: "torrential", type: "Tính từ", phonetic: "/təˈren.ʃəl/", vi: "xối xả (mưa)", example: "The match was canceled due to torrential rain.", bucket: 0 },
      { word: "breeze", type: "Danh từ", phonetic: "/briːz/", vi: "làn gió nhẹ", example: "A cool breeze blew across the beach.", bucket: 1 },
      { word: "hail", type: "Danh từ", phonetic: "/heɪl/", vi: "mưa đá", example: "Large hailstones damaged the roof of the car.", bucket: 0 }
    ]
  },
  {
    unitNum: 35, title: "Unit 35: Buildings in metaphors", description: "Sử dụng từ vựng về kiến trúc để diễn tả các hiện tượng trừu tượng.", buckets: ["Architecture (Kiến trúc)", "Metaphor (Ẩn dụ)"],
    words: [
      { word: "glass ceiling", type: "Cụm danh từ", phonetic: "/ˌɡlɑːs ˈsiː.lɪŋ/", vi: "rào cản vô hình (ngăn cản thăng tiến)", example: "She finally broke through the glass ceiling to become CEO.", bucket: 1 },
      { word: "tower of strength", type: "Cụm danh từ", phonetic: "/ˈtaʊər əv streŋθ/", vi: "điểm tựa vững chắc (một người)", example: "During my illness, my husband was an absolute tower of strength.", bucket: 1 },
      { word: "key to success", type: "Cụm danh từ", phonetic: "/kiː tʊ səkˈses/", vi: "chìa khóa tới thành công", example: "Hard work is the key to success in any field.", bucket: 1 },
      { word: "ruins", type: "Danh từ", phonetic: "/ˈruː.ɪnz/", vi: "đống đổ nát (nghĩa đen/bóng)", example: "His reputation was left in ruins after the scandal.", bucket: 1 },
      { word: "foundation", type: "Danh từ", phonetic: "/faʊnˈdeɪ.ʃən/", vi: "nền tảng", example: "Mutual trust is the strong foundation of any relationship.", bucket: 0 },
      { word: "pillar", type: "Danh từ", phonetic: "/ˈpɪl.ər/", vi: "trụ cột (người quan trọng)", example: "He is a respected pillar of the community.", bucket: 0 },
      { word: "bridge the gap", type: "Cụm động từ", phonetic: "/brɪdʒ ðə ɡæp/", vi: "thu hẹp khoảng cách (hiểu lầm, thế hệ)", example: "We must bridge the gap between the rich and the poor.", bucket: 1 },
      { word: "demolish", type: "Động từ", phonetic: "/dɪˈmɒl.ɪʃ/", vi: "đập tan, phá hủy (lập luận, tòa nhà)", example: "The lawyer completely demolished his opponent's argument.", bucket: 0 }
    ]
  },
  {
    unitNum: 36, title: "Unit 36: Trees, plants and metaphors", description: "Nghĩa bóng sâu sắc từ thế giới thực vật.", buckets: ["Plant Life (Thực vật)", "Metaphors (Ẩn dụ)"],
    words: [
      { word: "nip in the bud", type: "Thành ngữ", phonetic: "/nɪp ɪn ðə bʌd/", vi: "dập tắt từ trong trứng nước", example: "We need to nip this problem in the bud before it gets worse.", bucket: 1 },
      { word: "germinate", type: "Động từ", phonetic: "/ˈdʒɜː.mɪ.neɪt/", vi: "nảy mầm (ý tưởng, hạt giống)", example: "The idea for the novel began to germinate in her mind.", bucket: 1 },
      { word: "shrivel", type: "Động từ", phonetic: "/ˈʃrɪv.əl/", vi: "héo mòn, teo tóp (nhuệ khí, cái cây)", example: "His confidence shriveled under the boss's intense criticism.", bucket: 1 },
      { word: "root", type: "Danh từ", phonetic: "/ruːt/", vi: "cội rễ, nguyên nhân sâu xa", example: "Poverty is the root of many social problems.", bucket: 0 },
      { word: "flourish", type: "Động từ", phonetic: "/ˈflʌr.ɪʃ/", vi: "phát triển mạnh mẽ, nở rộ", example: "The economy began to flourish under the new policy.", bucket: 0 },
      { word: "branch out", type: "Cụm động từ", phonetic: "/brɑːntʃ aʊt/", vi: "mở rộng lĩnh vực, rẽ nhánh", example: "The company decided to branch out into software development.", bucket: 1 },
      { word: "wither", type: "Động từ", phonetic: "/ˈwɪð.ər/", vi: "tàn úa, héo hon", example: "Without love, their marriage slowly withered away.", bucket: 0 },
      { word: "uproot", type: "Động từ", phonetic: "/ʌpˈruːt/", vi: "nhổ rễ, trục xuất khỏi quê hương", example: "The war uprooted millions of innocent people.", bucket: 0 }
    ]
  },
  {
    unitNum: 37, title: "Unit 37: Animals and birds", description: "Thuật ngữ sinh học động vật và việc buôn bán động vật.", buckets: ["Biology (Sinh học)", "Wildlife (Hoang dã)"],
    words: [
      { word: "rodent", type: "Danh từ", phonetic: "/ˈrəʊ.dənt/", vi: "loài gặm nhấm", example: "Rats and mice are typical examples of rodents.", bucket: 0 },
      { word: "herbivore", type: "Danh từ", phonetic: "/ˈhɜː.bɪ.vɔːr/", vi: "động vật ăn cỏ", example: "The giraffe is a large, gentle herbivore.", bucket: 0 },
      { word: "fur trade", type: "Cụm danh từ", phonetic: "/ˈfɜː ˌtreɪd/", vi: "ngành buôn bán lông thú", example: "Animal rights activists strongly protest against the fur trade.", bucket: 1 },
      { word: "carnivore", type: "Danh từ", phonetic: "/ˈkɑː.nɪ.vɔːr/", vi: "động vật ăn thịt", example: "Lions and tigers are apex carnivores.", bucket: 0 },
      { word: "omnivore", type: "Danh từ", phonetic: "/ˈɒm.nɪ.vɔːr/", vi: "động vật ăn tạp", example: "Humans and bears are classified as omnivores.", bucket: 0 },
      { word: "predator", type: "Danh từ", phonetic: "/ˈpred.ə.tər/", vi: "thú săn mồi", example: "The lion is a fearsome predator.", bucket: 1 },
      { word: "prey", type: "Danh từ", phonetic: "/preɪ/", vi: "con mồi", example: "The eagle swooped down to catch its prey.", bucket: 1 },
      { word: "poach", type: "Động từ", phonetic: "/pəʊtʃ/", vi: "săn trộm", example: "Elephants are illegally poached for their ivory tusks.", bucket: 1 }
    ]
  },
  {
    unitNum: 38, title: "Unit 38: Environment and conservation", description: "Bảo tồn thiên nhiên, nhiên liệu hóa thạch và động vật nguy cấp.", buckets: ["Conservation (Bảo tồn)", "Threats (Mối đe dọa)"],
    words: [
      { word: "endangered", type: "Tính từ", phonetic: "/ɪnˈdeɪn.dʒəd/", vi: "có nguy cơ tuyệt chủng", example: "The giant panda is a highly endangered species.", bucket: 0 },
      { word: "fossil fuels", type: "Cụm danh từ", phonetic: "/ˈfɒs.əl ˌfjʊəlz/", vi: "nhiên liệu hóa thạch", example: "Burning fossil fuels contributes massively to global warming.", bucket: 1 },
      { word: "pristine", type: "Tính từ", phonetic: "/ˈprɪs.tiːn/", vi: "nguyên sơ, tinh khôi", example: "The island is famous for its beautiful, pristine beaches.", bucket: 0 },
      { word: "habitat", type: "Danh từ", phonetic: "/ˈhæb.ɪ.tæt/", vi: "môi trường sống", example: "Deforestation destroys the natural habitat of many animals.", bucket: 0 },
      { word: "extinction", type: "Danh từ", phonetic: "/ɪkˈstɪŋk.ʃən/", vi: "sự tuyệt chủng", example: "The dodo bird was hunted to extinction.", bucket: 1 },
      { word: "biodiversity", type: "Danh từ", phonetic: "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/", vi: "sự đa dạng sinh học", example: "The Amazon rainforest has incredible biodiversity.", bucket: 0 },
      { word: "renewable", type: "Tính từ", phonetic: "/rɪˈnjuː.ə.bəl/", vi: "có thể tái tạo (năng lượng)", example: "Wind and solar power are forms of renewable energy.", bucket: 0 },
      { word: "emission", type: "Danh từ", phonetic: "/ɪˈmɪʃ.ən/", vi: "sự phát thải (khí thải)", example: "The government has promised to cut carbon emissions.", bucket: 1 }
    ]
  },
  {
    unitNum: 39, title: "Unit 39: Here to help: service encounters", description: "Từ vựng khi đối mặt với dịch vụ khách hàng: giúp đỡ hoặc kém cỏi.", buckets: ["Good service (Dịch vụ tốt)", "Bad service (Dịch vụ tệ)"],
    words: [
      { word: "obliging", type: "Tính từ", phonetic: "/əˈblaɪ.dʒɪŋ/", vi: "sẵn lòng giúp đỡ, ân cần", example: "The hotel staff were highly obliging and friendly.", bucket: 0 },
      { word: "shoddy", type: "Tính từ", phonetic: "/ˈʃɒd.i/", vi: "kém chất lượng, cẩu thả (dịch vụ, hàng hóa)", example: "The plumber did a very shoddy job on the pipes.", bucket: 1 },
      { word: "on hold", type: "Cụm từ", phonetic: "/ɒn həʊld/", vi: "giữ máy (điện thoại), tạm hoãn", example: "I was put on hold for twenty minutes by customer service.", bucket: 1 },
      { word: "prompt", type: "Tính từ", phonetic: "/prɒmpt/", vi: "nhanh chóng, ngay lập tức", example: "Thank you for your prompt reply to my email.", bucket: 0 },
      { word: "incompetent", type: "Tính từ", phonetic: "/ɪnˈkɒm.pɪ.tənt/", vi: "bất tài, thiếu năng lực", example: "The manager was completely incompetent and ruined the project.", bucket: 1 },
      { word: "courteous", type: "Tính từ", phonetic: "/ˈkɜː.ti.əs/", vi: "lịch sự, nhã nhặn", example: "The waiter was polite and courteous throughout the meal.", bucket: 0 },
      { word: "compensation", type: "Danh từ", phonetic: "/ˌkɒm.penˈseɪ.ʃən/", vi: "sự đền bù, bồi thường", example: "I demanded compensation for the canceled flight.", bucket: 1 },
      { word: "substandard", type: "Tính từ", phonetic: "/sʌbˈstæn.dəd/", vi: "dưới tiêu chuẩn", example: "They refused to pay for such substandard work.", bucket: 1 }
    ]
  },
  {
    unitNum: 40, title: "Unit 40: Authorities: customs and police", description: "Cảnh sát, hải quan, tội phạm và tiền phạt.", buckets: ["Law enforcement (Thực thi)", "Penalties (Hình phạt)"],
    words: [
      { word: "sniffer dog", type: "Cụm danh từ", phonetic: "/ˈsnɪf.ə ˌdɒɡ/", vi: "chó nghiệp vụ ngửi mùi", example: "Customs officers used a sniffer dog to find the hidden drugs.", bucket: 0 },
      { word: "on-the-spot fine", type: "Cụm danh từ", phonetic: "/ˌɒn.ðə.spɒt ˈfaɪn/", vi: "sự phạt tiền tại chỗ", example: "Littering will result in a £50 on-the-spot fine.", bucket: 1 },
      { word: "drug squad", type: "Cụm danh từ", phonetic: "/ˈdrʌɡ ˌskwɒd/", vi: "đội cảnh sát phòng chống ma túy", example: "The drug squad raided the abandoned warehouse.", bucket: 0 },
      { word: "smuggle", type: "Động từ", phonetic: "/ˈsmʌɡ.əl/", vi: "buôn lậu", example: "He tried to smuggle gold across the border.", bucket: 0 },
      { word: "confiscate", type: "Động từ", phonetic: "/ˈkɒn.fɪ.skeɪt/", vi: "tịch thu", example: "The teacher confiscated the boy's mobile phone.", bucket: 1 },
      { word: "interrogate", type: "Động từ", phonetic: "/ɪnˈter.ə.ɡeɪt/", vi: "thẩm vấn", example: "The police interrogated the suspect for hours.", bucket: 0 },
      { word: "warrant", type: "Danh từ", phonetic: "/ˈwɒr.ənt/", vi: "lệnh (khám xét/bắt giữ)", example: "The police need a search warrant to enter the house.", bucket: 1 },
      { word: "deport", type: "Động từ", phonetic: "/dɪˈpɔːt/", vi: "trục xuất", example: "The illegal immigrants were deported back to their country.", bucket: 1 }
    ]
  },
  {
    unitNum: 41, title: "Unit 41: World views: ways of thinking", description: "Các hệ tư tưởng, niềm tin, định kiến và giáo điều.", buckets: ["Beliefs (Niềm tin)", "Prejudice (Định kiến)"],
    words: [
      { word: "bigot", type: "Danh từ", phonetic: "/ˈbɪɡ.ət/", vi: "kẻ cuồng tín, kẻ bảo thủ cố chấp", example: "He was exposed as a racist and a bigot.", bucket: 1 },
      { word: "assumption", type: "Danh từ", phonetic: "/əˈsʌmp.ʃən/", vi: "giả định, sự cho là đúng", example: "You are making a huge assumption without any evidence.", bucket: 0 },
      { word: "tenet", type: "Danh từ", phonetic: "/ˈten.ɪt/", vi: "giáo lý, nguyên lý cốt lõi", example: "Non-violence is a central tenet of their religion.", bucket: 0 },
      { word: "ideology", type: "Danh từ", phonetic: "/ˌaɪ.diˈɒl.ə.dʒi/", vi: "hệ tư tưởng", example: "Capitalism and communism are two very different ideologies.", bucket: 0 },
      { word: "cynical", type: "Tính từ", phonetic: "/ˈsɪn.ɪ.kəl/", vi: "hoài nghi (về lòng tốt con người)", example: "She has a deeply cynical view of politics.", bucket: 1 },
      { word: "dogmatic", type: "Tính từ", phonetic: "/dɒɡˈmæt.ɪk/", vi: "giáo điều, độc đoán", example: "He is so dogmatic that he refuses to listen to others.", bucket: 1 },
      { word: "secular", type: "Tính từ", phonetic: "/ˈsek.jə.lər/", vi: "thế tục (không liên quan tôn giáo)", example: "We live in a modern secular society.", bucket: 0 },
      { word: "pragmatic", type: "Tính từ", phonetic: "/præɡˈmæt.ɪk/", vi: "thực dụng, thực tế", example: "We need a pragmatic approach to solve this economic crisis.", bucket: 0 }
    ]
  },
  {
    unitNum: 42, title: "Unit 42: Festivals in their cultural context", description: "Từ vựng về lễ hội, sự đổi mới và kỷ niệm văn hóa.", buckets: ["Celebration (Kỷ niệm)", "Atmosphere (Không khí)"],
    words: [
      { word: "renewal", type: "Danh từ", phonetic: "/rɪˈnjuː.əl/", vi: "sự đổi mới, tái sinh", example: "Spring festivals often symbolize spiritual renewal.", bucket: 0 },
      { word: "commemorate", type: "Động từ", phonetic: "/kəˈmem.ə.reɪt/", vi: "kỷ niệm, tưởng nhớ", example: "A monument was built to commemorate the fallen soldiers.", bucket: 0 },
      { word: "raucous", type: "Tính từ", phonetic: "/ˈrɔː.kəs/", vi: "ồn ào, huyên náo", example: "The party turned into a raucous celebration.", bucket: 1 },
      { word: "ritual", type: "Danh từ", phonetic: "/ˈrɪtʃ.u.əl/", vi: "nghi lễ", example: "Lighting candles is a common religious ritual.", bucket: 0 },
      { word: "pageant", type: "Danh từ", phonetic: "/ˈpædʒ.ənt/", vi: "cuộc thi sắc đẹp, cuộc diễu hành rực rỡ", example: "The town holds an annual historical pageant.", bucket: 1 },
      { word: "festivity", type: "Danh từ", phonetic: "/fesˈtɪv.ə.ti/", vi: "hoạt động lễ hội", example: "The streets were filled with music and festivity.", bucket: 0 },
      { word: "solemn", type: "Tính từ", phonetic: "/ˈsɒl.əm/", vi: "trang nghiêm", example: "The memorial service was a highly solemn occasion.", bucket: 1 },
      { word: "carnival", type: "Danh từ", phonetic: "/ˈkɑː.nɪ.vəl/", vi: "lễ hội hóa trang", example: "Rio de Janeiro hosts the biggest carnival in the world.", bucket: 1 }
    ]
  },
  {
    unitNum: 43, title: "Unit 43: Talking about languages", description: "Ngữ pháp học, nguồn gốc chữ viết và ngữ hệ.", buckets: ["Linguistics (Ngôn ngữ học)", "Origins (Nguồn gốc)"],
    words: [
      { word: "Germanic", type: "Tính từ", phonetic: "/dʒɜːˈmæn.ɪk/", vi: "thuộc ngữ hệ Nhậtĩ-man", example: "English and Dutch are both Germanic languages.", bucket: 1 },
      { word: "syntax", type: "Danh từ", phonetic: "/ˈsɪn.tæks/", vi: "cú pháp", example: "You must learn the syntax of the programming language.", bucket: 0 },
      { word: "pictogram", type: "Danh từ", phonetic: "/ˈpɪk.tə.ɡræm/", vi: "chữ tượng hình", example: "Ancient Egyptians communicated using detailed pictograms.", bucket: 1 },
      { word: "bilingual", type: "Tính từ", phonetic: "/baɪˈlɪŋ.ɡwəl/", vi: "song ngữ", example: "Growing up in Canada, she is perfectly bilingual.", bucket: 0 },
      { word: "dialect", type: "Danh từ", phonetic: "/ˈdaɪ.ə.lekt/", vi: "phương ngôn, tiếng địa phương", example: "The people in this village speak a very strange dialect.", bucket: 0 },
      { word: "semantics", type: "Danh từ", phonetic: "/sɪˈmæn.tɪks/", vi: "ngữ nghĩa học", example: "Philosophers often argue over the semantics of certain words.", bucket: 0 },
      { word: "phonetics", type: "Danh từ", phonetic: "/fəˈnet.ɪks/", vi: "ngữ âm học", example: "Phonetics helps us understand how to pronounce words correctly.", bucket: 0 },
      { word: "slang", type: "Danh từ", phonetic: "/slæŋ/", vi: "từ lóng", example: "Teenagers use a lot of Internet slang.", bucket: 1 }
    ]
  },
  {
    unitNum: 44, title: "Unit 44: History", description: "Vua chúa, nông nô và những biến cố lật đổ quyền lực lịch sử.", buckets: ["Power (Quyền lực)", "Society (Xã hội cổ)"],
    words: [
      { word: "usurp power", type: "Cụm động từ", phonetic: "/juːˈzɜːp ˈpaʊər/", vi: "cướp ngôi, tước đoạt quyền lực", example: "The evil uncle plotted to usurp power from the young king.", bucket: 0 },
      { word: "feudal", type: "Tính từ", phonetic: "/ˈfjuː.dəl/", vi: "thuộc thời phong kiến", example: "The castle is a remnant of the old feudal system.", bucket: 1 },
      { word: "serf", type: "Danh từ", phonetic: "/sɜːf/", vi: "nông nô", example: "In medieval times, the serf worked the land for the lord.", bucket: 1 },
      { word: "monarchy", type: "Danh từ", phonetic: "/ˈmɒn.ə.ki/", vi: "chế độ quân chủ", example: "Britain is a constitutional monarchy.", bucket: 0 },
      { word: "rebellion", type: "Danh từ", phonetic: "/rɪˈbel.i.ən/", vi: "cuộc nổi loạn, khởi nghĩa", example: "The king's army brutally crushed the peasant rebellion.", bucket: 0 },
      { word: "dynasty", type: "Danh từ", phonetic: "/ˈdɪn.ə.sti/", vi: "triều đại", example: "The Ming dynasty ruled China for centuries.", bucket: 0 },
      { word: "tyrant", type: "Danh từ", phonetic: "/ˈtaɪ.rənt/", vi: "bạo chúa", example: "The country was ruled by a ruthless tyrant.", bucket: 1 },
      { word: "assassinate", type: "Động từ", phonetic: "/əˈsæs.ɪ.neɪt/", vi: "ám sát (nhân vật chính trị)", example: "The president was assassinated during a parade.", bucket: 1 }
    ]
  },
  {
    unitNum: 45, title: "Unit 45: Poverty: the haves and the have nots", description: "Khoảng cách giàu nghèo, sự cùng cực và suy dinh dưỡng.", buckets: ["Poverty (Nghèo đói)", "Economy (Kinh tế học)"],
    words: [
      { word: "malnutrition", type: "Danh từ", phonetic: "/ˌmæl.njuːˈtrɪʃ.ən/", vi: "sự suy dinh dưỡng", example: "Thousands of children in the region are dying of malnutrition.", bucket: 0 },
      { word: "GDP", type: "Cụm viết tắt", phonetic: "/ˌdʒiː.diːˈpiː/", vi: "Tổng sản phẩm quốc nội (Gross Domestic Product)", example: "The country's GDP grew by 5% this year.", bucket: 1 },
      { word: "destitute", type: "Tính từ", phonetic: "/ˈdes.tɪ.tʃuːt/", vi: "bần cùng, cơ cực", example: "The floods left thousands of families completely destitute.", bucket: 0 },
      { word: "slum", type: "Danh từ", phonetic: "/slʌm/", vi: "khu ổ chuột", example: "Millions of people live in crowded city slums.", bucket: 0 },
      { word: "affluent", type: "Tính từ", phonetic: "/ˈæf.lu.ənt/", vi: "giàu có, sung túc", example: "They live in an affluent neighborhood with large houses.", bucket: 1 },
      { word: "inequality", type: "Danh từ", phonetic: "/ˌɪn.ɪˈkwɒl.ə.ti/", vi: "sự bất bình đẳng", example: "Social inequality is a major issue in modern capitalism.", bucket: 1 },
      { word: "famine", type: "Danh từ", phonetic: "/ˈfæm.ɪn/", vi: "nạn đói", example: "The severe drought caused a devastating famine.", bucket: 0 },
      { word: "sanitation", type: "Danh từ", phonetic: "/ˌsæn.ɪˈteɪ.ʃən/", vi: "điều kiện vệ sinh, hệ thống xử lý rác", example: "Poor sanitation leads to the spread of diseases.", bucket: 0 }
    ]
  },
  {
    unitNum: 46, title: "Unit 46: British politics", description: "Hệ thống chính trị, vận động hành lang và kiến nghị.", buckets: ["Politics (Chính trị)", "Action (Hành động)"],
    words: [
      { word: "lobbyist", type: "Danh từ", phonetic: "/ˈlɒb.i.ɪst/", vi: "người vận động hành lang", example: "A powerful lobbyist influenced the new environmental law.", bucket: 0 },
      { word: "petition", type: "Danh từ", phonetic: "/pəˈtɪʃ.ən/", vi: "đơn kiến nghị", example: "We signed a petition to save the local hospital.", bucket: 1 },
      { word: "grievance", type: "Danh từ", phonetic: "/ˈɡriː.vəns/", vi: "lời phàn nàn, sự bất bình", example: "The workers filed a formal grievance against the manager.", bucket: 1 },
      { word: "manifesto", type: "Danh từ", phonetic: "/ˌmæn.ɪˈfes.təʊ/", vi: "bản tuyên ngôn chính trị", example: "The party published its election manifesto.", bucket: 0 },
      { word: "ballot", type: "Danh từ", phonetic: "/ˈbæl.ət/", vi: "lá phiếu, sự bỏ phiếu kín", example: "The union members held a secret ballot to decide on the strike.", bucket: 0 },
      { word: "constituency", type: "Danh từ", phonetic: "/kənˈstɪtʃ.u.ən.si/", vi: "khu vực bầu cử", example: "The MP is very popular in her constituency.", bucket: 1 },
      { word: "cabinet", type: "Danh từ", phonetic: "/ˈkæb.ɪ.nət/", vi: "nội các chính phủ", example: "The Prime Minister held a meeting with his cabinet.", bucket: 0 },
      { word: "canvass", type: "Động từ", phonetic: "/ˈkæn.vəs/", vi: "đi vận động tranh cử (gõ cửa từng nhà)", example: "Volunteers canvassed the neighborhood to get votes.", bucket: 1 }
    ]
  },
  {
    unitNum: 47, title: "Unit 47: The language of law", description: "Từ vựng pháp lý, bồi thẩm đoàn và luận tội tham ô.", buckets: ["Crime (Tội phạm)", "Court (Tòa án)"],
    words: [
      { word: "impeach", type: "Động từ", phonetic: "/ɪmˈpiːtʃ/", vi: "luận tội (quan chức cấp cao)", example: "The parliament voted to impeach the corrupt president.", bucket: 1 },
      { word: "embezzle", type: "Động từ", phonetic: "/ɪmˈbez.əl/", vi: "biển thủ, tham ô", example: "The accountant embezzled thousands of dollars from the company.", bucket: 0 },
      { word: "overturn a verdict", type: "Cụm động từ", phonetic: "/ˌəʊ.vəˈtɜːn ə ˈvɜː.dɪkt/", vi: "lật ngược phán quyết", example: "The appeals court decided to overturn the original verdict.", bucket: 1 },
      { word: "acquit", type: "Động từ", phonetic: "/əˈkwɪt/", vi: "tuyên trắng án", example: "The jury decided to acquit the defendant due to lack of evidence.", bucket: 1 },
      { word: "testify", type: "Động từ", phonetic: "/ˈtes.tɪ.faɪ/", vi: "làm chứng (trước tòa)", example: "The witness refused to testify in court.", bucket: 1 },
      { word: "subpoena", type: "Danh từ", phonetic: "/səˈpiː.nə/", vi: "trát hầu tòa", example: "She received a subpoena to appear as a witness.", bucket: 1 },
      { word: "plaintiff", type: "Danh từ", phonetic: "/ˈpleɪn.tɪf/", vi: "nguyên đơn (người đi kiện)", example: "The plaintiff claimed damages for his injuries.", bucket: 0 },
      { word: "defendant", type: "Danh từ", phonetic: "/dɪˈfen.dənt/", vi: "bị cáo", example: "The defendant sat quietly while the charges were read.", bucket: 0 }
    ]
  },
  {
    unitNum: 48, title: "Unit 48: War and peace", description: "Từ vựng quân sự, chiến tranh sinh học và sự răn đe hạt nhân.", buckets: ["Warfare (Chiến tranh)", "Diplomacy (Ngoại giao)"],
    words: [
      { word: "deterrent", type: "Danh từ", phonetic: "/dɪˈter.ənt/", vi: "sự răn đe (vũ khí)", example: "Nuclear weapons are meant to act as a deterrent.", bucket: 1 },
      { word: "hostilities", type: "Danh từ", phonetic: "/hɒsˈtɪl.ə.tiz/", vi: "các hành động thù địch, chiến sự", example: "Hostilities broke out between the two countries.", bucket: 0 },
      { word: "biological warfare", type: "Cụm danh từ", phonetic: "/ˌbaɪ.əˈlɒdʒ.ɪ.kəl ˈwɔː.feər/", vi: "chiến tranh sinh học", example: "The UN has banned the use of biological warfare.", bucket: 0 },
      { word: "ceasefire", type: "Danh từ", phonetic: "/ˈsiːs.faɪər/", vi: "lệnh ngừng bắn", example: "The two armies agreed to a temporary ceasefire.", bucket: 1 },
      { word: "casualty", type: "Danh từ", phonetic: "/ˈkæʒ.ju.əl.ti/", vi: "thương vong", example: "The explosion caused heavy civilian casualties.", bucket: 0 },
      { word: "treaty", type: "Danh từ", phonetic: "/ˈtriː.ti/", vi: "hiệp ước", example: "The historic peace treaty was signed in Paris.", bucket: 1 },
      { word: "collateral damage", type: "Cụm danh từ", phonetic: "/kəˌlæt.ər.əl ˈdæm.ɪdʒ/", vi: "tổn thất dân thường/tài sản (trong chiến tranh)", example: "The bombing raid resulted in severe collateral damage.", bucket: 0 },
      { word: "truce", type: "Danh từ", phonetic: "/truːs/", vi: "sự hưu chiến", example: "They called a truce to collect the wounded.", bucket: 1 }
    ]
  },
  {
    unitNum: 49, title: "Unit 49: Economy and finance", description: "Kinh tế vĩ mô, cấm vận và sự phá giá tiền tệ.", buckets: ["Macroeconomics (Vĩ mô)", "Financial Crisis (Khủng hoảng)"],
    words: [
      { word: "debt", type: "Danh từ", phonetic: "/det/", vi: "khoản nợ", example: "The national debt has reached an all-time high.", bucket: 1 },
      { word: "sanctions", type: "Danh từ", phonetic: "/ˈsæŋk.ʃənz/", vi: "lệnh cấm vận", example: "The UN imposed strict economic sanctions on the country.", bucket: 1 },
      { word: "devaluation", type: "Danh từ", phonetic: "/ˌdiː.væl.juˈeɪ.ʃən/", vi: "sự phá giá tiền tệ", example: "The sudden devaluation of the currency caused panic.", bucket: 0 },
      { word: "inflation", type: "Danh từ", phonetic: "/ɪnˈfleɪ.ʃən/", vi: "lạm phát", example: "High inflation makes everyday goods very expensive.", bucket: 0 },
      { word: "recession", type: "Danh từ", phonetic: "/rɪˈseʃ.ən/", vi: "sự suy thoái kinh tế", example: "The country fell into a deep economic recession.", bucket: 0 },
      { word: "interest rate", type: "Cụm danh từ", phonetic: "/ˈɪn.trəst ˌreɪt/", vi: "lãi suất", example: "The central bank decided to lower the interest rate.", bucket: 0 },
      { word: "deficit", type: "Danh từ", phonetic: "/ˈdef.ɪ.sɪt/", vi: "sự thâm hụt (ngân sách)", example: "The government must reduce its budget deficit.", bucket: 1 },
      { word: "commodity", type: "Danh từ", phonetic: "/kəˈmɒd.ə.ti/", vi: "hàng hóa (vàng, dầu mỏ...)", example: "Oil is the world's most traded commodity.", bucket: 1 }
    ]
  },
  {
    unitNum: 50, title: "Unit 50: Personal finance: balancing your books", description: "Tài chính cá nhân, cảnh cháy túi và tiền bồi thường nghỉ việc.", buckets: ["Money trouble (Rắc rối tiền bạc)", "Income (Thu nhập)"],
    words: [
      { word: "strapped for cash", type: "Thành ngữ", phonetic: "/stræpt fɔː kæʃ/", vi: "kẹt tiền, kẹt mặt tài chính", example: "I can't go to the movies tonight; I'm a bit strapped for cash.", bucket: 0 },
      { word: "broke", type: "Tính từ", phonetic: "/brəʊk/", vi: "cháy túi, nhẵn túi", example: "I was completely broke by the end of the month.", bucket: 0 },
      { word: "golden handshake", type: "Cụm danh từ", phonetic: "/ˌɡəʊl.dən ˈhænd.ʃeɪk/", vi: "khoản tiền thưởng hậu hĩnh khi nghỉ việc", example: "The CEO received a massive golden handshake when he retired.", bucket: 1 },
      { word: "mortgage", type: "Danh từ", phonetic: "/ˈmɔː.ɡɪdʒ/", vi: "khoản vay thế chấp (mua nhà)", example: "It will take thirty years to pay off the mortgage.", bucket: 0 },
      { word: "overdraft", type: "Danh từ", phonetic: "/ˈəʊ.və.drɑːft/", vi: "sự thấu chi (rút quá số tiền trong thẻ)", example: "The bank charged me a high fee for my overdraft.", bucket: 0 },
      { word: "inherit", type: "Động từ", phonetic: "/ɪnˈher.ɪt/", vi: "thừa kế", example: "She will inherit a large fortune from her grandfather.", bucket: 1 },
      { word: "frugal", type: "Tính từ", phonetic: "/ˈfruː.ɡəl/", vi: "tiết kiệm, chắt bóp", example: "He lives a very frugal lifestyle to save money.", bucket: 1 },
      { word: "splurge", type: "Động từ", phonetic: "/splɜːdʒ/", vi: "vung tiền mua sắm", example: "I decided to splurge on a new designer handbag.", bucket: 0 }
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

const fileContent = "// File: src/data/oxfordAdvancedData26_50.js\n// Auto-generated Phase 2 Advanced Units (26-50)\n\n" +
  "export const courseData26_50 = " + JSON.stringify(courseData, null, 2) + ";\n";

fs.writeFileSync('src/data/oxfordAdvancedData26_50.js', fileContent);
console.log("Successfully generated oxfordAdvancedData26_50.js");
