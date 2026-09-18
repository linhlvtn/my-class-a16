# CLASS HUB — QUY TRÌNH TRIỂN KHAI

**Phiên bản:** 1.0  
**Cập nhật lần cuối:** 17/09/2026  
**Nguyên tắc thực hiện:** Hoàn thiện giao diện mẫu trước, sau đó mới kết nối dữ liệu và xử lý nghiệp vụ, cuối cùng mới kiểm thử và triển khai.

---

## Cách sử dụng tài liệu này

- Thực hiện theo đúng thứ tự các giai đoạn bên dưới.
- Không chuyển sang giai đoạn tiếp theo khi chưa có mục **Cần xác nhận** được chủ dự án chốt.
- Khi hoàn thành một hạng mục, cập nhật `CLASS_HUB_PROGRESS_LOG.md` với ngày hoàn thành, kết quả, file/liên kết liên quan và việc cần xác nhận (nếu có).
- Khi bắt đầu một ngày làm việc hoặc khi AI/agent mới tiếp nhận, đọc `CLASS_HUB_PROGRESS_LOG.md` trước để biết điểm bắt đầu chính xác.
- Không tự ý mở rộng tính năng ngoài danh sách đã chốt.

---

# GIAI ĐOẠN 1 — FRONTEND UI DEMO (DỮ LIỆU TĨNH)

**Mục tiêu:** Tạo website có thể bấm thử đầy đủ để hình dung giao diện và luồng sử dụng. Chưa tích hợp đăng nhập thật, database, upload hay API.

## 1.1. Khởi tạo giao diện nền tảng

- [ ] Khởi tạo React + Vite + TypeScript + Tailwind CSS.
- [ ] Thiết lập cấu trúc thư mục frontend rõ ràng.
- [ ] Thiết kế bộ giao diện dùng chung: màu sắc, font, button, form, card, badge, modal.
- [ ] Tạo trạng thái dùng chung: loading, empty, error, success, confirm dialog.
- [ ] Tạo layout responsive: header, bottom navigation trên mobile và sidebar trên desktop.

**Cần xác nhận:** Chốt phong cách giao diện tổng thể trước khi triển khai tất cả màn hình.

## 1.2. Dữ liệu và quyền demo

- [ ] Tạo mock data cho giáo viên, phụ huynh, học sinh và admin.
- [ ] Tạo mock data cho bài viết, sự kiện, album, tài liệu, nhận xét, thành tích, khảo sát.
- [ ] Tạo chế độ chuyển vai trò demo: Admin / Teacher / Parent / Student.
- [ ] Tạo dữ liệu cho các trạng thái: trống, nhiều dữ liệu, nội dung quan trọng, hết hạn, archive.

## 1.3. Màn hình công khai đã đăng nhập và phụ huynh/học sinh

- [ ] Trang đăng nhập demo.
- [ ] Trang chủ theo vai trò.
- [ ] Tin bài: danh sách và chi tiết.
- [ ] Lịch lớp: calendar, danh sách sự kiện sắp tới và chi tiết sự kiện.
- [ ] Album: danh sách album, xem ảnh và chi tiết album.
- [ ] Tài liệu: danh sách, lọc danh mục và xem liên kết.
- [ ] Khảo sát: trả lời và xem kết quả demo.
- [ ] Phản hồi riêng cho giáo viên.
- [ ] Khu vực “Con của tôi” và hồ sơ học sinh.
- [ ] Hiển thị nhận xét, thành tích, huy hiệu và sinh nhật (nếu bật).

## 1.4. Màn hình quản trị giáo viên/admin

- [ ] Dashboard giáo viên và nút “Đăng nhanh”.
- [ ] Quản lý bài viết: danh sách, tạo, sửa, xem trước, nháp, ghim, archive.
- [ ] Mẫu thông báo có sẵn.
- [ ] Quản lý sự kiện, checklist và danh sách xác nhận tham gia.
- [ ] Quản lý học sinh và quan hệ phụ huynh–học sinh.
- [ ] Quản lý nhận xét, thành tích và huy hiệu.
- [ ] Quản lý album và giao diện upload ảnh demo.
- [ ] Quản lý khảo sát, tài liệu, năm học và cài đặt.

## 1.5. Hoàn thiện prototype

- [ ] Kiểm tra toàn bộ màn hình tại kích thước mobile (360px+), tablet và desktop.
- [ ] Rà soát luồng thao tác: mỗi tác vụ chính tối đa 1–3 bước khi có thể.
- [ ] Sửa các điểm khó dùng, chữ nhỏ, menu rối hoặc dữ liệu khó đọc.
- [ ] Chuẩn bị bản demo để duyệt.

**Cần xác nhận bắt buộc — Chốt UI/MVP:** Chủ dự án duyệt giao diện, các màn hình cần làm và các tính năng thuộc MVP. Sau mốc này, thay đổi lớn phải được ghi thành yêu cầu mới.

---

# GIAI ĐOẠN 2 — BACKEND, DỮ LIỆU VÀ LOGIC THẬT

**Mục tiêu:** Thay dữ liệu tĩnh bằng hệ thống an toàn, phân quyền chính xác, có thể vận hành trong nhiều năm học.

## 2.1. Hạ tầng và bảo mật nền tảng

- [ ] Tạo Cloudflare Worker API, D1 Database và R2 Storage cho môi trường phát triển.
- [ ] Tạo migrations có version cho toàn bộ schema cần thiết.
- [ ] Tích hợp Firebase Authentication: Google Sign-in và/hoặc email/password.
- [ ] Chặn public signup; chỉ admin duyệt hoặc mời tài khoản.
- [ ] Tạo user profile, role: admin, teacher, parent, student.
- [ ] Xây dựng middleware xác thực Firebase token.
- [ ] Xây dựng RBAC tại backend, không chỉ ẩn giao diện frontend.
- [ ] Thêm validation server-side, cấu trúc lỗi thống nhất, rate limit, security headers và audit log.

