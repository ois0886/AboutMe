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
    role: 'Android Developer · 연구원 정규직으로 근무',
    location: '서울시 강서구',
    periodLabel: '2026.02.09 ~ 재직중',
    start: new Date(2026, 1, 9),
    tasks: [
      '금융 및 증권 B2B Android 차트 SDK의 레거시 엔진 연동 UI 및 설정/제어 레이어 개발',
      '이지차트(간편차트) 모듈 신규 구축 및 차트 화면, 데이터 갱신, 설정 플로우 구현',
      '지표 정의 데이터 기반의 지표 설정 목록, 상세 설정 화면, 엔진 반영 구조 구현',
      '기존 이동평균선, Signal 지표, 분석 도구 UI, GMT 시간대 등 차트 표시/설정 오류 개선',
      '회사 홈페이지 리팩토링 진행',
      '인사, 고객관리, 문서관리, 사무 보조, 기획안 작성, 문의 전화 응대, 비품 주문 업무 수행',
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
