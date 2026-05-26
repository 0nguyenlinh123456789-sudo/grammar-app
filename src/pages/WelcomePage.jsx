// File: src/pages/WelcomePage.jsx
import React from 'react';
import { Trophy } from 'lucide-react';

const WelcomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border-[4px] border-slate-800 rounded-[3rem] p-10 text-center shadow-[12px_12px_0_0_#1c293b] mt-10">
        <Trophy size={100} className="mx-auto text-yellow-400 mb-8 fill-yellow-300"/>
        <h2 className="text-5xl font-black mb-6 uppercase">Welcome Grammar Pro!</h2>
        <p className="font-bold text-2xl text-slate-600 mb-10 leading-relaxed bg-yellow-100 p-4 rounded-2xl border-4 border-slate-800">
          Cỗ máy luyện Ngữ Pháp và Từ Vựng Tiếng Anh siêu cấp
        </p>
        <p className="text-slate-500 font-bold text-lg">
          Hãy chọn một chuyên đề Ngữ pháp ở cột trái hoặc chuyển sang học Từ vựng/Quét ảnh AI ở menu phía trên để bắt đầu!
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
