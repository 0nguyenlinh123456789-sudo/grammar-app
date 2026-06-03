import fs from 'fs';

const files = [
  'generate_preint_data.js',
  'generate_preint_data_51_75.js',
  'generate_preint_data_76_100.js'
];

const newDiscoveryCornerLogic = "  const families = words.slice(0, 3).map(w => {\\n" +
"    let related = [];\\n" +
"    if (w.type.includes('Động từ')) related.push(w.word + 'er (Danh từ)');\\n" +
"    if (w.type.includes('Danh từ')) related.push(w.word + 'ful (Tính từ)');\\n" +
"    if (w.type.includes('Tính từ')) related.push(w.word + 'ly (Trạng từ)');\\n" +
"    return {\\n" +
"      title: 'Họ từ (Word Family) của \"' + w.word + '\"',\\n" +
"      value: related.length ? related.join(', ') : 'Các dạng từ loại khác của \"' + w.word + '\" đang được cập nhật.'\\n" +
"    };\\n" +
"  });\\n\\n" +
"  const collocations = words.slice(3, 6).map(w => {\\n" +
"    let colls = [];\\n" +
"    if (w.type.includes('Danh từ')) colls = ['have a ' + w.word, 'make a ' + w.word, 'good ' + w.word];\\n" +
"    if (w.type.includes('Động từ')) colls = [w.word + ' quickly', 'always ' + w.word];\\n" +
"    if (w.type.includes('Tính từ')) colls = ['very ' + w.word, 'extremely ' + w.word];\\n" +
"    return {\\n" +
"      title: 'Cụm từ (Collocations) với \"' + w.word + '\"',\\n" +
"      value: colls.length ? 'Ví dụ: ' + colls.join(', ') : 'Cụm từ liên quan đến ' + w.word\\n" +
"    };\\n" +
"  });\\n\\n" +
"  discoveryCornerList = [\\n" +
"    {\\n" +
"      heading: '💡 Góc khám phá: Word Families (Họ từ)',\\n" +
"      intro: 'Mở rộng vốn từ vựng bằng cách học các từ cùng gốc của Unit ' + unitNum + ':',\\n" +
"      details: families\\n" +
"    },\\n" +
"    {\\n" +
"      heading: '🔥 Góc khám phá: Collocations (Cụm từ đi kèm)',\\n" +
"      intro: 'Học cách sử dụng từ tự nhiên như người bản xứ:',\\n" +
"      details: collocations\\n" +
"    }\\n" +
"  ];";

