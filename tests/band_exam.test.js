// File: tests/band_exam.test.js
// Ghim việc 4.2 — tiêu chí N8: "3 đề, mỗi đề có cả 4 phần".
//
// N8 đọc trần thì một test đếm bốn phần là XANH GIẢ: đủ bốn phần mà hai phần
// chỉ là bài tập tự chấm thì bài thi vẫn nói quá. Nên ở đây ghim CẢ HAI:
//
//   1. đủ bốn phần Nghe/Đọc/Viết/Nói;
//   2. **nhãn bậc chỉ được suy ra từ phần `chamDuoc: true`** — phần tự chấm
//      không được góp một phần trăm nào vào quyết định đạt.
//
// Cộng ba thứ nữa dễ mục ruỗng âm thầm:
//   3. câu hỏi KHÔNG trùng ngân hàng test đầu vào (đã thấy đáp án thì thi vô nghĩa);
//   4. mọi mã audio trỏ tới file CÓ THẬT trong kho đã kiểm giấy phép;
//   5. không đề nào tự gắn cho mình một bậc khác bậc của chính nó.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bandExams } from '../src/data/bandExamBank.js';
import { chamBaiThi, phanChamDuoc, phanKhongChamDuoc, NGUONG_DAT } from '../src/utils/bandExam.js';
import { placementBank } from '../src/data/placementBank.js';
import { audioManifest } from '../src/data/audioManifest.js';
import { listeningPassages } from '../src/data/listeningPassages.js';

const BAC = ['A1', 'A2', 'B1', 'B2', 'C1'];
const PHAN = ['listening', 'reading', 'writing', 'speaking'];

// Bánh cóc: số câu chấm được chỉ được đi lên. Soạn tay nên con số này là công
// thật, không phải con số sinh ra được.
const CAU_CHAM_DUOC_TOI_THIEU = 70;

test('có đủ năm đề A1 / A2 / B1 / B2 / nền C1, mỗi bậc đúng một đề', () => {
  assert.deepEqual(bandExams.map((e) => e.cefr), BAC);
  assert.equal(new Set(bandExams.map((e) => e.id)).size, BAC.length);
});

// ══ NHÃN CÔNG BỐ ══════════════════════════════════════════════════════════
// Cam kết của sản phẩm là "B2 vững + NỀN C1" — KHÔNG phải một khoá C1 đầy đủ.
// Đề `exam-c1` đo ở mức trên B2, nhưng cái IN RA GIẤY phải là "Nền C1". Đổi
// một chữ ở đó thành 'C1' là tờ chứng nhận bắt đầu nói quá đúng một bậc, và
// nó sẽ đi ra ngoài cho người khác đọc. Ghim cả ba chiều: nhãn không được là
// mã bậc trần, nhãn phải kèm lời giải nghĩa, và lời giải nghĩa phải nói thẳng
// rằng đây CHƯA phải đạt C1.
test('đề nền C1 KHÔNG công bố nhãn “C1” trần, và phải tự giải nghĩa nhãn của mình', () => {
  const e = bandExams.find((x) => x.cefr === 'C1');
  assert.ok(e, 'mất đề nền C1 — cam kết có nhắc “nền C1” mà không còn cửa đo nào');
  assert.equal(e.nhanCongBo, 'Nền C1', 'nhãn công bố của đề này phải là “Nền C1”, không phải mã bậc');
  assert.ok(e.ghiChuBac && e.ghiChuBac.length > 80, 'nhãn khác mã bậc thì phải giải nghĩa ngay, không để người học tự suy');
  assert.ok(/KHÔNG có nghĩa|không có nghĩa/.test(e.ghiChuBac), 'lời giải nghĩa phải nói thẳng nhãn này KHÔNG phải “đã đạt C1”');

  const traLoi = {};
  for (const s of phanChamDuoc(e)) for (const it of s.items) traLoi[it.id] = it.answer;
  const kq = chamBaiThi(e, traLoi);
  assert.equal(kq.nhanIn, 'Nền C1', 'kết quả chấm phải mang theo nhãn công bố, vì đó là thứ giao diện in ra');
  assert.ok(kq.ghiChuBac, 'kết quả chấm phải mang theo lời giải nghĩa tới tận tờ giấy');
});

