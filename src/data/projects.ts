export interface ImplementationBlock {
  description: string
  code: string | null
}

export interface ProblemSolving {
  problem: string[]
  solution: string[]
  result: string[]
  implementation: ImplementationBlock[]
  alternatives: string[]
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
  problemSolvings: ProblemSolving[]
  insights: { title: string; url: string }[]
  insightImages?: string[]
  achievements: string[]
  retrospective: string[]
  links: { label: string; url: string }[]
  screenshots: string[]
  screenshotColumns?: number
  hasBottomScreenshot?: boolean
}

const projects: Project[] = [
  {
    id: 'naenun-kiosk',
    title: '내눈 키오스크',
    description: '생체정보 통합 플랫폼을 통해 고령층의 건강 측정과 관리, 광고 연계를 지원하는 스마트 헬스케어 키오스크 서비스',
    thumbnail: 'screenshot/nanoon1.png',
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
    problemSolvings: [
      {
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
      },
    ],
    insights: [],
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
    title: '모리, Mo-Re',
    description: '누구나 쉽게 이해할 수 있는 서버 리포트를 제공하여 서비스 상태와 성능을 시각화하고 관리·운영 효율성을 높이는 앱 서비스',
    thumbnail: 'screenshot/more1.jpg',
    tech: ['Kotlin', 'Jetpack Compose', 'Orbit MVI', 'Hilt', 'Retrofit2', 'OkHttp3', 'Navigation3', 'DataStore', 'Coroutines', 'Flow'],
    period: '2025.08 ~ 2025.09',
    team: '6명 (Backend 4명, Android 2명)',
    role: 'Android 개발(기여도 80%)',
    details: [
      'Spring Boot 기반 백엔드 서버와 인스턴스의 실시간 시스템 리소스 및 애플리케이션 메트릭을 모니터링하고, AI 분석을 통해 시스템 상태를 한눈에 파악할 수 있는 Android 모니터링 애플리케이션 개발',
      '서버 운영 시 시스템 장애나 성능 저하를 사전에 감지하고 대응하기 위해, 모바일 환경에서도 손쉽게 인프라 상태를 확인할 수 있는 모니터링 도구의 필요성이 대두됨에 따라 프로젝트를 기획',
    ],
    features: [
      '인스턴스 및 서버 등록/관리 기능',
      'CPU, 메모리, 네트워크 사용률 실시간 모니터링 및 시계열 차트 시각화',
      'ThreadPool, Hikari Connection Pool, HTTP 요청 메트릭 분석',
      'AI 기반 시스템 상태 요약 및 상세 분석 리포트',
      '날짜별 메트릭 조회 및 필터링, 일일 통계 요약',
    ],
    contributions: [
      '멀티 모듈 아키텍처 설계 및 Convention Plugin 기반 Build-logic 구축',
      'Custom Compose UI로 시계열 차트(LineChart) 구현',
      'Coroutines의 async/await를 활용한 6개 API 비동기 처리로 데이터 로딩 시간 56% 단축',
    ],
    problemSolvings: [
      {
        problem: [
          '인스턴스 상세 화면에서 CPU, 메모리, 네트워크 수신/송신, 이벤트 요약, AI 리포트 총 6개의 API를 순차적으로 호출할 경우, 요청이 직렬로 처리되어 약 356ms 수준의 로딩 시간 발생',
          '개별 메트릭 실패에 대한 예외 처리가 분산되어 있어, 어느 API가 실패했는지 로그 레벨에서 추적하기 어려운 디버깅 불편 발생',
        ],
        solution: [
          'supervisorScope와 async를 사용해 6개의 메트릭 API를 독립적인 코루틴으로 병렬 실행',
          '각 비동기 블록 내부에서 runCatching과 개별 로그 출력으로 실패한 메트릭 종류와 원인을 명시적으로 기록',
        ],
        result: [
          '메트릭 API를 병렬 호출하는 구조로 변경하여, 전체 로딩 시간을 약 56% 단축',
          'CPU/메모리/네트워크/이벤트/AI 리포트 각각에 대해 실패 로그를 남김으로써, 특정 메트릭만 실패하는 상황에서도 전체 화면은 부분 데이터로 표시하면서 디버깅 용이성 확보',
        ],
        implementation: [
          {
            description: '데이터 로딩 진입점에서 isLoading 플래그 설정 및 오류 상태 초기화 수행.\n선택된 날짜가 없으면 기존 state.nowDate를 사용하여 재조회함.',
            code: `fun loadData(date: String? = null, instanceId: Long) = intent {
    reduce { state.copy(isLoading = true, error = null) }

    val targetDate = date ?: state.nowDate

    supervisorScope {
        Log.d(
            "InstanceDetailViewModel",
            "Loading data for instanceId: $instanceId, date: $targetDate"
        )`,
          },
          {
            description: 'supervisorScope 내부에서 6개의 메트릭 호출을 각각 async + runCatching으로 병렬 처리함.\n실패 시 해당 메트릭 이름과 예외 메시지를 로그로 남기고, getOrNull()로 null 처리하여 이후 로직에서 부분 데이터 렌더링을 허용함.',
            code: `        val cpuDeferred = async {
            runCatching {
                getCpuMetricsUseCase(instanceId, targetDate)
            }.onFailure {
                Log.e("InstanceDetailViewModel", "CPU Metrics failed: \${it.message}")
            }.getOrNull()
        }

        val memoryDeferred = async {
            runCatching {
                getMemoryMetricsUseCase(instanceId, targetDate)
            }.onFailure {
                Log.e("InstanceDetailViewModel", "Memory Metrics failed: \${it.message}")
            }.getOrNull()
        }

        val networkReceiveDeferred = async {
            runCatching {
                getNetworkReceiveMetricsUseCase(instanceId, targetDate)
            }.onFailure {
                Log.e("InstanceDetailViewModel", "Network Receive Metrics failed: \${it.message}")
            }.getOrNull()
        }

        val networkTransmitDeferred = async {
            runCatching {
                getNetworkTransmitMetricsUseCase(instanceId, targetDate)
            }.onFailure {
                Log.e("InstanceDetailViewModel", "Network Transmit Metrics failed: \${it.message}")
            }.getOrNull()
        }

        val eventSummaryDeferred = async {
            runCatching {
                getEventSummaryUseCase(instanceId, targetDate)
            }.onFailure {
                Log.e("InstanceDetailViewModel", "Event Summary failed: \${it.message}")
            }.getOrNull()
        }

        val aiReportDeferred = async {
            runCatching {
                getDetailAiReportUseCase(instanceId, targetDate)
            }.onFailure {
                Log.e("InstanceDetailViewModel", "AI Report failed: \${it.message}")
            }.getOrNull()
        }`,
          },
          {
            description: '모든 비동기 작업 완료 후 결과를 한 번에 await하고, 상태 로그를 남김.\n이후 타임 시리즈 데이터를 공통 TimeMetric 형태로 매핑하고, 차트용 평균값을 내부 계산하여 UiState에 반영함.',
            code: `        val cpuMetrics = cpuDeferred.await()
        val memoryMetrics = memoryDeferred.await()
        val networkReceiveMetrics = networkReceiveDeferred.await()
        val networkTransmitMetrics = networkTransmitDeferred.await()
        val eventSummary = eventSummaryDeferred.await()
        val aiReport = aiReportDeferred.await()

        Log.d(
            "InstanceDetailViewModel",
            "Results - CPU: \${cpuMetrics != null}, Memory: \${memoryMetrics != null}, " +
                "NetworkRcv: \${networkReceiveMetrics != null}, " +
                "NetworkTx: \${networkTransmitMetrics != null}, " +
                "Event: \${eventSummary != null}, AI: \${aiReport != null}"
        )

        val cpuTimeMetrics = cpuMetrics?.timeSeriesData?.map {
            TimeMetric(timeBucket = formatTimeBucket(it.timeBucket), avgValue = it.usage)
        } ?: emptyList()

        val memoryTimeMetrics = memoryMetrics?.timeSeriesData?.map {
            TimeMetric(timeBucket = formatTimeBucket(it.timeBucket), avgValue = it.usage)
        } ?: emptyList()

        val networkReceiveTimeMetrics = networkReceiveMetrics?.timeSeriesData?.map {
            TimeMetric(timeBucket = formatTimeBucket(it.timeBucket), avgValue = it.usage)
        } ?: emptyList()

        val networkTransmitTimeMetrics = networkTransmitMetrics?.timeSeriesData?.map {
            TimeMetric(timeBucket = formatTimeBucket(it.timeBucket), avgValue = it.usage)
        } ?: emptyList()`,
          },
          {
            description: '타임 시리즈 기반으로 차트용 평균값을 계산하고, 요약 메트릭 및 AI 리포트를 포함해 한 번에 reduce로 상태 갱신함.\n모든 메트릭이 null인 경우 경고 로그를 남겨, 완전 실패 케이스를 명시적으로 식별함.',
            code: `        val cpuChartAvg = cpuTimeMetrics.takeIf { it.isNotEmpty() }
            ?.let { (it.sumOf { m -> m.avgValue } / it.size).toFloat() }

        val memoryChartAvg = memoryTimeMetrics.takeIf { it.isNotEmpty() }
            ?.let { (it.sumOf { m -> m.avgValue } / it.size).toFloat() }

        val networkReceiveChartAvg = networkReceiveTimeMetrics.takeIf { it.isNotEmpty() }
            ?.let { (it.sumOf { m -> m.avgValue } / it.size).toFloat() }

        val networkTransmitChartAvg = networkTransmitTimeMetrics.takeIf { it.isNotEmpty() }
            ?.let { (it.sumOf { m -> m.avgValue } / it.size).toFloat() }

        reduce {
            state.copy(
                isLoading = false,
                cpuMetrics = cpuTimeMetrics,
                memoryMetrics = memoryTimeMetrics,
                networkReceiveMetrics = networkReceiveTimeMetrics,
                networkTransmitMetrics = networkTransmitTimeMetrics,

                cpuChartAverage = cpuChartAvg,
                memoryChartAverage = memoryChartAvg,
                networkReceiveChartAverage = networkReceiveChartAvg,
                networkTransmitChartAverage = networkTransmitChartAvg,

                cpuMin = cpuMetrics?.min ?: 0.0,
                cpuMax = cpuMetrics?.max ?: 0.0,
                memoryAvg = memoryMetrics?.avg ?: 0.0,
                networkReceiveAvg = networkReceiveMetrics?.avg ?: 0.0,
                networkReceiveMin = networkReceiveMetrics?.min ?: 0.0,
                networkReceiveMax = networkReceiveMetrics?.max ?: 0.0,
                networkTransmitAvg = networkTransmitMetrics?.avg ?: 0.0,
                networkTransmitMin = networkTransmitMetrics?.min ?: 0.0,
                networkTransmitMax = networkTransmitMetrics?.max ?: 0.0,
                eventSummary = eventSummary,
                aiReport = aiReport?.detailReport ?: "AI \uB9AC\uD3EC\uD2B8\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
            )
        }

        if (cpuMetrics == null && memoryMetrics == null &&
            networkReceiveMetrics == null && networkTransmitMetrics == null &&
            eventSummary == null && aiReport == null
        ) {
            Log.w("InstanceDetailViewModel", "All data loading failed")
        }
    }
}`,
          },
        ],
        alternatives: [
          '6개 API를 하나의 집계용 UseCase로 묶어 서버 단에서 병렬 처리 후 단일 응답으로 내려받는 방식을 고려할 수 있었으나, 유연한 부분 실패 처리와 클라이언트 전용 UI 계산(차트 평균 등)에는 제약이 생겼을 가능성 있음.',
          '네트워크 라이브러리(예: Retrofit + 코루틴 어댑터)의 동시 호출 지원을 활용해 ViewModel 밖에서 병렬 호출을 구성하는 방법도 있었지만, 상태 갱신·로그 처리·에러 집계를 한곳에서 관리하기 어렵다는 단점이 있었을 것임.',
        ],
      },
      {
        problem: [
          '멀티 모듈 프로젝트에서 각 모듈의 Gradle 설정이 중복되고 일관성 유지가 어려움',
        ],
        solution: [
          'build-logic 모듈에 Convention Plugin을 정의하여, 공통 빌드 설정과 의존성을 중앙에서 관리',
          '기능별(Feature, Core, Network, Datastore, Hilt, Compose, Test, Quality 등) Gradle 플러그인을 분리 설계해, 각 기능 모듈에서는 id("mori.android.feature")와 같이 단일 플러그인 적용만으로 일관된 설정을 자동 적용',
        ],
        result: [
          '빌드 설정 수정이 필요할 때 build-logic 한 곳만 변경하면 전체 모듈에 반영되어, 버전 정합성과 코드 품질 규칙을 중앙에서 통제 가능한 구조 확보',
          '새로운 Feature/Core 모듈 추가 시, Convention Plugin 한 줄 적용으로 네이밍 규칙, Compose/Hilt 설정, 공통 의존성이 자동 구성되어 멀티 모듈 확장성이 향상',
        ],
        implementation: [
          {
            description: 'Feature 모듈에 공통으로 필요한 라이브러리·플러그인 적용을 AndroidFeatureConventionPlugin으로 캡슐화함.\n내부에서 mori.android.library, mori.android.hilt, mori.android.compose 등을 함께 적용하고, Lifecycle/Compose/Orbit/Testing 번들을 한 번에 추가함.',
            code: `class AndroidFeatureConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) {
        with(target) {
            pluginManager.apply {
                apply("mori.android.library")
                apply("mori.android.hilt")
                apply("mori.android.compose")
                apply("org.jetbrains.kotlin.plugin.serialization")
            }

            val libs = extensions
                .getByType<VersionCatalogsExtension>()
                .named("libs")

            dependencies {
                libs.findBundle("lifecycle").ifPresent { add("implementation", it) }
                libs.findBundle("compose").ifPresent { add("implementation", it) }
                libs.findBundle("compose-debug").ifPresent { add("debugImplementation", it) }
                libs.findBundle("orbit").ifPresent { add("implementation", it) }
                libs.findBundle("testing").ifPresent { add("testImplementation", it) }
                addSafeDependency(libs, "testImplementation", "orbit-test")
                addSafeDependency(libs, "androidTestImplementation", "mockk-android")
                addSafeDependency(libs, "implementation", "androidx-material-icons-extended")
            }
        }
    }
}`,
          },
          {
            description: 'Core 모듈에서 사용하는 기본 Android/Kotlin 설정과 공통 의존성을 AndroidCoreConventionPlugin에서 관리함.\nmori.android.library 플러그인과 androidx-core-ktx, appcompat, material 등을 한번에 주입하여, 모든 코어/도메인 계층 모듈의 기반 설정을 통일함.',
            code: `class AndroidCoreConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) {
        with(target) {
            pluginManager.apply("mori.android.library")
            val libs = extensions
                .getByType<VersionCatalogsExtension>()
                .named("libs")
            dependencies {
                addSafeDependency(libs, "implementation", "androidx-core-ktx")
                addSafeDependency(libs, "implementation", "androidx-appcompat")
                addSafeDependency(libs, "implementation", "material")
                addSafeDependency(libs, "testImplementation", "junit")
                addSafeDependency(libs, "androidTestImplementation", "androidx-junit")
                addSafeDependency(libs, "androidTestImplementation", "androidx-espresso-core")
            }
        }
    }
}`,
          },
          {
            description: 'DataStore·네트워크·테스트·품질 관련 설정도 각각 전용 Convention Plugin으로 분리함.\n예: AndroidDatastoreConventionPlugin에서 DataStore/Coroutine 테스트 의존성, AndroidNetworkConventionPlugin에서 Retrofit/OkHttp/Gson 및 MockWebServer 설정을 중앙화함.',
            code: `class AndroidDatastoreConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) {
        with(target) {
            pluginManager.apply {
                apply("mori.android.core")
                apply("mori.android.hilt")
                apply("org.jetbrains.kotlin.plugin.serialization")
            }
            val libs = extensions
                .getByType<VersionCatalogsExtension>()
                .named("libs")
            dependencies {
                addSafeDependency(libs, "implementation", "androidx-datastore-preferences")
                addSafeDependency(libs, "implementation", "androidx-datastore-core")
                addSafeDependency(libs, "implementation", "kotlinx-serialization-json")
                addSafeDependency(libs, "implementation", "kotlinx-coroutines-android")
                addSafeDependency(libs, "testImplementation", "kotlinx-coroutines-test")
            }
        }
    }
}

// ---

class AndroidNetworkConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) {
        with(target) {
            pluginManager.apply {
                apply("mori.android.core")
                apply("mori.android.hilt")
                apply("org.jetbrains.kotlin.plugin.serialization")
            }

            val libs = extensions
                .getByType<VersionCatalogsExtension>()
                .named("libs")

            dependencies {
                add("implementation", "com.squareup.retrofit2:retrofit:2.9.0")
                add("implementation", "com.squareup.retrofit2:converter-gson:2.9.0")
                add("implementation", "com.squareup.okhttp3:okhttp:4.12.0")
                add("implementation", "com.squareup.okhttp3:logging-interceptor:4.12.0")
                add("implementation", "com.google.code.gson:gson:2.10.1")

                libs.findBundle("network").ifPresent { add("implementation", it) }
                addSafeDependency(libs, "implementation", "kotlinx-serialization-json")
                addSafeDependency(libs, "testImplementation", "mockwebserver")
                libs.findBundle("testing").ifPresent { add("testImplementation", it) }
            }
        }
    }
}`,
          },
          {
            description: '실제 Feature 모듈에서는 Convention Plugin만 선언해 간결한 설정 유지함.\n예: feature-dashboard, feature-instance_detail에서 id("mori.android.feature")만 적용하고, 나머지 공통 설정은 모두 build-logic에서 자동 주입함.',
            code: `// feature-dashboard/build.gradle.kts
plugins {
    id("mori.android.feature")
}

android {
    namespace = "com.ssafy.mori.feature.dashboard"
}

dependencies {
    implementation(projects.core.domain)
    implementation(projects.core.navigation)
    implementation(projects.core.designsystem)
    implementation(projects.core.common)
}

// ---

// feature-instance_detail/build.gradle.kts
plugins {
    id("mori.android.feature")
}

android {
    namespace = "com.ssafy.mori.feature.instance_detail"
}

dependencies {
    implementation(projects.core.domain)
    implementation(projects.core.navigation)
    implementation(projects.core.designsystem)
    implementation(projects.core.common)
}`,
          },
        ],
        alternatives: [
          '루트 build.gradle.kts에 공통 플러그인·의존성을 모두 정의하고 각 모듈에서 apply(from = …) 방식으로 스크립트를 include 하는 방법도 있었지만, 기능별로 설정을 조합하기 어렵고 점점 거대한 단일 스크립트가 되는 단점이 있었을 것임.',
          '각 모듈에서 plugins 블록과 dependencies만 규칙적으로 맞추자는 "가이드라인 기반 수동 관리"도 가능했지만, 사람이 직접 맞춰야 하기 때문에 장기적으로 버전 불일치·옵션 누락 같은 휴먼 에러를 막기 어려웠을 것임.',
          'Gradle Version Catalog만으로 의존성 버전만 중앙 관리하고 설정은 각 모듈에 그대로 두는 방식도 있지만, Compose/Hilt/테스트 옵션처럼 "플러그인 + 설정 + 의존성"이 묶여야 하는 항목을 일관되게 적용하기에는 Convention Plugin 방식보다 표현력이 떨어졌을 것임.',
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
      '멀티 모듈 아키텍처 도입으로 기능별 모듈 분리 및 재사용성 향상',
      'async/await를 활용한 API 병렬 처리로 데이터 로딩 시간 56% 개선, 약 156ms로 단축',
      '10개 이상의 Feature 모듈과 재사용 가능한 Design System 컴포넌트 구현',
    ],
    retrospective: [
      '팀원들의 예비군 일정으로 인해 초반 일정 관리가 원활하지 않았고, 프로젝트에 대한 이해도가 팀원 간 싱크가 맞지 않았던 점이 아쉬움',
      '시간 제약으로 인해 Unit Test 및 UI Test를 작성하지 못한 점이 아쉬움',
      '주 3회 정기 프로젝트 리뷰 및 회의를 도입하여 팀 내 커뮤니케이션과 프로젝트 이해도를 동기화할 필요성 인식',
      '향후 프로젝트에서는 TDD 방식을 적용하여 초기부터 테스트 코드 작성 예정',
      '팀 프로젝트에서는 정기적인 커뮤니케이션과 명확한 역할 분담이 프로젝트 성공의 핵심임을 깨달음',
      '멀티 모듈 아키텍처는 초기 설정 비용이 있지만 장기적으로 유지보수성과 확장성에 큰 이점이 있음을 확인',
      '테스트 코드의 중요성을 인지하고 다음 프로젝트에서는 반드시 적용할 필요성을 느낌',
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
    title: 'Glim',
    description: '글귀를 공유하며, 숏츠(글림으로 명명) 폼으로 다른 사람들과 공유하는 앱',
    thumbnail: 'screenshot/Glim1.png',
    tech: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Orbit MVI', 'Coroutine', 'Retrofit3', 'Coil', 'Firebase Messaging', 'DataStore', 'Navigation', 'MockK', 'Turbine', 'JUnit'],
    period: '2025.07 ~ 2025.08',
    team: '6명 (Backend 2명, Android 3명, Frontend 1명)',
    role: 'Android 앱 개발(로그인/회원가입, 마이페이지 UI 및 기능 개발)',
    details: [
      '\'글귀 + 울림\', \'글귀 + film\' 또는 \'glimpse(흘낏보다)\'의 조합으로, 짧지만 깊은 인상을 남기는 글귀를 공유하며, 숏츠(글림으로 명명) 폼으로 다른 사람들과 감성을 공유하며 글림을 통해 책에 대한 관심을 유발하는 서비스',
      '현대인의 디지털 과부하 문제에 대한 건전한 대안 제시 — 무분별한 숏폼 콘텐츠 소비로 인한 집중력 저하 및 독서량 감소에 대응하여, 완전한 차단이 아닌 글귀 기반 디지털 디톡스 접근',
    ],
    features: [
      '글귀 입력(직접 입력/OCR) 및 AI 배경 이미지 생성, 폰트·크기·색·위치·방향 커스터마이징',
      '글귀(글림), 도서, 작가 검색 및 관심사 기반 추천, 키워드/테마별 큐레이션',
      '글귀 숏폼 공유(이미지), 좋아요/저장/댓글',
      '도서 상세 정보 페이지 및 알라딘 구매 페이지 연동',
      '마이페이지(업로드/저장 글귀 관리), 잠금화면 글귀 설정',
    ],
    contributions: [
      'Orbit MVI 패턴 적용을 통한 예측 가능한 상태 관리 및 테스트 용이성 향상 아키텍처 설계',
      'Kotlin Coroutine과 DataStore를 활용한 Session, Refresh Token 관리 시스템 구현',
      'Channel 기반 Navigator 패턴 도입으로 Screen과 Navigation 로직 완전 분리',
      'JUnit, MockK 기반 ViewModelTest를 130+ 케이스 구현으로 안정적인 단위 테스트 구축',
      'GitHub 잔디밭 디자인을 모티브로, 사용자가 업로드한 글림(글귀)을 잔디밭 형태로 Custom Compose UI 컴포넌트 구현',
    ],
    problemSolvings: [
      {
        problem: [
          'Session, Refresh Token 만료 및 예외 상황 처리의 복잡성으로 재시도 등 여러 케이스를 일관되게 처리하기 어려움',
        ],
        solution: [
          '인증 관련 기능을 모듈화하고, Logout 및 토큰 만료 시 자동 재인증 플로우를 추가',
          'AuthDataStore: 토큰/유저 정보 영속화, AuthManager: 메모리 캐시 + 로그아웃 이벤트 + Auto Login 여부 판단',
          'AuthInterceptor: 매 요청에 Authorization 헤더 자동 추가, TokenAuthenticator: 401 응답 시 토큰 재발급 및 재시도 처리',
        ],
        result: [
          '인증 로직이 AuthManager, AuthInterceptor, TokenAuthenticator 세 레이어로 명확히 분리되어, 뷰/도메인 레이어에서는 토큰 관리 코드를 완전히 제거',
          '토큰 만료·재발급·만료된 Refresh Token 처리·최대 재시도 초과 등의 예외가 한 곳에서 제어되어, 새로운 API를 추가할 때 별도의 인증 예외 처리가 불필요',
          '로그아웃 사유를 LogoutReason으로 통합해 UI에서 사용자의 이해를 돕는 메시지를 일관되게 노출',
        ],
        implementation: [
          {
            description: '인증 정보는 DataStore 위에 AuthDataStore 추상화를 두고, AuthManager에서 메모리 캐시와 함께 관리하도록 설계.\n메모리 캐시 + DataStore 동기화로, 네트워크 요청에서는 항상 메모리에서 빠르게 토큰을 읽기 가능하며, logout(reason)에 토큰·유저 정보 삭제 + 로그아웃 이벤트 emit를 모아 모든 레이어에서 일관된 로그아웃 플로우를 사용.',
            code: `class AuthDataStore @Inject constructor(
    private val dataStore: DataStore<Preferences>
) {
    companion object {
        private val ACCESS_TOKEN = stringPreferencesKey("access_token")
        private val REFRESH_TOKEN = stringPreferencesKey("refresh_token")
        private val USER_ID = stringPreferencesKey("user_id")
    }

    val accessTokenFlow = ACCESS_TOKEN.flowIn(dataStore)
    // ...
}

class AuthManager @Inject constructor(
    private val authDataStore: AuthDataStore,
    applicationScope: CoroutineScope
) {
    @Volatile private var cachedAccessToken: String? = null
    @Volatile private var cachedRefreshToken: String? = null
    @Volatile private var cachedUserId: String? = null

    init {
        applicationScope.launch {
            launch {
                authDataStore.accessTokenFlow.collect { token ->
                    cachedAccessToken = token
                }
            }
            // ...
        }
    }

    fun getAccessToken(): String? = cachedAccessToken
    fun saveToken(accessToken: String, refreshToken: String) { /* ... */ }
    fun logout(reason: LogoutReason, eventEmit: Boolean = true) { /* ... */ }
}`,
          },
          {
            description: '매 요청마다 토큰을 수동으로 넣는 대신, OkHttp Interceptor를 통해 Authorization 헤더를 자동으로 추가.\n네트워크 레이어는 AuthManager에서 토큰을 읽기만 하고, 저장·로그아웃 책임은 갖지 않음.',
            code: `class AuthInterceptor @Inject constructor(
    private val authManager: AuthManager
) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = authManager.getAccessToken()

        val request = chain.request().newBuilder().apply {
            if (!token.isNullOrEmpty()) {
                addHeader("Authorization", "Bearer $token")
            }
        }.build()

        return chain.proceed(request)
    }
}`,
          },
          {
            description: '401 응답이 발생하면 OkHttp Authenticator에서 자동으로 Refresh Token을 사용해 토큰을 재발급하고, 기존 요청을 새 토큰으로 재시도하도록 구현.\nisTokenAlreadyRefreshed로 이미 다른 요청에서 토큰이 갱신된 경우를 감지해, 중복 Refresh와 무한 루프를 방지.',
            code: `class TokenAuthenticator @Inject constructor(
    private val authManager: AuthManager,
    private val authApi: AuthApi
) : Authenticator {

    private val retryCount = AtomicInteger(0)
    private val maxRetryCount = 3

    override fun authenticate(route: Route?, response: Response): Request? {
        return when (val result = handleAuthentication(response)) {
            is AuthResult.Success -> result.request
            is AuthResult.Failure -> null
        }
    }

    private fun handleAuthentication(response: Response): AuthResult {
        if (retryCount.get() >= maxRetryCount) {
            authManager.logout(LogoutReason.MaxRetryExceeded)
            return AuthResult.Failure("Max retry exceeded")
        }

        retryCount.incrementAndGet()

        return when (val tokenResult = getCurrentTokens()) {
            is TokenResult.Success -> {
                if (isTokenAlreadyRefreshed(response, tokenResult.tokens.accessToken)) {
                    resetRetryCount()
                    AuthResult.Success(
                        createRequestWithToken(response.request, tokenResult.tokens.accessToken)
                    )
                } else {
                    refreshTokenAndCreateRequest(response.request, tokenResult.tokens)
                }
            }
            is TokenResult.Failure -> {
                authManager.logout(LogoutReason.TokenNotFound)
                AuthResult.Failure(tokenResult.reason)
            }
        }
    }
}`,
          },
        ],
        alternatives: [],
      },
      {
        problem: [
          '기존 MVI 구현 시 Intent/Reducer/State 클래스가 기하급수적으로 늘어나 코드베이스가 비대해짐',
          '단순 입력 검증·로딩 처리에도 보일러플레이트 코드 증가로 변경 비용 및 회귀 위험 증가',
        ],
        solution: [
          'Orbit 기반 상태 관리 도입',
          'ViewModel에 ContainerHost<UiState, SideEffect> 적용 및 container 하나로 State·SideEffect 통합 관리 구조 도입',
          '화면 단위로 UiState, SideEffect를 분리 설계하여 책임 명확화 및 테스트 용이성 향상',
        ],
        result: [
          '화면별로 Intent·Reducer 클래스를 개별 정의하던 구조를 제거하고, Orbit 컨테이너 기반 단일 ViewModel 구조로 전환하여 상태 관리 코드량 감소 및 가독성 향상',
          '입력 검증·로딩·에러 처리 로직을 테스트 가능한 ViewModel 계층에 집중시켜, 단위 테스트 작성 용이성 증가',
          'UI 코드에서 비즈니스 로직을 분리하고, 공통 패턴 정립으로 새로운 화면 추가 시 일관된 개발 플로우 확보',
        ],
        implementation: [
          {
            description: 'LoginUiState에 이메일·비밀번호·에러 메시지·로딩 여부를 모두 포함하여, 로그인 화면 상태를 단일 데이터 클래스로 관리.\nisLoginEnabled 계산 프로퍼티를 통해 뷰에서 별도 조건 분기 없이 버튼 활성화 여부를 판단 가능하게 설계.\n일회성 에러 메시지 노출을 위해 LoginSideEffect.ShowError를 정의하여 상태(State)와 사이드 이펙트를 분리.',
            code: `data class LoginUiState(
    val email: TextFieldValue = TextFieldValue(""),
    val password: TextFieldValue = TextFieldValue(""),
    @StringRes val emailError: Int? = null,
    @StringRes val passwordError: Int? = null,
    val isLoading: Boolean = false,
) {
    val isLoginEnabled: Boolean
        get() =
            emailError == null &&
                passwordError == null &&
                email.text.isNotBlank() &&
                password.text.isNotBlank()
}

sealed interface LoginSideEffect {
    data class ShowError(
        @StringRes val messageRes: Int,
    ) : LoginSideEffect
}`,
          },
          {
            description: 'LoginViewModel에 ContainerHost<LoginUiState, LoginSideEffect> 적용 및 container 초기 상태로 LoginUiState() 설정.\n이메일·비밀번호 변경 시 intent {} 블록 안에서 Validation 유틸 호출 후 reduce { state.copy(...) } 패턴으로 상태를 갱신하여, 입력값과 에러 메시지 업데이트를 ViewModel 내부로 캡슐화.',
            code: `@HiltViewModel
internal class LoginViewModel @Inject constructor(
    private val navigator: Navigator,
    private val loginUseCase: LoginUseCase
) : ViewModel(), ContainerHost<LoginUiState, LoginSideEffect> {

    override val container =
        container<LoginUiState, LoginSideEffect>(initialState = LoginUiState())

    fun onEmailChanged(email: TextFieldValue) =
        intent {
            val validationResult =
                ValidationUtils.validateEmail(
                    email = email.text,
                    emptyErrorRes = R.string.error_email_empty,
                    invalidErrorRes = R.string.error_email_invalid,
                )

            val error =
                when (validationResult) {
                    is ValidationResult.Valid -> null
                    is ValidationResult.Invalid -> validationResult.errorMessageRes
                }

            reduce { state.copy(email = email, emailError = error) }
        }

    fun onPasswordChanged(password: TextFieldValue) =
        intent {
            val validationResult =
                ValidationUtils.validatePassword(
                    password = password.text,
                    emptyErrorRes = R.string.error_password_empty,
                    invalidErrorRes = R.string.error_password_invalid,
                )

            val error =
                when (validationResult) {
                    is ValidationResult.Valid -> null
                    is ValidationResult.Invalid -> validationResult.errorMessageRes
                }

            reduce { state.copy(password = password, passwordError = error) }
        }`,
          },
          {
            description: '로그인 버튼 클릭 시 전체 입력 검증 → 에러 상태 반영 → 오류가 있을 경우 LoginSideEffect.ShowError 발행 → 정상일 경우 로딩 상태 On/Off 및 LoginUseCase 실행·네비게이션까지 일관된 플로우로 처리.',
            code: `    fun onLoginClicked() = intent {
        val emailValidation = ValidationUtils.validateEmail(
            email = state.email.text,
            emptyErrorRes = R.string.error_email_empty,
            invalidErrorRes = R.string.error_email_invalid,
        )

        val passwordValidation = ValidationUtils.validatePassword(
            password = state.password.text,
            emptyErrorRes = R.string.error_password_empty,
            invalidErrorRes = R.string.error_password_invalid,
        )

        val emailError = if (emailValidation is ValidationResult.Invalid) {
            emailValidation.errorMessageRes
        } else { null }

        val passwordError = if (passwordValidation is ValidationResult.Invalid) {
            passwordValidation.errorMessageRes
        } else { null }

        reduce { state.copy(emailError = emailError, passwordError = passwordError) }

        if (emailError != null || passwordError != null) {
            postSideEffect(LoginSideEffect.ShowError(emailError ?: passwordError!!))
            return@intent
        }

        reduce { state.copy(isLoading = true) }

        runCatching {
            loginUseCase(
                email = state.email.text,
                password = state.password.text,
            )
        }.onSuccess {
            reduce { state.copy(isLoading = false) }
            navigateToHome()
        }.onFailure { exception ->
            reduce { state.copy(isLoading = false) }
            Log.d("LoginViewModel", "Manual login failed: \${exception.message}")
            postSideEffect(LoginSideEffect.ShowError(R.string.login_failed))
        }
    }`,
          },
          {
            description: 'LoginRoute에서 container.stateFlow.collectAsState()로 상태를 구독하고, collectSideEffect로 일회성 이벤트만 처리.\nLoginScreen은 LoginUiState와 콜백만 주입받아 순수 UI 역할만 담당하도록 설계.',
            code: `@Composable
internal fun LoginRoute(
    padding: PaddingValues,
    viewModel: LoginViewModel = hiltViewModel(),
) {
    val uiState by viewModel.container.stateFlow.collectAsState()
    val context = LocalContext.current

    viewModel.collectSideEffect { effect ->
        when (effect) {
            is LoginSideEffect.ShowError ->
                Toast.makeText(
                    context,
                    context.getString(effect.messageRes),
                    Toast.LENGTH_SHORT
                ).show()
        }
    }

    LoginScreen(
        state = uiState,
        padding = padding,
        onEmailChanged = viewModel::onEmailChanged,
        onPasswordChanged = viewModel::onPasswordChanged,
        onLoginClicked = viewModel::onLoginClicked,
        navigateToSignUp = viewModel::navigateToSignUp
    )
}`,
          },
        ],
        alternatives: [
          '기존 MVI 스타일을 유지한 채 하나의 sealed Intent + 단일 reducer 함수로만 관리하는 방법도 있었지만, 화면이 늘어날수록 거대한 when 블록과 단일 reducer에 로직이 몰려 가독성이 더 떨어졌을 가능성이 있음',
          'Orbit 없이 StateFlow + 확장 함수 조합으로 직접 MVI 유사 패턴을 구현하는 대안도 있었지만, 이미 검증된 컨테이너·SideEffect 처리 기능을 재구현해야 해 유지보수 비용이 커졌을 것임',
        ],
      },
      {
        problem: [
          '복잡한 화면 전환 로직을 각 Screen에서 직접 NavBackStack에 접근해 처리하면서, UI와 네비게이션 구현 상세 간 강한 결합 발생',
          '화면 간 이동·BackStack 초기화·뒤로 가기 처리 방식이 화면마다 제각각 구현되어, 중복 코드 증가 및 일관성 저하',
        ],
        solution: [
          'Channel 기반 Navigator 패턴 도입',
          'Navigator 인터페이스와 NavigatorImpl을 별도 모듈에 정의하고, 화면에서는 오직 이 인터페이스만 의존하도록 설계',
          'Channel<InternalRoute>를 사용해 ViewModel에서 네비게이션 요청을 발행하고, 네비게이션 전용 ViewModel 및 Composable에서 이를 수신해 실제 NavBackStack 조작을 수행하는 간접 호출 구조 도입',
        ],
        result: [
          '각 Screen에서 NavBackStack/Controller에 직접 접근하던 코드를 제거하고, Channel 기반 Navigator 한 곳으로 네비게이션 로직을 집중시켜 화면과 네비게이션 구현 간 결합도 감소',
          'ViewModel에서는 navigator.navigate(...) 호출만으로 화면 전환을 요청하고, 실제 BackStack 조작은 네비게이션 전용 Composable이 담당하도록 역할 분리',
          'InternalRoute·RouteSideEffect·Route/BottomTabRoute 등 타입 기반 라우팅 모델을 도입하여, 문자열 기반 Route 사용 시 발생할 수 있는 오타·런타임 오류를 컴파일 타임에 검출 가능하도록 개선',
        ],
        implementation: [
          {
            description: '공용 네비게이션 API로 Navigator 인터페이스를 정의하고, 구현체 NavigatorImpl에서는 Channel<InternalRoute>로 네비게이션 이벤트를 전파하는 구조 도입.\nHilt 모듈에서 Navigator와 InternalNavigator 둘 다 NavigatorImpl로 바인딩하여, UI·ViewModel 측에서는 외부 인터페이스만, 내부 네비게이션 ViewModel에서는 Internal 인터페이스만 사용하도록 의존성 분리.',
            code: `interface Navigator {
    suspend fun navigate(
        route: NavKey,
        saveState: Boolean = false,
        launchSingleTop: Boolean = true
    )
    suspend fun navigateBack()
    suspend fun navigateAndClearBackStack(route: NavKey)
}

@ActivityRetainedScoped
class NavigatorImpl @Inject constructor() : Navigator, InternalNavigator {
    override val channel = Channel<InternalRoute>(Channel.BUFFERED)

    override suspend fun navigate(
        route: NavKey, saveState: Boolean, launchSingleTop: Boolean
    ) {
        channel.send(
            InternalRoute.Navigate(
                route = route, saveState = saveState, launchSingleTop = launchSingleTop
            ),
        )
    }

    override suspend fun navigateBack() {
        channel.send(InternalRoute.NavigateBack)
    }

    override suspend fun navigateAndClearBackStack(route: NavKey) {
        channel.send(InternalRoute.NavigateAndClearBackStack(route = route))
    }
}`,
          },
          {
            description: '실제 Channel에 흘러다니는 내부 라우트 모델로 InternalRoute를 정의하고, 이를 UI에서 소비하기 위한 RouteSideEffect로 변환하는 중간 ViewModel 설계 적용.',
            code: `sealed interface InternalRoute {
    data class Navigate(
        val route: NavKey, val saveState: Boolean, val launchSingleTop: Boolean
    ) : InternalRoute
    data object NavigateBack : InternalRoute
    data class NavigateAndClearBackStack(val route: NavKey) : InternalRoute
}

sealed interface RouteSideEffect {
    data class Navigate(
        val route: NavKey, val saveState: Boolean, val launchSingleTop: Boolean
    ) : RouteSideEffect
    data object NavigateBack : RouteSideEffect
    data class NavigateAndClearBackStack(val route: NavKey) : RouteSideEffect
}

@HiltViewModel
internal class NavigatorViewModel @Inject constructor(
    navigator: InternalNavigator,
) : ViewModel() {
    val sideEffect by lazy(LazyThreadSafetyMode.NONE) {
        navigator.channel.receiveAsFlow()
            .map { navigator ->
                when (navigator) {
                    is InternalRoute.Navigate ->
                        RouteSideEffect.Navigate(
                            navigator.route, navigator.saveState, navigator.launchSingleTop
                        )
                    is InternalRoute.NavigateBack -> RouteSideEffect.NavigateBack
                    is InternalRoute.NavigateAndClearBackStack ->
                        RouteSideEffect.NavigateAndClearBackStack(navigator.route)
                }
            }
    }
}`,
          },
          {
            description: 'LaunchedNavigator 컴포저블에서 NavigatorViewModel.sideEffect를 수집하고, 전달받은 RouteSideEffect에 따라 NavBackStack 조작을 일괄 처리함으로써, 실제 네비게이션 책임을 단일 지점으로 집중.',
            code: `@Composable
fun LaunchedNavigator(navBackStack: NavBackStack) {
    InternalLaunchedNavigator(navBackStack = navBackStack)
}

@Composable
private fun InternalLaunchedNavigator(
    navBackStack: NavBackStack,
    routerViewModel: NavigatorViewModel = hiltViewModel(),
) {
    val lifecycleOwner = LocalLifecycleOwner.current
    LaunchedEffect(routerViewModel, lifecycleOwner) {
        lifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
            routerViewModel.sideEffect.collectLatest { sideEffect ->
                when (sideEffect) {
                    is RouteSideEffect.NavigateBack -> {
                        navBackStack.removeLastOrNull()
                    }
                    is RouteSideEffect.Navigate -> {
                        navBackStack.remove(sideEffect.route)
                        navBackStack.add(sideEffect.route)
                    }
                    is RouteSideEffect.NavigateAndClearBackStack -> {
                        navBackStack.clear()
                        navBackStack.add(sideEffect.route)
                    }
                }
            }
        }
    }
}`,
          },
          {
            description: 'ViewModel에서 화면 전환 시 NavBackStack·NavController에 직접 접근하지 않고, 주입받은 Navigator 인터페이스만 호출하여 화면 로직과 네비게이션 구현 간 결합 제거.',
            code: `@HiltViewModel
internal class LoginViewModel @Inject constructor(
    private val navigator: Navigator,
    private val loginUseCase: LoginUseCase
) : ViewModel(), ContainerHost<LoginUiState, LoginSideEffect> {

    // ...

    fun navigateToSignUp() =
        intent {
            navigator.navigate(Route.SignUp)
        }

    fun navigateToHome() =
        intent {
            navigator.navigateAndClearBackStack(BottomTabRoute.Home)
        }
}`,
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
      'SSAFY 13th 구미캠퍼스 공통 프로젝트 우수상 수상',
      '로그인/회원가입 등 인증 구조의 안정적 구현',
      'Compose, MVI 기반 프로젝트 적용',
      'ViewModel Unit Test를 진행하여 안정적인 서비스 구축',
    ],
    retrospective: [
      '주어진 개발 시간의 부족으로 인해 완전한 리팩토링 미흡',
      '실제 사용자 테스트를 통한 UX 개선 포인트 발견 지연으로 개발 후반부 UI/UX 수정 집중',
      '기능 개발과 병행한 지속적인 코드 품질 개선을 위한 점진적 리팩토링 프로세스 도입 필요성',
      '초기 단계부터 프로토타이핑과 사용자 테스트를 통한 빠른 피드백 루프 구축 필요성',
      'Orbit MVI 패턴 적용을 통한 코드 가독성과 테스트 용이성 향상 및 기능 확장 시 일관된 구조 유지 가능성 확인',
      '130+ 테스트 케이스 작성을 통한 코드 품질 개선 및 리팩토링과 기능 수정 시 안정성 보장의 테스트 가치 인식',
      'Cold Stream과 Hot Stream에 대한 명확한 차이를 이해',
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
    id: 'quiz-cafe',
    title: 'Quiz Cafe',
    description:
      '다양한 개발 분야의 지식들을 손쉽게 언제나, 어디서든 학습할 수 있도록 지원하는 퀴즈 형태의 학습 앱 플랫폼.',
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
    role: 'Android 앱 개발 (메인 및 마이페이지 개발)',
    details: [
      'Computer Science와 다양한 개발 분야의 지식들을 손쉽게 언제나, 어디서든 학습할 수 있도록 지원하는 퀴즈 형태의 학습 앱 플랫폼',
    ],
    features: [
      '퀴즈 CRUD 및 퀴즈 풀기 기능',
      '문제집별 퀴즈 풀기 및 좋아요 기능',
      '카테고리 생성/분류 및 개수 제한 (3~5개)',
      '문제집 실행/진행, 학습 결과 저장, 완료 후 피드백 제공 (점수, 정답률)',
      '마이페이지 (내 문제집/퀴즈 관리) 및 학습 기록/진척 관리 (잔디밭 형식)',
    ],
    contributions: [
      'Android 앱 개발 (메인 및 마이페이지 개발) 및 1차 MVP 개발 완료',
      '모든 화면의 구성요소를 재사용 가능한 Jetpack Compose UI 디자인 시스템 구축',
      'Compose UI로 100% 화면 구현',
      'UiState–Intent–SideEffect MVI 구조를 자체 설계·적용해 예측 가능한 상태 관리 체계 구축',
      'DataStore 활용 자동로그인 및 보안 세션 관리 구현, Retrofit + Coroutine 기반 비동기 통신 및 예외 처리 구조 설계',
    ],
    problemSolvings: [
      {
        problem: [
          'JWT 토큰·이메일 등 사용자 세션 정보를 SharedPreferences에 저장하면서, 동기식 I/O로 인한 ANR 위험, 타입 세이프티 부족, 데이터 일관성 보장 한계 발생함.',
          '비동기·스트림 기반으로 세션 상태를 관찰하기 어려워, 토큰 변경에 따른 전역 상태 반영 및 로그아웃 처리 흐름이 복잡해지는 문제 발생함.',
        ],
        solution: [
          '세션 저장소를 SharedPreferences에서 Preferences DataStore로 전환하여, 코루틴·Flow 기반 완전 비동기 I/O 및 트랜잭션 단위 업데이트를 지원하도록 개선함.',
          'AuthDataStore + AuthManager + AuthInterceptor 조합으로, 영속 저장소·메모리 캐시·네트워크 헤더 삽입을 역할별로 분리해 타입 세이프하고 일관된 인증 상태 관리 구조 도입함.',
        ],
        result: [
          'SharedPreferences 기반 세션 관리에서 DataStore + StateFlow 기반 구조로 전환하여, 디스크 I/O의 완전 비동기 처리, 타입 세이프한 키 관리, 반응형 세션 상태 구독 등을 통해 안정성과 확장성 향상 달성함.',
          'AuthDataStore(영속 저장소)–AuthManager(메모리 캐시/로그아웃 이벤트)–AuthInterceptor(헤더 주입)로 책임을 분리함으로써, 인증/세션 관련 코드 중복을 제거하고, 토큰 저장·로딩·삭제·로그아웃 플로우를 단일 진입점에서 관리하는 구조 확립함.',
        ],
        implementation: [
          {
            description:
              'DataStore 접근을 확장 함수로 감싸 재사용성을 높이고, Access Token, Refresh Token, 사용자 이메일을 stringPreferencesKey로 정의해 키 관리 및 타입 세이프티를 확보함.',
            code: `private fun Preferences.Key<String>.flowIn(store: DataStore<Preferences>) =
    store.data.map { it[this] }

private suspend fun Preferences.Key<String>.saveTo(store: DataStore<Preferences>, value: String) =
    store.edit { it[this] = value }

private suspend fun Preferences.Key<String>.deleteFrom(store: DataStore<Preferences>) =
    store.edit { it.remove(this) }

class AuthDataStore @Inject constructor(
    private val dataStore: DataStore<Preferences>
) {
    companion object {
        private val ACCESS_TOKEN = stringPreferencesKey("access_token")
        private val REFRESH_TOKEN = stringPreferencesKey("refresh_token")
        private val USER_EMAIL = stringPreferencesKey("user_email")
    }

    val accessTokenFlow = ACCESS_TOKEN.flowIn(dataStore)
    val refreshTokenFlow = REFRESH_TOKEN.flowIn(dataStore)
    val userEmailFlow = USER_EMAIL.flowIn(dataStore)

    suspend fun saveAccessToken(token: String) = ACCESS_TOKEN.saveTo(dataStore, token)
    suspend fun deleteAccessToken() = ACCESS_TOKEN.deleteFrom(dataStore)

    suspend fun saveRefreshToken(token: String) = REFRESH_TOKEN.saveTo(dataStore, token)
    suspend fun deleteRefreshToken() = REFRESH_TOKEN.deleteFrom(dataStore)

    suspend fun saveUserEmail(email: String) = USER_EMAIL.saveTo(dataStore, email)
    suspend fun deleteUserEmail() = USER_EMAIL.deleteFrom(dataStore)
}`,
          },
          {
            description:
              '앱 전역 applicationScope에서 DataStore Flow를 수집해, 최신 토큰·이메일을 @Volatile 메모리 캐시에 유지하고 동기 접근자를 제공함으로써, 네트워크 계층에서 빠른 조회 가능 구조 설계함.',
            code: `class AuthManager @Inject constructor(
    private val authDataStore: AuthDataStore,
    private val googleAuthManager: GoogleAuthManager,
    @ApplicationScope private val applicationScope: CoroutineScope
) {
    @Volatile
    private var cachedAccessToken: String? = null

    @Volatile
    private var cachedRefreshToken: String? = null

    @Volatile
    private var cachedUserEmail: String? = null

    private val _logoutEvent = MutableSharedFlow<LogoutReason>(extraBufferCapacity = 1)
    val logoutEvent: SharedFlow<LogoutReason> = _logoutEvent

    init {
        applicationScope.launch {
            launch {
                authDataStore.accessTokenFlow.collect { token ->
                    cachedAccessToken = token
                }
            }
            launch {
                authDataStore.refreshTokenFlow.collect { token ->
                    cachedRefreshToken = token
                }
            }
            launch {
                authDataStore.userEmailFlow.collect { email ->
                    cachedUserEmail = email
                }
            }
        }
    }

    fun getAccessToken(): String? = cachedAccessToken
    fun getRefreshToken(): String? = cachedRefreshToken
    fun getUserEmail(): String? = cachedUserEmail

    fun saveToken(accessToken: String, refreshToken: String) {
        cachedAccessToken = accessToken
        cachedRefreshToken = refreshToken

        CoroutineScope(Dispatchers.IO).launch {
            authDataStore.saveAccessToken(accessToken)
            authDataStore.saveRefreshToken(refreshToken)
        }
    }

    fun saveUserEmail(email: String) {
        cachedUserEmail = email

        CoroutineScope(Dispatchers.IO).launch {
            authDataStore.saveUserEmail(email)
        }
    }

    fun logout(reason: LogoutReason) {
        cachedAccessToken = null
        cachedRefreshToken = null

        CoroutineScope(Dispatchers.IO).launch {
            authDataStore.deleteAccessToken()
            authDataStore.deleteRefreshToken()
            authDataStore.deleteUserEmail()

            _logoutEvent.emit(reason)
        }
    }

    suspend fun signInWithGoogle(): String? {
        return googleAuthManager.signInWithGoogle()
    }

    suspend fun googleLogout() {
        googleAuthManager.googleLogout()
    }
}`,
          },
          {
            description:
              'OkHttp Interceptor에서 AuthManager의 메모리 캐시를 통해 Access Token을 읽고, 유효한 경우에만 Authorization: Bearer 헤더를 추가하여 토큰 기반 인증을 통합 관리함.',
            code: `class AuthInterceptor @Inject constructor(
    private val authManager: AuthManager
) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = authManager.getAccessToken()

        val request = chain.request().newBuilder()
            .apply {
                if (!token.isNullOrEmpty()) {
                    addHeader("Authorization", "Bearer \$token")
                }
            }
            .build()
        return chain.proceed(request)
    }
}`,
          },
        ],
        alternatives: [
          '기존 SharedPreferences를 그대로 유지하면서 코루틴 디스패처로만 I/O 스레드를 분리하는 방법도 있었지만, 트랜잭션 보장·타입 세이프티·Flow 기반 관찰 같은 기능을 직접 구현해야 해 장기적인 유지보수 비용이 더 컸을 것임.',
          '토큰을 DataStore가 아닌 Room 또는 자체 파일 저장소에 보관하는 대안도 가능하지만, 설정·세션 수준의 소량 키-값 데이터에는 DataStore가 더 단순하고, 네트워크 인터셉터와 연계하기에도 적합한 선택이었을 것임.',
        ],
      },
      {
        problem: [
          '기존 MVVM 구조에서 ViewModel·View·UseCase 간 의존이 느슨하지 못해, 입력 검증·로딩 플래그·네비게이션 코드가 View와 ViewModel 곳곳에 흩어지며 상태 관리 일관성 저하 발생함.',
          '비즈니스 로직과 UI 로직이 섞여 있어, 어떤 사용자 액션이 어떤 상태 변화와 화면 전환을 일으키는지 추적 및 테스트가 어려운 상황 발생함.',
        ],
        solution: [
          '화면 단위로 UiState, Intent, SideEffect를 정의하는 MVI 구조를 도입해, 모든 상태 변화를 "이벤트 → 상태 감소(reduce) → 새로운 UiState/Effect" 경로로만 흐르도록 제한함.',
          'Compose UI는 UiState 렌더링과 Intent 전파만 담당하고, 비즈니스 로직·에러 매핑·네비게이션 트리거는 ViewModel 한 곳에서 처리하도록 단방향 데이터 플로우를 설계함.',
        ],
        result: [
          '기존 MVVM에서 화면마다 달랐던 상태 관리·이벤트 처리 패턴을 MVI(UiState-Intent-SideEffect)로 통일해, 화면 수가 증가해도 구조적 복잡도 증가를 억제함.',
          '상태 변화·사이드 이펙트가 모두 Intent/Effect 기준으로 정의되어, 로딩/성공/실패·에러 메시지·네비게이션에 대한 단위 테스트와 리팩터링이 용이해지고, Compose UI와 상태 간 동기화 신뢰성이 향상됨.',
        ],
        implementation: [
          {
            description:
              '이메일, 비밀번호, 로딩 여부, 필드별 에러 메시지를 LoginUiState에 담고, 버튼 활성 조건은 isLoginEnabled 계산 프로퍼티로 캡슐화해 View에서 조건식을 제거함.',
            code: `data class LoginUiState(
    val email: String = "",
    val password: String = "",
    val isLoading: Boolean = false,
    val emailErrorMessage: String? = null,
    val passwordErrorMessage: String? = null,
) {
    val isLoginEnabled: Boolean
        get() = email.isNotBlank() &&
                password.isNotBlank() &&
                emailErrorMessage == null &&
                passwordErrorMessage == null
}`,
          },
          {
            description:
              '텍스트 변경, 버튼 클릭, 외부 로그인 성공/실패, 검증 실패 등은 모두 Intent로 정의해, 이벤트 종류와 파라미터를 한곳에서 관리함.',
            code: `sealed class LoginIntent {
    data class UpdatedEmail(val email: String) : LoginIntent()
    data class UpdatedPassword(val password: String) : LoginIntent()
    data object ClickLogin : LoginIntent()
    data object ClickSignUp : LoginIntent()
    data class FailLogin(
        val errorMessage: String? = null,
        val targetField: ErrorTargetField
    ) : LoginIntent()
}

sealed class LoginEffect {
    data class ShowErrorDialog(val message: String) : LoginEffect()
    data object NavigateToHome : LoginEffect()
    data object NavigateToSignUp : LoginEffect()
}`,
          },
          {
            description:
              'handleIntent에서는 UseCase 호출·외부 로그인·에러 매핑·Effect 발행을 담당하고, reduce에서는 전달받은 Intent를 기반으로 새로운 LoginUiState를 생성함.',
            code: `override suspend fun handleIntent(intent: LoginIntent) {
    when (intent) {
        LoginIntent.ClickLogin -> {
            loginUseCase(/* ... */).collect { result ->
                when (result) {
                    is Resource.Success -> sendIntent(LoginIntent.SuccessLogin)
                    is Resource.Failure -> sendIntent(
                        LoginIntent.FailLogin(
                            errorMessage = "다시 시도해 주세요.",
                            targetField = ErrorTargetField.PASSWORD
                        )
                    )
                    else -> Unit
                }
            }
        }
        LoginIntent.ClickSignUp -> emitEffect(LoginEffect.NavigateToSignUp)
        else -> Unit
    }
}

override fun reduce(currentState: LoginUiState, intent: LoginIntent): LoginUiState =
    when (intent) {
        is LoginIntent.UpdatedEmail -> currentState.copy(
            email = intent.email,
            emailErrorMessage = null,
            passwordErrorMessage = null
        )
        LoginIntent.ClickLogin -> currentState.copy(isLoading = true)
        is LoginIntent.FailLogin -> currentState.copy(
            isLoading = false,
            emailErrorMessage =
                if (intent.targetField == ErrorTargetField.EMAIL) intent.errorMessage else null,
            passwordErrorMessage =
                if (intent.targetField == ErrorTargetField.PASSWORD) intent.errorMessage else null
        )
        else -> currentState
    }`,
          },
          {
            description:
              'Route에서 state와 effect를 수집하고, Effect에 따라 네비게이션·Toast를 처리하며, Screen은 UiState 렌더링과 sendIntent 호출만 담당해 View가 비즈니스 로직을 알지 않도록 유지함.',
            code: null,
          },
        ],
        alternatives: [
          '기존 MVVM 구조를 유지한 채 ViewModel 내부에서만 "이벤트 → 상태 갱신" 패턴을 자율적으로 맞추고, 팀 규칙으로 일관성을 강제하는 방법도 있었겠지만, 화면이 늘어날수록 규칙 위반·예외 케이스가 생기기 쉬웠을 것임.',
          'sealed 클래스 Intent 대신 단순 콜백 함수(onEmailChanged, onLoginClicked 등)만으로 흐름을 구성하는 방식도 가능하지만, 어떤 이벤트가 어떤 상태/네비게이션을 유발하는지 명시적으로 추적·테스트하기는 지금보다 더 어려웠을 것임.',
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
        title: 'UiState–Intent–SideEffect MVI 구조를 자체 설계·적용해보자',
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
      '퀴즈 기반 학습 플랫폼 MVP 버전 구현 및 내부 활용',
      '재사용 가능한 Compose UI 컴포넌트 라이브러리 구축으로 개발 효율성 향상',
      'MVI 아키텍처 도입으로 단방향 상태 관리 경험',
    ],
    retrospective: [
      'MVI 구조 설계 과정에서 OrbitMVI 등 검증된 라이브러리 활용 기회 부족, 다음 버전에서는 OrbitMVI, ReduxKotlin 등 검증된 MVI 프레임워크 도입 검토 필요성 인식',
      '개발 초기 멀티모듈 구조 미적용으로 인한 기능 확장 시 의존성 관리 복잡성 발생, 프로젝트 시작 단계부터 feature, data, domain 모듈 분리를 통한 확장성 있는 아키텍처 구성 필요성 인식',
      'MVI 패턴 적용을 통한 코드 가독성과 테스트 용이성 향상 및 기능 확장 시 일관된 구조 유지 가능성 확인, 완벽한 아키텍처를 한 번에 구축하려 하기보다 지속적인 리팩토링과 개선을 통한 코드 품질 향상의 점진적 개선 효과성 깨달음',
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
    id: 'didimdol',
    title: 'Didimdol',
    description:
      '한성대학교 DC&M 동아리와 (주)PickNumber 간 산학협력 프로젝트',
    thumbnail: 'screenshot/didim1.png',
    tech: [
      'Kotlin',
      'Hilt',
      'MVVM',
      'Coroutines',
      'Retrofit2',
      'Room',
      'Naver Maps API',
      'Direction5 API',
    ],
    period: '2023.01 ~ 2023.06',
    team: '3명 (Android 3명)',
    role: 'Android 팀 리드 개발자 (전체 기여도 80%)',
    details: [
      '위치 기반 서비스 업체의 온라인 예약 시스템 구축을 통한 고객 편의성 향상 및 업체 운영 효율성 증대',
      '한성대학교 DC&M 동아리와 (주)PickNumber 간 산학협력 프로젝트로, 기존 오프라인 중심의 예약 시스템을 디지털화하여 언제 어디서나 접근 가능한 통합 예약 플랫폼 구축',
    ],
    features: [
      '위치 기반 서비스 업체 검색 및 정보 제공, 실시간 거리/소요시간 계산 (Direction5 API 연동)',
      '네이버 지도 연동 길찾기 서비스 및 거리순 정렬/최적 경로 안내',
      '웹뷰 기반 온라인 예약/취소 및 예약 내역 조회/관리',
      'SMS 인증을 통한 본인 확인, 업체별 예약 상태 실시간 확인',
      '네이버 지도 기반 업체 위치 표시, 마커 클러스터링 및 상세 정보 제공',
      '현재 위치 기반 주변 업체 탐색',
    ],
    contributions: [
      'Android 팀 리드 개발자 (3인 팀 중 Android 전담, 전체 기여도 80%)',
      'Room 캐싱 전략 도입으로 반복 API 호출 최소화 및 응답시간 85% 단축',
      '전국 업체 위치정보 실시간 검색: SearchView + RecyclerView + 거리순 정렬로 사용자 경험 최적화',
      'ViewBinding 확장 함수와 추상 베이스 클래스 활용해 코드 재사용성 강화',
    ],
    problemSolvings: [
      {
        problem: [
          '매 검색 시 Direction5 API 실시간 호출로 인한 성능 이슈 (평균 응답시간 3-5초)',
          '동일 업체에 대한 반복 계산으로 인한 불필요한 리소스 소모',
        ],
        solution: [
          '사용자 경험 개선 및 API 호출 비용 절감을 위한 캐싱 시스템 도입',
          '앱 최초 실행 시 모든 업체 데이터를 Room DB 저장, 검색 시 로컬 우선/API 보조 전략 적용',
        ],
        result: [
          '검색 시 네트워크 왕복 없이도 업체 리스트를 즉시 응답하고, 거리/시간 계산만 비동기로 처리함으로써 평균 응답 시간 단축 및 검색 UX 개선 효과 달성함.',
          'Room DB를 단일 소스 오브 트루스로 활용하고, Direction5 API는 보조 계산 용도로만 사용하는 캐싱 전략을 통해 동일 업체에 대한 반복 계산·중복 호출을 제거하여 서버 비용 절감 및 전체 시스템 부하 감소 효과 확보함.',
        ],
        implementation: [
          {
            description:
              '검색 요청이 들어오면 먼저 companyDao.searchQuery(query)를 통해 Room DB에서 업체 리스트를 가져오고, 각 업체에 대해 Direction5 API를 호출해 거리·소요 시간을 계산한 뒤, 결과를 복사·갱신하는 단계적 처리 플로우 구성함.',
            code: `// 1단계: 로컬 DB에서 회사 정보 조회 후 2단계: Direction5 API로 실시간 거리/시간 계산
suspend fun searchCompanyListByQuery(query: String, myLocation: String): Result<List<CompanyEntity>> {
    return runCatching {
        val companies = companyDao.searchQuery(query)
        companies.map { company ->
            val direction = getDistanceAndDuration(myLocation, "\${company.longitude},\${company.latitude}")
            company.copy(distance = direction.distance.toString(), duration = direction.duration.toString())
        }
    }
}`,
          },
          {
            description:
              'searchCompanyListByQuery에서 runCatching을 활용해 네트워크 예외를 캡슐화하고, 호출 측에는 Result<List<CompanyEntity>> 형태로 성공/실패를 명시적으로 전달함. 회사 위치 정보는 이미 Room에 저장된 longitude, latitude를 사용하고, Direction5 API는 거리·시간 계산에만 사용함으로써 API 호출 횟수를 검색 결과 수만큼으로 제한함.',
            code: null,
          },
        ],
        alternatives: [
          '서버 아키텍처와 로직을 변경할 수 없는 제약이 있어, 거리·시간 계산 방식을 서버 측에서 미리 계산하는 구조로 바꾸는 대안은 현실적으로 선택할 수 없었음.',
          '모든 업체에 대해 선계산하지 않고, 최근 검색어·인기 업체 위주로만 로컬에 캐싱하는 LRU 기반 부분 캐싱 전략도 대안이지만, 구현 복잡도 대비 일관된 응답 성능을 보장하기 어렵다는 trade-off가 있었을 것임.',
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
      'API 호출 최적화로 평균 응답시간 85% 단축 (3-5초 → 0.5초 이하)',
      'Extension Functions 활용으로 코드 중복 50% 이상 감소 및 생산성 향상',
    ],
    retrospective: [
      '단위 테스트 및 UI 테스트 코드 부재로 품질 검증 프로세스 부족, JUnit/Mockito 기반 단위 테스트 및 Espresso UI 테스트 도입 계획 수립',
      '졸업 작품과 병행하여 절대적 시간이 부족, 한번에 하나의 프로젝트만 집중하는 것이 가장 좋다는 깨달음',
      '사용자 경험 우선 개발, 현업 멘토링의 중요성, 초기 설계에서의 확장성 고려가 장기적 유지보수에 미치는 임팩트 실감',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/HSU-Didimdol/Android_PickNumber' },
    ],
    screenshots: [
      'screenshot/didim1.png',
      'screenshot/didim2.png',
    ],
    hasBottomScreenshot: false,
  },
  {
    id: 'bong',
    title: 'Bong #',
    description:
      '한성대학교 캡스톤디자인(졸업작품) 출품 프로젝트. 기존에 재능과 재화를 교환하던 방식에서 벗어나 재능과 재능을 교환하는 앱 서비스',
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
    ],
    period: '2022.12 ~ 2023.06',
    team: '4명 (Backend 2명, Android 1명, iOS 1명)',
    role: '팀장, 안드로이드 개발 전담 (1인)',
    details: [
      '기존의 재화 중심 교환이 아닌, 재능과 재능을 교환할 수 있는 모바일 앱 서비스 개발',
      '한성대학교 캡스톤디자인(졸업작품) 프로젝트로, 대학생들이 재화 부족 때문에 원하는 재능을 배우기 어려운 현실을 개선하고자 기획함',
    ],
    features: [
      '재능 등록 및 신청 (게시글 CRUD), 관심 거래/거래 진행 현황 관리',
      '채팅 (1:1 거래 및 실시간 문의)',
      '자유게시판/질문답변 게시판 (익명 지원), 댓글·좋아요·태그 기능',
      '프로필 및 제공/받은 재능 관리, 거래/커뮤니티 활동 내역 조회',
      '회원 정보, 자동 로그인, 외부 링크 관리',
    ],
    contributions: [
      '팀장, 안드로이드 개발 전담 (1인)',
      'WebSocket 라이브러리를 활용한 실시간 1:1 채팅 기능 구현 및 HTTP 폴링 대비 네트워크 트래픽·지연 시간 개선',
      'MVVM + Clean Architecture 적용으로 Presentation/Domain/Data 계층 완전 분리 및 테스트 용이성 개선',
      'RecyclerView multiple item types 활용한 채팅 UI로 상대 구분 표시 및 사용자 경험 최적화',
      'SharedPreference 기반 자동로그인 구현으로 세션 관리 체계 구축',
    ],
    problemSolvings: [
      {
        problem: [
          'HTTP polling 기반 채팅은 요청/응답마다 HTTP 연결을 반복하며 네트워크 오버헤드 및 서버 리소스 낭비 발생함.',
          '클라이언트가 주기적으로 서버를 조회하는 구조로 인해 실시간성이 떨어지고, 채팅 메시지·연결 상태를 여러 레이어에서 중복 관리해야 하는 복잡성 증가함.',
        ],
        solution: [
          'WebSocket 기반 전이중 통신 채널을 도입해 서버와의 연결을 유지하고, 메시지 수신·전송을 단일 연결에서 처리하는 실시간 채팅 아키텍처 적용함.',
          'WebSocket 연결/해제·메시지 전송은 Data 레이어(WebSocketDataSource → ChattingRepository)에서 처리하고, 메시지 리스트·로딩 상태 등 UI 상태는 ChattingViewModel의 StateFlow에서 일괄 관리하는 구조 도입함.',
        ],
        result: [
          'WebSocket 기반 상시 연결 구조로 구현하여, 연결 재생성·헤더 오버헤드를 제거하고 네트워크 사용량 감소 및 실시간성 향상 효과 달성함.',
          'WebSocket 연결·메시지 전송은 Data 레이어, 메시지 리스트·로딩 상태 등은 ViewModel StateFlow에서 관리하는 구조로 분리하여, 채팅 기능의 데이터 흐름과 상태 관리 복잡성 완화 및 테스트·확장 용이성 확보함.',
        ],
        implementation: [
          {
            description:
              'OkHttp WebSocket 생성·해제·메시지 전송을 전담하는 WebSocketDataSourceImpl을 두어, 네트워크 상세 구현을 인프라스트럭처 계층에 캡슐화함.',
            code: `class WebSocketDataSourceImpl @Inject constructor(
    private val client: OkHttpClient
) : WebSocketDataSource {

    private var webSocket: WebSocket? = null

    override fun connect(url: String, listener: WebSocketListener) {
        val request = Request.Builder()
            .url(url)
            .build()
        webSocket = client.newWebSocket(request, listener)
    }

    override fun disconnect() {
        webSocket?.cancel()
        webSocket = null
    }

    override fun sendMessage(roomId: Int, senderId: String, message: String) {
        val messageJson = JSONObject().apply {
            put("roomId", roomId)
            put("senderId", senderId)
            put("message", message)
        }

        webSocket?.send(messageJson.toString())
    }
}`,
          },
          {
            description:
              '도메인 레이어에서는 ChattingRepository 인터페이스만 바라보도록 하고, 실제 구현체 ChattingRepositoryImpl에서 WebSocket DataSource를 위임 호출하는 구조 설계함.',
            code: `class ChattingRepositoryImpl @Inject constructor(
    private val webSocketDataSource: WebSocketDataSource
) : ChattingRepository {

    override fun connect(url: String, listener: WebSocketListener) =
        webSocketDataSource.connect(url = url, listener = listener)

    override fun disconnect() = webSocketDataSource.disconnect()

    override fun sendMessage(roomId: Int, senderId: String, message: String) =
        webSocketDataSource.sendMessage(roomId = roomId, senderId = senderId, message = message)
}`,
          },
          {
            description:
              'ChattingViewModel에 MutableStateFlow(ChattingUiState())를 두고, WebSocket 이벤트를 수신할 때마다 UI 상태(로딩 여부, 채팅 리스트)를 직접 갱신하는 구조 도입함.',
            code: `@HiltViewModel
class ChattingViewModel @Inject constructor(
    private val successMatchingUseCase: SuccessMatchingUseCase,
    private val applyScoreUseCase: ApplyScoreUseCase,
    private val getUserUseCase: GetUserUseCase,
    private val chattingRepository: ChattingRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(ChattingUiState())
    val uiState = _uiState.asStateFlow()

    private var fetchJob: Job? = null

    fun connectToWebSocket(roomId: Int) {
        val listener = object : WebSocketListener() {
            override fun onMessage(webSocket: WebSocket, text: String) {
                super.onMessage(webSocket, text)
                try {
                    _uiState.update { it.copy(isLoading = true) }
                    val jsonArray = JSONArray(text)
                    val chatMessages = ArrayList<ChatMessage>()

                    for (i in 0 until jsonArray.length()) {
                        val jsonObject = jsonArray.getJSONObject(i)
                        chatMessages.add(
                            ChatMessage(
                                roomId = jsonObject.getInt("roomId"),
                                senderId = jsonObject.getString("senderId"),
                                message = jsonObject.getString("message"),
                            )
                        )
                    }
                    bindChatting(chatMessages)
                    _uiState.update { it.copy(isLoading = false) }
                } catch (e: Exception) {
                    // 단일 메시지 수신 처리
                    val json = JSONObject(text)
                    val chatMessage = ChatMessage(
                        roomId = json.getInt("roomId"),
                        senderId = json.getString("senderId"),
                        message = json.getString("message")
                    )
                    uiState.value.chatting.add(chatMessage)
                    _uiState.update {
                        it.copy(chatting = uiState.value.chatting, isLoading = false)
                    }
                }
            }
        }
        chattingRepository.connect("URL", listener)
    }

    fun disconnectFromWebSocket() {
        chattingRepository.disconnect()
    }

    fun sendMessage() {
        val senderId = uiState.value.senderId
        val roomId = uiState.value.roomId!!
        val message = uiState.value.myChatMessage
        viewModelScope.launch {
            chattingRepository.sendMessage(
                roomId = roomId,
                senderId = senderId,
                message = message
            )
        }
    }
}`,
          },
        ],
        alternatives: [
          'HTTP 롱 폴링 대신 Server-Sent Events(SSE)를 사용하는 방법도 있었지만, 단방향 스트림 특성상 클라이언트→서버 메시지 전송을 별도 채널로 유지해야 해서 구조가 더 복잡해졌을 것임.',
          'MQTT 같은 메시지 브로커 기반 프로토콜로 전환하는 방안도 있지만, 현재 요구사항(앱 내 1:1/소규모 채팅) 대비 인프라 구성·운영 복잡도가 커져 WebSocket 대비 과한 선택이 되었을 가능성이 큼.',
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
      'Presentation/Domain/Data 계층 분리로 구조적 안정성 확보',
      'Hilt/UseCase/Repository/Mapper 분리로 유지보수성과 테스트 용이성 대폭 향상',
      'WebSocket을 사용하여 실시간 채팅 직접 구현, MVVM에 맞춘 상태 관리',
    ],
    retrospective: [
      '개발 일정에 집중하다 보니 UI/UX 세부 튜닝, 접근성 지원 등은 미흡, 상태 관리 체계 강화(State 도입 필요성 인식)',
      '"잘 만든 구조가 좋은 코드보다 유지보수에 더 큰 가치를 준다"는 점, 테스트/유지보수/실사용자 피드백의 중요성 체감',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/GrapeBongBong/Android' },
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
    title: 'POCS',
    description:
      '한성대학교 전공 소모임 POCS 회원들을 위한 원활한 스터디 모집 및 정보 공유를 위한 커뮤니티 앱',
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
    role: '안드로이드 앱 개발 (스터디·커뮤니티, 프로필 기능 개발)',
    details: [
      '전공 소모임 POCS 회원들이 스터디 모집과 정보 공유를 편리하게 할 수 있는 커뮤니티 앱 개발',
      '코로나로 침체한 전공 소모임을 활성화하기 위해 스터디 모집과 정보 전달을 효율화하기 위한 전용 플랫폼 개발',
    ],
    features: [
      '로그인 및 회원가입 (익명/정회원), 관리자/일반 회원 모드',
      '스터디/커뮤니티 포스팅 및 댓글 CRUD, 카테고리별 게시글 등록 및 관리',
      '이미지 첨부, Markdown 편집 지원',
      '프로필 이미지 및 정보 수정, 나의 게시글·댓글 관리, 외부 링크 관리',
      '관리자 기능: 회원 관리, 권한 부여',
      '게시글·댓글 좋아요/저장, 검색 및 필터 기능',
    ],
    contributions: [
      '안드로이드 앱 개발 (스터디·커뮤니티, 프로필 기능 개발)',
      '기존 XML View를 Jetpack Compose로 70% 이상 전환하여 코드 재사용성과 개발 효율성 개선',
      'Paging3 도입으로 스크롤 시 지연 로드하여 초기 화면 렌더링 지연 최소화',
      'GitHub Actions를 활용해 Android CI/CD (자동 빌드, 테스트, Play Store 배포) 환경 구축',
      'Play Store 정식 배포 완료로 실제 프로덕션 환경에서의 앱 운영 및 유지보수 경험',
    ],
    problemSolvings: [
      {
        problem: [
          '대량의 JSON 데이터를 한 번에 로딩하여 리스트에 바인딩하면서, 스크롤 시 프레임 드랍·UI 끊김 현상 발생함.',
          '페이지네이션 미적용으로 동일 데이터를 반복해서 요청하거나, 불필요한 데이터까지 메모리에 적재하는 비효율 발생함.',
        ],
        solution: [
          'Android Paging3 라이브러리 도입으로 네트워크 기반 페이지네이션을 구현하고, 스크롤 위치에 따라 필요한 페이지만 순차적으로 로딩하는 구조 적용함.',
          'PagingSource, Pager, PagingData 기반으로 Data 레이어에 페이지 단위 데이터 공급 책임을 부여하여, UI에서는 스트림만 구독하도록 역할 분리함.',
        ],
        result: [
          '기존 JSON 전체 로딩 방식에서 Paging3 기반 페이지네이션으로 전환하여, 초기 로딩 시 데이터·렌더링 부담 감소 및 스크롤 시 렉 현상 완화 달성함.',
          '네트워크 요청·페이지 키 관리·에러 처리 로직을 PostPagingSource 한 곳에 모으고, 상위 레이어에는 Flow<PagingData<Post>>만 제공함으로써, UI 레이어 변경 없이도 페이징 전략 수정·튜닝 가능성 확보함.',
        ],
        implementation: [
          {
            description:
              'PostPagingSource를 도입하여, JSON 응답을 페이지 단위로 로딩하고, 응답을 Domain 모델 Post로 매핑하여 UI에 공급하는 책임을 분리함.',
            code: `class PostPagingSource @Inject constructor(
    private val api: PostApi,
    private val filterType: PostFilterType
) : PagingSource<Int, Post>() {

    companion object {
        private const val START_PAGE = 1
        const val PAGE_SIZE = 15
    }

    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, Post> {
        val page = params.key ?: START_PAGE
        return try {
            val response = api.getAll(filterType.toDto(), pageSize = PAGE_SIZE, page = page)
            if (response.isSuccessful) {
                val posts = response.body()!!.data.posts.map { it.toEntity() }
                val isEnd = posts.isEmpty()

                LoadResult.Page(
                    data = posts,
                    prevKey = if (page == START_PAGE) null else page - 1,
                    nextKey = if (isEnd) null else page + 1
                )
            } else {
                throw Exception(response.errorMessage)
            }
        } catch (e: Exception) {
            LoadResult.Error(e)
        }
    }

    override fun getRefreshKey(state: PagingState<Int, Post>): Int? {
        return state.anchorPosition?.let { anchorPosition ->
            state.closestPageToPosition(anchorPosition)?.prevKey?.plus(1)
                ?: state.closestPageToPosition(anchorPosition)?.nextKey?.minus(1)
        }
    }
}`,
          },
          {
            description:
              'PostRepositoryImpl에서 Pager를 생성해 PagingData<Post> 스트림을 반환함으로써, UI·ViewModel에서 Paging3 상세 구현을 몰라도 되도록 추상화 계층 구성함.',
            code: `class PostRepositoryImpl @Inject constructor(
    private val dataSource: PostRemoteDataSource,
    private val api: PostApi
) : PostRepository {

    override fun getAll(filterType: PostFilterType): Flow<PagingData<Post>> {
        return Pager(
            config = PagingConfig(PAGE_SIZE),
            pagingSourceFactory = { PostPagingSource(api = api, filterType = filterType) }
        ).flow
    }
}`,
          },
        ],
        alternatives: [
          '클라이언트에서만 in-memory paging(배열 슬라이싱)이나 LazyColumn의 item/itemsIndexed 조합으로 가상 페이징을 구현하는 방법도 있었을 것임.',
          'RecyclerView + ListAdapter로 전환하고 DiffUtil 최적화, 이미지 썸네일/placeholder 적용 등 렌더링 쪽만 튜닝하는 접근도 가능했지만, 한 번에 내려받는 데이터 양 자체를 줄이지 못해 근본적인 메모리·네트워크 부담은 남았을 것임.',
          '자체 커스텀 페이징 로직을 구현하는 방법도 있었지만, 이미 검증된 Paging3를 활용하는 쪽이 중복 코드와 버그 가능성을 줄이고 라이프사이클·캐싱 지원을 그대로 가져올 수 있다는 점에서 더 현실적인 선택이었음.',
        ],
      },
      {
        problem: [
          '기능 개발 외에 반복적인 수동 빌드·테스트·배포 작업으로 인한 시간 소모 및 에러 발생 부담 증가함.',
          '브랜치 전략에 따른 품질 검증(빌드/테스트/Lint)과 Play Store 배포가 일관된 프로세스 없이 수동으로 진행되어, 배포 속도 및 신뢰도 저하 현상 발생함.',
        ],
        solution: [
          'GitHub Actions 워크플로를 도입하여 main 브랜치에 대한 빌드·Lint·UI 테스트를 자동화하고, release 브랜치에서 Play Store Internal Track까지 자동 배포되는 CI/CD 파이프라인 설계 및 구축함.',
          '서버 URL, 서명 키, 서비스 계정 키 등 민감 정보를 GitHub Secrets로 관리하고, 워크플로 실행 시 환경 변수 및 파일로 주입하는 보안 중심 구성 적용함.',
        ],
        result: [
          'main 브랜치에 대한 빌드·Lint·UI 테스트가 자동으로 실행되어, 코드 병합 전 품질 검증을 일관된 파이프라인으로 수행함으로써 수동 검증 부담 감소 및 신뢰도 향상 달성함.',
          'release 브랜치 push만으로 서명된 AAB 빌드부터 Play Store Internal Track 배포까지 자동화하여, 배포 속도 향상과 함께 서명/업로드 과정에서의 에러 발생 가능성 감소 효과 확보함.',
        ],
        implementation: [
          {
            description:
              'Android CI 워크플로를 정의하여 main 브랜치 push/pull request 시 자동으로 빌드, ktlint 체크를 수행함. SERVER_URL을 GitHub Secrets에서 읽어 apikey.properties 파일로 생성하여 환경 구성 자동화 수행함.',
            code: `name: Android CI

on:
  push:
    branches: [main]
    paths-ignore:
      - '**/README.md'
  pull_request:
    branches: [main]

jobs:
  build:
    name: Development build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Access SERVER_URL
        env:
          SERVER_URL: \${{ secrets.SERVER_URL }}
        run: echo '\${{ secrets.SERVER_URL }}' > ./apikey.properties

      - name: Setup JDK 11
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
          cache: gradle

      - name: Build with Gradle
        run: ./gradlew build

      - name: Check Lint
        run: ./gradlew ktlintCheck`,
          },
          {
            description:
              'matrix.api-level 전략으로 23·30·31 버전 에뮬레이터에서 connectedCheck를 실행함으로써, 다양한 OS 버전에서 UI 회귀 테스트 자동화 환경 구축함.',
            code: `  ui-test:
    name: UI tests on Android (API level \${{ matrix.api-level }})
    runs-on: macos-latest
    strategy:
      matrix:
        api-level: [ 23, 30, 31 ]
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup JDK 11
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
          cache: gradle

      - name: Setup Android SDK
        uses: android-actions/setup-android@v2

      - name: Run UI test
        uses: reactivecircus/android-emulator-runner@v2
        with:
          api-level: \${{ matrix.api-level }}
          disable-animations: true
          arch: x86_64
          script: ./gradlew connectedCheck`,
          },
          {
            description:
              'release 브랜치 push 시 Play Store Internal Track까지 자동 배포하는 CD 워크플로. Gradle로 Release AAB를 빌드하고, GitHub Secrets 기반 서명 후 Google Play Console에 업로드함.',
            code: `name: Build and Publish to Play Store
on:
  push:
    branches:
      - release/**
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2.4.0

      - name: Build Release AAB
        run: ./gradlew bundleRelease

      - name: Sign AAB
        id: sign
        uses: r0adkll/sign-android-release@v1
        with:
          releaseDirectory: app/build/outputs/bundle/release
          signingKeyBase64: \${{ secrets.KEY_STORE_BASE_64 }}
          alias: \${{ secrets.ALIAS }}
          keyStorePassword: \${{ secrets.KEY_STORE_PASSWORD }}
          keyPassword: \${{ secrets.KEY_PASSWORD }}

      - name: Deploy to Play Store (Internal)
        uses: r0adkll/upload-google-play@v1.0.16
        with:
          track: internal
          serviceAccountJson: service_account.json
          packageName: com.pocs.blog
          status: completed
          releaseFiles: app/build/outputs/bundle/release/app-release.aab`,
          },
        ],
        alternatives: [
          'Jenkins, GitLab CI 같은 사내 CI 서버를 구축해 파이프라인을 운영하는 방법도 있었지만, 별도 인프라 관리 비용과 초기 설정 부담이 커서 GitHub 저장소와 밀접하게 연동되는 현재 구조보다 효율이 떨어졌을 가능성이 있음.',
          '로컬 Git 훅(pre-push, pre-commit)과 IDE 플러그인만으로 빌드·Lint 검사를 강제하는 방식도 가능했지만, 개발자 환경마다 설정 편차가 생기고, Pull Request 단위로 일관된 품질 검증을 보장하기 어려웠을 것임.',
          'Play Store 배포만 별도 수동 스크립트(예: fastlane)로 처리하고 나머지 검증은 수동으로 남겨두는 절충안도 있었지만, 사람이 개입하는 구간이 많은 만큼 릴리스 속도와 신뢰도를 끌어올리기에는 한계가 있었을 것임.',
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
      'Paging3 기반 커뮤니티 기능으로 1,000건 이상 데이터도 스크롤 렉 없이 제공',
      'Play Store 배포 경험',
      'CI/CD로 빌드·릴리즈·배포 자동화 및 코드 품질 보장',
    ],
    retrospective: [
      'MVP에 집중하다 보니 초반 UI/UX 세부 설계가 부족함, UI/UX 설계 초기부터 더 많은 리소스와 시간 투자 필요성 인식',
      '유지보수와 확장성 있는 개발의 중요성, 팀원과 코드 리뷰/지식 공유의 소중함, 사용자 피드백을 통한 서비스 개선의 보람 깨달음',
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
