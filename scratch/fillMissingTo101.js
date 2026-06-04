import fs from 'fs';
import path from 'path';

// Import all data files
import vocabExtendedData from '../src/data/vocabExtendedData.js';
import vocabMoreData from '../src/data/vocabMoreData.js';
import vocabFinalData from '../src/data/vocabFinalData.js';
import { vocabExtraData2 } from '../src/data/vocabExtraData2.js';
import vocabVstepData from '../src/data/vocabVstepData.js'; // concatenated list

console.log('Detecting topics with < 101 words...');

const datasets = [
  { name: 'vocabExtendedData', path: '../src/data/vocabExtendedData.js', data: vocabExtendedData, type: 'default_export' },
  { name: 'vocabMoreData', path: '../src/data/vocabMoreData.js', data: vocabMoreData, type: 'default_export' },
  { name: 'vocabFinalData', path: '../src/data/vocabFinalData.js', data: vocabFinalData, type: 'default_export' },
  { name: 'vocabExtraData2', path: '../src/data/vocabExtraData2.js', data: vocabExtraData2, type: 'named_export' },
];

const newCandidates = {
  'education-academic': [
    { en: 'extracurricular', type: '(adj)', vi: 'ngoại khóa', ipa: '/ˌekstrəkəˈrɪkjələ/', example: 'She participates in extracurricular activities.', viExample: 'Cô ấy tham gia vào các hoạt động ngoại khóa.' },
    { en: 'plagiarism', type: '(n)', vi: 'sự đạo văn', ipa: '/ˈpleɪdʒərɪzəm/', example: 'Plagiarism is a serious academic offense.', viExample: 'Đạo văn là một lỗi học thuật nghiêm trọng.' },
    { en: 'humanities', type: '(n)', vi: 'ngành nhân văn', ipa: '/hjuːˈmænətiz/', example: 'She is studying the humanities at college.', viExample: 'Cô ấy đang học các ngành nhân văn ở trường cao đẳng.' }
  ],
  'society-law-rights': [
    { en: 'subpoena', type: '(n)', vi: 'trát hầu tòa', ipa: '/səˈpiːnə/', example: 'The court served a subpoena to the witness.', viExample: 'Tòa án đã gửi trát hầu tòa cho nhân chứng.' },
    { en: 'felony', type: '(n)', vi: 'trọng tội', ipa: '/ˈfeləni/', example: 'He was convicted of a felony.', viExample: 'Anh ta bị kết án phạm trọng tội.' },
    { en: 'misdemeanor', type: '(n)', vi: 'tội nhẹ', ipa: '/ˌmɪsdɪˈmiːnə/', example: 'Shoplifting is usually a misdemeanor.', viExample: 'Ăn cắp ở cửa hàng thường là một tội nhẹ.' },
    { en: 'nepotism', type: '(n)', vi: 'nạn con ông cháu cha', ipa: '/ˈnepətɪzəm/', example: 'She was accused of nepotism.', viExample: 'Cô ấy bị cáo buộc nâng đỡ người nhà.' },
    { en: 'anarchy', type: '(n)', vi: 'tình trạng vô chính phủ', ipa: '/ˈænəki/', example: 'The country fell into anarchy.', viExample: 'Đất nước lâm vào tình trạng vô chính phủ.' }
  ],
  'globalization-culture': [
    { en: 'glocalization', type: '(n)', vi: 'sự toàn cầu địa phương hóa', ipa: '/ˌɡləʊbəlaɪˈzeɪʃn/', example: 'Glocalization adapts global products locally.', viExample: 'Toàn cầu địa phương hóa thích ứng sản phẩm toàn cầu theo địa phương.' },
    { en: 'homogenize', type: '(v)', vi: 'đồng nhất hóa', ipa: '/həˈmɒdʒənaɪz/', example: 'Globalization tends to homogenize cultures.', viExample: 'Toàn cầu hóa có xu hướng đồng nhất hóa các nền văn hóa.' },
    { en: 'subculture', type: '(n)', vi: 'tiểu văn hóa', ipa: '/ˈsʌbkʌltʃə/', example: 'Study the youth subculture in the city.', viExample: 'Nghiên cứu tiểu văn hóa giới trẻ trong thành phố.' },
    { en: 'counterculture', type: '(n)', vi: 'phản văn hóa', ipa: '/ˈkaʊntəkʌltʃə/', example: 'The hippie movement was a famous counterculture.', viExample: 'Phong trào hippie là một phản văn hóa nổi tiếng.' },
    { en: 'cultural shock', type: '(n)', vi: 'sự sốc văn hóa', ipa: '/ˈkʌltʃərəl ʃɒk/', example: 'Experiencing cultural shock in a new country.', viExample: 'Trải qua cú sốc văn hóa ở một quốc gia mới.' }
  ],
  'sports-fitness': [
    { en: 'endurance', type: '(n)', vi: 'sức chịu đựng / sức bền', ipa: '/.../', example: 'Running improves physical endurance.', viExample: 'Chạy bộ giúp cải thiện sức chịu đựng của cơ thể.' }
  ],
  'media-journalism': [
    { en: 'press corps', type: '(n)', vi: 'phái đoàn báo chí', ipa: '/pres kɔː/', example: 'He addressed the White House press corps.', viExample: 'Ông ấy đã phát biểu trước phái đoàn báo chí Nhà Trắng.' },
    { en: 'ombudsperson', type: '(n)', vi: 'thanh tra báo chí', ipa: '/ˈɒmbʊdzpɜːsn/', example: 'Report bias to the newspaper\'s ombudsperson.', viExample: 'Báo cáo sự thiên vị cho thanh tra báo chí của tờ báo.' },
    { en: 'mediatize', type: '(v)', vi: 'truyền thông hóa', ipa: '/ˈmiːdiətaɪz/', example: 'They try to mediatize political debates.', viExample: 'Họ cố gắng truyền thông hóa các cuộc tranh luận chính trị.' },
    { en: 'agenda-setting', type: '(n)', vi: 'sự định hướng dư luận', ipa: '/əˈdʒendə ˈsetɪŋ/', example: 'The agenda-setting power of news media.', viExample: 'Quyền lực định hướng dư luận của truyền thông tin tức.' },
    { en: 'gatekeeping', type: '(n)', vi: 'sự lọc thông tin', ipa: '/ˈɡeɪtkiːpɪŋ/', example: 'The gatekeeping role of senior editors.', viExample: 'Vai trò chọn lọc thông tin của các tổng biên tập.' }
  ],
  'ielts-academic-vocab': [
    { en: 'corroborate', type: '(v)', vi: 'chứng thực', ipa: '/kəˈrɒbəreɪt/', example: 'Corroborate the evidence with facts.', viExample: 'Xác minh bằng chứng bằng các sự thật.' }
  ],
  'success-mindset-100': [
    { en: 'resilience', type: '(n)', vi: 'sự kiên cường', ipa: '/rɪˈzɪliəns/', example: 'Mental resilience in tough times.', viExample: 'Sự kiên cường về mặt tinh thần trong những thời kỳ khó khăn.', synonyms: 'toughness; endurance', antonyms: 'fragility; weakness', level: 'C1' }
  ]
};

