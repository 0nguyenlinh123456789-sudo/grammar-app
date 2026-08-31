// File: tests/ghi_am.test.js
// GHIM GHI ÂM NGHE LẠI.
//
// Vòng luyện nói trước bản này hở đúng một nửa: người học nói, nhận về BẢN CHỮ
// trình duyệt nghe được, và không bao giờ nghe lại được chính mình. Tự nghe lại
// là cách luyện phát âm rẻ nhất khi không có thầy. `MediaRecorder`/`getUserMedia`
// xuất hiện 0 lần trong cả kho mã.
//
// Nhưng một cái nút micro là thứ dễ khiến người ta tưởng đang được CHẤM nhất, và
// app này không chấm phát âm ở bất kỳ đâu. Nên ba thứ bị ghim ở đây:
//
//   1. **Trả lại micro** ở mọi đường thoát — kể cả đường hỏng. Đèn micro sáng mãi
//      sau khi người ta đóng màn hình là lỗi tệ nhất của một tính năng ghi âm.
//   2. **Không bao giờ ném.** Ghi âm hỏng thì nhận dạng giọng nói vẫn phải chạy;
//      hai thứ dùng chung một micro và không trình duyệt nào hứa cho chạy song song.
//   3. **Không hứa chấm, không hứa lưu.** Giao diện phải nói thẳng cả hai.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/**
 * Dựng một trình duyệt giả tối thiểu.
 * @param {object} o
 * @param {'ok'|'tu-choi'|'loi-khac'|'khong-co'} o.micro
 * @param {boolean} [o.mayThuHong] getUserMedia xong nhưng MediaRecorder ném
 * @param {boolean} [o.thuRong]    thu xong không có dữ liệu nào
 */
function dungTrinhDuyet({ micro, mayThuHong = false, thuRong = false }) {
  const daTat = [];
  const track = (ten) => ({ stop: () => daTat.push(ten) });
  const stream = { getTracks: () => [track('audio')] };

  // Node 24 khai `globalThis.navigator` bằng getter, gán thẳng là ném
  // TypeError. Phải defineProperty.
  const datNavigator = (v) => Object.defineProperty(globalThis, 'navigator', { value: v, configurable: true, writable: true });
  datNavigator(micro === 'khong-co' ? {} : {
    mediaDevices: {
      getUserMedia: async () => {
        if (micro === 'tu-choi') { const e = new Error('x'); e.name = 'NotAllowedError'; throw e; }
        if (micro === 'loi-khac') { const e = new Error('x'); e.name = 'NotReadableError'; throw e; }
        return stream;
      },
    },
  });

  class MayThuGia {
    constructor() {
      if (mayThuHong) throw new Error('khong dung duoc');
      this.mimeType = 'audio/webm';
      this.ondataavailable = null;
      this.onstop = null;
    }
    start() {
      if (!thuRong) setTimeout(() => this.ondataavailable?.({ data: { size: 128 } }), 0);
    }
    stop() { setTimeout(() => this.onstop?.(), 0); }
  }

  const daThuHoi = [];
  globalThis.window = { MediaRecorder: micro === 'khong-co' ? undefined : MayThuGia };
  globalThis.MediaRecorder = globalThis.window.MediaRecorder;
  globalThis.Blob = class { constructor(m, o) { this.m = m; this.type = o?.type; } };
  globalThis.URL = {
    createObjectURL: () => 'blob:gia-lap',
    revokeObjectURL: (u) => daThuHoi.push(u),
  };

  return { daTat, daThuHoi };
}

function donDep() {
  try { delete globalThis.navigator; } catch { /* getter goc */ }
  delete globalThis.window;
  delete globalThis.MediaRecorder; delete globalThis.Blob; delete globalThis.URL;
}

const nap = () => import(`../src/utils/ghiAm.js?t=${Math.random()}`);

test('trình duyệt không ghi âm được thì BÁO, không ném', async () => {
  dungTrinhDuyet({ micro: 'khong-co' });
  const m = await nap();
  assert.equal(m.ghiAmDuoc(), false);
  const kq = await m.batDauGhiAm();
  assert.equal(kq.ok, false);
  assert.equal(kq.loi, 'khong-ho-tro');
  assert.ok(m.loiGhiAmThanhChu(kq.loi).length > 30);
  donDep();
});

