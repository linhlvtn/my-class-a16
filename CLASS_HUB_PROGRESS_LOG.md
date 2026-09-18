# CLASS HUB — NHẬT KÝ TIẾN ĐỘ VÀ BÀN GIAO

**Mục đích:** Đây là nguồn thông tin chính xác để biết dự án đang ở đâu khi bắt đầu ngày làm việc mới hoặc khi AI/agent mới tiếp nhận công việc.

**Tài liệu quy trình:** `CLASS_HUB_IMPLEMENTATION_PROCESS.md`  
**Trạng thái dự án hiện tại:** WAITING_FOR_APPROVAL — Trang chủ phiên bản 3 đã triển khai theo phản hồi ngày 18/09, chờ duyệt. Chưa hoàn tất toàn bộ bước 1.1.  
**Giai đoạn hiện tại:** Giai đoạn 1 — Frontend UI demo với dữ liệu tĩnh.  
**Bước kế tiếp:** Chủ dự án duyệt trang “Vào lớp”, danh sách học sinh và hồ sơ học tập mới theo yêu cầu; tiếp nhận chỉnh sửa. Vẫn ở giai đoạn frontend demo.

### Trang Vào lớp — cập nhật 18/09/2026

- DONE: Chuyển “Ống kính lớp mình” thành gallery mosaic so le với ảnh lớn/nhỏ, caption phủ ảnh, chuyển động lệch nhịp, lời nhắc bấm phóng to và modal xem ảnh lớn. Đã hỗ trợ bố cục hai cột trên mobile.
- DONE: Điều chỉnh hiệu ứng chuông thông báo: giữ rung mạnh khi có tin mới nhưng thu hẹp vòng lan tỏa để không chiếm nhiều không gian.

- DONE: Thêm cụm thao tác cố định: gọi nhanh Cô Vũ Thị Thiết qua `tel:0982296281`, mở Zalo tới số cô, và chuông báo nhận xét mới. Chuông mở thẻ thông báo demo, dẫn tới khu thông báo của cô.
- DONE: Thiết kế icon gọi/Zalo/chuông theo màu chức năng, nhãn gợi ý desktop, và vị trí trên thanh menu đáy ở mobile. Mã nguồn: `src/quick-actions.css`, thành phần trong `src/App.tsx`.

- DONE: Tối ưu mobile <=700px: ẩn menu header, thay thanh đáy cũ bằng 5 mục Trang chủ/Lịch học/Thông báo/Top 10/Vào lớp dùng chung cả trang hồ sơ; trạng thái theo liên kết đang chọn, vùng chạm lớn, safe-area và khoảng đệm chống che nội dung.
- DONE: Thu gọn cover mobile, tăng chữ thông báo/nhận xét/BXH, điều chỉnh thẻ học sinh và trường tìm kiếm/lọc dễ thao tác. Thêm `src/MobileNavigation.tsx`, `src/mobile.css`. Build đã kiểm tra thành công; cần duyệt trực quan trên điện thoại thực tế.

- UI cập nhật: bỏ dòng ghi chú demo trên trang theo yêu cầu; số sao và số lời cô nhắn chuyển thành hai thẻ vàng/lavender với icon lớn, số rõ, bố cục riêng trên mobile. Dữ liệu vẫn là demo như đã ghi trong log.

- DONE: Menu “Lớp chúng mình” tới Top 10; “Vào lớp” mở trang riêng tại `#classroom`, hỗ trợ tải lại trực tiếp và quay về trang chủ.
- DONE: Danh sách toàn bộ 16 học sinh demo hiện có, tìm kiếm tên có/không dấu, ngày sinh, số sao và mở hồ sơ từng bé.
- DONE: Hồ sơ có tiến độ bốn lĩnh vực, ba nhận xét có ngày giờ, hướng dẫn gia đình đồng hành, bộ lọc các tháng năm học 2026–2027 và trạng thái chưa có nhận xét.
- Dữ liệu nhận xét/tiến độ là minh họa, chưa có backend, đăng nhập hay lưu trữ thật. Cần nhập danh sách chính thức khi có dữ liệu. Trước khi dùng nhận xét thật cần triển khai quyền truy cập phụ huynh theo hồ sơ con.
- Mã nguồn mới: `src/Classroom.tsx`, `src/classroom.css`; điều hướng tại `src/App.tsx`.

