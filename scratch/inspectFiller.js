import vocabMoreData from '../src/data/vocabMoreData.js';

vocabMoreData.forEach(topic => {
  if (topic.id === 'society-law-rights') {
    console.log('found society-law-rights!');
    console.log('words count:', topic.words.length);
    const list = [
      { en: 'jurisdiction', type: '(n)', vi: 'thẩm quyền tài phán', ipa: '/ˌdʒʊərɪsˈdɪkʃn/', example: 'The case falls under federal jurisdiction.', viExample: 'Vụ án thuộc thẩm quyền tài phán của liên bang.' },
      { en: 'legislation', type: '(n)', vi: 'luật ban hành', ipa: '/ˌledʒɪsˈleɪʃn/', example: 'The government passed new environmental legislation.', viExample: 'Chính phủ đã thông qua luật môi trường mới.' }
    ];
    const existingEn = new Set(topic.words.map(w => w.en.toLowerCase()));
    list.forEach(w => {
      console.log(`checking ${w.en}: existing? ${existingEn.has(w.en.toLowerCase())}`);
    });
  }
});
