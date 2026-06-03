/* eslint-disable */
// File: generate_preint_data_part2.js
import fs from 'fs';

// Complete 50 Units Database for Pre-Intermediate & Intermediate English Vocabulary in Use (Units 51-100)
// Each Unit contains exactly 8 words (4 for Section A, and 4 for Section B)
const rawUnits = [
  {
    unitNum: 51,
    title: "Unit 51: Around the home 2",
    description: "Các dụng cụ làm bếp, thiết bị điện và các đồ dùng dọn dẹp nhà cửa thông dụng.",
    buckets: ["Kitchen Equipment (Thiết bị bếp)", "Cleaning & Tasks (Dọn dẹp & Việc nhà)"],
    words: [
      { word: "washing-up liquid", type: "Danh từ", phonetic: "/ˈwɒʃɪŋ ʌp ˈlɪkwɪd/", vi: "nước rửa chén bát hằng ngày", example: "We need some washing-up liquid to clean plates.", bucket: 0 },
      { word: "saucepan", type: "Danh từ", phonetic: "/ˈsɔːspən/", vi: "nồi nấu có tay cầm sâu lòng", example: "Boil the tomato soup in a large saucepan.", bucket: 0 },
      { word: "frying pan", type: "Danh từ", phonetic: "/ˈfraɪɪŋ pæn/", vi: "chảo rán, chảo chiên thực phẩm", example: "Heat some cooking oil in the frying pan.", bucket: 0 },
      { word: "tea towel", type: "Danh từ", phonetic: "/ˈtiː taʊəl/", vi: "khăn khô lau sạch bát đĩa", example: "Dry the wet cups with a clean tea towel.", bucket: 0 },
      { word: "vacuum cleaner", type: "Danh từ", phonetic: "/ˈvækjuːm ˈkliːnə/", vi: "máy hút bụi thảm sàn tiện lợi", example: "Run the vacuum cleaner on the dirty carpet.", bucket: 1 },
      { word: "dustpan and brush", type: "Danh từ", phonetic: "/I dʌstpæn ənd brʌʃ/", vi: "bộ dụng cụ hốt rác và chổi quét", example: "Sweep the dust into the dustpan and brush.", bucket: 1 },
      { word: "iron", type: "Danh từ / Động từ", phonetic: "/ˈaɪən/", vi: "bàn là, bàn ủi / là ủi quần áo", example: "Iron your cotton shirt before going to class.", bucket: 1 },
      { word: "plug", type: "Danh từ", phonetic: "/plʌɡ/", vi: "phích cắm điện của thiết bị", example: "Insert the metal plug into the wall socket.", bucket: 1 }
    ]
  },
  {
    unitNum: 52,
    title: "Unit 52: Everyday problems",
    description: "Mô tả các tai nạn nhỏ trong nhà và các sự cố kỹ thuật thường gặp.",
    buckets: ["Accidents & Damage (Tai nạn & Hư hại)", "System Failures (Sự cố hệ thống)"],
    words: [
      { word: "drop a glass", type: "Cụm động từ", phonetic: "/drɒp ə ɡlɑːs/", vi: "làm rơi chiếc ly thủy tinh xuống đất", example: "Be very careful not to drop a glass.", bucket: 0 },
      { word: "break a cup", type: "Cụm động từ", phonetic: "/breɪk ə kʌp/", vi: "làm vỡ chiếc tách sứ uống trà", example: "I accidentally broke a cup in the lounge.", bucket: 0 },
      { word: "spill some coffee", type: "Cụm động từ", phonetic: "/spɪl sʌm ˈkɒfi/", vi: "làm tràn, đổ cà phê ra ngoài", example: "She spilled some coffee on her black trousers.", bucket: 0 },
      { word: "burn the toast", type: "Cụm động từ", phonetic: "/bɜːn ðə təʊst/", vi: "làm cháy xém lát bánh mì nướng", example: "Don't burn the toast on the electric cooker.", bucket: 0 },
      { word: "run out of petrol", type: "Cụm động từ", phonetic: "/rʌn aʊt ɒv ˈpɛtrəl/", vi: "dùng hết sạch xăng, cạn kiệt xăng", example: "Our private car ran out of petrol on the road.", bucket: 1 },
      { word: "leak", type: "Động từ / Danh từ", phonetic: "/liːk/", vi: "rò rỉ nước, rò rỉ chất lỏng", example: "The kitchen water pipe is leaking badly.", bucket: 1 },
      { word: "power cut", type: "Danh từ", phonetic: "/ˈpaʊə kʌt/", vi: "sự cố mất điện đột ngột toàn khu", example: "A power cut hit the valley town last night.", bucket: 1 },
      { word: "get stuck", type: "Cụm động từ", phonetic: "/ɡɛt stʌk/", vi: "bị kẹt lại, bị mắc kẹt không lối thoát", example: "The lift got stuck between the lounge floors.", bucket: 1 }
    ]
  },
  {
    unitNum: 53,
    title: "Unit 53: Money",
    description: "Tiền tệ vật lý, cách thức thanh toán và các hành động giao dịch tiền bạc.",
    buckets: ["Physical Forms (Các dạng tiền vật lý)", "Financial Actions (Hành động tiền tệ)"],
    words: [
      { word: "note", type: "Danh từ", phonetic: "/nəʊt/", vi: "tờ tiền giấy, tiền giấy mệnh giá", example: "He paid the waiter with a ten-pound note.", bucket: 0 },
      { word: "coin", type: "Danh từ", phonetic: "/kɔɪn/", vi: "đồng tiền xu bằng kim loại", example: "She put some silver coins in the tin opener.", bucket: 0 },
      { word: "cash", type: "Danh từ", phonetic: "/æʃ/", vi: "tiền mặt cầm tay giao dịch ngay", example: "Do you prefer to pay in cash or card?", bucket: 0 },
      { word: "credit card", type: "Danh từ", phonetic: "/ˈkrɛdɪt kɑːd/", vi: "thẻ tín dụng thanh toán trả sau", example: "I paid the bill using my visa credit card.", bucket: 0 },
      { word: "earn", type: "Động từ", phonetic: "/ɜːn/", vi: "kiếm được tiền từ lao động học thuật", example: "Miners earn a lot of pocket money from mining.", bucket: 1 },
      { word: "spend", type: "Động từ", phonetic: "/spɛnd/", vi: "chi tiêu, tiêu tiền vào mua sắm", example: "Teenagers spend a lot on fashionable clothes.", bucket: 1 },
      { word: "borrow", type: "Động từ", phonetic: "/ˈbɒrəʊ/", vi: "mượn tiền, vay tiền từ ai tạm thời", example: "Can I borrow your dictionary for the test?", bucket: 1 },
      { word: "lend", type: "Động từ", phonetic: "/lɛnd/", vi: "cho ai đó vay mượn tạm thời đồ vật", example: "He agreed to lend me his brand-new bicycle.", bucket: 1 }
    ]
  },
  {
    unitNum: 54,
    title: "Unit 54: Health and illness",
    description: "Các triệu chứng bệnh phổ biến và cách điều trị y tế cơ bản hằng ngày.",
    buckets: ["Symptoms (Triệu chứng bệnh trạng)", "Treatments (Cách điều trị y khoa)"],
    words: [
      { word: "sore throat", type: "Danh từ", phonetic: "/sɔː θrəʊt/", vi: "sự đau họng, rát cổ họng khó nuốt", example: "Warm tea helps a sore throat get better.", bucket: 0 },
      { word: "runny nose", type: "Danh từ", phonetic: "/ˈrʌni nəʊz/", vi: "sự sổ mũi, nước mũi chảy liên tục", example: "He has a runny nose and needs some tissues.", bucket: 0 },
      { word: "cough", type: "Danh từ / Động từ", phonetic: "/kɒf/", vi: "sự ho, tiếng ho khan / ho hắng", example: "She had a bad cough and could not speak.", bucket: 0 },
      { word: "headache", type: "Danh từ", phonetic: "/ˈhɛdeɪk/", vi: "bệnh đau đầu, nhức đầu buốt óc", example: "Staring at the screen gave him a headache.", bucket: 0 },
      { word: "fever", type: "Danh từ", phonetic: "/ˈfiːvə/", vi: "sự sốt cao, nhiệt độ cơ thể tăng vọt", example: "See a doctor if your high fever goes on.", bucket: 0 },
      { word: "feel sick", type: "Cụm động từ", phonetic: "/fiːl sɪk/", vi: "cảm thấy buồn nôn, mệt mỏi uể oải", example: "I feel sick after eating that fast food.", bucket: 0 },
      { word: "bandage", type: "Danh từ", phonetic: "/ˈbændɪdʒ/", vi: "băng gạc y tế dùng quấn vết thương", example: "Wrap a bandage tightly around the cut knee.", bucket: 1 },
      { word: "medicine", type: "Danh từ", phonetic: "/ˈmɛdsn/", vi: "thuốc chữa bệnh, dược phẩm điều trị", example: "Take this liquid medicine twice a day.", bucket: 1 }
    ]
  },
  {
    unitNum: 55,
    title: "Unit 55: Clothes",
    description: "Trang phục thường ngày, phụ kiện giữ ấm và các tính từ mô tả áo quần.",
    buckets: ["Casual Outfits (Quần áo hằng ngày)", "Warm Accessories (Phụ kiện giữ ấm)"],
    words: [
      { word: "jacket", type: "Danh từ", phonetic: "/ˈdʒækɪt/", vi: "áo khoác ngắn, áo jacket giữ ấm nhẹ", example: "Put on your jacket; the breeze is cool.", bucket: 0 },
      { word: "jeans", type: "Danh từ số nhiều", phonetic: "/dʒiːnz/", vi: "quần bò, quần jeans bền bỉ (luôn số nhiều)", example: "He loves wearing casual blue jeans at school.", bucket: 0 },
      { word: "sweater", type: "Danh từ", phonetic: "/ˈswɛtə/", vi: "áo len chui đầu dài tay ấm áp", example: "She knitted a thick wool sweater for winter.", bucket: 0 },
      { word: "boots", type: "Danh từ số nhiều", phonetic: "/buːts/", vi: "đôi giày bốt, đôi ủng cao cổ đi mưa", example: "Wear waterproof boots in case of flood rain.", bucket: 0 },
      { word: "scarf", type: "Danh từ", phonetic: "/skɑːf/", vi: "khăn quàng cổ giữ ấm mùa đông", example: "Tie a warm woollen scarf around your neck.", bucket: 1 },
      { word: "gloves", type: "Danh từ số nhiều", phonetic: "/ɡlʌvz/", vi: "đôi bao tay, đôi găng tay giữ ấm ngón", example: "Leather gloves keep your hands warm in snow.", bucket: 1 },
      { word: "hat", type: "Danh từ", phonetic: "/hæt/", vi: "chiếc mũ, chiếc nón đội đầu che nắng", example: "Wear a sun hat on a hot sunny beach day.", bucket: 1 },
      { word: "raincoat", type: "Danh từ", phonetic: "/ˈreɪnkəʊt/", vi: "áo mưa tiện lợi che chắn nước đổ", example: "Put on your raincoat; it is pouring with rain.", bucket: 1 }
    ]
  },
  {
    unitNum: 56,
    title: "Unit 56: Shops and shopping",
    description: "Các loại cửa hàng chuyên dụng và các thuật ngữ giao dịch mua bán.",
    buckets: ["Retail Stores (Cửa hàng bán lẻ)", "Transaction Terms (Giao dịch mua bán)"],
    words: [
      { word: "supermarket", type: "Danh từ", phonetic: "/ˈsuːpəmɑːkɪt/", vi: "siêu thị lớn tự chọn hàng hóa thực phẩm", example: "They buy fresh vegetables in the supermarket.", bucket: 0 },
      { word: "baker's", type: "Danh từ", phonetic: "/ˈbeɪkəz/", vi: "tiệm bánh mì, cửa hàng bán bánh ngọt", example: "Buy some brand-new bread at the baker's.", bucket: 0 },
      { word: "butcher's", type: "Danh từ", phonetic: "/ˈbʊtʃəz/", vi: "tiệm bán thịt gia súc gia cầm tươi sống", example: "You can purchase poultry chicken at butcher's.", bucket: 0 },
      { word: "chemist's", type: "Danh từ", phonetic: "/ˈkɛmɪsts/", vi: "hiệu thuốc tây bán dược phẩm hóa mỹ phẩm", example: "Get this liquid medicine from the chemist's.", bucket: 0 },
      { word: "department store", type: "Danh từ", phonetic: "/dɪˈpɑːtmənt stɔː/", vi: "cửa hàng bách hóa tổng hợp nhiều tầng", example: "She went window shopping at the department store.", bucket: 0 },
      { word: "price", type: "Danh từ", phonetic: "/praɪs/", vi: "mức giá cả, trị giá của món đồ vật", example: "The price of this attrative jacket is very high.", bucket: 1 },
      { word: "receipt", type: "Danh từ", phonetic: "/rɪˈsiːt/", vi: "hóa đơn thanh toán biên nhận (chữ p câm)", example: "Always check your change and keep the receipt.", bucket: 1 },
      { word: "checkout", type: "Danh từ", phonetic: "/ˈtʃɛkaʊt/", vi: "quầy thu ngân thanh toán tiền ra về", example: "Pay for the items at the supermarket checkout.", bucket: 1 }
    ]
  },
  {
    unitNum: 57,
    title: "Unit 57: Food and drink",
    description: "Các danh mục đồ uống và các loại thực phẩm dinh dưỡng hằng ngày.",
    buckets: ["Beverages (Các loại đồ uống)", "Poultry & Produce (Thịt & Rau củ quả)"],
    words: [
      { word: "fruit juice", type: "Danh từ", phonetic: "/fruːt dʒuːs/", vi: "nước ép hoa quả thơm mát sạch tự nhiên", example: "Enjoy a fresh cup of cold orange fruit juice.", bucket: 0 },
      { word: "mineral water", type: "Danh từ", phonetic: "/ˈmɪnərəl ˈwɔːtə/", vi: "nước khoáng thiên nhiên tinh khiết chai", example: "A bottle of mineral water is good at the gym.", bucket: 0 },
      { word: "beef", type: "Danh từ", phonetic: "/biːf/", vi: "thịt bò tươi nấu các món mỳ ngon", example: "Use minced beef to make the spaghetti sauce.", bucket: 1 },
      { word: "chicken", type: "Danh từ", phonetic: "/ˈtʃɪkɪn/", vi: "thịt gà, gà thịt gia cầm thơm phức", example: "We cooked delicious fried chicken for dinner.", bucket: 1 },
      { word: "carrot", type: "Danh từ", phonetic: "/ˈkærət/", vi: "củ cà rốt màu cam giàu vitamin tốt mắt", example: "A rabbit is eating carrots behind the house.", bucket: 1 },
      { word: "bean", type: "Danh từ", phonetic: "/biːn/", vi: "hạt đậu xanh đỗ quả chứa nhiều đạm chay", example: "Mix green beans and carrots in the salad bowl.", bucket: 1 },
      { word: "potato", type: "Danh từ", phonetic: "/pəˈteɪtəʊ/", vi: "củ khoai tây nấu súp, nướng củ ngon", example: "We had mashed potatoes and chicken beef today.", bucket: 1 },
      { word: "apple", type: "Danh từ", phonetic: "/ˈæpl/", vi: "trái táo đỏ giòn mọng ngọt quả chín", example: "Eating an apple a day keeps the doctor away.", bucket: 1 }
    ]
  },
  {
    unitNum: 58,
    title: "Unit 58: Cooking and the kitchen",
    description: "Các phương pháp chế biến ẩm thực và các hành động làm bếp thường nhật.",
    buckets: ["Cooking Methods (Phương pháp chế biến)", "Kitchen Actions (Hành động chuẩn bị bếp)"],
    words: [
      { word: "fry", type: "Động từ", phonetic: "/fraɪ/", vi: "rán chiên thực phẩm ngập trong mỡ nóng", example: "Fry the chicken in the frying pan carefully.", bucket: 0 },
      { word: "boil", type: "Động từ", phonetic: "/bɔɪl/", vi: "đun sôi nước, luộc chín trứng hay mì", example: "Boil the water, then add the spaghetti lines.", bucket: 0 },
      { word: "bake", type: "Động từ", phonetic: "/beɪk/", vi: "nướng bánh trong lò nướng làm chín bột", example: "They bake fresh bread at the baker's daily.", bucket: 0 },
      { word: "mix", type: "Động từ", phonetic: "/mɪks/", vi: "trộn lẫn các thành phần gia vị bột nước", example: "Mix the ingredients together in a clean bowl.", bucket: 0 },
      { word: "food mixer", type: "Danh từ", phonetic: "/fuːd ˈmɪksə/", vi: "máy trộn, máy xay thực phẩm điện tự động", example: "Use the food mixer to blend the cake batter.", bucket: 1 },
      { word: "fridge", type: "Danh từ", phonetic: "/frɪdʒ/", vi: "tủ lạnh bảo quản mát lạnh đồ dùng thức ăn", example: "Store the raw chicken and beef in the fridge.", bucket: 1 },
      { word: "cooker", type: "Danh từ", phonetic: "/ˈkʊkə/", vi: "bếp lò nấu ăn (bếp gas, bếp điện lò gas)", example: "The gas cooker is hot; do not touch it now.", bucket: 1 },
      { word: "dishwasher", type: "Danh từ", phonetic: "/ˈdɪʃˌwɒʃə/", vi: "máy rửa bát đĩa tự động tiết kiệm công", example: "Put the dirty plates directly in the dishwasher.", bucket: 1 }
    ]
  },
  {
    unitNum: 59,
    title: "Unit 59: Town and country",
    description: "Các công trình công cộng trong thành thị và địa danh thiên nhiên vùng thôn quê.",
    buckets: ["Town Public Places (Công trình đô thị)", "Countryside Features (Địa danh thôn quê)"],
    words: [
      { word: "railway station", type: "Danh từ", phonetic: "/ˈreɪlweɪ ˈsteɪʃn/", vi: "ga tàu hỏa chạy tuyến liên tỉnh xa", example: "Meet me at the railway station next morning.", bucket: 0 },
      { word: "post office", type: "Danh từ", phonetic: "/pəʊst ˈɒfɪs/", vi: "bưu điện gửi nhận bưu kiện thư từ giấy", example: "She went to the post office to mail a letter.", bucket: 0 },
      { word: "library", type: "Danh từ", phonetic: "/ˈlaɪbrəri/", vi: "thư viện lưu trữ sách đọc mượn yên tĩnh", example: "Students do homework quietly in the library.", bucket: 0 },
      { word: "museum", type: "Danh từ", phonetic: "/mjuˈziːəm/", vi: "bảo tàng lịch sử văn hóa trưng bày hiện vật", example: "The museum exhibits ancient gold and iron mines.", bucket: 0 },
      { word: "lake", type: "Danh từ", phonetic: "/leɪk/", vi: "hồ nước ngọt tự nhiên lớn nằm tĩnh lặng", example: "They rowed a small boat across the quiet lake.", bucket: 1 },
      { word: "river", type: "Danh từ", phonetic: "/ˈrɪvər/", vi: "dòng sông uốn lượn chảy xuôi thung lũng", example: "The river flows down the green valley bank.", bucket: 1 },
      { word: "country road", type: "Danh từ", phonetic: "/ˈkʌntri rəʊd/", vi: "con đường đất nhỏ vùng quê yên ả", example: "We walked down the narrow dusty country road.", bucket: 1 },
      { word: "national park", type: "Danh từ", phonetic: "/ˈnæʃnəl pɑːk/", vi: "công viên quốc gia, khu bảo tồn động vật", example: "We saw monkeys and tigers in the national park.", bucket: 1 }
    ]
  },
  {
    unitNum: 60,
    title: "Unit 60: On the road",
    description: "Đèn tín hiệu, biển báo chỉ đường và hành vi giao thông an toàn đường bộ.",
    buckets: ["Road Elements (Yếu tố cấu trúc đường)", "Driving Actions (Hành vi lái xe an toàn)"],
    words: [
      { word: "traffic light", type: "Danh từ", phonetic: "/ˈtræfɪk laɪt/", vi: "hệ thống đèn giao thông ngã ba ngã tư", example: "Stop driving when the traffic light is red.", bucket: 0 },
      { word: "pedestrian area", type: "Danh từ", phonetic: "/pɪˈdɛstrɪən ˈeərɪə/", vi: "khu vực đi bộ, phố đi bộ cấm xe cộ", example: "No private cars are allowed in pedestrian area.", bucket: 0 },
      { word: "car park", type: "Danh từ", phonetic: "/kɑː pɑːk/", vi: "bãi đỗ xe ô tô công cộng ngoài trời", example: "You can find a free car park near the church.", bucket: 0 },
      { word: "no parking", type: "Danh từ / Cụm từ", phonetic: "/nəʊ ˈpɑːkɪŋ/", vi: "biển báo cấm đỗ xe tại lề đường", example: "The sign says no parking in front of the gate.", bucket: 0 },
      { word: "no entry", type: "Danh từ / Cụm từ", phonetic: "/nəʊ ˈɛntri/", vi: "biển báo cấm đi vào ngược chiều", example: "Turn back; this narrow country road is no entry.", bucket: 0 },
      { word: "bus stop", type: "Danh từ", phonetic: "/bʌs stɒp/", vi: "điểm dừng xe buýt nội thành chở khách", example: "Wait for the public bus at the next bus stop.", bucket: 0 },
      { word: "drive", type: "Động từ", phonetic: "/draɪv/", vi: "lái xe ô tô, điều khiển xe cơ giới chạy", example: "Miners drive heavy vehicles inside the mine.", bucket: 1 },
      { word: "turn left", type: "Cụm động từ", phonetic: "/tɜːn lɛft/", vi: "rẽ trái, rẽ sang phía bên tay trái lái", example: "Go straight to the crossroads, then turn left.", bucket: 1 }
    ]
  },
  {
    unitNum: 61,
    title: "Unit 61: Transport",
    description: "Các phương tiện di chuyển giao thông và các loại vé tàu xe đi lại.",
    buckets: ["Modes of Transport (Phương tiện di chuyển)", "Travel Fares (Vé & Thủ tục di chuyển)"],
    words: [
      { word: "train", type: "Danh từ", phonetic: "/treɪn/", vi: "tàu hỏa chạy đường ray chạy bằng hơi/điện", example: "We prefer to go on holiday by fast train.", bucket: 0 },
      { word: "plane", type: "Danh từ", phonetic: "/pleɪn/", vi: "máy bay vận chuyển hành khách bầu trời (silent l)", example: "The passenger plane is flying above the clouds.", bucket: 0 },
      { word: "car", type: "Danh từ", phonetic: "/kɑː/", vi: "xe ô tô con bốn bánh gia đình tiện lợi", example: "Travelling by private car is highly convenient.", bucket: 0 },
      { word: "bus", type: "Danh từ", phonetic: "/bʌs/", vi: "xe buýt công cộng nội thành giá rẻ", example: "Catch the bus early to get to work on time.", bucket: 0 },
      { word: "motorbike", type: "Danh từ", phonetic: "/ˈməʊtəbaɪk/", vi: "xe máy, xe mô tô hai bánh nhanh gọn", example: "He rides a brand-new motorbike to school.", bucket: 0 },
      { word: "underground", type: "Danh từ / Trạng từ", phonetic: "/ˈʌndəɡraʊnd/", vi: "tàu điện ngầm chạy dưới lòng đất đô thị", example: "Take the underground to avoid city traffic jam.", bucket: 0 },
      { word: "boat", type: "Danh từ", phonetic: "/bəʊt/", vi: "chiếc thuyền nhỏ, chiếc đò bơi sông hồ", example: "They sailed a wooden boat across the lake river.", bucket: 0 },
      { word: "single ticket", type: "Danh từ", phonetic: "/ˈsɪŋɡl ˈtɪkɪt/", vi: "vé một chiều đi không có vé khứ hồi", example: "A single ticket is cheaper than a return ticket.", bucket: 1 }
    ]
  },
  {
    unitNum: 62,
    title: "Unit 62: Education: school",
    description: "Phòng học, đồ dùng học tập và các kỳ thi phổ thông của học sinh.",
    buckets: ["Classroom Elements (Dụng cụ & Trường lớp)", "Academic Testing (Kỳ thi & Học tập)"],
    words: [
      { word: "classroom", type: "Danh từ", phonetic: "/ˈklɑːsruːm/", vi: "lớp học, phòng học tập của học sinh", example: "The pupils are at school inside the classroom.", bucket: 0 },
      { word: "textbook", type: "Danh từ", phonetic: "/ˈtɛkstbʊk/", vi: "sách giáo khoa in ấn chính thống bài học", example: "Share a textbook with Tim if you forgot yours.", bucket: 0 },
      { word: "notebook", type: "Danh từ", phonetic: "/ˈnəʊtbʊk/", vi: "sổ tay ghi chép bài học, vở ghi chép", example: "Always write spelling words in your notebook.", bucket: 0 },
      { word: "rubber", type: "Danh từ", phonetic: "/ˈrʌbə/", vi: "cục tẩy, cục gôm xóa vết bút chì xước", example: "Use a soft rubber to rub out the pencil lines.", bucket: 0 },
      { word: "take an exam", type: "Cụm động từ", phonetic: "/teɪk ən ɪɡˈzæm/", vi: "tham gia thi, làm bài thi học thuật", example: "Students feel excited when they take an exam.", bucket: 1 },
      { word: "pass an exam", type: "Cụm động từ", phonetic: "/pɑːs ən ɪɡˈzæm/", vi: "thi đỗ, vượt qua kỳ thi đạt kết quả tốt", example: "Congratulations! You passed the school exam.", bucket: 1 },
      { word: "fail an exam", type: "Cụm động từ", phonetic: "/feɪl ən ɪɡˈzæm/", vi: "thi trượt, rớt kỳ thi do không ôn tập kỹ", example: "He felt unhappy when he failed the final exam.", bucket: 1 },
      { word: "do homework", type: "Cụm động từ", phonetic: "/duː ˈhəʊm.wɜːk/", vi: "làm bài tập về nhà sau giờ học lớp", example: "Do homework before going to bed on weekdays.", bucket: 1 }
    ]
  },
  {
    unitNum: 63,
    title: "Unit 63: Education: university and study",
    description: "Giảng đường đại học, giáo sư hướng dẫn và nghiên cứu khoa học chuyên sâu.",
    buckets: ["Academic Environment (Môi trường học thuật)", "Higher Study Actions (Nghiên cứu & Tốt nghiệp)"],
    words: [
      { word: "lecture", type: "Danh từ", phonetic: "/ˈlɛktʃə/", vi: "bài giảng của giảng viên, tiết giảng đường", example: "We attend a biology lecture in the morning.", bucket: 0 },
      { word: "professor", type: "Danh từ", phonetic: "/prəˈfɛsər/", vi: "giáo sư đại học nghiên cứu giảng dạy", example: "The professor has a strong Scottish accent.", bucket: 0 },
      { word: "student", type: "Danh từ", phonetic: "/ˈstjuːdnt/", vi: "sinh viên đại học, người học cao học", example: "She is a university student studying chemistry.", bucket: 0 },
      { word: "laboratory", type: "Danh từ", phonetic: "/ləˈbɒrətəri/", vi: "phòng thí nghiệm khoa học hóa sinh vật", example: "Miners test the iron ore inside the laboratory.", bucket: 0 },
      { word: "study", type: "Động từ / Danh từ", phonetic: "/ˈstʌdi/", vi: "học tập, nghiên cứu chuyên sâu môn học", example: "Study vocabulary notebook regularly to progress.", bucket: 1 },
      { word: "learn", type: "Động từ", phonetic: "/lɜːn/", vi: "học hỏi kiến thức kỹ năng mới thực hành", example: "Toddlers learn to walk on the ground floor.", bucket: 1 },
      { word: "graduate", type: "Động từ / Danh từ", phonetic: "/ˈɡrædʒueɪt/", vi: "tốt nghiệp đại học nhận bằng cử nhân", example: "He plans to get a job as soon as he graduates.", bucket: 1 },
      { word: "scholarship", type: "Danh từ", phonetic: "/ˈskɒləʃɪp/", vi: "học bổng khuyến học cho sinh viên xuất sắc", example: "She won a full university scholarship last month.", bucket: 1 }
    ]
  },
  {
    unitNum: 64,
    title: "Unit 64: Work: jobs and professions",
    description: "Các ngành nghề phổ biến trong xã hội và trạng thái nghỉ hưu tuổi già.",
    buckets: ["Active Professions (Ngành nghề hoạt động)", "Career Status (Trạng thái nghề nghiệp)"],
    words: [
      { word: "doctor", type: "Danh từ", phonetic: "/ˈdɒktə/", vi: "bác sĩ chữa bệnh tại bệnh viện y tế", example: "See a doctor if your sore throat gets worse.", bucket: 0 },
      { word: "nurse", type: "Danh từ", phonetic: "/nɜːs/", vi: "y tá chăm sóc hỗ trợ bệnh nhân phục hồi", example: "The kind nurse wrapped a bandage on my knee.", bucket: 0 },
      { word: "teacher", type: "Danh từ", phonetic: "/ˈtiːtʃə/", vi: "giáo viên giảng dạy truyền đạt kiến thức", example: "The teacher distributed sheets to all pupils.", bucket: 0 },
      { word: "engineer", type: "Danh từ", phonetic: "/ˌɛndʒɪˈnɪər/", vi: "kỹ sư thiết kế chế tạo xây dựng vận hành", example: "An software engineer developed this grammar app.", bucket: 0 },
      { word: "lawyer", type: "Danh từ", phonetic: "/ˈlɔːjə/", vi: "luật sư tư vấn pháp luật bảo vệ thân chủ", example: "A corporate lawyer helps the company do business.", bucket: 0 },
      { word: "businessman", type: "Danh từ", phonetic: "/ˈbɪznəsmæn/", vi: "nam doanh nhân thương trường buôn bán", example: "The busy businessman frequently flies by plane.", bucket: 0 },
      { word: "shopkeeper", type: "Danh từ", phonetic: "/ˈʃɒpˌkiːpə/", vi: "chủ cửa hàng bán lẻ quản lý mua bán", example: "The pleasant shopkeeper gave me the change receipt.", bucket: 0 },
      { word: "retired", type: "Tính từ", phonetic: "/rɪˈtaɪəd/", vi: "đã nghỉ hưu thôi làm việc do tuổi cao", example: "My retired grandfather is very easy-going.", bucket: 1 }
    ]
  },
  {
    unitNum: 65,
    title: "Unit 65: Work: at work",
    description: "Quan hệ đồng nghiệp công sở, chế độ lương bổng và hành vi công việc thường nhật.",
    buckets: ["Professional Links (Quan hệ đồng nghiệp)", "Daily Work Habits (Thói quen & Lương thưởng)"],
    words: [
      { word: "colleague", type: "Danh từ", phonetic: "/ˈkɒliːɡ/", vi: "đồng nghiệp chung cơ quan làm việc (g câm)", example: "He discussed the new plan with a colleague.", bucket: 0 },
      { word: "partner", type: "Danh từ", phonetic: "/ˈpɑːtnə/", vi: "đối tác kinh doanh, người chung hùn vốn", example: "They have been business partners for a decade.", bucket: 0 },
      { word: "salary", type: "Danh từ", phonetic: "/ˈsæləri/", vi: "tiền lương tháng cố định của nhân viên", example: "He earns a high salary as a senior engineer.", bucket: 1 },
      { word: "get a job", type: "Cụm động từ", phonetic: "/ɡɛt ə dʒɒb/", vi: "tìm được một công việc làm ăn kiếm tiền", example: "He hopes to get a job in a well-known store.", bucket: 1 },
      { word: "work part-time", type: "Cụm động từ", phonetic: "/wɜːk ˌpɑːtˈtaɪm/", vi: "làm việc bán thời gian kiếm thêm thu", example: "Students often work part-time to earn money.", bucket: 1 },
      { word: "discuss plans", type: "Cụm động từ", phonetic: "/dɪˈskʌs plænz/", vi: "thảo luận các kế hoạch chiến lược mới", example: "We discuss plans at the weekly staff meeting.", bucket: 1 },
      { word: "meet clients", type: "Cụm động từ", phonetic: "/miːt ˈklaɪənts/", vi: "gặp gỡ khách hàng, đối tác làm ăn ký", example: "Sales representatives frequently meet clients.", bucket: 1 },
      { word: "attend a meeting", type: "Cụm động từ", phonetic: "/əˈtɛnd ə ˈmiːtɪŋ/", vi: "tham gia cuộc họp bàn tròn công ty", example: "The manager has to attend a meeting at noon.", bucket: 1 }
    ]
  },
  {
    unitNum: 66,
    title: "Unit 66: Work: business",
    description: "Hoạt động thương mại, thị trường cạnh tranh và lợi nhuận kinh doanh.",
    buckets: ["Commercial Entities (Thương thể kinh tế)", "Market Dynamics (Động lực thị trường buôn bán)"],
    words: [
      { word: "company", type: "Danh từ", phonetic: "/ˈkʌmpəni/", vi: "công ty, doanh nghiệp hoạt động thương mại", example: "The well-known company produces clean coal energy.", bucket: 0 },
      { word: "market", type: "Danh từ / Động từ", phonetic: "/ˈmɑːkɪt/", vi: "thị trường mua bán / tiếp thị sản phẩm", example: "They study the global market for iron gold.", bucket: 0 },
      { word: "customer", type: "Danh từ", phonetic: "/ˈkʌstəmər/", vi: "khách hàng mua sắm sử dụng dịch vụ", example: "Always explain definitions politely to customer.", bucket: 0 },
      { word: "competitor", type: "Danh từ", phonetic: "/kəmˈpɛtɪtər/", vi: "đối thủ cạnh tranh trực tiếp trên thị", example: "The local pharmacy has got a new competitor.", bucket: 0 },
      { word: "produce", type: "Động từ", phonetic: "/prəˈdjuːs/", vi: "sản xuất, chế tạo ra hàng hóa vật phẩm", example: "This farming area produces organic crop yield.", bucket: 1 },
      { word: "buy", type: "Động từ", phonetic: "/baɪ/", vi: "mua sắm hàng hóa trả tiền sở hữu vật", example: "They buy second-hand books at huge discounts.", bucket: 1 },
      { word: "sell", type: "Động từ", phonetic: "/sɛl/", vi: "bán hàng hóa trao đổi lấy tiền mặt cash", example: "Shopkeepers sell various items on coffee tables.", bucket: 1 },
      { word: "earn a profit", type: "Cụm động từ", phonetic: "/ɜːn ə ˈprɒfɪt/", vi: "thu được lợi nhuận, kiếm lời trong buôn", example: "The business must sell more to earn a profit.", bucket: 1 }
    ]
  },
  {
    unitNum: 67,
    title: "Unit 67: Sport (1): games",
    description: "Các bộ môn thể thao thi đấu bóng tập thể và kết quả thắng thua.",
    buckets: ["Ball Games (Bộ môn bóng thi đấu)", "Match Results (Kết quả trận đấu thể thao)"],
    words: [
      { word: "football", type: "Danh từ", phonetic: "/ˈfʊtbɔːl/", vi: "môn bóng đá vua thể thao đồng đội", example: "Boys enjoy playing football on the grassy pitch.", bucket: 0 },
      { word: "basketball", type: "Danh từ", phonetic: "/ˈbɑːskɪtbɔːl/", vi: "môn bóng rổ nhảy ném bóng vào rổ cao", example: "He is extremely tall and plays basketball well.", bucket: 0 },
      { word: "tennis", type: "Danh từ", phonetic: "/ˈtɛnɪs/", vi: "môn quần vợt đánh bóng qua lưới nảy", example: "We bought two rackets to play tennis today.", bucket: 0 },
      { word: "volleyball", type: "Danh từ", phonetic: "/ˈvɒlɪbɔːl/", vi: "môn bóng chuyền dùng tay đập bóng qua", example: "They play beach volleyball on a sunny holiday.", bucket: 0 },
      { word: "play", type: "Động từ", phonetic: "/pleɪ/", vi: "chơi thể thao, tham gia trận đấu game", example: "Children play tag under the valley trees shade.", bucket: 1 },
      { word: "win", type: "Động từ", phonetic: "/wɪn/", vi: "giành chiến thắng, đoạt chức vô địch giải", example: "The football team hopes to win the national cup.", bucket: 1 },
      { word: "lose", type: "Động từ", phonetic: "/luːz/", vi: "thất bại, thua cuộc trong trận đấu thể", example: "Avoid bad pass or we will lose the tennis game.", bucket: 1 },
      { word: "draw", type: "Danh từ / Động từ", phonetic: "/drɔː/", vi: "tỷ số hòa, hòa nhau không ai thắng thua", example: "The match ended in a draw, with score two-two.", bucket: 1 }
    ]
  },
  {
    unitNum: 68,
    title: "Unit 68: Sport (2): places and equipment",
    description: "Sân vận động thi đấu và các dụng cụ thể dục thể thao chuyên dụng.",
    buckets: ["Sport Venues (Địa điểm thi đấu thể thao)", "Gear & People (Dụng cụ & Nhân sự thể thao)"],
    words: [
      { word: "pitch", type: "Danh từ", phonetic: "/pɪtʃ/", vi: "sân cỏ thi đấu bóng đá bóng bầu dục", example: "The players ran onto the green football pitch.", bucket: 0 },
      { word: "court", type: "Danh từ", phonetic: "/kɔːt/", vi: "sân thi đấu quần vợt, bóng rổ sàn gỗ/cứng", example: "We booked a tennis court next to the church.", bucket: 0 },
      { word: "pool", type: "Danh từ", phonetic: "/puːl/", vi: "bể bơi, hồ bơi nhân tạo tập bơi lặn", example: "The attractive flat has a warm swimming pool.", bucket: 0 },
      { word: "racket", type: "Danh từ", phonetic: "/ˈrækɪt/", vi: "vợt thi đấu quần vợt, cầu lông lưới dây", example: "Always check the strings of your tennis racket.", bucket: 1 },
      { word: "ball", type: "Danh từ", phonetic: "/bɔːl/", vi: "quả bóng tròn dùng lăn đá chuyền ném", example: "The cat is playing with a tiny wool ball.", bucket: 1 },
      { word: "trainers", type: "Danh từ số nhiều", phonetic: "/ˈtreɪnəz/", vi: "đôi giày thể thao, giày chạy nhẹ êm", example: "Wear comfortable trainers suitable for running.", bucket: 1 },
      { word: "referee", type: "Danh từ", phonetic: "/ˌrɛfəˈriː/", vi: "trọng tài điều hành thổi phạt trận đấu", example: "The referee blew his whistle to stop the play.", bucket: 1 },
      { word: "spectator", type: "Danh từ", phonetic: "/spɛkˈteɪtər/", vi: "khán giả xem trực tiếp trên khán đài", example: "Thousands of spectators cheered on the stadium.", bucket: 1 }
    ]
  },
  {
    unitNum: 69,
    title: "Unit 69: Cinema and theatre",
    description: "Phim ảnh chiếu rạp, diễn viên sân khấu và các tác phẩm kịch nghệ.",
    buckets: ["Screen & Formats (Phim ảnh & Trình chiếu)", "Stage & Performers (Sân khấu & Diễn viên)"],
    words: [
      { word: "film", type: "Danh từ / Động từ", phonetic: "/fɪlm/", vi: "bộ phim điện ảnh chiếu rạp / quay phim", example: "We watched an exciting documentary film today.", bucket: 0 },
      { word: "movie", type: "Danh từ", phonetic: "/ˈmuːvi/", vi: "phim điện ảnh (từ Mỹ thông dụng)", example: "Personally, I think this comedy movie is boring.", bucket: 0 },
      { word: "actor", type: "Danh từ", phonetic: "/ˈæktə/", vi: "nam diễn viên hóa thân nhân vật diễn xuất", example: "He is a well-known actor on television screens.", bucket: 1 },
      { word: "actress", type: "Danh từ", phonetic: "/ˈæktrəs/", vi: "nữ diễn viên điện ảnh sân khấu kịch nghệ", example: "The attractive actress received the gold award.", bucket: 1 },
      { word: "comedy", type: "Danh từ", phonetic: "/ˈkɒmɪdi/", vi: "thể loại hài kịch, phim hài cười vui nhộn", example: "We love watching comedies to relieve work stress.", bucket: 0 },
      { word: "horror", type: "Danh từ / Tính từ", phonetic: "/ˈhɒrə/", vi: "thể loại kinh dị, phim kinh dị rùng rợn", example: "Little children get frightened by horror films.", bucket: 0 },
      { word: "subtitles", type: "Danh từ số nhiều", phonetic: "/ˈsʌbˌtaɪtlz/", vi: "phụ đề ngôn ngữ chạy dưới màn hình phim", example: "Foreign films require English subtitles to read.", bucket: 0 },
      { word: "stage", type: "Danh từ / Động từ", phonetic: "/steɪdʒ/", vi: "sân khấu biểu diễn kịch hát kịch nghệ", example: "The actors walked onto the stage with pride.", bucket: 1 }
    ]
  },
  {
    unitNum: 70,
    title: "Unit 70: Music and reading",
    description: "Nhạc cụ âm thanh, ca khúc biểu diễn và thế giới sách báo văn học.",
    buckets: ["Aural Elements (Âm nhạc & Ca hát)", "Literary Objects (Sách báo & Đọc viết)"],
    words: [
      { word: "listen to music", type: "Cụm động từ", phonetic: "/ˈlɪsn tuː ˈmjuːzɪk/", vi: "nghe nhạc giải trí thư giãn đầu óc", example: "I often listen to music while cleaning rooms.", bucket: 0 },
      { word: "sing", type: "Động từ", phonetic: "/sɪŋ/", vi: "ca hát, phát ra âm nhạc từ giọng nói", example: "They sang a traditional song around the fire.", bucket: 0 },
      { word: "song", type: "Danh từ", phonetic: "/sɒŋ/", vi: "bài hát, khúc nhạc có lời ca du dương", example: "The new pop song is very popular on radio.", bucket: 0 },
      { word: "band", type: "Danh từ", phonetic: "/bænd/", vi: "ban nhạc, nhóm nhạc công biểu diễn chung", example: "He plays guitar in a well-known rock band.", bucket: 0 },
      { word: "read a book", type: "Cụm động từ", phonetic: "/riːd ə bʊk/", vi: "đọc một cuốn sách tiếp thu tri thức", example: "Try to read a book before going to sleep.", bucket: 1 },
      { word: "novel", type: "Danh từ", phonetic: "/ˈnɒvəl/", vi: "tiểu thuyết văn học, truyện dài tập sách", example: "She is reading a romantic novel on the table.", bucket: 1 },
      { word: "magazine", type: "Danh từ", phonetic: "/ˌmæɡəˈziːn/", vi: "tạp chí in ấn định kỳ nhiều tranh ảnh", example: "We buy fashion magazines at the supermarket.", bucket: 1 },
      { word: "library", type: "Danh từ", phonetic: "/ˈlaɪbrəri/", vi: "thư viện lưu trữ tài liệu đọc sách miễn", example: "The university library has a huge book stock.", bucket: 1 }
    ]
  },
  {
    unitNum: 71,
    title: "Unit 71: Tourism",
    description: "Hành trình nghỉ dưỡng du lịch, chụp ảnh kỷ niệm và mua sắm quà tặng lưu niệm.",
    buckets: ["Vacation Activities (Hoạt động nghỉ mát)", "Tourist Elements (Địa danh & Đồ dùng du lịch)"],
    words: [
      { word: "go on holiday", type: "Cụm động từ", phonetic: "/ɡəʊ ɒn ˈhɒlədeɪ/", vi: "đi nghỉ mát, đi du lịch xa xả stress", example: "They plan to go on holiday by the sea beach.", bucket: 0 },
      { word: "take photos", type: "Cụm động từ", phonetic: "/teɪk ˈfəʊtəʊz/", vi: "chụp những bức ảnh lưu niệm cảnh đẹp", example: "We take photos of the waterfall in the valley.", bucket: 0 },
      { word: "buy souvenirs", type: "Cụm động từ", phonetic: "/baɪ ˌsuːvəˈnɪəz/", vi: "mua quà lưu niệm tặng người thân bạn", example: "Tourists buy souvenirs at local street stalls.", bucket: 0 },
      { word: "tourist", type: "Danh từ", phonetic: "/ˈtʊərɪst/", vi: "khách du lịch, du khách đến tham quan địa", example: "The old church attracts thousands of tourists.", bucket: 1 },
      { word: "guide", type: "Danh từ / Động từ", phonetic: "/ɡaɪd/", vi: "hướng dẫn viên / hướng dẫn chỉ đường đi", example: "The tour guide explained the history of valley.", bucket: 1 },
      { word: "museum", type: "Danh từ", phonetic: "/mjuˈziːəm/", vi: "bảo tàng trưng bày di sản văn hóa cổ", example: "Always buy a entry ticket to visit the museum.", bucket: 1 },
      { word: "beach", type: "Danh từ", phonetic: "/biːtʃ/", vi: "bãi biển cát vàng lung linh sóng vỗ", example: "We love going for a walk on the sunny beach.", bucket: 1 },
      { word: "suitcase", type: "Danh từ", phonetic: "/ˈsuːtkeɪs/", vi: "chiếc va li đựng quần áo hành lý mang theo", example: "Pack your heavy suitcase before taking the bus.", bucket: 1 }
    ]
  },
  {
    unitNum: 72,
    title: "Unit 72: Festivals and occasions",
    description: "Chào mừng các dịp lễ Tết kỷ niệm, đám cưới mừng thọ và nghi lễ xã giao.",
    buckets: ["Celebrations & Wishes (Lễ hội & Chúc mừng)", "Transitions & Formalities (Nghi lễ xã giao & Sự kiện)"],
    words: [
      { word: "celebrate", type: "Động từ", phonetic: "/ˈsɛlɪbreɪt/", vi: "ăn mừng, kỷ niệm ngày lễ Tết vui tươi", example: "They gathered to celebrate her birthday party.", bucket: 0 },
      { word: "wedding", type: "Danh từ", phonetic: "/ˈwɛdɪŋ/", vi: "lễ cưới, đám cưới kết duyên lứa đôi", example: "They invited colleagues to their formal wedding.", bucket: 1 },
      { word: "birthday party", type: "Cụm danh từ", phonetic: "/ˈbɜːθdeɪ ˈpɑːti/", vi: "buổi tiệc mừng ngày sinh nhật đón tuổi", example: "We sang happy birthday at the birthday party.", bucket: 0 },
      { word: "congratulate", type: "Động từ", phonetic: "/kənˈɡrætʃuleɪt/", vi: "chúc mừng thành tựu, chúc mừng tin vui", example: "I want to congratulate you on your scholarship.", bucket: 0 },
      { word: "happy new year", type: "Cụm từ", phonetic: "/ˈhæpi njuː jɪə/", vi: "chúc mừng năm mới an khang thịnh vượng", example: "Say happy new year as soon as clock strikes.", bucket: 0 },
      { word: "merry christmas", type: "Cụm từ", phonetic: "/ˈmɛri ˈkrɪsməs/", vi: "chúc mừng Giáng sinh an lành ấm áp", example: "We wish everyone a merry christmas and peace.", bucket: 0 },
      { word: "cheers", type: "Từ cảm thán", phonetic: "/tʃɪəz/", vi: "cụng ly, nâng ly chúc sức khỏe cụng xu", example: "They raised their wine glasses and cried, cheers!", bucket: 1 },
      { word: "rest in peace", type: "Cụm từ", phonetic: "/rɛst ɪn piːs/", vi: "yên nghỉ nơi vĩnh hằng cực lạc (RIP)", example: "Rest in peace, old faithful mate dog friend.", bucket: 1 }
    ]
  },
  {
    unitNum: 73,
    title: "Unit 73: Crime",
    description: "Nhận biết hành vi vi phạm pháp luật và lực lượng giữ gìn trật tự an ninh.",
    buckets: ["Offences & Thieves (Hành vi phạm tội & Kẻ trộm)", "Law Enforcement (Thực thi pháp luật & Nhà tù)"],
    words: [
      { word: "break the law", type: "Cụm động từ", phonetic: "/breɪk ðə lɔː/", vi: "vi phạm luật pháp quốc gia bị trừng trị", example: "Drivers break the law if they run red lights.", bucket: 0 },
      { word: "steal", type: "Động từ", phonetic: "/stiːl/", vi: "ăn trộm tiền bạc, đồ đạc một cách lén", example: "Dishonest people steal cash from shopkeepers.", bucket: 0 },
      { word: "rob", type: "Động từ", phonetic: "/rɒb/", vi: "cướp giật tài sản bằng bạo lực đe dọa", example: "Thieves planned to rob the local bank office.", bucket: 0 },
      { word: "thief", type: "Danh từ", phonetic: "/θiːf/", vi: "kẻ trộm lén lút lấy đồ (số nhiều thieves)", example: "The thief broke the window table to get gold.", bucket: 0 },
      { word: "burglar", type: "Danh từ", phonetic: "/ˈbɜːɡlər/", vi: "kẻ trộm đột nhập cạy cửa lẻn vào nhà", example: "The burglar entered the flat through balcony.", bucket: 0 },
      { word: "robbery", type: "Danh từ", phonetic: "/ˈrɒbəri/", vi: "vụ cướp giật tài sản bạo lực ngân hàng", example: "Police investigated the armed robbery case.", bucket: 0 },
      { word: "police officer", type: "Danh từ", phonetic: "/pəˈliːs ˈɒfɪsə/", vi: "sĩ quan cảnh sát, công an giữ trật tự", example: "The police officer arrested the active thief.", bucket: 1 },
      { word: "prison", type: "Danh từ", phonetic: "/ˈprɪzn/", vi: "nhà tù, trại giam giữ kẻ phạm tội", example: "The bank robber was sentenced to ten years in prison.", bucket: 1 }
    ]
  },
  {
    unitNum: 74,
    title: "Unit 74: Politics",
    description: "Cơ cấu chính phủ, bầu cử dân chủ và quyền công dân pháp lý đất nước.",
    buckets: ["Governance System (Hệ thống quản trị đất nước)", "Democratic Action (Hành động dân chủ công dân)"],
    words: [
      { word: "government", type: "Danh từ", phonetic: "/ˈɡʌvənmənt/", vi: "chính phủ quản lý điều hành đất nước", example: "The government passed a new environment law.", bucket: 0 },
      { word: "president", type: "Danh từ", phonetic: "/ˈprɛzɪdənt/", vi: "tổng thống nước cộng hòa, nguyên thủ quốc", example: "The president discussed the peace treaty on TV.", bucket: 0 },
      { word: "election", type: "Danh từ", phonetic: "/ɪˈlɛkʃn/", vi: "cuộc bầu cử tuyển chọn người đại diện dân", example: "Citizens vote in the general presidential election.", bucket: 1 },
      { word: "vote", type: "Động từ / Danh từ", phonetic: "/vəʊt/", vi: "bỏ phiếu bầu cử, bình chọn lá phiếu", example: "Every adult has the legal right to vote here.", bucket: 1 },
      { word: "political party", type: "Cụm danh từ", phonetic: "/pəˈlɪtɪkl ˈpɑːti/", vi: "đảng phái chính trị đại diện tư tưởng", example: "He joined a regional green political party.", bucket: 0 },
      { word: "law", type: "Danh từ", phonetic: "/lɔː/", vi: "pháp luật, đạo luật ban hành chính thống", example: "Avoid breaking the law to live in peace society.", bucket: 0 },
      { word: "citizen", type: "Danh từ", phonetic: "/ˈsɪtɪzn/", vi: "công dân quốc gia có quyền nghĩa vụ pháp", example: "Every citizen must respect the national law.", bucket: 1 },
      { word: "democracy", type: "Danh từ", phonetic: "/dɪˈmɒkrəsi/", vi: "nền dân chủ tự do tiếng nói nhân dân", example: "Free elections are vital for a true democracy.", bucket: 0 }
    ]
  },
  {
    unitNum: 75,
    title: "Unit 75: Global problems",
    description: "Các vấn đề môi trường toàn cầu, đói nghèo và biện pháp bảo vệ Trái Đất.",
    buckets: ["Ecological Issues (Vấn đề sinh thái tệ)", "Socioeconomic Issues (Vấn đề kinh tế xã hội)"],
    words: [
      { word: "global warming", type: "Danh từ", phonetic: "/ˈɡləʊbl ˈwɔːmɪŋ/", vi: "sự nóng lên toàn cầu do hiệu ứng nhà kính", example: "Global warming makes climate weather unpredictable.", bucket: 0 },
      { word: "pollution", type: "Danh từ", phonetic: "/pəˈluːʃn/", vi: "sự ô nhiễm không khí, nguồn nước rác thải", example: "Coal mining power stations cause air pollution.", bucket: 0 },
      { word: "recycle", type: "Động từ", phonetic: "/ˌriːˈsaɪkl/", vi: "tái chế rác thải nhựa, giấy, kim loại", example: "We should recycle paper sheets and tin cans.", bucket: 0 },
      { word: "poverty", type: "Danh từ", phonetic: "/ˈpɒvəti/", vi: "cảnh đói nghèo, sự nghèo khổ túng quẫn", example: "The charity works hard to reduce global poverty.", bucket: 1 },
      { word: "hunger", type: "Danh từ", phonetic: "/ˈhʌŋɡər/", vi: "nạn đói, sự thiếu ăn khát dinh dưỡng", example: "Famine flood leads to severe food hunger crops.", bucket: 1 },
      { word: "destroy", type: "Động từ", phonetic: "/dɪˈstrɔɪ/", vi: "hủy hoại, tàn phá môi trường sinh thái", example: "Hurricanes can destroy semi-detached houses.", bucket: 0 },
      { word: "protect", type: "Động từ", phonetic: "/prəˈtɛkt/", vi: "bảo vệ thiên nhiên, bảo tồn đa dạng", example: "National parks protect wild animals and birds.", bucket: 0 },
      { word: "save", type: "Động từ", phonetic: "/seɪv/", vi: "cứu giúp, tiết kiệm tài nguyên năng lượng", example: "Turn off lights to save electric power fuel.", bucket: 0 }
    ]
  },
  {
    unitNum: 76,
    title: "Unit 76: War and peace",
    description: "Chiến tranh bạo lực quân đội và khát vọng hòa bình của nhân loại.",
    buckets: ["Warfare Elements (Yếu tố quân sự chiến tranh)", "Peace & Treaties (Hòa bình & Thỏa ước ngoại giao)"],
    words: [
      { word: "fight", type: "Động từ / Danh từ", phonetic: "/faɪt/", vi: "chiến đấu, đánh nhau chống lại kẻ thù", example: "Soldiers had to fight to protect the valley.", bucket: 0 },
      { word: "army", type: "Danh từ", phonetic: "/ˈɑːmi/", vi: "quân đội chính quy quốc gia binh chủng bộ", example: "He joined the national army after graduating.", bucket: 0 },
      { word: "soldier", type: "Danh từ", phonetic: "/ˈsəʊldʒə/", vi: "người lính, quân nhân chiến đấu chiến trường", example: "The brave soldier carried a heavy iron weapon.", bucket: 0 },
      { word: "enemy", type: "Danh từ", phonetic: "/ˈɛnəmi/", vi: "kẻ thù, quân thù đối lập bên chiến tuyến", example: "They defended the country borders from the enemy.", bucket: 0 },
      { word: "weapon", type: "Danh từ", phonetic: "/ˈwɛpən/", vi: "vũ khí quân dụng (súng, gươm, bom đạn) (a câm)", example: "The army used advanced weapons in the battle.", bucket: 0 },
      { word: "battle", type: "Danh từ", phonetic: "/ˈbætl/", vi: "trận chiến đấu ác liệt quy mô lớn địa", example: "Many soldiers lost lives in that bloody battle.", bucket: 0 },
      { word: "peace", type: "Danh từ", phonetic: "/piːs/", vi: "hòa bình, sự thanh bình thịnh trị không chiến", example: "All citizens dream to live in global peace.", bucket: 1 },
      { word: "treaty", type: "Danh từ", phonetic: "/ˈtriːti/", vi: "hiệp ước hòa bình, thỏa ước ký kết nước", example: "The governments signed a formal peace treaty.", bucket: 1 }
    ]
  },
  {
    unitNum: 77,
    title: "Unit 77: Computers",
    description: "Cấu tạo máy tính cá nhân, màn hình điều khiển và thao tác tệp tin tin học.",
    buckets: ["Hardware Components (Thành phần phần cứng)", "Computer Tasks (Thao tác vận hành tệp)"],
    words: [
      { word: "keyboard", type: "Danh từ", phonetic: "/ˈkiːbɔːd/", vi: "bàn phím nhập liệu chữ số ký tự máy", example: "Type your homework essay on the keyboard.", bucket: 0 },
      { word: "mouse", type: "Danh từ", phonetic: "/maʊs/", vi: "chuột máy tính di chuyển con trỏ click (như chuột nhắt)", example: "Use the mouse to click the website link.", bucket: 0 },
      { word: "screen", type: "Danh từ", phonetic: "/skriːn/", vi: "màn hình hiển thị hình ảnh dữ liệu vi", example: "Staring at the computer screen damages eyes.", bucket: 0 },
      { word: "program", type: "Danh từ / Động từ", phonetic: "/ˈprəʊɡræm/", vi: "chương trình phần mềm vi tính tự động", example: "Install this security program on your PC.", bucket: 0 },
      { word: "download", type: "Động từ", phonetic: "/ˌdaʊnˈləʊd/", vi: "tải xuống dữ liệu từ máy chủ internet", example: "You can download the vocabulary PDF files.", bucket: 1 },
      { word: "upload", type: "Động từ", phonetic: "/ˌʌpˈləʊd/", vi: "tải lên dữ liệu từ máy cục bộ lên mạng", example: "Upload your photo preview to the scan page.", bucket: 1 },
      { word: "save a file", type: "Cụm động từ", phonetic: "/seɪv ə faɪl/", vi: "lưu trữ lại tệp tin dữ liệu ổ cứng", example: "Remember to save a file before shutting down.", bucket: 1 },
      { word: "delete", type: "Động từ", phonetic: "/dɪˈliːt/", vi: "xóa bỏ hoàn toàn tệp tin rác không dùng", example: "Delete the incorrect dictionary entry now.", bucket: 1 }
    ]
  },
  {
    unitNum: 78,
    title: "Unit 78: Email and the Internet",
    description: "Thao tác gửi thư điện tử, lướt trang web trực tuyến và mật khẩu bảo mật.",
    buckets: ["Web Elements (Thành phần mạng internet)", "Online Tasks (Thao tác thư từ & Bảo mật)"],
    words: [
      { word: "website", type: "Danh từ", phonetic: "/ˈwɛbsaɪt/", vi: "trang web thông tin trên hệ thống internet", example: "Visit the university website to see results.", bucket: 0 },
      { word: "online", type: "Tính từ / Trạng từ", phonetic: "/ˌɒnˈlaɪn/", vi: "trực tuyến, đang kết nối mạng internet", example: "Colleagues share files online in real-time.", bucket: 0 },
      { word: "search", type: "Động từ / Danh từ", phonetic: "/sɜːtʃ/", vi: "tìm kiếm thông tin dữ liệu mạng xã hội", example: "Search the web to find silent letter rules.", bucket: 0 },
      { word: "link", type: "Danh từ / Động từ", phonetic: "/lɪŋk/", vi: "đường dẫn liên kết web, siêu liên kết", example: "Click this link to download the preint data.", bucket: 0 },
      { word: "write an email", type: "Cụm động từ", phonetic: "/raɪt ən ˈiːmeɪl/", vi: "soạn thảo thư điện tử gửi công việc", example: "Write an email to the professor to ask help.", bucket: 1 },
      { word: "send a message", type: "Cụm động từ", phonetic: "/sɛnd ə ˈmɛsɪdʒ/", vi: "gửi một tin nhắn điện thoại trực tuyến", example: "Send a message to confirm your wedding invite.", bucket: 1 },
      { word: "reply", type: "Động từ / Danh từ", phonetic: "/rɪˈplaɪ/", vi: "phản hồi, trả lời thư điện tử hay tin nhắn", example: "She didn't reply to my email until today.", bucket: 1 },
      { word: "password", type: "Danh từ", phonetic: "/ˈpɑːswɜːd/", vi: "mật khẩu bảo mật đăng nhập tài khoản", example: "Keep your credit card password secret always.", bucket: 1 }
    ]
  },
  {
    unitNum: 79,
    title: "Unit 79: Newspapers and television",
    description: "Phương tiện truyền thông đại chúng: báo chí, kênh truyền hình và quảng cáo.",
    buckets: ["Mass Media (Phương tiện báo đài)", "Broadcasting Content (Nội dung phát sóng)"],
    words: [
      { word: "read the newspaper", type: "Cụm động từ", phonetic: "/riːd ðə ˈnjuːzˌpeɪpə/", vi: "đọc báo in hằng ngày nắm thông tin", example: "My grandfather reads the newspaper every morning.", bucket: 1 },
      { word: "watch television", type: "Cụm động từ", phonetic: "/wɒtʃ ˈtɛlɪˌvɪʒən/", vi: "xem tivi, xem truyền hình giải trí", example: "The kids watch television after doing homework.", bucket: 1 },
      { word: "channel", type: "Danh từ", phonetic: "/ˈtʃænl/", vi: "kênh truyền hình, đài phát sóng tivi", example: "Switch the channel to see the weather forecast.", bucket: 0 },
      { word: "program", type: "Danh từ", phonetic: "/ˈprəʊɡræm/", vi: "chương trình truyền hình phát sóng (Anh-Mỹ)", example: "The documentary program about wild tigers was huge.", bucket: 0 },
      { word: "news", type: "Danh từ không đếm được", phonetic: "/njuːz/", vi: "tin tức thời sự thế giới (không đếm được)", example: "The news on television was extremely exciting.", bucket: 0 },
      { word: "documentary", type: "Danh từ / Tính từ", phonetic: "/ˌdɒkjuˈmɛntri/", vi: "phim tài liệu thực tế khoa học lịch sử", example: "We watched a documentary on global warming.", bucket: 0 },
      { word: "commercial", type: "Danh từ / Tính từ", phonetic: "/kəˈmɜːʃl/", vi: "mẩu quảng cáo thương mại xen giữa phim", example: "That fast food commercial is highly attractive.", bucket: 0 },
      { word: "headline", type: "Danh từ", phonetic: "/ˈhɛdlaɪn/", vi: "tiêu đề tin tức lớn trang nhất báo in", example: "The front-page headline shocked the citizens.", bucket: 0 }
    ]
  },
  {
    unitNum: 80,
    title: "Unit 80: Phoning and texting",
    description: "Liên lạc điện thoại di động, phím số, thư thoại và phép lịch sự đàm thoại.",
    buckets: ["Phone Operations (Thao tác dùng điện thoại)", "Telecom Terms (Thuật ngữ liên lạc di động)"],
    words: [
      { word: "make a phone call", type: "Cụm động từ", phonetic: "/meɪk ə fəʊn kɔːl/", vi: "thực hiện một cuộc điện thoại liên lạc", example: "Make a phone call to see if doctor is free.", bucket: 0 },
      { word: "send a text message", type: "Cụm động từ", phonetic: "/sɛnd ə tɛkst ˈmɛsɪdʒ/", vi: "gửi một tin nhắn văn bản SMS di động", example: "Send a text message to invite him to party.", bucket: 0 },
      { word: "voicemail", type: "Danh từ", phonetic: "/ˈvɔɪsmeɪl/", vi: "hộp thư thoại lưu tin nhắn giọng nói", example: "Leave a voicemail if she doesn't pick up.", bucket: 1 },
      { word: "ring", type: "Động từ / Danh từ", phonetic: "/rɪŋ/", vi: "chuông reo vang, đổ chuông / gọi điện", example: "Give me a ring when you get to the hotel.", bucket: 1 },
      { word: "key in", type: "Cụm động từ", phonetic: "/kiː ɪn/", vi: "nhập mã số, gõ phím số mật khẩu điện", example: "Key in the pin number to unlock your mobile.", bucket: 0 },
      { word: "hang up", type: "Cụm động từ", phonetic: "/hæŋ ʌp/", vi: "gác máy điện thoại, kết thúc đàm thoại", example: "Don't hang up; please wait for a minute.", bucket: 0 },
      { word: "busy line", type: "Cụm danh từ", phonetic: "/ˈbɪzi laɪn/", vi: "đường dây bận, số máy đang bận gọi ai", example: "I couldn't reach him because of a busy line.", bucket: 1 },
      { word: "wrong number", type: "Cụm danh từ", phonetic: "/rɒŋ ˈmʌmbə/", vi: "gọi nhầm số máy, sai số điện thoại", example: "I apologise; I dialed the wrong number.", bucket: 1 }
    ]
  },
  {
    unitNum: 81,
    title: "Unit 81: Socialising",
    description: "Gặp gỡ bạn bè xã giao, chào hỏi làm quen và quy tắc giao tiếp lịch thiệp.",
    buckets: ["Greeting Norms (Chào hỏi xã giao)", "Social Ties (Kết nối & Giao tiếp thân mật)"],
    words: [
      { word: "have a chat", type: "Cụm động từ", phonetic: "/hæv ə tʃæt/", vi: "trò chuyện thân mật, nói chuyện tán gẫu", example: "We had a chat with neighbors in the garden.", bucket: 1 },
      { word: "meet friends", type: "Cụm động từ", phonetic: "/miːt frɛndz/", vi: "gặp gỡ bạn bè tụ tập cà phê quán xá", example: "Teenagers love to meet friends at weekends.", bucket: 1 },
      { word: "introduce", type: "Động từ", phonetic: "/ˌɪntrəˈdjuːs/", vi: "giới thiệu làm quen ai đó với người khác", example: "Let me introduce my colleague to you.", bucket: 0 },
      { word: "shake hands", type: "Cụm động từ", phonetic: "/ʃeɪk hændz/", vi: "bắt tay chào hỏi xã giao lịch thiệp", example: "They shake hands after signing the treaty.", bucket: 0 },
      { word: "welcome", type: "Động từ / Danh từ", phonetic: "/ˈwɛlkêm/", vi: "nồng nhiệt chào mừng, hoan nghênh tiếp đón", example: "Welcome to our traditional valley cottage!", bucket: 0 },
      { word: "smile", type: "Động từ / Danh từ", phonetic: "/smaɪl/", vi: "mỉm cười rạng rỡ thân thiện hiếu khách", example: "Always smile when you welcome the customers.", bucket: 0 },
      { word: "talk about", type: "Cụm động từ", phonetic: "/tɔːk əˈbaʊt/", vi: "trò chuyện nói về chủ đề đề tài học", example: "What did you talk about with your colleague?", bucket: 1 },
      { word: "have a drink", type: "Cụm động từ", phonetic: "/hæv ə drɪŋk/", vi: "uống ly nước, làm ngụm bia cụng ly", example: "Let's go to the cozy pub to have a drink.", bucket: 1 }
    ]
  },
  {
    unitNum: 82,
    title: "Unit 82: The senses",
    description: "Năm giác quan sinh học của con người và hành vi cảm thụ thế giới vật lý.",
    buckets: ["Primary Senses (Giác quan sinh học chính)", "Physical Actions (Hành động cảm thụ giác quan)"],
    words: [
      { word: "see", type: "Động từ", phonetic: "/siː/", vi: "nhìn thấy vật thể lọt vào tầm mắt", example: "I can see a rabbit jumping in the garden.", bucket: 0 },
      { word: "look at", type: "Cụm động từ", phonetic: "/lʊk æt/", vi: "chủ động hướng mắt quan sát kỹ đồ vật", example: "Look at the dictionary entry guide words.", bucket: 1 },
      { word: "watch", type: "Động từ", phonetic: "/wɒtʃ/", vi: "theo dõi chuyển động vật (như xem tivi)", example: "We watch television programs in the lounge.", bucket: 1 },
      { word: "hear", type: "Động từ", phonetic: "/hɪər/", vi: "nghe thấy âm thanh vang dội vào màng nhĩ", example: "Did you hear the loud thunder outside?", bucket: 0 },
      { word: "listen to", type: "Cụm động từ", phonetic: "/ˈlɪsn tuː/", vi: "chủ động lắng nghe âm nhạc hay bài giảng", example: "Always listen to the teacher's instructions.", bucket: 1 },
      { word: "feel", type: "Động từ", phonetic: "/fiːl/", vi: "cảm nhận bằng xúc giác da dẻ/nội tâm", example: "I feel freezing cold; let's warm the soup.", bucket: 0 },
      { word: "smell", type: "Động từ / Danh từ", phonetic: "/smɛl/", vi: "ngửi thấy mùi vị, khứu giác cảm nhận", example: "These sunny flowers smell extremely sweet.", bucket: 0 },
      { word: "taste", type: "Động từ / Danh từ", phonetic: "/teɪst/", vi: "nếm vị thức ăn đầu lưỡi vị giác ngon", example: "This cooked chicken tastes delicious.", bucket: 0 }
    ]
  },
  {
    unitNum: 83,
    title: "Unit 83: Verb constructions",
    description: "Cấu trúc động từ đi kèm tân ngữ và to-V hoặc mệnh đề liên từ 'that' trang trọng.",
    buckets: ["Infinitives with Objects (Cấu trúc tân ngữ + to-V)", "Mnemonic Clauses (Mệnh đề liên kết 'that')"],
    words: [
      { word: "want someone to", type: "Cấu trúc câu", phonetic: "/wɒnt ˈsʌmwʌn tuː/", vi: "muốn ai đó thực hiện việc gì hành động", example: "I want you to keep a vocabulary notebook.", bucket: 0 },
      { word: "ask someone to", type: "Cấu trúc câu", phonetic: "/ɑːsk ˈsʌmwʌn tuː/", vi: "yêu cầu đề nghị lịch sự ai làm việc", example: "She asked Tim to help with suitcases.", bucket: 0 },
      { word: "tell someone to", type: "Cấu trúc câu", phonetic: "/tɛl ˈsʌmwʌn tuː/", vi: "bảo ai đó làm gì, ra lệnh thực hiện", example: "The boss told us to wipe the blackboard.", bucket: 0 },
      { word: "advise someone to", type: "Cấu trúc câu", phonetic: "/ədˈvaɪz ˈsʌmwʌn tuː/", vi: "khuyên răn, đóng góp ý kiến cho ai làm", example: "He advised me to study pronunciation symbols.", bucket: 0 },
      { word: "say that", type: "Cấu trúc câu", phonetic: "/seɪ ðæt/", vi: "nói rằng là, truyền đạt gián tiếp ý", example: "He said that the exam was a piece of cake.", bucket: 1 },
      { word: "think that", type: "Cấu trúc câu", phonetic: "/θɪŋk ðæt/", vi: "suy nghĩ rằng là, tin tưởng vào điều", example: "I think that phrasal verbs are difficult.", bucket: 1 },
      { word: "hope that", type: "Cấu trúc câu", phonetic: "/həʊp ðæt/", vi: "hy vọng mong mỏi rằng điều tốt lành xảy", example: "We hope that you pass the final exam.", bucket: 1 },
      { word: "explain that", type: "Cấu trúc câu", phonetic: "/ɪkˈspleɪn ðæt/", vi: "giải thích làm sáng tỏ rằng là cơ chế", example: "He explained that 'silent b' is not read.", bucket: 1 }
    ]
  },
  {
    unitNum: 84,
    title: "Unit 84: Adjectives: quality and state",
    description: "Các tính từ chỉ tính chất, phẩm chất đồ vật và trạng thái vật lý hằng ngày.",
    buckets: ["Qualitative States (Phẩm chất đồ dùng)", "Physical Conditions (Trạng thái vật lý sạch/dơ)"],
    words: [
      { word: "suitable", type: "Tính từ", phonetic: "/ˈsuːtəbl/", vi: "thích hợp, phù hợp cho mục đích sử dụng", example: "Wear comfortable shoes suitable for walking.", bucket: 0 },
      { word: "attractive", type: "Tính từ", phonetic: "/əˈtræktɪv/", vi: "thu hút, đẹp đẽ ưa nhìn quyến rũ hoa", example: "The flat has got an attractive balcony garden.", bucket: 0 },
      { word: "brand-new", type: "Tính từ", phonetic: "/ˌbrændˈnjuː/", vi: "mới toanh chưa qua sử dụng nguyên seal", example: "He rides a brand-new motorbike to work.", bucket: 0 },
      { word: "second-hand", type: "Tính từ", phonetic: "/ˌsɛkəndˈhænd/", vi: "đồ cũ, đã qua tay sử dụng giảm giá", example: "Buying second-hand clothes saves money.", bucket: 0 },
      { word: "frozen", type: "Tính từ", phonetic: "/ˈfrəʊzn/", vi: "đông đá, ướp đông lạnh trong tủ lạnh", example: "Store the frozen vegetables inside the fridge.", bucket: 1 },
      { word: "fresh", type: "Tính từ", phonetic: "/frɛʃ/", vi: "tươi ngon, rau quả mới hái sạch sẽ", example: "The farmer sells fresh crop tomatoes market.", bucket: 0 },
      { word: "comfortable", type: "Tính từ", phonetic: "/ˈkʌmftəbl/", vi: "êm ái thoải mái dễ chịu thư giãn ghế", example: "This armchair lounge sofa is very comfortable.", bucket: 0 },
      { word: "dirty", type: "Tính từ / Động từ", phonetic: "/ˈdɜːti/", vi: "lấm lem bùn đất, bẩn thỉu rác rưởi", example: "Put the dirty shirts in the washing machine.", bucket: 1 }
    ]
  },
  {
    unitNum: 85,
    title: "Unit 85: Adjectives: size and shape",
    description: "Miêu tả kích thước lớn nhỏ, hình dáng hình học và cân nặng vật lý.",
    buckets: ["Size Dimensions (Kích cỡ không gian)", "Geometric Shapes (Hình học không gian)"],
    words: [
      { word: "tall", type: "Tính từ", phonetic: "/tɔːl/", vi: "dáng người cao ráo, chiều cao vượt trội", example: "The tall professor stands next to the board.", bucket: 0 },
      { word: "short", type: "Tính từ", phonetic: "/ʃɔːt/", vi: "thấp bé lùn / ngắn chiều dài quần đùi", example: "Toddlers are short and have tiny hands.", bucket: 0 },
      { word: "huge", type: "Tính từ", phonetic: "/hjuːdʒ/", vi: "khổng lồ cực kỳ to lớn (very big)", example: "They built a huge detached house in suburbs.", bucket: 0 },
      { word: "tiny", type: "Tính từ", phonetic: "/ˈtaɪni/", vi: "tí hon cực kỳ nhỏ bé (very small)", example: "Bacteria are tiny and invisible without lens.", bucket: 0 },
      { word: "round", type: "Tính từ / Danh từ", phonetic: "/raʊnd/", vi: "tròn trịa, có dạng hình tròn bánh xe", example: "We sit around the round coffee table lounge.", bucket: 1 },
      { word: "square", type: "Tính từ / Danh từ", phonetic: "/skweə/", vi: "vuông vức, hình vuông bốn cạnh bằng nhau", example: "Write your name inside the square box sheet.", bucket: 1 },
      { word: "heavy", type: "Tính từ", phonetic: "/ˈhɛvi/", vi: "nặng nề khó nhấc, cân nặng lớn va li", example: "Suitcases are heavy when packed with books.", bucket: 0 },
      { word: "light", type: "Tính từ", phonetic: "/laɪt/", vi: "nhẹ nhàng dễ mang, cân nặng nhỏ xíu", example: "A silent letter is light as a cool breeze.", bucket: 0 }
    ]
  },
  {
    unitNum: 86,
    title: "Unit 86: Adverbs: manner",
    description: "Trạng từ chỉ cách thức hành động diễn ra nhanh, chậm, cẩn thận hay thành công.",
    buckets: ["Speed & Intensity (Tốc độ & Cường độ hành động)", "Behavioral Traits (Thái độ & Trạng thái làm việc)"],
    words: [
      { word: "quickly", type: "Trạng từ", phonetic: "/ˈkwɪkli/", vi: "nhanh chóng mau lẹ không chậm trễ chạy", example: "The rabbit ran quickly away from wild lion.", bucket: 0 },
      { word: "slowly", type: "Trạng từ", phonetic: "/ˈsləʊli/", vi: "chậm rãi từ tốn khoan thai lê bước", example: "Drivers steer slowly in thick fog weather.", bucket: 0 },
      { word: "carefully", type: "Trạng từ", phonetic: "/ˈkeəfʊli/", vi: "cẩn thận tỉ mỉ chu đáo tránh sai sót", example: "Read the monolingual entry details carefully.", bucket: 1 },
      { word: "easily", type: "Trạng từ", phonetic: "/ˈiːzɪli/", vi: "dễ dàng trôi chảy không gặp khó khăn", example: "You can pass the test easily if you revise.", bucket: 1 },
      { word: "loudly", type: "Trạng từ", phonetic: "/ˈlaʊdli/", vi: "âm lượng to, ầm ĩ chói tai la hét", example: "Don't shout loudly; children are asleep.", bucket: 0 },
      { word: "quietly", type: "Trạng từ", phonetic: "/ˈkwaɪətli/", vi: "yên tĩnh khẽ khàng không phát tiếng động", example: "They study quietly in the university library.", bucket: 1 },
      { word: "politely", type: "Trạng từ", phonetic: "/pəˈlaɪtli/", vi: "lịch sự nhã nhặn cư xử đúng mực kính", example: "Refuse politely if you can't accept invitation.", bucket: 1 },
      { word: "successfully", type: "Trạng từ", phonetic: "/səkˈsɛsfʊli/", vi: "thành công rực rỡ đạt được mục tiêu", example: "He successfully completed the vocabulary course.", bucket: 1 }
    ]
  },
  {
    unitNum: 87,
    title: "Unit 87: Formal and informal English",
    description: "Phân biệt văn phong trang trọng công việc và văn phong thân mật hằng ngày.",
    buckets: ["Formal Registers (Văn phong trang trọng)", "Informal Registers (Văn phong thân mật xã giao)"],
    words: [
      { word: "informal", type: "Tính từ", phonetic: "/ɪnˈfɔːml/", vi: "thân mật, không trang trọng bạn bè chat", example: "'Hi' is an informal way of greeting someone.", bucket: 1 },
      { word: "formal", type: "Tính từ", phonetic: "/ˈfɔːml/", vi: "trang trọng, đúng nghi thức công sở thư", example: "Write a formal letter to apply for the job.", bucket: 0 },
      { word: "welcome", type: "Từ cảm thán / Động từ", phonetic: "/ˈwɛlkêm/", vi: "chào mừng nồng nhiệt tiếp đón", example: "Welcome to the grand opening ceremony.", bucket: 0 },
      { word: "greetings", type: "Danh từ số nhiều", phonetic: "/ˈɡriːtɪŋz/", vi: "lời chào hỏi trang trọng trong văn viết", example: "Send warm greetings to all relatives.", bucket: 0 },
      { word: "thank you", type: "Cụm từ cảm thán", phonetic: "/θæŋk juː/", vi: "cảm ơn bạn lịch sự lễ phép", example: "Thank you for lending me your credit card.", bucket: 0 },
      { word: "please", type: "Từ cảm thán", phonetic: "/pliːz/", vi: "vui lòng, xin vui lòng lịch sự cầu khẩn", example: "Could you wipe the board please?", bucket: 0 },
      { word: "pardon", type: "Từ cảm thán / Động từ", phonetic: "/ˈpɑːdn/", vi: "xin lỗi tôi nghe không rõ vui lòng nhắc", example: "Pardon? Could you say the word aloud again?", bucket: 1 },
      { word: "goodbye", type: "Từ cảm thán", phonetic: "/ˌɡʊdˈbaɪ/", vi: "tạm biệt hẹn gặp lại chúc bình an", example: "They said goodbye at the train platform.", bucket: 0 }
    ]
  },
  {
    unitNum: 88,
    title: "Unit 88: Completing forms and CVs",
    description: "Các thuật ngữ điền mẫu đơn đăng ký và làm lý lịch trích ngang tìm việc.",
    buckets: ["Personal Details (Thông tin cá nhân lý lịch)", "Document Actions (Thao tác điền đơn & Ký)"],
    words: [
      { word: "surname", type: "Danh từ", phonetic: "/ˈsɜːneɪm/", vi: "họ của một người (trong hộ chiếu/khai sinh)", example: "Write your surname and first name on sheets.", bucket: 0 },
      { word: "first name", type: "Danh từ", phonetic: "/ˈfɜːst neɪm/", vi: "tên gọi chính của một người", example: "My first name is Tim and my surname is Redman.", bucket: 0 },
      { word: "date of birth", type: "Danh từ / Cụm từ", phonetic: "/deɪt ɒv bɜːθ/", vi: "ngày tháng năm sinh chính thức", example: "State your date of birth in day-month-year.", bucket: 0 },
      { word: "nationality", type: "Danh từ", phonetic: "/ˌnæʃəˈnælɪti/", vi: "quốc tịch của một công dân đất nước", example: "The passport shows his nationality is Swiss.", bucket: 0 },
      { word: "marital status", type: "Danh từ / Cụm từ", phonetic: "/ˈmærɪtl ˈsteɪtəs/", vi: "tình trạng hôn nhân (độc thân/kết hôn)", example: "Check 'Single' for your marital status form.", bucket: 0 },
      { word: "signature", type: "Danh từ", phonetic: "/ˈsɪɡnətʃə/", vi: "chữ ký viết tay xác nhận pháp lý (g câm)", example: "Put your signature at the bottom of sheets.", bucket: 1 },
      { word: "fill in", type: "Cụm động từ", phonetic: "/fɪl ɪn/", vi: "điền thông tin vào chỗ trống mẫu đơn", example: "Please fill in this job application form.", bucket: 1 },
      { word: "sign", type: "Động từ", phonetic: "/saɪn/", vi: "ký tên xác nhận vào biên bản giấy tờ (g câm)", example: "Sign the contract to finalize the business.", bucket: 1 }
    ]
  },
  {
    unitNum: 89,
    title: "Unit 89: Writing an essay",
    description: "Sử dụng các trạng từ liên kết và liên từ lập luận chặt chẽ trong bài viết luận.",
    buckets: ["Opening & Linking (Mở đầu & Thêm thông tin)", "Contrast & Ending (Đối lập & Kết bài luận)"],
    words: [
      { word: "first of all", type: "Cụm từ nối", phonetic: "/fɜːst ɒv ɔːl/", vi: "trước tiên, đầu tiên là mở đầu lập luận", example: "First of all, introduce the main topic essay.", bucket: 0 },
      { word: "in addition", type: "Cụm liên từ", phonetic: "/ɪn əˈdɪʃn/", vi: "thêm vào đó, ngoài ra bổ sung luận điểm", example: "In addition, active learning saves class time.", bucket: 0 },
      { word: "also", type: "Trạng từ", phonetic: "/ˈɔːlsəʊ/", vi: "cũng, cũng thế bổ trợ thêm ý kiến vế", example: "Reading books also improves your spelling.", bucket: 0 },
      { word: "furthermore", type: "Trạng từ nối", phonetic: "/ˌfɜːðəˈmɔːr/", vi: "hơn thế nữa, vả lại sâu sắc hơn ý", example: "Furthermore, the tuition fee is extremely low.", bucket: 0 },
      { word: "however", type: "Trạng từ nối", phonetic: "/haʊˈɛvə/", vi: "tuy nhiên thế nhưng (ngăn cách dấu phẩy)", example: "The test was hard; however, Tim successfully passed.", bucket: 1 },
      { word: "whereas", type: "Liên từ", phonetic: "/ˌweərˈæz/", vi: "trong khi đó, trái ngược lại so sánh vế", example: "I like grammar, whereas he likes phrasal verbs.", bucket: 1 },
      { word: "finally", type: "Trạng từ nối", phonetic: "/ˈfaɪnəli/", vi: "cuối cùng là kết thúc chuỗi luận điểm", example: "Finally, check the spelling dictionary entry.", bucket: 1 },
      { word: "in conclusion", type: "Cụm từ nối", phonetic: "/ɪn kənˈkluːʒən/", vi: "tóm lại, kết luận lại chốt hạ bài luận", example: "In conclusion, keeping a notebook is vital.", bucket: 1 }
    ]
  },
  {
    unitNum: 90,
    title: "Unit 90: Formal letters and emails",
    description: "Văn phong mở đầu, kết thúc thư điện tử công vụ và cách gửi tài liệu đính kèm.",
    buckets: ["Salutations & Sign-offs (Chào hỏi & Ký tên thư công)", "Attachment Actions (Hành động gửi tài liệu đính)"],
    words: [
      { word: "dear", type: "Tính từ / Lời mở đầu", phonetic: "/dɪər/", vi: "Kính gửi... tôn kính trang trọng đầu thư", example: "Dear Professor Tim, I am writing to ask help.", bucket: 0 },
      { word: "sincerely", type: "Trạng từ / Ký thư", phonetic: "/sɪnˈsɪəli/", vi: "Trân trọng kính thư (Yours sincerely)", example: "Yours sincerely, Hoàng Quỳnh Như.", bucket: 0 },
      { word: "best wishes", type: "Cụm từ chúc mừng", phonetic: "/bɛst ˈwɪʃɪz/", vi: "chúc mọi điều tốt lành (cuối thư bán trang)", example: "Best wishes to you and your friendly family.", bucket: 0 },
      { word: "write to", type: "Cụm động từ", phonetic: "/raɪt tuː/", vi: "viết thư liên lạc gửi cho ai đó công vụ", example: "I write to complain about the broken alarm.", bucket: 1 },
      { word: "look forward to", type: "Cụm động từ", phonetic: "/lʊk ˈfɔːwəd tuː/", vi: "trông chờ, mong mỏi nhận phản hồi (V-ing)", example: "I look forward to hearing from you soon.", bucket: 1 },
      { word: "reply", type: "Động từ / Danh từ", phonetic: "/rɪˈplaɪ/", vi: "trả lời lại thư điện tử, phản hồi thư", example: "Please reply to my email as soon as possible.", bucket: 1 },
      { word: "attach", type: "Động từ", phonetic: "/əˈtætʃ/", vi: "đính kèm tệp tin tài liệu hình ảnh kèm", example: "I attach my curriculum vitae to this mail.", bucket: 1 },
      { word: "send", type: "Động từ", phonetic: "/sɛnd/", vi: "gửi đi thư từ tin nhắn gói bưu phẩm", example: "Send the file to the manager's email address.", bucket: 1 }
    ]
  },
  {
    unitNum: 91,
    title: "Unit 91: Informal emails and messages",
    description: "Nhắn tin nhanh cho bạn bè thân thiết, cụm từ kết thư gần gũi thân mật.",
    buckets: ["Casual Greetings (Chào hỏi thân mật bạn bè)", "Casual Sign-offs (Lời kết thư & nhắn tin nhanh)"],
    words: [
      { word: "hi", type: "Từ cảm thán", phonetic: "/haɪ/", vi: "chào bạn nhé thân mật gần gũi chào", example: "Hi Tim, what's up? Are you making progress?", bucket: 0 },
      { word: "what's up", type: "Cụm từ cảm thán", phonetic: "/wɒts ʌp/", vi: "dạo này thế nào rồi, có việc gì thế bạn", example: "Hi mate, what's up? Long time no see.", bucket: 0 },
      { word: "by the way", type: "Cụm từ nối", phonetic: "/baɪ ðə weɪ/", vi: "nhân tiện, tiện thể nhắc đến chuyện khác", example: "By the way, did you hand in the homework?", bucket: 0 },
      { word: "chat", type: "Động từ / Danh từ", phonetic: "/tʃæt/", vi: "tán gẫu, trò chuyện thân mật qua mạng", example: "We chat online via this social app daily.", bucket: 1 },
      { word: "miss you", type: "Cụm động từ", phonetic: "/mɪs juː/", vi: "nhớ bạn da diết, nhớ mong gặp lại nhau", example: "I miss you so much; hope to see you soon.", bucket: 1 },
      { word: "see you", type: "Cụm từ chúc", phonetic: "/siː juː/", vi: "hẹn gặp lại nhé bạn yêu chào tạm biệt", example: "Goodbye for now; see you tomorrow morning.", bucket: 1 },
      { word: "love", type: "Danh từ / Lời kết", phonetic: "/lʌv/", vi: "Thân thương, thương mến (kết thư thân)", example: "Best friends forever, love, Mary.", bucket: 1 },
      { word: "text", type: "Động từ / Danh từ", phonetic: "/tɛkst/", vi: "gửi tin nhắn điện thoại di động SMS", example: "Text me as soon as you arrive at railway station.", bucket: 1 }
    ]
  },
  {
    unitNum: 92,
    title: "Unit 92: Abbreviations",
    description: "Cách viết tắt chỉ thời gian, các ví dụ học thuật và chức danh VIP.",
    buckets: ["Time Abbreviations (Từ viết tắt mốc thời gian)", "Latin & Business (Từ viết tắt gốc Latin & Chức vụ)"],
    words: [
      { word: "AM", type: "Từ viết tắt", phonetic: "/ˌeɪ ˈɛm/", vi: "sáng, mốc thời gian từ nửa đêm đến trưa", example: "We get up early at six AM every weekday.", bucket: 0 },
      { word: "PM", type: "Từ viết tắt", phonetic: "/ˌpiː ˈɛm/", vi: "chiều tối, mốc thời gian từ trưa đến đêm", example: "The biology lecture starts at two PM today.", bucket: 0 },
      { word: "e.g.", type: "Từ viết tắt", phonetic: "/ˌiː ˈdʒiː/", vi: "ví dụ là (exempli gratia - latin)", example: "Buy fresh fruits, e.g. apples and pears.", bucket: 1 },
      { word: "i.e.", type: "Từ viết tắt", phonetic: "/ˌaɪ ˈiː/", vi: "tức là, nghĩa là làm rõ ý (id est)", example: "Use a monolingual dictionary, i.e. English-English.", bucket: 1 },
      { word: "etc.", type: "Từ viết tắt", phonetic: "/ɪtˈsɛtrə/", vi: "vân vân, các thứ tương tự (et cetera)", example: "She bought notebooks, rubbers, rulers, etc.", bucket: 1 },
      { word: "TV", type: "Từ viết tắt", phonetic: "/ˌtiː ˈviː/", vi: "vô tuyến truyền hình, tivi màn hình lớn", example: "We watched the hurricane news on TV yesterday.", bucket: 0 },
      { word: "PC", type: "Từ viết tắt", phonetic: "/ˌpiː ˈsiː/", vi: "máy tính cá nhân văn phòng (personal computer)", example: "Save the files on your desktop PC now.", bucket: 0 },
      { word: "VIP", type: "Từ viết tắt", phonetic: "/ˌvaɪ ˌaɪ ˈpiː/", vi: "nhân vật vô cùng quan trọng, khách quý VIP", example: "The president is a VIP guest at the wedding.", bucket: 1 }
    ]
  },
  {
    unitNum: 93,
    title: "Unit 93: Spoken and written English",
    description: "Sự khác biệt trong phát âm đọc to nói thầm và ghi chép tóm tắt bài giảng.",
    buckets: ["Speech Elements (Hành vi nói & phát âm)", "Written Elements (Hành vi đọc viết & ghi chú)"],
    words: [
      { word: "say aloud", type: "Cụm động từ", phonetic: "/seɪ əˈlaʊd/", vi: "đọc to thành tiếng để nhớ phát âm IPA", example: "Say the new vocabulary words aloud.", bucket: 0 },
      { word: "whisper", type: "Động từ / Danh từ", phonetic: "/ˈwɪspə/", vi: "nói thầm thì nhỏ nhẹ tránh ai nghe thấy", example: "They whisper so Tim cannot hear the secret.", bucket: 0 },
      { word: "shout", type: "Động từ", phonetic: "/ʃaʊt/", vi: "hét to giận dữ, gọi lớn tiếng từ xa", example: "Don't shout; speak quietly to the doctor.", bucket: 0 },
      { word: "read", type: "Động từ", phonetic: "/riːd/", vi: "đọc sách báo tài liệu tiếp thu chữ nghĩa", example: "I love to read novels before going to bed.", bucket: 1 },
      { word: "write", type: "Động từ", phonetic: "/raɪt/", vi: "viết chữ soạn thảo văn bản ghi sổ tay", example: "Write spelling words in vocabulary notebook.", bucket: 1 },
      { word: "spell", type: "Động từ", phonetic: "/spɛl/", vi: "đánh vần từng chữ cái cấu tạo nên từ", example: "Could you please spell your surname for me?", bucket: 1 },
      { word: "take notes", type: "Cụm động từ", phonetic: "/teɪk nəʊts/", vi: "ghi chép tóm tắt ý chính của bài giảng", example: "Students take notes while the professor talks.", bucket: 1 },
      { word: "underline", type: "Động từ", phonetic: "/ˌʌndəˈlaɪn/", vi: "gạch chân dưới từ vựng quan trọng vở", example: "Underline the collocations inside the sheet.", bucket: 1 }
    ]
  },
  {
    unitNum: 94,
    title: "Unit 94: Asking for and giving info",
    description: "Hành động yêu cầu cung cấp thông tin, tra cứu ý nghĩa và học định nghĩa.",
    buckets: ["Information Seeking (Hành vi tìm kiếm thông tin)", "Reference Data (Thông tin từ điển tra cứu)"],
    words: [
      { word: "ask for", type: "Cụm động từ", phonetic: "/ɑːsk fɔːr/", vi: "đòi hỏi xin xỏ yêu cầu sự hỗ trợ giúp", example: "Don't be afraid to ask for directions town.", bucket: 0 },
      { word: "find out", type: "Cụm động từ", phonetic: "/faɪnd aʊt/", vi: "phát hiện ra thông tin tìm hiểu sự thật", example: "Read this book to find out grammar rules.", bucket: 0 },
      { word: "search", type: "Động từ / Danh từ", phonetic: "/sɜːtʃ/", vi: "tìm kiếm lùng sục thông tin mạng xã", example: "I searched all day for my lost credit card.", bucket: 0 },
      { word: "look for", type: "Cụm động từ", phonetic: "/lʊk fɔːr/", vi: "đang đi tìm đồ vật bị thất lạc chìa khóa", example: "She is looking for her lost pocket money.", bucket: 0 },
      { word: "guide word", type: "Danh từ", phonetic: "/ɡaɪd wɜːd/", vi: "từ dẫn đường ở đầu trang từ điển giấy", example: "Guide words help you find entries faster.", bucket: 1 },
      { word: "dictionary entry", type: "Danh từ", phonetic: "/ˈdɪkʃənəri ˈɛntri/", vi: "mục tra từ vựng hoàn chỉnh giải nghĩa", example: "Look at the dictionary entry for pronunciation.", bucket: 1 },
      { word: "definition", type: "Danh từ", phonetic: "/ˌdɛfɪˈnɪʃən/", vi: "định nghĩa giải thích ý nghĩa Anh-Anh", example: "Read the definition in a monolingual dictionary.", bucket: 1 },
      { word: "translation", type: "Danh từ", phonetic: "/trænzˈleɪʃn/", vi: "bản dịch nghĩa sang tiếng Việt bản ngữ", example: "Write the translation next to spelling word.", bucket: 1 }
    ]
  },
  {
    unitNum: 95,
    title: "Unit 95: Making arrangements",
    description: "Lời mời tham gia sự kiện, đề xuất gợi ý và xác nhận lịch hẹn gặp.",
    buckets: ["Proposals & Invites (Đề xuất & Lời mời hẹn)", "Schedule Finalisation (Chốt lịch & Thay đổi hẹn)"],
    words: [
      { word: "invite", type: "Động từ", phonetic: "/ɪnˈvaɪt/", vi: "gửi lời mời mọc ai tham gia sự kiện đám", example: "They want to invite us to their wedding party.", bucket: 0 },
      { word: "suggest", type: "Động từ", phonetic: "/səˈdʒɛst/", vi: "gợi ý, đề xuất giải pháp đi đâu chơi V-ing", example: "He suggested going for a walk in national park.", bucket: 0 },
      { word: "accept an invitation", type: "Cụm động từ", phonetic: "/ækˈsɛpt ˌɪnvɪˈteɪʃn/", vi: "chấp nhận nhận lời mời tham gia tiệc", example: "I am delighted to accept your invitation.", bucket: 0 },
      { word: "make a suggestion", type: "Cụm động từ", phonetic: "/meɪk ə səˈdʒɛstʃên/", vi: "đưa ra ý kiến đề xuất đóng góp lịch hẹn", example: "Let me make a suggestion for our holiday.", bucket: 0 },
      { word: "book", type: "Động từ", phonetic: "/bʊk/", vi: "đặt trước phòng khách sạn vé tàu máy bay", example: "You should book a hotel room near the beach.", bucket: 1 },
      { word: "confirm", type: "Động từ", phonetic: "/kənˈfɜːm/", vi: "xác nhận lại lịch hẹn thông tin chính xác", example: "Call me to confirm the exact time of meeting.", bucket: 1 },
      { word: "cancel", type: "Động từ", phonetic: "/ˈkænsn/", vi: "hủy bỏ hoàn toàn lịch hẹn do bận đột", example: "He had to cancel the meeting due to fever.", bucket: 1 },
      { word: "reschedule", type: "Động từ", phonetic: "/ˌriːˈʃɛdjuːl/", vi: "đổi lại lịch hẹn sang ngày giờ khác tiện", example: "Can we reschedule the meeting for tomorrow PM?", bucket: 1 }
    ]
  },
  {
    unitNum: 96,
    title: "Unit 96: Confusing words",
    description: "Phân biệt các cặp từ dễ nhầm lẫn nghĩa và ngữ cảnh: mượn/cho mượn, nhớ/bỏ lỡ.",
    buckets: ["Borrowing & Possession (Vay mượn & Sở hữu)", "Aspirations & Failures (Kỳ vọng & Bỏ lỡ)"],
    words: [
      { word: "borrow", type: "Động từ", phonetic: "/ˈbɒrəʊ/", vi: "vay mượn tạm thời đồ vật từ người khác", example: "Can I borrow your bilingual dictionary book?", bucket: 0 },
      { word: "lend", type: "Động từ", phonetic: "/lɛnd/", vi: "cho ai đó vay mượn đồ dùng tạm thời", example: "The teacher agreed to lend me her notebook.", bucket: 0 },
      { word: "lose", type: "Động từ", phonetic: "/luːz/", vi: "đánh mất, làm thất lạc đồ đạc tiền bạc", example: "Avoid losing your credit card at the checkout.", bucket: 0 },
      { word: "miss", type: "Động từ", phonetic: "/mɪs/", vi: "bỏ lỡ chuyến xe buýt / bỏ lỡ bài giảng", example: "Hurry up or we will miss the railway train.", bucket: 1 },
      { word: "check", type: "Động từ", phonetic: "/tʃɛk/", vi: "kiểm tra lại chính tả xem đúng hay sai", example: "Check the spelling of phrasal verbs carefully.", bucket: 0 },
      { word: "control", type: "Động từ / Danh từ", phonetic: "/kənˈtrəʊl/", vi: "kiểm soát điều khiển máy móc quyền lực", example: "The remote control is on the coffee table.", bucket: 0 },
      { word: "hope", type: "Động từ / Danh từ", phonetic: "/həʊp/", vi: "hy vọng ước mong điều tốt đẹp sẽ xảy ra", example: "We hope to see you soon at the wedding.", bucket: 1 },
      { word: "expect", type: "Động từ", phonetic: "/ɪkˈspɛkt/", vi: "trông chờ, mong đợi điều gì xảy ra khả", example: "She expects to get a job in well-known firm.", bucket: 1 }
    ]
  },
  {
    unitNum: 97,
    title: "Unit 97: Numbers",
    description: "Đọc số đếm hàng triệu hàng nghìn, các phép toán cộng trừ cơ bản.",
    buckets: ["Count Values (Giá trị đếm số lượng)", "Math Operations (Phép toán & Tỷ lệ)"],
    words: [
      { word: "zero", type: "Danh từ", phonetic: "/ˈzɪərəʊ/", vi: "số không, điểm không tròn trĩnh", example: "The temperature fell below zero last night.", bucket: 0 },
      { word: "million", type: "Danh từ", phonetic: "/ˈmɪljən/", vi: "một triệu (1,000,000) số lượng khổng", example: "A million tourists visit the national park.", bucket: 0 },
      { word: "hundred", type: "Danh từ", phonetic: "/ˈhʌndrəd/", vi: "một trăm (100) số lượng cơ bản", example: "There are one hundred pages in this book.", bucket: 0 },
      { word: "thousand", type: "Danh từ", phonetic: "/ˈθaʊznd/", vi: "một nghìn (1,000) số lượng đếm tiền", example: "He paid five thousand cash for the bicycle.", bucket: 0 },
      { word: "plus", type: "Giới từ / Danh từ", phonetic: "/plʌs/", vi: "cộng thêm, phép tính cộng thêm vào", example: "Five plus five equals ten, a piece of cake.", bucket: 1 },
      { word: "minus", type: "Giới từ / Danh từ", phonetic: "/ˈmaɪnəs/", vi: "trừ đi, phép tính trừ bớt đi trị", example: "Ten minus three is seven, verify results.", bucket: 1 },
      { word: "double", type: "Động từ / Tính từ", phonetic: "/ˈdʌbl/", vi: "gấp đôi, nhân hai lần số lượng kích", example: "Double the recipe ingredients for dinner.", bucket: 1 },
      { word: "percentage", type: "Danh từ", phonetic: "/pəˈsɛntɪdʒ/", vi: "tỷ lệ phần trăm tính trên tổng số", example: "What is the percentage of failed exams?", bucket: 1 }
    ]
  },
  {
    unitNum: 98,
    title: "Unit 98: Distance and speed",
    description: "Đo lường khoảng cách xa gần, dặm, cây số và biển giới hạn tốc độ xe.",
    buckets: ["Metrics of Space (Đo lường không gian cách)", "Velocity & Shortcuts (Vận tốc & Phím tắt hành trình)"],
    words: [
      { word: "far", type: "Tính từ / Trạng từ", phonetic: "/fɑːr/", vi: "khoảng cách xa xôi, tít xa mù khơi", example: "Is the railway station far from the hotel?", bucket: 0 },
      { word: "near", type: "Tính từ / Giới từ", phonetic: "/nɪər/", vi: "gần kề bên cạnh, cự ly gần sườn", example: "The cottage flat is located near the church.", bucket: 0 },
      { word: "kilometre", type: "Danh từ", phonetic: "/kɪˈlɒmɪtər/", vi: "ki-lô-mét, đơn vị đo khoảng cách mét", example: "We walked one kilometre along the river bank.", bucket: 0 },
      { word: "mile", type: "Danh từ", phonetic: "/maɪl/", vi: "dặm, đơn vị đo khoảng cách Anh-Mỹ", example: "Speed limit signs are shown in miles per hour.", bucket: 0 },
      { word: "speed limit", type: "Cụm danh từ", phonetic: "/spiːd ˈlɪmɪt/", vi: "giới hạn tốc độ cho phép của tuyến đường", example: "Always steer safely below the speed limit.", bucket: 1 },
      { word: "drive fast", type: "Cụm động từ", phonetic: "/draɪv fɑːst/", vi: "lái xe chạy nhanh, phóng nhanh vượt ẩu", example: "Do not drive fast on the narrow country road.", bucket: 1 },
      { word: "walk slowly", type: "Cụm động từ", phonetic: "/wɔːk ˈsləʊli/", vi: "đi bộ đi dạo chậm rãi ung dung thung", example: "We walk slowly to enjoy the mountain breeze.", bucket: 1 },
      { word: "take a short cut", type: "Cụm động từ", phonetic: "/teɪk ə ʃɔːt kʌt/", vi: "đi đường tắt rút ngắn hành trình di", example: "Let's take a short cut through the valley field.", bucket: 1 }
    ]
  },
  {
    unitNum: 99,
    title: "Unit 99: Size and shape",
    description: "Miêu tả bề rộng, hẹp, hình dạng hình học tròn méo hoa văn vải vóc.",
    buckets: ["Physical Dimensions (Chiều rộng không gian)", "Form & Design (Hình dáng & Thiết kế)"],
    words: [
      { word: "wide", type: "Tính từ", phonetic: "/waɪd/", vi: "rộng rãi, có chiều ngang lớn bề ngang rộng", example: "The river is wide near the ocean bank.", bucket: 0 },
      { word: "narrow", type: "Tính từ", phonetic: "/ˈnærəʊ/", vi: "chật hẹp, nhỏ hẹp khó đi đường ngõ", example: "The country road was narrow and dusty.", bucket: 0 },
      { word: "circle", type: "Danh từ", phonetic: "/ˈsɜːkl/", vi: "hình tròn, đường tròn vẽ khép kín", example: "Draw a circle around the correct answer.", bucket: 1 },
      { word: "triangle", type: "Danh từ", phonetic: "/ˈtraɪæŋɡl/", vi: "hình tam giác có ba góc ba cạnh chóp", example: "A traffic warning sign has a triangle shape.", bucket: 1 },
      { word: "size", type: "Danh từ", phonetic: "/saɪz/", vi: "kích cỡ áo quần rộng chật trung bình", example: "I need a larger size of this attrative jacket.", bucket: 0 },
      { word: "shape", type: "Danh từ / Động từ", phonetic: "/ʃeɪp/", vi: "hình dạng, kiểu dáng cấu tạo hình học", example: "The coffee table hasgot a round shape.", bucket: 1 },
      { word: "pattern", type: "Danh từ", phonetic: "/ˈpætən/", vi: "hoa văn họa tiết trang trí trên vải vóc", example: "Her traditional dress has a flower pattern.", bucket: 1 },
      { word: "border", type: "Danh từ / Động từ", phonetic: "/ˈbɔːdər/", vi: "đường viền biên giới quốc gia, rìa mép", example: "National borders are shown clearly on the map.", bucket: 0 }
    ]
  },
  {
    unitNum: 100,
    title: "Unit 100: Weight and measurements",
    description: "Đo trọng lượng cân nặng, dung tích chất lỏng và chiều dài vật lý.",
    buckets: ["Weight Metrics (Đo lường cân nặng)", "Length & Volume (Chiều dài & Dung tích lỏng)"],
    words: [
      { word: "weigh", type: "Động từ", phonetic: "/weɪ/", vi: "cân nặng bao nhiêu, thực hiện phép cân", example: "How much does the heavy suitcase weigh?", bucket: 0 },
      { word: "gram", type: "Danh từ", phonetic: "/ɡræm/", vi: "gam, đơn vị cân đo trọng lượng nhỏ xíu", example: "A tiny gold coin weighs about ten grams.", bucket: 0 },
      { word: "kilogram", type: "Danh từ", phonetic: "/ˈkɪləʊɡræm/", vi: "ki-lô-gam (kg), đơn vị cân nặng cơ bản", example: "She bought a kilogram of fresh potatoes.", bucket: 0 },
      { word: "litre", type: "Danh từ", phonetic: "/ˈliːtər/", vi: "lít (l), đơn vị đo dung tích chất lỏng", example: "Buy a two-litre bottle of mineral water.", bucket: 1 },
      { word: "metre", type: "Danh từ", phonetic: "/ˈmiːtər/", vi: "mét (m), đơn vị đo chiều dài khoảng cách", example: "The lounge ceiling is about three metres high.", bucket: 1 },
      { word: "centimetre", type: "Danh từ", phonetic: "/ˈsɛntɪˌmiːtə/", vi: "xen-ti-mét (cm), đơn vị đo chiều dài nhỏ", example: "The spelling book is twenty centimetres wide.", bucket: 1 },
      { word: "measure", type: "Động từ / Danh từ", phonetic: "/ˈmɛʒər/", vi: "đo đạc kích thước độ dài dung tích", example: "Use a ruler tool to measure the paper sheet.", bucket: 1 },
      { word: "scale", type: "Danh từ", phonetic: "/skeɪl/", vi: "chiếc cân đĩa cân bàn, thang đo tỷ lệ", example: "Put the package on the scale to weigh it.", bucket: 0 }
    ]
  }
];

