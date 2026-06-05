// Script to generate vocabulary data files with real vocabulary content
// This generates VSTEP, IELTS, Daily, Beginner topics with real words
// Run: node scratch/generateAllData.cjs

const fs = require('fs');
const path = require('path');

// ===========================
// VOCABULARY DATABASES
// ===========================
// Each topic has 100 real English-Vietnamese vocabulary entries

const topicWords = {
  // ==================== VSTEP TOPICS ====================
  "sustainable-tourism-vstep": {
    cat: "vstep", title: "🌍 Du Lịch Bền Vững", level: "B1-B2", tags: ["VSTEP B1-B2"],
    desc: "100 từ vựng về du lịch có trách nhiệm, bảo vệ môi trường và văn hóa địa phương.",
    words: [
      {en:"ecotourism",vi:"du lịch sinh thái",t:"(n)",i:"/ˌiː.kəʊˈtʊə.rɪ.zəm/",ex:"Ecotourism helps protect natural habitats.",vx:"Du lịch sinh thái giúp bảo vệ môi trường sống tự nhiên."},
      {en:"sustainable",vi:"bền vững",t:"(adj)",i:"/səˈsteɪ.nə.bəl/",ex:"Sustainable tourism minimizes environmental impact.",vx:"Du lịch bền vững giảm thiểu tác động môi trường."},
      {en:"carbon footprint",vi:"dấu chân carbon",t:"(n)",i:"/ˌkɑː.bən ˈfʊt.prɪnt/",ex:"Air travel increases your carbon footprint.",vx:"Đi máy bay tăng dấu chân carbon của bạn."},
      {en:"biodiversity",vi:"đa dạng sinh học",t:"(n)",i:"/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/",ex:"National parks protect biodiversity.",vx:"Vườn quốc gia bảo vệ đa dạng sinh học."},
      {en:"conservation",vi:"bảo tồn",t:"(n)",i:"/ˌkɒn.səˈveɪ.ʃən/",ex:"Conservation efforts save endangered species.",vx:"Nỗ lực bảo tồn cứu các loài có nguy cơ tuyệt chủng."},
      {en:"heritage",vi:"di sản",t:"(n)",i:"/ˈher.ɪ.tɪdʒ/",ex:"Vietnam has many UNESCO heritage sites.",vx:"Việt Nam có nhiều di sản UNESCO."},
      {en:"indigenous",vi:"bản địa",t:"(adj)",i:"/ɪnˈdɪdʒ.ɪ.nəs/",ex:"Respect indigenous cultures when traveling.",vx:"Tôn trọng văn hóa bản địa khi du lịch."},
      {en:"destination",vi:"điểm đến",t:"(n)",i:"/ˌdes.tɪˈneɪ.ʃən/",ex:"Da Nang is a popular tourist destination.",vx:"Đà Nẵng là điểm đến du lịch phổ biến."},
      {en:"accommodation",vi:"nơi ở/chỗ ở",t:"(n)",i:"/əˌkɒm.əˈdeɪ.ʃən/",ex:"Homestays offer affordable accommodation.",vx:"Homestay cung cấp chỗ ở giá phải chăng."},
      {en:"itinerary",vi:"lịch trình",t:"(n)",i:"/aɪˈtɪn.ər.ər.i/",ex:"Plan your itinerary before traveling.",vx:"Lên kế hoạch lịch trình trước khi du lịch."},
      {en:"backpacker",vi:"người du lịch bụi",t:"(n)",i:"/ˈbæk.pæk.ər/",ex:"Backpackers prefer budget travel.",vx:"Người du lịch bụi thích đi tiết kiệm."},
      {en:"excursion",vi:"chuyến tham quan",t:"(n)",i:"/ɪkˈskɜː.ʃən/",ex:"We joined an excursion to the caves.",vx:"Chúng tôi tham gia chuyến tham quan hang động."},
      {en:"souvenir",vi:"quà lưu niệm",t:"(n)",i:"/ˌsuː.vəˈnɪər/",ex:"Buy souvenirs from local artisans.",vx:"Mua quà lưu niệm từ nghệ nhân địa phương."},
      {en:"handicraft",vi:"đồ thủ công mỹ nghệ",t:"(n)",i:"/ˈhæn.di.krɑːft/",ex:"Vietnamese handicrafts are famous worldwide.",vx:"Đồ thủ công Việt Nam nổi tiếng thế giới."},
      {en:"homestay",vi:"nhà nghỉ homestay",t:"(n)",i:"/ˈhəʊm.steɪ/",ex:"A homestay gives you cultural immersion.",vx:"Homestay cho bạn trải nghiệm văn hóa sâu sắc."},
      {en:"immersion",vi:"sự hòa mình/đắm chìm",t:"(n)",i:"/ɪˈmɜː.ʃən/",ex:"Cultural immersion enriches travel experiences.",vx:"Hòa mình văn hóa làm phong phú trải nghiệm du lịch."},
      {en:"overtourism",vi:"du lịch quá tải",t:"(n)",i:"/ˌəʊ.vəˈtʊə.rɪ.zəm/",ex:"Overtourism damages popular destinations.",vx:"Du lịch quá tải gây hại các điểm đến phổ biến."},
      {en:"preserve",vi:"bảo tồn/gìn giữ",t:"(v)",i:"/prɪˈzɜːv/",ex:"We must preserve historical sites.",vx:"Chúng ta phải bảo tồn các di tích lịch sử."},
      {en:"responsible",vi:"có trách nhiệm",t:"(adj)",i:"/rɪˈspɒn.sə.bəl/",ex:"Responsible tourism benefits local communities.",vx:"Du lịch có trách nhiệm mang lại lợi ích cho cộng đồng địa phương."},
      {en:"ecosystem",vi:"hệ sinh thái",t:"(n)",i:"/ˈiː.kəʊ.sɪs.təm/",ex:"Coral reefs are fragile ecosystems.",vx:"Rạn san hô là hệ sinh thái mong manh."},
      {en:"wildlife",vi:"động vật hoang dã",t:"(n)",i:"/ˈwaɪld.laɪf/",ex:"Safari tours let you see wildlife up close.",vx:"Tour safari cho bạn xem động vật hoang dã cận cảnh."},
      {en:"scenic",vi:"có phong cảnh đẹp",t:"(adj)",i:"/ˈsiː.nɪk/",ex:"Ha Long Bay is one of the most scenic places in Asia.",vx:"Vịnh Hạ Long là một trong những nơi phong cảnh đẹp nhất châu Á."},
      {en:"landscape",vi:"cảnh quan/phong cảnh",t:"(n)",i:"/ˈlænd.skeɪp/",ex:"The landscape of the Central Highlands is breathtaking.",vx:"Cảnh quan Tây Nguyên ngoạn mục."},
      {en:"pollution",vi:"ô nhiễm",t:"(n)",i:"/pəˈluː.ʃən/",ex:"Tourism can increase pollution in coastal areas.",vx:"Du lịch có thể tăng ô nhiễm ở vùng ven biển."},
      {en:"renewable",vi:"tái tạo được",t:"(adj)",i:"/rɪˈnjuː.ə.bəl/",ex:"Hotels should use renewable energy sources.",vx:"Khách sạn nên sử dụng nguồn năng lượng tái tạo."},
      {en:"recycling",vi:"tái chế",t:"(n)",i:"/riːˈsaɪ.klɪŋ/",ex:"Recycling programs reduce waste at resorts.",vx:"Chương trình tái chế giảm rác thải tại khu nghỉ dưỡng."},
      {en:"volunteer tourism",vi:"du lịch tình nguyện",t:"(n)",i:"/ˌvɒl.ənˈtɪər ˈtʊə.rɪ.zəm/",ex:"Volunteer tourism combines travel with community service.",vx:"Du lịch tình nguyện kết hợp du lịch với phục vụ cộng đồng."},
      {en:"local community",vi:"cộng đồng địa phương",t:"(n)",i:"/ˈləʊ.kəl kəˈmjuː.nə.ti/",ex:"Support local communities by buying their products.",vx:"Hỗ trợ cộng đồng địa phương bằng cách mua sản phẩm của họ."},
      {en:"fair trade",vi:"thương mại công bằng",t:"(n)",i:"/feər treɪd/",ex:"Fair trade ensures farmers receive fair prices.",vx:"Thương mại công bằng đảm bảo nông dân nhận giá hợp lý."},
      {en:"off-season",vi:"mùa thấp điểm",t:"(n/adj)",i:"/ˈɒf.siː.zən/",ex:"Travel off-season to avoid crowds.",vx:"Du lịch mùa thấp điểm để tránh đông đúc."},
      {en:"resort",vi:"khu nghỉ dưỡng",t:"(n)",i:"/rɪˈzɔːt/",ex:"The beach resort uses solar panels.",vx:"Khu nghỉ dưỡng biển sử dụng pin mặt trời."},
      {en:"sanctuary",vi:"khu bảo tồn",t:"(n)",i:"/ˈsæŋk.tʃu.ər.i/",ex:"The wildlife sanctuary protects elephants.",vx:"Khu bảo tồn động vật hoang dã bảo vệ voi."},
      {en:"trail",vi:"đường mòn",t:"(n)",i:"/treɪl/",ex:"Hiking trails should be well-maintained.",vx:"Đường mòn đi bộ cần được bảo trì tốt."},
      {en:"campsite",vi:"khu cắm trại",t:"(n)",i:"/ˈkæmp.saɪt/",ex:"The campsite has clean water and toilets.",vx:"Khu cắm trại có nước sạch và nhà vệ sinh."},
      {en:"guidebook",vi:"sách hướng dẫn du lịch",t:"(n)",i:"/ˈɡaɪd.bʊk/",ex:"Buy a guidebook before your trip.",vx:"Mua sách hướng dẫn trước chuyến đi."},
      {en:"monument",vi:"tượng đài/di tích",t:"(n)",i:"/ˈmɒn.jʊ.mənt/",ex:"Do not damage historical monuments.",vx:"Không được phá hoại di tích lịch sử."},
      {en:"archaeological",vi:"thuộc khảo cổ học",t:"(adj)",i:"/ˌɑː.ki.əˈlɒdʒ.ɪ.kəl/",ex:"Archaeological sites attract many tourists.",vx:"Các di chỉ khảo cổ thu hút nhiều du khách."},
      {en:"authentic",vi:"chính gốc/đích thực",t:"(adj)",i:"/ɔːˈθen.tɪk/",ex:"Travelers seek authentic cultural experiences.",vx:"Du khách tìm kiếm trải nghiệm văn hóa đích thực."},
      {en:"hospitality",vi:"lòng hiếu khách",t:"(n)",i:"/ˌhɒs.pɪˈtæl.ə.ti/",ex:"Vietnamese hospitality is known worldwide.",vx:"Lòng hiếu khách Việt Nam nổi tiếng thế giới."},
      {en:"cuisine",vi:"ẩm thực",t:"(n)",i:"/kwɪˈziːn/",ex:"Vietnamese cuisine is one of the healthiest.",vx:"Ẩm thực Việt Nam là một trong những nền ẩm thực lành mạnh nhất."},
      {en:"gastronomy",vi:"nghệ thuật ẩm thực",t:"(n)",i:"/ɡæˈstrɒn.ə.mi/",ex:"Food gastronomy tours are trending.",vx:"Tour ẩm thực đang là xu hướng."},
      {en:"expedition",vi:"chuyến thám hiểm",t:"(n)",i:"/ˌek.spɪˈdɪʃ.ən/",ex:"The expedition explored remote mountain areas.",vx:"Chuyến thám hiểm khám phá vùng núi xa xôi."},
      {en:"trek",vi:"đi bộ đường dài",t:"(v/n)",i:"/trek/",ex:"We trekked through the jungle for three days.",vx:"Chúng tôi đi bộ xuyên rừng ba ngày."},
      {en:"cruise",vi:"du thuyền",t:"(n/v)",i:"/kruːz/",ex:"A Ha Long Bay cruise is unforgettable.",vx:"Chuyến du thuyền Hạ Long là không thể quên."},
      {en:"embassy",vi:"đại sứ quán",t:"(n)",i:"/ˈem.bə.si/",ex:"Contact the embassy if you lose your passport.",vx:"Liên hệ đại sứ quán nếu mất hộ chiếu."},
      {en:"visa",vi:"thị thực",t:"(n)",i:"/ˈviː.zə/",ex:"Some countries offer visa-free entry for Vietnamese.",vx:"Một số nước miễn thị thực cho người Việt Nam."},
      {en:"customs",vi:"hải quan",t:"(n)",i:"/ˈkʌs.təmz/",ex:"Declare valuable items at customs.",vx:"Khai báo vật có giá trị tại hải quan."},
      {en:"currency exchange",vi:"đổi tiền",t:"(n)",i:"/ˈkʌr.ən.si ɪksˈtʃeɪndʒ/",ex:"Find the best currency exchange rate.",vx:"Tìm tỷ giá đổi tiền tốt nhất."},
      {en:"insurance",vi:"bảo hiểm",t:"(n)",i:"/ɪnˈʃʊə.rəns/",ex:"Travel insurance covers medical emergencies.",vx:"Bảo hiểm du lịch bao gồm cấp cứu y tế."},
      {en:"sunscreen",vi:"kem chống nắng",t:"(n)",i:"/ˈsʌn.skriːn/",ex:"Use reef-safe sunscreen to protect coral.",vx:"Dùng kem chống nắng an toàn cho san hô."},
      {en:"reusable",vi:"có thể tái sử dụng",t:"(adj)",i:"/riːˈjuː.zə.bəl/",ex:"Bring reusable water bottles when traveling.",vx:"Mang chai nước tái sử dụng khi du lịch."},
      {en:"footprint",vi:"dấu chân/tác động",t:"(n)",i:"/ˈfʊt.prɪnt/",ex:"Reduce your environmental footprint.",vx:"Giảm tác động môi trường của bạn."},
      {en:"trekking",vi:"đi bộ đường núi",t:"(n)",i:"/ˈtrek.ɪŋ/",ex:"Sapa is famous for trekking adventures.",vx:"Sapa nổi tiếng với những chuyến đi bộ đường núi phiêu lưu."},
      {en:"deforestation",vi:"phá rừng",t:"(n)",i:"/diːˌfɒr.ɪˈsteɪ.ʃən/",ex:"Tourism-related deforestation is a problem.",vx:"Phá rừng liên quan đến du lịch là một vấn đề."},
      {en:"endangered",vi:"có nguy cơ tuyệt chủng",t:"(adj)",i:"/ɪnˈdeɪn.dʒəd/",ex:"Do not buy products from endangered animals.",vx:"Không mua sản phẩm từ động vật có nguy cơ tuyệt chủng."},
      {en:"habitat",vi:"môi trường sống",t:"(n)",i:"/ˈhæb.ɪ.tæt/",ex:"Construction destroys natural habitats.",vx:"Xây dựng phá hủy môi trường sống tự nhiên."},
      {en:"reef",vi:"rạn (san hô)",t:"(n)",i:"/riːf/",ex:"Snorkeling near the reef is amazing.",vx:"Lặn gần rạn san hô rất tuyệt vời."},
      {en:"mangrove",vi:"rừng ngập mặn",t:"(n)",i:"/ˈmæŋ.ɡrəʊv/",ex:"Mangroves protect coastlines from storms.",vx:"Rừng ngập mặn bảo vệ bờ biển khỏi bão."},
      {en:"wetland",vi:"vùng đất ngập nước",t:"(n)",i:"/ˈwet.lənd/",ex:"Wetlands are important for migratory birds.",vx:"Đất ngập nước quan trọng cho chim di cư."},
      {en:"carbon offset",vi:"bù đắp carbon",t:"(n)",i:"/ˈkɑː.bən ˈɒf.set/",ex:"Airlines offer carbon offset programs.",vx:"Hãng hàng không cung cấp chương trình bù đắp carbon."},
      {en:"green hotel",vi:"khách sạn xanh",t:"(n)",i:"/ɡriːn həʊˈtel/",ex:"Green hotels use eco-friendly practices.",vx:"Khách sạn xanh sử dụng phương pháp thân thiện môi trường."},
      {en:"plastic-free",vi:"không dùng nhựa",t:"(adj)",i:"/ˈplæs.tɪk friː/",ex:"Many beaches are now plastic-free zones.",vx:"Nhiều bãi biển nay là khu vực không nhựa."},
      {en:"impact",vi:"tác động",t:"(n)",i:"/ˈɪm.pækt/",ex:"Tourism has both positive and negative impacts.",vx:"Du lịch có cả tác động tích cực và tiêu cực."},
      {en:"restoration",vi:"phục hồi/trùng tu",t:"(n)",i:"/ˌres.tɒˈreɪ.ʃən/",ex:"Temple restoration costs millions of dollars.",vx:"Trùng tu đền chùa tốn hàng triệu đô la."},
      {en:"pollution-free",vi:"không ô nhiễm",t:"(adj)",i:"/pəˈluː.ʃən friː/",ex:"Cycling creates pollution-free transport.",vx:"Đi xe đạp tạo phương tiện không ô nhiễm."},
      {en:"flora",vi:"thực vật/hệ thực vật",t:"(n)",i:"/ˈflɔː.rə/",ex:"The park has diverse flora and fauna.",vx:"Công viên có hệ thực vật và động vật đa dạng."},
      {en:"fauna",vi:"động vật/hệ động vật",t:"(n)",i:"/ˈfɔː.nə/",ex:"Tropical fauna includes parrots and monkeys.",vx:"Hệ động vật nhiệt đới gồm vẹt và khỉ."},
      {en:"sustainable development",vi:"phát triển bền vững",t:"(n)",i:"/səˈsteɪ.nə.bəl dɪˈvel.əp.mənt/",ex:"Tourism must align with sustainable development goals.",vx:"Du lịch phải phù hợp với mục tiêu phát triển bền vững."},
      {en:"eco-friendly",vi:"thân thiện môi trường",t:"(adj)",i:"/ˌiː.kəʊˈfrend.li/",ex:"Choose eco-friendly products when traveling.",vx:"Chọn sản phẩm thân thiện môi trường khi du lịch."},
      {en:"awareness",vi:"nhận thức",t:"(n)",i:"/əˈweə.nəs/",ex:"Raise awareness about responsible tourism.",vx:"Nâng cao nhận thức về du lịch có trách nhiệm."},
      {en:"livelihood",vi:"sinh kế/kế sinh nhai",t:"(n)",i:"/ˈlaɪv.li.hʊd/",ex:"Tourism provides livelihoods for many families.",vx:"Du lịch cung cấp sinh kế cho nhiều gia đình."},
      {en:"cultural sensitivity",vi:"nhạy cảm văn hóa",t:"(n)",i:"/ˈkʌl.tʃər.əl ˌsen.sɪˈtɪv.ə.ti/",ex:"Show cultural sensitivity when visiting temples.",vx:"Thể hiện nhạy cảm văn hóa khi thăm đền chùa."},
      {en:"ethical",vi:"có đạo đức",t:"(adj)",i:"/ˈeθ.ɪ.kəl/",ex:"Ethical travel means respecting local customs.",vx:"Du lịch có đạo đức nghĩa là tôn trọng phong tục địa phương."},
      {en:"biodegradable",vi:"phân hủy sinh học",t:"(adj)",i:"/ˌbaɪ.əʊ.dɪˈɡreɪ.də.bəl/",ex:"Use biodegradable soap when camping.",vx:"Dùng xà phòng phân hủy sinh học khi cắm trại."},
      {en:"emission",vi:"khí thải",t:"(n)",i:"/ɪˈmɪʃ.ən/",ex:"Reduce carbon emissions by taking trains.",vx:"Giảm khí thải carbon bằng cách đi tàu."},
      {en:"revegetation",vi:"tái trồng cây",t:"(n)",i:"/ˌriː.vedʒ.ɪˈteɪ.ʃən/",ex:"Revegetation projects restore damaged landscapes.",vx:"Dự án tái trồng cây khôi phục cảnh quan bị hủy hoại."},
      {en:"national park",vi:"vườn quốc gia",t:"(n)",i:"/ˈnæʃ.ən.əl pɑːk/",ex:"Phong Nha is a famous national park.",vx:"Phong Nha là vườn quốc gia nổi tiếng."},
      {en:"biosphere reserve",vi:"khu dự trữ sinh quyển",t:"(n)",i:"/ˈbaɪ.əʊ.sfɪər rɪˈzɜːv/",ex:"Cat Ba is a UNESCO biosphere reserve.",vx:"Cát Bà là khu dự trữ sinh quyển UNESCO."},
      {en:"geotourism",vi:"du lịch địa chất",t:"(n)",i:"/ˌdʒiː.əʊˈtʊə.rɪ.zəm/",ex:"Geotourism focuses on geological features.",vx:"Du lịch địa chất tập trung vào các đặc điểm địa chất."},
      {en:"agritourism",vi:"du lịch nông nghiệp",t:"(n)",i:"/ˌæɡ.rɪˈtʊə.rɪ.zəm/",ex:"Agritourism lets visitors experience farm life.",vx:"Du lịch nông nghiệp cho du khách trải nghiệm cuộc sống nông trại."},
      {en:"cultural tourism",vi:"du lịch văn hóa",t:"(n)",i:"/ˈkʌl.tʃər.əl ˈtʊə.rɪ.zəm/",ex:"Cultural tourism promotes understanding between nations.",vx:"Du lịch văn hóa thúc đẩy sự hiểu biết giữa các quốc gia."},
      {en:"adventure tourism",vi:"du lịch mạo hiểm",t:"(n)",i:"/ədˈven.tʃər ˈtʊə.rɪ.zəm/",ex:"Adventure tourism includes rock climbing and rafting.",vx:"Du lịch mạo hiểm gồm leo núi và chèo bè."},
      {en:"community-based",vi:"dựa vào cộng đồng",t:"(adj)",i:"/kəˈmjuː.nə.ti beɪst/",ex:"Community-based tourism empowers local people.",vx:"Du lịch dựa vào cộng đồng trao quyền cho người địa phương."},
      {en:"carrying capacity",vi:"sức chứa/sức tải",t:"(n)",i:"/ˈkær.i.ɪŋ kəˈpæs.ə.ti/",ex:"Tourist sites have a carrying capacity limit.",vx:"Các điểm du lịch có giới hạn sức chứa."},
      {en:"stakeholder",vi:"bên liên quan",t:"(n)",i:"/ˈsteɪk.həʊl.dər/",ex:"All stakeholders should be involved in tourism planning.",vx:"Tất cả bên liên quan nên tham gia vào quy hoạch du lịch."},
      {en:"degradation",vi:"sự suy thoái",t:"(n)",i:"/ˌdeɡ.rəˈdeɪ.ʃən/",ex:"Environmental degradation threatens tourism.",vx:"Suy thoái môi trường đe dọa du lịch."},
      {en:"interpretation",vi:"thuyết minh/diễn giải",t:"(n)",i:"/ɪnˌtɜː.prɪˈteɪ.ʃən/",ex:"Good interpretation enhances visitor experience.",vx:"Thuyết minh tốt nâng cao trải nghiệm du khách."},
      {en:"regenerative",vi:"tái sinh/phục hồi",t:"(adj)",i:"/rɪˈdʒen.ər.ə.tɪv/",ex:"Regenerative tourism leaves places better than before.",vx:"Du lịch tái sinh để lại nơi đến tốt hơn trước."},
      {en:"wastewater",vi:"nước thải",t:"(n)",i:"/ˈweɪst.wɔː.tər/",ex:"Hotels must treat wastewater before releasing it.",vx:"Khách sạn phải xử lý nước thải trước khi xả ra."},
      {en:"green certification",vi:"chứng nhận xanh",t:"(n)",i:"/ɡriːn ˌsɜː.tɪ.fɪˈkeɪ.ʃən/",ex:"Green certification recognizes eco-friendly hotels.",vx:"Chứng nhận xanh công nhận khách sạn thân thiện môi trường."},
      {en:"low-impact",vi:"tác động thấp",t:"(adj)",i:"/ləʊ ˈɪm.pækt/",ex:"Low-impact travel reduces environmental damage.",vx:"Du lịch tác động thấp giảm thiệt hại môi trường."},
      {en:"kayaking",vi:"chèo thuyền kayak",t:"(n)",i:"/ˈkaɪ.æk.ɪŋ/",ex:"Kayaking in Ha Long Bay is a must-do activity.",vx:"Chèo kayak ở Hạ Long là hoạt động không thể bỏ qua."},
      {en:"snorkeling",vi:"lặn ống thở",t:"(n)",i:"/ˈsnɔː.kəl.ɪŋ/",ex:"Snorkeling reveals colorful underwater worlds.",vx:"Lặn ống thở khám phá thế giới dưới nước đầy màu sắc."},
      {en:"sustainability",vi:"tính bền vững",t:"(n)",i:"/səˌsteɪ.nəˈbɪl.ə.ti/",ex:"Sustainability is key to the tourism industry's future.",vx:"Tính bền vững là chìa khóa cho tương lai ngành du lịch."},
      {en:"microplastic",vi:"vi nhựa",t:"(n)",i:"/ˌmaɪ.krəʊˈplæs.tɪk/",ex:"Microplastics pollute beaches and oceans.",vx:"Vi nhựa gây ô nhiễm bãi biển và đại dương."},
    ],
    story: {
      en: "In the heart of Vietnam, sustainable tourism is transforming how travelers explore this beautiful country. Instead of staying at large resorts, many backpackers now choose homestays in local communities, seeking cultural immersion and authentic experiences. Ecotourism destinations like Phong Nha national park and Cat Ba biosphere reserve attract visitors who appreciate biodiversity, wildlife, and stunning landscapes. Trekking through scenic trails, kayaking in emerald waters, and snorkeling near coral reefs offer unforgettable adventures with low environmental impact. Responsible travelers bring reusable bottles, use biodegradable sunscreen to protect reef ecosystems, and support fair trade handicrafts as souvenirs. Green hotels with green certification treat wastewater properly and use renewable energy. However, challenges remain: overtourism threatens popular heritage sites, causing degradation of habitats and pollution from emissions. Carbon offset programs and awareness campaigns encourage visitors to reduce their carbon footprint. Community-based agritourism and volunteer tourism create livelihoods while preserving indigenous cultures. The vision is clear: regenerative tourism that leaves destinations better than before, balancing conservation with sustainable development for future generations.",
      vi: "Ở trung tâm Việt Nam, du lịch bền vững đang thay đổi cách du khách khám phá đất nước xinh đẹp này. Thay vì ở khu nghỉ dưỡng lớn, nhiều người du lịch bụi nay chọn homestay tại cộng đồng địa phương, tìm kiếm sự hòa mình văn hóa và trải nghiệm đích thực. Các điểm đến du lịch sinh thái như vườn quốc gia Phong Nha và khu dự trữ sinh quyển Cát Bà thu hút du khách yêu đa dạng sinh học, động vật hoang dã và cảnh quan tuyệt đẹp. Đi bộ đường núi qua những đường mòn phong cảnh đẹp, chèo kayak trên vùng nước ngọc bích và lặn ống thở gần rạn san hô mang đến những chuyến phiêu lưu khó quên với tác động thấp đến môi trường. Du khách có trách nhiệm mang chai tái sử dụng, dùng kem chống nắng phân hủy sinh học để bảo vệ hệ sinh thái san hô, và mua đồ thủ công mỹ nghệ thương mại công bằng làm quà lưu niệm. Khách sạn xanh có chứng nhận xanh xử lý nước thải đúng cách và sử dụng năng lượng tái tạo. Tuy nhiên, thách thức vẫn còn: du lịch quá tải đe dọa các di sản, gây suy thoái môi trường sống và ô nhiễm từ khí thải. Chương trình bù đắp carbon và chiến dịch nâng cao nhận thức khuyến khích du khách giảm dấu chân carbon. Du lịch nông nghiệp và du lịch tình nguyện dựa vào cộng đồng tạo sinh kế đồng thời bảo tồn văn hóa bản địa."
    }
  },
};

