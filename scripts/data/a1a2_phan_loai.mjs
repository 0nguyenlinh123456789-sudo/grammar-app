// File: scripts/data/a1a2_phan_loai.mjs
// PHÂN LOẠI 52 CHẶNG A1/A2 BỊ BỘ LỌC XẾP LÀ "KHÔNG ĐỦ ĐIỀU KIỆN SOẠN".
//
// ══ VÌ SAO CÓ FILE NÀY, VÀ VÌ SAO NÓ LÀ MỘT FILE CHỨ KHÔNG PHẢI MỘT ĐOẠN VĂN ══
// `scripts/audit_a1a2_story.mjs` xếp 52 chặng là không đủ điều kiện, và 48/52
// trượt vì ĐẾM ĐƯỢC ÍT HƠN 4 DẤU HIỆU TƯỜNG THUẬT (đại từ, liên từ). Đọc thật
// thì bộ đếm đó gộp hai chuyện khác hẳn nhau:
//
//   · `kids-starter` là truyện kể ngôi thứ nhất — Luna chào mặt trời, chạy tới
//     trường cùng con mèo, cô giáo khen. Trượt vì đúng 1 chữ "After".
//   · `nature-animals-beginner` thì đúng là diễu hành từ vựng: "you can see a
//     tall tree with a green leaf and a beautiful flower". Không mệnh đề nào để
//     hỏi; hỏi gì cũng thành hỏi kiến thức chung.
//
// Chính `audit_a1a2_story.mjs` đã tự dặn ở đầu: "BỘ LỌC THÔ để ra DANH SÁCH
// VIỆC, KHÔNG phải phán quyết chất lượng." Nên phán quyết phải do người đọc ra,
// và **phải ghi thành chữ** — giữ trong đầu thì phiên sau không kiểm lại được và
// chủ dự án không soi được. Đúng cách đã làm với `digital-society-100`: loại thì
// ghi lý do đích danh.
//
// ══ PHÉP THỬ THẬT SỰ ══
// Không phải đếm đại từ, mà là: **chỉ ra được BỐN CÂU KHÁC NHAU trong bài, mỗi
// câu trả lời một câu hỏi khác nhau, và không đoán ra được bằng kiến thức
// chung.** Bài tả chung chung ("a dog is a friendly animal") không qua được —
// hỏi về nó là hỏi về THẾ GIỚI, người học ghi điểm mà chưa đọc bài.

