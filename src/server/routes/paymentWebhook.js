// File: src/server/routes/paymentWebhook.js
// THÂN TUYẾN DÙNG CHUNG — nhận webhook giao dịch ngân hàng từ dịch vụ trung
// gian (Casso/SePay/…) và TỰ ĐỘNG cấp mã truy cập khi khớp đúng một đơn.
//
// ══ CHƯA CHỌN NHÀ CUNG CẤP — FILE NÀY DỰNG PHẦN LÕI, KHÔNG KHOÁ CHẾT VÀO AI ══
// Chủ dự án chưa chốt Casso hay SePay. Tên trường trong `chuanHoaGiaoDich` bên
// dưới là ĐOÁN theo quy ước hay gặp ở hai dịch vụ đó, CHƯA đối chiếu với tài
// liệu thật. Trước khi bật webhook thật: gửi một giao dịch thử từ bảng điều
// khiển của dịch vụ đã chọn, chép nguyên payload họ gửi, rồi SỬA LẠI danh sách
// tên trường cho khớp — đừng tin đây là đúng sẵn.
//
// ══ VÌ SAO ĐÂY LÀ NƠI RỦI RO NHẤT TRONG CẢ LUỒNG BÁN HÀNG ══
// Mọi tuyến khác trong access.js chỉ TIẾT LỘ thông tin cho người đã qua đúng
// bước. Tuyến này thì CẤP PHÁT — gọi đúng, máy chủ tự tạo một mã truy cập trả
// phí mà không ai bấm "Cấp mã" trên bảng quản trị. Vì thế:
//   · THẤT BẠI ĐÓNG khi thiếu khoá bí mật — khác hẳn nhánh 'bank' trong
//     access.js (Redis chết vẫn phục vụ, vì không có gì bí mật để mất ở đó).
//     Ở đây phục vụ khi chưa cấu hình nghĩa là BẤT KỲ AI gọi đúng địa chỉ này
//     cũng tự cấp được mã miễn phí.
//   · SO KHOÁ bằng `safeSecretEqual`, không phải `===`.
//   · SỐ TIỀN so với `order.gia` — con số máy chủ tự tính lúc đăng ký đơn
//     (`giaGoi`), KHÔNG BAO GIỜ đọc số tiền hay tên gói từ chính payload
//     webhook, vì payload đến từ một dịch vụ trung gian chứ không phải từ
//     chính app — tin nó nói "gói 12 tháng" là tự mở khoá theo lời một bên thứ
//     ba không kiểm chứng được.
import {
  AccessConfigError, PAYMENT_AUDIT_KEY, issueAccessCode, jsonResponse,
  layBody, layHeader, orderTxKey, readOrder, redisCommand, redisPipeline,
  safeSecretEqual, writeOrder, ORDER_TX_TTL_SECONDS,
} from '../accessCore.js';
import { GOI, giaGoi, timGoi } from '../../utils/goi.js';

/**
 * Gói ĐẮT NHẤT mà số tiền nhận được đủ trả — dùng khi KHÔNG còn tin được
 * `order.goi` (nhánh thanh toán lặp lại, xem lời gọi bên dưới).
 *
 * `order.goi` là gói của LẦN ĐĂNG KÝ ĐƠN gần nhất trước khi đơn được cấp mã —
 * đúng cho lần cấp mã ĐẦU. Nhưng đơn đã cấp mã rồi mà có thêm một giao dịch
 * MỚI thì rất có thể là khách quay lại mua một gói KHÁC (đắt hơn hoặc rẻ hơn),
 * không phải mua thêm đúng gói cũ — `order.goi` không còn phản ánh ý định của
 * lần trả tiền này. Suy ra gói từ chính SỐ TIỀN nhận được đáng tin hơn.
 */
function goiPhuHopVoiSoTien(env, soTien) {
  return [...GOI].sort((a, b) => giaGoi(b.ma, env) - giaGoi(a.ma, env))
    .find((g) => soTien >= giaGoi(g.ma, env)) || null;
}

// Tìm mã đơn BE-XXXXXX ở BẤT KỲ ĐÂU trong nội dung chuyển khoản — không neo
// đầu/cuối như `MAU_MA_DON` (banHang.js), vì app ngân hàng thường tự thêm tiền
// tố ("CT tu ", "chuyen tien ") hoặc hậu tố vào nội dung thật sự đến tay.
const TIM_MA_DON = /BE-[ABCDEFGHJKMNPQRTUVWXY346789]{6}/;

/**
 * Chuẩn hoá payload webhook thành một MẢNG giao dịch, hình dạng cố định —
 * MỘT hàm duy nhất để đổi nhà cung cấp sau này chỉ phải sửa Ở ĐÂY.
 *
 * Không dựng thư mục "adapter theo nhà cung cấp" khi chưa biết sẽ dùng ai —
 * đó là trừu tượng hoá cho một yêu cầu chưa có thật.
 */
