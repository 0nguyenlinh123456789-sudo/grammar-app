import { useCallback, useEffect, useState } from 'react';
import { Download, Trash2, CheckCircle2, Loader2, HardDrive, AlertTriangle, ChevronDown } from 'lucide-react';

// File: src/components/common/TaiOffline.jsx
//
// NÚT TẢI GÓI HỌC VỀ MÁY — THỨ DUY NHẤT LÀM CHO CẢ ĐƯỜNG NGOẠI TUYẾN CÓ THẬT.
//
// ══ VÌ SAO KHÔNG TỰ TẢI ══
// Cả gói là ~17,5 MB. Tự tải sau lưng người dùng trên mạng 4G Việt Nam là hành
// vi thù địch, và với một app BÁN TIỀN thì nó còn tệ hơn: người học trả 99k rồi
// bị đốt thêm dung lượng mà không ai hỏi. Nên mọi thứ ở đây là NGƯỜI HỌC BẤM,
// và dung lượng được nói ra TRƯỚC KHI bấm, tính từ số byte thật trên đĩa
// (`dist/offline-manifest.json`, sinh lúc dựng — xem scripts/tao_manifest_offline.mjs).
//
// ══ BA NHÓM, VÌ MẠNG YẾU KHÔNG PHẢI LÚC NÀO CŨNG TẢI ĐƯỢC HẾT ══
// Vỏ app (~0,8 MB) đủ để MỞ được app khi mất mạng. Bài học (~11 MB) để học được
// trọn vẹn. Bản thu (~5,6 MB) cho phần nghe chép chính tả. Ai mạng yếu tải hai
// nhóm đầu vẫn học được gần hết.
//
// ══ TRONG DEV KHÔNG CÓ GÌ ĐỂ HIỆN, VÀ ĐÓ KHÔNG PHẢI IM LẶNG ══
// `main.jsx` chỉ đăng ký service worker khi `import.meta.env.PROD`. Ở chế độ dev
// đường này không tồn tại chứ không phải đang hỏng, nên panel ẩn hẳn. Mọi nhánh
// HỎNG THẬT ở dưới (không có SW, không đọc được danh sách, tải thiếu tệp) đều
// NÓI RA — không nhánh nào lặng lẽ trả về null.

const MB = (b) => (b / 1024 / 1024).toFixed(1);

