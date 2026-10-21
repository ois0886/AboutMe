type CareerEntry = {
  company: string
  role: string
  periodLabel: string
  location?: string
  start: Date
  end?: Date
  tasks: string[]
  summary?: string[]
  problemSolvings?: Array<{
    title: string
    problem: string
    solution: string
    result: string
  }>
  links?: Array<{
    label: string
    url: string
  }>
}

export const careers: CareerEntry[] = [
  {
    company: '(주)차트연구소',
    role: 'Android Developer | 연구원/정규직',
    location: '서울시 강서구',
    periodLabel: '2026.02.09 ~ 재직 중',
    start: new Date(2026, 1, 9),
    summary: [
      'LS증권 Android 차트 라이브러리의 키패드 종료 시 결과 전달과 숫자 파싱을 보완해 연속 편집값 누락과 소수점/음수 저장 오류 해결. 이동평균선 체크 상태와 Signal 설정, 분석도구 속성 반영 및 테마 예외 처리 보완, 개발/샘플 매뉴얼 작성',
      '기존 차트 엔진을 활용한 EasyChart의 차트 화면과 지표 설정 기능 개발. ViewModel과 LiveData로 설정 탭 간 편집 상태를 공유하고, 저장과 초기화 및 재진입 시 차트에 설정값이 일관되게 반영되도록 보완',
      'MarketMap 설정 화면의 깊이/카테고리와 테두리 속성 편집 기능 개발. 깊이 전환 시 편집값 보존, 설정 로딩 이벤트와 사용자 변경을 구분해 저장과 초기화 시 화면 상태와 엔진 속성이 일치하도록 연결',
      'React 기반 자사 반응형 홈페이지를 Vite, SCSS로 개발. 회사와 제품 소개, Sanity 기반 공지 조회와 검색, Google Apps Script를 통한 첨부파일 문의 접수 기능 구현',
    ],
    // 문서의 상세 기여도 웹 포트폴리오 원천 데이터에 보관하고 화면에는 요약만 표시한다.
    tasks: [
      'LS증권 Android 차트 라이브러리에서 지표 변수 연속 편집 시 일부 변경값만 저장되는 오류를 수정했습니다. 숫자 키패드 종료 시 결과 전달 시점과 중복 전달 처리를 보완하고, 소수점과 음수 변수를 저장하도록 숫자 파싱을 수정했습니다.',
      'LS 차트의 이동평균선 체크 상태 유지와 Signal 기간 및 이평 설정, 수평선과 추세선의 가격 반영, 심볼과 도형의 속성 처리를 보완했습니다. 테마 리소스를 해석하지 못할 때 기본 색상을 적용하도록 예외 처리하고, API 사용 방법과 관심종목 3분할 차트 예제를 포함한 개발 및 샘플 매뉴얼을 작성하고 갱신했습니다.',
      'PowerGraphics의 Android 간편 차트 EasyChart에서 차트 화면과 지표 설정 기능을 개발했습니다. 기존 차트 엔진을 활용해 종목, 주기와 차트 유형 선택을 연결하고, ViewModel과 LiveData로 설정 탭의 편집 상태를 공유했습니다. 저장과 닫기, 초기화 및 재진입 시 차트와 설정 상태의 반영 흐름을 보완하고 StateFlow와 DataStore로 테마의 원본값과 편집값을 관리했습니다.',
      'PowerGraphics의 MarketMap 설정 화면을 개발했습니다. 데이터 깊이와 카테고리, 표시 옵션과 테두리 색상 및 굵기를 편집하도록 구현하고, 깊이 전환 시 편집값을 보존했습니다. 설정 저장과 초기화, 재조회 과정에서 화면 상태와 엔진 속성이 일치하도록 연결했습니다.',
      'React, Vite, SCSS로 자사 반응형 홈페이지를 개발했습니다. 회사와 제품 소개, 공지사항, 문의 화면과 공통 레이아웃을 구현하고 Sanity 기반 공지 조회와 검색, 상세 콘텐츠 및 첨부파일 문의 폼을 Google Apps Script와 연동했습니다.',
    ],
    problemSolvings: [
      {
        title: 'LS 지표 변수의 연속 편집 시 저장 누락 해결',
        problem: '여러 지표 변수를 연속으로 편집하면 처음 또는 마지막에 입력한 값만 저장되고 일부 변경값이 누락되는 문제가 있었습니다.',
        solution: '숫자 키패드 종료 시 입력 결과를 전달하는 처리를 닫기 애니메이션 완료 콜백에서 분리했습니다. 결과 전달 여부를 관리해 취소와 종료 과정에서 중복으로 전달되지 않도록 보완했습니다.',
        result: '연속 편집한 지표 변수의 변경값이 누락되던 오류를 수정했습니다.',
      },
      {
        title: 'LS 이동평균선 설정 행의 체크 상태 보존',
        problem: 'RecyclerView가 설정 행을 다시 바인딩할 때 기존 리스너가 값 설정 과정에서 실행되어, 색상 변경 시 체크 상태와 편집값이 바뀌는 문제가 있었습니다.',
        solution: '체크박스와 Spinner의 기존 리스너를 해제한 뒤 모델 상태를 적용하고 새 리스너를 연결했습니다. 색상 선택 전에 입력값을 모델에 반영하고, Signal 기간 및 이평 설정의 목록 인덱스와 엔진 파라미터 대응도 보완했습니다.',
        result: '이동평균선 색상을 바꿀 때 체크 상태와 편집값이 유지되도록 수정하고, Signal 설정값이 해당 엔진 파라미터에 반영되도록 연결했습니다.',
      },
      {
        title: 'MarketMap 깊이 전환 시 편집 상태 보존',
        problem: 'D-1/D-2마다 테두리 설정이 달라 깊이를 바꿀 때 현재 편집값과 새로 표시할 값을 구분해야 했습니다.',
        solution: '깊이를 전환하기 전에 현재 색상과 굵기를 저장하고 새 깊이의 값을 표시했습니다. 설정 로딩 중 Spinner 이벤트와 사용자 변경을 구분하고, 설정 복사본과 선택한 깊이 및 카테고리를 차트에 전달했습니다.',
        result: '깊이를 오가며 편집한 값을 유지하고 저장, 초기화 및 재조회 시 화면과 엔진 속성이 일치하도록 연결했습니다.',
      },
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
