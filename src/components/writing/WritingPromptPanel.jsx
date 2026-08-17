import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, PenLine, Repeat, ScrollText, Sparkles, X, XCircle } from 'lucide-react';
import { writingPrompts, KIEU_DE } from '../../data/writingPrompts';
import { kiemTraDeViet, scoreWriting, scoreWritingWithAI } from '../../utils/writingScorer';
import { luuBaiLam, banMoiNhat } from '../../utils/selfReportLog';
import { deSinh, deTuChang, deChoChang, GHI_CHU_CHECKLIST_CHUNG } from '../../utils/writingBank';
import { hasGeminiKey } from '../../utils/aiKey';

// LUYỆN VIẾT — ĐƯỜNG KHÔNG CẦN KEY (việc 3.4).
//
// Chủ dự án đã chốt: app không gắn key của mình, khách tự nhập key Gemini. Nghĩa
// là phải giả định NHIỀU NGƯỜI KHÔNG CÓ KEY. Một mục luyện viết chỉ chạy khi có
// AI thì với họ là một nút bấm vào không có gì.
//
// Nên đường mặc định ở đây hoàn toàn không cần mạng, và đi theo đúng thứ tự này:
//   1. Viết đã — chưa cho xem bài mẫu.
//   2. Máy đối chiếu những gì NÓ KIỂM ĐƯỢC: số từ, từ/cụm bắt buộc. Chỉ thế.
//   3. Mở bài mẫu để người học TỰ đối chiếu.
//   4. Người học tự soi bài mình theo checklist — và phần này được ghi rõ là
//      TỰ CHẤM, không phải điểm đo được.
//
// Thứ tự đó quan trọng: đọc bài mẫu trước khi viết thì chỉ còn là chép lại.
// `chang`: mở thẳng đề của MỘT chặng lộ trình. Chặng đó không có đề thì phải
// BÁO RA, không được lặng lẽ rơi về danh sách — rơi về danh sách thì người học
// bấm "VIẾT" ở chặng của mình mà lại thấy đề của chặng khác.
export default function WritingPromptPanel({ onClose, chang = null }) {
  const [deId, setDeId] = useState(null);
  const [boQuaChang, setBoQuaChang] = useState(false);
  const deChang = chang && !boQuaChang ? deChoChang(chang) : null;
  const de = deId
    ? (writingPrompts.find((p) => p.id === deId) || deTuChang(deSinh.find((t) => t.id === deId)))
    : deChang;

  if (!de && chang && !boQuaChang) {
    return <Khung onClose={onClose} tieuDe={chang.title || 'Chặng này'} phu="Luyện viết">
      <div className="mt-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-4 bg-slate-50 dark:bg-slate-800">
        <p className="text-sm font-black text-slate-500 flex items-center gap-1.5"><AlertTriangle size={15} /> Chặng này chưa có đề viết</p>
        <p className="text-xs font-bold text-slate-500 mt-1.5 leading-relaxed">
          Đề viết theo chặng có từ <b>A2 trở lên</b>. Một vài chặng dạy hậu tố hoặc quy tắc cấu tạo từ cũng không đặt được đề dùng-từ, nên cố ý để trống thay vì gán bừa đề của chặng khác.
        </p>
      </div>
      <button onClick={() => setBoQuaChang(true)} className="mt-4 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black cursor-pointer">Xem toàn bộ đề viết</button>
    </Khung>;
  }

  if (!de) return <DanhSach onChon={setDeId} onClose={onClose} />;
  return <LamBai key={de.id} de={de} onBack={() => { setDeId(null); setBoQuaChang(true); }} onClose={onClose} />;
}

