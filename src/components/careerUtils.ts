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
      'PowerGraphics의 Android 간편 차트인 EasyChart에서 차트 화면과 설정 기능을 개발했습니다. ViewModel, LiveData, StateFlow로 설정 저장과 초기화, 화면 재진입 시 상태를 관리했습니다.',
      'LS증권 투혼 앱의 Java 시스템과 Kotlin 차트 모듈을 연결했습니다. 시장과 주기에 따른 조회 61종과 실시간 21종을 연동하고, 종목이나 주기가 바뀔 때 요청과 구독의 생명주기를 관리했습니다.',
      'LS증권 투혼의 Java 앱에서 차트 유형과 지표, 실시간 기능을 호출하도록 Script API를 64개에서 115개로 확장하고, Android 차트 모듈과의 호출 규약을 검증했습니다.',
      'PowerGraphics 감시목록에 차트별 지표를 표시하는 커스텀 그리드를 개발했습니다. 변경된 셀만 갱신하고 중복 갱신을 줄여 불필요한 화면 갱신과 스크롤 위치 변동을 완화했습니다.',
      'React, Vite, SCSS로 자사 반응형 홈페이지를 개발하고 제품 소개, 공지사항, 콘텐츠 관리, 문의 접수 기능을 연동했습니다.',
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
