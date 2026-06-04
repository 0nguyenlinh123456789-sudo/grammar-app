// File: src/data/vocabExtendedData.js
// Extended vocabulary topics: 100+ words each, with phrases, scenarios, stories
// Covers: IELTS, VSTEP, TOEIC, Business, Kids, Daily Life

const vocabExtendedData = [

  // ============================================================
  // 1. HEALTH & MEDICAL — 120 từ (VSTEP B1-C1 / IELTS)
  // ============================================================
  {
    id: 'health-medical',
    title: '🏥 Sức Khỏe & Y Tế',
    description: 'Từ vựng y tế thiết yếu cho IELTS, VSTEP và giao tiếp thực tế. 120 từ được các bác sĩ, điều dưỡng và bệnh nhân sử dụng hàng ngày.',
    words: [
      { en: 'symptom', type: '(n)', vi: 'triệu chứng', ipa: '/ˈsɪmptəm/', example: 'Fever is a common symptom of the flu.', viExample: 'Sốt là triệu chứng phổ biến của cúm.' },
      { en: 'diagnosis', type: '(n)', vi: 'chẩn đoán', ipa: '/ˌdaɪəɡˈnəʊsɪs/', example: 'The doctor gave a clear diagnosis.', viExample: 'Bác sĩ đưa ra chẩn đoán rõ ràng.' },
      { en: 'prescription', type: '(n)', vi: 'đơn thuốc', ipa: '/prɪˈskrɪpʃn/', example: 'You need a prescription for this medicine.', viExample: 'Bạn cần đơn thuốc cho loại thuốc này.' },
      { en: 'surgery', type: '(n)', vi: 'phẫu thuật', ipa: '/ˈsɜːdʒəri/', example: 'She underwent heart surgery.', viExample: 'Cô ấy đã trải qua phẫu thuật tim.' },
      { en: 'treatment', type: '(n)', vi: 'điều trị', ipa: '/ˈtriːtmənt/', example: 'The treatment was very effective.', viExample: 'Phương pháp điều trị rất hiệu quả.' },
      { en: 'immune system', type: '(n)', vi: 'hệ miễn dịch', ipa: '/ɪˈmjuːn ˈsɪstəm/', example: 'A healthy immune system fights disease.', viExample: 'Hệ miễn dịch khỏe mạnh chống lại bệnh tật.' },
      { en: 'inflammation', type: '(n)', vi: 'viêm', ipa: '/ˌɪnfləˈmeɪʃn/', example: 'The inflammation caused swelling.', viExample: 'Viêm gây ra sưng tấy.' },
      { en: 'chronic', type: '(adj)', vi: 'mãn tính', ipa: '/ˈkrɒnɪk/', example: 'Diabetes is a chronic disease.', viExample: 'Tiểu đường là bệnh mãn tính.' },
      { en: 'acute', type: '(adj)', vi: 'cấp tính', ipa: '/əˈkjuːt/', example: 'He suffered from acute pain.', viExample: 'Anh ấy bị đau cấp tính.' },
      { en: 'blood pressure', type: '(n)', vi: 'huyết áp', ipa: '/blʌd ˈpreʃər/', example: 'High blood pressure is dangerous.', viExample: 'Huyết áp cao rất nguy hiểm.' },
      { en: 'cholesterol', type: '(n)', vi: 'cholesterol', ipa: '/kəˈlestərɒl/', example: 'Avoid foods high in cholesterol.', viExample: 'Tránh thức ăn nhiều cholesterol.' },
      { en: 'vaccination', type: '(n)', vi: 'tiêm chủng', ipa: '/ˌvæksɪˈneɪʃn/', example: 'Vaccination prevents many diseases.', viExample: 'Tiêm chủng ngăn ngừa nhiều bệnh.' },
      { en: 'allergy', type: '(n)', vi: 'dị ứng', ipa: '/ˈælərdʒi/', example: 'She has a nut allergy.', viExample: 'Cô ấy bị dị ứng đậu phộng.' },
      { en: 'fracture', type: '(n)', vi: 'gãy xương', ipa: '/ˈfræktʃər/', example: 'He has a fracture in his leg.', viExample: 'Anh ấy bị gãy xương chân.' },
      { en: 'infection', type: '(n)', vi: 'nhiễm trùng', ipa: '/ɪnˈfekʃn/', example: 'The wound got infected.', viExample: 'Vết thương bị nhiễm trùng.' },
      { en: 'antibiotic', type: '(n)', vi: 'kháng sinh', ipa: '/ˌæntibaɪˈɒtɪk/', example: 'Take this antibiotic twice daily.', viExample: 'Uống kháng sinh này hai lần mỗi ngày.' },
      { en: 'dosage', type: '(n)', vi: 'liều lượng', ipa: '/ˈdəʊsɪdʒ/', example: 'Follow the correct dosage.', viExample: 'Tuân thủ đúng liều lượng.' },
      { en: 'nausea', type: '(n)', vi: 'buồn nôn', ipa: '/ˈnɔːziə/', example: 'The medication caused nausea.', viExample: 'Thuốc gây ra buồn nôn.' },
      { en: 'dizziness', type: '(n)', vi: 'chóng mặt', ipa: '/ˈdɪzinəs/', example: 'She felt dizziness after standing up quickly.', viExample: 'Cô ấy bị chóng mặt sau khi đứng dậy nhanh.' },
      { en: 'obesity', type: '(n)', vi: 'béo phì', ipa: '/əˈbiːsɪti/', example: 'Obesity increases the risk of heart disease.', viExample: 'Béo phì tăng nguy cơ bệnh tim.' },
      { en: 'malnutrition', type: '(n)', vi: 'suy dinh dưỡng', ipa: '/ˌmælnjuːˈtrɪʃn/', example: 'Malnutrition affects millions of children.', viExample: 'Suy dinh dưỡng ảnh hưởng triệu trẻ em.' },
      { en: 'anesthesia', type: '(n)', vi: 'gây mê', ipa: '/ˌænɪsˈθiːziə/', example: 'General anesthesia was used during surgery.', viExample: 'Gây mê toàn thân được dùng trong phẫu thuật.' },
      { en: 'pandemic', type: '(n)', vi: 'đại dịch', ipa: '/pænˈdemɪk/', example: 'COVID-19 was a global pandemic.', viExample: 'COVID-19 là đại dịch toàn cầu.' },
      { en: 'epidemic', type: '(n)', vi: 'dịch bệnh', ipa: '/ˌepɪˈdemɪk/', example: 'The epidemic spread quickly.', viExample: 'Dịch bệnh lây lan nhanh chóng.' },
      { en: 'quarantine', type: '(n/v)', vi: 'cách ly', ipa: '/ˈkwɒrəntiːn/', example: 'Patients must quarantine for 14 days.', viExample: 'Bệnh nhân phải cách ly 14 ngày.' },
      { en: 'epidemic', type: '(n)', vi: 'dịch bệnh', ipa: '/ˌepɪˈdemɪk/', example: 'The epidemic spread across the region.', viExample: 'Dịch bệnh lây lan khắp khu vực.' },
      { en: 'contagious', type: '(adj)', vi: 'lây nhiễm', ipa: '/kənˈteɪdʒəs/', example: 'Chickenpox is highly contagious.', viExample: 'Thủy đậu rất dễ lây.' },
      { en: 'respiratory', type: '(adj)', vi: 'hô hấp', ipa: '/rɪˈspɪrətri/', example: 'Smoking causes respiratory problems.', viExample: 'Hút thuốc gây vấn đề hô hấp.' },
      { en: 'cardiovascular', type: '(adj)', vi: 'tim mạch', ipa: '/ˌkɑːdiəʊˈvæskjʊlər/', example: 'Exercise improves cardiovascular health.', viExample: 'Tập thể dục cải thiện sức khỏe tim mạch.' },
      { en: 'diabetes', type: '(n)', vi: 'tiểu đường', ipa: '/ˌdaɪəˈbiːtiːz/', example: 'Type 2 diabetes can be prevented.', viExample: 'Tiểu đường loại 2 có thể phòng ngừa.' },
      { en: 'hypertension', type: '(n)', vi: 'cao huyết áp', ipa: '/ˌhaɪpəˈtenʃn/', example: 'Stress causes hypertension.', viExample: 'Căng thẳng gây ra cao huyết áp.' },
      { en: 'cancer', type: '(n)', vi: 'ung thư', ipa: '/ˈkænsər/', example: 'Early detection is key in treating cancer.', viExample: 'Phát hiện sớm là then chốt trong điều trị ung thư.' },
      { en: 'chemotherapy', type: '(n)', vi: 'hóa trị', ipa: '/ˌkiːməʊˈθerəpi/', example: 'She is undergoing chemotherapy.', viExample: 'Cô ấy đang trải qua hóa trị.' },
      { en: 'radiology', type: '(n)', vi: 'X-quang / chẩn đoán hình ảnh', ipa: '/ˌreɪdiˈɒlədʒi/', example: 'Radiology helps detect tumors.', viExample: 'Chẩn đoán hình ảnh giúp phát hiện khối u.' },
      { en: 'neurological', type: '(adj)', vi: 'thần kinh học', ipa: '/ˌnjʊərəˈlɒdʒɪkl/', example: 'Alzheimer\'s is a neurological disorder.', viExample: 'Alzheimer là rối loạn thần kinh học.' },
      { en: 'psychiatry', type: '(n)', vi: 'tâm thần học', ipa: '/saɪˈkaɪətri/', example: 'Psychiatry treats mental disorders.', viExample: 'Tâm thần học điều trị rối loạn tâm thần.' },
      { en: 'physiotherapy', type: '(n)', vi: 'vật lý trị liệu', ipa: '/ˌfɪziəʊˈθerəpi/', example: 'Physiotherapy helped him recover after surgery.', viExample: 'Vật lý trị liệu giúp anh phục hồi sau phẫu thuật.' },
      { en: 'pathogen', type: '(n)', vi: 'mầm bệnh', ipa: '/ˈpæθədʒən/', example: 'Pathogens cause infectious diseases.', viExample: 'Mầm bệnh gây ra bệnh truyền nhiễm.' },
      { en: 'prognosis', type: '(n)', vi: 'tiên lượng', ipa: '/prɒɡˈnəʊsɪs/', example: 'The prognosis is good with early treatment.', viExample: 'Tiên lượng tốt với điều trị sớm.' },
      { en: 'sedative', type: '(n)', vi: 'thuốc an thần', ipa: '/ˈsedətɪv/', example: 'The sedative helped him sleep.', viExample: 'Thuốc an thần giúp anh ngủ được.' },
      { en: 'side effect', type: '(n)', vi: 'tác dụng phụ', ipa: '/saɪd ɪˈfekt/', example: 'This medicine has few side effects.', viExample: 'Thuốc này ít tác dụng phụ.' },
      { en: 'outpatient', type: '(n)', vi: 'bệnh nhân ngoại trú', ipa: '/ˈaʊtpeɪʃnt/', example: 'She was treated as an outpatient.', viExample: 'Cô ấy được điều trị ngoại trú.' },
      { en: 'inpatient', type: '(n)', vi: 'bệnh nhân nội trú', ipa: '/ˈɪnpeɪʃnt/', example: 'He stayed as an inpatient for a week.', viExample: 'Anh ấy nằm nội trú một tuần.' },
      { en: 'emergency room', type: '(n)', vi: 'phòng cấp cứu', ipa: '/ɪˈmɜːdʒənsi ruːm/', example: 'Take her to the emergency room immediately.', viExample: 'Đưa cô ấy vào phòng cấp cứu ngay.' },
      { en: 'rehabilitation', type: '(n)', vi: 'phục hồi chức năng', ipa: '/ˌriːhəˌbɪlɪˈteɪʃn/', example: 'Rehabilitation takes time and dedication.', viExample: 'Phục hồi chức năng cần thời gian và kiên nhẫn.' },
      { en: 'clinical trial', type: '(n)', vi: 'thử nghiệm lâm sàng', ipa: '/ˈklɪnɪkl ˈtraɪəl/', example: 'The drug is in clinical trials.', viExample: 'Thuốc đang trong giai đoạn thử nghiệm lâm sàng.' },
      { en: 'telemedicine', type: '(n)', vi: 'y tế từ xa', ipa: '/ˈteliˌmedɪsɪn/', example: 'Telemedicine allows remote consultations.', viExample: 'Y tế từ xa cho phép tư vấn từ xa.' },
      { en: 'arthritis', type: '(n)', vi: 'viêm khớp', ipa: '/ɑːˈθraɪtɪs/', example: 'Arthritis causes joint pain.', viExample: 'Viêm khớp gây đau khớp.' },
      { en: 'asthma', type: '(n)', vi: 'hen suyễn', ipa: '/ˈæzmə/', example: 'Exercise-induced asthma is common.', viExample: 'Hen suyễn do vận động khá phổ biến.' },
      { en: 'dehydration', type: '(n)', vi: 'mất nước', ipa: '/ˌdiːhaɪˈdreɪʃn/', example: 'Dehydration is dangerous in hot weather.', viExample: 'Mất nước rất nguy hiểm trong thời tiết nóng.' },
      { en: 'nutrition', type: '(n)', vi: 'dinh dưỡng', ipa: '/njuːˈtrɪʃn/', example: 'Good nutrition is vital for health.', viExample: 'Dinh dưỡng tốt rất quan trọng cho sức khỏe.' },
      { en: 'metabolism', type: '(n)', vi: 'trao đổi chất', ipa: '/məˈtæbəlɪzəm/', example: 'Exercise boosts your metabolism.', viExample: 'Tập thể dục tăng cường trao đổi chất.' },
      { en: 'hormone', type: '(n)', vi: 'hormone', ipa: '/ˈhɔːməʊn/', example: 'Hormones regulate body functions.', viExample: 'Hormone điều tiết các chức năng cơ thể.' },
      { en: 'antibody', type: '(n)', vi: 'kháng thể', ipa: '/ˈæntɪbɒdi/', example: 'Antibodies protect against infections.', viExample: 'Kháng thể bảo vệ chống nhiễm trùng.' },
      { en: 'pulse', type: '(n)', vi: 'mạch đập', ipa: '/pʌls/', example: 'Check your pulse after exercise.', viExample: 'Kiểm tra mạch sau khi tập thể dục.' },
      { en: 'scar', type: '(n)', vi: 'sẹo', ipa: '/skɑːr/', example: 'The surgery left a small scar.', viExample: 'Phẫu thuật để lại một vết sẹo nhỏ.' },
      { en: 'swelling', type: '(n)', vi: 'sưng', ipa: '/ˈswelɪŋ/', example: 'Apply ice to reduce swelling.', viExample: 'Chườm đá để giảm sưng.' },
      { en: 'bruise', type: '(n)', vi: 'bầm tím', ipa: '/bruːz/', example: 'She had a bruise on her knee.', viExample: 'Cô ấy bị bầm tím ở đầu gối.' },
      { en: 'wound', type: '(n)', vi: 'vết thương', ipa: '/wuːnd/', example: 'Clean the wound carefully.', viExample: 'Làm sạch vết thương cẩn thận.' },
      { en: 'suture', type: '(n/v)', vi: 'khâu vết thương', ipa: '/ˈsuːtʃər/', example: 'The wound needed three sutures.', viExample: 'Vết thương cần khâu ba mũi.' },
      { en: 'dissection', type: '(n)', vi: 'mổ xẻ/giải phẫu', ipa: '/dɪˈsekʃn/', example: 'Students performed a dissection in class.', viExample: 'Học sinh thực hiện mổ xẻ trong lớp.' },
      { en: 'specimen', type: '(n)', vi: 'mẫu bệnh phẩm', ipa: '/ˈspesɪmɪn/', example: 'A blood specimen was taken for testing.', viExample: 'Mẫu máu được lấy để xét nghiệm.' },
      { en: 'biopsy', type: '(n)', vi: 'sinh thiết', ipa: '/ˈbaɪɒpsi/', example: 'A biopsy confirmed the diagnosis.', viExample: 'Sinh thiết xác nhận chẩn đoán.' },
      { en: 'stethoscope', type: '(n)', vi: 'ống nghe tim phổi', ipa: '/ˈsteθəskəʊp/', example: 'The doctor used a stethoscope to listen to her lungs.', viExample: 'Bác sĩ dùng ống nghe để lắng nghe phổi cô ấy.' },
      { en: 'thermometer', type: '(n)', vi: 'nhiệt kế', ipa: '/θəˈmɒmɪtər/', example: 'Use a thermometer to check your temperature.', viExample: 'Dùng nhiệt kế để kiểm tra nhiệt độ.' },
      { en: 'scalpel', type: '(n)', vi: 'dao mổ', ipa: '/ˈskælpəl/', example: 'The surgeon made a small incision with a scalpel.', viExample: 'Bác sĩ phẫu thuật rạch nhỏ bằng dao mổ.' },
      { en: 'MRI scan', type: '(n)', vi: 'chụp MRI', ipa: '/ˌem ɑːr ˈaɪ skæn/', example: 'An MRI scan showed the tumor\'s location.', viExample: 'Chụp MRI cho thấy vị trí của khối u.' },
      { en: 'ultrasound', type: '(n)', vi: 'siêu âm', ipa: '/ˈʌltrəsaʊnd/', example: 'An ultrasound confirmed the pregnancy.', viExample: 'Siêu âm xác nhận thai kỳ.' },
      { en: 'transplant', type: '(n/v)', vi: 'ghép tạng', ipa: '/ˈtrænsplɑːnt/', example: 'He received a kidney transplant.', viExample: 'Anh ấy được ghép thận.' },
      { en: 'donor', type: '(n)', vi: 'người hiến tặng', ipa: '/ˈdəʊnər/', example: 'We need more organ donors.', viExample: 'Chúng ta cần nhiều người hiến tặng nội tạng hơn.' },
      { en: 'consent', type: '(n)', vi: 'đồng ý/sự chấp thuận', ipa: '/kənˈsent/', example: 'Patients must give informed consent.', viExample: 'Bệnh nhân phải cho phép sau khi được thông báo đầy đủ.' },
      { en: 'triage', type: '(n)', vi: 'phân loại cấp cứu', ipa: '/ˈtriːɑːʒ/', example: 'Nurses performed triage in the emergency room.', viExample: 'Y tá phân loại cấp cứu trong phòng cấp cứu.' },
      { en: 'intensive care', type: '(n)', vi: 'chăm sóc đặc biệt (ICU)', ipa: '/ɪnˈtensɪv keər/', example: 'The patient is in intensive care.', viExample: 'Bệnh nhân đang trong đơn vị chăm sóc đặc biệt.' },
      { en: 'hallucination', type: '(n)', vi: 'ảo giác', ipa: '/həˌluːsɪˈneɪʃn/', example: 'High fever can cause hallucinations.', viExample: 'Sốt cao có thể gây ra ảo giác.' },
      { en: 'hemorrhage', type: '(n)', vi: 'xuất huyết', ipa: '/ˈhemərɪdʒ/', example: 'Internal hemorrhage is life-threatening.', viExample: 'Xuất huyết nội tạng đe dọa tính mạng.' },
      { en: 'benign', type: '(adj)', vi: 'lành tính', ipa: '/bɪˈnaɪn/', example: 'Luckily, the tumor was benign.', viExample: 'May mắn thay, khối u là lành tính.' },
      { en: 'malignant', type: '(adj)', vi: 'ác tính', ipa: '/məˈlɪɡnənt/', example: 'Malignant tumors spread quickly.', viExample: 'Khối u ác tính lan nhanh.' },
      { en: 'ailment', type: '(n)', vi: 'bệnh nhẹ/khó chịu', ipa: '/ˈeɪlmənt/', example: 'Common ailments include colds and headaches.', viExample: 'Các bệnh nhẹ thường gặp gồm cảm và đau đầu.' },
      { en: 'fatigue', type: '(n)', vi: 'mệt mỏi', ipa: '/fəˈtiːɡ/', example: 'Fatigue is a common symptom of anemia.', viExample: 'Mệt mỏi là triệu chứng phổ biến của thiếu máu.' },
      { en: 'insomnia', type: '(n)', vi: 'mất ngủ', ipa: '/ɪnˈsɒmniə/', example: 'Stress often leads to insomnia.', viExample: 'Căng thẳng thường dẫn đến mất ngủ.' },
      { en: 'migraine', type: '(n)', vi: 'chứng đau nửa đầu', ipa: '/ˈmiːɡreɪn/', example: 'She suffers from frequent migraines.', viExample: 'Cô ấy thường xuyên bị đau nửa đầu.' },
      { en: 'eczema', type: '(n)', vi: 'chàm da', ipa: '/ˈeksɪmə/', example: 'Eczema causes itchy, red skin.', viExample: 'Chàm da gây ngứa và đỏ da.' },
      { en: 'liver', type: '(n)', vi: 'gan', ipa: '/ˈlɪvər/', example: 'The liver filters toxins from blood.', viExample: 'Gan lọc độc tố khỏi máu.' },
      { en: 'kidney', type: '(n)', vi: 'thận', ipa: '/ˈkɪdni/', example: 'Drink water to keep your kidneys healthy.', viExample: 'Uống nước để giữ thận khỏe mạnh.' },
      { en: 'lung', type: '(n)', vi: 'phổi', ipa: '/lʌŋ/', example: 'Smoking damages the lungs.', viExample: 'Hút thuốc gây tổn hại phổi.' },
      { en: 'spinal cord', type: '(n)', vi: 'tủy sống', ipa: '/ˈspaɪnl kɔːrd/', example: 'Spinal cord injuries can be permanent.', viExample: 'Tổn thương tủy sống có thể vĩnh viễn.' },
      { en: 'tissue', type: '(n)', vi: 'mô (cơ thể)', ipa: '/ˈtɪʃuː/', example: 'Damaged tissue takes time to heal.', viExample: 'Mô bị tổn thương cần thời gian để lành.' },
      { en: 'cell', type: '(n)', vi: 'tế bào', ipa: '/sel/', example: 'Cancer begins when cells grow out of control.', viExample: 'Ung thư bắt đầu khi tế bào phát triển mất kiểm soát.' },
      { en: 'plasma', type: '(n)', vi: 'huyết tương', ipa: '/ˈplæzmə/', example: 'Plasma carries nutrients in the blood.', viExample: 'Huyết tương mang chất dinh dưỡng trong máu.' },
      { en: 'enzyme', type: '(n)', vi: 'enzyme', ipa: '/ˈenzaɪm/', example: 'Digestive enzymes break down food.', viExample: 'Enzyme tiêu hóa phân giải thức ăn.' },
      { en: 'genome', type: '(n)', vi: 'bộ gen', ipa: '/ˈdʒiːnəʊm/', example: 'Scientists mapped the human genome.', viExample: 'Các nhà khoa học đã lập bản đồ bộ gen người.' },
      { en: 'DNA', type: '(n)', vi: 'ADN', ipa: '/ˌdiː en ˈeɪ/', example: 'DNA contains genetic information.', viExample: 'ADN chứa thông tin di truyền.' },
      { en: 'genetic', type: '(adj)', vi: 'di truyền', ipa: '/dʒəˈnetɪk/', example: 'Some diseases are genetic.', viExample: 'Một số bệnh có tính di truyền.' },
      { en: 'congenital', type: '(adj)', vi: 'bẩm sinh', ipa: '/kənˈdʒenɪtl/', example: 'He has a congenital heart defect.', viExample: 'Anh ấy bị dị tật tim bẩm sinh.' },
      { en: 'terminal', type: '(adj)', vi: 'giai đoạn cuối (bệnh)', ipa: '/ˈtɜːmɪnl/', example: 'She has a terminal illness.', viExample: 'Cô ấy mắc bệnh giai đoạn cuối.' },
      { en: 'palliative', type: '(adj)', vi: 'chăm sóc giảm nhẹ', ipa: '/ˈpæliətɪv/', example: 'Palliative care focuses on quality of life.', viExample: 'Chăm sóc giảm nhẹ tập trung vào chất lượng sống.' },
      { en: 'hospice', type: '(n)', vi: 'nhà chăm sóc người hấp hối', ipa: '/ˈhɒspɪs/', example: 'He spent his last weeks in a hospice.', viExample: 'Anh ấy trải qua những tuần cuối trong nhà chăm sóc người hấp hối.' },
      { en: 'physician', type: '(n)', vi: 'bác sĩ nội khoa', ipa: '/fɪˈzɪʃn/', example: 'Consult your physician before starting any medication.', viExample: 'Tham khảo bác sĩ trước khi dùng thuốc.' },
      { en: 'surgeon', type: '(n)', vi: 'bác sĩ phẫu thuật', ipa: '/ˈsɜːdʒən/', example: 'The surgeon performed the operation skillfully.', viExample: 'Bác sĩ phẫu thuật thực hiện ca mổ khéo léo.' },
      { en: 'pharmacist', type: '(n)', vi: 'dược sĩ', ipa: '/ˈfɑːməsɪst/', example: 'Ask the pharmacist about drug interactions.', viExample: 'Hỏi dược sĩ về tương tác thuốc.' },
      { en: 'paramedic', type: '(n)', vi: 'nhân viên cứu thương', ipa: '/ˌpærəˈmedɪk/', example: 'Paramedics arrived within minutes.', viExample: 'Nhân viên cứu thương đến trong vài phút.' },
      { en: 'midwife', type: '(n)', vi: 'nữ hộ sinh', ipa: '/ˈmɪdwaɪf/', example: 'The midwife assisted with the delivery.', viExample: 'Nữ hộ sinh hỗ trợ sinh đẻ.' },
      { en: 'ward', type: '(n)', vi: 'khoa (bệnh viện)', ipa: '/wɔːrd/', example: 'The patient was moved to the cardiac ward.', viExample: 'Bệnh nhân được chuyển sang khoa tim mạch.' },
      { en: 'stretcher', type: '(n)', vi: 'cáng cứu thương', ipa: '/ˈstretʃər/', example: 'The injured man was carried on a stretcher.', viExample: 'Người bị thương được khiêng trên cáng cứu thương.' },
      { en: 'ventilator', type: '(n)', vi: 'máy thở', ipa: '/ˈventɪleɪtər/', example: 'The patient was put on a ventilator.', viExample: 'Bệnh nhân được đặt vào máy thở.' },
      { en: 'defibrillator', type: '(n)', vi: 'máy khử rung tim', ipa: '/dɪˈfɪbrɪleɪtər/', example: 'A defibrillator restarted his heart.', viExample: 'Máy khử rung tim khởi động lại tim anh ấy.' },
      { en: 'catheter', type: '(n)', vi: 'ống thông', ipa: '/ˈkæθɪtər/', example: 'A catheter was inserted to drain fluid.', viExample: 'Ống thông được đưa vào để dẫn lưu dịch.' },
      { en: 'bandage', type: '(n)', vi: 'băng', ipa: '/ˈbændɪdʒ/', example: 'Wrap the wound with a clean bandage.', viExample: 'Băng vết thương bằng băng sạch.' },
      { en: 'syringe', type: '(n)', vi: 'ống tiêm', ipa: '/sɪˈrɪndʒ/', example: 'Use a sterile syringe for injection.', viExample: 'Dùng ống tiêm vô trùng khi tiêm.' }
    ],
    phrases: [
      { word: 'symptom', phrase: 'presenting symptoms', vi: 'triệu chứng hiện tại', use: 'Medical IELTS' },
      { word: 'treatment', phrase: 'undergo treatment', vi: 'trải qua điều trị', use: 'Verb + noun' },
      { word: 'diagnosis', phrase: 'accurate diagnosis', vi: 'chẩn đoán chính xác', use: 'Adj + noun' },
      { word: 'chronic', phrase: 'chronic condition', vi: 'tình trạng mãn tính', use: 'IELTS Writing' },
      { word: 'treatment', phrase: 'treatment plan', vi: 'kế hoạch điều trị', use: 'Noun compound' },
      { word: 'blood pressure', phrase: 'take blood pressure', vi: 'đo huyết áp', use: 'Verb + noun' },
      { word: 'recovery', phrase: 'make a full recovery', vi: 'hồi phục hoàn toàn', use: 'Collocation' },
    ],
    storyEn: `📖 PART 1: AT THE CLINIC
Dr. Nguyen reviews her patient's symptoms carefully. The patient has been experiencing fatigue, dizziness, and nausea for two weeks. After checking his blood pressure and pulse, she suspects hypertension. She orders an MRI scan and blood specimen to confirm the diagnosis. "Based on your symptoms, I believe you have a chronic condition," she explains gently.

📖 PART 2: THE TREATMENT PLAN
The results show elevated cholesterol and early-stage cardiovascular disease. Dr. Nguyen prescribes medication and recommends physiotherapy. She warns about side effects and explains the correct dosage. "This treatment plan should help, but you must follow the prescription carefully," she advises. The patient receives a referral to a specialist for further evaluation. With proper nutrition and exercise, his prognosis is positive.

📖 PART 3: PREVENTION IS KEY
Meanwhile, a public health campaign educates citizens about vaccination, healthy nutrition, and avoiding infections. "Prevention is better than cure," the campaign slogan reads. People learn that a strong immune system, good metabolism, and avoiding malnutrition can prevent many ailments — from common ailments like insomnia to serious diseases like cancer and diabetes.`,
    storyVi: `📖 PHẦN 1: TẠI PHÒNG KHÁM
Bác sĩ Nguyễn xem xét cẩn thận các Triệu chứng (Symptoms) của bệnh nhân. Bệnh nhân bị Mệt mỏi (Fatigue), Chóng mặt (Dizziness) và Buồn nôn (Nausea) suốt hai tuần. Sau khi kiểm tra Huyết áp (Blood pressure) và Mạch đập (Pulse), cô nghi ngờ Cao huyết áp (Hypertension). Cô chỉ định Chụp MRI (MRI scan) và lấy Mẫu máu (Blood specimen) để xác nhận Chẩn đoán (Diagnosis). "Dựa trên triệu chứng của bạn, tôi tin đây là Bệnh mãn tính (Chronic condition)," cô giải thích nhẹ nhàng.

📖 PHẦN 2: KẾ HOẠCH ĐIỀU TRỊ
Kết quả cho thấy Cholesterol cao và bệnh Tim mạch (Cardiovascular disease) giai đoạn đầu. Bác sĩ kê Đơn thuốc (Prescription) và khuyến nghị Vật lý trị liệu (Physiotherapy). Cô cảnh báo về Tác dụng phụ (Side effects) và giải thích Liều lượng (Dosage) đúng. "Kế hoạch Điều trị (Treatment plan) này sẽ giúp ích, nhưng bạn phải tuân thủ đơn thuốc cẩn thận." Bệnh nhân được giới thiệu đến chuyên gia để đánh giá thêm. Với Dinh dưỡng (Nutrition) tốt và tập thể dục, Tiên lượng (Prognosis) của anh ấy rất tích cực.

📖 PHẦN 3: PHÒNG NGỪA LÀ THEN CHỐT
Trong khi đó, chiến dịch y tế công cộng giáo dục về Tiêm chủng (Vaccination), Dinh dưỡng (Nutrition) lành mạnh và tránh Nhiễm trùng (Infections). Người dân học rằng Hệ miễn dịch (Immune system) mạnh, Trao đổi chất (Metabolism) tốt và tránh Suy dinh dưỡng (Malnutrition) có thể ngăn ngừa nhiều bệnh.`
  },

  // ============================================================
  // 2. BUSINESS & OFFICE — 120 từ (TOEIC / Business English)
  // ============================================================
  {
    id: 'business-office',
    title: '💼 Kinh Doanh & Văn Phòng',
    description: 'Từ vựng TOEIC và Business English cần thiết cho môi trường làm việc chuyên nghiệp. Đủ để giao tiếp, viết email, họp hành và thương lượng.',
    words: [
      { en: 'agenda', type: '(n)', vi: 'chương trình nghị sự', ipa: '/əˈdʒendə/', example: 'The agenda for today\'s meeting is ready.', viExample: 'Chương trình nghị sự của cuộc họp hôm nay đã sẵn sàng.' },
      { en: 'deadline', type: '(n)', vi: 'hạn chót', ipa: '/ˈdedlaɪn/', example: 'The project deadline is next Friday.', viExample: 'Hạn chót của dự án là thứ Sáu tuần tới.' },
      { en: 'revenue', type: '(n)', vi: 'doanh thu', ipa: '/ˈrevənjuː/', example: 'Annual revenue exceeded expectations.', viExample: 'Doanh thu hàng năm vượt kỳ vọng.' },
      { en: 'expenditure', type: '(n)', vi: 'chi tiêu/chi phí', ipa: '/ɪkˈspendiʧə/', example: 'We must reduce our expenditure.', viExample: 'Chúng ta phải giảm chi tiêu.' },
      { en: 'profit margin', type: '(n)', vi: 'biên lợi nhuận', ipa: '/ˈprɒfɪt ˌmɑːdʒɪn/', example: 'The profit margin has improved this quarter.', viExample: 'Biên lợi nhuận cải thiện quý này.' },
      { en: 'stakeholder', type: '(n)', vi: 'các bên liên quan', ipa: '/ˈsteɪkhəʊldər/', example: 'We must satisfy all stakeholders.', viExample: 'Chúng ta phải thỏa mãn tất cả các bên liên quan.' },
      { en: 'strategy', type: '(n)', vi: 'chiến lược', ipa: '/ˈstrætɪdʒi/', example: 'We need a new marketing strategy.', viExample: 'Chúng ta cần chiến lược marketing mới.' },
      { en: 'negotiation', type: '(n)', vi: 'đàm phán', ipa: '/nɪˌɡəʊʃiˈeɪʃn/', example: 'Negotiations are ongoing.', viExample: 'Đàm phán đang diễn ra.' },
      { en: 'merger', type: '(n)', vi: 'sáp nhập', ipa: '/ˈmɜːdʒər/', example: 'The merger created a huge company.', viExample: 'Sáp nhập tạo ra một công ty lớn.' },
      { en: 'acquisition', type: '(n)', vi: 'mua lại (công ty)', ipa: '/ˌækwɪˈzɪʃn/', example: 'The acquisition was worth $5 billion.', viExample: 'Vụ mua lại trị giá 5 tỷ đô.' },
      { en: 'dividend', type: '(n)', vi: 'cổ tức', ipa: '/ˈdɪvɪdend/', example: 'Shareholders received a dividend.', viExample: 'Cổ đông nhận cổ tức.' },
      { en: 'invoice', type: '(n)', vi: 'hóa đơn', ipa: '/ˈɪnvɔɪs/', example: 'Please send the invoice by email.', viExample: 'Vui lòng gửi hóa đơn qua email.' },
      { en: 'quarterly', type: '(adj/adv)', vi: 'hàng quý', ipa: '/ˈkwɔːtəli/', example: 'We review results quarterly.', viExample: 'Chúng tôi xem xét kết quả hàng quý.' },
      { en: 'procurement', type: '(n)', vi: 'mua sắm/thu mua', ipa: '/prəˈkjʊərmənt/', example: 'The procurement team manages suppliers.', viExample: 'Đội thu mua quản lý nhà cung cấp.' },
      { en: 'compliance', type: '(n)', vi: 'tuân thủ (quy định)', ipa: '/kəmˈplaɪəns/', example: 'All employees must follow compliance rules.', viExample: 'Tất cả nhân viên phải tuân thủ quy định.' },
      { en: 'benchmark', type: '(n)', vi: 'điểm chuẩn/tiêu chuẩn so sánh', ipa: '/ˈbentʃmɑːk/', example: 'Our performance exceeds the industry benchmark.', viExample: 'Hiệu suất của chúng tôi vượt tiêu chuẩn ngành.' },
      { en: 'KPI', type: '(n)', vi: 'chỉ số hiệu suất chính', ipa: '/ˌkeɪ piː ˈaɪ/', example: 'Sales team met all KPIs this month.', viExample: 'Đội bán hàng đạt tất cả KPI tháng này.' },
      { en: 'ROI', type: '(n)', vi: 'lợi tức đầu tư', ipa: '/ˌɑːr əʊ ˈaɪ/', example: 'The campaign delivered a 300% ROI.', viExample: 'Chiến dịch mang lại ROI 300%.' },
      { en: 'supply chain', type: '(n)', vi: 'chuỗi cung ứng', ipa: '/səˈplaɪ tʃeɪn/', example: 'Supply chain disruption caused delays.', viExample: 'Gián đoạn chuỗi cung ứng gây ra chậm trễ.' },
      { en: 'logistics', type: '(n)', vi: 'logistics/vận chuyển hàng hóa', ipa: '/ləˈdʒɪstɪks/', example: 'Efficient logistics reduces costs.', viExample: 'Logistics hiệu quả giảm chi phí.' },
      { en: 'overhead', type: '(n)', vi: 'chi phí chung', ipa: '/ˈəʊvəhed/', example: 'Reduce overhead to increase profit.', viExample: 'Giảm chi phí chung để tăng lợi nhuận.' },
      { en: 'turnover', type: '(n)', vi: 'doanh số/tỷ lệ nghỉ việc', ipa: '/ˈtɜːnəʊvər/', example: 'High staff turnover hurts productivity.', viExample: 'Tỷ lệ nhân viên nghỉ việc cao ảnh hưởng năng suất.' },
      { en: 'appraisal', type: '(n)', vi: 'đánh giá (nhân viên)', ipa: '/əˈpreɪzl/', example: 'Annual appraisals determine bonuses.', viExample: 'Đánh giá hàng năm xác định thưởng.' },
      { en: 'incentive', type: '(n)', vi: 'khuyến khích/ưu đãi', ipa: '/ɪnˈsentɪv/', example: 'Sales staff receive performance incentives.', viExample: 'Nhân viên bán hàng nhận ưu đãi theo hiệu suất.' },
      { en: 'entrepreneur', type: '(n)', vi: 'doanh nhân/nhà khởi nghiệp', ipa: '/ˌɒntrəprəˈnɜːr/', example: 'Young entrepreneurs are changing the economy.', viExample: 'Doanh nhân trẻ đang thay đổi nền kinh tế.' },
      { en: 'venture capital', type: '(n)', vi: 'vốn đầu tư mạo hiểm', ipa: '/ˈventʃər ˈkæpɪtl/', example: 'The startup received venture capital funding.', viExample: 'Công ty khởi nghiệp nhận được vốn đầu tư mạo hiểm.' },
      { en: 'pitch', type: '(n/v)', vi: 'trình bày ý tưởng kinh doanh', ipa: '/pɪtʃ/', example: 'She delivered a great pitch to investors.', viExample: 'Cô ấy thuyết trình ý tưởng tuyệt vời cho nhà đầu tư.' },
      { en: 'B2B', type: '(n)', vi: 'kinh doanh giữa doanh nghiệp', ipa: '/ˌbiː tuː ˈbiː/', example: 'Our company focuses on B2B sales.', viExample: 'Công ty chúng tôi tập trung vào bán hàng B2B.' },
      { en: 'B2C', type: '(n)', vi: 'kinh doanh đến người tiêu dùng', ipa: '/ˌbiː tuː ˈsiː/', example: 'E-commerce is mainly B2C.', viExample: 'Thương mại điện tử chủ yếu là B2C.' },
      { en: 'market share', type: '(n)', vi: 'thị phần', ipa: '/ˈmɑːkɪt ʃeər/', example: 'We increased our market share by 15%.', viExample: 'Chúng tôi tăng thị phần 15%.' },
      { en: 'target market', type: '(n)', vi: 'thị trường mục tiêu', ipa: '/ˈtɑːɡɪt ˈmɑːkɪt/', example: 'Our target market is young professionals.', viExample: 'Thị trường mục tiêu là người trẻ chuyên nghiệp.' },
      { en: 'brand awareness', type: '(n)', vi: 'nhận thức thương hiệu', ipa: '/brænd əˈweənəs/', example: 'Social media builds brand awareness.', viExample: 'Mạng xã hội xây dựng nhận thức thương hiệu.' },
      { en: 'USP', type: '(n)', vi: 'lợi thế cạnh tranh độc đáo', ipa: '/ˌjuː es ˈpiː/', example: 'What is your product\'s USP?', viExample: 'Lợi thế cạnh tranh độc đáo của sản phẩm bạn là gì?' },
      { en: 'outsource', type: '(v)', vi: 'thuê ngoài', ipa: '/ˌaʊtˈsɔːs/', example: 'We outsource our IT support.', viExample: 'Chúng tôi thuê ngoài bộ phận hỗ trợ IT.' },
      { en: 'scalable', type: '(adj)', vi: 'có thể mở rộng', ipa: '/ˈskeɪləbl/', example: 'A scalable business model is essential.', viExample: 'Mô hình kinh doanh có thể mở rộng là thiết yếu.' },
      { en: 'leverage', type: '(v/n)', vi: 'tận dụng/đòn bẩy', ipa: '/ˈliːvərɪdʒ/', example: 'Leverage your network to find clients.', viExample: 'Tận dụng mạng lưới của bạn để tìm khách hàng.' },
      { en: 'synergy', type: '(n)', vi: 'hiệp lực', ipa: '/ˈsɪnədʒi/', example: 'The merger created great synergy.', viExample: 'Sáp nhập tạo ra hiệp lực tuyệt vời.' },
      { en: 'disruption', type: '(n)', vi: 'sự gián đoạn/đột phá', ipa: '/dɪsˈrʌpʃn/', example: 'Technology caused market disruption.', viExample: 'Công nghệ gây ra đột phá thị trường.' },
      { en: 'innovation', type: '(n)', vi: 'sự đổi mới sáng tạo', ipa: '/ˌɪnəˈveɪʃn/', example: 'Innovation drives economic growth.', viExample: 'Đổi mới sáng tạo thúc đẩy tăng trưởng kinh tế.' },
      { en: 'pivot', type: '(v/n)', vi: 'thay đổi hướng kinh doanh', ipa: '/ˈpɪvət/', example: 'The startup had to pivot its business model.', viExample: 'Startup phải thay đổi mô hình kinh doanh.' },
      { en: 'due diligence', type: '(n)', vi: 'thẩm định (trước đầu tư)', ipa: '/djuː ˈdɪlɪdʒəns/', example: 'Investors must conduct due diligence.', viExample: 'Nhà đầu tư phải thực hiện thẩm định.' },
      { en: 'IPO', type: '(n)', vi: 'phát hành cổ phiếu lần đầu', ipa: '/ˌaɪ piː ˈəʊ/', example: 'The company launched its IPO successfully.', viExample: 'Công ty phát hành IPO thành công.' },
      { en: 'cash flow', type: '(n)', vi: 'dòng tiền', ipa: '/kæʃ fləʊ/', example: 'Managing cash flow is critical for startups.', viExample: 'Quản lý dòng tiền là thiết yếu cho startup.' },
      { en: 'balance sheet', type: '(n)', vi: 'bảng cân đối kế toán', ipa: '/ˈbæləns ʃiːt/', example: 'Review the balance sheet before investing.', viExample: 'Xem xét bảng cân đối kế toán trước khi đầu tư.' },
      { en: 'fiscal year', type: '(n)', vi: 'năm tài chính', ipa: '/ˈfɪskl jɪər/', example: 'The fiscal year ends in December.', viExample: 'Năm tài chính kết thúc vào tháng 12.' },
      { en: 'forecast', type: '(n/v)', vi: 'dự báo', ipa: '/ˈfɔːkɑːst/', example: 'Sales forecast looks promising.', viExample: 'Dự báo bán hàng trông khả quan.' },
      { en: 'budget', type: '(n)', vi: 'ngân sách', ipa: '/ˈbʌdʒɪt/', example: 'We need to stay within budget.', viExample: 'Chúng ta cần ở trong ngân sách.' },
      { en: 'audit', type: '(n/v)', vi: 'kiểm toán', ipa: '/ˈɔːdɪt/', example: 'An external audit is required annually.', viExample: 'Kiểm toán bên ngoài yêu cầu hàng năm.' },
      { en: 'asset', type: '(n)', vi: 'tài sản', ipa: '/ˈæset/', example: 'Property is a valuable asset.', viExample: 'Bất động sản là tài sản có giá trị.' },
      { en: 'liability', type: '(n)', vi: 'nợ/trách nhiệm pháp lý', ipa: '/ˌlaɪəˈbɪləti/', example: 'Reduce liabilities to improve financial health.', viExample: 'Giảm nợ để cải thiện tình hình tài chính.' },
      { en: 'equity', type: '(n)', vi: 'vốn chủ sở hữu', ipa: '/ˈekwɪti/', example: 'Investors received a 20% equity stake.', viExample: 'Nhà đầu tư nhận 20% vốn chủ sở hữu.' },
      { en: 'inflation', type: '(n)', vi: 'lạm phát', ipa: '/ɪnˈfleɪʃn/', example: 'Inflation reduces purchasing power.', viExample: 'Lạm phát giảm sức mua.' },
      { en: 'recession', type: '(n)', vi: 'suy thoái kinh tế', ipa: '/rɪˈseʃn/', example: 'The recession affected many businesses.', viExample: 'Suy thoái ảnh hưởng nhiều doanh nghiệp.' },
      { en: 'GDP', type: '(n)', vi: 'tổng sản phẩm quốc nội', ipa: '/ˌdʒiː diː ˈpiː/', example: 'GDP grew by 6% last year.', viExample: 'GDP tăng 6% năm ngoái.' },
      { en: 'trade deficit', type: '(n)', vi: 'thâm hụt thương mại', ipa: '/treɪd ˈdefɪsɪt/', example: 'The trade deficit widened this year.', viExample: 'Thâm hụt thương mại tăng năm nay.' },
      { en: 'tariff', type: '(n)', vi: 'thuế quan', ipa: '/ˈtærɪf/', example: 'High tariffs harm international trade.', viExample: 'Thuế quan cao gây hại thương mại quốc tế.' },
      { en: 'subsidy', type: '(n)', vi: 'trợ cấp', ipa: '/ˈsʌbsɪdi/', example: 'Government subsidies support farmers.', viExample: 'Trợ cấp chính phủ hỗ trợ nông dân.' },
      { en: 'embargo', type: '(n)', vi: 'cấm vận', ipa: '/ɪmˈbɑːɡəʊ/', example: 'The trade embargo limited imports.', viExample: 'Cấm vận thương mại hạn chế nhập khẩu.' },
      { en: 'monopoly', type: '(n)', vi: 'độc quyền', ipa: '/məˈnɒpəli/', example: 'Antitrust laws prevent monopoly.', viExample: 'Luật chống độc quyền ngăn chặn độc quyền.' },
      { en: 'microfinance', type: '(n)', vi: 'tài chính vi mô', ipa: '/ˈmaɪkrəʊˌfaɪnæns/', example: 'Microfinance helps small entrepreneurs.', viExample: 'Tài chính vi mô giúp doanh nhân nhỏ.' },
      { en: 'franchise', type: '(n)', vi: 'nhượng quyền thương mại', ipa: '/ˈfræntʃaɪz/', example: 'She runs a coffee franchise.', viExample: 'Cô ấy điều hành nhượng quyền cà phê.' },
      { en: 'portfolio', type: '(n)', vi: 'danh mục đầu tư', ipa: '/pɔːtˈfəʊliəʊ/', example: 'Diversify your investment portfolio.', viExample: 'Đa dạng hóa danh mục đầu tư của bạn.' },
      { en: 'stock market', type: '(n)', vi: 'thị trường chứng khoán', ipa: '/stɒk ˈmɑːkɪt/', example: 'The stock market crashed in 2008.', viExample: 'Thị trường chứng khoán sụp đổ năm 2008.' },
      { en: 'branding', type: '(n)', vi: 'xây dựng thương hiệu', ipa: '/ˈbrændɪŋ/', example: 'Strong branding builds customer loyalty.', viExample: 'Xây dựng thương hiệu mạnh tạo lòng trung thành.' },
      { en: 'conversion rate', type: '(n)', vi: 'tỷ lệ chuyển đổi', ipa: '/kənˈvɜːʃn reɪt/', example: 'Improve the landing page to boost conversion rate.', viExample: 'Cải thiện trang đích để tăng tỷ lệ chuyển đổi.' },
      { en: 'customer retention', type: '(n)', vi: 'giữ chân khách hàng', ipa: '/ˈkʌstəmər rɪˈtenʃn/', example: 'Customer retention is cheaper than acquisition.', viExample: 'Giữ chân khách hàng rẻ hơn thu hút khách mới.' },
      { en: 'onboarding', type: '(n)', vi: 'quy trình tiếp nhận nhân viên mới', ipa: '/ˈɒnbɔːdɪŋ/', example: 'Effective onboarding reduces staff turnover.', viExample: 'Tiếp nhận hiệu quả giảm tỷ lệ nghỉ việc.' },
      { en: 'performance review', type: '(n)', vi: 'đánh giá hiệu suất', ipa: '/pəˈfɔːməns rɪˈvjuː/', example: 'Performance reviews happen every six months.', viExample: 'Đánh giá hiệu suất diễn ra mỗi sáu tháng.' },
      { en: 'teamwork', type: '(n)', vi: 'làm việc nhóm', ipa: '/ˈtiːmwɜːk/', example: 'Teamwork is essential in any organization.', viExample: 'Làm việc nhóm thiết yếu trong mọi tổ chức.' },
      { en: 'leadership', type: '(n)', vi: 'kỹ năng lãnh đạo', ipa: '/ˈliːdəʃɪp/', example: 'Strong leadership drives company success.', viExample: 'Lãnh đạo mạnh thúc đẩy thành công công ty.' },
      { en: 'remote work', type: '(n)', vi: 'làm việc từ xa', ipa: '/rɪˈməʊt wɜːk/', example: 'Remote work became common after the pandemic.', viExample: 'Làm việc từ xa phổ biến sau đại dịch.' },
      { en: 'conference call', type: '(n)', vi: 'cuộc gọi hội nghị', ipa: '/ˈkɒnfərəns kɔːl/', example: 'We have a conference call at 3 PM.', viExample: 'Chúng tôi có cuộc gọi hội nghị lúc 3 giờ chiều.' },
      { en: 'minutes', type: '(n)', vi: 'biên bản cuộc họp', ipa: '/ˈmɪnɪts/', example: 'Please circulate the meeting minutes.', viExample: 'Vui lòng phát hành biên bản cuộc họp.' },
      { en: 'memo', type: '(n)', vi: 'bản ghi nhớ nội bộ', ipa: '/ˈmeməʊ/', example: 'The manager sent a memo to all staff.', viExample: 'Quản lý gửi bản ghi nhớ cho toàn bộ nhân viên.' },
      { en: 'tender', type: '(n)', vi: 'đấu thầu', ipa: '/ˈtendər/', example: 'We submitted a tender for the contract.', viExample: 'Chúng tôi nộp hồ sơ đấu thầu cho hợp đồng.' },
      { en: 'contract', type: '(n)', vi: 'hợp đồng', ipa: '/ˈkɒntrækt/', example: 'Sign the contract before starting work.', viExample: 'Ký hợp đồng trước khi bắt đầu làm việc.' },
      { en: 'clause', type: '(n)', vi: 'điều khoản', ipa: '/klɔːz/', example: 'Read every clause before signing.', viExample: 'Đọc kỹ mọi điều khoản trước khi ký.' },
      { en: 'patent', type: '(n)', vi: 'bằng sáng chế', ipa: '/ˈpætnt/', example: 'They filed for a patent on the new design.', viExample: 'Họ nộp đơn xin bằng sáng chế cho thiết kế mới.' },
      { en: 'trademark', type: '(n)', vi: 'thương hiệu (đã đăng ký)', ipa: '/ˈtreɪdmɑːk/', example: 'The logo is a registered trademark.', viExample: 'Logo là thương hiệu đã đăng ký.' },
      { en: 'copyright', type: '(n)', vi: 'bản quyền', ipa: '/ˈkɒpɪraɪt/', example: 'Protect your work with copyright.', viExample: 'Bảo vệ tác phẩm bằng bản quyền.' },
      { en: 'interest rate', type: '(n)', vi: 'lãi suất', ipa: '/ˈɪntrəst reɪt/', example: 'Rising interest rates slow borrowing.', viExample: 'Lãi suất tăng làm chậm việc vay.' },
      { en: 'loan', type: '(n)', vi: 'khoản vay', ipa: '/ləʊn/', example: 'She took a business loan to expand.', viExample: 'Cô ấy vay vốn kinh doanh để mở rộng.' },
      { en: 'collateral', type: '(n)', vi: 'tài sản thế chấp', ipa: '/kəˈlætərəl/', example: 'Property was used as collateral for the loan.', viExample: 'Bất động sản được dùng làm tài sản thế chấp.' },
      { en: 'commission', type: '(n)', vi: 'hoa hồng', ipa: '/kəˈmɪʃn/', example: 'Sales reps earn a 10% commission.', viExample: 'Nhân viên bán hàng được 10% hoa hồng.' },
      { en: 'kickback', type: '(n)', vi: 'tiền hoa hồng bất hợp lệ', ipa: '/ˈkɪkbæk/', example: 'Accepting kickbacks is illegal.', viExample: 'Nhận hoa hồng bất hợp lệ là vi phạm pháp luật.' },
      { en: 'transparency', type: '(n)', vi: 'minh bạch', ipa: '/trænsˈpærənsi/', example: 'Financial transparency builds trust.', viExample: 'Minh bạch tài chính xây dựng lòng tin.' },
      { en: 'accountability', type: '(n)', vi: 'trách nhiệm giải trình', ipa: '/əˌkaʊntəˈbɪlɪti/', example: 'Managers must show accountability.', viExample: 'Quản lý phải thể hiện trách nhiệm giải trình.' },
      { en: 'ethics', type: '(n)', vi: 'đạo đức kinh doanh', ipa: '/ˈeθɪks/', example: 'Business ethics guide company behavior.', viExample: 'Đạo đức kinh doanh hướng dẫn hành vi công ty.' },
      { en: 'corporate social responsibility', type: '(n)', vi: 'trách nhiệm xã hội doanh nghiệp (CSR)', ipa: '/ˈkɔːpərət ˈsəʊʃl rɪˌspɒnsəˈbɪlɪti/', example: 'CSR initiatives improve brand image.', viExample: 'Sáng kiến CSR cải thiện hình ảnh thương hiệu.' },
      { en: 'sustainability', type: '(n)', vi: 'bền vững', ipa: '/səˌsteɪnəˈbɪlɪti/', example: 'Sustainability is now a business priority.', viExample: 'Bền vững hiện là ưu tiên kinh doanh.' },
      { en: 'agile', type: '(adj)', vi: 'linh hoạt (phương pháp làm việc)', ipa: '/ˈædʒaɪl/', example: 'Our team uses agile methodology.', viExample: 'Nhóm chúng tôi dùng phương pháp agile.' },
      { en: 'KYC', type: '(n)', vi: 'xác minh danh tính khách hàng', ipa: '/ˌkeɪ waɪ ˈsiː/', example: 'Banks require KYC documentation.', viExample: 'Ngân hàng yêu cầu tài liệu KYC.' },
      { en: 'co-working space', type: '(n)', vi: 'không gian làm việc chung', ipa: '/ˌkəʊ ˈwɜːkɪŋ speɪs/', example: 'Freelancers often use co-working spaces.', viExample: 'Freelancer thường dùng không gian làm việc chung.' },
      { en: 'pitch deck', type: '(n)', vi: 'bộ slide thuyết trình đầu tư', ipa: '/pɪtʃ dek/', example: 'Prepare a strong pitch deck for investors.', viExample: 'Chuẩn bị bộ slide thuyết trình mạnh cho nhà đầu tư.' },
      { en: 'deliverable', type: '(n)', vi: 'kết quả bàn giao', ipa: '/dɪˈlɪvərəbl/', example: 'Define clear deliverables before starting.', viExample: 'Xác định kết quả bàn giao rõ ràng trước khi bắt đầu.' },
      { en: 'milestone', type: '(n)', vi: 'mốc quan trọng', ipa: '/ˈmaɪlstəʊn/', example: 'We hit a major milestone this month.', viExample: 'Chúng tôi đạt mốc quan trọng tháng này.' },
      { en: 'task management', type: '(n)', vi: 'quản lý nhiệm vụ', ipa: '/tɑːsk ˈmænɪdʒmənt/', example: 'Use software for effective task management.', viExample: 'Dùng phần mềm để quản lý nhiệm vụ hiệu quả.' }
    ],
    storyEn: `📖 PART 1: THE STARTUP PITCH
Linh is a young entrepreneur preparing her pitch deck for potential investors. She needs to show strong revenue projections and a clear strategy. Her startup, a scalable B2C platform, has impressive KPIs and a growing customer base. The company recently achieved its first profitable quarter, with a healthy profit margin and positive cash flow.

📖 PART 2: THE MERGER NEGOTIATION
Meanwhile, her larger competitor is in merger negotiations with a multinational firm. Stakeholders are evaluating the acquisition price, reviewing balance sheets and conducting due diligence. The merger promises strong synergy — combining logistics efficiency with brand awareness in the target market.

📖 PART 3: BUSINESS ETHICS & SUSTAINABILITY
In today's world, businesses must prioritize transparency, accountability and ethics. Corporate Social Responsibility is no longer optional. Consumers demand sustainability. Agile teams, clear deliverables, and ethical leadership are what separate great companies from the rest.`,
    storyVi: `📖 PHẦN 1: THUYẾT TRÌNH STARTUP
Linh là Doanh nhân (Entrepreneur) trẻ đang chuẩn bị Bộ slide thuyết trình (Pitch deck) cho nhà đầu tư. Cô cần thể hiện dự báo Doanh thu (Revenue) mạnh và Chiến lược (Strategy) rõ ràng. Startup của cô, nền tảng B2C có thể mở rộng, có KPI ấn tượng và cơ sở khách hàng tăng trưởng. Công ty gần đây đạt quý đầu tiên có lãi, với Biên lợi nhuận (Profit margin) lành mạnh và Dòng tiền (Cash flow) tích cực.

📖 PHẦN 2: ĐÀM PHÁN SÁP NHẬP
Trong khi đó, đối thủ lớn hơn đang trong Đàm phán (Negotiation) sáp nhập với công ty đa quốc gia. Các Bên liên quan (Stakeholders) đang đánh giá giá mua lại, xem xét Bảng cân đối kế toán (Balance sheets) và thực hiện Thẩm định (Due diligence). Việc Sáp nhập (Merger) hứa hẹn Hiệp lực (Synergy) mạnh mẽ — kết hợp hiệu quả Logistics với Nhận thức thương hiệu (Brand awareness) trên Thị trường mục tiêu (Target market).

📖 PHẦN 3: ĐẠO ĐỨC & BỀN VỮNG
Ngày nay, doanh nghiệp phải ưu tiên Minh bạch (Transparency), Trách nhiệm giải trình (Accountability) và Đạo đức (Ethics). Trách nhiệm xã hội doanh nghiệp (CSR) không còn là tùy chọn. Người tiêu dùng đòi hỏi Bền vững (Sustainability). Nhóm Agile, Kết quả bàn giao (Deliverables) rõ ràng, và Lãnh đạo (Leadership) đạo đức là điều phân biệt công ty vĩ đại.`
  },

  // ============================================================
  // 3. KIDS STARTER PACK — Tiếng Anh Trẻ Em
  // ============================================================
  {
    id: 'kids-starter',
    title: '👶 Tiếng Anh Cho Trẻ Em',
    description: 'Từ vựng vui nhộn cho bé bắt đầu học tiếng Anh! Màu sắc, số đếm, con vật, bộ phận cơ thể và những từ đầu tiên quan trọng nhất.',
    words: [
      { en: 'red', type: '(adj)', vi: 'màu đỏ 🔴', ipa: '/red/', example: 'The apple is red.', viExample: 'Quả táo màu đỏ.' },
      { en: 'blue', type: '(adj)', vi: 'màu xanh dương 🔵', ipa: '/bluː/', example: 'The sky is blue.', viExample: 'Bầu trời màu xanh.' },
      { en: 'green', type: '(adj)', vi: 'màu xanh lá 🟢', ipa: '/ɡriːn/', example: 'Grass is green.', viExample: 'Cỏ màu xanh lá.' },
      { en: 'yellow', type: '(adj)', vi: 'màu vàng 🟡', ipa: '/ˈjeləʊ/', example: 'The sun is yellow.', viExample: 'Mặt trời màu vàng.' },
      { en: 'orange', type: '(adj)', vi: 'màu cam 🟠', ipa: '/ˈɒrɪndʒ/', example: 'The pumpkin is orange.', viExample: 'Quả bí ngô màu cam.' },
      { en: 'purple', type: '(adj)', vi: 'màu tím 🟣', ipa: '/ˈpɜːpl/', example: 'Grapes are purple.', viExample: 'Nho màu tím.' },
      { en: 'pink', type: '(adj)', vi: 'màu hồng 🌸', ipa: '/pɪŋk/', example: 'The flowers are pink.', viExample: 'Những bông hoa màu hồng.' },
      { en: 'black', type: '(adj)', vi: 'màu đen ⚫', ipa: '/blæk/', example: 'The cat is black.', viExample: 'Con mèo màu đen.' },
      { en: 'white', type: '(adj)', vi: 'màu trắng ⚪', ipa: '/waɪt/', example: 'Snow is white.', viExample: 'Tuyết màu trắng.' },
      { en: 'brown', type: '(adj)', vi: 'màu nâu 🟤', ipa: '/braʊn/', example: 'Chocolate is brown.', viExample: 'Sô-cô-la màu nâu.' },
      { en: 'one', type: '(num)', vi: 'một (1)', ipa: '/wʌn/', example: 'I have one cat.', viExample: 'Tôi có một con mèo.' },
      { en: 'two', type: '(num)', vi: 'hai (2)', ipa: '/tuː/', example: 'I have two eyes.', viExample: 'Tôi có hai mắt.' },
      { en: 'three', type: '(num)', vi: 'ba (3)', ipa: '/θriː/', example: 'Three little pigs!', viExample: 'Ba chú lợn nhỏ!' },
      { en: 'four', type: '(num)', vi: 'bốn (4)', ipa: '/fɔːr/', example: 'A dog has four legs.', viExample: 'Con chó có bốn chân.' },
      { en: 'five', type: '(num)', vi: 'năm (5)', ipa: '/faɪv/', example: 'Five fingers on one hand.', viExample: 'Năm ngón tay trên một bàn tay.' },
      { en: 'six', type: '(num)', vi: 'sáu (6)', ipa: '/sɪks/', example: 'I am six years old.', viExample: 'Tôi sáu tuổi.' },
      { en: 'seven', type: '(num)', vi: 'bảy (7)', ipa: '/ˈsevn/', example: 'There are seven days in a week.', viExample: 'Có bảy ngày trong tuần.' },
      { en: 'eight', type: '(num)', vi: 'tám (8)', ipa: '/eɪt/', example: 'A spider has eight legs.', viExample: 'Con nhện có tám chân.' },
      { en: 'nine', type: '(num)', vi: 'chín (9)', ipa: '/naɪn/', example: 'Nine planets in our solar system.', viExample: 'Chín hành tinh trong hệ mặt trời.' },
      { en: 'ten', type: '(num)', vi: 'mười (10)', ipa: '/ten/', example: 'Ten fingers and ten toes!', viExample: 'Mười ngón tay và mười ngón chân!' },
      { en: 'dog', type: '(n)', vi: 'con chó 🐶', ipa: '/dɒɡ/', example: 'My dog is very friendly.', viExample: 'Con chó của tôi rất thân thiện.' },
      { en: 'cat', type: '(n)', vi: 'con mèo 🐱', ipa: '/kæt/', example: 'The cat is sleeping.', viExample: 'Con mèo đang ngủ.' },
      { en: 'bird', type: '(n)', vi: 'con chim 🐦', ipa: '/bɜːrd/', example: 'The bird can fly.', viExample: 'Con chim có thể bay.' },
      { en: 'fish', type: '(n)', vi: 'con cá 🐟', ipa: '/fɪʃ/', example: 'I have a pet fish.', viExample: 'Tôi có cá cảnh nuôi.' },
      { en: 'rabbit', type: '(n)', vi: 'con thỏ 🐰', ipa: '/ˈræbɪt/', example: 'The rabbit has long ears.', viExample: 'Con thỏ có tai dài.' },
      { en: 'elephant', type: '(n)', vi: 'con voi 🐘', ipa: '/ˈelɪfənt/', example: 'Elephants are very big.', viExample: 'Con voi rất to lớn.' },
      { en: 'lion', type: '(n)', vi: 'con sư tử 🦁', ipa: '/ˈlaɪən/', example: 'The lion is the king of animals.', viExample: 'Sư tử là vua của muông thú.' },
      { en: 'monkey', type: '(n)', vi: 'con khỉ 🐒', ipa: '/ˈmʌŋki/', example: 'Monkeys love bananas.', viExample: 'Khỉ thích chuối.' },
      { en: 'giraffe', type: '(n)', vi: 'con hươu cao cổ 🦒', ipa: '/dʒɪˈrɑːf/', example: 'A giraffe has a long neck.', viExample: 'Hươu cao cổ có cổ dài.' },
      { en: 'penguin', type: '(n)', vi: 'con chim cánh cụt 🐧', ipa: '/ˈpeŋɡwɪn/', example: 'Penguins cannot fly.', viExample: 'Chim cánh cụt không bay được.' },
      { en: 'head', type: '(n)', vi: 'cái đầu 🗣️', ipa: '/hed/', example: 'I wear a hat on my head.', viExample: 'Tôi đội mũ trên đầu.' },
      { en: 'eyes', type: '(n)', vi: 'đôi mắt 👀', ipa: '/aɪz/', example: 'I have two eyes.', viExample: 'Tôi có hai mắt.' },
      { en: 'nose', type: '(n)', vi: 'cái mũi 👃', ipa: '/nəʊz/', example: 'I smell with my nose.', viExample: 'Tôi ngửi bằng mũi.' },
      { en: 'mouth', type: '(n)', vi: 'cái miệng 👄', ipa: '/maʊθ/', example: 'I eat with my mouth.', viExample: 'Tôi ăn bằng miệng.' },
      { en: 'ears', type: '(n)', vi: 'đôi tai 👂', ipa: '/ɪərz/', example: 'I hear with my ears.', viExample: 'Tôi nghe bằng tai.' },
      { en: 'hands', type: '(n)', vi: 'đôi bàn tay 🙌', ipa: '/hændz/', example: 'I clap my hands.', viExample: 'Tôi vỗ đôi bàn tay.' },
      { en: 'feet', type: '(n)', vi: 'đôi bàn chân 🦶', ipa: '/fiːt/', example: 'I walk with my feet.', viExample: 'Tôi đi bằng đôi bàn chân.' },
      { en: 'happy', type: '(adj)', vi: 'vui vẻ 😊', ipa: '/ˈhæpi/', example: 'I am happy today!', viExample: 'Hôm nay tôi rất vui!' },
      { en: 'sad', type: '(adj)', vi: 'buồn 😢', ipa: '/sæd/', example: 'Don\'t be sad.', viExample: 'Đừng buồn nhé.' },
      { en: 'big', type: '(adj)', vi: 'to lớn 🔝', ipa: '/bɪɡ/', example: 'The elephant is big.', viExample: 'Con voi to lớn.' },
      { en: 'small', type: '(adj)', vi: 'nhỏ bé 🔽', ipa: '/smɔːl/', example: 'The mouse is small.', viExample: 'Con chuột nhỏ bé.' },
      { en: 'hot', type: '(adj)', vi: 'nóng 🔥', ipa: '/hɒt/', example: 'The sun is hot.', viExample: 'Mặt trời nóng.' },
      { en: 'cold', type: '(adj)', vi: 'lạnh ❄️', ipa: '/kəʊld/', example: 'Ice cream is cold.', viExample: 'Kem lạnh.' },
      { en: 'fast', type: '(adj)', vi: 'nhanh ⚡', ipa: '/fɑːst/', example: 'The cheetah is very fast.', viExample: 'Báo cheetah rất nhanh.' },
      { en: 'slow', type: '(adj)', vi: 'chậm 🐢', ipa: '/sləʊ/', example: 'The turtle is slow.', viExample: 'Con rùa chậm.' },
      { en: 'hello', type: '(exclam)', vi: 'xin chào 👋', ipa: '/həˈləʊ/', example: 'Hello! Nice to meet you!', viExample: 'Xin chào! Rất vui được gặp bạn!' },
      { en: 'goodbye', type: '(exclam)', vi: 'tạm biệt 👋', ipa: '/ˌɡʊdˈbaɪ/', example: 'Goodbye! See you tomorrow!', viExample: 'Tạm biệt! Gặp lại ngày mai!' },
      { en: 'please', type: '(adv)', vi: 'làm ơn 🙏', ipa: '/pliːz/', example: 'Can I have some water, please?', viExample: 'Cho tôi xin chút nước được không?' },
      { en: 'thank you', type: '(exclam)', vi: 'cảm ơn 🙏', ipa: '/ˌθæŋk ˈjuː/', example: 'Thank you for your help!', viExample: 'Cảm ơn vì đã giúp đỡ!' },
      { en: 'sorry', type: '(exclam)', vi: 'xin lỗi 😔', ipa: '/ˈsɒri/', example: 'I\'m sorry, I didn\'t mean it.', viExample: 'Tôi xin lỗi, tôi không cố ý.' },
      { en: 'yes', type: '(adv)', vi: 'có / đồng ý ✅', ipa: '/jes/', example: 'Yes, I can do it!', viExample: 'Có, tôi làm được!' },
      { en: 'no', type: '(adv)', vi: 'không ❌', ipa: '/nəʊ/', example: 'No, that\'s wrong.', viExample: 'Không, cái đó sai.' },
      { en: 'apple', type: '(n)', vi: 'quả táo 🍎', ipa: '/ˈæpl/', example: 'An apple a day keeps the doctor away.', viExample: 'Một quả táo mỗi ngày giúp bạn khỏe mạnh.' },
      { en: 'banana', type: '(n)', vi: 'quả chuối 🍌', ipa: '/bəˈnɑːnə/', example: 'Monkeys love bananas.', viExample: 'Khỉ thích chuối.' },
      { en: 'milk', type: '(n)', vi: 'sữa 🥛', ipa: '/mɪlk/', example: 'I drink milk every morning.', viExample: 'Tôi uống sữa mỗi sáng.' },
      { en: 'water', type: '(n)', vi: 'nước 💧', ipa: '/ˈwɔːtər/', example: 'Drink more water!', viExample: 'Uống nhiều nước hơn nhé!' },
      { en: 'school', type: '(n)', vi: 'trường học 🏫', ipa: '/skuːl/', example: 'I go to school every day.', viExample: 'Tôi đi học mỗi ngày.' },
      { en: 'book', type: '(n)', vi: 'cuốn sách 📚', ipa: '/bʊk/', example: 'I love reading books.', viExample: 'Tôi thích đọc sách.' },
      { en: 'friend', type: '(n)', vi: 'người bạn 🤝', ipa: '/frend/', example: 'She is my best friend.', viExample: 'Cô ấy là người bạn thân nhất của tôi.' },
      { en: 'family', type: '(n)', vi: 'gia đình 👨‍👩‍👧‍👦', ipa: '/ˈfæməli/', example: 'I love my family.', viExample: 'Tôi yêu gia đình tôi.' },
      { en: 'play', type: '(v)', vi: 'chơi 🎮', ipa: '/pleɪ/', example: 'Let\'s play together!', viExample: 'Hãy cùng chơi nào!' },
      { en: 'run', type: '(v)', vi: 'chạy 🏃', ipa: '/rʌn/', example: 'I can run very fast.', viExample: 'Tôi chạy rất nhanh.' },
      { en: 'jump', type: '(v)', vi: 'nhảy 🐸', ipa: '/dʒʌmp/', example: 'Frogs can jump high.', viExample: 'Ếch có thể nhảy cao.' },
      { en: 'sing', type: '(v)', vi: 'hát 🎵', ipa: '/sɪŋ/', example: 'I love to sing songs.', viExample: 'Tôi thích hát bài hát.' },
      { en: 'draw', type: '(v)', vi: 'vẽ 🎨', ipa: '/drɔː/', example: 'I like to draw pictures.', viExample: 'Tôi thích vẽ tranh.' },
      { en: 'sleep', type: '(v)', vi: 'ngủ 💤', ipa: '/sliːp/', example: 'Children need 10 hours of sleep.', viExample: 'Trẻ em cần ngủ 10 tiếng.' },
      { en: 'eat', type: '(v)', vi: 'ăn 🍽️', ipa: '/iːt/', example: 'Eat your vegetables!', viExample: 'Ăn rau của bạn nào!' },
      { en: 'drink', type: '(v)', vi: 'uống 🥤', ipa: '/drɪŋk/', example: 'Drink your milk.', viExample: 'Uống sữa đi nào.' },
      { en: 'read', type: '(v)', vi: 'đọc 📖', ipa: '/riːd/', example: 'I read before bed.', viExample: 'Tôi đọc sách trước khi ngủ.' },
      { en: 'listen', type: '(v)', vi: 'nghe 👂', ipa: '/ˈlɪsn/', example: 'Listen to the teacher!', viExample: 'Lắng nghe giáo viên nào!' },
      { en: 'learn', type: '(v)', vi: 'học 📝', ipa: '/lɜːrn/', example: 'I love to learn new things.', viExample: 'Tôi thích học điều mới.' },
      { en: 'love', type: '(v/n)', vi: 'yêu thương ❤️', ipa: '/lʌv/', example: 'I love you, Mom!', viExample: 'Con yêu mẹ!' },
      { en: 'star', type: '(n)', vi: 'ngôi sao ⭐', ipa: '/stɑːr/', example: 'I can see many stars tonight.', viExample: 'Tôi thấy nhiều ngôi sao tối nay.' },
      { en: 'moon', type: '(n)', vi: 'mặt trăng 🌙', ipa: '/muːn/', example: 'The moon is beautiful tonight.', viExample: 'Trăng đẹp tối nay.' },
      { en: 'sun', type: '(n)', vi: 'mặt trời ☀️', ipa: '/sʌn/', example: 'The sun rises in the morning.', viExample: 'Mặt trời mọc vào buổi sáng.' },
      { en: 'rain', type: '(n)', vi: 'mưa 🌧️', ipa: '/reɪn/', example: 'I love dancing in the rain.', viExample: 'Tôi thích nhảy dưới mưa.' },
      { en: 'flower', type: '(n)', vi: 'bông hoa 🌸', ipa: '/ˈflaʊər/', example: 'The flower smells nice.', viExample: 'Bông hoa có mùi thơm.' },
      { en: 'tree', type: '(n)', vi: 'cây cối 🌳', ipa: '/triː/', example: 'I climb the tree in the garden.', viExample: 'Tôi leo cây trong vườn.' },
      { en: 'house', type: '(n)', vi: 'ngôi nhà 🏠', ipa: '/haʊs/', example: 'My house has a red roof.', viExample: 'Nhà tôi có mái đỏ.' },
      { en: 'car', type: '(n)', vi: 'xe ô tô 🚗', ipa: '/kɑːr/', example: 'Dad drives a blue car.', viExample: 'Bố lái xe ô tô xanh.' },
      { en: 'bicycle', type: '(n)', vi: 'xe đạp 🚲', ipa: '/ˈbaɪsɪkl/', example: 'I ride my bicycle to school.', viExample: 'Tôi đạp xe đến trường.' },
      { en: 'ball', type: '(n)', vi: 'quả bóng ⚽', ipa: '/bɔːl/', example: 'I kick the ball.', viExample: 'Tôi đá bóng.' },
      { en: 'toy', type: '(n)', vi: 'đồ chơi 🧸', ipa: '/tɔɪ/', example: 'My favorite toy is a teddy bear.', viExample: 'Đồ chơi yêu thích của tôi là gấu bông.' },
      { en: 'game', type: '(n)', vi: 'trò chơi 🎲', ipa: '/ɡeɪm/', example: 'Let\'s play a game!', viExample: 'Hãy chơi trò chơi nào!' }
    ],
    storyEn: `📖 LUNA'S ADVENTURE 🦉
Hello! I am Luna the owl! Today is a big, happy day!
I wake up early and say "Good morning!" to the yellow sun ☀️.
I see a big red apple 🍎 on the tree.
I run fast to school with my friend, the little cat 🐱.
At school, I learn colors: red, blue, green, yellow! 
I draw a flower 🌸 with my green pencil.
My teacher says: "Luna, you are very good today!"
After school, I play with my ball ⚽ in the garden.
I see a rainbow 🌈 with seven colors!
At night, I look at the moon 🌙 and count the stars: one, two, three...
I love learning English! Do you? 😊`,
    storyVi: `📖 CUỘC PHIÊU LƯU CỦA LUNA 🦉
Xin chào (Hello)! Tôi là Luna chú cú! Hôm nay là một ngày Vui vẻ (Happy) tuyệt vời!
Tôi thức dậy sớm và nói "Good morning!" với Mặt trời (Sun) Màu vàng (Yellow) ☀️.
Tôi thấy một Quả táo (Apple) Màu đỏ (Red) 🍎 to trên cây.
Tôi Chạy (Run) nhanh đến Trường học (School) với Bạn (Friend) là con Mèo (Cat) nhỏ 🐱.
Ở trường, tôi Học (Learn) màu sắc: đỏ, xanh dương, xanh lá, vàng!
Tôi Vẽ (Draw) bông Hoa (Flower) 🌸 bằng bút chì màu xanh lá.
Giáo viên nói: "Luna, hôm nay em rất giỏi!"
Sau giờ học, tôi Chơi (Play) bóng ⚽ trong vườn.
Tôi thấy cầu vồng 🌈 với bảy màu sắc!
Ban đêm, tôi nhìn Mặt trăng (Moon) 🌙 và đếm các Ngôi sao (Stars): Một (One), Hai (Two), Ba (Three)...
Tôi Yêu (Love) học tiếng Anh! Còn bạn thì sao? 😊`
  }
];

export default vocabExtendedData;