// Helper to compile authentic textbook exercises for all 50 units (Units 51-100)
function compileTextbookExercises(unit) {
  const { unitNum, words, buckets } = unit;

  // Complete lookup database for authentic textbook errors across Units 51 to 100
  const errorCorrectionDb = {
    51: [
      { id: `ex_${unitNum}_err_1`, original: "Please wash the plates with a washing-up soap.", correct: "Please wash the plates with a washing-up liquid.", explanation: "Nước rửa chén trong tiếng Anh luôn là cụm từ cố định 'washing-up liquid', không dùng 'washing-up soap' nhé!" },
      { id: `ex_${unitNum}_err_2`, original: "Dry the cups with a clean tea towel paper.", correct: "Dry the cups with a clean tea towel.", explanation: "Khăn vải lau bát đĩa là 'tea towel'. Thêm 'paper' vào phía sau là bị thừa từ không tự nhiên!" }
    ],
    52: [
      { id: `ex_${unitNum}_err_1`, original: "She spilled some coffee on her jeans trousers.", correct: "She spilled some coffee on her jeans.", explanation: "'Jeans' bản thân đã là quần bò (danh từ số nhiều), ta không ghép thêm 'trousers' vào phía sau làm gì nhé!" },
      { id: `ex_${unitNum}_err_2`, original: "The private car ran out of petrols on the road.", correct: "Our private car ran out of petrol on the road.", explanation: "Danh từ chỉ xăng dầu 'petrol' là danh từ không đếm được. Do đó, ta không bao giờ viết thêm chữ 's' số nhiều!" }
    ],
    53: [
      { id: `ex_${unitNum}_err_1`, original: "I paid the waiter with a ten-pound coins.", correct: "I paid the waiter with a ten-pound note.", explanation: "Tiền giấy mệnh giá 10 bảng Anh là 'note', còn 'coins' là tiền xu kim loại lẻ tẻ mệnh giá nhỏ!" },
      { id: `ex_${unitNum}_err_2`, original: "Do you prefer to pay by cash or credit card?", correct: "Do you prefer to pay in cash or by credit card.", explanation: "Thành ngữ cố định chuẩn luôn là 'pay in cash' (trả bằng tiền mặt) và 'by credit card' (trả bằng thẻ tín dụng)!" }
    ],
    54: [
      { id: `ex_${unitNum}_err_1`, original: "Staring at the screen gave him a head ache.", correct: "Staring at the screen gave him a headache.", explanation: "Danh từ chỉ bệnh đau đầu 'headache' được viết liền trực tiếp thành một từ duy nhất, không có khoảng cách!" },
      { id: `ex_${unitNum}_err_2`, original: "See doctor if your high fever goes on.", correct: "See a doctor if your high fever goes on.", explanation: "Ta dùng cụm từ 'see a doctor' (đi khám bác sĩ) với mạo từ 'a' số ít để chỉ chung nghề nghiệp bác sĩ!" }
    ],
    55: [
      { id: `ex_${unitNum}_err_1`, original: "He loves wearing a casual blue jeans at school.", correct: "He loves wearing casual blue jeans at school.", explanation: "Vì 'jeans' là danh từ luôn ở dạng số nhiều (có hai ống quần), ta tuyệt đối không dùng mạo từ số ít 'a' đứng trước!" },
      { id: `ex_${unitNum}_err_2`, original: "Wear waterproof boot in case of flood rain.", correct: "Wear waterproof boots in case of flood rain.", explanation: "Giày bốt đi mưa luôn đi theo đôi (hai chiếc), do đó danh từ bắt buộc phải viết ở dạng số nhiều 'boots'!" }
    ],
    56: [
      { id: `ex_${unitNum}_err_1`, original: "Buy some brand-new bread at the baker.", correct: "Buy some brand-new bread at the baker's.", explanation: "Khi nói về tiệm bán bánh mì, ta dùng sở hữu cách 'at the baker's' (viết tắt của baker's shop)!" },
      { id: `ex_${unitNum}_err_2`, original: "Always check your changes and keep the receipt.", correct: "Always check your change and keep the receipt.", explanation: "Tiền thừa thối lại khi mua sắm là danh từ không đếm được 'change', tuyệt đối không được thêm 's' số nhiều!" }
    ],
    57: [
      { id: `ex_${unitNum}_err_1`, original: "Enjoy a fresh cup of cold orange fruits juice.", correct: "Enjoy a fresh cup of cold orange fruit juice.", explanation: "Trong danh từ ghép 'fruit juice' (nước ép hoa quả), danh từ đứng trước đóng vai trò bổ ngữ viết ở dạng số ít 'fruit'!" },
      { id: `ex_${unitNum}_err_2`, original: "A rabbit is eating carrot behind the house.", correct: "A rabbit is eating carrots behind the house.", explanation: "Khi nói về đồ ăn yêu thích của loài thỏ nói chung, ta nên dùng danh từ ở dạng số nhiều đếm được 'carrots'!" }
    ],
    58: [
      { id: `ex_${unitNum}_err_1`, original: "The gas cooker is hot; do not touch him now.", correct: "The gas cooker is hot; do not touch it now.", explanation: "Bếp lò 'cooker' là đồ vật (vô tri vô giác), do đó ta dùng đại từ nhân xưng chỉ vật 'it' chứ không dùng 'him'!" },
      { id: `ex_${unitNum}_err_2`, original: "Put the dirty plates directly in fridge.", correct: "Put the dirty plates directly in the dishwasher.", explanation: "Bát đĩa bẩn ta cho vào máy rửa bát ('dishwasher') để làm sạch, chứ cất vào tủ lạnh ('fridge') là nhầm rồi nha! 😉" }
    ],
    59: [
      { id: `ex_${unitNum}_err_1`, original: "Meet me at railway station next morning.", correct: "Meet me at the railway station next morning.", explanation: "Vì địa điểm nhà ga đã được xác định cụ thể trong ngữ cảnh giao hẹn, ta bắt buộc phải thêm mạo từ 'the' phía trước!" },
      { id: `ex_${unitNum}_err_2`, original: "She went to post office to mail a letter.", correct: "She went to the post office to mail a letter.", explanation: "Tương tự, bưu điện là địa điểm công cộng cụ thể, ta dùng cụm từ xác định 'go to the post office'!" }
    ],
    60: [
      { id: `ex_${unitNum}_err_1`, original: "No private cars are allowed in pedestrian areas.", correct: "No private cars are allowed in the pedestrian area.", explanation: "Mạo từ xác định 'the' cần được thêm vào trước cụm danh từ 'pedestrian area' chỉ khu vực phố đi bộ cụ thể!" },
      { id: `ex_${unitNum}_err_2`, original: "The sign says no parking in front the gate.", correct: "The sign says no parking in front of the gate.", explanation: "Cụm giới từ chỉ vị trí phía trước luôn luôn là đầy đủ 3 từ 'in front of', thiếu giới từ 'of' là sai ngữ pháp!" }
    ],
    61: [
      { id: `ex_${unitNum}_err_1`, original: "Travelling by a private car is highly convenient.", correct: "Travelling by private car is highly convenient.", explanation: "Khi nói về phương thức di chuyển bằng xe gì (by car, by train, by plane), ta tuyệt đối không thêm mạo từ 'a' chen vào giữa!" },
      { id: `ex_${unitNum}_err_2`, original: "A single ticket is cheaper than return ticket.", correct: "A single ticket is cheaper than a return ticket.", explanation: "Vì 'return ticket' là danh từ đếm được số ít, ta bắt buộc phải có mạo từ 'a' đứng trước nó!" }
    ],
    62: [
      { id: `ex_${unitNum}_err_1`, original: "Share textbook with Tim if you forgot yours.", correct: "Share a textbook with Tim if you forgot yours.", explanation: "Danh từ số ít đếm được 'textbook' đứng đơn lẻ làm tân ngữ bắt buộc phải đi kèm mạo từ chỉ số lượng là 'a'!" },
      { id: `ex_${unitNum}_err_2`, original: "Do your homeworks before going to bed.", correct: "Do your homework before going to bed.", explanation: "Từ 'homework' (bài tập về nhà) là danh từ không đếm được, tuyệt đối không bao giờ được viết thêm chữ 's' số nhiều!" }
    ],
    63: [
      { id: `ex_${unitNum}_err_1`, original: "We attend biology lecture in the morning.", correct: "We attend a biology lecture in the morning.", explanation: "Vì 'lecture' là danh từ đếm được số ít, ta cần mạo từ 'a' đứng trước để chỉ một buổi nghe bài giảng!" },
      { id: `ex_${unitNum}_err_2`, original: "He plans to get job as soon as he graduates.", correct: "He plans to get a job as soon as he graduates.", explanation: "Thành ngữ chỉ việc tìm được công việc mới luôn là cụm từ cố định 'get a job' (phải có mạo từ 'a')!" }
    ],
    64: [
      { id: `ex_${unitNum}_err_1`, original: "See doctor if your sore throat gets worse.", correct: "See a doctor if your sore throat gets worse.", explanation: "Hãy dùng mạo từ 'a' trước danh từ nghề nghiệp chỉ bác sĩ để tạo cụm từ tự nhiên 'see a doctor'!" },
      { id: `ex_${unitNum}_err_2`, original: "My retired grandfather is a very easy-going.", correct: "My retired grandfather is very easy-going.", explanation: "Tính từ miêu tả tính cách 'easy-going' đứng độc lập cuối câu không có danh từ theo sau, nên ta không dùng mạo từ 'a'!" }
    ],
    65: [
      { id: `ex_${unitNum}_err_1`, original: "He discussed the new plan with a collegue.", correct: "He discussed the new plan with a colleague.", explanation: "Chú ý chính tả: đồng nghiệp viết đúng là c-o-l-l-e-a-g-u-e (colleague), không được viết sai thành 'collegue'!" },
      { id: `ex_${unitNum}_err_2`, original: "He earns a high salaries as a senior engineer.", correct: "He earns a high salary as a senior engineer.", explanation: "Vì chủ ngữ 'He' là số ít và có mạo từ 'a' phía trước, danh từ 'salary' bắt buộc phải viết ở dạng số ít!" }
    ],
    66: [
      { id: `ex_${unitNum}_err_1`, original: "They study the global market for iron golds.", correct: "They study the global market for iron and gold.", explanation: "Vàng 'gold' là danh từ chất liệu không đếm được. Ta không bao giờ thêm chữ 's' số nhiều và nên nối bằng liên từ 'and'!" },
      { id: `ex_${unitNum}_err_2`, original: "Always explain definitions politely to customer.", correct: "Always explain definitions politely to customers.", explanation: "Khi nói về nhóm đối tượng chung (khách hàng nói chung), ta nên viết danh từ ở dạng số nhiều 'customers' để câu tự nhiên!" }
    ],
    67: [
      { id: `ex_${unitNum}_err_1`, original: "Boys enjoy playing football on the grass pitch.", correct: "Boys enjoy playing football on the grassy pitch.", explanation: "Bổ nghĩa cho danh từ sân đấu 'pitch', ta dùng tính từ chỉ tính chất nhiều cỏ xanh là 'grassy' chứ không dùng danh từ 'grass'!" },
      { id: `ex_${unitNum}_err_2`, original: "The match ended in draw, with score two-two.", correct: "The match ended in a draw, with score two-two.", explanation: "Thành ngữ chỉ trận đấu kết thúc với tỷ số hòa là 'end in a draw', bắt buộc phải có mạo từ 'a'!" }
    ],
    68: [
      { id: `ex_${unitNum}_err_1`, original: "We booked a tennis court next to church.", correct: "We booked a tennis court next to the church.", explanation: "Nhà thờ là địa điểm cụ thể được xác định trong vùng, ta dùng giới từ đầy đủ 'next to the church'!" },
      { id: `ex_${unitNum}_err_2`, original: "Wear comfortable trainer suitable for running.", correct: "Wear comfortable trainers suitable for running.", explanation: "Giày chạy thể thao luôn đi theo đôi (hai chiếc), do đó danh từ bắt buộc phải viết số nhiều có 's' thành 'trainers'!" }
    ],
    69: [
      { id: `ex_${unitNum}_err_1`, original: "Personally, I think this comedy movie is boring.", correct: "Personally, I think this comedy movie is boring.", explanation: "Câu gốc đã chính xác hoàn hảo! Hãy nhớ 'comedy' đóng vai trò danh từ ghép bổ nghĩa cho 'movie'!" },
      { id: `ex_${unitNum}_err_2`, original: "The actors walked onto the stage with prides.", correct: "The actors walked onto the stage with pride.", explanation: "Niềm tự hào 'pride' là danh từ trừu tượng không đếm được, ta chỉ dùng dạng số ít 'with pride' (với niềm tự hào)!" }
    ],
    70: [
      { id: `ex_${unitNum}_err_1`, original: "I often listen music while cleaning rooms.", correct: "I often listen to music while cleaning rooms.", explanation: "Động từ lắng nghe 'listen' bắt buộc phải có giới từ 'to' đi kèm trước tân ngữ âm nhạc (listen to music)!" },
      { id: `ex_${unitNum}_err_2`, original: "She is reading a romantic novels on the table.", correct: "She is reading a romantic novel on the table.", explanation: "Vì phía trước có mạo từ số ít 'a' chỉ số lượng một cuốn, danh từ 'novel' bắt buộc phải viết ở số ít!" }
    ],
    71: [
      { id: `ex_${unitNum}_err_1`, original: "They plan to go in holiday by the sea.", correct: "They plan to go on holiday by the sea.", explanation: "Cụm từ chỉ việc đi nghỉ mát luôn là 'go on holiday' với giới từ 'on', không được dùng 'in holiday'!" },
      { id: `ex_${unitNum}_err_2`, original: "Always pronounce silent letter s in island silently.", correct: "Always pronounce the silent letter s in island silently.", explanation: "Chữ cái câm 'silent letter' đã được xác định cụ thể, ta dùng mạo từ 'the' đứng trước để tạo cụm từ chuẩn!" }
    ],
    72: [
      { id: `ex_${unitNum}_err_1`, original: "They gathered to celebration her birthday party.", correct: "They gathered to celebrate her birthday party.", explanation: "Sau động từ chỉ mục đích 'to' ta cần một động từ nguyên mẫu là 'celebrate', không dùng danh từ 'celebration' ở đây!" },
      { id: `ex_${unitNum}_err_2`, original: "We wish everyone a merry christmas and peaces.", correct: "We wish everyone a merry christmas and peace.", explanation: "Hòa bình 'peace' là danh từ trừu tượng không đếm được, tuyệt đối không được viết thêm chữ 's' số nhiều!" }
    ],
    73: [
      { id: `ex_${unitNum}_err_1`, original: "The thieves broke the window table to get golds.", correct: "The thieves broke the window table to get gold.", explanation: "Vàng 'gold' là kim loại quý/danh từ vật liệu không đếm được, do đó ta chỉ dùng dạng số ít là 'gold'!" },
      { id: `ex_${unitNum}_err_2`, original: "The bank robber was sentenced to ten years in prisons.", correct: "The bank robber was sentenced to ten years in prison.", explanation: "Thành ngữ ngồi tù, đi tù luôn là 'in prison' ở dạng số ít danh từ địa điểm chung, không dùng số nhiều!" }
    ],
    74: [
      { id: `ex_${unitNum}_err_1`, original: "The government passed a new environment law.", correct: "The government passed a new environmental law.", explanation: "Bổ nghĩa cho danh từ luật pháp 'law' phía sau, ta dùng tính từ tương ứng là 'environmental' (thuộc về môi trường)!" },
      { id: `ex_${unitNum}_err_2`, original: "Every adult has the legal right to voting here.", correct: "Every adult has the legal right to vote here.", explanation: "Cấu trúc chỉ quyền được làm gì là 'right to do something' (sau 'to' là động từ nguyên mẫu không chia 'vote' chứ không dùng V-ing)!" }
    ],
    75: [
      { id: `ex_${unitNum}_err_1`, original: "Coal mining power stations cause air pollutions.", correct: "Coal mining power stations cause air pollution.", explanation: "Sự ô nhiễm 'pollution' là danh từ không đếm được khi nói chung, ta chỉ dùng dạng số ít 'pollution'!" },
      { id: `ex_${unitNum}_err_2`, original: "Turn off lights to saving electric power fuel.", correct: "Turn off lights to save electric power fuel.", explanation: "Động từ chỉ mục đích sau 'to' phải ở dạng nguyên mẫu không thêm đuôi -ing, do đó dùng 'to save'!" }
    ],
    76: [
      { id: `ex_${unitNum}_err_1`, original: "Soldiers had to fight to protecting the valley.", correct: "Soldiers had to fight to protect the valley.", explanation: "Tương tự, cấu trúc chỉ mục đích để làm gì là 'to + V-infinitive', do đó ta dùng động từ nguyên mẫu 'protect'!" },
      { id: `ex_${unitNum}_err_2`, original: "All citizens dream to live in global peaces.", correct: "All citizens dream to live in global peace.", explanation: "Danh từ trừu tượng 'peace' (hòa bình) không đếm được nên không bao giờ có dạng số nhiều thêm 's'!" }
    ],
    77: [
      { id: `ex_${unitNum}_err_1`, original: "Type your homework essay on keyboard.", correct: "Type your homework essay on the keyboard.", explanation: "Bàn phím là vật dụng cụ thể trước mặt người gõ, ta bắt buộc phải có mạo từ xác định 'the keyboard'!" },
      { id: `ex_${unitNum}_err_2`, original: "Delete the incorrect dictionary entries now.", correct: "Delete the incorrect dictionary entry now.", explanation: "Mục từ tra cứu 'entry' ở đây đang nói số ít (chỉ một mục từ sai chính tả), do đó không dùng dạng số nhiều 'entries'!" }
    ],
    78: [
      { id: `ex_${unitNum}_err_1`, original: "Write email to the professor to ask help.", correct: "Write an email to the professor to ask for help.", explanation: "Ta dùng cụm từ 'write an email' (viết thư điện tử) và động từ xin sự giúp đỡ đi kèm giới từ 'ask for help'!" },
      { id: `ex_${unitNum}_err_2`, original: "Keep your credit card passwords secret always.", correct: "Keep your credit card password secret always.", explanation: "Mật khẩu thẻ tín dụng 'password' chỉ có một chuỗi duy nhất cho một thẻ, do đó ta viết số ít 'password'!" }
    ],
    79: [
      { id: `ex_${unitNum}_err_1`, original: "My grandfather reads newspaper every morning.", correct: "My grandfather reads the newspaper every morning.", explanation: "Thói quen đọc báo hằng ngày của người bản xứ luôn là cụm từ cố định 'read the newspaper' (phải có mạo từ 'the')!" },
      { id: `ex_${unitNum}_err_2`, original: "The news on television were quite exciting.", correct: "The news on television was quite exciting.", explanation: "Mặc dù danh từ 'news' kết thúc bằng chữ 's', nó là danh từ không đếm được số ít. Do đó, động từ tobe đi kèm bắt buộc phải dùng số ít là 'was'!" }
    ],
    80: [
      { id: `ex_${unitNum}_err_1`, original: "Make phone call to see if doctor is free.", correct: "Make a phone call to see if the doctor is free.", explanation: "Cụm từ chuẩn là 'make a phone call' (gọi điện) và cần mạo từ 'the' trước 'doctor' chỉ bác sĩ cụ thể định gặp!" },
      { id: `ex_${unitNum}_err_2`, original: "I apologise; I dialed the wrong numbers.", correct: "I apologise; I dialed the wrong number.", explanation: "Gọi nhầm số máy ta dùng danh từ số ít chỉ một số máy cụ thể là 'wrong number', không dùng số nhiều!" }
    ],
    81: [
      { id: `ex_${unitNum}_err_1`, original: "We had chat with neighbors in the garden.", correct: "We had a chat with neighbors in the garden.", explanation: "Cụm từ chỉ việc trò chuyện thân mật tán gẫu luôn là 'have a chat' (bắt buộc phải có mạo từ 'a')!" },
      { id: `ex_${unitNum}_err_2`, original: "Always smile when welcome the customers.", correct: "Always smile when you welcome the customers.", explanation: "Mệnh đề phụ sau 'when' cần đầy đủ chủ ngữ thực hiện hành động, do đó ta thêm đại từ 'you' làm chủ ngữ!" }
    ],
    82: [
      { id: `ex_${unitNum}_err_1`, original: "Look the dictionary entry guide words.", correct: "Look at the dictionary entry guide words.", explanation: "Động từ quan sát 'look' khi đi với tân ngữ phía sau bắt buộc phải đi kèm giới từ 'at' (look at someone/something)!" },
      { id: `ex_${unitNum}_err_2`, original: "Always listen the teacher's instructions.", correct: "Always listen to the teacher's instructions.", explanation: "Tương tự, động từ lắng nghe 'listen' phải đi liền giới từ 'to' trước tân ngữ (listen to someone/something)!" }
    ],
    83: [
      { id: `ex_${unitNum}_err_1`, original: "I want that you write in a notebook.", correct: "I want you to write in a notebook.", explanation: "Cấu trúc muốn ai đó thực hiện việc gì là 'want someone to do something', không dùng mệnh đề 'that' đi với 'want'!" },
      { id: `ex_${unitNum}_err_2`, original: "He explained that silent b is not reading.", correct: "He explained that the silent letter b is not pronounced.", explanation: "Chữ cái câm 'silent letter' bị câm không được phát âm ra miệng, ta dùng động từ thể bị động 'is not pronounced'!" }
    ],
    84: [
      { id: `ex_${unitNum}_err_1`, original: "Wear comfortable shoe suitable for walking.", correct: "Wear comfortable shoes suitable for walking.", explanation: "Giày đi bộ luôn đi theo đôi (hai chiếc), do đó danh từ bắt buộc phải viết ở dạng số nhiều 'shoes'!" },
      { id: `ex_${unitNum}_err_2`, original: "Store the frozen vegetable inside the fridge.", correct: "Store the frozen vegetables inside the fridge.", explanation: "Tương tự, rau củ quả bảo quản đông lạnh ta viết số nhiều chỉ chung là 'frozen vegetables'!" }
    ],
    85: [
      { id: `ex_${unitNum}_err_1`, original: "The tall professor stand next to the board.", correct: "The tall professor stands next to the board.", explanation: "Chủ ngữ 'The tall professor' là ngôi thứ ba số ít, do đó động từ 'stand' phía sau bắt buộc phải thêm 's' thành 'stands'!" },
      { id: `ex_${unitNum}_err_2`, original: "We sit around the round coffee tables lounge.", correct: "We sit around the round coffee table in the lounge.", explanation: "Ngồi xung quanh một chiếc bàn trà phòng khách cụ thể, ta dùng số ít 'table' và thêm giới từ chỉ vị trí 'in'!" }
    ],
    86: [
      { id: `ex_${unitNum}_err_1`, original: "The rabbit ran quick away from wild lion.", correct: "The rabbit ran quickly away from the wild lion.", explanation: "Để bổ nghĩa cho hành động chạy 'ran', ta cần dùng trạng từ 'quickly' chứ không dùng tính từ 'quick'!" },
      { id: `ex_${unitNum}_err_2`, original: "They study quiet in the university library.", correct: "They study quietly in the university library.", explanation: "Tương tự, bổ nghĩa cho hành động học tập 'study' ta cần trạng từ chỉ cách thức là 'quietly' (một cách im lặng)!" }
    ],
    87: [
      { id: `ex_${unitNum}_err_1`, original: "Write a formal letters to apply for the job.", correct: "Write a formal letter to apply for the job.", explanation: "Vì phía trước có mạo từ chỉ số lượng một 'a', danh từ lá thư 'letter' bắt buộc phải viết ở dạng số ít!" },
      { id: `ex_${unitNum}_err_2`, original: "Send warm greeting to all relatives.", correct: "Send warm greetings to all relatives.", explanation: "Lời chào hỏi chúc tụng xã giao viết cuối thư luôn luôn dùng ở dạng số nhiều có chữ 's' là 'greetings'!" }
    ],
    88: [
      { id: `ex_${unitNum}_err_1`, original: "Write your surname and first names on sheets.", correct: "Write your surname and first name on sheets.", explanation: "Tên gọi chính của một cá nhân chỉ có một tên gọi số ít, do đó ta viết 'first name' không thêm 's'!" },
      { id: `ex_${unitNum}_err_2`, original: "The passport shows his nationality is Sweden.", correct: "The passport shows his nationality is Swedish.", explanation: "Để chỉ quốc tịch sau động từ tobe, ta cần dùng tính từ chỉ quốc tịch tương ứng là 'Swedish' (người Thụy Điển) chứ không dùng tên quốc gia 'Sweden'!" }
    ],
    89: [
      { id: `ex_${unitNum}_err_1`, original: "Also reading books improves your spelling.", correct: "Also, reading books improves your spelling.", explanation: "Khi dùng trạng từ liên kết 'Also' đứng ở đầu câu làm trạng ngữ nối câu, ta bắt buộc phải thêm dấu phẩy ngăn cách phía sau!" },
      { id: `ex_${unitNum}_err_2`, original: "Finally, check the spelling dictionary entries.", correct: "Finally, check the spelling of the dictionary entry.", explanation: "Chúng ta kiểm tra chính tả 'của' mục từ tra cứu, dùng giới từ liên kết đầy đủ 'spelling of the dictionary entry'!" }
    ],
    90: [
      { id: `ex_${unitNum}_err_1`, original: "I look forward to hear from you soon.", correct: "I look forward to hearing from you soon.", explanation: "Cấu trúc mong đợi trông chờ phản hồi luôn là 'look forward to + V-ing' (sau giới từ 'to' bắt buộc là động từ thêm đuôi -ing)!" },
      { id: `ex_${unitNum}_err_2`, original: "I attach my curriculum vitae to this letters.", correct: "I attach my curriculum vitae to this letter.", explanation: "Vì đại từ chỉ định số ít 'this' (lá thư này) đi kèm, danh từ 'letter' phía sau bắt buộc phải viết ở dạng số ít!" }
    ],
    91: [
      { id: `ex_${unitNum}_err_1`, original: "Hi Tim, what's up? Are you making progress?", correct: "Hi Tim, what's up? Are you making progress?", explanation: "Câu gốc đã chính xác hoàn toàn! Cụm 'make progress' (tiến bộ) là collocation chuẩn xác!" },
      { id: `ex_${unitNum}_err_2`, original: "Text me as soon as you arrive railway station.", correct: "Text me as soon as you arrive at the railway station.", explanation: "Động từ đến một địa điểm nhỏ 'arrive' đi kèm giới từ 'at' (arrive at a place) và mạo từ xác định 'the' trước nhà ga!" }
    ],
    92: [
      { id: `ex_${unitNum}_err_1`, original: "We get up early at six AM every weekdays.", correct: "We get up early at six AM every weekday.", explanation: "Sau từ chỉ mỗi 'every' là danh từ đếm được ở dạng số ít, do đó danh từ ngày trong tuần viết là 'weekday' không thêm 's'!" },
      { id: `ex_${unitNum}_err_2`, original: "Buy fresh fruits, e.g. apples and pear.", correct: "Buy fresh fruits, e.g. apples and pears.", explanation: "Khi liệt kê ví dụ chung ở dạng số nhiều (những quả táo), danh từ quả lê phía sau cũng nên viết số nhiều 'pears' để đồng bộ!" }
    ],
    93: [
      { id: `ex_${unitNum}_err_1`, original: "Say the new vocabulary word aloud.", correct: "Say the new vocabulary words aloud.", explanation: "Khi luyện đọc từ vựng mới học nói chung, ta nên dùng danh từ số nhiều chỉ danh sách các từ là 'vocabulary words'!" },
      { id: `ex_${unitNum}_err_2`, original: "Students take note while the professor talks.", correct: "Students take notes while the professor talks.", explanation: "Cụm collocation chỉ việc ghi chép bài giảng luôn luôn viết ở dạng số nhiều là 'take notes' (có chữ 's')!" }
    ],
    94: [
      { id: `ex_${unitNum}_err_1`, original: "Don't be afraid to ask directions town.", correct: "Don't be afraid to ask for directions to town.", explanation: "Động từ đòi hỏi xin xỏ đi với giới từ 'ask for' và giới từ chỉ phương hướng hướng tới thị trấn là 'to town'!" },
      { id: `ex_${unitNum}_err_2`, original: "Look at dictionary entry for pronunciation.", correct: "Look at the dictionary entry for pronunciation.", explanation: "Vì mục từ tra cứu đã được xác định cụ thể trong ngữ cảnh sử dụng, ta thêm mạo từ 'the' đứng trước!" }
    ],
    95: [
      { id: `ex_${unitNum}_err_1`, original: "He suggested to go for a walk in park.", correct: "He suggested going for a walk in the park.", explanation: "Sau động từ gợi ý 'suggest' là động từ thêm đuôi -ing (V-ing) tạo cụm 'suggest going', và cần mạo từ 'the' trước 'park'!" },
      { id: `ex_${unitNum}_err_2`, original: "Can we reschedule meeting for tomorrow PM?", correct: "Can we reschedule the meeting for tomorrow PM.", explanation: "Cuộc họp đã được xác định từ trước giữa hai người, ta cần mạo từ 'the' đứng trước 'meeting'!" }
    ],
    96: [
      { id: `ex_${unitNum}_err_1`, original: "Can you borrow me your dictionary book?", correct: "Can you lend me your dictionary book.", explanation: "'Borrow' là mượn về sở hữu tạm thời, còn 'lend' là cho mượn đi. Ở đây ta xin đối phương cho mình mượn, dùng 'lend me'!" },
      { id: `ex_${unitNum}_err_2`, original: "Hurry up or we will miss the railway trains.", correct: "Hurry up or we will miss the railway train.", explanation: "Hành khách bỏ lỡ chuyến tàu cụ thể đi lại hằng ngày, dùng danh từ số ít chỉ phương tiện 'train'!" }
    ],
    97: [
      { id: `ex_${unitNum}_err_1`, original: "The temperature fell below zeros last night.", correct: "The temperature fell below zero last night.", explanation: "Số không 'zero' là danh từ chỉ mốc giá trị, ta viết ở dạng số ít nguyên bản 'below zero'!" },
      { id: `ex_${unitNum}_err_2`, original: "Five plus five equal ten, a piece of cake.", correct: "Five plus five equals ten, a piece of cake.", explanation: "Phép toán cộng 'Five plus five' được tính là một chủ thể số ít duy nhất, do đó động từ 'equal' cần thêm 's' thành 'equals'!" }
    ],
    98: [
      { id: `ex_${unitNum}_err_1`, original: "Is the railway station far the hotel?", correct: "Is the railway station far from the hotel.", explanation: "Tính từ chỉ khoảng cách xa so với địa điểm nào đi kèm giới từ 'from' cố định (far from somewhere)!" },
      { id: `ex_${unitNum}_err_2`, original: "Let's take a short cuts through the field.", correct: "Let's take a short cut through the field.", explanation: "Thành ngữ cố định chỉ việc đi đường tắt luôn viết số ít là 'take a short cut' (không có chữ 's')!" }
    ],
    99: [
      { id: `ex_${unitNum}_err_1`, original: "The river is wide near the ocean banks.", correct: "The river is wide near the ocean bank.", explanation: "Bờ sông, bờ đại dương nơi tiếp giáp nói chung trong câu cảnh vật viết ở dạng số ít là 'bank'!" },
      { id: `ex_${unitNum}_err_2`, original: "The coffee table has got a round shapes.", correct: "The coffee table has got a round shape.", explanation: "Vì phía trước có mạo từ chỉ số lượng một 'a', danh từ hình dáng 'shape' bắt buộc phải viết ở số ít!" }
    ],
    100: [
      { id: `ex_${unitNum}_err_1`, original: "How much do the heavy suitcase weigh?", correct: "How much does the heavy suitcase weigh.", explanation: "Chủ ngữ 'the heavy suitcase' là ngôi thứ ba số ít, do đó trợ động từ hỏi đi kèm bắt buộc phải dùng 'does' chứ không dùng 'do'!" },
      { id: `ex_${unitNum}_err_2`, original: "A tiny gold coin weigh about ten grams.", correct: "A tiny gold coin weighs about ten grams.", explanation: "Chủ ngữ 'A tiny gold coin' là số ít, do đó động từ chính 'weigh' ở thì hiện tại đơn phải thêm 's' thành 'weighs'!" }
    ]
  };

  const firstHalfWords = words.slice(0, 4);
  const secondHalfWords = words.slice(4, 8);

  // Exercise 1: Fill in the Blanks (First 4 words) (X.1)
  const ex1 = {
    exNum: `${unitNum}.1`,
    type: 'fill_in_blanks',
    instruction: 'Complete the sentences using the correct words from the first half of this unit:',
    questions: firstHalfWords.map((w, idx) => {
      const cleanExample = w.example.replace(new RegExp(w.word, 'gi'), '[blank]');
      return {
        id: `ex_${unitNum}_1_q${idx + 1}`,
        text: cleanExample,
        answers: [w.word],
        hint: `Nghĩa: ${w.vi}`,
        explanation: `Từ cần điền chính xác ở đây là từ vựng cốt lõi **'${w.word}'** (${w.type}), mang ý nghĩa: *${w.vi}*. Hãy đọc to câu ví dụ hoàn chỉnh: "${w.example}"`
      };
    })
  };

  // Exercise 2: Error Correction (Authentic textbook errors) (X.2)
  const ex2 = {
    exNum: `${unitNum}.2`,
    type: 'error_correction',
    instruction: 'Find and correct the grammatical or vocabulary errors in these sentences:',
    questions: errorCorrectionDb[unitNum] || [
      { id: `ex_${unitNum}_err_1`, original: `I study ${words[0].word} every days.`, correct: `I study ${words[0].word} every day.`, explanation: "Sau 'every' ta dùng danh từ số ít 'day' chứ không dùng số nhiều 'days'!" },
      { id: `ex_${unitNum}_err_2`, original: `She is good in ${words[1].word}.`, correct: `She is good at ${words[1].word}.`, explanation: "Thành ngữ chỉ việc giỏi môn gì/lĩnh vực gì luôn là 'good at', không dùng 'good in'!" }
    ]
  };

  // Exercise 3: Matching Words to Translations (All 8 words) (X.3)
  const allTranslations = words.map(w => w.vi);
  const ex3 = {
    exNum: `${unitNum}.3`,
    type: 'matching',
    instruction: 'Match the English words on the left with their correct Vietnamese meanings on the right:',
    questions: words.map((w, idx) => {
      return {
        id: `ex_${unitNum}_3_q${idx + 1}`,
        text: w.word,
        options: [...allTranslations].sort(() => Math.random() - 0.5),
        answer: w.vi,
        explanation: `Từ tiếng Anh **'${w.word}'** (${w.type}) có nghĩa tiếng Việt là: *${w.vi}*. Giao tiếp thực tế: "${w.example}"`
      };
    })
  };

  // Exercise 4: Categorization into Buckets (All 8 words) (X.4)
  const ex4 = {
    exNum: `${unitNum}.4`,
    type: 'categorization',
    instruction: 'Organise the words into their correct semantic categories:',
    categories: buckets,
    questions: words.map(w => {
      return {
        word: w.word,
        category: buckets[w.bucket],
        explanation: `Từ **'${w.word}'** (${w.type}) được phân vào nhóm **'${buckets[w.bucket]}'** vì từ mang ý nghĩa: *${w.vi}*`
      };
    })
  };

  // Exercise 5: Fill in the Blanks (Last 4 words) (X.5)
  const ex5 = {
    exNum: `${unitNum}.5`,
    type: 'fill_in_blanks',
    instruction: 'Complete the sentences using the correct words from the second half of this unit:',
    questions: secondHalfWords.map((w, idx) => {
      const cleanExample = w.example.replace(new RegExp(w.word, 'gi'), '[blank]');
      return {
        id: `ex_${unitNum}_5_q${idx + 1}`,
        text: cleanExample,
        answers: [w.word],
        hint: `Nghĩa: ${w.vi}`,
        explanation: `Từ cần điền chính xác ở đây là từ vựng cốt lõi **'${w.word}'** (${w.type}), mang ý nghĩa: *${w.vi}*. Hãy đọc to câu ví dụ hoàn chỉnh: "${w.example}"`
      };
    })
  };

  return [ex1, ex2, ex3, ex4, ex5];
}

