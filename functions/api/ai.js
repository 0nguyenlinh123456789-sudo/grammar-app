// GHIM MỘT MODEL. KHÔNG BÍ DANH, KHÔNG CHUỖI DỰ PHÒNG.
// Đo ngày 19/08 bằng key Google thật, mỗi model 3 lượt với ĐÚNG prompt chấm bài
// mà app gửi (không phải prompt đồ chơi):
//
//   gemini-3.5-flash        5,5 / 5,6 / 6,4 s   ← ghim cái này
//   gemini-3.5-flash-lite   1,8 s               (nhanh hơn, chấm sơ hơn)
//   gemini-3.6-flash       36,0 / 10,1 / 14,3 s  ← 1/3 lượt VƯỢT timeout 25 s
//   gemini-flash-latest     503 "high demand"
//   gemini-2.5-flash        404 "no longer available to new users"
//
// Ba điều rút ra, điều thứ hai đi ngược hẳn thứ tôi định làm:
//  1. Bản cũ ghim 2.5-flash. Google đã KHOÁ model đó với người dùng MỚI, nên mọi
//     khách mới mang key riêng đều ăn 404 — toàn bộ tính năng AI chết.
//  2. Bí danh -latest nghe như thuốc chống hỏng-vì-cũ. Đo thì nó KÉM tin cậy
//     nhất: nó trỏ vào model mới nhất, tức model đang đông nhất, và trả 503.
//  3. Model càng mới càng "nghĩ" lâu: 3.6 vượt timeout 25 s ngay ở prompt tầm
//     thường, và thinkingLevel:low KHÔNG cứu được (vẫn 1/3 lượt vượt).
//
// Đã đo sát TRẦN đầu vào chứ không chỉ mức dễ: bài viết 6000 ký tự (đúng
// MAX_TEXT_LENGTH) mất 8,5–10,7 s; ảnh 4082 KB (trần 4 MB) mất 6,4 s. Nên 25 s
// vẫn rộng và không phải nới.
//
// KHÔNG làm chuỗi dự phòng: 404 ở đây là hỏng VĨNH VIỄN chứ không phải trục trặc
// nhất thời, nên dự phòng sẽ nổ ở MỌI request mãi mãi, đốt một nửa ngân sách 25 s
// vào cú gọi đã biết chắc hỏng — và nặng hơn cả: nó THAY MODEL ÂM THẦM, đúng thứ
// luật dự án cấm ("thiếu thì ẨN hoặc BÁO, tuyệt đối không thay thầm").
// Thay vào đó: nhánh 404 bên dưới nói thật, và "npm run ai:that" gọi thật model
// đang ghim để lần khoá sau bị bắt ở đây chứ không lộ ra ở máy khách hàng.
export const MODEL = 'gemini-3.5-flash';
const MAX_TEXT_LENGTH = 6000;

// Learners bring their own Google AI Studio key. It arrives on this header,
// is used for exactly one upstream call and is never stored or logged.
export const AI_KEY_HEADER = 'x-gemini-key';
// PHẢI GIỐNG HỆT src/utils/aiKey.js. Sửa mỗi một bên thì hỏng NẶNG HƠN hiện tại:
// hộp thoại nhận key, lưu xong, rồi mọi lần chấm bài đều bị máy chủ trả đúng câu
// "Bạn chưa thêm API key Gemini của mình" — trong khi người dùng vừa thêm xong.
// Dấu chấm có ở đây vì key đời mới dạng AQ.Ab8… mang nó; xem chú thích bên kia.
export const GEMINI_KEY_PATTERN = /^[A-Za-z0-9_.-]{20,120}$/;

export const MISSING_KEY_RESPONSE = {
  code: 'missing-key',
  message: 'Bạn chưa thêm API key Gemini của mình. Mở "KHÓA AI (API KEY)" ở menu bên trái để dán key miễn phí từ Google AI Studio.',
};

/** Returns the caller's key, or '' when it is absent or malformed. */
export function readGeminiKey(value) {
  const key = String(value ?? '').trim();
  return GEMINI_KEY_PATTERN.test(key) ? key : '';
}

