// File: src/components/access/ChuyenKhoan.jsx
//
// KHỐI CHUYỂN KHOẢN NGÂN HÀNG trong bảng giá.
//
// ══ QUYẾT ĐỊNH ĐỨNG SAU MÀN NÀY ══
// Chủ dự án muốn tiền vào thẳng tài khoản ngân hàng và không lộ thông tin cá
// nhân. Hai vế đó không cùng đúng được — mọi chuyển khoản ở VN đều hiện TÊN CHỦ
// TÀI KHOẢN cho người trả — nên chủ dự án đã chọn: chấp nhận lộ TÊN, không lộ
// thứ gì khác. Màn này vì thế chỉ hiện ngân hàng, số tài khoản, tên chủ tài
// khoản và ảnh QR. Không số điện thoại, không địa chỉ, không email.
//
// ══ THỨ DỄ HỎNG NHẤT Ở ĐÂY KHÔNG PHẢI GIAO DIỆN ══
// Ảnh QR lấy từ app ngân hàng là QR TĨNH: nó mang số tài khoản, KHÔNG mang số
// tiền và KHÔNG mang nội dung. Người mua vẫn phải gõ tay hai thứ đó. Nội dung
// chuyển khoản mà trống thì người bán nhìn thấy tiền vào mà không biết của ai —
// cách hỏng thường gặp nhất của kiểu bán này, và nó hỏng SAU KHI khách đã trả
// tiền, tức là chỗ tệ nhất để hỏng.
//
// Nên MÃ ĐƠN được đặt to, trên cùng, có nút sao chép riêng, và được nhắc lại ở
// đúng dòng "Nội dung chuyển khoản". Không phải trang trí — đó là sợi dây duy
// nhất nối một khoản tiền với một người mua.
//
// ══ 27/08 — SỐ TÀI KHOẢN KHÔNG CÒN NẰM TRONG BUNDLE ══
// Trước đây khối này đọc `VITE_BANK_*` từ `import.meta.env`, mà Vite nhúng thẳng
// mọi biến `VITE_*` vào JavaScript công khai — số tài khoản nằm sẵn trong tệp
// tĩnh cho mọi người, kể cả người chưa bấm mua. Nay nó HỎI MÁY CHỦ khi khối được
// gắn vào màn hình, tức đúng lúc khách đã chọn gói.
//
// Tách làm hai: `KhoiChuyenKhoan` vẽ thuần (có gì vẽ nấy, không biết mạng là gì)
// và `ChuyenKhoan` lo việc hỏi. Nhờ thế phép kiểm vẽ được khối bằng dữ liệu có
// sẵn — không phải giả lập mạng để kiểm một cái khung.
import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Copy, Landmark, Loader2 } from 'lucide-react';
import {
  CHUA_CO_CHUYEN_KHOAN, DANG_LAY_NGAN_HANG, dangKyDonHang, layThongTinNganHang, saoChepLoiNhan, trangThaiDonHang,
} from '../../utils/banHang';

/** Một dòng thông tin, có nút sao chép khi đáng sao chép. */
function Dong({ nhan, giaTri, dam = false, chepDuoc = false, onChep }) {
  if (!giaTri) return null;
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-slate-200 dark:border-slate-700 last:border-0">
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">{nhan}</span>
      <span className="flex items-center gap-2 min-w-0">
        <span className={`${dam ? 'text-base font-black' : 'text-sm font-bold'} truncate text-right`}>{giaTri}</span>
        {chepDuoc && (
          <button
            type="button"
            onClick={() => onChep(giaTri)}
            aria-label={`Sao chép ${nhan}`}
            className="shrink-0 w-7 h-7 rounded-lg border-2 border-slate-800 dark:border-slate-500 flex items-center justify-center"
          >
            <Copy size={13} />
          </button>
        )}
      </span>
    </div>
  );
}

/**
 * Phần VẼ THUẦN: đưa gì vẽ nấy, không tự đi hỏi ai.
 *
 * @param {object} props
 * @param {string} props.maDon    mã đơn đã sinh sẵn ở màn cha — sinh ở đây thì
 *                                mỗi lần React vẽ lại sẽ ra một mã khác, và
 *                                khách đang chép dở sẽ chép nhầm mã.
 * @param {string} props.soTien   giá gói, hoặc rỗng khi chủ dự án chưa đặt giá.
 * @param {object|null} props.nh  thông tin ngân hàng đã lấy được, hoặc null.
 * @param {string} props.loi      câu phải báo khi chưa/không lấy được.
 */
