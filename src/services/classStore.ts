// Data store and state management service for Class 2A16
// Supports persistent storage via localStorage and reactive updates across pages.

export interface DailyNoticeData {
  title: string
  date: string
  time: string
  highlight: string
  body: string
  reminder: string
}

export interface HomeworkItem {
  id: string
  subject: string
  task: string
}

export interface StarAwardRecord {
  id: string
  studentId: number
  date: string
  stars: number
  reason: string
}

export interface StudentReviewItem {
  id: string
  studentId: number
  date: string
  time: string
  tag: string
  title: string
  content: string
  next: string
}

export interface StudentSkillRatings {
  [areaName: string]: number // 0 to 3 index in levels
}

export interface ClassData {
  dailyNotice: DailyNoticeData
  homework: HomeworkItem[]
  awards: StarAwardRecord[]
  reviews: Record<number, StudentReviewItem[]>
  skills: Record<number, StudentSkillRatings>
  names: string[]
  birthdays: string[]
  avatars?: Record<number, string>
}

const DEFAULT_NAMES = [
  'Ngô Khánh An', 'Lê Hà Minh Anh', 'Nguyễn Bảo Anh', 'Phan Đức Anh', 'Ngô Nguyệt Ánh',
  'Đào Nguyễn Gia Bảo', 'Đặng Duy Bảo', 'Hoàng Gia Bảo', 'Quách Bảo Bảo', 'Trần Ngọc Bảo Châu',
  'Doãn Phương Chi', 'Trịnh Hà Chi', 'Bùi Đức Duy', 'Đỗ Thùy Dương', 'Nguyễn Đăng Dương',
  'Nguyễn Thùy Dương', 'Đỗ Minh Giang', 'Nguyễn Công Hải', 'Phí Gia Hân', 'Vũ Nguyễn Minh Hoàng',
  'Nguyễn Đức Huy', 'Vũ Minh Huy', 'Lục Minh Khôi', 'Nguyễn Minh Khôi', 'Phạm Minh Khôi',
  'Bạch Phúc Lâm', 'Hồ Phương Tuệ Lâm', 'Nguyễn Đức Lâm', 'Nguyễn Trúc Linh', 'Nguyễn Hoàng Nam',
  'Trịnh Bảo Ngọc', 'Ngô Đăng Nguyên', 'Nguyễn Ngọc An Nhiên', 'Phạm An Nhiên', 'Chu Phương Thảo',
  'Nguyễn Ngọc Thảo', 'Nguyễn Thanh Trúc', 'Nguyễn Ngọc Tuấn Vũ', 'Trần Phong Vũ', 'Vương Hoàng Yến'
]

const DEFAULT_BIRTHDAYS = [
  '25/12/2019', '03/12/2019', '22/03/2019', '03/08/2019', '09/06/2019',
  '28/10/2019', '08/11/2019', '26/06/2019', '17/05/2019', '28/07/2019',
  '09/11/2019', '16/05/2019', '15/11/2019', '22/02/2019', '31/12/2019',
  '31/12/2019', '05/01/2019', '17/11/2019', '17/12/2019', '14/07/2019',
  '22/08/2019', '26/05/2019', '18/06/2019', '13/08/2019', '11/09/2019',
  '14/05/2019', '23/07/2019', '06/11/2019', '11/06/2019', '10/10/2019',
  '17/01/2019', '12/07/2019', '20/11/2019', '24/04/2019', '08/05/2019',
  '17/09/2019', '26/11/2019', '03/05/2019', '13/04/2019', '16/02/2019'
]

const schoolDays = [1, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18]
const reasons = ['Giúp đỡ bạn bè', 'Hăng hái phát biểu', 'Chăm chỉ học tập', 'Giữ lớp sạch đẹp', 'Có nhiều tiến bộ']
const weeklyTotals = [19, 23, 16, 20, 18, 22, 15, 25, 17, 21, 14, 13, 12, 11, 10, 9]

