import React, { useState, useEffect } from 'react'
import teacherContact from './assets/teacher-contact.png'
import gameStar from './assets/game-star-3d.png'
import rankStar1 from './assets/rank-star-1.png'
import rankStar2 from './assets/rank-star-2.png'
import rankStar3 from './assets/rank-star-3.png'
import hero from './assets/classroom-v2.png'
import { classStore, StudentReviewItem } from './services/classStore'
import { getTimetable, saveTimetable, Timetable, WEEKDAYS } from './data/timetable'
import { ContactSettings, getContactSettings, saveContactSettings } from './data/contactSettings'
import './teacher-admin.css'

// ── Lucide React Icons ────────────────────────────────────────────────────────
import {
  Eye,
  EyeOff,
  Lock,
  LogIn,
  LogOut,
  Home,
  MessageSquare,
  Star,
  BookOpen,
  Users,
  Save,
  Trash2,
  Pencil,
  PlusCircle,
  Search,
  X,
  CheckCircle2,
  Clock,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  Award,
  BookMarked,
  Smile,
  Heart,
  ClipboardList,
  SlidersHorizontal,
  ArrowUpDown,
  GraduationCap,
  Cake,
  MessageCircle,
  ListOrdered,
  Calculator,
  Tag,
  UserCog,
  Camera,
  Upload,
  RotateCcw,
  User,
  HardDrive,
  Settings,
} from 'lucide-react'

// ── Image Compressor for Avatar Uploads (Resizes & crops square to max 256x256, ~15-25KB) ──
function compressImage(file: File, maxSize = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const width = img.width
        const height = img.height
        const minEdge = Math.min(width, height)
        const sx = (width - minEdge) / 2
        const sy = (height - minEdge) / 2

        canvas.width = Math.min(minEdge, maxSize)
        canvas.height = Math.min(minEdge, maxSize)

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(e.target?.result as string)
          return
        }

        ctx.drawImage(img, sx, sy, minEdge, minEdge, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.onerror = reject
      img.src = e.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}



export function StudentAvatarImg({
  id,
  customAvatar,
  className = '',
  size = 56
}: {
  id: number
  customAvatar?: string
  className?: string
  size?: number
}) {
  if (customAvatar) {
    return (
      <span
        className={`student-avatar-thumb has-custom ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `url(${customAvatar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
          display: 'inline-block',
          flexShrink: 0
        }}
        role="img"
        aria-label="Ảnh đại diện học sinh"
      />
    )
  }
  return (
    <span
      className={`student-avatar-thumb ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${hero})`,
        backgroundPosition: `${[10, 21, 31, 41, 57, 67, 79, 92][id % 8]}% 40%`,
        backgroundSize: '850% auto',
        borderRadius: '50%',
        display: 'inline-block',
        flexShrink: 0
      }}
      role="img"
      aria-label="Chân dung minh họa"
    />
  )
}

interface TeacherAdminProps {
  onBackToHome?: () => void
}

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()

export const DOMAIN_CONFIG = [
  {
    key: '📖 Tiếng Việt',
    label: 'Tiếng Việt',
    sub: 'Đọc hiểu, chính tả & diễn đạt',
    icon: BookOpen,
    badgeClass: 'domain-badge-vietnamese',
  },
  {
    key: '🔢 Toán',
    label: 'Toán học',
    sub: 'Tư duy số & tính toán',
    icon: Calculator,
    badgeClass: 'domain-badge-math',
  },
  {
    key: '🌱 Nề nếp',
    label: 'Nề nếp & Kỷ luật',
    sub: 'Ý thức tự giác & nội quy lớp',
    icon: Sparkles,
    badgeClass: 'domain-badge-discipline',
  },
  {
    key: '💬 Tự tin',
    label: 'Tự tin & Giao tiếp',
    sub: 'Mạnh dạn chia sẻ & phát biểu',
    icon: Smile,
    badgeClass: 'domain-badge-confidence',
  },
]

const AREAS = DOMAIN_CONFIG.map(d => d.key)
const LEVELS = ['Cần thêm luyện tập', 'Đang tiến bộ', 'Thực hiện tốt', 'Rất vững vàng']
const REASON_PRESETS = [
  'Hăng hái phát biểu',
  'Giúp đỡ bạn bè',
  'Chăm chỉ học tập',
  'Giữ lớp sạch đẹp',
  'Viết chữ đẹp và cẩn thận',
  'Nề nếp tốt',
  'Có nhiều tiến bộ'
]

