import fs from 'fs';

const rawUnits = [
  {
    unitNum: 1, title: "Unit 1: Abbreviations and acronyms", description: "Học cách sử dụng từ viết tắt (Abbreviations) và từ cấu tạo từ chữ cái đầu (Acronyms) thông dụng.", buckets: ["Abbreviations (Viết tắt)", "Acronyms (Chữ cái đầu)"],
    words: [
      { word: "FAQ", type: "Danh từ", phonetic: "/ˌef.eɪˈkjuː/", vi: "câu hỏi thường gặp", example: "If you have any problems, please check the FAQ section.", bucket: 1 },
      { word: "ASAP", type: "Trạng từ", phonetic: "/ˌeɪ.es.eɪˈpiː/", vi: "càng sớm càng tốt", example: "Please send me the report ASAP.", bucket: 1 },
      { word: "o.n.o.", type: "Cụm viết tắt", phonetic: "/ˌəʊ.enˈəʊ/", vi: "hoặc mức giá gần nhất (or near offer)", example: "Bicycle for sale, £50 o.n.o.", bucket: 0 },
      { word: "RSVP", type: "Động từ", phonetic: "/ˌɑːr.es.viːˈpiː/", vi: "vui lòng phúc đáp", example: "Please RSVP by the end of the month.", bucket: 0 },
      { word: "ID", type: "Danh từ", phonetic: "/ˌaɪˈdiː/", vi: "chứng minh thư, thẻ căn cước", example: "You must show your ID at the entrance.", bucket: 0 },
      { word: "DOB", type: "Danh từ", phonetic: "/ˌdiː.əʊˈbiː/", vi: "ngày tháng năm sinh", example: "Please write your DOB on the application form.", bucket: 1 },
      { word: "AWOL", type: "Tính từ", phonetic: "/ˈeɪ.wɒl/", vi: "vắng mặt không phép (quân đội)", example: "The soldier went AWOL during the training.", bucket: 1 },
      { word: "PR", type: "Danh từ", phonetic: "/ˌpiːˈɑːr/", vi: "quan hệ công chúng", example: "He works in the PR department of a large company.", bucket: 0 }
    ]
  },
  {
    unitNum: 2, title: "Unit 2: Prefixes: creating new meanings", description: "Tiền tố giúp thay đổi ý nghĩa của từ gốc (over-, cross-, e-).", buckets: ["Prefix 'over-' (Quá mức)", "Other prefixes (Tiền tố khác)"],
    words: [
      { word: "overestimate", type: "Động từ", phonetic: "/ˌəʊ.vəˈres.tɪ.meɪt/", vi: "đánh giá quá cao", example: "Never overestimate your enemy's weakness.", bucket: 0 },
      { word: "overrated", type: "Tính từ", phonetic: "/ˌəʊ.vəˈreɪ.tɪd/", vi: "được đánh giá quá cao (so với thực tế)", example: "I think that movie is highly overrated.", bucket: 0 },
      { word: "cross-cultural", type: "Tính từ", phonetic: "/ˌkrɒsˈkʌl.tʃər.əl/", vi: "giao thoa văn hóa", example: "Cross-cultural communication is important in business.", bucket: 1 },
      { word: "e-commerce", type: "Danh từ", phonetic: "/ˈiːˌkɒm.ɜːs/", vi: "thương mại điện tử", example: "E-commerce has completely changed the retail industry.", bucket: 1 },
      { word: "outnumber", type: "Động từ", phonetic: "/ˌaʊtˈnʌm.bər/", vi: "áp đảo về số lượng", example: "In this class, the girls outnumber the boys.", bucket: 1 },
      { word: "pseudo-science", type: "Danh từ", phonetic: "/ˈsjuː.dəʊˌsaɪ.əns/", vi: "ngụy khoa học", example: "Astrology is widely considered a pseudo-science.", bucket: 1 },
      { word: "overworked", type: "Tính từ", phonetic: "/ˌəʊ.vəˈwɜːkt/", vi: "làm việc quá sức", example: "The hospital staff are underpaid and overworked.", bucket: 0 },
      { word: "overhaul", type: "Động từ", phonetic: "/ˈəʊ.və.hɔːl/", vi: "đại tu, kiểm tra kỹ lưỡng", example: "The government plans to overhaul the healthcare system.", bucket: 0 }
    ]
  },
  {
    unitNum: 3, title: "Unit 3: Suffixes: productive suffixes and word classes", description: "Sử dụng hậu tố để tạo ra từ loại và ý nghĩa mới (-free, -proof, -esque).", buckets: ["Suffix '-free' & '-proof'", "Other suffixes"],
    words: [
      { word: "tax-free", type: "Tính từ", phonetic: "/ˌtæksˈfriː/", vi: "miễn thuế", example: "You can buy tax-free goods at the airport.", bucket: 0 },
      { word: "waterproof", type: "Tính từ", phonetic: "/ˈwɔː.tə.pruːf/", vi: "chống thấm nước", example: "I need a waterproof jacket for the hiking trip.", bucket: 0 },
      { word: "bulletproof", type: "Tính từ", phonetic: "/ˈbʊl.ɪt.pruːf/", vi: "chống đạn", example: "The president's car has bulletproof glass.", bucket: 0 },
      { word: "sugar-free", type: "Tính từ", phonetic: "/ˈʃʊɡ.əˌfriː/", vi: "không đường", example: "She only drinks sugar-free cola.", bucket: 0 },
      { word: "picturesque", type: "Tính từ", phonetic: "/ˌpɪk.tʃərˈesk/", vi: "đẹp như tranh vẽ", example: "They live in a picturesque village in the mountains.", bucket: 1 },
      { word: "Kafkaesque", type: "Tính từ", phonetic: "/ˌkæf.kəˈesk/", vi: "kỳ quái, phức tạp khó hiểu (như truyện Kafka)", example: "The bureaucracy of the company is truly Kafkaesque.", bucket: 1 },
      { word: "washable", type: "Tính từ", phonetic: "/ˈwɒʃ.ə.bəl/", vi: "có thể giặt được", example: "Is this silk scarf machine washable?", bucket: 1 },
      { word: "newsworthy", type: "Tính từ", phonetic: "/ˈnjuːzˌwɜː.ði/", vi: "đáng đưa tin", example: "The scandal was highly newsworthy.", bucket: 1 }
    ]
  },
  {
    unitNum: 4, title: "Unit 4: Word-building and word-blending", description: "Tạo từ vựng mới bằng cách ghép và trộn các từ (Word-blending).", buckets: ["Blended words (Từ trộn)", "Compound words (Từ ghép)"],
    words: [
      { word: "biodegradable", type: "Tính từ", phonetic: "/ˌbaɪ.əʊ.dɪˈɡreɪ.də.bəl/", vi: "có thể phân hủy sinh học", example: "We use biodegradable packaging for our products.", bucket: 1 },
      { word: "cybercafé", type: "Danh từ", phonetic: "/ˈsaɪ.bəˌkæf.eɪ/", vi: "quán cà phê internet", example: "He checked his emails at a local cybercafé.", bucket: 1 },
      { word: "guesstimate", type: "Danh từ", phonetic: "/ˈɡes.tɪ.mət/", vi: "sự ước lượng phỏng đoán (guess + estimate)", example: "My guesstimate is that it will take three hours.", bucket: 0 },
      { word: "brunch", type: "Danh từ", phonetic: "/brʌntʃ/", vi: "bữa ăn trưa sớm (breakfast + lunch)", example: "We had a delicious brunch on Sunday.", bucket: 0 },
      { word: "motel", type: "Danh từ", phonetic: "/məʊˈtel/", vi: "nhà nghỉ ven đường (motor + hotel)", example: "We stopped at a motel on the highway.", bucket: 0 },
      { word: "smog", type: "Danh từ", phonetic: "/smɒɡ/", vi: "khói bụi ô nhiễm (smoke + fog)", example: "The city was covered in a thick layer of smog.", bucket: 0 },
      { word: "brainwash", type: "Động từ", phonetic: "/ˈbreɪn.wɒʃ/", vi: "tẩy não", example: "The cult members were totally brainwashed.", bucket: 1 },
      { word: "troubleshoot", type: "Động từ", phonetic: "/ˈtrʌb.əl.ʃuːt/", vi: "khắc phục sự cố", example: "IT support will help you troubleshoot the software problem.", bucket: 1 }
    ]
  },
  {
    unitNum: 5, title: "Unit 5: Global contact and language enrichment", description: "Từ mượn (loan words) từ các ngôn ngữ khác giúp làm phong phú tiếng Anh.", buckets: ["Loan words (Từ mượn)", "Cultural words (Từ văn hóa)"],
    words: [
      { word: "loan word", type: "Cụm danh từ", phonetic: "/ˈləʊn ˌwɜːd/", vi: "từ mượn (từ ngôn ngữ khác)", example: "The English language has many loan words from French.", bucket: 0 },
      { word: "roster", type: "Danh từ", phonetic: "/ˈrɒs.tər/", vi: "bảng phân công (gốc Hà Lan)", example: "Check the duty roster to see when you are working.", bucket: 0 },
      { word: "intelligentsia", type: "Danh từ", phonetic: "/ɪnˌtel.ɪˈdʒent.si.ə/", vi: "tầng lớp trí thức (gốc Nga)", example: "The intelligentsia of the country opposed the war.", bucket: 1 },
      { word: "karaoke", type: "Danh từ", phonetic: "/ˌkær.iˈəʊ.ki/", vi: "karaoke (gốc Nhật)", example: "We sang karaoke until late at night.", bucket: 1 },
      { word: "macho", type: "Tính từ", phonetic: "/ˈmætʃ.əʊ/", vi: "nam tính, gia trưởng (gốc Tây Ban Nha)", example: "He has a very macho attitude.", bucket: 0 },
      { word: "bazaar", type: "Danh từ", phonetic: "/bəˈzɑːr/", vi: "khu chợ (gốc Ba Tư)", example: "We bought some spices at the grand bazaar.", bucket: 1 },
      { word: "guru", type: "Danh từ", phonetic: "/ˈɡʊr.uː/", vi: "chuyên gia, bậc thầy (gốc Hindi)", example: "He is a management guru who writes best-selling books.", bucket: 0 },
      { word: "paparazzi", type: "Danh từ", phonetic: "/ˌpæp.ərˈæt.si/", vi: "thợ săn ảnh (gốc Ý)", example: "The princess was chased by the paparazzi.", bucket: 1 }
    ]
  },
  {
    unitNum: 6, title: "Unit 6: Similar but different: words easily confused", description: "Phân biệt những cặp từ có cách viết hoặc phát âm giống nhau nhưng khác nghĩa.", buckets: ["Easily confused (Dễ nhầm lẫn)", "Nuances (Sắc thái)"],
    words: [
      { word: "series", type: "Danh từ", phonetic: "/ˈsɪə.riːz/", vi: "chuỗi, loạt (sự kiện, phim độc lập)", example: "They released a new series of comedy films.", bucket: 0 },
      { word: "serial", type: "Danh từ", phonetic: "/ˈsɪə.ri.əl/", vi: "phim/truyện dài kỳ (cốt truyện tiếp nối)", example: "The television serial ended with a massive cliffhanger.", bucket: 0 },
      { word: "moist", type: "Tính từ", phonetic: "/mɔɪst/", vi: "ẩm ướt (mang nghĩa tích cực, như bánh kem)", example: "The chocolate cake was perfectly moist.", bucket: 1 },
      { word: "damp", type: "Tính từ", phonetic: "/dæmp/", vi: "ẩm thấp (mang nghĩa tiêu cực)", example: "The old basement was cold and damp.", bucket: 1 },
      { word: "historic", type: "Tính từ", phonetic: "/hɪˈstɒr.ɪk/", vi: "có tính lịch sử, quan trọng", example: "The two leaders signed a historic peace treaty.", bucket: 0 },
      { word: "historical", type: "Tính từ", phonetic: "/hɪˈstɒr.ɪ.kəl/", vi: "thuộc về lịch sử (tài liệu, sự kiện cũ)", example: "She loves reading historical novels.", bucket: 0 },
      { word: "economic", type: "Tính từ", phonetic: "/ˌiː.kəˈnɒm.ɪk/", vi: "thuộc về kinh tế", example: "The country is facing a severe economic crisis.", bucket: 1 },
      { word: "economical", type: "Tính từ", phonetic: "/ˌiː.kəˈnɒm.ɪ.kəl/", vi: "tiết kiệm (chi phí)", example: "It is much more economical to travel by bus.", bucket: 1 }
    ]
  },
  {
    unitNum: 7, title: "Unit 7: At work: colleagues and routines", description: "Từ vựng về đồng nghiệp, các kiểu giờ giấc và thói quen làm việc.", buckets: ["Work routines (Lịch làm việc)", "Employment (Việc làm)"],
    words: [
      { word: "flexi-time", type: "Danh từ", phonetic: "/ˈflek.siˌtaɪm/", vi: "thời gian làm việc linh hoạt", example: "Working flexi-time allows me to pick up my kids from school.", bucket: 0 },
      { word: "freelance", type: "Tính từ", phonetic: "/ˈfriː.lɑːns/", vi: "làm việc tự do", example: "She is a freelance graphic designer.", bucket: 0 },
      { word: "job-share", type: "Danh từ", phonetic: "/ˈdʒɒb.ʃeər/", vi: "chia sẻ công việc (hai người chia 1 vị trí)", example: "We decided to do a job-share so we both have time for our babies.", bucket: 0 },
      { word: "shift work", type: "Cụm danh từ", phonetic: "/ˈʃɪft ˌwɜːk/", vi: "làm việc theo ca", example: "Shift work can completely ruin your sleep schedule.", bucket: 0 },
      { word: "colleague", type: "Danh từ", phonetic: "/ˈkɒl.iːɡ/", vi: "đồng nghiệp", example: "My colleagues threw a farewell party for me.", bucket: 1 },
      { word: "commute", type: "Động từ", phonetic: "/kəˈmjuːt/", vi: "đi lại (từ nhà tới chỗ làm)", example: "I have to commute two hours every day.", bucket: 1 },
      { word: "workaholic", type: "Danh từ", phonetic: "/ˌwɜː.kəˈhɒl.ɪk/", vi: "người nghiện công việc", example: "My boss is a true workaholic; he never takes a day off.", bucket: 1 },
      { word: "burnout", type: "Danh từ", phonetic: "/ˈbɜːn.aʊt/", vi: "sự kiệt sức do công việc", example: "Taking regular breaks prevents severe burnout.", bucket: 1 }
    ]
  },
  {
    unitNum: 8, title: "Unit 8: At work: career and promotion", description: "Quá trình thăng tiến, các đặc quyền và những rào cản trong sự nghiệp.", buckets: ["Career growth (Thăng tiến)", "Work conditions (Điều kiện)"],
    words: [
      { word: "drive", type: "Danh từ", phonetic: "/draɪv/", vi: "động lực, sự quyết tâm", example: "She has the drive to succeed in her career.", bucket: 0 },
      { word: "perks", type: "Danh từ", phonetic: "/pɜːks/", vi: "đặc quyền, phúc lợi thêm", example: "Free gym membership is one of the perks of the job.", bucket: 0 },
      { word: "glass ceiling", type: "Cụm danh từ", phonetic: "/ˌɡlɑːs ˈsiː.lɪŋ/", vi: "rào cản vô hình (cản trở phụ nữ/thiểu số thăng tiến)", example: "Many women struggle to break through the glass ceiling in business.", bucket: 0 },
      { word: "promotion", type: "Danh từ", phonetic: "/prəˈməʊ.ʃən/", vi: "sự thăng chức", example: "He worked hard to earn his promotion.", bucket: 0 },
      { word: "lucrative", type: "Tính từ", phonetic: "/ˈluː.krə.tɪv/", vi: "sinh lời cao", example: "He left to pursue a highly lucrative career in finance.", bucket: 1 },
      { word: "lay off", type: "Cụm động từ", phonetic: "/leɪ ɒf/", vi: "sa thải (do dư thừa nhân sự)", example: "The company had to lay off a hundred workers.", bucket: 1 },
      { word: "resign", type: "Động từ", phonetic: "/rɪˈzaɪn/", vi: "từ chức", example: "The scandal forced the minister to resign.", bucket: 1 },
      { word: "headhunter", type: "Danh từ", phonetic: "/ˈhedˌhʌn.tər/", vi: "chuyên gia săn đầu người (tuyển dụng)", example: "A corporate headhunter offered him a CEO position.", bucket: 1 }
    ]
  },
  {
    unitNum: 9, title: "Unit 9: Business 1", description: "Từ vựng kinh doanh cốt lõi về thị trường và tinh thần doanh nhân.", buckets: ["Markets (Thị trường)", "Enterprise (Khởi nghiệp)"],
    words: [
      { word: "telemarketing", type: "Danh từ", phonetic: "/ˈtel.ɪˌmɑː.kɪ.tɪŋ/", vi: "tiếp thị qua điện thoại", example: "I hate receiving telemarketing calls at dinner time.", bucket: 0 },
      { word: "niche market", type: "Cụm danh từ", phonetic: "/ˈniːʃ ˌmɑː.kɪt/", vi: "thị trường ngách", example: "They found a profitable niche market selling vegan shoes.", bucket: 0 },
      { word: "entrepreneurship", type: "Danh từ", phonetic: "/ˌɒn.trə.prəˈnɜː.ʃɪp/", vi: "tinh thần khởi nghiệp", example: "The university promotes a culture of entrepreneurship.", bucket: 1 },
      { word: "startup", type: "Danh từ", phonetic: "/ˈstɑːt.ʌp/", vi: "công ty khởi nghiệp", example: "She invested her savings in a tech startup.", bucket: 1 },
      { word: "monopoly", type: "Danh từ", phonetic: "/məˈnɒp.əl.i/", vi: "sự độc quyền", example: "The state owns a monopoly on tobacco sales.", bucket: 0 },
      { word: "brand awareness", type: "Cụm danh từ", phonetic: "/brænd əˈweə.nəs/", vi: "nhận diện thương hiệu", example: "The ad campaign successfully increased brand awareness.", bucket: 0 },
      { word: "merger", type: "Danh từ", phonetic: "/ˈmɜː.dʒər/", vi: "sự sáp nhập công ty", example: "The merger between the two banks was approved.", bucket: 1 },
      { word: "turnover", type: "Danh từ", phonetic: "/ˈtɜːnˌəʊ.vər/", vi: "doanh thu / tỉ lệ thay thế nhân sự", example: "The company has an annual turnover of $5 million.", bucket: 1 }
    ]
  },
  {
    unitNum: 10, title: "Unit 10: Business 2", description: "Thao tác kinh tế, đấu thầu, rủi ro và các cam kết tài chính.", buckets: ["Finance (Tài chính)", "Contracts (Hợp đồng)"],
    words: [
      { word: "submit a tender", type: "Cụm từ", phonetic: "/səbˈmɪt ə ˈten.dər/", vi: "nộp hồ sơ đấu thầu", example: "Five companies submitted a tender for the bridge construction.", bucket: 1 },
      { word: "default on a payment", type: "Cụm từ", phonetic: "/dɪˈfɒlt ɒn ə ˈpeɪ.mənt/", vi: "vỡ nợ, không trả được nợ", example: "If you default on a payment, they will seize your house.", bucket: 0 },
      { word: "liquidate", type: "Động từ", phonetic: "/ˈlɪk.wɪ.deɪt/", vi: "thanh lý tài sản", example: "The bankrupt company had to liquidate its assets.", bucket: 0 },
      { word: "subsidy", type: "Danh từ", phonetic: "/ˈsʌb.sɪ.di/", vi: "tiền trợ cấp (của chính phủ)", example: "The farmers receive an agricultural subsidy.", bucket: 0 },
      { word: "audit", type: "Danh từ", phonetic: "/ˈɔː.dɪt/", vi: "sự kiểm toán", example: "An independent audit revealed massive financial fraud.", bucket: 1 },
      { word: "liability", type: "Danh từ", phonetic: "/ˌlaɪ.əˈbɪl.ə.ti/", vi: "khoản nợ pháp lý, nghĩa vụ", example: "The business has more liabilities than assets.", bucket: 1 },
      { word: "outsource", type: "Động từ", phonetic: "/ˈaʊt.sɔːs/", vi: "thuê ngoài (để tiết kiệm chi phí)", example: "Many tech companies outsource their customer service.", bucket: 0 },
      { word: "fluctuate", type: "Động từ", phonetic: "/ˈflʌk.tʃu.eɪt/", vi: "dao động", example: "Currency exchange rates fluctuate every day.", bucket: 1 }
    ]
  },
  {
    unitNum: 11, title: "Unit 11: Cramming for success: study and academic work", description: "Quá trình học tập, luyện thi, và áp lực học thuật.", buckets: ["Study habits (Thói quen học)", "Assignments (Bài tập)"],
    words: [
      { word: "rote-learning", type: "Danh từ", phonetic: "/ˈrəʊt ˌlɜː.nɪŋ/", vi: "học vẹt", example: "Rote-learning is not effective for understanding complex theories.", bucket: 0 },
      { word: "assignment", type: "Danh từ", phonetic: "/əˈsaɪn.mənt/", vi: "bài tập lớn, nhiệm vụ", example: "I have to finish my history assignment tonight.", bucket: 1 },
      { word: "deadline", type: "Danh từ", phonetic: "/ˈded.laɪn/", vi: "hạn chót", example: "The deadline to submit your essay is Friday.", bucket: 1 },
      { word: "cram", type: "Động từ", phonetic: "/kræm/", vi: "học nhồi nhét (trước kỳ thi)", example: "She had to cram all night for the final exam.", bucket: 0 },
      { word: "plagiarism", type: "Danh từ", phonetic: "/ˈpleɪ.dʒər.ɪ.zəm/", vi: "sự đạo văn", example: "Plagiarism is heavily punished in the university.", bucket: 0 },
      { word: "curriculum", type: "Danh từ", phonetic: "/kəˈrɪk.jə.ləm/", vi: "chương trình giảng dạy", example: "Coding has been added to the school curriculum.", bucket: 1 },
      { word: "tuition fee", type: "Cụm danh từ", phonetic: "/tʃuːˈɪʃ.ən fiː/", vi: "học phí", example: "The university increased its tuition fee this year.", bucket: 1 },
      { word: "comprehensive", type: "Tính từ", phonetic: "/ˌkɒm.prɪˈhen.sɪv/", vi: "toàn diện", example: "The students have to pass a comprehensive exam.", bucket: 0 }
    ]
  },
  {
    unitNum: 12, title: "Unit 12: Education: debates and issues", description: "Các cuộc tranh luận về chính sách và vấn đề trong ngành giáo dục.", buckets: ["Issues (Vấn đề)", "Debates (Tranh luận)"],
    words: [
      { word: "elitism", type: "Danh từ", phonetic: "/ɪˈliː.tɪ.zəm/", vi: "chủ nghĩa tinh hoa (ưu tiên người giỏi/giàu)", example: "The university has been accused of academic elitism.", bucket: 0 },
      { word: "league tables", type: "Cụm danh từ", phonetic: "/ˈliːɡ ˌteɪ.bəlz/", vi: "bảng xếp hạng (trường học)", example: "Parents often look at school league tables to choose a school.", bucket: 0 },
      { word: "the three Rs", type: "Cụm danh từ", phonetic: "/ðə θriː ɑːrz/", vi: "kỹ năng cơ bản (Reading, wRiting, aRithmetic)", example: "Primary education should heavily focus on the three Rs.", bucket: 0 },
      { word: "streaming", type: "Danh từ", phonetic: "/ˈstriː.mɪŋ/", vi: "sự phân lớp theo năng lực", example: "Streaming students by ability is a highly controversial policy.", bucket: 1 },
      { word: "literacy", type: "Danh từ", phonetic: "/ˈlɪt.ər.ə.si/", vi: "sự biết đọc, biết viết", example: "The country's adult literacy rate is very high.", bucket: 1 },
      { word: "truancy", type: "Danh từ", phonetic: "/ˈtruː.ən.si/", vi: "sự trốn học", example: "Truancy is a major problem in some urban schools.", bucket: 1 },
      { word: "bursary", type: "Danh từ", phonetic: "/ˈbɜː.sər.i/", vi: "tiền trợ cấp học tập (cho người nghèo)", example: "He won a bursary to study at the college.", bucket: 0 },
      { word: "pedagogy", type: "Danh từ", phonetic: "/ˈped.ə.ɡɒdʒ.i/", vi: "sư phạm học, phương pháp giảng dạy", example: "Modern pedagogy emphasizes active student participation.", bucket: 1 }
    ]
  },
  {
    unitNum: 13, title: "Unit 13: Talking about yourself", description: "Từ vựng diễn tả năng lực và tính cách cá nhân một cách chuyên nghiệp.", buckets: ["Strengths (Thế mạnh)", "Traits (Đặc điểm)"],
    words: [
      { word: "diligent", type: "Tính từ", phonetic: "/ˈdɪl.ɪ.dʒənt/", vi: "siêng năng, cần mẫn", example: "She is a highly diligent and responsible worker.", bucket: 0 },
      { word: "shrewd", type: "Tính từ", phonetic: "/ʃruːd/", vi: "khôn ngoan, sắc sảo", example: "He is a shrewd businessman who rarely makes mistakes.", bucket: 0 },
      { word: "sagacious", type: "Tính từ", phonetic: "/səˈɡeɪ.ʃəs/", vi: "thông minh, uyên bác", example: "The old king was known for his sagacious advice.", bucket: 0 },
      { word: "articulate", type: "Tính từ", phonetic: "/ɑːˈtɪk.jə.lət/", vi: "có khả năng ăn nói lưu loát", example: "She is an articulate and persuasive speaker.", bucket: 0 },
      { word: "meticulous", type: "Tính từ", phonetic: "/məˈtɪk.jə.ləs/", vi: "tỉ mỉ, cực kỳ cẩn thận", example: "He is meticulous about keeping his desk clean.", bucket: 1 },
      { word: "introverted", type: "Tính từ", phonetic: "/ˈɪn.trə.vɜː.tɪd/", vi: "hướng nội", example: "As an introverted person, I prefer quiet evenings.", bucket: 1 },
      { word: "versatile", type: "Tính từ", phonetic: "/ˈvɜː.sə.taɪl/", vi: "đa tài, đa năng", example: "He is a highly versatile actor.", bucket: 1 },
      { word: "witty", type: "Tính từ", phonetic: "/ˈwɪt.i/", vi: "dí dỏm, thông minh", example: "She gave a witty and charming speech.", bucket: 1 }
    ]
  },
  {
    unitNum: 14, title: "Unit 14: Relationships: positive aspects", description: "Từ vựng miêu tả các khía cạnh tích cực trong tình yêu và tình bạn.", buckets: ["Romance (Tình yêu)", "Friendship (Tình bạn)"],
    words: [
      { word: "infatuated", type: "Tính từ", phonetic: "/ɪnˈfætʃ.u.eɪ.tɪd/", vi: "say đắm mù quáng", example: "He was completely infatuated with her beauty.", bucket: 0 },
      { word: "amiable", type: "Tính từ", phonetic: "/ˈeɪ.mi.ə.bəl/", vi: "nhã nhặn, hòa đồng", example: "She is an amiable person who makes friends easily.", bucket: 1 },
      { word: "kindred spirits", type: "Cụm danh từ", phonetic: "/ˌkɪn.drəd ˈspɪr.ɪts/", vi: "những tâm hồn đồng điệu", example: "We realized we were kindred spirits the moment we met.", bucket: 1 },
      { word: "devoted", type: "Tính từ", phonetic: "/dɪˈvəʊ.tɪd/", vi: "tận tâm, hết lòng", example: "He is a highly devoted husband and father.", bucket: 0 },
      { word: "affectionate", type: "Tính từ", phonetic: "/əˈfek.ʃən.ət/", vi: "âu yếm, thể hiện tình cảm", example: "Dogs are very affectionate pets.", bucket: 0 },
      { word: "inseparable", type: "Tính từ", phonetic: "/ɪnˈsep.ər.ə.bəl/", vi: "không thể tách rời", example: "Since childhood, the two girls have been inseparable.", bucket: 1 },
      { word: "fidelity", type: "Danh từ", phonetic: "/fɪˈdel.ə.ti/", vi: "sự chung thủy", example: "Fidelity is extremely important in a marriage.", bucket: 0 },
      { word: "platonic", type: "Tính từ", phonetic: "/pləˈtɒn.ɪk/", vi: "trong sáng, thuần khiết (tình bạn)", example: "They have a strictly platonic relationship.", bucket: 1 }
    ]
  },
  {
    unitNum: 15, title: "Unit 15: Relationships: problems", description: "Các mâu thuẫn, phản bội và sự rạn nứt trong các mối quan hệ.", buckets: ["Betrayal (Sự phản bội)", "Conflict (Xung đột)"],
    words: [
      { word: "disloyal", type: "Tính từ", phonetic: "/dɪsˈlɔɪ.əl/", vi: "bội bạc, không trung thành", example: "It was highly disloyal of him to reveal our secret.", bucket: 0 },
      { word: "unsupportive", type: "Tính từ", phonetic: "/ˌʌn.səˈpɔː.tɪv/", vi: "không ủng hộ, thiếu cảm thông", example: "Her husband was completely unsupportive of her career.", bucket: 0 },
      { word: "family feud", type: "Cụm danh từ", phonetic: "/ˈfæm.əl.i fjuːd/", vi: "mối thù truyền kiếp trong gia tộc", example: "The tragic play is based on a bitter family feud.", bucket: 1 },
      { word: "betrayal", type: "Danh từ", phonetic: "/bɪˈtreɪ.əl/", vi: "sự phản bội", example: "His sudden departure felt like a deep betrayal.", bucket: 0 },
      { word: "estranged", type: "Tính từ", phonetic: "/ɪˈstreɪndʒd/", vi: "ly thân, ghẻ lạnh", example: "He has been estranged from his wife for two years.", bucket: 1 },
      { word: "resentment", type: "Danh từ", phonetic: "/rɪˈzent.mənt/", vi: "sự oán giận", example: "She felt deep resentment towards her abusive boss.", bucket: 1 },
      { word: "toxic", type: "Tính từ", phonetic: "/ˈtɒk.sɪk/", vi: "độc hại (nghĩa bóng)", example: "It is best to walk away from a toxic relationship.", bucket: 1 },
      { word: "alienate", type: "Động từ", phonetic: "/ˈeɪ.li.ə.neɪt/", vi: "làm xa lánh", example: "His arrogant behavior alienated all his friends.", bucket: 0 }
    ]
  },
  {
    unitNum: 16, title: "Unit 16: Passions: reactions and emotions", description: "Từ vựng miêu tả cảm xúc mãnh liệt, sự hòa giải và niềm hân hoan.", buckets: ["Joy (Niềm vui)", "Reactions (Phản ứng)"],
    words: [
      { word: "conciliate", type: "Động từ", phonetic: "/kənˈsɪl.i.eɪt/", vi: "hòa giải, xoa dịu", example: "He tried to conciliate the angry customers.", bucket: 1 },
      { word: "rapture", type: "Danh từ", phonetic: "/ˈræp.tʃər/", vi: "sự sung sướng tột độ", example: "He listened to the beautiful music in pure rapture.", bucket: 0 },
      { word: "blissful", type: "Tính từ", phonetic: "/ˈblɪs.fəl/", vi: "hạnh phúc ngập tràn", example: "They spent a completely blissful week on the island.", bucket: 0 },
      { word: "ecstatic", type: "Tính từ", phonetic: "/ɪkˈstæt.ɪk/", vi: "vui sướng phát điên", example: "She was absolutely ecstatic when she won the prize.", bucket: 0 },
      { word: "euphoria", type: "Danh từ", phonetic: "/juːˈfɔː.ri.ə/", vi: "trạng thái hưng phấn, lâng lâng", example: "The runner felt a surge of euphoria as he crossed the finish line.", bucket: 0 },
      { word: "overwhelmed", type: "Tính từ", phonetic: "/ˌəʊ.vəˈwelmd/", vi: "choáng ngợp (bởi cảm xúc)", example: "I was completely overwhelmed by their kindness.", bucket: 1 },
      { word: "thrilled", type: "Tính từ", phonetic: "/θrɪld/", vi: "hào hứng, vô cùng thích thú", example: "I am absolutely thrilled to accept this award.", bucket: 1 },
      { word: "appease", type: "Động từ", phonetic: "/əˈpiːz/", vi: "nhượng bộ để dỗ dành", example: "They made sacrifices to appease the angry gods.", bucket: 1 }
    ]
  },
  {
    unitNum: 17, title: "Unit 17: Feelings: antipathies and aversions", description: "Các từ vựng về sự căm ghét, ác cảm và thái độ thất thường.", buckets: ["Hatred (Sự căm ghét)", "Instability (Thất thường)"],
    words: [
      { word: "abhorrence", type: "Danh từ", phonetic: "/əbˈhɒr.əns/", vi: "sự ghê tởm, căm ghét", example: "She has a deep abhorrence of cruelty to animals.", bucket: 0 },
      { word: "loathing", type: "Danh từ", phonetic: "/ˈləʊ.ðɪŋ/", vi: "sự khinh bỉ, chán ghét", example: "He looked at the dictator with absolute loathing.", bucket: 0 },
      { word: "fickle", type: "Tính từ", phonetic: "/ˈfɪk.əl/", vi: "thất thường, hay thay đổi", example: "The weather here is notoriously fickle.", bucket: 1 },
      { word: "aversion", type: "Danh từ", phonetic: "/əˈvɜː.ʃən/", vi: "ác cảm, sự không thích", example: "I have a strong aversion to eating raw fish.", bucket: 0 },
      { word: "repulse", type: "Động từ", phonetic: "/rɪˈpʌls/", vi: "làm cho kinh tởm", example: "The smell of the rotting meat utterly repulsed him.", bucket: 0 },
      { word: "hostility", type: "Danh từ", phonetic: "/hɒsˈtɪl.ə.ti/", vi: "sự thù địch", example: "There was open hostility between the two gangs.", bucket: 1 },
      { word: "scorn", type: "Danh từ", phonetic: "/skɔːn/", vi: "sự khinh miệt", example: "She poured scorn on his ridiculous idea.", bucket: 1 },
      { word: "resent", type: "Động từ", phonetic: "/rɪˈzent/", vi: "bực tức, oán hận", example: "I deeply resent being treated like a child.", bucket: 1 }
    ]
  },
  {
    unitNum: 18, title: "Unit 18: Observing others: appearance and mannerisms", description: "Miêu tả ngoại hình độc đáo và các cử chỉ cơ thể, nét mặt.", buckets: ["Appearance (Ngoại hình)", "Mannerisms (Cử chỉ)"],
    words: [
      { word: "lanky", type: "Tính từ", phonetic: "/ˈlæŋ.ki/", vi: "cao gầy lêu nghêu", example: "He was a tall, lanky teenager.", bucket: 0 },
      { word: "grimace", type: "Động từ", phonetic: "/ˈɡrɪm.əs/", vi: "nhăn nhó (vì đau/kinh tởm)", example: "He grimaced in pain when he stood up.", bucket: 1 },
      { word: "pout", type: "Động từ", phonetic: "/paʊt/", vi: "bĩu môi (giận dỗi/gợi cảm)", example: "The little girl pouted because she couldn't have candy.", bucket: 1 },
      { word: "scruffy", type: "Tính từ", phonetic: "/ˈskrʌf.i/", vi: "lôi thôi, bù xù", example: "He arrived at the wedding in a scruffy old jacket.", bucket: 0 },
      { word: "fidget", type: "Động từ", phonetic: "/ˈfɪdʒ.ɪt/", vi: "cựa quậy, bồn chồn", example: "Children often fidget when they are bored.", bucket: 1 },
      { word: "shrug", type: "Động từ", phonetic: "/ʃrʌɡ/", vi: "nhún vai", example: "He just shrugged his shoulders and walked away.", bucket: 1 },
      { word: "stout", type: "Tính từ", phonetic: "/staʊt/", vi: "to khỏe, mập mạp", example: "The stout man could easily lift the heavy box.", bucket: 0 },
      { word: "slouch", type: "Động từ", phonetic: "/slaʊtʃ/", vi: "ngồi/đứng thõng vai", example: "Don't slouch in your chair; sit up straight!", bucket: 1 }
    ]
  },
  {
    unitNum: 19, title: "Unit 19: Observing others: character traits", description: "Các tính từ đánh giá bản chất sâu xa của một người.", buckets: ["Personality (Tính cách)", "Flaws (Khuyết điểm)"],
    words: [
      { word: "impulsive", type: "Tính từ", phonetic: "/ɪmˈpʌl.sɪv/", vi: "bốc đồng, bồng bột", example: "She made an impulsive decision to quit her job.", bucket: 1 },
      { word: "diffident", type: "Tính từ", phonetic: "/ˈdɪf.ɪ.dənt/", vi: "thiếu tự tin, rụt rè", example: "He was a shy and diffident young man.", bucket: 0 },
      { word: "gullible", type: "Tính từ", phonetic: "/ˈɡʌl.ə.bəl/", vi: "nhẹ dạ cả tin", example: "The scammers target elderly and gullible people.", bucket: 1 },
      { word: "stubborn", type: "Tính từ", phonetic: "/ˈstʌb.ən/", vi: "cố chấp, bướng bỉnh", example: "He is too stubborn to admit he was wrong.", bucket: 1 },
      { word: "conceited", type: "Tính từ", phonetic: "/kənˈsiː.tɪd/", vi: "tự cao tự đại", example: "That famous actor is incredibly conceited.", bucket: 1 },
      { word: "compassionate", type: "Tính từ", phonetic: "/kəmˈpæʃ.ən.ət/", vi: "nhân ái, từ bi", example: "She is a highly compassionate and caring nurse.", bucket: 0 },
      { word: "cynical", type: "Tính từ", phonetic: "/ˈsɪn.ɪ.kəl/", vi: "hoài nghi, bi quan", example: "He has a very cynical view of politicians.", bucket: 1 },
      { word: "arrogant", type: "Tính từ", phonetic: "/ˈær.ə.ɡənt/", vi: "kiêu ngạo", example: "His arrogant attitude annoyed everyone in the room.", bucket: 1 }
    ]
  },
  {
    unitNum: 20, title: "Unit 20: Birth and death: from cradle to grave", description: "Các thuật ngữ sinh học và tang lễ liên quan đến vòng đời con người.", buckets: ["Birth (Sinh ra)", "Death (Cái chết)"],
    words: [
      { word: "Caesarean section", type: "Cụm danh từ", phonetic: "/sɪˌzeə.ri.ən ˈsek.ʃən/", vi: "sinh mổ", example: "The baby was safely delivered by Caesarean section.", bucket: 0 },
      { word: "obituary", type: "Danh từ", phonetic: "/əˈbɪtʃ.u.ə.ri/", vi: "cáo phó", example: "I read his obituary in the morning newspaper.", bucket: 1 },
      { word: "mourning", type: "Danh từ", phonetic: "/ˈmɔː.nɪŋ/", vi: "sự để tang, thương tiếc", example: "The whole country was in deep mourning for the queen.", bucket: 1 },
      { word: "maternity", type: "Danh từ", phonetic: "/məˈtɜː.nə.ti/", vi: "tình trạng làm mẹ, thai sản", example: "She is currently on maternity leave.", bucket: 0 },
      { word: "midwife", type: "Danh từ", phonetic: "/ˈmɪd.waɪf/", vi: "bà đỡ đẻ, nữ hộ sinh", example: "The midwife helped deliver the baby safely at home.", bucket: 0 },
      { word: "deceased", type: "Tính từ", phonetic: "/dɪˈsiːst/", vi: "đã qua đời", example: "He inherited the house from his recently deceased uncle.", bucket: 1 },
      { word: "cemetery", type: "Danh từ", phonetic: "/ˈsem.ə.tri/", vi: "nghĩa trang", example: "He was buried in the local cemetery.", bucket: 1 },
      { word: "cremation", type: "Danh từ", phonetic: "/krɪˈmeɪ.ʃən/", vi: "sự hỏa táng", example: "His family chose cremation over a traditional burial.", bucket: 1 }
    ]
  },
  {
    unitNum: 21, title: "Unit 21: Free time: relaxation and leisure", description: "Cách chúng ta tiêu tốn thời gian rảnh và các sở thích cá nhân.", buckets: ["Leisure (Giải trí)", "Habits (Thói quen)"],
    words: [
      { word: "time-consuming", type: "Tính từ", phonetic: "/ˈtaɪm.kənˌsjuː.mɪŋ/", vi: "tốn nhiều thời gian", example: "Writing this report is highly time-consuming.", bucket: 0 },
      { word: "dabbler", type: "Danh từ", phonetic: "/ˈdæb.lər/", vi: "người làm việc tài tử, học đòi (không chuyên sâu)", example: "He's not a real artist, just a dabbler.", bucket: 0 },
      { word: "shopaholic", type: "Danh từ", phonetic: "/ˌʃɒp.əˈhɒl.ɪk/", vi: "người nghiện mua sắm", example: "As a shopaholic, she spends all her salary on clothes.", bucket: 1 },
      { word: "pastime", type: "Danh từ", phonetic: "/ˈpɑːs.taɪm/", vi: "trò tiêu khiển", example: "Playing chess is my favorite pastime.", bucket: 0 },
      { word: "unwind", type: "Động từ", phonetic: "/ʌnˈwaɪnd/", vi: "thư giãn (sau khi căng thẳng)", example: "Reading a book helps me unwind after work.", bucket: 0 },
      { word: "binge-watch", type: "Động từ", phonetic: "/ˈbɪndʒ.wɒtʃ/", vi: "cày phim (xem liên tục)", example: "We decided to binge-watch the entire series on Netflix.", bucket: 1 },
      { word: "addictive", type: "Tính từ", phonetic: "/əˈdɪk.tɪv/", vi: "gây nghiện", example: "These video games can be highly addictive.", bucket: 1 },
      { word: "excursion", type: "Danh từ", phonetic: "/ɪkˈskɜː.ʃən/", vi: "chuyến tham quan ngắn", example: "We went on a weekend excursion to the mountains.", bucket: 0 }
    ]
  },
  {
    unitNum: 22, title: "Unit 22: All the rage: clothes and fashion", description: "Từ vựng sành điệu về thời trang, quần áo và xu hướng.", buckets: ["Fashion (Thời trang)", "Style (Phong cách)"],
    words: [
      { word: "frumpy", type: "Tính từ", phonetic: "/ˈfrʌm.pi/", vi: "lỗi thời, luộm thuộm (quần áo)", example: "She wore a frumpy dress that made her look older.", bucket: 0 },
      { word: "dressed to kill", type: "Thành ngữ", phonetic: "/ˌdrest tʊ ˈkɪl/", vi: "ăn mặc lộng lẫy, thu hút sự chú ý", example: "She arrived at the party dressed to kill.", bucket: 1 },
      { word: "without frills", type: "Cụm từ", phonetic: "/wɪˈðaʊt frɪlz/", vi: "đơn giản, không diêm dúa/cầu kỳ", example: "It's a basic, without frills hotel room.", bucket: 0 },
      { word: "trendy", type: "Tính từ", phonetic: "/ˈtren.di/", vi: "hợp thời trang, sành điệu", example: "He works in a highly trendy cafe in the city center.", bucket: 1 },
      { word: "haute couture", type: "Cụm danh từ", phonetic: "/ˌəʊt kuːˈtjʊər/", vi: "thời trang cao cấp", example: "She models for an exclusive haute couture fashion house.", bucket: 1 },
      { word: "vintage", type: "Tính từ", phonetic: "/ˈvɪn.tɪdʒ/", vi: "đồ cổ điển, phong cách xưa", example: "She loves buying vintage clothes from the 1960s.", bucket: 1 },
      { word: "tailor-made", type: "Tính từ", phonetic: "/ˌteɪ.ləˈmeɪd/", vi: "may đo riêng", example: "He wore a beautifully tailor-made Italian suit.", bucket: 1 },
      { word: "outdated", type: "Tính từ", phonetic: "/ˌaʊtˈdeɪ.tɪd/", vi: "lỗi thời, lạc hậu", example: "Those big sunglasses are completely outdated now.", bucket: 0 }
    ]
  },
  {
    unitNum: 23, title: "Unit 23: Homestyles, lifestyles", description: "Từ vựng về không gian sống, phong cách sống và thiết kế nhà cửa.", buckets: ["Home (Nhà cửa)", "Lifestyle (Phong cách sống)"],
    words: [
      { word: "granny flat", type: "Cụm danh từ", phonetic: "/ˈɡræn.i ˌflæt/", vi: "căn hộ phụ (xây thêm cho người già ở)", example: "They built a granny flat in the garden for her mother.", bucket: 0 },
      { word: "minimalism", type: "Danh từ", phonetic: "/ˈmɪn.ɪ.mə.lɪ.zəm/", vi: "chủ nghĩa tối giản", example: "Modern design heavily favors minimalism.", bucket: 1 },
      { word: "household word", type: "Cụm danh từ", phonetic: "/ˌhaʊs.həʊld ˈwɜːd/", vi: "thương hiệu/tên tuổi quen thuộc với mọi nhà", example: "Coca-Cola is a global household word.", bucket: 1 },
      { word: "spacious", type: "Tính từ", phonetic: "/ˈspeɪ.ʃəs/", vi: "rộng rãi", example: "The apartment has a highly spacious living room.", bucket: 0 },
      { word: "cluttered", type: "Tính từ", phonetic: "/ˈklʌt.əd/", vi: "bừa bộn, ngổn ngang", example: "His desk was completely cluttered with papers.", bucket: 0 },
      { word: "sustainable", type: "Tính từ", phonetic: "/səˈsteɪ.nə.bəl/", vi: "bền vững, thân thiện với môi trường", example: "We need more sustainable lifestyles to save the planet.", bucket: 1 },
      { word: "renovate", type: "Động từ", phonetic: "/ˈren.ə.veɪt/", vi: "cải tạo, tân trang", example: "They decided to completely renovate the old kitchen.", bucket: 0 },
      { word: "cosy", type: "Tính từ", phonetic: "/ˈkəʊ.zi/", vi: "ấm cúng", example: "The cabin in the woods was small but extremely cosy.", bucket: 0 }
    ]
  },
  {
    unitNum: 24, title: "Unit 24: Socialising and networking", description: "Giao tiếp xã hội, xây dựng mối quan hệ và các sự kiện tiệc tùng.", buckets: ["Socializing (Giao thiệp)", "Networking (Mạng lưới)"],
    words: [
      { word: "housewarming", type: "Danh từ", phonetic: "/ˈhaʊsˌwɔː.mɪŋ/", vi: "tiệc tân gia", example: "They invited us to their housewarming party.", bucket: 0 },
      { word: "hobnob", type: "Động từ", phonetic: "/ˈhɒb.nɒb/", vi: "giao du (với người giàu/quyền lực)", example: "She loves to hobnob with the rich and famous.", bucket: 1 },
      { word: "clique", type: "Danh từ", phonetic: "/kliːk/", vi: "bè phái, nhóm kín", example: "The high school is dominated by a small, exclusive clique.", bucket: 1 },
      { word: "mingle", type: "Động từ", phonetic: "/ˈmɪŋ.ɡəl/", vi: "trộn lẫn, hòa mình vào đám đông", example: "The host tried to mingle with all the guests.", bucket: 0 },
      { word: "acquaintance", type: "Danh từ", phonetic: "/əˈkweɪn.təns/", vi: "người quen (chưa phải bạn thân)", example: "He is a business acquaintance of my father.", bucket: 1 },
      { word: "networking", type: "Danh từ", phonetic: "/ˈnet.wɜː.kɪŋ/", vi: "việc xây dựng mạng lưới quan hệ", example: "Effective networking is crucial for your career.", bucket: 1 },
      { word: "schmooze", type: "Động từ", phonetic: "/ʃmuːz/", vi: "nịnh nọt, nói chuyện thân mật để trục lợi", example: "He spent the evening schmoozing the CEO.", bucket: 1 },
      { word: "gatecrash", type: "Động từ", phonetic: "/ˈɡeɪt.kræʃ/", vi: "đi dự tiệc không được mời", example: "A group of teenagers tried to gatecrash the wedding.", bucket: 0 }
    ]
  },
  {
    unitNum: 25, title: "Unit 25: The performance arts: reviews and critiques", description: "Từ vựng dùng trong các bài phê bình nghệ thuật, phim ảnh, âm nhạc.", buckets: ["Performance (Biểu diễn)", "Review (Phê bình)"],
    words: [
      { word: "hackneyed", type: "Tính từ", phonetic: "/ˈhæk.nid/", vi: "nhàm chán, sáo rỗng (cốt truyện)", example: "The plot of the movie was completely hackneyed.", bucket: 1 },
      { word: "typecast", type: "Động từ", phonetic: "/ˈtaɪp.kɑːst/", vi: "đóng đinh vào một kiểu vai diễn", example: "He was heavily typecast as the funny best friend.", bucket: 1 },
      { word: "rendition", type: "Danh từ", phonetic: "/renˈdɪʃ.ən/", vi: "màn trình diễn, sự diễn xướng", example: "She gave a beautiful rendition of the classic song.", bucket: 0 },
      { word: "standing ovation", type: "Cụm danh từ", phonetic: "/ˌstæn.dɪŋ əʊˈveɪ.ʃən/", vi: "sự đứng lên vỗ tay hoan hô", example: "The cast received a massive standing ovation.", bucket: 0 },
      { word: "masterpiece", type: "Danh từ", phonetic: "/ˈmɑː.stə.piːs/", vi: "kiệt tác nghệ thuật", example: "The painting is widely considered a true masterpiece.", bucket: 1 },
      { word: "flop", type: "Danh từ", phonetic: "/flɒp/", vi: "sự thất bại thảm hại (phim ảnh)", example: "Despite the big budget, the play was a complete flop.", bucket: 1 },
      { word: "mesmerizing", type: "Tính từ", phonetic: "/ˈmez.mə.raɪ.zɪŋ/", vi: "mê hoặc, quyến rũ", example: "Her dancing performance was absolutely mesmerizing.", bucket: 0 },
      { word: "critique", type: "Danh từ", phonetic: "/krɪˈtiːk/", vi: "bài phê bình chuyên sâu", example: "He wrote a harsh critique of the new exhibition.", bucket: 1 }
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

const fileContent = "// File: src/data/oxfordAdvancedData1_25.js\n// Auto-generated Phase 1 Advanced Units (1-25)\n\n" +
  "export const courseData1_25 = " + JSON.stringify(courseData, null, 2) + ";\n";

fs.writeFileSync('src/data/oxfordAdvancedData1_25.js', fileContent);
console.log("Successfully generated oxfordAdvancedData1_25.js");