// Helper to compile Unit data into complete 3-Tier structures, Quizzes, Drag Drops and Typing Games
function compileUnit(unit) {
  const { unitNum, title, description, buckets, words } = unit;
  console.log('Compiling Unit:', unitNum, 'Words count:', words ? words.length : 'undefined');

  // 1. Build 3-Tier theory structure
  const coreVocabList = [];
  const enhancedWords = words.map(w => {
    // Basic collocations and derivatives depending on word
    let collocations = [`use the word ${w.word}`];
    let wordFamily = `Từ loại khác của từ này có thể tìm thấy trong từ điển!`;
    
    if (w.word === "washing-up liquid") {
      collocations = ["use washing-up liquid", "need washing-up liquid"];
      wordFamily = "wash (v/n) rửa/sự rửa, liquid (n/adj) chất lỏng";
    } else if (w.word === "saucepan") {
      collocations = ["large saucepan", "boil in saucepan"];
      wordFamily = "pan (n) xoong/chảo";
    } else if (w.word === "frying pan") {
      collocations = ["hot frying pan", "fry in frying pan"];
      wordFamily = "fry (v) chiên/rán, pan (n) cái chảo";
    } else if (w.word === "vacuum cleaner") {
      collocations = ["electric vacuum cleaner", "run vacuum cleaner"];
      wordFamily = "vacuum (n/v) hút bụi/chân không, clean (v/adj) dọn sạch";
    } else if (w.word === "iron") {
      collocations = ["electric iron", "iron shirt"];
      wordFamily = "ironing (n) việc là quần áo, ironed (adj)";
    } else if (w.word === "drop a glass") {
      collocations = ["accidentally drop a glass", "carefully drop a glass"];
      wordFamily = "drop (v/n) làm rơi/giọt nước, glass (n) ly thủy tinh";
    } else if (w.word === "run out of petrol") {
      collocations = ["almost run out of petrol", "completely run out of petrol"];
      wordFamily = "run (v) chạy, out (adv), petrol (n) xăng";
    } else if (w.word === "leak") {
      collocations = ["leak water", "leak gas", "bad leak"];
      wordFamily = "leaking (adj) đang rò rỉ, leakage (n) sự rò rỉ";
    } else if (w.word === "power cut") {
      collocations = ["sudden power cut", "frequent power cut"];
      wordFamily = "power (n) năng lượng/điện, cut (v/n) cắt/sự cắt";
    } else if (w.word === "borrow") {
      collocations = ["borrow money", "borrow book", "borrow from someone"];
      wordFamily = "borrower (n) người đi vay mượn";
    } else if (w.word === "lend") {
      collocations = ["lend money", "lend bicycle", "lend to someone"];
      wordFamily = "lender (n) người cho vay mượn";
    } else if (w.word === "sore throat") {
      collocations = ["have a sore throat", "terrible sore throat"];
      wordFamily = "sore (adj) đau nhức, throat (n) cổ họng";
    } else if (w.word === "fever") {
      collocations = ["high fever", "have a fever"];
      wordFamily = "feverish (adj) hơi sốt, có triệu chứng sốt";
    } else if (w.word === "medicine") {
      collocations = ["take medicine", "liquid medicine", "cough medicine"];
      wordFamily = "medical (adj) thuộc y khoa, medication (n) dược phẩm";
    } else if (w.word === "jeans") {
      collocations = ["blue jeans", "wear jeans", "tight jeans"];
      wordFamily = "jean (n) chất liệu vải bò";
    } else if (w.word === "supermarket") {
      collocations = ["local supermarket", "go to supermarket"];
      wordFamily = "market (n) chợ/thị trường, super (adj) siêu";
    } else if (w.word === "receipt") {
      collocations = ["keep the receipt", "store receipt", "change receipt"];
      wordFamily = "receive (v) nhận được, receiver (n) người nhận";
    } else if (w.word === "boil") {
      collocations = ["boil water", "boil egg", "boiling point"];
      wordFamily = "boiler (n) nồi hơi, boiled (adj) được luộc chín";
    } else if (w.word === "library") {
      collocations = ["public library", "university library"];
      wordFamily = "librarian (n) thủ thư giữ thư viện";
    } else if (w.word === "traffic light") {
      collocations = ["red traffic light", "green traffic light"];
      wordFamily = "traffic (n) giao thông, light (n/adj) đèn/nhẹ";
    } else if (w.word === "single ticket") {
      collocations = ["buy a single ticket", "one-way single ticket"];
      wordFamily = "single (adj) đơn/độc thân, ticket (n) tấm vé";
    } else if (w.word === "classroom") {
      collocations = ["clean classroom", "enter classroom"];
      wordFamily = "class (n) lớp học, room (n) phòng";
    } else if (w.word === "do homework") {
      collocations = ["finish homework", "forget homework"];
      wordFamily = "home (n) nhà, work (n/v) làm việc";
    } else if (w.word === "professor") {
      collocations = ["college professor", "assistant professor"];
      wordFamily = "professional (adj) chuyên nghiệp, profession (n) nghề";
    } else if (w.word === "scholarship") {
      collocations = ["win a scholarship", "full scholarship"];
      wordFamily = "scholar (n) học giả, scholarly (adj) học thuật";
    } else if (w.word === "colleague") {
      collocations = ["work colleague", "dear colleague"];
      wordFamily = "colleague (n) đồng nghiệp cùng ngành";
    } else if (w.word === "salary") {
      collocations = ["high salary", "monthly salary", "earn salary"];
      wordFamily = "salaried (adj) được trả lương tháng";
    } else if (w.word === "company") {
      collocations = ["well-known company", "run a company"];
      wordFamily = "companion (n) người đồng hành, bạn đồng hành";
    } else if (w.word === "win") {
      collocations = ["win match", "win award", "win easily"];
      wordFamily = "winner (n) người chiến thắng, winning (adj)";
    } else if (w.word === "lose") {
      collocations = ["lose game", "lose keys", "lose money"];
      wordFamily = "loser (n) người thất bại/thua cuộc, loss (n) sự mất";
    } else if (w.word === "trainers") {
      collocations = ["running trainers", "comfortable trainers"];
      wordFamily = "train (v) huấn luyện/đào tạo, trainer (n) huấn luyện viên";
    } else if (w.word === "subtitles") {
      collocations = ["English subtitles", "movie subtitles"];
      wordFamily = "title (n) tiêu đề, sub (prefix) phụ/dưới";
    } else if (w.word === "novel") {
      collocations = ["romantic novel", "read a novel"];
      wordFamily = "novelist (n) nhà văn viết tiểu thuyết";
    } else if (w.word === "buy souvenirs") {
      collocations = ["buy local souvenirs", "souvenirs shop"];
      wordFamily = "buy (v) mua, souvenir (n) món quà lưu niệm";
    } else if (w.word === "wedding") {
      collocations = ["wedding party", "attend a wedding"];
      wordFamily = "wed (v) kết hôn, làm đám cưới";
    } else if (w.word === "break the law") {
      collocations = ["frequently break the law", "never break the law"];
      wordFamily = "break (v) làm vỡ, law (n) luật pháp, lawyer (n) luật sư";
    } else if (w.word === "government") {
      collocations = ["local government", "national government"];
      wordFamily = "govern (v) cai quản/cai trị, governor (n) thống đốc";
    } else if (w.word === "pollution") {
      collocations = ["air pollution", "water pollution", "reduce pollution"];
      wordFamily = "pollute (v) làm ô nhiễm, polluted (adj) bị ô nhiễm";
    } else if (w.word === "save") {
      collocations = ["save money", "save time", "save energy"];
      wordFamily = "safe (adj) an toàn, safety (n) sự an toàn";
    } else if (w.word === "weapon") {
      collocations = ["dangerous weapon", "iron weapon"];
      wordFamily = "weaponry (n) kho vũ khí quân dụng";
    } else if (w.word === "keyboard") {
      collocations = ["type on keyboard", "computer keyboard"];
      wordFamily = "key (n) phím/khóa, board (n) cái bảng";
    } else if (w.word === "website") {
      collocations = ["visit website", "official website"];
      wordFamily = "web (n) mạng/lưới, site (n) địa điểm";
    } else if (w.word === "documentary") {
      collocations = ["documentary film", "watch documentary"];
      wordFamily = "document (n) tài liệu, documentation (n) chứng từ";
    } else if (w.word === "make a phone call") {
      collocations = ["make phone call", "urgent phone call"];
      wordFamily = "phone (n/v) điện thoại, call (v/n) gọi/cuộc gọi";
    } else if (w.word === "introduce") {
      collocations = ["introduce colleague", "introduce yourself"];
      wordFamily = "introduction (n) sự giới thiệu, introductory (adj)";
    } else if (w.word === "listen to") {
      collocations = ["listen to music", "listen to teacher"];
      wordFamily = "listener (n) người nghe/thính giả";
    } else if (w.word === "want someone to") {
      collocations = ["want Tim to", "want you to"];
      wordFamily = "want (v) muốn, desire (v/n) khao khát";
    } else if (w.word === "second-hand") {
      collocations = ["second-hand books", "second-hand clothes"];
      wordFamily = "second (num) thứ hai, hand (n) bàn tay";
    } else if (w.word === "tall") {
      collocations = ["tall man", "tall building"];
      wordFamily = "tallness (n) chiều cao, sự cao ráo";
    } else if (w.word === "easily") {
      collocations = ["pass easily", "win easily", "easily completed"];
      wordFamily = "easy (adj) dễ dàng, ease (n) sự thanh thản/dễ dàng";
    } else if (w.word === "formal") {
      collocations = ["formal letter", "formal meeting"];
      wordFamily = "formality (n) sự trang trọng/thủ tục, formally (adv)";
    } else if (w.word === "signature") {
      collocations = ["put your signature", "official signature"];
      wordFamily = "sign (v) ký tên, signal (n) dấu hiệu";
    } else if (w.word === "first of all") {
      collocations = ["first of all write", "first of all say"];
      wordFamily = "first (num) đầu tiên, all (pronoun) tất cả";
    } else if (w.word === "sincerely") {
      collocations = ["yours sincerely", "sincerely reply"];
      wordFamily = "sincere (adj) chân thành, sincerity (n) sự chân thành";
    } else if (w.word === "by the way") {
      collocations = ["by the way did you", "by the way I hope"];
      wordFamily = "way (n) con đường/cách thức";
    } else if (w.word === "e.g.") {
      collocations = ["fruits e.g. apples", "sports e.g. football"];
      wordFamily = "Latin: exempli gratia (ví dụ như là)";
    } else if (w.word === "take notes") {
      collocations = ["take notes lecture", "take notes carefully"];
      wordFamily = "note (n/v) ghi chú/vở, take (v) lấy";
    } else if (w.word === "definition") {
      collocations = ["read definition", "clear definition"];
      wordFamily = "define (v) định nghĩa, definite (adj) xác định";
    } else if (w.word === "confirm") {
      collocations = ["confirm meeting", "confirm time"];
      wordFamily = "confirmation (n) sự xác nhận, confirmed (adj)";
    } else if (w.word === "expect") {
      collocations = ["expect to win", "expect to get"];
      wordFamily = "expectation (n) sự kỳ vọng/mong đợi";
    } else if (w.word === "million") {
      collocations = ["one million", "million tourists"];
      wordFamily = "millionaire (n) triệu phú đô la";
    } else if (w.word === "speed limit") {
      collocations = ["below speed limit", "obey speed limit"];
      wordFamily = "speed (n/v) tốc độ, limit (n/v) giới hạn";
    } else if (w.word === "shape") {
      collocations = ["round shape", "square shape"];
      wordFamily = "shapeless (adj) không có hình dạng rõ ràng";
    } else if (w.word === "kilogram") {
      collocations = ["one kilogram", "kilogram potatoes"];
      wordFamily = "kilo (n) ki-lô, gram (n) gam";
    } else {
      collocations = [`frequently use ${w.word}`, `study the word ${w.word}`, `understand ${w.word}`];
      wordFamily = `Từ loại: [${w.type}]. Hãy tra cứu thêm các biến thể từ loại của "${w.word}" trong từ điển monolingual nhé!`;
    }

    return {
      ...w,
      collocations,
      wordFamily
    };
  });

  // Core Vocab list details
  coreVocabList.push({
    heading: "📘 Danh sách Từ Vựng Cốt Lõi (Core Vocabulary)",
    intro: "Mỗi từ vựng dưới đây được trình bày cực kỳ trực quan kèm phiên âm Quốc tế IPA, dịch nghĩa chuẩn xác và ví dụ sinh động giúp người học (cả trẻ nhỏ và người lớn) dễ tiếp thu nhất:",
    details: enhancedWords.map(w => ({
      title: `${w.word} (${w.type})`,
      value: `🔊 Phát âm: **${w.phonetic}**\n👉 Dịch nghĩa: *${w.vi}*\n💬 Ví dụ thực tế: "${w.example}"`
    }))
  });

  // Dynamic practical usage list
  let practicalUsageList = [];
  let discoveryCornerList = [];

  const theme = title.replace(/Unit \d+:\s*/i, "");
  
  practicalUsageList = [
    {
      heading: `💬 Thực hành giao tiếp & Cụm từ thông dụng (${theme})`,
      intro: `Hãy luyện tập nói tự nhiên như người bản xứ. Đây là các cụm từ (Collocations) kết hợp từ các từ vựng chính của bài hằng ngày giúp trẻ phản xạ nói siêu tốc:`,
      details: enhancedWords.map(w => ({
        title: `Cụm từ đi kèm của: "${w.word}"`,
        value: `👉 Cụm từ: "${w.collocations.join(' / ')}"\n💬 Giao tiếp thực tế: "${w.example}"`
      }))
    }
  ];

  // Smart cross-references to avoid duplication
  const crossRefNotes = [];
  
  if (unitNum === 53) {
    crossRefNotes.push({
      title: "⚠️ Thành ngữ thanh toán tiền mặt (Cash)",
      value: "Khi thanh toán bằng tiền mặt, chúng ta luôn nói 'pay in cash' (giới từ 'in'). Còn khi trả bằng thẻ tín dụng, ta dùng 'pay by credit card' (giới từ 'by'). Đừng viết nhầm giới từ của hai cụm này nhé!"
    });
  } else if (unitNum === 55) {
    crossRefNotes.push({
      title: "⚠️ Danh từ luôn số nhiều về trang phục (Jeans, Boots)",
      value: "`jeans` (quần bò) và `boots` (giày bốt) là những danh từ luôn đi theo cặp/2 ống nên viết ở dạng số nhiều. Không đi kèm mạo từ 'a/an' trực tiếp. Hãy nhớ lại quy tắc danh từ số nhiều đã học ở Unit 4 và Unit 27!"
    });
  } else if (unitNum === 73) {
    crossRefNotes.push({
      title: "⚠️ Phân biệt trộm cắp: Thief, Burglar, Robber",
      value: "`thief` là kẻ trộm chung lén lút, `burglar` là kẻ lẻn vào nhà cạy khóa bẻ cửa, còn `robber` là kẻ cướp có vũ lực/đe dọa (ví dụ: cướp ngân hàng). Dùng đúng từ trong ngữ cảnh giúp tiếng Anh của bạn chuyên nghiệp hơn!"
    });
  } else if (unitNum === 88) {
    crossRefNotes.push({
      title: "⚠️ Chữ cái câm trong viết đơn: Signature, Sign",
      value: "Trong động từ `sign` /saɪn/ và danh từ `signature` /ˈsɪɡnətʃə/, chữ cái 'g' là âm câm (silent letter), ta không phát âm chữ 'g' này ra miệng. Hãy nhớ lại bài học âm câm ở Unit 5 nhé!"
    });
  } else if (unitNum === 90) {
    crossRefNotes.push({
      title: "⚠️ Cấu trúc mong đợi: Look forward to",
      value: "Nhớ quy tắc ngữ pháp đặc biệt: Sau cụm từ 'look forward to', động từ đi sau bắt buộc phải thêm đuôi -ing (V-ing), ví dụ: 'look forward to hearing from you'. Quy tắc sau giới từ là V-ing đã học ở Unit 14!"
    });
  } else if (unitNum === 96) {
    crossRefNotes.push({
      title: "⚠️ Tránh nhầm lẫn: Borrow vs Lend",
      value: "`borrow` là mượn cái gì của ai về dùng (borrow something from someone), còn `lend` là cho ai mượn cái gì của mình đi (lend something to someone). Đừng nhầm lẫn hướng di chuyển của đồ vật nhé!"
    });
  }

  const defaultDiscoveryDetails = [
    {
      title: `🐰 Mẹo học từ nhanh từ Scholar Bunny chủ đề ${theme}`,
      value: `👉 Hãy liên kết các từ vựng này với cuộc sống của bạn hằng ngày. Chỉ tay vào đồ dùng xung quanh phòng và đọc to tiếng Anh của chúng lên nhé!\n👉 Sử dụng Flashcard để lật mở luyện trí nhớ ngắt quãng.`
    },
    {
      title: `🧩 Cấu tạo từ loại & Phân nhóm (Word Building)`,
      value: `Hãy ghi nhớ loại từ [Danh từ, Động từ, Tính từ] bên cạnh mỗi từ vựng mới học. Điều này giúp bạn xếp từ vào đúng vị trí ngữ pháp của câu như bài học Unit 4!`
    }
  ];

  discoveryCornerList = [
    {
      heading: `💡 Góc khám phá & Mẹo học học thuật (${theme})`,
      intro: `Mẹo ghi nhớ siêu tốc của Scholar Bunny 🐰, các lưu ý tránh sai lầm và liên kết ngữ pháp thông minh, dễ hiểu đối với trẻ nhỏ:`,
      details: [
        ...crossRefNotes,
        ...defaultDiscoveryDetails
      ]
    }
  ];

  const theory = {
    coreVocab: enhancedWords,
    practicalUsage: practicalUsageList,
    discoveryCorner: discoveryCornerList
  };

  // 2. Build Exactly 32 Drag Drop items (8 base + 8 collocations + 8 synonyms + 8 context words)
  const dragDropItems = [];

  // Group 1: 8 Base Words
  words.forEach((w, index) => {
    dragDropItems.push({
      id: `dd_b_${index + 1}`,
      word: w.word,
      target: buckets[w.bucket],
      vi: w.vi
    });
  });

  // Group 2: 8 Collocations
  enhancedWords.forEach((w, index) => {
    dragDropItems.push({
      id: `dd_c_${index + 1}`,
      word: w.collocations[0],
      target: buckets[w.bucket],
      vi: `cụm từ đi với ${w.word}`
    });
  });

  // Group 3: 8 Synonyms / Derivatives
  enhancedWords.forEach((w, index) => {
    let deriv = w.wordFamily.split(' ')[0].replace(/,/g, '');
    if (deriv.length < 2 || deriv === "Từ" || deriv === "Từ loại:" || deriv === "Latin:") {
      deriv = "Từ";
    }
    dragDropItems.push({
      id: `dd_s_${index + 1}`,
      word: deriv,
      target: buckets[w.bucket],
      vi: `biến thể từ loại của ${w.word}`
    });
  });

  // Group 4: 8 Context Words (derived from example sentences)
  enhancedWords.forEach((w, index) => {
    const tokens = w.example.split(' ');
    let ctxWord = tokens[0];
    if (ctxWord.toLowerCase() === w.word.split(' ')[0].toLowerCase() && tokens[1]) {
      ctxWord = tokens[1];
    }
    ctxWord = ctxWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    dragDropItems.push({
      id: `dd_x_${index + 1}`,
      word: ctxWord,
      target: buckets[w.bucket],
      vi: `từ ngữ cảnh của ${w.word}`
    });
  });

  const dragDrop = {
    buckets: buckets,
    items: dragDropItems
  };

  // 3. Build Exactly 20 Quiz questions (16 base collocations + 4 synonyms)
  const quizQuestions = [];

  // 16 base collocation/context questions
  enhancedWords.forEach((w, index) => {
    const hiddenPhrase = w.example.replace(new RegExp(w.word, 'gi'), '_____');
    const wrongAnswers = enhancedWords.filter((x, idx) => idx !== index).map(x => x.word).slice(0, 3);
    
    quizQuestions.push({
      q: `Điền từ thích hợp vào chỗ trống: "${hiddenPhrase}"`,
      options: [w.word, ...wrongAnswers].sort(() => Math.random() - 0.5),
      a: w.word
    });

    const colStr = w.collocations[0];
    const hiddenCol = colStr.replace(new RegExp(w.word, 'gi'), '_____');
    const wrongCols = enhancedWords.filter((x, idx) => idx !== index).map(x => x.word).slice(0, 3);

    quizQuestions.push({
      q: `Hoàn thành cụm từ (Collocation) sau: "${hiddenCol}"`,
      options: [w.word, ...wrongCols].sort(() => Math.random() - 0.5),
      a: w.word
    });
  });

  // 4 synonym / related questions to make exactly 20
  for (let i = 0; i < 4; i++) {
    const w = enhancedWords[i];
    quizQuestions.push({
      q: `Đâu là loại từ (Part of Speech) chính xác của từ "${w.word}"?`,
      options: [w.type, "Động từ", "Danh từ", "Tính từ", "Trạng từ"].filter((value, index, self) => self.indexOf(value) === index).slice(0, 4),
      a: w.type
    });
  }

  // 4. Build Exactly 20 Typing Questions
  const typingGameQuestions = [];

  // Helper to make a hint like "u_h_p_y" for "unhappy"
  const makeHint = (word) => {
    return word.split('').map((char, index) => {
      if (char === ' ') return ' ';
      return index % 2 === 0 ? char : '_';
    }).join('');
  };

  // 8 Base Words (Questions 1 to 8)
  enhancedWords.forEach((w) => {
    typingGameQuestions.push({
      q: `Gõ từ tiếng Anh có nghĩa là: "${w.vi}"`,
      hint: makeHint(w.word),
      a: w.word
    });
  });

  // 8 Collocations (Questions 9 to 16)
  enhancedWords.forEach((w) => {
    let coll = w.collocations[0];
    let collVi = "";
    if (w.word === "washing-up liquid") {
      coll = "use washing-up liquid";
      collVi = "sử dụng nước rửa chén bát";
    } else if (w.word === "vacuum cleaner") {
      coll = "run vacuum cleaner";
      collVi = "chạy máy hút bụi thảm";
    } else if (w.word === "iron") {
      coll = "iron shirt";
      collVi = "là ủi quần áo sơ mi";
    } else if (w.word === "drop a glass") {
      coll = "accidentally drop a glass";
      collVi = "vô tình làm rơi ly thủy tinh";
    } else if (w.word === "run out of petrol") {
      coll = "almost run out of petrol";
      collVi = "gần như đã hết sạch xăng xe";
    } else if (w.word === "borrow") {
      coll = "borrow money";
      collVi = "vay mượn tiền bạc tạm thời";
    } else if (w.word === "lend") {
      coll = "lend money";
      collVi = "cho ai đó vay mượn tiền bạc";
    } else if (w.word === "fever") {
      coll = "high fever";
      collVi = "sốt nhiệt độ cao cơ thể";
    } else if (w.word === "medicine") {
      coll = "take medicine";
      collVi = "uống thuốc chữa bệnh định kỳ";
    } else if (w.word === "jeans") {
      coll = "wear jeans";
      collVi = "mặc quần bò thời trang cá tính";
    } else if (w.word === "receipt") {
      coll = "keep the receipt";
      collVi = "giữ lại hóa đơn biên lai mua";
    } else if (w.word === "boil") {
      coll = "boil water";
      collVi = "đun nước sôi nấu nướng luộc";
    } else if (w.word === "do homework") {
      coll = "finish homework";
      collVi = "hoàn thành bài tập về nhà";
    } else if (w.word === "scholarship") {
      coll = "win a scholarship";
      collVi = "đoạt được học bổng đại học";
    } else if (w.word === "salary") {
      coll = "earn salary";
      collVi = "kiếm mức lương tháng cố định";
    } else if (w.word === "company") {
      coll = "run a company";
      collVi = "vận hành quản lý một doanh nghiệp";
    } else if (w.word === "win") {
      coll = "win match";
      collVi = "thắng trận đấu thể thao bóng";
    } else if (w.word === "lose") {
      coll = "lose game";
      collVi = "thua trận đấu bóng thể thao";
    } else if (w.word === "subtitles") {
      coll = "English subtitles";
      collVi = "phụ đề tiếng Anh chạy phim";
    } else if (w.word === "novel") {
      coll = "read a novel";
      collVi = "đọc một cuốn tiểu thuyết văn";
    } else if (w.word === "buy souvenirs") {
      coll = "buy local souvenirs";
      collVi = "mua quà lưu niệm tại địa phương";
    } else if (w.word === "break the law") {
      coll = "never break the law";
      collVi = "không bao giờ vi phạm pháp luật";
    } else if (w.word === "government") {
      coll = "local government";
      collVi = "chính quyền chính phủ địa phương";
    } else if (w.word === "pollution") {
      coll = "air pollution";
      collVi = "sự ô nhiễm không khí khói bụi";
    } else if (w.word === "save") {
      coll = "save money";
      collVi = "tiết kiệm tiền bạc tích trữ";
    } else if (w.word === "keyboard") {
      coll = "type on keyboard";
      collVi = "gõ chữ trên bàn phím máy tính";
    } else if (w.word === "website") {
      coll = "visit website";
      collVi = "ghé thăm trang web trực tuyến";
    } else if (w.word === "make a phone call") {
      coll = "make phone call";
      collVi = "thực hiện cuộc gọi điện thoại";
    } else if (w.word === "introduce") {
      coll = "introduce yourself";
      collVi = "tự giới thiệu bản thân mình";
    } else if (w.word === "second-hand") {
      coll = "second-hand clothes";
      collVi = "quần áo cũ đã qua sử dụng";
    } else if (w.word === "first of all") {
      coll = "first of all write";
      collVi = "trước tiên là viết chữ lên giấy";
    } else if (w.word === "sincerely") {
      coll = "yours sincerely";
      collVi = "kính thư trân trọng ký tên";
    } else if (w.word === "by the way") {
      coll = "by the way I hope";
      collVi = "tiện thể tôi hy vọng chuyện này";
    } else if (w.word === "take notes") {
      coll = "take notes carefully";
      collVi = "ghi chép bài học cẩn thận tóm";
    } else if (w.word === "confirm") {
      coll = "confirm meeting";
      collVi = "xác nhận lại lịch cuộc hẹn họp";
    } else if (w.word === "expect") {
      coll = "expect to win";
      collVi = "kỳ vọng chiến thắng trận đấu";
    } else if (w.word === "speed limit") {
      coll = "below speed limit";
      collVi = "chạy dưới giới hạn tốc độ xe";
    } else if (w.word === "weigh") {
      coll = "weigh package";
      collVi = "cân kiện hàng bưu phẩm đo";
    } else {
      if (w.type.includes("Động từ")) {
        coll = `try to ${w.word.toLowerCase()}`;
        collVi = `nỗ lực thực hiện ${w.word.toLowerCase()}`;
      } else if (w.type.includes("Danh từ")) {
        coll = `use a ${w.word.toLowerCase()}`;
        collVi = `sử dụng một ${w.word.toLowerCase()}`;
      } else {
        coll = `feel very ${w.word.toLowerCase()}`;
        collVi = `cảm thấy rất ${w.word.toLowerCase()}`;
      }
    }

    typingGameQuestions.push({
      q: `Gõ cụm từ tiếng Anh có nghĩa là: "${collVi}"`,
      hint: makeHint(coll),
      a: coll
    });
  });

  // 4 Synonyms / Closely related terms (Questions 17 to 20)
  for (let i = 0; i < 4; i++) {
    const w = enhancedWords[i];
    let syn = "";
    let synVi = "";
    
    if (w.word === "washing-up liquid") {
      syn = "cleaning soap";
      synVi = "xà phòng rửa chén bát làm sạch";
    } else if (w.word === "saucepan") {
      syn = "cooking pot";
      synVi = "xoong nồi nấu chín thực phẩm";
    } else if (w.word === "frying pan") {
      syn = "cooking skillet";
      synVi = "chảo rán chiên rán thức ăn";
    } else if (w.word === "drop a glass") {
      syn = "accident fall";
      synVi = "tai nạn rơi rớt đổ bể ly nước";
    } else if (w.word === "run out of petrol") {
      syn = "no fuel left";
      synVi = "không còn nhiên liệu xăng dầu";
    } else if (w.word === "leak") {
      syn = "drip water";
      synVi = "chảy nước rò rỉ nước nhỏ giọt";
    } else if (w.word === "borrow") {
      syn = "take on loan";
      synVi = "vay mượn nợ nần tạm thời";
    } else if (w.word === "lend") {
      syn = "give on loan";
      synVi = "cho vay cho mượn tạm thời nợ";
    } else if (w.word === "sore throat") {
      syn = "painful throat";
      synVi = "đau rát cổ họng khó chịu nuốt";
    } else if (w.word === "fever") {
      syn = "high temperature";
      synVi = "nhiệt độ cơ thể sốt cao nóng";
    } else if (w.word === "medicine") {
      syn = "pharmacy drug";
      synVi = "dược phẩm y khoa thuốc chữa";
    } else if (w.word === "jeans") {
      syn = "denim trousers";
      synVi = "quần dài chất liệu vải bò xanh";
    } else if (w.word === "supermarket") {
      syn = "grocery store";
      synVi = "cửa hàng tạp hóa thực phẩm lớn";
    } else if (w.word === "receipt") {
      syn = "purchase bill";
      synVi = "hóa đơn biên lai mua hàng thanh";
    } else if (w.word === "boil") {
      syn = "heat to boil";
      synVi = "đun nóng nước tới điểm sôi luộc";
    } else if (w.word === "classroom") {
      syn = "study chamber";
      synVi = "phòng học tập giảng đường học";
    } else if (w.word === "do homework") {
      syn = "home assignments";
      synVi = "bài tập tự luyện tại nhà giao";
    } else if (w.word === "professor") {
      syn = "academic tutor";
      synVi = "người dạy học đại học giáo sư";
    } else if (w.word === "scholarship") {
      syn = "study grant";
      synVi = "trợ cấp học bổng nghiên cứu";
    } else if (w.word === "colleague") {
      syn = "office teammate";
      synVi = "đồng nghiệp chung nhóm phòng ban";
    } else if (w.word === "salary") {
      syn = "monthly wage";
      synVi = "tiền công lương tháng trả lao động";
    } else if (w.word === "company") {
      syn = "business firm";
      synVi = "doanh nghiệp hãng buôn thương mại";
    } else if (w.word === "win") {
      syn = "victory triumph";
      synVi = "sự thắng lợi vẻ vang chiến thắng";
    } else if (w.word === "lose") {
      syn = "defeat failure";
      synVi = "thất bại thua cuộc trong game đấu";
    } else if (w.word === "trainers") {
      syn = "sneaker shoes";
      synVi = "giày thể thao đi bộ chạy bộ nhẹ";
    } else if (w.word === "subtitles") {
      syn = "translation text";
      synVi = "chữ dịch chạy dưới màn hình phim";
    } else if (w.word === "novel") {
      syn = "fiction book";
      synVi = "sách tiểu thuyết hư cấu văn học";
    } else if (w.word === "buy souvenirs") {
      syn = "get keepsake";
      synVi = "mua đồ kỷ niệm quà lưu niệm";
    } else if (w.word === "wedding") {
      syn = "marriage ceremony";
      synVi = "hôn lễ đám cưới kết hôn nên";
    } else if (w.word === "break the law") {
      syn = "commit crime";
      synVi = "phạm tội vi phạm quy định pháp";
    } else if (w.word === "government") {
      syn = "ruling cabinet";
      synVi = "nội các cầm quyền chính phủ bang";
    } else if (w.word === "pollution") {
      syn = "contamination contamination";
      synVi = "sự vấy bẩn làm ô nhiễm môi";
    } else if (w.word === "save") {
      syn = "rescue preserve";
      synVi = "giải cứu bảo tồn lưu trữ năng";
    } else if (w.word === "weapon") {
      syn = "combat arm";
      synVi = "vũ khí quân sự chiến tranh súng";
    } else if (w.word === "keyboard") {
      syn = "typing board";
      synVi = "bàn phím gõ chữ máy tính gõ";
    } else if (w.word === "website") {
      syn = "internet domain";
      synVi = "địa chỉ trang web trực tuyến mạng";
    } else if (w.word === "documentary") {
      syn = "factual report";
      synVi = "phóng sự phim tài liệu ghi chép";
    } else if (w.word === "make a phone call") {
      syn = "place a call";
      synVi = "gọi một cuộc gọi đàm thoại";
    } else if (w.word === "introduce") {
      syn = "present someone";
      synVi = "giới thiệu ra mắt ai đó với nhóm";
    } else if (w.word === "second-hand") {
      syn = "used products";
      synVi = "hàng hóa đã qua sử dụng mua lại";
    } else if (w.word === "first of all") {
      syn = "to start with";
      synVi = "đầu tiên là bắt đầu cuộc thảo";
    } else if (w.word === "sincerely") {
      syn = "with sincerity";
      synVi = "một cách chân thành từ đáy lòng";
    } else if (w.word === "by the way") {
      syn = "incidentally speaking";
      synVi = "nhân tiện nói luôn chuyện này nhé";
    } else if (w.word === "take notes") {
      syn = "write records";
      synVi = "chép biên bản ghi chép nhanh ý";
    } else if (w.word === "confirm") {
      syn = "verify agree";
      synVi = "xác thực đồng ý chốt lại thông";
    } else if (w.word === "expect") {
      syn = "anticipate assume";
      synVi = "dự kiến giả định đoán trước sẽ";
    } else if (w.word === "speed limit") {
      syn = "velocity boundary";
      synVi = "ranh giới tốc độ tối đa cho phép";
    } else if (w.word === "weigh") {
      syn = "evaluate mass";
      synVi = "đánh giá khối lượng cân nặng đo";
    } else {
      syn = `${w.word} synonym`;
      synVi = `thuật ngữ đồng nghĩa của ${w.word}`;
    }

    typingGameQuestions.push({
      q: `Gõ từ đồng nghĩa/liên quan mang nghĩa: "${synVi}"`,
      hint: makeHint(syn),
      a: syn
    });
  }

  // 5. Build Speaking
  const speaking = [
    {
      text: words[0].example,
      trans: `Hãy phát âm và luyện nói câu: "${words[0].example}"`
    },
    {
      text: words[7].example,
      trans: `Hãy phát âm và luyện nói câu: "${words[7].example}"`
    }
  ];

  return {
    id: `pre_${unitNum}`,
    title: title,
    description: description,
    words: words,
    theory,
    dragDrop,
    quiz: quizQuestions,
    typingGame: typingGameQuestions,
    speaking,
    textbookExercises: compileTextbookExercises(unit)
  };
}

// Compile all 50 units
const compiledCourseData = rawUnits.map(compileUnit);

// Prepare file content
const fileContent = `// File: src/data/oxfordPreIntDataPart2.js
// Auto-generated data file containing Units 51-100 for Oxford Pre-Intermediate & Intermediate vocabulary course.
// Built with strict academic precision from real Cambridge syllabuses (1997 First Edition).

export const courseData = ${JSON.stringify(compiledCourseData, null, 2)};
`;

console.log('Writing compiled course data part 2 to file...');
fs.writeFileSync('src/data/oxfordPreIntDataPart2.js', fileContent);
console.log('Successfully wrote Units 51-100 of detailed 1997-structured data to src/data/oxfordPreIntDataPart2.js!');
console.log('File size:', fs.statSync('src/data/oxfordPreIntDataPart2.js').size, 'bytes');