test('đề nào KHÔNG khai nhãn riêng thì nhãn in ra đúng bằng mã bậc', () => {
  for (const e of bandExams.filter((x) => !x.nhanCongBo)) {
    const traLoi = {};
    for (const s of phanChamDuoc(e)) for (const it of s.items) traLoi[it.id] = it.answer;
    assert.equal(chamBaiThi(e, traLoi).nhanIn, e.cefr, `${e.id}: nhãn in lệch khỏi mã bậc mà đề không khai nhãn riêng`);
  }
});

// Nhãn công bố mà không có lời giải nghĩa là cách âm thầm nhất để một đề mới
// gắn cho mình một chữ đẹp hơn thứ nó đo được.
test('bất kỳ đề nào khai nhãn riêng đều phải kèm lời giải nghĩa', () => {
  for (const e of bandExams) {
    if (!e.nhanCongBo) continue;
    assert.notEqual(e.nhanCongBo, e.cefr, `${e.id}: khai nhãn riêng mà lại trùng mã bậc — thừa`);
    assert.ok(e.ghiChuBac && e.ghiChuBac.length > 80, `${e.id}: nhãn riêng phải kèm lời giải nghĩa`);
  }
});

// Giao diện in nhãn nào là chuyện của giao diện — nên ghim ở chính giao diện.
test('màn hình thi và tờ chứng nhận in NHÃN CÔNG BỐ, không in mã bậc trần', async () => {
  const fs = await import('node:fs');
  const panel = fs.readFileSync('src/components/exam/BandExamPanel.jsx', 'utf8');
  assert.ok(/ketQua\.nhanIn/.test(panel), 'BandExamPanel phải in ketQua.nhanIn — in ketQua.cefr là in "C1" cho đề nền C1');
  assert.ok(/ketQua\.ghiChuBac/.test(panel), 'màn hình thi phải hiện lời giải nghĩa nhãn ngay tại chỗ');
  const rp = fs.readFileSync('src/components/progress/LearningReport.jsx', 'utf8');
  assert.ok(/luotThi\.nhanIn/.test(rp), 'tờ chứng nhận phải in luotThi.nhanIn');
  assert.ok(/luotThi\.ghiChuBac/.test(rp), 'tờ chứng nhận phải in kèm lời giải nghĩa nhãn');
});

test('mỗi đề có đủ BỐN phần Nghe · Đọc · Viết · Nói', () => {
  for (const e of bandExams) {
    assert.deepEqual(e.sections.map((s) => s.key), PHAN, `${e.id}: thiếu hoặc sai thứ tự phần`);
  }
});

test('mỗi phần tự khai chấm được hay không, và phần KHÔNG chấm được phải nói lý do', () => {
  for (const e of bandExams) {
    for (const s of e.sections) {
      assert.equal(typeof s.chamDuoc, 'boolean', `${e.id}/${s.key}: thiếu cờ chamDuoc`);
      if (!s.chamDuoc) {
        assert.ok(s.lyDoKhongCham && s.lyDoKhongCham.length > 30,
          `${e.id}/${s.key}: không chấm được thì phải nói RÕ vì sao, không để trống`);
        assert.ok(!s.items, `${e.id}/${s.key}: phần không chấm được không được có câu trắc nghiệm`);
      }
    }
    assert.deepEqual(phanChamDuoc(e).map((s) => s.key), ['listening', 'reading']);
    assert.deepEqual(phanKhongChamDuoc(e).map((s) => s.key), ['writing', 'speaking']);
  }
});

// ── BẤT BIẾN QUAN TRỌNG NHẤT ────────────────────────────────────────────────

