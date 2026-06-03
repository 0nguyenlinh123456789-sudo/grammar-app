import fs from 'fs';

const rawUnits = [
  {
    unitNum: 26, title: "Unit 26: Expressing Opinions", description: "Từ vựng dùng để bày tỏ quan điểm sâu sắc trong các bài luận và tranh luận.", buckets: ["Opinion (Quan điểm)", "Belief (Niềm tin)"],
    words: [
      { word: "adamant", type: "Tính từ", phonetic: "/ˈæd.ə.mənt/", vi: "kiên quyết, khăng khăng", example: "He is adamant that he is right.", bucket: 0 },
      { word: "cynical", type: "Tính từ", phonetic: "/ˈsɪn.ɪ.kəl/", vi: "hoài nghi, yếm thế", example: "She has a cynical view of modern politics.", bucket: 0 },
      { word: "skeptical", type: "Tính từ", phonetic: "/ˈskep.tɪ.kəl/", vi: "đa nghi, ngờ vực", example: "I am highly skeptical of his promises.", bucket: 0 },
      { word: "subjective", type: "Tính từ", phonetic: "/səbˈdʒek.tɪv/", vi: "chủ quan", example: "Art appreciation is entirely subjective.", bucket: 0 },
      { word: "conviction", type: "Danh từ", phonetic: "/kənˈvɪk.ʃən/", vi: "niềm tin mãnh liệt", example: "He spoke with deep conviction.", bucket: 1 },
      { word: "prejudice", type: "Danh từ", phonetic: "/ˈpredʒ.ə.dɪs/", vi: "định kiến", example: "We must overcome our racial prejudice.", bucket: 1 },
      { word: "assert", type: "Động từ", phonetic: "/əˈsɜːt/", vi: "khẳng định mạnh mẽ", example: "She continued to assert her innocence.", bucket: 0 },
      { word: "concede", type: "Động từ", phonetic: "/kənˈsiːd/", vi: "thừa nhận (dù không muốn)", example: "He finally had to concede defeat.", bucket: 1 }
    ]
  },
  {
    unitNum: 27, title: "Unit 27: Agreement and Disagreement", description: "Các cách diễn đạt sự đồng tình hoặc phản bác một cách trang trọng.", buckets: ["Agreement (Đồng tình)", "Disagreement (Bất đồng)"],
    words: [
      { word: "consensus", type: "Danh từ", phonetic: "/kənˈsen.səs/", vi: "sự đồng thuận chung", example: "The committee finally reached a consensus.", bucket: 0 },
      { word: "unanimous", type: "Tính từ", phonetic: "/juːˈnæn.ɪ.məs/", vi: "nhất trí hoàn toàn", example: "It was a unanimous decision by the board.", bucket: 0 },
      { word: "endorse", type: "Động từ", phonetic: "/ɪnˈdɔːs/", vi: "tán thành, ủng hộ", example: "The president decided to endorse the new law.", bucket: 0 },
      { word: "compatible", type: "Tính từ", phonetic: "/kəmˈpæt.ə.bəl/", vi: "tương thích, hòa hợp", example: "Their personalities are highly compatible.", bucket: 0 },
      { word: "dispute", type: "Danh từ", phonetic: "/dɪˈspjuːt/", vi: "cuộc tranh chấp", example: "They are involved in a legal dispute.", bucket: 1 },
      { word: "contradict", type: "Động từ", phonetic: "/ˌkɒn.trəˈdɪkt/", vi: "mâu thuẫn, cãi lại", example: "The new evidence contradicts his previous statement.", bucket: 1 },
      { word: "friction", type: "Danh từ", phonetic: "/ˈfrɪk.ʃən/", vi: "sự xích mích", example: "There is constant friction between the two departments.", bucket: 1 },
      { word: "dissent", type: "Danh từ", phonetic: "/dɪˈsent/", vi: "sự bất đồng quan điểm", example: "Political dissent is not tolerated in that country.", bucket: 1 }
    ]
  },
  {
    unitNum: 28, title: "Unit 28: Emphasis and Exaggeration", description: "Thủ pháp nhấn mạnh và phóng đại trong văn phong thuyết phục.", buckets: ["Emphasis (Nhấn mạnh)", "Exaggeration (Phóng đại)"],
    words: [
      { word: "crucial", type: "Tính từ", phonetic: "/ˈkruː.ʃəl/", vi: "vô cùng quan trọng, cốt yếu", example: "It is crucial that we arrive on time.", bucket: 0 },
      { word: "paramount", type: "Tính từ", phonetic: "/ˈpær.ə.maʊnt/", vi: "tối quan trọng", example: "Safety is of paramount importance.", bucket: 0 },
      { word: "highlight", type: "Động từ", phonetic: "/ˈhaɪ.laɪt/", vi: "làm nổi bật", example: "The report highlights the need for better security.", bucket: 0 },
      { word: "reiterate", type: "Động từ", phonetic: "/riˈɪt.ər.eɪt/", vi: "nhấn mạnh lại, lặp lại", example: "Let me reiterate my main point.", bucket: 0 },
      { word: "exaggerate", type: "Động từ", phonetic: "/ɪɡˈzædʒ.ə.reɪt/", vi: "phóng đại, cường điệu", example: "He tends to exaggerate his achievements.", bucket: 1 },
      { word: "hyperbole", type: "Danh từ", phonetic: "/haɪˈpɜː.bəl.i/", vi: "phép nói quá", example: "Saying you are starving is a hyperbole.", bucket: 1 },
      { word: "overstate", type: "Động từ", phonetic: "/ˌəʊ.vəˈsteɪt/", vi: "nói quá mức độ", example: "You cannot overstate the impact of this discovery.", bucket: 1 },
      { word: "astronomical", type: "Tính từ", phonetic: "/ˌæs.trəˈnɒm.ɪ.kəl/", vi: "khổng lồ, vô cùng to lớn", example: "The cost of the project was astronomical.", bucket: 1 }
    ]
  },
  {
    unitNum: 29, title: "Unit 29: Comparing and Contrasting", description: "Từ vựng nâng cao dùng để so sánh sự tương đồng và khác biệt.", buckets: ["Compare (So sánh)", "Contrast (Đối chiếu)"],
    words: [
      { word: "analogous", type: "Tính từ", phonetic: "/əˈnæl.ə.ɡəs/", vi: "tương tự, có thể so sánh", example: "The human brain is often seen as analogous to a computer.", bucket: 0 },
      { word: "comparable", type: "Tính từ", phonetic: "/ˈkɒm.pər.ə.bəl/", vi: "tương đương", example: "Our prices are comparable to those of our competitors.", bucket: 0 },
      { word: "equivalent", type: "Tính từ", phonetic: "/ɪˈkwɪv.əl.ənt/", vi: "tương đương (về giá trị)", example: "A mile is equivalent to about 1.6 kilometers.", bucket: 0 },
      { word: "parallel", type: "Danh từ", phonetic: "/ˈpær.ə.lel/", vi: "sự tương đồng", example: "There is a parallel between his life and mine.", bucket: 0 },
      { word: "discrepancy", type: "Danh từ", phonetic: "/dɪˈskrep.ən.si/", vi: "sự sai lệch, khác biệt", example: "There is a large discrepancy in the financial reports.", bucket: 1 },
      { word: "contrast", type: "Danh từ", phonetic: "/ˈkɒn.trɑːst/", vi: "sự tương phản", example: "The stark contrast between rich and poor is shocking.", bucket: 1 },
      { word: "contradictory", type: "Tính từ", phonetic: "/ˌkɒn.trəˈdɪk.tər.i/", vi: "mâu thuẫn", example: "The witnesses gave contradictory statements.", bucket: 1 },
      { word: "conversely", type: "Trạng từ", phonetic: "/ˈkɒn.vɜːs.li/", vi: "ngược lại", example: "He is rich; conversely, his brother is very poor.", bucket: 1 }
    ]
  },
  {
    unitNum: 30, title: "Unit 30: Cause and Effect", description: "Diễn tả mối quan hệ nguyên nhân và kết quả phức tạp.", buckets: ["Cause (Nguyên nhân)", "Effect (Kết quả)"],
    words: [
      { word: "trigger", type: "Động từ", phonetic: "/ˈtrɪɡ.ər/", vi: "gây ra, kích hoạt", example: "Stress can trigger a severe asthma attack.", bucket: 0 },
      { word: "prompt", type: "Động từ", phonetic: "/prɒmpt/", vi: "thúc đẩy, xúi giục", example: "His speech prompted an angry response from the crowd.", bucket: 0 },
      { word: "root cause", type: "Cụm danh từ", phonetic: "/ruːt kɔːz/", vi: "nguyên nhân sâu xa", example: "We need to find the root cause of the problem.", bucket: 0 },
      { word: "catalyst", type: "Danh từ", phonetic: "/ˈkæt.əl.ɪst/", vi: "chất xúc tác", example: "The protest acted as a catalyst for political change.", bucket: 0 },
      { word: "repercussion", type: "Danh từ", phonetic: "/ˌriː.pəˈkʌʃ.ən/", vi: "hậu quả (thường xấu)", example: "The scandal had serious repercussions for his career.", bucket: 1 },
      { word: "outcome", type: "Danh từ", phonetic: "/ˈaʊt.kʌm/", vi: "kết quả cuối cùng", example: "It is too early to predict the outcome of the election.", bucket: 1 },
      { word: "aftermath", type: "Danh từ", phonetic: "/ˈɑːf.tə.mæθ/", vi: "thời kỳ hậu quả (sau thảm họa)", example: "Many people starved in the aftermath of the war.", bucket: 1 },
      { word: "ripple effect", type: "Cụm danh từ", phonetic: "/ˈrɪp.əl ɪˌfekt/", vi: "hiệu ứng dây chuyền", example: "The bank's collapse had a ripple effect on the economy.", bucket: 1 }
    ]
  },
  {
    unitNum: 31, title: "Unit 31: Probability and Certainty", description: "Đánh giá xác suất và độ chắc chắn trong nghiên cứu học thuật.", buckets: ["Probability (Xác suất)", "Certainty (Chắc chắn)"],
    words: [
      { word: "plausible", type: "Tính từ", phonetic: "/ˈplɔː.zə.bəl/", vi: "có vẻ hợp lý", example: "His excuse sounds completely plausible.", bucket: 0 },
      { word: "feasible", type: "Tính từ", phonetic: "/ˈfiː.zə.bəl/", vi: "khả thi", example: "It is not financially feasible to build the bridge.", bucket: 0 },
      { word: "liable", type: "Tính từ", phonetic: "/ˈlaɪ.ə.bəl/", vi: "có khả năng xảy ra", example: "You are liable to make mistakes if you rush.", bucket: 0 },
      { word: "likelihood", type: "Danh từ", phonetic: "/ˈlaɪ.kli.hʊd/", vi: "khả năng xảy ra", example: "There is a strong likelihood that it will rain.", bucket: 0 },
      { word: "inevitable", type: "Tính từ", phonetic: "/ɪˈnev.ɪ.tə.bəl/", vi: "chắc chắn xảy ra", example: "Failure is an inevitable part of learning.", bucket: 1 },
      { word: "undeniable", type: "Tính từ", phonetic: "/ˌʌn.dɪˈnaɪ.ə.bəl/", vi: "không thể phủ nhận", example: "The evidence of his guilt is undeniable.", bucket: 1 },
      { word: "unambiguous", type: "Tính từ", phonetic: "/ˌʌn.æmˈbɪɡ.ju.əs/", vi: "rõ ràng, không mơ hồ", example: "The instructions were completely unambiguous.", bucket: 1 },
      { word: "bound", type: "Tính từ", phonetic: "/baʊnd/", vi: "chắc chắn sẽ", example: "She is bound to pass the exam.", bucket: 1 }
    ]
  },
  {
    unitNum: 32, title: "Unit 32: Describing People: Character", description: "Từ vựng miêu tả những tính cách phức tạp của con người.", buckets: ["Positive (Tích cực)", "Negative (Tiêu cực)"],
    words: [
      { word: "conscientious", type: "Tính từ", phonetic: "/ˌkɒn.ʃiˈen.ʃəs/", vi: "tận tâm, chu đáo", example: "She is a highly conscientious student.", bucket: 0 },
      { word: "charismatic", type: "Tính từ", phonetic: "/ˌkær.ɪzˈmæt.ɪk/", vi: "có sức hút, lôi cuốn", example: "He is a charismatic leader who inspires many.", bucket: 0 },
      { word: "compassionate", type: "Tính từ", phonetic: "/kəmˈpæʃ.ən.ət/", vi: "giàu lòng thương người", example: "Nurses need to be highly compassionate.", bucket: 0 },
      { word: "resilient", type: "Tính từ", phonetic: "/rɪˈzɪl.jənt/", vi: "kiên cường", example: "Children are often remarkably resilient.", bucket: 0 },
      { word: "arrogant", type: "Tính từ", phonetic: "/ˈær.ə.ɡənt/", vi: "kiêu ngạo", example: "His arrogant attitude made him unpopular.", bucket: 1 },
      { word: "stubborn", type: "Tính từ", phonetic: "/ˈstʌb.ən/", vi: "cố chấp, bướng bỉnh", example: "He is too stubborn to admit his mistakes.", bucket: 1 },
      { word: "cunning", type: "Tính từ", phonetic: "/ˈkʌn.ɪŋ/", vi: "ranh mãnh, xảo quyệt", example: "The cunning fox easily escaped the trap.", bucket: 1 },
      { word: "vindictive", type: "Tính từ", phonetic: "/vɪnˈdɪk.tɪv/", vi: "thù dai, hay trả thù", example: "She can be very vindictive when crossed.", bucket: 1 }
    ]
  },
  {
    unitNum: 33, title: "Unit 33: Describing People: Appearance", description: "Các tính từ nâng cao miêu tả ngoại hình và dáng vẻ.", buckets: ["Appearance (Ngoại hình)", "Condition (Tình trạng)"],
    words: [
      { word: "impeccable", type: "Tính từ", phonetic: "/ɪmˈpek.ə.bəl/", vi: "hoàn hảo, không tì vết", example: "She always wears impeccable clothes.", bucket: 0 },
      { word: "elegant", type: "Tính từ", phonetic: "/ˈel.ɪ.ɡənt/", vi: "thanh lịch", example: "She looked extremely elegant in her black dress.", bucket: 0 },
      { word: "striking", type: "Tính từ", phonetic: "/ˈstraɪ.kɪŋ/", vi: "nổi bật, thu hút", example: "He is a man of striking good looks.", bucket: 0 },
      { word: "athletic", type: "Tính từ", phonetic: "/æθˈlet.ɪk/", vi: "khỏe mạnh, lực lưỡng", example: "He has a tall, athletic build.", bucket: 0 },
      { word: "frail", type: "Tính từ", phonetic: "/freɪl/", vi: "mỏng manh, yếu ớt", example: "The old lady looked very frail.", bucket: 1 },
      { word: "scruffy", type: "Tính từ", phonetic: "/ˈskrʌf.i/", vi: "lôi thôi, lếch thếch", example: "He came to the interview in scruffy jeans.", bucket: 1 },
      { word: "obese", type: "Tính từ", phonetic: "/əʊˈbiːs/", vi: "béo phì", example: "A diet high in sugar can make you obese.", bucket: 1 },
      { word: "haggard", type: "Tính từ", phonetic: "/ˈhæɡ.əd/", vi: "hốc hác, phờ phạc", example: "He looked pale and haggard after a sleepless night.", bucket: 1 }
    ]
  },
  {
    unitNum: 34, title: "Unit 34: Success and Failure", description: "Phân tích sự thành đạt và nguyên nhân dẫn đến thất bại.", buckets: ["Success (Thành công)", "Failure (Thất bại)"],
    words: [
      { word: "triumph", type: "Danh từ", phonetic: "/ˈtraɪ.əmf/", vi: "chiến thắng vẻ vang", example: "The match ended in a glorious triumph for our team.", bucket: 0 },
      { word: "accomplish", type: "Động từ", phonetic: "/əˈkʌm.plɪʃ/", vi: "hoàn thành xuất sắc", example: "She managed to accomplish all her goals.", bucket: 0 },
      { word: "flourish", type: "Động từ", phonetic: "/ˈflʌr.ɪʃ/", vi: "phát triển rực rỡ", example: "The business began to flourish under new management.", bucket: 0 },
      { word: "lucrative", type: "Tính từ", phonetic: "/ˈluː.krə.tɪv/", vi: "sinh nhiều lợi nhuận", example: "He has a highly lucrative contract with the team.", bucket: 0 },
      { word: "blunder", type: "Danh từ", phonetic: "/ˈblʌn.dər/", vi: "sai lầm ngớ ngẩn", example: "I made a terrible blunder in the interview.", bucket: 1 },
      { word: "flop", type: "Danh từ", phonetic: "/flɒp/", vi: "sự thất bại thảm hại", example: "The new movie was a total flop at the box office.", bucket: 1 },
      { word: "setback", type: "Danh từ", phonetic: "/ˈset.bæk/", vi: "bước thụt lùi, trở ngại", example: "The project suffered a major setback due to bad weather.", bucket: 1 },
      { word: "in vain", type: "Cụm từ", phonetic: "/ɪn veɪn/", vi: "vô ích, không thành công", example: "All our hard work was in vain.", bucket: 1 }
    ]
  },
  {
    unitNum: 35, title: "Unit 35: Memory and Forgetting", description: "Quá trình hồi tưởng, ghi nhớ và hiện tượng quên lãng.", buckets: ["Memory (Trí nhớ)", "Forgetting (Quên lãng)"],
    words: [
      { word: "reminisce", type: "Động từ", phonetic: "/ˌrem.ɪˈnɪs/", vi: "hồi tưởng, nhớ lại", example: "Grandpa loves to reminisce about his youth.", bucket: 0 },
      { word: "nostalgia", type: "Danh từ", phonetic: "/nɒsˈtæl.dʒə/", vi: "nỗi nhớ nhung quá khứ", example: "Hearing that song brings back a wave of nostalgia.", bucket: 0 },
      { word: "memorable", type: "Tính từ", phonetic: "/ˈmem.ər.ə.bəl/", vi: "đáng nhớ", example: "It was a truly memorable vacation.", bucket: 0 },
      { word: "recall", type: "Động từ", phonetic: "/rɪˈkɔːl/", vi: "gợi nhớ, nhớ lại", example: "I cannot recall where I left my keys.", bucket: 0 },
      { word: "amnesia", type: "Danh từ", phonetic: "/æmˈniː.zi.ə/", vi: "chứng mất trí nhớ", example: "The accident left him with severe amnesia.", bucket: 1 },
      { word: "oblivious", type: "Tính từ", phonetic: "/əˈblɪv.i.əs/", vi: "không để ý, lãng quên", example: "He was completely oblivious to the danger.", bucket: 1 },
      { word: "fade", type: "Động từ", phonetic: "/feɪd/", vi: "phai mờ", example: "Over time, his memories began to fade.", bucket: 1 },
      { word: "repress", type: "Động từ", phonetic: "/rɪˈpres/", vi: "kìm nén (cảm xúc, ký ức)", example: "She tried to repress the traumatic memory.", bucket: 1 }
    ]
  },
  {
    unitNum: 36, title: "Unit 36: Change and Innovation", description: "Từ vựng về sự thay đổi đột phá và quá trình tiến hóa.", buckets: ["Change (Thay đổi)", "Innovation (Đổi mới)"],
    words: [
      { word: "transform", type: "Động từ", phonetic: "/trænsˈfɔːm/", vi: "biến đổi hoàn toàn", example: "The internet has transformed the way we live.", bucket: 0 },
      { word: "modify", type: "Động từ", phonetic: "/ˈmɒd.ɪ.faɪ/", vi: "sửa đổi, điều chỉnh", example: "We need to modify the design slightly.", bucket: 0 },
      { word: "fluctuate", type: "Động từ", phonetic: "/ˈflʌk.tʃu.eɪt/", vi: "dao động, biến động", example: "Prices fluctuate depending on supply and demand.", bucket: 0 },
      { word: "evolve", type: "Động từ", phonetic: "/ɪˈvɒlv/", vi: "tiến hóa, phát triển", example: "Technology continues to evolve rapidly.", bucket: 0 },
      { word: "revolutionize", type: "Động từ", phonetic: "/ˌrev.əˈluː.ʃən.aɪz/", vi: "cách mạng hóa", example: "Smartphones revolutionized global communication.", bucket: 1 },
      { word: "innovative", type: "Tính từ", phonetic: "/ˈɪn.ə.və.tɪv/", vi: "mang tính đổi mới", example: "She has an innovative approach to solving problems.", bucket: 1 },
      { word: "groundbreaking", type: "Tính từ", phonetic: "/ˈɡraʊndˌbreɪ.kɪŋ/", vi: "đột phá", example: "It was a groundbreaking medical discovery.", bucket: 1 },
      { word: "pioneer", type: "Danh từ", phonetic: "/ˌpaɪəˈnɪər/", vi: "người tiên phong", example: "He was a pioneer in the field of artificial intelligence.", bucket: 1 }
    ]
  },
  {
    unitNum: 37, title: "Unit 37: Time and Sequence", description: "Cách diễn đạt tinh tế về thời gian, trình tự và tần suất.", buckets: ["Time (Thời gian)", "Sequence (Trình tự)"],
    words: [
      { word: "contemporary", type: "Tính từ", phonetic: "/kənˈtem.pər.ər.i/", vi: "đương đại", example: "I really enjoy reading contemporary literature.", bucket: 0 },
      { word: "simultaneous", type: "Tính từ", phonetic: "/ˌsɪm.əlˈteɪ.ni.əs/", vi: "đồng thời", example: "There were simultaneous explosions in the city.", bucket: 0 },
      { word: "temporary", type: "Tính từ", phonetic: "/ˈtem.pər.ər.i/", vi: "tạm thời", example: "This is only a temporary solution to the problem.", bucket: 0 },
      { word: "permanent", type: "Tính từ", phonetic: "/ˈpɜː.mə.nənt/", vi: "vĩnh viễn", example: "The injury left him with permanent damage.", bucket: 0 },
      { word: "subsequent", type: "Tính từ", phonetic: "/ˈsʌb.sɪ.kwənt/", vi: "xảy ra sau đó", example: "The mistakes were discovered in subsequent checks.", bucket: 1 },
      { word: "preceding", type: "Tính từ", phonetic: "/prɪˈsiː.dɪŋ/", vi: "xảy ra trước đó", example: "Read the preceding chapter before taking the test.", bucket: 1 },
      { word: "chronological", type: "Tính từ", phonetic: "/ˌkrɒn.əˈlɒdʒ.ɪ.kəl/", vi: "theo thứ tự thời gian", example: "Please arrange the files in chronological order.", bucket: 1 },
      { word: "intermittent", type: "Tính từ", phonetic: "/ˌɪn.təˈmɪt.ənt/", vi: "gián đoạn, từng cơn", example: "There will be intermittent rain throughout the day.", bucket: 1 }
    ]
  },
  {
    unitNum: 38, title: "Unit 38: Quantity and Degree", description: "Đo lường số lượng và mức độ với các tính từ học thuật.", buckets: ["Quantity (Số lượng)", "Degree (Mức độ)"],
    words: [
      { word: "abundant", type: "Tính từ", phonetic: "/əˈbʌn.dənt/", vi: "dồi dào, phong phú", example: "The country has an abundant supply of natural resources.", bucket: 0 },
      { word: "sufficient", type: "Tính từ", phonetic: "/səˈfɪʃ.ənt/", vi: "đủ", example: "We have sufficient evidence to prove our theory.", bucket: 0 },
      { word: "countless", type: "Tính từ", phonetic: "/ˈkaʊnt.ləs/", vi: "vô số", example: "I have told you countless times not to do that.", bucket: 0 },
      { word: "minority", type: "Danh từ", phonetic: "/maɪˈnɒr.ə.ti/", vi: "thiểu số", example: "Only a small minority of students failed the exam.", bucket: 0 },
      { word: "profound", type: "Tính từ", phonetic: "/prəˈfaʊnd/", vi: "sâu sắc, to lớn", example: "The invention had a profound impact on society.", bucket: 1 },
      { word: "marginal", type: "Tính từ", phonetic: "/ˈmɑː.dʒɪ.nəl/", vi: "nhỏ, không đáng kể", example: "There has been only a marginal improvement in sales.", bucket: 1 },
      { word: "drastic", type: "Tính từ", phonetic: "/ˈdræs.tɪk/", vi: "quyết liệt, mạnh mẽ", example: "The government must take drastic measures.", bucket: 1 },
      { word: "moderate", type: "Tính từ", phonetic: "/ˈmɒd.ər.ət/", vi: "vừa phải, ôn hòa", example: "The hotel offers moderate prices for its rooms.", bucket: 1 }
    ]
  },
  {
    unitNum: 39, title: "Unit 39: Space and Distance", description: "Từ vựng về hình học, khoảng cách và sự sắp xếp không gian.", buckets: ["Space (Không gian)", "Distance (Khoảng cách)"],
    words: [
      { word: "spacious", type: "Tính từ", phonetic: "/ˈspeɪ.ʃəs/", vi: "rộng rãi", example: "The new apartment is bright and highly spacious.", bucket: 0 },
      { word: "compact", type: "Tính từ", phonetic: "/kəmˈpækt/", vi: "nhỏ gọn", example: "I bought a compact camera for my trip.", bucket: 0 },
      { word: "adjacent", type: "Tính từ", phonetic: "/əˈdʒeɪ.sənt/", vi: "kế bên, liền kề", example: "They live in the house adjacent to the railway.", bucket: 0 },
      { word: "remote", type: "Tính từ", phonetic: "/rɪˈməʊt/", vi: "xa xôi, hẻo lánh", example: "The tribe lives in a remote mountain village.", bucket: 0 },
      { word: "proximity", type: "Danh từ", phonetic: "/prɒkˈsɪm.ə.ti/", vi: "sự gần gũi, khoảng cách gần", example: "The hotel's proximity to the beach is a big advantage.", bucket: 1 },
      { word: "boundary", type: "Danh từ", phonetic: "/ˈbaʊn.dər.i/", vi: "ranh giới", example: "The river forms the natural boundary between the two countries.", bucket: 1 },
      { word: "widespread", type: "Tính từ", phonetic: "/ˌwaɪdˈspred/", vi: "lan rộng, phổ biến", example: "There is widespread support for the new policy.", bucket: 1 },
      { word: "confined", type: "Tính từ", phonetic: "/kənˈfaɪnd/", vi: "chật hẹp, hạn chế", example: "The prisoners were kept in a confined space.", bucket: 1 }
    ]
  },
  {
    unitNum: 40, title: "Unit 40: Senses and Perception", description: "Mô tả 5 giác quan và cách con người cảm nhận thế giới.", buckets: ["Senses (Giác quan)", "Perception (Nhận thức)"],
    words: [
      { word: "fragrant", type: "Tính từ", phonetic: "/ˈfreɪ.ɡrənt/", vi: "thơm ngát", example: "The garden is full of fragrant flowers.", bucket: 0 },
      { word: "deafening", type: "Tính từ", phonetic: "/ˈdef.ən.ɪŋ/", vi: "đinh tai nhức óc", example: "The explosion made a deafening noise.", bucket: 0 },
      { word: "texture", type: "Danh từ", phonetic: "/ˈteks.tʃər/", vi: "kết cấu (bề mặt)", example: "This fabric has a smooth texture.", bucket: 0 },
      { word: "bland", type: "Tính từ", phonetic: "/blænd/", vi: "nhạt nhẽo (vị giác)", example: "The soup was very bland and needed more salt.", bucket: 0 },
      { word: "transparent", type: "Tính từ", phonetic: "/trænˈspær.ənt/", vi: "trong suốt / rõ ràng", example: "The glass is completely transparent.", bucket: 1 },
      { word: "opaque", type: "Tính từ", phonetic: "/əʊˈpeɪk/", vi: "mờ đục, không nhìn xuyên qua được", example: "The windows were opaque with dirt.", bucket: 1 },
      { word: "tangible", type: "Tính từ", phonetic: "/ˈtæn.dʒə.bəl/", vi: "hữu hình, có thể sờ thấy", example: "We need tangible evidence of your success.", bucket: 1 },
      { word: "illusion", type: "Danh từ", phonetic: "/ɪˈluː.ʒən/", vi: "ảo ảnh, ảo giác", example: "The mirror creates an optical illusion of space.", bucket: 1 }
    ]
  },
  {
    unitNum: 41, title: "Unit 41: Communication and Language", description: "Từ vựng về giao tiếp phi ngôn ngữ, hùng biện và ngôn ngữ học.", buckets: ["Language (Ngôn ngữ)", "Communication (Giao tiếp)"],
    words: [
      { word: "articulate", type: "Tính từ", phonetic: "/ɑːˈtɪk.jə.lət/", vi: "hoạt ngôn, diễn đạt rõ ràng", example: "She is a highly articulate speaker.", bucket: 0 },
      { word: "eloquent", type: "Tính từ", phonetic: "/ˈel.ə.kwənt/", vi: "hùng hồn, đầy sức thuyết phục", example: "He gave an eloquent speech at the wedding.", bucket: 0 },
      { word: "bilingual", type: "Tính từ", phonetic: "/baɪˈlɪŋ.ɡwəl/", vi: "song ngữ", example: "They are raising their children to be bilingual.", bucket: 0 },
      { word: "jargon", type: "Danh từ", phonetic: "/ˈdʒɑː.ɡən/", vi: "biệt ngữ, thuật ngữ chuyên ngành", example: "The manual is full of technical jargon.", bucket: 0 },
      { word: "ambiguous", type: "Tính từ", phonetic: "/æmˈbɪɡ.ju.əs/", vi: "mơ hồ, đa nghĩa", example: "His answer was highly ambiguous.", bucket: 1 },
      { word: "explicit", type: "Tính từ", phonetic: "/ɪkˈsplɪs.ɪt/", vi: "rõ ràng, rành mạch", example: "I gave you explicit instructions to stay here.", bucket: 1 },
      { word: "implicit", type: "Tính từ", phonetic: "/ɪmˈplɪs.ɪt/", vi: "ngầm hiểu, không nói thẳng", example: "Her words contained an implicit threat.", bucket: 1 },
      { word: "non-verbal", type: "Tính từ", phonetic: "/ˌnɒnˈvɜː.bəl/", vi: "phi ngôn ngữ", example: "Body language is a form of non-verbal communication.", bucket: 1 }
    ]
  },
  {
    unitNum: 42, title: "Unit 42: Wealth and Poverty", description: "Các trạng thái tài chính từ siêu giàu cho đến nghèo túng.", buckets: ["Wealth (Giàu có)", "Poverty (Nghèo đói)"],
    words: [
      { word: "affluent", type: "Tính từ", phonetic: "/ˈæf.lu.ənt/", vi: "giàu có, sung túc", example: "They live in a highly affluent neighborhood.", bucket: 0 },
      { word: "prosperous", type: "Tính từ", phonetic: "/ˈprɒs.pər.əs/", vi: "thịnh vượng, phồn vinh", example: "The 1990s were a prosperous time for the economy.", bucket: 0 },
      { word: "fortune", type: "Danh từ", phonetic: "/ˈfɔː.tʃuːn/", vi: "gia tài, tài sản lớn", example: "He made a massive fortune in the oil industry.", bucket: 0 },
      { word: "extravagant", type: "Tính từ", phonetic: "/ɪkˈstræv.ə.ɡənt/", vi: "xa hoa, phung phí", example: "She leads an extravagant lifestyle.", bucket: 0 },
      { word: "destitute", type: "Tính từ", phonetic: "/ˈdes.tɪ.tʃuːt/", vi: "cùng cực, thiếu thốn", example: "The war left thousands of people completely destitute.", bucket: 1 },
      { word: "impoverished", type: "Tính từ", phonetic: "/ɪmˈpɒv.ər.ɪʃt/", vi: "nghèo khó", example: "The charity helps impoverished children in rural areas.", bucket: 1 },
      { word: "bankrupt", type: "Tính từ", phonetic: "/ˈbæŋ.krʌpt/", vi: "phá sản", example: "The company went bankrupt last year.", bucket: 1 },
      { word: "debt", type: "Danh từ", phonetic: "/det/", vi: "khoản nợ", example: "He is heavily in debt after buying the house.", bucket: 1 }
    ]
  },
  {
    unitNum: 43, title: "Unit 43: Beliefs and Ideologies", description: "Hệ tư tưởng, tôn giáo và sự đa dạng trong niềm tin nhân loại.", buckets: ["Beliefs (Niềm tin)", "Ideology (Hệ tư tưởng)"],
    words: [
      { word: "doctrine", type: "Danh từ", phonetic: "/ˈdɒk.trɪn/", vi: "học thuyết, giáo lý", example: "The church adheres strictly to its ancient doctrine.", bucket: 0 },
      { word: "ideology", type: "Danh từ", phonetic: "/ˌaɪ.diˈɒl.ə.dʒi/", vi: "hệ tư tưởng", example: "Capitalism is a dominant economic ideology.", bucket: 0 },
      { word: "dogma", type: "Danh từ", phonetic: "/ˈdɒɡ.mə/", vi: "giáo điều (bảo thủ)", example: "We must challenge political dogma.", bucket: 0 },
      { word: "secular", type: "Tính từ", phonetic: "/ˈsek.jə.lər/", vi: "thế tục (không liên quan tôn giáo)", example: "France is deeply proud of its secular society.", bucket: 0 },
      { word: "fanatic", type: "Danh từ", phonetic: "/fəˈnæt.ɪk/", vi: "kẻ cuồng tín", example: "He is a religious fanatic.", bucket: 1 },
      { word: "tolerant", type: "Tính từ", phonetic: "/ˈtɒl.ər.ənt/", vi: "khoan dung, chấp nhận sự khác biệt", example: "We should be highly tolerant of other cultures.", bucket: 1 },
      { word: "orthodox", type: "Tính từ", phonetic: "/ˈɔː.θə.dɒks/", vi: "chính thống, truyền thống", example: "He follows the orthodox teachings of his religion.", bucket: 1 },
      { word: "superstition", type: "Danh từ", phonetic: "/ˌsuː.pəˈstɪʃ.ən/", vi: "sự mê tín", example: "It is a common superstition that black cats bring bad luck.", bucket: 1 }
    ]
  },
  {
    unitNum: 44, title: "Unit 44: Power and Authority", description: "Cấu trúc quyền lực, lãnh đạo và sự phục tùng trong xã hội.", buckets: ["Power (Quyền lực)", "Authority (Thẩm quyền)"],
    words: [
      { word: "sovereignty", type: "Danh từ", phonetic: "/ˈsɒv.rɪn.ti/", vi: "chủ quyền", example: "The country declared its full sovereignty in 1945.", bucket: 0 },
      { word: "autonomy", type: "Danh từ", phonetic: "/ɔːˈtɒn.ə.mi/", vi: "sự tự trị, tự chủ", example: "The region was granted political autonomy.", bucket: 0 },
      { word: "dictator", type: "Danh từ", phonetic: "/dɪkˈteɪ.tər/", vi: "nhà độc tài", example: "The cruel dictator ruled the country for decades.", bucket: 0 },
      { word: "subordinate", type: "Danh từ", phonetic: "/səˈbɔː.dɪ.nət/", vi: "cấp dưới, người dưới quyền", example: "He treats his subordinates with great respect.", bucket: 0 },
      { word: "hierarchy", type: "Danh từ", phonetic: "/ˈhaɪə.rɑː.ki/", vi: "hệ thống cấp bậc", example: "The military has a strict hierarchy.", bucket: 1 },
      { word: "oppress", type: "Động từ", phonetic: "/əˈpres/", vi: "đàn áp, áp bức", example: "The regime used violence to oppress the people.", bucket: 1 },
      { word: "rebellion", type: "Danh từ", phonetic: "/rɪˈbel.i.ən/", vi: "cuộc nổi dậy", example: "The government easily crushed the armed rebellion.", bucket: 1 },
      { word: "empower", type: "Động từ", phonetic: "/ɪmˈpaʊər/", vi: "trao quyền", example: "Education can empower women in developing countries.", bucket: 1 }
    ]
  },
  {
    unitNum: 45, title: "Unit 45: Rules and Regulations", description: "Từ vựng về luật lệ, quy chế và các hình thức cưỡng chế.", buckets: ["Rules (Quy tắc)", "Regulations (Quy định)"],
    words: [
      { word: "mandatory", type: "Tính từ", phonetic: "/ˈmæn.də.tər.i/", vi: "bắt buộc", example: "Wearing a seatbelt is legally mandatory.", bucket: 0 },
      { word: "prohibit", type: "Động từ", phonetic: "/prəˈhɪb.ɪt/", vi: "nghiêm cấm", example: "Smoking is strictly prohibited in this building.", bucket: 0 },
      { word: "comply", type: "Động từ", phonetic: "/kəmˈplaɪ/", vi: "tuân thủ", example: "All businesses must comply with safety regulations.", bucket: 0 },
      { word: "enforce", type: "Động từ", phonetic: "/ɪnˈfɔːs/", vi: "thi hành, ép buộc tuân thủ", example: "The police are here to enforce the law.", bucket: 0 },
      { word: "abolish", type: "Động từ", phonetic: "/əˈbɒl.ɪʃ/", vi: "bãi bỏ (luật lệ, hệ thống)", example: "The government decided to abolish the tax.", bucket: 1 },
      { word: "loophole", type: "Danh từ", phonetic: "/ˈluːp.həʊl/", vi: "lỗ hổng luật pháp", example: "Rich companies use tax loopholes to save money.", bucket: 1 },
      { word: "violate", type: "Động từ", phonetic: "/ˈvaɪ.ə.leɪt/", vi: "vi phạm (luật, quyền)", example: "If you cross the border, you violate international law.", bucket: 1 },
      { word: "regulate", type: "Động từ", phonetic: "/ˈreɡ.jə.leɪt/", vi: "điều chỉnh, kiểm soát", example: "The government must regulate the financial markets.", bucket: 1 }
    ]
  },
  {
    unitNum: 46, title: "Unit 46: Crime and Punishment", description: "Các mức độ tội phạm học và hệ thống trừng phạt pháp lý.", buckets: ["Crime (Tội phạm)", "Punishment (Hình phạt)"],
    words: [
      { word: "felony", type: "Danh từ", phonetic: "/ˈfel.ə.ni/", vi: "trọng tội", example: "Armed robbery is considered a serious felony.", bucket: 0 },
      { word: "misdemeanor", type: "Danh từ", phonetic: "/ˌmɪs.dɪˈmiː.nər/", vi: "tội nhẹ", example: "Speeding is usually a minor misdemeanor.", bucket: 0 },
      { word: "smuggling", type: "Danh từ", phonetic: "/ˈsmʌɡ.lɪŋ/", vi: "tội buôn lậu", example: "He was arrested for drug smuggling.", bucket: 0 },
      { word: "embezzlement", type: "Danh từ", phonetic: "/ɪmˈbez.əl.mənt/", vi: "sự biển thủ, tham ô", example: "The bank manager was charged with embezzlement.", bucket: 0 },
      { word: "rehabilitate", type: "Động từ", phonetic: "/ˌriː.həˈbɪl.ɪ.teɪt/", vi: "cải tạo (tội phạm)", example: "The prison aims to rehabilitate young offenders.", bucket: 1 },
      { word: "probation", type: "Danh từ", phonetic: "/prəˈbeɪ.ʃən/", vi: "thời gian thử thách, án treo", example: "He was sentenced to two years of probation.", bucket: 1 },
      { word: "capital punishment", type: "Cụm danh từ", phonetic: "/ˌkæp.ɪ.təl ˈpʌn.ɪʃ.mənt/", vi: "án tử hình", example: "Many countries have abolished capital punishment.", bucket: 1 },
      { word: "fine", type: "Danh từ", phonetic: "/faɪn/", vi: "tiền phạt", example: "He had to pay a heavy fine for illegal parking.", bucket: 1 }
    ]
  },
  {
    unitNum: 47, title: "Unit 47: War and Peace", description: "Từ vựng quân sự, xung đột quốc tế và gìn giữ hòa bình.", buckets: ["War (Chiến tranh)", "Peace (Hòa bình)"],
    words: [
      { word: "casualty", type: "Danh từ", phonetic: "/ˈkæʒ.ju.əl.ti/", vi: "thương vong (người chết/bị thương)", example: "The war caused heavy civilian casualties.", bucket: 0 },
      { word: "ally", type: "Danh từ", phonetic: "/ˈæl.aɪ/", vi: "đồng minh", example: "During the war, France was our closest ally.", bucket: 0 },
      { word: "treaty", type: "Danh từ", phonetic: "/ˈtriː.ti/", vi: "hiệp ước (quốc tế)", example: "The two nations signed a historic peace treaty.", bucket: 0 },
      { word: "ceasefire", type: "Danh từ", phonetic: "/ˈsiːs.faɪər/", vi: "lệnh ngừng bắn", example: "The UN negotiated a temporary ceasefire.", bucket: 0 },
      { word: "invade", type: "Động từ", phonetic: "/ɪnˈveɪd/", vi: "xâm lược", example: "The enemy army tried to invade the capital.", bucket: 1 },
      { word: "surrender", type: "Động từ", phonetic: "/sərˈen.dər/", vi: "đầu hàng", example: "The surrounded troops were forced to surrender.", bucket: 1 },
      { word: "refugee", type: "Danh từ", phonetic: "/ˌref.juˈdʒiː/", vi: "người tị nạn", example: "Thousands of refugees fled across the border.", bucket: 1 },
      { word: "reconciliation", type: "Danh từ", phonetic: "/ˌrek.ənˌsɪl.iˈeɪ.ʃən/", vi: "sự hòa giải", example: "It takes time for reconciliation after a civil war.", bucket: 1 }
    ]
  },
  {
    unitNum: 48, title: "Unit 48: Education and Learning", description: "Thảo luận về sư phạm, giáo dục đại học và học tập suốt đời.", buckets: ["Education (Giáo dục)", "Learning (Học tập)"],
    words: [
      { word: "curriculum", type: "Danh từ", phonetic: "/kəˈrɪk.jə.ləm/", vi: "chương trình giảng dạy", example: "Math and science are core subjects in the curriculum.", bucket: 0 },
      { word: "pedagogy", type: "Danh từ", phonetic: "/ˈped.ə.ɡɒdʒ.i/", vi: "sư phạm học, phương pháp giảng dạy", example: "Modern pedagogy focuses on active learning.", bucket: 0 },
      { word: "illiterate", type: "Tính từ", phonetic: "/ɪˈlɪt.ər.ət/", vi: "mù chữ", example: "Many children in the village remain illiterate.", bucket: 0 },
      { word: "tuition", type: "Danh từ", phonetic: "/tʃuːˈɪʃ.ən/", vi: "học phí", example: "University tuition fees have increased significantly.", bucket: 0 },
      { word: "scholarship", type: "Danh từ", phonetic: "/ˈskɒl.ə.ʃɪp/", vi: "học bổng", example: "She won a full scholarship to Harvard.", bucket: 1 },
      { word: "plagiarism", type: "Danh từ", phonetic: "/ˈpleɪ.dʒər.ɪ.zəm/", vi: "sự đạo văn", example: "Plagiarism will result in immediate expulsion.", bucket: 1 },
      { word: "alumni", type: "Danh từ", phonetic: "/əˈlʌm.naɪ/", vi: "cựu sinh viên", example: "The university alumni donated millions of dollars.", bucket: 1 },
      { word: "cram", type: "Động từ", phonetic: "/kræm/", vi: "học nhồi nhét", example: "He had to cram for his final exams all night.", bucket: 1 }
    ]
  },
  {
    unitNum: 49, title: "Unit 49: Nature and Environment", description: "Từ vựng nâng cao về hệ sinh thái và bảo tồn thiên nhiên.", buckets: ["Nature (Thiên nhiên)", "Conservation (Bảo tồn)"],
    words: [
      { word: "habitat", type: "Danh từ", phonetic: "/ˈhæb.ɪ.tæt/", vi: "môi trường sống", example: "The forest is the natural habitat of the tiger.", bucket: 0 },
      { word: "ecosystem", type: "Danh từ", phonetic: "/ˈiː.kəʊˌsɪs.təm/", vi: "hệ sinh thái", example: "Pollution is destroying the delicate marine ecosystem.", bucket: 0 },
      { word: "extinction", type: "Danh từ", phonetic: "/ɪkˈstɪŋk.ʃən/", vi: "sự tuyệt chủng", example: "Many species are facing extinction due to climate change.", bucket: 0 },
      { word: "conservation", type: "Danh từ", phonetic: "/ˌkɒn.səˈveɪ.ʃən/", vi: "sự bảo tồn", example: "Wildlife conservation is highly necessary.", bucket: 0 },
      { word: "deplete", type: "Động từ", phonetic: "/dɪˈpliːt/", vi: "làm cạn kiệt", example: "We are rapidly depleting the earth's natural resources.", bucket: 1 },
      { word: "biodegradable", type: "Tính từ", phonetic: "/ˌbaɪ.əʊ.dɪˈɡreɪ.də.bəl/", vi: "có thể phân hủy sinh học", example: "Please use completely biodegradable plastic bags.", bucket: 1 },
      { word: "emit", type: "Động từ", phonetic: "/iˈmɪt/", vi: "phát ra, thải ra", example: "Cars emit toxic gases into the atmosphere.", bucket: 1 },
      { word: "poaching", type: "Danh từ", phonetic: "/ˈpəʊ.tʃɪŋ/", vi: "nạn săn trộm", example: "Illegal poaching is a major threat to rhinos.", bucket: 1 }
    ]
  },
  {
    unitNum: 50, title: "Unit 50: Science and Discovery", description: "Thành tựu khoa học, nghiên cứu phòng thí nghiệm và vật lý.", buckets: ["Science (Khoa học)", "Discovery (Khám phá)"],
    words: [
      { word: "breakthrough", type: "Danh từ", phonetic: "/ˈbreɪk.θruː/", vi: "bước đột phá lớn", example: "The discovery of DNA was a major scientific breakthrough.", bucket: 0 },
      { word: "hypothesis", type: "Danh từ", phonetic: "/haɪˈpɒθ.ə.sɪs/", vi: "giả thuyết", example: "The experiment proved his initial hypothesis wrong.", bucket: 0 },
      { word: "genetic", type: "Tính từ", phonetic: "/dʒəˈnet.ɪk/", vi: "thuộc về di truyền học", example: "Eye color is a highly genetic trait.", bucket: 0 },
      { word: "radiation", type: "Danh từ", phonetic: "/ˌreɪ.diˈeɪ.ʃən/", vi: "bức xạ, phóng xạ", example: "Exposure to high levels of radiation is dangerous.", bucket: 0 },
      { word: "microscopic", type: "Tính từ", phonetic: "/ˌmaɪ.krəˈskɒp.ɪk/", vi: "cực nhỏ, vi mô", example: "Bacteria are truly microscopic organisms.", bucket: 1 },
      { word: "catalyst", type: "Danh từ", phonetic: "/ˈkæt.əl.ɪst/", vi: "chất xúc tác", example: "Enzymes act as a powerful catalyst in chemical reactions.", bucket: 1 },
      { word: "simulate", type: "Động từ", phonetic: "/ˈsɪm.jə.leɪt/", vi: "mô phỏng", example: "They use computers to completely simulate the weather.", bucket: 1 },
      { word: "innovation", type: "Danh từ", phonetic: "/ˌɪn.əˈveɪ.ʃən/", vi: "sự đổi mới, sáng chế", example: "Technological innovation drives economic growth.", bucket: 1 }
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

const fileContent = "// File: src/data/oxfordAdvancedData26_50.js\n// Auto-generated 25 Advanced Units (26-50)\n\n" +
  "export const courseData26_50 = " + JSON.stringify(courseData, null, 2) + ";\n";

fs.writeFileSync('src/data/oxfordAdvancedData26_50.js', fileContent);
console.log("Successfully generated oxfordAdvancedData26_50.js");