// HAI KHO ĐỀ, HAI LỜI HỨA KHÁC NHAU — nên tách bằng hai tab chứ không trộn một
// danh sách. Trộn vào thì người học bấm trúng một đề không có bài mẫu mà không
// biết trước, và sẽ tưởng app hỏng.
function DanhSach({ onChon, onClose }) {
  const [kho, setKho] = useState('tay');
  const [kieu, setKieu] = useState(null);
  const laTay = kho === 'tay';
  const nguon = laTay ? writingPrompts : deSinh;
  const ds = (kieu ? nguon.filter((p) => p.kieu === kieu) : nguon).slice(0, laTay ? 999 : 60);
  return <Khung onClose={onClose} tieuDe="Luyện viết">
    <div className="flex gap-2 mt-3 mb-3">
      {[['tay', `Có bài mẫu (${writingPrompts.length})`], ['chang', `Theo chặng (${deSinh.length})`]].map(([k, nhan]) => <button
        key={k} onClick={() => { setKho(k); setKieu(null); }}
        className={`flex-1 px-3 py-2 rounded-xl text-xs font-black border-3 transition-all cursor-pointer ${
          kho === k ? 'border-violet-500 bg-violet-500 text-white' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'
        }`}
      >{nhan}</button>)}
    </div>
    <p className="text-sm font-bold text-slate-500 mb-3">
      {laTay
        ? 'Viết xong sẽ có bài mẫu để đối chiếu và một bảng tiêu chí để bạn tự soi bài mình.'
        : 'Mỗi chặng từ A2 trở lên có một đề gắn với từ vựng của chính chặng đó. Những đề này KHÔNG có bài mẫu — bài mẫu phải người viết, không sinh bằng máy được.'}
    </p>
    {/* Nói trước, không để người học tưởng bài sẽ được chấm. */}
    <p className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3 mb-4 flex gap-2">
      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
      <span>Phần này <b>không chấm ngữ pháp</b> và không cho điểm. Máy chỉ kiểm được số từ và các từ mục tiêu; phần còn lại bạn tự đối chiếu.</span>
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {[null, ...Object.keys(KIEU_DE)].map((k) => <button
        key={k || 'tat-ca'}
        onClick={() => setKieu(k)}
        className={`px-3 py-1.5 rounded-xl text-xs font-black border-3 transition-all cursor-pointer ${
          kieu === k ? 'border-violet-500 bg-violet-500 text-white' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'
        }`}
      >{k ? KIEU_DE[k].label : `Tất cả (${nguon.length})`}</button>)}
    </div>
    <div className="grid gap-3">
      {ds.map((p) => <button key={p.id} onClick={() => onChon(p.id)}
        className="text-left p-4 rounded-2xl border-3 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 hover:border-violet-500 transition-all cursor-pointer">
        <p className="text-[10px] font-black uppercase tracking-wide text-violet-700 dark:text-violet-400">
          {KIEU_DE[p.kieu].label} · {p.bacToiThieu || p.cefr}
        </p>
        <p className="font-black mt-0.5">{p.title}</p>
        <p className="text-xs font-bold text-slate-500 mt-1">
          {laTay ? `${p.yeuCau.soTuToiThieu}–${p.yeuCau.soTuToiDa} từ` : `${p.soTuToiThieu}–${p.soTuToiDa} từ · ${p.tuMucTieu.length ? `${p.soTuPhaiDung}/${p.tuMucTieu.length} từ mục tiêu` : 'chặng ngữ pháp'}`}
        </p>
      </button>)}
    </div>
    {!laTay && ds.length < nguon.length && <p className="mt-4 text-xs font-bold text-slate-400 text-center">
      Đang hiện {ds.length} đề đầu trong {nguon.length}. Mỗi đề gắn với một chặng — bấm nút <b>VIẾT</b> ngay trên thẻ chặng đó trong lộ trình sẽ mở thẳng đúng đề của nó.
    </p>}
  </Khung>;
}