function generateInitialAwards(): StarAwardRecord[] {
  return schoolDays.flatMap((day, d) => Array.from({ length: 16 }, (_, id) => ({
    id: `award-${day}-${id}`,
    studentId: id,
    date: `2026-09-${String(day).padStart(2, '0')}`,
    stars: day >= 14
      ? Math.floor(weeklyTotals[id] / 5) + (d - 8 < weeklyTotals[id] % 5 ? 1 : 0)
      : 1 + ((id * id + d * 7 + id * d * 3) % 5),
    reason: reasons[(id + d) % reasons.length],
  })))
}

function generateInitialReviews(): Record<number, StudentReviewItem[]> {
  const reviews: Record<number, StudentReviewItem[]> = {}
  DEFAULT_NAMES.forEach((name, id) => {
    reviews[id] = [
      {
        id: `rev-${id}-1`,
        studentId: id,
        date: '2026-09-17',
        time: '16:30',
        tag: '✨ Tiến bộ đáng khen',
        title: 'Mỗi ngày tự tin hơn một chút',
        content: `${name} đã chủ động ${id % 2 ? 'giơ tay trả lời câu hỏi và hợp tác tốt với bạn trong giờ Toán' : 'đọc bài trước lớp, phát âm rõ hơn và biết lắng nghe các bạn'}. Cô rất vui vì sự cố gắng của con!`,
        next: 'Bố mẹ dành 10 phút mỗi tối nghe con đọc và động viên con nói trọn câu nhé.'
      },
      {
        id: `rev-${id}-2`,
        studentId: id,
        date: '2026-09-10',
        time: '16:45',
        tag: '🌱 Cùng con luyện tập',
        title: 'Những bước tiến đầu tiên',
        content: `${name} đã biết chuẩn bị sách vở và hoàn thành phần lớn nhiệm vụ trên lớp. Con còn hơi ngập ngừng khi trình bày ý kiến.`,
        next: 'Cùng con kể lại một điều thú vị ở lớp, khuyến khích con nói to và chậm rãi.'
      },
      {
        id: `rev-${id}-3`,
        studentId: id,
        date: '2026-09-05',
        time: '17:00',
        tag: '🎒 Khởi đầu năm học',
        title: 'Chào con đến với lớp 2A16',
        content: `${name} làm quen với lớp và các bạn rất vui vẻ. Cô sẽ đồng hành để con mạnh dạn hơn trong giờ học.`,
        next: 'Nhắc con soạn cặp theo thời khóa biểu và giữ thói quen đi học đúng giờ.'
      }
    ]
  })
  return reviews
}

function generateInitialSkills(): Record<number, StudentSkillRatings> {
  const skills: Record<number, StudentSkillRatings> = {}
  const areas = ['📖 Tiếng Việt', '🔢 Toán', '🌱 Nề nếp', '💬 Tự tin']
  DEFAULT_NAMES.forEach((_, id) => {
    skills[id] = {}
    areas.forEach((area, index) => {
      skills[id][area] = 1 + ((id + index) % 3)
    })
  })
  return skills
}

const STORAGE_KEY = 'class_hub_2a16_data_v1'

