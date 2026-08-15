// File: src/data/foundationData.js
// CỤM NỀN TẢNG A0 — "MẤT GỐC THẬT" (KE_HOACH_B2.md việc 1.1).
//
// Vì sao phải có: rà soát 2026-08-14 cho thấy toàn bộ kho KHÔNG có một chủ đề
// nào về bảng chữ cái, phát âm, hay cách đọc IPA — trong khi mọi mục từ trong
// app đều kèm phiên âm IPA. Người Việt mất gốc mở app lên là gặp ngay ký hiệu
// /ˈsɪmptəm/ mà chưa từng được dạy đọc nó.
//
// Dùng ĐÚNG hình dạng của một chủ đề ngữ pháp (`theory` + `exercises`) để tái
// dùng nguyên GrammarPage và 7 bài tập đã có cổng chấm điểm — không thêm màn
// hình mới, không thêm đường code chưa được kiểm.
//
// Nội dung soạn tay. Mọi câu hỏi đều trả lời được TỪ CHÍNH PHẦN LÝ THUYẾT ở
// trên nó, và chỉ có một đáp án đúng.

const C = 'bg-lime-200';

export const foundationData = [
  {
    id: 'a0_01',
    title: '1. Bảng Chữ Cái Tiếng Anh (The Alphabet)',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. 26 chữ cái — TÊN CHỮ khác ÂM CHỮ',
        c: '👉 Tiếng Anh có 26 chữ cái, giống bảng chữ Latin nhưng KHÔNG có dấu (không ă, â, ê, ô, ơ, ư, đ).\n👉 Điều quan trọng nhất phải hiểu ngay: mỗi chữ có TÊN GỌI và có ÂM khi đứng trong từ, và hai thứ đó KHÁC NHAU.\n→ Chữ "B" tên là /biː/ (bi), nhưng trong từ "book" nó phát ra âm /b/ (bờ).\n→ Chữ "H" tên là /eɪtʃ/ (ết-chờ), nhưng trong "hat" nó phát ra âm /h/.\n⚠️ Rất nhiều người Việt học sai vì đọc từ bằng TÊN CHỮ. Tên chữ chỉ dùng khi đánh vần tên riêng hoặc đọc từ viết tắt (VIP, USA).'
      },
      {
        h: 'II. Tên gọi 26 chữ cái',
        c: 'A /eɪ/ · B /biː/ · C /siː/ · D /diː/ · E /iː/ · F /ef/ · G /dʒiː/\nH /eɪtʃ/ · I /aɪ/ · J /dʒeɪ/ · K /keɪ/ · L /el/ · M /em/ · N /en/\nO /əʊ/ · P /piː/ · Q /kjuː/ · R /ɑː/ · S /es/ · T /tiː/ · U /juː/\nV /viː/ · W /ˈdʌbəl.juː/ · X /eks/ · Y /waɪ/ · Z /zed/ (Anh-Anh) hoặc /ziː/ (Anh-Mỹ)\n📌 Bốn chữ người Việt hay đọc sai nhất: G (không phải "gờ" mà là /dʒiː/), J (/dʒeɪ/), R (/ɑː/, không phải "rờ"), W (/ˈdʌbəl.juː/, ba âm tiết).'
      },
      {
        h: 'III. 5 nguyên âm và 21 phụ âm',
        c: '👉 NGUYÊN ÂM (vowels): A, E, I, O, U — và Y đôi khi đóng vai nguyên âm (my, happy).\n👉 PHỤ ÂM (consonants): 21 chữ còn lại.\n📌 Mỗi từ tiếng Anh đều phải có ít nhất một âm nguyên âm. Đây là lý do "strength" dù trông toàn phụ âm vẫn có nguyên âm /e/ ở giữa.'
      },
      {
        h: 'IV. Chữ hoa dùng khi nào',
        c: '✅ Chữ đầu câu: The book is new.\n✅ Tên riêng: Hanoi, Mary, Vietnam.\n✅ Đại từ "I" — LUÔN viết hoa dù đứng giữa câu: My friend and I went home.\n✅ Thứ, tháng, quốc tịch, ngôn ngữ: Monday, July, Vietnamese, English.\n❌ KHÁC tiếng Việt: tên môn học thường, mùa trong năm KHÔNG viết hoa: math, summer.'
      },
    ],
    exercises: [
      { id: 1, q: 'Chữ "G" đọc tên là gì?', opts: ['/dʒiː/', '/ɡiː/', '/ʒiː/', '/dʒeɪ/'], a: '/dʒiː/' },
      { id: 2, q: 'Chữ "J" đọc tên là gì?', opts: ['/dʒeɪ/', '/jeɪ/', '/dʒiː/', '/aɪ/'], a: '/dʒeɪ/' },
      { id: 3, q: 'Chữ "R" đọc tên là gì?', opts: ['/ɑː/', '/rə/', '/er/', '/ɜːr/'], a: '/ɑː/' },
      { id: 4, q: 'Chữ "W" có mấy âm tiết khi đọc tên?', opts: ['3', '1', '2', '4'], a: '3' },
      { id: 5, q: 'Trong từ "book", chữ B phát ra cái gì?', opts: ['âm /b/', 'tên chữ /biː/', 'âm /p/', 'không phát ra gì'], a: 'âm /b/' },
      { id: 6, q: 'Chữ nào sau đây là nguyên âm?', opts: ['U', 'W', 'R', 'N'], a: 'U' },
      { id: 7, q: 'Tiếng Anh có bao nhiêu chữ cái?', opts: ['26', '24', '29', '28'], a: '26' },
      { id: 8, q: 'Câu nào viết hoa ĐÚNG?', opts: ['My friend and I study English.', 'my friend and i study english.', 'My Friend and i study English.', 'my friend and I study english.'], a: 'My friend and I study English.' },
      { id: 9, q: 'Từ nào sau đây KHÔNG cần viết hoa trong tiếng Anh?', opts: ['summer', 'Monday', 'Vietnam', 'English'], a: 'summer' },
      { id: 10, q: 'Đại từ "tôi" trong tiếng Anh viết thế nào khi đứng giữa câu?', opts: ['I', 'i', 'ai', 'I hoặc i đều được'], a: 'I' },
      { id: 11, q: 'Tên chữ dùng để làm gì?', opts: ['Đánh vần tên riêng và đọc từ viết tắt', 'Đọc mọi từ trong câu', 'Chỉ dùng khi hát', 'Không dùng để làm gì'], a: 'Đánh vần tên riêng và đọc từ viết tắt' },
      { id: 12, q: 'Chữ "Z" trong tiếng Anh-Anh đọc là?', opts: ['/zed/', '/ziː/', '/zet/', '/zɑː/'], a: '/zed/' },
    ],
  },

  {
    id: 'a0_02',
    title: '2. Đọc Ký Hiệu Phiên Âm IPA',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. IPA là gì và vì sao bắt buộc phải biết',
        c: '👉 IPA (International Phonetic Alphabet) là bộ ký hiệu ghi ÂM THẬT của từ, đặt trong hai gạch chéo: /buk/.\n👉 Vì sao cần: chính tả tiếng Anh không đáng tin. Cùng chữ "ough" mà đọc 5 kiểu khác nhau — though /ðəʊ/, through /θruː/, tough /tʌf/, cough /kɒf/, thought /θɔːt/.\n👉 Không đọc được IPA thì mở từ điển ra cũng không biết từ đó đọc thế nào — chỉ còn cách đoán, và đoán theo tiếng Việt thì gần như luôn sai.\n📌 Mọi mục từ trong ứng dụng này đều có IPA. Học xong bài này bạn dùng được cả kho.'
      },
      {
        h: 'II. Ba thứ luôn có trong một phiên âm',
        c: '1️⃣ HAI GẠCH CHÉO bao ngoài: /ˈwɔːtə/ — mọi thứ bên trong là âm, không phải chữ.\n2️⃣ DẤU NHÁY TRÊN ˈ đứng TRƯỚC âm tiết mang trọng âm: /ˈwɔːtə/ → nhấn vào "wɔː".\n3️⃣ DẤU HAI CHẤM ː nghĩa là ÂM DÀI: /iː/ dài hơn /ɪ/, /uː/ dài hơn /ʊ/.\n📌 Có khi thấy dấu nháy dưới ˌ — đó là trọng âm phụ, nhấn nhẹ hơn: /ˌæbsəˈluːtli/.'
      },
      {
        h: 'III. Những ký hiệu KHÔNG giống chữ cái — nhớ mặt ngay',
        c: 'θ  → âm "th" thổi hơi, không rung: think /θɪŋk/\nð  → âm "th" rung: this /ðɪs/\nʃ  → âm "s" tròn môi: she /ʃiː/\nʒ  → âm "d" mềm: vision /ˈvɪʒən/\ntʃ → âm "ch": chair /tʃeə/\ndʒ → âm "j": job /dʒɒb/\nŋ  → âm "ng" cuối: sing /sɪŋ/\nə  → âm "ơ" nhẹ nhất (schwa): about /əˈbaʊt/\nʌ  → âm "â" ngắn: cup /kʌp/\nɜː → âm "ơ" dài: bird /bɜːd/'
      },
      {
        h: 'IV. Schwa /ə/ — âm phổ biến nhất tiếng Anh',
        c: '👉 /ə/ là âm "ơ" rất nhẹ, luôn nằm ở âm tiết KHÔNG mang trọng âm.\n→ banana /bəˈnɑːnə/ — chữ "a" đầu và cuối đều thành /ə/.\n→ teacher /ˈtiːtʃə/ — đuôi "er" thành /ə/.\n⚠️ Lỗi phổ biến của người Việt: đọc rõ mọi âm tiết như nhau. Tiếng Anh thì ngược lại — âm tiết không mang trọng âm bị nuốt thành /ə/. Đọc rõ hết là nghe rất "cứng".'
      },
    ],
    exercises: [
      { id: 1, q: 'Dấu ˈ trong phiên âm /ˈwɔːtə/ có nghĩa gì?', opts: ['Âm tiết ngay sau nó mang trọng âm', 'Âm tiết ngay trước nó mang trọng âm', 'Đọc to cả từ', 'Ngắt hơi ở đó'], a: 'Âm tiết ngay sau nó mang trọng âm' },
      { id: 2, q: 'Dấu ː trong /iː/ nghĩa là gì?', opts: ['Âm đó kéo dài', 'Âm đó đọc to', 'Âm đó bị câm', 'Ngắt câu'], a: 'Âm đó kéo dài' },
      { id: 3, q: 'Ký hiệu θ là âm nào?', opts: ['âm "th" thổi hơi, không rung (think)', 'âm "th" rung (this)', 'âm "s"', 'âm "f"'], a: 'âm "th" thổi hơi, không rung (think)' },
      { id: 4, q: 'Ký hiệu ð là âm nào?', opts: ['âm "th" rung (this)', 'âm "th" thổi hơi (think)', 'âm "d"', 'âm "z"'], a: 'âm "th" rung (this)' },
      { id: 5, q: 'Ký hiệu ŋ xuất hiện ở cuối từ nào?', opts: ['sing', 'sin', 'sim', 'sit'], a: 'sing' },
      { id: 6, q: 'Âm /ə/ (schwa) luôn nằm ở đâu?', opts: ['Âm tiết KHÔNG mang trọng âm', 'Âm tiết mang trọng âm', 'Luôn ở đầu từ', 'Luôn ở cuối từ'], a: 'Âm tiết KHÔNG mang trọng âm' },
      { id: 7, q: 'Ký hiệu ʃ là âm trong từ nào?', opts: ['she', 'see', 'chair', 'job'], a: 'she' },
      { id: 8, q: 'Ký hiệu dʒ là âm trong từ nào?', opts: ['job', 'chair', 'yes', 'zoo'], a: 'job' },
      { id: 9, q: 'Vì sao không thể đoán cách đọc từ chính tả tiếng Anh?', opts: ['Cùng một cụm chữ có thể đọc nhiều kiểu khác nhau', 'Vì tiếng Anh không có quy tắc nào cả', 'Vì từ điển ghi sai', 'Vì tiếng Anh chỉ dùng để viết'], a: 'Cùng một cụm chữ có thể đọc nhiều kiểu khác nhau' },
      { id: 10, q: 'Trong "teacher" /ˈtiːtʃə/, đuôi "er" phát ra âm gì?', opts: ['/ə/', '/e/', '/ɜː/', '/ər/ đọc rõ chữ r'], a: '/ə/' },
      { id: 11, q: 'Dấu ˌ (nháy dưới) nghĩa là gì?', opts: ['Trọng âm phụ, nhấn nhẹ hơn', 'Trọng âm chính', 'Âm câm', 'Nối âm'], a: 'Trọng âm phụ, nhấn nhẹ hơn' },
      { id: 12, q: 'Lỗi phát âm phổ biến của người Việt là gì?', opts: ['Đọc rõ đều mọi âm tiết thay vì nuốt âm không trọng âm', 'Nói quá nhanh', 'Không mở miệng', 'Đọc quá nhiều schwa'], a: 'Đọc rõ đều mọi âm tiết thay vì nuốt âm không trọng âm' },
    ],
  },

  {
    id: 'a0_03',
    title: '3. Nguyên Âm Ngắn (Short Vowels)',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Sáu nguyên âm ngắn',
        c: '/ɪ/ — sit /sɪt/, big /bɪɡ/, this /ðɪs/\n/e/ — bed /bed/, ten /ten/, said /sed/\n/æ/ — cat /kæt/, bad /bæd/, man /mæn/\n/ʌ/ — cup /kʌp/, but /bʌt/, love /lʌv/\n/ʊ/ — book /bʊk/, good /ɡʊd/, put /pʊt/\n/ɒ/ — hot /hɒt/, dog /dɒɡ/, want /wɒnt/\n📌 "Ngắn" ở đây là ngắn thật — bật ra rồi dứt ngay, không kéo.'
      },
      {
        h: 'II. /æ/ — âm khó nhất với người Việt',
        c: '👉 /æ/ KHÔNG phải "e", cũng KHÔNG phải "a". Nó nằm giữa: miệng mở rộng sang hai bên như đang cười, lưỡi hạ thấp.\n→ cat /kæt/ — nếu đọc thành "két" là sai, thành "cát" cũng sai.\n⚠️ Cặp dễ nhầm: bad /bæd/ ≠ bed /bed/ · man /mæn/ ≠ men /men/ · sat /sæt/ ≠ set /set/.\n📌 Mẹo: đọc "e" rồi từ từ hạ hàm dưới xuống — chỗ nào nghe "bẹt" ra là /æ/.'
      },
      {
        h: 'III. /ɪ/ ngắn ≠ /iː/ dài — cặp gây hiểu nhầm nhiều nhất',
        c: '→ ship /ʃɪp/ (con tàu) ≠ sheep /ʃiːp/ (con cừu)\n→ live /lɪv/ (sống) ≠ leave /liːv/ (rời đi)\n→ bit /bɪt/ (một chút) ≠ beat /biːt/ (đánh)\n👉 /ɪ/ đọc nhanh, môi thả lỏng, gần như "i" pha "ê".\n👉 /iː/ kéo dài, môi kéo căng sang hai bên như cười.\n⚠️ Nói "I want to live" mà đọc /liːv/ thành ra "tôi muốn rời đi" — nghĩa ngược hẳn.'
      },
      {
        h: 'IV. /ʌ/ và /ɒ/',
        c: '👉 /ʌ/ giống "â" tiếng Việt trong "cân", ngắn và gọn: cup /kʌp/, sun /sʌn/, money /ˈmʌni/.\n👉 /ɒ/ giống "o" tiếng Việt nhưng tròn môi hơn và ngắn: hot /hɒt/, box /bɒks/.\n⚠️ Cặp dễ nhầm: cup /kʌp/ ≠ cop /kɒp/ · nut /nʌt/ ≠ not /nɒt/.\n📌 Chú ý: chữ "o" trong "love, money, come, some" lại đọc /ʌ/ chứ không phải /ɒ/ — phải tra từ điển, không đoán theo chữ.'
      },
    ],
    exercises: [
      { id: 1, q: 'Từ nào chứa âm /æ/?', opts: ['cat', 'cut', 'cot', 'coat'], a: 'cat' },
      { id: 2, q: 'Từ nào chứa âm /ʌ/?', opts: ['cup', 'cap', 'cop', 'keep'], a: 'cup' },
      { id: 3, q: '"Con cừu" (sheep) chứa âm nào?', opts: ['/iː/', '/ɪ/', '/e/', '/æ/'], a: '/iː/' },
      { id: 4, q: '"Con tàu" (ship) chứa âm nào?', opts: ['/ɪ/', '/iː/', '/e/', '/aɪ/'], a: '/ɪ/' },
      { id: 5, q: 'Cặp từ nào KHÁC nhau ở âm /æ/ và /e/?', opts: ['bad – bed', 'bit – beat', 'cup – cop', 'book – boot'], a: 'bad – bed' },
      { id: 6, q: 'Chữ "o" trong "love" đọc là âm gì?', opts: ['/ʌ/', '/ɒ/', '/əʊ/', '/uː/'], a: '/ʌ/' },
      { id: 7, q: 'Từ nào chứa âm /ʊ/ (ngắn)?', opts: ['book', 'boot', 'boat', 'but'], a: 'book' },
      { id: 8, q: 'Miệng ở tư thế nào khi đọc /æ/?', opts: ['Mở rộng sang hai bên, hàm hạ thấp', 'Tròn môi', 'Môi khép nhẹ', 'Lưỡi cong lên vòm'], a: 'Mở rộng sang hai bên, hàm hạ thấp' },
      { id: 9, q: 'Nói "I want to live here" mà đọc "live" thành /liːv/ thì nghĩa thành gì?', opts: ['Tôi muốn RỜI ĐI khỏi đây', 'Tôi muốn sống ở đây', 'Tôi thích nơi này', 'Câu không đổi nghĩa'], a: 'Tôi muốn RỜI ĐI khỏi đây' },
      { id: 10, q: 'Từ nào chứa âm /ɒ/?', opts: ['hot', 'hut', 'hat', 'heat'], a: 'hot' },
      { id: 11, q: 'Từ nào chứa âm /e/?', opts: ['bed', 'bad', 'bird', 'bead'], a: 'bed' },
      { id: 12, q: 'Có tất cả bao nhiêu nguyên âm NGẮN trong bài này?', opts: ['6', '5', '7', '8'], a: '6' },
    ],
  },

  {
    id: 'a0_04',
    title: '4. Nguyên Âm Dài & Nguyên Âm Đôi',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Năm nguyên âm dài — nhận ra bằng dấu ː',
        c: '/iː/ — see /siː/, eat /iːt/, need /niːd/\n/ɑː/ — car /kɑː/, father /ˈfɑːðə/, hard /hɑːd/\n/ɔː/ — door /dɔː/, four /fɔː/, talk /tɔːk/\n/uː/ — food /fuːd/, blue /bluː/, two /tuː/\n/ɜː/ — bird /bɜːd/, work /wɜːk/, learn /lɜːn/\n📌 Dài không có nghĩa là đọc to — chỉ là giữ âm lâu hơn.'
      },
      {
        h: 'II. /ɜː/ — âm mà tiếng Việt không có',
        c: '👉 /ɜː/ là âm "ơ" DÀI, lưỡi ở giữa khoang miệng, môi thả lỏng, không tròn.\n→ bird /bɜːd/, girl /ɡɜːl/, nurse /nɜːs/, turn /tɜːn/, world /wɜːld/.\n⚠️ Chữ viết rất đa dạng nhưng cùng một âm: ir (bird), er (her), ur (turn), or sau w (work), ear (learn).\n⚠️ Người Việt hay thêm âm "r" rõ vào cuối — giọng Anh-Anh KHÔNG đọc "r" đó.'
      },
      {
        h: 'III. Tám nguyên âm đôi — hai âm trượt vào nhau',
        c: '/eɪ/ — day /deɪ/, make /meɪk/, eight /eɪt/\n/aɪ/ — my /maɪ/, time /taɪm/, buy /baɪ/\n/ɔɪ/ — boy /bɔɪ/, coin /kɔɪn/, voice /vɔɪs/\n/əʊ/ — go /ɡəʊ/, home /həʊm/, know /nəʊ/\n/aʊ/ — now /naʊ/, house /haʊs/, out /aʊt/\n/ɪə/ — here /hɪə/, ear /ɪə/, near /nɪə/\n/eə/ — hair /heə/, care /keə/, where /weə/\n/ʊə/ — tour /tʊə/, sure /ʃʊə/\n📌 Nguyên âm đôi = TRƯỢT từ âm này sang âm kia trong một hơi, không phải hai âm tách rời.'
      },
      {
        h: 'IV. Cặp cực dễ nhầm: /əʊ/ và /ɔː/',
        c: '→ coat /kəʊt/ (áo khoác) ≠ caught /kɔːt/ (bắt được)\n→ so /səʊ/ ≠ saw /sɔː/\n→ boat /bəʊt/ ≠ bought /bɔːt/\n👉 /əʊ/ bắt đầu ở "ơ" rồi trượt sang "u" — môi tròn dần lại.\n👉 /ɔː/ giữ nguyên một khẩu hình tròn từ đầu đến cuối, kéo dài.'
      },
    ],
    exercises: [
      { id: 1, q: 'Từ "bird" chứa nguyên âm nào?', opts: ['/ɜː/', '/ɑː/', '/ɔː/', '/e/'], a: '/ɜː/' },
      { id: 2, q: 'Từ nào chứa /uː/?', opts: ['food', 'foot', 'fought', 'fat'], a: 'food' },
      { id: 3, q: '"coat" và "caught" khác nhau ở chỗ nào?', opts: ['coat có /əʊ/, caught có /ɔː/', 'coat có /ɔː/, caught có /əʊ/', 'Hai từ đọc giống hệt nhau', 'Chỉ khác ở phụ âm cuối'], a: 'coat có /əʊ/, caught có /ɔː/' },
      { id: 4, q: 'Nguyên âm đôi nghĩa là gì?', opts: ['Trượt từ âm này sang âm kia trong một hơi', 'Hai âm đọc tách rời nhau', 'Một âm đọc hai lần', 'Âm đọc to gấp đôi'], a: 'Trượt từ âm này sang âm kia trong một hơi' },
      { id: 5, q: 'Từ "boy" chứa nguyên âm đôi nào?', opts: ['/ɔɪ/', '/aɪ/', '/əʊ/', '/aʊ/'], a: '/ɔɪ/' },
      { id: 6, q: 'Từ "house" chứa nguyên âm đôi nào?', opts: ['/aʊ/', '/əʊ/', '/aɪ/', '/ʊə/'], a: '/aʊ/' },
      { id: 7, q: 'Nhóm chữ viết nào cùng cho âm /ɜː/?', opts: ['ir, er, ur, ear', 'ee, ea, ie', 'oo, ou, ow', 'ai, ay, ei'], a: 'ir, er, ur, ear' },
      { id: 8, q: '"Dài" trong nguyên âm dài nghĩa là gì?', opts: ['Giữ âm lâu hơn', 'Đọc to hơn', 'Đọc cao giọng hơn', 'Thêm một âm nữa vào sau'], a: 'Giữ âm lâu hơn' },
      { id: 9, q: 'Từ "hair" chứa nguyên âm đôi nào?', opts: ['/eə/', '/ɪə/', '/eɪ/', '/ʊə/'], a: '/eə/' },
      { id: 10, q: 'Từ "go" chứa nguyên âm nào?', opts: ['/əʊ/', '/ɔː/', '/ɒ/', '/uː/'], a: '/əʊ/' },
      { id: 11, q: 'Từ "car" trong tiếng Anh-Anh chứa nguyên âm nào?', opts: ['/ɑː/', '/æ/', '/ɜː/', '/ɔː/'], a: '/ɑː/' },
      { id: 12, q: 'Bài này giới thiệu bao nhiêu nguyên âm đôi?', opts: ['8', '5', '6', '10'], a: '8' },
    ],
  },

  {
    id: 'a0_05',
    title: '5. Âm /θ/ và /ð/ — Hai Âm "TH"',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Tiếng Việt không có hai âm này',
        c: '👉 Cả /θ/ và /ð/ đều đặt ĐẦU LƯỠI GIỮA HAI HÀM RĂNG rồi thổi hơi ra. Không có âm nào trong tiếng Việt làm như vậy.\n👉 Khác nhau duy nhất: /θ/ KHÔNG rung cổ họng, /ð/ CÓ rung.\n📌 Cách tự kiểm: đặt tay lên cổ họng. Đọc "think" — không thấy rung. Đọc "this" — thấy rung.'
      },
      {
        h: 'II. /θ/ — không rung',
        c: 'think /θɪŋk/ · thank /θæŋk/ · three /θriː/ · thin /θɪn/\nmouth /maʊθ/ · month /mʌnθ/ · both /bəʊθ/ · health /helθ/\nnothing /ˈnʌθɪŋ/ · birthday /ˈbɜːθdeɪ/\n📌 Thường gặp ở: từ để hỏi/đếm (three, thirty, thousand), danh từ trừu tượng (truth, health).'
      },
      {
        h: 'III. /ð/ — có rung',
        c: 'this /ðɪs/ · that /ðæt/ · these /ðiːz/ · those /ðəʊz/\nthe /ðə/ · they /ðeɪ/ · there /ðeə/ · then /ðen/\nmother /ˈmʌðə/ · father /ˈfɑːðə/ · brother /ˈbrʌðə/ · weather /ˈweðə/\n📌 Mẹo rất hữu ích: hầu hết TỪ CHỨC NĂNG bắt đầu bằng "th" (the, this, that, they, them, there, then, than) đều là /ð/ có rung.'
      },
      {
        h: 'IV. Ba lỗi thay thế phổ biến — và vì sao phải sửa',
        c: '❌ Đọc /θ/ thành /t/: think → "tink", three → "tree"\n❌ Đọc /θ/ thành /s/: think → "sink", thing → "sing"\n❌ Đọc /ð/ thành /d/ hoặc /z/: this → "dis", they → "day"\n⚠️ Đây không phải chuyện "giọng chưa hay" — nó đổi nghĩa: think ≠ sink (chìm), three ≠ tree (cái cây), thing ≠ sing (hát).\n📌 Chịu khó thè đầu lưỡi ra một chút trong 2 tuần đầu, sau đó thành phản xạ.'
      },
    ],
    exercises: [
      { id: 1, q: 'Vị trí lưỡi khi phát âm /θ/ và /ð/?', opts: ['Đầu lưỡi giữa hai hàm răng', 'Lưỡi cong lên vòm miệng', 'Lưỡi chạm răng dưới', 'Lưỡi thu về sau'], a: 'Đầu lưỡi giữa hai hàm răng' },
      { id: 2, q: '/θ/ và /ð/ khác nhau ở điểm nào?', opts: ['/θ/ không rung cổ họng, /ð/ có rung', '/θ/ có rung, /ð/ không rung', 'Khác vị trí lưỡi', 'Khác độ dài âm'], a: '/θ/ không rung cổ họng, /ð/ có rung' },
      { id: 3, q: 'Từ "this" bắt đầu bằng âm nào?', opts: ['/ð/', '/θ/', '/d/', '/z/'], a: '/ð/' },
      { id: 4, q: 'Từ "think" bắt đầu bằng âm nào?', opts: ['/θ/', '/ð/', '/t/', '/s/'], a: '/θ/' },
      { id: 5, q: 'Đọc "think" thành "sink" thì nghĩa thành gì?', opts: ['chìm', 'nghĩ', 'hát', 'cái cây'], a: 'chìm' },
      { id: 6, q: 'Đọc "three" thành "tree" thì nghĩa thành gì?', opts: ['cái cây', 'số ba', 'sự thật', 'ba mươi'], a: 'cái cây' },
      { id: 7, q: 'Từ nào chứa âm /ð/?', opts: ['mother', 'month', 'mouth', 'math'], a: 'mother' },
      { id: 8, q: 'Từ nào chứa âm /θ/?', opts: ['health', 'weather', 'these', 'brother'], a: 'health' },
      { id: 9, q: 'Cách tự kiểm mình đọc đúng /ð/ chưa?', opts: ['Đặt tay lên cổ họng xem có rung không', 'Nghe xem có to không', 'Xem lưỡi có chạm răng dưới không', 'Đếm số hơi thở'], a: 'Đặt tay lên cổ họng xem có rung không' },
      { id: 10, q: 'Từ chức năng bắt đầu bằng "th" (the, they, that) thường là âm nào?', opts: ['/ð/ có rung', '/θ/ không rung', 'Lúc này lúc kia', '/d/'], a: '/ð/ có rung' },
      { id: 11, q: 'Từ "birthday" chứa âm "th" nào?', opts: ['/θ/', '/ð/', '/t/', 'âm câm'], a: '/θ/' },
      { id: 12, q: 'Vì sao phải sửa lỗi đọc "th" thành "t" hoặc "s"?', opts: ['Vì nó làm đổi nghĩa của từ', 'Vì nghe không sang', 'Vì thi mới cần', 'Không cần sửa cũng được'], a: 'Vì nó làm đổi nghĩa của từ' },
    ],
  },

  {
    id: 'a0_06',
    title: '6. Âm Cuối — Thói Quen Nuốt Âm Của Người Việt',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Vì sao người Việt hay nuốt âm cuối',
        c: '👉 Tiếng Việt không bật hơi ở phụ âm cuối: "mát", "sách", "bốp" — âm cuối chỉ khép miệng lại, không phát ra.\n👉 Tiếng Anh thì BẮT BUỘC phát ra âm cuối. Không phát ra thì người nghe mất thông tin ngữ pháp.\n⚠️ Hậu quả cụ thể: "He works here" đọc thành "He work here" → mất luôn dấu hiệu ngôi thứ ba. "I walked" thành "I walk" → mất luôn thì quá khứ.'
      },
      {
        h: 'II. Âm cuối mang thông tin ngữ pháp',
        c: '📌 -s / -es → số nhiều hoặc ngôi thứ ba: books, works, boxes.\n📌 -ed → thì quá khứ: walked, played, wanted.\n📌 -\'s → sở hữu: Nam\'s book.\n👉 Ba đuôi này chính là chỗ người Việt hay bỏ nhất, và cũng chính là chỗ người nghe dựa vào để hiểu câu.'
      },
      {
        h: 'III. Cặp từ chỉ khác nhau ở âm cuối',
        c: '→ car /kɑː/ ≠ card /kɑːd/\n→ why /waɪ/ ≠ wife /waɪf/ ≠ wine /waɪn/ ≠ wide /waɪd/\n→ bee /biː/ ≠ beat /biːt/ ≠ beach /biːtʃ/ ≠ bead /biːd/\n→ they /ðeɪ/ ≠ their /ðeə/\n👉 Bỏ âm cuối là bỏ luôn thứ phân biệt các từ này.'
      },
      {
        h: 'IV. Cách luyện',
        c: '1️⃣ Đọc chậm, cố ý kéo dài âm cuối quá mức trong giai đoạn đầu: "boookSSS".\n2️⃣ Đặt tay trước miệng — âm /t/, /k/, /p/ cuối phải thấy hơi bật ra.\n3️⃣ Ghi âm lại rồi nghe: nghe lại chính mình là cách phát hiện nuốt âm nhanh nhất.\n📌 Ứng dụng này có phần Luyện Nói và Nghe Chép Chính Tả — dùng đúng hai phần đó để tự kiểm.'
      },
    ],
    exercises: [
      { id: 1, q: 'Vì sao người Việt hay nuốt âm cuối tiếng Anh?', opts: ['Vì tiếng Việt không bật hơi ở phụ âm cuối', 'Vì tiếng Anh nói quá nhanh', 'Vì âm cuối không quan trọng', 'Vì thiếu từ vựng'], a: 'Vì tiếng Việt không bật hơi ở phụ âm cuối' },
      { id: 2, q: '"He works here" mà bỏ âm /s/ cuối thì mất thông tin gì?', opts: ['Dấu hiệu ngôi thứ ba số ít', 'Dấu hiệu thì quá khứ', 'Dấu hiệu số nhiều của "here"', 'Không mất gì'], a: 'Dấu hiệu ngôi thứ ba số ít' },
      { id: 3, q: '"I walked" mà bỏ âm cuối thì mất thông tin gì?', opts: ['Thì quá khứ', 'Số nhiều', 'Sở hữu', 'Ngôi thứ ba'], a: 'Thì quá khứ' },
      { id: 4, q: 'Cặp từ nào CHỈ khác nhau ở âm cuối?', opts: ['car – card', 'ship – sheep', 'bad – bed', 'cup – cop'], a: 'car – card' },
      { id: 5, q: 'Đuôi -\'s trong "Nam\'s book" mang nghĩa gì?', opts: ['Sở hữu', 'Số nhiều', 'Quá khứ', 'Ngôi thứ ba'], a: 'Sở hữu' },
      { id: 6, q: 'Cách kiểm tra âm /p/, /t/, /k/ cuối đã bật ra chưa?', opts: ['Đặt tay trước miệng xem có hơi bật ra không', 'Đặt tay lên cổ họng', 'Nhìn vào gương', 'Đếm nhịp'], a: 'Đặt tay trước miệng xem có hơi bật ra không' },
      { id: 7, q: 'Ba đuôi nào người Việt hay bỏ nhất?', opts: ['-s, -ed, -\'s', '-ing, -ly, -er', '-tion, -sion, -ment', '-ful, -less, -ness'], a: '-s, -ed, -\'s' },
      { id: 8, q: 'Từ nào KHÁC "why" chỉ ở âm cuối?', opts: ['wife', 'we', 'way', 'woo'], a: 'wife' },
      { id: 9, q: 'Trong giai đoạn mới luyện, nên làm gì với âm cuối?', opts: ['Cố ý kéo dài quá mức rồi giảm dần', 'Bỏ qua cho tự nhiên', 'Đọc thật nhanh', 'Chỉ đọc âm đầu'], a: 'Cố ý kéo dài quá mức rồi giảm dần' },
      { id: 10, q: 'Cách phát hiện mình đang nuốt âm nhanh nhất là gì?', opts: ['Ghi âm lại rồi nghe chính mình', 'Hỏi bạn bè', 'Đọc thầm trong đầu', 'Đọc thật to'], a: 'Ghi âm lại rồi nghe chính mình' },
      { id: 11, q: '"bee", "beat", "beach", "bead" khác nhau ở đâu?', opts: ['Âm cuối', 'Nguyên âm', 'Trọng âm', 'Âm đầu'], a: 'Âm cuối' },
      { id: 12, q: 'Trong tiếng Việt, phụ âm cuối được xử lý thế nào?', opts: ['Chỉ khép miệng, không phát ra hơi', 'Bật hơi mạnh', 'Kéo dài ra', 'Đọc thành nguyên âm'], a: 'Chỉ khép miệng, không phát ra hơi' },
    ],
  },

  {
    id: 'a0_07',
    title: '7. Quy Tắc Đọc Đuôi -S / -ES',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Ba cách đọc, phụ thuộc ÂM đứng trước',
        c: '👉 Đuôi -s/-es có ba cách đọc: /s/, /z/, /ɪz/.\n👉 Quyết định bởi ÂM CUỐI của từ gốc — không phải bởi chữ cái cuối.\n📌 Đây là quy tắc, không phải chuyện học thuộc từng từ. Nắm quy tắc là đọc đúng mọi từ mới.'
      },
      {
        h: 'II. Đọc /ɪz/ — sau 6 âm rít',
        c: '👉 Sau các âm /s/, /z/, /ʃ/, /ʒ/, /tʃ/, /dʒ/ → đọc /ɪz/, thành MỘT ÂM TIẾT MỚI.\n→ buses /ˈbʌsɪz/ · boxes /ˈbɒksɪz/ · watches /ˈwɒtʃɪz/\n→ washes /ˈwɒʃɪz/ · bridges /ˈbrɪdʒɪz/ · roses /ˈrəʊzɪz/\n📌 Mẹo nhớ: sáu âm này đều "rít" hoặc "xì". Nếu thêm /s/ hay /z/ ngay sau chúng thì không nghe ra được, nên phải chèn /ɪ/ vào giữa.'
      },
      {
        h: 'III. Đọc /s/ — sau âm VÔ THANH',
        c: '👉 Sau /p/, /t/, /k/, /f/, /θ/ (âm không rung cổ họng) → đọc /s/.\n→ books /bʊks/ · cats /kæts/ · maps /mæps/\n→ laughs /lɑːfs/ · months /mʌnθs/\n📌 Cách nhớ đơn giản: âm trước không rung thì âm sau cũng không rung.'
      },
      {
        h: 'IV. Đọc /z/ — sau âm HỮU THANH (còn lại)',
        c: '👉 Sau mọi âm còn lại — kể cả nguyên âm → đọc /z/.\n→ dogs /dɒɡz/ · beds /bedz/ · pens /penz/\n→ boys /bɔɪz/ · trees /triːz/ · cars /kɑːz/\n📌 Đây là trường hợp PHỔ BIẾN NHẤT. Không rơi vào nhóm /ɪz/ hay /s/ thì là /z/.\n⚠️ Cẩn thận: chữ "s" nhưng đọc /z/ — "dogs" không đọc "đốc-sờ" mà là /dɒɡz/.'
      },
    ],
    exercises: [
      { id: 1, q: 'Đuôi -es trong "boxes" đọc là gì?', opts: ['/ɪz/', '/s/', '/z/', 'không đọc'], a: '/ɪz/' },
      { id: 2, q: 'Đuôi -s trong "books" đọc là gì?', opts: ['/s/', '/z/', '/ɪz/', '/ʃ/'], a: '/s/' },
      { id: 3, q: 'Đuôi -s trong "dogs" đọc là gì?', opts: ['/z/', '/s/', '/ɪz/', '/dz/'], a: '/z/' },
      { id: 4, q: 'Cách đọc đuôi -s phụ thuộc vào cái gì?', opts: ['Âm cuối của từ gốc', 'Chữ cái cuối của từ gốc', 'Độ dài của từ', 'Trọng âm của từ'], a: 'Âm cuối của từ gốc' },
      { id: 5, q: 'Từ nào có đuôi đọc /ɪz/?', opts: ['watches', 'cats', 'pens', 'maps'], a: 'watches' },
      { id: 6, q: 'Sau âm vô thanh (/p/, /t/, /k/, /f/) thì đuôi -s đọc là?', opts: ['/s/', '/z/', '/ɪz/', '/ts/'], a: '/s/' },
      { id: 7, q: 'Từ nào có đuôi đọc /s/?', opts: ['maps', 'boys', 'roses', 'trees'], a: 'maps' },
      { id: 8, q: 'Vì sao sau các âm rít phải chèn /ɪ/ vào?', opts: ['Vì thêm /s/ hay /z/ ngay sau sẽ không nghe ra được', 'Vì quy tắc chính tả bắt buộc', 'Vì để từ dài hơn', 'Vì trọng âm chuyển chỗ'], a: 'Vì thêm /s/ hay /z/ ngay sau sẽ không nghe ra được' },
      { id: 9, q: 'Đuôi -s sau NGUYÊN ÂM đọc là gì?', opts: ['/z/', '/s/', '/ɪz/', 'không đọc'], a: '/z/' },
      { id: 10, q: 'Trường hợp nào PHỔ BIẾN NHẤT?', opts: ['/z/', '/s/', '/ɪz/', 'Cả ba như nhau'], a: '/z/' },
      { id: 11, q: 'Đuôi -es trong "washes" đọc là gì?', opts: ['/ɪz/', '/s/', '/z/', '/ʃs/'], a: '/ɪz/' },
      { id: 12, q: 'Đuôi -s trong "months" đọc là gì?', opts: ['/s/', '/z/', '/ɪz/', '/θz/'], a: '/s/' },
    ],
  },

  {
    id: 'a0_08',
    title: '8. Quy Tắc Đọc Đuôi -ED',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Ba cách đọc: /ɪd/, /t/, /d/',
        c: '👉 Giống đuôi -s, cách đọc -ed do ÂM CUỐI của từ gốc quyết định.\n👉 Chỉ có MỘT trường hợp -ed tạo thêm âm tiết: khi đọc /ɪd/.\n⚠️ Lỗi rất phổ biến: đọc "walked" thành hai âm tiết "wo-ked". Sai — chỉ có một âm tiết: /wɔːkt/.'
      },
      {
        h: 'II. Đọc /ɪd/ — chỉ sau /t/ và /d/',
        c: '👉 Từ gốc kết thúc bằng âm /t/ hoặc /d/ → đọc /ɪd/, THÊM một âm tiết.\n→ wanted /ˈwɒntɪd/ · needed /ˈniːdɪd/ · started /ˈstɑːtɪd/\n→ decided /dɪˈsaɪdɪd/ · visited /ˈvɪzɪtɪd/ · ended /ˈendɪd/\n📌 Chỉ đúng HAI âm này thôi. Nhớ được hai âm này là xong 1/3 quy tắc.'
      },
      {
        h: 'III. Đọc /t/ — sau âm VÔ THANH',
        c: '👉 Sau /p/, /k/, /f/, /s/, /ʃ/, /tʃ/, /θ/ → đọc /t/, KHÔNG thêm âm tiết.\n→ walked /wɔːkt/ · stopped /stɒpt/ · watched /wɒtʃt/\n→ laughed /lɑːft/ · missed /mɪst/ · washed /wɒʃt/\n📌 Cùng nguyên tắc với đuôi -s: âm trước không rung thì âm sau cũng không rung.'
      },
      {
        h: 'IV. Đọc /d/ — sau âm HỮU THANH (còn lại)',
        c: '👉 Sau mọi âm còn lại, kể cả nguyên âm → đọc /d/, KHÔNG thêm âm tiết.\n→ played /pleɪd/ · loved /lʌvd/ · opened /ˈəʊpənd/\n→ called /kɔːld/ · used /juːzd/ · lived /lɪvd/\n📌 Đây là trường hợp phổ biến nhất.\n⚠️ Một số tính từ đuôi -ed lại luôn đọc /ɪd/ dù không sau /t/, /d/: aged /ˈeɪdʒɪd/, naked /ˈneɪkɪd/, wicked /ˈwɪkɪd/. Đây là ngoại lệ, học riêng.'
      },
    ],
    exercises: [
      { id: 1, q: 'Đuôi -ed trong "wanted" đọc là gì?', opts: ['/ɪd/', '/t/', '/d/', 'không đọc'], a: '/ɪd/' },
      { id: 2, q: 'Đuôi -ed trong "walked" đọc là gì?', opts: ['/t/', '/d/', '/ɪd/', '/kt/'], a: '/t/' },
      { id: 3, q: 'Đuôi -ed trong "played" đọc là gì?', opts: ['/d/', '/t/', '/ɪd/', '/ed/'], a: '/d/' },
      { id: 4, q: 'Khi nào -ed tạo THÊM một âm tiết?', opts: ['Khi đọc /ɪd/', 'Khi đọc /t/', 'Khi đọc /d/', 'Luôn luôn thêm'], a: 'Khi đọc /ɪd/' },
      { id: 5, q: '-ed đọc /ɪd/ khi từ gốc kết thúc bằng âm nào?', opts: ['/t/ hoặc /d/', '/p/ hoặc /k/', '/s/ hoặc /z/', 'nguyên âm'], a: '/t/ hoặc /d/' },
      { id: 6, q: 'Từ nào có -ed đọc /ɪd/?', opts: ['needed', 'stopped', 'loved', 'called'], a: 'needed' },
      { id: 7, q: 'Từ nào có -ed đọc /t/?', opts: ['washed', 'opened', 'visited', 'used'], a: 'washed' },
      { id: 8, q: 'Từ "walked" có mấy âm tiết?', opts: ['1', '2', '3', 'Tùy giọng vùng miền'], a: '1' },
      { id: 9, q: 'Từ nào có -ed đọc /d/?', opts: ['loved', 'watched', 'started', 'missed'], a: 'loved' },
      { id: 10, q: 'Sau NGUYÊN ÂM thì -ed đọc là gì?', opts: ['/d/', '/t/', '/ɪd/', 'không đọc'], a: '/d/' },
      { id: 11, q: 'Tính từ "naked" đọc đuôi -ed thế nào?', opts: ['/ɪd/ — đây là ngoại lệ', '/t/', '/d/', 'không đọc'], a: '/ɪd/ — đây là ngoại lệ' },
      { id: 12, q: 'Cách đọc -ed do cái gì quyết định?', opts: ['Âm cuối của từ gốc', 'Chữ cái cuối của từ gốc', 'Số âm tiết', 'Nghĩa của từ'], a: 'Âm cuối của từ gốc' },
    ],
  },

  {
    id: 'a0_09',
    title: '9. Trọng Âm Từ (Word Stress)',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Trọng âm là gì và vì sao nó quan trọng hơn bạn nghĩ',
        c: '👉 Từ có từ hai âm tiết trở lên thì luôn có MỘT âm tiết được nhấn mạnh: đọc TO hơn, DÀI hơn, CAO giọng hơn.\n👉 Trong phiên âm, dấu ˈ đứng ngay trước âm tiết đó: /ˈtiːtʃə/.\n⚠️ Đặt sai trọng âm khiến người bản ngữ KHÔNG NHẬN RA từ, kể cả khi bạn phát âm từng âm rất chuẩn. Đây là nguyên nhân "nói đúng mà người ta không hiểu" số một.'
      },
      {
        h: 'II. Trọng âm đổi thì NGHĨA đổi',
        c: '📌 Cùng một chữ viết, đổi trọng âm thành từ loại khác:\n→ ˈrecord (n. bản ghi) ≠ reˈcord (v. ghi âm)\n→ ˈpresent (n. món quà) ≠ preˈsent (v. trình bày)\n→ ˈobject (n. đồ vật) ≠ obˈject (v. phản đối)\n→ ˈincrease (n. sự tăng) ≠ inˈcrease (v. tăng lên)\n👉 Quy tắc chung cho cặp này: DANH TỪ nhấn âm đầu, ĐỘNG TỪ nhấn âm sau.'
      },
      {
        h: 'III. Vài quy tắc dùng được ngay',
        c: '📌 Từ 2 âm tiết: phần lớn danh từ và tính từ nhấn âm ĐẦU (ˈtable, ˈhappy, ˈwindow); phần lớn động từ nhấn âm SAU (beˈgin, deˈcide, forˈget).\n📌 Đuôi -tion, -sion, -cian → nhấn âm ngay TRƯỚC đuôi: eduˈcation, deˈcision, muˈsician.\n📌 Đuôi -ity, -ical, -ify, -ical → nhấn âm ngay TRƯỚC đuôi: aˈbility, ˈlogical, ˈclassify.\n📌 Đuôi -ee, -eer, -ese → nhấn CHÍNH đuôi đó: emploˈyee, engiˈneer, Vietnaˈmese.\n📌 Từ ghép danh từ → nhấn phần ĐẦU: ˈbookshop, ˈfootball, ˈclassroom.'
      },
      {
        h: 'IV. Âm tiết không mang trọng âm bị nuốt',
        c: '👉 Đây là mặt còn lại của trọng âm, và là phần người Việt hay bỏ qua.\n→ computer /kəmˈpjuːtə/ — âm tiết 1 và 3 đều nhẹ thành /ə/.\n→ photograph /ˈfəʊtəɡrɑːf/ nhưng photography /fəˈtɒɡrəfi/ — trọng âm chuyển, các âm còn lại đổi theo.\n📌 Nói tiếng Anh mà đọc rõ đều mọi âm tiết thì nghe như đọc từng chữ rời — người nghe phải gắng sức mới hiểu.'
      },
    ],
    exercises: [
      { id: 1, q: 'Trong phiên âm, dấu ˈ đặt ở đâu?', opts: ['Ngay trước âm tiết mang trọng âm', 'Ngay sau âm tiết mang trọng âm', 'Đầu từ', 'Cuối từ'], a: 'Ngay trước âm tiết mang trọng âm' },
      { id: 2, q: '"ˈrecord" (nhấn âm đầu) là từ loại gì?', opts: ['Danh từ — bản ghi', 'Động từ — ghi âm', 'Tính từ', 'Trạng từ'], a: 'Danh từ — bản ghi' },
      { id: 3, q: '"preˈsent" (nhấn âm sau) nghĩa là gì?', opts: ['trình bày (động từ)', 'món quà (danh từ)', 'hiện tại (tính từ)', 'có mặt'], a: 'trình bày (động từ)' },
      { id: 4, q: 'Quy tắc chung cho cặp danh từ/động từ cùng chữ viết?', opts: ['Danh từ nhấn âm đầu, động từ nhấn âm sau', 'Danh từ nhấn âm sau, động từ nhấn âm đầu', 'Cả hai nhấn âm đầu', 'Không có quy tắc'], a: 'Danh từ nhấn âm đầu, động từ nhấn âm sau' },
      { id: 5, q: 'Từ "education" nhấn ở âm tiết nào?', opts: ['ca', 'e', 'du', 'tion'], a: 'ca' },
      { id: 6, q: 'Đuôi -ee, -eer, -ese thì nhấn ở đâu?', opts: ['Chính đuôi đó', 'Âm ngay trước đuôi', 'Âm đầu', 'Âm giữa'], a: 'Chính đuôi đó' },
      { id: 7, q: 'Từ ghép danh từ như "bookshop" nhấn ở đâu?', opts: ['Phần đầu (book)', 'Phần sau (shop)', 'Cả hai như nhau', 'Tùy ngữ cảnh'], a: 'Phần đầu (book)' },
      { id: 8, q: 'Hậu quả của việc đặt sai trọng âm là gì?', opts: ['Người bản ngữ không nhận ra từ dù bạn đọc chuẩn từng âm', 'Chỉ nghe hơi lạ nhưng vẫn hiểu', 'Không có hậu quả gì', 'Câu bị sai ngữ pháp'], a: 'Người bản ngữ không nhận ra từ dù bạn đọc chuẩn từng âm' },
      { id: 9, q: 'Âm tiết KHÔNG mang trọng âm thường bị đọc thành âm gì?', opts: ['/ə/ (schwa)', '/iː/', '/æ/', 'Giữ nguyên như khi nhấn'], a: '/ə/ (schwa)' },
      { id: 10, q: 'Phần lớn động từ 2 âm tiết nhấn ở đâu?', opts: ['Âm tiết sau (beˈgin, deˈcide)', 'Âm tiết đầu', 'Cả hai', 'Không nhấn âm nào'], a: 'Âm tiết sau (beˈgin, deˈcide)' },
      { id: 11, q: 'Đuôi -tion thì trọng âm rơi vào đâu?', opts: ['Âm tiết ngay trước đuôi', 'Chính đuôi -tion', 'Âm tiết đầu tiên', 'Âm tiết cuối cùng'], a: 'Âm tiết ngay trước đuôi' },
      { id: 12, q: 'Âm tiết mang trọng âm được đọc thế nào?', opts: ['To hơn, dài hơn, cao giọng hơn', 'Chỉ to hơn', 'Chỉ dài hơn', 'Nhỏ và nhanh hơn'], a: 'To hơn, dài hơn, cao giọng hơn' },
    ],
  },

  {
    id: 'a0_10',
    title: '10. Nhịp Câu & Ngữ Điệu (Rhythm & Intonation)',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Tiếng Anh tính nhịp theo TRỌNG ÂM, tiếng Việt theo ÂM TIẾT',
        c: '👉 Tiếng Việt: mỗi âm tiết chiếm gần như cùng một khoảng thời gian. "Tôi đi học mỗi ngày" — sáu tiếng, sáu nhịp đều.\n👉 Tiếng Anh: chỉ các từ MANG NGHĨA được nhấn, và khoảng cách giữa hai nhịp nhấn gần như bằng nhau — bất kể có bao nhiêu từ nhỏ chen giữa.\n📌 Đây là khác biệt gốc rễ, và là lý do người Việt nghe tiếng Anh thấy "nói nhanh quá": thực ra người ta không nói nhanh, họ NUỐT phần không nhấn.'
      },
      {
        h: 'II. Từ nào được nhấn trong câu',
        c: '✅ NHẤN (từ mang nghĩa): danh từ, động từ chính, tính từ, trạng từ, từ để hỏi.\n❌ KHÔNG NHẤN (từ chức năng): a, an, the, of, to, for, and, but, is, are, was, can, will, đại từ (he, she, it, them).\n📌 Ví dụ: "I WANT to BUY a BOOK for my BROther." — bốn chỗ nhấn, phần còn lại lướt qua.'
      },
      {
        h: 'III. Dạng yếu (weak forms) của từ chức năng',
        c: '👉 Khi không được nhấn, từ chức năng đổi cách đọc:\n→ to /tuː/ → /tə/ · for /fɔː/ → /fə/ · of /ɒv/ → /əv/\n→ and /ænd/ → /ən/ · can /kæn/ → /kən/ · are /ɑː/ → /ə/\n📌 "Fish and chips" nghe như "fish ən chips". Không biết dạng yếu thì nghe mãi không ra, vì bạn đang chờ nghe /ænd/ mà nó không bao giờ tới.'
      },
      {
        h: 'IV. Ngữ điệu lên và xuống',
        c: '↘️ XUỐNG giọng cuối câu: câu kể, câu hỏi có từ để hỏi (Wh-).\n→ I live in Hanoi. ↘  ·  Where do you live? ↘\n↗️ LÊN giọng cuối câu: câu hỏi Yes/No, câu hỏi đuôi để xác nhận, câu chưa nói hết.\n→ Do you like coffee? ↗  ·  You are Nam, aren\'t you? ↗\n📌 Cùng một câu, đổi ngữ điệu là đổi ý: "Really." ↘ (à ra vậy) khác "Really?" ↗ (thật á?).'
      },
    ],
    exercises: [
      { id: 1, q: 'Tiếng Anh tính nhịp theo cái gì?', opts: ['Theo trọng âm', 'Theo âm tiết', 'Theo số từ', 'Theo dấu câu'], a: 'Theo trọng âm' },
      { id: 2, q: 'Vì sao người Việt nghe tiếng Anh thấy "nói nhanh quá"?', opts: ['Vì phần không nhấn bị nuốt đi', 'Vì người bản ngữ nói nhanh thật', 'Vì thiếu từ vựng', 'Vì âm thanh nhỏ'], a: 'Vì phần không nhấn bị nuốt đi' },
      { id: 3, q: 'Từ loại nào KHÔNG được nhấn trong câu?', opts: ['Mạo từ, giới từ, đại từ', 'Danh từ', 'Động từ chính', 'Tính từ'], a: 'Mạo từ, giới từ, đại từ' },
      { id: 4, q: 'Từ "and" khi không được nhấn đọc thành gì?', opts: ['/ən/', '/ænd/', '/end/', '/ɑːnd/'], a: '/ən/' },
      { id: 5, q: 'Từ "to" ở dạng yếu đọc thành gì?', opts: ['/tə/', '/tuː/', '/tɒ/', '/tɜː/'], a: '/tə/' },
      { id: 6, q: 'Câu hỏi Yes/No thì ngữ điệu cuối câu thế nào?', opts: ['Lên giọng ↗', 'Xuống giọng ↘', 'Giữ nguyên', 'Tùy người nói'], a: 'Lên giọng ↗' },
      { id: 7, q: 'Câu hỏi bắt đầu bằng "Where", "What" thì ngữ điệu cuối câu thế nào?', opts: ['Xuống giọng ↘', 'Lên giọng ↗', 'Lên rồi xuống', 'Không có ngữ điệu'], a: 'Xuống giọng ↘' },
      { id: 8, q: 'Trong "I want to buy a book", từ nào được nhấn?', opts: ['want, buy, book', 'to, a', 'I, to, a', 'Tất cả các từ'], a: 'want, buy, book' },
      { id: 9, q: 'Trong tiếng Việt, mỗi âm tiết chiếm thời gian thế nào?', opts: ['Gần như bằng nhau', 'Khác nhau nhiều', 'Tùy trọng âm', 'Tùy ngữ điệu'], a: 'Gần như bằng nhau' },
      { id: 10, q: '"Really." xuống giọng khác "Really?" lên giọng thế nào?', opts: ['Xuống giọng là "à ra vậy", lên giọng là "thật á?"', 'Không khác gì', 'Xuống giọng là câu hỏi', 'Chỉ khác về độ to'], a: 'Xuống giọng là "à ra vậy", lên giọng là "thật á?"' },
      { id: 11, q: 'Vì sao không nghe ra chữ "and" trong "fish and chips"?', opts: ['Vì nó bị rút thành dạng yếu /ən/', 'Vì người nói bỏ hẳn từ đó', 'Vì nó là từ câm', 'Vì nó đọc thành /d/'], a: 'Vì nó bị rút thành dạng yếu /ən/' },
      { id: 12, q: 'Khoảng cách giữa hai nhịp nhấn trong tiếng Anh thế nào?', opts: ['Gần như bằng nhau, bất kể mấy từ chen giữa', 'Tăng dần', 'Tùy số từ chen giữa', 'Không có quy luật'], a: 'Gần như bằng nhau, bất kể mấy từ chen giữa' },
    ],
  },

  {
    id: 'a0_11',
    title: '11. Nối Âm Cơ Bản (Linking)',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Người bản ngữ không đọc rời từng từ',
        c: '👉 Trong một cụm nói liền hơi, âm cuối của từ trước dính vào âm đầu của từ sau.\n→ "an apple" nghe như "a-napple" /ə ˈnæpəl/\n→ "turn off" nghe như "tur-noff" /tɜː ˈnɒf/\n📌 Đây là lý do lớn thứ hai (sau dạng yếu) khiến người học nghe không ra: bạn đang tìm ranh giới giữa các từ, nhưng ranh giới đó không tồn tại trong lời nói.'
      },
      {
        h: 'II. Phụ âm + nguyên âm — kiểu nối phổ biến nhất',
        c: '👉 Từ trước kết thúc bằng PHỤ ÂM, từ sau bắt đầu bằng NGUYÊN ÂM → dính liền.\n→ pick it up → "pi-ki-tup"\n→ look at it → "loo-ka-tit"\n→ come in → "co-min"\n→ far away → "fa-raway"\n📌 Luyện: đọc cả cụm như thể nó là MỘT từ dài.'
      },
      {
        h: 'III. Nguyên âm + nguyên âm — chèn âm đệm',
        c: '👉 Hai nguyên âm gặp nhau thì chèn một âm trơn ở giữa cho dễ nối:\n→ Sau /iː/, /ɪ/, /eɪ/, /aɪ/ → chèn /j/ (âm "y"): "I am" → "I-yam" · "she is" → "she-yis"\n→ Sau /uː/, /ʊ/, /əʊ/, /aʊ/ → chèn /w/: "go out" → "go-wout" · "do it" → "do-wit"\n📌 Không cần cố tình làm — cứ nối liền hơi thì âm đệm tự xuất hiện.'
      },
      {
        h: 'IV. Phụ âm giống nhau gặp nhau — đọc một lần',
        c: '👉 Hai phụ âm giống nhau đứng cạnh → chỉ giữ một, kéo dài hơn chút.\n→ "bus stop" → "bu-stop" (một /s/ dài)\n→ "big girl" → "bi-girl"\n→ "good day" → "goo-day"\n⚠️ Đừng nhầm với việc NUỐT ÂM CUỐI (bài 6). Ở đây âm vẫn được phát ra, chỉ là không phát hai lần.'
      },
    ],
    exercises: [
      { id: 1, q: '"an apple" trong lời nói liền hơi nghe như thế nào?', opts: ['a-napple', 'an-apple tách rời', 'a-apple', 'ana-pple'], a: 'a-napple' },
      { id: 2, q: 'Kiểu nối âm phổ biến nhất là gì?', opts: ['Phụ âm cuối + nguyên âm đầu', 'Nguyên âm + nguyên âm', 'Phụ âm + phụ âm', 'Nguyên âm + phụ âm'], a: 'Phụ âm cuối + nguyên âm đầu' },
      { id: 3, q: '"turn off" nghe như thế nào?', opts: ['tur-noff', 'turn-off tách rời', 'tu-roff', 'turno-ff'], a: 'tur-noff' },
      { id: 4, q: 'Sau âm /iː/ mà gặp nguyên âm thì chèn âm đệm nào?', opts: ['/j/ (âm "y")', '/w/', '/r/', '/h/'], a: '/j/ (âm "y")' },
      { id: 5, q: '"go out" chèn âm đệm nào?', opts: ['/w/', '/j/', '/r/', 'Không chèn gì'], a: '/w/' },
      { id: 6, q: '"bus stop" đọc thế nào?', opts: ['Một âm /s/ kéo dài hơn chút', 'Hai âm /s/ rõ ràng tách rời', 'Bỏ hẳn âm /s/', 'Thêm /ɪ/ vào giữa'], a: 'Một âm /s/ kéo dài hơn chút' },
      { id: 7, q: 'Vì sao nối âm làm người học nghe không ra?', opts: ['Vì ranh giới giữa các từ biến mất trong lời nói', 'Vì người nói nói sai', 'Vì âm lượng quá nhỏ', 'Vì thiếu ngữ pháp'], a: 'Vì ranh giới giữa các từ biến mất trong lời nói' },
      { id: 8, q: '"pick it up" nối lại nghe như thế nào?', opts: ['pi-ki-tup', 'pick-it-up rời từng từ', 'pick-itup', 'pi-cki-tup'], a: 'pi-ki-tup' },
      { id: 9, q: 'Nối phụ âm giống nhau KHÁC nuốt âm cuối ở chỗ nào?', opts: ['Âm vẫn được phát ra, chỉ không phát hai lần', 'Âm bị bỏ hẳn', 'Không khác gì', 'Âm được phát ba lần'], a: 'Âm vẫn được phát ra, chỉ không phát hai lần' },
      { id: 10, q: '"I am" nối lại nghe như thế nào?', opts: ['I-yam', 'I-wam', 'I-ram', 'I am tách rời'], a: 'I-yam' },
      { id: 11, q: 'Cách luyện nối âm hiệu quả nhất là gì?', opts: ['Đọc cả cụm như thể nó là một từ dài', 'Đọc từng từ thật rõ', 'Đọc thật to', 'Đọc thật chậm và tách rời'], a: 'Đọc cả cụm như thể nó là một từ dài' },
      { id: 12, q: '"come in" nối lại nghe như thế nào?', opts: ['co-min', 'come-in rời', 'com-in', 'co-me-in'], a: 'co-min' },
    ],
  },

  {
    id: 'a0_12',
    title: '12. Số Đếm, Ngày Tháng & Cách Đọc',
    level: 'A0',
    category: 'Nền tảng',
    color: C,
    theory: [
      {
        h: 'I. Số đếm 0–20 và chỗ dễ sai',
        c: '0 zero · 1 one · 2 two · 3 three · 4 four · 5 five · 6 six · 7 seven · 8 eight · 9 nine · 10 ten\n11 eleven · 12 twelve · 13 thirteen · 14 fourteen · 15 fifteen · 16 sixteen · 17 seventeen · 18 eighteen · 19 nineteen · 20 twenty\n⚠️ Bốn số viết KHÔNG theo quy luật: 13 thirteen (không phải "threeteen"), 15 fifteen (không phải "fiveteen"), 18 eighteen (chỉ một chữ t), 20 twenty.'
      },
      {
        h: 'II. -TEEN và -TY: khác nhau ở TRỌNG ÂM',
        c: '👉 13 thirˈteen (nhấn âm sau) ≠ 30 ˈthirty (nhấn âm đầu)\n👉 14 fourˈteen ≠ 40 ˈforty · 15 fifˈteen ≠ 50 ˈfifty\n⚠️ Đây là cặp gây hiểu nhầm nhiều nhất khi nói giá tiền, tuổi, số lượng. Người bản ngữ phân biệt CHÍNH bằng trọng âm, không phải bằng âm cuối.\n📌 Khi cần chắc chắn, người ta nói rõ: "one-three, thirteen" hoặc "three-zero, thirty".\n⚠️ Chú ý chính tả: 40 viết là "forty", KHÔNG có chữ u như "four".'
      },
      {
        h: 'III. Số thứ tự (ordinal numbers)',
        c: '1st first · 2nd second · 3rd third · 4th fourth · 5th fifth\n8th eighth · 9th ninth (bỏ chữ e) · 12th twelfth · 20th twentieth\n👉 Ba số đầu bất quy tắc, còn lại thêm -th.\n📌 Dùng cho: ngày trong tháng, thứ tự, tầng nhà, thế kỷ.'
      },
      {
        h: 'IV. Ngày tháng — hai kiểu viết, đừng nhầm',
        c: '🇬🇧 Anh-Anh: ngày trước tháng — 5/3/2026 = 5 March 2026, đọc "the fifth of March".\n🇺🇸 Anh-Mỹ: tháng trước ngày — 3/5/2026 = March 5, 2026, đọc "March fifth".\n⚠️ Cùng chuỗi "5/3" mà một bên hiểu là 5 tháng 3, bên kia hiểu là 3 tháng 5. Khi viết cho người lạ, ghi tên tháng bằng chữ để khỏi nhầm.\n📌 Năm: 1995 đọc "nineteen ninety-five"; 2026 đọc "twenty twenty-six" hoặc "two thousand and twenty-six".'
      },
    ],
    exercises: [
      { id: 1, q: 'Số 13 nhấn trọng âm ở đâu?', opts: ['Âm sau — thirˈteen', 'Âm đầu — ˈthirteen', 'Cả hai như nhau', 'Không có trọng âm'], a: 'Âm sau — thirˈteen' },
      { id: 2, q: 'Số 30 nhấn trọng âm ở đâu?', opts: ['Âm đầu — ˈthirty', 'Âm sau — thirˈty', 'Cả hai như nhau', 'Không có trọng âm'], a: 'Âm đầu — ˈthirty' },
      { id: 3, q: 'Người bản ngữ phân biệt 15 và 50 chủ yếu bằng gì?', opts: ['Trọng âm', 'Âm cuối', 'Độ dài từ', 'Ngữ cảnh'], a: 'Trọng âm' },
      { id: 4, q: 'Số 40 viết thế nào?', opts: ['forty', 'fourty', 'fourthy', 'fortty'], a: 'forty' },
      { id: 5, q: 'Số thứ tự của 9 viết thế nào?', opts: ['ninth', 'nineth', 'ninth-th', 'niner'], a: 'ninth' },
      { id: 6, q: 'Số thứ tự của 12 viết thế nào?', opts: ['twelfth', 'twelveth', 'twelth', 'twelvth'], a: 'twelfth' },
      { id: 7, q: 'Ngày 5/3/2026 theo kiểu Anh-Anh là ngày nào?', opts: ['Ngày 5 tháng 3', 'Ngày 3 tháng 5', 'Ngày 5 tháng 5', 'Ngày 3 tháng 3'], a: 'Ngày 5 tháng 3' },
      { id: 8, q: 'Kiểu Anh-Mỹ viết ngày tháng theo thứ tự nào?', opts: ['Tháng trước, ngày sau', 'Ngày trước, tháng sau', 'Năm trước tiên', 'Không có quy tắc'], a: 'Tháng trước, ngày sau' },
      { id: 9, q: 'Năm 1995 đọc thế nào?', opts: ['nineteen ninety-five', 'one thousand nine hundred ninety five', 'nineteen nine five', 'one nine nine five'], a: 'nineteen ninety-five' },
      { id: 10, q: 'Số 15 viết thế nào?', opts: ['fifteen', 'fiveteen', 'fifthteen', 'fivteen'], a: 'fifteen' },
      { id: 11, q: 'Ba số thứ tự đầu tiên có đặc điểm gì?', opts: ['Bất quy tắc: first, second, third', 'Đều thêm -th', 'Đều thêm -st', 'Giống số đếm'], a: 'Bất quy tắc: first, second, third' },
      { id: 12, q: 'Khi viết ngày tháng cho người lạ, nên làm gì để tránh nhầm?', opts: ['Ghi tên tháng bằng chữ', 'Chỉ ghi số', 'Ghi năm trước', 'Dùng dấu chấm thay dấu gạch'], a: 'Ghi tên tháng bằng chữ' },
    ],
  },
];

export default foundationData;
