import fs from 'fs';
import path from 'path';

// Import datasets
import vocabVstepData from '../src/data/vocabVstepData.js';
import vocabExtendedData from '../src/data/vocabExtendedData.js';
import vocabMoreData from '../src/data/vocabMoreData.js';
import vocabFinalData from '../src/data/vocabFinalData.js';

// Candidates for the 25 categories that need words
const candidateWords = {
  'economy-money': [
    ["shareholder", "(n)", "cổ đông", "/ˈʃeəhəʊldə/", "Meet the company shareholders.", "Gặp gỡ các cổ đông của công ty."],
    ["liquidation", "(n)", "sự thanh lý tài sản", "/ˌlɪkwɪˈdeɪʃn/", "Going into forced liquidation.", "Bị buộc phải thanh lý tài sản."],
    ["subsidiary", "(n)", "công ty con", "/səbˈsɪdiəri/", "A subsidiary of a large group.", "Một công ty con của một tập đoàn lớn."],
    ["microfinance", "(n)", "tài chính vi mô", "/ˌmaɪkrəʊˈfaɪnæns/", "Support microfinance in rural areas.", "Hỗ trợ tài chính vi mô ở vùng nông thôn."],
    ["macroeconomy", "(n)", "kinh tế vĩ mô", "/ˌmækrəʊɪˈkɒnəmi/", "Analyze the national macroeconomy.", "Phân tích nền kinh tế vĩ mô quốc gia."],
    ["capitalism", "(n)", "chủ nghĩa tư bản", "/ˈkæpɪtəlɪzəm/", "Study the history of capitalism.", "Nghiên cứu lịch sử của chủ nghĩa tư bản."],
    ["cash flow", "(n)", "dòng tiền", "/ˈkæʃ fləʊ/", "Manage the monthly cash flow.", "Quản lý dòng tiền hàng tháng."],
    ["treasury bill", "(n)", "tín phiếu kho bạc", "/ˈtreʒəri bɪl/", "Invest in safe treasury bills.", "Đầu tư vào tín phiếu kho bạc an toàn."],
    ["dividend payout", "(n)", "chi trả cổ tức", "/ˈdɪvɪdend ˈpeɪaʊt/", "The company announced a dividend payout.", "Công ty công bố chi trả cổ tức."],
    ["economic growth", "(n)", "tăng trưởng kinh tế", "/ˌiːkəˈnɒmɪk ɡrəʊθ/", "Fostering stable economic growth.", "Thúc đẩy tăng trưởng kinh tế ổn định."]
  ],
  'daily-routine-time-management': [
    ["timeframe", "(n)", "khung thời gian", "/ˈtaɪmfreɪm/", "Complete within the timeframe.", "Hoàn thành trong khung thời gian."],
    ["chronological", "(adj)", "theo thứ tự thời gian", "/ˌkrɒnəˈlɒdʒɪkl/", "Arrange in chronological order.", "Sắp xếp theo thứ tự thời gian."],
    ["timesheet", "(n)", "bảng chấm công", "/ˈtaɪmʃiːt/", "Submit your weekly timesheet.", "Nộp bảng chấm công hàng tuần của bạn."],
    ["time-consuming", "(adj)", "tốn thời gian", "/ˈtaɪm kənˈsjuːmɪŋ/", "A time-consuming task.", "Một nhiệm vụ tốn thời gian."],
    ["punctuality", "(n)", "sự đúng giờ", "/ˌpʌŋktʃuˈæləti/", "Punctuality is highly valued.", "Sự đúng giờ được đánh giá rất cao."],
    ["interruption", "(n)", "sự gián đoạn", "/ˌɪntəˈrʌpʃn/", "Work without any interruption.", "Làm việc mà không có bất kỳ sự gián đoạn nào."],
    ["overtime", "(n)", "thời gian làm thêm giờ", "/ˈəʊvətaɪm/", "Work ten hours of overtime.", "Làm thêm mười giờ đồng hồ."],
    ["procrastinator", "(n)", "người hay trì hoãn", "/prəˈkræstɪneɪtə/", "He is a chronic procrastinator.", "Anh ấy là một người trì hoãn kinh niên."],
    ["distraction", "(n)", "sự gây xao nhãng", "/dɪˈstrækʃn/", "Avoid distraction while studying.", "Tránh xao nhãng khi đang học."],
    ["priority", "(n)", "sự ưu tiên", "/praɪˈɒrəti/", "Safety is our top priority.", "An toàn là sự ưu tiên hàng đầu của chúng tôi."],
    ["punctual", "(adj)", "đúng giờ", "/ˈpʌŋktʃuəl/", "Please be punctual for the meeting.", "Vui lòng đúng giờ họp."],
    ["time limit", "(n)", "giới hạn thời gian", "/ˈtaɪm ˌlɪmɪt/", "There is a strict time limit.", "Có một giới hạn thời gian nghiêm ngặt."],
    ["deadline day", "(n)", "ngày hạn chót", "/ˈdedlaɪn deɪ/", "The project deadline day is Friday.", "Ngày hạn chót của dự án là thứ sáu."],
    ["time management", "(n)", "quản lý thời gian", "/ˈtaɪm ˈmænɪdʒmənt/", "Learn time management skills.", "Học các kỹ năng quản lý thời gian."],
    ["daily schedule", "(n)", "lịch trình hàng ngày", "/ˈdeɪli ˈʃedjuːl/", "Follow my daily schedule.", "Theo lịch trình hàng ngày của tôi."],
    ["work hour", "(n)", "giờ làm việc", "/wɜːk ˈaʊə/", "Count the total work hours.", "Đếm tổng số giờ làm việc."]
  ],
  'family-relationships': [
    ["relative", "(n)", "họ hàng", "/ˈrelətɪv/", "Visit my relatives on weekends.", "Thăm họ hàng của tôi vào cuối tuần."],
    ["foster parent", "(n)", "cha mẹ nuôi", "/ˈfɒstə ˌpeərənt/", "They became foster parents.", "Họ đã trở thành cha mẹ nuôi."],
    ["kinsman", "(n)", "người cùng họ hàng", "/ˈkɪnzmən/", "He is my distant kinsman.", "Anh ấy là họ hàng xa của tôi."],
    ["stepdaughter", "(n)", "con gái riêng của vợ/chồng", "/ˈstepdɔːtə/", "Adopt his young stepdaughter.", "Nhận nuôi con gái riêng của vợ/chồng mình."],
    ["stepson", "(n)", "con trai riêng của vợ/chồng", "/ˈstepsʌn/", "Raise his stepson with love.", "Nuôi dạy con trai riêng của vợ/chồng với tình yêu."],
    ["stepbrother", "(n)", "anh em kế", "/ˈstepbrʌðə/", "Play game with my stepbrother.", "Chơi game cùng anh em kế của tôi."],
    ["stepsister", "(n)", "chị em kế", "/ˈstepsɪstə/", "My stepsister is a teacher.", "Chị em kế của tôi là giáo viên."],
    ["lineage", "(n)", "dòng dõi", "/ˈlɪniɪdʒ/", "Trace my family lineage.", "Dò tìm dòng dõi gia đình tôi."],
    ["pedigree", "(n)", "phả hệ", "/ˈpedɪɡriː/", "A dog with a fine pedigree.", "Một chú chó có phả hệ tốt."],
    ["betrothal", "(n)", "sự đính hôn", "/bɪˈtrəʊðl/", "Announce their betrothal.", "Tuyên bố sự đính hôn của họ."],
    ["godson", "(n)", "con trai đỡ đầu", "/ˈɡɒdsʌn/", "Buy a gift for my godson.", "Mua quà cho con trai đỡ đầu của tôi."],
    ["goddaughter", "(n)", "con gái đỡ đầu", "/ˈɡɒdˌdɔːtə/", "Visits her goddaughter often.", "Thường xuyên đến thăm con gái đỡ đầu."],
    ["nephew", "(n)", "cháu trai", "/ˈnefjuː/", "My nephew goes to school.", "Cháu trai tôi đi học."],
    ["niece", "(n)", "cháu gái", "/niːs/", "My niece loves candy.", "Cháu gái tôi thích kẹo."],
    ["great-grandmother", "(n)", "bà cố", "/ˌɡreɪt ˈɡrænˌmʌðə/", "My great-grandmother is ninety.", "Bà cố tôi đã chín mươi tuổi."],
    ["great-grandfather", "(n)", "ông cố", "/ˌɡreɪt ˈɡrændˌfɑːðə/", "My great-grandfather was a doctor.", "Ông cố tôi từng là bác sĩ."],
    ["clan", "(n)", "gia tộc", "/klæn/", "The clan gathered for dinner.", "Gia tộc tụ họp ăn tối."],
    ["offspring", "(n)", "con ruột", "/ˈɒfsprɪŋ/", "They have four offspring.", "Họ có bốn người con."],
    ["ancestress", "(n)", "tổ tiên nữ", "/ˈænsestres/", "Honor our ancestress.", "Tôn vinh tổ tiên nữ của chúng tôi."],
    ["paternal side", "(n)", "họ nội", "/pəˈtɜːnl saɪd/", "Relatives on the paternal side.", "Họ hàng bên nội."],
    ["maternal side", "(n)", "họ ngoại", "/məˈtɜːnl saɪd/", "Relatives on the maternal side.", "Họ hàng bên ngoại."],
    ["godparents", "(n)", "cha mẹ đỡ đầu", "/ˈɡɒdˌpeərənts/", "Meet my kind godparents.", "Gặp cha mẹ đỡ đầu tốt bụng của tôi."],
    ["family tree", "(n)", "gia phả gia đình", "/ˈfæməli triː/", "Draw a detailed family tree.", "Vẽ gia phả gia đình chi tiết."]
  ],
  'food-cooking': [
    ["fryer", "(n)", "nồi chiên", "/ˈfraɪə/", "Use an air fryer.", "Sử dụng nồi chiên không dầu."],
    ["toaster", "(n)", "máy nướng bánh mì", "/ˈtəʊstə/", "Put bread in the toaster.", "Cho bánh mì vào máy nướng."],
    ["spatula", "(n)", "cái xẻng xào nấu", "/ˈspætʃələ/", "Flip eggs with a spatula.", "Lật trứng bằng cái xẻng."],
    ["whisk", "(n)", "dụng cụ đánh trứng", "/wɪsk/", "Use a wire whisk.", "Sử dụng dụng cụ đánh trứng bằng thép."],
    ["skillet", "(n)", "chảo rán", "/ˈskɪlɪt/", "Heat oil in a skillet.", "Đun nóng dầu trong chảo rán."],
    ["griddle", "(n)", "vỉ nướng", "/ˈɡrɪdl/", "Cook pancakes on a griddle.", "Làm bánh kếp trên vỉ nướng."],
    ["ladle", "(n)", "cái muôi múc canh", "/ˈleɪdl/", "Scoop soup with a ladle.", "Múc súp bằng cái muôi."],
    ["strainer", "(n)", "cái rây lọc", "/ˈstreɪnə/", "Pour tea through a strainer.", "Rót trà qua cái rây lọc."],
    ["colander", "(n)", "cái rổ rửa rau ráo nước", "/ˈkʌlɪndə/", "Drain pasta in a colander.", "Để ráo mỳ Ý trong cái rổ."],
    ["blender", "(n)", "máy xay sinh tố", "/ˈblendə/", "Make smoothies in a blender.", "Làm sinh tố bằng máy xay."],
    ["steamer", "(n)", "nồi hấp", "/ˈstiːmə/", "Steam fish in a bamboo steamer.", "Hấp cá trong nồi hấp tre."],
    ["corkscrew", "(n)", "cái mở nút chai rượu", "/ˈcɔːkskruː/", "Open the bottle with a corkscrew.", "Mở chai bằng cái mở nút chai."],
    ["grater", "(n)", "cái nạo phô mai", "/ˈɡreɪtə/", "Grate cheese with a metal grater.", "Nạo phô mai bằng cái nạo kim loại."],
    ["peeler", "(n)", "dao nạo vỏ quả", "/ˈpiːlə/", "Peel potatoes with a peeler.", "Nạo vỏ khoai tây bằng dao nạo."],
    ["chopping board", "(n)", "thớt thái đồ ăn", "/ˈtʃɒpɪŋ bɔːd/", "Chop onions on a chopping board.", "Thái hành tây trên thớt."],
    ["apron", "(n)", "tạp dề", "/ˈeɪprən/", "Wear a clean cooking apron.", "Đeo tạp dề nấu ăn sạch sẽ."],
    ["recipe book", "(n)", "sách công thức", "/ˈresəpi bʊk/", "Read a vintage recipe book.", "Đọc một cuốn sách công thức cổ."],
    ["ovenglove", "(n)", "găng tay lò nướng", "/ˈʌvn ɡlʌv/", "Wear oven gloves to hold hot pots.", "Đeo găng tay lò nướng để bê nồi nóng."],
    ["saucepan", "(n)", "xoong quai dài", "/ˈsɔːspən/", "Boil water in a saucepan.", "Đun sôi nước trong xoong."],
    ["casserole", "(n)", "nồi hầm gốm", "/ˈkæsərəʊl/", "Bake chicken in a casserole.", "Nướng gà trong nồi hầm gốm."],
    ["kettle", "(n)", "ấm đun nước", "/ˈketl/", "Boil water in the electric kettle.", "Đun sôi nước bằng ấm điện."]
  ],
  'emotions-personality': [
    ["introversion", "(n)", "sự hướng nội", "/ˌɪntrəˈvɜːʃn/", "Quiet introspection and introversion.", "Sự nội quan và hướng nội yên tĩnh."],
    ["extroversion", "(n)", "sự hướng ngoại", "/ˌekstrəˈvɜːʃn/", "Her extroversion makes her friendly.", "Sự hướng ngoại giúp cô ấy thân thiện."],
    ["arrogance", "(n)", "sự kiêu ngạo", "/ˈærəɡəns/", "Dislike his extreme arrogance.", "Ghét sự kiêu ngạo tột cùng của anh ta."],
    ["humility", "(n)", "lòng khiêm tốn", "/hjuːˈmɪləti/", "Show deep humility and respect.", "Thể hiện lòng khiêm tốn sâu sắc và sự tôn trọng."],
    ["pessimism", "(n)", "sự bi quan", "/ˈpesɪmɪzəm/", "Overcome negative pessimism.", "Vượt qua sự bi quan tiêu cực."],
    ["optimist", "(n)", "người lạc quan", "/ˈɒptɪmɪst/", "She is an eternal optimist.", "Cô ấy là một người luôn lạc quan."],
    ["pessimist", "(n)", "người bi quan", "/ˈpesɪmɪst/", "Don't be a sad pessimist.", "Đừng làm một người bi quan buồn bã."],
    ["gentleness", "(n)", "sự dịu dàng", "/ˈdʒentlnəs/", "Treat kids with gentleness.", "Đối xử với trẻ em bằng sự dịu dàng."],
    ["kindness", "(n)", "sự tốt bụng", "/ˈkaɪndnəs/", "Act of random kindness.", "Hành động tốt bụng ngẫu nhiên."],
    ["cruelty", "(n)", "sự tàn ác", "/ˈkruːəlti/", "Prevent cruelty to animals.", "Ngăn chặn sự tàn ác đối với động vật."],
    ["loyalty", "(n)", "lòng trung thành", "/ˈlɔɪəlti/", "Dog loyalty is absolute.", "Lòng trung thành của loài chó là tuyệt đối."],
    ["betrayal", "(n)", "sự phản bội", "/bɪˈtreɪəl/", "Felt hurt by his betrayal.", "Cảm thấy bị tổn thương bởi sự phản bội của anh ta."],
    ["bravery", "(n)", "lòng dũng cảm", "/ˈbreɪvəri/", "Awarded for outstanding bravery.", "Được trao giải vì lòng dũng cảm nổi bật."],
    ["honesty", "(n)", "sự trung thực", "/ˈɒnəsti/", "Honesty is the best policy.", "Trung thực là quốc sách."],
    ["deceit", "(n)", "sự lừa dối", "/dɪˈsiːt/", "Expose his hidden deceit.", "Vạch trần sự lừa dối ẩn giấu của anh ta."],
    ["sincerity", "(n)", "sự chân thành", "/sɪnˈserəti/", "Speak with absolute sincerity.", "Nói chuyện với sự chân thành tuyệt đối."],
    ["generosity", "(n)", "sự hào phóng", "/ˌdʒenəˈrɒsəti/", "Grateful for their generosity.", "Biết ơn sự hào phóng của họ."],
    ["selfishness", "(n)", "sự ích kỷ", "/ˈselfɪʃnəs/", "Angered by his selfishness.", "Tức giận bởi sự ích kỷ của anh ta."],
    ["patience", "(n)", "lòng kiên nhẫn", "/ˈpeɪʃns/", "Testing my limited patience.", "Thử thách lòng kiên nhẫn có hạn của tôi."],
    ["impatience", "(n)", "sự thiếu kiên nhẫn", "/ɪmˈpeɪʃns/", "Show impatience in traffic.", "Thể hiện sự thiếu kiên nhẫn khi tắc đường."]
  ],
  'animals-pets': [
    ["reptile", "(n)", "loài bò sát", "/ˈreptaɪl/", "Lizards are cold-blooded reptiles.", "Thằn lằn là loài bò sát máu lạnh."],
    ["insect", "(n)", "côn trùng", "/ˈɪnsekt/", "Bees are useful insects.", "Ong là loài côn trùng có ích."],
    ["veterinarian", "(n)", "bác sĩ thú y", "/ˌvetərɪˈneəriən/", "Take the sick cat to a veterinarian.", "Đưa con mèo bị ốm đến bác sĩ thú y."],
    ["leash", "(n)", "dây xích chó", "/liːʃ/", "Keep your dog on a leash.", "Giữ chó của bạn bằng dây xích."],
    ["collar", "(n)", "vòng cổ thú cưng", "/ˈkɒlə/", "A red leather dog collar.", "Một chiếc vòng cổ cho chó bằng da màu đỏ."],
    ["flea", "(n)", "con bọ chét", "/fliː/", "The dog has itchy fleas.", "Chú chó bị ngứa do bọ chét."],
    ["veterinary", "(adj)", "thuộc thú y", "/ˈvetnri/", "Advanced veterinary clinic.", "Phòng khám thú y tiên tiến."],
    ["predator", "(n)", "kẻ săn mồi", "/ˈpredətə/", "Eagles are apex predators.", "Đại bàng là loài săn mồi đỉnh cao."],
    ["prey", "(n)", "con mồi", "/preɪ/", "The mouse was eagle prey.", "Con chuột là mồi của đại bàng."],
    ["domesticated animal", "(n)", "động vật được thuần hóa", "/dəˈmestɪkeɪtɪd ˈænɪml/", "Cows are domesticated animals.", "Bò là động vật đã được thuần hóa."],
    ["wild animal", "(n)", "động vật hoang dã", "/waɪld ˈænɪml/", "Do not feed wild animals.", "Không cho động vật hoang dã ăn."],
    ["aquarium", "(n)", "bể cá / thủy cung", "/əˈkweəriəm/", "Visit the city aquarium.", "Ghé thăm thủy cung thành phố."],
    ["wild beast", "(n)", "thú hoang", "/waɪld biːst/", "The wild beast hunts at night.", "Thú hoang săn mồi vào ban đêm."]
  ],
  'weather-seasons': [
    ["meteorological", "(adj)", "thuộc khí tượng", "/ˌmiːtiərəˈlɒdʒɪkl/", "Check meteorological records.", "Kiểm tra hồ sơ khí tượng."],
    ["barometric", "(adj)", "thuộc áp suất khí quyển", "/ˌbærəˈmetrɪk/", "Barometric pressure drops.", "Áp suất khí quyển giảm."],
    ["hygrometer", "(n)", "ẩm kế", "/haɪˈɡrɒmɪtə/", "Measure humidity with a hygrometer.", "Đo độ ẩm bằng ẩm kế."],
    ["climate forecast", "(n)", "dự báo khí hậu", "/ˈklaɪmət ˈfɔːkɑːst/", "The climate forecast predicts warming.", "Dự báo khí hậu dự báo sự ấm lên."],
    ["dry spell", "(n)", "đợt khô hạn ngắn", "/draɪ spel/", "Water plants during the dry spell.", "Tưới cây trong đợt khô hạn."],
    ["deluge", "(n)", "trận đại hồng thủy/mưa lớn", "/ˈdeljuːdʒ/", "A deluge of rain flooded streets.", "Một trận mưa như trút nước đã làm ngập đường phố."],
    ["tempestuous", "(adj)", "bão bùng", "/temˈpestʃuəs/", "Tempestuous winter weather.", "Thời tiết mùa đông bão bùng."],
    ["gale force", "(adj)", "sức gió giật mạnh", "/ɡeɪl fɔːs/", "Gale force winds damaged trees.", "Gió giật mạnh làm gãy cây."],
    ["breezy afternoon", "(n)", "buổi chiều nhiều gió nhẹ", "/ˈbriːzi ˌɑːftəˈnuːn/", "Fly a kite on a breezy afternoon.", "Thả diều vào một buổi chiều nhiều gió nhẹ."],
    ["monsoonal", "(adj)", "thuộc mùa mưa/gió mùa", "/mɒnˈsuːnl/", "Monsoonal rain patterns in Asia.", "Đặc điểm mưa gió mùa ở châu Á."],
    ["typhoon alert", "(n)", "cảnh báo bão nhiệt đới", "/taɪˈfuːn əˈlɜːt/", "Broadcast a typhoon alert.", "Phát sóng cảnh báo bão nhiệt đới."],
    ["avalanche warning", "(n)", "cảnh báo tuyết lở", "/ˈævəlɑːntʃ ˈwɔːnɪŋ/", "Skiers ignored the avalanche warning.", "Những người trượt tuyết đã phớt lờ cảnh báo tuyết lở."],
    ["semi-arid climate", "(n)", "khí hậu bán khô hạn", "/ˌsemi ˈærɪd ˈklaɪmət/", "Cacti grow in a semi-arid climate.", "Xương rồng mọc ở vùng khí hậu bán khô hạn."],
    ["temperate zone", "(n)", "vùng ôn đới", "/ˈtempərət zəʊn/", "We live in the temperate zone.", "Chúng tôi sống ở vùng ôn đới."],
    ["tropical rainforest", "(n)", "rừng mưa nhiệt đới", "/ˈtrɒpɪkl ˈreɪnfɒrɪst/", "Protecting the tropical rainforest.", "Bảo vệ rừng mưa nhiệt đới."],
    ["frigid zone", "(n)", "hàn đới", "/ˈfrɪdʒɪd zəʊn/", "Few plants survive in the frigid zone.", "Ít loài cây sống được ở hàn đới."],
    ["scorching afternoon", "(n)", "buổi chiều nóng nực", "/ˈskɔːtʃɪŋ ˌɑːftəˈnuːn/", "Stay indoors on a scorching afternoon.", "Ở trong nhà vào buổi chiều nóng bức."],
    ["frosty morning", "(n)", "buổi sáng phủ sương lạnh", "/ˈfrɒsti ˈmɔːnɪŋ/", "Frosty morning grass sparkled.", "Cỏ buổi sáng lạnh giá lấp lánh."],
    ["foggy highway", "(n)", "đường cao tốc mù sương", "/ˈfɒɡi ˈhaɪweɪ/", "Drive carefully on a foggy highway.", "Lái xe cẩn thận trên đường cao tốc đầy sương mù."],
    ["overcast sky", "(n)", "bầu trời u ám", "/ˌəʊvəˈkɑːst skaɪ/", "Rain is coming under an overcast sky.", "Mưa sắp rơi dưới bầu trời u ám."],
    ["muggy summer", "(n)", "mùa hè ẩm ướt khó chịu", "/ˈmʌɡi ˈsʌmə/", "Sweating during a muggy summer.", "Đổ mồ hôi trong mùa hè nóng ẩm."],
    ["wintry mix", "(n)", "mưa lẫn tuyết", "/ˈwɪntri mɪks/", "The forecast predicts a wintry mix.", "Dự báo thời tiết dự đoán mưa lẫn tuyết."],
    ["summery day", "(n)", "ngày hè ấm áp", "/ˈsʌməri deɪ/", "Enjoy a beautiful summery day.", "Tận hưởng một ngày hè ấm áp đẹp trời."],
    ["autumnal equinox", "(n)", "thu phân", "/ɔːˈtʌmnl ˈiːkwɪnɒks/", "Celebrate the autumnal equinox.", "Chào đón ngày thu phân."],
    ["vernal equinox", "(n)", "xuân phân", "/ˈvɜːnl ˈiːkwɪnɒks/", "Vernal equinox occurs in March.", "Ngày xuân phân xảy ra vào tháng Ba."],
    ["meteorology lab", "(n)", "phòng thí nghiệm khí tượng", "/ˌmiːtiəˈrɒlədʒi lab/", "Research in the meteorology lab.", "Nghiên cứu trong phòng khí tượng."],
    ["rain gauge", "(n)", "dụng cụ đo mưa", "/ˈreɪn ɡeɪdʒ/", "Check the backyard rain gauge.", "Kiểm tra ống đo lượng mưa ở sân sau."],
    ["weather satellite", "(n)", "vệ tinh thời tiết", "/ˈweðə ˈsætəlaɪt/", "Visions sent from a weather satellite.", "Hình ảnh gửi về từ vệ tinh thời tiết."],
    ["humidity level", "(n)", "độ ẩm không khí", "/hjuːˈmɪdəti ˈlevl/", "High humidity levels in bathrooms.", "Mức độ ẩm cao trong phòng tắm."]
  ],
  'technology-internet': [
    ["cybersecurity", "(n)", "an ninh mạng", "/ˌsaɪbəʃɪˈkjʊərəti/", "Invest in national cybersecurity.", "Đầu tư vào an ninh mạng quốc gia."],
    ["artificial intelligence", "(n)", "trí tuệ nhân tạo", "/ˌɑːtɪˈfɪʃl ɪnˈtelɪɡəns/", "Develop safe artificial intelligence.", "Phát triển trí tuệ nhân tạo an toàn."],
    ["machine learning", "(n)", "học máy", "/məˈʃiːn ˈlɜːnɪŋ/", "Algorithms based on machine learning.", "Các thuật toán dựa trên học máy."],
    ["blockchain", "(n)", "công nghệ chuỗi khối", "/ˈblɒktʃeɪn/", "Secure transactions using blockchain.", "Giao dịch bảo mật bằng blockchain."],
    ["cryptocurrency", "(n)", "tiền điện tử", "/ˈkrɪptəʊkʌrənsi/", "Trade volatile cryptocurrency.", "Giao dịch tiền điện tử biến động mạnh."],
    ["virtual reality", "(n)", "thực tế ảo", "/ˌvɜːtʃuəl riˈæləti/", "Play games in virtual reality.", "Chơi game trong môi trường thực tế ảo."],
    ["augmented reality", "(n)", "thực tế tăng cường", "/ɔːɡˌmentɪd riˈæləti/", "Apps using augmented reality.", "Các ứng dụng sử dụng thực tế tăng cường."],
    ["software developer", "(n)", "nhà phát triển phần mềm", "/ˈsɒftweə dɪˈveləpə/", "Work as a junior software developer.", "Làm việc như một nhà phát triển phần mềm."],
    ["database administrator", "(n)", "quản trị viên cơ sở dữ liệu", "/ˈdeɪtəbeɪs ədˈmɪnɪstreɪtə/", "The database administrator recovered files.", "Quản trị viên cơ sở dữ liệu đã khôi phục các tệp."],
    ["network router", "(n)", "bộ định tuyến mạng", "/ˈnetwɜːk ˈruːtə/", "Reset the flashing network router.", "Khởi động lại bộ định tuyến mạng đang nhấp nháy."],
    ["cloud storage", "(n)", "lưu trữ đám mây", "/klaʊd ˈstɔːrɪdʒ/", "Upload photos to cloud storage.", "Tải ảnh lên bộ lưu trữ đám mây."],
    ["broadband internet", "(n)", "internet băng thông rộng", "/ˈbrɔːdbænd ˈɪntənet/", "Subscribe to broadband internet.", "Đăng ký internet băng thông rộng."],
    ["bandwidth limit", "(n)", "giới hạn băng thông", "/ˈbændwɪtθ ˈlɪmɪt/", "Reach the monthly bandwidth limit.", "Đạt giới hạn băng thông hàng tháng."],
    ["computer programming", "(n)", "lập trình máy tính", "/kəmˈpjuːtə ˈprəʊɡræmɪŋ/", "Teach basic computer programming.", "Dạy lập trình máy tính cơ bản."],
    ["operating system", "(n)", "hệ điều hành", "/ˈɒpəreɪtɪŋ ˈsɪstəm/", "Update your mobile operating system.", "Cập nhật hệ điều hành di động của bạn."],
    ["web browser", "(n)", "trình duyệt web", "/web ˈbraʊzə/", "Open a private web browser window.", "Mở cửa sổ trình duyệt web riêng tư."],
    ["search engine", "(n)", "công cụ tìm kiếm", "/sɜːtʃ ˈendʒɪn/", "Find pages using a search engine.", "Tìm các trang web bằng công cụ tìm kiếm."],
    ["user interface", "(n)", "giao diện người dùng", "/ˈjuːzər ˈɪntəfeɪs/", "A clean app user interface.", "Một giao diện người dùng ứng dụng sạch sẽ."],
    ["cyberattack", "(n)", "cuộc tấn công mạng", "/ˈsaɪbəətæk/", "Protect systems from cyberattacks.", "Bảo vệ hệ thống khỏi các cuộc tấn công mạng."],
    ["encryption key", "(n)", "khóa mã hóa", "/ɪnˈkrɪpʃn kiː/", "Decrypt files with the encryption key.", "Giải mã các tệp bằng khóa mã hóa."],
    ["malware software", "(n)", "phần mềm độc hại", "/ˈmælweə ˈsɒftweə/", "Scan the laptop for malware software.", "Quét máy tính xách tay để tìm phần mềm độc hại."],
    ["firewall protection", "(n)", "bảo vệ bằng tường lửa", "/ˈfaɪəwɔːl prəˈtekʃn/", "Enable firewall protection on PCs.", "Bật tính năng bảo vệ bằng tường lửa trên máy tính."],
    ["information technology", "(n)", "công nghệ thông tin", "/ˌɪnfəˈmeɪʃn tekˈnɒlədʒi/", "Study information technology.", "Học công nghệ thông tin."],
    ["software program", "(n)", "chương trình phần mềm", "/ˈsɒftweə ˈprəʊɡræm/", "Install the software program.", "Cài đặt chương trình phần mềm."],
    ["hardware device", "(n)", "thiết bị phần cứng", "/ˈhɑːdweə dɪˈvaɪs/", "Connect a hardware device.", "Kết nối một thiết bị phần cứng."],
    ["internet connection", "(n)", "kết nối internet", "/ˈɪntənet kəˈnekʃn/", "A stable internet connection.", "Kết nối internet ổn định."],
    ["personal computer", "(n)", "máy tính cá nhân", "/ˈpɜːsənl kəmˈpjuːtə/", "Buy a personal computer.", "Mua một chiếc máy tính cá nhân."],
    ["mobile phone", "(n)", "điện thoại di động", "/ˈməʊbaɪl fəʊn/", "Call me on my mobile phone.", "Gọi cho tôi qua điện thoại di động."],
    ["online learning", "(n)", "học trực tuyến", "/ˌɒnˈlaɪn ˈlɜːnɪŋ/", "The benefits of online learning.", "Lợi ích của việc học trực tuyến."]
  ],
  'business-office': [
    ["shareholder", "(n)", "cổ đông", "/ˈʃeəhəʊldə/", "Meet the company shareholders.", "Gặp gỡ các cổ đông của công ty."],
    ["headquarters", "(n)", "trụ sở chính", "/ˌhedˈkwɔːtəz/", "Visit corporate headquarters in Tokyo.", "Ghé thăm trụ sở chính của công ty ở Tokyo."],
    ["administrative", "(adj)", "thuộc hành chính", "/ədˈmɪnɪstrətɪv/", "Handle office administrative tasks.", "Xử lý các công việc hành chính văn phòng."],
    ["workplace culture", "(n)", "văn hóa công sở", "/ˈwɜːkpleɪs ˈkʌltʃə/", "Promote a healthy workplace culture.", "Thúc đẩy một văn hóa công sở lành mạnh."],
    ["conference room", "(n)", "phòng hội nghị", "/ˈkɒnfərəns ruːm/", "Gather in the conference room.", "Tập hợp tại phòng hội nghị."],
    ["stationery cabinet", "(n)", "tủ văn phòng phẩm", "/ˈsteɪʃnri ˈkæbɪnət/", "Find pens in the stationery cabinet.", "Tìm bút trong tủ văn phòng phẩm."]
  ],
  'kids-starter': [
    ["grandpa", "(n)", "ông nội/ông ngoại", "/ˈɡrænpɑː/", "I love my kind grandpa.", "Tôi yêu người ông tốt bụng của tôi."],
    ["grandma", "(n)", "bà nội/bà ngoại", "/ˈɡrænmɑː/", "Grandma bakes sweet apple pies.", "Bà nướng bánh táo ngọt ngào."],
    ["orange juice", "(n)", "nước cam", "/ˈɒrɪndʒ dʒuːs/", "Drink fresh orange juice.", "Uống nước cam tươi."],
    ["school bag", "(n)", "cặp sách", "/skuːl bæɡ/", "Pack books in my school bag.", "Xếp sách vào cặp học sinh của tôi."],
    ["teddy bear", "(n)", "gấu bông", "/ˈtedi beə/", "Sleep with my soft teddy bear.", "Ngủ cùng chú gấu bông mềm mại của tôi."],
    ["sweet candy", "(n)", "kẹo ngọt", "/swiːt ˈkændi/", "Kids love eating sweet candy.", "Trẻ em thích ăn kẹo ngọt."]
  ],
  'environment-nature': [
    ["reforestation", "(n)", "tái trồng rừng", "/ˌriːˌfɒrɪˈsteɪʃn/", "Support national reforestation.", "Ủng hộ dự án tái trồng rừng quốc gia."],
    ["afforestation", "(n)", "trồng rừng mới", "/əˌfɒrɪˈsteɪʃn/", "Initiate tree afforestation.", "Khởi xướng việc trồng rừng mới."],
    ["conservationist", "(n)", "nhà hoạt động bảo tồn", "/ˌkɒnsəˈveɪʃənɪst/", "A speech by a conservationist.", "Bài phát biểu của nhà bảo tồn."],
    ["natural reserve", "(n)", "khu bảo tồn thiên nhiên", "/ˈnætʃrəl rɪˈzɜːv/", "Animals live in the natural reserve.", "Động vật sống trong khu bảo tồn thiên nhiên."],
    ["biosphere", "(n)", "sinh quyển", "/ˈbaɪəsfiə/", "Study human impact on the biosphere.", "Nghiên cứu tác động của con người lên sinh quyển."],
    ["composting", "(n)", "việc ủ phân hữu cơ", "/ˈkɒmpɒstɪŋ/", "Composting reduces organic waste.", "Ủ phân hữu cơ giúp giảm lượng rác thải hữu cơ."],
    ["ecotourism", "(n)", "du lịch sinh thái", "/ˈiːkəʊˌtʊərɪzəm/", "Promote sustainable ecotourism.", "Thúc đẩy du lịch sinh thái bền vững."],
    ["greenhouse gases", "(n)", "các loại khí nhà kính", "/ˈɡriːnhaʊs ˈɡæsɪz/", "Reduce the emission of greenhouse gases.", "Giảm lượng phát thải khí nhà kính."],
    ["carbon tax", "(n)", "thuế carbon", "/ˈkɑːbən tæks/", "Impose a carbon tax on factories.", "Đánh thuế carbon lên các nhà máy."],
    ["ecosystem balance", "(n)", "cân bằng hệ sinh thái", "/ˌiːkəʊˈsɪstəm ˈbæləns/", "Maintain the ecosystem balance.", "Duy trì sự cân bằng hệ sinh thái."],
    ["wildlife refuge", "(n)", "khu bảo tồn động vật hoang dã", "/ˈwaɪldlaɪf ˈrefjuːdʒ/", "Animals in a wildlife refuge.", "Động vật ở khu bảo tồn hoang dã."],
    ["pollution control", "(n)", "kiểm soát ô nhiễm", "/pəˈluːʃn kənˈtrəʊl/", "Strict pollution control measures.", "Biện pháp kiểm soát ô nhiễm nghiêm ngặt."]
  ],
  'education-academic': [
    ["undergraduate", "(n)", "sinh viên chưa tốt nghiệp", "/ˌʌndəˈɡrædʒuət/", "Undergraduate students attend lectures.", "Sinh viên đại học tham dự các bài giảng."],
    ["postgraduate", "(n)", "học viên cao học", "/ˌpəʊstˈɡrædʒuət/", "Postgraduate research projects.", "Dự án nghiên cứu của học viên cao học."],
    ["curriculum", "(n)", "chương trình học", "/kəˈrɪkjʊləm/", "Designing a new school curriculum.", "Thiết kế một chương trình học mới."],
    ["syllabus", "(n)", "đề cương môn học", "/ˈsɪləbəs/", "Check the course syllabus for details.", "Kiểm tra đề cương môn học để biết chi tiết."],
    ["scholarship", "(n)", "học bổng", "/ˈskɒləʃɪp/", "Win an academic scholarship.", "Giành được một học bổng học thuật."],
    ["dissertation", "(n)", "luận văn tốt nghiệp", "/ˌdɪsəˈteɪʃn/", "Write a dissertation on economics.", "Viết luận văn tốt nghiệp về ngành kinh tế."],
    ["academic journal", "(n)", "tạp chí học thuật", "/ˌækəˈdemɪk ˈdʒɜːnl/", "Publish studies in an academic journal.", "Công bố các nghiên cứu trên tạp chí học thuật."],
    ["tuition fees", "(n)", "học phí", "/tjuˈɪʃn fiːz/", "University tuition fees are rising.", "Học phí đại học đang ngày càng tăng."],
    ["matriculate", "(v)", "nhập học đại học", "/məˈtrɪkjʊleɪt/", "Matriculate at Oxford University.", "Nhập học tại Đại học Oxford."],
    ["intellectual property", "(n)", "sở hữu trí tuệ", "/ˌɪntəˈlektʃuəl ˈprɒpəti/", "Protect scientific intellectual property.", "Bảo vệ quyền sở hữu trí tuệ khoa học."],
    ["pedagogy", "(n)", "sư phạm học", "/ˈpedəɡɒdʒi/", "Study advanced methods of pedagogy.", "Nghiên cứu các phương pháp sư phạm tiên tiến."],
    ["auditorium", "(n)", "giảng đường/hội trường lớn", "/ˌɔːdɪˈtɔːriəm/", "Students filled the auditorium.", "Học sinh ngồi chật kín giảng đường lớn."],
    ["graduation gown", "(n)", "lễ phục tốt nghiệp", "/ˌɡrædʒuˈeɪʃn ɡaʊn/", "Wear a black graduation gown.", "Mặc lễ phục tốt nghiệp màu đen."],
    ["alumni network", "(n)", "mạng lưới cựu học sinh", "/əˈlʌmnaɪ ˈnetwɜːk/", "Join the active alumni network.", "Tham gia mạng lưới cựu sinh viên năng động."],
    ["major subject", "(n)", "chuyên ngành chính", "/ˈmeɪdʒə ˈsʌbdʒɪkt/", "My major subject is biology.", "Chuyên ngành chính của tôi là sinh học."],
    ["academic performance", "(n)", "kết quả học tập", "/ˌækəˈdemɪk pəˈfɔːməns/", "Improve your academic performance.", "Cải thiện kết quả học tập của bạn."],
    ["teaching assistant", "(n)", "trợ giảng", "/ˈtiːtʃɪŋ əˈsɪstənt/", "Work as a teaching assistant.", "Làm việc như một trợ giảng."],
    ["lecture theatre", "(n)", "phòng bài giảng", "/ˈlektʃə ˈθɪətə/", "Meet inside the lecture theatre.", "Gặp nhau bên trong phòng bài giảng."],
    ["student exchange", "(n)", "trao đổi sinh viên", "/ˈstjuːdnt ɪksˈtʃeɪndʒ/", "Join the student exchange program.", "Tham gia chương trình trao đổi sinh viên."],
    ["vocational training", "(n)", "đào tạo nghề", "/vəʊˈkeɪʃənl ˈtreɪnɪŋ/", "Receive useful vocational training.", "Nhận đào tạo nghề hữu ích."],
    ["academic credit", "(n)", "tín chỉ học tập", "/ˌækəˈdemɪk ˈkredɪt/", "Earn enough academic credits.", "Tích lũy đủ tín chỉ học tập."],
    ["campus security", "(n)", "an ninh khuôn viên trường", "/ˈkæmpəs sɪˈkjʊərəti/", "Report to campus security.", "Báo cáo cho lực lượng an ninh trường."]
  ],
  'home-daily-life': [
    ["apartment", "(n)", "căn hộ", "/əˈpɑːtmənt/", "Rent a two-bedroom apartment.", "Thuê một căn hộ có hai phòng ngủ."],
    ["household chores", "(n)", "công việc nhà", "/ˈhaʊshəʊld tʃɔːz/", "Share household chores together.", "Cùng nhau chia sẻ công việc nhà hàng ngày."],
    ["neighborhood", "(n)", "khu phố lân cận", "/ˈneɪbəhʊd/", "A quiet and friendly neighborhood.", "Một khu phố yên tĩnh và thân thiện."],
    ["living room", "(n)", "phòng khách", "/ˈlɪvɪŋ ruːm/", "Relax on the sofa in the living room.", "Thư giãn trên ghế sofa trong phòng khách."],
    ["backyard", "(n)", "sân sau nhà", "/ˌbækˈjɑːd/", "Kids play football in the backyard.", "Trẻ em chơi đá bóng ở sân sau."],
    ["microwave oven", "(n)", "lò vi sóng", "/ˈmaɪkrəweɪv ˈʌvn/", "Heat up food in the microwave oven.", "Hâm nóng thức ăn trong lò vi sóng."],
    ["dishwasher", "(n)", "máy rửa bát", "/ˈdɪʃwɒʃə/", "Load dirty plates into the dishwasher.", "Xếp bát đĩa bẩn vào máy rửa bát."],
    ["refrigerator", "(n)", "tủ lạnh", "/rɪˈfrɪdʒəreɪtə/", "Store milk in the refrigerator.", "Cất sữa vào trong tủ lạnh."],
    ["washing machine", "(n)", "máy giặt", "/ˈwɒʃɪŋ məˈʃiːn/", "Put dirty clothes in the washing machine.", "Cho quần áo bẩn vào máy giặt."],
    ["wardrobe", "(n)", "tủ quần áo", "/ˈwɔːdrəʊb/", "Hang shirts in the wardrobe.", "Treo áo sơ mi trong tủ quần áo."],
    ["vacuum cleaner", "(n)", "máy hút bụi", "/ˈvækjuːm ˈkliːnə/", "Clean the carpet with a vacuum cleaner.", "Làm sạch thảm bằng máy hút bụi."],
    ["balcony", "(n)", "ban công", "/ˈbælkəni/", "Grow small flowers on the balcony.", "Trồng những bông hoa nhỏ ngoài ban công."],
    ["bookshelf", "(n)", "kệ sách", "/ˈbʊkʃelf/", "Arrange novels on the wooden bookshelf.", "Sắp xếp tiểu thuyết trên kệ sách gỗ."],
    ["study room", "(n)", "phòng học", "/ˈstʌdi ruːm/", "Read books in the study room.", "Đọc sách trong phòng học."],
    ["dining table", "(n)", "bàn ăn", "/ˈdaɪnɪŋ ˈteɪbl/", "Sit around the dining table.", "Ngồi quanh bàn ăn."],
    ["closet drawer", "(n)", "ngăn kéo tủ quần áo", "/ˈklɒzɪt ˈdrɔːə/", "Put clothes in the closet drawer.", "Cất quần áo vào ngăn kéo tủ."],
    ["kitchen shelf", "(n)", "kệ bếp", "/ˈkɪtʃɪn ʃelf/", "Spices on the kitchen shelf.", "Gia vị trên kệ bếp."],
    ["door lock", "(n)", "khóa cửa", "/dɔː lɒk/", "Check the front door lock.", "Kiểm tra khóa cửa trước."],
    ["window pane", "(n)", "ô kính cửa sổ", "/ˈwɪndəʊ peɪn/", "Clean the dusty window pane.", "Lau sạch ô kính cửa sổ đầy bụi."]
  ],
  'arts-entertainment': [
    ["sculpture", "(n)", "tác phẩm điêu khắc", "/ˈskʌlptʃə/", "Exhibit a modern bronze sculpture.", "Trưng bày một tác phẩm điêu khắc bằng đồng hiện đại."],
    ["masterpiece", "(n)", "kiệt tác", "/ˈmɑːstəpiːs/", "The Mona Lisa is a masterpiece.", "Bức tranh Mona Lisa là một kiệt tác."],
    ["exhibition", "(n)", "triển lãm", "/ˌeksɪˈbɪʃn/", "Visit a contemporary art exhibition.", "Ghé thăm một triển lãm nghệ thuật đương đại."],
    ["orchestra", "(n)", "dàn nhạc giao hưởng", "/ˈɔːkɪstrə/", "The orchestra played Beethoven's symphony.", "Dàn nhạc chơi bản giao hưởng của Beethoven."],
    ["symphony", "(n)", "bản giao hưởng", "/ˈsɪmfəni/", "Listen to a classical symphony.", "Nghe một bản giao hưởng cổ điển."],
    ["performance", "(n)", "buổi biểu diễn", "/pəˈfɔːməns/", "The theatrical performance was superb.", "Buổi biểu diễn sân khấu thật tuyệt vời."],
    ["screenplay", "(n)", "kịch bản phim", "/ˈskriːnpleɪ/", "Write a screenplay for a movie.", "Viết kịch bản cho một bộ phim điện ảnh."],
    ["cinematography", "(n)", "nghệ thuật điện ảnh / quay phim", "/ˌsɪnəməˈtɒɡrəfi/", "The cinematography of the movie is stunning.", "Nghệ thuật quay phim của bộ phim thật ấn tượng."],
    ["choreography", "(n)", "nghệ thuật biên đạo múa", "/ˌkɒriˈɒɡrəfi/", "The dance show has great choreography.", "Chương trình khiêu vũ có biên đạo xuất sắc."],
    ["soundtrack", "(n)", "nhạc nền phim", "/ˈsaʊndtræk/", "Buy the official movie soundtrack.", "Mua đĩa nhạc nền chính thức của bộ phim."],
    ["entertainment industry", "(n)", "ngành công nghiệp giải trí", "/ˌentəˈteɪnmənt ˈɪndəstri/", "Actors work in the entertainment industry.", "Diễn viên làm việc trong ngành công nghiệp giải trí."],
    ["museum guide", "(n)", "hướng dẫn viên bảo tàng", "/mjuˈziːəm ɡaɪd/", "Follow the museum guide.", "Đi theo hướng dẫn viên bảo tàng."],
    ["painting easel", "(n)", "giá vẽ tranh", "/ˈpeɪntɪŋ ˈiːzl/", "Put the canvas on a painting easel.", "Đặt tấm toan lên giá vẽ tranh."],
    ["watercolor paint", "(n)", "màu nước vẽ tranh", "/ˈwɔːtəkʌlə peɪnt/", "Paint landscapes with watercolor paint.", "Vẽ phong cảnh bằng màu nước."],
    ["documentary movie", "(n)", "phim tài liệu", "/ˌdɒkjuˈmentri ˈmuːvi/", "Watch a documentary movie about nature.", "Xem một bộ phim tài liệu về thiên nhiên."],
    ["theatrical play", "(n)", "vở kịch sân khấu", "/θiˈætrɪkl pleɪ/", "Act in a famous theatrical play.", "Diễn xuất trong một vở kịch sân khấu nổi tiếng."],
    ["concert tickets", "(n)", "vé xem ca nhạc", "/ˈkɒnsət ˈtɪkɪts/", "Buy expensive concert tickets online.", "Mua vé xem ca nhạc đắt tiền trực tuyến."],
    ["creative designer", "(n)", "nhà thiết kế sáng tạo", "/kriˈeɪtɪv dɪˈzaɪnə/", "Work as a creative designer.", "Làm việc như một nhà thiết kế sáng tạo."],
    ["art gallery", "(n)", "phòng triển lãm nghệ thuật", "/ɑːt ˈɡæləri/", "Visit a famous art gallery.", "Tham quan phòng triển lãm nghệ thuật nổi tiếng."],
    ["music festival", "(n)", "lễ hội âm nhạc", "/ˈmjuːzɪk ˈfestɪvl/", "Attend a summer music festival.", "Tham gia lễ hội âm nhạc mùa hè."],
    ["opera house", "(n)", "nhà hát opera", "/ˈɒprə haʊs/", "Perform at the royal opera house.", "Biểu diễn tại nhà hát opera hoàng gia."],
    ["theater stage", "(n)", "sân khấu nhà hát", "/ˈθɪətə steɪdʒ/", "Stand on the theater stage.", "Đứng trên sân khấu nhà hát."],
    ["film director", "(n)", "đạo diễn phim", "/fɪlm daɪˈrektə/", "A famous award-winning film director.", "Một đạo diễn phim nổi tiếng đoạt giải thưởng."],
    ["vocal performance", "(n)", "biểu diễn thanh nhạc", "/ˈvəʊkl pəˈfɔːməns/", "Praise her vocal performance.", "Khen ngợi biểu diễn thanh nhạc của cô ấy."],
    ["classical dance", "(n)", "múa cổ điển", "/ˈklæsɪkl dɑːns/", "Learn basic classical dance.", "Học múa cổ điển cơ bản."]
  ],
  'food-nutrition': [
    ["carbohydrate", "(n)", "chất đường bột (carb)", "/ˌkɑːbəʊˈhaɪdreɪt/", "Carbohydrates provide quick energy.", "Carbohydrate cung cấp năng lượng nhanh chóng."],
    ["balanced diet", "(n)", "chế độ ăn uống cân bằng", "/ˌbælənst ˈdaɪət/", "Maintain a healthy balanced diet.", "Duy trì chế độ ăn uống cân bằng lành mạnh."],
    ["preservative", "(n)", "chất bảo quản", "/prɪˈzɜːvətɪv/", "Avoid foods containing preservatives.", "Tránh các thực phẩm chứa chất bảo quản."],
    ["nutrient", "(n)", "chất dinh dưỡng", "/ˈnjuːtriənt/", "Vegetables are packed with nutrients.", "Rau xanh chứa đầy chất dinh dưỡng."],
    ["cholesterol", "(n)", "chất béo cholesterol", "/kəˈlestərɒl/", "Lower your blood cholesterol levels.", "Giảm lượng cholesterol trong máu của bạn."],
    ["calorie intake", "(n)", "lượng calo hấp thụ", "/ˈkæləri ˈɪnteɪk/", "Track your daily calorie intake.", "Theo dõi lượng calo hấp thụ hàng ngày của bạn."],
    ["metabolism", "(n)", "sự trao đổi chất", "/məˈtæbəlɪzəm/", "Exercise speeds up your metabolism.", "Tập thể dục giúp đẩy nhanh quá trình trao đổi chất."],
    ["digestive system", "(n)", "hệ tiêu hóa", "/daɪˈdʒestɪv ˈsɪstəm/", "Fiber supports a healthy digestive system.", "Chất xơ hỗ trợ một hệ tiêu hóa khỏe mạnh."],
    ["micronutrient", "(n)", "chất vi lượng", "/ˌmaɪkrəʊˈnjuːtriənt/", "Vitamins are vital micronutrients.", "Vitamin là những chất vi lượng quan trọng."],
    ["hydration", "(n)", "sự bổ sung nước cho cơ thể", "/haɪˈdreɪʃn/", "Drinking water ensures good hydration.", "Uống nước đảm bảo cơ thể đủ nước."],
    ["mineral deficiency", "(n)", "sự thiếu hụt khoáng chất", "/ˈmɪnərəl dɪˈfɪʃnsi/", "Anemia is caused by iron deficiency.", "Bệnh thiếu máu do thiếu hụt chất sắt."],
    ["organic vegetable", "(n)", "rau hữu cơ", "/ɔːˈɡænɪk ˈvedʒtəbl/", "Buy fresh organic vegetables.", "Mua rau hữu cơ tươi sạch."],
    ["dietary supplement", "(n)", "thực phẩm bổ sung", "/ˈdaɪətəri ˈsʌplɪmənt/", "Take daily dietary supplements.", "Uống thực phẩm bổ sung hàng ngày."],
    ["processed food", "(n)", "thức ăn chế biến sẵn", "/ˈprəʊsest fuːd/", "Limit eating fast processed foods.", "Hạn chế ăn đồ ăn nhanh chế biến sẵn."],
    ["amino acid", "(n)", "axit amin", "/əˌmiːnəʊ ˈæsɪd/", "Proteins consist of amino acids.", "Protein bao gồm các axit amin."],
    ["energy intake", "(n)", "lượng năng lượng nạp vào", "/ˈenədʒi ˈɪnteɪk/", "Track daily energy intake.", "Theo dõi lượng năng lượng nạp vào hàng ngày."],
    ["vitamin supplement", "(n)", "viên bổ sung vitamin", "/ˈvɪtəmɪn ˈsʌplɪmənt/", "Take vitamin supplements.", "Uống viên bổ sung vitamin."],
    ["dietary fiber", "(n)", "chất xơ ăn kiêng", "/ˈdaɪətəri ˈfaɪbə/", "Eat foods rich in dietary fiber.", "Ăn thực phẩm giàu chất xơ."],
    ["saturated fat", "(n)", "chất béo bão hòa", "/ˈsætʃəreɪtɪd fæt/", "Reduce eating saturated fat.", "Giảm ăn chất béo bão hòa."],
    ["mineral water", "(n)", "nước khoáng", "/ˈmɪnərəl ˈwɔːtə/", "Drink cold mineral water.", "Uống nước khoáng lạnh."]
  ],
  'society-law-rights': [
    ["constitution", "(n)", "hiến pháp", "/ˌkɒnstɪˈtjuːʃn/", "The constitution guarantees freedom.", "Hiến pháp đảm bảo quyền tự do."],
    ["legislature", "(n)", "cơ quan lập pháp", "/ˈledʒɪslætʃə/", "The bill was passed by the legislature.", "Dự luật đã được thông qua bởi cơ quan lập pháp."],
    ["judiciary", "(n)", "cơ quan tư pháp / tòa án", "/dʒuˈdɪʃiəri/", "An independent judicial system.", "Một hệ thống tư pháp độc lập."],
    ["human rights", "(n)", "nhân quyền", "/ˌhjuːmən ˈraɪts/", "Fight for universal human rights.", "Đấu tranh vì nhân quyền toàn cầu."],
    ["democracy", "(n)", "nền dân chủ", "/dɪˈmɒkrəsi/", "Uphold the principles of democracy.", "Duy trì các nguyên tắc của nền dân chủ."],
    ["citizenship", "(n)", "quyền công dân", "/ˈsɪtɪzənʃɪp/", "Apply for permanent citizenship.", "Xin nhập quyền công dân vĩnh viễn."],
    ["discrimination", "(n)", "sự phân biệt đối xử", "/dɪˌskrɪmɪˈneɪʃn/", "Eliminate racial discrimination.", "Xóa bỏ sự phân biệt đối xử sắc tộc."],
    ["freedom of speech", "(n)", "tự do ngôn luận", "/ˌfriːdəm əv ˈspiːtʃ/", "Protect the freedom of speech.", "Bảo vệ quyền tự do ngôn luận."],
    ["justice system", "(n)", "hệ thống tư pháp", "/ˈdʒʌstɪs ˈsɪstəm/", "Trust in the national justice system.", "Tin tưởng vào hệ thống tư pháp quốc gia."],
    ["equality", "(n)", "sự bình đẳng", "/iˈkwɒləti/", "Promote gender equality in offices.", "Thúc đẩy bình đẳng giới trong văn phòng."],
    ["legal system", "(n)", "hệ thống pháp luật", "/ˈliːɡl ˈsɪstəm/", "Study the local legal system.", "Nghiên cứu hệ thống pháp luật địa phương."],
    ["regulation", "(n)", "quy định/quy chế", "/ˌreɡjuˈleɪʃn/", "Follow environmental regulations.", "Tuân thủ các quy định về môi trường."],
    ["civil rights", "(n)", "quyền công dân", "/ˌsɪvl ˈraɪts/", "Activists campaign for civil rights.", "Các nhà hoạt động vận động cho quyền công dân."],
    ["attorney", "(n)", "luật sư đại diện", "/əˈtɜːni/", "Consult a defense attorney.", "Tham vấn luật sư bào chữa."],
    ["prosecutor", "(n)", "công tố viên", "/ˈprɒsɪkjuːtə/", "The prosecutor presented new evidence.", "Công tố viên trình bày bằng chứng mới."],
    ["courtroom trial", "(n)", "phiên tòa xét xử", "/ˈkɔːtruːm ˈtraɪəl/", "The courtroom trial lasted three weeks.", "Phiên tòa xét xử kéo dài ba tuần."],
    ["social justice", "(n)", "công bằng xã hội", "/ˈsəʊʃl ˈdʒʌsɪtɪs/", "Advocate for social justice.", "Biện hộ cho sự công bằng xã hội."],
    ["law enforcement", "(n)", "lực lượng thực thi pháp luật", "/lɔː ɪnˈfɔːsmənt/", "Cooperate with law enforcement.", "Hợp tác với lực lượng thực thi pháp luật."],
    ["legal counsel", "(n)", "cố vấn pháp lý", "/ˈliːɡl ˈkaʊnsl/", "Seek professional legal counsel.", "Tìm kiếm cố vấn pháp lý chuyên nghiệp."],
    ["lawsuit case", "(n)", "vụ kiện pháp lý", "/ˈlɔːsjuːt keɪs/", "Win the complex lawsuit case.", "Thắng vụ kiện pháp lý phức tạp."],
    ["court judge", "(n)", "thẩm phán tòa án", "/kɔːt dʒʌdʒ/", "The court judge announced the verdict.", "Thẩm phán tòa án công bố phán quyết."],
    ["civil liberties", "(n)", "các quyền tự do dân sự", "/ˌsɪvl ˈlɪbətiz/", "Protect citizen civil liberties.", "Bảo vệ các quyền tự do dân sự của công dân."],
    ["law system", "(n)", "hệ thống luật pháp", "/lɔː ˈsɪstəm/", "Study the international law system.", "Nghiên cứu hệ thống luật pháp quốc tế."],
    ["code of conduct", "(n)", "quy tắc ứng xử", "/kəʊd əv ˈkɒndʌkt/", "Follow the office code of conduct.", "Tuân thủ quy tắc ứng xử của văn phòng."],
    ["citizen rights", "(n)", "quyền công dân", "/ˈsɪtɪzən raɪts/", "Defend fundamental citizen rights.", "Bảo vệ các quyền công dân cơ bản."],
    ["social equality", "(n)", "bình đẳng xã hội", "/ˈsəʊʃl iˈkwɒləti/", "Promote social equality globally.", "Thúc đẩy bình đẳng xã hội trên toàn cầu."]
  ],
  'globalization-culture': [
    ["cultural diversity", "(n)", "sự đa dạng văn hóa", "/ˈkʌltʃərəl daɪˈvɜːsəti/", "Celebrate international cultural diversity.", "Tôn vinh sự đa dạng văn hóa quốc tế."],
    ["multiculturalism", "(n)", "chủ nghĩa đa văn hóa", "/ˌmʌltiˈkʌltʃərəlɪzəm/", "Metropolitan areas embrace multiculturalism.", "Các đô thị lớn đón nhận chủ nghĩa đa văn hóa."],
    ["globalization", "(n)", "sự toàn cầu hóa", "/ˌɡləʊbəlaɪˈzeɪʃn/", "Economic globalization changes markets.", "Toàn cầu hóa kinh tế thay đổi các thị trường."],
    ["heritage site", "(n)", "di sản thế giới", "/ˈherɪtɪdʒ saɪt/", "Preserve the UNESCO heritage site.", "Bảo tồn di sản thế giới UNESCO."],
    ["assimilation", "(n)", "sự đồng hóa văn hóa", "/əˌsɪmɪˈleɪʃn/", "Immigrants face cultural assimilation.", "Người nhập cư đối mặt với sự đồng hóa văn hóa."],
    ["acculturation", "(n)", "sự tiếp biến văn hóa", "/əˌkʌltʃəˈreɪʃn/", "Study the process of acculturation.", "Nghiên cứu quá trình tiếp biến văn hóa."],
    ["national identity", "(n)", "bản sắc dân tộc", "/ˈnæʃnəl aɪˈdentəti/", "Preserve our unique national identity.", "Bảo tồn bản sắc dân tộc độc đáo của chúng tôi."],
    ["indigenous", "(adj)", "bản địa", "/ɪnˈdɪdʒənəs/", "Learn about indigenous languages.", "Tìm hiểu về các ngôn ngữ bản địa."],
    ["cosmopolitan", "(adj)", "thuộc toàn thế giới/đa dạng văn hóa", "/ˌkɒzməˈpɒlɪtən/", "A cosmopolitan lifestyle in London.", "Một lối sống đa văn hóa ở London."],
    ["integration", "(n)", "sự hội nhập", "/ˌɪntɪˈɡreɪʃn/", "Facilitate global economic integration.", "Tạo điều kiện cho hội nhập kinh tế toàn cầu."],
    ["global community", "(n)", "cộng đồng toàn cầu", "/ˈɡləʊbl kəˈmjuːnəti/", "We belong to a global community.", "Chúng ta thuộc về một cộng đồng toàn cầu."],
    ["tradition", "(n)", "truyền thống", "/trəˈdɪʃn/", "Follow ancestral family traditions.", "Theo các truyền thống gia đình tổ tiên."],
    ["customary", "(adj)", "theo phong tục", "/ˈkʌstəməri/", "Customary laws in small villages.", "Các luật tục ở các ngôi làng nhỏ."],
    ["foreign culture", "(n)", "văn hóa nước ngoài", "/ˈfɒrən ˈkʌltʃə/", "Adapt to a foreign culture.", "Thích nghi với một nền văn hóa nước ngoài."],
    ["cultural exchange", "(n)", "giao lưu văn hóa", "/ˈkʌltʃərəl ɪksˈtʃeɪndʒ/", "Join a student cultural exchange.", "Tham gia giao lưu văn hóa học sinh."],
    ["global citizenship", "(n)", "công dân toàn cầu", "/ˈɡləʊbl ˈsɪtɪzənʃɪp/", "Schools promote global citizenship.", "Trường học thúc đẩy tinh thần công dân toàn cầu."],
    ["ethnic minority", "(n)", "dân tộc thiểu số", "/ˈeθnɪk maɪˈnɒrəti/", "Support regional ethnic minorities.", "Hỗ trợ các dân tộc thiểu số trong vùng."],
    ["cultural barrier", "(n)", "rào cản văn hóa", "/ˈkʌltʃərəl ˈbæriə/", "Overcome cultural barriers in trade.", "Vượt qua rào cản văn hóa trong thương mại."],
    ["global market", "(n)", "thị trường toàn cầu", "/ˈɡləʊbl ˈmɑːkɪt/", "Compete in the global market.", "Cạnh tranh trên thị trường toàn cầu."],
    ["cultural heritage", "(n)", "di sản văn hóa", "/ˈkʌltʃərəl ˈherɪtɪdʒ/", "Protect our cultural heritage.", "Bảo vệ di sản văn hóa của chúng tôi."],
    ["ethnic culture", "(n)", "văn hóa sắc tộc", "/ˈeθnɪk ˈkʌltʃə/", "Study regional ethnic cultures.", "Nghiên cứu văn hóa sắc tộc trong vùng."],
    ["local custom", "(n)", "phong tục địa phương", "/ˈləʊkl ˈkʌstəm/", "Respect every local custom.", "Tôn trọng mọi phong tục địa phương."],
    ["multinational", "(adj)", "đa quốc gia", "/ˌmʌltiˈnæʃnəl/", "Work for a multinational company.", "Làm việc cho một công ty đa quốc gia."],
    ["cross-cultural", "(adj)", "giao thoa văn hóa", "/ˌkrɒs ˈkʌltʃərəl/", "Join cross-cultural projects.", "Tham gia các dự án giao thoa văn hóa."],
    ["foreign trade", "(n)", "thương mại đối ngoại", "/ˈfɒrən treɪd/", "Laws governing foreign trade.", "Luật quản lý thương mại đối ngoại."],
    ["global outreach", "(n)", "tiếp cận toàn cầu", "/ˈɡləʊbl ˈaʊtriːtʃ/", "Expand our global outreach.", "Mở rộng tầm tiếp cận toàn cầu của chúng tôi."]
  ],
  'sports-fitness': [
    ["championship", "(n)", "chức vô địch / giải đấu", "/ˈtʃæmpiənʃɪp/", "Win the national football championship.", "Giành chức vô địch bóng đá quốc gia."],
    ["athletics", "(n)", "môn điền kinh", "/æθˈletɪks/", "Compete in track and field athletics.", "Cạnh tranh trong các môn điền kinh."],
    ["marathon runner", "(n)", "vận động viên chạy marathon", "/ˈmærəθən ˈrʌnə/", "She trained as a marathon runner.", "Cô ấy tập luyện để trở thành vận động viên chạy marathon."],
    ["gymnastics", "(n)", "môn thể dục dụng cụ", "/dʒɪmˈnæstɪks/", "Do gymnastics to improve flexibility.", "Tập thể dục dụng cụ để tăng độ dẻo dai."],
    ["tournament", "(n)", "vòng thi đấu / giải đấu", "/ˈtʊənəmənt/", "Participate in a tennis tournament.", "Tham gia một giải đấu quần vợt."],
    ["referee", "(n)", "trọng tài", "/ˌrefəˈriː/", "The referee blew the whistle.", "Trọng tài đã thổi còi báo hiệu."],
    ["stadium", "(n)", "sân vận động", "/ˈsteɪdiəm/", "Fans gathered at the city stadium.", "Người hâm mộ tụ tập ở sân vận động thành phố."],
    ["warm-up", "(n/v)", "khởi động trước tập", "/ˈwɔːm ʌp/", "Do a ten-minute muscle warm-up.", "Khởi động làm nóng cơ bắp mười phút."],
    ["cardiovascular", "(adj)", "thuộc tim mạch", "/ˌkɑːdiəʊˈvæskjʊlə/", "Running benefits cardiovascular health.", "Chạy bộ có lợi cho sức khỏe tim mạch."],
    ["workout routine", "(n)", "chế độ tập luyện", "/ˈwɜːkaʊt ruːˈtiːn/", "Follow a strict workout routine.", "Theo một chế độ tập luyện nghiêm ngặt."],
    ["hydration", "(n)", "sự cấp nước", "/haɪˈdreɪʃn/", "Maintain hydration during running.", "Duy trì cấp nước khi chạy bộ."],
    ["sportsmanship", "(n)", "tinh thần thể thao đẹp", "/ˈspɔːtsmənʃɪp/", "Show great sportsmanship on field.", "Thể hiện tinh thần thể thao đẹp trên sân."],
    ["personal trainer", "(n)", "huấn luyện viên cá nhân", "/ˈpɜːsənl ˈtreɪnə/", "Hire a certified personal trainer.", "Thuê một huấn luyện viên cá nhân được cấp bằng."],
    ["endurance", "(n)", "sức bền", "/ɪnˈdjʊərəns/", "Cycling builds leg endurance.", "Đi xe đạp giúp xây dựng sức bền cho chân."],
    ["athletic build", "(n)", "thể hình thể thao", "/æθˈletɪk bɪld/", "He has a tall, athletic build.", "Anh ấy có một thể hình cao lớn, đậm chất thể thao."],
    ["physical education", "(n)", "thể dục học đường", "/ˈfɪzɪkl ˌedʒuˈkeɪʃn/", "Attend physical education class.", "Tham gia lớp học thể dục trường học."],
    ["dumbbells", "(n)", "quả tạ tay", "/ˈdʌm.belz/", "Lift dumbbells to build arm strength.", "Nâng tạ tay để tăng sức mạnh cho cánh tay."],
    ["treadmill machine", "(n)", "máy chạy bộ điện", "/ˈtredmɪl məˈʃiːn/", "Run on the indoor treadmill machine.", "Chạy bộ trên máy chạy bộ trong nhà."],
    ["football jersey", "(n)", "áo thi đấu bóng đá", "/ˈfʊtbɔːl ˈdʒɜːzi/", "Wear his favorite football jersey.", "Mặc chiếc áo thi đấu bóng đá yêu thích của mình."],
    ["swimming goggles", "(n)", "kính bơi chống nước", "/ˈswɪmɪŋ ˈɡɒɡlz/", "Wear swimming goggles under water.", "Đeo kính bơi dưới nước."],
    ["fitness coach", "(n)", "huấn luyện viên thể hình", "/ˈfɪtnəs kəʊtʃ/", "Train with a fitness coach.", "Tập luyện với huấn luyện viên thể hình."],
    ["sports event", "(n)", "sự kiện thể thao", "/spɔːts ɪˈvent/", "Attend a national sports event.", "Tham gia một sự kiện thể thao quốc gia."],
    ["athletics track", "(n)", "đường chạy điền kinh", "/æθˈletɪks træk/", "Run on the new athletics track.", "Chạy trên đường chạy điền kinh mới."],
    ["gym membership", "(n)", "thẻ thành viên phòng tập", "/dʒɪm ˈmembəʃɪp/", "Renew my annual gym membership.", "Gia hạn thẻ thành viên phòng tập hàng năm."],
    ["cardio workout", "(n)", "bài tập tim mạch", "/ˈkɑːdiəʊ ˈwɜːkaʊt/", "Do a cardio workout daily.", "Tập bài tập tim mạch hàng ngày."],
    ["weight training", "(n)", "tập tạ", "/weɪt ˈtreɪnɪŋ/", "Do heavy weight training.", "Tập tạ nặng."],
    ["sports team", "(n)", "đội tuyển thể thao", "/spɔːts tiːm/", "Join the local sports team.", "Gia nhập đội tuyển thể thao địa phương."],
    ["fitness tracker", "(n)", "thiết bị theo dõi sức khỏe", "/ˈfɪtnəs ˈtrækə/", "Wear a smart fitness tracker.", "Đeo thiết bị theo dõi sức khỏe thông minh."],
    ["injury recovery", "(n)", "phục hồi chấn thương", "/ˈɪndʒəri rɪˈkʌvəri/", "Focus on sports injury recovery.", "Tập trung phục hồi chấn thương thể thao."],
    ["hydration level", "(n)", "mức nước trong cơ thể", "/haɪˈdreɪʃn ˈlevl/", "Check your daily hydration level.", "Kiểm tra mức nước trong cơ thể hàng ngày."]
  ],
  'career-workplace': [
    ["employment contract", "(n)", "hợp đồng lao động", "/ɪmˈploɪ.mənt ˈkɒn.trækt/", "Sign the official employment contract.", "Ký hợp đồng lao động chính thức."],
    ["salary package", "(n)", "gói lương thưởng", "/ˈsæləri ˈpækɪdʒ/", "Negotiate a better salary package.", "Thương lượng một gói lương thưởng tốt hơn."],
    ["promotion prospects", "(n)", "triển vọng thăng tiến", "/prəˈməʊʃn ˈprɒspekts/", "Good performance increases promotion prospects.", "Hiệu suất làm việc tốt giúp tăng triển vọng thăng tiến."],
    ["work-life balance", "(n)", "cân bằng cuộc sống công việc", "/wɜːk laɪf ˈbæləns/", "Strive for a healthy work-life balance.", "Phấn đấu cho một sự cân bằng cuộc sống công việc lành mạnh."],
    ["probation period", "(n)", "thời gian thử việc", "/prəˈbeɪʃn ˈpɪəriəd/", "Complete a three-month probation period.", "Hoàn thành thời gian thử việc ba tháng."],
    ["resignation letter", "(n)", "đơn xin thôi việc", "/ˌrezɪɡˈneɪʃn ˈletə/", "Submit a formal resignation letter.", "Nộp đơn xin thôi việc chính thức."],
    ["unemployment rate", "(n)", "tỷ lệ thất nghiệp", "/ˌʌnɪmˈploɪmənt reɪt/", "The regional unemployment rate dropped.", "Tỷ lệ thất nghiệp trong vùng đã giảm."],
    ["redundancy payout", "(n)", "trợ cấp thôi việc do tinh giảm biên chế", "/rɪˈdʌndənsi ˈpeɪaʊt/", "Receive a fair redundancy payout.", "Nhận trợ cấp thôi việc công bằng."],
    ["vocational school", "(n)", "trường nghề", "/vəʊˈkeɪʃənl skuːl/", "Learn carpentry at a vocational school.", "Học nghề mộc tại trường nghề."],
    ["headhunter", "(n)", "chuyên viên tuyển dụng/săn đầu người", "/ˈhedˌhʌn.tə/", "Contacted by a corporate headhunter.", "Được liên hệ bởi một chuyên viên săn đầu người."],
    ["job interview", "(n)", "phỏng vấn xin việc", "/dʒɒb ˈɪntəvjuː/", "Prepare questions for the job interview.", "Chuẩn bị các câu hỏi cho cuộc phỏng vấn xin việc."],
    ["labor union", "(n)", "công đoàn lao động", "/ˈleɪbə ˈjuːniən/", "Join the national labor union.", "Tham gia công đoàn lao động quốc gia."],
    ["annual appraisal", "(n)", "đánh giá hiệu suất hàng năm", "/ˈænjuəl əˈpreɪzl/", "Discuss goals in the annual appraisal.", "Thảo luận các mục tiêu trong kỳ đánh giá hàng năm."],
    ["fringe benefits", "(n)", "phúc lợi phụ thêm", "/frɪndʒ ˈbenɪfɪts/", "Free gym membership is a fringe benefit.", "Thẻ thành viên phòng tập miễn phí là một phúc lợi phụ thêm."],
    ["working overtime", "(n)", "làm thêm giờ", "/ˈwɜːkɪŋ ˈəʊvətaɪm/", "Paid extra money for working overtime.", "Được trả thêm tiền khi làm thêm giờ."],
    ["retirement plan", "(n)", "kế hoạch hưu trí", "/rɪˈtaɪəmənt plæn/", "Set up a private retirement plan.", "Thiết lập một kế hoạch hưu trí cá nhân."],
    ["career path", "(n)", "lộ trình sự nghiệp", "/kəˈrɪə pɑːθ/", "Plan a clear professional career path.", "Lập một lộ trình sự nghiệp chuyên nghiệp rõ ràng."],
    ["professionalism", "(n)", "sự chuyên nghiệp", "/prəˈfeʃənəlɪzəm/", "Praising her high level of professionalism.", "Khen ngợi mức độ chuyên nghiệp cao của cô ấy."],
    ["career advisor", "(n)", "cố vấn nghề nghiệp", "/kəˈrɪə ədˈvaɪzə/", "Talk to a career advisor.", "Nói chuyện với cố vấn nghề nghiệp."],
    ["job security", "(n)", "sự an toàn công việc", "/dʒɒb ʃɪˈkjʊərəti/", "Value high job security.", "Coi trọng sự an toàn công việc cao."],
    ["work schedule", "(n)", "lịch làm việc", "/wɜːk ˈʃedjuːl/", "Check the monthly work schedule.", "Kiểm tra lịch làm việc hàng tháng."]
  ],
  'science-tech-advanced': [
    ["biotechnology", "(n)", "công nghệ sinh học", "/ˌbaɪəʊtekˈnɒlədʒi/", "Research breakthroughs in biotechnology.", "Các đột phá nghiên cứu trong công nghệ sinh học."],
    ["nanotechnology", "(n)", "công nghệ nano", "/ˌnænəʊtekˈnɒlədʒi/", "Manufacture chips using nanotechnology.", "Chế tạo chip bằng công nghệ nano."],
    ["astrophysics", "(n)", "vật lý thiên văn", "/ˌæstrəʊˈfɪzɪks/", "Study black holes in astrophysics class.", "Nghiên cứu hố đen trong lớp vật lý thiên văn."],
    ["genetic engineering", "(n)", "kỹ thuật di truyền", "/dʒəˈnetɪk ˌendʒɪˈnɪərɪŋ/", "Crops modified by genetic engineering.", "Mùa màng được biến đổi bằng kỹ thuật di truyền."],
    ["quantum mechanics", "(n)", "cơ học lượng tử", "/ˈkwɒntəm mɪˈkænɪks/", "Quantum mechanics explains atomic physics.", "Cơ học lượng tử giải thích vật lý nguyên tử."],
    ["neuroscience", "(n)", "khoa học thần kinh", "/ˈnjʊərəʊsaɪəns/", "Analyze brain activity in neuroscience.", "Phân tích hoạt động của não trong khoa học thần kinh."],
    ["space exploration", "(n)", "khám phá không gian", "/speɪs ˌekspləˈreɪʃn/", "Funding for space exploration.", "Tài trợ cho khám phá không gian."],
    ["artificial satellite", "(n)", "vệ tinh nhân tạo", "/ˌɑːtɪˈfɪʃl ˈsætəlaɪt/", "Launch an artificial satellite.", "Phóng một vệ tinh nhân tạo."],
    ["data analysis", "(n)", "phân tích dữ liệu", "/ˈdeɪtə əˈnæləsɪs/", "Perform advanced data analysis.", "Thực hiện phân tích dữ liệu nâng cao."]
  ],
  'shopping-finance': [
    ["loyalty card", "(n)", "thẻ thành viên thân thiết", "/ˈlɔɪəlti kɑːd/", "Present your loyalty card at checkout.", "Trình thẻ thành viên thân thiết khi thanh toán."],
    ["installment plan", "(n)", "kế hoạch trả góp", "/ɪnˈstɔːlmənt plæn/", "Buy the laptop on an installment plan.", "Mua máy tính xách tay theo kế hoạch trả góp."],
    ["interest-free", "(adj)", "không lãi suất", "/ˌɪntrəst ˈfriː/", "Twelve months of interest-free credit.", "Mười hai tháng tín dụng không lãi suất."],
    ["credit limit", "(n)", "hạn mức tín dụng", "/ˈkredɪt ˈlɪmɪt/", "Reach the maximum credit limit.", "Đạt hạn mức tín dụng tối đa."],
    ["billing address", "(n)", "địa chỉ gửi hóa đơn", "/ˈbɪlɪŋ əˌdres/", "Enter the correct billing address.", "Nhập chính xác địa chỉ gửi hóa đơn."],
    ["return policy", "(n)", "chính sách trả hàng", "/rɪˈtɜːn ˈpɒlɪsi/", "Check the shop's return policy.", "Kiểm tra chính sách trả hàng của cửa hàng."],
    ["defective product", "(n)", "sản phẩm bị lỗi", "/dɪˈfektɪv ˈprɒdʌkt/", "Exchange the defective product for free.", "Đổi miễn phí sản phẩm bị lỗi."],
    ["customer service", "(n)", "dịch vụ khách hàng", "/ˈkʌstəmə ˈsɜːvɪs/", "Contact online customer service.", "Liên hệ với bộ phận dịch vụ khách hàng trực tuyến."],
    ["discount code", "(n)", "mã giảm giá", "/ˈdɪskaʊnt kəʊd/", "Apply a discount code at checkout.", "Áp dụng mã giảm giá khi thanh toán."],
    ["shopping cart", "(n)", "giỏ hàng mua sắm", "/ˈʃɒpɪŋ kɑːt/", "Add items to your virtual shopping cart.", "Thêm các món đồ vào giỏ hàng mua sắm ảo."],
    ["cashback program", "(n)", "chương trình hoàn tiền", "/ˈkæʃbæk ˈprəʊɡræm/", "Earn points in the cashback program.", "Tích điểm trong chương trình hoàn tiền."],
    ["impulsive buying", "(n)", "việc mua sắm bốc đồng", "/ɪmˈpʌlsɪv ˈbaɪɪŋ/", "Avoid budget loss from impulsive buying.", "Tránh hao hụt ngân sách do mua sắm bốc đồng."],
    ["window shopping", "(n)", "việc ngắm đồ qua tủ kính không mua", "/ˈwɪndəʊ ˈʃɒpɪŋ/", "Spend Sunday afternoon window shopping.", "Dành chiều chủ nhật để ngắm đồ qua tủ kính."],
    ["receipt paper", "(n)", "giấy biên lai", "/rɪˈsiːt ˈpeɪpə/", "Print the credit card receipt paper.", "In giấy biên lai thẻ tín dụng."]
  ],
  'psychology-emotions': [
    ["behavioral therapy", "(n)", "liệu pháp hành vi", "/bɪˈheɪvjərəl ˈθerəpi/", "Undergo cognitive behavioral therapy.", "Trải qua liệu pháp hành vi nhận thức."],
    ["defense mechanism", "(n)", "cơ chế tự vệ tâm lý", "/dɪˈfens ˈmekənɪzəm/", "Denial is a common defense mechanism.", "Từ chối là một cơ chế tự vệ tâm lý phổ biến."],
    ["coping strategy", "(n)", "chiến lược đối phó/vượt qua", "/ˈkəʊpɪŋ ˈstrætədʒi/", "Learn healthy stress coping strategies.", "Học các chiến lược đối phó với căng thẳng lành mạnh."],
    ["subconscious mind", "(n)", "tâm trí tiềm thức", "/ˌsʌbˈkɒnʃəs maɪnd/", "Fears hidden in the subconscious mind.", "Những nỗi sợ ẩn giấu trong tâm trí tiềm thức."],
    ["cognitive dissonance", "(n)", "sự bất hòa nhận thức", "/ˈkɒɡnətɪv ˈdɪsənəns/", "Experiencing cognitive dissonance.", "Trải qua sự bất hòa nhận thức."],
    ["mental disorder", "(n)", "rối loạn tinh thần", "/ˈmentl dɪsˈɔːdə/", "Treating chronic mental disorders.", "Điều trị các chứng rối loạn tinh thần mãn tính."],
    ["emotional intelligence", "(n)", "trí tuệ cảm xúc (EQ)", "/ɪˈməʊʃənl ɪnˈtelɪdʒəns/", "Test your emotional intelligence.", "Kiểm tra trí tuệ cảm xúc của bạn."],
    ["panic attack", "(n)", "cơn hoảng loạn đột ngột", "/ˈpænɪk əˈtæk/", "Breath deeply during a panic attack.", "Hít thở sâu trong cơn hoảng loạn đột ngột."],
    ["phobia fear", "(n)", "nỗi sợ hãi ám ảnh", "/ˈfəʊbiə fɪə/", "A severe phobia of spiders.", "Một nỗi sợ hãi ám ảnh về loài nhện."],
    ["mood swings", "(n)", "sự thay đổi tâm trạng thất thường", "/muːd swɪŋz/", "Hormones cause severe mood swings.", "Hormone gây ra sự thay đổi tâm trạng thất thường."],
    ["self-actualization", "(n)", "tự hiện thực hóa bản thân", "/ˌself ˌæktʃuəlaɪˈzeɪʃn/", "Strive for daily self-actualization.", "Phấn đấu cho việc tự hiện thực hóa bản thân hàng ngày."],
    ["psychological effect", "(n)", "tác động tâm lý", "/ˌsaɪkəˈlɒdʒɪkl ɪˈfekt/", "The psychological effect of colors.", "Tác động tâm lý của màu sắc."],
    ["mental capacity", "(n)", "năng lực trí tuệ", "/ˈmentl kəˈpæsəti/", "Develop your mental capacity.", "Phấn đấu để phát triển năng lực trí tuệ."],
    ["emotional state", "(n)", "trạng thái cảm xúc", "/ɪˈməʊʃənl steɪt/", "Check his current emotional state.", "Kiểm tra trạng thái cảm xúc hiện tại."]
  ],
  'kids-nature-animals': [
    ["puppy", "(n)", "chó con 🐶", "/ˈpʌpi/", "The little puppy wags its tail.", "Chú chó con vẫy đuôi."],
    ["kitten", "(n)", "mèo con 🐱", "/ˈkɪtn/", "The soft kitten drinks white milk.", "Chú mèo con mềm mại uống sữa trắng."],
    ["duckling", "(n)", "vịt con 🦆", "/ˈdʌklɪŋ/", "Yellow ducklings swim in the pond.", "Vịt con màu vàng bơi trong ao."],
    ["butterfly wings", "(n)", "cánh bướm 🦋", "/ˈbʌtəflaɪ wɪŋz/", "Colorful butterfly wings in the sky.", "Cánh bướm sặc sỡ trên bầu trời."],
    ["honey bee", "(n)", "ong mật 🐝", "/ˈhʌni biː/", "The honey bee visits pink flowers.", "Chú ong mật bay đến những bông hoa màu hồng."],
    ["green leaf", "(n)", "lá cây xanh 🍃", "/ɡriːn liːf/", "Green leaves grow on forest trees.", "Những chiếc lá xanh mọc trên cây rừng."],
    ["red apple", "(n)", "quả táo đỏ 🍎", "/red ˈæpl/", "Pick a sweet red apple.", "Hái một quả táo đỏ ngọt ngào."],
    ["yellow sun", "(n)", "mặt trời vàng ☀️", "/ˈjeləʊ sʌn/", "The yellow sun shines so bright.", "Mặt trời màu vàng chiếu sáng rực rỡ."],
    ["blue sky", "(n)", "bầu trời xanh ☁️", "/bluː skaɪ/", "Birds fly in the clear blue sky.", "Những chú chim bay trên bầu trời xanh trong."],
    ["soft grass", "(n)", "cỏ mềm 🌱", "/sɒft ɡrɑːs/", "Rabbits run on the soft green grass.", "Thỏ chạy trên thảm cỏ xanh mềm."],
    ["beautiful flower", "(n)", "bông hoa đẹp 🌸", "/ˈbjuːtɪfl ˈflaʊə/", "Smell a beautiful red flower.", "Ngửi một bông hoa đỏ tuyệt đẹp."],
    ["little star", "(n)", "ngôi sao nhỏ ⭐", "/ˈlɪtl stɑː/", "Count the little stars at night.", "Đếm những ngôi sao nhỏ vào ban đêm."],
    ["shining moon", "(n)", "vầng trăng sáng 🌙", "/ˈʃaɪnɪŋ muːn/", "Look at the shining moon tonight.", "Nhìn vầng trăng sáng tối nay."],
    ["white cloud", "(n)", "đám mây trắng ☁️", "/waɪt klaʊd/", "A big white cloud is floating.", "Một đám mây trắng lớn đang trôi."],
    ["little squirrel", "(n)", "sóc nhỏ 🐿️", "/ˈlɪtl ˈskwɪrəl/", "The little squirrel eats brown nuts.", "Chú sóc nhỏ ăn các hạt màu nâu."],
    ["forest tree", "(n)", "cây rừng 🌲", "/ˈfɒrɪst triː/", "Birds build nests in the forest tree.", "Chim làm tổ trên cây rừng."],
    ["ladybug insect", "(n)", "con bọ rùa 🐞", "/ˈleɪdibʌɡ ˈɪnsekt/", "A tiny red ladybug insect crawling.", "Một chú bọ rùa đỏ nhỏ xíu đang bò."],
    ["snail shell", "(n)", "vỏ ốc sên 🐌", "/sneɪl ʃel/", "The snail crawls inside its shell.", "Con ốc sên bò vào trong vỏ của nó."],
    ["frog jump", "(n/v)", "chú ếch nhảy 🐸", "/frɒɡ dʒʌmp/", "The green frog jumps into water.", "Chú ếch xanh nhảy xuống nước."],
    ["fish swim", "(n/v)", "chú cá bơi 🐟", "/fɪʃ swɪm/", "Colorful fish swim in the river.", "Những chú cá sặc sỡ bơi dưới sông."],
    ["cute bunny", "(n)", "thỏ con đáng yêu 🐰", "/kjuːt ˈbʌni/", "The cute bunny hops in the field.", "Chú thỏ con đáng yêu nhảy trên đồng cỏ."],
    ["little bear", "(n)", "gấu con 🐻", "/ˈlɪtl beə/", "The little bear sleeps with mom.", "Chú gấu con ngủ cùng mẹ."],
    ["small bird", "(n)", "con chim nhỏ 🐦", "/smɔːl bɜːd/", "The small bird sings a song.", "Con chim nhỏ hát một bài hát."],
    ["little fish", "(n)", "con cá nhỏ 🐟", "/ˈlɪtl fɪʃ/", "The little fish swims fast.", "Con cá nhỏ bơi nhanh."],
    ["green tree", "(n)", "cây xanh 🌳", "/ɡriːn triː/", "The green tree has red apples.", "Cây xanh có những quả táo đỏ."]
  ],
  'media-journalism': [
    ["mass media", "(n)", "phương tiện truyền thông đại chúng", "/mæs ˈmiːdiə/", "Advertise products through mass media.", "Quảng cáo sản phẩm qua truyền thông đại chúng."],
    ["investigative", "(adj)", "mang tính điều tra", "/ɪnˈvestɪɡətɪv/", "An award-winning investigative report.", "Một bản báo cáo điều tra đoạt giải thưởng."],
    ["correspondent", "(n)", "phóng viên thường trú", "/ˌkɒrəˈspɒndənt/", "A war correspondent reporting live.", "Một phóng viên chiến trường đưa tin trực tiếp."],
    ["press conference", "(n)", "cuộc họp báo", "/pres ˈkɒnfərəns/", "Answer questions at a press conference.", "Trả lời các câu hỏi tại một cuộc họp báo."],
    ["censorship", "(n)", "sự kiểm duyệt", "/ˈsensəʃɪp/", "Fight against government media censorship.", "Đấu tranh chống lại sự kiểm duyệt truyền thông của chính phủ."],
    ["editorial board", "(n)", "ban biên tập", "/ˌedɪˈtɔːriəl bɔːd/", "The editorial board meets daily.", "Ban biên tập họp hàng ngày."],
    ["fake news", "(n)", "tin tức giả mạo", "/feɪk njuːz/", "Identify and report fake news online.", "Nhận diện và báo cáo tin tức giả mạo trên mạng."],
    ["broadcaster", "(n)", "phát thanh viên / đài phát thanh", "/ˈbrɔːdkɑːstə/", "Work as a sports broadcaster.", "Làm việc như một phát thanh viên thể thao."],
    ["tabloid newspaper", "(n)", "báo lá cải", "/ˈtæblɔɪd ˈnjuːzpeɪpə/", "Gossip printed in tabloid newspapers.", "Các tin đồn được in trên báo lá cải."],
    ["headline news", "(n)", "tin tức dòng tít chính", "/ˈhedlaɪn njuːz/", "The scandal became headline news.", "Vụ bê bối đã trở thành tin tức dòng tít chính."],
    ["press release", "(n)", "thông cáo báo chí", "/pres rɪˈliːs/", "Send a formal press release to media.", "Gửi một thông cáo báo chí chính thức đến truyền thông."],
    ["journalism ethics", "(n)", "đạo đức báo chí", "/ˈdʒɜːnəlɪzəm ˈeθɪks/", "Courses teaching basic journalism ethics.", "Các khóa học dạy đạo đức báo chí cơ bản."],
    ["media coverage", "(n)", "sự đưa tin của truyền thông", "/ˈmiːdiə ˈkʌvərɪdʒ/", "Get extensive media coverage for events.", "Nhận được sự đưa tin rộng rãi của truyền thông cho sự kiện."],
    ["news anchor", "(n)", "phát thanh viên tin tức thời sự", "/njuːz ˈæŋkə/", "The news anchor reads the script.", "Phát thanh viên đọc bản tin."],
    ["foreign reporter", "(n)", "phóng viên nước ngoài", "/ˈfɒrən rɪˈpɔːtə/", "Meet the foreign reporter.", "Gặp gỡ phóng viên nước ngoài."],
    ["media mogul", "(n)", "ông trùm truyền thông", "/ˈmiːdiə ˈməʊɡl/", "A wealthy media mogul.", "Một ông trùm truyền thông giàu có."],
    ["press freedom", "(n)", "tự do báo chí", "/pres ˈfriːdəm/", "Fight for press freedom.", "Đấu tranh cho tự do báo chí."],
    ["broadcast studio", "(n)", "phòng thu phát sóng", "/ˈbrɔːdkɑːst ˈstjuːdiəʊ/", "Inside the broadcast studio.", "Bên trong phòng thu phát sóng."],
    ["digital media", "(n)", "truyền thông kỹ thuật số", "/ˈdɪdʒɪtl ˈmiːdiə/", "The rise of digital media.", "Sự trỗi dậy của truyền thông kỹ thuật số."],
    ["news agency", "(n)", "thông tấn xã / đài tin tức", "/njuːz ˈeɪdʒənsi/", "Reported by a local news agency.", "Được đưa tin bởi thông tấn xã địa phương."],
    ["printed paper", "(n)", "báo in", "/ˈprɪntɪd ˈpeɪpə/", "Read a printed paper.", "Đọc tờ báo in."],
    ["editor in chief", "(n)", "tổng biên tập", "/ˈedɪtər ɪn tʃiːf/", "Appoint a new editor in chief.", "Bổ nhiệm một tổng biên tập mới."]
  ],
  'ielts-academic-vocab': [
    ["furthermore", "(adv)", "hơn thế nữa", "/ˌfɜːðəˈmɔː/", "Furthermore, the data shows warming.", "Hơn thế nữa, dữ liệu cho thấy sự ấm lên."],
    ["nevertheless", "(adv)", "tuy nhiên", "/ˌnevəðəˈles/", "The task was hard; nevertheless, he won.", "Nhiệm vụ rất khó; tuy nhiên, anh ấy vẫn thắng."],
    ["consequently", "(adv)", "hệ quả là", "/ˈkɒnsɪkwəntli/", "He failed; consequently, he took it again.", "Anh ấy đã thi trượt; hệ quả là anh ấy phải thi lại."],
    ["subsequently", "(adv)", "sau đó / tiếp theo", "/ˈsʌbsɪkwəntli/", "The bill was subsequently amended.", "Dự luật sau đó đã được sửa đổi."],
    ["conversely", "(adv)", "ngược lại", "/ˈkɒnvɜːsli/", "She is quiet; conversely, he is loud.", "Cô ấy im lặng; ngược lại, anh ta lại ồn ào."],
    ["empirical", "(adj)", "thuộc thực nghiệm", "/ɪmˈpɪrɪkl/", "Gather empirical evidence for theories.", "Thu thập bằng chứng thực nghiệm cho các lý thuyết."],
    ["hypothesis", "(n)", "giả thuyết", "/haɪˈpɒθəsɪs/", "Test the scientific hypothesis in labs.", "Kiểm tra giả thuyết khoa học trong phòng thí nghiệm."],
    ["methodology", "(n)", "phương pháp luận", "/ˌmeθəˈdɒlədʒi/", "Explain the research methodology clearly.", "Giải thích rõ ràng phương pháp luận nghiên cứu."],
    ["correlation", "(n)", "sự tương quan", "/ˌkɒrəˈleɪʃn/", "A strong correlation between variables.", "Một sự tương quan mạnh mẽ giữa các biến số."],
    ["causation", "(n)", "quan hệ nhân quả", "/kɔːˈzeɪʃn/", "Correlation does not imply causation.", "Sự tương quan không ngụ ý quan hệ nhân quả."],
    ["quantitative", "(adj)", "thuộc định lượng", "/ˈkwɒntɪtətɪv/", "Conduct quantitative statistical analysis.", "Tiến hành phân tích thống kê định lượng."],
    ["qualitative", "(adj)", "thuộc định tính", "/ˈkwɒlɪtətɪv/", "Gather qualitative research interviews.", "Thu thập các cuộc phỏng vấn nghiên cứu định tính."],
    ["academic domain", "(n)", "lĩnh vực học thuật", "/ˌækəˈdemɪk ˈdʒɜːnəl/", "Research in the scientific academic domain.", "Nghiên cứu trong lĩnh vực học thuật khoa học."],
    ["nonetheless", "(adv)", "tuy nhiên", "/ˌnʌnðəˈles/", "Nonetheless, they made progress.", "Tuy nhiên, họ đã có tiến bộ."],
    ["preliminary", "(adj)", "sơ bộ", "/prɪˈlɪmɪnəri/", "The preliminary results are good.", "Kết quả sơ bộ rất tốt."],
    ["significant", "(adj)", "đáng kể / quan trọng", "/sɪɡˈnɪfɪkənt/", "A significant drop in price.", "Một sự sụt giảm giá đáng kể."]
  ]
};