---

## Quy tắc cập nhật

Sau mỗi hạng mục hoàn tất:

1. Đổi trạng thái trong bảng theo dõi thành `DONE`.
2. Thêm một dòng trong **Lịch sử hoàn thành**: ngày, nội dung, kết quả, file/liên kết liên quan.
3. Nếu cần chủ dự án duyệt trước khi tiếp tục, thêm vào **Chờ xác nhận** và đặt trạng thái dự án là `WAITING_FOR_APPROVAL`.
4. Chỉ đổi **Bước kế tiếp** sau khi điểm xác nhận tương ứng đã được chốt.
5. Không ghi secrets, token, mật khẩu hay dữ liệu cá nhân vào tài liệu này.

### Trạng thái sử dụng

- `NOT_STARTED` — Chưa làm.
- `IN_PROGRESS` — Đang thực hiện.
- `DONE` — Đã xong và đã kiểm tra.
- `WAITING_FOR_APPROVAL` — Đã xong, chờ chủ dự án xác nhận.
- `BLOCKED` — Không thể tiếp tục; phải nêu rõ lý do.

---

## Bảng theo dõi hiện tại

| Giai đoạn | Hạng mục hiện tại | Trạng thái | Kết quả / ghi chú |
|---|---|---|---|
| 1 — UI demo | 1.1 Khởi tạo giao diện nền tảng | WAITING_FOR_APPROVAL | Trang chủ v3 đã làm; toàn bộ bộ giao diện dùng chung và Tailwind chưa hoàn tất. |
| 1 — UI demo | 1.2 Dữ liệu và quyền demo | NOT_STARTED | Chờ hoàn thành 1.1. |
| 1 — UI demo | 1.3 Màn hình phụ huynh/học sinh | NOT_STARTED | Chờ hoàn thành 1.2. |
| 1 — UI demo | 1.4 Màn hình quản trị | NOT_STARTED | Chờ hoàn thành 1.2. |
| 1 — UI demo | 1.5 Hoàn thiện prototype và chốt UI/MVP | NOT_STARTED | Cần chủ dự án duyệt. |
| 2 — Backend | 2.1 Hạ tầng và bảo mật nền tảng | NOT_STARTED | Chỉ bắt đầu sau khi chốt UI/MVP. |
| 2 — Backend | 2.2 Dữ liệu lõi và năm học | NOT_STARTED | Chờ hoàn thành 2.1. |
| 2 — Backend | 2.3 Tính năng MVP | NOT_STARTED | Chờ hoàn thành 2.2. |
| 2 — Backend | 2.4 Tính năng sau MVP | NOT_STARTED | Làm theo phạm vi được duyệt. |
| 2 — Backend | 2.5 An toàn dữ liệu và backup | NOT_STARTED | Hoàn thiện trước deploy. |
| 3 — Deploy | 3.1 Kiểm thử local | NOT_STARTED | Chỉ bắt đầu khi các tính năng được duyệt hoàn tất. |
| 3 — Deploy | 3.2 Chuẩn bị production | NOT_STARTED | Cần duyệt sẵn sàng deploy. |
| 3 — Deploy | 3.3 Deploy và nghiệm thu | NOT_STARTED | Cần duyệt go-live. |

---

## Chờ xác nhận

| Mã | Nội dung cần chốt | Trạng thái | Ngày gửi |
|---|---|---|---|
| APPROVAL-HOME-V3 | Cover theo mẫu, họa tiết nền và bảng Top 10 theo tổng sao | WAITING_FOR_APPROVAL | 2026-09-18 |