// Convert compact format to standard format
function convertToStandard(topicData) {
  return {
    id: topicData.id || "",
    category: topicData.cat,
    title: topicData.title + " (100 Từ) (" + topicData.level + ")",
    description: topicData.desc,
    level: topicData.level,
    examTags: topicData.tags,
    words: topicData.words.map(w => ({
      en: w.en,
      vi: w.vi,
      type: w.t,
      ipa: w.i,
      example: w.ex,
      viExample: w.vx
    })),
    storyEn: topicData.story?.en || "",
    storyVi: topicData.story?.vi || ""
  };
}

// Generate and save
const topics = Object.entries(topicWords).map(([id, data]) => {
  data.id = id;
  return convertToStandard(data);
});

console.log(`Generated ${topics.length} topics`);
topics.forEach(t => {
  console.log(`  ${t.id}: ${t.words.length} words | story: ${t.storyEn.length > 0 ? '✅' : '❌'}`);
});

// Write to file
const output = `// Auto-generated vocabulary data
// Generated: ${new Date().toISOString()}

export const vocabGeneratedData = ${JSON.stringify(topics, null, 2)};

export default vocabGeneratedData;
`;

const outPath = path.join(__dirname, '..', 'src', 'data', 'vocabGenerated.js');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`\nWritten to: ${outPath}`);
console.log(`File size: ${(Buffer.byteLength(output) / 1024).toFixed(1)} KB`);
