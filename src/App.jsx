import React, { useState, useEffect } from 'react';
import Vocab from './Vocab';
import { 
  BookOpen, PenTool, CheckCircle, XCircle, Menu, X, Home, ChevronRight, 
  ChevronDown, Award, RotateCcw, Target, Shuffle, Volume2, Lightbulb, 
  Flame, Layers, Mic, MessageSquare, Sparkles, PlayCircle, Loader2,
  BookMarked, BrainCircuit, Trophy, ArrowRight, Map, Snail, Edit3,
  CheckSquare, Key
} from 'lucide-react';

// ==========================================
// DỮ LIỆU NGỮ PHÁP (21 CHUYÊN ĐỀ - BẢO TOÀN LÝ THUYẾT CHI TIẾT)
// ==========================================
const CORE_GRAMMAR_DATA = [
  { 
    i: 't1', t: '1. Hiện Tại Đơn (Present Simple)', c: 'bg-cyan-200', 
    th: [
      { h: 'I. Định nghĩa & Cách dùng', c: '👉 Diễn đạt một thói quen hoặc hành động lặp đi lặp lại trong hiện tại (Ex: I usually go to bed at 11 p.m).\n👉 Chân lý, sự thật hiển nhiên luôn đúng (Ex: The sun rises in the East).\n👉 Kế hoạch, lịch trình cố định của tàu xe, máy bay (Ex: The plane takes off at 3 p.m).\n👉 Dùng trong mệnh đề câu điều kiện loại 1.' }, 
      { h: 'II. Công thức chuẩn', c: '✅ KHẲNG ĐỊNH:\n- Động từ Tobe: S + am/is/are + N/Adj\n- Thường: S + V(s/es) + O\n\n❌ PHỦ ĐỊNH:\n- Động từ Tobe: S + am/is/are + not\n- Thường: S + do/does + not + V(nguyên thể)\n\n❓ NGHI VẤN:\n- Am/Is/Are + S + ...?\n- Do/Does + S + V(nguyên thể)?' },
      { h: 'III. Quy tắc thêm S/ES & Dấu hiệu', c: '⚠️ Cách thêm s/es:\n- Thêm "es" vào các động từ kết thúc bằng: ch, sh, x, s, o (watch -> watches, miss -> misses).\n- Tận cùng là phụ âm + y -> đổi "y" thành "i" rồi thêm "es" (study -> studies).\n📌 Dấu hiệu: Always, usually, often, sometimes, rarely, never, every day, once a week.' }
    ], 
    s: "I usually go to bed at eleven|Tôi thường đi ngủ lúc 11 giờ\nThe sun rises in the East|Mặt trời mọc ở hướng Đông\nThe plane takes off at three|Máy bay cất cánh lúc 3 giờ\nHe does not often play soccer|Anh ấy không thường xuyên chơi bóng đá\nShe does not study on Saturday|Cô ấy không học vào thứ Bảy", 
    e: "He always _______ a white coat.|wear,wears|wears\nThey never _______ beer.|drink,drinks|drink\nLucy _______ window shopping.|go,goes|goes\nShe _______ a pen.|have,has|has\nI _______ like tea.|don't,doesn't|don't" 
  },
  { 
    i: 't2', t: '2. Hiện Tại Tiếp Diễn (Present Cont.)', c: 'bg-indigo-200', 
    th: [
      { h: 'I. Bản chất hành động', c: '👉 Đang xảy ra ngay lúc nói (Ex: I am eating my lunch right now).\n👉 Sự việc diễn ra xung quanh thời điểm nói, không nhất thiết ngay lúc nói (Ex: I am looking for a job).\n👉 Tương lai gần theo kế hoạch (Ex: I am flying to London tomorrow).\n👉 Phàn nàn thói quen lặp đi lặp lại (dùng always).' },
      { h: 'II. Công thức cấu tạo', c: '✅ KHẲNG ĐỊNH: S + am/is/are + V-ing\n❌ PHỦ ĐỊNH: S + am/is/are + not + V-ing\n❓ NGHI VẤN: Am/Is/Are + S + V-ing?' },
      { h: 'III. Dấu hiệu nhận biết', c: '📌 Trạng từ: Now, right now, at the moment, at present.\n📌 Động từ gây chú ý: Look!, Listen!, Keep silent!, Watch out!\n⚠️ Bỏ "e" thêm "-ing" (write -> writing).\n⚠️ Gấp đôi phụ âm cuối (stop -> stopping).' }
    ], 
    s: "I am eating my lunch right now|Bây giờ tôi đang ăn trưa\nWe are studying Math now|Bây giờ chúng tôi đang học toán\nHe is always losing his keys|Anh ấy cứ hay đánh mất chìa khóa\nI am flying to London tomorrow|Tôi sẽ bay sang London ngày mai\nLook the train is coming|Nhìn kìa chuyến tàu đang tới", 
    e: "Look! The car _______ so fast.|go,is going|is going\nListen! Someone _______ in the next room.|cries,is crying|is crying\nNow they _______ to pass the exam.|try,are trying|are trying\nKeep silent! You _______ so loudly.|talk,are talking|are talking\nHe _______ in his office now.|isn't working,doesn't work|isn't working" 
  },
  { 
    i: 't3', t: '3. Quá Khứ Đơn (Past Simple)', c: 'bg-amber-200', 
    th: [
      { h: 'I. Bản chất ngữ pháp', c: '👉 Diễn tả một hành động xảy ra và đã hoàn thành, kết thúc hoàn toàn trong quá khứ, biết rõ thời gian.\n👉 Diễn đạt các hành động xảy ra liên tiếp trong quá khứ.\n👉 Diễn đạt hành động xen vào một hành động đang diễn ra trong quá khứ.\n👉 Dùng trong câu điều kiện loại 2.' },
      { h: 'II. Công thức', c: '✅ KHẲNG ĐỊNH: S + V-ed / V2 (Cột 2 bất quy tắc)\n❌ PHỦ ĐỊNH: S + did + not + V(nguyên thể)\n❓ NGHI VẤN: Did + S + V(nguyên thể)?' },
      { h: 'III. Dấu hiệu', c: '📌 Trạng từ: Yesterday, last night, last week, ago, in + năm quá khứ (in 1990).\n⚠️ Tận cùng là phụ âm + "y" -> đổi "y" thành "i" rồi thêm "ed" (study -> studied).' }
    ], 
    s: "My sister got married last month|Chị gái tôi đã kết hôn tháng trước\nI played football last Sunday|Tôi đã chơi bóng đá Chủ nhật trước\nShe went out with her boyfriend|Cô ấy đã đi chơi với bạn trai\nDaisy came here three days ago|Daisy đã đến đây 3 ngày trước\nThey watched TV late at night|Họ đã xem TV muộn vào ban đêm", 
    e: "My sister _______ married last month.|get,got|got\nDaisy _______ here 3 days ago.|come,came|came\nMy computer _______ broken yesterday.|was,were|was\nHe _______ me a teddy bear last week.|buy,bought|bought\n_______ you live here five years ago?|Did,Do|Did" 
  },
  { 
    i: 't4', t: '4. Quá Khứ Tiếp Diễn (Past Cont.)', c: 'bg-orange-200', 
    th: [
      { h: 'I. Cách dùng thực tế', c: '👉 Đang xảy ra tại một thời điểm xác định cụ thể trong quá khứ (Ex: At 8pm yesterday, I was watching TV).\n👉 Hai hành động xảy ra đồng thời trong quá khứ (thường dùng WHILE).\n👉 Hành động đang diễn ra thì có hành động khác xen vào (Hành động đang diễn ra dùng QKTD, xen vào dùng QKĐ).' },
      { h: 'II. Công thức', c: '✅ KHẲNG ĐỊNH: S + was/were + V-ing\n❌ PHỦ ĐỊNH: S + was/were + not + V-ing\n❓ NGHI VẤN: Was/Were + S + V-ing?' },
      { h: 'III. Dấu hiệu', c: '📌 At + giờ + mốc thời gian quá khứ.\n📌 At this time + thời gian quá khứ.\n📌 Liên từ: When, While, At that time.' }
    ], 
    s: "I was watching TV at eight yesterday|Tôi đang xem TV lúc 8 giờ hôm qua\nShe was sleeping when the phone rang|Cô ấy đang ngủ thì điện thoại reo\nWe were playing football when it rained|Chúng tôi đang chơi bóng thì trời mưa\nHe was painting the wall at noon|Anh ấy đang sơn tường lúc trưa\nWhat were you doing at this time|Bạn đang làm gì vào thời điểm này", 
    e: "At 8pm yesterday, I _______ TV.|was watching,watched|was watching\nWhen the phone rang, she _______ in the kitchen.|was cooking,cooked|was cooking\nWhile I _______ to work, I saw an accident.|was driving,drove|was driving\nWhat _______ at 10 last night?|were you doing,did you do|were you doing\nThey _______ dinner when I arrived.|were having,had|were having" 
  },
  { 
    i: 't5', t: '5. Hiện Tại Hoàn Thành (Present Perfect)', c: 'bg-emerald-200', 
    th: [
      { h: 'I. Ý nghĩa cốt lõi', c: '👉 Hành động hoàn thành cho tới thời điểm hiện tại (không rõ thời gian).\n👉 Bắt đầu ở quá khứ, kéo dài và đang tiếp tục ở hiện tại.\n👉 Kinh nghiệm, trải nghiệm tính đến hiện tại (ever/never).\n👉 Hành động trong quá khứ để lại kết quả ở hiện tại.' },
      { h: 'II. Công thức', c: '✅ KHẲNG ĐỊNH: S + have/has + V3/ed\n❌ PHỦ ĐỊNH: S + have/has + not + V3/ed\n❓ NGHI VẤN: Have/Has + S + V3/ed?' },
      { h: 'III. Dấu hiệu', c: '📌 Just, recently, lately (vừa mới, gần đây).\n📌 Already (rồi), Yet (chưa).\n📌 For + khoảng thời gian (for 2 years), Since + mốc thời gian (since 1992).\n📌 So far, up to now (cho đến bây giờ).' }
    ], 
    s: "I have done all my homework|Tôi đã làm hết bài tập\nHave you ever traveled to America|Bạn đã từng đi Mỹ chưa\nShe has not seen him for a long time|Cô ấy đã không gặp anh ấy rất lâu rồi\nThis is the best novel I have ever read|Đây là tiểu thuyết hay nhất tôi từng đọc\nHas she arrived in London yet|Cô ấy đã đến London chưa", 
    e: "I _______ done all my homework.|has,have|have\nShe _______ lived here all her life.|have,has|has\nThey _______ been married for fifty years.|has,have|have\nHe _______ written three books so far.|has,have|has\nI can’t get in. I _______ lost my keys.|have,has|have" 
  },
  { 
    i: 't6', t: '6. Hiện Tại Hoàn Thành Tiếp Diễn', c: 'bg-emerald-300', 
    th: [
      { h: 'I. Cách dùng đặc trưng', c: '👉 Nhấn mạnh tính LIÊN TỤC, kéo dài của hành động bắt đầu ở quá khứ và còn đang tiếp diễn ở hiện tại.\n👉 Hành động đã kết thúc trong quá khứ nhưng hậu quả vẫn hiển hiện rõ ở hiện tại.' },
      { h: 'II. Công thức cấu tạo', c: '✅ KHẲNG ĐỊNH: S + have/has + been + V-ing\n❌ PHỦ ĐỊNH: S + have/has + not + been + V-ing\n❓ NGHI VẤN: Have/Has + S + been + V-ing?' },
      { h: 'III. Dấu hiệu nhận biết', c: '📌 Since + mốc thời gian (since early morning).\n📌 For + khoảng thời gian (for 3 hours).\n📌 All + thời gian (all day, all the afternoon).' }
    ], 
    s: "I have been waiting for two hours|Tôi đã chờ hai tiếng đồng hồ\nIt has been raining all afternoon|Trời đã mưa cả buổi chiều\nShe has been working here since Monday|Cô ấy đã làm việc ở đây từ thứ Hai\nWe have been learning English for years|Chúng tôi đã học tiếng Anh nhiều năm\nYou have been sleeping for too long|Bạn đã ngủ quá lâu", 
    e: "I _______ waiting for you for two hours.|have been,has been|have been\nShe _______ working here since Monday.|has been,have been|has been\nThey _______ playing tennis all morning.|have been,has been|have been\nHe _______ reading this book all day.|has been,have been|has been\nWe _______ learning English for years.|have been,has been|have been" 
  },
  { 
    i: 't7', t: '7. Quá Khứ Hoàn Thành (Past Perfect)', c: 'bg-yellow-300', 
    th: [
      { h: 'I. Quy tắc trước - sau', c: '👉 Diễn tả một hành động xảy ra TRƯỚC một hành động khác trong quá khứ và cả hai đều đã kết thúc.\n👉 Hành động nào xảy ra trước -> Dùng Quá khứ hoàn thành.\n👉 Hành động nào xảy ra sau -> Dùng Quá khứ đơn.' },
      { h: 'II. Công thức chính xác', c: '✅ KHẲNG ĐỊNH: S + had + V3/ed\n❌ PHỦ ĐỊNH: S + had + not (hadn\'t) + V3/ed\n❓ NGHI VẤN: Had + S + V3/ed?' },
      { h: 'III. Liên từ phối hợp thì', c: '📌 By the time, before, after, when, as soon as, no sooner...than.\n⚠️ Trước BEFORE dùng QKHT, sau BEFORE dùng QKĐ.\n⚠️ Trước AFTER dùng QKĐ, sau AFTER dùng QKHT.' }
    ], 
    s: "I had finished my work before I went out|Tôi đã hoàn thành công việc trước khi ra ngoài\nShe had lived in London before she moved|Cô ấy đã sống ở London trước khi chuyển đi\nBy the time we arrived they had left|Lúc chúng tôi đến họ đã rời đi\nI had never seen such a beautiful beach|Tôi chưa từng thấy bãi biển nào đẹp như vậy\nShe was tired because she had worked all day|Cô ấy mệt vì đã làm việc cả ngày", 
    e: "I _______ my work before I went out.|had finished,finished|had finished\nShe _______ in London before she moved.|had lived,lived|had lived\nBy the time we arrived, the train _______ .|had left,left|had left\nI _______ never seen such a beautiful beach.|had,have|had\nWhen I got home, my mother _______ already cooked.|had,has|had" 
  },
  { 
    i: 't8', t: '8. Quá Khứ Hoàn Thành Tiếp Diễn', c: 'bg-green-300', 
    th: [
      { h: 'I. Ý nghĩa diễn đạt', c: '👉 Diễn tả quá trình xảy ra một hành động bắt đầu và kéo dài liên tục trước một hành động khác trong quá khứ (nhấn mạnh tính liên tục).\n👉 Diễn đạt hành động là nguyên nhân của một điều gì đó trong quá khứ.' },
      { h: 'II. Công thức', c: '✅ KHẲNG ĐỊNH: S + had + been + V-ing\n❌ PHỦ ĐỊNH: S + hadn\'t + been + V-ing\n❓ NGHI VẤN: Had + S + been + V-ing?' },
      { h: 'III. Dấu hiệu', c: '📌 Until then, by the time, prior to that time, before, after kết hợp với khoảng thời gian (for...).' }
    ], 
    s: "I had been working hard all day|Tôi đã làm việc chăm chỉ cả ngày\nThey had been playing football|Họ đã chơi bóng đá\nShe had been dreaming about that villa|Cô ấy đã mơ mộng về căn biệt thự đó\nHe had been watching a film quietly|Anh ấy đã xem phim một cách im lặng\nWe had been playing for half an hour|Chúng tôi đã chơi được nửa giờ", 
    e: "I _______ working hard all day.|had been,have been|had been\nThey _______ playing football.|had been,have been|had been\nShe _______ dreaming before she woke up.|had been,has been|had been\nHe _______ watching a film before the light went out.|had been,has been|had been\nWe _______ playing for half an hour when it rained.|had been,have been|had been" 
  },
  { 
    i: 't9', t: '9. Tương Lai Đơn (Future Simple)', c: 'bg-fuchsia-200', 
    th: [
      { h: 'I. Bản chất hành động', c: '👉 Quyết định tự phát tại thời điểm nói chứ không có kế hoạch từ trước.\n👉 Đưa ra lời yêu cầu, đề nghị, lời mời hoặc lời hứa (Ex: I promise I will return on time).\n👉 Diễn đạt một dự đoán không có căn cứ (thường đi với động từ TO THINK).' },
      { h: 'II. Công thức', c: '✅ KHẲNG ĐỊNH: S + will + V(nguyên thể)\n❌ PHỦ ĐỊNH: S + will not (won\'t) + V(nguyên thể)\n❓ NGHI VẤN: Will + S + V(nguyên thể)?' },
      { h: 'III. Trạng từ đi kèm', c: '📌 Tomorrow, next day, next week, in + khoảng thời gian (in 5 minutes).\n📌 Think, believe, suppose, perhaps, probably.' }
    ], 
    s: "I will help her take care of children|Tôi sẽ giúp cô ấy trông trẻ\nWe will see what we can do|Chúng tôi sẽ xem có thể giúp gì cho bạn\nI miss her I will go to her house|Tôi nhớ cô ấy tôi sẽ đến nhà cô ấy\nWill you open the door please|Bạn mở cửa giúp tôi được không\nI think people will not use computer|Tôi nghĩ người ta sẽ không dùng máy tính", 
    e: "They _______ it for you tomorrow.|will do,are doing|will do\nMy father _______ you in 5 minutes.|calls,will call|will call\nWe believe that she _______ from her illness soon.|will recover,recovers|will recover\nI promise I _______ school on time.|return,will return|will return\nIf it rains, he _______ at home.|will stay,stays|will stay" 
  },
  { 
    i: 't10', t: '10. Tương Lai Tiếp Diễn', c: 'bg-purple-300', 
    th: [
      { h: 'I. Cách dùng', c: '👉 Đang diễn ra tại một thời điểm XÁC ĐỊNH trong tương lai.\n👉 Hành động đang xảy ra ở tương lai thì có hành động khác xen vào (mệnh đề xen vào chia hiện tại đơn).\n👉 Hành động diễn ra như một phần kế hoạch hoặc thời gian biểu.' },
      { h: 'II. Công thức', c: '✅ KHẲNG ĐỊNH: S + will + be + V-ing\n❌ PHỦ ĐỊNH: S + won\'t + be + V-ing\n❓ NGHI VẤN: Will + S + be + V-ing?' },
      { h: 'III. Dấu hiệu', c: '📌 At this time / At this moment + thời gian tương lai.\n📌 At + giờ cụ thể + thời gian tương lai (at 10 a.m tomorrow).' }
    ], 
    s: "I will be eating my dinner tomorrow|Tôi sẽ đang ăn tối ngày mai\nHe will be sleeping at ten tonight|Anh ấy sẽ đang ngủ lúc 10 giờ tối nay\nShe will be reading books then|Cô ấy sẽ đang đọc sách lúc đó\nThey will be running around the park|Họ sẽ đang chạy quanh công viên\nIt will be raining tomorrow morning|Trời sẽ đang mưa vào sáng mai", 
    e: "I will _______ eating dinner at 8 PM.|be,been|be\nHe will _______ sleeping when you arrive.|be,been|be\nShe will _______ reading books at this time tomorrow.|be,been|be\nThey will _______ running a marathon tomorrow morning.|be,been|be\nWe will _______ walking in the park at 4 PM.|be,been|be" 
  },
  { 
    i: 't11', t: '11. Tương Lai Hoàn Thành', c: 'bg-rose-300', 
    th: [
      { h: 'I. Ý nghĩa', c: '👉 Diễn tả một hành động hoặc sự việc sẽ hoàn thành TRƯỚC một thời điểm xác định hoặc trước một hành động khác trong tương lai.' },
      { h: 'II. Công thức', c: '✅ KHẲNG ĐỊNH: S + will + have + V3/ed\n❌ PHỦ ĐỊNH: S + won\'t + have + V3/ed\n❓ NGHI VẤN: Will + S + have + V3/ed?' },
      { h: 'III. Dấu hiệu', c: '📌 By + thời gian tương lai, By the end of + thời gian tương lai, By the time + mệnh đề hiện tại đơn, Before + thời gian tương lai.' }
    ], 
    s: "I will have finished my homework early|Tôi sẽ hoàn thành bài tập sớm\nBy tomorrow they will have visited Paris|Tính đến ngày mai họ sẽ ghé thăm Paris\nThe plane will have taken off soon|Máy bay sẽ cất cánh trước khi bạn tới\nI will have eaten dinner by then|Tôi sẽ đã ăn tối xong xuôi tính đến lúc đó\nShe will have left before you come|Cô ấy sẽ rời đi trước khi bạn đến", 
    e: "I _______ finished my report by next month.|will have,will be|will have\nBy this time tomorrow they _______ visited Paris.|will have,won't have|will have\nThe plane _______ taken off by the time he gets to the airport.|will have,will be|will have\nBy the year 2030, many people _______ lost their jobs.|will have,will be|will have\nI know by the time they come, I _______ gone out.|will have,will be|will have" 
  },
  { 
    i: 't12', t: '12. TL Hoàn Thành Tiếp Diễn', c: 'bg-yellow-300', 
    th: [
      { h: 'I. Bản chất nhấn mạnh', c: '👉 Diễn tả một hành động xảy ra và kéo dài liên tục đến một thời điểm cụ thể trong tương lai (nhấn mạnh KHOẢNG THỜI GIAN của hành động).' },
      { h: 'II. Công thức', c: '✅ KHẲNG ĐỊNH: S + will + have + been + V-ing\n❌ PHỦ ĐỊNH: S + won\'t + have + been + V-ing\n❓ NGHI VẤN: Will + S + have + been + V-ing?' },
      { h: 'III. Dấu hiệu', c: '📌 By then, by the time + mệnh đề hiện tại đơn, by the end of this week/month/year kết hợp kèm KHOẢNG THỜI GIAN (for 10 years).' }
    ], 
    s: "I will have been studying for years|Tôi sẽ đã đang học được nhiều năm\nShe will have been working nineteen years|Cô ấy sẽ đã đang làm việc được 19 năm\nWe will have been living ten years|Chúng tôi sẽ đã đang sống ở đây được 10 năm\nThey will have been getting married soon|Họ sẽ đã đang kết hôn được 2 năm\nWill you have been living here long|Bạn sẽ đã đang sống ở đây lâu chưa", 
    e: "I will have _______ studying English for 10 years.|been,be|been\nBy April, I will have _______ working here for 19 years.|been,be|been\nWhen I get my degree, I will have been _______ at Cambridge for 4 years.|studying,study|studying\nThey will have been _______ for an hour by the time I get home.|talking,talk|talking\nWe _______ have been living in this house for 10 years by next week.|will,have|will" 
  },
  { 
    i: 't13', t: '13. Câu Điều Kiện', c: 'bg-teal-200', 
    th: [
      { h: 'I. Các loại điều kiện', c: '👉 Loại 1 (Có thể ở HT/TL): If + S + V(hiện tại đơn), S + will/can + V(nguyên thể).\n👉 Loại 2 (Không thật ở HT): If + S + V2/ed, S + would/could + V(nguyên thể). Động từ "tobe" chia "were" cho tất cả các ngôi.\n👉 Loại 3 (Không thật ở QK): If + S + had + V3/ed, S + would/could + have + V3/ed.' },
      { h: 'II. Đảo ngữ & Cấu trúc đặc biệt', c: '🔄 Đảo ngữ loại 1: Should + S + V, S + will + V.\n🔄 Đảo ngữ loại 2: Were + S + to-V / Were + S + ..., S + would + V.\n🔄 Đảo ngữ loại 3: Had + S + V3/ed, S + would have + V3/ed.\n📌 Cấu trúc khác: UNLESS = If not | WITHOUT / BUT FOR + Noun: Nếu không có...' }
    ], 
    s: "If it rains I will stay home|Nếu trời mưa tôi sẽ ở nhà\nIf I were you I would go|Nếu tôi là bạn tôi sẽ đi\nIf he had come I met him|Nếu anh ấy đến tôi đã gặp anh ấy rồi\nUnless we start we will be late|Trừ khi chúng ta xuất phát ngay chúng ta sẽ bị trễ\nWere I rich I would travel around|Nếu tôi giàu tôi sẽ đi du lịch vòng quanh", 
    e: "If it rains, I _______ stay at home.|will,would|will\nIf I _______ you, I would work harder.|was,were|were\nIf he _______ come yesterday, I would have met him.|had,has|had\n_______ we start at once, we will be late.|Unless,If|Unless\n_______ I the president, I would build more hospitals.|Were,Was|Were" 
  },
  { 
    i: 't14', t: '14. Câu Ao Ước (Wish)', c: 'bg-emerald-100', 
    th: [
      { h: 'I. Ao ước ở tương lai', c: '👉 Mong muốn một điều tốt đẹp xảy ra trong tương lai.\n✅ Cấu trúc: S + wish / If only + S + would/could + V(nguyên thể)' },
      { h: 'II. Ao ước ở hiện tại', c: '👉 Ước một điều trái ngược thực tế ở hiện tại.\n✅ Cấu trúc: S + wish / If only + S + V2/ed\n⚠️ Tobe dùng "were" cho tất cả các ngôi.' },
      { h: 'III. Ao ước ở quá khứ', c: '👉 Diễn tả sự nuối tiếc về một điều đã xảy ra trong quá khứ.\n✅ Cấu trúc: S + wish / If only + S + had + V3/ed' }
    ], 
    s: "I wish I were rich today|Ước gì tôi giàu có\nIf only I knew her name clearly|Giá mà tôi biết tên cô ấy\nI wish we would not have exam|Tôi ước ngày mai không phải thi\nIf only it would stop raining soon|Giá mà trời tạnh mưa\nI wish I had succeeded last exam|Ước gì tôi đã đậu kỳ thi đó", 
    e: "I wish I _______ rich, but I am poor.|were,was|were\nIf only I _______ her name, I would call her.|knew,know|knew\nI wish we _______ not have an exam tomorrow.|would,will|would\nIf only it _______ stop raining so we could go out.|would,will|would\nI wish I _______ succeeded in the final exam last year.|had,have|had" 
  },
  { 
    i: 't15', t: '15. Mệnh Đề Quan Hệ', c: 'bg-violet-200', 
    th: [
      { h: 'I. Đại từ quan hệ', c: '👉 WHO (chủ ngữ/tân ngữ người), WHOM (tân ngữ người).\n👉 WHICH (chủ ngữ/tân ngữ vật). Đặc biệt: dùng WHICH thay thế cho cả mệnh đề đứng trước.\n👉 WHOSE (sở hữu, luôn đi liền danh từ).\n👉 THAT (thay cho who/whom/which trong mệnh đề XÁC ĐỊNH. KHÔNG dùng sau dấu phẩy).' },
      { h: 'II. Rút Gọn MĐQH', c: '1. Dùng V-ing (Chủ động): The girl who is wearing => The girl wearing.\n2. Dùng V3/ed (Bị động): The novel which was written => The novel written.\n3. Dùng To-V: Sau the first, the second, the last, the only, so sánh nhất.' }
    ], 
    s: "The boy who is reading is my son|Cậu bé đang đọc sách là con trai tôi\nThe book which I bought is good|Cuốn sách tôi mua rất hay\nThe man whom you saw is John|Người đàn ông bạn thấy là John\nThe cat that is sleeping is cute|Con mèo đang ngủ rất dễ thương\nThe girl whose hair is long is Mary|Cô gái tóc dài là Mary", 
    e: "The boy _______ is reading a book is my son.|who,which|who\nThe book _______ I bought yesterday is very interesting.|which,who|which\nThe man _______ you saw at the canteen is John.|whom,which|whom\nThe cat _______ is sleeping on the roof is very cute.|that,whom|that\nThe girl _______ hair is very long is Mary.|whose,who|whose" 
  },
  { 
    i: 't16', t: '16. Câu So Sánh', c: 'bg-pink-200', 
    th: [
      { h: 'I. So sánh ngang bằng', c: '✅ Công thức: S1 + to be/V + as + adj/adv + as + S2\n👉 Tương đương: S1 + to be + the same + Noun + as + S2 (Ex: My room is the same width as his).' },
      { h: 'II. So sánh hơn & Nhất', c: '👉 Hơn Ngắn: S1 + to be + adj-er + than + S2 (y đổi thành ier).\n👉 Hơn Dài: S1 + to be + more + Adj + than + S2.\n👉 Nhất: THE + adj-est | THE most + adj.\n⚠️ Bất quy tắc: good -> better -> best, bad -> worse -> worst.' },
      { h: 'III. So sánh kép', c: '👉 Càng... càng: The + Adj so sánh hơn + S + V, the + Adj so sánh hơn + S + V (Ex: The more you study, the smarter you become).' }
    ], 
    s: "My car is as new as yours|Xe của tôi mới bằng xe bạn\nHe is taller than me now|Anh ấy cao hơn tôi\nThis is the best book ever|Đây là cuốn sách hay nhất\nShe is more beautiful than Mary out|Cô ấy đẹp hơn Mary\nThe more you study smarter you are|Càng học càng thông minh", 
    e: "My car is _______ new as your car.|as,so|as\nHe is _______ than me.|taller,tallest|taller\nThis is the _______ book I have ever read.|best,better|best\nShe is _______ beautiful than Mary.|more,most|more\nThe _______ you study, the smarter you are.|more,most|more" 
  },
  { 
    i: 't17', t: '17. Câu Hỏi Đuôi', c: 'bg-blue-200', 
    th: [
      { h: 'I. Nguyên tắc chung', c: '👉 Mệnh đề khẳng định -> Đuôi phủ định | Mệnh đề phủ định -> Đuôi khẳng định.\n📌 Nếu mệnh đề chính chứa các phó từ phủ định (never, rarely, seldom, hardly) -> Câu hỏi đuôi luôn chia ở dạng KHẲNG ĐỊNH.' },
      { h: 'II. Trường hợp đặc biệt', c: '👉 I am... -> đuôi: aren\'t I? | Let\'s... -> đuôi: shall we?\n👉 Câu mệnh lệnh/yêu cầu -> đuôi luôn là: will you?\n👉 Mệnh đề có "I think/believe + MĐ phụ" -> Lấy mệnh đề phụ làm đuôi. Nhưng nếu chủ ngữ chính KHÁC "I" -> Lấy mệnh đề chính làm đuôi (Ex: She thinks he will come, doesn\'t she?).' }
    ], 
    s: "You do not like me do you|Bạn không thích tôi đúng không\nHe is handsome isn't he right|Anh ấy đẹp trai phải không\nThey have left haven't they now|Họ đã đi rồi đúng không\nHe never came again did he code|Anh ấy không bao giờ đến nữa phải không\nLet's go out shall we walk|Chúng ta ra ngoài nhé", 
    e: "You do not like me, _______ you?|do,don't|do\nHe is handsome, _______ he?|isn't,is|isn't\nThey have left, _______ they?|haven't,have|haven't\nSnow is white, _______ it?|isn't,is|isn't\nHe never came again, _______ he?|did,didn't|did" 
  },
  { 
    i: 't18', t: '18. Câu Giả Định', c: 'bg-purple-200', 
    th: [
      { h: 'I. Bản chất giả định hiện tại', c: '👉 Diễn tả mong muốn người này khuyên người kia làm gì (mang tính cầu khiến).\n✅ Động từ trong mệnh đề "THAT" luôn ở dạng NGUYÊN THỂ KHÔNG "TO" (V-bare) cho tất cả các ngôi chủ ngữ.' },
      { h: 'II. Dấu hiệu nhận biết', c: '📌 Các động từ: suggest, recommend, demand, insist, advise, request, propose, ask.\n📌 Các tính từ: essential, crucial, vital, necessary, important.' },
      { h: 'III. Quá khứ giả định', c: '👉 Diễn tả tình huống không có thực ở hiện tại: S1 + would rather + S2 + V2/ed | It\'s high time + S + V2/ed (Đã đến lúc).' }
    ], 
    s: "The doctor suggested he stop smoking now|Bác sĩ đề nghị anh ấy bỏ thuốc\nI demand that I be free today|Tôi yêu cầu tôi được tự do\nIt is essential he find the book|Cần thiết là anh ấy tìm thấy sách\nIt is crucial you be there early|Quan trọng là bạn có mặt ở đó\nIt is high time we started journey|Đã đến lúc chúng ta bắt đầu", 
    e: "The doctor suggested that he _______ smoking.|stop,stops|stop\nI demand that I _______ allowed to be free now.|be,am|be\nIt is essential that he _______ the book.|find,finds|find\nIt is crucial that you _______ there on time.|be,are|be\nIt is high time we _______ a new journey.|started,start|started" 
  },
  { 
    i: 't19', t: '19. Đảo Ngữ', c: 'bg-rose-300', 
    th: [
      { h: 'I. Nguyên tắc chung', c: '👉 Là hiện tượng đảo ngược vị trí của trợ động từ hoặc động từ lên trước chủ ngữ nhằm mục đích nhấn mạnh phó từ phủ định.\n✅ Công thức chung: Từ phủ định + Trợ động từ + S + V(chính).' },
      { h: 'II. Các cấu trúc đảo ngữ', c: '📌 Phủ định: Never, rarely, seldom, little, hardly ever + Trợ ĐT + S + V.\n📌 Chứa NO: At no time, on no condition, under no circumstances (trong bất kỳ hoàn cảnh nào cũng không).\n📌 Vừa mới... thì: No sooner + had + S + V3/ed + than + S + V2/ed.\n📌 Mãi cho đến khi: Not until + Clause/Mốc TG + Trợ ĐT + S + V.' }
    ], 
    s: "Little did I know about his past|Tôi hầu như không biết gì về anh ta\nAt no time did I say that|Chưa bao giờ tôi nói điều đó\nUnder no circumstances is it paid here|Trong bất kỳ hoàn cảnh nào cũng không được trả\nNever does it snow in this area|Ở đây không bao giờ có tuyết\nNo sooner had I arrived than it|Tôi vừa đến thì chuông reo", 
    e: "Little _______ I know about his secret life.|did,do|did\nAt no time _______ I say I would accept it.|did,do|did\nNo money _______ I lend you from now on.|shall,will|shall\nNever _______ it snow in this tropical area.|does,do|does\nNo sooner _______ I arrived home than the phone rang.|had,did|had" 
  },
  { 
    i: 't20', t: '20. Mệnh Đề Trạng Ngữ', c: 'bg-orange-300', 
    th: [
      { h: 'I. Định nghĩa & Phân loại', c: '👉 Mệnh đề trạng ngữ là mệnh đề phụ thực hiện chức năng của một trạng từ để bổ nghĩa cho câu thông qua liên từ phụ thuộc.\n📌 Thời gian: When, while (trong khi), by the time (vào lúc), before, after, since, until/till, as soon as (ngay khi), once (một khi).' },
      { h: 'II. MĐTN Nguyên nhân & Mục đích', c: '📌 Nguyên nhân: Because, since, as, seeing that (bởi vì).\n⚠️ Phân biệt: Because + mệnh đề | Because of / Due to + Noun/V-ing.\n📌 Mục đích: So that, in order that (để mà), in case (phòng khi).' },
      { h: 'III. Nhượng bộ, Kết quả & Điều kiện', c: '📌 Nhượng bộ: Although, though, even though (mặc dù) | No matter + từ để hỏi (dù cho).\n⚠️ Phân biệt: In spite of / Despite + Noun/V-ing.\n📌 Kết quả: So + Adj/Adv + that | Such + N + that (quá... đến nỗi mà).\n📌 Điều kiện: If, unless (trừ khi), as long as (miễn là).' }
    ], 
    s: "Once you understand you will find easy|Một khi bạn hiểu bạn sẽ thấy dễ\nWhen it rains I go by bus|Khi trời mưa tôi đi xe buýt\nI learned Japanese while I was there|Tôi học tiếng Nhật trong khi ở đó\nBy the time I finished I m|Lúc hoàn thành tôi đã mệt\nAs long as it is fine play|Chừng nào trời đẹp chúng tôi chơi", 
    e: "_______ you understand this principle, it is easy.|Once,While|Once\n_______ it rains, I usually go to school by bus.|When,Where|When\nI learned Japanese _______ I was living in Tokyo.|while,before|while\n_______ I finished my test, I was exhausted.|By the time,Where|By the time\n_______ it doesn't rain, we can play soccer.|As long as,Where|As long as" 
  },
  { 
    i: 't21', t: '21. 67 Cấu Trúc Thông Dụng', c: 'bg-yellow-200', 
    th: [
      { h: 'I. Các cấu trúc biến đổi câu kinh điển', c: '👉 S + V + too + adj/adv + (for sb) + to-V: Quá... để cho ai làm gì.\n👉 S + V + so + adj/adv + that + clause / It + be + such + a/an + N + that...: Quá... đến nỗi mà.\n👉 Adj/Adv + enough + (for sb) + to-V: Đủ... để làm gì.' },
      { h: 'II. Cấu trúc chỉ thời gian & chi phí', c: '👉 It + takes/took + sb + time + to-V: Mất bao nhiêu thời gian để làm gì.\n👉 S + spend + time/money + V-ing / on St: Dành thời gian/tiền vào việc gì.\n👉 Prefer + V-ing + to + V-ing: Thích làm gì hơn làm gì.\n👉 Would rather + V + than + V: Thích làm gì hơn.' },
      { h: 'III. Cấu trúc đi kèm V-ing phổ biến', c: '👉 Prevent/Stop + sb/sth + from + V-ing: Ngăn cản ai/cái gì làm gì.\n👉 Can’t stand/ help/ bear + V-ing: Không chịu nổi/không nhịn được làm gì.\n👉 Be/get used to + V-ing: Quen với việc làm gì (khác Used to + V-bare: từng làm gì).\n👉 Look forward to + V-ing: Mong chờ, mong đợi làm gì.\n👉 Suggest + V-ing: Đề xuất cùng làm gì.' }
    ], 
    s: "I suggest a white wine with this dish|Tôi đề nghị vang trắng với món này\nMy teacher suggested a course to me|Giáo viên đề xuất khóa học cho tôi\nThe doctor suggests that he lose weights|Bác sĩ đề nghị anh ấy giảm cân\nThis is too easy for you to remember|Điều này quá dễ để bạn nhớ\nThis box is so heavy that I cannot take it|Hộp quá nặng đến nỗi tôi không thể lấy", 
    e: "My teacher suggested I _______ harder.|study,studies|study\nThe professor suggested he _______ the research before March.|summit,summits|summit\nHer leader suggested _______ on time.|being,be|being\nThis box is _______ heavy that I cannot take it.|so,such|so\nShe is old _______ to get married.|enough,too|enough" 
  }
];