/** 'soan' = hỏi được ngay, không phải viết lại. 'viet-lai' = diễu hành từ vựng. */
export const PHAN_LOAI_A1 = {
  // ── ĐỢT MỘT 19/08 (9 chặng · 36 câu) ──────────────────────────────────────
  'kids-starter': { nhom: 'soan', xong: true, vi: 'Truyện ngôi thứ nhất của Luna: chào mặt trời, chạy tới trường cùng con mèo, cô giáo khen, thấy cầu vồng. Bốn mốc kể chuyện rõ ràng.' },
  'food-cooking': { nhom: 'soan', xong: true, vi: 'Hai cảnh có trình tự: lớp nấu ăn (thái/gọt/cắt → đun nước → rán hành) và bữa tối Chủ nhật (mẹ quay gà, bố nướng bánh kẹp).' },
  'time-dates-beginner': { nhom: 'soan', xong: true, vi: 'Thói quen CỦA MỘT NGƯỜI CỤ THỂ: dậy 6h30, học thứ Hai–thứ Sáu, ngủ trước nửa đêm, sinh nhật tháng Năm.' },
  'house-rooms-beginner': { nhom: 'soan', xong: true, vi: 'Ngôi nhà cụ thể: thảm đỏ phòng khách, bàn gỗ lớn phòng ăn, thịt và sữa trong tủ lạnh, ba phòng ngủ trên tầng.' },
  'weather-seasons-beginner-p2': { nhom: 'soan', xong: true, vi: 'Mỗi mùa có phát biểu riêng kiểm được: lá NÂU VÀ VÀNG rụng vào thu, nước TRONG HỒ đóng băng vào đông.' },
  'places-buildings-beginner-p2': { nhom: 'soan', xong: true, vi: 'Bản đồ thị trấn cụ thể: quảng trường ở trung tâm, ngân hàng và bưu điện ĐỐI DIỆN quán cà phê, trường BÊN PHẢI, phòng khách sạn TẦNG 10.' },
  'daily-routine-beginner': { nhom: 'soan', xong: true, vi: 'Một ngày kể theo trình tự, mốc giờ rõ: đồng hồ chỉ 6 AM, ăn trưa 12 PM, sau bữa tối quét nhà, trước khi ngủ đọc sách.' },
  'house-rooms-beginner-p2': { nhom: 'soan', xong: true, vi: 'Nhà bốn phòng, có số đếm và vị trí kiểm được: mở cửa vào là phòng khách, tranh và đồng hồ trên tường.' },
  'school-classroom-beginner': { nhom: 'soan', xong: true, vi: 'Lớp học cụ thể: cô đứng gần bảng trắng dùng phấn hoặc bút, trong cặp có vở/bút chì/tẩy/thước, thích toán nhưng khoa học và lịch sử cũng hay.' },

  // ── ĐỢT HAI 19/08 (4 chặng · 16 câu) — khó hơn vì nửa bài là kiến thức chung ─
  'numbers-time-beginner': { nhom: 'soan', xong: true, vi: 'Có mốc cá nhân neo được (dậy 7h, ngủ trước nửa đêm để ngủ đủ 8 tiếng), nhưng nửa bài là kiến thức chung (60 giây một phút) nên phải chọn câu cẩn thận.' },
  'body-parts-beginner': { nhom: 'soan', xong: true, vi: 'Ngôi thứ nhất và có thói quen riêng (rửa tay bằng xà phòng TRƯỚC KHI ăn, chải tóc), nhưng phần tả bộ phận cơ thể là kiến thức chung.' },
  'numbers-shapes-beginner': { nhom: 'soan', xong: true, vi: 'Có phát biểu kiểm được từ chính bài: 10 quả táo thêm 5 thành 15, bớt 2 còn 8; cô bảo vẽ TIM ĐỎ và SAO VÀNG; cửa lớp là hình chữ nhật.' },
  'travel-transport-beginner': { nhom: 'soan', xong: true, vi: 'Có trình tự chuyến đi (soạn hành lý → hộ chiếu và thị thực nếu ra nước ngoài → đặt phòng khách sạn), tuy phần lớn viết theo lối "bạn có thể…".' },

  // ── ĐỢT BA 19/08 — 4 CHẶNG ĐƯỢC VIẾT LẠI BÀI ĐỌC, KHÔNG CHỈ SOẠN CÂU ─────
  // Bốn mục ngay dưới đây từng nằm ở nhóm 'viet-lai'. Việc làm là VIẾT LẠI CHÍNH
  // BÀI ĐỌC (cả `storyEn` lẫn `storyVi`, xem `scripts/data/viet_lai_bai_doc.mjs`)
  // rồi mới soạn câu — chứ không phải cố nặn bốn câu hỏi từ một bài không hỏi được.
  //
  // Đổi bài đọc làm `tests/story_caps.test.js` ĐỎ, đúng như thiết kế của nó: ảnh
  // chụp băm chữ thường bắt được đúng 4 id, không sót không tràn, rồi mới chụp lại
  // có chủ ý. Và `tests/a1a2_phan_loai.test.js` cũng đỏ — phép kiểm "chặng viet-lai
  // không được lặng lẽ có câu hỏi" mà tôi ghi là "để dành bắn về sau" đã bắn lần
  // đầu, đúng lúc cần.

  // ── BẬC A1 KHÔNG CÒN CHẶNG NÀO CẦN VIẾT LẠI ───────────────────────────────
  // Cả 24 chặng A1 nay đều ở nhóm 'soan' và đều `xong: true`. 11 chặng từng bị
  // xếp là diễu hành từ vựng đã được VIẾT LẠI CHÍNH BÀI ĐỌC trong hai đợt ngày
  // 19/08 (4 chặng ở commit 9b745eb, 7 chặng ngay sau đó), rồi mới soạn câu hỏi.
  // Không chặng A1 nào còn mang băng cảnh báo cam.
  //
  // Việc còn lại của cả bảng này nằm hết ở bậc A2: 23 chặng.
  'animals-pets-beginner': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: từ danh mục định nghĩa thành chuyện của Mai — chó Bo còn nhỏ, mèo Mun lông xám một chân trắng, đi trang trại cậu, đi sở thú với lớp. Con sư tử ngủ trong bóng mát nên cả lớp không thấy; con khỉ lấy mũ của Nam.' },
  'transport-vehicles-beginner': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: thành một chuyến đi có thật từ làng ra sân bay — trượt xe buýt bảy giờ vì không tìm thấy vé, qua sông bằng cầu cũ vì đường hầm đóng, bác tài taxi đòi thắt dây an toàn trước khi nổ máy.' },
  'body-health-beginner-p2': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: thành một đợt cả nhà ốm — anh trai đau răng đi nha sĩ, người kể sốt ba mươi chín độ, y tá đo huyết áp trước, bác sĩ dặn một viên hai lần một ngày sau khi ăn trong năm ngày.' },
  'body-health-beginner-p3': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: thành một ngày ba học sinh cùng vào phòng y tế — Long đau đầu gối TRÁI, người kể đau đầu vì ngủ có bốn tiếng chứ không phải vì bệnh, Hoa đau răng nên cô y tế đành gọi mẹ đưa đi nha sĩ.' },
  'places-buildings-beginner': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: thành một thị trấn có địa lý kiểm được — chợ đối diện bưu điện, thư viện phía trên quán cà phê lên bằng cầu thang hông, bà ở căn hộ tầng năm, nhà máy ngoài thị trấn bên kia cầu.' },
  'food-drinks-beginner-p2': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: thành bữa tối sinh nhật mẹ do người kể tự nấu — tỏi cháy đen vì để lửa quá lâu, canh mặn vì cho muối hai lần, em trai không ăn cá vì sợ xương, bố nói thật là canh dở.' },
  'animals-nature-beginner': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: thành những buổi lên đồi với ông lúc bốn giờ ba mươi — thấy con cáo băng qua lối mòn, đếm được mười một con ong trên một bông hoa, ông bảo con ếch sợ mình hơn mình sợ nó.' },
  'nature-animals-beginner': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: thành chuyến đi biển hai ngày của lớp — cô đếm học sinh bốn lần vì sợ mất người, đặt lại hòn đá đúng như cũ sau khi xem con cua, gió mạnh nên tối không ai bơi được.' },
  'human-body-beginner': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: thành chuyện học bơi năm mười hai tuổi — luật duy nhất là thở RA dưới nước, bơi được lần đầu lúc thầy rút tay đỡ bụng mà không hay, tay yếu vì dùng tay nhiều chân ít.' },
  'colors-shapes-beginner-p3': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08: thành bài vẽ phòng mình theo trí nhớ — hai chị em vẽ màn cửa hai màu khác nhau, cửa sổ một bức chữ nhật rộng một bức gần vuông, và cuối cùng màn cửa hóa ra hai mặt hai màu.' },
  'school-life-100': { nhom: 'soan', xong: true, vi: 'ĐÃ VIẾT LẠI 19/08 (bài cũ chỉ 77 từ/5 câu, dưới CẢ hai ngưỡng độ dài): thành một tháng hay quên — cô viết lời nhắn nhờ mẹ ký, học sai môn vì đọc sai tuần trên lịch, chỉ làm được chín trên hai mươi câu.' },
};

