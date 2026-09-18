import { useState } from 'react'
import hero from './assets/classroom-v2.png'
import star from './assets/game-star-3d.png'
import './classroom.css'

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase()
const areas = ['📖 Tiếng Việt', '🔢 Toán', '🌱 Nề nếp', '💬 Tự tin']
const levels = ['Cần thêm luyện tập', 'Đang tiến bộ', 'Thực hiện tốt', 'Rất vững vàng']

export default function Classroom({ names, birthdays }: { names: string[]; birthdays: string[] }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<number | null>(null)
  const [month, setMonth] = useState('all')
  const students = names.map((name, id) => ({ name, id })).filter(student => normalize(student.name).includes(normalize(query)))
  const avatar = (id: number) => <span className="class-avatar" role="img" aria-label="Chân dung minh họa" style={{ backgroundImage: `url(${hero})`, backgroundPosition: `${[10,21,31,41,57,67,79,92][id % 8]}% 40%` }} />
  const notes = selected === null ? [] : [
    { date: '2026-09-17', time: '16:30', tag: '✨ Tiến bộ đáng khen', title: 'Mỗi ngày tự tin hơn một chút', content: `${names[selected]} đã chủ động ${selected % 2 ? 'giơ tay trả lời câu hỏi và hợp tác tốt với bạn trong giờ Toán' : 'đọc bài trước lớp, phát âm rõ hơn và biết lắng nghe các bạn'}. Cô rất vui vì sự cố gắng của con!`, next: 'Bố mẹ dành 10 phút mỗi tối nghe con đọc và động viên con nói trọn câu nhé.' },
    { date: '2026-09-10', time: '16:45', tag: '🌱 Cùng con luyện tập', title: 'Những bước tiến đầu tiên', content: `${names[selected]} đã biết chuẩn bị sách vở và hoàn thành phần lớn nhiệm vụ trên lớp. Con còn hơi ngập ngừng khi trình bày ý kiến.`, next: 'Cùng con kể lại một điều thú vị ở lớp, khuyến khích con nói to và chậm rãi.' },
    { date: '2026-09-05', time: '17:00', tag: '🎒 Khởi đầu năm học', title: 'Chào con đến với lớp 2A16', content: `${names[selected]} làm quen với lớp và các bạn rất vui vẻ. Cô sẽ đồng hành để con mạnh dạn hơn trong giờ học.`, next: 'Nhắc con soạn cặp theo thời khóa biểu và giữ thói quen đi học đúng giờ.' },
  ]
  const filteredNotes = notes.filter(note => month === 'all' || note.date.slice(0, 7) === month)
  return <div className="classroom-page">
    <header className="class-header"><a href="#home">← Trang chủ 2A16</a><span>TIỂU HỌC XUÂN ĐỈNH</span><a href="#stars">🏆 Top 10</a></header>
    <main className="class-shell">
      <section className="class-welcome"><div><span className="class-kicker">NGÔI NHÀ CỦA NHỮNG ĐIỀU NHỎ XINH</span><h1>Cùng con <em>lớn khôn!</em></h1><p>Mỗi lời cô nhắn, một dấu mốc trên hành trình trưởng thành.</p><div className="class-chips"><span>🎒 Lớp 2A16</span><span>📆 Năm học 2026 – 2027</span><span>👩🏻‍🏫 Cô Vũ Thị Thiết</span></div></div><div className="class-welcome-art" aria-hidden="true">🌈<span>Những bước nhỏ<br />Những tiến bộ lớn ✨</span></div></section>
      {selected === null ? <section>
        <div className="class-directory-heading"><div><h2>Những gương mặt thân quen <span>({names.length})</span></h2><p>Chọn một bạn để xem hành trình học tập và lời cô nhắn.</p></div><label className="class-search"><span>🔎 Tìm học sinh</span><input placeholder="Nhập tên của con…" value={query} onChange={event => setQuery(event.target.value)} /></label></div>
        <div className="class-students">{students.map(({ name, id }) => <button className={`class-student palette-${id % 4}`} key={id} onClick={() => { setSelected(id); setMonth('all'); window.scrollTo({ top: 0 }) }}>
          <span className="class-student-top"><span>2A16 · {String(id + 1).padStart(2, '0')}</span><span>↗</span></span>{avatar(id)}<h3>{name}</h3><p>🎂 {birthdays[id]}</p><span className="class-status">🌱 {id % 2 ? 'Tự tin hơn mỗi ngày' : 'Chăm chỉ và tiến bộ'}</span><div className="class-student-summary"><span>💬 3 nhận xét</span><span><img src={star} alt="" /> {18 + id % 8} sao</span></div><span className="class-view"><span className="class-view-desktop">Xem hành trình của con →</span><span className="class-view-mobile">Hành trình của con →</span></span>
        </button>)}</div>{students.length === 0 && <div className="class-empty">🔎 Chưa tìm thấy bạn nào. Hãy thử tên khác nhé!<button onClick={() => setQuery('')}>Xem tất cả học sinh</button></div>}
      </section> : <section>
        <button className="class-back" onClick={() => setSelected(null)}>← Danh sách học sinh</button>
        <div className="class-profile"><div className="class-profile-identity">{avatar(selected)}<div><span className="class-kicker">HÀNH TRÌNH CỦA CON</span><h2>{names[selected]}</h2><p>🎂 {birthdays[selected]} · Lớp 2A16</p></div></div><div className="class-profile-stats"><div className="class-profile-stat stat-gold"><span className="stat-art"><img src={star} alt="" /></span><b>{18 + selected % 8}</b><span className="stat-label">Sao tháng 9</span></div><div className="class-profile-stat stat-message"><span className="stat-art" aria-hidden="true">💌</span><b>{notes.length}</b><span className="stat-label">Lời cô nhắn</span></div></div></div>
        <div className="class-detail-grid"><aside className="class-progress"><h2>🌱 Con đang lớn lên</h2><p>Ghi nhận đến 17/09/2026</p>{areas.map((area, index) => { const level = 1 + (selected + index) % 3; return <div className="class-skill" key={area}><b>{area}</b><span>{levels[level]}</span><div className="class-steps" aria-label={`${level + 1} trên 4 mức ghi nhận`}>{levels.map((_, step) => <i key={step} className={step <= level ? 'filled' : ''} />)}</div></div> })}<div className="class-growth-note">💛 Mỗi bạn có nhịp phát triển riêng. Cùng nhìn vào những cố gắng của con qua từng ngày nhé!</div></aside>
        <div className="class-history"><div className="class-history-heading"><div><h2>💌 Lời cô nhắn cho con</h2><p>Lưu giữ từng bước thay đổi trong năm học.</p></div><label>Thời gian<select value={month} onChange={event => setMonth(event.target.value)}><option value="all">Cả năm học</option>{Array.from({length: 9}, (_, i) => { const m = (i + 8) % 12 + 1; const year = m >= 9 ? 2026 : 2027; return <option key={i} value={`${year}-${String(m).padStart(2, '0')}`}>Tháng {m}/{year}</option> })}</select></label></div>
        <div className="class-timeline">{filteredNotes.map((note, index) => <article className="class-note" key={note.date}><div className="class-note-meta"><time dateTime={`${note.date}T${note.time}`}>{note.date.split('-').reverse().join('/')} · {note.time}</time><span>{index === 0 && month !== 'future' ? note.tag : note.tag}</span></div><h3>{note.title}</h3><p>{note.content}</p><div className="class-parent-note"><b>🤝 Gia đình cùng đồng hành</b><p>{note.next}</p></div><small>👩🏻‍🏫 Cô Vũ Thị Thiết · Giáo viên chủ nhiệm</small></article>)}</div>
        {filteredNotes.length === 0 && <div className="class-empty">🌼 Chưa có nhận xét trong tháng này. Lời cô nhắn sẽ xuất hiện tại đây khi được cập nhật.</div>}</div></div>
      </section>}
    </main><div className="class-bottom">💛 Mỗi cố gắng nhỏ hôm nay đều xứng đáng được ghi nhận.</div>
  </div>
}
