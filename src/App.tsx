import { useEffect, useRef, useState } from 'react'
import hero from './assets/classroom-v2.png'
import coverStudents from './assets/hero-students-v3.png'
import { getLeaderboard } from './data/starAwards'
import welcome from './assets/class-welcome.png'
import schoolDay from './assets/school-day.png'
import whiteUniform from './assets/uniform-white.png'
import redUniform from './assets/uniform-red.png'
import teacherContact from './assets/teacher-contact.png'
import gameStar from './assets/game-star-3d.png'
import Classroom from './Classroom'
import MobileNavigation from './MobileNavigation'

function TeacherContact() {
  return <section className="teacher-contact" aria-labelledby="teacher-contact-title">
    <div className="teacher-copy"><span className="teacher-label">👩🏻‍🏫 GVCN LỚP 2A16</span><h5 id="teacher-contact-title">Cô Vũ Thị Thiết</h5><a className="teacher-phone" href="tel:0982296281" aria-label="Gọi cô Vũ Thị Thiết, số 0982296281"><span>☎</span> 0982 296 281</a><p>Phụ huynh cần hỗ trợ, hãy liên hệ với cô nhé!</p></div><img src={teacherContact} alt="Minh họa cô giáo chủ nhiệm thân thiện đang chào các em học sinh" loading="lazy" />
  </section>
}

function UniformReminder() {
  return <section className="uniform-board" aria-labelledby="uniform-title">
    <div className="uniform-heading"><span aria-hidden="true">✨</span><div><h4 id="uniform-title">Hôm nay mình mặc gì?</h4><p>Nhớ đúng áo, vui đến trường!</p></div><span aria-hidden="true">⭐</span></div>
    <div className="uniform-pair">
      <article className="uniform-choice uniform-white"><img src={whiteUniform} alt="Áo đồng phục trắng, viền tay và túi kẻ xanh navy" loading="lazy"/><h5>Đồng phục trắng</h5><div className="uniform-days"><span>Thứ 2</span><span>Thứ 3</span></div></article>
      <article className="uniform-choice uniform-red"><img src={redUniform} alt="Áo đồng phục đỏ, cổ và viền tay xanh navy" loading="lazy"/><h5>Đồng phục đỏ</h5><div className="uniform-days"><span>Thứ 4</span><span>Thứ 6</span></div></article>
    </div>
    <p className="uniform-shoes">👟 Nhớ đi giày thể thao hoặc dép quai hậu nhé!</p><TeacherContact />
  </section>
}