Khi cần xác nhận, dùng mẫu sau:

| Mã | Nội dung cần chốt | Tác động nếu chốt | Trạng thái | Ngày gửi |
|---|---|---|---|---|
| APPROVAL-XXX | ... | ... | WAITING_FOR_APPROVAL | YYYY-MM-DD |

---

## Lịch sử hoàn thành

| Ngày | Mã bước | Công việc hoàn thành | Kết quả đã kiểm tra | File/liên kết liên quan |
|---|---|---|---|---|
| 2026-09-17 | 1.1 | Khởi tạo frontend và trang chủ demo cho lớp 2A16 | `npm run build` thành công; đã tạo layout responsive, hình minh họa trường học, animation, lối tắt và tin tức mock data. | `src/App.tsx`, `src/styles.css`, `src/assets/classroom-hero.png` |

Khi có công việc hoàn thành, thêm theo mẫu:

| Ngày | Mã bước | Công việc hoàn thành | Kết quả đã kiểm tra | File/liên kết liên quan |
|---|---|---|---|---|
| YYYY-MM-DD | 1.1 | ... | ... | ... |

---

## Ghi chú bàn giao cho AI/agent tiếp nhận

### Cập nhật 18/09/2026 — Trang chủ phiên bản 3

- DONE: Cover chữ trái/nhân vật 3D phải, nền sóng gradient và thẻ nổi; mobile hình trên/chữ dưới. Thêm họa tiết sách, máy bay, sao, hình học vào nền.
- DONE: Thay tuyên dương bằng Top 10 có podium Top 3, thứ hạng và số sao. Cộng từ `dailyAwards` theo tuần 14–18/09 hoặc tháng 01–18/09; giảm dần theo sao, đồng điểm đồng hạng, cùng điểm sắp theo ID ổn định. Bảng giới hạn 10 dòng.
- Phạm vi thay đổi được người dùng yêu cầu rõ ngày 18/09: có xếp hạng từ sao cô tặng hằng ngày, thay thế hạn chế không xếp hạng của spec ban đầu. Hiện chỉ dữ liệu tĩnh, chưa có màn hình giáo viên tặng sao hoặc API lưu sao.
- Kiểm tra: build đạt; trình duyệt desktop 1440, mobile 390/360px không tràn ngang; tuần có tổng sao 25,23,22…15; tháng thay đổi danh sách và có đồng hạng #4/#7 đúng điểm.
- File mới: `src/data/starAwards.ts`, `src/home-refresh.css`, `src/assets/hero-students-v3.png`. Giữ ảnh v2 cho album/chân dung.
- Imagegen built-in, prompt: two Vietnamese second-graders reading book/tablet, polished 3D clay cartoon, white/navy tartan uniforms, boy shorts/girl pleated skirt, books and plant, transparent background, no text. Ảnh mới đã lưu trong dự án và kiểm tra trực quan.
- Chờ duyệt phiên bản 3; không xem phản hồi sửa UI là duyệt toàn bộ giai đoạn frontend.

### Cập nhật 18/09/2026 — Header menu

- DONE: Đã xóa dải bốn shortcut thẻ ngang ở đầu nội dung.
- DONE: Đã đưa Thời khóa biểu, Lời cô nhắn, Bài tập về nhà và Top 10 vào header. Trên mobile, menu nằm thành hàng cuộn ngang bên dưới thương hiệu; thanh điều hướng dưới vẫn giữ để thao tác một tay.

### Cập nhật 18/09/2026 — Thời khóa biểu và lưu ý đi học

- DONE: Thay lịch mẫu bằng thời khóa biểu 5 ngày, 8 tiết/ngày theo ảnh người dùng cung cấp; chia rõ buổi sáng/buổi chiều.
- DONE: Desktop hiển thị cả tuần; điện thoại chọn ngày T2–T6 để xem tám tiết mà không bị chật.
- DONE: Đã đưa các lưu ý soạn sách, giờ học, CLB, đưa/đón, báo cô nghỉ/họp và đồng phục/giày vào một khối riêng dưới thời khóa biểu.