export function chuanHoaGiaoDich(payload) {
  const list = Array.isArray(payload?.data) ? payload.data
    : Array.isArray(payload?.transactions) ? payload.transactions
    : Array.isArray(payload) ? payload
    : payload ? [payload] : [];
  return list.map((gd) => ({
    maGiaoDich: String(gd?.tid ?? gd?.id ?? gd?.referenceCode ?? gd?.transactionId ?? '').trim(),
    soTien: Number(gd?.amount ?? gd?.transferAmount ?? gd?.creditAmount ?? 0),
    noiDung: String(gd?.description ?? gd?.content ?? gd?.transferContent ?? '').trim(),
    thoiGian: String(gd?.when ?? gd?.transactionDate ?? new Date().toISOString()),
  })).filter((gd) => gd.maGiaoDich && gd.soTien > 0);
}

async function ghiSoAudit(env, entry) {
  const dong = JSON.stringify({ at: new Date().toISOString(), ...entry });
  await redisPipeline(env, [['LPUSH', PAYMENT_AUDIT_KEY, dong], ['LTRIM', PAYMENT_AUDIT_KEY, 0, 199]]);
}

async function daXuLy(env, maGiaoDich) {
  return Boolean(await redisCommand(env, 'GET', orderTxKey(maGiaoDich)));
}

async function danhDauDaXuLy(env, maGiaoDich) {
  await redisPipeline(env, [
    ['SET', orderTxKey(maGiaoDich), '1'],
    ['EXPIRE', orderTxKey(maGiaoDich), ORDER_TX_TTL_SECONDS],
  ]);
}

async function xuLyMotGiaoDich(env, gd) {
  // Đánh dấu NGAY, trước khi biết kết quả — webhook có thể gọi lại đúng giao
  // dịch này (mất mạng, dịch vụ tự thử lại…), và một giao dịch dù khớp hay
  // không khớp cũng chỉ được XỬ LÝ một lần, không phải BÁO LỖI một lần.
  if (await daXuLy(env, gd.maGiaoDich)) return;
  await danhDauDaXuLy(env, gd.maGiaoDich);

  const khop = gd.noiDung.match(TIM_MA_DON);
  if (!khop) {
    await ghiSoAudit(env, { ket: 'khong-co-ma-don-trong-noi-dung', maGiaoDich: gd.maGiaoDich, soTien: gd.soTien, noiDung: gd.noiDung.slice(0, 200) });
    return;
  }
  const maDon = khop[0];
  const order = await readOrder(env, maDon);
  if (!order) {
    await ghiSoAudit(env, { ket: 'tien-vao-nhung-khong-thay-don', maDon, maGiaoDich: gd.maGiaoDich, soTien: gd.soTien });
    return;
  }
  const goi = timGoi(order.goi);
  if (!goi) {
    // Không nên xảy ra — `goi` đã được kiểm lúc đăng ký đơn (access.js action
    // 'order'). Nếu dữ liệu vẫn hỏng thì phải BÁO chứ không cấp mã theo một
    // gói không xác định được.
    await ghiSoAudit(env, { ket: 'don-mang-goi-khong-hop-le', maDon, goi: order.goi, maGiaoDich: gd.maGiaoDich });
    return;
  }

  if (order.trangThai === 'da_thanh_toan') {
    // Đơn NÀY đã từng được cấp mã ở một giao dịch KHÁC (giao dịch hiện tại đã
    // qua cửa `daXuLy` phía trên, nên đây chắc chắn là tiền MỚI, không phải
    // webhook gọi lại). Đây là khách mua lại hoặc chuyển thêm — KHÔNG ĐƯỢC
    // im lặng nuốt khoản tiền này. Cấp một mã BỔ SUNG, không ghi đè
    // `order.maTruyCap` (khách đang cầm/đang chờ đúng mã đầu), và ghi to vào
    // sổ audit để chủ dự án tự gửi mã bổ sung qua kênh thủ công.
    //
    // Suy GÓI từ chính số tiền — KHÔNG dùng `order.goi` — xem chú thích của
    // `goiPhuHopVoiSoTien` ở trên: khách có thể đang mua một gói KHÁC hẳn.
    const goiMua = goiPhuHopVoiSoTien(env, gd.soTien);
    if (!goiMua) {
      await ghiSoAudit(env, { ket: 'don-da-cap-ma-tien-them-khong-du-mot-goi', maDon, maGiaoDich: gd.maGiaoDich, soTien: gd.soTien });
      return;
    }
    const capThem = await issueAccessCode(env, { plan: goiMua.ma, label: `Đơn ${maDon} (mua thêm)` });
    await ghiSoAudit(env, { ket: 'thanh-toan-lap-lai-da-cap-ma-bo-sung', maDon, maGiaoDich: gd.maGiaoDich, soTien: gd.soTien, goiCap: goiMua.ma, codePreview: capThem.record.codePreview });
    return;
  }

  // TÍCH LUỸ, không ghi đè — `order.soTienNhanDuoc` là TỔNG đã nhận từ trước,
  // không phải riêng giao dịch này. Màn hình khách nói thẳng "hãy chuyển thêm
  // phần còn thiếu" (ChuyenKhoan.jsx); nếu ghi đè thay vì cộng dồn thì một
  // khách trả hai lần (thiếu lần đầu, bù lần hai) sẽ KHÔNG BAO GIỜ đủ dù tổng
  // tiền đã đủ từ lâu — đúng lời khuyên trên màn hình hoá ra là một ngõ cụt.
  const tongDaNhan = (order.soTienNhanDuoc || 0) + gd.soTien;

  if (tongDaNhan < order.gia) {
    // rộng tay là quyết định, hụt là tai nạn (accessCore.js, createAccessRecord)
    // — áp cùng luật ở đây: thiếu tiền thì BÁO, không cấp mã, không im lặng.
    await writeOrder(env, maDon, { ...order, trangThai: 'thieu_tien', soTienNhanDuoc: tongDaNhan, capNhatLuc: new Date().toISOString() });
    await ghiSoAudit(env, { ket: 'thieu-tien', maDon, maGiaoDich: gd.maGiaoDich, soTien: gd.soTien, tongDaNhan, gia: order.gia });
    return;
  }

  const { code, record } = await issueAccessCode(env, { plan: order.goi, label: `Đơn ${maDon}` });
  await writeOrder(env, maDon, {
    ...order, trangThai: 'da_thanh_toan', maTruyCap: code, soTienNhanDuoc: tongDaNhan, capNhatLuc: new Date().toISOString(),
  });
  await ghiSoAudit(env, { ket: 'da-cap-ma-tu-dong', maDon, maGiaoDich: gd.maGiaoDich, soTien: gd.soTien, tongDaNhan, gia: order.gia, codePreview: record.codePreview });
}