test('ĐẠT chỉ do phần chấm được quyết định — làm hoàn hảo Viết/Nói cũng không cứu được', () => {
  const e = bandExams.find((x) => x.cefr === 'B1');
  // Trả lời SAI hết phần chấm được. Không có ô nào cho Viết/Nói trong `traLoi`
  // — và đó chính là điểm: chúng không có đường nào để góp vào kết quả.
  const traLoiSai = {};
  for (const s of phanChamDuoc(e)) for (const it of s.items) traLoiSai[it.id] = (it.answer + 1) % it.options.length;
  const kq = chamBaiThi(e, traLoiSai);
  assert.equal(kq.dat, false);
  assert.equal(kq.nhanBac, null, 'chưa đạt thì KHÔNG được trả về nhãn bậc');
  assert.ok(kq.phanKhongTinh.length === 2, 'kết quả phải mang theo danh sách phần không tính');
  for (const p of kq.phanKhongTinh) assert.ok(p.lyDo, `phần ${p.key} thiếu lý do không tính`);
});

test('đạt TỪNG phần, không đạt tổng — giỏi Đọc không gánh được Nghe', () => {
  const e = bandExams.find((x) => x.cefr === 'A2');
  const traLoi = {};
  for (const s of phanChamDuoc(e)) {
    for (const it of s.items) {
      // Đọc: đúng hết. Nghe: sai hết.
      traLoi[it.id] = s.key === 'reading' ? it.answer : (it.answer + 1) % it.options.length;
    }
  }
  const kq = chamBaiThi(e, traLoi);
  assert.equal(kq.phan.find((p) => p.key === 'reading').dat, true);
  assert.equal(kq.phan.find((p) => p.key === 'listening').dat, false);
  assert.equal(kq.dat, false, 'sai hết phần Nghe mà vẫn "đạt" thì ngưỡng đang tính trên tổng');
});

test('đúng hết phần chấm được thì đạt, và nhãn bậc đúng bằng bậc của ĐỀ', () => {
  for (const e of bandExams) {
    const traLoi = {};
    for (const s of phanChamDuoc(e)) for (const it of s.items) traLoi[it.id] = it.answer;
    const kq = chamBaiThi(e, traLoi);
    assert.equal(kq.dat, true, `${e.id}: đúng hết mà vẫn không đạt`);
    assert.equal(kq.nhanBac, e.cefr, `${e.id}: nhãn bậc phải đúng bằng bậc của đề`);
    assert.ok(kq.moTaCanCu.includes('Nghe') && kq.moTaCanCu.includes('Đọc'),
      'kết quả phải nói rõ căn cứ là hai phần nào');
  }
});

test('đề không có phần chấm được nào thì KHÔNG đạt, chứ không phải "đạt vì chẳng có gì để trượt"', () => {
  const kq = chamBaiThi({ id: 'rong', cefr: 'B2', sections: [] }, {});
  assert.equal(kq.dat, false);
  assert.equal(kq.nhanBac, null);
});

test('ngưỡng đạt áp đúng mức đã khai', () => {
  const e = bandExams.find((x) => x.cefr === 'B2');
  const nghe = e.sections.find((s) => s.key === 'listening');
  const canDung = Math.ceil(nghe.items.length * NGUONG_DAT);
  const traLoi = {};
  for (const s of phanChamDuoc(e)) {
    s.items.forEach((it, i) => {
      const dung = s.key === 'listening' ? i < canDung - 1 : true; // Nghe cố ý thiếu 1 câu
      traLoi[it.id] = dung ? it.answer : (it.answer + 1) % it.options.length;
    });
  }
  assert.equal(chamBaiThi(e, traLoi).dat, false, 'thiếu 1 câu so với ngưỡng mà vẫn đạt');
});

// ── KHÔNG TRÙNG, KHÔNG HỎNG ─────────────────────────────────────────────────

test('KHÔNG câu nào trùng mã với ngân hàng test đầu vào', () => {
  const daThay = new Set(placementBank.map((q) => q.id));
  const trung = [];
  for (const e of bandExams) {
    for (const s of phanChamDuoc(e)) for (const it of s.items) if (daThay.has(it.id)) trung.push(it.id);
  }
  assert.deepEqual(trung, [],
    `${trung.length} câu trùng mã với placementBank — người học đã thấy đáp án thì bài thi không chứng nhận được gì`);
});

