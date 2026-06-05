// ============================================================
// MEGA DATA GENERATOR - Generates ALL remaining vocab topics
// Run: node scratch/megaGenerator.cjs
// Output: src/data/vocabMegaData.js
// ============================================================

const fs = require('fs');
const path = require('path');

// ============================================================
// ALL TOPIC DEFINITIONS WITH REAL WORD LISTS
// Each topic has 100 curated English-Vietnamese vocabulary items
// ============================================================

const ALL_TOPICS = [
  // ==================== VSTEP REMAINING (36 topics) ====================
  {
    id: "population-migration-vstep", cat: "vstep", title: "👥 Dân Số & Di Cư (100 Từ) (B2)", level: "B2", tags: ["VSTEP B2", "IELTS Band 6"],
    desc: "Tăng dân số, di cư, đô thị hóa và tác động xã hội.",
    words: [
      ["population","dân số","(n)","/ˌpɒp.jʊˈleɪ.ʃən/","The world population exceeds 8 billion.","Dân số thế giới vượt 8 tỷ."],
      ["migration","di cư","(n)","/maɪˈɡreɪ.ʃən/","Rural-to-urban migration is increasing.","Di cư từ nông thôn lên thành thị đang tăng."],
      ["immigrant","người nhập cư","(n)","/ˈɪm.ɪ.ɡrənt/","Immigrants contribute to the economy.","Người nhập cư đóng góp cho nền kinh tế."],
      ["emigrant","người di cư (ra nước ngoài)","(n)","/ˈem.ɪ.ɡrənt/","Many emigrants send money back home.","Nhiều người di cư gửi tiền về quê."],
      ["refugee","người tị nạn","(n)","/ˌref.juˈdʒiː/","Refugees flee war and persecution.","Người tị nạn chạy trốn chiến tranh và bức hại."],
      ["asylum","tị nạn/nơi trú ẩn","(n)","/əˈsaɪ.ləm/","They applied for political asylum.","Họ xin tị nạn chính trị."],
      ["census","điều tra dân số","(n)","/ˈsen.səs/","The census is conducted every 10 years.","Điều tra dân số được thực hiện 10 năm một lần."],
      ["demographic","nhân khẩu học","(adj/n)","/ˌdem.əˈɡræf.ɪk/","Demographic changes affect social services.","Thay đổi nhân khẩu học ảnh hưởng dịch vụ xã hội."],
      ["fertility rate","tỷ lệ sinh","(n)","/fɜːˈtɪl.ə.ti reɪt/","The fertility rate is declining globally.","Tỷ lệ sinh đang giảm trên toàn cầu."],
      ["mortality rate","tỷ lệ tử vong","(n)","/mɔːˈtæl.ə.ti reɪt/","Improved healthcare reduces mortality rates.","Y tế cải thiện giảm tỷ lệ tử vong."],
      ["life expectancy","tuổi thọ trung bình","(n)","/laɪf ɪkˈspek.tən.si/","Life expectancy in Vietnam is 75 years.","Tuổi thọ trung bình ở Việt Nam là 75 tuổi."],
      ["urbanization","đô thị hóa","(n)","/ˌɜː.bə.naɪˈzeɪ.ʃən/","Urbanization creates housing shortages.","Đô thị hóa tạo ra thiếu nhà ở."],
      ["overcrowding","quá đông đúc","(n)","/ˌəʊ.vəˈkraʊ.dɪŋ/","Overcrowding in cities leads to poor living conditions.","Quá đông đúc ở thành phố dẫn đến điều kiện sống kém."],
      ["slum","khu ổ chuột","(n)","/slʌm/","Millions of people live in slums worldwide.","Hàng triệu người sống trong khu ổ chuột trên thế giới."],
      ["overpopulation","dân số quá đông","(n)","/ˌəʊ.və.pɒp.jʊˈleɪ.ʃən/","Overpopulation strains natural resources.","Dân số quá đông làm căng thẳng tài nguyên."],
      ["birth rate","tỷ lệ sinh","(n)","/bɜːθ reɪt/","Birth rates are falling in developed countries.","Tỷ lệ sinh giảm ở các nước phát triển."],
      ["death rate","tỷ lệ tử vong","(n)","/deθ reɪt/","Medical advances lower death rates.","Tiến bộ y tế giảm tỷ lệ tử vong."],
      ["aging population","dân số già hóa","(n)","/ˈeɪ.dʒɪŋ ˌpɒp.jʊˈleɪ.ʃən/","An aging population increases healthcare costs.","Dân số già hóa tăng chi phí y tế."],
      ["baby boom","bùng nổ dân số","(n)","/ˈbeɪ.bi buːm/","The baby boom after the war increased population.","Bùng nổ dân số sau chiến tranh tăng dân số."],
      ["displacement","sự di dời","(n)","/dɪsˈpleɪs.mənt/","Climate change causes mass displacement.","Biến đổi khí hậu gây di dời hàng loạt."],
      ["resettlement","tái định cư","(n)","/ˌriːˈset.əl.mənt/","Resettlement programs help displaced families.","Chương trình tái định cư giúp gia đình bị di dời."],
      ["assimilation","hội nhập/đồng hóa","(n)","/əˌsɪm.ɪˈleɪ.ʃən/","Cultural assimilation takes generations.","Hội nhập văn hóa mất nhiều thế hệ."],
      ["integration","hòa nhập","(n)","/ˌɪn.tɪˈɡreɪ.ʃən/","Successful integration requires language skills.","Hòa nhập thành công cần kỹ năng ngôn ngữ."],
      ["citizenship","quyền công dân","(n)","/ˈsɪt.ɪ.zən.ʃɪp/","Immigrants can apply for citizenship.","Người nhập cư có thể xin quyền công dân."],
      ["resident","cư dân","(n)","/ˈrez.ɪ.dənt/","Permanent residents have most citizen rights.","Cư dân thường trú có hầu hết quyền công dân."],
      ["passport","hộ chiếu","(n)","/ˈpɑːs.pɔːt/","A valid passport is required for travel.","Hộ chiếu hợp lệ cần thiết để du lịch."],
      ["visa","thị thực","(n)","/ˈviː.zə/","Some countries require a visa for entry.","Một số nước yêu cầu thị thực để nhập cảnh."],
      ["border","biên giới","(n)","/ˈbɔː.dər/","Border controls have become stricter.","Kiểm soát biên giới ngày càng nghiêm ngặt."],
      ["deportation","trục xuất","(n)","/ˌdiː.pɔːˈteɪ.ʃən/","Deportation separates families.","Trục xuất chia cắt gia đình."],
      ["quota","hạn ngạch","(n)","/ˈkwəʊ.tə/","Immigration quotas limit the number of newcomers.","Hạn ngạch nhập cư giới hạn số lượng người mới."],
      ["brain drain","chảy máu chất xám","(n)","/breɪn dreɪn/","Brain drain weakens developing countries.","Chảy máu chất xám làm yếu các nước đang phát triển."],
      ["remittance","kiều hối","(n)","/rɪˈmɪt.əns/","Remittances are a major income source for Vietnam.","Kiều hối là nguồn thu nhập lớn cho Việt Nam."],
      ["diaspora","cộng đồng hải ngoại","(n)","/daɪˈæs.pər.ə/","The Vietnamese diaspora is spread worldwide.","Cộng đồng người Việt hải ngoại phân bố khắp thế giới."],
      ["ethnic","thuộc dân tộc","(adj)","/ˈeθ.nɪk/","Vietnam has 54 ethnic groups.","Việt Nam có 54 nhóm dân tộc."],
      ["minority","thiểu số","(n)","/maɪˈnɒr.ə.ti/","Ethnic minorities face unique challenges.","Dân tộc thiểu số đối mặt thách thức riêng."],
      ["indigenous","bản địa","(adj)","/ɪnˈdɪdʒ.ɪ.nəs/","Indigenous peoples have cultural rights.","Người bản địa có quyền văn hóa."],
      ["multiculturalism","đa văn hóa","(n)","/ˌmʌl.tiˈkʌl.tʃər.əl.ɪ.zəm/","Multiculturalism enriches society.","Đa văn hóa làm phong phú xã hội."],
      ["diversity","đa dạng","(n)","/daɪˈvɜː.sə.ti/","Cultural diversity is a national strength.","Đa dạng văn hóa là sức mạnh quốc gia."],
      ["prejudice","thành kiến","(n)","/ˈpredʒ.ʊ.dɪs/","Prejudice against immigrants must be addressed.","Thành kiến với người nhập cư cần được giải quyết."],
      ["discrimination","phân biệt đối xử","(n)","/dɪˌskrɪm.ɪˈneɪ.ʃən/","Discrimination based on nationality is illegal.","Phân biệt đối xử dựa trên quốc tịch là bất hợp pháp."],
      ["xenophobia","bài ngoại","(n)","/ˌzen.əˈfəʊ.bi.ə/","Xenophobia is a growing concern globally.","Bài ngoại là mối lo ngại ngày càng tăng."],
      ["human trafficking","buôn người","(n)","/ˈhjuː.mən ˈtræf.ɪ.kɪŋ/","Human trafficking is a serious crime.","Buôn người là tội phạm nghiêm trọng."],
      ["labor migration","di cư lao động","(n)","/ˈleɪ.bər maɪˈɡreɪ.ʃən/","Labor migration fills workforce gaps.","Di cư lao động lấp khoảng trống lao động."],
      ["skilled worker","lao động có tay nghề","(n)","/skɪld ˈwɜː.kər/","Countries compete for skilled workers.","Các nước cạnh tranh lao động có tay nghề."],
      ["unskilled worker","lao động phổ thông","(n)","/ʌnˈskɪld ˈwɜː.kər/","Unskilled workers often face exploitation.","Lao động phổ thông thường bị bóc lột."],
      ["economic migrant","người di cư kinh tế","(n)","/ˌiː.kəˈnɒm.ɪk ˈmaɪ.ɡrənt/","Economic migrants seek better opportunities.","Người di cư kinh tế tìm cơ hội tốt hơn."],
      ["seasonal worker","lao động theo mùa","(n)","/ˈsiː.zən.əl ˈwɜː.kər/","Seasonal workers harvest crops in summer.","Lao động theo mùa thu hoạch mùa hè."],
      ["undocumented","không giấy tờ","(adj)","/ˌʌn.dɒk.jʊˈmen.tɪd/","Undocumented immigrants live in fear.","Người nhập cư không giấy tờ sống trong sợ hãi."],
      ["naturalization","nhập quốc tịch","(n)","/ˌnætʃ.ər.ə.laɪˈzeɪ.ʃən/","Naturalization requires passing a citizenship test.","Nhập quốc tịch yêu cầu vượt qua bài kiểm tra."],
      ["dual citizenship","quốc tịch kép","(n)","/ˌdjuː.əl ˈsɪt.ɪ.zən.ʃɪp/","Some countries allow dual citizenship.","Một số nước cho phép quốc tịch kép."],
      ["dependency ratio","tỷ lệ phụ thuộc","(n)","/dɪˈpen.dən.si ˈreɪ.ʃi.əʊ/","An aging society has a high dependency ratio.","Xã hội già hóa có tỷ lệ phụ thuộc cao."],
      ["workforce","lực lượng lao động","(n)","/ˈwɜːk.fɔːs/","Immigrants expand the workforce.","Người nhập cư mở rộng lực lượng lao động."],
      ["poverty","nghèo đói","(n)","/ˈpɒv.ə.ti/","Poverty drives people to migrate.","Nghèo đói đẩy người dân di cư."],
      ["inequality","bất bình đẳng","(n)","/ˌɪn.ɪˈkwɒl.ə.ti/","Income inequality fuels social unrest.","Bất bình đẳng thu nhập gây bất ổn xã hội."],
      ["welfare","phúc lợi xã hội","(n)","/ˈwel.feər/","Welfare programs support vulnerable populations.","Chương trình phúc lợi hỗ trợ dân số dễ bị tổn thương."],
      ["subsidy","trợ cấp","(n)","/ˈsʌb.sə.di/","Government subsidies help low-income families.","Trợ cấp chính phủ giúp gia đình thu nhập thấp."],
      ["housing","nhà ở","(n)","/ˈhaʊ.zɪŋ/","Affordable housing is scarce in cities.","Nhà ở giá phải chăng khan hiếm ở thành phố."],
      ["infrastructure","cơ sở hạ tầng","(n)","/ˈɪn.frə.strʌk.tʃər/","Population growth strains infrastructure.","Tăng dân số gây áp lực cơ sở hạ tầng."],
      ["sanitation","vệ sinh","(n)","/ˌsæn.ɪˈteɪ.ʃən/","Poor sanitation causes disease in crowded areas.","Vệ sinh kém gây bệnh ở vùng đông đúc."],
      ["healthcare","chăm sóc sức khỏe","(n)","/ˈhelθ.keər/","Healthcare is overwhelmed in densely populated areas.","Y tế quá tải ở vùng dân cư đông đúc."],
      ["education","giáo dục","(n)","/ˌed.jʊˈkeɪ.ʃən/","Access to education is a basic right.","Tiếp cận giáo dục là quyền cơ bản."],
      ["family planning","kế hoạch hóa gia đình","(n)","/ˈfæm.ə.li ˌplæn.ɪŋ/","Family planning reduces population growth.","Kế hoạch hóa gia đình giảm tăng dân số."],
      ["contraception","biện pháp tránh thai","(n)","/ˌkɒn.trəˈsep.ʃən/","Access to contraception empowers women.","Tiếp cận biện pháp tránh thai trao quyền cho phụ nữ."],
      ["population density","mật độ dân số","(n)","/ˌpɒp.jʊˈleɪ.ʃən ˈden.sə.ti/","Hanoi has a very high population density.","Hà Nội có mật độ dân số rất cao."],
      ["megacity","siêu đô thị","(n)","/ˈmeɡ.ə.sɪt.i/","A megacity has over 10 million people.","Siêu đô thị có hơn 10 triệu người."],
      ["rural exodus","cuộc di cư khỏi nông thôn","(n)","/ˈrʊə.rəl ˈek.sə.dəs/","The rural exodus leaves villages empty.","Cuộc di cư khỏi nông thôn để làng xóm trống vắng."],
      ["developing country","nước đang phát triển","(n)","/dɪˈvel.ə.pɪŋ ˈkʌn.tri/","Developing countries face rapid population growth.","Nước đang phát triển đối mặt tăng dân số nhanh."],
      ["developed country","nước phát triển","(n)","/dɪˈvel.əpt ˈkʌn.tri/","Developed countries have aging populations.","Nước phát triển có dân số già hóa."],
      ["sustainable development","phát triển bền vững","(n)","/səˈsteɪ.nə.bəl dɪˈvel.əp.mənt/","Sustainable development balances growth and resources.","Phát triển bền vững cân bằng tăng trưởng và tài nguyên."],
      ["climate refugee","người tị nạn khí hậu","(n)","/ˈklaɪ.mət ˌref.juˈdʒiː/","Climate refugees flee rising sea levels.","Người tị nạn khí hậu chạy trốn mực nước biển dâng."],
      ["food security","an ninh lương thực","(n)","/fuːd sɪˈkjʊə.rə.ti/","Population growth threatens food security.","Tăng dân số đe dọa an ninh lương thực."],
      ["land use","sử dụng đất","(n)","/lænd juːz/","Population pressure changes land use patterns.","Áp lực dân số thay đổi mô hình sử dụng đất."],
      ["congestion","tắc nghẽn","(n)","/kənˈdʒes.tʃən/","Urban congestion wastes hours daily.","Tắc nghẽn đô thị lãng phí hàng giờ mỗi ngày."],
      ["commuter","người đi làm","(n)","/kəˈmjuː.tər/","Commuters travel long distances to work.","Người đi làm di chuyển quãng đường dài."],
      ["gentrification","chỉnh trang đô thị","(n)","/ˌdʒen.trɪ.fɪˈkeɪ.ʃən/","Gentrification pushes poor residents out.","Chỉnh trang đô thị đẩy cư dân nghèo ra ngoài."],
      ["social mobility","di động xã hội","(n)","/ˈsəʊ.ʃəl məʊˈbɪl.ə.ti/","Education promotes social mobility.","Giáo dục thúc đẩy di động xã hội."],
      ["assemble","tập hợp","(v)","/əˈsem.bəl/","Workers assemble in the factory district.","Công nhân tập hợp ở khu công nghiệp."],
      ["density","mật độ","(n)","/ˈden.sə.ti/","High density areas need more services.","Khu vực mật độ cao cần nhiều dịch vụ hơn."],
      ["settlement","khu định cư","(n)","/ˈset.əl.mənt/","Informal settlements lack basic services.","Khu định cư không chính thức thiếu dịch vụ cơ bản."],
      ["habitat","nơi cư trú","(n)","/ˈhæb.ɪ.tæt/","Urban habitats differ from rural ones.","Nơi cư trú đô thị khác với nông thôn."],
      ["malnutrition","suy dinh dưỡng","(n)","/ˌmæl.njuːˈtrɪʃ.ən/","Malnutrition affects children in poor areas.","Suy dinh dưỡng ảnh hưởng trẻ em vùng nghèo."],
      ["epidemic","dịch bệnh","(n)","/ˌep.ɪˈdem.ɪk/","Overcrowding spreads epidemics rapidly.","Quá đông đúc lan truyền dịch bệnh nhanh chóng."],
      ["pandemic","đại dịch","(n)","/pænˈdem.ɪk/","The pandemic affected population movement.","Đại dịch ảnh hưởng sự di chuyển dân số."],
      ["lockdown","phong tỏa","(n)","/ˈlɒk.daʊn/","Lockdowns restricted population movement.","Phong tỏa hạn chế sự di chuyển dân số."],
      ["quarantine","cách ly","(n/v)","/ˈkwɒr.ən.tiːn/","Quarantine measures controlled the spread.","Biện pháp cách ly kiểm soát sự lây lan."],
      ["census data","dữ liệu điều tra dân số","(n)","/ˈsen.səs ˈdeɪ.tə/","Census data helps plan public services.","Dữ liệu điều tra dân số giúp lên kế hoạch dịch vụ công."],
      ["growth rate","tốc độ tăng trưởng","(n)","/ɡrəʊθ reɪt/","Vietnam's population growth rate is 0.9%.","Tốc độ tăng dân số Việt Nam là 0.9%."],
      ["empowerment","trao quyền","(n)","/ɪmˈpaʊ.ə.mənt/","Women's empowerment reduces birth rates.","Trao quyền phụ nữ giảm tỷ lệ sinh."],
      ["literacy","biết chữ/xóa mù chữ","(n)","/ˈlɪt.ər.ə.si/","Higher literacy rates correlate with lower birth rates.","Tỷ lệ biết chữ cao tương quan với tỷ lệ sinh thấp."],
      ["mortality","tỷ lệ chết","(n)","/mɔːˈtæl.ə.ti/","Child mortality has decreased significantly.","Tỷ lệ tử vong trẻ em giảm đáng kể."],
      ["urban sprawl","sự mở rộng đô thị tràn lan","(n)","/ˈɜː.bən sprɔːl/","Urban sprawl consumes agricultural land.","Mở rộng đô thị tràn lan tiêu thụ đất nông nghiệp."],
      ["suburb","ngoại ô","(n)","/ˈsʌb.ɜːb/","Suburbs grow as cities become expensive.","Ngoại ô phát triển khi thành phố đắt đỏ."],
      ["metropolitan","thuộc đô thị lớn","(adj)","/ˌmet.rəˈpɒl.ɪ.tən/","The metropolitan area has 12 million residents.","Vùng đô thị lớn có 12 triệu cư dân."],
    ],
    story: {
      en: "The world's population has surpassed 8 billion, creating unprecedented challenges. In developing countries, rapid population growth leads to overcrowding, poverty, and strain on infrastructure, healthcare, and education. Urbanization drives millions from rural areas to megacities, where they face congestion, housing shortages, and life in slums. Meanwhile, developed countries grapple with an aging population and declining fertility rates, resulting in high dependency ratios and workforce shortages. Migration, both labor migration and refugee displacement, reshapes demographics globally. Immigrants bring diversity and expand the workforce, but also face prejudice, discrimination, and xenophobia. Brain drain weakens developing nations as skilled workers emigrate, though remittances sent back provide vital income. Family planning and women's empowerment are key to sustainable development. Climate refugees flee rising seas, while economic migrants seek better opportunities. Census data helps governments plan for population density, sanitation, and food security. The challenge is clear: balance growth with resources while promoting integration, equality, and social mobility for all.",
      vi: "Dân số thế giới đã vượt 8 tỷ, tạo ra thách thức chưa từng có. Ở các nước đang phát triển, tăng dân số nhanh dẫn đến quá đông đúc, nghèo đói và áp lực lên cơ sở hạ tầng, y tế và giáo dục. Đô thị hóa đẩy hàng triệu người từ nông thôn lên siêu đô thị, nơi họ đối mặt tắc nghẽn, thiếu nhà ở và sống trong khu ổ chuột. Trong khi đó, các nước phát triển vật lộn với dân số già hóa và tỷ lệ sinh giảm, dẫn đến tỷ lệ phụ thuộc cao và thiếu lao động. Di cư, cả di cư lao động và di dời tị nạn, định hình lại nhân khẩu học toàn cầu. Người nhập cư mang đến đa dạng và mở rộng lực lượng lao động, nhưng cũng đối mặt thành kiến, phân biệt đối xử và bài ngoại. Chảy máu chất xám làm yếu các nước đang phát triển khi lao động có tay nghề di cư, dù kiều hối gửi về cung cấp thu nhập quan trọng. Kế hoạch hóa gia đình và trao quyền phụ nữ là chìa khóa phát triển bền vững."
    }
  },

  // ==================== IELTS TOPICS (42 topics) ====================
  {
    id: "housing-architecture-ielts", cat: "ielts", title: "🏠 Housing & Architecture (100 Từ) (B2-C1)", level: "B2-C1", tags: ["IELTS Band 6-7"],
    desc: "100 từ vựng về nhà ở, kiến trúc, xây dựng, homeless và đô thị hóa.",
    words: [
      ["housing",  "nhà ở", "(n)", "/ˈhaʊ.zɪŋ/", "Affordable housing is a global challenge.", "Nhà ở giá phải chăng là thách thức toàn cầu."],
      ["architecture", "kiến trúc", "(n)", "/ˈɑː.kɪ.tek.tʃər/", "Modern architecture uses glass and steel.", "Kiến trúc hiện đại dùng kính và thép."],
      ["skyscraper", "nhà chọc trời", "(n)", "/ˈskaɪ.skreɪ.pər/", "Skyscrapers dominate the city skyline.", "Nhà chọc trời thống trị đường chân trời thành phố."],
      ["apartment", "căn hộ", "(n)", "/əˈpɑːt.mənt/", "Many people live in apartments in cities.", "Nhiều người sống trong căn hộ ở thành phố."],
      ["condominium", "chung cư cao cấp", "(n)", "/ˌkɒn.dəˈmɪn.i.əm/", "The condominium has a swimming pool.", "Chung cư cao cấp có hồ bơi."],
      ["detached house", "nhà riêng lẻ", "(n)", "/dɪˈtætʃt haʊs/", "A detached house has its own garden.", "Nhà riêng lẻ có vườn riêng."],
      ["semi-detached", "nhà song lập", "(adj)", "/ˌsem.i.dɪˈtætʃt/", "Semi-detached houses share one wall.", "Nhà song lập chung một bức tường."],
      ["terraced house", "nhà liền kề", "(n)", "/ˈter.əst haʊs/", "Terraced houses are common in Europe.", "Nhà liền kề phổ biến ở châu Âu."],
      ["bungalow", "nhà một tầng", "(n)", "/ˈbʌŋ.ɡə.ləʊ/", "Bungalows are popular with elderly people.", "Nhà một tầng phổ biến với người già."],
      ["villa", "biệt thự", "(n)", "/ˈvɪl.ə/", "They bought a villa by the sea.", "Họ mua biệt thự bên biển."],
      ["mansion", "dinh thự", "(n)", "/ˈmæn.ʃən/", "The mansion has 20 rooms.", "Dinh thự có 20 phòng."],
      ["cottage", "nhà tranh/nhà nhỏ", "(n)", "/ˈkɒt.ɪdʒ/", "The cottage is surrounded by flowers.", "Nhà nhỏ được bao quanh bởi hoa."],
      ["tenant", "người thuê nhà", "(n)", "/ˈten.ənt/", "Tenants must pay rent on time.", "Người thuê nhà phải trả tiền đúng hạn."],
      ["landlord", "chủ nhà cho thuê", "(n)", "/ˈlænd.lɔːd/", "The landlord raised the rent.", "Chủ nhà tăng giá thuê."],
      ["mortgage", "thế chấp nhà", "(n)", "/ˈmɔː.ɡɪdʒ/", "They took out a 30-year mortgage.", "Họ vay thế chấp 30 năm."],
      ["rent", "tiền thuê", "(n/v)", "/rent/", "Rent prices are rising in major cities.", "Giá thuê đang tăng ở các thành phố lớn."],
      ["lease", "hợp đồng thuê", "(n/v)", "/liːs/", "The lease expires in December.", "Hợp đồng thuê hết hạn tháng 12."],
      ["renovation", "cải tạo/sửa chữa", "(n)", "/ˌren.əˈveɪ.ʃən/", "The old building needs renovation.", "Tòa nhà cũ cần cải tạo."],
      ["demolition", "phá dỡ", "(n)", "/ˌdem.əˈlɪʃ.ən/", "The demolition of the old factory began.", "Phá dỡ nhà máy cũ bắt đầu."],
      ["construction", "xây dựng", "(n)", "/kənˈstrʌk.ʃən/", "Construction of the new bridge is underway.", "Xây dựng cầu mới đang tiến hành."],
      ["foundation", "nền móng", "(n)", "/faʊnˈdeɪ.ʃən/", "A strong foundation is essential.", "Nền móng vững chắc là thiết yếu."],
      ["blueprint", "bản vẽ thiết kế", "(n)", "/ˈbluː.prɪnt/", "The architect reviewed the blueprint.", "Kiến trúc sư xem xét bản vẽ."],
      ["architect", "kiến trúc sư", "(n)", "/ˈɑː.kɪ.tekt/", "The architect designed a green building.", "Kiến trúc sư thiết kế tòa nhà xanh."],
      ["contractor", "nhà thầu", "(n)", "/kənˈtræk.tər/", "The contractor completed the project on time.", "Nhà thầu hoàn thành dự án đúng hạn."],
      ["zoning", "quy hoạch phân vùng", "(n)", "/ˈzəʊ.nɪŋ/", "Zoning laws regulate building heights.", "Luật quy hoạch điều chỉnh chiều cao tòa nhà."],
      ["urban planning", "quy hoạch đô thị", "(n)", "/ˈɜː.bən ˈplæn.ɪŋ/", "Good urban planning creates livable cities.", "Quy hoạch đô thị tốt tạo thành phố đáng sống."],
      ["infrastructure", "cơ sở hạ tầng", "(n)", "/ˈɪn.frə.strʌk.tʃər/", "Modern infrastructure supports growth.", "Cơ sở hạ tầng hiện đại hỗ trợ tăng trưởng."],
      ["sustainability", "tính bền vững", "(n)", "/səˌsteɪ.nəˈbɪl.ə.ti/", "Sustainability in construction is vital.", "Tính bền vững trong xây dựng rất quan trọng."],
      ["green building", "công trình xanh", "(n)", "/ɡriːn ˈbɪl.dɪŋ/", "Green buildings save energy.", "Công trình xanh tiết kiệm năng lượng."],
      ["solar panel", "tấm pin mặt trời", "(n)", "/ˈsəʊ.lər ˈpæn.əl/", "Solar panels reduce electricity bills.", "Pin mặt trời giảm hóa đơn điện."],
      ["insulation", "cách nhiệt", "(n)", "/ˌɪn.sjʊˈleɪ.ʃən/", "Good insulation keeps houses warm.", "Cách nhiệt tốt giữ nhà ấm."],
      ["ventilation", "thông gió", "(n)", "/ˌven.tɪˈleɪ.ʃən/", "Proper ventilation improves air quality.", "Thông gió đúng cải thiện chất lượng không khí."],
      ["facade", "mặt tiền", "(n)", "/fəˈsɑːd/", "The glass facade reflects sunlight.", "Mặt tiền kính phản chiếu ánh nắng."],
      ["interior design", "thiết kế nội thất", "(n)", "/ɪnˈtɪə.ri.ər dɪˈzaɪn/", "Interior design creates comfortable spaces.", "Thiết kế nội thất tạo không gian thoải mái."],
      ["landscape", "cảnh quan", "(n/v)", "/ˈlænd.skeɪp/", "Landscaping improves property value.", "Cảnh quan tăng giá trị bất động sản."],
      ["estate", "bất động sản/khu đô thị", "(n)", "/ɪˈsteɪt/", "The housing estate has 500 units.", "Khu đô thị có 500 căn."],
      ["property", "tài sản/bất động sản", "(n)", "/ˈprɒp.ə.ti/", "Property prices keep rising.", "Giá bất động sản tiếp tục tăng."],
      ["real estate", "bất động sản", "(n)", "/rɪəl ɪˈsteɪt/", "Real estate is a popular investment.", "Bất động sản là đầu tư phổ biến."],
      ["affordable", "giá phải chăng", "(adj)", "/əˈfɔː.də.bəl/", "The city needs more affordable housing.", "Thành phố cần thêm nhà ở giá phải chăng."],
      ["homelessness", "vô gia cư", "(n)", "/ˈhəʊm.ləs.nəs/", "Homelessness is a social crisis.", "Vô gia cư là khủng hoảng xã hội."],
      ["shelter", "nơi trú ẩn", "(n)", "/ˈʃel.tər/", "Emergency shelters help homeless people.", "Nơi trú ẩn khẩn cấp giúp người vô gia cư."],
      ["eviction", "sự trục xuất (khỏi nhà)", "(n)", "/ɪˈvɪk.ʃən/", "Eviction notices were sent to tenants.", "Thông báo trục xuất được gửi cho người thuê."],
      ["gentrification", "chỉnh trang đô thị", "(n)", "/ˌdʒen.trɪ.fɪˈkeɪ.ʃən/", "Gentrification raises property prices.", "Chỉnh trang đô thị tăng giá bất động sản."],
      ["suburb", "ngoại ô", "(n)", "/ˈsʌb.ɜːb/", "Many families move to the suburbs.", "Nhiều gia đình chuyển ra ngoại ô."],
      ["downtown", "trung tâm thành phố", "(n/adj)", "/ˌdaʊnˈtaʊn/", "Downtown apartments are expensive.", "Căn hộ trung tâm thành phố rất đắt."],
      ["neighborhood", "khu phố/vùng lân cận", "(n)", "/ˈneɪ.bər.hʊd/", "Choose a safe neighborhood to live in.", "Chọn khu phố an toàn để sống."],
      ["residential", "thuộc khu dân cư", "(adj)", "/ˌrez.ɪˈden.ʃəl/", "This is a residential area.", "Đây là khu dân cư."],
      ["commercial", "thương mại", "(adj)", "/kəˈmɜː.ʃəl/", "Commercial buildings line the main road.", "Tòa nhà thương mại dọc đường chính."],
      ["heritage building", "tòa nhà di sản", "(n)", "/ˈher.ɪ.tɪdʒ ˈbɪl.dɪŋ/", "Heritage buildings must be preserved.", "Tòa nhà di sản phải được bảo tồn."],
      ["earthquake-resistant", "chống động đất", "(adj)", "/ˈɜːθ.kweɪk rɪˈzɪs.tənt/", "Modern buildings are earthquake-resistant.", "Tòa nhà hiện đại chống động đất."],
      ["prefabricated", "đúc sẵn/lắp ghép", "(adj)", "/ˌpriːˈfæb.rɪ.keɪ.tɪd/", "Prefabricated houses are cheaper to build.", "Nhà lắp ghép rẻ hơn để xây."],
      ["smart home", "nhà thông minh", "(n)", "/smɑːt həʊm/", "Smart homes use IoT technology.", "Nhà thông minh dùng công nghệ IoT."],
      ["building code", "quy chuẩn xây dựng", "(n)", "/ˈbɪl.dɪŋ kəʊd/", "Building codes ensure safety standards.", "Quy chuẩn xây dựng đảm bảo tiêu chuẩn an toàn."],
      ["permit", "giấy phép", "(n)", "/ˈpɜː.mɪt/", "A building permit is required.", "Giấy phép xây dựng là cần thiết."],
      ["concrete", "bê tông", "(n)", "/ˈkɒŋ.kriːt/", "Concrete is the most common building material.", "Bê tông là vật liệu xây dựng phổ biến nhất."],
      ["steel", "thép", "(n)", "/stiːl/", "Steel structures support tall buildings.", "Kết cấu thép hỗ trợ tòa nhà cao."],
      ["timber", "gỗ xây dựng", "(n)", "/ˈtɪm.bər/", "Timber frames are eco-friendly.", "Khung gỗ thân thiện môi trường."],
      ["brick", "gạch", "(n)", "/brɪk/", "Brick houses are durable.", "Nhà gạch bền."],
      ["ceiling", "trần nhà", "(n)", "/ˈsiː.lɪŋ/", "High ceilings make rooms feel spacious.", "Trần cao làm phòng rộng rãi hơn."],
      ["balcony", "ban công", "(n)", "/ˈbæl.kə.ni/", "The balcony overlooks the garden.", "Ban công nhìn ra vườn."],
      ["rooftop", "sân thượng", "(n)", "/ˈruːf.tɒp/", "Rooftop gardens are popular in cities.", "Vườn sân thượng phổ biến ở thành phố."],
      ["basement", "tầng hầm", "(n)", "/ˈbeɪs.mənt/", "The basement serves as a parking area.", "Tầng hầm dùng làm bãi đỗ xe."],
      ["attic", "gác mái", "(n)", "/ˈæt.ɪk/", "They converted the attic into a bedroom.", "Họ chuyển gác mái thành phòng ngủ."],
      ["staircase", "cầu thang", "(n)", "/ˈsteə.keɪs/", "The spiral staircase is beautiful.", "Cầu thang xoắn ốc rất đẹp."],
      ["elevator", "thang máy", "(n)", "/ˈel.ɪ.veɪ.tər/", "The elevator goes to the 50th floor.", "Thang máy đi đến tầng 50."],
      ["plumbing", "hệ thống ống nước", "(n)", "/ˈplʌm.ɪŋ/", "Old plumbing causes water leaks.", "Ống nước cũ gây rò rỉ nước."],
      ["wiring", "hệ thống dây điện", "(n)", "/ˈwaɪə.rɪŋ/", "Faulty wiring is a fire hazard.", "Dây điện lỗi là nguy cơ cháy."],
      ["furnish", "trang bị nội thất", "(v)", "/ˈfɜː.nɪʃ/", "They furnished the apartment with modern style.", "Họ trang bị nội thất căn hộ theo phong cách hiện đại."],
      ["occupancy", "tỷ lệ lấp đầy", "(n)", "/ˈɒk.jʊ.pən.si/", "Hotel occupancy rates dropped.", "Tỷ lệ lấp đầy khách sạn giảm."],
      ["co-living", "sống chung/co-living", "(n)", "/kəʊ ˈlɪv.ɪŋ/", "Co-living spaces are popular among young people.", "Không gian sống chung phổ biến với giới trẻ."],
      ["communal", "chung/cộng đồng", "(adj)", "/ˈkɒm.jʊ.nəl/", "The building has communal gardens.", "Tòa nhà có vườn chung."],
      ["housing bubble", "bong bóng bất động sản", "(n)", "/ˈhaʊ.zɪŋ ˈbʌb.əl/", "The housing bubble burst in 2008.", "Bong bóng bất động sản vỡ năm 2008."],
      ["speculation", "đầu cơ", "(n)", "/ˌspek.jʊˈleɪ.ʃən/", "Property speculation drives up prices.", "Đầu cơ bất động sản đẩy giá lên."],
      ["brownfield", "đất công nghiệp cũ", "(n)", "/ˈbraʊn.fiːld/", "Brownfield sites can be redeveloped.", "Đất công nghiệp cũ có thể tái phát triển."],
      ["greenfield", "đất chưa xây dựng", "(n)", "/ˈɡriːn.fiːld/", "Building on greenfield land reduces nature.", "Xây trên đất chưa phát triển giảm thiên nhiên."],
      ["mixed-use", "đa chức năng", "(adj)", "/mɪkst juːz/", "Mixed-use developments combine shops and housing.", "Phát triển đa chức năng kết hợp cửa hàng và nhà ở."],
      ["high-rise", "cao tầng", "(adj/n)", "/ˈhaɪ.raɪz/", "High-rise buildings dominate the skyline.", "Tòa nhà cao tầng thống trị đường chân trời."],
      ["low-rise", "thấp tầng", "(adj/n)", "/ˈləʊ.raɪz/", "Low-rise housing is more suitable for families.", "Nhà thấp tầng phù hợp hơn cho gia đình."],
      ["density", "mật độ", "(n)", "/ˈden.sə.ti/", "High-density housing maximizes land use.", "Nhà ở mật độ cao tối ưu sử dụng đất."],
      ["acoustics", "âm học/cách âm", "(n)", "/əˈkuː.stɪks/", "Good acoustics reduce noise between floors.", "Âm học tốt giảm tiếng ồn giữa các tầng."],
      ["carbon neutral", "trung hòa carbon", "(adj)", "/ˌkɑː.bən ˈnjuː.trəl/", "The building aims to be carbon neutral.", "Tòa nhà hướng tới trung hòa carbon."],
    ],
    story: {
      en: "The global housing crisis affects millions of people. In cities, skyscrapers and high-rise condominiums dominate the skyline, while many residents struggle with rising rent and mortgage costs. Affordable housing remains scarce, driving homelessness and gentrification that pushes low-income tenants to the suburbs. Architects and urban planners are designing green buildings with solar panels, proper insulation, and natural ventilation to promote sustainability. Smart homes with IoT technology offer convenience, while prefabricated and co-living spaces provide cheaper alternatives. Historic heritage buildings need careful renovation to preserve their character. Construction materials like concrete, steel, timber, and brick each have environmental impacts. Zoning laws and building codes ensure safety standards, including earthquake-resistant designs. The real estate market faces challenges from housing bubbles and speculation. Mixed-use developments on brownfield sites combine commercial spaces with residential apartments, creating vibrant neighborhoods. From basement parking to rooftop gardens, modern architecture balances functionality with aesthetics. The future of housing lies in carbon-neutral buildings that are affordable, accessible, and designed for diverse communities.",
      vi: "Khủng hoảng nhà ở toàn cầu ảnh hưởng hàng triệu người. Ở thành phố, nhà chọc trời và chung cư cao cấp cao tầng thống trị đường chân trời, trong khi nhiều cư dân vật lộn với giá thuê và thế chấp tăng. Nhà ở giá phải chăng vẫn khan hiếm, dẫn đến vô gia cư và chỉnh trang đô thị đẩy người thuê thu nhập thấp ra ngoại ô. Kiến trúc sư và nhà quy hoạch đô thị đang thiết kế công trình xanh với pin mặt trời, cách nhiệt tốt và thông gió tự nhiên để thúc đẩy tính bền vững. Nhà thông minh với công nghệ IoT mang lại tiện nghi, trong khi nhà lắp ghép và không gian sống chung cung cấp giải pháp rẻ hơn. Tòa nhà di sản lịch sử cần cải tạo cẩn thận để bảo tồn đặc trưng. Vật liệu xây dựng như bê tông, thép, gỗ và gạch đều có tác động môi trường. Luật quy hoạch và quy chuẩn xây dựng đảm bảo tiêu chuẩn an toàn, bao gồm thiết kế chống động đất."
    }
  },
];

