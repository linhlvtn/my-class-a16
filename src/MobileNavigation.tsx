import gameStar from './assets/game-star-3d.png'

function MenuIcon({ index }: { index: number }) {
  if (index === 3) return <img className="nav-star-art" src={gameStar} alt="" />
  return <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
    {index === 0 && <><path d="M9 19h22v16H9z" fill="#ffe7af" stroke="#d58b44" strokeWidth="1.5"/><path d="m4 20 16-15 16 15-4 3L20 12 8 23z" fill="#f78377" stroke="#d85b5e" strokeWidth="1.5"/><path d="M24 7h5v8" fill="#ef9c6c"/><rect x="16" y="24" width="8" height="11" rx="2" fill="#61bcb2"/><rect x="11" y="20" width="5" height="5" rx="1" fill="#a2ddf4"/><path d="m10 17 10-9" stroke="#ffc3b5" strokeWidth="2"/></>}
    {index === 1 && <><rect x="6" y="9" width="28" height="27" rx="6" fill="#d7c7fc"/><rect x="6" y="6" width="28" height="27" rx="5" fill="#fdfaff" stroke="#a58bd5" strokeWidth="1.5"/><path d="M11 6h18a5 5 0 0 1 5 5v5H6v-5a5 5 0 0 1 5-5" fill="#a88ae1"/><path d="M13 4v6m14-6v6" stroke="#6d51a1" strokeWidth="3"/><rect x="11" y="20" width="5" height="4" rx="1" fill="#f2bd57"/><rect x="19" y="20" width="5" height="4" rx="1" fill="#f78f9c"/><rect x="27" y="20" width="3" height="4" rx="1" fill="#95ccb6"/><path d="M12 28h3m5 0h3m5 0h1" stroke="#b5a1d7" strokeWidth="2"/></>}
    {index === 2 && <><rect x="4" y="13" width="32" height="22" rx="5" fill="#f298ae" stroke="#d9678a" strokeWidth="1.5"/><rect x="10" y="5" width="20" height="23" rx="3" fill="#fff7e8" stroke="#ebccac"/><path d="M14 11h12m-12 5h8" stroke="#b4a3cd" strokeWidth="2"/><path d="m5 17 15 10 15-10v13a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z" fill="#ffb5c3"/><path d="m6 32 10-8m18 8-10-8" stroke="#eb8aa4" strokeWidth="1.5"/><path d="M20 25c-5-6-8 2 0 6 8-4 5-12 0-6" fill="#e9577f"/></>}
    {index === 4 && <><path d="M5 19h30v16H5z" fill="#c3e3fb" stroke="#619fc8" strokeWidth="1.5"/><path d="M13 12h14v23H13z" fill="#fff0bd" stroke="#d6ad54" strokeWidth="1.5"/><path d="m10 14 10-8 10 8" fill="#ffab65" stroke="#d88642" strokeWidth="2"/><path d="M20 7V2l8 2-8 2" fill="#f87980" stroke="#d15d69"/><rect x="17" y="26" width="6" height="9" rx="2" fill="#6cbeb4"/><circle cx="20" cy="19" r="4" fill="#fff"/><path d="M20 17v3h2" stroke="#ce9651" strokeWidth="1.5"/><path d="M8 24h2m20 0h2M8 29h2m20 0h2" stroke="#549cce" strokeWidth="3"/></>}
  </svg>
}

const links = [
  { href: '#home', label: 'Trang chủ', path: 'm3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9' },
  { href: '#today', label: 'Lịch học', path: 'M5 5h14v16H5zM8 3v4m8-4v4M5 10h14M8 13h2m4 0h2m-8 4h2m4 0h2' },
  { href: '#daily-update', label: 'Thông báo', path: 'M4 4h16v13H9l-5 4zM8 8h8m-8 4h5' },
  { href: '#stars', label: 'Top 10', path: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z' },
  { href: '#classroom', label: 'Vào lớp', path: 'M4 21V4h16v17M8 21V8h8v13M12 14h1M2 21h20' },
]

export default function MobileNavigation({ route }: { route: string }) {
  const current = route === '#students' ? '#classroom' : route === '#uniform-title' ? '#today' : route === '#homework' ? '#daily-update' : route || '#home'
  return <nav className="bottom-navigation" aria-label="Điều hướng điện thoại">{links.map((link, index) => <a className={`nav-color-${index}`} key={link.href} href={link.href} aria-current={current === link.href ? 'page' : undefined}><span className="bottom-nav-icon"><MenuIcon index={index} /></span><span>{link.label}</span></a>)}</nav>
}
