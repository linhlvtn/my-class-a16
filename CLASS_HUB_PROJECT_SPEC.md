# CLASS HUB — PROJECT SPECIFICATION
## Website nội bộ cho một lớp học — tài liệu bàn giao cho Codex / AI Builder

**Phiên bản:** 1.0  
**Ngày chuẩn bị:** 17/09/2026  
**Mục tiêu:** Xây dựng một website nội bộ cho một lớp học, phục vụ giáo viên – phụ huynh – học sinh, vận hành đơn giản, lưu dữ liệu xuyên suốt nhiều năm học và hướng tới chi phí vận hành 0đ.

---

# 1. TỔNG QUAN DỰ ÁN

## 1.1. Bài toán

Website đóng vai trò là trung tâm thông tin nội bộ của một lớp học, thay thế việc thông tin bị phân tán qua Zalo, Messenger, giấy thông báo, Google Drive, tin nhắn cá nhân và các nhóm phụ huynh.

Hệ thống phải:

- Dễ sử dụng với giáo viên không chuyên công nghệ.
- Cho phép đăng tin, thông báo, hoạt động, album ảnh và tài liệu.
- Cho phép quản lý học sinh và phụ huynh theo quan hệ rõ ràng.
- Có khu vực riêng tư cho từng học sinh.
- Lưu được dữ liệu qua nhiều năm học.
- Có khả năng đóng năm học cũ và mở năm học mới mà không mất dữ liệu.
- Có cơ chế backup.
- Không phụ thuộc vào một dịch vụ trả phí bắt buộc.
- Ưu tiên free tier có giới hạn rõ ràng, tránh phát sinh hóa đơn ngoài ý muốn.
- Responsive, dùng tốt trên điện thoại.
- Có thể phát triển thành PWA sau này.

---

# 2. MỤC TIÊU SẢN PHẨM

## 2.1. Đối với giáo viên

Giảm số thao tác thủ công.

Giáo viên cần có thể:

- Đăng thông báo trong vài giây.
- Đăng bài có ảnh.
- Tạo sự kiện.
- Xem phụ huynh nào đã đọc thông báo.
- Quản lý danh sách học sinh.
- Nhập nhận xét từng học sinh.
- Tạo album ảnh.
- Quản lý thành tích.
- Tạo khảo sát.
- Tạo checklist cho hoạt động.
- Theo dõi phản hồi/đăng ký tham gia.
- Lưu nháp.
- Ghim bài quan trọng.
- Đóng/mở năm học.
- Không cần tiếp xúc trực tiếp với database, Cloudflare hoặc công cụ hạ tầng.

## 2.2. Đối với phụ huynh

Phụ huynh cần:

- Thấy ngay thông báo quan trọng.
- Xem lịch lớp.
- Xem hoạt động sắp tới.
- Xác nhận tham gia hoạt động.
- Xem album ảnh.
- Xem thông tin riêng của con mình.
- Xem nhận xét, thành tích, tiến bộ.
- Xem tài liệu.
- Gửi ý kiến riêng tới giáo viên.
- Xác nhận “đã đọc”.
- Tham gia khảo sát.

## 2.3. Đối với học sinh

Học sinh có thể:

- Xem thông báo phù hợp.
- Xem lịch.
- Xem tài liệu học tập.
- Xem thành tích cá nhân.
- Xem huy hiệu / ghi nhận.
- Xem các hoạt động lớp.
- Xem album/kỷ niệm nếu được cho phép.

---

# 3. NGUYÊN TẮC THIẾT KẾ SẢN PHẨM

1. **Simple First**  
   Giao diện phải dễ dùng hơn một CMS truyền thống.

2. **Mobile First**  
   Đa số phụ huynh truy cập bằng điện thoại.

3. **Privacy First**  
   Dữ liệu cá nhân không được public.

4. **Zero-cost Oriented**  
   Ưu tiên free tier và có cơ chế chặn trước khi vượt quota.

5. **Archive, Never Delete By Default**  
   Hết năm học thì archive, không xóa.

6. **No Social Network Complexity**  
   Không biến hệ thống thành Facebook/Zalo mini.

7. **Teacher UX Priority**  
   Giáo viên là người quản trị chính, vì vậy dashboard phải cực đơn giản.

---

# 4. KIẾN TRÚC HỆ THỐNG ĐỀ XUẤT