export default function TaiOffline() {
  const [danhSach, setDanhSach] = useState(null);
  const [loi, setLoi] = useState('');
  const [chon, setChon] = useState({ voApp: true, baiHoc: true, tiengNoi: false });
  const [trangThai, setTrangThai] = useState('nghi');   // nghi | dangTai | xong | hong
  const [tienDo, setTienDo] = useState({ xong: 0, tong: 0, hong: 0 });
  const [daTai, setDaTai] = useState(0);
  const [ghiBen, setGhiBen] = useState(null);           // navigator.storage.persist()

  // ⚠️ THU GỌN SẴN Ở BỀ NGANG ĐIỆN THOẠI — ĐÂY LÀ MỘT LỖI ĐÃ ĐO ĐƯỢC, KHÔNG PHẢI
  // TRANG TRÍ. Trên máy tính thanh bên luôn hiện nên panel này chắc chắn thấy
  // được; trên điện thoại nó là NGĂN KÉO cao bằng màn hình, và panel `shrink-0`
  // cao 227px ăn thẳng vào phần `flex-1` của danh sách bài học. Đo ở 390×844:
  // danh sách chỉ còn **112px**, tức vài dòng — hai panel công cụ nuốt mất đúng
  // thứ người ta mở ngăn kéo ra để dùng. Xem bước "danh sách bài học vẫn còn đủ
  // chỗ" trong scripts/ra_cai_dat.mjs.
  const [moRong, setMoRong] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return true;
    return window.matchMedia('(min-width: 1024px)').matches;
  });

  const coSw = typeof navigator !== 'undefined' && 'serviceWorker' in navigator;

  const hoiTinhTrang = useCallback(() => {
    if (!coSw || !navigator.serviceWorker.controller) return;
    navigator.serviceWorker.controller.postMessage({ loai: 'HOI_OFFLINE' });
  }, [coSw]);

  useEffect(() => {
    if (!import.meta.env.PROD || !coSw) return undefined;
    let con = true;
    fetch('/offline-manifest.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`máy chủ trả ${r.status}`))))
      .then((m) => { if (con) setDanhSach(m); })
      .catch((e) => { if (con) setLoi(`Không đọc được danh sách tải: ${e.message}`); });

    const nghe = (ev) => {
      const d = ev.data || {};
      if (d.loai === 'TIEN_DO_OFFLINE') {
        setTienDo({ xong: d.xong, tong: d.tong, hong: d.hong });
      } else if (d.loai === 'XONG_OFFLINE') {
        setTienDo({ xong: d.xong, tong: d.tong, hong: d.hong });
        setTrangThai(d.hong > 0 ? 'hong' : 'xong');
        hoiTinhTrang();
      } else if (d.loai === 'LOI_OFFLINE') {
        setLoi(`Tải hỏng: ${d.loi}`);
        setTrangThai('hong');
      } else if (d.loai === 'TINH_TRANG_OFFLINE') {
        setDaTai(d.soTep);
      } else if (d.loai === 'DA_XOA_OFFLINE') {
        setDaTai(0);
        setTrangThai('nghi');
        setTienDo({ xong: 0, tong: 0, hong: 0 });
      }
    };
    navigator.serviceWorker.addEventListener('message', nghe);
    hoiTinhTrang();
    return () => { con = false; navigator.serviceWorker.removeEventListener('message', nghe); };
  }, [coSw, hoiTinhTrang]);

  if (!import.meta.env.PROD) return null;

  if (!coSw) {
    return (
      <p className="px-4 py-3 text-[11px] font-bold text-slate-500 dark:text-slate-400">
        Trình duyệt này không tải được bài về máy để học ngoại tuyến.
      </p>
    );
  }

  const nhomDaChon = danhSach ? Object.keys(danhSach.nhom).filter((k) => chon[k]) : [];
  const soByte = danhSach ? nhomDaChon.reduce((s, k) => s + danhSach.nhom[k].byte, 0) : 0;
  const soTep = danhSach ? nhomDaChon.reduce((s, k) => s + danhSach.nhom[k].soTep, 0) : 0;

  const bamTai = async () => {
    if (!danhSach || !navigator.serviceWorker.controller || soTep === 0) return;
    setLoi('');
    setTrangThai('dangTai');
    setTienDo({ xong: 0, tong: soTep, hong: 0 });

    // ⚠️ XIN GIỮ BỀN TRƯỚC KHI TẢI, VÀ NÓI RA KẾT QUẢ.
    // Không có quyền này thì trình duyệt được phép DỌN kho khi máy hết chỗ —
    // 17,5 MB người học vừa tải bằng 4G biến mất mà không ai báo. Trình duyệt có
    // thể từ chối, nên câu trả lời phải hiện lên chứ không nuốt.
    try {
      if (navigator.storage && navigator.storage.persist) {
        setGhiBen(await navigator.storage.persist());
      }
    } catch { setGhiBen(false); }

    const ds = nhomDaChon.flatMap((k) => danhSach.nhom[k].tep.map((t) => t.d));
    navigator.serviceWorker.controller.postMessage({ loai: 'TAI_OFFLINE', danhSach: ds });
  };

  const bamXoa = () => {
    if (!navigator.serviceWorker.controller) return;
    navigator.serviceWorker.controller.postMessage({ loai: 'XOA_OFFLINE' });
  };

  const phanTram = tienDo.tong ? Math.round((tienDo.xong / tienDo.tong) * 100) : 0;

  return (
    <section aria-label="Tải bài về máy" data-cong-cu="tai-offline" className="px-4 py-3 border-t-[4px] border-slate-800 dark:border-slate-700 shrink-0">
      <button
        type="button"
        onClick={() => setMoRong((v) => !v)}
        aria-expanded={moRong}
        className="w-full flex items-center gap-2 mb-2 text-left"
      >
        <HardDrive size={15} className="text-slate-700 dark:text-slate-300 shrink-0" />
        <p className="flex-1 font-black text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-300">Học khi không có mạng</p>
        {/* Thu gọn mà câm thì người học không biết trong đó có gì. Dòng tóm tắt
            này là thứ duy nhất họ thấy trên điện thoại trước khi mở ra. */}
        {!moRong && (
          <span className="text-[10px] font-black text-slate-400 shrink-0">
            {daTai > 0 ? `đã tải ${daTai} tệp` : (danhSach ? `${MB(danhSach.tongByte)} MB` : '')}
          </span>
        )}
        <ChevronDown size={14} className={`shrink-0 text-slate-400 transition-transform ${moRong ? 'rotate-180' : ''}`} />
      </button>

      {!moRong ? null : (<>

      {loi && (
        <p role="alert" className="flex items-start gap-1.5 text-[11px] font-bold text-rose-600 dark:text-rose-400 mb-2">
          <AlertTriangle size={13} className="shrink-0 mt-0.5" />{loi}
        </p>
      )}

      {!danhSach && !loi && (
        <p className="text-[11px] font-bold text-slate-400">Đang đọc danh sách…</p>
      )}

      {danhSach && (
        <>
          {daTai > 0 && trangThai !== 'dangTai' && (
            <p className="flex items-center gap-1.5 text-[11px] font-black text-emerald-600 dark:text-emerald-400 mb-2">
              <CheckCircle2 size={13} className="shrink-0" />Đã có {daTai} tệp trong máy
            </p>
          )}

          <div className="space-y-1.5 mb-2.5">
            {Object.entries(danhSach.nhom).map(([khoa, n]) => (
              <label key={khoa} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!chon[khoa]}
                  disabled={trangThai === 'dangTai'}
                  onChange={(e) => setChon((c) => ({ ...c, [khoa]: e.target.checked }))}
                  className="w-4 h-4 shrink-0 accent-yellow-400"
                />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">
                  {n.nhan} <span className="text-slate-400 font-black">{MB(n.byte)} MB</span>
                </span>
              </label>
            ))}
          </div>

          {trangThai === 'dangTai' ? (
            <div>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-slate-800 dark:border-slate-600">
                <div className="h-full bg-yellow-400 transition-[width]" style={{ width: `${phanTram}%` }} />
              </div>
              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <Loader2 size={12} className="animate-spin shrink-0" />
                {tienDo.xong}/{tienDo.tong} tệp · {phanTram}%
                {tienDo.hong > 0 ? ` · ${tienDo.hong} hỏng` : ''}
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={bamTai}
              disabled={soTep === 0}
              className="w-full h-10 rounded-xl bg-yellow-300 text-slate-950 border-[3px] border-slate-900 font-black text-[11px] shadow-[3px_3px_0_0_#1e293b] flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:shadow-none"
            >
              <Download size={14} />
              {soTep === 0 ? 'Chọn ít nhất một phần' : `Tải ${MB(soByte)} MB về máy`}
            </button>
          )}

          {trangThai === 'xong' && (
            <p className="mt-2 flex items-center gap-1.5 text-[11px] font-black text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={13} className="shrink-0" />Xong. Giờ học được cả khi không có mạng.
            </p>
          )}
          {trangThai === 'hong' && tienDo.hong > 0 && (
            <p role="alert" className="mt-2 text-[11px] font-bold text-amber-600 dark:text-amber-400">
              Tải thiếu {tienDo.hong} tệp — phần đó vẫn cần mạng. Bấm tải lại khi sóng khoẻ hơn.
            </p>
          )}
          {ghiBen === false && (
            <p className="mt-2 text-[11px] font-bold text-amber-600 dark:text-amber-400">
              Trình duyệt không cho giữ bền: khi máy hết chỗ, phần đã tải có thể bị dọn.
            </p>
          )}

          {daTai > 0 && trangThai !== 'dangTai' && (
            <button
              type="button"
              onClick={bamXoa}
              className="mt-2 w-full h-8 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 font-bold text-[10px] flex items-center justify-center gap-1.5 hover:border-rose-400 hover:text-rose-500"
            >
              <Trash2 size={12} />Xoá khỏi máy
            </button>
          )}
        </>
      )}

      </>)}
    </section>
  );
}
