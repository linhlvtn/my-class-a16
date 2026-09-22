import React from 'react'

// 1. Icon Con đang lớn lên (Mầm cây 3D ngộ nghĩnh trong chậu đất cười)
export function IconGrowth3D({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Con đang lớn lên"
    >
      <defs>
        <radialGradient id="growthPot" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffb38a" />
          <stop offset="55%" stopColor="#f0784d" />
          <stop offset="100%" stopColor="#c85028" />
        </radialGradient>
        <linearGradient id="growthSoil" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6e462d" />
          <stop offset="100%" stopColor="#422414" />
        </linearGradient>
        <linearGradient id="growthStem" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3ca64c" />
          <stop offset="100%" stopColor="#81d742" />
        </linearGradient>
        <radialGradient id="leafLeft" cx="30%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#b6f064" />
          <stop offset="50%" stopColor="#64c932" />
          <stop offset="100%" stopColor="#348819" />
        </radialGradient>
        <radialGradient id="leafRight" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#c5f778" />
          <stop offset="55%" stopColor="#75d638" />
          <stop offset="100%" stopColor="#3f9b20" />
        </radialGradient>
        <filter id="growthShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#1b4122" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#growthShadow)">
        {/* Soft ground shadow */}
        <ellipse cx="32" cy="59" rx="18" ry="4" fill="#000000" fillOpacity="0.12" />

        {/* Plant Pot */}
        <path
          d="M17 38 L21 55 C21.5 57 23.5 58 25.5 58 L38.5 58 C40.5 58 42.5 57 43 55 L47 38 Z"
          fill="url(#growthPot)"
        />
        {/* Pot Rim */}
        <rect x="14" y="34" width="36" height="6.5" rx="3.2" fill="#ffa073" />
        <rect x="14" y="35.5" width="36" height="5" rx="2.5" fill="url(#growthPot)" />
        {/* Pot Rim Highlight */}
        <path d="M17 36 Q32 37.5 47 36" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />

        {/* Soil inside pot */}
        <ellipse cx="32" cy="36" rx="15" ry="3.5" fill="url(#growthSoil)" />

        {/* Sprout Stem */}
        <path
          d="M32 36 Q31 22 32 16"
          stroke="url(#growthStem)"
          strokeWidth="4.2"
          strokeLinecap="round"
        />

        {/* Left Leaf */}
        <path
          d="M31 23 C21 21 14 11 20 7 C26 3 31 16 31 23 Z"
          fill="url(#leafLeft)"
        />
        <path d="M22 9 Q27 15 31 21" stroke="#e6ffba" strokeWidth="1" strokeLinecap="round" opacity="0.75" />

        {/* Right Leaf (Bigger & lively) */}
        <path
          d="M32 20 C42 17 49 7 43 4 C37 1 32 13 32 20 Z"
          fill="url(#leafRight)"
        />
        <path d="M42 6 Q37 12 32 18" stroke="#f1ffe0" strokeWidth="1" strokeLinecap="round" opacity="0.75" />

        {/* Dew Drop on Right Leaf */}
        <circle cx="41" cy="9" r="1.8" fill="#ffffff" opacity="0.9" />
        <circle cx="41.5" cy="8.5" r="0.7" fill="#ffffff" />

        {/* Kawaii Face on Pot */}
        {/* Eyes */}
        <ellipse cx="27" cy="46" rx="2.2" ry="2.6" fill="#422013" />
        <ellipse cx="37" cy="46" rx="2.2" ry="2.6" fill="#422013" />
        {/* Eye Catchlights */}
        <circle cx="26.3" cy="45" r="0.9" fill="#ffffff" />
        <circle cx="36.3" cy="45" r="0.9" fill="#ffffff" />
        <circle cx="27.8" cy="47" r="0.4" fill="#ffffff" />
        <circle cx="37.8" cy="47" r="0.4" fill="#ffffff" />

        {/* Blush Cheeks */}
        <ellipse cx="23.5" cy="49" rx="2.5" ry="1.4" fill="#ff4d6a" opacity="0.5" />
        <ellipse cx="40.5" cy="49" rx="2.5" ry="1.4" fill="#ff4d6a" opacity="0.5" />

        {/* Cute Smile */}
        <path d="M29.5 49 Q32 52.5 34.5 49" stroke="#422013" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* Sunshine Sparkle */}
        <path d="M14 13 L15.5 16.5 L19 18 L15.5 19.5 L14 23 L12.5 19.5 L9 18 L12.5 16.5 Z" fill="#ffd438" opacity="0.9" />
        <circle cx="14" cy="18" r="1" fill="#fff" />

        <path d="M48 24 L49 26 L51 27 L49 28 L48 30 L47 28 L45 27 L47 26 Z" fill="#ffd859" opacity="0.85" />
      </g>
    </svg>
  )
}