test('mọi câu chấm được đều có đáp án hợp lệ và lời giải', () => {
  const ids = new Set();
  let dem = 0;
  for (const e of bandExams) {
    for (const s of phanChamDuoc(e)) {
      for (const it of s.items) {
        dem += 1;
        assert.ok(!ids.has(it.id), `mã câu trùng nhau: ${it.id}`);
        ids.add(it.id);
        assert.ok(it.options.length >= 4, `${it.id}: cần ít nhất 4 lựa chọn`);
        assert.equal(new Set(it.options).size, it.options.length, `${it.id}: có lựa chọn trùng nhau`);
        assert.ok(Number.isInteger(it.answer) && it.answer >= 0 && it.answer < it.options.length, `${it.id}: đáp án nằm ngoài danh sách`);
        assert.ok(it.explanation && it.explanation.length > 10, `${it.id}: thiếu lời giải`);
        assert.ok(it.prompt && it.prompt.length > 5, `${it.id}: thiếu đề`);
      }
    }
  }
  assert.ok(dem >= CAU_CHAM_DUOC_TOI_THIEU,
    `còn ${dem} câu chấm được, dưới mốc ${CAU_CHAM_DUOC_TOI_THIEU} đã đạt được — câu soạn tay bị xoá bớt?`);
});

test('mọi mã âm thanh trỏ tới bản thu CÓ THẬT trong kho đã kiểm giấy phép', () => {
  const coClip = new Set(audioManifest.map((c) => c.id));
  const coBai = new Set(listeningPassages.map((b) => b.id));
  const hong = [];
  for (const e of bandExams) {
    const nghe = e.sections.find((s) => s.key === 'listening');
    if (nghe.passageId && !coBai.has(nghe.passageId)) hong.push(`${e.id}: bài nghe "${nghe.passageId}" không còn`);
    for (const it of nghe.items) if (it.clipId && !coClip.has(it.clipId)) hong.push(`${it.id}: bản thu "${it.clipId}" không còn`);
    // Mỗi câu Nghe phải có NGUỒN ÂM THANH — hoặc bản thu riêng, hoặc bài chung.
    for (const it of nghe.items) {
      assert.ok(it.clipId || nghe.passageId, `${it.id}: câu nghe không có nguồn âm thanh nào`);
    }
  }
  assert.deepEqual(hong, [], `âm thanh của bài thi bị hỏng:\n  ${hong.join('\n  ')}`);
});

test('phần Viết có bài mẫu SOẠN TAY và checklist; phần Nói khai rõ thời lượng', () => {
  for (const e of bandExams) {
    const v = e.sections.find((s) => s.key === 'writing').de;
    assert.ok(v.modelAnswer && v.modelAnswer.split(/\s+/).length >= v.yeuCau.soTuToiThieu,
      `${e.id}: bài mẫu ngắn hơn chính yêu cầu của đề — người học đối chiếu xong sẽ tưởng mình sai`);
    assert.ok(v.ghiChuBaiMau && v.ghiChuBaiMau.length > 40, `${e.id}: bài mẫu phải kèm ghi chú vì sao nó ổn`);
    assert.ok(v.checklist.length >= 4 && v.checklist.every((c) => c.trim().endsWith('?')),
      `${e.id}: checklist phải là câu hỏi có/không, ít nhất 4 câu`);
    for (const t of v.yeuCau.tuBatBuoc) {
      assert.ok(v.modelAnswer.toLowerCase().includes(t.toLowerCase()),
        `${e.id}: bài mẫu không chứa cụm bắt buộc "${t}" mà đề lại đòi`);
    }
    const n = e.sections.find((s) => s.key === 'speaking').de;
    assert.ok(n.giay >= 30 && n.soTuToiThieu > 0, `${e.id}: đề nói thiếu thời lượng hoặc mức tối thiểu`);
    assert.ok(n.tuMucTieu.length >= n.soTuPhaiDung, `${e.id}: đòi dùng nhiều từ hơn số từ đưa ra`);
  }
});

test('không chỗ nào trong bài thi tự nhận là chứng chỉ CEFR', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync('src/components/exam/BandExamPanel.jsx', 'utf8');
  assert.ok(src.includes('không phải chứng chỉ CEFR'),
    'màn hình thi phải nói thẳng đây không phải chứng chỉ CEFR — xem BAO_CAO_DU_DE_LEN_C2.md §việc KHÔNG đề xuất làm');
  assert.ok(/không tính vào kết quả/.test(src), 'phải nói rõ phần nào không tính vào kết quả');
});