// Target files configuration
const filesToUpdate = [
  {
    name: 'vocabExtendedData',
    path: path.join(process.cwd(), 'src', 'data', 'vocabExtendedData.js'),
    data: vocabExtendedData
  },
  {
    name: 'vocabMoreData',
    path: path.join(process.cwd(), 'src', 'data', 'vocabMoreData.js'),
    data: vocabMoreData
  },
  {
    name: 'vocabFinalData',
    path: path.join(process.cwd(), 'src', 'data', 'vocabFinalData.js'),
    data: vocabFinalData
  }
];

// Helper to generate full word object
function generateWord(en, type, vi, ipa, example, viExample) {
  return {
    en,
    type,
    vi,
    ipa,
    example,
    viExample,
    synonyms: '',
    antonyms: ''
  };
}

// ── 1. Update the three structured files ──
filesToUpdate.forEach(fileInfo => {
  console.log(`Processing file: ${fileInfo.name}`);
  let modified = false;

  fileInfo.data.forEach(topic => {
    const list = candidateWords[topic.id];
    if (list && topic.words) {
      const existingEn = new Set(topic.words.map(w => w.en.toLowerCase()));
      let added = 0;
      
      for (const [en, type, vi, ipa, ex, viEx] of list) {
        if (topic.words.length >= 101) break;
        if (!existingEn.has(en.toLowerCase())) {
          topic.words.push(generateWord(en, type, vi, ipa, ex, viEx));
          existingEn.add(en.toLowerCase());
          added++;
          modified = true;
        }
      }
      if (added > 0) {
        console.log(`   Topic [${topic.id}]: Added ${added} words. New Total: ${topic.words.length}`);
      }
    }
  });

  if (modified) {
    const content = `// File: src/data/${fileInfo.name}.js
const ${fileInfo.name} = ${JSON.stringify(fileInfo.data, null, 2)};

export default ${fileInfo.name};
`;
    fs.writeFileSync(fileInfo.path, content, 'utf8');
    console.log(`Saved ${fileInfo.name} changes!`);
  }
});