// --- THUẬT TOÁN ĐIỀN KHUYẾT & NHÂN BẢN PHẦN TỬ (CHỐNG LỖI MÀN HÌNH TRẮNG 100%) ---
const expandData = (data) => {
  return data.map(topic => {
    // 1. Tách chuỗi dữ liệu an toàn
    let sents = (topic.s || "").split('\n').filter(Boolean).map(line => {
      const parts = line.split('|');
      return { text: parts[0]?.trim() || "Hello", trans: parts[1]?.trim() || "Xin chào" };
    });
    
    let exers = (topic.e || "").split('\n').filter(Boolean).map(line => {
      const parts = line.split('|');
      return { q: parts[0]?.trim() || "?", opts: (parts[1]||"A,B").split(',').map(x=>x.trim()), a: parts[2]?.trim() || "A" };
    });

    if (sents.length === 0) sents = [{ text: "Hello", trans: "Xin chào" }];
    if (exers.length === 0) exers = [{ q: "Question", opts: ["A", "B"], a: "A" }];

    // 2. Nhân bản tự động để đủ 30 câu Game Xếp Chữ
    let fullS = [];
    for(let i=0; i<30; i++) {
       let base = sents[i % sents.length];
       fullS.push({ 
         id: i+1, 
         text: base.text, 
         trans: base.trans + (i >= sents.length ? ` (v${Math.floor(i/sents.length)+1})` : '') 
       });
    }

    // 3. Nhân bản tự động để đủ 30 câu Trắc Nghiệm
    let fullE = [];
    for(let i=0; i<30; i++) {
       let base = exers[i % exers.length];
       fullE.push({ 
         id: i+1, 
         q: base.q + (i >= exers.length ? ` [Câu ${i+1}]` : ''), 
         opts: base.opts, 
         a: base.a 
       });
    }

    return {
      id: topic.i, 
      title: topic.t, 
      color: topic.c, 
      theory: topic.th,
      sentenceGame: fullS, // SỬA LỖI TÊN BIẾN TẠI ĐÂY
      exercises: fullE
    };
  });
};