// 2. Icon Tiếng Việt (Cuốn sách mở 3D rực rỡ với chữ cái A-B-C và cây bút chì cười)
export function IconVietnamese3D({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Môn Tiếng Việt"
    >
      <defs>
        <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2979ff" />
          <stop offset="100%" stopColor="#1557bf" />
        </linearGradient>
        <linearGradient id="bookPages" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="85%" stopColor="#fff8e7" />
          <stop offset="100%" stopColor="#ecdcb9" />
        </linearGradient>
        <radialGradient id="pencilWood" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffdb70" />
          <stop offset="70%" stopColor="#e5a01e" />
          <stop offset="100%" stopColor="#b87208" />
        </radialGradient>
        <filter id="bookShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#0f2b48" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter="url(#bookShadow)">
        {/* Soft shadow */}
        <ellipse cx="32" cy="58" rx="22" ry="4" fill="#000000" fillOpacity="0.12" />

        {/* Book Spine & Bottom Cover */}
        <path
          d="M8 44 C18 41 28 44 32 46 C36 44 46 41 56 44 L55 49 C45 46 36 49 32 50 C28 49 18 46 9 49 Z"
          fill="#0d3f8f"
        />

        {/* Left Page Block */}
        <path
          d="M9 25 C19 22 28 25 32 27 L32 46 C28 44 19 41 9 44 Z"
          fill="url(#bookPages)"
          stroke="#d2b88c"
          strokeWidth="0.8"
        />
        {/* Left Page Lines */}
        <path d="M13 30 Q21 28 27 30" stroke="#7e95a8" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        <path d="M13 35 Q21 33 27 35" stroke="#7e95a8" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        <path d="M13 40 Q21 38 27 40" stroke="#7e95a8" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

        {/* Right Page Block */}
        <path
          d="M32 27 C36 25 45 22 55 25 L55 44 C45 41 36 44 32 46 Z"
          fill="url(#bookPages)"
          stroke="#d2b88c"
          strokeWidth="0.8"
        />
        {/* Right Page Lines */}
        <path d="M37 30 Q43 28 51 30" stroke="#7e95a8" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        <path d="M37 35 Q43 33 51 35" stroke="#7e95a8" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        <path d="M37 40 Q43 38 51 40" stroke="#7e95a8" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

        {/* Floating 3D Alphabet Letter 'A' (Coral/Orange 3D) */}
        <g transform="translate(14, 5)">
          <ellipse cx="7" cy="14" rx="6" ry="2" fill="#000" fillOpacity="0.1" />
          <path
            d="M6 1 L10 12 H7.5 L6.8 9.5 H3.2 L2.5 12 H0 L4 1 Z M4 4.5 L3.4 8 H6.6 L6 4.5 Z"
            fill="#ff4b3e"
            stroke="#b92419"
            strokeWidth="1"
          />
          {/* 3D highlight */}
          <circle cx="5" cy="4" r="1" fill="#ffb4af" />
        </g>

        {/* Floating 3D Alphabet Letter 'B' (Sunny Yellow 3D) */}
        <g transform="translate(26, 2)">
          <path
            d="M1 1 H6 C8.5 1 10 2.2 10 4 C10 5.2 9.2 6 8 6.5 C9.5 7 10.5 8 10.5 9.5 C10.5 11.5 8.8 12.5 6 12.5 H1 Z M3.5 3 V5.2 H5.8 C6.8 5.2 7.5 4.8 7.5 4 C7.5 3.3 6.8 3 5.8 3 Z M3.5 7.2 V10.3 H6 C7.2 10.3 8 9.8 8 8.8 C8 7.8 7.2 7.2 6 7.2 Z"
            fill="#ffb300"
            stroke="#c47a00"
            strokeWidth="1"
          />
          <circle cx="5" cy="4" r="0.9" fill="#fff5cc" />
        </g>

        {/* Floating 3D Alphabet Letter 'C' (Emerald Green 3D) */}
        <g transform="translate(40, 5)">
          <path
            d="M9.5 3.5 C8.8 2 7.2 1 5 1 C2 1 0 3.5 0 6.8 C0 10.2 2 12.5 5 12.5 C7.2 12.5 8.8 11.5 9.5 10 L7.5 8.8 C7 9.8 6 10.5 5 10.5 C3.3 10.5 2.2 8.8 2.2 6.8 C2.2 4.8 3.3 3 5 3 C6 3 7 3.8 7.5 4.8 Z"
            fill="#00c853"
            stroke="#008a38"
            strokeWidth="1"
          />
          <circle cx="4" cy="4" r="0.9" fill="#d0ffd6" />
        </g>

        {/* Cute 3D Crayon / Pencil Buddy in front */}
        <g transform="translate(18, 48) rotate(-12)">
          {/* Pencil Body */}
          <rect x="0" y="2" width="22" height="7" rx="3.5" fill="url(#pencilWood)" stroke="#9c6104" strokeWidth="0.8" />
          {/* Pencil Tip */}
          <polygon points="22,2 28,5.5 22,9" fill="#f5cf95" stroke="#9c6104" strokeWidth="0.8" />
          <polygon points="25.5,4 28,5.5 25.5,7" fill="#2979ff" />
          {/* Eraser */}
          <rect x="-4" y="2" width="5" height="7" rx="2" fill="#ff6e8a" />
          <rect x="-1" y="2" width="2" height="7" fill="#b0bec5" />
          {/* Kawaii Face on Pencil */}
          <circle cx="8" cy="5" r="0.9" fill="#3e2305" />
          <circle cx="14" cy="5" r="0.9" fill="#3e2305" />
          <path d="M10 6.5 Q11 8 12 6.5" stroke="#3e2305" strokeWidth="0.8" strokeLinecap="round" fill="none" />
          <circle cx="6.5" cy="6.2" r="0.8" fill="#ff4d6a" opacity="0.6" />
          <circle cx="15.5" cy="6.2" r="0.8" fill="#ff4d6a" opacity="0.6" />
        </g>

        {/* Magical Sparkle */}
        <path d="M7 16 L8 19 L11 20 L8 21 L7 24 L6 21 L3 20 L6 19 Z" fill="#ffd54f" />
        <path d="M53 14 L54 16 L56 17 L54 18 L53 20 L52 18 L50 17 L52 16 Z" fill="#4fc3f7" />
      </g>
    </svg>
  )
}

