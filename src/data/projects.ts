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
  achievements: string[]
  retrospective: string[]
  links: { label: string; url: string }[]
  screenshots: string[]
  screenshotColumns?: number
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
    thumbnail: 'screenshot/more1.png',
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
      'screenshot/more1.png',
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
      'screenshot/more14.png',
    ],
    screenshotColumns: 3,
  },
]

export default projects
