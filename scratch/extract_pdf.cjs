const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('src/temp_docx/English Vocabulary In Use Pre-Intermediate And Intermediate.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('scratch/full_pdf_text_real.txt', data.text);
    console.log('Successfully extracted PDF text to scratch/full_pdf_text_real.txt');
    console.log('Number of pages:', data.numpages);
}).catch(function(error) {
    console.error('Error extracting PDF:', error);
});