const parsedData = expandData(CORE_GRAMMAR_DATA);

// --- COMPONENT NÚT BẤM 3D Gamification ---
const Btn3D = ({ onClick, disabled, className, children, color = 'bg-white', shadow = 'border-slate-800' }) => (
  <button onClick={onClick} disabled={disabled} className={`relative inline-flex items-center justify-center font-black transition-all rounded-2xl border-[4px] ${shadow} px-6 py-4 ${disabled ? 'opacity-50 translate-y-[4px] border-b-[4px] cursor-not-allowed' : 'hover:-translate-y-1 active:translate-y-[4px] border-b-[8px] active:border-b-[4px]'} ${color} ${className}`}>
    {children}
  </button>
);

// --- COMPONENT LÝ THUYẾT SKETCHNOTE ---
const SketchnoteTheory = ({ section, idx }) => {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div onClick={() => setOpen(!open)} className="relative bg-white border-[4px] border-slate-800 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#1e293b] mb-10 cursor-pointer hover:-translate-y-1 transition-transform">
      <div className="absolute -top-5 left-6 bg-yellow-300 border-[4px] border-slate-800 px-4 py-1.5 -rotate-2 font-black shadow-[4px_4px_0px_0px_#1e293b] text-lg">
        <BookMarked className="inline w-5 h-5 mr-2"/>{section.h}
      </div>
      <div className="flex justify-between items-center mt-4 border-b-2 border-slate-200 border-dashed pb-3 mb-4">
        <span className="font-bold text-slate-400 text-sm uppercase tracking-widest">{open ? 'Chạm để thu gọn' : 'Chạm để mở rộng'}</span>
        <div className={`p-2 rounded-xl border-[4px] border-slate-800 transition-all ${open ? 'bg-rose-300 rotate-180 translate-y-1 shadow-none' : 'bg-cyan-300 shadow-[2px_2px_0px_0px_#1e293b]'}`}>
          <ChevronDown />
        </div>
      </div>
      {open && (
        <div className="text-slate-800 font-bold leading-relaxed whitespace-pre-wrap text-[16px] md:text-[18px] animate-in slide-in-from-top-4 fade-in duration-300">
          {(section.c || "").split('\n').map((line, i) => {
            if (line.startsWith('👉')) return <div key={i} className="flex items-start gap-2 mb-2"><span className="text-rose-500">👉</span> <span>{line.substring(2)}</span></div>;
            if (line.startsWith('✅') || line.startsWith('❌') || line.startsWith('❓') || line.startsWith('⚠️')) return <div key={i} className="bg-indigo-50 border-[4px] border-slate-800 border-dashed px-4 py-3 rounded-2xl my-3">{line}</div>;
            if (line.trim() === '') return <div key={i} className="h-2"></div>;
            return <p key={i} className="mb-2">{line}</p>;
          })}
        </div>
      )}
    </div>
  );
};

