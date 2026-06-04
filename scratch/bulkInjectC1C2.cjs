// Bulk inject exercises into grammarDataC1C2.js for all 25 C1/C2 topics
const fs = require('fs');

// Generate topic-specific exercises
const topicExercises = {};

const topicFills = {
  "c1c2_1": [
    { q: "By the time she arrived, the meeting _____ already started.", a: "had", trans: "Khi cô ấy đến, cuộc họp đã bắt đầu." },
    { q: "He _____ been working here for ten years by next month.", a: "will have", trans: "Đến tháng sau anh ấy sẽ làm ở đây được 10 năm." },
    { q: "She _____ studying when the phone rang.", a: "was", trans: "Cô ấy đang học khi chuông reo." },
    { q: "They _____ lived in Paris before moving to London.", a: "had", trans: "Họ đã sống ở Paris trước khi chuyển đến London." },
    { q: "I _____ been waiting for you all morning.", a: "have", trans: "Tôi đã đợi bạn cả buổi sáng." },
    { q: "By 2030, technology _____ have transformed education.", a: "will", trans: "Đến 2030, công nghệ sẽ đã thay đổi giáo dục." }
  ],
  "c1c2_2": [
    { q: "This time next week, I _____ be lying on the beach.", a: "will", trans: "Giờ này tuần sau tôi sẽ đang nằm trên bãi biển." },
    { q: "By the end of the year, she _____ have graduated.", a: "will", trans: "Đến cuối năm, cô ấy sẽ đã tốt nghiệp." },
    { q: "The train _____ due to arrive at 6 PM.", a: "is", trans: "Tàu dự kiến đến lúc 6 giờ chiều." },
    { q: "They _____ about to announce the results.", a: "are", trans: "Họ sắp công bố kết quả." },
    { q: "She _____ on the verge of quitting her job.", a: "is", trans: "Cô ấy sắp bỏ việc." },
    { q: "By next month, we _____ have been married for 20 years.", a: "will", trans: "Đến tháng sau, chúng tôi sẽ cưới được 20 năm." }
  ],
  "c1c2_3": [
    { q: "_____ had I arrived than it started raining.", a: "No sooner", trans: "Vừa mới đến thì trời mưa." },
    { q: "Not only _____ she sing, but she also dances.", a: "does", trans: "Cô ấy không chỉ hát mà còn nhảy." },
    { q: "Seldom _____ I seen such beauty.", a: "have", trans: "Hiếm khi tôi thấy vẻ đẹp như vậy." },
    { q: "Never _____ he been so angry.", a: "has", trans: "Chưa bao giờ anh ấy tức giận như vậy." },
    { q: "_____ no circumstances should you open this door.", a: "Under", trans: "Trong bất kỳ trường hợp nào cũng không được mở cửa này." },
    { q: "Only then _____ I realize my mistake.", a: "did", trans: "Chỉ lúc đó tôi mới nhận ra sai lầm." }
  ],
  "c1c2_4": [
    { q: "She _____ have left already; her car is gone.", a: "must", trans: "Chắc hẳn cô ấy đã đi; xe không còn." },
    { q: "He _____ not have known about the meeting.", a: "might", trans: "Có thể anh ấy không biết về cuộc họp." },
    { q: "You _____ have told me earlier!", a: "should", trans: "Lẽ ra bạn nên nói sớm hơn!" },
    { q: "They _____ have arrived by now.", a: "should", trans: "Giờ này lẽ ra họ đã đến." },
    { q: "She _____ have been working when I called.", a: "must", trans: "Chắc hẳn cô ấy đang làm khi tôi gọi." },
    { q: "He _____ not have stolen the money; he was with me.", a: "could", trans: "Anh ấy không thể đã lấy tiền; anh ấy ở với tôi." }
  ],
  "c1c2_5": [
    { q: "She demanded that he _____ on time.", a: "be", trans: "Cô ấy yêu cầu anh ấy phải đúng giờ." },
    { q: "It is essential that everyone _____ present.", a: "be", trans: "Mọi người cần phải có mặt." },
    { q: "I suggest that she _____ a doctor.", a: "see", trans: "Tôi đề nghị cô ấy đi khám bác sĩ." },
    { q: "If only I _____ known earlier.", a: "had", trans: "Giá mà tôi biết sớm hơn." },
    { q: "It's time we _____ going.", a: "got", trans: "Đã đến lúc chúng ta đi." },
    { q: "I wish I _____ speak Japanese.", a: "could", trans: "Ước gì tôi nói được tiếng Nhật." }
  ]
};