function DailyUpdate() {
  const homework = [
    ['VBT Toán hằng ngày', 'Làm trang 6, 8; xem lại các bài sai trang 5, 6.'],
    ['Luyện đọc', 'Đọc to, rõ ràng bài “Làm việc thật là vui” và trả lời miệng các câu hỏi dưới bài.'],
  ]
  return <section className="daily-update" id="daily-update" aria-labelledby="daily-update-title">
    <div className="daily-update-heading"><div><span className="eyebrow">THÔNG TIN HẰNG NGÀY TỪ CÔ</span><h2 id="daily-update-title">Hôm nay lớp mình có gì?</h2><p>Nội dung cần đọc kỹ dành cho bố mẹ và các con.</p></div><time dateTime="2026-09-17T16:30">🕓 Cô cập nhật lúc 16:30<br />Thứ Năm · 17/09/2026</time></div>
    <div className="daily-update-grid">
      <article className="daily-message-card" id="review-today">
        <div className="daily-card-top"><span className="daily-icon">💬</span><div><span className="daily-kicker">GVCN NHẬN XÉT NGÀY HỌC</span><h3>Cô khen lớp mình!</h3></div><time className="daily-date" dateTime="2026-09-17T16:30">16:30<br /><small>17/09/2026</small></time></div>
        <div className="message-highlight"><span>❤️</span><p>Hôm nay cô khen các con, nhiều bạn tích cực xây dựng bài, trả lời tương đối to, rõ ràng.</p></div>
        <p className="message-body">Mong bố mẹ tiếp tục động viên, khuyến khích các con mạnh dạn phát biểu và đọc to ở nhà giúp cô nhé ạ.</p>
        <div className="gentle-reminder"><span>✏️</span><p><b>Bố mẹ cùng lưu ý:</b> vẫn còn một số bạn bút bị hỏng khi viết, bút chì chưa gọt. Hãy kiểm tra đồ dùng cho con trước khi đến lớp ạ.</p></div>
      </article>
      <article className="daily-homework-card" id="homework">
        <div className="daily-card-top"><span className="daily-icon">📚</span><div><span className="daily-kicker">BÀI TẬP VỀ NHÀ</span><h3>Cô giao việc tối nay</h3></div></div>
        <p className="homework-intro">Cả nhà cùng nhắc con hoàn thành nhẹ nhàng, đều đặn nhé!</p>
        <div className="homework-list">{homework.map(([subject, text], index) => <div className="homework-item" key={subject}><span className="homework-number">{index + 1}</span><span><b>{subject}</b><small>{text}</small></span></div>)}</div>
        <div className="homework-footer"><span>💛 Cô cảm ơn bố mẹ đã phối hợp cùng cô ạ!</span></div>
      </article>
    </div>
  </section>
}

function QuickActions({ notificationOpen, onToggleNotification }: { notificationOpen: boolean; onToggleNotification: () => void }) {
  return <aside className="quick-actions" aria-label="Liên hệ và thông báo nhanh">
    <a className="quick-action quick-call" href="tel:0982296281" aria-label="Gọi nhanh cô Vũ Thị Thiết, số 0982296281"><span aria-hidden="true">☎</span><b>Gọi cô giáo chủ nhiệm</b></a>
    <a className="quick-action quick-zalo" href="https://zalo.me/0982296281" target="_blank" rel="noreferrer" aria-label="Mở Nhóm Lớp trên Zalo"><span className="zalo-mark" aria-hidden="true">Z</span><b>Nhóm Lớp</b></a>
    <div className="quick-notification"><button className="quick-action quick-bell" type="button" onClick={onToggleNotification} aria-expanded={notificationOpen} aria-controls="latest-class-notice"><span aria-hidden="true">🔔</span><i aria-hidden="true" /><b>Thông báo</b></button>{notificationOpen && <div id="latest-class-notice" className="latest-notice" role="status"><span className="latest-notice-top">🔔 CÓ THÔNG BÁO MỚI</span><strong>Cô vừa cập nhật nhận xét ngày học 17/09</strong><p>Các con đã tích cực xây dựng bài. Bố mẹ cùng xem lời cô nhắn nhé!</p><a href="#daily-update" onClick={onToggleNotification}>Xem thông báo của cô →</a></div>}</div>
  </aside>
}