export function geminiEndpoint(key) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`;
}

/**
 * Turn an upstream Gemini status into advice the learner can act on. With
 * bring-your-own-key, a rejected key or an exhausted quota is the learner's to
 * fix, so it must not be flattened into a generic "try again later".
 *
 * @returns {[code: string, message: string, status: number]}
 */
export function describeProviderFailure(upstreamStatus) {
  // 404 = Google đã gỡ model app đang gọi. Đây là LỖI CỦA ỨNG DỤNG chứ không phải
  // key của người học, nên tuyệt đối không gộp vào "thử lại sau". Bản cũ gộp, và
  // hậu quả là khách mới bị bảo đi thử lại một thứ không đời nào chạy lại được.
  if (upstreamStatus === 404) {
    return ['model-retired', 'Google đã ngừng model AI mà ứng dụng này gọi. Đây là lỗi của ứng dụng, KHÔNG phải key của bạn — thử lại cũng không hết. Hãy báo người bán để cập nhật ứng dụng.', 502];
  }
  if (upstreamStatus === 400 || upstreamStatus === 401 || upstreamStatus === 403) {
    return ['invalid-key', 'API key Gemini không hợp lệ hoặc chưa được cấp quyền. Hãy kiểm tra lại key trong mục "KHÓA AI (API KEY)".', 400];
  }
  if (upstreamStatus === 429) {
    return ['quota-exceeded', 'Key Gemini của bạn đã hết hạn mức miễn phí trong hôm nay. Hãy chờ ít phút hoặc dùng key khác.', 429];
  }
  return ['provider-error', 'AI chưa thể xử lý yêu cầu này. Hãy thử lại sau.', 502];
}

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_IMAGE_BASE64_LENGTH = 4 * Math.ceil(MAX_IMAGE_BYTES / 3);

// Helper `json` cu da bo: moi phan hoi nay di qua `jsonResponse` trong
// src/server/accessCore.js, mot ham phuc vu ca hai nen chay. Giu lai ban thu
// hai o day la dung lai cai bay hai-ban ma ca dot nay dang go.

const requestErrors = {
  'empty-input': ['empty-input', 'Hãy nhập nội dung trước khi chấm.'],
  'invalid-image': ['invalid-image', 'Ảnh không hợp lệ hoặc không được hỗ trợ.'],
  'image-too-large': ['image-too-large', 'Ảnh phải nhỏ hơn 4 MB.'],
  'unsupported-mode': ['unsupported-mode', 'Yêu cầu AI không được hỗ trợ.'],
};

export function getRequestError(error) {
  return requestErrors[error?.message] || ['bad-request', 'Yêu cầu không hợp lệ.'];
}

const cleanText = (value, max = MAX_TEXT_LENGTH) => String(value || '').trim().slice(0, max);

export function buildRequest(mode, payload = {}) {
  if (mode === 'writing') {
    const text = cleanText(payload.text);
    if (!text) throw new Error('empty-input');
    const topic = cleanText(payload.topicTitle, 200);
    return [{ text: `Bạn là giáo viên tiếng Anh. Hãy chấm bài viết${topic ? ` thuộc chủ đề "${topic}"` : ''}.
Bài làm của học viên: "${text}"
Phản hồi ngắn gọn bằng tiếng Việt gồm: (1) điểm /10, (2) lỗi ngữ pháp/chính tả và cách sửa, (3) một câu mẫu tự nhiên hơn. Không dùng markdown.` }];
  }

  // NÓI (việc 3.5). Khác `writing` ở một điểm KHÔNG được nhầm: thứ gửi lên đây
  // là BẢN CHỮ do trình duyệt nhận dạng, KHÔNG phải file âm thanh. Mô hình
  // không nghe được gì cả, nên nó tuyệt đối không được cho điểm phát âm — và
  // phải nói ra cả những chỗ bản nhận dạng có thể sai chứ không phải người nói
  // sai. Cũng KHÔNG xin "điểm /10": một con số cho lượt nói mà chỉ nhìn chữ là
  // con số bịa.
  if (mode === 'speaking') {
    const text = cleanText(payload.text);
    if (!text) throw new Error('empty-input');
    const topic = cleanText(payload.topicTitle, 200);
    return [{ text: `Bạn là giáo viên tiếng Anh. Dưới đây là BẢN CHỮ do phần mềm nhận dạng giọng nói ghi lại từ một lượt nói${topic ? ` về chủ đề "${topic}"` : ''}. Bạn KHÔNG nghe được âm thanh.