export function KhoiChuyenKhoan({ maDon, soTien, nh, loi = CHUA_CO_CHUYEN_KHOAN }) {
  const [bao, setBao] = useState('');
  // Ảnh QR tải hỏng (gõ sai đường dẫn, quên bỏ file vào public/) thì trình duyệt
  // để lại một ô vỡ và KHÔNG nói gì. Khách đứng trước một hình vỡ ở đúng bước trả
  // tiền sẽ nghĩ trang hỏng rồi bỏ đi. Ẩn ảnh và NÓI RA — vẫn chuyển khoản tay
  // được bằng số tài khoản ngay bên trên, nên đây là bớt một thứ chứ không mất gì.
  const [qrHong, setQrHong] = useState(false);
  const chep = async (chu) => setBao((await saoChepLoiNhan(chu)).chu);

  if (!nh) {
    return (
      <p className="mt-3 text-xs font-bold text-rose-700 dark:text-rose-300 flex items-start gap-2">
        <AlertTriangle size={15} className="shrink-0 mt-0.5" />
        {loi}
      </p>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border-3 border-slate-900 dark:border-slate-600 bg-white dark:bg-slate-900 p-4">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500 flex items-center gap-2">
        <Landmark size={15} /> Chuyển khoản ngân hàng
      </p>

      {/* Mã đơn nằm TRÊN thông tin ngân hàng: khách phải thấy nó trước khi mở
          app ngân hàng, không phải sau khi đã bấm chuyển. */}
      <div className="mt-3 rounded-xl border-3 border-amber-500 bg-amber-50 dark:bg-amber-950/40 p-3">
        <p className="text-[11px] font-black uppercase text-amber-800 dark:text-amber-300">Mã đơn của bạn</p>
        <div className="flex items-center justify-between gap-3 mt-1">
          <span className="text-2xl font-black font-mono tracking-wider">{maDon}</span>
          <button
            type="button"
            onClick={() => chep(maDon)}
            className="px-3 py-2 rounded-xl bg-slate-900 text-white border-2 border-slate-900 font-black text-xs flex items-center gap-1.5"
          >
            <Copy size={13} /> SAO CHÉP
          </button>
        </div>
        <p className="text-[11px] font-bold text-amber-900 dark:text-amber-200 mt-2 leading-snug">
          ⚠️ <strong>Bắt buộc ghi mã này vào ô “Nội dung chuyển khoản”.</strong> Không có mã, người bán
          nhận được tiền nhưng không biết đơn nào là của bạn, và việc cấp mã truy cập sẽ bị chậm.
        </p>
      </div>

      <div className="mt-3">
        <Dong nhan="Ngân hàng" giaTri={nh.ten} />
        <Dong nhan="Số tài khoản" giaTri={nh.so} dam chepDuoc onChep={chep} />
        <Dong nhan="Chủ tài khoản" giaTri={nh.chu} />
        <Dong nhan="Số tiền" giaTri={soTien} dam />
        <Dong nhan="Nội dung" giaTri={maDon} dam chepDuoc onChep={chep} />
      </div>

      {/* Không đặt giá thì nói thẳng ra ở đây nữa: khách đang đứng trước app ngân
          hàng và cần một con số để gõ vào, đây là lúc thiếu giá đau nhất. */}
      {!soTien && (
        <p className="mt-2 text-[11px] font-bold text-rose-700 dark:text-rose-300">
          Chưa có giá niêm yết cho gói này — hãy hỏi người bán số tiền trước khi chuyển khoản.
        </p>
      )}

      {nh.qr && !qrHong && (
        <figure className="mt-4 flex flex-col items-center">
          <img
            src={nh.qr}
            alt={`Mã QR chuyển khoản ${nh.ten}`}
            onError={() => setQrHong(true)}
            className="w-52 h-52 object-contain rounded-xl border-3 border-slate-900 bg-white p-2"
          />
          {/* Nói rõ giới hạn của QR TĨNH thay vì để khách tưởng quét xong là xong.
              Đây đúng chỗ khách hay bỏ trống nội dung rồi mất dấu khoản tiền. */}
          <figcaption className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2 text-center max-w-xs leading-snug">
            Quét mã để điền sẵn số tài khoản. <strong>Số tiền và nội dung vẫn phải tự gõ</strong> — nhớ
            gõ mã đơn <span className="font-mono font-black">{maDon}</span> vào phần nội dung.
          </figcaption>
        </figure>
      )}

      {nh.qr && qrHong && (
        <p className="mt-3 text-[11px] font-bold text-rose-700 dark:text-rose-300">
          Không tải được ảnh mã QR. Bạn vẫn chuyển khoản bình thường bằng số tài khoản ở trên,
          nhớ ghi mã đơn <span className="font-mono font-black">{maDon}</span> vào phần nội dung.
        </p>
      )}

      {bao && <p role="status" className="mt-3 text-xs font-bold text-slate-600 dark:text-slate-300">{bao}</p>}
    </div>
  );
}

/**
 * Phần VẼ THUẦN cho trạng thái cấp mã tự động — cùng triết lý tách vẽ/hỏi như
 * `KhoiChuyenKhoan` phía trên: dữ liệu có sẵn thì vẽ ngay, không cần giả lập
 * mạng để kiểm.
 *
 * @param {'cho'|'thieu_tien'|'da_thanh_toan'|null} props.trangThai  `null` =
 *        chưa đăng ký được đơn (mạng lỗi lúc đăng ký, hoặc webhook chưa được
 *        cấu hình phía máy chủ) — KHÔNG vẽ gì, để khối chuyển khoản và kênh thủ
 *        công bên dưới tự đủ, đúng luật "cộng thêm, không thay thế" ở đầu file
 *        utils/banHang.js.
 * @param {boolean} props.hetHanCho  đã hỏi quá lâu mà chưa thấy — chỉ đường
 *        sang kênh thủ công thay vì để khách nhìn vòng xoay mãi.
 */
export function KhoiTuDongCapMa({ trangThai, maTruyCap, hetHanCho = false, onDung }) {
  const [bao, setBao] = useState('');
  const chep = async (chu) => setBao((await saoChepLoiNhan(chu)).chu);

  if (!trangThai) return null;

  if (trangThai === 'da_thanh_toan') {
    return (
      <div className="mt-4 rounded-2xl border-3 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 size={16} /> Đã nhận được chuyển khoản — mã đã cấp tự động!
        </p>
        <div className="flex items-center justify-between gap-3 mt-2">
          <span className="text-xl font-black font-mono tracking-wider">{maTruyCap}</span>
          <button
            type="button"
            onClick={() => chep(maTruyCap)}
            className="shrink-0 px-3 py-2 rounded-xl bg-slate-900 text-white border-2 border-slate-900 font-black text-xs flex items-center gap-1.5"
          >
            <Copy size={13} /> SAO CHÉP
          </button>
        </div>
        {onDung && (
          <button
            type="button"
            onClick={() => onDung(maTruyCap)}
            className="w-full mt-3 px-3 py-2.5 rounded-xl bg-emerald-600 text-white border-2 border-emerald-800 font-black text-xs"
          >
            DÙNG MÃ NÀY NGAY →
          </button>
        )}
        {bao && <p role="status" className="mt-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-200">{bao}</p>}
      </div>
    );
  }

  if (trangThai === 'thieu_tien') {
    return (
      <p className="mt-3 text-xs font-bold text-amber-700 dark:text-amber-300 flex items-start gap-2">
        <AlertTriangle size={15} className="shrink-0 mt-0.5" />
        Máy chủ đã nhận một khoản chuyển khoản mang đúng mã đơn này, nhưng CHƯA ĐỦ so với giá gói.
        Hãy chuyển thêm phần còn thiếu (ghi cùng mã đơn), hoặc liên hệ người bán qua kênh bên dưới.
      </p>
    );
  }

  // trangThai === 'cho'
  return (
    <p role="status" className="mt-3 text-xs font-bold text-slate-500 dark:text-slate-400 flex items-start gap-2">
      <Loader2 size={14} className="animate-spin shrink-0 mt-0.5" />
      {hetHanCho
        ? 'Chưa tự động thấy chuyển khoản sau một lúc chờ — ngân hàng có thể xử lý chậm. Bạn vẫn có thể gửi mã đơn qua kênh bên dưới để được cấp mã tay.'
        : 'Đang tự động đối chiếu chuyển khoản của bạn… thường xong trong 1–2 phút sau khi chuyển. Không bắt buộc chờ — bạn vẫn gửi được mã đơn qua kênh bên dưới để nhận mã tay.'}
    </p>
  );
}

/**
 * Phần LO VIỆC HỎI: gắn vào màn hình là đi xin máy chủ thông tin chuyển khoản,
 * ĐĂNG KÝ đơn hàng, và hỏi lặp lại trong lúc chờ webhook báo có tiền.
 *
 * Ba trạng thái của khối ngân hàng, và **không trạng thái nào được vẽ một
 * khung rỗng**: đang hỏi thì nói đang hỏi, hỏng thì nói hỏng kèm đường đi
 * tiếp, xong thì vẽ đủ. Một ô trống ở đúng bước trả tiền là thứ khách đọc
 * thành "trang này hỏng rồi".
 *
 * @param {string} props.goiMa       mã máy của gói (vd 'thang1') — để đăng ký
 *                                    đơn đúng gói. Không truyền thì bỏ qua cả
 *                                    khối cấp mã tự động, chỉ vẽ khối ngân hàng
 *                                    (giữ được cách gọi cũ nếu chỗ nào chưa cần).
 * @param {(maTruyCap: string) => void} [props.onMaTuDong]  gọi khi khách bấm
 *                                    "DÙNG MÃ NÀY NGAY" — màn cha điền mã vào ô
 *                                    kích hoạt và đóng bảng giá.
 */
export default function ChuyenKhoan({ maDon, soTien, goiMa, onMaTuDong }) {
  const [nh, setNh] = useState(null);
  const [loi, setLoi] = useState(DANG_LAY_NGAN_HANG);
  const [donHang, setDonHang] = useState(null); // { token, trangThai, maTruyCap }
  const [hetHanCho, setHetHanCho] = useState(false);

  useEffect(() => {
    // `huy` chặn việc đặt trạng thái sau khi khối đã bị gỡ (khách đóng bảng giá
    // giữa chừng) — React cảnh báo, và tệ hơn là nó ghi đè lên trạng thái của
    // lần mở sau.
    let huy = false;
    setLoi(DANG_LAY_NGAN_HANG);
    layThongTinNganHang(maDon).then((kq) => {
      if (huy) return;
      if (kq.ok) { setNh(kq.nganHang); setLoi(''); } else { setNh(null); setLoi(kq.chu); }
    });
    return () => { huy = true; };
  }, [maDon]);

  // Đăng ký đơn NGAY khi có mã đơn + gói — độc lập với việc tải thông tin ngân
  // hàng ở trên, nên không đợi nó xong. Đăng ký hỏng thì `donHang` cứ ở lại
  // `null`: `KhoiTuDongCapMa` không vẽ gì, khối ngân hàng + kênh thủ công bên
  // dưới tự đủ để mua — đây là lớp CỘNG THÊM, không phải điều kiện bắt buộc.
  useEffect(() => {
    if (!maDon || !goiMa) return undefined;
    let huy = false;
    setHetHanCho(false);
    dangKyDonHang(maDon, goiMa).then((kq) => {
      if (huy || !kq.ok) return;
      setDonHang({ token: kq.token, trangThai: kq.trangThai, maTruyCap: kq.maTruyCap });
    });
    return () => { huy = true; };
  }, [maDon, goiMa]);

  // Hỏi lặp lại trong lúc chờ. DỪNG hẳn khi đã thanh toán — không hỏi thêm gì
  // nữa. Tự dừng sau khoảng 15 phút (150 lượt × 6 giây) để không hỏi vô thời
  // hạn nếu khách bỏ tab mở đó cả buổi; 15 phút đủ rộng so với "thường xong
  // trong 1–2 phút" đã nói ở trên.
  useEffect(() => {
    if (!donHang?.token || donHang.trangThai === 'da_thanh_toan') return undefined;
    let huy = false;
    let laiLuot = 0;
    const HOI_TOI_DA = 150;
    const nhip = setInterval(() => {
      laiLuot += 1;
      if (laiLuot > HOI_TOI_DA) { clearInterval(nhip); if (!huy) setHetHanCho(true); return; }
      trangThaiDonHang(maDon, donHang.token).then((kq) => {
        if (huy || !kq.ok) return;
        setDonHang((cu) => (cu ? { ...cu, trangThai: kq.trangThai, maTruyCap: kq.maTruyCap ?? cu.maTruyCap } : cu));
      });
    }, 6000);
    return () => { huy = true; clearInterval(nhip); };
  }, [maDon, donHang?.token, donHang?.trangThai]);

  return (
    <>
      <KhoiChuyenKhoan maDon={maDon} soTien={soTien} nh={nh} loi={loi} />
      <KhoiTuDongCapMa trangThai={donHang?.trangThai} maTruyCap={donHang?.maTruyCap} hetHanCho={hetHanCho} onDung={onMaTuDong} />
    </>
  );
}
