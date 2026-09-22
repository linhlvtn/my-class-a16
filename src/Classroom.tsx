import { useState, useEffect } from 'react'
import hero from './assets/classroom-v2.png'
import star from './assets/game-star-3d.png'
import birthdayCake from './assets/birthday-cake-cute.png'
import {
  IconGrowth3D,
  IconHeart3D,
  getSkill3DIcon
} from './components/Skill3DIcons'
import { classStore } from './services/classStore'
import './classroom.css'

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase()
const areas = ['📖 Tiếng Việt', '🔢 Toán', '🌱 Nề nếp', '💬 Tự tin']
const levels = ['Cần thêm luyện tập', 'Đang tiến bộ', 'Thực hiện tốt', 'Rất vững vàng']

export default function Classroom({ names: propNames, birthdays: propBirthdays }: { names?: string[]; birthdays?: string[] }) {
  const [storeData, setStoreData] = useState(() => classStore.getData())
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<number | null>(null)
  const [month, setMonth] = useState('all')

  useEffect(() => {
    const unsub = classStore.subscribe(() => {
      setStoreData({ ...classStore.getData() })
    })
    return unsub
  }, [])

  const names = propNames || storeData.names
  const birthdays = propBirthdays || storeData.birthdays
  const students = names.map((name, id) => ({ name, id })).filter(student => normalize(student.name).includes(normalize(query)))
  const avatar = (id: number) => {
    const customAvatar = storeData.avatars?.[id]
    if (customAvatar) {
      return (
        <span
          className="class-avatar has-custom-avatar"
          role="img"
          aria-label={`Ảnh đại diện của ${names[id] || 'học sinh'}`}
          style={{ backgroundImage: `url(${customAvatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )
    }
    return (
      <span
        className="class-avatar"
        role="img"
        aria-label="Chân dung minh họa"
        style={{ backgroundImage: `url(${hero})`, backgroundPosition: `${[10, 21, 31, 41, 57, 67, 79, 92][id % 8]}% 40%` }}
      />
    )
  }

  const notes = selected === null ? [] : classStore.getStudentReviews(selected)
  const filteredNotes = notes.filter(note => month === 'all' || note.date.slice(0, 7) === month)
  const selectedSkills = selected === null ? {} : (storeData.skills[selected] || {})
  const totalStars = selected === null ? 0 : classStore.getStudentTotalStars(selected)

  return <div className="classroom-page">
    <header className="class-header">
      <a href="#home">← Trang chủ 2A16</a>
      <span>TIỂU HỌC XUÂN ĐỈNH</span>
      <a href="#stars">🏆 Top 10</a>
    </header>
    <main className="class-shell">
      <section className="class-welcome">
        <div>
          <span className="class-kicker">NGÔI NHÀ CỦA NHỮNG ĐIỀU NHỎ XINH</span>
          <h1>Cùng con <em>lớn khôn!</em></h1>
          <p>Mỗi lời cô nhắn, một dấu mốc trên hành trình trưởng thành.</p>
          <div className="class-chips">
            <span>🎒 Lớp 2A16</span>
            <span>📆 Năm học 2026 – 2027</span>
            <span>👩🏻‍🏫 Cô Vũ Thị Thiết</span>
          </div>
        </div>
        <div className="class-welcome-art" aria-hidden="true">
          🌈<span>Những bước nhỏ<br />Những tiến bộ lớn ✨</span>
        </div>
      </section>

      {selected === null ? <section>
        <div className="class-directory-heading">
          <div>
            <h2>Những gương mặt thân quen <span>({names.length})</span></h2>
            <p>Chọn một bạn để xem hành trình học tập và lời cô nhắn.</p>
          </div>
          <label className="class-search">
            <span>🔎 Tìm học sinh</span>
            <input placeholder="Nhập tên của con…" value={query} onChange={event => setQuery(event.target.value)} />
          </label>
        </div>
        <div className="class-students">
          {students.map(({ name, id }) => {
            const studentReviewsCount = classStore.getStudentReviews(id).length
            const studentStarsCount = classStore.getStudentTotalStars(id)
            return (
              <button
                className={`class-student palette-${id % 4}`}
                key={id}
                onClick={() => { setSelected(id); setMonth('all'); window.scrollTo({ top: 0 }) }}
              >
                <span className="class-student-top">
                  <span>2A16 · {String(id + 1).padStart(2, '0')}</span>
                  <span>↗</span>
                </span>
                {avatar(id)}
                <h3>{name}</h3>
                <p><img src={birthdayCake} alt="Sinh nhật" className="class-inline-cake" /> {birthdays[id]}</p>
                <span className="class-status"><IconGrowth3D size={16} style={{ verticalAlign: -3, marginRight: 5 }} /> {id % 2 ? 'Tự tin hơn mỗi ngày' : 'Chăm chỉ và tiến bộ'}</span>
                <div className="class-student-summary">
                  <span>💬 {studentReviewsCount} nhận xét</span>
                  <span><img src={star} alt="" /> {studentStarsCount} sao</span>
                </div>
                <span className="class-view">
                  <span className="class-view-desktop">Xem hành trình của con →</span>
                  <span className="class-view-mobile">Hành trình của con →</span>
                </span>
              </button>
            )
          })}
        </div>
        {students.length === 0 && <div className="class-empty">🔎 Chưa tìm thấy bạn nào. Hãy thử tên khác nhé!<button onClick={() => setQuery('')}>Xem tất cả học sinh</button></div>}
      </section> : <section>
        <button className="class-back" onClick={() => setSelected(null)}>← Danh sách học sinh</button>
        <div className="class-profile">
          <div className="class-profile-identity">
            {avatar(selected)}
            <div>
              <span className="class-kicker">HÀNH TRÌNH CỦA CON</span>
              <h2>{names[selected]}</h2>
              <p><img src={birthdayCake} alt="Sinh nhật" className="class-inline-cake" /> {birthdays[selected]} · Lớp 2A16</p>
            </div>
          </div>
          <div className="class-profile-stats">
            <div className="class-profile-stat stat-gold">
              <span className="stat-art"><img src={star} alt="" /></span>
              <b>{totalStars}</b>
              <span className="stat-label">Tổng sao tích lũy</span>
            </div>
            <div className="class-profile-stat stat-message">
              <span className="stat-art" aria-hidden="true">💌</span>
              <b>{notes.length}</b>
              <span className="stat-label">Lời cô nhắn</span>
            </div>
          </div>
        </div>
        <div className="class-detail-grid">
          <aside className="class-progress">
            <div className="class-progress-heading">
              <span className="class-growth-icon-wrap" aria-hidden="true">
                <IconGrowth3D size={40} />
              </span>
              <div>
                <h2>Con đang lớn lên</h2>
                <p>Ghi nhận mới nhất từ GVCN</p>
              </div>
            </div>

            <div className="class-skills-list">
              {areas.map((area, index) => {
                const level = selectedSkills[area] ?? (1 + (selected + index) % 3)
                const cleanLabel = area.replace(/^[\p{Emoji}\u200d\s]+/gu, '').trim() || area
                return (
                  <div className="class-skill" key={area}>
                    <div className="class-skill-head">
                      <span className="class-skill-icon-3d">
                        {getSkill3DIcon(area, 36)}
                      </span>
                      <div className="class-skill-info">
                        <b>{cleanLabel}</b>
                        <span className="class-skill-rating">{levels[level]}</span>
                      </div>
                    </div>
                    <div className="class-steps" aria-label={`${level + 1} trên 4 mức ghi nhận`}>
                      {levels.map((_, step) => (
                        <i key={step} className={step <= level ? 'filled' : ''} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="class-growth-note">
              <span className="class-growth-note-icon" aria-hidden="true">
                <IconHeart3D size={24} />
              </span>
              <span>Mỗi bạn có nhịp phát triển riêng. Cùng nhìn vào những cố gắng của con qua từng ngày nhé!</span>
            </div>
          </aside>
          <div className="class-history">
            <div className="class-history-heading">
              <div>
                <h2>💌 Lời cô nhắn cho con</h2>
                <p>Lưu giữ từng bước thay đổi trong năm học.</p>
              </div>
              <label>
                Thời gian
                <select value={month} onChange={event => setMonth(event.target.value)}>
                  <option value="all">Cả năm học</option>
                  {Array.from({ length: 9 }, (_, i) => {
                    const m = (i + 8) % 12 + 1
                    const year = m >= 9 ? 2026 : 2027
                    return <option key={i} value={`${year}-${String(m).padStart(2, '0')}`}>Tháng {m}/{year}</option>
                  })}
                </select>
              </label>
            </div>
            <div className="class-timeline">
              {filteredNotes.map((note, index) => (
                <article className="class-note" key={note.id || `${note.date}-${index}`}>
                  <div className="class-note-meta">
                    <time dateTime={`${note.date}T${note.time}`}>{note.date.split('-').reverse().join('/')} · {note.time}</time>
                    <span>{note.tag}</span>
                  </div>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  {note.next && (
                    <div className="class-parent-note">
                      <b>🤝 Gia đình cùng đồng hành</b>
                      <p>{note.next}</p>
                    </div>
                  )}
                  <small>👩🏻‍🏫 Cô Vũ Thị Thiết · Giáo viên chủ nhiệm</small>
                </article>
              ))}
            </div>
            {filteredNotes.length === 0 && <div className="class-empty">🌼 Chưa có nhận xét trong tháng này. Lời cô nhắn sẽ xuất hiện tại đây khi được cập nhật.</div>}
          </div>
        </div>
      </section>}
    </main>
    <div className="class-bottom">💛 Mỗi cố gắng nhỏ hôm nay đều xứng đáng được ghi nhận.</div>
  </div>
}
