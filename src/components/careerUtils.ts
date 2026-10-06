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
      'PowerGraphics Android 간편 차트(EasyChart)의 차트 화면·설정 기능 구현. ViewModel·LiveData·StateFlow 기반으로 설정 저장·초기화·재진입 시 화면 상태 관리',
      'LS증권 투혼의 모바일 주식거래 앱(MTS)에서 Java 시스템과 Kotlin 차트 모듈을 연결하고, 시장·주기별 조회·실시간 데이터 연동. 종목·주기 변경 시 요청과 실시간 구독의 생명주기 관리',
      'LS증권 투혼의 차트 기능 호출용 Script API 지원 범위를 약 80% 확대하고, Java 앱과 Android 차트 모듈 간 함수 호출 규약 검증',
      'PowerGraphics 감시목록과 차트별 지표 데이터를 연결하는 커스텀 그리드 개발. 변경된 셀만 갱신하고 중복 갱신을 정리해 불필요한 화면 갱신과 스크롤 위치 변동 완화',
      'React·Vite·SCSS 기반 자사 반응형 홈페이지 개발. 제품 소개·공지사항·콘텐츠 관리·문의 접수 기능 연동',
    ],
  },
]

function getCareerMonths(start: Date, end: Date) {
  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()
  const dayAdjustment = end.getDate() < start.getDate() ? 1 : 0
  const totalMonths = years * 12 + months - dayAdjustment

  if (end < start) return 0

  // 완전히 경과한 개월 수만 계산하고 남은 일수는 올림하지 않는다.
  return totalMonths
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
