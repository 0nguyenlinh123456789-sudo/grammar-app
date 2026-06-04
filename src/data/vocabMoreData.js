// File: src/data/vocabMoreData.js
// More vocabulary topics — 100+ words each, sorted from basic → advanced
// Progressive learning: daily conversation → professional → academic
// Covers: IELTS, VSTEP, TOEIC, Business, Environment, Education, Law, Arts, Food, Home

const vocabMoreData = [

  // ============================================================
  // 1. 🌿 MÔI TRƯỜNG & THIÊN NHIÊN — 110 từ
  // Level: B1-C1 | Target: IELTS Band 5-7, VSTEP B1-B2
  // Sorted: Daily words → Environment issues → Academic vocab
  // ============================================================
  {
    id: 'environment-nature',
    title: '🌿 Môi Trường & Thiên Nhiên',
    description: 'Từ vựng môi trường thiết yếu — chủ đề số 1 trong IELTS Writing Task 2. Từ cơ bản đến học thuật, đủ viết luận 7.0+.',
    level: 'B1-C1',
    examTags: ['IELTS', 'VSTEP', 'Environment'],
    words: [
      // === DAILY BASICS ===
      { en: 'nature', type: '(n)', vi: 'thiên nhiên 🌳', ipa: '/ˈneɪtʃər/', example: 'I love spending time in nature.', viExample: 'Tôi thích dành thời gian trong thiên nhiên.' },
      { en: 'forest', type: '(n)', vi: 'rừng 🌲', ipa: '/ˈfɒrɪst/', example: 'The forest is full of wildlife.', viExample: 'Khu rừng tràn ngập động vật hoang dã.' },
      { en: 'ocean', type: '(n)', vi: 'đại dương 🌊', ipa: '/ˈəʊʃn/', example: 'The ocean covers 70% of the Earth.', viExample: 'Đại dương bao phủ 70% Trái Đất.' },
      { en: 'mountain', type: '(n)', vi: 'núi ⛰️', ipa: '/ˈmaʊntɪn/', example: 'They climbed the highest mountain.', viExample: 'Họ leo lên ngọn núi cao nhất.' },
      { en: 'river', type: '(n)', vi: 'sông 🏞️', ipa: '/ˈrɪvər/', example: 'The river flows through the city.', viExample: 'Con sông chảy qua thành phố.' },
      { en: 'air', type: '(n)', vi: 'không khí 💨', ipa: '/eər/', example: 'Fresh air is good for health.', viExample: 'Không khí trong lành tốt cho sức khỏe.' },
      { en: 'water', type: '(n)', vi: 'nước 💧', ipa: '/ˈwɔːtər/', example: 'Clean water is essential for life.', viExample: 'Nước sạch thiết yếu cho cuộc sống.' },
      { en: 'soil', type: '(n)', vi: 'đất 🌱', ipa: '/sɔɪl/', example: 'Healthy soil produces good crops.', viExample: 'Đất màu mỡ tạo ra mùa màng tốt.' },
      { en: 'plant', type: '(n)', vi: 'thực vật 🌿', ipa: '/plɑːnt/', example: 'Plants produce oxygen.', viExample: 'Thực vật tạo ra oxy.' },
      { en: 'wildlife', type: '(n)', vi: 'động vật hoang dã 🦁', ipa: '/ˈwaɪldlaɪf/', example: 'We must protect wildlife.', viExample: 'Chúng ta phải bảo vệ động vật hoang dã.' },
      // === ENVIRONMENT ISSUES (B1) ===
      { en: 'pollution', type: '(n)', vi: 'ô nhiễm', ipa: '/pəˈluːʃn/', example: 'Air pollution causes respiratory diseases.', viExample: 'Ô nhiễm không khí gây bệnh hô hấp.' },
      { en: 'climate change', type: '(n)', vi: 'biến đổi khí hậu', ipa: '/ˈklaɪmɪt tʃeɪndʒ/', example: 'Climate change threatens our future.', viExample: 'Biến đổi khí hậu đe dọa tương lai chúng ta.' },
      { en: 'global warming', type: '(n)', vi: 'nóng lên toàn cầu', ipa: '/ˌɡləʊbl ˈwɔːmɪŋ/', example: 'Global warming causes sea levels to rise.', viExample: 'Nóng lên toàn cầu khiến mực nước biển dâng.' },
      { en: 'greenhouse gas', type: '(n)', vi: 'khí nhà kính', ipa: '/ˈɡriːnhaʊs ɡæs/', example: 'CO2 is a major greenhouse gas.', viExample: 'CO2 là khí nhà kính chính.' },
      { en: 'carbon emission', type: '(n)', vi: 'lượng khí carbon thải ra', ipa: '/ˈkɑːbən ɪˈmɪʃn/', example: 'We must reduce carbon emissions.', viExample: 'Chúng ta phải giảm lượng khí carbon thải ra.' },
      { en: 'deforestation', type: '(n)', vi: 'phá rừng', ipa: '/ˌdiːˌfɒrɪˈsteɪʃn/', example: 'Deforestation destroys natural habitats.', viExample: 'Phá rừng phá hủy môi trường sống tự nhiên.' },
      { en: 'drought', type: '(n)', vi: 'hạn hán', ipa: '/draʊt/', example: 'Drought is becoming more frequent.', viExample: 'Hạn hán ngày càng xảy ra thường xuyên hơn.' },
      { en: 'flood', type: '(n)', vi: 'lũ lụt', ipa: '/flʌd/', example: 'The flood destroyed many homes.', viExample: 'Lũ lụt phá hủy nhiều ngôi nhà.' },
      { en: 'wildfire', type: '(n)', vi: 'cháy rừng', ipa: '/ˈwaɪldˌfaɪər/', example: 'Wildfires are increasing due to climate change.', viExample: 'Cháy rừng tăng lên do biến đổi khí hậu.' },
      { en: 'endangered species', type: '(n)', vi: 'loài có nguy cơ tuyệt chủng', ipa: '/ɪnˈdeɪndʒəd ˈspiːʃiːz/', example: 'The tiger is an endangered species.', viExample: 'Hổ là loài có nguy cơ tuyệt chủng.' },
      { en: 'extinction', type: '(n)', vi: 'tuyệt chủng', ipa: '/ɪkˈstɪŋkʃn/', example: 'Many animals face extinction.', viExample: 'Nhiều loài động vật đối mặt với nguy cơ tuyệt chủng.' },
      { en: 'habitat', type: '(n)', vi: 'môi trường sống', ipa: '/ˈhæbɪtæt/', example: 'Protecting habitats saves animals.', viExample: 'Bảo vệ môi trường sống giúp cứu động vật.' },
      { en: 'ecosystem', type: '(n)', vi: 'hệ sinh thái', ipa: '/ˈiːkəʊˌsɪstəm/', example: 'A healthy ecosystem supports all life.', viExample: 'Hệ sinh thái lành mạnh hỗ trợ mọi sự sống.' },
      { en: 'renewable energy', type: '(n)', vi: 'năng lượng tái tạo', ipa: '/rɪˈnjuːəbl ˈenədʒi/', example: 'Solar power is renewable energy.', viExample: 'Năng lượng mặt trời là năng lượng tái tạo.' },
      { en: 'solar energy', type: '(n)', vi: 'năng lượng mặt trời ☀️', ipa: '/ˈsəʊlər ˈenədʒi/', example: 'Solar energy is clean and free.', viExample: 'Năng lượng mặt trời sạch và miễn phí.' },
      { en: 'wind power', type: '(n)', vi: 'năng lượng gió 💨', ipa: '/wɪnd ˈpaʊər/', example: 'Wind power is growing rapidly.', viExample: 'Năng lượng gió đang phát triển nhanh chóng.' },
      { en: 'fossil fuel', type: '(n)', vi: 'nhiên liệu hóa thạch', ipa: '/ˈfɒsl fjuːəl/', example: 'Fossil fuels cause most pollution.', viExample: 'Nhiên liệu hóa thạch gây ra hầu hết ô nhiễm.' },
      { en: 'recycle', type: '(v)', vi: 'tái chế', ipa: '/ˌriːˈsaɪkl/', example: 'We should recycle plastic bottles.', viExample: 'Chúng ta nên tái chế chai nhựa.' },
      { en: 'waste', type: '(n)', vi: 'rác thải', ipa: '/weɪst/', example: 'Reduce waste by buying less plastic.', viExample: 'Giảm rác thải bằng cách mua ít đồ nhựa hơn.' },
      { en: 'landfill', type: '(n)', vi: 'bãi chôn lấp rác', ipa: '/ˈlændfɪl/', example: 'Landfills create toxic gas.', viExample: 'Bãi chôn lấp tạo ra khí độc.' },
      { en: 'conservation', type: '(n)', vi: 'bảo tồn', ipa: '/ˌkɒnsəˈveɪʃn/', example: 'Wildlife conservation is urgent.', viExample: 'Bảo tồn động vật hoang dã rất cấp bách.' },
      { en: 'biodiversity', type: '(n)', vi: 'đa dạng sinh học', ipa: '/ˌbaɪəʊdaɪˈvɜːsɪti/', example: 'Biodiversity is vital for the planet.', viExample: 'Đa dạng sinh học rất quan trọng cho hành tinh.' },
      { en: 'ozone layer', type: '(n)', vi: 'tầng ozone', ipa: '/ˈəʊzəʊn ˌleɪər/', example: 'CFCs destroy the ozone layer.', viExample: 'CFC phá hủy tầng ozone.' },
      { en: 'coral reef', type: '(n)', vi: 'rạn san hô 🪸', ipa: '/ˈkɒrəl riːf/', example: 'Coral reefs are bleaching due to warming.', viExample: 'Rạn san hô đang bị tẩy trắng do nhiệt độ tăng.' },
      { en: 'deforestation', type: '(n)', vi: 'phá rừng', ipa: '/ˌdiːˌfɒrɪˈsteɪʃn/', example: 'Deforestation must be stopped immediately.', viExample: 'Phá rừng phải được ngăn chặn ngay lập tức.' },
      { en: 'carbon footprint', type: '(n)', vi: 'dấu chân carbon', ipa: '/ˈkɑːbən ˈfʊtprɪnt/', example: 'Reduce your carbon footprint by cycling.', viExample: 'Giảm dấu chân carbon bằng cách đi xe đạp.' },
      { en: 'net zero', type: '(n)', vi: 'phát thải ròng bằng không', ipa: '/net ˈzɪərəʊ/', example: 'The UK aims for net zero by 2050.', viExample: 'Anh hướng tới phát thải ròng bằng không vào 2050.' },
      { en: 'sustainability', type: '(n)', vi: 'bền vững', ipa: '/səˌsteɪnəˈbɪlɪti/', example: 'Sustainability protects future generations.', viExample: 'Bền vững bảo vệ các thế hệ tương lai.' },
      { en: 'sustainable development', type: '(n)', vi: 'phát triển bền vững', ipa: '/səˈsteɪnəbl dɪˈveləpmənt/', example: 'Sustainable development balances growth and nature.', viExample: 'Phát triển bền vững cân bằng tăng trưởng và thiên nhiên.' },
      // === ACADEMIC (B2-C1) ===
      { en: 'mitigation', type: '(n)', vi: 'giảm nhẹ (tác động)', ipa: '/ˌmɪtɪˈɡeɪʃn/', example: 'Mitigation measures reduce climate risks.', viExample: 'Các biện pháp giảm nhẹ làm giảm rủi ro khí hậu.' },
      { en: 'adaptation', type: '(n)', vi: 'thích ứng (với biến đổi khí hậu)', ipa: '/ˌædæpˈteɪʃn/', example: 'Communities need adaptation strategies.', viExample: 'Cộng đồng cần chiến lược thích ứng.' },
      { en: 'reforestation', type: '(n)', vi: 'tái trồng rừng', ipa: '/ˌriːˌfɒrɪˈsteɪʃn/', example: 'Reforestation absorbs carbon dioxide.', viExample: 'Tái trồng rừng hấp thụ khí CO2.' },
      { en: 'carbon sequestration', type: '(n)', vi: 'thu giữ carbon', ipa: '/ˈkɑːbən sɪˌkweˈstreɪʃn/', example: 'Trees perform carbon sequestration naturally.', viExample: 'Cây cối thực hiện thu giữ carbon tự nhiên.' },
      { en: 'ecological', type: '(adj)', vi: 'sinh thái học', ipa: '/ˌiːkəˈlɒdʒɪkl/', example: 'The ecological impact was severe.', viExample: 'Tác động sinh thái rất nghiêm trọng.' },
      { en: 'geothermal', type: '(adj)', vi: 'địa nhiệt', ipa: '/ˌdʒiːəʊˈθɜːml/', example: 'Iceland uses geothermal energy.', viExample: 'Iceland sử dụng năng lượng địa nhiệt.' },
      { en: 'photosynthesis', type: '(n)', vi: 'quang hợp', ipa: '/ˌfəʊtəʊˈsɪnθɪsɪs/', example: 'Plants use photosynthesis to create food.', viExample: 'Thực vật dùng quang hợp để tạo ra thức ăn.' },
      { en: 'methane', type: '(n)', vi: 'khí methane', ipa: '/ˈmiːθeɪn/', example: 'Methane from livestock worsens climate change.', viExample: 'Methane từ gia súc làm trầm trọng thêm biến đổi khí hậu.' },
      { en: 'particulate matter', type: '(n)', vi: 'bụi mịn (PM2.5)', ipa: '/pɑːˈtɪkjʊlɪt ˈmætər/', example: 'Particulate matter harms lung health.', viExample: 'Bụi mịn gây hại cho sức khỏe phổi.' },
      { en: 'desertification', type: '(n)', vi: 'sa mạc hóa', ipa: '/dɪˌzɜːtɪfɪˈkeɪʃn/', example: 'Desertification is spreading in Africa.', viExample: 'Sa mạc hóa đang lan rộng ở châu Phi.' },
      { en: 'permafrost', type: '(n)', vi: 'lớp băng vĩnh cửu', ipa: '/ˈpɜːməfrɒst/', example: 'Melting permafrost releases trapped methane.', viExample: 'Băng vĩnh cửu tan chảy giải phóng methane bị kẹt.' },
      { en: 'erosion', type: '(n)', vi: 'xói mòn', ipa: '/ɪˈrəʊʒn/', example: 'Soil erosion reduces farmland quality.', viExample: 'Xói mòn đất làm giảm chất lượng đất nông nghiệp.' },
      { en: 'contamination', type: '(n)', vi: 'ô nhiễm (nước/đất)', ipa: '/kənˌtæmɪˈneɪʃn/', example: 'Water contamination is a public health risk.', viExample: 'Ô nhiễm nước là rủi ro sức khỏe cộng đồng.' },
      { en: 'biome', type: '(n)', vi: 'quần xã sinh vật', ipa: '/ˈbaɪəʊm/', example: 'The Amazon is the world\'s largest biome.', viExample: 'Amazon là quần xã sinh vật lớn nhất thế giới.' },
      { en: 'aquifer', type: '(n)', vi: 'tầng ngậm nước ngầm', ipa: '/ˈækwɪfər/', example: 'Aquifers store underground water.', viExample: 'Tầng ngậm nước trữ nước ngầm.' },
      { en: 'biodegradable', type: '(adj)', vi: 'có thể phân hủy sinh học', ipa: '/ˌbaɪəʊdɪˈɡreɪdəbl/', example: 'Use biodegradable bags instead of plastic.', viExample: 'Dùng túi có thể phân hủy thay vì túi nhựa.' },
      { en: 'microplastic', type: '(n)', vi: 'vi nhựa', ipa: '/ˈmaɪkrəʊˌplæstɪk/', example: 'Microplastics are found in ocean fish.', viExample: 'Vi nhựa được tìm thấy trong cá biển.' },
      { en: 'ecological footprint', type: '(n)', vi: 'dấu chân sinh thái', ipa: '/ˌiːkəˈlɒdʒɪkl ˈfʊtprɪnt/', example: 'Reduce your ecological footprint.', viExample: 'Giảm dấu chân sinh thái của bạn.' },
      { en: 'green economy', type: '(n)', vi: 'kinh tế xanh', ipa: '/ɡriːn ɪˈkɒnəmi/', example: 'A green economy creates sustainable jobs.', viExample: 'Kinh tế xanh tạo ra việc làm bền vững.' },
      { en: 'Paris Agreement', type: '(n)', vi: 'Hiệp định Paris', ipa: '/ˈpærɪs əˈɡriːmənt/', example: 'The Paris Agreement targets 1.5°C warming limit.', viExample: 'Hiệp định Paris nhắm mục tiêu giới hạn nóng lên 1.5°C.' },
      { en: 'carbon neutral', type: '(adj)', vi: 'trung hòa carbon', ipa: '/ˈkɑːbən ˈnjuːtrəl/', example: 'Companies aim to become carbon neutral.', viExample: 'Các công ty hướng tới trung hòa carbon.' },
      { en: 'eco-friendly', type: '(adj)', vi: 'thân thiện môi trường', ipa: '/ˈiːkəʊ ˌfrendli/', example: 'Choose eco-friendly products when shopping.', viExample: 'Chọn sản phẩm thân thiện môi trường khi mua sắm.' },
      { en: 'organic farming', type: '(n)', vi: 'nông nghiệp hữu cơ', ipa: '/ɔːˈɡænɪk ˈfɑːmɪŋ/', example: 'Organic farming avoids pesticides.', viExample: 'Nông nghiệp hữu cơ tránh dùng thuốc trừ sâu.' },
      { en: 'greenhouse effect', type: '(n)', vi: 'hiệu ứng nhà kính', ipa: '/ˈɡriːnhaʊs ɪˈfekt/', example: 'The greenhouse effect traps heat.', viExample: 'Hiệu ứng nhà kính giữ nhiệt trong khí quyển.' },
      { en: 'sea level rise', type: '(n)', vi: 'mực nước biển dâng', ipa: '/siː ˈlevl raɪz/', example: 'Sea level rise threatens coastal cities.', viExample: 'Mực nước biển dâng đe dọa các thành phố ven biển.' },
      { en: 'carbon tax', type: '(n)', vi: 'thuế carbon', ipa: '/ˈkɑːbən tæks/', example: 'A carbon tax discourages pollution.', viExample: 'Thuế carbon ngăn cản ô nhiễm.' },
      { en: 'natural disaster', type: '(n)', vi: 'thiên tai', ipa: '/ˈnætʃrəl dɪˈzɑːstər/', example: 'Natural disasters are becoming more extreme.', viExample: 'Thiên tai ngày càng trở nên khắc nghiệt hơn.' },
      { en: 'typhoon', type: '(n)', vi: 'bão nhiệt đới', ipa: '/taɪˈfuːn/', example: 'A typhoon hit the coast last night.', viExample: 'Một cơn bão nhiệt đới đổ bộ vào bờ biển tối qua.' },
      { en: 'tsunami', type: '(n)', vi: 'sóng thần', ipa: '/tsuːˈnɑːmi/', example: 'A tsunami followed the earthquake.', viExample: 'Sóng thần xảy ra sau động đất.' },
      { en: 'earthquake', type: '(n)', vi: 'động đất', ipa: '/ˈɜːθkweɪk/', example: 'The earthquake measured 7.8 on the Richter scale.', viExample: 'Động đất đo được 7.8 trên thang Richter.' },
      { en: 'reforestation', type: '(n)', vi: 'tái trồng rừng', ipa: '/ˌriːˌfɒrɪˈsteɪʃn/', example: 'Reforestation programs plant millions of trees.', viExample: 'Chương trình tái trồng rừng trồng hàng triệu cây.' },
      { en: 'emission trading', type: '(n)', vi: 'giao dịch phát thải (cap-and-trade)', ipa: '/ɪˈmɪʃn ˈtreɪdɪŋ/', example: 'Emission trading reduces total pollution levels.', viExample: 'Giao dịch phát thải giảm tổng mức ô nhiễm.' },
      { en: 'hydropower', type: '(n)', vi: 'thủy điện', ipa: '/ˈhaɪdrəʊˌpaʊər/', example: 'Vietnam uses hydropower extensively.', viExample: 'Việt Nam sử dụng thủy điện rộng rãi.' },
      { en: 'tectonic plates', type: '(n)', vi: 'các mảng kiến tạo', ipa: '/tekˈtɒnɪk pleɪts/', example: 'Earthquakes occur where tectonic plates meet.', viExample: 'Động đất xảy ra nơi các mảng kiến tạo gặp nhau.' },
      { en: 'wetland', type: '(n)', vi: 'vùng đất ngập nước', ipa: '/ˈwetlænd/', example: 'Wetlands filter water naturally.', viExample: 'Vùng đất ngập nước lọc nước tự nhiên.' },
      { en: 'glacier', type: '(n)', vi: 'sông băng 🏔️', ipa: '/ˈɡlæsiər/', example: 'Glaciers are melting at record speed.', viExample: 'Sông băng đang tan chảy với tốc độ kỷ lục.' },
      { en: 'biodiversity hotspot', type: '(n)', vi: 'điểm nóng đa dạng sinh học', ipa: '/ˌbaɪəʊdaɪˈvɜːsɪti ˈhɒtspɒt/', example: 'The Mekong Delta is a biodiversity hotspot.', viExample: 'Đồng bằng Mekong là điểm nóng đa dạng sinh học.' },
      { en: 'sustainable tourism', type: '(n)', vi: 'du lịch bền vững', ipa: '/səˈsteɪnəbl ˈtʊərɪzəm/', example: 'Sustainable tourism respects local ecosystems.', viExample: 'Du lịch bền vững tôn trọng hệ sinh thái địa phương.' },
      { en: 'zero waste', type: '(n)', vi: 'không rác thải', ipa: '/ˈzɪərəʊ weɪst/', example: 'Zero waste lifestyles reduce landfill use.', viExample: 'Lối sống không rác giảm sử dụng bãi chôn lấp.' },
      { en: 'biodegradation', type: '(n)', vi: 'phân hủy sinh học', ipa: '/ˌbaɪəʊˌdeɡrəˈdeɪʃn/', example: 'Natural materials undergo biodegradation.', viExample: 'Vật liệu tự nhiên trải qua quá trình phân hủy sinh học.' },
      { en: 'carbon offset', type: '(n)', vi: 'bù đắp carbon', ipa: '/ˈkɑːbən ˈɒfset/', example: 'Plant trees to offset your carbon emissions.', viExample: 'Trồng cây để bù đắp lượng khí carbon bạn thải ra.' },
      { en: 'water scarcity', type: '(n)', vi: 'khan hiếm nước', ipa: '/ˈwɔːtər ˈskeəsɪti/', example: 'Water scarcity affects billions of people.', viExample: 'Khan hiếm nước ảnh hưởng đến hàng tỷ người.' },
      { en: 'air quality index', type: '(n)', vi: 'chỉ số chất lượng không khí (AQI)', ipa: '/eər ˈkwɒlɪti ˈɪndeks/', example: 'Check the air quality index before exercising outdoors.', viExample: 'Kiểm tra chỉ số chất lượng không khí trước khi tập ngoài trời.' },
      { en: 'smog', type: '(n)', vi: 'khói bụi mù (smog)', ipa: '/smɒɡ/', example: 'Beijing suffers from severe smog.', viExample: 'Bắc Kinh đang chịu đựng ô nhiễm smog nghiêm trọng.' },
      { en: 'acid rain', type: '(n)', vi: 'mưa acid', ipa: '/ˈæsɪd reɪn/', example: 'Acid rain damages forests and lakes.', viExample: 'Mưa acid gây hại cho rừng và hồ.' },
      { en: 'urban heat island', type: '(n)', vi: 'đảo nhiệt đô thị', ipa: '/ˈɜːbən hiːt ˈaɪlənd/', example: 'Urban heat islands make cities hotter.', viExample: 'Đảo nhiệt đô thị khiến thành phố nóng hơn.' },
      { en: 'biodiversity loss', type: '(n)', vi: 'mất đa dạng sinh học', ipa: '/ˌbaɪəʊdaɪˈvɜːsɪti lɒs/', example: 'Biodiversity loss threatens food security.', viExample: 'Mất đa dạng sinh học đe dọa an ninh lương thực.' },
      { en: 'food chain', type: '(n)', vi: 'chuỗi thức ăn', ipa: '/fuːd tʃeɪn/', example: 'Pollutants accumulate up the food chain.', viExample: 'Chất ô nhiễm tích lũy theo chuỗi thức ăn.' },
      { en: 'compost', type: '(n/v)', vi: 'phân hữu cơ / ủ phân', ipa: '/ˈkɒmpɒst/', example: 'Compost food scraps to fertilize your garden.', viExample: 'Ủ phân từ thức ăn thừa để bón vườn.' },
      { en: 'mangrove', type: '(n)', vi: 'rừng ngập mặn', ipa: '/ˈmæŋɡrəʊv/', example: 'Mangroves protect coastlines from storms.', viExample: 'Rừng ngập mặn bảo vệ bờ biển khỏi bão.' },
      { en: 'ecosystem services', type: '(n)', vi: 'dịch vụ hệ sinh thái', ipa: '/ˈiːkəʊˌsɪstəm ˈsɜːvɪsɪz/', example: 'Forests provide essential ecosystem services.', viExample: 'Rừng cung cấp các dịch vụ hệ sinh thái thiết yếu.' },
      { en: 'environmental policy', type: '(n)', vi: 'chính sách môi trường', ipa: '/ɪnˌvaɪrənˈmentl ˈpɒlɪsi/', example: 'Strong environmental policy is needed urgently.', viExample: 'Chính sách môi trường mạnh mẽ cần gấp.' },
    ],
    storyEn: `🌿 THE BUNNY'S GREEN ADVENTURE 🐰

Benny the Bunny loved his forest home. Every morning, he hopped through green trees, breathed fresh air, and drank clean water from the river. The ecosystem was perfect — birds sang, deer grazed, and coral reefs sparkled in the nearby bay.

But one day, Benny noticed something wrong. The air smelled bad. A factory was releasing greenhouse gases and carbon emissions into the sky. Trees were being cut down — deforestation was destroying habitats. The river had contamination from waste, and wildfire smoke filled the air with smog.

"We must act NOW!" said Benny. He organized his friends. They started recycling, using solar energy, and composting food waste. They planted trees for reforestation and protected the coral reef. They learned about biodiversity and why every animal matters in the food chain.

Slowly, the forest healed. The air quality index improved. Pollution dropped. The glacier stopped melting as fast. Wildlife returned. Benny proved that sustainability is possible — even for a small bunny! 

"Every action matters," he said. "Together, we can reach net zero!" 🌱`,
    storyVi: `🌿 CUỘC PHIÊU LƯU XANH CỦA THỎ 🐰

Benny Thỏ yêu ngôi nhà rừng của mình. Mỗi sáng, anh nhảy qua những cây xanh, hít thở không khí trong lành và uống nước sạch từ sông. Hệ sinh thái (Ecosystem) hoàn hảo — chim hót, hươu gặm cỏ, và rạn san hô (Coral reefs) lấp lánh ở vịnh gần đó.

Nhưng một ngày, Benny nhận ra điều gì đó không ổn. Không khí có mùi khó chịu. Một nhà máy đang thải khí nhà kính (Greenhouse gases) và phát thải carbon (Carbon emissions) vào bầu trời. Cây đang bị chặt hạ — Phá rừng (Deforestation) đang phá hủy môi trường sống (Habitats). Con sông bị ô nhiễm (Contamination) từ rác thải (Waste), và khói cháy rừng (Wildfire) tràn ngập không khí với khói bụi (Smog).

"Chúng ta phải hành động NGAY!" Benny nói. Anh tập hợp bạn bè. Họ bắt đầu tái chế (Recycling), dùng năng lượng mặt trời (Solar energy), và ủ phân (Composting). Họ trồng cây để tái trồng rừng (Reforestation) và bảo vệ rạn san hô. Họ học về đa dạng sinh học (Biodiversity).

Từ từ, khu rừng hồi phục. Chỉ số chất lượng không khí (Air quality index) cải thiện. Ô nhiễm (Pollution) giảm. Benny chứng minh rằng bền vững (Sustainability) là có thể — dù chỉ là một chú thỏ nhỏ!`
  },

  // ============================================================
  // 2. 🎓 GIÁO DỤC & HỌC THUẬT — 105 từ
  // Level: B1-C1 | Target: IELTS Academic, VSTEP B1-C1
  // ============================================================
  {
    id: 'education-academic',
    title: '🎓 Giáo Dục & Học Thuật',
    description: 'Từ vựng giáo dục từ cơ bản đến học thuật — thiết yếu cho IELTS Writing Task 2 và VSTEP. Đủ để thảo luận về hệ thống giáo dục, học tập và nghiên cứu.',
    level: 'B1-C1',
    examTags: ['IELTS', 'VSTEP', 'Academic'],
    words: [
      // BASICS
      { en: 'school', type: '(n)', vi: 'trường học 🏫', ipa: '/skuːl/', example: 'She goes to school by bicycle.', viExample: 'Cô ấy đến trường bằng xe đạp.' },
      { en: 'teacher', type: '(n)', vi: 'giáo viên 👩‍🏫', ipa: '/ˈtiːtʃər/', example: 'The teacher explained the lesson clearly.', viExample: 'Giáo viên giải thích bài học rõ ràng.' },
      { en: 'student', type: '(n)', vi: 'học sinh/sinh viên 👨‍🎓', ipa: '/ˈstjuːdnt/', example: 'The student passed all his exams.', viExample: 'Học sinh đó vượt qua tất cả kỳ thi.' },
      { en: 'classroom', type: '(n)', vi: 'lớp học', ipa: '/ˈklɑːsruːm/', example: 'The classroom has 30 students.', viExample: 'Lớp học có 30 học sinh.' },
      { en: 'lesson', type: '(n)', vi: 'bài học', ipa: '/ˈlesn/', example: 'Today\'s lesson is about grammar.', viExample: 'Bài học hôm nay về ngữ pháp.' },
      { en: 'homework', type: '(n)', vi: 'bài tập về nhà 📝', ipa: '/ˈhəʊmwɜːk/', example: 'She finished her homework quickly.', viExample: 'Cô ấy làm xong bài tập về nhà nhanh chóng.' },
      { en: 'exam', type: '(n)', vi: 'kỳ thi', ipa: '/ɪɡˈzæm/', example: 'He studied hard for the exam.', viExample: 'Anh ấy học chăm chỉ cho kỳ thi.' },
      { en: 'grade', type: '(n)', vi: 'điểm số/xếp loại', ipa: '/ɡreɪd/', example: 'She got an A grade in English.', viExample: 'Cô ấy đạt điểm A trong môn Tiếng Anh.' },
      { en: 'textbook', type: '(n)', vi: 'sách giáo khoa', ipa: '/ˈtekstbʊk/', example: 'Open your textbook to page 50.', viExample: 'Mở sách giáo khoa trang 50.' },
      { en: 'library', type: '(n)', vi: 'thư viện 📚', ipa: '/ˈlaɪbrəri/', example: 'I study in the library after school.', viExample: 'Tôi học ở thư viện sau giờ học.' },
      // SECONDARY SCHOOL
      { en: 'curriculum', type: '(n)', vi: 'chương trình giảng dạy', ipa: '/kəˈrɪkjʊləm/', example: 'The school updated its curriculum this year.', viExample: 'Trường cập nhật chương trình giảng dạy năm nay.' },
      { en: 'assignment', type: '(n)', vi: 'bài tập/nhiệm vụ được giao', ipa: '/əˈsaɪnmənt/', example: 'Submit your assignment by Friday.', viExample: 'Nộp bài tập vào thứ Sáu.' },
      { en: 'semester', type: '(n)', vi: 'học kỳ', ipa: '/sɪˈmestər/', example: 'The spring semester starts in March.', viExample: 'Học kỳ xuân bắt đầu vào tháng 3.' },
      { en: 'scholarship', type: '(n)', vi: 'học bổng 🏆', ipa: '/ˈskɒləʃɪp/', example: 'She won a full scholarship to Harvard.', viExample: 'Cô ấy giành được học bổng toàn phần vào Harvard.' },
      { en: 'tuition', type: '(n)', vi: 'học phí', ipa: '/tjuːˈɪʃn/', example: 'University tuition is very expensive.', viExample: 'Học phí đại học rất đắt.' },
      { en: 'dropout', type: '(n/v)', vi: 'bỏ học', ipa: '/ˈdrɒpaʊt/', example: 'Poverty causes many students to drop out.', viExample: 'Nghèo đói khiến nhiều học sinh bỏ học.' },
      { en: 'literacy', type: '(n)', vi: 'khả năng đọc viết', ipa: '/ˈlɪtərəsi/', example: 'Improving literacy reduces poverty.', viExample: 'Cải thiện khả năng đọc viết giảm nghèo đói.' },
      { en: 'numeracy', type: '(n)', vi: 'khả năng tính toán', ipa: '/ˈnjuːmərəsi/', example: 'Numeracy skills are essential in daily life.', viExample: 'Kỹ năng tính toán thiết yếu trong cuộc sống hàng ngày.' },
      { en: 'extracurricular', type: '(adj)', vi: 'ngoại khóa', ipa: '/ˌekstrəkəˈrɪkjʊlər/', example: 'She joins many extracurricular activities.', viExample: 'Cô ấy tham gia nhiều hoạt động ngoại khóa.' },
      { en: 'discipline', type: '(n)', vi: 'kỷ luật/môn học', ipa: '/ˈdɪsɪplɪn/', example: 'Math is an important academic discipline.', viExample: 'Toán học là một môn học quan trọng.' },
      // UNIVERSITY LEVEL
      { en: 'undergraduate', type: '(n/adj)', vi: 'sinh viên đại học (chưa tốt nghiệp)', ipa: '/ˌʌndəˈɡrædʒuɪt/', example: 'She is an undergraduate student.', viExample: 'Cô ấy là sinh viên đại học.' },
      { en: 'postgraduate', type: '(n/adj)', vi: 'học sau đại học', ipa: '/ˌpəʊstˈɡrædʒuɪt/', example: 'He is pursuing a postgraduate degree.', viExample: 'Anh ấy đang theo học bậc sau đại học.' },
      { en: 'dissertation', type: '(n)', vi: 'luận văn thạc sĩ', ipa: '/ˌdɪsəˈteɪʃn/', example: 'Her dissertation was 20,000 words long.', viExample: 'Luận văn của cô ấy dài 20,000 từ.' },
      { en: 'thesis', type: '(n)', vi: 'luận án tiến sĩ/luận điểm', ipa: '/ˈθiːsɪs/', example: 'His thesis challenged traditional theories.', viExample: 'Luận án của anh ấy thách thức các lý thuyết truyền thống.' },
      { en: 'peer review', type: '(n)', vi: 'bình duyệt ngang hàng', ipa: '/pɪər rɪˈvjuː/', example: 'The research paper underwent peer review.', viExample: 'Bài nghiên cứu trải qua bình duyệt ngang hàng.' },
      { en: 'citation', type: '(n)', vi: 'trích dẫn', ipa: '/saɪˈteɪʃn/', example: 'Always provide proper citations in academic writing.', viExample: 'Luôn cung cấp trích dẫn đúng cách trong viết học thuật.' },
      { en: 'plagiarism', type: '(n)', vi: 'đạo văn', ipa: '/ˈpleɪdʒərɪzəm/', example: 'Plagiarism is a serious academic offense.', viExample: 'Đạo văn là vi phạm học thuật nghiêm trọng.' },
      { en: 'hypothesis', type: '(n)', vi: 'giả thuyết', ipa: '/haɪˈpɒθɪsɪs/', example: 'The experiment tested the hypothesis.', viExample: 'Thí nghiệm kiểm tra giả thuyết.' },
      { en: 'methodology', type: '(n)', vi: 'phương pháp luận', ipa: '/ˌmeθəˈdɒlədʒi/', example: 'Explain your research methodology clearly.', viExample: 'Giải thích phương pháp nghiên cứu của bạn rõ ràng.' },
      { en: 'empirical', type: '(adj)', vi: 'thực nghiệm/dựa trên dữ liệu', ipa: '/ɪmˈpɪrɪkl/', example: 'The theory needs empirical evidence.', viExample: 'Lý thuyết cần bằng chứng thực nghiệm.' },
      { en: 'academic integrity', type: '(n)', vi: 'liêm chính học thuật', ipa: '/ˌækəˈdemɪk ɪnˈteɡrɪti/', example: 'Academic integrity is fundamental to research.', viExample: 'Liêm chính học thuật là nền tảng của nghiên cứu.' },
      { en: 'lecture', type: '(n)', vi: 'bài giảng đại học', ipa: '/ˈlektʃər/', example: 'The professor gave an excellent lecture.', viExample: 'Giáo sư đã có một bài giảng xuất sắc.' },
      { en: 'seminar', type: '(n)', vi: 'hội thảo/buổi học thảo luận nhỏ', ipa: '/ˈsemɪnɑːr/', example: 'The seminar had only 10 students.', viExample: 'Buổi thảo luận chỉ có 10 sinh viên.' },
      { en: 'tutorial', type: '(n)', vi: 'buổi học kèm/tutorial', ipa: '/tjuːˈtɔːriəl/', example: 'She had a tutorial with her professor.', viExample: 'Cô ấy có buổi học kèm với giáo sư.' },
      { en: 'critical thinking', type: '(n)', vi: 'tư duy phản biện', ipa: '/ˈkrɪtɪkl ˈθɪŋkɪŋ/', example: 'Critical thinking is essential for success.', viExample: 'Tư duy phản biện thiết yếu cho thành công.' },
      { en: 'distance learning', type: '(n)', vi: 'học từ xa', ipa: '/ˈdɪstəns ˈlɜːnɪŋ/', example: 'Distance learning became popular during COVID.', viExample: 'Học từ xa trở nên phổ biến trong COVID.' },
      { en: 'blended learning', type: '(n)', vi: 'học kết hợp (online + offline)', ipa: '/ˈblendɪd ˈlɜːnɪŋ/', example: 'Blended learning combines online and offline classes.', viExample: 'Học kết hợp kết hợp lớp trực tuyến và trực tiếp.' },
      { en: 'e-learning', type: '(n)', vi: 'học trực tuyến', ipa: '/ˈiː ˌlɜːnɪŋ/', example: 'E-learning gives access to education anywhere.', viExample: 'Học trực tuyến cho phép tiếp cận giáo dục ở bất kỳ đâu.' },
      // ADVANCED / IELTS
      { en: 'pedagogy', type: '(n)', vi: 'phương pháp sư phạm', ipa: '/ˈpedəɡɒdʒi/', example: 'Modern pedagogy focuses on student-centered learning.', viExample: 'Sư phạm hiện đại tập trung vào học tập lấy học sinh làm trung tâm.' },
      { en: 'cognitive', type: '(adj)', vi: 'nhận thức', ipa: '/ˈkɒɡnɪtɪv/', example: 'Cognitive skills develop through reading.', viExample: 'Kỹ năng nhận thức phát triển qua đọc sách.' },
      { en: 'metacognition', type: '(n)', vi: 'siêu nhận thức (biết cách học)', ipa: '/ˌmetəkɒɡˈnɪʃn/', example: 'Metacognition helps students learn how to learn.', viExample: 'Siêu nhận thức giúp học sinh học cách học.' },
      { en: 'rote learning', type: '(n)', vi: 'học vẹt', ipa: '/rəʊt ˈlɜːnɪŋ/', example: 'Rote learning does not develop understanding.', viExample: 'Học vẹt không phát triển sự hiểu biết.' },
      { en: 'constructivism', type: '(n)', vi: 'thuyết kiến tạo', ipa: '/kənˈstrʌktɪvɪzəm/', example: 'Constructivism argues students build their own knowledge.', viExample: 'Thuyết kiến tạo cho rằng học sinh xây dựng kiến thức của chính mình.' },
      { en: 'standardized testing', type: '(n)', vi: 'kiểm tra tiêu chuẩn hóa', ipa: '/ˈstændədaɪzd ˈtestɪŋ/', example: 'Standardized testing is controversial.', viExample: 'Kiểm tra tiêu chuẩn hóa còn tranh cãi.' },
      { en: 'vocational training', type: '(n)', vi: 'đào tạo nghề', ipa: '/vəʊˈkeɪʃnl ˈtreɪnɪŋ/', example: 'Vocational training prepares students for specific jobs.', viExample: 'Đào tạo nghề chuẩn bị cho học sinh các công việc cụ thể.' },
      { en: 'academic achievement', type: '(n)', vi: 'thành tích học tập', ipa: '/ˌækəˈdemɪk əˈtʃiːvmənt/', example: 'Poverty affects academic achievement.', viExample: 'Nghèo đói ảnh hưởng đến thành tích học tập.' },
      { en: 'intellectual', type: '(adj)', vi: 'trí tuệ', ipa: '/ˌɪntəˈlektʃuəl/', example: 'Reading develops intellectual capacity.', viExample: 'Đọc sách phát triển năng lực trí tuệ.' },
      { en: 'gifted', type: '(adj)', vi: 'năng khiếu', ipa: '/ˈɡɪftɪd/', example: 'Gifted students need special programs.', viExample: 'Học sinh năng khiếu cần chương trình đặc biệt.' },
      { en: 'inclusive education', type: '(n)', vi: 'giáo dục hòa nhập', ipa: '/ɪnˈkluːsɪv ˌedʒuˈkeɪʃn/', example: 'Inclusive education welcomes all students.', viExample: 'Giáo dục hòa nhập chào đón tất cả học sinh.' },
      { en: 'special needs', type: '(n)', vi: 'nhu cầu đặc biệt (học sinh khuyết tật)', ipa: '/ˈspeʃl niːdz/', example: 'Schools must accommodate students with special needs.', viExample: 'Trường phải phục vụ học sinh có nhu cầu đặc biệt.' },
      { en: 'motivation', type: '(n)', vi: 'động lực', ipa: '/ˌməʊtɪˈveɪʃn/', example: 'Intrinsic motivation leads to deeper learning.', viExample: 'Động lực bên trong dẫn đến học tập sâu hơn.' },
      { en: 'reinforcement', type: '(n)', vi: 'củng cố (trong học tập)', ipa: '/ˌriːɪnˈfɔːsmənt/', example: 'Positive reinforcement encourages good behavior.', viExample: 'Củng cố tích cực khuyến khích hành vi tốt.' },
      { en: 'assessment', type: '(n)', vi: 'đánh giá (học tập)', ipa: '/əˈsesmənt/', example: 'Continuous assessment is fairer than one exam.', viExample: 'Đánh giá liên tục công bằng hơn một kỳ thi.' },
      { en: 'feedback', type: '(n)', vi: 'phản hồi', ipa: '/ˈfiːdbæk/', example: 'Constructive feedback helps students improve.', viExample: 'Phản hồi mang tính xây dựng giúp học sinh tiến bộ.' },
      { en: 'syllabus', type: '(n)', vi: 'đề cương môn học', ipa: '/ˈsɪləbəs/', example: 'Read the syllabus at the start of the course.', viExample: 'Đọc đề cương vào đầu khóa học.' },
      { en: 'accreditation', type: '(n)', vi: 'công nhận/kiểm định chất lượng', ipa: '/əˌkredɪˈteɪʃn/', example: 'The university earned international accreditation.', viExample: 'Trường đại học đạt công nhận quốc tế.' },
      { en: 'GPA', type: '(n)', vi: 'điểm trung bình tích lũy', ipa: '/ˌdʒiː piː ˈeɪ/', example: 'She maintained a 3.9 GPA throughout college.', viExample: 'Cô ấy duy trì GPA 3.9 suốt thời đại học.' },
      { en: 'dean', type: '(n)', vi: 'trưởng khoa', ipa: '/diːn/', example: 'The dean welcomed new students.', viExample: 'Trưởng khoa chào đón sinh viên mới.' },
      { en: 'professor', type: '(n)', vi: 'giáo sư', ipa: '/prəˈfesər/', example: 'The professor published 50 research papers.', viExample: 'Giáo sư đã công bố 50 bài báo nghiên cứu.' },
      { en: 'alumni', type: '(n)', vi: 'cựu sinh viên', ipa: '/æˈlʌmnaɪ/', example: 'Alumni often donate to their universities.', viExample: 'Cựu sinh viên thường quyên góp cho trường đại học.' },
      { en: 'internship', type: '(n)', vi: 'thực tập', ipa: '/ˈɪntɜːnʃɪp/', example: 'She did an internship at Google.', viExample: 'Cô ấy thực tập tại Google.' },
      { en: 'apprenticeship', type: '(n)', vi: 'học nghề có trả lương', ipa: '/əˈprentɪʃɪp/', example: 'An apprenticeship combines work and study.', viExample: 'Học nghề kết hợp công việc và học tập.' },
      { en: 'continuous professional development', type: '(n)', vi: 'phát triển nghề nghiệp liên tục (CPD)', ipa: '/kənˈtɪnjuəs prəˈfeʃnl dɪˈveləpmənt/', example: 'Teachers need CPD to stay updated.', viExample: 'Giáo viên cần CPD để cập nhật kiến thức.' },
      { en: 'knowledge gap', type: '(n)', vi: 'lỗ hổng kiến thức', ipa: '/ˈnɒlɪdʒ ɡæp/', example: 'Identify and close your knowledge gaps.', viExample: 'Xác định và lấp đầy lỗ hổng kiến thức của bạn.' },
      { en: 'active learning', type: '(n)', vi: 'học chủ động', ipa: '/ˈæktɪv ˈlɜːnɪŋ/', example: 'Active learning involves discussion and problem-solving.', viExample: 'Học chủ động bao gồm thảo luận và giải quyết vấn đề.' },
      { en: 'flipped classroom', type: '(n)', vi: 'lớp học đảo ngược', ipa: '/flɪpt ˈklɑːsruːm/', example: 'In a flipped classroom, students watch videos at home.', viExample: 'Trong lớp học đảo ngược, học sinh xem video ở nhà.' },
      { en: 'STEM education', type: '(n)', vi: 'giáo dục STEM', ipa: '/stem ˌedʒuˈkeɪʃn/', example: 'STEM education prepares students for future jobs.', viExample: 'Giáo dục STEM chuẩn bị cho học sinh các công việc tương lai.' },
      { en: 'educational equity', type: '(n)', vi: 'công bằng giáo dục', ipa: '/ˌedʒuˈkeɪʃnl ˈekwɪti/', example: 'Educational equity ensures all children have equal access.', viExample: 'Công bằng giáo dục đảm bảo mọi trẻ em có cơ hội tiếp cận bình đẳng.' },
      { en: 'digital literacy', type: '(n)', vi: 'hiểu biết kỹ thuật số', ipa: '/ˈdɪdʒɪtl ˈlɪtərəsi/', example: 'Digital literacy is essential in the 21st century.', viExample: 'Hiểu biết kỹ thuật số thiết yếu trong thế kỷ 21.' },
      { en: 'research paper', type: '(n)', vi: 'bài nghiên cứu khoa học', ipa: '/rɪˈsɜːtʃ ˈpeɪpər/', example: 'He published a research paper in Nature.', viExample: 'Anh ấy công bố bài nghiên cứu trên tạp chí Nature.' },
      { en: 'academic journal', type: '(n)', vi: 'tạp chí học thuật', ipa: '/ˌækəˈdemɪk ˈdʒɜːnl/', example: 'Academic journals publish peer-reviewed research.', viExample: 'Tạp chí học thuật công bố nghiên cứu được bình duyệt.' },
      { en: 'lifelong learning', type: '(n)', vi: 'học tập suốt đời', ipa: '/ˈlaɪflɒŋ ˈlɜːnɪŋ/', example: 'Lifelong learning keeps your mind sharp.', viExample: 'Học tập suốt đời giữ tâm trí bạn sắc bén.' },
      { en: 'study abroad', type: '(n/v)', vi: 'du học nước ngoài', ipa: '/ˈstʌdi əˈbrɔːd/', example: 'Studying abroad broadens your perspective.', viExample: 'Du học mở rộng quan điểm của bạn.' },
      { en: 'exchange program', type: '(n)', vi: 'chương trình trao đổi sinh viên', ipa: '/ɪksˈtʃeɪndʒ ˈprəʊɡræm/', example: 'She joined an exchange program in France.', viExample: 'Cô ấy tham gia chương trình trao đổi ở Pháp.' },
      { en: 'learning disability', type: '(n)', vi: 'khó khăn học tập', ipa: '/ˈlɜːnɪŋ dɪsəˈbɪlɪti/', example: 'Dyslexia is a common learning disability.', viExample: 'Chứng khó đọc là một khó khăn học tập phổ biến.' },
      { en: 'attention span', type: '(n)', vi: 'khả năng tập trung', ipa: '/əˈtenʃn spæn/', example: 'Short videos cater to shrinking attention spans.', viExample: 'Video ngắn phục vụ khả năng tập trung ngày càng giảm.' },
      { en: 'growth mindset', type: '(n)', vi: 'tư duy phát triển', ipa: '/ɡrəʊθ ˈmaɪndset/', example: 'A growth mindset sees failure as a learning opportunity.', viExample: 'Tư duy phát triển xem thất bại là cơ hội học hỏi.' },
      { en: 'emotional intelligence', type: '(n)', vi: 'trí tuệ cảm xúc (EQ)', ipa: '/ɪˈməʊʃnl ɪnˈtelɪdʒəns/', example: 'EQ is as important as IQ for success.', viExample: 'EQ quan trọng không kém IQ cho thành công.' },
    ],
    storyEn: `📚 BENNY GOES TO UNIVERSITY 🐰🎓

Benny the Bunny decided to study abroad. He earned a scholarship to an international university, which excited him enormously.

On his first day, the professor handed out the syllabus and explained the curriculum. "This semester, we focus on critical thinking, research methodology, and academic writing," she said. Benny's first assignment was a research paper — he had to find citations, avoid plagiarism, and develop a strong hypothesis.

In the library, Benny used peer-reviewed academic journals and developed his empirical analysis skills. He attended lectures, seminars, and tutorials. His GPA improved each semester.

"The secret to success," his professor told him, "is not rote learning — it's active learning with a growth mindset." Benny discovered metacognition — understanding HOW he learned best. He developed critical thinking and emotional intelligence.

By graduation, Benny was the top student. "Lifelong learning never stops!" he declared. The alumni cheered. 🏆`,
    storyVi: `📚 BENNY ĐI ĐẠI HỌC 🐰🎓

Benny Thỏ quyết định Du học (Study abroad). Anh giành được Học bổng (Scholarship) vào đại học quốc tế.

Ngày đầu tiên, Giáo sư (Professor) phát Đề cương (Syllabus) và giải thích Chương trình giảng dạy (Curriculum). "Học kỳ này, chúng ta tập trung vào Tư duy phản biện (Critical thinking), Phương pháp luận (Methodology) và viết học thuật," cô nói. Bài tập đầu tiên của Benny là Bài nghiên cứu (Research paper) — anh phải tìm Trích dẫn (Citations), tránh Đạo văn (Plagiarism) và phát triển Giả thuyết (Hypothesis).

Trong Thư viện (Library), Benny dùng Tạp chí học thuật (Academic journals) và phát triển kỹ năng phân tích thực nghiệm (Empirical). Anh tham gia Bài giảng (Lectures), Hội thảo (Seminars) và Buổi kèm (Tutorials). GPA của anh cải thiện mỗi học kỳ.

"Bí mật thành công," giáo sư nói, "không phải Học vẹt (Rote learning) — mà là Học chủ động (Active learning) với Tư duy phát triển (Growth mindset)." Benny khám phá Siêu nhận thức (Metacognition) — hiểu CÁCH mình học tốt nhất.

Đến khi tốt nghiệp, Benny là sinh viên xuất sắc nhất. "Học tập suốt đời (Lifelong learning) không bao giờ dừng!" anh tuyên bố. Các Cựu sinh viên (Alumni) vỗ tay ầm ầm. 🏆`
  },

  // ============================================================
  // 3. 🏠 NHÀ Ở & CUỘC SỐNG HÀNG NGÀY — 105 từ
  // Level: A2-B1 | Target: VSTEP A2-B1, IELTS Speaking Part 1/2
  // ============================================================
  {
    id: 'home-daily-life',
    title: '🏠 Nhà Ở & Cuộc Sống Hàng Ngày',
    description: 'Từ vựng nhà ở từ đơn giản nhất đến mô tả chi tiết. Thiết yếu cho IELTS Speaking Part 1-2 và giao tiếp hàng ngày.',
    level: 'A2-B1',
    examTags: ['IELTS Speaking', 'VSTEP', 'Daily Life'],
    words: [
      // ROOMS
      { en: 'bedroom', type: '(n)', vi: 'phòng ngủ 🛏️', ipa: '/ˈbedrʊm/', example: 'My bedroom has a large window.', viExample: 'Phòng ngủ tôi có cửa sổ lớn.' },
      { en: 'kitchen', type: '(n)', vi: 'nhà bếp 🍳', ipa: '/ˈkɪtʃɪn/', example: 'She cooks in the kitchen every day.', viExample: 'Cô ấy nấu ăn trong bếp mỗi ngày.' },
      { en: 'living room', type: '(n)', vi: 'phòng khách 🛋️', ipa: '/ˈlɪvɪŋ ruːm/', example: 'We watch TV in the living room.', viExample: 'Chúng tôi xem TV trong phòng khách.' },
      { en: 'bathroom', type: '(n)', vi: 'phòng tắm 🚿', ipa: '/ˈbɑːθruːm/', example: 'The bathroom has a shower.', viExample: 'Phòng tắm có vòi hoa sen.' },
      { en: 'garage', type: '(n)', vi: 'nhà để xe 🚗', ipa: '/ˈɡærɑːʒ/', example: 'He parks his car in the garage.', viExample: 'Anh đỗ xe trong nhà để xe.' },
      { en: 'balcony', type: '(n)', vi: 'ban công 🌿', ipa: '/ˈbælkəni/', example: 'I drink coffee on the balcony every morning.', viExample: 'Tôi uống cà phê trên ban công mỗi sáng.' },
      { en: 'garden', type: '(n)', vi: 'khu vườn 🌺', ipa: '/ˈɡɑːdn/', example: 'The garden has beautiful flowers.', viExample: 'Khu vườn có nhiều hoa đẹp.' },
      { en: 'staircase', type: '(n)', vi: 'cầu thang', ipa: '/ˈsteəkeɪs/', example: 'The staircase leads to the second floor.', viExample: 'Cầu thang dẫn lên tầng hai.' },
      { en: 'hallway', type: '(n)', vi: 'hành lang', ipa: '/ˈhɔːlweɪ/', example: 'The hallway is narrow and dark.', viExample: 'Hành lang hẹp và tối.' },
      { en: 'basement', type: '(n)', vi: 'tầng hầm', ipa: '/ˈbeɪsmənt/', example: 'We store boxes in the basement.', viExample: 'Chúng tôi để hộp ở tầng hầm.' },
      // FURNITURE
      { en: 'sofa', type: '(n)', vi: 'ghế sofa 🛋️', ipa: '/ˈsəʊfə/', example: 'The sofa is very comfortable.', viExample: 'Ghế sofa rất thoải mái.' },
      { en: 'wardrobe', type: '(n)', vi: 'tủ quần áo 👗', ipa: '/ˈwɔːdrəʊb/', example: 'Her wardrobe is full of clothes.', viExample: 'Tủ quần áo của cô đầy quần áo.' },
      { en: 'bookshelf', type: '(n)', vi: 'kệ sách 📚', ipa: '/ˈbʊkʃelf/', example: 'The bookshelf holds 200 books.', viExample: 'Kệ sách chứa 200 cuốn sách.' },
      { en: 'curtain', type: '(n)', vi: 'rèm cửa', ipa: '/ˈkɜːtn/', example: 'Open the curtains to let in light.', viExample: 'Kéo rèm ra để ánh sáng vào.' },
      { en: 'lamp', type: '(n)', vi: 'đèn bàn 💡', ipa: '/læmp/', example: 'I read by the lamp at night.', viExample: 'Tôi đọc sách dưới ánh đèn bàn ban đêm.' },
      { en: 'microwave', type: '(n)', vi: 'lò vi sóng', ipa: '/ˈmaɪkrəweɪv/', example: 'Heat the food in the microwave.', viExample: 'Hâm nóng thức ăn trong lò vi sóng.' },
      { en: 'washing machine', type: '(n)', vi: 'máy giặt 🧺', ipa: '/ˈwɒʃɪŋ məˌʃiːn/', example: 'The washing machine broke down.', viExample: 'Máy giặt bị hỏng.' },
      { en: 'air conditioner', type: '(n)', vi: 'điều hòa không khí ❄️', ipa: '/eər kənˈdɪʃənər/', example: 'Turn on the air conditioner — it\'s hot!', viExample: 'Bật điều hòa — trời nóng quá!' },
      { en: 'refrigerator', type: '(n)', vi: 'tủ lạnh', ipa: '/rɪˈfrɪdʒəreɪtər/', example: 'Keep vegetables in the refrigerator.', viExample: 'Để rau trong tủ lạnh.' },
      { en: 'ceiling fan', type: '(n)', vi: 'quạt trần', ipa: '/ˈsiːlɪŋ fæn/', example: 'The ceiling fan keeps the room cool.', viExample: 'Quạt trần giữ phòng mát mẻ.' },
      // HOUSING TYPES
      { en: 'apartment', type: '(n)', vi: 'căn hộ chung cư 🏢', ipa: '/əˈpɑːtmənt/', example: 'She rents a small apartment in the city.', viExample: 'Cô ấy thuê một căn hộ nhỏ trong thành phố.' },
      { en: 'villa', type: '(n)', vi: 'biệt thự 🏡', ipa: '/ˈvɪlə/', example: 'They stayed in a villa by the beach.', viExample: 'Họ ở trong một biệt thự bên biển.' },
      { en: 'townhouse', type: '(n)', vi: 'nhà phố', ipa: '/ˈtaʊnhaʊs/', example: 'Townhouses are popular in urban areas.', viExample: 'Nhà phố phổ biến ở khu đô thị.' },
      { en: 'detached house', type: '(n)', vi: 'nhà độc lập (không liền kề)', ipa: '/dɪˈtætʃt haʊs/', example: 'A detached house has a private garden.', viExample: 'Nhà độc lập có vườn riêng.' },
      { en: 'studio flat', type: '(n)', vi: 'căn hộ studio (phòng đơn)', ipa: '/ˈstjuːdiəʊ flæt/', example: 'She lives in a studio flat near campus.', viExample: 'Cô ấy sống trong căn hộ studio gần trường đại học.' },
      { en: 'dormitory', type: '(n)', vi: 'ký túc xá', ipa: '/ˈdɔːmɪtri/', example: 'University students live in dormitories.', viExample: 'Sinh viên đại học sống trong ký túc xá.' },
      { en: 'landlord', type: '(n)', vi: 'chủ nhà (cho thuê)', ipa: '/ˈlændlɔːd/', example: 'The landlord repairs the broken pipes.', viExample: 'Chủ nhà sửa đường ống bị vỡ.' },
      { en: 'tenant', type: '(n)', vi: 'người thuê nhà', ipa: '/ˈtenənt/', example: 'The tenant pays rent on the first of each month.', viExample: 'Người thuê nhà trả tiền thuê vào ngày đầu mỗi tháng.' },
      { en: 'mortgage', type: '(n)', vi: 'thế chấp vay mua nhà', ipa: '/ˈmɔːɡɪdʒ/', example: 'They took a 20-year mortgage on the house.', viExample: 'Họ vay thế chấp 20 năm để mua nhà.' },
      { en: 'down payment', type: '(n)', vi: 'tiền đặt cọc mua nhà', ipa: '/daʊn ˈpeɪmənt/', example: 'Save for a down payment before buying a home.', viExample: 'Tiết kiệm tiền đặt cọc trước khi mua nhà.' },
      // DAILY ROUTINES
      { en: 'alarm clock', type: '(n)', vi: 'đồng hồ báo thức ⏰', ipa: '/əˈlɑːm klɒk/', example: 'My alarm clock rings at 6 AM.', viExample: 'Đồng hồ báo thức của tôi reo lúc 6 giờ sáng.' },
      { en: 'chores', type: '(n)', vi: 'việc nhà 🧹', ipa: '/tʃɔːrz/', example: 'Children should help with household chores.', viExample: 'Trẻ em nên giúp làm việc nhà.' },
      { en: 'laundry', type: '(n)', vi: 'giặt đồ 👕', ipa: '/ˈlɔːndri/', example: 'I do laundry twice a week.', viExample: 'Tôi giặt đồ hai lần một tuần.' },
      { en: 'vacuum cleaner', type: '(n)', vi: 'máy hút bụi', ipa: '/ˈvækjuːm ˌkliːnər/', example: 'Use the vacuum cleaner on the carpet.', viExample: 'Dùng máy hút bụi trên thảm.' },
      { en: 'mop', type: '(n/v)', vi: 'cây lau nhà / lau nhà', ipa: '/mɒp/', example: 'She mops the kitchen floor every day.', viExample: 'Cô ấy lau sàn bếp mỗi ngày.' },
      { en: 'grocery shopping', type: '(n)', vi: 'đi chợ mua thực phẩm 🛒', ipa: '/ˈɡrəʊsəri ˈʃɒpɪŋ/', example: 'I do grocery shopping on Saturdays.', viExample: 'Tôi đi chợ vào thứ Bảy.' },
      { en: 'utility bill', type: '(n)', vi: 'hóa đơn tiện ích (điện nước)', ipa: '/juːˈtɪlɪti bɪl/', example: 'The utility bill was very high this month.', viExample: 'Hóa đơn tiện ích tháng này rất cao.' },
      { en: 'neighbourhood', type: '(n)', vi: 'khu phố/hàng xóm', ipa: '/ˈneɪbəhʊd/', example: 'Our neighbourhood is safe and quiet.', viExample: 'Khu phố chúng tôi an toàn và yên tĩnh.' },
      { en: 'commute', type: '(n/v)', vi: 'đi làm hằng ngày (di chuyển)', ipa: '/kəˈmjuːt/', example: 'My commute takes 45 minutes by bus.', viExample: 'Hành trình đi làm của tôi mất 45 phút bằng xe buýt.' },
      { en: 'suburb', type: '(n)', vi: 'vùng ngoại ô', ipa: '/ˈsʌbɜːb/', example: 'They moved to the suburbs for a bigger house.', viExample: 'Họ chuyển ra ngoại ô để có nhà to hơn.' },
      { en: 'renovation', type: '(n)', vi: 'cải tạo/tân trang nhà', ipa: '/ˌrenəˈveɪʃn/', example: 'Home renovation increases property value.', viExample: 'Cải tạo nhà tăng giá trị bất động sản.' },
      { en: 'interior design', type: '(n)', vi: 'thiết kế nội thất', ipa: '/ɪnˈtɪəriər dɪˈzaɪn/', example: 'She studies interior design at university.', viExample: 'Cô ấy học thiết kế nội thất tại đại học.' },
      { en: 'plumber', type: '(n)', vi: 'thợ sửa ống nước', ipa: '/ˈplʌmər/', example: 'Call the plumber to fix the leak.', viExample: 'Gọi thợ sửa ống nước để sửa chỗ rò rỉ.' },
      { en: 'electrician', type: '(n)', vi: 'thợ điện', ipa: '/ɪˌlekˈtrɪʃn/', example: 'The electrician fixed the power cut.', viExample: 'Thợ điện sửa mất điện.' },
      { en: 'insulation', type: '(n)', vi: 'cách nhiệt/cách âm', ipa: '/ˌɪnsjuˈleɪʃn/', example: 'Good insulation saves energy bills.', viExample: 'Cách nhiệt tốt tiết kiệm hóa đơn điện.' },
      { en: 'solar panel', type: '(n)', vi: 'tấm pin mặt trời ☀️', ipa: '/ˈsəʊlər ˈpænl/', example: 'Solar panels power the house.', viExample: 'Tấm pin mặt trời cung cấp điện cho nhà.' },
      { en: 'smart home', type: '(n)', vi: 'nhà thông minh', ipa: '/smɑːt həʊm/', example: 'A smart home can be controlled by voice.', viExample: 'Nhà thông minh có thể điều khiển bằng giọng nói.' },
      { en: 'lease', type: '(n)', vi: 'hợp đồng thuê nhà', ipa: '/liːs/', example: 'She signed a 12-month lease.', viExample: 'Cô ấy ký hợp đồng thuê nhà 12 tháng.' },
      { en: 'real estate', type: '(n)', vi: 'bất động sản', ipa: '/rɪəl ɪˈsteɪt/', example: 'Real estate prices are rising.', viExample: 'Giá bất động sản đang tăng.' },
      { en: 'household', type: '(n)', vi: 'hộ gia đình', ipa: '/ˈhaʊshəʊld/', example: 'The average household has 4 people.', viExample: 'Hộ gia đình trung bình có 4 người.' },
      { en: 'property tax', type: '(n)', vi: 'thuế bất động sản', ipa: '/ˈprɒpəti tæks/', example: 'Homeowners pay annual property tax.', viExample: 'Chủ nhà trả thuế bất động sản hàng năm.' },
      { en: 'floor plan', type: '(n)', vi: 'mặt bằng (sơ đồ tầng)', ipa: '/flɔːr plæn/', example: 'Study the floor plan before buying.', viExample: 'Xem mặt bằng trước khi mua.' },
      { en: 'storage room', type: '(n)', vi: 'phòng kho', ipa: '/ˈstɔːrɪdʒ ruːm/', example: 'Extra items go in the storage room.', viExample: 'Đồ thừa để trong phòng kho.' },
      { en: 'rooftop', type: '(n)', vi: 'sân thượng', ipa: '/ˈruːftɒp/', example: 'They have a garden on the rooftop.', viExample: 'Họ có vườn trên sân thượng.' },
      { en: 'terrace', type: '(n)', vi: 'sân hiên / nhà liền kề', ipa: '/ˈterəs/', example: 'We had lunch on the terrace.', viExample: 'Chúng tôi ăn trưa trên sân hiên.' },
    ],
    storyEn: `🏠 BENNY'S DREAM HOME 🐰

Benny the Bunny always dreamed of having his own home. He lived in a tiny studio flat near campus, paying high rent to his landlord. Every morning, his alarm clock rang at 6 AM, and he commuted 45 minutes by bus to work.

One day, he saved enough for a down payment. With a 20-year mortgage, he bought a beautiful townhouse in a quiet neighbourhood outside the city — in the suburbs.

The house had 3 bedrooms, 2 bathrooms, a spacious living room, and a wonderful balcony with garden views. He hired an electrician to check the wiring, and a plumber to fix the pipes. He added solar panels to save on utility bills and installed smart home technology.

He renovated the interior with help from an interior designer. New curtains, a comfortable sofa, a large bookshelf, and a ceiling fan in every room.

"This is my dream home!" said Benny, sipping tea on his rooftop terrace. "Now I can invite all my friends!" 🏡`,
    storyVi: `🏠 NGÔI NHÀ MƠ ƯỚC CỦA BENNY 🐰

Benny Thỏ luôn mơ có ngôi nhà riêng. Anh sống trong Căn hộ studio (Studio flat) nhỏ gần trường, trả tiền thuê cao cho Chủ nhà (Landlord). Mỗi sáng, Đồng hồ báo thức (Alarm clock) reo lúc 6 giờ, và anh phải đi lại (Commute) 45 phút bằng xe buýt đến nơi làm việc.

Một ngày, anh tiết kiệm đủ tiền Đặt cọc (Down payment). Với Thế chấp (Mortgage) 20 năm, anh mua một Nhà phố (Townhouse) đẹp trong Khu phố (Neighbourhood) yên tĩnh ở Ngoại ô (Suburbs).

Nhà có 3 Phòng ngủ (Bedrooms), 2 Phòng tắm (Bathrooms), Phòng khách (Living room) rộng rãi và Ban công (Balcony) tuyệt đẹp nhìn ra vườn. Anh thuê Thợ điện (Electrician) kiểm tra điện và Thợ sửa ống nước (Plumber) sửa ống dẫn. Anh lắp Tấm pin mặt trời (Solar panels) tiết kiệm Hóa đơn tiện ích (Utility bills) và cài đặt công nghệ Nhà thông minh (Smart home).

Anh Cải tạo (Renovated) nội thất với sự giúp đỡ của Nhà thiết kế nội thất (Interior designer). Rèm (Curtains) mới, Ghế sofa (Sofa) thoải mái, Kệ sách (Bookshelf) lớn và Quạt trần (Ceiling fan) ở mỗi phòng.

"Đây là ngôi nhà mơ ước của tôi!" Benny nói, nhâm nhi trà trên Sân thượng (Rooftop). 🏡`
  },

  // ============================================================
  // 4. 🎨 NGHỆ THUẬT & GIẢI TRÍ — 100 từ
  // Level: B1-C1 | Target: IELTS, VSTEP, Culture
  // ============================================================
  {
    id: 'arts-entertainment',
    title: '🎨 Nghệ Thuật & Giải Trí',
    description: 'Từ vựng nghệ thuật, âm nhạc, điện ảnh, văn học — hay gặp trong IELTS Reading và Speaking. Đủ để thảo luận về văn hóa và giải trí.',
    level: 'B1-C1',
    examTags: ['IELTS', 'VSTEP', 'Culture'],
    words: [
      // VISUAL ARTS
      { en: 'painting', type: '(n)', vi: 'tranh vẽ / hội họa 🖼️', ipa: '/ˈpeɪntɪŋ/', example: 'The painting was sold for millions.', viExample: 'Bức tranh được bán hàng triệu đô.' },
      { en: 'sculpture', type: '(n)', vi: 'điêu khắc / tác phẩm điêu khắc', ipa: '/ˈskʌlptʃər/', example: 'The sculpture is made of marble.', viExample: 'Tác phẩm điêu khắc làm từ đá cẩm thạch.' },
      { en: 'gallery', type: '(n)', vi: 'triển lãm nghệ thuật 🖼️', ipa: '/ˈɡæləri/', example: 'She visited the national art gallery.', viExample: 'Cô ấy thăm phòng trưng bày nghệ thuật quốc gia.' },
      { en: 'museum', type: '(n)', vi: 'bảo tàng 🏛️', ipa: '/mjuːˈziːəm/', example: 'The museum has ancient artifacts.', viExample: 'Bảo tàng có các cổ vật cổ đại.' },
      { en: 'exhibition', type: '(n)', vi: 'triển lãm', ipa: '/ˌeksɪˈbɪʃn/', example: 'The photography exhibition was stunning.', viExample: 'Triển lãm nhiếp ảnh thật ấn tượng.' },
      { en: 'portrait', type: '(n)', vi: 'chân dung (tranh/ảnh)', ipa: '/ˈpɔːtrɪt/', example: 'She painted a portrait of her mother.', viExample: 'Cô ấy vẽ chân dung mẹ mình.' },
      { en: 'landscape', type: '(n)', vi: 'tranh phong cảnh / cảnh quan', ipa: '/ˈlændskeɪp/', example: 'He painted beautiful landscapes.', viExample: 'Anh ấy vẽ những tranh phong cảnh đẹp.' },
      { en: 'abstract art', type: '(n)', vi: 'nghệ thuật trừu tượng', ipa: '/ˈæbstrækt ɑːt/', example: 'Abstract art can be hard to understand.', viExample: 'Nghệ thuật trừu tượng có thể khó hiểu.' },
      { en: 'canvas', type: '(n)', vi: 'bức tranh / vải canvas', ipa: '/ˈkænvəs/', example: 'She painted on a large canvas.', viExample: 'Cô ấy vẽ trên bức vải lớn.' },
      { en: 'watercolor', type: '(n)', vi: 'màu nước / tranh màu nước', ipa: '/ˈwɔːtərˌkʌlər/', example: 'She loves painting with watercolors.', viExample: 'Cô ấy thích vẽ bằng màu nước.' },
      // MUSIC
      { en: 'melody', type: '(n)', vi: 'giai điệu 🎵', ipa: '/ˈmelədi/', example: 'The melody was hauntingly beautiful.', viExample: 'Giai điệu đó vừa buồn vừa đẹp.' },
      { en: 'harmony', type: '(n)', vi: 'hòa âm', ipa: '/ˈhɑːməni/', example: 'The choir sang in perfect harmony.', viExample: 'Dàn hợp xướng hát trong hòa âm hoàn hảo.' },
      { en: 'rhythm', type: '(n)', vi: 'nhịp điệu 🥁', ipa: '/ˈrɪðəm/', example: 'The drummer set the rhythm.', viExample: 'Người chơi trống tạo ra nhịp điệu.' },
      { en: 'composer', type: '(n)', vi: 'nhà soạn nhạc 🎼', ipa: '/kəmˈpəʊzər/', example: 'Beethoven was a great composer.', viExample: 'Beethoven là nhà soạn nhạc vĩ đại.' },
      { en: 'orchestra', type: '(n)', vi: 'dàn nhạc giao hưởng 🎻', ipa: '/ˈɔːkɪstrə/', example: 'The orchestra performed Vivaldi.', viExample: 'Dàn nhạc biểu diễn tác phẩm của Vivaldi.' },
      { en: 'genre', type: '(n)', vi: 'thể loại (âm nhạc/phim)', ipa: '/ˈʒɒnrə/', example: 'Jazz is my favorite music genre.', viExample: 'Jazz là thể loại âm nhạc yêu thích của tôi.' },
      { en: 'lyrics', type: '(n)', vi: 'lời bài hát 🎤', ipa: '/ˈlɪrɪks/', example: 'The lyrics are very meaningful.', viExample: 'Lời bài hát rất có ý nghĩa.' },
      { en: 'debut', type: '(n)', vi: 'ra mắt lần đầu', ipa: '/ˈdeɪbjuː/', example: 'Her debut album sold 2 million copies.', viExample: 'Album đầu tay của cô bán được 2 triệu bản.' },
      { en: 'collaboration', type: '(n)', vi: 'hợp tác nghệ thuật', ipa: '/kəˌlæbəˈreɪʃn/', example: 'The song was a collaboration between two artists.', viExample: 'Bài hát là sự hợp tác giữa hai nghệ sĩ.' },
      { en: 'streaming', type: '(n)', vi: 'phát trực tuyến 📱', ipa: '/ˈstriːmɪŋ/', example: 'Streaming has replaced CDs.', viExample: 'Phát trực tuyến đã thay thế đĩa CD.' },
      // FILM & THEATRE
      { en: 'director', type: '(n)', vi: 'đạo diễn 🎬', ipa: '/daɪˈrektər/', example: 'The director won an Oscar.', viExample: 'Đạo diễn đã đoạt giải Oscar.' },
      { en: 'screenplay', type: '(n)', vi: 'kịch bản phim', ipa: '/ˈskriːnpleɪ/', example: 'He wrote the screenplay in 30 days.', viExample: 'Anh ấy viết kịch bản trong 30 ngày.' },
      { en: 'box office', type: '(n)', vi: 'phòng vé / doanh thu phòng vé', ipa: '/ˈbɒks ˌɒfɪs/', example: 'The film broke box office records.', viExample: 'Bộ phim phá kỷ lục phòng vé.' },
      { en: 'trailer', type: '(n)', vi: 'đoạn giới thiệu phim', ipa: '/ˈtreɪlər/', example: 'The trailer gave too much away.', viExample: 'Đoạn giới thiệu tiết lộ quá nhiều.' },
      { en: 'premiere', type: '(n)', vi: 'buổi ra mắt phim', ipa: '/ˈpremiər/', example: 'The stars attended the film premiere.', viExample: 'Các ngôi sao tham dự buổi ra mắt phim.' },
      { en: 'blockbuster', type: '(n)', vi: 'phim bom tấn', ipa: '/ˈblɒkˌbʌstər/', example: 'Avengers was a blockbuster hit.', viExample: 'Avengers là bom tấn ăn khách.' },
      { en: 'documentary', type: '(n)', vi: 'phim tài liệu', ipa: '/ˌdɒkjuˈmentri/', example: 'The documentary revealed shocking facts.', viExample: 'Bộ phim tài liệu tiết lộ sự thật sốc.' },
      { en: 'animation', type: '(n)', vi: 'hoạt hình 🐰', ipa: '/ˌænɪˈmeɪʃn/', example: 'Disney specializes in animation.', viExample: 'Disney chuyên về hoạt hình.' },
      { en: 'cast', type: '(n)', vi: 'dàn diễn viên', ipa: '/kɑːst/', example: 'The cast included many famous actors.', viExample: 'Dàn diễn viên có nhiều diễn viên nổi tiếng.' },
      { en: 'special effects', type: '(n)', vi: 'kỹ xảo điện ảnh', ipa: '/ˈspeʃl ɪˈfekts/', example: 'The special effects were breathtaking.', viExample: 'Kỹ xảo điện ảnh thật ấn tượng.' },
      // LITERATURE
      { en: 'novel', type: '(n)', vi: 'tiểu thuyết 📖', ipa: '/ˈnɒvl/', example: 'She wrote her first novel at age 25.', viExample: 'Cô ấy viết tiểu thuyết đầu tiên ở tuổi 25.' },
      { en: 'poetry', type: '(n)', vi: 'thơ ca 📝', ipa: '/ˈpəʊɪtri/', example: 'She loves reading classical poetry.', viExample: 'Cô ấy thích đọc thơ cổ điển.' },
      { en: 'plot', type: '(n)', vi: 'cốt truyện', ipa: '/plɒt/', example: 'The plot had many unexpected twists.', viExample: 'Cốt truyện có nhiều tình tiết bất ngờ.' },
      { en: 'protagonist', type: '(n)', vi: 'nhân vật chính', ipa: '/prəˈtæɡənɪst/', example: 'The protagonist overcomes great challenges.', viExample: 'Nhân vật chính vượt qua nhiều thách thức lớn.' },
      { en: 'narrative', type: '(n)', vi: 'tự sự / câu chuyện', ipa: '/ˈnærətɪv/', example: 'The narrative was compelling throughout.', viExample: 'Câu chuyện cuốn hút từ đầu đến cuối.' },
      { en: 'metaphor', type: '(n)', vi: 'ẩn dụ', ipa: '/ˈmetəfər/', example: 'Life is a journey is a common metaphor.', viExample: 'Cuộc đời là một hành trình là ẩn dụ phổ biến.' },
      { en: 'satire', type: '(n)', vi: 'trào phúng / châm biếm', ipa: '/ˈsætaɪər/', example: 'Political satire mocks government actions.', viExample: 'Trào phúng chính trị chế nhạo hành động của chính phủ.' },
      { en: 'genre fiction', type: '(n)', vi: 'tiểu thuyết thể loại (trinh thám, khoa học viễn tưởng...)', ipa: '/ˈʒɒnrə ˈfɪkʃn/', example: 'She writes science fiction genre fiction.', viExample: 'Cô ấy viết tiểu thuyết khoa học viễn tưởng.' },
      { en: 'bestseller', type: '(n)', vi: 'cuốn sách bán chạy nhất', ipa: '/ˌbestˈselər/', example: 'Her novel became an instant bestseller.', viExample: 'Tiểu thuyết của cô ấy lập tức trở thành sách bán chạy nhất.' },
      { en: 'autobiography', type: '(n)', vi: 'tự truyện', ipa: '/ˌɔːtəbaɪˈɒɡrəfi/', example: 'The CEO wrote an inspiring autobiography.', viExample: 'Giám đốc điều hành viết một cuốn tự truyện đầy cảm hứng.' },
      // PERFORMING ARTS
      { en: 'choreography', type: '(n)', vi: 'biên đạo múa', ipa: '/ˌkɒriˈɒɡrəfi/', example: 'Her choreography won international awards.', viExample: 'Biên đạo múa của cô giành giải thưởng quốc tế.' },
      { en: 'improvisation', type: '(n)', vi: 'ứng tấu / ứng biến', ipa: '/ˌɪmprɒvɪˈzeɪʃn/', example: 'Jazz musicians are known for improvisation.', viExample: 'Nhạc sĩ jazz nổi tiếng với ứng tấu.' },
      { en: 'contemporary', type: '(adj)', vi: 'đương đại / hiện đại', ipa: '/kənˈtemprəri/', example: 'Contemporary art challenges traditional ideas.', viExample: 'Nghệ thuật đương đại thách thức ý tưởng truyền thống.' },
      { en: 'heritage', type: '(n)', vi: 'di sản văn hóa', ipa: '/ˈherɪtɪdʒ/', example: 'Vietnam has a rich cultural heritage.', viExample: 'Việt Nam có di sản văn hóa phong phú.' },
      { en: 'folklore', type: '(n)', vi: 'văn hóa dân gian', ipa: '/ˈfəʊklɔːr/', example: 'Folklore tells the history of a people.', viExample: 'Văn hóa dân gian kể lịch sử của một dân tộc.' },
      { en: 'craftsmanship', type: '(n)', vi: 'nghề thủ công / tay nghề', ipa: '/ˈkrɑːftsmənʃɪp/', example: 'The vase showed excellent craftsmanship.', viExample: 'Chiếc bình thể hiện tay nghề xuất sắc.' },
      { en: 'censorship', type: '(n)', vi: 'kiểm duyệt', ipa: '/ˈsensəʃɪp/', example: 'Artistic censorship limits creative freedom.', viExample: 'Kiểm duyệt nghệ thuật hạn chế tự do sáng tạo.' },
      { en: 'aesthetic', type: '(adj/n)', vi: 'thẩm mỹ', ipa: '/iːsˈθetɪk/', example: 'The room has a minimalist aesthetic.', viExample: 'Căn phòng có phong cách thẩm mỹ tối giản.' },
      { en: 'curator', type: '(n)', vi: 'người phụ trách bảo tàng/triển lãm', ipa: '/kjʊˈreɪtər/', example: 'The curator selected the best artworks.', viExample: 'Người phụ trách lựa chọn những tác phẩm nghệ thuật tốt nhất.' },
      { en: 'cultural diversity', type: '(n)', vi: 'đa dạng văn hóa', ipa: '/ˈkʌltʃərəl daɪˈvɜːsɪti/', example: 'Cultural diversity enriches society.', viExample: 'Đa dạng văn hóa làm giàu cho xã hội.' },
    ],
    storyEn: `🎨 BENNY THE ARTIST 🐰

Benny loved all forms of art. He visited the national museum every weekend, admired sculpture and abstract art in the gallery, and watched documentary films about great composers.

One day, he decided to create his own painting — a large landscape in watercolor. He set up his canvas in the garden and painted for hours. The melody of an orchestra played softly in the background. When finished, the portrait-style landscape showed his neighbourhood in beautiful, vivid color.

He submitted it to a local exhibition. The curator was impressed. "Your aesthetic sense is remarkable," she said. The painting became a bestseller at the gallery! 

Inspired, Benny started writing a novel with a fascinating protagonist, clever metaphors, and an unexpected plot. He submitted it to publishers and earned a film adaptation deal. The blockbuster movie premiered to millions!

"Art connects us all," said Benny. "Whether painting, poetry, or music — art is how we share our hearts." 🎭`,
    storyVi: `🎨 BENNY NGHỆ SĨ 🐰

Benny yêu tất cả các hình thức nghệ thuật. Mỗi cuối tuần, anh thăm Bảo tàng (Museum) quốc gia, ngắm Điêu khắc (Sculpture) và Nghệ thuật trừu tượng (Abstract art) ở Triển lãm (Gallery).

Một ngày, anh quyết định tự vẽ — một bức Tranh phong cảnh (Landscape) lớn bằng Màu nước (Watercolor). Anh đặt Bức vải (Canvas) trong vườn và vẽ hàng giờ. Giai điệu (Melody) của Dàn nhạc (Orchestra) vang lên nhẹ nhàng phía sau. Bức Chân dung (Portrait) phong cảnh thể hiện khu phố anh trong màu sắc tươi sáng.

Anh nộp tác phẩm cho Triển lãm (Exhibition) địa phương. Người phụ trách (Curator) ấn tượng. "Cảm quan Thẩm mỹ (Aesthetic) của bạn thật đặc biệt!" bức tranh trở thành sản phẩm Bán chạy (Bestseller) tại phòng tranh!

Được truyền cảm hứng, Benny bắt đầu viết Tiểu thuyết (Novel) với Nhân vật chính (Protagonist) hấp dẫn và Cốt truyện (Plot) bất ngờ. Bộ phim Bom tấn (Blockbuster) ra mắt đến hàng triệu khán giả!

"Nghệ thuật kết nối chúng ta," Benny nói. 🎭`
  },

  // ============================================================
  // 5. 🍎 THỰC PHẨM & DINH DƯỠNG — 100 từ
  // Level: A2-B2 | Target: Daily life, IELTS Task 1 & 2, VSTEP
  // ============================================================
  {
    id: 'food-nutrition',
    title: '🍎 Thực Phẩm & Dinh Dưỡng',
    description: 'Từ vựng thức ăn từ cơ bản đến chuyên sâu. Bao gồm: nấu ăn, nhà hàng, chế độ ăn, dinh dưỡng học. Từ dùng khi đi ăn đến viết IELTS về healthy eating.',
    level: 'A2-B2',
    examTags: ['IELTS', 'VSTEP', 'Daily Life'],
    words: [
      // BASIC FOODS
      { en: 'vegetable', type: '(n)', vi: 'rau củ 🥦', ipa: '/ˈvedʒtəbl/', example: 'Eat more vegetables for better health.', viExample: 'Ăn nhiều rau hơn để có sức khỏe tốt hơn.' },
      { en: 'fruit', type: '(n)', vi: 'trái cây 🍎', ipa: '/fruːt/', example: 'Fruits contain essential vitamins.', viExample: 'Trái cây chứa nhiều vitamin thiết yếu.' },
      { en: 'protein', type: '(n)', vi: 'protein / chất đạm', ipa: '/ˈprəʊtiːn/', example: 'Eggs are a great source of protein.', viExample: 'Trứng là nguồn protein tuyệt vời.' },
      { en: 'carbohydrate', type: '(n)', vi: 'carbohydrate / tinh bột', ipa: '/ˌkɑːbəʊˈhaɪdreɪt/', example: 'Rice and bread are carbohydrates.', viExample: 'Cơm và bánh mì là carbohydrate.' },
      { en: 'fat', type: '(n)', vi: 'chất béo 🧈', ipa: '/fæt/', example: 'Avocado has healthy fats.', viExample: 'Bơ có chất béo lành mạnh.' },
      { en: 'vitamin', type: '(n)', vi: 'vitamin', ipa: '/ˈvɪtəmɪn/', example: 'Vitamin C boosts the immune system.', viExample: 'Vitamin C tăng cường hệ miễn dịch.' },
      { en: 'mineral', type: '(n)', vi: 'khoáng chất', ipa: '/ˈmɪnərəl/', example: 'Milk provides calcium and other minerals.', viExample: 'Sữa cung cấp canxi và các khoáng chất khác.' },
      { en: 'calorie', type: '(n)', vi: 'calo', ipa: '/ˈkæləri/', example: 'This meal has 500 calories.', viExample: 'Bữa ăn này có 500 calo.' },
      { en: 'fiber', type: '(n)', vi: 'chất xơ', ipa: '/ˈfaɪbər/', example: 'Whole grains are rich in fiber.', viExample: 'Ngũ cốc nguyên hạt giàu chất xơ.' },
      { en: 'ingredient', type: '(n)', vi: 'nguyên liệu nấu ăn 🧄', ipa: '/ɪnˈɡriːdiənt/', example: 'Fresh ingredients make better food.', viExample: 'Nguyên liệu tươi tạo ra thức ăn ngon hơn.' },
      // COOKING METHODS
      { en: 'boil', type: '(v)', vi: 'luộc 🍲', ipa: '/bɔɪl/', example: 'Boil the eggs for 10 minutes.', viExample: 'Luộc trứng trong 10 phút.' },
      { en: 'fry', type: '(v)', vi: 'chiên / xào 🍳', ipa: '/fraɪ/', example: 'Fry the tofu until golden brown.', viExample: 'Chiên đậu phụ đến khi vàng nâu.' },
      { en: 'grill', type: '(v)', vi: 'nướng (trên lửa/vỉ)', ipa: '/ɡrɪl/', example: 'Grill the chicken for 20 minutes.', viExample: 'Nướng gà trong 20 phút.' },
      { en: 'bake', type: '(v)', vi: 'nướng lò 🧁', ipa: '/beɪk/', example: 'Bake the bread at 180°C.', viExample: 'Nướng bánh ở 180°C.' },
      { en: 'steam', type: '(v)', vi: 'hấp 🥟', ipa: '/stiːm/', example: 'Steam vegetables to keep nutrients.', viExample: 'Hấp rau để giữ chất dinh dưỡng.' },
      { en: 'marinate', type: '(v)', vi: 'ướp (thịt)', ipa: '/ˈmærɪneɪt/', example: 'Marinate the beef for 2 hours.', viExample: 'Ướp thịt bò trong 2 giờ.' },
      { en: 'chop', type: '(v)', vi: 'chặt / băm', ipa: '/tʃɒp/', example: 'Chop the onions finely.', viExample: 'Băm hành tây nhỏ.' },
      { en: 'simmer', type: '(v)', vi: 'đun nhỏ lửa', ipa: '/ˈsɪmər/', example: 'Let the soup simmer for 30 minutes.', viExample: 'Để súp đun nhỏ lửa trong 30 phút.' },
      { en: 'recipe', type: '(n)', vi: 'công thức nấu ăn 📋', ipa: '/ˈresɪpi/', example: 'Follow the recipe carefully.', viExample: 'Tuân theo công thức nấu ăn cẩn thận.' },
      { en: 'seasoning', type: '(n)', vi: 'gia vị nêm nếm', ipa: '/ˈsiːzənɪŋ/', example: 'Add seasoning to enhance flavor.', viExample: 'Thêm gia vị để tăng hương vị.' },
      // RESTAURANT / DINING
      { en: 'menu', type: '(n)', vi: 'thực đơn 🍽️', ipa: '/ˈmenjuː/', example: 'The menu has vegetarian options.', viExample: 'Thực đơn có các lựa chọn chay.' },
      { en: 'appetizer', type: '(n)', vi: 'món khai vị', ipa: '/ˈæpɪtaɪzər/', example: 'We ordered soup as an appetizer.', viExample: 'Chúng tôi gọi súp làm món khai vị.' },
      { en: 'main course', type: '(n)', vi: 'món chính', ipa: '/meɪn kɔːrs/', example: 'The main course was grilled salmon.', viExample: 'Món chính là cá hồi nướng.' },
      { en: 'dessert', type: '(n)', vi: 'món tráng miệng 🍮', ipa: '/dɪˈzɜːt/', example: 'I had chocolate cake for dessert.', viExample: 'Tôi ăn bánh sô-cô-la tráng miệng.' },
      { en: 'waiter', type: '(n)', vi: 'bồi bàn', ipa: '/ˈweɪtər/', example: 'The waiter took our order.', viExample: 'Bồi bàn ghi nhận đơn gọi món.' },
      { en: 'reservation', type: '(n)', vi: 'đặt bàn trước', ipa: '/ˌrezəˈveɪʃn/', example: 'I made a reservation for 7 PM.', viExample: 'Tôi đặt bàn lúc 7 giờ tối.' },
      { en: 'takeaway', type: '(n)', vi: 'đồ ăn mang về 📦', ipa: '/ˈteɪkəweɪ/', example: 'We ordered a takeaway for dinner.', viExample: 'Chúng tôi đặt đồ ăn mang về cho bữa tối.' },
      { en: 'cuisine', type: '(n)', vi: 'ẩm thực (của một quốc gia)', ipa: '/kwɪˈziːn/', example: 'Vietnamese cuisine is world-famous.', viExample: 'Ẩm thực Việt Nam nổi tiếng thế giới.' },
      { en: 'portion', type: '(n)', vi: 'khẩu phần', ipa: '/ˈpɔːʃn/', example: 'The portion size was too large.', viExample: 'Khẩu phần quá to.' },
      { en: 'bill', type: '(n)', vi: 'hóa đơn (nhà hàng)', ipa: '/bɪl/', example: 'Can I have the bill, please?', viExample: 'Cho tôi xin hóa đơn?' },
      // DIET & NUTRITION
      { en: 'diet', type: '(n)', vi: 'chế độ ăn uống', ipa: '/ˈdaɪɪt/', example: 'A balanced diet improves health.', viExample: 'Chế độ ăn cân bằng cải thiện sức khỏe.' },
      { en: 'balanced diet', type: '(n)', vi: 'chế độ ăn cân bằng', ipa: '/ˈbælənst ˈdaɪɪt/', example: 'A balanced diet includes all food groups.', viExample: 'Chế độ ăn cân bằng bao gồm tất cả nhóm thực phẩm.' },
      { en: 'vegetarian', type: '(adj/n)', vi: 'ăn chay / người ăn chay 🥗', ipa: '/ˌvedʒɪˈteəriən/', example: 'She is a vegetarian.', viExample: 'Cô ấy là người ăn chay.' },
      { en: 'vegan', type: '(adj/n)', vi: 'thuần chay (không dùng sản phẩm động vật)', ipa: '/ˈviːɡən/', example: 'He is a vegan — no meat or dairy.', viExample: 'Anh ấy ăn thuần chay — không thịt và sữa.' },
      { en: 'gluten-free', type: '(adj)', vi: 'không chứa gluten', ipa: '/ˈɡluːtən friː/', example: 'Gluten-free bread is available.', viExample: 'Bánh mì không gluten có sẵn.' },
      { en: 'organic', type: '(adj)', vi: 'hữu cơ', ipa: '/ɔːˈɡænɪk/', example: 'Organic food is grown without pesticides.', viExample: 'Thực phẩm hữu cơ được trồng không dùng thuốc trừ sâu.' },
      { en: 'processed food', type: '(n)', vi: 'thực phẩm chế biến sẵn', ipa: '/ˈprəʊsest fuːd/', example: 'Avoid processed food for better health.', viExample: 'Tránh thực phẩm chế biến sẵn để có sức khỏe tốt hơn.' },
      { en: 'junk food', type: '(n)', vi: 'đồ ăn vặt / thức ăn không tốt', ipa: '/dʒʌŋk fuːd/', example: 'Children eat too much junk food.', viExample: 'Trẻ em ăn quá nhiều đồ ăn vặt.' },
      { en: 'fast food', type: '(n)', vi: 'đồ ăn nhanh 🍔', ipa: '/fɑːst fuːd/', example: 'Fast food is convenient but unhealthy.', viExample: 'Đồ ăn nhanh tiện lợi nhưng không tốt cho sức khỏe.' },
      { en: 'food intolerance', type: '(n)', vi: 'không dung nạp thực phẩm', ipa: '/fuːd ɪnˈtɒlərəns/', example: 'She has lactose intolerance.', viExample: 'Cô ấy không dung nạp lactose.' },
      { en: 'antioxidant', type: '(n)', vi: 'chất chống oxy hóa', ipa: '/ˌæntiˈɒksɪdənt/', example: 'Berries are rich in antioxidants.', viExample: 'Quả mọng giàu chất chống oxy hóa.' },
      { en: 'portion control', type: '(n)', vi: 'kiểm soát khẩu phần ăn', ipa: '/ˈpɔːʃn kənˈtrəʊl/', example: 'Portion control helps maintain weight.', viExample: 'Kiểm soát khẩu phần giúp duy trì cân nặng.' },
      { en: 'fermented food', type: '(n)', vi: 'thực phẩm lên men', ipa: '/fəˈmentɪd fuːd/', example: 'Fermented foods like kimchi are probiotic.', viExample: 'Thực phẩm lên men như kim chi có probiotic.' },
      { en: 'food allergy', type: '(n)', vi: 'dị ứng thực phẩm', ipa: '/fuːd ˈælərʒi/', example: 'Peanut food allergy can be life-threatening.', viExample: 'Dị ứng đậu phộng có thể nguy hiểm đến tính mạng.' },
      { en: 'preservative', type: '(n)', vi: 'chất bảo quản', ipa: '/prɪˈzɜːvətɪv/', example: 'Avoid foods with artificial preservatives.', viExample: 'Tránh thực phẩm có chất bảo quản nhân tạo.' },
      { en: 'superfood', type: '(n)', vi: 'siêu thực phẩm', ipa: '/ˈsuːpərfuːd/', example: 'Chia seeds are considered a superfood.', viExample: 'Hạt chia được coi là siêu thực phẩm.' },
      { en: 'intermittent fasting', type: '(n)', vi: 'nhịn ăn gián đoạn', ipa: '/ˌɪntəˈmɪtənt ˈfɑːstɪŋ/', example: 'Intermittent fasting is a popular diet trend.', viExample: 'Nhịn ăn gián đoạn là xu hướng ăn kiêng phổ biến.' },
      { en: 'plant-based diet', type: '(n)', vi: 'chế độ ăn dựa trên thực vật', ipa: '/plɑːnt beɪst ˈdaɪɪt/', example: 'A plant-based diet benefits health and environment.', viExample: 'Chế độ ăn thực vật có lợi cho sức khỏe và môi trường.' },
      { en: 'food security', type: '(n)', vi: 'an ninh lương thực', ipa: '/fuːd sɪˈkjʊərɪti/', example: 'Food security is a global challenge.', viExample: 'An ninh lương thực là thách thức toàn cầu.' },
      { en: 'malnutrition', type: '(n)', vi: 'suy dinh dưỡng', ipa: '/ˌmælnjuːˈtrɪʃn/', example: 'Malnutrition affects children\'s development.', viExample: 'Suy dinh dưỡng ảnh hưởng đến sự phát triển của trẻ em.' },
      { en: 'microbiome', type: '(n)', vi: 'vi sinh vật đường ruột', ipa: '/ˈmaɪkrəʊbaɪəʊm/', example: 'A healthy gut microbiome improves immunity.', viExample: 'Vi sinh vật đường ruột khỏe mạnh cải thiện miễn dịch.' },
      { en: 'hydration', type: '(n)', vi: 'bổ sung nước cho cơ thể', ipa: '/haɪˈdreɪʃn/', example: 'Proper hydration is essential for performance.', viExample: 'Bổ sung nước đúng cách thiết yếu cho hiệu suất.' },
      { en: 'sustainable food', type: '(n)', vi: 'thực phẩm bền vững', ipa: '/səˈsteɪnəbl fuːd/', example: 'Sustainable food production protects the planet.', viExample: 'Sản xuất thực phẩm bền vững bảo vệ hành tinh.' },
      { en: 'food waste', type: '(n)', vi: 'lãng phí thực phẩm', ipa: '/fuːd weɪst/', example: 'One-third of global food is wasted.', viExample: 'Một phần ba thực phẩm toàn cầu bị lãng phí.' },
      { en: 'culinary', type: '(adj)', vi: 'liên quan đến nấu ăn/ẩm thực', ipa: '/ˈkʌlɪnəri/', example: 'She has excellent culinary skills.', viExample: 'Cô ấy có kỹ năng ẩm thực xuất sắc.' },
      { en: 'gastronomy', type: '(n)', vi: 'nghệ thuật ẩm thực / thưởng thức ăn uống', ipa: '/ɡæˈstrɒnəmi/', example: 'French gastronomy is world-renowned.', viExample: 'Nghệ thuật ẩm thực Pháp nổi tiếng thế giới.' },
      { en: 'food chain', type: '(n)', vi: 'chuỗi thực phẩm (sản xuất → tiêu dùng)', ipa: '/fuːd tʃeɪn/', example: 'The food chain involves many steps from farm to table.', viExample: 'Chuỗi thực phẩm bao gồm nhiều bước từ nông trại đến bàn ăn.' },
    ],
    storyEn: `🍎 BENNY'S COOKING ADVENTURE 🐰🍳

Benny loved food — from simple vegetarian meals to gourmet cuisine. Every weekend, he planned his balanced diet for the coming week: plenty of vegetables, lean protein, healthy fats, and high-fiber whole grains.

Saturday was his cooking day. He bought fresh, organic ingredients from the market — no processed food or preservatives. Today's recipe: steamed fish with grilled vegetables and a side of fermented kimchi (rich in antioxidants!).

He chopped the vegetables, marinated the fish, then simmered a light broth. "The secret is in the seasoning," he said wisely.

That evening, his friends came for dinner. As a dedicated vegetarian, Luna only ate the plant-based dishes. They discussed food security, food waste, and sustainable food production over dessert.

"Food is medicine," Benny concluded. "A balanced diet, proper hydration, and portion control — that's the recipe for a happy life!" 🥕`,
    storyVi: `🍎 CUỘC PHIÊU LƯU NẤU ĂN CỦA BENNY 🐰🍳

Benny yêu thức ăn — từ bữa ăn Chay (Vegetarian) đơn giản đến Ẩm thực (Cuisine) sang trọng. Mỗi cuối tuần, anh lên kế hoạch Chế độ ăn cân bằng (Balanced diet): nhiều Rau củ (Vegetables), Protein nạc (Lean protein), Chất béo lành mạnh (Healthy fats) và Chất xơ (Fiber).

Thứ Bảy là ngày nấu ăn. Anh mua Nguyên liệu (Ingredients) Hữu cơ (Organic) tươi — không Thực phẩm chế biến sẵn (Processed food). Công thức (Recipe) hôm nay: cá Hấp (Steamed) với rau Nướng (Grilled) và kim chi Lên men (Fermented) (giàu Chất chống oxy hóa (Antioxidants)!).

Anh Băm (Chopped) rau, Ướp (Marinated) cá, rồi Đun nhỏ lửa (Simmered) nước dùng nhẹ. "Bí quyết nằm ở Gia vị nêm nếm (Seasoning)," anh nói khôn ngoan.

Buổi tối bạn bè đến ăn tối. Là người ăn Thuần chay (Vegan) tận tụy, Luna chỉ ăn các món dựa trên thực vật (Plant-based). Họ thảo luận về An ninh lương thực (Food security) và Lãng phí thực phẩm (Food waste) trong bữa tráng miệng (Dessert).

"Thức ăn là thuốc," Benny kết luận. "Chế độ ăn cân bằng, Bổ sung nước (Hydration) và Kiểm soát khẩu phần (Portion control) — đó là công thức cho cuộc sống hạnh phúc!" 🥕`
  },

  // ============================================================
  // 6. ⚖️ XÃ HỘI, PHÁP LUẬT & QUYỀN CON NGƯỜI — 100 từ
  // Level: B2-C1 | Target: IELTS Band 6-8, VSTEP C1
  // ============================================================
  {
    id: 'society-law-rights',
    title: '⚖️ Xã Hội, Pháp Luật & Quyền Con Người',
    description: 'Từ vựng cốt lõi về xã hội và pháp luật — chủ đề quan trọng nhất trong IELTS Writing Task 2. Đủ để viết luận Band 7+ về crime, justice, equality.',
    level: 'B2-C1',
    examTags: ['IELTS Band 7+', 'VSTEP C1', 'Academic'],
    words: [
      // BASICS
      { en: 'society', type: '(n)', vi: 'xã hội', ipa: '/səˈsaɪɪti/', example: 'A fair society provides opportunities for all.', viExample: 'Xã hội công bằng tạo cơ hội cho tất cả.' },
      { en: 'community', type: '(n)', vi: 'cộng đồng', ipa: '/kəˈmjuːnɪti/', example: 'The local community organized a clean-up.', viExample: 'Cộng đồng địa phương tổ chức dọn dẹp.' },
      { en: 'citizen', type: '(n)', vi: 'công dân', ipa: '/ˈsɪtɪzn/', example: 'Every citizen has rights and responsibilities.', viExample: 'Mỗi công dân có quyền và trách nhiệm.' },
      { en: 'government', type: '(n)', vi: 'chính phủ', ipa: '/ˈɡʌvənmənt/', example: 'The government introduced new laws.', viExample: 'Chính phủ ban hành luật mới.' },
      { en: 'democracy', type: '(n)', vi: 'dân chủ', ipa: '/dɪˈmɒkrəsi/', example: 'Democracy gives citizens a voice.', viExample: 'Dân chủ trao tiếng nói cho công dân.' },
      { en: 'election', type: '(n)', vi: 'bầu cử', ipa: '/ɪˈlekʃn/', example: 'The election results surprised everyone.', viExample: 'Kết quả bầu cử làm mọi người ngạc nhiên.' },
      { en: 'policy', type: '(n)', vi: 'chính sách', ipa: '/ˈpɒlɪsi/', example: 'The education policy changed this year.', viExample: 'Chính sách giáo dục thay đổi năm nay.' },
      { en: 'law', type: '(n)', vi: 'luật pháp', ipa: '/lɔː/', example: 'Everyone is equal before the law.', viExample: 'Mọi người bình đẳng trước pháp luật.' },
      { en: 'justice', type: '(n)', vi: 'công lý', ipa: '/ˈdʒʌstɪs/', example: 'She fought for justice for 20 years.', viExample: 'Cô ấy đấu tranh vì công lý trong 20 năm.' },
      { en: 'rights', type: '(n)', vi: 'quyền', ipa: '/raɪts/', example: 'Human rights must be protected.', viExample: 'Quyền con người phải được bảo vệ.' },
      // CRIME & LAW
      { en: 'crime', type: '(n)', vi: 'tội phạm', ipa: '/kraɪm/', example: 'Poverty often leads to crime.', viExample: 'Nghèo đói thường dẫn đến tội phạm.' },
      { en: 'criminal', type: '(n/adj)', vi: 'tội phạm (người/liên quan đến tội)', ipa: '/ˈkrɪmɪnl/', example: 'The criminal was sentenced to prison.', viExample: 'Tên tội phạm bị kết án tù giam.' },
      { en: 'victim', type: '(n)', vi: 'nạn nhân', ipa: '/ˈvɪktɪm/', example: 'The victim reported the crime to police.', viExample: 'Nạn nhân báo cáo tội phạm với cảnh sát.' },
      { en: 'suspect', type: '(n)', vi: 'nghi phạm', ipa: '/ˈsʌspekt/', example: 'Police arrested three suspects.', viExample: 'Cảnh sát bắt giữ ba nghi phạm.' },
      { en: 'verdict', type: '(n)', vi: 'phán quyết', ipa: '/ˈvɜːdɪkt/', example: 'The jury reached a guilty verdict.', viExample: 'Bồi thẩm đoàn đưa ra phán quyết có tội.' },
      { en: 'sentence', type: '(n/v)', vi: 'bản án / tuyên án', ipa: '/ˈsentəns/', example: 'He received a 10-year prison sentence.', viExample: 'Anh ta nhận bản án 10 năm tù.' },
      { en: 'defendant', type: '(n)', vi: 'bị cáo', ipa: '/dɪˈfendənt/', example: 'The defendant pleaded not guilty.', viExample: 'Bị cáo kêu oan không có tội.' },
      { en: 'prosecutor', type: '(n)', vi: 'công tố viên', ipa: '/ˈprɒsɪkjuːtər/', example: 'The prosecutor presented strong evidence.', viExample: 'Công tố viên trình bày bằng chứng mạnh.' },
      { en: 'attorney', type: '(n)', vi: 'luật sư (Mỹ)', ipa: '/əˈtɜːni/', example: 'She hired a defense attorney.', viExample: 'Cô ấy thuê luật sư bào chữa.' },
      { en: 'bail', type: '(n)', vi: 'tiền tại ngoại', ipa: '/beɪl/', example: 'He was released on bail.', viExample: 'Anh ta được thả tại ngoại sau khi đóng tiền.' },
      { en: 'parole', type: '(n)', vi: 'ân xá có điều kiện', ipa: '/pəˈrəʊl/', example: 'She was released on parole after 5 years.', viExample: 'Cô ấy được thả tự do có điều kiện sau 5 năm.' },
      { en: 'judiciary', type: '(n)', vi: 'ngành tư pháp', ipa: '/dʒuːˈdɪʃiari/', example: 'An independent judiciary is vital.', viExample: 'Ngành tư pháp độc lập rất quan trọng.' },
      { en: 'legislation', type: '(n)', vi: 'luật pháp / lập pháp', ipa: '/ˌledʒɪˈsleɪʃn/', example: 'New legislation protects workers\' rights.', viExample: 'Luật pháp mới bảo vệ quyền lợi người lao động.' },
      { en: 'constitution', type: '(n)', vi: 'hiến pháp', ipa: '/ˌkɒnstɪˈtjuːʃn/', example: 'The constitution guarantees freedom of speech.', viExample: 'Hiến pháp đảm bảo quyền tự do ngôn luận.' },
      { en: 'amendment', type: '(n)', vi: 'tu chính án / sửa đổi luật', ipa: '/əˈmendmənt/', example: 'The constitution needs an amendment.', viExample: 'Hiến pháp cần một tu chính án.' },
      // SOCIAL ISSUES
      { en: 'inequality', type: '(n)', vi: 'bất bình đẳng', ipa: '/ˌɪnɪˈkwɒlɪti/', example: 'Income inequality is a global problem.', viExample: 'Bất bình đẳng thu nhập là vấn đề toàn cầu.' },
      { en: 'discrimination', type: '(n)', vi: 'phân biệt đối xử', ipa: '/dɪˌskrɪmɪˈneɪʃn/', example: 'Racial discrimination must be eliminated.', viExample: 'Phân biệt chủng tộc phải được xóa bỏ.' },
      { en: 'prejudice', type: '(n)', vi: 'định kiến', ipa: '/ˈpredʒʊdɪs/', example: 'Prejudice leads to unfair treatment.', viExample: 'Định kiến dẫn đến đối xử không công bằng.' },
      { en: 'stereotype', type: '(n)', vi: 'khuôn mẫu định sẵn', ipa: '/ˈsteriəʊtaɪp/', example: 'Don\'t judge people based on stereotypes.', viExample: 'Đừng phán xét người khác dựa trên khuôn mẫu.' },
      { en: 'poverty', type: '(n)', vi: 'nghèo đói', ipa: '/ˈpɒvəti/', example: 'Poverty traps people in difficult cycles.', viExample: 'Nghèo đói giữ người ta trong vòng lặp khó khăn.' },
      { en: 'homelessness', type: '(n)', vi: 'vô gia cư', ipa: '/ˈhəʊmləsnəs/', example: 'Homelessness is rising in major cities.', viExample: 'Vô gia cư đang tăng ở các thành phố lớn.' },
      { en: 'unemployment', type: '(n)', vi: 'thất nghiệp', ipa: '/ˌʌnɪmˈplɔɪmənt/', example: 'High unemployment affects social stability.', viExample: 'Thất nghiệp cao ảnh hưởng đến ổn định xã hội.' },
      { en: 'social welfare', type: '(n)', vi: 'phúc lợi xã hội', ipa: '/ˈsəʊʃl ˈwelfeər/', example: 'Social welfare programs support vulnerable citizens.', viExample: 'Chương trình phúc lợi xã hội hỗ trợ người dân dễ bị tổn thương.' },
      { en: 'corruption', type: '(n)', vi: 'tham nhũng', ipa: '/kəˈrʌpʃn/', example: 'Corruption undermines public trust.', viExample: 'Tham nhũng làm suy yếu niềm tin của công chúng.' },
      { en: 'bribery', type: '(n)', vi: 'hối lộ', ipa: '/ˈbraɪbəri/', example: 'Bribery is illegal and unethical.', viExample: 'Hối lộ là bất hợp pháp và vô đạo đức.' },
      // HUMAN RIGHTS
      { en: 'human rights', type: '(n)', vi: 'quyền con người', ipa: '/ˈhjuːmən raɪts/', example: 'The UN protects human rights globally.', viExample: 'LHQ bảo vệ quyền con người trên toàn cầu.' },
      { en: 'freedom of speech', type: '(n)', vi: 'tự do ngôn luận', ipa: '/ˈfriːdəm əv spiːtʃ/', example: 'Freedom of speech is a fundamental right.', viExample: 'Tự do ngôn luận là quyền cơ bản.' },
      { en: 'gender equality', type: '(n)', vi: 'bình đẳng giới', ipa: '/ˈdʒendər ɪˈkwɒlɪti/', example: 'Gender equality benefits all of society.', viExample: 'Bình đẳng giới có lợi cho toàn xã hội.' },
      { en: 'refugee', type: '(n)', vi: 'người tị nạn', ipa: '/ˌrefjuˈdʒiː/', example: 'Refugees need protection and shelter.', viExample: 'Người tị nạn cần được bảo vệ và nơi ở.' },
      { en: 'asylum seeker', type: '(n)', vi: 'người xin tị nạn chính trị', ipa: '/əˈsaɪləm ˌsiːkər/', example: 'Asylum seekers flee dangerous countries.', viExample: 'Người xin tị nạn bỏ trốn khỏi các quốc gia nguy hiểm.' },
      { en: 'immigration', type: '(n)', vi: 'di dân / nhập cư', ipa: '/ˌɪmɪˈɡreɪʃn/', example: 'Immigration enriches cultural diversity.', viExample: 'Di dân làm phong phú đa dạng văn hóa.' },
      { en: 'deportation', type: '(n)', vi: 'trục xuất', ipa: '/ˌdiːpɔːˈteɪʃn/', example: 'Illegal immigrants face deportation.', viExample: 'Người nhập cư bất hợp pháp đối mặt với trục xuất.' },
      { en: 'racial equality', type: '(n)', vi: 'bình đẳng chủng tộc', ipa: '/ˈreɪʃl ɪˈkwɒlɪti/', example: 'Racial equality requires systemic change.', viExample: 'Bình đẳng chủng tộc đòi hỏi thay đổi hệ thống.' },
      { en: 'social justice', type: '(n)', vi: 'công bằng xã hội', ipa: '/ˈsəʊʃl ˈdʒʌstɪs/', example: 'Social justice activists fight for equality.', viExample: 'Nhà hoạt động công bằng xã hội đấu tranh vì bình đẳng.' },
      { en: 'whistleblower', type: '(n)', vi: 'người tố cáo (vi phạm nội bộ)', ipa: '/ˈwɪslbləʊər/', example: 'Whistleblowers expose government corruption.', viExample: 'Người tố cáo vạch trần tham nhũng chính phủ.' },
      { en: 'accountability', type: '(n)', vi: 'trách nhiệm giải trình', ipa: '/əˌkaʊntəˈbɪlɪti/', example: 'Leaders must be held accountable.', viExample: 'Lãnh đạo phải chịu trách nhiệm.' },
      { en: 'transparency', type: '(n)', vi: 'minh bạch', ipa: '/trænsˈpærənsi/', example: 'Government transparency builds public trust.', viExample: 'Chính phủ minh bạch xây dựng niềm tin công chúng.' },
      { en: 'civil rights movement', type: '(n)', vi: 'phong trào quyền dân sự', ipa: '/ˈsɪvl raɪts ˈmuːvmənt/', example: 'Martin Luther King led the civil rights movement.', viExample: 'Martin Luther King lãnh đạo phong trào quyền dân sự.' },
      { en: 'affirmative action', type: '(n)', vi: 'hành động khẳng định (ưu đãi thiểu số)', ipa: '/əˌfɜːmətɪv ˈækʃn/', example: 'Affirmative action increases diversity in universities.', viExample: 'Hành động khẳng định tăng tính đa dạng ở đại học.' },
      { en: 'due process', type: '(n)', vi: 'quy trình pháp lý đúng đắn', ipa: '/djuː ˈprəʊses/', example: 'Everyone deserves due process.', viExample: 'Mọi người đều xứng đáng được quy trình pháp lý đúng đắn.' },
      { en: 'trial', type: '(n)', vi: 'phiên tòa xét xử', ipa: '/ˈtraɪəl/', example: 'The trial lasted three weeks.', viExample: 'Phiên tòa kéo dài ba tuần.' },
      { en: 'civil liberties', type: '(n)', vi: 'các quyền tự do dân sự', ipa: '/ˈsɪvl ˈlɪbətiz/', example: 'Civil liberties include freedom of assembly.', viExample: 'Quyền tự do dân sự bao gồm quyền hội họp.' },
      { en: 'disenfranchise', type: '(v)', vi: 'tước quyền bầu cử', ipa: '/ˌdɪsɪnˈfræntʃaɪz/', example: 'Many minorities were historically disenfranchised.', viExample: 'Nhiều thiểu số bị tước quyền bầu cử trong lịch sử.' },
      { en: 'lobbying', type: '(n)', vi: 'vận động hành lang', ipa: '/ˈlɒbiɪŋ/', example: 'Lobbying influences government decisions.', viExample: 'Vận động hành lang ảnh hưởng đến quyết định chính phủ.' },
    ],
    storyEn: `⚖️ BENNY'S FIGHT FOR JUSTICE 🐰

Benny the Bunny was a passionate citizen who believed in democracy and social justice. He lived in a society with growing inequality — poverty was rising, unemployment was high, and corruption was widespread.

When his neighbor, a refugee named Lily, faced unjust deportation despite having followed due process, Benny took action. He hired an attorney, gathered evidence, and attended the trial as a witness.

The verdict: Lily was innocent. The prosecutor's evidence lacked transparency. The case exposed government corruption and became a landmark in the movement for civil rights.

"Every citizen has rights," said Benny. "Freedom of speech, gender equality, racial equality — these are not privileges. They are fundamental human rights." He founded a community organization to fight discrimination, prejudice, and stereotypes.

Years later, new legislation was passed. Social welfare programs were strengthened. Accountability and transparency became cornerstones of the government.

"Justice is not just a word," Benny declared. "It is a responsibility we all share." 🏛️`,
    storyVi: `⚖️ BENNY ĐẤU TRANH VÌ CÔNG LÝ 🐰

Benny Thỏ là một Công dân (Citizen) nhiệt huyết tin vào Dân chủ (Democracy) và Công bằng xã hội (Social justice). Anh sống trong một Xã hội (Society) với Bất bình đẳng (Inequality) ngày càng tăng — Nghèo đói (Poverty) tăng, Thất nghiệp (Unemployment) cao và Tham nhũng (Corruption) tràn lan.

Khi người hàng xóm, một Người tị nạn (Refugee) tên Lily, đối mặt với Trục xuất (Deportation) bất công dù đã tuân thủ Quy trình pháp lý (Due process), Benny hành động. Anh thuê Luật sư (Attorney), thu thập bằng chứng và tham gia Phiên tòa (Trial) với tư cách nhân chứng.

Phán quyết (Verdict): Lily vô tội. Bằng chứng của Công tố viên (Prosecutor) thiếu Minh bạch (Transparency). Vụ án vạch trần Tham nhũng (Corruption) chính phủ.

"Mỗi Công dân (Citizen) có Quyền (Rights)," Benny nói. "Tự do ngôn luận (Freedom of speech), Bình đẳng giới (Gender equality), Bình đẳng chủng tộc (Racial equality) — đây là Quyền con người (Human rights) cơ bản." 🏛️`
  },

  // ============================================================
  // 7. 🌍 TOÀN CẦU HÓA & VĂN HÓA — 100 từ  
  // Level: B2-C1 | Target: IELTS Band 7+, VSTEP C1
  // ============================================================
  {
    id: 'globalization-culture',
    title: '🌍 Toàn Cầu Hóa & Văn Hóa',
    description: 'Từ vựng về toàn cầu hóa, giao thoa văn hóa và quan hệ quốc tế — chủ đề hot nhất trong IELTS Writing Task 2. Đủ để viết Band 7-8 về culture và globalization.',
    level: 'B2-C1',
    examTags: ['IELTS Band 7+', 'VSTEP C1', 'Academic'],
    words: [
      { en: 'globalization', type: '(n)', vi: 'toàn cầu hóa', ipa: '/ˌɡləʊbəlaɪˈzeɪʃn/', example: 'Globalization connects people worldwide.', viExample: 'Toàn cầu hóa kết nối mọi người trên thế giới.' },
      { en: 'culture', type: '(n)', vi: 'văn hóa', ipa: '/ˈkʌltʃər/', example: 'Each country has a unique culture.', viExample: 'Mỗi quốc gia có văn hóa độc đáo riêng.' },
      { en: 'multiculturalism', type: '(n)', vi: 'đa văn hóa', ipa: '/ˌmʌltiˈkʌltʃərəlɪzəm/', example: 'Multiculturalism enriches society.', viExample: 'Đa văn hóa làm phong phú thêm xã hội.' },
      { en: 'cultural exchange', type: '(n)', vi: 'giao lưu văn hóa', ipa: '/ˈkʌltʃərəl ɪksˈtʃeɪndʒ/', example: 'Cultural exchange promotes understanding.', viExample: 'Giao lưu văn hóa thúc đẩy sự hiểu biết.' },
      { en: 'tradition', type: '(n)', vi: 'truyền thống', ipa: '/trəˈdɪʃn/', example: 'Many traditions are passed down through generations.', viExample: 'Nhiều truyền thống được truyền qua các thế hệ.' },
      { en: 'indigenous', type: '(adj)', vi: 'bản địa', ipa: '/ɪnˈdɪdʒɪnəs/', example: 'Indigenous cultures must be preserved.', viExample: 'Văn hóa bản địa phải được bảo tồn.' },
      { en: 'dialect', type: '(n)', vi: 'phương ngữ', ipa: '/ˈdaɪəlekt/', example: 'Vietnam has many regional dialects.', viExample: 'Việt Nam có nhiều phương ngữ vùng miền.' },
      { en: 'bilingual', type: '(adj)', vi: 'song ngữ', ipa: '/baɪˈlɪŋɡwəl/', example: 'Being bilingual is a great advantage.', viExample: 'Song ngữ là lợi thế lớn.' },
      { en: 'lingua franca', type: '(n)', vi: 'ngôn ngữ chung (giao tiếp quốc tế)', ipa: '/ˌlɪŋɡwə ˈfræŋkə/', example: 'English is the global lingua franca.', viExample: 'Tiếng Anh là ngôn ngữ giao tiếp quốc tế.' },
      { en: 'translation', type: '(n)', vi: 'dịch thuật', ipa: '/trænsˈleɪʃn/', example: 'Accurate translation requires cultural knowledge.', viExample: 'Dịch thuật chính xác đòi hỏi kiến thức văn hóa.' },
      { en: 'assimilation', type: '(n)', vi: 'đồng hóa văn hóa', ipa: '/əˌsɪmɪˈleɪʃn/', example: 'Immigrants may face pressure to assimilate.', viExample: 'Người nhập cư có thể bị áp lực đồng hóa.' },
      { en: 'cultural identity', type: '(n)', vi: 'bản sắc văn hóa', ipa: '/ˈkʌltʃərəl aɪˈdentɪti/', example: 'Protecting cultural identity is important.', viExample: 'Bảo vệ bản sắc văn hóa rất quan trọng.' },
      { en: 'westernization', type: '(n)', vi: 'Tây hóa', ipa: '/ˌwestənaɪˈzeɪʃn/', example: 'Westernization affects traditional values.', viExample: 'Tây hóa ảnh hưởng đến các giá trị truyền thống.' },
      { en: 'cultural imperialism', type: '(n)', vi: 'chủ nghĩa đế quốc văn hóa', ipa: '/ˈkʌltʃərəl ɪmˈpɪəriəlɪzəm/', example: 'Some argue Hollywood promotes cultural imperialism.', viExample: 'Một số cho rằng Hollywood thúc đẩy chủ nghĩa đế quốc văn hóa.' },
      { en: 'soft power', type: '(n)', vi: 'quyền lực mềm', ipa: '/sɒft ˈpaʊər/', example: 'K-pop is South Korea\'s soft power.', viExample: 'K-pop là quyền lực mềm của Hàn Quốc.' },
      { en: 'diaspora', type: '(n)', vi: 'cộng đồng người sống xa quê hương', ipa: '/daɪˈæspərə/', example: 'The Vietnamese diaspora is large worldwide.', viExample: 'Cộng đồng người Việt hải ngoại rất đông.' },
      { en: 'free trade', type: '(n)', vi: 'thương mại tự do', ipa: '/friː treɪd/', example: 'Free trade agreements boost economic growth.', viExample: 'Hiệp định thương mại tự do thúc đẩy tăng trưởng kinh tế.' },
      { en: 'trade war', type: '(n)', vi: 'chiến tranh thương mại', ipa: '/treɪd wɔːr/', example: 'The US-China trade war affected global markets.', viExample: 'Chiến tranh thương mại Mỹ-Trung ảnh hưởng thị trường toàn cầu.' },
      { en: 'multinational', type: '(adj/n)', vi: 'đa quốc gia', ipa: '/ˌmʌltiˈnæʃnl/', example: 'Multinational companies operate across borders.', viExample: 'Công ty đa quốc gia hoạt động xuyên biên giới.' },
      { en: 'outsourcing', type: '(n)', vi: 'thuê ngoài (sang nước khác)', ipa: '/ˈaʊtsɔːsɪŋ/', example: 'Companies outsource manufacturing to reduce costs.', viExample: 'Các công ty thuê ngoài sản xuất để giảm chi phí.' },
      { en: 'diplomatic', type: '(adj)', vi: 'ngoại giao', ipa: '/ˌdɪpləˈmætɪk/', example: 'Diplomatic relations were restored.', viExample: 'Quan hệ ngoại giao được khôi phục.' },
      { en: 'sanction', type: '(n)', vi: 'lệnh trừng phạt', ipa: '/ˈsæŋkʃn/', example: 'Economic sanctions were imposed.', viExample: 'Các lệnh trừng phạt kinh tế được áp đặt.' },
      { en: 'summit', type: '(n)', vi: 'hội nghị thượng đỉnh', ipa: '/ˈsʌmɪt/', example: 'World leaders met at the G20 summit.', viExample: 'Lãnh đạo thế giới gặp mặt tại hội nghị G20.' },
      { en: 'international aid', type: '(n)', vi: 'viện trợ quốc tế', ipa: '/ˌɪntəˈnæʃnl eɪd/', example: 'International aid helped rebuild after the earthquake.', viExample: 'Viện trợ quốc tế giúp tái thiết sau động đất.' },
      { en: 'NGO', type: '(n)', vi: 'tổ chức phi chính phủ', ipa: '/ˌen dʒiː ˈəʊ/', example: 'NGOs provide humanitarian assistance.', viExample: 'Tổ chức phi chính phủ cung cấp hỗ trợ nhân đạo.' },
      { en: 'sovereignty', type: '(n)', vi: 'chủ quyền', ipa: '/ˈsɒvrənti/', example: 'Nations must respect each other\'s sovereignty.', viExample: 'Các quốc gia phải tôn trọng chủ quyền của nhau.' },
      { en: 'geopolitics', type: '(n)', vi: 'địa chính trị', ipa: '/ˌdʒiːəʊˈpɒlɪtɪks/', example: 'Geopolitics shapes international relations.', viExample: 'Địa chính trị định hình quan hệ quốc tế.' },
      { en: 'bilateral', type: '(adj)', vi: 'song phương', ipa: '/baɪˈlætərəl/', example: 'The bilateral trade deal was signed.', viExample: 'Hiệp định thương mại song phương được ký kết.' },
      { en: 'multilateral', type: '(adj)', vi: 'đa phương', ipa: '/ˌmʌltiˈlætərəl/', example: 'Climate change requires multilateral cooperation.', viExample: 'Biến đổi khí hậu đòi hỏi hợp tác đa phương.' },
      { en: 'supranational', type: '(adj)', vi: 'siêu quốc gia', ipa: '/ˌsuːprəˈnæʃnl/', example: 'The EU is a supranational organization.', viExample: 'EU là tổ chức siêu quốc gia.' },
      { en: 'cultural relativism', type: '(n)', vi: 'chủ nghĩa tương đối văn hóa', ipa: '/ˈkʌltʃərəl ˈrelɪvɪzəm/', example: 'Cultural relativism argues each culture must be judged on its own terms.', viExample: 'Chủ nghĩa tương đối cho rằng mỗi văn hóa phải được đánh giá theo tiêu chí của nó.' },
      { en: 'homogenization', type: '(n)', vi: 'đồng nhất hóa (mất bản sắc riêng)', ipa: '/həˌmɒdʒɪnaɪˈzeɪʃn/', example: 'Globalization leads to cultural homogenization.', viExample: 'Toàn cầu hóa dẫn đến đồng nhất hóa văn hóa.' },
      { en: 'intercultural communication', type: '(n)', vi: 'giao tiếp liên văn hóa', ipa: '/ˌɪntəˈkʌltʃərəl kəˌmjuːnɪˈkeɪʃn/', example: 'Intercultural communication skills are vital in business.', viExample: 'Kỹ năng giao tiếp liên văn hóa thiết yếu trong kinh doanh.' },
      { en: 'ethnocentrism', type: '(n)', vi: 'chủ nghĩa tộc người / cho văn hóa mình là trung tâm', ipa: '/ˌeθnəʊˈsentrɪzəm/', example: 'Ethnocentrism creates cultural misunderstanding.', viExample: 'Chủ nghĩa tộc người gây hiểu lầm văn hóa.' },
      { en: 'xenophobia', type: '(n)', vi: 'bài ngoại / sợ người nước ngoài', ipa: '/ˌzenəˈfəʊbiə/', example: 'Xenophobia divides communities.', viExample: 'Tâm lý bài ngoại chia rẽ cộng đồng.' },
      { en: 'cosmopolitan', type: '(adj)', vi: 'quốc tế / đa sắc tộc', ipa: '/ˌkɒzməˈpɒlɪtən/', example: 'Singapore is a cosmopolitan city.', viExample: 'Singapore là thành phố mang tính quốc tế.' },
      { en: 'transnational', type: '(adj)', vi: 'xuyên quốc gia', ipa: '/trænzˈnæʃnl/', example: 'Terrorism is a transnational threat.', viExample: 'Khủng bố là mối đe dọa xuyên quốc gia.' },
      { en: 'cultural heritage', type: '(n)', vi: 'di sản văn hóa', ipa: '/ˈkʌltʃərəl ˈherɪtɪdʒ/', example: 'UNESCO protects world cultural heritage.', viExample: 'UNESCO bảo vệ di sản văn hóa thế giới.' },
      { en: 'economic integration', type: '(n)', vi: 'hội nhập kinh tế', ipa: '/ˌiːkəˈnɒmɪk ˌɪntɪˈɡreɪʃn/', example: 'ASEAN promotes economic integration.', viExample: 'ASEAN thúc đẩy hội nhập kinh tế.' },
      { en: 'brain drain', type: '(n)', vi: 'chảy máu chất xám', ipa: '/breɪn dreɪn/', example: 'Brain drain weakens developing countries.', viExample: 'Chảy máu chất xám làm yếu các nước đang phát triển.' },
      { en: 'digital divide', type: '(n)', vi: 'khoảng cách số (internet)', ipa: '/ˈdɪdʒɪtl dɪˈvaɪd/', example: 'The digital divide increases global inequality.', viExample: 'Khoảng cách số tăng bất bình đẳng toàn cầu.' },
      { en: 'cultural appropriation', type: '(n)', vi: 'chiếm dụng văn hóa', ipa: '/ˈkʌltʃərəl əˌprəʊpriˈeɪʃn/', example: 'Cultural appropriation can harm minority communities.', viExample: 'Chiếm dụng văn hóa có thể gây hại cho cộng đồng thiểu số.' },
      { en: 'reverse culture shock', type: '(n)', vi: 'sốc văn hóa ngược (khi quay về nước)', ipa: '/rɪˈvɜːs ˈkʌltʃər ʃɒk/', example: 'Students returning from abroad experience reverse culture shock.', viExample: 'Sinh viên về nước trải qua sốc văn hóa ngược.' },
      { en: 'global village', type: '(n)', vi: 'ngôi làng toàn cầu', ipa: '/ˈɡləʊbl ˈvɪlɪdʒ/', example: 'The internet has created a global village.', viExample: 'Internet đã tạo ra một ngôi làng toàn cầu.' },
    ],
    storyEn: `🌍 BENNY'S GLOBAL JOURNEY 🐰✈️

Benny the Bunny had always been curious about the world. He lived in the era of globalization — a time when the world felt like a global village connected by technology, trade, and cultural exchange.

One day, he received a scholarship to study abroad in Paris, the cosmopolitan capital of France. There, he discovered multiculturalism: students from 40 countries in one classroom. He learned the importance of intercultural communication and avoided ethnocentrism — judging other cultures by his own standards.

He met indigenous students from Africa who taught him about oral traditions and cultural heritage. He met diaspora communities who struggled with cultural identity — caught between their home culture and westernization.

In international politics class, he studied geopolitics, bilateral agreements, multilateral cooperation, and the effects of free trade. He also learned about brain drain — how talented people leave developing countries — and the digital divide.

"Globalization brings both opportunity and challenge," Benny wrote in his thesis. "We must protect cultural diversity while building bridges of understanding. In a truly global world, cultural imperialism must be replaced with mutual respect."

His dissertation won international recognition. 🌟 The world was truly his global village.`,
    storyVi: `🌍 HÀNH TRÌNH TOÀN CẦU CỦA BENNY 🐰✈️

Benny Thỏ luôn tò mò về thế giới. Anh sống trong kỷ nguyên Toàn cầu hóa (Globalization) — thời đại khi thế giới như một Ngôi làng toàn cầu (Global village) kết nối qua công nghệ, thương mại và Giao lưu văn hóa (Cultural exchange).

Một ngày, anh nhận học bổng Du học (Study abroad) ở Paris, thủ đô Quốc tế (Cosmopolitan) của Pháp. Tại đó, anh khám phá Đa văn hóa (Multiculturalism): sinh viên từ 40 quốc gia trong một lớp học. Anh học tầm quan trọng của Giao tiếp liên văn hóa (Intercultural communication) và tránh Chủ nghĩa tộc người (Ethnocentrism).

Anh gặp các sinh viên Bản địa (Indigenous) từ châu Phi dạy về Di sản văn hóa (Cultural heritage). Anh gặp cộng đồng Người xa quê (Diaspora) vật lộn với Bản sắc văn hóa (Cultural identity) — bị kẹt giữa văn hóa quê hương và Tây hóa (Westernization).

"Toàn cầu hóa mang cả cơ hội lẫn thách thức," Benny viết trong luận văn. "Chúng ta phải bảo vệ đa dạng văn hóa trong khi xây dựng những cây cầu hiểu biết." 🌟`
  }

];

export default vocabMoreData;