test('người dùng từ chối micro: báo đúng lý do, và nói rõ phần nhận dạng VẪN chạy', async () => {
  dungTrinhDuyet({ micro: 'tu-choi' });
  const m = await nap();
  const kq = await m.batDauGhiAm();
  assert.equal(kq.ok, false);
  assert.equal(kq.loi, 'tu-choi');
  assert.ok(/vẫn (nói|lấy được bản chữ)/i.test(m.loiGhiAmThanhChu(kq.loi)),
    'lời báo phải nói rõ người học VẪN làm được đề — nếu không họ tưởng hỏng hết');
  donDep();
});

// ══ ĐƯỜNG HỎNG NGUY HIỂM NHẤT ═════════════════════════════════════════════
// Mở được micro rồi mới dựng máy thu hỏng. Nếu không trả micro ở đúng nhánh
// này thì đèn micro sáng mãi vì một tính năng đã hỏng ngay từ đầu.
test('mở được micro nhưng máy thu hỏng thì PHẢI trả lại micro', async () => {
  const { daTat } = dungTrinhDuyet({ micro: 'ok', mayThuHong: true });
  const m = await nap();
  const kq = await m.batDauGhiAm();
  assert.equal(kq.ok, false);
  assert.deepEqual(daTat, ['audio'],
    'máy thu hỏng mà micro không được trả lại — đèn micro sẽ sáng mãi');
  donDep();
});

test('thu xong thì trả lại micro và đưa ra URL nghe lại được', async () => {
  const { daTat, daThuHoi } = dungTrinhDuyet({ micro: 'ok' });
  const m = await nap();
  const may = await m.batDauGhiAm();
  assert.equal(may.ok, true);
  await new Promise((r) => setTimeout(r, 5));
  const kq = await may.dung();
  assert.equal(kq.loi, null);
  assert.ok(kq.url, 'thu xong mà không có gì để nghe lại');
  assert.deepEqual(daTat, ['audio'], 'thu xong mà micro vẫn bật');

  // Blob URL không tự biến mất. Quên thu hồi là rò bộ nhớ tới lúc tải lại trang.
  kq.huy();
  assert.deepEqual(daThuHoi, ['blob:gia-lap'], 'huy() không thu hồi blob URL');
  donDep();
});

test('thu ra rỗng thì BÁO, không trả về một URL rỗng cho người ta bấm vào', async () => {
  const { daTat } = dungTrinhDuyet({ micro: 'ok', thuRong: true });
  const m = await nap();
  const may = await m.batDauGhiAm();
  const kq = await may.dung();
  assert.equal(kq.url, null);
  assert.equal(kq.loi, 'rong');
  assert.deepEqual(daTat, ['audio'], 'thu rỗng mà micro vẫn bật');
  donDep();
});

test('bỏ giữa chừng (rời màn hình khi đang thu) cũng trả lại micro', async () => {
  const { daTat } = dungTrinhDuyet({ micro: 'ok' });
  const m = await nap();
  const may = await m.batDauGhiAm();
  may.boGiuaChung();
  assert.deepEqual(daTat, ['audio'], 'rời màn hình giữa lúc đang thu mà micro vẫn bật');
  donDep();
});

