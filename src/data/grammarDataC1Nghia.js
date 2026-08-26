// File: src/data/grammarDataC1Nghia.js
// HAI BÀI C1 VỀ NGHĨA KHÔNG NẰM TRONG CHỮ — SOẠN TAY.
//
// ══ VÌ SAO PHẢI SOẠN THÊM ══
// Vòng kiểm này đối chiếu ĐỀ THI C1 với thứ lộ trình C1 thật sự dạy. Phần Đọc
// của `exam-c1` tự khai: "câu trả lời hầu như KHÔNG nằm nguyên văn trong đoạn —
// phải đọc ra hàm ý, thái độ và cấu trúc lập luận". Đo cụ thể 8 câu:
//
//   ec1-r2  nói giảm ("not entirely without merit" = chê)
//   ec1-r3  hàm ý của mệnh đề chen giữa hai dấu phẩy
//   ec1-r4  đảo ngữ giả định ("Were the effect as large as...")  ← c1c2_3 CÓ dạy
//   ec1-r6  "if anything" — thực tế đi ngược lời cảnh báo
//   ec1-r8  mỉa mai ("Naturally, the report was published at five o'clock...")
//
// Rồi đo kho: `grammarDataC1C2.js` có **0 lần** nhắc tới mỉa mai / nói giảm /
// hàm ý / sắc thái. `readingTexts.js` (30 bài VOA) cũng **0** — đó là tin tức
// đưa tin thẳng, không phải văn bản có giọng điệu. Bài gần nhất là `c1c2_17`
// "Linking Words & Discourse Markers", nhưng đọc ra thì nó dạy TỪ NỐI
// (albeit, be that as it may, in a nutshell) chứ không dạy THÁI ĐỘ.
//
// Tức là đề C1 đang đo một thứ lộ trình chưa từng dạy. Theo luật đã dùng cho vế
// NGHE của đề A1/A2, cách chữa KHÔNG phải bỏ câu hỏi đi — câu hỏi đó đúng, đọc
// ra hàm ý chính là việc phân biệt B2 với C1. Cách chữa là DẠY nó.
//
// ══ KHUÔN DỮ LIỆU ══
// Giữ đúng khuôn của grammarDataB1.js — theory / sentenceGame / exercises /
// fillBlanks / errorCorrection / transformation / matching / trueFalse.
//
// ══ CÂU VÍ DỤ ══
// Tự soạn, không chép từ đề thi: một bài dạy mà dùng thẳng câu của đề thì người
// học thuộc câu chứ không học được kỹ năng.

