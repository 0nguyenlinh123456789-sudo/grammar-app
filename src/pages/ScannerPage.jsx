import { useEffect, useState } from 'react';
import { Camera, ShieldCheck, ImagePlus, Loader2, Sparkles, Layers, FileText, Languages, KeyRound, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { requestAi } from '../utils/aiClient';
import { hasGeminiKey, openAiKeySettings, subscribeGeminiKey } from '../utils/aiKey';
import { parseImageVocabulary } from '../utils/imageVocabulary';
import { addWord, hasWord } from '../utils/srs';
import { chuDungLuong, nenAnh } from '../utils/nenAnh';

const KEY_ERROR_CODES = new Set(['missing-key', 'invalid-key']);

// ⚠️ KHÔNG dựng lại danh sách MIME ở đây. Bản cũ chặn theo `file.type` nên ảnh
// HEIC của iPhone bị loại trước khi thử giải mã, và ảnh > 4 MB bị TỪ CHỐI thay
// vì được nén — tức là ảnh chụp bằng điện thoại gần như luôn hỏng. Cách quyết
// định đúng là "trình duyệt có giải mã nổi không", xem src/utils/nenAnh.js.

const ImageScanner = () => {
  // State quản lý Ảnh và Kết quả
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [keyReady, setKeyReady] = useState(hasGeminiKey);
  const [savedToSrs, setSavedToSrs] = useState(false);
  const [dangNen, setDangNen] = useState(false);

  useEffect(() => subscribeGeminiKey(() => setKeyReady(hasGeminiKey())), []);

  // Xử lý tải ảnh lên: nén ngay tại đây, KHÔNG từ chối vì nặng.
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setError('');
    if (!file) return;
    e.target.value = ''; // cho phép chọn lại đúng tệp đó sau khi lỗi

    setDangNen(true);
    setImage(null);
    setResult(null);
    try {
      // Thứ lưu vào state phải là ẢNH ĐÃ NÉN, không phải tệp gốc. Nếu để
      // `analyzeImage` tự đọc lại `file` thì hoá ra nén cho phần xem trước còn
      // vẫn gửi tệp gốc lên máy chủ — lỗi cũ y nguyên mà nhìn thì tưởng đã sửa.
      const anh = await nenAnh(file);
      setImage(anh);
    } catch (err) {
      setError(err?.message === 'van-qua-nang'
        ? 'Ảnh này quá nặng ngay cả sau khi nén. Hãy thử chụp lại hoặc cắt bớt phần thừa.'
        : 'Không đọc được tệp ảnh này. Hãy thử ảnh JPG, PNG hoặc WebP.');
    } finally {
      setDangNen(false);
    }
  };

  // 6. Gửi dữ liệu cho AI xử lý
  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    setErrorCode('');

    try {
      const { text } = await requestAi('image-vocabulary', {
        imageData: image.base64,
        mimeType: image.mimeType,
      });
      
      const parsed = parseImageVocabulary(text);
      setResult(parsed);
      setSavedToSrs(hasWord({ en: parsed.word }));
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Chưa thể phân tích ảnh. Vui lòng thử lại sau.');
      setErrorCode(err?.code || '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white dark:bg-slate-900 border-[4px] border-black dark:border-slate-700 rounded-[20px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#020617]">
      <h2 className="text-3xl font-black mb-6 text-center uppercase tracking-wider text-[#1e293b] dark:text-slate-100 flex items-center justify-center gap-3">
        <Camera size={32} className="text-indigo-600 dark:text-indigo-400 animate-pulse" /> Quét Ảnh Bằng AI
      </h2>

      {keyReady ? (
        <div className="mb-6 flex items-center gap-3 p-4 border-[3px] border-black dark:border-slate-700 rounded-xl bg-[#bbf7d0] dark:bg-green-950/20 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
          <ShieldCheck size={20} className="shrink-0 text-green-700 dark:text-green-400" />
          <span className="font-bold text-green-800 dark:text-green-300 text-sm md:text-base">
            Ảnh chỉ được gửi tới Google Gemini bằng API key của chính bạn.
          </span>
        </div>
      ) : (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-[3px] border-black dark:border-amber-900/40 rounded-xl bg-amber-100 dark:bg-amber-950/20">
          <KeyRound size={20} className="shrink-0 text-amber-700 dark:text-amber-400" />
          <span className="font-bold text-amber-900 dark:text-amber-200 text-sm md:text-base flex-1">
            Tính năng này cần API key Gemini của riêng bạn (miễn phí).
          </span>
          <button onClick={openAiKeySettings} className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 text-white border-2 border-slate-900 font-black text-sm">
            THÊM API KEY
          </button>
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
          <label className="cursor-pointer bg-[#60a5fa] dark:bg-blue-600 border-[3px] border-black dark:border-slate-700 px-8 py-3 rounded-xl font-bold text-lg text-white hover:bg-[#3b82f6] dark:hover:bg-blue-500 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617] active:shadow-none active:translate-y-1 active:translate-x-1 flex items-center gap-2">
            {dangNen ? <><Loader2 size={20} className="animate-spin" /> Đang xử lý ảnh...</> : <><ImagePlus size={20} /> Chọn Ảnh Cần Quét</>}
            {/* `accept="image/*"` chứ không phải danh sách MIME: máy ảnh của điện
                thoại và ảnh HEIC của iPhone đều chỉ lọt qua cửa rộng này. */}
            <input type="file" accept="image/*" className="hidden" disabled={dangNen} onChange={handleImageUpload} />
          </label>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-sm">
            Ảnh nặng bao nhiêu cũng được — app tự thu nhỏ trên máy bạn trước khi gửi đi.
          </p>

          {image && (
            <div className="mt-4 border-[4px] border-black dark:border-slate-700 rounded-xl overflow-hidden max-w-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617] bg-gray-100 dark:bg-slate-800">
              <img src={image.dataUrl} alt="Preview" className="w-full h-auto object-contain max-h-[300px]" />
            </div>
          )}

          {image && image.byteTruoc > image.byteSau && (
            <p className="text-xs font-bold text-green-700 dark:text-green-400">
              Đã nén {chuDungLuong(image.byteTruoc)} → {chuDungLuong(image.byteSau)} ({image.rong}×{image.cao})
            </p>
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
          {KEY_ERROR_CODES.has(errorCode) && (
            <button onClick={openAiKeySettings} className="mt-3 mx-auto px-4 py-2 rounded-xl bg-slate-900 text-white border-2 border-slate-900 font-black text-sm flex items-center gap-2">
              <KeyRound size={16} /> MỞ CÀI ĐẶT API KEY
            </button>
          )}
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

            {/* Close the loop: a scanned word can go straight into the SRS
                review deck, so it comes back in "Ôn Tập Từ" on the roadmap. */}
            <button
              onClick={() => {
                if (savedToSrs) return;
                addWord({
                  en: result.word,
                  vi: result.meaning,
                  ipa: result.ipa,
                  example: result.sentences?.[0]?.en || '',
                  viExample: result.sentences?.[0]?.vi || '',
                });
                setSavedToSrs(true);
              }}
              disabled={savedToSrs}
              className={`mt-5 mx-auto px-6 py-3 rounded-2xl border-[3px] border-black dark:border-slate-600 font-black flex items-center gap-2 transition-all ${
                savedToSrs
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 cursor-default'
                  : 'bg-violet-400 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#020617] hover:bg-violet-500 active:shadow-none active:translate-y-1 cursor-pointer'
              }`}
            >
              {savedToSrs
                ? <><BookmarkCheck size={20} /> ĐÃ CÓ TRONG BỘ ÔN TẬP</>
                : <><BookmarkPlus size={20} /> LƯU VÀO ÔN TẬP TỪ</>}
            </button>
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
