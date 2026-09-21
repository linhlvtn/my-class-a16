import { useEffect, useRef, useState } from 'react'
import hero from './assets/classroom-v2.png'
import coverStudents from './assets/hero-students-v3.png'
import welcome from './assets/class-welcome.png'
import schoolDay from './assets/school-day.png'
import whiteUniform from './assets/uniform-white.png'
import redUniform from './assets/uniform-red.png'
import teacherContact from './assets/teacher-contact.png'
import gameStar from './assets/game-star-3d.png'
import rankStar1 from './assets/rank-star-1.png'
import rankStar2 from './assets/rank-star-2.png'
import rankStar3 from './assets/rank-star-3.png'
import Classroom from './Classroom'
import MobileNavigation from './MobileNavigation'
import TeacherAdmin from './TeacherAdmin'
import { classStore, DailyNoticeData, HomeworkItem } from './services/classStore'
import { getTimetable, WEEKDAYS } from './data/timetable'
import { ContactSettings, getContactSettings } from './data/contactSettings'

function TeacherContact({ contact }: { contact: ContactSettings }) {
  return <section className="teacher-contact" aria-labelledby="teacher-contact-title">
    <div className="teacher-copy"><span className="teacher-label">👩🏻‍🏫 GVCN LỚP 2A16</span><h5 id="teacher-contact-title">Cô Vũ Thị Thiết</h5><a className="teacher-phone" href={`tel:${contact.phone}`} aria-label={`Gọi cô Vũ Thị Thiết, số ${contact.phone}`}><span>☎</span> {contact.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}</a><p>Phụ huynh cần hỗ trợ, hãy liên hệ với cô nhé!</p></div><img src={teacherContact} alt="Minh họa cô giáo chủ nhiệm thân thiện đang chào các em học sinh" loading="lazy" />
  </section>
}

function UniformReminder({ contact }: { contact: ContactSettings }) {
  return <section className="uniform-board" aria-labelledby="uniform-title">
    <div className="uniform-heading"><span aria-hidden="true">✨</span><div><h4 id="uniform-title">Hôm nay mình mặc gì?</h4><p>Nhớ đúng áo, vui đến trường!</p></div><span aria-hidden="true">⭐</span></div>
    <div className="uniform-pair">
      <article className="uniform-choice uniform-white"><img src={whiteUniform} alt="Áo đồng phục trắng, viền tay và túi kẻ xanh navy" loading="lazy"/><h5>Đồng phục trắng</h5><div className="uniform-days"><span>Thứ 2</span><span>Thứ 3</span></div></article>
      <article className="uniform-choice uniform-red"><img src={redUniform} alt="Áo đồng phục đỏ, cổ và viền tay xanh navy" loading="lazy"/><h5>Đồng phục đỏ</h5><div className="uniform-days"><span>Thứ 4</span><span>Thứ 6</span></div></article>
    </div>
    <p className="uniform-shoes">👟 Nhớ đi giày thể thao hoặc dép quai hậu nhé!</p><TeacherContact contact={contact} />
  </section>
}