export default function TeacherAdmin({ onBackToHome }: TeacherAdminProps) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('teacher_auth_token') === 'logged_in'
  })
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  // App / Store State
  const [storeData, setStoreData] = useState(() => classStore.getData())
  const [activeTab, setActiveTab] = useState<'daily' | 'schedule' | 'stars' | 'students' | 'manage'>('daily')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [storageUsage, setStorageUsage] = useState<{ usedBytes: number; freeLimitBytes: number; percent: number } | null>(null)

  // Tab 4: Student info management & Modal edit state
  const [manageSearch, setManageSearch] = useState('')
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editBirthday, setEditBirthday] = useState('')
  const [editAvatar, setEditAvatar] = useState('')
  const [editError, setEditError] = useState<string | null>(null)
  const [isProcessingAvatar, setIsProcessingAvatar] = useState(false)

  // Tab 1: Daily notice form (Thời gian tự động thời gian thực)
  const [noticeForm, setNoticeForm] = useState(() => ({ ...storeData.dailyNotice }))
  const [scheduleForm, setScheduleForm] = useState<Timetable>(() => getTimetable())
  const [contactForm, setContactForm] = useState<ContactSettings>(() => getContactSettings())
  const [newHwSubject, setNewHwSubject] = useState('')
  const [newHwTask, setNewHwTask] = useState('')

  // Tab 2: Star awards
  const [selectedStudentForStar, setSelectedStudentForStar] = useState<number>(0)
  const [starStudentSearch, setStarStudentSearch] = useState<string>('')
  const [starCount, setStarCount] = useState<number>(2)
  const [starReason, setStarReason] = useState<string>(REASON_PRESETS[0])
  const [starOverviewSearch, setStarOverviewSearch] = useState<string>('')

  // Tab 3: Student profile & reviews
  const [selectedStudentForReview, setSelectedStudentForReview] = useState<number>(0)
  const [studentSearch, setStudentSearch] = useState('')
  const [newReviewTitle, setNewReviewTitle] = useState('')
  const [newReviewTag, setNewReviewTag] = useState('✨ Tiến bộ đáng khen')
  const [newReviewContent, setNewReviewContent] = useState('')
  const [newReviewNext, setNewReviewNext] = useState('')
  const [studentSkills, setStudentSkills] = useState<{ [area: string]: number }>({})

  // Editing existing review state
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null)
  const [editReviewTag, setEditReviewTag] = useState('')
  const [editReviewTitle, setEditReviewTitle] = useState('')
  const [editReviewContent, setEditReviewContent] = useState('')
  const [editReviewNext, setEditReviewNext] = useState('')

  useEffect(() => {
    fetch('/api/usage')
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Usage unavailable')))
      .then(payload => { if (payload?.success) setStorageUsage(payload) })
      .catch(() => setStorageUsage(null))
  }, [])

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = classStore.subscribe(() => {
      const updated = classStore.getData()
      setStoreData({ ...updated })
    })
    return unsubscribe
  }, [])

  // Sync skill ratings when selected student changes
  useEffect(() => {
    const currentSkills = storeData.skills[selectedStudentForReview] || {}
    setStudentSkills({ ...currentSkills })
    setEditingReviewId(null)
  }, [selectedStudentForReview, storeData.skills])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3200)
  }

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim() === '123') {
      setIsAuthenticated(true)
      localStorage.setItem('teacher_auth_token', 'logged_in')
      setLoginError('')
      showToast('Đăng nhập thành công! Chào mừng Cô Vũ Thị Thiết.')
    } else {
      setLoginError('Mật khẩu chưa đúng. Mật khẩu mặc định tạm thời là: 123')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('teacher_auth_token')
    setPassword('')
    showToast('Đã đăng xuất an toàn.')
  }

  // Handle Daily Notice Save (Thời gian cập nhật tự động thời gian thực)
  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
    const dayName = days[now.getDay()]
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    const dateStr = `${dayName} · ${day}/${month}/${year}`

    const updated = { ...noticeForm, time: timeStr, date: dateStr }
    classStore.updateDailyNotice(updated)
    setNoticeForm(updated)
    showToast(`Đã cập nhật thông tin lên Trang chủ lúc ${timeStr}!`)
  }

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    saveTimetable({
      schedule: scheduleForm.schedule.map(day => day.map(subject => subject.trim())),
      times: scheduleForm.times.map(time => time.trim())
    })
    showToast('Đã lưu thời khóa biểu mới trên Trang chủ!')
  }

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault()
    const phone = contactForm.phone.replace(/\D/g, '')
    if (phone.length < 9 || !contactForm.zaloUrl.trim()) {
      showToast('Cô vui lòng nhập số điện thoại và link Nhóm Lớp Zalo hợp lệ.')
      return
    }
    saveContactSettings({ phone, zaloUrl: contactForm.zaloUrl.trim() })
    setContactForm({ phone, zaloUrl: contactForm.zaloUrl.trim() })
    showToast('Đã cập nhật thông tin liên hệ trên Trang chủ!')
  }

  // Handle Homework Add / Remove
  const handleAddHomework = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newHwSubject.trim() || !newHwTask.trim()) return
    classStore.addHomeworkItem(newHwSubject.trim(), newHwTask.trim())
    setNewHwSubject('')
    setNewHwTask('')
    showToast('Đã thêm bài tập về nhà mới!')
  }

  const handleRemoveHomework = (id: string) => {
    classStore.removeHomeworkItem(id)
    showToast('Đã xóa bài tập.')
  }

  // Handle Star Award
  const handleAwardStars = (e: React.FormEvent) => {
    e.preventDefault()
    const studentName = storeData.names[selectedStudentForStar]
    classStore.addStarAward(selectedStudentForStar, starCount, starReason)
    showToast(`Đã tặng +${starCount} sao cho ${studentName}!`)
  }

  // Handle Review Save (Create new)
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault()
    const studentName = storeData.names[selectedStudentForReview]
    if (!newReviewTitle.trim() || !newReviewContent.trim()) {
      alert('Vui lòng nhập tiêu đề và nội dung nhận xét.')
      return
    }
    const today = new Date()
    const dateStr = today.toISOString().split('T')[0]
    const timeStr = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`

    classStore.addStudentReview(selectedStudentForReview, {
      date: dateStr,
      time: timeStr,
      tag: newReviewTag,
      title: newReviewTitle,
      content: newReviewContent,
      next: newReviewNext || 'Cùng đồng hành và động viên con mỗi ngày nhé.'
    })
    classStore.updateStudentSkills(selectedStudentForReview, studentSkills)
    setNewReviewTitle('')
    setNewReviewContent('')
    setNewReviewNext('')
    showToast(`Đã lưu nhận xét mới cho học sinh ${studentName}!`)
  }

  // Review Edit Handlers
  const handleStartEditReview = (rev: StudentReviewItem) => {
    setEditingReviewId(rev.id)
    setEditReviewTag(rev.tag)
    setEditReviewTitle(rev.title)
    setEditReviewContent(rev.content)
    setEditReviewNext(rev.next || '')
  }

  const handleSaveEditedReview = (reviewId: string) => {
    if (!editReviewTitle.trim() || !editReviewContent.trim()) {
      alert('Vui lòng không để trống tiêu đề và nội dung nhận xét.')
      return
    }
    classStore.updateStudentReview(selectedStudentForReview, reviewId, {
      tag: editReviewTag,
      title: editReviewTitle,
      content: editReviewContent,
      next: editReviewNext
    })
    setEditingReviewId(null)
    showToast('Đã cập nhật lại nội dung lời nhắn thành công!')
  }

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Cô có chắc chắn muốn xóa lời nhắn này không?')) {
      classStore.deleteStudentReview(selectedStudentForReview, reviewId)
      showToast('Đã xóa lời nhắn.')
    }
  }

  const handleSkillChange = (area: string, levelIndex: number) => {
    const updated = { ...studentSkills, [area]: levelIndex }
    setStudentSkills(updated)
    classStore.updateStudentSkills(selectedStudentForReview, updated)
    showToast(`Đã cập nhật đánh giá môn ${area}`)
  }

  // Filter students
  const filteredStudents = storeData.names
    .map((name, id) => ({ id, name, birthday: storeData.birthdays[id] }))
    .filter(s => normalize(s.name).includes(normalize(studentSearch)) || String(s.id + 1).includes(studentSearch))

  const filteredStarStudents = storeData.names
    .map((name, id) => ({ id, name, stars: classStore.getStudentTotalStars(id) }))
    .filter(s => normalize(s.name).includes(normalize(starStudentSearch)) || String(s.id + 1).includes(starStudentSearch))

  const allStudentsRanked = classStore.getAllStudentsRanking('all')
  const displayedOverviewStudents = allStudentsRanked.filter(s =>
    normalize(s.name).includes(normalize(starOverviewSearch)) || String(s.id + 1).includes(starOverviewSearch)
  )

  // Filter students for Tab 4: Student info management
  const filteredManageStudents = storeData.names
    .map((name, id) => ({
      id,
      name,
      birthday: storeData.birthdays[id],
      stars: classStore.getStudentTotalStars(id),
      avatar: storeData.avatars?.[id]
    }))
    .filter(s => normalize(s.name).includes(normalize(manageSearch)) || String(s.id + 1).includes(manageSearch))

  const openEditStudentModal = (studentId: number) => {
    setEditingStudentId(studentId)
    setEditName(storeData.names[studentId] || '')
    setEditBirthday(storeData.birthdays[studentId] || '')
    setEditAvatar(storeData.avatars?.[studentId] || '')
    setEditError(null)
  }

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setEditError('Vui lòng chọn tệp hình ảnh hợp lệ (JPG, PNG, WebP).')
      return
    }
    try {
      setIsProcessingAvatar(true)
      const compressed = await compressImage(file, 256)
      setEditAvatar(compressed)
      setEditError(null)
    } catch (err) {
      console.error('Error compressing image:', err)
      setEditError('Không thể xử lý ảnh này. Vui lòng thử ảnh khác.')
    } finally {
      setIsProcessingAvatar(false)
      e.target.value = ''
    }
  }

  const handleSaveStudentProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingStudentId === null) return
    const trimmedName = editName.trim()
    const trimmedBday = editBirthday.trim()
    if (!trimmedName) {
      setEditError('Họ và tên học sinh không được để trống.')
      return
    }
    if (!trimmedBday) {
      setEditError('Ngày sinh của học sinh không được để trống.')
      return
    }

    classStore.updateStudentProfile(editingStudentId, {
      name: trimmedName,
      birthday: trimmedBday,
      avatar: editAvatar || ''
    })

    showToast(`Đã lưu thông tin của con "${trimmedName}" thành công! 🎉`)
    setEditingStudentId(null)
  }

  // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="admin-viewport">
        <div className="admin-login-wrapper">
          <div className="admin-login-card">
            <div className="admin-teacher-badge">
              <img src={teacherContact} alt="Cô giáo chủ nhiệm" />
            </div>
            <h1>Cổng Giáo Viên</h1>
            <p className="admin-login-sub">
              Dành riêng cho GVCN <b>Cô Vũ Thị Thiết</b> · Lớp 2A16
            </p>

            {loginError && (
              <div className="admin-error-banner" role="alert">
                <AlertTriangle size={16} />
                {loginError}
              </div>
            )}

            <form className="admin-form" onSubmit={handleLogin}>
              <div className="admin-form-group">
                <label htmlFor="teacher-password">
                  <Lock size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                  Mật khẩu truy cập
                </label>
                <div className="admin-password-box">
                  <input
                    id="teacher-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    className="admin-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <p className="admin-hint-text">
                Mật khẩu mặc định tạm thời: <b>123</b>
              </p>

              <button type="submit" className="admin-login-btn">
                <LogIn size={18} />
                <span>Vào trang quản trị</span>
              </button>
            </form>

            <a
              href="#home"
              className="admin-back-link"
              onClick={e => {
                if (onBackToHome) {
                  e.preventDefault()
                  onBackToHome()
                }
              }}
            >
              <ChevronRight size={14} style={{ transform: 'rotate(180deg)', display: 'inline', verticalAlign: 'middle' }} />
              Quay lại trang lớp học 2A16
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ─── MAIN ADMIN PORTAL ────────────────────────────────────────────────────────
  return (
    <div className="admin-viewport">
      {/* Navigation Bar */}
      <nav className="admin-navbar">
        <div className="admin-nav-inner">
          <div className="admin-brand">
            <div className="admin-brand-icon">
              <img src={teacherContact} alt="GVCN" />
            </div>
            <div className="admin-brand-text">
              <b>QUẢN TRỊ LỚP 2A16</b>
              <small>GVCN: Cô Vũ Thị Thiết · TH Xuân Đỉnh</small>
            </div>
          </div>

          <div className="admin-nav-actions">
            <div className="admin-account-menu">
              <button type="button" className="admin-account-trigger" onClick={() => setAccountMenuOpen(open => !open)} aria-expanded={accountMenuOpen}>
                <Settings size={18} />
              </button>
              {accountMenuOpen && <div className="admin-account-dropdown">
                <span className="account-dropdown-title"><HardDrive size={15} /> Dung lượng D1</span>
                <strong>{storageUsage ? (storageUsage.usedBytes / (1024 * 1024)).toFixed(2) + ' MB' : 'Đang kiểm tra…'} <small>{storageUsage ? '/ 5 GB miễn phí' : ''}</small></strong>
                <div className="account-storage-progress"><i style={{ width: (storageUsage?.percent || 0) + '%' }} /></div>
                {storageUsage && <b>{(storageUsage.percent < 1 ? '< 1' : storageUsage.percent.toFixed(2)) + '% đã sử dụng'}</b>}
              </div>}
            </div>
            <a
              href="#home"
              className="btn-view-site"
              onClick={e => {
                if (onBackToHome) {
                  e.preventDefault()
                  onBackToHome()
                }
              }}
            >
              <Home size={15} /> Xem trang lớp
            </a>
            <button type="button" className="btn-logout" onClick={handleLogout}>
              <LogOut size={15} /> Đăng xuất
            </button>
          </div>
        </div>
      </nav>

      <main className="admin-content">
        {/* Greeting Banner & Quick Stats */}
        <section className="admin-greeting-card">
          <div className="admin-greeting-text">
            <h2>Xin chào Cô Vũ Thị Thiết! 🌸</h2>
            <p>Chúc cô một ngày làm việc tràn đầy niềm vui và năng lượng!</p>
          </div>

          <div className="admin-stats-pills">
            <div className="admin-stat-pill">
              <Users size={18} className="stat-pill-icon" />
              <b>{storeData.names.length}</b>
              <small>Học sinh</small>
            </div>
            <div className="admin-stat-pill">
              <BookOpen size={18} className="stat-pill-icon" />
              <b>{storeData.homework.length}</b>
              <small>Bài tập tối nay</small>
            </div>
            <div className="admin-stat-pill">
              <Star size={18} className="stat-pill-icon" />
              <b>{storeData.awards.length}</b>
              <small>Lượt tặng sao</small>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="admin-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'daily'}
            className={`admin-tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            <MessageSquare size={17} /> Thông báo của cô giáo
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'schedule'}
            className={`admin-tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => { setScheduleForm(getTimetable()); setActiveTab('schedule') }}
          >
            <BookMarked size={17} /> Thời khóa biểu
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'stars'}
            className={`admin-tab-btn ${activeTab === 'stars' ? 'active' : ''}`}
            onClick={() => setActiveTab('stars')}
          >
            <Star size={17} /> Khen thưởng HS
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'students'}
            className={`admin-tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <ClipboardList size={17} /> Đánh giá HS
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'manage'}
            className={`admin-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <UserCog size={17} /> QL Thông Tin HS
          </button>
        </div>

        {/* ════════════════ TAB 1: DAILY UPDATE & HOMEWORK ════════════════ */}
        {activeTab === 'daily' && (
          <div>
            <div className="admin-card">
              <div className="admin-card-header">
                <div className="admin-card-title">
                  <div className="card-title-icon"><MessageCircle size={20} /></div>
                  <div>
                    <h3>Nhận xét ngày học của Cô</h3>
                    <small>Nội dung xuất hiện tại khối "Hôm nay lớp mình có gì?" trên Trang chủ</small>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveNotice}>
                <div className="admin-grid-2">
                  <div className="admin-input-group">
                    <label><Sparkles size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />Tiêu đề lời khen</label>
                    <input
                      type="text"
                      value={noticeForm.title}
                      onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })}
                      placeholder="Ví dụ: Hôm nay lớp mình thật xuất sắc!..."
                      required
                    />
                  </div>
                </div>

                <div className="admin-input-group">
                  <label><Heart size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle', color: '#e06d53' }} />Điểm sáng trong ngày (Lời khen ngợi chính)</label>
                  <textarea
                    rows={4}
                    value={noticeForm.highlight}
                    onChange={e => setNoticeForm({ ...noticeForm, highlight: e.target.value })}
                    placeholder="Ghi lại những điều đáng khen hôm nay của cả lớp..."
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label><MessageSquare size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />Dặn dò và động viên gia đình</label>
                  <textarea
                    rows={3}
                    value={noticeForm.body}
                    onChange={e => setNoticeForm({ ...noticeForm, body: e.target.value })}
                    placeholder="Lời nhắn gửi đến bố mẹ và gia đình..."
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label><BookMarked size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />Lưu ý đồ dùng &amp; chuẩn bị sách vở</label>
                  <textarea
                    rows={3}
                    value={noticeForm.reminder}
                    onChange={e => setNoticeForm({ ...noticeForm, reminder: e.target.value })}
                    placeholder="Chuẩn bị sách vở, đồ dùng học tập cho ngày mai..."
                    required
                  />
                </div>

                <button type="submit" className="btn-save-primary">
                  <Save size={17} /> Lưu &amp; Cập nhật lên Trang chủ (Thời gian thực)
                </button>
              </form>
            </div>

            {/* Homework Management */}
            <div className="admin-card homework-admin-card">
              <div className="admin-card-header">
                <div className="admin-card-title">
                  <div className="card-title-icon card-title-icon--blue"><BookOpen size={20} /></div>
                  <div>
                    <h3>Bài tập về nhà tối nay</h3>
                    <small>Cập nhật lúc {storeData.dailyNotice.time} · {storeData.dailyNotice.date}</small>
                  </div>
                </div>
                <span className="admin-badge-count">{storeData.homework.length} bài</span>
              </div>

              <table className="hw-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>STT</th>
                    <th style={{ width: '220px' }}>Môn học / Nhiệm vụ</th>
                    <th>Nội dung dặn dò</th>
                    <th style={{ width: '90px' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {storeData.homework.map((hw, idx) => (
                    <tr key={hw.id}>
                      <td className="hw-index"><b>{String(idx + 1).padStart(2, '0')}</b></td>
                      <td className="hw-subject"><b>{hw.subject}</b></td>
                      <td className="hw-task">{hw.task}</td>
                      <td className="hw-actions">
                        <button
                          type="button"
                          className="btn-danger-sm"
                          onClick={() => handleRemoveHomework(hw.id)}
                          title="Xóa bài tập này"
                        >
                          <Trash2 size={13} /> Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                  {storeData.homework.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: '#8c7f73' }}>
                        Chưa có bài tập nào. Cô có thể thêm bài tập mới ở bên dưới!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="hw-add-box">
                <h4><PlusCircle size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle', color: '#61bcb2' }} />Thêm bài tập mới</h4>
                <form onSubmit={handleAddHomework}>
                  <div className="admin-grid-2">
                    <div className="admin-input-group">
                      <label>Tên môn / Loại nhiệm vụ</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: VBT Toán, Luyện đọc, Chuẩn bị..."
                        value={newHwSubject}
                        onChange={e => setNewHwSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="admin-input-group">
                      <label>Nội dung chi tiết</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Làm bài 1, 2 trang 15..."
                        value={newHwTask}
                        onChange={e => setNewHwTask(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-secondary">
                    <PlusCircle size={15} /> Thêm vào danh sách bài tập
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'daily' && (
          <div className="admin-card contact-settings-card">
            <div className="admin-card-header"><div className="admin-card-title"><div className="card-title-icon card-title-icon--teal"><MessageCircle size={20} /></div><div><h3>Thông tin liên hệ lớp</h3><small>Thông tin này hiển thị ở nút “Gọi cô giáo chủ nhiệm” và “Nhóm Lớp” trên Trang chủ.</small></div></div></div>
            <form onSubmit={handleSaveContact}>
              <div className="admin-grid-2">
                <div className="admin-input-group"><label>Số điện thoại cô giáo</label><input type="tel" inputMode="tel" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} placeholder="Ví dụ: 0982296281" required /></div>
                <div className="admin-input-group"><label>Link Nhóm Lớp Zalo</label><input type="url" value={contactForm.zaloUrl} onChange={e => setContactForm({ ...contactForm, zaloUrl: e.target.value })} placeholder="https://zalo.me/g/..." required /></div>
              </div>
              <button type="submit" className="btn-save-primary"><Save size={17} /> Lưu thông tin liên hệ</button>
            </form>
          </div>
        )}

        {/* ════════════════ TAB 2: STAR AWARDS & FULL CLASS OVERVIEW ════════════════ */}
        {activeTab === 'stars' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="admin-card-title">
                <div className="card-title-icon card-title-icon--gold"><Award size={20} /></div>
                <div>
                  <h3>Tặng sao &amp; Quản lý thi đua Lớp 2A16</h3>
                  <small>Cộng sao cho học sinh và theo dõi bảng tổng hợp sao của toàn bộ 40 em</small>
                </div>
              </div>
            </div>

            <div className="star-award-panel">
              {/* Form Tặng sao */}
              <form onSubmit={handleAwardStars} className="student-award-picker">
                {/* 1. Chọn học sinh nhận sao */}
                <div className="admin-input-group">
                  <label><Users size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />1. Chọn học sinh nhận sao (Tìm nhanh)</label>
                  <div className="search-with-clear">
                    <Search size={16} className="search-icon-prefix" />
                    <input
                      type="text"
                      placeholder="Gõ tên hoặc số thứ tự để lọc nhanh..."
                      value={starStudentSearch}
                      onChange={e => {
                        const val = e.target.value
                        setStarStudentSearch(val)
                        const matches = storeData.names
                          .map((name, id) => ({ id, name }))
                          .filter(s => normalize(s.name).includes(normalize(val)) || String(s.id + 1).includes(val))
                        if (matches.length > 0 && !matches.some(m => m.id === selectedStudentForStar)) {
                          setSelectedStudentForStar(matches[0].id)
                        }
                      }}
                      className="has-prefix-icon"
                    />
                    {starStudentSearch && (
                      <button
                        type="button"
                        className="clear-search-btn"
                        onClick={() => setStarStudentSearch('')}
                        aria-label="Xóa tìm kiếm"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <select
                    value={selectedStudentForStar}
                    onChange={e => setSelectedStudentForStar(Number(e.target.value))}
                    style={{ marginTop: '8px' }}
                  >
                    {filteredStarStudents.map(st => (
                      <option key={st.id} value={st.id}>
                        2A16-{String(st.id + 1).padStart(2, '0')}: {st.name} (Đang có: {st.stars} sao)
                      </option>
                    ))}
                  </select>

                  {starStudentSearch && filteredStarStudents.length > 0 && (
                    <div className="quick-student-match-pills">
                      {filteredStarStudents.map(st => (
                        <button
                          key={st.id}
                          type="button"
                          className={`student-match-pill ${selectedStudentForStar === st.id ? 'active' : ''}`}
                          onClick={() => setSelectedStudentForStar(st.id)}
                        >
                          {st.name} ({st.stars}⭐)
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredStarStudents.length === 0 && (
                    <small style={{ color: '#c0392b', marginTop: '4px', display: 'block' }}>
                      Không tìm thấy bạn nào. Hãy thử từ khóa khác!
                    </small>
                  )}
                </div>

                {/* 2. Số sao muốn tặng */}
                <div className="admin-input-group">
                  <label><Star size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle', color: '#f7b267' }} />2. Số sao muốn tặng</label>
                  <div className="star-chips">
                    {[1, 2, 3, 5].map(count => (
                      <button
                        type="button"
                        key={count}
                        className={`star-chip-btn ${starCount === count ? 'active' : ''}`}
                        onClick={() => setStarCount(count)}
                      >
                        <img src={gameStar} alt="" style={{ width: '18px', height: '18px' }} />
                        +{count} sao
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Lý do khen thưởng */}
                <div className="admin-input-group">
                  <label><Smile size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle', color: '#61bcb2' }} />3. Lý do khen thưởng</label>

                  <div style={{ marginBottom: '10px' }}>
                    <small className="field-hint">Mẫu có sẵn — bấm để chọn nhanh:</small>
                    <div className="reason-chips" style={{ marginTop: '8px' }}>
                      {REASON_PRESETS.map(preset => (
                        <button
                          type="button"
                          key={preset}
                          className={`reason-chip-btn ${starReason === preset ? 'active' : ''}`}
                          onClick={() => setStarReason(preset)}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="sub-label"><Pencil size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />Hoặc cô tự ghi chú lý do theo ý riêng:</label>
                  <textarea
                    rows={3}
                    placeholder="Nhập lý do riêng của cô (ví dụ: Hôm nay con đã chủ động quét lớp, giải bài toán đố nhanh nhất, phát âm to rõ ràng...)"
                    value={starReason}
                    onChange={e => setStarReason(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-save-primary btn-award-stars">
                  <Star size={17} fill="currentColor" /> Tặng sao cho {storeData.names[selectedStudentForStar]}
                </button>
              </form>

              {/* Bảng tổng quan TOÀN BỘ học sinh trong lớp (40 học sinh) */}
              <div className="class-star-overview-card">
                <div className="overview-header-info">
                  <h4>
                    <ListOrdered size={18} /> Bảng tổng hợp sao cả lớp
                    <span className="admin-badge-count">{displayedOverviewStudents.length}/40</span>
                  </h4>
                  <p>Toàn bộ danh sách lớp xếp theo số sao từ nhiều nhất đến ít nhất</p>
                </div>

                <div className="overview-controls-bar">
                  <div className="search-with-clear">
                    <Search size={15} className="search-icon-prefix" />
                    <input
                      type="text"
                      placeholder="Tìm nhanh theo tên học sinh hoặc số thứ tự..."
                      value={starOverviewSearch}
                      onChange={e => setStarOverviewSearch(e.target.value)}
                      className="has-prefix-icon"
                    />
                    {starOverviewSearch && (
                      <button
                        type="button"
                        className="clear-search-btn"
                        onClick={() => setStarOverviewSearch('')}
                        aria-label="Xóa tìm kiếm"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </div>

                {/* List of all students */}
                <div className="overview-students-scroll">
                  {displayedOverviewStudents.map(st => {
                    const isTopThree = st.rank <= 3
                    return (
                      <div
                        key={st.id}
                        className={`overview-student-row ${isTopThree ? 'top-three' : ''}`}
                      >
                        <span className={`overview-rank-tag ${isTopThree ? `rank-${st.rank}` : ''}`}>
                          {st.rank === 1 ? (
                            <img className="admin-rank-icon" src={rankStar1} alt="Top 1" title="Hạng 1 - Ngôi sao Dẫn đầu" />
                          ) : st.rank === 2 ? (
                            <img className="admin-rank-icon" src={rankStar2} alt="Top 2" title="Hạng 2 - Ngôi sao Chăm chỉ" />
                          ) : st.rank === 3 ? (
                            <img className="admin-rank-icon" src={rankStar3} alt="Top 3" title="Hạng 3 - Ngôi sao Tiến bộ" />
                          ) : (
                            `#${st.rank}`
                          )}
                        </span>

                        <div className="overview-student-meta">
                          <b>{String(st.id + 1).padStart(2, '0')}. {st.name}</b>
                          <small>{st.reason}</small>
                        </div>

                        <div className="overview-student-right">
                          <span className="overview-score">
                            {st.total} <img src={gameStar} alt="" style={{ width: '15px', height: '15px' }} />
                          </span>
                          <button
                            type="button"
                            className="btn-quick-award"
                            title={`Chọn ${st.name} để tặng sao`}
                            onClick={() => {
                              setSelectedStudentForStar(st.id)
                              showToast(`Đã chọn ${st.name} vào ô tặng sao`)
                            }}
                          >
                            <PlusCircle size={12} /> + Sao
                          </button>
                        </div>
                      </div>
                    )
                  })}
                  {displayedOverviewStudents.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px', color: '#8c7f73', fontSize: '13px' }}>
                      Không tìm thấy học sinh nào.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ TAB 3: STUDENT PROFILE & REVIEWS ════════════════ */}
        {activeTab === 'students' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="admin-card-title">
                <div className="card-title-icon card-title-icon--purple"><GraduationCap size={20} /></div>
                <div>
                  <h3>Hồ sơ &amp; Nhận xét học sinh ("Vào lớp")</h3>
                  <small>Viết lời nhắn từng tháng, đánh giá 4 lĩnh vực và chỉnh sửa lời nhắn đã gửi</small>
                </div>
              </div>
            </div>

            {/* Student Selector */}
            <div className="admin-input-group">
              <label><Search size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />Tìm kiếm &amp; Chọn học sinh:</label>
              <div className="search-with-clear">
                <Search size={16} className="search-icon-prefix" />
                <input
                  type="text"
                  placeholder="Gõ tên học sinh để tìm nhanh..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="has-prefix-icon"
                />
                {studentSearch && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setStudentSearch('')}
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            <div className="student-select-grid">
              {filteredStudents.map(student => (
                <button
                  type="button"
                  key={student.id}
                  className={`student-select-btn ${selectedStudentForReview === student.id ? 'active' : ''}`}
                  onClick={() => setSelectedStudentForReview(student.id)}
                >
                  <div className="student-btn-top">
                    <span className="student-btn-stt">{String(student.id + 1).padStart(2, '0')}</span>
                    <span className="student-btn-name">{student.name}</span>
                  </div>
                  <div className="student-btn-bottom">
                    <Cake size={12} className="student-btn-cake-icon" />
                    <span className="student-btn-bday-text">Sinh nhật: {student.birthday}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Student Management */}
            <div className="selected-student-panel">
              <div className="selected-student-header">
                <div className="selected-student-left-wrap">
                  <div
                    className="selected-student-avatar-click"
                    onClick={() => openEditStudentModal(selectedStudentForReview)}
                    title="Bấm để thay đổi ảnh đại diện"
                  >
                    <StudentAvatarImg
                      id={selectedStudentForReview}
                      customAvatar={storeData.avatars?.[selectedStudentForReview]}
                      size={72}
                      className="selected-student-avatar-badge"
                    />
                    <span className="avatar-edit-chip"><Camera size={12} /></span>
                  </div>

                  <div className="selected-student-info">
                    <span className="selected-student-label">
                      <Sparkles size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, color: '#f59e0b' }} />
                      Đang chọn học sinh:
                    </span>
                    <h3 className="selected-student-name">
                      <span className="selected-student-id-pill">2A16-{String(selectedStudentForReview + 1).padStart(2, '0')}</span>
                      {storeData.names[selectedStudentForReview]}
                    </h3>
                    <div className="selected-student-meta-pills">
                      <span className="meta-pill meta-pill--bday">
                        <Cake size={13} style={{ color: '#ea580c' }} />
                        Sinh nhật: <b>{storeData.birthdays[selectedStudentForReview]}</b>
                      </span>
                      <span className="meta-pill meta-pill--star">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        Tổng sao: <b>{classStore.getStudentTotalStars(selectedStudentForReview)} sao</b>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="selected-student-header-actions">
                  <button
                    type="button"
                    className="btn-quick-edit-profile"
                    onClick={() => openEditStudentModal(selectedStudentForReview)}
                    title="Sửa họ tên, ngày sinh hoặc thay ảnh đại diện"
                  >
                    <Pencil size={13} /> Sửa thông tin con
                  </button>
                  <a
                    href="#classroom"
                    className="btn-view-site"
                    onClick={e => {
                      if (onBackToHome) {
                        e.preventDefault()
                        onBackToHome()
                        window.location.hash = '#classroom'
                      }
                    }}
                  >
                    <Home size={14} /> Xem hồ sơ trên trang "Vào lớp" →
                  </a>
                </div>
              </div>

              {/* 4 Learning Domains */}
              <div className="skills-assessment-box">
                <div className="skills-header-wrap">
                  <span className="modern-section-icon-box modern-section-icon--teal">
                    <Sparkles size={18} />
                  </span>
                  <div>
                    <h4 className="skills-title">Đánh giá 4 lĩnh vực phát triển:</h4>
                    <small className="skills-sub">Ghi nhận mức độ tiến bộ hiện tại của học sinh</small>
                  </div>
                </div>
                {DOMAIN_CONFIG.map(domain => {
                  const currentLevel = studentSkills[domain.key] ?? 2
                  const DomainIcon = domain.icon
                  return (
                    <div key={domain.key} className="skill-rating-row">
                      <div className="skill-domain-info">
                        <div className={`domain-icon-box ${domain.badgeClass}`}>
                          <DomainIcon size={19} strokeWidth={2.4} />
                        </div>
                        <div className="domain-text">
                          <b>{domain.label}</b>
                          <small>{domain.sub}</small>
                        </div>
                      </div>
                      <div className="skill-step-btns">
                        {LEVELS.map((lvl, lvlIdx) => (
                          <button
                            type="button"
                            key={lvl}
                            className={`skill-step-btn lvl-${lvlIdx} ${currentLevel === lvlIdx ? 'active' : ''}`}
                            onClick={() => handleSkillChange(domain.key, lvlIdx)}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Add New Review Form */}
              <form onSubmit={handleSaveReview} className="new-review-form">
                <h4 className="review-form-title">
                  <span className="modern-section-icon-box modern-section-icon--rose">
                    <MessageSquare size={17} />
                  </span>
                  Soạn nhận xét mới gửi cho con &amp; gia đình:
                </h4>
                <div className="admin-grid-2">
                  <div className="admin-input-group">
                    <label>
                      <Tag size={13} className="label-icon label-icon--purple" />
                      Nhãn nhận xét
                    </label>
                    <select
                      value={newReviewTag}
                      onChange={e => setNewReviewTag(e.target.value)}
                    >
                      <option value="✨ Tiến bộ đáng khen">✨ Tiến bộ đáng khen</option>
                      <option value="🌱 Cùng con luyện tập">🌱 Cùng con luyện tập</option>
                      <option value="🎒 Tự giác trong nề nếp">🎒 Tự giác trong nề nếp</option>
                      <option value="🌟 Tỏa sáng trong tuần">🌟 Tỏa sáng trong tuần</option>
                    </select>
                  </div>
                  <div className="admin-input-group">
                    <label>
                      <Pencil size={13} className="label-icon label-icon--blue" />
                      Tiêu đề lời nhắn
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Tự tin hơn trong giờ học, Con đã thuộc bài..."
                      value={newReviewTitle}
                      onChange={e => setNewReviewTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>
                    <MessageCircle size={13} className="label-icon label-icon--emerald" />
                    Nội dung nhận xét chi tiết của cô
                  </label>
                  <textarea
                    rows={5}
                    placeholder={`Nhập nhận xét về sự tiến bộ, thái độ học tập của ${storeData.names[selectedStudentForReview]}...`}
                    value={newReviewContent}
                    onChange={e => setNewReviewContent(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label>
                    <Heart size={13} className="label-icon label-icon--pink" />
                    Lời dặn gia đình cùng đồng hành
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ví dụ: Bố mẹ dành 10 phút mỗi tối cùng con đọc sách và động viên con..."
                    value={newReviewNext}
                    onChange={e => setNewReviewNext(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-save-primary">
                  <Save size={17} /> Lưu nhận xét cho {storeData.names[selectedStudentForReview]}
                </button>
              </form>
            </div>

            {/* List of past reviews with EDIT / DELETE capabilities */}
            <div className="review-history-section">
              <h4 className="review-history-title">
                <span className="modern-section-icon-box modern-section-icon--indigo">
                  <Clock size={17} />
                </span>
                Lịch sử lời nhắn cô đã gửi ({classStore.getStudentReviews(selectedStudentForReview).length} lời nhắn):
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {classStore.getStudentReviews(selectedStudentForReview).map(rev => {
                  const isEditingThis = editingReviewId === rev.id

                  if (isEditingThis) {
                    return (
                      <div key={rev.id} className="inline-review-edit-box">
                        <h5>
                          <Pencil size={15} /> Đang chỉnh sửa lời nhắn ngày {rev.date}
                        </h5>

                        <div className="admin-grid-2">
                          <div className="admin-input-group">
                            <label>Nhãn nhận xét:</label>
                            <select
                              value={editReviewTag}
                              onChange={e => setEditReviewTag(e.target.value)}
                            >
                              <option value="✨ Tiến bộ đáng khen">✨ Tiến bộ đáng khen</option>
                              <option value="🌱 Cùng con luyện tập">🌱 Cùng con luyện tập</option>
                              <option value="🎒 Tự giác trong nề nếp">🎒 Tự giác trong nề nếp</option>
                              <option value="🌟 Tỏa sáng trong tuần">🌟 Tỏa sáng trong tuần</option>
                            </select>
                          </div>

                          <div className="admin-input-group">
                            <label>Tiêu đề lời nhắn:</label>
                            <input
                              type="text"
                              value={editReviewTitle}
                              onChange={e => setEditReviewTitle(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="admin-input-group">
                          <label>Nội dung nhận xét:</label>
                          <textarea
                            rows={5}
                            value={editReviewContent}
                            onChange={e => setEditReviewContent(e.target.value)}
                            required
                          />
                        </div>

                        <div className="admin-input-group">
                          <label>Lời dặn gia đình cùng đồng hành:</label>
                          <textarea
                            rows={3}
                            value={editReviewNext}
                            onChange={e => setEditReviewNext(e.target.value)}
                          />
                        </div>

                        <div className="inline-edit-actions">
                          <button
                            type="button"
                            className="btn-save-primary"
                            onClick={() => handleSaveEditedReview(rev.id)}
                          >
                            <Save size={16} /> Lưu thay đổi
                          </button>
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setEditingReviewId(null)}
                          >
                            <X size={15} /> Hủy bỏ
                          </button>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div key={rev.id} className="review-history-item">
                      <div className="review-item-header">
                        <div className="review-item-meta">
                          <span className="review-tag-badge">{rev.tag}</span>
                          <small className="review-date">
                            <Clock size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                            {rev.date} · {rev.time}
                          </small>
                        </div>

                        {/* Action buttons: Sửa & Xóa */}
                        <div className="review-actions-top">
                          <button
                            type="button"
                            className="btn-edit-sm"
                            onClick={() => handleStartEditReview(rev)}
                            title="Chỉnh sửa nội dung lời nhắn này"
                          >
                            <Pencil size={13} /> Sửa lời nhắn
                          </button>
                          <button
                            type="button"
                            className="btn-danger-sm"
                            onClick={() => handleDeleteReview(rev.id)}
                            title="Xóa lời nhắn này"
                          >
                            <Trash2 size={13} /> Xóa
                          </button>
                        </div>
                      </div>

                      <strong className="review-title">{rev.title}</strong>
                      <p className="review-content">{rev.content}</p>
                      {rev.next && (
                        <div className="review-family-note">
                          <Heart size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, color: '#a88ae1' }} />
                          <b>Gia đình đồng hành:</b> {rev.next}
                        </div>
                      )}
                    </div>
                  )
                })}

                {classStore.getStudentReviews(selectedStudentForReview).length === 0 && (
                  <div className="review-empty-state">
                    <MessageCircle size={32} style={{ color: '#c9bfb5', marginBottom: 8 }} />
                    <p>Chưa có lời nhắn nào cho học sinh này.</p>
                    <small>Cô có thể soạn lời nhắn mới ở trên!</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ TAB: TIMETABLE ════════════════ */}
        {activeTab === 'schedule' && (
          <div className="admin-card schedule-admin-card">
            <div className="admin-card-header">
              <div className="admin-card-title">
                <div className="card-title-icon card-title-icon--teal"><BookMarked size={22} /></div>
                <div><h3>Biên soạn thời khóa biểu</h3><small>Nhập tên môn học và thời gian cho từng tiết. Nội dung sẽ hiển thị ngay tại Trang chủ.</small></div>
              </div>
            </div>
            <form onSubmit={handleSaveSchedule}>
              <div className="schedule-editor" role="table" aria-label="Biên soạn thời khóa biểu">
                <div className="schedule-editor-row schedule-editor-head" role="row"><b>Tiết / giờ</b>{WEEKDAYS.map(day => <b key={day}>{day}</b>)}</div>
                {Array.from({ length: 8 }, (_, lessonIndex) => <div className={`schedule-editor-row ${lessonIndex === 4 ? 'schedule-editor-afternoon' : ''}`} role="row" key={lessonIndex}>
                  <label className="schedule-time-field"><span>Tiết {lessonIndex + 1}</span><input value={scheduleForm.times[lessonIndex] || ''} onChange={e => setScheduleForm(current => ({ ...current, times: current.times.map((time, index) => index === lessonIndex ? e.target.value : time) }))} aria-label={`Thời gian tiết ${lessonIndex + 1}`} /></label>
                  {WEEKDAYS.map((day, dayIndex) => <input key={day} value={scheduleForm.schedule[dayIndex]?.[lessonIndex] || ''} onChange={e => setScheduleForm(current => ({ ...current, schedule: current.schedule.map((items, index) => index === dayIndex ? items.map((item, itemIndex) => itemIndex === lessonIndex ? e.target.value : item) : items) }))} aria-label={`${day}, tiết ${lessonIndex + 1}`} placeholder="Tên môn học" />)}
                </div>)}
              </div>
              <div className="schedule-admin-actions"><span>💡 Cô có thể thay đổi tự do tên môn và khung giờ của từng tiết.</span><button type="submit" className="btn-save-primary"><Save size={17} /> Lưu thời khóa biểu</button></div>
            </form>
          </div>
        )}

        {/* ════════════════ TAB 4: MANAGE STUDENT INFO ════════════════ */}
        {activeTab === 'manage' && (
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="admin-card-title">
                <div className="card-title-icon card-title-icon--teal">
                  <UserCog size={22} />
                </div>
                <div>
                  <h3>Quản lý thông tin học sinh Lớp 2A16</h3>
                  <small>Chỉnh sửa họ và tên, ngày sinh nhật và thay ảnh đại diện cho toàn bộ 40 con</small>
                </div>
              </div>
            </div>

            {/* Quick stats & search */}
            <div className="manage-top-bar">
              <div className="manage-search-box">
                <div className="search-with-clear">
                  <Search size={16} className="search-icon-prefix" />
                  <input
                    type="text"
                    placeholder="Tìm nhanh học sinh theo tên hoặc số thứ tự..."
                    value={manageSearch}
                    onChange={e => setManageSearch(e.target.value)}
                    className="has-prefix-icon"
                  />
                  {manageSearch && (
                    <button
                      type="button"
                      className="clear-search-btn"
                      onClick={() => setManageSearch('')}
                      aria-label="Xóa tìm kiếm"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </div>


            </div>

            {/* Grid of all 40 students */}
            <div className="manage-students-grid">
              {filteredManageStudents.map(st => {
                const hasCustom = Boolean(storeData.avatars?.[st.id])
                return (
                  <div key={st.id} className="manage-student-card">
                    <div className="manage-card-top">
                      <span className="manage-stt-badge">#{String(st.id + 1).padStart(2, '0')}</span>
                      {hasCustom && (
                        <span className="manage-custom-avatar-tag" title="Đã có ảnh đại diện riêng">
                          ★ Ảnh riêng
                        </span>
                      )}
                    </div>

                    <div
                      className="manage-avatar-wrap"
                      onClick={() => openEditStudentModal(st.id)}
                      title="Bấm để thay đổi ảnh đại diện hoặc sửa thông tin"
                    >
                      <StudentAvatarImg
                        id={st.id}
                        customAvatar={storeData.avatars?.[st.id]}
                        size={82}
                        className="manage-avatar-img"
                      />
                      <span className="manage-avatar-overlay">
                        <Camera size={16} />
                      </span>
                    </div>

                    <h4 className="manage-student-name" title={st.name}>
                      {st.name}
                    </h4>

                    <div className="manage-student-meta">
                      <span className="manage-meta-item">
                        <Cake size={12} className="meta-icon-cake" /> {st.birthday}
                      </span>
                      <span className="manage-meta-item">
                        <Star size={12} className="meta-icon-star" /> {st.stars} sao
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-edit-student-manage"
                      onClick={() => openEditStudentModal(st.id)}
                    >
                      <Pencil size={13} /> Sửa thông tin con
                    </button>
                  </div>
                )
              })}
            </div>

            {filteredManageStudents.length === 0 && (
              <div className="manage-empty-state">
                <Users size={36} style={{ color: '#c4b6a5', marginBottom: 8 }} />
                <p>Không tìm thấy học sinh nào phù hợp từ khóa "{manageSearch}".</p>
                <button type="button" className="btn-secondary" onClick={() => setManageSearch('')}>
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ════════════════ MODAL: EDIT STUDENT PROFILE ════════════════ */}
      {editingStudentId !== null && (
        <div className="admin-modal-overlay" onClick={() => setEditingStudentId(null)}>
          <div className="admin-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="modal-title-wrap">
                <span className="modal-title-icon">
                  <Pencil size={18} />
                </span>
                <div>
                  <h3>Chỉnh sửa thông tin học sinh</h3>
                  <small>
                    Mã số: <b>2A16-{String(editingStudentId + 1).padStart(2, '0')}</b> · {storeData.names[editingStudentId]}
                  </small>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setEditingStudentId(null)}
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStudentProfile} className="admin-modal-form">
              {editError && (
                <div className="admin-error-banner" role="alert">
                  <AlertTriangle size={16} />
                  {editError}
                </div>
              )}

              {/* Avatar Section */}
              <div className="modal-avatar-section">
                <div className="modal-avatar-preview-wrap">
                  <StudentAvatarImg
                    id={editingStudentId}
                    customAvatar={editAvatar || undefined}
                    size={96}
                    className="modal-avatar-preview"
                  />
                  {isProcessingAvatar && (
                    <div className="modal-avatar-loading">Đang nén ảnh...</div>
                  )}
                </div>

                <div className="modal-avatar-actions">
                  <span className="modal-avatar-label">Ảnh đại diện của con:</span>
                  <div className="avatar-btn-group">
                    <label className="btn-upload-file">
                      <Camera size={14} /> Tải ảnh từ máy tính / điện thoại
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                        disabled={isProcessingAvatar}
                        hidden
                      />
                    </label>

                    {editAvatar && (
                      <button
                        type="button"
                        className="btn-reset-file"
                        onClick={() => setEditAvatar('')}
                        title="Dùng lại ảnh hoạt hình mặc định của lớp"
                      >
                        <RotateCcw size={13} /> Khôi phục mặc định
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Name and Birthday Inputs */}
              <div className="admin-grid-2" style={{ marginTop: '8px' }}>
                <div className="admin-input-group">
                  <label>
                    <User size={13} className="label-icon label-icon--purple" />
                    Họ và tên học sinh *
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    placeholder="Ví dụ: Ngô Khánh An"
                    required
                    autoFocus
                  />
                </div>

                <div className="admin-input-group">
                  <label>
                    <Cake size={13} className="label-icon label-icon--pink" />
                    Ngày tháng năm sinh (dd/mm/yyyy) *
                  </label>
                  <input
                    type="text"
                    value={editBirthday}
                    onChange={e => setEditBirthday(e.target.value)}
                    placeholder="Ví dụ: 25/12/2019"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions-bottom">
                <button type="button" className="btn-secondary" onClick={() => setEditingStudentId(null)}>
                  <X size={15} /> Hủy bỏ
                </button>
                <button type="submit" className="btn-save-primary" disabled={isProcessingAvatar}>
                  <Save size={16} /> Lưu thông tin học sinh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="admin-toast" role="status">
          <CheckCircle2 size={18} /> {toastMessage}
        </div>
      )}
    </div>
  )
}