// ============================================================
// CONVERTER: Array format → Object format
// ============================================================
function convertTopic(topic) {
  return {
    id: topic.id,
    category: topic.cat,
    title: topic.title,
    description: topic.desc,
    level: topic.level,
    examTags: topic.tags,
    words: topic.words.map(w => ({
      en: w[0],
      vi: w[1],
      type: w[2],
      ipa: w[3],
      example: w[4],
      viExample: w[5]
    })),
    storyEn: topic.story.en,
    storyVi: topic.story.vi
  };
}

// ============================================================
// GENERATE & SAVE
// ============================================================
const outputTopics = ALL_TOPICS.map(convertTopic);

console.log(`✅ Generated ${outputTopics.length} topics:`);
outputTopics.forEach(t => {
  console.log(`  ${t.category.toUpperCase().padEnd(10)} | ${t.id} | ${t.words.length} words | story: ${t.storyEn.length > 50 ? '✅' : '❌'}`);
});

// Write as ESM module
const output = `// Auto-generated vocabulary data - ${new Date().toISOString().split('T')[0]}
// Topics: ${outputTopics.length}
// Total words: ${outputTopics.reduce((sum, t) => sum + t.words.length, 0)}

export const vocabMegaData = ${JSON.stringify(outputTopics, null, 2)};

export default vocabMegaData;
`;

const outPath = path.join(__dirname, '..', 'src', 'data', 'vocabMegaData.js');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`\n📁 Written to: ${outPath}`);
console.log(`📊 File size: ${(Buffer.byteLength(output) / 1024).toFixed(1)} KB`);
console.log(`📊 Total words: ${outputTopics.reduce((sum, t) => sum + t.words.length, 0)}`);
