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
    company: '(주)차트연구소',
    role: 'Android Developer · 연구원/정규직',
    location: '서울시 강서구',
    periodLabel: '2026.02.09 ~ 재직 중',
    start: new Date(2026, 1, 9),
    tasks: [
      '금융·증권 B2B Android 차트 SDK의 레거시 엔진 연동 UI 및 설정/제어 레이어 개발',
      '이지차트(간편차트) 모듈 신규 구축: 차트 화면, 데이터 갱신, 설정 플로우 구현',
      '지표 정의 데이터 기반의 지표 설정 목록·상세 설정·엔진 반영 흐름 구현',
      '이동평균선, Signal 지표, 분석 도구 UI, GMT 시간대 등 차트 표시/설정 오류 개선',
      '성능 병목과 구조 개선 지점을 검증하고 차트 SDK의 화면·설정 흐름 개선안 정리',
      '고객 문의, 운영 문서, 기획안을 개발 이슈로 정리하며 요구사항 커뮤니케이션 지원',
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