function DailyUpdate({ notice, homework }: { notice: DailyNoticeData; homework: HomeworkItem[] }) {
  return <section className="daily-update" id="daily-update" aria-labelledby="daily-update-title">
    <div className="daily-update-heading">
      <div>
        <span className="eyebrow">THÔNG TIN HẰNG NGÀY TỪ CÔ</span>
        <h2 id="daily-update-title">Hôm nay lớp mình có gì?</h2>
        <p>Nội dung cần đọc kỹ dành cho bố mẹ và các con.</p>
      </div>
      <time dateTime={`${notice.date}T${notice.time}`}>
        🕓 Cô cập nhật lúc {notice.time}<br />
        {notice.date}
      </time>
    </div>
    <div className="daily-update-grid">
      <article className="daily-message-card" id="review-today">
        <div className="daily-card-top">
          <span className="daily-icon">💬</span>
          <div>
            <span className="daily-kicker">GVCN NHẬN XÉT NGÀY HỌC</span>
            <h3>{notice.title}</h3>
          </div>
          <time className="daily-date" dateTime={`${notice.date}T${notice.time}`}>
            {notice.time}<br /><small>{notice.date}</small>
          </time>
        </div>
        <div className="message-highlight">
          <span>❤️</span>
          <p>{notice.highlight}</p>
        </div>
        <p className="message-body">{notice.body}</p>
        <div className="gentle-reminder">
          <span>✏️</span>
          <p>{notice.reminder}</p>
        </div>
      </article>
      <article className="daily-homework-card" id="homework">
        <div className="daily-card-top">
          <span className="daily-icon">📚</span>
          <div>
            <span className="daily-kicker">BÀI TẬP VỀ NHÀ</span>
            <h3>Cô giao việc tối nay</h3>
          </div>
        </div>
        <p className="homework-intro">Cả nhà cùng nhắc con hoàn thành nhẹ nhàng, đều đặn nhé!</p>
        <div className="homework-list">
          {homework.map((item, index) => (
            <div className="homework-item" key={item.id || index}>
              <span className="homework-number">{index + 1}</span>
              <span><b>{item.subject}</b><small>{item.task}</small></span>
            </div>
          ))}
        </div>
        <div className="homework-footer"><span>💛 Cô cảm ơn bố mẹ đã phối hợp cùng cô ạ!</span></div>
      </article>
    </div>
  </section>
}

function QuickActions({ notificationOpen, onToggleNotification, notice, contact }: { notificationOpen: boolean; onToggleNotification: () => void; notice: DailyNoticeData; contact: ContactSettings }) {
  return <aside className="quick-actions" aria-label="Liên hệ và thông báo nhanh">
    <a className="quick-action quick-call" href={`tel:${contact.phone}`} aria-label={`Gọi nhanh cô Vũ Thị Thiết, số ${contact.phone}`}><span aria-hidden="true">☎</span><b>Gọi cô giáo chủ nhiệm</b></a>
    <a className="quick-action quick-zalo" href={contact.zaloUrl} target="_blank" rel="noreferrer" aria-label="Mở Nhóm Lớp trên Zalo"><span className="zalo-mark" aria-hidden="true">Z</span><b>Nhóm Lớp</b></a>
    <div className="quick-notification"><button className="quick-action quick-bell" type="button" onClick={onToggleNotification} aria-expanded={notificationOpen} aria-controls="latest-class-notice"><span aria-hidden="true">🔔</span><i aria-hidden="true" /><b>Thông báo</b></button>{notificationOpen && <div id="latest-class-notice" className="latest-notice" role="status"><span className="latest-notice-top">🔔 CÓ THÔNG BÁO MỚI</span><strong>Cô vừa cập nhật: {notice.title}</strong><p>{notice.highlight}</p><a href="#daily-update" onClick={onToggleNotification}>Xem thông báo của cô →</a></div>}</div>
  </aside>
}

const birthdayMonthStudents = new Set(['Phạm Minh Khôi', 'Nguyễn Ngọc Thảo'])
const albums = [{ title: 'Ngày đầu tiên đến lớp', image: welcome, label: 'CHÀO NĂM HỌC MỚI', text: 'Những nụ cười rạng rỡ trong ngày đón năm học mới của lớp 2A16.' }, { title: 'Một ngày thật đáng yêu', image: schoolDay, label: 'KHOẢNH KHẮC NHỎ', text: 'Một khoảnh khắc xinh xắn trong ngôi nhà chung 2A16.' }, { title: 'Cùng nhau viết ước mơ', image: hero, label: 'THẾ GIỚI CỦA CHÚNG MÌNH', text: 'Minh họa về hành trình cùng học, cùng chơi và cùng lớn khôn.' }]