const newCompileTextbookExercises = "function compileTextbookExercises(unit) {\\n" +
"  const { unitNum, words, buckets } = unit;\\n" +
"  if (!words || words.length < 8) return [];\\n\\n" +
"  // Ex 1: Fill in blanks\\n" +
"  const ex1 = {\\n" +
"    exNum: unitNum + '.1',\\n" +
"    type: 'fill_in_blanks',\\n" +
"    instruction: 'Điền từ tiếng Anh thích hợp vào chỗ trống dựa trên gợi ý nghĩa tiếng Việt:',\\n" +
"    questions: words.slice(0, 4).map((w, idx) => {\\n" +
"      let sentence = w.example;\\n" +
"      const regex = new RegExp('\\\\b' + w.word + '\\\\b', 'gi');\\n" +
"      if (regex.test(sentence)) {\\n" +
"        sentence = sentence.replace(regex, '[blank]');\\n" +
"      } else {\\n" +
"        sentence = 'The correct word is [blank].';\\n" +
"      }\\n" +
"      return {\\n" +
"        id: 'ex_' + unitNum + '_1_' + idx,\\n" +
"        text: sentence,\\n" +
"        answers: [w.word],\\n" +
"        hint: w.vi,\\n" +
"        explanation: 'Từ cần điền là \"' + w.word + '\" (' + w.type + '), mang nghĩa là \"' + w.vi + '\".'\\n" +
"      };\\n" +
"    })\\n" +
"  };\\n\\n" +
"  // Ex 2: Matching\\n" +
"  const ex2 = {\\n" +
"    exNum: unitNum + '.2',\\n" +
"    type: 'matching',\\n" +
"    instruction: 'Ghép các từ tiếng Anh ở cột trái với nghĩa tiếng Việt tương ứng ở cột phải:',\\n" +
"    questions: words.slice(4, 8).map((w, idx) => {\\n" +
"      return {\\n" +
"        id: 'ex_' + unitNum + '_2_' + idx,\\n" +
"        text: w.word,\\n" +
"        options: words.slice(4, 8).map(x => x.vi).sort(() => Math.random() - 0.5),\\n" +
"        answer: w.vi,\\n" +
"        explanation: 'Từ \"' + w.word + '\" có nghĩa chính xác là \"' + w.vi + '\".'\\n" +
"      };\\n" +
"    })\\n" +
"  };\\n\\n" +
"  // Ex 3: Categorization\\n" +
"  const categories = Array.from(new Set(words.map(w => buckets[w.bucket])));\\n" +
"  const ex3 = {\\n" +
"    exNum: unitNum + '.3',\\n" +
"    type: 'categorization',\\n" +
"    instruction: 'Phân loại các từ vựng sau vào đúng nhóm chủ đề của bài học:',\\n" +
"    categories: categories,\\n" +
"    questions: words.map((w, idx) => ({\\n" +
"      id: 'ex_' + unitNum + '_3_' + idx,\\n" +
"      word: w.word,\\n" +
"      category: buckets[w.bucket],\\n" +
"      explanation: 'Từ \"' + w.word + '\" (' + w.vi + ') thuộc nhóm chủ đề \"' + buckets[w.bucket] + '\".'\\n" +
"    }))\\n" +
"  };\\n\\n" +
"  // Ex 4: Error correction\\n" +
"  const ex4 = {\\n" +
"    exNum: unitNum + '.4',\\n" +
"    type: 'error_correction',\\n" +
"    instruction: 'Tìm và sửa lỗi sai trong các câu sau (Chú ý chính tả và ngữ pháp):',\\n" +
"    questions: words.slice(2, 4).map((w, idx) => {\\n" +
"      let badWord = w.word + 's';\\n" +
"      if (w.word.endsWith('s')) badWord = w.word.slice(0, -1);\\n" +
"      let badExample = w.example.replace(new RegExp('\\\\b' + w.word + '\\\\b', 'i'), badWord);\\n" +
"      if (badExample === w.example) badExample = 'I really like ' + badWord + '.';\\n" +
"      return {\\n" +
"        id: 'ex_' + unitNum + '_4_' + idx,\\n" +
"        original: badExample,\\n" +
"        correct: w.example,\\n" +
"        explanation: 'Từ viết đúng chính tả/ngữ pháp phải là \"' + w.word + '\" thay vì \"' + badWord + '\".'\\n" +
"      };\\n" +
"    })\\n" +
"  };\\n\\n" +
"  // Ex 5: Fill in blanks (Mixed)\\n" +
"  const ex5 = {\\n" +
"    exNum: unitNum + '.5',\\n" +
"    type: 'fill_in_blanks',\\n" +
"    instruction: 'Ôn tập tổng hợp: Điền từ thích hợp vào chỗ trống:',\\n" +
"    questions: words.slice(4, 8).map((w, idx) => {\\n" +
"      let sentence = w.example;\\n" +
"      const regex = new RegExp('\\\\b' + w.word + '\\\\b', 'gi');\\n" +
"      if (regex.test(sentence)) {\\n" +
"        sentence = sentence.replace(regex, '[blank]');\\n" +
"      } else {\\n" +
"        sentence = 'This [blank] is very important.';\\n" +
"      }\\n" +
"      return {\\n" +
"        id: 'ex_' + unitNum + '_5_' + idx,\\n" +
"        text: sentence,\\n" +
"        answers: [w.word],\\n" +
"        hint: w.vi,\\n" +
"        explanation: 'Từ cần điền là \"' + w.word + '\" (' + w.type + ').'\\n" +
"      };\\n" +
"    })\\n" +
"  };\\n\\n" +
"  return [ex1, ex2, ex3, ex4, ex5];\\n" +
"}\\n";

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    const discoveryRegex = /discoveryCornerList\s*=\s*\[[\s\S]*?\];\s*(?=\s*const theory\s*=)/;
    if (discoveryRegex.test(content)) {
      content = content.replace(discoveryRegex, newDiscoveryCornerLogic + "\\n");
      console.log('Updated discovery corner in ' + file);
    } else {
      console.log('Could not find discovery corner block in ' + file);
    }

    const funcRegex = /function compileTextbookExercises\(unit\) \{[\s\S]*?\}\s*$/;
    if (funcRegex.test(content)) {
      content = content.replace(funcRegex, newCompileTextbookExercises);
      console.log('Updated compileTextbookExercises in ' + file);
    } else {
      console.log('Could not find compileTextbookExercises in ' + file);
    }

    fs.writeFileSync(file, content, 'utf8');
  } else {
    console.log('File ' + file + ' does not exist.');
  }
});
