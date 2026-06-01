// File: src/data/roadmapData.js

export const roadmapData = [
  {
    level: 'beginner',
    levelTitle: 'Sơ Cấp (Beginner - A1/A2)',
    levelDesc: 'Xây dựng nền tảng vững chắc với từ vựng sinh hoạt cơ bản và các thì thời gian đơn giản.',
    color: 'border-cyan-500 bg-cyan-50 text-cyan-800',
    badgeColor: 'bg-cyan-500 text-white',
    milestones: [
      { id: 'm1', title: 'Hiện Tại Đơn', type: 'grammar', targetId: 't1', desc: 'Diễn tả thói quen, chân lý hiển nhiên và lịch trình cố định.' },
      { id: 'm2', title: 'Hiện Tại Tiếp Diễn', type: 'grammar', targetId: 't2', desc: 'Diễn tả hành động đang diễn ra tại thời điểm nói hoặc kế hoạch gần.' },
      { id: 'm3', title: 'Từ Vựng Oxford: Unit 1', type: 'oxford', targetId: 1, desc: 'Làm quen với các thuật ngữ chỉ bộ phận ngôn ngữ và chỉ thị bài tập.' },
      { id: 'm4', title: 'Quá Khứ Đơn', type: 'grammar', targetId: 't3', desc: 'Diễn tả hành động đã xảy ra và chấm dứt hoàn toàn trong quá khứ.' },
      { id: 'm5', title: 'Từ Vựng VSTEP: Đời Sống', type: 'vstep', targetId: 'daily-routine-time-management', desc: 'Chủ đề sinh hoạt hằng ngày và quản lý thời gian hiệu quả.' },
      { id: 'm6', title: 'Tương Lai Đơn', type: 'grammar', targetId: 't9', desc: 'Quyết định tự phát tại thời điểm nói, lời hứa hoặc dự đoán tương lai.' }
    ]
  },
  {
    level: 'intermediate',
    levelTitle: 'Trung Cấp (Intermediate - B1/B2)',
    levelDesc: 'Làm chủ các thì phức tạp hơn, câu điều kiện, mệnh đề quan hệ và từ vựng giao tiếp thực tế.',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-800',
    badgeColor: 'bg-emerald-500 text-white',
    milestones: [
      { id: 'm7', title: 'Quá Khứ Tiếp Diễn', type: 'grammar', targetId: 't4', desc: 'Hành động đang diễn ra tại thời điểm xác định trong quá khứ.' },
      { id: 'm8', title: 'Hiện Tại Hoàn Thành', type: 'grammar', targetId: 't5', desc: 'Nhấn mạnh kết quả của hành động kéo dài từ quá khứ đến nay.' },
      { id: 'm9', title: 'Từ Vựng VSTEP: Du Lịch', type: 'vstep', targetId: 'travel-transport', desc: 'Chủ đề phương tiện đi lại, sân bay, biển báo và những chuyến hành trình.' },
      { id: 'm10', title: 'Hiện Tại Hoàn Thành Tiếp Diễn', type: 'grammar', targetId: 't6', desc: 'Nhấn mạnh tính liên tục của hành động kéo dài liên tiếp đến hiện tại.' },
      { id: 'm11', title: 'Quá Khứ Hoàn Thành', type: 'grammar', targetId: 't7', desc: 'Hành động xảy ra trước một hành động khác trong quá khứ.' },
      { id: 'm12', title: 'Tương Lai Tiếp Diễn', type: 'grammar', targetId: 't10', desc: 'Hành động đang diễn ra tại một thời điểm cụ thể ở tương lai.' },
      { id: 'm13', title: 'Câu Điều Kiện', type: 'grammar', targetId: 't13', desc: 'Cấu trúc giả định điều kiện loại 1, 2, 3 và cách sử dụng Unless.' },
      { id: 'm14', title: 'Câu Ao Ước (Wish)', type: 'grammar', targetId: 't14', desc: 'Bày tỏ mong muốn trái ngược thực tế ở hiện tại, tương lai hoặc quá khứ.' },
      { id: 'm15', title: 'Mệnh Đề Quan Hệ', type: 'grammar', targetId: 't15', desc: 'Sử dụng Who, Whom, Which, That, Whose và cách rút gọn mệnh đề.' },
      { id: 'm16', title: 'Câu So Sánh', type: 'grammar', targetId: 't16', desc: 'So sánh ngang bằng, so sánh hơn, so sánh nhất và so sánh kép.' },
      { id: 'm17', title: 'Câu Hỏi Đuôi', type: 'grammar', targetId: 't17', desc: 'Xác nhận thông tin nhanh trong giao tiếp, các trường hợp đặc biệt.' },
      { id: 'm18', title: 'Từ Vựng VSTEP: Thiên Nhiên', type: 'vstep', targetId: 'nature-countryside', desc: 'Thế giới tự nhiên, động thực vật và cuộc sống thôn quê yên bình.' }
    ]
  },
  {
    level: 'advanced',
    levelTitle: 'Cao Cấp (Advanced - C1/C2)',
    levelDesc: 'Độc chiếm ngữ pháp học thuật, đảo ngữ nâng cao, mệnh đề trạng ngữ và viết luận học thuật.',
    color: 'border-rose-500 bg-rose-50 text-rose-800',
    badgeColor: 'bg-rose-500 text-white',
    milestones: [
      { id: 'm19', title: 'Quá Khứ Hoàn Thành Tiếp Diễn', type: 'grammar', targetId: 't8', desc: 'Nhấn mạnh quá trình xảy ra trước một hành động quá khứ khác.' },
      { id: 'm20', title: 'Tương Lai Hoàn Thành', type: 'grammar', targetId: 't11', desc: 'Diễn tả sự việc sẽ hoàn thành trước một thời điểm ở tương lai.' },
      { id: 'm21', title: 'Từ Vựng VSTEP: Y Tế', type: 'vstep', targetId: 'health-medical', desc: 'Từ vựng chuyên sâu về cơ thể, bệnh lý, phòng khám và sơ cứu.' },
      { id: 'm22', title: 'Tương Lai Hoàn Thành Tiếp Diễn', type: 'grammar', targetId: 't12', desc: 'Nhấn mạnh khoảng thời gian kéo dài của hành động tính đến tương lai.' },
      { id: 'm23', title: 'Câu Giả Định (Subjunctive)', type: 'grammar', targetId: 't18', desc: 'Diễn tả các đề xuất, gợi ý quan trọng hoặc mang tính khẩn cấp.' },
      { id: 'm24', title: 'Đảo Ngữ (Inversion)', type: 'grammar', targetId: 't19', desc: 'Đảo ngữ của các trạng từ phủ định, cấu trúc No sooner... than.' },
      { id: 'm25', title: 'Mệnh Đề Trạng Ngữ', type: 'grammar', targetId: 't20', desc: 'Mệnh đề phụ chỉ nguyên nhân, nhượng bộ, kết quả, điều kiện.' },
      { id: 'm26', title: 'Từ Vựng VSTEP: Kinh Tế', type: 'vstep', targetId: 'economy-money', desc: 'Từ vựng tài chính, tiền tệ, các hoạt động thương mại toàn cầu.' },
      { id: 'm27', title: '67 Cấu Trúc Thông Dụng', type: 'grammar', targetId: 't21', desc: 'Học các cấu trúc viết lại câu kinh điển thường xuất hiện trong các kỳ thi lớn.' },
      { id: 'm28', title: 'Từ Vựng VSTEP: Giáo Dục', type: 'vstep', targetId: 'education-learning-advanced', desc: 'Từ vựng nâng cao về giáo dục đại học, phương pháp học tập và học thuật.' }
    ]
  }
];
