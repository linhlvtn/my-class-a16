import defaultBoyAvatar from '../assets/default-student-boy.png'
import defaultGirlAvatar from '../assets/default-student-girl.png'

// Danh sách dùng để chọn avatar mặc định khi phụ huynh chưa tải ảnh riêng cho con.
const FEMALE_STUDENTS = new Set([
  'Ngô Khánh An', 'Lê Hà Minh Anh', 'Nguyễn Bảo Anh', 'Ngô Nguyệt Ánh',
  'Quách Bảo Bảo', 'Trần Ngọc Bảo Châu', 'Doãn Phương Chi', 'Trịnh Hà Chi',
  'Đỗ Thùy Dương', 'Nguyễn Thùy Dương', 'Phí Gia Hân', 'Hồ Phương Tuệ Lâm',
  'Nguyễn Trúc Linh', 'Trịnh Bảo Ngọc', 'Nguyễn Ngọc An Nhiên', 'Phạm An Nhiên',
  'Chu Phương Thảo', 'Nguyễn Ngọc Thảo', 'Nguyễn Thanh Trúc', 'Vương Hoàng Yến'
])

export function getDefaultStudentAvatar(name?: string): string {
  return FEMALE_STUDENTS.has(name || '') ? defaultGirlAvatar : defaultBoyAvatar
}