```text
                    USER
        ┌────────────┼────────────┐
        │            │            │
     TEACHER       PARENT       STUDENT
        │            │            │
        └────────────┼────────────┘
                     │
                     ▼
          Cloudflare-hosted Frontend
       React/Vite + Cloudflare Workers
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
   Firebase Auth   D1 DB       R2 Storage
     Authentication Data        Images/files
          │          │          │
          └──────────┼──────────┘
                     │
                     ▼
                  BACKUP
             SQL export / local
```

---

# 5. STACK CÔNG NGHỆ

## 5.1. Frontend

Khuyến nghị:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query (nếu cần data fetching/cache)
- Zod cho validation
- React Hook Form

Lý do:

- Nhẹ.
- Dễ deploy.
- Dễ phát triển bằng Codex/AI Builder.
- Ít phụ thuộc framework server-side.
- Tối ưu tốt cho Cloudflare.

Có thể cân nhắc Next.js nếu đội phát triển ưu tiên Next, nhưng React/Vite đơn giản hơn cho mô hình này.

## 5.2. Backend

Cloudflare Workers.

Dùng cho:

- API.
- Authorization.
- CRUD.
- Signed URL.
- Business logic.
- Rate limit.
- File metadata.
- Middleware phân quyền.

## 5.3. Database

Cloudflare D1 (SQLite-compatible).

Dùng lưu:

- Users.
- Students.
- Parents.
- Posts.
- Events.
- Reviews.
- Achievements.
- Polls.
- Read receipts.
- Registration.
- School years.
- Audit log.

## 5.4. Authentication

Firebase Authentication.

Ưu tiên:

- Google Sign-in.
- Email/password.
- Có whitelist email.
- Không cho public signup tự do.

## 5.5. Media

Cloudflare R2.

Lưu:

- Ảnh.
- Thumbnail.
- File nhỏ.

Không khuyến khích lưu video trực tiếp.

Video nên:

- Google Drive.
- YouTube Unlisted.
- Link ngoài.

## 5.6. Hosting

Cloudflare Workers + Static Assets hoặc Cloudflare Pages.

Free domain:

- `tenlop.pages.dev`
- hoặc `tenlop.workers.dev`

Nếu nhà trường có domain riêng:

- `lop5a1.truongabc.edu.vn`

---

# 6. CẤU TRÚC PHÂN QUYỀN

## 6.1. Vai trò

### ADMIN
- Toàn quyền.
- Quản lý user.
- Quản lý role.
- Quản lý năm học.
- Quản lý cấu hình hệ thống.
- Backup.
- Audit.

### TEACHER
- Đăng/sửa/xóa bài.
- Tạo sự kiện.
- Quản lý học sinh.
- Nhận xét.
- Thành tích.
- Album.
- Khảo sát.
- Đăng ký hoạt động.
- Tài liệu.
- Xem read receipt.

### PARENT
- Xem nội dung dành cho phụ huynh.
- Xem thông tin của con mình.
- Xem nhận xét của con.
- Xem thành tích của con.
- Xác nhận đọc.
- Vote khảo sát.
- Đăng ký sự kiện.
- Gửi phản hồi riêng.

### STUDENT
- Xem nội dung phù hợp.
- Xem thông tin cá nhân.
- Xem thành tích.
- Xem lịch.
- Xem tài liệu.
- Xem huy hiệu nếu được bật.

---

# 7. TÍNH NĂNG CỐT LÕI

# 7.1. Dashboard giáo viên

Màn hình đầu tiên sau đăng nhập.

Hiển thị:

- Số học sinh.
- Bài viết mới.
- Sự kiện sắp tới.
- Số phụ huynh chưa xác nhận.
- Nhận xét tháng chưa hoàn thành.
- Ảnh mới.
- Nút “Đăng nhanh”.

Ví dụ:

```text
Xin chào cô Lan

+ ĐĂNG NHANH

Thông báo tuần này: 3
Học sinh: 42
Sự kiện sắp tới: 2
Phụ huynh chưa xác nhận: 6
Nhận xét tháng: 32/42
```

---

# 7.2. Đăng nhanh

Nút lớn trên dashboard.

Các lựa chọn:

- Thông báo.
- Hoạt động/ảnh.
- Sự kiện.
- Nhận xét học sinh.
- Thành tích.

Mục tiêu:

- Không bắt giáo viên đi qua menu phức tạp.
- Không có CMS jargon.

