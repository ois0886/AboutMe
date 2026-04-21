type CareerEntry = {
  company: string
  role: string
  periodLabel: string
  location?: string
  start: Date
  end?: Date
  tasks: string[]
  links?: Array<{
    label: string
    url: string
  }>
}

export const careers: CareerEntry[] = [
  {
    company: 'ChartLab',
    role: 'Software Engineer · 연구원 정규직으로 근무',
    location: '서울시 강서구',
    periodLabel: '2026.02.09 ~ 재직중',
    start: new Date(2026, 1, 9),
    tasks: [
      'MTS 차트 시스템의 인터페이스, UI, 데이터 컨트롤러 개발 및 유지보수',
      'PowerChart 3.0 LS증권 제품 유지보수 및 간편 차트 개발',
      '회사 홈페이지 리팩토링 및 유지보수',
      '인사, 고객관리, 문서관리 업무 수행',
    ],
  },
]

function getCareerMonths(start: Date, end: Date) {
  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()
  const totalMonths = years * 12 + months + 1

  return Math.max(totalMonths, 1)
}

export function getTotalCareer() {
  const now = new Date()

  const totalMonths = careers.reduce((sum, career) => {
    const end = career.end ?? now
    return sum + getCareerMonths(career.start, end)
  }, 0)

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years > 0 && months > 0) return `${years}년 ${months}개월`
  if (years > 0) return `${years}년`
  if (months > 0) return `${months}개월`
  return '1개월 미만'
}