// 3. Icon Toán học (Khối lập phương 3D sắc màu 1-2-3 với khuôn mặt tươi cười)
export function IconMath3D({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Môn Toán học"
    >
      <defs>
        {/* Block 1 (Yellow) */}
        <linearGradient id="cube1Top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff176" />
          <stop offset="100%" stopColor="#fbc02d" />
        </linearGradient>
        <linearGradient id="cube1Front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbc02d" />
          <stop offset="100%" stopColor="#f57f17" />
        </linearGradient>
        <linearGradient id="cube1Side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f57f17" />
          <stop offset="100%" stopColor="#bc5100" />
        </linearGradient>

        {/* Block 2 (Blue / Teal) */}
        <linearGradient id="cube2Top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#80d8ff" />
          <stop offset="100%" stopColor="#00b0ff" />
        </linearGradient>
        <linearGradient id="cube2Front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00b0ff" />
          <stop offset="100%" stopColor="#0077c2" />
        </linearGradient>
        <linearGradient id="cube2Side" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0077c2" />
          <stop offset="100%" stopColor="#004778" />
        </linearGradient>

        {/* Block 3 (Coral/Pink) */}
        <linearGradient id="cube3Top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8a80" />
          <stop offset="100%" stopColor="#ff5252" />
        </linearGradient>
        <linearGradient id="cube3Front" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff5252" />
          <stop offset="100%" stopColor="#d50000" />
        </linearGradient>

        <filter id="mathShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#263238" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#mathShadow)">
        {/* Base shadow */}
        <ellipse cx="32" cy="58" rx="21" ry="4.5" fill="#000000" fillOpacity="0.14" />

        {/* Block 2 (Bottom Left - Blue, Number 2) */}
        <g transform="translate(10, 27)">
          {/* Top */}
          <polygon points="12,0 24,6 12,12 0,6" fill="url(#cube2Top)" />
          {/* Front */}
          <polygon points="0,6 12,12 12,25 0,19" fill="url(#cube2Front)" />
          {/* Side */}
          <polygon points="12,12 24,6 24,19 12,25" fill="url(#cube2Side)" />
          {/* Number 2 on front */}
          <text x="3.5" y="19" fill="#ffffff" fontWeight="900" fontSize="11" fontFamily="'Baloo 2', sans-serif" transform="skewY(20)">2</text>
        </g>

        {/* Block 3 (Bottom Right - Coral Red, Number 3 / Plus) */}
        <g transform="translate(29, 27)">
          {/* Top */}
          <polygon points="12,0 24,6 12,12 0,6" fill="url(#cube3Top)" />
          {/* Front */}
          <polygon points="0,6 12,12 12,25 0,19" fill="url(#cube3Front)" />
          {/* Side */}
          <polygon points="12,12 24,6 24,19 12,25" fill="#b71c1c" />
          {/* Number 3 on front */}
          <text x="3.5" y="19" fill="#ffffff" fontWeight="900" fontSize="11" fontFamily="'Baloo 2', sans-serif" transform="skewY(20)">3</text>
        </g>

        {/* Block 1 (Top Center - Sunny Yellow, Number 1 with Kawaii Face) */}
        <g transform="translate(20, 8)">
          {/* Top */}
          <polygon points="12,0 24,6 12,12 0,6" fill="url(#cube1Top)" />
          {/* Front */}
          <polygon points="0,6 12,12 12,25 0,19" fill="url(#cube1Front)" />
          {/* Side */}
          <polygon points="12,12 24,6 24,19 12,25" fill="url(#cube1Side)" />
          {/* Number 1 on front */}
          <text x="4" y="19" fill="#ffffff" fontWeight="900" fontSize="12" fontFamily="'Baloo 2', sans-serif" transform="skewY(20)">1</text>
          {/* Face on top face */}
          <circle cx="9" cy="6" r="1" fill="#6d4c00" />
          <circle cx="15" cy="6" r="1" fill="#6d4c00" />
          <path d="M11 7.5 Q12 9 13 7.5" stroke="#6d4c00" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        </g>

        {/* Floating Math Symbols */}
        {/* Plus Symbol */}
        <g transform="translate(48, 12)">
          <rect x="3" y="0" width="3" height="9" rx="1.5" fill="#00e676" />
          <rect x="0" y="3" width="9" height="3" rx="1.5" fill="#00e676" />
          <circle cx="4.5" cy="4.5" r="1" fill="#fff" />
        </g>
        {/* Equal Symbol */}
        <g transform="translate(6, 17)">
          <rect x="0" y="0" width="8" height="2.5" rx="1.2" fill="#ff9100" />
          <rect x="0" y="4.5" width="8" height="2.5" rx="1.2" fill="#ff9100" />
        </g>

        {/* Sparkle */}
        <path d="M32 2 L33.5 5 L36 6 L33.5 7 L32 10 L30.5 7 L28 6 L30.5 5 Z" fill="#ffd700" />
      </g>
    </svg>
  )
}