// ── 2. Update vocabVstepData.js (special handling for local data + concatenation)
console.log('Processing file: vocabVstepData');
const rawVstepData = vocabVstepData.slice(0, 14); // Extract only the local topics
let vstepModified = false;

rawVstepData.forEach(topic => {
  const list = candidateWords[topic.id];
  if (list && topic.words) {
    const existingEn = new Set(topic.words.map(w => w.en.toLowerCase()));
    let added = 0;

    for (const [en, type, vi, ipa, ex, viEx] of list) {
      if (topic.words.length >= 101) break;
      if (!existingEn.has(en.toLowerCase())) {
        topic.words.push(generateWord(en, type, vi, ipa, ex, viEx));
        existingEn.add(en.toLowerCase());
        added++;
        vstepModified = true;
      }
    }
    if (added > 0) {
      console.log(`   Local Topic [${topic.id}]: Added ${added} words. New Total: ${topic.words.length}`);
    }
  }
});

if (vstepModified) {
  const vstepContent = `// File: src/data/vocabVstepData.js
import vocabExtendedData from './vocabExtendedData';
import vocabMoreData from './vocabMoreData';
import vocabFinalData from './vocabFinalData';
import vocabExtraData2 from './vocabExtraData2';

const vocabData = ${JSON.stringify(rawVstepData, null, 2)};

export default [...vocabData, ...vocabExtendedData, ...vocabMoreData, ...vocabFinalData, ...vocabExtraData2];
`;
  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'vocabVstepData.js'), vstepContent, 'utf8');
  console.log('Saved vocabVstepData changes!');
}

console.log('--- ALL FILES UPDATED TO ENSURE 101+ WORDS PER TOPIC ---');