---

# 7.3. Quản lý bài viết

Post có:

- title
- slug
- content
- cover_image
- category
- priority
- visibility
- status
- is_pinned
- published_at
- created_by
- school_year_id

Status:

- draft
- published
- archived

Priority:

- normal
- important
- urgent

Visibility:

- all
- teacher
- parent
- student
- specific_group
- private

---

# 7.4. Mẫu bài viết có sẵn

Ví dụ:

- Họp phụ huynh.
- Ngoại khóa.
- Nghỉ học.
- Nhắc đồ dùng.
- Bài tập cuối tuần.
- Thông báo kiểm tra.

Template giúp giáo viên không phải soạn lại từ đầu.

---

# 7.5. Lịch lớp

Mỗi event gồm:

- tên sự kiện
- mô tả
- start_at
- end_at
- địa điểm
- audience
- checklist
- require_confirmation
- registration_deadline
- attachments

Có thể hiển thị:

- Calendar view.
- Upcoming events.
- Event detail.

---

# 7.6. Xác nhận tham gia

Parent có thể:

- Tham gia.
- Không tham gia.
- Chưa chắc.

Có thể nhập:

- Số người đi cùng.
- Ghi chú.
- Người đi cùng.

Teacher xem tổng hợp:

```text
Đã phản hồi: 36/42
Tham gia: 31
Không tham gia: 3
Chưa chắc: 2
Chưa phản hồi: 6
```

---

# 7.7. Checklist hoạt động

Ví dụ:

- Đồng phục.
- Mũ.
- Bình nước.
- Đồ ăn nhẹ.
- Giấy xác nhận.

Checklist chỉ để xem hoặc có thể tích “đã chuẩn bị”.

---

# 7.8. Quản lý học sinh

Student profile gồm:

- Họ tên.
- Ngày sinh.
- Ảnh đại diện.
- Mã nội bộ.
- Lớp.
- Năm học.
- Ghi chú.
- trạng thái.

Không lưu dữ liệu nhạy cảm không cần thiết.

---

# 7.9. Quan hệ phụ huynh – học sinh

Một học sinh có thể có nhiều phụ huynh.

Một phụ huynh có thể có nhiều con.

Bảng relation:

```text
student_parents
- student_id
- parent_user_id
- relationship
- is_primary
```

---

# 7.10. Nhận xét học sinh

Teacher nhập theo:

- tháng
- học kỳ
- năm học
- loại nhận xét

Có thể gồm:

- điểm tốt
- cần cải thiện
- nhận xét chung
- mục tiêu tháng tới

Chỉ teacher + parent tương ứng + admin xem được.

---

# 7.11. Nhật ký tiến bộ

Không tạo bảng xếp hạng.

Theo dõi học sinh so với chính học sinh đó.

Tiêu chí ví dụ:

- Tự giác.
- Học tập.
- Giao tiếp.
- Hoạt động.
- Sáng tạo.
- Kỷ luật.

---

# 7.12. Thành tích

### Cá nhân
- Học tập.
- Thể thao.
- Nghệ thuật.
- Hoạt động.

### Tập thể
- Thành tích lớp.
- Thi đua.
- Văn nghệ.
- Thể thao.

---

# 7.13. Huy hiệu / Sao

Optional.

Ví dụ:

- Chăm học.
- Giúp đỡ bạn.
- Sáng tạo.
- Năng động.
- Tiến bộ.
- Ý thức tốt.

Không dùng để xếp hạng công khai.

---

# 7.14. Album ảnh

Album gồm:

- title
- description
- cover
- event_id optional
- school_year_id

Upload flow:

```text
Select images
↓
Client resize
↓
Convert WebP
↓
Upload R2
↓
Save metadata
```

Khuyến nghị:

- Max 1920px.
- WebP/JPEG optimized.
- File mục tiêu < 500KB–1MB nếu có thể.

---

# 7.15. Timeline lớp học

Tạo dòng thời gian:

- khai giảng
- trung thu
- 20/11
- ngoại khóa
- hội thao
- tổng kết

Có thể tự động sinh từ post/event/album.

---

# 7.16. Tài liệu

Không nên lưu file lớn.

Hỗ trợ:

- file nhỏ trên R2
- Google Drive link
- external link

Metadata:

- title
- description
- category
- url
- school_year_id
- visibility

