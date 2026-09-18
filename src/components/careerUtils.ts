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
      'PowerGraphics Android용 간편 차트(EasyChart)의 21개 화면·제어 구성요소를 개발하고, 선·봉·영역·막대 4종 차트와 종목·조회 주기·지표 설정 기능 구현',
      '고객사 LS증권의 모바일 주식거래 앱(MTS) 투혼에서 기존 Java 시스템과 Android 차트 기능 모듈 간 연동 상태를 점검하고, 조회 데이터·실시간 데이터를 시장·조회 주기별로 검증',
      '화면과 차트 설정 불일치, 한글 데이터 형식 호환, 재사용 화면의 상태 오류, 테마·입력 범위 문제를 해결하고 여러 운영 버전의 수정·검증 절차 관리',
      'Kotlin·Java, Android XML·ViewBinding 기반으로 차트 화면을 개발하고, ViewModel·LiveData·StateFlow를 활용해 설정 저장·초기화·재진입 시 화면 상태 관리',
      'LS증권 차트의 지표·분석도구·수치조회 화면을 개선하고, 숫자 입력 저장·소수점 처리·화면 방향 오류 수정. 기존 Java 앱과 Kotlin 차트 라이브러리의 스크립트 연동, 고객사 데이터 규격 변경 및 라이브러리 업데이트를 반영하고 개발·샘플 매뉴얼 정비',
      'PowerGraphics 감시목록과 차트별 지표 데이터를 연결하고 수치·등락률·지표값을 표시하는 커스텀 그리드 개발. 변경된 셀만 갱신하고 중복 갱신을 정리해 불필요한 화면 갱신과 스크롤 위치 변동 완화',
      'React·Vite·SCSS 기반 자사 반응형 홈페이지 제작. 회사·제품 소개, 공지사항, 문의 화면과 콘텐츠 관리·지도·문의 접수 기능을 연동하고 라우팅·리소스 경로를 보완하며 배포·운영 가이드 작성',
      '삼성증권 미팅용 PPT 자료 제작',
    ],
  },
]

function getCareerMonths(start: Date, end: Date) {
  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()
  const dayAdjustment = end.getDate() < start.getDate() ? 1 : 0
  const totalMonths = years * 12 + months - dayAdjustment

  if (end < start) return 0

  // 재직 첫 달을 1개월로 포함해서 표시한다.
  return totalMonths + 1
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
