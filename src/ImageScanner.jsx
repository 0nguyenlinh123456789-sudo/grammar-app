import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ImageScanner = () => {
  // State quản lý API Key
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);

  // State quản lý Ảnh và Kết quả
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // 1. Kiểm tra API Key đã lưu trong trình duyệt khi vừa mở web
  useEffect(() => {
    const savedKey = localStorage.getItem('MY_GEMINI_API_KEY');
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeySaved(true);
    }
  }, []);

  // 2. Lưu API Key vào máy người dùng
  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      alert('Vui lòng nhập API Key trước khi lưu!');
      return;
    }
    localStorage.setItem('MY_GEMINI_API_KEY', apiKey);
    setIsKeySaved(true);
  };

  // 3. Xóa API Key
  const handleRemoveKey = () => {
    localStorage.removeItem('MY_GEMINI_API_KEY');
    setApiKey('');
    setIsKeySaved(false);
    setResult(null);
  };

  // 4. Xử lý tải ảnh lên
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ dataUrl: reader.result, file: file });
        setResult(null); // Reset kết quả cũ nếu chọn ảnh mới
      };
      reader.readAsDataURL(file);
    }
  };

  // 5. Chuyển file ảnh thành định dạng AI hiểu được
  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  // 6. Gửi dữ liệu cho AI xử lý
  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError('');

    try {
      // Khởi tạo AI với Key của người dùng
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const imagePart = await fileToGenerativePart(image.file);

      const prompt = `
        You are an English teacher. Look at this image, identify the main object or action. 
        Return ONLY a JSON object with this exact structure (do not use markdown formatting like \`\`\`json):
        {
          "word": "English word",
          "ipa": "/phonetic transcription/",
          "meaning": "Vietnamese meaning",
          "phrases": ["Phrase 1 with translation", "Phrase 2 with translation"],
          "sentences": [
            {"en": "Example sentence 1 in English", "vi": "Vietnamese translation 1"},
            {"en": "Example sentence 2 in English", "vi": "Vietnamese translation 2"}
          ]
        }
      `;

      const resultAI = await model.generateContent([prompt, imagePart]);
      const responseText = resultAI.response.text();
      
      // Làm sạch dữ liệu trả về và ép kiểu JSON
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedResult = JSON.parse(cleanJson);
      
      setResult(parsedResult);
    } catch (err) {
      console.error(err);
      setError('Lỗi phân tích! Vui lòng kiểm tra lại API Key xem có chính xác không, hoặc thử ảnh khác.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white border-[4px] border-black rounded-[20px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black mb-6 text-center uppercase tracking-wider text-[#1e293b]">
        📸 Quét Ảnh Bằng AI
      </h2>

      {/* --- KHU VỰC NHẬP API KEY --- */}
      {!isKeySaved ? (
        <div className="mb-8 p-5 border-[3px] border-black rounded-xl bg-[#fef08a] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-bold text-lg mb-2">🔑 Nhập API Key để bắt đầu:</h3>
          <p className="text-sm mb-3 text-gray-700 font-medium">
            Mỗi người dùng cần tự nhập Google AI Key của mình (Miễn phí). Key chỉ lưu trên trình duyệt của bạn, hoàn toàn bảo mật.
          </p>
          <div className="flex gap-2">
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Dán API Key (AIzaSy...) vào đây"
              className="flex-1 border-[3px] border-black px-4 py-2 rounded-lg font-medium outline-none focus:bg-[#f8fafc]"
            />
            <button 
              onClick={handleSaveKey} 
              className="bg-[#4ade80] hover:bg-[#22c55e] text-black font-bold px-6 py-2 rounded-lg border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all"
            >
              Lưu Key
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 flex justify-between items-center p-3 border-[3px] border-black rounded-xl bg-[#bbf7d0]">
          <span className="font-bold text-green-800">✅ Đã kết nối API Key thành công!</span>
          <button 
            onClick={handleRemoveKey}
            className="text-xs font-bold bg-white px-3 py-1 border-2 border-black rounded-md hover:bg-red-200 transition-colors"
          >
            Đổi/Xóa Key
          </button>
        </div>
      )}

      {/* --- KHU VỰC QUÉT ẢNH (Chỉ hiện khi đã lưu Key) --- */}
      {isKeySaved && (
        <div className="flex flex-col items-center gap-4">
          <label className="cursor-pointer bg-[#60a5fa] border-[3px] border-black px-8 py-3 rounded-xl font-bold text-lg hover:bg-[#3b82f6] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1">
            + Chọn Ảnh Cần Quét
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          {image && (
            <div className="mt-4 border-[4px] border-black rounded-xl overflow-hidden max-w-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gray-100">
              <img src={image.dataUrl} alt="Preview" className="w-full h-auto object-contain max-h-[300px]" />
            </div>
          )}

          {image && (
            <button 
              onClick={analyzeImage}
              disabled={loading}
              className={`w-full max-w-sm mt-2 py-3 rounded-xl font-black text-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#facc15] hover:bg-[#eab308] active:shadow-none active:translate-y-1 active:translate-x-1'
              }`}
            >
              {loading ? '⏳ AI đang phân tích...' : '✨ Tạo Từ Vựng Ngay'}
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 font-bold text-center bg-red-200 border-[3px] border-black p-3 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {/* --- KHU VỰC HIỂN THỊ KẾT QUẢ --- */}
      {result && (
        <div className="mt-8 p-6 border-[4px] border-black rounded-[20px] bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center mb-6">
            <h3 className="text-6xl font-black text-[#1e293b] mb-3">{result.word}</h3>
            <span className="text-2xl font-bold text-gray-600 border-[3px] border-black rounded-lg px-4 py-1 bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {result.ipa}
            </span>
            <p className="text-2xl font-bold text-[#ef4444] mt-5 uppercase tracking-wide">{result.meaning}</p>
          </div>

          <hr className="border-black border-t-[3px] my-6" />

          <div className="mb-6">
            <h4 className="font-black text-xl mb-3 bg-[#fca5a5] inline-block px-4 py-2 border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              🧩 Cụm Từ Thường Gặp
            </h4>
            <ul className="list-disc pl-8 space-y-2 font-bold text-lg text-gray-800">
              {result.phrases.map((phrase, index) => (
                <li key={index}>{phrase}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xl mb-4 bg-[#93c5fd] inline-block px-4 py-2 border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              📝 Luyện Tập Mẫu Câu
            </h4>
            <div className="space-y-4">
              {result.sentences.map((sent, index) => (
                <div key={index} className="bg-[#f8fafc] p-4 border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-bold text-xl mb-1">🇬🇧 {sent.en}</p>
                  <p className="text-gray-600 font-bold text-lg">🇻🇳 {sent.vi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageScanner;