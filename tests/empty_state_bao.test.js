// GHIM NGUYÊN TẮC "THIẾU THÌ ẨN HOẶC BÁO" CHO CÁC MÀN NGOÀI TRANG CHỦ (17/08).
//
// Chủ dự án yêu cầu rà soát toàn web. Rà bốn trang chưa từng được rà
// (GrammarPage, VocabVstepPage, VocabOxfordPage, GamesPage) tìm ra BA lỗi cùng
// một họ — và họ lỗi đó không phải "thiếu dữ liệu", mà là **NÓI SAI VỀ việc
// thiếu dữ liệu**:
//
//   1. `GrammarPage`: `if (!topic) return null` → chặng trỏ tới bài không còn
//      trong kho thì người học nhận MỘT TRANG TRẮNG, không một chữ giải thích.
//
//   2. `VocabVstepPage`: `if (!activeTopic)` hiện "Đang tải chủ đề từ vựng...".
//      Câu đó KHÔNG BAO GIỜ đúng: `App.jsx` đã chặn trước bằng
//      `if (!vstepLoaded) return <RouteLoader />`, nên tới được đây là dữ liệu ĐÃ
//      nạp — rỗng nghĩa là KHÔNG TÌM THẤY. Nói "đang tải" cho một lỗi vĩnh viễn
//      còn tệ hơn để trắng: để trắng thì người ta biết là hỏng.
//
//   3. Bảy bộ bài tập ngữ pháp đều nói "Đang tải câu hỏi..." khi mảng câu rỗng,
//      dù mảng đó truyền vào bằng prop và có mặt từ lần vẽ đầu. Lỗi thấy được
//      nhất do nó gây ra, ĐO ĐƯỢC: **12/12 bài cụm A0 "Mất gốc thật" không có
//      `sentenceGame`** mà tab "Xếp Câu" lại luôn hiện → đúng 12 chặng ĐẦU TIÊN
//      người mất gốc gặp đều dẫn tới màn hình "Đang tải thẻ học..." vĩnh viễn.
//      Người cần app chạy được nhất lại là người gặp màn hình treo.
//
// GamesPage thì ĐÚNG từ trước và được giữ làm mẫu: nó chặn ở `words.length < 8`
// bằng một lời BÁO nêu rõ tên chủ đề và việc cần làm.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const boChuThich = (src) => src.split('\n').filter((d) => !/^\s*(\/\/|\*|\/\*)/.test(d)).join('\n');

// ⚠️ GamesPage CỐ Ý KHÔNG nằm trong test dưới, và đây là lý do đích danh — không
// phải để cho test xanh. Năm dòng `if (!cur) return null` của nó nằm trong NĂM
// component game, mỗi component là một hàm cấp cao trong cùng file nên thụt lề y
// hệt hàm trang; không có cách nào phân biệt bằng hình dạng dòng. Đọc kỹ thì cả
// năm là chốt phòng thân **không tới được**: cửa chặn thật là `words.length < 8`
// ở cấp trang (kèm lời BÁO nêu rõ tên chủ đề), và vòng chuyển câu không bao giờ
// đẩy `idx` vượt `pool.length - 1`. Bản nháp đầu của test này gộp GamesPage vào
// và đỏ — sửa bằng cách ĐỌC mã rồi miễn trừ có lý do, không phải nới regex.
const CAP_TRANG = ['src/pages/GrammarPage.jsx', 'src/pages/VocabVstepPage.jsx'];

test('không màn nào trả về màn hình trắng khi thiếu dữ liệu', () => {
  for (const f of CAP_TRANG) {
    const ma = boChuThich(doc(f));
    const dongTrang = ma.split('\n').filter((d) => /if \(!\w+\) return null;/.test(d));
    assert.deepEqual(dongTrang, [], `${f}: còn "return null" ở cấp trang — người học bấm chặng và nhận trang trắng`);
  }
});

test('không chỗ nào nói "đang tải" cho một trạng thái vĩnh viễn', () => {
  const loi = [];
  const CAN_RA = [
    'src/pages/GrammarPage.jsx', 'src/pages/VocabVstepPage.jsx',
    ...fs.readdirSync(path.join(ROOT, 'src/components/grammar')).map((f) => `src/components/grammar/${f}`),
  ].filter((f) => f.endsWith('.jsx'));
  for (const f of CAN_RA) {
    const ma = boChuThich(doc(f));
    // Lời "đang tải" chỉ được xuất hiện ở chỗ THẬT SỰ có việc tải bất đồng bộ.
    // Trong hai trang và bảy bộ bài tập này thì không có chỗ nào như vậy: dữ liệu
    // vào bằng prop, còn phần nạp bất đồng bộ đã do App.jsx/RouteLoader lo.
    if (/Đang tải/.test(ma)) loi.push(f);
  }
  assert.deepEqual(loi, [], 'còn lời "đang tải" cho trạng thái không tải gì:\n  ' + loi.join('\n  '));
});

test('mỗi màn thiếu dữ liệu đều nói RÕ chuyện gì và phải làm gì', () => {
  const g = doc('src/pages/GrammarPage.jsx');
  assert.match(g, /không còn trong kho/, 'GrammarPage phải nói rõ bài đã không còn');
  assert.match(g, /Tiến độ của bạn không mất gì/, 'phải nói rõ người học không mất tiến độ');
  const v = doc('src/pages/VocabVstepPage.jsx');
  assert.match(v, /Không tìm thấy chủ đề từ vựng/, 'VocabVstepPage phải nói KHÔNG TÌM THẤY, không phải "đang tải"');
  const k = doc('src/components/grammar/KhongCoCau.jsx');
  assert.match(k, /chưa có \{ten\}/, 'KhongCoCau phải nói rõ dạng bài nào chưa có câu');
  assert.match(k, /lý thuyết vẫn học được/, 'phải chỉ ra việc người học vẫn làm được');
});

test('tab dạng bài chỉ hiện khi CÓ dữ liệu — và cụm A0 là lý do', async () => {
  const g = doc('src/pages/GrammarPage.jsx');
  // 'sentence' từng nằm trong danh sách luôn-hiện. Chỉ 'theory' và 'ai' được phép.
  assert.match(g, /if \(\['theory', 'ai'\]\.includes\(t\.id\)\) return true;/,
    "chỉ 'theory' và 'ai' được luôn hiện — dạng bài khác phải có dữ liệu mới hiện");
  assert.match(g, /data: topic\.sentenceGame/, "tab 'Xếp Câu' phải khai data để bộ lọc thấy được");

  // Và đây là SỐ ĐO đứng sau luật trên, không phải lời kể: 12 bài A0 đều không có
  // `sentenceGame`. Nếu về sau ai soạn `sentenceGame` cho chúng thì test này vẫn
  // xanh — nó chỉ đòi bộ lọc tồn tại, không đòi con số 12 đứng mãi.
  const { foundationData } = await import(pathToFileURL(path.join(ROOT, 'src/data/foundationData.js')).href);
  const khongCo = foundationData.filter((t) => !(t.sentenceGame || []).length).length;
  assert.ok(khongCo === 0 || /12\/12 bài của cụm A0/.test(g),
    `${khongCo}/${foundationData.length} bài A0 không có sentenceGame mà GrammarPage không ghi lý do ẩn tab`);
});
