export interface ProblemSolving {
  problem: string[]
  solution: string[]
  result: string[]
}

export interface ImplementationBlock {
  description: string
  code: string | null
}

export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string | null
  tech: string[]
  period: string
  team: string
  role: string
  details: string[]
  features: string[]
  contributions: string[]
  implementation: ImplementationBlock[]
  alternatives: string[]
  problemSolving: ProblemSolving | null
  achievements: string[]
  retrospective: string[]
  links: { label: string; url: string }[]
  screenshots: string[]
}

const projects: Project[] = [
  {
    id: 'naenun-kiosk',
    title: '내눈 키오스크',
    description: '생체정보 통합 플랫폼을 통해 고령층의 건강 측정과 관리, 광고 연계를 지원하는 스마트 헬스케어 키오스크 서비스',
    thumbnail: null,
    tech: ['Kotlin', 'Android Jetpack', 'Jetpack Compose', 'ViewModel', 'Coroutine', 'Flow'],
    period: '2025.10 ~ 2025.11',
    team: '6명 (IoT 1명, Android 5명)',
    role: 'Android 키오스크 코드 개선 및 리팩토링',
    details: [
      '(주)픽셀로의 서비스 내눈 키오스크 서비스를 실사용 환경에 맞게 리팩토링 및 요구사항 개선',
      'SSAFY 13기 기업연계 프로젝트에 선정되어 프로젝트 진행',
    ],
    features: [
      'APK 인스톨 암호화 — 무단 설치 방지 및 보안 강화',
      'UI/UX 개선 — 고령층·외국인 친화적 화면, 글자 색상/크기 개선',
      'BLE 연동 안정화 — 다중 기기 연결 및 장애 자동 복구',
      '신규 BLE 기기 확장 — 체온계·뇨 검사 키트 추가로 데이터 항목 확대',
      '광고 콘텐츠 관리 — 운영자 직접 광고·안내 영상 교체 가능',
      '건강 연계 광고 서비스 — 측정 결과에 따른 맞춤 광고 출력·푸시',
      'Wi-Fi 프린터 연동 — 인바디 형식 건강 리포트 전체 출력',
      '다국어 지원 — 한·중·프·일·아·스·태·러 8개 언어 현지화',
      '설치·운영 매뉴얼 — 텍스트 및 영상 가이드 제공',
    ],
    contributions: [
      '부분적 XML UI를 Jetpack Compose UI 100%로 전환',
      'Compose State Hoisting 패턴 적용으로 기존 UI 컴포넌트 재사용성 향상 및 코드 중복 제거',
      '기존 레거시 패키지 구조를 기능·계층 기준으로 재구성해 의존성 방향을 정리하고 유지보수성 개선',
    ],
    implementation: [
      {
        description: 'Route 계층에서 화면 상태와 도메인 데이터를 한 번에 조합함.\n예: 언어 설정을 기반으로 폰트 크기를 결정하고, 동의 상태(체크 여부)와 테이블에 들어갈 텍스트 데이터를 Route 에서 UiState + TableData 형태로 구성 후, Screen 에 주입함.',
        code: `val uiState = TermsOfServiceUiState(
    acceptedPersonal = acceptedPersonal,
    acceptedSensitive = acceptedSensitive,
    textSize = textSize
)

val personalTable = remember {
    TermsTableData(
        label = StringProvider.getString(R.string.personal_info_table_label),
        column1 = StringProvider.getString(R.string.personal_info_table_column1),
        column2 = StringProvider.getString(R.string.personal_info_table_column2),
        column3 = StringProvider.getString(R.string.personal_info_table_column3),
        evenly = false
    )
}`,
      },
      {
        description: 'Screen 계층에서는 전달받은 상태와 콜백만으로 UI를 구성함.\n스크롤 처리, 버튼 활성화, 컴포넌트 배치 등 "어떻게 보여줄지"에 집중하고, "무엇을 할지"는 콜백을 통해 상위로 위임하는 형태로 책임 분리함.',
        code: `PrimaryButton(
    onClick = onClickAgree,
    enabled = state.acceptedPersonal == true && state.acceptedSensitive == true,
    text = stringResource(R.string.button_agree),
)`,
      },
      {
        description: '공통 레이아웃 패턴과 UI 조각을 컴포넌트로 분리함.\n타이틀, 설명, 표, 체크박스 행, 기본/보조 버튼 등의 컴포넌트를 재사용 가능한 단위로 쪼개고, 여러 화면에서 동일한 빌딩 블록을 조합해서 사용하도록 구성함.\n이 구조를 약관 화면뿐 아니라 다른 설명/동의/확인 화면에도 동일하게 적용해, 화면 수가 늘어나도 복잡도 증가를 최소화함.',
        code: null,
      },
    ],
    alternatives: [
      'ViewModel 책임만 확장하고 헬퍼 클래스로 일부 UI 로직을 분리하는 대안도 있었지만, "Route/Screen/Component" 같이 계층 자체를 명확히 나누지 않으면 결국 의존 방향과 책임 경계가 모호해질 위험이 있었을 것임.',
      'XML 뷰 바인딩을 유지한 채 Compose 를 부분 도입하는 점진적 접근도 가능하지만, 선언적 UI·State Hoisting·프리뷰 기반 개발의 장점을 충분히 활용하기에는 현재처럼 Screen/Component 중심 구조로 정리한 쪽이 더 적합했다고 판단함.',
    ],
    problemSolving: {
      problem: [
        '기존 키오스크 앱에서 화면마다 데이터 로딩, 상태 관리, 텍스트 구성, 버튼 클릭 처리 등이 하나의 화면 컴포넌트에 뒤섞여 있어, 간단한 텍스트 수정이나 버튼 추가에도 여러 파일을 동시에 수정해야 하는 유지보수 비용 증가 현상 발생',
        'XML View와 Compose 코드, ViewModel·비즈니스 로직·네비게이션 로직이 섞여 있어, 공통 정책(다국어·폰트 크기·버튼 스타일 등)을 변경할 때 화면별로 중복 수정이 필요한 비일관적인 구조 발생',
      ],
      solution: [
        'Compose State Hoisting 패턴을 도입해, 각 화면의 상태 생성·비즈니스 로직·네비게이션 의사결정을 Route/ViewModel 계층에 올리고, 실제 UI는 순수 Composable(Screen/Component)로 분리하는 구조 적용',
        '공통 UI 패턴(타이틀, 설명, 표/리스트 영역, 확인/취소 버튼, 동의 체크 영역 등)을 재사용 가능한 컴포넌트로 분리하고, 기존 XML 기반 UI를 화면 단위로 Jetpack Compose로 점진적 마이그레이션 진행',
        '화면을 기능 단위(feature 단위) 패키지 구조로 재편하고, 각 기능 내부를 Route/Screen/Component로 나누어 새로운 기능 추가 시에도 동일한 구조를 확장할 수 있도록 정리',
      ],
      result: [
        '키오스크 앱 전반의 화면이 "Route(상태·의미 결정) → Screen(레이아웃) → Component(공통 UI 조각)" 계층 구조를 따르게 되어, 텍스트 교체·레이아웃 변경·버튼 추가 같은 요구사항에 대해 수정 범위 감소 및 재사용성 향상 달성',
        '다국어 지원, 폰트 크기 정책, 버튼 스타일 변경 등 공통 UI 정책을 상위 계층 또는 공용 컴포넌트에서 한 번만 수정하면 전체 화면에 반영되는 구조가 마련되어, 기능 확장과 유지보수 시 안정성과 일관성 확보',
      ],
    },
    achievements: [
      'SSAFY 13기 구미캠퍼스 자율 프로젝트 우수상 수상',
      '상용 환경에 설치된 키오스크 앱을 대상으로 리팩토링을 수행하여, 앱 크래시 감소 및 UI 수정·기능 추가 시 개발 공수를 줄이는 등 운영 관점의 안정성 확보',
    ],
    retrospective: [
      '기업·팀 간 초반 이해도가 맞지 않아 설계를 두 번 이상 수정하는 비효율이 발생했던 점이 아쉬움',
      '레거시 인벤토리화와 사전 설계 단계를 정식 프로세스로 두어, 범위·우선순위를 먼저 합의해야 한다는 필요성을 깨달음',
      '리팩토링은 단순히 화면을 예쁘게 바꾸는 작업이 아니라, 상태 관리·디자인 시스템·운영 관점까지 함께 재설계해야 효과가 크다는 점을 깨달음',
    ],
    links: [
      { label: 'Figma', url: 'https://www.figma.com/design/A8UNusvo5ANwq4rgU9aLXv/%EC%8B%B8%ED%94%BC-%EC%9E%90%EC%9C%A8-%EC%8A%A4%EB%A7%88%ED%8A%B8-%EA%B2%BD%EB%A1%9C%EB%8B%B9-%ED%82%A4%EC%98%A4%EC%8A%A4%ED%81%AC?node-id=0-1&t=iH3kiLCnJjtKTm2p-1' },
    ],
    screenshots: [
      'screenshot/naenun-1.png',
      'screenshot/naenun-2.png',
      'screenshot/naenun-3.png',
      'screenshot/naenun-4.png',
      'screenshot/naenun-5.png',
      'screenshot/naenun-6.png',
      'screenshot/naenun-7.png',
      'screenshot/naenun-8.png',
    ],
  },
  {
    id: 'project-1',
    title: 'Project 1',
    description: '프로젝트 설명을 여기에 작성하세요.',
    thumbnail: null,
    tech: ['React', 'TypeScript'],
    period: '2025.00 ~ 2025.00',
    team: '0명',
    role: '역할을 작성하세요',
    details: [
      '프로젝트 상세 설명을 여기에 작성하세요.',
    ],
    features: [
      '주요 기능 1',
      '주요 기능 2',
    ],
    contributions: [],
    implementation: [],
    alternatives: [],
    problemSolving: null,
    achievements: [],
    retrospective: [],
    links: [],
    screenshots: [],
  },
  {
    id: 'project-2',
    title: 'Project 2',
    description: '프로젝트 설명을 여기에 작성하세요.',
    thumbnail: null,
    tech: ['React', 'Node.js'],
    period: '2025.00 ~ 2025.00',
    team: '0명',
    role: '역할을 작성하세요',
    details: [
      '프로젝트 상세 설명을 여기에 작성하세요.',
    ],
    features: [
      '주요 기능 1',
      '주요 기능 2',
    ],
    contributions: [],
    implementation: [],
    alternatives: [],
    problemSolving: null,
    achievements: [],
    retrospective: [],
    links: [],
    screenshots: [],
  },
]

export default projects