export const grammarDataC1Nghia = [
  {
    id: 'c1_hamy',
    title: '26. Hàm Ý & Thái Độ Người Viết',
    level: 'C1/C2',
    category: 'Discourse',
    color: 'bg-fuchsia-300',
    theory: [
      {
        h: 'I. Vì sao đọc đúng chữ vẫn hiểu sai',
        c: '👉 Từ bậc C1, người viết thường KHÔNG nói thẳng ý mình. Họ nói một câu đúng về mặt chữ, và để người đọc tự rút ra kết luận.\n\n→ "The committee met four times." (Uỷ ban họp bốn lần.)\nCâu này không chê ai. Nhưng đặt vào:\n→ "The committee met four times and produced nothing."\nthì câu đầu trở thành lời chê.\n\n📌 Ba câu hỏi phải tự đặt khi đọc mức C1:\n  1. Người viết ĐANG NÓI gì? (nghĩa đen)\n  2. Người viết MUỐN tôi nghĩ gì? (hàm ý)\n  3. Người viết ĐỨNG VỀ PHÍA nào? (thái độ)\n\n⚠️ Bài thi bậc này hỏi câu 2 và câu 3, không hỏi câu 1.',
      },
      {
        h: 'II. NÓI GIẢM — chê bằng cách khen dè dặt',
        c: '👉 Tiếng Anh trang trọng rất hay chê bằng một lời khen bị rút bớt. Dấu hiệu: phủ định chồng phủ định, hoặc một trạng từ hạ mức.\n\n→ "not entirely without merit" = có chút giá trị → NGỤ Ý: phần lớn là không.\n→ "The results were less than encouraging." = KHÔNG hề khả quan.\n→ "He is not the most careful writer I know." = anh ta viết ẩu.\n→ "The plan is, at best, optimistic." = kế hoạch này viển vông.\n\n📌 Công thức nhận diện:\n  not + un-/without/entirely...  → chê nhẹ\n  less than + tính từ tốt        → chê\n  at best / at most + lời khen   → chê\n\n⚠️ BẪY: dịch từng chữ thì ra lời khen. "Not without merit" KHÔNG phải "có giá trị".',
      },
      {
        h: 'III. MỈA MAI — nói ngược để chê',
        c: '👉 Mỉa mai là nói điều ngược hẳn với ý thật, và trông chờ người đọc nhận ra. Dấu hiệu nằm ở CHỖ VÔ LÝ giữa lời khen và sự việc.\n\n→ "Naturally, the notice appeared after the deadline had passed."\n  "Naturally" (đương nhiên) đặt trước một việc đáng lẽ không nên xảy ra → NGỤ Ý: chuyện này là cố ý, và người viết đang chê.\n\n→ "Brilliant. Another meeting about meetings."\n→ "How very convenient that the file went missing."\n→ "The service was wonderful — we waited only ninety minutes."\n\n📌 Ba từ hay báo hiệu mỉa mai khi đứng đầu câu:\n  Naturally, / Of course, / Predictably,\nkèm một sự việc đáng lẽ KHÔNG nên là chuyện đương nhiên.',
      },
      {
        h: 'IV. HÀM Ý TRONG PHẦN CHEN GIỮA',
        c: '👉 Phần chen giữa hai dấu phẩy, hai gạch ngang hoặc trong ngoặc thường mang thông tin người viết muốn nói mà không muốn nói to.\n\n→ "It has been suggested, though not by anyone with access to the figures, that the decline is temporary."\n  Phần chen ngụ ý: NHỮNG NGƯỜI CÓ SỐ LIỆU THẬT thì không nói thế → người viết không tin.\n\n→ "The rule applies to staff who joined after March — not, as several managers assumed, to all staff."\n  Phần chen sửa lại một hiểu lầm, và chê nhẹ mấy người quản lý.\n\n📌 Gặp phần chen thì hỏi: bỏ nó đi thì câu MẤT gì? Cái mất đi chính là hàm ý.',
      },
      {
        h: 'V. TỪ BÁO HIỆU ĐỔI CHIỀU',
        c: '👉 Vài cụm ngắn báo rằng câu sau sẽ đi NGƯỢC câu trước. Bỏ sót chúng là hiểu ngược cả đoạn.\n\n→ if anything = nếu có gì thì là ngược lại\n  "Critics said hiring would slow. If anything, it accelerated." → nó TĂNG.\n→ far from = chẳng những không\n  "Far from settling the question, the data relocated it." → KHÔNG giải quyết được.\n→ let alone = nói gì đến\n  "He cannot read the form, let alone fill it in." → điền thì càng không.\n→ hardly / scarcely = gần như không\n→ only to + V = rồi rốt cuộc lại (kết cục trái mong đợi)\n  "She rewrote the report, only to be told it was no longer needed."\n\n⚠️ "If anything" KHÔNG phải "nếu có bất cứ thứ gì".',
      },
    ],
    sentenceGame: [
      { id: 1, text: 'The proposal was not entirely without merit', trans: 'Đề xuất đó cũng không đến nỗi vô giá trị (ngụ ý: phần lớn là dở)' },
      { id: 2, text: 'Naturally the report arrived after the meeting had ended', trans: 'Đương nhiên là bản báo cáo tới sau khi cuộc họp kết thúc (mỉa mai)' },
      { id: 3, text: 'Far from solving the problem the new rule made it worse', trans: 'Chẳng những không giải quyết được vấn đề, quy định mới còn làm nó tệ hơn' },
      { id: 4, text: 'If anything the situation has improved since last year', trans: 'Nếu có gì thay đổi thì tình hình đã khá lên so với năm ngoái' },
      { id: 5, text: 'He cannot spell his own name let alone write a report', trans: 'Anh ta viết tên mình còn sai, nói gì đến viết báo cáo' },
      { id: 6, text: 'She revised the whole chapter only to be told it was cut', trans: 'Cô ấy sửa lại cả chương, rồi rốt cuộc được báo là chương đó đã bị cắt' },
      { id: 7, text: 'The results were less than encouraging for the research team', trans: 'Kết quả chẳng khả quan chút nào với nhóm nghiên cứu' },
      { id: 8, text: 'It was claimed though not by the engineers that the bridge was safe', trans: 'Có người khẳng định cây cầu an toàn, tuy không phải là các kỹ sư' },
    ],
    exercises: [
      { id: 1, q: '"The film was not without its moments." Người viết đang làm gì?', opts: ['Chê nhẹ — phim chỉ được vài đoạn', 'Khen hết lời', 'Nói phim không có gì đáng xem', 'Không nêu ý kiến'], a: 'Chê nhẹ — phim chỉ được vài đoạn' },
      { id: 2, q: '"Predictably, the budget was announced on a Friday evening." Chữ "Predictably" cho thấy gì?', opts: ['Người viết cho rằng người ta cố chọn giờ ít ai để ý', 'Người viết thấy đó là quy trình bắt buộc', 'Người viết khen cách công bố', 'Người viết không biết vì sao'], a: 'Người viết cho rằng người ta cố chọn giờ ít ai để ý' },
      { id: 3, q: '"Far from being a setback, the delay gave us time." Nghĩa là gì?', opts: ['Việc chậm trễ hoá ra lại có lợi', 'Việc chậm trễ là một thất bại', 'Chúng tôi không có thời gian', 'Không rõ lợi hay hại'], a: 'Việc chậm trễ hoá ra lại có lợi' },
      { id: 4, q: '"The manual is, at best, incomplete." Người viết đánh giá cuốn sổ tay thế nào?', opts: ['Rất tệ — nói nhẹ nhất cũng là thiếu', 'Đầy đủ', 'Khá tốt', 'Hoàn hảo'], a: 'Rất tệ — nói nhẹ nhất cũng là thiếu' },
      { id: 5, q: '"It was agreed, though not unanimously, to postpone." Phần chen ngụ ý gì?', opts: ['Có người phản đối', 'Mọi người đều đồng ý', 'Không ai bỏ phiếu', 'Cuộc họp bị huỷ'], a: 'Có người phản đối' },
      { id: 6, q: '"He barely finished the form, let alone the interview." Nghĩa là gì?', opts: ['Phỏng vấn thì càng không xong', 'Anh ấy làm xong cả hai', 'Anh ấy chỉ làm phỏng vấn', 'Anh ấy bỏ cuộc từ đầu'], a: 'Phỏng vấn thì càng không xong' },
      { id: 7, q: '"She studied for months, only to fail by one mark." Chữ "only to" báo hiệu gì?', opts: ['Một kết cục trái với công sức bỏ ra', 'Một kết quả tốt đẹp', 'Cô ấy không học gì', 'Cô ấy đã đỗ'], a: 'Một kết cục trái với công sức bỏ ra' },
      { id: 8, q: '"If anything, the noise got worse after the repairs." Nghĩa là gì?', opts: ['Sửa xong còn ồn hơn', 'Sửa xong đã hết ồn', 'Không ai sửa gì', 'Tiếng ồn không đổi'], a: 'Sửa xong còn ồn hơn' },
    ],
    fillBlanks: [
      { q: 'The design is not _____ without flaws, but it works.', a: 'entirely', trans: 'Thiết kế không phải là không có lỗi, nhưng nó chạy được.' },
      { q: '_____ from being cheap, the new system cost twice as much.', a: 'Far', trans: 'Chẳng những không rẻ, hệ thống mới còn đắt gấp đôi.' },
      { q: 'If _____, the second draft was harder to read than the first.', a: 'anything', trans: 'Nếu có gì thì bản thảo thứ hai còn khó đọc hơn bản đầu.' },
      { q: 'He never answered the first email, _____ alone the three that followed.', a: 'let', trans: 'Anh ta còn không trả lời email đầu, nói gì đến ba cái sau.' },
      { q: 'They waited two hours, _____ to be told the office had closed.', a: 'only', trans: 'Họ chờ hai tiếng, rồi rốt cuộc được báo là văn phòng đã đóng cửa.' },
    ],
    errorCorrection: [
      { sentence: 'The report was not without merit, so the committee praised it warmly.', errorWord: 'praised', correction: 'accepted it with reservations', explanation: '"Not without merit" là lời CHÊ nhẹ, không phải lời khen — câu sau không thể là khen nồng nhiệt.', trans: 'Bản báo cáo cũng có chút giá trị, nên uỷ ban chấp nhận nó một cách dè dặt.' },
      { sentence: 'If anything, the weather improved, so the match was cancelled.', errorWord: 'cancelled', correction: 'went ahead', explanation: '"If anything, the weather improved" nghĩa là thời tiết còn KHÁ LÊN — không có lý do huỷ trận đấu.', trans: 'Nếu có gì thì thời tiết còn khá lên, nên trận đấu vẫn diễn ra.' },
      { sentence: 'Far from being a success, the launch broke every sales record.', errorWord: 'broke', correction: 'missed', explanation: '"Far from being a success" = chẳng những không thành công — không thể đi với việc phá mọi kỷ lục doanh số.', trans: 'Chẳng những không thành công, đợt ra mắt còn không đạt chỉ tiêu doanh số nào.' },
      { sentence: 'He cannot even boil water, let alone he cooks a dinner.', errorWord: 'he cooks', correction: 'cook', explanation: 'Sau "let alone" dùng cùng dạng với vế trước — ở đây là động từ nguyên thể: "let alone cook a dinner".', trans: 'Anh ta đun nước còn không xong, nói gì đến nấu một bữa tối.' },
      { sentence: 'Naturally, the train arrived exactly on time as it always does.', errorWord: 'as it always does', correction: '— for once', explanation: 'Mỉa mai cần một chỗ VÔ LÝ. "Naturally" + một việc vốn đã luôn đúng giờ thì không mỉa mai được gì.', trans: 'Đương nhiên rồi, tàu đến đúng giờ chằn chặn — lần này thôi.' },
    ],
    transformation: [
      { original: 'The proposal has some good points, but most of it is weak.', instruction: 'Viết lại thành một lời chê bằng cách nói giảm.', keyword: 'not entirely without', a: 'The proposal is not entirely without merit.' },
      { original: 'The new rule did not fix the problem; it made it worse.', instruction: 'Bắt đầu câu bằng "Far from".', keyword: 'Far from', a: 'Far from fixing the problem, the new rule made it worse.' },
      { original: 'People expected sales to drop. In fact they rose.', instruction: 'Viết lại vế sau bằng "If anything".', keyword: 'If anything', a: 'If anything, sales rose.' },
      { original: 'She rewrote the essay and then learned it was not required.', instruction: 'Nối hai vế bằng "only to".', keyword: 'only to', a: 'She rewrote the essay, only to learn it was not required.' },
      { original: 'He cannot understand the question, and answering it is even further beyond him.', instruction: 'Rút gọn vế sau bằng "let alone".', keyword: 'let alone', a: 'He cannot understand the question, let alone answer it.' },
    ],
    matching: [
      {
        pairs: [
          { left: 'not entirely without merit', right: 'chê nhẹ bằng cách khen dè dặt' },
          { left: 'Naturally, + việc đáng lẽ không nên xảy ra', right: 'mỉa mai' },
          { left: 'if anything', right: 'thực tế đi ngược điều vừa nói' },
          { left: 'far from', right: 'chẳng những không' },
          { left: 'let alone', right: 'nói gì đến' },
          { left: 'only to + V', right: 'rồi rốt cuộc lại — kết cục trái mong đợi' },
        ],
      },
    ],
    trueFalse: [
      { sentence: 'The meal was not bad. → đây là một lời khen hết lời.', isCorrect: false, correction: 'The meal was not bad. → đây là lời khen DÈ DẶT: tạm được, không hơn.', explanation: 'Phủ định một tính từ xấu chỉ đưa câu lên mức "tạm", không đưa lên mức "hay".', trans: 'Bữa ăn cũng không tệ.' },
      { sentence: 'It has been suggested, though not by anyone with the figures, that the decline is temporary.', isCorrect: true, explanation: 'Phần chen giữa hai dấu phẩy mang hàm ý: những người CÓ số liệu thật thì không nói thế.', trans: 'Có ý kiến cho rằng mức giảm chỉ là tạm thời, tuy không phải từ ai có số liệu gốc.' },
      { sentence: 'Far from the station, the new rule made things worse. → "Far from" ở đây nghĩa là "ở xa".', isCorrect: false, correction: 'Far from solving the problem, the new rule made things worse. → "chẳng những không".', explanation: 'Đứng đầu mệnh đề với V-ing, "Far from" nghĩa là "chẳng những không", không phải khoảng cách.', trans: 'Chẳng những không giải quyết được vấn đề, quy định mới còn làm mọi thứ tệ hơn.' },
      { sentence: 'Naturally, the notice appeared after the deadline had passed.', isCorrect: true, explanation: 'Mỉa mai: "Naturally" đặt trước một việc đáng lẽ không nên là chuyện đương nhiên.', trans: 'Đương nhiên rồi, thông báo xuất hiện sau khi hạn nộp đã qua.' },
      { sentence: 'If anything, the noise got worse. → "If anything" nghĩa là "nếu có bất cứ thứ gì".', isCorrect: false, correction: 'If anything, the noise got worse. → "nếu có gì thì là NGƯỢC LẠI".', explanation: 'Cụm này báo hiệu thực tế đi ngược điều vừa nói.', trans: 'Nếu có gì thì tiếng ồn còn tệ hơn.' },
    ],
  },
  {
    id: 'c1_raodon',
    title: '27. Rào Đón & Chọn Mức Trang Trọng',
    level: 'C1/C2',
    category: 'Discourse',
    color: 'bg-violet-300',
    theory: [
      {
        h: 'I. Rào đón là gì, và vì sao mức C1 bắt buộc phải có',
        c: '👉 Rào đón (hedging) = nói một điều mà KHÔNG khẳng định chắc hơn mức bằng chứng cho phép.\n\n→ "Smoking causes this disease." (khẳng định tuyệt đối)\n→ "Smoking appears to be a major factor in this disease." (rào đón)\n\n📌 Ở văn viết học thuật và văn viết công việc, câu KHÔNG rào đón bị đọc là thiếu cẩn trọng, chứ không phải là mạnh mẽ.\n\n⚠️ Đây là chỗ người học Việt hay mất điểm nhất ở bài viết bậc C1: viết đúng ngữ pháp nhưng khẳng định quá chắc.',
      },
      {
        h: 'II. Bốn cách rào đón',
        c: '✅ 1. ĐỘNG TỪ KHUYẾT THIẾU: may · might · could\n→ The delay may have been caused by the weather.\n\n✅ 2. ĐỘNG TỪ BÁO CÁO: appear to · seem to · tend to · suggest · indicate\n→ The figures suggest a slow recovery. (KHÔNG phải "prove")\n\n✅ 3. TRẠNG TỪ MỨC ĐỘ: arguably · apparently · largely · broadly · relatively\n→ The method is arguably the most reliable one available.\n\n✅ 4. KHUNG PHI CÁ NHÂN: It is widely accepted that... / There is some evidence that...\n→ It is generally assumed that early exposure helps.\n\n📌 Một câu rào đón tốt thường dùng MỘT cách, không chồng ba cách:\n❌ "It may possibly perhaps suggest that..." — chồng quá thành ra lảng tránh.',
      },
      {
        h: 'III. Ba mức trang trọng của cùng một ý',
        c: '👉 Cùng một ý, ba mức khác nhau. Chọn sai mức thì câu đúng ngữ pháp vẫn sai chỗ.\n\nNÓI HẰNG NGÀY → "We messed up the schedule."\nTRUNG TÍNH      → "We made a mistake with the schedule."\nTRANG TRỌNG     → "An error occurred in the scheduling process."\n\n📌 Dấu hiệu của mức trang trọng:\n  • danh từ hoá: we decided → the decision was taken\n  • bị động để bỏ người làm: someone lost the file → the file was mislaid\n  • từ gốc Latin thay phrasal verb: find out → ascertain · put off → postpone · get rid of → eliminate\n\n⚠️ Trang trọng KHÔNG phải là dài hơn. "Utilise" không sang hơn "use", nó chỉ dài hơn.',
      },
      {
        h: 'IV. Nhượng bộ — dấu hiệu của lập luận bậc C1',
        c: '👉 Lập luận mức C1 thừa nhận phía bên kia TRƯỚC, rồi mới phản bác. Bài viết chỉ nói một phía bị đọc là bài viết yếu.\n\n📌 Khung chuẩn:\n  While X is true, Y...\n  Admittedly X. Nevertheless, Y...\n  There is some truth in X; the difficulty is that Y...\n  X may hold in ...; it is far less clear that Y.\n\n✅ "Admittedly, online courses reach more people. Nevertheless, reach is not the same as completion."\n\n⚠️ Nhượng bộ phải là một điểm THẬT của phía kia. Nêu một điểm yếu để dễ bác bỏ thì người đọc nhận ra ngay.',
      },
      {
        h: 'V. Khi nào KHÔNG rào đón',
        c: '👉 Rào đón sai chỗ cũng hỏng như khẳng định quá chắc.\n\n❌ "Water might possibly boil at around 100°C." — sự thật đã biết thì không rào đón.\n❌ "I may perhaps be applying for this position." — thư xin việc cần rõ ràng.\n❌ "The deadline could possibly be Friday." — thông báo cần dứt khoát.\n\n📌 Luật đơn giản: rào đón cái mình SUY RA, không rào đón cái mình BIẾT hay cái mình QUYẾT.',
      },
    ],
    sentenceGame: [
      { id: 1, text: 'The figures suggest a gradual recovery rather than a sudden one', trans: 'Các con số cho thấy một sự hồi phục từ từ chứ không đột ngột' },
      { id: 2, text: 'This method is arguably the most reliable one currently available', trans: 'Có thể nói đây là phương pháp đáng tin nhất hiện có' },
      { id: 3, text: 'It is widely accepted that early exposure improves pronunciation', trans: 'Người ta thường cho rằng tiếp xúc sớm giúp cải thiện phát âm' },
      { id: 4, text: 'The delay may have been caused by a fault in the system', trans: 'Sự chậm trễ có thể do một lỗi trong hệ thống gây ra' },
      { id: 5, text: 'Admittedly the approach is expensive but the results justify it', trans: 'Phải thừa nhận cách làm này tốn kém, nhưng kết quả xứng đáng' },
      { id: 6, text: 'While the survey is useful it covers only a small region', trans: 'Dù khảo sát có ích, nó chỉ bao phủ một vùng nhỏ' },
      { id: 7, text: 'An error occurred during the scheduling process', trans: 'Đã xảy ra một sai sót trong quá trình sắp lịch' },
      { id: 8, text: 'There is some evidence that shorter sessions work better', trans: 'Có phần nào bằng chứng cho thấy buổi học ngắn hơn thì hiệu quả hơn' },
    ],
    exercises: [
      { id: 1, q: 'Câu nào rào đón đúng mức cho một kết quả nghiên cứu?', opts: ['The data suggest a link between the two.', 'The data prove a link between the two.', 'The data definitely show the truth.', 'The data cannot be wrong.'], a: 'The data suggest a link between the two.' },
      { id: 2, q: '"It is widely accepted that..." là cách rào đón kiểu nào?', opts: ['Khung phi cá nhân', 'Động từ khuyết thiếu', 'Trạng từ mức độ', 'Câu bị động'], a: 'Khung phi cá nhân' },
      { id: 3, q: 'Câu nào KHÔNG nên rào đón?', opts: ['Hạn nộp là thứ Sáu.', 'Nguyên nhân của xu hướng này.', 'Tác động lâu dài của chính sách.', 'Lý do khiến số liệu giảm.'], a: 'Hạn nộp là thứ Sáu.' },
      { id: 4, q: 'Bản trang trọng của "We put off the meeting" là gì?', opts: ['The meeting was postponed.', 'We put the meeting off.', 'We did not do the meeting.', 'The meeting got moved.'], a: 'The meeting was postponed.' },
      { id: 5, q: '"Admittedly, X. Nevertheless, Y." dùng để làm gì?', opts: ['Thừa nhận phía kia rồi mới phản bác', 'Nêu hai ví dụ giống nhau', 'Tóm tắt cả bài', 'Đổi sang chủ đề khác'], a: 'Thừa nhận phía kia rồi mới phản bác' },
      { id: 6, q: 'Câu nào rào đón CHỒNG quá mức?', opts: ['It may possibly perhaps indicate a trend.', 'It may indicate a trend.', 'It appears to indicate a trend.', 'It arguably indicates a trend.'], a: 'It may possibly perhaps indicate a trend.' },
      { id: 7, q: '"Ascertain" là bản trang trọng của cụm nào?', opts: ['find out', 'give up', 'look after', 'run into'], a: 'find out' },
      { id: 8, q: 'Vì sao bài viết bậc C1 cần nhượng bộ?', opts: ['Vì lập luận một phía bị đọc là lập luận yếu', 'Vì bài phải dài hơn', 'Vì phải dùng đủ từ nối', 'Vì cần nhiều đoạn hơn'], a: 'Vì lập luận một phía bị đọc là lập luận yếu' },
    ],
    fillBlanks: [
      { q: 'The results _____ to support the original hypothesis.', a: 'appear', trans: 'Kết quả có vẻ ủng hộ giả thuyết ban đầu.' },
      { q: 'It is _____ accepted that sleep affects memory.', a: 'widely', trans: 'Người ta thường cho rằng giấc ngủ ảnh hưởng tới trí nhớ.' },
      { q: 'This is _____ the clearest explanation offered so far.', a: 'arguably', trans: 'Có thể nói đây là lời giải thích rõ nhất từ trước tới nay.' },
      { q: '_____, the method is slow. Nevertheless, it is accurate.', a: 'Admittedly', trans: 'Phải thừa nhận cách làm này chậm. Tuy vậy, nó chính xác.' },
      { q: 'There is some _____ that the effect weakens over time.', a: 'evidence', trans: 'Có phần nào bằng chứng cho thấy tác dụng yếu dần theo thời gian.' },
    ],
    errorCorrection: [
      { sentence: 'The study proves that all learners benefit from this method.', errorWord: 'proves', correction: 'suggests', explanation: 'Một nghiên cứu đơn lẻ không "chứng minh" cho MỌI người học — mức khẳng định vượt quá bằng chứng.', trans: 'Nghiên cứu cho thấy người học có thể hưởng lợi từ phương pháp này.' },
      { sentence: 'Water might possibly boil at approximately one hundred degrees.', errorWord: 'might possibly', correction: '(bỏ)', explanation: 'Không rào đón một sự thật đã biết chắc — làm vậy chỉ khiến câu nghe thiếu tự tin.', trans: 'Nước sôi ở 100 độ C.' },
      { sentence: 'I may perhaps be interested in applying for this position.', errorWord: 'may perhaps be', correction: 'am', explanation: 'Thư xin việc cần dứt khoát; rào đón ở đây thành ra nửa vời.', trans: 'Tôi quan tâm đến việc ứng tuyển vị trí này.' },
      { sentence: 'It may possibly perhaps indicate a change in behaviour.', errorWord: 'possibly perhaps', correction: '(bỏ)', explanation: 'Chồng ba lớp rào đón thành ra lảng tránh — dùng một lớp là đủ.', trans: 'Điều đó có thể cho thấy một thay đổi trong hành vi.' },
      { sentence: 'Admittedly the plan is cheap, nevertheless it is also cheap.', errorWord: 'it is also cheap', correction: 'it is unlikely to last', explanation: 'Sau "nevertheless" phải là một ý ĐỐI LẠI, không phải nhắc lại ý vừa nhượng bộ.', trans: 'Phải thừa nhận kế hoạch này rẻ. Tuy vậy, nó khó mà bền.' },
    ],
    transformation: [
      { original: 'This method is the best one available.', instruction: 'Rào đón bằng một trạng từ mức độ.', keyword: 'arguably', a: 'This method is arguably the best one available.' },
      { original: 'Everyone knows that reading improves vocabulary.', instruction: 'Viết lại bằng khung phi cá nhân.', keyword: 'It is widely accepted', a: 'It is widely accepted that reading improves vocabulary.' },
      { original: 'We put off the launch until June.', instruction: 'Viết lại ở mức trang trọng.', keyword: 'postponed', a: 'The launch was postponed until June.' },
      { original: 'The course is expensive. It is still worth taking.', instruction: 'Viết lại bằng khung nhượng bộ rồi phản bác.', keyword: 'Admittedly', a: 'Admittedly, the course is expensive. Nevertheless, it is worth taking.' },
      { original: 'The weather caused the delay.', instruction: 'Rào đón bằng một động từ khuyết thiếu.', keyword: 'may', a: 'The delay may have been caused by the weather.' },
    ],
    matching: [
      {
        pairs: [
          { left: 'suggest / indicate', right: 'rào đón bằng động từ báo cáo' },
          { left: 'arguably / largely', right: 'rào đón bằng trạng từ mức độ' },
          { left: 'It is widely accepted that...', right: 'rào đón bằng khung phi cá nhân' },
          { left: 'Admittedly... Nevertheless...', right: 'khung nhượng bộ rồi phản bác' },
          { left: 'postpone thay cho put off', right: 'nâng mức trang trọng' },
          { left: 'Hạn nộp là thứ Sáu.', right: 'chỗ KHÔNG được rào đón' },
        ],
      },
    ],
    trueFalse: [
      { sentence: 'The study proves that all learners benefit from this method.', isCorrect: false, correction: 'The study suggests that learners may benefit from this method.', explanation: 'Một nghiên cứu đơn lẻ không "chứng minh" cho MỌI người học — mức khẳng định vượt quá bằng chứng.', trans: 'Nghiên cứu cho thấy người học có thể hưởng lợi từ phương pháp này.' },
      { sentence: 'It may possibly perhaps indicate a change in behaviour.', isCorrect: false, correction: 'It may indicate a change in behaviour.', explanation: 'Chồng ba lớp rào đón thành ra lảng tránh — một lớp là đủ.', trans: 'Điều đó có thể cho thấy một thay đổi trong hành vi.' },
      { sentence: 'Admittedly, the method is slow. Nevertheless, it is accurate.', isCorrect: true, explanation: 'Nhượng bộ thật rồi mới phản bác — đúng khung lập luận bậc C1.', trans: 'Phải thừa nhận cách làm này chậm. Tuy vậy, nó chính xác.' },
      { sentence: 'Water might possibly boil at approximately one hundred degrees.', isCorrect: false, correction: 'Water boils at one hundred degrees Celsius.', explanation: 'Không rào đón một sự thật đã biết chắc — làm vậy chỉ khiến câu nghe thiếu tự tin.', trans: 'Nước sôi ở 100 độ C.' },
      { sentence: 'There is some evidence that shorter sessions work better.', isCorrect: true, explanation: 'Rào đón đúng mức: nêu có bằng chứng, không nói bằng chứng đã đầy đủ.', trans: 'Có phần nào bằng chứng cho thấy buổi học ngắn hơn thì hiệu quả hơn.' },
    ],
  },
];
