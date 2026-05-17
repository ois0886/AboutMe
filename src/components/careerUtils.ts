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
  {
    company: '(주)PickNumber',
    role: 'Android Developer · 산학협력 학부 연구원/프리랜서',
    location: '재택근무',
    periodLabel: '2023.01.16 ~ 2023.06.15',
    start: new Date(2023, 0, 16),
    end: new Date(2023, 5, 15),
    tasks: [
      'Didimdol 프로젝트 Android 팀 리드 개발자 (3인 팀 중 Android 전담)',
      '업체 마스터 데이터를 Room에 동기화하고 검색을 로컬 DB 조회로 전환해 검색 응답시간 85% 단축',
      'Direction5 API로 조회된 업체의 거리·소요시간만 보강하고 RecyclerView에 거리순 정렬 결과 표시',
      'Hilt로 Room DB/DAO, Repository, Remote/Local DataSource, EncryptedSharedPreferences 의존성 구성',
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