---

# 7.17. Read Receipt

Parent click:

```text
Tôi đã đọc
```

Backend lưu:

- user_id
- post_id
- read_at

Teacher xem:

- đã đọc
- chưa đọc

---

# 7.18. Khảo sát

Poll:

- question
- options
- start_at
- end_at
- visibility
- multiple_choice

Parent/student vote tùy quyền.

---

# 7.19. Ý kiến riêng cho giáo viên

Parent tạo private feedback.

Không xuất hiện public.

Có:

- subject
- content
- status
- sender
- assigned_teacher
- reply optional

---

# 7.20. Sinh nhật

Tự động hiển thị:

- sinh nhật hôm nay
- sinh nhật tháng

Có thể tắt nếu không muốn công khai ngày sinh.

---

# 7.21. Tìm kiếm

Search:

- posts
- events
- documents
- albums

Không search dữ liệu private nếu user không có quyền.

---

# 8. TÍNH NĂNG KHÔNG NÊN LÀM Ở V1

Không ưu tiên:

- chat realtime
- comment tự do
- like/dislike
- bảng xếp hạng học sinh
- video hosting
- social feed
- AI tự đánh giá học sinh
- hệ thống điểm số phức tạp
- live streaming

Lý do:

- tăng complexity
- tăng chi phí
- tăng rủi ro moderation
- không cần thiết cho mục tiêu chính

---

# 9. DATABASE SCHEMA GỢI Ý

## users

```sql
id TEXT PRIMARY KEY
firebase_uid TEXT UNIQUE NOT NULL
email TEXT UNIQUE NOT NULL
display_name TEXT
avatar_url TEXT
role TEXT NOT NULL
status TEXT DEFAULT 'active'
created_at DATETIME
updated_at DATETIME
```

## school_years

```sql
id TEXT PRIMARY KEY
name TEXT NOT NULL
start_date DATE
end_date DATE
status TEXT
created_at DATETIME
```

Status:

- active
- archived

## students

```sql
id TEXT PRIMARY KEY
full_name TEXT NOT NULL
date_of_birth DATE
avatar_url TEXT
internal_code TEXT
status TEXT
created_at DATETIME
updated_at DATETIME
```

## student_school_years

```sql
id TEXT PRIMARY KEY
student_id TEXT NOT NULL
school_year_id TEXT NOT NULL
class_name TEXT
status TEXT
```

## student_parents

```sql
id TEXT PRIMARY KEY
student_id TEXT NOT NULL
parent_user_id TEXT NOT NULL
relationship TEXT
is_primary INTEGER DEFAULT 0
```

## posts

```sql
id TEXT PRIMARY KEY
title TEXT NOT NULL
slug TEXT
content TEXT
category TEXT
priority TEXT DEFAULT 'normal'
visibility TEXT DEFAULT 'all'
status TEXT DEFAULT 'draft'
is_pinned INTEGER DEFAULT 0
cover_image_url TEXT
school_year_id TEXT
created_by TEXT
published_at DATETIME
created_at DATETIME
updated_at DATETIME
```

## post_read_receipts

```sql
id TEXT PRIMARY KEY
post_id TEXT NOT NULL
user_id TEXT NOT NULL
read_at DATETIME
```

## events

```sql
id TEXT PRIMARY KEY
title TEXT NOT NULL
description TEXT
location TEXT
start_at DATETIME
end_at DATETIME
visibility TEXT
require_confirmation INTEGER DEFAULT 0
registration_deadline DATETIME
school_year_id TEXT
created_by TEXT
created_at DATETIME
updated_at DATETIME
```

## event_registrations

```sql
id TEXT PRIMARY KEY
event_id TEXT NOT NULL
user_id TEXT NOT NULL
student_id TEXT
status TEXT
companion_count INTEGER DEFAULT 0
note TEXT
created_at DATETIME
updated_at DATETIME
```

## albums

```sql
id TEXT PRIMARY KEY
title TEXT NOT NULL
description TEXT
cover_image_url TEXT
school_year_id TEXT
event_id TEXT
visibility TEXT
created_by TEXT
created_at DATETIME
```

## media

```sql
id TEXT PRIMARY KEY
album_id TEXT
owner_type TEXT
owner_id TEXT
storage_key TEXT NOT NULL
url TEXT
mime_type TEXT
size_bytes INTEGER
width INTEGER
height INTEGER
created_at DATETIME
```

