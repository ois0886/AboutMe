const CAREER_START = new Date(2026, 1, 9) // 2026.02.09

export function getTotalCareer() {
  const now = new Date()
  let years = now.getFullYear() - CAREER_START.getFullYear()
  let months = now.getMonth() - CAREER_START.getMonth()
  if (now.getDate() < CAREER_START.getDate()) months--
  if (months < 0) {
    years--
    months += 12
  }
  if (years > 0 && months > 0) return `${years}년 ${months}개월`
  if (years > 0) return `${years}년`
  if (months > 0) return `${months}개월`
  return '1개월 미만'
}