// (4.2, đo được lúc tách chunk) Trang chủ từng import CẢ KHO bài nghe (~398 KB)
// chỉ để hiện một con số — đúng cái đã tách ra cho kho đề viết ở việc 3.3, và
// vẫn còn nguyên ở kho bài nghe cho tới lúc này.
test('con số bài nghe ở trang chủ khớp kho thật, và trang chủ KHÔNG nạp cả kho', async () => {
  const fs = await import('node:fs');
  const { SO_BAI_NGHE } = await import('../src/data/listeningCounts.js');
  assert.equal(SO_BAI_NGHE, listeningPassages.length,
    'listeningCounts.js lệch với kho bài nghe — chạy lại scripts/build_listening_passages.mjs');
  const src = fs.readFileSync('src/pages/WelcomePage.jsx', 'utf8');
  assert.ok(!/from '[^']*listeningPassages'/.test(src),
    'WelcomePage.jsx import cả kho bài nghe — kéo ~398 KB vào thứ ai mở app cũng phải tải');
});

test('con số bản thu ở trang chủ khớp bảng kê thật, và trang chủ KHÔNG nạp cả bảng kê', async () => {
  const fs = await import('node:fs');
  const { SO_BAN_THU } = await import('../src/data/audioCounts.js');
  assert.equal(SO_BAN_THU, audioManifest.length,
    'audioCounts.js lệch với bảng kê bản thu — chạy lại scripts/fetch_audio.mjs');
  const src = fs.readFileSync('src/pages/WelcomePage.jsx', 'utf8');
  assert.ok(!/from '[^']*audioManifest'/.test(src),
    'WelcomePage.jsx import cả bảng kê bản thu — kéo ~85 KB vào thứ ai mở app cũng phải tải');
});

// Bản ghi kết quả nằm trong localStorage của người học và được in ra TỜ GIẤY ĐI
// RA NGOÀI. Bản ghi cũ / bị cắt cụt / sửa tay mà thiếu `phan` thì `.map` sẽ ném
// lỗi ngay giữa tờ chứng nhận. Cùng loại lỗi đã chặn ở selfReportLog.js.
test('bản ghi kết quả THIẾU TRƯỜNG vẫn đọc ra được hình dạng tờ giấy cần in', async () => {
  const kho = new Map();
  globalThis.localStorage = {
    getItem: (k) => (kho.has(k) ? kho.get(k) : null),
    setItem: (k, v) => kho.set(k, String(v)),
    removeItem: (k) => kho.delete(k),
  };
  const { luotDatGanNhat, BAND_EXAM_KEY } = await import('../src/utils/bandExam.js');

  kho.set(BAND_EXAM_KEY, JSON.stringify([
    // Ngày thi phải SAU 19/08 — mốc `MOC_TRON_PHUONG_AN`. Test này kiểm việc
    // chuẩn hoá bản ghi cụt, không kiểm ranh giới tin cậy; để ngày trước mốc thì
    // bản ghi bị loại vì lý do khác và test đo nhầm chuyện.
    { examId: 'exam-b1', cefr: 'B1', dat: true, lucLam: '2026-08-20T00:00:00.000Z' }, // thiếu phan/phanKhongTinh
  ]));
  const k = luotDatGanNhat('B1');
  assert.ok(Array.isArray(k.phan) && Array.isArray(k.phanKhongTinh), 'phải chuẩn hoá thành mảng rỗng, không để undefined');
  assert.ok(k.moTaCanCu, 'thiếu căn cứ thì phải nói ra, không để trống');
  assert.doesNotThrow(() => k.phan.map((p) => p.nhan).join(', '));

  // Không có ngày thi thì KHÔNG in giấy: nghiệm thu 4.4 đòi ghi rõ ngày thi.
  kho.set(BAND_EXAM_KEY, JSON.stringify([{ examId: 'exam-b2', cefr: 'B2', dat: true }]));
  assert.equal(luotDatGanNhat('B2'), null, 'bản ghi không có ngày thi không được dùng làm căn cứ in giấy');
});