**Cần xác nhận:** Xác nhận danh sách admin/teacher đầu tiên và phương án tạo tài khoản phụ huynh, học sinh.

## 2.2. Dữ liệu lõi và năm học

- [ ] Hoàn thiện `users`, `school_years`, `students`, `student_school_years`, `student_parents`.
- [ ] Tạo API và giao diện quản lý năm học.
- [ ] Bảo đảm mọi dữ liệu nội dung gắn với `school_year_id`.
- [ ] Tạo cơ chế đóng/archive năm học, không xóa dữ liệu cũ.
- [ ] Bảo đảm phụ huynh chỉ truy cập hồ sơ của học sinh được liên kết.

## 2.3. Tích hợp các tính năng MVP

- [ ] Posts: CRUD, nháp, xuất bản, ghim, audience, priority, archive.
- [ ] Events: CRUD, calendar, audience, deadline.
- [ ] Students và Parent Relations.
- [ ] Albums: metadata, upload ảnh R2, thumbnail, lazy loading, phân trang.
- [ ] Documents: file nhỏ R2 hoặc liên kết Google Drive/ngoài.
- [ ] Responsive và xử lý lỗi khi gọi API.

**Cần xác nhận bắt buộc — Chốt MVP vận hành:** Chủ dự án kiểm tra bằng dữ liệu thật và xác nhận các luồng MVP hoạt động đúng.

## 2.4. Tính năng sau MVP

- [ ] Student Reviews theo tháng/học kỳ/năm học.
- [ ] Achievements và badges.
- [ ] Read receipts cho thông báo.
- [ ] Polls.
- [ ] Event registration và checklist.
- [ ] Private feedback phụ huynh → giáo viên.
- [ ] Timeline, progress journal, birthday và tìm kiếm có phân quyền (nếu được duyệt).

## 2.5. An toàn dữ liệu và backup

- [ ] Kiểm tra kiểu file, kích thước ảnh và nén/đổi WebP trước upload.
- [ ] Thêm cảnh báo R2 từ 7GB và chặn upload từ 8GB.
- [ ] Thêm soft delete cho dữ liệu quan trọng.
- [ ] Viết lệnh export D1 SQL và quy trình backup mỗi tháng.
- [ ] Lưu tối thiểu 12 bản backup tháng và 1 bản cuối năm học.
- [ ] Viết test 401/403, phân quyền chéo, upload sai và các luồng nghiệp vụ quan trọng.

---

# GIAI ĐOẠN 3 — KIỂM THỬ LOCAL VÀ DEPLOY

**Mục tiêu:** Xác nhận hệ thống ổn định tại local trước, sau đó triển khai production an toàn.

## 3.1. Kiểm thử local

- [ ] Kết nối frontend và backend hoàn chỉnh tại local.
- [ ] Test theo vai trò: admin, teacher, parent, student.
- [ ] Test tạo/sửa/xem bài viết, sự kiện, học sinh, album và tài liệu.
- [ ] Test phụ huynh không xem được dữ liệu của học sinh khác.
- [ ] Test giao diện mobile, tablet, desktop và trình duyệt phổ biến.
- [ ] Chạy lint, typecheck, build và test tự động.
- [ ] Sửa toàn bộ lỗi mức blocker và lỗi bảo mật trước deploy.

**Cần xác nhận bắt buộc — Sẵn sàng deploy:** Chủ dự án duyệt bản local, danh sách tính năng và dữ liệu khởi tạo production.

## 3.2. Chuẩn bị production

- [ ] Tạo D1, R2 và Worker production.
- [ ] Thiết lập Firebase production và domain/subdomain.
- [ ] Cấu hình secrets/environment variables trên Cloudflare; không commit secrets.
- [ ] Chạy migrations production.
- [ ] Tạo tài khoản admin, giáo viên và năm học đầu tiên.
- [ ] Nạp dữ liệu khởi tạo được duyệt.

## 3.3. Deploy và nghiệm thu

- [ ] Deploy frontend và Worker lên Cloudflare.
- [ ] Kiểm tra đăng nhập, quyền truy cập, upload, dữ liệu riêng tư và responsive trên production.
- [ ] Kiểm tra trang nội bộ không bị lập chỉ mục tìm kiếm.
- [ ] Kiểm tra backup export lần đầu và khả năng khôi phục.
- [ ] Bàn giao hướng dẫn sử dụng cho giáo viên và tài khoản quản trị.

**Cần xác nhận bắt buộc — Go live:** Chủ dự án xác nhận website production hoạt động đúng trước khi mời toàn bộ phụ huynh/học sinh.

---

# Ngoài phạm vi hiện tại

**Cập nhật phạm vi 18/09/2026:** Người dùng yêu cầu bảng Top 10 dựa trên tổng sao giáo viên tặng hằng ngày, theo tuần/tháng. Đã làm UI và phép tổng hợp dữ liệu mẫu trên trang chủ; backend lưu lịch sử tặng sao và giao diện giáo viên sẽ thuộc giai đoạn 2. Yêu cầu mới này thay thế việc loại trừ bảng xếp hạng bên dưới đối với xếp hạng sao.

Chỉ thực hiện sau khi website vận hành ổn định và có yêu cầu riêng:

- PWA và push notification.
- Chat realtime, bình luận tự do, like/dislike.
- Video hosting hoặc livestream.
- Bảng xếp hạng học sinh.
- AI đánh giá học sinh.
