// File: src/components/vocab/ActionScenarioMode.jsx
// Role-play scenarios with dialogue using topic vocabulary

import { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronUp, Volume2 } from 'lucide-react';

// Default scenarios by topic keywords
const SCENARIO_TEMPLATES = {
  'travel': [
    {
      title: '✈️ Tại Sân Bay (At the Airport)',
      icon: '✈️',
      color: 'bg-sky-100 dark:bg-sky-900/40 border-sky-400',
      dialogue: [
        { speaker: 'Staff 👩', line: 'Can I see your boarding pass and passport, please?', vi: 'Xin cho xem thẻ lên máy bay và hộ chiếu của bạn?' },
        { speaker: 'You 🙋', line: 'Here you go. Is my flight on time?', vi: 'Đây ạ. Chuyến bay của tôi có đúng giờ không?' },
        { speaker: 'Staff 👩', line: 'Yes, the departure is at gate 12. Your luggage is checked in.', vi: 'Đúng rồi, khởi hành ở cổng 12. Hành lý của bạn đã được xếp vào.' },
      ],
      task: 'Bạn đặt thêm câu: "Where is the baggage claim area?"',
    },
    {
      title: '🏨 Tại Khách Sạn (At the Hotel)',
      icon: '🏨',
      color: 'bg-amber-100 dark:bg-amber-900/40 border-amber-400',
      dialogue: [
        { speaker: 'Receptionist 👨', line: 'Good evening! Do you have a reservation?', vi: 'Chào buổi tối! Bạn có đặt phòng trước không?' },
        { speaker: 'You 🙋', line: 'Yes, I booked a single room. My name is Minh.', vi: 'Vâng, tôi đặt phòng đơn. Tên tôi là Minh.' },
        { speaker: 'Receptionist 👨', line: 'Perfect! Here is your room key. Breakfast is from 7 to 10 AM.', vi: 'Tuyệt! Đây là chìa khóa phòng. Bữa sáng từ 7 đến 10 giờ.' },
      ],
      task: 'Thực hành: "Can I get a late check-out?"',
    },
  ],
  'health': [
    {
      title: '🏥 Tại Phòng Khám (At the Doctor)',
      icon: '🏥',
      color: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400',
      dialogue: [
        { speaker: 'Doctor 👨‍⚕️', line: 'Good morning! What symptoms are you experiencing?', vi: 'Chào buổi sáng! Bạn đang có triệu chứng gì?' },
        { speaker: 'You 🙋', line: 'I have a headache and a sore throat. I also have a fever.', vi: 'Tôi bị đau đầu và đau họng. Tôi cũng bị sốt.' },
        { speaker: 'Doctor 👨‍⚕️', line: 'I see. Let me check your blood pressure and temperature.', vi: 'Tôi hiểu. Để tôi kiểm tra huyết áp và nhiệt độ của bạn.' },
      ],
      task: 'Thực hành mô tả triệu chứng bằng tiếng Anh',
    },
  ],
  'business': [
    {
      title: '💼 Buổi Họp Văn Phòng (Office Meeting)',
      icon: '💼',
      color: 'bg-indigo-100 dark:bg-indigo-900/40 border-indigo-400',
      dialogue: [
        { speaker: 'Manager 👩‍💼', line: 'Let\'s begin the meeting. Today\'s agenda includes Q3 revenue.', vi: 'Hãy bắt đầu cuộc họp. Chương trình nghị sự hôm nay gồm doanh thu Q3.' },
        { speaker: 'You 🙋', line: 'I\'d like to present our department\'s performance report.', vi: 'Tôi muốn trình bày báo cáo hiệu suất của bộ phận chúng tôi.' },
        { speaker: 'Manager 👩‍💼', line: 'Great. Please go ahead with your presentation.', vi: 'Tuyệt. Hãy tiến hành thuyết trình của bạn.' },
      ],
      task: 'Thực hành: Trình bày ý kiến trong cuộc họp bằng tiếng Anh',
    },
    {
      title: '📞 Gọi Điện Kinh Doanh (Business Call)',
      icon: '📞',
      color: 'bg-purple-100 dark:bg-purple-900/40 border-purple-400',
      dialogue: [
        { speaker: 'You 🙋', line: 'Good afternoon. This is Minh calling from ABC Company.', vi: 'Chào buổi chiều. Tôi là Minh gọi từ Công ty ABC.' },
        { speaker: 'Client 👨‍💼', line: 'Hello Minh! How can I help you today?', vi: 'Xin chào Minh! Tôi có thể giúp gì cho bạn hôm nay?' },
        { speaker: 'You 🙋', line: 'I\'d like to schedule a meeting to discuss our new proposal.', vi: 'Tôi muốn sắp xếp cuộc họp để thảo luận về đề xuất mới của chúng tôi.' },
      ],
      task: 'Thực hành: Đặt lịch hẹn gặp qua điện thoại',
    },
  ],
  'education': [
    {
      title: '🎓 Tại Trường / Lớp Học (In Class)',
      icon: '🎓',
      color: 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-400',
      dialogue: [
        { speaker: 'Teacher 👩‍🏫', line: 'Can anyone explain the concept of photosynthesis?', vi: 'Ai có thể giải thích khái niệm quang hợp không?' },
        { speaker: 'You 🙋', line: 'It\'s the process by which plants convert sunlight into energy.', vi: 'Đó là quá trình thực vật chuyển đổi ánh sáng mặt trời thành năng lượng.' },
        { speaker: 'Teacher 👩‍🏫', line: 'Excellent! That\'s a very clear explanation.', vi: 'Xuất sắc! Đó là một lời giải thích rất rõ ràng.' },
      ],
      task: 'Thực hành trả lời câu hỏi trong lớp học bằng tiếng Anh',
    },
  ],
  'default': [
    {
      title: '🛒 Mua Sắm (Shopping)',
      icon: '🛒',
      color: 'bg-rose-100 dark:bg-rose-900/40 border-rose-400',
      dialogue: [
        { speaker: 'Staff 👩‍💼', line: 'Hello! Are you looking for anything in particular?', vi: 'Xin chào! Bạn đang tìm kiếm gì đặc biệt không?' },
        { speaker: 'You 🙋', line: 'I\'d like to see your selection of winter jackets, please.', vi: 'Tôi muốn xem các mẫu áo khoác mùa đông của bạn.' },
        { speaker: 'Staff 👩‍💼', line: 'Of course! We have a great selection. This way, please.', vi: 'Tất nhiên! Chúng tôi có nhiều mẫu đẹp. Mời bạn theo đây.' },
      ],
      task: 'Thực hành: "Can I try this on?" và "Do you have a smaller size?"',
    },
    {
      title: '🍽️ Tại Nhà Hàng (At a Restaurant)',
      icon: '🍽️',
      color: 'bg-orange-100 dark:bg-orange-900/40 border-orange-400',
      dialogue: [
        { speaker: 'Waiter 🧑‍🍳', line: 'Good evening! Do you have a reservation?', vi: 'Chào buổi tối! Bạn có đặt bàn trước không?' },
        { speaker: 'You 🙋', line: 'No, but could we have a table for two, please?', vi: 'Không, nhưng chúng tôi có thể có bàn cho hai người không?' },
        { speaker: 'Waiter 🧑‍🍳', line: 'Certainly! Right this way. Here are your menus.', vi: 'Tất nhiên! Mời theo đây. Đây là thực đơn của quý khách.' },
      ],
      task: 'Thực hành gọi món: "I\'d like to order..." và "What do you recommend?"',
    },
  ],
};