datasets.forEach(dataset => {
  let modified = false;
  dataset.data.forEach(topic => {
    const list = newCandidates[topic.id];
    if (list) {
      const existingEn = new Set(topic.words.map(w => w.en.toLowerCase()));
      let added = 0;
      for (const word of list) {
        if (topic.words.length >= 101) break;
        if (!existingEn.has(word.en.toLowerCase())) {
          topic.words.push(word);
          existingEn.add(word.en.toLowerCase());
          added++;
          modified = true;
        }
      }
      if (added > 0) {
        console.log(`Topic [${topic.id}] in ${dataset.name}: Added ${added} words. New count: ${topic.words.length}`);
      }
    }
  });

  if (modified) {
    let content = '';
    if (dataset.type === 'default_export') {
      content = `// File: src/data/${dataset.name}.js
const ${dataset.name} = ${JSON.stringify(dataset.data, null, 2)};

export default ${dataset.name};
`;
    } else if (dataset.type === 'named_export') {
      content = `// File: src/data/${dataset.name}.js
export const ${dataset.name} = ${JSON.stringify(dataset.data, null, 2)};
export default ${dataset.name};
`;
    }
    fs.writeFileSync(path.join(process.cwd(), 'src', 'data', dataset.name + '.js'), content, 'utf8');
    console.log(`Successfully saved ${dataset.name}!`);
  }
});

console.log('Done filling vocab to 101+.');
