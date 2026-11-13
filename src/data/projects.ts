import { rich, strong, type RichText } from '../utils/richText'

export type { RichText, TextSegment } from '../utils/richText'

export interface ImplementationBlock {
  description: string
}

export interface ProblemSolving {
  visual: { src: string; alt: string }
  problem: string[]
  solution: string[]
  result: RichText[]
  implementation: ImplementationBlock[]
  alternatives: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  cardSummary: {
    description: string
    achievements: RichText[]
  }
  thumbnail: string | null
  tech: string[]
  period: string
  team?: string
  role: string
  details: RichText[]
  overviewUrl?: string
  features: RichText[]
  contributions: RichText[]
  problemSolvings: ProblemSolving[]
  insights: { title: string; url: string }[]
  insightImages?: string[]
  achievements: RichText[]
  retrospective: RichText[]
  links: { label: string; url: string }[]
  screenshots: string[]
  screenshotDescriptions?: Record<string, { alt: string; caption: string }>
  imageSectionTitle?: string
  screenshotColumns?: number
  hasBottomScreenshot?: boolean
}

const projects: Project[] = [
  {
    id: 'hangil',
    title: '한길졸업 - Android',
    description: '운전이 오랜만인 면허 소지자가 자주 가는 길을 연습하고, 차량 기록을 복습해 다음 과제를 정할 수 있는 Pleos 차량용 앱입니다.',
    cardSummary: {
      description: '운전이 오랜만인 면허 소지자의 생활 경로 연습을 돕는 Pleos 차량용 앱',
      achievements: [
        'Pleos SDK로 기어, 방향지시등, 브레이크를 기록하고 주차 중 연습 준비, 복습, 다음 과제 저장 흐름 구현',
        rich('Room에서 선택한 연습만 조회해 전체 이력 변환을 없애고, 복습 첫 응답 중앙값을 ', strong('93.36ms에서 8.07ms로 단축')),
        rich('MapLibre 초기화와 지도 도형 계산을 동시에 실행해 첫 렌더 완료 중앙값을 ', strong('255.74ms에서 166.78ms로 단축')),
      ],
    },
    thumbnail: 'screenshot/hangil-pleos-next-practice-saved.png',
    tech: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Hilt', 'Room', 'MapLibre', 'Pleos Vehicle SDK', 'FusedLocation', 'NaviHelper'],
    period: '2026.10.26 ~ 2026.11.13',
    team: '1명 (개인 프로젝트)',
    role: '서비스 기획, UI 디자인, Android 개발 및 검증',
    details: [
      '운전이 오랜만인 면허 소지자가 주차 중 연습 목표와 코스를 고르고, 연습을 마친 뒤 차량 기록과 메모를 확인해 다음 과제를 정할 수 있도록 개발했습니다.',
      '현대자동차그룹 차량용 앱 개발 공모전 출품을 준비하며 서비스 기획부터 UI 디자인, Android 구현과 Pleos 에뮬레이터 검증까지 혼자 맡았습니다.',
    ],
    overviewUrl: 'https://appdevchallenge.auto-hmg.io/',
    features: [
      '기어가 P이고 차량에서 화면 조작을 허용할 때 준비, 복습과 상세 조작을 열 수 있어야 합니다.',
      '목표, 코스와 과제를 저장하고, 판교를 거쳐 양재까지 가는 시연 코스의 경유지와 도착지를 Pleos 기본 내비게이션으로 전달할 수 있어야 합니다.',
      '연습 시작과 종료 시각, 기어, 방향지시등, 브레이크를 기록하고 사용자가 켠 경우 위치 표본을 저장할 수 있어야 합니다.',
      '지난 연습의 차량 기록과 위치 표본을 확인하고 메모를 남길 수 있어야 합니다. 복습할 도로 구간은 다음 과제와 함께 저장할 수 있어야 합니다.',
    ],
    contributions: [
      '목표 선택부터 연습 종료 후 다음 과제 저장까지 화면 흐름을 설계하고 Jetpack Compose로 구현했습니다.',
      'Pleos SDK 차량 상태와 Android Automotive의 화면 조작 제한을 연결해 주차 상태에서만 준비와 복습을 열도록 구현했습니다.',
      '화면은 도메인 인터페이스를 사용하도록 구성하고, 앱에서 Hilt로 Room 저장소와 Pleos 차량 어댑터를 연결했습니다.',
      'Pleos 에뮬레이터에서 차량 관찰 기록과 다음 과제 저장까지 시연하고, Room 조회 및 저장과 MapLibre 첫 렌더의 전후 시간을 측정했습니다.',
    ],
    problemSolvings: [
      {
        problem: [
          '복습 화면과 전면 차량 기록은 각각 연습 한 건이 필요했지만, Room에서 전체 이력을 불러와 모든 행의 도로 JSON을 변환한 뒤 필요한 기록을 골랐습니다. 종료 이력이 쌓일수록 첫 응답이 느려졌습니다.',
        ],
        solution: [
          '복습은 세션 ID로 지정된 원본 한 건을 읽고, 전면 차량 기록은 종료 시각과 활성 슬롯을 기준으로 활성 후보만 읽도록 조회를 나눴습니다.',
        ],
        result: [
          rich('합성 도로를 가진 종료 이력 128건을 넣었을 때 복습의 저장소 첫 응답 중앙값은 ', strong('93.36ms에서 8.07ms로 91.4% 감소'), '했습니다. p95는 128.51ms에서 11.78ms로 줄었고, 활성 연습의 첫 응답 중앙값은 96.46ms에서 8.03ms로 줄었습니다.'),
          'Pleos API 34 에뮬레이터의 디버그 빌드에서 예열 후 전후 각 80회 측정했습니다. 측정 범위는 새 구독에서 저장소가 첫 값을 반환할 때까지입니다.',
        ],
        visual: {
          src: 'screenshot/hangil-session-query-visual.png',
          alt: '전체 이력을 변환하던 조회를 Room에서 지정 복습 세션과 활성 후보를 각각 읽는 방식으로 바꾼 흐름',
        },
        implementation: [
          { description: '복습은 기존 세션 ID 인덱스를 사용합니다. 전면 차량 기록은 종료 시각이 비었거나 활성 슬롯이 남아 있는 행을 읽습니다. 저장 원본이 손상되었거나 활성 후보가 둘 이상이면 읽기 오류를 반환합니다.' },
        ],
        alternatives: [
          '전체 이력을 캐시에 보관하면 기록을 교체하거나 삭제할 때 캐시도 맞춰야 합니다. 사용처별 조회를 적용해 활성 후보 조건에서 SQLite가 테이블을 훑더라도 관련 행만 Kotlin 객체로 변환하도록 했습니다.',
        ],
      },
      {
        problem: [
          '새 위치 표본의 순번과 직전 수신 시각을 확인할 때마다 같은 연습의 모든 표본을 Kotlin 객체로 변환하고 실행별로 다시 묶었습니다. 표본이 쌓일수록 쓰기 트랜잭션이 길어졌습니다.',
        ],
        solution: [
          '기존 행의 자료형, 수신 시각과 순번을 SQL에서 확인하고, 검증을 통과하면 현재 기록 실행의 마지막 표본만 Kotlin 객체로 변환하도록 바꿨습니다. SQL에서 판단하기 어려운 데이터는 전체 검증으로 넘겼습니다.',
        ],
        result: [
          rich('SQL 검증을 통과한 합성 표본이 1,023개 쌓인 실행에서 새 표본 추가부터 커밋까지 중앙값은 ', strong('23.69ms에서 9.18ms로 61.3% 감소'), '했습니다. p95는 33.36ms에서 13.18ms로 줄었습니다.'),
          'Pleos API 34 에뮬레이터의 디버그 빌드에서 전후 APK를 번갈아 실행해 예열 후 각각 80회 측정했습니다.',
        ],
        visual: {
          src: 'screenshot/hangil-location-write-visual.png',
          alt: 'SQL 검증 뒤 마지막 표본 조회 또는 전체 검증을 거쳐 새 위치 표본을 추가하는 흐름',
        },
        implementation: [
          { description: '마지막 표본의 수신 시각과 순번을 읽어 다음 표본을 검증합니다. 표본 추가와 커밋 직전의 기록 권한 확인을 같은 트랜잭션에서 처리해 권한이 바뀌면 쓰기를 되돌립니다.' },
        ],
        alternatives: [
          '마지막 행만 읽으면 앞서 저장된 행의 손상이나 순번 누락을 놓칠 수 있습니다. 기존 행을 계속 검사하면서 매번 모든 행을 객체로 변환하는 비용을 줄였습니다.',
        ],
      },
      {
        problem: [
          '복습 지도를 열 때 Compose와 MapLibre 콜백에서 위치 점, 수신 순서대로 이은 선, 카메라 범위를 준비했습니다. 표본이 많은 연습에서는 도형 계산과 화면 작업이 메인 스레드에 몰렸습니다.',
        ],
        solution: [
          '같은 저장 기록을 바탕으로 도형을 백그라운드에서 계산하는 동안 MapLibre 지도를 초기화합니다. 두 작업이 끝나면 메인 스레드에서 현재 화면과 주차 허용 상태를 확인하고 레이어와 카메라를 적용합니다.',
        ],
        result: [
          rich('합성 표본 1,024개와 로컬 지도 배경에서 첫 렌더 완료 중앙값은 ', strong('255.74ms에서 166.78ms로 34.8% 감소'), '했습니다. 메인 스레드 CPU 시간의 중앙값은 81.95ms에서 65.22ms로 줄었습니다.'),
          'Pleos API 34 에뮬레이터의 디버그 빌드에서 전후 APK를 번갈아 실행해 예열 후 각각 80회 측정했습니다. 첫 렌더 시간의 전후 사분위 범위는 겹쳤습니다.',
        ],
        visual: {
          src: 'screenshot/hangil-vehicle-review-map-visual.png',
          alt: '도형 계산과 지도 초기화를 동시에 진행한 뒤 차량용 디스플레이에 지도 레이어를 적용하고 첫 프레임을 그리는 흐름',
        },
        implementation: [
          { description: '지도에 점과 선을 올리고 카메라 범위를 맞춘 뒤, 현재 요청의 프레임이 완전히 그려졌다는 콜백을 받아 준비 완료로 전환합니다.' },
        ],
        alternatives: [
          '도형을 먼저 계산하고 지도를 시작하는 초기 방식에서는 표본이 적을 때도 지도가 계산 완료를 기다렸습니다. 두 작업을 동시에 시작하고 지도 수명은 복습 화면에 묶었습니다.',
        ],
      },
    ],
    insights: [],
    achievements: [
      '주차 확인부터 연습 준비, 차량 상태 기록, 종료 후 복습과 다음 과제 저장까지 연결하고 Pleos 에뮬레이터에서 시연했습니다.',
      rich('Room에서 지정한 연습만 조회해 복습 기록의 첫 응답 중앙값을 ', strong('93.36ms에서 8.07ms로'), ' 줄였습니다 (Pleos 에뮬레이터).'),
      rich('MapLibre 초기화와 도형 계산을 병렬로 진행해 복습 지도 첫 렌더 완료 중앙값을 ', strong('255.74ms에서 166.78ms로'), ' 줄였습니다 (Pleos 에뮬레이터).'),
    ],
    retrospective: [],
    links: [
      { label: 'GitHub', url: 'https://github.com/HanGilLab/Android' },
      { label: 'Pleos 시연 영상 (1분 57초)', url: 'https://github.com/user-attachments/assets/0e64d5e8-d067-486d-baa3-100aca1bc36e' },
    ],
    screenshots: [
      'screenshot/hangil-pleos-home.png',
      'screenshot/hangil-pleos-task.png',
      'screenshot/hangil-pleos-recording.png',
      'screenshot/hangil-pleos-practice-finished.png',
      'screenshot/hangil-pleos-vehicle-review.png',
      'screenshot/hangil-pleos-next-practice-saved.png',
    ],
    screenshotDescriptions: {
      'screenshot/hangil-pleos-home.png': {
        alt: '첫 연습 준비 버튼이 표시된 한길졸업 홈',
        caption: 'Pleos 에뮬레이터 홈에서 첫 연습을 준비합니다.',
      },
      'screenshot/hangil-pleos-task.png': {
        alt: '시연 코스에서 오늘의 연습 과제를 선택하는 화면',
        caption: '시연 코스에서 이번 연습의 과제를 고릅니다.',
      },
      'screenshot/hangil-pleos-recording.png': {
        alt: '진행 중인 연습과 차량 상태 기록 안내가 표시된 화면',
        caption: '연습 중에는 차량 상태 기록 안내를 확인할 수 있습니다.',
      },
      'screenshot/hangil-pleos-practice-finished.png': {
        alt: '연습을 마친 뒤 복습을 여는 버튼이 표시된 화면',
        caption: '연습을 마치면 저장한 기록의 복습으로 이동합니다.',
      },
      'screenshot/hangil-pleos-vehicle-review.png': {
        alt: '시연 코스와 Pleos SDK 차량 관찰 기록이 구분된 복습 화면',
        caption: '복습 화면에서 시연 코스와 SDK로 관찰한 차량 기록의 출처를 구분합니다.',
      },
      'screenshot/hangil-pleos-next-practice-saved.png': {
        alt: '다음 연습 과제를 저장한 뒤 돌아온 한길졸업 홈',
        caption: '복습 후 저장한 다음 과제를 홈에서 확인합니다.',
      },
    },
  },
  {
    id: 'naenun-kiosk',
    title: '내눈 키오스크 - Android',
    description: '고령층이 건강을 측정하고 결과를 확인할 수 있는 헬스케어 키오스크입니다. 측정 결과에 맞는 광고도 제공합니다.',
    cardSummary: {
      description: '고령층의 건강 측정과 결과 확인, 측정 결과에 맞는 광고를 제공하는 헬스케어 키오스크',
      achievements: [
        rich('상용 키오스크 화면의 ', strong('Compose 통일'), ', Route, Screen, Component 역할 분리'),
        'Activity Context와 Singleton의 보유 범위 조정, Listener 해제 지점 정리',
        '기능과 계층별 패키지 분리, 반복 UI의 공통 컴포넌트화로 중복 수정 범위 축소',
      ],
    },
    thumbnail: 'screenshot/nanoon1.png',
    tech: ['Kotlin', 'Android Jetpack', 'Jetpack Compose', 'ViewModel', 'Coroutine', 'Flow'],
    period: '2025.10.10 ~ 2025.11.20',
    team: '6명 (IoT 1명, Android 5명)',
    role: 'Android 키오스크 코드 개선 및 리팩토링',
    details: [
      '(주)픽셀로의 내눈 키오스크를 운영 요구사항에 맞게 리팩토링했습니다.',
      'SSAFY 13기 기업연계 프로젝트로 진행했습니다.',
    ],
    features: [
      '무단 설치를 막기 위해 APK 설치 과정에 암호화를 적용해야 했습니다.',
      '고령층과 외국인이 읽기 쉽도록 화면 구성과 글자 색상, 크기를 조정해야 했습니다.',
      '여러 BLE 기기를 연결하고 연결 장애가 발생하면 자동으로 복구해야 했습니다.',
      '체온계와 소변 검사 키트를 추가해 측정 항목을 늘려야 했습니다.',
      '운영자가 광고와 안내 영상을 직접 교체할 수 있어야 했습니다.',
      '측정 결과에 맞는 광고를 화면과 푸시로 제공해야 했습니다.',
      'Wi-Fi 프린터로 인바디 형식의 건강 리포트를 출력해야 했습니다.',
      '한국어를 포함한 8개 언어를 지원해야 했습니다.',
      '설치와 운영 방법을 문서와 영상으로 안내해야 했습니다.',
    ],
    contributions: [
      'XML과 Compose가 섞여 있던 화면을 모두 Jetpack Compose로 전환했습니다.',
      'State Hoisting을 적용해 화면 상태와 UI를 분리하고 반복되는 UI를 공통 컴포넌트로 옮겼습니다.',
      '패키지를 기능과 계층별로 나누고 의존성 방향을 정리했습니다.',
    ],
    problemSolvings: [
      {
        problem: [
          '데이터 로딩, 상태 관리, 텍스트 구성과 버튼 처리가 화면 컴포넌트에 섞여 있어 간단한 문구 수정에도 여러 파일을 함께 고쳐야 했습니다.',
          'XML과 Compose가 혼재하고 화면 이동과 비즈니스 로직의 경계도 불분명해, 언어나 글자 크기, 버튼 스타일을 화면마다 따로 수정해야 했습니다.',
        ],
        solution: [
          'State Hoisting을 적용해 상태와 비즈니스 로직, 화면 이동 처리는 Route와 ViewModel에 두고 UI는 Screen과 Component로 분리했습니다.',
          '제목, 표, 버튼, 동의 체크 영역을 공통 컴포넌트로 만들고 XML 화면을 차례로 Compose로 옮겼습니다.',
          '기능별 패키지 안에 Route, Screen, Component를 배치해 새 화면도 같은 구조로 추가하도록 정리했습니다.',
        ],
        result: [
          '화면마다 상태와 이벤트는 Route, 레이아웃은 Screen, 공통 UI는 Component에서 수정하도록 책임을 나눴습니다.',
          '언어, 글자 크기, 버튼 스타일을 공용 컴포넌트 한 곳에서 바꾸면 여러 화면에 함께 반영하도록 구성했습니다.',
        ],
        visual: {
          src: 'screenshot/naenun-state-hoisting-visual.png',
          alt: 'Route에서 상태를 구성하고 Screen과 공통 컴포넌트에 전달하는 Compose 상태 호이스팅 구조',
        },
        implementation: [
          {
            description: 'Route에서 언어 설정에 맞는 글자 크기와 동의 상태, 표에 표시할 문구를 조합합니다. UiState와 TableData로 묶은 값을 Screen에 전달합니다.',
          },
          {
            description: 'Screen은 전달받은 상태로 컴포넌트를 배치하고 스크롤과 버튼 활성화 여부를 결정합니다. 버튼을 눌렀을 때의 처리는 콜백으로 상위 계층에 전달합니다.',
          },
          {
            description: '제목, 설명, 표, 체크박스 행과 버튼을 각각 공통 컴포넌트로 분리했습니다. 약관을 비롯한 설명과 동의 화면에서 같은 컴포넌트를 조합해 사용합니다.',
          },
        ],
        alternatives: [
          'ViewModel과 보조 클래스에 로직을 옮기는 방법도 검토했지만, 상태 처리와 UI의 경계가 다시 섞이지 않도록 Route, Screen, Component로 역할을 나눴습니다.',
          'XML을 유지하며 Compose를 일부만 도입할 수도 있었습니다. 공통 UI와 상태 전달 방식을 통일하고 프리뷰로 화면을 확인하기 위해 Compose 중심으로 정리했습니다.',
        ],
      },
      {
        problem: [
          '화면, 상태 관리, 화면 이동과 매니저 코드가 섞여 있어 기능을 추가할 때 어떤 코드가 영향을 받는지 파악하기 어려웠습니다.',
          'ViewModel, Repository, UI 사이의 참조 방향이 불분명해 공통 로직을 분리하거나 수정 범위를 좁히기 어려웠습니다.',
        ],
        solution: [
          '기능별 패키지를 만들고 내부를 Route, Screen, Component, ViewModel로 나눴습니다.',
          '여러 기능이 사용하는 로직과 UI는 core 영역으로 옮겨 중복 구현과 기능 사이의 직접 참조를 줄였습니다.',
          '새 화면도 같은 패키지 구조와 의존 방향을 따르도록 기준을 정했습니다.',
        ],
        result: [
          '기능별 코드와 공통 코드를 구분해 변경할 때 확인해야 하는 범위를 해당 기능 또는 core 영역으로 좁혔습니다.',
          '화면을 추가할 위치와 계층별 역할을 정해 변경이 다른 화면에 미치는 영향을 추적하기 쉬워졌습니다.',
        ],
        visual: {
          src: 'screenshot/naenun-package-refactor-visual.png',
          alt: '계층 중심 패키지를 기능별 패키지와 공통 컴포넌트로 재편한 구조',
        },
        implementation: [
          {
            description:
              '기능별 Route에서 상태와 이벤트를 연결하고 Screen과 Component에서 화면을 그리도록 나눴습니다.',
          },
          {
            description:
              '반복되는 UI와 공통 로직을 core 영역에 두었습니다. 각 기능은 다른 기능의 내부 코드 대신 공통 코드를 사용하도록 참조 방향을 정리했습니다.',
          },
        ],
        alternatives: [
          '공통 유틸만 분리하면 기존 의존 관계가 남아 새 기능에서도 같은 문제가 반복될 수 있어 패키지 구조를 함께 바꿨습니다.',
          '파일 위치만 화면별로 나누기보다 기능 코드와 공통 코드의 책임까지 구분해야 운영 요구사항을 바꿀 때 수정 범위를 좁힐 수 있다고 판단했습니다.',
        ],
      },
      {
        problem: [
          '장시간 실행되는 키오스크에서 Singleton의 Activity Context 보유와 Listener 미해제가 메모리 누수로 이어질 위험이 있었습니다.',
          '화면이 종료된 뒤에도 수명이 긴 객체에 Callback이나 Listener 참조가 남을 수 있었습니다.',
        ],
        solution: [
          '화면 참조가 필요 없는 곳은 Application Context를 사용하고 Hilt로 객체의 보유 범위를 조정했습니다.',
          'onDispose와 onCleared 등 생명주기 종료 지점에서 Listener와 리소스를 해제하도록 정리했습니다.',
          'Compose의 remember와 DisposableEffect로 등록과 해제를 함께 관리하고, 순환 참조가 우려되는 곳은 WeakReference 사용을 검토했습니다.',
        ],
        result: [
          '화면 종료 후 남을 수 있던 Context와 Listener 참조를 정리했습니다.',
          '객체를 보유하는 범위와 해제 지점을 구분해 장시간 실행 시 점검해야 할 참조를 명확히 했습니다.',
        ],
        visual: {
          src: 'screenshot/naenun-memory-leak-visual.png',
          alt: 'Activity 참조와 Listener를 생명주기에 맞춰 해제하는 메모리 누수 방지 흐름',
        },
        implementation: [
          {
            description:
              '수명이 긴 객체가 Activity Context, Callback, Listener를 보유하는 지점을 점검했습니다. 화면 참조가 필요 없으면 Application Context로 바꾸고, 나머지는 생명주기가 끝날 때 해제하도록 정리했습니다.',
          },
          {
            description:
              'Compose에서는 remember로 유지하는 객체와 외부 Listener 등록 지점을 함께 확인했습니다. DisposableEffect의 dispose 단계나 ViewModel의 onCleared에서 해제하도록 책임을 정했습니다.',
          },
        ],
        alternatives: [
          '문제가 드러난 객체만 null로 바꾸면 비슷한 참조가 남을 수 있어 객체의 수명과 참조 방향을 함께 점검했습니다.',
          'Singleton을 일괄 제거하기보다 앱 전체에서 필요한 객체와 화면 안에서만 필요한 객체를 나눠 보유 범위를 조정했습니다.',
        ],
      },
    ],
    insights: [],
    achievements: [
      rich('상용 키오스크의 ', strong('화면을 Compose로 통일'), '하고 Route, Screen, Component의 역할을 나눴습니다.'),
      'Activity Context와 Singleton의 보유 범위를 조정하고 Listener 해제 지점을 정리했습니다.',
      '패키지를 기능과 계층별로 나누고 반복되는 UI를 공통 컴포넌트로 옮겨 중복 수정 범위를 줄였습니다.',
      rich('SSAFY 13기 구미캠퍼스 자율 프로젝트에서 ', strong('우수상'), '을 받았습니다.'),
    ],
    retrospective: [
      '초기에 기업과 팀이 이해한 요구사항이 달라 설계를 두 번 이상 수정했습니다. 기존 코드와 요구사항을 먼저 정리하고 작업 범위와 우선순위를 합의할 필요가 있었습니다.',
      '화면을 Compose로 옮기는 과정에서 상태 관리, 공통 UI, 운영 시나리오를 함께 정리해야 반복 수정을 줄일 수 있다는 점을 배웠습니다.',
    ],
    links: [
      { label: 'Figma', url: 'https://www.figma.com/design/A8UNusvo5ANwq4rgU9aLXv/%EC%8B%B8%ED%94%BC-%EC%9E%90%EC%9C%A8-%EC%8A%A4%EB%A7%88%ED%8A%B8-%EA%B2%BD%EB%A1%9C%EB%8B%B9-%ED%82%A4%EC%98%A4%EC%8A%A4%ED%81%AC?node-id=0-1&t=iH3kiLCnJjtKTm2p-1' },
    ],
    screenshots: [
      'screenshot/nanoon1.png',
      'screenshot/nanoon2.png',
      'screenshot/nanoon3.png',
      'screenshot/nanoon4.png',
      'screenshot/nanoon5.png',
      'screenshot/nanoon6.png',
      'screenshot/nanoon7.png',
      'screenshot/nanoon8.jpeg',
    ],
  },
  {
    id: 'mo-re',
    title: '모리, Mo-Re - Android',
    description: '서버의 자원 사용량을 차트로 확인하고 AI 분석 리포트로 상태를 파악하는 Android 모니터링 앱입니다.',
    cardSummary: {
      description: '서버 자원 사용량 차트와 AI 분석 리포트로 상태를 파악하는 Android 모니터링 앱',
      achievements: [
        '기능별 모듈과 Convention Plugin을 구성해 공통 Gradle 설정을 한곳에서 관리',
        'Jetpack Compose로 서버 메트릭을 표시하는 시계열 차트 직접 구현',
        rich('6개 API 병렬 호출로 로딩 시간 ', strong('약 356ms에서 156ms로 단축'), ' (약 56% 단축)'),
      ],
    },
    thumbnail: 'screenshot/more1.jpg',
    tech: ['Kotlin', 'Jetpack Compose', 'Orbit MVI', 'Hilt', 'Retrofit2', 'OkHttp3', 'Navigation3', 'DataStore', 'Coroutines', 'Flow'],
    period: '2025.08.25 ~ 2025.09.29',
    team: '6명 (Backend 4명, Android 2명)',
    role: 'Android 구조 설계, 시계열 차트와 메트릭 조회 개발',
    details: [
      'Spring Boot 서버와 인스턴스의 자원 사용량, 애플리케이션 메트릭을 모바일에서 확인하는 앱을 개발했습니다.',
      'PC를 사용할 수 없는 상황에서도 서버 상태를 확인하고 장애나 성능 저하에 대응할 수 있도록 기획했습니다.',
    ],
    features: [
      '모니터링할 인스턴스와 서버를 등록하고 관리할 수 있어야 했습니다.',
      'CPU, 메모리, 네트워크 사용량을 실시간으로 확인하고 시계열 차트로 볼 수 있어야 했습니다.',
      'ThreadPool, Hikari Connection Pool과 HTTP 요청 메트릭을 확인할 수 있어야 했습니다.',
      'AI가 요약한 시스템 상태와 상세 분석 리포트를 제공해야 했습니다.',
      '날짜별로 메트릭을 조회하고 일일 통계를 확인할 수 있어야 했습니다.',
    ],
    contributions: [
      '기능별로 모듈을 나누고 Convention Plugin으로 공통 빌드 설정을 관리했습니다.',
      'Jetpack Compose로 시계열 차트를 직접 구현했습니다.',
      rich('6개 API를 병렬 호출해 로딩 시간을 ', strong('약 356ms에서 156ms로 줄였습니다'), '. 기존보다 약 56% 단축했습니다.'),
    ],
    problemSolvings: [
      {
        problem: [
          '인스턴스 상세 화면에서 CPU, 메모리, 네트워크 수신과 송신, 이벤트 요약, AI 리포트의 6개 API를 순차 호출해 로딩에 약 356ms가 걸렸습니다.',
          '예외 처리가 분산되어 있어 로그만으로 어느 API가 실패했는지 파악하기 어려웠습니다.',
        ],
        solution: [
          'supervisorScope와 async로 6개 API를 독립적인 코루틴에서 병렬 실행했습니다.',
          '각 호출을 runCatching으로 감싸고 실패한 메트릭의 이름과 원인을 로그에 남겼습니다.',
        ],
        result: [
          rich('전체 로딩 시간을 ', strong('약 356ms에서 156ms로 줄여 약 56% 단축했습니다'), '.'),
          '일부 API가 실패해도 성공한 데이터는 화면에 표시하고, 실패한 API는 개별 로그로 추적할 수 있도록 했습니다.',
        ],
        visual: {
          src: 'screenshot/more-parallel-api-visual.png',
          alt: '6개 API를 병렬로 호출하고 일부 요청 실패에도 나머지 결과를 표시하는 흐름',
        },
        implementation: [
          {
            description: '로딩을 시작하면 isLoading을 설정하고 오류 상태를 초기화합니다. 선택된 날짜가 없으면 기존 state.nowDate로 다시 조회합니다.',
          },
          {
            description: 'supervisorScope 안에서 6개 API를 async로 호출하고 각 결과를 runCatching으로 처리합니다. 실패하면 메트릭 이름과 예외를 기록하고 null을 반환해 나머지 결과를 계속 표시합니다.',
          },
          {
            description: '각 작업의 결과를 await로 받아 상태 로그를 남깁니다. 시계열 데이터는 공통 TimeMetric으로 변환하고 차트에 필요한 평균값을 계산해 UiState에 반영합니다.',
          },
          {
            description: '차트의 평균값과 요약 메트릭, AI 리포트를 모아 reduce로 상태를 갱신합니다. 모든 메트릭이 null이면 경고 로그를 남겨 전체 조회 실패를 구분합니다.',
          },
        ],
        alternatives: [
          '서버에서 6개 API 결과를 집계해 하나의 응답으로 제공하는 방법도 고려했습니다. 화면에서 부분 실패를 구분하고 차트 값을 계산하는 현재 요구에 맞춰 클라이언트에서 결과를 모았습니다.',
          'ViewModel 밖에서 병렬 호출을 구성할 수도 있지만, 현재 화면에서는 상태 갱신과 실패 로그, 오류 집계를 함께 확인할 수 있는 방식을 선택했습니다.',
        ],
      },
      {
        problem: [
          '모듈마다 Gradle 설정이 반복되어 의존성 버전이나 빌드 옵션을 빠짐없이 맞추기 어려웠습니다.',
        ],
        solution: [
          'build-logic에 Convention Plugin을 정의해 공통 빌드 설정과 의존성을 한곳에서 관리했습니다.',
          '모듈 역할과 사용 기술별로 플러그인을 나눴습니다. 기능 모듈은 mori.android.feature를 적용하면 필요한 공통 설정을 함께 받도록 구성했습니다.',
        ],
        result: [
          '버전이나 공통 빌드 옵션을 build-logic에서 수정하면 관련 모듈에 함께 반영하도록 바꿨습니다.',
          '새 모듈에서도 해당 플러그인을 적용하면 이름 규칙과 Compose, Hilt, 공통 의존성을 같은 기준으로 구성할 수 있게 했습니다.',
        ],
        visual: {
          src: 'screenshot/more-build-logic-visual.png',
          alt: 'Convention Plugin으로 기능 모듈과 공통 Gradle 설정을 관리하는 구조',
        },
        implementation: [
          {
            description: 'AndroidFeatureConventionPlugin에서 기능 모듈에 필요한 플러그인과 라이브러리를 적용합니다. Android 라이브러리, Hilt, Compose 설정과 Lifecycle, Orbit, 테스트 의존성을 한 번에 추가합니다.',
          },
          {
            description: 'AndroidCoreConventionPlugin에서 core 모듈의 Android와 Kotlin 설정을 관리합니다. 기본 라이브러리 플러그인과 androidx-core-ktx, appcompat, material 등 공통 의존성을 적용합니다.',
          },
          {
            description: 'DataStore, 네트워크, 테스트와 코드 검사 설정도 전용 플러그인으로 나눴습니다. 각 플러그인이 필요한 라이브러리와 테스트 의존성을 함께 추가합니다.',
          },
          {
            description: 'feature-dashboard와 feature-instance_detail에서는 mori.android.feature를 선언합니다. 나머지 공통 설정은 build-logic에서 적용하고 각 모듈에는 개별 의존성만 남깁니다.',
          },
        ],
        alternatives: [
          '루트 스크립트를 apply로 공유하는 방법도 있지만, 기능별로 설정을 조합하기 쉽도록 Convention Plugin을 선택했습니다.',
          '설정 규칙을 문서로만 정하면 버전이나 옵션이 누락될 수 있어 플러그인으로 공통 설정을 적용했습니다.',
          'Version Catalog는 의존성 버전 관리에 사용하고, 플러그인과 빌드 옵션까지 함께 적용해야 하는 설정은 Convention Plugin으로 묶었습니다.',
        ],
      },
    ],
    insights: [
      { title: '멀티모듈, Feature-Driven Modularization에 대해서 공부해보자.', url: 'https://superohinsung.tistory.com/436' },
      { title: 'Stateful, Stateless, Statehoisting 이란 무엇일까?', url: 'https://superohinsung.tistory.com/439' },
      { title: 'async와 await로 여러개의 api 병렬 처리하기 feat. 최적화 여정기', url: 'https://superohinsung.tistory.com/441' },
      { title: '멀티 모듈 build-logic을 개발해보자.', url: 'https://superohinsung.tistory.com/440' },
      { title: 'Custom ComposeUI 간단 차트 개발 여정기', url: 'https://superohinsung.tistory.com/443' },
      { title: 'launchedEffect은 무엇이고 다른건 뭐가 있을까?', url: 'https://superohinsung.tistory.com/442' },
      { title: 'Compose가 그려지는 과정에 대해서 알아보자.', url: 'https://superohinsung.tistory.com/444' },
    ],
    achievements: [
      '기능별 모듈과 Convention Plugin을 구성해 공통 Gradle 설정을 한곳에서 관리했습니다.',
      'Jetpack Compose로 서버 메트릭을 표시하는 시계열 차트를 직접 구현했습니다.',
      rich('6개 API를 병렬 호출해 로딩 시간을 ', strong('약 356ms에서 156ms로 줄였습니다'), '. 기존보다 약 56% 단축했습니다.'),
    ],
    retrospective: [
      '팀원의 예비군 일정과 서로 다른 프로젝트 이해도로 초반 작업이 지연됐습니다. 주 3회 리뷰를 통해 진행 상황과 역할을 맞추는 방식이 필요했습니다.',
      '일정 안에 단위 테스트와 UI 테스트를 작성하지 못했습니다. 다음 프로젝트에서는 초기부터 테스트를 작성하고 TDD도 적용해 볼 계획을 세웠습니다.',
      '멀티 모듈과 build-logic은 초기 설정에 시간이 들었지만 기능을 나누고 공통 설정을 수정할 위치를 분명하게 만들었습니다.',
    ],
    links: [
      { label: 'Figma', url: 'https://www.figma.com/design/MWqa25LkSztu0fyAhGo9cV/%ED%8A%B9%ED%99%94-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%94%BC%EA%B7%B8%EB%A7%88?node-id=0-1&t=6zOEaoOnvSXfuP79-1' },
    ],
    screenshots: [
      'screenshot/more1.jpg',
      'screenshot/more2.png',
      'screenshot/more3.png',
      'screenshot/more4.png',
      'screenshot/more5.png',
      'screenshot/more6.png',
      'screenshot/more7.png',
      'screenshot/more8.png',
      'screenshot/more9.png',
      'screenshot/more10.png',
      'screenshot/more11.png',
      'screenshot/more12.png',
      'screenshot/more13.png',
      'screenshot/more14.jpeg',
    ],
    screenshotColumns: 3,
  },
  {
    id: 'glim',
    title: 'Glim - Android',
    description: '마음에 남은 글귀를 짧은 이미지 콘텐츠로 만들고 다른 사람과 나누는 Android 앱입니다.',
    cardSummary: {
      description: '마음에 남은 글귀를 짧은 이미지 콘텐츠로 만들고 공유하는 Android 앱',
      achievements: [
        rich(strong('Orbit MVI'), '로 입력 검증과 상태 변경을 ViewModel에 모아 UI 없이 검증 가능한 구조 구성'),
        'DataStore와 인증 모듈에서 토큰 저장, 재발급 실패와 로그아웃 사유 공통 처리',
        'Channel 기반 Navigator로 화면 이동 요청, 전용 Composable로 백스택 처리 분리',
      ],
    },
    thumbnail: 'screenshot/Glim1.png',
    tech: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Orbit MVI', 'Coroutine', 'Retrofit3', 'Coil', 'Firebase Messaging', 'DataStore', 'Navigation', 'MockK', 'Turbine', 'JUnit'],
    period: '2025.07.07 ~ 2025.08.18',
    team: '6명 (Backend 2명, Android 2명, Frontend 1명, Backend & Android 1명)',
    role: 'Android 로그인, 회원가입과 마이페이지 개발',
    details: [
      '책에서 발견한 글귀를 이미지로 만들고 공유하는 서비스입니다. 짧은 콘텐츠를 통해 책에 관심을 갖도록 기획했습니다.',
      '숏폼을 소비하는 익숙한 방식에 글귀를 담아 독서로 이어질 계기를 만들고자 했습니다.',
    ],
    features: [
      '글귀를 직접 입력하거나 OCR로 읽고, AI 배경 이미지와 글꼴, 크기, 색상, 배치를 조정할 수 있어야 했습니다.',
      '글귀와 도서, 작가를 검색하고 관심사나 주제에 맞는 콘텐츠를 추천해야 했습니다.',
      '글귀 이미지를 공유하고 좋아요, 저장, 댓글을 남길 수 있어야 했습니다.',
      '도서 상세 정보에서 알라딘 구매 페이지로 이동할 수 있어야 했습니다.',
      '마이페이지에서 올리거나 저장한 글귀를 관리하고 잠금화면에 설정할 수 있어야 했습니다.',
    ],
    contributions: [
      'Orbit MVI로 화면 상태와 일회성 이벤트를 나누고 입력 검증을 ViewModel에서 처리했습니다.',
      'Coroutines와 DataStore로 세션 저장과 토큰 재발급, 로그아웃 처리를 구현했습니다.',
      'Channel 기반 Navigator를 도입해 화면 코드와 화면 이동 처리를 분리했습니다.',
      rich('JUnit과 MockK로 ViewModel 동작을 검증하는 ', strong('테스트 130여 개'), '를 작성했습니다.'),
      '글귀 업로드 기록을 GitHub 잔디처럼 보여주는 Compose 컴포넌트를 구현했습니다.',
    ],
    problemSolvings: [
      {
        problem: [
          '토큰 만료, 재발급 실패, 재시도 처리가 여러 곳에 흩어져 인증 예외를 같은 방식으로 처리하기 어려웠습니다.',
        ],
        solution: [
          '인증 기능을 모듈로 분리하고 토큰 만료 시 재발급과 실패 시 로그아웃 흐름을 정리했습니다.',
          'AuthDataStore에 인증 정보를 저장하고 AuthManager에서 메모리 캐시, 자동 로그인 여부와 로그아웃 이벤트를 관리했습니다.',
          'AuthInterceptor가 인증 헤더를 추가하고 TokenAuthenticator가 401 응답의 토큰 재발급과 재시도를 담당하도록 했습니다.',
        ],
        result: [
          '화면과 도메인 코드에서 토큰을 직접 다루지 않고 인증 모듈에 맡기도록 바꿨습니다.',
          '토큰 만료, 재발급 실패와 최대 재시도 초과를 공통 처리해 새 API마다 같은 예외 처리를 반복하지 않도록 했습니다.',
          '로그아웃 사유를 LogoutReason으로 구분하고 화면에 그에 맞는 안내 메시지를 표시했습니다.',
        ],
        visual: {
          src: 'screenshot/glim-auth-flow-visual.png',
          alt: '액세스 토큰 만료 시 재발급과 요청 재시도를 수행하고 갱신 토큰 만료 시 로그아웃하는 흐름',
        },
        implementation: [
          {
            description: 'AuthDataStore가 인증 정보를 저장하고 AuthManager가 메모리 캐시와 동기화합니다. 요청 시에는 메모리에서 토큰을 읽고, logout에서 저장된 정보 삭제와 로그아웃 이벤트 발행을 함께 처리합니다.',
          },
          {
            description: 'OkHttp Interceptor에서 Authorization 헤더를 추가합니다. 네트워크 계층은 AuthManager의 토큰을 읽고 저장과 로그아웃은 AuthManager에 맡깁니다.',
          },
          {
            description: '401 응답을 받으면 Authenticator에서 Refresh Token으로 토큰을 재발급하고 기존 요청을 재시도합니다. 다른 요청이 이미 갱신한 토큰이 있으면 이를 사용해 중복 재발급을 피합니다.',
          },
        ],
        alternatives: [],
      },
      {
        problem: [
          '직접 구현한 MVI에서 화면마다 Intent, Reducer, State 클래스를 만들어 관리해야 했습니다.',
          '단순한 입력 검증과 로딩 처리에도 반복 코드가 많아 수정할 곳을 파악하기 어려웠습니다.',
        ],
        solution: [
          '반복되는 상태 관리 코드를 Orbit으로 옮겼습니다.',
          'ViewModel에 ContainerHost를 적용하고 하나의 container에서 상태와 일회성 이벤트를 관리했습니다.',
          '화면마다 UiState와 SideEffect를 정의해 상태 변경과 메시지 표시를 구분했습니다.',
        ],
        result: [
          '별도 Intent와 Reducer 클래스에 흩어졌던 상태 변경을 ViewModel의 Orbit 컨테이너에서 확인하도록 정리했습니다.',
          '입력 검증, 로딩과 오류 처리를 ViewModel에 모아 UI 없이 단위 테스트로 검증할 수 있게 했습니다.',
          '새 화면에서도 UiState, SideEffect, ViewModel의 같은 구성을 사용하도록 기준을 정했습니다.',
        ],
        visual: {
          src: 'screenshot/glim-mvi-test-visual.png',
          alt: 'Orbit MVI에서 입력과 상태, 일회성 이벤트를 분리하고 ViewModel을 테스트하는 구조',
        },
        implementation: [
          {
            description: '이메일, 비밀번호, 오류 메시지와 로딩 여부를 LoginUiState에 담았습니다. isLoginEnabled로 버튼 활성화 여부를 계산하고, 한 번만 표시할 오류 메시지는 LoginSideEffect.ShowError로 전달합니다.',
          },
          {
            description: 'LoginViewModel에 ContainerHost를 적용했습니다. 이메일이나 비밀번호가 바뀌면 intent에서 입력값을 검증하고 reduce로 입력값과 오류 메시지를 갱신합니다.',
          },
          {
            description: '로그인 버튼을 누르면 전체 입력값을 검증합니다. 오류가 있으면 상태와 안내 메시지를 갱신하고, 정상이면 로딩 상태를 표시한 뒤 LoginUseCase를 실행하고 화면 이동을 요청합니다.',
          },
          {
            description: 'LoginRoute가 상태와 일회성 이벤트를 구독합니다. LoginScreen에는 LoginUiState와 콜백만 전달해 화면을 그리는 역할을 맡깁니다.',
          },
        ],
        alternatives: [
          '기존 Intent와 reducer를 합치는 방법도 검토했지만, 화면이 늘어날 때 분기 처리가 커지지 않도록 Orbit의 컨테이너를 사용했습니다.',
          'StateFlow와 확장 함수로 직접 구성할 수도 있지만, 상태와 일회성 이벤트 처리를 다시 구현하기보다 Orbit의 기능을 사용했습니다.',
        ],
      },
      {
        problem: [
          '각 Screen이 NavBackStack을 직접 조작해 UI 변경과 화면 이동 구현을 함께 다뤄야 했습니다.',
          '화면마다 이동, 뒤로 가기와 백스택 초기화 방식이 달라 같은 처리가 반복됐습니다.',
        ],
        solution: [
          'Channel로 화면 이동 요청을 전달하는 Navigator를 도입했습니다.',
          'Navigator 인터페이스와 구현체를 별도 모듈에 두고 화면에서는 인터페이스를 통해 이동을 요청하도록 했습니다.',
          'ViewModel이 Channel에 이동 요청을 보내면 전용 ViewModel과 Composable이 받아 NavBackStack을 조작하도록 구성했습니다.',
        ],
        result: [
          '화면마다 직접 백스택을 조작하던 코드를 Navigator와 전용 Composable로 모았습니다.',
          'ViewModel은 navigator.navigate로 이동만 요청하고 백스택 처리는 전용 Composable에 맡기도록 나눴습니다.',
          'InternalRoute와 RouteSideEffect 등 타입으로 이동 경로를 정의해 문자열 오타를 컴파일 단계에서 확인할 수 있게 했습니다.',
        ],
        visual: {
          src: 'screenshot/glim-navigator-channel-visual.png',
          alt: 'ViewModel의 화면 이동 요청을 Navigator와 Channel을 통해 화면에 전달하는 구조',
        },
        implementation: [
          {
            description: 'NavigatorImpl이 Channel로 이동 요청을 전달합니다. Hilt에서 Navigator와 InternalNavigator를 같은 구현체에 연결하고, 요청하는 쪽과 수신하는 쪽이 각각 필요한 인터페이스만 사용하도록 나눴습니다.',
          },
          {
            description: 'Channel로 전달할 이동 요청을 InternalRoute로 정의했습니다. NavigatorViewModel은 이를 화면에서 처리할 RouteSideEffect로 변환합니다.',
          },
          {
            description: 'LaunchedNavigator가 NavigatorViewModel의 이벤트를 수집합니다. RouteSideEffect에 따라 이동, 뒤로 가기와 백스택 초기화를 한곳에서 처리합니다.',
          },
          {
            description: '화면의 ViewModel은 주입받은 Navigator로 이동을 요청합니다. NavBackStack과 NavController를 직접 다루지 않아 화면 로직과 이동 구현을 따로 수정할 수 있습니다.',
          },
        ],
        alternatives: [],
      },
    ],
    insights: [
      { title: 'Android 앱 아키텍처 가이드 정리', url: 'https://superohinsung.tistory.com/427' },
      { title: 'Orbit Multiplatform 개요와 Core 탐구하기', url: 'https://superohinsung.tistory.com/428' },
      { title: 'Orbit Multiplatform ViewModel, ComposeUI, Test 탐구하기', url: 'https://superohinsung.tistory.com/429' },
      { title: 'Orbit으로 MVI 구현기', url: 'https://superohinsung.tistory.com/430' },
      { title: 'Compose Navigation은 어떻게 하면 좋을까?', url: 'https://superohinsung.tistory.com/431' },
      { title: '안드로이드 프로젝트에서 토큰 관리는 어떻게 했나요? feat AuthManagingSystem', url: 'https://superohinsung.tistory.com/437' },
    ],
    achievements: [
      'Orbit MVI로 입력 검증과 상태 변경을 ViewModel에 모아 UI 없이 검증할 수 있도록 했습니다.',
      'DataStore와 인증 모듈에서 토큰 저장, 재발급 실패와 로그아웃 사유를 공통 처리했습니다.',
      'Channel 기반 Navigator로 화면 이동을 요청하고 전용 Composable에서 백스택을 처리하도록 분리했습니다.',
      rich('JUnit과 MockK로 ViewModel 동작을 검증하는 ', strong('테스트 130여 개'), '를 작성했습니다.'),
      '글귀 업로드 기록을 잔디 형태로 보여주는 Compose 컴포넌트를 구현했습니다.',
      rich('SSAFY 13기 구미캠퍼스 공통 프로젝트에서 ', strong('우수상'), '을 받았습니다.'),
    ],
    retrospective: [
      '사용자 테스트가 늦어 화면 수정이 개발 후반에 몰렸고 리팩토링을 마무리할 시간도 부족했습니다. 초기 시제품부터 사용자의 반응을 확인할 필요가 있었습니다.',
      'Orbit으로 상태 변경을 모으고 테스트를 작성하면서 기능 수정 후 기존 동작을 확인할 기준을 만들었습니다. 기능 개발과 작은 리팩토링을 함께 진행하는 방식이 필요하다고 느꼈습니다.',
      '상태 구독과 일회성 이벤트를 다루며 Cold Stream과 Hot Stream의 차이를 학습했습니다.',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/ois0886/Glim' },
      { label: 'Figma', url: 'https://www.figma.com/design/fXNJ4oRRJW0dowjC1GT5rm/SSAFY?node-id=16-8600&t=h9dCaxC5WPn9OK9J-1' },
    ],
    screenshots: [
      'screenshot/Glim1.png',
      'screenshot/Glim2.png',
      'screenshot/Glim3.png',
      'screenshot/Glim4.png',
      'screenshot/Glim5.png',
      'screenshot/Glim6.png',
      'screenshot/Glim7.png',
      'screenshot/Glim8.jpeg',
    ],
    screenshotColumns: 3,
  },
  {
    id: 'pubburi',
    title: '주점부리 - Backend & Frontend & Recommendation',
    description: '취향에 맞는 주류를 찾고, 비교하고, 후기를 남길 수 있는 웹 서비스입니다.',
    cardSummary: {
      description: '취향에 맞는 주류를 탐색하고 비교할 수 있는 웹 서비스',
      achievements: [],
    },
    thumbnail: 'screenshot/pubburi-logo.webp',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'Python', 'FastAPI'],
    period: '2026.10.31 ~ 진행 중',
    role: 'Backend & Frontend & Recommendation 개발',
    details: [
      'Spring Boot 백엔드와 React 웹을 연동해 주종, 가격, 도수, 맛과 향으로 주류를 검색하고, 상품을 비교하거나 찜하고 후기를 남길 수 있도록 했습니다.',
      rich('Python과 ', strong('FastAPI 기반 추천 서비스'), '에서 취향 설문, 찜, 후기를 바탕으로 주류를 추천하고 그 이유를 보여주는 기능을 개발하고 있습니다.'),
    ],
    features: [],
    contributions: [],
    problemSolvings: [],
    insights: [],
    achievements: [],
    retrospective: [],
    links: [
      { label: 'GitHub', url: 'https://github.com/Pubburi' },
    ],
    screenshots: [],
  },
  {
    id: 'quiz-cafe',
    title: 'Quiz Cafe - Android',
    description:
      'CS와 개발 지식을 퀴즈로 학습하고 문제집과 학습 기록을 관리하는 Android 앱입니다.',
    cardSummary: {
      description: 'CS와 개발 지식을 퀴즈로 학습하고 문제집과 학습 기록을 관리하는 Android 앱',
      achievements: [
        '메인 화면과 마이페이지 개발을 통한 1차 MVP 완성',
        '전체 화면의 Compose 구현과 재사용 가능한 공통 UI 개발',
        rich('UiState, Intent, SideEffect로 상태와 이벤트를 분리하는 ', strong('MVI 구조 직접 적용')),
      ],
    },
    thumbnail: 'screenshot/QuizCafe1.png',
    tech: [
      'Kotlin',
      'Jetpack Compose',
      'Hilt',
      'MVI',
      'Coroutine',
      'Retrofit2',
      'Room',
      'DataStore',
      'Google Auth',
      'Navigation',
      'Ktlint',
    ],
    period: '2025.04 ~ 2025.06',
    team: '6명 (Backend 2명, Android 4명)',
    role: 'Android 메인 화면과 마이페이지 개발',
    details: [
      'CS와 개발 지식을 원하는 시간에 퀴즈로 학습할 수 있도록 기획했습니다. 사용자가 문제집을 만들고 풀이 결과를 확인하는 앱입니다.',
    ],
    features: [
      '퀴즈를 만들고 수정하거나 삭제하며 직접 풀 수 있어야 했습니다.',
      '문제집별로 퀴즈를 풀고 좋아요를 남길 수 있어야 했습니다.',
      '카테고리를 만들어 문제집을 분류하고 항목별 개수를 3~5개로 제한해야 했습니다.',
      '풀이 결과를 저장하고 완료 후 점수와 정답률을 제공해야 했습니다.',
      '마이페이지에서 문제집과 퀴즈를 관리하고 학습 기록을 잔디 형태로 확인할 수 있어야 했습니다.',
    ],
    contributions: [
      '메인 화면과 마이페이지를 맡아 1차 MVP를 개발했습니다.',
      '여러 화면에서 재사용할 수 있는 Compose 공통 UI를 만들었습니다.',
      '모든 화면을 Jetpack Compose로 구현했습니다.',
      'UiState, Intent, SideEffect로 나눈 MVI 구조를 직접 설계하고 적용했습니다.',
      'DataStore로 자동 로그인과 세션 관리를 구현하고 Retrofit과 Coroutines로 비동기 통신과 예외 처리를 구성했습니다.',
    ],
    problemSolvings: [
      {
        problem: [
          'JWT 토큰과 이메일을 SharedPreferences에 저장하고 있어 동기식 접근과 키별 타입 관리를 직접 다뤄야 했습니다.',
          '세션 변경을 스트림으로 구독하기 어려워 토큰 변경과 로그아웃 상태를 앱 전체에 반영하는 처리가 복잡했습니다.',
        ],
        solution: [
          'Preferences DataStore로 세션 저장소를 옮겨 Coroutines로 값을 갱신하고 Flow로 변경을 구독했습니다.',
          'AuthDataStore는 저장, AuthManager는 메모리 캐시와 로그아웃 이벤트, AuthInterceptor는 인증 헤더를 담당하도록 나눴습니다.',
        ],
        result: [
          '세션을 비동기로 저장하고 DataStore와 StateFlow에서 변경을 구독하도록 바꿨습니다.',
          '토큰 저장, 읽기, 삭제와 로그아웃 진입점을 인증 모듈에 모아 화면마다 같은 처리를 반복하지 않도록 했습니다.',
        ],
        visual: {
          src: 'screenshot/quiz-cafe-session-flow-visual.png',
          alt: 'DataStore와 AuthManager에서 인증 정보를 관리하고 Interceptor와 로그아웃 이벤트로 전달하는 흐름',
        },
        implementation: [
          {
            description:
              'DataStore 접근을 확장 함수로 묶고 Access Token, Refresh Token, 이메일 키를 stringPreferencesKey로 정의했습니다.',
          },
          {
            description:
              'applicationScope에서 DataStore의 Flow를 수집해 최신 토큰과 이메일을 @Volatile 메모리 캐시에 반영합니다. 네트워크 계층은 이 캐시에서 값을 읽습니다.',
          },
          {
            description:
              'OkHttp Interceptor가 AuthManager에서 Access Token을 읽고 유효한 값이 있을 때 Authorization 헤더를 추가합니다.',
          },
        ],
        alternatives: [
          'SharedPreferences를 유지하고 I/O 스레드만 분리할 수도 있었습니다. 저장값 변경 구독과 일괄 갱신을 함께 지원하는 DataStore를 선택했습니다.',
          'Room이나 파일 저장소도 가능하지만 소량의 세션 값을 키와 값으로 관리하는 용도에는 DataStore가 더 간단했습니다.',
        ],
      },
      {
        problem: [
          '입력 검증, 로딩 상태와 화면 이동 코드가 View와 ViewModel에 흩어져 화면마다 상태를 처리하는 방식이 달랐습니다.',
          'UI와 비즈니스 로직이 섞여 사용자 동작이 어떤 상태 변경과 화면 이동을 만드는지 추적하기 어려웠습니다.',
        ],
        solution: [
          '화면마다 UiState, Intent, SideEffect를 정의하고 입력 이벤트를 받아 새 상태와 일회성 이벤트를 만드는 MVI 구조를 적용했습니다.',
          'Compose는 상태 표시와 Intent 전달을 맡기고 검증, 오류 변환과 화면 이동 요청은 ViewModel에서 처리했습니다.',
        ],
        result: [
          '화면마다 달랐던 상태 관리 방식을 UiState, Intent, SideEffect 구조로 통일했습니다.',
          '로딩, 성공과 실패, 오류 메시지와 화면 이동을 어떤 이벤트가 만드는지 ViewModel에서 확인할 수 있게 했습니다.',
        ],
        visual: {
          src: 'screenshot/quiz-cafe-mvi-flow-visual.png',
          alt: '직접 설계한 MVI에서 Intent와 UiState, SideEffect로 입력과 화면 상태를 분리하는 흐름',
        },
        implementation: [
          {
            description:
              '이메일, 비밀번호, 로딩 여부와 필드별 오류를 LoginUiState에 담습니다. 버튼 활성 조건은 isLoginEnabled에서 계산해 화면에서 조건을 중복 정의하지 않도록 했습니다.',
          },
          {
            description:
              '텍스트 변경, 버튼 클릭, 외부 로그인 결과와 검증 실패를 Intent로 정의해 이벤트와 필요한 값을 한곳에서 확인하도록 했습니다.',
          },
          {
            description:
              'handleIntent에서 UseCase와 외부 로그인을 호출하고 오류를 변환하거나 Effect를 발행합니다. reduce는 Intent에 맞는 새 LoginUiState를 만듭니다.',
          },
          {
            description:
              'Route가 상태와 Effect를 구독하고 화면 이동과 Toast를 처리합니다. Screen은 UiState를 표시하고 사용자 동작을 sendIntent로 전달합니다.',
          },
        ],
        alternatives: [
          '기존 MVVM에 상태 갱신 규칙만 맞출 수도 있었지만, 화면별 이벤트와 상태를 같은 형식으로 확인하기 위해 MVI 구조를 명시했습니다.',
          '콜백만으로 구성할 수도 있지만 이벤트의 종류와 필요한 값을 함께 확인할 수 있도록 sealed Intent를 사용했습니다.',
        ],
      },
    ],
    insights: [
      {
        title: 'Retrofit의 내부구조와 동작 알아보기',
        url: 'https://superohinsung.tistory.com/398',
      },
      {
        title: '코루틴 정리 feat. suspend 키워드까지',
        url: 'https://superohinsung.tistory.com/132',
      },
      {
        title: 'ViewModel이란 무엇이고 그리고 LifeCycle 까지',
        url: 'https://superohinsung.tistory.com/393',
      },
      {
        title: 'UiState–Intent–SideEffect MVI 구조를 직접 설계하고 적용해보자',
        url: 'https://superohinsung.tistory.com/432',
      },
      {
        title: 'DataStore를 왜 쓸까? feat. 내부 데이터 저장하기',
        url: 'https://superohinsung.tistory.com/433',
      },
      {
        title: 'Retrofit 네트워크 Mapper와 Utility 아키텍처 설계를 어떻게 하였을까?',
        url: 'https://superohinsung.tistory.com/435',
      },
    ],
    achievements: [
      '메인 화면과 마이페이지를 맡아 1차 MVP를 완성했습니다.',
      '모든 화면을 Compose로 구현하고 재사용할 수 있는 공통 UI를 만들었습니다.',
      rich('UiState, Intent, SideEffect로 상태와 이벤트를 나누는 ', strong('MVI 구조'), '를 직접 적용했습니다.'),
      'DataStore 기반 자동 로그인과 세션 관리, Retrofit과 Coroutines 기반 비동기 통신과 예외 처리를 구현했습니다.',
    ],
    retrospective: [
      'MVI를 직접 구현하며 상태와 이벤트의 흐름을 익혔습니다. 반복 구현이 필요한 부분은 Orbit 같은 라이브러리와 비교해 볼 필요가 있었습니다.',
      '기능이 늘면서 의존 관계 관리가 복잡해졌습니다. 다음에는 기능, 데이터, 도메인 모듈의 경계를 초기에 정하고 필요한 만큼 나눌 계획입니다.',
      '구조를 한 번에 완성하려 하기보다 실제 기능을 추가하며 반복 코드와 책임이 섞인 지점을 조금씩 정리하는 편이 도움이 됐습니다.',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Kotlin-Android-Study-with-SSAFY/Quiz-Cafe-Android' },
      { label: 'Figma', url: 'https://www.figma.com/design/sWI7Mxpn5l3AvbEmWnAyFi/QuizCafe?node-id=0-1&t=oHhumuctG9hTnuxB-1' },
    ],
    screenshots: [
      'screenshot/QuizCafe1.png',
    ],
  },
  {
    id: 'dear-my-diary',
    title: 'Dear My Diary - Android',
    description: '사진과 메모를 바탕으로 AI가 일기를 작성하고 감정 이모지, 캘린더와 지도로 하루를 돌아보는 Android 앱입니다.',
    cardSummary: {
      description: '사진과 메모 기반 AI 일기, 감정 이모지와 캘린더를 제공하는 한성대학교와 Qualcomm의 산학협력 프로젝트',
      achievements: [
        rich(strong('FP16 GPT-2'), '의 모델 로딩, BPE 토큰화와 반복 추론을 Android 앱에 통합'),
        '이미지 분류 키워드, 음성 메모와 사용자 취향을 조합한 일기 생성 흐름 구현',
        '음성 입력의 감정 결과를 이모지로 변환하고 사용자별 선택 상태 저장 및 복원',
      ],
    },
    thumbnail: 'screenshot/dear-my-diary-overview.png',
    tech: ['Kotlin', 'XML', 'GPT-2', 'TensorFlow Lite', 'ViewModel', 'StateFlow', 'Coroutines', 'Hilt', 'Retrofit', 'Room'],
    period: '2024.07 ~ 2024.08',
    team: '학생 20명 (Android 4명, Backend 4명, AI 4명, UI 5명, 기획 3명) / Qualcomm 재직자 멘토 1명, 지도교수 1명',
    role: 'Android 팀장 / 온디바이스 AI 기능 개발 및 앱 통합',
    details: [
      '한성대학교와 Qualcomm의 산학협력 프로젝트로, 하루의 사진과 기록을 AI 일기로 연결하는 앱을 개발했습니다.',
      'Qualcomm 재직자 멘토의 멘토링을 받으며 기획, UI, AI, Backend 팀과 협업했습니다.',
      'Hugging Face의 사전학습 GPT-2와 TensorFlow Lite 추론 구현을 앱에 맞게 적용해 일기 생성과 음성 기반 감정 이모지 기능으로 연결했습니다.',
    ],
    features: [
      '사진과 텍스트 또는 음성 메모를 입력해 일기를 작성하고 감정 이모지를 선택할 수 있어야 했습니다.',
      '최근 일기와 날짜별 기록을 확인하고, 캘린더에서 일정을 관리할 수 있어야 했습니다.',
      '일기 사진의 위치를 지도에 표시하고 인증된 사용자의 기록을 저장하고 조회해야 했습니다.',
    ],
    contributions: [
      'Android 팀장으로 참여해 언어 모델과 이미지 분류 모듈을 분리하고 앱의 화면 및 데이터 계층에 연결했습니다.',
      'FP16 모델과 vocabulary, merges 파일을 준비하는 구성을 추가하고 BPE 토큰화, 모델 로딩, 추론과 문장 복원 경로를 앱에 적용했습니다.',
      'Top-K 샘플링을 사용하는 토큰별 추론 결과를 StateFlow에 누적해 생성 중인 문장을 화면에 전달했습니다.',
      '사진 분류 결과를 텍스트 키워드로 변환하고 직접 입력하거나 음성으로 기록한 메모, 사용자 취향을 일기 생성 입력으로 조합했습니다.',
      'GPT-2 출력에서 감정 단어를 추출해 이모지로 매핑하고, 인식한 감정이 없을 때의 기본값과 로딩 종료 처리를 보완했습니다.',
      '감정 이모지의 선택 결과를 사용자별로 저장하고 홈 화면에 다시 반영하도록 연결했습니다.',
      '최근 일기, 캘린더와 지도에 기록 데이터를 연결하고 Room 저장 및 조회 경로에 사용자 정보를 반영했습니다.',
    ],
    problemSolvings: [
      {
        problem: [
          '초기 feature 모듈에 있던 QA 코드는 질문과 본문에서 답변 구간을 찾는 구조였고, 일기 작성에는 새로운 문장을 생성하는 실행 경로가 필요했습니다.',
          '사전학습 GPT-2를 Android에서 사용하려면 모델과 사전 파일 준비, 토큰화, 텐서 입출력 처리와 생성 토큰의 문장 복원까지 연결해야 했습니다.',
        ],
        solution: [
          'gpt2와 imageClassification 모듈을 분리하고, 사전학습 모델과 추론 구현을 앱의 ViewModel 및 Hilt 구성에 맞게 적용했습니다.',
          'FP16 모델, vocabulary와 merges 파일을 준비하는 설정을 추가하고, 사전과 BPE 병합 순위를 읽어 tokenizer를 초기화했습니다.',
          '모델 파일은 메모리 매핑으로 로드하고, 토큰 입력과 모델 출력을 구성해 반복 추론하도록 연결했습니다.',
          '상위 후보를 사용하는 Top-K 샘플링으로 다음 토큰을 선택하고, 선택한 토큰을 다음 입력에 추가하면서 문장으로 복원했습니다.',
          '파일 로드는 Dispatchers.IO, 추론은 Dispatchers.Default에서 처리하고 생성 토큰을 StateFlow에 누적해 화면에 전달했습니다.',
        ],
        result: [
          '텍스트 입력부터 토큰화, 기기 내 추론과 문장 출력까지 이어지는 실행 경로를 앱에 구성했습니다.',
          '복원한 토큰을 상태에 누적하고 화면에서 구독해 생성 중인 문장을 표시하도록 연결했습니다.',
        ],
        visual: {
          src: 'screenshot/dear-my-diary-inference-visual.png',
          alt: '사전학습 GPT-2 모델과 BPE tokenizer를 TFLite 추론에 연결하고 생성 토큰을 일기 화면에 전달하는 흐름',
        },
        implementation: [
          {
            description: '모델과 사전을 준비한 뒤 tokenizer와 Interpreter를 초기화합니다. 사전학습 모델의 추론 구성을 앱의 ViewModel에 연결한 부분입니다.',
          },
          {
            description: '토큰 시퀀스를 모델 입력에 맞게 구성하고 출력 텐서에서 마지막 유효 토큰 위치의 logits를 읽습니다. 다음 토큰은 이 값에서 Top-K 샘플링으로 선택합니다.',
          },
          {
            description: '선택한 토큰을 다음 추론의 입력에 추가하고 문자열로 복원합니다. 추론 루프에서 결과를 StateFlow에 누적해 일기 화면이 생성 문장을 구독하도록 적용했습니다.',
          },
        ],
        alternatives: [],
      },
      {
        problem: [
          '일기 생성에는 사진의 내용, 사용자가 기록한 사건과 취향 정보를 함께 활용해야 했습니다.',
          '사진은 분류 키워드로, 음성은 메모 텍스트로 바꿔 언어 모델에 연결해야 했고, 길어진 입력은 고정 길이 모델에 맞게 정리해야 했습니다.',
        ],
        solution: [
          '사진 크롭이 완료되면 이미지 분류기를 호출하고, 반환된 분류 결과를 텍스트 키워드로 연결했습니다.',
          'SpeechRecognizer로 받은 메모와 사용자의 나이, 취미, 음악, 영화 등 취향 정보를 읽어 일기 생성 프롬프트에 조합했습니다.',
          '초기에는 취향 목록을 모두 나열했지만 이후 사진 키워드와 선택한 사용자 정보, 메모 중심으로 프롬프트를 줄였습니다.',
          '메모를 입력의 마지막에 배치하고 일기 작성 지시와 감정 이모지용 지시를 각 기능의 목적에 맞게 나눴습니다.',
        ],
        result: [
          '이미지 분류 모델의 출력을 언어 모델의 입력으로 연결하고, 사용자의 기록과 취향도 일기 생성에 활용하는 흐름을 구성했습니다.',
          '사진 선택, 직접 입력과 음성 메모 등 서로 다른 입력 경로를 일기 생성 프롬프트에 모았습니다.',
        ],
        visual: {
          src: 'screenshot/dear-my-diary-prompt-composition-visual.png',
          alt: '사진 분류 키워드와 사용자 취향 일부, 음성 또는 직접 작성한 메모를 일기 생성 프롬프트로 조합하는 흐름',
        },
        implementation: [
          {
            description: '크롭한 사진을 분류하고 키워드가 갱신되면 프롬프트도 다시 구성합니다. 이미지 분류 결과를 일기 생성 입력으로 연결하는 부분입니다.',
          },
          {
            description: '사진 분류 키워드와 취향 정보 일부, 메모를 조합한 프롬프트입니다. 사용자 정보에는 취미, 영화, 음악, 성격과 여행 취향을 활용했습니다.',
          },
        ],
        alternatives: [],
      },
      {
        problem: [
          '홈 캐릭터는 정해진 감정 이모지로 표시해야 했지만, GPT-2의 출력은 자유로운 생성 텍스트였습니다.',
          '음성으로 설명한 하루를 감정 이모지에 연결하려면 출력에서 사용할 감정을 찾아 이모지 식별자로 변환하고, 화면에 다시 들어왔을 때의 선택 상태도 관리해야 했습니다.',
        ],
        solution: [
          '음성을 텍스트로 인식한 뒤 미리 정의한 감정 목록 중 하나를 선택하도록 프롬프트를 구성했습니다.',
          '생성 결과에서 대소문자를 구분하지 않는 단어 경계 검색으로 감정 후보를 찾고, 후보가 없거나 결과가 비어 있으면 기본 감정을 반환하도록 보완했습니다.',
          '감정 후보를 찾지 못한 분기에서도 로딩 상태를 종료하도록 수정했습니다.',
          '감정 결과를 Activity Result로 홈에 전달하고, 감정 이름을 이모지 식별자로 매핑해 사용자별 Room 저장과 화면 복원으로 연결했습니다.',
        ],
        result: [
          'GPT-2의 텍스트 출력을 홈 캐릭터의 감정 이모지로 변환하는 후처리 경로를 구현했습니다.',
          '감정 후보가 없는 응답에는 기본값을 적용하고, 선택된 이모지를 저장해 홈에서 다시 읽도록 연결했습니다.',
        ],
        visual: {
          src: 'screenshot/dear-my-diary-emotion-mapping-visual.png',
          alt: '음성 입력의 감정 응답을 감정 후보 또는 기본값으로 정규화하고 이모지로 저장하는 흐름',
        },
        implementation: [
          {
            description: '미리 정의한 감정 단어를 생성 결과에서 찾습니다. 일치하는 감정이 없는 경우에도 기본 감정과 로딩 종료 상태를 함께 반영하도록 보완한 부분입니다.',
          },
          {
            description: '홈에서는 감정 이름을 이모지 식별자로 바꾸고 저장 결과를 화면 상태에 반영합니다. 저장한 이모지는 홈을 다시 구성할 때 조회합니다.',
          },
        ],
        alternatives: [],
      },
    ],
    insights: [],
    achievements: [
      rich(strong('FP16 GPT-2'), '의 모델 로딩, BPE 토큰화와 반복 추론을 Android 앱에 통합했습니다.'),
      '이미지 분류 키워드, 음성 메모와 사용자 취향을 조합한 일기 생성 흐름을 구현했습니다.',
      '음성 입력의 감정 결과를 이모지로 변환하고 사용자별 선택 상태를 저장하고 복원하도록 연결했습니다.',
    ],
    retrospective: [],
    links: [],
    screenshots: [
      'screenshot/dear-my-diary-overview.png',
      'screenshot/dear-my-diary-home.png',
      'screenshot/dear-my-diary-diary.png',
      'screenshot/dear-my-diary-photo-memo.png',
    ],
    hasBottomScreenshot: false,
  },
  {
    id: 'didimdol',
    title: 'Didimdol - Android',
    description:
      '주변 업체를 검색하고 지도에서 위치를 확인한 뒤 온라인으로 예약하는 Android 앱입니다.',
    cardSummary: {
      description: '주변 업체 검색, 지도 위치 확인과 온라인 예약을 제공하는 Android 앱',
      achievements: [
        'Android 팀 리드로 검색, 지도와 예약 기능 연결',
        rich('Room 기반 로컬 검색으로 업체 목록 응답시간을 ', strong('3~5초에서 0.5초 이하로 단축')),
        '검색된 업체에만 Direction5 API를 호출하고 거리순 정렬 결과 표시',
      ],
    },
    thumbnail: 'screenshot/didim1.png',
    tech: [
      'Kotlin',
      'Hilt',
      'MVVM',
      'Coroutines',
      'Retrofit2',
      'Room',
      'StateFlow',
      'Naver Maps API',
      'Direction5 API',
      'EncryptedSharedPreferences',
    ],
    period: '2023.01 ~ 2023.06',
    team: '3명 (Android 3명)',
    role: 'Android 팀 리드 개발자',
    details: [
      '업체 검색부터 위치 확인, 예약까지 앱에서 이어지는 온라인 예약 서비스를 개발했습니다.',
      '한성대학교 DC&M과 (주)PickNumber의 산학협력 프로젝트로, 오프라인으로 진행하던 예약을 모바일에서 처리하도록 만들었습니다.',
    ],
    features: [
      '업체를 검색하고 Direction5 API로 거리와 소요 시간을 확인할 수 있어야 했습니다.',
      '네이버 지도에서 길찾기와 거리순 정렬, 경로 안내를 제공해야 했습니다.',
      'WebView에서 예약, 취소와 예약 내역 관리를 지원해야 했습니다.',
      'SMS로 본인을 확인하고 업체별 예약 상태를 실시간으로 볼 수 있어야 했습니다.',
      '지도에 업체 위치를 표시하고 마커를 선택하면 상세 정보를 보여줘야 했습니다.',
      '현재 위치를 기준으로 주변 업체를 찾을 수 있어야 했습니다.',
    ],
    contributions: [
      'Android 팀 리드를 맡아 검색, 지도와 예약 기능을 개발했습니다.',
      rich('업체 데이터를 Room에 동기화하고 로컬에서 검색하도록 바꿔 응답시간을 ', strong('3~5초에서 0.5초 이하로 줄였습니다'), '.'),
      '검색된 업체만 Direction5 API로 거리와 소요 시간을 계산하고 RecyclerView에 거리순으로 표시했습니다.',
      'Naver Map의 마커, SearchView와 예약 WebView를 연결해 검색 후 위치 확인과 예약으로 이어지도록 했습니다.',
      'Hilt에서 DB, DAO, Repository와 원격 및 로컬 DataSource 의존성을 구성했습니다.',
      'EncryptedSharedPreferences로 로그인 정보를 저장하고 자동 로그인을 구현했습니다.',
      'ViewBinding 추상 클래스와 확장 함수로 Activity와 Fragment의 반복 코드를 줄였습니다.',
    ],
    problemSolvings: [
      {
        problem: [
          '업체 검색마다 서버와 외부 API를 호출해 결과를 표시하기까지 3~5초가 걸렸습니다.',
          '업체 목록 조회와 거리 계산이 묶여 있어 외부 API가 늦어지면 검색 결과도 함께 늦게 표시됐습니다.',
        ],
        solution: [
          '앱 시작 시 업체 데이터를 Room에 동기화하고 SearchView에서는 로컬 DB를 검색하도록 바꿨습니다.',
          '검색된 업체에 대해서만 Direction5 API로 거리와 소요 시간을 구하고 거리순으로 정렬해 표시했습니다.',
          'CompanyRepository에 목록 조회, 거리 계산과 예외 처리를 모으고 ViewModel에는 Result로 결과를 전달했습니다.',
        ],
        result: [
          rich('업체 목록 검색 응답시간을 ', strong('3~5초에서 0.5초 이하로 줄였습니다'), '.'),
          '업체 목록 검색을 로컬에서 처리하고 거리 계산을 분리해 외부 API를 호출해야 하는 범위를 줄였습니다.',
        ],
        visual: {
          src: 'screenshot/didimdol-room-search-visual.png',
          alt: '서버 업체 목록을 Room에 저장해 검색하고 일치 업체의 거리와 시간을 별도로 조회하는 흐름',
        },
        implementation: [
          {
            description:
              '앱 시작 시 서버의 업체 데이터를 받아 Room에 저장합니다. 검색 화면은 서버 목록 API 대신 로컬 DB를 먼저 조회합니다.',
          },
          {
            description:
              'Room DAO에서 업체 저장과 검색을 나눴습니다. SearchView가 전달한 검색어로 searchQuery 컬럼을 LIKE 조회합니다.',
          },
          {
            description:
              'companyDao.searchQuery로 업체를 검색한 다음 결과에 포함된 업체의 거리와 소요 시간을 Direction5 API로 계산해 덧붙입니다.',
          },
        ],
        alternatives: [
          '서버 구조를 바꿀 수 없어 거리와 소요 시간을 서버에서 미리 계산하는 방법은 선택할 수 없었습니다.',
          '최근 검색어나 인기 업체만 캐시하면 처음 검색하는 업체는 여전히 서버를 기다려야 하므로 전체 업체 데이터를 로컬에서 검색하는 방식을 택했습니다.',
        ],
      },
      {
        problem: [
          '검색, 지도, 예약과 인증 화면에서 DB나 네트워크 결과를 직접 다루면 데이터 처리 코드가 화면마다 반복될 수 있었습니다.',
          '로그인 정보를 보호해 저장하고 자동 로그인 처리를 화면 코드에서 분리할 필요가 있었습니다.',
        ],
        solution: [
          'Hilt 모듈에서 Room DB, DAO, Repository, DataSource와 EncryptedSharedPreferences를 제공했습니다.',
          '인증 정보 읽기와 쓰기는 AuthLocalDataSource에 모으고 화면은 ViewModel을 통해 Repository의 결과를 받도록 했습니다.',
          'ViewModel이 Result를 받아 StateFlow의 로딩, 검색 결과와 안내 메시지를 갱신하도록 했습니다.',
        ],
        result: [
          'Fragment와 Activity는 상태를 표시하고 사용자 이벤트를 전달하며, 데이터 접근과 인증 저장, 예외 처리는 하위 계층에 맡겼습니다.',
          '검색, 지도와 예약 화면에서 같은 Repository와 DataSource를 사용할 수 있도록 했습니다.',
          '자동 로그인에 필요한 인증 정보를 EncryptedSharedPreferences에서 관리하도록 통일했습니다.',
        ],
        visual: {
          src: 'screenshot/didimdol-data-layer-visual.png',
          alt: 'ViewModel과 Repository, 로컬 및 원격 DataSource를 분리해 결과와 화면 상태를 전달하는 구조',
        },
        implementation: [
          {
            description:
              'ViewModel은 Repository의 Result를 받아 로딩, 검색 결과와 안내 메시지를 StateFlow에 반영합니다. Fragment는 이 상태를 구독해 화면에 표시합니다.',
          },
          {
            description:
              '인증 정보는 EncryptedSharedPreferences에 저장합니다. Hilt에서 데이터 계층의 의존성을 제공해 여러 화면이 같은 저장소와 Repository를 사용하도록 했습니다.',
          },
        ],
        alternatives: [
          '화면에서 DB와 인증 저장소를 직접 생성하는 대신 Hilt로 제공해 화면 생명주기와 데이터 접근 책임을 나눴습니다.',
          '일반 SharedPreferences도 사용할 수 있지만 인증 정보를 저장하는 용도에 맞춰 EncryptedSharedPreferences를 선택했습니다.',
        ],
      },
    ],
    insights: [
      {
        title: 'ViewBinding(뷰 바인딩) 정리',
        url: 'https://superohinsung.tistory.com/239',
      },
      {
        title: 'View가 그려지는 순서',
        url: 'https://superohinsung.tistory.com/298',
      },
      {
        title: 'abstract class를 이용하여 ViewBinding을 쉽게 사용하기',
        url: 'https://superohinsung.tistory.com/316',
      },
      {
        title: 'Room이란',
        url: 'https://superohinsung.tistory.com/325',
      },
      {
        title: 'SharedPreferences & 자동 로그인 구현',
        url: 'https://superohinsung.tistory.com/346',
      },
    ],
    achievements: [
      'Android 팀 리드를 맡아 검색, 지도와 예약 기능을 연결했습니다.',
      rich('Room 기반 로컬 검색으로 업체 목록 응답시간을 ', strong('3~5초에서 0.5초 이하로 줄였습니다'), '.'),
      '검색된 업체에만 Direction5 API를 호출하고 거리순으로 정렬한 결과를 표시했습니다.',
      '업체 검색 후 지도 마커로 위치를 확인하고 WebView에서 예약하도록 연결했습니다.',
      'ViewBinding 추상 클래스와 확장 함수로 Activity와 Fragment의 반복 코드를 줄였습니다.',
    ],
    retrospective: [
      '단위 테스트와 UI 테스트가 없어 수정 후 동작을 수동으로 확인해야 했습니다. JUnit과 Mockito, Espresso를 활용한 검증을 계획했습니다.',
      '졸업 작품과 병행해 개발 시간이 부족했습니다. 동시에 진행할 작업의 범위와 우선순위를 조정할 필요가 있었습니다.',
      '산학협력 멘토링과 검색 지연 개선을 통해 기술 선택을 실제 사용 흐름과 운영 제약에 맞춰 판단하는 경험을 했습니다.',
    ],
    links: [
      { label: 'Android', url: 'https://github.com/HSU-Didimdol/Android_PickNumber' },
    ],
    screenshots: [
      'screenshot/didim1.png',
      'screenshot/didim2.png',
    ],
    hasBottomScreenshot: false,
  },
  {
    id: 'bong',
    title: 'Bong # - Android',
    description:
      '대학생이 서로의 재능을 교환하고 거래 채팅으로 일정을 조율하는 Android 앱입니다.',
    cardSummary: {
      description: '대학생의 재능 교환과 거래 채팅을 통한 일정 조율을 지원하는 Android 앱',
      achievements: [
        '팀장 및 Android 개발 담당, 앱 전체 화면과 API 연동 단독 구현',
        'presentation, domain, data 모듈과 33개 UseCase로 화면, 도메인 규칙과 데이터 접근 분리',
        rich(strong('WebSocket 1:1 거래 채팅'), ' 구현, 연결과 해제 및 메시지 전송의 데이터 계층 통합'),
      ],
    },
    thumbnail: 'screenshot/Bong1.png',
    tech: [
      'Kotlin',
      'Hilt',
      'MVVM',
      'Clean Architecture',
      'Coroutines',
      'Paging3',
      'Retrofit2',
      'Glide',
      'WebSocket',
      'StateFlow',
      'ListAdapter',
    ],
    period: '2022.12 ~ 2023.06',
    team: '4명 (Backend 2명, Android 1명, iOS 1명)',
    role: '팀장, Android 개발 전담',
    details: [
      '자신이 가진 재능을 제공하고 다른 사람의 재능을 배우는 모바일 서비스를 개발했습니다.',
      '한성대학교 캡스톤디자인 프로젝트로, 비용 부담 때문에 배우고 싶은 것을 시도하기 어려운 대학생을 위해 기획했습니다.',
    ],
    features: [
      '재능을 등록하거나 신청하고 관심 거래와 진행 상황을 관리할 수 있어야 했습니다.',
      'WebSocket 기반 1:1 거래 채팅과 채팅방 목록을 제공해야 했습니다.',
      '익명으로 글을 쓸 수 있는 자유게시판과 질문 게시판, 댓글, 좋아요와 태그가 필요했습니다.',
      '이미지와 프로필을 수정하고 제공하거나 받은 재능, 거래와 커뮤니티 활동 내역을 볼 수 있어야 했습니다.',
      '거래 성사 후 평점을 등록하고 회원 정보, 자동 로그인과 외부 링크를 관리할 수 있어야 했습니다.',
    ],
    contributions: [
      '팀장을 맡고 Android 앱 개발을 혼자 담당했습니다.',
      '앱 전체 화면과 API 연동, 상태 관리를 구현했습니다.',
      'presentation, domain, data 모듈을 나누고 MVVM과 Clean Architecture를 적용했습니다.',
      'Repository, DataSource, UseCase, Mapper로 데이터 처리 책임과 의존 방향을 구분했습니다.',
      'OkHttp WebSocket으로 1:1 채팅을 구현하고 연결, 해제와 메시지 전송은 DataSource에 모았습니다.',
      'ChattingViewModel의 StateFlow에서 메시지, 로딩과 평점 등록 상태를 관리했습니다.',
      'RecyclerView의 뷰 타입을 나눠 내 메시지와 상대 메시지를 표시하고 ListAdapter와 DiffUtil로 변경된 항목을 갱신했습니다.',
      'EncryptedSharedPreferences에 인증 토큰을 저장하고 OkHttp Interceptor에서 인증 헤더를 추가했습니다.',
    ],
    problemSolvings: [
      {
        problem: [
          'Android를 혼자 맡아 채팅부터 게시글, 프로필, 평점까지 구현해야 했습니다. 기능이 늘어도 UI와 데이터 처리가 섞이지 않는 구조가 필요했습니다.',
          'ViewModel이 Retrofit API와 DTO, 인증 저장소를 직접 다루면 데이터 구조 변경이 화면 코드 수정으로 이어질 수 있었습니다.',
        ],
        solution: [
          'presentation, domain, data의 3개 모듈로 UI, 도메인 규칙과 데이터 접근을 나눴습니다.',
          'domain에는 Repository 인터페이스와 UseCase를 두고 data에는 Repository 구현체, DataSource와 Mapper를 배치했습니다.',
          'presentation은 ViewModel과 UiState로 화면 상태를 관리하고 네트워크 세부 구현은 데이터 계층에 맡겼습니다.',
        ],
        result: [
          '게시글, 댓글, 좋아요, 프로필과 채팅을 같은 계층 구조로 구현했습니다.',
          '33개 UseCase로 기능별 동작을 구분해 ViewModel에서 데이터 처리의 세부 구현을 직접 다루지 않도록 했습니다.',
          'DTO와 데이터 소스 변경은 데이터 계층에서, 화면 상태 변경은 화면 계층에서 처리하도록 경계를 정했습니다.',
        ],
        visual: {
          src: 'screenshot/bong-layered-architecture-visual.png',
          alt: 'presentation과 data가 domain에 의존하도록 구성한 모듈 구조와 각 계층의 책임',
        },
        implementation: [
          {
            description:
              'presentation, domain, data의 3개 모듈을 구성했습니다. UI는 도메인 인터페이스를 사용하고 데이터 계층이 이를 구현하도록 의존 방향을 정했습니다.',
          },
          {
            description:
              'domain에 기능별 UseCase를 두었습니다. ViewModel은 Repository의 세부 구현 대신 UseCase를 호출합니다.',
          },
        ],
        alternatives: [
          '단일 app 모듈에서 패키지만 나눌 수도 있지만, 계층 사이의 참조를 빌드 단계에서 제한하기 위해 모듈을 분리했습니다.',
          'ViewModel에서 API와 DTO를 직접 다루면 구현은 빠르지만 데이터 구조가 바뀔 때 화면도 고쳐야 하므로 Repository와 UseCase를 거치도록 했습니다.',
        ],
      },
      {
        problem: [
          '재능 교환을 조율할 실시간 채팅이 필요했습니다. 메시지 송수신과 기존 대화 조회, 연결 상태와 화면 상태를 구분해야 했습니다.',
          '연결 유지, 메시지 파싱과 전송, 발신자별 UI까지 한 화면에서 처리하면 상태 관리 코드가 복잡해질 수 있었습니다.',
        ],
        solution: [
          'OkHttp WebSocket으로 채팅방 연결을 유지하고 같은 연결에서 메시지를 주고받았습니다.',
          '연결, 해제와 전송은 WebSocketDataSource와 ChattingRepository에 두고 ViewModel에서는 Repository 인터페이스를 사용했습니다.',
          'StateFlow로 메시지 목록, 입력값, 로딩과 평점 등록 상태를 관리하고 RecyclerView의 뷰 타입으로 발신자별 UI를 나눴습니다.',
        ],
        result: [
          '네트워크 통신, 도메인 인터페이스와 UI 상태 관리를 나눠 기존 앱 구조에 채팅을 추가했습니다.',
          '화면이 WebSocket 구현체를 직접 참조하지 않아 통신과 메시지 파싱 코드를 화면과 따로 바꿀 수 있도록 했습니다.',
          '내 메시지와 상대 메시지를 다른 레이아웃으로 표시하고 DiffUtil로 변경된 목록 항목을 갱신했습니다.',
        ],
        visual: {
          src: 'screenshot/bong-websocket-chat-visual.png',
          alt: 'WebSocket으로 메시지를 송수신하고 StateFlow와 ListAdapter로 채팅 화면에 반영하는 흐름',
        },
        implementation: [
          {
            description:
              'WebSocketDataSourceImpl에 OkHttp WebSocket 생성, 해제와 메시지 전송을 모았습니다.',
          },
          {
            description:
              '도메인 계층에는 ChattingRepository 인터페이스를 두고 구현체에서 WebSocketDataSource를 호출하도록 했습니다.',
          },
          {
            description:
              'ChattingViewModel에서 ChattingUiState를 StateFlow로 관리합니다. WebSocket 이벤트를 받으면 로딩 여부와 메시지 목록을 갱신합니다.',
          },
          {
            description:
              'senderId로 메시지 발신자를 구분하고 서로 다른 뷰 타입을 적용합니다. ListAdapter로 목록 변경을 반영합니다.',
          },
        ],
        alternatives: [
          'HTTP로 주기 조회하는 방법보다 연결을 유지하며 양방향으로 메시지를 주고받는 WebSocket이 거래 채팅에 적합하다고 판단했습니다.',
          'SSE는 서버에서 클라이언트로 보내는 단방향 스트림이어서 메시지 전송 경로를 별도로 구성해야 했습니다.',
          'MQTT는 메시지 브로커 운영이 추가로 필요해 앱 안의 1:1 채팅에는 WebSocket을 선택했습니다.',
        ],
      },
    ],
    insights: [
      {
        title: 'WebSocket를 통해서 채팅 기능 구현 feat. Clean Architecture, Hilt',
        url: 'https://superohinsung.tistory.com/354',
      },
      {
        title: 'RecyclerView LayoutManager에 대해서 공부하자',
        url: 'https://superohinsung.tistory.com/349',
      },
      {
        title: 'RecyclerView에서 onCreateViewHolder와 onBindViewHolder의 차이',
        url: 'https://superohinsung.tistory.com/314',
      },
      {
        title: 'A RecyclerView with multiple item types in Kotlin에 대해서 공부하자',
        url: 'https://superohinsung.tistory.com/347',
      },
      {
        title: 'SharedPreferences & 자동 로그인 구현',
        url: 'https://superohinsung.tistory.com/346',
      },
      {
        title: 'android에서 multipart로 image 전송 및 받아오기',
        url: 'https://superohinsung.tistory.com/301',
      },
      {
        title: '의존성 주입(Dependency Injection)',
        url: 'https://superohinsung.tistory.com/135',
      },
      {
        title: 'ListAdapter에서 DiffCallBack 정리',
        url: 'https://superohinsung.tistory.com/315',
      },
    ],
    insightImages: ['screenshot/Bong+.png'],
    achievements: [
      '팀장을 맡고 Android 앱의 전체 화면과 API 연동을 혼자 구현했습니다.',
      'presentation, domain, data 모듈과 33개 UseCase로 화면, 도메인 규칙과 데이터 접근을 나눴습니다.',
      rich('WebSocket으로 ', strong('1:1 거래 채팅'), '을 구현하고 연결, 해제와 메시지 전송을 데이터 계층에 모았습니다.'),
      '발신자에 따라 메시지 UI를 구분하고 ListAdapter와 DiffUtil로 목록 변경을 반영했습니다.',
      '인증 토큰을 암호화해 저장하고 Interceptor에서 요청의 인증 헤더를 추가했습니다.',
    ],
    retrospective: [
      '기능 구현에 집중해 화면의 세부 동작과 접근성을 충분히 점검하지 못했습니다. 상태를 명확히 정의하고 사용자 피드백으로 동작을 확인할 필요가 있었습니다.',
      '넓은 기능을 혼자 구현하며 계층별 역할과 수정 위치를 정해 두는 것이 이후 유지보수에 도움이 된다는 점을 배웠습니다.',
    ],
    links: [
      { label: 'Android', url: 'https://github.com/GrapeBongBong/Android' },
    ],
    screenshots: [
      'screenshot/Bong1.png',
      'screenshot/Bong2.png',
      'screenshot/Bong3.png',
      'screenshot/Bong4.png',
      'screenshot/Bong5.png',
      'screenshot/Bong6.png',
      'screenshot/Bong7.png',
      'screenshot/Bong8.jpeg',
    ],
  },
  {
    id: 'pocs',
    title: 'POCS - Android',
    description:
      '한성대학교 전공 소모임 POCS 회원이 스터디를 모집하고 정보를 공유하는 커뮤니티 앱입니다.',
    cardSummary: {
      description: '한성대학교 전공 소모임 POCS 회원의 스터디 모집과 정보 공유를 위한 커뮤니티 앱',
      achievements: [
        '스터디, 커뮤니티와 프로필 기능 개발',
        rich('기존 XML 화면의 ', strong('70% 이상을 Jetpack Compose로 전환')),
        'Paging3로 게시글을 페이지 단위로 불러와 초기 전체 데이터 로딩 방지',
      ],
    },
    thumbnail: 'screenshot/POCS1.png',
    tech: [
      'Kotlin',
      'Jetpack Compose',
      'Hilt',
      'MVVM',
      'Clean Architecture',
      'Coroutines',
      'Paging3',
      'Retrofit2',
      'Glide',
      'Markwon',
      'JUnit4',
      'Espresso',
    ],
    period: '2022.06 ~ 2022.09',
    team: '11명 (Backend 2명, Android 2명, Frontend 5명, PM 2명)',
    role: 'Android 스터디, 커뮤니티와 프로필 기능 개발',
    details: [
      'POCS 회원이 스터디를 모집하고 게시글로 정보를 나누는 전용 커뮤니티를 개발했습니다.',
      '코로나로 줄어든 소모임 활동을 다시 이어갈 수 있도록 스터디 모집과 공지, 정보 공유를 한곳에 모았습니다.',
    ],
    features: [
      '익명과 정회원 로그인, 회원가입과 관리자 모드를 지원해야 했습니다.',
      '카테고리별로 스터디와 커뮤니티 글을 올리고 게시글과 댓글을 수정하거나 삭제할 수 있어야 했습니다.',
      '이미지를 첨부하고 Markdown으로 글을 편집할 수 있어야 했습니다.',
      '프로필과 외부 링크를 수정하고 자신이 작성한 게시글과 댓글을 관리할 수 있어야 했습니다.',
      '관리자는 회원과 권한을 관리할 수 있어야 했습니다.',
      '게시글과 댓글의 좋아요, 저장, 검색과 필터 기능을 제공해야 했습니다.',
    ],
    contributions: [
      '스터디와 커뮤니티, 프로필 기능을 개발했습니다.',
      rich('기존 XML 화면의 ', strong('70% 이상을 Jetpack Compose로 전환했습니다'), '.'),
      'Paging3로 스크롤 위치에 따라 필요한 게시글을 페이지 단위로 불러오도록 바꿨습니다.',
      'GitHub Actions로 빌드, 테스트와 Play Store 내부 테스트 트랙 배포를 자동화했습니다.',
      '앱을 Play Store에 정식 배포하고 운영과 유지보수를 경험했습니다.',
    ],
    problemSolvings: [
      {
        problem: [
          'JSON 데이터를 한 번에 불러와 목록에 넣으면서 스크롤할 때 화면이 끊겼습니다.',
          '페이지 구분 없이 같은 데이터를 다시 요청하거나 당장 표시하지 않을 데이터까지 메모리에 올렸습니다.',
        ],
        solution: [
          'Paging3로 네트워크 페이지 조회를 구현하고 스크롤 위치에 따라 다음 페이지를 불러오도록 했습니다.',
          '데이터 계층에서 PagingSource와 Pager를 구성하고 UI에는 PagingData 스트림을 전달했습니다.',
        ],
        result: [
          '처음부터 전체 데이터를 불러오지 않고 필요한 페이지를 나눠 받아 초기 로딩과 스크롤의 부담을 줄였습니다.',
          '요청, 페이지 키와 오류 처리를 PostPagingSource에 모아 화면 코드와 따로 수정할 수 있게 했습니다.',
        ],
        visual: {
          src: 'screenshot/pocs-paging-flow-visual.png',
          alt: '스크롤에 따라 PagingSource가 API 페이지를 조회하고 PagingData를 화면에 전달하는 흐름',
        },
        implementation: [
          {
            description:
              'PostPagingSource가 페이지별 JSON 응답을 받아 도메인 모델 Post로 변환합니다.',
          },
          {
            description:
              'PostRepositoryImpl에서 Pager를 구성해 PagingData 스트림을 반환합니다. ViewModel과 UI는 데이터 요청의 세부 구현 대신 이 스트림을 사용합니다.',
          },
        ],
        alternatives: [
          '받은 배열을 나누거나 LazyColumn에서 일부만 그리는 방법은 한 번에 내려받는 데이터양을 줄이지 못했습니다.',
          'DiffUtil과 이미지 썸네일로 렌더링을 조정할 수도 있지만 네트워크와 메모리 사용량도 줄이기 위해 페이지 조회를 적용했습니다.',
          '페이지 조회를 직접 구현하기보다 생명주기와 캐시를 지원하는 Paging3를 사용했습니다.',
        ],
      },
      {
        problem: [
          '빌드, 테스트와 배포를 수동으로 반복하면서 확인 항목을 빠뜨릴 수 있었습니다.',
          '브랜치별 검증과 Play Store 배포 절차가 자동화되지 않아 매번 같은 순서를 직접 수행해야 했습니다.',
        ],
        solution: [
          'GitHub Actions에서 main 브랜치의 빌드, Lint와 UI 테스트를 실행하고 release 브랜치는 Play Store 내부 테스트 트랙까지 배포하도록 구성했습니다.',
          '서버 URL과 서명 키, 서비스 계정 키는 GitHub Secrets에 저장하고 실행 시 환경 변수와 파일로 전달했습니다.',
        ],
        result: [
          'main 브랜치의 push와 Pull Request에서 같은 빌드와 코드 검사, UI 테스트를 실행하도록 했습니다.',
          'release 브랜치에 push하면 AAB 빌드와 서명, 내부 테스트 트랙 업로드를 이어서 수행하도록 자동화했습니다.',
        ],
        visual: {
          src: 'screenshot/pocs-ci-cd-visual.png',
          alt: 'GitHub Actions에서 빌드와 UI 테스트를 수행하고 별도 릴리스 작업으로 Play Store 내부 테스트에 업로드하는 흐름',
        },
        implementation: [
          {
            description:
              'main 브랜치의 push와 Pull Request에서 빌드와 ktlint를 실행합니다. GitHub Secrets의 SERVER_URL로 apikey.properties 파일을 만듭니다.',
          },
          {
            description:
              '에뮬레이터의 API 레벨을 23, 30, 31로 나눠 connectedCheck를 실행합니다.',
          },
          {
            description:
              'release 브랜치에 push하면 Gradle로 릴리스 AAB를 빌드합니다. GitHub Secrets의 키로 서명한 뒤 Google Play Console의 내부 테스트 트랙에 올립니다.',
          },
        ],
        alternatives: [
          'Jenkins나 GitLab CI도 사용할 수 있지만 별도 서버 운영 없이 GitHub 저장소와 연결할 수 있는 GitHub Actions를 선택했습니다.',
          '로컬 Git 훅과 IDE 검사만 사용하면 개발자 환경에 따라 실행 결과가 달라질 수 있어 Pull Request에서 공통 검증을 수행하도록 했습니다.',
          '배포 스크립트만 자동화하기보다 빌드와 테스트부터 업로드까지 연결해 수동으로 수행할 단계를 줄였습니다.',
        ],
      },
    ],
    insights: [
      {
        title: 'MVVM 패턴 이란?',
        url: 'https://superohinsung.tistory.com/66',
      },
      {
        title: 'Clean Architecture(클린 아키텍처) 란',
        url: 'https://superohinsung.tistory.com/74',
      },
      {
        title: 'Context 란?',
        url: 'https://superohinsung.tistory.com/99',
      },
      {
        title: 'Glide 간단 정리',
        url: 'https://superohinsung.tistory.com/194',
      },
      {
        title: 'android Github Actions CI/CD를 사용기',
        url: 'https://superohinsung.tistory.com/353',
      },
      {
        title: 'MVP 패턴이란?',
        url: 'https://superohinsung.tistory.com/65',
      },
    ],
    insightImages: [
      'screenshot/POCS+1.png',
      'screenshot/POCS+2.png',
    ],
    achievements: [
      '스터디, 커뮤니티와 프로필 기능을 개발했습니다.',
      rich('기존 XML 화면의 ', strong('70% 이상을 Jetpack Compose로 전환했습니다'), '.'),
      'Paging3로 게시글을 페이지 단위로 불러와 처음부터 전체 데이터를 받지 않도록 바꿨습니다.',
      'GitHub Actions로 빌드, 테스트와 Play Store 내부 테스트 트랙 배포를 자동화했습니다.',
      rich('앱을 ', strong('Play Store에 정식 배포'), '하고 운영과 유지보수를 경험했습니다.'),
    ],
    retrospective: [
      'MVP 기능에 집중하면서 화면의 세부 동작을 충분히 설계하지 못했습니다. 초기부터 사용자 흐름을 확인할 시간을 따로 확보할 필요가 있었습니다.',
      '배포 후 사용자 피드백을 반영하고 팀원과 코드를 검토하면서 기능 구현 이후에도 유지보수와 지식 공유가 이어져야 한다는 점을 배웠습니다.',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/hansung-pocs/blog-android' },
      { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.pocs.blog' },
      { label: 'Figma', url: 'https://www.figma.com/design/4PaubSvRI5ki5RfO0UN5Sk/POCS-BLOG?node-id=0-1&t=BvC0aFS94RqVUgBP-1' },
    ],
    screenshots: [
      'screenshot/POCS1.png',
      'screenshot/POCS2.png',
      'screenshot/POCS3.png',
      'screenshot/POCS4.png',
    ],
    screenshotColumns: 3,
    hasBottomScreenshot: false,
  },

]

export default projects