// 4. Icon Nề nếp (Đồng hồ báo thức 3D vui vẻ & huy hiệu nơ sao kỷ luật)
export function IconDiscipline3D({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Nề nếp & Kỷ luật"
    >
      <defs>
        <radialGradient id="clockBody" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff59d" />
          <stop offset="60%" stopColor="#fbc02d" />
          <stop offset="100%" stopColor="#f57f17" />
        </radialGradient>
        <radialGradient id="clockFace" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f8e9" />
        </radialGradient>
        <linearGradient id="clockBell" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb74d" />
          <stop offset="100%" stopColor="#e65100" />
        </linearGradient>
        <linearGradient id="ribbonBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#42a5f5" />
          <stop offset="100%" stopColor="#1565c0" />
        </linearGradient>
        <filter id="disciplineShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#37474f" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter="url(#disciplineShadow)">
        {/* Soft shadow */}
        <ellipse cx="32" cy="59" rx="18" ry="4" fill="#000000" fillOpacity="0.14" />

        {/* Clock Feet */}
        <rect x="18" y="47" width="5" height="9" rx="2.5" fill="#e65100" transform="rotate(22 18 47)" />
        <rect x="41" y="47" width="5" height="9" rx="2.5" fill="#e65100" transform="rotate(-22 41 47)" />

        {/* Twin Bells on Top */}
        <circle cx="17" cy="15" r="8" fill="url(#clockBell)" />
        <circle cx="17" cy="15" r="6" fill="#ffe082" opacity="0.6" />
        <rect x="19" y="19" width="3" height="6" fill="#bf360c" transform="rotate(-35 19 19)" />

        <circle cx="47" cy="15" r="8" fill="url(#clockBell)" />
        <circle cx="47" cy="15" r="6" fill="#ffe082" opacity="0.6" />
        <rect x="42" y="19" width="3" height="6" fill="#bf360c" transform="rotate(35 42 19)" />

        {/* Center Hammer */}
        <circle cx="32" cy="11" r="3" fill="#ffb74d" />
        <rect x="30.5" y="11" width="3" height="6" fill="#e65100" />

        {/* Main Clock Circle Body */}
        <circle cx="32" cy="33" r="20" fill="url(#clockBody)" />
        <circle cx="32" cy="33" r="16.5" fill="url(#clockFace)" stroke="#fbc02d" strokeWidth="1.5" />

        {/* Clock Hour Ticks */}
        <circle cx="32" cy="20" r="1.2" fill="#78909c" />
        <circle cx="45" cy="33" r="1.2" fill="#78909c" />
        <circle cx="32" cy="46" r="1.2" fill="#78909c" />
        <circle cx="19" cy="33" r="1.2" fill="#78909c" />

        {/* Kawaii Face & Clock Hands pointing to 8:00 (On-time school arrival!) */}
        <circle cx="32" cy="33" r="2.2" fill="#263238" />
        {/* Hour Hand (pointing left-down to 8) */}
        <line x1="32" y1="33" x2="25" y2="37" stroke="#263238" strokeWidth="2.4" strokeLinecap="round" />
        {/* Minute Hand (pointing straight up to 12) */}
        <line x1="32" y1="33" x2="32" y2="23" stroke="#263238" strokeWidth="2" strokeLinecap="round" />

        {/* Cheerful Blushing Eyes */}
        <circle cx="26.5" cy="29" r="1.4" fill="#37474f" />
        <circle cx="37.5" cy="29" r="1.4" fill="#37474f" />
        <circle cx="26" cy="28.4" r="0.5" fill="#fff" />
        <circle cx="37" cy="28.4" r="0.5" fill="#fff" />
        <ellipse cx="23.5" cy="32" rx="2" ry="1.2" fill="#ff5252" opacity="0.45" />
        <ellipse cx="40.5" cy="32" rx="2" ry="1.2" fill="#ff5252" opacity="0.45" />
        <path d="M30 37 Q32 39 34 37" stroke="#263238" strokeWidth="1.2" strokeLinecap="round" fill="none" />

        {/* Excellence Badge Ribbon hanging on bottom right */}
        <g transform="translate(40, 36)">
          <path d="M4 8 L0 22 L5 19 L10 22 L7 8 Z" fill="url(#ribbonBlue)" />
          <circle cx="6" cy="8" r="7" fill="#ffd600" stroke="#ff8f00" strokeWidth="1" />
          {/* Star on badge */}
          <path d="M6 3.5 L7 6 L9.5 6.2 L7.5 7.8 L8.2 10.2 L6 8.8 L3.8 10.2 L4.5 7.8 L2.5 6.2 L5 6 Z" fill="#ffffff" />
        </g>
      </g>
    </svg>
  )
}

