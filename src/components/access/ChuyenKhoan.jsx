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
import { AlertTriangle, Copy, Landmark } from 'lucide-react';
import { CHUA_CO_CHUYEN_KHOAN, DANG_LAY_NGAN_HANG, layThongTinNganHang, saoChepLoiNhan } from '../../utils/banHang';

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
 * Phần LO VIỆC HỎI: gắn vào màn hình là đi xin máy chủ thông tin chuyển khoản.
 *
 * Ba trạng thái, và **không trạng thái nào được vẽ một khung rỗng**: đang hỏi
 * thì nói đang hỏi, hỏng thì nói hỏng kèm đường đi tiếp, xong thì vẽ đủ. Một ô
 * trống ở đúng bước trả tiền là thứ khách đọc thành "trang này hỏng rồi".
 */
export default function ChuyenKhoan({ maDon, soTien }) {
  const [nh, setNh] = useState(null);
  const [loi, setLoi] = useState(DANG_LAY_NGAN_HANG);

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

  return <KhoiChuyenKhoan maDon={maDon} soTien={soTien} nh={nh} loi={loi} />;
}