## student_reviews

```sql
id TEXT PRIMARY KEY
student_id TEXT NOT NULL
school_year_id TEXT NOT NULL
period_type TEXT
period_value TEXT
strengths TEXT
improvements TEXT
general_comment TEXT
next_goal TEXT
created_by TEXT
created_at DATETIME
updated_at DATETIME
```

## achievements

```sql
id TEXT PRIMARY KEY
student_id TEXT
school_year_id TEXT
title TEXT NOT NULL
description TEXT
category TEXT
achieved_at DATE
created_by TEXT
created_at DATETIME
```

## badges

```sql
id TEXT PRIMARY KEY
name TEXT NOT NULL
icon TEXT
description TEXT
```

## student_badges

```sql
id TEXT PRIMARY KEY
student_id TEXT
badge_id TEXT
school_year_id TEXT
note TEXT
awarded_by TEXT
awarded_at DATETIME
```

## polls

```sql
id TEXT PRIMARY KEY
question TEXT NOT NULL
visibility TEXT
allow_multiple INTEGER DEFAULT 0
start_at DATETIME
end_at DATETIME
school_year_id TEXT
created_by TEXT
created_at DATETIME
```

## poll_options

```sql
id TEXT PRIMARY KEY
poll_id TEXT NOT NULL
label TEXT NOT NULL
sort_order INTEGER
```

## poll_votes

```sql
id TEXT PRIMARY KEY
poll_id TEXT NOT NULL
option_id TEXT NOT NULL
user_id TEXT NOT NULL
created_at DATETIME
```

## documents

```sql
id TEXT PRIMARY KEY
title TEXT NOT NULL
description TEXT
category TEXT
url TEXT
visibility TEXT
school_year_id TEXT
created_by TEXT
created_at DATETIME
```

## private_feedback

```sql
id TEXT PRIMARY KEY
sender_user_id TEXT NOT NULL
teacher_user_id TEXT
subject TEXT
content TEXT
status TEXT DEFAULT 'open'
created_at DATETIME
updated_at DATETIME
```

## audit_logs

```sql
id TEXT PRIMARY KEY
user_id TEXT
action TEXT
entity_type TEXT
entity_id TEXT
metadata TEXT
created_at DATETIME
```

---

# 10. API GỢI Ý

## Auth

```text
GET /api/me
POST /api/auth/verify
```

## Posts

```text
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
POST   /api/posts/:id/read
```

## Students

```text
GET  /api/students
GET  /api/students/:id
POST /api/students
PUT  /api/students/:id
```

## Reviews

```text
GET  /api/students/:id/reviews
POST /api/students/:id/reviews
PUT  /api/reviews/:id
```

## Events

```text
GET  /api/events
GET  /api/events/:id
POST /api/events
PUT  /api/events/:id
POST /api/events/:id/register
```

## Albums

```text
GET  /api/albums
POST /api/albums
POST /api/albums/:id/media
```

## Polls

```text
GET  /api/polls
POST /api/polls
POST /api/polls/:id/vote
```

## Documents

```text
GET  /api/documents
POST /api/documents
```

---

# 11. AUTHORIZATION RULES

Authorization phải được kiểm tra ở backend.

Không chỉ ẩn UI.

Ví dụ:

```text
Parent request:
GET /api/students/STUDENT_B/reviews
```

Backend phải kiểm tra:

```text
current_user.role === parent
AND
student_parents contains (STUDENT_B, current_user.id)
```

Nếu không:

```text
403 Forbidden
```

---

# 12. SECURITY

Bắt buộc:

- Verify Firebase ID token.
- Role-based access control.
- Input validation bằng Zod.
- Sanitize rich text.
- Rate limiting.
- File type validation.
- Max file size.
- Không expose R2 bucket credentials.
- Không cho direct unrestricted R2 upload.
- Signed upload hoặc API gateway.
- CSRF protection nếu dùng cookie session.
- Security headers.
- CSP.
- Audit log.
- Soft delete cho dữ liệu quan trọng.
- Không lưu password trong DB.
- Không log token.

---

# 13. PRIVACY

Dữ liệu học sinh phải mặc định private.

Không public:

- nhận xét cá nhân
- thông tin liên hệ
- đánh giá
- email phụ huynh
- hồ sơ chi tiết

Ảnh học sinh:

