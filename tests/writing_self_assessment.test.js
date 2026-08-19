// File: tests/writing_self_assessment.test.js
// RANH GIỚI GIỮA "TỰ CHẤM" VÀ "ĐO ĐƯỢC" — ghim cứng.
//
// Cả chuỗi này đã giữ một luật: KHÔNG BAO GIỜ khai một con số mình không đo
// được. Hồ sơ năng lực ghi "chưa đo được" thay vì 0%; bài nghe ghi "khoảng" chứ
// không in thời lượng như số đo; bài viết không có điểm so với bài mẫu.
//
// Việc 3.4 mở ra đúng cái cửa dễ phá luật đó nhất: người học tự tick checklist,
// và chỉ cần chia số tick cho tổng là có ngay một phần trăm trông rất giống
// "điểm Viết". Người tự chấm bài mình đang nói về mức TỰ TIN, không phải mức
// NĂNG LỰC — và ở người mới học, hai thứ đó lệch nhau nhiều nhất.
//
// Test này chặn ở cả hai đầu: dữ liệu phải mang cờ tự báo cáo, và hồ sơ năng
// lực không được vì nó mà bật ô Viết sang "đo được".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildSkillProfile, NOT_MEASURED_REASON } from '../src/utils/skillProfile.js';
import { luuBaiLam, thongKeTuBaoCao, WRITING_LOG_KEY, SPEAKING_LOG_KEY } from '../src/utils/selfReportLog.js';
import { LEARNING_STORAGE_KEYS } from '../src/utils/backup.js';

// Bài viết là thứ NGƯỜI HỌC TỰ LÀM RA — mất là mất hẳn, không sinh lại được như
// điểm số. Quên đưa khoá vào danh sách sao lưu thì đổi máy là trắng sổ.
test('sổ bài viết nằm trong danh sách sao lưu/đồng bộ', () => {
  for (const k of [WRITING_LOG_KEY, SPEAKING_LOG_KEY]) {
    assert.ok(LEARNING_STORAGE_KEYS.includes(k),
      `"${k}" chưa có trong LEARNING_STORAGE_KEYS — đổi máy là mất hết thứ người học tự làm ra`);
  }
});

const KET_QUA = {
  version: 2,
  cefr: 'B1',
  correct: 14,
  total: 24,
  skillStats: { grammar: { correct: 6, total: 8 }, vocabulary: { correct: 5, total: 8 }, reading: { correct: 3, total: 8 } },
};

test('viết vẫn là "chưa đo được" dù đã tự đánh giá rất nhiều bài', () => {
  const hoatDong = { writing: { soBai: 40, soDe: 9, lanCuoi: '2026-08-16T00:00:00.000Z', tuBaoCao: true } };
  const hs = buildSkillProfile(KET_QUA, hoatDong);
  const viet = hs.cefrSkills.find((r) => r.key === 'writing');

  assert.equal(viet.measured, false, 'tự đánh giá KHÔNG được làm kỹ năng Viết thành "đo được"');
  assert.equal(viet.percent, null, 'tự đánh giá KHÔNG được sinh ra phần trăm năng lực');
  assert.equal(viet.cefr, null, 'tự đánh giá KHÔNG được suy ra bậc CEFR');
  assert.equal(viet.reason, NOT_MEASURED_REASON.writing, 'lý do "chưa đo được" phải còn nguyên');

  // Vẫn được HIỆN hoạt động, nhưng ở một dòng riêng và nói rõ đó là tự chấm.
  assert.equal(viet.tuBaoCao.soBai, 40);
  assert.ok(/tự chấm|tự đánh giá/i.test(viet.tuBaoCaoLabel));
  assert.ok(/chưa phải điểm đo được/i.test(viet.tuBaoCaoLabel),
    'nhãn phải nói thẳng đây chưa phải điểm đo được');
});

test('measuredCount không tăng vì hoạt động tự đánh giá', () => {
  const khong = buildSkillProfile(KET_QUA);
  const co = buildSkillProfile(KET_QUA, { writing: { soBai: 40, soDe: 9, tuBaoCao: true } });
  assert.equal(co.measuredCount, khong.measuredCount,
    'số kỹ năng đo được phải y nguyên — tự chấm không phải một phép đo');
});

// Dữ liệu KHÔNG mang cờ tự báo cáo thì bỏ qua, không im lặng nhận.
// Nếu về sau ai đó truyền vào một nguồn số khác mà quên gắn cờ, thà không hiện
// còn hơn hiện một con số không rõ ở đâu ra.
test('dữ liệu thiếu cờ tuBaoCao thì bị bỏ qua, không nhận bừa', () => {
  const hs = buildSkillProfile(KET_QUA, { writing: { soBai: 40, soDe: 9 } });
  const viet = hs.cefrSkills.find((r) => r.key === 'writing');
  assert.equal(viet.tuBaoCao, undefined);
  assert.equal(viet.measured, false);
});