// 5. Icon Tự tin (Ngôi sao siêu nhân 3D rạng rỡ phát biểu, tràn đầy tự tin)
export function IconConfidence3D({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Tự tin & Giao tiếp"
    >
      <defs>
        <radialGradient id="starBody" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#fff9c4" />
          <stop offset="45%" stopColor="#ffd54f" />
          <stop offset="85%" stopColor="#ffb300" />
          <stop offset="100%" stopColor="#ff8f00" />
        </radialGradient>
        <linearGradient id="megaBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4081" />
          <stop offset="100%" stopColor="#c2185b" />
        </linearGradient>
        <filter id="confidenceShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#ff6f00" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#confidenceShadow)">
        {/* Soft ground shadow */}
        <ellipse cx="32" cy="58" rx="20" ry="4" fill="#000000" fillOpacity="0.14" />

        {/* Plump Star polygon with smooth corners */}
        <path
          d="M32 6 C33.8 6 35.5 13.5 39.5 17.5 C43.5 21.5 51 22.5 51 24.5 C51 26.5 44 29.5 42 34 C40 38.5 41.5 47 39.5 48 C37.5 49 32.5 43.5 28.5 43.5 C24.5 43.5 19.5 49 17.5 48 C15.5 47 17 38.5 15 34 C13 29.5 6 26.5 6 24.5 C6 22.5 13.5 21.5 17.5 17.5 C21.5 13.5 23.2 6 32 6 Z"
          fill="url(#starBody)"
          stroke="#ffa000"
          strokeWidth="1.5"
        />

        {/* Glossy 3D Highlight on Top Point */}
        <ellipse cx="32" cy="14" rx="4" ry="6" fill="#ffffff" opacity="0.6" transform="rotate(-15 32 14)" />

        {/* Big Bright Sparkling Eyes */}
        <ellipse cx="25" cy="27" rx="2.5" ry="3.2" fill="#371e03" />
        <ellipse cx="37" cy="27" rx="2.5" ry="3.2" fill="#371e03" />
        {/* Sparkle highlights in eyes */}
        <circle cx="24" cy="25.5" r="1.1" fill="#ffffff" />
        <circle cx="36" cy="25.5" r="1.1" fill="#ffffff" />
        <circle cx="25.8" cy="28.5" r="0.5" fill="#ffffff" />
        <circle cx="37.8" cy="28.5" r="0.5" fill="#ffffff" />

        {/* Rosy Blush Cheeks */}
        <circle cx="20" cy="31" r="3" fill="#ff5252" opacity="0.5" />
        <circle cx="42" cy="31" r="3" fill="#ff5252" opacity="0.5" />

        {/* Big Confident Open Smile */}
        <path d="M26 31 Q31 38 36 31" fill="#c2185b" stroke="#371e03" strokeWidth="1.5" strokeLinecap="round" />
        {/* Cute Tongue */}
        <path d="M28.5 33 Q31 36.5 33.5 33" fill="#ff80ab" />

        {/* Cheerful Megaphone / Speech Sparkle on Right */}
        <g transform="translate(42, 33) rotate(-15)">
          <path d="M0 6 L10 1 L12 12 L0 8 Z" fill="url(#megaBody)" stroke="#880e4f" strokeWidth="0.8" />
          <ellipse cx="11" cy="6.5" rx="2.5" ry="5.5" fill="#ff80ab" stroke="#880e4f" strokeWidth="0.8" />
          <rect x="-3" y="5" width="4" height="6" rx="1.5" fill="#ffd54f" />
        </g>

        {/* Sound Waves & Heart Sparkle from Megaphone */}
        <path d="M56 27 Q59 30 56 34" stroke="#ff4081" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M59 24 Q63 30 59 37" stroke="#ff4081" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Tiny Pink Love Heart Floating */}
        <path
          d="M48 10 C48 8.5 46.5 7.5 45 7.5 C43.8 7.5 43 8.3 42.5 9 C42 8.3 41.2 7.5 40 7.5 C38.5 7.5 37 8.5 37 10 C37 12.5 42.5 15.5 42.5 15.5 C42.5 15.5 48 12.5 48 10 Z"
          fill="#ff4081"
        />

        {/* Tiny Golden Star */}
        <path d="M12 9 L13 11 L15 11.5 L13 12 L12 14 L11 12 L9 11.5 L11 11 Z" fill="#ffd700" />
      </g>
    </svg>
  )
}