function layKhoaGuiLen(request) {
  const auth = String(layHeader(request, 'authorization') || '').trim();
  const rieng = String(layHeader(request, 'x-webhook-secret') || '').trim();
  // Casso/SePay và phần lớn dịch vụ tương tự gửi khoá dạng
  // `Authorization: Apikey <khoá>` hoặc `Bearer <khoá>`. Chấp cả header riêng
  // để không khoá chết vào đúng một quy ước.
  const boTienTo = auth.replace(/^(apikey|bearer)\s+/i, '').trim();
  return boTienTo || rieng;
}

export async function xuLyPaymentWebhook(request, env, response = null) {
  try {
    if (request.method !== 'POST') return jsonResponse(response, 405, { code: 'method-not-allowed', message: 'Phương thức không được hỗ trợ.' });

    // THẤT BẠI ĐÓNG — xem chú thích đầu file.
    const bimat = env?.PAYMENT_WEBHOOK_SECRET;
    if (!bimat || String(bimat).length < 16) throw new AccessConfigError('payment-webhook-secret-missing');

    const guiLen = layKhoaGuiLen(request);
    if (!safeSecretEqual(guiLen, bimat)) {
      return jsonResponse(response, 401, { code: 'invalid-webhook-secret', message: 'Khoá webhook không đúng.' });
    }

    // ĐỌC THÂN ĐÚNG MỘT LẦN — trên nền Web thân là stream dùng một lần, đọc
    // lần hai ra rỗng. Bẫy này đã cắn `accessAdmin.js` một lần (xem chú thích
    // ở đó, và tests/cloudflare_tuyen.test.js bắt được), nên ở đây không lặp.
    const payload = await layBody(request);
    const giaoDich = chuanHoaGiaoDich(payload);

    for (const gd of giaoDich) {
      // Một giao dịch lỗi không được làm hỏng cả lô — ghi lỗi rồi xử lý tiếp
      // các giao dịch còn lại trong cùng lượt gọi (dịch vụ có thể gộp nhiều
      // giao dịch vào một lần gọi webhook). Xử lý TUẦN TỰ, không `Promise.all`:
      // hai giao dịch trong cùng một lô có thể cùng chạm một đơn (một giao
      // dịch đủ tiền rồi một giao dịch "mua thêm" ngay sau), và xử lý song
      // song sẽ đọc-sửa-ghi đè lên nhau trên cùng bản ghi đơn.
      await xuLyMotGiaoDich(env, gd).catch((err) => {
        console.error('Payment webhook: lỗi khi xử lý một giao dịch', gd.maGiaoDich, err);
      });
    }
    return jsonResponse(response, 200, { ok: true, xuLy: giaoDich.length });
  } catch (error) {
    if (error instanceof AccessConfigError) return jsonResponse(response, 503, { code: 'not-configured', message: 'Chưa cấu hình cổng nhận thanh toán tự động.' });
    if (error instanceof SyntaxError) return jsonResponse(response, 400, { code: 'bad-json', message: 'Dữ liệu gửi lên không hợp lệ.' });
    console.error('Payment webhook error', error);
    return jsonResponse(response, 500, { code: 'server-error', message: 'Không xử lý được webhook lúc này.' });
  }
}