function Portrait({ index }: { index: number }) {
  const customAvatar = classStore.getStudentAvatar(index)
  if (customAvatar) {
    return (
      <span
        className="portrait has-custom-avatar"
        style={{ backgroundImage: `url(${customAvatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        role="img"
        aria-label="Chân dung học sinh"
      />
    )
  }
  return <span className="portrait" style={{ backgroundImage: `url(${hero})`, backgroundPosition: `${[10,21,31,41,57,67,79,92][index%8]}% 40%` }} role="img" aria-label="Chân dung minh họa học sinh" />
}

function Title({ tag, children, subtitle }: { tag: string; children: React.ReactNode; subtitle?: string }) {
  return <div className="section-title"><span className="eyebrow">{tag}</span><h2>{children}</h2>{subtitle && <p>{subtitle}</p>}</div>
}

function getInitialRoute(): string {
  if (typeof window === 'undefined') return '#home'
  const pathname = window.location.pathname
  if (pathname === '/cogiaochunhiem' || pathname.startsWith('/cogiaochunhiem')) {
    return '/cogiaochunhiem'
  }
  return window.location.hash || '#home'
}

export default function App() {
  const [route, setRoute] = useState(getInitialRoute)
  const [storeData, setStoreData] = useState(() => classStore.getData())

  useEffect(() => {
    const unsub = classStore.subscribe(() => {
      setStoreData({ ...classStore.getData() })
    })
    return unsub
  }, [])

  useEffect(() => {
    const handleNavigation = () => {
      const pathname = window.location.pathname
      if (pathname === '/cogiaochunhiem' || pathname.startsWith('/cogiaochunhiem')) {
        setRoute('/cogiaochunhiem')
      } else if (window.location.hash) {
        setRoute(window.location.hash)
        if (window.location.hash === '#classroom') {
          window.scrollTo({ top: 0 })
        }
      } else {
        setRoute('#home')
      }
    }

    window.addEventListener('hashchange', handleNavigation)
    window.addEventListener('popstate', handleNavigation)
    return () => {
      window.removeEventListener('hashchange', handleNavigation)
      window.removeEventListener('popstate', handleNavigation)
    }
  }, [])

  useEffect(() => {
    if (route && route.startsWith('#') && route !== '#classroom') {
      document.getElementById(route.slice(1))?.scrollIntoView()
    }
  }, [route])

  const navigateTo = (newRoute: string) => {
    if (newRoute.startsWith('#')) {
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', '/' + newRoute)
      } else {
        window.location.hash = newRoute
      }
    } else {
      window.history.pushState(null, '', newRoute)
    }
    setRoute(newRoute)
    window.scrollTo({ top: 0 })
  }

  const [day, setDay] = useState(3)
  const [contact, setContact] = useState(getContactSettings)

  useEffect(() => {
    const refreshContact = () => setContact(getContactSettings())
    window.addEventListener('class-contact-updated', refreshContact)
    return () => window.removeEventListener('class-contact-updated', refreshContact)
  }, [])
  const [timetable, setTimetable] = useState(getTimetable)

  useEffect(() => {
    const refreshTimetable = () => setTimetable(getTimetable())
    window.addEventListener('class-timetable-updated', refreshTimetable)
    return () => window.removeEventListener('class-timetable-updated', refreshTimetable)
  }, [])
  const [period, setPeriod] = useState('Tuần')
  const ranking = classStore.getLeaderboard(period === 'Tuần' ? 'week' : 'month')
  const [read, setRead] = useState(false)
  const [done, setDone] = useState<number[]>([])
  const [modal, setModal] = useState<typeof albums[number] | null>(null)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (modal) dialog.current?.showModal()
    else dialog.current?.close()
  }, [modal])

  // Route 1: Teacher Admin Portal
  if (route === '/cogiaochunhiem' || route === '#cogiaochunhiem') {
    return <TeacherAdmin onBackToHome={() => navigateTo('#home')} />
  }

  // Route 2: Classroom Directory & Profiles
  if (route === '#classroom') {
    return (
      <>
        <Classroom names={storeData.names} birthdays={storeData.birthdays} />
        <QuickActions
          notificationOpen={notificationOpen}
          onToggleNotification={() => setNotificationOpen(!notificationOpen)}
          notice={storeData.dailyNotice}
        contact={contact}
        />
        <MobileNavigation route={route} />
      </>
    )
  }

  // Route 3: Main Public Homepage
  return <>
    <div className="top-strip">✦ Một ngôi nhà nhỏ · Ngàn niềm vui to ✦ <span>Năm học 2026 — 2027</span></div>
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="#home" onClick={() => navigateTo('#home')}>
          <span className="brand-icon" role="img" aria-label="Biểu tượng Trường Tiểu học Xuân Đỉnh" />
          <span><b>LỚP MÌNH 2A16 <em>✦</em></b><small>TRƯỜNG TIỂU HỌC XUÂN ĐỈNH</small></span>
        </a>
        <nav className="header-menu" aria-label="Điều hướng nhanh">
          <a href="#today" onClick={() => navigateTo('#today')}>Thời khóa biểu</a>
          <a href="#daily-update" onClick={() => navigateTo('#daily-update')}>Thông báo của cô giáo</a>
          <a href="#stars" onClick={() => navigateTo('#stars')}>Lớp chúng mình</a>
          <a href="#classroom" onClick={() => navigateTo('#classroom')}>Vào lớp</a>
        </nav>
      </div>
    </header>
    <main id="home">
      <section className="cover">
        <div className="cover-doodles" aria-hidden="true"><span className="doodle ruler">△</span><span className="doodle letter">A</span><span className="doodle bulb">💡</span><span className="doodle squiggle">〰</span><span className="doodle plane">✈</span><span className="doodle plus">✧</span></div>
        <div className="wrap cover-inner">
          <div className="cover-copy">
            <span className="cover-label">🌿 HỌC ĐIỀU HAY · LÀM ĐIỀU TỐT</span>
            <h1>Ươm mầm nhỏ,<br />tỏa sáng cùng<br /><em>2A16!</em><span className="headline-rays" aria-hidden="true">✺</span></h1>
            <p>Mỗi ngày đến lớp là một hành trình khám phá.<br />Cùng cô và các bạn viết nên những điều tuyệt vời!</p>
            <a className="button cover-button" href="#daily-update" onClick={() => navigateTo('#daily-update')}>
              Hôm nay lớp mình có gì? <span>↓</span>
            </a>
            <div className="cover-signature"><span>✦ ✦ ✦</span> Mỗi bạn nhỏ, một ngôi sao</div>
          </div>
          <div className="cover-art">
            <div className="art-halo" />
            <img src={coverStudents} alt="Hai bạn học sinh mặc áo trắng, bạn nam quần kẻ và bạn nữ váy kẻ navy, cùng đọc sách và khám phá" fetchPriority="high"/>
            <span className="art-orbit orbit-a" aria-hidden="true">✦</span>
            <span className="art-orbit orbit-b" aria-hidden="true">✧</span>
          </div>
          <div className="cover-cards">
            <a href="#students" onClick={() => navigateTo('#students')}><b>2A16</b><span>Ngôi nhà của chúng mình</span></a>
            <a href="#today" onClick={() => navigateTo('#today')}><b>Mỗi ngày</b><span>Thêm một điều hay</span></a>
            <a href="#stars" onClick={() => navigateTo('#stars')}><b>Ngàn sao</b><span>Cho những cố gắng nhỏ</span></a>
          </div>
        </div>
        <svg className="cover-wave" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="wave" x1="0" x2="1"><stop stopColor="#bcf0df"/><stop offset=".6" stopColor="#dcebc6"/><stop offset="1" stopColor="#f7dfae"/></linearGradient></defs>
          <path fill="url(#wave)" d="M0 45C300 210 500 15 800 75S1170 175 1440 35V180H0Z"/>
        </svg>
      </section>

      <section id="today" className="wrap section">
        <Title tag="MỖI NGÀY MỘT ĐIỀU HAY" subtitle="Soạn đúng sách vở, đến lớp đúng giờ và sẵn sàng cho một ngày thật vui nhé!">
          Thời khóa biểu <em>2A16</em>
        </Title>
        <div className="daily-grid">
          <article className="card timetable">
            <div className="card-heading">
              <h3>📅 Lịch học cả tuần</h3>
              <span className="muted">Năm học 2026 – 2027</span>
            </div>
            <div className="schedule-desktop" role="table" aria-label="Thời khóa biểu lớp 2A16">
              <div className="schedule-row schedule-head" role="row"><span>Tiết</span>{WEEKDAYS.map(name=><b key={name}>{name}</b>)}</div>
              {Array.from({length:8},(_,lessonIndex)=><div className={`schedule-row ${lessonIndex===4?'afternoon-start':''}`} role="row" key={lessonIndex}>{lessonIndex===4&&<div className="afternoon-banner">☁️ BUỔI CHIỀU · 13:45 – 17:15</div>}<span className="period"><b>{lessonIndex+1}</b><small>{timetable.times[lessonIndex]}</small></span>{timetable.schedule.map((schedule,dayIndex)=><span className={`schedule-cell tone-${(lessonIndex + dayIndex) % 5}`} role="cell" key={WEEKDAYS[dayIndex]}>{schedule[lessonIndex]}</span>)}</div>)}
            </div>
            <div className="schedule-mobile">
              <div className="day-tabs" aria-label="Chọn ngày học">{WEEKDAYS.map((name,i)=><button key={name} aria-pressed={day===i} className={day===i?'active':''} onClick={()=>setDay(i)}>{`T${i+2}`}</button>)}</div>
              <div className="mobile-session-title">☀️ Buổi sáng <span>07:45 – 10:55</span></div>
              {timetable.schedule[day].map((lesson,i)=><div className={`lesson ${i===4?'lesson-afternoon':''}`} key={`${day}-${i}`}>{i===4&&<span className="mobile-afternoon">☁️ Buổi chiều · 13:45 – 17:15</span>}<span className={`subject-icon color-${i%4}`}>📖</span><div><b>{lesson}</b><small>Tiết {i+1} · {timetable.times[i]}</small></div><span className="lesson-number">0{i+1}</span></div>)}
            </div>
            <UniformReminder contact={contact} />
            <div className="school-notes" id="school-notes">
              <h4>🌈 Lưu ý khi đến lớp</h4>
              <ul>
                <li>Soạn sách vở, đồ dùng học tập theo đúng thời khóa biểu.</li>
                <li>Buổi sáng: 07:45 – 10:55 · Buổi chiều: 13:45 – 17:15.</li>
                <li>CLB NGCK: 15:55 – 17:15.</li>
                <li>Phụ huynh cho con đến lớp trước 10 phút và đón con muộn nhất 10 phút sau giờ tan học.</li>
                <li>Cô nghỉ/họp, phụ huynh nhắn tin cho GVCN trước 07:30.</li>
              </ul>
            </div>
          </article>
          <div className="daily-right">
            <article className="card notice" id="notices">
              <div className="card-heading">
                <h3>💌 Lời cô nhắn</h3>
                <span className="mini-badge">QUAN TRỌNG</span>
              </div>
              <small className="muted">Thứ 5, 17 tháng 9 · 16:30</small>
              <h4>Cùng chuẩn bị cho một ngày thật vui!</h4>
              <p>Bố mẹ nhắc các con mang giấy màu, hồ dán và kéo thủ công vào ngày mai để cùng làm góc sáng tạo của lớp nhé. Cô rất mong chờ những tác phẩm nhỏ của các con!</p>
              <div className="notice-footer">
                <span>👩🏻‍🏫 Cô giáo chủ nhiệm</span>
                <button onClick={()=>setRead(!read)} aria-pressed={read}>{read?'✓ Đã đọc':'♡ Tôi đã đọc'}</button>
              </div>
            </article>
            <article className="card homework" id="homework">
              <div className="card-heading">
                <h3>✏️ Chiếc cặp nhỏ tối nay</h3>
                <span className="progress-badge">{done.length}/3</span>
              </div>
              <p className="muted">Bài tập về nhà · Hoàn thành trước 18/09</p>
              {[['Toán','Làm bài 1, 2 trang 18 trong vở bài tập.'],['Tiếng Việt','Đọc bài “Ngày hôm qua đâu rồi?” 2 lần.'],['Chuẩn bị','Giấy màu, hồ dán và kéo thủ công.']].map(([subject,text],i)=><label className={`task ${done.includes(i)?'task-done':''}`} key={subject}><input type="checkbox" checked={done.includes(i)} onChange={()=>setDone(done.includes(i)?done.filter(x=>x!==i):[...done,i])}/><span><b>{subject}</b><small>{text}</small></span></label>)}
              {done.length===3&&<div className="celebrate" role="status">🎉 Tuyệt vời! Chiếc cặp đã sẵn sàng!</div>}
            </article>
          </div>
        </div>
        <article className="review">
          <div className="review-art">🌻</div>
          <div>
            <span className="eyebrow">NHẬN XÉT LỚP HÔM NAY · 17/09</span>
            <h3>“Cô tự hào về những cố gắng nhỏ của các con!”</h3>
            <p>Hôm nay lớp mình hăng hái phát biểu, biết lắng nghe và giúp đỡ nhau. Giờ mĩ thuật thật nhiều ý tưởng đáng yêu! Ngày mai, chúng mình cùng nhớ xếp hàng ngay ngắn hơn nhé.</p>
            <div className="review-tags">
              <span>✨ Hăng hái học tập</span>
              <span>🤝 Biết giúp đỡ bạn</span>
              <span>🌱 Tiến bộ mỗi ngày</span>
            </div>
          </div>
          <span className="review-star">✧</span>
        </article>
      </section>

      {/* Dynamic Daily Notice & Homework from classStore */}
      <DailyUpdate notice={storeData.dailyNotice} homework={storeData.homework} />

      <section id="students" className="students-section section">
        <div className="wrap">
          <Title tag="NHỮNG MẢNH GHÉP ĐÁNG YÊU" subtitle="Mỗi bạn một cá tính, cùng tạo nên gia đình 2A16 thật đặc biệt.">
            Chúng mình là <em>2A16!</em>
          </Title>
        </div>
        {[storeData.names.slice(0,20), storeData.names.slice(20)].map((row,r)=>(
          <div key={r} className="student-lane" tabIndex={0} aria-label={`Học sinh nhóm ${r+1}`}>
            <div className={`student-track ${r?'reverse':''}`}>
              {[...row,...row].map((name,i)=>{
                const profileIndex=storeData.names.indexOf(name);
                const birthday=birthdayMonthStudents.has(name);
                return <article className={`student-card tint-${i%4} ${birthday?'birthday-card':''}`} key={`${name}-${i}`} aria-hidden={i>=row.length?true:undefined}>
                  {birthday&&<span className="birthday-crown" aria-label="Sinh nhật trong tháng">🎂</span>}
                  <Portrait index={profileIndex}/>
                  <b>{name}</b>
                  <small className="student-birthday">{birthday&&<span>✨ Sinh nhật tháng 9<br /></span>}Sinh ngày: {storeData.birthdays[profileIndex]}</small>
                </article>
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="wrap section" id="stars">
        <div className="star-panel leaderboard">
          <span className="star-decoration" aria-hidden="true">✦</span>
          <Title tag="MỖI NGÀY TÍCH MỘT NGÔI SAO" subtitle="Cô trao sao cho những cố gắng mỗi ngày. Cùng xem 10 bạn có tổng sao cao nhất nhé!">
            Bảng xếp hạng <em>Top 10</em>
          </Title>
          <div className="period-tabs">
            {['Tuần','Tháng'].map(p=><button className={period===p?'active':''} aria-pressed={period===p} key={p} onClick={()=>setPeriod(p)}>{p==='Tuần'?'Tuần này':'Tháng này'}</button>)}
          </div>
          <p className="period-caption">
            {period==='Tuần'?'14 – 18 tháng 9, 2026':'01 – 18 tháng 9, 2026'} · Cập nhật trực tiếp từ GVCN
          </p>
          <div className="podium" aria-label="Ba bạn dẫn đầu">
            {[ranking[1],ranking[0],ranking[2]].map((student,i)=>(
              student ? <article className={`podium-card podium-place-${i}`} key={student.id}>
                <span className="podium-medal" aria-label={`Hạng ${student.rank}`}>
                  <img
                    className="podium-medal-img"
                    src={student.rank === 1 ? rankStar1 : student.rank === 2 ? rankStar2 : rankStar3}
                    alt={`Ngôi sao Hạng ${student.rank}`}
                  />
                </span>
                <Portrait index={student.id}/>
                <h3>{student.name}</h3>
                <strong>{student.total} <img className="score-star podium-star" src={gameStar} alt="sao" /></strong>
                <div className="podium-base"><b>#{student.rank}</b><small>{i===1?'NGÔI SAO DẪN ĐẦU':i===0?'NGÔI SAO CHĂM CHỈ':'NGÔI SAO TIẾN BỘ'}</small></div>
              </article> : null
            ))}
          </div>
          <div className="ranking-table" role="table" aria-label="Bảng xếp hạng 10 học sinh">
            <div className="ranking-head" role="row">
              <span role="columnheader">Hạng</span>
              <span role="columnheader">Học sinh</span>
              <span role="columnheader">Tổng sao</span>
            </div>
            {ranking.map(student=>(
              <div className={`ranking-row ${student.rank<=3?'leading':''}`} role="row" key={student.id}>
                <span role="cell" className="rank-number">
                  {student.rank === 1 ? (
                    <img className="rank-table-badge" src={rankStar1} alt="Top 1" title="Hạng 1 - Ngôi sao Dẫn đầu" />
                  ) : student.rank === 2 ? (
                    <img className="rank-table-badge" src={rankStar2} alt="Top 2" title="Hạng 2 - Ngôi sao Chăm chỉ" />
                  ) : student.rank === 3 ? (
                    <img className="rank-table-badge" src={rankStar3} alt="Top 3" title="Hạng 3 - Ngôi sao Tiến bộ" />
                  ) : (
                    `#${student.rank}`
                  )}
                </span>
                <div role="cell" className="rank-student">
                  <Portrait index={student.id}/>
                  <div><b>{student.name}</b><small>{student.reason}</small></div>
                </div>
                <strong role="cell" className="rank-score">{student.total} <img className="score-star" src={gameStar} alt="sao" /></strong>
              </div>
            ))}
          </div>
          <p className="star-bottom">
            <img className="score-star note-star" src={gameStar} alt="" /> Tổng sao được cộng từ đánh giá hằng ngày của cô trong kỳ đã chọn. Bằng sao, cùng hạng.<br />Mỗi cố gắng đều đáng quý — cùng nhau tiến bộ mỗi ngày!
          </p>
        </div>
      </section>

      <section id="albums" className="wrap section gallery-section">
        <Title tag="LƯU GIỮ NHỮNG KHOẢNH KHẮC YÊU THƯƠNG" subtitle="Mỗi bức ảnh lưu lại một nụ cười, một ngày học thật vui.">
          KỶ NIỆM ĐẸP CỦA LỚP
        </Title>
        <div className="album-grid gallery-grid">
          {albums.map((album,i)=>(
            <button className={`album album-${i}`} key={album.title} onClick={()=>setModal(album)} aria-label={`Xem ảnh lớn: ${album.title}`}>
              <div className="album-image"><img loading="lazy" src={album.image} alt={album.title}/></div>
            </button>
          ))}
        </div>
      </section>

      <section className="closing">
        <span>🌈</span>
        <h2>Ngày mai lại có thêm<br />những điều <em>thật tuyệt!</em></h2>
        <p>Hẹn gặp các con ở ngôi nhà 2A16.</p>
        <a className="button coral" href="#home" onClick={() => navigateTo('#home')}>Về đầu trang ↑</a>
      </section>
    </main>

    <footer>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <b>Lớp 2A16 · Tiểu học Xuân Đỉnh</b>
          <span>Năm học 2026 – 2027 · Gửi yêu thương trong từng điều nhỏ 💛</span>
        </div>
        <a
          href="/cogiaochunhiem"
          onClick={e => { e.preventDefault(); navigateTo('/cogiaochunhiem') }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#7a6a57', background: 'rgba(255, 255, 255, 0.7)', padding: '6px 14px', borderRadius: '12px', textDecoration: 'none', border: '1px solid #e2d7c5', fontWeight: 600, transition: 'background 0.15s' }}
        >
          <span>👩🏻‍🏫</span> Cổng Giáo viên Chủ nhiệm
        </a>
      </div>
    </footer>

    <QuickActions
      notificationOpen={notificationOpen}
      onToggleNotification={() => setNotificationOpen(!notificationOpen)}
      notice={storeData.dailyNotice}
    contact={contact}
    />
    <MobileNavigation route={route} />

    <dialog ref={dialog} onCancel={()=>setModal(null)} onClick={e=>{if(e.target===e.currentTarget)setModal(null)}}>
      <button className="dialog-close" onClick={()=>setModal(null)} aria-label="Đóng ảnh">✕</button>
      {modal&&<img src={modal.image} alt={modal.title}/>}
    </dialog>
  </>
}