// Mã không trùng KHÔNG có nghĩa là nội dung không trùng: test "không trùng
// placementBank" so MÃ, nên nó không bắt được một câu hỏi bị viết lại bằng lời
// khác. Đây là chỗ đã dính thật — hai câu B2 lúc đầu chính là câu hỏi của bài
// nghe luyện tập viết lại. Test này so NỘI DUNG với đúng bài nghe được dùng.
test('câu hỏi Nghe theo bài không trùng nội dung với câu hỏi của chính bài nghe luyện tập', () => {
  const chuan = (t) => String(t).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const trung = [];
  let soDeSoi = 0;
  for (const e of bandExams) {
    const nghe = e.sections.find((s) => s.key === 'listening');
    if (!nghe.passageId) continue;
    soDeSoi += 1;
    const bai = listeningPassages.find((b) => b.id === nghe.passageId);
    const cu = (bai.questions || []).map((q) => chuan(q.q));
    for (const it of nghe.items) if (cu.includes(chuan(it.prompt))) trung.push(it.id);
  }
  assert.ok(soDeSoi >= 2, 'phải soi được cả hai đề nghe theo bài (B2 và nền C1) — soi được ít hơn nghĩa là thước hỏng');
  assert.deepEqual(trung, [],
    'câu thi trùng nguyên văn câu hỏi luyện tập — người đã luyện bài đó biết sẵn đáp án');
});

// Hai đề nghe theo bài mà trỏ vào CÙNG một bài thì người thi đề trước đã nghe
// hết nội dung của đề sau — thi lần hai không còn đo gì.
test('hai đề nghe theo bài không dùng chung một bài nghe', () => {
  const ds = bandExams.map((e) => e.sections.find((s) => s.key === 'listening').passageId).filter(Boolean);
  assert.equal(new Set(ds).size, ds.length, `hai đề dùng chung bài nghe: ${ds.join(', ')}`);
});

// ══ LƯỢT THI TRƯỚC 19/08 KHÔNG CÒN LÀ CĂN CỨ TUYÊN BỐ ══════════════════════
// Tới hôm đó, cả 42/42 câu của ba đề thi cuối bậc đều để đáp án đúng ở ô ĐẦU:
// bấm ô đầu mọi câu là qua sạch bài thi dùng để nói người học đã xong một bậc.
// `utils/tronPhuongAn.js` vá từ đó trở đi, nhưng lượt thi ĐÃ LƯU vẫn nằm trong sổ.
//
// Bản ghi KHÔNG bị xoá — sổ thi là nhật ký của người học. Chỉ thôi dùng nó để
// TUYÊN BỐ, và tuyên bố chỉ đi qua đúng hai hàm này.
test('lượt thi trước mốc trộn phương án không còn gắn được nhãn bậc', async () => {
  const kho = new Map();
  globalThis.localStorage = {
    getItem: (k) => (kho.has(k) ? kho.get(k) : null),
    setItem: (k, v) => kho.set(k, String(v)),
    removeItem: (k) => kho.delete(k),
  };
  const { luotDatGanNhat, bacDaDat, BAND_EXAM_KEY } = await import('../src/utils/bandExam.js');

  kho.set(BAND_EXAM_KEY, JSON.stringify([
    { examId: 'exam-b2', cefr: 'B2', dat: true, lucLam: '2026-08-10T00:00:00.000Z', phan: [], phanKhongTinh: [] },
  ]));
  assert.equal(bacDaDat(), null, 'lượt B2 thi trên bộ đề còn xếp đáp án ở ô đầu không được gắn nhãn "đã đạt B2"');
  assert.equal(luotDatGanNhat('B2'), null, 'và cũng không in được ra giấy');

  // Bản ghi vẫn còn nguyên trong sổ: gỡ tuyên bố, không xoá lịch sử.
  assert.equal(JSON.parse(kho.get(BAND_EXAM_KEY)).length, 1);

  // Thi lại sau bản vá thì tuyên bố trở lại bình thường.
  kho.set(BAND_EXAM_KEY, JSON.stringify([
    { examId: 'exam-b2', cefr: 'B2', dat: true, lucLam: '2026-08-10T00:00:00.000Z', phan: [], phanKhongTinh: [] },
    { examId: 'exam-b2', cefr: 'B2', dat: true, lucLam: '2026-08-25T00:00:00.000Z', phan: [], phanKhongTinh: [] },
  ]));
  assert.equal(bacDaDat(), 'B2');
  assert.equal(luotDatGanNhat('B2').lucLam, '2026-08-25T00:00:00.000Z');
});

