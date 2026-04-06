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
    ],
  },
  {
    company: 'PickNumber',
    role: 'Android Developer, 참여 연구원 / 프리랜서형태로 비대면 근무',
    periodLabel: '2023.01 ~ 2023.06',
    start: new Date(2023, 0, 1),
    end: new Date(2023, 5, 30),
    tasks: [
      '(주)PickNumber와 한성대학교 DC&M 동아리 산학 협력 프로젝트 - 전국 업체 예약 및 위치 서비스 제공 앱',
      'Android 팀 리드 개발자 (3인 팀 중 Android 전담, 전체 기여도 80%)',
      'Room 캐싱 전략 도입으로 반복 API 호출 최소화 및 응답시간 85% 단축',
      '전국 업체 위치정보 실시간 검색: SearchView + RecyclerView + 거리순 정렬로 사용자 경험 최적화',
      'ViewBinding 확장 함수와 추상 베이스 클래스 활용해 코드 재사용성 강화',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/HSU-Didimdol/Android_PickNumber' },
    ],
  },
]

function getCareerMonths(start: Date, end: Date) {
  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()
  let totalMonths = years * 12 + months

  if (end.getDate() < start.getDate()) totalMonths--

  return Math.max(totalMonths, 0)
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
