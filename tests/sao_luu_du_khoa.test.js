// File: tests/sao_luu_du_khoa.test.js
// GHIM: MỌI KHO DỮ LIỆU HỌC PHẢI CÓ MẶT TRONG SAO LƯU — HOẶC BỊ BỎ RA CÓ LÝ DO.
//
// ══ LỖ ĐÃ CÓ, VÀ VÌ SAO NÓ ÂM THẦM ══
// `bandExamHistoryV1` — sổ thi cuối bậc — nằm NGOÀI `LEARNING_STORAGE_KEYS` từ
// lúc dựng bộ thi. Đó là căn cứ DUY NHẤT để app gắn nhãn bậc và in tờ chứng
// nhận. Đổi máy, hay khôi phục từ bản sao lưu, là mất sạch mọi lượt thi đã đạt
// và tờ giấy tụt về bản "chuyên cần". Không bài học nào mất, nhưng mất đúng thứ
// chứng minh người học đã qua bậc.
//
// Không có gì báo động cả: sao lưu vẫn chạy, vẫn khôi phục được, vẫn báo "đã
// khôi phục N mục". Chỉ là N thiếu mất một. Đó là kiểu hỏng chỉ lộ ra đúng lúc
// người ta cần nó nhất.
//
// Test này quét MỌI khoá localStorage app dùng và bắt mỗi khoá phải nằm ở đúng
// một trong hai chỗ: danh sách sao lưu, hoặc danh sách bỏ ra KÈM LÝ DO.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { LEARNING_STORAGE_KEYS } from '../src/utils/backup.js';

// ══ DANH SÁCH BỎ RA — MỖI KHOÁ MỘT LÝ DO, GHI TỪNG DÒNG ══════════════════
// Kể tên ra thì biết; lọc theo mẫu thì chỉ là đoán. Thêm một khoá vào đây phải
// là một quyết định có chữ, không phải một dòng lọt qua.
const BO_RA = new Map([
  ['grammarGeminiKeyV1', 'API key của người học. Sao lưu là tải key ra file rồi gửi qua lại — đúng thứ không được rời khỏi máy.'],
  ['grammarDeviceIdV1', 'Mã máy. Chép sang máy khác là hai máy cùng một mã, hỏng chính cái nó dùng để phân biệt.'],
  ['grammar:access:index:v1', 'Kho phía MÁY CHỦ (Redis), không phải localStorage của người học.'],
  ['grammar:access:audit:v1', 'Kho phía MÁY CHỦ (Redis), không phải localStorage của người học.'],
  ['grammar:order:', 'Tiền tố khoá ĐƠN HÀNG phía MÁY CHỦ (Redis) — accessCore.js/orderKey(). Không phải localStorage, và không phải một khoá đơn lẻ mà là tiền tố ghép với mã đơn.'],
  ['grammar:order:tx:', 'Tiền tố khoá chống xử lý hai lần một MÃ GIAO DỊCH ngân hàng, phía MÁY CHỦ (Redis) — accessCore.js/orderTxKey(). Không phải localStorage.'],
  ['grammar:payment:audit:v1', 'Sổ audit webhook thanh toán phía MÁY CHỦ (Redis), không phải localStorage của người học — cùng nhóm với grammar:access:audit:v1 ở trên.'],
  ['roadmapSeenTotalV1', 'Cờ "đã thấy lộ trình dài bao nhiêu lần trước" — chỉ để so số chặng và báo lộ trình vừa dài ra. Chép sang máy mới thì thà báo lại còn hơn im.'],
  ['xacMinhGoDaBaoV1', 'Cờ "đã đọc thông báo gỡ xác minh" — chuyện của một lần thông báo trên MỘT máy, không mang tiến độ học nào. Chép sang máy mới thì thà báo lại còn hơn nuốt mất.'],
  ['xacMinhGoSoLuongV1', 'Số bản ghi đã gỡ, chỉ để in vào chính thông báo trên. Sang máy khác thì con số đó nói về máy cũ, mang theo là nói sai.'],
  ['xacMinhGoTheoTronPhuongAnV1', 'Cùng nhóm với hai cờ thông báo gỡ xác minh ở trên — một lần báo rồi thôi, không mang tiến độ học nào.'],
  ['x-gemini-key', 'Tên HEADER HTTP, không phải khoá kho. Nó khai bằng đúng cùng một dạng hằng số nên bộ quét không phân biệt được — kể tên ra thay vì thêm một luật đoán theo hình dạng.'],
]);