// ══ CỬA ẢI CUỐI BẬC ═══════════════════════════════════════════════════════
// Có năm đề mà lộ trình không dẫn tới đề nào thì "lộ trình có cửa đo" là câu
// đúng trên giấy và sai trong tay người dùng: họ đi hết 73 chặng bậc A1 rồi
// đứng đó, không có gì bảo họ đi thi. Ghim cả hai đầu — bảng tra phải khớp kho,
// và trang lộ trình phải THẬT SỰ dựng cửa ải từ bảng tra đó.
test('bảng tra bandExamIndex khớp từng chữ với kho đề thật', async () => {
  const { BAND_EXAM_INDEX } = await import('../src/data/bandExamIndex.js');
  const { CEFR_OF_BAND, ROADMAP_BANDS } = await import('../src/data/roadmapData.js');

  for (const band of ROADMAP_BANDS) {
    const cefr = CEFR_OF_BAND[band];
    const e = bandExams.find((x) => x.cefr === cefr);
    const v = BAND_EXAM_INDEX[band];
    if (!e) {
      assert.ok(!v, `bậc ${band} không có đề trong kho mà bảng tra vẫn khai một đề`);
      continue;
    }
    assert.ok(v, `bậc ${band} có đề ${e.id} trong kho mà bảng tra bỏ sót — chạy lại scripts/build_band_exam_index.mjs`);
    assert.equal(v.id, e.id, `${band}: mã đề lệch`);
    assert.equal(v.ten, e.name, `${band}: tên đề lệch`);
    assert.equal(v.phut, e.phut, `${band}: thời lượng lệch`);
    assert.equal(v.nhan, e.nhanCongBo || e.cefr, `${band}: NHÃN CÔNG BỐ lệch — đây là chữ đi ra ngoài`);
    const soCau = phanChamDuoc(e).reduce((s, x) => s + x.items.length, 0);
    assert.equal(v.soCauChamDuoc, soCau, `${band}: số câu chấm được lệch (kho ${soCau}, bảng ${v.soCauChamDuoc})`);
  }

  // Bậc A0 cố ý KHÔNG có đề: CEFR không có bậc nào dưới A1. Ghim để không ai
  // "bổ sung cho đủ" bằng cách bịa ra một bậc không tồn tại.
  assert.equal(BAND_EXAM_INDEX.foundation, undefined, 'bậc A0 không được có đề thi — CEFR không có bậc dưới A1');
});

test('lộ trình DỰNG THẬT cửa ải cuối bậc, và mở thẳng vào đúng đề', async () => {
  const fs = await import('node:fs');
  const src = fs.readFileSync('src/pages/WelcomePage.jsx', 'utf8');
  assert.ok(new RegExp('<CuaAiCuoiBac\\b').test(src), 'trang lộ trình không dựng cửa ải cuối bậc nào');
  assert.ok(new RegExp('function CuaAiCuoiBac\\(').test(src), 'thiếu chính thân của cửa ải cuối bậc');
  assert.ok(/deThiCuaBac/.test(src), 'cửa ải phải tra đề từ bandExamIndex, không viết cứng danh sách bậc');
  // Kéo cả kho đề vào chunk trang chủ là đúng cái đã tách ra cho kho bài nghe.
  assert.ok(!/from '[^']*bandExamBank'/.test(src),
    'WelcomePage import cả kho đề thi — dùng bandExamIndex.js, đó là lý do file đó tồn tại');

  const panel = fs.readFileSync('src/components/exam/BandExamPanel.jsx', 'utf8');
  assert.ok(/examIdBanDau/.test(panel),
    'màn hình thi không nhận mã đề mở sẵn — cửa ải sẽ đổ người học vào danh sách năm đề và bắt họ tự tìm lại');
});