// ══ GIAO DIỆN KHÔNG ĐƯỢC HỨA THỨ KHÔNG CÓ ═════════════════════════════════
test('màn luyện nói nói THẲNG bản thu đi đâu, và không phải điểm thi', () => {
  const src = readFileSync('src/components/speaking/SpeakingPromptPanel.jsx', 'utf8');
  assert.ok(/batDauGhiAm/.test(src), 'màn luyện nói chưa gắn ghi âm — vòng luyện nói vẫn hở một nửa');
  assert.ok(/Nghe lại giọng mình/.test(src), 'không có chỗ nào cho người học nghe lại');
  // ⚠️ ĐỔI 31/08 — SỰ THẬT ĐÃ ĐỔI, NÊN PHÉP CANH PHẢI CANH SỰ THẬT MỚI.
  // Trước đây bản thu KHÔNG bao giờ rời khỏi máy, nên phép canh đòi câu "máy
  // không chấm bản thu". Nay có nút "Nghe và nhận xét phát âm" gửi bản thu cho
  // Gemini bằng key của chính người học, nên câu cũ thành SAI. Giữ câu cũ là
  // bắt sản phẩm nói dối theo chiều ngược lại.
  //
  // Điều PHẢI canh nay là ba câu khác, và chúng nghiêm hơn câu cũ:
  assert.ok(/không được lưu vào máy/.test(src),
    'phải nói rõ bản thu không lưu lại: đó là giọng của người học');
  assert.ok(/chỉ rời khỏi máy bạn khi chính bạn bấm/.test(src),
    'phải nói rõ bản thu CHỈ được gửi đi khi người học tự bấm — im lặng gửi giọng người ta đi là chuyện khác hẳn');
  assert.ok(/gửi tới Google bằng API key của bạn/.test(src),
    'phải nói rõ gửi ĐI ĐÂU và bằng key của ai');
  assert.ok(/không phải điểm thi/.test(src),
    'kết quả chấm phát âm phải kèm câu nói rõ nó không phải điểm thi');

  // Thoát sớm khi trình duyệt không có Web Speech từng bỏ quên micro đang bật.
  assert.ok(/if \(mayThuRef\.current\) setDangNghe\(true\);/.test(src),
    'nhánh không có nhận dạng giọng nói phải vẫn hiện được nút Dừng, nếu không micro sáng mãi');
  assert.ok(/boGiuaChung/.test(src), 'rời màn hình giữa lúc đang thu phải trả lại micro');
});

test('không chỗ nào hứa CHẤM PHÁT ÂM từ bản ghi âm', () => {
  const src = readFileSync('src/components/speaking/SpeakingPromptPanel.jsx', 'utf8');
  const than = src.split('\n').filter((d) => !/^\s*(\/\/|\*|\/\*)/.test(d)).join('\n');
  for (const cam of [/chấm phát âm của bạn/, /điểm phát âm/, /phát âm chuẩn!/i, /AI nghe thấy/i]) {
    assert.equal(cam.test(than), false, `màn luyện nói có chuỗi hứa quá: ${cam}`);
  }
});

// ══ BẤM HAI LẦN ═══════════════════════════════════════════════════════════
// `batDau` trong panel là async và await `batDauGhiAm()`. Cờ `dangNghe` chỉ bật
// trong `r.onstart`, tức là SAU await đó — nên trong khoảng chờ, nút vẫn đọc
// "Bắt đầu nói" và vẫn bấm được. Khoảng đó rộng bằng cả lúc trình duyệt hiện
// hộp xin quyền micro: vài GIÂY, không phải vài mili giây.
//
// Bấm lần hai mà không chặn: mở luồng micro thứ hai, `mayThuRef` bị ghi đè, và
// luồng thứ nhất KHÔNG AI TẮT — đèn micro sáng tới lúc tải lại trang.
test('mở hai máy thu chồng nhau thì cả hai micro đều phải được trả lại', async () => {
  const { daTat } = dungTrinhDuyet({ micro: 'ok' });
  const m = await nap();

  // Hai lượt mở KHÔNG chờ nhau — đúng hình dạng hai cú bấm liền.
  const [mot, hai] = await Promise.all([m.batDauGhiAm(), m.batDauGhiAm()]);
  assert.equal(mot.ok, true);
  assert.equal(hai.ok, true);

  // Panel giữ máy thứ hai và bỏ máy thứ nhất. Máy bị bỏ PHẢI trả lại micro.
  mot.boGiuaChung();
  await new Promise((r) => setTimeout(r, 5));
  await hai.dung();
  assert.deepEqual(daTat, ['audio', 'audio'],
    `mở 2 luồng micro mà chỉ trả lại ${daTat.length} — luồng còn lại giữ micro tới lúc tải lại trang`);
  donDep();
});

test('panel CHẶN cú bấm thứ hai khi lượt mở micro đầu chưa xong', () => {
  const src = readFileSync('src/components/speaking/SpeakingPromptPanel.jsx', 'utf8');
  assert.ok(/dangMoMicRef/.test(src),
    'không có chốt nào chặn cú bấm thứ hai trong lúc đang chờ quyền micro');
  assert.ok(/if \(dangMoMicRef\.current\) return;/.test(src), 'chốt có mà không chặn');
  assert.ok(/mayThuRef\.current\?\.boGiuaChung\(\);[\s\S]{0,120}mayThuRef\.current = null;[\s\S]{0,120}batDauGhiAm/.test(src),
    'mở máy thu mới mà không trả micro của máy cũ trước');
});
