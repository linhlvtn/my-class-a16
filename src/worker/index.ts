// Cloudflare Worker API entrypoint for Class 2A16
// Connects to Cloudflare D1 SQL Database & serves static assets from /dist

export interface Env {
  DB: any
  ASSETS: { fetch: (request: Request) => Promise<Response> }
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

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Teacher-Key',
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS
    }
  })
}

// Auto-create schema and seed initial data if database is new
async function ensureDbInitialized(db: any) {
  if (!db) return

  // 1. Create tables one by one using prepare().run() to avoid D1 exec newline bugs
  const tableSqls = [
    'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT NOT NULL, birthday TEXT NOT NULL, avatar TEXT DEFAULT "");',
    'CREATE TABLE IF NOT EXISTS daily_notice (id INTEGER PRIMARY KEY CHECK (id = 1), title TEXT NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL, highlight TEXT NOT NULL, body TEXT NOT NULL, reminder TEXT NOT NULL);',
    'CREATE TABLE IF NOT EXISTS homework (id TEXT PRIMARY KEY, subject TEXT NOT NULL, task TEXT NOT NULL, order_num INTEGER DEFAULT 0);',
    'CREATE TABLE IF NOT EXISTS star_awards (id TEXT PRIMARY KEY, student_id INTEGER NOT NULL, date TEXT NOT NULL, stars INTEGER NOT NULL, reason TEXT NOT NULL);',
    'CREATE TABLE IF NOT EXISTS student_reviews (id TEXT PRIMARY KEY, student_id INTEGER NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL, tag TEXT NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL, next TEXT NOT NULL);',
    'CREATE TABLE IF NOT EXISTS student_skills (student_id INTEGER NOT NULL, area_name TEXT NOT NULL, score INTEGER NOT NULL, PRIMARY KEY (student_id, area_name));'
  ]

  for (const sql of tableSqls) {
    await db.prepare(sql).run()
  }

  // 2. Check if students table is empty
  const countResult = await db.prepare('SELECT count(*) as count FROM students').first()
  if (countResult && countResult.count === 0) {
    // Seed 40 students
    const studentStmts = DEFAULT_NAMES.map((name, index) => {
      const birthday = DEFAULT_BIRTHDAYS[index] || '2019-01-01'
      return db.prepare('INSERT INTO students (id, name, birthday, avatar) VALUES (?, ?, ?, ?)').bind(index, name, birthday, '')
    })
    await db.batch(studentStmts)

    // Seed daily notice
    await db.prepare(`
      INSERT INTO daily_notice (id, title, date, time, highlight, body, reminder)
      VALUES (1, ?, ?, ?, ?, ?, ?)
    `).bind(
      'Cô khen lớp mình!',
      '17/09/2026',
      '16:30',
      'Hôm nay lớp mình học tập rất hăng hái, nhiều bạn phát biểu tự tin và biết giúp đỡ bạn bè.',
      'Cả lớp hoàn thành tốt các tiết học trong ngày, giữ trật tự và thực hiện đúng nội quy giờ ăn bán trú.',
      'Các con nhớ kiểm tra bút chì, thước kẻ và chuẩn bị sách vở theo đúng thời khóa biểu ngày mai nhé.'
    ).run()

    // Seed initial homework
    await db.batch([
      db.prepare('INSERT INTO homework (id, subject, task, order_num) VALUES (?, ?, ?, ?)').bind('hw-1', 'Tiếng Việt', 'Luyện đọc bài "Mùa thu của em" trang 24, trả lời 3 câu hỏi cuối bài', 1),
      db.prepare('INSERT INTO homework (id, subject, task, order_num) VALUES (?, ?, ?, ?)').bind('hw-2', 'Toán', 'Làm bài tập 1, 2 trang 18 vở bài tập Toán tập 1', 2),
      db.prepare('INSERT INTO homework (id, subject, task, order_num) VALUES (?, ?, ?, ?)').bind('hw-3', 'Chuẩn bị', 'Soạn sách vở và đồ dùng mỹ thuật cho ngày mai', 3),
    ])

    // Seed initial star awards
    const schoolDays = [1, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18]
    const reasons = ['Giúp đỡ bạn bè', 'Hăng hái phát biểu', 'Chăm chỉ học tập', 'Giữ lớp sạch đẹp', 'Có nhiều tiến bộ']
    const weeklyTotals = [19, 23, 16, 20, 18, 22, 15, 25, 17, 21, 14, 13, 12, 11, 10, 9]
    
    const awardStmts: any[] = []
    schoolDays.forEach((day, d) => {
      for (let id = 0; id < 16; id++) {
        const stars = day >= 14
          ? Math.floor(weeklyTotals[id] / 5) + (d - 8 < weeklyTotals[id] % 5 ? 1 : 0)
          : 1 + ((id * id + d * 7 + id * d * 3) % 5)
        const reason = reasons[(id + d) % reasons.length]
        awardStmts.push(
          db.prepare('INSERT INTO star_awards (id, student_id, date, stars, reason) VALUES (?, ?, ?, ?, ?)')
            .bind(`award-${day}-${id}`, id, `2026-09-${String(day).padStart(2, '0')}`, stars, reason)
        )
      }
    })
    if (awardStmts.length > 0) {
      // batch up to 100 at a time
      for (let i = 0; i < awardStmts.length; i += 80) {
        await db.batch(awardStmts.slice(i, i + 80))
      }
    }

    // Seed initial reviews for students
    const reviewStmts: any[] = []
    DEFAULT_NAMES.forEach((name, id) => {
      reviewStmts.push(
        db.prepare(`
          INSERT INTO student_reviews (id, student_id, date, time, tag, title, content, next)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          `rev-${id}-1`,
          id,
          '2026-09-17',
          '16:30',
          '✨ Tiến bộ đáng khen',
          'Mỗi ngày tự tin hơn một chút',
          `${name} đã chủ động ${id % 2 ? 'giơ tay trả lời câu hỏi và hợp tác tốt với bạn trong giờ Toán' : 'đọc bài trước lớp, phát âm rõ hơn và biết lắng nghe các bạn'}. Cô rất vui vì sự cố gắng của con!`,
          'Bố mẹ dành 10 phút mỗi tối nghe con đọc và động viên con nói trọn câu nhé.'
        )
      )
    })
    for (let i = 0; i < reviewStmts.length; i += 80) {
      await db.batch(reviewStmts.slice(i, i + 80))
    }

    // Seed initial skills
    const skillStmts: any[] = []
    const areas = ['📖 Tiếng Việt', '🔢 Toán', '🌱 Nề nếp', '💬 Tự tin']
    DEFAULT_NAMES.forEach((_, id) => {
      areas.forEach((area, index) => {
        const score = 1 + ((id + index) % 3)
        skillStmts.push(
          db.prepare('INSERT INTO student_skills (student_id, area_name, score) VALUES (?, ?, ?)')
            .bind(id, area, score)
        )
      })
    })
    for (let i = 0; i < skillStmts.length; i += 80) {
      await db.batch(skillStmts.slice(i, i + 80))
    }
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url)

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    // API Routes
    if (url.pathname.startsWith('/api/')) {
      try {
        if (!env.DB) {
          return jsonResponse({ error: 'Database D1 binding not found' }, 500)
        }

        // Initialize schema if needed
        await ensureDbInitialized(env.DB)

        // GET /api/data - Retrieve all class data
        if (url.pathname === '/api/data' && request.method === 'GET') {
          const [studentsRes, noticeRes, hwRes, awardsRes, reviewsRes, skillsRes] = await Promise.all([
            env.DB.prepare('SELECT * FROM students ORDER BY id ASC').all(),
            env.DB.prepare('SELECT * FROM daily_notice WHERE id = 1').first(),
            env.DB.prepare('SELECT * FROM homework ORDER BY order_num ASC').all(),
            env.DB.prepare('SELECT * FROM star_awards ORDER BY date DESC').all(),
            env.DB.prepare('SELECT * FROM student_reviews ORDER BY date DESC, time DESC').all(),
            env.DB.prepare('SELECT * FROM student_skills').all()
          ])

          const names: string[] = []
          const birthdays: string[] = []
          const avatars: Record<number, string> = {}
          for (const s of (studentsRes.results || [])) {
            names[s.id] = s.name
            birthdays[s.id] = s.birthday
            if (s.avatar) {
              avatars[s.id] = s.avatar
            }
          }

          const awards = (awardsRes.results || []).map((a: any) => ({
            id: a.id,
            studentId: a.student_id,
            date: a.date,
            stars: a.stars,
            reason: a.reason
          }))

          const reviews: Record<number, any[]> = {}
          for (const r of (reviewsRes.results || [])) {
            if (!reviews[r.student_id]) reviews[r.student_id] = []
            reviews[r.student_id].push({
              id: r.id,
              studentId: r.student_id,
              date: r.date,
              time: r.time,
              tag: r.tag,
              title: r.title,
              content: r.content,
              next: r.next
            })
          }

          const skills: Record<number, Record<string, number>> = {}
          for (const sk of (skillsRes.results || [])) {
            if (!skills[sk.student_id]) skills[sk.student_id] = {}
            skills[sk.student_id][sk.area_name] = sk.score
          }

          const homework = (hwRes.results || []).map((h: any) => ({
            id: h.id,
            subject: h.subject,
            task: h.task
          }))

          const dailyNotice = noticeRes ? {
            title: noticeRes.title,
            date: noticeRes.date,
            time: noticeRes.time,
            highlight: noticeRes.highlight,
            body: noticeRes.body,
            reminder: noticeRes.reminder
          } : {
            title: 'Cô khen lớp mình!',
            date: '17/09/2026',
            time: '16:30',
            highlight: 'Học tập hăng hái!',
            body: 'Cả lớp nỗ lực.',
            reminder: 'Mang đủ sách vở nhé.'
          }

          return jsonResponse({
            success: true,
            data: {
              dailyNotice,
              homework,
              awards,
              reviews,
              skills,
              names: names.length > 0 ? names : DEFAULT_NAMES,
              birthdays: birthdays.length > 0 ? birthdays : DEFAULT_BIRTHDAYS,
              avatars
            }
          })
        }

        // GET /api/usage - Small, privacy-safe D1 storage monitor for the teacher portal
        if (url.pathname === '/api/usage' && request.method === 'GET') {
          const [pageCountRow, pageSizeRow] = await Promise.all([
            env.DB.prepare('PRAGMA page_count').first(),
            env.DB.prepare('PRAGMA page_size').first()
          ])
          const pageCount = Number(pageCountRow?.page_count || 0)
          const pageSize = Number(pageSizeRow?.page_size || 4096)
          const usedBytes = pageCount * pageSize
          const freeLimitBytes = 5 * 1024 * 1024 * 1024
          return jsonResponse({
            success: true,
            usedBytes,
            freeLimitBytes,
            percent: Math.min(100, Number(((usedBytes / freeLimitBytes) * 100).toFixed(4)))
          })
        }

        // POST /api/notice - Update daily notice
        if (url.pathname === '/api/notice' && request.method === 'POST') {
          const body = await request.json() as any
          await env.DB.prepare(`
            INSERT INTO daily_notice (id, title, date, time, highlight, body, reminder)
            VALUES (1, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
              title=excluded.title,
              date=excluded.date,
              time=excluded.time,
              highlight=excluded.highlight,
              body=excluded.body,
              reminder=excluded.reminder
          `).bind(
            body.title || '',
            body.date || '',
            body.time || '',
            body.highlight || '',
            body.body || '',
            body.reminder || ''
          ).run()

          return jsonResponse({ success: true, message: 'Notice updated' })
        }

        // POST /api/homework - Update homework list
        if (url.pathname === '/api/homework' && request.method === 'POST') {
          const body = await request.json() as any
          const items = body.items || []

          await env.DB.prepare('DELETE FROM homework').run()
          if (items.length > 0) {
            const stmts = items.map((item: any, idx: number) =>
              env.DB.prepare('INSERT INTO homework (id, subject, task, order_num) VALUES (?, ?, ?, ?)')
                .bind(item.id || `hw-${idx}`, item.subject || '', item.task || '', idx)
            )
            await env.DB.batch(stmts)
          }

          return jsonResponse({ success: true, message: 'Homework updated' })
        }

        // POST /api/stars - Add a star award record
        if (url.pathname === '/api/stars' && request.method === 'POST') {
          const body = await request.json() as any
          const awardId = body.id || `award-${Date.now()}-${body.studentId}`
          await env.DB.prepare(`
            INSERT INTO star_awards (id, student_id, date, stars, reason)
            VALUES (?, ?, ?, ?, ?)
          `).bind(awardId, body.studentId, body.date, body.stars, body.reason).run()

          return jsonResponse({ success: true, id: awardId })
        }

        // DELETE /api/stars - Remove a star award record
        if (url.pathname === '/api/stars' && request.method === 'DELETE') {
          const body = await request.json() as any
          await env.DB.prepare('DELETE FROM star_awards WHERE id = ?').bind(body.id).run()
          return jsonResponse({ success: true })
        }

        // POST /api/reviews - Add or edit student review
        if (url.pathname === '/api/reviews' && request.method === 'POST') {
          const body = await request.json() as any
          const { studentId, review } = body
          await env.DB.prepare(`
            INSERT INTO student_reviews (id, student_id, date, time, tag, title, content, next)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
              date=excluded.date,
              time=excluded.time,
              tag=excluded.tag,
              title=excluded.title,
              content=excluded.content,
              next=excluded.next
          `).bind(
            review.id,
            studentId,
            review.date,
            review.time,
            review.tag,
            review.title,
            review.content,
            review.next
          ).run()

          return jsonResponse({ success: true })
        }

        // POST /api/skills - Update student skill rating
        if (url.pathname === '/api/skills' && request.method === 'POST') {
          const body = await request.json() as any
          const { studentId, area, level } = body
          await env.DB.prepare(`
            INSERT INTO student_skills (student_id, area_name, score)
            VALUES (?, ?, ?)
            ON CONFLICT(student_id, area_name) DO UPDATE SET score=excluded.score
          `).bind(studentId, area, level).run()

          return jsonResponse({ success: true })
        }

        // POST /api/students - Update student avatar / details
        if (url.pathname === '/api/students' && request.method === 'POST') {
          const body = await request.json() as any
          const { id, avatar, name, birthday } = body
          await env.DB.prepare(`
            UPDATE students
            SET
              avatar = COALESCE(?, avatar),
              name = COALESCE(?, name),
              birthday = COALESCE(?, birthday)
            WHERE id = ?
          `).bind(avatar || null, name || null, birthday || null, id).run()

          return jsonResponse({ success: true })
        }

        return jsonResponse({ error: 'Endpoint not found' }, 404)
      } catch (err: any) {
        return jsonResponse({ error: err.message || 'Internal error' }, 500)
      }
    }

    // Default: Fallback to Cloudflare Static Assets (serving React SPA)
    return env.ASSETS.fetch(request)
  }
}