const names = ['Ngô Khánh An', 'Lê Hà Minh Anh', 'Nguyễn Bảo Anh', 'Phan Đức Anh', 'Ngô Nguyệt Ánh', 'Đào Nguyễn Gia Bảo', 'Đặng Duy Bảo', 'Hoàng Gia Bảo', 'Quách Bảo Bảo', 'Trần Ngọc Bảo Châu', 'Doãn Phương Chi', 'Trịnh Hà Chi', 'Bùi Đức Duy', 'Đỗ Thùy Dương', 'Nguyễn Đăng Dương', 'Nguyễn Thùy Dương', 'Đỗ Minh Giang', 'Nguyễn Công Hải', 'Phí Gia Hân', 'Vũ Nguyễn Minh Hoàng', 'Nguyễn Đức Huy', 'Vũ Minh Huy', 'Lục Minh Khôi', 'Nguyễn Minh Khôi', 'Phạm Minh Khôi', 'Bạch Phúc Lâm', 'Hồ Phương Tuệ Lâm', 'Nguyễn Đức Lâm', 'Nguyễn Trúc Linh', 'Nguyễn Hoàng Nam', 'Trịnh Bảo Ngọc', 'Ngô Đăng Nguyên', 'Nguyễn Ngọc An Nhiên', 'Phạm An Nhiên', 'Chu Phương Thảo', 'Nguyễn Ngọc Thảo', 'Nguyễn Thanh Trúc', 'Nguyễn Ngọc Tuấn Vũ', 'Trần Phong Vũ', 'Vương Hoàng Yến']
const birthdays = ['25/12/2019', '03/12/2019', '22/03/2019', '03/08/2019', '09/06/2019', '28/10/2019', '08/11/2019', '26/06/2019', '17/05/2019', '28/07/2019', '09/11/2019', '16/05/2019', '15/11/2019', '22/02/2019', '31/12/2019', '31/12/2019', '05/01/2019', '17/11/2019', '17/12/2019', '14/07/2019', '22/08/2019', '26/05/2019', '18/06/2019', '13/08/2019', '11/09/2019', '14/05/2019', '23/07/2019', '06/11/2019', '11/06/2019', '10/10/2019', '17/01/2019', '12/07/2019', '20/11/2019', '24/04/2019', '08/05/2019', '17/09/2019', '26/11/2019', '03/05/2019', '13/04/2019', '16/02/2019']
const birthdayMonthStudents = new Set(['Phạm Minh Khôi', 'Nguyễn Ngọc Thảo'])
const weekdays = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu']
const lessonTimes = ['07:45 – 08:20', '08:30 – 09:05', '09:15 – 09:50', '10:00 – 10:35', '13:45 – 14:20', '14:30 – 15:05', '15:15 – 15:50', '15:55 – 17:15']
const weeklySchedule = [
  ['HĐTN', 'Tiếng Việt (Đọc)', 'Tiếng Việt (Đọc)', 'Toán', 'GDTC 2', 'Âm nhạc 2', 'TNXH', 'CLB NGCK'],
  ['Tiếng Việt (Viết)', 'Tiếng Việt (Nói và nghe)', 'Toán', 'Mĩ thuật', 'Tiếng Anh', 'Giảng dạy BTL', 'Đạo đức', 'CLB NGCK'],
  ['Tiếng Việt (Đọc)', 'Tiếng Việt (Đọc)', 'Toán', 'TNXH', 'HĐCC', 'GDTC', 'Âm nhạc', 'CLB NGCK'],
  ['Tiếng Việt (Viết)', 'STEM', 'Toán', 'Tiếng Việt (LTVC)', 'HĐCC', 'HĐTN', 'Tiếng Anh', 'CLB NGCK'],
  ['Tiếng Việt (TLV)', 'Tiếng Việt (Đọc)', 'Toán', 'Đọc sách', 'TA – STEM', 'GDTC', 'HĐTN', 'CLB NGCK'],
]
const albums = [{ title: 'Ngày đầu tiên đến lớp', image: welcome, label: 'CHÀO NĂM HỌC MỚI', text: 'Những nụ cười rạng rỡ trong ngày đón năm học mới của lớp 2A16.' }, { title: 'Một ngày thật đáng yêu', image: schoolDay, label: 'KHOẢNH KHẮC NHỎ', text: 'Một khoảnh khắc xinh xắn trong ngôi nhà chung 2A16.' }, { title: 'Cùng nhau viết ước mơ', image: hero, label: 'THẾ GIỚI CỦA CHÚNG MÌNH', text: 'Minh họa về hành trình cùng học, cùng chơi và cùng lớn khôn.' }]
function Portrait({ index }: { index: number }) {
  return <span className="portrait" style={{ backgroundImage: `url(${hero})`, backgroundPosition: `${[10,21,31,41,57,67,79,92][index%8]}% 40%` }} role="img" aria-label="Chân dung minh họa học sinh" />
}
function Title({ tag, children, subtitle }: { tag: string; children: React.ReactNode; subtitle?: string }) {
  return <div className="section-title"><span className="eyebrow">{tag}</span><h2>{children}</h2>{subtitle && <p>{subtitle}</p>}</div>
}
export default function App() {
  const [route, setRoute] = useState(window.location.hash)
  useEffect(() => {
    const navigate = () => { setRoute(window.location.hash); if (window.location.hash === '#classroom') window.scrollTo({ top: 0 }) }
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])
  useEffect(() => {
    if (route && route !== '#classroom') document.getElementById(route.slice(1))?.scrollIntoView()
  }, [route])
  const [day, setDay] = useState(3)
  const [period, setPeriod] = useState('Tuần')
  const ranking = getLeaderboard(period === 'Tuần' ? 'week' : 'month', names)
  const [read, setRead] = useState(false)
  const [done, setDone] = useState<number[]>([])
  const [modal, setModal] = useState<typeof albums[number] | null>(null)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (modal) dialog.current?.showModal(); else dialog.current?.close() }, [modal])
  if (route === '#classroom') return <><Classroom names={names} birthdays={birthdays} /><QuickActions notificationOpen={notificationOpen} onToggleNotification={() => setNotificationOpen(!notificationOpen)} /><MobileNavigation route={route} /></>
  return <>
    <div className="top-strip">✦ Một ngôi nhà nhỏ · Ngàn niềm vui to ✦ <span>Năm học 2026 — 2027</span></div>
    <header className="site-header"><div className="wrap header-inner"><a className="brand" href="#home"><span className="brand-icon" role="img" aria-label="Biểu tượng Trường Tiểu học Xuân Đỉnh" /><span><b>LỚP MÌNH 2A16 <em>✦</em></b><small>TRƯỜNG TIỂU HỌC XUÂN ĐỈNH</small></span></a><nav className="header-menu" aria-label="Điều hướng nhanh"><a href="#today">Thời khóa biểu</a><a href="#daily-update">Thông báo của cô giáo</a><a href="#stars">Lớp chúng mình</a><a href="#classroom">Vào lớp</a></nav></div></header>
    <main id="home">
      <section className="cover">
        <div className="cover-doodles" aria-hidden="true"><span className="doodle ruler">△</span><span className="doodle letter">A</span><span className="doodle bulb">💡</span><span className="doodle squiggle">〰</span><span className="doodle plane">✈</span><span className="doodle plus">✧</span></div>
        <div className="wrap cover-inner">
          <div className="cover-copy"><span className="cover-label">🌿 HỌC ĐIỀU HAY · LÀM ĐIỀU TỐT</span><h1>Ươm mầm nhỏ,<br />tỏa sáng cùng<br /><em>2A16!</em><span className="headline-rays" aria-hidden="true">✺</span></h1><p>Mỗi ngày đến lớp là một hành trình khám phá.<br />Cùng cô và các bạn viết nên những điều tuyệt vời!</p><a className="button cover-button" href="#daily-update">Hôm nay lớp mình có gì? <span>↓</span></a><div className="cover-signature"><span>✦ ✦ ✦</span> Mỗi bạn nhỏ, một ngôi sao</div></div>
          <div className="cover-art"><div className="art-halo" /><img src={coverStudents} alt="Hai bạn học sinh mặc áo trắng, bạn nam quần kẻ và bạn nữ váy kẻ navy, cùng đọc sách và khám phá" fetchPriority="high"/><span className="art-orbit orbit-a" aria-hidden="true">✦</span><span className="art-orbit orbit-b" aria-hidden="true">✧</span></div>
          <div className="cover-cards"><a href="#students"><b>2A16</b><span>Ngôi nhà của chúng mình</span></a><a href="#today"><b>Mỗi ngày</b><span>Thêm một điều hay</span></a><a href="#stars"><b>Ngàn sao</b><span>Cho những cố gắng nhỏ</span></a></div>
        </div><svg className="cover-wave" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="wave" x1="0" x2="1"><stop stopColor="#bcf0df"/><stop offset=".6" stopColor="#dcebc6"/><stop offset="1" stopColor="#f7dfae"/></linearGradient></defs><path fill="url(#wave)" d="M0 45C300 210 500 15 800 75S1170 175 1440 35V180H0Z"/></svg>
      </section>
      <section id="today" className="wrap section"><Title tag="MỖI NGÀY MỘT ĐIỀU HAY" subtitle="Soạn đúng sách vở, đến lớp đúng giờ và sẵn sàng cho một ngày thật vui nhé!">Thời khóa biểu <em>2A16</em></Title><div className="daily-grid"><article className="card timetable"><div className="card-heading"><h3>📅 Lịch học cả tuần</h3><span className="muted">Năm học 2026 – 2027</span></div><div className="schedule-desktop" role="table" aria-label="Thời khóa biểu lớp 2A16"><div className="schedule-row schedule-head" role="row"><span>Tiết</span>{weekdays.map(name=><b key={name}>{name}</b>)}</div>{Array.from({length:8},(_,lessonIndex)=><div className={`schedule-row ${lessonIndex===4?'afternoon-start':''}`} role="row" key={lessonIndex}>{lessonIndex===4&&<div className="afternoon-banner">☁️ BUỔI CHIỀU · 13:45 – 17:15</div>}<span className="period"><b>{lessonIndex+1}</b><small>{lessonTimes[lessonIndex]}</small></span>{weeklySchedule.map((schedule,dayIndex)=><span className={`schedule-cell tone-${(lessonIndex + dayIndex) % 5}`} role="cell" key={weekdays[dayIndex]}>{schedule[lessonIndex]}</span>)}</div>)}</div><div className="schedule-mobile"><div className="day-tabs" aria-label="Chọn ngày học">{weekdays.map((name,i)=><button key={name} aria-pressed={day===i} className={day===i?'active':''} onClick={()=>setDay(i)}>{`T${i+2}`}</button>)}</div><div className="mobile-session-title">☀️ Buổi sáng <span>07:45 – 10:55</span></div>{weeklySchedule[day].map((lesson,i)=><div className={`lesson ${i===4?'lesson-afternoon':''}`} key={`${day}-${i}`}>{i===4&&<span className="mobile-afternoon">☁️ Buổi chiều · 13:45 – 17:15</span>}<span className={`subject-icon color-${i%4}`}>{['📖','🔢','🎨','🌱'][i%4]}</span><div><b>{lesson}</b><small>Tiết {i+1} · {lessonTimes[i]}</small></div><span className="lesson-number">0{i+1}</span></div>)}</div><UniformReminder /><div className="school-notes" id="school-notes"><h4>🌈 Lưu ý khi đến lớp</h4><ul><li>Soạn sách vở, đồ dùng học tập theo đúng thời khóa biểu.</li><li>Buổi sáng: 07:45 – 10:55 · Buổi chiều: 13:45 – 17:15.</li><li>CLB NGCK: 15:55 – 17:15.</li><li>Phụ huynh cho con đến lớp trước 10 phút và đón con muộn nhất 10 phút sau giờ tan học.</li><li>Cô nghỉ/họp, phụ huynh nhắn tin cho GVCN trước 07:30.</li></ul></div></article><div className="daily-right"><article className="card notice" id="notices"><div className="card-heading"><h3>💌 Lời cô nhắn</h3><span className="mini-badge">QUAN TRỌNG</span></div><small className="muted">Thứ 5, 17 tháng 9 · 16:30</small><h4>Cùng chuẩn bị cho một ngày thật vui!</h4><p>Bố mẹ nhắc các con mang giấy màu, hồ dán và kéo thủ công vào ngày mai để cùng làm góc sáng tạo của lớp nhé. Cô rất mong chờ những tác phẩm nhỏ của các con!</p><div className="notice-footer"><span>👩🏻‍🏫 Cô giáo chủ nhiệm</span><button onClick={()=>setRead(!read)} aria-pressed={read}>{read?'✓ Đã đọc':'♡ Tôi đã đọc'}</button></div></article><article className="card homework" id="homework"><div className="card-heading"><h3>✏️ Chiếc cặp nhỏ tối nay</h3><span className="progress-badge">{done.length}/3</span></div><p className="muted">Bài tập về nhà · Hoàn thành trước 18/09</p>{[['Toán','Làm bài 1, 2 trang 18 trong vở bài tập.'],['Tiếng Việt','Đọc bài “Ngày hôm qua đâu rồi?” 2 lần.'],['Chuẩn bị','Giấy màu, hồ dán và kéo thủ công.']].map(([subject,text],i)=><label className={`task ${done.includes(i)?'task-done':''}`} key={subject}><input type="checkbox" checked={done.includes(i)} onChange={()=>setDone(done.includes(i)?done.filter(x=>x!==i):[...done,i])}/><span><b>{subject}</b><small>{text}</small></span></label>)}{done.length===3&&<div className="celebrate" role="status">🎉 Tuyệt vời! Chiếc cặp đã sẵn sàng!</div>}</article></div></div><article className="review"><div className="review-art">🌻</div><div><span className="eyebrow">NHẬN XÉT LỚP HÔM NAY · 17/09</span><h3>“Cô tự hào về những cố gắng nhỏ của các con!”</h3><p>Hôm nay lớp mình hăng hái phát biểu, biết lắng nghe và giúp đỡ nhau. Giờ mĩ thuật thật nhiều ý tưởng đáng yêu! Ngày mai, chúng mình cùng nhớ xếp hàng ngay ngắn hơn nhé.</p><div className="review-tags"><span>✨ Hăng hái học tập</span><span>🤝 Biết giúp đỡ bạn</span><span>🌱 Tiến bộ mỗi ngày</span></div></div><span className="review-star">✧</span></article></section>
      <DailyUpdate />
      <section id="students" className="students-section section"><div className="wrap"><Title tag="NHỮNG MẢNH GHÉP ĐÁNG YÊU" subtitle="Mỗi bạn một cá tính, cùng tạo nên gia đình 2A16 thật đặc biệt.">Chúng mình là <em>2A16!</em></Title></div>{[names.slice(0,20),names.slice(20)].map((row,r)=><div key={r} className="student-lane" tabIndex={0} aria-label={`Học sinh nhóm ${r+1}`}><div className={`student-track ${r?'reverse':''}`}>{[...row,...row].map((name,i)=>{const profileIndex=names.indexOf(name);const birthday=birthdayMonthStudents.has(name);return <article className={`student-card tint-${i%4} ${birthday?'birthday-card':''}`} key={`${name}-${i}`} aria-hidden={i>=row.length?true:undefined}>{birthday&&<span className="birthday-crown" aria-label="Sinh nhật trong tháng">🎂</span>}<Portrait index={profileIndex}/><b>{name}</b><small className="student-birthday">{birthday&&<span>✨ Sinh nhật tháng 9<br /></span>}Sinh ngày: {birthdays[profileIndex]}</small></article>})}</div></div>)}</section>
      <section className="wrap section" id="stars"><div className="star-panel leaderboard"><span className="star-decoration" aria-hidden="true">✦</span><Title tag="MỖI NGÀY TÍCH MỘT NGÔI SAO" subtitle="Cô trao sao cho những cố gắng mỗi ngày. Cùng xem 10 bạn có tổng sao cao nhất nhé!">Bảng xếp hạng <em>Top 10</em></Title>
        <div className="period-tabs">{['Tuần','Tháng'].map(p=><button className={period===p?'active':''} aria-pressed={period===p} key={p} onClick={()=>setPeriod(p)}>{p==='Tuần'?'Tuần này':'Tháng này'}</button>)}</div>
        <p className="period-caption">{period==='Tuần'?'14 – 18 tháng 9, 2026':'01 – 18 tháng 9, 2026'} · Cập nhật đến 18/09 · Dữ liệu mẫu</p>
        <div className="podium" aria-label="Ba bạn dẫn đầu">{[ranking[1],ranking[0],ranking[2]].map((student,i)=><article className={`podium-card podium-place-${i}`} key={student.id}><span className="podium-medal" aria-label={`Hạng ${student.rank}`}>{['🥈','👑','🥉'][i]}</span><Portrait index={student.id}/><h3>{student.name}</h3><strong>{student.total} <img className="score-star podium-star" src={gameStar} alt="sao" /></strong><div className="podium-base"><b>#{student.rank}</b><small>{i===1?'NGÔI SAO DẪN ĐẦU':'TỎA SÁNG MỖI NGÀY'}</small></div></article>)}</div>
        <div className="ranking-table" role="table" aria-label="Bảng xếp hạng 10 học sinh"><div className="ranking-head" role="row"><span role="columnheader">Hạng</span><span role="columnheader">Học sinh</span><span role="columnheader">Tổng sao</span></div>{ranking.map(student=><div className={`ranking-row ${student.rank<=3?'leading':''}`} role="row" key={student.id}><span role="cell" className="rank-number">#{student.rank}</span><div role="cell" className="rank-student"><Portrait index={student.id}/><div><b>{student.name}</b><small>{student.reason}</small></div></div><strong role="cell" className="rank-score">{student.total} <img className="score-star" src={gameStar} alt="sao" /></strong></div>)}</div>
        <p className="star-bottom"><img className="score-star note-star" src={gameStar} alt="" /> Tổng sao được cộng từ đánh giá hằng ngày của cô trong kỳ đã chọn. Bằng sao, cùng hạng.<br />Mỗi cố gắng đều đáng quý — cùng nhau tiến bộ mỗi ngày!</p>
      </div></section>
      <section id="albums" className="wrap section gallery-section"><Title tag="LƯU GIỮ NHỮNG KHOẢNH KHẮC YÊU THƯƠNG" subtitle="Mỗi bức ảnh lưu lại một nụ cười, một ngày học thật vui.">KỶ NIỆM ĐẸP CỦA LỚP</Title><div className="album-grid gallery-grid">{albums.map((album,i)=><button className={`album album-${i}`} key={album.title} onClick={()=>setModal(album)} aria-label={`Xem ảnh lớn: ${album.title}`}><div className="album-image"><img loading="lazy" src={album.image} alt={album.title}/></div></button>)}</div></section>
      <section className="closing"><span>🌈</span><h2>Ngày mai lại có thêm<br />những điều <em>thật tuyệt!</em></h2><p>Hẹn gặp các con ở ngôi nhà 2A16.</p><a className="button coral" href="#home">Về đầu trang ↑</a></section>
    </main><footer><div className="wrap"><b>Lớp 2A16 · Tiểu học Xuân Đỉnh</b><span>Năm học 2026 – 2027 · Gửi yêu thương trong từng điều nhỏ 💛</span></div></footer><QuickActions notificationOpen={notificationOpen} onToggleNotification={() => setNotificationOpen(!notificationOpen)} /><MobileNavigation route={route} /><dialog ref={dialog} onCancel={()=>setModal(null)} onClick={e=>{if(e.target===e.currentTarget)setModal(null)}}><button className="dialog-close" onClick={()=>setModal(null)} aria-label="Đóng ảnh">✕</button>{modal&&<img src={modal.image} alt={modal.title}/>}</dialog>
  </>
}