- chỉ hiển thị trong phạm vi tài khoản lớp
- có thể hỗ trợ album public/private tùy admin

Không dùng SEO indexing cho khu vực private.

Thêm:

```html
<meta name="robots" content="noindex,nofollow">
```

cho trang nội bộ.

---

# 14. MEDIA POLICY

## Ảnh

Trước upload:

- resize
- compress
- convert WebP
- reject ảnh quá lớn

Đề xuất:

```text
MAX_IMAGE_SIZE_BEFORE_PROCESS = 15MB
MAX_IMAGE_OUTPUT = 1MB
MAX_WIDTH = 1920px
```

## Video

Không upload trực tiếp.

Lưu:

- YouTube Unlisted URL
- Drive URL

---

# 15. QUẢN LÝ DUNG LƯỢNG

Thiết lập application-level quota:

```text
MAX_R2_USAGE_WARNING = 7GB
MAX_R2_USAGE_HARD_STOP = 8GB
```

Khi đạt warning:

- hiển thị cảnh báo admin

Khi đạt hard stop:

- chặn upload mới
- không ảnh hưởng dữ liệu cũ

---

# 16. BACKUP

Mỗi tháng:

```bash
npx wrangler d1 export class-db \
  --remote \
  --output=backup-YYYY-MM.sql
```

Backup lưu:

- local
- Google Drive
- ổ cứng ngoài nếu cần

Giữ ít nhất:

- 12 monthly backups
- 1 backup cuối năm học

---

# 17. QUẢN LÝ NĂM HỌC

Không xóa dữ liệu cũ.

Workflow:

```text
2026–2027
ACTIVE
↓
CLOSE SCHOOL YEAR
↓
ARCHIVED
```

Sau đó:

```text
CREATE SCHOOL YEAR
2027–2028
ACTIVE
```

Các post/event/review/album phải gắn `school_year_id`.

Cho phép xem archive theo năm.

---

# 18. UX GIÁO VIÊN

Nguyên tắc:

- ít menu
- icon rõ
- chữ lớn
- thao tác 1–3 bước
- mobile friendly

Menu admin:

```text
Trang chủ
Đăng nhanh
Tin bài
Lịch
Học sinh
Nhận xét
Album
Khảo sát
Tài liệu
Năm học
Cài đặt
```

---

# 19. UX PHỤ HUYNH

Home:

```text
Thông báo quan trọng
Sự kiện sắp tới
Tin mới
Con của tôi
Nhận xét mới
Thành tích
Ảnh mới
```

Không hiển thị quá nhiều menu.

---

# 20. UX HỌC SINH

Có thể vui hơn:

- icon
- badge
- activity
- upcoming
- birthday
- achievements

Nhưng vẫn nhẹ và rõ ràng.

---

# 21. ROUTES FRONTEND

Public-like authenticated area:

```text
/
 /login
 /home
 /news
 /news/:slug
 /calendar
 /events/:id
 /albums
 /albums/:id
 /documents
 /students/me
 /students/:id
 /polls
 /feedback
```

Teacher/admin:

```text
/admin
/admin/posts
/admin/posts/new
/admin/events
/admin/students
/admin/reviews
/admin/albums
/admin/polls
/admin/documents
/admin/school-years
/admin/settings
```

---

# 22. COMPONENT DESIGN GỢI Ý

Reusable components:

```text
AppHeader
BottomNavigation
Sidebar
PostCard
PriorityBadge
EventCard
StudentCard
AlbumCard
ReadReceiptSummary
PollCard
UploadImage
RichTextEditor
ConfirmDialog
EmptyState
LoadingSkeleton
RoleGuard
PermissionGate
SchoolYearSwitcher
```

---

# 23. RESPONSIVE

Breakpoint ưu tiên:

```text
mobile: 360px+
tablet: 768px+
desktop: 1024px+
```

Parent UX ưu tiên bottom navigation trên mobile.

Teacher admin có thể:

- bottom nav mobile
- sidebar desktop

---

# 24. PWA — PHASE SAU

Có thể thêm:

- installable
- offline shell
- cached recent posts
- app icon
- splash

Push notification là phase sau vì sẽ tăng complexity.

---

# 25. ROADMAP

## PHASE 0 — Foundation

- Project init.
- Auth.
- D1.
- R2.
- Worker API.
- RBAC.
- Base UI.
- School year.

## PHASE 1 — Core MVP