function LamBai({ de, onBack, onClose }) {
  const [text, setText] = useState('');
  const [daNop, setDaNop] = useState(false);
  // (5.4) VÒNG VIẾT – SỬA – VIẾT LẠI. `banTruoc` là bản mới nhất đã lưu của đề
  // này; `nhanXetCu` là nhận xét đóng băng của bản trước, giữ trên màn hình
  // trong lúc viết bản mới — sửa bài mà không nhìn thấy nhận xét thì gọi là
  // viết lại từ trí nhớ, không phải sửa theo nhận xét.
  const [banTruoc, setBanTruoc] = useState(() => banMoiNhat('writing', de.id));
  const [nhanXetCu, setNhanXetCu] = useState(null);
  const [moBaiMau, setMoBaiMau] = useState(false);
  const [tick, setTick] = useState(() => de.checklist.map(() => false));
  const [daLuu, setDaLuu] = useState(false);
  const [aiText, setAiText] = useState('');
  const [aiLoi, setAiLoi] = useState('');
  const [aiDangChay, setAiDangChay] = useState(false);
  const coKey = hasGeminiKey();

  // AI là phần THÊM. Nó KHÔNG ghi vào ngân hàng lỗi: scoreWriting ở trên đã ghi
  // lỗi chính tả rồi, ghi thêm lần nữa là một lỗi bị đếm hai lần trên thang ôn
  // 3/7/14 ngày, làm thẻ ôn quay lại dày gấp đôi thực tế.
  const xinAi = async () => {
    setAiDangChay(true); setAiLoi(''); setAiText('');
    try {
      setAiText(await scoreWritingWithAI(text, { topicTitle: de.title }));
    } catch (e) {
      setAiLoi(e?.message || 'không rõ lý do');
    } finally {
      setAiDangChay(false);
    }
  };

  // Đổi đề thì xoá sạch, kể cả khi component được dùng lại. (Đã dính một lần ở
  // mục chép chính tả: hiệu ứng chỉ phụ thuộc chỉ số nên kết quả cũ còn lại
  // trên màn hình với một câu khác.)
  useEffect(() => { setText(''); setDaNop(false); setMoBaiMau(false); setTick(de.checklist.map(() => false)); setDaLuu(false); setBanTruoc(banMoiNhat('writing', de.id)); setNhanXetCu(null); setAiText(''); setAiLoi(''); }, [de.id, de.checklist]);

  const kq = daNop ? kiemTraDeViet(text, de) : null;
  const beMat = daNop ? scoreWriting(text) : null;

  const luu = () => {
    const ban = luuBaiLam({ kyNang: 'writing', promptId: de.id, text, tuDanhGia: tick, dungBaiMau: moBaiMau });
    if (ban) setBanTruoc(ban);
    setDaLuu(true);
  };

  // (5.4) Mở vòng viết lại: đóng băng nhận xét hiện có, đổ bài cũ vào ô soạn,
  // mở khoá textarea. KHÔNG xoá gì khỏi sổ — bản mới sẽ là banSo + 1.
  const vietLai = () => {
    setNhanXetCu({ kq, beMat, aiText, banSo: banTruoc?.banSo || 1 });
    setText(banTruoc ? banTruoc.text : text);
    setDaNop(false);
    setDaLuu(false);
    setMoBaiMau(false);
    setTick(de.checklist.map(() => false));
    setAiText('');
    setAiLoi('');
  };

  return <Khung onClose={onClose} onBack={onBack} tieuDe={de.title} phu={`${KIEU_DE[de.kieu].label} · ${de.bacToiThieu}`}>
    <p className="mt-3 text-sm font-bold leading-relaxed">{de.deBai}</p>
    <p className="mt-1.5 text-xs font-bold text-slate-500">💡 {de.goiY}</p>
    <p className="mt-1.5 text-xs font-bold text-slate-500">{de.yeuCau.moTaTuBatBuoc}</p>

    {/* (5.4) Người quay lại đề đã làm: mời viết bản tiếp theo, không âm thầm coi như mới. */}
    {!daNop && !nhanXetCu && banTruoc && <div className="mt-3 rounded-2xl border-2 border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30 p-3">
      <p className="text-xs font-bold text-violet-800 dark:text-violet-300">
        Bạn đã lưu <b>bản {banTruoc.banSo}</b> cho đề này ({banTruoc.soTu} từ). Viết lại sau khi nhận nhận xét là cách lên trình viết nhanh nhất.
      </p>
      <button onClick={() => setText(banTruoc.text)} className="mt-2 px-3 py-1.5 rounded-xl border-2 border-violet-500 text-violet-800 dark:text-violet-300 font-black text-xs inline-flex items-center gap-1.5 cursor-pointer">
        <Repeat size={13} /> Đổ bản {banTruoc.banSo} vào ô soạn để sửa tiếp
      </button>
    </div>}

    {/* (5.4) Nhận xét ĐÓNG BĂNG của bản trước — nằm trên ô soạn trong lúc viết
        bản mới, để sửa theo nhận xét chứ không phải theo trí nhớ. */}
    {!daNop && nhanXetCu && <div className="mt-3 rounded-2xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 p-3">
      <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-1.5">Nhận xét của bản {nhanXetCu.banSo} — sửa theo những dòng này</p>
      {nhanXetCu.kq && <ul className="space-y-0.5">
        {!nhanXetCu.kq.doDai.dat && <li className="text-xs font-bold text-slate-600 dark:text-slate-300">• Độ dài: {nhanXetCu.kq.doDai.thieu ? `thiếu ${nhanXetCu.kq.doDai.thieu} từ` : `thừa ${nhanXetCu.kq.doDai.thua} từ`}</li>}
        {nhanXetCu.kq.tuBatBuoc.canCo.length > 0 && !nhanXetCu.kq.tuBatBuoc.dat && <li className="text-xs font-bold text-slate-600 dark:text-slate-300">• Còn thiếu cụm bắt buộc: {nhanXetCu.kq.tuBatBuoc.conThieu.join(', ')}</li>}
        {nhanXetCu.kq.tuTuChon && !nhanXetCu.kq.tuTuChon.dat && <li className="text-xs font-bold text-slate-600 dark:text-slate-300">• Từ mục tiêu: mới dùng {nhanXetCu.kq.tuTuChon.daDung.length}/{nhanXetCu.kq.tuTuChon.can}</li>}
        {(nhanXetCu.beMat?.tips || []).map((t, i) => <li key={i} className="text-xs font-bold text-slate-600 dark:text-slate-300">• {t}</li>)}
      </ul>}
      {nhanXetCu.aiText && <details className="mt-1.5">
        <summary className="text-xs font-black text-slate-500 cursor-pointer">Nhận xét AI của bản trước</summary>
        <div className="mt-1 whitespace-pre-line text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">{nhanXetCu.aiText}</div>
      </details>}
    </div>}

    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      disabled={daNop}
      rows={de.kieu === 'bai' ? 12 : 6}
      placeholder="Viết bằng tiếng Anh vào đây…"
      className="mt-4 w-full border-3 border-slate-800 dark:border-slate-600 rounded-2xl p-4 font-medium bg-slate-50 dark:bg-slate-800 outline-none resize-y disabled:opacity-70"
    />
    <p className="text-xs font-bold text-slate-500 mt-1">
      {text.trim() ? text.trim().split(/\s+/).length : 0} / {de.yeuCau.soTuToiThieu}–{de.yeuCau.soTuToiDa} từ
    </p>

    {!daNop && <button
      onClick={() => setDaNop(true)}
      disabled={!text.trim()}
      className="mt-4 px-5 py-3 rounded-xl bg-violet-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
    >Nộp bài <ArrowRight size={17} /></button>}

    {daNop && <>
      {/* BƯỚC 2 — chỉ những gì máy thật sự kiểm được. */}
      <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Máy đối chiếu được</p>
        <Dong dat={kq.doDai.dat}
          text={kq.doDai.dat
            ? `Độ dài đạt: ${kq.doDai.soTu} từ.`
            : kq.doDai.thieu
              ? `Còn thiếu ${kq.doDai.thieu} từ (đang ${kq.doDai.soTu}, cần ít nhất ${kq.doDai.min}).`
              : `Dài hơn ${kq.doDai.thua} từ so với mức tối đa ${kq.doDai.max}.`} />
        {kq.tuBatBuoc.canCo.length > 0 && <Dong dat={kq.tuBatBuoc.dat}
          text={kq.tuBatBuoc.dat
            ? `Đã dùng đủ cụm bắt buộc: ${kq.tuBatBuoc.daDung.join(', ')}.`
            : `Còn thiếu: ${kq.tuBatBuoc.conThieu.join(', ')}.`} />}
        {kq.tuTuChon && <Dong dat={kq.tuTuChon.dat}
          text={kq.tuTuChon.dat
            ? `Đã dùng ${kq.tuTuChon.daDung.length}/${kq.tuTuChon.can} từ mục tiêu: ${kq.tuTuChon.daDung.join(', ')}.`
            : `Mới dùng ${kq.tuTuChon.daDung.length}/${kq.tuTuChon.can} từ mục tiêu — còn thiếu ${kq.tuTuChon.con} từ nữa.`} />}
        {beMat.tips.map((t, i) => <Dong key={i} dat={false} text={t} nhe />)}

        {/* Nói thẳng cái mình KHÔNG kiểm được, ngay cạnh cái mình kiểm được. */}
        <p className="mt-3 text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-3">
          Máy <b>không</b> kiểm được: {kq.khongKiemDuoc.join(' · ')}.
          {/* Lý do đi theo DỮ LIỆU, không viết cứng ở đây: cùng một cờ nay dùng
              cho cả chặng ngữ pháp và chặng nghe/đọc, mà hai chỗ đó không kiểm
              được hai thứ khác nhau. Xem lyDoChiDoDoDai trong writingBank.js. */}
          {de.chiKiemDuocDoDai && ` ${de.lyDoChiDoDoDai || ''}`}
        </p>
      </div>

      {/* BƯỚC 3 — bài mẫu, chỉ mở sau khi đã viết.
          Đề theo chặng KHÔNG có bài mẫu. Phải nói ra chỗ này, vì im lặng bỏ
          bước đi thì người học tưởng app hỏng — hoặc tệ hơn, tưởng bài mình
          không đáng được đối chiếu. */}
      {de.coBaiMau === false
        ? <div className="mt-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-4 bg-slate-50 dark:bg-slate-800">
            <p className="text-sm font-black text-slate-500 flex items-center gap-1.5"><AlertTriangle size={15} /> Đề này chưa có bài mẫu</p>
            <p className="text-xs font-bold text-slate-500 mt-1.5 leading-relaxed">
              Đề gắn với chặng được máy đóng khung quanh danh sách từ của chặng đó. Bài mẫu thì <b>phải người viết</b> — máy sinh bài mẫu là bịa nội dung, đúng thứ đã bị xoá khỏi kho. Muốn có bài mẫu để đối chiếu, hãy chọn tab <b>“Có bài mẫu”</b>.
            </p>
          </div>
        : !moBaiMau
          ? <button onClick={() => setMoBaiMau(true)} className="mt-5 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black inline-flex items-center justify-center gap-2 cursor-pointer">
              <ScrollText size={17} /> Xem bài mẫu để đối chiếu
            </button>
          : <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Bài mẫu — một cách viết, không phải cách duy nhất</p>
              <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800 whitespace-pre-line text-sm font-medium leading-relaxed">{de.modelAnswer}</div>
              <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">👉 {de.ghiChuBaiMau}</p>
            </div>}

      {/* NHẬN XÉT BẰNG AI — phần THÊM, không phải phần nền.
          Bằng key Gemini của chính khách. Không có key thì mọi bước trên vẫn
          chạy đủ; nút này chỉ nói rõ nó cần gì chứ không chặn đường ai cả. */}
      <div className="mt-5">
        {coKey
          ? <button onClick={xinAi} disabled={aiDangChay}
              className="w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
              <Sparkles size={17} /> {aiDangChay ? 'Đang xin nhận xét…' : 'Xin nhận xét chi tiết bằng AI (key của bạn)'}
            </button>
          : <p className="text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-3">
              Muốn nhận xét chi tiết về <b>ngữ pháp và ý</b> thì cần key Gemini của bạn (mục Cài đặt). Không có key thì mọi bước ở trên vẫn dùng được đầy đủ.
            </p>}
        {aiLoi && <p className="mt-2 text-xs font-bold text-rose-600">Không lấy được nhận xét: {aiLoi}</p>}
        {aiText && <div className="mt-3">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-1">Nhận xét của AI — hãy đọc bằng con mắt nghi ngờ</p>
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800 whitespace-pre-line text-sm font-medium leading-relaxed">{aiText}</div>
        </div>}
      </div>

      {/* BƯỚC 4 — TỰ đánh giá, và gọi đúng tên nó. */}
      {(moBaiMau || de.coBaiMau === false) && <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-wide text-slate-400 mb-2">Bạn tự soi bài mình</p>
        {de.checklistLaChung && <p className="text-[11px] font-bold text-slate-400 mb-2">{GHI_CHU_CHECKLIST_CHUNG}</p>}
        <div className="space-y-2">
          {de.checklist.map((c, i) => <label key={i} className="flex gap-3 items-start p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 cursor-pointer">
            <input type="checkbox" checked={tick[i]} onChange={() => setTick((t) => t.map((v, j) => (j === i ? !v : v)))} className="mt-1 w-4 h-4 shrink-0" />
            <span className="text-sm font-bold">{c}</span>
          </label>)}
        </div>
        <p className="mt-3 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-3">
          Đây là <b>bạn tự chấm</b>, không phải điểm đo được — nên Báo cáo tiến bộ vẫn ghi kỹ năng Viết là “chưa đo được”. Tự đánh giá vẫn có ích: nó buộc bạn đọc lại bài mình bằng con mắt người chấm.
        </p>
        {!daLuu
          ? <button onClick={luu} className="mt-4 w-full px-5 py-3 rounded-xl bg-yellow-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center justify-center gap-2 cursor-pointer">
              <CheckCircle2 size={17} /> Lưu bài này vào sổ {banTruoc && !nhanXetCu ? `(sẽ là bản ${banTruoc.banSo + 1})` : nhanXetCu ? `(bản ${nhanXetCu.banSo + 1})` : ''}
            </button>
          : <>
              <p className="mt-4 text-center text-sm font-black text-emerald-700 dark:text-emerald-400">
                Đã lưu bản {banTruoc?.banSo || 1} vào sổ bài viết ✓
              </p>
              {/* (5.4) So bản mới với bản liền trước — chỉ những con số ĐO ĐƯỢC. */}
              {nhanXetCu && banTruoc && banTruoc.banSo >= 2 && <p className="mt-1 text-center text-xs font-bold text-slate-500">
                So với bản {nhanXetCu.banSo}: {nhanXetCu.kq ? `${nhanXetCu.kq.doDai.soTu} → ${banTruoc.soTu} từ` : `${banTruoc.soTu} từ`} · tiêu chí tự thấy: {banTruoc.soTieuChiTuThay}/{de.checklist.length}
              </p>}
              {/* (5.4) VÒNG VIẾT LẠI — bước làm nên việc 5.4. */}
              <button onClick={vietLai} className="mt-3 w-full px-5 py-3 rounded-xl bg-violet-300 border-3 border-slate-900 font-black shadow-[3px_3px_0_0_#1e293b] inline-flex items-center justify-center gap-2 cursor-pointer">
                <Repeat size={17} /> Viết bản {(banTruoc?.banSo || 1) + 1} — sửa theo nhận xét ở trên
              </button>
            </>}
        <button onClick={onBack} className="mt-3 w-full px-5 py-3 rounded-xl border-3 border-slate-800 dark:border-slate-600 font-black cursor-pointer">Chọn đề khác</button>
      </div>}
    </>}
  </Khung>;
}