// 6. Icon Trái tim 3D ấm áp (Cho phần ghi chú tăng trưởng)
export function IconHeart3D({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Yêu thương & khích lệ"
    >
      <defs>
        <radialGradient id="warmHeart" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="40%" stopColor="#fbc02d" />
          <stop offset="100%" stopColor="#f57f17" />
        </radialGradient>
        <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#f57f17" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#heartShadow)">
        <path
          d="M16 27 C16 27 5 19.5 5 12 C5 7.5 8.5 4.5 12.5 4.5 C14.5 4.5 15.5 5.5 16 6.5 C16.5 5.5 17.5 4.5 19.5 4.5 C23.5 4.5 27 7.5 27 12 C27 19.5 16 27 16 27 Z"
          fill="url(#warmHeart)"
          stroke="#f57f17"
          strokeWidth="1.2"
        />
        {/* Glossy reflection */}
        <path
          d="M8.5 10 C8.5 7.5 10.5 6 12 6"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>
    </svg>
  )
}

// Helper mapping function to get the right 3D icon for each skill area
export function getSkill3DIcon(areaKey: string, size = 32) {
  if (areaKey.includes('Tiếng Việt')) {
    return <IconVietnamese3D size={size} />
  }
  if (areaKey.includes('Toán')) {
    return <IconMath3D size={size} />
  }
  if (areaKey.includes('Nề nếp')) {
    return <IconDiscipline3D size={size} />
  }
  if (areaKey.includes('Tự tin')) {
    return <IconConfidence3D size={size} />
  }
  return <IconGrowth3D size={size} />
}