### Cập nhật 18/09/2026 — Đồng phục, lưu ý nổi bật và nhận diện trường

- DONE: Dùng biểu tượng Trường Tiểu học Xuân Đỉnh do chủ dự án cung cấp thay cho logo cũ trên header.
- DONE: Ẩn phần “Chiếc cặp nhỏ tối nay” khỏi giao diện trang chủ và thanh điều hướng điện thoại.
- DONE: Nâng khối “Lưu ý khi đến lớp” thành bảng nhắc nhở trực quan, có thẻ minh họa lớn; dùng ảnh hoạt động đồng phục thể thao đỏ do chủ dự án cung cấp.
- DONE: Quy ước đồng phục hiển thị rõ: áo trắng Thứ Hai, Thứ Ba; đồng phục thể thao đỏ Thứ Tư, Thứ Sáu; luôn mang dép quai hậu hoặc giày thể thao.
- DONE: Bỏ phần ngày tháng tại các tab Thứ Hai–Thứ Sáu và tăng cỡ chữ lịch học để học sinh dễ đọc hơn.
- Kiểm tra: `npm run build` thành công sau khi cập nhật các tài nguyên ảnh và giao diện. Các thay đổi vẫn là dữ liệu/giao diện tĩnh của giai đoạn UI.

### Cập nhật 18/09/2026 — Bố cục lịch học và nhắc đồng phục

- Điều chỉnh theo bản vẽ mới: hai ảnh áo riêng đặt cạnh nhau ngay dưới lịch học, bên trái khối lưu ý. Bỏ thẻ đồng phục cũ ở cột phải và xóa nội dung đồng phục cũ sai trong JSX.
- Nhãn lớn: áo trắng Thứ 2/Thứ 3; áo đỏ Thứ 4/Thứ 6. Khung vàng nổi bật, hai thẻ xanh/đỏ và lời nhắc giày dép bên dưới; mobile vẫn giữ hai thẻ cạnh nhau.
- Assets mới: `src/assets/uniform-white.png`, `src/assets/uniform-red.png`. Tạo bằng imagegen built-in, hai prompt riêng: một áo trắng tay ngắn viền kẻ navy; một áo polo đỏ cổ và viền tay navy; chính diện, nền trong suốt, không người, không chữ/logo, minh họa 3D cho học sinh tiểu học. Asset v1 không còn được hiển thị ở khối lưu ý.

### Cập nhật 18/09/2026 — Tăng khả năng đọc cho học sinh

- DONE: Tăng cỡ chữ và khoảng đệm của thanh thông tin đầu trang, thương hiệu và menu header.
- DONE: Tăng chữ tiêu đề, tên ngày, số tiết, thời gian, nội dung từng ô và dải Buổi chiều; tăng chiều cao hàng lịch để chữ rõ và thoáng.
- DONE: Tăng chữ lịch học trên điện thoại cùng các thẻ thông tin liên quan.

### Cập nhật 18/09/2026 — Khung giờ buổi sáng

- DONE: Thêm dải “Buổi sáng · 07:45 – 10:55” ngay dưới hàng tiêu đề của thời khóa biểu desktop, tương ứng với dải Buổi chiều.
- DONE: Dùng nền vàng ấm, chữ Baloo lớn và đậm để học sinh nhận biết nhanh hai buổi học.

### Cập nhật 18/09/2026 — Đồng phục thay khối lưu ý

- DONE: Ẩn hoàn toàn khối “Lưu ý khi đến lớp”.
- DONE: Đưa khối “Hôm nay mình mặc gì?” sang cột phải song song với thời khóa biểu desktop; điện thoại vẫn xếp khối này ngay sau lịch học.
- DONE: Menu header đổi thành “Đồng phục hôm nay”, liên kết trực tiếp đến khối đồng phục.

