import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Skills.module.css'

const skills = [
  {
    category: 'Android & Kotlin',
    items: [
      'Jetpack Compose 기반 선언형 UI 개발 및 시계열 차트, GitHub 잔디밭 등 복잡한 컴포넌트 직접 구현',
      'XML / Jetpack Compose 혼용 환경에서 Compose 중심 구조 개선 경험',
      '멀티 모듈 아키텍처, Clean Architecture, MVVM, MVI 패턴을 활용한 확장 가능한 앱 구조 설계 및 적용 경험',
      'Coroutines 기반 병렬 API 처리(56% 개선), Room 캐싱(85% 개선), Paging3 도입을 통한 앱 성능 개선 경험',
      'JUnit5·MockK 기반 단위 테스트로 ViewModel 비즈니스 로직 검증 경험',
      'Flow, StateFlow 기반 UI 상태 스트림 설계로 화면 상태와 이벤트 흐름 관리 경험',
      'Extension Functions, Sealed Interface, Generic 활용으로 코드 재사용',
      'Gradle Convention Plugin 기반 build-logic 구축 및 멀티모듈 설정 표준화 경험',
      '오픈소스 UI 라이브러리 개발 및 Maven Central 배포 경험',
    ],
  },
  {
    category: 'Backend & Web',
    items: [
      'Spring Boot 기반 REST API 설계 및 Controller-Service-DAO 계층 구현 경험',
      'MyBatis와 MySQL을 활용한 직접 SQL 매핑, resultMap/collection 기반 응답 모델 구성 경험',
      '주문 생성, 상세 주문, 스탬프 적립, 상품 주문 수 갱신 등 도메인 상태 변경을 트랜잭션 흐름으로 구성한 경험',
      'OpenAI API와 Firebase FCM 등 외부 서비스를 백엔드 기능 흐름에 연동한 경험',
      'Vue 3, Vite, Bootstrap 기반 웹 화면 구성 및 컴포넌트 단위 UI 분리 경험',
    ],
  },
  {
    category: 'Agent',
    items: [
      'Agent 개발 워크플로우를 적용해 기능 구현, 리팩토링, 테스트 작성, 문서화 과정을 반복 가능하게 정리',
      '코드베이스 컨텍스트와 컨벤션을 문서화해 AI 도구의 반복 작업 수행 품질 개선',
      '코드 리뷰, 테스트 생성, 리팩토링 후보 탐색 등 반복 개발 작업 자동화',
      '검증 게이트, 자동 테스트, 피드백 루프를 설계해 AI 에이전트 기반 개발 흐름 안정화',
    ],
  },
  {
    category: 'Communication',
    items: [
      'JIRA와 GitHub를 활용하여 이슈 관리 및 개발 진행 현황 공유',
      '코드 리뷰를 통한 아키텍처 일관성 유지 및 팀 이해도 동기화',
      'Ktlint를 도입하여 코드 리뷰에서 발생할 수 있는 불필요한 비용 제거',
    ],
  },
]

function Skills() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section id="skills" className="section reveal" ref={ref}>
      <h2 className="section__title">Skills</h2>
      <div className={styles.grid}>
        {skills.map((group) => (
          <div key={group.category} className={styles.card}>
            <h3 className={styles.category}>{group.category}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