// ══ BẢN GHI CŨ CŨNG PHẢI RA ĐÚNG NHÃN ═════════════════════════════════════
// Bộ lái trình duyệt bắt được chỗ này ở đúng bước mở tờ chứng nhận: bản ghi
// THIẾU `nhanIn` (bản ghi của người thi trước khi có nhãn công bố, hoặc bản ghi
// bị sửa tay trong localStorage) đi qua `chuanHoa()`. Bản đầu rơi thẳng về
// `k.cefr` → in ra "C1" trần. Vá xong thì nhãn đúng nhưng LỜI GIẢI NGHĨA lại
// rơi về null → tờ giấy in một cái nhãn lạ rồi im lặng về nó.
//
// Hai lần hỏng, cùng một gốc: **nhãn và lời giải nghĩa phải đi cùng nhau.**
test('bản ghi THIẾU nhanIn vẫn ra đúng nhãn công bố VÀ lời giải nghĩa', async () => {
  const kho = new Map();
  globalThis.localStorage = {
    getItem: (k) => (kho.has(k) ? kho.get(k) : null),
    setItem: (k, v) => kho.set(k, String(v)),
    removeItem: (k) => kho.delete(k),
  };
  const { luotDatGanNhat, BAND_EXAM_KEY } = await import('../src/utils/bandExam.js');

  // Bản ghi tối giản, KHÔNG có nhanIn, KHÔNG có ghiChuBac — đúng hình dạng một
  // bản ghi cũ. Ngày sau mốc trộn phương án để nó không bị loại vì lý do khác.
  kho.set(BAND_EXAM_KEY, JSON.stringify([
    { examId: 'exam-c1', cefr: 'C1', dat: true, lucLam: '2026-08-20T02:00:00.000Z' },
  ]));
  const k = luotDatGanNhat('C1');
  assert.ok(k, 'bản ghi hợp lệ mà không đọc ra được');
  assert.notEqual(k.nhanIn, 'C1', 'bản ghi cũ in ra “C1” trần — nói quá đúng một bậc so với cam kết');
  assert.equal(k.nhanIn, 'Nền C1');
  assert.ok(k.ghiChuBac && k.ghiChuBac.length > 80,
    'in nhãn “Nền C1” mà không giải nghĩa thì người đọc tờ giấy vẫn hiểu thành “đạt C1”');

  // Bậc không có nhãn riêng thì hai thứ vẫn trùng nhau, không đẻ ra ghi chú thừa.
  kho.set(BAND_EXAM_KEY, JSON.stringify([
    { examId: 'exam-b1', cefr: 'B1', dat: true, lucLam: '2026-08-20T02:00:00.000Z' },
  ]));
  const b1 = luotDatGanNhat('B1');
  assert.equal(b1.nhanIn, 'B1');
  assert.equal(b1.ghiChuBac, null, 'bậc không khai nhãn riêng thì không được mọc ra lời giải nghĩa');
});

test('bảng tra NHÃN và GHI CHÚ luôn đi cùng nhau, và khớp kho đề', async () => {
  const { NHAN_THEO_CEFR, GHI_CHU_THEO_CEFR } = await import('../src/data/bandExamIndex.js');
  for (const e of bandExams) {
    assert.equal(NHAN_THEO_CEFR[e.cefr], e.nhanCongBo || e.cefr, `${e.id}: bảng tra nhãn lệch kho`);
    if (e.nhanCongBo && e.nhanCongBo !== e.cefr) {
      assert.ok(GHI_CHU_THEO_CEFR[e.cefr], `${e.id}: có nhãn riêng mà bảng tra thiếu lời giải nghĩa`);
      assert.equal(GHI_CHU_THEO_CEFR[e.cefr], e.ghiChuBac, `${e.id}: lời giải nghĩa trong bảng tra lệch kho`);
    } else {
      assert.ok(!GHI_CHU_THEO_CEFR[e.cefr], `${e.id}: không có nhãn riêng mà lại có lời giải nghĩa`);
    }
  }
});