### Cập nhật 18/09/2026 — Thẻ liên hệ giáo viên chủ nhiệm

- DONE: Thêm thẻ liên hệ nổi bật dưới phần đồng phục, trong cột song song với thời khóa biểu.
- DONE: Hiển thị “Cô Vũ Thị Thiết” và số gọi nhanh `0982 296 281`, lấy từ hình người dùng cung cấp.
- DONE: Thêm minh họa 3D cô giáo hư cấu thân thiện ở cạnh phải thẻ; số điện thoại dùng liên kết `tel:` trên thiết bị hỗ trợ gọi.
- Asset mới: `src/assets/teacher-contact.png`, tạo bằng imagegen built-in; cô giáo tiểu học Việt Nam hư cấu, áo dài đào, cầm sách và vẫy tay, nền trong suốt, không chữ/logo.

### Cập nhật 18/09/2026 — Cân bố cục thẻ giáo viên

- DONE: Cân lại thẻ liên hệ thành hai vùng rõ ràng: thông tin ở nửa trái và minh họa cô giáo ở nửa phải.
- DONE: Đồng bộ chiều cao, khoảng đệm và tỷ lệ ảnh để tên/số điện thoại không chồng lên hình; áp dụng riêng tỷ lệ gọn hơn cho điện thoại.

- DONE: Ẩn khu “Lời cô nhắn” khỏi trang chủ và menu header.
- DONE: Trên desktop, đưa “Lưu ý khi đến lớp” sang cột phải, song song với thời khóa biểu; trên mobile tự xếp dọc để dễ theo dõi.
- DONE: Tạo minh họa 3D thân thiện cho đồng phục trắng và đồng phục thể thao đỏ; thẻ đồng phục được ưu tiên kích thước, màu viền và bóng đổ để học sinh chú ý.
- Asset mới: `src/assets/uniform-reminder-v1.png` (imagegen built-in; minh họa hai học sinh hư cấu cùng đồng phục trắng và trang phục thể thao đỏ trên móc áo, nền trong suốt, không chữ).

### Cập nhật 17/09/2026 — Trang chủ phiên bản 2

- DONE: Thiết kế lại màu kem/xanh lá/cam, hero minh họa mới theo đồng phục trắng và kẻ navy; nam quần short, nữ váy xếp ly.
- DONE: Thời khóa biểu đổi ngày, lời cô nhắn có xác nhận đọc, bài tập có checklist, nhận xét lớp hôm nay.
- DONE: 16 tên mẫu và chân dung minh họa, hai hàng học sinh chuyển động ngược chiều trên desktop; mobile vuốt ngang; hỗ trợ giảm chuyển động.
- DONE: Tuyên dương 10 học sinh theo tuần/tháng với dữ liệu khác nhau. Đây là yêu cầu mới đã được người dùng cho phép, bổ sung cho phạm vi spec cũ. Chưa có tính điểm hay tự động xếp hạng.
- DONE: Album dùng hai ảnh do người dùng cung cấp và minh họa, có hộp xem ảnh phóng to/đóng bằng Escape.
- Kiểm tra: build thành công; kiểm tra trình duyệt kích thước 390, 360, 1440px không tràn ngang toàn trang. Đổi ngày, xác nhận đọc, checklist 3/3, đổi tuần/tháng và mở/đóng ảnh hoạt động.
- Chưa có backend, đăng nhập thật, lưu dữ liệu bền vững; thao tác demo mất khi tải lại. Chưa làm toàn bộ role demo, Tailwind, các trạng thái dùng chung của bước 1.1. Dòng DONE 1.1 trước đây chỉ phản ánh khởi tạo và trang chủ, không phải toàn bộ checklist.
- Ảnh PNG chưa tối ưu dung lượng; cần tối ưu media trước production. Không deploy trong giai đoạn này.
- Mã nguồn: `src/App.tsx`, `src/styles.css`. Ảnh: `src/assets/classroom-v2.png`, `class-welcome.png`, `school-day.png`.
- Tạo minh họa bằng built-in imagegen. Prompt: wide 3D clay storybook Vietnamese teacher in peach ao dai with fictional seven-year-old pupils in white shirts/navy tartan trim, boys tartan shorts, girls rounded collars/tartan pleated skirts, sunny school garden, rainbow, flowers, no text.