// ══ BẬC A2 (elementary) — ĐÃ ĐỌC HẾT 28 CHẶNG 19/08 ══════════════════════
// Phép thử được làm ĐÚNG THỨ TỰ: **soạn thử bốn câu hỏi TRƯỚC, rồi mới xếp
// loại.** Nếu phải với tay tới một câu liệt kê ("bài kể trong buồng tắm có
// những gì?") để đủ từ ba lên bốn thì tức là KHÔNG có bốn — chặng đó là
// 'viet-lai'. Xếp loại bằng cách đọc rồi cảm thấy "bài này chắc hỏi được" là
// đúng cái sai của bộ lọc, chỉ khác là bằng tay.
//
// ══ KẾT QUẢ ĐO ĐƯỢC: 5 SOẠN ĐƯỢC / 23 CẦN VIẾT LẠI ══
// Tỉ lệ này XẤU HƠN A1 (13/24), và đó là kết quả phải có chứ không phải dấu
// hiệu tôi xếp quá khắt khe. Cả 28 chặng A2 đều là bài văn "(A2-B1)" sinh ra để
// PHỦ HẾT DANH SÁCH TỪ VỰNG của chủ đề — chính là ý nghĩa của mật độ 0,14–0,30
// đo được ở cả 28 file. Danh sách từ bậc A2 dài hơn A1 nên bài bị nhồi nặng hơn.
// Nới tay để con số trông đẹp hơn là đúng cái sai mà cả đợt này đang canh.
//
// ⚠️ 'soan' KHÔNG kèm `xong: true` nghĩa là **đủ điều kiện, CHƯA soạn câu** —
// tấm băng cảnh báo cam vẫn bật, và không chỗ nào khai khống. Cả 5 chặng 'soan'
// của bậc này đã soạn xong trong cùng ngày nên mang `xong: true`; 23 chặng
// 'viet-lai' thì KHÔNG, và băng cảnh báo của chúng còn nguyên.
export const PHAN_LOAI_A2 = {
  // ── SOẠN ĐƯỢC: bốn câu đã soạn thử được trước khi xếp loại ───────────────
  'weather-seasons': { nhom: 'soan', xong: true, vi: 'Phần 2 là một sự việc có thật của bài: NĂM NGOÁI thành phố hạn rồi tới lụt (đúng thứ tự đó), sét đánh CÂY GẦN NHÀ, trời u nhiều ngày rồi cầu vồng hiện ra. Cộng một mốc cá nhân: mùa thu là mùa người kể thích nhất.' },
  'places-directions-daily': { nhom: 'soan', xong: true, vi: 'Có hẳn một lời chỉ đường dẫn nguyên văn, và đường đi là một chuỗi mốc kiểm được: đi thẳng HAI dãy nhà, tới chỗ giao có đèn thì RẼ TRÁI, đi qua BƯU ĐIỆN, bảo tàng ĐỐI DIỆN thư viện. Không câu nào đoán được bằng kiến thức chung.' },
  'housing-home-daily': { nhom: 'soan', xong: true, vi: 'Ngôi thứ nhất và có PHÂN CÔNG việc nhà theo từng người: chị/em gái dọn buồng tắm, anh/em trai quét sàn và bỏ rác, người kể giúp mẹ rửa bát xếp vào tủ. Bên cạnh giường là bàn học. Đổi người nào cũng hợp lý ngoài đời nên phải đọc mới trả lời được.' },
  'food-cooking-daily-p2': { nhom: 'soan', xong: true, vi: 'Có quy trình CÓ THỨ TỰ (đầu tiên lấy dao thái hành và cà chua → trộn trong bát rồi khuấy nước sốt trên bếp) và các cặp cách-nấu–món-ăn tự đặt của bài: món lành thì HẤP rau và NƯỚNG VỈ cá. Kết bằng trình tự ở nhà hàng, khép lại bằng để tiền tip.' },
  'shopping-clothes-daily': { nhom: 'soan', xong: true, vi: 'Có câu hỏi dẫn nguyên văn lời người mua (\'Can I try this on?\'), ba kiểu không vừa mà kiểu thứ ba không đoán ra được (quá chật, quá rộng, SAI ĐỘ DÀI), lý do giữ hóa đơn nói đích danh (khóa kéo đứt hay mất cúc), và chỗ mang hàng tới để thử.' },

  // ── CẦN VIẾT LẠI: bài văn phủ danh sách từ vựng ──────────────────────────
  'animals-nature-daily': { nhom: 'viet-lai', vi: 'Diễu hành thiên nhiên theo lối \'from… to…\' rồi \'you can see…\'. Mọi phát biểu rút ra được đều là kiến thức chung: lợn lăn trong bùn, ô nhiễm đe dọa môi trường sống, hổ và voi thành nguy cấp khi rừng bị chặt.' },
  'technology-internet-daily': { nhom: 'viet-lai', vi: 'Bài khuyên chung về công nghệ, chủ ngữ là \'we\' và \'people\' chung chung. Bốn câu hỏi rút ra được (treo máy thì khởi động lại, cập nhật cho an toàn) đều trả lời được mà không đọc bài.' },
  'hobbies-entertainment-daily': { nhom: 'viet-lai', vi: 'Danh mục sở thích chia theo nhóm người (\'some prefer…\', \'others are more creative\'). Không nhân vật, không việc gì xảy ra, nên hỏi gì cũng thành hỏi bài liệt kê những gì.' },
  'clothes-fashion-daily': { nhom: 'viet-lai', vi: 'Danh mục quần áo theo dịp, và cặp dịp–trang phục nào cũng là kiến thức chung: đi cưới thì bộ đồ lịch sự, mùa đông thì áo len dày. Trình tự giặt phơi là ủi gấp cũng vậy.' },
  'house-furniture-daily': { nhom: 'viet-lai', vi: 'Đi từng phòng liệt kê đồ đạc và công dụng (tủ lạnh giữ đồ ăn tươi, lò vi ba hâm nóng). Trùng đề tài với housing-home-daily nhưng KHÔNG có nhân vật nào, nên mất đúng chỗ neo được câu hỏi.' },
  'body-health-daily': { nhom: 'viet-lai', vi: 'Bài khuyên chung về sức khỏe, khép lại bằng câu châm ngôn \'prevention is better than cure\'. Mọi cặp bệnh–xử lý là kiến thức chung: đau răng thì đi nha sĩ, cảm thì nghỉ và ngủ đủ.' },
  'weather-seasons-daily-p2': { nhom: 'viet-lai', vi: 'Tả bốn mùa theo lối chung chung (xuân ấm, hạ nóng, thu mát, đông lạnh nhất). Không sự việc nào của riêng bài, khác hẳn phần 2 của chặng weather-seasons.' },
  'hobbies-interests-daily': { nhom: 'viet-lai', vi: 'Bản thứ hai của cùng danh mục sở thích, chia theo \'if you prefer…\' / \'if you are an active person…\'. Không có ai làm gì ở đâu để hỏi.' },
  'transport-travel-daily': { nhom: 'viet-lai', vi: 'Có ba chỗ neo được (ra sân bay bằng taxi, muốn khám phá vùng quê thì lái xe, vượt biển thì đi từ cảng) nhưng câu thứ tư thì tụt xuống thành liệt kê phương tiện — tức là chưa đủ bốn, theo đúng phép thử.' },
  'health-body-daily-p2': { nhom: 'viet-lai', vi: 'Bài giải phẫu \'mắt để nhìn, tai để nghe\' rồi danh mục bệnh. Cùng dạng với human-body-beginner ở bậc A1 và cùng một lý do: không chi tiết nào riêng của bài.' },
  'technology-gadgets-daily': { nhom: 'viet-lai', vi: 'Hướng dẫn dùng máy tính và điện thoại theo lối \'you might…\'. Mọi bước (pin yếu thì cắm sạc, muốn nghe riêng thì đeo tai nghe) đều đúng ngoài đời nên không cần đọc bài.' },
  'entertainment-media-daily-p2': { nhom: 'viet-lai', vi: '0 dấu hiệu tường thuật, và đo bằng mắt cũng đúng: danh mục hình thức giải trí và người làm nghề (diễn viên, ca sĩ, nhà báo) kèm định nghĩa công việc của mỗi người.' },
  'culture-traditions-daily': { nhom: 'viet-lai', vi: 'Bài khái quát về văn hóa nói chung, mọi ví dụ đều để ngỏ (\'in some cultures… while in others…\'). Không nền văn hóa cụ thể nào để hỏi một câu có đáp án dứt khoát.' },
  'weather-climate-daily': { nhom: 'viet-lai', vi: 'Bản thứ ba của cùng bài tả bốn mùa, thêm phần thời tiết cực đoan liệt kê bão–lốc–hạn. Hỏi gì cũng là hỏi kiến thức chung về thời tiết.' },
  'nature-environment-daily': { nhom: 'viet-lai', vi: 'Tả phong cảnh rồi chuyển sang lời khuyên bảo vệ môi trường (tái chế, tiết kiệm năng lượng, trồng cây). Cả hai nửa đều là phát biểu chung, không sự việc nào.' },
  'weather-seasons-daily-p3': { nhom: 'viet-lai', vi: 'Bản thứ tư của cùng bài bốn mùa. Trùng tới mức đọc xong bốn bản thời tiết thì không phân biệt được bản nào nói gì — chính là dấu hiệu bài viết ra để phủ từ vựng.' },
  'nature-environment-daily-p2': { nhom: 'viet-lai', vi: 'Một chuỗi \'you can see…\' đi từ biển vào đất liền lên núi rồi lên trời, mỗi danh từ kèm đúng một tính từ. Không mệnh đề nào để hỏi.' },
  'sports-fitness-daily': { nhom: 'viet-lai', vi: 'Có hai cảnh (trận bóng, giải quần vợt) nhưng mọi chi tiết trong đó là luật chơi ai cũng biết: trọng tài thổi còi, đánh bóng qua lưới, thắng thì thành vô địch, hòa là draw.' },
  'music-entertainment-daily': { nhom: 'viet-lai', vi: 'Danh mục giải trí kèm định nghĩa vai (đạo diễn hướng dẫn diễn viên, khán giả vỗ tay). Trùng đề tài với entertainment-media-daily-p2 và cùng một lý do.' },
  'transport-vehicles-daily': { nhom: 'viet-lai', vi: 'Danh mục phương tiện và hạ tầng theo lối \'you can…\', khép bằng lời khuyên chung (kiểm động cơ, bánh, lốp; đừng chạy nhanh quá). Không chuyến đi nào có thật.' },
  'hotel-accommodation-daily': { nhom: 'viet-lai', vi: 'Có quy trình nhận và trả phòng, nhưng thử soạn thì chỉ ra ba câu neo được, câu thứ tư tụt xuống thành \'buồng tắm riêng có những gì\' — đúng loại câu liệt kê mà phép thử loại.' },
  'arts-culture-daily': { nhom: 'viet-lai', vi: 'Danh mục loại hình nghệ thuật kèm định nghĩa người làm nghề (họa sĩ nổi tiếng vẽ tranh sơn dầu, nhà văn viết sách hoặc thơ). Trùng đề tài với culture-traditions-daily.' },
  'science-technology-daily': { nhom: 'viet-lai', vi: 'Mật độ từ vựng chủ đề cao nhất cả bậc A2 (0,30) và đọc thấy đúng vậy: mỗi câu nhồi một chùm thuật ngữ (hóa–sinh–lý, tế bào và gen, tên lửa và vệ tinh). Mọi cặp là kiến thức chung: kính viễn vọng để nhìn mặt trăng.' },
};
