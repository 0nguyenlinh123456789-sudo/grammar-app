// Script to generate vocabulary topic data files
// Run: node scratch/generateTopics.cjs

const fs = require('fs');
const path = require('path');

// ===================== TOPIC DEFINITIONS =====================
const VSTEP_TOPICS = [
  { id: "sustainable-tourism-vstep", title: "🌍 Du Lịch Bền Vững", level: "B1-B2", tags: ["VSTEP B1-B2"], desc: "Du lịch có trách nhiệm, bảo vệ môi trường và văn hóa địa phương." },
  { id: "water-pollution-vstep", title: "💧 Ô Nhiễm Nước & Biển", level: "B1-B2", tags: ["VSTEP B1-B2", "IELTS Band 5-6"], desc: "Ô nhiễm nguồn nước, biển, nhựa đại dương và giải pháp bảo vệ." },
  { id: "population-migration-vstep", title: "👥 Dân Số & Di Cư", level: "B2", tags: ["VSTEP B2", "IELTS Band 6"], desc: "Tăng dân số, di cư, đô thị hóa và tác động xã hội." },
  { id: "traditions-festivals-vstep", title: "🎊 Truyền Thống & Lễ Hội VN", level: "B1-B2", tags: ["VSTEP B1-B2"], desc: "Lễ hội truyền thống Việt Nam, phong tục tập quán, văn hóa dân gian." },
  { id: "traditional-modern-medicine-vstep", title: "💊 Y Học Cổ Truyền & Hiện Đại", level: "B2", tags: ["VSTEP B2"], desc: "So sánh y học cổ truyền và hiện đại, thuốc thảo dược, chữa bệnh." },
  { id: "e-learning-vstep", title: "💻 Giáo Dục Trực Tuyến", level: "B1-B2", tags: ["VSTEP B1-B2"], desc: "Học trực tuyến, nền tảng số, ưu nhược điểm của giáo dục từ xa." },
  { id: "children-rights-vstep", title: "👧 Quyền Trẻ Em & Bảo Vệ Trẻ", level: "B2", tags: ["VSTEP B2"], desc: "Quyền trẻ em, bạo lực gia đình, giáo dục trẻ em, lao động trẻ em." },
  { id: "e-commerce-vstep", title: "🛒 Thương Mại Điện Tử", level: "B1-B2", tags: ["VSTEP B1-B2", "TOEIC"], desc: "Mua bán trực tuyến, thanh toán số, logistics, marketing digital." },
  { id: "renewable-energy-vstep", title: "⚡ Năng Lượng Tái Tạo", level: "B2", tags: ["VSTEP B2", "IELTS Band 6"], desc: "Năng lượng mặt trời, gió, thủy điện, năng lượng xanh." },
  { id: "climate-adaptation-vstep", title: "🌡️ Biến Đổi Khí Hậu & Thích Ứng", level: "B2-C1", tags: ["VSTEP B2-C1", "IELTS Band 6-7"], desc: "Hiệu ứng nhà kính, nóng lên toàn cầu, giải pháp thích ứng." },
  { id: "reading-culture-vstep", title: "📚 Văn Hóa Đọc & Thư Viện", level: "B1", tags: ["VSTEP B1"], desc: "Sách, thư viện, xuất bản, văn hóa đọc trong thời đại số." },
  { id: "gender-equality-vstep", title: "⚖️ Bình Đẳng Giới", level: "B2", tags: ["VSTEP B2", "IELTS Band 6"], desc: "Bình đẳng giới, nữ quyền, phân biệt giới tính, vấn đề xã hội." },
  { id: "food-safety-vstep", title: "🍽️ An Toàn Thực Phẩm", level: "B1-B2", tags: ["VSTEP B1-B2"], desc: "Vệ sinh thực phẩm, chất phụ gia, tiêu chuẩn an toàn, ngộ độc." },
  { id: "intercultural-communication-vstep", title: "🌐 Giao Tiếp Liên Văn Hóa", level: "B2-C1", tags: ["VSTEP B2-C1"], desc: "Giao tiếp giữa các nền văn hóa, hiểu lầm văn hóa, hội nhập." },
  { id: "digital-economy-vstep", title: "📱 Kinh Tế Số & Startup", level: "B2", tags: ["VSTEP B2", "TOEIC"], desc: "Kinh tế số, khởi nghiệp, fintech, chuyển đổi số." },
  { id: "cybercrime-vstep", title: "🔒 Tội Phạm Mạng & An Ninh", level: "B2-C1", tags: ["VSTEP B2-C1"], desc: "Tội phạm mạng, hack, lừa đảo trực tuyến, bảo mật thông tin." },
  { id: "rural-development-vstep", title: "🏡 Phát Triển Nông Thôn", level: "B1-B2", tags: ["VSTEP B1-B2"], desc: "Xây dựng nông thôn mới, hạ tầng, thu nhập, chất lượng sống." },
  { id: "world-heritage-vstep", title: "🏛️ Di Sản Văn Hóa Thế Giới", level: "B2", tags: ["VSTEP B2"], desc: "Di sản UNESCO, bảo tồn, du lịch di sản, kiến trúc cổ." },
  { id: "scientific-research-vstep", title: "🔬 Nghiên Cứu Khoa Học", level: "B2-C1", tags: ["VSTEP B2-C1", "IELTS Band 7"], desc: "Phương pháp nghiên cứu, thí nghiệm, dữ liệu, xuất bản khoa học." },
  { id: "education-policy-vstep", title: "📋 Chính Sách Giáo Dục", level: "B2", tags: ["VSTEP B2"], desc: "Cải cách giáo dục, chương trình học, đánh giá, thi cử." },
  { id: "waste-management-vstep", title: "♻️ Quản Lý Rác Thải & Tái Chế", level: "B1-B2", tags: ["VSTEP B1-B2", "IELTS Band 5-6"], desc: "Phân loại rác, tái chế, giảm thiểu chất thải, kinh tế tuần hoàn." },
  { id: "community-health-vstep", title: "🏥 Sức Khỏe Cộng Đồng", level: "B2", tags: ["VSTEP B2"], desc: "Y tế cộng đồng, phòng bệnh, tiêm chủng, dịch bệnh." },
  { id: "future-careers-vstep", title: "💼 Nghề Nghiệp Tương Lai", level: "B1-B2", tags: ["VSTEP B1-B2", "TOEIC"], desc: "Nghề hot, kỹ năng tương lai, tự động hóa, AI thay thế lao động." },
  { id: "international-sports-vstep", title: "🏅 Thể Thao Quốc Tế", level: "B1-B2", tags: ["VSTEP B1-B2"], desc: "Olympic, World Cup, SEA Games, thể thao điện tử." },
  { id: "architecture-planning-vstep", title: "🏗️ Kiến Trúc & Quy Hoạch", level: "B2", tags: ["VSTEP B2"], desc: "Thiết kế đô thị, kiến trúc hiện đại, nhà xanh, quy hoạch." },
  { id: "mass-media-vstep", title: "📺 Truyền Thông Đại Chúng", level: "B2", tags: ["VSTEP B2", "IELTS Band 6"], desc: "Báo chí, truyền hình, tin giả, ảnh hưởng truyền thông." },
  { id: "natural-resources-vstep", title: "⛏️ Tài Nguyên Thiên Nhiên", level: "B2", tags: ["VSTEP B2"], desc: "Khoáng sản, dầu mỏ, nước ngầm, bảo tồn tài nguyên." },
  { id: "ecosystem-biodiversity-vstep", title: "🌳 Hệ Sinh Thái & Đa Dạng SH", level: "B2-C1", tags: ["VSTEP B2-C1", "IELTS Band 6-7"], desc: "Chuỗi thức ăn, rừng, san hô, loài có nguy cơ tuyệt chủng." },
  { id: "vietnamese-world-literature-vstep", title: "📖 Văn Học Việt Nam & Thế Giới", level: "B2", tags: ["VSTEP B2"], desc: "Tác phẩm, nhà văn, thể loại văn học, phê bình, dịch thuật." },
  { id: "banking-finance-vstep", title: "🏦 Ngân Hàng & Tài Chính", level: "B2", tags: ["VSTEP B2", "TOEIC 700+"], desc: "Ngân hàng, lãi suất, đầu tư, chứng khoán, tiết kiệm." },
  { id: "law-justice-vstep", title: "⚖️ Luật Pháp & Công Lý", level: "B2-C1", tags: ["VSTEP B2-C1"], desc: "Tòa án, luật sư, hình sự, dân sự, quyền con người." },
  { id: "nuclear-energy-vstep", title: "☢️ Năng Lượng Hạt Nhân", level: "C1", tags: ["VSTEP C1"], desc: "Điện hạt nhân, an toàn, phóng xạ, tranh luận ủng hộ/phản đối." },
  { id: "maritime-aviation-vstep", title: "🚢 Vận Tải Hàng Hải & Hàng Không", level: "B2", tags: ["VSTEP B2"], desc: "Cảng biển, hàng không, logistics quốc tế, vận chuyển." },
  { id: "natural-disaster-vstep", title: "🌊 Thiên Tai & Phòng Chống", level: "B1-B2", tags: ["VSTEP B1-B2"], desc: "Bão, lũ, động đất, sạt lở, cứu trợ, phòng chống thiên tai." },
  { id: "elderly-care-vstep", title: "👴 Chăm Sóc Người Cao Tuổi", level: "B2", tags: ["VSTEP B2"], desc: "Già hóa dân số, dưỡng lão, an sinh xã hội, sức khỏe người già." },
  { id: "performing-arts-vstep", title: "🎭 Nghệ Thuật Biểu Diễn", level: "B1-B2", tags: ["VSTEP B1-B2"], desc: "Kịch, múa, ca nhạc, opera, nghệ thuật truyền thống." },
  { id: "innovation-vstep", title: "💡 Khởi Nghiệp & Đổi Mới", level: "B2", tags: ["VSTEP B2", "TOEIC"], desc: "Đổi mới sáng tạo, sáng chế, bản quyền, venture capital." },
  { id: "international-relations-vstep", title: "🤝 Quan Hệ Quốc Tế & Ngoại Giao", level: "B2-C1", tags: ["VSTEP B2-C1"], desc: "Ngoại giao, hiệp định, UN, hợp tác quốc tế, xung đột." },
];

