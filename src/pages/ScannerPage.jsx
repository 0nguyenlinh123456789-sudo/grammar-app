import { useState } from 'react';
import { Camera, ShieldCheck, ImagePlus, Loader2, Sparkles, Layers, FileText, Languages } from 'lucide-react';
import { requestAi } from '../utils/aiClient';

const ImageScanner = () => {
  // State quản lý Ảnh và Kết quả
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Xử lý tải ảnh lên
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setError('');
    if (!file) return;

    const maxImageBytes = 4 * 1024 * 1024;
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn tệp hình ảnh hợp lệ.');
      e.target.value = '';
      return;
    }
    if (file.size > maxImageBytes) {
      setError('Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 4 MB.');
      e.target.value = '';
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ dataUrl: reader.result, file: file });
        setResult(null); // Reset kết quả cũ nếu chọn ảnh mới
      };
      reader.onerror = () => setError('Không thể đọc tệp ảnh. Vui lòng thử lại.');
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
  });

  // 6. Gửi dữ liệu cho AI xử lý
  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError('');

    try {
      const imageData = await fileToBase64(image.file);
      const { text } = await requestAi('image-vocabulary', {
        imageData,
        mimeType: image.file.type,
      });
      
      // Làm sạch dữ liệu trả về và ép kiểu JSON
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedResult = JSON.parse(cleanJson);
      
      setResult(parsedResult);
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Chưa thể phân tích ảnh. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white dark:bg-slate-900 border-[4px] border-black dark:border-slate-700 rounded-[20px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#020617]">
      <h2 className="text-3xl font-black mb-6 text-center uppercase tracking-wider text-[#1e293b] dark:text-slate-100 flex items-center justify-center gap-3">
        <Camera size={32} className="text-indigo-600 dark:text-indigo-400 animate-pulse" /> Quét Ảnh Bằng AI
      </h2>

      <div className="mb-6 flex items-center gap-3 p-4 border-[3px] border-black dark:border-slate-700 rounded-xl bg-[#bbf7d0] dark:bg-green-950/20 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
        <ShieldCheck size={20} className="shrink-0 text-green-700 dark:text-green-400" />
        <span className="font-bold text-green-800 dark:text-green-300 text-sm md:text-base">
          Ảnh được gửi qua máy chủ bảo mật; khóa AI không được lưu trong trình duyệt.
        </span>
      </div>

      <div className="flex flex-col items-center gap-4">
          <label className="cursor-pointer bg-[#60a5fa] dark:bg-blue-600 border-[3px] border-black dark:border-slate-700 px-8 py-3 rounded-xl font-bold text-lg text-white hover:bg-[#3b82f6] dark:hover:bg-blue-500 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617] active:shadow-none active:translate-y-1 active:translate-x-1 flex items-center gap-2">
            <ImagePlus size={20} /> Chọn Ảnh Cần Quét
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          {image && (
            <div className="mt-4 border-[4px] border-black dark:border-slate-700 rounded-xl overflow-hidden max-w-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617] bg-gray-100 dark:bg-slate-800">
              <img src={image.dataUrl} alt="Preview" className="w-full h-auto object-contain max-h-[300px]" />
            </div>
          )}

          {image && (
            <button 
              onClick={analyzeImage}
              disabled={loading}
              className={`w-full max-w-sm mt-2 py-3 rounded-xl font-black text-xl border-[3px] border-black dark:border-slate-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617] transition-all cursor-pointer ${
                loading ? 'bg-gray-300 dark:bg-slate-750 dark:text-slate-500 cursor-not-allowed' : 'bg-[#facc15] dark:bg-yellow-600 hover:bg-[#eab308] dark:hover:bg-yellow-500 active:shadow-none active:translate-y-1 active:translate-x-1'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2"><Loader2 size={20} className="animate-spin" /> AI đang phân tích...</span>
              ) : (
                <span className="flex items-center justify-center gap-2"><Sparkles size={20} className="text-slate-800 dark:text-white fill-slate-800 dark:fill-white" /> Tạo Từ Vựng Ngay</span>
              )}
            </button>
          )}
      </div>

      {error && (
        <div className="mt-6 font-bold text-center bg-red-200 dark:bg-red-950/20 border-[3px] border-black dark:border-red-900/40 p-3 rounded-xl text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* --- KHU VỰC HIỂN THỊ KẾT QUẢ --- */}
      {result && (
        <div className="mt-8 p-6 border-[4px] border-black dark:border-slate-700 rounded-[20px] bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#020617]">
          <div className="text-center mb-6">
            <h3 className="text-6xl font-black text-[#1e293b] dark:text-white mb-3">{result.word}</h3>
            <span className="text-2xl font-bold text-gray-600 dark:text-slate-300 border-[3px] border-black dark:border-slate-700 rounded-lg px-4 py-1 bg-gray-100 dark:bg-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#020617]">
              {result.ipa}
            </span>
            <p className="text-2xl font-bold text-[#ef4444] dark:text-red-400 mt-5 uppercase tracking-wide">{result.meaning}</p>
          </div>

          <hr className="border-black dark:border-slate-700 border-t-[3px] my-6" />

          <div className="mb-6">
            <h4 className="font-black text-xl mb-3 bg-[#fca5a5] dark:bg-red-900/30 dark:text-red-300 inline-flex items-center gap-2 px-4 py-2 border-[3px] border-black dark:border-slate-700 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#020617]">
              <Layers size={18} className="text-red-700 dark:text-red-400" /> Cụm Từ Thường Gặp
            </h4>
            <ul className="list-disc pl-8 space-y-2 font-bold text-lg text-gray-800 dark:text-slate-200">
              {result.phrases.map((phrase, index) => (
                <li key={index}>{phrase}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xl mb-4 bg-[#93c5fd] dark:bg-blue-900/30 dark:text-blue-300 inline-flex items-center gap-2 px-4 py-2 border-[3px] border-black dark:border-slate-700 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#020617]">
              <FileText size={18} className="text-blue-700 dark:text-blue-400" /> Luyện Tập Mẫu Câu
            </h4>
            <div className="space-y-4">
              {result.sentences.map((sent, index) => (
                <div key={index} className="bg-[#f8fafc] dark:bg-slate-800 p-4 border-[3px] border-black dark:border-slate-700 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617]">
                  <p className="font-bold text-xl mb-2 flex items-center gap-2 text-slate-800 dark:text-slate-105">
                    <Languages size={18} className="text-blue-500" /> {sent.en}
                  </p>
                  <p className="text-gray-650 dark:text-slate-400 font-bold text-lg border-t border-dashed border-slate-200 dark:border-slate-700 pt-2 pl-7">
                    {sent.vi}
                  </p>
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
