# BÁO CÁO GIẤY PHÉP NGUỒN ÂM THANH (Đợt 3, việc 2.1)

> Lập 2026-08-15. Đo bằng máy, không dựa vào trí nhớ.
> **Chưa tải một file âm thanh nào vào kho.** Đây là bảng để duyệt.

## KẾT LUẬN NGẮN

Bunny English **có thu phí** (màn hình chọn gói trong `AccessGate`). Điều đó loại bỏ mọi giấy phép **NC (phi thương mại)** — kể cả khi kho đó cho tải miễn phí.

Hệ quả đo được: **kho Tatoeba, nguồn hay được giới thiệu nhất là "audio miễn phí", chỉ dùng được 3,1%.**

## 1. TATOEBA — đo trên toàn bộ bản kê 1.239.654 bản thu

Nguồn số: `https://downloads.tatoeba.org/exports/sentences_with_audio.csv`, tải và đếm ngày 2026-08-15.

| Giấy phép | Số bản thu | Tỉ lệ | Dùng được? | Vì sao |
|---|---:|---:|---|---|
| CC BY-NC-ND 3.0 | 949.820 | 76,6% | ❌ | **NC** cấm dùng cho sản phẩm thu phí; **ND** cấm cắt/sửa |
| CC BY-NC 4.0 | 169.890 | 13,7% | ❌ | **NC** |
| *(bỏ trống)* | 74.041 | 6,0% | ❌ | xem trích dẫn bên dưới |
| **CC BY 4.0** | **37.479** | **3,0%** | ✅ | bắt buộc ghi công tác giả |
| CC BY-SA 4.0 | 6.424 | 0,5% | ⚠️ tránh | ShareAlike; bỏ đi chỉ mất 0,5% |
| `\N` | 1.368 | 0,1% | ❌ | giá trị rỗng của bản xuất |
| **CC0 1.0** | **632** | **0,1%** | ✅ | không ràng buộc |
| | **38.111 dùng được** | **3,1%** | | |

**Chỗ dễ sai nhất — "bỏ trống" không có nghĩa là tự do.** Chính trang tải của Tatoeba viết:

> *"If the license field is empty, you may not reuse the audio outside the Tatoeba project."*

Và API công khai của Tatoeba trả về `license: null` cho **mọi** bản thu tôi hỏi thử — kể cả những bản mà bản kê ghi rõ là `CC BY-NC-ND 3.0`. **Ai chỉ đọc API sẽ tưởng không có ràng buộc nào.** Nguồn đúng là bản kê, không phải API.

**Ba phần tư kho là của một người đọc duy nhất (CK), toàn bộ ở CC BY-NC-ND 3.0.** Đây là lý do con số tụt từ "1,2 triệu câu có audio" xuống 38.111.

## 2. LIBRIVOX — mạnh nhất, không ràng buộc gì

Trang `https://librivox.org/pages/public-domain/` viết nguyên văn:

> *"LibriVox recordings are in the public domain, which means people can do anything they like with them… they can: sell them…, broadcast them, put them in commercials, …, chop them up, remix them… there is no need to credit LibriVox, although of course we much prefer if you do credit us."*

**Được bán, được cắt ghép, không bắt buộc ghi công.** Đây là vị thế pháp lý tốt nhất trong cả bốn nguồn. Vẫn nên ghi công vì họ mong muốn thế.

*Vướng kỹ thuật, không phải pháp lý:* file LibriVox là nguyên chương 10–60 phút; máy này **không có `ffmpeg`** nên chưa cắt được thành đoạn 60–150 giây (việc 2.2).

## 3. VOA — dùng được nhưng phải xét TỪNG BÀI

Trang điều khoản `https://learningenglish.voanews.com/p/6021.html` viết:

> *"All text, audio and video material **produced exclusively by the Voice of America** is in the public domain. Credit for any use of VOA material should be given to voanews.com…"*
>
> *"**However**, voanews.com content may also contain text, video, audio… that is licensed for use in VOA programming only. This material is **not** in the public domain and may not be copied, redistributed, sold, or published…"*

Và riêng Associated Press bị loại trừ tường minh.