function Dong({ dat, text, nhe }) {
  return <p className={`flex gap-2 items-start text-sm font-bold py-1 ${nhe ? 'text-slate-500' : ''}`}>
    {dat ? <CheckCircle2 size={17} className="shrink-0 mt-0.5 text-emerald-600" /> : <XCircle size={17} className="shrink-0 mt-0.5 text-rose-500" />}
    <span>{text}</span>
  </p>;
}

function Khung({ children, onClose, onBack, tieuDe, phu }) {
  return <div className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="writing-title">
    <section className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2rem] shadow-[9px_9px_0_0_#020617] p-6 md:p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-violet-200 border-3 border-slate-900 flex items-center justify-center shrink-0"><PenLine className="text-violet-800" /></div>
          <div className="min-w-0">
            <p className="text-xs font-black text-violet-700 uppercase tracking-widest truncate">{phu || 'Luyện viết'}</p>
            <h2 id="writing-title" className="text-xl md:text-2xl font-black leading-tight">{tieuDe}</h2>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {onBack && <button onClick={onBack} aria-label="Quay lại" className="h-10 px-3 rounded-xl border-3 border-slate-800 font-black text-xs">← Danh sách</button>}
          <button onClick={onClose} aria-label="Đóng" className="w-10 h-10 rounded-xl border-3 border-slate-800 flex items-center justify-center"><X size={18} /></button>
        </div>
      </header>
      {children}
    </section>
  </div>;
}