- Đọc tài liệu này trước, sau đó đọc `CLASS_HUB_IMPLEMENTATION_PROCESS.md`.
- Bắt đầu từ **Bước kế tiếp** đã ghi ở đầu file, không tự làm lại mục `DONE`.
- Nếu phát hiện khác biệt giữa mã nguồn và log, kiểm tra mã nguồn, cập nhật log với bằng chứng và báo lại chủ dự án trước khi tiếp tục.

### Cập nhật 18/09/2026 — Thông tin hằng ngày từ cô

- DONE: Tạo khu “Hôm nay lớp mình có gì?” cho nội dung phụ huynh cần xem mỗi ngày.
- DONE: Tách rõ “GVCN nhận xét ngày học 17/9” và “Bài tập về nhà” thành hai thẻ độc lập, dễ đọc trên máy tính và điện thoại.
- DONE: Hiển thị đầy đủ nhận xét, lời nhắc kiểm tra bút/bút chì, và hai bài tập được cung cấp.
- DONE: Bổ sung nút xác nhận đã đọc nhận xét và ô đánh dấu bài tập để phụ huynh/con theo dõi nhanh trong bản demo.

### Cập nhật 18/09/2026 — Thông báo chỉ đọc

- DONE: Bỏ toàn bộ hành động xác nhận đọc, bộ đếm và ô đánh dấu hoàn thành khỏi khu thông tin hằng ngày.
- DONE: Chuyển hai khối thành thông báo chỉ đọc hoàn toàn từ cô giáo; danh sách bài tập chỉ còn thứ tự và nội dung cô giao.

### Cập nhật 18/09/2026 — Thông tin cập nhật và sinh nhật học sinh

- DONE: Hiển thị thời điểm cô cập nhật thông báo (giờ, thứ, ngày/tháng/năm) tại khối thông tin hằng ngày và thẻ nhận xét.
- DONE: Nút trang bìa đổi thành “Hôm nay lớp mình có gì?” và điều hướng trực tiếp tới thông báo trong ngày.
- DONE: Tăng đồng bộ cỡ chữ nhãn và mô tả phụ của các tiêu đề section.
- DONE: Danh sách học sinh chuyển từ sở thích sang ngày sinh; demo 3 bạn có sinh nhật tháng 9 được tạo thẻ nổi bật có hiệu ứng và biểu tượng bánh sinh nhật.

### Cập nhật 18/09/2026 — Sân khấu vinh danh Top 10

- DONE: Thiết kế lại khu Top 10 theo phong cách lễ trao giải với nền ánh kim, trang trí sao, bục giải vàng/bạc/đồng và bóng đổ rõ nét.
- DONE: Tăng cỡ chữ cho phần mô tả, chọn kỳ, hạng, tên học sinh, điểm sao và bảng danh sách; tối ưu tỷ lệ riêng cho điện thoại.

### Cập nhật 18/09/2026 — Vật phẩm sao 3D

- DONE: Tạo và thêm asset ngôi sao 3D phong cách vật phẩm game cho toàn bộ điểm sao trong khu Top 10.
- DONE: Thay ký hiệu sao chữ bằng ảnh sao 3D, thêm hiệu ứng nhún/xoay nhẹ và bóng đổ; áp dụng kích thước riêng cho Top 3, bảng xếp hạng và điện thoại.
- Asset mới: `src/assets/game-star-3d.png`, tạo bằng imagegen built-in; sao vàng 3D nền trong suốt, không chữ/logo.
- Không chuyển qua mốc có ghi **Cần xác nhận bắt buộc** khi chưa có xác nhận rõ ràng từ chủ dự án.
