import fs from 'fs';
import path from 'path';

// Files to upgrade
const filesToUpgrade = [
  { name: 'oxfordData.js', varName: 'courseData' },
  { name: 'oxfordDataPart2.js', varName: 'courseData' },
  { name: 'oxfordDataPart3.js', varName: 'courseData' }
];

async function upgrade() {
  for (const fileDef of filesToUpgrade) {
    console.log(`Processing ${fileDef.name}...`);
    
    // Dynamically import the data
    const filePathUrl = `file:///${path.resolve(`src/data/${fileDef.name}`).replace(/\\/g, '/')}`;
    const module = await import(filePathUrl);
    const oldCourseData = module[fileDef.varName];
    
    const newCourseData = oldCourseData.map(unit => {
      // If already upgraded, skip
      if (unit.theory && !Array.isArray(unit.theory)) {
        return unit;
      }
      
      const oldTheoryArray = unit.theory || [];
      const words = oldTheoryArray.flatMap(group => group.items || []);
      
      // 1. Core Vocab
      const coreVocab = words.map((w, index) => {
        let colls = [];
        if (w.type && w.type.includes('Danh từ')) colls = [`have a ${w.word}`, `use ${w.word}`];
        if (w.type && w.type.includes('Động từ')) colls = [`${w.word} something`, `always ${w.word}`];
        if (w.type && w.type.includes('Tính từ')) colls = [`very ${w.word}`, `extremely ${w.word}`];
        
        return {
          word: w.word,
          type: w.type || 'Từ vựng',
          phonetic: w.phonetic || '',
          vi: w.vi || '',
          example: w.example || '',
          bucket: (index % 2) + 1,
          collocations: colls,
          wordFamily: `Biến thể của ${w.word}`
        };
      });

      // 2. Practical Usage
      const practicalUsage = oldTheoryArray.map(group => ({
        heading: `💬 Thực hành: ${group.heading}`,
        intro: `Các mẫu câu thông dụng:`,
        details: (group.items || []).map(w => ({
          title: w.word,
          value: `👉 ${w.example}`
        }))
      }));

      // 3. Discovery Corner
      const families = words.slice(0, 3).map(w => {
        let related = [];
        if (w.type && w.type.includes('Động từ')) related.push(`${w.word}er (Danh từ)`);
        if (w.type && w.type.includes('Danh từ')) related.push(`${w.word}ful (Tính từ)`);
        if (w.type && w.type.includes('Tính từ')) related.push(`${w.word}ly (Trạng từ)`);
        return {
          title: `Họ từ (Word Family) của "${w.word}"`,
          value: related.length ? related.join(', ') : `Các dạng từ loại khác của "${w.word}" đang được cập nhật.`
        };
      });

      const collocations = words.slice(3, 6).map(w => {
        let colls = [];
        if (w.type && w.type.includes('Danh từ')) colls = [`have a ${w.word}`, `make a ${w.word}`, `good ${w.word}`];
        if (w.type && w.type.includes('Động từ')) colls = [`${w.word} quickly`, `always ${w.word}`];
        if (w.type && w.type.includes('Tính từ')) colls = [`very ${w.word}`, `extremely ${w.word}`];
        return {
          title: `Cụm từ (Collocations) với "${w.word}"`,
          value: colls.length ? `Ví dụ: ${colls.join(', ')}` : `Cụm từ liên quan đến ${w.word}`
        };
      });

      const discoveryCorner = [
        {
          heading: `💡 Góc khám phá: Word Families (Họ từ)`,
          intro: `Mở rộng vốn từ vựng bằng cách học các từ cùng gốc của Unit này:`,
          details: families
        },
        {
          heading: `🔥 Góc khám phá: Collocations (Cụm từ đi kèm)`,
          intro: `Học cách sử dụng từ tự nhiên như người bản xứ:`,
          details: collocations
        }
      ];

      // 4. Textbook Exercises
      let textbookExercises = [];
      if (words.length >= 8) {
        // Build 5 Dynamic Exercises
        const ex1 = {
          exNum: `${unit.id}.1`,
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
              id: `ex_${unit.id}_1_${idx}`,
              text: sentence,
              answers: [w.word],
              hint: w.vi,
              explanation: `Từ cần điền là "${w.word}", mang nghĩa là "${w.vi}".`
            };
          })
        };

        const ex2 = {
          exNum: `${unit.id}.2`,
          type: 'matching',
          instruction: "Ghép các từ tiếng Anh ở cột trái với nghĩa tiếng Việt tương ứng ở cột phải:",
          questions: words.slice(4, 8).map((w, idx) => {
            return {
              id: `ex_${unit.id}_2_${idx}`,
              text: w.word,
              options: words.slice(4, 8).map(x => x.vi).sort(() => Math.random() - 0.5),
              answer: w.vi,
              explanation: `Từ "${w.word}" có nghĩa chính xác là "${w.vi}".`
            };
          })
        };

        const ex3 = {
          exNum: `${unit.id}.3`,
          type: 'categorization',
          instruction: "Phân loại các từ vựng sau vào đúng nhóm chủ đề của bài học:",
          categories: ["Topic A", "Topic B"],
          questions: words.slice(0, 6).map((w, idx) => {
            const cat = (idx % 2 === 0) ? "Topic A" : "Topic B";
            return {
              id: `ex_${unit.id}_3_${idx}`,
              word: w.word,
              category: cat,
              explanation: `Từ "${w.word}" thuộc nhóm "${cat}".`
            }
          })
        };

        const ex4 = {
          exNum: `${unit.id}.4`,
          type: 'error_correction',
          instruction: "Tìm và sửa lỗi sai trong các câu sau (Chú ý chính tả và ngữ pháp):",
          questions: words.slice(2, 4).map((w, idx) => {
            let badWord = w.word + "s";
            if (w.word.endsWith('s')) badWord = w.word.slice(0, -1);
            let badExample = w.example.replace(new RegExp("\\b" + w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\b", 'i'), badWord);
            if (badExample === w.example) badExample = `I really like ${badWord}.`;
            return {
              id: `ex_${unit.id}_4_${idx}`,
              original: badExample,
              correct: w.example,
              explanation: `Từ viết đúng chính tả/ngữ pháp phải là "${w.word}" thay vì "${badWord}".`
            };
          })
        };

        const ex5 = {
          exNum: `${unit.id}.5`,
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
              id: `ex_${unit.id}_5_${idx}`,
              text: sentence,
              answers: [w.word],
              hint: w.vi,
              explanation: `Từ cần điền là "${w.word}".`
            };
          })
        };

        textbookExercises = [ex1, ex2, ex3, ex4, ex5];
      } else {
        // Fallback for units with very few words
        textbookExercises = [
          {
            exNum: `${unit.id}.1`,
            type: 'fill_in_blanks',
            instruction: "Ôn tập tổng hợp:",
            questions: words.map((w, idx) => ({
              id: `ex_${unit.id}_1_${idx}`,
              text: `The word is [blank].`,
              answers: [w.word],
              hint: w.vi,
              explanation: `Từ cần điền là "${w.word}".`
            }))
          }
        ];
      }

      // 5. Replace theory object and inject textbookExercises
      return {
        ...unit,
        theory: {
          coreVocab,
          practicalUsage,
          discoveryCorner
        },
        textbookExercises
      };
    });

    // 6. Write back to file
    const fileContent = `// File: src/data/${fileDef.name}\n\n` +
      `export const ${fileDef.varName} = ` + JSON.stringify(newCourseData, null, 2) + ";\n";
    
    fs.writeFileSync(`src/data/${fileDef.name}`, fileContent);
    console.log(`Successfully upgraded ${fileDef.name}`);
  }
}

upgrade().catch(console.error);