const IELTS_TOPICS = [
  { id: "housing-architecture-ielts", title: "🏠 Housing & Architecture", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Urban housing, homelessness, modern architecture, green buildings." },
  { id: "crime-punishment-ielts", title: "⚖️ Crime & Punishment", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Criminal justice, prisons, rehabilitation, death penalty debate." },
  { id: "government-politics-ielts", title: "🏛️ Government & Politics", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Democracy, elections, policy making, governance." },
  { id: "space-exploration-ielts", title: "🚀 Space Exploration", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "NASA, Mars missions, satellites, space tourism." },
  { id: "animal-rights-ielts", title: "🐾 Animal Rights & Ethics", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Animal testing, zoos, endangered species, ethical treatment." },
  { id: "cultural-diversity-ielts", title: "🌏 Cultural Diversity", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Multiculturalism, integration, cultural identity, globalization." },
  { id: "advertising-consumerism-ielts", title: "📺 Advertising & Consumerism", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Advertising techniques, consumer behavior, marketing ethics." },
  { id: "aging-society-ielts", title: "👵 Aging Society", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Aging population, pensions, healthcare, intergenerational issues." },
  { id: "social-media-impact-ielts", title: "📱 Social Media Impact", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Social media effects, cyberbullying, misinformation, digital wellbeing." },
  { id: "globalization-trade-ielts", title: "🌐 Globalization & Trade", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Free trade, tariffs, multinational corporations, economic integration." },
  { id: "arts-creativity-ielts", title: "🎨 Arts & Creativity", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Art education, funding, museums, digital art, creativity." },
  { id: "nutrition-diet-ielts", title: "🥗 Nutrition & Diet", level: "B2", tags: ["IELTS Band 5-6"], desc: "Healthy eating, vegetarianism, food additives, obesity." },
  { id: "transport-infrastructure-ielts", title: "🚆 Transportation & Infrastructure", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Public transport, rail networks, road systems, smart cities." },
  { id: "tourism-industry-ielts", title: "✈️ Tourism & Travel Industry", level: "B2", tags: ["IELTS Band 5-6"], desc: "Ecotourism, overtourism, economic impact, cultural tourism." },
  { id: "water-resources-ielts", title: "💧 Water Resources", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Water scarcity, conservation, desalination, water pollution." },
  { id: "urbanization-ielts", title: "🏙️ Urbanization Problems", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Urban sprawl, housing shortage, slums, smart cities." },
  { id: "childhood-development-ielts", title: "👶 Childhood Development", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Early education, child psychology, screen time, play-based learning." },
  { id: "gender-equality-ielts", title: "👫 Gender Equality", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Glass ceiling, equal pay, women in STEM, gender roles." },
  { id: "poverty-inequality-ielts", title: "💰 Poverty & Inequality", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Wealth gap, social mobility, minimum wage, aid programs." },
  { id: "renewable-energy-ielts", title: "♻️ Renewable Energy", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Solar, wind, hydroelectric, nuclear vs renewable debate." },
  { id: "language-communication-ielts", title: "🗣️ Language & Communication", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Bilingualism, language death, global English, translation." },
  { id: "philosophy-ethics-ielts", title: "🤔 Philosophy & Ethics", level: "C1", tags: ["IELTS Band 7+"], desc: "Moral philosophy, bioethics, artificial intelligence ethics." },
  { id: "history-heritage-ielts", title: "🏺 History & Heritage", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Historical preservation, museums, cultural memory, archaeology." },
  { id: "fashion-identity-ielts", title: "👗 Fashion & Identity", level: "B2", tags: ["IELTS Band 5-6"], desc: "Fast fashion, sustainability, cultural fashion, self-expression." },
  { id: "film-entertainment-ielts", title: "🎬 Film & Entertainment", level: "B2", tags: ["IELTS Band 5-6"], desc: "Film industry, streaming, censorship, cultural influence." },
  { id: "sports-competition-ielts", title: "🏆 Sports & Competition", level: "B2", tags: ["IELTS Band 5-6"], desc: "Professional sports, doping, youth sports, esports." },
  { id: "migration-refugees-ielts", title: "🚶 Migration & Refugees", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Immigration policy, refugees, integration, brain drain." },
  { id: "ai-future-ielts", title: "🤖 Artificial Intelligence", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Machine learning, automation, job displacement, AI ethics." },
  { id: "privacy-surveillance-ielts", title: "🔐 Privacy & Surveillance", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Data privacy, facial recognition, government surveillance, GDPR." },
  { id: "mental-health-ielts", title: "🧠 Mental Health", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Depression, anxiety, therapy, stigma, workplace mental health." },
  { id: "agriculture-food-ielts", title: "🌾 Agriculture & Food Security", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "GMOs, organic farming, food scarcity, vertical farming." },
  { id: "museums-libraries-ielts", title: "🏛️ Museums & Libraries", level: "B2", tags: ["IELTS Band 5-6"], desc: "Cultural institutions, digitization, public access, funding." },
  { id: "public-health-ielts", title: "🏥 Public Health", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Healthcare systems, pandemics, vaccination, universal health." },
  { id: "ocean-conservation-ielts", title: "🐋 Ocean Conservation", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Marine pollution, coral reefs, overfishing, plastic waste." },
  { id: "work-life-balance-ielts", title: "⚖️ Work-Life Balance", level: "B2", tags: ["IELTS Band 5-6"], desc: "Remote work, burnout, flexible hours, productivity." },
  { id: "volunteerism-ielts", title: "🤝 Volunteerism", level: "B2", tags: ["IELTS Band 5-6"], desc: "Community service, NGOs, social impact, volunteering abroad." },
  { id: "genetic-engineering-ielts", title: "🧬 Genetic Engineering", level: "C1", tags: ["IELTS Band 7+"], desc: "CRISPR, designer babies, gene therapy, bioethics." },
  { id: "digital-economy-ielts", title: "💰 Digital Economy", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Cryptocurrency, fintech, gig economy, digital payments." },
  { id: "climate-action-ielts", title: "🌍 Climate Action", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Paris Agreement, carbon neutrality, climate protests, net zero." },
  { id: "wildlife-conservation-ielts", title: "🦁 Wildlife Conservation", level: "B2-C1", tags: ["IELTS Band 6-7"], desc: "Endangered species, national parks, poaching, habitat loss." },
  { id: "workplace-culture-ielts", title: "💼 Workplace Culture", level: "B2", tags: ["IELTS Band 5-6", "TOEIC"], desc: "Office politics, team building, diversity, leadership styles." },
  { id: "academic-writing-ielts", title: "✍️ Academic Writing Skills", level: "C1", tags: ["IELTS Band 7+"], desc: "Essay structure, hedging, referencing, coherence, academic register." },
];

// Generate word list template for a topic
function generateWordTemplate(topicTitle, wordCount = 100) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    words.push({
      en: `word_${i + 1}`,
      vi: `nghĩa_${i + 1}`,
      type: "(n)",
      ipa: "/ipa/",
      example: `Example sentence for word ${i + 1}.`,
      viExample: `Câu ví dụ cho từ ${i + 1}.`
    });
  }
  return words;
}

// Generate topic data
function generateTopicData(topics, category) {
  return topics.map(t => ({
    id: t.id,
    category: category,
    title: `${t.title} (100 Từ) (${t.level})`,
    description: `100 từ vựng: ${t.desc}`,
    level: t.level,
    examTags: t.tags,
    words: generateWordTemplate(t.title),
    storyEn: `[Story for ${t.title} - uses all 100 vocabulary words in context]`,
    storyVi: `[Câu chuyện cho ${t.title} - sử dụng tất cả 100 từ vựng trong ngữ cảnh]`,
  }));
}

// Output info
console.log(`=== VSTEP Topics: ${VSTEP_TOPICS.length} (need 40 total, already have 2 complete) ===`);
console.log(`=== IELTS Topics: ${IELTS_TOPICS.length} ===`);
console.log(`Total new topics defined: ${VSTEP_TOPICS.length + IELTS_TOPICS.length}`);
console.log('');

// Print topic list
console.log('--- VSTEP NEW TOPICS ---');
VSTEP_TOPICS.forEach((t, i) => console.log(`${i+1}. ${t.id}: ${t.title}`));
console.log('');
console.log('--- IELTS NEW TOPICS ---');
IELTS_TOPICS.forEach((t, i) => console.log(`${i+1}. ${t.id}: ${t.title}`));

// Export for use
module.exports = { VSTEP_TOPICS, IELTS_TOPICS, generateTopicData };