- Login.
- User roles.
- Posts.
- Events.
- Students.
- Albums.
- Documents.
- Responsive.

## PHASE 1.5

- Student reviews.
- Achievements.
- Archive school year.
- Read receipts.

## PHASE 2

- Polls.
- Event registration.
- Checklist.
- Private feedback.

## PHASE 2.5

- Timeline.
- Progress journal.
- Badges.
- Birthdays.

## PHASE 3

- PWA.
- Push.
- Dashboard analytics.
- Automation.
- More advanced backup tools.

---

# 26. MVP DEFINITION OF DONE

MVP hoàn thành khi:

- Teacher đăng nhập được.
- Parent đăng nhập được.
- Student login optional.
- Teacher đăng bài.
- Parent đọc bài.
- Teacher tạo sự kiện.
- Parent xem lịch.
- Teacher thêm học sinh.
- Parent chỉ xem được con mình.
- Teacher tạo album.
- Parent xem album.
- Dữ liệu gắn school year.
- RBAC hoạt động.
- Có backup command.
- Responsive.
- Không có lỗi truy cập dữ liệu chéo.

---

# 27. NON-FUNCTIONAL REQUIREMENTS

## Performance

- TTFB nhanh.
- Lazy load ảnh.
- Pagination.
- Không tải toàn bộ album một lần.
- Thumbnail.

## Reliability

- Soft delete.
- Backup.
- Audit log.
- Graceful error.

## Maintainability

- TypeScript.
- modular code.
- clear service layer.
- DB migrations.
- environment variables.
- automated lint/typecheck.

---

# 28. FOLDER STRUCTURE GỢI Ý

```text
src/
  components/
  features/
    auth/
    posts/
    events/
    students/
    reviews/
    albums/
    polls/
    documents/
  pages/
  hooks/
  services/
  lib/
  types/

worker/
  routes/
  middleware/
  services/
  db/
  auth/
  utils/

migrations/
tests/
scripts/
```

---

# 29. ENVIRONMENT VARIABLES

Ví dụ:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

R2_BUCKET_NAME=
R2_PUBLIC_BASE_URL=

D1_DATABASE_ID=
APP_ENV=
```

Không commit secret.

---

# 30. TESTING

Bắt buộc test authorization.

Test cases:

- Parent A không xem được Student B.
- Student không vào admin.
- Teacher có thể CRUD post.
- Parent không thể CRUD post.
- Archived year vẫn đọc được.
- Upload quá lớn bị reject.
- Unauthorized request = 401.
- Forbidden request = 403.

---

# 31. FREE-COST STRATEGY

Mục tiêu:

```text
Hosting = 0đ
Backend = 0đ
Database = 0đ
Auth = 0đ
Storage = 0đ trong quota
Domain = 0đ nếu dùng subdomain mặc định
```

Không tự động bật dịch vụ trả phí.

Không lưu video.

Có quota nội bộ.

Có cảnh báo storage.

---

# 32. DOMAIN

Giai đoạn đầu:

```text
lop5a1.pages.dev
```

Sau này:

```text
lop5a1.truongabc.edu.vn
```

Nếu mua domain riêng thì đây có thể là khoản chi duy nhất.

---

# 33. PRODUCT PRINCIPLES CHO AI BUILDER

Khi AI Builder sinh code:

1. Không tự ý thêm tính năng ngoài scope.
2. Không thay đổi architecture nếu không cần.
3. Không dùng paid API nếu chưa được phê duyệt.
4. Không dùng Supabase/Firebase Storage cho media trong bản chuẩn này.
5. Không cho public signup.
6. Không expose student private data.
7. RBAC phải enforce ở backend.
8. Mỗi migration phải versioned.
9. Không hardcode secrets.
10. Ưu tiên đơn giản hơn “enterprise overengineering”.

---

# 34. PRIORITY ORDER CHO CODEX / AI BUILDER

Thứ tự nên thực hiện:

```text
1. Bootstrap project
2. Auth
3. User/role model
4. School year
5. D1 schema + migrations
6. Backend RBAC
7. Posts
8. Events
9. Students + parent relations
10. Albums + R2
11. Documents
12. Reviews
13. Read receipt
14. Poll
15. Event registration
16. Archive
17. Backup
18. PWA
```

---

# 35. AI BUILDER START PROMPT

Có thể copy phần dưới đây vào Codex / AI Builder:

```text
You are building a production-ready internal classroom web application based on the attached PROJECT_SPEC.md.

