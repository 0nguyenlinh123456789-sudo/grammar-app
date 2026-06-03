// File: src/data/roadmapData.js

export const roadmapData = [
  {
    level: 'beginner',
    levelTitle: 'Sơ Cấp (Beginner - A1/A2)',
    levelDesc: 'Xây dựng nền tảng vững chắc với từ vựng sinh hoạt cơ bản và các thì thời gian đơn giản.',
    color: 'border-cyan-500 bg-cyan-50 text-cyan-800',
    badgeColor: 'bg-cyan-500 text-white',
    milestones: [
      { id: 'm1', title: 'Hiện Tại Đơn (Present Simple)', type: 'grammar', targetId: 'b1_01', desc: 'Diễn tả thói quen, chân lý hiển nhiên và lịch trình cố định.' },
      { id: 'm2', title: 'Hiện Tại Tiếp Diễn (Present Cont.)', type: 'grammar', targetId: 'b1_02', desc: 'Diễn tả hành động đang diễn ra tại thời điểm nói hoặc kế hoạch gần.' },
      { id: 'm3', title: 'Từ Vựng Oxford: Unit 1', type: 'oxford', targetId: 1, desc: 'Làm quen với các thuật ngữ chỉ bộ phận ngôn ngữ và chỉ thị bài tập.' },
      { id: 'm4', title: 'Quá Khứ Đơn (Past Simple)', type: 'grammar', targetId: 'b1_03', desc: 'Diễn tả hành động đã xảy ra và chấm dứt hoàn toàn trong quá khứ.' },
      { id: 'm5', title: 'Từ Vựng VSTEP: Đời Sống', type: 'vstep', targetId: 'daily-routine-time-management', desc: 'Chủ đề sinh hoạt hằng ngày và quản lý thời gian hiệu quả.' },
      { id: 'm6', title: 'Quá Khứ Tiếp Diễn', type: 'grammar', targetId: 'b1_04', desc: 'Hành động đang diễn ra tại một thời điểm cụ thể trong quá khứ.' }
    ]
  },
  {
    level: 'intermediate',
    levelTitle: 'Trung Cấp (Intermediate - B1/B2)',
    levelDesc: 'Làm chủ các thì phức tạp hơn, câu điều kiện, mệnh đề quan hệ và từ vựng giao tiếp thực tế.',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-800',
    badgeColor: 'bg-emerald-500 text-white',
    milestones: [
      { id: 'm7', title: 'Hiện Tại Hoàn Thành', type: 'grammar', targetId: 'b1_05', desc: 'Nhấn mạnh kết quả của hành động kéo dài từ quá khứ đến nay.' },
      { id: 'm8', title: 'Quá Khứ Hoàn Thành', type: 'grammar', targetId: 'b2_02', desc: 'Hành động xảy ra trước một hành động khác trong quá khứ.' },
      { id: 'm9', title: 'Từ Vựng VSTEP: Du Lịch', type: 'vstep', targetId: 'travel-transport', desc: 'Chủ đề phương tiện đi lại, sân bay, biển báo và những chuyến hành trình.' },
      { id: 'm10', title: 'Bị Động Nâng Cao', type: 'grammar', targetId: 'b2_03', desc: 'Câu bị động đặc biệt, nhờ vả (causative).' },
      { id: 'm11', title: 'Câu Điều Kiện', type: 'grammar', targetId: 'b2_06', desc: 'Cấu trúc giả định điều kiện loại 0, 1, 2, 3.' },
      { id: 'm12', title: 'Mệnh Đề Quan Hệ', type: 'grammar', targetId: 'b2_05', desc: 'Sử dụng Who, Whom, Which, That, Whose và mệnh đề rút gọn.' },
      { id: 'm13', title: 'Câu Trực Tiếp - Gián Tiếp', type: 'grammar', targetId: 'b2_04', desc: 'Tường thuật lại lời nói của người khác.' },
      { id: 'm14', title: 'Câu Hỏi Đuôi', type: 'grammar', targetId: 'b2_14', desc: 'Xác nhận thông tin nhanh trong giao tiếp, các trường hợp đặc biệt.' },
      { id: 'm15', title: 'Từ Vựng VSTEP: Thiên Nhiên', type: 'vstep', targetId: 'nature-countryside', desc: 'Thế giới tự nhiên, động thực vật và cuộc sống thôn quê yên bình.' }
    ]
  },
  {
    level: 'advanced',
    levelTitle: 'Cao Cấp (Advanced - C1/C2)',
    levelDesc: 'Độc chiếm ngữ pháp học thuật, đảo ngữ nâng cao, mệnh đề trạng ngữ và viết luận học thuật.',
    color: 'border-rose-500 bg-rose-50 text-rose-800',
    badgeColor: 'bg-rose-500 text-white',
    milestones: [
      { id: 'm16', title: 'Hiện Tại & Quá Khứ (Advanced)', type: 'grammar', targetId: 'c1c2_1', desc: 'Các dạng thì phức tạp kết hợp thói quen và sự việc kéo dài.' },
      { id: 'm17', title: 'Inversion (Đảo ngữ)', type: 'grammar', targetId: 'c1c2_3', desc: 'Đảo ngữ của các trạng từ phủ định, cấu trúc No sooner... than.' },
      { id: 'm18', title: 'Từ Vựng VSTEP: Y Tế', type: 'vstep', targetId: 'health-medical', desc: 'Từ vựng chuyên sâu về cơ thể, bệnh lý, phòng khám và sơ cứu.' },
      { id: 'm19', title: 'Giả Định (Subjunctive)', type: 'grammar', targetId: 'c1c2_5', desc: 'Diễn tả các đề xuất, gợi ý quan trọng hoặc mang tính khẩn cấp.' },
      { id: 'm20', title: 'Rút gọn MĐQH (Advanced)', type: 'grammar', targetId: 'c1c2_8', desc: 'Rút gọn chủ động, bị động, To V và cụm danh từ đồng vị.' },
      { id: 'm21', title: 'Collocations (C1/C2)', type: 'grammar', targetId: 'c1c2_20', desc: 'Cụm từ cố định tự nhiên như người bản xứ.' },
      { id: 'm22', title: 'Từ Vựng VSTEP: Kinh Tế', type: 'vstep', targetId: 'economy-money', desc: 'Từ vựng tài chính, tiền tệ, các hoạt động thương mại toàn cầu.' },
      { id: 'm23', title: 'Idioms (C1/C2)', type: 'grammar', targetId: 'c1c2_22', desc: 'Thành ngữ sử dụng trong giao tiếp và kỳ thi học thuật.' },
      { id: 'm24', title: 'Tổng Ôn C1/C2', type: 'grammar', targetId: 'c1c2_25', desc: 'Bài tập trộn kiến thức tổng quát cho trình độ Master.' },
      { id: 'm25', title: 'Từ Vựng VSTEP: Giáo Dục', type: 'vstep', targetId: 'education-learning-advanced', desc: 'Từ vựng nâng cao về giáo dục đại học, phương pháp học tập.' }
    ]
  }
];