function getInitialState(): ClassData {
  if (typeof window === 'undefined') {
    return {
      dailyNotice: {
        title: 'Cô khen lớp mình!',
        date: '17/09/2026',
        time: '16:30',
        highlight: 'Hôm nay cô khen các con, nhiều bạn tích cực xây dựng bài, trả lời tương đối to, rõ ràng.',
        body: 'Mong bố mẹ tiếp tục động viên, khuyến khích các con mạnh dạn phát biểu và đọc to ở nhà giúp cô nhé ạ.',
        reminder: 'Bố mẹ cùng lưu ý: vẫn còn một số bạn bút bị hỏng khi viết, bút chì chưa gọt. Hãy kiểm tra đồ dùng cho con trước khi đến lớp ạ.'
      },
      homework: [
        { id: 'hw-1', subject: 'VBT Toán hằng ngày', task: 'Làm trang 6, 8; xem lại các bài sai trang 5, 6.' },
        { id: 'hw-2', subject: 'Luyện đọc', task: 'Đọc to, rõ ràng bài “Làm việc thật là vui” và trả lời miệng các câu hỏi dưới bài.' }
      ],
      awards: generateInitialAwards(),
      reviews: generateInitialReviews(),
      skills: generateInitialSkills(),
      names: DEFAULT_NAMES,
      birthdays: DEFAULT_BIRTHDAYS,
      avatars: {}
    }
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.names && parsed.dailyNotice && parsed.homework) {
        if (!parsed.avatars) parsed.avatars = {}
        return parsed
      }
    }
  } catch (err) {
    console.error('Error loading class data from localStorage:', err)
  }

  const initial: ClassData = {
    dailyNotice: {
      title: 'Cô khen lớp mình!',
      date: '17/09/2026',
      time: '16:30',
      highlight: 'Hôm nay cô khen các con, nhiều bạn tích cực xây dựng bài, trả lời tương đối to, rõ ràng.',
      body: 'Mong bố mẹ tiếp tục động viên, khuyến khích các con mạnh dạn phát biểu và đọc to ở nhà giúp cô nhé ạ.',
      reminder: 'Bố mẹ cùng lưu ý: vẫn còn một số bạn bút bị hỏng khi viết, bút chì chưa gọt. Hãy kiểm tra đồ dùng cho con trước khi đến lớp ạ.'
    },
    homework: [
      { id: 'hw-1', subject: 'VBT Toán hằng ngày', task: 'Làm trang 6, 8; xem lại các bài sai trang 5, 6.' },
      { id: 'hw-2', subject: 'Luyện đọc', task: 'Đọc to, rõ ràng bài “Làm việc thật là vui” và trả lời miệng các câu hỏi dưới bài.' }
    ],
    awards: generateInitialAwards(),
    reviews: generateInitialReviews(),
    skills: generateInitialSkills(),
    names: DEFAULT_NAMES,
    birthdays: DEFAULT_BIRTHDAYS,
    avatars: {}
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
  } catch (err) {
    console.error('Error writing to localStorage:', err)
  }

  return initial
}