Primary goal:
Build a secure, mobile-first, zero-cost-oriented classroom information system for teachers, parents and students.

Tech stack:
- React
- Vite
- TypeScript
- Tailwind CSS
- Cloudflare Workers
- Cloudflare D1
- Cloudflare R2
- Firebase Authentication

Important rules:
- Do not replace the defined architecture without a strong technical reason.
- Do not use paid services.
- Do not implement public signup.
- Authorization must be enforced server-side.
- Parent users may only access students linked to their account.
- Never expose private student data.
- Use migrations for D1 schema.
- Use TypeScript strictly.
- Keep UI extremely easy for non-technical teachers.
- Optimize for mobile.
- Archive old school years instead of deleting them.
- Compress images before upload.
- Do not support direct video upload.
- Create clean modular code suitable for long-term maintenance.

Start by:
1. Creating the full project folder structure.
2. Creating the D1 schema and migrations.
3. Creating authentication middleware.
4. Creating role-based authorization.
5. Building the base dashboard shell.
6. Implementing school year support.
7. Implementing Posts as the first complete vertical feature.

For every major phase:
- explain created files
- explain data flow
- include setup steps
- include environment variables
- run typecheck/lint
- add basic authorization tests
- do not move to the next major feature until the current feature is structurally complete.
```

---

# 36. AI BUILDER DEFINITION OF QUALITY

Code phải:

- rõ ràng
- type-safe
- không duplicate logic
- có reusable components
- API error structure thống nhất
- validation server-side
- authorization server-side
- migration-based DB
- dễ deploy
- dễ backup
- dễ mở rộng

Không chấp nhận:

- giant component
- giant worker file
- inline SQL khắp code
- role check chỉ ở frontend
- magic strings quá nhiều
- hardcoded credentials

---

# 37. GỢI Ý UI STYLE

Phong cách:

- sạch
- thân thiện
- trường học
- hiện đại
- không quá “corporate”
- nhiều whitespace
- card rõ
- typography dễ đọc

Primary interaction:

- button lớn
- rõ action
- icon quen thuộc

Ví dụ teacher home:

```text
+ Đăng nhanh

Thông báo
Lịch
Học sinh
Nhận xét
Album
Khảo sát
```

---

# 38. CÁC QUYẾT ĐỊNH KIẾN TRÚC ĐÃ CHỐT

- Cloudflare-first.
- Firebase chỉ dùng Authentication.
- D1 làm database.
- R2 làm media storage.
- React/Vite frontend.
- Không video storage.
- Không public signup.
- Không social network.
- Archive theo school year.
- Parent–student relation được kiểm tra backend.
- Backup SQL định kỳ.
- Free subdomain mặc định.
- Quota nội bộ cho storage.

---

# 39. KẾT LUẬN

Hệ thống này không chỉ là website thông báo của lớp.

Nó được định hướng thành:

```text
TRUNG TÂM THÔNG TIN
+
QUẢN LÝ HOẠT ĐỘNG
+
KẾT NỐI PHỤ HUYNH
+
HỒ SƠ HỌC SINH
+
KHO KỶ NIỆM / TIMELINE
+
LƯU TRỮ NHIỀU NĂM HỌC
```

Giá trị lớn nhất sau 2–5 năm không chỉ nằm ở việc “đăng thông báo”, mà ở chỗ lớp học có một kho dữ liệu liên tục về hoạt động, thành tích, hình ảnh và hành trình của học sinh.

Dự án nên bắt đầu rất nhỏ bằng MVP, nhưng cấu trúc dữ liệu phải được thiết kế ngay từ đầu để hỗ trợ nhiều năm học.

---

# 40. NEXT EXECUTION STEP

Codex / AI Builder nên bắt đầu bằng milestone:

```text
MILESTONE 1
Foundation + Auth + RBAC + School Year + Posts
```

Sau khi milestone 1 ổn định mới mở rộng sang:

```text
MILESTONE 2
Students + Parent relations + Events + Albums
```

Tiếp theo:

```text
MILESTONE 3
Reviews + Read receipts + Polls + Registration
```

Cuối cùng:

```text
MILESTONE 4
Timeline + Progress + PWA + Backup UX
```

---

**END OF PROJECT SPECIFICATION**