const ScenarioCard = ({ scenario, playAudio }) => {
  const [expanded, setExpanded] = useState(false);
  const [userTried, setUserTried] = useState(false);

  return (
    <div className={`border-3 rounded-2xl overflow-hidden border-4 ${scenario.color} transition-all`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 font-black text-left"
      >
        <span className="text-lg text-slate-800 dark:text-slate-100">{scenario.title}</span>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in">
          {/* Dialogue */}
          <div className="space-y-2">
            {scenario.dialogue.map((line, i) => (
              <div key={i} className={`flex gap-3 ${line.speaker.includes('You') ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-slate-700 border-2 border-black flex items-center justify-center text-xl">
                  {line.speaker.split(' ')[1] || '👤'}
                </div>
                <div className={`flex-1 max-w-xs ${line.speaker.includes('You') ? 'text-right' : ''}`}>
                  <div className="text-xs font-black text-slate-500 dark:text-slate-400 mb-1">
                    {line.speaker.split(' ')[0]}
                  </div>
                  <div
                    className={`
                      inline-block rounded-2xl px-4 py-2 border-2 border-black
                      ${line.speaker.includes('You')
                        ? 'bg-yellow-400 text-slate-900'
                        : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100'
                      }
                    `}
                  >
                    <div className="font-bold text-sm">{line.line}</div>
                    <div className="text-xs opacity-75 mt-1 italic">{line.vi}</div>
                  </div>
                  <button
                    onClick={() => playAudio(line.line)}
                    className="mt-1 text-xs text-blue-500 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <Volume2 size={12} /> Nghe
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Task */}
          <div className="bg-white dark:bg-slate-700 border-2 border-dashed border-slate-400 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={16} className="text-purple-500" />
              <span className="font-black text-sm text-purple-700 dark:text-purple-300">Luyện Tập Của Bạn:</span>
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{scenario.task}</p>
            <button
              onClick={() => setUserTried(true)}
              className={`mt-3 px-4 py-2 rounded-xl border-2 border-black font-black text-sm transition-all ${
                userTried
                  ? 'bg-emerald-400 text-white'
                  : 'bg-yellow-300 hover:bg-yellow-400'
              }`}
            >
              {userTried ? '✓ Đã luyện xong!' : '🎯 Tôi đã thực hành!'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ActionScenarioMode = ({ activeTopic, playAudio }) => {
  // Pick scenarios based on topic keywords
  const topicId = activeTopic?.id || '';
  const getScenarios = () => {
    if (topicId.includes('travel') || topicId.includes('transport')) return SCENARIO_TEMPLATES.travel;
    if (topicId.includes('health') || topicId.includes('medical')) return SCENARIO_TEMPLATES.health;
    if (topicId.includes('business') || topicId.includes('office') || topicId.includes('work')) return SCENARIO_TEMPLATES.business;
    if (topicId.includes('education') || topicId.includes('school') || topicId.includes('academic')) return SCENARIO_TEMPLATES.education;
    return SCENARIO_TEMPLATES.default;
  };

  const scenarios = getScenarios();

  // Key vocabulary for this context
  const contextWords = (activeTopic?.words || []).slice(0, 10);

  return (
    <div className="w-full max-w-4xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-5 text-white border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black flex items-center gap-3">
          🎭 <span>Học Qua Tình Huống Thực Tế</span>
        </h2>
        <p className="text-white/80 font-bold mt-2 text-sm">
          Thực hành hội thoại tiếng Anh trong các tình huống đời thực. Đây là cách người bản xứ học!
        </p>
      </div>

      {/* Quick Reference Vocab */}
      <div className="bg-white dark:bg-slate-800 border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <h3 className="text-lg font-black mb-3 text-slate-800 dark:text-slate-100 flex items-center gap-2">
          📋 Từ Vựng Chính Trong Tình Huống
        </h3>
        <div className="flex flex-wrap gap-2">
          {contextWords.map((word, i) => (
            <button
              key={i}
              onClick={() => playAudio(word.en)}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-400 rounded-full font-bold text-sm text-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all"
            >
              <Volume2 size={12} />
              {word.en} — {word.vi}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Cards */}
      <div className="space-y-4">
        {scenarios.map((scenario, i) => (
          <ScenarioCard key={i} scenario={scenario} playAudio={playAudio} />
        ))}
      </div>

      {/* Tip Box */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-900 border-4 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <h3 className="font-black text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
          💡 Bí Quyết Học Qua Tình Huống
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-bold text-slate-700 dark:text-slate-200">
          <div className="flex gap-2 items-start">
            <span className="text-2xl">🎭</span>
            <span>Đóng vai cả hai nhân vật để nhớ từ lâu hơn</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-2xl">🔊</span>
            <span>Đọc to từng câu để rèn phát âm tự nhiên</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-2xl">✏️</span>
            <span>Tự tạo tình huống mới dùng từ đã học</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-2xl">📱</span>
            <span>Ghi âm bản thân để cải thiện ngữ điệu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionScenarioMode;