const SRC = 'src';
function moiFile(dir, ra = []) {
  for (const t of readdirSync(dir)) {
    const p = path.join(dir, t);
    if (statSync(p).isDirectory()) moiFile(p, ra);
    else if (/\.(js|jsx)$/.test(t)) ra.push(p);
  }
  return ra;
}

/** Mọi khoá localStorage app dùng — cả gọi thẳng lẫn qua hằng số. */
function moiKhoa() {
  const thay = new Map(); // khoá → file đầu tiên thấy
  for (const f of moiFile(SRC)) {
    const src = readFileSync(f, 'utf8');
    // Gọi thẳng: localStorage.getItem('xp')
    for (const m of src.matchAll(/localStorage\.(?:get|set|remove)Item\(\s*'([^']+)'/g)) {
      if (!thay.has(m[1])) thay.set(m[1], f);
    }
    // Qua hằng số: const KEY = 'bandExamHistoryV1'
    for (const m of src.matchAll(/(?:const|let)\s+[A-Za-z0-9_$]*(?:KEY|Key)[A-Za-z0-9_$]*\s*=\s*'([^']+)'/g)) {
      const k = m[1];
      // Chỉ nhận thứ TRÔNG NHƯ một khoá kho: không khoảng trắng, không phải câu.
      if (/\s/.test(k) || k.length > 60) continue;
      if (!thay.has(k)) thay.set(k, f);
    }
  }
  return thay;
}

// Tự kiểm thước đo TRƯỚC khi kết luận. Bộ quét trả về rỗng vì regex hỏng thì
// test này xanh rực trong khi nó chưa soi được gì — đúng loại "thước hỏng" đã
// dính ở bộ audit gọi `rg` trên máy không có `rg`.
test('bộ quét khoá thật sự tìm được khoá — không kết luận trên một cái thước hỏng', () => {
  const ds = moiKhoa();
  assert.ok(ds.size >= 20, `chỉ quét ra ${ds.size} khoá — regex hỏng, mọi kết luận bên dưới là vô nghĩa`);
  for (const phaiCo of ['xp', 'completedMilestones', 'bandExamHistoryV1', 'thoiGianHocV1']) {
    assert.ok(ds.has(phaiCo), `bộ quét không thấy khoá "${phaiCo}" mà chắc chắn có thật`);
  }
});

test('mọi khoá đều nằm trong SAO LƯU, hoặc trong danh sách bỏ ra KÈM LÝ DO', () => {
  const trongSaoLuu = new Set(LEARNING_STORAGE_KEYS);
  const mocoi = [];
  for (const [k, f] of moiKhoa()) {
    if (trongSaoLuu.has(k) || BO_RA.has(k)) continue;
    mocoi.push(`${k}  (${f})`);
  }
  assert.deepEqual(mocoi, [],
    'khoá sau không có trong sao lưu và cũng không được bỏ ra có lý do — đổi máy là mất:\n  ' + mocoi.join('\n  '));
});

test('không khoá nào vừa nằm trong sao lưu vừa nằm trong danh sách bỏ ra', () => {
  const trung = LEARNING_STORAGE_KEYS.filter((k) => BO_RA.has(k));
  assert.deepEqual(trung, [], `mâu thuẫn: ${trung.join(', ')} vừa được sao lưu vừa bị khai là bỏ ra`);
});

test('mỗi khoá bị bỏ ra phải có lý do ĐỦ DÀI để đọc hiểu được', () => {
  for (const [k, lyDo] of BO_RA) {
    assert.ok(lyDo && lyDo.length > 40, `khoá "${k}" bị bỏ khỏi sao lưu với một lý do quá ngắn để kiểm lại`);
  }
});

// Sổ thi là căn cứ DUY NHẤT của tờ chứng nhận. Ghim riêng để nếu ai đó gỡ nó
// ra khỏi danh sách thì test đỏ ngay với đúng lý do, không phải một lỗi chung.
test('SỔ THI CUỐI BẬC nằm trong sao lưu — nó là căn cứ duy nhất của tờ chứng nhận', () => {
  assert.ok(LEARNING_STORAGE_KEYS.includes('bandExamHistoryV1'),
    'gỡ bandExamHistoryV1 khỏi sao lưu là đổi máy mất sạch mọi lượt thi đã đạt, và tờ chứng nhận tụt về bản chuyên cần');
});

test('sao lưu không có khoá trùng nhau', () => {
  assert.equal(new Set(LEARNING_STORAGE_KEYS).size, LEARNING_STORAGE_KEYS.length);
});