Nghĩa là **không có một câu "VOA là public domain" áp dụng cho mọi bài.** Một bản tin có lồng tiếng động của hãng thông tấn là một bài không dùng được, và không có cách nào biết điều đó từ dữ liệu tự động. Nếu dùng VOA thì phải ưu tiên các loạt bài do chính VOA dựng trong phòng thu (Let's Learn English, Everyday Grammar, News Words) chứ không phải bản tin thời sự — và ghi công.

## 4. COMMON VOICE — chưa xác minh được, chưa dùng ở đợt này

Trang dữ liệu của Common Voice dựng bằng JavaScript nên không đọc được câu khẳng định giấy phép bằng công cụ máy. Bản tải cũng là gói vài GB cần đồng ý điều khoản trước khi tải. **Chưa đủ căn cứ để xếp vào nhóm nào**, nên chưa dùng — sẽ xác minh lại khi tới việc 2.2.

## 5. ĐÃ DỰNG GÌ ĐỂ SAI LẦM NÀY KHÔNG LẶP LẠI

`src/utils/audioLicense.js` + `tests/audio_license.test.js`:

- **Danh sách cho phép có đúng ba mục**: `CC0 1.0`, `CC BY 4.0`, `Public Domain`. Thêm mục thứ tư là một quyết định pháp lý, nên nó phải sửa ở một chỗ duy nhất và làm test đỏ.
- **Chặn theo mẫu, không chỉ theo danh sách**: mọi chuỗi chứa `NC` hoặc `ND` đều bị chặn kể cả khi chưa từng gặp.
- **Bỏ trống = đỏ.** Không có nhánh "chưa rõ thì cho qua".
- **Hồ sơ bắt buộc 8 trường**, trong đó có `licenseStatementUrl` và `licenseCheckedAt` — địa chỉ và ngày của chính câu khẳng định giấy phép, để phiên sau kiểm lại được mà không phải tin lời phiên này.
- **CC BY thiếu tên tác giả là đỏ**: không ghi công được thì đang vi phạm.
- **Đối chiếu hai chiều** giữa `public/audio/` và manifest: có file mà không có bản ghi là đỏ, có bản ghi mà không có file cũng đỏ.

## 6. ĐIỀU MÁY KHÔNG KIỂM ĐƯỢC — nói trước

Bộ kiểm tự động xác minh được: giấy phép, việc ghép cặp câu ↔ file (Tatoeba gắn bản thu vào đúng số hiệu câu trong cơ sở dữ liệu của họ, và thẻ ID3 của file có cả câu lẫn số hiệu câu), và file đúng là MP3 thật.

**Nó không xác minh được: chất lượng thu, tạp âm, accent, và người đọc có dễ nghe hay không.** Chưa ai nghe những file này. Muốn chắc thì phải có người nghe thử — tôi không nghe được.

## 7. VIỆC 2.2 (BÀI NGHE THEO ĐOẠN) VƯỚNG Ở ĐÂU — đo ngày 2026-08-15

Trở ngại **không phải** là thiếu `ffmpeg` để cắt file. Trở ngại là **bản chép lời**: một bài nghe theo đoạn cần văn bản khớp với đúng đoạn đó, nếu không thì không viết được câu hỏi hiểu ý, không hiện lại được sau khi nghe, và không kiểm được bằng test.

| Nguồn | Có đoạn ngắn sẵn? | Có bản chép lời khớp? | Kết luận |
|---|---|---|---|
| LibriVox | ✅ đếm được **119 mục dài 60–150 giây** trong 40 quyển đầu (trường `playtime` của API, không cần cắt) | ❌ chỉ có liên kết tới cả quyển trên Gutenberg | Ngữ vực cũng sai: tiểu thuyết thế kỷ 19 |
| VOA Learning English | ❌ bài đã thử dài ~13 phút | ✅ **bản chép lời và MP3 nằm trên cùng một trang** (1.592 từ + 1 file) | Đúng thứ cần, nhưng phải cắt và phải xét giấy phép từng bài |

Ba hướng, chưa chọn: (a) cài `ffmpeg-static` làm dev dependency rồi cắt bài VOA; (b) chỉ lấy loạt bài VOA vốn đã ngắn (News Words ~1 phút); (c) ghi mốc bắt đầu/kết thúc trong manifest rồi cho trình phát tua — không đụng vào file gốc, nhưng phải tải cả file dài về kho.

## 8. XIN Ý KIẾN

**Câu hỏi 1 — có nới sang CC BY-NC không?** Nếu ứng dụng miễn phí hoàn toàn thì kho dùng được nhảy từ 38.111 lên 1.157.890 (gấp 30 lần), và giọng CK là giọng Mỹ chuẩn, thu phòng, chất lượng đồng đều. Nhưng còn màn hình bán gói thì không được. **Đây là quyết định của bạn, không phải của tôi** — tôi đang mặc định chọn phương án an toàn.

**Câu hỏi 2 — duyệt 40 câu mẫu?** Bảng ứng viên đã lọc sẵn (tiếng Anh, 4–12 từ, đã bỏ câu dính chủ đề nhạy cảm) nằm ở mục dưới. Duyệt xong tôi mới tải.