class ClassStore {
  private data: ClassData = getInitialState()
  private listeners: Set<() => void> = new Set()

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data))
    } catch (e) {
      console.error('Error saving state:', e)
    }
    this.listeners.forEach(fn => fn())
  }

  public getData(): ClassData {
    return this.data
  }

  // Notice & Homework Actions
  public updateDailyNotice(update: Partial<DailyNoticeData>) {
    this.data.dailyNotice = { ...this.data.dailyNotice, ...update }
    this.notify()
  }

  public updateHomework(items: HomeworkItem[]) {
    this.data.homework = items
    this.notify()
  }

  public addHomeworkItem(subject: string, task: string) {
    const newItem: HomeworkItem = {
      id: `hw-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      subject,
      task
    }
    this.data.homework.push(newItem)
    this.notify()
  }

  public removeHomeworkItem(id: string) {
    this.data.homework = this.data.homework.filter(item => item.id !== id)
    this.notify()
  }

  // Star Awards Actions
  public addStarAward(studentId: number, stars: number, reason: string, date?: string) {
    const now = date || new Date().toISOString().split('T')[0]
    const record: StarAwardRecord = {
      id: `award-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      studentId,
      date: now,
      stars,
      reason
    }
    this.data.awards.push(record)
    this.notify()
  }

  public getLeaderboard(period: 'week' | 'month') {
    const start = period === 'week' ? '2026-09-14' : '2026-09-01'
    const todayStr = '2026-09-30' // Current month window
    const names = this.data.names
    const sorted = names.map((name, id) => {
      const records = this.data.awards.filter(a => a.studentId === id && a.date >= start && a.date <= todayStr)
      const total = records.reduce((sum, a) => sum + a.stars, 0)
      const lastReason = records.length > 0 ? records[records.length - 1].reason : 'Cùng cố gắng mỗi ngày'
      return { id, name, total, reason: lastReason }
    }).sort((a, b) => b.total - a.total || a.id - b.id)

    return sorted.slice(0, 10).map(student => ({
      ...student,
      rank: sorted.findIndex(s => s.total === student.total) + 1
    }))
  }

  public getAllStudentsRanking(period: 'week' | 'month' | 'all' = 'week') {
    const start = period === 'week' ? '2026-09-14' : period === 'month' ? '2026-09-01' : '2020-01-01'
    const todayStr = '2026-09-30'
    const names = this.data.names
    const sorted = names.map((name, id) => {
      const records = this.data.awards.filter(a => a.studentId === id && (period === 'all' || (a.date >= start && a.date <= todayStr)))
      const total = records.reduce((sum, a) => sum + a.stars, 0)
      const lastReason = records.length > 0 ? records[records.length - 1].reason : 'Cùng cố gắng mỗi ngày'
      return { id, name, total, reason: lastReason }
    }).sort((a, b) => b.total - a.total || a.id - b.id)

    return sorted.map(student => ({
      ...student,
      rank: sorted.findIndex(s => s.total === student.total) + 1
    }))
  }

  public getStudentTotalStars(studentId: number, period: 'month' | 'all' = 'month'): number {
    const start = period === 'month' ? '2026-09-01' : '2020-01-01'
    const records = this.data.awards.filter(a => a.studentId === studentId && a.date >= start)
    return records.reduce((sum, a) => sum + a.stars, 0)
  }

  // Student Reviews Actions
  public getStudentReviews(studentId: number): StudentReviewItem[] {
    return this.data.reviews[studentId] || []
  }

  public addStudentReview(studentId: number, review: Omit<StudentReviewItem, 'id' | 'studentId'>) {
    if (!this.data.reviews[studentId]) {
      this.data.reviews[studentId] = []
    }
    const newReview: StudentReviewItem = {
      ...review,
      id: `rev-${studentId}-${Date.now()}`,
      studentId
    }
    // Add to top of list
    this.data.reviews[studentId].unshift(newReview)
    this.notify()
  }

  public updateStudentReview(studentId: number, reviewId: string, updated: Partial<StudentReviewItem>) {
    if (!this.data.reviews[studentId]) return
    const index = this.data.reviews[studentId].findIndex(r => r.id === reviewId)
    if (index !== -1) {
      this.data.reviews[studentId][index] = {
        ...this.data.reviews[studentId][index],
        ...updated
      }
      this.notify()
    }
  }

  public deleteStudentReview(studentId: number, reviewId: string) {
    if (!this.data.reviews[studentId]) return
    this.data.reviews[studentId] = this.data.reviews[studentId].filter(r => r.id !== reviewId)
    this.notify()
  }

  public updateStudentSkills(studentId: number, skills: StudentSkillRatings) {
    this.data.skills[studentId] = {
      ...(this.data.skills[studentId] || {}),
      ...skills
    }
    this.notify()
  }

  // Update student personal information (name, birthday, avatar)
  public updateStudentProfile(
    studentId: number,
    profile: { name?: string; birthday?: string; avatar?: string }
  ) {
    if (studentId < 0 || studentId >= this.data.names.length) return
    if (profile.name !== undefined && profile.name.trim()) {
      this.data.names[studentId] = profile.name.trim()
    }
    if (profile.birthday !== undefined && profile.birthday.trim()) {
      this.data.birthdays[studentId] = profile.birthday.trim()
    }
    if (profile.avatar !== undefined) {
      if (!this.data.avatars) {
        this.data.avatars = {}
      }
      if (profile.avatar) {
        this.data.avatars[studentId] = profile.avatar
      } else {
        delete this.data.avatars[studentId]
      }
    }
    this.notify()
  }

  public getStudentAvatar(studentId: number): string | undefined {
    return this.data.avatars?.[studentId]
  }

  // Reset to default
  public resetToDefault() {
    localStorage.removeItem(STORAGE_KEY)
    this.data = getInitialState()
    this.notify()
  }
}

export const classStore = new ClassStore()