test('không có hoạt động nào thì hồ sơ giữ nguyên hành vi cũ', () => {
  const hs = buildSkillProfile(KET_QUA);
  const viet = hs.cefrSkills.find((r) => r.key === 'writing');
  assert.equal(viet.measured, false);
  assert.equal(viet.tuBaoCao, undefined);
  assert.equal(viet.tuBaoCaoLabel, undefined);
});

// Bản ghi trong sổ bài viết phải TỰ MANG cờ, không dựa vào chỗ gọi nhớ gắn.
test('mọi bản ghi bài viết đều mang cờ tuBaoCao và KHÔNG có trường điểm', () => {
  const ban = luuBaiLam({ promptId: 'w-a1-gioi-thieu', text: 'My name is Nam. I am from Hue.', tuDanhGia: [true, true, false, true] });
  assert.equal(ban.tuBaoCao, true);
  assert.equal(ban.soTieuChiTuThay, 3);
  for (const cam of ['score', 'diem', 'percent', 'phanTram', 'level']) {
    assert.equal(ban[cam], undefined, `bản ghi không được có trường "${cam}"`);
  }
});

test('bài rỗng thì không ghi gì', () => {
  assert.equal(luuBaiLam({ promptId: 'w-a1-gioi-thieu', text: '   ' }), null);
  assert.equal(luuBaiLam({ promptId: '', text: 'Hello there.' }), null);
});

// Không có localStorage (chạy trong node) thì phải im lặng chịu, không vỡ.
test('không có localStorage thì thống kê trả về rỗng, không ném lỗi', () => {
  const tk = thongKeTuBaoCao('writing');
  assert.equal(tk.soBai, 0);
  assert.equal(tk.tuBaoCao, true);
});

// ══ TỰ BÁO CÁO KHÔNG ĐƯỢC BIẾN THÀNH CHẶNG HOÀN THÀNH ══════════════════════
//
// Đây là một trong những tính chất trung thực gánh nặng nhất của app: bài viết
// và lượt nói là TỰ BÁO CÁO — máy không chấm được nội dung — nên chúng cố ý
// KHÔNG đánh dấu chặng hoàn thành và không ghi bản điểm. Báo cáo tiến bộ vì thế
// vẫn ghi kỹ năng Viết là "chưa đo được".
//
// `npm run hoc:that` có khoá tính chất này (bước "tự báo cáo KHÔNG biến thành
// chặng hoàn thành hay bản điểm"). NHƯNG bộ đó cần Chrome và chạy bằng tay, nên
// nó KHÔNG chạy trong `npm test`. Ai gắn `onFinish` vào `changViet`/`changNoi`
// ngày mai thì 363/363 vẫn xanh và một lời tự khai lặng lẽ thành lời tuyên bố.
//
// Nên canh thêm ở đây, trong bộ luôn chạy. Cùng dạng với phép canh mã nguồn của
// `BandExamPanel` (chữ và chỉ số bấm phải cùng một biến): lỗi im lặng + bộ lái
// trình duyệt không nằm trong CI thì phải có chốt tĩnh.
test('WelcomePage KHÔNG gắn onFinish/onXong vào panel viết và panel nói', () => {
  const s = readFileSync('src/pages/WelcomePage.jsx', 'utf8');
  for (const ten of ['WritingPromptPanel', 'SpeakingPromptPanel']) {
    // Cắt từng chỗ dựng thẻ ra rồi soi riêng: soi cả file thì `onXong` của panel
    // nghe/đọc (đúng ra PHẢI có) sẽ làm phép kiểm này xanh giả hoặc đỏ oan.
    //
    // Cắt bằng indexOf chứ không bằng regex. Bản đầu dùng
    // `new RegExp(`<${ten}\\b…`)` và nó khớp ĐÚNG 0 chỗ trong khi thẻ nằm ngay
    // trong file — tức một phép canh không bao giờ đỏ được, đúng loại "test không
    // thể fail" đã dính một lần ở phép đếm lớp z. Cắt chuỗi thì không có gì để
    // escape sai.
    const cho = [];
    let k = s.indexOf(`<${ten}`);
    while (k >= 0) {
      const het = s.indexOf('/>', k);
      cho.push(s.slice(k, het < 0 ? k + 400 : het + 2));
      k = s.indexOf(`<${ten}`, k + 1);
    }
    assert.ok(cho.length >= 1, `không thấy chỗ nào dựng ${ten} — phép kiểm đang soi nhầm file`);
    for (const khoi of cho) {
      assert.ok(!khoi.includes('onFinish') && !khoi.includes('onXong'),
        `${ten} được gắn onFinish/onXong: bài tự báo cáo sẽ đánh dấu chặng hoàn thành, tức một lời tự khai thành lời tuyên bố\n${khoi}`);
    }  }
});