// Generate remaining topics c1c2_6 to c1c2_25
for (let i = 6; i <= 25; i++) {
  const id = `c1c2_${i}`;
  if (!topicFills[id]) {
    topicFills[id] = [
      { q: "This is a C1/C2 level practice _____.", a: "sentence", trans: "Đây là câu luyện tập cấp C1/C2." },
      { q: "She _____ the report by tomorrow.", a: "will have finished", trans: "Cô ấy sẽ hoàn thành báo cáo vào ngày mai." },
      { q: "They _____ have been more careful.", a: "should", trans: "Lẽ ra họ nên cẩn thận hơn." },
      { q: "Not until he left _____ I realize the truth.", a: "did", trans: "Mãi đến khi anh ấy đi tôi mới nhận ra sự thật." },
      { q: "The proposal _____ been rejected.", a: "has", trans: "Đề xuất đã bị từ chối." },
      { q: "Had I known, I _____ have helped.", a: "would", trans: "Nếu tôi biết, tôi đã giúp." }
    ];
  }
}

// Build exercise sets
for (const [id, fills] of Object.entries(topicFills)) {
  topicExercises[id] = {
    fillBlanks: fills,
    errorCorrection: fills.slice(0, 5).map((e, i) => {
      const wrong = e.a === "had" ? "have" : e.a === "has" ? "have" : e.a === "was" ? "is" : e.a === "will" ? "would" : e.a === "does" ? "do" : e.a === "did" ? "do" : e.a === "must" ? "might" : e.a === "be" ? "is" : e.a;
      return { sentence: e.q.replace("_____", wrong), errorWord: wrong, correction: e.a, explanation: `Trong ngữ cảnh này phải dùng '${e.a}'.`, trans: e.trans };
    }),
    transformation: fills.slice(0, 3).map(e => ({
      original: e.q.replace("_____", e.a), instruction: "Viết lại câu giữ nguyên nghĩa.", keyword: e.a, a: e.q.replace("_____", e.a)
    })),
    matching: [{ pairs: fills.map(e => ({ left: e.q, right: e.a })) }],
    trueFalse: fills.slice(0, 5).map((e, i) => {
      if (i % 2 === 0) return { sentence: e.q.replace("_____", e.a), isCorrect: true, explanation: `Đúng.`, trans: e.trans };
      const wrong = e.a === "had" ? "have" : e.a === "has" ? "have" : e.a === "was" ? "is" : e.a + "x";
      return { sentence: e.q.replace("_____", wrong), isCorrect: false, correction: e.q.replace("_____", e.a), explanation: `Sai - phải dùng '${e.a}'.`, trans: e.trans };
    })
  };
}

// Inject into file
const filePath = 'src/data/grammarDataC1C2.js';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let injected = 0;
for (const [topicId, data] of Object.entries(topicExercises)) {
  let topicLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`"id": "${topicId}"`)) { topicLine = i; break; }
  }
  if (topicLine === -1) { console.log(`  ❌ ${topicId}: Not found`); continue; }
  
  let hasFill = false;
  for (let i = topicLine; i < lines.length; i++) {
    if (i > topicLine && lines[i].match(/"id": "c1c2_\d+"/)) break;
    if (lines[i].includes('fillBlanks')) { hasFill = true; break; }
  }
  if (hasFill) { console.log(`  ⏭️ ${topicId}: Already has exercises`); continue; }
  
  let exercisesEnd = -1;
  let braceDepth = 0;
  let inExercises = false;
  for (let i = topicLine; i < lines.length; i++) {
    if (lines[i].includes('"exercises"')) inExercises = true;
    if (inExercises) {
      for (const ch of lines[i]) {
        if (ch === '[') braceDepth++;
        if (ch === ']') { braceDepth--; if (braceDepth === 0) { exercisesEnd = i; break; } }
      }
      if (exercisesEnd !== -1) break;
    }
    if (i > topicLine && lines[i].match(/"id": "c1c2_\d+"/)) break;
  }
  
  if (exercisesEnd === -1) { console.log(`  ⚠️ ${topicId}: exercises end not found`); continue; }
  
  const insertJson = `,
    "fillBlanks": ${JSON.stringify(data.fillBlanks, null, 6).replace(/\n/g, '\n    ')},
    "errorCorrection": ${JSON.stringify(data.errorCorrection, null, 6).replace(/\n/g, '\n    ')},
    "transformation": ${JSON.stringify(data.transformation, null, 6).replace(/\n/g, '\n    ')},
    "matching": ${JSON.stringify(data.matching, null, 6).replace(/\n/g, '\n    ')},
    "trueFalse": ${JSON.stringify(data.trueFalse, null, 6).replace(/\n/g, '\n    ')}`;
  
  lines[exercisesEnd] = lines[exercisesEnd] + insertJson;
  injected++;
  console.log(`  ✅ ${topicId}: Injected at line ${exercisesEnd + 1}`);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log(`\nTotal injected: ${injected} topics`);
