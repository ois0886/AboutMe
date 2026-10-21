import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Skills.module.css'

const skills = [
  {
    category: 'Android & Kotlin',
    items: [
      'Jetpack Compose 화면 개발, 시계열 차트와 GitHub 잔디 형태의 UI 컴포넌트 직접 구현',
      '멀티 모듈, Clean Architecture, MVVM, MVI를 적용해 화면과 상태 처리, 데이터 접근의 책임 분리',
      'Coroutines로 6개 API를 병렬 호출해 로딩 시간을 약 356ms에서 156ms로 단축. Room 캐싱으로 반복 조회 시간을 3~5초에서 0.5초 이하로 단축하고, Paging3로 목록 분할 로딩',
      'JUnit5와 MockK로 ViewModel의 상태 변화와 비즈니스 로직을 단위 테스트로 검증',
      'Flow와 StateFlow를 통한 화면 상태 전달과 사용자 입력에 따른 이벤트 흐름 관리',
      'Gradle Convention Plugin으로 공통 build-logic을 구성해 모듈마다 반복되던 빌드 설정을 한곳에서 관리',
      'Compose UI 라이브러리 개발 및 Maven Central 배포',
    ],
  },
  {
    category: 'Backend & Frontend',
    items: [
      'Spring Boot REST API 설계, 컨트롤러와 서비스, 데이터 접근 계층 분리',
      'MyBatis와 MySQL을 활용한 SQL 매핑, 조인, 페이지 조회와 검색 조건 처리',
      '함께 반영해야 하는 데이터 변경의 트랜잭션 처리, 입력 검증과 예외 처리 구현',
      '공통 응답 형식과 오류 응답, 페이지 조회 규칙 정의 및 클라이언트 연동',
      'Vue 3와 Vite 화면 및 라우팅 구성, 상태 관리와 재사용 컴포넌트 분리',
    ],
  },
  {
    category: 'AI Agent',
    items: [
      '기능 구현, 리팩토링, 테스트 작성과 문서화에 AI Agent 활용',
      '독립적인 작업을 여러 에이전트에 분배하고, 결과 통합 후 코드 리뷰와 테스트로 검증',
      '계획, 구현, 검증 단계별 필요 자료와 완료 기준 정의',
      '코드 구조와 작성 규칙을 문서화해 AI 도구에 작업 맥락 전달',
      '코드 리뷰, 테스트 생성과 리팩토링 후보 탐색 등 반복 작업 자동화',
      '자동 테스트와 검토 결과를 다음 수정에 반영',
    ],
  },
  {
    category: 'Communication',
    items: [
      'JIRA와 GitHub를 통한 이슈 관리와 개발 진행 상황 공유',
      '코드 리뷰에서 설계 의도와 변경 이유 설명, 팀의 코드 작성 규칙 조율',
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
