// Static demo records; no teacher submission or persistence in the UI phase.
export const demoDate = '2026-09-18'
const schoolDays = [1, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18]
const reasons = ['Giúp đỡ bạn bè', 'Hăng hái phát biểu', 'Chăm chỉ học tập', 'Giữ lớp sạch đẹp', 'Có nhiều tiến bộ']
const weeklyTotals = [19, 23, 16, 20, 18, 22, 15, 25, 17, 21, 14, 13, 12, 11, 10, 9]
export const dailyAwards = schoolDays.flatMap((day, d) => Array.from({ length: 16 }, (_, id) => ({
  studentId: id,
  date: `2026-09-${String(day).padStart(2, '0')}`,
  stars: day >= 14
    ? Math.floor(weeklyTotals[id] / 5) + (d - 8 < weeklyTotals[id] % 5 ? 1 : 0)
    : 1 + ((id * id + d * 7 + id * d * 3) % 5),
  reason: reasons[(id + d) % reasons.length],
})))

export function getLeaderboard(period: 'week' | 'month', names: string[]) {
  const start = period === 'week' ? '2026-09-14' : '2026-09-01'
  const sorted = names.map((name, id) => {
    const records = dailyAwards.filter(a => a.studentId === id && a.date >= start && a.date <= demoDate)
    return { id, name, total: records.reduce((sum, a) => sum + a.stars, 0), reason: records.at(-1)?.reason ?? 'Cùng cố gắng mỗi ngày' }
  }).sort((a, b) => b.total - a.total || a.id - b.id)
  return sorted.slice(0, 10).map(student => ({ ...student, rank: sorted.findIndex(s => s.total === student.total) + 1 }))
}