// --- COMPONENT TRỢ LÝ AI (WRITING & SPEAKING) ---
const AiAssistant = ({ topic, sentences }) => {
  const [apiKey, setApiKey] = useState("");
  const [userText, setUserText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [speakingSent, setSpeakingSent] = useState(sentences[0]);
  const [isRec, setIsRec] = useState(false);
  const [score, setScore] = useState(null);

  const checkWriting = async () => {
    if (!apiKey) return alert("Vui lòng nhập Gemini API Key phía trên để AI hoạt động.");
    setLoading(true);
    const prompt = `Giáo viên chấm bài ngữ pháp "${topic.title}". Bài làm: "${userText}". Hãy chấm điểm, sửa lỗi, và cho 2 câu mẫu (Cơ bản + IELTS) bằng tiếng Việt.`;
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      setFeedback(data?.candidates?.[0]?.content?.parts?.[0]?.text || "Lỗi phản hồi từ AI.");
    } catch (e) { setFeedback("Lỗi kết nối hoặc API Key không hợp lệ."); }
    setLoading(false);
  };

  const handleRecord = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Trình duyệt không hỗ trợ thu âm. Vui lòng dùng Google Chrome.");
    const rec = new SR(); rec.lang = 'en-US';
    rec.onstart = () => { setIsRec(true); setScore(null); };
    rec.onresult = (e) => {
      const uText = e.results[0][0].transcript.toLowerCase().replace(/[^\w\s]/g, "");
      const tText = speakingSent.text.toLowerCase().replace(/[^\w\s]/g, "");
      setScore(uText === tText ? 100 : Math.round((tText.split(' ').filter(w => uText.includes(w)).length / tText.split(' ').length) * 100));
    };
    rec.onend = () => setIsRec(false);
    rec.start();
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      <div className="bg-slate-800 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-[4px] border-slate-900 shadow-[6px_6px_0px_0px_#1e293b]">
        <div className="font-bold flex items-center gap-2"><Key className="text-yellow-400"/> Cài Gemini API Key (Bắt buộc cho phần Viết):</div>
        <input type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="Nhập Key vào đây..." className="bg-slate-700 p-3 rounded-2xl outline-none w-full sm:w-1/2 border-[4px] border-slate-600 focus:border-cyan-400"/>
      </div>

      <div className="bg-white rounded-3xl border-[4px] border-slate-800 p-8 shadow-[8px_8px_0px_0px_#1e293b]">
        <h3 className="text-3xl font-black mb-4 flex items-center gap-3"><Edit3 className="text-indigo-600 bg-indigo-100 p-2 rounded-xl border-[4px] border-slate-800"/> Gia Sư Writing</h3>
        <p className="font-bold text-slate-600 mb-4">Gõ 1 câu tiếng Anh, AI sẽ chấm điểm và sửa lỗi cho bạn:</p>
        <textarea value={userText} onChange={e=>setUserText(e.target.value)} className="w-full h-40 border-[4px] border-slate-800 rounded-2xl p-4 font-bold text-xl mb-4 bg-slate-50 focus:bg-white transition-colors outline-none resize-none shadow-inner" placeholder="Cứ mạnh dạn gõ tiếng Anh vào đây..."></textarea>
        <Btn3D onClick={checkWriting} disabled={loading || !userText} color="bg-indigo-500 text-white w-full text-xl">{loading ? 'Đang chấm...' : 'Gửi AI Chấm Bài'}</Btn3D>
        {feedback && <div className="mt-6 bg-indigo-50 p-8 rounded-3xl border-[4px] border-slate-800 font-bold whitespace-pre-wrap leading-relaxed text-lg shadow-[4px_4px_0px_0px_#1e293b]">{feedback}</div>}
      </div>

      <div className="bg-white rounded-3xl border-[4px] border-slate-800 p-8 shadow-[8px_8px_0px_0px_#1e293b] text-center">
        <h3 className="text-3xl font-black mb-6 flex items-center justify-center gap-3"><Mic className="text-rose-500 bg-rose-100 p-2 rounded-xl border-[4px] border-slate-800"/> Luyện Speaking</h3>
        <div className="bg-cyan-50 p-8 rounded-3xl border-[4px] border-slate-800 mb-8 shadow-inner">
          <p className="text-3xl md:text-4xl font-black mb-4 text-slate-900">"{speakingSent.text}"</p>
          <p className="font-bold text-slate-500 text-xl italic">({speakingSent.trans})</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Btn3D onClick={() => window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakingSent.text))} color="bg-cyan-300 text-slate-900"><Volume2 className="mr-2"/> Nghe Mẫu</Btn3D>
          <Btn3D onClick={handleRecord} color={isRec ? 'bg-rose-500 text-white' : 'bg-rose-300 text-slate-900'}><Mic className={`mr-2 ${isRec ? 'animate-pulse' : ''}`}/> {isRec ? 'Đang thu...' : 'Bấm Đọc'}</Btn3D>
          <Btn3D onClick={() => setSpeakingSent(sentences[Math.floor(Math.random()*sentences.length)])} color="bg-slate-200 text-slate-900"><Shuffle className="mr-2"/> Đổi Câu</Btn3D>
        </div>
        {score !== null && (
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl font-black text-2xl border-[4px] border-slate-800 shadow-inner">
             Độ chuẩn xác: <span className={score>70?'text-emerald-500 text-4xl':'text-rose-500 text-4xl'}> {score}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- COMPONENT XẾP CÂU PHẢN XẠ ---
const SentenceBuilder = ({ sentences, setGlobalProgress }) => {
  const [qIdx, setQIdx] = useState(0);
  const [avail, setAvail] = useState([]);
  const [sel, setSel] = useState([]);
  const [correct, setCorrect] = useState(null);
  const curr = sentences[qIdx];

  useEffect(() => {
    if(curr) { setAvail(curr.text.split(' ').sort(()=>Math.random()-0.5).map((w,i)=>({id:i, w}))); setSel([]); setCorrect(null); }
  }, [qIdx, curr]);

  const toggle = (w, isSel) => {
    if(isSel) { setSel(sel.filter(x=>x.id!==w.id)); setAvail([...avail, w]); }
    else { setAvail(avail.filter(x=>x.id!==w.id)); setSel([...sel, w]); }
  };

  const check = () => {
    if(sel.map(x=>x.w).join(' ') === curr.text) { 
      setCorrect(true); setGlobalProgress(p => p + 2); window.speechSynthesis.speak(new SpeechSynthesisUtterance(curr.text)); 
    } else setCorrect(false);
  };

  if(!curr) return <div className="p-10 font-bold text-slate-500">Đang tải thẻ học...</div>;

  if(qIdx >= 10) return <div className="text-center font-black text-3xl mt-10">Hoàn thành vòng chơi! <br/><Btn3D onClick={()=>setQIdx(0)} className="mt-6">Chơi Lại</Btn3D></div>

  return (
    <div className="bg-white rounded-[3rem] border-[4px] border-slate-800 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b]">
      <div className="flex justify-between items-center font-black mb-6 text-xl border-b-4 border-slate-100 pb-4 border-dashed">
         <span className="flex items-center gap-2"><Target className="text-rose-500"/> Xếp Câu Phản Xạ</span>
         <span className="bg-white border-2 border-slate-800 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b]">{qIdx+1}/10</span>
      </div>
      <div className="bg-cyan-100 p-8 rounded-3xl border-[4px] border-slate-800 mb-8 font-black text-2xl md:text-3xl text-center shadow-[4px_4px_0px_0px_#1e293b]">"{curr.trans}"</div>
      
      <div className="min-h-[120px] bg-slate-50 border-[4px] border-dashed border-slate-300 rounded-3xl p-6 flex flex-wrap gap-3 mb-8">
        {sel.map(w => <Btn3D key={w.id} onClick={()=>toggle(w,true)} color="bg-white" className="text-xl md:text-2xl px-5 py-3 shadow-[2px_2px_0px_0px_#1e293b]">{w.w}</Btn3D>)}
      </div>
      
      <div className="bg-indigo-50 border-[4px] border-slate-800 rounded-3xl p-8 flex flex-wrap justify-center gap-4 mb-10 shadow-[4px_4px_0px_0px_#1e293b]">
        {avail.map(w => <Btn3D key={w.id} onClick={()=>toggle(w,false)} color="bg-indigo-200" className="text-xl md:text-2xl px-5 py-3 shadow-[2px_2px_0px_0px_#1e293b]">{w.w}</Btn3D>)}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
         <Btn3D onClick={check} disabled={sel.length===0} color="bg-slate-800 text-white w-full text-2xl">Kiểm Tra</Btn3D>
         {correct && <Btn3D onClick={()=>setQIdx(prev=>prev+1)} color="bg-emerald-400 text-slate-900 w-full text-2xl">Tiếp Tục ➔</Btn3D>}
      </div>
      {correct === false && <p className="text-rose-600 font-black mt-6 text-center text-2xl animate-bounce">Chưa đúng, hãy click vào chữ để gỡ xuống!</p>}
    </div>
  );
};

// --- COMPONENT TRẮC NGHIỆM DUOLINGO ---
const QuizEngine = ({ exercises, setGlobalProgress }) => {
  const [qIdx, setQIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState(0);
  
  const curr = exercises && exercises.length > 0 ? exercises[qIdx] : null;

  const check = () => { if(sel===curr.a) { setStatus('true'); setScore(s=>s+1); setGlobalProgress(p => p + 1); } else setStatus('false'); };
  const next = () => { setStatus('idle'); setSel(null); setQIdx(prev=>prev+1); };

  if(!curr) return <div className="p-10 font-bold text-slate-500">Đang tải câu hỏi...</div>;
  if(qIdx >= 30) return <div className="text-center font-black text-3xl mt-10">Điểm của bạn: {score}/30 <br/><Btn3D onClick={()=>{setQIdx(0);setScore(0)}} className="mt-6">Làm Lại</Btn3D></div>;

  return (
    <div className="bg-white rounded-[3rem] border-[4px] border-slate-800 p-8 md:p-10 shadow-[8px_8px_0px_0px_#1e293b]">
       <div className="flex justify-between items-center font-black mb-8 text-xl border-b-4 border-slate-100 pb-4 border-dashed">
          <span className="flex items-center gap-2"><PenTool className="text-emerald-500"/> Làm Test</span>
          <span className="bg-yellow-300 border-2 border-slate-800 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#1e293b]">{qIdx+1}/30</span>
       </div>
       <p className="font-black text-3xl mb-8 leading-relaxed">{curr.q}</p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {curr.opts.map((o,i) => (
             <button key={i} disabled={status!=='idle'} onClick={()=>setSel(o)} className={`p-5 rounded-2xl border-[4px] text-2xl font-bold text-left transition-all ${sel===o ? 'border-indigo-600 bg-indigo-100 shadow-[3px_3px_0px_0px_#4f46e5] translate-y-1 border-b-[4px]' : 'border-slate-800 bg-white hover:bg-slate-50 shadow-[4px_4px_0px_0px_#1e293b] border-b-[8px]'}`}>
                {o}
             </button>
          ))}
       </div>
       <div className="flex gap-4">
         {status==='idle' ? <Btn3D onClick={check} disabled={!sel} color="bg-slate-800 text-white w-full text-2xl">Kiểm Tra</Btn3D> 
                          : <Btn3D onClick={next} color="bg-emerald-400 text-slate-900 w-full text-2xl">Tiếp Theo ➔</Btn3D>}
       </div>
       {status==='false' && <p className="text-rose-600 font-black mt-6 text-2xl animate-shake">Sai rồi. Đáp án đúng: <span className="underline">{curr.a}</span></p>}
       {status==='true' && <p className="text-emerald-600 font-black mt-6 text-2xl">Chính xác! 🎉</p>}
    </div>
  );
};


// --- TRANG CHÍNH APP ---
export default function App() {
  const [appMode, setAppMode] = useState('grammar');
  const [topicId, setTopicId] = useState(null);
  const [tab, setTab] = useState('theory');
  const [menu, setMenu] = useState(false);
  const [xp, setXp] = useState(0);

  const topic = parsedData.find(t => t.id === topicId);

  return (
    <div className="min-h-screen bg-[#f4f0ec] flex flex-col md:flex-row font-sans text-slate-800 selection:bg-yellow-300">
      
      <div className="md:hidden bg-white border-b-4 border-slate-800 p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
        <div className="font-black text-xl flex items-center gap-2"><BookOpen className="bg-yellow-300 rounded-md p-1"/> Grammar Pro</div>
        <button onClick={()=>setMenu(!menu)} className="border-2 border-slate-800 p-1 rounded-lg shadow-sm"><Menu/></button>
      </div>

      <aside className={`${menu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky top-0 h-screen w-80 md:w-96 bg-[#fdfbf7] border-r-[4px] border-slate-800 z-40 transition-transform flex flex-col shadow-[4px_0_0_0_#1e293b]`}>
         <div className="p-6 border-b-[4px] border-slate-800 bg-white font-black text-2xl hidden md:flex items-center gap-3"><BookOpen size={36} className="bg-yellow-300 p-2 rounded-xl border-[4px] border-slate-800 shadow-[4px_4px_0px_0px_#1e293b]"/> Grammar Pro</div>
         <div className="p-6 border-b-2 border-slate-100 font-black text-emerald-700 bg-emerald-50 flex justify-between items-center text-lg"><span className="flex items-center gap-2"><Flame className="text-rose-500"/> Năng lượng:</span> <span>{xp} XP</span></div>
         
         {/* --- 2 NÚT CHUYỂN ĐỔI CHẾ ĐỘ THÊM VÀO ĐÂY --- */}
         <div className="flex flex-col gap-2 p-4 border-b-[4px] border-slate-200 bg-white">
           <button 
             onClick={() => setAppMode('grammar')}
             className={`p-3 font-black border-4 border-slate-800 rounded-xl transition-all ${appMode === 'grammar' ? 'bg-yellow-300 shadow-none translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#1e293b]'}`}
           >
             📖 HỌC NGỮ PHÁP
           </button>
           <button 
             onClick={() => {setAppMode('vocab'); setMenu(false);}}
             className={`p-3 font-black border-4 border-slate-800 rounded-xl transition-all ${appMode === 'vocab' ? 'bg-green-400 text-white shadow-none translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#1e293b]'}`}
           >
             🔥 3000 TỪ VỰNG
           </button>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24 custom-scrollbar">
            {/* Nếu đang ở chế độ Ngữ Pháp mới hiện danh sách bài */}
            {appMode === 'grammar' && (
              <>
                <button onClick={()=>{setTopicId(null); setMenu(false)}} className={`w-full text-left font-black p-4 border-[4px] border-slate-800 rounded-2xl mb-2 text-lg transition-all ${!topicId ? 'bg-cyan-200 shadow-[4px_4px_0px_0px_#1e293b] translate-x-2' : 'bg-white hover:bg-slate-50'}`}>🏠 Trang Chủ</button>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2 mb-2 mt-4">21 Chuyên Đề Ngữ Pháp</div>
                {parsedData.map(t => (
                  <button key={t.id} onClick={()=>{setTopicId(t.id); setMenu(false); setTab('theory')}} className={`w-full text-left font-bold p-4 border-[4px] border-slate-800 rounded-2xl truncate text-lg transition-all ${topicId===t.id ? 'bg-yellow-200 translate-x-2 shadow-[2px_2px_0px_0px_#1e293b]' : 'bg-white hover:bg-slate-50'}`}>
                    {t.title}
                  </button>
                ))}
              </>
            )}
         </div>
      </aside>
      {menu && <div className="fixed inset-0 bg-slate-900/50 z-30 md:hidden" onClick={()=>setMenu(false)}/>}

      <main className="flex-1 p-4 md:p-10 h-screen overflow-y-auto bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]">
        {/* NẾU LÀ TỪ VỰNG -> GỌI FILE VOCAB RA */}
        {appMode === 'vocab' ? (
           <Vocab />
        ) : (
           /* NẾU LÀ NGỮ PHÁP -> HIỆN GIAO DIỆN CŨ */
           <div className="max-w-4xl mx-auto">
             {!topicId ? (
               <div className="bg-white border-[4px] border-slate-800 rounded-[3rem] p-10 text-center shadow-[12px_12px_0_0_#1e293b] mt-10">
                  <Trophy size={100} className="mx-auto text-yellow-400 mb-8 fill-yellow-300"/>
                  <h2 className="text-5xl font-black mb-6 uppercase">Welcome Grammar Pro!</h2>
                  <p className="font-bold text-2xl text-slate-600 mb-10 leading-relaxed bg-yellow-100 p-4 rounded-2xl border-4 border-slate-800">Cỗ máy luyện Ngữ Pháp và Từ Vựng Tiếng Anh siêu cấp</p>
                  <Btn3D onClick={()=>setMenu(true)} className="md:hidden w-full text-2xl" color="bg-slate-800 text-white">Mở Menu Học Ngay</Btn3D>
               </div>
             ) : (
               <div className="animate-in fade-in">
                  <div className={`${topic.color} border-[4px] border-slate-800 rounded-[3rem] p-8 md:p-10 mb-10 shadow-[12px_12px_0_0_#1e293b]`}>
                     <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{topic.title}</h2>
                  </div>
                  
                  <div className="flex overflow-x-auto gap-3 mb-10 pb-2 scrollbar-hide">
                     <button onClick={()=>setTab('theory')} className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] ${tab==='theory'?'bg-slate-800 text-white translate-y-1 shadow-none':'bg-white hover:bg-slate-50'}`}>Lý Thuyết</button>
                     <button onClick={()=>setTab('sentence')} className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] ${tab==='sentence'?'bg-slate-800 text-white translate-y-1 shadow-none':'bg-white hover:bg-slate-50'}`}>Xếp Câu</button>
                     <button onClick={()=>setTab('ai')} className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] ${tab==='ai'?'bg-yellow-300 text-slate-900 translate-y-1 shadow-none':'bg-white hover:bg-slate-50'}`}>Gia Sư AI</button>
                     <button onClick={()=>setTab('exercise')} className={`font-black px-6 py-4 text-lg rounded-2xl border-[4px] border-slate-800 whitespace-nowrap transition-all shadow-[4px_4px_0px_0px_#1e293b] ${tab==='exercise'?'bg-slate-800 text-white translate-y-1 shadow-none':'bg-white hover:bg-slate-50'}`}>Làm Test</button>
                  </div>

                  {tab==='theory' && topic.theory.map((s,i) => <SketchnoteTheory key={i} section={s} idx={i}/>)}
                  {tab==='sentence' && <SentenceBuilder sentences={topic.sentenceGame} setGlobalProgress={setXp}/>}
                  {tab==='ai' && <AiAssistant topic={topic} sentences={topic.sentenceGame}/>}
                  {tab==='exercise' && <QuizEngine exercises={topic.exercises} setGlobalProgress={setXp}/>}
               </div>
             )}
           </div>
        )}
      </main>
    </div>
  );
}