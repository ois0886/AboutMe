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
      '금융 및 증권 B2B Android 차트 SDK의 레거시 엔진 연동 UI 및 설정/제어 레이어 개발',
      '이지차트(간편차트) 모듈 신규 구축 및 차트 화면, 데이터 갱신, 설정 플로우 구현',
      '지표 정의 데이터 기반의 지표 설정 목록, 상세 설정 화면, 엔진 반영 구조 구현',
      '기존 이동평균선, Signal 지표, 분석 도구 UI, GMT 시간대 등 차트 표시/설정 오류 개선',
      '회사 홈페이지 리팩토링 진행',
      '인사, 고객관리, 문서관리, 사무 보조, 기획안 작성, 문의 전화 응대, 비품 주문 업무 수행',
    ],
  },
  {
    company: '(주)PickNumber',
    role: 'Android Developer · 산학협력 학부 연구원/프리랜서',
    location: '재택근무',
    periodLabel: '2023.01.16 ~ 2023.06.15',
    start: new Date(2023, 0, 16),
    end: new Date(2023, 5, 15),
    tasks: [
      'Didimdol 프로젝트 Android 팀 리드 개발자 (3인 팀 중 Android 전담, 전체 기여도 80%)',
      'Room 캐싱 전략 도입으로 반복 API 호출 최소화 및 응답시간 85% 단축',
      '전국 업체 위치정보 실시간 검색: SearchView + RecyclerView + 거리순 정렬로 사용자 경험 최적화',
      'ViewBinding 확장 함수와 추상 베이스 클래스 활용해 코드 재사용성 강화',
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
