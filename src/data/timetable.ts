export const WEEKDAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu']

const DEFAULT_TIMES = ['07:45 – 08:20', '08:30 – 09:05', '09:15 – 09:50', '10:00 – 10:35', '13:45 – 14:20', '14:30 – 15:05', '15:15 – 15:50', '15:55 – 17:15']
const DEFAULT_SCHEDULE = [
  ['HĐTN', 'Tiếng Việt (Đọc)', 'Tiếng Việt (Đọc)', 'Toán', 'GDTC 2', 'Âm nhạc 2', 'TNXH', 'CLB NGCK'],
  ['Tiếng Việt (Viết)', 'Tiếng Việt (Nói và nghe)', 'Toán', 'Mĩ thuật', 'Tiếng Anh', 'Giảng dạy BTL', 'Đạo đức', 'CLB NGCK'],
  ['Tiếng Việt (Đọc)', 'Tiếng Việt (Đọc)', 'Toán', 'TNXH', 'HĐCC', 'GDTC', 'Âm nhạc', 'CLB NGCK'],
  ['Tiếng Việt (Viết)', 'STEM', 'Toán', 'Tiếng Việt (LTVC)', 'HĐCC', 'HĐTN', 'Tiếng Anh', 'CLB NGCK'],
  ['Tiếng Việt (TLV)', 'Tiếng Việt (Đọc)', 'Toán', 'Đọc sách', 'TA – STEM', 'GDTC', 'HĐTN', 'CLB NGCK'],
]

export type Timetable = { schedule: string[][]; times: string[] }
const KEY = 'class_hub_2a16_timetable'
const cloneDefault = (): Timetable => ({ schedule: DEFAULT_SCHEDULE.map(day => [...day]), times: [...DEFAULT_TIMES] })

export function getTimetable(): Timetable {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed.schedule) && Array.isArray(parsed.times)) return parsed
    }
  } catch (_) {}
  return cloneDefault()
}

export function saveTimetable(value: Timetable) {
  localStorage.setItem(KEY, JSON.stringify(value))
  window.dispatchEvent(new Event('class-timetable-updated'))
}