Bản chữ: "${text}"
Vì chỉ có chữ, TUYỆT ĐỐI KHÔNG nhận xét về phát âm, trọng âm, ngữ điệu hay tốc độ, và KHÔNG cho điểm số.
Phản hồi ngắn gọn bằng tiếng Việt gồm: (1) nội dung đã trả lời đúng trọng tâm đề chưa, (2) lỗi ngữ pháp hoặc cách dùng từ thấy được trong bản chữ và cách sửa, (3) một cách diễn đạt tự nhiên hơn cho một ý bất kỳ, (4) một câu nhắc rằng phần mềm nhận dạng có thể nghe sai nên vài chỗ lạ có thể không phải lỗi của người nói. Không dùng markdown.` }];
  }

  if (mode === 'chat') {
    const question = cleanText(payload.question, 800);
    if (!question) throw new Error('empty-input');
    const history = cleanText(payload.history, 1500);
    return [{ text: `Bạn là Bunny — thỏ gia sư tiếng Anh thân thiện của ứng dụng Bunny English. Trả lời NGẮN GỌN bằng tiếng Việt (tối đa 120 từ), kèm ví dụ tiếng Anh có nghĩa tiếng Việt khi phù hợp. Chỉ trả lời các chủ đề học tiếng Anh (ngữ pháp, từ vựng, phát âm, cách học); nếu bị hỏi ngoài lề, nhẹ nhàng lái về việc học. Không dùng markdown.${history ? `\nHội thoại trước:\n${history}` : ''}\nHọc viên hỏi: "${question}"` }];
  }

  if (mode === 'image-vocabulary') {
    const imageData = String(payload.imageData || '').trim();
    const mimeType = cleanText(payload.mimeType, 80);
    if (!imageData || !/^image\/(jpeg|png|webp|gif)$/i.test(mimeType)) throw new Error('invalid-image');
    if (imageData.length > MAX_IMAGE_BASE64_LENGTH) throw new Error('image-too-large');
    if (imageData.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(imageData)) throw new Error('invalid-image');
    const padding = imageData.endsWith('==') ? 2 : imageData.endsWith('=') ? 1 : 0;
    if ((imageData.length * 3) / 4 - padding > MAX_IMAGE_BYTES) throw new Error('image-too-large');
    return [
      { text: `Bạn là giáo viên tiếng Anh. Nhận diện đối tượng hoặc hành động chính trong ảnh. Chỉ trả về JSON hợp lệ, không dùng markdown, theo cấu trúc: {"word":"English word","ipa":"/IPA/","meaning":"Nghĩa tiếng Việt","phrases":["Cụm từ — nghĩa"],"sentences":[{"en":"Example","vi":"Bản dịch"}]}. Tạo 2 cụm từ và 2 câu ví dụ.` },
      { inlineData: { data: imageData, mimeType } },
    ];
  }

  throw new Error('unsupported-mode');
}

// ══════════════════════════════════════════════════════════════════════════
// VỎ BỌC CLOUDFLARE PAGES cho tuyến /api/ai.
//
// ⚠️ BẢN TRƯỚC CỦA CHỖ NÀY KHÔNG CÓ CỔNG.
// Nó nhận `{ request }` rồi đi thẳng tới Google, không hề gọi `requireLearner`
// — trong khi bản Vercel (api/ai.js) thì CÓ kiểm mã truy cập. Nghĩa là nếu
// chuyển nhà sang Cloudflare, `/api/ai` thành cổng chuyển tiếp CÔNG KHAI: bất
// kỳ ai trên Internet cũng POST được mà không cần mã, và máy chủ của chủ dự án
// đứng ra gọi hộ. Không lộ key của chủ (mỗi người mang key riêng), nhưng đó là
// hạ tầng bị dùng chùa — và là đúng kiểu lệch mà cách làm "một thân dùng
// chung" sinh ra để chặn.
//
// Thân thật nằm ở src/server/routes/ai.js, dùng chung với vỏ bọc Vercel.
//
// ══ VÌ SAO NHẬP ĐỘNG CHỨ KHÔNG NHẬP Ở ĐẦU FILE ══
// Thân tuyến cần các hàm nhà cung cấp Ở CHÍNH FILE NÀY, nên nhập tĩnh hai
// chiều sẽ thành vòng. Bốn export ở trên là `const` (MODEL, AI_KEY_HEADER,
// GEMINI_KEY_PATTERN, MISSING_KEY_RESPONSE) — `const` KHÔNG được nâng, nên
// vòng đó sẽ nổ TDZ tuỳ thứ tự nạp. Nhập động cắt vòng dứt điểm.
export async function onRequestPost({ request, env }) {
  const { xuLyAi } = await import('../../src/server/routes/ai.js');
  return xuLyAi(request, env);
}

// Mọi phương thức khác. Thân dùng chung cũng tự trả 405, nhưng Pages gọi
// `onRequest` cho các phương thức không có hàm riêng nên vẫn cần lối vào này.
export async function onRequest({ request, env }) {
  const { xuLyAi } = await import('../../src/server/routes/ai.js');
  return xuLyAi(request, env);
}
